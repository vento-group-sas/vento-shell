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
### [ ] NEXO-AUTH-002 — Corregir bypass administrativo de remisiones
### [ ] NEXO-AUTH-003 — Corregir inventory.remissions.all_sites
### [ ] NEXO-AUTH-004 — Proteger creación de solicitudes
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
