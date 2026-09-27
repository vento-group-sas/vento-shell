### MINI-BLOQUE — AUTORIZACIÓN FINANCIERA

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **autorización financiera** dentro de **O NUMERA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `NUMERA-AUTH-001` a `NUMERA-AUTH-015` — 15 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Vincular módulos y acciones con permisos y contratos aprobados” y concluye con “Definir permisos para crear, compartir, aprobar y publicar escenarios, precios y presupuestos”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:NUMERA-AUTH-001-015 -->
### Reconciliación topológica de NUMERA-AUTH-001 a NUMERA-AUTH-015

La familia separa definición contractual de permisos y materialización física de controles financieros.

| Tareas | Modalidad | Gate |
| --- | --- | --- |
| `NUMERA-AUTH-001..007` | `DEFINE_ONCE` | `NO_PHYSICAL_INSTANCE` |
| `NUMERA-AUTH-008..013` | `PER_IMPLEMENTATION_UNIT` | `POST_E5_PACKAGE` |
| `NUMERA-AUTH-014..015` | `DEFINE_ONCE` | `NO_PHYSICAL_INSTANCE` |

### ✅ NUMERA-AUTH-001 — Vincular módulos y acciones con permisos y contratos aprobados

**Estado:** APROBADA
**Tarea anterior:** NUMERA-DOM-018 — Definir motor de escenarios, versiones de precios, costos, supuestos y publicación
**Tarea siguiente:** NUMERA-AUTH-002 — Clasificar información financiera sensible
**Tipo de tarea:** definición documental del registro de vinculación entre superficies, módulos, acciones, procesos, recursos y autoridad de NUMERA, preservando permisos canónicos ya aprobados, registrando el drift de permisos legacy, asignando slots de autorización a las acciones que todavía no poseen código exacto y fijando las fronteras de validación server-side sin crear permisos runtime ni implementación física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/04_AUTORIZACION_FINANCIERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea, renombra, migra, concede, revoca ni materializa permisos, roles, grants, RLS, RPC, tablas, vistas, migraciones, navegación, guards, Server Actions, pantallas, datos financieros, configuración de Supabase ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato que vincula cada superficie y acción financiera de NUMERA con la autoridad que deberá protegerla, sin inventar permisos que todavía pertenecen a tareas posteriores y sin conservar como autoridad definitiva los códigos legacy observados en el runtime actual.

La tarea produce una base común para que `NUMERA-AUTH-002..015` puedan especializar sensibilidad, lectura, registro, aprobación, cierre, exportación, territorio, auditoría, contexto y capacidades financieras avanzadas sin volver a decidir qué objeto, proceso o acción se está autorizando.

Se congela:

```text
APP_ACCESS
!= DATA_READ_AUTHORITY
!= ACTION_AUTHORITY
!= RESOURCE_SCOPE
!= PROCESS_OWNERSHIP
```

---

#### 2. Naturaleza y topología

La reconciliación propietaria de `NUMERA-AUTH-001..007` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto, `NUMERA-AUTH-001`:

- define una sola vez el contrato de vinculación;
- no crea instancia física propia;
- no modifica el catálogo runtime;
- no modifica Supabase;
- no concede autoridad a ningún actor;
- no ejecuta acciones financieras;
- no sustituye las tareas posteriores que definen permisos exactos.

---

#### 3. Handoff recibido de NUMERA-DOM-018

El cierre del dominio financiero entrega a autorización las categorías de objetos y acciones definidas en `NUMERA-DOM-001..018`.

En particular:

```text
REAL != PRESUPUESTADO != FORECAST != ESCENARIO != SIMULADO != PROPUESTO != PUBLICADO
SCENARIO_PUBLISHED != SOURCE_FACT_MUTATED
SCENARIO_PUBLISHED != OPERATIONAL_PRICE_ACTIVATED
SCENARIO_PUBLISHED != ACCOUNTING_POSTED
```

La autorización debe proteger estas distinciones; no puede convertir una acción de simulación, consulta o publicación en autoridad para modificar la fuente propietaria.

---

#### 4. Resultado contractual

Esta tarea define el registro:

```text
NUMERA-AUTHORIZATION-BINDING-REGISTRY-001
```

El registro vincula:

```text
SUPERFICIE
+ PROCESO/PASO
+ ACCION EMPRESARIAL
+ RECURSO
+ SLOT DE AUTORIZACION
+ PERMISO CANONICO EXISTENTE CUANDO EXISTA
+ ESTADO DE BINDING
+ TAREA PROPIETARIA DE LA ESPECIALIZACION
+ CONTRATO SERVER-SIDE
```

Un slot de autorización es una categoría documental de acción. No es un `permission_code` y no puede utilizarse directamente en runtime.

---

#### 5. Fuentes canónicas reconciliadas

La definición consume, sin reemplazar:

1. `NUMERA-DOM-001..018`;
2. las veinte pantallas canónicas NUMERA;
3. sus vínculos `VPROC-*` y `STEP-*`;
4. el catálogo transversal de aplicaciones y permisos;
5. la normalización aprobada de permisos NUMERA;
6. las clasificaciones de modalidad, prerrequisitos y recurso;
7. la auditoría AS-IS de NUMERA;
8. los contratos globales de acciones de servidor;
9. el Registro 04A vigente;
10. la continuidad y topología documental de BLOQUE O.

La implementación observada se usa como evidencia de drift, no como autoridad para redefinir el catálogo.

---

#### 6. Regla universal de vinculación

Toda acción protegida deberá poder resolver, como mínimo:

```text
app_code
+ surface_id
+ process_id / step_id cuando aplique
+ action_semantics
+ resource_type
+ resource_identity_or_query
+ permission_slot
+ permission_code cuando ya exista canónicamente
+ principal
+ effective_actor
+ territorial_scope
+ required_context
+ current_resource_state
+ allowed_fields
+ authorization_decision
+ audit_evidence
```

Si cualquiera de los elementos obligatorios no puede resolverse con evidencia suficiente, la operación protegida falla cerrada.

---

#### 7. Acceso a aplicación no concede acceso financiero

El permiso:

```text
numera.access
```

solo permite entrar a la superficie general de NUMERA.

No concede por sí mismo:

- lectura de gastos;
- lectura de centros de costo;
- consulta de rentabilidad;
- consulta de punto de equilibrio;
- lectura de reportes financieros;
- aprobación;
- pago;
- conciliación;
- cierre o reapertura;
- exportación;
- publicación de escenarios;
- acceso irrestricto a métricas del panel inicial.

---

#### 8. Convención de códigos que debe preservarse

Los permisos canónicos siguen las formas:

```text
<app>.access
```

O:

```text
<app>.<module>.<resource>.<action>
```

Para NUMERA:

```text
app_code = numera
```

No se crean aliases nuevos ni namespaces paralelos en esta tarea.

---

#### 9. Inventario canónico vigente de permisos NUMERA

El catálogo aprobado contiene actualmente seis capacidades canónicas activas para NUMERA:

| Permiso canónico | Función protegida |
| --- | --- |
| `numera.access` | entrar a NUMERA sin conceder autoridad financiera específica |
| `numera.finance.cost_centers.view` | consultar centros de costo |
| `numera.finance.expenses.view` | consultar gastos |
| `numera.analytics.break_even.view` | consultar punto de equilibrio |
| `numera.analytics.profitability.view` | consultar rentabilidad |
| `numera.analytics.financial_reports.view` | consultar reportes financieros |

Todos conservan la modalidad `BASE_ONLY` aprobada actualmente.

---

#### 10. Contrato de recurso de los seis permisos canónicos

| Permiso | Recurso | Resolución de alcance |
| --- | --- | --- |
| `numera.access` | `APP_SURFACE` | aplicación canónica; no existe territorio empresarial implícito |
| `numera.finance.cost_centers.view` | `COST_CENTER` | organización, negocio, sede o área declarados para el centro |
| `numera.finance.expenses.view` | `EXPENSE` | centro, sede, área, documento y actor aplicables |
| `numera.analytics.break_even.view` | `BREAK_EVEN_RESULT` | todos los miembros territoriales incluidos en el agregado |
| `numera.analytics.profitability.view` | `PROFITABILITY_RESULT` | sedes, áreas, negocios, productos y centros incluidos |
| `numera.analytics.financial_reports.view` | `FINANCIAL_REPORT` | todas las dimensiones incluidas en el reporte o consulta |

Una autorización sobre un agregado no autoriza automáticamente el drill-down hacia miembros fuera del alcance del actor.

---

#### 11. Contexto vigente de los seis permisos canónicos

Los seis permisos canónicos actuales son:

```text
authorization_requirement = BASE_ONLY
```

Esto significa que su autoridad base no depende de un turno operativo.

Además, la información financiera y analítica asociada conserva tratamiento reforzado en contextos compartidos conforme al catálogo transversal vigente.

`NUMERA-AUTH-010` y `NUMERA-AUTH-011` desarrollarán el detalle de independencia administrativa y contexto operacional sin alterar esta base.

---

#### 12. Inventario runtime observado

La auditoría actual registra ocho códigos runtime NUMERA:

```text
numera.access
numera.cost_centers.view
numera.expenses.view
numera.break_even.view
numera.profitability.view
numera.reports.view
numera.cost_centers.manage
numera.expenses.manage
```

El hecho de que un código exista en runtime no lo convierte en identidad canónica vigente.

---

#### 13. Matriz de reconciliación runtime → contrato canónico

| Código runtime observado | Estado contractual | Destino o tratamiento |
| --- | --- | --- |
| `numera.access` | `CANONICAL_KEEP` | `numera.access` |
| `numera.cost_centers.view` | `LEGACY_RENAME_REQUIRED` | `numera.finance.cost_centers.view` |
| `numera.expenses.view` | `LEGACY_RENAME_REQUIRED` | `numera.finance.expenses.view` |
| `numera.break_even.view` | `LEGACY_RENAME_REQUIRED` | `numera.analytics.break_even.view` |
| `numera.profitability.view` | `LEGACY_RENAME_REQUIRED` | `numera.analytics.profitability.view` |
| `numera.reports.view` | `LEGACY_RENAME_REQUIRED` | `numera.analytics.financial_reports.view` |
| `numera.cost_centers.manage` | `DECOMPOSE_REQUIRED` | no puede permanecer como autoridad amplia |
| `numera.expenses.manage` | `DECOMPOSE_REQUIRED` | no puede permanecer como autoridad amplia |

Esta tarea documenta la reconciliación; no ejecuta el rename, la descomposición ni la migración de concesiones.

---

#### 14. Familias de descomposición ya documentadas

El catálogo transversal ya registra como objetivos de descomposición, sin declararlos todavía catálogo activo definitivo:

```text
numera.finance.cost_centers.view
numera.finance.cost_centers.create
numera.finance.cost_centers.update
numera.finance.cost_centers.activate
numera.finance.cost_centers.deactivate
```

Y:

```text
numera.finance.expenses.view
numera.finance.expenses.create
numera.finance.expenses.update
numera.finance.expenses.approve
numera.finance.expenses.cancel
```

La presencia de estos nombres en la descomposición aprobada no autoriza su uso como permisos runtime hasta que el lifecycle correspondiente los materialice.

---

#### 15. `manage` no es una autoridad aceptable como contrato objetivo

Queda prohibido conservar como diseño final:

```text
*.manage = leer + crear + editar + aprobar + cancelar + cualquier otra acción
```

Cada acción sensible deberá tener autoridad suficientemente atómica para permitir segregación, auditoría y denegación independiente.

---

#### 16. Slots documentales de autorización

Se definen los siguientes slots de acción para vincular superficies sin inventar códigos:

| Slot | Semántica |
| --- | --- |
| `APP_ACCESS` | entrar a NUMERA |
| `READ` | consultar recurso o resultado autorizado |
| `REGISTER` | crear o registrar un hecho/objeto financiero permitido |
| `UPDATE` | modificar un objeto mutable dentro de campos permitidos |
| `APPROVE` | emitir decisión aprobatoria independiente |
| `PAY_EXECUTE` | iniciar o confirmar ejecución de pago autorizada |
| `RECONCILE` | decidir y registrar conciliación sin reescribir fuentes |
| `CLOSE` | cerrar un periodo o ciclo gobernado |
| `REOPEN` | reabrir bajo autoridad distinta y evidencia |
| `WRITE_OFF` | castigar o reconocer baja autorizada |
| `EXPORT` | producir copia financiera fuera de la superficie de consulta |
| `SCENARIO_CREATE` | crear versión o escenario |
| `SCENARIO_SHARE` | compartir escenario sin publicarlo |
| `SCENARIO_APPROVE` | aprobar escenario, precio o presupuesto |
| `SCENARIO_PUBLISH` | publicar una versión autorizada |
| `CONFIGURE` | modificar configuración financiera gobernada |

Estos valores son semántica documental y no `permission_code`.

---

#### 17. Estados de binding permitidos

Cada fila del registro usa uno de estos estados:

```text
CANONICAL_PERMISSION_BOUND
CANONICAL_PERMISSION_PARTIAL
LEGACY_PERMISSION_ONLY
DECOMPOSITION_REQUIRED
EXACT_PERMISSION_RESERVED
NO_PERMISSION_REQUIRED_FOR_PUBLIC_CONTROLLED_SURFACE
```

`EXACT_PERMISSION_RESERVED` significa que la acción está identificada pero el código exacto pertenece a una tarea posterior.

---

#### 18. Universo objetivo de superficies NUMERA

El catálogo vigente contiene exactamente veinte pantallas canónicas NUMERA:

```text
VSCREEN-0094..VSCREEN-0106 = 13
VSCREEN-0153..VSCREEN-0159 = 7
TOTAL = 20
```

La cardinalidad de rutas AS-IS no se usa para reducir ni expandir este universo.

---

#### 19. Registro de bindings — VSCREEN-0094 a VSCREEN-0100

| Pantalla | Paso canónico | Acción dominante | Slots obligatorios | Binding actual |
| --- | --- | --- | --- | --- |
| `VSCREEN-0094` Inicio financiero y ejecutivo | `VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION` | `MONITOR` | `APP_ACCESS` + `READ` por cada dato/resultado | `CANONICAL_PERMISSION_PARTIAL`; `numera.access` solo cubre entrada |
| `VSCREEN-0095` Bandeja de hechos económicos | `VPROC-0051::STEP-TRIAGE_ECONOMIC_FACTS` | `TRIAGE` | `READ` + `REGISTER/UPDATE` según decisión | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0096` Registro de gasto y soporte | `VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE` | `CAPTURE` | `READ` + `REGISTER` | lectura canónica existente; mutación `DECOMPOSITION_REQUIRED` |
| `VSCREEN-0097` Bandeja de aprobaciones financieras | `VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION` | `APPROVE` | `READ` + `APPROVE` | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0098` Cuentas por pagar y obligaciones | `VPROC-0052::STEP-MANAGE_PAYABLE_OBLIGATION` | `EXECUTE` | `READ` + `REGISTER/UPDATE` + `APPROVE/PAY_EXECUTE` según acción | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0099` Cuentas por cobrar y cartera | `VPROC-0053::STEP-MANAGE_RECEIVABLE` | `EXECUTE` | `READ` + `REGISTER/UPDATE` + `RECONCILE/WRITE_OFF` según acción | `EXACT_PERMISSION_RESERVED`; detalle sensible en `NUMERA-AUTH-014` |
| `VSCREEN-0100` Caja, bancos y movimientos financieros | `VPROC-0052::STEP-EXECUTE_TREASURY_MOVEMENT` | `EXECUTE` | `READ` + `PAY_EXECUTE/RECONCILE` | `EXACT_PERMISSION_RESERVED`; detalle sensible en `NUMERA-AUTH-014` |

---

#### 20. Registro de bindings — VSCREEN-0101 a VSCREEN-0106

| Pantalla | Paso canónico | Acción dominante | Slots obligatorios | Binding actual |
| --- | --- | --- | --- | --- |
| `VSCREEN-0101` Conciliación de ventas y pagos | `VPROC-0051::STEP-RECONCILE_SALES_AND_PAYMENTS` | `RECONCILE` | `READ` + `RECONCILE` | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0102` Conciliación de compras y recepciones | `VPROC-0051::STEP-RECONCILE_PURCHASES_AND_RECEIPTS` | `RECONCILE` | `READ` + `RECONCILE` | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0103` Conciliación de inventario, producción y variaciones | `VPROC-0054::STEP-RECONCILE_OPERATING_VARIANCES` | `RECONCILE` | `READ` + `RECONCILE` | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0104` Costos, rentabilidad y escenarios | `VPROC-0054::STEP-ANALYZE_COST_AND_PROFITABILITY` | `ANALYZE` | `READ`; acciones de escenario usan slots especializados | `CANONICAL_PERMISSION_PARTIAL`; rentabilidad y equilibrio tienen permisos de lectura existentes |
| `VSCREEN-0105` Cierre, reapertura y corrección de periodo | `VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD` | `CLOSE` | `READ` + `CLOSE` + `REOPEN` + autorización de corrección aplicable | `EXACT_PERMISSION_RESERVED` a `NUMERA-AUTH-006` |
| `VSCREEN-0106` Reportes y exportaciones financieras | `VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT` | `PUBLISH` | `READ` + `EXPORT` y publicación cuando corresponda | lectura canónica existente; exportación reservada a `NUMERA-AUTH-007` |

---

#### 21. Registro de bindings — VSCREEN-0153 a VSCREEN-0159

| Pantalla | Paso canónico | Acción dominante | Slots obligatorios | Binding actual |
| --- | --- | --- | --- | --- |
| `VSCREEN-0153` Paquete laboral para pagos y beneficios | `VPROC-0010::STEP-PREPARE_LABOR_PAYMENT_PACKAGE` | `RECONCILE` | `READ` + `RECONCILE` | `EXACT_PERMISSION_RESERVED`; deberá preservar fronteras laborales |
| `VSCREEN-0154` Facturas y documentos fiscales | `VPROC-0051::STEP-MANAGE_FISCAL_DOCUMENT` | `EXECUTE` | `READ` + `REGISTER/UPDATE/APPROVE` según acción interna permitida | `EXACT_PERMISSION_RESERVED`; autoridad fiscal externa no se adquiere |
| `VSCREEN-0155` Tesorería y programación de pagos | `VPROC-0052::STEP-PLAN_AND_EXECUTE_PAYMENTS` | `PLAN` | `READ` + `APPROVE/PAY_EXECUTE/RECONCILE` según etapa | `EXACT_PERMISSION_RESERVED`; detalle sensible en `NUMERA-AUTH-014` |
| `VSCREEN-0156` Presupuestos, escenarios y forecast | `VPROC-0069::STEP-PLAN_BUDGET_AND_FORECAST` | `PLAN` | `READ` + `SCENARIO_CREATE/SHARE/APPROVE/PUBLISH` | `EXACT_PERMISSION_RESERVED` a `NUMERA-AUTH-015` |
| `VSCREEN-0157` Impuestos y obligaciones de cumplimiento | `VPROC-0052::STEP-MANAGE_TAX_OBLIGATION` | `EXECUTE` | `READ` + `REGISTER/UPDATE/APPROVE/PAY_EXECUTE` según acción | `EXACT_PERMISSION_RESERVED`; no concede presentación oficial externa |
| `VSCREEN-0158` Distribución y asignación de costos | `VPROC-0054::STEP-ALLOCATE_COSTS` | `EXECUTE` | `READ` + `REGISTER/UPDATE/APPROVE` y reversión gobernada | `EXACT_PERMISSION_RESERVED` |
| `VSCREEN-0159` Indicadores, análisis y planes de mejora | `VPROC-0061::STEP-ANALYZE_AND_PLAN_IMPROVEMENT` | `ANALYZE` | `READ` + autoridad de decisión cuando exista una acción material | `EXACT_PERMISSION_RESERVED` para acciones mutantes; lectura depende del resultado mostrado |

---

#### 22. Una pantalla puede requerir múltiples permisos

Una pantalla es una superficie de experiencia, no una capacidad atómica.

Por tanto:

```text
1 VSCREEN
-> 1..N acciones
-> 1..N permission slots
-> 1..N permission_code canónicos cuando estén definidos
```

No se creará un permiso genérico equivalente a “usar toda la pantalla” para evitar esta separación.

---

#### 23. Un permiso no transfiere propiedad de proceso

La vinculación de una acción NUMERA con un permiso no cambia:

- la aplicación propietaria del proceso;
- la fuente del hecho operativo;
- la propiedad de datos de PULSO, ORIGO, NEXO, FOGO, PASS, ANIMA o VISO;
- la autoridad de proveedores bancarios, contables o fiscales externos.

Autorización de consumo o acción dentro de NUMERA no equivale a propiedad universal del objeto relacionado.

---

#### 24. Superficies AS-IS controladas

El snapshot auditado contiene siete páginas físicas:

```text
/
/login
/no-access
/cost-centers
/expenses
/break-even
/profitability
```

Cinco son superficies protegidas de negocio y dos son superficies públicas controladas.

La existencia de estas páginas no reduce el universo objetivo de veinte pantallas canónicas.

---

#### 25. Binding AS-IS de la raíz `/`

La raíz exige actualmente:

```text
numera.access
```

Este binding se conserva únicamente como control de entrada.

La ausencia de un `permission_code` analítico específico en la página no autoriza a presentar todas las métricas al actor. Cada resultado deberá quedar protegido por la capacidad financiera aplicable y por las fuentes autorizadas que lo componen.

---

#### 26. Binding AS-IS de `/cost-centers`

Lectura observada:

```text
numera.cost_centers.view
```

Destino canónico:

```text
numera.finance.cost_centers.view
```

Mutación observada:

```text
numera.cost_centers.manage
```

El código `manage` permanece `DECOMPOSE_REQUIRED` y no puede tratarse como autoridad objetivo.

---

#### 27. `upsertBudget` no hereda autoridad de centro de costo por nombre

La acción AS-IS `upsertBudget` está protegida actualmente por:

```text
numera.cost_centers.manage
```

Sin embargo, la acción muta una meta/presupuesto por periodo y centro, no el maestro de identidad del centro de costo.

Por tanto:

```text
RUNTIME_GUARD_NAME
!= TARGET_BUSINESS_PERMISSION
```

El permiso exacto objetivo de creación/modificación/aprobación/publicación presupuestal se resuelve bajo `NUMERA-AUTH-015` y las tareas generales aplicables. No se reasigna por inferencia a `numera.finance.cost_centers.update`.

---

#### 28. Binding AS-IS de `/expenses`

Lectura observada:

```text
numera.expenses.view
```

Destino canónico:

```text
numera.finance.expenses.view
```

Mutación observada:

```text
numera.expenses.manage
```

El código `manage` permanece `DECOMPOSE_REQUIRED`.

---

#### 29. `createExpense` se vincula a REGISTER, no a autoridad amplia

La acción AS-IS `createExpense` representa registro de gasto.

Su slot objetivo es:

```text
REGISTER
```

El catálogo ya documenta `numera.finance.expenses.create` como candidato de descomposición, pero esta tarea no lo materializa ni lo declara concedido.

La definición exacta de permisos de registro pertenece a `NUMERA-AUTH-004`.

---

#### 30. Bindings AS-IS de analítica

Se reconcilia:

```text
numera.break_even.view
-> numera.analytics.break_even.view
```

Y:

```text
numera.profitability.view
-> numera.analytics.profitability.view
```

Ambos son permisos de lectura, no permisos para cambiar fórmulas, costos, presupuestos, hechos o escenarios.

---

#### 31. Permiso de reportes sin consumidor actual

El runtime contiene:

```text
numera.reports.view
```

pero la auditoría no localizó consumidor actual de esa capacidad.

La identidad canónica es:

```text
numera.analytics.financial_reports.view
```

La existencia de la concesión legacy no debe habilitar una exportación inexistente ni crear una superficie por inferencia.

---

#### 32. Lectura, registro, aprobación, cierre y exportación permanecen separados

Se preserva:

```text
READ
!= REGISTER
!= APPROVE
!= CLOSE
!= REOPEN
!= EXPORT
```

Una concesión de lectura nunca se eleva por conveniencia a una acción mutante.

---

#### 33. Pago, conciliación y castigo permanecen separados

Conforme al dominio financiero:

```text
REGISTER
!= APPROVE
!= PAY_EXECUTE
!= RECONCILE
!= WRITE_OFF
```

`NUMERA-AUTH-014` desarrollará las capacidades sensibles de cartera, acuerdos, castigos, bancos y datos financieros sin fusionarlas en una autoridad general.

---

#### 34. Escenarios y presupuestos usan autoridad específica

Se preserva:

```text
SCENARIO_CREATE
!= SCENARIO_SHARE
!= SCENARIO_APPROVE
!= SCENARIO_PUBLISH
```

Además:

```text
SCENARIO_PUBLISH
!= OPERATIONAL_PRICE_ACTIVATION
!= ACCOUNTING_POSTING
```

El permiso exacto para estas acciones pertenece a `NUMERA-AUTH-015`.

---

#### 35. Reportar no equivale a exportar

El permiso:

```text
numera.analytics.financial_reports.view
```

no implica `EXPORT`.

Toda exportación futura necesita permiso independiente, revalidación de alcance y evidencia propia conforme a `NUMERA-AUTH-007`.

---

#### 36. Cierre y reapertura no comparten autoridad por defecto

La superficie `VSCREEN-0105` contiene acciones con semántica distinta:

```text
CLOSE != REOPEN != CORRECT
```

`NUMERA-AUTH-006` deberá definir la autoridad exacta respetando la historia, el estado vigente del periodo y las restricciones aprobadas por dominio.

---

#### 37. La interfaz nunca es autoridad final

Visibilidad de:

- botón;
- formulario;
- pestaña;
- menú;
- ruta;
- pantalla;
- acción sugerida;

no constituye autorización.

Toda mutación protegida revalida en servidor la capacidad exacta y el recurso efectivo antes del efecto.

---

#### 38. Contrato server-side mínimo

Antes de una mutación protegida debe resolverse:

```text
request_intent
+ principal_resuelto_en_servidor
+ actor_efectivo
+ permission_code_exact_when_defined
+ resource_current_state
+ territory_and_context
+ allowed_fields
+ canonical_business_rules
= authorized_effect
```

Está prohibido tratar el payload recibido del cliente como autoridad final.

---

#### 39. Cálculos del cliente no conceden autoridad

Valores mostrados o enviados por UI como:

- total;
- saldo;
- margen;
- precio;
- presupuesto restante;
- conflicto;
- disponibilidad;
- permiso calculado;

se consideran información que el servidor debe validar o recomputar cuando sea material para la decisión.

---

#### 40. Protección contra mass assignment

Una acción financiera no podrá persistir indiscriminadamente un objeto controlado por cliente.

Cada mutación debe usar allowlist explícita de campos y reconstruir en servidor:

- actor;
- principal;
- estado inicial protegido;
- territorio;
- ownership;
- timestamps de autoridad;
- identidad de aprobador/publicador;
- otros campos derivados.

---

#### 41. Regla de recurso exacto

La autorización se evalúa contra el recurso realmente afectado, no únicamente contra el módulo visible.

Ejemplos:

```text
EXPENSE
COST_CENTER
FINANCIAL_REPORT
RECEIVABLE
PAYABLE
BANK_ACCOUNT_OR_MOVEMENT
ECONOMIC_FACT
PERIOD
SCENARIO_VERSION
```

Las identidades no definidas todavía como tipos canónicos de autorización permanecen slots documentales hasta sus tareas propietarias; esta tarea no crea un catálogo transversal nuevo de recursos.

---

#### 42. Agregados financieros requieren autorización de miembros

Para break-even, rentabilidad, reportes y otros resultados agregados:

```text
AUTHORIZED_AGGREGATE
requires
AUTHORIZED_INCLUDED_DIMENSIONS
```

La agregación no puede ocultar una elevación de acceso hacia sedes, centros, productos, áreas, negocios o documentos que el actor no podría consultar directamente.

---

#### 43. Propiedad personal no elimina alcance territorial

Cuando un recurso admita relación `OWN`, esa relación no elimina controles por:

- empresa o entidad;
- sede;
- centro;
- área;
- estado;
- sensibilidad;
- campos permitidos.

La propiedad es una dimensión de alcance, no un bypass.

---

#### 44. Rol no concede autorización final por nombre

Se conserva la regla transversal:

```text
ROLE_NAME
!= FINAL_AUTHORIZATION
```

Owner, gerente, responsable financiero, contador u otro rol empresarial puede ser fuente de concesiones, pero la acción protegida debe resolver el permiso y contexto canónicos correspondientes.

---

#### 45. Principal y actor efectivo deben permanecer distinguibles

Toda decisión sensible deberá conservar, según aplique:

```text
principal
!= effective_actor cuando exista delegacion/simulacion/contexto derivado
```

No se atribuirá una acción a una identidad distinta de quien realmente ejerció la autoridad efectiva.

---

#### 46. Turno y check-in no se infieren para capacidades base

Los seis permisos canónicos actuales son `BASE_ONLY`.

Por tanto, no se agregará turno o check-in como requisito artificial para sus acciones de lectura administrativa.

Las acciones operacionales futuras que sí requieran contexto deberán declararlo expresamente bajo `NUMERA-AUTH-011`; la clasificación híbrida de la aplicación no basta.

---

#### 47. Información financiera reforzada en dispositivo compartido

El catálogo vigente trata las capacidades financieras y analíticas NUMERA con requisito reforzado en contexto compartido.

La autorización deberá resolver la condición vigente de sesión/reautenticación sin convertir el dispositivo compartido en nueva identidad de usuario ni en permiso.

El detalle de sensibilidad se desarrolla en `NUMERA-AUTH-002`.

---

#### 48. Denegación segura

Una denegación debe:

- impedir el efecto;
- no filtrar datos adicionales;
- no convertir `null`, error o contexto desconocido en acceso global;
- conservar evidencia suficiente para auditoría;
- no ser reparada por la interfaz mediante fallback permisivo.

---

#### 49. La navegación no es catálogo de autoridad

`app_navigation_items`, `app_screen_registry`, rutas o menú pueden declarar requisitos de visibilidad, pero no son la fuente final de autoridad de una mutación.

Se conserva:

```text
NAVIGATION_VISIBLE
!= ACTION_AUTHORIZED
```

---

#### 50. Proceso y paso tampoco son permisos

`VPROC-*` y `STEP-*` describen semántica empresarial y lifecycle.

No son `permission_code`.

Su función en este registro es impedir que dos acciones con nombres similares reciban una autoridad equivocada por pertenecer a procesos distintos.

---

#### 51. Integración externa no concede autoridad interna

Una respuesta de banco, proveedor fiscal, sistema contable o integrador externo puede ser evidencia o resultado del proceso correspondiente.

No concede al actor local un permiso NUMERA que no poseía antes de iniciar la operación.

---

#### 52. Autoridad interna no sustituye autoridad externa

Un permiso NUMERA puede autorizar preparar, revisar, enviar o reconciliar una operación interna cuando el contrato lo permita.

No convierte por sí mismo a NUMERA en:

- banco;
- emisor fiscal autorizado;
- autoridad tributaria;
- libro contable oficial externo;
- presentador regulatorio.

---

#### 53. Simulación de autorización no concede capacidad real

Se preserva:

```text
SIMULATED_AUTHORIZATION_RESULT
!= REAL_PERMISSION_GRANT
```

Una preview o simulación podrá explicar el resultado esperado, pero no podrá usarse como token de autoridad para ejecutar una acción real.

---

#### 54. Regla de aliases y transición

Durante una migración futura podrá existir coexistencia temporal entre código legacy y canónico únicamente si el contrato transversal de autorización lo gobierna explícitamente.

La transición deberá:

1. conservar historial;
2. evitar doble concesión efectiva;
3. impedir que un alias amplíe alcance;
4. identificar consumidores;
5. retirar el alias mediante lifecycle verificable.

Esta tarea no ejecuta esa transición.

---

#### 55. Prohibición de fallback a legacy `manage`

Si una acción nueva no encuentra su permiso exacto, queda prohibido usar como fallback:

```text
numera.cost_centers.manage
```

O:

```text
numera.expenses.manage
```

La ausencia de permiso exacto produce bloqueo de la materialización afectada hasta que la tarea propietaria defina y publique la capacidad correspondiente.

---

#### 56. Prohibición de wildcard financiero

No se aprueba ninguna autoridad equivalente a:

```text
numera.*
numera.finance.*
numera.analytics.*
```

como permiso de negocio concedible por esta tarea.

Los namespaces agrupan códigos; no sustituyen capacidades atómicas.

---

#### 57. Matriz de ownership de especialización posterior

| Materia | Propietario documental |
| --- | --- |
| clasificación detallada de sensibilidad financiera | `NUMERA-AUTH-002` |
| permisos exactos de lectura | `NUMERA-AUTH-003` |
| permisos exactos de registro | `NUMERA-AUTH-004` |
| permisos exactos de aprobación | `NUMERA-AUTH-005` |
| permisos de cierre/reapertura aplicables | `NUMERA-AUTH-006` |
| permisos de exportación | `NUMERA-AUTH-007` |
| límites por empresa, sede y centro | `NUMERA-AUTH-008` |
| evidencia de auditoría financiera | `NUMERA-AUTH-009` |
| independencia administrativa de turno | `NUMERA-AUTH-010` |
| contexto operacional cuando aplique | `NUMERA-AUTH-011` |
| materialización en paquetes compartidos | `NUMERA-AUTH-012` |
| pruebas integrales | `NUMERA-AUTH-013` |
| cartera, acuerdos, castigos, bancos y datos sensibles | `NUMERA-AUTH-014` |
| escenarios, precios y presupuestos | `NUMERA-AUTH-015` |

---

#### 58. Materialización física queda diferida

La futura implementación podrá requerir cambios en:

- catálogo de permisos;
- aliases/migración de códigos;
- role grants;
- guards;
- Server Actions;
- API/RPC;
- RLS;
- navegación;
- auditoría;
- tests.

Esos cambios no son parte de `NUMERA-AUTH-001` y deberán ejecutarse únicamente mediante los packages e instancias físicas canónicas que correspondan.

---

#### 59. Hallazgos y condiciones de salida

| Hallazgo | Bloquea esta definición | Propietario | Condición de salida |
| --- | --- | --- | --- |
| seis códigos de lectura runtime divergen del namespace canónico o incluyen alias legacy | no | `NUMERA-AUTH-012` + lifecycle transversal de autorización | código canónico, aliases, grants y consumidores quedan migrados y probados |
| `numera.cost_centers.manage` es demasiado amplio | no | `NUMERA-AUTH-015` para presupuesto; tareas de configuración que correspondan para maestro de centro | cada acción real tiene permiso exacto y el legacy deja de conceder autoridad amplia |
| `numera.expenses.manage` es demasiado amplio | no | `NUMERA-AUTH-004` y `NUMERA-AUTH-005` | registrar, modificar, aprobar y cancelar quedan separados conforme al flujo real |
| panel raíz usa `numera.access` sin permiso analítico específico a nivel de página | no | `NUMERA-AUTH-003` + UX propietaria | cada dato/resultado mostrado se autoriza por capacidad y alcance verificables |
| `numera.reports.view` no tiene consumidor runtime localizado | no | `NUMERA-AUTH-007` + UX propietaria + migración de catálogo | lectura canónica se vincula a superficie real o el legacy se retira sin crear exportación implícita |
| múltiples pantallas objetivo aún no poseen permiso exacto | no | `NUMERA-AUTH-003..007`, `014`, `015` según materia | cada acción queda ligada a código atómico aprobado antes de materialización |

---

#### 60. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 61. Cobertura de prueba vigente reutilizada

La tarea reutiliza, sin modificar, cobertura ya registrada para:

- `TREQ-NUMERA-001` — separación de permisos de lectura, registro, aprobación, cierre y exportación con trazabilidad financiera;
- `TREQ-NUMERA-002` — identidad y dimensiones de hechos económicos y preparación para integraciones posteriores;
- `TREQ-NUMERA-003` — separación de registrar, aprobar, pagar, conciliar, cerrar, reabrir, castigar y exportar;
- `TREQ-NUMERA-014` — `numera.access` no concede lectura total de métricas del panel raíz;
- `TREQ-NUMERA-015` a `TREQ-NUMERA-020` — guards y acciones AS-IS de centros, gastos, equilibrio y rentabilidad;
- `TREQ-NUMERA-023` — ruta, registro o menú no implican permiso definitivo ni autorización de acción;
- `TREQ-AUTH-001` — capacidad protegida resuelta mediante permisos, contexto y alcance canónicos;
- `TREQ-AUTH-013` — revalidación server-side de permiso, actor, territorio, recurso, estado y campos permitidos;
- `TREQ-AUTH-015` — evidencia correlacionable de principal, actor, contexto, permiso, recurso y decisión.

No corresponde actualizar el Registro 04A.

---

#### 62. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea es documental; no se ejecutó build de producto durante su preparación. |
| LOCAL | NOT_EXECUTED | No se incorporó el bloque al checkout local del usuario ni se ejecutaron validadores locales sobre el repositorio modificado. |
| REMOTA | PASS | Se verificaron `main`, protocolo, contrato de entrega, manifest, continuidad, topología, archivo propietario, catálogo de permisos NUMERA, clasificación de modalidad, prerrequisitos, contrato de recursos, auditoría NUMERA, veinte pantallas canónicas, vínculos proceso/paso, 04A NUMERA/AUTH y contratos globales de servidor. |
| OPERATIVA | NOT_EXECUTED | No se concedieron permisos ni se ejecutaron gastos, pagos, conciliaciones, cierres, exportaciones, escenarios u otras acciones financieras. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-AUTH-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no materializa controles runtime. |

---

#### 63. Criterios de aceptación

La tarea queda aceptada cuando se demuestre documentalmente que:

1. existe exactamente un registro de vinculación de autorización para NUMERA;
2. el universo objetivo conserva exactamente veinte pantallas canónicas;
3. cada pantalla conserva su proceso/paso canónico;
4. ninguna pantalla se convierte en permiso;
5. ningún proceso o paso se convierte en permiso;
6. `numera.access` solo gobierna entrada general;
7. los seis permisos canónicos actuales se preservan sin renombrarlos nuevamente;
8. los ocho códigos runtime observados quedan reconciliados;
9. los cinco códigos de lectura legacy se vinculan a sus nombres canónicos correspondientes;
10. `numera.reports.view` se vincula a `numera.analytics.financial_reports.view` sin crear consumidor ficticio;
11. `numera.cost_centers.manage` queda `DECOMPOSE_REQUIRED`;
12. `numera.expenses.manage` queda `DECOMPOSE_REQUIRED`;
13. las familias de descomposición existentes no se presentan como grants activos;
14. `upsertBudget` no se reclasifica como edición de maestro de centro por el nombre del guard legacy;
15. `createExpense` queda clasificado como `REGISTER`;
16. lectura y mutación permanecen separadas;
17. aprobación y pago permanecen separados;
18. conciliación permanece independiente;
19. cierre y reapertura permanecen independientes;
20. exportación no se deriva de lectura de reportes;
21. escenarios separan crear, compartir, aprobar y publicar;
22. publicar escenario no activa precio operativo ni posteo contable;
23. cada acción sin permiso exacto tiene tarea propietaria posterior;
24. no se inventan códigos de permisos;
25. no se aprueban wildcards de negocio;
26. no se usa `manage` como fallback;
27. los permisos actuales conservan `BASE_ONLY`;
28. no se impone turno/check-in artificial a lectura administrativa;
29. contexto operacional futuro requiere declaración explícita;
30. agregado financiero no expone miembros no autorizados;
31. ownership personal no bypassa territorio;
32. rol no equivale a autorización final;
33. principal y actor efectivo permanecen trazables;
34. interfaz, navegación y visibilidad no conceden autoridad;
35. toda mutación se revalida server-side;
36. cálculos del cliente no son autoridad;
37. mass assignment queda prohibido;
38. recurso y estado actual forman parte de la decisión;
39. integración externa no concede permiso interno;
40. permiso interno no sustituye autoridad bancaria, fiscal o contable externa;
41. simulación de autorización no concede autoridad real;
42. aliases futuros no amplían alcance;
43. la materialización física permanece fuera de esta tarea;
44. no se crean ni modifican requisitos de prueba;
45. no se realizan cambios físicos;
46. `NUMERA-AUTH-002` recibe un registro estable sobre el cual clasificar sensibilidad financiera.

---

#### 64. Límites

Esta tarea no:

- crea permisos runtime nuevos;
- modifica los seis permisos canónicos existentes;
- ejecuta rename o aliases;
- migra grants;
- modifica roles;
- define todavía todos los códigos exactos de lectura;
- define códigos exactos de registro;
- define códigos exactos de aprobación;
- define códigos exactos de cierre o reapertura;
- define códigos exactos de exportación;
- define permisos exactos de cartera/bancos/castigos;
- define permisos exactos de escenarios/precios/presupuestos;
- clasifica exhaustivamente sensibilidad financiera;
- implementa territorio o filtros por empresa/sede/centro;
- crea auditoría física;
- cambia dependencia de turno;
- crea contexto operacional;
- migra paquetes compartidos;
- ejecuta pruebas integrales;
- modifica pantallas o procesos;
- modifica Supabase;
- modifica Registro 04A;
- desarrolla `NUMERA-AUTH-002`.

---

#### 65. Handoff a NUMERA-AUTH-002

La siguiente tarea recibe:

```text
NUMERA_AUTHORIZATION_BINDING_REGISTRY = NUMERA-AUTHORIZATION-BINDING-REGISTRY-001
NUMERA_CANONICAL_SCREEN_COUNT = 20
NUMERA_CURRENT_CANONICAL_PERMISSION_COUNT = 6
NUMERA_OBSERVED_RUNTIME_PERMISSION_COUNT = 8
NUMERA_CURRENT_CANONICAL_PERMISSIONS_ARE_BASE_ONLY = YES
APP_ACCESS_IMPLIES_FINANCIAL_DATA_READ = NO
SCREEN_VISIBILITY_IMPLIES_ACTION_AUTHORITY = NO
PROCESS_STEP_IMPLIES_PERMISSION = NO
ROLE_NAME_IMPLIES_FINAL_AUTHORIZATION = NO
LEGACY_COST_CENTERS_MANAGE = DECOMPOSE_REQUIRED
LEGACY_EXPENSES_MANAGE = DECOMPOSE_REQUIRED
ROOT_NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
REPORT_VIEW_IMPLIES_EXPORT = NO
READ_REGISTER_APPROVE_PAY_RECONCILE_CLOSE_REOPEN_WRITE_OFF_EXPORT = DISTINCT
SCENARIO_CREATE_SHARE_APPROVE_PUBLISH = DISTINCT
MISSING_EXACT_PERMISSION_FALLBACK_TO_MANAGE = FORBIDDEN
FINANCIAL_WILDCARD_GRANT = FORBIDDEN
MUTATION_AUTHORIZATION_REVALIDATED_SERVER_SIDE = YES
CLIENT_CALCULATION_IS_AUTHORITY = NO
AUTHORIZATION_REQUIRES_RESOURCE_AND_CURRENT_STATE = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
SIMULATED_AUTHORIZATION_GRANTS_REAL_AUTHORITY = NO
NUMERA_AUTH_002_OWNER = FINANCIAL_SENSITIVITY_CLASSIFICATION
TREQ_CHANGES = 0
```

`NUMERA-AUTH-002` deberá clasificar la sensibilidad de la información y de los recursos financieros vinculados por este registro sin alterar las identidades de pantalla, procesos, pasos ni permisos que aquí quedaron preservados.

---

#### 66. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-DOM-018 — Definir motor de escenarios, versiones de precios, costos, supuestos y publicación`

**TAREA ACTUAL APROBADA**
`NUMERA-AUTH-001 — Vincular módulos y acciones con permisos y contratos aprobados`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUTH-002 — Clasificar información financiera sensible`
### ✅ NUMERA-AUTH-002 — Clasificar información financiera sensible

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUTH-001 — Vincular módulos y acciones con permisos y contratos aprobados
**Tarea siguiente:** NUMERA-AUTH-003 — Definir permisos de lectura
**Tipo de tarea:** clasificación documental exhaustiva de sensibilidad para información, recursos, proyecciones y artefactos financieros de NUMERA, consumiendo el registro de bindings aprobado, los motivos canónicos de sensibilidad de autorización y el vocabulario cerrado de sensibilidad de eventos sin crear un tercer enum, sin inventar permisos ni materializar controles físicos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/04_AUTORIZACION_FINANCIERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica permisos runtime, catálogo de autorización, roles, grants, RLS, RPC, Server Actions, pantallas, procesos, eventos, contratos TypeScript, Supabase, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Clasificar qué información de NUMERA debe tratarse como financiera sensible y qué reglas de minimización, proyección, exposición y transferencia se derivan de esa clasificación antes de definir permisos de lectura, registro, aprobación, cierre, exportación y capacidades financieras especializadas.

La tarea consume el registro de bindings aprobado por `NUMERA-AUTH-001` y responde, para cada familia de información:

- qué motivo canónico de sensibilidad aplica;
- cuándo coexiste sensibilidad financiera con sensibilidad personal, comercial, de auditoría, inventario o secreto empresarial;
- cómo se proyecta la información hacia pantallas, eventos, integraciones, exportaciones, logs y dispositivos;
- qué información nunca debe convertirse en autoridad por estar visible;
- qué fronteras debe consumir `NUMERA-AUTH-003` al definir permisos de lectura.

---

#### 2. Naturaleza y topología

La reconciliación propietaria de `NUMERA-AUTH-001..007` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto, `NUMERA-AUTH-002`:

- se define una sola vez;
- no crea instancia física propia;
- no ejecuta migraciones;
- no modifica Supabase;
- no crea ni cambia permisos;
- no cambia la clasificación `authorization_requirement`;
- no cambia `is_sensitive` del catálogo transversal;
- no modifica contratos de eventos;
- no materializa máscaras, filtros ni RLS;
- entrega un contrato documental consumible por las tareas posteriores.

---

#### 3. Handoff recibido de NUMERA-AUTH-001

La tarea anterior entrega:

```text
NUMERA_AUTHORIZATION_BINDING_REGISTRY = NUMERA-AUTHORIZATION-BINDING-REGISTRY-001
NUMERA_CANONICAL_SCREEN_COUNT = 20
NUMERA_CURRENT_CANONICAL_PERMISSION_COUNT = 6
NUMERA_OBSERVED_RUNTIME_PERMISSION_COUNT = 8
NUMERA_CURRENT_CANONICAL_PERMISSIONS_ARE_BASE_ONLY = YES
APP_ACCESS_IMPLIES_FINANCIAL_DATA_READ = NO
SCREEN_VISIBILITY_IMPLIES_ACTION_AUTHORITY = NO
PROCESS_STEP_IMPLIES_PERMISSION = NO
ROLE_NAME_IMPLIES_FINAL_AUTHORIZATION = NO
LEGACY_COST_CENTERS_MANAGE = DECOMPOSE_REQUIRED
LEGACY_EXPENSES_MANAGE = DECOMPOSE_REQUIRED
ROOT_NUMERA_ACCESS_IS_METRIC_AUTHORITY = NO
REPORT_VIEW_IMPLIES_EXPORT = NO
READ_REGISTER_APPROVE_PAY_RECONCILE_CLOSE_REOPEN_WRITE_OFF_EXPORT = DISTINCT
SCENARIO_CREATE_SHARE_APPROVE_PUBLISH = DISTINCT
MISSING_EXACT_PERMISSION_FALLBACK_TO_MANAGE = FORBIDDEN
FINANCIAL_WILDCARD_GRANT = FORBIDDEN
MUTATION_AUTHORIZATION_REVALIDATED_SERVER_SIDE = YES
CLIENT_CALCULATION_IS_AUTHORITY = NO
AUTHORIZATION_REQUIRES_RESOURCE_AND_CURRENT_STATE = YES
AGGREGATE_AUTHORIZATION_REQUIRES_AUTHORIZED_MEMBERS = YES
SIMULATED_AUTHORIZATION_GRANTS_REAL_AUTHORITY = NO
NUMERA_AUTH_002_OWNER = FINANCIAL_SENSITIVITY_CLASSIFICATION
TREQ_CHANGES = 0
```

Esta tarea no altera ninguna de esas decisiones.

---

#### 4. Resultado contractual

Queda definido el contrato documental de sensibilidad financiera de NUMERA con cuatro reglas nucleares:

```text
PERMISSION_SENSITIVITY
!= DATA_SENSITIVITY
!= EVENT_SENSITIVITY
!= DEVICE_INTERACTION_CLASS
```

```text
FINANCIAL_DATA_VISIBLE
!= AUTHORITY_TO_MUTATE
```

```text
AGGREGATED_DATA
!= AUTOMATICALLY_DECLASSIFIED_DATA
```

```text
VIEW
!= EXPORT
!= PRINT
!= SHARE
!= BULK_ACCESS
```

La clasificación se aplica por información y proyección efectiva, no por nombre de página, nombre de proceso o existencia de un permiso genérico.

---

#### 5. Fuentes canónicas reconciliadas

La clasificación se reconcilia contra:

- `NUMERA-AUTH-001` aprobado como base inmediata;
- `AUTH-CAT-010` contenido en `03_MODALIDAD_Y_CLASIFICACIONES.md`;
- `AUTH-CAT-011` y los contratos de alcance y recurso;
- `05_PRERREQUISITOS_Y_CONTEXTO.md`;
- `06_CONTRATO_DE_RECURSO.md`;
- catálogo canónico `VSCREEN-*` y bindings `VPROC-*::STEP-*`;
- contratos de eventos empresariales y su vocabulario de sensibilidad;
- auditoría funcional y técnica de NUMERA;
- `NUMERA-DOM-001..018` como modelo financiero aprobado;
- fragmentos 04A de NUMERA y AUTH;
- topología documental vigente;
- políticas de formato y desarrollo de tareas.

---

#### 6. Vocabulario canónico de sensibilidad de permisos

El catálogo transversal ya define motivos documentales de sensibilidad, entre ellos:

```text
PERSONAL_DATA
WORKFORCE_CONTROL
ACCESS_CONTROL
AUTHORIZATION_SECURITY
BUSINESS_SECRET
FINANCIAL_DATA
COMMERCIAL_CONFIDENTIALITY
INVENTORY_INTEGRITY
CUSTODY_CONFIRMATION
EXCEPTIONAL_ACTION
CONFIGURATION_INTEGRITY
AUDIT_SECURITY
```

Para NUMERA, `FINANCIAL_DATA` es el motivo principal cuando la capacidad expone o modifica gastos, documentos, precios, costos, márgenes, saldos, pagos, obligaciones, presupuesto, cartera, tesorería, impuestos, contabilidad o resultados económicos equivalentes.

Los motivos pueden coexistir. La coexistencia no crea permisos nuevos.

---

#### 7. Vocabulario canónico de sensibilidad de eventos

Los eventos empresariales utilizan un vocabulario diferente y cerrado:

```text
INTERNAL_OPERATIONAL
RESTRICTED_PERSONAL
RESTRICTED_FINANCIAL
RESTRICTED_TECHNICAL
```

`RESTRICTED_FINANCIAL` protege payloads de evento que contienen o referencian importes, cuentas, documentos o contrapartes financieras.

Este vocabulario pertenece al contrato de eventos y no sustituye `is_sensitive` ni los motivos documentales del catálogo de permisos.

---

#### 8. Prohibición de un tercer enum paralelo

`NUMERA-AUTH-002` no crea otra escala como `LOW/MEDIUM/HIGH`, `PUBLIC/CONFIDENTIAL/SECRET` o equivalente.

La clasificación se expresa reutilizando:

- motivos canónicos del catálogo de autorización para permisos y datos;
- clases canónicas del contrato de eventos para payloads de eventos;
- controles ya aprobados de alcance, recurso, dispositivo y reautenticación.

Si en el futuro se necesita un nuevo vocabulario transversal de clasificación de datos, deberá definirse en su propietario canónico y no mediante inferencia local de NUMERA.

---

#### 9. Baseline de sensibilidad de los seis permisos canónicos actuales

El catálogo transversal vigente conserva:

| Permiso canónico | `is_sensitive` | Motivo |
| --- | --- | --- |
| `numera.access` | `false` | no aplica como sensibilidad financiera por sí solo |
| `numera.finance.cost_centers.view` | `true` | `FINANCIAL_DATA` |
| `numera.finance.expenses.view` | `true` | `FINANCIAL_DATA` |
| `numera.analytics.break_even.view` | `true` | `FINANCIAL_DATA` |
| `numera.analytics.profitability.view` | `true` | `FINANCIAL_DATA` |
| `numera.analytics.financial_reports.view` | `true` | `FINANCIAL_DATA` |

Resultado:

```text
SENSITIVE_CURRENT_NUMERA_PERMISSIONS = 5
NON_SENSITIVE_CURRENT_NUMERA_PERMISSIONS = 1
```

Esta tarea no cambia esos valores.

---

#### 10. `numera.access` no desclasifica contenido financiero

Que `numera.access` tenga `is_sensitive = false` significa únicamente que la capacidad de entrada general no se clasifica como sensibilidad financiera por sí misma.

No significa:

```text
numera.access
=
permiso para métricas, gastos, saldos, presupuestos o reportes
```

La raíz de NUMERA deberá seguir separando acceso a la aplicación de autoridad sobre datos financieros concretos.

---

#### 11. Sensibilidad y política de dispositivo son dimensiones distintas

El contrato de prerrequisitos vigente clasifica los seis permisos actuales de NUMERA con política `STRONG` para dispositivo compartido.

Por tanto:

```text
is_sensitive = false
```

no implica automáticamente:

```text
shared_device_requirement = STANDARD
```

`numera.access` puede conservar una política de interacción reforzada por el riesgo de la aplicación sin convertirse por ello en un permiso de lectura financiera sensible.

---

#### 12. Sensibilidad de proceso y sensibilidad de pantalla son dimensiones distintas

Los procesos propietarios tienen su propio contrato de eventos.

Ejemplos canónicos:

- `VPROC-0051`, `VPROC-0052`, `VPROC-0053`, `VPROC-0054` y `VPROC-0069` publican eventos `RESTRICTED_FINANCIAL`;
- `VPROC-0010` publica eventos `RESTRICTED_PERSONAL`;
- `VPROC-0061` publica eventos `INTERNAL_OPERATIONAL`.

Esto no permite concluir que una pantalla NUMERA basada en `VPROC-0061` pueda mostrar importes, márgenes o reportes financieros como datos no sensibles.

La proyección de pantalla se autoriza por sus campos efectivos y finalidad.

---

#### 13. Clasificación por campo y proyección efectiva

Una misma pantalla puede contener simultáneamente:

- metadatos estructurales no financieros;
- identificadores empresariales;
- datos financieros sensibles;
- datos personales sensibles;
- referencias comerciales confidenciales;
- evidencia de auditoría;
- información de secreto empresarial.

La autorización no se resuelve aplicando una única etiqueta indiscriminada a toda la interfaz.

Cada proyección debe conservar únicamente los campos necesarios para la finalidad autorizada.

---

#### 14. Regla de minimización

Para toda proyección sensible:

```text
CAMPOS_ENTREGADOS
=
MINIMO_NECESARIO_PARA_FINALIDAD_AUTORIZADA
```

Queda prohibido usar como justificación:

- que el registro ya fue cargado por el servidor;
- que el actor puede ver otra pantalla relacionada;
- que el dato existe en el mismo objeto JSON;
- que una tabla lo necesita para ordenar internamente;
- que el usuario tiene `numera.access`;
- que el dato aparece en un evento o log interno.

---

#### 15. Metadatos estructurales de aplicación

Código de aplicación, labels genéricos de navegación, títulos de sección, estado técnico de carga y metadatos equivalentes no se convierten automáticamente en `FINANCIAL_DATA`.

Esta exclusión no autoriza exposición de:

- valores monetarios;
- saldos;
- costos;
- márgenes;
- metas;
- cuentas;
- documentos;
- contrapartes;
- decisiones financieras.

---

#### 16. Hechos económicos

Los hechos económicos y sus campos materiales se clasifican con motivo principal:

```text
FINANCIAL_DATA
```

Incluye, cuando existan:

- monto;
- moneda;
- impuestos;
- fecha de reconocimiento;
- documento fuente;
- tercero;
- entidad legal;
- centro de costo;
- estado económico;
- referencia de corrección;
- conciliación;
- evidencia financiera.

La identidad técnica aislada de un hecho puede proyectarse sin todos esos campos cuando la finalidad lo permita.

---

#### 17. Gastos y soportes

Gastos, categorías económicas, importes, moneda, centro de costo, soporte, contraparte y estado financiero se clasifican como `FINANCIAL_DATA`.

Cuando el soporte o contraparte identifica una persona natural, puede coexistir `PERSONAL_DATA`.

Cuando contiene condiciones de proveedor o tercero comercial, puede coexistir `COMMERCIAL_CONFIDENTIALITY`.

---

#### 18. Aprobaciones financieras

El contenido económico sometido a aprobación conserva `FINANCIAL_DATA`.

La evidencia de quién decidió, cuándo, con qué motivo y sobre qué versión puede además requerir `AUDIT_SECURITY`.

Una aprobación extraordinaria, override o decisión fuera del flujo ordinario puede además requerir `EXCEPTIONAL_ACTION`.

La clasificación adicional no cambia el permiso exacto requerido.

---

#### 19. Cuentas por pagar y obligaciones

Se clasifica como `FINANCIAL_DATA`:

- importe debido;
- saldo;
- vencimiento;
- programación de pago;
- estado de obligación;
- documento asociado;
- condiciones de liquidación;
- referencias de pago.

Datos contractuales o comerciales del proveedor pueden coexistir con `COMMERCIAL_CONFIDENTIALITY`.

---

#### 20. Cuentas por cobrar y cartera

Se clasifica como `FINANCIAL_DATA`:

- saldo;
- vencimiento;
- aging;
- cupo o exposición;
- pagos recibidos;
- aplicaciones;
- acuerdos;
- promesas;
- disputas;
- castigos;
- saldos a favor.

Si el deudor es una persona natural o el registro contiene contacto identificable, coexiste `PERSONAL_DATA`.

---

#### 21. Caja, bancos y tesorería

Saldos, movimientos, cuentas, lotes de pago, referencias bancarias, depósitos, conciliaciones, disponibilidad y liquidez se clasifican como `FINANCIAL_DATA`.

Las credenciales bancarias, secretos, tokens, llaves, PIN, OTP o material de autenticación no son datos financieros de negocio proyectables: permanecen fuera de payloads, UI, exportaciones y logs.

---

#### 22. Conciliación de ventas y pagos

Importes, liquidaciones, pagos, diferencias, depósitos, referencias de transacción y resolución de diferencia se clasifican como `FINANCIAL_DATA`.

La evidencia de investigación y decisión puede coexistir con `AUDIT_SECURITY`.

La conciliación no autoriza exponer datos comerciales o personales no necesarios del pedido o cliente.

---

#### 23. Conciliación de compras y recepciones

Importes de orden, factura, obligación, pago, diferencia y conciliación se clasifican como `FINANCIAL_DATA`.

Condiciones comerciales, precios de proveedor y datos contractuales pueden coexistir con `COMMERCIAL_CONFIDENTIALITY`.

La evidencia de diferencias y resolución puede coexistir con `AUDIT_SECURITY`.

---

#### 24. Conciliación de inventario, producción y variaciones

Cuando la proyección contiene impacto monetario, costo, pérdida, merma valorizada o variación económica, aplica `FINANCIAL_DATA`.

Cuando también revela diferencias físicas, faltantes, sobrantes o control de existencia, puede coexistir `INVENTORY_INTEGRITY`.

La vista financiera no recibe por defecto detalle físico adicional que no sea necesario para explicar la diferencia económica.

---

#### 25. Costos, rentabilidad y punto de equilibrio

Costos, márgenes, contribución, rentabilidad, punto de equilibrio, drivers, pools, distribuciones, precios internos y resultados por producto, sede o canal se clasifican como `FINANCIAL_DATA`.

Cuando fórmulas, métodos de costeo o estructuras internas revelan conocimiento reservado, puede coexistir `BUSINESS_SECRET`.

---

#### 26. Cierre, reapertura y corrección de periodo

Saldos de cierre, diferencias pendientes, correcciones, reaperturas, versiones y restatements conservan `FINANCIAL_DATA`.

Reabrir, corregir o sustituir una versión cerrada puede además requerir:

```text
EXCEPTIONAL_ACTION
+
AUDIT_SECURITY
```

según la acción efectiva y el contrato posterior de permisos.

---

#### 27. Reportes, snapshots y exportaciones

Un reporte o snapshot que contenga cifras financieras conserva `FINANCIAL_DATA` aunque sea derivado, agregado o publicado internamente.

La publicación interna no lo vuelve público.

La exportación no reduce sensibilidad:

```text
SENSITIVE_REPORT
-> SENSITIVE_EXPORT
```

El formato PDF, CSV, XLSX, JSON, pantalla o impresión no modifica por sí mismo la clasificación.

---

#### 28. Paquete laboral para pagos y beneficios

`VSCREEN-0153` consume un dominio especialmente compuesto.

La información laboral identificable y los eventos `VPROC-0010` conservan `RESTRICTED_PERSONAL` en el contrato de eventos.

Cuando la proyección NUMERA incorpora valores de pago, devengos, deducciones, aportes o liquidaciones, aplica además el motivo `FINANCIAL_DATA` sobre esos campos.

Se conserva:

```text
PERSONAL_DATA
+
FINANCIAL_DATA
```

sin convertir esa combinación en un nuevo enum.

---

#### 29. Facturas y documentos fiscales

Importes, impuestos, estado de documento, referencias externas, notas económicas y relación con obligaciones se clasifican como `FINANCIAL_DATA`.

Datos del emisor, receptor o contraparte pueden añadir `COMMERCIAL_CONFIDENTIALITY` y, cuando correspondan a persona natural, `PERSONAL_DATA`.

El documento fiscal no autoriza exponer credenciales, secretos o payloads técnicos del proveedor externo.

---

#### 30. Presupuestos, escenarios y forecast

Presupuestos, forecast, supuestos, precios propuestos, costos simulados, márgenes, volúmenes económicos y escenarios se clasifican como `FINANCIAL_DATA`.

Cuando revelan estrategia de precios, estructura de costos o supuestos competitivos puede coexistir `BUSINESS_SECRET`.

Se preserva:

```text
SIMULATED
!= REAL
```

pero ambos pueden ser sensibles.

---

#### 31. Impuestos y obligaciones de cumplimiento

Bases, importes, impuestos, vencimientos, soportes, estados, pagos y referencias de presentación se clasifican como `FINANCIAL_DATA`.

Información de terceros o contratos puede añadir `COMMERCIAL_CONFIDENTIALITY`.

La clasificación interna no convierte NUMERA en autoridad fiscal externa.

---

#### 32. Distribución y asignación de costos

Pools, drivers, bases, destinos, importes, reglas y reversión se clasifican como `FINANCIAL_DATA`.

Cuando la regla revela metodología interna de costeo o fórmula reservada puede coexistir `BUSINESS_SECRET`.

La explicación necesaria para auditoría se proyecta sin entregar secretos adicionales no requeridos.

---

#### 33. Indicadores, análisis y planes de mejora

`VPROC-0061` conserva eventos `INTERNAL_OPERATIONAL`.

Sin embargo, cuando `VSCREEN-0094`, `VSCREEN-0106` o `VSCREEN-0159` muestran importes, márgenes, costos, rentabilidad, presupuestos o indicadores financieros, esos campos conservan `FINANCIAL_DATA`.

Metadatos de mejora puramente operativos no se promueven automáticamente a sensibilidad financiera.

Regla:

```text
EVENT_SENSITIVITY_INTERNAL_OPERATIONAL
!=
DECLASSIFICATION_OF_EMBEDDED_FINANCIAL_FIELDS
```

---

#### 34. Centros de costo, metas y objetivos económicos

Identidad, estado y jerarquía del centro se consumen según el contrato de recurso.

Cuando la proyección incluye presupuesto, meta, ingreso esperado, gasto, variación, margen objetivo u otra cifra económica, aplica `FINANCIAL_DATA`.

La sensibilidad no autoriza tratar la existencia del centro de costo como dato personal ni como permiso de mutación.

---

#### 35. Contrapartes y terceros

Una referencia mínima de contraparte puede ser necesaria para explicar un hecho económico.

La proyección deberá distinguir:

- identidad mínima necesaria;
- datos comerciales confidenciales;
- datos personales;
- datos bancarios;
- documentos fiscales;
- información no necesaria para la finalidad.

La relación con una transacción financiera no autoriza exponer el expediente completo del tercero.

---

#### 36. Identificadores bancarios y medios de pago

Números de cuenta completos, referencias de recaudo, identificadores de pago y datos equivalentes se tratan como `FINANCIAL_DATA` cuando son necesarios.

Una proyección de selección o confirmación debe preferir representación mínima o enmascarada cuando el número completo no sea necesario.

Nunca se proyectan secretos de autenticación.

---

#### 37. Documentos y evidencia

La existencia de un soporte puede proyectarse mediante identidad, tipo, estado y referencia.

El contenido completo solo se entrega cuando la finalidad y autorización lo exigen.

Un documento puede contener simultáneamente:

```text
FINANCIAL_DATA
PERSONAL_DATA
COMMERCIAL_CONFIDENTIALITY
AUDIT_SECURITY
```

La autorización sobre un campo o resumen no implica acceso automático al archivo completo.

---

#### 38. Importes, moneda e impuestos

Importe, moneda, tipo de cambio, base, impuesto, retención, descuento, comisión y fee se clasifican como `FINANCIAL_DATA` cuando representan valor económico real, presupuestado, simulado o propuesto.

La condición `0` no elimina sensibilidad.

La ausencia del valor tampoco autoriza inferir que el dato sea público.

---

#### 39. Periodos, fechas y versiones

Una fecha o identificador de periodo aislado no se clasifica automáticamente como financiero sensible.

Cuando forma parte de un cierre, obligación, saldo, forecast, pago, conciliación o snapshot económico, participa de la proyección sensible correspondiente.

La versión de un reporte o cierre no debe separarse de su alcance cuando ello permita inferir información financiera no autorizada.

---

#### 40. Correlación, source IDs y referencias externas

Los identificadores de correlación no son autorización.

Pueden exponerse como referencias cuando la finalidad lo requiera, pero no deben permitir:

- enumerar recursos no autorizados;
- recuperar documentos ajenos;
- ampliar territorio;
- saltar filtros de campo;
- reconstruir saldos o relaciones sensibles por enumeración.

---

#### 41. Auditoría y trazabilidad

Actor, actor efectivo, permiso, recurso, acción, resultado, motivo, request ID, versión y timestamp pueden requerir `AUDIT_SECURITY`.

La auditoría debe conservar evidencia suficiente sin duplicar innecesariamente:

- documentos completos;
- datos personales completos;
- cuentas bancarias completas;
- payloads financieros detallados;
- secretos.

Cuando baste, se conserva identificador, referencia, hash o metadata normalizada.

---

#### 42. Secretos y credenciales quedan fuera de la proyección financiera

Nunca forman parte de una proyección financiera autorizable como dato ordinario:

- contraseñas;
- tokens;
- JWT;
- refresh tokens;
- API keys;
- claves privadas;
- secretos de webhook;
- PIN;
- OTP;
- credenciales bancarias;
- material de sesión bruto.

La necesidad de procesar un pago o integración no convierte esos secretos en `FINANCIAL_DATA` visible.

---

#### 43. Composición con `PERSONAL_DATA`

Cuando un dato financiero identifica o perfila económicamente a una persona natural:

```text
FINANCIAL_DATA
+
PERSONAL_DATA
```

La proyección debe satisfacer ambos contratos.

Ejemplos conceptuales:

- salario o pago laboral individual;
- deuda de cliente persona natural;
- contacto asociado a obligación cuando no pueda separarse;
- cuenta bancaria personal;
- documento fiscal personal.

---

#### 44. Composición con `COMMERCIAL_CONFIDENTIALITY`

Cuando el dato financiero revela condiciones de negociación, proveedor, contrato o precio no público:

```text
FINANCIAL_DATA
+
COMMERCIAL_CONFIDENTIALITY
```

La proyección financiera no autoriza entregar condiciones comerciales completas si solo se requiere un importe agregado.

---

#### 45. Composición con `BUSINESS_SECRET`

Cuando la información revela metodología, fórmula, estructura de costo o estrategia empresarial reservada:

```text
FINANCIAL_DATA
+
BUSINESS_SECRET
```

Esto aplica especialmente a:

- costeo detallado;
- drivers internos;
- fórmulas de rentabilidad;
- supuestos de precio;
- escenarios competitivos;
- métodos reservados de distribución.

---

#### 46. Composición con `EXCEPTIONAL_ACTION`

La sensibilidad del dato y la excepcionalidad de una acción son dimensiones distintas.

Una reapertura, castigo, override, corrección excepcional o resolución fuera del flujo ordinario puede exigir:

```text
FINANCIAL_DATA
+
EXCEPTIONAL_ACTION
```

sin implicar que toda lectura financiera sea una acción excepcional.

---

#### 47. Composición con `INVENTORY_INTEGRITY`

Una variación monetaria vinculada a inventario puede conservar simultáneamente:

```text
FINANCIAL_DATA
+
INVENTORY_INTEGRITY
```

La pantalla NUMERA recibe únicamente el detalle físico necesario para explicar el impacto económico y no obtiene autoridad sobre el ledger físico.

---

#### 48. Agregación no desclasifica automáticamente

Suma, promedio, margen, ratio, tendencia, forecast, heatmap, KPI, dashboard o resultado consolidado puede seguir revelando información financiera sensible.

Se conserva:

```text
SENSITIVE_INPUT
-> AGGREGATE
!= AUTOMATICALLY_NON_SENSITIVE
```

La autorización del agregado debe considerar miembros, dimensiones, tamaño de grupo, filtros y riesgo de inferencia.

---

#### 49. Cero, `null`, ausencia y desconocido

No se confunden:

```text
0
!= null
!= missing
!= unknown
!= not_applicable
```

Ninguno de esos estados cambia por sí solo la sensibilidad del campo.

Un valor oculto o no disponible no debe sustituirse por cero de manera que revele o falsee información económica.

---

#### 50. Redacción y minimización de campos

Cuando la finalidad pueda cumplirse sin el dato completo, la proyección puede usar:

- enmascaramiento;
- agregado;
- rango;
- etiqueta de estado;
- referencia;
- conteo;
- último fragmento identificador;
- indicador booleano controlado.

La transformación debe preservar semántica y no presentar el valor reducido como si fuera el original completo.

---

#### 51. Búsqueda, autocomplete y selectores

Un selector financiero no debe filtrar información sensible por enumeración.

La búsqueda debe devolver únicamente la identidad mínima necesaria del recurso que el actor ya puede usar en la acción correspondiente.

No se usa autocomplete para revelar:

- saldos;
- importes;
- deudas;
- límites;
- cuentas completas;
- documentos;
- contrapartes fuera de alcance.

---

#### 52. Caché

Una respuesta financiera sensible en caché conserva las mismas restricciones que su origen.

Queda prohibido reutilizar entre actores, sedes, empresas, centros de costo o alcances una caché cuya clave no represente correctamente la frontera de autorización.

La revocación o cambio de autoridad deberá invalidar la exposición aplicable conforme al contrato transversal.

---

#### 53. Logs y observabilidad

Los logs deben priorizar:

- IDs;
- códigos de estado;
- fingerprints;
- referencias;
- conteos;
- duración;
- resultado técnico.

No deben registrar por defecto:

- payload financiero completo;
- documento completo;
- cuenta bancaria completa;
- salario individual;
- saldo de cartera individual;
- secreto o credencial.

---

#### 54. URLs y query parameters

Información financiera sensible no debe utilizarse como valor libre en URL cuando pueda evitarse.

Filtros por IDs autorizados pueden formar parte de navegación, pero el servidor vuelve a validar alcance y recurso.

Una URL no es autoridad ni prueba de acceso.

---

#### 55. Analytics y telemetría

Telemetría de producto no debe recibir importes, saldos, cuentas, documentos, salarios, deuda individual ni payloads de reportes por conveniencia analítica.

Cuando se requieran métricas de uso, se emplean eventos de interacción mínimos y separados del contenido financiero.

---

#### 56. Exportación, impresión y compartición

Los permisos sensibles de solo lectura no conceden automáticamente:

- exportación;
- impresión;
- descarga;
- compartir;
- copia masiva;
- acceso entre sedes;
- acceso a campos ocultos.

Cada capacidad posterior deberá conservar el mismo alcance de datos o uno más restrictivo.

---

#### 57. Presentación visual y captura de pantalla

La UI no puede tratar un dato como no sensible por haber sido renderizado.

La aplicación deberá evitar exposición accidental en:

- vistas de error;
- previews no autorizados;
- tooltips globales;
- toasts;
- placeholders con valores reales;
- superficies compartidas;
- estados de loading reciclados entre actores.

La política técnica concreta de captura o prevención física queda fuera de esta tarea.

---

#### 58. Integraciones externas

Una referencia hacia banco, proveedor fiscal, sistema contable o tercero no concede derecho a proyectar su payload completo.

La integración debe usar la mínima información autorizada y conservar:

```text
TECHNICAL_SUCCESS
!= BUSINESS_ACCEPTANCE
!= AUTHORITY_ACCEPTANCE
```

La sensibilidad financiera se mantiene durante request, respuesta, conciliación y evidencia.

---

#### 59. Simulaciones y escenarios

Los datos simulados pueden ser sensibles aunque no sean hechos reales.

Un escenario puede revelar:

- estrategia de precio;
- estructura de costo;
- margen esperado;
- presupuesto;
- forecast;
- supuestos de crecimiento;
- decisiones futuras.

Por tanto:

```text
SIMULATED != NON_SENSITIVE
```

---

#### 60. Dispositivo compartido

La clasificación de datos no sustituye la política de dispositivo.

Para los permisos actuales de NUMERA se conserva el tratamiento `STRONG` ya definido por el contrato transversal.

Una proyección reducida no permite degradar automáticamente una exigencia fuerte del permiso efectivo.

---

#### 61. Simulación de autorización

La simulación de una decisión de autorización no habilita lectura real de datos financieros.

Cuando un preview de autorización pueda representar una capacidad sensible, deberá minimizar contenido y conservar la separación entre:

```text
DECISION_PREVIEW
!= REAL_DATA_ACCESS
```

La simulación no entrega payload financiero real por el solo hecho de evaluar un permiso.

---

#### 62. Matriz canónica de sensibilidad — VSCREEN-0094 a VSCREEN-0100

| Pantalla | Proceso / paso | Información financiera sensible | Motivos adicionales cuando apliquen |
| --- | --- | --- | --- |
| `VSCREEN-0094` Inicio financiero y ejecutivo | `VPROC-0061::STEP-REVIEW_FINANCIAL_POSITION` | indicadores, alertas, saldos, cierres, presupuesto, resultados | `AUDIT_SECURITY` para evidencia de decisiones; el evento `VPROC-0061` sigue `INTERNAL_OPERATIONAL` |
| `VSCREEN-0095` Bandeja de hechos económicos | `VPROC-0051::STEP-TRIAGE_ECONOMIC_FACTS` | monto, moneda, impuestos, origen, tercero, estado, conciliación | `COMMERCIAL_CONFIDENTIALITY` o `PERSONAL_DATA` según contraparte |
| `VSCREEN-0096` Registro de gasto y soporte | `VPROC-0051::STEP-CAPTURE_EXPENSE_AND_EVIDENCE` | gasto, importe, moneda, centro, soporte, contraparte | `COMMERCIAL_CONFIDENTIALITY`; `PERSONAL_DATA` cuando corresponda |
| `VSCREEN-0097` Bandeja de aprobaciones financieras | `VPROC-0052::STEP-APPROVE_FINANCIAL_DECISION` | importe, obligación, ajuste, pago, cierre, decisión | `AUDIT_SECURITY`; `EXCEPTIONAL_ACTION` cuando la decisión sea extraordinaria |
| `VSCREEN-0098` Cuentas por pagar y obligaciones | `VPROC-0052::STEP-MANAGE_PAYABLE_OBLIGATION` | saldo, vencimiento, obligación, pago, documento | `COMMERCIAL_CONFIDENTIALITY` |
| `VSCREEN-0099` Cuentas por cobrar y cartera | `VPROC-0053::STEP-MANAGE_RECEIVABLE` | saldo, aging, recaudo, aplicación, exposición, acuerdo, castigo | `PERSONAL_DATA` o `COMMERCIAL_CONFIDENTIALITY` según deudor |
| `VSCREEN-0100` Caja, bancos y movimientos financieros | `VPROC-0052::STEP-EXECUTE_TREASURY_MOVEMENT` | saldo, cuenta, movimiento, depósito, pago, conciliación, liquidez | minimización estricta de identificadores bancarios |

Todas las filas anteriores tienen `FINANCIAL_DATA` como motivo financiero principal para los campos materiales indicados.

---

#### 63. Matriz canónica de sensibilidad — VSCREEN-0101 a VSCREEN-0106

| Pantalla | Proceso / paso | Información financiera sensible | Motivos adicionales cuando apliquen |
| --- | --- | --- | --- |
| `VSCREEN-0101` Conciliación de ventas y pagos | `VPROC-0051::STEP-RECONCILE_SALES_AND_PAYMENTS` | venta económica, pago, liquidación, diferencia, depósito | `AUDIT_SECURITY` |
| `VSCREEN-0102` Conciliación de compras y recepciones | `VPROC-0051::STEP-RECONCILE_PURCHASES_AND_RECEIPTS` | orden, factura, obligación, pago, diferencia | `COMMERCIAL_CONFIDENTIALITY`; `AUDIT_SECURITY` |
| `VSCREEN-0103` Conciliación de inventario, producción y variaciones | `VPROC-0054::STEP-RECONCILE_OPERATING_VARIANCES` | costo, merma valorizada, pérdida, variación económica | `INVENTORY_INTEGRITY`; `AUDIT_SECURITY` |
| `VSCREEN-0104` Costos, rentabilidad y escenarios | `VPROC-0054::STEP-ANALYZE_COST_AND_PROFITABILITY` | costo, precio, margen, rentabilidad, equilibrio, supuestos | `BUSINESS_SECRET` |
| `VSCREEN-0105` Cierre, reapertura y corrección de periodo | `VPROC-0054::STEP-CLOSE_OR_REOPEN_PERIOD` | saldos, versión de cierre, diferencias, correcciones, restatement | `EXCEPTIONAL_ACTION`; `AUDIT_SECURITY` |
| `VSCREEN-0106` Reportes y exportaciones financieras | `VPROC-0061::STEP-PUBLISH_FINANCIAL_REPORT` | métricas, saldos, costos, márgenes, cierres, snapshots, reportes | exportar/compartir requiere capacidad separada; el evento `VPROC-0061` sigue `INTERNAL_OPERATIONAL` |

Todas las filas anteriores tienen `FINANCIAL_DATA` como motivo financiero principal para los campos materiales indicados.

---

#### 64. Matriz canónica de sensibilidad — VSCREEN-0153 a VSCREEN-0159

| Pantalla | Proceso / paso | Información financiera sensible | Motivos adicionales cuando apliquen |
| --- | --- | --- | --- |
| `VSCREEN-0153` Paquete laboral para pagos y beneficios | `VPROC-0010::STEP-PREPARE_LABOR_PAYMENT_PACKAGE` | devengos, deducciones, aportes, liquidaciones, valores de pago | `PERSONAL_DATA`; eventos `RESTRICTED_PERSONAL` |
| `VSCREEN-0154` Facturas y documentos fiscales | `VPROC-0051::STEP-MANAGE_FISCAL_DOCUMENT` | importes, impuestos, documento, estado, notas económicas | `COMMERCIAL_CONFIDENTIALITY`; `PERSONAL_DATA` cuando aplique |
| `VSCREEN-0155` Tesorería y programación de pagos | `VPROC-0052::STEP-PLAN_AND_EXECUTE_PAYMENTS` | liquidez, vencimientos, lotes, pagos, cuentas, conciliación | minimización estricta de datos bancarios |
| `VSCREEN-0156` Presupuestos, escenarios y forecast | `VPROC-0069::STEP-PLAN_BUDGET_AND_FORECAST` | presupuesto, forecast, supuestos, precios, costos, margen | `BUSINESS_SECRET`; eventos `RESTRICTED_FINANCIAL` |
| `VSCREEN-0157` Impuestos y obligaciones de cumplimiento | `VPROC-0052::STEP-MANAGE_TAX_OBLIGATION` | bases, impuestos, vencimientos, soportes, pagos | `COMMERCIAL_CONFIDENTIALITY`; `PERSONAL_DATA` cuando aplique |
| `VSCREEN-0158` Distribución y asignación de costos | `VPROC-0054::STEP-ALLOCATE_COSTS` | pools, drivers, base, destinos, importes, reversión | `BUSINESS_SECRET` cuando revele metodología interna |
| `VSCREEN-0159` Indicadores, análisis y planes de mejora | `VPROC-0061::STEP-ANALYZE_AND_PLAN_IMPROVEMENT` | métricas financieras cuando existan | los metadatos puramente operativos pueden permanecer fuera de `FINANCIAL_DATA`; eventos `INTERNAL_OPERATIONAL` |

La coexistencia de motivos se evalúa por los campos efectivos de cada proyección.

---

#### 65. Reconciliación con las superficies AS-IS actuales

El runtime auditado conserva cinco rutas protegidas de negocio y dos superficies públicas controladas.

La clasificación objetivo no afirma equivalencia uno a uno entre rutas actuales y `VSCREEN-*`.

Sí fija estas restricciones:

- `/` no puede usar `numera.access` como autoridad para todas sus métricas;
- `/cost-centers` contiene información económica sensible cuando muestra metas, presupuesto, variación o margen;
- `/expenses` contiene `FINANCIAL_DATA` y soportes que pueden incluir datos adicionales sensibles;
- `/break-even` contiene `FINANCIAL_DATA`;
- `/profitability` contiene `FINANCIAL_DATA`;
- `/login` y `/no-access` no deben filtrar contenido financiero de la sesión o recurso bloqueado.

---

#### 66. Reconciliación con permisos runtime legacy

Los códigos runtime observados no cambian la clasificación del dato.

Los aliases o renames de lectura preservan la sensibilidad del permiso canónico de destino.

Los dos permisos legacy `manage` continúan `DECOMPOSE_REQUIRED` y no se utilizan como etiqueta de sensibilidad ni como fallback de autorización.

---

#### 67. Lectura no implica mutación

Un dato puede ser sensible aun cuando la acción sea de solo lectura.

Se conserva:

```text
IS_READ_ONLY
!= IS_SENSITIVE
```

`NUMERA-AUTH-003` deberá definir lectura exacta sin absorber registro, aprobación, cierre, reapertura, pago, castigo o exportación.

---

#### 68. Mutación no define por sí sola sensibilidad

La existencia de una mutación no es la causa primaria de sensibilidad financiera.

La sensibilidad depende del dato, efecto y contexto.

Una futura capacidad de registro o aprobación deberá conservar la clasificación de los campos y añadir los controles de acción que correspondan sin redefinir el vocabulario de datos.

---

#### 69. Propietarios de especialización posterior

| Decisión pendiente | Propietario |
| --- | --- |
| permisos exactos de lectura | `NUMERA-AUTH-003` |
| permisos exactos de registro | `NUMERA-AUTH-004` |
| permisos exactos de aprobación | `NUMERA-AUTH-005` |
| cierre y reapertura | `NUMERA-AUTH-006` |
| exportación | `NUMERA-AUTH-007` |
| empresa, sede y centro de costo | `NUMERA-AUTH-008` |
| auditoría financiera | `NUMERA-AUTH-009` |
| independencia de turno para administración | `NUMERA-AUTH-010` |
| contexto operativo donde exista captura operacional | `NUMERA-AUTH-011` |
| empaquetado compartido | `NUMERA-AUTH-012` |
| pruebas integrales | `NUMERA-AUTH-013` |
| cartera, acuerdos, castigos, bancos y datos especializados | `NUMERA-AUTH-014` |
| escenarios, precios y presupuestos | `NUMERA-AUTH-015` |

---

#### 70. Hallazgos y condiciones de salida

| Hallazgo | Bloquea esta tarea | Propietario | Condición de salida |
| --- | --- | --- | --- |
| raíz actual protegida solo por `numera.access` a nivel de página | no | `NUMERA-AUTH-003` y UX aplicable | lectura financiera exacta definida y validada server-side |
| permisos `manage` legacy demasiado amplios | no | `NUMERA-AUTH-004..006`, `014`, `015` según capacidad | descomposición exacta sin fallback legacy |
| `numera.reports.view` sin consumidor actual localizado | no | `NUMERA-AUTH-003`, `007` y UX aplicable | identidad canónica reconciliada y capacidades view/export separadas |
| proyecciones `VPROC-0061` usan eventos `INTERNAL_OPERATIONAL` | no | contrato de eventos + consumidores | consumidor aplica minimización y autorización del contenido financiero sin reinterpretar el evento |
| datos compuestos personales/comerciales/financieros | no | tareas de permisos y proyección | cada proyección satisface todos los motivos aplicables |

No queda pendiente de esta tarea ninguna decisión de clasificación financiera detectada sin propietario.

---

#### 71. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

La tarea clasifica y reutiliza cobertura existente; no modifica el Registro 04A.

---

#### 72. Cobertura de prueba vigente reutilizada

La clasificación queda cubierta por requisitos existentes de NUMERA y autorización que ya protegen:

- reconciliación, trazabilidad y separación de lectura, registro, aprobación, cierre y exportación;
- identidad y atributos del hecho económico;
- cartera, bancos, pagos, conciliación y castigos;
- costos, presupuestos, escenarios y rentabilidad;
- protección de rutas y lecturas NUMERA;
- revalidación server-side de mutaciones;
- auditoría del principal y actor efectivos;
- reautenticación fuerte para escenarios sensibles;
- minimización y protección de datos sensibles.

Esta sección es trazabilidad de cobertura, no actualización del registro.

---

#### 73. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | tarea documental sin build de producto requerido |
| LOCAL | NOT_EXECUTED | la incorporación y los validadores del checkout pertenecen al ciclo documental ejecutado por el usuario |
| REMOTA | PASS | fuentes canónicas, catálogo de sensibilidad, recursos, eventos, archivo propietario y continuidad revisados en el remoto vigente |
| OPERATIVA | NOT_EXECUTED | no se ejecutan operaciones financieras ni flujos runtime |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE` |

---

#### 74. Criterios de aceptación

La tarea queda aceptada cuando se verifica que:

1. existe exactamente una tarea `NUMERA-AUTH-002`;
2. la topología es `DEFINE_ONCE` y sin instancia física propia;
3. se consume íntegramente el handoff de `NUMERA-AUTH-001`;
4. no se crean permisos nuevos;
5. no se cambia `is_sensitive` de los seis permisos actuales;
6. se preservan cinco permisos actuales sensibles y uno no sensible;
7. `numera.access` no se convierte en permiso financiero;
8. `FINANCIAL_DATA` se usa como motivo canónico de sensibilidad financiera;
9. `RESTRICTED_FINANCIAL` se conserva exclusivamente como clase de sensibilidad de eventos/proyecciones de evento;
10. no se crea un tercer enum local de sensibilidad;
11. `STRONG` de dispositivo permanece independiente de `is_sensitive`;
12. se clasifican las veinte pantallas canónicas NUMERA;
13. se preservan sus bindings de proceso y paso;
14. `VPROC-0010` conserva eventos `RESTRICTED_PERSONAL`;
15. `VPROC-0051`, `0052`, `0053`, `0054` y `0069` conservan eventos financieros restringidos donde corresponda;
16. `VPROC-0061` conserva eventos `INTERNAL_OPERATIONAL` sin desclasificar campos financieros de pantalla;
17. gastos y soportes quedan clasificados;
18. aprobaciones quedan clasificadas;
19. obligaciones y pagos quedan clasificados;
20. cartera queda clasificada;
21. caja, bancos y tesorería quedan clasificados;
22. conciliaciones quedan clasificadas;
23. costos, rentabilidad y equilibrio quedan clasificados;
24. cierre y reapertura quedan clasificados;
25. reportes y exportaciones conservan sensibilidad;
26. paquete laboral compone sensibilidad personal y financiera;
27. documentos fiscales e impuestos quedan clasificados;
28. presupuestos, escenarios y forecast quedan clasificados;
29. asignación de costos queda clasificada;
30. indicadores financieros permanecen sensibles aun dentro de procesos operacionales;
31. datos bancarios se minimizan;
32. secretos y credenciales quedan excluidos de proyecciones;
33. agregación no desclasifica automáticamente;
34. cero, `null`, ausencia y desconocido no alteran clasificación;
35. lectura no concede exportación, impresión, compartir ni acceso masivo;
36. logs, URLs, analytics y caché conservan restricciones;
37. simulación no concede acceso a datos reales;
38. la clasificación no transfiere propiedad de procesos;
39. cada decisión posterior tiene propietario;
40. no se crean ni modifican requisitos de prueba;
41. no existen cambios físicos.

---

#### 75. Límites

Esta tarea no:

- crea permisos de lectura;
- crea permisos de registro;
- crea permisos de aprobación;
- crea permisos de cierre o reapertura;
- crea permisos de exportación;
- crea permisos especializados de cartera, bancos o escenarios;
- cambia `is_sensitive` transversal;
- cambia `authorization_requirement`;
- cambia política de dispositivo;
- crea nuevos códigos de sensibilidad de eventos;
- crea un enum de clasificación de datos global;
- modifica contratos de eventos;
- modifica procesos o pantallas;
- materializa máscaras o redacción;
- implementa RLS;
- implementa filtros de columnas;
- modifica Supabase;
- modifica Registro 04A;
- desarrolla `NUMERA-AUTH-003`.

---

#### 76. Handoff a NUMERA-AUTH-003

La siguiente tarea recibe:

```text
NUMERA_AUTHORIZATION_BINDING_REGISTRY = NUMERA-AUTHORIZATION-BINDING-REGISTRY-001
NUMERA_CANONICAL_SCREEN_COUNT = 20
CURRENT_NUMERA_CANONICAL_PERMISSION_COUNT = 6
CURRENT_NUMERA_SENSITIVE_PERMISSION_COUNT = 5
CURRENT_NUMERA_NON_SENSITIVE_PERMISSION_COUNT = 1
NUMERA_ACCESS_IS_SENSITIVE_PERMISSION = NO
NUMERA_ACCESS_IMPLIES_FINANCIAL_READ = NO
FINANCIAL_PERMISSION_SENSITIVITY_REASON = FINANCIAL_DATA
EVENT_FINANCIAL_SENSITIVITY_CLASS = RESTRICTED_FINANCIAL
EVENT_PERSONAL_SENSITIVITY_CLASS = RESTRICTED_PERSONAL
EVENT_INTERNAL_OPERATIONAL_CLASS_CAN_CONTAIN_FINANCIAL_SCREEN_PROJECTIONS = YES
EVENT_SENSITIVITY_IMPLIES_PERMISSION = NO
DATA_SENSITIVITY_IMPLIES_ACTION_AUTHORITY = NO
DEVICE_STRONG_IMPLIES_PERMISSION_IS_SENSITIVE = NO
CURRENT_NUMERA_DEVICE_POLICY = STRONG_FOR_6_CURRENT_PERMISSIONS
FINANCIAL_AGGREGATION_AUTO_DECLASSIFIES = NO
FINANCIAL_VIEW_IMPLIES_EXPORT_PRINT_SHARE = NO
FINANCIAL_DATA_IN_URL_LOG_ANALYTICS_BY_DEFAULT = FORBIDDEN
FINANCIAL_SECRETS_AND_CREDENTIALS_IN_BUSINESS_PROJECTION = FORBIDDEN
FIELD_MINIMIZATION_REQUIRED = YES
COMPOUND_PERSONAL_FINANCIAL_SENSITIVITY_SUPPORTED = YES
COMPOUND_COMMERCIAL_FINANCIAL_SENSITIVITY_SUPPORTED = YES
COMPOUND_BUSINESS_SECRET_FINANCIAL_SENSITIVITY_SUPPORTED = YES
NUMERA_AUTH_003_OWNER = READ_PERMISSION_DEFINITION
TREQ_CHANGES = 0
```

`NUMERA-AUTH-003` deberá definir los permisos exactos de lectura y sus proyecciones autorizadas usando esta clasificación sin absorber registro, aprobación, cierre, reapertura, exportación ni capacidades especializadas reservadas a tareas posteriores.

---

#### 77. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUTH-001 — Vincular módulos y acciones con permisos y contratos aprobados`

**TAREA ACTUAL APROBADA**
`NUMERA-AUTH-002 — Clasificar información financiera sensible`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUTH-003 — Definir permisos de lectura`
### ✅ NUMERA-AUTH-003 — Definir permisos de lectura

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUTH-002 — Clasificar información financiera sensible
**Tarea siguiente:** NUMERA-AUTH-004 — Definir permisos de registro
**Tipo de tarea:** definición documental del registro exacto de permisos de lectura de NUMERA, sus recursos y proyecciones autorizadas, preservando las cinco capacidades de lectura canónicas vigentes, definiendo las capacidades de lectura faltantes para el dominio financiero aprobado y separando lectura de registro, aprobación, cierre, reapertura, exportación y capacidades sensibles especializadas; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/04_AUTORIZACION_FINANCIERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni publica permisos runtime, no migra aliases o grants, no modifica roles, RLS, RPC, Server Actions, navegación, tablas, migraciones, Supabase, paquetes compartidos, pantallas, procesos ni datos financieros
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir las capacidades exactas de **lectura** que NUMERA necesita para exponer su dominio financiero con mínimo privilegio, evitando que `numera.access`, una ruta, un panel agregado, una bandeja de aprobaciones o un permiso de mutación funcionen como autoridad implícita para consultar información financiera.

La tarea congela un contrato de lectura reutilizable por interfaz, servidor, RLS, RPC, integraciones y futura materialización del catálogo, sin ejecutar esa materialización.

---

#### 2. Naturaleza y topología

La reconciliación propietaria de `NUMERA-AUTH-001..007` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto, `NUMERA-AUTH-003`:

- define una sola vez el contrato de permisos de lectura;
- no crea instancia física propia;
- no publica claves nuevas en runtime;
- no modifica el catálogo transversal vigente;
- no modifica Supabase;
- no concede acceso a ningún actor;
- no ejecuta consultas sobre información financiera real.

---

#### 3. Handoff recibido de NUMERA-AUTH-002

La clasificación de sensibilidad entrega:

```text
NUMERA_AUTHORIZATION_BINDING_REGISTRY = NUMERA-AUTHORIZATION-BINDING-REGISTRY-001
NUMERA_CANONICAL_SCREEN_COUNT = 20
CURRENT_NUMERA_CANONICAL_PERMISSION_COUNT = 6
CURRENT_NUMERA_SENSITIVE_PERMISSION_COUNT = 5
CURRENT_NUMERA_NON_SENSITIVE_PERMISSION_COUNT = 1
NUMERA_ACCESS_IS_SENSITIVE_PERMISSION = NO
NUMERA_ACCESS_IMPLIES_FINANCIAL_READ = NO
FINANCIAL_PERMISSION_SENSITIVITY_REASON = FINANCIAL_DATA
EVENT_FINANCIAL_SENSITIVITY_CLASS = RESTRICTED_FINANCIAL
EVENT_PERSONAL_SENSITIVITY_CLASS = RESTRICTED_PERSONAL
EVENT_INTERNAL_OPERATIONAL_CLASS_CAN_CONTAIN_FINANCIAL_SCREEN_PROJECTIONS = YES
EVENT_SENSITIVITY_IMPLIES_PERMISSION = NO
DATA_SENSITIVITY_IMPLIES_ACTION_AUTHORITY = NO
DEVICE_STRONG_IMPLIES_PERMISSION_IS_SENSITIVE = NO
CURRENT_NUMERA_DEVICE_POLICY = STRONG_FOR_6_CURRENT_PERMISSIONS
FINANCIAL_AGGREGATION_AUTO_DECLASSIFIES = NO
FINANCIAL_VIEW_IMPLIES_EXPORT_PRINT_SHARE = NO
FINANCIAL_DATA_IN_URL_LOG_ANALYTICS_BY_DEFAULT = FORBIDDEN
FINANCIAL_SECRETS_AND_CREDENTIALS_IN_BUSINESS_PROJECTION = FORBIDDEN
FIELD_MINIMIZATION_REQUIRED = YES
COMPOUND_PERSONAL_FINANCIAL_SENSITIVITY_SUPPORTED = YES
COMPOUND_COMMERCIAL_FINANCIAL_SENSITIVITY_SUPPORTED = YES
COMPOUND_BUSINESS_SECRET_FINANCIAL_SENSITIVITY_SUPPORTED = YES
NUMERA_AUTH_003_OWNER = READ_PERMISSION_DEFINITION
TREQ_CHANGES = 0
```

La presente tarea consume estas decisiones sin cambiar la clasificación de sensibilidad aprobada.

---

#### 4. Resultado contractual

Esta tarea define:

```text
NUMERA-READ-PERMISSION-REGISTRY-001
```

El registro establece para cada capacidad:

```text
permission_code
+ label
+ protected_resource
+ ordinary_read_projection
+ sensitivity_inheritance
+ read_only_semantics
+ composition_rules
+ drilldown_rules
+ specialized_sensitive_boundary
+ materialization_status
```

---

#### 5. Fuente de nomenclatura

La convención transversal vigente mantiene:

```text
<app>.access
```

Y:

```text
<app>.<module>.<resource>.<action>
```

Para esta tarea:

```text
app = numera
action = view
modules = finance | analytics
```

No se introduce un namespace paralelo de lectura.

---

#### 6. Semántica canónica de `view`

`view` cubre la lectura ordinaria del recurso autorizado, incluyendo cuando aplique:

- listado;
- detalle ordinario;
- búsqueda;
- autocomplete;
- filtros;
- ordenamiento;
- paginación;
- resumen de estado;
- proyección mínima de relaciones necesarias.

No se crean permisos separados `list`, `detail`, `search` o `filter` para el mismo recurso.

---

#### 7. Lectura no equivale a salida de información

Se conserva:

```text
VIEW
!= EXPORT
!= PRINT
!= SHARE
!= BULK_EXTRACT
```

La capacidad de lectura no autoriza por sí sola descargar, exportar, imprimir, compartir o producir una copia masiva del recurso.

La especialización de exportación pertenece a `NUMERA-AUTH-007`.

---

#### 8. Lectura no equivale a mutación

Se conserva:

```text
VIEW
!= REGISTER
!= UPDATE
!= APPROVE
!= PAY_EXECUTE
!= RECONCILE
!= CLOSE
!= REOPEN
!= WRITE_OFF
```

Una pantalla visible no habilita acciones mutantes por inferencia.

---

#### 9. `numera.access` queda fuera del conteo de permisos de lectura financiera

`numera.access` continúa siendo exclusivamente acceso a la superficie general de NUMERA.

```text
numera.access
!= numera.finance.*.view
!= numera.analytics.*.view
```

El registro de esta tarea contabiliza permisos funcionales de lectura; `numera.access` se conserva como prerrequisito de aplicación, no como permiso de lectura financiera.

---

#### 10. Baseline canónico vigente

Antes de esta definición existen cinco permisos canónicos de lectura financiera/analítica:

```text
numera.finance.cost_centers.view
numera.finance.expenses.view
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Los cinco se preservan sin renombrar.

---

#### 11. Capacidades nuevas definidas por esta tarea

Se definen contractualmente diecisiete capacidades de lectura faltantes:

```text
numera.finance.economic_facts.view
numera.finance.payables.view
numera.finance.receivables.view
numera.finance.treasury_movements.view
numera.finance.reconciliations.view
numera.finance.costs.view
numera.finance.periods.view
numera.finance.labor_payment_packages.view
numera.finance.fiscal_documents.view
numera.finance.payment_plans.view
numera.finance.budgets.view
numera.finance.forecasts.view
numera.finance.scenarios.view
numera.finance.price_versions.view
numera.finance.tax_obligations.view
numera.finance.cost_allocations.view
numera.analytics.financial_indicators.view
```

Estas claves quedan **definidas documentalmente**, no activas en runtime.

---

#### 12. Cardinalidad del registro de lectura

```text
EXISTING_CANONICAL_READ_PERMISSIONS = 5
NEW_CONTRACT_DEFINED_READ_PERMISSIONS = 17
TOTAL_READ_PERMISSION_DEFINITIONS = 22
APP_ACCESS_PERMISSION_EXCLUDED_FROM_READ_COUNT = 1
```

No existen duplicados dentro del registro.

---

#### 13. Estado de lifecycle de las claves

Cada clave usa uno de dos estados:

```text
CANONICAL_ACTIVE
CONTRACT_DEFINED_PENDING_MATERIALIZATION
```

Los cinco permisos vigentes son `CANONICAL_ACTIVE`.

Las diecisiete claves nuevas son `CONTRACT_DEFINED_PENDING_MATERIALIZATION` hasta que el lifecycle propietario publique catálogo, contratos compartidos, aliases o migraciones aplicables.

---

#### 14. Registro consolidado — capacidades vigentes

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.finance.cost_centers.view` | Consultar centros de costo | centro de costo y metadatos financieros autorizados | `CANONICAL_ACTIVE` |
| `numera.finance.expenses.view` | Consultar gastos | gasto y soporte financiero permitido | `CANONICAL_ACTIVE` |
| `numera.analytics.break_even.view` | Consultar punto de equilibrio | resultado reproducible de equilibrio | `CANONICAL_ACTIVE` |
| `numera.analytics.profitability.view` | Consultar rentabilidad | resultado reproducible de rentabilidad | `CANONICAL_ACTIVE` |
| `numera.analytics.financial_reports.view` | Consultar reportes financieros | reporte o snapshot financiero autorizado | `CANONICAL_ACTIVE` |

---

#### 15. Registro consolidado — hechos, obligaciones y cartera

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.finance.economic_facts.view` | Consultar hechos económicos | hecho económico, clasificación, origen y evidencia mínima | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.payables.view` | Consultar cuentas por pagar | obligación, documento, vencimiento, saldo y estado permitido | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.receivables.view` | Consultar cuentas por cobrar | cuenta, cuota, vencimiento, saldo, aging y estado permitido | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |

---

#### 16. Registro consolidado — tesorería y conciliación

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.finance.treasury_movements.view` | Consultar movimientos de tesorería | caja, banco, movimiento y estado de conciliación permitido | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.reconciliations.view` | Consultar conciliaciones financieras | conciliación, diferencias, matching, evidencia y resultado | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.payment_plans.view` | Consultar programación de pagos | propuesta, programación, prioridad, vencimiento y estado permitido | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |

---

#### 17. Registro consolidado — costos y periodos

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.finance.costs.view` | Consultar costos | costo vigente/versionado, componentes y lineage permitido | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.periods.view` | Consultar periodos financieros | periodo, estado, corte, versión y referencias de cierre | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.cost_allocations.view` | Consultar distribuciones de costo | regla aplicada, base, destino, versión y resultado de asignación | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |

---

#### 18. Registro consolidado — fiscal y laboral

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.finance.labor_payment_packages.view` | Consultar paquetes laborales de pago | paquete económico laboral minimizado y referencias autorizadas | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.fiscal_documents.view` | Consultar documentos fiscales | documento, estado, referencia externa y evidencia permitida | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.tax_obligations.view` | Consultar obligaciones tributarias | obligación, calendario, base, componente, estado y soporte permitido | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |

---

#### 19. Registro consolidado — planeación y escenarios

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.finance.budgets.view` | Consultar presupuestos | presupuesto, versión, periodo, dimensiones y estado | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.forecasts.view` | Consultar forecast | forecast, versión, horizonte, supuestos y estado | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.scenarios.view` | Consultar escenarios | escenario, versión, baseline, supuestos y resultado simulado | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |
| `numera.finance.price_versions.view` | Consultar versiones de precio en NUMERA | versión propuesta/simulada/publicada y contexto de decisión | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |

---

#### 20. Registro consolidado — analítica

| Permiso | Etiqueta | Recurso / proyección | Estado |
| --- | --- | --- | --- |
| `numera.analytics.financial_indicators.view` | Consultar indicadores financieros | indicador, fórmula/version, periodo, dimensiones y calidad | `CONTRACT_DEFINED_PENDING_MATERIALIZATION` |

Los permisos analíticos existentes de equilibrio, rentabilidad y reportes permanecen separados de esta capacidad general de indicadores.

---

#### 21. Sensibilidad heredada de las nuevas capacidades

Las diecisiete nuevas capacidades de lectura protegen información clasificada por `NUMERA-AUTH-002` como financiera sensible.

Por tanto, su motivo documental de sensibilidad es:

```text
FINANCIAL_DATA
```

Esto no cambia el enum transversal ni publica `is_sensitive` físicamente en esta tarea.

---

#### 22. Semántica `is_read_only`

Todas las veintidós capacidades funcionales de este registro son conceptualmente de solo lectura:

```text
is_read_only = true
```

La futura materialización no podrá usar una clave `*.view` como autorización para `INSERT`, `UPDATE`, `DELETE`, aprobación, pago, cierre, reapertura o exportación.

---

#### 23. Modalidad administrativa objetivo

Las capacidades de lectura de NUMERA se definen para administración financiera y conservan la semántica vigente:

```text
authorization_requirement = BASE_ONLY
is_operational = false
```

Una futura necesidad operacional deberá declararse de forma explícita y versionada; no se infiere por el hecho de que el dato provenga de una operación.

---

#### 24. Política de dispositivo compartido

Las nuevas lecturas financieras no podrán degradarse respecto de las seis capacidades NUMERA actuales.

Antes de publicación física deberán quedar reconciliadas con política equivalente a:

```text
SHARED_DEVICE_REQUIREMENT = STRONG
```

Una reautenticación fuerte no amplía alcance, permiso ni campos visibles.

---

#### 25. Simulación de autorización

Una simulación de permiso de lectura financiera podrá mostrar decisión y razones, pero no datos financieros reales.

Contrato objetivo:

```text
SIMULATION = DECISION_ONLY
REAL_FINANCIAL_DATA_VISIBLE_UNDER_SIMULATED_AUTHORITY = NO
```

La clasificación física definitiva deberá reconciliarse en el catálogo transversal antes de activar las claves nuevas.

---

#### 26. Lectura exige recurso resoluble

Toda evaluación de lectura debe identificar:

```text
permission_code
+ resource_type
+ resource_identity_or_normalized_query
+ principal
+ effective_actor
+ scope
+ permitted_projection
+ current_state_when_material
+ authorization_decision
```

Una consulta sin recurso o proyección resolubles falla cerrada.

---

#### 27. Alcance territorial queda especializado después

Esta tarea identifica el recurso protegido, pero no sustituye `NUMERA-AUTH-008`.

La definición final de:

- entidad legal;
- empresa;
- marca o unidad;
- sede;
- área;
- centro de costo;
- conjunto de dimensiones;
- alcance transversal;

debe ser materializada por la tarea propietaria de scope.

---

#### 28. Regla de agregado financiero

Un agregado no obtiene autoridad global por ser agregado.

```text
AGGREGATE_VIEW
REQUIRES
AUTHORIZED_INCLUDED_DIMENSIONS
```

Equilibrio, rentabilidad, reportes e indicadores deben limitar sus miembros a dimensiones autorizadas y evitar inferencias sobre territorios ocultos.

---

#### 29. Drill-down requiere permiso del recurso destino

La autorización para ver un agregado no concede automáticamente lectura de sus hechos fuente.

Ejemplo:

```text
numera.analytics.profitability.view
!=
numera.finance.expenses.view
```

Al abrir detalle de gastos, hechos, pagos u obligaciones, se reevalúa el permiso del recurso destino.

---

#### 30. Navegación a aplicación propietaria reautoriza

NUMERA puede mostrar referencias a hechos de PULSO, ORIGO, FOGO, NEXO, ANIMA u otra aplicación.

Seguir una referencia hacia la fuente original no hereda el permiso NUMERA.

```text
NUMERA_PROJECTION_PERMISSION
!= SOURCE_APPLICATION_PERMISSION
```

La aplicación propietaria reautoriza su recurso con su contrato propio.

---

#### 31. Panel raíz sin permiso omnibus

`VSCREEN-0094 — Inicio financiero y ejecutivo` no recibe un permiso genérico `dashboard.view` ni `financial_read_all`.

Se conserva:

```text
numera.access = entrada a la aplicación
```

Y cada tarjeta, indicador o bloque del panel se resuelve con el permiso del recurso mostrado.

Una tarjeta sin permiso suficiente no se muestra ni se incluye silenciosamente en conteos agregados.

---

#### 32. Bandeja de aprobaciones sin permiso omnibus de lectura

`VSCREEN-0097 — Bandeja de aprobaciones financieras` tampoco crea un permiso amplio `approvals.view`.

La visibilidad de cada fila exige la lectura del recurso subyacente.

La capacidad de **aprobar** se define después en `NUMERA-AUTH-005` y no deriva de la lectura.

---

#### 33. Matriz de lectura — VSCREEN-0094 a VSCREEN-0100

| Pantalla | Lectura requerida |
| --- | --- |
| `VSCREEN-0094` Inicio financiero y ejecutivo | `numera.access` + permiso específico de cada tarjeta/recurso; sin lectura omnibus |
| `VSCREEN-0095` Bandeja de hechos económicos | `numera.finance.economic_facts.view` |
| `VSCREEN-0096` Registro de gasto y soporte | `numera.finance.expenses.view` |
| `VSCREEN-0097` Bandeja de aprobaciones financieras | permiso de lectura del recurso representado; sin `approvals.view` global |
| `VSCREEN-0098` Cuentas por pagar y obligaciones | `numera.finance.payables.view` |
| `VSCREEN-0099` Cuentas por cobrar y cartera | `numera.finance.receivables.view` con proyección sensible minimizada |
| `VSCREEN-0100` Caja, bancos y movimientos financieros | `numera.finance.treasury_movements.view` con proyección sensible minimizada |

---

#### 34. Matriz de lectura — VSCREEN-0101 a VSCREEN-0106

| Pantalla | Lectura requerida |
| --- | --- |
| `VSCREEN-0101` Conciliación de ventas y pagos | `numera.finance.reconciliations.view` |
| `VSCREEN-0102` Conciliación de compras y recepciones | `numera.finance.reconciliations.view` |
| `VSCREEN-0103` Conciliación de inventario, producción y variaciones | `numera.finance.reconciliations.view` |
| `VSCREEN-0104` Costos, rentabilidad y escenarios | `numera.finance.costs.view` + permisos analíticos/escenario según panel consultado |
| `VSCREEN-0105` Cierre, reapertura y corrección de periodo | `numera.finance.periods.view` para consulta; autoridad de cierre/reapertura permanece separada |
| `VSCREEN-0106` Reportes y exportaciones financieras | `numera.analytics.financial_reports.view`; exportación requiere permiso distinto |

---

#### 35. Matriz de lectura — VSCREEN-0153 a VSCREEN-0159

| Pantalla | Lectura requerida |
| --- | --- |
| `VSCREEN-0153` Paquete laboral para pagos y beneficios | `numera.finance.labor_payment_packages.view` |
| `VSCREEN-0154` Facturas y documentos fiscales | `numera.finance.fiscal_documents.view` |
| `VSCREEN-0155` Tesorería y programación de pagos | `numera.finance.payment_plans.view` y, cuando se abra detalle, permisos del recurso relacionado |
| `VSCREEN-0156` Presupuestos, escenarios y forecast | `numera.finance.budgets.view`, `numera.finance.forecasts.view`, `numera.finance.scenarios.view` y `numera.finance.price_versions.view` según objeto |
| `VSCREEN-0157` Impuestos y obligaciones de cumplimiento | `numera.finance.tax_obligations.view` |
| `VSCREEN-0158` Distribución y asignación de costos | `numera.finance.cost_allocations.view` + `numera.finance.costs.view` cuando se muestre el costo relacionado |
| `VSCREEN-0159` Indicadores, análisis y planes de mejora | `numera.analytics.financial_indicators.view`; drill-down reautoriza el recurso destino |

---

#### 36. Centros de costo como dimensión no conceden demás lecturas

`numera.finance.cost_centers.view` permite conocer los centros de costo autorizados.

No concede por sí solo:

- presupuestos;
- gastos;
- costos;
- rentabilidad;
- cartera;
- pagos;
- conciliaciones;
- indicadores.

Un centro de costo puede actuar como filtro de scope sin convertirse en permiso para los datos que lo referencian.

---

#### 37. Gastos

`numera.finance.expenses.view` se mantiene como autoridad de lectura del gasto y su proyección financiera permitida.

No concede:

```text
CREATE
UPDATE
APPROVE
CANCEL
EXPORT
```

La futura lectura de soportes deberá respetar referencia, finalidad, Storage y sensibilidad del documento; el permiso de gasto no expone credenciales ni archivos fuera de su relación autorizada.

---

#### 38. Hechos económicos

`numera.finance.economic_facts.view` protege la consulta del hecho económico normalizado y su evidencia mínima.

La proyección puede incluir, según alcance:

- identidad;
- entidad legal;
- unidad o marca;
- sede/centro;
- tercero minimizado;
- moneda;
- fechas;
- fuente;
- correlación;
- documento referenciado;
- monto/impuestos permitidos;
- estado;
- calidad y evidencia referenciada.

No concede edición del hecho ni de su fuente.

---

#### 39. Cuentas por pagar

`numera.finance.payables.view` permite leer obligaciones dentro del alcance concedido.

La lectura ordinaria cubre:

- identidad;
- contraparte permitida;
- documento origen;
- fecha y vencimiento;
- importe y moneda;
- saldo;
- estado;
- programación relacionada cuando esté autorizada.

No concede aprobación ni ejecución del pago.

---

#### 40. Cuentas por cobrar

`numera.finance.receivables.view` permite leer cartera y aging dentro del alcance concedido.

La proyección ordinaria no incluye automáticamente:

- identificadores bancarios completos;
- notas de cobranza irrestrictas;
- evidencia de acuerdos no necesaria;
- datos personales completos;
- autoridad de castigo;
- autoridad de modificar acuerdos.

Las capacidades y campos especialmente sensibles se especializan en `NUMERA-AUTH-014`.

---

#### 41. Tesorería

`numera.finance.treasury_movements.view` permite leer movimientos y estado de conciliación de caja/banco dentro del alcance permitido.

No concede:

- credenciales;
- números completos protegidos cuando no sean necesarios;
- secretos de proveedor bancario;
- ejecución de pago;
- reverso;
- conciliación decisoria;
- exportación.

Los detalles sensibles adicionales pertenecen a `NUMERA-AUTH-014`.

---

#### 42. Conciliaciones

`numera.finance.reconciliations.view` cubre una familia de recursos de conciliación con subtipo explícito:

```text
SALES_PAYMENTS
PURCHASES_RECEIPTS
INVENTORY_PRODUCTION_VARIANCES
BANK_TREASURY
OTHER_APPROVED_FINANCIAL_RECONCILIATION
```

El subtipo no crea un permiso separado mientras la semántica de lectura y sensibilidad sea equivalente.

La decisión de conciliar permanece separada.

---

#### 43. Costos

`numera.finance.costs.view` formaliza la capacidad conceptual ya prevista por la convención del catálogo para costos propiedad de NUMERA.

Puede exponer costo vigente/versionado, componentes, fecha efectiva, dimensión y lineage autorizado.

No concede modificar costo maestro ni reescribir la fuente propietaria.

---

#### 44. Periodos

`numera.finance.periods.view` permite consultar periodo, estado y versión aplicables.

Se conserva:

```text
PERIOD_VIEW
!= CLOSE
!= REOPEN
!= CORRECT
```

La lectura no puede utilizarse para cambiar `open`, `closed`, `locked` u otro estado contractual.

---

#### 45. Paquete laboral de pago

`numera.finance.labor_payment_packages.view` protege una proyección compuesta de sensibilidad financiera y personal.

La lectura debe minimizar:

- identificación personal;
- conceptos laborales;
- importes;
- beneficios;
- deducciones;
- referencias de evidencia.

No expone documentos laborales completos, datos médicos, disciplinarios o información ajena a la finalidad financiera aprobada.

---

#### 46. Documentos fiscales

`numera.finance.fiscal_documents.view` permite consultar el documento fiscal interno y su estado autorizado.

No concede:

- presentar ante autoridad;
- emitir por proveedor externo;
- aceptar/rechazar en nombre de la autoridad;
- modificar evidencia histórica;
- leer secretos de integración.

---

#### 47. Programación de pagos

`numera.finance.payment_plans.view` permite consultar propuestas y programaciones de pago.

La programación conserva identidad propia respecto de:

```text
PAYABLE
PAYMENT_EXECUTION
BANK_MOVEMENT
```

Abrir los objetos relacionados exige sus respectivos permisos de lectura.

---

#### 48. Presupuestos

`numera.finance.budgets.view` permite consultar presupuesto y versiones autorizadas.

No concede:

```text
CREATE
UPDATE
APPROVE
PUBLISH
```

`REAL`, `PRESUPUESTADO`, `FORECAST` y `ESCENARIO` permanecen distintos.

---

#### 49. Forecast

`numera.finance.forecasts.view` permite consultar forecast versionado, horizonte y supuestos permitidos.

No lo convierte en presupuesto aprobado, hecho real ni asiento contable.

---

#### 50. Escenarios

`numera.finance.scenarios.view` permite consultar un escenario y su versión autorizada.

No concede:

- crear;
- compartir;
- aprobar;
- publicar;
- activar precio operativo;
- modificar costo maestro;
- postear contabilidad.

Las acciones especializadas pertenecen a `NUMERA-AUTH-015`.

---

#### 51. Versiones de precio

`numera.finance.price_versions.view` protege exclusivamente las versiones de precio modeladas dentro del dominio de decisión de NUMERA.

No concede acceso general al catálogo operativo de PULSO ni autoridad sobre el precio activo.

```text
NUMERA_PRICE_VERSION_VIEW
!= PULSO_OPERATIONAL_PRICE_AUTHORITY
```

---

#### 52. Obligaciones tributarias

`numera.finance.tax_obligations.view` permite consultar obligación, calendario, base, componentes, soporte y estado autorizados.

No equivale a presentar declaración ni a obtener aceptación de autoridad fiscal.

---

#### 53. Distribución de costos

`numera.finance.cost_allocations.view` permite consultar una asignación de costo, su versión, base y resultado.

No concede cambiar la regla ni ejecutar una reasignación.

Cuando se abra el costo relacionado, se reevalúa `numera.finance.costs.view`.

---

#### 54. Indicadores financieros

`numera.analytics.financial_indicators.view` permite consultar indicadores distintos de las capacidades especializadas ya existentes.

No reemplaza:

```text
numera.analytics.break_even.view
numera.analytics.profitability.view
numera.analytics.financial_reports.view
```

Cuando el indicador corresponda exactamente a una de esas familias, se utiliza el permiso especializado.

---

#### 55. Punto de equilibrio

`numera.analytics.break_even.view` permanece sin cambios.

La ausencia de margen, de costo o de cálculo no se presenta como cero económico confirmado.

La lectura requiere scope suficiente sobre los miembros incluidos en el cálculo.

---

#### 56. Rentabilidad

`numera.analytics.profitability.view` permanece sin cambios.

Ingreso esperado, gasto real, presupuesto y variación conservan identidades distintas.

La lectura agregada no concede detalle transaccional sin el permiso del recurso fuente.

---

#### 57. Reportes financieros

`numera.analytics.financial_reports.view` permanece sin cambios.

El permiso cubre consulta de reportes/snapshots autorizados, no exportación.

Una versión publicada permanece identificable por reporte, versión, periodo, corte y dimensiones.

---

#### 58. Búsqueda y autocomplete

Buscar, filtrar o autocompletar un recurso protegido utiliza el mismo permiso `view` del recurso.

La respuesta debe ser una proyección mínima.

No se permite usar endpoints de búsqueda como bypass para obtener campos ocultos o enumerar recursos fuera de scope.

---

#### 59. Conteos y existencia

Un actor sin lectura suficiente no debe inferir mediante conteos, badges, totales, estados vacíos o diferencias entre respuestas la existencia de recursos fuera de su alcance.

Los conteos financieros deben calcularse sobre el conjunto ya autorizado.

---

#### 60. Campos sensibles y proyecciones especializadas

Un permiso `view` autoriza una **proyección**, no necesariamente cada columna física del recurso.

Los campos de mayor sensibilidad pueden requerir:

- redacción;
- máscara;
- omisión;
- referencia indirecta;
- permiso especializado posterior.

`NUMERA-AUTH-014` mantiene la propiedad de lectura sensible especializada de cartera, acuerdos, castigos, bancos y datos financieros de mayor exposición.

---

#### 61. `null`, ausencia y redacción

La autorización debe distinguir:

```text
VALUE_NULL
FIELD_ABSENT
FIELD_REDACTED
FIELD_NOT_APPLICABLE
FIELD_UNKNOWN
```

La ausencia por autorización no se representa como cero, falso o dato real vacío.

---

#### 62. Cache y estado derivado

Una caché de lectura debe preservar:

```text
principal
+ effective_actor
+ permission_code
+ scope
+ resource/query fingerprint
+ projection/version
+ authorization_version
```

La caché no puede reutilizar resultados entre actores o scopes incompatibles.

---

#### 63. URLs, logs y analytics

La definición de permisos de lectura no autoriza colocar datos financieros sensibles en:

- URL;
- query string;
- logs de aplicación;
- analytics;
- telemetría;
- mensajes de error públicos.

Se mantiene la minimización aprobada en `NUMERA-AUTH-002`.

---

#### 64. Lectura desde integraciones

Un evento `RESTRICTED_FINANCIAL` no concede lectura por sí mismo.

Una consumidora que materialice una proyección deberá reautorizar la consulta posterior conforme al permiso del recurso NUMERA.

```text
EVENT_DELIVERED
!= USER_READ_AUTHORIZED
```

---

#### 65. Autoridad externa

La lectura interna de NUMERA no sustituye autoridad contable, fiscal o bancaria externa.

Una referencia externa visible no habilita acceso directo al proveedor ni a sus credenciales.

---

#### 66. Compatibilidad con permisos legacy actuales

Mientras exista runtime legacy:

```text
numera.cost_centers.view
numera.expenses.view
numera.break_even.view
numera.profitability.view
numera.reports.view
```

su reconciliación canónica permanece la aprobada en `NUMERA-AUTH-001`.

Las claves nuevas de esta tarea no pueden usarse como aliases implícitos antes de materialización gobernada.

---

#### 67. Prohibición de fallback

Si una clave de lectura definida aquí todavía no está publicada en runtime, queda prohibido sustituirla por:

```text
numera.access
numera.cost_centers.manage
numera.expenses.manage
numera.*
numera.finance.*
numera.analytics.*
```

La funcionalidad afectada permanece bloqueada o no materializada hasta que exista la capacidad exacta.

---

#### 68. Dependencias de aplicación

En la interfaz NUMERA, una lectura financiera requiere también una sesión válida y acceso a la aplicación.

```text
APP_ACCESS
+
EXACT_READ_PERMISSION
+
VALID_SCOPE
+
VALID_RESOURCE_PROJECTION
+
NO_EFFECTIVE_DENY
=
READ_ELIGIBLE
```

`numera.access` nunca reemplaza `EXACT_READ_PERMISSION`.

---

#### 69. Ownership de tareas posteriores

| Materia | Propietario |
| --- | --- |
| registro/creación | `NUMERA-AUTH-004` |
| aprobación | `NUMERA-AUTH-005` |
| cierre y reapertura | `NUMERA-AUTH-006` |
| exportación | `NUMERA-AUTH-007` |
| empresa, sede y centro de costo | `NUMERA-AUTH-008` |
| auditoría financiera | `NUMERA-AUTH-009` |
| independencia administrativa de turno | `NUMERA-AUTH-010` |
| contexto operacional | `NUMERA-AUTH-011` |
| materialización en paquetes | `NUMERA-AUTH-012` |
| pruebas integrales | `NUMERA-AUTH-013` |
| cartera, acuerdos, castigos, bancos y datos sensibles especializados | `NUMERA-AUTH-014` |
| crear, compartir, aprobar y publicar escenarios, precios y presupuestos | `NUMERA-AUTH-015` |

---

#### 70. Hallazgos y condiciones de salida

| Hallazgo | Bloquea esta definición | Propietario | Condición de salida |
| --- | --- | --- | --- |
| cinco permisos runtime de lectura usan namespace legacy | no | `NUMERA-AUTH-012` + lifecycle transversal | aliases/grants/consumidores migrados al código canónico sin doble autoridad |
| diecisiete claves nuevas aún no están en catálogo runtime | no | `NUMERA-AUTH-012` + packages aplicables | catálogo, contratos, consumidores y pruebas publican exactamente las claves aprobadas |
| panel raíz actual depende materialmente de `numera.access` | no | `NUMERA-AUTH-003` + UX/implementación propietaria | cada tarjeta futura se protege con el permiso del recurso mostrado |
| bandeja de aprobaciones no posee permiso de lectura propio | no | `NUMERA-AUTH-003` y `NUMERA-AUTH-005` | filas visibles por permiso del recurso; acción aprobatoria por permiso de aprobación |
| cartera y tesorería requieren campos especialmente sensibles | no | `NUMERA-AUTH-014` | proyecciones sensibles especializadas definidas antes de exponer esos campos |
| escenarios y precios requieren acciones distintas de lectura | no | `NUMERA-AUTH-015` | crear/compartir/aprobar/publicar quedan separados de `view` |

---

#### 71. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 72. Cobertura de prueba vigente reutilizada

La definición reutiliza, sin modificar, cobertura ya registrada para:

- `TREQ-NUMERA-001` — separación de lectura, registro, aprobación, cierre y exportación;
- `TREQ-NUMERA-002` — identidad, dimensiones y trazabilidad de hechos económicos;
- `TREQ-NUMERA-003` — cartera, obligaciones, bancos, tesorería y permisos separados;
- `TREQ-NUMERA-014` — `numera.access` no concede lectura total del panel;
- `TREQ-NUMERA-015` — lectura de centros de costo separada de administración;
- `TREQ-NUMERA-017` — lectura de gastos separada de registro;
- `TREQ-NUMERA-019` — autorización y semántica del punto de equilibrio;
- `TREQ-NUMERA-020` — autorización y composición de rentabilidad;
- `TREQ-NUMERA-023` — ruta/menú/registro no implican autorización;
- `TREQ-AUTH-001` — capacidad protegida mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-013` — controles server-side no eludibles;
- `TREQ-AUTH-015` — evidencia correlacionable de la decisión de autorización;
- `TREQ-AUTH-063` y `TREQ-AUTH-074` — tratamiento fuerte de capacidades y recursos sensibles cuando corresponda.

Esta sección es trazabilidad de cobertura, no actualización del registro.

---

#### 73. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea es documental y no requiere build de producto durante su preparación. |
| LOCAL | NOT_EXECUTED | La incorporación al checkout y sus validadores pertenecen al ciclo documental ejecutado por el usuario. |
| REMOTA | PASS | Se revisaron `main`, protocolo, contrato de entrega, manifest, continuidad, topología, archivo propietario, convención de códigos, normalización NUMERA, clasificación de modalidad/sensibilidad, alcance, prerrequisitos, contrato de recurso, auditoría NUMERA, 04A y scripts de lifecycle aplicables. |
| OPERATIVA | NOT_EXECUTED | No se consultó información financiera real ni se concedieron permisos. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-AUTH-003` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`. |

---

#### 74. Criterios de aceptación

La tarea queda aceptada cuando se verifica que:

1. existe exactamente un registro `NUMERA-READ-PERMISSION-REGISTRY-001`;
2. `numera.access` queda fuera del conteo de lectura financiera;
3. se preservan exactamente cinco permisos de lectura canónicos vigentes;
4. se definen exactamente diecisiete nuevas capacidades de lectura;
5. el total contractual de permisos de lectura es veintidós;
6. no se renombra ningún permiso canónico vigente;
7. todas las claves nuevas terminan en `.view`;
8. las claves nuevas usan únicamente namespaces `numera.finance` o `numera.analytics`;
9. no se crean permisos `list`, `detail`, `search` o `filter` redundantes;
10. lectura no implica exportación, impresión, compartir ni extracción masiva;
11. lectura no implica registro, edición, aprobación, pago, conciliación, cierre, reapertura ni castigo;
12. los veintidós permisos se consideran de solo lectura;
13. las nuevas capacidades heredan sensibilidad financiera del contrato aprobado;
14. no se crea un nuevo enum de sensibilidad;
15. las nuevas lecturas se definen como administrativas `BASE_ONLY`;
16. no se introduce dependencia de turno por inferencia;
17. la política fuerte de dispositivo no se degrada;
18. simulación no expone datos financieros reales;
19. el recurso/proyección forma parte de cada decisión de lectura;
20. el alcance territorial detallado permanece en `NUMERA-AUTH-008`;
21. agregados no conceden alcance global implícito;
22. drill-down reautoriza el recurso destino;
23. navegar a la aplicación fuente reautoriza en la aplicación propietaria;
24. el panel raíz no recibe permiso omnibus;
25. la bandeja de aprobaciones no recibe permiso omnibus de lectura;
26. `VSCREEN-0095` usa `economic_facts.view`;
27. `VSCREEN-0096` preserva `expenses.view`;
28. `VSCREEN-0098` usa `payables.view`;
29. `VSCREEN-0099` usa `receivables.view`;
30. `VSCREEN-0100` usa `treasury_movements.view`;
31. las tres superficies de conciliación usan `reconciliations.view`;
32. costos usan `costs.view`;
33. periodos usan `periods.view`;
34. reportes preservan `financial_reports.view`;
35. paquete laboral usa `labor_payment_packages.view`;
36. documentos fiscales usan `fiscal_documents.view`;
37. programación de pagos usa `payment_plans.view`;
38. presupuestos usan `budgets.view`;
39. forecast usa `forecasts.view`;
40. escenarios usan `scenarios.view`;
41. versiones de precio NUMERA usan `price_versions.view`;
42. obligaciones tributarias usan `tax_obligations.view`;
43. distribución de costos usa `cost_allocations.view`;
44. indicadores usan `financial_indicators.view`;
45. centros de costo no conceden lectura de recursos que solo los referencian;
46. gastos no conceden mutación;
47. hechos económicos no conceden edición de la fuente;
48. payables no conceden aprobación/pago;
49. receivables no exponen automáticamente campos reservados a `NUMERA-AUTH-014`;
50. tesorería no expone credenciales ni autoridad de pago;
51. reconciliación de lectura no concede decisión de conciliación;
52. costos no conceden modificación del costo maestro;
53. periodos de lectura no conceden cierre/reapertura;
54. paquete laboral minimiza datos personales;
55. documentos fiscales no conceden autoridad externa;
56. programación de pagos conserva identidad separada de ejecución;
57. presupuesto, forecast y escenario permanecen distintos;
58. escenario de lectura no concede acciones de `NUMERA-AUTH-015`;
59. versión de precio NUMERA no concede autoridad sobre precio operativo PULSO;
60. obligación tributaria de lectura no equivale a filing;
61. asignación de costos de lectura no ejecuta reasignación;
62. indicador general no absorbe equilibrio, rentabilidad ni reportes especializados;
63. búsquedas usan el permiso del recurso;
64. conteos se calculan sobre recursos autorizados;
65. permisos de lectura autorizan proyecciones, no todas las columnas físicas;
66. `null`, ausencia y redacción permanecen distinguibles;
67. caché no cruza actores/scopes;
68. datos sensibles no se colocan por defecto en URL/log/analytics;
69. evento recibido no equivale a lectura autorizada;
70. permiso interno no sustituye autoridad externa;
71. no existe fallback a `access`, `manage` o wildcard;
72. no se crean ni modifican requisitos de prueba;
73. no se realizan cambios físicos;
74. `NUMERA-AUTH-004` recibe un registro estable para separar registro de lectura.

---

#### 75. Límites

Esta tarea no:

- publica las diecisiete claves nuevas en catálogo runtime;
- migra los cinco aliases legacy de lectura;
- modifica `numera.access`;
- define permisos de registro;
- define permisos de aprobación;
- define permisos de cierre/reapertura;
- define permisos de exportación;
- define scope final por empresa/sede/centro;
- materializa auditoría;
- implementa contexto operacional;
- modifica packages compartidos;
- ejecuta pruebas integrales;
- define permisos de mutación de cartera/bancos/castigos;
- define acciones de crear/compartir/aprobar/publicar escenarios, precios o presupuestos;
- concede permisos a roles o usuarios;
- modifica RLS, RPC, Server Actions o navegación;
- modifica Supabase;
- modifica el Registro 04A;
- desarrolla `NUMERA-AUTH-004`.

---

#### 76. Handoff a NUMERA-AUTH-004

La siguiente tarea recibe:

```text
NUMERA_READ_PERMISSION_REGISTRY = NUMERA-READ-PERMISSION-REGISTRY-001
NUMERA_CURRENT_ACTIVE_READ_PERMISSION_COUNT = 5
NUMERA_NEW_DEFINED_READ_PERMISSION_COUNT = 17
NUMERA_TOTAL_READ_PERMISSION_DEFINITION_COUNT = 22
NUMERA_ACCESS_EXCLUDED_FROM_FINANCIAL_READ_COUNT = YES
NUMERA_ACCESS_IMPLIES_FINANCIAL_READ = NO
READ_PERMISSION_ACTION_SUFFIX = view
READ_LIST_DETAIL_SEARCH_FILTER = SAME_RESOURCE_PERMISSION
READ_IMPLIES_EXPORT_PRINT_SHARE = NO
READ_IMPLIES_REGISTER_UPDATE_APPROVE = NO
READ_IMPLIES_CLOSE_REOPEN_WRITE_OFF = NO
READ_PERMISSION_SENSITIVITY_REASON = FINANCIAL_DATA
NEW_READ_PERMISSIONS_TARGET_AUTHORIZATION_REQUIREMENT = BASE_ONLY
NEW_READ_PERMISSIONS_TARGET_SHARED_DEVICE_REQUIREMENT = STRONG
NEW_READ_PERMISSIONS_SIMULATION_EXPOSES_REAL_DATA = NO
ROOT_DASHBOARD_OMNIBUS_READ_PERMISSION = FORBIDDEN
APPROVAL_QUEUE_OMNIBUS_READ_PERMISSION = FORBIDDEN
AGGREGATE_VIEW_REQUIRES_AUTHORIZED_DIMENSIONS = YES
DRILLDOWN_REQUIRES_DESTINATION_RESOURCE_PERMISSION = YES
SOURCE_APP_NAVIGATION_REAUTHORIZES = YES
RECEIVABLE_SENSITIVE_DETAIL_OWNER = NUMERA_AUTH_014
TREASURY_SENSITIVE_DETAIL_OWNER = NUMERA_AUTH_014
SCENARIO_MUTATION_PERMISSION_OWNER = NUMERA_AUTH_015
READ_SCOPE_OWNER = NUMERA_AUTH_008
READ_AUDIT_OWNER = NUMERA_AUTH_009
READ_PERMISSION_MATERIALIZATION_OWNER = NUMERA_AUTH_012
MISSING_READ_PERMISSION_FALLBACK = FORBIDDEN
TREQ_CHANGES = 0
NUMERA_AUTH_004_OWNER = REGISTER_PERMISSION_DEFINITION
```

`NUMERA-AUTH-004` deberá definir capacidades de registro/creación sin reutilizar los permisos `.view` como autoridad de escritura y sin alterar el registro de lectura aquí aprobado.

---

#### 77. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUTH-002 — Clasificar información financiera sensible`

**TAREA ACTUAL APROBADA**
`NUMERA-AUTH-003 — Definir permisos de lectura`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUTH-004 — Definir permisos de registro`
### [ ] NUMERA-AUTH-004 — Definir permisos de registro
### [ ] NUMERA-AUTH-005 — Definir permisos de aprobación
### [ ] NUMERA-AUTH-006 — Definir permisos de cierre
### [ ] NUMERA-AUTH-007 — Definir permisos de exportación
### [ ] NUMERA-AUTH-008 — Limitar por empresa, sede o centro de costo
### [ ] NUMERA-AUTH-009 — Registrar auditoría financiera
### [ ] NUMERA-AUTH-010 — Evitar dependencia de turno para administración
### [ ] NUMERA-AUTH-011 — Exigir contexto operativo donde exista captura operacional
### [ ] NUMERA-AUTH-012 — Migrar a paquetes de vento-shell
### [ ] NUMERA-AUTH-013 — Ejecutar pruebas integrales
### [ ] NUMERA-AUTH-014 — Definir permisos de cartera, acuerdos, castigos, bancos y datos financieros sensibles
### [ ] NUMERA-AUTH-015 — Definir permisos para crear, compartir, aprobar y publicar escenarios, precios y presupuestos
