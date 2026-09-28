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
### ✅ NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-006 — Diseñar inicio para contador
**Tarea siguiente:** NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas
**Tipo de tarea:** definición documental del inicio financiero de NUMERA para la presentación funcional `auxiliar_administrativa`, reutilizando `VSCREEN-0094` como superficie canónica de entrada y lectura, conservando su naturaleza `MONITOR` / `CROSS_CUTTING`, priorizando únicamente tareas de apoyo administrativo y financiero expresamente autorizadas, con `ORG-REF` para referencias organizacionales, `AS/AA` para gastos dentro de cobertura válida, exclusión por defecto de analítica financiera estratégica, cero comandos financieros inline y handoffs condicionados al permiso efectivo; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes React, permisos, roles, grants, datasets RBAC, procesos, estados, tablas, vistas, RPC, RLS, migraciones, Supabase, datos financieros, gastos, documentos, conciliaciones, pagos, cierres, presupuestos, exportaciones, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el inicio de NUMERA para una persona cuyo rol base funcional sea `auxiliar_administrativa`, de forma que pueda reconocer el alcance administrativo y territorial con el que trabaja, consultar centros de costo como referencia organizacional, revisar gastos vinculados con sedes o áreas autorizadas, identificar documentación o pendientes que requieren soporte administrativo y navegar hacia superficies especializadas únicamente cuando exista autoridad efectiva, sin convertir el home en una estación contable, un panel ejecutivo estratégico ni un acceso financiero amplio.

El resultado debe servir como contrato de experiencia para la futura materialización de `VSCREEN-0094 — Inicio financiero y ejecutivo` bajo la presentación `auxiliar_administrativa`, identificada en esta secuencia UX como **auxiliar autorizada**, y como frontera explícita frente a propietario, gerente general, gerente de sede y contador.

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
- no materializa permisos ni matrices RBAC;
- no crea rutas ni pantallas nuevas;
- no ejecuta side effects financieros;
- no cambia datos de Supabase.

---

#### 3. Handoff recibido de NUMERA-UX-006

La predecesora aprobada entrega:

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

La 007 consume este handoff sin copiar la amplitud del contador. La auxiliar posee una matriz funcional propia y no hereda `G-FIN`, `G-SRC`, analítica estratégica ni comandos por semejanza de interfaz.

---

#### 4. Contrato producido

La tarea define:

```text
NUMERA-AUTHORIZED-AUXILIARY-HOME-001
```

con la identidad funcional:

```text
SCREEN_ID = VSCREEN-0094
SCREEN_NAME = Inicio financiero y ejecutivo
PRESENTATION_PROFILE = auxiliar_administrativa
PRESENTATION_LABEL = auxiliar autorizada
HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
PRIMARY_WORK_ORIENTATION = AUTHORIZED_ADMINISTRATIVE_SUPPORT
INLINE_FINANCIAL_COMMANDS = 0
COMMAND_EXECUTION_LOCATION = AUTHORIZED_TARGET_SCREEN_ONLY
COMMAND_HANDOFF = EXPLICIT_TO_CANONICAL_TARGET_SCREEN
AUTHORIZATION_SOURCE = EFFECTIVE_PERMISSION_SET
ROLE_NAME_GRANTS_AUTHORITY = NO
```

`AUTHORIZED_ADMINISTRATIVE_SUPPORT` es una orientación de experiencia, no un tercer plano de autorización. Los únicos planos contractuales continúan siendo `EXECUTIVE_READ_PLANE` y `FINANCIAL_COMMAND_PLANE`.

---

#### 5. Identidad de la superficie

El inicio de la auxiliar autorizada no crea una pantalla nueva.

Se conserva:

```text
AUTHORIZED_AUXILIARY_HOME_SCREEN_ID = VSCREEN-0094
```

`VSCREEN-0094` continúa vinculado a:

```text
VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION
PRIMARY_ACTION = MONITOR
STEP_PHASE = CROSS_CUTTING
```

La especialización ocurre por composición, prioridad, permisos, alcance y handoffs; no mediante una segunda identidad de pantalla.

---

#### 6. Correspondencia entre el título UX y el rol canónico

La expresión **auxiliar autorizada** de esta tarea corresponde al rol canónico:

```text
auxiliar_administrativa
```

No se crea un rol nuevo llamado `auxiliar_autorizada`.

Se congela:

```text
UX_LABEL = auxiliar autorizada
CANONICAL_ROLE = auxiliar_administrativa
NEW_ROLE_CREATED = NO
```

---

#### 7. La auxiliar autorizada no es autoridad financiera amplia

Se conserva:

```text
auxiliar_administrativa != administrador_global
auxiliar_administrativa != gerente_general
auxiliar_administrativa != gerente
auxiliar_administrativa != contador
auxiliar_administrativa != aprobador_financiero
auxiliar_administrativa != service_role
auxiliar_administrativa != operational_bypass
auxiliar_administrativa != APP_REVIEW_ACCESS
```

La autorización final depende de permiso explícito, alcance funcional o territorial, recurso exacto, estado actual, sensibilidad y denegaciones aplicables.

---

#### 8. Matriz RBAC histórica completa del rol

La matriz canónica de `auxiliar_administrativa` evaluó un catálogo histórico de 112 permisos y resolvió:

```text
AUTHORIZED_AUXILIARY_HISTORICAL_CATALOG_PERMISSION_COUNT = 112
AUTHORIZED_AUXILIARY_HISTORICAL_GRANTED_PERMISSION_COUNT = 47
AUTHORIZED_AUXILIARY_HISTORICAL_DENIED_PERMISSION_COUNT = 65
AUTHORIZED_AUXILIARY_HISTORICAL_BASE_AND_OPERATIONAL_COMPONENT_COUNT = 0
```

Las 47 concesiones corresponden a funciones administrativas específicas, referencias organizacionales y coberturas territoriales concretas.

No representan administración global ni herencia automática hacia permisos creados después.

---

#### 9. Matriz RBAC histórica NUMERA

Dentro del catálogo histórico, NUMERA contiene seis claves evaluadas para `auxiliar_administrativa`.

Asignadas:

```text
numera.access
numera.finance.cost_centers.view
numera.finance.expenses.view
```

No asignadas:

```text
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Resultado:

```text
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_EVALUATED_PERMISSION_COUNT = 6
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 3
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_DENIED_PERMISSION_COUNT = 3
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_READ_PERMISSION_COUNT = 2
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_STRATEGIC_ANALYTICS_PERMISSION_COUNT = 0
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_COMMAND_PERMISSION_COUNT = 0
```

---

#### 10. `numera.access` solo habilita entrada

`numera.access` conserva alcance `NT-APP`.

Se congela:

```text
NUMERA_ACCESS != COST_CENTER_READ
NUMERA_ACCESS != EXPENSE_READ
NUMERA_ACCESS != STRATEGIC_ANALYTICS
NUMERA_ACCESS != FINANCIAL_COMMAND
```

Entrar a NUMERA no habilita automáticamente métricas, filas, documentos ni acciones internas.

---

#### 11. Centros de costo como `ORG-REF`

La lectura histórica:

```text
numera.finance.cost_centers.view
```

usa `ORG-REF`.

Por tanto:

```text
ORG_REF = REFERENCE_READ
ORG_REF != ORGANIZATION_ADMINISTRATION
ORG_REF != COST_CENTER_MUTATION
ORG_REF != GLOBAL_FINANCIAL_AUTHORITY
```

El centro de costo puede aparecer como referencia necesaria para clasificar o entender un gasto sin convertir a la auxiliar en administradora del catálogo financiero.

---

#### 12. Gastos bajo `AS/AA`

La lectura histórica:

```text
numera.finance.expenses.view
```

se limita a recursos vinculados con sedes o áreas activamente asignadas o formalmente atendidas dentro del proceso administrativo autorizado.

Se congela:

```text
EXPENSE_READ_SCOPE = AS_OR_AA
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
UNASSIGNED_SITE_EXPENSE_READ = DENY
```

La sede seleccionada es un filtro de interfaz y nunca amplía la cobertura autorizada.

---

#### 13. Analítica estratégica denegada por defecto

La matriz histórica no asigna a `auxiliar_administrativa`:

- punto de equilibrio;
- rentabilidad;
- reportes financieros consolidados.

Se conserva:

```text
BREAK_EVEN_DEFAULT_ACCESS = DENY
PROFITABILITY_DEFAULT_ACCESS = DENY
FINANCIAL_REPORTS_DEFAULT_ACCESS = DENY
```

La experiencia no debe mostrar esos datos por el nombre del rol ni inferir que una lectura de gastos habilita analítica estratégica.

---

#### 14. Capacidades NUMERA nuevas no se conceden automáticamente

Después de la matriz histórica, NUMERA alcanzó:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_SHARED_PERMISSION_MATERIALIZED_COUNT = 6
NUMERA_SHARED_PERMISSION_PENDING_COUNT = 119
```

La matriz histórica no evaluó las capacidades creadas posteriormente.

Se congela:

```text
AUTHORIZED_AUXILIARY_NEW_PERMISSION_AUTO_GRANT = NO
```

Una nueva lectura o acción solo aparece como autoridad efectiva cuando exista concesión canónica expresa.

---

#### 15. Orientación primaria del inicio

El home utiliza:

```text
HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
PRIMARY_WORK_ORIENTATION = AUTHORIZED_ADMINISTRATIVE_SUPPORT
```

La experiencia debe favorecer información administrativa útil para completar soporte, documentación y seguimiento financiero permitido, sin inventar un plano de comando propio.

---

#### 16. Invariante principal del home

`VSCREEN-0094` permanece una superficie de lectura y navegación.

```text
AUTHORIZED_AUXILIARY_HOME_INLINE_MUTATION = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_APPROVAL = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_PAYMENT = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_RECONCILIATION = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_CLOSE = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_REOPEN = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_WRITE_OFF = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_EXPORT = FORBIDDEN
AUTHORIZED_AUXILIARY_HOME_INLINE_PLANNING_MUTATION = FORBIDDEN
```

---

#### 17. Objetivo de decisión humana

El inicio debe permitir a la auxiliar, dentro de su autoridad efectiva:

- identificar la sede, área, centro de costo, periodo y contexto que está consultando;
- localizar gastos y soportes dentro de su cobertura;
- verificar referencias organizacionales necesarias para clasificar documentación;
- detectar documentos faltantes, inconsistencias o estados que requieren soporte administrativo;
- reconocer cuándo un pendiente debe escalarse a contador, gerente u otro actor autorizado;
- navegar a una superficie destino cuando exista lectura o tarea expresamente concedida;
- distinguir dato disponible, denegado, no aplicable, desconocido o desactualizado.

El home no decide ni ejecuta la acción financiera final.

---

#### 18. Arquitectura lógica del inicio

`NUMERA-AUTHORIZED-AUXILIARY-HOME-001` define siete regiones lógicas:

```text
AUTHORIZED_AUXILIARY_HOME_REGION_01 = CONTEXT_AND_AUTHORIZED_SCOPE
AUTHORIZED_AUXILIARY_HOME_REGION_02 = ADMINISTRATIVE_SUPPORT_QUEUE
AUTHORIZED_AUXILIARY_HOME_REGION_03 = COST_CENTER_AND_EXPENSE_SUPPORT
AUTHORIZED_AUXILIARY_HOME_REGION_04 = DOCUMENT_AND_EVIDENCE_STATUS
AUTHORIZED_AUXILIARY_HOME_REGION_05 = EXCEPTION_AND_ESCALATION_STATUS
AUTHORIZED_AUXILIARY_HOME_REGION_06 = AUTHORIZED_FINANCIAL_HANDOFFS
AUTHORIZED_AUXILIARY_HOME_REGION_07 = DATA_STATUS_AND_PROVENANCE
AUTHORIZED_AUXILIARY_HOME_REGION_COUNT = 7
```

Son regiones funcionales, no nombres obligatorios de componentes React ni decisiones de layout físico.

---

#### 19. Región 01 — Contexto y alcance autorizado

`CONTEXT_AND_AUTHORIZED_SCOPE` debe poder declarar, cuando aplique:

- sede o conjunto de sedes autorizadas;
- área autorizada;
- centro de costo usado como referencia;
- periodo o fecha de corte;
- entidad o unidad organizacional de referencia;
- condición de frescura;
- fuente o proyección consumida.

El contexto visible no sustituye la resolución real del permiso.

---

#### 20. Alcance formal y filtros de interfaz

Se conserva:

```text
SELECTED_SITE != AUTHORIZED_SITE
PRIMARY_SITE != AUTHORIZED_SCOPE
VISIBLE_COST_CENTER != MUTABLE_COST_CENTER
```

Las capacidades territoriales se resuelven desde asignaciones activas o responsabilidad formal documentada, nunca desde el filtro que la persona eligió en pantalla.

---

#### 21. Región 02 — Cola de apoyo administrativo

`ADMINISTRATIVE_SUPPORT_QUEUE` organiza únicamente pendientes que la auxiliar puede comprender o atender dentro de su autoridad.

Puede incluir, cuando exista evidencia y permiso suficiente:

- gastos sin soporte completo;
- gastos pendientes de clasificación administrativa;
- documentos con metadatos incompletos;
- referencias de centro de costo faltantes o inconsistentes;
- pendientes que requieren entregar documentación a un actor financiero autorizado;
- estados administrativos que requieren seguimiento sin aprobación.

---

#### 22. La cola no crea entidades ni estados nuevos

Se congela:

```text
HOME_QUEUE_ITEM != NEW_FINANCIAL_ENTITY
HOME_QUEUE_ITEM != NEW_PROCESS_STATE
HOME_ESCALATION != APPROVAL_DECISION
```

La UX puede ordenar y agrupar trabajo existente; no crea un lifecycle paralelo ni una aprobación implícita.

---

#### 23. Región 03 — Centros de costo y gastos

`COST_CENTER_AND_EXPENSE_SUPPORT` es la región financiera primaria del perfil histórico.

Puede combinar:

- referencia de centro de costo autorizada por `ORG-REF`;
- gasto autorizado dentro de `AS/AA`;
- periodo;
- soporte documental;
- estado suficiente para seguimiento administrativo.

No incluye rentabilidad, punto de equilibrio ni reportes consolidados por inferencia.

---

#### 24. Ver un gasto no autoriza modificarlo

Se conserva:

```text
EXPENSE_VIEW != EXPENSE_CREATE
EXPENSE_VIEW != EXPENSE_UPDATE
EXPENSE_VIEW != EXPENSE_APPROVE
EXPENSE_VIEW != EXPENSE_REJECT
EXPENSE_VIEW != EXPENSE_EXPORT
```

Una capacidad posterior explícita puede habilitar una acción en su superficie propietaria, pero nunca desde la lectura histórica por sí sola.

---

#### 25. Región 04 — Documentos y evidencia

`DOCUMENT_AND_EVIDENCE_STATUS` puede mostrar información mínima necesaria para apoyar un expediente financiero autorizado.

Puede incluir, según permiso efectivo:

- identificador de documento;
- contraparte o referencia permitida;
- fecha;
- periodo;
- importe relevante;
- centro de costo;
- estado documental;
- existencia de soporte;
- procedencia del dato.

---

#### 26. Minimización de evidencia

La finalidad administrativa no autoriza exposición irrestricta.

Se conserva:

```text
SUPPORT_PURPOSE != FULL_SOURCE_ACCESS
DOCUMENT_REFERENCE != SOURCE_PROCESS_AUTHORITY
```

Los campos personales, bancarios, técnicos, comerciales o secretos que no sean necesarios permanecen protegidos.

---

#### 27. Región 05 — Excepciones y escalamiento

`EXCEPTION_AND_ESCALATION_STATUS` presenta problemas que la auxiliar puede identificar sin convertirla en decisora.

Puede incluir:

- soporte faltante;
- clasificación incompleta;
- documento duplicado o inconsistente;
- gasto fuera de la cobertura visible esperada;
- dato stale;
- recurso no autorizado;
- pendiente que requiere revisión de contador o gerente.

---

#### 28. Escalar no equivale a aprobar

Se congela:

```text
ESCALATE != APPROVE
ESCALATE != REJECT
ESCALATE != RECONCILE
ESCALATE != CLOSE
ESCALATE != PAY
```

El escalamiento conserva el actor competente como propietario de la decisión posterior.

---

#### 29. Región 06 — Handoffs financieros autorizados

`AUTHORIZED_FINANCIAL_HANDOFFS` reúne accesos hacia pantallas NUMERA únicamente cuando el conjunto efectivo de permisos permite esa lectura o tarea.

La región puede priorizar destinos administrativos o financieros sin convertir la existencia del enlace en autoridad de comando.

---

#### 30. Región 07 — Estado y procedencia del dato

`DATA_STATUS_AND_PROVENANCE` debe poder distinguir:

```text
VALUE_CONFIRMED
VALUE_STALE
VALUE_UNKNOWN
VALUE_NOT_AVAILABLE
VALUE_NOT_AUTHORIZED
VALUE_NOT_APPLICABLE
```

Cuando corresponda, la proyección conserva periodo, entidad, sede, área, centro de costo, versión y fuente.

---

#### 31. Cero no equivale a ausencia

Se congela:

```text
ZERO != UNKNOWN
ZERO != NOT_AVAILABLE
ZERO != NOT_AUTHORIZED
ZERO != NOT_APPLICABLE
```

Un deny, un error o la falta de datos no se presenta como cero confirmado.

---

#### 32. Frescura

La pantalla no conserva una cifra anterior como si perteneciera al nuevo periodo, sede, área o recurso después de cambiar el contexto.

Se conserva:

```text
STALE_DATA_IS_CURRENT = NO
CONTEXT_CHANGED_WITH_STALE_VISIBLE_VALUE = FORBIDDEN
```

---

#### 33. Proceso VPROC-0010 — paquete laboral para pagos

`VPROC-0010` forma parte del universo NUMERA, pero la auxiliar no recibe acceso financiero al paquete laboral por inferencia.

Handoff potencial:

```text
VSCREEN-0153 — Paquete laboral para pagos y beneficios
```

Solo aparece cuando exista permiso efectivo específico y respetando minimización de datos laborales.

---

#### 34. Proceso VPROC-0051 — hechos económicos y conciliación

`VPROC-0051` es la familia con mayor afinidad al apoyo administrativo de la auxiliar.

Handoffs potenciales:

```text
VSCREEN-0095
VSCREEN-0096
VSCREEN-0101
VSCREEN-0102
VSCREEN-0154
```

Bajo la matriz histórica, la lectura de gastos es la autoridad NUMERA concreta de esta familia. Las demás superficies exigen permisos efectivos propios y no se heredan desde `expenses.view`.

---

#### 35. Proceso VPROC-0052 — obligaciones, pagos y tesorería

Handoffs potenciales:

```text
VSCREEN-0097
VSCREEN-0098
VSCREEN-0100
VSCREEN-0155
VSCREEN-0157
```

La matriz histórica NUMERA de la auxiliar no concede aprobación, pago ni tesorería. Estas superficies permanecen ocultas o denegadas salvo concesión canónica posterior explícita.

---

#### 36. Proceso VPROC-0053 — cartera

Handoff potencial:

```text
VSCREEN-0099
```

La auxiliar no recibe cartera por el nombre del rol. Lectura ordinaria, detalle sensible, acuerdo, aplicación, disputa y castigo requieren capacidades propias.

---

#### 37. Proceso VPROC-0054 — costos, rentabilidad, distribución y cierre

Handoffs potenciales:

```text
VSCREEN-0103
VSCREEN-0104
VSCREEN-0105
VSCREEN-0158
```

La lectura histórica de centro de costo como `ORG-REF` no concede costos analíticos, rentabilidad, distribución, cierre, reapertura ni corrección.

---

#### 38. Proceso VPROC-0061 — medición, análisis y mejora

`VSCREEN-0094` pertenece a `VPROC-0061` y se conserva como home.

Handoffs adicionales:

```text
VSCREEN-0106
VSCREEN-0159
```

La matriz histórica deniega `financial_reports.view`; ningún reporte estratégico o plan de mejora aparece por inferencia.

---

#### 39. Proceso VPROC-0069 — presupuesto, escenarios y forecast

Handoff potencial:

```text
VSCREEN-0156
```

La planificación financiera no forma parte de la autoridad histórica de la auxiliar. Solo una concesión posterior explícita puede habilitar lectura o acción concreta.

---

#### 40. Cobertura exacta de procesos

La composición conserva los siete procesos propietarios NUMERA sin asumir visibilidad automática:

| Proceso | Relación con el inicio de la auxiliar autorizada | Handoff de detalle |
| --- | --- | --- |
| `VPROC-0010` | evidencia laboral-financiera solo con permiso específico | `VSCREEN-0153` |
| `VPROC-0051` | soporte primario de gastos y documentos; resto condicionado | `VSCREEN-0095`, `0096`, `0101`, `0102`, `0154` |
| `VPROC-0052` | obligaciones y tesorería condicionadas por permiso | `VSCREEN-0097`, `0098`, `0100`, `0155`, `0157` |
| `VPROC-0053` | cartera condicionada por permiso | `VSCREEN-0099` |
| `VPROC-0054` | costo, conciliación y cierre condicionados por permiso | `VSCREEN-0103`, `0104`, `0105`, `0158` |
| `VPROC-0061` | home y analítica condicionada; reportes históricos denegados | `VSCREEN-0094`, `0106`, `0159` |
| `VPROC-0069` | planificación condicionada por permiso | `VSCREEN-0156` |

Resultado:

```text
AUTHORIZED_AUXILIARY_HOME_PROCESS_COUNT = 7
AUTHORIZED_AUXILIARY_HOME_PROCESS_MISSING_COUNT = 0
AUTHORIZED_AUXILIARY_HOME_PROCESS_DUPLICATE_COUNT = 0
```

---

#### 41. Cobertura exacta de las veinte pantallas NUMERA

La presentación conserva el universo canónico de veinte pantallas como destinos potenciales gobernados:

| Pantalla | Relación con el inicio de la auxiliar autorizada | Comando inline |
| --- | --- | --- |
| `VSCREEN-0094` | `HOME_READ_AND_AUTHORIZED_SUPPORT` | no |
| `VSCREEN-0095` | `CONDITIONAL_SUPPORT_HANDOFF` | no |
| `VSCREEN-0096` | `EXPENSE_SUPPORT_HANDOFF` | no |
| `VSCREEN-0097` | `CONDITIONAL_FINANCIAL_HANDOFF` | no |
| `VSCREEN-0098` | `CONDITIONAL_FINANCIAL_HANDOFF` | no |
| `VSCREEN-0099` | `CONDITIONAL_FINANCIAL_HANDOFF` | no |
| `VSCREEN-0100` | `CONDITIONAL_SENSITIVE_HANDOFF` | no |
| `VSCREEN-0101` | `CONDITIONAL_RECONCILIATION_HANDOFF` | no |
| `VSCREEN-0102` | `CONDITIONAL_RECONCILIATION_HANDOFF` | no |
| `VSCREEN-0103` | `CONDITIONAL_RECONCILIATION_HANDOFF` | no |
| `VSCREEN-0104` | `STRATEGIC_ANALYTIC_DEFAULT_DENY` | no |
| `VSCREEN-0105` | `CONDITIONAL_CLOSE_HANDOFF` | no |
| `VSCREEN-0106` | `STRATEGIC_REPORTING_DEFAULT_DENY` | no |
| `VSCREEN-0153` | `CONDITIONAL_SENSITIVE_EVIDENCE_HANDOFF` | no |
| `VSCREEN-0154` | `CONDITIONAL_DOCUMENT_HANDOFF` | no |
| `VSCREEN-0155` | `CONDITIONAL_TREASURY_HANDOFF` | no |
| `VSCREEN-0156` | `CONDITIONAL_PLANNING_HANDOFF` | no |
| `VSCREEN-0157` | `CONDITIONAL_COMPLIANCE_HANDOFF` | no |
| `VSCREEN-0158` | `CONDITIONAL_COST_HANDOFF` | no |
| `VSCREEN-0159` | `CONDITIONAL_ANALYTIC_HANDOFF` | no |

Resultado:

```text
AUTHORIZED_AUXILIARY_HOME_TARGET_SCREEN_COUNT = 20
AUTHORIZED_AUXILIARY_HOME_HOME_SCREEN_COUNT = 1
AUTHORIZED_AUXILIARY_HOME_DRILLDOWN_SCREEN_COUNT = 19
AUTHORIZED_AUXILIARY_HOME_INLINE_COMMAND_SCREEN_COUNT = 0
AUTHORIZED_AUXILIARY_HOME_SCREEN_MISSING_COUNT = 0
AUTHORIZED_AUXILIARY_HOME_SCREEN_DUPLICATE_COUNT = 0
```

La existencia contractual de una pantalla no equivale a visibilidad ni autoridad para este perfil.

---

#### 42. Composición histórica mínima

Con la matriz histórica sin concesiones nuevas, la experiencia debe construirse alrededor de:

```text
APP_ENTRY = numera.access
REFERENCE_READ = numera.finance.cost_centers.view
EXPENSE_READ = numera.finance.expenses.view
STRATEGIC_ANALYTICS_READ = NONE
NUMERA_COMMAND_PERMISSION = NONE
```

La ausencia de otras claves no se compensa con el nombre del rol ni con accesos directos visuales.

---

#### 43. Las veinte pantallas no se muestran simultáneamente

La matriz de cobertura anterior preserva el universo de diseño.

La interfaz concreta solo muestra accesos compatibles con:

- permiso efectivo;
- alcance funcional o territorial;
- recurso;
- sensibilidad;
- relevancia del pendiente;
- periodo;
- tareas UX posteriores.

---

#### 44. Handoff hacia `FINANCIAL_COMMAND_PLANE`

Cuando una tarea autorizada requiera una acción material:

```text
VSCREEN_0094_READ
-> AUTHORIZED_HANDOFF
-> COMMAND_CAPABLE_TARGET_SCREEN
-> RESOURCE_RESOLUTION
-> ACTION_SELECTION
-> SERVER_REVALIDATION
-> ALLOW_OR_DENY
```

La auxiliar no recibe la acción porque haya podido visualizar el recurso en el home.

---

#### 45. Contexto transportado no es autoridad

Un handoff puede transportar, cuando aplique:

```text
source_screen_id
source_metric_or_alert
resource_type
resource_id_or_query_context
entity_scope
site_scope
area_scope
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

#### 46. Reautorización obligatoria

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

#### 47. Navegación no es autorización

Se congela:

```text
VISIBLE_LINK != COMMAND_PERMISSION
VISIBLE_QUEUE_ITEM != ACTION_PERMISSION
ROLE_NAME != AUTHORIZATION
```

La UI puede ocultar destinos no autorizados, pero nunca puede conceder autoridad mostrando un CTA.

---

#### 48. Acceso parcial produce home parcial

El perfil no se trata como un paquete indivisible.

Si el conjunto efectivo permite solo una parte de las lecturas:

- se muestran únicamente regiones autorizadas;
- los conteos excluyen recursos no autorizados;
- los accesos denegados no se transforman en valores cero;
- la navegación se reduce sin romper la identidad `VSCREEN-0094`.

---

#### 49. Denegación sin side effect

Se conserva:

```text
DENY_SIDE_EFFECT_ALLOWED = NO
```

Un deny no crea borrador, no actualiza estado, no registra aprobación, no genera exportación y no ejecuta un efecto financiero parcial.

---

#### 50. Conteos, badges y agregados también están protegidos

Un número de gastos, pendientes, diferencias o documentos puede revelar información sensible.

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

Un agregado no puede incluir miembros fuera de `AS/AA` cuando la capacidad subyacente sea territorial.

---

#### 51. Fuentes propietarias externas permanecen externas

NUMERA puede proyectar información de otros dominios, pero no toma ownership de sus procesos.

Se conserva:

```text
NUMERA_READS_SOURCE_FACT != NUMERA_OWNS_SOURCE_PROCESS
```

Si un documento o hecho debe corregirse en ANIMA, ORIGO, NEXO, FOGO, PULSO u otro owner, el handoff conserva esa propiedad.

---

#### 52. No duplicar datos ni procesos

La separación de experiencia no crea un ledger auxiliar.

```text
AUTHORIZED_AUXILIARY_READ_MODEL
= projection of canonical sources
!= duplicated auxiliary ledger
```

Tampoco crea nuevos `VPROC-*` para representar una vista administrativa del mismo trabajo.

---

#### 53. Información financiera sensible

La auxiliar puede requerir importes y documentos para soporte administrativo, pero eso no elimina sensibilidad.

La experiencia debe preservar:

- mínimo privilegio;
- alcance exacto;
- minimización de campos;
- trazabilidad;
- periodo;
- finalidad;
- restricciones de exportación independientes.

---

#### 54. Exportación permanece independiente

Se conserva:

```text
VIEW != EXPORT
```

La capacidad de consultar un gasto o centro de costo no autoriza descargar, imprimir, compartir o exportar información financiera.

---

#### 55. Segregación de funciones

La auxiliar no se convierte en aprobadora por apoyar la preparación de un expediente.

Se conserva:

```text
PREPARE != APPROVE
UPLOAD_SUPPORT != VALIDATE_FINANCIAL_DECISION
ADMINISTRATIVE_FOLLOWUP != FINANCIAL_APPROVAL
```

---

#### 56. Periodos cerrados conservan restricciones

Consultar documentación histórica o gastos de un periodo cerrado no concede editar ni reabrir ese periodo.

```text
VISIBLE_CLOSED_PERIOD != REOPEN_AUTHORITY
CLOSED_PERIOD_SUPPORT != POST_CLOSE_CORRECTION_AUTHORITY
```

---

#### 57. Autorización stale

Una decisión de autorización previa no se reutiliza después de un cambio material de permiso, alcance, recurso o estado.

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

---

#### 58. Estados de carga y error

El diseño futuro debe diferenciar al menos:

- cargando;
- sin resultados autorizados;
- dato no disponible;
- acceso denegado;
- fallo técnico;
- dato stale.

Un fallo técnico no se presenta como ausencia de gastos ni como saldo cero.

---

#### 59. Observabilidad mínima futura

La implementación deberá poder distinguir en telemetría, sin registrar payload financiero sensible innecesario:

- home cargado;
- región disponible;
- región denegada;
- región con error técnico;
- gasto o referencia abierta;
- escalamiento iniciado;
- handoff hacia pantalla destino;
- comando denegado o permitido en la superficie destino.

La telemetría no se materializa en esta tarea.

---

#### 60. Estado AS-IS y role override

La existencia AS-IS de mecanismos de `role override` no se convierte en modelo objetivo de autorización.

Se conserva:

```text
AS_IS_ROLE_OVERRIDE_IS_TARGET_AUTHORIZATION_MODEL = NO
```

La presentación puede simularse en herramientas separadas cuando el contrato transversal lo permita, pero la autoridad efectiva real no nace del override visual.

---

#### 61. Relación con NUMERA-UX-008

`NUMERA-UX-008` definirá la regla transversal de mostrar indicadores antes que tablas detalladas.

La 007 define **qué información puede aparecer para la auxiliar** y con qué alcance; no decide todavía el orden visual definitivo indicador-versus-tabla.

---

#### 62. Relación con NUMERA-UX-009 a NUMERA-UX-012

Las tareas posteriores diseñarán flujos específicos de:

- registro de gasto;
- aprobación;
- cierre;
- exportación independiente.

La 007 no concede esas acciones ni adelanta su diseño. En particular:

```text
EXPENSE_VIEW != EXPENSE_REGISTRATION_FLOW
ADMINISTRATIVE_SUPPORT != APPROVAL_FLOW
VISIBLE_PERIOD != CLOSE_FLOW
VIEW != EXPORT_FLOW
```

---

#### 63. Relación con NUMERA-UX-028

`NUMERA-UX-028` conserva la propiedad del visor económico dinámico.

La 007 no inventa un visor nuevo ni amplía analítica estratégica para la auxiliar.

---

#### 64. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- especializa una experiencia protegida por requisitos NUMERA, proceso, autorización e integración ya vigentes;
- no crea conducta ejecutable nueva;
- no crea proceso, pantalla, permiso ni dato nuevo;
- no modifica ningún requisito existente;
- la materialización y pruebas ejecutables permanecen en unidades y paquetes posteriores que consuman el contrato.

```text
REQUISITOS_CREADOS = 0
REQUISITOS_MODIFICADOS = 0
TREQ_CHANGES = 0
```

---

#### 65. Cobertura de prueba vigente reutilizada

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

#### 66. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la batería global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | se consultaron `vento-shell/main`, el archivo propietario, topología, políticas, matriz `AUTH-RBAC-005`, autorización NUMERA publicada hasta `NUMERA-AUTH-015`, catálogo de veinte pantallas y estado remoto vigente de la secuencia documental |
| OPERATIVA | NOT_APPLICABLE | la tarea no registra gastos, aprueba, paga, concilia, cierra, exporta ni modifica operaciones financieras reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados |

---

#### 67. Criterios de aceptación

- [ ] se define exactamente un contrato `NUMERA-AUTHORIZED-AUXILIARY-HOME-001`;
- [ ] la presentación usa el rol canónico `auxiliar_administrativa` y conserva `auxiliar autorizada` solo como etiqueta UX de esta tarea;
- [ ] el home usa `VSCREEN-0094` y no crea un `VSCREEN-*` nuevo;
- [ ] `VSCREEN-0094` permanece `MONITOR` / `CROSS_CUTTING`;
- [ ] `HOME_SURFACE_PLANE` permanece `EXECUTIVE_READ_PLANE`;
- [ ] `AUTHORIZED_ADMINISTRATIVE_SUPPORT` se define como orientación y no como tercer plano de autorización;
- [ ] existen cero comandos financieros inline;
- [ ] la matriz histórica se reconcilia como 112 permisos, 47 concedidos y 65 no concedidos;
- [ ] NUMERA histórico se reconcilia como 6 permisos evaluados, 3 asignados y 3 no asignados;
- [ ] las dos lecturas NUMERA históricas son centros de costo y gastos;
- [ ] centros de costo usa `ORG-REF` y no administración organizacional;
- [ ] gastos se limita a `AS/AA` y no usa la sede seleccionada como autoridad;
- [ ] punto de equilibrio, rentabilidad y reportes financieros permanecen denegados por defecto;
- [ ] ninguna de las 119 capacidades objetivo pendientes se concede automáticamente;
- [ ] se definen siete regiones lógicas;
- [ ] se conservan exactamente siete procesos propietarios NUMERA;
- [ ] se conservan exactamente veinte pantallas objetivo como universo contractual;
- [ ] existe una pantalla home y diecinueve destinos potenciales de drill-down;
- [ ] la existencia de una pantalla no equivale a visibilidad o autoridad;
- [ ] acceso parcial produce composición parcial;
- [ ] conteos y agregados respetan el alcance de sus miembros;
- [ ] contexto transportado no transfiere autoridad;
- [ ] cualquier comando se reautoriza server-side en la superficie destino;
- [ ] `numera.access` no se interpreta como autoridad de métrica;
- [ ] navegación no se interpreta como permiso de comando;
- [ ] preparar o escalar no se interpreta como aprobar;
- [ ] ver no se interpreta como exportar;
- [ ] cero, desconocido, no disponible, no autorizado y no aplicable permanecen separados;
- [ ] un valor stale no se presenta como actual;
- [ ] la UX no duplica fuentes de verdad ni procesos;
- [ ] el role override AS-IS no se convierte en modelo objetivo;
- [ ] `NUMERA-UX-008`, `NUMERA-UX-009..012` y `NUMERA-UX-028` conservan su alcance posterior;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos.

---

#### 68. Límites

Esta tarea no:

- rediseña el inicio del propietario;
- rediseña el inicio del gerente general;
- rediseña el inicio del gerente de sede;
- rediseña el inicio del contador;
- redefine la matriz RBAC de `auxiliar_administrativa`;
- materializa las 47 concesiones históricas;
- asigna capacidades NUMERA nuevas a la auxiliar;
- concede punto de equilibrio, rentabilidad o reportes financieros;
- crea autorización financiera global;
- crea o modifica evidencia fuente;
- modifica procesos propietarios externos;
- ejecuta registro de gastos;
- ejecuta aprobación;
- ejecuta pagos;
- ejecuta conciliaciones;
- ejecuta cierres o reaperturas;
- ejecuta exportaciones;
- modifica presupuestos, escenarios o forecast;
- define el orden definitivo indicador-versus-tabla;
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
- desarrolla `NUMERA-UX-008`.

---

#### 69. Handoff a NUMERA-UX-008

La siguiente tarea recibe:

```text
NUMERA_AUTHORIZED_AUXILIARY_HOME_CONTRACT = NUMERA-AUTHORIZED-AUXILIARY-HOME-001
NUMERA_ACCOUNTANT_HOME_CONTRACT = NUMERA-ACCOUNTANT-HOME-001
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
AUTHORIZED_AUXILIARY_HOME_SCREEN_ID = VSCREEN-0094
AUTHORIZED_AUXILIARY_HOME_PRESENTATION_PROFILE = auxiliar_administrativa
AUTHORIZED_AUXILIARY_HOME_PRESENTATION_LABEL = auxiliar autorizada
AUTHORIZED_AUXILIARY_HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
AUTHORIZED_AUXILIARY_HOME_PRIMARY_WORK_ORIENTATION = AUTHORIZED_ADMINISTRATIVE_SUPPORT
AUTHORIZED_AUXILIARY_HOME_INLINE_FINANCIAL_COMMANDS = 0
AUTHORIZED_AUXILIARY_HOME_REGION_COUNT = 7
AUTHORIZED_AUXILIARY_HOME_PROCESS_COUNT = 7
AUTHORIZED_AUXILIARY_HOME_TARGET_SCREEN_COUNT = 20
AUTHORIZED_AUXILIARY_HOME_HOME_SCREEN_COUNT = 1
AUTHORIZED_AUXILIARY_HOME_DRILLDOWN_SCREEN_COUNT = 19
AUTHORIZED_AUXILIARY_HOME_SCREEN_MISSING_COUNT = 0
AUTHORIZED_AUXILIARY_HOME_SCREEN_DUPLICATE_COUNT = 0
AUTHORIZED_AUXILIARY_HISTORICAL_CATALOG_PERMISSION_COUNT = 112
AUTHORIZED_AUXILIARY_HISTORICAL_GRANTED_PERMISSION_COUNT = 47
AUTHORIZED_AUXILIARY_HISTORICAL_DENIED_PERMISSION_COUNT = 65
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_EVALUATED_PERMISSION_COUNT = 6
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 3
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_DENIED_PERMISSION_COUNT = 3
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_READ_PERMISSION_COUNT = 2
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_STRATEGIC_ANALYTICS_PERMISSION_COUNT = 0
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_COMMAND_PERMISSION_COUNT = 0
AUTHORIZED_AUXILIARY_NEW_PERMISSION_AUTO_GRANT = NO
COST_CENTER_SCOPE = ORG_REF
EXPENSE_SCOPE = AS_OR_AA
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
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
UX_008_OWNER = INDICATORS_BEFORE_DETAIL_TABLES
TREQ_CHANGES = 0
```

`NUMERA-UX-008` podrá definir la jerarquía indicador-antes-de-tabla sobre estas presentaciones sin ampliar permisos, alcances, datos o acciones de ninguno de los perfiles ya diseñados.

---

#### 70. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-006 — Diseñar inicio para contador`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas`
### ✅ NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada
**Tarea siguiente:** NUMERA-UX-009 — Diseñar flujo de registro de gasto
**Tipo de tarea:** definición documental transversal de jerarquía de presentación para NUMERA que obliga a presentar indicadores autorizados antes que tablas detalladas cuando ambos coexisten sobre el mismo contexto financiero, preservando fuente, alcance, periodo, versión, autorización, frescura y semántica común; no inventa KPI, no fija fórmulas ni layout final, no crea permisos ni pantallas y no absorbe el visor económico dinámico de NUMERA-UX-028; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica rutas, pantallas, componentes React, fórmulas, indicadores físicos, tablas UI, permisos, roles, grants, datasets RBAC, procesos, estados, tablas de base de datos, vistas, RPC, RLS, migraciones, Supabase, datos financieros, exportaciones, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir una regla transversal y verificable para NUMERA: cuando una experiencia autorizada contenga tanto una proyección resumida mediante indicadores como una tabla detallada del mismo contexto financiero, **los indicadores deberán aparecer antes que la tabla detallada** en el orden visual y semántico de lectura.

El objetivo es permitir que la persona comprenda primero posición, magnitud, estado, variación o excepción y luego acceda al detalle que explica esa síntesis, sin sustituir el detalle, sin crear una segunda fuente de verdad y sin ampliar autoridad por conveniencia visual.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la tarea produce un contrato UX documental transversal;
- no crea instancia física propia;
- no modifica `vento-numera`;
- no materializa KPI ni tablas;
- no modifica autorización;
- no crea rutas ni pantallas nuevas;
- no ejecuta side effects financieros;
- no cambia datos de Supabase.

---

#### 3. Handoff recibido de NUMERA-UX-007

La predecesora aprobada entrega como base:

```text
NUMERA_AUTHORIZED_AUXILIARY_HOME_CONTRACT = NUMERA-AUTHORIZED-AUXILIARY-HOME-001
NUMERA_ACCOUNTANT_HOME_CONTRACT = NUMERA-ACCOUNTANT-HOME-001
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
AUTHORIZED_AUXILIARY_HOME_SCREEN_ID = VSCREEN-0094
AUTHORIZED_AUXILIARY_HOME_PRESENTATION_PROFILE = auxiliar_administrativa
AUTHORIZED_AUXILIARY_HOME_SURFACE_PLANE = EXECUTIVE_READ_PLANE
AUTHORIZED_AUXILIARY_HOME_INLINE_FINANCIAL_COMMANDS = 0
AUTHORIZED_AUXILIARY_HOME_PROCESS_COUNT = 7
AUTHORIZED_AUXILIARY_HOME_TARGET_SCREEN_COUNT = 20
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_ASSIGNED_PERMISSION_COUNT = 3
AUTHORIZED_AUXILIARY_HISTORICAL_NUMERA_DENIED_PERMISSION_COUNT = 3
AUTHORIZED_AUXILIARY_NEW_PERMISSION_AUTO_GRANT = NO
COST_CENTER_SCOPE = ORG_REF
EXPENSE_SCOPE = AS_OR_AA
ROLE_NAME_IS_AUTHORIZATION = NO
NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
ZERO_IS_UNKNOWN = NO
UX_008_OWNER = INDICATORS_BEFORE_DETAIL_TABLES
TREQ_CHANGES = 0
```

La 008 consume además los contratos de home de propietario, gerente general, gerente de sede y contador ya aprobados por la secuencia, sin modificar sus matrices ni alcances.

---

#### 4. Contrato resultante

Se define:

```text
NUMERA_INDICATOR_DETAIL_HIERARCHY_CONTRACT = NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001
```

Su regla principal es:

```text
AUTHORIZED_INDICATOR_SUMMARY
        BEFORE
AUTHORIZED_DETAIL_TABLE
```

cuando ambos elementos:

- pertenecen al mismo contexto financiero;
- están autorizados para la persona actual;
- describen datos comparables o una relación explícitamente declarada;
- forman parte de la misma experiencia o superficie.

---

#### 5. Qué se entiende por indicador

Para este contrato, un **indicador** es una proyección resumida autorizada que comunica una magnitud, estado, variación, proporción, vencimiento, cobertura, conteo, alerta o señal financiera relevante.

Puede materializarse posteriormente como tarjeta, cifra, badge, resumen, mini gráfico u otra representación aprobada, pero esta tarea no fija el componente visual concreto.

```text
INDICATOR = AUTHORIZED_SUMMARY_PROJECTION
INDICATOR != NEW_SOURCE_OF_TRUTH
INDICATOR != IMPLICIT_PERMISSION
```

---

#### 6. Qué se entiende por tabla detallada

Una **tabla detallada** es una representación tabular de registros, documentos, partidas, movimientos, obligaciones, hechos, filas analíticas u otras unidades de detalle que explican o soportan una vista financiera.

```text
DETAIL_TABLE = AUTHORIZED_DETAIL_PROJECTION
DETAIL_TABLE != SOURCE_OWNERSHIP_TRANSFER
DETAIL_TABLE != COMMAND_AUTHORIZATION
```

La tabla conserva su función de investigación, reconciliación, trazabilidad y revisión exacta.

---

#### 7. Invariante principal de jerarquía

Se conserva:

```text
IF INDICATOR_AND_DETAIL_TABLE_COEXIST
THEN INDICATOR_PRECEDES_DETAIL_TABLE = YES
```

La precedencia se aplica al contenido principal de la superficie, no a chrome global, navegación, breadcrumb, selector de contexto, título, filtros necesarios o controles de accesibilidad.

---

#### 8. "Antes" es una regla semántica, no solo geométrica

La palabra **antes** significa, cuando aplique:

- antes en el orden principal de lectura visual;
- antes en el orden semántico del documento;
- antes en el flujo de lectura de tecnologías asistivas;
- antes en el apilamiento responsive cuando la pantalla se reduce;
- antes que el usuario deba inspeccionar filas para conocer la síntesis básica.

No significa que la tabla deba quedar oculta ni que requiera una interacción adicional para existir.

---

#### 9. La regla no obliga a inventar indicadores

Se conserva:

```text
NO_APPROVED_INDICATOR = NO_SYNTHETIC_KPI
```

Si una pantalla no posee una proyección resumida aprobada, esta tarea no autoriza crear una métrica arbitraria solo para evitar que la tabla aparezca primero.

Por tanto:

```text
INDICATOR_FIRST != INDICATOR_ALWAYS_REQUIRED
```

---

#### 10. La regla no elimina tablas

La jerarquía indicador-primero no convierte el detalle en opcional cuando el proceso, la revisión, la conciliación, la auditoría o la decisión necesita las filas subyacentes.

```text
SUMMARY != EVIDENCE_REPLACEMENT
SUMMARY != DETAIL_REPLACEMENT
```

La tabla puede ser crítica aunque visualmente aparezca después.

---

#### 11. Reconciliación entre indicador y detalle

Cuando indicador y tabla representen el mismo universo y grano comparable, deberán reconciliarse.

Se conserva:

```text
INDICATOR_SOURCE_SET = DETAIL_SOURCE_SET
INDICATOR_CONTEXT = DETAIL_CONTEXT
INDICATOR_PERIOD = DETAIL_PERIOD
```

salvo que la experiencia declare explícitamente una diferencia válida de grano, periodo, universo o metodología.

Una diferencia no explicada se considera inconsistencia y no una característica visual.

---

#### 12. Fuente de verdad común

El indicador y la tabla deben proyectarse desde fuentes canónicas o derivados gobernados compatibles.

```text
INDICATOR_LEDGER != SEPARATE_LEDGER
DETAIL_TABLE_LEDGER != SEPARATE_LEDGER
```

No se autoriza copiar datos a una segunda fuente solo para hacer más rápida o cómoda la experiencia de resumen.

---

#### 13. Contexto compartido

Cuando sean comparables, indicador y tabla deberán conservar el mismo contexto efectivo, incluyendo según aplique:

- empresa;
- unidad de negocio;
- sede;
- área;
- centro de costo;
- contraparte;
- periodo;
- moneda;
- estado;
- versión;
- escenario;
- dimensión analítica.

Esta tarea no diseña los controles de filtro de `NUMERA-UX-013`; únicamente exige coherencia de contexto.

---

#### 14. Autorización independiente por nivel de detalle

Se conserva:

```text
SUMMARY_AUTHORITY != DETAIL_AUTHORITY_BY_INFERENCE
DETAIL_AUTHORITY != SUMMARY_AUTHORITY_BY_INFERENCE
```

Una persona puede estar autorizada para una proyección agregada y no para el detalle sensible, o para ciertos registros sin una métrica agregada específica.

La UI debe componer únicamente los niveles expresamente autorizados.

---

#### 15. Ningún conteo puede filtrar información no autorizada

Un indicador de cantidad, importe total, severidad, existencia o vencimiento también es información protegida.

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
BADGE_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
```

No se mostrará un indicador derivado de filas que la persona no está autorizada a incorporar al agregado, salvo que exista una autorización agregada independiente que lo permita expresamente.

---

#### 16. Cero, desconocido y no disponible permanecen separados

Se conserva:

```text
ZERO != UNKNOWN
ZERO != NOT_AVAILABLE
ZERO != NOT_AUTHORIZED
ZERO != NOT_APPLICABLE
```

Un indicador no debe mostrar `0` porque la tabla no cargó, fue denegada o no tiene cobertura suficiente.

---

#### 17. Frescura y versión

Indicador y detalle no deben aparentar simultaneidad cuando sus snapshots son incompatibles.

La presentación futura deberá poder distinguir:

- actual;
- stale;
- en actualización;
- parcial;
- no disponible;
- error técnico.

Cuando la tabla se refresque después que el indicador, o viceversa, la experiencia deberá evitar presentar ambos como reconciliados hasta confirmar compatibilidad.

---

#### 18. Unidad, moneda y escala

Todo indicador numérico deberá conservar unidad y escala suficientes para no inducir lectura incorrecta.

Cuando aplique:

```text
VALUE + CURRENCY + PERIOD + CONTEXT
```

son parte de la semántica mínima de la síntesis, no decoración.

Una tabla en COP no puede reconciliarse visualmente con un indicador en otra moneda sin conversión explícita y gobernada.

---

#### 19. Periodo visible

La persona debe poder determinar a qué periodo corresponde el indicador sin deducirlo de la tabla.

```text
INDICATOR_PERIOD_IS_EXPLICIT = YES
```

Cuando el periodo sea heredado de un contexto global inequívoco, la UI podrá evitar repetición visual, pero la semántica accesible deberá conservarlo.

---

#### 20. Metadatos mínimos del indicador

Sin fijar layout concreto, una proyección material deberá permitir determinar al menos:

- qué mide;
- valor o estado;
- unidad o moneda cuando aplique;
- contexto relevante;
- periodo;
- estado de frescura;
- comparación o tendencia solo cuando exista y esté autorizada;
- acceso a detalle o fuente cuando corresponda y esté permitido.

---

#### 21. Tendencias y comparaciones no se inventan

Se conserva:

```text
NO_BASELINE = NO_TREND
NO_COMPARABLE_PERIOD = NO_FAKE_COMPARISON
NO_AUTHORIZED_SCENARIO = NO_SCENARIO_COMPARISON
```

La ausencia de baseline no se reemplaza por una flecha decorativa ni por una variación calculada sobre periodos incompatibles.

---

#### 22. Alertas y excepciones pueden preceder al detalle

Una alerta autorizada puede formar parte de la capa resumida cuando sintetiza una condición relevante del conjunto detallado.

Sin embargo:

```text
ALERT_VISIBLE != RESOLUTION_AUTHORITY
```

La señal puede indicar qué requiere atención sin conceder capacidad para resolverlo.

---

#### 23. La tabla conserva el detalle exacto

Cuando exista tabla, deberá continuar siendo el lugar natural para:

- revisar filas;
- comparar partidas;
- inspeccionar evidencia;
- identificar documentos;
- revisar estado individual;
- aplicar ordenamiento o filtros autorizados;
- iniciar un handoff a una acción permitida.

El indicador no sustituye esas funciones.

---

#### 24. Drill-down desde indicador

Un indicador podrá enlazar o llevar a una vista de detalle cuando exista destino canónico compatible y autoridad efectiva.

El handoff puede transportar:

```text
source_screen_id
indicator_id_or_semantic_key
resource_type
resource_id_or_query_context
entity_scope
site_scope
cost_center_scope
period
version
intended_detail
```

pero:

```text
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
```

---

#### 25. Navegar no concede operación

Se conserva:

```text
INDICATOR_CLICK != COMMAND_AUTHORIZATION
TABLE_ROW_OPEN != COMMAND_AUTHORIZATION
```

Todo comando financiero continúa requiriendo la capacidad exacta y revalidación server-side en la superficie destino.

---

#### 26. Separación de planos

La jerarquía visual no reabre la decisión de `NUMERA-UX-002`:

```text
READ_PLANE != COMMAND_PLANE
SEE != DO
```

Los indicadores pertenecen a lectura o señalización; una tabla puede contener lectura y, según su pantalla, accesos hacia comandos autorizados, pero el orden visual no fusiona ambos planos.

---

#### 27. Formularios y controles de trabajo no quedan subordinados por inferencia

La regla es **indicadores antes que tablas detalladas**, no "indicadores antes que cualquier interacción".

En una pantalla de captura o decisión:

- el formulario necesario puede mantener su posición funcional;
- controles obligatorios de contexto pueden preceder;
- evidencia crítica puede mantenerse visible;
- si además existe una tabla detallada y existen indicadores comparables, la síntesis deberá preceder específicamente a esa tabla.

---

#### 28. VSCREEN-0094 — Inicio financiero y ejecutivo

`VSCREEN-0094` tiene propósito explícito de presentar indicadores, alertas, cierres y decisiones financieras relevantes.

Por tanto:

```text
VSCREEN_0094_INDICATOR_FIRST = REQUIRED
```

Toda tabla detallada que eventualmente forme parte del home deberá aparecer después de la capa autorizada de síntesis correspondiente.

---

#### 29. VSCREEN-0104 y VSCREEN-0159

Las superficies analíticas:

- `VSCREEN-0104 — Costos, rentabilidad y escenarios`;
- `VSCREEN-0159 — Indicadores, análisis y planes de mejora`;

quedan sujetas a:

```text
IF DETAIL_TABLE_PRESENT
THEN INDICATOR_FIRST = REQUIRED
```

sin congelar qué KPI existen ni cómo se visualizan.

---

#### 30. Matriz de las veinte pantallas NUMERA

| Pantalla | Nombre | Decisión indicador-antes-de-tabla |
| --- | --- | --- |
| `VSCREEN-0094` | Inicio financiero y ejecutivo | `REQUIRED` |
| `VSCREEN-0095` | Bandeja de hechos económicos | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0096` | Registro de gasto y soporte | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0097` | Bandeja de aprobaciones financieras | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0098` | Cuentas por pagar y obligaciones | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0099` | Cuentas por cobrar y cartera | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0100` | Caja, bancos y movimientos financieros | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0101` | Conciliación de ventas y pagos | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0102` | Conciliación de compras y recepciones | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0103` | Conciliación de inventario, producción y variaciones | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0104` | Costos, rentabilidad y escenarios | `REQUIRED_WHEN_DETAIL_TABLE_PRESENT` |
| `VSCREEN-0105` | Cierre, reapertura y corrección de periodo | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0106` | Reportes y exportaciones financieras | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0153` | Paquete laboral para pagos y beneficios | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0154` | Facturas y documentos fiscales | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0155` | Tesorería y programación de pagos | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0156` | Presupuestos, escenarios y forecast | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0157` | Impuestos y obligaciones de cumplimiento | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0158` | Distribución y asignación de costos | `CONDITIONAL_WHEN_BOTH_EXIST` |
| `VSCREEN-0159` | Indicadores, análisis y planes de mejora | `REQUIRED_WHEN_DETAIL_TABLE_PRESENT` |

Reconciliación:

```text
TARGET_SCREEN_COUNT = 20
REQUIRED_COUNT = 1
REQUIRED_WHEN_DETAIL_TABLE_PRESENT_COUNT = 2
CONDITIONAL_WHEN_BOTH_EXIST_COUNT = 17
MISSING_COUNT = 0
DUPLICATE_COUNT = 0
```

---

#### 31. Matriz de procesos propietarios

| Proceso | Uso de la jerarquía |
| --- | --- |
| `VPROC-0010` | síntesis laboral-financiera antes del detalle cuando ambos existan |
| `VPROC-0051` | resumen de hechos, gastos o conciliaciones antes de tablas comparables |
| `VPROC-0052` | resumen de obligaciones, tesorería o cumplimiento antes de detalle comparable |
| `VPROC-0053` | resumen de cartera antes de detalle comparable |
| `VPROC-0054` | indicadores de costo, variación o cierre antes de detalle comparable |
| `VPROC-0061` | jerarquía primaria para home, analítica y publicación |
| `VPROC-0069` | indicadores de presupuesto, forecast o desviación antes de detalle comparable |

```text
PROCESS_COUNT = 7
NEW_PROCESS_COUNT = 0
```

---

#### 32. La jerarquía no uniforma los cinco perfiles

El contrato transversal se aplica a:

- propietario;
- `gerente_general`;
- `gerente`;
- `contador`;
- `auxiliar_administrativa`.

Pero la capa de indicadores de cada perfil continúa limitada por su autoridad efectiva.

```text
SAME_LAYOUT_RULE != SAME_DATA_VISIBILITY
```

---

#### 33. Propietario

El propietario puede recibir la composición de lectura autorizada definida por `NUMERA-OWNER-HOME-001`.

La jerarquía indicador-primero no convierte su presentación en wildcard ni incorpora capacidades nuevas.

---

#### 34. Gerente general

`gerente_general` conserva `NUMERA-GENERAL-MANAGER-HOME-001` y su autoridad efectiva.

Una proyección ejecutiva puede minimizar detalle sensible, pero no recibir datos reservados de propietario por similitud visual.

---

#### 35. Gerente de sede

`gerente` conserva `NUMERA-SITE-MANAGER-HOME-001` y sus fronteras `AS/ORG-LOCAL`.

Un indicador multisede solo puede agregar sedes individualmente autorizadas; no convierte cobertura local en consolidado global.

---

#### 36. Contador

`contador` conserva `NUMERA-ACCOUNTANT-HOME-001`.

Su experiencia puede priorizar indicadores de trabajo financiero, conciliación, obligaciones y cierre, pero la jerarquía no concede aprobaciones ni operaciones nuevas.

---

#### 37. Auxiliar autorizada

`auxiliar_administrativa` conserva `NUMERA-AUTHORIZED-AUXILIARY-HOME-001`.

Solo pueden formar parte de su capa resumida datos derivados de sus lecturas efectivas, principalmente centros de costo como `ORG-REF` y gastos en `AS/AA` conforme a la matriz vigente.

No se mostrarán por esta tarea punto de equilibrio, rentabilidad o reportes financieros estratégicos que permanecen denegados.

---

#### 38. Composición parcial es válida

Si un perfil solo posee autoridad para una parte de la información, la pantalla puede contener menos indicadores o menos detalle.

```text
PARTIAL_READ_SET = VALID_PARTIAL_COMPOSITION
```

La ausencia de una familia no se rellena con un cero ni con una cifra inferida desde otro permiso.

---

#### 39. Denegación de indicador y disponibilidad de tabla

Si la tabla está autorizada pero no existe indicador aprobado o autorizado:

```text
DETAIL_TABLE_MAY_RENDER = YES
SYNTHETIC_INDICATOR_REQUIRED = NO
```

La regla no bloquea trabajo legítimo por ausencia de una síntesis no definida.

---

#### 40. Indicador autorizado y detalle denegado

Si existe autoridad agregada válida pero no para las filas subyacentes:

```text
INDICATOR_MAY_RENDER = YES
DETAIL_TABLE_MUST_NOT_LEAK = YES
```

El indicador no incluirá enlaces, conteos secundarios, tooltips o payloads que reconstruyan el detalle denegado.

---

#### 41. Carga y error

La experiencia futura deberá distinguir al menos:

- indicador cargando;
- tabla cargando;
- indicador confirmado;
- tabla confirmada;
- dato parcial;
- dato stale;
- acceso denegado;
- fallo técnico;
- sin resultados autorizados.

La tabla no debe mostrarse como vacía si en realidad falló la consulta, y el indicador no debe mostrarse como cero por el mismo motivo.

---

#### 42. Responsive

La jerarquía deberá sobrevivir a breakpoints futuros.

```text
DESKTOP_INDICATOR_BEFORE_TABLE = YES
MOBILE_INDICATOR_BEFORE_TABLE = YES
```

Una tabla que pase a scroll horizontal o vista compacta no puede saltar semánticamente por encima de la síntesis autorizada.

Esta tarea no fija columnas, grids ni breakpoints concretos.

---

#### 43. Accesibilidad semántica

La implementación futura deberá conservar:

- encabezado comprensible para la región de indicadores;
- nombres accesibles para cada indicador;
- unidad y periodo interpretables;
- estado no dependiente únicamente de color;
- relación comprensible entre resumen y detalle;
- tabla con encabezados y semántica tabular correcta.

---

#### 44. Orden de lectura asistiva

Cuando indicador y tabla coexistan en el mismo contenido principal:

```text
ACCESSIBLE_READING_ORDER = INDICATOR_THEN_DETAIL_TABLE
```

No es suficiente mover visualmente tarjetas con CSS si el DOM o el árbol accesible presenta primero la tabla detallada.

---

#### 45. Orden de foco

Los elementos interactivos de la capa resumida deberán respetar un orden de foco coherente antes de controles interactivos propios de la tabla, salvo controles globales de contexto o filtros que necesiten preceder a ambos.

La tarea no define atajos ni keybindings concretos.

---

#### 46. Color no transmite estado por sí solo

Una variación positiva, negativa, alerta, stale o estado de cierre no se comunicará solo mediante color.

La representación futura deberá incluir texto, iconografía accesible, etiqueta semántica u otro canal equivalente.

---

#### 47. No se fija el catálogo final de KPI

Esta tarea **sí fija la jerarquía indicador-versus-tabla**, pero **no fija**:

- cantidad final de KPI;
- orden entre KPI;
- fórmula de cada KPI;
- umbrales definitivos;
- visualización final;
- tamaño de tarjetas;
- colores;
- grid;
- densidad exacta;
- contenido del visor económico final.

---

#### 48. Relación con NUMERA-UX-028

`NUMERA-UX-028` conserva la propiedad del visor económico dinámico de una sola pantalla, comparativo y con divulgación progresiva.

Se conserva:

```text
UX_008 = HIERARCHY_RULE
UX_028 = DYNAMIC_ECONOMIC_VIEWER_DESIGN
```

La 008 no absorbe el diseño del visor, pero la 028 deberá respetar la jerarquía cuando use indicadores y tablas detalladas comparables.

---

#### 49. Relación con NUMERA-UX-009 a NUMERA-UX-012

Las siguientes tareas conservan propiedad de:

```text
NUMERA-UX-009 = EXPENSE_REGISTRATION_FLOW
NUMERA-UX-010 = APPROVAL_FLOW
NUMERA-UX-011 = CLOSE_FLOW
NUMERA-UX-012 = EXPORT_FLOW
```

La jerarquía visual no concede ni diseña esas operaciones.

---

#### 50. Relación con NUMERA-UX-013

`NUMERA-UX-013` diseñará filtros por empresa, sede y centro de costo.

La 008 solo exige que indicador y tabla comparables compartan el contexto efectivo; no decide aún cómo se selecciona o representa ese contexto.

---

#### 51. Relación con NUMERA-UX-014 y NUMERA-UX-015

La fuente y correlación de hechos externos continúa perteneciendo a las tareas de consumo de eventos y prevención de doble registro.

```text
INDICATOR_SUMMARY_OF_SOURCE_FACT != DUPLICATE_FINANCIAL_FACT
```

La 008 no crea ingestión ni persistencia adicional.

---

#### 52. Observabilidad mínima futura

Sin registrar payload financiero sensible innecesario, una implementación debería poder distinguir:

- indicador renderizado;
- indicador denegado;
- indicador stale;
- tabla renderizada;
- tabla denegada;
- reconciliación indicador-detalle válida;
- discrepancia detectada;
- drill-down iniciado;
- cambio de contexto;
- error de carga por nivel.

La telemetría no se materializa en esta tarea.

---

#### 53. No duplicar procesos ni pantallas

Se conserva el universo aprobado:

```text
NUMERA_PROCESS_COUNT = 7
NUMERA_TARGET_SCREEN_COUNT = 20
NEW_VPROC_COUNT = 0
NEW_VSCREEN_COUNT = 0
```

La jerarquía es una regla de experiencia transversal, no una razón para duplicar una pantalla en versión "resumen" y otra "detalle".

---

#### 54. No se amplía el catálogo de autorización

El contrato de autorización NUMERA vigente conserva:

```text
NUMERA_TARGET_CAPABILITY_COUNT = 125
NUMERA_APP_ENTRY_COUNT = 1
NUMERA_READ_PERMISSION_COUNT = 28
NUMERA_NON_READ_CAPABILITY_COUNT = 96
```

UX-008 no materializa ninguna de las capacidades pendientes ni asigna permisos nuevos por rol.

---

#### 55. Criterio verificable de implementación futura

Una superficie futura satisface este contrato cuando, para cada contexto en que coexistan un indicador autorizado y una tabla detallada comparable:

1. el indicador aparece primero en el orden visual principal;
2. aparece primero en el orden semántico accesible;
3. ambos comparten contexto, periodo y fuente compatibles;
4. no hay filas no autorizadas contribuyendo silenciosamente al agregado salvo permiso agregado independiente;
5. una discrepancia se hace detectable y no se oculta con presentación;
6. la tabla conserva el detalle necesario;
7. la jerarquía no concede comandos ni exportación.

---

#### 56. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- formaliza una regla UX prevista expresamente por la secuencia NUMERA;
- reutiliza cobertura vigente de integridad económica, autorización, navegación, accesibilidad y trazabilidad;
- no crea conducta financiera ejecutable;
- no crea proceso, pantalla, permiso, dato, fórmula ni transición nueva;
- no modifica ningún requisito existente;
- la prueba de render, accesibilidad e integración corresponde a las materializaciones posteriores que consuman este contrato.

```text
REQUISITOS_CREADOS = 0
REQUISITOS_MODIFICADOS = 0
TREQ_CHANGES = 0
```

---

#### 57. Cobertura de prueba vigente reutilizada

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

#### 58. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no produce build físico; la batería global se ejecutará después de su incorporación documental |
| LOCAL | NOT_EXECUTED | el artefacto preparado todavía no se ha incorporado al checkout local canónico |
| REMOTA | PASS | se consultaron `vento-shell/main`, el archivo propietario, topología, políticas, catálogo de veinte pantallas, separación lectura/comando, contratos de homes publicados, requisitos NUMERA vigentes y estado remoto de la secuencia |
| OPERATIVA | NOT_APPLICABLE | la tarea no registra, aprueba, paga, concilia, cierra, exporta ni modifica hechos financieros |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados |

---

#### 59. Criterios de aceptación

- [ ] se define exactamente un contrato `NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001`;
- [ ] la regla aplica solo cuando indicador y tabla coexisten sobre contexto compatible;
- [ ] indicador autorizado precede la tabla detallada en orden visual principal;
- [ ] indicador autorizado precede la tabla en orden semántico accesible;
- [ ] la regla sobrevive a responsive;
- [ ] no se obliga a inventar KPI donde no exista síntesis aprobada;
- [ ] la tabla no se elimina ni se degrada como evidencia;
- [ ] indicador y tabla comparables comparten fuente, contexto y periodo compatibles;
- [ ] diferencias de grano o metodología se declaran explícitamente;
- [ ] resumen y detalle no infieren autorización uno del otro;
- [ ] conteos, badges y agregados respetan autorización;
- [ ] cero, desconocido, no disponible, no autorizado y no aplicable permanecen separados;
- [ ] stale no se presenta como actual;
- [ ] unidad, moneda y periodo son interpretables;
- [ ] tendencias no se inventan sin baseline comparable;
- [ ] alertas no conceden capacidad de resolución;
- [ ] drill-down transporta contexto pero no autoridad;
- [ ] cualquier comando se reautoriza en la superficie destino;
- [ ] formularios y controles globales no quedan reordenados por inferencia;
- [ ] `VSCREEN-0094` queda en `REQUIRED`;
- [ ] `VSCREEN-0104` y `VSCREEN-0159` quedan en `REQUIRED_WHEN_DETAIL_TABLE_PRESENT`;
- [ ] las otras diecisiete pantallas quedan en `CONDITIONAL_WHEN_BOTH_EXIST`;
- [ ] el universo reconcilia 20 pantallas sin faltantes ni duplicados;
- [ ] se conservan exactamente siete procesos propietarios;
- [ ] los cinco perfiles conservan sus alcances diferenciados;
- [ ] la auxiliar no adquiere analítica estratégica denegada;
- [ ] no se fija catálogo final, fórmula ni orden interno de KPI;
- [ ] `NUMERA-UX-028` conserva el visor económico dinámico;
- [ ] `NUMERA-UX-009..015` conservan sus flujos y contratos posteriores;
- [ ] el catálogo de autorización permanece en 125 capacidades objetivo;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos.

---

#### 60. Límites

Esta tarea no:

- redefine los homes de propietario, gerente general, gerente de sede, contador o auxiliar;
- crea un sexto perfil;
- redefine matrices RBAC;
- asigna capacidades NUMERA nuevas;
- inventa KPI;
- define fórmulas nuevas;
- fija umbrales financieros;
- fija el orden entre indicadores;
- diseña visualizaciones finales;
- fija colores, cards, grids o breakpoints;
- diseña el visor económico dinámico de `NUMERA-UX-028`;
- diseña filtros de `NUMERA-UX-013`;
- diseña registro de gasto;
- diseña aprobación;
- diseña cierre;
- diseña exportación;
- consume eventos físicos;
- crea doble registro financiero;
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
- desarrolla `NUMERA-UX-009`.

---

#### 61. Handoff a NUMERA-UX-009

La siguiente tarea recibe:

```text
NUMERA_INDICATOR_DETAIL_HIERARCHY_CONTRACT = NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001
NUMERA_AUTHORIZED_AUXILIARY_HOME_CONTRACT = NUMERA-AUTHORIZED-AUXILIARY-HOME-001
NUMERA_ACCOUNTANT_HOME_CONTRACT = NUMERA-ACCOUNTANT-HOME-001
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
INDICATOR_BEFORE_DETAIL_TABLE = YES_WHEN_BOTH_EXIST_AND_COMPARABLE
INDICATOR_ALWAYS_REQUIRED = NO
SYNTHETIC_KPI_ALLOWED = NO
SUMMARY_REPLACES_DETAIL = NO
SUMMARY_AUTHORITY_IMPLIES_DETAIL_AUTHORITY = NO
DETAIL_AUTHORITY_IMPLIES_SUMMARY_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
ZERO_IS_UNKNOWN = NO
TARGET_SCREEN_COUNT = 20
INDICATOR_FIRST_REQUIRED_COUNT = 1
INDICATOR_FIRST_REQUIRED_WHEN_DETAIL_TABLE_PRESENT_COUNT = 2
INDICATOR_FIRST_CONDITIONAL_COUNT = 17
SCREEN_MISSING_COUNT = 0
SCREEN_DUPLICATE_COUNT = 0
PROCESS_COUNT = 7
NUMERA_TARGET_CAPABILITY_COUNT = 125
UX_009_OWNER = EXPENSE_REGISTRATION_FLOW
UX_028_OWNER = DYNAMIC_ECONOMIC_VIEWER
TREQ_CHANGES = 0
```

`NUMERA-UX-009` podrá diseñar el flujo de registro de gasto conservando esta jerarquía en cualquier superficie que combine una síntesis autorizada con una tabla detallada, sin convertir la síntesis en permiso para registrar.

---

#### 62. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-007 — Diseñar inicio para auxiliar autorizada`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-009 — Diseñar flujo de registro de gasto`
### ✅ NUMERA-UX-009 — Diseñar flujo de registro de gasto

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas
**Tarea siguiente:** NUMERA-UX-010 — Diseñar flujo de aprobación
**Tipo de tarea:** definición documental del flujo de registro de gasto y soporte en `VSCREEN-0096`, vinculado a `VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE`, con captura guiada, validación, revisión previa, revalidación server-side, idempotencia, preservación de origen, resultado y receipt, usando permisos atómicos de gasto y sin absorber aprobación, pago, conciliación, cierre, exportación, materialización runtime ni cambios físicos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica superficies de navegación, componentes React, permisos runtime, grants, roles, Server Actions, RLS, RPC, tablas, vistas, migraciones, Supabase, datos financieros, procesos, estados de proceso, packages compartidos, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar de forma cerrada y verificable la experiencia de **registro de un gasto y su soporte** en NUMERA, de manera que una persona con autoridad efectiva pueda capturar un gasto legítimo, asociarlo a su contexto económico, validar duplicidad y consistencia, revisar el impacto antes de comprometerlo y obtener un resultado auditable sin que la visibilidad de la pantalla, el nombre del rol, la lectura de gastos o un alias legacy se conviertan en autoridad de escritura.

La tarea debe producir un contrato reutilizable por la futura materialización de `VSCREEN-0096 — Registro de gasto y soporte` sin modificar todavía código ni datos.

---

#### 2. Naturaleza y topología

La topología vigente de `NUMERA-UX` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea:

- define una sola vez el flujo UX de registro;
- no crea instancia física propia;
- no materializa permisos;
- no modifica `vento-numera`;
- no modifica Supabase;
- no ejecuta un gasto real;
- no altera continuidad física.

---

#### 3. Handoff recibido de NUMERA-UX-008

La tarea recibe:

```text
NUMERA_INDICATOR_DETAIL_HIERARCHY_CONTRACT = NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001
NUMERA_AUTHORIZED_AUXILIARY_HOME_CONTRACT = NUMERA-AUTHORIZED-AUXILIARY-HOME-001
NUMERA_ACCOUNTANT_HOME_CONTRACT = NUMERA-ACCOUNTANT-HOME-001
NUMERA_SITE_MANAGER_HOME_CONTRACT = NUMERA-SITE-MANAGER-HOME-001
NUMERA_GENERAL_MANAGER_HOME_CONTRACT = NUMERA-GENERAL-MANAGER-HOME-001
NUMERA_OWNER_HOME_CONTRACT = NUMERA-OWNER-HOME-001
NUMERA_UX_SEPARATION_CONTRACT = NUMERA-EXECUTIVE-READ-ACCOUNTING-OPERATION-SEPARATION-001
INDICATOR_BEFORE_DETAIL_TABLE = YES_WHEN_BOTH_EXIST_AND_COMPARABLE
INDICATOR_ALWAYS_REQUIRED = NO
SYNTHETIC_KPI_ALLOWED = NO
SUMMARY_REPLACES_DETAIL = NO
SUMMARY_AUTHORITY_IMPLIES_DETAIL_AUTHORITY = NO
DETAIL_AUTHORITY_IMPLIES_SUMMARY_AUTHORITY = NO
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
READ_TO_COMMAND_REAUTHORIZATION_REQUIRED = YES
SERVER_SIDE_REVALIDATION_REQUIRED = YES
ZERO_IS_UNKNOWN = NO
TARGET_SCREEN_COUNT = 20
INDICATOR_FIRST_REQUIRED_COUNT = 1
INDICATOR_FIRST_REQUIRED_WHEN_DETAIL_TABLE_PRESENT_COUNT = 2
INDICATOR_FIRST_CONDITIONAL_COUNT = 17
SCREEN_MISSING_COUNT = 0
SCREEN_DUPLICATE_COUNT = 0
PROCESS_COUNT = 7
NUMERA_TARGET_CAPABILITY_COUNT = 125
UX_009_OWNER = EXPENSE_REGISTRATION_FLOW
UX_028_OWNER = DYNAMIC_ECONOMIC_VIEWER
TREQ_CHANGES = 0
```

La jerarquía indicador-detalle se conserva cuando `VSCREEN-0096` presente síntesis y detalle comparables, pero esa jerarquía no concede autoridad para registrar.

---

#### 4. Fuentes contractuales consumidas

El diseño consume y no redefine:

- `NUMERA-REGISTER-PERMISSION-REGISTRY-001`;
- `NUMERA-READ-PERMISSION-REGISTRY-001`;
- `NUMERA-APPROVAL-PERMISSION-REGISTRY-001`;
- `NUMERA-FINANCIAL-AUDIT-CONTRACT-001`;
- el contrato de scope de `NUMERA-AUTH-008`;
- la independencia administrativa de turno definida por autorización NUMERA;
- `VPROC-0051` y sus nueve estados canónicos;
- `VSCREEN-0096` y su binding a `VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE`;
- el prototipo administrativo `APF-09`;
- la separación UX entre lectura y comando;
- el contrato de recurso `EXPENSE` y `FINANCIAL_ROW_SCOPE`.

---

#### 5. Resultado contractual

Esta tarea define:

```text
NUMERA-EXPENSE-REGISTRATION-FLOW-001
```

El contrato describe:

```text
ENTRY
CONTEXT
CAPTURE
VALIDATE
REVIEW
COMMIT
RESULT
RECEIPT
RECOVER
```

como fases UX y no como nuevos estados empresariales.

---

#### 6. Superficie propietaria

El flujo se desarrolla en:

```text
SCREEN_ID = VSCREEN-0096
SCREEN_NAME = Registro de gasto y soporte
OWNER_PROCESS = VPROC-0051
OWNER_STEP = VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE
STEP_ACTION = CAPTURE
STEP_LIFECYCLE_POSITION = IN_PROGRESS
```

No se crea una pantalla adicional para registrar gastos.

---

#### 7. Propósito de VSCREEN-0096

La superficie debe permitir:

```text
CAPTURAR GASTO LEGITIMO
+ ASOCIAR CONTEXTO ECONOMICO
+ CONSERVAR ORIGEN Y SOPORTE
+ VALIDAR DUPLICIDAD
+ REVISAR ANTES DEL EFECTO
+ REGISTRAR DE FORMA IDEMPOTENTE
+ EMITIR RECEIPT
```

No debe fusionar aprobación, pago, conciliación o cierre en el mismo compromiso.

---

#### 8. Invariante principal

Se conserva:

```text
VIEW != CREATE
CREATE != UPDATE
CREATE != CANCEL
CREATE != APPROVE
CREATE != PAY_EXECUTE
CREATE != RECONCILE
CREATE != CLOSE
CREATE != EXPORT
```

Registrar un gasto es una intención empresarial exacta.

---

#### 9. Autoridad exacta de creación

La autoridad objetivo de creación es:

```text
numera.finance.expenses.create
```

La materialización futura debe tratar esta identidad como permiso atómico de creación.

---

#### 10. Alias legacy prohibido como autoridad objetivo

Queda prohibido usar como autoridad final:

```text
numera.expenses.manage
```

Se conserva:

```text
LEGACY_EXPENSES_MANAGE_IS_TARGET_AUTHORITY = NO
```

La existencia histórica del alias no autoriza a UX-009 a diseñar un flujo omnibus.

---

#### 11. Lectura no concede registro

```text
numera.finance.expenses.view
!=
numera.finance.expenses.create
```

Una persona puede tener lectura sin creación y creación sin que ello implique una lectura omnibus de todos los gastos existentes.

---

#### 12. Entrada a NUMERA no concede registro

```text
numera.access
!=
numera.finance.expenses.create
```

La capacidad de entrar a la aplicación solo habilita la superficie base, nunca la escritura del gasto.

---

#### 13. Nombre de rol no concede registro

```text
ROLE_NAME != EXPENSE_CREATE_AUTHORITY
```

Propietario, gerente general, gerente, contador o auxiliar no pueden registrar por el nombre del rol si el permiso efectivo, scope o recurso no lo permiten.

---

#### 14. Turno y check-in no conceden registro

El registro financiero es administrativo por defecto.

Se conserva:

```text
ADMIN_SHIFT_REQUIRED = NO
ADMIN_CHECKIN_REQUIRED = NO
ACTIVE_SHIFT_IMPLIES_EXPENSE_CREATE = NO
```

Un turno activo no amplía autoridad financiera.

---

#### 15. Scope de creación

`numera.finance.expenses.create` utiliza:

```text
RESOURCE = EXPENSE
SCOPE_PROFILE = FINANCIAL_ROW_SCOPE
```

Las dimensiones propuestas del gasto deben resolverse y autorizarse antes de producir el recurso.

---

#### 16. Scope propuesto no se deriva de filtros visuales

Queda prohibido:

```text
SELECTED_SITE = AUTHORIZED_SITE
PRIMARY_SITE = AUTHORIZED_SCOPE
VISIBLE_COST_CENTER = WRITABLE_COST_CENTER
KNOWN_EXPENSE_ID = AUTHORITY
```

Los filtros mejoran navegación; no conceden territorio.

---

#### 17. Dimensiones territoriales y financieras

Cuando apliquen, el gasto puede contener:

- entidad legal o empresa;
- unidad o marca;
- sede;
- área;
- centro de costo;
- periodo;
- tercero o contraparte;
- documento;
- actor;
- fuente y correlación.

La futura implementación deberá validar únicamente las dimensiones realmente aplicables al recurso.

---

#### 18. Entrada al flujo

El flujo puede abrirse desde:

- navegación autorizada hacia `VSCREEN-0096`;
- un handoff autorizado desde una superficie de lectura o triage;
- una continuidad de captura permitida por el lifecycle;
- un enlace de contexto desde un objeto financiero relacionado.

La procedencia de navegación no concede la mutación.

---

#### 19. Contexto transportable de un handoff

Cuando exista handoff, puede transportar:

```text
source_screen_id
source_metric_or_alert
source_resource_type
source_resource_id_or_query_context
entity_scope
site_scope
cost_center_scope
period
source_app
source_event_or_document
correlation_id
intended_command = CREATE_EXPENSE
```

Cada valor debe revalidarse antes del efecto.

---

#### 20. Handoff no es autoridad

Se conserva:

```text
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
```

Un handoff puede prellenar o sugerir contexto autorizado; no puede forzar una empresa, sede, centro, periodo, contraparte o permiso que no sobreviva a la reevaluación server-side.

---

#### 21. Fase ENTRY

`ENTRY` debe comunicar de forma concisa:

- intención: registrar un gasto;
- objeto que se creará;
- contexto económico activo cuando exista;
- permiso requerido;
- que aprobación y pago son pasos separados;
- que un hecho operativo ya existente no debe duplicarse manualmente.

No debe presentar un formulario completo antes de conocer si la intención es elegible.

---

#### 22. Elegibilidad inicial

Antes de habilitar captura efectiva deben poder resolverse:

```text
VALID_SESSION
APP_ACCESS
EXACT_CREATE_PERMISSION
MINIMUM_SCOPE_CONTEXT
NO_EFFECTIVE_DENY
```

Una denegación temprana debe mostrar una salida segura sin revelar datos financieros adicionales.

---

#### 23. Fase CONTEXT

`CONTEXT` resuelve, según aplicabilidad:

- entidad legal/empresa;
- sede y área autorizables;
- centro de costo;
- periodo;
- moneda o reglas de moneda;
- categoría;
- contraparte;
- fuente y correlación.

El contexto debe permanecer visible durante captura y revisión.

---

#### 24. Selección de centro de costo

Listar centros de costo es una lectura separada de crear gastos.

Se conserva:

```text
EXPENSE_CREATE
!=
COST_CENTER_CATALOG_OMNIBUS_READ
```

Si la UI enumera centros, la lista debe limitarse a referencias que el actor pueda consultar y usar dentro del scope aplicable.

---

#### 25. Selección de tercero o contraparte

La referencia a una contraparte no concede lectura amplia del dominio propietario de terceros.

La UI debe preferir:

- identidad mínima necesaria;
- referencias autorizadas;
- búsqueda limitada por finalidad;
- ausencia de campos no necesarios para registrar el gasto.

---

#### 26. Fase CAPTURE

La captura debe recoger únicamente información necesaria para representar el gasto y su soporte.

Los campos no se autorizan por estar presentes en el cliente.

---

#### 27. Datos mínimos del gasto

El contrato de registro exige validar como mínimo:

- periodo;
- fecha;
- categoría;
- centro de costo;
- moneda;
- importe;
- descripción;
- origen;
- soporte cuando corresponda;
- entidad legal y dimensiones exigibles.

La interfaz puede ordenar o agrupar estos datos sin reducir el contrato server-side.

---

#### 28. Contraparte

La contraparte debe capturarse cuando el caso empresarial la requiera.

Se conserva:

```text
COUNTERPARTY_REQUIRED_WHEN_BUSINESS_CASE_REQUIRES = YES
MISSING_COUNTERPARTY_MAY_NOT_BE_SILENTLY_INVENTED = YES
```

No se crea una contraparte ficticia para completar el formulario.

---

#### 29. Moneda

La moneda es una dimensión económica explícita.

Se prohíbe diseñar:

```text
HIDDEN_DEFAULT_CURRENCY_AS_BUSINESS_TRUTH = YES
```

La futura materialización puede preseleccionar una moneda por contexto, pero debe conservar el valor persistido y la regla que lo justificó.

---

#### 30. Origen

Todo gasto debe conservar origen explícito suficiente para distinguir:

- captura manual legítima;
- soporte recibido;
- evento o documento externo correlacionado;
- ajuste autorizado;
- importación o reincorporación cuando aplique.

Se conserva:

```text
ORIGIN_REQUIRED = YES
SOURCE_APP_REQUIRED_WHEN_APPLICABLE = YES
```

---

#### 31. Soporte

El soporte puede ser obligatorio según categoría, importe, política, contraparte, riesgo o lifecycle.

UX-009 no define reglas fiscales nuevas, pero debe permitir:

```text
SUPPORT_REQUIRED -> BLOCK_COMMIT_WHEN_MISSING
SUPPORT_OPTIONAL -> DO_NOT_INVENT_EVIDENCE
```

---

#### 32. Importe

El importe debe validarse semánticamente y no solo por tipo de input.

La interfaz no asume que:

```text
PARSEABLE_NUMBER = VALID_BUSINESS_AMOUNT
```

Las reglas de signo, cero, límites y moneda pertenecen al contrato financiero aplicable.

---

#### 33. Fecha y periodo

Fecha del gasto y periodo económico no se consideran equivalentes por inferencia.

La captura debe permitir que el backend valide:

```text
EXPENSE_DATE
RECOGNITION_PERIOD
PERIOD_STATUS
```

antes de producir el efecto.

---

#### 34. Periodo vigente no se infiere desde la UI

La existencia de un periodo mostrado o seleccionado no prueba que siga abierto o sea válido al momento del commit.

Se conserva:

```text
PERIOD_STATUS_SERVER_REVALIDATION_REQUIRED = YES
```

---

#### 35. Hecho fuente versus gasto manual

La UX debe distinguir:

```text
SOURCE_OPERATIONAL_FACT
!=
MANUAL_EXPENSE_CAPTURE
```

Si un hecho ya existe desde PULSO, ORIGO, NEXO, FOGO u otra fuente propietaria, la UI no debe ofrecer una segunda captura manual que lo duplique por conveniencia.

---

#### 36. No duplicar hechos operativos

Se conserva:

```text
MANUAL_DUPLICATE_SOURCE_FACT = FORBIDDEN
```

Cuando un evento fuente ya esté correlacionado, el camino correcto es recuperar, clasificar, completar evidencia o conciliar el hecho existente según el proceso, no crear otro gasto equivalente.

---

#### 37. Identidad e idempotencia

Todo commit con riesgo de retry debe usar una identidad suficiente para impedir doble creación.

```text
SAME_INTENT + SAME_IDEMPOTENCY_KEY
-> AT_MOST_ONE_EFFECTIVE_EXPENSE
```

Doble clic, retry de red o timeout no deben generar dos gastos.

---

#### 38. Detección de duplicados

La validación de duplicados debe considerar, cuando existan:

- fuente;
- correlación;
- documento;
- contraparte;
- periodo/fecha;
- importe y moneda;
- centro de costo;
- identidad idempotente.

Una similitud no autoriza borrar o fusionar automáticamente.

---

#### 39. Resultado de la detección de duplicados

La UX debe distinguir al menos:

```text
NO_DUPLICATE_EVIDENCE
POSSIBLE_DUPLICATE_REVIEW_REQUIRED
EXACT_CORRELATED_RESOURCE_EXISTS
```

`EXACT_CORRELATED_RESOURCE_EXISTS` debe conducir a recuperar o enlazar el recurso existente, no a crear otro.

---

#### 40. Fase VALIDATE

La fase de validación reúne:

- campos requeridos;
- consistencia de dimensiones;
- scope;
- periodo/estado;
- importe y moneda;
- soporte requerido;
- origen y correlación;
- duplicidad;
- referencias existentes;
- restricciones del recurso.

Los errores deben asociarse al campo o regla correspondiente.

---

#### 41. Validación cliente no sustituye servidor

Se conserva:

```text
CLIENT_VALIDATION = USER_ASSISTANCE
SERVER_VALIDATION = AUTHORITY
```

La validación de UI mejora corrección temprana, pero el servidor decide el efecto.

---

#### 42. Fase REVIEW

Antes del commit, la persona debe poder revisar una síntesis de:

- qué gasto se registrará;
- empresa y dimensiones;
- periodo y fecha;
- categoría;
- contraparte cuando aplique;
- importe y moneda;
- centro de costo;
- origen;
- soporte;
- advertencias y duplicidad;
- efecto inmediato y siguiente paso.

`REVIEW` no es aprobación financiera.

---

#### 43. Jerarquía indicador-detalle dentro del flujo

Si la revisión incluye una síntesis cuantitativa y una tabla detallada comparable, se aplica:

```text
INDICATOR_BEFORE_DETAIL_TABLE = YES
```

Solo cuando ambos existan y representen el mismo contexto autorizado.

No se inventa un KPI para justificar la regla.

---

#### 44. Fase COMMIT

`COMMIT` representa una única intención exacta:

```text
CREATE_EXPENSE
```

No debe mezclar en el mismo submit:

- aprobar;
- pagar;
- conciliar;
- cerrar;
- exportar;
- modificar presupuesto;
- publicar escenario.

---

#### 45. Oracle de autorización del commit

La futura ejecución debe satisfacer:

```text
VALID_SESSION
+ APP_ACCESS
+ numera.finance.expenses.create
+ VALID_SCOPE
+ VALID_PROPOSED_DIMENSIONS
+ VALID_PERIOD_AND_RESOURCE_STATE
+ VALID_PAYLOAD
+ NO_EFFECTIVE_DENY
+ SERVER_SIDE_REVALIDATION
= CREATE_ELIGIBLE
```

Cualquier término ausente produce deny o bloqueo seguro.

---

#### 46. Revalidación server-side

Inmediatamente antes del efecto deben revalidarse como mínimo:

- permiso exacto;
- actor;
- scope;
- dimensiones propuestas;
- periodo y estado;
- payload permitido;
- duplicidad/idempotencia;
- restricciones del recurso.

Un botón habilitado no es evidencia de autorización.

---

#### 47. Mass assignment prohibido

El payload cliente no puede persistirse de forma indiscriminada.

Se conserva:

```text
MASS_ASSIGNMENT = FORBIDDEN
```

El servidor usa allowlist de campos y deriva internamente cualquier atributo cuya autoridad no pertenezca al cliente.

---

#### 48. Campos derivados por servidor

Un campo puede derivarse server-side únicamente cuando exista una regla canónica clara.

La UX no debe ocultar silenciosamente como verdad empresarial:

- moneda;
- origen;
- empresa;
- sede;
- centro de costo;
- periodo;
- actor.

Si el servidor deriva un valor material, el receipt debe permitir reconstruir qué valor se aplicó.

---

#### 49. Concurrencia

Cuando la intención dependa de un recurso mutable o periodo versionado, el commit debe poder detectar cambio concurrente.

```text
STALE_CONTEXT_OR_VERSION
-> DENY_AND_REEVALUATE
```

No se permite sobrescritura silenciosa.

---

#### 50. Resultado desconocido

Un timeout o pérdida de respuesta después del commit no significa que el gasto no exista.

La UX debe entrar a:

```text
RECOVER_UNKNOWN_RESULT
```

con la misma correlación/idempotency key antes de permitir reintento.

---

#### 51. Fase RESULT

El resultado UX debe distinguir:

```text
CONFIRMED_CREATED
VALIDATION_FAILED
AUTHORIZATION_DENIED
DUPLICATE_OR_CONFLICT
TECHNICAL_FAILURE_NO_EFFECT
RESULT_UNKNOWN_RECOVERY_REQUIRED
```

Estas etiquetas son outcomes UX, no nuevos estados empresariales del gasto.

---

#### 52. Cero side effect en deny

Se conserva:

```text
DENY_SIDE_EFFECT_ALLOWED = NO
```

Un deny de permiso, scope, periodo, estado, referencia o payload no puede dejar un gasto parcial.

---

#### 53. Fase RECEIPT

Un registro confirmado debe producir evidencia suficiente para continuar sin convertir el receipt en reporte financiero completo.

Puede incluir, según autoridad:

- identidad del gasto;
- actor;
- timestamp;
- importe y moneda registrados;
- periodo;
- centro de costo;
- origen;
- correlación/idempotency reference;
- estado/proceso aplicable;
- soporte asociado;
- siguiente acción permitida.

---

#### 54. Receipt no concede lectura amplia

El receipt puede mostrar el resultado de la acción ejecutada sin inferir:

```text
CREATE_SUCCESS
-> ALL_EXPENSES_VIEW
```

Listas, historial y drill-down continúan sujetos a permisos de lectura correspondientes.

---

#### 55. Fase RECOVER

La recuperación debe permitir distinguir:

- validación corregible;
- permiso o scope denegado;
- duplicado encontrado;
- conflicto stale;
- dependencia no disponible;
- resultado técnico desconocido;
- recurso creado que debe recuperarse por correlación.

No se usa retry indiscriminado.

---

#### 56. Mapeo a estados VPROC-0051

UX-009 no crea lifecycle de gasto nuevo.

Consume los estados canónicos de `VPROC-0051`:

```text
ECONOMIC_EVENT_RECEIVED
VALIDATION_IN_PROGRESS
CLASSIFICATION_PENDING
CLASSIFIED
POSTING_PENDING
POSTED
ALLOCATION_PENDING
RECONCILIATION_PENDING
ECONOMIC_EVENT_RECONCILED
```

---

#### 57. Mapeo UX a lifecycle existente

El flujo puede proyectarse de forma no uno-a-uno:

| Fase UX | Estado/proyección VPROC-0051 relacionada | Límite |
| --- | --- | --- |
| ENTRY / CONTEXT | `ECONOMIC_EVENT_RECEIVED` cuando ya existe un hecho correlacionado | recibir no reconoce ni registra definitivamente |
| CAPTURE / VALIDATE | `VALIDATION_IN_PROGRESS` | valida origen, soporte, entidad, fecha, valor, moneda y duplicidad |
| VALIDATE / REVIEW | `CLASSIFICATION_PENDING` / `CLASSIFIED` | clasificación propuesta, todavía sin registro definitivo |
| COMMIT | `POSTING_PENDING` | espera reconocimiento idempotente; no equivale a aprobación |
| RESULT / RECEIPT | `POSTED` cuando el reconocimiento aplicable fue confirmado | conserva vínculo con origen |
| posterior | `ALLOCATION_PENDING` / `RECONCILIATION_PENDING` | fuera del cierre de UX-009 salvo handoff |
| final de proceso | `ECONOMIC_EVENT_RECONCILED` | no se alcanza por registrar el gasto solamente |

---

#### 58. Registro de gasto no cierra VPROC-0051

Se conserva:

```text
EXPENSE_CREATED
!=
ECONOMIC_EVENT_RECONCILED
```

La creación puede dejar trabajo posterior de clasificación, asignación, conciliación o evidencia según el caso.

---

#### 59. Actualización de gasto

`numera.finance.expenses.update` pertenece a la misma familia de superficie, pero no es autoridad implícita del create.

UX-009 establece:

```text
CREATE_SUCCESS != UPDATE_AUTHORITY
```

Editar posteriormente exige permiso `update`, estado mutable, campos permitidos y revalidación propia.

---

#### 60. Cancelación de gasto

`numera.finance.expenses.cancel` permanece separada.

```text
CANCEL != DELETE
CANCEL != APPROVE
CANCEL != WRITE_OFF
```

UX-009 no convierte el botón o receipt de creación en una cancelación automática.

---

#### 61. Aprobación pertenece a NUMERA-UX-010

Se conserva:

```text
EXPENSE_CREATE != EXPENSE_APPROVE
EXPENSE_CREATE != EXPENSE_REJECT
```

La autoridad objetivo de aprobación/rechazo pertenece al contrato de `NUMERA-AUTH-005` y la experiencia detallada a `NUMERA-UX-010`.

---

#### 62. No autoaprobar al registrar

Queda prohibido diseñar:

```text
CREATOR_HAS_APPROVAL_PERMISSION
-> AUTO_APPROVE_ON_CREATE
```

Aunque una misma persona posea ambas capacidades, registrar y aprobar permanecen decisiones separadas y auditables.

---

#### 63. Pago pertenece a otro flujo

Registrar el gasto no ejecuta pago ni movimiento bancario.

```text
EXPENSE_CREATE != PAYABLE_APPROVAL
EXPENSE_CREATE != PAYMENT_PLAN
EXPENSE_CREATE != PAY_EXECUTE
```

---

#### 64. Conciliación pertenece a flujos posteriores

Crear un gasto no resuelve automáticamente:

- conciliación de ventas y pagos;
- compras y recepciones;
- inventario/producción/variaciones;
- conciliación bancaria.

La coincidencia de importe no es conciliación.

---

#### 65. Cierre pertenece a NUMERA-UX-011

```text
EXPENSE_CREATE != PERIOD_CLOSE
```

Registrar un gasto puede afectar precondiciones de cierre, pero no concede autoridad de cerrar o reabrir.

---

#### 66. Exportación pertenece a NUMERA-UX-012

```text
EXPENSE_CREATE != EXPORT
```

El receipt no debe convertirse en una exportación masiva por conveniencia.

---

#### 67. Relación con NUMERA-UX-013

La selección y filtrado por empresa, sede y centro de costo será desarrollada por `NUMERA-UX-013`.

UX-009 consume scope válido, pero no redefine el modelo de filtros ni convierte filtros en autorización.

---

#### 68. Relación con NUMERA-UX-014 y NUMERA-UX-015

UX-009 conserva:

```text
SOURCE_EVENT_CORRELATION = REQUIRED_WHEN_APPLICABLE
MANUAL_DUPLICATE_SOURCE_FACT = FORBIDDEN
```

La ingestión detallada de eventos y la prevención integral de duplicación entre aplicaciones pertenecen a `NUMERA-UX-014` y `NUMERA-UX-015`.

---

#### 69. Relación con NUMERA-UX-017 a NUMERA-UX-024

El registro puede producir handoffs hacia conciliación, obligación, bancos, costos, corrección o cobertura de fuentes, pero no absorbe esas experiencias.

Cada destino conserva proceso, permiso y lifecycle propios.

---

#### 70. Accesibilidad del flujo

La futura materialización deberá:

- asociar errores a controles concretos;
- anunciar cambios de fase y resultado;
- no depender solo de color para warning/error/success;
- mantener foco después de errores;
- conservar orden semántico coherente;
- identificar campos requeridos de forma programática;
- exponer motivo de bloqueo sin revelar datos no autorizados.

---

#### 71. Responsive y orden de lectura

En viewport reducido se conserva el orden empresarial:

```text
CONTEXTO
-> CAPTURA
-> VALIDACION
-> REVISION
-> COMMIT
-> RESULTADO
```

Reordenar visualmente no puede presentar el submit antes de advertencias o revisión obligatoria.

---

#### 72. Estados de carga y stale

Un cambio de empresa, sede, centro, periodo, categoría o contraparte que invalide contexto debe marcar como stale cualquier derivación dependiente.

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

---

#### 73. Información sensible

Importe, contraparte, soporte, documento, centro y origen pueden ser sensibles.

La UX aplica minimización por fase y evita:

- previews innecesarias;
- errores con payload completo;
- logs de formulario en cliente;
- tooltips que revelen miembros fuera de scope.

---

#### 74. Auditoría mínima esperada

La futura materialización debe conservar evidencia correlacionable de:

- actor;
- permiso evaluado;
- recurso/intención;
- dimensiones/scope evaluados;
- correlación/idempotency identity;
- decisión;
- resultado;
- error o compensación cuando aplique;
- timestamp y versión relevantes.

La auditoría no se convierte en autoridad.

---

#### 75. Observabilidad UX

Sin registrar contenido financiero innecesario, debe poder distinguirse:

```text
FLOW_OPENED
FLOW_CONTEXT_RESOLVED
FLOW_VALIDATION_FAILED
FLOW_DUPLICATE_DETECTED
FLOW_REVIEW_REACHED
FLOW_COMMIT_REQUESTED
FLOW_COMMIT_CONFIRMED
FLOW_AUTH_DENIED
FLOW_CONFLICT
FLOW_RESULT_UNKNOWN
FLOW_RECOVERY_COMPLETED
```

Estos nombres son categorías de observabilidad, no eventos de dominio ni estados de proceso.

---

#### 76. Error de autorización versus error técnico

La UX debe distinguir:

```text
AUTHORIZATION_DENIED
!=
TECHNICAL_FAILURE
```

Ambos fallan cerrados, pero su tratamiento y recuperación son diferentes.

---

#### 77. Dependencia faltante

Si falta una capacidad exacta materializada, relación de scope, catálogo requerido o dependencia propietaria:

```text
MISSING_DEPENDENCY = BLOCKED
MISSING_DEPENDENCY != LEGACY_FALLBACK
```

No se recupera usando `*.manage` ni role override.

---

#### 78. Materialización pendiente de permisos

El contrato de autorización registra `numera.finance.expenses.create` como identidad objetivo, pero su materialización física pertenece al lifecycle de autorización/packages.

UX-009 define la experiencia objetivo sin afirmar que el permiso ya esté publicado en runtime.

---

#### 79. AS-IS observado no gobierna el objetivo

El runtime auditado actualmente usa un formulario más pequeño y `numera.expenses.manage`.

Ese comportamiento se conserva como evidencia AS-IS, no como diseño objetivo.

La tarea no modifica ese código.

---

#### 80. Reconciliación del AS-IS de createExpense

El AS-IS observado recibe:

```text
period_id
category_id
cost_center_id
expense_date
description
amount
```

y deriva server-side:

```text
currency = COP
source_app = numera
```

UX-009 no adopta esos defaults como verdad contractual; exige moneda y origen explícitos conforme al contrato financiero vigente.

---

#### 81. Reconciliación de requisito legacy de mutación

La cobertura histórica exige revalidación server-side de la creación de gasto.

La identidad exacta objetivo queda reconciliada así:

```text
LEGACY = numera.expenses.manage
TARGET = numera.finance.expenses.create
```

La obligación de validar en servidor se conserva; el alias amplio no se conserva como autoridad objetivo.

---

#### 82. Indicador versus tabla en VSCREEN-0096

`VSCREEN-0096` está clasificada por UX-008 como condicional para la regla indicador-antes-detalle.

Por tanto:

- si existe síntesis comparable, aparece antes de la tabla detallada;
- si no existe un indicador canónico, no se inventa;
- el formulario sigue la secuencia del flujo y no se subordina artificialmente a una tabla;
- la síntesis no concede `expenses.create`.

---

#### 83. Validación de duplicidad antes del commit

La revisión debe presentar la duplicidad relevante antes del efecto cuando sea posible.

Si una comprobación crítica solo puede resolverse server-side, el commit debe poder responder con conflicto recuperable y cero creación duplicada.

---

#### 84. Borrador UX no implica borrador persistido

La persona puede capturar datos antes del commit.

Se conserva:

```text
UI_DRAFT_STATE
!=
PERSISTED_EXPENSE_DRAFT_BY_INFERENCE
```

Persistir borradores requerirá soporte explícito del recurso, estado y permisos; UX-009 no lo inventa.

---

#### 85. Interrupción de captura

Si la captura se abandona antes del commit y no existe persistencia explícita aprobada:

```text
NO_COMMIT = NO_EXPENSE_CREATED
```

La futura UI puede advertir pérdida de cambios locales sin crear datos financieros silenciosos.

---

#### 86. Edición después de creación

Una navegación posterior a edición debe reautorizar:

```text
numera.finance.expenses.update
```

además de scope, recurso, versión, estado mutable y campos permitidos.

No se reutiliza la decisión de `create`.

---

#### 87. Cancelación después de creación

Una cancelación posterior debe reautorizar:

```text
numera.finance.expenses.cancel
```

con motivo, actor, estado anterior y evidencia suficiente.

La cancelación preserva historia.

---

#### 88. Separación frente a la aprobación

`NUMERA-UX-010` debe recibir un gasto existente y elegible, no un formulario de creación todavía mutable.

Se conserva:

```text
REGISTRATION_FLOW_OUTPUT
!=
APPROVAL_DECISION
```

---

#### 89. Handoff de registro a aprobación

Cuando el gasto requiera aprobación y el actor pueda navegar al flujo correspondiente, el handoff puede transportar:

```text
expense_id
expense_version
current_process_state
entity_scope
site_scope
cost_center_scope
period
amount
currency
counterparty_reference
support_reference
source_reference
correlation_id
registration_receipt_id
intended_command = REVIEW_FOR_APPROVAL
```

El destino reautoriza todo lo necesario.

---

#### 90. Handoff no autoabre autoridad aprobatoria

Se conserva:

```text
CREATE_RECEIPT
+ APPROVAL_HANDOFF
!=
APPROVAL_AUTHORITY
```

La navegación puede existir aunque el destino termine en deny seguro.

---

#### 91. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

Justificación:

- el registro de gastos ya está cubierto por requisitos financieros, de autorización, idempotencia, servidor, trazabilidad y separación de acciones vigentes;
- la tarea especializa la experiencia sin crear proceso, pantalla, permiso, dato, transición o conducta empresarial nueva;
- no modifica el texto, estado, secuencia, relación ni owner de requisitos existentes;
- la materialización y las pruebas ejecutables permanecen en las unidades y packages propietarios.

---

#### 92. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-NUMERA-001` — reconciliación con fuente, separación lectura/registro/aprobación/cierre/exportación y trazabilidad;
- `TREQ-NUMERA-002` — identidad estable, entidad, sede, centro, tercero, moneda, fechas, origen, correlación, monto, estado y evidencia;
- `TREQ-NUMERA-003` — separación de registrar, aprobar, pagar, conciliar, cerrar, reabrir, castigar y exportar;
- `TREQ-NUMERA-017` — lectura de gastos separada del registro;
- `TREQ-NUMERA-018` — creación de gasto con validación económica y revalidación server-side, reconciliada con el permiso atómico objetivo;
- `TREQ-NUMERA-023` — navegación, menú o superficie no implican autorización;
- `TREQ-AUTH-001` — capacidad protegida por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-013` — mutación server-side valida permiso exacto, actor, territorio/contexto, recurso, estado y columnas;
- `TREQ-AUTH-014` — decisiones stale no se reutilizan;
- `TREQ-AUTH-015` — evidencia correlacionable de acción protegida;
- `TREQ-INTEGRATION-017` — integración financiera sin doble registro ni pérdida de trazabilidad.

Esta sección es trazabilidad de cobertura existente y no modifica el Registro 04A.

---

#### 93. Matriz de fases y gates

| Fase | Gate principal | Efecto permitido |
| --- | --- | --- |
| ENTRY | sesión + acceso + intención | ninguno |
| CONTEXT | scope mínimo resoluble | ninguno |
| CAPTURE | campos y referencias editables permitidas | ninguno |
| VALIDATE | consistencia + duplicidad + elegibilidad | ninguno |
| REVIEW | síntesis completa y warnings | ninguno |
| COMMIT | permiso create + server revalidation + idempotencia | crear un gasto exactamente una vez |
| RESULT | respuesta autoritativa o estado desconocido | presentar outcome |
| RECEIPT | efecto confirmado | emitir evidencia y siguiente acción |
| RECOVER | correlación + clasificación del fallo | recuperar, corregir o bloquear sin duplicar |

---

#### 94. Matriz de permisos del flujo

| Acción UX | Permiso objetivo | Esta tarea la diseña como primaria |
| --- | --- | --- |
| abrir NUMERA | `numera.access` | no |
| leer gasto existente | `numera.finance.expenses.view` | no, solo contexto cuando aplique |
| crear gasto | `numera.finance.expenses.create` | sí |
| actualizar gasto | `numera.finance.expenses.update` | no, frontera posterior de recurso mutable |
| cancelar gasto | `numera.finance.expenses.cancel` | no, frontera posterior de lifecycle |
| aprobar gasto | `numera.finance.expenses.approve` | no |
| rechazar gasto | `numera.finance.expenses.reject` | no |
| cerrar periodo | permiso de periodo correspondiente | no |
| exportar | `numera.analytics.financial_reports.export` | no |

---

#### 95. Matriz de ownership

| Materia | Owner canónico |
| --- | --- |
| captura de gasto | `NUMERA-UX-009` |
| aprobación/rechazo | `NUMERA-UX-010` |
| cierre/reapertura | `NUMERA-UX-011` |
| exportación | `NUMERA-UX-012` |
| filtros empresa/sede/centro | `NUMERA-UX-013` |
| ingestión de eventos fuente | `NUMERA-UX-014` |
| prevención integral de duplicado financiero | `NUMERA-UX-015` |
| conciliación ventas/pagos | `NUMERA-UX-017` |
| conciliación compras/recepciones | `NUMERA-UX-018` |
| conciliación inventario/producción | `NUMERA-UX-019` |
| cuentas por pagar | `NUMERA-UX-020` |
| caja y bancos | `NUMERA-UX-021` |
| costos/rentabilidad | `NUMERA-UX-022` |
| corrección/reapertura histórica | `NUMERA-UX-023` |
| cobertura/conciliación de fuentes | `NUMERA-UX-024` |

---

#### 96. Hallazgos y condiciones de salida

| Hallazgo | Bloquea esta definición | Owner | Condición de salida |
| --- | --- | --- | --- |
| runtime AS-IS todavía usa `numera.expenses.manage` | no | autorización NUMERA + package propietario | `expenses.create` materializado y consumidor migrado sin fallback legacy |
| createExpense AS-IS deriva moneda/origen fijos | no | dominio/UX/materialización aplicable | moneda y origen se resuelven conforme al contrato objetivo y se prueban |
| AS-IS no valida estado del periodo antes de insert | no | unidad propietaria de mutación + pruebas NUMERA | commit revalida periodo/estado en servidor |
| no existe lifecycle específico de gasto documentado como objeto separado | no | dominio propietario aplicable | UX usa VPROC-0051 y no inventa estados de gasto |
| persistencia de borrador no está definida | no | tarea futura solo si se decide necesaria | no se persiste borrador por inferencia |
| aprobación es flujo separado | no | `NUMERA-UX-010` | aprobación consume gasto existente y reautoriza decisión |

No queda hallazgo detectado sin owner ni condición de salida.

---

#### 97. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea es documental; no se ejecutó build de producto durante su preparación. |
| LOCAL | NOT_EXECUTED | La incorporación al checkout, normalización y batería documental quedan pendientes del ciclo manual del usuario. |
| REMOTA | PASS | Se verificaron `main`, secuencia activa, owner, topología, autorización NUMERA, permisos de registro, scope, auditoría, `VPROC-0051`, `VSCREEN-0096`, prototipo APF-09, auditoría AS-IS, 04A y scripts aplicables. |
| OPERATIVA | NOT_EXECUTED | No se creó, actualizó, canceló, aprobó, pagó, concilió ni cerró ningún gasto real. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-009` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`. |

---

#### 98. Criterios de aceptación

La tarea queda aceptada cuando se verifica que:

1. existe exactamente un contrato `NUMERA-EXPENSE-REGISTRATION-FLOW-001`;
2. `VSCREEN-0096` permanece como superficie propietaria;
3. `VPROC-0051` permanece como proceso propietario;
4. `STEP-CAPTURE_EXPENSE_AND_EVIDENCE` permanece como binding;
5. no se crea pantalla nueva;
6. no se crea proceso nuevo;
7. las fases UX no se presentan como estados empresariales nuevos;
8. create usa `numera.finance.expenses.create`;
9. `numera.expenses.manage` no se usa como autoridad objetivo;
10. `expenses.view` no concede create;
11. `numera.access` no concede create;
12. rol no concede create;
13. turno/check-in no conceden create;
14. create usa `FINANCIAL_ROW_SCOPE`;
15. selected site no concede scope;
16. primary site no concede scope;
17. filtros no conceden scope;
18. handoff no concede autoridad;
19. contexto del handoff se revalida;
20. ENTRY comunica intención y fronteras;
21. CONTEXT resuelve dimensiones aplicables;
22. CAPTURE minimiza campos;
23. periodo es obligatorio;
24. fecha es obligatoria;
25. categoría es obligatoria;
26. centro de costo es obligatorio;
27. moneda es explícita;
28. importe se valida semánticamente;
29. descripción se conserva;
30. origen es explícito;
31. soporte se exige cuando corresponda;
32. contraparte se exige cuando el caso la requiera;
33. no se inventa contraparte;
34. fecha y periodo no se confunden;
35. estado de periodo se revalida server-side;
36. hecho operativo fuente no se duplica manualmente;
37. idempotencia evita doble gasto por retry;
38. duplicados exactos recuperan/enlazan el recurso existente;
39. posibles duplicados requieren revisión;
40. VALIDATE reúne campos, scope, estado, origen, soporte y duplicidad;
41. validación cliente no sustituye servidor;
42. REVIEW no equivale a aprobación;
43. indicador antes de tabla se aplica solo cuando ambos existen y son comparables;
44. no se inventa KPI;
45. COMMIT representa solo `CREATE_EXPENSE`;
46. commit no aprueba;
47. commit no paga;
48. commit no concilia;
49. commit no cierra;
50. commit no exporta;
51. permiso exacto se revalida server-side;
52. actor y scope se revalidan server-side;
53. periodo y estado se revalidan server-side;
54. mass assignment está prohibido;
55. atributos derivados server-side tienen regla verificable;
56. stale context produce deny y reevaluación;
57. timeout no induce retry ciego;
58. resultado desconocido entra a recuperación;
59. outcomes UX no se presentan como estados del gasto;
60. deny produce cero side effects;
61. receipt conserva evidencia suficiente;
62. receipt no concede lectura omnibus;
63. recuperación diferencia deny, validación, conflicto y fallo técnico;
64. UX-009 consume los nueve estados VPROC-0051 sin modificarlos;
65. crear gasto no cierra `VPROC-0051`;
66. update requiere permiso independiente;
67. cancel requiere permiso independiente y conserva historia;
68. aprobación queda en UX-010;
69. no existe autoaprobación por acumulación de permisos;
70. pago queda fuera;
71. conciliación queda fuera;
72. cierre queda en UX-011;
73. exportación queda en UX-012;
74. scope/filtros especializados quedan en UX-013;
75. ingestión y duplicidad integral quedan en UX-014/015;
76. accesibilidad no depende solo de color;
77. responsive conserva orden empresarial;
78. datos stale no se presentan como vigentes;
79. información sensible se minimiza;
80. auditoría conserva correlación sin convertirse en autoridad;
81. observabilidad UX no crea eventos de dominio;
82. deny y fallo técnico se distinguen;
83. dependencia ausente bloquea sin fallback legacy;
84. la tarea no afirma materialización runtime de permisos pendientes;
85. el AS-IS se conserva como evidencia, no como objetivo;
86. moneda y origen AS-IS no se congelan como defaults canónicos;
87. cobertura legacy server-side se reconcilia con el permiso atómico objetivo;
88. `VSCREEN-0096` consume la regla UX-008 sin desordenar el flujo;
89. no se persiste borrador por inferencia;
90. abandonar captura sin commit no crea gasto;
91. handoff a aprobación transporta contexto y no autoridad;
92. no se crean ni modifican requisitos de prueba;
93. no se ejecutan cambios físicos;
94. `NUMERA-UX-010` recibe un contrato estable de salida de registro.

---

#### 99. Límites

Esta tarea no:

- materializa `numera.finance.expenses.create`;
- migra `numera.expenses.manage`;
- modifica grants o matrices RBAC;
- crea RLS, RPC, Server Actions o APIs;
- modifica formulario runtime;
- crea tabla o columna;
- define un lifecycle nuevo de gasto;
- persiste borradores por inferencia;
- define reglas fiscales nuevas;
- define aprobación;
- define rechazo;
- define pago;
- define conciliación;
- define cierre o reapertura;
- define exportación;
- define filtros completos de empresa/sede/centro;
- define ingestión completa de eventos fuente;
- define deduplicación integral multiaplicación;
- define cuentas por pagar;
- define caja o bancos;
- define costos o rentabilidad;
- define correcciones históricas;
- define el visor económico de UX-028;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-010`.

---

#### 100. Handoff a NUMERA-UX-010

La siguiente tarea recibe:

```text
NUMERA_EXPENSE_REGISTRATION_FLOW_CONTRACT = NUMERA-EXPENSE-REGISTRATION-FLOW-001
NUMERA_INDICATOR_DETAIL_HIERARCHY_CONTRACT = NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001
EXPENSE_REGISTRATION_SCREEN_ID = VSCREEN-0096
EXPENSE_REGISTRATION_PROCESS_ID = VPROC-0051
EXPENSE_REGISTRATION_STEP_ID = VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE
EXPENSE_CREATE_PERMISSION = numera.finance.expenses.create
EXPENSE_VIEW_PERMISSION = numera.finance.expenses.view
EXPENSE_UPDATE_PERMISSION = numera.finance.expenses.update
EXPENSE_CANCEL_PERMISSION = numera.finance.expenses.cancel
EXPENSE_APPROVE_PERMISSION = numera.finance.expenses.approve
EXPENSE_REJECT_PERMISSION = numera.finance.expenses.reject
LEGACY_EXPENSES_MANAGE_IS_TARGET_AUTHORITY = NO
EXPENSE_SCOPE_PROFILE = FINANCIAL_ROW_SCOPE
ROLE_NAME_IS_AUTHORIZATION = NO
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
SERVER_SIDE_REVALIDATION_REQUIRED = YES
PERIOD_STATUS_SERVER_REVALIDATION_REQUIRED = YES
MASS_ASSIGNMENT = FORBIDDEN
MANUAL_DUPLICATE_SOURCE_FACT = FORBIDDEN
CREATE_REQUIRES_IDEMPOTENCY_WHEN_RETRYABLE = YES
DENY_SIDE_EFFECT_ALLOWED = NO
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
EXPENSE_CREATE_IMPLIES_UPDATE = NO
EXPENSE_CREATE_IMPLIES_CANCEL = NO
EXPENSE_CREATE_IMPLIES_APPROVE = NO
EXPENSE_CREATE_IMPLIES_PAY_EXECUTE = NO
EXPENSE_CREATE_IMPLIES_RECONCILE = NO
EXPENSE_CREATE_IMPLIES_CLOSE = NO
EXPENSE_CREATE_IMPLIES_EXPORT = NO
EXPENSE_CREATED_IMPLIES_PROCESS_RECONCILED = NO
UI_DRAFT_IMPLIES_PERSISTED_DRAFT = NO
RESULT_UNKNOWN_REQUIRES_RECOVERY = YES
APPROVAL_HANDOFF_REQUIRES_REAUTHORIZATION = YES
UX_010_OWNER = FINANCIAL_APPROVAL_FLOW
TREQ_CHANGES = 0
```

`NUMERA-UX-010` deberá diseñar la decisión de aprobación/rechazo sobre recursos existentes y elegibles, sin reutilizar el permiso de creación como autoridad aprobatoria.

---

#### 101. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-008
-> NUMERA-UX-009
-> NUMERA-UX-010
```

La 009 consume la jerarquía visual de la 008 y entrega a la 010 un recurso registrado o un handoff elegible, sin absorber su decisión.

---

#### 102. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-008 — Mostrar indicadores antes que tablas detalladas`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-009 — Diseñar flujo de registro de gasto`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-010 — Diseñar flujo de aprobación`
### ✅ NUMERA-UX-010 — Diseñar flujo de aprobación

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-009 — Diseñar flujo de registro de gasto
**Tarea siguiente:** NUMERA-UX-011 — Diseñar flujo de cierre
**Tipo de tarea:** definición documental del flujo de aprobación y rechazo financiero en `VSCREEN-0097`, como bandeja agregadora de decisiones sobre recursos financieros subyacentes, con revisión, elegibilidad, segregación, reautenticación fuerte cuando aplique, revalidación server-side, idempotencia, concurrencia, receipt y recuperación, sin convertir la bandeja en autoridad omnibus ni absorber pago, conciliación, cierre, reapertura, exportación, publicación de planificación, materialización runtime o cambios físicos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica superficies de navegación, componentes React, permisos runtime, grants, roles, Server Actions, RLS, RPC, tablas, vistas, migraciones, Supabase, datos financieros, procesos, estados de proceso, packages compartidos, navegación runtime ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar de forma cerrada y verificable la experiencia mediante la cual una persona autorizada puede revisar una decisión financiera pendiente, comprender el recurso y la versión exactos sometidos a decisión, confirmar que la decisión sigue siendo elegible, aprobar o rechazar con autoridad atómica y recibir evidencia suficiente del resultado sin que visibilidad, rol nominal, autoría, pertenencia a una bandeja o permisos de registro se conviertan en autoridad aprobatoria.

La tarea materializa documentalmente el flujo UX de `VSCREEN-0097 — Bandeja de aprobaciones financieras` y conserva el ownership de cada recurso y proceso subyacente.

---

#### 2. Naturaleza y topología

La topología vigente de `NUMERA-UX` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea:

- define una sola vez el flujo UX de aprobación/rechazo;
- no crea instancia física propia;
- no publica permisos;
- no modifica `vento-numera`;
- no modifica Supabase;
- no ejecuta decisiones financieras reales;
- no altera estados de proceso durante esta definición.

---

#### 3. Handoff recibido de NUMERA-UX-009

La tarea recibe:

```text
NUMERA_EXPENSE_REGISTRATION_FLOW_CONTRACT = NUMERA-EXPENSE-REGISTRATION-FLOW-001
NUMERA_INDICATOR_DETAIL_HIERARCHY_CONTRACT = NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001
EXPENSE_REGISTRATION_SCREEN_ID = VSCREEN-0096
EXPENSE_REGISTRATION_PROCESS_ID = VPROC-0051
EXPENSE_REGISTRATION_STEP_ID = VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE
EXPENSE_CREATE_PERMISSION = numera.finance.expenses.create
EXPENSE_VIEW_PERMISSION = numera.finance.expenses.view
EXPENSE_UPDATE_PERMISSION = numera.finance.expenses.update
EXPENSE_CANCEL_PERMISSION = numera.finance.expenses.cancel
EXPENSE_APPROVE_PERMISSION = numera.finance.expenses.approve
EXPENSE_REJECT_PERMISSION = numera.finance.expenses.reject
LEGACY_EXPENSES_MANAGE_IS_TARGET_AUTHORITY = NO
EXPENSE_SCOPE_PROFILE = FINANCIAL_ROW_SCOPE
ROLE_NAME_IS_AUTHORIZATION = NO
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
SERVER_SIDE_REVALIDATION_REQUIRED = YES
PERIOD_STATUS_SERVER_REVALIDATION_REQUIRED = YES
MASS_ASSIGNMENT = FORBIDDEN
MANUAL_DUPLICATE_SOURCE_FACT = FORBIDDEN
CREATE_REQUIRES_IDEMPOTENCY_WHEN_RETRYABLE = YES
DENY_SIDE_EFFECT_ALLOWED = NO
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
EXPENSE_CREATE_IMPLIES_UPDATE = NO
EXPENSE_CREATE_IMPLIES_CANCEL = NO
EXPENSE_CREATE_IMPLIES_APPROVE = NO
EXPENSE_CREATE_IMPLIES_PAY_EXECUTE = NO
EXPENSE_CREATE_IMPLIES_RECONCILE = NO
EXPENSE_CREATE_IMPLIES_CLOSE = NO
EXPENSE_CREATE_IMPLIES_EXPORT = NO
EXPENSE_CREATED_IMPLIES_PROCESS_RECONCILED = NO
UI_DRAFT_IMPLIES_PERSISTED_DRAFT = NO
RESULT_UNKNOWN_REQUIRES_RECOVERY = YES
APPROVAL_HANDOFF_REQUIRES_REAUTHORIZATION = YES
UX_010_OWNER = FINANCIAL_APPROVAL_FLOW
TREQ_CHANGES = 0
```

La presente tarea consume ese handoff sin convertir la creación del gasto en aprobación ni asumir que todo recurso que aparece en la bandeja fue creado por `VSCREEN-0096`.

---

#### 4. Fuentes contractuales consumidas

El diseño consume y no redefine:

- `NUMERA-APPROVAL-PERMISSION-REGISTRY-001`;
- `NUMERA-READ-PERMISSION-REGISTRY-001`;
- `NUMERA-REGISTER-PERMISSION-REGISTRY-001`;
- el contrato de scope de `NUMERA-AUTH-008`;
- `NUMERA-FINANCIAL-AUDIT-CONTRACT-001`;
- la independencia administrativa de turno definida por autorización NUMERA;
- `NUMERA-DOM-005` para separación entre captura, aprobación y reconocimiento de gastos;
- `VPROC-0051`, `VPROC-0052` y `VPROC-0054` según el recurso decidido;
- `VSCREEN-0097` y `VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION`;
- el prototipo administrativo `APF-09`;
- la separación UX entre lectura y comando definida por `NUMERA-UX-002`;
- el flujo de registro de gasto definido por `NUMERA-UX-009`.

---

#### 5. Resultado contractual

Esta tarea define:

```text
NUMERA-FINANCIAL-APPROVAL-FLOW-001
```

El contrato describe las fases UX:

```text
ENTRY
QUEUE
RESOURCE_CONTEXT
REVIEW
ELIGIBILITY
STRONG_REAUTH_WHEN_APPLICABLE
DECISION
COMMIT_DECISION
RESULT
RECEIPT
RECOVER
```

Estas fases UX no son nuevos estados empresariales ni sustituyen el lifecycle del recurso subyacente.

---

#### 6. Superficie agregadora propietaria

El flujo principal se presenta en:

```text
SCREEN_ID = VSCREEN-0097
SCREEN_NAME = Bandeja de aprobaciones financieras
OWNER_PROCESS = VPROC-0052
OWNER_STEP = VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION
STEP_ACTION = APPROVE
STEP_LIFECYCLE_POSITION = DECISION
```

`VSCREEN-0097` agrega decisiones; no crea un recurso financiero `APPROVAL_QUEUE` con autoridad propia.

---

#### 7. La bandeja no es autoridad

Se congela:

```text
QUEUE_VISIBILITY != APPROVAL_AUTHORITY
ROW_VISIBILITY != APPROVAL_AUTHORITY
APPROVAL_SCREEN_ACCESS != APPROVAL_AUTHORITY
```

Quedan prohibidos como autoridad objetivo:

```text
numera.finance.approvals.approve
numera.finance.approvals.reject
numera.finance.approvals.manage
```

Cada decisión se autoriza contra el recurso subyacente y su permiso exacto.

---

#### 8. Universo cerrado de decisiones de esta tarea

UX-010 consume exactamente el universo base aprobado por `NUMERA-AUTH-005`:

```text
DECISION_FAMILIES = 6
APPROVE_PERMISSIONS = 6
REJECT_PERMISSIONS = 6
TOTAL_DECISION_PERMISSIONS = 12
```

No se agrega una decimotercera identidad aprobatoria por inferencia.

---

#### 9. Matriz completa de decisiones

| Familia | Lectura requerida | Aprobar | Rechazar | Superficie de detalle | Proceso / paso relacionado |
| --- | --- | --- | --- | --- | --- |
| `EXPENSE` | `numera.finance.expenses.view` | `numera.finance.expenses.approve` | `numera.finance.expenses.reject` | `VSCREEN-0096` | `VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE` + decisión agregada en `VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION` |
| `PAYABLE` | `numera.finance.payables.view` | `numera.finance.payables.approve` | `numera.finance.payables.reject` | `VSCREEN-0098` | `VPROC-0052::STEP-MANAGE_PAYABLE_OBLIGATION` |
| `PAYMENT_PLAN` | `numera.finance.payment_plans.view` | `numera.finance.payment_plans.approve` | `numera.finance.payment_plans.reject` | `VSCREEN-0155` | `VPROC-0052::STEP-PLAN_AND_EXECUTE_PAYMENTS` |
| `FISCAL_DOCUMENT_REFERENCE` | `numera.finance.fiscal_documents.view` | `numera.finance.fiscal_documents.approve` | `numera.finance.fiscal_documents.reject` | `VSCREEN-0154` | `VPROC-0051::STEP-MANAGE_FISCAL_DOCUMENT` |
| `TAX_OBLIGATION` | `numera.finance.tax_obligations.view` | `numera.finance.tax_obligations.approve` | `numera.finance.tax_obligations.reject` | `VSCREEN-0157` | `VPROC-0052::STEP-MANAGE_TAX_OBLIGATION` |
| `COST_ALLOCATION` | `numera.finance.cost_allocations.view` | `numera.finance.cost_allocations.approve` | `numera.finance.cost_allocations.reject` | `VSCREEN-0158` | `VPROC-0054::STEP-ALLOCATE_COSTS` |

La matriz contiene seis filas únicas, doce decisiones exactas, cero faltantes y cero duplicados.

---

#### 10. Lectura y decisión permanecen separadas

Se conserva:

```text
APPROVE_PERMISSION_IMPLIES_VIEW = NO
REJECT_PERMISSION_IMPLIES_VIEW = NO
APPROVAL_QUEUE_ROW_REQUIRES_UNDERLYING_VIEW = YES
```

Un actor puede poseer una autoridad decisoria sin recibir por ello consulta general de todos los recursos de la familia.

---

#### 11. Entrada al flujo

`ENTRY` debe mostrar únicamente contexto suficiente para identificar:

- tipo de recurso;
- identidad estable o referencia autorizada;
- decisión solicitada;
- scope relevante;
- estado de revisión;
- urgencia o vencimiento cuando forme parte del recurso;
- procedencia del handoff.

La entrada no ejecuta decisiones ni asume que la fila continúa elegible.

---

#### 12. Construcción de la bandeja

`QUEUE` reúne únicamente recursos cuya proyección autorizada pueda ser mostrada al actor.

La bandeja no puede inferir visibilidad desde:

- rol nominal;
- cargo;
- sede seleccionada;
- autoría;
- pertenencia a un proceso;
- existencia del ID;
- haber recibido un enlace directo.

---

#### 13. Conteos y badges de la bandeja

Un número de pendientes puede revelar información financiera sensible.

Se conserva:

```text
COUNT_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
BADGE_VISIBILITY_REQUIRES_READ_AUTHORITY = YES
```

Los totales de la bandeja se calculan sobre miembros individualmente visibles y no sobre filas ocultas.

---

#### 14. Estado vacío

La UI deberá distinguir al menos:

```text
NO_VISIBLE_PENDING_DECISIONS
NOT_AUTHORIZED_TO_VIEW_THIS_RESOURCE
DEPENDENCY_NOT_AVAILABLE
TECHNICAL_ERROR
```

No se mostrará `0 pendientes` cuando en realidad la consulta fue denegada o no pudo resolverse.

---

#### 15. Seleccionar una fila no concede autoridad

Abrir una fila cambia la superficie de revisión, no la decisión de autorización.

```text
SELECT_ROW != AUTHORIZE_DECISION
OPEN_DETAIL != AUTHORIZE_DECISION
```

La autorización final se reevalúa antes del efecto.

---

#### 16. Contexto del recurso

`RESOURCE_CONTEXT` debe identificar sin ambigüedad:

- recurso y tipo;
- versión observada;
- estado actual;
- empresa/entidad y dimensiones autorizadas aplicables;
- importe y moneda cuando existan;
- periodo cuando aplique;
- contraparte cuando aplique;
- origen y correlación;
- evidencia o soporte disponible;
- actor o proceso que produjo la propuesta cuando sea visible y necesario.

---

#### 17. Revisar no es decidir

Se congela:

```text
REVIEW != APPROVE
REVIEW != REJECT
```

La pantalla puede permitir análisis detallado antes de decidir sin que la navegación o la permanencia en la vista produzcan un efecto empresarial.

---

#### 18. Semántica de aprobación y rechazo

```text
approve != reject != resolve
```

- `approve` acepta la propuesta exacta sometida a decisión;
- `reject` emite una decisión negativa explícita y trazable;
- `resolve` permanece reservado a conciliación o resolución de discrepancias.

---

#### 19. Revisión de gasto

Para `EXPENSE`, la revisión debe poder presentar, según autorización:

- causa;
- importe;
- moneda;
- periodo;
- centro y dimensiones;
- origen;
- soporte;
- duplicidad o correlación relevante;
- versión;
- estado de la propuesta.

No se asume que la creación del gasto ya constituye reconocimiento económico.

---

#### 20. Revisión de cuenta por pagar

Para `PAYABLE`, la revisión debe permitir verificar, según el contrato del recurso:

- contraparte;
- documento y origen;
- aceptación o soporte relacionado;
- importe y moneda;
- vencimiento;
- componentes aplicables;
- versión;
- estado;
- segregación exigible.

Aprobar la obligación no programa ni ejecuta el pago.

---

#### 21. Revisión de plan de pago

Para `PAYMENT_PLAN`, la revisión debe identificar:

- versión del plan;
- obligaciones incluidas;
- importes;
- fechas o prioridades aplicables;
- alcance;
- evidencia de preparación;
- estado previo.

La aprobación del plan no envía una instrucción monetaria.

---

#### 22. Revisión de documento fiscal

Para `FISCAL_DOCUMENT_REFERENCE`, la revisión representa una decisión interna NUMERA sobre tratamiento o readiness.

No debe presentarse como:

```text
EXTERNAL_FISCAL_ACCEPTANCE
TAX_FILING
LEGAL_DETERMINATION
```

La UI debe preservar explícitamente esa frontera.

---

#### 23. Revisión de obligación tributaria

Para `TAX_OBLIGATION`, la decisión es interna y financiera.

No puede comunicar que aprobar equivale a:

- determinación legal oficial;
- presentación;
- aceptación por autoridad externa;
- pago.

---

#### 24. Revisión de distribución de costos

Para `COST_ALLOCATION`, la revisión debe poder identificar:

- pool;
- driver;
- base;
- origen;
- destinos;
- versión;
- vigencia;
- evidencia.

La aprobación no modifica hechos fuente ni cierra el periodo.

---

#### 25. Gate de elegibilidad

Antes de habilitar una decisión real, `ELIGIBILITY` debe comprobar:

```text
VALID_SESSION
+ EFFECTIVE_ACTOR
+ UNDERLYING_VIEW_AUTHORITY
+ EXACT_DECISION_PERMISSION
+ VALID_SCOPE
+ EXACT_RESOURCE
+ CURRENT_RESOURCE_VERSION
+ APPROVABLE_OR_REJECTABLE_STATE
+ SEGREGATION_SATISFIED_OR_GOVERNED_EXCEPTION
+ NO_EFFECTIVE_DENY
= DECISION_ELIGIBLE
```

Cualquier componente ausente o indeterminado bloquea la decisión.

---

#### 26. Permiso exacto por intención

El botón o acción seleccionada determina el permiso exacto solicitado:

```text
APPROVE -> <resource>.approve
REJECT -> <resource>.reject
```

No existe fallback entre ambos permisos.

---

#### 27. Estado previo obligatorio

Se conserva:

```text
PERMISSION_PRESENT + RESOURCE_NOT_APPROVABLE = DENY
```

La UI no debe habilitar una transición porque el actor tenga permiso si el recurso ya cambió a un estado incompatible.

---

#### 28. Versión exacta de revisión

La decisión siempre se vincula a la versión revisada.

```text
REVIEWED_VERSION != CURRENT_VERSION
-> DENY_AND_REVIEW_AGAIN
```

No se permite aprobar una versión materialmente distinta por actualización silenciosa.

---

#### 29. Scope efectivo

La existencia del permiso no concede alcance global.

Cada decisión consume el scope del recurso definido por autorización NUMERA y debe revalidar las dimensiones relevantes inmediatamente antes del efecto.

```text
VALID_PERMISSION + INVALID_SCOPE = DENY
```

---

#### 30. Selected site y primary site

Se preserva:

```text
SELECTED_SITE != AUTHORITY
PRIMARY_SITE != AUTHORITY
```

Los selectores de interfaz pueden acotar contexto visual, pero nunca ampliar el conjunto autorizable.

---

#### 31. Rol nominal

```text
ROLE_NAME != APPROVAL_AUTHORITY
```

`contador`, `gerente`, `gerente_general`, `propietario` u otros nombres no sustituyen el permiso exacto, scope, estado y segregación.

---

#### 32. Autoría y ownership

Ser creador, registrador, responsable o owner funcional no concede aprobación.

```text
OWNERSHIP != APPROVAL_AUTHORITY
CREATED_BY_ACTOR != APPROVAL_AUTHORITY
```

---

#### 33. Segregación por defecto

Se conserva:

```text
REGISTER_PERMISSION != APPROVE_PERMISSION
UPDATE_PERMISSION != APPROVE_PERMISSION
```

La UX debe exponer la causa de bloqueo cuando la política de segregación impida que el actor actual decida.

---

#### 34. Acumulación excepcional de funciones

Una organización puede asignar registro y aprobación a la misma persona únicamente mediante excepción gobernada.

La UX no crea esa excepción por:

- tamaño de empresa;
- ausencia de otro actor;
- rol nominal;
- ownership;
- urgencia;
- pertenencia al mismo equipo.

La excepción, cuando exista, deberá llegar como política autorizada y auditable.

---

#### 35. Reautenticación fuerte

Las decisiones financieras reales conservan:

```text
shared_device_requirement = STRONG
```

Cuando el contrato transversal exija reautenticación fuerte, la UI deberá resolverla antes del efecto y asociarla al actor efectivo y a la decisión exacta.

Reautenticarse no concede el permiso faltante.

---

#### 36. Reautenticación no reutilizable indefinidamente

Una reautenticación previamente válida no debe presentarse como suficiente cuando:

- cambió el actor;
- cambió el recurso;
- cambió materialmente la versión;
- expiró la evidencia de reautenticación;
- cambió el contexto que exige nueva evaluación.

---

#### 37. Aprobación upstream válida

Si el dominio propietario ya aportó una decisión empresarial válida y la política no exige una aprobación financiera adicional, NUMERA no debe crear una segunda aprobación equivalente solo por ingerir el hecho.

```text
VALID_UPSTREAM_APPROVAL + NO_ADDITIONAL_FINANCIAL_POLICY
-> NO_DUPLICATE_APPROVAL
```

---

#### 38. Aprobación financiera adicional

Cuando exista una política explícita que exija una decisión NUMERA adicional, la UX debe identificarla como decisión distinta y preservar:

- actor;
- permiso;
- scope;
- recurso;
- versión;
- evidencia;
- resultado.

No se inventan dobles aprobaciones universales.

---

#### 39. El review no muta

Ninguna interacción de `REVIEW` puede producir:

- aprobación;
- rechazo;
- pago;
- conciliación;
- cierre;
- exportación;
- publicación.

El primer side effect empresarial del flujo ocurre únicamente en `COMMIT_DECISION`.

---

#### 40. Acción aprobar

`APPROVE` debe indicar inequívocamente:

- recurso;
- versión;
- alcance;
- importe o impacto aplicable;
- consecuencia inmediata de la decisión;
- lo que la decisión no ejecuta.

La confirmación no debe usar textos ambiguos equivalentes a “continuar” cuando el efecto sea una aprobación financiera.

---

#### 41. Acción rechazar

`REJECT` es una decisión empresarial explícita.

Debe exigir:

```text
REJECTION_REASON_REQUIRED = YES
```

El motivo se conserva como evidencia y no se sustituye con un código técnico de error.

---

#### 42. Rechazo conserva el recurso

Un rechazo:

```text
!= DELETE
!= CANCEL
!= SOURCE_REWRITE
```

El recurso, su soporte y la evidencia de la decisión permanecen disponibles conforme a sus permisos y lifecycle.

---

#### 43. Cambio posterior de decisión

Un retry no puede convertir silenciosamente:

```text
approve -> reject
reject -> approve
```

Un cambio de decisión requiere una nueva intención válida sobre un estado y versión que permitan otra decisión.

---

#### 44. Comentario de aprobación

Un comentario de aprobación puede ser obligatorio por política, umbral, excepción o tipo de recurso.

Cuando sea opcional, su ausencia no elimina la evidencia mínima de actor, permiso, recurso, versión, estado, scope, resultado y timestamp.

---

#### 45. Umbrales no inventados

UX-010 no define valores monetarios universales de aprobación.

```text
MISSING_APPROVAL_THRESHOLD != AUTOMATIC_APPROVAL
MISSING_APPROVAL_THRESHOLD != AUTOMATIC_DENY
```

La UI consume una política versionada cuando exista; no inventa umbrales desde el rol o el importe visible.

---

#### 46. Idempotencia de decisión

La misma decisión técnica reintentada sobre el mismo recurso y versión debe producir una sola decisión empresarial efectiva.

```text
SAME_RESOURCE
+ SAME_VERSION
+ SAME_DECISION
+ SAME_IDEMPOTENCY_KEY
-> ONE_BUSINESS_DECISION
```

---

#### 47. Doble clic

Un doble clic o retry de red no puede crear dos decisiones, dos transiciones ni dos receipts contradictorios.

La UI deberá deshabilitar repetición local cuando sea posible, pero la garantía final permanece server-side.

---

#### 48. Revalidación server-side

Inmediatamente antes del efecto, el servidor deberá resolver como mínimo:

```text
principal
actor_effective
permission_key
resource_type
resource_id
resource_version
current_state
requested_decision
scope_result
field_projection
authorization_result
```

El cliente no es la autoridad final.

---

#### 49. Deny sin side effect

Se conserva:

```text
DENY_SIDE_EFFECT_ALLOWED = NO
```

Una denegación no puede dejar aprobación parcial, rechazo parcial, transición parcial, pago, publicación o modificación del recurso.

---

#### 50. Resultado desconocido

Un timeout o pérdida de conexión después del envío no se presenta automáticamente como fallo empresarial.

```text
RESULT_UNKNOWN
-> QUERY_OR_RECONCILE
```

La UI debe consultar/reconciliar el resultado antes de permitir un retry que pueda duplicar la decisión.

---

#### 51. Resultados UX

La capa de experiencia distinguirá al menos:

```text
DECISION_CONFIRMED
DECISION_DENIED
DECISION_REJECTED_BY_VALIDATION
DECISION_CONFLICT
DECISION_RESULT_UNKNOWN
DEPENDENCY_UNAVAILABLE
TECHNICAL_FAILURE
```

Estos outcomes no son nuevos estados empresariales.

---

#### 52. Receipt

Una decisión confirmada genera un receipt o proyección equivalente que permita reconstruir:

- recurso;
- versión;
- decisión;
- actor;
- permiso;
- scope;
- estado previo;
- timestamp;
- correlación;
- motivo cuando corresponda;
- siguiente acción permitida, si existe.

El receipt no concede autoridad adicional.

---

#### 53. Snapshot de decisión

La evidencia decisoria debe conservar como mínimo:

```text
resource_identity
resource_version
previous_state
effective_actor
exact_permission
scope_evaluated
material_dimensions
amount_and_currency_when_applicable
reviewed_support_references
approve_or_reject
reason_when_required
timestamp
correlation_id
```

La auditoría conserva evidencia suficiente sin convertirse en una copia paralela del payload financiero completo.

---

#### 54. Aprobación no equivale a reconocimiento

Especialmente para gastos:

```text
CAPTURED != APPROVED != RECOGNIZED
```

Aprobar no inserta por sí sola un asiento ni afirma que `VPROC-0051` quedó conciliado.

---

#### 55. Aprobación no equivale a pago

```text
PAYABLE_APPROVED != PAYMENT_EXECUTED
PAYMENT_PLAN_APPROVED != PAYMENT_EXECUTED
```

UX-010 no contiene controles de ejecución monetaria.

---

#### 56. Aprobación no equivale a conciliación

```text
APPROVE != RECONCILE
REJECT != RECONCILE
```

La bandeja no resuelve matching bancario ni diferencias por el hecho de emitir una decisión.

---

#### 57. Aprobación no equivale a cierre

```text
APPROVE != CLOSE
APPROVE != REOPEN
```

`NUMERA-UX-011` conserva el flujo de cierre y reapertura.

---

#### 58. Aprobación no equivale a exportación

```text
APPROVE != EXPORT
REJECT != EXPORT
```

`NUMERA-UX-012` conserva la experiencia de exportación con permiso independiente.

---

#### 59. Aprobación no equivale a publicación

La aprobación de un recurso no concede publicar, compartir ni activar otra representación.

Esto incluye planificación económica, donde:

```text
REQUEST != APPROVE
APPROVE != PUBLISH
PUBLISH != OPERATIONAL_ACTIVATION
```

---

#### 60. Frontera con escenarios, presupuestos, forecast y precios

`NUMERA-AUTH-015` define permisos especializados `.approve` y `.reject` para escenarios, presupuestos, forecast y versiones de precio sobre `VSCREEN-0156` y superficies relacionadas.

UX-010 no agrega esas identidades al universo base de doce decisiones de `VSCREEN-0097` ni las convierte en filas de la bandeja por inferencia.

El patrón UX de revisión, stale version, segregación y decisión puede ser reutilizado posteriormente por esas superficies sin transferir ownership.

---

#### 61. Frontera con cartera y bancos especializados

Decisiones especializadas de acuerdos, castigos, límites, cuentas bancarias, instrucciones de pago y otras capacidades de alto impacto permanecen bajo `NUMERA-AUTH-014` y sus superficies propietarias.

UX-010 no inventa botones aprobatorios genéricos para esas acciones.

---

#### 62. VPROC-0052 y la aprobación de obligaciones

Para cuentas por pagar, el lifecycle canónico conserva:

```text
PAYABLE_REGISTERED
-> DOCUMENT_VALIDATING
-> UNDER_APPROVAL
-> APPROVED_FOR_SCHEDULING
-> SCHEDULED_FOR_PAYMENT
-> PAYMENT_IN_PROGRESS
-> PAYMENT_RECORDED
-> BANK_RECONCILIATION_PENDING
-> PAYABLE_SETTLED
```

La decisión aprobatoria asociada a la obligación opera sobre la frontera:

```text
UNDER_APPROVAL
-> APPROVED_FOR_SCHEDULING
```

sin saltar directamente a programación, pago o conciliación.

---

#### 63. VPROC-0051 y aprobación de gastos

Un gasto registrado puede requerir una decisión financiera, pero esa decisión no crea un estado adicional inventado en `VPROC-0051`.

La UX conserva el contrato de dominio:

```text
CAPTURED != APPROVED != RECOGNIZED
```

El lifecycle económico continúa siendo el aprobado para `VPROC-0051`.

---

#### 64. VPROC-0054 y distribuciones de costo

Una decisión sobre `COST_ALLOCATION` utiliza el recurso y versión de distribución correspondientes.

Aprobar la distribución no:

- reescribe el hecho fuente;
- ejecuta una distribución distinta de la revisada;
- cierra el periodo;
- convierte una transferencia interna en gasto legal.

---

#### 65. Operaciones masivas

UX-010 puede representar selección múltiple únicamente si el contrato de la futura operación lo permite.

Toda fila seleccionada requiere:

- lectura autorizada;
- permiso decisorio exacto;
- scope válido;
- versión vigente;
- estado elegible;
- segregación satisfecha.

---

#### 66. Atomicidad de lote explícita

Una acción masiva deberá declarar antes del efecto si su política es:

```text
ALL_OR_NOTHING
```

o si admite resultado parcial gobernado.

La UI no inventa atomicidad silenciosa.

---

#### 67. Resultado parcial

Cuando un lote permita resultado parcial, la UX debe identificar por recurso:

- confirmado;
- denegado;
- stale;
- conflicto;
- desconocido;
- no ejecutado.

Un total agregado no sustituye el receipt por miembro.

---

#### 68. Orden de información

La pantalla prioriza:

1. qué decisión se solicita;
2. sobre qué recurso y versión;
3. impacto y evidencia relevante;
4. bloqueos o segregación;
5. acciones approve/reject;
6. detalle adicional bajo demanda.

El diseño no obliga a mostrar tablas extensas antes de entender la decisión.

---

#### 69. Relación con NUMERA-UX-008

Cuando un indicador y un detalle tabular representen el mismo contexto autorizado, se conserva la jerarquía de UX-008.

Sin embargo:

```text
INDICATOR_FIRST != DECISION_AUTHORITY
```

Una síntesis visual nunca sustituye la revisión del recurso exacto ni la versión decidida.

---

#### 70. Accesibilidad semántica

La implementación futura deberá comunicar sin depender solo del color:

- pendiente;
- elegible;
- bloqueado;
- stale;
- aprobado;
- rechazado;
- conflicto;
- resultado desconocido;
- no autorizado.

Las acciones aprobar y rechazar deben conservar nombres accesibles inequívocos.

---

#### 71. Navegación por teclado y foco

La futura materialización deberá preservar orden lógico de foco entre:

- fila;
- detalle;
- evidencia;
- alertas;
- confirmación;
- approve/reject;
- receipt.

Un modal de confirmación no debe devolver el foco a otra fila y provocar una decisión accidental.

---

#### 72. Responsive

En pantallas estrechas, el orden empresarial debe conservar:

```text
RESOURCE
-> REVIEW
-> BLOCKERS
-> DECISION
```

Los botones no pueden quedar separados del recurso de forma que el actor pueda confundir qué fila está decidiendo.

---

#### 73. Cambio de contexto

Si cambia empresa, sede, centro, actor, scope o selector relevante mientras una revisión está abierta:

```text
CONTEXT_CHANGED
-> INVALIDATE_REVIEW
-> RELOAD_OR_REAUTHORIZE
```

No se conserva una cifra o autoridad del contexto anterior como vigente.

---

#### 74. Caché de autorización

Se conserva:

```text
STALE_AUTHORIZATION_DECISION = DENY_AND_REEVALUATE
```

Una decisión previamente calculada no se reutiliza después de un cambio material de contexto, permiso, recurso, versión o estado.

---

#### 75. Error empresarial y error técnico

La UX deberá distinguir:

```text
BUSINESS_DENY
VALIDATION_BLOCK
SEGREGATION_BLOCK
STALE_RESOURCE
TECHNICAL_FAILURE
RESULT_UNKNOWN
```

No se mostrará un fallo técnico como rechazo empresarial ni un deny como “error del servidor” genérico cuando exista una razón segura que pueda comunicarse.

---

#### 76. Mensajes de deny

Un deny puede explicar de forma minimizada la causa aplicable, por ejemplo:

- permiso insuficiente;
- fuera de alcance;
- estado no elegible;
- versión cambió;
- segregación impide decidir;
- recurso ya fue decidido.

No debe filtrar datos financieros ocultos para explicar la denegación.

---

#### 77. Sin fallback legacy

Queda prohibido autorizar decisiones mediante:

```text
numera.expenses.manage
numera.cost_centers.manage
numera.*
numera.finance.*
role_override
```

La ausencia de la capacidad exacta bloquea la acción.

---

#### 78. Capacidades pendientes de materialización

UX-010 documenta el comportamiento objetivo aun cuando parte de las identidades de lectura o decisión continúen pendientes de materialización runtime.

La UX no puede simular que una capacidad contractual ya está publicada.

```text
CONTRACT_DEFINED_PENDING_MATERIALIZATION != RUNTIME_ACTIVE
```

---

#### 79. Simulación

Una simulación de autorización puede explicar si el actor sería elegible, pero:

```text
SIMULATED_DECISION != REAL_DECISION
```

Nunca aprueba, rechaza, cambia estado ni crea receipt empresarial real.

---

#### 80. AS-IS no define el objetivo

La auditoría actual de NUMERA no demuestra una bandeja completa de aprobaciones ni la materialización de las doce decisiones objetivo.

Esa ausencia no autoriza a:

- reutilizar `*.manage`;
- omitir segregación;
- autoaprobar recursos;
- fusionar aprobación con registro;
- tratar una fila técnica como decisión.

---

#### 81. Handoff desde UX-009

Cuando el registro de gasto genere una propuesta elegible para decisión, el handoff transporta:

- identidad del recurso;
- versión;
- contexto autorizado necesario;
- evidencia/correlación;
- tipo de decisión pendiente.

No transporta una autoridad aprobatoria preconcedida.

```text
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
```

---

#### 82. Handoff hacia detalle

Desde `VSCREEN-0097` puede abrirse la superficie de detalle correspondiente para revisar el recurso.

La navegación conserva:

```text
NAVIGATION != AUTHORIZATION
```

El detalle reevalúa su lectura; la decisión reevalúa además su permiso aprobatorio.

---

#### 83. Observabilidad mínima

La futura materialización deberá poder distinguir, sin registrar payload financiero sensible innecesario:

- queue loaded;
- row hidden by authorization;
- review opened;
- eligibility denied;
- stale review;
- strong reauth requested/completed/failed;
- approve requested/confirmed/unknown;
- reject requested/confirmed/unknown;
- batch partial result cuando aplique.

Estos eventos UX no son eventos de dominio ni autoridad.

---

#### 84. Seguridad de datos en telemetría

Logs, métricas y trazas no deben incluir por comodidad:

- secretos;
- credenciales bancarias;
- JWT;
- PIN/OTP;
- payload financiero completo;
- soportes documentales completos;
- grant internals innecesarios.

La correlación no se convierte en autoridad.

---

#### 85. Hallazgos y ownership

| Hallazgo | Bloquea esta definición | Propietario | Condición de salida |
| --- | --- | --- | --- |
| varias capacidades de lectura/decisión aún no están materializadas | no | `NUMERA-AUTH-012` + unidades/packages aplicables | identidades exactas quedan publicadas y consumidores migrados sin fallback legacy |
| runtime no demuestra todavía la bandeja objetivo de doce decisiones | no | implementación NUMERA / package aplicable | `VSCREEN-0097` materializa el contrato y supera pruebas de allow/deny, scope, estado y segregación |
| política monetaria universal de umbrales no está aprobada | no | gobierno empresarial competente | política versionada declara valores, moneda, vigencia, alcance y autoridad antes de aplicarse |
| filtros completos por empresa/sede/centro se desarrollan después | no | `NUMERA-UX-013` | filtros consumen scope sin ampliar autoridad ni ocultar diferencias semánticas |
| escenarios/presupuestos/forecast/precios usan aprobación especializada | no | `NUMERA-AUTH-015` + `VSCREEN-0156` / UX propietaria | sus superficies consumen permisos especializados sin convertirse por inferencia en filas base de `VSCREEN-0097` |
| cartera y bancos incluyen decisiones de alto impacto adicionales | no | `NUMERA-AUTH-014` + UX propietaria | acciones especializadas conservan permisos y superficies exactas |

No queda hallazgo detectado sin owner ni condición de salida.

---

#### 86. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 87. Cobertura de prueba vigente reutilizada

La tarea reutiliza, sin modificar texto, estado, secuencia ni relaciones, cobertura ya registrada para:

- `TREQ-NUMERA-001` — separación de lectura, registro, aprobación, cierre y exportación y trazabilidad financiera;
- `TREQ-NUMERA-002` — identidad, versión, estado, evidencia y correcciones no destructivas;
- `TREQ-NUMERA-003` — separación entre registrar, aprobar, pagar, conciliar, cerrar, reabrir, castigar y exportar;
- `TREQ-NUMERA-018` — autoridad server-side y validación económica del gasto;
- `TREQ-NUMERA-023` — existencia de ruta/fila/menu no implica autorización;
- `TREQ-AUTH-001` — permiso, contexto y alcance canónicos;
- `TREQ-AUTH-013` — revalidación server-side de actor, permiso, territorio/contexto, recurso, estado y efecto;
- `TREQ-AUTH-014` — invalidación de contexto y decisiones stale;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas;
- `TREQ-INTEGRATION-003` — idempotencia, retry y recuperación de resultado desconocido;
- `TREQ-INTEGRATION-017` — preservación de fronteras entre hechos y aplicaciones propietarias.

Esta sección es trazabilidad de cobertura existente y no modifica el Registro 04A.

---

#### 88. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea es documental; no se ejecutó build de producto durante su preparación adelantada. |
| LOCAL | NOT_EXECUTED | La incorporación, formateo, quality, delivery y batería del repositorio deberán ejecutarse en el checkout del usuario después de que `NUMERA-UX-009` cierre con `NEXT_TASK_ALLOWED: SI`. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología, políticas documentales, archivo propietario, `NUMERA-AUTH-005`, `NUMERA-AUTH-015`, `NUMERA-DOM-005`, bindings de pantallas/procesos, estados `VPROC-0052`, Registro 04A aplicable y scripts documentales vigentes; `NUMERA-UX-009` se consume desde su archivo completo aprobado por el usuario mientras termina su publicación. |
| OPERATIVA | NOT_EXECUTED | No se aprobaron ni rechazaron gastos, obligaciones, planes de pago, documentos fiscales, impuestos, distribuciones ni otros recursos reales. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-010` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza implementación física propia. |

---

#### 89. Criterios de aceptación

La tarea queda aceptable cuando se verifica que:

1. existe exactamente un contrato `NUMERA-FINANCIAL-APPROVAL-FLOW-001`;
2. la superficie agregadora es `VSCREEN-0097`;
3. el paso agregador es `VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION`;
4. la bandeja no constituye autoridad;
5. el universo base contiene exactamente seis familias;
6. existen exactamente seis permisos approve;
7. existen exactamente seis permisos reject;
8. existen exactamente doce decisiones base;
9. la matriz de seis familias no tiene faltantes;
10. la matriz no tiene duplicados;
11. cada fila declara lectura, approve y reject exactos;
12. cada fila conserva superficie de detalle y owner de proceso;
13. approve y reject permanecen distintos de resolve;
14. view no concede approve;
15. approve no concede view;
16. reject no concede view;
17. una fila requiere lectura subyacente;
18. counts/badges no filtran filas ocultas;
19. estado vacío distingue cero visible de deny/error;
20. seleccionar fila no concede autoridad;
21. review no ejecuta decisión;
22. expense review conserva causa, importe, moneda, dimensiones, soporte y versión aplicables;
23. payable review conserva obligación, vencimiento, origen y segregación aplicables;
24. payment plan review no implica ejecución monetaria;
25. fiscal approval interna no se presenta como autoridad fiscal externa;
26. tax approval interna no se presenta como determinación legal;
27. cost allocation approval conserva pool/driver/base/origen/destinos/version;
28. elegibilidad exige sesión y actor efectivos;
29. elegibilidad exige lectura del recurso;
30. elegibilidad exige permiso decisorio exacto;
31. elegibilidad exige scope válido;
32. elegibilidad exige recurso exacto;
33. elegibilidad exige versión actual;
34. elegibilidad exige estado aprobable/rechazable;
35. elegibilidad exige segregación satisfecha o excepción gobernada;
36. cualquier deny bloquea side effects;
37. approve usa permiso approve, reject usa permiso reject;
38. permiso no fuerza transición inexistente;
39. stale review obliga nueva revisión;
40. selected site no concede autoridad;
41. primary site no concede autoridad;
42. rol nominal no concede autoridad;
43. ownership no concede autoridad;
44. register/update no conceden approve;
45. excepción de segregación no se crea por inferencia;
46. strong reauth se consume cuando el contrato la exija;
47. reauth no concede permiso ausente;
48. aprobación upstream válida no se duplica sin política adicional;
49. aprobación adicional requiere decisión distinta y trazable;
50. review permanece sin mutación;
51. approve comunica recurso/version/impacto exactos;
52. reject exige motivo;
53. rechazo no elimina ni cancela el recurso por inferencia;
54. cambio approve↔reject no se trata como retry;
55. comentario de aprobación sigue política aplicable;
56. no se inventan umbrales;
57. decisión reintentada es idempotente;
58. doble clic no duplica la decisión;
59. server-side revalida antes del efecto;
60. deny deja cero side effects;
61. resultado desconocido exige query/reconciliación;
62. los outcomes UX no se presentan como estados de dominio;
63. receipt conserva evidencia mínima;
64. snapshot de decisión conserva recurso/version/actor/permiso/scope/resultado;
65. approval no equivale a recognition;
66. approval no equivale a payment;
67. approval no equivale a reconciliation;
68. approval no equivale a close/reopen;
69. approval no equivale a export;
70. approval no equivale a publish;
71. planificación especializada permanece en AUTH-015/superficies propietarias;
72. cartera/bancos especializados permanecen en AUTH-014/superficies propietarias;
73. VPROC-0052 conserva sus nueve estados sin modificación;
74. `UNDER_APPROVAL -> APPROVED_FOR_SCHEDULING` no salta a pago;
75. gasto no recibe estados inventados en VPROC-0051;
76. cost allocation approval no reescribe hechos fuente;
77. lotes autorizan cada miembro;
78. atomicidad de lote es explícita;
79. resultados parciales se muestran por miembro;
80. la síntesis visual no sustituye el recurso exacto;
81. estados accesibles no dependen solo de color;
82. responsive conserva recurso/review/bloqueos/decisión;
83. cambio de contexto invalida review;
84. decisiones stale se deniegan y reevalúan;
85. business deny y technical failure permanecen distintos;
86. mensajes de deny minimizan información sensible;
87. no existe fallback `*.manage`, wildcard ni role override;
88. capacidad contractual pendiente no se presenta como activa;
89. simulación no produce decisión real;
90. AS-IS no se adopta como autoridad objetivo;
91. handoff desde UX-009 transporta contexto y no autoridad;
92. navegación a detalle reautoriza;
93. observabilidad no crea eventos de dominio;
94. telemetría minimiza payload sensible;
95. todo hallazgo diferido tiene owner y condición de salida;
96. no se crean ni modifican requisitos de prueba;
97. no se ejecutan cambios físicos;
98. UX-011 recibe un contrato estable de separación entre aprobación y cierre.

---

#### 90. Límites

Esta tarea no:

- publica permisos runtime;
- materializa las doce capacidades de aprobación/rechazo;
- asigna grants a roles;
- crea excepciones de segregación;
- define umbrales monetarios universales;
- crea RLS, RPC, Server Actions o APIs;
- crea la bandeja React runtime;
- modifica tablas o columnas;
- modifica `VPROC-0051`, `VPROC-0052` o `VPROC-0054`;
- inventa estados de aprobación;
- ejecuta pagos;
- ejecuta conciliaciones;
- diseña el flujo de cierre/reapertura;
- diseña la exportación;
- define filtros completos de empresa/sede/centro;
- convierte escenarios/presupuestos/forecast/precios en filas base de la bandeja;
- redefine `NUMERA-AUTH-014` o `NUMERA-AUTH-015`;
- publica escenarios o presupuestos;
- activa precios operativos;
- modifica `vento-numera`;
- modifica packages compartidos;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-011`.

---

#### 91. Handoff a NUMERA-UX-011

La siguiente tarea recibe:

```text
NUMERA_FINANCIAL_APPROVAL_FLOW_CONTRACT = NUMERA-FINANCIAL-APPROVAL-FLOW-001
NUMERA_EXPENSE_REGISTRATION_FLOW_CONTRACT = NUMERA-EXPENSE-REGISTRATION-FLOW-001
APPROVAL_QUEUE_SCREEN_ID = VSCREEN-0097
APPROVAL_QUEUE_PROCESS_ID = VPROC-0052
APPROVAL_QUEUE_STEP_ID = VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION
APPROVAL_DECISION_FAMILY_COUNT = 6
APPROVAL_PERMISSION_COUNT = 6
REJECT_PERMISSION_COUNT = 6
APPROVAL_DECISION_PERMISSION_COUNT = 12
APPROVAL_QUEUE_OMNIBUS_PERMISSION = FORBIDDEN
APPROVE_PERMISSION_IMPLIES_VIEW = NO
REJECT_PERMISSION_IMPLIES_VIEW = NO
APPROVAL_QUEUE_ROW_REQUIRES_UNDERLYING_VIEW = YES
ROLE_NAME_IS_AUTHORIZATION = NO
OWNERSHIP_IS_APPROVAL_AUTHORITY = NO
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
REGISTER_PERMISSION_IMPLIES_APPROVE = NO
UPDATE_PERMISSION_IMPLIES_APPROVE = NO
APPROVE_IS_RECOGNIZE = NO
APPROVE_IS_PAY_EXECUTE = NO
APPROVE_IS_RECONCILE = NO
APPROVE_IS_CLOSE = NO
APPROVE_IS_REOPEN = NO
APPROVE_IS_EXPORT = NO
APPROVE_IS_PUBLISH = NO
REJECTION_REASON_REQUIRED = YES
STALE_REVIEW = DENY_AND_REVIEW_AGAIN
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STRONG_REAUTH_WHEN_APPLICABLE = YES
DENY_SIDE_EFFECT_ALLOWED = NO
DECISION_RETRY_REQUIRES_IDEMPOTENCY = YES
RESULT_UNKNOWN_REQUIRES_QUERY_OR_RECONCILIATION = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
VPROC_0052_APPROVAL_ENTRY_STATE = UNDER_APPROVAL
VPROC_0052_APPROVAL_SUCCESS_STATE = APPROVED_FOR_SCHEDULING
VPROC_0052_APPROVAL_DOES_NOT_EXECUTE_PAYMENT = YES
PLANNING_SPECIALIZED_APPROVAL_OWNER = NUMERA_AUTH_015
RECEIVABLE_BANK_SPECIALIZED_DECISION_OWNER = NUMERA_AUTH_014
UX_011_OWNER = PERIOD_CLOSE_FLOW
TREQ_CHANGES = 0
```

`NUMERA-UX-011` deberá diseñar el cierre y reapertura de periodo como autoridad distinta, sin reutilizar una aprobación previa como permiso de cierre.

---

#### 92. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-009
-> NUMERA-UX-010
-> NUMERA-UX-011
```

UX-010 consume el recurso/handoff elegible de UX-009 y entrega a UX-011 una separación explícita entre decisión aprobatoria y autoridad de cierre.

---

#### 93. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-009 — Diseñar flujo de registro de gasto`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-010 — Diseñar flujo de aprobación`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-011 — Diseñar flujo de cierre`
### ✅ NUMERA-UX-011 — Diseñar flujo de cierre

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-010 — Diseñar flujo de aprobación
**Tarea siguiente:** NUMERA-UX-012 — Diseñar exportación con permiso independiente
**Tipo de tarea:** definición documental del flujo UX de bloqueo preparatorio, cierre, liberación de lock, reapertura y corrección gobernada de periodos económicos en `VSCREEN-0105`, consumiendo permisos atómicos de periodo, lifecycle `open|locked|closed`, gates reproducibles, segregación, reautenticación fuerte cuando aplique, revalidación server-side, idempotencia, concurrencia, restatement versionado, evidencia y recuperación, sin convertir la pantalla en autoridad omnibus ni absorber conciliación, exportación, cierre contable/fiscal, mutaciones de recursos o materialización runtime; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica superficies runtime, componentes React, permisos runtime, grants, roles, Server Actions, RLS, RPC, tablas, vistas, migraciones, Supabase, datos financieros, periodos reales, procesos, estados de proceso, packages compartidos, navegación ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar de forma cerrada y verificable la experiencia mediante la cual una persona autorizada puede revisar un periodo económico, bloquearlo para preparación de cierre, resolver o aceptar explícitamente excepciones, cerrar una versión elegible, liberar un lock todavía no cerrado, reabrir una versión cerrada cuando corresponda y conducir correcciones posteriores sin borrar historia ni convertir la reapertura en escritura irrestricta.

La tarea materializa documentalmente el flujo UX de `VSCREEN-0105 — Cierre, reapertura y corrección de periodo` y preserva la separación entre estado del periodo, lifecycle de costos, conciliaciones, recursos financieros subyacentes y cierres contables o fiscales externos.

---

#### 2. Naturaleza y topología

La topología vigente de `NUMERA-UX` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea:

- define una sola vez el flujo UX de cierre/reapertura;
- no crea instancia física propia;
- no publica permisos;
- no modifica `vento-numera`;
- no modifica Supabase;
- no cambia el estado de periodos reales;
- no ejecuta correcciones reales;
- no altera `VPROC-0054` ni crea estados nuevos.

---

#### 3. Handoff recibido de NUMERA-UX-010

La tarea recibe:

```text
NUMERA_FINANCIAL_APPROVAL_FLOW_CONTRACT = NUMERA-FINANCIAL-APPROVAL-FLOW-001
NUMERA_EXPENSE_REGISTRATION_FLOW_CONTRACT = NUMERA-EXPENSE-REGISTRATION-FLOW-001
APPROVAL_QUEUE_SCREEN_ID = VSCREEN-0097
APPROVAL_QUEUE_PROCESS_ID = VPROC-0052
APPROVAL_QUEUE_STEP_ID = VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION
APPROVAL_DECISION_FAMILY_COUNT = 6
APPROVAL_PERMISSION_COUNT = 6
REJECT_PERMISSION_COUNT = 6
APPROVAL_DECISION_PERMISSION_COUNT = 12
APPROVAL_QUEUE_OMNIBUS_PERMISSION = FORBIDDEN
APPROVE_PERMISSION_IMPLIES_VIEW = NO
REJECT_PERMISSION_IMPLIES_VIEW = NO
APPROVAL_QUEUE_ROW_REQUIRES_UNDERLYING_VIEW = YES
ROLE_NAME_IS_AUTHORIZATION = NO
OWNERSHIP_IS_APPROVAL_AUTHORITY = NO
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORITY = NO
REGISTER_PERMISSION_IMPLIES_APPROVE = NO
UPDATE_PERMISSION_IMPLIES_APPROVE = NO
APPROVE_IS_RECOGNIZE = NO
APPROVE_IS_PAY_EXECUTE = NO
APPROVE_IS_RECONCILE = NO
APPROVE_IS_CLOSE = NO
APPROVE_IS_REOPEN = NO
APPROVE_IS_EXPORT = NO
APPROVE_IS_PUBLISH = NO
REJECTION_REASON_REQUIRED = YES
STALE_REVIEW = DENY_AND_REVIEW_AGAIN
SERVER_SIDE_REVALIDATION_REQUIRED = YES
STRONG_REAUTH_WHEN_APPLICABLE = YES
DENY_SIDE_EFFECT_ALLOWED = NO
DECISION_RETRY_REQUIRES_IDEMPOTENCY = YES
RESULT_UNKNOWN_REQUIRES_QUERY_OR_RECONCILIATION = YES
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
VPROC_0052_APPROVAL_ENTRY_STATE = UNDER_APPROVAL
VPROC_0052_APPROVAL_SUCCESS_STATE = APPROVED_FOR_SCHEDULING
VPROC_0052_APPROVAL_DOES_NOT_EXECUTE_PAYMENT = YES
PLANNING_SPECIALIZED_APPROVAL_OWNER = NUMERA_AUTH_015
RECEIVABLE_BANK_SPECIALIZED_DECISION_OWNER = NUMERA_AUTH_014
UX_011_OWNER = PERIOD_CLOSE_FLOW
TREQ_CHANGES = 0
```

La presente tarea consume ese handoff y mantiene explícitamente que una aprobación previa no constituye autoridad para bloquear, cerrar ni reabrir un periodo.

---

#### 4. Fuentes contractuales consumidas

El diseño consume y no redefine:

- `NUMERA-PERIOD-STATE-PERMISSION-REGISTRY-001` de `NUMERA-AUTH-006`;
- `NUMERA-DOM-011` como contrato del periodo económico, lock, cierre, reapertura, eventos tardíos y restatement;
- `NUMERA-DOM-014` para diferencias, conciliación, verificación posterior y efecto sobre cierres;
- `VPROC-0054` como proceso propietario de costos, distribución, cierre y rentabilidad;
- `VPROC-0051` como proceso relacionado para hechos económicos y correcciones correlacionadas;
- `VSCREEN-0105` y `VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD`;
- `NUMERA-AUTH-008` para scope;
- `NUMERA-AUTH-009` para auditoría;
- `NUMERA-AUTH-010` para independencia administrativa de turno;
- `NUMERA-AUTH-011` para contexto operacional cuando corresponda;
- `NUMERA-AUTH-012` para futura materialización;
- `NUMERA-AUTH-013` para pruebas integrales;
- `NUMERA-UX-002` para separación entre lectura y comando;
- `NUMERA-UX-010` para separación entre aprobación y cierre.

---

#### 5. Resultado contractual

Esta tarea define:

```text
NUMERA-PERIOD-CLOSE-FLOW-001
```

El contrato describe dos ramas UX gobernadas:

```text
ORDINARY_CLOSE_FLOW
REOPEN_AND_RESTATEMENT_FLOW
```

Ninguna fase UX constituye por sí sola un estado de dominio nuevo.

---

#### 6. Superficie propietaria

El flujo principal se presenta en:

```text
SCREEN_ID = VSCREEN-0105
SCREEN_NAME = Cierre, reapertura y corrección de periodo
OWNER_PROCESS = VPROC-0054
OWNER_STEP = VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD
STEP_ACTION = CLOSE
STEP_LIFECYCLE_POSITION = TERMINAL
RELATED_PROCESS = VPROC-0051
```

`VSCREEN-0105` es una superficie de trabajo; no es una autoridad concedible.

---

#### 7. Recurso protegido

El recurso temporal gobernado es:

```text
RESOURCE_TYPE = PERIOD
```

El flujo opera sobre el periodo económico de NUMERA y no sobre:

- turno de caja PULSO;
- periodo contable oficial;
- periodo fiscal oficial;
- ciclo de producción FOGO;
- recepción ORIGO;
- ciclo logístico NEXO.

---

#### 8. Estados canónicos del periodo

Se reutilizan exactamente:

```text
open
locked
closed
```

La UX no crea estados visuales que pretendan reemplazar esos tres estados empresariales.

---

#### 9. Permisos atómicos consumidos

La UX consume exactamente:

```text
VIEW   = numera.finance.periods.view
LOCK   = numera.finance.periods.lock
CLOSE  = numera.finance.periods.close
REOPEN = numera.finance.periods.reopen
```

No se define una quinta autoridad de estado.

---

#### 10. Cardinalidad cerrada de autoridad temporal

Se preserva:

```text
PERIOD_STATE_PERMISSION_COUNT = 3
LOCK_PERMISSION_COUNT = 1
CLOSE_PERMISSION_COUNT = 1
REOPEN_PERMISSION_COUNT = 1
GENERIC_CORRECT_PERMISSION_COUNT = 0
```

`periods.view` es requisito de lectura y no forma parte del conteo de mutaciones de estado.

---

#### 11. Flujo ordinario de cierre

La secuencia UX ordinaria queda:

```text
ENTRY
-> PERIOD_CONTEXT
-> CURRENT_STATE_AND_VERSION
-> CLOSE_READINESS
-> LOCK_REVIEW
-> LOCK_COMMIT
-> LOCKED_RECONCILIATION
-> CLOSE_REVIEW
-> CLOSE_COMMIT
-> CLOSE_RECEIPT
-> CLOSED_READ_VIEW
```

La secuencia no autoriza saltos de estado.

---

#### 12. Flujo de reapertura y restatement

La rama de reapertura queda:

```text
CLOSED_PERIOD_CONTEXT
-> CLOSE_VERSION_SELECTION
-> REOPEN_REASON_AND_IMPACT
-> REOPEN_ELIGIBILITY
-> STRONG_REAUTH_WHEN_APPLICABLE
-> REOPEN_COMMIT
-> SCOPED_CORRECTION_WINDOW
-> CORRECTION_EXECUTION_BY_RESOURCE_OWNER
-> RECLOSE_REQUIRED_WHEN_MATERIAL_CHANGE
-> NEW_CLOSE_VERSION
```

Una reapertura sin cambios materiales puede seguir la política aplicable, pero nunca elimina la versión cerrada previa.

---

#### 13. Matriz completa de transiciones

| Estado origen | Acción UX | Permiso exacto | Estado destino | Motivo obligatorio | Regla |
| --- | --- | --- | --- | --- | --- |
| `open` | bloquear para cierre | `numera.finance.periods.lock` | `locked` | según política/evidencia de lock | transición ordinaria de preparación |
| `locked` | liberar lock | `numera.finance.periods.lock` | `open` | sí | no equivale a reapertura |
| `locked` | cerrar | `numera.finance.periods.close` | `closed` | cuando política/excepción lo exija | exige gates de cierre satisfechos |
| `closed` | reabrir | `numera.finance.periods.reopen` | `open` | sí | exige versión de cierre exacta |

La matriz contiene cuatro transiciones UX sobre tres permisos mutantes y cero transiciones adicionales.

---

#### 14. Atajo `open -> closed` prohibido

Se congela:

```text
OPEN_TO_CLOSED_DIRECT = FORBIDDEN
```

El cierre final no se ofrece como sustituto del lock preparatorio.

---

#### 15. Lectura requerida

Toda interacción que muestre o permita decidir sobre un periodo exige:

```text
numera.finance.periods.view
```

Se conserva:

```text
LOCK_PERMISSION_IMPLIES_VIEW = NO
CLOSE_PERMISSION_IMPLIES_VIEW = NO
REOPEN_PERMISSION_IMPLIES_VIEW = NO
```

La UI no muestra contexto sensible por el solo hecho de que exista autoridad mutante.

---

#### 16. Cabecera de contexto del periodo

La superficie debe mostrar, según autoridad:

- identidad estable del periodo;
- alcance autorizado;
- estado actual;
- versión actual;
- versión de cierre vigente cuando exista;
- fechas relevantes de apertura, lock, cierre y reapertura;
- resumen de fuentes esperadas;
- resumen de gates;
- diferencias/excepciones visibles autorizadas;
- versión candidata o cerrada aplicable.

La cabecera no concede autoridad ni amplía scope.

---

#### 17. Estado y versión se revalidan

La selección visual no es fuente de verdad.

Antes de cualquier transición:

```text
SERVER_REVALIDATES_PERIOD_STATE = YES
SERVER_REVALIDATES_PERIOD_VERSION = YES
```

Una versión stale produce:

```text
DENY_AND_REVIEW_AGAIN
```

---

#### 18. Close readiness

Antes de ofrecer la confirmación de cierre, la UX debe representar de forma reproducible el resultado de los gates aplicables.

Como mínimo, cuando correspondan:

1. completitud de fuentes esperadas;
2. duplicados;
3. hechos sin origen o efectos sin hecho;
4. ventas y recaudos pendientes de conciliación material;
5. compras, recepciones y obligaciones pendientes de conciliación material;
6. movimientos bancarios y diferencias relevantes;
7. inventario, producción y variaciones;
8. costos y distribuciones versionados;
9. resultados de `VPROC-0054`;
10. eventos tardíos;
11. ajustes/correcciones pendientes;
12. excepciones;
13. autoridad de cierre;
14. evidencia final.

---

#### 19. Gate no satisfecho bloquea el cierre

Se conserva:

```text
CLOSE_PERMISSION + FAILED_CLOSE_GATE = DENY
```

Tener permiso exacto no vuelve verde un gate rojo o indeterminado.

---

#### 20. Gate `UNKNOWN` no equivale a PASS

La UX debe distinguir:

```text
PASS
FAIL
UNKNOWN
NOT_APPLICABLE
```

Un gate obligatorio `UNKNOWN` bloquea la decisión hasta producir evidencia suficiente.

---

#### 21. Excepciones de cierre

Una excepción material solo puede aparecer como aceptada/no bloqueante cuando conserva:

- identidad;
- clasificación;
- cuantificación cuando aplique;
- owner;
- fuente;
- motivo;
- autoridad que acepta la excepción cuando corresponda;
- evidencia;
- efecto esperado;
- decisión explícita.

La ausencia de owner o evidencia no se convierte en excepción aceptada por conveniencia visual.

---

#### 22. Objetos legítimamente abiertos

La UX no exige saldo cero universal para permitir un cierre.

Una obligación, cuenta por cobrar u otro objeto puede cruzar periodos cuando su estado y saldo sean explicables conforme al contrato propietario.

```text
OPEN_BUSINESS_OBJECT != AUTOMATIC_CLOSE_BLOCKER
UNEXPLAINED_MATERIAL_EXCEPTION = CLOSE_BLOCKER
```

---

#### 23. Lock preparatorio

`numera.finance.periods.lock` permite:

```text
open -> locked
```

El resultado UX debe comunicar que:

- la mutación económica ordinaria queda protegida;
- comienza revisión/conciliación de cierre;
- el periodo aún no está cerrado;
- los owners de las diferencias permanecen identificables.

---

#### 24. Lock no equivale a cierre

Se conserva:

```text
LOCKED != CLOSED
LOCK != CLOSE
```

La UX no usa texto, color o receipt que haga parecer final un lock preparatorio.

---

#### 25. Liberación de lock

La transición:

```text
locked -> open
```

usa `numera.finance.periods.lock`, exige motivo y conserva el intento de cierre.

La UI debe mostrar que:

```text
RELEASE_LOCK != REOPEN
```

---

#### 26. Razón de liberación de lock

La liberación exige una razón empresarial explícita y auditable.

La UX debe permitir identificar, al menos:

- qué gate o condición motivó la liberación;
- qué corrección debe ocurrir;
- owner responsable;
- impacto esperado;
- siguiente condición de salida.

---

#### 27. Estado `locked` y correcciones

Una corrección requerida durante `locked` no adquiere autoridad por pertenecer al flujo de cierre.

Puede requerir:

```text
release_lock
+ exact_resource_mutation_authority
+ new_close_attempt
```

según la naturaleza de la corrección.

---

#### 28. Close review

Antes de `locked -> closed`, la UX debe presentar una revisión final que incluya:

- periodo y alcance;
- versión actual;
- gates y su estado;
- fuentes/watermarks relevantes;
- conciliaciones materiales;
- excepciones aceptadas;
- resultados vinculados;
- actor efectivo;
- permiso requerido;
- impacto del cierre;
- evidencia final disponible.

---

#### 29. Close commit

La mutación final requiere:

```text
numera.finance.periods.close
+ period_id
+ current_state = locked
+ expected_period_version
+ valid_scope
+ close_gates = SATISFIED
+ authorization = ALLOW
```

Cualquier inconsistencia produce deny sin side effects.

---

#### 30. Cierre no equivale a aprobación

Se conserva:

```text
APPROVE != LOCK
APPROVE != CLOSE
APPROVE != REOPEN
```

UX-010 no concede autoridad temporal a UX-011.

---

#### 31. Cierre no equivale a conciliación

Se conserva:

```text
RECONCILE != LOCK
RECONCILE != CLOSE
RECONCILE != REOPEN
```

La conciliación puede ser gate o evidencia; su permiso no sustituye `periods.close`.

---

#### 32. Cierre no equivale a exportación

Se conserva:

```text
LOCK != EXPORT
CLOSE != EXPORT
REOPEN != EXPORT
```

La extracción de información queda reservada a `NUMERA-UX-012` y al contrato de `NUMERA-AUTH-007`.

---

#### 33. Cierre no equivale a publicación

Cerrar un periodo NUMERA no publica por sí solo:

- reportes;
- escenarios;
- presupuestos;
- forecast;
- versiones de precio;
- precios operativos.

Cada publicación conserva su autoridad propietaria.

---

#### 34. Cierre económico no es cierre contable o fiscal

Se congela:

```text
NUMERA_PERIOD_CLOSE
!= ACCOUNTING_CLOSE
!= TAX_CLOSE
!= OFFICIAL_LEDGER_CLOSE
```

La UX debe nombrar el efecto como cierre económico NUMERA cuando exista riesgo de confusión.

---

#### 35. Cierre NUMERA no cierra dominios fuente

El cierre no modifica estados propietarios de:

- PULSO;
- ORIGO;
- NEXO;
- FOGO.

Los hechos legítimos posteriores se reciben mediante sus contratos de integración y se tratan como eventos tardíos cuando corresponda.

---

#### 36. Receipt de cierre

Después de un resultado confirmado, el receipt de cierre debe permitir reconstruir:

- periodo;
- alcance;
- versión cerrada;
- estado anterior y nuevo;
- actor y actor efectivo;
- permiso exacto;
- gates evaluados;
- excepciones aceptadas;
- timestamp;
- correlación;
- referencia de evidencia.

No se presentan secretos, tokens ni credenciales.

---

#### 37. Resultado desconocido de cierre

Si la respuesta técnica es incierta después del envío:

```text
RESULT_UNKNOWN != RETRY_BLINDLY
```

La UX debe consultar el estado/version actual y la evidencia correlacionada antes de decidir si corresponde mostrar éxito, fallo o reintento seguro.

---

#### 38. Idempotencia de cierre

Se conserva:

```text
SAME_PERIOD
+ SAME_VERSION
+ SAME_CLOSE_DECISION
+ SAME_IDEMPOTENCY_KEY
= ONE_CLOSE_EFFECT
```

Doble clic, refresh o retry no deben producir dos cierres equivalentes.

---

#### 39. Reapertura: condición de entrada

Solo un periodo `closed` puede entrar a la rama de reapertura ordinaria.

Se conserva:

```text
CLOSED_TO_OPEN_IS_REOPEN = YES
LOCKED_TO_OPEN_IS_REOPEN = NO
```

---

#### 40. Versión de cierre obligatoria

La UX no permite confirmar reapertura sin identificar:

```text
period_id
close_version
current_period_version
```

Se conserva:

```text
REOPEN_WITHOUT_CLOSE_VERSION = DENY
```

---

#### 41. Motivo de reapertura obligatorio

Toda reapertura exige motivo empresarial explícito.

Debe incluir, cuando aplique:

- hallazgo/evento origen;
- impacto esperado;
- recursos afectados;
- riesgo de no corregir;
- alternativa de ajuste posterior evaluada;
- alcance solicitado;
- evidencia revisada.

---

#### 42. Evaluación ajuste posterior vs reapertura

Antes de reabrir, la UX debe permitir demostrar que se evaluó si el efecto puede resolverse en un periodo abierto sin reexpresar el cierre histórico.

```text
CORRECTION_WITHOUT_REOPEN_ALLOWED_BY_POLICY
-> no reopen required
```

La elección debe quedar trazable.

---

#### 43. Reapertura material

Cuando la corrección deba cambiar materialmente la representación económica de la versión cerrada:

```text
CORRECTION_REQUIRES_REOPEN = YES
```

La UX exige `numera.finance.periods.reopen` y no sustituye la autoridad exacta de la corrección posterior.

---

#### 44. Reopen review

La revisión previa debe mostrar:

- periodo;
- versión de cierre afectada;
- versión vigente;
- motivo;
- alcance;
- impacto esperado;
- familias/objetos afectados;
- evidencia;
- actor efectivo;
- permiso requerido;
- condición de finalización;
- necesidad prevista de nuevo cierre.

---

#### 45. Reapertura acotada

Se conserva:

```text
REOPEN_IS_UNBOUNDED_WRITE = NO
```

El receipt de reapertura debe dejar visible qué alcance y familias quedaron habilitados para corrección gobernada.

---

#### 46. Reapertura no concede mutación de recursos

Se conserva:

```text
REOPEN_PERMISSION_IMPLIES_RESOURCE_UPDATE = NO
REOPEN_PERMISSION_IMPLIES_RESOURCE_REGISTER = NO
REOPEN_PERMISSION_IMPLIES_APPROVE = NO
REOPEN_PERMISSION_IMPLIES_RECONCILE = NO
```

Cada acción correctiva posterior usa la autoridad exacta de su recurso.

---

#### 47. Corrección no tiene permiso omnibus

Quedan prohibidos como autoridad objetivo:

```text
numera.finance.periods.correct
numera.finance.periods.manage
numera.finance.periods.update
```

La UI de `VSCREEN-0105` no debe presentar un botón genérico que esconda múltiples autoridades distintas.

---

#### 48. Matriz de corrección

| Situación | Autoridad de periodo | Autoridad de recurso | Resultado esperado |
| --- | --- | --- | --- |
| corrección en periodo abierto sin restatement | ninguna adicional de reapertura | exacta del recurso | ajuste trazable en periodo abierto |
| corrección mientras periodo está `locked` | posible liberación de lock según contrato | exacta del recurso | volver a `open`, corregir y reiniciar cierre |
| corrección material de periodo `closed` | `periods.reopen` | exacta del recurso | reapertura acotada + corrección + nuevo cierre |
| evento tardío sin efecto material histórico | según política, puede no requerir reapertura | exacta del efecto permitido | reconocimiento/ajuste en periodo abierto |
| evento tardío material que cambia cierre | `periods.reopen` | exacta del recurso | restatement versionado y recierre |

No se deriva autoridad de recurso desde el estado del periodo.

---

#### 49. Eventos tardíos

La llegada tardía de un evento no es autoridad.

Se conserva:

```text
LATE_EVENT != REOPEN_AUTHORITY
```

La UX debe enrutar la decisión entre:

1. ajuste en periodo abierto;
2. reapertura controlada;
3. clasificación como duplicado, inválido o sin efecto.

---

#### 50. Historial de cierre se preserva

Se conserva:

```text
REOPEN_DELETES_PREVIOUS_CLOSE = NO
RESTATEMENT_IS_VERSIONED = YES
```

La reapertura crea continuidad versionada, no sobrescritura destructiva.

---

#### 51. Nuevo cierre después de cambios materiales

Se conserva:

```text
REOPEN_WITH_MATERIAL_CHANGE_REQUIRES_RECLOSE = YES
```

El recierre vuelve a pasar por:

```text
open -> locked -> closed
```

con gates, versión y evidencia actualizados.

---

#### 52. Relación con `VPROC-0054`

`VPROC-0054` conserva exactamente nueve estados:

```text
COSTING_CYCLE_OPENED
INPUTS_COLLECTING
CALCULATION_IN_PROGRESS
VARIANCE_ANALYSIS
UNDER_REVIEW
PENDING_APPROVAL
PUBLISHED
CLOSE_RECONCILIATION_PENDING
COSTING_CYCLE_CLOSED
```

La UX no convierte esos estados en los estados `open|locked|closed` del periodo.

---

#### 53. Separación entre lifecycle de proceso y estado de periodo

Se congela:

```text
VPROC_0054_PUBLISHED != PERIOD_CLOSED
CLOSE_RECONCILIATION_PENDING != PERIOD_CLOSED
COSTING_CYCLE_CLOSED != OFFICIAL_ACCOUNTING_CLOSE
```

La superficie puede mostrar ambos contextos sin fusionarlos.

---

#### 54. `CLOSE_RECONCILIATION_PENDING`

Cuando `VPROC-0054` se encuentre en conciliación de cierre, la UX debe hacer visible que:

- el periodo sigue protegido;
- diferencias siguen abiertas hasta resolución/aceptación;
- correcciones siguen autoridad propietaria;
- cerrar requiere evidencia y gates finales;
- cálculo o publicación no equivalen a cierre.

---

#### 55. Diferencias y reconciliación

La UX consume `NUMERA-DOM-014` para representar que:

```text
RESOLUTION_ACTION_EXECUTED != DIFFERENCE_RESOLVED
DIFFERENCE_RESOLVED != CASE_CLOSED_UNTIL_VERIFIED
```

Una acción ejecutada sin verificación posterior no satisface por sí sola un gate de cierre.

---

#### 56. Diferencia en periodo protegido

Una diferencia detectada contra `locked` o `closed` no habilita escritura ordinaria.

La UX debe enrutar la resolución a:

- ajuste gobernado en periodo abierto;
- liberación de lock + corrección;
- reapertura controlada;
- espera por evidencia/owner;
- clasificación como no efecto/duplicado cuando esté demostrado.

---

#### 57. Resultado externo incierto

Un resultado externo todavía incierto no se presenta como gate satisfecho.

Cuando la dependencia externa sea material para el cierre:

```text
EXTERNAL_RESULT_UNKNOWN = CLOSE_BLOCKED
```

salvo política explícita que permita aceptación de excepción con evidencia y autoridad.

---

#### 58. Segregación de funciones

Se conserva:

```text
REGISTER_PERMISSION != LOCK_PERMISSION
APPROVE_PERMISSION != LOCK_PERMISSION
RECONCILE_PERMISSION != LOCK_PERMISSION
LOCK_PERMISSION != CLOSE_PERMISSION
CLOSE_PERMISSION != REOPEN_PERMISSION
RESOURCE_CORRECTION_AUTHORITY != REOPEN_PERMISSION
```

Una organización pequeña puede acumular funciones solo mediante excepción gobernada; la UX no la infiere desde un rol.

---

#### 59. Rol y ownership no son autoridad

Se conserva:

```text
ROLE_NAME != PERIOD_STATE_AUTHORITY
OWNERSHIP != PERIOD_STATE_AUTHORITY
```

`contador`, `gerente`, `propietario`, owner funcional o preparador de cierre no sustituyen el permiso exacto.

---

#### 60. Scope

Seleccionar empresa, sede, centro o periodo no crea alcance autorizado.

Se conserva:

```text
SELECTED_SCOPE != AUTHORIZED_SCOPE
```

La forma exacta de scope consume `NUMERA-AUTH-008`.

---

#### 61. Reautenticación fuerte

Las transiciones reales de periodo consumen el contrato fuerte aplicable en dispositivo compartido o contexto sensible.

Se conserva:

```text
STRONG_REAUTH_DOES_NOT_GRANT_MISSING_PERMISSION = YES
```

Reautenticar confirma actor; no crea autoridad.

---

#### 62. Simulación

La simulación puede mostrar:

- elegibilidad;
- gates;
- diferencias;
- impacto;
- estado hipotético;
- razones de deny.

Pero:

```text
SIMULATION_EXECUTES_LOCK = NO
SIMULATION_EXECUTES_CLOSE = NO
SIMULATION_EXECUTES_REOPEN = NO
SIMULATION_EXECUTES_CORRECTION = NO
```

---

#### 63. Server-side mínimo

Antes de una transición real deben resolverse, como mínimo:

```text
principal
actor_effective
permission_key
period_id
current_period_state
period_version
close_version_when_applicable
requested_transition
scope_result
reason_when_required
close_gate_result_when_applicable
authorization_result
```

Cualquier resultado no autorizado, ambiguo o indeterminado produce deny seguro.

---

#### 64. Fallback a `manage` prohibido

Queda prohibido:

```text
missing_exact_period_permission -> numera.finance.periods.manage
missing_exact_period_permission -> numera.expenses.manage
missing_exact_period_permission -> numera.cost_centers.manage
missing_exact_period_permission -> any_manage
```

La ausencia de permiso exacto produce denegación.

---

#### 65. Wildcards prohibidos

No se usa como autoridad objetivo:

```text
numera.*
numera.finance.*
numera.finance.periods.*
numera.finance.close_all
```

---

#### 66. Concurrencia

La UX debe tratar como stale cualquier revisión invalidada por:

- nueva mutación del periodo;
- nueva evidencia material;
- cambio de scope;
- cambio de actor o autoridad;
- cambio de estado;
- reapertura concurrente;
- evento tardío material incorporado;
- cambio de gates.

La decisión stale exige nueva revisión.

---

#### 67. Idempotencia de transiciones

Se conserva:

```text
LOCK_RETRY_IS_IDEMPOTENT = YES
CLOSE_RETRY_IS_IDEMPOTENT = YES
REOPEN_RETRY_IS_IDEMPOTENT = YES
```

Las decisiones opuestas no son retries.

---

#### 68. Decisiones opuestas no se reutilizan

Se conserva:

```text
lock -> release_lock = NEW_DECISION
close -> reopen = NEW_DECISION
reopen -> close = NEW_DECISION
```

Cada una exige estado y autoridad vigentes.

---

#### 69. Operaciones masivas

Una futura acción sobre múltiples periodos o scopes debe autorizar cada miembro individualmente y conservar:

- periodo;
- versión;
- gates;
- permiso;
- resultado.

Una transición válida no autoriza el lote completo por inferencia.

---

#### 70. Estados UX de resultado

Los estados de interfaz pueden distinguir:

```text
READY
BLOCKED
DENIED
CONFIRMED
UNKNOWN_RESULT
STALE
TECHNICAL_FAILURE
```

Estos labels UX no son estados empresariales del periodo.

---

#### 71. Denegación vs fallo técnico

La UI debe separar:

```text
BUSINESS_DENY
AUTHORIZATION_DENY
STALE_REVIEW
TECHNICAL_FAILURE
UNKNOWN_RESULT
```

Un fallo técnico no se presenta como decisión empresarial.

---

#### 72. Información sensible en errores

Una denegación no debe revelar:

- scopes no autorizados;
- identidad de otros actores;
- detalles financieros fuera del alcance;
- excepciones ocultas;
- secretos o tokens.

La UX comunica razón suficiente para recuperación sin ampliar exposición.

---

#### 73. Recuperación

Ante resultado incierto o interrupción, la recuperación consulta:

- estado actual del periodo;
- versión actual;
- última transición correlacionada;
- receipt disponible;
- gates vigentes cuando corresponda.

La recuperación no repite ciegamente la mutación.

---

#### 74. Accesibilidad

El estado de periodo, gates, excepciones y acciones disponibles no dependen únicamente de color.

La jerarquía semántica debe permitir distinguir:

- contexto del periodo;
- estado actual;
- bloqueadores;
- evidencia;
- acción propuesta;
- resultado.

---

#### 75. Responsive

En superficies estrechas se preserva el orden:

```text
PERIOD_CONTEXT
CURRENT_STATE
BLOCKING_GATES
EXCEPTIONS
DECISION_CONTEXT
PRIMARY_ACTION
RESULT
```

La compactación no oculta bloqueadores materiales antes de la confirmación.

---

#### 76. Indicadores antes de detalle

Cuando exista síntesis de readiness y tabla detallada de gates/excepciones, se aplica `NUMERA-INDICATOR-BEFORE-DETAIL-TABLES-001`:

```text
SUMMARY_BEFORE_DETAIL = YES
SUMMARY_REPLACES_DETAIL = NO
```

La síntesis no puede omitir un bloqueador que siga activo en el detalle.

---

#### 77. Estados vacíos

La UX distingue:

```text
NO_BLOCKERS
NO_VISIBLE_BLOCKERS
NOT_AUTHORIZED_TO_VIEW_DETAILS
DATA_NOT_AVAILABLE
TECHNICAL_ERROR
```

`NO_VISIBLE_BLOCKERS` no se interpreta automáticamente como readiness de cierre.

---

#### 78. Auditoría y receipt

Toda transición confirmada debe producir evidencia correlacionable suficiente para el contrato de auditoría NUMERA.

El receipt es proyección de evidencia; no sustituye el registro autoritativo de auditoría.

---

#### 79. AS-IS no gobierna el objetivo

La existencia actual de:

- guard legacy;
- formulario simplificado;
- selección por último periodo;
- ausencia de workflow runtime;
- botón genérico;

no redefine este contrato objetivo ni autoriza aliases amplios.

---

#### 80. Hallazgos diferidos

| Hallazgo | Bloquea UX-011 | Owner | Condición de salida |
| --- | --- | --- | --- |
| claves `periods.lock/close/reopen` aún pendientes de materialización | no | `NUMERA-AUTH-012` + package físico aplicable | catálogo/guards/grants consumen las identidades exactas |
| política numérica de materialidad no está universalmente fijada | no | gobierno empresarial competente | política versionada define umbrales cuando corresponda |
| persistencia física de close_version/restatement no se define aquí | no | owner físico de NUMERA / package aplicable | storage y contratos implementan versionado sin borrar historia |
| ejecución de correcciones concretas depende del recurso afectado | no | owner del recurso y autorización correspondiente | cada corrección usa permiso exacto y evidencia propia |
| exportación de evidencia no forma parte del cierre | no | `NUMERA-UX-012` / `NUMERA-AUTH-007` | flujo de exportación separado y autorizado |

No queda hallazgo detectado sin owner y condición de salida.

---

#### 81. Decisiones congeladas

1. `VSCREEN-0105` es la superficie propietaria del flujo, no autoridad;
2. el periodo económico conserva `open|locked|closed`;
3. el flujo ordinario es `open -> locked -> closed`;
4. `open -> closed` directo queda prohibido;
5. `locked -> open` es liberación de lock, no reapertura;
6. `closed -> open` es reapertura;
7. existen exactamente tres permisos mutantes de estado: lock, close y reopen;
8. lectura usa `periods.view` y no se deriva de los permisos mutantes;
9. cierre exige gates además del permiso;
10. `UNKNOWN` en gate obligatorio no equivale a PASS;
11. excepciones materiales requieren owner, evidencia y decisión explícita;
12. objetos legítimamente abiertos no bloquean por su mera existencia;
13. lock no equivale a cierre;
14. liberar lock exige motivo;
15. cierre final exige periodo `locked` y versión vigente;
16. aprobación no concede cierre;
17. conciliación no concede cierre;
18. cierre/reapertura no conceden exportación;
19. cierre económico no equivale a cierre contable/fiscal;
20. cierre NUMERA no cierra PULSO, ORIGO, NEXO o FOGO;
21. reapertura exige versión de cierre y motivo;
22. reapertura es acotada y no concede escritura irrestricta;
23. corrección usa autoridad exacta del recurso;
24. no existe permiso genérico `periods.correct/manage/update`;
25. evento tardío no es autoridad de reapertura;
26. cierre previo nunca se borra;
27. restatement es versionado;
28. cambios materiales tras reapertura requieren nuevo cierre;
29. estados de `VPROC-0054` no son estados del periodo;
30. decisión stale exige nueva revisión;
31. transiciones son idempotentes frente a retries;
32. decisiones opuestas no son retries;
33. UI, rol, ownership o scope seleccionado no conceden autoridad;
34. server-side revalida actor, permiso, scope, estado, versión y gates;
35. la siguiente tarea es exportación con permiso independiente.

---

#### 82. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 83. Cobertura de prueba vigente reutilizada

La tarea reutiliza, sin modificar texto, estado, relaciones ni secuencia:

- `TREQ-NUMERA-001` — cierres reconciliados, correcciones/reaperturas con historia y trazabilidad financiera;
- `TREQ-NUMERA-002` — periodos, estado, evidencia, correcciones compensatorias y separación económico/contable/fiscal;
- `TREQ-NUMERA-003` — separación de registrar, aprobar, pagar, conciliar, cerrar, reabrir y exportar;
- `TREQ-AUTH-013` — revalidación server-side de actor, permiso, scope, recurso/periodo y estado;
- `TREQ-AUTH-014` — invalidación de decisiones stale ante cambios materiales de contexto o recurso;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones sensibles;
- `TREQ-INTEGRATION-017` — tratamiento versionado e idempotente de hechos operativos, incluidos eventos tardíos, sin doble efecto.

Esta sección es únicamente trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 84. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El trabajo es documental; no se ejecutaron build, lint, tipos ni pruebas de producto. |
| LOCAL | NOT_EXECUTED | La incorporación, formato, quality, delivery, validadores de dominio y batería global permanecen pendientes del checkout del usuario tras el cierre de `NUMERA-UX-010`. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología `DEFINE_ONCE`, políticas documentales, archivo propietario, `NUMERA-AUTH-006`, `NUMERA-DOM-011`, `NUMERA-DOM-014`, `VSCREEN-0105`, `VPROC-0054`, estados de proceso, Registro 04A aplicable y scripts documentales vigentes; `NUMERA-UX-010` se consume desde su archivo completo aprobado por el usuario mientras termina su publicación. |
| OPERATIVA | NOT_EXECUTED | No se bloquearon, cerraron, reabrieron, corrigieron ni reexpresaron periodos reales. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-011` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza implementación física propia. |

---

#### 85. Criterios de aceptación

La tarea queda aceptable cuando se verifica que:

1. existe exactamente un contrato `NUMERA-PERIOD-CLOSE-FLOW-001`;
2. la superficie es `VSCREEN-0105`;
3. el paso propietario es `VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD`;
4. la pantalla no constituye autoridad;
5. los estados del periodo son exactamente `open|locked|closed`;
6. existen exactamente tres permisos mutantes de estado;
7. `periods.view` permanece separado;
8. `open -> locked` usa `periods.lock`;
9. `locked -> open` usa el contrato de lock y exige motivo;
10. `locked -> closed` usa `periods.close`;
11. `closed -> open` usa `periods.reopen`;
12. `open -> closed` directo queda prohibido;
13. lock no equivale a cierre;
14. release lock no equivale a reopen;
15. la cabecera muestra periodo, estado y versión autorizados;
16. selección visual no es fuente de verdad;
17. servidor revalida estado y versión;
18. stale produce nueva revisión;
19. close readiness presenta gates reproducibles;
20. permiso + gate fallido produce deny;
21. gate obligatorio UNKNOWN no equivale a PASS;
22. excepción material conserva owner/evidencia/decisión;
23. objeto legítimamente abierto no bloquea por mera existencia;
24. lock comunica que el periodo aún no está cerrado;
25. liberar lock conserva el intento de cierre;
26. corrección durante lock no adquiere autoridad implícita;
27. close review conserva gates, versión, fuentes y excepciones;
28. close commit exige estado locked;
29. approval no implica close/reopen;
30. reconcile no implica close/reopen;
31. close/reopen no implican export;
32. close no implica publish;
33. cierre económico no se presenta como cierre contable/fiscal;
34. cierre NUMERA no altera dominios fuente;
35. receipt de cierre es reconstruible;
36. resultado desconocido no dispara retry ciego;
37. close retry es idempotente;
38. reapertura solo parte de closed;
39. reapertura exige close_version;
40. reapertura exige motivo;
41. se evalúa ajuste posterior vs reapertura;
42. reapertura material exige permiso exacto;
43. reopen review muestra impacto y alcance;
44. reapertura es acotada;
45. reapertura no concede mutación de recursos;
46. no existe permiso genérico correct/manage/update del periodo;
47. matriz de corrección contiene las cinco situaciones gobernadas;
48. evento tardío no concede autoridad;
49. historial previo se preserva;
50. restatement es versionado;
51. cambio material exige recierre;
52. VPROC-0054 conserva nueve estados;
53. lifecycle de proceso y estado de periodo no se fusionan;
54. CLOSE_RECONCILIATION_PENDING no equivale a closed;
55. resolución ejecutada no equivale a diferencia verificada;
56. diferencia en periodo protegido se enruta, no se fuerza;
57. resultado externo incierto no se presenta como PASS;
58. permisos de register/approve/reconcile/lock/close/reopen/correct permanecen segregados;
59. role/ownership no conceden autoridad;
60. selected scope no equivale a authorized scope;
61. reauth no crea permiso ausente;
62. simulación no ejecuta transiciones;
63. server-side resuelve el contrato mínimo;
64. fallback a manage está prohibido;
65. wildcards están prohibidos;
66. concurrencia invalida review stale;
67. lock/close/reopen son idempotentes frente a retry;
68. decisiones opuestas son nuevas decisiones;
69. lotes autorizan cada miembro;
70. labels UX no se confunden con estados empresariales;
71. deny/stale/failure/unknown permanecen distintos;
72. errores minimizan información sensible;
73. recuperación consulta estado/version/evidencia antes de retry;
74. accesibilidad no depende solo de color;
75. responsive preserva bloqueadores antes de acción;
76. síntesis de readiness no sustituye detalle;
77. empty states no convierten ausencia visible en readiness;
78. receipt es proyección, no autoridad;
79. AS-IS no redefine el contrato objetivo;
80. todo hallazgo diferido tiene owner y salida;
81. no se crean ni modifican requisitos de prueba;
82. no se ejecutan cambios físicos;
83. UX-012 recibe separación explícita entre lectura/cierre y exportación.

---

#### 86. Límites

Esta tarea no:

- publica permisos runtime;
- materializa `periods.lock`, `periods.close` o `periods.reopen`;
- asigna grants a roles;
- fija umbrales monetarios universales de materialidad;
- crea estados adicionales de periodo;
- modifica `VPROC-0054`;
- ejecuta conciliaciones reales;
- bloquea, cierra o reabre periodos reales;
- corrige recursos financieros reales;
- crea restatements físicos;
- define storage/columnas de close_version;
- cierra periodos contables o fiscales oficiales;
- cambia estados de PULSO, ORIGO, NEXO o FOGO;
- publica reportes, escenarios, presupuestos o precios;
- diseña la exportación de UX-012;
- define filtros completos de UX-013;
- modifica RLS, RPC, Server Actions o APIs;
- modifica Supabase;
- crea migraciones;
- cambia datos;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-012`.

---

#### 87. Handoff a NUMERA-UX-012

La siguiente tarea recibe:

```text
NUMERA_PERIOD_CLOSE_FLOW_CONTRACT = NUMERA-PERIOD-CLOSE-FLOW-001
NUMERA_FINANCIAL_APPROVAL_FLOW_CONTRACT = NUMERA-FINANCIAL-APPROVAL-FLOW-001
PERIOD_CLOSE_SCREEN_ID = VSCREEN-0105
PERIOD_CLOSE_PROCESS_ID = VPROC-0054
PERIOD_CLOSE_STEP_ID = VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD
PERIOD_STATUS_VALUES = open|locked|closed
PERIOD_STATE_PERMISSION_COUNT = 3
PERIOD_VIEW_PERMISSION = numera.finance.periods.view
PERIOD_LOCK_PERMISSION = numera.finance.periods.lock
PERIOD_CLOSE_PERMISSION = numera.finance.periods.close
PERIOD_REOPEN_PERMISSION = numera.finance.periods.reopen
OPEN_TO_CLOSED_DIRECT = FORBIDDEN
LOCKED_TO_OPEN_IS_REOPEN = NO
CLOSED_TO_OPEN_IS_REOPEN = YES
LOCK_PERMISSION_IMPLIES_VIEW = NO
CLOSE_PERMISSION_IMPLIES_VIEW = NO
REOPEN_PERMISSION_IMPLIES_VIEW = NO
CLOSE_PERMISSION_REPLACES_GATES = NO
UNKNOWN_REQUIRED_GATE_IS_PASS = NO
RELEASE_LOCK_REASON_REQUIRED = YES
REOPEN_REASON_REQUIRED = YES
REOPEN_REQUIRES_CLOSE_VERSION = YES
REOPEN_IS_UNBOUNDED_WRITE = NO
REOPEN_IMPLIES_RESOURCE_MUTATION = NO
GENERIC_PERIOD_CORRECT_PERMISSION = FORBIDDEN
CORRECTION_USES_EXACT_RESOURCE_MUTATION_AUTHORITY = YES
LATE_EVENT_IS_REOPEN_AUTHORITY = NO
REOPEN_DELETES_PREVIOUS_CLOSE = NO
RESTATEMENT_IS_VERSIONED = YES
REOPEN_WITH_MATERIAL_CHANGE_REQUIRES_RECLOSE = YES
PERIOD_STATE_SERVER_REVALIDATION_REQUIRED = YES
STALE_PERIOD_VERSION = DENY_AND_REVIEW_AGAIN
PERIOD_STATE_TRANSITIONS_IDEMPOTENT = YES
NUMERA_PERIOD_CLOSE_IS_ACCOUNTING_OR_FISCAL_CLOSE = NO
NUMERA_PERIOD_CLOSE_CHANGES_SOURCE_DOMAIN_STATE = NO
CLOSE_IMPLIES_EXPORT = NO
REOPEN_IMPLIES_EXPORT = NO
EXPORT_OWNER = NUMERA_UX_012
TREQ_CHANGES = 0
```

`NUMERA-UX-012` deberá diseñar exportación con permiso independiente sin inferir autoridad de extracción desde lectura, cierre, reapertura, pantalla visible o receipt de evidencia.

---

#### 88. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-010
-> NUMERA-UX-011
-> NUMERA-UX-012
```

UX-011 consume la separación entre aprobación y cierre de UX-010 y entrega a UX-012 la separación explícita entre cierre/reapertura y exportación.

---

#### 89. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-010 — Diseñar flujo de aprobación`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-011 — Diseñar flujo de cierre`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-012 — Diseñar exportación con permiso independiente`
### ✅ NUMERA-UX-012 — Diseñar exportación con permiso independiente

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-011 — Diseñar flujo de cierre
**Tarea siguiente:** NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo
**Tipo de tarea:** diseño documental del flujo de exportación financiera independiente de lectura, publicación, cierre, recuperación de artefacto, impresión y compartición, con autoridad exacta, minimización, versión, corte, filtros, población, formato, finalidad, destino, evidencia, idempotencia y recuperación; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea botones, endpoints, archivos, jobs, Storage, permisos runtime, grants, RLS, RPC, Server Actions, APIs, tablas, migraciones, Supabase, exportaciones reales ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar la experiencia de exportación financiera de NUMERA de forma que extraer información fuera de la superficie interactiva sea una acción protegida y explícita, nunca una consecuencia automática de poder ver un reporte, publicar una versión, cerrar un periodo o conocer una URL.

La UX debe permitir configurar, revisar y ejecutar una solicitud de exportación reproducible sobre `VSCREEN-0106`, preservando la identidad exacta del reporte o consulta base, su versión, periodo y corte, filtros, dimensiones, población, proyección de campos, finalidad, formato y destino permitido.

---

#### 2. Naturaleza y topología

La tarea se resuelve como:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- se define una sola vez;
- no crea instancia física propia;
- no materializa la exportación;
- no publica permisos runtime;
- no genera archivos;
- no decide tecnología de generación o entrega;
- no modifica Supabase;
- no altera el lifecycle de reportes, periodos o procesos.

---

#### 3. Handoff recibido de NUMERA-UX-011

Se consume íntegramente:

```text
NUMERA_PERIOD_CLOSE_FLOW_CONTRACT = NUMERA-PERIOD-CLOSE-FLOW-001
NUMERA_FINANCIAL_APPROVAL_FLOW_CONTRACT = NUMERA-FINANCIAL-APPROVAL-FLOW-001
PERIOD_CLOSE_SCREEN_ID = VSCREEN-0105
PERIOD_CLOSE_PROCESS_ID = VPROC-0054
PERIOD_CLOSE_STEP_ID = VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD
PERIOD_STATUS_VALUES = open|locked|closed
PERIOD_STATE_PERMISSION_COUNT = 3
PERIOD_VIEW_PERMISSION = numera.finance.periods.view
PERIOD_LOCK_PERMISSION = numera.finance.periods.lock
PERIOD_CLOSE_PERMISSION = numera.finance.periods.close
PERIOD_REOPEN_PERMISSION = numera.finance.periods.reopen
OPEN_TO_CLOSED_DIRECT = FORBIDDEN
LOCKED_TO_OPEN_IS_REOPEN = NO
CLOSED_TO_OPEN_IS_REOPEN = YES
LOCK_PERMISSION_IMPLIES_VIEW = NO
CLOSE_PERMISSION_IMPLIES_VIEW = NO
REOPEN_PERMISSION_IMPLIES_VIEW = NO
CLOSE_PERMISSION_REPLACES_GATES = NO
UNKNOWN_REQUIRED_GATE_IS_PASS = NO
RELEASE_LOCK_REASON_REQUIRED = YES
REOPEN_REASON_REQUIRED = YES
REOPEN_REQUIRES_CLOSE_VERSION = YES
REOPEN_IS_UNBOUNDED_WRITE = NO
REOPEN_IMPLIES_RESOURCE_MUTATION = NO
GENERIC_PERIOD_CORRECT_PERMISSION = FORBIDDEN
CORRECTION_USES_EXACT_RESOURCE_MUTATION_AUTHORITY = YES
LATE_EVENT_IS_REOPEN_AUTHORITY = NO
REOPEN_DELETES_PREVIOUS_CLOSE = NO
RESTATEMENT_IS_VERSIONED = YES
REOPEN_WITH_MATERIAL_CHANGE_REQUIRES_RECLOSE = YES
PERIOD_STATE_SERVER_REVALIDATION_REQUIRED = YES
STALE_PERIOD_VERSION = DENY_AND_REVIEW_AGAIN
PERIOD_STATE_TRANSITIONS_IDEMPOTENT = YES
NUMERA_PERIOD_CLOSE_IS_ACCOUNTING_OR_FISCAL_CLOSE = NO
NUMERA_PERIOD_CLOSE_CHANGES_SOURCE_DOMAIN_STATE = NO
CLOSE_IMPLIES_EXPORT = NO
REOPEN_IMPLIES_EXPORT = NO
EXPORT_OWNER = NUMERA_UX_012
TREQ_CHANGES = 0
```

UX-012 mantiene explícitamente `CLOSE_IMPLIES_EXPORT = NO` y `REOPEN_IMPLIES_EXPORT = NO`.

---

#### 4. Contratos canónicos consumidos

La tarea consume sin redefinir:

- `NUMERA-AUTH-007` — permiso exacto de exportación;
- `NUMERA-DOM-012` — reportes, versiones, cortes, exportaciones y restatement;
- `VSCREEN-0106` — Reportes y exportaciones financieras;
- `VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT` — acción propietaria de publicación/reporte asociada a la superficie;
- `NUMERA-UX-008` — síntesis antes del detalle cuando ambos coexisten;
- `NUMERA-UX-011` — separación entre cierre/reapertura y exportación.

---

#### 5. Contrato UX resultante

Se define:

```text
NUMERA-INDEPENDENT-EXPORT-FLOW-001
```

Este contrato gobierna la experiencia de solicitud, revisión, autorización, generación, entrega y recuperación de una exportación financiera derivada.

---

#### 6. Superficie propietaria

La superficie canónica es:

```text
SCREEN_ID = VSCREEN-0106
SCREEN_NAME = Reportes y exportaciones financieras
OWNER = numera
PROCESS_ID = VPROC-0061
STEP_ID = VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT
```

La pantalla es superficie de interacción; no constituye autoridad.

---

#### 7. Identidad exacta del permiso

La única identidad de exportación consumida por esta UX es:

```text
numera.analytics.financial_reports.export
```

No se crean aliases UX ni permisos alternativos.

---

#### 8. Cardinalidad de autoridad

Se congela:

```text
EXPORT_PERMISSION_IDENTITY_COUNT = 1
EXPORT_RUNTIME_GRANT_CREATED_BY_UX_012 = 0
NEW_EXPORT_PERMISSION_CODE_COUNT = 0
```

La UX consume una identidad contractual ya definida; no la materializa.

---

#### 9. Lectura y exportación permanecen separadas

Se conserva:

```text
numera.analytics.financial_reports.view
!=
numera.analytics.financial_reports.export
```

Y:

```text
VIEW_PERMISSION_IMPLIES_EXPORT = NO
EXPORT_PERMISSION_IMPLIES_VIEW = NO
```

Para construir una salida desde un reporte visible deben satisfacerse ambas autoridades cuando corresponda.

---

#### 10. Publicación y exportación permanecen separadas

Se congela:

```text
REPORT_PUBLISHED != REPORT_EXPORTED
PUBLISH != EXPORT
```

Una versión publicada no adquiere automáticamente una salida recuperable ni una autorización de extracción.

---

#### 11. Cierre y exportación permanecen separados

Se mantiene:

```text
LOCK != EXPORT
CLOSE != EXPORT
REOPEN != EXPORT
```

Poder cerrar o reabrir un periodo no permite extraer su información.

---

#### 12. Flujo UX canónico

La experiencia se diseña como:

```text
ENTRY
-> REPORT_CONTEXT
-> EXPORT_INTENT
-> PURPOSE
-> PROJECTION
-> POPULATION_AND_SCOPE
-> FORMAT
-> DESTINATION_CONTEXT
-> REVIEW
-> AUTHORIZATION
-> GENERATION
-> DELIVERY
-> RECEIPT
-> RECOVERY
```

Estas son etapas UX, no estados nuevos de `VPROC-0061`.

---

#### 13. Entrada al flujo

La entrada ordinaria parte de un reporte o consulta identificable dentro de `VSCREEN-0106`.

Antes de mostrar la acción efectiva de exportación la UI debe poder resolver:

```text
REPORT_OR_QUERY_IDENTITY
REPORT_VERSION
READABLE_RESOURCE
CURRENT_SCOPE
CURRENT_FILTERS
CURRENT_DIMENSIONS
CURRENT_PERIOD_CONTEXT
```

Una pantalla visible sin recurso resoluble no habilita exportación.

---

#### 14. Contexto visible antes de configurar

La cabecera de exportación debe presentar, cuando aplique:

- nombre empresarial del reporte o consulta;
- versión;
- periodo económico;
- estado del periodo al corte;
- versión de cierre cuando corresponda;
- fecha/hora de corte;
- filtros activos;
- dimensiones activas;
- moneda/unidad relevantes;
- estado de calidad o frescura material.

La UI no debe ocultar la versión que será exportada.

---

#### 15. Reporte versus consulta reproducible

La exportación podrá originarse únicamente desde:

```text
IDENTIFIED_REPORT
OR
REPRODUCIBLE_AUTHORIZED_QUERY
```

No se autoriza exportar un conjunto cuya identidad no pueda reconstruirse.

---

#### 16. Identidad y versión forman parte de la decisión

Se congela:

```text
REPORT_ID + REPORT_VERSION
```

como parte de la solicitud cuando exista reporte publicado.

Un cambio de versión material después de la revisión invalida la decisión previa.

---

#### 17. Periodo y corte

Toda exportación que represente información temporal debe conservar:

```text
PERIOD_ID
PERIOD_STATUS_AT_CUTOFF
AS_OF
```

Cuando el periodo esté cerrado debe conservar además:

```text
CLOSE_VERSION
```

La exportación no cambia el estado del periodo.

---

#### 18. Restatement e historia

Una exportación histórica no cambia cuando aparece un restatement.

Se conserva:

```text
OLD_EXPORT != MUTABLE_POINTER_TO_LATEST_REPORT
```

Si existe una versión posterior, la UI podrá advertirlo sin alterar la exportación histórica ni sustituir silenciosamente la versión solicitada.

---

#### 19. Finalidad empresarial obligatoria

La solicitud debe resolver una finalidad empresarial válida antes del efecto autoritativo.

Se congela:

```text
PURPOSE_REQUIRED = YES
```

No son finalidad suficiente:

- “por si acaso”;
- “para tener copia”;
- el nombre del rol;
- la existencia del botón;
- la disponibilidad del formato.

UX-012 no inventa un catálogo paralelo de finalidades.

---

#### 20. Control de finalidad

La UI debe consumir la forma de finalidad que el contrato propietario materialice posteriormente.

Puede tratarse de selección gobernada, referencia de caso o motivo estructurado, pero:

```text
FREE_TEXT_ALONE != AUTHORIZATION
```

La forma concreta no se congela en esta tarea.

---

#### 21. Proyección de campos

El flujo debe mostrar una proyección de campos o categorías autorizadas antes de generar la salida.

Se conserva:

```text
EXPORT_PERMISSION != ALL_FIELDS
```

Solo pueden incluirse columnas permitidas para el recurso, finalidad, sensibilidad y alcance actuales.

---

#### 22. Campos ocultos en UI

Se congela:

```text
BACKEND_FIELD_AVAILABLE != EXPORTABLE_FIELD
```

Un campo que exista técnicamente pero no esté autorizado no puede añadirse a la salida por conveniencia.

---

#### 23. Minimización

La exportación se construye con la mínima proyección necesaria para la finalidad declarada.

La UI debe permitir comprender qué se incluirá y, cuando el contrato permita elección, reducir la proyección.

No debe inducir a seleccionar “todo” como opción predeterminada universal.

---

#### 24. Datos especialmente sensibles

Cuando la proyección incluya componentes financieros, bancarios, fiscales, de cartera, personales o secretos empresariales, la UI debe reflejar la sensibilidad aplicable sin revelar datos no autorizados.

La sensibilidad puede restringir la proyección aunque el reporte agregado sea visible.

---

#### 25. Población

La población forma parte de la solicitud.

Se conserva:

```text
AUTHORIZED_QUERY != ARBITRARY_BULK_POPULATION
```

La UX no ofrece una opción “todos” que amplíe silenciosamente el universo más allá del alcance autorizado.

---

#### 26. Filtros

Los filtros efectivos forman parte de la identidad de la salida.

La exportación debe preservar exactamente los filtros autorizados observados al revisar la solicitud.

El diseño detallado de filtros por empresa, sede y centro de costo pertenece a `NUMERA-UX-013`.

---

#### 27. Dimensiones agregadas

Un agregado solo puede exportarse cuando los miembros que lo componen son compatibles con el alcance efectivo.

Se congela:

```text
EXPORT_SCOPE <= AUTHORIZED_READ_SCOPE
```

La agregación no constituye bypass de alcance.

---

#### 28. Frontera con UX-013

UX-012 define que scope, filtros y población son parte de la decisión de exportación.

`NUMERA-UX-013` definirá la interacción detallada de:

- empresa;
- sede;
- centro de costo.

UX-012 no anticipa ni inventa esos controles.

---

#### 29. Formato

El formato es una propiedad de la solicitud, no una autoridad.

Se conserva:

```text
FILE_FORMAT != AUTHORITY
FILE_FORMAT != OFFICIALITY
```

---

#### 30. Conjunto de formatos soportados

La UX debe mostrar únicamente formatos materializados y declarados como soportados por el consumidor real.

Se congela:

```text
SUPPORTED_EXPORT_FORMATS = RUNTIME_DECLARED_SET
```

CSV, XLSX, PDF o JSON son ejemplos contractuales posibles, no un conjunto obligatorio creado por UX-012.

---

#### 31. Cambio de formato

Cambiar el formato no autoriza:

- más columnas;
- mayor población;
- otro periodo;
- otra versión;
- otro destinatario;
- otra finalidad.

Si el cambio altera alguna dimensión material de la decisión debe revaluarse la solicitud.

---

#### 32. Exportación no equivale a recuperación posterior de un artefacto

Se conserva:

```text
EXPORT != DOWNLOAD_EXISTING_ARTIFACT
```

La generación autorizada puede terminar en un intento técnico de entrega de la instancia recién producida.

Una recuperación posterior de un artefacto persistido es una acción diferenciable y no adquiere autoridad por inferencia.

---

#### 33. Exportación no equivale a impresión

Se congela:

```text
EXPORT != PRINT
```

UX-012 no ofrece impresión como alias de exportación ni inventa un permiso `*.print`.

---

#### 34. Exportación no equivale a compartición

Se congela:

```text
EXPORT != SHARE_INTERNAL
EXPORT != SHARE_EXTERNAL
```

La UI no convierte “exportar” en “enviar por correo”, “compartir enlace” o “entregar a tercero” sin autoridad propia.

---

#### 35. URL firmada

Se conserva:

```text
SIGNED_URL != EXPORT_PERMISSION
SIGNED_URL != SHARE_PERMISSION
```

Una URL futura podrá ser mecanismo de entrega, nunca fuente de autoridad.

---

#### 36. Destinatario y destino

Cuando exista destinatario o destino separado del actor solicitante, ambos deben quedar resueltos conforme al contrato transversal antes de generar o entregar la salida.

La UX no debe inferir destinatario desde:

- rol;
- correo visible;
- sede;
- contexto de navegación;
- último destino usado.

---

#### 37. Entrega al actor solicitante

Cuando una implementación futura defina que la salida se entrega únicamente al actor actual dentro del mismo flujo, la UI debe reflejar ese destino explícitamente.

Esto no crea autorización para redistribuir posteriormente el archivo.

---

#### 38. Revisión previa

Antes de confirmar la exportación debe existir una revisión compacta de:

- reporte/consulta;
- versión;
- periodo/corte;
- filtros;
- dimensiones;
- población;
- campos;
- formato;
- finalidad;
- destinatario/destino cuando aplique;
- sensibilidad relevante.

La revisión es informativa; no concede permiso.

---

#### 39. Contrato server-side mínimo

Antes del efecto autoritativo deberán revalidarse en servidor, como mínimo:

```text
principal
+ effective_actor
+ numera.access
+ numera.analytics.financial_reports.view
+ numera.analytics.financial_reports.export
+ resource_identity
+ report_version
+ period_and_cutoff_when_applicable
+ scope
+ requested_filters
+ requested_dimensions
+ field_projection
+ population
+ purpose
+ format
+ sensitivity
+ recipient_destination_when_applicable
+ authorization_state
+ no_effective_deny
```

La UI no reemplaza esta evaluación.

---

#### 40. Botón visible no es autoridad

Se congela:

```text
EXPORT_BUTTON_VISIBLE != EXPORT_AUTHORIZED
```

La aplicación puede ocultar o deshabilitar acciones por claridad UX, pero el servidor debe fallar cerrado ante cualquier llamada no autorizada.

---

#### 41. Rol y ownership no conceden exportación

Se conserva:

```text
ROLE_NAME != EXPORT_AUTHORITY
RESOURCE_OWNER != EXPORT_AUTHORITY
REPORT_PUBLISHER != EXPORT_AUTHORITY
```

---

#### 42. Fallback legacy prohibido

Queda prohibido usar como sustituto:

```text
numera.reports.view
numera.expenses.manage
numera.cost_centers.manage
numera.*
numera.analytics.*
numera.finance.*
```

La ausencia del permiso exacto produce denegación.

---

#### 43. Aliases de exportación prohibidos

UX-012 no crea:

```text
numera.reports.export
numera.finance.reports.export
numera.analytics.export
numera.export
```

La identidad sigue siendo únicamente:

```text
numera.analytics.financial_reports.export
```

---

#### 44. Estado runtime actual

Se preserva el AS-IS documentado:

```text
EXPORT_UI_ACTIONS = 0
CSV_XLSX_EXPORT_IMPLEMENTATIONS = 0
DOWNLOAD_ROUTES = 0
PRINT_ACTIONS = 0
RUNTIME_REPORT_PERMISSION_CONSUMERS = 0
```

UX-012 no convierte este diseño en disponibilidad física.

---

#### 45. Shared device y actor atribuible

La exportación financiera sensible conserva exigencia fuerte de dispositivo compartido conforme al contrato transversal.

La UI debe evitar ejecutar una exportación sensible cuando el actor efectivo no pueda atribuirse de forma suficiente.

---

#### 46. Reautenticación

Si el contrato transversal determina reautenticación fuerte para la sensibilidad y contexto actuales, la UX debe solicitarla antes del efecto autoritativo.

Se conserva:

```text
REAUTH_SUCCESS != EXPORT_PERMISSION_GRANT
```

Reautenticar confirma actor/contexto; no crea un permiso ausente.

---

#### 47. Simulación

Se congela:

```text
SIMULATED_AUTHORITY_CAN_EXPORT_REAL_FINANCIAL_DATA = NO
```

Una simulación puede mostrar elegibilidad hipotética o estructura minimizada autorizada, pero no generar una copia real usando autoridad simulada.

---

#### 48. Solicitud de exportación

La UX debe construir una solicitud lógica identificable que pueda preservar, cuando aplique:

```text
REQUEST_ID
RESOURCE_ID
REPORT_VERSION
PERIOD_ID
CLOSE_VERSION
AS_OF
REQUESTED_FORMAT
REQUESTED_FIELDS
REQUESTED_FILTERS
REQUESTED_DIMENSIONS
REQUESTED_POPULATION
PURPOSE
RECIPIENT_DESTINATION
REQUESTED_BY
EFFECTIVE_ACTOR
REQUESTED_AT
```

La tarea no fija persistencia física para esta estructura.

---

#### 49. Request ID

Se congela:

```text
REQUEST_ID_REQUIRED_FOR_RETRYABLE_EXPORT = YES
```

El identificador permite correlacionar decisión, generación, entrega y recuperación sin interpretar un retry como una nueva intención empresarial.

---

#### 50. Instancia de exportación

La salida producida debe ser distinguible de la solicitud:

```text
EXPORT_INSTANCE != EXPORT_REQUEST
```

La instancia conserva la versión y configuración exactas que originaron su contenido.

---

#### 51. Intento de entrega

Se distingue:

```text
DELIVERY_ATTEMPT != EXPORT_AUTHORIZATION
```

Un retry de entrega no puede ampliar campos, población, versión, formato, destino o finalidad.

---

#### 52. Idempotencia

Para una solicitud lógica retryable se preserva:

```text
SAME_REQUEST_ID
+ SAME_REPORT_VERSION
+ SAME_EXPORT_DECISION
-> ONE_LOGICAL_EXPORT
```

La tecnología podrá requerir más de un intento técnico de generación o entrega, pero no deberá crear silenciosamente múltiples efectos empresariales equivalentes.

---

#### 53. Resultado desconocido

Ante timeout, pérdida de respuesta o incertidumbre técnica:

```text
RESULT_UNKNOWN != FAILED
RESULT_UNKNOWN != SAFE_TO_RETRY_BLINDLY
```

La recuperación debe consultar el `REQUEST_ID`, la instancia conocida y la evidencia antes de decidir un nuevo intento.

---

#### 54. Cambio material durante generación

Si antes del punto autoritativo cambia materialmente:

- actor;
- permiso;
- scope;
- reporte/version;
- periodo/corte;
- filtros;
- población;
- campos;
- finalidad;
- destino;
- sensibilidad;

la solicitud debe revaluarse.

---

#### 55. Versión stale

Se congela:

```text
STALE_REPORT_VERSION = DENY_AND_REVIEW_AGAIN
```

La exportación no debe sustituir silenciosamente la versión revisada por la más reciente.

---

#### 56. Scope stale

Se congela:

```text
STALE_SCOPE_DECISION = DENY_AND_REVIEW_AGAIN
```

Un cambio de alcance efectivo exige revisar nuevamente población y agregados.

---

#### 57. Proyección stale

Si la clasificación o permisos de campos cambian entre revisión y generación:

```text
STALE_FIELD_PROJECTION = DENY_AND_REVIEW_AGAIN
```

No se genera una salida más amplia que la revisada.

---

#### 58. Calidad y oficialidad

Exportar no convierte un reporte degradado en oficial.

La UI debe preservar el estado de calidad, cobertura y frescura aplicable al recurso base.

Se conserva:

```text
EXPORT_FORMAT != OFFICIALITY
```

---

#### 59. Periodo open

Una exportación de un reporte con periodo `open` debe conservar esa condición y no presentarse como resultado final de periodo cerrado.

---

#### 60. Periodo locked

Una exportación de revisión o pre-cierre debe identificar `locked` cuando corresponda y no presentar el lock como cierre final.

---

#### 61. Periodo closed

Cuando la salida represente un periodo cerrado debe conservar una `CLOSE_VERSION` identificable.

La ausencia de esa versión bloquea cualquier representación que pretenda ser final del cierre.

---

#### 62. Exportación histórica

Una instancia histórica conserva:

- reporte/version;
- periodo/corte;
- filtros;
- dimensiones;
- proyección;
- formato;
- decisión;
- resultado.

No se reescribe cuando cambia la vista en vivo.

---

#### 63. Exportación no es fuente económica

Se congela:

```text
EXPORT_IS_ECONOMIC_SOURCE = NO
```

Una copia exportada no compite con los hechos, documentos y sistemas propietarios originales.

---

#### 64. Exportación NUMERA no es filing fiscal

Se conserva:

```text
NUMERA_EXPORT_IS_TAX_FILING = NO
```

Generar una salida no equivale a presentar una declaración, libro, reporte regulatorio o aceptación de autoridad externa.

---

#### 65. Exportación no es estado contable oficial externo

La salida NUMERA permanece dentro de la frontera de gestión/analítica interna definida por el dominio.

No se presenta como estado financiero estatutario por el solo hecho de ser PDF, XLSX u otro formato.

---

#### 66. Exportación no aprueba contenido

Se congela:

```text
EXPORT != APPROVE
EXPORT != REJECT
```

La acción de copiar información no decide su validez económica.

---

#### 67. Exportación no muta recursos

Se conserva:

```text
EXPORT != REGISTER
EXPORT != UPDATE
EXPORT != CANCEL
EXPORT != RECONCILE
```

La exportación es derivada y no habilita mutación.

---

#### 68. Exportación no gobierna escenarios

Se mantiene:

```text
EXPORT != SCENARIO_CREATE
EXPORT != SCENARIO_SHARE
EXPORT != SCENARIO_APPROVE
EXPORT != SCENARIO_PUBLISH
```

Las acciones especializadas permanecen bajo su contrato propietario.

---

#### 69. Estados UX de exportación

Se definen únicamente como estados de presentación:

```text
CONFIGURING
READY_FOR_REVIEW
AUTHORIZING
GENERATING
DELIVERING
COMPLETED
DENIED
STALE
FAILED
RESULT_UNKNOWN
```

No son estados empresariales de `VPROC-0061` ni de un periodo.

---

#### 70. Denegación

`DENIED` comunica ausencia de autoridad o incompatibilidad gobernada sin revelar permisos, recursos o campos que el actor no puede conocer.

La UI no debe sugerir que cambiar el formato o reintentar resuelve una denegación de autorización.

---

#### 71. Stale

`STALE` exige volver a revisar el contexto actualizado.

La UI debe conservar la configuración del usuario cuando sea seguro, pero no reutilizar automáticamente la decisión autoritativa vencida.

---

#### 72. Fallo técnico

`FAILED` representa un fallo técnico conocido posterior o independiente de la autorización.

Debe distinguirse de `DENIED`, `STALE` y `RESULT_UNKNOWN`.

---

#### 73. Errores públicos seguros

Los mensajes visibles no deben exponer:

- SQL;
- endpoints internos;
- secretos;
- tokens;
- payload financiero completo;
- campos no autorizados;
- enumeración de recursos invisibles.

La evidencia técnica detallada permanece en la capa autorizada.

---

#### 74. Receipt

Al completar una exportación, la UX debe poder presentar un receipt minimizado con:

- request ID;
- recurso/reporte;
- versión;
- corte;
- formato;
- alcance resumido;
- finalidad resumida;
- instante;
- resultado.

El receipt no necesita repetir los datos exportados.

---

#### 75. Evidencia de auditoría

La decisión y resultado deben ser correlacionables con:

- principal;
- actor efectivo;
- permiso exacto;
- request ID;
- reporte/consulta;
- versión;
- filtros/alcance;
- campos/población;
- formato;
- finalidad;
- destino cuando aplique;
- decisión;
- instante;
- resultado.

La especialización completa de auditoría permanece bajo `NUMERA-AUTH-009`.

---

#### 76. Recuperación

El flujo de recuperación debe consultar primero:

```text
REQUEST_ID
AUTHORIZATION_RESULT
EXPORT_INSTANCE_IF_ANY
DELIVERY_ATTEMPTS
CURRENT_RESOURCE_VERSION
```

antes de ofrecer un nuevo intento.

---

#### 77. Persistencia no asumida

UX-012 no exige que toda exportación quede almacenada persistentemente.

Se congela:

```text
EXPORT_STORAGE_MODEL = IMPLEMENTATION_DETAIL
```

Cualquier persistencia futura deberá respetar retención, acceso y recuperación bajo sus propietarios canónicos.

---

#### 78. Procesamiento sin arquitectura forzada

El flujo puede materializarse posteriormente con ejecución síncrona o asíncrona según volumen y tecnología.

UX-012 no define jobs, colas ni workers.

Cualquiera de las dos opciones debe preservar `REQUEST_ID`, idempotencia, autorización y resultado consultable.

---

#### 79. Accesibilidad

La configuración y revisión deben:

- exponer labels semánticos;
- mantener orden de lectura lógico;
- no depender solo de color para sensibilidad o estado;
- asociar errores a su campo o etapa;
- permitir identificar versión, filtros y finalidad con tecnología asistiva.

---

#### 80. Responsive

En superficies estrechas se preserva este orden:

```text
RESOURCE_AND_VERSION
-> SCOPE_AND_FILTERS
-> FIELDS_AND_FORMAT
-> PURPOSE_AND_DESTINATION
-> WARNINGS
-> REVIEW
-> ACTION
```

La acción no debe aparecer antes de los datos que determinan su efecto.

---

#### 81. Indicadores antes que detalle

Cuando `VSCREEN-0106` muestre indicadores y tabla de detalle del mismo contexto, se conserva la regla de `NUMERA-UX-008`.

Esta jerarquía visual no amplía lo exportable ni sustituye la selección explícita de población y campos.

---

#### 82. Hallazgos diferidos

| Hallazgo | Bloquea UX-012 | Propietario | Condición de salida |
| --- | --- | --- | --- |
| permiso `numera.analytics.financial_reports.export` aún no materializado | no | `NUMERA-AUTH-012` + package físico aplicable | catálogo, guard y consumidor publican exactamente la identidad aprobada |
| AS-IS no tiene acciones de exportación ni formatos materializados | no | implementación física E5/paquete aplicable | `VSCREEN-0106` materializa consumidor real y formatos soportados |
| scope empresa/sede/centro requiere interacción detallada | no | `NUMERA-UX-013` | filtros y scope se diseñan sin ampliar autoridad |
| recuperación posterior de artefacto persistido no tiene identidad NUMERA definida aquí | no | propietario canónico futuro si la capacidad se requiere | no se reutiliza `export` como bypass |
| impresión y compartición permanecen acciones distintas | no | propietario transversal/canónico aplicable | no se ejecutan por inferencia |

No queda un hallazgo diferido sin owner o condición de salida.

---

#### 83. Decisiones congeladas

Se congela:

```text
NUMERA_EXPORT_FLOW_CONTRACT = NUMERA-INDEPENDENT-EXPORT-FLOW-001
EXPORT_SCREEN_ID = VSCREEN-0106
EXPORT_PROCESS_ID = VPROC-0061
EXPORT_STEP_ID = VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT
EXPORT_PERMISSION = numera.analytics.financial_reports.export
EXPORT_PERMISSION_IDENTITY_COUNT = 1
VIEW_PERMISSION = numera.analytics.financial_reports.view
VIEW_IMPLIES_EXPORT = NO
EXPORT_IMPLIES_VIEW = NO
PUBLISH_IMPLIES_EXPORT = NO
CLOSE_IMPLIES_EXPORT = NO
REOPEN_IMPLIES_EXPORT = NO
EXPORT_IS_DOWNLOAD_EXISTING_ARTIFACT = NO
EXPORT_IS_PRINT = NO
EXPORT_IS_SHARE = NO
SIGNED_URL_IS_AUTHORITY = NO
FILE_FORMAT_IS_AUTHORITY = NO
FILE_FORMAT_IS_OFFICIALITY = NO
PURPOSE_REQUIRED = YES
EXPORT_SCOPE_MUST_NOT_EXCEED_AUTHORIZED_READ_SCOPE = YES
EXPORT_PERMISSION_IMPLIES_ALL_FIELDS = NO
REQUEST_ID_REQUIRED_FOR_RETRYABLE_EXPORT = YES
STALE_REPORT_VERSION = DENY_AND_REVIEW_AGAIN
STALE_SCOPE_DECISION = DENY_AND_REVIEW_AGAIN
SIMULATED_AUTHORITY_CAN_EXPORT_REAL_DATA = NO
EXPORT_IS_ECONOMIC_SOURCE = NO
NUMERA_EXPORT_IS_TAX_FILING = NO
UX_013_OWNER = COMPANY_SITE_COST_CENTER_FILTERING
TREQ_CHANGES = 0
```

---

#### 84. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 85. Cobertura de prueba vigente reutilizada

La tarea reutiliza sin modificar:

- `TREQ-NUMERA-001` — reportes reconciliados, permisos separados y trazabilidad;
- `TREQ-NUMERA-002` — identidad, periodo, fuente, evidencia e historia no destructiva;
- `TREQ-NUMERA-003` — separación entre registrar, aprobar, pagar, conciliar, cerrar, reabrir y exportar;
- `TREQ-NUMERA-004` — métodos, versiones, fuentes, periodo y drill-down analítico;
- `TREQ-SHELL-011` — acción exacta, finalidad, clasificación, recurso, territorio, destinatario y salida protegida;
- `TREQ-AUTH-013` — revalidación server-side de permiso, actor, alcance, estado y campos;
- `TREQ-AUTH-014` — invalidación de decisiones stale ante cambios materiales;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas;
- `TREQ-DATA-004` — separación entre vista, snapshot, reporte, simulación, exportación y restatement versionado.

Esta sección es trazabilidad de cobertura vigente y no actualiza el Registro 04A.

---

#### 86. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El trabajo es documental; no se ejecutaron build, lint, tipos ni pruebas de producto. |
| LOCAL | NOT_EXECUTED | La incorporación, formato, quality, delivery, validadores de dominio y batería global permanecen pendientes del checkout del usuario después del cierre de `NUMERA-UX-011`. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología `DEFINE_ONCE`, políticas documentales, archivo propietario, `NUMERA-AUTH-007`, `NUMERA-DOM-012`, `VSCREEN-0106`, `VPROC-0061`, estados canónicos, Registro 04A aplicable y scripts documentales vigentes; `NUMERA-UX-011` se consume desde su archivo completo aprobado por el usuario mientras termina su publicación. |
| OPERATIVA | NOT_EXECUTED | No se generaron, recuperaron, imprimieron, compartieron ni entregaron exportaciones financieras reales. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-012` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza implementación física propia. |

---

#### 87. Criterios de aceptación

La tarea queda aceptable cuando:

1. existe exactamente un contrato `NUMERA-INDEPENDENT-EXPORT-FLOW-001`;
2. la superficie es `VSCREEN-0106`;
3. el proceso asociado es `VPROC-0061`;
4. el step asociado es `VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT`;
5. la pantalla no constituye autoridad;
6. existe exactamente una identidad de permiso de exportación;
7. esa identidad es `numera.analytics.financial_reports.export`;
8. no se inventan aliases;
9. view y export permanecen separados;
10. export no implica view;
11. publish no implica export;
12. close/reopen no implican export;
13. el flujo UX conserva las doce etapas definidas;
14. la entrada exige recurso identificable;
15. reporte/consulta es reproducible;
16. report ID/version forman parte de la decisión cuando aplican;
17. periodo/corte se preservan;
18. close version se conserva cuando el periodo está cerrado;
19. restatement no muta exportaciones históricas;
20. finalidad es obligatoria;
21. free text por sí solo no crea autorización;
22. proyección de campos forma parte de la solicitud;
23. permiso de exportación no concede todos los campos;
24. campo backend oculto no se vuelve exportable;
25. minimización ocurre antes del artefacto final;
26. sensibilidad puede reducir la proyección;
27. población forma parte de la solicitud;
28. “todos” no amplía el universo por inferencia;
29. filtros efectivos se preservan;
30. agregado no amplía scope;
31. UX-013 conserva ownership de empresa/sede/centro;
32. formato no cambia autoridad;
33. solo se muestran formatos soportados reales;
34. cambiar formato no amplía datos;
35. export y recuperación posterior permanecen diferenciados;
36. export y print permanecen diferenciados;
37. export y share permanecen diferenciados;
38. signed URL no es autoridad;
39. destinatario/destino no se infiere;
40. revisión previa presenta las dimensiones materiales;
41. server-side revalida actor y permisos exactos;
42. botón visible no autoriza;
43. rol/ownership/publicador no autorizan;
44. fallback legacy está prohibido;
45. aliases de exportación están prohibidos;
46. el AS-IS físico no se presenta como implementación;
47. shared-device guard se conserva;
48. reautenticación no crea permiso;
49. simulación no exporta datos reales;
50. solicitud conserva request ID cuando es retryable;
51. request e instancia permanecen distintos;
52. intento de entrega no es nueva autorización;
53. retry conserva una sola salida lógica;
54. resultado desconocido no produce retry ciego;
55. cambios materiales reevalúan autorización;
56. versión stale produce review again;
57. scope stale produce review again;
58. field projection stale produce review again;
59. exportar no crea oficialidad;
60. periodos open/locked/closed se etiquetan correctamente;
61. reporte closed final exige close version;
62. instancia histórica no muta con vista viva;
63. export no es fuente económica;
64. export no es filing fiscal;
65. formato no crea estado contable oficial;
66. export no aprueba ni rechaza;
67. export no registra, actualiza, cancela ni concilia;
68. export no gobierna escenarios;
69. estados UX no se confunden con `VPROC-0061`;
70. deny, stale, failed y result unknown permanecen distintos;
71. errores públicos minimizan información;
72. receipt es minimizado y correlacionable;
73. evidencia de auditoría es reconstruible;
74. recuperación consulta estado antes de reintentar;
75. persistencia no se asume;
76. arquitectura sync/async no se fuerza;
77. accesibilidad conserva contexto y errores;
78. responsive preserva contexto antes de acción;
79. jerarquía indicador/detalle no amplía exportación;
80. todo hallazgo diferido tiene owner y salida;
81. no se crean ni modifican requisitos de prueba;
82. no se realizan cambios físicos;
83. UX-013 recibe el ownership de filtros territoriales/económicos detallados.

---

#### 88. Límites

Esta tarea no:

- materializa el permiso `numera.analytics.financial_reports.export`;
- concede grants;
- crea mecanismos de recuperación de artefactos;
- crea generadores CSV/XLSX/PDF/JSON;
- obliga a soportar un formato concreto;
- crea Storage;
- fija TTL o retención de archivos;
- crea jobs, colas o workers;
- define recuperación posterior de artefactos persistidos;
- define impresión;
- define compartición interna o externa;
- define catálogos de finalidad;
- diseña los filtros detallados de UX-013;
- cambia `VPROC-0061`;
- publica reportes reales;
- cierra o reabre periodos;
- modifica hechos económicos;
- altera fuentes propietarias;
- crea estados contables o fiscales oficiales;
- modifica RLS, RPC, Server Actions o APIs;
- modifica Supabase;
- crea migraciones;
- actualiza Registro 04A;
- desarrolla `NUMERA-UX-013`.

---

#### 89. Handoff a NUMERA-UX-013

La siguiente tarea recibe:

```text
NUMERA_EXPORT_FLOW_CONTRACT = NUMERA-INDEPENDENT-EXPORT-FLOW-001
EXPORT_SCREEN_ID = VSCREEN-0106
EXPORT_PROCESS_ID = VPROC-0061
EXPORT_STEP_ID = VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT
EXPORT_PERMISSION = numera.analytics.financial_reports.export
VIEW_PERMISSION = numera.analytics.financial_reports.view
EXPORT_PERMISSION_IDENTITY_COUNT = 1
VIEW_IMPLIES_EXPORT = NO
EXPORT_IMPLIES_VIEW = NO
PUBLISH_IMPLIES_EXPORT = NO
CLOSE_IMPLIES_EXPORT = NO
REOPEN_IMPLIES_EXPORT = NO
PURPOSE_REQUIRED = YES
EXPORT_SCOPE_MUST_NOT_EXCEED_AUTHORIZED_READ_SCOPE = YES
EXPORT_PERMISSION_IMPLIES_ALL_FIELDS = NO
FIELD_PROJECTION_REQUIRED = YES
POPULATION_IS_AUTHORIZATION_INPUT = YES
FILTERS_ARE_EXPORT_IDENTITY_INPUT = YES
DIMENSIONS_ARE_EXPORT_IDENTITY_INPUT = YES
FILE_FORMAT_IS_AUTHORITY = NO
SUPPORTED_EXPORT_FORMATS = RUNTIME_DECLARED_SET
EXPORT_IS_DOWNLOAD_EXISTING_ARTIFACT = NO
EXPORT_IS_PRINT = NO
EXPORT_IS_SHARE = NO
SIGNED_URL_IS_AUTHORITY = NO
REQUEST_ID_REQUIRED_FOR_RETRYABLE_EXPORT = YES
STALE_REPORT_VERSION = DENY_AND_REVIEW_AGAIN
STALE_SCOPE_DECISION = DENY_AND_REVIEW_AGAIN
STALE_FIELD_PROJECTION = DENY_AND_REVIEW_AGAIN
SIMULATED_AUTHORITY_CAN_EXPORT_REAL_DATA = NO
EXPORT_IS_ECONOMIC_SOURCE = NO
NUMERA_EXPORT_IS_TAX_FILING = NO
UX_013_OWNER = COMPANY_SITE_COST_CENTER_FILTERING
TREQ_CHANGES = 0
```

`NUMERA-UX-013` deberá diseñar filtros por empresa, sede y centro de costo manteniendo `SELECTED_SCOPE != AUTHORIZED_SCOPE`, sin ampliar la población exportable ni la lectura efectiva por la mera selección de filtros.

---

#### 90. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-011
-> NUMERA-UX-012
-> NUMERA-UX-013
```

UX-012 consume la separación cierre/exportación de UX-011 y entrega a UX-013 un contrato explícito donde filtros y scope son entradas de autorización, no permisos por selección.

---

#### 91. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-011 — Diseñar flujo de cierre`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-012 — Diseñar exportación con permiso independiente`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo`
### ✅ NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-012 — Diseñar exportación con permiso independiente
**Tarea siguiente:** NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO
**Tipo de tarea:** diseño documental del contrato UX de filtrado financiero y analítico por empresa, sede y centro de costo, preservando identidades canónicas, relaciones organizacionales, alcance efectivo, miembros autorizados, agregados, estado aplicado, reproducibilidad, exportación, accesibilidad, estados stale y revalidación server-side sin convertir selección, contexto, URL o filtro en autoridad; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea componentes, pantallas, rutas, endpoints, permisos, grants, RLS, tablas, RPC, Server Actions, APIs, catálogos, centros de costo, relaciones organizacionales, migraciones, Supabase, consultas runtime, exportaciones reales ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar una experiencia única y verificable para filtrar información financiera y analítica de NUMERA por empresa, sede y centro de costo sin permitir que una selección visual amplíe el territorio, los miembros, los campos, la población o la autoridad efectiva del actor.

El contrato debe permitir que un usuario autorizado reduzca y comprenda el universo consultado, conserve filtros reproducibles y use el mismo contexto en lectura, análisis y exportación cuando corresponda, manteniendo siempre:

```text
SELECTED_SCOPE != AUTHORIZED_SCOPE
FILTERED_VIEW <= AUTHORIZED_SCOPE
```

La selección es una intención de consulta dentro de autoridad ya resuelta; nunca una fuente de autoridad.

---

#### 2. Naturaleza y topología

La tarea se resuelve como:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- define una sola vez el contrato UX de filtrado;
- no crea instancia física propia;
- no materializa `NUMERA-AUTH-008`;
- no publica permisos ni scope runtime;
- no modifica catálogos organizacionales;
- no modifica Supabase;
- no crea una pantalla nueva;
- no modifica procesos ni estados empresariales.

---

#### 3. Handoff recibido de NUMERA-UX-012

Se consume íntegramente:

```text
NUMERA_EXPORT_FLOW_CONTRACT = NUMERA-INDEPENDENT-EXPORT-FLOW-001
EXPORT_SCREEN_ID = VSCREEN-0106
EXPORT_PROCESS_ID = VPROC-0061
EXPORT_STEP_ID = VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT
EXPORT_PERMISSION = numera.analytics.financial_reports.export
VIEW_PERMISSION = numera.analytics.financial_reports.view
EXPORT_PERMISSION_IDENTITY_COUNT = 1
VIEW_IMPLIES_EXPORT = NO
EXPORT_IMPLIES_VIEW = NO
PUBLISH_IMPLIES_EXPORT = NO
CLOSE_IMPLIES_EXPORT = NO
REOPEN_IMPLIES_EXPORT = NO
PURPOSE_REQUIRED = YES
EXPORT_SCOPE_MUST_NOT_EXCEED_AUTHORIZED_READ_SCOPE = YES
EXPORT_PERMISSION_IMPLIES_ALL_FIELDS = NO
FIELD_PROJECTION_REQUIRED = YES
POPULATION_IS_AUTHORIZATION_INPUT = YES
FILTERS_ARE_EXPORT_IDENTITY_INPUT = YES
DIMENSIONS_ARE_EXPORT_IDENTITY_INPUT = YES
FILE_FORMAT_IS_AUTHORITY = NO
SUPPORTED_EXPORT_FORMATS = RUNTIME_DECLARED_SET
EXPORT_IS_DOWNLOAD_EXISTING_ARTIFACT = NO
EXPORT_IS_PRINT = NO
EXPORT_IS_SHARE = NO
SIGNED_URL_IS_AUTHORITY = NO
REQUEST_ID_REQUIRED_FOR_RETRYABLE_EXPORT = YES
STALE_REPORT_VERSION = DENY_AND_REVIEW_AGAIN
STALE_SCOPE_DECISION = DENY_AND_REVIEW_AGAIN
STALE_FIELD_PROJECTION = DENY_AND_REVIEW_AGAIN
SIMULATED_AUTHORITY_CAN_EXPORT_REAL_DATA = NO
EXPORT_IS_ECONOMIC_SOURCE = NO
NUMERA_EXPORT_IS_TAX_FILING = NO
UX_013_OWNER = COMPANY_SITE_COST_CENTER_FILTERING
TREQ_CHANGES = 0
```

UX-013 desarrolla exclusivamente el ownership `COMPANY_SITE_COST_CENTER_FILTERING`.

---

#### 4. Contratos canónicos consumidos

La tarea consume sin redefinir:

- `NUMERA-FINANCIAL-SCOPE-CONTRACT-001` de `NUMERA-AUTH-008`;
- `NUMERA-INDEPENDENT-EXPORT-FLOW-001` de `NUMERA-UX-012`;
- el catálogo canónico compartido de centros de costo definido por `NUMERA-DOM-006`;
- las dimensiones económicas y organizacionales de `NUMERA-DOM-001` a `NUMERA-DOM-008` que correspondan al recurso consultado;
- `VSCREEN-0106` — Reportes y exportaciones financieras;
- `VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT` cuando el filtro se consume en la superficie de reportes/exportación;
- los contratos transversales de autorización, recurso, territorio, contexto, denegación, frescura y evidencia vigentes.

---

#### 5. Contrato UX resultante

Se define:

```text
NUMERA-COMPANY-SITE-COST-CENTER-FILTER-001
```

Este contrato gobierna la interacción, representación, aplicación, limpieza, persistencia contextual y revalidación de filtros de empresa, sede y centro de costo en superficies NUMERA que consuman esas dimensiones.

No crea un permiso, perfil de scope, catálogo ni relación organizacional nuevos.

---

#### 6. Superficie primaria

La superficie primaria concreta heredada de UX-012 es:

```text
SCREEN_ID = VSCREEN-0106
SCREEN_NAME = Reportes y exportaciones financieras
OWNER = numera
PROCESS_ID = VPROC-0061
STEP_ID = VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT
```

El contrato de filtros puede ser reutilizado por otras superficies NUMERA que ya posean autoridad y dimensiones compatibles, pero UX-013 no crea ni reasigna `VSCREEN-*`, `VPROC-*` ni steps.

---

#### 7. Invariante principal

Se congela:

```text
FILTER_SELECTION_IS_AUTHORITY = NO
SELECTED_SCOPE != AUTHORIZED_SCOPE
FILTERED_VIEW <= AUTHORIZED_SCOPE
```

Y específicamente:

```text
SELECTED_COMPANY != AUTHORIZED_COMPANY_SET
SELECTED_SITE != AUTHORIZED_SITE_SET
SELECTED_COST_CENTER != AUTHORIZED_COST_CENTER_SET
```

Elegir una identidad solo reduce o expresa una consulta dentro del conjunto permitido.

---

#### 8. Scope restringe y el filtro restringe nuevamente

La relación válida es:

```text
EFFECTIVE_SCOPE
INTERSECT REQUESTED_FILTERS
= EFFECTIVE_FILTERED_SCOPE
```

Con la condición:

```text
EFFECTIVE_FILTERED_SCOPE <= EFFECTIVE_SCOPE
```

Si la intersección no es válida, el resultado es denegación, estado vacío gobernado o revisión de contexto según la causa; nunca ampliación automática.

---

#### 9. Dimensiones permanecen distintas

Se preservan las separaciones canónicas:

```text
LEGAL_ENTITY != BRAND
LEGAL_ENTITY != SITE
SITE != COST_CENTER
BRAND != COST_CENTER
PHYSICAL_INSTALLATION != COST_CENTER
```

Además:

```text
COMPANY_FILTER != SITE_FILTER
SITE_FILTER != COST_CENTER_FILTER
COMPANY_FILTER != COST_CENTER_FILTER
```

La UI puede relacionar opciones únicamente desde relaciones canónicas explícitas; no colapsa identidades para simplificar la pantalla.

---

#### 10. Significado de «empresa» en la UI

El label empresarial «empresa» representa únicamente la identidad canónica empresarial que el recurso o consulta declare para esa dimensión.

UX-013 no decide que «empresa» sea siempre:

- entidad legal;
- marca;
- unidad de negocio;
- emisor fiscal;
- titular de cuenta;
- agrupación de sedes.

Cuando el contrato del recurso distinga esas identidades, la UI conserva la distinción y no sustituye una por otra.

---

#### 11. Sede

La sede es una dimensión territorial solo cuando el recurso y el contrato de scope la declaran.

Se congela:

```text
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORIZED_SCOPE = NO
KNOWN_SITE_ID_IS_AUTHORITY = NO
```

La sede seleccionada debe pertenecer al conjunto efectivo autorizado y aplicable al recurso actual.

---

#### 12. Centro de costo

El centro de costo se resuelve contra el catálogo canónico compartido gobernado funcionalmente por NUMERA.

Se congela:

```text
COST_CENTER_FILTER_VALUE = CANONICAL_COST_CENTER_IDENTITY
FREE_TEXT_COST_CENTER_IS_IDENTITY = NO
COST_CENTER_IS_SITE = NO
```

El filtro no crea centros, aliases ni copias locales autoritativas.

---

#### 13. Centro de costo sin sede

Un centro de costo puede ser válido sin una relación de sede material cuando el contrato canónico lo permita.

Por tanto:

```text
COST_CENTER_WITHOUT_SITE != INVALID_BY_DEFAULT
```

Si el centro se autoriza por identidad exacta o ámbito organizacional explícito, la UI no inventa una sede para hacerlo seleccionable.

---

#### 14. Relación sede-centro

UX-013 no impone una cardinalidad uno-a-uno.

Se conserva:

```text
SITE_TO_COST_CENTER_CARDINALITY = CANONICAL_RELATIONSHIP
```

Una sede puede relacionarse con cero, uno o varios centros y un centro puede poseer relaciones distintas según el modelo vigente.

Las opciones se derivan de relaciones canónicas vigentes, nunca de coincidencia nominal.

---

#### 15. Conjunto de filtros gobernados

El contrato contiene exactamente tres familias de selección:

```text
FILTER_DIMENSION_COUNT = 3
FILTER_1 = COMPANY
FILTER_2 = SITE
FILTER_3 = COST_CENTER
```

UX-013 no absorbe periodo, canal, producto, cliente, proveedor, moneda, estado, actor ni otras dimensiones como nuevos filtros propietarios.

Esas dimensiones continúan bajo sus contratos correspondientes.

---

#### 16. Estado lógico del filtro

Se distinguen:

```text
AVAILABLE_FILTER_OPTIONS
DRAFT_FILTER_SELECTION
APPLIED_FILTER_SELECTION
EFFECTIVE_FILTERED_SCOPE
```

Y:

```text
DRAFT_FILTER_SELECTION != APPLIED_FILTER_SELECTION
```

La edición visual de una selección no cambia los datos mostrados hasta aplicar el estado conforme al patrón de la superficie consumidora.

---

#### 17. Shape lógico de selección

El estado lógico deberá poder conservar, cuando aplique:

```text
company_ids
site_ids
cost_center_ids
selection_mode
scope_context_version
resource_or_query_identity
report_version_when_applicable
as_of_when_applicable
```

La tarea no fija almacenamiento físico, serialización ni API.

---

#### 18. Identificadores, no labels, forman la identidad

Se congela:

```text
VISIBLE_LABEL != CANONICAL_IDENTITY
```

Los nombres visibles pueden cambiar sin cambiar la identidad seleccionada.

La selección reproducible se basa en identificadores canónicos y contexto/versionado aplicable, no en texto mostrado al usuario.

---

#### 19. Opciones visibles

El selector solo puede presentar identidades que sean simultáneamente:

```text
KNOWN_CANONICAL_IDENTITY
AND ELIGIBLE_FOR_RESOURCE
AND WITHIN_EFFECTIVE_SCOPE
AND SAFE_TO_DISCLOSE
```

Una identidad fuera de autoridad no aparece como opción bloqueada con nombre visible si eso revelaría metadata protegida.

---

#### 20. Opción «Todo lo autorizado»

Cuando la superficie permita consultar múltiples miembros autorizados, la UI puede representar:

```text
ALL_AUTHORIZED
```

Su semántica es exclusivamente:

```text
ALL_AUTHORIZED = CURRENT_EFFECTIVE_AUTHORIZED_MEMBER_SET
```

Nunca:

```text
ALL_AUTHORIZED = ALL_ORGANIZATION
ALL_AUTHORIZED = WILDCARD
ALL_AUTHORIZED = BYPASS
```

El label visible deberá comunicar el límite autorizado y no inducir a pensar que cubre toda la organización.

---

#### 21. Estado inicial

El filtro inicial se deriva de la intersección entre:

- autoridad efectiva;
- recurso o consulta actual;
- contexto de navegación válido;
- selección reproducible explícita cuando exista;
- restricciones del periodo o versión aplicables.

No se usa como fallback autoritativo:

- última sede usada;
- sede primaria;
- centro anterior;
- rol;
- empresa inferida;
- valor almacenado en cliente sin revalidación.

---

#### 22. Contexto de navegación

Un handoff desde otra superficie puede transportar:

```text
company_context
site_context
cost_center_context
```

pero:

```text
CONTEXT_HANDOFF_IS_AUTHORITY_HANDOFF = NO
```

Cada valor se revalida antes de convertirse en filtro aplicado.

---

#### 23. Dependencia entre selectores

La UI puede reducir opciones descendentes cuando existe relación canónica verificable.

Ejemplo lógico:

```text
COMPANY_SELECTION
-> ELIGIBLE_SITE_OPTIONS
-> ELIGIBLE_COST_CENTER_OPTIONS
```

pero esta dependencia es de elegibilidad y navegación, no una regla universal de jerarquía empresarial.

---

#### 24. Cambio de empresa

Al cambiar empresa, la UI debe revisar las selecciones de sede y centro de costo.

Una selección descendente que deja de ser compatible pasa a estado inválido o se elimina explícitamente del borrador antes de aplicar.

Queda prohibido sustituirla silenciosamente por otra identidad «parecida».

---

#### 25. Cambio de sede

Al cambiar sede:

- se recalculan opciones compatibles de centro de costo;
- un centro todavía válido por ámbito organizacional puede conservarse si el contrato lo permite;
- un centro incompatible se retira del borrador o exige revisión;
- seleccionar sede no crea autoridad sobre todos sus centros.

Se conserva:

```text
SELECTED_SITE_CREATES_NEW_AUTHORITY = NO
```

---

#### 26. Cambio de centro de costo

Seleccionar un centro de costo:

- restringe la consulta al miembro autorizado correspondiente;
- no cambia empresa o sede por inferencia;
- no crea relación territorial;
- no concede acceso a recursos relacionados;
- no habilita mutaciones sobre el catálogo.

---

#### 27. Selección múltiple

Cuando el consumidor materialice selección múltiple, el resultado autorizado es la unión de miembros seleccionados que ya pertenecen al scope efectivo.

```text
SELECTED_MEMBER_UNION <= AUTHORIZED_MEMBER_SET
```

Si uno de los miembros deja de estar autorizado, no se conserva ocultamente dentro de la consulta.

---

#### 28. Agregados

Todo agregado filtrado debe cumplir:

```text
AGGREGATE_MEMBER_SET <= AUTHORIZED_MEMBER_SET
```

La suma, promedio, margen, costo, rentabilidad, equilibrio u otro cálculo no puede incluir miembros ocultos y después presentar solo un label autorizado.

---

#### 29. Proyección parcial

Una proyección parcial solo se ofrece cuando el recurso puede separar miembros sin falsear su significado empresarial.

Si un resultado requiere miembros no autorizados para conservar validez semántica:

```text
PARTIAL_PROJECTION_UNSAFE
-> NOT_AVAILABLE_OR_DENY
```

No se calcula una cifra engañosa para evitar mostrar la denegación.

---

#### 30. Conteos y badges

Los conteos de opciones, resultados, sedes o centros se calculan únicamente sobre el universo visible autorizado.

Se congela:

```text
UNAUTHORIZED_MEMBER_COUNT_DISCLOSURE = FORBIDDEN
```

La UI no revela que existen miembros ocultos mediante diferencias de conteo, placeholders o mensajes.

---

#### 31. Búsqueda dentro de selectores

La búsqueda de empresa, sede o centro de costo opera solo sobre el conjunto autorizado y seguro de divulgar.

Una búsqueda sin coincidencias no distingue entre:

- inexistencia global;
- existencia fuera de autoridad.

El mensaje público permanece minimizado.

---

#### 32. Catálogo vigente e historia

Un centro o dimensión actualmente inactiva puede seguir siendo necesaria para una consulta histórica si era válida para el periodo o snapshot consultado.

Por tanto:

```text
CURRENTLY_INACTIVE != HISTORICALLY_INVALID
```

La UI puede mostrar una identidad histórica autorizada con estado visible de inactividad cuando sea necesaria para reproducir el resultado.

---

#### 33. Datos demo o de prueba

Identidades demo, APP-REVIEW o equivalentes no participan en información financiera real por el solo hecho de existir o estar activas técnicamente.

Se congela:

```text
DEMO_IDENTITY_ELIGIBLE_FOR_REAL_FINANCIAL_FILTER = NO
```

Las superficies de prueba conservan sus propios contextos sin mezclarse con resultados reales.

---

#### 34. Estado aplicado visible

La superficie debe permitir reconocer sin ambigüedad qué filtros están aplicados.

Como mínimo debe ser posible identificar:

- empresa seleccionada o límite equivalente;
- sede seleccionada o límite equivalente;
- centro de costo seleccionado o límite equivalente;
- si se está usando todo el conjunto autorizado;
- si una selección está stale o requiere revisión.

---

#### 35. Resumen compacto

Cuando el espacio sea limitado, la UI puede representar filtros aplicados mediante resumen o chips, siempre que la expansión permita recuperar las identidades efectivas sin ocultar el scope aplicado.

Un resumen como «3 filtros» no sustituye permanentemente la posibilidad de inspeccionar cuáles son.

---

#### 36. Aplicar filtros

La acción de aplicar verifica el borrador contra el contexto vigente antes de convertirlo en selección efectiva.

Flujo lógico:

```text
EDIT_FILTERS
-> REVIEW_LOCAL_VALIDITY
-> SERVER_SIDE_SCOPE_REVALIDATION
-> APPLY_OR_DENY
-> REFRESH_RESULT
```

La UI no considera autoritativo un resultado puramente cliente.

---

#### 37. Restablecer filtros

Restablecer filtros significa volver al baseline permitido de la superficie actual.

No significa:

```text
RESET = GLOBAL_SCOPE
RESET = REMOVE_AUTHORIZATION_LIMITS
RESET = ALL_COMPANIES
RESET = ALL_SITES
RESET = ALL_COST_CENTERS
```

El baseline puede ser `ALL_AUTHORIZED` o un contexto más restringido definido por el recurso actual.

---

#### 38. Limpiar una dimensión

Limpiar empresa, sede o centro de costo no debe ampliar la consulta más allá del baseline autorizado.

Si una dimensión es obligatoria para resolver el recurso, limpiar produce selección incompleta y bloquea aplicar hasta resolverla.

---

#### 39. URL y query parameters

Los parámetros de URL o query pueden representar intención reproducible de filtros, pero:

```text
URL_FILTER != AUTHORITY
KNOWN_ID_IN_URL != AUTHORITY
```

Todo identificador recibido por URL se normaliza, resuelve y revalida server-side.

---

#### 40. Parámetro desconocido o inválido

Ante un identificador inexistente, malformado, incompatible o no autorizado:

```text
INVALID_FILTER
-> NO_FALLBACK_TO_BROADER_SCOPE
```

La UI presenta un estado seguro y permite revisar filtros autorizados sin revelar detalles del miembro rechazado.

---

#### 41. Persistencia de preferencia

Una implementación futura puede recordar preferencias de filtros para comodidad.

Se congela:

```text
SAVED_FILTER_PREFERENCE != AUTHORIZATION_CACHE
```

Una preferencia persistida siempre se revalida al volver a usarse.

---

#### 42. Cache de opciones

Una cache de empresas, sedes o centros es solo optimización.

Debe invalidarse o revalidarse cuando cambien materialmente:

- permisos;
- asignaciones;
- relaciones organizacionales;
- vigencia de centros;
- recurso o consulta;
- actor efectivo;
- denegaciones.

La cache nunca decide autoridad.

---

#### 43. Scope stale

Se conserva:

```text
STALE_SCOPE_DECISION = DENY_AND_REEVALUATE
```

Si cambia autoridad o relación organizacional después de aplicar filtros, la UI no mantiene el resultado anterior como si siguiera autorizado.

---

#### 44. Selección stale

Se define:

```text
STALE_FILTER_SELECTION != VALID_CURRENT_SELECTION
```

Ante stale:

- se detiene cualquier nuevo efecto que dependa del filtro vencido;
- se refrescan opciones autorizadas;
- se conserva el borrador solo cuando hacerlo no revela información;
- el usuario revisa el contexto actualizado antes de continuar.

---

#### 45. Cambio de actor efectivo

Cuando cambie `effective_actor`, toda selección dependiente de autoridad debe revalidarse.

Se congela:

```text
ACTOR_CHANGE_INVALIDATES_SCOPE_DECISION = YES
```

No se heredan filtros autorizados del actor anterior como autoridad del actor nuevo.

---

#### 46. Cambio de permiso

Una concesión revocada o una denegación nueva invalida la selección dependiente aunque el recurso permanezca visible en cache.

```text
PERMISSION_CHANGE
-> REEVALUATE_SCOPE
-> REEVALUATE_FILTERS
```

---

#### 47. Cambio de relaciones organizacionales

Una modificación en relaciones empresa-sede-centro puede convertir una selección en stale.

La UI debe revaluar el conjunto aplicado y no reinterpretar silenciosamente un mismo ID bajo una relación nueva para un resultado histórico ya fijado.

---

#### 48. Filtros y periodo

UX-013 no diseña el selector de periodo, pero reconoce que la elegibilidad histórica de empresa, sede o centro puede depender del periodo o corte del recurso.

Se conserva:

```text
FILTER_DIMENSIONS + PERIOD_CONTEXT = REPRODUCIBILITY_INPUT_WHEN_APPLICABLE
```

Periodo no sustituye scope y scope no sustituye periodo.

---

#### 49. Filtros y versión

Cuando el recurso sea versionado, cambiar filtros no autoriza cambiar silenciosamente la versión.

```text
FILTER_CHANGE != VERSION_UPGRADE
```

La identidad de versión permanece explícita conforme al contrato propietario.

---

#### 50. Filtros y lectura financiera

Para `numera.analytics.financial_reports.view`, la consulta filtrada debe resolver:

```text
EXACT_READ_PERMISSION
RESOURCE_OR_QUERY_IDENTITY
AUTHORIZED_MEMBER_SET
REQUESTED_FILTERS
NO_EFFECTIVE_DENY
```

Los filtros nunca sustituyen el permiso exacto de lectura.

---

#### 51. Filtros y centro de costo visible

`numera.finance.cost_centers.view` autoriza consulta del recurso exacto conforme al `COST_CENTER_SCOPE` aplicable.

La presencia de un centro en un filtro de otra superficie no concede automáticamente la capacidad de abrir, administrar o modificar su ficha.

---

#### 52. Filtros y exportación

Se conserva el handoff de UX-012:

```text
FILTERS_ARE_EXPORT_IDENTITY_INPUT = YES
EXPORT_SCOPE <= AUTHORIZED_REPORT_SCOPE
```

La exportación usa exactamente los filtros revisados y autorizados para la solicitud.

---

#### 53. Cambio de filtros después de revisar exportación

Si cambia empresa, sede o centro después de la revisión de exportación:

```text
FILTER_CHANGE_AFTER_EXPORT_REVIEW
-> INVALIDATE_EXPORT_REVIEW
-> REVIEW_AGAIN
```

La autorización anterior no se reutiliza para una población diferente.

---

#### 54. Exportación global autorizada

Un reporte global visible bajo autoridad vigente no elimina la reevaluación de exportación.

Se conserva:

```text
GLOBAL_REPORT_VIEW != UNBOUNDED_EXPORT
```

Cada miembro de empresa, sede o centro incluido en la salida debe permanecer dentro del scope vigente y de la finalidad autorizada.

---

#### 55. Campos y filtros son controles distintos

Se congela:

```text
VALID_FILTER_SCOPE != FIELD_AUTHORIZATION
```

Seleccionar una empresa, sede o centro válido no habilita columnas, métricas o detalles sensibles adicionales.

La proyección de campos mantiene su autorización independiente.

---

#### 56. Estado y filtros son controles distintos

Se congela:

```text
VALID_FILTER_SCOPE + INVALID_RESOURCE_STATE = DENY_OR_NOT_AVAILABLE
```

Un filtro válido no permite saltar restricciones de estado, cierre, conciliación, aprobación o lifecycle del recurso.

---

#### 57. Segregación y filtros son controles distintos

Se congela:

```text
VALID_FILTER_SCOPE != SEGREGATION_BYPASS
```

Filtrar a un recurso visible no concede registrar, aprobar, cerrar, reabrir, exportar o ejecutar otra capacidad sin su autoridad exacta.

---

#### 58. Simulación

Una simulación de scope o filtros puede ayudar a comprender qué se vería bajo un contexto hipotético, pero:

```text
SIMULATED_FILTER_SCOPE <= REAL_SCOPE_CEILING
SIMULATED_SCOPE_IS_REAL_DATA_AUTHORITY = NO
```

No se usa un filtro simulado para consultar o exportar datos financieros reales fuera de la autoridad efectiva.

---

#### 59. Resultado cero

Se distingue:

```text
ZERO_RESULTS != NO_AUTHORITY
ZERO_RESULTS != FILTER_ERROR
ZERO_RESULTS != DATA_UNAVAILABLE
```

La UI comunica la causa segura cuando pueda hacerlo sin revelar recursos fuera de alcance.

---

#### 60. Estado sin opciones autorizadas

Cuando el actor no tenga opciones autorizadas para una dimensión obligatoria, la UI no ofrece una selección global de emergencia.

El estado es gobernado y no se repara con:

- rol genérico;
- primera opción del catálogo;
- sede primaria;
- centro por defecto;
- «todos» sin límite.

---

#### 61. Denegación segura

Una denegación no debe exponer:

- nombres de empresas fuera de alcance;
- sedes ocultas;
- centros ajenos;
- conteos de miembros no autorizados;
- valores financieros asociados;
- relaciones internas no visibles.

La UI explica que la selección no está disponible sin enumerar la razón sensible.

---

#### 62. Error técnico

Se distingue:

```text
DENIED != TECHNICAL_FAILURE
STALE != TECHNICAL_FAILURE
INVALID_FILTER != TECHNICAL_FAILURE
```

Un fallo técnico no se convierte en `ALLOW` ni amplía el baseline para «seguir funcionando».

---

#### 63. Reintento

Un reintento de carga reutiliza la intención de filtro solo después de revalidar el contexto actual.

No se usa una respuesta cacheada como prueba de que la selección sigue autorizada.

---

#### 64. Reproducibilidad

Un resultado que deba ser reproducible conserva, cuando aplique:

```text
RESOURCE_OR_QUERY_IDENTITY
REPORT_VERSION
AS_OF
APPLIED_COMPANY_IDS
APPLIED_SITE_IDS
APPLIED_COST_CENTER_IDS
AUTHORIZED_SCOPE_DECISION_REFERENCE_OR_VERSION
```

La tarea no obliga a persistir físicamente todos estos campos; define la información lógica necesaria para reconstruir el contexto.

---

#### 65. Evidencia de filtro aplicado

La evidencia técnica autorizada debe poder correlacionar:

- actor efectivo;
- permiso exacto;
- recurso o consulta;
- filtros solicitados;
- filtros efectivos;
- decisión de scope;
- versión/corte cuando aplique;
- resultado.

La especialización de auditoría permanece bajo sus propietarios canónicos.

---

#### 66. Interacción de escritorio

En superficies con espacio suficiente, el patrón recomendado conserva el orden:

```text
EMPRESA
-> SEDE
-> CENTRO_DE_COSTO
-> RESUMEN_DE_SELECCION
-> APLICAR
```

La jerarquía visual no implica jerarquía autoritativa universal.

---

#### 67. Interacción en superficie estrecha

En ancho reducido, los tres filtros pueden agruparse en panel, sheet o drawer siempre que:

- el estado aplicado siga visible;
- aplicar/cancelar sean distinguibles;
- el orden empresa → sede → centro se preserve como ayuda cognitiva;
- no se oculten selecciones inválidas o stale;
- cerrar el panel sin aplicar no cambie la consulta.

UX-013 no fija un componente tecnológico concreto.

---

#### 68. Accesibilidad

Los filtros deben:

- exponer labels semánticos completos;
- asociar cada opción a su dimensión;
- indicar selección y estado sin depender solo de color;
- anunciar cambios de opciones dependientes;
- asociar errores al filtro correspondiente;
- permitir inspeccionar el resumen aplicado con teclado y tecnología asistiva;
- conservar orden de foco predecible al invalidar opciones descendentes.

---

#### 69. Teclado y búsqueda

Cuando exista búsqueda en selectores:

- el foco no salta a opciones no autorizadas;
- Enter no aplica una identidad solo por coincidencia de texto;
- una opción debe quedar resuelta a identidad canónica antes de seleccionarse;
- Escape o cancelar no alteran el estado aplicado.

---

#### 70. Mensajes de estado

La experiencia debe diferenciar al menos:

```text
READY
DRAFT_CHANGED
APPLYING
APPLIED
EMPTY_AUTHORIZED_SET
ZERO_RESULTS
INVALID_SELECTION
STALE_SELECTION
DENIED
FAILED
```

Son estados UX, no estados empresariales de `VPROC-0061` ni del catálogo organizacional.

---

#### 71. Rendimiento y listas extensas

La implementación futura puede usar búsqueda, paginación o carga progresiva de opciones.

Se conserva:

```text
PAGINATION_OR_SEARCH != AUTHORIZATION_BOUNDARY
```

Cada página o búsqueda de opciones mantiene el mismo scope y las mismas reglas de divulgación.

---

#### 72. Hallazgos diferidos

| Hallazgo | Bloquea UX-013 | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `NUMERA-FINANCIAL-SCOPE-CONTRACT-001` aún requiere materialización por unidad | no | `NUMERA-AUTH-008::<implementation_unit_id>` + package aplicable | enforcement físico coincide con perfiles y miembros autorizados aprobados |
| permission keys NUMERA todavía pendientes de materialización | no | `NUMERA-AUTH-012` + package aplicable | catálogo y consumidores publican las identidades aprobadas sin fallback |
| relaciones organizacionales y vigencia deben provenir de catálogos canónicos reales | no | dominios organizacionales + `NUMERA-DOM-006` | consumidores resuelven empresa/sede/centro desde identidades y relaciones vigentes |
| componente runtime definitivo de filtros no existe por esta tarea | no | package físico de NUMERA aplicable | `VSCREEN-0106` y consumidores compatibles materializan interacción conforme al contrato aprobado |
| eventos de origen deben conservar dimensiones para análisis posterior | no | `NUMERA-UX-014` + contratos de integración aplicables | eventos consumidos preservan identidad, origen y dimensiones sin duplicar hechos |

No queda un hallazgo diferido sin owner o condición de salida.

---

#### 73. Decisiones congeladas

Se congela:

```text
NUMERA_FILTER_CONTRACT = NUMERA-COMPANY-SITE-COST-CENTER-FILTER-001
PRIMARY_FILTER_SCREEN_ID = VSCREEN-0106
FILTER_DIMENSION_COUNT = 3
FILTER_DIMENSIONS = COMPANY|SITE|COST_CENTER
FILTER_SELECTION_IS_AUTHORITY = NO
SELECTED_SCOPE_IS_AUTHORIZED_SCOPE = NO
FILTERED_VIEW_MUST_NOT_EXCEED_AUTHORIZED_SCOPE = YES
COMPANY_SITE_COST_CENTER_ARE_DISTINCT = YES
COST_CENTER_IS_SITE = NO
FILTER_VALUE_IDENTITY_SOURCE = CANONICAL_IDENTITIES
FREE_TEXT_COST_CENTER_IS_IDENTITY = NO
ALL_AUTHORIZED_IS_WILDCARD = NO
ALL_AUTHORIZED_MEANS_CURRENT_EFFECTIVE_AUTHORIZED_SET = YES
DRAFT_FILTERS_ARE_APPLIED_FILTERS = NO
URL_FILTER_IS_AUTHORITY = NO
SAVED_FILTER_PREFERENCE_IS_AUTHORIZATION_CACHE = NO
CACHE_IS_AUTHORITY = NO
SELECTED_SITE_IS_AUTHORITY = NO
PRIMARY_SITE_IS_AUTHORIZED_SCOPE = NO
KNOWN_RESOURCE_ID_IS_AUTHORITY = NO
AGGREGATE_MEMBER_SET_MUST_BE_AUTHORIZED = YES
UNAUTHORIZED_MEMBER_COUNT_DISCLOSURE = FORBIDDEN
DEMO_IDENTITY_ELIGIBLE_FOR_REAL_FINANCIAL_FILTER = NO
CURRENTLY_INACTIVE_IS_HISTORICALLY_INVALID = NO
STALE_SCOPE_DECISION = DENY_AND_REEVALUATE
ACTOR_CHANGE_INVALIDATES_SCOPE_DECISION = YES
FILTERS_ARE_EXPORT_IDENTITY_INPUT = YES
FILTER_CHANGE_AFTER_EXPORT_REVIEW_REQUIRES_REVIEW_AGAIN = YES
VALID_FILTER_SCOPE_IS_FIELD_AUTHORIZATION = NO
VALID_FILTER_SCOPE_IS_SEGREGATION_BYPASS = NO
SIMULATED_SCOPE_IS_REAL_DATA_AUTHORITY = NO
TREQ_CHANGES = 0
```

---

#### 74. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

**Justificación:** la obligación verificable de limitar lectura, análisis y exportación por empresa, sede, centro de costo, territorio, recurso y miembros autorizados ya está protegida por requisitos canónicos vigentes y por `NUMERA-FINANCIAL-SCOPE-CONTRACT-001`. UX-013 especializa únicamente la interacción del filtro, la representación de selección, la prevención de ampliación por parámetros y la recuperación ante stale sin crear una conducta ejecutable nueva.

---

#### 75. Cobertura de prueba vigente reutilizada

La tarea reutiliza sin modificar:

- `TREQ-NUMERA-001` — permisos financieros separados y trazabilidad hasta empresa, sede, centro de costo, actor y origen;
- `TREQ-NUMERA-002` — identidad estable con entidad legal, marca/unidad, sede, centro de costo, fuente, correlación y evidencia;
- `TREQ-NUMERA-004` — dimensión, centro, periodo, versión, fuente y trazabilidad analítica; su ownership vigente incluye expresamente `NUMERA-UX-013`;
- `TREQ-AUTH-013` — revalidación server-side de actor, permiso, territorio/contexto, recurso, estado y efecto;
- `TREQ-AUTH-014` — invalidación y reautorización ante cambios de contexto, territorio o decisión vigente;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas;
- `TREQ-SHELL-011` — identidad, actor efectivo, finalidad, clasificación, recurso, relación, territorio, estado, destinatario y acción exacta para consultas y exportaciones.

Esta sección es trazabilidad de cobertura vigente y no actualiza el Registro 04A.

---

#### 76. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El trabajo es documental; no se ejecutaron build, lint, tipos ni pruebas de producto. |
| LOCAL | NOT_EXECUTED | La incorporación, formateo, quality, delivery, validadores de dominio y batería global permanecen pendientes del checkout del usuario después del cierre de `NUMERA-UX-012`. |
| REMOTA | PASS | Se verificaron continuidad NUMERA, marcador propietario, topología `DEFINE_ONCE`, `NUMERA-AUTH-008`, `NUMERA-DOM-006`, contratos de alcance/recurso, `VSCREEN-0106`, Registro 04A aplicable y scripts documentales vigentes; `NUMERA-UX-012` se consume desde el archivo completo aprobado por el usuario mientras termina su publicación. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron filtros reales, consultas financieras, exportaciones, cambios de actor, invalidaciones stale ni pruebas de ambientes desplegados. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-013` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza implementación física propia. |

---

#### 77. Criterios de aceptación

La tarea queda aceptable cuando:

1. existe exactamente un contrato `NUMERA-COMPANY-SITE-COST-CENTER-FILTER-001`;
2. se consume `NUMERA-FINANCIAL-SCOPE-CONTRACT-001` sin redefinirlo;
3. `VSCREEN-0106` permanece como superficie primaria concreta heredada;
4. no se crea una pantalla, proceso, step o permiso nuevo;
5. existen exactamente tres familias de filtro: empresa, sede y centro de costo;
6. empresa, entidad legal, marca, sede y centro de costo no se colapsan por inferencia;
7. el centro de costo usa identidad canónica compartida;
8. texto libre no crea identidad de centro;
9. seleccionar empresa no crea autoridad sobre sedes o centros;
10. seleccionar sede no crea autoridad sobre todos sus centros;
11. seleccionar centro no crea empresa o sede por inferencia;
12. centros sin sede pueden resolverse por identidad o ámbito explícito cuando el contrato lo permita;
13. `SELECTED_SCOPE != AUTHORIZED_SCOPE` permanece obligatorio;
14. el scope filtrado nunca excede el scope efectivo;
15. opciones visibles se limitan al conjunto autorizado y seguro de divulgar;
16. `ALL_AUTHORIZED` significa el conjunto efectivo autorizado actual y nunca wildcard;
17. borrador y filtros aplicados permanecen separados;
18. labels visibles no sustituyen identidades canónicas;
19. dependencias entre selectores usan relaciones canónicas;
20. una selección descendente incompatible no se sustituye silenciosamente;
21. selección múltiple permanece dentro del conjunto autorizado;
22. agregados contienen únicamente miembros autorizados;
23. una proyección parcial insegura no se presenta como resultado completo;
24. conteos no revelan miembros no autorizados;
25. búsqueda de opciones no enumera identidades fuera de scope;
26. identidades históricas pueden conservarse cuando sean válidas para el periodo consultado;
27. identidades demo no entran en resultados financieros reales;
28. el estado aplicado es inspeccionable;
29. aplicar filtros revalida scope server-side;
30. restablecer filtros no produce scope global;
31. limpiar filtros no amplía autoridad;
32. query params no son autoridad;
33. un ID inválido no produce fallback a scope más amplio;
34. preferencias persistidas no funcionan como cache de autorización;
35. cache de opciones no decide autoridad;
36. scope stale produce revaluación;
37. selección stale no permanece autoritativa;
38. cambio de actor invalida la decisión dependiente;
39. cambio de permiso reevalúa scope y filtros;
40. cambio de relación organizacional reevalúa la selección;
41. periodo y scope permanecen controles distintos;
42. cambiar filtros no cambia versión silenciosamente;
43. permiso de lectura exacto sigue siendo obligatorio;
44. visibilidad de centro no concede administración del catálogo;
45. filtros forman parte de la identidad de exportación cuando aplica;
46. cambiar filtros después de revisar exportación exige nueva revisión;
47. reporte global visible no crea exportación sin límites;
48. scope válido no concede campos adicionales;
49. scope válido no evita restricciones de estado;
50. scope válido no evita segregación de funciones;
51. simulación no concede datos reales;
52. cero resultados no se confunde con ausencia de autoridad;
53. ausencia de opciones no se repara con un valor global de emergencia;
54. denegaciones no revelan metadata sensible;
55. fallo técnico no se convierte en allow;
56. reintentos revalidan contexto;
57. resultados reproducibles conservan identidades de filtros y contexto material;
58. evidencia puede correlacionar filtros solicitados y efectivos;
59. escritorio conserva orden empresa → sede → centro;
60. responsive preserva estado aplicado y separación aplicar/cancelar;
61. accesibilidad no depende solo de color y mantiene foco/labels;
62. búsqueda por teclado resuelve identidad antes de seleccionar;
63. estados UX no se confunden con estados empresariales;
64. paginación/búsqueda no se convierten en frontera de autorización;
65. todo hallazgo diferido tiene owner y condición de salida;
66. no se crean ni modifican requisitos de prueba;
67. no se realizan cambios físicos;
68. `NUMERA-UX-014` recibe dimensiones filtradas como contexto, no como fuente de hechos ni autoridad.

---

#### 78. Límites

Esta tarea no:

- materializa `NUMERA-AUTH-008`;
- cambia la topología de `NUMERA-AUTH-008`;
- crea empresas, entidades legales, marcas, sedes, áreas o centros de costo;
- modifica relaciones empresa-sede-centro;
- define códigos nuevos de centro de costo;
- crea catálogos paralelos;
- asigna permisos a roles;
- crea permission keys;
- crea grants o denies;
- define RLS;
- crea RPC o Server Actions;
- crea APIs;
- crea tablas;
- modifica datos;
- modifica Supabase;
- crea migraciones;
- crea componentes runtime;
- fija una librería de selectores;
- fija almacenamiento de preferencias;
- fija tecnología de cache;
- diseña filtros de periodo, canal, producto, cliente, proveedor o moneda;
- redefine fórmulas financieras;
- redefine `VSCREEN-0106`;
- cambia `VPROC-0061`;
- ejecuta exportaciones;
- modifica el catálogo 04A;
- consume todavía eventos de PULSO, ORIGO, FOGO o NEXO;
- desarrolla `NUMERA-UX-014`.

---

#### 79. Handoff a NUMERA-UX-014

La siguiente tarea recibe:

```text
NUMERA_FILTER_CONTRACT = NUMERA-COMPANY-SITE-COST-CENTER-FILTER-001
NUMERA_SCOPE_CONTRACT = NUMERA-FINANCIAL-SCOPE-CONTRACT-001
NUMERA_EXPORT_FLOW_CONTRACT = NUMERA-INDEPENDENT-EXPORT-FLOW-001
PRIMARY_FILTER_SCREEN_ID = VSCREEN-0106
FILTER_DIMENSIONS = COMPANY|SITE|COST_CENTER
FILTER_DIMENSION_COUNT = 3
FILTER_SELECTION_IS_AUTHORITY = NO
SELECTED_SCOPE_IS_AUTHORIZED_SCOPE = NO
FILTERED_VIEW_MUST_NOT_EXCEED_AUTHORIZED_SCOPE = YES
COMPANY_SITE_COST_CENTER_ARE_DISTINCT = YES
FILTER_VALUE_IDENTITY_SOURCE = CANONICAL_IDENTITIES
COST_CENTER_IDENTITY_OWNER = NUMERA_DOM_006
ALL_AUTHORIZED_MEANS_CURRENT_EFFECTIVE_AUTHORIZED_SET = YES
ALL_AUTHORIZED_IS_WILDCARD = NO
AGGREGATE_MEMBER_SET_MUST_BE_AUTHORIZED = YES
FILTERS_ARE_EXPORT_IDENTITY_INPUT = YES
FILTER_CHANGE_AFTER_EXPORT_REVIEW_REQUIRES_REVIEW_AGAIN = YES
STALE_SCOPE_DECISION = DENY_AND_REEVALUATE
SERVER_SIDE_SCOPE_REVALIDATION_REQUIRED = YES
SOURCE_EVENT_DIMENSIONS_MUST_NOT_BE_RECREATED_FROM_UI_FILTERS = YES
UI_FILTER_IS_SOURCE_FACT = NO
UX_014_OWNER = SOURCE_EVENT_CONSUMPTION_PULSO_ORIGO_FOGO_NEXO
TREQ_CHANGES = 0
```

`NUMERA-UX-014` deberá consumir eventos de PULSO, ORIGO, FOGO y NEXO preservando identidades y dimensiones del hecho fuente. Los filtros de UX-013 podrán seleccionar o analizar esos hechos después de su ingestión, pero nunca deberán usarse para inventar empresa, sede, centro de costo, origen o autoridad faltantes en un evento.

---

#### 80. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-012
-> NUMERA-UX-013
-> NUMERA-UX-014
```

UX-013 consume el contrato de exportación independiente de UX-012 y entrega a UX-014 un contexto de filtro explícitamente separado de autoridad y de hechos fuente.

---

#### 81. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-012 — Diseñar exportación con permiso independiente`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO`
### ✅ NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo
**Tarea siguiente:** NUMERA-UX-015 — Evitar registro financiero duplicado
**Tipo de tarea:** diseño documental del contrato de consumo de eventos empresariales desde PULSO, ORIGO, FOGO y NEXO hacia NUMERA, preservando catálogo canónico, productora única, relaciones directas y condicionales, perfiles mínimos de proyección, envelope, idempotencia, orden, retry, auditoría, estados pendientes, errores parciales, procedencia y fronteras contra escrituras cruzadas sin materializar transporte, listeners, tablas, jobs, permisos ni Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea consumidores runtime, outbox, inbox, tablas, vistas, triggers, RPC, Server Actions, APIs, workers, colas, jobs, webhooks, RLS, permisos, migraciones, datos, conexiones Realtime, Supabase, despliegues ni escrituras en PULSO, ORIGO, FOGO o NEXO
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo NUMERA consume, interpreta y conserva hechos empresariales emitidos por PULSO, ORIGO, FOGO y NEXO sin reconstruir la fuente, duplicar el efecto económico, inferir dimensiones desde la UI ni convertir una proyección financiera en autoridad sobre el proceso operativo.

El contrato debe asegurar que cada entrada económica conserve:

- productora empresarial canónica;
- definición de evento y versión;
- identidad concreta de emisión;
- correlación y causalidad;
- orden y versión agregada cuando aplique;
- finalidad de consumo NUMERA;
- perfil mínimo de proyección;
- procedencia y frescura;
- estado de procesamiento, retry o conciliación cuando corresponda;
- vínculo con el hecho económico o diferencia que NUMERA derive bajo sus propios contratos.

La recepción de un evento nunca equivale por sí sola a reconocimiento económico.

---

#### 2. Naturaleza y topología

La tarea se resuelve como:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- define una sola vez el contrato de consumo NUMERA;
- no crea instancia física propia;
- no implementa transporte;
- no decide tecnología de mensajería;
- no modifica el catálogo `INT-APP-*`;
- no modifica productoras ni consumidoras;
- no materializa efectos económicos reales;
- no modifica Supabase ni repositorios de producto.

---

#### 3. Handoff recibido de NUMERA-UX-013

Se consume íntegramente:

```text
NUMERA_FILTER_CONTRACT = NUMERA-COMPANY-SITE-COST-CENTER-FILTER-001
NUMERA_SCOPE_CONTRACT = NUMERA-FINANCIAL-SCOPE-CONTRACT-001
NUMERA_EXPORT_FLOW_CONTRACT = NUMERA-INDEPENDENT-EXPORT-FLOW-001
PRIMARY_FILTER_SCREEN_ID = VSCREEN-0106
FILTER_DIMENSIONS = COMPANY|SITE|COST_CENTER
FILTER_DIMENSION_COUNT = 3
FILTER_SELECTION_IS_AUTHORITY = NO
SELECTED_SCOPE_IS_AUTHORIZED_SCOPE = NO
FILTERED_VIEW_MUST_NOT_EXCEED_AUTHORIZED_SCOPE = YES
COMPANY_SITE_COST_CENTER_ARE_DISTINCT = YES
FILTER_VALUE_IDENTITY_SOURCE = CANONICAL_IDENTITIES
COST_CENTER_IDENTITY_OWNER = NUMERA_DOM_006
ALL_AUTHORIZED_MEANS_CURRENT_EFFECTIVE_AUTHORIZED_SET = YES
ALL_AUTHORIZED_IS_WILDCARD = NO
AGGREGATE_MEMBER_SET_MUST_BE_AUTHORIZED = YES
FILTERS_ARE_EXPORT_IDENTITY_INPUT = YES
FILTER_CHANGE_AFTER_EXPORT_REVIEW_REQUIRES_REVIEW_AGAIN = YES
STALE_SCOPE_DECISION = DENY_AND_REEVALUATE
SERVER_SIDE_SCOPE_REVALIDATION_REQUIRED = YES
SOURCE_EVENT_DIMENSIONS_MUST_NOT_BE_RECREATED_FROM_UI_FILTERS = YES
UI_FILTER_IS_SOURCE_FACT = NO
UX_014_OWNER = SOURCE_EVENT_CONSUMPTION_PULSO_ORIGO_FOGO_NEXO
TREQ_CHANGES = 0
```

La consecuencia obligatoria es:

```text
UI_FILTER != SOURCE_EVENT
UI_FILTER != SOURCE_DIMENSION
UI_FILTER != PRODUCER_AUTHORITY
```

---

#### 4. Contratos transversales consumidos

UX-014 consume sin redefinir:

```text
ENTERPRISE-EVENT-CATALOG-001@1.0.0
ENTERPRISE-EVENT-PRODUCER-REGISTRY-001@1.0.0
ENTERPRISE-EVENT-CONSUMER-REGISTRY-001@1.0.0
ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001@1.0.0
ENTERPRISE-EVENT-RETRY-POLICY-001@1.0.0
ENTERPRISE-EVENT-COMPENSATION-POLICY-001@1.0.0
ENTERPRISE-INTEGRATION-AUDIT-POLICY-001@1.0.0
ENTERPRISE-SYNC-PENDING-STATE-MACHINE-001@1.0.0
ENTERPRISE-PARTIAL-ERROR-HANDLING-POLICY-001@1.0.0
ENTERPRISE-CROSS-APPLICATION-WRITE-POLICY-001@1.0.0
```

La fuente normativa de eventos permanece en `INT-APP-001..010`.

---

#### 5. Contrato definido por esta tarea

Se define:

```text
NUMERA-SOURCE-EVENT-CONSUMPTION-001
```

Este contrato especializa exclusivamente el consumo por NUMERA de las relaciones ya aprobadas cuyo productor es:

```text
pulso
origo
fogo
nexo
```

No agrega otra relación al registro transversal.

---

#### 6. Universo exacto cubierto

El universo de UX-014 es el subconjunto del registro de consumidoras donde:

```text
producer_application IN {pulso, origo, fogo, nexo}
AND numera IN {direct_consumers, conditional_consumers}
```

Resultado:

```text
SOURCE_APPLICATION_COUNT = 4
SOURCE_PROCESS_COUNT = 35
SOURCE_EVENT_DEFINITION_COUNT = 198
DIRECT_PROCESS_RELATION_COUNT = 34
DIRECT_EVENT_RELATION_COUNT = 192
CONDITIONAL_PROCESS_RELATION_COUNT = 1
CONDITIONAL_EVENT_RELATION_COUNT = 6
```

NUMERA posee 324 relaciones de evento en el registro transversal completo; UX-014 no absorbe las relaciones cuyo productor pertenece a otras aplicaciones.

---

#### 7. Distribución exacta por fuente

| Fuente | Procesos | Eventos | Procesos directos | Eventos directos | Procesos condicionales | Eventos condicionales |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `nexo` | 14 | 81 | 14 | 81 | 0 | 0 |
| `fogo` | 6 | 33 | 5 | 27 | 1 | 6 |
| `pulso` | 11 | 62 | 11 | 62 | 0 | 0 |
| `origo` | 4 | 22 | 4 | 22 | 0 | 0 |
| **TOTAL** | **35** | **198** | **34** | **192** | **1** | **6** |

Las cifras son relaciones contractuales de catálogo; no prueban listeners, entregas ni consumo físico actual.

---

#### 8. Matriz exacta de procesos y eventos fuente

| Fuente | Proceso | Definiciones cubiertas | Eventos | Relación NUMERA | Perfil de proyección |
| --- | --- | --- | ---: | --- | --- |
| `nexo` | `VPROC-0015` | `VPROC-0015.EVT-001..004` | 4 | `DIRECT` | `REFERENCE_PROJECTION` |
| `nexo` | `VPROC-0024` | `VPROC-0024.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0025` | `VPROC-0025.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0026` | `VPROC-0026.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0027` | `VPROC-0027.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0028` | `VPROC-0028.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0029` | `VPROC-0029.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0030` | `VPROC-0030.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0031` | `VPROC-0031.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0032` | `VPROC-0032.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0048` | `VPROC-0048.EVT-001..005` | 5 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0049` | `VPROC-0049.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0055` | `VPROC-0055.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `nexo` | `VPROC-0067` | `VPROC-0067.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `fogo` | `VPROC-0016` | `VPROC-0016.EVT-001..005` | 5 | `DIRECT` | `VERSIONED_REFERENCE_PROJECTION` |
| `fogo` | `VPROC-0033` | `VPROC-0033.EVT-001..004` | 4 | `DIRECT` | `EXECUTION_SIGNAL_PROJECTION` |
| `fogo` | `VPROC-0034` | `VPROC-0034.EVT-001..006` | 6 | `DIRECT` | `EXECUTION_SIGNAL_PROJECTION` |
| `fogo` | `VPROC-0035` | `VPROC-0035.EVT-001..006` | 6 | `CONDITIONAL` | `EXECUTION_SIGNAL_PROJECTION` |
| `fogo` | `VPROC-0036` | `VPROC-0036.EVT-001..006` | 6 | `DIRECT` | `EXECUTION_SIGNAL_PROJECTION` |
| `fogo` | `VPROC-0037` | `VPROC-0037.EVT-001..006` | 6 | `DIRECT` | `EXECUTION_SIGNAL_PROJECTION` |
| `pulso` | `VPROC-0017` | `VPROC-0017.EVT-001..004` | 4 | `DIRECT` | `VERSIONED_REFERENCE_PROJECTION` |
| `pulso` | `VPROC-0038` | `VPROC-0038.EVT-001..005` | 5 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0039` | `VPROC-0039.EVT-001..005` | 5 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0040` | `VPROC-0040.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0041` | `VPROC-0041.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0042` | `VPROC-0042.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0043` | `VPROC-0043.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0044` | `VPROC-0044.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0046` | `VPROC-0046.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0050` | `VPROC-0050.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `pulso` | `VPROC-0068` | `VPROC-0068.EVT-001..006` | 6 | `DIRECT` | `MARKETING_ANALYTICS_PROJECTION` |
| `origo` | `VPROC-0019` | `VPROC-0019.EVT-001..005` | 5 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `origo` | `VPROC-0020` | `VPROC-0020.EVT-001..005` | 5 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `origo` | `VPROC-0021` | `VPROC-0021.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |
| `origo` | `VPROC-0022` | `VPROC-0022.EVT-001..006` | 6 | `DIRECT` | `EFFECT_CONFIRMATION_PROJECTION` |

La matriz conserva exactamente las relaciones aprobadas en `ENTERPRISE-EVENT-CONSUMER-REGISTRY-001` para las cuatro productoras de esta tarea.

---

#### 9. Única relación condicional

La única relación condicional de este universo es:

```text
VPROC-0035 -> fogo -> numera
EVENTS = VPROC-0035.EVT-001..006
RELATION = CONDITIONAL
```

UX-014 no inventa la condición.

La relación solo se activa cuando el `condition_ref` canónico vigente demuestra que la variante, canal, sede, tipo de recurso, efecto o decisión explícita involucra a NUMERA.

Si la condición no puede demostrarse:

```text
CONDITIONAL_RELATION_UNRESOLVED
-> DO_NOT_CONSUME_AS_ACTIVE_RELATION
```

---

#### 10. Finalidad canónica de NUMERA

La finalidad transversal aprobada permanece:

```text
consumer_application = numera
consumer_purpose_code = FINANCIAL_RECONCILIATION_COST_ANALYSIS
```

Esto no autoriza:

- ejecutar la operación fuente;
- reconstruir el workflow operativo;
- modificar el hecho operativo;
- reconocer automáticamente ingreso, costo, obligación o saldo;
- ampliar permisos de lectura o exportación.

---

#### 11. Productora empresarial única

Se conserva:

```text
SOURCE_EVENT_OWNER = producer_application
NUMERA_IS_CONSUMER = YES
NUMERA_IS_REPUBLISHING_OWNER = NO
```

La aplicación productora confirma el hecho bajo su proceso propietario.

NUMERA puede producir después eventos de sus propios procesos económicos, pero no reemite el evento fuente cambiando la productora.

---

#### 12. Envelope mínimo heredado

Todo evento consumible conserva el contrato `EVENT-ENVELOPE-001`:

```text
event_id
event_definition_id
event_type
event_version
producer_application
aggregate_version
occurred_at
recorded_at
correlation_id
causation_id
idempotency_key
source_command_id
schema_version
```

Cuando el contrato de idempotencia u orden requiera `aggregate_id`, ese identificador se conserva conforme a `INT-APP-004`; UX-014 no altera el envelope aprobado.

---

#### 13. Precondiciones para aceptar una entrega

Antes de proyectar una entrega como entrada NUMERA deberán comprobarse, según aplique:

1. `event_definition_id` pertenece al catálogo canónico;
2. la productora coincide con `ENTERPRISE-EVENT-PRODUCER-REGISTRY-001`;
3. NUMERA aparece como consumidora directa o condicional vigente;
4. la condición contractual se cumple cuando la relación es condicional;
5. `event_version` y `schema_version` son compatibles;
6. `event_id` es resoluble y no fue reutilizado con contenido conflictivo;
7. orden y versión agregada no regresan silenciosamente;
8. el perfil mínimo de proyección corresponde al proceso;
9. la procedencia puede auditarse;
10. la entrada no depende de filtros UI para completar identidad o autoridad.

Una entrega que no satisface el contrato no se transforma por heurística en hecho económico.

---

#### 14. Filtros UX y evento fuente permanecen separados

Se congela:

```text
SOURCE_EVENT_DIMENSIONS_MUST_NOT_BE_RECREATED_FROM_UI_FILTERS = YES
UI_FILTER_IS_SOURCE_FACT = NO
SELECTED_COMPANY_IS_SOURCE_COMPANY = NO
SELECTED_SITE_IS_SOURCE_SITE = NO
SELECTED_COST_CENTER_IS_SOURCE_COST_CENTER = NO
```

Un filtro puede seleccionar eventos o proyecciones ya ingeridos. No puede completar una dimensión que el evento o sus referencias autoritativas no contienen.

---

#### 15. Dimensión ausente o ambigua

Cuando un evento requiera una dimensión económica que no puede resolverse de forma autoritativa:

```text
MISSING_OR_AMBIGUOUS_SOURCE_DIMENSION
-> KEEP_PENDING_OR_DIFFERENCE
-> RESOLVE_FROM_CANONICAL_SOURCE
```

Queda prohibido usar como fallback:

- empresa seleccionada en UI;
- sede primaria del usuario;
- centro de costo del filtro vigente;
- último contexto consultado;
- un valor global por defecto.

---

#### 16. Recibir no equivale a reconocer

La secuencia conceptual permanece:

```text
SOURCE_EVENT_CONFIRMED
-> NUMERA_CONSUMER_INGESTION
-> VALIDATE_SOURCE_AND_PROVENANCE
-> CLASSIFY_ECONOMIC_RELEVANCE
-> ECONOMIC_CANDIDATE_OR_NO_EFFECT
-> NUMERA_DOMAIN_VALIDATION
-> RECOGNIZE_OR_KEEP_PENDING
-> RECONCILE_WHEN_APPLICABLE
```

Se congela:

```text
EVENT_RECEIVED != ECONOMIC_FACT_RECOGNIZED
EVENT_ACKNOWLEDGED != ECONOMIC_FACT_POSTED
```

---

#### 17. PULSO como fuente

PULSO conserva propiedad de oferta, pedido, servicio, venta, pago asociado, caja, reclamo, reserva, entrega al cliente y hechos comerciales de sus procesos.

El subconjunto de esta tarea cubre once procesos y 62 definiciones de evento.

NUMERA consume referencias y efectos económicos conforme a `NUMERA-DOM-002`, manteniendo:

```text
SALE != PAYMENT
SALE != CASH
SALE != DELIVERY
SALE != FISCAL_DOCUMENT
SALE != ECONOMIC_FACT
```

PULSO no escribe el ledger económico de NUMERA y NUMERA no recrea la venta.

---

#### 18. ORIGO como fuente

ORIGO conserva propiedad de necesidad, proveedor, condiciones, orden, aprobación, recepción comercial y diferencias de abastecimiento.

El subconjunto de esta tarea cubre cuatro procesos y 22 definiciones de evento.

NUMERA consume compra y recepción conforme a `NUMERA-DOM-003`, preservando:

```text
PURCHASE_ORDER != COMMERCIAL_RECEIPT
COMMERCIAL_RECEIPT != INVENTORY_MOVEMENT
COMMERCIAL_RECEIPT != ECONOMIC_FACT
ECONOMIC_FACT != PAYABLE
PAYABLE != PAYMENT
```

Una orden aprobada no se convierte en obligación reconocida únicamente por haber sido emitida.

---

#### 19. FOGO como fuente

FOGO conserva propiedad de receta, planificación, ejecución productiva, calidad, empaque, genealogía, reproceso y cierre productivo.

El subconjunto cubre seis procesos y 33 definiciones, de las cuales 27 son relaciones directas hacia NUMERA y seis pertenecen a la relación condicional `VPROC-0035`.

NUMERA consume evidencia productiva conforme a `NUMERA-DOM-004` sin convertir:

```text
PLANNED_QUANTITY
=
ACTUAL_CONSUMPTION
```

ni:

```text
PRODUCTION_SIGNAL
=
FINAL_ECONOMIC_COST
```

---

#### 20. NEXO como fuente

NEXO conserva propiedad de custodia, movimientos físicos, existencias, ubicación, condición, logística, instalaciones y otras realidades operativas de su dominio.

El subconjunto de esta tarea cubre catorce procesos y 81 definiciones de evento.

NUMERA usa esas entradas como evidencia física, logística o de costo sin modificar cantidades, ubicaciones, estados de inventario o activos para hacer cuadrar una proyección económica.

---

#### 21. Dos fuentes pueden explicar un solo efecto económico

FOGO y NEXO pueden aportar evidencia distinta sobre el mismo fenómeno económico.

Ejemplo contractual:

```text
FOGO_EXECUTION
+ NEXO_PHYSICAL_MOVEMENT
-> CORRELATED_ECONOMIC_CANDIDATE
```

No:

```text
FOGO_EVENT -> ECONOMIC_FACT_A
NEXO_EVENT -> ECONOMIC_FACT_B
```

cuando ambos eventos representan evidencias complementarias del mismo efecto.

La cardinalidad económica se resuelve por los contratos de dominio y correlación; no por el número de entregas técnicas.

---

#### 22. Perfil mínimo de proyección

Cada relación consume únicamente el perfil aprobado en la matriz.

Se conservan los perfiles usados por este universo:

```text
REFERENCE_PROJECTION
VERSIONED_REFERENCE_PROJECTION
EFFECT_CONFIRMATION_PROJECTION
EXECUTION_SIGNAL_PROJECTION
MARKETING_ANALYTICS_PROJECTION
```

Un perfil mínimo no autoriza copiar el payload completo ni campos no necesarios para la finalidad financiera.

---

#### 23. Proyección consumidora no es fuente de verdad

Se congela:

```text
CONSUMER_PROJECTION != SOURCE_OF_TRUTH_STATE
```

NUMERA puede mantener una proyección propia con procedencia y frescura, pero no devolver esa proyección para sobrescribir PULSO, ORIGO, FOGO o NEXO.

---

#### 24. Identidad idempotente del consumo

El consumo hereda:

```text
CONSUMER_INBOX_KEY = consumer_application + event_id
```

Para NUMERA:

```text
consumer_application = numera
```

Cuando el consumo produzca un efecto propio idempotente:

```text
CONSUMER_EFFECT_KEY = numera + event_id + effect_code
```

La misma entrega puede repetirse; el mismo efecto no.

---

#### 25. Garantía de transporte y efecto

Se conserva:

```text
TRANSPORT_GUARANTEE = AT_LEAST_ONCE
BUSINESS_EFFECT_GUARANTEE = AT_MOST_ONCE_PER_SCOPE_WITH_RESULT_REPLAY
```

Una redelivery conserva `event_id` y no genera otra operación económica por el solo hecho de llegar nuevamente.

---

#### 26. Reutilización conflictiva

Si el mismo identificador idempotente aparece con contenido lógico materialmente distinto:

```text
CONFLICTING_REUSE
-> DO_NOT_APPLY
-> PRESERVE_EVIDENCE
-> REQUIRE_RESOLUTION
```

Nunca se acepta el último payload por conveniencia.

---

#### 27. Orden y versiones

Cuando aplique orden agregado:

```text
ORDER_KEY = aggregate_id + aggregate_version
```

Una versión inferior tardía:

```text
STALE_VERSION OR OUT_OF_ORDER_DEFERRED
```

No sobrescribe una proyección más reciente.

---

#### 28. Correlación y causalidad

`correlation_id` y `causation_id` unen la cadena de hechos y efectos, pero no son claves idempotentes universales.

NUMERA deberá conservar ambos cuando existan para reconstruir:

```text
SOURCE_EVENT
-> NUMERA_INGESTION
-> ECONOMIC_CANDIDATE
-> ECONOMIC_EFFECT
-> RECONCILIATION_OR_ADJUSTMENT
```

---

#### 29. Replay

Replay del mismo evento conserva:

- `event_id`;
- `occurred_at`;
- productora histórica;
- versión;
- audiencia histórica;
- correlación;
- procedencia.

Se congela:

```text
REPLAY_IS_NEW_SOURCE_EVENT = NO
REPLAY_CHANGES_PRODUCER = NO
```

---

#### 30. Backfill

Un backfill no concede autoridad nueva ni convierte una proyección histórica en fuente primaria.

Cada elemento deberá pasar por la misma deduplicación, compatibilidad, orden, procedencia y validación económica que una entrega ordinaria.

---

#### 31. Retry

Todo retry conserva la misma operación lógica, clave idempotente, huella, `event_id`, audiencia y finalidad.

Se prohíbe:

```text
RETRY_WITH_NEW_EVENT_ID_FOR_SAME_EVENT
RETRY_WITH_NEW_IDEMPOTENCY_KEY_FOR_SAME_EFFECT
```

Un intento técnico nuevo no constituye otra operación empresarial.

---

#### 32. Resultado desconocido

Cuando no pueda demostrarse si un efecto ocurrió:

```text
RESULT_UNKNOWN
-> QUERY_AUTHORITATIVE_RESULT OR RECONCILE
```

No:

```text
RESULT_UNKNOWN -> RETRY_BLINDLY
```

NUMERA no genera un segundo hecho económico para resolver incertidumbre del primero.

---

#### 33. Estados pendientes de sincronización

UX-014 reutiliza `ENTERPRISE-SYNC-PENDING-STATE-MACHINE-001` y no crea otra máquina.

En particular:

```text
PENDING_CONFIRMATION != SUCCESS
RESULT_UNKNOWN != FAILURE_FINAL
RECONCILIATION_REQUIRED != FAILURE_FINAL
```

La UI o la proyección no debe presentar un acuse técnico como resultado empresarial definitivo.

---

#### 34. Error parcial

Una entrega o efecto parcialmente aplicado conserva mapa de:

- efectos confirmados;
- efectos pendientes;
- efectos desconocidos;
- residuales;
- responsable;
- evidencia.

`PARTIALLY_APPLIED` no se transforma en éxito completo ni en fracaso completo por simplificación de UX.

---

#### 35. Dead-letter y cuarentena

Cuarentena y dead-letter son disposiciones operativas, no estados empresariales del hecho fuente ni del efecto económico.

Se congela:

```text
DEAD_LETTER_CANDIDATE != ECONOMIC_REJECTION
QUARANTINED != SOURCE_FACT_VOID
```

---

#### 36. Compensación

Retry agotado, timeout o fallo de una consumidora no son causas autónomas de compensación.

Solo se compensa un efecto confirmado y elegible mediante el contrato propietario correspondiente.

NUMERA no compensa editando la fuente operativa ajena.

---

#### 37. Auditoría transversal

La cadena debe permitir reconstruir:

- actor o principal técnico;
- autoridad evaluada;
- productora;
- evento;
- entrega;
- consumidora;
- efecto propio;
- retry;
- conciliación;
- corrección o compensación;
- resultado.

La auditoría es append-only y no sustituye la fuente ni el evento.

---

#### 38. Escrituras cruzadas prohibidas

UX-014 hereda:

```text
DIRECT_FOREIGN_TABLE_WRITE = FORBIDDEN
DIRECT_FOREIGN_RPC_WITHOUT_CONTRACT = FORBIDDEN
CONSUMER_PROJECTION_AS_SOURCE_WRITE = FORBIDDEN
MANUAL_SQL_CROSS_DOMAIN_REPAIR = FORBIDDEN
BATCH_OR_IMPORT_CROSS_DOMAIN_WRITE = FORBIDDEN
COMPENSATION_BY_FOREIGN_EDIT = FORBIDDEN
```

NUMERA puede escribir su propia proyección, inbox, metadata técnica y estado económico autorizado; no la fuente operativa de otra aplicación.

---

#### 39. Corrección de la fuente

Cuando una fuente operativa sea incorrecta:

```text
SOURCE_OWNER = SOURCE_CORRECTION_OWNER
```

Por tanto:

- PULSO corrige hechos comerciales;
- ORIGO corrige compra y recepción comercial;
- FOGO corrige hechos productivos;
- NEXO corrige hechos físicos, logísticos o de custodia;
- NUMERA corrige su propia representación económica.

---

#### 40. Corrección económica propia

Si la fuente es correcta y la representación económica de NUMERA es incorrecta, NUMERA puede producir una corrección, reclasificación, ajuste o reverso propio bajo el contrato aplicable.

Nunca reescribe el evento fuente para simular que el error no ocurrió.

---

#### 41. Venta, pago y caja

Un evento de PULSO puede aportar evidencia comercial, de pago o de caja, pero UX-014 conserva identidades separadas.

Un `PAYMENT_RECONCILED` no crea una segunda venta y un cierre de caja no materializa ventas ausentes.

---

#### 42. Compra, recepción e inventario

Una recepción ORIGO y un movimiento NEXO pueden pertenecer al mismo expediente económico sin ser el mismo hecho.

Se conserva:

```text
ORIGO_COMMERCIAL_ACCEPTANCE != NEXO_PHYSICAL_EFFECT
```

NUMERA correlaciona ambos cuando el contrato lo exige.

---

#### 43. Producción, consumo e inventario

Una señal FOGO y un movimiento NEXO pueden requerir conciliación antes de reconocimiento económico definitivo.

La diferencia de cantidad no se corrige copiando una cantidad entre dominios.

---

#### 44. Canales externos de PULSO

Un tercero externo no se registra como `producer_application` interno.

La secuencia válida permanece:

```text
EXTERNAL_SOURCE
-> PULSO_ADAPTER_AND_VALIDATION
-> CANONICAL_PULSO_EVENT
-> NUMERA_CONSUMPTION
```

NUMERA no recibe un webhook externo como si fuera un hecho interno ya validado.

---

#### 45. Versiones incompatibles

Si el evento o schema recibido no puede interpretarse de forma segura:

```text
CONTRACT_OR_SCHEMA_INCOMPATIBLE
-> DO_NOT_APPLY_ECONOMIC_EFFECT
-> PRESERVE_EVIDENCE
-> REQUIRE_COMPATIBILITY_OR_RESOLUTION
```

No se parsea parcialmente para fabricar un resultado aparente.

---

#### 46. Campos desconocidos

Campos adicionales compatibles pueden conservarse conforme al contrato de evolución, pero NUMERA no les asigna semántica financiera nueva por inferencia.

Campos obligatorios ausentes impiden elevar la entrega a la siguiente etapa contractual.

---

#### 47. Sensibilidad y minimización

NUMERA consume el perfil mínimo requerido por `FINANCIAL_RECONCILIATION_COST_ANALYSIS`.

La existencia de un payload más amplio no autoriza persistir o exponer todos sus campos.

La clasificación y permisos vigentes continúan aplicando a la proyección consumida.

---

#### 48. Evento consumido no concede lectura humana

Se congela:

```text
EVENT_CONSUMED_BY_NUMERA != USER_AUTHORIZED_TO_VIEW_EVENT_DATA
```

Toda lectura posterior sigue su permiso exacto, scope, sensibilidad, recurso, estado y denegaciones vigentes.

---

#### 49. Evento consumido no concede exportación

Se conserva:

```text
EVENT_CONSUMED != EXPORT_AUTHORITY
```

La exportación sigue requiriendo el contrato de UX-012 y los filtros/scope de UX-013.

---

#### 50. Procedencia visible

Las superficies NUMERA que presenten un efecto económico derivado deberán poder explicar, bajo divulgación progresiva y permisos vigentes:

- aplicación fuente;
- proceso fuente;
- momento de ocurrencia;
- referencia o correlación;
- estado de conciliación relevante;
- limitaciones o pendientes materiales.

La UX no necesita mostrar IDs técnicos completos por defecto, pero la evidencia debe ser navegable para actores autorizados.

---

#### 51. Frescura

Toda proyección consumidora deberá conservar suficiente evidencia para distinguir:

```text
CURRENT
STALE
PENDING_UPDATE
UNKNOWN_FRESHNESS
```

Estas etiquetas de presentación no crean una nueva máquina empresarial; reflejan la evidencia vigente de versión, watermarks y sincronización.

---

#### 52. Watermarks y cobertura incompleta

Cuando una fuente pueda llegar con latencia, NUMERA debe poder conocer qué versión o corte fue considerado.

La ausencia temporal de eventos dentro de una ventana legítima no se presenta automáticamente como cero, pérdida o fraude.

---

#### 53. Ausencia de evento no equivale a cero

Se corrige la brecha de experiencia identificada en auditoría:

```text
NO_CURRENT_SOURCE_EVENT != ECONOMIC_ZERO
```

Si falta evidencia del periodo o la fuente aún no está completa, la UI presenta ausencia, pendiente o cobertura incompleta según corresponda; nunca un cero económico inventado.

---

#### 54. Conteos de cobertura

Esta tarea puede definir evidencia por fila o por consulta para saber qué fuentes contribuyeron al resultado.

No diseña todavía el tablero global de cobertura y conciliación reservado a `NUMERA-UX-024`.

---

#### 55. Eventos tardíos

Un evento tardío conserva su `occurred_at`, versión, origen y correlación.

La llegada tardía no autoriza mover silenciosamente el hecho a otro periodo ni reabrir un periodo sin contrato.

---

#### 56. Eventos duplicados por distinta identidad técnica

UX-014 resuelve duplicidad exacta por `event_id` e idempotencia heredada.

La detección de dos eventos distintos que representan potencialmente el mismo hecho empresarial pertenece al siguiente contrato de duplicidad financiera.

Se congela:

```text
EXACT_EVENT_REDELIVERY_OWNER = UX_014_VIA_INT_APP_004
CROSS_EVENT_BUSINESS_DUPLICATE_OWNER = NUMERA_UX_015
```

---

#### 57. No deduplicar por similitud

Antes de UX-015 queda prohibido declarar duplicado solo por:

- mismo importe;
- misma fecha;
- mismo texto;
- mismo cliente o proveedor;
- misma sede;
- mismo centro de costo.

La similitud puede abrir revisión, no borrar o fusionar hechos.

---

#### 58. Reproducibilidad

Un resultado económico o analítico derivado deberá poder reconstruir qué conjunto de eventos, versiones y fuentes sustentó el cálculo o la clasificación material.

La reproducción no exige copiar el payload completo cuando una referencia inmutable y autorizada sea suficiente.

---

#### 59. Observabilidad mínima

La materialización futura deberá poder medir sin cambiar semántica:

- entregas recibidas;
- duplicados replayados;
- conflictos;
- eventos fuera de orden;
- incompatibilidades de contrato;
- pendientes de confirmación;
- resultados desconocidos;
- conciliaciones requeridas;
- latencia de consumo;
- frescura por fuente.

Esta tarea no fija herramienta, dashboard ni backend de observabilidad.

---

#### 60. Estado físico actual

La auditoría vigente identifica que PULSO, ORIGO, FOGO y NEXO son fuentes operativas objetivo, pero no demuestra un consumidor físico NUMERA completo para este contrato.

Por tanto:

```text
CONTRACT_DEFINED = YES
RUNTIME_CONSUMER_PROVEN = NO
```

La ausencia física no autoriza reducir el contrato documental ni afirmar implementación.

---

#### 61. Frontera con Realtime

La ausencia actual de suscripciones directas NUMERA no obliga a usar Realtime ni a publicar tablas.

La tecnología de transporte queda para arquitectura y materialización posteriores.

---

#### 62. Frontera con Supabase

UX-014 no crea:

- tablas de inbox/outbox;
- constraints;
- triggers;
- funciones;
- RLS;
- Realtime;
- Edge Functions;
- cron;
- colas.

Cualquier materialización Supabase futura deberá ocurrir desde `vento-shell` bajo su tarea física propietaria.

---

#### 63. Frontera con UX-015

UX-014 garantiza que una redelivery del mismo evento no genere otro efecto.

UX-015 deberá diseñar la prevención de registro financiero duplicado cuando:

- existan eventos distintos con correlación común;
- una fuente manual compita con una fuente canónica;
- dos dominios aporten evidencia del mismo efecto;
- un replay, importación o corrección pueda parecer una nueva operación;
- la identidad empresarial necesite comparación adicional.

---

#### 64. Frontera con conciliaciones posteriores

UX-017, UX-018 y UX-019 diseñarán experiencias específicas de conciliación de ventas/pagos, compras/recepciones e inventario/producción.

UX-014 solo garantiza que esas experiencias reciban eventos con procedencia, identidad, correlación y estado suficientemente preservados.

---

#### 65. Frontera con UX-024

UX-024 es propietaria del tablero global de cobertura y conciliación de fuentes.

UX-014 no diseña ese tablero, pero entrega las señales necesarias para que pueda distinguir:

- fuente recibida;
- fuente pendiente;
- fuente stale;
- diferencia abierta;
- resultado desconocido;
- evidencia correlacionada.

---

#### 66. Hallazgos diferidos

| Hallazgo | Bloquea UX-014 | Propietario | Condición de salida |
| --- | --- | --- | --- |
| consumidor físico NUMERA no demostrado de extremo a extremo | no bloquea definición documental; sí bloquea declarar implementación | paquete físico NUMERA e integración aplicable | listeners/proyecciones materializados con pruebas de contrato, idempotencia, orden, retry, auditoría y no escritura cruzada |
| condición materializada de `VPROC-0035 -> numera` no demostrada aquí | no bloquea el contrato; la relación permanece condicional | materialización del consumer registry | `condition_ref` vigente resoluble y probado antes de activar consumo |
| tecnología de transporte no decidida por esta tarea | no | arquitectura/materialización aplicable | transporte elegido sin cambiar productora, audiencia, envelope ni semántica |
| duplicidad empresarial entre eventos distintos | no; se entrega explícitamente | `NUMERA-UX-015` | contrato de deduplicación financiera aprobado sin borrar historia |

No se crea ninguna tarea adicional.

---

#### 67. Decisiones congeladas

```text
NUMERA_SOURCE_EVENT_CONSUMPTION_CONTRACT = NUMERA-SOURCE-EVENT-CONSUMPTION-001
SOURCE_APPLICATION_COUNT = 4
SOURCE_PROCESS_COUNT = 35
SOURCE_EVENT_DEFINITION_COUNT = 198
DIRECT_PROCESS_RELATION_COUNT = 34
DIRECT_EVENT_RELATION_COUNT = 192
CONDITIONAL_PROCESS_RELATION_COUNT = 1
CONDITIONAL_EVENT_RELATION_COUNT = 6
CONDITIONAL_PROCESS = VPROC-0035
NUMERA_CONSUMER_PURPOSE = FINANCIAL_RECONCILIATION_COST_ANALYSIS
SOURCE_EVENT_OWNER = PRODUCER_APPLICATION
EVENT_RECEIVED_IS_ECONOMIC_FACT_RECOGNIZED = NO
UI_FILTER_IS_SOURCE_FACT = NO
CONSUMER_PROJECTION_IS_SOURCE_OF_TRUTH = NO
TRANSPORT_GUARANTEE = AT_LEAST_ONCE
CONSUMER_INBOX_KEY = numera+event_id
CROSS_APPLICATION_SOURCE_WRITE = FORBIDDEN
RESULT_UNKNOWN_REQUIRES_QUERY_OR_RECONCILIATION = YES
REPLAY_CREATES_NEW_SOURCE_EVENT = NO
CROSS_EVENT_BUSINESS_DUPLICATE_OWNER = NUMERA_UX_015
TREQ_CHANGES = 0
```

---

#### 68. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

**Justificación:** la obligación verificable de reconciliar NUMERA con PULSO, ORIGO, FOGO y NEXO, conservar identidad, fuente, correlación, idempotencia, retries, auditoría, no duplicación y fronteras de propiedad ya está protegida por requisitos canónicos vigentes. UX-014 especializa el consumo UX/contractual del subconjunto de 198 definiciones ya registrado por `INT-APP-001..010` sin crear una conducta transversal nueva.

---

#### 69. Cobertura de prueba vigente reutilizada

La tarea reutiliza sin modificar:

- `TREQ-NUMERA-001` — reconciliación de indicadores, costos, gastos, cierres, saldos y reportes con hechos y documentos fuente de PULSO, ORIGO, FOGO y NEXO, sin doble registro manual;
- `TREQ-NUMERA-002` — identidad estable, entidad, sede, centro, fuente, correlación, estado, evidencia y correcciones no destructivas; su ownership vigente incluye expresamente `NUMERA-UX-014`;
- `TREQ-INTEGRATION-003` — identidad estable, idempotencia, retry, resultado recuperable, outbox/inbox o mecanismo equivalente, conciliación y recuperación;
- `TREQ-INTEGRATION-004` — reconstrucción de causa, payload o referencia, principal, recurso, intento, resultado, error y efecto final sin duplicación;
- `TREQ-INTEGRATION-006` — captura única en aplicación propietaria y propagación por contratos o eventos aprobados, sin fuente competidora ni doble digitación;
- `TREQ-INTEGRATION-017` — continuidad gobernada de hechos operativos hacia NUMERA conforme a contratos correlacionados;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas cuando el consumo produzca efectos o accesos sujetos a autorización.

Esta sección es trazabilidad de cobertura vigente y no actualiza el Registro 04A.

---

#### 70. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El trabajo es documental; no se ejecutaron build, lint, tipos ni pruebas de producto. |
| LOCAL | NOT_EXECUTED | La incorporación, formateo, quality, delivery, validador `docs:int-app:check`, topología, batería global y cierre permanecen pendientes del checkout del usuario después de que `NUMERA-UX-013` entregue `NEXT_TASK_ALLOWED: SI`. |
| REMOTA | PASS | Se verificaron el marcador de UX-014, continuidad NUMERA, topología `DEFINE_ONCE`, `INT-APP-001..010`, matrices de productoras/consumidoras, 35 procesos y 198 definiciones PULSO/ORIGO/FOGO/NEXO → NUMERA, contratos NUMERA-DOM-002/003/004/014, Registro 04A aplicable y scripts documentales vigentes; UX-013 se consume desde el archivo completo aprobado por el usuario mientras termina su incorporación. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron entregas, listeners, replays, retries, deduplicación, reconocimiento económico, conciliación ni pruebas en ambientes desplegados. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-014` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza implementación física propia. |

---

#### 71. Criterios de aceptación

La tarea queda aceptable cuando:

1. existe exactamente un contrato `NUMERA-SOURCE-EVENT-CONSUMPTION-001`;
2. se consumen `INT-APP-001..010` sin redefinirlos;
3. existen exactamente cuatro aplicaciones fuente: PULSO, ORIGO, FOGO y NEXO;
4. existen exactamente 35 procesos fuente dentro del alcance;
5. existen exactamente 198 definiciones de evento dentro del alcance;
6. existen 34 relaciones de proceso directas y una condicional;
7. existen 192 relaciones de evento directas y seis condicionales;
8. la relación condicional única corresponde a `VPROC-0035`;
9. no se inventa su `condition_ref`;
10. NUMERA conserva finalidad `FINANCIAL_RECONCILIATION_COST_ANALYSIS`;
11. la productora canónica permanece autoridad del evento fuente;
12. NUMERA no reemite el evento cambiando productora;
13. el envelope común conserva los campos de `EVENT-ENVELOPE-001`;
14. un evento fuera de catálogo no se acepta por heurística;
15. la productora se valida contra el registro aprobado;
16. la relación NUMERA directa o condicional debe existir antes del consumo;
17. versión de evento y schema deben ser compatibles;
18. el mismo `event_id` no produce otro efecto por redelivery;
19. reutilización conflictiva falla cerrada;
20. `aggregate_version` no retrocede la proyección;
21. evento tardío no sobrescribe una versión posterior;
22. retry conserva identidad lógica;
23. replay conserva `event_id` y productora histórica;
24. backfill no concede audiencia nueva;
25. `RESULT_UNKNOWN` exige consulta o conciliación antes de repetir;
26. `PENDING_CONFIRMATION` no se presenta como éxito;
27. error parcial conserva efectos confirmados, pendientes y desconocidos;
28. dead-letter no se interpreta como rechazo económico;
29. retry agotado no dispara compensación automática;
30. auditoría no sustituye la fuente de verdad;
31. NUMERA no escribe tablas o RPC ajenos sin contrato;
32. la proyección NUMERA no se devuelve para sobrescribir la fuente;
33. corrección de fuente pertenece al owner de la fuente;
34. corrección económica NUMERA conserva el original;
35. evento recibido no equivale a hecho económico reconocido;
36. PULSO conserva venta, pago, caja y entrega como hechos distintos;
37. ORIGO conserva compra y recepción comercial;
38. NEXO conserva efecto físico;
39. FOGO conserva ejecución productiva;
40. varias fuentes pueden sustentar un solo efecto económico sin duplicarlo;
41. la cardinalidad económica no se deduce del número de entregas;
42. filtros UX no completan dimensiones fuente faltantes;
43. empresa seleccionada no se convierte en empresa del evento;
44. sede seleccionada no se convierte en sede del evento;
45. centro seleccionado no se convierte en centro del evento;
46. dimensión ausente permanece pendiente o en diferencia;
47. canal externo pasa por la productora interna aprobada antes de NUMERA;
48. payload más amplio no autoriza persistir todos sus campos;
49. consumo backend no concede lectura humana;
50. consumo no concede exportación;
51. procedencia puede reconstruirse para actores autorizados;
52. ausencia de evento no se presenta como cero;
53. frescura y cobertura incompleta permanecen distinguibles;
54. UX-014 no absorbe el tablero de UX-024;
55. UX-014 no absorbe la deduplicación empresarial de UX-015;
56. similitud de importe/fecha/texto no prueba duplicidad;
57. observabilidad futura puede medir ingestión sin redefinir semántica;
58. el consumidor físico actual no se declara implementado sin evidencia;
59. no se fuerza Realtime ni otra tecnología de transporte;
60. no se modifica Supabase;
61. no se crean ni modifican requisitos de prueba;
62. no se realizan cambios físicos;
63. UX-015 recibe ownership explícito de duplicidad financiera entre eventos distintos.

---

#### 72. Límites

Esta tarea no:

- modifica `INT-APP-001..010`;
- agrega eventos;
- elimina eventos;
- cambia productoras;
- cambia consumidoras;
- cambia relaciones directas a condicionales o viceversa;
- inventa condiciones para `VPROC-0035`;
- crea listeners;
- crea bus o broker;
- crea topics;
- crea colas;
- crea workers;
- crea jobs;
- crea webhooks;
- crea outbox o inbox físicos;
- crea tablas;
- crea vistas;
- crea triggers;
- crea RPC;
- crea Server Actions;
- crea APIs;
- crea RLS;
- crea Realtime;
- crea Edge Functions;
- crea cron;
- modifica Supabase;
- crea migraciones;
- cambia permisos;
- asigna permisos a roles;
- reconoce hechos económicos reales;
- corrige hechos operativos;
- ejecuta replay o backfill;
- ejecuta retries;
- compensa efectos;
- diseña conciliaciones específicas de UX-017..019;
- diseña el tablero de UX-024;
- resuelve duplicidad empresarial de eventos distintos;
- desarrolla `NUMERA-UX-015`;
- actualiza Registro 04A.

---

#### 73. Handoff a NUMERA-UX-015

La siguiente tarea recibe:

```text
NUMERA_SOURCE_EVENT_CONSUMPTION_CONTRACT = NUMERA-SOURCE-EVENT-CONSUMPTION-001
SOURCE_APPLICATIONS = PULSO|ORIGO|FOGO|NEXO
SOURCE_APPLICATION_COUNT = 4
SOURCE_PROCESS_COUNT = 35
SOURCE_EVENT_DEFINITION_COUNT = 198
DIRECT_PROCESS_RELATION_COUNT = 34
DIRECT_EVENT_RELATION_COUNT = 192
CONDITIONAL_PROCESS_RELATION_COUNT = 1
CONDITIONAL_EVENT_RELATION_COUNT = 6
CONDITIONAL_PROCESS = VPROC-0035
NUMERA_CONSUMER_PURPOSE = FINANCIAL_RECONCILIATION_COST_ANALYSIS
SOURCE_EVENT_OWNER = PRODUCER_APPLICATION
EVENT_RECEIVED_IS_ECONOMIC_FACT_RECOGNIZED = NO
CONSUMER_PROJECTION_IS_SOURCE_OF_TRUTH = NO
CONSUMER_INBOX_KEY = numera+event_id
EXACT_EVENT_REDELIVERY_CREATES_NEW_EFFECT = NO
CONFLICTING_REUSE = DENY_AND_RESOLVE
RESULT_UNKNOWN_REQUIRES_QUERY_OR_RECONCILIATION = YES
REPLAY_CREATES_NEW_SOURCE_EVENT = NO
UI_FILTER_IS_SOURCE_FACT = NO
SOURCE_DIMENSION_FALLBACK_FROM_UI = FORBIDDEN
CROSS_APPLICATION_SOURCE_WRITE = FORBIDDEN
CROSS_EVENT_BUSINESS_DUPLICATE_OWNER = NUMERA_UX_015
UX_015_OWNER = FINANCIAL_DUPLICATE_PREVENTION
TREQ_CHANGES = 0
```

`NUMERA-UX-015` deberá evitar registro financiero duplicado sobre eventos, fuentes y capturas distintas sin confundir redelivery técnica con duplicidad empresarial ni eliminar historia válida.

---

#### 74. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-013
-> NUMERA-UX-014
-> NUMERA-UX-015
```

UX-014 consume los filtros de UX-013 únicamente como selección posterior sobre hechos ya ingeridos y entrega a UX-015 identidad, procedencia e idempotencia suficientes para tratar duplicidad financiera sin recrear la fuente.

---

#### 75. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-013 — Filtrar por empresa, sede y centro de costo`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-015 — Evitar registro financiero duplicado`
### ✅ NUMERA-UX-015 — Evitar registro financiero duplicado

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO
**Tarea siguiente:** NUMERA-UX-016 — Validar el prototipo con contabilidad y dirección
**Tipo de tarea:** definición documental del contrato UX de prevención de duplicidad financiera en NUMERA sobre eventos distintos, fuentes distintas, capturas manuales y representaciones correlacionadas, separando redelivery técnica, posible duplicado, duplicado empresarial confirmado, conflicto, corrección/reverso/compensación y hecho independiente, con revisión recuperable y conservación de historia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/05_EXPERIENCIA_FINANCIERA_Y_ANALITICA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea restricciones únicas, índices, tablas, vistas, triggers, RPC, Server Actions, APIs, RLS, colas, listeners, reglas runtime de matching, migraciones, cambios Supabase, datos financieros, correcciones, conciliaciones ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar de forma cerrada y verificable cómo NUMERA evita reconocer dos veces el mismo efecto financiero cuando una realidad empresarial puede llegar por eventos diferentes, aplicaciones diferentes, documentos relacionados, reintentos, replay, backfill o captura manual.

La experiencia debe impedir doble registro sin confundir:

- redelivery técnica con duplicidad empresarial;
- dos hechos relacionados con un mismo hecho;
- similitud con identidad;
- corrección, reverso o compensación con duplicado;
- pago, venta, recepción, movimiento físico, producción, documento, obligación o ajuste entre sí;
- una posible coincidencia con un duplicado confirmado.

La regla principal es:

```text
MISMA REALIDAD ECONOMICA DEMOSTRADA
+ MISMO EFECTO ECONOMICO OBJETIVO
-> UN SOLO RECONOCIMIENTO ECONOMICO
```

sin borrar la evidencia de las entradas recibidas.

---

#### 2. Naturaleza y topología

`NUMERA-UX-015` es `DEFINE_ONCE` y no crea instancia física propia.

La tarea:

- define experiencia, taxonomía, decisiones y handoffs;
- no implementa almacenamiento de deduplicación;
- no modifica la idempotencia transversal;
- no ejecuta conciliaciones reales;
- no modifica eventos fuente;
- no elimina registros existentes;
- no cambia ownership entre aplicaciones.

---

#### 3. Handoff recibido de NUMERA-UX-014

Se consume íntegramente:

```text
NUMERA_SOURCE_EVENT_CONSUMPTION_CONTRACT = NUMERA-SOURCE-EVENT-CONSUMPTION-001
SOURCE_APPLICATIONS = PULSO|ORIGO|FOGO|NEXO
SOURCE_APPLICATION_COUNT = 4
SOURCE_PROCESS_COUNT = 35
SOURCE_EVENT_DEFINITION_COUNT = 198
DIRECT_PROCESS_RELATION_COUNT = 34
DIRECT_EVENT_RELATION_COUNT = 192
CONDITIONAL_PROCESS_RELATION_COUNT = 1
CONDITIONAL_EVENT_RELATION_COUNT = 6
CONDITIONAL_PROCESS = VPROC-0035
NUMERA_CONSUMER_PURPOSE = FINANCIAL_RECONCILIATION_COST_ANALYSIS
SOURCE_EVENT_OWNER = PRODUCER_APPLICATION
EVENT_RECEIVED_IS_ECONOMIC_FACT_RECOGNIZED = NO
CONSUMER_PROJECTION_IS_SOURCE_OF_TRUTH = NO
CONSUMER_INBOX_KEY = numera+event_id
EXACT_EVENT_REDELIVERY_CREATES_NEW_EFFECT = NO
CONFLICTING_REUSE = DENY_AND_RESOLVE
RESULT_UNKNOWN_REQUIRES_QUERY_OR_RECONCILIATION = YES
REPLAY_CREATES_NEW_SOURCE_EVENT = NO
UI_FILTER_IS_SOURCE_FACT = NO
SOURCE_DIMENSION_FALLBACK_FROM_UI = FORBIDDEN
CROSS_APPLICATION_SOURCE_WRITE = FORBIDDEN
CROSS_EVENT_BUSINESS_DUPLICATE_OWNER = NUMERA_UX_015
UX_015_OWNER = FINANCIAL_DUPLICATE_PREVENTION
TREQ_CHANGES = 0
```

UX-015 desarrolla exclusivamente `FINANCIAL_DUPLICATE_PREVENTION`.

---

#### 4. Contratos canónicos consumidos

La tarea especializa, sin redefinir:

- `NUMERA-SOURCE-EVENT-CONSUMPTION-001`;
- `NUMERA-EXPENSE-REGISTRATION-FLOW-001`;
- `ENTERPRISE-EVENT-CATALOG-001@1.0.0`;
- `ENTERPRISE-EVENT-PRODUCER-REGISTRY-001@1.0.0`;
- `ENTERPRISE-EVENT-CONSUMER-REGISTRY-001@1.0.0`;
- `ENTERPRISE-EVENT-IDEMPOTENCY-REGISTRY-001@1.0.0`;
- `ENTERPRISE-EVENT-RETRY-POLICY-001@1.0.0`;
- `ENTERPRISE-INTEGRATION-AUDIT-POLICY-001@1.0.0`;
- `ENTERPRISE-PARTIAL-ERROR-HANDLING-POLICY-001@1.0.0`;
- `ENTERPRISE-CROSS-APPLICATION-WRITE-POLICY-001@1.0.0`;
- contratos económicos de `NUMERA-DOM-002`, `NUMERA-DOM-003`, `NUMERA-DOM-004`, `NUMERA-DOM-005` y `NUMERA-DOM-014`.

---

#### 5. Contrato UX resultante

Se define:

```text
NUMERA-FINANCIAL-DUPLICATE-PREVENTION-001
```

Su alcance es impedir un segundo reconocimiento económico cuando exista evidencia suficiente de que dos representaciones corresponden al mismo efecto económico, sin destruir ninguna representación fuente.

---

#### 6. Superficies propietarias

La prevención integral se presenta principalmente en:

```text
PRIMARY_SCREEN_ID = VSCREEN-0095
PRIMARY_SCREEN_NAME = Bandeja de hechos económicos
PRIMARY_PROCESS_ID = VPROC-0051
PRIMARY_STEP_ID = VPROC-0051::STEP-TRIAGE_ECONOMIC_FACTS
```

La captura manual relacionada permanece en:

```text
RELATED_SCREEN_ID = VSCREEN-0096
RELATED_SCREEN_NAME = Registro de gasto y soporte
RELATED_STEP_ID = VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE
```

No se crea una pantalla adicional para duplicados.

---

#### 7. Invariante principal

```text
DUPLICATE_PREVENTION != DATA_DELETION
DUPLICATE_PREVENTION != SOURCE_REWRITE
DUPLICATE_PREVENTION != LAST_WRITE_WINS
DUPLICATE_PREVENTION != SILENT_MERGE
```

La prevención controla el reconocimiento económico y la representación NUMERA; no reescribe la fuente.

---

#### 8. Dos capas diferentes de duplicidad

UX-015 separa obligatoriamente:

```text
TECHNICAL_REDELIVERY
!=
BUSINESS_DUPLICATE
```

`TECHNICAL_REDELIVERY` ya está gobernado por `event_id`, inbox e idempotencia transversal.

`BUSINESS_DUPLICATE` puede existir aun cuando los eventos tengan identificadores distintos.

---

#### 9. Redelivery técnica

Cuando llega exactamente el mismo `event_id` a NUMERA:

```text
consumer_application = numera
+ same event_id
-> recover prior consumer result
-> zero new economic effect
```

Esto no requiere una nueva decisión de duplicidad empresarial.

---

#### 10. Reutilización conflictiva

Una misma identidad idempotente con contenido lógico incompatible conserva:

```text
CONFLICTING_REUSE
-> DENY
-> RECONCILIATION_OR_CONTROLLED_RESOLUTION
```

Nunca se interpreta como un duplicado compatible ni como autorización para elegir una de las versiones por conveniencia.

---

#### 11. Duplicidad empresarial entre identidades distintas

Puede existir duplicidad empresarial cuando dos entradas con distinta identidad técnica representan demostrablemente:

```text
SAME_CANONICAL_SOURCE_REALITY
+ SAME_ECONOMIC_EFFECT_CLASS
+ SAME_EFFECT_SCOPE
```

La demostración debe apoyarse en identidades y correlaciones canónicas, no solo en semejanza de campos.

---

#### 12. Taxonomía cerrada de clasificación

UX-015 utiliza exactamente estas clases de decisión:

```text
TECHNICAL_REDELIVERY
CONFIRMED_BUSINESS_DUPLICATE
POSSIBLE_BUSINESS_DUPLICATE
DISTINCT_RELATED_FACT
CORRECTION_REVERSAL_OR_COMPENSATION
CONFLICTING_REUSE
INDEPENDENT_ECONOMIC_FACT
INSUFFICIENT_EVIDENCE
```

No se agrega una categoría genérica `OTHER` para cerrar casos ambiguos.

---

#### 13. `TECHNICAL_REDELIVERY`

Se usa únicamente cuando la identidad idempotente demuestra que la misma operación o evento está siendo entregado nuevamente.

Resultado:

```text
RETURN_PRIOR_RESULT
NEW_ECONOMIC_RECOGNITION = NO
```

---

#### 14. `CONFIRMED_BUSINESS_DUPLICATE`

Se usa cuando dos representaciones diferentes quedan enlazadas por evidencia suficiente a la misma realidad fuente y al mismo efecto económico objetivo.

Resultado:

```text
REUSE_EXISTING_ECONOMIC_EFFECT
SECOND_RECOGNITION = NO
SOURCE_EVIDENCE_PRESERVED = YES
```

---

#### 15. `POSSIBLE_BUSINESS_DUPLICATE`

Se usa cuando existen señales de coincidencia, pero no identidad suficiente para concluir duplicidad.

Resultado:

```text
REVIEW_REQUIRED
AUTO_DELETE = NO
AUTO_MERGE = NO
AUTO_POST_SECOND_EFFECT = NO
```

La entrada permanece visible y trazable hasta resolución.

---

#### 16. `DISTINCT_RELATED_FACT`

Dos hechos pueden compartir una misma cadena empresarial y no ser duplicados.

Ejemplos de relaciones legítimamente distintas:

```text
SALE != PAYMENT
SALE != DELIVERY
SALE != FISCAL_DOCUMENT
PURCHASE_ORDER != RECEIPT
COMMERCIAL_RECEIPT != INVENTORY_MOVEMENT
PRODUCTION_EXECUTION != INVENTORY_MOVEMENT
ECONOMIC_FACT != PAYABLE
ECONOMIC_FACT != RECEIVABLE
ECONOMIC_FACT != BANK_MOVEMENT
```

Compartir correlación no colapsa estas identidades.

---

#### 17. `CORRECTION_REVERSAL_OR_COMPENSATION`

Una corrección, reverso, devolución, reembolso o compensación puede referenciar el hecho original y producir un efecto legítimo nuevo.

Por tanto:

```text
REFERENCE_TO_ORIGINAL != DUPLICATE
INVERSE_AMOUNT != PROOF_OF_DUPLICATE
```

El nuevo efecto conserva vínculo explícito con el original.

---

#### 18. `INDEPENDENT_ECONOMIC_FACT`

Se utiliza cuando la evidencia demuestra que la entrada representa un efecto económico autónomo aunque coincidan parcialmente importe, fecha, contraparte, documento o descripción.

La coincidencia superficial no reduce dos hechos a uno.

---

#### 19. `INSUFFICIENT_EVIDENCE`

Cuando no existe evidencia suficiente para confirmar duplicidad ni independencia:

```text
INSUFFICIENT_EVIDENCE
-> HOLD_FOR_REVIEW_OR_RECONCILIATION
```

No se inventa identidad ni se escoge el resultado que haga cuadrar un reporte.

---

#### 20. Evidencia fuerte de identidad

Cuando exista, tiene prioridad la evidencia estable como:

- aplicación propietaria;
- proceso fuente;
- identidad canónica del recurso fuente;
- `event_id` y versión;
- identidad externa autenticada cuando el contrato la conserve;
- `source_table` + `source_id` legacy cuando sean válidos y estén gobernados;
- documento fuente con identidad canónica;
- correlación/causalidad verificable;
- referencia al hecho económico NUMERA existente;
- referencia explícita a original en corrección, reverso o compensación.

---

#### 21. Señales débiles no concluyentes

Por sí solas no prueban duplicidad:

- mismo importe;
- misma fecha;
- mismo día o periodo;
- misma sede;
- mismo centro de costo;
- misma contraparte;
- mismo texto o descripción;
- mismo producto;
- misma cantidad;
- misma moneda;
- proximidad temporal;
- mismo usuario;
- mismo soporte visual sin identidad verificable.

Estas señales solo pueden elevar un caso a `POSSIBLE_BUSINESS_DUPLICATE`.

---

#### 22. Importe igual no es identidad

```text
SAME_AMOUNT != SAME_ECONOMIC_FACT
```

Dos ventas legítimas, dos compras, dos pagos, dos movimientos o dos gastos pueden tener exactamente el mismo valor.

---

#### 23. Fecha igual no es identidad

```text
SAME_DATE != SAME_ECONOMIC_FACT
```

El periodo o fecha de reconocimiento se utiliza como contexto, no como clave universal de deduplicación.

---

#### 24. Documento igual requiere semántica

Una misma referencia documental puede respaldar varios efectos permitidos o puede haber sido reutilizada indebidamente.

La UI debe revisar:

- tipo de documento;
- owner;
- versión/estado;
- recurso relacionado;
- efecto económico objetivo.

No se deduplica únicamente por texto del documento.

---

#### 25. Scope de comparación

La comparación debe respetar como mínimo, cuando existan:

```text
SOURCE_OWNER
SOURCE_PROCESS
SOURCE_RESOURCE_IDENTITY
ECONOMIC_EFFECT_CLASS
LEGAL_ENTITY
CURRENCY
ORIGINAL_OR_PARENT_REFERENCE
```

Empresa, sede y centro de costo ayudan a detectar inconsistencias, pero no sustituyen la identidad fuente.

---

#### 26. Clase de efecto económico

Una misma fuente puede originar efectos distintos.

Por ello:

```text
SAME_SOURCE_RESOURCE
+ DIFFERENT_ECONOMIC_EFFECT_CLASS
!= DUPLICATE_BY_DEFAULT
```

Venta reconocida, pago aplicado, devolución y ajuste conservan semánticas separadas.

---

#### 27. PULSO

Para hechos provenientes de PULSO:

- venta, pago, caja, entrega y documento fiscal permanecen distintos;
- la misma venta visible en canal externo, PASS y PULSO no se registra varias veces;
- PULSO normaliza el hecho comercial interno antes de que NUMERA lo consuma;
- un cierre de caja no fabrica ventas faltantes;
- un pago no crea otra venta;
- una devolución o reembolso no borra el original.

---

#### 28. ORIGO

Para hechos provenientes de ORIGO:

- necesidad, orden, compromiso y recepción comercial permanecen distintos;
- recibir una orden y recibir físicamente inventario no son el mismo hecho;
- documento de proveedor y obligación por pagar no se colapsan por referencia compartida;
- recepciones parciales legítimas no se deduplican entre sí por pertenecer a la misma orden.

---

#### 29. FOGO

Para hechos provenientes de FOGO:

- planificación, ejecución, consumo, calidad, merma, reproceso y cierre productivo permanecen diferenciados;
- varias señales productivas correlacionadas pueden sustentar un mismo efecto económico sin convertirse en varios efectos;
- reproceso o corrección no se clasifican como duplicado por compartir lote o receta.

---

#### 30. NEXO

Para hechos provenientes de NEXO:

- movimiento, saldo, ubicación, condición, recepción física, traslado y ajuste conservan identidades propias;
- salida y entrada de una transferencia interna pueden ser dos movimientos físicos de una sola transferencia, no dos ventas ni dos compras;
- una señal física no se convierte por sí sola en otro hecho económico si ya existe el efecto económico correlacionado.

---

#### 31. Varias fuentes para un mismo efecto económico

FOGO, NEXO, ORIGO y PULSO pueden aportar evidencia complementaria al mismo efecto.

```text
MULTIPLE_EVIDENCE_SOURCES
!= MULTIPLE_ECONOMIC_EFFECTS
```

La UI debe mostrar qué fuente prueba cada dimensión y cuál es la realidad económica reconocida una sola vez.

---

#### 32. Captura manual

La captura manual de `VSCREEN-0096` se mantiene disponible únicamente para un gasto legítimo que no esté ya representado por un hecho fuente consumido.

```text
MANUAL_CAPTURE != BYPASS_SOURCE_IDENTITY
```

---

#### 33. Hecho fuente existente frente a captura manual

Cuando se demuestra que un hecho operacional ya existe:

```text
SOURCE_FACT_EXISTS
+ SAME_ECONOMIC_EFFECT
-> DO_NOT_CREATE_MANUAL_SHADOW_FACT
```

La UX ofrece recuperar, enlazar, completar soporte o conducir a revisión/conciliación según corresponda.

---

#### 34. Captura manual primero y evento fuente después

Si una captura manual legítima ya fue registrada y después aparece un evento fuente potencialmente equivalente:

1. no se reconoce automáticamente un segundo efecto;
2. se compara identidad y evidencia;
3. si se confirma duplicidad, ambas representaciones quedan correlacionadas;
4. el efecto económico reconocido permanece uno;
5. el historial de la captura manual no se borra.

---

#### 35. Evento fuente primero y captura manual después

Si el evento fuente ya produjo o referencia un efecto NUMERA:

```text
MANUAL_CREATE_ATTEMPT
-> DUPLICATE_CHECK
-> EXISTING_EFFECT_FOUND
-> RECOVER_OR_LINK_EXISTING
```

No se crea otra fila equivalente por conveniencia operativa.

---

#### 36. Replay y backfill

```text
REPLAY != NEW_BUSINESS_REALITY
BACKFILL != NEW_BUSINESS_REALITY
```

La ejecución de replay o backfill conserva identidad histórica y no justifica un segundo reconocimiento.

---

#### 37. Retries

Un retry conserva la misma intención idempotente.

```text
RETRY_COUNT > 1
DOES_NOT_IMPLY
ECONOMIC_EFFECT_COUNT > 1
```

---

#### 38. Resultado desconocido

Cuando un commit previo pudo haber producido efecto, la UI no ofrece un segundo registro ciego.

```text
RESULT_UNKNOWN
-> QUERY_AUTHORITATIVE_RESULT
OR
-> RECONCILIATION_REQUIRED
```

Solo después de demostrar no-efecto puede habilitarse un retry seguro con la misma identidad.

---

#### 39. Flujo UX principal

```text
CANDIDATE_RECEIVED_OR_CAPTURED
-> IDENTITY_CHECK
-> RELATIONSHIP_CHECK
-> DUPLICATE_CLASSIFICATION
-> REVIEW_IF_NEEDED
-> DECISION
-> RECOGNIZE_ONCE_OR_REUSE_EXISTING
-> RECEIPT
-> RECOVERY_OR_RECONCILIATION
```

---

#### 40. Estado visible en VSCREEN-0095

La bandeja puede representar, como estado UX de revisión:

```text
NO_DUPLICATE_EVIDENCE
POSSIBLE_DUPLICATE
CONFIRMED_DUPLICATE
RELATED_DISTINCT_FACT
CORRECTION_OR_REVERSAL
CONFLICT
NEEDS_MORE_EVIDENCE
RESOLVED_TO_EXISTING_EFFECT
```

Estas etiquetas no crean estados nuevos de `VPROC-0051`.

---

#### 41. Presentación del candidato

La fila o detalle debe permitir entender, con divulgación progresiva:

- fuente y proceso;
- identidad/referencia fuente disponible;
- tipo de hecho;
- efecto económico propuesto;
- importe y moneda;
- entidad y dimensiones relevantes;
- fecha/periodo;
- correlaciones;
- recurso NUMERA posiblemente existente;
- razón de la sospecha de duplicidad;
- clase y fuerza de la evidencia.

---

#### 42. Razón de sospecha visible

La UX no muestra únicamente “duplicado”.

Debe poder explicar una o más causas verificables, por ejemplo:

```text
SAME_SOURCE_IDENTITY
SAME_CORRELATION_AND_EFFECT_CLASS
EXISTING_MANUAL_SHADOW_OF_SOURCE
EXISTING_SOURCE_SHADOW_OF_MANUAL
SAME_CANONICAL_DOCUMENT_AND_EFFECT
TECHNICAL_REDELIVERY
WEAK_SIMILARITY_ONLY
```

---

#### 43. Duplicado confirmado no se elimina

La resolución conserva:

- entrada recibida;
- identidad fuente;
- evidencia usada;
- decisión;
- actor/autoridad cuando corresponda;
- referencia al efecto económico existente;
- momento de resolución;
- trazabilidad de por qué no se reconoció otra vez.

---

#### 44. Posible duplicado no se marca como confirmado

```text
POSSIBLE_DUPLICATE != CONFIRMED_DUPLICATE
```

La interfaz debe mantener incertidumbre explícita hasta disponer de evidencia suficiente.

---

#### 45. Decisión automática permitida

Solo puede resolverse automáticamente cuando el contrato técnico o empresarial ya demuestra identidad de forma determinista, por ejemplo:

- redelivery del mismo `event_id`;
- resultado idempotente previo recuperable;
- vínculo canónico exacto ya existente entre la entrada y el efecto NUMERA.

La similitud heurística no autoriza auto-resolución como duplicado empresarial.

---

#### 46. Revisión humana

Cuando se requiera decisión humana, la UX debe presentar evidencia sin conceder autoridad por el solo acceso a la bandeja.

La decisión debe ser server-side, auditable y compatible con el permiso exacto que el recurso y la resolución requieran.

UX-015 no crea un permiso omnibus `duplicate.manage`.

---

#### 47. Denegación de autoridad

Una persona sin autoridad para resolver no puede:

- confirmar duplicidad;
- forzar independencia;
- cambiar el efecto económico;
- ejecutar corrección;
- borrar evidencia;
- alterar la fuente.

Puede ver únicamente la proyección autorizada.

---

#### 48. Concurrencia

Dos actores o workers no pueden resolver el mismo candidato de forma incompatible.

La materialización futura deberá revalidar versión/estado y fallar cerrado ante cambio concurrente.

```text
STALE_DUPLICATE_DECISION
-> REVIEW_AGAIN
```

---

#### 49. Resolución a efecto existente

Cuando se confirma duplicidad:

```text
CANDIDATE
-> LINK_TO_EXISTING_ECONOMIC_EFFECT
-> SECOND_POST = NO
```

El vínculo no convierte el candidato en fuente de verdad ni altera el owner del original.

---

#### 50. Resolución como hecho independiente

Cuando se demuestra independencia:

```text
CANDIDATE
-> CONTINUE_NORMAL_VPROC_0051_FLOW
```

La decisión conserva la evidencia que descartó duplicidad.

---

#### 51. Resolución como corrección o reverso

Cuando la entrada realmente representa una corrección, reverso o compensación:

```text
CANDIDATE
-> LINK_TO_ORIGINAL
-> APPLY_OWNER-SPECIFIC_CORRECTION_CONTRACT
```

UX-015 no ejecuta la corrección ni define su autorización especializada.

---

#### 52. Resolución con evidencia insuficiente

```text
CANDIDATE
-> KEEP_PENDING
-> REQUEST_OR_WAIT_FOR_EVIDENCE
```

No se convierte un caso incierto en cero ni en duplicado para limpiar una bandeja.

---

#### 53. Relación con `VPROC-0051`

UX-015 no crea lifecycle nuevo.

Utiliza el flujo económico aprobado donde:

```text
ECONOMIC_EVENT_RECEIVED
-> VALIDATION_IN_PROGRESS
-> CLASSIFIED
-> POSTING_PENDING
-> POSTED
-> RECONCILIATION_PENDING / ALLOCATION_PENDING
-> ECONOMIC_EVENT_RECONCILED
```

La verificación de duplicidad ocurre antes de reconocer un segundo efecto.

---

#### 54. Recepción no equivale a reconocimiento

```text
ECONOMIC_EVENT_RECEIVED
!= POSTED
```

Un candidato puede permanecer recibido y bajo revisión sin afectar estados financieros definitivos.

---

#### 55. Duplicidad y cierre de periodo

Un candidato materialmente no resuelto puede bloquear un gate de cierre cuando el contrato del periodo lo considere material.

UX-015 no decide por sí sola materialidad ni cierra periodos.

---

#### 56. Duplicidad y conciliación

La prevención de doble reconocimiento ocurre antes o durante clasificación.

La conciliación posterior explica relaciones y diferencias entre hechos válidos.

```text
DUPLICATE_PREVENTION != FULL_RECONCILIATION
```

Los flujos específicos de ventas/pagos, compras/recepciones e inventario/producción permanecen en UX-017, UX-018 y UX-019.

---

#### 57. Duplicidad y correcciones históricas

Una duplicidad descubierta después del reconocimiento no autoriza borrar el segundo registro.

La salida requiere corrección, reverso, reclasificación o tratamiento versionado según el owner y estado del periodo.

El historial se conserva.

---

#### 58. Duplicidad y filtros

Empresa, sede y centro de costo pueden ayudar a comparar casos, pero:

```text
FILTER_SELECTION_IS_DUPLICATE_EVIDENCE = NO
```

La selección de UX-013 no completa identidades faltantes ni decide el duplicado.

---

#### 59. Duplicidad y exportación

Una exportación puede reflejar el estado de resolución, pero:

```text
EXPORTED_ROW_COUNT != SOURCE_FACT_COUNT
EXPORT != DUPLICATE_RESOLUTION
```

UX-015 no modifica el contrato de exportación de UX-012.

---

#### 60. Mensajes UX

La UI debe distinguir explícitamente:

```text
Ya procesado: se recuperó el resultado existente.
Posible duplicado: requiere revisión.
Duplicado confirmado: no se registrará un segundo efecto.
Hecho relacionado pero distinto: continúa por su flujo normal.
Corrección o reverso: se tratará mediante el contrato correspondiente.
Conflicto de identidad: no se puede continuar sin resolverlo.
Falta evidencia: el caso permanece pendiente.
```

Los textos podrán adaptarse visualmente, pero no colapsar estas semánticas.

---

#### 61. Estado vacío

Cero candidatos duplicados significa únicamente que no hay casos visibles dentro del alcance consultado.

No demuestra que todas las fuentes estén completas ni que no exista duplicidad histórica no detectada.

---

#### 62. Accesibilidad y responsive

La experiencia debe:

- conservar label textual de la clasificación;
- no depender exclusivamente de color;
- permitir navegar entre candidato y efecto existente;
- preservar foco al abrir y cerrar comparación;
- mostrar la evidencia principal antes de acciones destructivas o sensibles;
- conservar clasificación y decisión en superficies estrechas.

---

#### 63. Observabilidad esperada

La futura materialización debe poder medir sin redefinir semántica:

```text
TECHNICAL_REDELIVERY_COUNT
POSSIBLE_BUSINESS_DUPLICATE_COUNT
CONFIRMED_BUSINESS_DUPLICATE_COUNT
DUPLICATE_PREVENTED_EFFECT_COUNT
CONFLICTING_REUSE_COUNT
RESOLVED_TO_EXISTING_EFFECT_COUNT
INDEPENDENT_AFTER_REVIEW_COUNT
INSUFFICIENT_EVIDENCE_COUNT
MANUAL_SHADOW_PREVENTED_COUNT
```

Los conteos de observabilidad no son hechos económicos.

---

#### 64. Hallazgos diferidos

| Hallazgo | Bloquea UX-015 | Owner | Condición de salida |
| --- | --- | --- | --- |
| `numera_expenses` auditada no posee restricción única física de identidad fuente | no | materialización física NUMERA / packages y contratos DB aplicables | persistencia futura materializa unicidad/idempotencia sin cambiar la semántica aprobada |
| `createExpense` AS-IS puede crear un hecho manual sin `source_table` ni `source_id` | no | UX-009 + materialización NUMERA | runtime adopta origen/correlación objetivo y pruebas negativas de sombra manual |
| matching cross-domain físico previo a escritura manual no está implementado | no | materialización NUMERA + integraciones aplicables | consumidor materializa comparación gobernada y pruebas de no doble reconocimiento |
| una duplicidad descubierta después de `POSTED` puede exigir corrección económica | no | `NUMERA-UX-023` + owner del recurso | corrección versionada/compensatoria conserva el original y el periodo aplicable |
| resolución específica entre ventas/pagos, compras/recepciones o producción/inventario requiere conciliación especializada | no | `NUMERA-UX-017`, `NUMERA-UX-018`, `NUMERA-UX-019` | cada flujo aplica su contrato de conciliación sin redefinir UX-015 |

No queda hallazgo detectado sin owner y condición de salida.

---

#### 65. Decisiones congeladas

```text
FINANCIAL_DUPLICATE_CONTRACT = NUMERA-FINANCIAL-DUPLICATE-PREVENTION-001
PRIMARY_SCREEN_ID = VSCREEN-0095
RELATED_MANUAL_CAPTURE_SCREEN_ID = VSCREEN-0096
OWNER_PROCESS_ID = VPROC-0051
TECHNICAL_REDELIVERY_IS_BUSINESS_DUPLICATE = NO
EXACT_EVENT_REDELIVERY_CREATES_NEW_EFFECT = NO
SAME_AMOUNT_PROVES_DUPLICATE = NO
SAME_DATE_PROVES_DUPLICATE = NO
SAME_COUNTERPARTY_PROVES_DUPLICATE = NO
SAME_FILTER_CONTEXT_PROVES_DUPLICATE = NO
POSSIBLE_DUPLICATE_AUTO_MERGES = NO
CONFIRMED_DUPLICATE_CREATES_SECOND_EFFECT = NO
CONFIRMED_DUPLICATE_DELETES_SOURCE_EVIDENCE = NO
CORRECTION_IS_DUPLICATE_BY_DEFAULT = NO
REVERSAL_IS_DUPLICATE_BY_DEFAULT = NO
MULTIPLE_EVIDENCE_SOURCES_CREATE_MULTIPLE_EFFECTS = NO
MANUAL_SHADOW_OF_EXISTING_SOURCE_FACT = FORBIDDEN
RESULT_UNKNOWN_ALLOWS_BLIND_RETRY = NO
TREQ_CHANGES = 0
```

---

#### 66. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos descartados:** 0
**Requisitos obsoletos:** 0

La obligación de no doble registrar, conservar identidad, fuente, correlación, idempotencia, evidencia y correcciones no destructivas ya está protegida por requisitos canónicos vigentes. UX-015 especializa la clasificación y la respuesta UX sin crear una obligación ejecutable nueva.

---

#### 67. Cobertura de prueba vigente reutilizada

Esta sección es trazabilidad de cobertura existente y no constituye una actualización del Registro 04A.

- `TREQ-NUMERA-001` — conciliación con PULSO, ORIGO, FOGO y NEXO, prohibición de doble registro manual e historia trazable;
- `TREQ-NUMERA-002` — identidad estable del hecho económico, fuente, correlación, documento, estado y correcciones no destructivas;
- `TREQ-NUMERA-018` — creación de gasto con validación económica y revalidación server-side;
- `TREQ-INTEGRATION-003` — identidad estable, idempotencia, resultado recuperable y ausencia de doble efecto;
- `TREQ-INTEGRATION-004` — trazabilidad causal de cadenas asíncronas y reintentos sin efectos duplicados;
- `TREQ-INTEGRATION-006` — captura única en la aplicación propietaria, sin doble digitación o fuente competidora;
- `TREQ-INTEGRATION-017` — llegada gobernada de hechos operativos a NUMERA con continuidad e idempotencia;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas.

---

#### 68. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | Esta tarea no ejecuta build de producto; la incorporación y batería global quedan para el ciclo documental local. |
| LOCAL | NOT_EXECUTED | No se modificó un checkout local de `vento-shell`; el reemplazo, formateo y validadores locales quedan pendientes del ciclo manual. |
| REMOTA | PASS | Se verificaron en `main` el marcador objetivo, la secuencia vigente hasta UX-014, topología `DEFINE_ONCE`, contratos de NUMERA, `VPROC-0051`, `VSCREEN-0095`, `VSCREEN-0096`, idempotencia transversal, auditoría NUMERA, Registro 04A y scripts aplicables. UX-014 se consume desde el artefacto completo aprobado por el usuario mientras su cierre remoto permanece pendiente. |
| OPERATIVA | NOT_EXECUTED | No se registró, reconoció, anuló, revirtió, concilió ni deduplicó ningún hecho financiero real. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-UX-015` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no autoriza materialización física propia. |

---

#### 69. Criterios de aceptación

La tarea queda aceptable cuando:

1. existe exactamente un contrato `NUMERA-FINANCIAL-DUPLICATE-PREVENTION-001`;
2. `VSCREEN-0095` permanece superficie principal de triage;
3. `VSCREEN-0096` permanece superficie de captura manual relacionada;
4. `VPROC-0051` permanece proceso propietario;
5. la tarea separa redelivery técnica de duplicidad empresarial;
6. el mismo `event_id` no produce un segundo efecto;
7. `CONFLICTING_REUSE` no se trata como duplicado compatible;
8. existen ocho clases cerradas de clasificación;
9. `POSSIBLE_BUSINESS_DUPLICATE` no equivale a duplicado confirmado;
10. similitud de importe no prueba identidad;
11. similitud de fecha no prueba identidad;
12. similitud de contraparte no prueba identidad;
13. empresa/sede/centro seleccionados no prueban identidad;
14. venta y pago permanecen distintos;
15. compra y recepción permanecen distintas;
16. recepción comercial y movimiento físico permanecen distintos;
17. producción y movimiento físico permanecen distintos;
18. documento y hecho económico permanecen distintos;
19. corrección/reverso/compensación no se clasifican como duplicado por defecto;
20. varias fuentes de evidencia no crean varios efectos económicos;
21. un hecho fuente ya existente bloquea la creación de una sombra manual equivalente;
22. una captura manual previa no obliga a duplicar el efecto cuando llegue la fuente;
23. replay y backfill no crean realidad empresarial nueva;
24. retry no aumenta la cardinalidad económica;
25. `RESULT_UNKNOWN` exige consulta o conciliación antes de repetir;
26. duplicado confirmado reutiliza el efecto existente;
27. duplicado confirmado conserva evidencia fuente;
28. posible duplicado permanece pendiente hasta evidencia suficiente;
29. hecho independiente continúa por el flujo normal;
30. corrección se deriva al contrato propietario correspondiente;
31. decisión stale exige revisar otra vez;
32. la UI explica la razón de sospecha;
33. la UI distingue conflicto, duplicado, relacionado, corrección e independencia;
34. cero candidatos no se presenta como completitud de fuentes;
35. filtros no son evidencia de duplicidad;
36. exportación no resuelve duplicidad;
37. la tarea no absorbe conciliaciones UX-017..019;
38. duplicidad descubierta después de reconocimiento no borra historia;
39. todos los hallazgos diferidos tienen owner y condición de salida;
40. no se crean ni modifican requisitos de prueba;
41. no se realizan cambios físicos;
42. UX-016 recibe un conjunto de escenarios verificables para validación con contabilidad y dirección.

---

#### 70. Escenarios mínimos para validación posterior

UX-016 deberá poder probar al menos:

1. mismo `event_id` entregado dos veces;
2. dos eventos diferentes que apuntan a la misma venta y mismo efecto económico;
3. misma venta con pago separado, que no debe deduplicarse como venta;
4. misma orden con dos recepciones parciales legítimas;
5. producción y movimiento NEXO correlacionados que sustentan un solo efecto económico;
6. captura manual que intenta sombrear un hecho fuente existente;
7. captura manual previa seguida por llegada del evento fuente equivalente;
8. dos gastos legítimos con mismo importe, fecha y contraparte;
9. reverso o corrección que comparte referencia con el original;
10. caso con señales débiles pero evidencia insuficiente;
11. `CONFLICTING_REUSE` de una identidad idempotente;
12. resultado desconocido después de commit y recuperación sin segundo registro.

---

#### 71. Límites

Esta tarea no:

- crea una clave física de deduplicación;
- define un índice único de base de datos;
- crea restricciones de `numera_expenses`;
- implementa matching runtime;
- modifica `INT-APP-001..010`;
- cambia `VPROC-0051`;
- agrega estados empresariales;
- crea permisos nuevos;
- crea un permiso omnibus de resolución;
- implementa `VSCREEN-0095` o `VSCREEN-0096`;
- crea componentes React;
- crea APIs, RPC o Server Actions;
- crea tablas, vistas o triggers;
- modifica RLS;
- modifica Supabase;
- crea migraciones;
- ejecuta reintentos, replay o backfill;
- ejecuta conciliaciones;
- corrige fuentes PULSO, ORIGO, FOGO o NEXO;
- borra hechos económicos;
- diseña la conciliación detallada de UX-017, UX-018 o UX-019;
- diseña correcciones/reaperturas de UX-023;
- diseña tablero de cobertura de UX-024;
- valida todavía el prototipo con contabilidad y dirección;
- desarrolla `NUMERA-UX-016`;
- actualiza Registro 04A.

---

#### 72. Handoff a NUMERA-UX-016

La siguiente tarea recibe:

```text
NUMERA_FINANCIAL_DUPLICATE_CONTRACT = NUMERA-FINANCIAL-DUPLICATE-PREVENTION-001
PRIMARY_DUPLICATE_SCREEN = VSCREEN-0095
RELATED_MANUAL_CAPTURE_SCREEN = VSCREEN-0096
OWNER_PROCESS = VPROC-0051
DUPLICATE_CLASS_COUNT = 8
TECHNICAL_REDELIVERY_IS_BUSINESS_DUPLICATE = NO
EXACT_EVENT_REDELIVERY_CREATES_NEW_EFFECT = NO
POSSIBLE_DUPLICATE_IS_CONFIRMED_DUPLICATE = NO
SAME_AMOUNT_PROVES_DUPLICATE = NO
SAME_DATE_PROVES_DUPLICATE = NO
SAME_COUNTERPARTY_PROVES_DUPLICATE = NO
FILTER_SELECTION_PROVES_DUPLICATE = NO
CONFIRMED_DUPLICATE_CREATES_SECOND_EFFECT = NO
CONFIRMED_DUPLICATE_DELETES_SOURCE_EVIDENCE = NO
MANUAL_SHADOW_OF_EXISTING_SOURCE_FACT = FORBIDDEN
RESULT_UNKNOWN_ALLOWS_BLIND_RETRY = NO
CORRECTION_IS_DUPLICATE_BY_DEFAULT = NO
VALIDATION_SCENARIO_COUNT = 12
UX_016_OWNER = PROTOTYPE_VALIDATION_WITH_ACCOUNTING_AND_DIRECTION
TREQ_CHANGES = 0
```

`NUMERA-UX-016` deberá validar el prototipo con contabilidad y dirección utilizando estos escenarios y registrar evidencia de comprensión, clasificación y decisión sin alterar todavía contratos físicos.

---

#### 73. Reconciliación de continuidad

La cadena documental queda:

```text
NUMERA-UX-014
-> NUMERA-UX-015
-> NUMERA-UX-016
```

UX-015 consume identidad, procedencia e idempotencia de UX-014 y entrega a UX-016 un contrato de prevención de duplicidad con escenarios verificables de validación.

---

#### 74. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-014 — Consumir eventos de PULSO, ORIGO, FOGO y NEXO`

**TAREA ACTUAL APROBADA**
`NUMERA-UX-015 — Evitar registro financiero duplicado`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-UX-016 — Validar el prototipo con contabilidad y dirección`
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
