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
### [ ] NUMERA-UX-003 — Diseñar inicio para propietario
### [ ] NUMERA-UX-004 — Diseñar inicio para gerente general
### [ ] NUMERA-UX-005 — Diseñar inicio para gerente de sede
### [ ] NUMERA-UX-006 — Diseñar inicio para contador
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
