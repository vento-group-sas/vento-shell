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
### [ ] NUMERA-AUTH-002 — Clasificar información financiera sensible
### [ ] NUMERA-AUTH-003 — Definir permisos de lectura
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
