## BLOQUE K

**NEXO**

### ✅ NEXO-AUTH-001 — Separar configuración administrativa de operación

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-038 — Definir novedades locativas, severidad, contención, escalamiento, resolución y cierre
**Tarea siguiente:** NEXO-AUTH-002 — Corregir bypass administrativo de remisiones
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato de autorización NEXO para separar el carril base o administrativo del carril operativo, preservar las modalidades canónicas de permiso y prohibir que navegación, configuración, simulación o excepciones locales mezclen autoridad entre ambos carriles
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-001::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la frontera de autorización mediante la cual NEXO mantiene separadas configuración y administración de la ejecución operativa.

```text
CAPACIDAD NEXO
+ MODALIDAD CANÓNICA
+ ACTOR REAL
+ CARRIL
+ CONTEXTO DEL CARRIL
+ SCOPE
+ RECURSO
+ ESTADO
+ DENEGACIONES
→ DECISIÓN DE AUTORIZACIÓN
```

Ningún `ALLOW` podrá construirse mezclando fragmentos de dos carriles que por separado no satisfacen el contrato.

#### 2. Resultado contractual

Quedan fijadas veinte obligaciones globales:

1. toda capacidad NEXO conserva su modalidad canónica;
2. carril base y operativo se evalúan por separado;
3. `BASE_ONLY` solo admite base;
4. `OPERATIONAL_ONLY` solo admite operativo;
5. `BASE_OR_OPERATIONAL` admite cualquiera de los dos carriles completos;
6. `BASE_AND_OPERATIONAL` exige ambos;
7. cobertura administrativa no crea territorio operativo;
8. turno no crea cobertura administrativa;
9. check-in no concede configuración;
10. rol base no se convierte en rol operativo;
11. rol operativo no concede configuración;
12. selección de navegación no concede territorio;
13. acceso a NEXO no concede todas las capacidades;
14. visibilidad de UI no concede mutación;
15. scope y recurso se validan independientemente;
16. la decisión final se recalcula en servidor;
17. una excepción local no puede ampliar la modalidad;
18. simulación no produce autoridad real;
19. dispositivo compartido no presta autoridad administrativa;
20. cada futura materialización conserva lineage con su `implementation_unit_id`.

#### 3. Base normativa consumida

La tarea consume las decisiones vigentes de rol base, rol operativo, roles administrativos, casos híbridos, sede y área asignadas, cobertura administrativa, turno publicado, check-in, modalidades de permiso, precedencia, denegaciones, recursos, servidor, auditoría, dispositivo compartido y simulación.

No redefine ninguno de esos contratos: especializa su aplicación en NEXO.

#### 4. Modalidades canónicas

| Modalidad | Semántica |
| --- | --- |
| `BASE_ONLY` | solo admite carril base |
| `OPERATIONAL_ONLY` | solo admite carril operativo |
| `BASE_OR_OPERATIONAL` | admite cualquiera de los dos carriles completos |
| `BASE_AND_OPERATIONAL` | exige ambos carriles |

No se crea una modalidad local adicional para NEXO.

#### 5. Carril base o administrativo

El carril base usa identidad real, rol base, grants, cobertura administrativa, scope, recurso, estado y denegaciones aplicables.

Cuando la capacidad no exige turno ni check-in, su ausencia no constituye por sí sola una denegación base.

La cobertura base nunca equivale a autoridad global.

#### 6. Carril operativo

El carril operativo usa, según el contrato de la capacidad, rol operativo efectivo, turno publicado y vigente, check-in cuando corresponda, sede, área, límites del dispositivo, permiso exacto, recurso, estado y denegaciones.

El carril operativo no hereda autoridad configurativa por ejecutarse dentro de NEXO.

#### 7. Separaciones obligatorias

```text
BASE ROLE != OPERATIONAL ROLE
ADMINISTRATIVE COVERAGE != OPERATIONAL TERRITORY
SELECTED SITE != AUTHORIZED SITE
SELECTED AREA != AUTHORIZED AREA
APPLICATION ACCESS != CAPABILITY AUTHORIZATION
CONFIGURE != OPERATE
OPERATE != CONFIGURE
```

#### 8. `BASE_ONLY`

Una capacidad `BASE_ONLY` no toma prestados turno, check-in, rol operativo ni área activa para fabricar autoridad base. Un actor puede poseer contextos de ambos tipos, pero la decisión de esta modalidad procede únicamente del carril base completo.

#### 9. `OPERATIONAL_ONLY`

Una capacidad `OPERATIONAL_ONLY` no puede ser autorizada por cobertura administrativa, rol base, selección de sede, visibilidad de pantalla ni una capacidad configurativa genérica. Debe satisfacer su carril operativo completo.

#### 10. `BASE_OR_OPERATIONAL`

Se admiten exactamente dos caminos independientes:

```text
BASE COMPLETO → ALLOW BASE
OPERATIVO COMPLETO → ALLOW OPERATIVO
```

No se admite `BASE PARCIAL + OPERATIVO PARCIAL → ALLOW`. La decisión deberá indicar qué carril la satisfizo.

#### 11. `BASE_AND_OPERATIONAL`

Esta modalidad exige simultáneamente un carril base válido y un carril operativo válido. Ninguno sustituye al otro y ambos conservan scope, recurso, estado y denegaciones.

#### 12. Cobertura administrativa

`administrative_coverage` es un insumo territorial del carril base. No es permiso, `ALLOW`, sede operativa, área operativa ni selección visual.

#### 13. Territorio operativo

El territorio operativo procede del contexto operativo vigente. No se completa por fallback desde `selected_site_id`, sede primaria, última sede usada, cookie de navegación, rol base o cobertura administrativa.

#### 14. Selección de navegación

Una sede o área seleccionada puede servir a navegación y filtros. No amplía asignaciones, cobertura administrativa, territorio operativo, scope ni territorio del recurso.

#### 15. Rol base y rol operativo

El rol base aporta únicamente los grants que correspondan al carril base. El rol operativo aporta únicamente la función temporal del carril operativo. Ninguno concede automáticamente las capacidades propias del otro.

#### 16. Acceso a aplicación

`nexo.access` no equivale a todas las capacidades de NEXO. Launcher, menú, ruta y pantalla visible no constituyen autorización de las acciones internas.

#### 17. Lectura y mutación

Consultar un recurso no concede crear, actualizar, cancelar, aprobar, ejecutar, despachar, recibir, ajustar, contar, mover o configurar. Cada acción protegida usa su permiso exacto.

#### 18. Configuración administrativa

Configuración gobierna catálogos, políticas, plantillas, parámetros o metadatos reutilizables. La presencia de una pantalla `settings` no concede autoridad y la ausencia de `settings` en el nombre tampoco vuelve operativa una acción.

#### 19. Operación

Operación produce o confirma un hecho operativo sobre inventario, remisión, ubicación, movimiento, conteo, traslado, recepción u otro proceso NEXO. Se autoriza por la capacidad exacta, no por acceso a la configuración relacionada.

#### 20. Fuente de modalidad

La modalidad se consume del catálogo y matrices canónicas. NEXO no mantiene una segunda clasificación local con semántica distinta para decidir si una capacidad es base, operativa, alternativa o acumulativa.

#### 21. Universo canónico NEXO

El universo consumido contiene exactamente **63 permisos NEXO**.

| Modalidad | Cantidad |
| --- | ---: |
| `BASE_ONLY` | **16** |
| `OPERATIONAL_ONLY` | **10** |
| `BASE_OR_OPERATIONAL` | **33** |
| `BASE_AND_OPERATIONAL` | **4** |
| **TOTAL** | **63** |

#### 22. Matriz de separación de las 63 capacidades

| # | Permiso canónico | Modalidad | Decisión de carril |
| ---: | --- | --- | --- |
| 1 | `nexo.access` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 2 | `nexo.catalog.products.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 3 | `nexo.catalog.products.create` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 4 | `nexo.catalog.presentations.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 5 | `nexo.catalog.request_policies.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 6 | `nexo.catalog.categories.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 7 | `nexo.catalog.units.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 8 | `nexo.assets.items.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 9 | `nexo.assets.items.create` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 10 | `nexo.assets.groups.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 11 | `nexo.assets.counts.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 12 | `nexo.inventory.adjustments.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 13 | `nexo.inventory.adjustments.register` | `BASE_AND_OPERATIONAL` | Exige ambos carriles; ninguno sustituye al otro. |
| 14 | `nexo.inventory.entries.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 15 | `nexo.inventory.entries.register` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 16 | `nexo.inventory.entries.override` | `BASE_AND_OPERATIONAL` | Exige ambos carriles; ninguno sustituye al otro. |
| 17 | `nexo.inventory.locations.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 18 | `nexo.inventory.location_assignments.assign` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 19 | `nexo.inventory.location_catalog.update` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 20 | `nexo.inventory.lpns.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 21 | `nexo.inventory.movements.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 22 | `nexo.inventory.stock.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 23 | `nexo.inventory.production_batches.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 24 | `nexo.inventory.transfers.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 25 | `nexo.inventory.transfers.create` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 26 | `nexo.inventory.withdrawals.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 27 | `nexo.inventory.withdrawals.register` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 28 | `nexo.inventory.zones.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 29 | `nexo.inventory.storage_positions.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 30 | `nexo.inventory.warehouse_operations.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 31 | `nexo.inventory.stock_validations.perform` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 32 | `nexo.inventory.stock_counts.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 33 | `nexo.inventory.stock_counts.perform` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 34 | `nexo.inventory.initial_counts.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 35 | `nexo.inventory.remissions.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 36 | `nexo.inventory.remissions.update` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 37 | `nexo.inventory.remissions.request` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 38 | `nexo.inventory.remissions.prepare` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 39 | `nexo.inventory.remissions.dispatch` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 40 | `nexo.inventory.remissions.receive` | `OPERATIONAL_ONLY` | Solo carril operativo; rol base o cobertura administrativa no sustituyen el contexto operativo. |
| 41 | `nexo.inventory.remissions.cancel` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 42 | `nexo.logistics.operations_board.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 43 | `nexo.logistics.operations.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 44 | `nexo.logistics.driver_operations.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 45 | `nexo.logistics.fulfillment.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 46 | `nexo.logistics.fulfillment_routes.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 47 | `nexo.logistics.supply_routes.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 48 | `nexo.finance.internal_invoices.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 49 | `nexo.finance.internal_invoices.generate` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 50 | `nexo.finance.internal_invoices.issue` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 51 | `nexo.finance.internal_invoices.cancel` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 52 | `nexo.finance.internal_invoice_amounts.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 53 | `nexo.finance.internal_prices.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 54 | `nexo.finance.internal_variances.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 55 | `nexo.finance.internal_variances.approve` | `BASE_AND_OPERATIONAL` | Exige ambos carriles; ninguno sustituye al otro. |
| 56 | `nexo.finance.internal_variances.resolve` | `BASE_AND_OPERATIONAL` | Exige ambos carriles; ninguno sustituye al otro. |
| 57 | `nexo.finance.cost_centers.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 58 | `nexo.analytics.internal_reports.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 59 | `nexo.analytics.margin_reports.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 60 | `nexo.printing.templates.update` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 61 | `nexo.printing.jobs.view` | `BASE_OR_OPERATIONAL` | Cualquiera de los dos carriles completos puede satisfacerla; se evalúan por separado y no se mezclan. |
| 62 | `nexo.settings.sites.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |
| 63 | `nexo.settings.remission_policies.view` | `BASE_ONLY` | Solo carril base; el contexto operativo no sustituye la autorización base. |

La modalidad es heredada. Esta tarea no reasigna permisos a personas o roles concretos; fija cómo debe interpretarse cada modalidad al resolver autoridad NEXO.

#### 23. Integridad del universo

La materialización futura deberá demostrar 63 identidades esperadas, 63 materializadas, cero faltantes, cero duplicados, cero modalidades desconocidas y la distribución `16 / 10 / 33 / 4`. Un cambio del catálogo exige versionado y reconciliación explícitos.

#### 24. Actor efectivo

Toda decisión identifica al actor efectivo. Sesión, dispositivo o principal técnico no sustituyen automáticamente al humano cuando la acción exige actor humano.

#### 25. Scope y recurso

El scope y el recurso se validan independientemente del carril. Una capacidad no autoriza recursos fuera de territorio, scope, estado compatible o extremos territoriales requeridos.

#### 26. Servidor autoritativo

Query string, ruta, formulario, React state, local storage, cookie manipulable, selección visual, última sede usada, nombre de rol o booleano calculado solo en UI no son fuentes suficientes de autoridad.

Toda acción protegida se revalida en servidor antes del efecto.

#### 27. Convergencia entre capas

UI, SDK, helpers, Server Actions, Route Handlers, RPC y RLS deberán converger en la misma decisión material para el mismo snapshot relevante. Una capa no puede ampliar silenciosamente lo denegado por otra.

#### 28. Fail closed

Si identidad, modalidad, permiso, scope, territorio, recurso, contexto exigido o estado no pueden resolverse con evidencia suficiente, la acción se deniega o se clasifica como indisponibilidad técnica según el contrato propietario. No existe fallback permisivo.

#### 29. Excepciones locales

Una excepción local no puede cambiar modalidad, omitir turno o check-in exigidos, ampliar territorio, ignorar scope, transformar una selección visual en autoridad, conceder una clave inexistente o convertir el nombre del rol en permiso.

#### 30. Dispositivo compartido

En dispositivo compartido, la autoridad efectiva no excede la intersección entre límites del dispositivo y autoridad del trabajador identificado. El administrador que configuró el terminal no presta sus privilegios al actor operativo.

La especialización corresponde a `NEXO-AUTH-016`.

#### 31. Simulación

Un role override o simulación conserva actor real, contexto real y resultado simulado separados.

```text
SIMULATED WOULD_ALLOW != REAL ALLOW
```

La especialización corresponde a `NEXO-AUTH-017`.

#### 32. AS-IS de sede y contexto

La superficie actual de remisiones combina referencias de navegación y autorización, incluyendo query de sede, cookie local, `employee_settings.selected_site_id`, sede por defecto, capacidad multi-sede y permisos operativos.

Esto demuestra coexistencia de mecanismos, no una separación canónica completa.

#### 33. `selected_site_id`

`selected_site_id` se trata como preferencia o referencia de navegación salvo contrato propietario que demuestre otra semántica. No satisface por sí solo sede autorizada, sede del turno, sede del recurso ni scope del permiso.

#### 34. Role override observado

El AS-IS contiene role override local y una excepción explícita de tránsito para `conductor`. Esas piezas no se elevan a regla global. Las especializaciones posteriores deberán reconciliarlas con el contrato canónico sin ampliar autoridad.

#### 35. Frontera con `NEXO-AUTH-002`

`NEXO-AUTH-002` conserva la corrección concreta del bypass administrativo de remisiones. Recibe de esta tarea modalidades separadas, contextos separados, prohibición de mezcla, decisión server-side y trazabilidad del carril que autorizó.

#### 36. Frontera con `NEXO-AUTH-003`

`NEXO-AUTH-003` conserva la semántica y corrección de `inventory.remissions.all_sites`.

Esta tarea fija únicamente:

```text
VISIBILIDAD MULTISEDE != OPERACIÓN MULTISEDE
```

#### 37. Fronteras `NEXO-AUTH-004..014`

| Tarea | Responsabilidad reservada |
| --- | --- |
| `NEXO-AUTH-004` | creación de solicitudes |
| `NEXO-AUTH-005` | edición y cancelación |
| `NEXO-AUTH-006` | preparación |
| `NEXO-AUTH-007` | producción vinculada |
| `NEXO-AUTH-008` | despacho |
| `NEXO-AUTH-009` | tránsito |
| `NEXO-AUTH-010` | recepción |
| `NEXO-AUTH-011` | ajustes |
| `NEXO-AUTH-012` | conteos |
| `NEXO-AUTH-013` | movimientos |
| `NEXO-AUTH-014` | catálogo y configuraciones |

Cada tarea aplica el contrato global sin ser absorbida por esta definición.

#### 38. Fronteras `NEXO-AUTH-015..020`

| Tarea | Responsabilidad reservada |
| --- | --- |
| `NEXO-AUTH-015` | sede y área efectivas |
| `NEXO-AUTH-016` | dispositivo compartido |
| `NEXO-AUTH-017` | simulación estricta |
| `NEXO-AUTH-018` | paquetes de `vento-shell` |
| `NEXO-AUTH-019` | helpers duplicados |
| `NEXO-AUTH-020` | pruebas integrales |

La cadena posterior consume este contrato sin redefinir sus carriles.

#### 39. Auditoría

Toda decisión protegida deberá conservar, según aplicabilidad, principal, actor efectivo, carril, modalidad, rol base, rol operativo, turno, check-in, sede, área, dispositivo, permiso, scope, recurso, decisión, razones, versión contractual y timestamp.

#### 40. Frescura y concurrencia

Cambios de rol, grant, asignación, cobertura, turno, check-in, sede, área, dispositivo, modalidad, recurso o simulación invalidan decisiones y contextos afectados conforme al contrato transversal.

Una mutación revalida cuando el contexto relevante pudo cambiar desde la evaluación anterior.

#### 41. Offline y reintentos

Una acción operativa capturada offline se reautoriza al sincronizar. Un contexto válido al momento de captura no garantiza autoridad al momento de aplicación. Reintentos no convierten una denegación o contexto expirado en `ALLOW`.

#### 42. AS-IS verificable

La revisión remota demuestra piezas parciales de ambos carriles: acceso a aplicación, helpers de permisos, sesión operativa, `get_operational_context`, `has_operational_permission`, role override, selección de sede, permisos de remisiones y superficies de configuración y operación.

La coexistencia de esas piezas no demuestra cumplimiento de extremo a extremo.

#### 43. Estrategia de adopción

```text
CONSERVAR CATÁLOGO Y MATRICES CANÓNICAS
+ CONSERVAR CONTEXTOS SEPARADOS
+ ADOPTAR EVALUACIÓN COMPARTIDA
+ MIGRAR POR IMPLEMENTATION UNIT
+ RETIRAR EXCEPCIONES SOLO DESPUÉS DE PARIDAD
+ CERTIFICAR POR PACKAGE
```

No se exige un cambio big-bang desde el marcador documental.

#### 44. Topología física futura

La cardinalidad física es `PER_IMPLEMENTATION_UNIT` y la identidad futura es:

```text
NEXO-AUTH-001::<implementation_unit_id>
```

El gate temporal es `POST_E5_PACKAGE`. Toda instancia requiere unidad asignada, paquete propietario, `E5-GATE-008::<package_id>` aplicable y autorización física explícita.

Esta tarea documental no concede esa autorización.

#### 45. Compatibilidad y rollback

Durante adopción puede coexistir código legacy con el evaluador canónico únicamente bajo paridad y observabilidad explícitas.

Se prohíbe unir decisiones para escoger el `ALLOW` favorable, usar un fallback más permisivo o retirar el control anterior sin evidencia suficiente.

El rollback concreto pertenece a cada unidad física y no debe ampliar autoridad durante la transición.

#### 46. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- la separación entre autoridad base y operativa ya está protegida por cobertura transversal vigente;
- la resolución por permiso, contexto, scope, territorio y recurso ya está protegida;
- la equivalencia entre evaluadores y capas ya está protegida;
- segregación de funciones, dispositivo compartido, frescura y auditoría ya están protegidos;
- NEXO ya dispone de cobertura para resolución territorial y remisiones;
- esta tarea especializa el contrato sin introducir una obligación verificable nueva fuera de esa cobertura.

#### 47. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-010`;
- `TREQ-AUTH-011`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-007`;
- `TREQ-NEXO-009`.

La lista documenta cobertura heredada y no representa actualización del registro.

#### 48. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define contrato documental; no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación, formato y batería documental corresponden al checkout local de la tarea |
| REMOTA | PASS | se verificó `vento-shell` main `975958e89211d456111612a7d8d6a107bdf3e9cf`, continuidad `NEXO-DOM-038 -> NEXO-AUTH-001 -> NEXO-AUTH-002`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas, universo 63/63 y AS-IS `vento-nexo` main `250097e3f615e895dbcc7236c5262f72c406235a` |
| OPERATIVA | NOT_APPLICABLE | no se concede, revoca ni ejecuta ninguna capacidad real de NEXO |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza ninguna instancia `NEXO-AUTH-001::<implementation_unit_id>` |

#### 49. Criterios de aceptación

- [x] configuración y operación quedan separadas;
- [x] se preservan las cuatro modalidades;
- [x] se preservan 63 permisos sin faltantes ni duplicados;
- [x] distribución `16 / 10 / 33 / 4`;
- [x] cada identidad tiene regla de carril;
- [x] carril base y operativo no se mezclan;
- [x] cobertura administrativa y territorio operativo quedan separados;
- [x] selección de navegación no concede autoridad;
- [x] acceso a NEXO no concede capacidades internas;
- [x] scope y recurso siguen siendo obligatorios;
- [x] servidor conserva autoridad final;
- [x] simulación y dispositivo no amplían autoridad;
- [x] las tareas `NEXO-AUTH-002..020` conservan ownership;
- [x] topología futura `PER_IMPLEMENTATION_UNIT`;
- [x] gate futuro `POST_E5_PACKAGE`;
- [x] cero cambios de requisitos de prueba;
- [x] cero cambios físicos autorizados en esta tarea.

#### 50. Límites

Esta tarea no modifica código, Supabase, migraciones, RLS, RPC, grants, catálogo físico, asignaciones, cookies, navegación, shared devices, simulación ni datos. Tampoco corrige todavía el bypass de remisiones, `inventory.remissions.all_sites`, la excepción observada de conductor, role override, `selected_site_id`, helpers duplicados o consumidores físicos. No despliega ni autoriza instancias.

#### 51. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-DOM-038 — Definir novedades locativas, severidad, contención, escalamiento, resolución y cierre`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-001 — Separar configuración administrativa de operación`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-002 — Corregir bypass administrativo de remisiones`
### ✅ NEXO-AUTH-002 — Corregir bypass administrativo de remisiones

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-001 — Separar configuración administrativa de operación
**Tarea siguiente:** NEXO-AUTH-003 — Corregir inventory.remissions.all_sites
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para eliminar el bypass administrativo de remisiones en el carril operativo, impedir que nombres de rol o permisos base satisfagan capacidades `OPERATIONAL_ONLY` y preservar separadamente las capacidades administrativas legítimas
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-002::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Eliminar como semántica válida cualquier bypass administrativo que permita a una identidad con rol base privilegiado ejecutar capacidades de remisiones clasificadas como operativas sin satisfacer el carril operativo completo.

La regla objetivo queda:

```text
ROL ADMINISTRATIVO
+
CAPACIDAD OPERATIONAL_ONLY
+
SIN CONTEXTO OPERATIVO COMPLETO
=
DENY
```

La tarea preserva las capacidades administrativas legítimas de remisiones cuando el permiso canónico admita carril base.

#### 2. Problema canónico

El estado auditado contiene dos mecanismos capaces de convertir autoridad administrativa en autorización operativa:

1. un bypass directo asociado a roles base privilegiados dentro de la resolución del contexto operativo;
2. un bypass configurable mediante permiso base de aplicación.

Ambos mecanismos son incompatibles con un permiso cuya modalidad sea `OPERATIONAL_ONLY` cuando evitan turno, check-in, rol operativo, territorio o permiso operativo exacto.

#### 3. Evidencia AS-IS consolidada

La auditoría canónica registra que el evaluador operativo puede aplicar `bypass_applied = true` antes de completar la evaluación operativa ordinaria.

También registra que el bypass administrativo observado puede evitar:

- turno activo;
- check-in;
- rol operativo;
- fila en la matriz de permisos operativos;
- permiso operativo concreto.

La auditoría identifica además que la ruta de bypass puede devolver autorización incluso ante una cadena no vacía que no represente una capacidad canónica válida. Esa conducta no forma parte del modelo objetivo.

#### 4. Bypass directo por nombre de rol

El nombre del rol base no es una fuente suficiente de autorización final.

Queda prohibida una regla equivalente a:

```text
role in {propietario, gerente_general}
→ bypass_applied = true
→ ALLOW operacional
```

La jerarquía humana o administrativa puede determinar qué permisos base existen en su matriz, pero no sustituye la modalidad del permiso solicitado.

#### 5. Bypass por permiso administrativo

Un permiso base de aplicación tampoco puede convertir una capacidad `OPERATIONAL_ONLY` en capacidad administrativa.

La regla queda:

```text
BASE PERMISSION
!=
OPERATIONAL BYPASS
```

Cuando una política de aplicación declare un permiso de bypass, ese permiso solo podrá intervenir en decisiones cuyo contrato permita explícitamente carril base. No podrá omitir prerrequisitos de una capacidad exclusivamente operativa.

#### 6. Caso NEXO actualmente asociado a bypass

La configuración auditada de NEXO contiene una referencia de bypass basada en `inventory.remissions.all_sites`.

Esta tarea no redefine el significado, alcance, catálogo, naming ni destino final de esa capacidad. Esa responsabilidad pertenece a `NEXO-AUTH-003`.

Para `NEXO-AUTH-002` se fija únicamente una restricción:

```text
inventory.remissions.all_sites
NO PUEDE
convertir una capacidad OPERATIONAL_ONLY
en una autorización base
```

#### 7. Modalidad autoritativa

La modalidad canónica del permiso prevalece sobre:

- nombre del rol;
- ubicación de una fila en una matriz;
- helper invocado primero;
- presencia de un bypass;
- selección de sede;
- pantalla administrativa;
- pantalla operativa;
- comportamiento histórico del consumidor.

Para remisiones, el evaluador debe consultar la modalidad vigente antes de decidir qué carril puede satisfacer la solicitud.

#### 8. `nexo.inventory.remissions.request`

`nexo.inventory.remissions.request` permanece clasificado como `OPERATIONAL_ONLY`.

Por tanto:

```text
BASE_ALLOW
→ IGNORAR PARA ESTA DECISIÓN
```

y:

```text
OPERATIONAL_ALLOW COMPLETO
→ CANDIDATO A ALLOW
```

Un rol base administrativo no recibe esta capacidad por su jerarquía.

#### 9. Roles administrativos privilegiados

`propietario` y `gerente_general` conservan sus responsabilidades administrativas permanentes, pero el nombre del rol no los convierte en actores operativos.

Para una acción `OPERATIONAL_ONLY`, ambos quedan sujetos a las mismas clases de prerrequisitos operativos que cualquier otro actor:

- identidad efectiva válida;
- turno publicado y vigente cuando aplique;
- check-in cuando aplique;
- rol operativo compatible;
- sede y área compatibles;
- permiso operativo exacto;
- recurso válido;
- ausencia de denegaciones.

No se crea una excepción general por rango.

#### 10. Otros roles base

La misma regla aplica a `gerente`, `supervisor` y cualquier otro rol base.

Una matriz base puede conceder capacidades `BASE_ONLY` o el componente base de modalidades híbridas cuando corresponda, pero no puede satisfacer por sí sola una capacidad `OPERATIONAL_ONLY`.

#### 11. Capacidades administrativas legítimas de remisiones

La corrección del bypass no elimina el carril base de las capacidades que sí lo admiten.

Por ejemplo, una capacidad de consulta o actualización clasificada como `BASE_OR_OPERATIONAL` puede continuar autorizándose mediante un carril base completo cuando:

- exista el permiso base exacto;
- el scope sea compatible;
- el recurso esté cubierto;
- el estado permita la acción;
- no exista una denegación aplicable.

La eliminación del bypass no debe convertir todas las remisiones en funciones exclusivamente operativas.

#### 12. No degradar administración por retirar el bypass

Se prohíbe corregir el bypass imponiendo turno o check-in universal a toda acción de remisiones.

La corrección debe preservar:

```text
BASE_OR_OPERATIONAL
→ base completo OR operativo completo
```

y:

```text
OPERATIONAL_ONLY
→ solo operativo completo
```

La seguridad se obtiene respetando la modalidad, no bloqueando indiscriminadamente el carril administrativo.

#### 13. Validación de permiso exacto

Antes de cualquier excepción o decisión positiva, el código solicitado debe corresponder a una capacidad canónica activa y resoluble.

No se admite:

```text
texto no vacío
→ permiso válido
```

Una clave inexistente, retirada, ambigua o no perteneciente al catálogo vigente produce `DENY` o error de configuración según el contrato transversal aplicable.

#### 14. `bypass_applied`

`bypass_applied` no constituye una fuente de autoridad.

Si el campo se conserva temporalmente por compatibilidad, deberá interpretarse como evidencia diagnóstica de una ruta legacy o de transición, nunca como:

- permiso;
- modalidad;
- scope;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- `ALLOW`.

Un consumidor no podrá autorizar una acción únicamente porque el campo sea verdadero.

#### 15. `can_operate`

`can_operate` tampoco sustituye la evaluación del permiso exacto.

Un contexto operativo utilizable indica que el actor puede participar en operación bajo determinadas condiciones; no significa que posea todas las capacidades operativas de NEXO.

La decisión final exige la clave exacta y su matriz correspondiente.

#### 16. Rol base y rol operativo

Los dos roles permanecen separados:

```text
ROL BASE
→ responsabilidad permanente

ROL OPERATIVO
→ función temporal del turno
```

Para una capacidad `OPERATIONAL_ONLY`, el rol base no se consulta como sustituto del rol operativo.

Un administrador que además trabaja operativamente debe obtener la autorización desde su contexto operativo real.

#### 17. Turno y check-in

Cuando el contrato operativo de la aplicación exija turno y check-in, ningún bypass administrativo podrá omitirlos.

La ausencia de cualquiera de esos elementos se conserva como causa de bloqueo propia y no se reclasifica como autorización administrativa.

#### 18. Sede y área efectivas

La sede y el área operativas deben proceder de fuentes autoritativas del contexto operativo.

No se podrán fabricar desde:

- `selected_site_id`;
- cookie de navegación;
- query string;
- sede primaria;
- última sede utilizada;
- cobertura administrativa;
- nombre del rol base.

La especialización completa de sede y área efectivas permanece en `NEXO-AUTH-015`.

#### 19. Scope

El retiro del bypass no elimina los scopes.

Un permiso operativo exacto sigue necesitando un scope compatible con la sede, área, tipo o recurso cuando el contrato así lo exija.

Una coincidencia de permiso sin scope suficiente produce denegación.

#### 20. Contrato de recurso

La autorización de una remisión debe validar el recurso real afectado.

Cuando el recurso relacione dos sedes, la autoridad sobre un extremo no concede automáticamente autoridad sobre el otro.

Las comprobaciones de recurso no pueden ser sustituidas por el hecho de ser propietario, gerente o usuario con visibilidad multisede.

#### 21. Servidor como frontera de autoridad

La decisión efectiva se recalcula en servidor.

UI, query params, formularios, rutas, estado de React, cookies de navegación y visibilidad de botones pueden expresar intención o navegación, pero no la autorización final.

#### 22. Interfaz de remisiones

La interfaz puede mostrar opciones distintas para administración y operación.

Sin embargo:

```text
BOTÓN VISIBLE
!=
ALLOW
```

y:

```text
BOTÓN OCULTO
!=
DENY DE SERVIDOR
```

La interfaz debe proyectar la misma modalidad y razones que la frontera autoritativa, sin introducir un bypass propio.

#### 23. Server Actions de remisiones

Toda Server Action que produzca efectos debe validar la capacidad exacta y el carril compatible antes del primer efecto empresarial.

Invocar un helper operativo no es suficiente si ese helper todavía incorpora un bypass administrativo incompatible con la modalidad.

La protección especializada de creación, edición, cancelación y demás acciones se desarrolla en sus tareas propietarias posteriores.

#### 24. RPC de autorización

Una RPC de autorización operativa debe:

1. resolver una clave canónica válida;
2. identificar la modalidad;
3. resolver el contexto operativo requerido;
4. comprobar permiso operativo exacto;
5. aplicar scope y recurso;
6. respetar denegaciones;
7. devolver razones reproducibles.

No debe retornar `true` únicamente por pertenecer a una lista de roles privilegiados.

#### 25. RLS y acceso a datos

RLS, funciones `SECURITY DEFINER` y otras fronteras de datos deben producir una decisión compatible con la capa de aplicación.

La eliminación del bypass en UI o Server Action no se considera suficiente si una RPC o política continúa concediendo la misma operación por una ruta más permisiva.

#### 26. Llamadas directas

El contrato debe sostenerse aunque el actor:

- llame directamente la Server Action;
- manipule el formulario;
- altere la URL;
- invoque una RPC;
- reutilice una solicitud capturada;
- omita la navegación prevista.

La seguridad no depende del camino visual.

#### 27. Dispositivos compartidos

Un dispositivo compartido no hereda privilegios administrativos del principal técnico ni de quien configuró el equipo.

Para una acción de remisiones `OPERATIONAL_ONLY`, la autoridad efectiva procede del actor humano identificado, su contexto operativo y los límites del dispositivo.

La especialización pertenece a `NEXO-AUTH-016`.

#### 28. Simulación y role override

Una simulación o role override puede mostrar cómo respondería un contexto alternativo, pero no convierte ese resultado en autorización real.

No se admite:

```text
SIMULATED ALLOW
→ REAL OPERATION
```

La integración estricta se reserva a `NEXO-AUTH-017`.

#### 29. Denegaciones

Una denegación estructural, territorial, de recurso, dispositivo, estado o contexto no puede ser anulada por el bypass administrativo.

Las razones permanecen separadas y auditables.

Una incapacidad de resolver contexto no se convierte en `ALLOW` por jerarquía.

#### 30. Fail closed

Si no puede demostrarse:

- clave canónica;
- modalidad;
- actor;
- contexto requerido;
- permiso;
- scope;
- territorio;
- recurso;
- estado;

la operación no se ejecuta.

El fallback seguro nunca es el bypass administrativo.

#### 31. Fallo técnico frente a denegación

Una indisponibilidad técnica del evaluador no se representa como permiso denegado estable ni como autorización.

Debe conservarse la diferencia entre:

```text
DENY
UNAVAILABLE
INVALID_CONTEXT
INVALID_PERMISSION
```

La experiencia posterior podrá mapear esos estados a mensajes seguros sin perder la causa interna.

#### 32. Auditoría

Cada decisión afectada por la eliminación del bypass deberá ser correlacionable, según aplicabilidad, con:

- principal;
- actor;
- permiso;
- modalidad;
- carril;
- rol base;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- recurso;
- decisión;
- razones;
- versión contractual;
- timestamp.

La auditoría registra también denegaciones.

#### 33. Frescura y concurrencia

Cambios de rol, permiso, turno, check-in, sede, área, dispositivo, modalidad o recurso invalidan decisiones afectadas.

Una autorización calculada antes de un cambio relevante no puede reutilizarse para ejecutar después del cambio sin revalidación.

#### 34. Offline y replay

Una intención operativa capturada offline debe reautorizarse al sincronizar.

Un replay no puede conservar el beneficio de un bypass administrativo retirado ni transformar una decisión histórica en autoridad vigente.

#### 35. No hardcodear jerarquías

La materialización objetivo no sustituirá una lista de roles privilegiados por otra lista equivalente.

Se prohíbe que una nueva comparación como:

```text
if role is management
```

sea la fuente de `ALLOW` para remisiones operativas.

La autoridad debe proceder de permiso, modalidad, contexto y recurso.

#### 36. Estado actual de `propietario`

El contrato canónico concede al rol base `propietario` diversas capacidades administrativas de NEXO, pero no le asigna `nexo.inventory.remissions.request` como capacidad base.

Por tanto, la condición de propietario no basta para solicitar una remisión operativa.

#### 37. Estado actual de `gerente_general`

El contrato canónico aplica la misma frontera a `gerente_general`: la capacidad de solicitar remisiones no se concede desde su rol base.

Si el mismo humano participa en una operación, debe resolver un carril operativo válido.

#### 38. Lectura y actualización administrativa

La corrección no revoca por inferencia capacidades de remisiones que el catálogo clasifique como `BASE_OR_OPERATIONAL`.

`view` y `update`, cuando estén concedidas al rol y cubran el recurso, pueden continuar por carril base.

La modalidad de cada clave sigue siendo la autoridad.

#### 39. Solicitud operativa

La solicitud de remisión permanece una acción operativa.

Esta tarea elimina la excepción administrativa general; `NEXO-AUTH-004` conserva la protección completa de creación de solicitudes, incluyendo validaciones específicas de actor, contexto, área, productos, recurso y transición.

#### 40. Frontera con `NEXO-AUTH-003`

`NEXO-AUTH-003` conserva la definición y corrección específica de `inventory.remissions.all_sites`.

Esta tarea no decide:

- si la clave se conserva;
- si se renombra;
- qué scope final usa;
- qué roles la reciben;
- qué superficie la consume;
- cómo migra el legado.

Solo prohíbe usarla como bypass de capacidades incompatibles con carril base.

#### 41. Fronteras `NEXO-AUTH-004..010`

| Tarea | Responsabilidad reservada |
| --- | --- |
| `NEXO-AUTH-004` | proteger creación de solicitudes |
| `NEXO-AUTH-005` | proteger edición y cancelación |
| `NEXO-AUTH-006` | proteger preparación |
| `NEXO-AUTH-007` | proteger producción vinculada |
| `NEXO-AUTH-008` | proteger despacho |
| `NEXO-AUTH-009` | proteger tránsito |
| `NEXO-AUTH-010` | proteger recepción |

`NEXO-AUTH-002` define la ausencia de bypass administrativo global; no reemplaza los contratos específicos de cada transición.

#### 42. Fronteras `NEXO-AUTH-011..020`

| Tarea | Responsabilidad reservada |
| --- | --- |
| `NEXO-AUTH-011` | ajustes de inventario |
| `NEXO-AUTH-012` | conteos |
| `NEXO-AUTH-013` | movimientos |
| `NEXO-AUTH-014` | catálogo y configuraciones |
| `NEXO-AUTH-015` | sede y área efectivas |
| `NEXO-AUTH-016` | dispositivo compartido |
| `NEXO-AUTH-017` | simulación estricta |
| `NEXO-AUTH-018` | paquetes de `vento-shell` |
| `NEXO-AUTH-019` | helpers duplicados |
| `NEXO-AUTH-020` | pruebas integrales |

Estas tareas consumen la regla anti-bypass sin ser absorbidas por ella.

#### 43. Criterio de paridad entre evaluadores

Para el mismo actor, permiso, modalidad, contexto y recurso:

```text
UI DECISION
=
SERVER ACTION DECISION
=
RPC DECISION
=
RLS / DATA DECISION
```

Las razones públicas pueden minimizarse, pero la decisión material no puede divergir.

#### 44. Adopción física futura

La corrección física deberá localizar todas las rutas que todavía conviertan autoridad administrativa en autorización operacional de remisiones.

La adopción puede involucrar evaluadores compartidos, configuración de política y consumidores NEXO, pero cada cambio se asignará a una `implementation_unit_id` real antes de ejecutarse.

No se inventan unidades desde esta definición.

#### 45. Topología y gate

La topología aplicable es:

```text
PER_IMPLEMENTATION_UNIT
```

La identidad física futura usa:

```text
NEXO-AUTH-002::<implementation_unit_id>
```

El gate temporal aplicable es:

```text
POST_E5_PACKAGE
```

Ninguna instancia física queda autorizada por esta tarea documental.

#### 46. Compatibilidad transitoria

Durante migración puede coexistir una ruta legacy con el evaluador corregido únicamente si la compatibilidad es explícita, observable y no amplía autoridad.

Queda prohibido:

- escoger el resultado más permisivo;
- unir dos decisiones parciales para obtener `ALLOW`;
- mantener el bypass como fallback silencioso;
- conservar una ruta alternativa que acepte el rol base para la misma acción operativa.

#### 47. Rollback

El rollback de una futura materialización debe restaurar una versión conocida sin reintroducir un bypass universal.

Cuando una reversión técnica requiera volver temporalmente a un evaluador anterior, la operación afectada deberá quedar bloqueada o protegida por una barrera equivalente hasta recuperar una versión compatible.

Rollback no significa restaurar una escalación de privilegios conocida.

#### 48. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- ya existe cobertura transversal para impedir autorización por listas locales de roles;
- ya existe cobertura para separar capacidades administrativas y operativas;
- ya existe cobertura para exigir contexto operativo, territorio y recurso;
- ya existe cobertura para impedir bypass por URL, formulario, API o RPC;
- ya existe cobertura de paridad entre evaluadores;
- ya existe cobertura NEXO para jerarquía canónica de decisiones de remisiones.

La tarea especializa esas obligaciones en el bypass administrativo de remisiones sin crear una obligación verificable nueva.

#### 49. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-010`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-007`;
- `TREQ-NEXO-009`.

Estas referencias son trazabilidad de cobertura existente y no representan una actualización del registro.

#### 50. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificó `vento-shell` main `5e09cea4f7a284e13f6789aa012028d4fbf691b3`, cierre de `NEXO-AUTH-001`, continuidad hacia `NEXO-AUTH-002`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, matrices canónicas, auditoría del bypass, 04A vigente y AS-IS de remisiones en `vento-nexo` main `250097e3f615e895dbcc7236c5262f72c406235a` |
| OPERATIVA | NOT_APPLICABLE | no se modifica ni ejecuta una remisión real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-002::<implementation_unit_id>` |

#### 51. Criterios de aceptación

- [x] el rol base privilegiado deja de ser una fuente válida de bypass operacional;
- [x] un permiso base no satisface una capacidad `OPERATIONAL_ONLY`;
- [x] `nexo.inventory.remissions.request` conserva modalidad operativa;
- [x] `propietario` no obtiene solicitud operativa por su nombre de rol;
- [x] `gerente_general` no obtiene solicitud operativa por su nombre de rol;
- [x] se exige clave canónica válida antes de autorizar;
- [x] `bypass_applied` no constituye autoridad;
- [x] `can_operate` no sustituye el permiso exacto;
- [x] turno, check-in, rol operativo, sede y área no pueden omitirse cuando correspondan;
- [x] scope y recurso siguen siendo obligatorios;
- [x] las capacidades administrativas legítimas no quedan bloqueadas por exigir contexto operativo universal;
- [x] UI, servidor, RPC y datos deben converger;
- [x] `inventory.remissions.all_sites` queda reservado a `NEXO-AUTH-003`;
- [x] creación queda reservada a `NEXO-AUTH-004`;
- [x] las protecciones `NEXO-AUTH-005..020` conservan ownership;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT`;
- [x] el gate futuro conserva `POST_E5_PACKAGE`;
- [x] no se crea ni modifica requisito de prueba;
- [x] no se autoriza cambio físico.

#### 52. Límites

Esta tarea no:

- modifica código NEXO;
- modifica funciones o RPC;
- modifica Supabase;
- modifica RLS;
- modifica `app_operation_policies`;
- elimina físicamente el bypass;
- redefine `inventory.remissions.all_sites`;
- cambia matrices de rol;
- cambia el catálogo de permisos;
- cambia scopes;
- protege físicamente creación, edición, cancelación, preparación, producción, despacho, tránsito o recepción;
- cambia dispositivos compartidos;
- cambia simulación;
- elimina helpers;
- despliega;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 53. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-001 — Separar configuración administrativa de operación`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-002 — Corregir bypass administrativo de remisiones`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-003 — Corregir inventory.remissions.all_sites`
### ✅ NEXO-AUTH-003 — Corregir inventory.remissions.all_sites

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-002 — Corregir bypass administrativo de remisiones
**Tarea siguiente:** NEXO-AUTH-004 — Proteger creación de solicitudes
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para retirar `inventory.remissions.all_sites` como permiso independiente y booleano de privilegio, converger su intención legítima en `nexo.inventory.remissions.view` y resolver la amplitud multisede o multiárea exclusivamente mediante scope, recurso y contexto canónicos
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-003::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Corregir la semántica de `inventory.remissions.all_sites` para que deje de representar una capacidad independiente, un bypass operativo, un selector global de sedes, un selector global de áreas o una condición especial de autorización.

La decisión canónica es:

```text
LEGACY inventory.remissions.all_sites
→ NO ES PERMISO CANÓNICO INDEPENDIENTE
→ CONVERGE EN nexo.inventory.remissions.view
→ LA AMPLITUD SE RESUELVE MEDIANTE SCOPE
```

La visibilidad transversal se obtiene de la capacidad exacta de consulta y del alcance concedido. No se obtiene de una clave paralela que codifique territorio dentro del nombre del permiso.

#### 2. Problema que se resuelve

El AS-IS mezcla en una misma clave legacy conceptos distintos:

- permiso de consultar remisiones;
- capacidad de consultar más de una sede;
- capacidad de ignorar el filtro de área;
- habilitación de una vista “Todas las sedes”;
- selección manual de sede;
- ramificación hacia helpers de autorización distintos;
- bypass de prerrequisitos operativos.

Esta mezcla viola la separación canónica entre:

```text
QUÉ PUEDE HACER
DÓNDE PUEDE HACERLO
EN QUÉ CARRIL
SOBRE QUÉ RECURSO
```

#### 3. Decisión principal

`inventory.remissions.all_sites` queda clasificado como identidad legacy de consulta y no como capacidad canónica activa.

Su destino contractual es:

```text
nexo.inventory.remissions.all_sites
→ nexo.inventory.remissions.view
```

La parte `all_sites` no se traslada al código canónico. Se expresa mediante el scope efectivo de `nexo.inventory.remissions.view`.

#### 4. Regla de normalización heredada

La normalización canónica ya agrupa bajo `nexo.inventory.remissions.view` las identidades legacy de consulta de remisiones, incluyendo:

- `nexo.inventory.remissions`;
- `nexo.inventory.remissions.all_sites`;
- `nexo.inventory.remissions.view_dispatch`;
- `nexo.inventory_remissions_id.view`;
- `nexo.inventory_remissions.view`.

Para `all_sites`, la regla específica es:

```text
all_sites
→ se elimina del código
→ se resolverá mediante alcance
```

Esta tarea especializa y hace consumible esa decisión dentro de NEXO.

#### 5. Capacidad canónica sustituta

La capacidad canónica es:

```text
nexo.inventory.remissions.view
```

Su modalidad permanece:

```text
BASE_OR_OPERATIONAL
```

Por tanto, la consulta puede ser satisfecha por un carril base completo o por un carril operativo completo, sin mezclar componentes incompletos de ambos.

#### 6. Scope canónico de consulta

`nexo.inventory.remissions.view` admite alcance base mediante:

```text
G
AS
SS
AST
TST
AA
SA
AAT
ATW
```

y alcance operativo mediante:

```text
CTX + relación legítima con un lado o función de la remisión
```

El máximo base permitido es `G(B)`.

Esto significa que la consulta multisede existe, pero es una propiedad del grant y su scope, no una capacidad distinta.

#### 7. Regla de territorio

La amplitud de la consulta se obtiene así:

```text
PERMISO CANÓNICO EXACTO
+
CARRIL VÁLIDO
+
SCOPE CONCEDIDO
+
RECURSO RESUELTO
+
RELACIÓN AUTORIZADA
+
DENEGACIONES
=
CONJUNTO VISIBLE
```

No se admite:

```text
all_sites = true
→ consultar todo
```

#### 8. Visibilidad multisede

La visibilidad multisede es una proyección del conjunto autorizado.

Ejemplos contractuales:

```text
remissions.view + G(B)
→ puede producir una colección de varias sedes ordinarias

remissions.view + AS
→ unión de sedes activamente asignadas

remissions.view + SS
→ una sede específica

remissions.view + CTX
→ recursos relacionados con el contexto operativo autorizado
```

No se crea un permiso paralelo para cada amplitud.

#### 9. Visibilidad multiárea

La amplitud de área se resuelve mediante el scope aprobado y el recurso, no mediante `all_sites`.

Se separan obligatoriamente:

```text
MULTI_SITE_VISIBILITY
!=
ALL_AREA_VISIBILITY
```

Una capacidad que cubra varias sedes no recibe por inferencia todas las áreas de cada sede. El conjunto de áreas debe quedar incluido por el scope aplicable o por la relación operacional válida.

#### 10. `canViewAll`

Un booleano local llamado `canViewAll`, `allSites`, `canSeeAllAreas` o equivalente no constituye una fuente de autoridad.

Puede existir como proyección derivada después de resolver una decisión completa, pero no podrá ser el insumo primario que:

- seleccione el permiso a consultar;
- amplíe sedes;
- amplíe áreas;
- cambie de carril;
- omita contexto operativo;
- conceda acciones de mutación.

#### 11. Pantalla “Todas las sedes”

La opción visual “Todas las sedes” podrá existir cuando el conjunto autorizado contenga más de una sede y la experiencia aprobada permita agregarlo.

Su significado será:

```text
mostrar la unión ya autorizada
```

No:

```text
crear autoridad multisede
```

La ausencia de una sede seleccionada tampoco equivale automáticamente a alcance global.

#### 12. Sede seleccionada

`selected_site_id`, cookie, query string, preferencia administrativa o selector de UI puede reducir o enfocar la colección autorizada.

No puede ampliarla.

Regla:

```text
SELECCIÓN DE SEDE
⊆
SCOPE AUTORIZADO
```

Una sede enviada por cliente que quede fuera del scope produce denegación o conjunto vacío según el contrato de lectura; nunca amplía la concesión.

#### 13. Área seleccionada

Un `area_kind`, `area_id` o filtro equivalente enviado por interfaz puede reducir el conjunto autorizado.

No puede convertir:

- una sede autorizada en todas sus áreas;
- un área autorizada en toda la sede;
- una relación operativa en alcance administrativo;
- una consulta en permiso de mutación.

#### 14. Recurso canónico

`nexo.inventory.remissions.view` protege un recurso `REMISSION` localizado por:

```text
remission_id
```

o por un filtro relacional autorizado.

Su resolución territorial es:

```text
REMISSION_RELATION
```

que considera origen, destino, áreas, ruta y actores relacionados.

#### 15. Lectura por relación legítima

Una remisión puede ser visible cuando exista relación legítima del actor con:

- creador o solicitante;
- origen;
- destino;
- preparación;
- transporte;
- recepción;
- coordinación autorizada.

La relación permite evaluar la lectura; no produce propiedad total del recurso ni autoridad mutadora sobre todos sus lados.

#### 16. Recurso multisede

Una remisión relaciona al menos origen y destino y puede incorporar ruta, áreas y actores.

Para lectura:

```text
RELACIÓN LEGÍTIMA CON UN LADO O FUNCIÓN
+
SCOPE COMPATIBLE
→ PUEDE AUTORIZAR LA LECTURA PERMITIDA
```

pero:

```text
VER UN LADO
!=
MUTAR EL OTRO LADO
```

Los campos o lados no autorizados deberán minimizarse u ocultarse cuando corresponda.

#### 17. Colecciones y filtros

Las listas de remisiones deben construirse en servidor desde el conjunto autorizado.

Orden conceptual:

1. resolver actor y carril;
2. resolver `nexo.inventory.remissions.view`;
3. resolver scope efectivo;
4. resolver relaciones y territorios de las remisiones;
5. construir el conjunto permitido;
6. aplicar filtros solicitados;
7. paginar, ordenar o agregar.

No se consulta primero una colección global para filtrarla únicamente en cliente.

#### 18. Paginación y agregados

La paginación no puede reducir accidentalmente el conjunto autorizado antes de aplicar su frontera de seguridad.

Los agregados multisede:

- solo incluyen remisiones autorizadas;
- no revelan conteos de territorios excluidos;
- no permiten inferir sedes o áreas fuera del scope;
- mantienen semántica equivalente a consultar individualmente los miembros permitidos.

#### 19. Propietario

Para `propietario`, la matriz canónica asigna `nexo.inventory.remissions.view` por carril base con alcance `G(B)`.

Por tanto, su visibilidad transversal legítima procede de:

```text
remissions.view
+
G(B)
```

No de `inventory.remissions.all_sites` ni del nombre del rol.

#### 20. Gerente general

Para `gerente_general`, la matriz canónica asigna también `nexo.inventory.remissions.view` por carril base con alcance `G(B)`.

La misma regla aplica:

```text
PERMISO + SCOPE
```

no:

```text
ROL + all_sites
```

#### 21. Gerente

Para `gerente`, `nexo.inventory.remissions.view` se limita mediante `AS-REL`.

La lectura puede cubrir recursos relacionales que involucren sedes asignadas, pero la participación de una sede autorizada no concede autoridad general sobre sedes no asignadas.

La amplitud se obtiene de sus asignaciones reales y del contrato de remisión.

#### 22. Supervisor

Para `supervisor`, la consulta también se limita mediante una relación territorial equivalente a `AS-REL` según su matriz.

La existencia de una remisión con un extremo conocido no convierte al supervisor en actor multisede global.

#### 23. Otros roles base

Cada rol base recibe exactamente la concesión y scope aprobados por su matriz.

La migración de `all_sites` no puede:

- conceder `G(B)` por defecto;
- copiar el alcance de propietario a otros roles;
- inferir alcance desde jerarquía;
- crear una nueva asignación porque el código legacy existía.

#### 24. Carril operativo

En carril operativo, `nexo.inventory.remissions.view` usa `CTX` más una relación legítima con un lado o función.

El contexto operativo no hereda un `G(B)` del actor aunque el mismo humano posea además una concesión base global.

Cada carril produce su propia decisión completa.

#### 25. Dispositivos compartidos

Un dispositivo compartido no obtiene visibilidad multisede porque exista `all_sites` en una matriz o catálogo legacy.

La consulta efectiva debe intersectar:

- actor humano efectivo;
- permiso `nexo.inventory.remissions.view`;
- scope del actor;
- techo del dispositivo;
- sede y área del contexto aplicable;
- recurso y relación;
- denegaciones.

La especialización completa permanece en `NEXO-AUTH-016`.

#### 26. Role override y simulación

Un role override o simulación puede proyectar el resultado de otra matriz dentro de sus reglas, pero no reactiva `all_sites` como permiso activo.

Toda proyección debe usar:

```text
nexo.inventory.remissions.view
+
scope de la identidad simulada o proyectada
```

sin convertir la simulación en autoridad real.

La integración estricta permanece en `NEXO-AUTH-017`.

#### 27. Bypass administrativo

`inventory.remissions.all_sites` no puede figurar como causa de bypass de una capacidad operativa.

La configuración legacy:

```text
bypass_permission_code = inventory.remissions.all_sites
```

no forma parte del estado objetivo.

Esta tarea no aprueba una clave sustituta de bypass. La eliminación general de la semántica de bypass pertenece a `NEXO-AUTH-002` y permanece vigente.

#### 28. `app_operation_policies`

Una futura materialización deberá retirar la dependencia de `inventory.remissions.all_sites` donde `app_operation_policies` u otra configuración la use como bypass.

La política podrá continuar definiendo prerrequisitos operativos por aplicación o acción, pero no podrá utilizar una identidad legacy de lectura como permiso que elimina esos prerrequisitos.

#### 29. Áreas operativas

El helper de áreas de remisiones no debe interpretar `all_sites` como `canSeeAllAreas`.

La decisión de áreas se obtiene de:

- scope canónico aplicable;
- contexto operativo cuando corresponda;
- áreas habilitadas para remisiones;
- territorio real del recurso;
- límites del dispositivo;
- denegaciones.

No se deriva del nombre de una clave legacy.

#### 30. Fulfillment y logística

Una visibilidad amplia de remisiones o de sedes no concede automáticamente:

- preparar;
- producir;
- despachar;
- crear cargas;
- registrar tránsito;
- recibir.

Cada acción conserva su permiso, modalidad, scope, recurso y estado propios.

Los contratos específicos permanecen en `NEXO-AUTH-006` a `NEXO-AUTH-010`.

#### 31. Prohibición de cambio de carril por visibilidad

Se prohíbe una bifurcación equivalente a:

```text
canViewAll = true
→ evaluar prepare/transit por carril base
```

La amplitud de una consulta no cambia la modalidad de una mutación.

Una capacidad `OPERATIONAL_ONLY` continúa siendo operativa aunque el actor posea una consulta global por carril base.

#### 32. Creación de solicitudes

La visibilidad de todas las remisiones o de varias sedes no concede `nexo.inventory.remissions.request`.

La creación mantiene:

- permiso propio;
- modalidad `OPERATIONAL_ONLY`;
- lado solicitante;
- ruta válida;
- contexto y políticas aplicables.

La protección completa queda reservada a `NEXO-AUTH-004`.

#### 33. Edición y cancelación

`nexo.inventory.remissions.view` no concede actualización ni cancelación.

El reemplazo de `all_sites` no debe utilizarse para ampliar:

- `update`;
- edición propia pendiente;
- cancelación;
- reversa;
- eliminación.

La protección específica queda reservada a `NEXO-AUTH-005`.

#### 34. Preparación

La consulta multisede no concede preparación del lado de origen.

`NEXO-AUTH-006` conserva la protección exacta de preparación y sus restricciones de sede, área, estado e inventario.

#### 35. Producción vinculada

La consulta multisede no concede ejecutar producción para satisfacer una remisión.

La protección correspondiente permanece en `NEXO-AUTH-007`.

#### 36. Despacho

La consulta multisede no concede despachar ni iniciar tránsito.

El permiso y la transición de despacho permanecen en `NEXO-AUTH-008`.

#### 37. Tránsito

La consulta multisede no concede registrar ni operar tránsito logístico.

La protección correspondiente permanece en `NEXO-AUTH-009`.

#### 38. Recepción

La consulta multisede no concede recepción en destino.

La protección correspondiente permanece en `NEXO-AUTH-010`.

#### 39. Identidad legacy en código

El estado objetivo exige cero consumidores de runtime que utilicen `inventory.remissions.all_sites` como permiso funcional.

La identidad legacy podrá existir únicamente en una capa de compatibilidad o migración explícita mientras sea necesaria para transformar datos existentes, con trazabilidad y criterio de retiro.

No podrá seguir apareciendo como nueva dependencia de aplicación.

#### 40. Alias transitorio

Si una versión de transición conserva un alias para `nexo.inventory.remissions.all_sites`, deberá cumplir simultáneamente:

- apuntar directamente a `nexo.inventory.remissions.view`;
- no ser un permiso activo independiente;
- heredar íntegramente modalidad, scope y contrato del permiso canónico;
- no ampliar territorio;
- no convertir el scope legacy en `G(B)` por defecto;
- no apuntar a otro alias;
- registrar uso para migración;
- declarar condición de retiro.

El alias no es el estado final del consumidor.

#### 41. Asignaciones legacy

Una fila legacy que conceda `all_sites` no se convierte automáticamente en un grant global de `remissions.view`.

La migración debe reconciliarla contra:

- rol o empleado propietario de la fila;
- matriz canónica vigente;
- scope histórico verificable;
- cobertura administrativa vigente;
- límites de recurso;
- denegaciones.

Cuando no pueda demostrarse un mapeo equivalente sin ampliación, la migración falla cerrada y requiere decisión explícita dentro del owner canónico correspondiente.

#### 42. Nuevas asignaciones

Desde la materialización de este contrato queda prohibido crear nuevas asignaciones, excepciones, políticas o guards que utilicen:

```text
nexo.inventory.remissions.all_sites
```

o:

```text
inventory.remissions.all_sites
```

Los nuevos consumidores utilizan exclusivamente la clave canónica de consulta y su scope.

#### 43. Observación AS-IS de consumidores

En el estado remoto auditado se observó la cadena legacy en cinco superficies del repositorio NEXO:

1. hub de remisiones;
2. fulfillment — página;
3. fulfillment — Server Actions;
4. edición de remisión;
5. helper de scope operativo de áreas.

Este inventario es evidencia del AS-IS, no una lista cerrada de implementación futura. Cada `implementation_unit_id` deberá volver a inventariar consumidores y configuración contra su commit base antes de modificar.

#### 44. Hub de remisiones AS-IS

El hub actual usa `all_sites` para construir un `canViewAll` y puede interpretar ausencia de sede activa como vista “Todas las sedes”.

También propaga el mismo booleano hacia la resolución de áreas.

El estado objetivo reemplaza ambos usos por decisiones derivadas de `remissions.view` y scopes independientes de sede y área.

#### 45. Fulfillment AS-IS

La superficie de fulfillment usa `all_sites` para habilitar selección entre sedes y para escoger una rama distinta de autorización.

En esa rama, capacidades de preparación y tránsito pueden terminar consultadas mediante autorización base.

El estado objetivo prohíbe que la visibilidad multisede altere el carril exigido por las capacidades de mutación.

#### 46. Helper de áreas AS-IS

El helper observado declara `REMISSIONS_ALL_AREAS_PERMISSION` con el valor legacy `inventory.remissions.all_sites` y lo utiliza para producir `canSeeAllAreas`.

Esta equivalencia queda retirada:

```text
ALL_SITES
!=
ALL_AREAS
```

La resolución de áreas consume contrato y contexto propios.

#### 47. Edición AS-IS

La superficie de edición conserva una declaración de `remissionsAllSites` en su mapa local de permisos.

Toda dependencia residual, utilizada o muerta, debe eliminarse o reconciliarse durante la materialización para que una búsqueda estática no conserve la identidad legacy en consumidores de runtime.

La autorización concreta de edición continúa perteneciendo a `NEXO-AUTH-005`.

#### 48. Catálogo y contratos compartidos

La fuente técnica canónica de permisos se mantiene en `vento-shell`.

NEXO no deberá reconstruir mediante strings locales:

- el código canónico;
- su modalidad;
- sus scopes admitidos;
- su contrato de recurso;
- aliases legacy;
- estado de retiro.

Los consumidores deberán migrar hacia contratos y tipos compartidos cuando la implementación propietaria lo materialice.

#### 49. Versionado

Retirar `all_sites` de consumidores o de proyecciones físicas debe respetar el versionado de catálogo y compatibilidad.

No se edita silenciosamente una versión publicada para cambiar el significado de una clave.

Una publicación que cambie aliases, proyección o compatibilidad debe conservar:

- versión;
- changelog;
- checksum;
- telemetría de alias cuando aplique;
- relación con la versión sustituida;
- estrategia de consumidores.

#### 50. Migración de datos y configuración

Si existen filas físicas en catálogos, matrices, excepciones, navegación, pantallas, políticas operativas u otras tablas que referencien `all_sites`, la implementación deberá clasificarlas antes de modificar:

```text
ACTIVE_CONSUMER
LEGACY_ASSIGNMENT
COMPATIBILITY_ALIAS
STALE_REFERENCE
INVALID_REFERENCE
```

Cada clase tiene salida explícita. No se realiza un reemplazo textual ciego que convierta cualquier uso en un grant global.

#### 51. Compatibilidad

Durante una ventana de compatibilidad, una solicitud que llegue con la identidad legacy puede resolverse solo mediante la equivalencia autorizada hacia `remissions.view` y el scope real del actor.

No se conserva la semántica histórica de “ver todo” por el solo hecho de usar la clave antigua.

El consumidor que dependa de esa semántica debe corregirse; no se amplía el contrato canónico para mantenerlo funcionando.

#### 52. Fail closed

Si un uso legacy no puede clasificarse o migrarse sin conocer:

- actor;
- matriz;
- scope;
- recurso;
- carril;
- finalidad;

no se convierte automáticamente.

La salida es bloqueo de esa migración o referencia hasta que exista evidencia suficiente.

#### 53. Auditoría

Las decisiones de consulta de remisiones deben ser reproducibles mediante:

- principal;
- actor efectivo;
- permiso canónico;
- carril;
- scope;
- sede o conjunto de sedes aplicable;
- área o conjunto de áreas cuando corresponda;
- recurso o filtro relacional;
- decisión;
- razones;
- versión contractual;
- timestamp.

El uso de un alias legacy, mientras exista, debe quedar distinguible.

#### 54. Frescura

Cambios en:

- asignaciones de sede;
- cobertura administrativa;
- grants;
- scope;
- turno;
- check-in;
- rol operativo;
- estado del recurso;
- ruta;
- dispositivo;
- catálogo;

deben invalidar decisiones afectadas antes de reutilizar la colección o ejecutar una acción posterior.

#### 55. Offline y caché

Una colección cacheada de varias sedes no representa autoridad futura.

Al refrescar o sincronizar:

- se recalcula `remissions.view`;
- se recalcula scope;
- se filtran recursos ya no autorizados;
- no se ejecutan mutaciones desde un snapshot de visibilidad;
- un alias legacy no mantiene alcance antiguo.

#### 56. Rollback

Un rollback técnico de una futura materialización no podrá restaurar `all_sites` como bypass operativo ni como autoridad universal.

Si la compatibilidad obliga temporalmente a reconocer la identidad legacy, debe conservarse el mapeo fail-closed hacia `remissions.view` y el scope canónico.

Un rollback no justifica reintroducir semántica retirada.

#### 57. Handoff a `NEXO-AUTH-004`

`NEXO-AUTH-004` recibe:

```text
CANONICAL REMISSION VIEW PERMISSION
+
SCOPE-BASED MULTI-SITE VISIBILITY
+
SEPARATE SITE / AREA BREADTH
+
NO all_sites BYPASS
+
SERVER-SIDE AUTHORIZED COLLECTION
+
LEGACY KEY RETIREMENT CONTRACT
```

Con ese handoff, la creación de solicitudes puede protegerse sin heredar una excepción multisede que altere su carril operativo.

#### 58. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- ya existe cobertura para exigir identificadores de permiso vigentes y eliminar strings huérfanos o duplicados;
- ya existe cobertura para impedir autorización mediante excepciones locales que ignoren scopes;
- ya existe cobertura para separar capacidades administrativas y operativas;
- ya existe cobertura territorial de sede y área;
- ya existe cobertura contra bypass por URL, API, RPC o formulario;
- ya existe cobertura de invalidación y trazabilidad;
- ya existe cobertura NEXO para fallbacks legacy y jerarquía unificada de remisiones.

La tarea especializa esas obligaciones en la identidad legacy `all_sites` sin crear una obligación verificable nueva.

#### 59. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-002`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-007`;
- `TREQ-NEXO-009`.

Estas referencias son trazabilidad de cobertura existente y no representan una actualización del registro.

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificó `main` vigente de `vento-shell`, cierre de `NEXO-AUTH-002`, continuidad hacia `NEXO-AUTH-003`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, normalización de catálogo, alcance y recurso de `remissions.view`, matrices, 04A vigente y consumidores AS-IS de `all_sites` en `vento-nexo` |
| OPERATIVA | NOT_APPLICABLE | no se consulta, modifica ni ejecuta una remisión real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-003::<implementation_unit_id>` |

#### 61. Criterios de aceptación

- [x] `inventory.remissions.all_sites` queda clasificado como identidad legacy y no como permiso canónico independiente;
- [x] la capacidad sustituta exacta es `nexo.inventory.remissions.view`;
- [x] `all_sites` desaparece del contrato de consumidores de runtime;
- [x] la amplitud multisede se expresa mediante scope;
- [x] la amplitud multiárea se resuelve de forma independiente;
- [x] “Todas las sedes” queda definida como proyección del conjunto autorizado;
- [x] una sede o área seleccionada solo puede reducir, nunca ampliar, el conjunto permitido;
- [x] `remissions.view` conserva modalidad `BASE_OR_OPERATIONAL`;
- [x] el alcance base máximo permanece `G(B)` y no se deriva por nombre de rol;
- [x] el carril operativo permanece `CTX` más relación legítima;
- [x] la consulta multisede no concede mutaciones;
- [x] la visibilidad amplia no cambia el carril de `request`, `prepare`, `dispatch`, tránsito o recepción;
- [x] `all_sites` deja de equivaler a `canSeeAllAreas`;
- [x] la configuración de bypass no puede continuar dependiendo de `all_sites`;
- [x] un alias transitorio, si existe, no amplía capacidad ni scope;
- [x] las asignaciones legacy se reconcilian contra matrices y scope sin promoción automática a global;
- [x] no se permiten nuevas asignaciones con la identidad legacy;
- [x] los cinco consumidores AS-IS observados quedan documentados como inventario no exhaustivo;
- [x] `NEXO-AUTH-004` recibe el handoff sin absorberse su protección de creación;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT`;
- [x] el gate futuro conserva `POST_E5_PACKAGE`;
- [x] no se crea ni modifica requisito de prueba;
- [x] no se autoriza cambio físico.

#### 62. Límites

Esta tarea no:

- modifica código NEXO;
- modifica paquetes de `vento-shell`;
- modifica Supabase;
- modifica migraciones;
- modifica RLS;
- modifica RPC;
- modifica grants;
- modifica `app_operation_policies`;
- elimina físicamente `all_sites`;
- crea o cambia físicamente aliases;
- migra asignaciones;
- cambia matrices canónicas ya aprobadas;
- cambia la modalidad de `nexo.inventory.remissions.view`;
- cambia scopes aprobados;
- protege físicamente creación, edición, cancelación, preparación, producción, despacho, tránsito o recepción;
- cambia shared devices;
- cambia simulación;
- despliega;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 63. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-002 — Corregir bypass administrativo de remisiones`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-003 — Corregir inventory.remissions.all_sites`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-004 — Proteger creación de solicitudes`
### ✅ NEXO-AUTH-004 — Proteger creación de solicitudes

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-003 — Corregir inventory.remissions.all_sites
**Tarea siguiente:** NEXO-AUTH-005 — Proteger edición y cancelación
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger la creación de solicitudes de remisión mediante `nexo.inventory.remissions.request`, exigir un carril operativo completo, resolver y validar el borrador del lado solicitante en servidor y garantizar una creación fail-closed, atómica, idempotente, auditable y recuperable
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-004::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger la creación de solicitudes de remisión para que solo una autorización operativa completa pueda producir una nueva solicitud empresarial y para que autorización, validación del borrador, persistencia de cabecera, líneas, ruta, tareas derivadas y evidencia formen una frontera coherente.

La decisión objetivo es:

```text
ACTOR EFECTIVO
+ PERMISO nexo.inventory.remissions.request
+ CARRIL OPERATIVO VÁLIDO
+ TURNO VIGENTE
+ CHECK-IN ACTIVO
+ ROL OPERATIVO COMPATIBLE
+ SEDE SOLICITANTE AUTORIZADA
+ ÁREA CUANDO LA MATRIZ O EL ROL LA EXIJA
+ BORRADOR CANÓNICO RESUELTO
+ RUTA VÁLIDA
+ PRODUCTOS / PRESENTACIONES / POLÍTICAS VÁLIDOS
+ DENEGACIONES AUSENTES
→ CREACIÓN AUTORIZABLE
```

Una interfaz visible, una sede seleccionada, un rol base, un helper genérico o una escritura parcial no sustituyen esta decisión.

#### 2. Problema que se resuelve

La creación de una remisión es una mutación empresarial que relaciona al menos:

- actor solicitante;
- sede solicitante o destino;
- sede origen permitida;
- área solicitante cuando aplique;
- líneas de producto;
- cantidades;
- unidades o presentaciones;
- políticas de solicitud;
- ruta de abastecimiento;
- tareas derivadas de fulfillment;
- trazabilidad de la decisión.

El estado AS-IS ya contiene controles útiles, pero la operación permanece distribuida entre varias comprobaciones y varias escrituras.

La protección objetivo debe impedir simultáneamente:

- creación por rol base o privilegio administrativo;
- creación fuera de turno o sin check-in;
- creación para una sede ajena;
- manipulación de origen, destino, área, producto, cantidad, presentación o política;
- uso de una ruta inexistente o incompatible;
- creación duplicada por reintento;
- cabecera huérfana si fallan líneas o tareas derivadas;
- éxito aparente con una operación parcialmente materializada;
- atribución al principal técnico de un dispositivo compartido;
- autoridad derivada de simulación;
- desalineación entre interfaz y servidor.

#### 3. Decisión principal

`nexo.inventory.remissions.request` es la única capacidad canónica que representa la creación de una solicitud de remisión.

Su autorización no se deriva de:

```text
nexo.access
nexo.inventory.remissions.view
nexo.inventory.remissions.update
inventory.remissions.all_sites
can_operate
rol base
cobertura administrativa
sede seleccionada
sede primaria
URL visible
formulario visible
botón habilitado
```

La creación se autoriza únicamente mediante la evaluación completa de la capacidad exacta.

#### 4. Resultado contractual

Quedan fijadas veinte obligaciones de creación:

1. usar la clave canónica exacta;
2. conservar modalidad `OPERATIONAL_ONLY`;
3. exigir turno vigente;
4. exigir check-in activo;
5. resolver rol operativo efectivo;
6. resolver sede solicitante desde contexto válido;
7. exigir área cuando el rol, dispositivo o recurso la requiera;
8. autorizar el lado solicitante;
9. validar el origen permitido sin convertirlo en autoridad de stock;
10. validar ruta;
11. validar elegibilidad de productos;
12. validar presentación, unidad y política;
13. normalizar cantidades antes de persistir;
14. construir un borrador de recurso canónico;
15. revalidar en servidor inmediatamente antes del efecto;
16. persistir la creación como una unidad lógica coherente;
17. aplicar idempotencia a reintentos;
18. atribuir el actor humano real;
19. registrar evidencia correlacionable;
20. fallar cerrado ante cualquier componente ausente, conflictivo o no autorizado.

#### 5. Capacidad protegida exacta

La identidad canónica es:

```text
nexo.inventory.remissions.request
```

No se crea una segunda clave local para:

- crear;
- solicitar;
- solicitar multisede;
- solicitar desde administración;
- solicitar desde dispositivo;
- solicitar en nombre de otro actor.

Toda variante de experiencia consume la misma capacidad y cambia únicamente el contexto, el scope o el contrato del recurso cuando corresponda.

#### 6. Modalidad `OPERATIONAL_ONLY`

La capacidad conserva:

```text
authorization_requirement = OPERATIONAL_ONLY
```

Por tanto:

```text
CARRIL BASE
→ NO APLICA

CARRIL OPERATIVO COMPLETO
→ ÚNICO CAMINO AUTORIZANTE
```

Una concesión administrativa, incluso global, no puede satisfacer esta capacidad.

#### 7. Prerrequisito `T+C`

La creación exige:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO
```

El turno debe corresponder al actor efectivo, a una revisión publicada, a una ventana vigente, a una sede válida y a un rol operativo válido.

El check-in debe corresponder al mismo actor, turno y sede, permanecer activo y no estar sustituido, expirado o cerrado.

La ausencia de cualquiera de los dos produce denegación operativa.

#### 8. Semántica de área `SITE_SUFFICIENT`

La capacidad es de nivel `SITE_SUFFICIENT`.

Esto significa que el permiso no exige universalmente un `active_area_id`, pero no elimina restricciones de área.

Puede operar sin área únicamente cuando:

- el rol operativo está habilitado a nivel general de sede; y
- el recurso puede resolverse legítimamente a nivel de sede; y
- el scope concedido lo permite; y
- ninguna regla superior exige área.

Si el rol operativo está restringido a un área, el turno y el contexto deben aportar un área compatible.

`SITE_SUFFICIENT` nunca significa “todas las áreas”.

#### 9. Matrices operativas vigentes

La capacidad solo existe para un actor cuando su matriz operativa vigente la concede expresamente.

La cobertura aprobada incluye, entre otras decisiones ya fijadas:

| Rol operativo | Decisión para `request` | Límite principal |
| --- | --- | --- |
| `cajero_satelite` | ASIGNAR OPERATIVO | sede activa y área `cashier` |
| `barista_satelite` | ASIGNAR OPERATIVO | sede activa y área `bar` |
| `cocinero_satelite` | ASIGNAR OPERATIVO | sede activa y área `kitchen` |
| `servicio_salon` | ASIGNAR OPERATIVO | sede activa y área `service` |
| `mostrador_satelite` | ASIGNAR OPERATIVO | sede y área de Mostrador activas |
| `operador_integral_satelite` | ASIGNAR OPERATIVO | sede integrada y área exacta cuando la configuración la exija |
| `gerencia_operativa` | ASIGNAR OPERATIVO | sede o área activa bajo coordinación del turno |
| `produccion_cocina` | NO ASIGNAR | producción no solicita remisiones por esta matriz |
| `produccion_panaderia` | NO ASIGNAR | producción no solicita remisiones por esta matriz |
| `produccion_reposteria` | NO ASIGNAR | producción no solicita remisiones por esta matriz |
| `bodeguero` | NO ASIGNAR | atiende solicitudes; no solicita por terceros |
| `conductor_logistica` | NO ASIGNAR | transporta; no solicita abastecimiento |

Esta tarea no cambia esas matrices.

#### 10. Prohibición de autorización administrativa

No autorizan creación:

- `propietario` por nombre de rol;
- `gerente_general` por nombre de rol;
- `gerente` por nombre de rol;
- `supervisor` por nombre de rol;
- cobertura administrativa;
- scope base global;
- permiso base de consulta;
- `role override` administrativo;
- pertenencia a una sede;
- selección de sede en la interfaz.

Un mismo humano puede poseer autoridad base y asumir un rol operativo, pero la creación se decide únicamente con el carril operativo.

#### 11. Scope de solicitud

El perfil canónico de la capacidad admite:

```text
AS
SS
AST
AA
SA
AAT
CTX
```

del lado solicitante, sujeto además al contexto operativo real.

No admite como autoridad de creación:

```text
G
TST
ATW
```

La solicitud puede cruzar sedes como relación empresarial, pero no existe un “global operativo” para crear remisiones.

#### 12. Lado solicitante

La autorización mutadora se concentra en el lado solicitante o destino de la solicitud.

La decisión debe demostrar que:

- la sede solicitante pertenece al contexto permitido;
- el actor puede solicitar para ese lado;
- el área, cuando corresponda, es compatible;
- el recurso propuesto conserva esa identidad territorial.

El permiso no necesita autoridad de inventario sobre el origen para expresar una necesidad válida.

#### 13. Origen permitido

El origen es una relación que debe validarse, no una autoridad transferida al solicitante.

La creación exige demostrar que:

- el origen existe y está activo;
- puede abastecer el tipo de solicitud correspondiente;
- la relación solicitante-origen está permitida;
- la ruta aplicable es válida;
- las líneas pueden usar esa relación.

La capacidad `request` no concede:

- consultar todo el stock del origen;
- reservar stock por sí sola;
- preparar;
- modificar ubicaciones;
- despachar;
- ejecutar producción.

#### 14. Cruce de sedes

Una solicitud legítima puede relacionar dos sedes.

Esto no implica:

```text
AUTORIDAD EN DESTINO
+
RELACIÓN CON ORIGEN
=
AUTORIDAD OPERATIVA SOBRE ORIGEN
```

El actor expresa la necesidad desde su lado autorizado. Las etapas posteriores vuelven a evaluar sus propios permisos y lados.

#### 15. Borrador canónico de recurso

Antes de persistir debe existir un borrador normalizado equivalente a:

```text
REMISSION DRAFT
├── actor solicitante
├── sede solicitante / destino
├── área solicitante cuando aplique
├── origen permitido
├── líneas
│   ├── producto
│   ├── cantidad
│   ├── unidad / presentación
│   ├── política de solicitud
│   └── área funcional cuando aplique
├── ruta aplicable
└── metadatos empresariales admitidos
```

Los nombres físicos de columnas pueden variar durante la materialización. La semántica no.

#### 16. Entradas del cliente

Todo valor enviado por formulario, URL, query string, componente, dispositivo o cliente es una propuesta que debe resolverse y validarse en servidor.

Esto incluye:

- `from_site_id`;
- `to_site_id`;
- área;
- producto;
- cantidad;
- presentación;
- UOM;
- política;
- fecha esperada;
- notas;
- ruta o preferencias relacionadas.

Un identificador existente no demuestra por sí mismo que el actor pueda utilizarlo.

#### 17. Actor efectivo

La solicitud debe quedar atribuida al humano que realmente ejecuta la acción.

La decisión distingue:

```text
PRINCIPAL DE SESIÓN
ACTOR EFECTIVO
ROL OPERATIVO
SOLICITANTE EMPRESARIAL
```

Cuando coinciden, siguen siendo conceptos diferentes.

Cuando no coinciden, la relación debe ser explícita y autorizada.

#### 18. Sesión personal

En una sesión personal:

- el actor efectivo procede de la identidad laboral real;
- el rol operativo procede del turno vigente;
- la sede y área proceden del contexto operativo;
- el permiso procede de la matriz o concesión operativa vigente;
- la decisión se recalcula en servidor.

No se usa `employees.role` como sustituto del rol operativo efectivo.

#### 19. Dispositivo compartido

En dispositivo compartido, la autoridad es la intersección entre:

- límites del dispositivo;
- aplicación efectiva;
- actor humano identificado;
- permiso efectivo del actor;
- turno y check-in;
- sede y área;
- recurso;
- denegaciones.

El dispositivo no se convierte en solicitante humano.

Cuando el mecanismo de firma del actor sea requerido, la persistencia y la evidencia deben conservar una correlación íntegra con la solicitud creada.

#### 20. Role override

Un override de presentación, diagnóstico o administración no puede fabricar un carril operativo para `request`.

Si una herramienta autorizada proyecta otro rol, esa proyección no puede ejecutar una solicitud real con autoridad ficticia.

La creación real exige el actor y contexto reales autorizantes.

#### 21. Simulación

La capacidad admite previsualización completa bajo el contrato de simulación, pero:

```text
SIMULACIÓN
→ PUEDE MOSTRAR RESULTADO HIPOTÉTICO
→ NO PERSISTE SOLICITUD
→ NO PERSISTE LÍNEAS
→ NO GENERA FULFILLMENT
→ NO RESERVA INVENTARIO
→ NO EMITE EFECTOS EMPRESARIALES
```

La simulación nunca se convierte en autoridad real.

#### 22. Acceso a NEXO

`nexo.access` permite entrar a la aplicación dentro de su contrato.

No concede `nexo.inventory.remissions.request`.

Una pantalla accesible con acción bloqueada es un estado válido cuando el actor puede entrar a NEXO pero no puede solicitar.

#### 23. Visibilidad de interfaz

La UI puede calcular una señal de disponibilidad para:

- mostrar;
- ocultar;
- deshabilitar;
- explicar un bloqueo;
- dirigir al contexto correcto.

Esa señal no autoriza la escritura.

Una petición directa contra la Server Action debe producir la misma denegación que la UI habría mostrado.

#### 24. Frontera server-side

La decisión autorizante debe ejecutarse en servidor inmediatamente antes del efecto.

La Server Action, API o RPC que materialice la solicitud no puede confiar exclusivamente en:

- un booleano calculado por la página;
- un campo oculto;
- un `site_id` enviado por cliente;
- un rol contenido en una cookie;
- una ruta de navegación;
- una validación ejecutada minutos antes;
- un resultado cacheado.

#### 25. Orden canónico de evaluación

La frontera de creación sigue este orden lógico:

1. autenticar principal;
2. resolver actor efectivo;
3. resolver sesión y dispositivo;
4. resolver rol operativo;
5. resolver turno y check-in;
6. resolver sede y área efectivas;
7. comprobar permiso exacto;
8. construir borrador normalizado;
9. resolver scope;
10. validar sede solicitante;
11. validar origen;
12. validar ruta;
13. validar productos, políticas, unidades y cantidades;
14. aplicar denegaciones;
15. registrar decisión autorizante;
16. persistir la unidad de creación de forma coherente.

Una validación posterior no repara una autorización faltante anterior.

#### 26. Capacidad de la sede solicitante

La sede solicitante debe estar habilitada para solicitar remisiones mediante la fuente canónica vigente.

Un fallback legacy puede existir durante transición únicamente bajo su contrato de compatibilidad y no puede ampliar el conjunto de sedes solicitantes.

La ausencia de configuración no se convierte silenciosamente en `true`.

#### 27. Ruta de abastecimiento

La ruta debe resolverse antes de considerar completa la creación.

Como mínimo debe demostrarse:

- relación válida entre origen y destino;
- producto compatible;
- área solicitante compatible cuando aplique;
- origen habilitado;
- configuración activa;
- modalidad de abastecimiento válida;
- datos obligatorios de la etapa siguiente disponibles o un estado empresarial explícito que represente la falta sin mentir sobre completitud.

No se construye éxito final a partir de una ruta imposible.

#### 28. Elegibilidad de producto

Cada producto solicitado debe:

- existir;
- estar activo cuando el contrato lo exija;
- estar habilitado para la sede solicitante;
- admitir remisión;
- admitir el área solicitante cuando corresponda;
- conservar su perfil de inventario aplicable;
- utilizar una política compatible.

Una línea inválida bloquea o produce el resultado parcial expresamente aprobado por el contrato; no se descarta silenciosamente.

#### 29. Política de solicitud

Cuando una línea usa una política de solicitud, el servidor debe validar:

- identidad de política;
- producto relacionado;
- vigencia;
- unidad de solicitud;
- unidad base;
- factor de conversión;
- mínimo;
- step;
- fraccionalidad;
- perfil físico cuando corresponda.

El cliente no puede enviar una política de otro producto para alterar cantidades o presentaciones.

#### 30. Presentaciones y UOM

Cuando la línea use presentación o perfil UOM, se valida:

- pertenencia al producto;
- estado activo;
- unidad de entrada;
- unidad de stock;
- factor aplicable;
- modalidad de medición;
- compatibilidad con la operación.

No se inventa un factor permisivo por ausencia de perfil canónico.

#### 31. Cantidades

Toda cantidad se normaliza antes de persistir.

Deben rechazarse como mínimo:

- cantidades no numéricas;
- cantidades iguales o menores que cero;
- cantidades que incumplan mínimo;
- cantidades que incumplan step;
- fracciones prohibidas;
- conversiones incompatibles;
- valores cuyo producto o política no pueda resolverse.

La cantidad normalizada que autoriza el borrador debe ser la misma que persiste.

#### 32. Área por línea

Cuando una línea declare área funcional:

- debe corresponder al contexto autorizado;
- debe estar habilitada para remisiones;
- debe ser compatible con el producto;
- no puede ampliar el rol operativo;
- no puede elegirse libremente para cruzar a otra área.

Si el rol está restringido a un área, una línea de otra área se deniega.

#### 33. Estado inicial

La creación debe producir exclusivamente el estado inicial canónico del proceso de solicitud.

Esta tarea no renombra ni redefine la máquina de estados de remisiones.

Una representación física legacy como `pending` no autoriza a inventar una segunda semántica documental; la materialización deberá mapear el estado físico al contrato de dominio vigente.

#### 34. Atomicidad de creación

La solicitud empresarial se considera creada de forma íntegra únicamente cuando el conjunto obligatorio definido para la creación queda persistido coherentemente.

La unidad lógica comprende, según el modelo físico vigente:

- cabecera;
- líneas;
- relaciones de ruta necesarias;
- tareas derivadas obligatorias;
- correlación de actor y auditoría.

No es aceptable declarar éxito final si solo existe la cabecera.

#### 35. Idempotencia

Toda creación debe aceptar una identidad estable de intención o mecanismo equivalente que permita reconocer reintentos de la misma solicitud.

La idempotencia debe cubrir la unidad empresarial completa, no únicamente una inserción individual.

Para una misma intención:

```text
PRIMER INTENTO CONFIRMADO
+
REINTENTO EQUIVALENTE
→ MISMA SOLICITUD EMPRESARIAL
```

No:

```text
→ DOS SOLICITUDES
```

#### 36. Doble clic y reintento

Doble clic, retry HTTP, reconexión del navegador, repetición de Server Action o reenvío de una cola no pueden producir solicitudes duplicadas.

El consumidor puede volver a consultar el resultado, pero no repetir ciegamente el efecto.

#### 37. Resultado desconocido

Si el cliente pierde la respuesta después de enviar la creación, el siguiente intento debe reconciliar primero la identidad de la intención.

Un timeout o corte de red produce:

```text
RESULTADO DESCONOCIDO
→ RECONCILIAR
→ CONFIRMAR EXISTENTE O REINTENTAR DE FORMA SEGURA
```

No produce automáticamente una segunda solicitud.

#### 38. Tareas derivadas de fulfillment

Las tareas de fulfillment son derivadas de la solicitud y de sus rutas.

Su generación debe conservar:

- identidad de la línea origen;
- producto;
- origen;
- destino;
- área solicitante;
- área preparadora cuando aplique;
- modalidad de abastecimiento;
- ubicaciones o referencias necesarias;
- estado derivado coherente.

La ausencia de una tarea obligatoria debe ser un resultado empresarial explícito o un fallo de la unidad de creación; no un éxito silencioso.

#### 39. Efectos de inventario

Crear una solicitud no equivale por sí solo a:

- reservar stock;
- descontar stock;
- producir;
- mover inventario;
- despachar;
- recibir.

Si una configuración futura agrega efectos en la creación, esos efectos deberán pertenecer a un contrato explícito, atómico e idempotente y no podrán duplicar movimientos.

#### 40. Auditoría

Cada intento permitido o denegado debe conservar evidencia suficiente para reconstruir:

- principal;
- actor efectivo;
- dispositivo cuando aplique;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- permiso;
- scope;
- borrador o correlación del recurso;
- decisión;
- razones;
- versión contractual;
- timestamp.

Después del éxito se correlaciona además la identidad estable de la solicitud creada.

#### 41. Denegaciones

La creación falla cerrada ante:

- sesión ausente;
- actor no resoluble;
- rol operativo no autorizado;
- turno inválido;
- check-in ausente;
- sede incompatible;
- área incompatible;
- permiso ausente;
- scope incompatible;
- origen inválido;
- ruta inválida;
- producto inválido;
- política inválida;
- presentación inválida;
- cantidad inválida;
- dispositivo incompatible;
- simulación;
- conflicto estructural;
- error técnico que impida demostrar una condición obligatoria.

Los mensajes públicos no necesitan revelar cuál asignación, rol o territorio interno habría permitido la acción.

#### 42. Corrección y compensación

Si una implementación física no puede mantener toda la creación en una única transacción técnica, debe definir una estrategia explícita de compensación y reconciliación.

No se admite:

```text
CABECERA CREADA
+
LÍNEAS FALLIDAS
→ ÉXITO
```

ni:

```text
CABECERA + LÍNEAS
+
FULFILLMENT FALLIDO
→ ÉXITO COMPLETO
```

La salida debe preservar un estado empresarial verdadero y recuperable.

#### 43. Frescura

La autorización se invalida cuando cambien, antes del efecto:

- turno;
- check-in;
- rol operativo;
- sede;
- área;
- grant;
- scope;
- estado de la sede;
- políticas;
- ruta;
- producto;
- presentación;
- dispositivo;
- denegaciones.

Una decisión cacheada no sobrevive automáticamente a esos cambios.

#### 44. Offline

Una intención capturada offline no constituye una solicitud creada.

Al sincronizar debe:

1. recuperar actor e identidad de intención;
2. reautorizar con contexto vigente;
3. revalidar recurso y ruta;
4. reconciliar idempotencia;
5. persistir solo si todas las condiciones siguen siendo válidas.

La autoridad que existía al capturar no se congela indefinidamente.

#### 45. Concurrencia

La creación debe ser segura frente a:

- dos pestañas;
- dos dispositivos;
- dos reintentos;
- actualización concurrente de políticas;
- cambio de ruta;
- cambio de turno;
- cierre de check-in;
- desactivación de sede o producto.

Cuando una condición relevante cambie entre la validación y la escritura, la frontera debe revalidar o abortar.

#### 46. AS-IS remoto inspeccionado

En `vento-nexo` se observó una Server Action `createRemission` que ya realiza parte importante del contrato:

- autentica usuario;
- resuelve sesión operacional;
- comprueba `inventory.remissions.request`;
- consulta contexto operacional;
- valida capacidad de la sede solicitante;
- valida productos;
- valida políticas;
- valida UOM;
- valida área;
- exige firma de actor en dispositivo compartido;
- crea cabecera, líneas y tareas derivadas.

Esta tarea conserva esos controles válidos y define las brechas restantes.

#### 47. Autorización AS-IS

La Server Action observada usa:

```text
shared device
→ checkOperationalSessionPermission

sesión personal
→ checkOperationalPermission
```

para `inventory.remissions.request`.

Esa dirección es compatible con el contrato `OPERATIONAL_ONLY`.

La futura materialización no debe degradarla a un helper base por conveniencia de UI, rol privilegiado o visibilidad multisede.

#### 48. Validaciones AS-IS previas a persistencia

Antes de crear la cabecera, el AS-IS ya valida:

- origen y destino presentes;
- contexto operativo;
- permiso;
- capacidad solicitante de la sede;
- existencia de líneas válidas;
- disponibilidad de productos para la sede;
- compatibilidad de área;
- firma del actor cuando el dispositivo compartido la requiere.

También transforma cantidades y políticas antes de persistir.

Esas validaciones se conservan como base, pero no sustituyen la validación íntegra de ruta ni la atomicidad.

#### 49. Brecha AS-IS de atomicidad

El flujo observado persiste primero:

```text
restock_requests
```

después:

```text
restock_request_items
```

y después:

```text
restock_item_fulfillments
```

mediante escrituras separadas.

Un fallo posterior a la cabecera puede dejar una materialización parcial.

El estado objetivo exige que esa secuencia se convierta en una unidad lógica atómica o compensable con resultado explícito y reconciliable.

#### 50. Brecha AS-IS de resolución de ruta

La resolución de `product_fulfillment_routes` observada ocurre después de insertar cabecera e ítems.

Incluso existe una salida equivalente a:

```text
LA SOLICITUD SE CREÓ
+
NO FUE POSIBLE RESOLVER SUS RUTAS
```

El estado objetivo debe resolver o clasificar la ruta antes del éxito final y evitar que un fallo técnico posterior produzca una solicitud presentada como completa cuando no lo está.

#### 51. Brecha AS-IS de correlación de firma

En dispositivo compartido, la firma del actor se obtiene antes de insertar la solicitud, pero su `targetId` se adjunta después de la cabecera.

Si ese attachment falla, el AS-IS registra error y continúa.

La futura materialización debe garantizar que la evidencia obligatoria conserve correlación íntegra con la solicitud o que la operación quede en un estado recuperable que no se declare plenamente cerrada.

Esto no redefine el mecanismo de firma; exige consistencia de la evidencia.

#### 52. Brecha AS-IS de interfaz

La superficie de remisiones observada calcula disponibilidad de creación y otras señales de UI con helpers que no representan necesariamente la misma ruta operacional estricta utilizada por la Server Action.

El estado objetivo exige:

```text
UI
→ puede anticipar la decisión

SERVER
→ siempre recalcula la decisión autoritativa
```

La UI no puede habilitar una creación que el contrato sabe que será denegada por usar una evaluación de carril diferente.

#### 53. Estrategia de materialización futura

Cada `implementation_unit_id` deberá volver a inventariar el commit base y materializar únicamente las superficies que le hayan sido asignadas.

La estrategia objetivo es:

```text
REUSE VALID SERVER-SIDE OPERATIONAL AUTH
+
CENTRALIZE CANONICAL PERMISSION CONSUMPTION
+
NORMALIZE RESOURCE DRAFT
+
VALIDATE ROUTE BEFORE FINAL EFFECT
+
MAKE CREATION ATOMIC OR EXPLICITLY COMPENSABLE
+
ADD END-TO-END IDEMPOTENCY
+
PRESERVE HUMAN ACTOR ATTRIBUTION
+
ALIGN UI WITH SERVER DECISION
```

No se presupone en este marcador el nombre físico de una RPC, tabla, columna, constraint o archivo nuevo.

#### 54. Contrato de unidad física

La tarea global no modifica producto.

Cada futura instancia:

```text
NEXO-AUTH-004::<implementation_unit_id>
```

solo puede existir cuando:

- la unidad haya sido asignada por el contrato de paquetes;
- exista `package_id` propietario;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias técnicas de la unidad estén disponibles;
- exista autorización física explícita.

La instancia deberá declarar consumidores exactos, archivos, datos, migraciones, pruebas y rollback de su unidad.

#### 55. Frontera con `NEXO-AUTH-005`

`NEXO-AUTH-005` conserva:

- edición;
- edición propia pendiente;
- cancelación;
- eliminación;
- reversa;
- reglas de estado posteriores a la creación.

Esta tarea solo protege la creación inicial.

Una solicitud ya persistida se vuelve recurso existente y sus mutaciones posteriores salen del alcance de 004.

#### 56. Frontera con `NEXO-AUTH-006` a `NEXO-AUTH-010`

La creación no concede:

- preparar;
- ejecutar producción vinculada;
- despachar;
- registrar tránsito;
- recibir.

Cada etapa exige su permiso, lado, actor, contexto, estado y evidencia propios.

La creación únicamente deja una solicitud válida para ser consumida por esas etapas.

#### 57. Frontera con `NEXO-AUTH-015` a `NEXO-AUTH-020`

Se conservan owners posteriores:

- `NEXO-AUTH-015` integra el filtrado completo por sede y área efectivas;
- `NEXO-AUTH-016` integra dispositivo compartido de forma global;
- `NEXO-AUTH-017` integra simulación estricta;
- `NEXO-AUTH-018` migra consumidores a paquetes compartidos de `vento-shell`;
- `NEXO-AUTH-019` elimina helpers duplicados;
- `NEXO-AUTH-020` ejecuta pruebas integrales de autorización NEXO.

004 define qué debe proteger la creación; no absorbe esas especializaciones.

#### 58. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- ya existe cobertura para exigir permiso, contexto y alcance canónicos;
- ya existe cobertura para paridad entre evaluadores;
- ya existe cobertura para separar carril base y operativo;
- ya existe cobertura para turno, check-in, sede y área;
- ya existe cobertura adversarial contra formulario, API o RPC manipulados;
- ya existe cobertura de invalidación, reautorización y caché;
- ya existe cobertura de auditoría correlacionable;
- ya existe cobertura de identidad de actor en dispositivo compartido;
- ya existe cobertura NEXO para idempotencia y doble contabilización de remisiones;
- ya existe cobertura NEXO para jerarquía unificada de solicitud, preparación, despacho, tránsito y recepción.

La tarea especializa obligaciones existentes en la creación de solicitudes sin introducir una obligación verificable nueva.

#### 59. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-011`;
- `TREQ-AUTH-012`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-006`;
- `TREQ-NEXO-007`;
- `TREQ-NEXO-009`;
- `TREQ-NEXO-010`;
- `TREQ-NEXO-011`.

Estas referencias documentan cobertura heredada y no modifican filas del registro.

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificó `main` vigente de `vento-shell`, cierre de `NEXO-AUTH-003`, continuidad hacia `NEXO-AUTH-004`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, modalidad `OPERATIONAL_ONLY`, prerrequisito `T+C`, área `SITE_SUFFICIENT`, scope `REM-REQUEST`, contrato de recurso, matrices operativas, 04A vigente y AS-IS de `createRemission` en `vento-nexo` |
| OPERATIVA | NOT_APPLICABLE | no se crea, modifica, cancela ni ejecuta una remisión real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-004::<implementation_unit_id>` |

#### 61. Criterios de aceptación

- [x] la capacidad protegida exacta es `nexo.inventory.remissions.request`;
- [x] conserva modalidad `OPERATIONAL_ONLY`;
- [x] no existe camino autorizante por carril base;
- [x] exige turno vigente y check-in activo;
- [x] `SITE_SUFFICIENT` no elimina restricciones de área del rol o recurso;
- [x] la concesión procede de la matriz operativa vigente;
- [x] roles sin concesión permanecen denegados;
- [x] el scope se limita al lado solicitante y no crea global operativo;
- [x] el origen se valida sin conceder autoridad de inventario sobre él;
- [x] el cruce de sedes se trata como relación de solicitud;
- [x] el borrador se resuelve y normaliza en servidor;
- [x] entradas del cliente no se tratan como autoridad;
- [x] sede solicitante y capacidad de sede se validan;
- [x] ruta se valida antes del éxito final;
- [x] productos, áreas, políticas, UOM y cantidades se validan;
- [x] shared device conserva actor humano y límites del dispositivo;
- [x] simulación no produce efectos;
- [x] UI no sustituye autorización de servidor;
- [x] la creación íntegra es atómica o explícitamente compensable;
- [x] la idempotencia cubre la intención empresarial completa;
- [x] reintentos y resultados desconocidos se reconcilian sin duplicación;
- [x] fulfillment derivado no puede fallar silenciosamente después de declarar éxito;
- [x] auditoría conserva principal, actor, contexto, permiso, recurso, decisión y razones;
- [x] las brechas AS-IS de atomicidad, ruta, firma y paridad UI-servidor quedan documentadas;
- [x] `NEXO-AUTH-005` conserva edición y cancelación;
- [x] `NEXO-AUTH-006..010` conservan las etapas posteriores;
- [x] `NEXO-AUTH-015..020` conservan sus responsabilidades;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT`;
- [x] el gate futuro conserva `POST_E5_PACKAGE`;
- [x] no se crea ni modifica requisito de prueba;
- [x] no se autoriza cambio físico.

#### 62. Límites

Esta tarea no:

- modifica código NEXO;
- modifica componentes o Server Actions;
- crea una RPC;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- modifica tablas;
- define nombres físicos de columnas;
- aplica una constraint;
- cambia matrices de rol;
- cambia `authorization_requirement`;
- cambia prerrequisitos de turno o check-in;
- cambia la clasificación de área;
- cambia scopes;
- cambia estados de remisión;
- crea una nueva política de solicitud;
- redefine UOM;
- modifica rutas;
- edita o cancela solicitudes ya creadas;
- prepara remisiones;
- ejecuta producción vinculada;
- despacha;
- registra tránsito;
- recibe;
- ejecuta movimientos de inventario;
- cambia dispositivos compartidos;
- cambia simulación;
- migra consumidores;
- elimina helpers;
- ejecuta pruebas físicas;
- despliega;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 63. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-003 — Corregir inventory.remissions.all_sites`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-004 — Proteger creación de solicitudes`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-005 — Proteger edición y cancelación`
### [ ] NEXO-AUTH-005 — Proteger edición y cancelación
### [ ] NEXO-AUTH-006 — Proteger preparación
### [ ] NEXO-AUTH-007 — Proteger producción vinculada
### [ ] NEXO-AUTH-008 — Proteger despacho
### [ ] NEXO-AUTH-009 — Proteger tránsito
### [ ] NEXO-AUTH-010 — Proteger recepción
### [ ] NEXO-AUTH-011 — Proteger ajustes de inventario
### [ ] NEXO-AUTH-012 — Proteger conteos
### [ ] NEXO-AUTH-013 — Proteger movimientos
### [ ] NEXO-AUTH-014 — Proteger catálogo y configuraciones
### [ ] NEXO-AUTH-015 — Filtrar por sede y área efectivas
### [ ] NEXO-AUTH-016 — Integrar dispositivo compartido
### [ ] NEXO-AUTH-017 — Integrar simulación estricta
### [ ] NEXO-AUTH-018 — Migrar a paquetes de vento-shell
### [ ] NEXO-AUTH-019 — Eliminar helpers duplicados
### [ ] NEXO-AUTH-020 — Ejecutar pruebas integrales

### Carril histórico suspendido

`NEXO-REMISSIONS-001 — alias histórico suspendido; no reserva ni define un paquete vigente`

Este identificador correspondió a un carril de entrega; ya no reserva ni crea
un futuro `package_id`, no es una tarea nueva ni reemplaza `NEXO-AUTH-*`,
`NEXO-UX-*`, `AUTH-UI-*`, E3, E4, E5, H, J, R, S o T.

El alcance histórico contemplaba:

- solicitar, editar y cancelar;
- preparar cantidades y registrar diferencias;
- despachar separando custodia e inicio de tránsito;
- registrar tránsito y novedades;
- recibir con cantidades y observaciones;
- publicar y conciliar movimientos de inventario sin doble efecto;
- resolver sesión, actor, permiso, sede, área, turno, check-in y dispositivo;
- consumir contratos y módulos compartidos de `vento-shell`;
- proteger cada mutación en servidor;
- conservar idempotencia, auditoría, evidencia, impresión y rollback cuando
  apliquen;
- validar tablet o kiosco y operación con usuarios representativos.

Quedan fuera del cierre, salvo dependencia explícita del paquete:

- LPN y contenedores avanzados;
- activos, reutilizables, mantenimiento e instalaciones;
- cierre completo del dominio de inventario;
- cierre completo de NEXO;
- funcionalidades de otras aplicaciones.

La matriz completa de dependencias, condiciones e invariantes se conserva en
`priority-delivery-lanes.json`.
