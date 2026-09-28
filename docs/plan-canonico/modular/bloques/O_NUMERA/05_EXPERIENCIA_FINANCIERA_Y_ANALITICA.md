### MINI-BLOQUE — EXPERIENCIA FINANCIERA Y ANALITICA

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia financiera y analitica** dentro de **O NUMERA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `NUMERA-UX-001` a `NUMERA-UX-028` — 28 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar procesos financieros y analíticos” y concluye con “Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:NUMERA-UX -->
### Reconciliación topológica de NUMERA-UX-001 a NUMERA-UX-028

El mini-bloque inventaría, diseña, concilia, prototipa y aprueba la experiencia financiera objetivo antes de completar su implementación física.

| Propiedad | Valor |
| --- | --- |
| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

La materialización posterior corresponde a las unidades de implementación y paquetes que consuman este diseño.

### ✅ NUMERA-UX-001 — Inventariar procesos financieros y analíticos

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUTH-015 — Definir permisos para crear, compartir, aprobar y publicar escenarios, precios y presupuestos
**Tarea siguiente:** NUMERA-UX-002 — Separar lectura ejecutiva y operación contable
**Tipo de tarea:** inventario documental cerrado de los procesos financieros y analíticos propiedad de NUMERA, reconciliando identidad `VPROC-*`, propósito, ownership, consumidores, lifecycle, superficies canónicas, estado AS-IS, fronteras interaplicación y autorización final aprobada, sin inferir procesos desde rutas ni diseñar todavía la experiencia por rol; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica procesos runtime, estados, transiciones, rutas, pantallas, permisos, roles, paquetes, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, integraciones, hechos económicos, conciliaciones ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada los procesos canónicos financieros y analíticos cuya aplicación propietaria es NUMERA y convertir ese universo en la base única para el diseño de experiencia `NUMERA-UX-002..028`.

La tarea debe resolver sin ambigüedad:

- qué `VPROC-*` son propiedad de NUMERA;
- qué propósito empresarial conserva cada proceso;
- qué procesos operativos externos participan o alimentan el resultado sin convertirse en procesos NUMERA duplicados;
- qué lifecycle canónico ya existe para cada proceso;
- qué superficies `VSCREEN-*` objetivo pertenecen directamente a esos procesos;
- qué diferencia existe entre las siete rutas AS-IS y las veinte superficies objetivo;
- qué fronteras impiden recrear ventas, compras, inventario, producción, personas o fidelización dentro de NUMERA;
- qué handoff recibe la experiencia desde dominio y autorización financiera;
- qué responsabilidades quedan reservadas a las tareas UX posteriores.

El inventario no diseña todavía layouts, dashboards, flujos detallados ni variantes por rol.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato documental reutilizable;
- no crea instancia física propia;
- no materializa pantallas ni rutas;
- no modifica el catálogo de procesos;
- no modifica estados o transiciones;
- no materializa permisos;
- no modifica `vento-numera`;
- no modifica Supabase;
- no ejecuta operación financiera real.

---

#### 3. Handoff recibido de NUMERA-AUTH-015

La predecesora aprobada entrega:

```text
NUMERA_PLANNING_AUTHORIZATION_REGISTRY = NUMERA-PLANNING-AUTHORIZATION-REGISTRY-001
NUMERA_TARGET_CAPABILITY_COUNT_BEFORE_015 = 93
NUMERA_PLANNING_PERMISSION_COUNT_015 = 32
NUMERA_TARGET_CAPABILITY_COUNT_AFTER_015 = 125
NUMERA_SHARED_PERMISSION_MATERIALIZED_COUNT = 6
NUMERA_SHARED_PERMISSION_PENDING_COUNT_AFTER_015 = 119
NUMERA_015_PERMISSION_STATE = CONTRACT_DEFINED_PENDING_MATERIALIZATION
NUMERA_PLANNING_RESOURCE_COUNT = 4
NUMERA_PLANNING_ACTIONS_PER_RESOURCE = 8
SCENARIO_PERMISSION_COUNT = 8
BUDGET_PERMISSION_COUNT = 8
FORECAST_PERMISSION_COUNT = 8
PRICE_VERSION_PERMISSION_COUNT = 8
PLANNING_ACTION_SET = create|update|share|request|approve|reject|publish|unpublish
PLANNING_READ_PERMISSION_SET = numera.finance.scenarios.view|numera.finance.budgets.view|numera.finance.forecasts.view|numera.finance.price_versions.view
PLANNING_SCOPE = PLANNING_SCOPE
SHARE_IS_VIEW = NO
SHARE_IS_GRANT = NO
SHARE_IS_EXPORT = NO
REQUEST_IS_APPROVE = NO
APPROVE_IS_PUBLISH = NO
PUBLISH_IS_EXPORT = NO
PUBLISH_IS_OPERATIONAL_ACTIVATION = NO
PRICE_VERSION_PUBLISHED_IS_OPERATIONAL_ACTIVE_PRICE = NO
UPSERT_BUDGET_LEGACY_MANAGE_TARGET_AUTHORITY = NO
BUDGET_CREATE_AND_UPDATE_ARE_DISTINCT = YES
STALE_PLANNING_VERSION = DENY_AND_REEVALUATE
LAST_WRITE_WINS_FOR_MATERIAL_PLANNING_DECISION = FORBIDDEN
ADMIN_SHIFT_REQUIRED = NO
ADMIN_CHECKIN_REQUIRED = NO
SERVER_SIDE_REVALIDATION_REQUIRED = YES
DENY_SIDE_EFFECT_ALLOWED = NO
PLANNING_PERMISSION_CAN_REOPEN_CLOSED_PERIOD = NO
NUMERA_AUTH_013_FUTURE_INSTANCE_MUST_TEST_015_WHEN_CONSUMED = YES
NUMERA_AUTHORIZATION_MINIBLOCK_CLOSED = YES
TREQ_CHANGES = 0
```

El inventario UX consume este catálogo como frontera de autoridad. No redefine permisos ni convierte una acción visible en autorización efectiva.

---

#### 4. Fuentes canónicas reconciliadas

El inventario consume y preserva:

- `NUMERA-AUD-001..012`;
- `OPS-CST-001`;
- `NUMERA-DOM-001..018`;
- `NUMERA-AUTH-001..015`, usando la versión aprobada de `NUMERA-AUTH-015` como base inmediata mientras termina su incorporación;
- `PROC-CANONICAL-ID-REGISTRY-001`;
- `PROC-BUSINESS-PURPOSE-REGISTRY-001`;
- `PROC-APPLICATION-OWNERSHIP-REGISTRY-001`;
- `PROC-PROCESS-OWNER-MATRIX-001`;
- `PROC-PROCESS-CONSUMER-MATRIX-001`;
- contratos canónicos de estados `VPROC-0001..0069`;
- catálogo y bindings `VSCREEN-*`;
- inventario AS-IS `NUMERA-ROUTE-INVENTORY-001`;
- `04A_13_NUMERA.md` y requisitos de proceso vigentes;
- reglas transversales de autorización, alcance, evidencia, idempotencia, integración y no duplicación de hechos.

---

#### 5. Regla fundamental del inventario

Se congela:

```text
PROCESS_ID
!= ROUTE
!= SCREEN_ID
!= PAGE_FILE
!= FORM
!= SERVER_ACTION
!= PERMISSION_CODE
!= CAPABILITY_ID
!= DATABASE_TABLE
```

La existencia de una ruta o formulario no crea un proceso y la existencia de un proceso canónico no demuestra que toda su experiencia objetivo esté materializada.

---

#### 6. Unidad de inventario

Cada fila del inventario deberá conservar como mínimo:

```text
process_id
origin_alias
canonical_process_name
owner_app_code
business_purpose
ux_inventory_nature
initial_state
final_normal_state
state_count
canonical_screen_count
canonical_screen_ids
consumer_apps
observer_apps
ownership_boundary
implementation_status
```

Estos campos describen el universo a diseñar; no crean nuevos contratos físicos.

---

#### 7. Resultado cuantitativo

Se define:

```text
NUMERA-FINANCIAL-ANALYTICAL-PROCESS-INVENTORY-001
```

con el siguiente resultado:

```text
NUMERA_OWNER_PROCESS_COUNT = 7
NUMERA_OWNER_PROCESS_MISSING_COUNT = 0
NUMERA_OWNER_PROCESS_DUPLICATE_COUNT = 0
NUMERA_CANONICAL_TARGET_SCREEN_COUNT = 20
NUMERA_TARGET_SCREEN_MISSING_PROCESS_BINDING_COUNT = 0
NUMERA_TARGET_SCREEN_DUPLICATE_PRIMARY_PROCESS_COUNT = 0
NUMERA_ASIS_PAGE_COUNT = 7
NUMERA_ASIS_PROTECTED_PAGE_COUNT = 5
NUMERA_ASIS_PUBLIC_CONTROLLED_PAGE_COUNT = 2
NUMERA_ASIS_ROUTE_HANDLER_COUNT = 0
NUMERA_ASIS_TO_TARGET_SCREEN_CARDINALITY_IS_ONE_TO_ONE = NO
```

La cardinalidad de siete procesos, siete páginas AS-IS y veinte pantallas objetivo corresponde a tres universos diferentes.

---

#### 8. Universo canónico de procesos propiedad de NUMERA

El registro de ownership canónico asigna exactamente estos siete procesos a `numera`:

| # | Proceso | Alias de origen | Nombre canónico | Naturaleza de inventario UX |
| ---: | --- | --- | --- | --- |
| 1 | `VPROC-0010` | `ASIS-SRC-010` | Preparar y reconciliar el paquete autorizado para pagos y beneficios laborales | paquete financiero laboral y conciliación |
| 2 | `VPROC-0051` | `ASIS-SRC-051` | Registrar hechos económicos desde eventos operativos y soportes correlacionados | hechos económicos y conciliación |
| 3 | `VPROC-0052` | `ASIS-SRC-052` | Gestionar obligación, aprobación y pago a proveedor con conciliación bancaria | obligaciones, tesorería y cumplimiento |
| 4 | `VPROC-0053` | `ASIS-SRC-053` | Gestionar cartera, cobro, recaudo, aplicación y diferencia | cartera, recaudo y aplicación |
| 5 | `VPROC-0054` | `ASIS-SRC-054` | Gestionar costos, distribución, presupuesto, cierre y rentabilidad con reglas versionadas | costos, variaciones, cierres y rentabilidad |
| 6 | `VPROC-0061` | `ASIS-SRC-061` | Gestionar medición, análisis, decisión de mejora y verificación de resultado | analítica, indicadores y mejora |
| 7 | `VPROC-0069` | `ADICIONAL-PROVISIONAL-G` | CAP-12.11 — Gestionar presupuestos: Gestionar versión presupuestal, supuestos, aprobación, vigencia, consumo, proyección y desviación sin convertir el presupuesto en hecho contable. | presupuesto, escenario y forecast |

La columna `Naturaleza de inventario UX` solo organiza el diseño posterior; no renombra ni reclasifica el `VPROC-*` canónico.

---

#### 9. Propiedad exclusiva y frontera de NUMERA

Para los siete procesos se conserva:

```text
owner_app_code = numera
```

La propiedad significa que NUMERA gobierna el resultado financiero o analítico correspondiente.

No significa que NUMERA sea propietario de:

- venta;
- pedido;
- recepción comercial;
- inventario físico;
- lote de producción;
- receta;
- asistencia laboral;
- identidad de cliente;
- fidelización;
- contenido de campaña;
- activo físico;
- documento transversal por su sola existencia.

Esos resultados permanecen en sus aplicaciones propietarias y NUMERA consume hechos, referencias, soportes o proyecciones autorizadas.

---

#### 10. VPROC-0010 — paquete laboral financiero

Identidad:

```text
process_id = VPROC-0010
origin_alias = ASIS-SRC-010
owner_app_code = numera
```

Propósito protegido:

> Preparar y reconciliar el paquete autorizado para pagos y beneficios laborales.

Lifecycle observado:

```text
INITIAL = VPROC-0010.PAYROLL_CYCLE_OPENED
FINAL_NORMAL = VPROC-0010.PAYROLL_CYCLE_RECONCILED
STATE_COUNT = 9
```

Frontera:

- VISO conserva vínculo, asignaciones y decisiones laborales;
- ANIMA conserva hechos personales/operativos de asistencia cuando corresponda;
- NUMERA prepara y concilia el paquete económico;
- banco o tercero puede ejecutar pago sin adquirir ownership interno del proceso.

Superficie primaria objetivo:

```text
VSCREEN-0153 — Paquete laboral para pagos y beneficios
```

---

#### 11. VPROC-0051 — hechos económicos y conciliación

Identidad:

```text
process_id = VPROC-0051
origin_alias = ASIS-SRC-051
owner_app_code = numera
```

Propósito protegido:

> Representar hechos económicos a partir de eventos y soportes verificables para evitar registros aislados o sin origen operacional.

Lifecycle:

```text
INITIAL = VPROC-0051.ECONOMIC_EVENT_RECEIVED
FINAL_NORMAL = VPROC-0051.ECONOMIC_EVENT_RECONCILED
STATE_COUNT = 9
```

Frontera:

```text
NUMERA_RECEIVES_ECONOMIC_EFFECT = YES
NUMERA_RECREATES_SOURCE_OPERATION = NO
```

Superficies primarias objetivo:

```text
VSCREEN-0095
VSCREEN-0096
VSCREEN-0101
VSCREEN-0102
VSCREEN-0154
```

---

#### 12. VPROC-0052 — obligaciones, tesorería y cumplimiento

Identidad:

```text
process_id = VPROC-0052
origin_alias = ASIS-SRC-052
owner_app_code = numera
```

Propósito protegido:

> Cumplir obligaciones con proveedores mediante aprobación, pago y conciliación que demuestren qué se debía, qué se pagó y qué permanece pendiente.

Lifecycle:

```text
INITIAL = VPROC-0052.PAYABLE_REGISTERED
FINAL_NORMAL = VPROC-0052.PAYABLE_SETTLED
STATE_COUNT = 9
```

Superficies primarias objetivo:

```text
VSCREEN-0097
VSCREEN-0098
VSCREEN-0100
VSCREEN-0155
VSCREEN-0157
```

La compra y recepción siguen en ORIGO; la ejecución bancaria externa no sustituye obligación, autoridad, resultado ni conciliación NUMERA.

---

#### 13. VPROC-0053 — cartera y recaudo

Identidad:

```text
process_id = VPROC-0053
origin_alias = ASIS-SRC-053
owner_app_code = numera
```

Propósito protegido:

> Recuperar y aplicar valores por cobrar manteniendo claridad sobre obligación, recaudo, saldo y diferencias.

Lifecycle:

```text
INITIAL = VPROC-0053.RECEIVABLE_REGISTERED
FINAL_NORMAL = VPROC-0053.RECEIVABLE_SETTLED
STATE_COUNT = 9
```

Superficie primaria objetivo:

```text
VSCREEN-0099 — Cuentas por cobrar y cartera
```

PULSO u otra aplicación conserva la venta o cuenta de origen; NUMERA conserva la cartera, recaudo, aplicación, diferencia, acuerdo y saldo conforme a los contratos aprobados.

---

#### 14. VPROC-0054 — costos, variaciones, cierre y rentabilidad

Identidad:

```text
process_id = VPROC-0054
origin_alias = ASIS-SRC-054
owner_app_code = numera
```

Propósito protegido:

> Producir información confiable sobre costos, asignaciones, cierres y rentabilidad para apoyar decisiones sin confundir estimaciones con hechos realizados.

Lifecycle:

```text
INITIAL = VPROC-0054.COSTING_CYCLE_OPENED
FINAL_NORMAL = VPROC-0054.COSTING_CYCLE_CLOSED
STATE_COUNT = 9
```

Superficies primarias objetivo:

```text
VSCREEN-0103
VSCREEN-0104
VSCREEN-0105
VSCREEN-0158
```

La presencia histórica de la palabra `presupuesto` dentro del nombre canónico de `VPROC-0054` no desplaza el ownership específico del ciclo presupuestal de `VPROC-0069`.

---

#### 15. VPROC-0061 — medición, análisis y mejora

Identidad:

```text
process_id = VPROC-0061
origin_alias = ASIS-SRC-061
owner_app_code = numera
```

Propósito protegido:

> Convertir mediciones y hallazgos en decisiones de mejora verificables y comprobar si produjeron el resultado esperado.

Lifecycle:

```text
INITIAL = VPROC-0061.MEASUREMENT_CYCLE_OPENED
FINAL_NORMAL = VPROC-0061.IMPROVEMENT_CYCLE_EVALUATED
STATE_COUNT = 9
```

Superficies primarias objetivo:

```text
VSCREEN-0094
VSCREEN-0106
VSCREEN-0159
```

NUMERA consolida e interpreta; las aplicaciones propietarias conservan sus hechos y métricas primarias.

---

#### 16. VPROC-0069 — presupuesto, escenario y forecast

Identidad:

```text
process_id = VPROC-0069
origin_alias = ADICIONAL-PROVISIONAL-G
owner_app_code = numera
```

Propósito protegido:

> Planear y controlar el uso de recursos financieros mediante presupuestos versionados, aprobados y comparables con consumo y proyección, sin tratarlos como hechos contables.

Lifecycle:

```text
INITIAL = VPROC-0069.BUDGET_DRAFT
FINAL_NORMAL = VPROC-0069.BUDGET_CYCLE_CLOSED
STATE_COUNT = 11
```

Superficie primaria objetivo:

```text
VSCREEN-0156 — Presupuestos, escenarios y forecast
```

Este proceso consume el contrato de escenarios de `NUMERA-DOM-018` y el catálogo final de permisos de `NUMERA-AUTH-015`.

---

#### 17. Matriz consolidada de lifecycle

| Proceso | Estado inicial | Estado final normal | Estados canónicos |
| --- | --- | --- | ---: |
| `VPROC-0010` | `PAYROLL_CYCLE_OPENED` | `PAYROLL_CYCLE_RECONCILED` | 9 |
| `VPROC-0051` | `ECONOMIC_EVENT_RECEIVED` | `ECONOMIC_EVENT_RECONCILED` | 9 |
| `VPROC-0052` | `PAYABLE_REGISTERED` | `PAYABLE_SETTLED` | 9 |
| `VPROC-0053` | `RECEIVABLE_REGISTERED` | `RECEIVABLE_SETTLED` | 9 |
| `VPROC-0054` | `COSTING_CYCLE_OPENED` | `COSTING_CYCLE_CLOSED` | 9 |
| `VPROC-0061` | `MEASUREMENT_CYCLE_OPENED` | `IMPROVEMENT_CYCLE_EVALUATED` | 9 |
| `VPROC-0069` | `BUDGET_DRAFT` | `BUDGET_CYCLE_CLOSED` | 11 |

Total de estados observados dentro de estos siete procesos:

```text
NUMERA_OWNER_PROCESS_STATE_COUNT = 65
```

La tarea no modifica estos estados ni convierte cada estado en una pantalla.

---

#### 18. Matriz de consumidores y observadores

| Proceso | Consumidores directos canónicos | Observadores/proyecciones adicionales |
| --- | --- | --- |
| `VPROC-0010` | `viso`, `anima` | ninguno declarado |
| `VPROC-0051` | `viso`, `nexo`, `fogo`, `origo`, `pulso` | `anima`, `aura`, `pass` |
| `VPROC-0052` | `origo` | `viso` |
| `VPROC-0053` | `pulso` | `viso`, `aura` |
| `VPROC-0054` | `viso`, `nexo`, `fogo`, `origo`, `pulso`, `aura` | ninguno declarado |
| `VPROC-0061` | `viso`, `nexo`, `fogo`, `origo`, `pulso`, `aura`, `pass`, `anima` | ninguno declarado |
| `VPROC-0069` | `viso`, `nexo`, `fogo`, `origo`, `pulso`, `aura` | ninguno declarado |

`consumer_app` no equivale a owner y no autoriza escritura sobre la fuente de verdad propietaria.

---

#### 19. Entradas interaplicación

El inventario reconoce como entradas o referencias, según el proceso:

- vínculo, programación, asistencia y novedades desde VISO/ANIMA para `VPROC-0010`;
- ventas, pagos, caja, devoluciones y compensaciones desde PULSO;
- órdenes, recepciones, proveedores y diferencias desde ORIGO;
- inventario, activos, movimientos y logística desde NEXO;
- lotes, consumos, rendimiento, merma y cierre productivo desde FOGO;
- campañas o señales comerciales cuando AURA sea fuente autorizada;
- identidad/fidelización cuando PASS participe sin trasladar ownership;
- decisiones y contexto gerencial desde VISO cuando corresponda.

El consumo ocurre mediante contratos y referencias aprobadas; no mediante doble captura del mismo hecho.

---

#### 20. Universo de superficies objetivo NUMERA

Los siete procesos son la fuente primaria de exactamente veinte superficies canónicas NUMERA:

| Proceso | Cantidad de superficies primarias |
| --- | ---: |
| `VPROC-0010` | 1 |
| `VPROC-0051` | 5 |
| `VPROC-0052` | 5 |
| `VPROC-0053` | 1 |
| `VPROC-0054` | 4 |
| `VPROC-0061` | 3 |
| `VPROC-0069` | 1 |
| **Total** | **20** |

No existe una superficie primaria NUMERA sin uno de estos procesos y ninguna de las veinte tiene dos procesos primarios.

---

#### 21. Inventario exacto de las veinte superficies objetivo

| Pantalla | Nombre | Proceso primario |
| --- | --- | --- |
| `VSCREEN-0094` | Inicio financiero y ejecutivo | `VPROC-0061` |
| `VSCREEN-0095` | Bandeja de hechos económicos | `VPROC-0051` |
| `VSCREEN-0096` | Registro de gasto y soporte | `VPROC-0051` |
| `VSCREEN-0097` | Bandeja de aprobaciones financieras | `VPROC-0052` |
| `VSCREEN-0098` | Cuentas por pagar y obligaciones | `VPROC-0052` |
| `VSCREEN-0099` | Cuentas por cobrar y cartera | `VPROC-0053` |
| `VSCREEN-0100` | Caja, bancos y movimientos financieros | `VPROC-0052` |
| `VSCREEN-0101` | Conciliación de ventas y pagos | `VPROC-0051` |
| `VSCREEN-0102` | Conciliación de compras y recepciones | `VPROC-0051` |
| `VSCREEN-0103` | Conciliación de inventario, producción y variaciones | `VPROC-0054` |
| `VSCREEN-0104` | Costos, rentabilidad y escenarios | `VPROC-0054` |
| `VSCREEN-0105` | Cierre, reapertura y corrección de periodo | `VPROC-0054` |
| `VSCREEN-0106` | Reportes y exportaciones financieras | `VPROC-0061` |
| `VSCREEN-0153` | Paquete laboral para pagos y beneficios | `VPROC-0010` |
| `VSCREEN-0154` | Facturas y documentos fiscales | `VPROC-0051` |
| `VSCREEN-0155` | Tesorería y programación de pagos | `VPROC-0052` |
| `VSCREEN-0156` | Presupuestos, escenarios y forecast | `VPROC-0069` |
| `VSCREEN-0157` | Impuestos y obligaciones de cumplimiento | `VPROC-0052` |
| `VSCREEN-0158` | Distribución y asignación de costos | `VPROC-0054` |
| `VSCREEN-0159` | Indicadores, análisis y planes de mejora | `VPROC-0061` |

Esta tabla es una reconciliación de bindings canónicos existentes; no crea pantallas nuevas.

---

#### 22. Pantalla primaria no equivale a único proceso relacionado

Una pantalla puede consumir procesos relacionados sin cambiar su proceso primario.

Ejemplos ya canónicos:

- `VSCREEN-0094` tiene `VPROC-0061` como primario y consume `VPROC-0051`, `VPROC-0054` y `VPROC-0069`;
- `VSCREEN-0100` tiene `VPROC-0052` como primario y consume `VPROC-0053`;
- `VSCREEN-0156` tiene `VPROC-0069` como primario y consume `VPROC-0054` y `VPROC-0061`.

Por tanto:

```text
RELATED_PROCESS != PRIMARY_PROCESS
```

---

#### 23. Línea base AS-IS

La auditoría vigente de `vento-numera` conserva:

```text
ASIS_PAGE_COUNT = 7
ASIS_STATIC_ROUTE_COUNT = 7
ASIS_DYNAMIC_ROUTE_COUNT = 0
ASIS_PROTECTED_VIEW_COUNT = 5
ASIS_PUBLIC_CONTROLLED_SURFACE_COUNT = 2
ASIS_ROUTE_HANDLER_COUNT = 0
ASIS_DECLARATIVE_NAV_ITEM_COUNT = 4
```

Las rutas físicas inventariadas son:

```text
/
/login
/no-access
/cost-centers
/expenses
/break-even
/profitability
```

---

#### 24. AS-IS no se mapea uno a uno al objetivo

Se preserva:

```text
7 ASIS PAGES
!=
7 NUMERA OWNER PROCESSES
!=
20 TARGET VSCREENS
```

No se asigna `VPROC-*` a una ruta AS-IS por semejanza nominal.

El rediseño UX posterior podrá reutilizar, reemplazar, dividir o consolidar superficies, pero deberá conservar las identidades de proceso y pantalla canónicas aplicables.

---

#### 25. Implementación parcial no implica proceso completo

La existencia actual de:

- centros de costo;
- gastos;
- punto de equilibrio;
- rentabilidad;
- panel económico inicial;

no demuestra que alguno de los siete procesos esté completo de extremo a extremo.

Se preserva:

```text
PAGE_EXISTS != PROCESS_COMPLETE
FORM_EXISTS != PROCESS_COMPLETE
SERVER_ACTION_EXISTS != PROCESS_COMPLETE
PERMISSION_EXISTS != PROCESS_COMPLETE
```

---

#### 26. Reconciliación de VPROC-0054 y VPROC-0069

Existe una cercanía histórica entre costos/presupuesto y el ciclo presupuestal.

La frontera vigente queda:

```text
VPROC-0054 = costos + distribución + variaciones + cierre + rentabilidad
VPROC-0069 = versión presupuestal + supuestos + aprobación + vigencia + consumo + forecast + escenario + desviación
```

`VPROC-0054` puede consumir presupuesto como referencia o dimensión analítica; no gobierna por ello el lifecycle completo de `VPROC-0069`.

---

#### 27. Reconciliación de VPROC-0010 y VPROC-0052

Ambos pueden terminar relacionados con pagos, pero no son duplicados.

```text
VPROC-0010 = paquete económico laboral autorizado y conciliado
VPROC-0052 = obligación financiera general, aprobación, pago y conciliación
```

La fuente laboral sigue en VISO/ANIMA; una obligación comercial con proveedor no se transforma en nómina por utilizar tesorería.

---

#### 28. Reconciliación de VPROC-0051 y procesos operativos

`VPROC-0051` no compite con:

- venta de PULSO;
- recepción de ORIGO;
- movimiento de NEXO;
- producción de FOGO.

Su resultado es el efecto económico correlacionado y conciliado.

```text
SOURCE_PROCESS_FACT
!=
NUMERA_ECONOMIC_FACT
```

La relación debe conservar identidad de origen y evitar doble registro.

---

#### 29. Reconciliación de VPROC-0053 y PULSO

PULSO conserva la decisión y el hecho comercial de venta/pago relacionado con el pedido.

NUMERA conserva:

- cuenta por cobrar;
- vencimiento;
- recaudo;
- aplicación;
- saldo;
- acuerdo;
- disputa;
- castigo autorizado;
- exposición y decisiones de crédito cuando correspondan.

No se crea una venta paralela en NUMERA.

---

#### 30. Reconciliación de VPROC-0061 y métricas de origen

`VPROC-0061` puede consumir métricas de todas las aplicaciones, pero no se apropia de su hecho primario.

Se conserva:

```text
SOURCE_METRIC_OWNERSHIP = SOURCE_APP
CROSS_DOMAIN_ANALYTIC_INTERPRETATION = NUMERA_WHEN_GOVERNED_BY_VPROC_0061
```

La conclusión analítica debe conservar fuente, periodo, población, método y limitaciones.

---

#### 31. Reconciliación de VPROC-0069 y hechos reales

Presupuesto, forecast y escenario permanecen separados de hechos realizados.

```text
BUDGET != FORECAST != SCENARIO != REAL
PUBLISHED_SCENARIO != ACCOUNTING_FACT
PUBLISHED_PRICE_VERSION != OPERATIONAL_ACTIVE_PRICE
```

La experiencia futura deberá representar esas diferencias sin inventar un proceso adicional.

---

#### 32. Frontera con autorización

El inventario consume el universo final de autorización NUMERA:

```text
NUMERA_TARGET_CAPABILITY_COUNT_AFTER_015 = 125
```

Pero:

```text
PROCESS_ID != PERMISSION_CODE
SCREEN_VISIBILITY != ACTION_AUTHORITY
PROCESS_PARTICIPATION != GRANT
```

Cada acción posterior deberá usar el permiso exacto aprobado y revalidado server-side conforme al recurso, scope y estado actual.

---

#### 33. Frontera con scopes

Un mismo proceso puede aparecer en múltiples entidades, sedes, centros, contrapartes, periodos o recursos.

El inventario no crea variantes de proceso por scope.

```text
VPROC_IDENTITY_IS_STABLE_ACROSS_SCOPE = YES
SCOPE_CREATES_NEW_PROCESS_ID = NO
```

La experiencia de filtrado y contexto queda en `NUMERA-UX-013` y contratos transversales aplicables.

---

#### 34. Frontera con actores y personas

Los siete procesos tienen actores canónicos ya modelados, incluyendo según el caso:

- responsable financiero;
- responsable analítico;
- responsable del proceso;
- responsable de personas;
- responsable de compras;
- responsable comercial;
- coordinación de operaciones;
- gerencia general;
- gobierno y propiedad;
- contraparte o proveedor externo cuando corresponda.

Esta tarea no diseña vistas por persona.

La experiencia por rol queda reservada a:

```text
NUMERA-UX-003
NUMERA-UX-004
NUMERA-UX-005
NUMERA-UX-006
NUMERA-UX-007
```

---

#### 35. Lectura ejecutiva y operación

El inventario demuestra que el mismo universo contiene:

- lectura y monitoreo;
- registro y captura;
- aprobación;
- ejecución financiera;
- conciliación;
- cierre;
- análisis;
- publicación;
- planificación.

No decide todavía cómo separar esas experiencias.

Esa decisión pertenece a:

```text
NUMERA-UX-002 — Separar lectura ejecutiva y operación contable
```

---

#### 36. Inventario de procesos frente a pasos de pantalla

Las veinte pantallas ya poseen bindings a pasos canónicos como:

- `TRIAGE`;
- `CAPTURE`;
- `APPROVE`;
- `EXECUTE`;
- `RECONCILE`;
- `ANALYZE`;
- `CLOSE`;
- `PUBLISH`;
- `PLAN`.

La clase de paso no reemplaza el lifecycle del proceso.

```text
SCREEN_STEP_CLASS != PROCESS_STATE
```

---

#### 37. Inventario de inicio y final normal

El UX posterior deberá respetar que cada proceso ya tiene un inicio y un final normal explícitos.

No podrá:

- presentar un proceso como completo en un estado intermedio;
- convertir un `view` en transición de estado;
- cerrar por mera ausencia de pendientes visibles;
- usar un estado UI local como estado empresarial definitivo;
- borrar el historial al alcanzar el final normal.

---

#### 38. Resultados inciertos y conciliación

En procesos que dependan de terceros o movimientos externos:

```text
RESULT_UNKNOWN != SUCCESS
RESULT_UNKNOWN != FAILURE_FINAL
```

Debe existir consulta, evidencia o conciliación antes de afirmar el resultado.

Esto aplica especialmente a pagos, recaudos, bancos e integraciones externas.

---

#### 39. Idempotencia del inventario

El mismo `VPROC-*` debe aparecer una sola vez como proceso propietario NUMERA.

Una superficie adicional, un nuevo consumer o una nueva ruta no duplican el proceso.

```text
PROCESS_DUPLICATION_BY_SURFACE = FORBIDDEN
PROCESS_DUPLICATION_BY_CHANNEL = FORBIDDEN
PROCESS_DUPLICATION_BY_ROLE = FORBIDDEN
PROCESS_DUPLICATION_BY_SCOPE = FORBIDDEN
```

---

#### 40. Ausencia de procesos faltantes

La reconciliación entre ownership, propósito, estados y pantallas demuestra:

```text
EXPECTED_NUMERA_OWNER_PROCESSES = 7
FOUND_NUMERA_OWNER_PROCESSES = 7
MISSING = 0
DUPLICATE = 0
UNKNOWN_OWNER = 0
```

No se crea `VPROC-0070` ni otro identificador nuevo.

---

#### 41. Cobertura exacta de pantallas

La suma de bindings primarios es:

```text
1 + 5 + 5 + 1 + 4 + 3 + 1 = 20
```

Y se conserva:

```text
TARGET_NUMERA_SCREENS = 20
SCREENS_WITH_NUMERA_OWNER_PROCESS = 20
SCREENS_WITH_MISSING_PRIMARY_PROCESS = 0
SCREENS_WITH_DUPLICATE_PRIMARY_PROCESS = 0
```

---

#### 42. Cobertura AS-IS

La línea base física AS-IS continúa siendo una implementación parcial.

Esta tarea no declara equivalencias uno a uno entre:

```text
NUMERA-ROUTE-001..007
```

y:

```text
VSCREEN-0094..0106
VSCREEN-0153..0159
```

La materialización objetivo se resolverá en paquetes y unidades de implementación posteriores.

---

#### 43. Procesos externos que NUMERA no debe absorber

El inventario reconoce participación financiera sin cambiar ownership de, entre otros:

- `VPROC-0043` cobro y confirmación de pago en PULSO;
- `VPROC-0044` cierre de caja en PULSO;
- `VPROC-0022` recepción comercial en ORIGO;
- `VPROC-0024..0028` movimientos y abastecimiento en NEXO;
- `VPROC-0033..0037` planificación y ejecución productiva en FOGO;
- procesos laborales de VISO/ANIMA que alimentan `VPROC-0010`.

NUMERA consume su efecto, evidencia o proyección; no los renumera ni replica.

---

#### 44. Hechos operativos y doble captura

Se preserva:

```text
OPERATIONAL_SOURCE_FACT = SOURCE_APP_AUTHORITY
NUMERA_ECONOMIC_EFFECT = CORRELATED_REFERENCE
MANUAL_DUPLICATE_SOURCE_FACT = FORBIDDEN
```

La UX de ingestión y conciliación deberá preferir eventos o referencias canónicas cuando existan.

La resolución detallada se mantiene en `NUMERA-UX-014` y `NUMERA-UX-015`.

---

#### 45. Proyección ejecutiva

`VPROC-0061` puede proyectar indicadores de otros procesos y `VSCREEN-0094` puede consolidar información de `VPROC-0051`, `VPROC-0054` y `VPROC-0069`.

Esa proyección no crea un proceso ejecutivo adicional.

La experiencia ejecutiva específica será desarrollada por `NUMERA-UX-003..008`.

---

#### 46. Operación financiera

Las superficies de registro, aprobación, tesorería, cartera, conciliación y cierre pertenecen a los procesos ya inventariados.

No se crea un proceso genérico `FINANCE_OPERATIONS` que fusione:

```text
VPROC-0051
VPROC-0052
VPROC-0053
VPROC-0054
```

Cada uno conserva propósito, lifecycle y evidencia propios.

---

#### 47. Analítica

La analítica aparece en dos niveles distintos:

1. analítica interna al proceso financiero, como costo, rentabilidad o desviación;
2. `VPROC-0061` como ciclo explícito de medición, análisis, decisión de mejora y evaluación.

Un gráfico o KPI no crea un proceso por sí solo.

---

#### 48. Planificación

La planificación financiera objetivo usa `VPROC-0069` para presupuesto, forecast y escenarios.

Los supuestos o resultados simulados pueden consumir costos, hechos e indicadores, pero no modifican automáticamente `VPROC-0051`, `VPROC-0054` ni las fuentes operativas.

---

#### 49. Trazabilidad hacia tareas UX posteriores

El inventario entrega referencias primarias de trabajo, sin desarrollar esas tareas:

| Alcance posterior | Proceso(s) principal(es) de referencia |
| --- | --- |
| lectura ejecutiva vs operación | los siete procesos |
| inicios por perfil | `VPROC-0061`, con drill-down a los demás procesos autorizados |
| registro de gasto | `VPROC-0051` |
| aprobación financiera | `VPROC-0052`, sin absorber decisiones especializadas de otros procesos |
| cierre/reapertura | `VPROC-0054` |
| exportación financiera | `VPROC-0061` y recurso autorizado |
| eventos y no duplicación | `VPROC-0051` + procesos fuente |
| conciliación ventas/pagos | `VPROC-0051` |
| conciliación compras/recepciones | `VPROC-0051` + `VPROC-0052` |
| conciliación inventario/producción | `VPROC-0054` |
| cuentas por pagar | `VPROC-0052` |
| caja y bancos | `VPROC-0052`, con relaciones a `VPROC-0053` |
| costos y rentabilidad | `VPROC-0054` |
| cartera | `VPROC-0053` |
| extensión contable/fiscal | `VPROC-0051` y obligaciones relacionadas, sin crear contabilidad por inferencia |
| visor económico dinámico | `VPROC-0054`, `VPROC-0061`, `VPROC-0069` y referencias autorizadas |

---

#### 50. No diseño prematuro

Esta tarea no define todavía:

- jerarquía visual;
- layout;
- navegación definitiva;
- densidad de tablas;
- tarjetas KPI;
- responsive behavior;
- copy final;
- componentes React;
- estados visuales de error;
- filtros concretos;
- shortcuts;
- preferencias de dashboard;
- orden de widgets;
- home por rol.

Esas decisiones pertenecen a las tareas UX sucesivas.

---

#### 51. Estado de autorización consumido

El inventario no confunde proceso con autoridad.

Las acciones objetivo deben consumir permisos de `NUMERA-AUTH-001..015`.

En particular, las acciones de planificación de `VPROC-0069` permanecen separadas por recurso y acción, y las autoridades especializadas de cartera, bancos, acuerdos y castigos continúan bajo el registro de `NUMERA-AUTH-014`.

---

#### 52. Estado de implementación

El inventario objetivo se clasifica como:

```text
CANONICAL_PROCESS_INVENTORY = DEFINED
CANONICAL_SCREEN_BINDINGS = DEFINED
ASIS_RUNTIME_COVERAGE = PARTIAL
TARGET_UX_MATERIALIZATION = PENDING
PHYSICAL_CHANGE_IN_THIS_TASK = NONE
```

No se eleva una implementación parcial a cobertura completa por documentación.

---

#### 53. Hallazgos y propietarios de salida

| Hallazgo | Bloquea esta tarea | Propietario posterior | Condición de salida |
| --- | --- | --- | --- |
| siete páginas AS-IS no cubren veinte superficies objetivo | no | `NUMERA-UX-002..028` + paquetes de implementación NUMERA | diseños aprobados y materialización posterior cubren superficies requeridas sin inferir equivalencia 1:1 |
| lectura ejecutiva y operación aún comparten universo sin separación UX final | no | `NUMERA-UX-002` | contrato de separación aprobado |
| experiencia por rol no diseñada | no | `NUMERA-UX-003..007` | cada perfil recibe superficie y autoridad coherentes sin duplicar procesos |
| navegación y home objetivo aún no resueltos | no | `NUMERA-UX-002..008` | arquitectura UX distingue lectura, operación y drill-down |
| procesos fuente continúan distribuidos entre aplicaciones | no | `NUMERA-UX-014..015` + contratos de integración | eventos y referencias evitan captura duplicada y preservan ownership |
| superficies de conciliación específicas aún no diseñadas | no | `NUMERA-UX-017..019` | cada flujo conserva fuentes, diferencias, decisión y evidencia |
| cartera objetivo aún no diseñada en UX | no | `NUMERA-UX-026` | vencimientos, recaudos, aplicaciones, acuerdos y cobranza consumen `VPROC-0053` y autorización especializada |
| visor económico dinámico aún no diseñado | no | `NUMERA-UX-028` | una superficie comparativa representa real, presupuesto, forecast, escenario y publicación sin mezclar categorías |

No se crea una tarea administrativa adicional.

---

#### 54. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos descartados: 0
Requisitos obsoletos: 0
```

La tarea inventaría y reconcilia identidades, ownership, lifecycle, superficies y fronteras ya protegidas por requisitos vigentes; no cambia su regla, estado ni destino.

---

#### 55. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-NUMERA-001` — trazabilidad financiera hasta hechos y fuentes;
- `TREQ-NUMERA-002` — identidad económica, dimensiones, periodos y correcciones no destructivas;
- `TREQ-NUMERA-003` — obligaciones, cartera, bancos, tesorería y separación de autoridades;
- `TREQ-NUMERA-004` — costos, presupuestos, forecast, escenarios, rentabilidad y separación de categorías;
- `TREQ-NUMERA-005` a `TREQ-NUMERA-024` — inventario AS-IS, rutas, protección, permisos observados y control de drift;
- `TREQ-PROC-001` — una superficie aislada no demuestra proceso completo;
- `TREQ-PROC-009` a `TREQ-PROC-013` — identidad estable y no reutilizable de `VPROC-*`;
- `TREQ-PROC-014` a `TREQ-PROC-017` — propósito único, independencia técnica, no duplicidad semántica y trazabilidad del contrato posterior;
- `TREQ-AUTH-013` — autorización server-side para mutaciones protegidas;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones sensibles;
- `TREQ-INTEGRATION-006` y `TREQ-INTEGRATION-017` — ownership de datos e integración versionada/idempotente sin doble fuente.

No corresponde actualizar el Registro 04A.

---

#### 56. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea es documental y no se ejecutó build de producto durante su preparación. |
| LOCAL | NOT_EXECUTED | No se abrió ni modificó el checkout local del usuario durante la preparación adelantada. |
| REMOTA | PASS | Se verificaron `main`, owner UX, topología, catálogo de procesos, ownership, consumidores, contratos de estados, bindings de veinte pantallas, auditoría AS-IS NUMERA, 04A NUMERA y scripts documentales vigentes; `NUMERA-AUTH-015` continúa pendiente de publicación y se consumió su artefacto completo aprobado como base inmediata. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron pagos, conciliaciones, cierres, cartera, presupuestos, escenarios ni decisiones reales. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no materializa UI, código, datos ni infraestructura. |

---

#### 57. Criterios de aceptación

La tarea queda aceptada cuando se demuestre documentalmente que:

1. existen exactamente siete procesos con `owner_app_code = numera`;
2. los siete IDs son `VPROC-0010`, `VPROC-0051`, `VPROC-0052`, `VPROC-0053`, `VPROC-0054`, `VPROC-0061` y `VPROC-0069`;
3. no falta ningún proceso NUMERA del registro de ownership;
4. no existe un proceso duplicado;
5. cada proceso conserva su alias histórico;
6. cada proceso conserva su nombre y propósito canónicos;
7. ownership y consumer se mantienen separados;
8. NUMERA no absorbe hechos operativos propietarios de otras aplicaciones;
9. cada proceso conserva estado inicial y final normal;
10. `VPROC-0010..0061` inventariados aquí tienen nueve estados cada uno salvo `VPROC-0069`, que tiene once;
11. el total de estados observados del universo inventariado es 65;
12. existen exactamente veinte superficies objetivo NUMERA vinculadas primariamente a estos procesos;
13. las veinte superficies tienen un proceso primario válido;
14. ninguna de las veinte tiene dos procesos primarios;
15. la distribución de superficies es `1/5/5/1/4/3/1` para los siete procesos en el orden del inventario;
16. siete páginas AS-IS no se confunden con siete procesos;
17. veinte pantallas objetivo no se confunden con siete páginas AS-IS;
18. no se infiere `VPROC-*` desde una ruta física;
19. no se infiere implementación completa desde una pantalla o formulario;
20. `VPROC-0054` y `VPROC-0069` conservan fronteras distintas;
21. `VPROC-0010` y `VPROC-0052` conservan fronteras distintas;
22. `VPROC-0051` no recrea venta, recepción, inventario o producción;
23. `VPROC-0053` no recrea venta PULSO;
24. `VPROC-0061` no se apropia de métricas fuente por analizarlas;
25. `VPROC-0069` no convierte presupuesto, forecast o escenario en hecho real;
26. proceso y permiso permanecen separados;
27. pantalla visible no implica autoridad de acción;
28. scope no crea un nuevo proceso;
29. rol no crea un nuevo proceso;
30. canal no crea un nuevo proceso;
31. consumidor no se vuelve owner por consumir datos o eventos;
32. las veinte pantallas conservan sus identidades canónicas;
33. la línea base AS-IS conserva siete páginas, cinco protegidas y dos públicas controladas;
34. la línea base conserva cero route handlers App Router;
35. las tareas UX posteriores reciben owners explícitos para brechas detectadas;
36. `NUMERA-UX-002` recibe el universo exacto para separar lectura ejecutiva y operación;
37. no se crean ni modifican requisitos de prueba;
38. no se modifica Registro 04A;
39. no se ejecutan cambios físicos;
40. el inventario puede reproducirse desde fuentes canónicas sin depender de nombres de rutas AS-IS.

---

#### 58. Límites

Esta tarea no:

- crea procesos `VPROC-*`;
- renumera procesos;
- cambia ownership;
- cambia propósitos;
- cambia consumidores;
- modifica estados o transiciones;
- diseña layouts;
- diseña home por rol;
- define navegación final;
- modifica pantallas;
- modifica rutas;
- cambia permisos;
- crea grants;
- materializa las 125 capacidades objetivo;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- cambia integraciones;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-002`.

---

#### 59. Handoff a NUMERA-UX-002

La siguiente tarea recibe:

```text
NUMERA_PROCESS_INVENTORY = NUMERA-FINANCIAL-ANALYTICAL-PROCESS-INVENTORY-001
NUMERA_OWNER_PROCESS_COUNT = 7
NUMERA_OWNER_PROCESS_IDS = VPROC-0010|VPROC-0051|VPROC-0052|VPROC-0053|VPROC-0054|VPROC-0061|VPROC-0069
NUMERA_OWNER_PROCESS_STATE_COUNT = 65
NUMERA_CANONICAL_TARGET_SCREEN_COUNT = 20
NUMERA_TARGET_SCREEN_DISTRIBUTION = 1|5|5|1|4|3|1
NUMERA_ASIS_PAGE_COUNT = 7
NUMERA_ASIS_PROTECTED_PAGE_COUNT = 5
NUMERA_ASIS_PUBLIC_CONTROLLED_PAGE_COUNT = 2
NUMERA_ASIS_ROUTE_HANDLER_COUNT = 0
NUMERA_ASIS_TO_TARGET_SCREEN_CARDINALITY_IS_ONE_TO_ONE = NO
PROCESS_ID_IS_ROUTE = NO
PROCESS_ID_IS_SCREEN = NO
PROCESS_ID_IS_PERMISSION = NO
PAGE_EXISTS_IMPLIES_PROCESS_COMPLETE = NO
SOURCE_APP_FACT_OWNERSHIP_PRESERVED = YES
NUMERA_RECREATES_SOURCE_OPERATION = NO
NUMERA_TARGET_CAPABILITY_COUNT_AFTER_015 = 125
NUMERA_AUTHORIZATION_MINIBLOCK_CLOSED = YES
UX_002_OWNER = EXECUTIVE_READ_VS_ACCOUNTING_OPERATION_SEPARATION
TREQ_CHANGES = 0
```

`NUMERA-UX-002` deberá separar lectura ejecutiva y operación contable sobre este universo exacto, sin crear procesos paralelos, sin inferir autoridad desde visibilidad y sin convertir la cardinalidad de páginas AS-IS en arquitectura objetivo.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUTH-015 — Definir permisos para crear, compartir, aprobar y publicar escenarios, precios y presupuestos`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-001 — Inventariar procesos financieros y analíticos`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-002 — Separar lectura ejecutiva y operación contable`
### ✅ NUMERA-UX-002 — Separar lectura ejecutiva y operación contable

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-001 — Inventariar procesos financieros y analíticos
**Tarea siguiente:** NUMERA-UX-003 — Diseñar inicio para propietario
**Tipo de tarea:** definición documental de la separación UX entre consulta ejecutiva/analítica y ejecución financiera-contable dentro de NUMERA, aplicando lectura mínima, permisos explícitos por acción, reautorización al pasar de observación a comando y fronteras por recurso, alcance, sensibilidad y estado sin diseñar todavía los inicios por rol; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes, permisos, roles, grants, paquetes, procesos, estados, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, reportes, pagos, conciliaciones, cierres, presupuestos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Separar de forma canónica la experiencia de **lectura ejecutiva y analítica** de la experiencia de **operación financiera-contable** de NUMERA para impedir que ver una cifra, una tarjeta, un reporte, una fila, una alerta o una pantalla sea interpretado como autoridad para registrar, aprobar, pagar, conciliar, cerrar, reabrir, castigar, exportar, publicar o ejecutar cualquier otro efecto.

La tarea debe dejar una frontera UX reutilizable por `NUMERA-UX-003..007` y por los flujos posteriores del minibloque.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato documental reusable;
- no crea instancia física propia;
- no materializa una ruta ejecutiva ni una ruta contable;
- no materializa permisos;
- no asigna capacidades por nombre de rol;
- no modifica `vento-numera`;
- no modifica Supabase;
- no produce side effects financieros reales.

---

#### 3. Handoff recibido de NUMERA-UX-001

La predecesora aprobada entrega:

```text
NUMERA_PROCESS_INVENTORY = NUMERA-FINANCIAL-ANALYTICAL-PROCESS-INVENTORY-001
NUMERA_OWNER_PROCESS_COUNT = 7
NUMERA_OWNER_PROCESS_IDS = VPROC-0010|VPROC-0051|VPROC-0052|VPROC-0053|VPROC-0054|VPROC-0061|VPROC-0069
NUMERA_OWNER_PROCESS_STATE_COUNT = 65
NUMERA_CANONICAL_TARGET_SCREEN_COUNT = 20
NUMERA_TARGET_SCREEN_DISTRIBUTION = 1|5|5|1|4|3|1
NUMERA_ASIS_PAGE_COUNT = 7
NUMERA_ASIS_PROTECTED_PAGE_COUNT = 5
NUMERA_ASIS_PUBLIC_CONTROLLED_PAGE_COUNT = 2
NUMERA_ASIS_ROUTE_HANDLER_COUNT = 0
NUMERA_ASIS_TO_TARGET_SCREEN_CARDINALITY_IS_ONE_TO_ONE = NO
PROCESS_ID_IS_ROUTE = NO
PROCESS_ID_IS_SCREEN = NO
PROCESS_ID_IS_PERMISSION = NO
PAGE_EXISTS_IMPLIES_PROCESS_COMPLETE = NO
SOURCE_APP_FACT_OWNERSHIP_PRESERVED = YES
NUMERA_RECREATES_SOURCE_OPERATION = NO
NUMERA_TARGET_CAPABILITY_COUNT_AFTER_015 = 125
NUMERA_AUTHORIZATION_MINIBLOCK_CLOSED = YES
UX_002_OWNER = EXECUTIVE_READ_VS_ACCOUNTING_OPERATION_SEPARATION
TREQ_CHANGES = 0
```

La 002 no reabre el inventario. Consume exactamente siete procesos y veinte pantallas objetivo.

---

#### 4. Contratos de autorización consumidos

Se preserva el catálogo financiero aprobado hasta `NUMERA-AUTH-015`.

Antes de `NUMERA-AUTH-014` existían:

```text
APP_ENTRY = 1
READ = 22
OTHER_NON_READ = 34
TOTAL = 57
```

`NUMERA-AUTH-014` añadió treinta y seis capacidades especializadas, de las cuales seis son lecturas sensibles:

```text
SENSITIVE_READ = 6
OTHER_SPECIALIZED_NON_READ = 30
```

`NUMERA-AUTH-015` añadió treinta y dos capacidades de planificación, todas distintas de la lectura ya existente.

Por tanto, el universo final queda:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_APP_ENTRY_COUNT = 1
NUMERA_READ_PERMISSION_COUNT = 28
NUMERA_NON_READ_CAPABILITY_COUNT = 96
1 + 28 + 96 = 125
```

Este conteo clasifica capacidades por su semántica contractual; no implica que estén materializadas físicamente.

---

#### 5. Contrato producido

La tarea define:

```text
NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
```

con dos planos UX:

```text
EXECUTIVE_READ_PLANE
FINANCIAL_COMMAND_PLANE
```

`FINANCIAL_COMMAND_PLANE` es la formalización técnica de la "operación contable" del título. Incluye comandos financieros, contables, de conciliación, tesorería, cierre, salida y planificación cuando produzcan efecto; no significa que toda acción genere asiento contable.

---

#### 6. Invariante principal

Se congela:

```text
SEE != DO
READ != MUTATE
READ != APPROVE
READ != PAY_EXECUTE
READ != RECONCILE
READ != CLOSE
READ != REOPEN
READ != WRITE_OFF
READ != EXPORT
READ != SCENARIO_CREATE
READ != SCENARIO_SHARE
READ != SCENARIO_APPROVE
READ != SCENARIO_PUBLISH
```

La interfaz nunca puede ampliar estas relaciones por conveniencia visual.

---

#### 7. `numera.access` no es lectura financiera

Se conserva:

```text
numera.access
!= metric authority
!= report authority
!= sensitive financial read
!= command authority
```

Entrar a NUMERA habilita la aplicación, no los datos ni las acciones internas.

---

#### 8. Definición de `EXECUTIVE_READ_PLANE`

`EXECUTIVE_READ_PLANE` es una proyección sin side effects destinada a presentar información financiera o analítica ya autorizada.

Puede contener, según los permisos efectivos:

- indicadores;
- alertas;
- saldos y posiciones;
- cierres y estados de periodo;
- presupuestos y forecast;
- desviaciones;
- costos y rentabilidad;
- estado de cartera u obligaciones;
- estado de conciliación;
- reportes y análisis;
- drill-down autorizado.

No contiene autoridad de comando por su sola presentación.

---

#### 9. Definición de `FINANCIAL_COMMAND_PLANE`

`FINANCIAL_COMMAND_PLANE` agrupa toda interacción que pueda producir un efecto financiero, contable, decisorio, de salida o de planificación.

Incluye, según el permiso exacto:

- registrar o actualizar;
- aprobar o rechazar;
- pagar o emitir instrucción;
- aplicar o revertir;
- conciliar o revertir conciliación;
- cerrar o reabrir;
- castigar o condonar;
- importar;
- exportar;
- resolver excepciones;
- crear, actualizar, compartir, solicitar, aprobar, rechazar, publicar o retirar versiones de planificación.

La existencia del plano no concede ninguna de estas capacidades.

---

#### 10. El plano de operación no equivale a contexto operativo de turno

La palabra "operación" en esta tarea describe comandos financieros de NUMERA.

No se interpreta como el carril de rol operativo temporal de Vento OS.

Se conserva:

```text
ADMIN_SHIFT_REQUIRED = NO
ADMIN_CHECKIN_REQUIRED = NO
```

cuando el contrato financiero aplicable ya definió una acción administrativa independiente del turno.

Esto no elimina requisitos de contexto, recurso, empresa, sede, centro, periodo o estado cuando correspondan.

---

#### 11. Cobertura sobre las veinte pantallas objetivo

Los bindings de autorización aprobados exigen `READ` en las veinte pantallas canónicas NUMERA.

Se define:

```text
TARGET_SCREEN_COUNT = 20
READ_PROJECTION_CAPABLE_SCREEN_COUNT = 20
PURE_READ_ONLY_TARGET_SCREEN_COUNT = 1
COMMAND_CAPABLE_TARGET_SCREEN_COUNT = 19
MISSING_SCREEN_CLASSIFICATION_COUNT = 0
DUPLICATE_PRIMARY_SCREEN_COUNT = 0
```

La única superficie cuyo binding no exige ningún slot de comando es `VSCREEN-0094`.

---

#### 12. Matriz canónica de separación por pantalla

| Pantalla | Paso dominante | Plano de lectura | Plano de comando | Clasificación UX 002 |
| --- | --- | --- | --- | --- |
| `VSCREEN-0094` Inicio financiero y ejecutivo | `MONITOR` | sí | no | `EXECUTIVE_READ_ONLY` |
| `VSCREEN-0095` Bandeja de hechos económicos | `TRIAGE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0096` Registro de gasto y soporte | `CAPTURE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0097` Bandeja de aprobaciones financieras | `APPROVE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0098` Cuentas por pagar y obligaciones | `EXECUTE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0099` Cuentas por cobrar y cartera | `EXECUTE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0100` Caja, bancos y movimientos financieros | `EXECUTE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0101` Conciliación de ventas y pagos | `RECONCILE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0102` Conciliación de compras y recepciones | `RECONCILE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0103` Conciliación de inventario, producción y variaciones | `RECONCILE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0104` Costos, rentabilidad y escenarios | `ANALYZE` | sí | sí, cuando exista acción especializada | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0105` Cierre, reapertura y corrección de periodo | `CLOSE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0106` Reportes y exportaciones financieras | `PUBLISH` | sí | sí, para exportación/publicación aplicable | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0153` Paquete laboral para pagos y beneficios | `RECONCILE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0154` Facturas y documentos fiscales | `EXECUTE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0155` Tesorería y programación de pagos | `PLAN` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0156` Presupuestos, escenarios y forecast | `PLAN` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0157` Impuestos y obligaciones de cumplimiento | `EXECUTE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0158` Distribución y asignación de costos | `EXECUTE` | sí | sí | `READ_PLUS_FINANCIAL_COMMAND` |
| `VSCREEN-0159` Indicadores, análisis y planes de mejora | `ANALYZE` | sí | sí, cuando exista decisión material | `READ_PLUS_FINANCIAL_COMMAND` |

La matriz no crea pantallas nuevas ni modifica el binding de procesos.

---

#### 13. Pantalla dual no significa permiso dual

Una pantalla `READ_PLUS_FINANCIAL_COMMAND` puede compartir identidad funcional y contexto visual, pero debe resolver dos decisiones de autorización distintas.

```text
CAN_READ_RESOURCE = YES
CAN_EXECUTE_COMMAND = EVALUATE_INDEPENDENTLY
```

No se permite:

```text
CAN_READ_RESOURCE = YES
=> CAN_EXECUTE_COMMAND = YES
```

---

#### 14. Entrada por lectura y transición a comando

Cuando una experiencia de lectura ofrezca una transición hacia una acción material:

1. la lectura conserva su estado sin side effect;
2. el usuario expresa intención mediante una acción explícita;
3. la aplicación identifica el comando empresarial exacto;
4. revalida permiso, recurso, scope, sensibilidad, versión y estado actual;
5. presenta únicamente los campos necesarios para ese comando;
6. solicita confirmación reforzada cuando el efecto lo exige;
7. ejecuta el comando una sola vez;
8. devuelve un resultado verificable o un estado incierto gobernado.

El paso 4 ocurre server-side en el punto de efecto.

---

#### 15. Volver de operación a lectura

Regresar al plano de lectura:

- no ejecuta el comando pendiente;
- no conserva un side effect parcial silencioso;
- no convierte un borrador local en verdad financiera;
- no asume éxito por haber visitado la superficie de operación.

Un cambio ya confirmado se refleja después desde la fuente autorizada.

---

#### 16. Lectura ejecutiva por agregados

Los agregados ejecutivos deben obedecer:

```text
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

Una cifra agregada no puede utilizar registros fuera del alcance efectivo del actor si el resultado permite inferirlos de forma no autorizada.

La agregación no crea bypass de:

- empresa;
- sede;
- centro de costo;
- recurso;
- sensibilidad;
- finalidad.

---

#### 17. Drill-down ejecutivo

Cada drill-down:

- conserva la identidad de la métrica de origen;
- declara el recurso destino;
- vuelve a resolver `READ` del destino;
- aplica scope y sensibilidad del recurso destino;
- no hereda por defecto el permiso del indicador agregado;
- no muestra comandos por inferencia.

---

#### 18. Lectura sensible

Los seis permisos de lectura sensible definidos por `NUMERA-AUTH-014` permanecen independientes de las veintidós lecturas previas.

Por tanto:

```text
ORDINARY_READ
!= SENSITIVE_DETAIL_READ
```

La lectura ejecutiva debe preferir minimización, masking, omisión o agregado cuando el detalle sensible no sea necesario ni esté autorizado.

---

#### 19. Lectura no equivale a exportación

Se conserva:

```text
VIEW != EXPORT
REPORT_VIEW_IMPLIES_EXPORT = NO
```

Un actor que puede consultar un reporte no obtiene por ello capacidad de extraerlo fuera de la superficie de consulta.

`VSCREEN-0106` debe separar ambas decisiones.

---

#### 20. Lectura no equivale a publicación

Se conserva:

```text
VIEW != PUBLISH
PUBLISH != EXPORT
```

Mostrar una versión publicada tampoco concede autoridad para publicar una nueva versión.

---

#### 21. Lectura no equivale a aprobación

Una tarjeta ejecutiva puede mostrar:

- pendiente de aprobación;
- aprobado;
- rechazado;
- vencido;
- con excepción;

sin que ese estado otorgue al actor autoridad para decidirlo.

La aprobación se resuelve con su permiso exacto y estado vigente.

---

#### 22. Lectura no equivale a conciliación

Mostrar una diferencia, un match sugerido o un residual no autoriza resolver la conciliación.

Se conserva:

```text
MATCH_SUGGESTED != MATCH_APPROVED
READ != RECONCILE
```

La decisión debe permanecer en `FINANCIAL_COMMAND_PLANE`.

---

#### 23. Lectura no equivale a pago

Mostrar:

- obligación vencida;
- lote preparado;
- posición de tesorería;
- instrucción enviada;
- movimiento observado;

no autoriza ejecutar un pago ni declarar que fue confirmado.

```text
READ != APPROVE != PAY_EXECUTE != RECONCILE
```

---

#### 24. Lectura no equivale a cierre o reapertura

Un estado de periodo visible no concede:

- cierre;
- reapertura;
- corrección;
- modificación retroactiva.

`VSCREEN-0105` conserva comandos separados por semántica.

---

#### 25. Lectura de cartera no equivale a acción de cobro

Se conserva:

```text
RECEIVABLES_VIEW
!= SENSITIVE_DETAIL_VIEW
!= COLLECTION_INTERACTION
!= AGREEMENT
!= APPLICATION
!= WRITE_OFF
!= FORGIVENESS
```

La lectura ejecutiva puede resumir exposición, vencimiento o tendencia dentro del scope, sin habilitar decisiones crediticias o de cobranza.

---

#### 26. Lectura bancaria no equivale a ejecución bancaria

Se conserva:

```text
BANK_ACCOUNT_VIEW
!= BANK_SENSITIVE_DETAIL_VIEW
!= STATEMENT_IMPORT
!= TREASURY_PAYMENT_INSTRUCTION
!= RECONCILIATION_RESOLUTION
```

Credenciales y secretos bancarios permanecen fuera de ambos planos UX financieros ordinarios.

---

#### 27. Lectura de planificación no equivale a mutación

Las lecturas canónicas de:

- escenarios;
- presupuestos;
- forecast;
- versiones de precio;

no conceden ninguna de las ocho acciones mutantes definidas en `NUMERA-AUTH-015`.

```text
VIEW
!= CREATE
!= UPDATE
!= SHARE
!= REQUEST
!= APPROVE
!= REJECT
!= PUBLISH
!= UNPUBLISH
```

---

#### 28. Real, presupuestado, forecast, escenario y publicado

El plano de lectura debe conservar de forma inequívoca:

```text
REAL
!= PRESUPUESTADO
!= FORECAST
!= ESCENARIO
!= SIMULADO
!= PROPUESTO
!= PUBLICADO
```

Cambiar un supuesto dentro del plano de comando de planificación nunca modifica el dato real.

---

#### 29. Indicador no es comando

Una alerta o indicador puede recomendar atención, pero no ejecutar automáticamente:

- aprobación;
- pago;
- ajuste;
- cierre;
- castigo;
- publicación;
- cambio presupuestal.

La recomendación conserva provenance y la acción material exige intención humana o automatización explícitamente autorizada por otro contrato.

---

#### 30. Estado visual del comando

Cuando un actor tiene `READ` pero no el permiso de comando requerido, la experiencia deberá permanecer en lectura.

Puede explicar de forma segura que la acción no está disponible, pero no debe:

- simular éxito;
- mostrar un formulario ejecutable que fallará solo al final;
- revelar datos adicionales mediante el mensaje de denegación;
- sugerir que el rol humano por nombre debería tener acceso.

La decisión real continúa server-side.

---

#### 31. Ausencia de lectura

Si falta el permiso de lectura del recurso:

- el recurso no se muestra como dato real;
- el actor no recibe el payload para ocultarlo solo en cliente;
- un permiso de comando aislado no obliga a revelar información que no necesita;
- la acción, si excepcionalmente puede existir sin una lectura completa, debe usar una proyección mínima contractual independiente y autorizada.

No se inventa una excepción para NUMERA en esta tarea.

---

#### 32. Separación de datos y controles

La composición objetivo distingue como mínimo:

```text
READ_MODEL
COMMAND_INTENT
COMMAND_FORM_OR_CONFIRMATION
AUTHORIZATION_DECISION
SIDE_EFFECT_RESULT
REFRESHED_READ_MODEL
```

No se usa el estado del componente cliente como fuente de verdad de autorización ni de resultado financiero.

---

#### 33. Confirmación de acciones sensibles

Las acciones irreversibles, externas o de alto impacto deberán usar confirmación proporcional conforme a los contratos existentes.

La confirmación:

- no sustituye permiso;
- no sustituye revalidación server-side;
- no convierte una operación prohibida en válida;
- no permite reusar una decisión stale.

---

#### 34. Estado stale

Antes de un comando material se conserva:

```text
AUTHORIZATION_REQUIRES_RESOURCE_AND_CURRENT_STATE = YES
STALE_RESOURCE_VERSION = DENY_AND_REEVALUATE
```

Para planificación aplica además:

```text
STALE_PLANNING_VERSION = DENY_AND_REEVALUATE
LAST_WRITE_WINS_FOR_MATERIAL_PLANNING_DECISION = FORBIDDEN
```

Una vista vieja nunca es autorización para actuar sobre un estado nuevo.

---

#### 35. Denegación sin side effect

Se conserva:

```text
DENY_SIDE_EFFECT_ALLOWED = NO
```

Si falla permiso, scope, versión, sensibilidad, estado o precondición, no se produce una mutación parcial que luego deba ocultarse en UI.

---

#### 36. Resultado externo incierto

Cuando exista un efecto externo cuyo resultado no sea concluyente:

```text
UNKNOWN != FAILURE
UNKNOWN != SUCCESS
```

La experiencia debe conservar estado pendiente de consulta o reconciliación y no volver a ejecutar ciegamente desde una tarjeta o banner ejecutivo.

---

#### 37. Frontera con roles

Esta tarea no asigna capacidades a:

- `propietario`;
- `gerente_general`;
- `gerente`;
- `contador`;
- `auxiliar_administrativa`.

Se conserva:

```text
ROLE_NAME != AUTHORIZATION
```

Los roles sirven para composición de experiencia en las tareas siguientes; la autoridad efectiva proviene de permisos explícitos y scope.

---

#### 38. Propietario y gerente general

`propietario` y `gerente_general` pueden tener alcance administrativo global, pero:

- no reciben wildcard financiero;
- no obtienen todas las capacidades NUMERA por su nombre;
- el alcance global afecta únicamente al permiso concedido;
- una lectura ejecutiva no concede comando;
- un comando financiero requiere permiso exacto.

`NUMERA-UX-003` y `NUMERA-UX-004` diseñarán sus inicios sin alterar esta regla.

---

#### 39. Gerente de sede

`gerente` representa administración por sede y no autoridad global.

Su inicio futuro puede consumir lectura ejecutiva dentro del alcance autorizado, pero:

- no hereda otras sedes;
- no hereda detalle sensible;
- no recibe acciones contables por jerarquía;
- no obtiene comandos solo porque vea el indicador correspondiente.

`NUMERA-UX-005` desarrollará esa composición.

---

#### 40. Contador

`contador` es un rol funcional financiero, no administrador global del sistema.

Puede recibir permisos organizacionales específicos de NUMERA, pero cada capacidad conserva identidad y scope propios.

`NUMERA-UX-006` podrá priorizar el plano financiero de trabajo sin convertir `contador` en wildcard ni mezclar navegación con autorización.

---

#### 41. Auxiliar autorizada

`auxiliar_administrativa` es un rol funcional de apoyo.

Puede recibir capacidades concretas globales, por sede, área o recurso, pero nunca acceso amplio por el nombre del rol.

`NUMERA-UX-007` deberá diseñar su inicio sobre tareas permitidas y no sobre una copia reducida del acceso del contador por inferencia.

---

#### 42. Inicio por rol no altera los dos planos

Las tareas `NUMERA-UX-003..007` podrán variar:

- orden;
- prioridad;
- tarjetas iniciales;
- alertas;
- accesos directos;
- colas visibles;
- densidad informativa;

pero no podrán cambiar:

```text
SEE != DO
ROLE_NAME != AUTHORIZATION
READ_PLANE != COMMAND_PLANE
```

---

#### 43. Handoff entre plano ejecutivo y plano financiero

Un acceso directo desde lectura ejecutiva hacia una superficie de operación deberá transportar como contexto, cuando aplique:

```text
source_screen_id
source_metric_or_alert
resource_type
resource_id_or_query_context
entity_scope
site_scope
cost_center_scope
period
version
intended_command
```

El contexto mejora continuidad UX, pero no se convierte en autoridad.

---

#### 44. No duplicar datos para separar experiencias

La separación UX no autoriza construir una segunda fuente ejecutiva.

```text
EXECUTIVE_READ_MODEL
= projection of canonical financial sources
!= duplicated executive ledger
```

La operación modifica únicamente la fuente propietaria autorizada y la lectura posterior se refresca desde esa fuente o proyección canónica.

---

#### 45. No duplicar proceso para separar experiencias

Se conserva el universo de siete procesos de `NUMERA-UX-001`.

```text
EXECUTIVE_VIEW_OF_PROCESS
!= NEW_VPROC
ACCOUNTING_WORKSPACE_FOR_PROCESS
!= NEW_VPROC
```

La separación es de experiencia y autorización, no de identidad de proceso.

---

#### 46. No duplicar pantalla por defecto

Esta tarea tampoco crea veinte pantallas adicionales de lectura y diecinueve pantallas adicionales de operación.

La identidad `VSCREEN-*` se conserva.

La implementación posterior podrá separar componentes, estados o rutas cuando una tarea propietaria lo decida, pero no por inferencia desde esta tarea.

---

#### 47. Relación con las siete páginas AS-IS

Se conserva:

```text
ASIS_PAGE_COUNT = 7
TARGET_SCREEN_COUNT = 20
ASIS_TO_TARGET_IS_ONE_TO_ONE = NO
```

Las rutas actuales `/`, `/cost-centers`, `/expenses`, `/break-even` y `/profitability` no definen la arquitectura de los dos planos objetivo.

El rediseño no debe conservar una mezcla de lectura y edición únicamente porque hoy comparten una página física.

---

#### 48. Caso AS-IS de `/cost-centers`

La auditoría observó lectura y edición acotada de metas económicas en una misma página física.

La 002 congela que esa coexistencia física no autoriza el patrón objetivo.

La futura experiencia deberá separar:

- proyección de lectura;
- intención de edición;
- permiso de mutación exacto;
- validación server-side;
- resultado confirmado.

No se decide aquí la ruta final.

---

#### 49. Caso AS-IS de `/expenses`

La auditoría observó lectura y captura de gasto dentro de una misma página física.

La 002 congela:

```text
EXPENSE_VIEW != EXPENSE_REGISTER
```

`NUMERA-UX-009` diseñará el flujo de registro de gasto usando esta frontera.

---

#### 50. Frontera con NUMERA-UX-008 a NUMERA-UX-012

La 002 entrega reglas, pero no desarrolla:

- jerarquía indicadores/tablas: `NUMERA-UX-008`;
- registro de gasto: `NUMERA-UX-009`;
- aprobación: `NUMERA-UX-010`;
- cierre: `NUMERA-UX-011`;
- exportación: `NUMERA-UX-012`.

Cada flujo deberá consumir `READ_PLANE != COMMAND_PLANE` sin reabrirlo.

---

#### 51. Frontera con conciliación, cartera, bancos y planificación

La 002 no diseña los flujos detallados de:

- conciliación de ventas/pagos;
- conciliación de compras/recepciones;
- conciliación productiva;
- cuentas por pagar;
- caja y bancos;
- cartera;
- costos;
- planificación;
- extensión contable/fiscal.

Sus tareas propietarias posteriores heredan la separación de lectura y comando.

---

#### 52. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

Justificación: la tarea organiza la experiencia sobre contratos de autorización, proceso, pantalla, sensibilidad y alcance ya protegidos por requisitos vigentes. No crea una regla de integridad nueva que requiera una identidad adicional en el Registro 04A.

```text
TREQ_CHANGES = 0
```

---

#### 53. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente asociada a:

- `TREQ-NUMERA-001..024`;
- `TREQ-PROC-001`;
- `TREQ-PROC-009..017`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-015`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-017`.

Esta lista es trazabilidad de cobertura y no una actualización del registro.

---

#### 54. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la validación global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | fuentes canónicas, autorización publicada hasta `NUMERA-AUTH-015`, inventarios de proceso/pantalla y estado remoto fueron consultados antes de redactar |
| OPERATIVA | NOT_APPLICABLE | no se ejecuta operación financiera ni prueba con usuarios reales en una tarea `DEFINE_ONCE` |
| FÍSICA | NOT_APPLICABLE | `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados por esta tarea |

---

#### 55. Criterios de aceptación

- [ ] se consume exactamente el inventario de siete procesos de `NUMERA-UX-001`;
- [ ] se conservan exactamente veinte pantallas objetivo;
- [ ] las veinte pantallas tienen plano de lectura autorizado;
- [ ] `VSCREEN-0094` queda como única superficie objetivo puramente de lectura según los slots aprobados;
- [ ] las otras diecinueve pantallas separan lectura de cualquier comando material;
- [ ] el universo final reconcilia 125 capacidades = 1 entrada + 28 lecturas + 96 no-lectura;
- [ ] `numera.access` no se presenta como permiso de métrica;
- [ ] lectura ordinaria y lectura sensible permanecen separadas;
- [ ] ninguna lectura implica mutación, aprobación, pago, conciliación, cierre, reapertura, castigo, exportación o planificación;
- [ ] una transición desde lectura a comando revalida autorización server-side;
- [ ] agregados y drill-down respetan scope, recurso y sensibilidad;
- [ ] resultado stale falla cerrado;
- [ ] deny no produce side effect;
- [ ] rol humano no se convierte en permiso;
- [ ] propietario, gerente general, gerente, contador y auxiliar conservan las fronteras de autoridad vigentes;
- [ ] la separación UX no crea procesos, pantallas, fuentes de verdad ni ledgers duplicados;
- [ ] las siete páginas AS-IS no determinan la arquitectura objetivo;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos;
- [ ] `NUMERA-UX-003` recibe un contrato cerrado para diseñar el inicio del propietario.

---

#### 56. Límites

Esta tarea no:

- diseña el inicio concreto del propietario;
- diseña el inicio del gerente general;
- diseña el inicio del gerente de sede;
- diseña el inicio del contador;
- diseña el inicio de la auxiliar autorizada;
- decide layouts, breakpoints o componentes visuales finales;
- crea rutas nuevas;
- divide o fusiona `VSCREEN-*`;
- crea procesos;
- modifica lifecycle de procesos;
- define permisos nuevos;
- asigna permisos a roles;
- crea grants o denies;
- implementa mutaciones;
- implementa reportes;
- implementa exportación;
- implementa pagos;
- implementa conciliación;
- implementa cierres;
- implementa planificación;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-003`.

---

#### 57. Handoff a NUMERA-UX-003

La siguiente tarea recibe:

```text
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
NUMERA_PROCESS_INVENTORY = NUMERA-FINANCIAL-ANALYTICAL-PROCESS-INVENTORY-001
NUMERA_OWNER_PROCESS_COUNT = 7
NUMERA_CANONICAL_TARGET_SCREEN_COUNT = 20
NUMERA_READ_PROJECTION_CAPABLE_SCREEN_COUNT = 20
NUMERA_PURE_READ_ONLY_TARGET_SCREEN_COUNT = 1
NUMERA_COMMAND_CAPABLE_TARGET_SCREEN_COUNT = 19
NUMERA_PURE_READ_ONLY_SCREEN_ID = VSCREEN-0094
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_APP_ENTRY_COUNT = 1
NUMERA_READ_PERMISSION_COUNT = 28
NUMERA_NON_READ_CAPABILITY_COUNT = 96
EXECUTIVE_READ_PLANE = DEFINED
FINANCIAL_COMMAND_PLANE = DEFINED
SEE_IS_DO = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
VIEW_IMPLIES_EXPORT = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
DENY_SIDE_EFFECT_ALLOWED = NO
STALE_RESOURCE_VERSION = DENY_AND_REEVALUATE
EXECUTIVE_READ_MODEL_IS_DUPLICATE_LEDGER = NO
UX_003_OWNER = OWNER_HOME
TREQ_CHANGES = 0
```

`NUMERA-UX-003` deberá diseñar el inicio del propietario usando el plano ejecutivo como composición inicial, sin conceder permisos por rol y sin mezclar comandos financieros dentro de la lectura por defecto; cualquier acceso a operación deberá conservar transición explícita y reautorización.

---

#### 58. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-001 — Inventariar procesos financieros y analíticos`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-002 — Separar lectura ejecutiva y operación contable`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-003 — Diseñar inicio para propietario`
### ✅ NUMERA-UX-003 — Diseñar inicio para propietario

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-002 — Separar lectura ejecutiva y operación contable
**Tarea siguiente:** NUMERA-UX-004 — Diseñar inicio para gerente general
**Tipo de tarea:** definición documental del inicio financiero de NUMERA para la presentación `propietario`, usando `VSCREEN-0094` como superficie canónica, el `EXECUTIVE_READ_PLANE` como plano por defecto y handoffs explícitos hacia superficies financieras especializadas, sin convertir el nombre del rol en permiso, sin crear autoridad implícita y sin anticipar los diseños de gerente general, gerente de sede, contador o auxiliar autorizada; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes React, permisos, roles, grants, procesos, estados, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, reportes, conciliaciones, pagos, cierres, presupuestos, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el inicio financiero de NUMERA para una persona cuya presentación administrativa sea `propietario`, de forma que pueda comprender la posición económica autorizada de la organización, detectar asuntos que requieren atención y navegar hacia el detalle correspondiente sin que la pantalla inicial se convierta en una estación de operación contable ni en un bypass de autorización.

El resultado debe servir como contrato de experiencia para la futura materialización de `VSCREEN-0094 — Inicio financiero y ejecutivo` y como referencia diferenciada para `NUMERA-UX-004..007`.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato UX documental;
- no crea instancia física propia;
- no modifica `vento-numera`;
- no modifica `vento-shell` fuera de su bloque documental cuando sea incorporada;
- no materializa permisos;
- no modifica matrices RBAC;
- no crea un route handler ni una ruta nueva;
- no ejecuta side effects financieros;
- no cambia datos de Supabase.

---

#### 3. Handoff recibido de NUMERA-UX-002

La predecesora aprobada entrega:

```text
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
NUMERA_PROCESS_INVENTORY = NUMERA-FINANCIAL-ANALYTICAL-PROCESS-INVENTORY-001
NUMERA_OWNER_PROCESS_COUNT = 7
NUMERA_CANONICAL_TARGET_SCREEN_COUNT = 20
NUMERA_READ_PROJECTION_CAPABLE_SCREEN_COUNT = 20
NUMERA_PURE_READ_ONLY_TARGET_SCREEN_COUNT = 1
NUMERA_COMMAND_CAPABLE_TARGET_SCREEN_COUNT = 19
NUMERA_PURE_READ_ONLY_SCREEN_ID = VSCREEN-0094
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_APP_ENTRY_COUNT = 1
NUMERA_READ_PERMISSION_COUNT = 28
NUMERA_NON_READ_CAPABILITY_COUNT = 96
EXECUTIVE_READ_PLANE = DEFINED
FINANCIAL_COMMAND_PLANE = DEFINED
SEE_IS_DO = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
VIEW_IMPLIES_EXPORT = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
DENY_SIDE_EFFECT_ALLOWED = NO
STALE_RESOURCE_VERSION = DENY_AND_REEVALUATE
EXECUTIVE_READ_MODEL_IS_DUPLICATE_LEDGER = NO
UX_003_OWNER = OWNER_HOME
TREQ_CHANGES = 0
```

La 003 consume esta separación sin reabrirla.

---

#### 4. Contrato producido

La tarea define:

```text
NUMERA-OWNER-HOME-001
```

con la identidad funcional:

```text
SCREEN_ID = VSCREEN-0094
SCREEN_NAME = Inicio financiero y ejecutivo
PRESENTATION_PROFILE = propietario
PRIMARY_PLANE = EXECUTIVE_READ_PLANE
INLINE_FINANCIAL_COMMANDS = 0
COMMAND_HANDOFF = EXPLICIT_TO_CANONICAL_TARGET_SCREEN
AUTHORIZATION_SOURCE = EFFECTIVE_PERMISSION_SET
ROLE_NAME_GRANTS_AUTHORITY = NO
```

---

#### 5. Identidad de la superficie

El inicio del propietario no crea una pantalla nueva.

Se conserva:

```text
OWNER_HOME_SCREEN_ID = VSCREEN-0094
```

`VSCREEN-0094` continúa vinculado a:

```text
VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION
PRIMARY_ACTION = MONITOR
STEP_PHASE = CROSS_CUTTING
```

Su propósito sigue siendo presentar indicadores, alertas, cierres y decisiones financieras relevantes para el alcance autorizado.

---

#### 6. NUMERA no sustituye el inicio ejecutivo transversal de VISO

El inicio financiero del propietario pertenece a NUMERA y se limita a información económica, financiera, de conciliación, planificación y análisis gobernada por NUMERA.

Se congela:

```text
NUMERA_OWNER_HOME
!= VISO_EXECUTIVE_HOME
!= VENTO_OS_GLOBAL_HOME
```

VISO conserva la experiencia ejecutiva transversal de la organización. NUMERA no absorbe personas, riesgos empresariales, tecnología, comercial, operación física ni otros dominios únicamente porque sus efectos aparezcan en indicadores financieros.

---

#### 7. Significado de `propietario` en esta tarea

`propietario` es una presentación administrativa y una identidad de rol base existente, pero no una fuente autónoma de autorización.

Se conserva:

```text
propietario != *
propietario != service_role
propietario != operational_bypass
propietario != APP_REVIEW_ACCESS
```

La autorización financiera efectiva requiere permiso explícito, alcance válido, recurso resuelto y ausencia de una denegación aplicable.

---

#### 8. Matriz RBAC histórica que sí puede darse por conocida

La matriz canónica de propietario evaluó un catálogo anterior de 112 permisos y asignó explícitamente seis claves NUMERA:

```text
numera.access
numera.finance.cost_centers.view
numera.finance.expenses.view
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Estas seis claves se conservan como evidencia histórica de asignación base.

No se extrapolan a capacidades creadas posteriormente.

---

#### 9. Las capacidades NUMERA nuevas no se conceden automáticamente

Después de la matriz RBAC histórica, el contrato NUMERA alcanzó:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_APP_ENTRY_COUNT = 1
NUMERA_READ_PERMISSION_COUNT = 28
NUMERA_NON_READ_CAPABILITY_COUNT = 96
```

La regla de autorización vigente exige:

```text
NEW_PERMISSION_AUTO_GRANTED_TO_OWNER = NO
```

Por tanto, el inicio del propietario debe resolver el conjunto efectivo de permisos en runtime y no asumir que el rol posee las 28 lecturas ni las 96 capacidades no-lectura.

---

#### 10. Invariante principal del inicio

El inicio del propietario es una composición de lectura.

```text
OWNER_HOME_DEFAULT = READ
OWNER_HOME_INLINE_MUTATION = FORBIDDEN
OWNER_HOME_INLINE_APPROVAL = FORBIDDEN
OWNER_HOME_INLINE_PAYMENT = FORBIDDEN
OWNER_HOME_INLINE_RECONCILIATION = FORBIDDEN
OWNER_HOME_INLINE_CLOSE = FORBIDDEN
OWNER_HOME_INLINE_REOPEN = FORBIDDEN
OWNER_HOME_INLINE_WRITE_OFF = FORBIDDEN
OWNER_HOME_INLINE_EXPORT = FORBIDDEN
OWNER_HOME_INLINE_PLANNING_MUTATION = FORBIDDEN
```

Una navegación a una superficie capaz de comandar no convierte el inicio en superficie de comando.

---

#### 11. Objetivo de decisión humana

La pantalla debe permitir responder, dentro del alcance autorizado, preguntas de nivel propietario como:

- cuál es la posición económica observable de la organización;
- dónde existen desviaciones o estados que merecen atención;
- qué ciclos financieros están abiertos, pendientes, conciliados o cerrados;
- dónde existen diferencias entre real, presupuesto, forecast o escenario cuando esa lectura está autorizada;
- qué dominio financiero requiere un drill-down;
- si la información observada está vigente, completa y trazable para la decisión.

La pantalla no debe decidir por el propietario ni ejecutar la corrección desde el resumen.

---

#### 12. Arquitectura lógica del inicio

`NUMERA-OWNER-HOME-001` define siete regiones lógicas:

```text
OWNER_HOME_REGION_01 = CONTEXT_AND_SCOPE
OWNER_HOME_REGION_02 = FINANCIAL_POSITION
OWNER_HOME_REGION_03 = ATTENTION_AND_EXCEPTIONS
OWNER_HOME_REGION_04 = PLANNING_AND_VARIANCE
OWNER_HOME_REGION_05 = CYCLE_AND_RECONCILIATION_STATUS
OWNER_HOME_REGION_06 = AUTHORIZED_PROCESS_NAVIGATION
OWNER_HOME_REGION_07 = DATA_STATUS_AND_PROVENANCE
OWNER_HOME_REGION_COUNT = 7
```

Son regiones funcionales, no nombres obligatorios de componentes React ni decisiones de layout físico.

---

#### 13. Región 01 — Contexto y alcance

El inicio deberá dejar visible el contexto con el que se interpretan las cifras presentadas.

Como mínimo, cuando el dato lo requiera, la composición deberá poder declarar:

- organización o entidad económica aplicable;
- periodo o fecha de corte;
- moneda;
- alcance territorial o recurso resuelto;
- estado de vigencia o frescura;
- si la vista corresponde a contexto real o a una preview autorizada.

El selector visual de contexto nunca amplía autoridad.

---

#### 14. Contexto seleccionado no es alcance autorizado

Se congela:

```text
SELECTED_SCOPE != AUTHORIZED_SCOPE
```

Cambiar empresa, sede, centro, periodo o cualquier filtro solo puede reducir o seleccionar dentro de lo autorizado.

No puede crear cobertura nueva.

---

#### 15. Región 02 — Posición financiera

`FINANCIAL_POSITION` agrega únicamente proyecciones de lectura ya autorizadas.

Puede componer, sin fijar todavía fórmulas visuales definitivas:

- gastos y costos;
- punto de equilibrio;
- rentabilidad o margen;
- obligaciones y liquidez;
- cartera;
- presupuesto y forecast;
- estados de cierre;
- resultados analíticos.

Cada familia se renderiza solo si existe la lectura efectiva necesaria para sus datos.

---

#### 16. La 003 no define el catálogo final de indicadores

La tarea diseña la arquitectura del inicio, pero no absorbe `NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas` ni `NUMERA-UX-028 — Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva`.

Por tanto:

- no congela un número final de KPI;
- no congela el orden final de indicadores;
- no define fórmulas nuevas;
- no define visualizaciones finales;
- no convierte `VSCREEN-0094` en el visor económico de `NUMERA-UX-028`.

---

#### 17. Región 03 — Atención y excepciones

`ATTENTION_AND_EXCEPTIONS` presenta señales de lectura que requieren revisión humana.

Puede incluir, cuando la lectura esté autorizada:

- diferencias pendientes de conciliación;
- obligaciones o vencimientos que requieren atención;
- cartera vencida o disputada;
- ciclos de cierre pendientes;
- desviaciones materiales;
- decisiones financieras pendientes;
- alertas de presupuesto o forecast;
- resultados analíticos que requieren revisión.

Mostrar una señal no concede autoridad para resolverla.

---

#### 18. Conteos y badges también son datos protegidos

Un contador de pendientes, un importe acumulado, una severidad o un indicador de existencia puede revelar información sensible.

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
BADGE_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
```

La UI no debe filtrar información por medio de cantidades, colores, etiquetas o tooltips cuando el payload subyacente no está autorizado.

---

#### 19. Región 04 — Planificación y variación

`PLANNING_AND_VARIANCE` puede proyectar, según autorización:

- presupuesto vigente;
- forecast vigente;
- desviación frente al real;
- existencia de escenarios;
- estado de una versión de planificación;
- estado de aprobación o publicación.

La región no crea, modifica, comparte, solicita, aprueba, rechaza, publica ni retira escenarios, presupuestos, forecast o versiones de precio.

---

#### 20. Real, presupuesto, forecast y escenario no se mezclan

Se conserva:

```text
REAL != BUDGET
REAL != FORECAST
REAL != SCENARIO
BUDGET != FORECAST
FORECAST != SCENARIO
PROPOSED != APPROVED
APPROVED != PUBLISHED
```

Cualquier resumen que compare estos estados debe mantenerlos identificables y no transformar una proyección en hecho real.

---

#### 21. Región 05 — Estado de ciclos y conciliación

`CYCLE_AND_RECONCILIATION_STATUS` permite conocer el estado agregado de los procesos financieros sin ejecutar transiciones.

La composición puede proyectar estados autorizados de:

- hechos económicos y conciliación;
- cuentas por pagar y tesorería;
- cartera;
- costos y cierre;
- presupuesto y forecast;
- paquete laboral para pagos y beneficios;
- medición y mejora.

No crea un lifecycle alterno.

---

#### 22. Región 06 — Navegación financiera autorizada

`AUTHORIZED_PROCESS_NAVIGATION` ofrece handoffs hacia superficies canónicas existentes.

La navegación:

- no crea un proceso nuevo;
- no cambia `process_id`;
- no crea una segunda fuente de verdad;
- no concede permiso por mostrar un acceso;
- no convierte `VSCREEN-0094` en propietaria de las operaciones destino.

---

#### 23. Región 07 — Estado y procedencia de datos

`DATA_STATUS_AND_PROVENANCE` debe poder distinguir, según el dato:

```text
VALUE_CONFIRMED
VALUE_STALE
VALUE_UNKNOWN
VALUE_NOT_AVAILABLE
VALUE_NOT_AUTHORIZED
VALUE_NOT_APPLICABLE
```

Ninguno de estos estados se convierte silenciosamente en cero.

---

#### 24. Cero no equivale a ausencia ni desconocimiento

Se congela:

```text
ZERO != UNKNOWN
ZERO != NOT_AVAILABLE
ZERO != NOT_AUTHORIZED
ZERO != NOT_APPLICABLE
```

Un cálculo ausente o un permiso denegado no puede mostrarse como `0 COP`, `0 %`, cero pendientes o cualquier otro valor confirmado.

---

#### 25. Trazabilidad mínima de una cifra económica

Cuando una cifra pertenezca a costo, distribución, presupuesto, forecast, equilibrio o rentabilidad, la experiencia debe conservar capacidad de navegar hacia su contexto de cálculo aprobado.

Como mínimo, el contrato económico aplicable conserva:

- método;
- entradas;
- versión;
- vigencia;
- entidad;
- centro;
- periodo;
- fuente.

La 003 no diseña todavía la divulgación visual final de estos detalles.

---

#### 26. Frescura

La pantalla inicial no presentará una cifra stale como si fuera actual.

Se conserva:

```text
STALE_DATA_IS_CURRENT = NO
```

Si la fuente o corte no permiten demostrar actualidad, el valor debe mostrar su condición o dejar de presentarse como cifra vigente.

---

#### 27. Proceso VPROC-0010 — paquete laboral para pagos

El inicio puede exponer únicamente una proyección autorizada del estado financiero del paquete laboral.

Handoff de detalle:

```text
VSCREEN-0153 — Paquete laboral para pagos y beneficios
```

La pantalla inicial no decide novedades laborales, no sustituye VISO o ANIMA y no ejecuta pagos.

---

#### 28. Proceso VPROC-0051 — hechos económicos y conciliación

El inicio puede resumir, según lectura efectiva:

- recepción o clasificación de hechos;
- cobertura de conciliación;
- diferencias relevantes;
- documentos fiscales asociados.

Handoffs canónicos:

```text
VSCREEN-0095
VSCREEN-0096
VSCREEN-0101
VSCREEN-0102
VSCREEN-0154
```

---

#### 29. Proceso VPROC-0052 — obligaciones, pagos y tesorería

El inicio puede resumir estados autorizados de obligación, vencimiento, pago, liquidez, tesorería o cumplimiento.

Handoffs canónicos:

```text
VSCREEN-0097
VSCREEN-0098
VSCREEN-0100
VSCREEN-0155
VSCREEN-0157
```

Ningún acceso desde el inicio ejecuta aprobación o pago.

---

#### 30. Proceso VPROC-0053 — cartera

El inicio puede proyectar estado autorizado de cartera, aging, vencimiento, recaudo o diferencia.

Handoff canónico:

```text
VSCREEN-0099
```

No registra acuerdos, aplica pagos, castiga saldos ni resuelve disputas inline.

---

#### 31. Proceso VPROC-0054 — costos, rentabilidad, distribución y cierre

El inicio puede proyectar resultados autorizados de costo, rentabilidad, variación, cierre y distribución.

Handoffs canónicos:

```text
VSCREEN-0103
VSCREEN-0104
VSCREEN-0105
VSCREEN-0158
```

No ejecuta conciliación, distribución, cierre o reapertura inline.

---

#### 32. Proceso VPROC-0061 — medición, análisis y mejora

`VSCREEN-0094` pertenece a `VPROC-0061` y utiliza este proceso como eje de lectura ejecutiva.

Handoffs adicionales:

```text
VSCREEN-0106
VSCREEN-0159
```

La pantalla inicial presenta resultados y señales; no convierte análisis en causalidad automática ni ejecuta la acción de mejora.

---

#### 33. Proceso VPROC-0069 — presupuesto, escenarios y forecast

El inicio puede presentar proyecciones autorizadas del ciclo presupuestal y sus comparaciones.

Handoff canónico:

```text
VSCREEN-0156
```

Toda mutación de planificación permanece fuera de `VSCREEN-0094`.

---

#### 34. Cobertura exacta de procesos en el inicio

La composición reconoce exactamente los siete procesos propietarios de NUMERA:

| Proceso | Familia visible desde el inicio | Handoff de detalle |
| --- | --- | --- |
| `VPROC-0010` | paquete laboral financiero | `VSCREEN-0153` |
| `VPROC-0051` | hechos económicos y conciliación | `VSCREEN-0095`, `0096`, `0101`, `0102`, `0154` |
| `VPROC-0052` | obligaciones, pagos y tesorería | `VSCREEN-0097`, `0098`, `0100`, `0155`, `0157` |
| `VPROC-0053` | cartera | `VSCREEN-0099` |
| `VPROC-0054` | costos, rentabilidad, distribución y cierre | `VSCREEN-0103`, `0104`, `0105`, `0158` |
| `VPROC-0061` | medición, análisis y mejora | `VSCREEN-0094`, `0106`, `0159` |
| `VPROC-0069` | presupuesto, escenarios y forecast | `VSCREEN-0156` |

Resultado:

```text
OWNER_HOME_PROCESS_COUNT = 7
OWNER_HOME_PROCESS_MISSING_COUNT = 0
OWNER_HOME_PROCESS_DUPLICATE_COUNT = 0
```

---

#### 35. Cobertura exacta de las veinte pantallas NUMERA

El inicio conserva la identidad de las veinte pantallas objetivo:

| Pantalla | Relación con el inicio del propietario | Comando inline |
| --- | --- | --- |
| `VSCREEN-0094` | `HOME` | no |
| `VSCREEN-0095` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0096` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0097` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0098` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0099` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0100` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0101` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0102` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0103` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0104` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0105` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0106` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0153` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0154` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0155` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0156` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0157` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0158` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0159` | `AUTHORIZED_DRILLDOWN` | no |

Resultado:

```text
OWNER_HOME_TARGET_SCREEN_COUNT = 20
OWNER_HOME_HOME_SCREEN_COUNT = 1
OWNER_HOME_DRILLDOWN_SCREEN_COUNT = 19
OWNER_HOME_INLINE_COMMAND_SCREEN_COUNT = 0
OWNER_HOME_SCREEN_MISSING_COUNT = 0
OWNER_HOME_SCREEN_DUPLICATE_COUNT = 0
```

---

#### 36. Drill-down no es autorización

Un enlace, tarjeta, CTA de navegación o acceso contextual solo conduce a la superficie destino.

Se conserva:

```text
NAVIGATION_VISIBLE != COMMAND_AUTHORIZED
NAVIGATION_PERFORMED != COMMAND_AUTHORIZED
```

La superficie destino reevalúa su lectura y, cuando corresponda, su acción material.

---

#### 37. Regla de handoff hacia `FINANCIAL_COMMAND_PLANE`

Cuando desde el inicio el usuario necesite una acción material:

```text
OWNER_HOME_READ
-> EXPLICIT_NAVIGATION
-> TARGET_SCREEN
-> CURRENT_RESOURCE_RESOLUTION
-> CURRENT_STATE_RESOLUTION
-> SERVER_SIDE_AUTHORIZATION
-> COMMAND_ALLOWED_OR_DENIED
```

No existe transferencia de autorización por haber iniciado desde el perfil propietario.

---

#### 38. Acciones sensibles nunca se embeben por conveniencia

Aunque el propietario pueda recibir una capacidad futura de gobierno o una capacidad financiera específica, `VSCREEN-0094` no incorpora inline:

- aprobar;
- rechazar;
- pagar;
- conciliar;
- cerrar;
- reabrir;
- castigar;
- exportar;
- compartir;
- publicar;
- cambiar un presupuesto;
- cambiar un escenario;
- cambiar una versión de precio.

Estas acciones pertenecen a superficies y contratos propios.

---

#### 39. Entrada a la aplicación

La condición de entrada continúa separada del contenido:

```text
numera.access = APP_ENTRY
numera.access != FINANCIAL_READ
```

Si falta `numera.access`, no existe home NUMERA autorizado.

---

#### 40. Estado con acceso a la app pero sin lectura financiera

Si existe `numera.access` pero ninguna lectura financiera efectiva aplicable:

```text
APP_ENTRY = ALLOWED
FINANCIAL_PAYLOAD = EMPTY_BY_AUTHORIZATION
```

La UI no debe inventar valores cero ni usar el rol `propietario` para completar permisos faltantes.

Puede presentar un estado de acceso sin información financiera, sin revelar importes, conteos o nombres de recursos restringidos.

---

#### 41. Autorización parcial

El inicio debe soportar un conjunto parcial de lecturas.

```text
PARTIAL_READ_SET = VALID
```

Cada región o proyección se compone únicamente con datos cuya lectura efectiva esté autorizada.

La ausencia de una lectura no bloquea necesariamente las demás lecturas independientes.

---

#### 42. Lectura sensible

Las lecturas financieras sensibles definidas por NUMERA conservan su permiso específico.

Se prohíbe:

```text
BASIC_VIEW -> SENSITIVE_DETAIL
```

El inicio no puede inferir detalle de bancos, cartera, crédito, acuerdos, castigos u otros datos sensibles desde una lectura agregada.

---

#### 43. Agregados

Un agregado del home no puede incluir miembros fuera del alcance autorizado si su inclusión permite inferir datos protegidos.

Se conserva:

```text
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

Cuando no exista una proyección agregada segura, el dato se omite o se presenta con estado autorizado sin inventar un total.

---

#### 44. Source ownership

El inicio no reconstruye operaciones de aplicaciones fuente.

Se conserva:

```text
PULSO_FACT_OWNERSHIP = PULSO
ORIGO_FACT_OWNERSHIP = ORIGO
NEXO_FACT_OWNERSHIP = NEXO
FOGO_FACT_OWNERSHIP = FOGO
ANIMA_AND_VISO_LABOR_FACT_OWNERSHIP = PRESERVED
NUMERA_RECREATES_SOURCE_OPERATION = NO
```

NUMERA consume hechos económicos y proyecciones autorizadas sin sustituir sus fuentes operativas.

---

#### 45. AS-IS de la raíz actual

La raíz física actual de `vento-numera` presenta un panel económico inicial que:

- exige `numera.access`;
- consume `numera_current_period_summary`;
- muestra gasto operativo, presupuesto y punto de equilibrio;
- enlaza a centros de costo, gastos, punto de equilibrio y rentabilidad.

Esta huella AS-IS se conserva como evidencia, no como contrato objetivo completo.

---

#### 46. La 003 no hereda la debilidad AS-IS de autorización de métricas

Se conserva el requisito vigente:

```text
ROOT_NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
```

Por tanto, el diseño objetivo del propietario no puede reutilizar `numera.access` como autorización suficiente de todas las métricas de la raíz actual.

---

#### 47. Manejo de error de una proyección

Un fallo de una familia de datos no debe convertir valores desconocidos en valores confirmados.

La composición diferencia:

```text
DENIED
UNKNOWN
STALE
TECHNICAL_FAILURE
VALID_EMPTY
VALID_VALUE
```

La implementación futura podrá decidir aislamiento parcial o error de región según el contrato de datos, pero nunca falsificará una cifra.

---

#### 48. Preview o simulación de autorización

Si la superficie se presenta dentro de una preview de autorización:

```text
SIMULATED_OWNER_PRESENTATION != REAL_OWNER_SESSION
SIMULATION_CAN_MUTATE_FINANCIAL_DATA = NO
```

La preview debe conservar aviso visible y minimización de datos conforme al contrato de simulación; no amplía entidad, periodo, saldos, costos ni capacidades de comando.

---

#### 49. Flujo principal

El flujo contractual del inicio es:

```text
AUTHENTICATED_SUBJECT
-> numera.access
-> RESOLVE_EFFECTIVE_READ_PERMISSIONS
-> RESOLVE_AUTHORIZED_SCOPE
-> RESOLVE_PERIOD_AND_CUTOFF
-> LOAD_ONLY_AUTHORIZED_PROJECTIONS
-> COMPOSE_VSCREEN_0094
-> REVIEW_POSITION_AND_ATTENTION
-> OPTIONAL_AUTHORIZED_DRILLDOWN
```

El flujo termina en lectura o navegación; no en mutación inline.

---

#### 50. Flujo hacia operación

Cuando el propietario necesita ejecutar una acción:

```text
VSCREEN_0094
-> DRILLDOWN
-> COMMAND_CAPABLE_TARGET_SCREEN
-> ACTION_SELECTION
-> SERVER_REVALIDATION
-> ALLOW_OR_DENY
```

La revalidación debe utilizar estado y recurso actuales, no una decisión cacheada en el inicio.

---

#### 51. Persistencia de contexto durante navegación

El handoff puede conservar filtros de lectura como organización, sede, centro, periodo o recurso cuando el contrato destino los admite.

Se conserva:

```text
CONTEXT_HANDOFF != AUTHORITY_HANDOFF
```

La pantalla destino vuelve a resolver autorización.

---

#### 52. No se crean accesos a pantallas por el solo diseño del home

La matriz de veinte pantallas define cobertura de navegación conceptual.

No significa que las veinte deban aparecer simultáneamente como menú o tarjeta.

La visibilidad final de cada acceso depende de:

- arquitectura de navegación aplicable;
- permiso efectivo;
- relevancia contextual;
- tareas UX posteriores.

---

#### 53. Accesibilidad semántica

La implementación futura deberá poder expresar sin depender solo de color:

- dato confirmado;
- advertencia;
- stale;
- no disponible;
- no autorizado;
- real;
- presupuestado;
- forecast;
- escenario;
- propuesto;
- aprobado;
- publicado.

La 003 no fija componentes visuales concretos.

---

#### 54. Estados de carga

La carga del inicio no debe mostrar una cifra anterior como si correspondiera al nuevo contexto mientras se resuelve el cambio.

Se conserva:

```text
CONTEXT_CHANGED_WITH_STALE_VISIBLE_VALUE = FORBIDDEN
```

La UI debe distinguir carga, dato stale y dato confirmado.

---

#### 55. Seguridad frente a caché de autorización

Una lectura previamente autorizada no se considera vigente después de un cambio material de contexto, permiso, recurso o estado que exija reevaluación.

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

---

#### 56. Observabilidad mínima del diseño futuro

La implementación deberá poder distinguir en telemetría, sin registrar payload financiero sensible innecesario:

- home cargado;
- región disponible;
- región denegada;
- región con error técnico;
- drill-down iniciado;
- handoff hacia pantalla destino;
- comando denegado o permitido en la superficie destino.

La telemetría no se materializa en esta tarea.

---

#### 57. Relación con NUMERA-UX-004

`NUMERA-UX-004` diseñará el inicio de `gerente_general`.

No puede obtenerse simplemente copiando `NUMERA-OWNER-HOME-001` porque:

```text
OWNER_RESERVED_GOVERNANCE != EXECUTIVE_MANAGEMENT
```

La arquitectura común puede reutilizar `VSCREEN-0094` y el `EXECUTIVE_READ_PLANE`, pero cada presentación debe resolver sus permisos y límites propios.

---

#### 58. Relación con NUMERA-UX-005

`NUMERA-UX-005` diseñará el inicio del gerente de sede con alcance territorial explícito.

La 003 no convierte `G(B)` esperado para permisos históricos del propietario en una regla aplicable al gerente de sede.

---

#### 59. Relación con NUMERA-UX-006 y NUMERA-UX-007

`NUMERA-UX-006` y `NUMERA-UX-007` conservarán responsabilidades funcionales financieras o administrativas específicas.

La 003 no presume que contador o auxiliar deban recibir la misma amplitud, los mismos módulos ni los mismos drill-downs del propietario.

---

#### 60. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- la tarea especializa una experiencia ya protegida por requisitos financieros, autorización y navegación vigentes;
- no crea nueva conducta ejecutable;
- no crea proceso, pantalla, permiso o dato nuevo;
- no modifica ningún requisito existente;
- la materialización y pruebas ejecutables permanecen en las unidades y paquetes posteriores que consuman este contrato.

```text
REQUISITOS_CREADOS = 0
REQUISITOS_MODIFICADOS = 0
TREQ_CHANGES = 0
```

---

#### 61. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente asociada a:

- `TREQ-NUMERA-001..024`;
- `TREQ-PROC-001`;
- `TREQ-PROC-009..017`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-015`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-017`.

Esta lista es trazabilidad y no constituye una actualización del Registro 04A.

---

#### 62. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la batería global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | se consultaron `vento-shell/main`, el archivo propietario, topología, políticas, catálogo de pantallas, matrices de propietario, autorización NUMERA publicada hasta `NUMERA-AUTH-015`, Registro 04A y el estado AS-IS verificable de la raíz de `vento-numera` |
| OPERATIVA | NOT_APPLICABLE | la tarea no ejecuta pagos, aprobaciones, conciliaciones, cierres, presupuestos ni otras operaciones financieras reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados |

---

#### 63. Criterios de aceptación

- [ ] se define exactamente un contrato `NUMERA-OWNER-HOME-001`;
- [ ] el home usa `VSCREEN-0094` y no crea un `VSCREEN-*` nuevo;
- [ ] `VSCREEN-0094` permanece `MONITOR` / `CROSS_CUTTING`;
- [ ] la presentación `propietario` no se convierte en wildcard ni bypass;
- [ ] se preservan las seis claves NUMERA históricamente asignadas al propietario sin extrapolarlas;
- [ ] las capacidades nuevas posteriores a la matriz histórica no se conceden automáticamente;
- [ ] el inicio usa permisos efectivos y no el nombre del rol como fuente de autoridad;
- [ ] el plano por defecto es `EXECUTIVE_READ_PLANE`;
- [ ] existen cero comandos financieros inline;
- [ ] se definen siete regiones lógicas sin convertirlas en componentes físicos obligatorios;
- [ ] se cubren exactamente siete procesos propietarios NUMERA;
- [ ] se cubren exactamente veinte pantallas objetivo;
- [ ] existe una pantalla home y diecinueve destinos de drill-down;
- [ ] ningún drill-down transfiere autoridad de comando;
- [ ] los comandos se reautorizan en la superficie destino;
- [ ] `numera.access` no autoriza métricas;
- [ ] acceso parcial produce composición parcial, no bypass;
- [ ] conteos, badges y agregados respetan autorización;
- [ ] cero, desconocido, no disponible, no autorizado y no aplicable permanecen diferenciados;
- [ ] un valor stale no se presenta como actual;
- [ ] real, presupuesto, forecast y escenario permanecen separados;
- [ ] el home no duplica fuentes operativas;
- [ ] `NUMERA-UX-008` y `NUMERA-UX-028` conservan su alcance posterior;
- [ ] `NUMERA-UX-004` recibe un handoff completo sin copiar automáticamente la autoridad del propietario;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos.

---

#### 64. Límites

Esta tarea no:

- diseña el inicio del gerente general;
- diseña el inicio del gerente de sede;
- diseña el inicio del contador;
- diseña el inicio de la auxiliar autorizada;
- redefine la matriz RBAC de propietario;
- asigna nuevas capacidades NUMERA al propietario;
- define el catálogo final de indicadores;
- decide fórmulas nuevas;
- decide el orden definitivo indicador-versus-tabla;
- diseña el visor económico dinámico de `NUMERA-UX-028`;
- crea pantallas;
- crea rutas;
- crea componentes React;
- modifica navegación runtime;
- crea permisos;
- crea grants o denies;
- crea procesos;
- cambia estados de proceso;
- implementa pagos;
- implementa conciliaciones;
- implementa cierres;
- implementa cartera;
- implementa planificación;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-004`.

---

#### 65. Handoff a NUMERA-UX-004

La siguiente tarea recibe:

```text
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
OWNER_HOME_SCREEN_ID = VSCREEN-0094
OWNER_HOME_PRESENTATION_PROFILE = propietario
OWNER_HOME_PRIMARY_PLANE = EXECUTIVE_READ_PLANE
OWNER_HOME_INLINE_FINANCIAL_COMMANDS = 0
OWNER_HOME_REGION_COUNT = 7
OWNER_HOME_PROCESS_COUNT = 7
OWNER_HOME_TARGET_SCREEN_COUNT = 20
OWNER_HOME_HOME_SCREEN_COUNT = 1
OWNER_HOME_DRILLDOWN_SCREEN_COUNT = 19
OWNER_HOME_SCREEN_MISSING_COUNT = 0
OWNER_HOME_SCREEN_DUPLICATE_COUNT = 0
OWNER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
OWNER_NEW_PERMISSION_AUTO_GRANT = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
NUMERA_OWNER_HOME_IS_VISO_EXECUTIVE_HOME = NO
UX_004_OWNER = GENERAL_MANAGER_HOME
TREQ_CHANGES = 0
```

`NUMERA-UX-004` deberá reutilizar la arquitectura común de lectura solo donde sea válida y diseñar la presentación de `gerente_general` con su propia frontera ejecutiva, sin heredar capacidades reservadas del propietario y sin convertir la similitud visual en equivalencia de autorización.

---

#### 66. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-002 — Separar lectura ejecutiva y operación contable`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-003 — Diseñar inicio para propietario`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-004 — Diseñar inicio para gerente general`
### ✅ NUMERA-UX-004 — Diseñar inicio para gerente general

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-003 — Diseñar inicio para propietario
**Tarea siguiente:** NUMERA-UX-005 — Diseñar inicio para gerente de sede
**Tipo de tarea:** definición documental del inicio financiero de NUMERA para la presentación `gerente_general`, reutilizando `VSCREEN-0094` y la arquitectura común del `EXECUTIVE_READ_PLANE` donde resulte válida, priorizando dirección ejecutiva financiera de alcance organizacional autorizado, excluyendo gobierno reservado de propietario, sin convertir el nombre del rol en permiso, sin conceder capacidades nuevas por inferencia y sin anticipar el diseño territorial del gerente de sede; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes React, permisos, roles, grants, procesos, estados, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, reportes, conciliaciones, pagos, cierres, presupuestos, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el inicio financiero de NUMERA para una persona cuya presentación administrativa sea `gerente_general`, de forma que pueda comprender la posición económica autorizada de la organización, detectar prioridades ejecutivas, revisar ciclos y desviaciones financieras y navegar hacia el detalle correspondiente sin que la pantalla inicial se convierta en una estación de operación contable, un sustituto de VISO ni un bypass de autorización.

El resultado debe servir como contrato de experiencia para la futura materialización de `VSCREEN-0094 — Inicio financiero y ejecutivo` bajo la presentación `gerente_general` y como frontera explícita frente a propietario, gerente de sede, contador y auxiliar autorizada.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato UX documental;
- no crea instancia física propia;
- no modifica `vento-numera`;
- no modifica `vento-shell` fuera de su bloque documental cuando sea incorporada;
- no materializa permisos;
- no modifica matrices RBAC;
- no crea una ruta nueva;
- no ejecuta side effects financieros;
- no cambia datos de Supabase.

---

#### 3. Handoff recibido de NUMERA-UX-003

La predecesora aprobada entrega:

```text
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
OWNER_HOME_SCREEN_ID = VSCREEN-0094
OWNER_HOME_PRESENTATION_PROFILE = propietario
OWNER_HOME_PRIMARY_PLANE = EXECUTIVE_READ_PLANE
OWNER_HOME_INLINE_FINANCIAL_COMMANDS = 0
OWNER_HOME_REGION_COUNT = 7
OWNER_HOME_PROCESS_COUNT = 7
OWNER_HOME_TARGET_SCREEN_COUNT = 20
OWNER_HOME_HOME_SCREEN_COUNT = 1
OWNER_HOME_DRILLDOWN_SCREEN_COUNT = 19
OWNER_HOME_SCREEN_MISSING_COUNT = 0
OWNER_HOME_SCREEN_DUPLICATE_COUNT = 0
OWNER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
OWNER_NEW_PERMISSION_AUTO_GRANT = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
NUMERA_OWNER_HOME_IS_VISO_EXECUTIVE_HOME = NO
UX_004_OWNER = GENERAL_MANAGER_HOME
TREQ_CHANGES = 0
```

La 004 consume este handoff sin reabrir las decisiones de UX-003.

---

#### 4. Contrato producido

La tarea define:

```text
NUMERA-GENERAL-MANAGER-HOME-001
```

con la identidad funcional:

```text
SCREEN_ID = VSCREEN-0094
SCREEN_NAME = Inicio financiero y ejecutivo
PRESENTATION_PROFILE = gerente_general
PRIMARY_PLANE = EXECUTIVE_READ_PLANE
EXECUTIVE_SCOPE_MODEL = EFFECTIVE_PERMISSION_AND_RESOURCE_SCOPE
INLINE_FINANCIAL_COMMANDS = 0
COMMAND_HANDOFF = EXPLICIT_TO_CANONICAL_TARGET_SCREEN
AUTHORIZATION_SOURCE = EFFECTIVE_PERMISSION_SET
ROLE_NAME_GRANTS_AUTHORITY = NO
OWNER_RESERVED_GOVERNANCE_INHERITED = NO
```

---

#### 5. Identidad de la superficie

El inicio de `gerente_general` no crea una pantalla nueva.

Se conserva:

```text
GENERAL_MANAGER_HOME_SCREEN_ID = VSCREEN-0094
```

`VSCREEN-0094` continúa vinculado a:

```text
VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION
PRIMARY_ACTION = MONITOR
STEP_PHASE = CROSS_CUTTING
```

Su propósito sigue siendo presentar indicadores, alertas, cierres y decisiones financieras relevantes para el alcance autorizado.

---

#### 6. NUMERA no sustituye el inicio ejecutivo transversal de VISO

La presentación `gerente_general` dentro de NUMERA se limita a información económica, financiera, de conciliación, planificación y análisis gobernada por NUMERA.

Se congela:

```text
NUMERA_GENERAL_MANAGER_HOME
!= VISO_EXECUTIVE_HOME
!= VENTO_OS_GLOBAL_HOME
```

VISO conserva la experiencia ejecutiva transversal. NUMERA no absorbe personas, riesgos empresariales, tecnología, contenido, comercial, operación física ni otros dominios por el solo hecho de que produzcan consecuencias financieras.

---

#### 7. Significado de `gerente_general` en esta tarea

`gerente_general` representa dirección ejecutiva global en la matriz administrativa, pero el nombre del rol no es una fuente autónoma de autorización.

Se conserva:

```text
gerente_general != *
gerente_general != propietario
gerente_general != service_role
gerente_general != operational_bypass
gerente_general != APP_REVIEW_ACCESS
```

Toda lectura o acción financiera efectiva requiere permiso explícito, alcance válido, recurso resuelto y ausencia de denegaciones aplicables.

---

#### 8. Matriz RBAC histórica que sí puede darse por conocida

La matriz canónica de `gerente_general` evaluó un catálogo histórico de 112 permisos y asignó explícitamente seis claves NUMERA:

```text
numera.access
numera.finance.cost_centers.view
numera.finance.expenses.view
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Resultado histórico NUMERA:

```text
GENERAL_MANAGER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
GENERAL_MANAGER_HISTORICAL_NUMERA_APP_ENTRY_COUNT = 1
GENERAL_MANAGER_HISTORICAL_NUMERA_GB_READ_COUNT = 5
```

Las cinco lecturas financieras históricas usan `G(B)` y excluyen APP-REVIEW, demo, pruebas, secretos y dominios aislados.

---

#### 9. Coincidencia histórica con propietario no implica herencia

En el catálogo histórico de 112 permisos, propietario y gerente general coinciden cuantitativamente en las seis claves NUMERA anteriores.

Se congela:

```text
CURRENT_HISTORICAL_NUMERA_SET_EQUAL = YES
ROLE_SEMANTICS_EQUAL = NO
AUTHORITY_INHERITANCE = NO
OWNER_RESERVED_GOVERNANCE_INHERITED = NO
```

La coincidencia existe porque el catálogo histórico todavía no expresaba capacidades atómicas reservadas de propietario; no porque `gerente_general` herede al propietario.

---

#### 10. Gobierno reservado de propietario queda fuera

`gerente_general` no obtiene por equivalencia, similitud visual o amplitud ejecutiva capacidades reservadas de gobierno propietario.

Permanece fuera de este home cualquier autoridad para:

- administrar propietarios;
- conceder o retirar equivalencia de propietario;
- modificar la arquitectura de autorización;
- alterar recuperación de seguridad;
- desactivar o debilitar auditoría;
- modificar `service_role`;
- entregar secretos o credenciales técnicas;
- romper aislamiento de APP-REVIEW, demo o pruebas;
- asumir identidad real de otro actor;
- ejecutar acciones futuras clasificadas como reservadas de propietario.

Se conserva:

```text
OWNER_RESERVED_GOVERNANCE != EXECUTIVE_MANAGEMENT
```

---

#### 11. Capacidades NUMERA posteriores no se conceden automáticamente

Después de la matriz RBAC histórica, el contrato objetivo NUMERA alcanzó:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_APP_ENTRY_COUNT = 1
NUMERA_READ_PERMISSION_COUNT = 28
NUMERA_NON_READ_CAPABILITY_COUNT = 96
```

El contrato de autorización publicado hasta `NUMERA-AUTH-015` además registra:

```text
NUMERA_SHARED_PERMISSION_MATERIALIZED_COUNT = 6
NUMERA_SHARED_PERMISSION_PENDING_COUNT_AFTER_015 = 119
```

Estos conteos describen el estado del catálogo compartido y no constituyen una concesión de rol.

Se congela:

```text
NEW_PERMISSION_AUTO_GRANTED_TO_GENERAL_MANAGER = NO
```

El inicio debe resolver permisos efectivos y no asumir que `gerente_general` posee las 28 lecturas ni las 96 capacidades no-lectura del contrato objetivo.

---

#### 12. Dirección ejecutiva global no crea scope por nombre de rol

La matriz histórica concedió cinco lecturas NUMERA con `G(B)`, pero el home no puede convertir `gerente_general` en una regla universal de alcance.

Se conserva:

```text
ROLE_NAME_IS_SCOPE = NO
GLOBAL_EXECUTIVE_ROLE_IMPLIES_ALL_NUMERA_RESOURCES = NO
HISTORICAL_GB_SCOPE_APPLIES_ONLY_TO_EXPLICIT_HISTORICAL_GRANTS = YES
```

Cada permiso nuevo o recurso especializado conserva su propio contrato de scope, sensibilidad, estado y revalidación.

---

#### 13. Invariante principal del inicio

El inicio de `gerente_general` es una composición de lectura.

```text
GENERAL_MANAGER_HOME_DEFAULT = READ
GENERAL_MANAGER_HOME_INLINE_MUTATION = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_APPROVAL = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_PAYMENT = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_RECONCILIATION = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_CLOSE = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_REOPEN = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_WRITE_OFF = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_EXPORT = FORBIDDEN
GENERAL_MANAGER_HOME_INLINE_PLANNING_MUTATION = FORBIDDEN
```

Una navegación a una superficie capaz de comandar no convierte el inicio en superficie de comando.

---

#### 14. Objetivo de decisión humana

Dentro del alcance efectivamente autorizado, la pantalla debe permitir al gerente general comprender:

- la posición económica observable de la organización;
- liquidez, obligaciones, cartera y tensiones financieras relevantes;
- rentabilidad, costos y variaciones que requieran atención ejecutiva;
- estado de ciclos financieros, conciliaciones y cierres;
- diferencias entre real, presupuesto, forecast y escenario cuando su lectura esté autorizada;
- prioridades que requieren análisis o decisión en una superficie especializada;
- vigencia, procedencia y confiabilidad de la información usada para decidir.

La pantalla informa y orienta; no ejecuta la decisión financiera desde el resumen.

---

#### 15. Arquitectura común reutilizada

UX-004 reutiliza la espina lógica de siete regiones definida por UX-003 porque ambas presentaciones consumen el mismo `VSCREEN-0094` y el mismo `EXECUTIVE_READ_PLANE`.

```text
GENERAL_MANAGER_HOME_REGION_01 = CONTEXT_AND_SCOPE
GENERAL_MANAGER_HOME_REGION_02 = FINANCIAL_POSITION
GENERAL_MANAGER_HOME_REGION_03 = ATTENTION_AND_EXCEPTIONS
GENERAL_MANAGER_HOME_REGION_04 = PLANNING_AND_VARIANCE
GENERAL_MANAGER_HOME_REGION_05 = CYCLE_AND_RECONCILIATION_STATUS
GENERAL_MANAGER_HOME_REGION_06 = AUTHORIZED_PROCESS_NAVIGATION
GENERAL_MANAGER_HOME_REGION_07 = DATA_STATUS_AND_PROVENANCE
GENERAL_MANAGER_HOME_REGION_COUNT = 7
```

Reutilizar estas regiones no copia autoridad de propietario. La diferencia se expresa en la presentación, prioridades y límites del perfil, siempre subordinados al conjunto efectivo de permisos.

---

#### 16. Similitud visual no debe fabricar diferencia de autoridad

Si propietario y gerente general tienen exactamente el mismo permiso efectivo, scope, recurso y estado para una proyección financiera, la elegibilidad del dato puede coincidir.

Se conserva:

```text
SAME_EFFECTIVE_AUTHORIZATION_MAY_PRODUCE_SAME_FINANCIAL_PROJECTION = YES
VISUAL_DIFFERENCE_CREATES_AUTHORITY = NO
VISUAL_SIMILARITY_PROVES_ROLE_EQUIVALENCE = NO
```

La UX no debe ocultar una lectura válida solo para forzar una diferencia cosmética entre roles ni mostrar una lectura no autorizada para hacer la vista más ejecutiva.

---

#### 17. Región 01 — Contexto y alcance ejecutivo

`CONTEXT_AND_SCOPE` debe dejar visible el contexto con el que se interpretan cifras y prioridades.

Cuando el dato lo requiera, la composición deberá poder declarar:

- organización o entidad económica aplicable;
- periodo o fecha de corte;
- moneda;
- sede, centro, unidad o dimensión cuando funcione como filtro;
- alcance efectivo del recurso;
- estado de vigencia o frescura;
- si la vista corresponde a contexto real o preview autorizada.

El contexto visible no reemplaza la resolución de scope.

---

#### 18. Scope histórico global y filtros locales

Las cinco lecturas históricas NUMERA de `gerente_general` usan `G(B)`.

Esto permite una expectativa ejecutiva de lectura organizacional únicamente cuando la concesión efectiva y el recurso concreto satisfacen ese contrato.

Un filtro a sede, centro o unidad:

```text
FILTERED_VIEW <= AUTHORIZED_SCOPE
```

Nunca:

```text
SELECTED_SITE => NEW_AUTHORITY
```

---

#### 19. Contexto seleccionado no es alcance autorizado

Se conserva:

```text
SELECTED_SCOPE != AUTHORIZED_SCOPE
```

Cambiar empresa, sede, centro, periodo, unidad o cualquier filtro solo selecciona dentro de lo autorizado; no crea cobertura adicional ni convierte un permiso local en global.

---

#### 20. Región 02 — Posición financiera

`FINANCIAL_POSITION` agrega únicamente proyecciones de lectura autorizadas y relevantes para dirección ejecutiva.

Puede componer, sin fijar todavía fórmulas ni layout definitivos:

- gastos y costos;
- punto de equilibrio;
- rentabilidad o margen;
- obligaciones y liquidez;
- cartera;
- estados de cierre;
- presupuesto y forecast;
- resultados analíticos.

Cada familia se renderiza solo cuando existe autoridad efectiva sobre sus datos.

---

#### 21. Región 03 — Atención y excepciones

`ATTENTION_AND_EXCEPTIONS` presenta señales que requieren revisión ejecutiva.

Puede incluir, cuando la lectura esté autorizada:

- diferencias pendientes de conciliación;
- obligaciones o vencimientos relevantes;
- cartera vencida o disputada;
- ciclos de cierre pendientes;
- desviaciones materiales;
- decisiones financieras pendientes;
- alertas presupuestales o de forecast;
- resultados analíticos que requieren revisión.

Mostrar una prioridad no concede permiso para resolverla.

---

#### 22. Atención ejecutiva no equivale a autoridad de aprobación

Se congela:

```text
EXECUTIVE_ATTENTION != APPROVAL_AUTHORITY
EXECUTIVE_ATTENTION != PAYMENT_AUTHORITY
EXECUTIVE_ATTENTION != RECONCILIATION_AUTHORITY
EXECUTIVE_ATTENTION != CLOSE_AUTHORITY
EXECUTIVE_ATTENTION != PLANNING_PUBLICATION_AUTHORITY
```

La existencia de una tarjeta, badge o alerta solo permite navegación cuando el drill-down también está autorizado.

---

#### 23. Liquidez, obligaciones y cartera

La dirección ejecutiva puede necesitar una lectura consolidada de capital de trabajo y exposición financiera.

La composición puede proyectar, según permiso efectivo:

- obligaciones pendientes y vencidas;
- programación o estado de pagos;
- liquidez observable;
- exposición de cartera;
- aging;
- recaudos o diferencias;
- estado agregado de tesorería.

El home no emite instrucciones de pago, no aplica recaudos, no aprueba acuerdos y no modifica cuentas bancarias.

---

#### 24. Información bancaria sensible no se eleva al home por ser ejecutivo

Los datos bancarios completos, extractos o detalles especializados definidos por `NUMERA-AUTH-014` conservan permisos sensibles independientes.

Se congela:

```text
GENERAL_MANAGER_HOME != BANK_SECRET_SURFACE
GENERAL_MANAGER_ROLE != SENSITIVE_BANK_DETAIL_PERMISSION
```

Cuando una proyección pueda satisfacerse con datos minimizados, el home no necesita revelar identificadores bancarios completos.

---

#### 25. Región 04 — Planificación y variación

`PLANNING_AND_VARIANCE` puede proyectar, según autorización:

- presupuesto vigente;
- forecast vigente;
- desviación frente al real;
- existencia de escenarios;
- estado de una versión de planificación;
- estado de solicitud, aprobación o publicación;
- diferencias relevantes frente a objetivos financieros.

La región no crea, modifica, comparte, solicita, aprueba, rechaza, publica ni retira escenarios, presupuestos, forecast o versiones de precio.

---

#### 26. Real, presupuesto, forecast y escenario permanecen separados

Se conserva:

```text
REAL != BUDGET
REAL != FORECAST
REAL != SCENARIO
BUDGET != FORECAST
FORECAST != SCENARIO
PROPOSED != APPROVED
APPROVED != PUBLISHED
```

La comparación ejecutiva no transforma una proyección en hecho real ni una aprobación en publicación.

---

#### 27. Región 05 — Estado de ciclos y conciliación

`CYCLE_AND_RECONCILIATION_STATUS` permite conocer el estado agregado de procesos financieros sin ejecutar transiciones.

La composición puede proyectar estados autorizados de:

- hechos económicos;
- conciliación de ventas y pagos;
- conciliación de compras y recepciones;
- conciliación de inventario, producción y variaciones;
- cuentas por pagar y tesorería;
- cartera;
- cierre y reapertura;
- presupuesto y forecast;
- paquete laboral para pagos y beneficios.

No crea un lifecycle alterno ni salta estados propietarios.

---

#### 28. Región 06 — Navegación financiera autorizada

`AUTHORIZED_PROCESS_NAVIGATION` ofrece handoffs hacia las superficies NUMERA existentes cuando el usuario puede ver el destino o iniciar su evaluación de acceso.

La navegación:

- no crea proceso nuevo;
- no cambia `process_id`;
- no crea una segunda fuente de verdad;
- no concede permiso por mostrar un acceso;
- no transfiere el scope del home;
- no convierte `VSCREEN-0094` en propietaria de la operación destino.

---

#### 29. Región 07 — Estado y procedencia de datos

`DATA_STATUS_AND_PROVENANCE` debe distinguir, según el dato:

```text
VALUE_CONFIRMED
VALUE_STALE
VALUE_UNKNOWN
VALUE_NOT_AVAILABLE
VALUE_NOT_AUTHORIZED
VALUE_NOT_APPLICABLE
```

Ninguno de estos estados se convierte silenciosamente en cero.

---

#### 30. Cero no equivale a ausencia ni desconocimiento

Se congela:

```text
ZERO != UNKNOWN
ZERO != NOT_AVAILABLE
ZERO != NOT_AUTHORIZED
ZERO != NOT_APPLICABLE
```

Un cálculo ausente, un error de lectura o un permiso denegado no puede mostrarse como `0 COP`, `0 %`, cero pendientes o cualquier otro valor confirmado.

---

#### 31. Frescura

El home no presentará una cifra stale como si fuera actual.

Se conserva:

```text
STALE_DATA_IS_CURRENT = NO
```

Si la fuente o el corte no permiten demostrar actualidad, el valor debe expresar su condición o dejar de presentarse como cifra vigente.

---

#### 32. Conteos, badges y severidad son datos protegidos

Un conteo de pendientes, importe acumulado, aging, severidad o existencia de una excepción puede revelar información financiera sensible.

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
BADGE_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
```

La UI no filtrará información por cantidades, colores, labels o tooltips cuando el payload subyacente no esté autorizado.

---

#### 33. Agregados y consolidación ejecutiva

La naturaleza ejecutiva del perfil no autoriza a agregar miembros que individualmente estén fuera del alcance.

Se conserva:

```text
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

Una cifra consolidada debe calcularse únicamente sobre entidades, recursos y dimensiones que el actor pueda leer conforme al contrato aplicable.

---

#### 34. Minimización de información sensible

Cuando una decisión ejecutiva pueda satisfacerse con una proyección agregada o minimizada, el home no debe exponer detalle sensible adicional por conveniencia visual.

Se conserva:

```text
EXECUTIVE_SUMMARY_MINIMIZES_SENSITIVE_DETAIL = YES
```

El drill-down sensible permanece sujeto a su permiso específico y a los controles fuertes aplicables.

---

#### 35. La 004 no define el catálogo final de indicadores

La tarea diseña el perfil de `gerente_general`, pero no absorbe:

- `NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas`;
- `NUMERA-UX-028 — Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva`.

Por tanto, no congela un número final de KPI, orden definitivo, fórmula, visualización ni layout físico.

---

#### 36. El AS-IS actual no define el home objetivo

La raíz actual de `vento-numera` exige acceso a la aplicación, consulta `numera_current_period_summary`, muestra tres métricas y cuatro accesos de módulo.

Ese estado se conserva únicamente como evidencia AS-IS.

No autoriza a concluir que:

- `numera.access` basta para leer todas las métricas;
- ausencia de dato equivale a cero;
- cuatro módulos son el catálogo objetivo del home;
- el layout actual representa la presentación final de `gerente_general`;
- el runtime actual ya materializó las 125 capacidades objetivo.

UX-004 no modifica ese código.

---

#### 37. Role override provisional no es autorización objetivo

La auditoría AS-IS registró un role override local privilegiado para `propietario` y `gerente_general`.

Se conserva:

```text
ROLE_OVERRIDE_ASIS = PROVISIONAL
ROLE_OVERRIDE_IS_TARGET_AUTHORIZATION = NO
```

La presentación `gerente_general` deberá resolverse desde autoridad efectiva real o simulación gobernada, nunca desde un bypass nominal oculto.

---

#### 38. Proceso VPROC-0010 — paquete laboral para pagos

El home puede exponer únicamente una proyección autorizada del estado financiero del paquete laboral.

Handoff de detalle:

```text
VSCREEN-0153 — Paquete laboral para pagos y beneficios
```

No decide novedades laborales, no sustituye ANIMA o VISO y no ejecuta pagos.

---

#### 39. Proceso VPROC-0051 — hechos económicos y conciliación

El home puede resumir, según lectura efectiva:

- recepción o clasificación de hechos;
- cobertura de conciliación;
- diferencias relevantes;
- documentos fiscales asociados.

Handoffs canónicos:

```text
VSCREEN-0095
VSCREEN-0096
VSCREEN-0101
VSCREEN-0102
VSCREEN-0154
```

---

#### 40. Proceso VPROC-0052 — obligaciones, pagos y tesorería

El home puede resumir estados autorizados de obligación, vencimiento, pago, liquidez, tesorería o cumplimiento.

Handoffs canónicos:

```text
VSCREEN-0097
VSCREEN-0098
VSCREEN-0100
VSCREEN-0155
VSCREEN-0157
```

Ningún acceso desde el inicio ejecuta aprobación, instrucción de pago o movimiento de tesorería.

---

#### 41. Proceso VPROC-0053 — cartera

El home puede proyectar estado autorizado de cartera, aging, vencimiento, recaudo o diferencia.

Handoff canónico:

```text
VSCREEN-0099
```

No registra acuerdos, aplica pagos, aprueba crédito, castiga saldos ni resuelve disputas inline.

---

#### 42. Proceso VPROC-0054 — costos, rentabilidad, distribución y cierre

El home puede proyectar resultados autorizados de costo, rentabilidad, variación, cierre y distribución.

Handoffs canónicos:

```text
VSCREEN-0103
VSCREEN-0104
VSCREEN-0105
VSCREEN-0158
```

No ejecuta conciliación, distribución, cierre o reapertura inline.

---

#### 43. Proceso VPROC-0061 — medición, análisis y mejora

`VSCREEN-0094` pertenece a `VPROC-0061` y utiliza este proceso como eje de lectura ejecutiva.

Handoffs adicionales:

```text
VSCREEN-0106
VSCREEN-0159
```

El home presenta resultados, señales y trazabilidad; no convierte análisis en causalidad automática ni ejecuta el plan de mejora desde el resumen.

---

#### 44. Proceso VPROC-0069 — presupuesto, escenarios y forecast

El home puede presentar proyecciones autorizadas del ciclo presupuestal y sus comparaciones.

Handoff canónico:

```text
VSCREEN-0156
```

Toda mutación de planificación permanece fuera de `VSCREEN-0094`.

---

#### 45. Cobertura exacta de procesos

La composición reconoce exactamente los siete procesos propietarios de NUMERA:

| Proceso | Familia visible desde el home | Handoff de detalle |
| --- | --- | --- |
| `VPROC-0010` | paquete laboral financiero | `VSCREEN-0153` |
| `VPROC-0051` | hechos económicos y conciliación | `VSCREEN-0095`, `0096`, `0101`, `0102`, `0154` |
| `VPROC-0052` | obligaciones, pagos y tesorería | `VSCREEN-0097`, `0098`, `0100`, `0155`, `0157` |
| `VPROC-0053` | cartera | `VSCREEN-0099` |
| `VPROC-0054` | costos, rentabilidad, distribución y cierre | `VSCREEN-0103`, `0104`, `0105`, `0158` |
| `VPROC-0061` | medición, análisis y mejora | `VSCREEN-0094`, `0106`, `0159` |
| `VPROC-0069` | presupuesto, escenarios y forecast | `VSCREEN-0156` |

Resultado:

```text
GENERAL_MANAGER_HOME_PROCESS_COUNT = 7
GENERAL_MANAGER_HOME_PROCESS_MISSING_COUNT = 0
GENERAL_MANAGER_HOME_PROCESS_DUPLICATE_COUNT = 0
```

---

#### 46. Cobertura exacta de las veinte pantallas NUMERA

El home conserva la identidad de las veinte pantallas objetivo:

| Pantalla | Relación con el home de gerente general | Comando inline |
| --- | --- | --- |
| `VSCREEN-0094` | `HOME` | no |
| `VSCREEN-0095` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0096` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0097` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0098` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0099` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0100` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0101` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0102` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0103` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0104` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0105` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0106` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0153` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0154` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0155` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0156` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0157` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0158` | `AUTHORIZED_DRILLDOWN` | no |
| `VSCREEN-0159` | `AUTHORIZED_DRILLDOWN` | no |

Resultado:

```text
GENERAL_MANAGER_HOME_TARGET_SCREEN_COUNT = 20
GENERAL_MANAGER_HOME_HOME_SCREEN_COUNT = 1
GENERAL_MANAGER_HOME_DRILLDOWN_SCREEN_COUNT = 19
GENERAL_MANAGER_HOME_INLINE_COMMAND_SCREEN_COUNT = 0
GENERAL_MANAGER_HOME_SCREEN_MISSING_COUNT = 0
GENERAL_MANAGER_HOME_SCREEN_DUPLICATE_COUNT = 0
```

---

#### 47. La cobertura de veinte pantallas no obliga a mostrar veinte accesos

La matriz anterior conserva identidad y posibilidad de handoff; no ordena que todas las pantallas aparezcan simultáneamente en el home.

La visibilidad de cada acceso depende de:

- permiso efectivo;
- scope aplicable;
- relevancia contextual;
- estado del recurso;
- arquitectura de navegación aplicable;
- tareas UX posteriores.

---

#### 48. Drill-down no es autorización

Un enlace, tarjeta o CTA de navegación no prueba autoridad sobre la pantalla destino.

Se conserva:

```text
NAVIGATION_VISIBILITY != COMMAND_AUTHORIZATION
DRILLDOWN != SIDE_EFFECT
```

La pantalla destino revalida sus lecturas y comandos.

---

#### 49. Flujo hacia operación

Cuando el gerente general necesita ejecutar una acción:

```text
VSCREEN_0094
-> AUTHORIZED_DRILLDOWN
-> COMMAND_CAPABLE_TARGET_SCREEN
-> ACTION_SELECTION
-> SERVER_REVALIDATION
-> ALLOW_OR_DENY
```

La revalidación utiliza actor, permiso, scope, recurso, sensibilidad, estado y versión actuales.

---

#### 50. Persistencia de contexto durante navegación

El handoff puede conservar filtros de lectura como organización, sede, centro, periodo o recurso cuando el destino los admite.

Se conserva:

```text
CONTEXT_HANDOFF != AUTHORITY_HANDOFF
```

La superficie destino vuelve a resolver autorización.

---

#### 51. Frontera frente al propietario

La presentación `gerente_general` puede compartir la arquitectura de lectura y, bajo permisos efectivos iguales, parte o toda la proyección financiera del propietario.

No comparte por inferencia:

- capacidades futuras reservadas de propietario;
- administración de propietarios;
- gobierno de la arquitectura de autorización;
- recuperación de seguridad;
- secretos o autoridad técnica privilegiada;
- excepciones destructivas reservadas.

Se conserva:

```text
GENERAL_MANAGER_HOME_IS_OWNER_HOME = NO
GENERAL_MANAGER_HOME_INHERITS_OWNER_AUTHORITY = NO
```

---

#### 52. Frontera frente al gerente de sede

`NUMERA-UX-005` diseñará una presentación territorialmente limitada.

UX-004 no convierte `G(B)` histórico de `gerente_general` en una regla reutilizable por `gerente`.

La matriz histórica del gerente de sede usa `AS/ORG-LOCAL` para las cinco lecturas financieras NUMERA y prohíbe consolidado organizacional global por esa vía.

Se conserva:

```text
GENERAL_MANAGER_EXECUTIVE_SCOPE != SITE_MANAGER_TERRITORIAL_SCOPE
```

---

#### 53. Frontera frente a contador y auxiliar autorizada

`NUMERA-UX-006` y `NUMERA-UX-007` diseñarán presentaciones funcionales financieras o administrativas específicas.

UX-004 no presume que contador o auxiliar deban recibir:

- la misma amplitud organizacional;
- los mismos módulos;
- los mismos drill-downs;
- las mismas prioridades de lectura;
- la misma capacidad de decisión.

---

#### 54. Presentación ejecutiva no agrega permisos operativos

`gerente_general` puede tener responsabilidades ejecutivas amplias, pero no obtiene por este home los permisos `OPERATIONAL_ONLY` ni componentes operativos faltantes.

Se conserva:

```text
EXECUTIVE_MANAGEMENT != OPERATIONAL_ROLE
```

Cuando una acción requiera rol operativo, turno, check-in u otro contexto especializado, esa exigencia permanece en la superficie propietaria.

---

#### 55. Accesibilidad semántica

La implementación futura deberá expresar sin depender únicamente de color:

- dato confirmado;
- advertencia;
- stale;
- no disponible;
- no autorizado;
- real;
- presupuestado;
- forecast;
- escenario;
- propuesto;
- aprobado;
- publicado.

UX-004 no fija componentes visuales concretos.

---

#### 56. Estados de carga y cambio de contexto

La carga del home no debe mostrar una cifra del contexto anterior como si correspondiera al nuevo contexto.

Se conserva:

```text
CONTEXT_CHANGED_WITH_STALE_VISIBLE_VALUE = FORBIDDEN
```

La UI debe distinguir carga, dato stale y dato confirmado.

---

#### 57. Seguridad frente a caché de autorización

Una lectura previamente autorizada no se considera vigente después de un cambio material de contexto, permiso, recurso o estado que exija reevaluación.

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

---

#### 58. Observabilidad mínima del diseño futuro

La implementación deberá poder distinguir en telemetría, sin registrar payload financiero sensible innecesario:

- home cargado;
- región disponible;
- región denegada;
- región con error técnico;
- drill-down iniciado;
- handoff hacia pantalla destino;
- comando denegado o permitido en la superficie destino.

La telemetría no se materializa en esta tarea.

---

#### 59. Relación con NUMERA-UX-005

`NUMERA-UX-005` diseñará el inicio de `gerente` de sede.

Recibe de esta tarea una separación explícita:

```text
GENERAL_MANAGER_EXECUTIVE_SCOPE != SITE_MANAGER_TERRITORIAL_SCOPE
G(B) != AS/ORG-LOCAL
```

La 005 deberá conservar una composición financiera local sin inferir consolidación organizacional global.

---

#### 60. Relación con NUMERA-UX-008 y NUMERA-UX-028

La 004 define quién puede ver qué tipo de composición ejecutiva y bajo qué límites, pero no decide todavía la presentación final indicador-versus-tabla ni el visor económico dinámico.

Se conserva:

```text
ROLE_HOME_ARCHITECTURE != FINAL_KPI_PRESENTATION
ROLE_HOME_ARCHITECTURE != FINAL_ECONOMIC_VIEWER_LAYOUT
```

---

#### 61. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- especializa una experiencia ya protegida por requisitos financieros, autorización y navegación vigentes;
- no crea nueva conducta ejecutable;
- no crea proceso, pantalla, permiso, dato ni transición nueva;
- no modifica requisitos existentes;
- la materialización y pruebas ejecutables permanecen en las unidades y paquetes posteriores que consuman este contrato.

```text
REQUISITOS_CREADOS = 0
REQUISITOS_MODIFICADOS = 0
TREQ_CHANGES = 0
```

---

#### 62. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente asociada a:

- `TREQ-NUMERA-001..024`;
- `TREQ-PROC-001`;
- `TREQ-PROC-009..017`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-015`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-017`.

Esta lista es trazabilidad y no constituye una actualización del Registro 04A.

---

#### 63. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la batería global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | se verificaron `vento-shell/main@97378673fa349222900b3cf9a127a4db45c7477a`, secuencia activa con `NUMERA-UX-003` como anterior, archivo propietario, topología, políticas documentales, `AUTH-RBAC-002`, autorización NUMERA hasta `NUMERA-AUTH-015`, catálogo de veinte pantallas, Registro 04A aplicable y el estado AS-IS verificable de la raíz de `vento-numera` |
| OPERATIVA | NOT_APPLICABLE | la tarea no ejecuta pagos, aprobaciones, conciliaciones, cierres, cartera, presupuestos ni otras operaciones financieras reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados |

---

#### 64. Criterios de aceptación

- [ ] se define exactamente un contrato `NUMERA-GENERAL-MANAGER-HOME-001`;
- [ ] el home usa `VSCREEN-0094` y no crea un `VSCREEN-*` nuevo;
- [ ] `VSCREEN-0094` permanece `MONITOR` / `CROSS_CUTTING`;
- [ ] la presentación `gerente_general` no se convierte en wildcard, propietario, service role ni bypass;
- [ ] se preservan las seis claves NUMERA históricamente asignadas a `gerente_general` sin extrapolarlas;
- [ ] se reconocen cinco lecturas históricas `G(B)` sin convertir el nombre del rol en scope universal;
- [ ] las capacidades NUMERA posteriores no se conceden automáticamente;
- [ ] se distingue el universo objetivo de 125 capacidades del estado de materialización compartida de 6 presentes y 119 pendientes documentado por AUTH-015;
- [ ] el inicio usa permisos efectivos y no el nombre del rol como fuente de autoridad;
- [ ] no se hereda gobierno reservado de propietario;
- [ ] el plano por defecto es `EXECUTIVE_READ_PLANE`;
- [ ] existen cero comandos financieros inline;
- [ ] se reutilizan siete regiones lógicas como arquitectura común sin copiar autoridad de propietario;
- [ ] la presentación prioriza posición financiera, atención ejecutiva, ciclos, liquidez y variación dentro de lo autorizado;
- [ ] se cubren exactamente siete procesos propietarios NUMERA;
- [ ] se cubren exactamente veinte pantallas objetivo;
- [ ] existe una pantalla home y diecinueve destinos de drill-down;
- [ ] la matriz de veinte pantallas no obliga a mostrar veinte accesos simultáneos;
- [ ] ningún drill-down transfiere autoridad de comando;
- [ ] los comandos se reautorizan en la superficie destino;
- [ ] `numera.access` no autoriza métricas;
- [ ] conteos, badges y agregados respetan autorización;
- [ ] cero, desconocido, no disponible, no autorizado y no aplicable permanecen diferenciados;
- [ ] un valor stale no se presenta como actual;
- [ ] real, presupuesto, forecast y escenario permanecen separados;
- [ ] la información bancaria sensible conserva minimización y permiso especializado;
- [ ] el role override AS-IS no se trata como autorización objetivo;
- [ ] el home no duplica fuentes operativas;
- [ ] `NUMERA-UX-005`, `NUMERA-UX-008` y `NUMERA-UX-028` conservan su alcance posterior;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos.

---

#### 65. Límites

Esta tarea no:

- diseña el inicio del propietario;
- diseña el inicio del gerente de sede;
- diseña el inicio del contador;
- diseña el inicio de la auxiliar autorizada;
- redefine la matriz RBAC de `gerente_general`;
- asigna capacidades NUMERA nuevas a `gerente_general`;
- asigna capacidades reservadas de propietario;
- define el catálogo final de indicadores;
- decide fórmulas nuevas;
- decide el orden definitivo indicador-versus-tabla;
- diseña el visor económico dinámico de `NUMERA-UX-028`;
- crea pantallas;
- crea rutas;
- crea componentes React;
- modifica navegación runtime;
- crea permisos;
- crea grants o denies;
- crea procesos;
- cambia estados de proceso;
- implementa pagos;
- implementa conciliaciones;
- implementa cierres;
- implementa cartera;
- implementa planificación;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-005`.

---

#### 66. Handoff a NUMERA-UX-005

La siguiente tarea recibe:

```text
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
GENERAL_MANAGER_HOME_SCREEN_ID = VSCREEN-0094
GENERAL_MANAGER_HOME_PRESENTATION_PROFILE = gerente_general
GENERAL_MANAGER_HOME_PRIMARY_PLANE = EXECUTIVE_READ_PLANE
GENERAL_MANAGER_HOME_INLINE_FINANCIAL_COMMANDS = 0
GENERAL_MANAGER_HOME_REGION_COUNT = 7
GENERAL_MANAGER_HOME_PROCESS_COUNT = 7
GENERAL_MANAGER_HOME_TARGET_SCREEN_COUNT = 20
GENERAL_MANAGER_HOME_HOME_SCREEN_COUNT = 1
GENERAL_MANAGER_HOME_DRILLDOWN_SCREEN_COUNT = 19
GENERAL_MANAGER_HOME_SCREEN_MISSING_COUNT = 0
GENERAL_MANAGER_HOME_SCREEN_DUPLICATE_COUNT = 0
GENERAL_MANAGER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
GENERAL_MANAGER_HISTORICAL_NUMERA_GB_READ_COUNT = 5
GENERAL_MANAGER_NEW_PERMISSION_AUTO_GRANT = NO
GENERAL_MANAGER_INHERITS_OWNER_RESERVED_GOVERNANCE = NO
GENERAL_MANAGER_ROLE_IS_SCOPE = NO
GENERAL_MANAGER_EXECUTIVE_SCOPE_IS_SITE_MANAGER_SCOPE = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
NUMERA_GENERAL_MANAGER_HOME_IS_VISO_EXECUTIVE_HOME = NO
UX_005_OWNER = SITE_MANAGER_HOME
TREQ_CHANGES = 0
```

`NUMERA-UX-005` deberá diseñar una presentación local con alcance territorial explícito, consumiendo `AS/ORG-LOCAL` y los permisos efectivos aplicables sin degradar la separación entre alcance ejecutivo global y autoridad de sede.

---

#### 67. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-003 — Diseñar inicio para propietario`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-004 — Diseñar inicio para gerente general`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-005 — Diseñar inicio para gerente de sede`
### ✅ NUMERA-UX-005 — Diseñar inicio para gerente de sede

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-004 — Diseñar inicio para gerente general
**Tarea siguiente:** NUMERA-UX-006 — Diseñar inicio para contador
**Tipo de tarea:** definición documental del inicio financiero de NUMERA para la presentación administrativa `gerente` descrita funcionalmente como gerente de sede, reutilizando `VSCREEN-0094` y la arquitectura común del `EXECUTIVE_READ_PLANE` donde resulte válida, limitando toda composición a sedes, áreas y recursos organizacionales locales expresamente autorizados, sin convertir la sede seleccionada o primaria en autoridad, sin producir consolidación organizacional global, sin conceder capacidades nuevas por inferencia y sin anticipar el diseño especializado del contador; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes React, permisos, roles, grants, asignaciones territoriales, procesos, estados, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, reportes, conciliaciones, pagos, cierres, presupuestos, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el inicio financiero de NUMERA para una persona cuyo rol base administrativo sea `gerente`, responsable de una o varias sedes expresamente asignadas, de forma que pueda comprender la posición económica local autorizada, detectar desviaciones y asuntos que requieren atención, revisar ciclos financieros relacionados con su cobertura y navegar al detalle correspondiente sin obtener por la interfaz autoridad sobre sedes no asignadas ni consolidación organizacional global.

El resultado debe servir como contrato de experiencia para la futura materialización de `VSCREEN-0094 — Inicio financiero y ejecutivo` bajo la presentación de gerente de sede y como frontera explícita frente a `gerente_general`, contador y auxiliar autorizada.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato UX documental;
- no crea instancia física propia;
- no modifica `vento-numera`;
- no modifica `vento-shell` fuera de su bloque documental cuando sea incorporada;
- no materializa permisos ni asignaciones territoriales;
- no modifica matrices RBAC;
- no crea una ruta nueva;
- no ejecuta side effects financieros;
- no cambia datos de Supabase.

---

#### 3. Handoff recibido de NUMERA-UX-004

La predecesora aprobada entrega:

```text
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
GENERAL_MANAGER_HOME_SCREEN_ID = VSCREEN-0094
GENERAL_MANAGER_HOME_PRESENTATION_PROFILE = gerente_general
GENERAL_MANAGER_HOME_PRIMARY_PLANE = EXECUTIVE_READ_PLANE
GENERAL_MANAGER_HOME_INLINE_FINANCIAL_COMMANDS = 0
GENERAL_MANAGER_HOME_REGION_COUNT = 7
GENERAL_MANAGER_HOME_PROCESS_COUNT = 7
GENERAL_MANAGER_HOME_TARGET_SCREEN_COUNT = 20
GENERAL_MANAGER_HOME_HOME_SCREEN_COUNT = 1
GENERAL_MANAGER_HOME_DRILLDOWN_SCREEN_COUNT = 19
GENERAL_MANAGER_HOME_SCREEN_MISSING_COUNT = 0
GENERAL_MANAGER_HOME_SCREEN_DUPLICATE_COUNT = 0
GENERAL_MANAGER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
GENERAL_MANAGER_HISTORICAL_NUMERA_GB_READ_COUNT = 5
GENERAL_MANAGER_NEW_PERMISSION_AUTO_GRANT = NO
GENERAL_MANAGER_INHERITS_OWNER_RESERVED_GOVERNANCE = NO
GENERAL_MANAGER_ROLE_IS_SCOPE = NO
GENERAL_MANAGER_EXECUTIVE_SCOPE_IS_SITE_MANAGER_SCOPE = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
NUMERA_GENERAL_MANAGER_HOME_IS_VISO_EXECUTIVE_HOME = NO
UX_005_OWNER = SITE_MANAGER_HOME
TREQ_CHANGES = 0
```

La 005 consume este handoff sin convertir el alcance ejecutivo de `gerente_general` en alcance territorial de `gerente`.

---

#### 4. Contrato producido

La tarea define:

```text
NUMERA-SITE-MANAGER-HOME-001
```

con la identidad funcional:

```text
SCREEN_ID = VSCREEN-0094
SCREEN_NAME = Inicio financiero y ejecutivo
PRESENTATION_PROFILE = gerente
PRESENTATION_LABEL = gerente de sede
PRIMARY_PLANE = EXECUTIVE_READ_PLANE
TERRITORIAL_SCOPE_MODEL = EFFECTIVE_PERMISSION_INTERSECT_ACTIVE_ASSIGNMENTS_INTERSECT_RESOURCE_SCOPE
INLINE_FINANCIAL_COMMANDS = 0
COMMAND_HANDOFF = EXPLICIT_TO_CANONICAL_TARGET_SCREEN
AUTHORIZATION_SOURCE = EFFECTIVE_PERMISSION_SET
ROLE_NAME_GRANTS_AUTHORITY = NO
GLOBAL_CONSOLIDATION_ALLOWED_BY_ROLE_NAME = NO
```

---

#### 5. Identidad de la superficie

El inicio del gerente de sede no crea una pantalla nueva.

Se conserva:

```text
SITE_MANAGER_HOME_SCREEN_ID = VSCREEN-0094
```

`VSCREEN-0094` continúa vinculado a:

```text
VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION
PRIMARY_ACTION = MONITOR
STEP_PHASE = CROSS_CUTTING
```

La diferencia entre presentaciones se resuelve por permisos, alcance y composición autorizada; no mediante una identidad de pantalla paralela.

---

#### 6. NUMERA no sustituye el inicio ejecutivo transversal de VISO

La presentación de gerente de sede dentro de NUMERA se limita a información económica, financiera, de conciliación, planificación y análisis relacionada con su cobertura administrativa autorizada.

Se congela:

```text
NUMERA_SITE_MANAGER_HOME
!= VISO_EXECUTIVE_HOME
!= VENTO_OS_GLOBAL_HOME
```

VISO conserva la experiencia ejecutiva transversal correspondiente. NUMERA no absorbe personas, riesgos empresariales, tecnología, comercial u operación física por el solo hecho de que exista una consecuencia financiera local.

---

#### 7. Significado de `gerente` en esta tarea

El título funcional es gerente de sede y el código de rol base canónico consumido es:

```text
gerente
```

`gerente` representa administración integral de una o varias sedes expresamente asignadas, no dirección ejecutiva global.

Se conserva:

```text
gerente != gerente_general
gerente != todas_las_sedes
gerente != permiso_global
gerente != service_role
gerente != operational_bypass
gerente != APP_REVIEW_ACCESS
```

---

#### 8. Matriz RBAC histórica que sí puede darse por conocida

La matriz canónica de `gerente` evaluó un catálogo histórico de 112 permisos y asignó explícitamente seis claves NUMERA:

```text
numera.access
numera.finance.cost_centers.view
numera.finance.expenses.view
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Estas seis claves son evidencia histórica de asignación base para el rol.

No autorizan por sí solas capacidades creadas después de esa matriz.

---

#### 9. Alcance histórico de las seis claves NUMERA

La entrada a aplicación usa:

```text
numera.access -> NT-APP
```

Las cinco lecturas financieras históricas usan:

```text
AS/ORG-LOCAL
```

Resultado:

```text
SITE_MANAGER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
SITE_MANAGER_HISTORICAL_NUMERA_LOCAL_READ_COUNT = 5
SITE_MANAGER_HISTORICAL_NUMERA_GLOBAL_READ_COUNT = 0
```

Las cinco lecturas se limitan a información de sedes asignadas o de unidades de negocio exactas vinculadas con ellas; nunca producen consolidado organizacional global.

---

#### 10. Las capacidades NUMERA posteriores no se conceden automáticamente

Después de la matriz histórica, el contrato NUMERA alcanzó:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_SHARED_PERMISSION_MATERIALIZED_COUNT = 6
NUMERA_SHARED_PERMISSION_PENDING_COUNT = 119
```

La regla vigente para `gerente` exige:

```text
NEW_PERMISSION_AUTO_GRANTED_TO_SITE_MANAGER = NO
```

Toda capacidad NUMERA posterior a la matriz de 112 permisos permanece denegada para este rol mientras no exista una decisión canónica expresa que la conceda con alcance compatible.

---

#### 11. Invariante principal del inicio

El home del gerente de sede es una composición de lectura territorial.

```text
SITE_MANAGER_HOME_DEFAULT = READ
SITE_MANAGER_HOME_GLOBAL_CONSOLIDATION = FORBIDDEN
SITE_MANAGER_HOME_INLINE_MUTATION = FORBIDDEN
SITE_MANAGER_HOME_INLINE_APPROVAL = FORBIDDEN
SITE_MANAGER_HOME_INLINE_PAYMENT = FORBIDDEN
SITE_MANAGER_HOME_INLINE_RECONCILIATION = FORBIDDEN
SITE_MANAGER_HOME_INLINE_CLOSE = FORBIDDEN
SITE_MANAGER_HOME_INLINE_REOPEN = FORBIDDEN
SITE_MANAGER_HOME_INLINE_WRITE_OFF = FORBIDDEN
SITE_MANAGER_HOME_INLINE_EXPORT = FORBIDDEN
SITE_MANAGER_HOME_INLINE_PLANNING_MUTATION = FORBIDDEN
```

Una navegación hacia una superficie capaz de operar no convierte `VSCREEN-0094` en superficie de comando.

---

#### 12. Objetivo de decisión humana

La pantalla debe permitir responder, dentro de la cobertura local autorizada:

- cuál es la posición económica de las sedes o unidades locales autorizadas;
- qué sede autorizada concentra desviaciones o asuntos que requieren atención;
- qué ciclos financieros locales están abiertos, pendientes, conciliados o cerrados;
- dónde existen diferencias entre real, presupuesto, forecast o escenario cuando su lectura está autorizada;
- qué obligación, cartera, costo, conciliación o indicador requiere un drill-down;
- si la información observada está vigente, completa y trazable.

La pantalla no puede responder con cifras de sedes no autorizadas ni convertir una ausencia de autorización en un agregado aparente de toda la organización.

---

#### 13. Arquitectura lógica del inicio

`NUMERA-SITE-MANAGER-HOME-001` reutiliza siete regiones lógicas:

```text
SITE_MANAGER_HOME_REGION_01 = CONTEXT_AND_TERRITORIAL_SCOPE
SITE_MANAGER_HOME_REGION_02 = LOCAL_FINANCIAL_POSITION
SITE_MANAGER_HOME_REGION_03 = LOCAL_ATTENTION_AND_EXCEPTIONS
SITE_MANAGER_HOME_REGION_04 = LOCAL_PLANNING_AND_VARIANCE
SITE_MANAGER_HOME_REGION_05 = LOCAL_CYCLE_AND_RECONCILIATION_STATUS
SITE_MANAGER_HOME_REGION_06 = AUTHORIZED_LOCAL_PROCESS_NAVIGATION
SITE_MANAGER_HOME_REGION_07 = DATA_STATUS_AND_PROVENANCE
SITE_MANAGER_HOME_REGION_COUNT = 7
```

Son regiones funcionales, no nombres obligatorios de componentes React ni decisiones de layout físico.

---

#### 14. Región 01 — Contexto y alcance territorial

El inicio debe declarar el contexto con el que se interpretan las cifras.

Cuando corresponda, la composición deberá poder identificar:

- sede o conjunto de sedes activamente autorizadas;
- área cuando el recurso sea realmente de nivel área;
- unidad de negocio local relacionada cuando el recurso sea `ORG-LOCAL`;
- periodo o fecha de corte;
- moneda;
- recurso o dimensión consultada;
- estado de vigencia o frescura.

La presentación del contexto no crea autoridad.

---

#### 15. La cobertura potencial nace de asignaciones activas

La matriz canónica establece que `AS` se resuelve desde asignaciones activas de sede, incluida la fuente laboral canónica representada por `employee_sites`, y no desde preferencias de interfaz.

Se congela:

```text
ACTIVE_SITE_ASSIGNMENT = POTENTIAL_TERRITORIAL_COVERAGE
ACTIVE_SITE_ASSIGNMENT != PERMISSION
```

La autorización final requiere además permiso efectivo y recurso compatible.

---

#### 16. Sede seleccionada no es sede autorizada

Se congela:

```text
SELECTED_SITE != AUTHORIZED_SITE
```

Un selector de sede solo puede elegir dentro de la cobertura autorizada. No puede ampliar `AS`, incorporar otra sede ni transformar un recurso no autorizado en recurso visible.

---

#### 17. Sede primaria no es alcance autorizado

Se congela:

```text
PRIMARY_SITE != AUTHORIZED_SCOPE
```

La sede primaria puede servir como preferencia inicial de experiencia, pero no reemplaza las asignaciones activas ni autoriza una consulta financiera.

---

#### 18. Varias sedes asignadas no equivalen a alcance global

Un gerente puede tener una o varias sedes activamente asignadas.

Se conserva:

```text
UNION_OF_ASSIGNED_SITES != GLOBAL_SCOPE
```

Una vista multisede representa únicamente la unión de territorios individualmente autorizados. No incorpora sedes futuras, no asignadas, de prueba, APP-REVIEW ni otros dominios aislados.

---

#### 19. Recursos `ORG-LOCAL`

Un recurso organizacional no territorial puede aparecer en el home solo cuando exista una relación verificable con las unidades de negocio servidas por las sedes autorizadas.

Se congela:

```text
ORG_LOCAL_RELATION_REQUIRED = YES
ORG_LOCAL != ORGANIZATION_WIDE
```

La relación con el negocio se resuelve desde el recurso y su contrato; no se inventa desde la sede seleccionada.

---

#### 20. Región 02 — Posición financiera local

`LOCAL_FINANCIAL_POSITION` agrega únicamente proyecciones de lectura autorizadas dentro de `AS`, `AA` u `ORG-LOCAL` aplicable.

Puede componer, cuando exista autoridad de lectura:

- gastos y costos locales;
- punto de equilibrio local;
- rentabilidad o margen local;
- obligaciones y liquidez relacionadas;
- cartera relacionada;
- presupuesto y forecast locales;
- estados de cierre;
- resultados analíticos locales.

La pertenencia a una sede debe poder demostrarse por el contrato del recurso.

---

#### 21. El home no produce consolidación organizacional global

Se congela:

```text
SITE_MANAGER_HOME_GLOBAL_TOTAL = FORBIDDEN
```

Una suma, promedio, ratio, tendencia o comparación debe calcularse únicamente sobre miembros individualmente autorizados.

Si el usuario tiene dos sedes autorizadas, el agregado puede cubrir esas dos sedes. No puede incorporar una tercera sede no autorizada para completar un total corporativo.

---

#### 22. Región 03 — Atención y excepciones locales

`LOCAL_ATTENTION_AND_EXCEPTIONS` presenta señales de lectura relacionadas con la cobertura autorizada.

Puede incluir, cuando corresponda:

- diferencias pendientes de conciliación local;
- obligaciones o vencimientos relacionados;
- cartera vencida o disputada relacionada;
- ciclos de cierre pendientes;
- desviaciones materiales locales;
- alertas de presupuesto o forecast;
- resultados analíticos que requieren revisión.

Mostrar una señal no concede autoridad para resolverla.

---

#### 23. Conteos y badges también respetan territorio

Un contador, importe acumulado, severidad o indicador de existencia puede revelar información de una sede no autorizada.

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
BADGE_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
COUNT_MEMBERS_REQUIRE_TERRITORIAL_AUTHORITY = YES
```

Los conteos no pueden incluir filas ocultas por falta de autoridad.

---

#### 24. Región 04 — Planificación y variación local

`LOCAL_PLANNING_AND_VARIANCE` puede proyectar, según autorización:

- presupuesto vigente local;
- forecast vigente local;
- desviación frente al real local;
- existencia de escenarios relacionados;
- estado de una versión de planificación;
- estado de aprobación o publicación.

La región no crea, modifica, comparte, solicita, aprueba, rechaza, publica ni retira escenarios, presupuestos, forecast o versiones de precio.

---

#### 25. Real, presupuesto, forecast y escenario permanecen separados

Se conserva:

```text
REAL != BUDGET
REAL != FORECAST
REAL != SCENARIO
BUDGET != FORECAST
FORECAST != SCENARIO
PROPOSED != APPROVED
APPROVED != PUBLISHED
```

Una comparación local no transforma una proyección en hecho real ni amplía su territorio.

---

#### 26. Región 05 — Estado local de ciclos y conciliación

`LOCAL_CYCLE_AND_RECONCILIATION_STATUS` permite conocer el estado agregado de procesos financieros relacionados con la cobertura del gerente, sin ejecutar transiciones.

Puede proyectar estados autorizados de:

- hechos económicos y conciliación;
- cuentas por pagar y tesorería;
- cartera;
- costos y cierre;
- presupuesto y forecast;
- paquete laboral para pagos y beneficios;
- medición y mejora.

No crea un lifecycle alterno.

---

#### 27. Relaciones entre sedes no transfieren autoridad

Un recurso puede relacionar varias sedes.

Se conserva:

```text
RELATED_TO_AUTHORIZED_SITE != AUTHORIZED_OVER_ALL_ENDPOINTS
```

Una lectura puede mostrar el recurso cuando el contrato `AS-REL` u otro equivalente lo permita, pero una sede autorizada no concede autoridad general sobre la sede opuesta ni habilita mutaciones sobre ella.

---

#### 28. Región 06 — Navegación financiera local autorizada

`AUTHORIZED_LOCAL_PROCESS_NAVIGATION` ofrece handoffs hacia superficies canónicas existentes.

La navegación:

- no crea un proceso nuevo;
- no cambia `process_id`;
- no crea una segunda fuente de verdad;
- no concede permiso por mostrar un acceso;
- no extiende el territorio;
- no convierte `VSCREEN-0094` en propietaria de las operaciones destino.

---

#### 29. Región 07 — Estado y procedencia de datos

`DATA_STATUS_AND_PROVENANCE` debe poder distinguir, según el dato:

```text
VALUE_CONFIRMED
VALUE_STALE
VALUE_UNKNOWN
VALUE_NOT_AVAILABLE
VALUE_NOT_AUTHORIZED
VALUE_NOT_APPLICABLE
VALUE_OUTSIDE_TERRITORIAL_SCOPE
```

Ninguno de estos estados se convierte silenciosamente en cero.

---

#### 30. Cero no equivale a ausencia, desconocimiento o falta de autoridad

Se congela:

```text
ZERO != UNKNOWN
ZERO != NOT_AVAILABLE
ZERO != NOT_AUTHORIZED
ZERO != NOT_APPLICABLE
ZERO != OUTSIDE_TERRITORIAL_SCOPE
```

Una sede fuera del alcance no puede contribuir como cero a un agregado, ya que eso revelaría o deformaría información empresarial.

---

#### 31. Trazabilidad mínima de una cifra económica

Cuando una cifra pertenezca a costo, distribución, presupuesto, forecast, equilibrio o rentabilidad, la experiencia debe conservar capacidad de navegar hacia su contexto de cálculo aprobado.

Como mínimo, cuando aplique, se conserva:

- método;
- entradas;
- versión;
- vigencia;
- entidad;
- sede;
- centro;
- periodo;
- fuente.

La 005 no diseña todavía la divulgación visual final de estos detalles.

---

#### 32. Frescura

La pantalla inicial no presentará una cifra stale como si fuera actual.

Se conserva:

```text
STALE_DATA_IS_CURRENT = NO
```

Un cambio de sede o conjunto territorial invalida cualquier valor anterior que todavía no haya sido reconsultado para el nuevo contexto.

---

#### 33. Proceso VPROC-0010 — paquete laboral para pagos

El inicio puede exponer únicamente una proyección financiera autorizada del paquete laboral relacionada con trabajadores o unidades dentro de la cobertura administrativa permitida.

Handoff de detalle:

```text
VSCREEN-0153 — Paquete laboral para pagos y beneficios
```

La pantalla inicial no decide novedades laborales, no sustituye VISO o ANIMA y no ejecuta pagos.

---

#### 34. Proceso VPROC-0051 — hechos económicos y conciliación

El inicio puede resumir, según lectura efectiva y territorio:

- recepción o clasificación de hechos relacionados;
- cobertura de conciliación local;
- diferencias relevantes;
- documentos fiscales asociados.

Handoffs canónicos:

```text
VSCREEN-0095
VSCREEN-0096
VSCREEN-0101
VSCREEN-0102
VSCREEN-0154
```

---

#### 35. Proceso VPROC-0052 — obligaciones, pagos y tesorería

El inicio puede resumir estados autorizados de obligación, vencimiento, pago, liquidez, tesorería o cumplimiento vinculados con recursos locales autorizados.

Handoffs canónicos:

```text
VSCREEN-0097
VSCREEN-0098
VSCREEN-0100
VSCREEN-0155
VSCREEN-0157
```

Ningún acceso desde el home ejecuta aprobación o pago.

---

#### 36. Proceso VPROC-0053 — cartera

El inicio puede proyectar estado autorizado de cartera, aging, vencimiento, recaudo o diferencia vinculada con la cobertura local.

Handoff canónico:

```text
VSCREEN-0099
```

No registra acuerdos, aplica pagos, castiga saldos ni resuelve disputas inline.

---

#### 37. Proceso VPROC-0054 — costos, rentabilidad, distribución y cierre

El inicio puede proyectar resultados autorizados de costo, rentabilidad, variación, cierre y distribución correspondientes a sedes o unidades locales autorizadas.

Handoffs canónicos:

```text
VSCREEN-0103
VSCREEN-0104
VSCREEN-0105
VSCREEN-0158
```

No ejecuta conciliación, distribución, cierre o reapertura inline.

---

#### 38. Proceso VPROC-0061 — medición, análisis y mejora

`VSCREEN-0094` pertenece a `VPROC-0061` y utiliza este proceso como eje de lectura financiera.

Handoffs adicionales:

```text
VSCREEN-0106
VSCREEN-0159
```

La pantalla inicial presenta resultados y señales locales; no convierte análisis en causalidad automática ni ejecuta la acción de mejora.

---

#### 39. Proceso VPROC-0069 — presupuesto, escenarios y forecast

El inicio puede presentar proyecciones autorizadas del ciclo presupuestal relacionadas con su cobertura territorial.

Handoff canónico:

```text
VSCREEN-0156
```

Toda mutación de planificación permanece fuera de `VSCREEN-0094`.

---

#### 40. Cobertura exacta de procesos en el inicio

La composición reconoce exactamente los siete procesos propietarios de NUMERA:

| Proceso | Familia visible desde el inicio local | Handoff de detalle |
| --- | --- | --- |
| `VPROC-0010` | paquete laboral financiero relacionado | `VSCREEN-0153` |
| `VPROC-0051` | hechos económicos y conciliación local | `VSCREEN-0095`, `0096`, `0101`, `0102`, `0154` |
| `VPROC-0052` | obligaciones, pagos y tesorería local | `VSCREEN-0097`, `0098`, `0100`, `0155`, `0157` |
| `VPROC-0053` | cartera relacionada | `VSCREEN-0099` |
| `VPROC-0054` | costos, rentabilidad, distribución y cierre local | `VSCREEN-0103`, `0104`, `0105`, `0158` |
| `VPROC-0061` | medición, análisis y mejora local | `VSCREEN-0094`, `0106`, `0159` |
| `VPROC-0069` | presupuesto, escenarios y forecast local | `VSCREEN-0156` |

Resultado:

```text
SITE_MANAGER_HOME_PROCESS_COUNT = 7
SITE_MANAGER_HOME_PROCESS_MISSING_COUNT = 0
SITE_MANAGER_HOME_PROCESS_DUPLICATE_COUNT = 0
```

---

#### 41. Cobertura exacta de las veinte pantallas NUMERA

El contrato conserva la identidad de las veinte pantallas objetivo sin declarar que todas sean visibles para todos los gerentes:

| Pantalla | Relación con el home | Alcance exigido | Comando inline |
| --- | --- | --- | --- |
| `VSCREEN-0094` | `HOME` | permiso efectivo + territorio válido | no |
| `VSCREEN-0095` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0096` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0097` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0098` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0099` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0100` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0101` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0102` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0103` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0104` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0105` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0106` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0153` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0154` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0155` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0156` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0157` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0158` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |
| `VSCREEN-0159` | `AUTHORIZED_LOCAL_DRILLDOWN` | permiso efectivo + recurso compatible | no |

Resultado:

```text
SITE_MANAGER_HOME_TARGET_SCREEN_COUNT = 20
SITE_MANAGER_HOME_HOME_SCREEN_COUNT = 1
SITE_MANAGER_HOME_DRILLDOWN_SCREEN_COUNT = 19
SITE_MANAGER_HOME_INLINE_COMMAND_SCREEN_COUNT = 0
SITE_MANAGER_HOME_SCREEN_MISSING_COUNT = 0
SITE_MANAGER_HOME_SCREEN_DUPLICATE_COUNT = 0
```

---

#### 42. Drill-down no es autorización

Un enlace, tarjeta o CTA hacia una pantalla destino solo constituye navegación.

Se conserva:

```text
DRILLDOWN_VISIBLE
!= COMMAND_AUTHORIZED
!= TERRITORY_EXPANDED
```

La pantalla destino debe resolver nuevamente permiso, territorio, recurso, estado y condiciones aplicables.

---

#### 43. Acceso parcial produce composición parcial

El home no requiere que el gerente posea las 125 capacidades NUMERA.

Se conserva:

```text
PARTIAL_EFFECTIVE_READ_SET = VALID_PARTIAL_HOME
```

Una región o tarjeta puede omitirse cuando no existe autoridad suficiente, sin degradar el resto del home a error ni sustituir datos no autorizados por cero.

---

#### 44. Las veinte pantallas no son veinte accesos obligatorios

La cobertura contractual de veinte identidades garantiza que el home conoce el universo objetivo, no que deba mostrar simultáneamente diecinueve accesos.

La visibilidad final de cada drill-down depende de:

- permiso efectivo;
- relación territorial del recurso;
- relevancia contextual;
- arquitectura de navegación aplicable;
- tareas UX posteriores.

---

#### 45. `numera.access` no concede métricas financieras

Se conserva:

```text
numera.access != metric authority
numera.access != territorial financial read
```

Entrar a NUMERA no autoriza gastos, rentabilidad, cartera, bancos, escenarios ni cualquier otra cifra interna.

---

#### 46. Lectura y comando permanecen separados

Toda proyección del home pertenece al plano de lectura.

Se conserva:

```text
READ != MUTATE
READ != APPROVE
READ != PAY_EXECUTE
READ != RECONCILE
READ != CLOSE
READ != REOPEN
READ != WRITE_OFF
READ != EXPORT
READ != SCENARIO_CREATE
READ != SCENARIO_SHARE
READ != SCENARIO_APPROVE
READ != SCENARIO_PUBLISH
```

El territorio válido para leer tampoco concede automáticamente autoridad para escribir sobre ese recurso.

---

#### 47. Flujo hacia operación

Cuando una persona necesita ejecutar una acción desde un contexto descubierto en el home:

```text
VSCREEN_0094
-> AUTHORIZED_LOCAL_DRILLDOWN
-> COMMAND_CAPABLE_TARGET_SCREEN
-> ACTION_SELECTION
-> SERVER_REVALIDATION
-> ALLOW_OR_DENY
```

La revalidación usa estado, permiso, territorio y recurso actuales.

---

#### 48. Persistencia de contexto durante navegación

El handoff puede conservar filtros como sede, área, centro, periodo o recurso cuando el contrato destino los admita.

Se conserva:

```text
CONTEXT_HANDOFF != AUTHORITY_HANDOFF
```

La pantalla destino no confía en el scope enviado por la UI como evidencia suficiente de autorización.

---

#### 49. Agregados requieren miembros autorizados

Se conserva:

```text
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

Una métrica agregada solo puede incorporar dimensiones o registros cuya lectura esté autorizada para el gerente.

No se admite calcular primero el agregado global y filtrar después el detalle.

---

#### 50. Comparaciones multisede se limitan al conjunto autorizado

Si el gerente posee varias sedes activas y la lectura correspondiente, el home puede comparar esas sedes entre sí.

Se conserva:

```text
CROSS_SITE_COMPARISON_SET = INTERSECTION_OF_AUTHORIZED_SITES
```

No se muestran rankings, porcentajes o posiciones relativas calculados contra sedes no autorizadas cuando su inclusión revele información protegida.

---

#### 51. Datos bancarios y financieros sensibles conservan minimización

Las lecturas históricas locales no conceden acceso automático a detalle financiero sensible definido posteriormente.

Se conserva:

```text
ORDINARY_LOCAL_READ != SENSITIVE_FINANCIAL_DETAIL_READ
BANK_ACCOUNT_VIEW != BANK_ACCOUNT_SENSITIVE_DETAILS_VIEW
```

Los seis permisos de lectura sensible definidos posteriormente permanecen independientes y deben concederse expresamente cuando corresponda.

---

#### 52. El role override AS-IS no es autoridad objetivo

La auditoría AS-IS de NUMERA registró lógica provisional de role override para roles privilegiados.

Ese mecanismo no redefine este contrato.

Se conserva:

```text
ROLE_OVERRIDE_ASIS != TARGET_AUTHORIZATION_MODEL
```

El home futuro consume autorización efectiva y territorial; no un selector local de rol como bypass.

---

#### 53. El home local no duplica fuentes operativas

NUMERA consume hechos y proyecciones de fuentes propietarias sin recrear sus ledgers.

Se conserva:

```text
NUMERA_LOCAL_HOME_IS_DUPLICATE_LEDGER = NO
```

El filtro territorial no convierte a NUMERA en owner de ventas, inventario, producción, compras, talento o caja operativa.

---

#### 54. El gerente de sede no sustituye al contador

La administración integral de sede no concede por inferencia responsabilidad contable especializada.

Se conserva:

```text
SITE_MANAGEMENT != ACCOUNTING_SPECIALIST_AUTHORITY
```

Una lectura local aprobada no implica facultad para registrar, conciliar, cerrar, corregir, exportar o certificar información financiera si el permiso exacto no existe.

---

#### 55. El rol base no elimina requisitos operativos

Cuando una acción pertenezca a un carril operativo o de doble condición, el rol `gerente` no la ejecuta por el solo hecho de administrar la sede.

Se conserva:

```text
SITE_MANAGER_BASE_ROLE != OPERATIONAL_CONTEXT
```

Turno, check-in, rol operativo, territorio y recurso compatibles continúan siendo obligatorios donde el contrato de la acción lo exija.

---

#### 56. Accesibilidad semántica

La implementación futura deberá poder expresar sin depender solo de color:

- dato confirmado;
- advertencia;
- stale;
- no disponible;
- no autorizado;
- fuera de alcance territorial;
- real;
- presupuestado;
- forecast;
- escenario;
- propuesto;
- aprobado;
- publicado.

La 005 no fija componentes visuales concretos.

---

#### 57. Estados de carga y cambio de contexto

Al cambiar de sede, conjunto de sedes, periodo o recurso, la UI no debe mantener una cifra anterior como si correspondiera al nuevo contexto.

Se conserva:

```text
CONTEXT_CHANGED_WITH_STALE_VISIBLE_VALUE = FORBIDDEN
```

La experiencia debe distinguir carga, dato stale, dato confirmado y contexto fuera de alcance.

---

#### 58. Seguridad frente a caché de autorización

Una lectura previamente autorizada no se considera vigente después de un cambio material de permiso, asignación territorial, recurso o estado.

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

La pérdida o expiración de una asignación de sede debe reflejarse en la siguiente evaluación aplicable.

---

#### 59. Observabilidad mínima del diseño futuro

La implementación deberá poder distinguir en telemetría, sin registrar payload financiero sensible innecesario:

- home cargado;
- alcance territorial resuelto;
- región disponible;
- región denegada;
- región fuera de territorio;
- región con error técnico;
- drill-down iniciado;
- handoff hacia pantalla destino;
- comando denegado o permitido en la superficie destino.

La telemetría no se materializa en esta tarea.

---

#### 60. Relación con NUMERA-UX-006

`NUMERA-UX-006` diseñará el inicio para `contador`.

No puede obtenerse copiando esta home porque:

```text
SITE_MANAGEMENT != ACCOUNTING_RESPONSIBILITY
```

La 006 deberá resolver su propia matriz funcional, autoridad financiera especializada y alcance aplicable sin asumir que la territorialidad del gerente es la frontera correcta para el contador.

---

#### 61. Relación con NUMERA-UX-008 y NUMERA-UX-028

La 005 define quién puede ver una composición financiera local y bajo qué territorio, pero no decide la presentación final indicador-versus-tabla ni el visor económico dinámico.

Se conserva:

```text
ROLE_HOME_ARCHITECTURE != FINAL_KPI_PRESENTATION
ROLE_HOME_ARCHITECTURE != FINAL_ECONOMIC_VIEWER_LAYOUT
```

---

#### 62. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- especializa una experiencia ya protegida por requisitos financieros, autorización, territorio y navegación vigentes;
- no crea nueva conducta ejecutable;
- no crea proceso, pantalla, permiso, dato, asignación territorial ni transición nueva;
- no modifica requisitos existentes;
- la materialización y pruebas ejecutables permanecen en las unidades y paquetes posteriores que consuman este contrato.

```text
REQUISITOS_CREADOS = 0
REQUISITOS_MODIFICADOS = 0
TREQ_CHANGES = 0
```

---

#### 63. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente asociada a:

- `TREQ-NUMERA-001..024`;
- `TREQ-PROC-001`;
- `TREQ-PROC-009..017`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-015`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-017`.

Esta lista es trazabilidad y no constituye una actualización del Registro 04A.

---

#### 64. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la batería global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | se verificaron `vento-shell/main@97378673fa349222900b3cf9a127a4db45c7477a`, secuencia activa con `NUMERA-UX-003` como anterior, marcador canónico de `NUMERA-UX-005`, topología, políticas documentales, `AUTH-RBAC-003`, autorización NUMERA hasta `NUMERA-AUTH-015`, catálogo de veinte pantallas, Registro 04A aplicable y scripts documentales vigentes; la predecesora `NUMERA-UX-004` se consume desde su artefacto completo aprobado y permanece pendiente de cierre remoto bajo el modo documental adelantado |
| OPERATIVA | NOT_APPLICABLE | la tarea no ejecuta pagos, aprobaciones, conciliaciones, cierres, cartera, presupuestos ni otras operaciones financieras reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados |

---

#### 65. Criterios de aceptación

- [ ] se define exactamente un contrato `NUMERA-SITE-MANAGER-HOME-001`;
- [ ] el home usa `VSCREEN-0094` y no crea un `VSCREEN-*` nuevo;
- [ ] `VSCREEN-0094` permanece `MONITOR` / `CROSS_CUTTING`;
- [ ] el código de rol consumido es `gerente` y el label funcional es gerente de sede;
- [ ] `gerente` no se convierte en `gerente_general`, wildcard, permiso global, service role ni bypass operativo;
- [ ] se preservan las seis claves NUMERA históricamente asignadas a `gerente` sin extrapolarlas;
- [ ] exactamente cinco lecturas históricas NUMERA permanecen `AS/ORG-LOCAL` y cero lecturas históricas usan alcance global;
- [ ] `numera.access` permanece `NT-APP` y no amplía territorio;
- [ ] toda capacidad NUMERA posterior a la matriz histórica se deniega hasta concesión canónica expresa;
- [ ] se distingue el universo objetivo de 125 capacidades del estado de materialización compartida de 6 presentes y 119 pendientes;
- [ ] la cobertura potencial se deriva de asignaciones activas y no del selector de UI;
- [ ] sede seleccionada no equivale a sede autorizada;
- [ ] sede primaria no equivale a alcance autorizado;
- [ ] una o varias sedes asignadas no equivalen a alcance global;
- [ ] `ORG-LOCAL` requiere relación verificable con unidades atendidas por las sedes autorizadas;
- [ ] no existe consolidación organizacional global por nombre de rol;
- [ ] agregados y comparaciones incluyen únicamente miembros territorialmente autorizados;
- [ ] conteos y badges no filtran información de sedes no autorizadas;
- [ ] una relación entre sedes no transfiere autoridad al extremo no autorizado;
- [ ] el plano por defecto es `EXECUTIVE_READ_PLANE`;
- [ ] existen cero comandos financieros inline;
- [ ] se definen siete regiones lógicas locales;
- [ ] se cubren exactamente siete procesos propietarios NUMERA;
- [ ] se cubren exactamente veinte pantallas objetivo;
- [ ] existe una pantalla home y diecinueve destinos potenciales de drill-down;
- [ ] la matriz de veinte pantallas no obliga a mostrar veinte accesos simultáneos;
- [ ] ningún drill-down transfiere autoridad de comando ni territorio;
- [ ] los comandos se reautorizan server-side en la superficie destino;
- [ ] acceso parcial produce composición parcial, no bypass;
- [ ] cero, desconocido, no disponible, no autorizado, no aplicable y fuera de territorio permanecen diferenciados;
- [ ] un valor stale no se presenta como actual después de cambiar contexto;
- [ ] real, presupuesto, forecast y escenario permanecen separados;
- [ ] la información financiera sensible requiere permisos especializados independientes;
- [ ] el role override AS-IS no se trata como modelo objetivo;
- [ ] el gerente de sede no hereda autoridad contable especializada;
- [ ] acciones operativas conservan requisitos de contexto cuando correspondan;
- [ ] `NUMERA-UX-006`, `NUMERA-UX-008` y `NUMERA-UX-028` conservan su alcance posterior;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos.

---

#### 66. Límites

Esta tarea no:

- rediseña el inicio del propietario;
- rediseña el inicio del gerente general;
- diseña el inicio del contador;
- diseña el inicio de la auxiliar autorizada;
- redefine la matriz RBAC de `gerente`;
- crea o modifica asignaciones `employee_sites`;
- asigna capacidades NUMERA nuevas a `gerente`;
- concede consolidación organizacional global;
- convierte sede primaria o seleccionada en autorización;
- define el catálogo final de indicadores;
- decide fórmulas nuevas;
- decide el orden definitivo indicador-versus-tabla;
- diseña el visor económico dinámico de `NUMERA-UX-028`;
- crea pantallas;
- crea rutas;
- crea componentes React;
- modifica navegación runtime;
- crea permisos;
- crea grants o denies;
- crea procesos;
- cambia estados de proceso;
- implementa pagos;
- implementa conciliaciones;
- implementa cierres;
- implementa cartera;
- implementa planificación;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-006`.

---

#### 67. Handoff a NUMERA-UX-006

La siguiente tarea recibe:

```text
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
SITE_MANAGER_HOME_SCREEN_ID = VSCREEN-0094
SITE_MANAGER_HOME_PRESENTATION_PROFILE = gerente
SITE_MANAGER_HOME_PRESENTATION_LABEL = gerente de sede
SITE_MANAGER_HOME_PRIMARY_PLANE = EXECUTIVE_READ_PLANE
SITE_MANAGER_HOME_INLINE_FINANCIAL_COMMANDS = 0
SITE_MANAGER_HOME_REGION_COUNT = 7
SITE_MANAGER_HOME_PROCESS_COUNT = 7
SITE_MANAGER_HOME_TARGET_SCREEN_COUNT = 20
SITE_MANAGER_HOME_HOME_SCREEN_COUNT = 1
SITE_MANAGER_HOME_DRILLDOWN_SCREEN_COUNT = 19
SITE_MANAGER_HOME_SCREEN_MISSING_COUNT = 0
SITE_MANAGER_HOME_SCREEN_DUPLICATE_COUNT = 0
SITE_MANAGER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
SITE_MANAGER_HISTORICAL_NUMERA_LOCAL_READ_COUNT = 5
SITE_MANAGER_HISTORICAL_NUMERA_GLOBAL_READ_COUNT = 0
SITE_MANAGER_NEW_PERMISSION_AUTO_GRANT = NO
SITE_MANAGER_GLOBAL_CONSOLIDATION = NO
SELECTED_SITE_IS_AUTHORIZED_SITE = NO
PRIMARY_SITE_IS_AUTHORIZED_SCOPE = NO
UNION_OF_ASSIGNED_SITES_IS_GLOBAL = NO
ORG_LOCAL_IS_ORGANIZATION_WIDE = NO
SITE_MANAGEMENT_IS_ACCOUNTING_SPECIALIST_AUTHORITY = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
NUMERA_SITE_MANAGER_HOME_IS_VISO_EXECUTIVE_HOME = NO
UX_006_OWNER = ACCOUNTANT_HOME
TREQ_CHANGES = 0
```

`NUMERA-UX-006` deberá diseñar la presentación de contador desde su propia matriz funcional y autoridad financiera especializada, sin heredar por defecto la territorialidad, los permisos o la composición de `gerente`.

---

#### 68. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-004 — Diseñar inicio para gerente general`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-005 — Diseñar inicio para gerente de sede`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-006 — Diseñar inicio para contador`
### ✅ NUMERA-UX-006 — Diseñar inicio para contador

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-005 — Diseñar inicio para gerente de sede
**Tarea siguiente:** NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada
**Tipo de tarea:** definición documental del inicio financiero de NUMERA para la presentación funcional `contador`, reutilizando `VSCREEN-0094` como superficie canónica de entrada y lectura, conservando su naturaleza `MONITOR` / `CROSS_CUTTING`, priorizando colas, excepciones y handoffs hacia el `FINANCIAL_COMMAND_PLANE` solo cuando exista autoridad financiera efectiva, con alcance `G-FIN` limitado a cada capacidad concedida, evidencia fuente `G-SRC` de solo consulta, segregación de funciones y cero comandos financieros inline; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes React, permisos, roles, grants, datasets RBAC, procesos, estados, tablas, vistas, RPC, RLS, migraciones, Supabase, datos financieros, facturas, conciliaciones, pagos, cierres, presupuestos, exportaciones, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el inicio de NUMERA para una persona cuyo rol base funcional sea `contador`, de forma que pueda reconocer el periodo y alcance financiero con el que trabaja, priorizar hechos, documentos, conciliaciones, obligaciones, cierres y excepciones que requieren atención, consultar evidencia fuente autorizada y navegar hacia la superficie financiera especializada correspondiente sin convertir el home en una estación de mutación, un aprobador universal ni un acceso administrativo global.

El resultado debe servir como contrato de experiencia para la futura materialización de `VSCREEN-0094 — Inicio financiero y ejecutivo` bajo la presentación `contador` y como frontera explícita frente a propietario, gerente general, gerente de sede y auxiliar autorizada.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato UX documental;
- no crea instancia física propia;
- no modifica `vento-numera`;
- no modifica `vento-shell` fuera de su bloque documental cuando sea incorporada;
- no materializa permisos ni matrices RBAC;
- no crea rutas ni pantallas nuevas;
- no ejecuta side effects financieros;
- no cambia datos de Supabase.

---

#### 3. Handoff recibido de NUMERA-UX-005

La predecesora aprobada entrega:

```text
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
SITE_MANAGER_HOME_SCREEN_ID = VSCREEN-0094
SITE_MANAGER_HOME_PRESENTATION_PROFILE = gerente
SITE_MANAGER_HOME_PRESENTATION_LABEL = gerente de sede
SITE_MANAGER_HOME_PRIMARY_PLANE = EXECUTIVE_READ_PLANE
SITE_MANAGER_HOME_INLINE_FINANCIAL_COMMANDS = 0
SITE_MANAGER_HOME_REGION_COUNT = 7
SITE_MANAGER_HOME_PROCESS_COUNT = 7
SITE_MANAGER_HOME_TARGET_SCREEN_COUNT = 20
SITE_MANAGER_HOME_HOME_SCREEN_COUNT = 1
SITE_MANAGER_HOME_DRILLDOWN_SCREEN_COUNT = 19
SITE_MANAGER_HOME_SCREEN_MISSING_COUNT = 0
SITE_MANAGER_HOME_SCREEN_DUPLICATE_COUNT = 0
SITE_MANAGER_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
SITE_MANAGER_HISTORICAL_NUMERA_LOCAL_READ_COUNT = 5
SITE_MANAGER_HISTORICAL_NUMERA_GLOBAL_READ_COUNT = 0
SITE_MANAGER_NEW_PERMISSION_AUTO_GRANT = NO
SITE_MANAGER_GLOBAL_CONSOLIDATION = NO
SELECTED_SITE_IS_AUTHORIZED_SITE = NO
PRIMARY_SITE_IS_AUTHORIZED_SCOPE = NO
UNION_OF_ASSIGNED_SITES_IS_GLOBAL = NO
ORG_LOCAL_IS_ORGANIZATION_WIDE = NO
SITE_MANAGEMENT_IS_ACCOUNTING_SPECIALIST_AUTHORITY = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
NUMERA_SITE_MANAGER_HOME_IS_VISO_EXECUTIVE_HOME = NO
UX_006_OWNER = ACCOUNTANT_HOME
TREQ_CHANGES = 0
```

La 006 consume este handoff sin heredar la territorialidad de `gerente`: el contador posee una matriz funcional financiera propia y el alcance de cada capacidad debe resolverse desde esa matriz.

---

#### 4. Contrato producido

La tarea define:

```text
NUMERA-ACCOUNTANT-HOME-001
```

con la identidad funcional:

```text
SCREEN_ID = VSCREEN-0094
SCREEN_NAME = Inicio financiero y ejecutivo
PRESENTATION_PROFILE = contador
HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
PRIMARY_WORK_ORIENTATION = FINANCIAL_COMMAND_PLANE
INLINE_FINANCIAL_COMMANDS = 0
COMMAND_EXECUTION_LOCATION = AUTHORIZED_TARGET_SCREEN_ONLY
COMMAND_HANDOFF = EXPLICIT_TO_CANONICAL_TARGET_SCREEN
AUTHORIZATION_SOURCE = EFFECTIVE_PERMISSION_SET
ROLE_NAME_GRANTS_AUTHORITY = NO
GLOBAL_FINANCIAL_SCOPE_IMPLIES_GLOBAL_ADMINISTRATION = NO
```

`PRIMARY_WORK_ORIENTATION = FINANCIAL_COMMAND_PLANE` significa que el home prioriza trabajo financiero pendiente y accesos hacia superficies especializadas. No convierte a `VSCREEN-0094` en superficie de comando.

---

#### 5. Identidad de la superficie

El inicio del contador no crea una pantalla nueva.

Se conserva:

```text
ACCOUNTANT_HOME_SCREEN_ID = VSCREEN-0094
```

`VSCREEN-0094` continúa vinculado a:

```text
VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION
PRIMARY_ACTION = MONITOR
STEP_PHASE = CROSS_CUTTING
```

La especialización ocurre por composición, prioridad, permisos y handoffs; no mediante una segunda identidad de pantalla.

---

#### 6. NUMERA no sustituye VISO ni convierte al contador en administrador global

El inicio del contador pertenece a NUMERA y organiza trabajo económico, financiero, contable, de conciliación y análisis.

Se congela:

```text
NUMERA_ACCOUNTANT_HOME
!= VISO_EXECUTIVE_HOME
!= VENTO_OS_GLOBAL_HOME
```

El contador puede tener alcance organizacional sobre una capacidad financiera concreta sin obtener por ello autoridad sobre personal, seguridad, configuración, inventario, producción, marketing, fidelización o gobierno empresarial.

---

#### 7. Significado de `contador` en esta tarea

`contador` es un rol funcional financiero transversal.

Se conserva:

```text
contador != administrador_global
contador != gerente_general
contador != gerente
contador != aprobador_universal
contador != service_role
contador != operational_bypass
contador != APP_REVIEW_ACCESS
```

La autorización final siempre depende de permiso explícito, alcance del permiso, recurso exacto, estado actual, controles de sensibilidad y denegaciones aplicables.

---

#### 8. Matriz RBAC histórica completa del rol

La matriz canónica de `contador` evaluó un catálogo histórico de 112 permisos y resolvió:

```text
ACCOUNTANT_HISTORICAL_CATALOG_PERMISSION_COUNT = 112
ACCOUNTANT_HISTORICAL_GRANTED_PERMISSION_COUNT = 45
ACCOUNTANT_HISTORICAL_DENIED_PERMISSION_COUNT = 67
ACCOUNTANT_HISTORICAL_BASE_AND_OPERATIONAL_COMPONENT_COUNT = 0
```

Las 45 concesiones combinan capacidades financieras específicas, consultas de evidencia fuente y referencias organizacionales necesarias.

No representan acceso general a 45 funciones arbitrarias ni una autorización heredada hacia permisos creados después.

---

#### 9. Matriz RBAC histórica NUMERA

Dentro del catálogo histórico, `contador` recibió exactamente seis claves NUMERA:

```text
numera.access
numera.finance.cost_centers.view
numera.finance.expenses.view
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Resultado:

```text
ACCOUNTANT_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
ACCOUNTANT_HISTORICAL_NUMERA_G_FIN_READ_COUNT = 5
ACCOUNTANT_HISTORICAL_NUMERA_COMMAND_PERMISSION_COUNT = 0
```

`numera.access` utiliza `NT-APP`; las cinco lecturas utilizan `G-FIN`.

---

#### 10. `G-FIN` no equivale a administración global

`G-FIN` autoriza alcance organizacional ordinario únicamente para la capacidad financiera exacta concedida.

Se congela:

```text
G_FIN != GLOBAL_ADMINISTRATION
G_FIN != ALL_NUMERA_DATA
G_FIN != ALL_NUMERA_ACTIONS
G_FIN != APP_REVIEW
G_FIN != SECRET_ACCESS
```

Una lectura global de rentabilidad no concede registrar gastos, aprobar pagos, cerrar periodos, exportar, publicar escenarios ni modificar la fuente que origina el dato.

---

#### 11. El contador no necesita asignación por sede para una lectura `G-FIN`

Cuando una lectura vigente tenga alcance `G-FIN`, la sede seleccionada opera como filtro de consulta y no como fuente de autoridad ni como límite artificial de ese permiso.

Se conserva:

```text
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
SITE_ASSIGNMENT_REQUIRED_FOR_G_FIN = NO
```

Esto no permite que otra capacidad no financiera herede el mismo alcance.

---

#### 12. Evidencia fuente `G-SRC`

La matriz funcional del contador también puede conceder lectura de evidencia producida por otros dominios mediante `G-SRC`.

Se conserva:

```text
G_SRC = SOURCE_EVIDENCE_READ
G_SRC != SOURCE_PROCESS_AUTHORITY
G_SRC != SOURCE_MUTATION
G_SRC != SOURCE_APPROVAL
```

El contador puede verificar la evidencia necesaria para conciliación, costeo o trazabilidad sin operar el proceso fuente.

---

#### 13. Referencias organizacionales `ORG-REF`

Una referencia organizacional necesaria para interpretar un documento financiero puede consultarse mediante `ORG-REF` cuando exista la concesión correspondiente.

Se conserva:

```text
ORG_REF = REFERENCE_READ
ORG_REF != ORGANIZATION_ADMINISTRATION
```

La experiencia no transforma una referencia de empresa, negocio, sede, producto, proveedor u otra identidad en autoridad de mantenimiento sobre ese catálogo.

---

#### 14. Las capacidades NUMERA nuevas no se conceden automáticamente

Después de la matriz histórica, NUMERA alcanzó:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_SHARED_PERMISSION_MATERIALIZED_COUNT = 6
NUMERA_SHARED_PERMISSION_PENDING_COUNT = 119
```

La matriz histórica no evaluó las capacidades creadas posteriormente.

Se congela:

```text
ACCOUNTANT_NEW_PERMISSION_AUTO_GRANT = NO
```

Una capacidad nueva de lectura o comando requiere asignación canónica expresa antes de aparecer como autoridad efectiva del contador.

---

#### 15. Orientación primaria del inicio

La tarea `NUMERA-UX-002` permite que el inicio del contador priorice el plano financiero de trabajo sin mezclar lectura y comando.

Se define:

```text
HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
PRIMARY_WORK_ORIENTATION = FINANCIAL_COMMAND_PLANE
```

Por tanto, el home debe privilegiar información que ayude al contador a localizar trabajo autorizado, pero cualquier acción material se ejecuta únicamente en la superficie destino después de una nueva decisión de autorización.

---

#### 16. Invariante principal del home

`VSCREEN-0094` permanece una superficie de lectura y navegación.

```text
ACCOUNTANT_HOME_INLINE_MUTATION = FORBIDDEN
ACCOUNTANT_HOME_INLINE_APPROVAL = FORBIDDEN
ACCOUNTANT_HOME_INLINE_PAYMENT = FORBIDDEN
ACCOUNTANT_HOME_INLINE_RECONCILIATION = FORBIDDEN
ACCOUNTANT_HOME_INLINE_CLOSE = FORBIDDEN
ACCOUNTANT_HOME_INLINE_REOPEN = FORBIDDEN
ACCOUNTANT_HOME_INLINE_WRITE_OFF = FORBIDDEN
ACCOUNTANT_HOME_INLINE_EXPORT = FORBIDDEN
ACCOUNTANT_HOME_INLINE_PLANNING_MUTATION = FORBIDDEN
```

La prioridad de trabajo financiero no altera esta regla.

---

#### 17. Objetivo de decisión humana

El inicio debe permitir al contador responder, dentro de su autoridad efectiva:

- qué periodo, entidad, moneda y contexto financiero está observando;
- qué hechos o documentos requieren clasificación, soporte o revisión;
- qué conciliaciones presentan diferencias o pendientes;
- qué obligaciones, cartera, cumplimiento o tesorería requieren revisión financiera;
- qué ciclos de costo o cierre presentan excepciones;
- qué reportes, variaciones o resultados necesitan análisis;
- qué superficie especializada debe abrir para continuar una tarea autorizada;
- si el dato disponible es vigente, trazable y suficiente para decidir el siguiente paso.

El home no decide ni ejecuta la acción final.

---

#### 18. Arquitectura lógica del inicio

`NUMERA-ACCOUNTANT-HOME-001` define siete regiones lógicas:

```text
ACCOUNTANT_HOME_REGION_01 = ACCOUNTING_CONTEXT_AND_PERIOD
ACCOUNTANT_HOME_REGION_02 = FINANCIAL_WORK_QUEUE
ACCOUNTANT_HOME_REGION_03 = ECONOMIC_FACT_AND_DOCUMENT_STATUS
ACCOUNTANT_HOME_REGION_04 = RECONCILIATION_AND_EXCEPTION_STATUS
ACCOUNTANT_HOME_REGION_05 = OBLIGATION_TREASURY_AND_COMPLIANCE_STATUS
ACCOUNTANT_HOME_REGION_06 = COST_CLOSE_ANALYTICS_AND_PLANNING
ACCOUNTANT_HOME_REGION_07 = DATA_PROVENANCE_AND_CONTROL
ACCOUNTANT_HOME_REGION_COUNT = 7
```

Son regiones funcionales, no nombres obligatorios de componentes React ni decisiones de layout físico.

---

#### 19. Región 01 — Contexto contable y periodo

`ACCOUNTING_CONTEXT_AND_PERIOD` debe poder declarar, cuando aplique:

- organización o entidad económica;
- periodo o fecha de corte;
- moneda;
- sede, negocio, centro de costo u otra dimensión usada como filtro;
- versión o estado del periodo;
- condición de frescura;
- fuente o proyección consumida.

Un filtro visual nunca amplía autoridad.

---

#### 20. Periodo visible no equivale a periodo modificable

Se conserva:

```text
VISIBLE_PERIOD != EDITABLE_PERIOD
VISIBLE_CLOSED_PERIOD != REOPEN_AUTHORITY
```

El contador puede necesitar consultar periodos cerrados para análisis, auditoría o conciliación sin recibir por ello permiso de reapertura o corrección.

---

#### 21. Región 02 — Cola financiera de trabajo

`FINANCIAL_WORK_QUEUE` organiza señales y pendientes de tareas financieras potencialmente accionables.

Puede incluir, únicamente cuando exista lectura suficiente:

- hechos económicos pendientes de revisión;
- documentos incompletos o con diferencias;
- conciliaciones pendientes;
- obligaciones próximas o vencidas;
- cartera con diferencias;
- estados de tesorería que requieren revisión;
- cierres o correcciones pendientes;
- estados presupuestales o analíticos que requieren revisión.

Mostrar una fila no concede autoridad para ejecutar su acción.

---

#### 22. La cola no inventa work items

Los elementos visibles en `FINANCIAL_WORK_QUEUE` deben derivarse de recursos o estados canónicos existentes.

Se conserva:

```text
HOME_QUEUE_ITEM != NEW_FINANCIAL_ENTITY
HOME_QUEUE_ITEM != NEW_PROCESS_STATE
```

La UX puede ordenar y agrupar trabajo; no crea un lifecycle paralelo.

---

#### 23. Región 03 — Hechos económicos y documentos

`ECONOMIC_FACT_AND_DOCUMENT_STATUS` prioriza la observación de hechos, soportes y documentos relevantes para procesamiento financiero.

Puede proyectar, cuando esté autorizado:

- hechos económicos recibidos;
- gastos y soportes;
- facturas y documentos fiscales;
- paquete laboral financiero;
- documentos fuente de compras, ventas, inventario o producción necesarios para trazabilidad.

No permite editar el proceso fuente desde el home.

---

#### 24. Evidencia fuente no es operación fuente

Se congela:

```text
SOURCE_EVIDENCE_READ != SOURCE_OPERATION
SOURCE_EVIDENCE_READ != SOURCE_CORRECTION
SOURCE_EVIDENCE_READ != SOURCE_APPROVAL
```

Si el documento necesita una corrección en ORIGO, NEXO, FOGO, PULSO, ANIMA u otro owner, el handoff debe conservar la propiedad original del proceso.

---

#### 25. Minimización de evidencia fuente

La finalidad contable no autoriza exponer campos no necesarios.

La proyección de evidencia debe limitarse a información requerida para:

- identificar la fuente;
- correlacionar documento o movimiento;
- verificar importes y cantidades relevantes;
- comprobar fecha, periodo y contraparte;
- entender estado suficiente para conciliación;
- conservar trazabilidad.

Información personal, técnica, comercial o secreta ajena a esa finalidad permanece protegida.

---

#### 26. Región 04 — Conciliación y excepciones

`RECONCILIATION_AND_EXCEPTION_STATUS` presenta diferencias y estados de conciliación que requieren atención.

Puede incluir proyecciones autorizadas de:

- ventas frente a pagos;
- compras frente a recepciones y obligaciones;
- inventario y producción frente a variaciones financieras;
- movimientos bancarios frente a instrucciones o documentos;
- soportes faltantes;
- resultados discrepantes;
- conciliaciones revertidas o pendientes cuando exista lectura.

---

#### 27. Ver una diferencia no autoriza resolverla

Se conserva:

```text
READ_DIFFERENCE != RESOLVE_RECONCILIATION
READ_RECONCILIATION != REVERSE_RECONCILIATION
```

La resolución o reversión requiere permiso exacto, recurso actual y revalidación server-side en la superficie destino.

---

#### 28. Región 05 — Obligaciones, tesorería y cumplimiento

`OBLIGATION_TREASURY_AND_COMPLIANCE_STATUS` puede proyectar estados autorizados de:

- cuentas por pagar;
- vencimientos;
- programación de pagos;
- liquidez;
- cuentas o extractos bancarios con el nivel de sensibilidad permitido;
- impuestos y otras obligaciones de cumplimiento;
- cartera y recaudo cuando exista lectura efectiva.

La región no emite instrucciones de pago ni confirma pagos externos.

---

#### 29. Pago, aprobación e instrucción permanecen separados

Se congela:

```text
PAYABLE_READ != PAYMENT_APPROVAL
PAYMENT_APPROVAL != TREASURY_INSTRUCTION_ISSUE
TREASURY_INSTRUCTION_ISSUE != EXTERNAL_PAYMENT_CONFIRMED
```

La home no colapsa estas etapas en un único CTA privilegiado.

---

#### 30. Región 06 — Costo, cierre, analítica y planificación

`COST_CLOSE_ANALYTICS_AND_PLANNING` puede presentar, según autoridad efectiva:

- costos y variaciones;
- rentabilidad;
- punto de equilibrio;
- distribución de costos;
- estado de cierre;
- reportes financieros;
- presupuesto;
- forecast;
- escenarios;
- indicadores y resultados de análisis.

El home conserva lectura y handoff; no ejecuta cierre, distribución, publicación ni mutación de planificación.

---

#### 31. Estados económicos no se mezclan

Se conserva:

```text
REAL != BUDGET
REAL != FORECAST
REAL != SCENARIO
BUDGET != FORECAST
FORECAST != SCENARIO
PROPOSED != APPROVED
APPROVED != PUBLISHED
```

La presentación del contador debe preservar el tipo y estado de cada cifra o versión.

---

#### 32. Región 07 — Procedencia y control del dato

`DATA_PROVENANCE_AND_CONTROL` debe poder distinguir:

```text
VALUE_CONFIRMED
VALUE_STALE
VALUE_UNKNOWN
VALUE_NOT_AVAILABLE
VALUE_NOT_AUTHORIZED
VALUE_NOT_APPLICABLE
```

Cuando corresponda, la proyección deberá conservar método, entradas, versión, vigencia, entidad, centro, periodo y fuente.

---

#### 33. Cero no equivale a dato ausente

Se congela:

```text
ZERO != UNKNOWN
ZERO != NOT_AVAILABLE
ZERO != NOT_AUTHORIZED
ZERO != NOT_APPLICABLE
```

La ausencia de datos, un deny o un error técnico no se presenta como cero confirmado.

---

#### 34. Frescura

La pantalla no debe conservar una cifra anterior como si perteneciera al nuevo periodo, filtro o recurso después de un cambio de contexto.

Se conserva:

```text
STALE_DATA_IS_CURRENT = NO
CONTEXT_CHANGED_WITH_STALE_VISIBLE_VALUE = FORBIDDEN
```

---

#### 35. Proceso VPROC-0010 — paquete laboral para pagos

Para el contador, `VPROC-0010` se presenta como evidencia financiera y estado de reconciliación del paquete laboral autorizado.

Handoff:

```text
VSCREEN-0153 — Paquete laboral para pagos y beneficios
```

El contador no decide novedades laborales ni adquiere acceso general a documentación de personal por finalidad contable.

---

#### 36. Proceso VPROC-0051 — hechos económicos y conciliación

`VPROC-0051` es una familia primaria del inicio contable.

El home puede priorizar, según permisos efectivos:

- hechos recibidos;
- gastos y soportes;
- documentos fiscales;
- conciliación de ventas y pagos;
- conciliación de compras y recepciones.

Handoffs:

```text
VSCREEN-0095
VSCREEN-0096
VSCREEN-0101
VSCREEN-0102
VSCREEN-0154
```

---

#### 37. Proceso VPROC-0052 — obligaciones, pagos y tesorería

`VPROC-0052` es una familia primaria del inicio contable.

Handoffs:

```text
VSCREEN-0097
VSCREEN-0098
VSCREEN-0100
VSCREEN-0155
VSCREEN-0157
```

La presencia de una aprobación, obligación o pago pendiente no concede por sí misma autoridad de decisión o ejecución.

---

#### 38. Proceso VPROC-0053 — cartera

El inicio puede proyectar estados autorizados de cartera y recaudo.

Handoff:

```text
VSCREEN-0099
```

Lectura ordinaria, detalle sensible, acuerdo, aplicación, castigo y disputa permanecen capacidades distintas.

---

#### 39. Proceso VPROC-0054 — costos, rentabilidad, distribución y cierre

`VPROC-0054` es una familia primaria del inicio contable.

Handoffs:

```text
VSCREEN-0103
VSCREEN-0104
VSCREEN-0105
VSCREEN-0158
```

El home puede priorizar diferencias, variaciones y estado del ciclo, pero toda conciliación, distribución, cierre, reapertura o corrección material se reautoriza en la superficie destino.

---

#### 40. Proceso VPROC-0061 — medición, análisis y mejora

`VSCREEN-0094` pertenece a `VPROC-0061` y utiliza este proceso como eje transversal de lectura y priorización.

Handoffs adicionales:

```text
VSCREEN-0106
VSCREEN-0159
```

Reportar, exportar y ejecutar una acción de mejora permanecen separados de consultar el resultado.

---

#### 41. Proceso VPROC-0069 — presupuesto, escenarios y forecast

El inicio puede proyectar planificación financiera cuando exista autoridad de lectura.

Handoff:

```text
VSCREEN-0156
```

Las acciones `create`, `update`, `share`, `request`, `approve`, `reject`, `publish` y `unpublish` permanecen independientes y no se conceden por el nombre `contador`.

---

#### 42. Cobertura exacta de procesos

La composición reconoce exactamente los siete procesos propietarios NUMERA:

| Proceso | Relación con el inicio del contador | Handoff de detalle |
| --- | --- | --- |
| `VPROC-0010` | evidencia financiera de paquete laboral | `VSCREEN-0153` |
| `VPROC-0051` | trabajo primario de hechos y conciliación | `VSCREEN-0095`, `0096`, `0101`, `0102`, `0154` |
| `VPROC-0052` | trabajo primario de obligación y tesorería | `VSCREEN-0097`, `0098`, `0100`, `0155`, `0157` |
| `VPROC-0053` | cartera y recaudo autorizados | `VSCREEN-0099` |
| `VPROC-0054` | trabajo primario de costo y cierre | `VSCREEN-0103`, `0104`, `0105`, `0158` |
| `VPROC-0061` | monitor, reporte y análisis | `VSCREEN-0094`, `0106`, `0159` |
| `VPROC-0069` | planificación condicionada por permiso | `VSCREEN-0156` |

Resultado:

```text
ACCOUNTANT_HOME_PROCESS_COUNT = 7
ACCOUNTANT_HOME_PROCESS_MISSING_COUNT = 0
ACCOUNTANT_HOME_PROCESS_DUPLICATE_COUNT = 0
```

---

#### 43. Cobertura exacta de las veinte pantallas NUMERA

La presentación conserva el universo de veinte pantallas objetivo:

| Pantalla | Relación con el inicio del contador | Comando inline |
| --- | --- | --- |
| `VSCREEN-0094` | `HOME_READ_AND_WORK_PRIORITY` | no |
| `VSCREEN-0095` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0096` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0097` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0098` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0099` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0100` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0101` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0102` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0103` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0104` | `AUTHORIZED_ANALYTIC_HANDOFF` | no |
| `VSCREEN-0105` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0106` | `AUTHORIZED_REPORTING_HANDOFF` | no |
| `VSCREEN-0153` | `AUTHORIZED_EVIDENCE_HANDOFF` | no |
| `VSCREEN-0154` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0155` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0156` | `AUTHORIZED_PLANNING_HANDOFF` | no |
| `VSCREEN-0157` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0158` | `AUTHORIZED_FINANCIAL_WORK_HANDOFF` | no |
| `VSCREEN-0159` | `AUTHORIZED_ANALYTIC_HANDOFF` | no |

Resultado:

```text
ACCOUNTANT_HOME_TARGET_SCREEN_COUNT = 20
ACCOUNTANT_HOME_HOME_SCREEN_COUNT = 1
ACCOUNTANT_HOME_DRILLDOWN_SCREEN_COUNT = 19
ACCOUNTANT_HOME_INLINE_COMMAND_SCREEN_COUNT = 0
ACCOUNTANT_HOME_SCREEN_MISSING_COUNT = 0
ACCOUNTANT_HOME_SCREEN_DUPLICATE_COUNT = 0
```

Estas relaciones son de experiencia y navegación potencial, no concesiones de permiso.

---

#### 44. Las veinte pantallas no deben mostrarse simultáneamente

La matriz anterior conserva cobertura contractual.

La experiencia final puede priorizar menos accesos directos según:

- permiso efectivo;
- trabajo pendiente;
- periodo;
- recurso;
- sensibilidad;
- relevancia funcional;
- tareas UX posteriores.

La ausencia visual de un acceso no altera el catálogo de pantallas.

---

#### 45. Handoff hacia el plano financiero de comando

Cuando el contador deba continuar una tarea material:

```text
VSCREEN_0094_READ
-> AUTHORIZED_HANDOFF
-> COMMAND_CAPABLE_TARGET_SCREEN
-> RESOURCE_RESOLUTION
-> ACTION_SELECTION
-> SERVER_REVALIDATION
-> ALLOW_OR_DENY
```

El home puede priorizar el destino, pero no ejecuta la acción.

---

#### 46. Contexto transportado no es autoridad

Un handoff puede transportar, cuando aplique:

```text
source_screen_id
source_metric_or_alert
resource_type
resource_id_or_query_context
entity_scope
site_scope
cost_center_scope
period
version
intended_command
```

Se conserva:

```text
CONTEXT_HANDOFF != AUTHORITY_HANDOFF
```

---

#### 47. Reautorización obligatoria

Toda superficie destino capaz de producir side effects debe resolver nuevamente:

- actor efectivo;
- permiso exacto;
- alcance;
- recurso;
- estado actual;
- periodo;
- sensibilidad;
- segregación;
- controles fuertes aplicables;
- denegaciones vigentes.

Se conserva:

```text
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
```

---

#### 48. Navegación no es autorización

Se congela:

```text
VISIBLE_LINK != COMMAND_PERMISSION
VISIBLE_QUEUE_ITEM != ACTION_PERMISSION
ROLE_NAME != AUTHORIZATION
```

La UI puede ocultar destinos que carezcan de lectura o relevancia, pero nunca puede conceder autoridad mostrando un CTA.

---

#### 49. Acceso parcial produce home parcial

El contador no se trata como un paquete indivisible de autoridad.

Si el conjunto efectivo solo permite algunas lecturas o acciones:

- se componen únicamente regiones autorizadas;
- se omiten o degradan señales no autorizadas sin filtrar conteos sensibles;
- los handoffs se limitan a destinos permitidos;
- el home permanece válido aunque no existan todas las capacidades objetivo.

---

#### 50. Conteos, importes y badges son datos protegidos

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
BADGE_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
```

Un número de pendientes, un importe agregado o una severidad no puede revelar información de una familia sin autoridad de lectura suficiente.

---

#### 51. Agregados requieren miembros autorizados

Una cifra consolidada no se considera inocua por ser agregada.

Se conserva:

```text
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

Cuando el permiso sea `G-FIN`, el alcance global proviene del permiso exacto. Cuando no lo sea, el agregado debe limitarse a los miembros individualmente autorizados.

---

#### 52. Información financiera sensible

Importes, márgenes, rentabilidad, gastos, datos bancarios, cartera, crédito, conciliación y reportes pueden tener sensibilidades distintas.

Se conserva:

```text
ORDINARY_READ != SENSITIVE_DETAIL_READ
SENSITIVE_READ != EXPORT
SENSITIVE_READ != MUTATION
```

El home utiliza el nivel mínimo suficiente y no degrada permisos especializados a una lectura general.

---

#### 53. Datos bancarios y tesorería

La existencia de una cuenta, un movimiento o un estado de tesorería no autoriza exponer secretos, credenciales, PIN, OTP, tokens ni identificadores completos cuando una representación enmascarada sea suficiente.

Se conserva:

```text
BUSINESS_FINANCIAL_PERMISSION != SECRET_ACCESS
BANK_ACCOUNT_READ != PAYMENT_AUTHORITY
```

---

#### 54. Exportación permanece independiente

Se conserva:

```text
VIEW != EXPORT
REPORT_VIEW != REPORT_EXPORT
```

Un acceso a `VSCREEN-0106` o una lectura de reportes no habilita exportación por inferencia.

`NUMERA-UX-012` conserva la definición específica de la experiencia de exportación con permiso independiente.

---

#### 55. Segregación de funciones

La presentación del contador no presume que una sola persona pueda preparar, decidir, ejecutar y verificar una misma operación.

Se conserva:

```text
PREPARE != APPROVE
APPROVE != EXECUTE
EXECUTE != RECONCILE
RECONCILE != REVERSE
```

Una excepción por tamaño de la organización requiere concesión y evidencia explícitas; no se deriva de la UX.

---

#### 56. Periodos cerrados conservan sus restricciones

El rol `contador` no anula el lifecycle del periodo.

Se conserva:

```text
ACCOUNTANT_ROLE != CLOSED_PERIOD_BYPASS
```

Registrar, corregir, cerrar y reabrir son acciones distintas y deben validar el estado actual.

---

#### 57. Autorización stale

Una decisión previa deja de ser suficiente después de cambios materiales de permiso, recurso, estado, periodo o contexto.

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

---

#### 58. Estados de carga y error

La UI debe distinguir:

- carga;
- dato confirmado;
- dato stale;
- dato no disponible;
- dato no autorizado;
- error técnico.

Un error no se convierte en ausencia de trabajo ni en cero financiero.

---

#### 59. Observabilidad mínima futura

La implementación deberá poder distinguir en telemetría, minimizando payload financiero sensible:

- home de contador cargado;
- región disponible o denegada;
- cola cargada;
- handoff iniciado;
- superficie destino abierta;
- comando permitido o denegado en destino;
- error de fuente;
- dato stale detectado.

La telemetría no se materializa en esta tarea.

---

#### 60. Estado AS-IS y role override

La auditoría AS-IS registró lógica provisional capaz de tratar `contador` como actor privilegiado para determinadas vistas o filtros.

Ese comportamiento no se eleva a contrato objetivo.

Se conserva:

```text
AS_IS_ROLE_OVERRIDE != TARGET_AUTHORIZATION_MODEL
```

La futura implementación debe utilizar permisos efectivos y contratos de recurso, no bypasses por nombre de rol.

---

#### 61. Relación con NUMERA-UX-007

`NUMERA-UX-007` diseñará el inicio de `auxiliar_administrativa` como función de apoyo autorizada.

No debe obtenerse copiando o reduciendo este home por inferencia.

Se conserva:

```text
ACCOUNTANT_FUNCTION != AUXILIARY_FUNCTION
```

La siguiente tarea deberá resolver su propia matriz, alcance y prioridades.

---

#### 62. Relación con NUMERA-UX-008

`NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas` conserva la decisión sobre jerarquía general indicador-versus-tabla.

La 006 puede definir qué información es relevante para el contador, pero no congela todavía el orden visual final ni el catálogo definitivo de KPI.

---

#### 63. Relación con NUMERA-UX-009 a NUMERA-UX-012

La 006 no absorbe los flujos especializados posteriores:

```text
NUMERA-UX-009 — registro de gasto
NUMERA-UX-010 — aprobación
NUMERA-UX-011 — cierre
NUMERA-UX-012 — exportación con permiso independiente
```

El home únicamente define señales y handoffs hacia esas responsabilidades futuras.

---

#### 64. Relación con NUMERA-UX-028

`NUMERA-UX-028` conserva el diseño del visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva.

`NUMERA-ACCOUNTANT-HOME-001` no redefine ni adelanta ese visor.

---

#### 65. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- la tarea especializa una experiencia sobre pantallas, procesos y contratos de autorización ya definidos;
- no crea conducta ejecutable nueva;
- no crea procesos, pantallas, permisos, roles ni datos;
- no modifica ningún requisito existente;
- las pruebas ejecutables permanecen en los contratos y paquetes físicos que materialicen estas decisiones.

```text
REQUISITOS_CREADOS = 0
REQUISITOS_MODIFICADOS = 0
TREQ_CHANGES = 0
```

---

#### 66. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente asociada a:

- `TREQ-NUMERA-001..024`;
- `TREQ-PROC-001`;
- `TREQ-PROC-009..017`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-015`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-017`.

Esta lista es trazabilidad y no constituye una actualización del Registro 04A.

---

#### 67. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la batería global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | se verificaron `vento-shell/main@fc0e6c9cc9e01fc565bc1c31461b3918a457c3ad`, secuencia activa con `NUMERA-UX-004` como anterior, marcador canónico de `NUMERA-UX-006`, topología `DEFINE_ONCE`, políticas documentales, `AUTH-RBAC-006`, autorización NUMERA hasta `NUMERA-AUTH-015`, catálogo de veinte pantallas, Registro 04A aplicable y scripts documentales vigentes; la predecesora `NUMERA-UX-005` se consume desde su artefacto completo aprobado y permanece pendiente de cierre remoto bajo el modo documental adelantado |
| OPERATIVA | NOT_APPLICABLE | la tarea no registra gastos, resuelve conciliaciones, aprueba operaciones, ejecuta pagos, cierra periodos, exporta reportes ni modifica planificación real |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados |

---

#### 68. Criterios de aceptación

- [ ] se define exactamente un contrato `NUMERA-ACCOUNTANT-HOME-001`;
- [ ] el home usa `VSCREEN-0094` y no crea un `VSCREEN-*` nuevo;
- [ ] `VSCREEN-0094` permanece `MONITOR` / `CROSS_CUTTING`;
- [ ] la presentación funcional es `contador`;
- [ ] `contador` no se convierte en administrador global, gerente, aprobador universal, service role ni bypass operativo;
- [ ] se preserva la matriz histórica de 112 permisos con 45 concesiones y 67 ausencias sin presentarla como catálogo NUMERA actual;
- [ ] se preservan las seis claves NUMERA históricamente asignadas al contador;
- [ ] exactamente cinco lecturas históricas NUMERA usan `G-FIN` y cero comandos NUMERA históricos se infieren;
- [ ] `G-FIN` se limita a la capacidad financiera exacta y no equivale a administración global;
- [ ] `G-SRC` permite evidencia fuente y no operación fuente;
- [ ] `ORG-REF` permanece referencia de solo lectura;
- [ ] toda capacidad NUMERA posterior a la matriz histórica requiere concesión canónica expresa;
- [ ] se distingue el universo objetivo de 125 capacidades del estado de materialización compartida de 6 presentes y 119 pendientes;
- [ ] `HOME_SURFACE_PLANE` permanece `EXECUTIVE_READ_PLANE`;
- [ ] `PRIMARY_WORK_ORIENTATION` es `FINANCIAL_COMMAND_PLANE` sin mezclar ambos planos;
- [ ] existen cero comandos financieros inline;
- [ ] se definen siete regiones lógicas de trabajo contable;
- [ ] se cubren exactamente siete procesos propietarios NUMERA;
- [ ] se cubren exactamente veinte pantallas objetivo;
- [ ] existe una pantalla home y diecinueve destinos potenciales de handoff;
- [ ] la matriz de veinte pantallas no obliga a mostrar veinte accesos simultáneos;
- [ ] ningún handoff transfiere autoridad;
- [ ] los comandos se reautorizan server-side en la superficie destino;
- [ ] acceso parcial produce composición parcial, no bypass;
- [ ] conteos, importes y badges respetan autoridad de lectura;
- [ ] agregados respetan el alcance exacto de su permiso;
- [ ] evidencia fuente se minimiza a la finalidad financiera;
- [ ] información sensible no se expone por inferencia;
- [ ] lectura no implica exportación;
- [ ] preparación, aprobación, ejecución, conciliación y reversión permanecen separadas;
- [ ] el rol contador no omite restricciones de periodo cerrado;
- [ ] cero, desconocido, no disponible, no autorizado y no aplicable permanecen diferenciados;
- [ ] un dato stale no se presenta como actual;
- [ ] real, presupuesto, forecast y escenario permanecen tipados;
- [ ] el role override AS-IS no se trata como modelo objetivo;
- [ ] `NUMERA-UX-007`, `NUMERA-UX-008`, `NUMERA-UX-009..012` y `NUMERA-UX-028` conservan su alcance posterior;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos.

---

#### 69. Límites

Esta tarea no:

- rediseña el inicio del propietario;
- rediseña el inicio del gerente general;
- rediseña el inicio del gerente de sede;
- diseña el inicio de la auxiliar autorizada;
- redefine la matriz RBAC de `contador`;
- materializa las 45 concesiones históricas;
- asigna capacidades NUMERA nuevas al contador;
- crea una autorización global administrativa;
- crea o modifica evidencia fuente;
- modifica procesos propietarios externos;
- ejecuta registro de gastos;
- ejecuta aprobación;
- ejecuta pagos;
- ejecuta conciliaciones;
- ejecuta cierres o reaperturas;
- ejecuta exportaciones;
- modifica presupuestos, escenarios o forecast;
- define el catálogo final de indicadores;
- decide el orden definitivo indicador-versus-tabla;
- diseña el visor económico dinámico de `NUMERA-UX-028`;
- crea pantallas;
- crea rutas;
- crea componentes React;
- modifica navegación runtime;
- crea permisos;
- crea grants o denies;
- crea procesos;
- cambia estados de proceso;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-007`.

---

#### 70. Handoff a NUMERA-UX-007

La siguiente tarea recibe:

```text
NUMERA_ACCOUNTANT_HOME_CONTRACT = NUMERA-ACCOUNTANT-HOME-001
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
ACCOUNTANT_HOME_SCREEN_ID = VSCREEN-0094
ACCOUNTANT_HOME_PRESENTATION_PROFILE = contador
ACCOUNTANT_HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
ACCOUNTANT_HOME_PRIMARY_WORK_ORIENTATION = FINANCIAL_COMMAND_PLANE
ACCOUNTANT_HOME_INLINE_FINANCIAL_COMMANDS = 0
ACCOUNTANT_HOME_REGION_COUNT = 7
ACCOUNTANT_HOME_PROCESS_COUNT = 7
ACCOUNTANT_HOME_TARGET_SCREEN_COUNT = 20
ACCOUNTANT_HOME_HOME_SCREEN_COUNT = 1
ACCOUNTANT_HOME_DRILLDOWN_SCREEN_COUNT = 19
ACCOUNTANT_HOME_SCREEN_MISSING_COUNT = 0
ACCOUNTANT_HOME_SCREEN_DUPLICATE_COUNT = 0
ACCOUNTANT_HISTORICAL_CATALOG_PERMISSION_COUNT = 112
ACCOUNTANT_HISTORICAL_GRANTED_PERMISSION_COUNT = 45
ACCOUNTANT_HISTORICAL_DENIED_PERMISSION_COUNT = 67
ACCOUNTANT_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 6
ACCOUNTANT_HISTORICAL_NUMERA_G_FIN_READ_COUNT = 5
ACCOUNTANT_HISTORICAL_NUMERA_COMMAND_PERMISSION_COUNT = 0
ACCOUNTANT_NEW_PERMISSION_AUTO_GRANT = NO
G_FIN_IS_GLOBAL_ADMINISTRATION = NO
G_SRC_IS_SOURCE_OPERATION = NO
ORG_REF_IS_ORGANIZATION_ADMINISTRATION = NO
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
SITE_ASSIGNMENT_REQUIRED_FOR_G_FIN = NO
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
AS_IS_ROLE_OVERRIDE_IS_TARGET_AUTHORIZATION_MODEL = NO
UX_007_OWNER = AUTHORIZED_AUXILIARY_HOME
TREQ_CHANGES = 0
```

`NUMERA-UX-007` deberá diseñar la presentación de `auxiliar_administrativa` desde su propia matriz funcional y sus tareas autorizadas, sin convertirla en una copia reducida del contador ni heredar `G-FIN`, `G-SRC` o comandos por inferencia.

---

#### 71. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-005 — Diseñar inicio para gerente de sede`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-006 — Diseñar inicio para contador`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada`
### [ ] NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada
### [ ] NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas
### [ ] NUMERA-UX-009 — Diseñar flujo de registro de gasto
### [ ] NUMERA-UX-010 — Diseñar flujo de aprobación
### [ ] NUMERA-UX-011 — Diseñar flujo de cierre
### [ ] NUMERA-UX-012 — Diseñar exportación con permiso independiente
### [ ] NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo
### [ ] NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO
### [ ] NUMERA-UX-015 — Evitar registro financiero duplicado
### [ ] NUMERA-UX-016 — Validar el prototipo con contabilidad y dirección

### [ ] NUMERA-UX-017 — Diseñar conciliación de ventas y pagos
### [ ] NUMERA-UX-018 — Diseñar conciliación de compras y recepciones
### [ ] NUMERA-UX-019 — Diseñar conciliación de inventario, producción y variaciones
### [ ] NUMERA-UX-020 — Diseñar cuentas por pagar cuando pertenezcan al alcance aprobado
### [ ] NUMERA-UX-021 — Diseñar caja y bancos cuando pertenezcan al alcance aprobado
### [ ] NUMERA-UX-022 — Diseñar costos y rentabilidad con trazabilidad hasta el origen
### [ ] NUMERA-UX-023 — Diseñar correcciones y reaperturas sin borrar historial
### [ ] NUMERA-UX-024 — Diseñar tablero de cobertura y conciliación de fuentes
### [ ] NUMERA-UX-025 — Aprobar alcance financiero antes de completar implementación
### [ ] NUMERA-UX-026 — Diseñar cartera, vencimientos, recaudos, aplicación, acuerdos y gestión de cobro
### [ ] NUMERA-UX-027 — Diseñar extensión o integración contable y fiscal sin duplicar hechos operativos
### [ ] NUMERA-UX-028 — Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva
