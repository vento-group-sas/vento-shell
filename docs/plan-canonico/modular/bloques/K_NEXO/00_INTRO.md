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
### ✅ NEXO-AUTH-005 — Proteger edición y cancelación

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-004 — Proteger creación de solicitudes
**Tarea siguiente:** NEXO-AUTH-006 — Proteger preparación
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger actualización, edición propia, cancelación, eliminación y reversa de remisiones mediante capacidades canónicas, predicados de estado, ownership, responsabilidad territorial, concurrencia, compensación y auditoría sin convertir acciones legacy en permisos independientes
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-005::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger todas las mutaciones de una remisión ya persistida que pertenezcan a edición o cancelación, separando con precisión:

- actualización ordinaria;
- edición propia en estado editable;
- cancelación;
- eliminación física;
- reversa de una cancelación;
- mutaciones atómicas reservadas a preparación, despacho, tránsito y recepción.

La decisión canónica parte de dos capacidades activas:

```text
nexo.inventory.remissions.update
nexo.inventory.remissions.cancel
```

Ninguna acción legacy, nombre de botón, ruta de interfaz, helper local o relación de autoría crea una tercera capacidad.

#### 2. Problema que se resuelve

Después de creada una remisión, su mutación queda condicionada por:

- identidad del actor;
- carril autorizante;
- alcance;
- relación con el recurso;
- estado vigente;
- lado responsable;
- campos que se pretenden modificar;
- versión observada;
- efectos de inventario o custodia ya materializados;
- necesidad de reautenticación;
- evidencia antes y después.

La protección debe impedir:

- editar por mera visibilidad;
- editar por ser creador cuando el estado ya no lo permite;
- cancelar porque el actor tenga relación con cualquier extremo;
- alterar origen, destino o cantidades mediante una edición genérica;
- borrar historia empresarial bajo el nombre de eliminación;
- ejecutar una reversa como simple variante de cancelación;
- sobrescribir cambios concurrentes;
- dejar cabecera y líneas en estados incompatibles;
- compensar inventario de forma parcial;
- usar permisos legacy que ya tienen equivalente canónico.

#### 3. Capacidades canónicas exactas

La actualización utiliza exclusivamente:

```text
nexo.inventory.remissions.update
```

La cancelación utiliza exclusivamente:

```text
nexo.inventory.remissions.cancel
```

No se crea una capacidad canónica independiente para:

```text
edit_own_pending
delete
reverse_cancel
```

Esos nombres describen especializaciones de estado, ownership o implementación que deben resolverse contra las capacidades y contratos vigentes.

#### 4. Normalización de `edit_own_pending`

La identidad legacy:

```text
nexo.inventory.remissions.edit_own_pending
```

converge en:

```text
nexo.inventory.remissions.update
```

Las condiciones:

```text
OWN
+
ESTADO EDITABLE
```

pertenecen al contrato del recurso y no al nombre del permiso.

El estado objetivo exige cero consumidores de runtime que utilicen `edit_own_pending` como permiso funcional independiente.

#### 5. Modalidad de `remissions.update`

`nexo.inventory.remissions.update` conserva:

```text
authorization_requirement = BASE_OR_OPERATIONAL
```

Por tanto existen dos evaluaciones completas e independientes:

```text
CARRIL BASE COMPLETO
→ PUEDE AUTORIZAR

CARRIL OPERATIVO COMPLETO
→ PUEDE AUTORIZAR

MEZCLA DE COMPONENTES DE AMBOS CARRILES
→ NO AUTORIZA
```

La selección del carril no cambia la identidad del recurso ni los campos autorizados.

#### 6. Modalidad de `remissions.cancel`

`nexo.inventory.remissions.cancel` conserva:

```text
authorization_requirement = BASE_OR_OPERATIONAL
```

El carril base puede autorizar dentro de su cobertura administrativa.

El carril operativo puede autorizar únicamente cuando exista una concesión operativa expresa y el actor sea responsable del lado aplicable al estado vigente.

La autoría de la solicitud no crea automáticamente cancelación.

#### 7. Prerrequisitos del carril base

Para `update` y `cancel`, el carril base utiliza prerrequisito:

```text
N
```

No exige turno ni check-in.

Sí exige:

- actor base válido;
- concesión exacta;
- scope vigente;
- recurso resuelto;
- estado compatible;
- campos autorizados;
- reautenticación cuando el contrato aplicable la exija;
- ausencia de denegaciones;
- auditoría.

`N` no equivale a autorización automática.

#### 8. Prerrequisitos del carril operativo

Para `update` y `cancel`, el carril operativo utiliza:

```text
T+C
```

Exige:

- turno publicado y vigente;
- check-in activo;
- rol operativo efectivo;
- sede compatible;
- área cuando corresponda al rol o recurso;
- concesión exacta;
- scope operativo;
- recurso y estado compatibles.

Un rol base no sustituye estos requisitos cuando la decisión se intenta por carril operativo.

#### 9. Clasificación de área

La actualización y la cancelación pueden ser capacidades de nivel sede cuando el rol sea legítimamente de sede general.

Eso no elimina una restricción de área existente en:

- el turno;
- la matriz del rol;
- el dispositivo;
- el recurso;
- el scope;
- la relación empresarial.

Una acción de nivel sede no se transforma en autoridad sobre todas las áreas.

#### 10. Scope de actualización

La actualización utiliza el perfil:

```text
REM-UPDATE
```

Carril base:

```text
G / AS / SS / AST / TST / AA / SA / AAT / ATW
```

Carril operativo:

```text
CTX
```

Reglas:

- `G` solo existe por carril base;
- no existe global operativo;
- cada cambio se limita a una remisión concreta;
- la participación en un extremo no concede autoridad general sobre el otro;
- cambiar territorio exige autorizar territorio vigente y territorio propuesto.

#### 11. Scope de cancelación

La cancelación utiliza:

```text
REM-CANCEL
```

Carril base:

```text
G / AS / SS / AST / TST / AA / SA / AAT / ATW
```

Carril operativo:

```text
CTX DEL LADO RESPONSABLE
```

Reglas:

- no existe global operativo;
- una relación de lectura no basta;
- el lado responsable depende del estado;
- OWN puede participar solo cuando el contrato permita cancelar una solicitud propia;
- terceros requieren responsabilidad explícita.

#### 12. Recurso protegido por actualización

La actualización opera sobre:

```text
REMISSION
```

con localizador lógico:

```text
remission_id
+
version
+
cambios propuestos
```

El servidor debe volver a resolver la remisión existente y no confiar en una copia enviada por el cliente.

#### 13. Recurso protegido por cancelación

La cancelación opera sobre:

```text
REMISSION
```

con localizador lógico:

```text
remission_id
+
motivo
```

El motivo forma parte de la intención empresarial y de la evidencia.

Una acción sin motivo cuando este sea obligatorio no puede convertirse en cancelación válida mediante un valor predeterminado silencioso.

#### 14. Ownership en actualización

`OWN` aplica exclusivamente cuando:

- la remisión fue creada por el actor efectivo; y
- el estado permite edición propia; y
- los campos pertenecen al lado solicitante; y
- el scope sigue siendo compatible.

OWN no autoriza:

- preparar;
- despachar;
- recibir;
- cancelar;
- modificar custodia;
- alterar inventario;
- cambiar un lado que la matriz del rol prohíba.

#### 15. Ownership en cancelación

Ser creador de la solicitud no concede por sí mismo `remissions.cancel`.

La cancelación propia requiere simultáneamente:

- permiso de cancelación efectivo;
- estado cancelable;
- responsabilidad permitida por el contrato;
- scope compatible;
- motivo;
- control de concurrencia;
- controles de sensibilidad aplicables.

Cuando la matriz del rol no concede cancelación, OWN no rellena la ausencia del permiso.

#### 16. Responsabilidad sobre terceros

Actualizar o cancelar una remisión creada por otro actor requiere una responsabilidad base u operativa explícita.

No bastan:

- misma sede;
- misma área;
- mismo rol;
- acceso a NEXO;
- capacidad de consultar remisiones;
- participación histórica;
- pertenecer a un grupo superior;
- haber preparado o transportado el recurso.

La responsabilidad se resuelve según la acción y el estado actuales.

#### 17. Territorio vigente y territorio propuesto

Una actualización que modifique una dimensión territorial debe validar ambos conjuntos:

```text
TERRITORIO VIGENTE
+
TERRITORIO PROPUESTO
```

La autorización sobre el nuevo destino no borra la necesidad de estar autorizado sobre el estado vigente cuando el contrato lo exige.

No se permite usar una actualización para trasladar silenciosamente una remisión fuera de la cobertura del actor.

#### 18. Edición propia del lado solicitante

Las matrices operativas de roles solicitantes conceden `remissions.update` únicamente sobre solicitudes propias y estados editables.

En ese perfil:

- el destino solicitante permanece ligado al contexto autorizado;
- el origen no puede cambiarse por una edición propia genérica;
- las cantidades y líneas solo cambian si el estado y contrato lo permiten;
- las presentaciones y políticas vuelven a validarse;
- el actor no adquiere permisos de preparación o logística.

La edición propia es una especialización de `update`, no una capacidad paralela.

#### 19. Actualización administrativa

El carril base puede permitir correcciones administrativas según la matriz y el scope del actor.

Una actualización administrativa puede comprender únicamente los campos que el contrato y el estado declaren editables.

No puede utilizarse como sustituto de:

- solicitud;
- preparación;
- despacho;
- tránsito;
- recepción;
- cancelación;
- reversa;
- ajuste de inventario.

#### 20. Actualización de gerencia operativa

`gerencia_operativa` puede actualizar remisiones relacionadas con la sede activa dentro del perfil aprobado.

La mutación se limita a:

- prioridad;
- programación;
- observaciones;
- datos operativos expresamente editables.

No altera por `update` genérico:

- cantidades bajo custodia;
- origen o destino protegidos;
- custodia;
- inventario;
- etapas cerradas.

Una mutación de esas clases requiere su capacidad atómica correspondiente o se deniega.

#### 21. Matriz completa de roles para actualización y cancelación

| Rol canónico | Carril | `update` | `cancel` | Regla principal |
| --- | --- | --- | --- | --- |
| `propietario` | base | ASIGNAR | ASIGNAR | `G(B)` dentro de la organización ordinaria, sujeto a recurso, estado y denegaciones |
| `gerente_general` | base | ASIGNAR | ASIGNAR | `G(B)` dentro de la organización ordinaria, sujeto a recurso, estado y denegaciones |
| `gerente` | base | ASIGNAR | ASIGNAR | `AS-REL`; la participación de una sede no concede autoridad general sobre el otro extremo |
| `supervisor` | base | ASIGNAR | NO ASIGNAR | correcciones ordinarias en campos y estados editables; cancelación reservada |
| `auxiliar_administrativa` | base | ASIGNAR | NO ASIGNAR | metadatos y correcciones administrativas permitidas por estado |
| `contador` | base | NO ASIGNAR | NO ASIGNAR | lectura financiera no concede mutación de remisiones |
| `marketing` | base | NO ASIGNAR | NO ASIGNAR | dominio ajeno a la mutación de remisiones |
| `cajero_satelite` | operativo | ASIGNAR | NO ASIGNAR | OWN, estado editable, lado solicitante y campos permitidos |
| `barista_satelite` | operativo | ASIGNAR | NO ASIGNAR | OWN, estado editable, lado solicitante y campos permitidos |
| `cocinero_satelite` | operativo | ASIGNAR | NO ASIGNAR | OWN, estado editable, lado solicitante y campos permitidos |
| `servicio_salon` | operativo | ASIGNAR | NO ASIGNAR | OWN, estado editable, lado solicitante y campos permitidos |
| `mostrador_satelite` | operativo | ASIGNAR | NO ASIGNAR | OWN, estado editable, lado solicitante y campos permitidos |
| `operador_integral_satelite` | operativo | ASIGNAR | NO ASIGNAR | OWN, estado editable, lado solicitante y campos permitidos |
| `produccion_cocina` | operativo | NO ASIGNAR | NO ASIGNAR | producción no obtiene edición general ni cancelación |
| `produccion_panaderia` | operativo | NO ASIGNAR | NO ASIGNAR | producción no obtiene edición general ni cancelación |
| `produccion_reposteria` | operativo | NO ASIGNAR | NO ASIGNAR | producción no obtiene edición general ni cancelación |
| `bodeguero` | operativo | NO ASIGNAR | NO ASIGNAR | usa acciones atómicas de preparación y recepción, no edición general |
| `conductor_logistica` | operativo | NO ASIGNAR | NO ASIGNAR | usa acciones atómicas de despacho y tránsito, no edición general |
| `gerencia_operativa` | operativo | ASIGNAR | ASIGNAR | coordinación de sede; campos editables y cancelación por lado responsable y estado |

Universo evaluado:

```text
ROLES BASE: 7
ROLES OPERATIVOS: 12
TOTAL: 19

UPDATE ASIGNADO: 12
UPDATE NO ASIGNADO: 7

CANCEL ASIGNADO: 4
CANCEL NO ASIGNADO: 15
```

Esta tarea no modifica las matrices.

#### 22. Campos editables

La autorización de `update` no equivale a autorización sobre todas las columnas.

Toda materialización debe clasificar los campos como mínimo en:

```text
EDITABLES POR CARRIL BASE
EDITABLES POR OWN OPERATIVO
EDITABLES POR GERENCIA OPERATIVA
RESERVADOS A TRANSICIONES ATÓMICAS
INMUTABLES DESPUÉS DE CREACIÓN O ETAPA
```

Un campo no clasificado se deniega.

#### 23. Líneas y cantidades

Editar líneas o cantidades solo es válido cuando:

- el estado lo permita;
- el actor tenga `update`;
- el perfil de edición aplicable lo permita;
- producto, presentación, unidad y política sigan vigentes;
- la ruta siga siendo compatible;
- no exista custodia o efecto posterior que vuelva la edición destructiva.

Si la mutación exige deshacer reservas, movimientos o producción, ya no es una edición ordinaria.

#### 24. Productos, presentaciones y políticas

Una edición que altere líneas debe reutilizar los contratos canónicos de:

- producto;
- disponibilidad por sede;
- presentación;
- UOM;
- factor de conversión;
- política de solicitud;
- área solicitante;
- ruta aplicable.

No se acepta una línea porque haya sido válida en una versión anterior del recurso si sus dependencias cambiaron y el estado todavía exige revalidación.

#### 25. Origen

La edición propia de un solicitante no puede cambiar el origen mediante `update` genérico.

Si una responsabilidad base o de coordinación futura admite cambiar origen:

- debe autorizar territorio vigente y propuesto;
- debe revalidar la relación origen-destino;
- debe revalidar rutas y líneas;
- debe conservar historial;
- debe impedir efectos duplicados.

La capacidad no nace del hecho de que el formulario exponga el campo.

#### 26. Destino

El destino solicitante no puede modificarse libremente.

Cambiarlo transforma el territorio del recurso y exige, cuando el contrato lo admita:

- autoridad sobre el recurso vigente;
- autoridad sobre el territorio propuesto;
- compatibilidad de actor y scope;
- revalidación de ruta;
- revalidación de líneas;
- control de concurrencia;
- auditoría antes/después.

Para la edición OWN operativa ordinaria, el destino permanece fijo.

#### 27. Metadatos

Campos como fecha esperada, prioridad, programación u observaciones pueden ser editables únicamente cuando:

- la matriz del actor los contemple;
- el estado los permita;
- no reescriban un evento histórico;
- no alteren indirectamente una etapa protegida.

Los nombres físicos concretos pertenecen a la materialización, no a este contrato global.

#### 28. Predicado de estado de actualización

Toda actualización exige un estado editable.

La fuente del estado es el recurso persistido leído en servidor inmediatamente antes de la mutación.

La lista física de estados puede evolucionar dentro del dominio, pero la regla permanece:

```text
ESTADO NO EDITABLE
→ UPDATE DENY
```

Una interfaz antigua no puede conservar edición después de una transición concurrente.

#### 29. Predicado de estado de cancelación

Toda cancelación exige un estado cancelable.

La decisión debe resolver además qué lado o actor es responsable en ese estado.

Resultado:

```text
PERMISO CANCEL
+
ESTADO CANCELABLE
+
RESPONSABILIDAD VÁLIDA
+
SCOPE VÁLIDO
→ CANCELACIÓN POSIBLE
```

La ausencia de cualquiera produce denegación.

#### 30. Lado responsable por estado

La cancelación no utiliza la regla:

```text
AUTORIZADO EN ORIGEN
O
AUTORIZADO EN DESTINO
→ CANCELAR
```

Utiliza:

```text
ESTADO ACTUAL
→ DETERMINA RESPONSABILIDAD
→ DETERMINA LADO AUTORIZANTE
→ EVALÚA ACTOR Y SCOPE
```

Un actor autorizado sobre un extremo irrelevante para el estado no obtiene cancelación.

#### 31. Motivo de cancelación

La cancelación sensible debe conservar motivo obligatorio conforme al contrato de la acción.

El motivo:

- no es un campo de presentación;
- forma parte del evento empresarial;
- queda ligado al actor y a la versión del recurso;
- debe sobrevivir a reintentos;
- no puede quedar sustituido por texto genérico fabricado en cliente.

#### 32. Cancelación y efectos previos

Cancelar una remisión no revierte automáticamente:

- reservas;
- movimientos;
- custodia;
- producción;
- despacho;
- recepción;
- otros efectos ya consolidados.

Si el estado cancelable requiere compensaciones, estas deben ejecutarse bajo un contrato explícito, atómico e idempotente.

No se marca `cancelled` primero para intentar reparar después sin un estado recuperable.

#### 33. Idempotencia de cancelación

Una intención de cancelación repetida sobre la misma versión y motivo no debe producir:

- eventos duplicados;
- compensaciones duplicadas;
- doble movimiento;
- múltiples auditorías contradictorias.

El resultado debe poder reconocer una cancelación ya aplicada o una intención en curso.

#### 34. Concurrencia de actualización

La actualización ordinaria debe usar:

- versión esperada;
- `updated_at` confiable;
- token de concurrencia equivalente.

Una escritura contra una versión obsoleta se deniega o devuelve conflicto.

No se permite último-escritor-gana sobre campos sensibles de una remisión.

#### 35. Concurrencia de cancelación

La cancelación debe bloquear o comparar versión antes de:

- cambiar estado;
- ejecutar compensaciones;
- emitir eventos;
- registrar efectos derivados.

Dos actores no pueden cancelar y transicionar simultáneamente el mismo recurso con resultados incompatibles.

#### 36. Atomicidad de actualización

Cuando una edición modifica cabecera y líneas, ambas forman una unidad lógica.

No es aceptable:

```text
CABECERA ACTUALIZADA
+
LÍNEAS ELIMINADAS
+
INSERCIÓN DE LÍNEAS FALLIDA
→ ÉXITO
```

La materialización debe ser atómica o disponer de compensación explícita y estado recuperable.

#### 37. Auditoría antes y después

Toda actualización autorizada conserva como mínimo:

- actor;
- carril;
- permiso;
- scope;
- recurso;
- versión anterior;
- campos autorizados cambiados;
- versión posterior;
- decisión;
- razones;
- timestamp.

Para campos sensibles se registra evidencia reforzada sin exponer secretos.

#### 38. Auditoría de cancelación

La cancelación conserva además:

- motivo;
- estado previo;
- lado responsable;
- compensaciones requeridas;
- compensaciones ejecutadas;
- evento idempotente;
- estado final;
- evidencia de reautenticación cuando aplique.

Una denegación también debe ser reproducible.

#### 39. Sensibilidad y reautenticación

`remissions.update` y `remissions.cancel` son mutaciones sensibles.

En los perfiles operativos de edición propia ya aprobados, la actualización exige reautenticación fuerte.

En dispositivo compartido ambas capacidades se clasifican como:

```text
STRONG
```

Un PIN ligero por sí solo no satisface `STRONG`.

La reautenticación no sustituye permiso, contexto, scope, ownership, estado ni recurso.

#### 40. Dispositivo compartido

En dispositivo compartido, la decisión efectiva intersecta:

- actor humano identificado;
- sesión del dispositivo;
- techo de permisos;
- aplicación efectiva;
- carril;
- turno y check-in cuando corresponda;
- sede y área;
- recurso;
- estado;
- reautenticación fuerte;
- denegaciones.

El principal técnico no se convierte en editor o cancelador empresarial.

#### 41. Simulación

La simulación admite previsualización completa del resultado hipotético de `update` y `cancel`.

La simulación:

- no actualiza cabecera;
- no reemplaza líneas;
- no cambia estado;
- no elimina filas;
- no ejecuta compensaciones;
- no llama una reversa con efectos reales;
- no publica movimientos.

El resultado simulado nunca se reutiliza como autorización real.

#### 42. Interfaz

La UI puede anticipar si una acción parece disponible, pero la frontera autoritativa reside en servidor.

Los botones:

```text
Editar
Cancelar
Eliminar
Revertir cancelación
```

no son permisos.

Cada envío vuelve a resolver la identidad canónica y el contrato de recurso aplicable.

#### 43. `delete` no es un permiso canónico

El catálogo no define una capacidad:

```text
nexo.inventory.remissions.delete
```

Por tanto, una acción runtime llamada `delete` no puede obtener autoridad simplemente porque exista `remissions.cancel`.

Para una remisión empresarial persistida, la destrucción física ordinaria no forma parte del contrato canónico de cancelación.

Si un futuro modelo define un borrador no empresarial físicamente eliminable, deberá contar con un contrato explícito que determine su lifecycle y autorización antes de materializar esa capacidad.

#### 44. Prohibición de degradar delete a cancel

No se admite la secuencia semántica:

```text
INTENTAR BORRAR
+
BORRADO FALLA POR TRAZABILIDAD
→ CANCELAR AUTOMÁTICAMENTE
```

Eliminar y cancelar tienen efectos, evidencia y expectativas diferentes.

Cuando la acción solicitada sea cancelación, debe ejecutarse como cancelación desde el inicio.

Cuando una eliminación no esté autorizada por el catálogo, debe fallar cerrada.

#### 45. Reversa de cancelación

`reverse_cancel` no es una capacidad canónica independiente.

Una reversa solo puede ejecutarse si:

- el dominio la define como compensación válida de una cancelación;
- el estado actual admite la reversa;
- el actor conserva `remissions.cancel` dentro del scope correspondiente;
- la responsabilidad por estado es válida;
- existe reautenticación requerida;
- se controlan versión e idempotencia;
- todas las compensaciones de inventario o custodia son atómicas;
- existe auditoría completa.

La mera existencia de un RPC no concede autoridad.

#### 46. Reversa e inventario

Cuando una reversa afecta inventario:

- cada movimiento compensatorio debe correlacionarse con el movimiento original;
- no se borra la historia del movimiento original;
- el reintento no duplica la compensación;
- el estado final de la remisión y las proyecciones de inventario deben reconciliarse;
- un fallo parcial produce un estado recuperable y evidencia.

005 no redefine el modelo general de inventario.

#### 47. Frontera con preparación

`remissions.update` no concede:

```text
nexo.inventory.remissions.prepare
```

El bodeguero y otros actores de origen utilizan la capacidad atómica de preparación definida en `NEXO-AUTH-006`.

Una edición genérica no puede modificar cantidades preparadas, reservas, faltantes, empaque o estado de preparación.

#### 48. Frontera con producción vinculada

Una actualización o cancelación no concede ejecutar producción para satisfacer una remisión.

Los efectos productivos y sus compensaciones pertenecen a su contrato específico y a `NEXO-AUTH-007`.

#### 49. Frontera con despacho, tránsito y recepción

`update` y `cancel` no sustituyen:

- despacho;
- inicio de tránsito;
- eventos de tránsito;
- recepción;
- aceptación de cantidades;
- transferencia de custodia.

Las transiciones correspondientes conservan ownership en `NEXO-AUTH-008` a `NEXO-AUTH-010`.

#### 50. AS-IS remoto de edición

En el repositorio NEXO auditado, la edición propia pendiente utiliza la identidad legacy:

```text
inventory.remissions.edit_own_pending
```

y un helper de autorización basado en role override.

El flujo observado comprueba:

- autoría;
- estado físico `pending`;
- sede destino;
- permiso legacy.

No utiliza la capacidad canónica `remissions.update` como fuente única de autoridad.

#### 51. Brecha AS-IS de carril en edición

El flujo de edición inspeccionado no usa la ruta operacional estricta usada por la creación para resolver turno, check-in y contexto antes de la mutación.

La futura materialización debe:

- seleccionar el carril correcto;
- evaluar un carril completo;
- no mezclar role override con contexto operativo real;
- consumir la clave canónica `remissions.update`;
- conservar OWN y estado como condiciones del recurso.

#### 52. Brecha AS-IS de territorio en edición

El flujo observado bloquea cambiar la sede destino, pero permite proponer y persistir un nuevo origen.

Esto contradice el perfil de edición propia operativa aprobado, que no permite modificar el lado de origen.

El estado objetivo exige:

```text
OWN OPERATIVO
→ ORIGEN INMUTABLE POR EDICIÓN GENÉRICA
→ DESTINO INMUTABLE POR EDICIÓN GENÉRICA
```

Cualquier cambio territorial admisible por otro carril se evalúa con autoridad sobre territorio vigente y propuesto.

#### 53. Brecha AS-IS de atomicidad en edición

El flujo observado realiza escrituras separadas:

1. actualiza la cabecera;
2. elimina líneas existentes;
3. inserta líneas nuevas.

No se observó en esa frontera una transacción única ni un control optimista explícito de versión.

La futura materialización debe impedir una remisión con cabecera nueva y conjunto de líneas parcial o vacío por fallo intermedio.

#### 54. AS-IS remoto de cancelación

La Server Action observada evalúa `inventory.remissions.cancel` por:

- origen;
- destino;
- evaluación global;

y autoriza cuando cualquiera resulta verdadera.

Después, la rama de cancelación cambia directamente el estado físico a `cancelled`.

El estado objetivo sustituye esa combinación por:

```text
RESPONSIBLE_SIDE_BY_STATE
+
SCOPE
+
ESTADO CANCELABLE
+
VERSIÓN
+
MOTIVO
```

#### 55. Brecha AS-IS de motivo y concurrencia

En la cancelación observada no se aprecia un motivo obligatorio en la escritura directa ni una condición de versión junto al identificador de la remisión.

La materialización debe incorporar ambos elementos conforme al contrato canónico.

Una comprobación previa de estado en memoria no protege contra una transición concurrente entre lectura y escritura.

#### 56. Brecha AS-IS de eliminación

El flujo observado contiene una acción `delete` que puede:

- intentar borrar la cabecera;
- borrar líneas y reintentar;
- ante trazabilidad de movimientos, convertir el resultado en cancelación.

Esta mezcla queda fuera del estado objetivo.

La historia empresarial persistida no se destruye utilizando el permiso de cancelación.

#### 57. Brecha AS-IS de reversa

El flujo observado expone `reverse_cancel` y llama una RPC de reversa después de pasar por la frontera general de cancelación.

El estado objetivo exige que la reversa:

- resuelva su estado exacto;
- demuestre responsabilidad;
- aplique compensación idempotente;
- preserve historia;
- no dependa solo del booleano genérico `canCancel`.

#### 58. Estrategia de materialización futura

Cada `implementation_unit_id` vuelve a inventariar el commit base antes de modificar.

La estrategia objetivo es:

```text
RETIRE LEGACY edit_own_pending
+
USE CANONICAL remissions.update
+
SEPARATE UPDATE FROM CANCEL
+
RESOLVE RESPONSIBLE SIDE BY STATE
+
WHITELIST FIELDS
+
ENFORCE OWN ONLY WHERE ALLOWED
+
ADD OPTIMISTIC CONCURRENCY
+
MAKE HEADER/LINES UPDATE ATOMIC
+
REQUIRE CANCELLATION REASON
+
MAKE CANCELLATION AND COMPENSATION IDEMPOTENT
+
REMOVE GENERIC HARD DELETE BEHAVIOR
+
HARDEN REVERSAL CONTRACT
+
ALIGN UI AND SERVER DECISIONS
```

Este marcador no presupone el nombre físico de una nueva RPC, tabla, función o constraint.

#### 59. Contrato de unidad física

La tarea global no modifica producto.

Cada futura instancia:

```text
NEXO-AUTH-005::<implementation_unit_id>
```

solo puede existir cuando:

- la unidad esté asignada por el contrato de paquetes;
- exista `package_id` propietario;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias técnicas de la unidad estén disponibles;
- exista autorización física explícita.

Cada instancia declara consumidores, archivos, datos, migraciones, pruebas, evidencia y rollback de su unidad.

#### 60. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- ya existe cobertura de permiso, contexto y alcance canónicos;
- ya existe cobertura de paridad entre evaluadores;
- ya existe cobertura de carril base y operativo;
- ya existe cobertura territorial y de mutación server-side;
- ya existe cobertura de segregación de funciones;
- ya existe cobertura de dispositivo compartido y simulación;
- ya existe cobertura de invalidación y auditoría;
- ya existe cobertura de idempotencia y compensación de remisiones;
- ya existe cobertura de coherencia de unidades y políticas;
- ya existe cobertura de atomicidad de inventario y movimientos.

005 especializa obligaciones vigentes en actualización y cancelación sin introducir una obligación verificable nueva.

#### 61. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-002`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-010`;
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

Estas referencias documentan cobertura existente y no representan una modificación del registro.

#### 62. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificó `main` vigente de `vento-shell`, cierre de `NEXO-AUTH-004`, continuidad hacia `NEXO-AUTH-005`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, normalización de `edit_own_pending`, modalidades, scopes, prerrequisitos, contrato de recurso, matrices base y operativas, 04A vigente y AS-IS de edición, cancelación, eliminación y reversa en `vento-nexo` |
| OPERATIVA | NOT_APPLICABLE | no se edita, cancela, elimina ni revierte una remisión real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-005::<implementation_unit_id>` |

#### 63. Criterios de aceptación

- [x] `remissions.update` y `remissions.cancel` quedan como capacidades canónicas separadas;
- [x] `edit_own_pending` converge en `remissions.update` y deja de ser permiso funcional independiente;
- [x] `update` conserva `BASE_OR_OPERATIONAL`;
- [x] `cancel` conserva `BASE_OR_OPERATIONAL`;
- [x] los carriles se evalúan completos e independientes;
- [x] el carril base no requiere turno ni check-in;
- [x] el carril operativo exige `T+C`;
- [x] `REM-UPDATE` conserva scope base y `CTX` operativo sin global operativo;
- [x] `REM-CANCEL` resuelve el lado responsable por estado;
- [x] OWN de actualización exige creador, estado editable y campos permitidos;
- [x] OWN no concede cancelación automáticamente;
- [x] terceros requieren responsabilidad explícita;
- [x] se evalúan territorio vigente y propuesto cuando un cambio territorial sea admisible;
- [x] la matriz de 19 roles conserva las decisiones ya aprobadas;
- [x] la edición propia operativa no modifica origen ni destino por una edición genérica;
- [x] actualización administrativa no sustituye transiciones atómicas;
- [x] los campos deben clasificarse y denegarse por defecto;
- [x] líneas, cantidades, presentaciones, políticas y rutas se revalidan cuando cambian;
- [x] toda actualización exige estado editable;
- [x] toda cancelación exige estado cancelable;
- [x] cancelación exige motivo y lado responsable aplicable;
- [x] cancelación no revierte inventario o custodia por inferencia;
- [x] actualización usa concurrencia optimista;
- [x] cancelación usa bloqueo o versión e idempotencia;
- [x] actualización de cabecera y líneas es atómica o explícitamente compensable;
- [x] update y cancel conservan auditoría antes/después;
- [x] shared device exige `STRONG` para ambas capacidades;
- [x] simulación no produce efectos;
- [x] `delete` no se convierte en permiso por existir `cancel`;
- [x] una eliminación fallida no se degrada automáticamente a cancelación;
- [x] `reverse_cancel` no se trata como capacidad independiente ni como bypass;
- [x] preparación permanece reservada a `NEXO-AUTH-006`;
- [x] etapas posteriores permanecen en sus owners;
- [x] las brechas AS-IS de permiso legacy, carril, territorio, atomicidad, motivo, concurrencia, delete y reversa quedan documentadas;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT`;
- [x] el gate futuro conserva `POST_E5_PACKAGE`;
- [x] no se crea ni modifica requisito de prueba;
- [x] no se autoriza cambio físico.

#### 64. Límites

Esta tarea no:

- modifica código NEXO;
- modifica Server Actions;
- modifica componentes;
- crea una RPC;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- elimina físicamente claves legacy;
- cambia matrices de rol;
- cambia modalidad de permisos;
- cambia scopes;
- cambia prerrequisitos;
- inventa nuevos estados de remisión;
- redefine la máquina de estados completa;
- prepara remisiones;
- ejecuta producción vinculada;
- despacha;
- registra tránsito;
- recibe;
- ajusta inventario;
- redefine el ledger de inventario;
- cambia dispositivos compartidos;
- cambia simulación;
- migra paquetes compartidos;
- elimina helpers fuera de la materialización asignada;
- despliega;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 65. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-004 — Proteger creación de solicitudes`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-005 — Proteger edición y cancelación`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-006 — Proteger preparación`
### ✅ NEXO-AUTH-006 — Proteger preparación

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-005 — Proteger edición y cancelación
**Tarea siguiente:** NEXO-AUTH-007 — Proteger producción vinculada
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger la preparación de remisiones mediante `nexo.inventory.remissions.prepare`, exigir carril operativo completo sobre el lado de origen y el área preparadora, autorizar cada fulfillment y reclamo en servidor y preservar la frontera entre cantidad lista, producción, despacho, inventario, custodia y tránsito
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-006::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger de extremo a extremo la autorización de preparación de remisiones para que una cantidad solo pueda declararse lista cuando un actor humano autorizado, dentro del turno, check-in, sede y área de origen correctos, opere sobre el fulfillment exacto, vigente y versionado y confirme evidencia física suficiente mediante una frontera server-side, atómica e idempotente.

La decisión objetivo es:

```text
ACTOR EFECTIVO
+ TURNO VIGENTE
+ CHECK-IN ACTIVO
+ ROL OPERATIVO COMPATIBLE
+ PERMISO nexo.inventory.remissions.prepare
+ SEDE ORIGEN EXACTA
+ AREA PREPARADORA ACTIVA
+ FULFILLMENT ELEGIBLE
+ REQUEST / LINE / FULFILLMENT VIGENTES
+ SNAPSHOTS Y RUTA COMPATIBLES
+ RAMA STOCK O PRODUCTION RESUELTA
+ EVIDENCIA FISICA SUFICIENTE
+ VERSIONES ESPERADAS
+ DENEGACIONES AUSENTES
→ PREPARACION AUTORIZABLE
```

La mera capacidad de ver una remisión, una sede seleccionada, una vista multisede, una cantidad digitada o un nombre de rol no sustituyen esta decisión.

#### 2. Frontera empresarial

Preparar no equivale a despachar.

La frontera canónica es:

```text
PREPARADO != DESPACHADO
READY_BASE_QTY != SHIPPED_BASE_QTY
UBICADO PARA SALIDA != DESCONTADO DE INVENTARIO
EMPAQUE PREPARADO != CARGA SELLADA
ACTOR PREPARADOR != CUSTODIO O CONDUCTOR
```

La salida propia de preparación es exclusivamente una cantidad `ready` o `partially_ready`, con remanente y bloqueos explícitos cuando corresponda.

#### 3. Capacidad protegida exacta

La identidad canónica única es:

```text
nexo.inventory.remissions.prepare
```

No se crea otra capacidad para:

- marcar listo;
- seleccionar LOC;
- registrar picks;
- reclamar tarea;
- preparar parcialmente;
- empacar;
- dejar en staging;
- preparar desde dispositivo compartido;
- preparar una remisión creada por otro actor.

Todas esas acciones consumen el permiso exacto y agregan predicados de recurso, estado, territorio y etapa.

#### 4. Modalidad `OPERATIONAL_ONLY`

La capacidad conserva:

```text
authorization_requirement = OPERATIONAL_ONLY
```

Por tanto:

```text
CARRIL BASE
→ NO AUTORIZA

CARRIL OPERATIVO COMPLETO
→ UNICO CAMINO AUTORIZANTE
```

Una concesión administrativa, un rol base privilegiado o una cobertura global de lectura no pueden sustituir el carril operativo.

#### 5. Prerrequisito `T+C`

La preparación exige:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO
```

Ambos deben corresponder al actor efectivo y al contexto desde el cual se ejecuta la preparación.

La ausencia, expiración, sustitución o cierre de cualquiera produce denegación antes de confirmar un efecto empresarial.

#### 6. Área activa obligatoria

Preparar afecta existencias, ubicaciones y trabajo físico del lado de origen.

Por ello exige área activa de origen.

La decisión debe demostrar:

- sede origen vigente;
- área preparadora vigente;
- pertenencia del área a la sede;
- compatibilidad con `preparing_area_kind`;
- compatibilidad con el rol operativo;
- compatibilidad con el fulfillment.

Una sede correcta con área incorrecta no autoriza.

#### 7. Scope `REM-SIDE`

El perfil de alcance es:

```text
REM-SIDE
```

Admite en el lado de origen:

```text
AS
SS
AST
AA
SA
AAT
CTX
```

No admite como autoridad de preparación:

```text
G
TST
ATW
```

La preparación puede operar una remisión creada por otro actor siempre que el preparador tenga autoridad válida sobre el origen y el fulfillment.

#### 8. Territorio del lado de origen

La autoridad mutadora se limita a:

- sede origen;
- área preparadora;
- LOC y posiciones autorizados;
- fulfillment exacto;
- líneas y cantidades que ese fulfillment representa.

Ver el destino no concede autoridad allí.

La preparación tampoco concede autoridad sobre recepción, custodia en tránsito, operación del conductor, inventario de otras sedes, configuración de rutas o producción propietaria de FOGO.

#### 9. Matriz de roles vigente

El universo evaluado conserva diecinueve roles canónicos:

```text
ROLES BASE: 7
ROLES OPERATIVOS: 12
TOTAL: 19
```

Resultado para `nexo.inventory.remissions.prepare`:

```text
ASIGNAR OPERATIVO: 1
NO ASIGNAR: 18
```

La única concesión ordinaria vigente pertenece a:

```text
bodeguero
```

Esta tarea no modifica la matriz.

#### 10. Decisión para `bodeguero`

`bodeguero` recibe `nexo.inventory.remissions.prepare` bajo:

```text
CTX-WH-REMISSION-PREPARE
```

El contrato comprende remisiones cuyo origen sea la bodega activa, alistamiento, cantidades preparadas, faltantes, sustituciones solo cuando exista autorización aplicable, empaque y estado listo para el handoff de despacho.

No comprende iniciar tránsito.

La concesión solo existe dentro del carril operativo completo.

#### 11. Roles que permanecen sin preparación

No reciben `prepare` por sus matrices:

- propietario;
- gerente_general;
- gerente;
- supervisor;
- auxiliar_administrativa;
- contador;
- marketing;
- cajero_satelite;
- barista_satelite;
- cocinero_satelite;
- servicio_salon;
- mostrador_satelite;
- operador_integral_satelite;
- produccion_cocina;
- produccion_panaderia;
- produccion_reposteria;
- conductor_logistica;
- gerencia_operativa.

Una responsabilidad de coordinación, solicitud, producción, conducción o administración no se convierte en preparación.

#### 12. Prohibición de bypass administrativo

No autorizan preparación:

```text
employees.role
role override administrativo
propietario
gerente_general
gerente
supervisor
gerencia_operativa
nexo.access
remissions.view
all_sites
seleccion de sede
URL
boton visible
```

Si una misma persona debe preparar físicamente, debe asumir legítimamente el rol operativo autorizado y satisfacer el contexto completo.

#### 13. `all_sites` no cambia el carril

La amplitud de lectura multisede nunca puede seleccionar un evaluador base para `prepare`.

La regla es:

```text
VISIBILIDAD AMPLIA
!=
AUTORIDAD OPERATIVA AMPLIA
```

Aunque una superficie permita consultar varias sedes, antes de cualquier mutación debe resolverse una sede de origen y un área preparadora exactas y evaluarse `nexo.inventory.remissions.prepare` por el carril operativo.

#### 14. Unidad autorizable

La unidad de preparación no es el encabezado completo de la solicitud.

La unidad autoritativa es:

```text
fulfillment_id
```

vinculada a request, línea, sede origen, área preparadora, fuente, modo de abastecimiento, cantidad solicitada, estado, versiones y snapshots.

Una misma solicitud puede producir varias tareas de preparación con autoridades y estados distintos.

#### 15. Identidad mínima del fulfillment

Antes de mutar, el servidor debe poder resolver de forma coherente al menos:

```text
fulfillment_id
request_id
request_version
request_line_id
fulfillment_version
source_site_id
preparing_area_kind
supply_mode
product_id
requested_base_qty
ready_base_qty
allocated_base_qty
remaining_base_qty
status
```

Los nombres físicos podrán evolucionar durante la materialización. La semántica no.

#### 16. Solicitud y línea inmutables para preparación

Preparación consume la intención ya confirmada.

No edita silenciosamente:

- producto solicitado;
- política de solicitud;
- cantidad original;
- conversión aprobada;
- sede solicitante;
- área solicitante;
- fuente resuelta;
- receipt de solicitud.

Un cambio legítimo requiere una nueva versión, reasignación o transición compensatoria autorizada.

#### 17. Snapshot autoritativo

La tarea consume snapshots o referencias versionadas de producto, política, UOM, cantidad base, sede, área, ruta, modo de abastecimiento, modo de ejecución productiva, origen físico y LOC listo cuando corresponda.

La preparación no relee una configuración mutable y la presenta como si hubiera sido la decisión original.

#### 18. Selección de rama

La rama se deriva del snapshot:

```text
supply_mode = stock
```

o:

```text
supply_mode = production
```

El actor no puede elegir manualmente la rama para evitar un bloqueo, cambiar de origen o reinterpretar la necesidad.

Una reasignación requiere transición autorizada, versionada y trazable.

#### 19. Elegibilidad del trabajo

Un fulfillment solo puede prepararse cuando:

- pertenece a la sede origen activa;
- `preparing_area_kind` coincide con el área autorizada;
- el estado admite preparación o continuación;
- la solicitud no está cancelada, sustituida u obsoleta;
- el fulfillment no está terminal;
- el actor posee permiso y territorio;
- la ruta y snapshots siguen siendo consumibles;
- no existe una denegación vigente.

Una fila visible pero no elegible permanece no mutable.

#### 20. Estado y transición

Preparación puede participar en los estados de fulfillment definidos por el contrato de experiencia.

Como resultado propio puede producir:

```text
partially_ready
ready
```

Puede además reflejar ejecución o bloqueo dentro de la máquina aprobada.

No escribe como resultado propio:

```text
allocated
released
in_transit
received
```

Los estados posteriores pertenecen a otros carriles.

#### 21. Reclamo de trabajo

El reclamo es una autoridad de ejecución separada del estado empresarial.

Antes de reclamar o continuar se revalida:

```text
ACTOR
+ TAREA ELEGIBLE
+ CLAIM_VERSION
+ REQUEST_VERSION
+ FULFILLMENT_VERSION
+ ESTADO
+ TERRITORIO
+ AREA
+ PERMISO
```

Un fulfillment admite como máximo el reclamo activo permitido por el contrato vigente.

#### 22. Concurrencia del reclamo

Si otra persona reclama, modifica, bloquea, reasigna, asigna a despacho o cancela la tarea durante la operación, el actor actual no conserva autoridad sobre una versión obsoleta.

La interfaz debe recargar o entrar en conflicto explícito.

No se admiten controles stale como autoridad.

#### 23. Versiones esperadas

Todo comando material de preparación conserva como mínimo:

- versión de solicitud;
- versión de fulfillment;
- versión de claim cuando exista;
- evidencia o versión del snapshot de stock;
- fingerprint de ruta o equivalente;
- identidad de intención;
- fingerprint del payload.

Un cambio de cualquiera de estas autoridades invalida una revisión anterior.

#### 24. Rama `stock`

La rama stock solo opera cuando el snapshot la autoriza.

El preparador puede resolver trabajo físico mediante uno o más picks vinculados al mismo fulfillment y línea.

La preparación no convierte una selección del navegador en hecho físico sin revalidación server-side.

#### 25. Picks múltiples

Una línea solicitada puede prepararse desde múltiples LOC o posiciones.

La representación objetivo es:

```text
UNA LINEA SOLICITADA
→ UNO O MAS PICKS
```

No:

```text
UNA LINEA
→ PARTIR O REESCRIBIR LA INTENCION PARA REPRESENTAR CADA LOC
```

Los picks conservan el mismo `request_line_id` y `fulfillment_id`.

#### 26. LOC y posición

Cada pick debe comprobar en servidor:

- LOC existente;
- LOC activo;
- pertenencia a la sede origen;
- compatibilidad con el fulfillment;
- posición existente y perteneciente al LOC cuando aplique;
- producto compatible;
- condición permitida;
- saldo suficiente;
- actor;
- timestamp.

Un `source_location_id` recibido del cliente no concede autoridad.

#### 27. UOM y presentación

Cuando el pick utiliza una presentación:

- el perfil pertenece al producto;
- permanece vigente o está cubierto por snapshot autorizado;
- la unidad de entrada es compatible;
- la conversión a base es válida;
- la cantidad de presentación es positiva;
- la suma en unidad base se reconcilia.

No se inventa una conversión para lograr una preparación válida.

#### 28. Stock durante preparación

La preparación consulta y valida stock físico.

No publica por sí misma:

```text
transfer_out
```

ni convierte automáticamente `ready_base_qty` en descuento de inventario.

El hecho de salida pertenece al despacho autorizado.

#### 29. Reservas

Una reserva solo puede existir si hay un ledger explícito, versionado, reversible e idempotente aprobado para esa semántica.

No se infiere una reserva a partir de:

- `prepared_quantity`;
- `ready_base_qty`;
- un estado visual;
- una nota;
- un pick no confirmado;
- una disminución anticipada del stock real.

La ausencia de ledger significa que no se declara reserva.

#### 30. Cambios de stock durante ejecución

Si el saldo o la disponibilidad cambian entre plan y confirmación:

- se rechaza el comando obsoleto;
- no se reduce silenciosamente la cantidad para obtener éxito;
- se conservan hechos previamente confirmados;
- se reconcilia desde el estado autoritativo;
- el actor revisa nuevamente la tarea.

La preparación no usa último-escritor-gana sobre cantidades físicas.

#### 31. Rama `production`

La rama productiva solo puede consumir un resultado productivo legítimo.

NEXO no adquiere por `prepare` autoridad para crear una orden FOGO, ejecutar receta, crear o cerrar lote, registrar consumo productivo, aprobar calidad o liberar producción.

Esas responsabilidades permanecen fuera de este permiso.

#### 32. Producción liberada

Para incrementar `ready_base_qty` desde producción debe existir un resultado:

- identificado;
- correlacionado con el fulfillment;
- liberado por la autoridad productiva;
- con producto correcto;
- con cantidad válida;
- no consumido previamente;
- ubicado en el `ready_location_id` aplicable;
- versionado e idempotente.

Una producción estimada, iniciada o no liberada no es cantidad lista.

#### 33. Frontera con `NEXO-AUTH-007`

`NEXO-AUTH-007 — Proteger producción vinculada` conserva la protección específica de las operaciones y handoffs de producción vinculada.

006 consume únicamente el hecho productivo que el contrato permita considerar liberado y disponible para el fulfillment.

006 no anticipa permisos de FOGO ni una autoridad productiva nueva.

#### 34. Cantidades

La preparación distingue:

```text
requested_base_qty
reserved_base_qty
picked_base_qty
released_production_base_qty
ready_base_qty
allocated_base_qty
dispatched_base_qty
cancelled_base_qty
blocked_base_qty
remaining_base_qty
```

Ninguna de estas variables se usa como sinónimo de otra.

#### 35. Invariantes de cantidad

El contrato preserva:

```text
0 <= allocated_base_qty <= ready_base_qty
0 <= ready_base_qty
0 <= cancelled_base_qty
ready_base_qty + cancelled_base_qty <= requested_base_qty
remaining_base_qty =
  requested_base_qty
  - ready_base_qty
  - cancelled_base_qty
```

Para stock:

```text
ready_base_qty <= SUM(confirmed_pick.base_qty)
```

Para producción:

```text
ready_base_qty <= SUM(unconsumed_released_production.base_qty)
```

#### 36. Preparación parcial

`partially_ready` es un resultado válido cuando existe cantidad lista y remanente aún exigible.

Debe conservar simultáneamente cantidad lista, cantidad restante, bloqueo o causa cuando exista, siguiente acción y evidencia.

Una parcial no se presenta como preparación completa.

#### 37. Faltantes y bloqueos

Faltantes, daño, calidad no apta, sustitución, ruta obsoleta o reasignación se representan mediante excepciones estructuradas.

Como mínimo deben conservar tipo, cantidad afectada, causa, actor, responsable siguiente, evidencia, estado y versión.

Una nota libre no resuelve una excepción empresarial.

#### 38. Sustituciones y reasignaciones

El preparador no cambia producto, fuente o ruta por conveniencia.

Una sustitución o reasignación requiere política aplicable, autoridad, transición explícita, versión, vínculo con la intención original y trazabilidad.

El historial no se reescribe.

#### 39. Pick, pack y staging

La preparación puede recoger, contar o medir, agrupar, empacar, dejar unidades en staging autorizado y registrar evidencia.

Estos hechos no crean por sí mismos una carga logística.

#### 40. Unidad preparada no equivale a LPN canónico

Una referencia operativa de unidad preparada puede existir para agrupar trabajo.

No adquiere automáticamente la semántica completa de un LPN.

La identidad, lifecycle, contenido, etiquetado y custodia canónica de LPN permanecen en sus tareas propietarias.

#### 41. Preparación no crea despacho

Preparación no puede por este permiso:

- crear shipment;
- asignar conductor;
- crear viaje;
- crear carga;
- sellar carga;
- aceptar custodia;
- publicar salida;
- iniciar tránsito.

Estas decisiones pertenecen al carril de despacho y etapas posteriores.

#### 42. `ready` no escribe `shipped`

La regla es estricta:

```text
PREPARE
→ puede escribir READY

PREPARE
→ no escribe SHIPPED
```

`shipped_quantity` o su equivalente solo cambia cuando el contrato de despacho confirma el hecho de salida correspondiente.

#### 43. Handoff a despacho

El handoff expone exclusivamente hechos confirmados necesarios para la siguiente etapa, incluyendo según aplique fulfillment, cantidad ready, cantidad allocated, saldo listo no asignado, versiones, origen, destino, área, staging, UOM, lote o empaque, evidencia y excepciones abiertas.

No concede autoridad de despacho.

#### 44. Frontera con `NEXO-AUTH-008`

`NEXO-AUTH-008 — Proteger despacho` conserva selección para carga, asignación de cantidad ready, creación de carga o shipment, validación de salida, cambio de custodia cuando corresponda, efecto de inventario asociado al despacho y transición logística inicial.

006 termina antes de esos efectos.

#### 45. Frontera con tránsito y recepción

006 no concede:

```text
nexo.inventory.remissions.dispatch
nexo.inventory.remissions.receive
```

ni cualquier transición equivalente de tránsito.

`NEXO-AUTH-009` conserva tránsito.

`NEXO-AUTH-010` conserva recepción.

#### 46. Server-side como frontera autoritativa

La autorización se recalcula en servidor en los puntos materiales del flujo.

Como mínimo:

- carga de trabajo;
- reclamo;
- reanudación;
- guardado de borrador autoritativo cuando exista;
- confirmación;
- reintento;
- handoff.

No se confía exclusivamente en una decisión calculada por la UI.

#### 47. Entradas no confiables

Son datos a validar, no autoridad:

- `fulfillment_id`;
- `request_id`;
- `request_line_id`;
- `site_id`;
- `area_id`;
- `preparing_area_kind`;
- LOC;
- posición;
- UOM;
- cantidad;
- modo;
- batch;
- prepared unit;
- parámetros de URL;
- campos ocultos.

El servidor vuelve a relacionarlos con el recurso real.

#### 48. Dispositivo compartido

Preparación mantiene clasificación de reautenticación:

```text
STANDARD
```

Esto no elimina la identidad del actor.

En dispositivo compartido se intersectan límites del dispositivo, actor humano efectivo, permiso, turno, check-in, sede, área, fulfillment, estado y versión.

La sesión técnica no se convierte en preparador empresarial.

#### 49. Firma y evidencia en dispositivo compartido

Cuando el contrato del dispositivo exija firma de actor para la mutación, esa evidencia se vincula al comando y al receipt.

No se guarda como nota libre.

No se persisten PIN, credenciales o secretos dentro de picks, evidencias, logs, analytics o receipts.

#### 50. Simulación

La simulación puede mostrar un resultado hipotético.

No puede reclamar trabajo real, crear picks reales, incrementar ready, bloquear una tarea real, consumir producción liberada, publicar handoff, descontar stock o producir receipt de ejecución real.

La simulación no se convierte en autorización.

#### 51. Conectividad y offline

No existe confirmación empresarial offline por defecto.

Si se pierde conexión:

- antes del reclamo, el trabajo cacheado es no autoritativo;
- durante captura, un borrador local no afirma efecto empresarial;
- al reconectar, se revalidan actor, claim, versiones, stock y dependencias;
- un resultado desconocido se reconcilia por intención.

Una futura política offline requerirá contrato específico.

#### 52. Idempotencia

Cada confirmación utiliza una identidad estable de intención.

La regla es:

```text
MISMA INTENCION
+
MISMO PAYLOAD
→ MISMO RESULTADO / RECEIPT
```

y:

```text
MISMA INTENCION
+
PAYLOAD DIFERENTE
→ CONFLICTO
```

Nunca se genera un segundo efecto por un simple retry.

#### 53. Fingerprint

La revisión produce un fingerprint sobre las autoridades y datos materiales de la preparación.

Cambios en picks, cantidades, evidencia, versiones, ruta, claim, fuente, producción liberada o excepciones invalidan la revisión anterior.

#### 54. Confirmación atómica

La confirmación debe comprometer de forma coherente, según la rama y el modelo físico vigente:

- intención;
- actor;
- versiones;
- picks o liberaciones;
- cantidades;
- excepciones;
- estado del fulfillment;
- evidencia;
- receipt;
- handoff.

No se admite un éxito con solo una parte del resultado materializado.

#### 55. Resultado desconocido

Un timeout, corte de red o pérdida de respuesta produce:

```text
RESULTADO DESCONOCIDO
→ CONSULTAR POR INTENCION
→ RECONCILIAR
→ DEVOLVER RECEIPT EXISTENTE O REINTENTAR SEGURO
```

No produce una nueva intención automáticamente.

#### 56. Receipt

La preparación confirmada debe disponer de un receipt recuperable que permita demostrar intención, actor, fulfillment, versiones, cantidades, evidencia asociada, estado resultante, timestamp y correlación.

El receipt no sustituye el ledger de inventario ni el receipt de despacho.

#### 57. Auditoría

Cada decisión permitida o denegada debe permitir reconstruir:

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
- fulfillment;
- request y line;
- versiones;
- estado;
- decisión;
- razones;
- correlación;
- timestamp.

La evidencia se minimiza al propósito operativo.

#### 58. Frescura

Antes de mutar se invalida cualquier decisión previa cuando cambien actor, turno, check-in, rol operativo, sede, área, permiso, scope, claim, estado, versiones, stock, snapshot, ruta, producción liberada, dispositivo o denegaciones.

La autorización no se congela al abrir la pantalla.

#### 59. Denegación fail-closed

La preparación se deniega ante cualquier condición obligatoria no demostrable.

Incluye actor no resoluble, permiso ausente, rol no concedido, turno inválido, check-in ausente, sede incorrecta, área incorrecta, fulfillment ajeno, estado no elegible, versión obsoleta, claim incompatible, LOC inválido, stock insuficiente, evidencia insuficiente, producción no liberada, conflicto de intención o fallo técnico que impida verificar autoridad.

No se transforma incertidumbre en permiso.

#### 60. AS-IS remoto: superficie `/prepare`

La superficie de preparación inspeccionada ya usa evaluación operacional para el permiso exacto en sesión personal y compartida.

También limita solicitudes al origen y estados físicos legacy `pending` o `preparing`.

Se conserva esa dirección de autorización.

La brecha es que la superficie continúa proyectando principalmente encabezados legacy y métricas agregadas, mientras el contrato autoritativo opera por fulfillment y área responsable.

#### 61. AS-IS remoto: fulfillment y bypass de carril

La superficie y Server Action de fulfillment inspeccionadas contienen una rama donde la visibilidad `all_sites` puede hacer que `prepare` se evalúe mediante un helper base de role override.

Eso contradice `OPERATIONAL_ONLY`.

El estado objetivo exige eliminar esa relación:

```text
CAN_VIEW_ALL
→ NO CAMBIA EL EVALUADOR DE PREPARE
```

La preparación siempre vuelve al carril operativo completo.

#### 62. AS-IS remoto: `markFulfillmentReady`

La acción observada ya valida permiso, sede, área, fulfillment, estado editable, cantidad no inferior a allocated, cantidad no superior a requested y transición a `ready` o `partially_ready`.

También condiciona la escritura por sede, área y estado.

Estas defensas se conservan.

La brecha es que una cantidad digitada puede convertirse en ready sin demostrar necesariamente picks confirmados o liberación productiva correlacionada.

#### 63. AS-IS remoto: picks no atómicos

El flujo de detalle inspeccionado posee granularidad de picks y validaciones útiles.

Sin embargo, la confirmación legacy puede reemplazar picks mediante operaciones separadas de eliminación e inserción.

La futura materialización debe converger en un comando atómico, versionado e idempotente.

No se permite pérdida de picks por fallo intermedio.

#### 64. AS-IS remoto: preparado y enviado conflados

El flujo de detalle inspeccionado puede escribir en preparación:

```text
prepared_quantity
+
shipped_quantity
```

con la misma cantidad.

Esto contradice la frontera aprobada.

El estado objetivo es:

```text
PREPARACION
→ ready / prepared

DESPACHO
→ shipped
```

sin escritor compartido implícito.

#### 65. AS-IS remoto: split legacy de línea

Existe un escape hatch que puede partir una línea de solicitud durante preparación.

El contrato objetivo representa multi-LOC mediante múltiples picks bajo una línea inmutable.

El split solo podrá sobrevivir si otra semántica empresarial explícita lo requiere; no será el mecanismo ordinario para preparación multi-LOC.

#### 66. AS-IS remoto: rama productiva

La cola actual distingue modos productivos, pero el comando de marcado ready inspeccionado no demuestra por sí mismo una liberación FOGO correlacionada antes de aceptar cantidad lista.

El objetivo exige consumir únicamente un hecho productivo liberado, versionado e idempotente.

La autoridad productiva permanece fuera de `prepare`.

#### 67. AS-IS remoto: receipt recuperable

Las superficies actuales poseen revalidaciones y fingerprints parciales.

No se observó en la frontera auditada un receipt recuperable por identidad de intención que cubra integralmente la confirmación.

La futura materialización debe incorporarlo conforme al contrato ya aprobado en `NEXO-UX-010`.

#### 68. Convergencia de superficies

Las superficies existentes de preparación y fulfillment no pueden mantener dos verdades empresariales.

Deben converger sobre mismo fulfillment, mismo estado, misma autoridad, mismas versiones, mismas invariantes, mismo comando de confirmación y mismo receipt.

Una ruta puede permanecer como entrada o alias de experiencia sin crear un segundo modelo de preparación.

#### 69. Estrategia de materialización futura

Cada unidad física deberá volver a inventariar su commit base antes de modificar.

La estrategia objetivo es:

```text
KEEP STRICT OPERATIONAL AUTH
+
REMOVE ALL_SITES PREPARE BYPASS
+
AUTHORIZE EXACT FULFILLMENT
+
REQUIRE ACTIVE ORIGIN AREA
+
USE VERSIONED CLAIM
+
DERIVE STOCK / PRODUCTION FROM SNAPSHOT
+
REQUIRE PICKS OR RELEASED PRODUCTION EVIDENCE
+
KEEP READY DISTINCT FROM SHIPPED
+
KEEP PREPARATION DISTINCT FROM STOCK TRANSFER_OUT
+
MAKE CONFIRMATION ATOMIC
+
ADD IDEMPOTENT INTENT + RECEIPT
+
CONVERGE PREPARE AND FULFILLMENT SURFACES
```

Este marcador no presupone nombres físicos nuevos de RPC, tabla, constraint o endpoint.

#### 70. Contrato de unidad física

La tarea global no modifica producto.

Cada futura instancia:

```text
NEXO-AUTH-006::<implementation_unit_id>
```

solo puede existir cuando:

- la unidad haya sido asignada por el contrato de paquetes;
- exista `package_id` propietario;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias técnicas estén disponibles;
- exista autorización física explícita.

Cada instancia declara consumidores, archivos, datos, migraciones, pruebas, evidencia y rollback de su unidad.

#### 71. Frontera con tareas posteriores

Se preservan como propietarios independientes:

```text
NEXO-AUTH-007 → producción vinculada
NEXO-AUTH-008 → despacho
NEXO-AUTH-009 → tránsito
NEXO-AUTH-010 → recepción
NEXO-AUTH-015 → filtrado integral por sede y área efectivas
NEXO-AUTH-016 → dispositivo compartido global
NEXO-AUTH-017 → simulación estricta
NEXO-AUTH-018 → migración a paquetes compartidos
NEXO-AUTH-019 → eliminación de helpers duplicados
NEXO-AUTH-020 → pruebas integrales
```

006 fija la protección específica de preparación y entrega a esas tareas únicamente sus fronteras correspondientes.

#### 72. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- el flujo completo de preparación ya posee requisitos específicos;
- la autorización por actor, contexto, territorio y servidor ya posee cobertura transversal;
- el fulfillment, claim, snapshots y versiones ya poseen cobertura específica;
- multi-LOC, UOM, stock y picks ya poseen cobertura específica;
- la frontera NEXO–FOGO ya posee cobertura específica;
- cantidades, parciales y excepciones ya poseen cobertura específica;
- pick, pack, staging y separación de despacho ya poseen cobertura específica;
- atomicidad, idempotencia, fingerprint, receipt y recuperación ya poseen cobertura específica;
- el handoff a despacho ya posee cobertura específica;
- la convergencia de superficies y cierre de brechas AS-IS ya posee cobertura específica.

006 especializa y consolida esas obligaciones desde la frontera de autorización sin crear una obligación verificable nueva.

#### 73. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-010`;
- `TREQ-AUTH-011`;
- `TREQ-AUTH-012`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-006`;
- `TREQ-NEXO-009`;
- `TREQ-NEXO-010`;
- `TREQ-NEXO-011`;
- `TREQ-NEXO-101`;
- `TREQ-NEXO-102`;
- `TREQ-NEXO-103`;
- `TREQ-NEXO-104`;
- `TREQ-NEXO-105`;
- `TREQ-NEXO-106`;
- `TREQ-NEXO-107`;
- `TREQ-NEXO-108`;
- `TREQ-NEXO-109`;
- `TREQ-NEXO-110`.

Estas referencias documentan cobertura heredada y no modifican filas del registro.

#### 74. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificó `main` vigente de `vento-shell`, cierre de `NEXO-AUTH-005`, continuidad hacia `NEXO-AUTH-006`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, modalidad `OPERATIONAL_ONLY`, prerrequisito `T+C`, área obligatoria de origen, scope `REM-SIDE`, contrato de recurso, las 19 matrices de rol, `NEXO-UX-010`, 04A vigente y AS-IS de preparación en `vento-nexo` |
| OPERATIVA | NOT_APPLICABLE | no se reclama, prepara, empaca, marca ready ni despacha una remisión real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-006::<implementation_unit_id>` |

#### 75. Criterios de aceptación

- [x] la capacidad protegida exacta es `nexo.inventory.remissions.prepare`;
- [x] conserva modalidad `OPERATIONAL_ONLY`;
- [x] el carril base no autoriza;
- [x] exige turno vigente y check-in activo;
- [x] exige área activa exacta del origen;
- [x] usa scope `REM-SIDE`;
- [x] G, TST y ATW no se convierten en autoridad de preparación;
- [x] solo `bodeguero` recibe concesión entre los 19 roles vigentes;
- [x] roles base, solicitantes, producción, conductor y gerencia operativa permanecen sin `prepare`;
- [x] `all_sites` o visibilidad multisede no cambian el carril autorizante;
- [x] la unidad autorizable es el fulfillment, no el encabezado de solicitud;
- [x] request, line y fulfillment conservan identidad y versión;
- [x] producto, política, cantidad original y fuente no se reescriben silenciosamente;
- [x] la rama stock o production se deriva del snapshot;
- [x] claim y concurrencia se controlan por versiones;
- [x] multi-LOC se representa con múltiples picks;
- [x] LOC, posición, UOM y saldo se revalidan en servidor;
- [x] preparación no publica `transfer_out`;
- [x] una reserva solo existe con ledger explícito;
- [x] la rama productiva consume únicamente producción liberada y correlacionada;
- [x] se preservan las invariantes de ready, allocated, cancelled y remaining;
- [x] preparación parcial conserva remanente y causa;
- [x] faltantes, sustituciones y reasignaciones son estructurados;
- [x] empaque y staging no crean shipment, custodia o tránsito;
- [x] prepared unit no se declara LPN canónico por inferencia;
- [x] `ready` permanece separado de `shipped`;
- [x] despacho conserva ownership en `NEXO-AUTH-008`;
- [x] tránsito y recepción permanecen en 009 y 010;
- [x] autorización se recalcula server-side en cada punto material;
- [x] IDs del cliente no son autoridad;
- [x] shared device conserva actor humano y nivel `STANDARD`;
- [x] simulación no produce efectos;
- [x] no existe confirmación empresarial offline por defecto;
- [x] confirmación usa intención y fingerprint;
- [x] confirmación es atómica e idempotente;
- [x] resultado desconocido se reconcilia por intención;
- [x] existe contrato de receipt recuperable;
- [x] auditoría conserva actor, contexto, recurso, versiones, decisión y correlación;
- [x] el AS-IS válido se conserva sin aceptar sus bypass o mezclas;
- [x] el bypass `all_sites -> role override -> prepare` queda prohibido;
- [x] una cantidad digitada no basta como evidencia física;
- [x] picks no se reemplazan mediante una secuencia parcial no protegida;
- [x] preparación no copia automáticamente prepared a shipped;
- [x] split legacy no representa ordinariamente multi-LOC;
- [x] production ready exige liberación FOGO correlacionada;
- [x] las superficies de preparación convergen sobre una sola verdad;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT`;
- [x] el gate futuro conserva `POST_E5_PACKAGE`;
- [x] no se crea ni modifica requisito de prueba;
- [x] no se autoriza cambio físico.

#### 76. Límites

Esta tarea no:

- modifica código NEXO;
- modifica Server Actions;
- modifica componentes;
- crea RPC;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- modifica matrices de rol;
- cambia modalidad de permisos;
- cambia scope;
- cambia prerrequisitos;
- prepara una remisión real;
- reclama trabajo real;
- crea picks reales;
- crea reservas;
- descuenta inventario;
- ejecuta producción;
- modifica FOGO;
- crea shipments;
- asigna conductores;
- despacha;
- transfiere custodia;
- inicia tránsito;
- recibe;
- crea LPN;
- redefine estados fuera del contrato aprobado;
- habilita operación offline;
- modifica rutas de navegación;
- migra consumidores físicamente;
- despliega;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 77. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-005 — Proteger edición y cancelación`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-006 — Proteger preparación`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-007 — Proteger producción vinculada`
### ✅ NEXO-AUTH-007 — Proteger producción vinculada

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-006 — Proteger preparación
**Tarea siguiente:** NEXO-AUTH-008 — Proteger despacho
**Tipo de tarea:** Contrato global de autorización con materialización condicional por unidad (`PER_IMPLEMENTATION_UNIT`) para proteger las acciones NEXO del vínculo entre remisiones y producción definido por `INT-PROD-005`, sin transferir autoridad productiva desde FOGO ni crear permisos canónicos nuevos
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; la materialización futura solo aplica a unidades pertenecientes a paquetes que incorporen el contrato `INT-PROD-005` y activen `PRODUCTION_LINK_IMPLEMENTATION`, después de `E5-GATE-008::<package_id> = PASS` y autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger la producción vinculada a remisiones sin convertir una necesidad logística en autoridad productiva y sin permitir que NEXO, FOGO o una interfaz mezclen responsabilidades empresariales.

La regla raíz es:

```text
REMISION APROBADA O EN PREPARACION
+
POLITICA DE CUMPLIMIENTO VIGENTE
+
FALTANTE O NECESIDAD BAJO PEDIDO
+
PRODUCTO Y UNIDAD RESOLUBLES
→ NECESIDAD PRODUCTIVA CORRELACIONADA
→ DECISION AUTORITATIVA DE FOGO
→ EJECUCION, CALIDAD Y LIBERACION
→ ASIGNACION AUTORITATIVA DE NEXO
→ PREPARACION Y DESPACHO AUTORIZADOS
→ RECEPCION Y CONCILIACION
```

Cada transición conserva identidad, versión, autorización, idempotencia y evidencia.

#### 2. Frontera de propiedad

La separación obligatoria es:

```text
NEXO SOLICITA O REGISTRA NECESIDAD
FOGO DECIDE Y EJECUTA PRODUCCION
NEXO ASIGNA Y MUEVE EXISTENCIA LIBERADA
```

NEXO no fabrica estados productivos. FOGO no modifica la intención logística de la remisión. SHELL gobierna los contratos compartidos y cualquier modificación VENTO de Supabase.

#### 3. Hechos que permanecen distintos

```text
FALTANTE DETECTADO
!= NECESIDAD PRODUCTIVA REGISTRADA
!= NECESIDAD ACEPTADA
!= PLAN LIBERADO
!= ORDEN LISTA
!= PRODUCCION EN CURSO
!= PRODUCCION TERMINADA
!= CALIDAD LIBERADA
!= INVENTARIO INGRESADO
!= CANTIDAD ASIGNADA
!= CANTIDAD PREPARADA
!= CANTIDAD DESPACHADA
!= CANTIDAD RECIBIDA
!= REMISION CONCILIADA
```

Ninguna transición puede inferir automáticamente la siguiente.

#### 4. Alcance de autorización de 007

007 protege exclusivamente las acciones NEXO que consumen el contrato de producción vinculada:

- resolver si una línea puede activar tratamiento productivo;
- registrar o proyectar la necesidad correlacionada cuando la transición NEXO aplicable esté autorizada;
- consultar el reflejo de lotes productivos dentro del inventario autorizado;
- consumir una decisión o liberación FOGO válida;
- asignar salida liberada a la línea o fulfillment exactos;
- conservar parcialidad y faltante;
- cancelar o reconciliar el vínculo NEXO cuando el estado lo permita;
- impedir doble asignación y doble efecto de inventario;
- entregar el resultado autorizado a preparación o despacho.

No protege las mutaciones propietarias de FOGO.

#### 5. No se crea un permiso canónico nuevo

El catálogo vigente no contiene una capacidad NEXO específica denominada `production_requirement`, `production_link` o equivalente.

Por tanto:

```text
NEXO-AUTH-007
!=
NUEVO PERMISO IMPLICITO
```

La materialización compone permisos ya aprobados con predicados de recurso, territorio, estado, versión e integración.

Si una implementación futura introduce una acción humana material que no pueda representarse por una capacidad canónica vigente, esa acción permanece denegada hasta que su tarea propietaria de catálogo apruebe la identidad correspondiente.

#### 6. Capacidad NEXO de mutación vinculada

Cuando la acción modifica el fulfillment o la preparación de una remisión por una necesidad o salida productiva, la capacidad NEXO aplicable permanece:

```text
nexo.inventory.remissions.prepare
```

Esta capacidad no autoriza ejecutar producción. Su autoridad se limita al recurso REMISSION, lado de origen, estado preparable y responsabilidad de preparación ya definidos.

#### 7. Capacidad NEXO de consulta productiva

La consulta del reflejo productivo en inventario utiliza:

```text
nexo.inventory.production_batches.view
```

Su semántica es exclusivamente de lectura. Permite consultar lotes productivos reflejados en inventario dentro del territorio autorizado.

No concede crear o modificar lotes FOGO, decidir calidad, liberar producto, ejecutar receta, cambiar una orden productiva ni asignar salida a una remisión por sí sola.

#### 8. Capacidades FOGO permanecen propietarias

FOGO conserva sus capacidades canónicas, entre ellas las que correspondan a:

```text
fogo.production.batches.view
fogo.production.batches.create
fogo.production.orders.view
```

y las capacidades productivas posteriores definidas por sus tareas propietarias.

007 no amplía, fusiona ni reemplaza esos permisos. La autorización de NEXO nunca sirve como permiso FOGO.

#### 9. Carril operativo NEXO

Para cualquier mutación NEXO vinculada a preparación:

```text
nexo.inventory.remissions.prepare
→ OPERATIONAL_ONLY
```

El carril base no sustituye el carril operativo. La capacidad exige contexto compatible con sede, área, recurso y prerrequisitos aprobados.

#### 10. Segregación entre bodeguero y producción

El bodeguero conserva la preparación operativa de remisiones y la lectura del reflejo productivo en inventario cuando corresponde a la bodega activa.

No recibe por ello autoridad para crear lotes FOGO.

Los roles productivos ejecutan las capacidades FOGO que sus matrices les conceden. La lectura NEXO de lotes para trazabilidad no les concede preparación de remisiones cuando su matriz la deniega.

#### 11. Supervisión y gerencia

Los roles administrativos o de coordinación pueden disponer de lectura productiva según sus matrices.

La lectura de órdenes FOGO, lotes FOGO, lotes reflejados en NEXO o estados de remisión no concede crear producción ni preparar una remisión.

La visibilidad no se convierte en mutación.

#### 12. Prohibición de autorización por existencia

No autorizan una acción:

```text
remission_id existente
batch_id existente
producto visible
lote visible
ruta visible
rol visible
boton visible
URL accesible
stock cero
nota de faltante
```

Cada mutación vuelve a resolver actor, permiso, contexto, recurso, estado, versiones y contrato aplicable.

#### 13. Política de cumplimiento como autoridad de activación

Una línea solo entra al tratamiento productivo cuando resuelve una política vigente compatible.

Las políticas aprobadas son:

```text
STOCK_ONLY
STOCK_THEN_PRODUCTION
MAKE_TO_ORDER
```

El nombre, categoría o existencia momentánea del producto no sustituyen la política.

#### 14. `STOCK_ONLY`

`STOCK_ONLY` no activa producción.

Ante insuficiencia:

- el faltante permanece explícito;
- puede existir decisión logística posterior;
- no se crea una necesidad productiva por inferencia;
- no se invoca FOGO como fallback automático.

#### 15. `STOCK_THEN_PRODUCTION`

`STOCK_THEN_PRODUCTION` puede activar producción únicamente por el saldo faltante confirmado.

Debe preservarse cantidad cubierta por stock, cantidad abierta, versión de línea, política aplicada, unidad canónica, contexto territorial y causa del faltante.

No se produce nuevamente una cantidad ya satisfecha.

#### 16. `MAKE_TO_ORDER`

`MAKE_TO_ORDER` puede generar necesidad de producción conforme a la política vigente aunque exista stock cero.

No autoriza omitir calidad, inventar receta, asumir capacidad, crear lote sin permiso, considerar listo un resultado no liberado ni alterar la cantidad solicitada.

#### 17. Fallos de resolución

La activación falla cerrado cuando exista:

```text
PRODUCTION_POLICY_NOT_RESOLVED
PRODUCTION_UOM_NOT_RESOLVED
PRODUCTION_CONFIGURATION_INCOMPLETE
PRODUCTION_LINK_UNAVAILABLE
```

Una lectura no concluyente no se transforma en autorización.

#### 18. Identidad de la necesidad productiva

La necesidad correlacionada conserva identidad estable:

```text
production_requirement_id
remission_id
remission_line_id
remission_line_revision
requirement_revision
fulfillment_policy_id
fulfillment_policy_version
source_shortage_ref
correlation_id
causation_id
idempotency_key
```

Esta identidad vincula procesos. No transfiere propiedad empresarial.

#### 19. Inmutabilidad de revisiones

Una revisión de necesidad no se sobrescribe.

Un aumento, reducción, cancelación, reapertura o reasignación crea una transición o revisión posterior. La historia original permanece consultable y conciliable.

#### 20. Idempotencia de la necesidad

```text
MISMA idempotency_key
+ MISMO CONTENIDO
→ MISMO RESULTADO
```

```text
MISMA idempotency_key
+ CONTENIDO DIFERENTE
→ CONFLICTO
```

Un reintento técnico no crea una segunda necesidad.

#### 21. Relación con línea de remisión

Una necesidad no se vincula simultáneamente a dos líneas distintas.

Una línea puede conservar varias revisiones o asignaciones productivas, pero su suma debe reconciliarse contra la cantidad abierta de la revisión vigente.

No se oculta sobreasignación repartiendo cantidades entre múltiples vínculos.

#### 22. Datos que NEXO puede aportar

NEXO puede aportar como contexto de necesidad:

- remisión y línea;
- revisión;
- sede y área de origen;
- destino logístico;
- producto;
- presentación;
- unidad canónica;
- cantidad solicitada;
- cantidad cubierta por stock;
- cantidad abierta;
- fecha requerida;
- prioridad logística autorizada;
- política de cumplimiento;
- causa estructurada;
- correlación;
- idempotencia.

Estos datos describen la necesidad.

#### 23. Datos que NEXO no envía como autoridad productiva

NEXO no decide como autoridad:

- receta;
- versión de receta;
- rendimiento productivo definitivo;
- lote;
- orden de producción;
- secuencia;
- cantidad aceptada por FOGO;
- fecha prometida por FOGO;
- disponibilidad de materiales;
- capacidad productiva;
- disposición de calidad.

Esos hechos pertenecen a FOGO o a sus fuentes autorizadas.

#### 24. Decisión FOGO

Una necesidad entregada a FOGO no equivale a aprobación.

FOGO responde mediante una decisión versionada conforme al contrato `INT-PROD-005`.

Entre los resultados aprobados están:

```text
ACCEPTED
PARTIALLY_ACCEPTED
REJECTED
```

NEXO consume el resultado; no lo fabrica.

#### 25. Aceptación total

`ACCEPTED` vincula la cantidad aceptada con la necesidad y conserva el saldo pendiente de satisfacción.

No significa producción terminada, calidad liberada, stock ingresado, cantidad lista ni cantidad despachada.

#### 26. Aceptación parcial

`PARTIALLY_ACCEPTED` separa cantidad aceptada, cantidad no resuelta, versión de decisión y siguiente tratamiento.

La parte no aceptada no desaparece de la remisión.

#### 27. Rechazo productivo

`REJECTED` conserva el faltante NEXO y permite únicamente decisiones posteriores autorizadas.

No reduce la cantidad solicitada para hacer coincidir la remisión con la capacidad productiva.

#### 28. Plan y orden

La existencia de plan u orden FOGO vinculados permite seguimiento dentro del alcance autorizado.

No permite a NEXO modificar prioridad productiva, cambiar receta, reasignar lote, iniciar producción o cerrar producción.

#### 29. Ejecución y resultado

Un evento de producción en curso puede actualizar una proyección de seguimiento, pero no incrementa `ready_base_qty` ni crea stock disponible.

Un resultado reportado demuestra producción observada, no liberación de calidad.

La ejecución terminada sigue separada de calidad liberada, inventario ingresado, asignación NEXO, preparación y despacho.

#### 30. Calidad liberada

Solo la cantidad expresamente liberada por la autoridad productiva y de calidad aplicable puede avanzar hacia el handoff de inventario.

NEXO no decide la disposición de calidad. Una cantidad retenida, rechazada o pendiente no es asignable.

#### 31. Evento productivo autoritativo

Antes de consumir un evento productivo, NEXO valida según el contrato aplicable:

- definición y versión del evento;
- aplicación productora;
- aggregate y versión;
- actor o principal cuando corresponda;
- sede y área;
- correlación y causación;
- request e idempotency key;
- referencias de resultado y evidencia;
- estado compatible.

Un payload técnicamente válido pero sin autoridad empresarial permanece no consumible.

#### 32. Productor de eventos

FOGO emite los hechos productivos y de calidad que le pertenecen.

NEXO emite únicamente movimientos propios, asignaciones, estados derivados y conciliaciones de inventario o remisión.

NEXO no republica como propio un resultado productivo o de calidad.

#### 33. Handoff de producto liberado

El handoff hacia NEXO conserva como mínimo la semántica de:

```text
production_requirement_id
requirement_revision
remission_id
remission_line_id
product_id
canonical_uom
released_qty
batch_ref
quality_release_ref
ready_location_ref
event_id
event_version
correlation_id
causation_id
idempotency_key
```

Los nombres físicos pueden evolucionar. La semántica no.

#### 34. Lectura de lote reflejado en NEXO

`nexo.inventory.production_batches.view` permite consultar únicamente el lote reflejado en inventario dentro del alcance autorizado.

Ese recurso no es la definición administrativa del lote FOGO. La vista NEXO no expande acceso a receta, secreto productivo o capacidad de mutación.

#### 35. Asignación NEXO de salida liberada

NEXO puede asignar a una línea o fulfillment únicamente cantidad:

- liberada;
- correlacionada;
- del producto correcto;
- en unidad conciliable;
- no asignada previamente;
- todavía necesaria;
- territorialmente compatible;
- disponible en el handoff correspondiente.

La asignación se protege por la capacidad NEXO propietaria de la transición y los predicados del recurso.

#### 36. Mutación de preparación vinculada

Cuando la asignación forma parte de la preparación de la remisión, debe satisfacerse:

```text
nexo.inventory.remissions.prepare
+ ACTOR EFECTIVO
+ TURNO / CHECK-IN APLICABLES
+ SEDE ORIGEN
+ AREA PREPARADORA
+ FULFILLMENT
+ VERSIONES
+ SALIDA FOGO LIBERADA
+ CANTIDAD ABIERTA
```

Una lectura productiva no sustituye esta autorización.

#### 37. Acción nueva no catalogada

Si la implementación requiere una acción humana independiente para aprobar una necesidad productiva NEXO fuera de la preparación, 007 no inventa una clave técnica.

El comportamiento permanece fail-closed hasta que una tarea propietaria del catálogo defina o confirme la capacidad, modalidad, scope, matrices y pruebas aplicables.

#### 38. Salida a inventario

Cuando la salida productiva ingresa primero como inventario:

```text
FOGO LIBERA
→ NEXO REGISTRA EL EFECTO DE INVENTARIO
→ NEXO ASIGNA CANTIDAD A LA REMISION
```

Ingreso y asignación son hechos separados e idempotentes. No se crea un segundo stock al asignar.

#### 39. Cumplimiento directo

`DIRECT_ORDER_FULFILLMENT` conserva una frontera distinta del stock libre.

Debe demostrar producto, cantidad, lote, calidad liberada, ubicación o staging, transferencia de custodia aplicable, movimiento o receipt físico, correlación con la necesidad y asignación NEXO.

No puede saltar de FOGO a remisión recibida.

#### 40. Prohibiciones del cumplimiento directo

`DIRECT_ORDER_FULFILLMENT` no permite:

- omitir calidad;
- despachar directamente desde FOGO sin el handoff NEXO aplicable;
- usar salida no liberada;
- ocultar lote, UOM o cantidad;
- evitar movimiento o receipt;
- marcar recepción destino;
- cerrar la remisión por producción terminada.

#### 41. Cantidad máxima asignable

NEXO asigna como máximo:

```text
MIN(
  released_unassigned_qty,
  open_remission_qty,
  physically_available_qty_when_applicable
)
```

La cantidad excedente sigue la disposición aprobada fuera de esa línea.

#### 42. Producción parcial

La producción parcial conserva cantidad producida, cantidad liberada, cantidad asignada, cantidad preparada, cantidad pendiente, causa y siguiente responsable.

Una parcialidad no marca la línea como completamente satisfecha.

#### 43. Stock y producción simultáneos

En `STOCK_THEN_PRODUCTION` pueden coexistir cantidad cubierta desde stock, saldo vinculado a producción, producción parcial liberada y saldo todavía pendiente.

Cada fuente conserva identidad y evidencia. La suma se reconcilia contra la cantidad abierta.

#### 44. Sustitución

Una sustitución no se deriva automáticamente de una producción insuficiente.

Requiere acción autorizada, causa estructurada, producto original, sustituto, cantidad, UOM, equivalencia, aceptación cuando corresponda, versiones y trazabilidad.

La sustitución no reescribe una orden FOGO ya ejecutada.

#### 45. Cancelación y producción en curso

Cancelar una remisión no cancela producción automáticamente.

Antes de entregar la necesidad a FOGO puede cerrarse el vínculo NEXO sin efecto productivo.

Una necesidad ya entregada se cancela de forma idempotente y espera estado autoritativo.

Si FOGO ya aceptó o ejecuta, FOGO conserva autoridad para decidir detener, continuar o redestinar según su contrato.

#### 46. Resultado tardío

Si una salida productiva llega después de que la línea quedó satisfecha o cancelada:

- no se asigna automáticamente;
- se reconcilia identidad y versión;
- se deriva a disposición aprobada;
- se preserva el hecho productivo.

No se reabre la remisión por inferencia.

#### 47. Timeout y evento fuera de orden

Ante respuesta perdida:

```text
RECONCILIATION_REQUIRED
```

Antes de reenviar se consulta por identidad, versión e idempotency key.

Un evento fuera de orden no retrocede silenciosamente el estado; se compara versión, se conserva o rechaza conforme al contrato y se abre conciliación si no puede demostrarse una transición segura.

#### 48. Indisponibilidad

Si FOGO está indisponible, la necesidad permanece pendiente y no se inventa aceptación, rechazo, fecha ni cantidad lista.

Si NEXO está indisponible al liberar FOGO, el hecho productivo y el handoff permanecen pendientes sin duplicar publicación.

La indisponibilidad técnica no es una decisión empresarial.

#### 49. Segregación de acciones

Se evalúan separadamente:

- registrar necesidad;
- entregar necesidad;
- aceptar o rechazar;
- publicar plan u orden;
- crear lote;
- ejecutar producción;
- reportar resultado;
- decidir calidad;
- liberar salida;
- ingresar efecto NEXO;
- asignar a remisión;
- preparar;
- despachar;
- cancelar necesidad;
- sustituir;
- conciliar.

Una autorización en una fila no concede las demás.

#### 50. Prohibición de autoaprobación cruzada

Una misma acción no puede:

- aprobar producción y autoasignar salida;
- decidir calidad y registrar recepción logística;
- alterar cantidad solicitada para ocultar faltante;
- cerrar una diferencia sin receipt o causa;
- utilizar identidad técnica como actor humano.

#### 51. Identidad técnica no es actor humano

Un service role, job, webhook o identidad técnica puede transportar un evento autorizado.

No se registra como actor humano si no lo es.

La evidencia conserva principal técnico, actor efectivo cuando exista, aplicación productora, causación, correlación y autoridad de origen.

#### 52. Server-side y confianza cero en cliente

IDs enviados por UI o integración se consideran datos no confiables hasta resolverlos en servidor.

Incluye remisión, línea, necesidad, lote, orden, producto, sede, área, UOM, cantidades, ubicación, estado y versión.

La autorización se ejecuta contra recursos reales y estados vigentes.

#### 53. Frescura

Antes de cada mutación NEXO se revalida, según aplique:

- actor y rol;
- turno y check-in;
- permiso;
- sede y área;
- remisión y línea;
- fulfillment;
- revisión;
- política;
- necesidad;
- decisión FOGO;
- versión de evento;
- cantidad abierta y asignada;
- calidad;
- disponibilidad;
- denegaciones.

Una pantalla abierta no congela autoridad.

#### 54. Auditoría y evidencia

La trazabilidad debe permitir reconstruir:

```text
REMISION Y REVISION
→ LINEA Y CANTIDAD
→ POLITICA
→ STOCK Y FALTANTE
→ NECESIDAD Y REVISION
→ DECISION FOGO
→ PLAN / ORDEN / LOTE
→ RESULTADO
→ CALIDAD
→ SALIDA LIBERADA
→ EFECTO NEXO
→ ASIGNACION
→ PREPARACION
→ DESPACHO
→ RECEPCION
→ CONCILIACION
```

La evidencia conserva actor y principal, aplicación emisora, timestamps, versiones, cantidades, UOM, producto, sede, área, referencias productivas, calidad, movimiento, receipt, causa, reintentos, conflictos y compensaciones.

No replica recetas, fórmulas, credenciales o secretos innecesarios.

#### 55. Conciliación

La conciliación detecta al menos:

- necesidad sin decisión;
- decisión sin necesidad;
- revisión incompatible;
- aceptación sin orden;
- producción superior a aceptado;
- resultado sin calidad;
- liberación sin efecto NEXO;
- efecto NEXO duplicado;
- asignación duplicada;
- preparado superior a asignado;
- despacho superior a asignado;
- producción posterior a cancelación;
- estado avanzado sin evidencia.

La conciliación no borra historia.

#### 56. Efectos de inventario exactamente una vez

Todo efecto de inventario derivado del vínculo productivo usa un contrato correlacionado e idempotente.

No se permite:

```text
MISMO EVENTO FOGO
→ DOS MOVIMIENTOS NEXO
```

ni:

```text
UN MOVIMIENTO NEXO
→ SIN EVENTO / RECEIPT / CAUSA AUTORIZADA
```

#### 57. Compatibilidad con `NEXO-AUTH-006`

006 protege la preparación y exige que la rama productiva solo cuente cantidad liberada, correlacionada, no consumida previamente y disponible en el LOC aplicable.

007 protege la cadena que demuestra esa liberación y su asignación NEXO.

007 no reabre el contrato de picks, preparación o ready ya aprobado en 006.

#### 58. Frontera con `NEXO-AUTH-008`

007 puede entregar cantidad productiva liberada y autorizadamente asignada al carril logístico.

No puede crear shipment, confirmar salida, asignar custodio, cambiar a tránsito ni emitir un efecto propio de despacho.

Esos efectos pertenecen a `NEXO-AUTH-008`.

#### 59. AS-IS remoto de NEXO

El código NEXO inspeccionado ya conserva en fulfillments:

```text
supply_mode
production_execution_mode
ready_location_id
```

y puede proyectar información de paquetes o lotes productivos.

Esto constituye soporte parcial para enrutar preparación. No demuestra el contrato completo de necesidad productiva, decisión FOGO, calidad liberada, asignación y conciliación definido por `INT-PROD-005`.

#### 60. AS-IS remoto de FOGO

FOGO distingue actualmente modos de salida como:

```text
inventory_stock
sellable_stock
order_fulfillment
```

La superficie inspeccionada presenta `order_fulfillment` como flujo de pedido o entrega directa.

No se observó en esa frontera una correlación canónica integral con `production_requirement_id`, revisión de línea, revisión de necesidad y referencia de liberación de calidad.

Por tanto, el flujo existente no se declara equivalente al contrato de producción vinculada.

#### 61. Brechas AS-IS

La materialización futura debe cerrar sin reinterpretación silenciosa:

1. ausencia de identidad integral del vínculo NEXO–FOGO;
2. falta de demostración de decisión FOGO correlacionada por necesidad;
3. separación insuficientemente demostrada entre producción terminada y calidad liberada;
4. equivalencia no demostrada entre `order_fulfillment` y remisión NEXO;
5. falta de evidencia integral de receipt y conciliación cruzada;
6. riesgo de escrituras cruzadas si se usa una tabla compartida como autoridad de ambos dominios;
7. necesidad de garantizar efecto de inventario y asignación exactamente una vez.

Texto libre de faltante o un batch visible no cierran estas brechas.

#### 62. Materialización condicional

007 tiene topología:

```text
PER_IMPLEMENTATION_UNIT
```

y gate:

```text
POST_E5_PACKAGE
```

Además pertenece al grupo condicional:

```text
PRODUCTION_LINK_IMPLEMENTATION
```

La materialización solo aplica a unidades de un paquete cuyo alcance incorpore `INT-PROD-005` y requiera realmente producción vinculada.

#### 63. Condición no equivale a autorización

Que `PRODUCTION_LINK_IMPLEMENTATION` resulte aplicable no autoriza ejecutar 007.

Cada instancia física:

```text
NEXO-AUTH-007::<implementation_unit_id>
```

requiere package propietario, unidad asignada, `E5-GATE-008::<package_id> = PASS`, dependencias técnicas disponibles, autorización física explícita y alcance exacto de consumidores, datos, contratos y rollback.

#### 64. Estrategia de materialización futura

```text
KEEP NEXO / FOGO OWNERSHIP SEPARATE
+
DO NOT INVENT A NEW PERMISSION
+
AUTHORIZE NEXO MUTATIONS WITH EXISTING CANONICAL CAPABILITIES
+
AUTHORIZE FOGO MUTATIONS IN FOGO
+
VERSION PRODUCTION REQUIREMENT
+
CORRELATE EVERY HANDOFF
+
VALIDATE POLICY + UOM + OPEN QTY
+
CONSUME ONLY AUTHORITATIVE FOGO DECISIONS
+
SEPARATE FINISHED FROM QUALITY_RELEASED
+
APPLY NEXO INVENTORY EFFECT EXACTLY ONCE
+
ASSIGN RELEASED QTY AT MOST ONCE
+
PRESERVE PARTIALS AND CANCELLATIONS
+
RECONCILE TIMEOUTS AND LATE RESULTS
+
AUDIT BOTH SIDES
```

No presupone nombres físicos nuevos de tabla, RPC, función o endpoint.

#### 65. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- el vínculo NEXO–FOGO ya posee contrato aprobado;
- planificación y ejecución productivas ya poseen cobertura FOGO;
- propiedad única y ausencia de doble fuente ya poseen cobertura de integración;
- efectos de inventario exactamente una vez ya poseen cobertura de integración;
- producción, calidad, inventario y cumplimiento como hechos distintos ya poseen cobertura de integración;
- la rama productiva de preparación ya posee cobertura NEXO específica;
- atomicidad, idempotencia, receipt y recuperación ya poseen cobertura NEXO;
- el handoff de preparación a despacho ya posee cobertura NEXO;
- faltantes, reemplazos, cantidades, receipts y obligaciones correlacionadas ya poseen cobertura NEXO.

007 especializa esas obligaciones en la frontera de autorización de producción vinculada sin introducir una obligación verificable nueva.

#### 66. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-FOGO-001`;
- `TREQ-FOGO-003`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-011`;
- `TREQ-INTEGRATION-013`;
- `TREQ-INTEGRATION-067`;
- `TREQ-INTEGRATION-102`;
- `TREQ-NEXO-006`;
- `TREQ-NEXO-010`;
- `TREQ-NEXO-011`;
- `TREQ-NEXO-105`;
- `TREQ-NEXO-108`;
- `TREQ-NEXO-109`;
- `TREQ-NEXO-110`;
- `TREQ-NEXO-269`.

Estas referencias documentan cobertura existente y no representan una modificación del registro.

#### 67. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificó `main` vigente de `vento-shell`, cierre de `NEXO-AUTH-006`, continuidad hacia `NEXO-AUTH-007`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, condición `PRODUCTION_LINK_IMPLEMENTATION`, `INT-PROD-005`, catálogo y contratos de recursos, matrices de roles, 04A vigente, `NEXO-UX-010` y AS-IS actual de `vento-nexo` y `vento-fogo` |
| OPERATIVA | NOT_APPLICABLE | no se crea necesidad productiva, lote, decisión, liberación, asignación, movimiento, preparación ni despacho real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-007::<implementation_unit_id>` |

#### 68. Criterios de aceptación

- [x] NEXO, FOGO y SHELL conservan ownership separado;
- [x] la remisión no crea producción aprobada;
- [x] no se inventa un permiso NEXO nuevo;
- [x] `nexo.inventory.production_batches.view` permanece solo lectura;
- [x] las capacidades FOGO permanecen en FOGO;
- [x] lectura administrativa o de supervisión no concede mutación;
- [x] `STOCK_ONLY` no activa producción;
- [x] `STOCK_THEN_PRODUCTION` activa únicamente el saldo confirmado;
- [x] `MAKE_TO_ORDER` sigue la política vigente;
- [x] fallos de política, UOM, configuración o lectura fallan cerrado;
- [x] la necesidad posee identidad y revisión estables;
- [x] reintentos no duplican necesidad;
- [x] NEXO no envía receta, lote, secuencia o capacidad como autoridad;
- [x] FOGO decide aceptación, planificación, ejecución, calidad y liberación;
- [x] producción en curso no incrementa ready;
- [x] producción terminada no equivale a calidad liberada;
- [x] calidad liberada no equivale a stock ingresado;
- [x] stock ingresado no equivale a cantidad asignada;
- [x] asignación no equivale a preparación;
- [x] preparación no equivale a despacho;
- [x] FOGO es productor de sus eventos y NEXO de sus efectos derivados;
- [x] el handoff conserva correlación, causación, versión e idempotencia;
- [x] la lectura NEXO de lotes no expande acceso a FOGO;
- [x] una acción material nueva sin permiso vigente queda denegada;
- [x] ingreso de inventario y asignación son hechos separados;
- [x] cumplimiento directo no evita calidad, custodia, movimiento o receipt;
- [x] cantidad asignada no supera salida liberada ni cantidad abierta;
- [x] producción parcial conserva saldo;
- [x] stock y producción pueden coexistir sin doble conteo;
- [x] sustitución exige autoridad y causa;
- [x] cancelar remisión no cancela producción automáticamente;
- [x] resultados tardíos se reconcilian;
- [x] timeout se reconcilia antes de reintentar;
- [x] indisponibilidad no fabrica decisiones;
- [x] cada acción mantiene autorización separada;
- [x] identidad técnica no sustituye actor humano;
- [x] entradas de cliente no son autoridad;
- [x] frescura se revalida antes de mutar;
- [x] auditoría reconstruye la cadena completa;
- [x] conciliación detecta efectos faltantes o duplicados;
- [x] inventario derivado se aplica exactamente una vez;
- [x] 007 consume la frontera de 006 sin reabrir preparación;
- [x] 008 conserva despacho;
- [x] el AS-IS no se declara equivalente al contrato futuro;
- [x] materialización conserva `PER_IMPLEMENTATION_UNIT`;
- [x] materialización conserva `POST_E5_PACKAGE`;
- [x] materialización física permanece condicional a `INT-PROD-005`;
- [x] no se crea ni modifica requisito de prueba;
- [x] no se autoriza cambio físico.

#### 69. Límites

Esta tarea no:

- modifica código NEXO;
- modifica código FOGO;
- modifica Server Actions;
- modifica componentes;
- crea permisos;
- cambia matrices de rol;
- cambia modalidades;
- cambia scopes;
- crea RPC;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- crea una necesidad productiva real;
- crea una orden real;
- crea un lote real;
- ejecuta producción;
- decide calidad;
- libera producto;
- mueve inventario;
- asigna cantidad real;
- prepara una remisión real;
- despacha;
- recibe;
- modifica recetas;
- modifica rutas productivas;
- altera datos históricos;
- habilita escrituras cruzadas;
- activa integración externa;
- despliega;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 70. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-006 — Proteger preparación`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-007 — Proteger producción vinculada`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-008 — Proteger despacho`
### ✅ NEXO-AUTH-008 — Proteger despacho

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-007 — Proteger producción vinculada
**Tarea siguiente:** NEXO-AUTH-009 — Proteger tránsito
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger el despacho mediante `nexo.inventory.remissions.dispatch`, autorizar la carga y salida exactas, transferir custodia de forma explícita y producir un handoff inmutable al tránsito sin mezclar preparación, despacho, movimiento de inventario, recorrido ni recepción
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-008::<implementation_unit_id>` después de que `DELIV-PKG-025::<package_id>` asigne la unidad, el paquete propietario supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 0. Reconciliacion contractual vinculante de autorizacion

**CorrecciÃ³n aplicable:** `NEXO-AUTH-008::CORR-001`

Esta correcciÃ³n restaura conformidad con la secuencia contractual posterior `AUTH-CAT-022` -> `AUTH-CAT-023` -> `AUTH-CAT-024`, el catÃ¡logo congelado `vento.authorization@1.0.0` y `operational-role-grants@1.0.0`. No crea capacidades nuevas y no reescribe el significado empresarial del despacho.

Para autorizaciÃ³n, toda referencia de esta tarea a `nexo.inventory.remissions.dispatch` como `PermissionKey` activa queda sustituida por el contrato atÃ³mico vigente:

```text
ORIGEN PREPARA
nexo.inventory.remissions.prepare
        â†“
ACTOR LOGÃSTICO ACEPTA CUSTODIA
nexo.inventory.remissions.accept_custody
        â†“
DISPATCH_CONFIRMED
hecho empresarial derivado y auditable; NO es PermissionKey
        â†“
ACTOR LOGÃSTICO INICIA TRÃNSITO
nexo.inventory.remissions.start_transit
        â†“
ACTOR LOGÃSTICO REGISTRA HANDOFF EN DESTINO
nexo.inventory.remissions.deliver
        â†“
DESTINO RECIBE
nexo.inventory.remissions.receive
```

Reglas vinculantes de reconciliaciÃ³n:

1. `nexo.inventory.remissions.dispatch` no pertenece al conjunto activo de 140 `PermissionKey`; quedÃ³ sustituido contractualmente y no admite nuevas asignaciones.
2. `nexo.inventory.remissions.transit` y `nexo.transit.view` son cÃ³digos legacy y tampoco autorizan acciones runtime.
3. No existe alias uno-a-muchos desde `dispatch` hacia sus reemplazos.
4. Las acciones de preparaciÃ³n, carga, verificaciÃ³n, sello y entrega desde origen conservan la autoridad exacta que corresponda al lado de preparaciÃ³n; esta tarea no las convierte en una concesiÃ³n del conductor.
5. `nexo.inventory.remissions.accept_custody` autoriza exclusivamente la aceptaciÃ³n de custodia por el actor logÃ­stico asignado sobre una remisiÃ³n preparada, asignada y versionada.
6. `DISPATCH_CONFIRMED` se conserva como frontera empresarial y contable del despacho, no como permiso. Solo puede materializarse cuando las precondiciones de origen y la aceptaciÃ³n de custodia sean vÃ¡lidas; sus efectos de `shipped`, `transfer_out`, paquetes, receipt y outbox permanecen atÃ³micos e idempotentes.
7. `DISPATCH_CONFIRMED` no inicia por sÃ­ mismo el journey ni concede progreso de ruta.
8. `TRANSIT_STARTED` pertenece a `NEXO-AUTH-009` y exige `nexo.inventory.remissions.start_transit`; ese comando no vuelve a descontar inventario ni reconstruye el receipt de despacho.
9. El handoff fÃ­sico en destino exige `nexo.inventory.remissions.deliver`; la recepciÃ³n sigue separada bajo `nexo.inventory.remissions.receive`.
10. `conductor_logistica` conserva las concesiones atÃ³micas `accept_custody`, `start_transit` y `deliver` bajo sus contextos vigentes; dentro de esta tarea solo se consume `accept_custody` para la frontera de custodia y despacho.
11. Toda frase posterior de esta tarea que denomine `dispatch` como permiso exacto se interpreta conforme a esta reconciliaciÃ³n; las invariantes de cantidades, sello, custodia, idempotencia, inventario, auditorÃ­a y handoff permanecen vigentes.
12. Una acciÃ³n de trÃ¡nsito para la que el catÃ¡logo activo no tenga una clave mutadora exacta permanece `DEFAULT_DENY`; ninguna clave de lectura, nombre de rol, estado `in_transit` o permiso vecino puede ampliarla.

#### 1. Propósito

Proteger de extremo a extremo la autorización de despacho de remisiones para que una carga solo pueda salir cuando un actor humano autorizado opere sobre el shipment exacto, vigente, versionado, asignado y físicamente validado, satisfaga el contexto operacional aplicable y confirme mediante una frontera server-side atómica e idempotente la salida real, los efectos de inventario, la custodia y el handoff al tránsito.

La decisión objetivo es:

```text
ACTOR EFECTIVO
+ TURNO VIGENTE
+ CHECK-IN ACTIVO CUANDO APLIQUE
+ ROL OPERATIVO COMPATIBLE
+ PERMISO nexo.inventory.remissions.dispatch
+ SEDE ORIGEN EXACTA
+ SHIPMENT ELEGIBLE
+ FULFILLMENTS Y CANTIDADES VIGENTES
+ CARGA FISICA VERIFICADA
+ SELLO VIGENTE
+ ASIGNACION LOGISTICA VIGENTE
+ VEHICULO COMPATIBLE
+ CUSTODIA ACEPTADA
+ VERSIONES Y FINGERPRINT ESPERADOS
+ DENEGACIONES AUSENTES
→ DESPACHO AUTORIZABLE
```

La autenticación, una pantalla visible, la selección de una sede, un nombre de rol, un shipment existente o un estado visual no sustituyen esta decisión.

#### 2. Frontera empresarial

Despachar no equivale a preparar ni a ejecutar el tránsito completo.

La frontera canónica es:

```text
PREPARADO != CARGADO
CARGADO != VALIDADO
VALIDADO != SELLADO
SELLADO != CUSTODIA ACEPTADA
CUSTODIA ACEPTADA != DESPACHO CONFIRMADO
DESPACHO CONFIRMADO != PROGRESO DE TRANSITO
DESPACHO CONFIRMADO != RECEPCION
```

El despacho consume cantidad lista y produce una salida física autoritativa con inventario y custodia reconciliados. El tránsito posterior conserva su propio contrato y ownership.

#### 3. Capacidad protegida exacta

La identidad canónica única es:

```text
nexo.inventory.remissions.dispatch
```

No se crea otra capacidad para:

- abrir la vista de despacho;
- seleccionar cargas;
- crear o consultar un shipment;
- cargar físicamente;
- sellar;
- aceptar custodia;
- confirmar salida;
- publicar el efecto de inventario;
- entregar el handoff al tránsito.

Todas esas operaciones consumen la misma capacidad empresarial cuando constituyen parte del despacho y agregan predicados de recurso, estado, territorio y etapa.

#### 4. Modalidad `OPERATIONAL_ONLY`

La capacidad conserva:

```text
authorization_requirement = OPERATIONAL_ONLY
```

Por tanto:

```text
CARRIL BASE
→ NO AUTORIZA

CARRIL OPERATIVO COMPLETO
→ UNICO CAMINO AUTORIZANTE
```

Una concesión administrativa, un perfil privilegiado, una simulación o una vista multisede no sustituyen el carril operativo.

#### 5. Normalización de códigos legacy

Los códigos legacy:

```text
nexo.inventory.remissions.transit
nexo.transit.view
```

no son capacidades alternativas de despacho.

La normalización aprobada converge en:

```text
nexo.inventory.remissions.dispatch
```

El término `transit` describe un estado o una etapa posterior y no concede autoridad para confirmar la salida. La presencia de código legacy debe tratarse como deuda de migración, no como permiso equivalente que pueda coexistir indefinidamente con el código canónico.

#### 6. Prerrequisito `T+C`

El despacho exige:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO CUANDO CORRESPONDA
```

Ambos deben corresponder al actor efectivo y al contexto desde el cual se ejecuta la acción. La ausencia, expiración, sustitución o cierre de cualquiera de los prerrequisitos aplicables produce denegación antes de confirmar efectos empresariales.

#### 7. Sede y área

El despacho es una capacidad logística de nivel sede y segmento de recorrido. No exige universalmente un área interna activa.

Un `conductor_logistica` puede operar con área interna ausente cuando:

- el turno y check-in son válidos;
- la sede de origen está resuelta;
- el shipment pertenece al origen autorizado;
- la asignación logística pertenece al actor;
- el vehículo y el recurso son compatibles;
- la autoridad territorial se limita al origen y segmento asignado.

La ausencia de área no amplía el acceso a inventario general ni a otros shipments.

#### 8. Scope `REM-ROUTE`

El perfil de alcance es:

```text
REM-ROUTE
```

Autoriza exclusivamente sobre:

- la sede origen exacta;
- la remisión o shipment relacionado;
- los fulfillments asignados a esa carga;
- el segmento logístico asignado;
- el vehículo y custodio previstos cuando correspondan.

El cruce entre sedes puede existir por la operación logística, pero la autoridad mutadora de despacho permanece en el origen y en el shipment exacto. No concede recepción en destino.

#### 9. Contrato de recurso

El recurso empresarial protegido conserva tipo:

```text
REMISSION
```

con selector equivalente a:

```text
remission_id + asignacion / confirmacion logistica
```

La materialización puede utilizar `shipment_id` y fulfillments relacionados para ejecutar el despacho físico, pero esa identidad técnica no crea autoridad por sí sola.

El territorio contractual del recurso es:

```text
ORIGIN_ROUTE
```

Esto limita la mutación a la sede de origen y al segmento logístico asignado; no concede autoridad sobre recepción en destino ni sobre rutas ajenas.

La relación autorizante es:

```text
RESPONSABILIDAD DE DESPACHO / TRANSPORTE
```

con estado despachable, transición atómica e idempotente y auditoría reforzada.

#### 10. Universo de roles vigente

El universo evaluado conserva diecinueve roles canónicos:

```text
ROLES BASE: 7
ROLES OPERATIVOS: 12
TOTAL: 19
```

Resultado para `nexo.inventory.remissions.dispatch`:

```text
ASIGNAR OPERATIVO: 1
NO ASIGNAR: 18
```

La única concesión ordinaria vigente pertenece a:

```text
conductor_logistica
```

Esta tarea no modifica la matriz.

#### 11. Decisión para `conductor_logistica`

`conductor_logistica` recibe `nexo.inventory.remissions.dispatch` bajo:

```text
CTX-DRV-DISPATCH
```

El contrato comprende aceptación explícita de custodia y confirmación de salida únicamente sobre una remisión preparada, cargada, validada y asignada al conductor.

La concesión no permite:

- modificar cantidades solicitadas;
- preparar;
- alterar picks;
- cambiar producto o unidad;
- recibir en destino;
- cancelar;
- aprobar diferencias;
- operar shipments ajenos;
- sustituir conductor o vehículo por decisión unilateral.

#### 12. Roles que permanecen sin despacho

No reciben `dispatch` por sus matrices:

- propietario;
- gerente_general;
- gerente;
- supervisor;
- auxiliar_administrativa;
- contador;
- marketing;
- cajero_satelite;
- barista_satelite;
- cocinero_satelite;
- servicio_salon;
- mostrador_satelite;
- operador_integral_satelite;
- produccion_cocina;
- produccion_panaderia;
- produccion_reposteria;
- bodeguero;
- gerencia_operativa.

Preparar, coordinar, administrar, producir o recibir no se convierten en autoridad de despacho.

#### 13. Prohibición de bypass

No autorizan despacho:

```text
employees.role
role override administrativo
propietario
gerente_general
gerente
supervisor
gerencia_operativa
bodeguero
nexo.access
remissions.view
all_sites
nexo.inventory.remissions.transit
nexo.transit.view
seleccion de sede
URL
boton visible
shipment_id recibido del cliente
estado in_transit
```

Si una misma persona debe despachar físicamente, debe asumir legítimamente el rol operativo autorizado y satisfacer el contexto completo.

#### 14. Unidad autorizable

La mutación final se autoriza sobre un shipment exacto y versionado, vinculado a sus remisiones, líneas y fulfillments.

El servidor debe resolver como mínimo la semántica de:

```text
shipment
shipment_version
origin_site
destination_site
fulfillment allocations
ready quantities
allocated quantities
loaded quantities
manifest fingerprint
seal
assigned custodian
assigned vehicle
expected versions
```

Los nombres físicos concretos podrán evolucionar durante la materialización. La semántica no.

#### 15. Admisión desde preparación

Despacho consume exclusivamente cantidad lista y trazable entregada por preparación.

El handoff de entrada debe demostrar por fulfillment:

- cantidad `ready`;
- cantidad ya `allocated`;
- saldo listo no asignado;
- versiones;
- origen y destino;
- staging o ubicación aplicable;
- UOM;
- lote, paquete o evidencia cuando corresponda;
- excepciones abiertas.

Preparación no puede escribir cantidad enviada, crear una salida real, descontar inventario, asignar custodia ni afirmar tránsito.

#### 16. Invariante de asignación

La disponibilidad para asignar se conserva como:

```text
available_to_allocate = ready_base_qty - allocated_base_qty
```

Debe cumplirse:

```text
available_to_allocate > 0
```

para una nueva asignación activa.

La suma de líneas activas de shipment por fulfillment debe reconciliarse con `allocated_base_qty` y nunca superar `ready_base_qty`.

#### 17. División y consolidación

Un fulfillment puede dividirse entre varios shipments cuando exista saldo listo y la trazabilidad se conserve.

Un shipment puede consolidar varias solicitudes únicamente cuando:

- el origen es único;
- el destino es único;
- cada línea conserva `request_item_id` y `fulfillment_id`;
- no existe sobreasignación;
- la mezcla no rompe lote, UOM, calidad, cadena de frío, empaque o restricciones de transporte.

La consolidación nunca elimina las identidades de origen.

#### 18. Asignación concurrente

La asignación debe controlar concurrencia mediante versiones, bloqueos o un mecanismo equivalente que impida:

- reservar el mismo saldo en dos shipments;
- superar cantidad lista;
- reusar una línea ya despachada;
- mezclar destinos incompatibles;
- liberar una asignación después del despacho sin compensación.

Un cliente con estado obsoleto no puede forzar éxito.

#### 19. Carga física

La carga debe reconciliar cada línea del shipment con la evidencia física disponible:

- unidad preparada;
- pick o fuente autorizada;
- producto;
- UOM;
- cantidad base;
- conteo auxiliar cuando aplique;
- lote;
- liberación de calidad;
- paquete productivo cuando exista;
- LOC, posición o staging aplicables.

Seleccionar una línea no equivale a cargarla.

#### 20. Cantidad real de despacho

Cuando la política exija medición real al despacho, la cantidad observada debe revalidarse contra:

- cantidad lista;
- cantidad asignada;
- modalidad de medición;
- tolerancia vigente;
- UOM y conversión;
- evidencia física.

Una medición diferente no puede sobrescribir silenciosamente lo preparado. La diferencia debe corregirse antes del sello o abrir una excepción estructurada.

#### 21. Carga validada

Una carga solo puede pasar a validada cuando:

- todas las líneas obligatorias fueron verificadas;
- las cantidades reconciliaron;
- no existen faltantes bloqueantes;
- los lotes y paquetes corresponden;
- las restricciones de transporte se cumplen;
- el vehículo es compatible cuando ya está asignado;
- cualquier excepción no bloqueante está identificada.

La validación no produce salida de inventario.

#### 22. Sello

El sellado debe crear una identidad versionada que inmovilice:

- manifiesto;
- fingerprint de carga;
- evidencia;
- vehículo previsto;
- custodio previsto;
- versión de shipment.

El sello no descuenta inventario ni inicia tránsito.

#### 23. Reapertura anterior al despacho

Una reapertura posterior al sello y anterior al despacho debe:

- conservar el sello histórico;
- invalidar el fingerprint anterior;
- invalidar cualquier aceptación de custodia asociada a la versión reabierta;
- exigir motivo y autoridad;
- incrementar versión;
- devolver la carga a una etapa verificable.

No se edita un shipment sellado como si nunca hubiera sido sellado.

#### 24. Custodia

La transferencia de custodia requiere declaraciones separadas de:

```text
ENTREGA DESDE EL ORIGEN
+
ACEPTACION O RECHAZO DEL CUSTODIO
```

Debe conservar shipment, versión, sello, vehículo, actor de origen, custodio, momento y evidencia.

Una asignación administrativa de conductor no equivale a aceptación de custodia.

#### 25. Vehículo y asignación logística

Antes de confirmar despacho deben revalidarse, cuando correspondan:

- conductor asignado;
- vigencia de asignación;
- vehículo asignado;
- disponibilidad;
- capacidad;
- condición;
- documentos y bloqueos;
- compatibilidad con la carga;
- conflictos con otro trabajo activo.

La presencia de una placa, etiqueta o vehículo visible no concede permiso.

#### 26. Punto autoritativo de salida

La única frontera que puede afirmar salida física es:

```text
DISPATCH_CONFIRMED
```

Antes de ese hecho:

```text
NO incrementar cantidad enviada
NO crear transfer_out
NO consumir paquete productivo
NO afirmar salida real
NO afirmar progreso de transito
```

El despacho confirmado constituye el punto de compromiso del shipment y habilita el handoff al carril de tránsito.

#### 27. Efecto de inventario

El efecto de inventario pertenece al mismo comando autoritativo de despacho.

La confirmación debe evitar que existan estados como:

```text
SHIPMENT DESPACHADO SIN SALIDA DE INVENTARIO
SALIDA DE INVENTARIO SIN SHIPMENT DESPACHADO
DOBLE transfer_out
CANTIDAD ENVIADA SIN MOVIMIENTO CORRELACIONADO
```

No se permite un escritor separado que publique la salida de forma eventual sin una estrategia transaccional o compensatoria aprobada.

#### 28. Cantidad enviada

`shipped` representa cantidad efectivamente despachada, no cantidad preparada ni seleccionada.

La regla es:

```text
READY
→ disponible para asignacion

ALLOCATED
→ comprometido a shipment, todavia no enviado

DISPATCH_CONFIRMED
→ cantidad efectivamente enviada
```

Copiar `prepared_quantity` a `shipped_quantity` durante preparación está prohibido.

#### 29. Paquetes productivos

Cuando una línea se apoya en un paquete productivo, su consumo logístico solo puede confirmarse en el mismo punto autoritativo de despacho y con correlación exacta.

Un paquete:

- preparado;
- liberado;
- asignado;
- cargado;
- sellado;

no se considera enviado antes de `DISPATCH_CONFIRMED`.

#### 30. Transacción de despacho

El comando final debe revalidar y comprometer conjuntamente, según aplique:

- actor y permiso;
- shipment y versión;
- sello;
- custodia;
- fulfillments;
- asignaciones;
- picks o unidades preparadas;
- paquetes;
- stock;
- cantidades enviadas;
- movimientos;
- receipt;
- outbox.

Cualquier fallo bloqueante revierte el conjunto completo.

#### 31. Validaciones de despacho

El contrato reutiliza las treinta y cuatro validaciones `DSP-VAL-001` a `DSP-VAL-034` definidas por el flujo de despacho aprobado.

La implementación no puede sustituir ese conjunto por una única comprobación de estado o sesión.

Cada validación conserva el momento definido por el contrato de experiencia y debe ejecutarse nuevamente donde el cambio de estado, versión o actor pueda volver obsoleta una decisión anterior.

#### 32. Intención e idempotencia

La confirmación final utiliza una identidad estable equivalente a:

```text
dispatch_intent_id
```

junto con versiones esperadas y fingerprint de carga.

Reglas:

```text
MISMA INTENCION + MISMO PAYLOAD
→ MISMO RECEIPT

MISMA INTENCION + PAYLOAD DISTINTO
→ CONFLICTO

TIMEOUT / DESCONEXION
→ RECONCILIAR POR INTENCION ANTES DE REINTENTAR
```

Un reintento nunca crea un segundo despacho.

#### 33. Receipt

El receipt de despacho debe ser persistente e inmutable y permitir demostrar:

- qué se despachó;
- desde dónde;
- hacia dónde;
- qué shipment y versión;
- qué actor confirmó;
- qué custodio aceptó;
- qué sello y vehículo aplicaron;
- qué cantidades fueron enviadas;
- qué movimientos fueron publicados;
- qué fulfillments resultaron afectados;
- qué paquetes o lotes quedaron correlacionados;
- qué excepciones no bloqueantes permanecieron abiertas.

La interfaz no es la fuente del receipt.

#### 34. Resultado desconocido

Un timeout, pérdida de conectividad o respuesta incompleta después de enviar la intención se clasifica como resultado desconocido, no como fallo seguro ni como éxito inferido.

Antes de habilitar otra confirmación debe consultarse el estado de la intención y recuperar el receipt si la transacción ya fue aplicada.

#### 35. Excepciones estructuradas

Deben modelarse de forma estructurada, como mínimo, las familias ya aprobadas para:

- faltante de carga;
- sobrante;
- unidad no encontrada;
- daño;
- quality hold;
- vehículo incompatible;
- ruptura de sello;
- rechazo de custodia;
- cambio de stock;
- resultado desconocido.

Cada excepción conserva etapa, cantidad afectada cuando aplique, evidencia, responsable, plazo, estado y resolución.

#### 36. Diferencias antes del sello

Antes del sello puede liberarse o corregirse una asignación mediante una transición versionada y auditable, siempre que no oculte el hecho observado.

No se permite reducir silenciosamente la carga hasta obtener un estado aparentemente válido.

#### 37. Diferencias después del sello

Después del sello y antes del despacho, una diferencia que altere contenido, cantidad, vehículo o custodia exige reapertura formal.

Modificar el manifiesto sin invalidar sello, fingerprint y aceptación de custodia está prohibido.

#### 38. Correcciones posteriores al despacho

Después de `DISPATCH_CONFIRMED`:

- el receipt no se edita;
- la cantidad original no se sobrescribe;
- el movimiento original no se elimina para cuadrar saldos;
- cualquier corrección usa excepción, decisión autorizada y efecto compensatorio cuando corresponda.

El hecho despachado permanece auditable.

#### 39. Handoff a tránsito

El despacho produce un handoff versionado e inmutable que contiene como mínimo:

- shipment;
- receipt de despacho;
- sello;
- custodia;
- vehículo;
- cantidades efectivamente despachadas;
- movimientos de inventario;
- efectos sobre fulfillments;
- referencias de paquetes y lotes;
- excepciones no bloqueantes;
- versión del handoff.

El carril de tránsito consume ese resultado y no lo reconstruye.

#### 40. Límite con `NEXO-AUTH-009`

`NEXO-AUTH-008` termina cuando el despacho queda confirmado y existe un handoff válido para tránsito.

No autoriza:

- iniciar o repetir un journey;
- registrar progreso de recorrido;
- cambiar la siguiente parada;
- afirmar llegada;
- registrar geolocalización como autoridad;
- completar una parada;
- resolver una entrega fallida;
- afirmar recepción.

Esas decisiones pertenecen al contrato de tránsito y tareas posteriores.

#### 41. Límite con preparación

`NEXO-AUTH-006` conserva ownership sobre:

- picks;
- cantidad lista;
- faltantes de preparación;
- evidencia de preparación;
- staging;
- liberación del handoff listo.

`NEXO-AUTH-008` no reabre ni reescribe la preparación para fabricar una carga despachable.

#### 42. Límite con producción vinculada

`NEXO-AUTH-007` conserva la frontera NEXO–FOGO y solo entrega cantidad productiva liberada y autorizadamente asignable al carril logístico.

`NEXO-AUTH-008` no puede:

- liberar calidad;
- cerrar una orden productiva;
- corregir rendimiento;
- consumir producción no liberada;
- reinterpretar `ready_location_id`.

#### 43. Límite con recepción

Despacho no confirma recepción en nombre del destino.

El conductor o despachador no puede convertir:

- salida;
- llegada;
- firma propia;
- fotografía;
- escaneo;
- geolocalización;

encima de una recepción válida.

La recepción conserva actor, autoridad, evidencia y efecto de inventario propios.

#### 44. Segregación de funciones

La matriz ordinaria separa:

```text
BODEGUERO
→ PREPARA

CONDUCTOR_LOGISTICA
→ DESPACHA / ACEPTA CUSTODIA

RECEPTOR AUTORIZADO
→ RECIBE
```

La misma persona no adquiere automáticamente las tres capacidades por estar físicamente presente en la operación.

Una excepción futura debe ser explícita, acotada, trazable y autorizada; no se deriva de conveniencia operativa.

#### 45. Dispositivo compartido

Un dispositivo compartido puede servir como superficie operativa, pero no es actor ni custodio.

Antes de una mutación debe existir una sesión humana atribuible y resolverse:

- actor efectivo;
- turno;
- contexto;
- permiso;
- recurso;
- versión.

Un PIN, terminal, tablet, vehículo o sesión técnica no sustituye la identidad empresarial.

#### 46. Simulación

La simulación de rol puede previsualizar decisión o interfaz sin producir efectos.

En simulación:

```text
NO crear shipment real
NO asignar saldo real
NO sellar
NO aceptar custodia
NO publicar transfer_out
NO confirmar despacho
NO producir receipt real
```

La simulación no mezcla permisos reales del usuario con el rol simulado para obtener una autorización mayor.

#### 47. UI no autoritativa

No autorizan por sí solos:

- botón habilitado;
- banner “listo para salir”;
- contador de cargas;
- enlace de conductor;
- shipment visible;
- estado local;
- dato oculto del formulario;
- sede de query string;
- fingerprint calculado solo en cliente.

Cada mutación revalida en servidor.

#### 48. Coherencia entre capas

La misma decisión de despacho debe ser coherente en:

- interfaz;
- Server Action o endpoint;
- servicio de dominio;
- RPC;
- grants;
- RLS;
- transacción de base de datos.

Una capa más permisiva que otra constituye una brecha de autorización, aunque la interfaz habitual no la exponga.

#### 49. Denegación y concurrencia

La frontera debe distinguir al menos semánticamente:

- falta de permiso;
- contexto operativo inválido;
- recurso ajeno;
- asignación ausente o vencida;
- estado no despachable;
- versión obsoleta;
- fingerprint divergente;
- sello inválido;
- custodia no aceptada;
- vehículo incompatible;
- conflicto de concurrencia;
- intención ya usada con payload distinto;
- resultado desconocido pendiente de reconciliación.

Ninguna de estas condiciones se convierte silenciosamente en éxito parcial.

#### 50. Auditoría

Cada transición material de despacho debe conservar actor, recurso, versión, sede, shipment, etapa, momento, decisión, resultado y correlación.

Cuando existan asignación, vehículo, sello, custodia, intent, receipt, movimiento o excepción, sus identidades deben quedar correlacionadas con el mismo hecho empresarial.

Una nota libre no sustituye campos estructurados de auditoría.

#### 51. AS-IS remoto: permiso legacy

El código inspeccionado de `vento-nexo` todavía utiliza:

```text
inventory.remissions.transit
```

como permiso operativo para superficies de fulfillment, detalle y conductor.

También existe una excepción de role override que concede el código legacy al rol `conductor` por nombre.

Esto contradice la capacidad canónica exacta de despacho y debe converger durante la futura materialización.

#### 52. AS-IS remoto: cola de conductor amplia

La superficie de conductor inspeccionada consulta shipments en estados:

```text
draft
loading
sealed
in_transit
```

sin demostrar en esa frontera una asignación exacta del shipment al actor, un vehículo asignado, custodia aceptada o el permiso canónico `dispatch`.

La futura materialización debe filtrar y autorizar por relación empresarial, no por autenticación y estado globales.

#### 53. AS-IS remoto: salida directa a `in_transit`

La acción inspeccionada de salida:

- exige usuario autenticado;
- lee `shipment_id`;
- acepta `draft`, `loading` o `sealed`;
- actualiza directamente el shipment a `in_transit`;
- registra `departed_at` y `updated_by`.

No demuestra en la misma frontera el contrato completo de permiso canónico, asignación, vehículo, sello válido, custodia bilateral, intención, receipt ni efectos atómicos de inventario.

Ese comportamiento no satisface el estado objetivo.

#### 54. AS-IS remoto: creación de shipment

La acción inspeccionada para crear cargas desde fulfillments conserva validaciones útiles de origen, destino, estado y saldo listo.

Sin embargo:

- usa el permiso legacy de tránsito para autorizar la creación;
- puede resolver permisos mediante el carril de role override en una vista multisede;
- invoca la creación con `dispatch_run_id` ausente;
- no materializa por sí sola el contrato completo de asignación de conductor, vehículo, sello y custodia.

La creación de una carga no equivale a despacho confirmado.

#### 55. AS-IS remoto: modelos coexistentes

El repositorio conserva simultáneamente:

- cantidades legacy `prepared_quantity` y `shipped_quantity`;
- fulfillments con cantidades `ready` y `allocated`;
- shipments físicos;
- flujo legacy que puede pasar remisiones de `preparing` a `in_transit`;
- flujo nuevo de shipment que también cambia directamente a `in_transit`.

La futura materialización debe converger en una sola verdad de despacho y evitar escritores dobles.

#### 56. Estrategia de materialización futura

Cada unidad física deberá volver a inventariar su commit base antes de modificar.

La estrategia objetivo es:

```text
USE CANONICAL DISPATCH PERMISSION
+ REMOVE LEGACY TRANSIT AUTHORIZATION FOR DISPATCH
+ AUTHORIZE EXACT SHIPMENT AND ASSIGNMENT
+ REVALIDATE OPERATIONAL CONTEXT
+ ALLOCATE ONLY READY BALANCE
+ VERIFY PHYSICAL LOAD
+ VERSION AND FREEZE MANIFEST
+ REQUIRE EXPLICIT CUSTODY ACCEPTANCE
+ CONFIRM DISPATCH ONCE
+ POST INVENTORY EFFECTS ATOMICALLY
+ PERSIST INTENT AND RECEIPT
+ EMIT IMMUTABLE TRANSIT HANDOFF
+ CONVERGE LEGACY AND SHIPMENT WRITERS
```

Este marcador no presupone nombres físicos nuevos de RPC, tabla, constraint o endpoint.

#### 57. Contrato de unidad física

La tarea global no modifica producto.

Cada futura instancia:

```text
NEXO-AUTH-008::<implementation_unit_id>
```

solo puede existir cuando:

1. `DELIV-PKG-025::<package_id>` haya asignado la unidad física;
2. el paquete propietario haya superado `E5-GATE-008::<package_id>`;
3. la instancia corresponda realmente a `NEXO-AUTH-008`;
4. sus dependencias técnicas estén disponibles;
5. exista autorización física explícita;
6. el alcance no invada preparación, producción, tránsito o recepción.

#### 58. Gate temporal

La tarea pertenece a:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto, el contrato documental no habilita cambios físicos antes de E5 ni crea una instancia global única.

#### 59. Supabase y ownership técnico

Cualquier migración, RLS, grant, función, RPC, trigger, tipo generado, configuración o cambio de Supabase que la futura materialización requiera pertenece a `vento-group-sas/vento-shell`.

La aplicación NEXO consume el contrato materializado; no crea migraciones VENTO fuera de `vento-shell`.

La implementación futura deberá contemplar compatibilidad, rollback y consumidores antes de retirar caminos legacy.

#### 60. Rollback de materialización futura

Cada unidad física deberá definir un rollback proporcional que preserve hechos ya confirmados.

Nunca se revierte un despacho real borrando:

- receipt;
- movimiento original;
- historial de sello;
- transferencia de custodia;
- evidencia.

Los cambios de código, schema o routing podrán revertirse mediante mecanismos técnicos compatibles; los hechos empresariales usan compensación y trazabilidad.

#### 61. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea especializa autorización, denegación y materialización sobre cobertura ya vigente de despacho sin crear una obligación verificable nueva.

#### 62. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-006`;
- `TREQ-NEXO-009`;
- `TREQ-NEXO-010`;
- `TREQ-NEXO-011`;
- `TREQ-NEXO-012`;
- `TREQ-NEXO-015`;
- `TREQ-NEXO-016`;
- `TREQ-NEXO-101`;
- `TREQ-NEXO-107`;
- `TREQ-NEXO-109`;
- `TREQ-NEXO-110`;
- `TREQ-NEXO-111`;
- `TREQ-NEXO-112`;
- `TREQ-NEXO-113`;
- `TREQ-NEXO-114`;
- `TREQ-NEXO-115`;
- `TREQ-NEXO-116`;
- `TREQ-NEXO-117`;
- `TREQ-NEXO-118`;
- `TREQ-NEXO-119`;
- `TREQ-NEXO-120`.

Estas referencias documentan cobertura heredada y no modifican filas del registro.

#### 63. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificaron `main` vigente de `vento-shell`, cierre de `NEXO-AUTH-007`, continuidad hacia `NEXO-AUTH-008`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, catálogo y normalización del permiso `dispatch`, matrices de 19 roles, contratos de alcance/recurso/contexto, cobertura 04A existente y AS-IS vigente de `vento-nexo` para shipment, fulfillment, conductor y permisos legacy |
| OPERATIVA | NOT_APPLICABLE | no se carga, sella, entrega custodia, despacha ni mueve inventario de una remisión real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-008::<implementation_unit_id>` |

#### 64. Criterios de aceptación

- [x] la capacidad protegida exacta es `nexo.inventory.remissions.dispatch`;
- [x] `nexo.inventory.remissions.transit` y `nexo.transit.view` permanecen clasificados como códigos legacy y no como autoridad paralela;
- [x] conserva modalidad `OPERATIONAL_ONLY`;
- [x] el carril base no autoriza;
- [x] exige turno vigente y check-in cuando corresponda;
- [x] usa scope `REM-ROUTE`;
- [x] el despacho puede operar a nivel sede y segmento sin exigir universalmente un área interna;
- [x] solo `conductor_logistica` recibe concesión entre los 19 roles vigentes;
- [x] bodeguero, gerencia operativa, producción, solicitantes y roles base permanecen sin `dispatch`;
- [x] role override, `all_sites`, URL, botón, autenticación o shipment visible no sustituyen el permiso exacto;
- [x] la unidad mutadora final es un shipment exacto, versionado y relacionado con fulfillments trazables;
- [x] el despacho consume únicamente saldo ready disponible;
- [x] la suma de asignaciones activas nunca supera `ready_base_qty`;
- [x] un fulfillment puede dividirse y un shipment consolidar solicitudes sin perder origen, destino ni identidad;
- [x] la carga física se reconcilia con producto, UOM, cantidad, lote, calidad y staging aplicables;
- [x] las diferencias no se resuelven mediante ajuste silencioso;
- [x] el sello inmoviliza manifiesto, fingerprint, evidencia, vehículo y custodio previsto;
- [x] una reapertura conserva historia e invalida sello, fingerprint y aceptación obsoletos;
- [x] la asignación de conductor no equivale a aceptación de custodia;
- [x] vehículo y asignación logística se revalidan antes del despacho;
- [x] `DISPATCH_CONFIRMED` es el único punto autoritativo de salida;
- [x] cantidad enviada no se copia desde cantidad preparada;
- [x] `transfer_out`, cantidad enviada, paquete productivo, shipment, receipt y outbox se comprometen de forma coherente;
- [x] la confirmación ejecuta el conjunto `DSP-VAL-001` a `DSP-VAL-034`;
- [x] existe intención idempotente y receipt persistente;
- [x] timeout o desconexión se reconcilian antes de reintentar;
- [x] excepciones de carga, sello, custodia, vehículo, stock y resultado desconocido son estructuradas;
- [x] después del despacho el hecho original no se sobrescribe;
- [x] el handoff a tránsito es versionado e inmutable;
- [x] tránsito no vuelve a descontar inventario ni reconstruye el receipt;
- [x] despacho no afirma progreso, llegada ni recepción;
- [x] la frontera con preparación conserva ownership en `NEXO-AUTH-006`;
- [x] la frontera productiva conserva ownership en `NEXO-AUTH-007` y FOGO;
- [x] el tránsito posterior permanece reservado a `NEXO-AUTH-009`;
- [x] la recepción conserva ownership posterior y no puede ser auto-confirmada por el conductor;
- [x] la futura implementación debe retirar la autorización legacy de tránsito para despacho y converger escritores dobles;
- [x] cualquier cambio Supabase futuro pertenece a `vento-shell`;
- [x] la topología permanece `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 65. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia matrices de rol;
- cambia modalidad de permisos;
- cambia scope;
- cambia prerrequisitos;
- prepara una remisión real;
- crea un shipment real;
- asigna un conductor real;
- asigna un vehículo real;
- carga físicamente;
- sella una carga real;
- transfiere custodia real;
- publica `transfer_out`;
- modifica inventario real;
- confirma un despacho real;
- inicia o ejecuta tránsito real;
- registra geolocalización;
- confirma llegada;
- recibe;
- resuelve diferencias reales;
- crea una instancia física;
- autoriza una instancia física;
- modifica el registro de requisitos.

#### 66. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-007 — Proteger producción vinculada`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-008 — Proteger despacho`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-009 — Proteger tránsito`
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
