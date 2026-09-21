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
### ✅ NEXO-AUTH-009 — Proteger tránsito

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-008 — Proteger despacho
**Tarea siguiente:** NEXO-AUTH-010 — Proteger recepción
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger consultas y mutaciones del tránsito mediante PermissionKey activas exactas, custodia continua, journey y shipment asignados, estado y versión vigentes, intención idempotente y fronteras explícitas entre despacho, tránsito, entrega física y recepción
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-009::<implementation_unit_id>` después de la asignación física gobernada del paquete propietario y de la autorización explícita correspondiente
**Requisitos de prueba creados o modificados:** 0

---

#### 0. Autoridad contractual vigente

La autorización de tránsito consume exclusivamente el catálogo y los grants vigentes posteriores a `AUTH-CAT-022`, `AUTH-CAT-023`, `AUTH-CAT-024`, `AUTH-CAT-025` y `AUTH-RBAC-018::CORR-001`.

El universo vinculante es:

```text
PermissionKey activas: 140
grants operacionales totales: 240
grants vigentes de conductor_logistica: 16
```

Para esta tarea, las capacidades relevantes son:

```text
nexo.inventory.remissions.view           ACTIVA
nexo.inventory.remissions.accept_custody ACTIVA
nexo.inventory.remissions.start_transit  ACTIVA
nexo.inventory.remissions.deliver        ACTIVA
nexo.inventory.remissions.receive        ACTIVA
```

Los códigos siguientes no pertenecen al conjunto autorizante vigente:

```text
nexo.inventory.remissions.dispatch
nexo.inventory.remissions.transit
nexo.transit.view
```

No existe alias uno-a-muchos, fallback ni equivalencia implícita desde esos códigos legacy hacia una PermissionKey activa.

#### 1. Propósito

Proteger de extremo a extremo la autorización del tránsito de remisiones para que cada consulta o mutación se resuelva sobre el actor efectivo, sesión humana, contexto operacional, asignación logística, journey, vehículo, shipment, territorio, custodia, estado, versión y PermissionKey activa exacta de la acción, sin inferir autoridad desde una URL, un nombre de rol, una sede visible, un estado `in_transit`, una etiqueta de vehículo, una coordenada o una capacidad vecina.

La decisión general es:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ SESION HUMANA VIGENTE
+ TURNO Y CHECK-IN CUANDO APLIQUEN
+ DISPOSITIVO ATRIBUIDO CUANDO APLIQUE
+ ROL OPERATIVO COMPATIBLE
+ ASIGNACION LOGISTICA VIGENTE
+ JOURNEY EXACTO
+ VEHICULO COMPATIBLE
+ SHIPMENT RELACIONADO
+ TERRITORIO AUTORIZADO
+ CUSTODIA VIGENTE
+ ESTADO PREVIO VALIDO
+ VERSION ESPERADA
+ PermissionKey ACTIVA EXACTA
+ DENEGACIONES AUSENTES
= ACCION DE TRANSITO AUTORIZABLE
```

La autenticación por sí sola nunca autoriza tránsito.

#### 2. Frontera empresarial

Las fronteras permanecen separadas:

```text
DISPATCH_CONFIRMED
!= TRANSIT_STARTED
!= STOP_ARRIVED
!= STOP_COMPLETED
!= STOP_DEPARTED
!= DESTINATION_ARRIVED
!= PHYSICAL_DELIVERY_HANDOFF
!= DESTINATION_RECEIVED
```

`DISPATCH_CONFIRMED` pertenece a la frontera anterior de `NEXO-AUTH-008`.

`TRANSIT_STARTED` y el recorrido bajo custodia pertenecen a esta tarea.

El handoff físico del conductor al receptor consume `nexo.inventory.remissions.deliver` como cierre de la responsabilidad de transporte, pero no confirma recepción.

La recepción empresarial y de inventario pertenece a `NEXO-AUTH-010` y exige `nexo.inventory.remissions.receive`.

#### 3. Capacidades protegidas exactas

La consulta de remisiones propias exige:

```text
nexo.inventory.remissions.view
```

El inicio de tránsito exige exclusivamente:

```text
nexo.inventory.remissions.start_transit
```

El handoff físico al receptor previsto exige exclusivamente:

```text
nexo.inventory.remissions.deliver
```

La aceptación de custodia previa exige:

```text
nexo.inventory.remissions.accept_custody
```

pero pertenece a la frontera anterior y no autoriza `TRANSIT_STARTED`.

La recepción del destino exige:

```text
nexo.inventory.remissions.receive
```

pero pertenece a la tarea siguiente y no puede ser ejecutada por inferencia desde tránsito o entrega física.

#### 4. Regla de `DEFAULT_DENY`

Una mutación de tránsito que no posea una PermissionKey activa exacta permanece denegada.

Esto aplica, mientras no exista resolución contractual explícita, a mutaciones como:

- registrar progreso ordinario de una parada;
- reportar o resolver incidentes de transporte;
- ordenar o confirmar un retorno;
- reasignar actor, journey o vehículo después del inicio;
- cambiar destino empresarial;
- reprogramar o reordenar paradas;
- cerrar una entrega fallida;
- declarar una excepción como resuelta.

No se ampliarán `view`, `start_transit`, `deliver`, `receive`, un rol operativo ni un estado para cubrir esas acciones.

#### 5. Modalidad operacional

`start_transit` y `deliver` son capacidades operacionales sensibles y no se conceden desde el carril base.

La autoridad exige contexto operacional completo. Un rol base, override administrativo, acceso multisede, modo de simulación, vista de gerente o pertenencia organizacional no sustituye el carril operacional.

#### 6. Decisión para `conductor_logistica`

`conductor_logistica` conserva grants vigentes para:

- `nexo.inventory.remissions.view`;
- `nexo.inventory.remissions.accept_custody`;
- `nexo.inventory.remissions.start_transit`;
- `nexo.inventory.remissions.deliver`;
- las capacidades logísticas de lectura ya definidas por su matriz vigente.

Esta tarea no modifica el dataset de grants.

El conductor solo puede ejercer esas capacidades cuando la relación con el recurso, journey, vehículo, shipment y custodia se demuestra en servidor.

#### 7. Prohibición de bypass

No autorizan tránsito:

```text
employees.role
role override administrativo
conductor_logistica como string aislado
nexo.access
remissions.view por sí solo
nexo.inventory.remissions.dispatch
nexo.inventory.remissions.transit
nexo.transit.view
selección de sede
site_id recibido del cliente
shipment_id recibido del cliente
journey_id recibido del cliente
vehicle_id recibido del cliente
estado in_transit
URL
botón visible
coordenada
geocerca
placa o etiqueta de vehículo
```

Toda entrada cliente se trata como referencia no confiable hasta resolverla de nuevo en servidor.

#### 8. Recurso y relaciones autorizantes

La autorización se resuelve sobre una relación explícita entre:

```text
actor
journey
shipment
custodia
vehiculo
origen
recorrido
destino
versiones
```

Para `start_transit`, el recurso debe demostrar como mínimo:

- shipment despachado y versionado;
- receipt de despacho válido;
- custodia aceptada y vigente;
- actor logístico asignado;
- recorrido o plan vigente;
- vehículo compatible cuando aplique;
- estado previo admisible;
- ausencia de bloqueo incompatible.

Para `deliver`, además debe existir destino válido y receptor previsto o identificable bajo el contrato de handoff.

#### 9. Handoff de entrada desde despacho

Tránsito consume exclusivamente el handoff contractual definido por la etapa de despacho.

Debe recibir, sin reconstruirlos:

- shipment;
- versión;
- dispatch receipt;
- sello o identidad equivalente de carga;
- bultos o LPN aplicables;
- cantidades ya confirmadas;
- custodia vigente;
- actor asignado;
- vehículo cuando aplique;
- origen y destino;
- correlación con la salida de inventario ya confirmada.

Un handoff ausente, incompleto, contradictorio u obsoleto bloquea el inicio.

#### 10. Prohibición de efectos de inventario en tránsito

Ningún comando de esta tarea puede volver a:

- incrementar cantidad enviada;
- descontar stock;
- crear `transfer_out`;
- consumir paquetes productivos;
- editar cantidades del shipment;
- rehacer preparación;
- reconstruir el dispatch receipt;
- corregir silenciosamente un despacho incompleto.

Esos efectos pertenecen al punto autoritativo de despacho definido por `NEXO-AUTH-008`.

`TRANSIT_STARTED` solo inicia la responsabilidad operacional del recorrido.

#### 11. Cola de trabajo autorizada

La cola de tránsito no es una lista de remisiones de una sede.

Debe proyectar exclusivamente trabajo que satisfaga simultáneamente:

- actor efectivo autorizado;
- asignación logística vigente;
- journey vigente o elegible para inicio según el contrato;
- shipment relacionado;
- vehículo compatible cuando aplique;
- custodia vigente o handoff de despacho válido;
- estado visible para la etapa;
- territorio autorizado.

Una remisión de la misma sede, fecha, recorrido o destino no se vuelve visible por proximidad semántica.

#### 12. `TRANSIT_STARTED`

El inicio de tránsito es un comando server-side atómico e idempotente.

Debe recibir o resolver:

- intención idempotente;
- actor efectivo;
- PermissionKey exacta `nexo.inventory.remissions.start_transit`;
- shipment y versión esperada;
- dispatch receipt;
- custodia vigente;
- journey o identidad necesaria para crearlo;
- plan de recorrido;
- vehículo cuando aplique;
- estado previo;
- contexto operacional.

La misma intención con igual payload devuelve el mismo resultado verificable.

La misma intención con payload distinto produce conflicto.

Un journey no puede iniciarse dos veces.

#### 13. Efectos permitidos del inicio

La transacción de inicio puede materializar únicamente los efectos propios del comienzo del recorrido, conforme al contrato vigente:

- crear o activar el journey cuando corresponda;
- registrar `TRANSIT_STARTED`;
- persistir receipt del comando;
- emitir outbox o evento correlacionado;
- sellar versiones necesarias para impedir doble inicio.

Si la operación intenta producir efectos de inventario, paquetes o cantidades, debe fallar y revertirse.

#### 14. Journey único y versionado

Cada journey conserva una asignación explícita y versionada de:

- actor;
- vehículo;
- shipments;
- origen;
- destino o destinos;
- plan de recorrido;
- paradas.

Cada shipment pertenece como máximo a un journey activo.

Una reasignación posterior al inicio no puede editar silenciosamente la identidad existente: exige nueva versión, motivo, autoridad y transferencia explícita de custodia, y mientras no exista una PermissionKey activa exacta para esa mutación permanece `DEFAULT_DENY`.

#### 15. Paradas y orden

El contrato funcional vigente distingue, por parada:

```text
STOP_PENDING
STOP_ARRIVED
STOP_COMPLETED
STOP_DEPARTED
```

Estas identidades de estado no conceden autoridad de mutación.

Mientras el catálogo no publique una PermissionKey exacta para progreso de parada, las transiciones mutadoras permanecen `DEFAULT_DENY` aunque la interfaz pueda representar el estado.

No se permite inferir una mutación desde `start_transit`, `deliver`, una coordenada o un permiso de lectura.

#### 16. Ubicación y geocerca

Ubicación y geocerca son observaciones auxiliares.

Una coordenada no puede por sí sola:

- iniciar tránsito;
- confirmar llegada;
- completar una parada;
- sustituir `site_id` o una parada contractual;
- transferir custodia;
- ampliar territorio;
- confirmar entrega;
- confirmar recepción.

El seguimiento continuo permanece fuera de materialización hasta que finalidad, minimización, frecuencia, retención, consentimiento cuando corresponda, dispositivo y piloto estén aprobados.

#### 17. Continuidad de custodia

Desde el despacho hasta la aceptación válida del destino debe existir exactamente un custodio activo por shipment.

Cambiar:

- actor;
- turno;
- dispositivo;
- vehículo;
- recorrido;
- cercanía física;
- ubicación;

no transfiere custodia.

El custodio anterior continúa responsable hasta una transferencia válida y auditable.

#### 18. Entrega física

El conductor puede registrar el handoff físico únicamente mediante:

```text
nexo.inventory.remissions.deliver
```

La acción exige como mínimo:

- actor logístico autorizado;
- shipment y journey relacionados;
- destino válido;
- custodia vigente;
- estado de recorrido compatible;
- versión esperada;
- receptor previsto o identificable bajo el contrato;
- momento de servidor;
- evidencia permitida por política.

`deliver` no concede `receive` y no crea inventario en destino.

#### 19. Frontera con recepción

Arribo, presentación, entrega física y recepción son hechos diferentes.

Esta tarea puede producir un handoff versionado hacia `NEXO-AUTH-010`, pero no puede afirmar:

- cantidad recibida;
- cantidad aceptada;
- cantidad rechazada;
- cuarentena;
- entrada de inventario;
- cierre de diferencias;
- aceptación del receptor.

El receptor debe ejecutar su propia autorización exacta posteriormente.

#### 20. Evidencia de entrega

Firma, fotografía, código de un solo uso, escaneo, attestation o ubicación no son autoridad por sí solos.

Cuando se materialicen, deberán estar vinculados al shipment, journey, destino, actor, receptor, servidor, custodia y política aplicable.

La incorporación de evidencia sensible exige los contratos de privacidad, Storage, retención, minimización y dispositivo correspondientes.

#### 21. Incidentes

Retraso, avería, accidente, bloqueo de vía, pérdida de conectividad, alteración de sello, daño, pérdida, temperatura, calidad, conflicto de custodia, destino incorrecto, receptor ausente, rechazo o retorno requerido deben permanecer estructurados y auditables.

El conductor puede observar o contener según los contratos funcionales vigentes, pero una mutación de incidente no queda autorizada por esta tarea si no posee una PermissionKey activa exacta.

Un incidente no concede permiso para ajustar inventario, cambiar destino, levantar calidad, cancelar, reasignar o confirmar recepción.

#### 22. Entrega fallida y retorno

Una entrega fallida conserva:

- shipment;
- journey;
- receipts;
- sello;
- custodia;
- destino original;
- evidencia;
- incidente relacionado.

La instrucción de esperar, reintentar, continuar, transferir o retornar exige autoridad explícita.

Mientras no exista PermissionKey activa exacta para esa decisión, la mutación permanece `DEFAULT_DENY`.

Un retorno no repone inventario automáticamente ni se considera recepción.

#### 23. Dispositivo compartido

Un dispositivo personal, corporativo, compartido o instalado en vehículo nunca es el actor empresarial.

En dispositivo compartido debe existir sesión de actor atribuible.

PIN, código de vehículo, etiqueta técnica, sesión de navegador o hardware identificado no conceden el rol, el permiso ni la custodia.

Cada acción se atribuye al trabajador efectivo y al contexto operacional vigente.

#### 24. Conectividad intermitente

La operación móvil debe tolerar desconexión sin duplicar hechos.

Toda mutación futura deberá conservar:

- intención idempotente;
- versión esperada;
- tiempo observado cuando corresponda;
- tiempo de servidor;
- actor;
- dispositivo cuando aplique;
- resultado verificable.

Tras un timeout o resultado desconocido, el cliente debe reconciliar por intención antes de emitir otra mutación.

Un estado obsoleto no puede forzar éxito.

#### 25. AS-IS verificado en `vento-nexo`

Corte observado: `vento-group-sas/vento-nexo@f0a12557a1a258c84b025933653dc756de4b5a59`.

El código actual demuestra múltiples superficies que aún deben converger:

1. `src/app/inventory/remissions/conductor/actions.ts` autentica usuario y permite cambiar directamente `remission_shipments.status` desde `draft`, `loading` o `sealed` hacia `in_transit`; la acción observada no revalida explícitamente `start_transit`, asignación, custodia, journey, versión o dispatch receipt.
2. `src/app/inventory/remissions/conductor/page.tsx` consulta shipments en `draft`, `loading`, `sealed` e `in_transit` y ofrece salida sobre todo shipment no `in_transit`; la consulta observada no añade un filtro explícito por actor, journey o asignación logística.
3. `src/app/inventory/remissions/transit/page.tsx` consume el código legacy `inventory.remissions.transit`, habilita por sedes de origen autorizadas y consulta `restock_requests` en `preparing`, `in_transit` y `partial`; esa superficie no demuestra por sí sola asignación de journey, shipment ni custodia exacta.
4. `src/app/inventory/remissions/[id]/detail-actions.ts` contiene `submitTransitChecklist`, que usa `access.canTransit` sobre una solicitud `preparing` y puede ejecutar efectos de stock, despacho de paquetes productivos y transición a `in_transit` dentro del mismo carril; ese acoplamiento debe desaparecer del inicio de tránsito.
5. `src/app/inventory/remissions/receive/page.tsx` consume shipments `in_transit` como entrada de recepción; la frontera posterior deberá admitir únicamente el handoff versionado y autorizado definido por tránsito y recepción.

Estas observaciones describen el AS-IS y no autorizan modificaciones físicas desde este marcador.

#### 26. Convergencia obligatoria futura

La materialización futura de `GAP-PKG-163` deberá converger las superficies anteriores sobre una sola verdad de autorización y tránsito.

Como mínimo deberá:

- eliminar `inventory.remissions.transit`, `nexo.inventory.remissions.transit` y `nexo.transit.view` como autoridades runtime;
- impedir el salto directo `draft|loading|sealed -> in_transit` sin despacho y custodia válidos;
- impedir `preparing -> in_transit` como sustituto del handoff de despacho;
- hacer que `TRANSIT_STARTED` use exclusivamente `nexo.inventory.remissions.start_transit`;
- separar completamente inventario y consumo productivo del comando de inicio;
- filtrar la cola por actor, asignación, journey, shipment, territorio y custodia;
- producir intención, receipt, evento y outbox idempotentes;
- mantener progreso, incidentes, retornos y reasignaciones denegados hasta disponer de PermissionKey exacta;
- usar `nexo.inventory.remissions.deliver` exclusivamente para el handoff físico del conductor;
- entregar a recepción un handoff versionado, sin auto-confirmar `receive`.

#### 27. Escritura única de hechos

No pueden coexistir dos escritores independientes que afirmen el mismo hecho empresarial.

En particular:

- solo un comando puede afirmar `TRANSIT_STARTED`;
- una ruta legacy no puede escribir `in_transit` en paralelo con el flujo canónico;
- el cliente no puede escribir estados directamente;
- un RPC de tránsito no puede reproducir efectos ya confirmados por despacho;
- una recepción no puede reconstruir o corregir retrospectivamente el inicio.

La convergencia física debe retirar o encapsular escritores legacy antes de declarar materialización completa.

#### 28. RLS y servidor

La autorización de servidor y RLS deben fallar cerrado de manera coherente.

La UI puede ocultar acciones, pero la seguridad no depende de la UI.

Cada lectura o mutación debe revalidar en servidor:

- usuario;
- actor efectivo;
- sesión operacional;
- permiso exacto;
- relación con el recurso;
- estado;
- versión;
- territorio;
- custodia;
- asignación.

Un service role no puede convertirse en atajo del camino ordinario de usuario.

#### 29. Auditoría mínima

Cada decisión sensible debe permitir reconstruir:

- actor;
- permiso evaluado;
- recurso;
- journey;
- shipment;
- versión;
- estado previo;
- estado resultante;
- custodia;
- vehículo cuando aplique;
- origen y destino;
- intención;
- receipt;
- decisión de autorización;
- razón de denegación cuando corresponda;
- tiempo de servidor.

La auditoría no sustituye autorización previa.

#### 30. Experiencia autorizada objetivo

La experiencia del conductor debe distinguir como mínimo:

```text
CARGA DESPACHADA Y BAJO CUSTODIA
[ Iniciar tránsito ]

TRÁNSITO ACTIVO
- journey vigente
- shipment bajo custodia
- siguiente parada visible
- recorrido visible

DESTINO VÁLIDO
[ Registrar entrega física ]
```

Los controles de progreso, incidencia, retorno o reasignación no se presentan como mutaciones habilitadas mientras no exista PermissionKey activa exacta.

No se presenta al conductor una acción de `receive`.

#### 31. Estados visuales no autorizantes

Los estados de interfaz pueden informar, pero nunca conceder autoridad.

Una etiqueta como:

```text
En tránsito
Llegando
En destino
Entregado
```

no autoriza por sí sola la siguiente transición.

El servidor resuelve siempre el hecho empresarial, el estado anterior y el permiso exacto.

#### 32. Relación con `GAP-PKG-163`

La cobertura física prevista para tránsito está vinculada a `GAP-PKG-163`, cuyo estado documental observado es `COMPILED` con alcance de readiness documental.

Esta tarea no convierte ese estado en autorización física ni declara una instancia ejecutable.

La futura materialización debe respetar el paquete, los gates, ownership, plan de pruebas y evidencia que correspondan en E5.

#### 33. Validaciones contractuales obligatorias futuras

La implementación deberá ejecutar el conjunto ya definido `TRN-VAL-001` a `TRN-VAL-036`.

La cobertura debe demostrar al menos:

- allow del actor correcto;
- deny de actor no asignado;
- deny sin turno o contexto requerido;
- deny con PermissionKey legacy;
- deny con recurso ajeno;
- deny con custodia ausente;
- deny con versión obsoleta;
- deny con handoff incompleto;
- idempotencia del inicio;
- conflicto por reutilización de intención con payload diferente;
- cero doble inicio;
- cero doble evento;
- cero efecto de inventario en tránsito;
- cero consumo duplicado de paquetes;
- segregación entre `deliver` y `receive`;
- `DEFAULT_DENY` para mutaciones sin PermissionKey exacta.

La definición de esta tarea no ejecuta esas pruebas físicas.

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea especializa autorización y materialización sobre obligaciones ya registradas; no crea una obligación verificable nueva.

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-NEXO-121` — separación de pasos, estados y fronteras del tránsito;
- `TREQ-NEXO-122` — revalidación de contexto y PermissionKey exacta;
- `TREQ-NEXO-123` — admisión exclusiva desde el handoff de despacho y cero doble contabilización;
- `TREQ-NEXO-124` — journey único, asignación y versionado;
- `TREQ-NEXO-125` — comando atómico e idempotente `TRANSIT_STARTED`;
- `TREQ-NEXO-126` — progresión ordenada de paradas;
- `TREQ-NEXO-127` — ubicación como observación auxiliar;
- `TREQ-NEXO-128` — continuidad única de custodia;
- `TREQ-NEXO-129` — incidentes estructurados;
- `TREQ-NEXO-130` — entrega fallida y retorno;
- `TREQ-NEXO-131` — separación entre arribo, presentación, handoff y recepción;
- `TREQ-NEXO-132` — convergencia física y `TRN-VAL-001` a `TRN-VAL-036`.

Estas referencias documentan cobertura heredada y no modifican filas del Registro 04A.

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define un contrato documental y no ejecuta build de producto |
| LOCAL | NOT_EXECUTED | incorporación al owner, normalización canónica y batería documental corresponden al checkout local de la rama de tarea |
| REMOTA | PASS | se verificaron `main` vigente de `vento-shell`, cierre `VERIFIED` de `AUTH-RBAC-018::CORR-001`, catálogo activo de 140 PermissionKey, 16 grants de `conductor_logistica`, cobertura `TREQ-NEXO-121` a `TREQ-NEXO-132`, vínculo `GAP-PKG-163` y AS-IS vigente de `vento-nexo` para conductor, tránsito, detalle y recepción |
| OPERATIVA | NOT_APPLICABLE | no se inicia journey real, no se cambia un shipment real y no se registra entrega o recepción real |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza `NEXO-AUTH-009::<implementation_unit_id>` |

#### 37. Criterios de aceptación

- [x] la consulta de remisiones propias exige `nexo.inventory.remissions.view`;
- [x] `TRANSIT_STARTED` exige exclusivamente `nexo.inventory.remissions.start_transit`;
- [x] `accept_custody` permanece como frontera previa y no inicia tránsito;
- [x] el handoff físico del conductor exige exclusivamente `nexo.inventory.remissions.deliver`;
- [x] `deliver` no concede `receive`;
- [x] `receive` permanece reservado al receptor y a `NEXO-AUTH-010`;
- [x] `dispatch`, `transit` y `transit.view` no autorizan runtime;
- [x] ninguna PermissionKey vecina se amplía por inferencia;
- [x] progreso, incidentes, retorno y reasignación permanecen `DEFAULT_DENY` sin PermissionKey activa exacta;
- [x] la cola de trabajo se limita a actor, asignación, journey, shipment, territorio y custodia relacionados;
- [x] el inicio consume el handoff de despacho y no reconstruye sus efectos;
- [x] tránsito no vuelve a descontar inventario ni consumir paquetes productivos;
- [x] el comando de inicio es atómico, idempotente y versionado;
- [x] cada shipment pertenece como máximo a un journey activo;
- [x] ubicación y geocerca son observaciones auxiliares, no autoridad;
- [x] existe exactamente un custodio activo por shipment durante el recorrido;
- [x] una entrega física no confirma recepción empresarial ni inventario de destino;
- [x] un dispositivo no sustituye al actor;
- [x] un timeout se reconcilia antes de reintentar;
- [x] los escritores legacy observados deben converger antes de materialización completa;
- [x] la futura implementación ejecutará `TRN-VAL-001` a `TRN-VAL-036`;
- [x] cualquier cambio Supabase futuro pertenece a `vento-shell`;
- [x] la topología permanece `PER_IMPLEMENTATION_UNIT`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 38. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia el catálogo de PermissionKey;
- cambia matrices de rol;
- inicia un journey real;
- cambia un shipment real a `in_transit`;
- registra progreso real de parada;
- registra geolocalización real;
- abre o resuelve un incidente real;
- cambia un destino real;
- reasigna conductor o vehículo real;
- registra una entrega real;
- confirma una recepción real;
- modifica inventario real;
- crea una instancia física;
- autoriza una instancia física;
- modifica el Registro 04A.

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-008 — Proteger despacho`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-009 — Proteger tránsito`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-010 — Proteger recepción`
### ✅ NEXO-AUTH-010 — Proteger recepción

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-009 — Proteger tránsito
**Tarea siguiente:** NEXO-AUTH-011 — Proteger ajustes de inventario
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger la recepción de remisiones mediante `nexo.inventory.remissions.receive`, handoff de tránsito verificable, función receptora, destino, sesión, versión, cantidades observadas, receipts append-only, cierre de custodia e idempotencia, sin confundir recepción con entrega física, putaway, ajuste ni resolución de diferencias
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-010::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger de extremo a extremo la recepción de remisiones para que una carga únicamente pueda ser reclamada, observada, clasificada y confirmada por un actor receptor autorizado sobre el destino, shipment, handoff, sesión, versión y cantidades exactas, preservando custodia, parcialidad, diferencias, condición, idempotencia y trazabilidad sin convertir la recepción en entrega física del conductor, putaway, ajuste, cancelación, conciliación supervisora ni cierre ficticio de inventario.

#### 2. Resultado contractual

La decisión autorizante objetivo es:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ SESION HUMANA ATRIBUIDA
+ FUNCION RECEPTORA VIGENTE
+ TURNO Y CHECK-IN CUANDO APLIQUEN
+ DISPOSITIVO Y CONTEXTO VALIDOS
+ DESTINO Y TERRITORIO EXACTOS
+ PERMISSIONKEY nexo.inventory.remissions.receive
+ HANDOFF DE TRANSITO ADMISIBLE
+ SHIPMENT Y VERSION VIGENTES
+ CUSTODIA Y ESTADO RECIBIBLES
+ SESION DE RECEPCION VIGENTE
+ CANTIDADES OBSERVADAS VALIDAS
+ DENEGACIONES AUSENTES
→ RECEPCION AUTORIZABLE
```

Autenticación, sede, URL, escaneo, nombre de rol, estado `in_transit`, presencia física o acceso a una pantalla no sustituyen esta decisión.

#### 3. Capacidad protegida exacta

La única `PermissionKey` autorizante para confirmar recepción ordinaria de una remisión es:

```text
nexo.inventory.remissions.receive
```

La capacidad permanece `active` y conserva modalidad:

```text
OPERATIONAL_ONLY
```

No se amplía ningún permiso vecino para sustituirla.

#### 4. Fronteras con tránsito y entrega física

La secuencia autorizativa se mantiene separada:

```text
nexo.inventory.remissions.accept_custody
        ↓
DESPACHO CONFIRMADO
        ↓
nexo.inventory.remissions.start_transit
        ↓
TRANSITO
        ↓
nexo.inventory.remissions.deliver
        ↓
HANDOFF FISICO EN DESTINO
        ↓
nexo.inventory.remissions.receive
        ↓
RECEPCION CONFIRMADA
```

`deliver` permite el handoff físico del conductor al receptor previsto. No confirma recepción. `receive` pertenece al actor receptor y no concede al conductor autoridad para auto-recibir la carga que transporta.

#### 5. Actores ordinarios con concesión vigente

El dataset `operational-role-grants@1.0.0` contiene exactamente dos grants `DIRECT_OPERATIONAL` para `nexo.inventory.remissions.receive`:

| Rol operativo | Contexto | Límite |
| --- | --- | --- |
| `bodeguero` | `CTX-WH-REMISSION-RECEIVE` | Recepción de remisiones cuyo destino autorizado sea la bodega activa, con verificación física, cantidades, diferencias y transferencia de custodia. |
| `operador_integral_satelite` | `CTX-INTEGRATED-REMISSION-RECEIVE` | Recepción ordinaria de remisiones cuyo destino sea la sede integrada activa, con recurso, origen, cantidades y estado válidos. |

Una concesión individual canónica podrá existir únicamente si el modelo de autorización vigente la permite y mantiene las mismas fronteras de recurso, destino, contexto, segregación y auditoría. No se infiere desde cargo, sede o acceso general.

#### 6. Contrato de `bodeguero`

`bodeguero` puede recibir cuando:

- la bodega activa es el destino autorizado;
- turno y check-in aplicables son válidos;
- sede, área, actor y recurso se resuelven en servidor;
- el shipment y handoff corresponden a la carga recibible;
- la verificación física y las cantidades observadas son válidas;
- diferencias y transferencia de custodia quedan trazables;
- el mismo actor no recibe en el mismo extremo una remisión que preparó sin una excepción formal vigente.

La capacidad no concede ajuste, cancelación, resolución supervisora ni mutación del origen.

#### 7. Contrato de `operador_integral_satelite`

`operador_integral_satelite` puede recibir exclusivamente remisiones destinadas a la sede integrada activa y en estado empresarial recibible.

La operación exige turno y check-in activos, reautenticación fuerte cuando corresponda, verificación física, control de concurrencia y auditoría antes/después. No concede preparación en origen, despacho, cancelación, inventario general, administración logística ni corrección unilateral de cantidades del origen.

#### 8. Denegación por defecto

No autorizan recepción:

```text
nexo.access
nexo.inventory.remissions.view
nexo.inventory.remissions.prepare
nexo.inventory.remissions.accept_custody
nexo.inventory.remissions.start_transit
nexo.inventory.remissions.deliver
nexo.inventory.remissions.dispatch
nexo.inventory.remissions.transit
nexo.transit.view
rol o cargo
all_sites
URL directa
shipment visible
estado in_transit
escaneo
geolocalizacion
firma
fotografia
codigo de entrega
dispositivo
```

Toda ausencia o incompatibilidad produce `DEFAULT_DENY`.

#### 9. Recurso, destino y territorio

La autorización se resuelve sobre el recurso exacto de recepción y no sobre una sede en abstracto.

El servidor debe demostrar como mínimo:

- `shipment_id` o identidad canónica equivalente;
- destino exacto;
- handoff de tránsito vigente;
- journey y parada cuando correspondan;
- estado y versión;
- actor receptor;
- función receptora;
- área o contexto operacional aplicable;
- custodia vigente;
- líneas y cantidades recibibles;
- receipts previos y saldo pendiente.

Una relación con la sede no autoriza shipments ajenos al trabajo del receptor.

#### 10. Admisión desde tránsito

Recepción consume exclusivamente el handoff:

```text
NEXO-REMISSION-TRANSIT-TO-RECEPTION-HANDOFF-001
```

El handoff debe conservar de forma verificable:

- handoff;
- journey;
- parada;
- shipment;
- dispatch receipt;
- transit receipts aplicables;
- destino;
- sello;
- bultos;
- custodio;
- versión.

Arribo, presentación, proximidad, coordenada, escaneo o enlace no confirman recepción ni reparan un handoff incompleto.

#### 11. Cola de trabajo receptora

La experiencia reutiliza exactamente las ocho colas aprobadas:

```text
RCVQ-BLOQUEO
RCVQ-HANDOFF
RCVQ-ARRIBO
RCVQ-VERIFICACION
RCVQ-RECEPCION_PARCIAL
RCVQ-DIFERENCIA
RCVQ-EVIDENCIA
RCVQ-CONTINUIDAD
```

Solo se muestran handoffs y shipments atribuibles al destino y actor. Autorización, custodia, integridad y condición tienen prioridad sobre continuidad o publicación.

#### 12. Reclamo y sesión de recepción

Abrir una vista no reclama una recepción.

El reclamo debe crear una sesión única y versionada por:

```text
handoff
+ shipment
+ destino
+ actor
```

La sesión se crea mediante intención idempotente. Una segunda sesión activa produce conflicto. Transferencia, expiración o revocación conservan hechos históricos y requieren versión, motivo y aceptación cuando corresponda.

#### 13. Control de versión y concurrencia

Toda mutación compara versiones vigentes de:

- handoff;
- sesión;
- shipment;
- línea;
- receipt acumulado;
- saldo pendiente.

Un cliente obsoleto no puede sobrescribir observaciones, receipts, cantidades, condición ni custodia confirmadas por otro actor o intento.

#### 14. Verificación física de identidad

Cada observación debe demostrar pertenencia al handoff admitido de las identidades aplicables:

- shipment;
- bulto;
- sello;
- shipment item;
- producto;
- presentación;
- lote;
- empaque;
- política snapshot.

Escáner, código, etiqueta o enlace solo identifican dentro de la sesión; no conceden autoridad ni confirman cantidad, condición, receipt, custodia o inventario.

#### 15. Cantidad y UOM

La recepción conserva la cantidad cruda observada y su normalización mediante el snapshot vigente de:

- UOM;
- factor;
- modo de medición;
- tolerancia;
- presentación aplicable.

`variable_weight` y `bulk_volume` exigen valor actual. `count_with_weight` exige peso y conteo auxiliar. La cantidad despachada o solicitada no sustituye una medición obligatoria.

#### 16. Conservación por línea

Por cada línea y receipt se cumple:

```text
O = A + R + Q + U
```

Donde:

- `O` = cantidad observada;
- `A` = aceptada;
- `R` = rechazada;
- `Q` = cuarentena;
- `U` = sin resolver.

El faltante es saldo esperado no observado. El sobrante se registra por separado y nunca se convierte en aceptación automática.

#### 17. Condición y disposición

Toda cantidad observada recibe condición y disposición explícitas.

Solo `A` puede llegar a ser elegible para stock disponible. `R` conserva custodia y destino de retorno pendiente. `Q` permanece inmovilizada. `U` no se publica.

Daño, temperatura fuera de rango, calidad dudosa, producto incorrecto, conflicto de sello o evidencia insuficiente nunca degradan a aceptación por defecto.

#### 18. Receipts parciales y múltiples

Los receipts son append-only y admiten recepción parcial.

El servidor deriva acumulados y saldo pendiente. Un nuevo receipt no reescribe el anterior y no puede exceder la cantidad despachada salvo el caso explícito de sobrante registrado separadamente.

Cerrar una pantalla, sesión o turno no convierte una recepción parcial en completa.

#### 19. Confirmación de recepción

La confirmación debe ejecutarse mediante una intención atómica e idempotente que produzca un receipt limpio o con excepciones.

La misma intención con el mismo payload devuelve el mismo receipt. La misma intención con payload distinto produce conflicto. Un resultado desconocido se reconcilia antes de reintentar.

La confirmación conserva receipts e items append-only y no sobrescribe historia observada.

#### 20. Cierre de custodia

La transferencia de custodia exige declaraciones separadas de entrega y aceptación.

El conductor no queda liberado por:

- arribo;
- presentación;
- geocerca;
- escaneo;
- captura parcial;
- evidencia unilateral.

La custodia solo cambia cuando la aceptación válida queda confirmada conforme al handoff y receipt aplicables.

#### 21. Diferencias y excepciones

Faltante, sobrante, daño, producto incorrecto, rechazo, cuarentena, conflicto de UOM, medición, sello, bulto o evidencia generan casos estructurados.

Recepción puede capturar y contener, pero no resolver por defecto:

- responsabilidad;
- reposición;
- liberación;
- disposición;
- compensación;
- ajuste;
- retorno;
- cierre supervisor.

Confirmar un receipt con excepciones no cierra esas excepciones.

#### 22. Frontera con inventario

La publicación de inventario consume exclusivamente cantidades `A` de receipt items confirmados.

Debe existir una LOC explícita de recepción o staging perteneciente al destino. Rechazado, cuarentena, faltante, sobrante y sin resolver no incrementan stock disponible.

Se mantienen separados:

```text
CONFIRMAR RECEIPT
!=
PUBLICAR INVENTARIO
!=
PUTAWAY FINAL
```

Ningún algoritmo puede elegir silenciosamente la primera LOC o una ubicación heurística.

#### 23. Frontera con putaway

La recepción no ejecuta por inferencia el flujo de ubicación.

Una cantidad aceptada y publicada puede quedar pendiente de putaway. La ubicación final conserva su propio contrato, destino físico, autorización, receipt y pruebas. `NEXO-AUTH-010` no absorbe `NEXO-UX-015` ni futuras tareas de autorización de movimientos o ubicación.

#### 24. Frontera con ajustes

Recepción no concede autoridad para ajustar inventario.

Una diferencia observada no se corrige alterando cantidad enviada, aceptada, recibida, stock o movimiento. Los ajustes quedan reservados a `NEXO-AUTH-011 — Proteger ajustes de inventario` y a sus contratos propietarios.

#### 25. Auditoría y recuperación

Cada recepción debe preservar, según corresponda:

- intención;
- actor;
- sesión;
- función receptora;
- destino;
- shipment;
- handoff;
- versiones;
- receipt;
- receipt items;
- cantidades crudas y normalizadas;
- condición y disposición;
- custodia antes/después;
- timestamps de servidor;
- evidencia referenciada;
- resultado conocido o desconocido;
- correlación con publicación de inventario.

Un timeout, reconexión o pérdida de respuesta exige consulta del resultado antes de repetir la mutación.

#### 26. Dispositivo compartido y sesión humana

Un dispositivo compartido no es el receptor empresarial.

Toda acción debe quedar atribuida al trabajador autenticado y a su sesión humana vigente. PIN, identidad técnica del equipo, sede preseleccionada, escáner o dispositivo instalado en el punto receptor no sustituyen actor, permiso, función, turno, check-in ni relación con el shipment.

#### 27. AS-IS verificado en `vento-nexo`

El snapshot remoto `f0a12557a1a258c84b025933653dc756de4b5a59` conserva dos superficies de recepción que todavía deben converger.

**Camino de shipment físico**

- `src/app/inventory/remissions/receive/page.tsx` consulta `remission_shipments` con `status = in_transit`;
- la consulta visible no filtra por destino ni actor antes de serializar la lista;
- cada cantidad `received_base_qty` se precarga con `base_qty` despachada;
- `confirmShipmentReceipt` valida sesión autenticada y forma básica del payload y llama `confirm_remission_shipment_receipt`;
- el caller no demuestra por sí solo la revalidación completa de PermissionKey, función receptora, destino, handoff, sesión versionada e idempotencia exigidas por este contrato.

**Camino legacy `restock_requests`**

- `detail-access.ts` resuelve `inventory.remissions.receive` junto con capacidad receptora del destino, sede efectiva y área;
- `detail-actions.ts` admite `receive`, `receive_partial` y `resolve_shortage` sobre estados `in_transit` o `partial`;
- conserva `received_quantity` y `shortage_quantity` en `restock_request_items`;
- puede actualizar estado, `received_at`, `received_by`, sincronizar recepción y producir movimientos de destino;
- por tanto todavía existe riesgo de doble verdad frente al modelo de shipments y receipts.

Esta tarea documenta la convergencia; no la ejecuta.

#### 28. Modelo físico objetivo

La futura materialización deberá hacer converger la recepción hacia:

```text
remission_shipments
+ remission_receipts
+ remission_receipt_items
```

como escritor canónico de recepción.

`restock_requests` y sus cantidades pueden sobrevivir únicamente como proyección temporal compatible durante la transición; no pueden conservar un segundo hecho autoritativo.

#### 29. Compatibilidad y dual-write

Si una transición requiere dual-write temporal, ambos lados deberán consumir una misma intención y correlación, con atomicidad u outbox aprobados y pruebas de:

- cero doble receipt;
- cero doble movimiento;
- cero doble cierre de custodia;
- cero saldo perdido;
- reconstrucción determinista de la proyección legacy.

No se permite mantener dos escritores independientes.

#### 30. Ownership de Supabase

Toda futura modificación de:

- tablas;
- RPC;
- RLS;
- grants;
- tipos;
- funciones;
- triggers;
- outbox;
- migraciones;
- rollback;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Esta tarea no ejecuta cambios Supabase.

#### 31. Materialización física posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto, este marcador global no autoriza código ni infraestructura. Cada materialización futura utiliza:

```text
NEXO-AUTH-010::<implementation_unit_id>
```

y solo puede ejecutarse cuando el `package_id` propietario aplicable tenga `E5-GATE-008::<package_id> = PASS`, exista lineage válido y se otorgue autorización física explícita.

#### 32. Convergencia futura

La implementación de recepción deberá cerrar las brechas ya identificadas en `GAP-PKG-112` y consumir la frontera de tránsito de `GAP-PKG-163` sin reabrir despacho ni tránsito.

La convergencia incluye, como mínimo:

- filtrar la cola por destino, actor, función y relación exacta;
- eliminar la precarga autoritativa de cantidad recibida cuando la política requiera observación física;
- introducir sesión de recepción versionada;
- aplicar idempotencia y reconciliación de resultado desconocido;
- usar receipts append-only y receipts parciales;
- separar condición, disposición, diferencia, publicación y putaway;
- retirar el segundo escritor legacy cuando la compatibilidad permita hacerlo;
- conservar RLS, grants, rollback y cero doble efecto.

#### 33. Validaciones funcionales heredadas

La futura implementación deberá conservar la matriz ya aprobada de:

```text
RCP-VAL-001 ... RCP-VAL-042
```

Esta tarea no redefine esas cuarenta y dos validaciones; las consume como cobertura vigente.

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La autorización de recepción especializa contratos y requisitos ya vigentes sin crear una obligación verificable nueva.

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-011`;
- `TREQ-NEXO-069` a `TREQ-NEXO-075`;
- `TREQ-NEXO-122`;
- `TREQ-NEXO-128`;
- `TREQ-NEXO-131`;
- `TREQ-NEXO-133` a `TREQ-NEXO-146`.

Estas referencias son trazabilidad heredada y no modifican filas del Registro 04A.

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | El marcador define un contrato documental y no compila ni despliega producto. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido incorporado al checkout local de `NEXO-AUTH-010`; formato, quality, delivery y batería global corresponden al lifecycle documental posterior al reemplazo. |
| REMOTA | PASS | Se verificaron `vento-shell` en `b335cc78ffcd974c70542f18db0ea1f6a349ef42`, continuidad NEXO-AUTH-009 → NEXO-AUTH-010 → NEXO-AUTH-011, topología `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`, catálogo activo de 140 PermissionKey, grants vigentes de `receive`, 04A de NEXO y `vento-nexo` en `f0a12557a1a258c84b025933653dc756de4b5a59` para recepción física y legacy. |
| OPERATIVA | NOT_APPLICABLE | No se recibe una carga real, no se transfiere custodia real, no se publica inventario ni se resuelve una diferencia real. |
| FÍSICA | NOT_APPLICABLE | No se crea ni autoriza `NEXO-AUTH-010::<implementation_unit_id>` durante este marcador global. |

#### 37. Criterios de aceptación

- [x] la PermissionKey exacta de recepción ordinaria es `nexo.inventory.remissions.receive`;
- [x] la capacidad conserva `OPERATIONAL_ONLY`;
- [x] los grants directos ordinarios vigentes corresponden a `bodeguero` y `operador_integral_satelite` bajo sus contextos aprobados;
- [x] destino, actor, función, sesión, turno o check-in, dispositivo, territorio, shipment, handoff, estado, versión y custodia se revalidan en servidor;
- [x] `deliver` y `receive` permanecen separados;
- [x] el conductor no puede auto-recibir su propia carga por inferencia;
- [x] una sede, URL, rol, escaneo, geocerca o estado `in_transit` no conceden recepción;
- [x] la admisión consume `NEXO-REMISSION-TRANSIT-TO-RECEPTION-HANDOFF-001`;
- [x] las ocho colas `RCVQ-*` permanecen diferenciadas;
- [x] abrir la pantalla no reclama una sesión;
- [x] la sesión de recepción es única, versionada e idempotente;
- [x] observación, aceptación, rechazo, cuarentena y saldo sin resolver permanecen separados;
- [x] se conserva `O = A + R + Q + U`;
- [x] receipts parciales y múltiples son append-only;
- [x] la custodia no cambia por arribo, escaneo o evidencia unilateral;
- [x] confirmar recepción no resuelve automáticamente diferencias;
- [x] confirmar receipt, publicar inventario y ejecutar putaway son efectos separados;
- [x] la recepción no concede ajustes de inventario;
- [x] el modelo físico objetivo usa shipments y receipts como escritor canónico;
- [x] el camino legacy queda como compatibilidad temporal y no como segundo escritor permanente;
- [x] la futura implementación consume `RCP-VAL-001` a `RCP-VAL-042`;
- [x] toda modificación Supabase futura pertenece a `vento-shell`;
- [x] la topología es `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 38. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia el catálogo de PermissionKey;
- cambia matrices de rol;
- recibe una remisión real;
- crea un receipt real;
- modifica cantidades reales;
- transfiere custodia real;
- publica inventario real;
- ejecuta putaway;
- ajusta inventario;
- resuelve diferencias;
- ejecuta retorno;
- libera cuarentena;
- cambia un destino real;
- crea una instancia física;
- autoriza una instancia física;
- modifica el Registro 04A.

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-009 — Proteger tránsito`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-010 — Proteger recepción`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-011 — Proteger ajustes de inventario`
### ✅ NEXO-AUTH-011 — Proteger ajustes de inventario

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-010 — Proteger recepción
**Tarea siguiente:** NEXO-AUTH-012 — Proteger conteos
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger consulta y registro de ajustes mediante las PermissionKey activas `nexo.inventory.adjustments.view` y `nexo.inventory.adjustments.register`, composición exacta de carriles `BASE_OR_OPERATIONAL` y `BASE_AND_OPERATIONAL`, territorio y recurso resueltos en servidor, segregación, decisión versionada, reautenticación fuerte, idempotencia y publicación exclusiva mediante el límite autoritativo del ledger
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-011::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger de extremo a extremo la consulta y el registro de ajustes de inventario para que una variación únicamente pueda investigarse, decidirse y publicarse cuando actor, sesión, carriles de autorización, territorio, recurso, causa, evidencia, versión, decisión e intención sean compatibles y verificables, sin convertir conteos, diferencias, movimientos, recepción, pérdida, daño, costo, navegación o acceso general al inventario en autoridad implícita para modificar stock.

#### 2. Resultado contractual

La consulta y el registro se resuelven de forma independiente.

Para consulta:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ PermissionKey nexo.inventory.adjustments.view
+ UN CARRIL COMPLETO BASE U OPERACIONAL
+ TERRITORIO Y RECURSO COMPATIBLES
+ DENEGACIONES AUSENTES
→ CONSULTA AUTORIZABLE
```

Para registro:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ SESION HUMANA ATRIBUIDA
+ PermissionKey nexo.inventory.adjustments.register
+ COMPONENTE BASE VALIDO
+ COMPONENTE OPERACIONAL VALIDO
+ INTERSECCION TERRITORIAL NO VACIA
+ TURNO Y CHECK-IN VIGENTES
+ DISPOSITIVO COMPATIBLE
+ REAUTENTICACION STRONG
+ CASO Y DIFERENCIA DOCUMENTADOS
+ MOTIVO Y EVIDENCIA SEGUN POLICY
+ PROPUESTA Y DECISION VIGENTES
+ RECURSO Y VERSION VIGENTES
+ INTENCION IDEMPOTENTE
+ DENEGACIONES AUSENTES
→ POSTING DE AJUSTE AUTORIZABLE
```

Ninguna mitad incompleta de la segunda decisión puede ser completada por nombre de cargo, jerarquía, dispositivo, URL, sede seleccionada o acceso de lectura.

#### 3. PermissionKey activas exactas

El catálogo vigente contiene exactamente las dos capacidades atómicas del frente:

```text
nexo.inventory.adjustments.view
nexo.inventory.adjustments.register
```

Ambas permanecen `active`.

No existe autorización canónica para registro mediante una clave amplia `nexo.inventory.adjustments` ni mediante permisos de stock, conteos o movimientos.

#### 4. Modalidad de consulta

`nexo.inventory.adjustments.view` conserva:

```text
BASE_OR_OPERATIONAL
```

Un carril base completo o un carril operacional completo pueden satisfacer la consulta dentro de su propio alcance. Los dos carriles se evalúan por separado y no se mezclan para fabricar autoridad que ninguno tenga por sí mismo.

El alcance máximo continúa territorializado por sede, área, ubicación, producto, lote o recurso persistido aplicable.

#### 5. Concesiones base de consulta vigentes

El dataset base vigente contiene grants `DIRECT_BASE` de `nexo.inventory.adjustments.view` para:

| Rol base | Alcance contractual resumido |
| --- | --- |
| `propietario` | Organización productiva ordinaria dentro del alcance global base permitido. |
| `gerente_general` | Organización productiva ordinaria dentro del alcance global base permitido. |
| `gerente` | Sedes o áreas pertenecientes a su cobertura administrativa activa. |
| `supervisor` | Sedes o áreas pertenecientes a su cobertura administrativa activa. |
| `auxiliar_administrativa` | Recursos vinculados a sedes o áreas asignadas o atendidas dentro del proceso administrativo autorizado. |
| `contador` | Evidencia transaccional de inventario de sedes ordinarias para conciliación, valoración y trazabilidad financiera. |

La consulta nunca concede registro ni ejecución física.

#### 6. Concesiones operacionales de consulta vigentes

El dataset operacional vigente contiene grants `DIRECT_OPERATIONAL` de `nexo.inventory.adjustments.view` para:

| Rol operacional | Contexto | Límite |
| --- | --- | --- |
| `bodeguero` | `CTX-WH-ADJUSTMENTS-READ` | Ajustes finalizados que afecten stock bajo custodia de la bodega activa; durante conteos ciegos no expone existencias teóricas, variaciones ni información que sesgue la observación. |
| `gerencia_operativa` | `CTX-MGR-INVENTORY-CONTROL` | Entradas o ajustes que afecten la sede activa, con actor, documento, motivo, estado y trazabilidad; no amplía por sí sola la capacidad de registrar. |

Un rol operacional distinto no recibe consulta por analogía.

#### 7. Modalidad de registro

`nexo.inventory.adjustments.register` conserva:

```text
BASE_AND_OPERATIONAL
```

La acción exige simultáneamente un componente base válido y un componente operacional válido. Ninguno sustituye al otro.

La decisión efectiva es la intersección de ambos alcances y del contexto real del recurso. Si la intersección es vacía o no puede demostrarse, la acción se deniega.

#### 8. Componentes base de registro vigentes

El dataset base vigente contiene exactamente estos `BASE_COMPONENT` para `nexo.inventory.adjustments.register`:

| Rol base | Alcance del componente |
| --- | --- |
| `propietario` | `G(B)` para el componente base; ejecución limitada por la intersección con el contexto operacional real. |
| `gerente_general` | `G(B)` para el componente base; ejecución limitada por la intersección con el contexto operacional real. |
| `gerente` | Sedes o áreas asignadas; ejecución sobre un recurso concreto dentro del contexto operacional compatible. |

La concesión base aislada nunca ejecuta un ajuste.

#### 9. Componente operacional de registro vigente

El dataset operacional vigente contiene un único componente operacional para `nexo.inventory.adjustments.register`:

```text
gerencia_operativa
```

Su contexto es:

```text
CTX-MGR-DOUBLE-ADJUSTMENT
```

El componente se limita al inventario de la sede o área activa y exige, además del componente base compatible, diferencia documentada, motivo, turno y check-in activos, reautenticación y auditoría reforzada.

#### 10. Composiciones ordinarias actualmente posibles

Con los datasets vigentes, la capacidad de registro solo puede completarse mediante una de estas composiciones de carril:

| Componente base | Componente operacional requerido | Resultado potencial |
| --- | --- | --- |
| `propietario` | `gerencia_operativa` | Autorizable únicamente dentro de la intersección efectiva y si todas las demás precondiciones pasan. |
| `gerente_general` | `gerencia_operativa` | Autorizable únicamente dentro de la intersección efectiva y si todas las demás precondiciones pasan. |
| `gerente` | `gerencia_operativa` | Autorizable únicamente dentro de la intersección efectiva y si todas las demás precondiciones pasan. |

No se crea una concesión completa nueva en ningún dataset. La composición se resuelve en runtime a partir de los componentes canónicos vigentes.

#### 11. Frontera de `bodeguero`

`bodeguero` puede consultar ajustes finalizados de la bodega activa y puede detectar o documentar diferencias dentro de sus procesos propietarios.

No posee componente operacional de `nexo.inventory.adjustments.register` y no puede corregir stock unilateralmente.

Contar, recibir, preparar, observar una diferencia, escanear un producto o custodiar una ubicación no elevan al bodeguero a autoridad de ajuste.

#### 12. Frontera con roles base sin componente de registro

`supervisor`, `auxiliar_administrativa` y `contador` pueden tener consulta base conforme a sus alcances, pero el dataset base vigente no les concede componente de `nexo.inventory.adjustments.register`.

La consulta de evidencia, la supervisión o la conciliación financiera no permiten publicar un delta de inventario.

#### 13. Reautenticación y dispositivo

La clasificación de dispositivo vigente exige:

```text
nexo.inventory.adjustments.view     → STANDARD
nexo.inventory.adjustments.register → STRONG
```

El soporte `STRONG` es un límite adicional y nunca una fuente de autoridad. Un dispositivo compatible no crea componente base, componente operacional, turno, check-in, territorio, caso ni decisión.

#### 14. Recurso protegido

El recurso de registro es:

```text
INVENTORY_ADJUSTMENT
```

Antes de autorizar una mutación, el servidor debe resolver un borrador o expediente que identifique como mínimo:

- stock objetivo;
- sede;
- área cuando aplique;
- LOC cuando aplique;
- posición cuando aplique;
- producto;
- presentación, lote, condición o LPN cuando apliquen;
- cantidad y UOM;
- motivo;
- fuente causal;
- territorio;
- versión;
- estado de investigación y decisión.

El ajuste actúa sobre stock empresarial y no sobre un recurso "propiedad" del actor.

#### 15. Intersección territorial

Para registro se aplica:

```text
ALCANCE EFECTIVO
=
ALCANCE BASE
∩
CONTEXTO OPERACIONAL
∩
TERRITORIO REAL DEL RECURSO
```

La intersección debe contener la sede, área y alcance físico del stock afectado. No se permiten ajustes globales por inferencia, ajustes masivos multisede ni recursos cuyo territorio no pueda resolverse de forma determinista.

#### 16. Revalidación server-side obligatoria

Toda creación, claim, investigación, revisión, aprobación, posting, consulta sensible, compensación o reversa debe revalidar según corresponda:

- principal técnico;
- actor efectivo;
- sesión humana;
- rol base efectivo;
- rol operacional efectivo;
- grants exactos de ambos carriles;
- turno;
- check-in;
- sede;
- área;
- dispositivo;
- soporte de reautenticación;
- territorio;
- recurso;
- acción;
- versión;
- policy;
- denegaciones y revocaciones vigentes.

Los valores enviados por el cliente son intención y selección, no autoridad.

#### 17. Fuentes que no autorizan registro

No autorizan un ajuste por sí solas:

```text
nexo.access
nexo.inventory.stock
nexo.inventory.counts
nexo.inventory.movements
nexo.inventory.adjustments.view
rol base aislado
rol operacional aislado
nombre de cargo
sede seleccionada
URL directa
pantalla visible
navegacion
scanner
codigo de producto
LOC visible
diferencia observada
conteo cerrado
recepcion confirmada
movimiento previo
dispositivo STRONG
```

Toda ausencia o incompatibilidad produce `DEFAULT_DENY` o indisponibilidad técnica según la causa propietaria; nunca un fallback permisivo.

#### 18. Separación entre observación, diferencia y ajuste

La secuencia empresarial mantiene fronteras explícitas:

```text
OBSERVACION
→ DIFERENCIA
→ INVESTIGACION
→ PROPUESTA
→ DECISION
→ INTENCION DE POSTING
→ POSTING
→ VERIFICACION
→ CIERRE
```

Observar o calcular una diferencia no modifica stock. La investigación no concede aprobación. Una aprobación no ejecuta por sí sola el posting. El posting no elimina la historia de la diferencia ni sustituye la verificación posterior.

#### 19. Segregación de funciones

Solicitante, contador e investigador no pueden aprobar el mismo expediente cuando la policy exige independencia.

La misma persona puede participar en varias funciones únicamente cuando cada función tenga autoridad explícita, contexto compatible y la regla de segregación aplicable no lo prohíba.

Cuando el actor haya participado en el hecho origen y la policy requiera independencia, no puede aprobar, certificar ni cerrar su propia diferencia o ajuste.

#### 20. Expediente versionado

Cada ajuste debe existir como expediente versionado con, como mínimo:

- candidato;
- fuente;
- sujeto;
- cutoff;
- balance;
- claim;
- investigación;
- propuesta;
- decisión;
- posting;
- cierre.

Una misma línea fuente no puede tener dos expedientes activos equivalentes. Las versiones son append-only y las transferencias o expiraciones de claim no conceden aprobación.

#### 21. Investigación y policy

La investigación conserva:

- causa raíz;
- ventana de movimientos;
- alternativas;
- disposición propuesta;
- razón estructurada;
- evidencia clasificada;
- digest;
- responsable;
- SLA;
- snapshot de policy.

Umbrales de cantidad, valor, riesgo, separación, autoridad y expiración proceden de policy versionada. Ausencia o ambigüedad bloquean la decisión.

#### 22. Cantidad, UOM y signo

El sujeto y alcance se resuelven en servidor.

La variación candidata se calcula en el cutoff autorizado como:

```text
candidate_variance = observed - expected
```

El efecto permitido es el delta firmado de la decisión aprobada, no un saldo final enviado por el cliente.

El balance posterior se deriva del ledger:

```text
balance_after = ledger_balance_before + approved_delta
```

No se distribuye cantidad entre sede, LOC, posición, presentación, lote o LPN por inferencia y no se aplica clamp silencioso a cero.

#### 23. Decisión de ajuste

Toda propuesta cuantitativa produce una decisión inmutable:

```text
APPROVED
```

o:

```text
REJECTED
```

La decisión conserva versión de caso y propuesta, delta, scope, policy, autoridad, evidencia de segregación, razón, `issued_at` y expiración.

Un cambio de fuente, sujeto, policy, evidencia, secuencia o TTL invalida la decisión antes del posting. La autoridad no puede ampliar el payload después de aprobarlo.

#### 24. Intención, idempotencia y resultado desconocido

El posting persiste antes del efecto:

- intención;
- idempotency key;
- fingerprint;
- versión de caso;
- decision receipt;
- referencias de fuente;
- sujeto;
- scope;
- delta;
- UOM;
- precondiciones.

La misma clave y el mismo payload devuelven el mismo resultado. La misma clave con payload distinto produce conflicto. Un timeout o resultado desconocido se reconcilia antes de repetir.

#### 25. Publicador autoritativo

Solo el command boundary del ledger puede publicar el ajuste cuantitativo.

La interfaz, formularios, conteos, endpoints legacy y RPC heredados no son escritores alternos y deben producir cero inserts directos al ledger objetivo y cero actualizaciones manuales de proyecciones cuando la materialización canónica esté activa.

Group, legs, sequence, posting receipt y outbox comparten una única frontera lógica y el decision receipt se consume una sola vez.

#### 26. Proyecciones de stock

Stock por sede, LOC, posición, presentación y demás vistas derivadas son proyecciones del ledger, no fuentes independientes de verdad para el ajuste.

Una divergencia se repara mediante replay, rebuild o procedimiento propietario idempotente. No se crea un movimiento ficticio para cuadrar una proyección y no se usa `DELETE`, read-modify-write o zeroing silencioso como reparación contractual.

#### 27. Costo y valoración

La autoridad para modificar cantidad permanece separada de valoración.

Un incremento consume policy y fuente económica autorizadas. Una disminución aplica el método vigente. El usuario no ingresa libremente un costo como autoridad.

Una corrección exclusivamente de costo produce cero legs de cantidad. Si un consumidor de valoración falla después de un leg cuantitativo confirmado, el leg no se repite.

#### 28. Ajustes masivos

Un ajuste masivo exige batch, scope snapshot, digest, cantidad esperada de líneas, líneas y versiones, policy, estrategia de decisión, atomicidad, idempotency key y fingerprint.

Vaciar un LOC requiere cobertura completa y ceros explícitos. No se ejecuta con catálogo parcial ni mediante un loop cliente que convierta una intención en múltiples efectos no coordinados.

Atomicidad o parcialidad deben quedar declaradas y los reintentos deduplicados.

#### 29. Corrección y reversa

Antes del posting solo pueden anularse expedientes o intenciones cuya ausencia de efecto esté demostrada.

Después del posting no se modifica ni elimina el hecho original. Una corrección abre un expediente nuevo, calcula saldo compensable, exige la autoridad independiente aplicable y publica un grupo compensatorio.

Original, compensación, saldo remanente, receipts y proyecciones permanecen trazables.

#### 30. Frontera con conteos

Un conteo es observación y no autorización de ajuste.

El conteo ciego no expone expected, delta, valor ni señales de conciliación antes de certificar la observación. Una diferencia derivada de conteo puede producir un candidato versionado, pero debe atravesar investigación, decisión y posting de ajuste.

`NEXO-AUTH-011` no absorbe `NEXO-AUTH-012 — Proteger conteos`.

#### 31. Frontera con recepción y diferencias

Una diferencia detectada en recepción puede originar un caso o candidato, pero confirmar recepción no concede `nexo.inventory.adjustments.register`.

Recepción, cuarentena, faltante, sobrante, daño, rechazo y retorno conservan sus propios hechos. El ajuste solo consume un handoff causal válido cuando la policy y el proceso propietario permitan convertir la diferencia en una propuesta cuantitativa.

#### 32. Frontera con movimientos

`nexo.inventory.movements` y cualquier permiso de consulta del ledger no conceden ajuste.

Cuando una discrepancia corresponde realmente a traslado, reubicación, reversa de movimiento u otra operación propietaria, se usa ese proceso y no un ajuste genérico para ocultar la causa.

`NEXO-AUTH-013 — Proteger movimientos` permanece propietario de su autorización específica.

#### 33. AS-IS verificado en `vento-nexo`

El snapshot remoto `f0a12557a1a258c84b025933653dc756de4b5a59` conserva una implementación que todavía debe converger al contrato aprobado.

**Superficie de ajuste**

- `src/app/inventory/adjust/page.tsx` invoca `requireAppAccess` con `permissionCode = "inventory.adjustments"`;
- `normalizePermissionCode` convierte ese valor en `nexo.inventory.adjustments`, que no corresponde a ninguna de las dos PermissionKey activas exactas del catálogo vigente;
- la selección de sedes usa además el nombre de rol y concede todas las sedes activas a `propietario`, `gerente_general` y `contador` en esa superficie;
- la consulta inicial de productos usa un corte fijo de 500 y solo rescata omitidos que ya presentan stock positivo en los alcances consultados.

**Endpoint de escritura**

- `src/app/api/inventory/adjust/route.ts` autentica al usuario, pero el caller no demuestra la composición exacta `BASE_AND_OPERATIONAL` antes de escribir;
- acepta sede, LOC, posición, producto, delta o conteo, costo unitario, motivo y evidencia desde el payload;
- inserta directamente `inventory_movements`;
- actualiza por separado proyecciones de stock de sede, LOC y posición;
- puede ejecutar reconciliación de ceros y actualizaciones separadas;
- puede actualizar costo del producto y crear un evento de costo en escrituras posteriores;
- no materializa en el caller un expediente, proposal versionada, decision receipt, idempotency key, fingerprint ni reconciliación de resultado desconocido.

**Ajuste derivado de conteo**

- `src/app/api/inventory/count-initial/approve/route.ts` y `src/app/inventory/count-initial/session/[id]/page.tsx` invocan `apply_inventory_count_adjustments`;
- ese camino deberá converger sin transformar la aprobación de un conteo en autoridad implícita ni conservar un segundo escritor de ajustes.

La existencia de RLS, grants o funciones de base subyacentes no sustituye la revalidación contractual exigida al boundary autoritativo.

#### 34. Convergencia física posterior

La implementación futura pertenece al paquete ya vinculado por el contrato funcional:

```text
GAP-PKG-096
```

y deberá hacer converger, como mínimo:

- superficie `/inventory/adjust`;
- formulario de ajuste;
- endpoint de ajuste;
- aprobación de conteos;
- `apply_inventory_count_adjustments`;
- ledger de movimientos;
- proyecciones de stock;
- reconciliación de ceros;
- valoración y costo;
- RLS;
- grants;
- observabilidad;
- rollback.

La convergencia elimina escritores directos o duplicados y hace que cada efecto cuantitativo nazca del command boundary autorizado.

#### 35. Ownership de Supabase

Toda futura modificación de Supabase necesaria para materializar este contrato pertenece exclusivamente a `vento-group-sas/vento-shell`, incluidas:

- migraciones;
- tablas;
- funciones y RPC;
- triggers;
- grants;
- RLS;
- outbox;
- tipos generados;
- compatibilidad;
- rollback;
- pruebas de base de datos.

Esta tarea no ejecuta cambios Supabase.

#### 36. Materialización física posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto, este marcador global no autoriza código ni infraestructura. Cada materialización futura utiliza:

```text
NEXO-AUTH-011::<implementation_unit_id>
```

y solo puede ejecutarse cuando el paquete propietario aplicable tenga `E5-GATE-008::<package_id> = PASS`, exista lineage válido y se otorgue autorización física explícita.

#### 37. Validaciones funcionales heredadas

La futura implementación conserva la matriz ya aprobada:

```text
ADJ-VAL-001 ... ADJ-VAL-048
```

La cobertura incluye autorización, segregación, fuentes, expediente, investigación, decisión, scope, UOM, posting, ledger, proyecciones, valoración, bulk, reversa, estados de interfaz, superficies y convergencia técnica.

Esta tarea no redefine esas cuarenta y ocho comprobaciones.

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea especializa la autorización del flujo de ajustes ya diseñado y ya cubierto por requisitos canónicos; no introduce una obligación verificable nueva ni cambia una fila existente del registro.

#### 39. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-NEXO-002`;
- `TREQ-NEXO-011`;
- `TREQ-NEXO-058`;
- `TREQ-NEXO-071`;
- `TREQ-NEXO-072`;
- `TREQ-NEXO-076` a `TREQ-NEXO-080`;
- `TREQ-NEXO-217` a `TREQ-NEXO-230`;
- `TREQ-NEXO-253`;
- `TREQ-NEXO-268`;
- `TREQ-NEXO-270`;
- `TREQ-NEXO-290`;
- `TREQ-SUPABASE-002`.

Estas referencias son trazabilidad heredada y no modifican el Registro 04A.

#### 40. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | El marcador define un contrato documental y no compila ni despliega producto. |
| LOCAL | NOT_EXECUTED | La incorporación, normalización canónica, quality, delivery y batería global corresponden al lifecycle documental cuando la tarea anterior haya cerrado y este artefacto sea autorizado por el usuario. |
| REMOTA | PASS | Se verificaron en `vento-shell` el catálogo activo de PermissionKey, modalidades `BASE_OR_OPERATIONAL` y `BASE_AND_OPERATIONAL`, datasets base y operacional de grants, contrato de recurso, clasificación STRONG, topología `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`, cobertura vigente del Registro 04A y vínculo `GAP-PKG-096`; se verificó además `vento-nexo` en `f0a12557a1a258c84b025933653dc756de4b5a59` para la superficie, endpoint y camino de ajustes derivados de conteo. El remoto documental aún conserva a `NEXO-AUTH-010` como marcador pendiente; la continuidad de esta tarea consume la versión completa de `NEXO-AUTH-010` aprobada por el usuario bajo el modo documental adelantado vigente. |
| OPERATIVA | NOT_APPLICABLE | No se investiga, aprueba, publica, compensa ni revierte un ajuste real de inventario. |
| FÍSICA | NOT_APPLICABLE | No se crea ni autoriza `NEXO-AUTH-011::<implementation_unit_id>` durante este marcador global. |

#### 41. Criterios de aceptación

- [x] `nexo.inventory.adjustments.view` y `nexo.inventory.adjustments.register` son las PermissionKey activas exactas del frente;
- [x] consulta conserva `BASE_OR_OPERATIONAL` y cada carril completo se evalúa por separado;
- [x] registro conserva `BASE_AND_OPERATIONAL` y exige ambos carriles simultáneamente;
- [x] los componentes base vigentes de registro pertenecen a `propietario`, `gerente_general` y `gerente`;
- [x] el componente operacional vigente de registro pertenece a `gerencia_operativa`;
- [x] `bodeguero` conserva consulta y detección de diferencias, pero no registro unilateral;
- [x] `supervisor`, `auxiliar_administrativa` y `contador` no reciben componente base de registro por tener consulta;
- [x] el alcance efectivo de registro es la intersección de carril base, contexto operacional y territorio real del recurso;
- [x] la acción exige turno, check-in, motivo, diferencia documentada y auditoría reforzada;
- [x] el registro exige soporte de reautenticación `STRONG` sin convertir al dispositivo en autoridad;
- [x] stock, conteos, movimientos, lectura, cargo, URL, scanner o diferencia observada no sustituyen la PermissionKey de registro;
- [x] conteo, diferencia, investigación, decisión y posting permanecen etapas distintas;
- [x] solicitante, contador o investigador no autoaprueban cuando la policy exige independencia;
- [x] el expediente y sus decisiones son versionados y append-only;
- [x] cantidad, UOM, signo y balance se derivan en servidor y no desde un saldo final enviado por cliente;
- [x] el posting es idempotente y reconcilia resultados desconocidos antes de reintentar;
- [x] solo el command boundary del ledger publica el efecto cuantitativo;
- [x] las proyecciones no son escritores independientes de stock;
- [x] valoración y cantidad permanecen separadas y no se acepta costo libre como autoridad;
- [x] bulk, compensación y reversa conservan sus contratos de atomicidad e historia;
- [x] `NEXO-AUTH-012` mantiene la autorización de conteos separada;
- [x] `NEXO-AUTH-013` mantiene la autorización de movimientos separada;
- [x] el AS-IS amplio y multi-write queda identificado como brecha de convergencia y no como semántica objetivo;
- [x] la futura implementación se vincula a `GAP-PKG-096` y conserva `ADJ-VAL-001` a `ADJ-VAL-048`;
- [x] toda modificación Supabase futura pertenece a `vento-shell`;
- [x] la topología es `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 42. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia el catálogo de PermissionKey;
- cambia matrices de rol;
- ejecuta un ajuste real;
- publica movimientos reales;
- cambia stock real;
- actualiza costo real;
- aprueba un conteo real;
- compensa o revierte un movimiento real;
- crea un expediente real;
- crea una decisión real;
- crea una instancia física;
- autoriza una instancia física;
- modifica el Registro 04A.

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-010 — Proteger recepción`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-011 — Proteger ajustes de inventario`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-012 — Proteger conteos`
### ✅ NEXO-AUTH-012 — Proteger conteos

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-011 — Proteger ajustes de inventario
**Tarea siguiente:** NEXO-AUTH-013 — Proteger movimientos
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger consulta, ejecución, observación, cierre, investigación y resolución de conteos mediante las PermissionKey activas `nexo.inventory.stock_counts.view`, `nexo.inventory.stock_counts.perform`, `nexo.inventory.initial_counts.view`, `nexo.inventory.stock_count_variances.approve` y `nexo.inventory.stock_count_variances.resolve`, preservando conteo ciego, segregación contador/investigador/aprobador, snapshots, claims, receipts append-only, idempotencia, cutoff de ledger y frontera estricta con ajustes
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-012::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger de extremo a extremo el ciclo de conteos de inventario para que crear, consultar, asignar, reclamar, capturar, guardar, cerrar, investigar, aprobar o resolver diferencias dependa de capacidades exactas, actor, sesión humana, función, territorio, recurso, finalidad, versión y claim verificables, sin convertir el conteo en ajuste, movimiento, reconciliación automática, exposición prematura del expected ni publicación de stock.

#### 2. Resultado contractual

El frente se divide en decisiones autorizantes distintas.

Consulta:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ PermissionKey nexo.inventory.stock_counts.view
+ UN CARRIL COMPLETO BASE U OPERACIONAL
+ TERRITORIO Y RECURSO COMPATIBLES
+ ETAPA Y CAMPOS VISIBLES COMPATIBLES
+ DENEGACIONES AUSENTES
→ CONSULTA AUTORIZABLE
```

Ejecución física del conteo:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ SESION HUMANA ATRIBUIDA
+ PermissionKey nexo.inventory.stock_counts.perform
+ CARRIL OPERACIONAL VALIDO
+ TURNO Y CHECK-IN CUANDO APLIQUEN
+ DISPOSITIVO Y TERRITORIO VALIDOS
+ WORK ITEM + RONDA + CLAIM VIGENTES
+ SCOPE SNAPSHOT VIGENTE
+ POLICY DE CONTEO VIGENTE
+ VERSIONES ESPERADAS
+ DENEGACIONES AUSENTES
→ CAPTURA AUTORIZABLE
```

Aprobación o resolución de una diferencia:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ PermissionKey exacta de varianza
+ COMPONENTE BASE VALIDO
+ COMPONENTE OPERACIONAL VALIDO
+ MISMO ACTOR Y MISMO RECURSO
+ INTERSECCION TERRITORIAL NO VACIA
+ SEGREGACION RESPECTO DEL CONTADOR
+ MOTIVO + EVIDENCIA + AUDITORIA
+ CASO Y VERSION VIGENTES
+ DENEGACIONES AUSENTES
→ DECISION SOBRE VARIANZA AUTORIZABLE
```

Ninguna de estas decisiones sustituye a las demás.

#### 3. PermissionKey activas exactas

El catálogo vigente conserva activas:

```text
nexo.inventory.stock_counts.view
nexo.inventory.stock_counts.perform
nexo.inventory.initial_counts.view
nexo.inventory.stock_count_variances.approve
nexo.inventory.stock_count_variances.resolve
```

La clave amplia:

```text
nexo.inventory.counts
```

no es una PermissionKey activa y no puede autorizar runtime, RLS, RPC, navegación ni mutaciones.

#### 4. Consulta de conteos

`nexo.inventory.stock_counts.view` conserva modalidad:

```text
BASE_OR_OPERATIONAL
```

La consulta puede satisfacerse por un carril base completo o por un carril operacional completo, evaluados de forma independiente.

El permiso no concede ejecución, cierre, aprobación de diferencias, resolución, ajuste ni publicación de stock.

Antes de la certificación de una observación ciega, la consulta no puede exponer expected, diferencia, cantidad previa, valor, alerta derivada ni pista de conciliación fuera de la etapa autorizada.

#### 5. Ejecución de conteos

`nexo.inventory.stock_counts.perform` conserva modalidad:

```text
OPERATIONAL_ONLY
```

El dataset vigente contiene concesión operacional directa para `bodeguero` bajo `CTX-WH-COUNT-PERFORM`.

La capacidad permite capturar y enviar cantidades físicas en sesiones válidas de la bodega activa. No concede:

- aprobar diferencias;
- resolver diferencias;
- ajustar stock;
- reabrir sesiones cerradas;
- alterar observaciones confirmadas de otro actor;
- publicar movimientos de inventario.

#### 6. Consulta de conteos iniciales

`nexo.inventory.initial_counts.view` conserva modalidad:

```text
BASE_OR_OPERATIONAL
```

Es una capacidad de lectura de sesiones de conteo inicial. No concede ejecución ni aplicación de diferencias.

Su permanencia en el catálogo no reautoriza la clave legacy `nexo.inventory.counts` ni permite reutilizarla como writer de conteos.

#### 7. Aprobación de varianzas

`nexo.inventory.stock_count_variances.approve` conserva modalidad:

```text
BASE_AND_OPERATIONAL
```

El componente base existe para:

```text
propietario
gerente_general
gerente
```

El componente operacional vigente existe para:

```text
gerencia_operativa
```

Ningún componente autoriza por sí solo. La decisión exige coincidencia del mismo actor, mismo permiso, mismo recurso, contexto compatible y segregación frente al actor que capturó el conteo.

#### 8. Resolución de varianzas

`nexo.inventory.stock_count_variances.resolve` conserva modalidad:

```text
BASE_AND_OPERATIONAL
```

La composición autorizante usa los mismos componentes base y operacional de la aprobación, pero resolver no es sinónimo de aprobar ni de publicar ajuste.

Toda resolución debe conservar causa, evidencia, decisión, actor, recurso, territorio, versión y auditoría.

#### 9. Segregación de funciones

Se mantienen separados como mínimo:

```text
CONTADOR
!=
INVESTIGADOR
!=
APROBADOR DE VARIANZA
!=
RESOLUTOR DE VARIANZA
!=
PUBLICADOR DE AJUSTE
```

El actor que captura una observación no puede aprobar o resolver su propia diferencia cuando la política exige segregación.

La autoridad jerárquica o acceso de lectura no elimina esta frontera.

#### 10. Denegación por defecto

No autorizan por sí solos un conteo ni una decisión sobre varianza:

```text
nexo.access
nexo.inventory.stock
nexo.inventory.counts
nexo.inventory.stock_counts.view
nexo.inventory.initial_counts.view
nexo.inventory.adjustments.view
rol o cargo
sede seleccionada
URL directa
QR
scanner
LOC visible
stock visible
sesion visible
estado open o closed
all_sites
dispositivo compartido
```

Cada acción exige su PermissionKey exacta y contexto compatible. Toda ausencia produce `DEFAULT_DENY`.

#### 11. Recurso y territorio

La autorización se resuelve sobre el recurso exacto del conteo y no sobre una sede abstracta.

El servidor debe poder resolver, según corresponda:

- `count_id` o identidad canónica equivalente;
- work item;
- ronda;
- sesión;
- claim;
- sede;
- área;
- LOC;
- posiciones incluidas;
- sujetos incluidos;
- política;
- propósito;
- scope snapshot;
- versiones;
- actor asignado;
- dispositivo;
- estado y etapa.

El territorio del recurso debe quedar contenido en la cobertura del actor y del carril autorizante aplicable.

#### 12. Fuente y work item

Todo conteo se origina en una de las fuentes canónicas aprobadas por `NEXO-UX-018` y materializa un work item identificable.

No se admite un conteo improvisado sin:

- fuente;
- tipo de sujeto;
- finalidad;
- ventana;
- policy;
- scope snapshot;
- expected line count;
- digest.

La selección manual de una pantalla o LOC no crea autoridad ni fuente empresarial.

#### 13. Snapshot de alcance

Antes de capturar se persiste un snapshot inmutable con el alcance admitido, incluyendo sujetos, ubicaciones, posiciones, versiones de catálogo, reglas de inclusión/exclusión y digest.

Un cambio posterior del maestro no reescribe la sesión ya abierta.

Un alcance parcial es válido únicamente si la regla de parcialidad fue declarada antes de observar.

#### 14. Rondas, sesión y claim

Cada work item puede producir rondas independientes.

Cada ronda conserva al menos:

- asignación;
- actor;
- sesión humana;
- dispositivo;
- claim único;
- heartbeat;
- policy;
- versión.

Pausa, expiración, transferencia, revocación, cambio de actor o cambio territorial cierran o invalidan el claim sin borrar receipts previamente confirmados.

#### 15. Política de conteo ciego

El inventario usa por defecto:

```text
BLIND_QUANTITY
```

Los activos pueden usar:

```text
IDENTITY_GUIDED_QUANTITY_BLIND
```

`GUIDED_VERIFICATION` requiere una política, versión y razón excepcionales explícitas.

En modo ciego, expected, diferencia, cantidad previa, valor o alertas derivadas no pueden filtrarse mediante HTML, caché, respuesta de red, exportación, UI, logs visibles o precarga del formulario.

#### 16. Observaciones append-only

Cada observación confirmada es append-only y conserva, cuando aplique:

- sujeto;
- identidad;
- LOC;
- posición;
- cantidad cruda;
- UOM;
- perfil;
- factor;
- cantidad base;
- precisión;
- condición;
- evidencia;
- actor;
- dispositivo;
- tiempos;
- versión;
- fingerprint;
- receipt.

Una corrección previa al cierre crea una nueva versión enlazada; no sobrescribe silenciosamente la observación anterior.

#### 17. Cero, vacío, inesperado y omisión

Se conserva semántica separada:

```text
VACIO = PENDIENTE
CERO = OBSERVACION CONFIRMADA EN CERO
NO OBSERVADO != FALTANTE AUTOMATICO
INESPERADO = LINEA SEPARADA PENDIENTE DE CLASIFICACION
```

Un inesperado no se agrega automáticamente a stock ni al catálogo.

Una omisión permanece dentro de la cobertura y no desaparece por cerrar la interfaz.

#### 18. Identidad y UOM

La captura conserva identidad física y UOM reproducibles.

La conversión a unidad base debe quedar gobernada por perfil y versión vigentes. Un cambio posterior de UOM o presentación no puede reescribir una observación histórica.

Scanner o QR identifican candidatos dentro de la sesión; no confirman cantidad ni autoridad por sí solos.

#### 19. Cutoff y expected reproducible

Cada observación online confirmada recibe un `observation_cutoff_sequence` autoritativo en la misma frontera de su receipt.

Expected se reconstruye desde:

```text
CHECKPOINT VERIFICADO
+ LEGS DEL LEDGER HASTA observation_cutoff_sequence
```

No se compara contra una proyección mutable tomada arbitrariamente al cerrar.

Un gap de ledger bloquea una diferencia definitiva y exige reconciliación o recuento.

#### 20. Concurrencia

Un movimiento concurrente no desaparece ni se absorbe silenciosamente en la diferencia.

Versiones esperadas, cutoff, scope digest, work item, ronda y receipt permiten distinguir:

- captura válida;
- cliente obsoleto;
- movimiento concurrente;
- resultado desconocido;
- conflicto de claim;
- necesidad de recuento.

#### 21. Alcance parcial y recuento

Un recuento crea una ronda nueva enlazada y conserva las rondas anteriores.

Cuando la policy exija independencia:

- se usa contador distinto;
- no se muestra la observación anterior;
- no se prellena la cantidad previa;
- no se promedian cantidades automáticamente;
- no se escoge silenciosamente un resultado.

Toda decisión entre rondas queda trazable.

#### 22. Idempotencia y receipts

Autosave y confirmación conservan como mínimo:

- productor;
- sesión;
- ronda;
- sujeto;
- versión;
- idempotency key;
- fingerprint;
- expected versions;
- scope digest;
- payload digest.

Misma key y mismo payload devuelven el mismo receipt. Misma key y payload distinto producen conflicto.

Un timeout obliga a consultar el resultado antes de repetir.

#### 23. Offline y sincronización

Offline puede conservar un borrador local no concluyente.

Offline no puede confirmar:

- claim;
- permiso;
- cutoff;
- cierre;
- varianza;
- ajuste;
- movimiento.

Al sincronizar se revalidan actor, sesión, territorio, recurso, policy, versiones, claim y PermissionKey exacta.

#### 24. Clasificación de diferencias

Las diferencias se clasifican como mínimo entre:

- ninguna;
- cantidad positiva;
- cantidad negativa;
- identidad;
- ubicación;
- condición;
- UOM;
- cobertura;
- ventana de movimientos;
- calidad de datos.

Una diferencia cuantitativa no borra una diferencia cualitativa.

#### 25. Investigación

Cada caso de diferencia conserva:

- work;
- sesión;
- rondas;
- sujeto;
- observed;
- expected;
- movimientos relevantes;
- evidencia;
- responsable;
- severidad;
- plazo;
- estado;
- resolución.

Conteos contienen y transfieren el caso; no resuelven automáticamente pérdida, daño, disposición, UOM, ubicación o causa.

#### 26. Frontera con ajustes

La frontera es estricta:

```text
CONTEO
→ OBSERVACION
→ EXPECTED REPRODUCIBLE
→ DIFERENCIA
→ INVESTIGACION / RECUENTO
→ CANDIDATO DOCUMENTADO

CANDIDATO DOCUMENTADO
!=
AJUSTE PUBLICADO
```

Crear, guardar, cerrar, anular o consultar un conteo produce cero inserts en `inventory_movements` y cero mutación de stock.

La publicación pertenece a `NEXO-AUTH-011` y al command boundary de ajustes.

#### 27. Frontera con aprobación y resolución de varianza

`stock_count_variances.approve` y `stock_count_variances.resolve` gobiernan decisiones sobre el expediente de diferencia.

No autorizan por sí solas:

- `adjustments.register`;
- posting al ledger;
- upserts directos de stock;
- modificación retroactiva de observaciones;
- cierre ficticio de una investigación incompleta.

#### 28. Frontera con movimientos

El conteo no crea movimientos autoritativos.

Cuando una decisión posterior requiera efecto cuantitativo, ese efecto se publica únicamente por el writer canónico correspondiente y produce su propio receipt.

`NEXO-AUTH-013 — Proteger movimientos` permanece como frontera posterior independiente.

#### 29. Corrección y anulación

Antes del cierre, corregir una observación produce una versión enlazada y conserva el original.

Después del cierre no existen UPDATE o DELETE destructivos sobre sesión, ronda, observación, cutoff o expected snapshot.

Un error posterior exige anulación documentada y, cuando proceda, nueva ronda. Cancelar una sesión conserva expediente y cero efecto cuantitativo.

#### 30. Consulta y exportación

Consulta y exportación revalidan PermissionKey, territorio, etapa y minimización de datos.

Una exportación no puede revelar expected o diferencias a un contador durante una etapa ciega.

Strings de rol, acceso general a stock o visibilidad de la sede no sustituyen `stock_counts.view`.

#### 31. Dispositivo compartido

Un dispositivo compartido no es el contador empresarial.

PIN, identidad técnica del equipo, sede configurada o scanner no sustituyen actor, sesión humana, turno, check-in, PermissionKey, claim ni relación con el work item.

Toda observación queda atribuida al actor efectivo.

#### 32. AS-IS verificado en `vento-nexo`

El snapshot remoto `f0a12557a1a258c84b025933653dc756de4b5a59` conserva una superficie de conteos iniciales todavía incompatible con el contrato objetivo.

En `src/app/inventory/count-initial/session/[id]/page.tsx`:

- `requireAppAccess` recibe `permissionCode: "inventory.counts"`;
- la normalización produce una clave amplia que no existe activa en el catálogo vigente;
- la pantalla lee `current_qty_at_open`, `current_qty_at_close`, `quantity_delta` y `adjustment_applied_at` junto con la observación;
- durante una sesión abierta calcula y muestra `current` y `delta`;
- la UI explica que el permiso `inventory.counts` permite crear, cerrar y aprobar;
- tras cerrar ofrece desde la misma superficie una acción para aprobar ajustes.

En `src/app/api/inventory/count-initial/approve/route.ts`:

- se valida usuario autenticado;
- se exige que la sesión esté `closed`;
- se invoca directamente `apply_inventory_count_adjustments`;
- el caller no demuestra la composición exacta `BASE_AND_OPERATIONAL`, segregación respecto del contador ni la separación conteo → investigación → decisión → ajuste exigida por este contrato.

Este estado es evidencia de convergencia pendiente; no es autoridad canónica.

#### 33. Convergencia técnica obligatoria

La futura materialización deberá:

- retirar `nexo.inventory.counts` como autorización runtime;
- usar `stock_counts.view` para lectura;
- usar `stock_counts.perform` para captura;
- preservar `initial_counts.view` como lectura específica;
- usar `stock_count_variances.approve` y `resolve` únicamente para sus decisiones exactas;
- impedir expected y delta durante conteo ciego;
- separar la acción de ajuste de la superficie de captura;
- introducir work item, ronda, claim, policy, snapshot y receipts conforme al contrato;
- eliminar el ajuste automático desde el flujo de conteos;
- conservar history append-only;
- hacer el expected reproducible desde ledger + cutoff;
- revalidar autorización en servidor y RLS.

#### 34. Modelo físico objetivo

La futura implementación debe hacer converger `inventory_count_sessions`, líneas, entries, work items, rondas, observations, claims, receipts, casos de diferencia y proyecciones hacia un único modelo de verdad reproducible.

La sesión no será simultáneamente observación física, decisión de varianza y writer de ajuste.

#### 35. Ownership de Supabase

Toda futura modificación de:

- tablas;
- RPC;
- RLS;
- grants;
- funciones;
- triggers;
- tipos;
- migraciones;
- outbox;
- políticas de idempotencia;
- rollback;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Esta tarea no ejecuta cambios Supabase.

#### 36. Materialización física posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador global no autoriza código ni infraestructura.

Cada materialización futura usa:

```text
NEXO-AUTH-012::<implementation_unit_id>
```

solo después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

#### 37. Paquete y convergencia futura

La cobertura vigente vincula el frente de conteos a:

```text
GAP-PKG-096
```

La futura implementación debe consumir el handoff de `NEXO-UX-018`, respetar la frontera con `NEXO-UX-019` y ejecutar la transición sin reabrir decisiones documentales ya aprobadas.

#### 38. Validaciones funcionales heredadas

La futura implementación conserva la matriz:

```text
CNT-VAL-001 ... CNT-VAL-048
```

y los inventarios contractuales de `NEXO-UX-018`, incluyendo veinticuatro artefactos, veinticuatro pasos, veintidós estados empresariales/técnicos, treinta estados de interfaz, ocho colas, diez fuentes y catorce superficies.

Esta tarea no redefine esos conjuntos.

#### 39. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La autorización de conteos especializa capacidades y fronteras ya cubiertas por requisitos vigentes sin crear una obligación verificable nueva.

#### 40. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-011`;
- `TREQ-NEXO-011`;
- `TREQ-NEXO-203` a `TREQ-NEXO-216`;
- cobertura relacionada de `NEXO-UX-018`, `NEXO-UX-019`, `NEXO-UX-021`, `NEXO-UX-022` y `NEXO-UX-023` a `NEXO-UX-025`.

Estas referencias son trazabilidad heredada y no modifican filas del Registro 04A.

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | El marcador define un contrato documental y no compila ni despliega producto. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido incorporado al checkout local de `NEXO-AUTH-012`; formato, quality, delivery y batería global corresponden al lifecycle documental posterior al reemplazo. |
| REMOTA | PASS | Se verificaron `vento-shell` en `12c3dc277e1c56612d851ca707d493ebeb2af87f`, catálogo activo, grants base y operacionales, `NEXO-UX-018`, `TREQ-NEXO-203..216`, topología `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`, y `vento-nexo` en `f0a12557a1a258c84b025933653dc756de4b5a59` para la superficie y endpoint actuales de conteos. |
| OPERATIVA | NOT_APPLICABLE | No se ejecuta un conteo real, no se aprueba una varianza real, no se ajusta stock y no se publica movimiento real. |
| FÍSICA | NOT_APPLICABLE | No se crea ni autoriza `NEXO-AUTH-012::<implementation_unit_id>` durante este marcador global. |

#### 42. Criterios de aceptación

- [x] `nexo.inventory.counts` queda identificado como clave legacy no activa y no autorizante;
- [x] lectura usa `nexo.inventory.stock_counts.view` con `BASE_OR_OPERATIONAL`;
- [x] ejecución usa `nexo.inventory.stock_counts.perform` con `OPERATIONAL_ONLY`;
- [x] conteos iniciales conservan `nexo.inventory.initial_counts.view` solo para lectura;
- [x] `stock_count_variances.approve` y `resolve` conservan `BASE_AND_OPERATIONAL`;
- [x] la composición doble exige componente base y operacional del mismo actor y recurso;
- [x] el contador no aprueba o resuelve su propia diferencia cuando la política exige segregación;
- [x] `bodeguero` puede ejecutar conteos solo dentro de su contexto operativo autorizado;
- [x] expected y delta permanecen ocultos durante `BLIND_QUANTITY`;
- [x] work item, scope snapshot, ronda, sesión y claim son explícitos;
- [x] observaciones confirmadas son append-only;
- [x] cero, vacío, no observado e inesperado tienen semántica distinta;
- [x] UOM y conversión histórica permanecen reproducibles;
- [x] cada observación online usa cutoff autoritativo;
- [x] expected se reconstruye desde ledger y cutoff;
- [x] recuentos crean rondas nuevas sin sobrescribir resultados previos;
- [x] autosave y confirmación son idempotentes;
- [x] offline no confirma autoridad ni efectos empresariales;
- [x] diferencias generan casos estructurados y no ajustes automáticos;
- [x] crear, guardar, cerrar o anular conteo produce cero movimientos y cero mutación de stock;
- [x] aprobar o resolver varianza no equivale a publicar ajuste;
- [x] la publicación de ajustes permanece bajo `NEXO-AUTH-011`;
- [x] movimientos autoritativos permanecen separados y reservados a `NEXO-AUTH-013`;
- [x] la futura convergencia elimina `apply_inventory_count_adjustments` del flujo directo de conteos;
- [x] la futura implementación ejecuta `CNT-VAL-001` a `CNT-VAL-048`;
- [x] toda modificación Supabase futura pertenece a `vento-shell`;
- [x] la topología es `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 43. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia el catálogo de PermissionKey;
- cambia matrices de rol;
- ejecuta un conteo real;
- crea un claim real;
- crea una observación real;
- cierra una sesión real;
- aprueba o resuelve una varianza real;
- ejecuta un ajuste real;
- publica movimientos reales;
- cambia stock real;
- cambia costos reales;
- corrige UOM real;
- modifica activos reales;
- crea una instancia física;
- autoriza una instancia física;
- modifica el Registro 04A.

#### 44. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-011 — Proteger ajustes de inventario`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-012 — Proteger conteos`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-013 — Proteger movimientos`
### ✅ NEXO-AUTH-013 — Proteger movimientos

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-012 — Proteger conteos
**Tarea siguiente:** NEXO-AUTH-014 — Proteger catálogo y configuraciones
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger consulta del ledger y traslados internos mediante las PermissionKey activas `nexo.inventory.movements.view`, `nexo.inventory.transfers.view` y `nexo.inventory.transfers.create`, preservando fuente causal, grupos y legs append-only, conservación cuantitativa, territorio, segregación entre lectura y escritura, idempotencia, receipts, secuencia autoritativa, reconciliación de proyecciones y frontera estricta con remisiones, conteos, ajustes y escritores propietarios
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-013::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger de extremo a extremo la consulta del ledger de inventario y la creación de traslados internos para que leer, filtrar, reconstruir, exportar, reubicar o transferir inventario dependa de capacidades exactas, actor, sesión, territorio, recurso, fuente, versión, intención y contexto verificables, sin convertir la vista de movimientos en writer genérico ni permitir que notas, aliases, roles, URLs, formularios o proyecciones mutables sustituyan causalidad, autorización o el command boundary propietario de cada proceso.

#### 2. Resultado contractual

La consulta del ledger y la creación de un traslado interno se resuelven de forma independiente.

Consulta de movimientos:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ PermissionKey nexo.inventory.movements.view
+ UN CARRIL COMPLETO BASE U OPERACIONAL
+ TERRITORIO Y RECURSO COMPATIBLES
+ FILTRO Y CAMPOS AUTORIZADOS
+ DENEGACIONES AUSENTES
→ CONSULTA DEL LEDGER AUTORIZABLE
```

Consulta de traslados:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ PermissionKey nexo.inventory.transfers.view
+ UN CARRIL COMPLETO BASE U OPERACIONAL
+ RELACION LEGITIMA CON ORIGEN O DESTINO
+ TERRITORIO COMPATIBLE
+ DENEGACIONES AUSENTES
→ CONSULTA DE TRASLADOS AUTORIZABLE
```

Creación de traslado interno:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ SESION HUMANA ATRIBUIDA
+ PermissionKey nexo.inventory.transfers.create
+ CARRIL OPERACIONAL VALIDO
+ TURNO Y CHECK-IN CUANDO APLIQUEN
+ SEDE Y AREA ACTIVAS
+ ORIGEN Y DESTINO AUTORIZADOS
+ MISMA SEDE Y AREA DE BODEGA
+ STOCK ELEGIBLE SUFICIENTE
+ UOM Y VERSIONES VALIDAS
+ INTENCION IDEMPOTENTE
+ DENEGACIONES AUSENTES
→ TRASLADO INTERNO AUTORIZABLE
```

Ninguna de estas decisiones sustituye a las demás.

#### 3. PermissionKey activas exactas

El catálogo vigente conserva activas:

```text
nexo.inventory.movements.view
nexo.inventory.transfers.view
nexo.inventory.transfers.create
```

No existen como PermissionKey activas:

```text
nexo.inventory.movements
nexo.inventory.transfers
nexo.inventory.movements.export
```

Estas claves amplias o hipotéticas no pueden autorizar runtime, RLS, RPC, navegación, exportación ni mutaciones.

#### 4. Consulta del ledger

`nexo.inventory.movements.view` conserva modalidad:

```text
BASE_OR_OPERATIONAL
```

Un carril base completo o un carril operacional completo pueden satisfacer la consulta dentro de sus propios límites. Los carriles se evalúan por separado y no se mezclan para fabricar un alcance mayor.

La capacidad es de lectura. No concede:

- crear movimientos;
- insertar groups o legs;
- ajustar stock;
- crear traslados;
- despachar remisiones;
- recibir remisiones;
- aprobar conteos;
- revertir efectos cuantitativos;
- exportar por implicación.

#### 5. Grants base de `movements.view`

El dataset base vigente contiene grants `DIRECT_BASE` para:

```text
propietario
gerente_general
gerente
supervisor
auxiliar_administrativa
contador
```

Cada rol conserva su alcance territorial propio. La consulta global aparente nunca puede ampliarse a APP-REVIEW, demo, pruebas, secretos o territorios aislados cuando su matriz los excluye.

`contador` consume evidencia transaccional para conciliación, valoración y trazabilidad financiera; no ejecuta movimientos físicos.

#### 6. Grants operacionales de `movements.view`

El dataset operacional vigente contiene grants directos para:

| Rol operacional | Contexto | Límite |
| --- | --- | --- |
| `bodeguero` | `CTX-WH-MOVEMENTS` | Movimientos cuyo origen, destino o efecto pertenezca a la bodega activa. Ver un extremo no concede autoridad sobre territorios ajenos. |
| `conductor_logistica` | `CTX-DRV-CUSTODY-MOVEMENTS` | Eventos de inventario y custodia relacionados con remisiones asignadas; no concede historial general ni writer. |
| `gerencia_operativa` | `CTX-MGR-INVENTORY-VIEW` | Inventario y movimientos de la sede o área activa; no produce visibilidad global implícita. |

Un rol operacional diferente queda en `DEFAULT_DENY` salvo grant canónico explícito.

#### 7. Consulta de traslados

`nexo.inventory.transfers.view` conserva modalidad:

```text
BASE_OR_OPERATIONAL
```

Los grants base vigentes corresponden a:

```text
propietario
gerente_general
gerente
supervisor
auxiliar_administrativa
contador
```

Los grants operacionales vigentes corresponden a:

```text
bodeguero
gerencia_operativa
```

La consulta se limita a traslados donde exista relación territorial legítima con el recurso. Ver origen no concede autoridad general sobre destino y viceversa.

#### 8. Creación de traslado interno

`nexo.inventory.transfers.create` conserva modalidad:

```text
OPERATIONAL_ONLY
```

El dataset vigente contiene un único grant operacional directo ordinario:

```text
bodeguero
```

con contexto:

```text
CTX-WH-TRANSFER-CREATE
```

La capacidad se limita a traslados ordinarios entre ubicaciones autorizadas de la misma sede y área de bodega.

No concede:

- traslado intersede;
- remisión;
- salida hacia consumo productivo;
- ajuste;
- recepción;
- writer genérico del ledger;
- mutación sobre ubicaciones fuera del territorio activo.

#### 9. Frontera con remisiones

Los movimientos entre sedes no se modelan como `transfers.create`.

La frontera correcta es:

```text
TRASLADO INTERNO MISMA SEDE
→ nexo.inventory.transfers.create

MOVIMIENTO ENTRE SEDES
→ FLUJO DE REMISIONES
→ DESPACHO
→ CUSTODIA / TRANSITO
→ ENTREGA
→ RECEPCION
```

El ledger intersede consume los hechos de remisión; no sustituye su autorización.

#### 10. Frontera con conteos y ajustes

Conteo, diferencia, ajuste y movimiento permanecen separados:

```text
CONTEO
→ OBSERVACION
→ DIFERENCIA
→ INVESTIGACION
→ CANDIDATO

CANDIDATO
→ DECISION DE AJUSTE AUTORIZADA
→ WRITER DE AJUSTES
→ MOVIMIENTO AUTORITATIVO
```

`movements.view` no aprueba diferencias y `transfers.create` no publica ajustes.

#### 11. No existe writer genérico de movimientos

Ninguna PermissionKey activa permite a un usuario crear una fila arbitraria del ledger.

Cada efecto cuantitativo debe provenir de un proceso propietario identificado, por ejemplo:

- entrada;
- recepción;
- remisión;
- producción;
- venta;
- retiro;
- traslado interno;
- ajuste autorizado;
- reversa compensatoria.

El productor propietario genera la intención y el command boundary del ledger materializa groups y legs con causalidad verificable.

#### 12. Denegación por defecto

No autorizan consulta o mutación por sí solos:

```text
nexo.access
nexo.inventory.stock
nexo.inventory.movements
nexo.inventory.transfers
rol o cargo
sede seleccionada
URL directa
formulario visible
scanner
QR
LOC visible
stock visible
nota libre
movement_type
estado completed
all_sites
```

Toda acción exige su PermissionKey exacta y contexto compatible. La ausencia de una capacidad activa produce `DEFAULT_DENY`.

#### 13. Recurso y territorio

La autorización se resuelve sobre el recurso exacto.

Para consulta de ledger, el servidor resuelve como mínimo:

- sitio o conjunto territorial;
- producto;
- source identity;
- group;
- leg;
- secuencia;
- receipt;
- actor relacionado;
- filtros solicitados;
- campos sensibles.

Para traslado interno resuelve además:

- work item o intención;
- origen;
- destino;
- sede;
- área;
- LOC;
- posición cuando aplique;
- producto;
- UOM;
- cantidad;
- stock elegible;
- versiones;
- actor y sesión.

La UI nunca decide por sí sola el territorio efectivo.

#### 14. Fuente causal

Cada movimiento debe conservar una fuente entre las familias canónicas de `NEXO-UX-016` y verificar:

- owner de la fuente;
- tipo;
- ID;
- versión;
- línea;
- receipt previo;
- saldo elegible;
- postings anteriores.

No se reconstruye causalidad a partir de `movement_type`, alias o nota libre.

Un mismo hecho empresarial tiene un único productor autoritativo.

#### 15. Groups y legs append-only

Todo posting autoritativo crea:

```text
MOVEMENT GROUP
+ UNO O MAS LEGS
+ POSTING RECEIPT
+ SERVER SEQUENCE
```

Cada leg conserva, cuando aplique:

- source;
- receipt;
- producto;
- actor;
- scope;
- signo;
- cantidad;
- UOM;
- origen;
- destino;
- counterpart;
- correlation;
- causation;
- `leg_sequence`;
- `server_sequence`;
- `occurred_at`;
- `recorded_at`.

Después del posting receipt, group, legs, secuencias y receipts son inmutables.

#### 16. Conservación cuantitativa

Los legs conservan cantidad entre:

```text
SITE
LOCATION
POSITION
PRESENTATION
CUSTODY
```

Una reubicación dentro de la misma sede suma cero en sede.

Una reubicación de posición suma cero en LOC.

Un despacho intersede reduce origen y aumenta custodia.

Una recepción aceptada reduce custodia y aumenta destino únicamente por la cantidad aceptada.

La misma cantidad no puede existir simultáneamente en origen, custodia y destino.

#### 17. Traslado interno

Un traslado interno válido conserva:

- intención;
- work item cuando aplique;
- actor y sesión;
- origen y destino activos;
- cantidad disponible;
- UOM snapshot;
- versiones;
- revisión;
- idempotency key;
- group;
- legs pareados;
- receipt;
- proyecciones derivadas.

El encabezado no nace `completed` antes del efecto autoritativo.

Un fallo no puede dejar header, items, movimiento y stock en estados parciales incompatibles.

#### 18. Movimiento intersede

El ledger intersede empareja cantidades por shipment, línea, despacho, journey y receipt.

El despacho crea salida de origen y custodia positiva.

Los hitos de tránsito no vuelven a mover cantidad.

Cada receipt aceptado reduce custodia y aumenta destino solo por lo aceptado.

Faltantes, rechazo, cuarentena, sobrantes y saldos sin resolver permanecen explícitos y no se fuerzan mediante ajuste artificial.

#### 19. Identidad física, UOM y costo

Cada leg cuantitativo conserva:

- cantidad cruda;
- unidad de entrada;
- factor;
- unidad de stock;
- cantidad base;
- precisión;
- signo;
- producto;
- lote o batch cuando aplique;
- vencimiento;
- condición;
- presentación;
- posición;
- LPN cuando aplique.

Costo y campos sensibles se consumen de la fuente o policy autorizada y pueden permanecer protegidos en servidor.

Cambios posteriores de catálogo no reescriben historia.

#### 20. Idempotencia y secuencia

Toda publicación autoritativa persiste una intención con:

- producer;
- source;
- versión;
- línea;
- parcialidad;
- familia;
- fingerprint;
- idempotency key.

Misma key y mismo payload devuelven el mismo receipt.

Misma key y payload distinto producen conflicto.

Timeout o resultado desconocido se reconcilian por intención antes de repetir.

La secuencia de servidor es estable y un gap impide declarar un balance definitivo.

#### 21. Proyecciones derivadas

Stock de sede, LOC, posición, presentación, costo, custodia y disponibilidad son proyecciones o eventos derivados de groups y legs.

Cada consumidor deduplica por movimiento, evento y receipt y produce su propio receipt.

Reparar una proyección significa replay, rebuild o caso de reconciliación. Nunca significa crear un movimiento ficticio para cuadrar el saldo.

#### 22. Balance histórico

Un saldo histórico se reconstruye desde:

```text
CHECKPOINT VERIFICADO
+ LEGS POSTERIORES DE UNA SECUENCIA CONTINUA
```

o desde el ledger completo requerido.

Filtros, paginación y límites de UI se aplican después de resolver el saldo.

Una ventana truncada de filas no puede producir opening o closing autoritativos.

Ante gap o cobertura insuficiente el resultado es `BALANCE_UNAVAILABLE`, no una estimación silenciosa.

#### 23. Corrección y reversa

Después del posting no existen UPDATE o DELETE destructivos sobre group, legs, secuencias o receipts.

Toda corrección cuantitativa crea:

- caso;
- referencia al original;
- group compensatorio;
- legs opuestos;
- motivo;
- evidencia;
- autoridad;
- cantidad compensada;
- saldo restante.

El movimiento original permanece visible.

Un ajuste no se utiliza para ocultar una reversa.

#### 24. Exportación

El catálogo vigente no contiene una PermissionKey activa específica para exportar movimientos.

Por tanto:

```text
MOVEMENTS_EXPORT
→ DEFAULT_DENY
```

hasta que exista una capacidad canónica activa que defina alcance, territorio, minimización y auditoría.

`movements.view`, un rol de gerencia o un string de cargo no conceden exportación por implicación.

#### 25. Minimización y datos sensibles

Consulta, detalle y futuras exportaciones deben minimizar:

- costo;
- datos personales;
- notas;
- evidencia;
- territorios ajenos;
- identificadores internos no necesarios.

La autorización se aplica antes de serializar datos hacia el cliente.

#### 26. Dispositivo compartido y captura

Scanner, QR, tablet o quiosco pueden proponer identidad o contexto, pero no crean autoridad ni movimiento por sí solos.

Un adapter de captura produce una proposal reversible. El command boundary revalida actor, sesión, PermissionKey, recurso, versiones, cantidad, UOM, territorio e idempotencia antes de cualquier efecto.

#### 27. AS-IS verificado en `/inventory/movements`

El snapshot remoto `vento-nexo@f0a12557a1a258c84b025933653dc756de4b5a59` conserva una superficie de historial incompatible con el contrato objetivo.

En `src/app/inventory/movements/page.tsx`:

- `requireAppAccess` usa `permissionCode: "inventory.movements"`, clave amplia no activa en el catálogo canónico;
- se consultan como máximo los últimos 200 registros ordenados por `created_at`;
- movimientos técnicos pueden ocultarse de la vista;
- el saldo histórico se reconstruye partiendo de `inventory_stock_by_site.current_qty` actual y restando las filas visibles;
- el opening/closing queda por tanto condicionado a una ventana truncada y no a ledger completo o checkpoint verificable;
- el detalle causal se infiere parcialmente desde `movement_type` y `note`;
- la exportación se habilita por strings de rol `gerente_general` o `propietario` en lugar de PermissionKey activa específica.

Este estado es evidencia de convergencia pendiente y no autoridad canónica.

#### 28. AS-IS verificado en `/inventory/transfers`

En `src/app/inventory/transfers/page.tsx` del mismo snapshot:

- la página usa `permissionCode: "inventory.transfers"`, clave amplia no activa;
- el server action `createTransfer` valida autenticación y sede seleccionada, pero no demuestra `nexo.inventory.transfers.create` exacta;
- crea `inventory_transfers` directamente con `status: "completed"`;
- después inserta `inventory_transfer_items`;
- después inserta filas `transfer_internal` en `inventory_movements`;
- después llama `consume_inventory_stock_from_positions`;
- después ejecuta upserts separados de stock en origen y destino;
- esas escrituras ocurren secuencialmente y no demuestran una única frontera atómica de intención, group, legs, receipt y proyecciones.

Ese AS-IS debe converger; no redefine el contrato aprobado.

#### 29. Convergencia técnica obligatoria

La futura materialización deberá:

- retirar `inventory.movements` y `inventory.transfers` como autorización runtime;
- usar `nexo.inventory.movements.view` solo para lectura;
- usar `nexo.inventory.transfers.view` para consulta de traslados;
- usar `nexo.inventory.transfers.create` únicamente para traslado interno autorizado;
- mantener exportación en deny hasta que exista PermissionKey específica activa;
- eliminar writers genéricos desde timelines o formularios;
- introducir intention, group, legs, receipts y secuencia autoritativa;
- garantizar atomicidad o compensación gobernada;
- derivar proyecciones desde ledger;
- reconstruir balances desde ledger/checkpoints, no desde ventanas visibles;
- conservar causalidad y source identity;
- separar traslado interno de remisión intersede;
- revalidar autorización en servidor y RLS;
- eliminar UPDATE/DELETE destructivos del historial cuantitativo.

#### 30. Modelo físico objetivo

El modelo futuro debe converger hacia un ledger causal append-only donde productores propietarios emiten intenciones y el command boundary autoritativo crea grupos y legs idempotentes.

La vista de movimientos consume ledger y proyecciones; no escribe en ellos.

El traslado interno consume un command especializado y no coordina manualmente cinco o más escrituras independientes desde una page action.

#### 31. Ownership de Supabase

Toda futura modificación de:

- tablas;
- RPC;
- RLS;
- grants;
- funciones;
- triggers;
- secuencias;
- outbox;
- tipos;
- migraciones;
- idempotencia;
- reconciliación;
- rollback;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Esta tarea no ejecuta cambios Supabase.

#### 32. Materialización física posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador global no autoriza código ni infraestructura.

Cada materialización futura usa:

```text
NEXO-AUTH-013::<implementation_unit_id>
```

solo después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

#### 33. Lineage de paquetes

La evidencia canónica actual no autoriza colapsar todo el frente en un único `package_id` inventado.

`NEXO-UX-016` aparece como dependencia documental de `GAP-PKG-038`, mientras que varias obligaciones de source posting, corrección, ledger y reconciliación están vinculadas a `GAP-PKG-096`.

La materialización futura resolverá `implementation_unit_id` y lineage por las fuentes canónicas de E5/DELIV-PKG. Esta tarea no reasigna packages ni crea relaciones TASK → UNIT manualmente.

#### 34. Validaciones funcionales heredadas

La futura implementación conserva la matriz:

```text
MOV-VAL-001 ... MOV-VAL-048
```

También conserva los inventarios contractuales de `NEXO-UX-016`, incluidos veintiún artefactos, veinticuatro pasos `MOV-STEP-*`, veintidós estados empresariales/técnicos, treinta estados de interfaz, ocho colas `MOVQ-*`, doce familias de fuente, doce familias semánticas y diecinueve superficies.

Esta tarea no redefine esos conjuntos.

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La autorización de movimientos especializa capacidades, segregación y fronteras ya cubiertas por requisitos vigentes sin crear una obligación verificable nueva.

#### 36. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-011`;
- `TREQ-NEXO-011`;
- `TREQ-NEXO-175` a `TREQ-NEXO-188`;
- cobertura relacionada de `NEXO-UX-014` a `NEXO-UX-016`, `NEXO-UX-019`, `NEXO-UX-020`, `NEXO-UX-021`, `NEXO-UX-022` y `NEXO-UX-023` a `NEXO-UX-025`.

Estas referencias son trazabilidad heredada y no modifican filas del Registro 04A.

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | El marcador define un contrato documental y no compila ni despliega producto. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido incorporado al checkout local de `NEXO-AUTH-013`; formato, quality, delivery y batería global corresponden al lifecycle documental posterior al reemplazo. |
| REMOTA | PASS | Se verificaron `vento-shell` en `357b820e0b4bff0971a5c5c90dabfa22d3878aeb`, catálogo activo, grants base y operacionales, `NEXO-UX-016`, `TREQ-NEXO-175..188`, topología `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`, y `vento-nexo` en `f0a12557a1a258c84b025933653dc756de4b5a59` para las superficies actuales de movimientos y traslados. |
| OPERATIVA | NOT_APPLICABLE | No se consulta un ledger productivo, no se ejecuta traslado real, no se publica leg real y no se modifica stock real. |
| FÍSICA | NOT_APPLICABLE | No se crea ni autoriza `NEXO-AUTH-013::<implementation_unit_id>` durante este marcador global. |

#### 38. Criterios de aceptación

- [x] `nexo.inventory.movements.view` es la capacidad activa exacta de consulta del ledger;
- [x] `nexo.inventory.transfers.view` es la capacidad activa exacta de consulta de traslados;
- [x] `nexo.inventory.transfers.create` es la capacidad activa exacta de creación de traslado interno;
- [x] `inventory.movements`, `inventory.transfers` y equivalentes amplios no autorizan runtime;
- [x] no existe un writer genérico de movimientos para usuario final;
- [x] `movements.view` conserva `BASE_OR_OPERATIONAL` y es read-only;
- [x] `transfers.view` conserva `BASE_OR_OPERATIONAL`;
- [x] `transfers.create` conserva `OPERATIONAL_ONLY`;
- [x] el único grant operacional ordinario de `transfers.create` corresponde a `bodeguero`;
- [x] `transfers.create` se limita a ubicaciones autorizadas de la misma sede y área;
- [x] los movimientos intersede permanecen bajo remisiones;
- [x] `conductor_logistica` puede consultar movimientos de custodia relacionados con remisiones asignadas, pero no crear traslados;
- [x] source identity y productor propietario son obligatorios;
- [x] groups, legs, secuencias y receipts son append-only después del posting;
- [x] se conserva cantidad entre SITE, LOCATION, POSITION, PRESENTATION y CUSTODY;
- [x] traslado interno produce legs pareados e intención idempotente;
- [x] ninguna proyección mutable es fuente causal del ledger;
- [x] balances históricos se reconstruyen desde ledger/checkpoints y secuencia continua;
- [x] una ventana de 200 filas nunca produce saldo histórico autoritativo;
- [x] reversas cuantitativas usan grupos compensatorios y conservan original;
- [x] exportar movimientos queda `DEFAULT_DENY` mientras no exista PermissionKey activa específica;
- [x] strings de rol no autorizan exportación;
- [x] el AS-IS de transfers con múltiples escrituras secuenciales queda identificado como convergencia pendiente;
- [x] la futura implementación ejecuta `MOV-VAL-001` a `MOV-VAL-048`;
- [x] toda modificación Supabase futura pertenece a `vento-shell`;
- [x] la topología es `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 39. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia el catálogo de PermissionKey;
- cambia matrices de rol;
- consulta datos productivos reales;
- crea un traslado real;
- crea un group real;
- crea un leg real;
- crea un receipt real;
- modifica stock real;
- ejecuta una remisión real;
- ejecuta un ajuste real;
- ejecuta una reversa real;
- exporta movimientos reales;
- crea una instancia física;
- autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-012 — Proteger conteos`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-013 — Proteger movimientos`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-014 — Proteger catálogo y configuraciones`
### ✅ NEXO-AUTH-014 — Proteger catálogo y configuraciones

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-013 — Proteger movimientos
**Tarea siguiente:** NEXO-AUTH-015 — Filtrar por sede y área efectivas
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger lectura de catálogo, creación de producto, lectura y configuración de ubicaciones mediante PermissionKey atómicas vigentes, modalidades exactas por carril, recursos resueltos en servidor, prohibición de permisos amplios legacy, denegación segura de escrituras sin capacidad activa y separación estricta entre configuración administrativa, asignación operativa y filtrado territorial
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-014::<implementation_unit_id>` después de que la unidad física real sea asignada, el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger el catálogo y las configuraciones operativas de NEXO para que cada lectura o mutación dependa de una PermissionKey activa exacta, de su modalidad autorizativa, del recurso concreto y del carril válido, sin convertir rutas, roles nominales, selección de sede, acceso a stock, permisos amplios legacy o configuración visible en autoridad implícita para modificar maestros o topología física.

La tarea separa explícitamente:

```text
CONSULTAR REFERENCIA
!=
CREAR PRODUCTO
!=
CONFIGURAR CATALOGO DE UBICACION
!=
ASIGNAR STOCK O LPN A UBICACION
!=
FILTRAR POR SEDE O AREA
```

`NEXO-AUTH-015` conserva la resolución posterior de sede y área efectivas.

#### 2. Resultado contractual

Toda decisión queda ligada a capacidad, carril, recurso y contexto exactos.

Lectura:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ PermissionKey DE LECTURA ACTIVA
+ CARRIL BASE U OPERACIONAL COMPLETO
+ RECURSO AUTORIZADO
+ PROYECCION MINIMA NECESARIA
+ DENEGACIONES AUSENTES
→ CONSULTA AUTORIZABLE
```

Creación de producto:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ nexo.catalog.products.create
+ CARRIL BASE VALIDO
+ RECURSO ORGANIZACIONAL VALIDO
+ VERSION Y DATOS VALIDOS
+ DENEGACIONES AUSENTES
→ CREACION AUTORIZABLE
```

Asignación operativa de ubicación:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ nexo.inventory.location_assignments.assign
+ CARRIL OPERACIONAL VALIDO
+ TURNO Y CHECK-IN CUANDO APLIQUEN
+ BODEGA Y RECURSO COMPATIBLES
+ UBICACION ACTIVA Y ELEGIBLE
+ DENEGACIONES AUSENTES
→ ASIGNACION AUTORIZABLE
```

Actualización administrativa del catálogo de ubicación:

```text
PRINCIPAL AUTENTICADO
+ ACTOR EFECTIVO
+ nexo.inventory.location_catalog.update
+ CARRIL BASE VALIDO
+ RECURSO ORGANIZACIONAL VALIDO
+ VERSION VIGENTE
+ DENEGACIONES AUSENTES
→ CONFIGURACION AUTORIZABLE
```

Ninguna ruta puede completar una decisión faltante mediante nombre de rol, permiso vecino, acceso a aplicación, permiso de stock o existencia de una pantalla editable.

#### 3. PermissionKey activas exactas

El frente queda limitado a estas once PermissionKey activas:

```text
nexo.catalog.products.view
nexo.catalog.products.create
nexo.catalog.presentations.view
nexo.catalog.request_policies.view
nexo.catalog.categories.view
nexo.catalog.units.view
nexo.inventory.locations.view
nexo.inventory.location_assignments.assign
nexo.inventory.location_catalog.update
nexo.inventory.zones.view
nexo.inventory.storage_positions.view
```

No se crean claves nuevas desde esta tarea.

#### 4. Modalidades exactas

Las modalidades vigentes quedan preservadas:

| PermissionKey | Modalidad |
| --- | --- |
| `nexo.catalog.products.view` | `BASE_OR_OPERATIONAL` |
| `nexo.catalog.products.create` | `BASE_ONLY` |
| `nexo.catalog.presentations.view` | `BASE_OR_OPERATIONAL` |
| `nexo.catalog.request_policies.view` | `BASE_OR_OPERATIONAL` |
| `nexo.catalog.categories.view` | `BASE_OR_OPERATIONAL` |
| `nexo.catalog.units.view` | `BASE_OR_OPERATIONAL` |
| `nexo.inventory.locations.view` | `BASE_OR_OPERATIONAL` |
| `nexo.inventory.location_assignments.assign` | `OPERATIONAL_ONLY` |
| `nexo.inventory.location_catalog.update` | `BASE_ONLY` |
| `nexo.inventory.zones.view` | `BASE_OR_OPERATIONAL` |
| `nexo.inventory.storage_positions.view` | `BASE_OR_OPERATIONAL` |

`BASE_OR_OPERATIONAL` significa que uno de los dos carriles completos puede satisfacer la lectura. No permite mezclar componentes parciales.

#### 5. Lectura de productos

`nexo.catalog.products.view` autoriza únicamente una proyección de referencia compatible con el carril y el recurso.

Los grants operacionales vigentes corresponden a:

```text
barista_satelite
bodeguero
cajero_satelite
cocinero_satelite
conductor_logistica
gerencia_operativa
mostrador_satelite
operador_integral_satelite
produccion_cocina
produccion_panaderia
produccion_reposteria
servicio_salon
```

Los grants base vigentes corresponden a:

```text
auxiliar_administrativa
contador
gerente
gerente_general
marketing
propietario
supervisor
```

La lectura no concede costos, márgenes, proveedores, recetas, existencias ni campos técnicos salvo que otra capacidad exacta los autorice.

#### 6. Creación de producto

`nexo.catalog.products.create` es:

```text
BASE_ONLY
```

Los únicos grants base vigentes son:

```text
propietario
gerente_general
```

No existe grant operacional de creación.

Por tanto:

```text
bodeguero
+ acceso operativo
+ pantalla visible
!=
autoridad para crear producto
```

La creación no puede autorizarse mediante `inventory.stock`, `catalog.products`, rol nominal ni acceso general a NEXO.

#### 7. Lectura de presentaciones

`nexo.catalog.presentations.view` es `BASE_OR_OPERATIONAL`.

Los grants operacionales vigentes corresponden a:

```text
barista_satelite
bodeguero
cajero_satelite
cocinero_satelite
conductor_logistica
gerencia_operativa
mostrador_satelite
operador_integral_satelite
produccion_cocina
produccion_panaderia
produccion_reposteria
servicio_salon
```

Los grants base vigentes corresponden a:

```text
auxiliar_administrativa
contador
gerente
gerente_general
marketing
propietario
supervisor
```

La consulta permite interpretar presentación, empaque o conversión aplicable, pero no crear, editar, activar o desactivar presentaciones.

#### 8. Políticas de solicitud

`nexo.catalog.request_policies.view` es `BASE_OR_OPERATIONAL`.

Los grants operacionales vigentes corresponden a:

```text
barista_satelite
bodeguero
cajero_satelite
cocinero_satelite
gerencia_operativa
mostrador_satelite
operador_integral_satelite
servicio_salon
```

Los grants base vigentes corresponden a:

```text
auxiliar_administrativa
gerente
gerente_general
propietario
supervisor
```

La lectura de una política no concede mutación de la política, ampliación de audiencia ni bypass del flujo propietario de remisiones.

#### 9. Categorías y unidades

`nexo.catalog.categories.view` y `nexo.catalog.units.view` son `BASE_OR_OPERATIONAL`.

La lectura sirve como referencia para clasificación, captura y conversión.

No existen en el catálogo activo PermissionKey atómicas para:

```text
categories.create
categories.update
categories.activate
categories.deactivate
units.create
units.update
units.activate
units.deactivate
```

Los permisos amplios legacy de gestión de categorías o unidades no pueden sustituir capacidades inexistentes.

Resultado:

```text
MUTACION SIN PermissionKey ACTIVA EXACTA
→ DEFAULT_DENY
```

#### 10. Lectura de ubicaciones

`nexo.inventory.locations.view` es `BASE_OR_OPERATIONAL`.

Los grants operacionales vigentes corresponden a:

```text
bodeguero
gerencia_operativa
produccion_cocina
produccion_panaderia
produccion_reposteria
```

Los grants base vigentes corresponden a:

```text
gerente
gerente_general
propietario
supervisor
```

La consulta de ubicación no concede configuración, asignación, traslado, movimiento, ajuste ni autoridad sobre otra sede o área.

#### 11. Asignación de stock o LPN a ubicación

`nexo.inventory.location_assignments.assign` es:

```text
OPERATIONAL_ONLY
```

El único grant operacional vigente corresponde a:

```text
bodeguero
```

Contexto:

```text
CTX-WH-PUTAWAY
```

La acción se limita a stock o LPN recibidos y a una ubicación válida dentro de la bodega activa, respetando compatibilidad de producto, capacidad, lote, condición y restricciones de almacenamiento.

No equivale a modificar el maestro de ubicaciones.

#### 12. Configuración administrativa del catálogo de ubicación

`nexo.inventory.location_catalog.update` es:

```text
BASE_ONLY
```

Los grants base vigentes corresponden a:

```text
propietario
gerente_general
gerente
```

La acción protege cambios del catálogo físico o lógico de ubicaciones.

No concede asignar stock, ejecutar putaway, trasladar inventario ni modificar saldo.

#### 13. Zonas y posiciones

`nexo.inventory.zones.view` y `nexo.inventory.storage_positions.view` son `BASE_OR_OPERATIONAL`.

Los grants operacionales vigentes corresponden a:

```text
bodeguero
gerencia_operativa
```

Los grants base vigentes corresponden a:

```text
gerente
gerente_general
propietario
supervisor
```

Son capacidades de consulta. No existen PermissionKey activas de mutación de zonas o posiciones dentro de este frente.

#### 14. Escrituras de catálogo sin PermissionKey activa

El catálogo vigente no contiene PermissionKey atómicas activas para:

- editar producto;
- eliminar producto;
- activar o desactivar producto;
- crear o editar presentación;
- crear, editar, activar o desactivar categoría;
- crear, editar, activar o desactivar unidad;
- modificar política de solicitud;
- crear, editar o eliminar zona mediante una capacidad específica;
- crear, editar o eliminar posición mediante una capacidad específica.

`nexo.catalog.products.create` no puede reutilizarse como permiso de edición.

`nexo.inventory.location_catalog.update` no puede reutilizarse como permiso general de catálogo.

Hasta que exista una capacidad activa exacta:

```text
DEFAULT_DENY
```

#### 15. Identidades legacy y permisos amplios

Quedan fuera de autoridad runtime, entre otros:

```text
nexo.catalog.view
nexo.ficha.view
nexo.products.view
nexo.catalog.products
nexo.inventory_catalog_id.view
nexo.inventory_catalog.view
nexo.inventory_catalog_new.view
nexo.presentations.view
nexo.inventory_catalog_presentations.view
nexo.request_policies.view
nexo.settings.categories.manage
nexo.settings.units.manage
nexo.locations.view
nexo.inventory.locations
nexo.inventory_locations_id.view
nexo.assign_location.view
nexo.inventory_settings_locations_id_catalog.view
```

Esas identidades solo pueden participar en compatibilidad explícita hacia la PermissionKey canónica exacta que ya exista.

No pueden fabricar una capacidad de mutación que el catálogo activo no contenga.

#### 16. Dispositivo compartido

Las capacidades ordinarias de lectura y `nexo.inventory.location_assignments.assign` pueden clasificarse como `STANDARD` cuando el contrato de dispositivo aplicable lo permita.

Las capacidades:

```text
nexo.catalog.products.create
nexo.inventory.location_catalog.update
```

están clasificadas `NOT_ALLOWED` en las plantillas de dispositivo compartido.

Un dispositivo compatible nunca crea autoridad; únicamente limita dónde puede ejercerse una autoridad ya válida.

#### 17. Frontera con `NEXO-AUTH-013`

`NEXO-AUTH-013` conserva ledger, movimientos y traslado interno.

`NEXO-AUTH-014` no autoriza:

- insertar movimientos;
- alterar saldo;
- ejecutar transferencia;
- publicar ajuste;
- corregir una diferencia.

Configurar o consultar catálogo no es un writer de inventario.

#### 18. Frontera con `NEXO-AUTH-015`

`NEXO-AUTH-015` conserva:

```text
SEDE EFECTIVA
AREA EFECTIVA
FILTRO TERRITORIAL
INTERSECCION DE ALCANCE
```

`NEXO-AUTH-014` exige que el recurso sea compatible con el alcance recibido, pero no redefine cómo se calcula sede o área efectivas.

`selected_site_id`, query params, cookies, rol o navegación no sustituyen ese contrato.

#### 19. Frontera con dominio de producto y ubicación

Esta tarea no redefine identidad de producto, presentación, unidad, categoría, LOC, zona o posición.

Consume las identidades canónicas y exige que cada autorización se evalúe sobre el recurso real, no sobre etiquetas de interfaz.

#### 20. AS-IS verificable — catálogo

En `vento-nexo` vigente, `/inventory/catalog` entra actualmente mediante:

```text
permissionCode: inventory.stock
```

y decide administración mediante strings de rol.

La creación de producto permite actualmente:

```text
propietario
gerente_general
bodeguero
```

o un chequeo legacy de `catalog.products`.

La ruta de alta no presenta una PermissionKey atómica exacta en `requireAppAccess`.

La edición de producto usa `inventory.stock` para entrar y después strings de rol o `catalog.products`.

Esto no demuestra cumplimiento de:

```text
nexo.catalog.products.view
nexo.catalog.products.create
```

ni justifica una capacidad de actualización inexistente.

#### 21. AS-IS verificable — ubicaciones

Las superficies `/inventory/locations`, `/inventory/locations/zones` y kiosco utilizan actualmente el permiso amplio legacy:

```text
inventory.locations
```

La misma superficie principal contiene acciones server-side que crean, actualizan, renombran o eliminan filas de `inventory_locations`.

Varias mutaciones sensibles se protegen mediante strings de rol como:

```text
propietario
gerente_general
```

mientras la acción de creación no demuestra en el mismo límite una PermissionKey atómica equivalente a `nexo.inventory.location_catalog.update`.

Ese patrón deberá converger sin ampliar autoridad.

#### 22. Regla de servidor

Toda mutación debe revalidar server-side:

- principal;
- actor efectivo;
- sesión humana;
- PermissionKey exacta;
- carril;
- rol o contexto que origina el grant;
- recurso;
- versión;
- alcance;
- dispositivo cuando aplique;
- denegaciones;
- intención idempotente cuando aplique.

La autorización de UI no sustituye la autorización del command boundary.

#### 23. Minimización de lectura

Las proyecciones de catálogo se limitan a los campos requeridos por la acción actual.

Un rol con `products.view` no recibe por defecto:

- costo;
- margen;
- proveedor;
- receta;
- existencia;
- configuración administrativa;
- campos técnicos internos.

La existencia de esos campos en la tabla fuente no los hace parte de la proyección autorizada.

#### 24. Frescura y concurrencia

Un cambio de:

- rol;
- grant;
- turno;
- check-in;
- sede o área efectiva;
- estado del recurso;
- versión de catálogo;
- política;
- dispositivo;
- ubicación;
- capacidad de sede;

invalida decisiones afectadas.

Las mutaciones revalidan antes de aplicar efectos.

#### 25. Compatibilidad y migración

La adopción futura puede mantener temporalmente adapters legacy únicamente cuando:

- la identidad legacy mapea uno-a-uno a una PermissionKey activa;
- el adapter es observable;
- no amplía campos;
- no amplía territorio;
- no convierte lectura en escritura;
- no convierte un permiso amplio en varias mutaciones;
- existe retiro planificado.

Un alias many-to-many o una normalización que elija la decisión más permisiva queda prohibido.

#### 26. Estrategia de convergencia futura

La materialización física deberá, según la unidad real:

1. reemplazar gates amplios por PermissionKey exactas;
2. retirar strings de rol usados como autoridad directa;
3. separar lectura, creación, asignación y configuración;
4. impedir escrituras sin capacidad activa;
5. aplicar resource scope en servidor;
6. minimizar proyecciones;
7. reconciliar RLS/RPC/actions con la misma decisión;
8. conservar auditoría e idempotencia;
9. eliminar compatibilidad solo después de paridad;
10. ejecutar rollback sin reintroducir bypass conocido.

La tarea documental no ejecuta esas acciones.

#### 27. Topología física futura

La topología aplicable es:

```text
PER_IMPLEMENTATION_UNIT
```

La identidad futura es:

```text
NEXO-AUTH-014::<implementation_unit_id>
```

El gate temporal aplicable es:

```text
POST_E5_PACKAGE
```

No se fija una `implementation_unit_id` ni un `package_id` desde este marcador documental.

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- el registro vigente ya cubre descubribilidad de producto, semántica canónica de producto y presentación, coherencia de UOM y políticas, jerarquías de configuración y exposición territorial;
- esta tarea especializa autorización sobre capacidades existentes;
- no crea una nueva transición empresarial;
- no cambia el Registro 04A.

#### 29. Cobertura de prueba vigente reutilizada

Esta sección es trazabilidad heredada y no constituye actualización del registro.

Cobertura relevante:

- `TREQ-NEXO-002`;
- `TREQ-NEXO-007`;
- `TREQ-NEXO-008`;
- `TREQ-NEXO-009`;
- `TREQ-NEXO-010`;
- `TREQ-NEXO-016`;
- `TREQ-NEXO-252`;
- `TREQ-AUTH-015`.

#### 30. Evidencia de validación

- **BUILD:** `NOT_EXECUTED` — la batería documental se ejecutará después de incorporar el artefacto en la rama canónica.
- **LOCAL:** `NOT_EXECUTED` — no se modificó un checkout local desde esta conversación.
- **REMOTA:** `PASS` — se verificaron catálogo de PermissionKey, datasets base y operacionales, matrices canónicas, owner, topología, 04A y AS-IS remoto de `vento-nexo`.
- **OPERATIVA:** `NOT_APPLICABLE` — esta tarea define autorización documental y no ejecuta una operación real de catálogo o ubicación.
- **FÍSICA:** `NOT_APPLICABLE` — no se materializa ninguna implementation unit ni se modifica Supabase, datos o producto.

#### 31. Criterios de aceptación

- [x] se identificaron once PermissionKey activas del frente;
- [x] se conservaron sus modalidades exactas;
- [x] lectura se separó de mutación;
- [x] `products.create` permanece `BASE_ONLY`;
- [x] `location_assignments.assign` permanece `OPERATIONAL_ONLY`;
- [x] `location_catalog.update` permanece `BASE_ONLY`;
- [x] se documentaron grants directos relevantes sin crear nuevos grants;
- [x] se prohibió usar `products.create` como update;
- [x] se prohibió usar permisos amplios legacy como writer;
- [x] escrituras sin PermissionKey activa exacta quedan `DEFAULT_DENY`;
- [x] catálogo de ubicación y asignación operativa permanecen separados;
- [x] sede y área efectivas quedan reservadas a `NEXO-AUTH-015`;
- [x] dispositivo compartido no eleva autoridad;
- [x] se documentaron brechas AS-IS verificables;
- [x] la topología es `PER_IMPLEMENTATION_UNIT`;
- [x] el gate es `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se autoriza materialización física.

#### 32. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia el catálogo de PermissionKey;
- crea PermissionKey nuevas;
- crea o edita productos reales;
- crea o edita presentaciones reales;
- crea o edita categorías reales;
- crea o edita unidades reales;
- cambia políticas reales de solicitud;
- crea, edita o elimina ubicaciones reales;
- asigna stock o LPN reales;
- mueve inventario;
- cambia saldo;
- resuelve sede o área efectivas;
- implementa un dispositivo compartido;
- crea una instancia física;
- autoriza una instancia física;
- modifica el Registro 04A.

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-013 — Proteger movimientos`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-014 — Proteger catálogo y configuraciones`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-015 — Filtrar por sede y área efectivas`
### ✅ NEXO-AUTH-015 — Filtrar por sede y área efectivas

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-014 — Proteger catálogo y configuraciones
**Tarea siguiente:** NEXO-AUTH-016 — Integrar dispositivo compartido
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización NEXO del filtrado territorial por carril, sede, área y territorio real del recurso, preservando separación entre navegación, cobertura administrativa, turno, check-in, recurso, scope y autorización
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-015::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo toda superficie NEXO debe limitar lectura, navegación, filtros, consultas, acciones y mutaciones al territorio realmente autorizable del actor y del recurso, sin convertir una sede seleccionada, un área seleccionada, un parámetro de URL, un fallback local, un rol, un dispositivo, una cookie o una proyección de interfaz en autoridad territorial.

La decisión territorial se resuelve antes de exponer datos o ejecutar efectos:

```text
PRINCIPAL Y ACTOR EFECTIVOS
+ PermissionKey EXACTA
+ MODALIDAD DEL PERMISO
+ CARRIL COMPLETO APLICABLE
+ TERRITORIO DEL CARRIL
+ SCOPE DEL PERMISO
+ TERRITORIO REAL DEL RECURSO
+ ESTADO Y RELACIONES DEL RECURSO
+ DENEGACIONES
→ RECURSO AUTORIZABLE O DENEGADO
```

El filtrado no sustituye la autorización. Es una consecuencia de una autorización territorial ya resuelta.

#### 2. Resultado contractual

Quedan fijadas las siguientes reglas globales para NEXO:

1. no existe una única propiedad local llamada `activeSiteId`, `siteId`, `areaId` o equivalente que por sí sola determine autoridad;
2. la sede administrativa y la sede operativa permanecen separadas;
3. el área administrativa y el área operativa permanecen separadas;
4. la sede seleccionada y el área seleccionada son preferencias de navegación y nunca autoridad;
5. `employees.site_id` y `employees.area_id` continúan siendo campos legacy y no fuentes canónicas de autorización;
6. el territorio operativo procede del turno publicado y vigente;
7. el check-in confirma el contexto exigido, pero no crea ni reemplaza la sede o el área del turno;
8. el territorio del recurso se resuelve en backend y nunca se fabrica desde la UI;
9. cada recurso se evalúa contra un carril completo compatible con la modalidad del permiso;
10. `null` nunca significa todas las sedes o todas las áreas;
11. una ausencia legítima de área debe conservar su semántica explícita de recurso o rol site-wide;
12. recursos multiárea o multisede conservan sus extremos y reglas propietarias; no se reducen a un único `site_id` arbitrario;
13. una consulta filtra antes de serializar datos hacia el cliente;
14. una mutación revalida actor, permiso, contexto, scope, territorio y recurso inmediatamente antes del efecto;
15. UI, Server Actions, Route Handlers, RPC, RLS y proyecciones deberán converger en la misma frontera territorial;
16. cambiar turno, sede, área, asignación, rol, check-in o recurso invalida decisiones territoriales afectadas;
17. una rotación laboral no conserva privilegios territoriales obsoletos;
18. un actor administrativo no adquiere territorio operativo por tener cobertura base;
19. un actor operativo no adquiere cobertura administrativa por estar de turno;
20. el filtrado nunca repara una autorización incompleta mezclando hechos de dos carriles.

#### 3. Fuentes canónicas preservadas

Esta tarea consume sin redefinir:

| Fuente | Regla preservada |
| --- | --- |
| `NEXO-AUTH-001` | carril base y carril operativo se evalúan por separado y no se mezclan |
| `AUTH-MOD-007` | sede asignada, primaria, seleccionada, administrativa, operativa y del recurso son conceptos distintos |
| `AUTH-MOD-008` | área asignada, primaria, seleccionada, administrativa, operativa y del recurso son conceptos distintos |
| `AUTH-MOD-018` | la modalidad del permiso determina qué carril puede satisfacer la decisión |
| `SHELL-CTX-003` | `operational_site` y `operational_area` proceden del contexto canónico y no se reconstruyen localmente |
| `AUTH-CTX-018` | el territorio del recurso permanece separado del territorio laboral del actor |
| `AUTH-CTX-029` | cambios materiales invalidan contexto y decisiones derivadas |
| `AUTH-SRV-004 a AUTH-SRV-018` | servidor revalida permiso, actor, territorio, contexto y recurso |
| `NEXO-AUTH-004..014` | cada proceso conserva sus permisos, estados y recursos propietarios; esta tarea solo especializa su frontera territorial |

No se introduce una jerarquía territorial nueva para NEXO.

#### 4. Carriles territoriales independientes

La modalidad del permiso define el carril que puede autorizar un recurso.

```text
BASE_ONLY
→ solo territorio base completo

OPERATIONAL_ONLY
→ solo territorio operativo completo

BASE_OR_OPERATIONAL
→ un recurso puede ser autorizado por cualquiera de los dos carriles completos
→ nunca por una mezcla parcial de ambos

BASE_AND_OPERATIONAL
→ el recurso debe satisfacer simultáneamente ambos carriles completos
```

Cuando `BASE_OR_OPERATIONAL` permita resultados desde ambos carriles, el conjunto visible puede ser la unión de recursos independientemente autorizados por cada carril. Ningún recurso individual puede usar cobertura base parcial más contexto operativo parcial para producir `ALLOW`.

Cuando `BASE_AND_OPERATIONAL` aplique, el territorio autorizable corresponde a la intersección material de ambos carriles y del territorio del recurso.

#### 5. Territorio base o administrativo

El carril base usa identidad, rol base, grants, cobertura administrativa, scope, recurso, estado y denegaciones.

La sede administrativa puede resolverse para navegación o consulta desde una sede solicitada validada, una sede seleccionada validada o una sede primaria válida conforme al contrato transversal. Esa resolución no convierte la selección en permiso.

El área administrativa puede resolverse desde un área solicitada validada, área seleccionada validada, área primaria válida o ausencia explícita según el modo administrativo aplicable.

Modos reconocidos por las fuentes canónicas incluyen, según corresponda:

```text
single_site
assigned_sites
organization
single_area
assigned_areas
site_wide
organization
```

`null` no amplía el alcance. El scope explícito del permiso determina si la autorización es global, por sede, área o tipo de área.

#### 6. Territorio operativo

La sede operativa efectiva procede del turno publicado y vigente.

```text
OperationalActiveSite = active_shift.site_id
```

El área operativa efectiva procede del mismo turno cuando exista:

```text
OperationalActiveArea = active_shift.area_id
```

El check-in es evidencia confirmatoria y debe ser compatible cuando el permiso lo exija. No reemplaza la sede ni el área del turno.

Si el rol requiere área y el turno no la contiene, la operación se deniega.

Si el rol es site-wide y el contrato permite operar sin área, `area_id = null` conserva esa semántica explícita; no se transforma en acceso a cualquier área fuera de la sede efectiva.

#### 7. Sede y área seleccionadas

`employee_settings.selected_site_id` y `employee_settings.selected_area_id` son preferencias de navegación.

Pueden servir para:

- elegir una vista administrativa válida;
- construir un filtro visible;
- recordar una preferencia de navegación;
- proponer un destino para validación posterior.

No pueden por sí solas:

- conceder acceso;
- ampliar cobertura;
- sustituir turno;
- sustituir check-in;
- sustituir scope;
- definir el territorio del recurso;
- autorizar una mutación;
- producir un wildcard territorial.

Una selección inválida se ignora, limpia o sustituye para navegación conforme al contrato administrativo, sin degradar un turno operativo válido.

#### 8. Campos legacy

`employees.site_id` y `employees.area_id` no se utilizan como fuente canónica de autorización.

Pueden permanecer como datos legacy o referencias transitorias mientras su retiro esté gobernado, pero no pueden ocupar el lugar de:

- `employee_sites` y cobertura administrativa;
- turno vigente;
- sede operativa;
- área operativa;
- scope del permiso;
- territorio del recurso.

No se autoriza un fallback del tipo:

```text
selected_site_id ?? employees.site_id ?? ALLOW
```

ni su equivalente para área.

#### 9. Territorio del recurso

La sede y área del actor no sustituyen la sede y área del recurso.

Antes de decidir, el backend resuelve el recurso exacto y su territorio real.

Según el dominio, el recurso puede ser:

- site-level;
- area-level;
- organization-level;
- multi-area;
- multi-site;
- route-endpoint based;
- custody based;
- source-and-target based.

La relación territorial requerida se toma del contrato del recurso y del permiso exacto.

#### 10. Recursos sin área

Un recurso con área nula no significa recurso de todas las áreas.

La ausencia debe representar una semántica aprobada, por ejemplo:

```text
site_level
organization
multi_area
```

Si el contrato exige área y no puede resolverse, la decisión falla cerrada.

#### 11. Recursos multiárea

Un recurso multiárea conserva sus extremos y reglas propietarias.

Según el permiso, la autorización puede exigir:

```text
source_area
target_area
both
```

No se permite escoger uno de los extremos para fabricar coincidencia territorial.

#### 12. Recursos multisede

Una remisión, ruta, custodia u otro recurso con más de una sede no se reduce a la sede seleccionada por la interfaz.

El contrato propietario determina si la relación válida requiere:

- origen;
- destino;
- ambos extremos;
- custodia asignada;
- segmento logístico;
- cobertura administrativa explícita.

La visibilidad de un extremo no concede autoridad general sobre el otro.

#### 13. Filtrado de lectura

Una consulta protegida aplica la autorización antes de serializar datos.

```text
RESOLVER CONTEXTO
→ RESOLVER PERMISO Y MODALIDAD
→ RESOLVER TERRITORIO AUTORIZABLE
→ RESOLVER TERRITORIO DE CADA RECURSO
→ EXCLUIR RECURSOS NO AUTORIZABLES
→ MINIMIZAR CAMPOS
→ SERIALIZAR
```

No es válido:

```text
CONSULTAR TODO
→ ENVIAR AL CLIENTE
→ OCULTAR FILAS EN REACT
```

El filtrado de UI es presentación adicional, no control de seguridad.

#### 14. Filtrado de mutación

Una mutación protegida no confía en filtros previos de la pantalla.

Antes del efecto debe revalidar:

- principal;
- actor efectivo;
- permiso exacto;
- modalidad;
- carril requerido;
- turno y check-in cuando apliquen;
- sede y área efectivas del carril;
- scope;
- recurso actual;
- sede y área reales del recurso;
- estado;
- versión o concurrencia;
- columnas o transición permitidas;
- denegaciones.

Un `site_id` o `area_id` enviado por formulario, query string, body o RPC es un localizador propuesto, no evidencia suficiente de autorización.

#### 15. Parámetros de URL y formulario

Parámetros como:

```text
site_id
area_id
area_kind
from_site_id
to_site_id
location_id
```

pueden identificar la intención o ayudar a localizar el recurso. Nunca conceden territorio por sí solos.

La alteración manual de cualquiera de estos valores debe terminar en un recurso válido y autorizado o en denegación segura.

#### 16. Convergencia entre capas

Para el mismo snapshot material, deben coincidir:

```text
UI projection
Server Action / Route Handler
RPC
RLS
```

No se permite que:

- UI filtre por sede mientras RPC consulta global;
- RPC valide sede pero ignore área exigida;
- RLS use una fuente territorial distinta;
- un helper local agregue un fallback permisivo;
- una página convierta `selected_site_id` en autoridad;
- un rol local amplíe el territorio resuelto en backend.

#### 17. Separación entre filtro y permiso

Un filtro territorial no concede capacidades.

```text
FILTRO DE SEDE
!= PERMISO

FILTRO DE ÁREA
!= PERMISO

PERMISO
!= TERRITORIO DEL RECURSO
```

Se requieren las tres dimensiones cuando el contrato las exige.

#### 18. Separación entre filtro y disponibilidad

Que un recurso aparezca en una sede o área no implica que esté:

- activo;
- disponible;
- elegible;
- en estado mutable;
- libre de reserva;
- apto para el proceso actual.

El filtro territorial se evalúa junto con las reglas de estado propietarias de cada proceso.

#### 19. Rotación y cambios territoriales

Cambios en cualquiera de estos elementos invalidan decisiones afectadas:

- asignación de sede;
- cobertura administrativa;
- turno;
- sede del turno;
- área del turno;
- rol operativo;
- check-in;
- sede o área del recurso;
- scope;
- estado del recurso.

Un actor rotado a otra sede o área no conserva acceso por caché, navegación, URL anterior o una decisión previa.

#### 20. Denegación y fail closed

Se deniega cuando exista, entre otras causas:

- sede inexistente o inactiva;
- área inexistente o inactiva;
- área que no pertenece a la sede resuelta;
- configuración territorial ambigua;
- turno requerido ausente;
- área requerida ausente;
- check-in requerido ausente o incompatible;
- recurso fuera del scope;
- recurso fuera del territorio efectivo;
- cruce de origen o destino no permitido;
- snapshot stale;
- información crítica insuficiente.

Un error técnico no se convierte en territorio global ni en fallback permisivo.

#### 21. Área y rol operativo

La combinación operativa se valida como una sola configuración coherente:

```text
rol + sede + área
→ una configuración válida
```

Cuando la relación sea ambigua o incompatible se deniega.

El nombre del rol no sustituye el permiso exacto.

#### 22. Cobertura administrativa

Una persona con varias sedes asignadas no obtiene automáticamente scope global.

La cobertura administrativa es un insumo territorial del carril base y debe combinarse con el scope explícito del permiso.

Un permiso global ordinario mantiene sus límites de aplicación, recurso, entorno y denegaciones; no significa acceso universal.

#### 23. NEXO operativo

Para una capacidad `OPERATIONAL_ONLY`, la decisión territorial exige un contexto operativo completo compatible con el recurso.

Ejemplos conceptuales incluyen preparación, tránsito, recepción, entradas, retiros, conteos, validaciones y traslados cuando sus contratos lo requieran.

La presencia de una pantalla operativa, una sede seleccionada o un permiso base no sustituye el turno ni el territorio operativo.

#### 24. NEXO administrativo

Para una capacidad `BASE_ONLY`, el turno y el área operativa no se usan para completar una autorización base faltante.

Configuración, catálogos, políticas, plantillas y otras capacidades base conservan cobertura administrativa y scope propios.

Una sede o área operativa activa no amplía esos alcances.

#### 25. NEXO híbrido

Una misma persona puede tener simultáneamente:

```text
AdministrativeActiveSite != OperationalActiveSite
AdministrativeActiveArea != OperationalActiveArea
```

Esto es válido.

Cada recurso se autoriza mediante el carril que admita su PermissionKey. La UI debe hacer visible el contexto suficiente para evitar que el actor confunda una vista administrativa con su territorio operativo.

#### 26. AS-IS verificado en `vento-nexo`

El snapshot remoto `vento-nexo@f0a12557a1a258c84b025933653dc756de4b5a59` conserva convergencias pendientes relevantes:

- `src/lib/auth/operational-context.ts` todavía expone `active_site_id`, `selected_site_id`, `employee_default_site_id`, `active_area_id`, `can_operate` y fallbacks locales;
- el mismo helper puede resolver un sitio desde `siteId`, `active_site_id` o `selected_site_id` para aplicar un role override local;
- `src/lib/auth/guard.ts` acepta `siteId` y `areaId` preferidos, resuelve una sesión operacional y todavía contiene una rama local de role override;
- varias superficies de inventario continúan usando combinaciones de `selected_site_id` y `employees.site_id` para formar un sitio visible o activo;
- rutas de catálogo, ubicaciones, entradas, retiros, traslados y fulfillment contienen ejemplos representativos de estas precedencias locales.

Este AS-IS es evidencia de adopción pendiente. No redefine la autoridad canónica.

#### 27. Convergencia técnica futura

La futura materialización deberá retirar o encapsular cualquier reconstrucción local de territorio que compita con el contexto canónico.

El objetivo es:

```text
AccessContextV1 validado
→ territorio del carril aplicable
→ territorio del recurso
→ evaluateAuthorization / frontera server canónica
→ query o mutación ya limitada
→ proyección segura
```

No se autoriza crear un segundo motor territorial dentro de `vento-nexo`.

#### 28. Frontera con `NEXO-AUTH-014`

`NEXO-AUTH-014` conserva la protección de catálogos y configuraciones.

Esta tarea recibe de ella recursos configurativos y permisos ya definidos, pero únicamente especializa cómo se limitan territorialmente cuando el contrato de recurso o el scope contienen sede, área, aplicabilidad o endpoints.

No reabre la semántica de producto, presentación, unidad, categoría, política, precio, sitio o plantilla definida por su propietaria.

#### 29. Frontera con `NEXO-AUTH-016`

`NEXO-AUTH-016` conserva la integración de dispositivo compartido.

Esta tarea solo establece que el dispositivo no puede ampliar el territorio humano o del recurso.

La intersección exacta actor–turno–dispositivo, la identidad del terminal, la expiración y el propósito del dispositivo permanecen reservados a `NEXO-AUTH-016`.

#### 30. Frontera con `NEXO-AUTH-017`

`NEXO-AUTH-017` conserva la simulación estricta.

Esta tarea prohíbe que una simulación o role override modifique el territorio real utilizado para una acción real, pero no diseña el contrato de simulación.

#### 31. Frontera con `NEXO-AUTH-018..020`

Se conservan responsabilidades posteriores:

- `NEXO-AUTH-018` migra consumidores a paquetes compartidos de `vento-shell`;
- `NEXO-AUTH-019` elimina helpers duplicados solo después de demostrar paridad;
- `NEXO-AUTH-020` ejecuta pruebas integrales del frente NEXO-AUTH.

Esta tarea no absorbe esos cierres.

#### 32. Ownership de Supabase

Toda futura modificación de:

- funciones o RPC de contexto;
- RLS;
- grants;
- vistas;
- tablas de asignaciones;
- turno y check-in;
- funciones territoriales;
- índices;
- triggers;
- migraciones;
- tipos generados;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Esta tarea no ejecuta cambios Supabase.

#### 33. Materialización física posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador global no autoriza código ni infraestructura.

Cada materialización futura usa:

```text
NEXO-AUTH-015::<implementation_unit_id>
```

solo después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

La unidad y su lineage se resuelven desde las fuentes canónicas de planificación; esta tarea no inventa `implementation_unit_id` ni reasigna packages.

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea especializa para NEXO obligaciones territoriales, de revalidación, frescura y auditoría ya registradas. No introduce una obligación verificable nueva que requiera otra fila del Registro 04A.

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-007`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-NEXO-009`;
- `TREQ-NEXO-011`.

Estas referencias son trazabilidad heredada y no modifican filas del Registro 04A.

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | El marcador define un contrato documental y no compila ni despliega producto. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido incorporado al checkout local de `NEXO-AUTH-015`; formato, quality, delivery y batería global corresponden al lifecycle documental posterior al reemplazo. |
| REMOTA | PASS | Se verificaron `vento-shell` main `a99c687d4a3a2e7d8f3668693a9c1ee79e74af26`, continuidad que reserva `NEXO-AUTH-015`, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, contratos territoriales `AUTH-MOD-007/008`, proyección territorial `SHELL-CTX-003`, 04A vigente y `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59` para los helpers y superficies AS-IS representativas. |
| OPERATIVA | NOT_APPLICABLE | No se consulta ni modifica información operativa productiva y no se ejecuta un proceso NEXO real. |
| FÍSICA | NOT_APPLICABLE | No se crea ni autoriza `NEXO-AUTH-015::<implementation_unit_id>` durante este marcador global. |

#### 37. Criterios de aceptación

- [x] sede asignada, primaria, seleccionada, administrativa, operativa y del recurso permanecen separadas;
- [x] área asignada, primaria, seleccionada, administrativa, operativa y del recurso permanecen separadas;
- [x] `selected_site_id` no autoriza;
- [x] `selected_area_id` no autoriza;
- [x] `employees.site_id` y `employees.area_id` no son fuentes canónicas de autorización;
- [x] la sede operativa procede del turno válido;
- [x] el área operativa procede del turno cuando existe;
- [x] el check-in confirma y no crea territorio;
- [x] `null` nunca se interpreta como wildcard;
- [x] roles site-wide conservan semántica explícita sin ampliar sede;
- [x] cada recurso se evalúa contra su territorio real;
- [x] recursos multiárea conservan source, target o both según contrato;
- [x] recursos multisede conservan extremos y relaciones propietarias;
- [x] lectura filtra antes de serializar;
- [x] mutación revalida territorio inmediatamente antes del efecto;
- [x] parámetros de URL o formulario son localizadores, no autoridad;
- [x] `BASE_ONLY`, `OPERATIONAL_ONLY`, `BASE_OR_OPERATIONAL` y `BASE_AND_OPERATIONAL` conservan semántica territorial independiente;
- [x] no se mezclan carriles parciales;
- [x] cambios territoriales invalidan decisiones afectadas;
- [x] UI, servidor, RPC y RLS deben converger;
- [x] el AS-IS local con fallbacks queda identificado como convergencia pendiente;
- [x] toda futura modificación Supabase pertenece a `vento-shell`;
- [x] la topología permanece `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [x] no se crean ni modifican TREQ;
- [x] no se ejecuta materialización física desde este marcador.

#### 38. Límites

Esta tarea no:

- modifica código;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica grants;
- cambia turnos;
- cambia check-ins;
- cambia asignaciones laborales;
- cambia coberturas administrativas;
- cambia el catálogo de PermissionKey;
- cambia matrices de rol;
- crea una sede o área;
- modifica `selected_site_id`;
- modifica `selected_area_id`;
- migra consumidores;
- elimina helpers;
- implementa dispositivo compartido;
- implementa simulación;
- ejecuta pruebas integrales físicas;
- crea una instancia física;
- autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-014 — Proteger catálogo y configuraciones`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-015 — Filtrar por sede y área efectivas`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-016 — Integrar dispositivo compartido`
### ✅ NEXO-AUTH-016 — Integrar dispositivo compartido

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-015 — Filtrar por sede y área efectivas
**Tarea siguiente:** NEXO-AUTH-017 — Integrar simulación estricta
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización NEXO del contrato de dispositivo compartido para intersectar identidad humana, contexto, territorio, aplicaciones, techo de permisos, lifecycle y auditoría del dispositivo sin convertir el principal técnico, `navigation_role`, la aplicación visible ni el terminal en autoridad empresarial
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-016::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo NEXO consume el contrato canónico de dispositivo compartido en todas sus superficies protegidas sin tratar la identidad técnica del terminal como trabajador, sin heredar privilegios administrativos, sin autorizar por `navigation_role`, sin convertir una aplicación permitida en un permiso y sin usar sede o área solicitadas por cliente para ampliar el contexto efectivo.

La decisión protegida desde un dispositivo compartido se resuelve como una intersección restrictiva:

```text
DISPOSITIVO CANONICO Y ELEGIBLE
+ NEXO DENTRO DEL CONJUNTO EFECTIVO DE APLICACIONES
+ ACTOR HUMANO EFECTIVO CUANDO LA ACCION LO EXIJA
+ AUTORIDAD PROPIA DEL ACTOR EN EL CARRIL APLICABLE
+ TECHO EFECTIVO DEL DISPOSITIVO
+ POLITICA TERRITORIAL DEL DISPOSITIVO
+ TERRITORIO EFECTIVO DEL ACTOR
+ TERRITORIO Y ESTADO DEL RECURSO
+ CONTROLES ADICIONALES APLICABLES
+ AUSENCIA DE DENEGACIONES
→ ALLOW O DENY NEXO
```

El dispositivo puede reducir autoridad. Nunca puede crearla.

#### 2. Resultado contractual

Quedan fijadas las siguientes obligaciones globales para NEXO:

1. el principal técnico del dispositivo permanece separado del actor humano;
2. `device_id`, endpoint, activo, estación, principal técnico y trabajador conservan identidades independientes;
3. un dispositivo compartido no posee por sí mismo rol base, rol operativo ni permiso empresarial;
4. `navigation_role` es una señal de navegación o presentación y no una fuente de autorización;
5. NEXO dentro del conjunto efectivo de aplicaciones del dispositivo es condición necesaria de superficie, nunca un grant de `nexo.access`;
6. toda capacidad NEXO interna continúa exigiendo su `PermissionKey` exacta;
7. la autoridad humana se intersecta con el techo efectivo del dispositivo y nunca se suma con él;
8. una clave fuera del techo produce `DENY` aunque el trabajador la posea;
9. una clave dentro del techo no produce `ALLOW` si el trabajador no la posee;
10. el actor humano se resuelve desde las fuentes canónicas del dispositivo y del contexto laboral, no desde un `employee_id` elegido libremente por cliente;
11. una firma o PIN puede identificar o atribuir al humano conforme al contrato aprobado, pero no concede permiso, rol, turno, check-in, sede, área ni `ALLOW`;
12. una actor session, cuando aplique, debe ser única, vigente y resoluble; su ausencia o invalidez nunca se rellena con el principal técnico;
13. el cambio de trabajador invalida la autoridad, reautenticaciones, decisiones y estado sensible del actor anterior antes de habilitar al siguiente;
14. el administrador que configuró o usó previamente el terminal no presta privilegios al trabajador actual;
15. la sede y área del dispositivo restringen conforme a sus modos canónicos y no sustituyen la sede o área efectivas del actor;
16. la política territorial de `NEXO-AUTH-015` continúa siendo obligatoria para actor y recurso;
17. una sede o área solicitada por UI, cookie, query, body o estado local puede orientar una solicitud, pero no ampliar autoridad;
18. revocación, suspensión, conflicto, expiración o cambio material del dispositivo invalidan decisiones derivadas según el contrato propietario;
19. una aplicación retirada del dispositivo deja de ser elegible sin conservar acceso por caché o sesión stale;
20. una reducción del paquete máximo invalida las capacidades afectadas aunque una decisión anterior hubiera permitido la acción;
21. UI, Server Actions, Route Handlers, RPC, RLS y cualquier canal equivalente deberán converger en la misma decisión material;
22. una mutación protegida revalida actor, dispositivo, permiso, contexto, territorio, recurso y estado inmediatamente antes del efecto;
23. una decisión `DENY`, un actor no resuelto o un dispositivo no elegible produce cero efectos empresariales;
24. la auditoría conserva principal técnico, dispositivo, actor humano, contexto, permiso, recurso, decisión y resultado sin fusionar identidades;
25. la integración de simulación permanece reservada a `NEXO-AUTH-017`.

#### 3. Fuentes canónicas preservadas

Esta tarea consume sin redefinir:

| Fuente | Regla preservada |
| --- | --- |
| `NEXO-AUTH-001` | carril base y carril operativo permanecen separados; el dispositivo compartido no presta autoridad administrativa |
| `NEXO-AUTH-015` | sede y área efectivas del actor y del recurso se resuelven sin fallbacks permisivos de navegación |
| `AUTH-DEV-001..002` | inventario e identidades de dispositivo, endpoint, activo, estación y principal técnico permanecen separadas |
| `AUTH-DEV-003` | la sede fija del dispositivo es un límite explícito y nunca autoridad del actor |
| `AUTH-DEV-004` | el área fija o conjunto permitido del dispositivo es un límite subordinado a su sede y nunca wildcard |
| `AUTH-DEV-005` | aplicaciones permitidas definen superficie máxima y no conceden `<app>.access` |
| `AUTH-DEV-006` | el paquete de permisos es un techo restrictivo; nunca concede autoridad al actor |
| `AUTH-DEV-007` | firma o PIN identifica al humano mediante validación server-side sin convertirse en permiso |
| `AUTH-DEV-008` | autoridad efectiva = autoridad humana intersectada con techo y restricciones del dispositivo |
| `AUTH-DEV-009` | principal técnico, administrador previo, actor anterior, `navigation_role` y estado residual no transfieren privilegios |
| `AUTH-DEV-010` | dispositivo, principal, actor, contexto, decisión y resultado permanecen correlacionables y separados |
| `AUTH-DEV-011..013` | revocación, expiración y cambio de trabajador invalidan autoridad de forma fail-closed |
| `AUTH-DEV-014` | la certificación física de unidades NEXO compartidas es una responsabilidad separada de este contrato de integración |
| `SHELL-CTX-003` y `@vento/os-context` | el contexto compartido se consume como contexto resuelto; los consumidores no reconstruyen localmente autoridad equivalente |

NEXO no crea una variante local del modelo de dispositivo compartido.

#### 4. Identidades que nunca se fusionan

La integración conserva como identidades distintas:

```text
AUTH TECHNICAL PRINCIPAL
DEVICE_ID
DEVICE_CODE
ENDPOINT_ID
ASSET_ID
STATION_INSTANCE_ID
ACTOR_SESSION_ID
EMPLOYEE_ID
SHIFT_ID
CHECKIN_ID
```

Ninguna coincidencia de UUID, código, sesión, sede, área, terminal, navegador, IP, MAC, serial o fingerprint permite inferir otra identidad.

En particular:

```text
AUTH USER DEL DEVICE != EMPLOYEE ACTOR
DEVICE_ID != EMPLOYEE_ID
NAVIGATION_ROLE != ROLE EFECTIVO
```

#### 5. Principal técnico del dispositivo

El principal técnico demuestra que la solicitud proviene de una identidad técnica aceptada para el dispositivo.

No demuestra:

- qué humano ejecuta la acción;
- qué rol posee ese humano;
- qué turno tiene;
- qué sede o área operativa le corresponde;
- qué permiso posee;
- qué recurso puede mutar;
- que la acción deba permitirse.

NEXO no copiará el identificador del principal técnico a campos de actor humano por conveniencia.

#### 6. Elegibilidad del dispositivo

Antes de utilizar cualquier límite del dispositivo, NEXO debe consumir un estado canónico y vigente de elegibilidad.

Un dispositivo revocado, retirado, suspendido, conflictivo o no resoluble no puede producir nuevos efectos empresariales cuando su lifecycle lo clasifique como no elegible.

Una indisponibilidad técnica no se reinterpreta como dispositivo válido por ausencia de evidencia contraria.

#### 7. Aplicación NEXO permitida

Para una sesión de dispositivo compartido, NEXO debe pertenecer al conjunto efectivo de aplicaciones de la instancia.

```text
NEXO EN DEVICE APPS
→ SUPERFICIE NEXO ELEGIBLE
```

pero:

```text
NEXO EN DEVICE APPS
!=
nexo.access DEL ACTOR
```

El acceso a la aplicación debe seguir resolviendo al actor y la autorización que corresponda. La presencia de NEXO en el launcher, plantilla o binding no constituye permiso.

#### 8. Techo máximo de permisos

El techo efectivo del dispositivo se consume como un conjunto cerrado, exacto y versionado.

Para cada `PermissionKey` NEXO:

```text
ACTOR TIENE LA CLAVE
AND
DEVICE CONSERVA LA CLAVE EN SU TECHO EFECTIVO
→ CONTINUA EVALUACION
```

Cualquier otro resultado produce `DENY` o indisponibilidad conforme al contrato propietario.

Quedan prohibidos:

- wildcards locales;
- inferencia por prefijo;
- inferencia por nombre de rol;
- inferencia por ruta;
- inferencia por aplicación visible;
- ampliación de una instancia sobre su plantilla;
- fallback a un paquete más permisivo.

#### 9. Actor humano efectivo

Cuando una acción NEXO exige actor humano, el actor debe proceder del mecanismo canónico de identificación y sesión del dispositivo.

NEXO no puede resolverlo desde:

- último trabajador usado;
- lista o selector visual de empleados;
- `navigation_role`;
- usuario Auth técnico;
- sede o área del dispositivo;
- último PIN exitoso almacenado;
- turno de otra persona;
- actor de una decisión cacheada.

Si el actor no puede resolverse con evidencia suficiente, la acción empresarial permanece bloqueada.

#### 10. Firma o PIN del trabajador

Una prueba humana ligera se valida server-side y puede producir una referencia opaca de firma o identificación.

El secreto crudo no forma parte de contexto, logs, auditoría, receipts ni payload persistente.

Una firma válida significa, como máximo, que el humano fue identificado para el uso contractual aplicable.

No significa:

```text
PIN VALIDADO = PERMISO
PIN VALIDADO = CHECKIN
PIN VALIDADO = TURNO
PIN VALIDADO = STRONG REAUTH
PIN VALIDADO = ALLOW
```

#### 11. Actor session

Cuando el contrato aplicable exige una sesión de actor, NEXO debe consumir una `actor_session_id` única, vigente y asociada al dispositivo y al empleado correctos.

La sesión de actor:

- identifica al humano efectivo;
- no sustituye Auth personal;
- no crea turno;
- no crea check-in;
- no crea rol;
- no crea permiso;
- no crea territorio.

Si la sesión está expirada, cerrada, ambigua o incompatible, deja de ser autoridad para nuevas acciones.

#### 12. Firma por acción y sesión persistente

La firma por acción y la actor session son conceptos distintos.

Una firma por acción puede atribuir una operación exacta al humano validado. No demuestra por sí sola que exista un lifecycle persistente de actor conforme entre varias superficies y aplicaciones.

Por tanto, NEXO no declarará materializado el cambio de trabajador, expiración o limpieza transversal solo porque exista un helper de firma.

#### 13. Autoridad humana propia

El trabajador aporta únicamente la autoridad que el servidor resuelva para ese mismo actor en el carril exigido por la capacidad.

Para capacidades base:

```text
AUTORIDAD BASE DEL ACTOR ACTUAL
```

Para capacidades operativas:

```text
AUTORIDAD OPERATIVA DEL ACTOR ACTUAL
```

Para modalidades combinadas se conserva la semántica de `NEXO-AUTH-001`.

No se mezclan fragmentos de autoridad de dos actores, dos sesiones o dos carriles.

#### 14. Prohibición de herencia administrativa

El dispositivo no transmite a un trabajador:

- permisos del administrador que lo configuró;
- permisos de una sesión personal previa;
- cobertura administrativa del trabajador anterior;
- elevaciones o reautenticaciones del actor anterior;
- `navigation_role`;
- permisos aparentes del principal técnico;
- autoridad derivada de una credencial técnica privilegiada.

Un trabajador con autoridad administrativa legítima puede ejercer únicamente su propia autoridad, restringida por el dispositivo y el resto del contrato.

#### 15. `navigation_role`

`navigation_role` puede utilizarse para presentación, navegación o experiencia únicamente donde el contrato lo permita.

No puede:

- resolver `PermissionKey`;
- actuar como rol base;
- actuar como rol operativo;
- seleccionar un `ALLOW`;
- completar un actor ausente;
- justificar una mutación.

Toda ruta NEXO que actualmente lo use como autoridad debe converger en la futura materialización sin ampliar permisos durante la transición.

#### 16. Sede fija del dispositivo

La sede fija se consume según el `effect_mode` aprobado por el contrato del dispositivo.

No se transforma en sede del trabajador ni en sede del recurso.

En un modo operativo de coincidencia exacta, la acción debe satisfacer simultáneamente:

```text
SEDE OPERATIVA EFECTIVA DEL ACTOR
∩
SEDE FIJA DEL DEVICE
∩
SEDE DEL RECURSO
```

Cuando el modo sea de propiedad física o custodia, NEXO conserva esa semántica exacta y no inventa una restricción administrativa adicional.

#### 17. Área del dispositivo

La política de área permanece subordinada a la sede fija y se consume según su modo exacto.

No se admite:

```text
area_id = null → ALL_AREAS
```

ni:

```text
DEVICE SITE → TODAS LAS AREAS DE ESA SEDE
```

Cuando el modo exige área exacta o conjunto cerrado, el área efectiva del actor y el recurso deben resultar compatibles con esa política.

#### 18. Territorio efectivo del actor

`NEXO-AUTH-015` permanece autoritativa para resolver sede y área efectivas del actor.

El dispositivo añade una restricción independiente. No sustituye:

- turno;
- check-in;
- cobertura administrativa;
- scope;
- territorio del recurso.

Una acción nunca puede producir `ALLOW` usando territorio del dispositivo para completar un territorio laboral ausente.

#### 19. Territorio solicitado por cliente

`preferredSiteId`, `preferredAreaId`, query params, body, cookies o estado visual no son autoridad.

Pueden representar una intención de navegación o una solicitud de contexto, pero todo valor debe ser validado contra fuentes server-side antes de afectar una decisión.

Queda prohibido:

```text
requested_site ?? device.site_id → ALLOW
requested_area ?? device.area_id → ALLOW
```

sin la evaluación canónica completa.

#### 20. Territorio del recurso

El recurso protegido conserva su propia sede, área, extremos, custodia, ruta o alcance según el dominio.

La sede o área del dispositivo no reescribe el recurso.

Un permiso correcto sobre un recurso territorialmente incompatible permanece denegado.

#### 21. Recursos multiárea, multisede y de tránsito

Para recursos con origen y destino, varias áreas o una ruta, NEXO conserva todos los extremos exigidos por el permiso.

La política del dispositivo se aplica conforme a su modo sin colapsar el recurso a un único `site_id` o `area_id` arbitrario.

La integración no reabre las reglas específicas de remisión, tránsito, recepción o movimientos definidas en `NEXO-AUTH-004..013`.

#### 22. Cambio de trabajador

El cambio A→B debe producir una frontera real de autoridad:

```text
A DEJA DE SER ELEGIBLE
→ AUTORIDAD Y ESTADO SENSIBLE DE A INVALIDOS
→ SIN ACTOR EFECTIVO
→ B SE IDENTIFICA INDEPENDIENTEMENTE
→ CONTEXTO DE B SE RESUELVE DE NUEVO
→ B QUEDA COMO ACTOR EFECTIVO
```

No se permite editar una sesión existente para reemplazar `employee_id`.

B no hereda de A:

- rol;
- permisos;
- turno;
- check-in;
- territorio;
- firmas;
- STRONG;
- borradores personales;
- decisiones cacheadas.

#### 23. Expiración del actor

Cuando la sesión de actor expira, el dispositivo técnico puede seguir autenticado, pero el humano deja de ser elegible.

Nuevas acciones empresariales que exijan humano quedan bloqueadas hasta una nueva identificación válida.

Actividad, navegación, heartbeat, cambio de aplicación o permanencia del turno no renuevan silenciosamente la sesión.

#### 24. Revocación y cambios materiales del dispositivo

Revocación, cambio de sede, cambio de política de área, cambio de aplicaciones, reducción del paquete, cambio de actor y demás cambios materiales invalidan el contexto y las decisiones afectadas.

Un snapshot, caché, token derivado, respuesta tardía o cola offline anterior no conserva autoridad después de la invalidación.

#### 25. Offline, stale y reintentos

Una acción capturada offline o retenida para reintento se reautoriza antes de producir el efecto.

Un `ALLOW` previo no se reutiliza después de:

- cambio de actor;
- expiración;
- revocación;
- cambio territorial;
- cambio de aplicación;
- cambio de techo;
- cambio del recurso;
- cambio del estado empresarial material.

Un resultado incierto se reconcilia antes de reintentar para no duplicar efectos.

#### 26. Acceso a aplicación

NEXO debe separar dos decisiones:

```text
DEVICE PUEDE PRESENTAR NEXO
```

y:

```text
ACTOR PUEDE ACCEDER A NEXO
```

La primera proviene de la política del dispositivo. La segunda continúa siendo autorización empresarial del actor.

No se admite devolver `ALLOW` para `nexo.access` únicamente porque `nexo` aparezca en `allowedAppCodes`.

#### 27. Capacidades internas

Después de superar el acceso a la aplicación, cada capacidad interna conserva su permiso exacto y contrato propietario.

Ejemplos de superficie no equivalentes entre sí incluyen remisiones, inventario, conteos, movimientos, ajustes, catálogo y configuración.

`nexo.access` no concede esas capacidades, y una capacidad visible no concede su mutación.

#### 28. Mutaciones protegidas

Toda mutación desde shared device revalida server-side, inmediatamente antes del efecto:

```text
principal técnico
+ device elegible
+ app permitida
+ actor humano
+ actor session o evidencia humana aplicable
+ PermissionKey
+ carril
+ rol efectivo
+ turno/check-in cuando aplique
+ sede/área efectivas
+ techo del device
+ territorio del device
+ recurso
+ estado
+ controles adicionales
+ denegaciones
```

La omisión de uno de los insumos obligatorios no se repara desde la UI.

#### 29. Lecturas y listados protegidos

Las lecturas que dependen de autorización deben filtrar antes de serializar datos al cliente.

El dispositivo puede reducir el universo visible cuando su política lo exija. Nunca puede ampliarlo.

Una lectura administrativa legítima conserva la autoridad propia del actor y el modo de efecto territorial del dispositivo; una lectura operativa conserva el turno, territorio y límites del device.

#### 30. Convergencia entre canales

Para el mismo snapshot material, los canales que puedan producir el mismo efecto deberán converger en la misma decisión:

- RSC o render server-side;
- Server Actions;
- Route Handlers o API;
- RPC/PostgREST;
- RLS/Data API;
- procesamiento asíncrono;
- Realtime cuando pueda producir o confirmar efectos;
- sincronización offline.

Ocultar un botón no sustituye un `DENY` server-side.

#### 31. Auditoría

Toda acción protegida originada desde dispositivo compartido debe permitir reconstruir, según aplicabilidad:

- principal técnico;
- `device_id`;
- endpoint o referencia técnica segura cuando exista;
- actor humano efectivo;
- `actor_session_id` cuando aplique;
- aplicación;
- permiso exacto;
- carril y roles efectivos;
- turno y check-in;
- sede y área;
- recurso;
- decisión y razones;
- versión contractual;
- correlación e idempotencia cuando apliquen;
- resultado real o ausencia de efecto;
- timestamp confiable.

No se almacenan secretos humanos ni credenciales técnicas completas.

#### 32. Denegación y estados interactivos

Una restricción concluyente de dispositivo, actor o permiso produce cero efectos empresariales.

Los estados interactivos de identificación humana o reautenticación fuerte permanecen separados de una autorización positiva y de una denegación irreversible.

NEXO consume las razones y estados canónicos; no crea aliases locales que alteren su semántica.

#### 33. Seguridad de secretos

PIN, credenciales del endpoint, access tokens, refresh tokens, JWT completos, API keys y secretos equivalentes no se incorporan a:

- contexto empresarial;
- metadata de recurso;
- query strings;
- logs;
- auditoría funcional;
- receipts;
- errores visibles;
- payload de navegación.

Solo se conservan referencias opacas y evidencia segura cuando corresponda.

#### 34. AS-IS verificable de NEXO

El consumidor remoto actual demuestra una integración parcial:

1. `resolveOperationalSession` detecta filas activas de `shared_operational_devices`;
2. consulta `shared_operational_device_apps`;
3. expone `sharedDeviceId`, código, label, `siteId`, `areaId` y `navigationRole`;
4. `requireAppAccess` diferencia un camino de dispositivo compartido;
5. existe un helper de firma por acción que invoca `sign_shared_device_action` y puede devolver trabajador y turno;
6. existe baseline de consumidor que reconoce `@vento/os-context` entre los contratos compartidos esperados.

Estas piezas son base de adopción, no evidencia de conformidad integral.

#### 35. Brechas AS-IS que la materialización deberá cerrar

Se observan, como mínimo, las siguientes diferencias frente al contrato aprobado:

1. el resolvedor actual permite `preferredSiteId ?? sharedDevice.site_id` y `preferredAreaId ?? sharedDevice.area_id`, por lo que la futura materialización debe impedir que una preferencia amplíe territorio;
2. el objeto de sesión actual asigna `role` y `navigationRole` desde `sharedDevice.navigation_role`;
3. la comprobación de permisos del device utiliza `navigationRole` contra `has_operational_role_permission`;
4. el acceso a aplicación del camino shared device puede quedar satisfecho por la presencia de la app en `allowedAppCodes` sin demostrar por sí mismo autoridad humana de `nexo.access`;
5. la firma por acción observada es parcial y no demuestra una actor session persistente, expiración o cambio A→B transversal;
6. no se demuestra en todas las mutaciones NEXO atribución simultánea y separada de principal técnico y actor humano;
7. la coexistencia de helpers actuales no demuestra paridad entre UI, servidor, RPC, RLS, offline y recursos.

Estas brechas describen el objetivo de futuras instancias. No autorizan cambios físicos en este marcador.

#### 36. Estrategia de convergencia

La futura adopción seguirá esta secuencia material por unidad:

```text
CONSERVAR COMPORTAMIENTO LEGACY OBSERVABLE
+ INTRODUCIR RESOLUCION CANONICA DE DEVICE Y ACTOR
+ INTERSECTAR TECHO, TERRITORIO Y AUTORIDAD
+ REVALIDAR EN SERVIDOR
+ MEDIR PARIDAD Y DENY PATHS
+ MIGRAR CONSUMIDORES
+ RETIRAR FALLBACKS SOLO CON EVIDENCIA
```

Durante coexistencia, una ruta legacy no puede mantenerse como fallback más permisivo.

#### 37. Frontera con `AUTH-DEV-014`

`AUTH-DEV-014 — Probar tablets de NEXO` define cómo certificar físicamente una unidad compartida que expone NEXO.

Esta tarea define qué debe significar la integración NEXO con dispositivo compartido.

Por tanto:

```text
NEXO-AUTH-016
= CONTRATO DE INTEGRACION NEXO

AUTH-DEV-014
= CONTRATO DE CERTIFICACION FISICA DEL DEVICE NEXO
```

Una tarea no absorbe a la otra. Una unidad futura puede necesitar satisfacer ambas trazabilidades.

#### 38. Frontera con `NEXO-AUTH-017`

`NEXO-AUTH-017` conserva la integración de simulación estricta.

Esta tarea no autoriza que una simulación altere:

- actor real;
- device real;
- territorio real;
- techo real del dispositivo;
- permiso real;
- auditoría del actor real.

La combinación `shared_device + simulation` deberá consumir ambos contratos sin que uno amplíe al otro.

#### 39. Frontera con `NEXO-AUTH-018`

`NEXO-AUTH-018` conserva la migración de NEXO hacia paquetes compartidos de `vento-shell`.

Esta tarea puede definir la semántica que NEXO debe consumir, pero no obliga a resolver aquí la mecánica final de imports, dependencias, publicación, versionado, compatibilidad o rollout de `@vento/os-context`, `@vento/contracts`, `@vento/supabase` o `@vento/ui-web`.

#### 40. Frontera con `NEXO-AUTH-019`

`NEXO-AUTH-019` conserva el retiro de helpers duplicados.

Esta tarea identifica comportamiento que debe converger, pero no elimina todavía:

- `resolveOperationalSession`;
- evaluadores locales;
- helpers de firma;
- role override;
- adapters transitorios.

Su retiro exige paridad demostrada y un propietario de reemplazo vigente.

#### 41. Frontera con `NEXO-AUTH-020`

`NEXO-AUTH-020` conserva la ejecución integral de pruebas NEXO.

Esta tarea define deny paths y criterios que deberán ser observables, pero no ejecuta la certificación integral ni convierte auditoría estática en evidencia física.

#### 42. Topología física futura

La cardinalidad física es:

```text
mode = PER_IMPLEMENTATION_UNIT
identity = NEXO-AUTH-016::<implementation_unit_id>
execution_gate = POST_E5_PACKAGE
```

Cada futura instancia requiere:

- `implementation_unit_id` asignada;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS`;
- alcance físico exacto;
- autorización física explícita;
- evidencia y rollback propios.

El marcador documental no concede esa autorización.

#### 43. Supabase y ownership

Toda modificación futura de tablas, RPC, RLS, grants, funciones, triggers, Auth, Edge Functions, configuración o datos de Supabase requerida por este contrato pertenece a `vento-group-sas/vento-shell` y debe versionarse allí.

Esta tarea no crea migraciones ni modifica Supabase.

El código consumidor de NEXO se materializa únicamente dentro de una instancia física autorizada y sin redefinir contratos de datos desde el repositorio consumidor.

#### 44. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- identidad, lifecycle, límites y auditoría del dispositivo ya poseen cobertura transversal vigente;
- la intersección entre autoridad humana y techo del dispositivo ya está protegida;
- cambios de sede, área, aplicaciones, paquete, actor y sesión ya están cubiertos por requisitos de invalidación y frescura;
- NEXO ya posee requisitos de autorización, remisiones, paridad y efecto empresarial;
- esta tarea especializa el consumo de contratos existentes sin introducir una obligación verificable nueva fuera de esa cobertura.

#### 45. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro:

- `TREQ-AUTH-003`;
- `TREQ-AUTH-011`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-015`;
- `TREQ-AUTH-019` a `TREQ-AUTH-029`;
- `TREQ-AUTH-034`;
- `TREQ-AUTH-044`;
- `TREQ-AUTH-054`;
- `TREQ-AUTH-055`;
- `TREQ-AUTH-063`;
- `TREQ-AUTH-065`;
- `TREQ-AUTH-145`;
- `TREQ-AUTH-267`;
- `TREQ-AUTH-269`;
- `TREQ-AUTH-271`;
- `TREQ-AUTH-273`;
- `TREQ-AUTH-277`;
- `TREQ-AUTH-278`;
- `TREQ-AUTH-331`;
- `TREQ-NEXO-006`;
- `TREQ-NEXO-009`.

La lista documenta cobertura heredada y no representa actualización del registro.

#### 46. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define contrato documental y no compila ni despliega producto |
| LOCAL | NOT_EXECUTED | incorporación, formato y batería documental corresponden al checkout local de la tarea |
| REMOTA | PASS | auditoría estática sobre `vento-shell` main `73259c4f95f0cb5aff44fb4a6c93b1162fae145c` y `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`; se verificaron continuidad, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, contratos `AUTH-DEV`, `@vento/os-context` y el AS-IS de sesión, guard y firma shared-device de NEXO |
| OPERATIVA | NOT_APPLICABLE | no se identifica trabajadores reales, no se concede ni revoca autoridad y no se ejecutan operaciones NEXO |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza ninguna instancia `NEXO-AUTH-016::<implementation_unit_id>` ni se certifica una unidad física |

#### 47. Criterios de aceptación

- [x] principal técnico y actor humano permanecen separados;
- [x] `device_id`, endpoint, activo, estación y empleado no se fusionan;
- [x] NEXO permitido en el dispositivo no concede `nexo.access`;
- [x] `navigation_role` no concede autoridad;
- [x] toda capacidad interna conserva su `PermissionKey` exacta;
- [x] autoridad humana y techo del dispositivo se intersectan sin suma;
- [x] el device solo restringe y nunca concede;
- [x] firma/PIN no se convierte en permiso, turno, check-in o STRONG;
- [x] actor session y firma por acción conservan semánticas distintas;
- [x] ausencia de actor humano no se rellena con principal técnico;
- [x] cambio A→B invalida autoridad y estado del actor anterior;
- [x] no existe herencia administrativa;
- [x] territorio del actor permanece gobernado por `NEXO-AUTH-015`;
- [x] sede y área del device conservan su propio `effect_mode` y nunca amplían territorio;
- [x] preferencias de sede o área no son autoridad;
- [x] recurso y territorio del recurso permanecen independientes;
- [x] revocación, expiración y cambios materiales invalidan contexto afectado;
- [x] offline y reintentos reautorizan antes del efecto;
- [x] lectura y mutación convergen en controles server-side;
- [x] deny produce cero efectos empresariales;
- [x] auditoría conserva principal, device y actor sin fusionarlos;
- [x] secretos no se incorporan a contexto ni auditoría funcional;
- [x] se documenta el AS-IS parcial del consumidor sin declararlo conforme;
- [x] se documentan los fallbacks observados que deberán cerrarse físicamente;
- [x] `AUTH-DEV-014` conserva la certificación física del dispositivo NEXO;
- [x] `NEXO-AUTH-017` conserva simulación estricta;
- [x] `NEXO-AUTH-018` conserva migración a paquetes compartidos;
- [x] `NEXO-AUTH-019` conserva retiro de helpers duplicados;
- [x] `NEXO-AUTH-020` conserva pruebas integrales;
- [x] topología futura `PER_IMPLEMENTATION_UNIT`;
- [x] gate futuro `POST_E5_PACKAGE`;
- [x] cero cambios de requisitos de prueba;
- [x] cero cambios físicos autorizados en esta tarea.

#### 48. Límites

Esta tarea no modifica código, Supabase, migraciones, RLS, RPC, grants, Auth, datos, dispositivos, endpoints, activos, plantillas, bindings, aplicaciones, paquetes, trabajadores, sesiones, PIN, turnos, check-ins, roles, permisos, navegación, cachés ni despliegues.

No:

- certifica tablets o kioscos;
- crea actor sessions reales;
- ejecuta firmas reales;
- corrige todavía `navigation_role` como autoridad observada;
- corrige todavía acceso implícito de aplicación;
- elimina fallbacks territoriales;
- migra imports a paquetes de `vento-shell`;
- elimina helpers duplicados;
- integra simulación;
- ejecuta pruebas integrales;
- cambia el registro 04A.

Todo cambio físico queda reservado a instancias explícitamente autorizadas.

#### 49. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-015 — Filtrar por sede y área efectivas`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-016 — Integrar dispositivo compartido`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-017 — Integrar simulación estricta`
### ✅ NEXO-AUTH-017 — Integrar simulación estricta

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-016 — Integrar dispositivo compartido
**Tarea siguiente:** NEXO-AUTH-018 — Migrar a paquetes de vento-shell
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización NEXO de simulación estricta para separar autoridad real, evaluación hipotética, presentación read-only y auditoría, prohibiendo que role override, sede, área, turno, check-in o resultado simulado produzcan autoridad empresarial ejecutable
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-017::<implementation_unit_id>` después del package propietario y de `E5-GATE-008::<package_id> = PASS`, con autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Especializar en NEXO el contrato canónico de simulación para que una representación hipotética de rol, sede, área, turno, check-in, permiso o recurso nunca se convierta en autoridad real de lectura protegida, mutación, transición de proceso o efecto empresarial.

La regla raíz queda:

```text
AUTORIDAD REAL NEXO
!=
EVALUACIÓN SIMULADA NEXO
```

Y, de forma operativa:

```text
WOULD_ALLOW
!=
ALLOW
```

```text
ROL SIMULADO
!=
ROL EFECTIVO REAL
```

```text
TERRITORIO SIMULADO
!=
TERRITORIO AUTORIZADO REAL
```

```text
PREVIEW NEXO
!=
CAPACIDAD DE EJECUCIÓN NEXO
```

La simulación podrá explicar, comparar y previsualizar comportamiento NEXO dentro de los límites aprobados, pero no podrá conceder autoridad, completar contexto real ausente ni producir efectos empresariales.

#### 2. Resultado contractual

Quedan fijadas treinta obligaciones NEXO:

1. actor real y actor simulado permanecen separados;
2. sesión real y sesión de simulación permanecen separadas;
3. rol real y rol simulado permanecen separados;
4. sede real y sede simulada permanecen separadas;
5. área real y área simulada permanecen separadas;
6. turno real y turno simulado permanecen separados;
7. check-in real y check-in simulado permanecen separados;
8. permiso real y resultado hipotético permanecen separados;
9. `would_allow` nunca se convierte en `ALLOW`;
10. `would_deny` nunca se registra como una denegación real del actor;
11. `indeterminate` nunca se resuelve por optimismo;
12. el actor real conserva el techo de datos visibles;
13. el escenario simulado no amplía acceso a recursos reales;
14. navegación de preview no concede acceso real;
15. preview NEXO permanece read-only;
16. una Server Action empresarial real rechaza procedencia simulada antes del efecto;
17. Route Handlers, RPC, RLS, Edge Functions, jobs, colas e integraciones no consumen rol o territorio simulado como autoridad;
18. query, cookie, storage, estado React o formulario no autentican una simulación;
19. el inicio de simulación consume el contrato canónico y no un helper local;
20. la salida de simulación requiere retorno a contexto real fresco;
21. simulación expirada, revocada, stale o inválida no se prolonga por navegación;
22. tabs, refresh y respuestas tardías revalidan lifecycle;
23. replay y reintentos no convierten una request simulada en request real;
24. dispositivo compartido no puede iniciar simulación interactiva bajo el contrato vigente;
25. el principal técnico no sustituye al simulador humano;
26. NEXO no inventa aliases locales para estados o razones de simulación;
27. role override legacy se trata como brecha de adopción, no como autoridad canónica;
28. coexistencia temporal exige paridad y fail closed, nunca selección del camino más permisivo;
29. la migración final a contratos compartidos queda reservada a `NEXO-AUTH-018`;
30. la certificación integral queda reservada a `NEXO-AUTH-020`.

#### 3. Handoff recibido de `NEXO-AUTH-016`

`NEXO-AUTH-016` entrega una frontera de dispositivo compartido donde permanecen separados:

```text
PRINCIPAL TÉCNICO
+
DEVICE ID
+
ACTOR HUMANO REAL
+
ACTOR SESSION CUANDO APLIQUE
+
AUTORIDAD HUMANA PROPIA
+
TECHO DEL DEVICE
+
TERRITORIO REAL
```

La tarea anterior reserva explícitamente a esta tarea la simulación estricta y establece que la combinación `shared_device + simulation` no puede permitir que un plano amplíe al otro.

Esta tarea conserva además que:

- `navigation_role` no es autoridad;
- preferencias de sede o área no son autoridad;
- el principal técnico no es trabajador;
- firma por acción y actor session son conceptos distintos;
- la autoridad efectiva no puede exceder al actor humano ni al techo del dispositivo;
- el cambio de actor invalida autoridad y estado del actor anterior.

`NEXO-AUTH-017` añade exclusivamente la frontera de simulación sobre esa base.

#### 4. Contratos transversales consumidos

La especialización consume sin redefinir:

- `AUTH-SIM-001` a `AUTH-SIM-006`, para solicitante, rol, sede, área, turno y separación entre autoridad real y simulada;
- `AUTH-SIM-007` a `AUTH-SIM-011`, para aviso, inicio, salida, bloqueo de ejecución y read-only;
- `AUTH-SIM-012`, para navegación de preview;
- `AUTH-SIM-013`, para Server Actions;
- `AUTH-SIM-014`, para certificación transversal por aplicación;
- `AUTH-SRV-015`, para separación server-side entre contexto real y simulado;
- `AUTH-DB-013`, para persistencia y auditoría del lifecycle de simulación;
- `NEXO-AUTH-001` a `NEXO-AUTH-016`, para carriles, capacidades, territorio y dispositivo compartido;
- los contratos vigentes de permiso, scope, recurso, denegaciones, frescura, auditoría, idempotencia, concurrencia y privacidad;
- `@vento/os-context` como contrato compartido de contexto cuando corresponda a la futura adopción física.

NEXO no crea una variante local del modelo de simulación.

#### 5. Cuatro planos obligatorios

Toda integración NEXO conserva exactamente cuatro planos:

| Plano | Fuente | Propósito | Puede producir autoridad real |
| --- | --- | --- | ---: |
| `REAL_AUTHORITY_PLANE` | actor, sesión, permisos, territorio, recurso y denegaciones reales | controlar acceso y ejecución real | Sí |
| `SIMULATED_EVALUATION_PLANE` | escenario hipotético tipado y versionado | producir `would_allow`, `would_deny` o `indeterminate` | No |
| `SIMULATION_PRESENTATION_PLANE` | resultado hipotético ya evaluado | mostrar preview, navegación y razones | No |
| `SIMULATION_AUDIT_PLANE` | actor real + escenario + resultados + lifecycle | trazabilidad y reproducción | No |

Ningún campo del plano simulado puede rellenar silenciosamente un requisito ausente del plano real.

#### 6. Doble resultado obligatorio

Una evaluación deberá mantener simultáneamente:

```text
REAL_DECISION
+
SIMULATED_RESULT
```

Nunca:

```text
MIXED_EFFECTIVE_DECISION
```

Casos mínimos:

```text
REAL_DENY + WOULD_ALLOW
=
SIN ACCESO REAL
```

```text
REAL_ALLOW + WOULD_DENY
=
ACTOR REAL PUEDE VER LA EXPLICACIÓN AUTORIZADA,
PERO EL ESCENARIO SIMULADO RESULTA DENEGADO
```

```text
REAL_ALLOW + WOULD_ALLOW
=
PREVIEW EXPLICATIVA,
NO EJECUCIÓN
```

#### 7. Actor simulador

NEXO no decide por sí mismo quién puede simular.

La elegibilidad proviene del contrato transversal y exige, según aplicabilidad:

- actor humano real inequívoco;
- sesión personal real válida;
- permisos reales de simulación;
- alcance real suficiente;
- justificación;
- reautenticación fuerte cuando corresponda;
- ausencia de denegaciones;
- contexto real no simulado.

Ni el nombre `propietario`, ni `gerente_general`, ni un booleano local de privilegio, ni la visibilidad de un selector satisfacen por sí solos esta elegibilidad.

#### 8. Dispositivo compartido como solicitante

Bajo el contrato vigente:

```text
INICIO INTERACTIVO DE SIMULACIÓN
DESDE DISPOSITIVO COMPARTIDO
=
DENY
```

El principal técnico, el `device_id`, el `navigation_role`, la firma ligera del trabajador o el techo del dispositivo no convierten la estación en un simulador autorizado.

Si una futura política habilitara simulación desde un dispositivo administrado, requerirá un contrato explícito posterior. Esta tarea no lo habilita.

#### 9. Identidad del rol simulado

Toda simulación de rol deberá consumir una referencia tipada y versionada equivalente a:

```text
role_kind
+
role_code
+
catalog_version
+
matrix_version
```

Reglas NEXO:

1. una cadena bare no basta;
2. rol base y rol operativo no se confunden;
3. un label de interfaz no sustituye el código canónico;
4. `navigation_role` no sustituye el rol simulado;
5. un rol legacy, ambiguo, inactivo, deprecado o no materializado falla cerrado conforme al contrato transversal;
6. seleccionar un rol no concede permisos reales.

#### 10. Sede simulada

La sede simulada es parte del escenario hipotético.

No puede reemplazar:

- sede administrativa real;
- sede operativa real;
- sede del turno real;
- sede del check-in real;
- sede del recurso real;
- sede fija del dispositivo.

Un `site_id` proveniente de query, cookie, selector, formulario o estado cliente nunca se convierte por ello en sede simulada autoritativa ni en sede real autorizada.

#### 11. Área simulada

El área simulada permanece separada de:

- área administrativa real;
- área operativa real;
- área del turno;
- área del check-in;
- área del recurso;
- política de área del dispositivo.

Una simulación puede representar un área hipotética cuando el contrato lo permite, pero no puede escribirla sobre `active_area_id`, reutilizarla como área real de una mutación o completar un contexto real ausente.

#### 12. Turno y check-in simulados

Un turno o check-in hipotéticos solo explican cómo se evaluaría un escenario.

```text
SIMULATED_SHIFT
!=
ACTIVE_REAL_SHIFT
```

```text
SIMULATED_CHECKIN
!=
REAL_CHECKIN
```

No satisfacen prerrequisitos reales de remisión, inventario, producción vinculada, recepción, ajuste, conteo, movimiento ni otra capacidad NEXO.

#### 13. Contexto real de NEXO

Toda operación real sigue utilizando el contexto real definido por `NEXO-AUTH-001` a `NEXO-AUTH-016`.

La simulación no modifica:

- actor efectivo real;
- rol base real;
- rol operativo real;
- turno real;
- check-in real;
- sede real;
- área real;
- device real;
- permisos reales;
- scopes reales;
- recurso real;
- denegaciones reales.

Una mutación nunca utiliza el escenario simulado como contexto de autorización.

#### 14. Techo de datos reales

La simulación no permite leer datos empresariales que el actor real no puede leer.

```text
DATOS REALES VISIBLES EN PREVIEW
⊆
DATOS REALES AUTORIZADOS AL SIMULADOR
```

La simulación puede explicar que un rol hipotético tendría determinada capacidad sin revelar filas, atributos, personas, documentos, cantidades, costos, auditoría o configuraciones fuera del alcance real del actor.

Un resultado `would_allow` no funciona como filtro de seguridad de datos.

#### 15. Clasificación por capacidad

NEXO consume la clasificación canónica vigente de simulación por `PermissionKey`.

Para una capacidad concreta, la integración deberá respetar la clasificación vigente equivalente a:

- `FULL_PREVIEW`;
- `DECISION_ONLY`;
- `NOT_ALLOWED`.

Reglas:

1. NEXO no reclasifica una capacidad localmente;
2. una clasificación desconocida falla cerrado para preview;
3. `FULL_PREVIEW` sigue siendo no ejecutable;
4. `DECISION_ONLY` no habilita formulario operativo ni datos protegidos por autoridad simulada;
5. `NOT_ALLOWED` no se degrada a preview parcial.

#### 16. Navegación simulada

La navegación puede preservar una simulación vigente, pero nunca concede autoridad.

```text
ROUTE CHANGE
!=
EXIT SIMULATION
```

```text
ROUTE REACHED UNDER SIMULATION
!=
REAL AUTHORITY ON DESTINATION
```

Pathname, query, hash, history state, referrer, cookie aislada, storage o estado React no prueban lifecycle vigente.

Cada destino debe resolver el estado de simulación desde el owner correspondiente.

#### 17. Preview read-only

Mientras exista procedencia simulada activa, la representación NEXO permanece read-only respecto de efectos empresariales reales.

La UI puede mostrar:

- acciones hipotéticamente disponibles;
- navegación hipotética;
- razones de allow o deny;
- contexto simulado;
- diferencias frente al contexto real;
- recursos sintéticos o proyecciones seguras cuando el contrato lo permita.

No puede utilizar el preview para:

- crear;
- editar;
- cancelar;
- preparar;
- despachar;
- recibir;
- ajustar;
- contar;
- transferir;
- retirar;
- mover inventario;
- cambiar catálogo o configuración;
- imprimir efectos reales;
- generar integraciones reales.

#### 18. Server Actions

Toda Server Action NEXO que pueda producir un efecto empresarial deberá rechazar procedencia simulada antes del primer efecto real.

```text
SIMULATED ORIGIN
+
BUSINESS SERVER ACTION
=
DENY BEFORE EFFECT
```

El deny debe ocurrir antes de:

- `insert`;
- `update`;
- `delete`;
- RPC mutante;
- movimiento de inventario;
- transición de estado;
- evento empresarial;
- outbox;
- notificación;
- impresión;
- webhook;
- job o cola;
- efecto externo.

Una transacción posterior no sustituye el guard previo.

#### 19. Lecturas protegidas server-side

Una lectura real protegida alcanzada desde una preview deberá:

- usar exclusivamente la autoridad real del actor;
- aplicar el techo de datos reales;
- minimizar campos según el contrato;
- denegar cuando el actor real no posea acceso;
- mantener separado el resultado simulado.

La lectura no utiliza el rol simulado para ampliar RLS, filtros, RPC o proyecciones.

#### 20. RPC, PostgREST y RLS

NEXO no puede enviar rol, sede, área, turno o permiso simulados a RPC o RLS como si fueran identidad real.

Reglas:

1. el servidor resuelve la autoridad real de forma independiente;
2. una RPC de evaluación hipotética permanece separada de una RPC empresarial;
3. RLS no interpreta cookies, query strings o payloads de preview como grants;
4. `service_role` no crea autoridad humana;
5. una policy permisiva en otra capa no convierte la simulación en ejecutable;
6. la decisión material debe converger entre canales.

#### 21. Route Handlers, APIs, Edge Functions e integraciones

La misma frontera aplica a cualquier canal capaz de producir el mismo efecto:

- Route Handler;
- API;
- Edge Function;
- webhook;
- job;
- cola;
- Realtime con efecto;
- cliente offline;
- integración externa;
- periférico.

Una superficie no cubierta por el frontend no queda fuera de la restricción.

#### 22. Inicio canónico de simulación

NEXO no puede iniciar simulación escribiendo solamente un cookie de rol o sede.

El inicio válido pertenece al owner transversal y deberá producir una sesión o revisión de simulación autoritativa, correlacionable y con lifecycle verificable.

La futura adopción podrá consumir la superficie compartida correspondiente de `@vento/os-context`, siempre que la implementación física vigente satisfaga los contratos canónicos y no reintroduzca mezcla entre contexto real y simulado.

La existencia actual de `startContextSimulation` no constituye por sí sola certificación.

#### 23. Salida canónica de simulación

La salida válida deberá:

1. terminar el lifecycle de simulación mediante su owner;
2. invalidar proyecciones, caches y resultados simulados afectados;
3. descartar submits o drafts que dependan de la procedencia simulada cuando no sean reutilizables de forma segura;
4. resolver nuevamente actor y contexto reales;
5. exigir una nueva intención para cualquier acción empresarial posterior.

```text
EXIT SIMULATION
!=
AUTOEXECUTE PREVIOUS ACTION
```

#### 24. Lifecycle visible

NEXO deberá distinguir, según el contrato vigente, estados como:

```text
RESOLVING
ACTIVE
STALE
INVALID
EXIT_PENDING
```

y estados terminales persistidos.

Reglas:

- `RESOLVING` no habilita;
- `ACTIVE` sigue siendo no ejecutable;
- `STALE` suspende el preview hasta revalidación;
- `INVALID` no cae automáticamente a un contexto real permisivo;
- `EXIT_PENDING` mantiene procedencia simulada;
- un terminal no resucita por refresh, back, deep link o cache.

#### 25. Varias pestañas y concurrencia

Todas las tabs asociadas al mismo lifecycle deberán converger.

Una tab no puede:

- conservar `ACTIVE` después de expiración o revocación;
- ocultar el aviso por estado local;
- ejecutar una mutación porque otra tab salió;
- reactivar un resultado anterior;
- restaurar un rol simulado desde cookie stale;
- convertir una respuesta tardía en autoridad vigente.

Cambios materiales revalidan antes de continuar.

#### 26. Offline, retry y replay

Una simulación no crea autoridad offline.

Reglas:

1. una request simulada capturada offline no se convierte en mutación real al sincronizar;
2. un resultado `would_allow` cacheado no se reutiliza como decisión real;
3. reintentos conservan procedencia simulada;
4. idempotency keys de preview no se reutilizan para ejecutar una acción real posterior;
5. después de salir, una operación real exige request nueva y autorización real fresca;
6. replay de una request de simulación terminal permanece bloqueado.

#### 27. Auditoría

Toda evaluación NEXO bajo simulación debe permitir reconstruir, según aplicabilidad:

- actor real;
- sesión real;
- rol base real;
- rol operativo real;
- sede y área reales;
- turno y check-in reales;
- device real cuando exista;
- `simulation_request_id` o identidad equivalente;
- sesión o revisión de simulación;
- sujeto simulado;
- rol simulado tipado;
- sede, área, turno y check-in simulados;
- permiso y recurso evaluados;
- decisión real;
- resultado hipotético;
- razones estructuradas;
- clasificación de simulación;
- versión contractual;
- timestamp confiable;
- correlación.

La auditoría no convierte el resultado simulado en autoridad.

#### 28. Errores y razones

NEXO consume las razones canónicas de simulación y autorización.

Una acción real bloqueada por procedencia simulada no debe presentarse como éxito, fallo de datos o ausencia genérica de permisos si existe un código propietario más específico.

A la inversa, un error técnico no debe etiquetarse falsamente como una denegación de simulación.

La precedencia de razones permanece gobernada por el contrato transversal.

#### 29. AS-IS verificable de NEXO

El consumidor remoto actual demuestra una implementación local de “modo prueba” basada en role override:

1. existe el cookie `nexo_role_override`;
2. `propietario` y `gerente_general` pueden activar overrides mediante `PRIVILEGED_ROLE_OVERRIDES`;
3. la UI permite escoger valores de `ROLE_OPTIONS` y conserva el cookie durante hasta treinta días;
4. `checkPermissionWithRoleOverride` sustituye la evaluación real por una evaluación de permisos del rol override cuando el actor local es elegible;
5. el helper incluye una excepción específica de tránsito para `conductor`;
6. `applyNexoRoleOverrideArea` puede modificar `active_operational_role`, `active_area_id` y `active_area_kind` del contexto retornado;
7. el área simulada local se deriva por nombre de rol para `cocinero`, `barista` y `cajero`;
8. el resolvedor puede usar `siteId`, `active_site_id` o `selected_site_id` para localizar esa área;
9. páginas y Server Actions de remisiones consumen `checkPermissionWithRoleOverride`;
10. el menú permite además cambiar sede mediante query, cookie local y `employee_settings.selected_site_id`;
11. `vento-nexo` no muestra consumo directo de `startContextSimulation` o `stopContextSimulation` de `@vento/os-context` en la evidencia revisada.

Estas piezas demuestran comportamiento de prueba legacy, no integración canónica de simulación estricta.

#### 30. Brechas AS-IS obligatorias de cierre

La futura materialización deberá cerrar al menos estas brechas:

1. un cookie local no puede ser la fuente autoritativa de una sesión de simulación;
2. `canUseRoleOverride` no puede sustituir elegibilidad canónica del simulador;
3. el nombre del rol simulado no puede convertirse en rol real efectivo;
4. `active_operational_role` real no puede mutarse por un override de preview;
5. `active_area_id` real no puede mutarse por un área simulada;
6. `selected_site_id` o una query no pueden completar territorio simulado o real de forma permisiva;
7. un helper de permisos de rol simulado no puede autorizar mutaciones reales;
8. la excepción local de `conductor` no puede escapar al contrato de simulación y autorización;
9. una Server Action de remisiones no puede ejecutar porque `checkPermissionWithRoleOverride` devolvió `true` bajo procedencia simulada;
10. el cliente no puede fijar una duración de simulación incompatible con el owner;
11. el cambio de rol o sede de preview debe ser auditable y versionado;
12. salida, expiración, revocación, stale e invalidación deben converger entre superficies;
13. el preview debe mostrar aviso persistente y remain read-only;
14. una mutación debe rechazar simulación antes del primer efecto;
15. la adopción debe retirar el role override como autoridad, no ocultarlo detrás de otro nombre.

#### 31. Estrategia de convergencia

La futura adopción por unidad seguirá:

```text
IDENTIFICAR SUPERFICIES QUE CONSUMEN ROLE OVERRIDE
+
INTRODUCIR RESOLUCIÓN CANÓNICA DE SIMULACIÓN
+
SEPARAR CONTEXTO REAL Y ESCENARIO HIPOTÉTICO
+
SEPARAR REAL_DECISION Y SIMULATED_RESULT
+
BLOQUEAR WRITERS DESDE PREVIEW
+
PRESERVAR TECHO DE DATOS DEL ACTOR REAL
+
MEDIR PARIDAD Y DENY PATHS
+
RETIRAR COOKIES Y HELPERS AUTORITATIVOS SOLO CON EVIDENCIA
```

Durante coexistencia no se calcula ambos caminos para escoger el `ALLOW` más favorable.

#### 32. Compatibilidad transitoria

Un adapter transitorio puede existir únicamente cuando:

- conserva actor real y simulado separados;
- no cambia la modalidad de una capacidad;
- no amplía territorio;
- no produce un `ALLOW` real desde el rol simulado;
- registra procedencia suficiente;
- permite comparar decisiones;
- falla cerrado ante divergencia material;
- tiene owner de retiro en `NEXO-AUTH-019` cuando corresponda.

Compatibilidad no significa mantener una ruta legacy más permisiva.

#### 33. Frontera con `NEXO-AUTH-016`

`NEXO-AUTH-016` conserva la integración de dispositivo compartido.

Esta tarea no redefine:

- identidad de device;
- actor session;
- techo de aplicaciones o permisos del device;
- sede o área del device;
- firma por acción;
- lifecycle de device.

La simulación nunca amplía ese contrato.

Bajo el contrato vigente, el dispositivo compartido no inicia simulación interactiva.

#### 34. Frontera con `NEXO-AUTH-018`

`NEXO-AUTH-018` conserva la migración hacia paquetes compartidos de `vento-shell`.

Esta tarea define la semántica que debe consumirse, pero no ejecuta aquí:

- cambio de imports;
- publicación de packages;
- pinning de versiones;
- rollout de `@vento/os-context`;
- sustitución de contratos locales;
- migración de consumidores.

La existencia actual del paquete compartido no convierte esta tarea en una migración de dependencias.

#### 35. Frontera con `NEXO-AUTH-019`

`NEXO-AUTH-019` conserva la eliminación de helpers duplicados.

Esta tarea identifica como candidates de convergencia, entre otros:

- `getRoleOverrideFromCookies`;
- `canUseRoleOverride`;
- `checkPermissionWithRoleOverride`;
- `applyNexoRoleOverrideArea`;
- configuración local de role override;
- cookies locales de role y site override.

No se eliminan todavía. Su retiro exige reemplazo canónico y paridad demostrada.

#### 36. Frontera con `NEXO-AUTH-020`

`NEXO-AUTH-020` conserva la ejecución integral de pruebas NEXO.

Esta tarea define los escenarios que deberán existir, pero no declara PASS físico para:

- navegación simulada;
- preview read-only;
- Server Actions;
- Route Handlers;
- RPC;
- RLS;
- offline;
- replay;
- lifecycle;
- varias tabs;
- dispositivo compartido;
- efectos empresariales.

#### 37. Topología física futura

La cardinalidad física es:

```text
mode = PER_IMPLEMENTATION_UNIT
identity = NEXO-AUTH-017::<implementation_unit_id>
execution_gate = POST_E5_PACKAGE
```

Cada futura instancia requiere:

- `implementation_unit_id` asignada;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS`;
- alcance físico exacto;
- autorización física explícita;
- evidencia propia;
- rollback propio.

El marcador documental no concede autorización física.

#### 38. Supabase y ownership

Toda modificación futura de tablas, RPC, RLS, funciones, triggers, grants, Auth, Edge Functions, configuración o datos de Supabase requerida por esta integración pertenece a `vento-group-sas/vento-shell` y debe versionarse allí.

Esta tarea no crea migraciones ni modifica Supabase.

El repositorio consumidor NEXO no redefine el modelo persistente de simulación ni crea un datastore paralelo.

#### 39. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- la separación estricta entre autoridad real y simulada ya posee cobertura transversal vigente;
- lifecycle, read-only, navegación, Server Actions, paridad de canales, cero efectos y replay ya están cubiertos;
- el contrato de dispositivo compartido ya protege separación entre principal técnico y actor humano;
- NEXO ya posee cobertura de autorización, territorio, remisiones, recursos y efectos empresariales;
- esta tarea especializa el consumo NEXO de obligaciones existentes sin introducir una obligación verificable nueva fuera de esa cobertura.

#### 40. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro, la cobertura vigente asociada a:

- separación entre autoridad real y simulada;
- resultados `would_allow`, `would_deny` e `indeterminate` no ejecutables;
- actor, rol, sede, área, turno y check-in simulados;
- inicio y salida autoritativos;
- aviso persistente y read-only;
- bloqueo antes de efectos empresariales;
- navegación y Server Actions;
- paridad entre canales;
- lifecycle, invalidación, cache, offline, retry y replay;
- reconciliación física de consumidores legacy;
- dispositivos compartidos;
- autorización territorial y de recursos NEXO.

Trazabilidad vigente reutilizada: `TREQ-AUTH-011`, `TREQ-AUTH-012`, `TREQ-AUTH-013`, `TREQ-AUTH-014`, `TREQ-AUTH-015`, `TREQ-AUTH-085`, `TREQ-AUTH-086`, `TREQ-AUTH-119` a `TREQ-AUTH-128`, `TREQ-AUTH-165`, `TREQ-AUTH-267`, `TREQ-AUTH-279` a `TREQ-AUTH-288`, `TREQ-NEXO-006` y `TREQ-NEXO-009`.

Estas referencias constituyen trazabilidad heredada y no representan cambios al registro.

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | el marcador define contrato documental y no compila ni despliega producto |
| LOCAL | NOT_EXECUTED | incorporación, formateo, task quality, delivery check y batería documental corresponden al checkout local de la tarea |
| REMOTA | PASS | auditoría estática sobre `vento-shell` main `52e52b8bf4acb98d1070dba3651eacf6ed73ebbf` y `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`; se verificaron continuidad `NEXO-AUTH-016 -> NEXO-AUTH-017 -> NEXO-AUTH-018`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, contratos `AUTH-SIM-001..014`, `@vento/os-context` y el AS-IS de role override, contexto operativo, menú y Server Actions NEXO |
| OPERATIVA | NOT_APPLICABLE | no se inició simulación real, no se ejecutó preview desplegada ni se produjo una operación NEXO |
| FÍSICA | NOT_APPLICABLE | no se crea ni autoriza ninguna instancia `NEXO-AUTH-017::<implementation_unit_id>` ni se modifica consumidor, Supabase o despliegue |

#### 42. Criterios de aceptación

- [x] actor real y actor simulado quedan separados;
- [x] sesión real y sesión de simulación quedan separadas;
- [x] rol real y rol simulado quedan separados;
- [x] sede real y simulada quedan separadas;
- [x] área real y simulada quedan separadas;
- [x] turno real y simulado quedan separados;
- [x] check-in real y simulado quedan separados;
- [x] `WOULD_ALLOW != ALLOW`;
- [x] `WOULD_DENY` no sustituye decisión real;
- [x] `INDETERMINATE` no se resuelve permisivamente;
- [x] se preservan cuatro planos independientes;
- [x] se preserva doble resultado real + hipotético;
- [x] datos visibles no exceden autoridad real del simulador;
- [x] la clasificación de simulación se consume sin redefinirla;
- [x] `FULL_PREVIEW` permanece no ejecutable;
- [x] `DECISION_ONLY` no habilita writer ni datos protegidos;
- [x] `NOT_ALLOWED` no se degrada;
- [x] clasificación desconocida falla cerrado;
- [x] navegación no crea autoridad;
- [x] preview permanece read-only;
- [x] Server Actions empresariales deniegan antes del efecto;
- [x] lecturas protegidas usan autoridad real;
- [x] RPC y RLS no consumen contexto simulado como grant;
- [x] Route Handlers, APIs, jobs, colas e integraciones conservan la frontera;
- [x] inicio y salida de simulación pertenecen al owner transversal;
- [x] dispositivo compartido no inicia simulación interactiva bajo el contrato vigente;
- [x] principal técnico no sustituye simulador humano;
- [x] varias tabs y respuestas tardías revalidan lifecycle;
- [x] offline, retry y replay no convierten preview en ejecución;
- [x] auditoría conserva actor real, escenario y doble resultado;
- [x] role override actual queda clasificado como brecha de adopción;
- [x] el cookie local no se eleva a sesión canónica de simulación;
- [x] `active_operational_role` real no puede ser sustituido por override simulado;
- [x] `active_area_id` real no puede ser sustituido por área simulada;
- [x] Server Actions actuales que consumen role override quedan dentro del alcance futuro;
- [x] la excepción local de conductor no crea bypass de simulación;
- [x] coexistencia transitoria no escoge el `ALLOW` más favorable;
- [x] `NEXO-AUTH-018` conserva migración a paquetes;
- [x] `NEXO-AUTH-019` conserva retiro de helpers duplicados;
- [x] `NEXO-AUTH-020` conserva certificación integral;
- [x] topología futura `PER_IMPLEMENTATION_UNIT`;
- [x] gate futuro `POST_E5_PACKAGE`;
- [x] cero cambios de requisitos de prueba;
- [x] cero cambios físicos autorizados en esta tarea.

#### 43. Límites

Esta tarea no:

- modifica código NEXO;
- modifica código SHELL;
- modifica Supabase;
- crea migraciones;
- cambia RLS;
- cambia RPC;
- cambia grants;
- cambia Auth;
- crea o termina sesiones reales de simulación;
- cambia cookies en producción;
- elimina role override;
- cambia `ROLE_OPTIONS`;
- cambia permisos;
- cambia matrices;
- cambia roles;
- cambia sede o área real;
- cambia turnos o check-ins;
- cambia dispositivos compartidos;
- cambia actor sessions;
- modifica remisiones;
- produce movimientos de inventario;
- despliega packages;
- migra imports a `@vento/os-context`;
- elimina helpers duplicados;
- certifica una aplicación o unidad física;
- crea ni modifica requisitos de prueba;
- modifica 04A;
- desarrolla `NEXO-AUTH-018`;
- desarrolla `NEXO-AUTH-019`;
- desarrolla `NEXO-AUTH-020`.

#### 44. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-016 — Integrar dispositivo compartido`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-017 — Integrar simulación estricta`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-018 — Migrar a paquetes de vento-shell`
### ✅ NEXO-AUTH-018 — Migrar a paquetes de vento-shell

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-017 — Integrar simulación estricta
**Tarea siguiente:** NEXO-AUTH-019 — Eliminar helpers duplicados
**Tipo de tarea:** documental; contrato canónico de adopción gobernada de paquetes compartidos de `vento-shell` por NEXO, con paridad, compatibilidad, coexistencia temporal, rollback y materialización posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT`
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica dependencias, lockfiles, imports, packages, exports, código de NEXO, Supabase, migraciones, RLS, RPC, datos, configuración, CI, releases, registry, despliegues ni helpers legacy
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo NEXO deberá migrar responsabilidades transversales actualmente resueltas de forma local hacia las familias compartidas canónicas de `vento-shell`, sin convertir esa migración en una extracción indiscriminada de código y sin confundir:

- reutilización con transferencia de ownership;
- package existente con release consumible;
- compatibilidad teórica con adopción;
- baseline del consumidor con cutover;
- paridad contractual con reproducción de un bug legacy;
- adapter temporal con nueva fuente de verdad;
- dependencia instalada con autorización correcta;
- UI compartida con lógica empresarial;
- cliente Supabase compartido con autoridad empresarial;
- eliminación de duplicados con adopción inicial.

La regla raíz queda:

```text
SHARED RESPONSIBILITY
+
CANONICAL PACKAGE READY
+
EXACT CONSUMER VERSION
+
COMPATIBILITY PASS
+
CONTRACTUAL PARITY
+
FAIL-CLOSED CUTOVER
+
REPRODUCIBLE ROLLBACK
=
NEXO PACKAGE ADOPTION
```

Y simultáneamente:

```text
PACKAGE INSTALLED
!=
PACKAGE ADOPTED
```

```text
LOCAL CODE EXISTS
!=
LOCAL CODE MUST BECOME SHARED
```

```text
SHARED PACKAGE
!=
NEXO DOMAIN OWNER
```

---

#### 2. Resultado material

La tarea fija un contrato completo para que cada futura unidad física de adopción:

1. reconcilie las cuatro familias compartidas canónicas contra las superficies NEXO realmente consumidoras;
2. clasifique cada superficie local como adopción directa, adapter local necesario, responsabilidad de dominio que permanece local o candidato de retiro posterior;
3. exija release consumible y versión exacta antes de modificar `package.json` o lockfile del consumidor;
4. use las relaciones package–NEXO y perfiles de compatibilidad ya canónicos;
5. compare comportamiento legacy y canónico con un oracle contractual;
6. prohíba doble ejecución de side effects durante coexistencia;
7. corte por superficie o unidad únicamente con evidencia atribuible;
8. preserve rollback sin reactivar bypasses prohibidos;
9. entregue los candidatos de retiro a `NEXO-AUTH-019`;
10. entregue la certificación integral a `NEXO-AUTH-020`.

Esta tarea no ejecuta la migración física.

---

#### 3. Handoff recibido de NEXO-AUTH-017

`NEXO-AUTH-017` conserva la separación estricta entre:

```text
REAL_AUTHORITY_PLANE
SIMULATED_EVALUATION_PLANE
SIMULATION_PRESENTATION_PLANE
SIMULATION_AUDIT_PLANE
```

y fija:

```text
WOULD_ALLOW != ALLOW
```

La adopción de packages no puede degradar esa separación.

En particular, una migración de contexto o autorización no podrá preservar como autoridad final:

- `nexo_role_override`;
- una cookie de rol o sede declarada por cliente;
- un `navigation_role`;
- `can_operate`;
- un booleano legacy de permiso;
- `EffectiveContext` interpretado sin su contrato vigente;
- sede, área, actor, turno o check-in aportados por el caller como hechos efectivos;
- un helper local que produzca un `ALLOW` más permisivo que el contrato canónico.

---

#### 4. Universo cerrado de packages compartidos

La adopción NEXO se limita a estas cuatro familias canónicas:

| Package | Responsabilidad canónica para esta tarea | Relación con NEXO |
| --- | --- | --- |
| `@vento/contracts` | contratos estáticos, catálogos, schemas, identificadores y tipos compartidos | consumidor |
| `@vento/os-context` | resolución runtime de contexto y autorización compartida | consumidor |
| `@vento/supabase` | acceso técnico compartido a Supabase según frontera runtime | consumidor |
| `@vento/ui-web` | implementación visual web compartida y composición neutral | consumidor |

No se crea una quinta familia por conveniencia local.

Una responsabilidad NEXO que no pertenezca a estas cuatro fronteras permanece en NEXO o en su owner canónico ya existente.

---

#### 5. Estado físico observado de los packages

El estado remoto verificado no equivale todavía a un conjunto completo de releases estables consumibles:

| Package | Estado observado relevante |
| --- | --- |
| `@vento/contracts` | workspace privado con metadata `1.0.0-alpha.1`; no constituye release estable adoptada |
| `@vento/os-context` | workspace privado `0.1.0` con entrypoint interno; su presencia no demuestra publicación ni adopción NEXO |
| `@vento/supabase` | raíz privada de autoría sin versión pública ni exports npm consumibles |
| `@vento/ui-web` | raíz privada de autoría sin versión pública, `main`, `types` o exports npm consumibles |

Consecuencia:

```text
WORKSPACE MATERIALIZED
!=
STABLE RELEASE ELIGIBLE FOR NEXO
```

La futura instancia física deberá consumir releases realmente elegibles bajo el lifecycle propietario de packages. Esta tarea no promueve metadata privada actual a release estable.

---

#### 6. Estado físico observado de NEXO

El `package.json` vigente de `vento-nexo` no declara dependencias `@vento/*`.

Sí conserva tooling de baseline que conoce las cuatro familias mediante `SHELL-CI-007::GLOBAL`.

Por tanto:

```text
BASELINE READY
+
ZERO @vento/* DECLARED DEPENDENCIES
=
CONSUMER PREPARED FOR GOVERNED MIGRATION,
NOT MIGRATED
```

No se interpretan los imports locales ni los helpers actuales como adopción implícita.

---

#### 7. Relaciones package–NEXO canónicas

La futura adopción deberá conservar exactamente estas relaciones:

| Package | Compatibilidad | Actualización | Perfil NEXO |
| --- | --- | --- | --- |
| `@vento/contracts` | `PKG-COMP-MX-003` | `PKG-PR-REL-003` | `NEXO-PROFILE-CONTRACTS` |
| `@vento/os-context` | `PKG-COMP-MX-010` | `PKG-PR-REL-010` | `NEXO-PROFILE-OS-CONTEXT` |
| `@vento/supabase` | `PKG-COMP-MX-017` | `PKG-PR-REL-017` | `NEXO-PROFILE-SUPABASE` |
| `@vento/ui-web` | `PKG-COMP-MX-024` | `PKG-PR-REL-024` | `NEXO-PROFILE-UI-WEB` |

No se crean relaciones alternativas, aliases o perfiles locales para evitar un gate existente.

---

#### 8. Regla de migración por responsabilidad

La unidad mínima de decisión no es el archivo por su ubicación ni el nombre de una función.

Cada superficie se clasifica por responsabilidad:

```text
SHARED STATIC CONTRACT
-> @vento/contracts

SHARED RUNTIME CONTEXT / AUTHORIZATION
-> @vento/os-context

SHARED TECHNICAL SUPABASE ACCESS
-> @vento/supabase

SHARED WEB PRESENTATION
-> @vento/ui-web

NEXO BUSINESS / DOMAIN / PROCESS LOGIC
-> STAYS IN NEXO
```

Un mismo archivo legacy puede contener responsabilidades de más de una clase y deberá descomponerse mediante adapters o refactor controlado en la instancia propietaria.

---

#### 9. Adopción de @vento/contracts

NEXO deberá consumir `@vento/contracts` cuando necesite identidades y contratos estáticos que ya tengan una superficie compartida publicada y compatible.

La migración podrá sustituir definiciones locales equivalentes de:

- identificadores canónicos;
- códigos de aplicación;
- catálogos estáticos;
- schemas;
- tipos compartidos;
- contratos serializables;
- metadata contractual.

No podrá mover a `@vento/contracts`:

- acceso a Supabase;
- autorización runtime;
- cookies;
- sesión;
- redirects;
- RLS o RPC;
- lógica de remisiones;
- stock;
- UOM;
- reglas de inventario;
- settings de NEXO;
- UI;
- side effects.

---

#### 10. Paridad de contratos estáticos

La adopción de una definición estática exige demostrar:

1. misma identidad semántica;
2. serialización compatible;
3. schema compatible;
4. ausencia de cast global que oculte incompatibilidad;
5. tratamiento explícito de valores desconocidos;
6. versión exacta atribuible;
7. consumidores compilando contra la misma superficie.

Una discrepancia semántica no se resuelve copiando el tipo local dentro del package para obtener un build verde.

---

#### 11. Adopción de @vento/os-context

`@vento/os-context` es el destino canónico de responsabilidades compartidas de:

- contexto efectivo;
- separación de identidad real, rol administrativo y rol operativo;
- dispositivo compartido;
- simulación autorizada;
- contexto laboral real;
- decisión compartida de permiso cuando la superficie física aplicable esté lista.

La adopción no autoriza tratar cualquier implementación física actual del package como contrato final si todavía conserva shapes o behaviors pendientes de reconciliación.

El package deberá satisfacer el contrato aprobado antes de convertirse en autoridad del consumidor.

---

#### 12. Superficies locales de autorización y contexto

El AS-IS NEXO contiene, entre otras, estas superficies locales:

- `src/lib/auth/permissions.ts`;
- `src/lib/auth/guard.ts`;
- `src/lib/auth/operational-session.ts`;
- `src/lib/auth/operational-context.ts`;
- `src/lib/auth/role-override.ts`;
- `src/lib/auth/shared-device-signature.ts`;
- guards y helpers embebidos en páginas y Server Actions.

La futura unidad deberá decidir para cada superficie:

| Decisión documental | Significado |
| --- | --- |
| adopción compartida | la responsabilidad puede consumir directamente el package canónico |
| adapter local necesario | NEXO conserva adapter del framework o dominio, pero no autoridad paralela |
| responsabilidad NEXO | la responsabilidad es empresarial de NEXO y permanece local |
| retiro posterior a paridad | existe reemplazo canónico probado y el retiro se entrega a 019 |
| migración bloqueada por dependencia | falta package, release, backend, contrato o evidencia para migrar |

Estas decisiones no crean estados nuevos del lifecycle físico.

---

#### 13. Regla para adapters locales

Un adapter NEXO puede permanecer cuando traduzca una frontera del framework o del dominio, por ejemplo:

- `next/headers`;
- cookies de Next;
- redirects;
- variables de entorno;
- routing;
- resource mapping de NEXO;
- error presentation;
- parámetros de una Server Action.

El adapter:

- no redefine catálogos;
- no implementa un segundo evaluador;
- no agrega grants;
- no amplía territorio;
- no reconstruye contexto desde cookies cliente;
- no hace fallback a un `ALLOW` legacy;
- no oculta la procedencia del resultado;
- no convierte errores técnicos en autorización.

---

#### 14. Dispositivo compartido durante la migración

La adopción de `@vento/os-context` debe preservar las decisiones de `NEXO-AUTH-016`.

Nunca:

```text
APP ALLOWED ON DEVICE
=
HUMAN AUTHORIZED
```

Nunca:

```text
NAVIGATION ROLE
=
EFFECTIVE HUMAN ROLE
```

Nunca:

```text
TECHNICAL PRINCIPAL
=
HUMAN ACTOR
```

La unidad migrada deberá comparar el resultado legacy y canónico con el actor, dispositivo, sede, área, app, permiso y recurso equivalentes.

---

#### 15. Simulación durante la migración

La adopción debe preservar `NEXO-AUTH-017`.

Una simulación puede alimentar preview y explicación; no puede convertirse en input autoritativo de una mutación real.

Toda superficie migrada deberá conservar:

```text
REAL DECISION
+
SIMULATED RESULT
=
TWO DISTINCT RESULTS
```

Un adapter temporal no puede reintroducir `role_override` como autoridad para mantener paridad con el comportamiento incorrecto anterior.

---

#### 16. Adopción de @vento/supabase

`@vento/supabase` es el destino de acceso técnico compartido cuando exista una superficie publicada aplicable.

NEXO puede migrar hacia factories o wrappers compartidos para:

- browser;
- server de sesión;
- errores técnicos;
- tipos generados;
- RPC wrappers;
- otras superficies aprobadas por el owner del package.

Esto no mueve al package:

- reglas de negocio NEXO;
- autorización empresarial;
- selección de recurso;
- decisiones de remisión;
- policies funcionales;
- routing de aplicación;
- ownership de cookies de framework;
- resolución de variables de entorno específica del despliegue cuando el contrato del package exige config ya resuelta.

---

#### 17. Adapter Supabase de aplicación

Cuando `@vento/supabase` exija configuración resuelta, NEXO conserva un adapter local mínimo para construir la configuración desde su runtime.

Ese adapter podrá:

- leer configuración permitida;
- adaptar `next/headers` o cookies;
- seleccionar el modo server/browser autorizado;
- propagar errores técnicos.

No podrá:

- reinterpretar `service_role` como autoridad humana;
- incorporar un bypass de permisos;
- cambiar RLS;
- elegir una credencial más privilegiada como fallback;
- silenciar fallos de cookie o sesión de forma permisiva;
- crear una segunda factory compartida paralela.

---

#### 18. Adopción de @vento/ui-web

`@vento/ui-web` conserva exclusivamente responsabilidad visual web compartida.

La futura migración NEXO podrá adoptar componentes compartidos cuando:

- exista API consumible y versionada;
- la semántica del componente coincida;
- SSR/client/hydration sean compatibles;
- accesibilidad y estilos pasen el perfil NEXO;
- el componente no absorba dominio.

Nunca:

```text
VISIBLE
=
AUTHORIZED
```

Ni:

```text
DISABLED
=
SERVER-SIDE DENY
```

---

#### 19. AppShell y composición local

El AS-IS de NEXO mantiene composición visual mezclada con resolución de contexto, navegación y autorización.

La migración deberá separar:

```text
PRESENTATION
FROM
AUTHORIZATION / CONTEXT / DOMAIN
```

`@vento/ui-web` podrá recibir únicamente props y contratos ya resueltos.

No consulta Supabase ni ejecuta permisos para decidir autoridad.

Los adapters y compositores NEXO pueden preparar el view model, pero la decisión empresarial se resuelve antes en su owner autorizado.

---

#### 20. Responsabilidades que permanecen en NEXO

No se promueven a package por conveniencia técnica:

- reglas de inventario;
- semántica de remisiones;
- políticas de solicitud;
- perfiles UOM específicos del dominio;
- lógica de stock;
- LOC y posiciones;
- activos;
- preparación, tránsito y recepción;
- settings funcionales;
- category domains y labels de negocio;
- estados de proceso NEXO no materializados como contrato compartido;
- queries de dominio;
- transacciones y side effects de NEXO.

Ser TypeScript, helper o constante no convierte una responsabilidad en compartida.

---

#### 21. Release estable como precondición de adopción

La existencia física de un workspace privado no satisface el gate de consumidor.

Antes de una modificación de dependencias deberá existir, para cada package objetivo:

- release elegible;
- versión SemVer exacta;
- identidad de source commit;
- artefacto atribuible;
- manifest coherente;
- integridad verificable;
- changelog o evidencia exigida por el lifecycle;
- compatibilidad NEXO vigente.

Si no existe release elegible, la adopción permanece bloqueada y no se modifica el consumidor.

No se usa `file:`, `workspace:*`, ruta local o copia manual como atajo para simular una release gobernada cuando el lifecycle del consumidor exige una release estable.

---

#### 22. Manifest y lockfile

La futura unidad deberá tratar `package.json` y `package-lock.json` como una unidad.

Por package adoptado:

```text
DECLARED VERSION
=
LOCKFILE ROOT VERSION
=
LOCKFILE RESOLVED VERSION
=
ELIGIBLE RELEASE VERSION
```

La versión debe ser exacta para el gate gobernado.

No se acepta para el cutover:

- `^`;
- `~`;
- `latest`;
- `*`;
- branch ref;
- commit sin release;
- path local;
- workspace shortcut no respaldado por el lifecycle de release aplicable.

---

#### 23. SHELL-CI-007 como baseline

`SHELL-CI-007::GLOBAL` ya define la línea base de NEXO frente a las cuatro familias.

Su existencia demuestra que hay un harness de consumidor.

No demuestra:

- package instalado;
- versionado adoptado;
- imports migrados;
- compatibilidad final de una release concreta;
- paridad de una superficie real;
- retiro de helpers;
- deploy;
- rollback ejecutado.

La futura unidad deberá volver a vincular la evidencia a su commit, manifest, lockfile, versiones y surface set actuales.

---

#### 24. Cobertura mínima del baseline NEXO

La validación de adopción debe conservar las doce superficies ya reconocidas:

1. identidad, sesión y permisos;
2. contexto operativo;
3. catálogo, categorías, unidad y presentación;
4. stock por sede y LOC;
5. entradas, conteos, ajustes, retiros y traslados;
6. LOC, board, kiosk y posiciones;
7. remisiones;
8. división y recepción parcial;
9. activos físicos y conteos;
10. settings, rutas y políticas operativas;
11. integración y fronteras de dominio;
12. UI, SSR, interacción, accesibilidad e impresión.

Una migración de package no se declara completa si rompe una superficie que no importaba directamente ese package, pero dependía de su contrato transitivamente.

---

#### 25. Perfiles por familia

La evidencia futura deberá satisfacer al menos el perfil aplicable:

| Familia | Cobertura mínima |
| --- | --- |
| `NEXO-PROFILE-CONTRACTS` | tipos, schemas, serialización, semántica de identificadores y ausencia de cast global permisivo |
| `NEXO-PROFILE-OS-CONTEXT` | sesión, contexto operativo, allow, deny y ausencia de elevación cliente |
| `NEXO-PROFILE-SUPABASE` | cliente browser, cliente server, deny path, fuente aislada de schema y ausencia de fixture privilegiado |
| `NEXO-PROFILE-UI-WEB` | server render, client render, hydration, accesibilidad y print preview |

Un PASS parcial de un perfil no sustituye el PASS de los demás packages adoptados por la misma unidad.

---

#### 26. Gating de actualización del consumidor

La futura actualización deberá satisfacer el lifecycle compartido de consumidor, incluyendo:

- identidad de release;
- elegibilidad de versión;
- coherencia manifest-lockfile;
- instalación bloqueada reproducible;
- pruebas propias del package;
- lint o análisis estático;
- typecheck;
- build;
- pruebas automatizadas del consumidor;
- matriz de compatibilidad;
- perfil especializado de familia;
- TREQ afectados;
- controles de riesgo cuando apliquen;
- frescura de evidencia;
- revisión y protección de merge;
- separación entre merge, despliegue y adopción.

No se omite un gate porque el package se encuentre dentro del mismo grupo empresarial.

---

#### 27. Oracle de paridad

Paridad significa conformidad con el contrato correcto, no igualdad ciega con el legacy.

Cada superficie migrada debe comparar escenarios equivalentes y clasificar el delta como:

```text
IGUAL
CORRECCION_INTENCIONAL
BRECHA_DE_DATOS
BUG_LEGACY
BUG_CANONICO
CONTRATO_PENDIENTE
```

Solo `IGUAL` y una `CORRECCION_INTENCIONAL` sustentada pueden participar en un cutover.

`BRECHA_DE_DATOS`, `BUG_CANONICO` o `CONTRATO_PENDIENTE` bloquean.

Un `BUG_LEGACY` no se copia al package para fabricar igualdad.

---

#### 28. Paridad de allow y deny

Las pruebas deberán cubrir ambos resultados.

```text
LEGACY ALLOW
CANONICAL ALLOW
```

por sí solo no es suficiente.

También se demostrarán:

```text
LEGACY DENY
CANONICAL DENY
```

y casos adversariales para:

- rol manipulado;
- sede manipulada;
- área manipulada;
- actor ausente;
- dispositivo no permitido;
- simulación activa;
- permiso ausente;
- recurso fuera de scope;
- sesión expirada;
- evidencia stale.

La migración no es correcta si mejora el happy path mientras amplía un deny path.

---

#### 29. Prohibición de doble side effect

Durante coexistencia, una operación empresarial se ejecuta por un solo carril.

Se permite comparar decisiones puras o proyecciones seguras.

No se permite:

```text
LEGACY MUTATION
+
CANONICAL MUTATION
```

para comparar resultados.

Una mutación real se autoriza una sola vez y su side effect ocurre una sola vez.

---

#### 30. Coexistencia temporal

Antes del cutover puede coexistir:

```text
LEGACY PATH
+
CANONICAL PATH
+
PARITY OBSERVATION
```

solo si:

- uno solo controla el side effect;
- el resultado autoritativo está declarado;
- el otro carril no amplía autoridad;
- la comparación es trazable;
- existe condición de salida;
- existe owner de retiro;
- el rollback sigue disponible.

No se acepta coexistencia indefinida.

---

#### 31. Fail closed ante divergencia

Si legacy y canónico divergen materialmente y la clasificación no está resuelta:

```text
CUTOVER
=
BLOCKED
```

Nunca:

```text
ALLOW = LEGACY_ALLOW OR CANONICAL_ALLOW
```

Nunca se elige el resultado más permisivo.

Un error del package tampoco autoriza fallback automático a un `ALLOW` legacy.

---

#### 32. Cutover por superficie

Una superficie puede pasar a autoridad canónica únicamente cuando:

1. package y versión son elegibles;
2. dependencia y lockfile están fijados;
3. imports/adapters están definidos;
4. compatibilidad está en PASS;
5. perfil NEXO está en PASS;
6. paridad contractual está cerrada;
7. allow y deny están cubiertos;
8. no existe side effect duplicado;
9. rollback está preparado;
10. evidencia pertenece al mismo commit y snapshot.

El resto de superficies puede permanecer en coexistencia o bloqueado sin exigir un big-bang.

---

#### 33. Punto de no retorno

Antes de declarar una superficie `MIGRATION_COMMITTED`, se permite volver a una combinación previa únicamente si esa combinación:

- sigue siendo segura;
- sigue siendo compatible;
- está versionada;
- conserva evidencia;
- no depende de un bypass ya prohibido.

Después de `MIGRATION_COMMITTED`, el rollback ordinario no reabre autoridad legacy retirada ni restaura una excepción que ya se clasificó como histórica.

---

#### 34. Rollback reproducible

El rollback deberá identificar como mínimo:

- package;
- versión nueva;
- versión previa;
- commit del consumidor;
- manifest;
- lockfile;
- adapter o import afectado;
- feature/cutover state aplicable;
- evidencia de compatibilidad de la combinación previa;
- validación post-rollback.

Rollback no significa copiar de vuelta helpers desde memoria ni reactivar cookies autoritativas sin gate.

---

#### 35. Evidencia stale

Se considera stale, como mínimo, evidencia asociada a otra combinación material de:

- commit de NEXO;
- manifest;
- lockfile;
- test contract;
- test suite;
- fixtures;
- entorno;
- runtime;
- framework;
- target package set;
- compatibilidad;
- perfil NEXO.

Evidencia de otra aplicación nunca satisface NEXO.

---

#### 36. Orden multi-package

Las cuatro familias pueden adoptarse en unidades o waves diferentes.

El orden deberá respetar dependencias reales.

Principios:

1. contrato estático requerido se publica antes del consumidor que lo importe;
2. `@vento/os-context` no se adopta como autoridad final mientras sus contratos/runtime necesarios no estén listos;
3. `@vento/supabase` no fuerza migración de routing, cookies o lógica de dominio que pertenezca a NEXO;
4. `@vento/ui-web` no se adopta antes de separar la autoridad de su composición visual;
5. una family no se marca adoptada por transitividad desde otra.

No se inventa un orden único cuando dos unidades sean independientes; el package/implementation lineage decide.

---

#### 37. Lineage por implementation unit

La topología de esta tarea es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-018::<implementation_unit_id>
```

Cada `implementation_unit_id` se materializa como máximo una vez y puede servir a varios `package_id` únicamente con lineage explícito.

Una instancia futura requiere:

- owner package;
- `implementation_unit_id`;
- consumer package ids cuando apliquen;
- `E5-GATE-008::<package_id> = PASS`;
- dependencias físicas listas;
- autorización física explícita.

---

#### 38. Separación entre PR, merge, despliegue y adopción

Un PR verde no equivale a adopción operativa.

Se mantienen separados:

```text
CODE PROPOSED
CODE MERGED
PACKAGE INSTALLED
FEATURE / CUTOVER ENABLED
DEPLOYED
ADOPTED
LEGACY RETIRED
```

Cada transición conserva evidencia y owner.

La actualización de consumidor no puede autoaprobar su propio PR ni convertir un merge en deploy.

---

#### 39. Propiedad de Supabase

Toda migración, configuración o modificación de Supabase VENTO que resulte necesaria para una futura unidad permanece versionada y gobernada desde `vento-group-sas/vento-shell`.

Esta tarea no crea migraciones.

La adopción de `@vento/supabase` tampoco autoriza cambios remotos por sí sola.

---

#### 40. Frontera con NEXO-AUTH-019

`NEXO-AUTH-019 — Eliminar helpers duplicados` conserva la responsabilidad exclusiva de retirar helpers locales después de demostrar reemplazo y paridad.

Entre los candidatos heredados se encuentran:

- `getRoleOverrideFromCookies`;
- `canUseRoleOverride`;
- `checkPermissionWithRoleOverride`;
- `applyNexoRoleOverrideArea`;
- configuración local de role override;
- cookies locales de override de rol o sede cuando hayan dejado de tener un uso legítimo no autoritativo;
- otros helpers que la evidencia de migración clasifique como duplicados reales.

Esta tarea no los elimina.

La salida de 018 hacia 019 deberá identificar:

```text
LOCAL SURFACE
CANONICAL REPLACEMENT
CUTOVER STATUS
PARITY RESULT
LAST LEGITIMATE CONSUMER
RETIREMENT CONDITION
ROLLBACK BOUNDARY
```

---

#### 41. Frontera con NEXO-AUTH-020

`NEXO-AUTH-020 — Ejecutar pruebas integrales` conserva la certificación integral de NEXO.

La 018 exige evidencia de adopción por package y superficie, pero no sustituye:

- build integral;
- pruebas de flujos completos;
- seguridad integral;
- pruebas de dispositivos;
- pruebas de simulación;
- pruebas de remisiones completas;
- piloto;
- certificación final del bloque.

---

#### 42. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el registro vigente ya protege adopción de responsabilidades compartidas, comandos reproducibles, compatibilidad por consumidor, rollback independiente, trazabilidad TREQ, bloqueo de autoridad local duplicada, migración fail-closed, orden de waves, paridad contractual, evidencia atribuible y retiro posterior. La presente tarea especializa esas obligaciones para NEXO sin crear una nueva regla verificable ni cambiar owner, prioridad, modalidad, package, estado o relaciones del registro.

---

#### 43. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- `TREQ-SHELL-002`, para responsabilidades compartidas y paridad de copias locales;
- `TREQ-SHELL-005`, para comandos reproducibles del consumidor;
- `TREQ-SHELL-006`, para pruebas propias y compatibilidad por consumidor antes de adopción;
- `TREQ-SHELL-007`, para rollback independiente;
- `TREQ-SHELL-008`, para trazabilidad de TREQ por package y PR;
- `TREQ-SHELL-086`, para bloquear nueva autoridad local y helpers duplicados;
- `TREQ-SHELL-092`, para migración de consumers sin fallback a autoridad legacy;
- `TREQ-SHELL-093`, para orden contractual de migración;
- `TREQ-SHELL-094`, para clasificación de paridad;
- `TREQ-SHELL-096`, para evidencia por consumidor, commit, manifest, lockfile y runtime;
- `TREQ-SHELL-097`, para convergencia previa al retiro;
- `TREQ-SHELL-098`, para unicidad por `implementation_unit_id` y rollback gobernado;
- `TREQ-NEXO-001`, para código canónico validable sin dependencia de scripts temporales que reescriban la rama.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `NEXO-AUTH-018`.

---

#### 44. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto se preparó fuera del checkout local del usuario y no se incorporó al owner ni se ejecutó build documental |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron `docs:task:start`, preflight, formateador, quality, delivery, topología, TREQ ni batería global sobre el checkout del usuario |
| REMOTA | `PASS` | se verificaron en solo lectura `vento-shell` en `8f99710a83263bad21c7a27c5bec338d3da9d7f7` y `vento-nexo` en `f0a12557a1a258c84b025933653dc756de4b5a59`; continuidad `017 → 018 → 019`, marker único de 018, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, cuatro packages canónicos, relaciones NEXO, perfiles CI007, manifests de packages y ausencia actual de dependencias `@vento/*` en NEXO |
| OPERATIVA | `NOT_EXECUTED` | no se realizó adopción, cutover, rollback ni prueba funcional de NEXO con una release compartida durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron packages, dependencies, lockfiles, imports, helpers, Supabase, datos, configuración, CI, releases, PR, merge ni despliegues |

---

#### 45. Criterios de aceptación

- [x] Se cerró el universo en cuatro packages compartidos.
- [x] Se conservaron las cuatro relaciones de compatibilidad NEXO exactas.
- [x] Se conservaron las cuatro relaciones de actualización NEXO exactas.
- [x] Se conservaron los cuatro perfiles NEXO exactos.
- [x] Se distinguió workspace privado de release elegible.
- [x] Se registró que NEXO no declara dependencias `@vento/*` en el snapshot observado.
- [x] Se distinguió baseline CI007 de adopción.
- [x] Se definió clasificación por responsabilidad y no por nombre de archivo.
- [x] Se separaron contratos estáticos, contexto runtime, acceso Supabase, UI y dominio NEXO.
- [x] Se prohibió crear una quinta familia por conveniencia.
- [x] Se preservó el handoff de dispositivo compartido de 016.
- [x] Se preservó la separación estricta de simulación de 017.
- [x] Se bloqueó role override como autoridad final del carril migrado.
- [x] Se definió un adapter local no autoritativo.
- [x] Se preservó routing y adaptación de framework como responsabilidad local cuando corresponde.
- [x] Se prohibió mover lógica empresarial NEXO a packages por conveniencia.
- [x] Se exigió release elegible antes de adopción.
- [x] Se exigió SemVer exacto.
- [x] Se exigió coherencia manifest-lockfile-release.
- [x] Se preservaron los dieciséis gates del lifecycle de actualización.
- [x] Se definió paridad contractual y sus seis clasificaciones.
- [x] Se exigieron allow y deny paths.
- [x] Se prohibió doble side effect.
- [x] Se definió coexistencia temporal acotada.
- [x] Se definió fail closed ante divergencia.
- [x] Se definió cutover por superficie.
- [x] Se definió punto de no retorno.
- [x] Se definió rollback reproducible.
- [x] Se definió evidencia stale.
- [x] Se definió orden multi-package por dependencias.
- [x] Se conservó `PER_IMPLEMENTATION_UNIT`.
- [x] Se conservó `POST_E5_PACKAGE`.
- [x] Se separaron PR, merge, deploy, adopción y retiro.
- [x] Se mantuvo Supabase bajo `vento-shell`.
- [x] Se reservó eliminación de helpers a 019.
- [x] Se reservó certificación integral a 020.
- [x] No se crearon ni modificaron TREQ.
- [x] No se autorizó implementación física.

---

#### 46. Límites

Esta tarea no:

- publica packages;
- crea releases;
- asigna versiones futuras;
- modifica `package.json` o lockfiles;
- instala dependencias;
- cambia imports;
- modifica código de NEXO;
- crea adapters físicos;
- corrige `@vento/os-context`;
- cambia factories Supabase;
- modifica componentes `@vento/ui-web`;
- elimina helpers duplicados;
- desactiva role override;
- modifica cookies;
- cambia Server Actions;
- ejecuta paridad;
- ejecuta rollback;
- crea o modifica migraciones;
- toca Supabase remoto;
- modifica datos;
- abre PR de adopción;
- hace merge;
- despliega;
- certifica NEXO.

La materialización física pertenece a futuras instancias autorizadas `NEXO-AUTH-018::<implementation_unit_id>` después del gate aplicable.

---

#### 47. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-017 — Integrar simulación estricta`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-018 — Migrar a paquetes de vento-shell`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-019 — Eliminar helpers duplicados`

### ✅ NEXO-AUTH-019 — Eliminar helpers duplicados

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-018 — Migrar a paquetes de vento-shell
**Tarea siguiente:** NEXO-AUTH-020 — Ejecutar pruebas integrales
**Tipo de tarea:** documental; contrato canónico de retiro gobernado de helpers locales duplicados o autoritativos después del cutover demostrado de `NEXO-AUTH-018`, con conservación explícita de adapters de framework y lógica de dominio que no dupliquen autoridad compartida
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; este marcador no elimina archivos, imports, cookies, helpers, adapters, componentes, scripts, packages, dependencias, lockfiles, RPC, RLS, migraciones, datos, configuración, CI, releases, PR, merge ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el retiro seguro de helpers locales de NEXO que, después de la adopción gobernada establecida por `NEXO-AUTH-018`, dupliquen responsabilidad compartida, mantengan autoridad legacy, recreen decisiones canónicas o preserven rutas paralelas de autorización, contexto o simulación.

La regla raíz queda:

```text
CANONICAL CUTOVER PASS
+
PARITY PASS
+
ZERO LEGITIMATE CONSUMERS
+
NO REQUIRED LOCAL ADAPTER SEMANTICS
=
RETIRE LOCAL DUPLICATE
```

Y simultáneamente:

```text
SAME NAME
!=
DUPLICATE RESPONSIBILITY
```

```text
LOCAL FILE
!=
RETIRE ENTIRE FILE
```

```text
LEGACY HELPER UNUSED
!=
SAFE TO RESURRECT
```

El objetivo no es reducir líneas de código por sí mismo. El objetivo es terminar con una sola autoridad efectiva por responsabilidad y eliminar únicamente la deuda cuya sustitución canónica ya fue demostrada.

---

#### 2. Resultado material

La tarea fija un contrato de retiro para que cada futura unidad física:

1. consuma el handoff de migración producido por `NEXO-AUTH-018`;
2. clasifique cada helper, rama, alias, cookie, wrapper, adapter y consumidor local;
3. retire autoridad duplicada únicamente después de cutover y paridad demostrados;
4. conserve lógica NEXO de dominio que no pertenezca al package compartido;
5. conserve adapters mínimos de Next.js, cookies técnicas, configuración o presentación cuando sigan siendo necesarios y no decidan autoridad;
6. elimine reexports, aliases y wrappers que permitan reintroducir la ruta legacy;
7. demuestre cero consumidores legítimos antes de borrar una superficie;
8. impida que rollback posterior resucite deuda ya migrada;
9. produzca evidencia atribuible por `implementation_unit_id`;
10. entregue a `NEXO-AUTH-020` una superficie sin autoridad paralela para certificación integral.

Esta tarea documental no ejecuta el retiro físico.

---

#### 3. Handoff obligatorio recibido de NEXO-AUTH-018

Cada candidato de retiro deberá llegar desde la materialización aplicable de `NEXO-AUTH-018` con estos siete campos resueltos:

```text
LOCAL SURFACE
CANONICAL REPLACEMENT
CUTOVER STATUS
PARITY RESULT
LAST LEGITIMATE CONSUMER
RETIREMENT CONDITION
ROLLBACK BOUNDARY
```

Ninguna fila puede considerarse elegible para eliminación física si falta uno de esos campos o si el `CUTOVER STATUS` todavía permite autoridad legacy activa.

La mera existencia de un package compartido, un export interno, una rama de migración, un PR o un build verde no satisface este handoff.

---

#### 4. Frontera recibida de simulación estricta

`NEXO-AUTH-017` ya separa:

```text
REAL_AUTHORITY_PLANE
SIMULATED_EVALUATION_PLANE
SIMULATION_PRESENTATION_PLANE
SIMULATION_AUDIT_PLANE
```

y fija:

```text
WOULD_ALLOW != ALLOW
```

Por tanto, un helper local que convierta role override, cookie, sede simulada, área simulada, turno simulado, check-in simulado o resultado hipotético en autorización real es deuda autoritativa y su conservación no puede justificarse como compatibilidad de UI.

---

#### 5. Qué significa helper duplicado

Para esta tarea existe duplicación cuando una superficie local cumple al menos una de estas condiciones después del cutover de 018:

- vuelve a resolver una decisión cuya autoridad pertenece al package canónico;
- vuelve a construir identidad o clave contractual ya compartida;
- replica una factory compartida sin necesidad de adapter local;
- interpreta contexto efectivo por fuera del resolver canónico;
- permite fallback hacia `ALLOW` legacy;
- mantiene un rol o bypass como fuente de autoridad real;
- conserva un wrapper cuyo único propósito es ocultar una llamada legacy;
- reexporta o renombra una superficie retirada;
- duplica un componente compartido sin divergencia funcional justificada;
- mantiene una segunda ruta de simulación con semántica distinta a la canónica.

No existe duplicación automática por coincidencia nominal, por compartir lenguaje o por residir bajo `src/lib`.

---

#### 6. Superficies que pueden permanecer locales

Permanecen locales cuando su responsabilidad sigue siendo NEXO o adaptación de framework:

- lógica de remisiones;
- filtros y semántica de inventario;
- resolución de estados de proceso NEXO;
- adaptación de `next/headers`;
- redirects y routing de Next.js;
- construcción de URLs de retorno;
- lectura de variables de entorno propia del deployment cuando el package recibe config ya resuelta;
- adapter de cookies requerido por una factory compartida;
- composición de view models;
- mensajes de bloqueo específicos de NEXO;
- lógica de sede o área que sea de dominio y consuma contexto ya autorizado sin reconstruirlo;
- wrappers que añadan exclusivamente semántica de framework o dominio sin reevaluar autoridad.

Un adapter permitido no puede convertirse en segunda fuente de verdad.

---

#### 7. Snapshot AS-IS observado de NEXO

En `vento-nexo` main observado, la deuda local relevante incluye:

- `src/lib/auth/role-override.ts`;
- `src/lib/auth/role-override-config.ts`;
- ramas de role override en `src/lib/auth/guard.ts`;
- `applyNexoRoleOverrideArea` dentro de `src/lib/auth/operational-context.ts`;
- ramas de role override en superficies de remisiones;
- escritura y lectura client-side de `nexo_role_override` en `src/components/vento/standard/profile-menu.tsx`;
- selección local `nexo_site_override_id` usada como preferencia de navegación;
- helpers locales de `permissions.ts`, `operational-context.ts` y `operational-session.ts` cuya clasificación final depende del cutover de 018;
- factories locales Supabase cuya porción compartida solo puede retirarse después de adopción efectiva de `@vento/supabase`;
- composición de autorización dentro de superficies visuales como `vento-shell.tsx`;
- un script temporal `scripts/tmp-apply-privileged-request-area.mjs` que todavía referencia la lógica de override y allowlists locales.

Este snapshot demuestra deuda y consumidores actuales, no autoriza su eliminación inmediata.

---

#### 8. Conteo estático observado de símbolos role override

La búsqueda remota sobre el commit NEXO observado muestra:

| Símbolo | Archivos observados que contienen la referencia | Lectura contractual |
| --- | ---: | --- |
| `getRoleOverrideFromCookies` | 6 | definición más consumidores reales; no está listo para retiro |
| `canUseRoleOverride` | 8 | definición, consumidores y script temporal; no está listo para retiro |
| `checkPermissionWithRoleOverride` | 10 | definición y múltiples superficies server/read; autoridad paralela vigente |
| `isPermissionAllowedForRole` | 4 | definición y consumidores que evalúan permisos por rol localmente |
| `applyNexoRoleOverrideArea` | 1 | helper interno que muta el contexto retornado |
| `ROLE_OVERRIDE_COOKIE` | 4 | definición, lectura server y UI client-side |

El gate físico posterior deberá recalcular estos conteos contra el commit real de la unidad. Estos valores son evidencia AS-IS, no baseline transferible ni cuota reutilizable.

---

#### 9. Retiro obligatorio de autoridad en role-override.ts

Después del cutover de autorización/contexto de 018, la ruta local formada por:

- `getRoleOverrideFromCookies`;
- `canUseRoleOverride`;
- `isPermissionAllowedForRole`;
- `checkPermissionWithRoleOverride`;

no puede seguir autorizando operaciones reales.

Su retiro físico exige demostrar que:

- la simulación canónica está disponible por el contrato adoptado;
- la autorización real usa el evaluador canónico;
- las superficies consumidoras ya no necesitan estos símbolos;
- los escenarios allow y deny tienen paridad contractual;
- el caso `conductor` de tránsito está resuelto por la autoridad canónica o por una regla propietaria explícita, no por un bypass local silencioso;
- no existe fallback de un fallo canónico hacia esta ruta.

La eliminación puede ser por archivo completo o por reducción progresiva, pero el resultado final no conserva una segunda autoridad equivalente.

---

#### 10. Retiro de applyNexoRoleOverrideArea

`applyNexoRoleOverrideArea` modifica localmente:

- `active_area_id`;
- `active_area_kind`;
- `active_operational_role`;

usando role override y una búsqueda local de área.

Después del cutover de contexto, esa transformación no puede permanecer dentro del camino real de `getOperationalContext`.

La superficie se retira cuando el contexto efectivo canónico ya representa correctamente simulación y contexto real como planos separados y cuando ningún consumidor depende de la mutación legacy.

No se conserva una versión renombrada, inline o movida de la misma transformación para evadir el retiro.

---

#### 11. role-override-config.ts

El archivo contiene tres responsabilidades distintas y no se trata como unidad indivisible:

| Superficie | Decisión documental |
| --- | --- |
| `ROLE_OVERRIDE_COOKIE` | retirar cuando la simulación canónica adoptada deje de usar la cookie legacy |
| `PRIVILEGED_ROLE_OVERRIDES` | retirar como autoridad local; la elegibilidad para simular debe provenir del contrato canónico |
| `ROLE_OPTIONS` | conservar solo mientras no exista un catálogo compartido consumible equivalente y únicamente para presentación, nunca como autoridad |

Si `ROLE_OPTIONS` permanece temporalmente, no puede usarse como allowlist autoritativa ni como fuente de `PermissionKey`, scope o territorio.

---

#### 12. Modo prueba en profile-menu.tsx

La UI puede conservar una experiencia de simulación, pero debe dejar de gestionar autoridad mediante:

- escritura directa de `nexo_role_override`;
- lectura directa de esa cookie como estado autoritativo;
- evento local `nexo-role-override-changed` como fuente de verdad;
- role list local usada para determinar elegibilidad real.

Cuando 018 certifique la superficie canónica correspondiente, el flujo de UI deberá usar el lifecycle de simulación adoptado y mostrar únicamente estado devuelto por la autoridad canónica.

El componente visual puede permanecer; lo que se retira es la ruta de autoridad duplicada.

---

#### 13. Cookie de sede y preferencia de navegación

`nexo_site_override_id` no se elimina por el solo hecho de ser una cookie local.

Puede conservarse únicamente como preferencia de navegación o selección visual si se demuestra que:

```text
SITE PREFERENCE
!=
AUTHORIZED SITE
```

Y que servidor, permisos, recursos y contexto efectivo ignoran esa cookie como autoridad.

Si alguna superficie la utiliza como sede efectiva sin validación canónica, esa rama se clasifica como deuda autoritativa y debe retirarse o degradarse a preferencia no autoritativa.

---

#### 14. guard.ts

`src/lib/auth/guard.ts` conserva valor como adapter de aplicación porque gestiona:

- redirect a login;
- redirect a no-access;
- `returnTo`;
- integración con Next.js;
- shape local de retorno.

Pero las ramas que:

- leen role override;
- deciden `canOverride`;
- evalúan `isPermissionAllowedForRole`;
- alternan entre evaluador local y canonical por lógica propia;

son candidatas obligatorias de retiro después del cutover.

El guard final puede orquestar la decisión canónica, pero no recalcularla.

---

#### 15. Server Actions de remisiones

Los Server Actions observados que importan `checkPermissionWithRoleOverride` no pueden conservar esa ruta después del cutover.

En particular, la autoridad server-side de remisiones deberá converger al evaluador canónico aplicable antes de mutar.

La eliminación del helper no habilita a omitir el check. Sustituir una llamada por ausencia de autorización es una regresión crítica.

Toda mutación conserva:

```text
SERVER REAUTHORIZATION BEFORE EFFECT
```

---

#### 16. Lecturas, páginas y detail-access

Las superficies read-side y de navegación pueden conservar composición local, pero no pueden mantener un evaluador paralelo para decidir visibilidad protegida o capacidad real.

En `detail-access.ts`, páginas de remisiones y páginas de fulfillment:

- se retira la derivación de permisos desde role override local;
- se conserva la lógica de dominio para determinar recurso, extremos territoriales, capacidades de sede y semántica de remisión;
- la decisión de permiso/contexto proviene de la autoridad canónica adoptada;
- UI y navegación no elevan un resultado visible a autorización de servidor.

---

#### 17. operational-area-scope.ts como retiro parcial

`operational-area-scope.ts` mezcla dos clases de responsabilidad:

1. lógica NEXO de áreas habilitadas para remisiones;
2. autorización local basada en role override.

No se elimina el archivo completo por defecto.

Deben permanecer, si siguen siendo necesarias:

- normalización de `area_kind` de dominio;
- labels de área;
- cálculo de kinds habilitados para remisiones;
- filtros de remisiones;
- reglas de área específicas del dominio.

Deben retirarse, después del cutover:

- `getRoleOverrideFromCookies` dentro de esta superficie;
- `canUseRoleOverride` como selector de autoridad;
- `isPermissionAllowedForRole` como evaluador alterno;
- `checkPermissionWithRoleOverride` como fallback;
- cualquier branch que transforme un rol simulado en acceso real a todas las áreas.

---

#### 18. permissions.ts

`src/lib/auth/permissions.ts` no se elimina automáticamente.

`checkPermission` es candidato de retiro cuando todos sus consumidores de la unidad hayan migrado al evaluador canónico y no sea un adapter contractual requerido.

`normalizePermissionCode` solo puede retirarse cuando el consumidor use una identidad canónica publicada y validable de permiso. No se sustituye por concatenación dispersa de strings.

La existencia interna actual de `PermissionKey` en `@vento/contracts/authorization` no autoriza imports de rutas internas mientras el package no tenga una superficie pública adoptada.

---

#### 19. operational-context.ts

Después de retirar `applyNexoRoleOverrideArea`, el resto de `operational-context.ts` se clasifica función por función.

Pueden ser candidatos de migración o adapter:

- `getOperationalContext`;
- `checkOperationalPermission`;
- `requireOperationalPermission`;
- `buildOperationalBlockMessage`.

Reglas:

- un wrapper que solo adapte datos o mensajes puede permanecer;
- un wrapper que vuelva a ejecutar una RPC legacy cuando 018 ya cortó al evaluador canónico debe retirarse;
- `buildOperationalBlockMessage` puede permanecer como presentación si recibe razones ya resueltas y no decide autoridad;
- no se conserva `can_operate` como sustituto de permiso canónico.

---

#### 20. operational-session.ts

`operational-session.ts` no se clasifica en bloque como duplicado.

Su porción de:

- adaptación de sesión a Next.js;
- composición local de datos de NEXO;
- shape de retorno de aplicación;

puede permanecer.

Su porción que duplique resolución canónica de shared device, actor, contexto o permiso debe migrar o retirarse según el handoff de 018 y la especialización ya fijada por `NEXO-AUTH-016`.

No se permite mantener dos resolutores efectivos con precedencias diferentes.

---

#### 21. Clientes Supabase locales

`src/lib/supabase/client.ts` y `src/lib/supabase/server.ts` se tratan por responsabilidad.

`@vento/supabase` ya materializa internamente fronteras browser y server, pero el snapshot observado todavía no expone una release npm consumible.

Por tanto:

- no se elimina una factory local antes de adopción real del package;
- después del cutover se retira la lógica técnica duplicada que ya posea la factory compartida;
- puede permanecer un adapter local que resuelva env, `next/headers`, cookies o modo de escritura y entregue esa configuración a la factory compartida;
- el adapter local no puede recrear otra factory completa;
- no se cambia autorización empresarial por haber cambiado la factory Supabase.

---

#### 22. Componentes y composición visual

`vento-shell.tsx`, `profile-menu.tsx` y otras superficies visuales no se eliminan por compartir responsabilidades con `@vento/ui-web`.

La regla es:

```text
PRESENTATION MAY REMAIN
AUTHORITY MUST CONVERGE
```

Cuando un componente local mezcle UI con autorización, se retira o extrae únicamente la porción autoritativa después de que el reemplazo compartido esté adoptado.

Una primitiva visual local que todavía no tenga API compartida consumible puede permanecer sin convertirse en deuda autoritativa.

---

#### 23. Scripts temporales

`scripts/tmp-apply-privileged-request-area.mjs` aparece en el snapshot actual y referencia allowlists y helpers locales de autorización.

Esta tarea exige que un helper retirado no conserve consumidores en scripts temporales, generadores o parches.

La eliminación administrativa del script temporal continúa bajo su propietario canónico de saneamiento NEXO; `NEXO-AUTH-019` no reasigna esa responsabilidad.

Sin embargo, mientras el script exista, no puede conservar una dependencia activa sobre una superficie que 019 marque como retirada ni convertirse en mecanismo para reintroducirla.

---

#### 24. Clasificación canónica de retiro

Cada superficie deberá terminar en exactamente una de estas clases:

| Clase | Significado |
| --- | --- |
| `RETIRE_FULL` | archivo o export completo deja de tener responsabilidad legítima |
| `RETIRE_SYMBOL` | se elimina un símbolo específico y el archivo permanece |
| `RETIRE_BRANCH` | se elimina una rama autoritativa dentro de una superficie de dominio o framework |
| `KEEP_ADAPTER` | permanece adapter mínimo no autoritativo |
| `KEEP_DOMAIN` | permanece lógica NEXO propietaria |
| `KEEP_PRESENTATION` | permanece UI sin decisión de autoridad |
| `BLOCKED_BY_018` | no existe todavía cutover/paridad suficiente |
| `TRANSFERRED_OWNER` | la responsabilidad pertenece a otro owner canónico ya identificado |

No se usa una categoría genérica `KEEP_LEGACY` después del cutover.

---

#### 25. Condición mínima de elegibilidad

Un retiro solo puede pasar de `BLOCKED_BY_018` a una clase ejecutable cuando:

- el package o contrato destino está adoptado por la misma unidad;
- la versión exacta y lockfile están certificados;
- la superficie canónica existe físicamente;
- el consumidor ya está cortado al destino canónico;
- la paridad es `IGUAL` o `CORRECCION_INTENCIONAL`;
- no existe `BRECHA_DE_DATOS`;
- no existe `BUG_CANONICO` abierto;
- no existe `CONTRATO_PENDIENTE`;
- no queda consumidor legítimo del helper legacy;
- existe rollback compatible dentro de su límite temporal.

---

#### 26. Paridad no significa preservar el bug legacy

La clasificación de 018 permanece vigente:

```text
IGUAL
CORRECCION_INTENCIONAL
BRECHA_DE_DATOS
BUG_LEGACY
BUG_CANONICO
CONTRATO_PENDIENTE
```

Un `BUG_LEGACY` no se copia dentro del destino canónico para poder borrar el helper antiguo.

Si la diferencia es una corrección intencional, la evidencia debe identificarla y demostrar el contrato que la justifica.

---

#### 27. Cero consumidores antes del retiro

Antes de `RETIRE_FULL` o `RETIRE_SYMBOL` deberá demostrarse:

```text
DIRECT CONSUMERS = 0
ALIASES = 0
REEXPORTS = 0
WRAPPERS HIDING LEGACY = 0
TEMPORARY PATCH CONSUMERS = 0
UNREGISTERED CONSUMERS = 0
```

La ausencia de resultados en una búsqueda parcial no basta por sí sola. El scan debe cubrir el repositorio y superficies gobernadas de la misma versión.

---

#### 28. No mover la deuda

Está prohibido considerar retiro exitoso si la misma semántica reaparece mediante:

- función renombrada;
- archivo nuevo;
- inline logic;
- hook;
- utility;
- barrel export;
- alias de import;
- wrapper RPC;
- copia dentro de un Server Action;
- componente UI;
- script temporal;
- branch local de excepción.

El criterio es semántico, no textual.

---

#### 29. Reexports, barrels y aliases

Cuando un símbolo se retire, se eliminan también sus exports públicos o locales, barrels, aliases y tipos que únicamente existen para sostener esa ruta.

No se deja un export muerto como promesa de compatibilidad indefinida.

Una compatibilidad transitoria solo puede permanecer si 018 la declaró necesaria, acotada, observada y con condición de salida explícita.

---

#### 30. Adapters permitidos

Un `KEEP_ADAPTER` debe satisfacer todas estas condiciones:

- no evalúa permiso;
- no elige rol efectivo;
- no decide sede o área autorizada;
- no transforma simulación en autoridad;
- no interpreta `can_operate` como permiso;
- no hace fallback permisivo;
- no consulta una RPC legacy de autorización si el cutover ya la retiró;
- no crea claves de permiso fuera del catálogo canónico;
- no oculta errores técnicos como éxito;
- no mantiene state duplicado que cambie el outcome.

---

#### 31. Coexistencia después de 018

La coexistencia temporal solo puede existir antes de completar el retiro de una fila y bajo la misma regla de 018:

- un solo side effect autoritativo;
- comparación separada cuando sea segura;
- trazabilidad del legacy y del canónico;
- condición de salida;
- owner de retiro;
- rollback definido.

Nunca:

```text
ALLOW = LEGACY OR CANONICAL
```

---

#### 32. Punto de no retorno

Antes de `MIGRATION_COMMITTED`, la unidad puede ensayar rollback hacia una combinación previa certificada si sigue siendo segura y compatible.

Después de `MIGRATION_COMMITTED`:

- un helper retirado no recupera cuota;
- un finding migrado no vuelve a activo;
- un wrapper legacy no reaparece como fallback;
- una cookie retirada no vuelve a producir autoridad;
- un bypass no se reactiva para resolver una incidencia ordinaria.

La recuperación posterior usa la arquitectura canónica o una corrección gobernada, no resurrección de deuda.

---

#### 33. Observabilidad para declarar cero uso

Un contador de cero solo es evidencia si existe cobertura demostrada.

La futura unidad debe reconciliar, según aplicabilidad:

- scanner estático;
- consumidores registrados;
- allowlist temporal;
- imports y exports;
- telemetría legacy disponible;
- commit del consumidor;
- manifest y lockfile;
- runtime y ambiente observados.

Ausencia de instrumentación no equivale a cero uso.

---

#### 34. Evidencia stale

La evidencia de retiro se vuelve `STALE` si cambia cualquiera de estas dimensiones relevantes:

- commit de NEXO;
- package version;
- manifest;
- lockfile;
- export surface;
- tests;
- fixtures;
- env/config;
- runtime/framework;
- consumer set;
- compatibility ref;
- parity oracle;
- scanner/allowlist snapshot;
- backend requerido.

No se reutiliza un PASS de otra combinación.

---

#### 35. Integridad de seguridad

El retiro deberá demostrar al menos:

- deny real permanece deny;
- error técnico no produce allow;
- simulación no produce mutación real;
- selected site no amplía territorio;
- shared device no hereda privilegios del configurador;
- permiso de lectura no autoriza mutación;
- rol visible no reemplaza el grant;
- ocultar un control UI no sustituye autorización de servidor;
- eliminación del legacy no abre una ruta sin guard.

---

#### 36. Topología física futura

La cardinalidad de esta familia es `PER_IMPLEMENTATION_UNIT`.

La identidad física futura es:

```text
NEXO-AUTH-019::<implementation_unit_id>
```

El gate temporal es `POST_E5_PACKAGE`.

Toda materialización requiere:

- `implementation_unit_id` asignado;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS` cuando corresponda;
- handoff de 018 para las superficies de la unidad;
- autorización física explícita.

Este marcador documental no concede esa autorización.

---

#### 37. Relación con @vento/os-context

El snapshot observado de `@vento/os-context` contiene internamente:

- `getEffectiveContext`;
- `hasEffectivePermission`;
- `startContextSimulation`;
- `stopContextSimulation`.

Estas superficies son el destino conceptual de varias responsabilidades legacy, pero el package observado sigue siendo privado.

019 no puede importar rutas internas ni asumir publicación. La adopción consumible y la versión exacta deben llegar certificadas desde 018 antes del retiro.

---

#### 38. Relación con @vento/contracts

`@vento/contracts/authorization` ya contiene internamente identidades y tipos como `PermissionKey` y contratos estáticos de autorización.

Mientras esos artefactos no estén publicados y adoptados por la unidad, NEXO no puede depender de rutas internas para justificar el retiro de helpers locales.

Cuando el contrato consumible exista, se elimina cualquier construcción local paralela de identidad contractual que 018 haya clasificado como duplicada.

---

#### 39. Relación con @vento/supabase y @vento/ui-web

`@vento/supabase` conserva acceso técnico compartido y no autoridad empresarial.

`@vento/ui-web` conserva presentación y no autorización runtime.

Por tanto:

- retirar una factory Supabase local no mueve permisos a `@vento/supabase`;
- retirar un helper visual local no mueve lógica NEXO a `@vento/ui-web`;
- los adapters de framework pueden permanecer;
- la autoridad real sigue en el contrato de contexto/autorización aplicable.

---

#### 40. Propiedad de Supabase

Toda modificación de Supabase requerida por la migración o retiro permanece versionada, documentada y ejecutada desde `vento-group-sas/vento-shell`.

Esta tarea no crea migraciones, RPC, RLS, grants, datos, secretos ni cambios remotos.

Eliminar un helper consumidor no autoriza retirar un objeto backend. El retiro de objetos Supabase conserva su owner y lifecycle propios.

---

#### 41. Frontera con NEXO-AUTH-018

`NEXO-AUTH-018` conserva en exclusiva:

- adopción de packages;
- versiones exactas;
- compatibilidad del consumidor;
- paridad para el cutover;
- instalación y migración de imports en su materialización física;
- evidencia de transición;
- handoff de candidatos de retiro.

019 no declara adoptado un package que 018 no haya certificado.

Si 018 cambia una superficie o su clasificación, la fila correspondiente de 019 debe revalidarse antes de incorporarse físicamente.

---

#### 42. Frontera con NEXO-AUTH-020

`NEXO-AUTH-020 — Ejecutar pruebas integrales` conserva la certificación integral posterior al retiro.

019 debe entregar a 020:

- cero autoridad local duplicada en filas committed;
- lista exacta de adapters conservados;
- lista exacta de lógica de dominio conservada;
- evidencia de no reexport y no alias legacy;
- evidencia de rollback dentro del límite permitido;
- superficies afectadas y suites específicas ya ejecutadas.

020 valida el sistema completo y no sustituye la prueba de retiro por unidad.

---

#### 43. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el registro vigente ya cubre congelamiento de nuevos helpers y wrappers legacy, bloqueo de autoridad local, migración fail-closed, paridad contractual, evidencia atribuible, convergencia a cero consumidores, retiro irreversible de deuda y rollback sin resurrección. Esta tarea especializa esas obligaciones para NEXO sin crear una condición verificable nueva ni modificar owner, prioridad, estado, modalidad, package o relaciones del registro.

---

#### 44. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- `TREQ-SHELL-084`, para impedir nuevos aliases, wrappers, reexports o copias de superficies legacy;
- `TREQ-SHELL-086`, para bloquear autoridad local basada en role override, bypass, `can_operate`, booleanos y helpers duplicados;
- `TREQ-SHELL-088`, para que deuda migrada no recupere cuota ni reaparezca después del retiro;
- `TREQ-SHELL-091`, para reconciliar consumidores y lineage antes del retiro;
- `TREQ-SHELL-092`, para exigir cero llamada legacy y cero fallback permisivo después del cutover;
- `TREQ-SHELL-094`, para conservar las seis clasificaciones de paridad y no copiar bugs legacy;
- `TREQ-SHELL-096`, para evidencia atribuible por repo, commit, manifest, lockfile, runtime y versiones;
- `TREQ-SHELL-097`, para convergencia a cero directos, findings, clientes no registrados y allowlist activa antes del handoff de retiro;
- `TREQ-SHELL-098`, para unicidad por `implementation_unit_id` y rollback sin resucitar findings migrados;
- `TREQ-NEXO-001`, para que saneamiento NEXO no dependa de scripts temporales como mecanismo de reescritura de la rama.

Estas referencias son cobertura heredada y no representan requisitos creados o modificados por `NEXO-AUTH-019`.

---

#### 45. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el artefacto se preparó fuera del checkout local del usuario y no se incorporó al owner ni se ejecutó build documental |
| LOCAL | NOT_EXECUTED | no se abrió rama 019, no se modificó el repositorio local y no se ejecutaron format, quality, delivery, topología, TREQ ni batería global sobre la tarea 019 |
| REMOTA | PASS | se verificaron en solo lectura `vento-shell` main `8967e335391e5851322e90ee178fbbc5adb85f80` y `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`; marker exacto 019, sucesora 020, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, package manifests, APIs internas de `@vento/os-context`, estado privado de `@vento/supabase`, contratos de autorización y consumidores legacy observados |
| OPERATIVA | NOT_EXECUTED | no se retiró ningún helper, cookie, branch, import, adapter ni consumidor; no se ejecutó paridad ni prueba funcional de NEXO |
| FÍSICA | NOT_EXECUTED | no se creó ninguna instancia `NEXO-AUTH-019::<implementation_unit_id>` ni se modificaron código, packages, Supabase, CI, PR, merge o despliegues |

---

#### 46. Criterios de aceptación

- [x] Se definió duplicación por responsabilidad y no por nombre de archivo.
- [x] Se preservó la frontera de 018 como precondición de retiro.
- [x] Se preservó la separación de simulación de 017.
- [x] Se inventariaron los símbolos role override observados.
- [x] Se definió el retiro de `applyNexoRoleOverrideArea`.
- [x] Se separaron las tres responsabilidades de `role-override-config.ts`.
- [x] Se definió el retiro de la cookie de role override como autoridad.
- [x] Se preservó la cookie de sede solo como preferencia no autoritativa cuando corresponda.
- [x] Se preservó `guard.ts` como adapter de Next.js sin evaluador paralelo.
- [x] Se exigió reautorización server-side en mutaciones.
- [x] Se definió retiro parcial para `operational-area-scope.ts`.
- [x] Se evitó eliminar lógica de dominio de remisiones.
- [x] Se clasificaron `permissions.ts`, `operational-context.ts` y `operational-session.ts` por función.
- [x] Se preservaron adapters legítimos de Supabase y framework.
- [x] Se prohibió trasladar deuda por alias, wrapper, inline o reexport.
- [x] Se exigió cero consumidores antes de retiro completo.
- [x] Se preservó la clasificación de paridad de 018.
- [x] Se definió punto de no retorno y rollback sin resurrección.
- [x] Se definió evidencia stale.
- [x] Se conservó ownership de scripts temporales en su tarea propietaria.
- [x] Se conservó `PER_IMPLEMENTATION_UNIT`.
- [x] Se conservó `POST_E5_PACKAGE`.
- [x] Se mantuvo Supabase bajo `vento-shell`.
- [x] Se reservó certificación integral a 020.
- [x] No se crearon ni modificaron TREQ.
- [x] No se autorizó implementación física.

---

#### 47. Límites

Esta tarea no:

- publica packages;
- crea releases;
- instala dependencias;
- modifica manifest o lockfile;
- cambia imports físicamente;
- elimina archivos;
- elimina exports;
- elimina cookies;
- cambia `profile-menu.tsx`;
- cambia guards;
- cambia Server Actions;
- cambia remisiones;
- cambia factories Supabase;
- modifica UI compartida;
- crea adapters físicos;
- crea scanners;
- ejecuta paridad;
- ejecuta rollback;
- retira RPC o RLS;
- crea migraciones;
- toca Supabase remoto;
- modifica datos;
- elimina scripts temporales de owners ajenos;
- abre PR;
- hace merge;
- despliega;
- certifica integralmente NEXO.

La materialización física pertenece únicamente a futuras instancias autorizadas `NEXO-AUTH-019::<implementation_unit_id>` después de satisfacer 018 y el gate aplicable.

---

#### 48. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-018 — Migrar a paquetes de vento-shell`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-019 — Eliminar helpers duplicados`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-020 — Ejecutar pruebas integrales`

### ✅ NEXO-AUTH-020 — Ejecutar pruebas integrales

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-019 — Eliminar helpers duplicados
**Tarea siguiente:** NEXO-AUTH-021 — Auditar permisos actuales de LPN, activos y contenedores
**Tipo de tarea:** documental; contrato canónico de certificación integral por `implementation_unit_id` para el alcance base `NEXO-AUTH-001..019`, reuniendo build, contratos compartidos, autorización server-side, territorio, dispositivo compartido, simulación, flujos de remisiones, inventario, retiro legacy, seguridad, regresión, rollback y evidencia atribuible sin sustituir la certificación transversal posterior del BLOQUE U
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/00_INTRO.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; este marcador no ejecuta suites sobre ambientes, no modifica código, tests, fixtures, packages, dependencias, lockfiles, Supabase, datos, configuración, dispositivos, CI, releases, PR, merge, despliegues ni pilotos
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué deberá demostrar una futura materialización física para considerar integralmente validado el alcance base de autorización de NEXO después de:

- separar administración de operación;
- cerrar bypasses de remisiones;
- proteger acciones operativas;
- resolver sede y área efectivas;
- integrar dispositivo compartido;
- separar simulación de autoridad real;
- adoptar packages compartidos;
- retirar helpers y ramas de autoridad duplicada.

La regla raíz queda:

```text
BASE AUTH CONTRACTS MATERIALIZED
+
PACKAGE ADOPTION CERTIFIED
+
LEGACY RETIREMENT CERTIFIED
+
ALLOW PATHS PASS
+
DENY PATHS PASS
+
ZERO UNAUTHORIZED SIDE EFFECTS
+
E2E FLOWS PASS
+
ROLLBACK / RECOVERY PASS WHEN APPLICABLE
+
EVIDENCE FRESH AND ATTRIBUTABLE
=
NEXO AUTH UNIT PASS
```

Y siempre:

```text
CI007 BASELINE PASS
!=
INTEGRAL NEXO AUTH CERTIFICATION
```

```text
NEXO AUTH UNIT PASS
!=
GLOBAL AUTHORIZATION CERTIFIED
```

---

#### 2. Resultado material

La tarea fija un contrato de certificación para que cada futura unidad física:

1. identifique exactamente la `implementation_unit_id`, package owner, consumer commit, manifest, lockfile, runtime, framework y versiones compartidas;
2. ejecute gates técnicos reproducibles del consumidor;
3. ejecute los perfiles aplicables de las cuatro familias compartidas adoptadas;
4. pruebe cada responsabilidad `NEXO-AUTH-001..019` que aplique a la unidad;
5. demuestre rutas positivas y negativas;
6. demuestre autorización server-side antes de todo efecto empresarial;
7. ejecute flujos completos de remisiones e inventario incluidos en el alcance;
8. demuestre límites territoriales por sede y área;
9. demuestre aislamiento de dispositivo compartido;
10. demuestre que simulación nunca se convierte en autoridad real;
11. demuestre que el retiro legacy no dejó aliases, wrappers ni rutas equivalentes;
12. pruebe idempotencia, reintentos, fallos técnicos y recuperación cuando apliquen;
13. pruebe rollback dentro del límite temporal permitido;
14. registre defectos y retests sin borrar historia;
15. emita un resultado de unidad que no pueda confundirse con certificación global del sistema.

Este marcador documental no ejecuta esas pruebas.

---

#### 3. Naturaleza del marcador y materialización posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-020::<implementation_unit_id>
```

Toda materialización requiere:

- `implementation_unit_id` asignado;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS` cuando corresponda;
- resultados físicos aplicables de `NEXO-AUTH-001..019` para la misma unidad;
- autorización física explícita;
- ambiente de prueba autorizado;
- evidencia perteneciente a la misma combinación de código, contratos, configuración y backend.

La aprobación documental de esta tarea no concede autorización física.

---

#### 4. Handoff obligatorio recibido de NEXO-AUTH-019

`NEXO-AUTH-019` debe entregar a 020, por la misma unidad:

- cero autoridad local duplicada en filas `committed`;
- lista exacta de adapters conservados;
- lista exacta de lógica NEXO conservada;
- evidencia de cero aliases y cero reexports legacy aplicables;
- evidencia de cero wrappers que oculten la semántica retirada;
- evidencia de consumidores reconciliados;
- evidencia de rollback dentro del límite permitido;
- suites específicas ya ejecutadas durante el retiro;
- cualquier objeto backend todavía perteneciente a otro owner canónico.

Si una superficie permanece `BLOCKED_BY_018`, 020 no la normaliza a PASS.

---

#### 5. Handoff obligatorio recibido de NEXO-AUTH-018

`NEXO-AUTH-018` debe entregar, según la unidad:

- packages efectivamente adoptados;
- versiones exactas;
- manifest y lockfile coherentes;
- compatibilidad NEXO aplicable;
- perfiles de package;
- resultados de paridad;
- clasificación de divergencias;
- estado de cutover por superficie;
- rollback previo certificado cuando aplique;
- lineage de implementación;
- evidencia de frescura.

Un package presente en el workspace, un export interno o una release no consumida no satisface esta entrada.

---

#### 6. Universo de autorización base que certifica 020

La certificación cubre exclusivamente el minibloque:

| Tarea | Responsabilidad que debe quedar probada |
| --- | --- |
| `NEXO-AUTH-001` | configuración administrativa separada de operación |
| `NEXO-AUTH-002` | ausencia de bypass administrativo de remisiones |
| `NEXO-AUTH-003` | `inventory.remissions.all_sites` limitado a su semántica propia |
| `NEXO-AUTH-004` | creación de solicitudes protegida |
| `NEXO-AUTH-005` | edición y cancelación protegidas |
| `NEXO-AUTH-006` | preparación protegida |
| `NEXO-AUTH-007` | producción vinculada protegida cuando aplique |
| `NEXO-AUTH-008` | despacho protegido |
| `NEXO-AUTH-009` | tránsito protegido |
| `NEXO-AUTH-010` | recepción protegida |
| `NEXO-AUTH-011` | ajustes protegidos |
| `NEXO-AUTH-012` | conteos protegidos |
| `NEXO-AUTH-013` | movimientos protegidos |
| `NEXO-AUTH-014` | catálogo y configuraciones protegidos |
| `NEXO-AUTH-015` | sede y área efectivas aplicadas |
| `NEXO-AUTH-016` | dispositivo compartido integrado sin herencia indebida |
| `NEXO-AUTH-017` | simulación estricta sin autoridad ejecutable |
| `NEXO-AUTH-018` | adopción gobernada de packages compartidos |
| `NEXO-AUTH-019` | autoridad local duplicada retirada conforme al cutover |

Una fila no aplicable a una unidad debe justificar `NOT_APPLICABLE`; no puede omitirse silenciosamente.

---

#### 7. Frontera con NEXO-AUTH-021 y tareas posteriores

`NEXO-AUTH-021` inicia otro alcance documental: auditoría de permisos actuales de LPN, activos y contenedores.

Por tanto, 020 no afirma que hayan quedado certificados los permisos especializados reservados a `NEXO-AUTH-021..032`.

La regla es:

```text
BASE NEXO AUTH CERTIFIED
!=
ADVANCED LPN / ASSETS / CONTAINERS AUTH CERTIFIED
```

Las superficies de esos subdominios solo se prueban en 020 en la medida exacta en que formen parte de responsabilidades base ya materializadas; no se inventan permisos ni decisiones reservadas al bloque siguiente.

---

#### 8. Frontera con el BLOQUE U

El orden canónico conserva una certificación transversal posterior mediante `AUTH-QA-001..030` y `UX-QA-001..030`.

Por tanto:

```text
NEXO-AUTH-020 PASS
=
BASE NEXO AUTHORIZATION UNIT CERTIFIED
```

pero:

```text
NEXO-AUTH-020 PASS
!=
VENTO OS AUTHORIZATION FINAL PASS
```

020 no sustituye pruebas cross-app, seguridad global, regresión global, experiencia transversal ni certificación final del sistema.

---

#### 9. Baseline técnico AS-IS observado de NEXO

El consumidor NEXO observado expone gates técnicos para:

- lint;
- typecheck;
- test de baseline CI007;
- baseline CI007 multi-package;
- build Next.js.

El baseline vigente reconoce:

- cuatro packages canónicos;
- doce superficies NEXO;
- cuatro perfiles especializados de package;
- evidencia con identidad de commit, manifest, lockfile, suite, fixtures, ambiente, runtime, framework y package set;
- invalidación `STALE` ante cambios materiales;
- bloqueo de entorno productivo para el baseline sintético;
- deny paths obligatorios;
- prohibición de secretos dentro de la evidencia.

Ese baseline es prerrequisito técnico, no certificación integral.

---

#### 10. Doce superficies de baseline que deben permanecer cubiertas

La certificación no puede reducir el universo mínimo ya reconocido:

1. identidad, sesión y permisos;
2. contexto operativo;
3. catálogo, categorías, unidad y presentación;
4. stock por sede y LOC;
5. entradas, conteos, ajustes, retiros y traslados;
6. LOC, board, kiosk y posiciones;
7. remisiones;
8. división y recepción parcial;
9. activos físicos y conteos en la medida de la responsabilidad base aplicable;
10. settings, rutas y políticas operativas;
11. integración y fronteras de dominio;
12. UI, SSR, interacción, accesibilidad e impresión.

Un PASS de una superficie no compensa una superficie obligatoria fallida.

---

#### 11. Cuatro perfiles de package

Cuando la unidad adopte la familia correspondiente, deberá conservar el perfil aplicable:

| Familia | Perfil mínimo |
| --- | --- |
| `@vento/contracts` | tipos, schemas, serialización, semántica de identificadores y ausencia de cast global permisivo |
| `@vento/os-context` | sesión, contexto operativo, allow, deny y ausencia de elevación cliente |
| `@vento/supabase` | cliente browser, cliente server, deny path, fuente aislada de schema y ausencia de fixture privilegiado |
| `@vento/ui-web` | server render, client render, hydration, accesibilidad y print preview |

Un package no adoptado por la unidad no se marca PASS por transitividad.

---

#### 12. Capas de validación obligatorias

La unidad deberá cubrir, según aplicabilidad:

- contrato;
- estática;
- tipos;
- build;
- integración;
- autorización allow;
- autorización deny;
- seguridad adversarial;
- Server Actions y Route Handlers aplicables;
- backend real autorizado cuando el contrato dependa de RPC/RLS;
- idempotencia y concurrencia;
- regresión;
- dispositivo compartido;
- simulación;
- SSR/client/hydration;
- accesibilidad e impresión cuando el perfil UI aplique;
- rollback o recuperación;
- flujos E2E del alcance.

No se declara una capa PASS con mocks que omitan precisamente la frontera que esa capa debe demostrar.

---

#### 13. Ambientes de prueba

Se separan al menos:

```text
ISOLATED / CI
STAGING / INTEGRATION
DEVICE OR CONTROLLED OPERATIONAL ENVIRONMENT WHEN APPLICABLE
```

Reglas:

- el baseline sintético no usa producción;
- los escenarios que dependen de objetos reales de backend usan un ambiente autorizado con objetos reales aplicables;
- datos productivos no se requieren para certificar autorización;
- secretos no se copian a fixtures ni evidencias;
- una prueba física de dispositivo identifica el dispositivo real utilizado;
- un PASS de CI no sustituye una comprobación de staging o dispositivo cuando esa capa sea obligatoria.

---

#### 14. Identidad mínima de evidencia

Cada ejecución deberá poder vincular, según aplicabilidad:

- `implementation_unit_id`;
- package owner;
- consumer repository;
- consumer commit;
- branch o build;
- manifest identity;
- lockfile identity;
- test contract identity;
- test suite identity;
- fixture set identity;
- environment identity;
- runtime identity;
- framework identity;
- target package set;
- compatibility refs;
- NEXO profile set;
- backend version o migration state aplicable;
- feature/cutover state;
- inicio y finalización;
- resultado;
- razón de bloqueo o invalidez cuando exista.

La evidencia de otro commit, unidad, ambiente o combinación no satisface la actual.

---

#### 15. Resultado admisible de la unidad

La unidad solo puede terminar en `PASS` cuando:

```text
ALL REQUIRED TEST LAYERS COMPLETE
+
ALL APPLICABLE NEXO-AUTH-001..019 ROWS VERIFIED
+
ZERO REQUIRED TEST FAILURES
+
ZERO REQUIRED TESTS SILENTLY SKIPPED
+
DENY PATHS PROVEN
+
ZERO UNAUTHORIZED SIDE EFFECTS
+
PACKAGE PROFILES PASS
+
LEGACY RETIREMENT PASS
+
EVIDENCE FRESH
=
PASS
```

También pueden existir resultados `FAIL`, `BLOCKED`, `STALE` y `NOT_APPLICABLE` conforme a la evidencia real.

---

#### 16. BLOCKED y NOT_APPLICABLE

`BLOCKED` corresponde cuando falta una dependencia material, por ejemplo:

- package o release requerida no disponible;
- backend requerido no materializado;
- 018 no cerró cutover/paridad;
- 019 mantiene consumidor legacy pendiente;
- fixture no existe;
- dispositivo requerido no está disponible;
- identidad de unidad no es concluyente;
- ambiente no está autorizado.

`NOT_APPLICABLE` requiere una razón canónica y trazable. No se usa para evitar un escenario fallido.

---

#### 17. Gates técnicos del consumidor

La certificación deberá comenzar con una base reproducible del consumidor y cubrir al menos los equivalentes vigentes de:

- instalación bloqueada reproducible;
- lint;
- typecheck;
- pruebas automatizadas del consumidor;
- baseline CI007;
- build de producción del consumidor.

Si 018 añade validators de package o consumer adicionales, también forman parte de la unidad.

Un build verde no sustituye pruebas de autorización.

---

#### 18. Certificación de adopción compartida

Para cada package adoptado deberán quedar vinculados:

- versión exacta;
- compatibilidad NEXO exacta;
- perfil de familia;
- manifest y lockfile;
- imports/adapters de la unidad;
- paridad aplicable;
- estado de cutover;
- ausencia de fallback más permisivo;
- evidencia stale policy.

020 no vuelve a decidir la migración de 018; verifica que el sistema integrado conserve esas decisiones.

---

#### 19. Matriz integral de administración, bypass y visibilidad

| Owner | Path positivo obligatorio | Path negativo obligatorio |
| --- | --- | --- |
| `NEXO-AUTH-001` | configuración administrativa legítima conserva su carril administrativo | privilegio administrativo no concede operación que requiera contexto operativo |
| `NEXO-AUTH-002` | remisión autorizada usa permiso y contexto correctos | propietario, gerente o rol amplio no elude la autorización operacional |
| `NEXO-AUTH-003` | visibilidad multisede se obtiene cuando el permiso exacto lo concede | visibilidad multisede no autoriza mutar recursos de otra sede |

El resultado debe ser consistente entre UI, lectura server-side y mutación server-side aplicable.

---

#### 20. Matriz integral de remisiones

Cada responsabilidad debe probar al menos un caso permitido y un caso denegado:

| Owner | Operación |
| --- | --- |
| `NEXO-AUTH-004` | crear solicitud |
| `NEXO-AUTH-005` | editar y cancelar |
| `NEXO-AUTH-006` | preparar |
| `NEXO-AUTH-007` | producción vinculada cuando aplique |
| `NEXO-AUTH-008` | despachar |
| `NEXO-AUTH-009` | registrar tránsito |
| `NEXO-AUTH-010` | recibir |

Para cada operación se valida, según aplique:

- actor;
- permiso exacto;
- sede;
- área;
- recurso;
- estado previo;
- transición permitida;
- dispositivo;
- simulación;
- versión o concurrencia;
- efecto observado.

La denegación debe producir cero efecto empresarial.

---

#### 21. Matriz integral de inventario y configuración

| Owner | Operación protegida |
| --- | --- |
| `NEXO-AUTH-011` | ajustes |
| `NEXO-AUTH-012` | conteos |
| `NEXO-AUTH-013` | movimientos |
| `NEXO-AUTH-014` | catálogo y configuraciones |

Las pruebas deben impedir que:

- un permiso de lectura se convierta en write;
- un permiso amplio legacy actúe como writer genérico;
- una ruta directa omita el guard server-side;
- una configuración administrativa actúe como evento operativo;
- un error técnico se normalice como éxito;
- un reintento duplique un efecto.

---

#### 22. NEXO-AUTH-015 — sede y área efectivas

La certificación territorial deberá incluir:

- sede autorizada correcta;
- área autorizada correcta;
- recurso dentro del territorio;
- sede manipulada por URL o input;
- área manipulada por URL o input;
- preferencia visual de sede distinta de autoridad;
- contexto stale;
- cambio de sede o área entre evaluación y mutación cuando aplique.

Un valor enviado por cliente nunca se acepta como hecho efectivo sin validación canónica.

---

#### 23. NEXO-AUTH-016 — dispositivo compartido

Cuando la unidad incluya dispositivo compartido, debe demostrarse:

- identidad del dispositivo resuelta;
- aplicación permitida;
- sede y área del dispositivo dentro de sus límites;
- actor humano separado del principal técnico;
- permiso resultante no excede la intersección aplicable;
- configurador o administrador no presta sus privilegios al usuario posterior;
- cambio de trabajador invalida contexto previo cuando corresponda;
- dispositivo no permitido falla cerrado;
- acceso directo o caché no eluden la restricción;
- una denegación no produce mutación.

La prueba de un dispositivo no certifica automáticamente otro dispositivo.

---

#### 24. NEXO-AUTH-017 — simulación estricta

La suite debe demostrar simultáneamente:

```text
WOULD_ALLOW
!=
ALLOW
```

Escenarios mínimos aplicables:

- simulación autorizada inicia como plano hipotético;
- rol simulado no reemplaza rol real;
- sede o área simulada no amplían territorio real;
- preview conserva read-only;
- Server Action originada en simulación no produce efecto real;
- navegación no convierte preview en sesión real;
- salida de simulación obliga a resolver contexto real fresco;
- estado stale o inválido falla cerrado;
- UI de simulación no es fuente de autoridad.

---

#### 25. NEXO-AUTH-018 — packages compartidos

020 debe volver a verificar la integración completa de los packages adoptados por la unidad.

No basta con reutilizar un PASS histórico si cambió:

- commit;
- manifest;
- lockfile;
- versión;
- adapter;
- test suite;
- fixture;
- runtime;
- framework;
- package set;
- compatibilidad;
- backend.

Las clasificaciones `BRECHA_DE_DATOS`, `BUG_CANONICO` y `CONTRATO_PENDIENTE` permanecen bloqueantes.

---

#### 26. NEXO-AUTH-019 — retiro legacy

La suite integral debe demostrar que las superficies committed por 019 cumplen:

```text
DIRECT LEGACY CONSUMERS = 0
ALIASES = 0
REEXPORTS = 0
WRAPPERS HIDING LEGACY = 0
UNREGISTERED CONSUMERS = 0
```

Además:

- un deny canónico no cae a helper legacy;
- un fallo técnico no reactiva bypass;
- `role override` legacy no produce autoridad real;
- `can_operate` no reemplaza permiso;
- una cookie retirada no vuelve a actuar como autoridad;
- adapters conservados no recalculan decisiones.

---

#### 27. Flujo E2E de remisiones

La certificación debe recorrer el flujo completo aplicable de remisiones a través de sus responsabilidades propietarias, demostrando continuidad de autorización entre etapas.

Debe verificarse que:

- cada etapa revalida autoridad cuando corresponde;
- un permiso de una etapa no concede la siguiente;
- cambios de actor, sede, área, dispositivo o contexto invalidan la continuidad cuando corresponda;
- una transición denegada no cambia estado ni inventario;
- recepción parcial conserva el remanente correcto cuando aplique;
- reintentos no duplican efectos;
- errores intermedios no producen estado final falso;
- el registro de auditoría mantiene correlación suficiente.

---

#### 28. Autorización server-side antes del efecto

Toda mutación incluida en el alcance debe demostrar:

```text
REQUEST
->
SERVER AUTHORIZATION
->
RESOURCE / CONTEXT VALIDATION
->
BUSINESS EFFECT
```

Nunca:

```text
UI VISIBLE
->
BUSINESS EFFECT
```

La prueba deberá intentar, cuando sea materialmente posible:

- llamada directa sin pasar por UI;
- payload con sede o área alterada;
- recurso fuera de scope;
- permiso ausente;
- sesión expirada;
- simulación activa;
- dispositivo no permitido.

El resultado esperado es deny sin efecto.

---

#### 29. Paridad de allow y deny

La certificación exige ambos carriles:

```text
ALLOW EXPECTED -> ALLOW OBSERVED
DENY EXPECTED -> DENY OBSERVED
```

No existe PASS integral si solo se prueba happy path.

Cuando exista comparación legacy/canónica todavía permitida por el lifecycle, el oracle conserva las seis clasificaciones de 018 y no ejecuta doble side effect.

---

#### 30. Casos adversariales territoriales y de identidad

La suite debe cubrir, según aplicabilidad:

- rol manipulado;
- actor ausente;
- actor distinto al esperado;
- sede manipulada;
- área manipulada;
- recurso ajeno;
- dispositivo distinto;
- dispositivo revocado o no permitido;
- permiso ausente;
- permiso de lectura usado para mutación;
- sesión expirada;
- contexto stale;
- simulación activa;
- parámetro cliente que intenta fabricar contexto.

Todo caso no autorizado falla cerrado.

---

#### 31. Cero side effects en deny

Para toda mutación denegada se deben comparar estado previo y posterior.

Según la operación, se observa al menos:

- fila principal;
- estado empresarial;
- stock o proyección afectada;
- movimiento o ledger aplicable;
- evento/outbox aplicable;
- receipt;
- auditoría;
- trabajo de impresión o integración si correspondiera.

La ausencia de respuesta de éxito no basta: debe demostrarse que no ocurrió el efecto.

---

#### 32. Idempotencia, reintentos y concurrencia

Cuando la operación soporte intención, receipt, expected version o clave idempotente, la suite debe cubrir:

- mismo intento repetido;
- respuesta perdida;
- timeout;
- doble submit;
- dos solicitudes concurrentes;
- versión stale;
- recuperación posterior.

Un reintento no puede convertir un deny en allow ni duplicar una mutación ya aceptada.

---

#### 33. Fallos técnicos

Se deben diferenciar de una denegación empresarial:

- error de red;
- RPC no disponible;
- schema u objeto requerido ausente;
- respuesta inválida;
- package o adapter con error;
- timeout;
- conflicto de versión;
- evidencia stale.

Regla:

```text
TECHNICAL FAILURE
!=
ALLOW
```

Y tampoco se oculta automáticamente como deny válido si el contrato exige diagnóstico distinto.

---

#### 34. Backend real cuando aplica

RLS, RPC, grants, funciones o políticas solo pueden declararse probadas cuando la unidad depende realmente de esos objetos y la evidencia proviene de un ambiente autorizado que los materializa.

Un mock puede probar lógica de aplicación, pero no certifica una política física de backend inexistente.

Toda modificación VENTO de Supabase continúa bajo `vento-group-sas/vento-shell`.

---

#### 35. SSR, cliente, hydration, accesibilidad e impresión

Cuando el perfil de UI sea aplicable, deben quedar demostrados:

- server render;
- client render;
- ausencia de hydration mismatch contractual;
- interacción habilitada solo cuando corresponde;
- estados denied y blocked perceptibles;
- controles inaccesibles no convertidos en autoridad;
- accesibilidad del flujo probado;
- print preview cuando la superficie lo requiera.

Un botón oculto no sustituye autorización de servidor.

---

#### 36. Evidencia de retiro semántico

La búsqueda de imports es necesaria pero no suficiente.

La unidad debe detectar también:

- aliases;
- barrels;
- wrappers;
- inline logic;
- hooks;
- reexports;
- llamadas RPC legacy equivalentes;
- role allowlists usadas como autoridad;
- cookies usadas como autoridad;
- copia de lógica en Server Actions;
- scripts temporales que reintroduzcan la ruta.

El resultado se evalúa por semántica, no solo por nombre textual.

---

#### 37. Auditoría y correlación

Cada escenario debe conservar suficiente evidencia para explicar:

- quién o qué actuó;
- qué modalidad se resolvió;
- qué permiso se evaluó;
- qué sede y área fueron efectivas;
- qué recurso se intentó afectar;
- qué decisión se obtuvo;
- por qué;
- qué efecto ocurrió o no ocurrió;
- qué correlación, receipt o identidad de intención aplica;
- qué versión de contratos y código produjo el resultado.

La evidencia no incluye secretos, PIN, tokens ni datos personales innecesarios.

---

#### 38. Rollback antes de MIGRATION_COMMITTED

Cuando la unidad aún se encuentre antes del punto de no retorno y 018 permita rollback, la certificación debe demostrar que la combinación previa:

- está identificada;
- sigue siendo compatible;
- sigue siendo segura;
- posee manifest y lockfile reproducibles;
- no depende de un bypass ya prohibido;
- vuelve a operar sin ampliar autoridad;
- conserva evidencia post-rollback.

Un rollback no se improvisa copiando helpers legacy desde otra rama.

---

#### 39. Después de MIGRATION_COMMITTED

Después del commit de migración:

- findings migrados no vuelven a activos;
- helpers retirados no reaparecen;
- role override legacy no se reactiva;
- cookies retiradas no recuperan autoridad;
- fallback legacy no reaparece;
- una incidencia ordinaria se corrige dentro de la arquitectura canónica.

Una prueba de recuperación que resucite deuda debe fallar.

---

#### 40. NEXO-AUTH-007 condicional

La protección de producción vinculada se prueba dentro de 020 únicamente cuando el package o implementation unit incluya la capacidad propietaria correspondiente.

Si no aplica, debe registrarse `NOT_APPLICABLE` con la condición canónica que lo justifica.

No se inventa un flujo productivo para obtener cobertura artificial.

---

#### 41. Recepción parcial y división

Cuando la unidad incluya parcialidad, debe demostrarse que:

- cantidad aceptada no excede cantidad pendiente;
- una recepción parcial no cierra el documento indebidamente;
- remanente posterior es exacto;
- autorización se aplica a cada efecto real;
- reintento no duplica recepción;
- deny conserva pendiente y stock sin alteración.

Esta cobertura corresponde también a la superficie baseline de división y recepción parcial.

---

#### 42. Datos y fixtures

Los fixtures deberán ser:

- versionados;
- trazables;
- mínimos;
- no productivos salvo autorización excepcional propietaria;
- suficientes para allow y deny;
- capaces de representar al menos dos territorios cuando se pruebe aislamiento territorial;
- capaces de representar actores o modalidades distintas cuando se pruebe separación de autoridad;
- reiniciables o reconciliables sin ocultar side effects.

Cambiar fixtures materialmente vuelve stale la evidencia asociada.

---

#### 43. Defectos y retest

Todo fallo debe conservar:

- escenario;
- expectativa;
- observación;
- commit/build;
- ambiente;
- evidencia;
- owner;
- condición de salida.

Un retest:

- no borra el fallo original;
- usa versión corregida identificable;
- repite el escenario afectado;
- ejecuta regresión proporcional cuando el cambio toca autorización, territorio, dispositivo, simulación, packages, idempotencia o retiro legacy.

No se cierra un defecto por explicación narrativa sin evidencia.

---

#### 44. Evidencia stale

La evidencia deja de certificar la unidad si cambia materialmente alguno de estos elementos:

- commit NEXO;
- package versions;
- manifest;
- lockfile;
- test contract;
- test suite;
- fixtures;
- environment;
- runtime;
- framework;
- target package set;
- compatibility refs;
- NEXO profile set;
- adapter;
- backend schema/migration state aplicable;
- feature/cutover state;
- consumer set;
- scanner/allowlist snapshot relevante.

Una evidencia stale se conserva históricamente pero no produce PASS actual.

---

#### 45. Paquete de evidencia de cierre de unidad

El cierre físico de 020 deberá poder producir una vista reconciliada que contenga, como mínimo:

```text
IMPLEMENTATION UNIT
OWNER PACKAGE
CONSUMER COMMIT
MANIFEST IDENTITY
LOCKFILE IDENTITY
TARGET PACKAGE SET
COMPATIBILITY REFS
NEXO PROFILE SET
TECHNICAL GATES
NEXO-AUTH-001..019 APPLICABILITY MATRIX
ALLOW RESULTS
DENY RESULTS
E2E RESULTS
LEGACY RETIREMENT RESULTS
ROLLBACK / RECOVERY RESULT
OPEN BLOCKERS
EVIDENCE FRESHNESS
FINAL UNIT RESULT
```

No se declara PASS si el paquete de evidencia no puede reconciliarse con la ejecución real.

---

#### 46. Handoff hacia la continuidad NEXO

Un PASS de 020 entrega:

- alcance base `NEXO-AUTH-001..019` certificado para la unidad probada;
- packages y versiones efectivamente usadas;
- adapters y lógica NEXO conservados;
- pruebas allow/deny y E2E;
- evidencia de dispositivo y simulación cuando apliquen;
- estado de retiro legacy;
- defectos cerrados o bloqueos explícitos;
- límites de lo que NO fue certificado.

Ese handoff permite continuar la documentación hacia `NEXO-AUTH-021` sin afirmar que el subdominio avanzado ya está implementado o certificado.

---

#### 47. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea ejecuta y reconcilia cobertura ya existente para autorización, contexto, paquetes compartidos, remisiones, movimientos, dispositivo, simulación, paridad, retiro legacy, evidencia y rollback. No introduce una nueva obligación de producto ni cambia owner, prioridad, modalidad, package, estado o relaciones de requisitos existentes.

---

#### 48. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- `TREQ-SHELL-006`, para pruebas propias y compatibilidad por consumidor;
- `TREQ-SHELL-086`, para bloquear autoridad local por role override, bypass, `can_operate`, contexto fabricado y helpers duplicados;
- `TREQ-SHELL-092`, para cero fallback a autoridad legacy después del cutover;
- `TREQ-SHELL-094`, para paridad contractual sin doble side effect;
- `TREQ-SHELL-096`, para evidencia por consumidor, commit, manifest, lockfile, runtime y versiones;
- `TREQ-SHELL-097`, para convergencia a cero directos y findings legacy antes del retiro;
- `TREQ-SHELL-098`, para unicidad por unidad y rollback sin resurrección;
- `TREQ-NEXO-006`, para remisiones sin doble contabilización y con efecto verificable;
- `TREQ-NEXO-007`, para paridad controlada al retirar fallbacks legacy de remisiones;
- `TREQ-NEXO-009`, para jerarquía única de capacidades de remisión y paridad entre interfaz y servidor;
- `TREQ-NEXO-011`, para movimientos y proyecciones reconciliables con atomicidad, idempotencia y recuperación;
- `TREQ-NEXO-028`, para acceso por LOC normalizado y destino local seguro;
- `TREQ-NEXO-029`, para restricción de kiosco a targets declarados.

Estas referencias son cobertura heredada y no representan requisitos creados o modificados por `NEXO-AUTH-020`.

---

#### 49. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el artefacto documental se preparó fuera del checkout de ejecución; no se corrieron lint, typecheck, test, baseline CI007 ni build sobre una materialización 020 |
| LOCAL | NOT_EXECUTED | no se abrió rama 020, no se incorporó el artefacto al owner y no se ejecutaron format, quality, delivery, topología, TREQ ni batería global para 020 |
| REMOTA | PASS | se verificaron en solo lectura `vento-shell` main `93ee08a6e6fca67ce9622e2a254d46dc75c20b0f` y `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`; se verificaron owner, continuidad proyectada hacia 020, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, títulos `NEXO-AUTH-001..020`, baseline CI007, doce superficies, cuatro perfiles, scripts técnicos del consumidor y la separación posterior del BLOQUE U |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron escenarios allow/deny, remisiones E2E, pruebas de dispositivo, simulación, concurrencia, rollback ni retest sobre una unidad física |
| FÍSICA | NOT_EXECUTED | no se creó ninguna instancia `NEXO-AUTH-020::<implementation_unit_id>` ni se modificaron producto, backend, Supabase, dispositivos, CI, releases, PR, merge o despliegues |

---

#### 50. Criterios de aceptación

- [x] Se preservó `PER_IMPLEMENTATION_UNIT`.
- [x] Se preservó `POST_E5_PACKAGE`.
- [x] Se definió la identidad futura `NEXO-AUTH-020::<implementation_unit_id>`.
- [x] Se consumió el handoff de 018.
- [x] Se consumió el handoff de 019.
- [x] Se delimitó el alcance exacto `NEXO-AUTH-001..019`.
- [x] Se separó 020 de `NEXO-AUTH-021..032`.
- [x] Se separó 020 de la certificación transversal del BLOQUE U.
- [x] Se preservaron las doce superficies CI007.
- [x] Se preservaron los cuatro perfiles NEXO de package.
- [x] Se exigieron gates técnicos reproducibles.
- [x] Se exigieron allow y deny paths.
- [x] Se exigió cero side effect ante deny.
- [x] Se definió matriz completa de remisiones base.
- [x] Se cubrieron ajustes, conteos, movimientos, catálogo y configuraciones.
- [x] Se cubrió sede y área efectivas.
- [x] Se cubrió dispositivo compartido.
- [x] Se cubrió simulación estricta.
- [x] Se cubrió integración de packages.
- [x] Se cubrió retiro legacy.
- [x] Se cubrieron idempotencia, reintentos y concurrencia cuando aplican.
- [x] Se separaron fallos técnicos de decisiones de autorización.
- [x] Se exigió backend real para certificar objetos reales cuando aplican.
- [x] Se cubrieron SSR, client, hydration, accesibilidad e impresión cuando aplica.
- [x] Se definió rollback previo y prohibición de resurrección posterior.
- [x] Se definió evidencia stale.
- [x] Se definió defect handling y retest.
- [x] Se definió paquete de evidencia de cierre por unidad.
- [x] Se mantuvo Supabase bajo `vento-shell`.
- [x] No se crearon ni modificaron TREQ.
- [x] No se autorizó implementación física.

---

#### 51. Límites

Esta tarea no:

- ejecuta pruebas físicas;
- autoriza una implementation unit;
- crea fixtures;
- modifica tests;
- corrige fallos encontrados;
- cambia permisos;
- cambia rutas;
- cambia Server Actions;
- cambia lógica de remisiones;
- cambia lógica de inventario;
- adopta packages;
- cambia package versions;
- modifica manifest o lockfile;
- elimina helpers;
- elimina cookies;
- elimina scripts temporales;
- crea scanners;
- modifica Supabase;
- crea RPC, RLS o grants;
- modifica datos;
- certifica `NEXO-AUTH-021..032`;
- certifica todo NEXO funcional o UX;
- sustituye `AUTH-QA-001..030`;
- sustituye `UX-QA-001..030`;
- aprueba piloto global;
- declara producción lista;
- abre PR;
- hace merge;
- despliega.

La ejecución física pertenece únicamente a instancias autorizadas `NEXO-AUTH-020::<implementation_unit_id>` después de satisfacer los gates correspondientes.

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

---

#### 52. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-019 — Eliminar helpers duplicados`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-020 — Ejecutar pruebas integrales`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-021 — Auditar permisos actuales de LPN, activos y contenedores`
