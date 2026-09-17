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
