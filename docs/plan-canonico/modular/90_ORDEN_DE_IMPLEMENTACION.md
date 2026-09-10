## Orden de implementación recomendado

FASE 1 — DEFINICIÓN CANÓNICA

1. BLOQUE A — Auditoría integral
2. BLOQUE B — Modelo definitivo mediante `AUTH-MOD-001` a `AUTH-MOD-020`
3. BLOQUE C — Catálogo canónico
4. BLOQUE D — Matrices y datasets de la versión contractual base
5. Completar BLOQUE E y el cierre diferido de BLOQUE B en este orden:
   1. `AUTH-CTX-001` a `AUTH-CTX-027`;
   2. `AUTH-MOD-021`;
   3. `AUTH-CTX-028` a `AUTH-CTX-030`.

FASE 2 — DESCUBRIMIENTO, ARQUITECTURA FUNCIONAL, DATOS Y PREPARACIÓN DE IMPLEMENTACIÓN

6. BLOQUE E1 — Auditar operación real, capacidades, dominios y cobertura de implementación

   Secuencia interna obligatoria de BLOQUE E1:

   `OPS-AUD-001` a `OPS-AUD-015`
   → `OPS-ADM-001`
   → `OPS-GOV-001`
   → `OPS-ACT-001`
   → `OPS-PLAN-001` a `OPS-PLAN-004`
   → `CAP-MAP-001` a `CAP-MAP-015`
   → `CODE-AUD-001` a `CODE-AUD-007`
   → `QA-GOV-001`
   → `CODE-AUD-008` a `CODE-AUD-020`
   → `QA-REG-001`
   → `CAP-SCOPE-001` a `CAP-SCOPE-019`
   → `CAP-COVER-001` a `CAP-COVER-012`
   → `GAP-CTRL-001` a `GAP-CTRL-008`
   → `E1-GATE-001`
   → `PROC-CAT-001`.

   `EXT-GOV-001` podrá ejecutarse después de `OPS-GOV-001` cuando exista el
   expediente requerido. Su ejecución es paralela, condicional y no bloquea
   la continuidad ni el cierre documental de E1.

   La recolección de evidencia de `OPS-PLAN-002` a `OPS-PLAN-004` puede comenzar en paralelo, pero su aprobación formal respetará esta secuencia.

### Reconciliación de deltas posteriores a snapshots E1

Un cambio material posterior al cierre de E1 no reabre ni reescribe snapshots aprobados.
`CODE-AUD-021` se ejecutará sobre el commit estable de
`DELTA-VISO-SCHEDULE-20260731-001` antes de aprobar
`VISO-SCHEDULE-MONTHLY-001`, sin modificar la tarea documental activa.

7. BLOQUE E1 está **CERRADO DOCUMENTALMENTE** mediante `E1-GATE-001 — APROBADA` y `E1-GATE-MANIFEST-002`, con resultado `PASS_WITH_CARRYOVER`. El catálogo de procesos `PROC-CAT-001` a `PROC-CAT-020` y el mapa de actores `PROC-ACTOR-001` a `PROC-ACTOR-010` están **APROBADOS**; la continuidad documental pasa a `UX-STATION-001`.
8. BLOQUE E2 — Diseñar procesos TO-BE, actores, pantallas, experiencia y requisitos no funcionales.

   Secuencia interna obligatoria de BLOQUE E2:

   `PROC-ACTOR-001` a `PROC-ACTOR-010`
   → `UX-STATION-001`
   → `OPS-CAN-001`
   → `OPS-LOG-001`
   → `OPS-B2B-001`
   → `CAP-TAL-001` a `CAP-TAL-006`
   → `UX-BASE-001` a `UX-BASE-015`
   → `NFR-REQ-001` a `NFR-REQ-011`
   → `UX-STATION-002` a `UX-STATION-007`
   → `UX-STATION-010` a `UX-STATION-012`
   → `UX-STATION-008`
   → `UX-STATION-009`
   → `UX-ADMIN-001` a `UX-ADMIN-005`
   → `PROC-SCREEN-001` a `PROC-SCREEN-028`
   → `PROC-COVER-001` a `PROC-COVER-010`
   → `NFR-REQ-012`.

   `UX-STATION-008` y `UX-STATION-009` quedan después de
   `UX-STATION-010` a `UX-STATION-012`: el prototipo y la matriz final deben
   validar un diseño completo, no una estación que todavía carezca de
   gramática, bandeja o composición.

   La cabecera, la tarea actual y la siguiente tarea se derivan
   automáticamente de `active-sequence.json`; no deberán corregirse
   manualmente al terminar cada subbloque.
9. Ejecutar `AUTH-UI-001` a `AUTH-UI-029` y aprobar propiedad funcional y contrato de pantallas. Las rutas posteriores a inventarios aprobados se reconciliarán mediante `AUTH-UI-061` sin renumerar identidades históricas.
10. BLOQUE X — Definir documentalmente integraciones internas, externas, traspasos y contrato canónico de ventas, sin ejecutar sincronizaciones, pilotos ni efectos operativos
11. Aprobar los contratos y planes de traspaso entre aplicaciones y de integración temporal del POS externo; su implementación y ejecución quedan reservadas a los paquetes E5 y sus puertas
12. BLOQUE E3 — Auditar Supabase, normalización, fuentes de verdad y arquitectura objetivo
13. Aprobar dominios, arquitectura de datos, normalización y plan de transición en esta secuencia interna obligatoria:

```text
SUPA-AUD-001 a SUPA-AUD-024
        ↓
DATA-NORM-AUD-001 a DATA-NORM-AUD-007
        ↓
SUPA-ARC-001 a SUPA-ARC-024
        ↓
DATA-NORM-ARC-001 a DATA-NORM-ARC-012
        ↓
SUPA-ARC-025
        ↓
SUPA-TRANS-001 a SUPA-TRANS-015
        ↓
DATA-NORM-TRANS-001 a DATA-NORM-TRANS-009
        ↓
SUPA-TRANS-016
```

   `SUPA-ARC-025` es la consolidación final del ADR y no puede aprobarse antes
   de cerrar la arquitectura especializada de normalización. `SUPA-TRANS-016`
   es la puerta final de transición y no puede aprobarse antes de cerrar
   `DATA-NORM-TRANS-001` a `DATA-NORM-TRANS-009`.

   Como `SUPA-ARC-001` a `SUPA-ARC-024` ya fueron aprobadas antes de detectar
   la omisión, no se reabren por defecto. La continuidad activa recupera las
   tareas `DATA-NORM-*` pendientes antes de `SUPA-ARC-025`; cualquier
   contradicción sustantiva detectada deberá volver a la tarea propietaria
   exacta, sin invalidar en bloque decisiones estructurales compatibles.
14. BLOQUE E4 — Definir colas, impresión, notificaciones, documentos y evidencia
15. Aprobar contratos, planes de implementación y criterios de piloto de los servicios transversales
15A. Para programación laboral VISO, completar `VISO-SCH-001` a `VISO-SCH-008`, `CODE-AUD-021` y `AUTH-UI-061` antes de materializar `VISO-SCHEDULE-MONTHLY-001`.
16. BLOQUE E5 — Convertir capacidades aprobadas en paquetes y planes verificables de implementación, readiness, cutover, piloto, rollback e hypercare
17. Reabrir el catálogo y actualizar matrices o datasets únicamente cuando una capacidad nueva madura lo requiera
18. Aprobar la puerta documental `E5-GATE-008` para habilitar posteriormente la ejecución por `SHELL-CI-020` a `SHELL-CI-024`

En esta fase se define:

- qué capacidades necesita realmente Vento Group;
- qué procesos existen y cuál es su diseño TO-BE;
- qué está completo, parcial, provisional, roto o ausente;
- qué aplicación, dominio y repositorio son propietarios;
- qué actor, pantalla y dispositivo son necesarios;
- qué eventos, colas, documentos e impresiones se producen;
- qué fuentes de verdad y dominios conservan los datos;
- qué requisitos no funcionales son obligatorios;
- qué cambios exactos requiere cada repositorio;
- cómo se probará, desplegará, revertirá y estabilizará cada paquete;
- cómo se migrará sin romper consumidores existentes.

Todavía no se implementan interfaces definitivas ni se reorganiza
físicamente Supabase.

### Ciclo obligatorio de los requisitos de prueba

```text
E1 — DESCUBRIMIENTO
identificar la regla y crear `TREQ-*`
        ↓
E2 / E3 / E4 — DISEÑO
definir escenario, datos, resultado esperado y riesgo
        ↓
E5 — PLANIFICACIÓN
vincular el requisito con un paquete mediante `DELIV-PKG-016`
        ↓
T / R0 — INFRAESTRUCTURA
crear runner, harness, entorno reproducible y CI
        ↓
IMPLEMENTACIÓN POR PAQUETE
escribir y ejecutar la prueba junto con el código
        ↓
PILOTO E HYPERCARE
convertir cada defecto encontrado en una prueba de regresión
        ↓
U — CIERRE INTEGRAL
ejecutar regresión completa, E2E, seguridad, UX y pruebas operativas
```

Reglas:

- E1 identifica el requisito, pero no necesariamente implementa la prueba.
- E2, E3 y E4 completan su especificación.
- E5 asigna cada requisito a un paquete concreto.
- T y R0 crean la infraestructura necesaria.
- La prueba se implementa junto con el código del paquete.
- Los defectos encontrados durante piloto o hypercare generan pruebas de regresión.
- U ejecuta la certificación integral y no sustituye las pruebas de cada paquete.

### Ciclo obligatorio de fundación, planificación y ejecución de cada paquete

```text
SHELL-CI-001 a SHELL-CI-019
→ habilitar y certificar infraestructura transversal de CI, pruebas, versionado, evidencia y rollback

PRE_E5_FOUNDATION APLICABLE
→ materializar una sola vez la fundación compartida necesaria
→ autorización física explícita
→ pruebas y evidencia propias
→ reutilización posterior por package_id

PRE_E5_PLANNING
→ DELIV-PKG / readiness / cutover / hypercare / gates
→ construir el expediente exacto del package_id

E5-GATE-008::<package_id>
→ aprobar el paquete completo y realmente ejecutable
→ todavía sin ejecutar el trabajo POST_E5_PACKAGE

SHELL-CI-020::<package_id>
→ iniciar implementación y despliegue post-gate del paquete

POST_E5_PACKAGE
→ ejecutar únicamente las instancias físicas pertenecientes al package_id o implementation_unit_id autorizado

AUTH-QA / UX-QA APLICABLES
→ validar el alcance implementado

SHELL-CI-021::<package_id>
→ readiness

SHELL-CI-022::<package_id>
→ cutover y piloto

SHELL-CI-023::<package_id>
→ hypercare y estabilización

SHELL-CI-024::<package_id>
→ cierre y transferencia

BLOQUE U
→ certificación integral cuando corresponda
```

La cardinalidad y el gate temporal son dimensiones independientes. Una tarea `TEMPLATE_PER_PACKAGE` puede pertenecer a `PRE_E5_PLANNING` o a `POST_E5_PACKAGE`; su modo no determina por sí solo el momento de ejecución.

Una fundación `PRE_E5_FOUNDATION` no necesita un `E5-GATE-008::<package_id>` para su materialización inicial porque no constituye la implementación vertical de un paquete. Sí requiere contrato aprobado, dependencias técnicas satisfechas y autorización física explícita.

Ninguna migración, backfill, despliegue vertical, adopción de consumidor ni otra instancia clasificada `POST_E5_PACKAGE` podrá ejecutarse antes de `E5-GATE-008::<package_id>`.

Una tarea `UNREVIEWED` no recibe ninguna autorización nueva durante esta reconciliación. Su clasificación temporal deberá resolverse en el bloque de auditoría correspondiente.

<!-- PRIORITY-DELIVERY-LANES:START -->
### Secuencia VISO-SCHEDULE-MONTHLY-001

```text
CODE-AUD-021
→ AUTH-UI-061
→ VISO-SCH-001 a VISO-SCH-008
→ VISO-UX / AUTH-UI / AUTH-SRV aplicables
→ SUPA-TRANS aplicables
→ DELIV-PKG-001 a DELIV-PKG-025::VISO-SCHEDULE-MONTHLY-001
→ E5-GATE-008::VISO-SCHEDULE-MONTHLY-001
→ SHELL-CI-020::VISO-SCHEDULE-MONTHLY-001
→ BLOQUE R
→ AUTH-QA / UX-QA
→ SHELL-CI-021 a SHELL-CI-024::VISO-SCHEDULE-MONTHLY-001
```

No se agrega a `priority-delivery-lanes.json`.

### Carril vertical prioritario por paquete

El orden de implementación conserva todas sus fases, tareas, dependencias y
criterios de cierre. Para reducir tiempo hasta el primer valor operativo se
permite ejecutar un paquete vertical antes de completar habilitadores no
relacionados, únicamente cuando ese paquete:

1. esté registrado en `priority-delivery-lanes.json`;
2. conserve `canonical_sequence_unchanged = true`;
3. identifique alcance incluido, excluido y diferido;
4. disponga de los artefactos exactos que necesita de tareas transversales;
5. no utilice un artefacto incremental para aprobar parcialmente su tarea
   canónica de origen;
6. complete `DELIV-PKG-001` a `DELIV-PKG-025`;
7. supere una instancia trazable de
   `E5-GATE-008::<package_id>`;
8. complete y certifique antes de la puerta `SHELL-CI-001` a
   `SHELL-CI-019`;
9. ejecute íntegramente
   `SHELL-CI-020` a `SHELL-CI-024` con el mismo `package_id`;
10. ejecute mediante BLOQUE R cualquier migración o cambio físico de Supabase,
    creado y gobernado desde `vento-shell`;
11. separe explícitamente tareas de diseño, tareas de implementación y trabajo
    posterior preservado;
12. demuestre compatibilidad, pruebas, rollout, rollback, piloto, conciliación
    y soporte sin crear contratos competidores.

Existe una sola continuidad de trabajo visible, derivada de la ruta elegida:

```text
RUTA NORMAL
→ continúa por continuity-route.json

RUTA PRIORITARIA
→ avanza por ordered_execution_stages y registra instancias por package_id
```

#### Decisión obligatoria de ruta

```text
¿LA PRIORIDAD DE IMPLEMENTACIÓN ACTIVA ES REMISIONES NEXO?

SÍ
→ seguir NEXO-REMISSIONS-001 desde la etapa 1 hasta la 44
→ no volver al flujo normal entre etapas salvo suspensión documentada

NO
→ seleccionar NORMAL-CANONICAL-FLOW-001 en execution-route.json
→ seguir el flujo normal del plan y la tarea derivada de active-sequence.json
→ no ejecutar tareas del carril por inferencia
```

La selección se registra en `execution-route.json`. `active-sequence.json` se
regenera como proyección de esa selección y publica una sola tarea actual. La
ruta prioritaria no reordena físicamente el documento ni elimina el trabajo
restante; después de certificar el paquete vuelve al flujo normal declarado.

La ruta normal contiene el inventario canónico completo, agrupado por las
fases de implementación descritas en este documento. Al cerrar el carril
prioritario, el compilador filtra las tareas ya aprobadas y continúa por la
primera pendiente real; no repite trabajo global cerrado ni considera cerradas
las tareas que solo tengan una instancia de paquete aprobada. Las condiciones
y decisiones de continuidad se conservan en su etapa propietaria.

<!-- NEXO-REMISSIONS-ORDER:START -->
#### Registro histórico inactivo de NEXO-REMISSIONS-001

Esta tabla se genera automáticamente desde `priority-delivery-lanes.json` y
se conserva exclusivamente para trazabilidad. `execution-route.json` selecciona el flujo normal integral.
Ninguna fila de este registro constituye una tarea vigente, un `package_id`,
una aprobación global o una autorización de implementación. Los destinos
operativos actuales se definen mediante `DELIV-PKG-001..025::<package_id>`.
Las etapas son secuenciales y no se avanza mientras la anterior carezca
de resultado y evidencia. Las tareas de diseño terminan antes de E5.
Los habilitadores PRE_E5_FOUNDATION aplicables pueden materializarse antes de E5 con autorización física explícita y evidencia propia.
Ninguna migración o cambio físico POST_E5_PACKAGE perteneciente al paquete comienza antes
de `E5-GATE-008::<package_id>` para el paquete propietario que llegue a aprobarse.

| Etapa | Grupo | Tareas exactas | Resultado para avanzar |
| ----: | ----- | -------------- | ---------------------- |
| 1 | `EVENT_CONTRACTS` | `INT-APP-001` a `INT-APP-010` | contratos empresariales completos antes de diseñar o implementar consumidores |
| 2 | `SUPABASE_AUDIT` | `SUPA-AUD-001` a `SUPA-AUD-024`; `DATA-NORM-AUD-001` a `DATA-NORM-AUD-007` | auditoría integral de Supabase y auditoría específica de normalización, calidad textual, duplicados, consumidores y riesgos |
| 3 | `SUPABASE_ARCHITECTURE` | `SUPA-ARC-001` a `SUPA-ARC-024`; `DATA-NORM-ARC-001` a `DATA-NORM-ARC-012`; `SUPA-ARC-025` | arquitectura estructural y de normalización completas, consolidadas mediante el ADR final antes de cualquier transición o cambio físico |
| 4 | `SUPABASE_TRANSITION` | `SUPA-TRANS-001` a `SUPA-TRANS-015`; `DATA-NORM-TRANS-001` a `DATA-NORM-TRANS-009`; `SUPA-TRANS-016` | transición general y de normalización ejecutables, con compatibilidad, pruebas, rollback y aprobación integral antes de BLOQUE R |
| 5 | `H_SHARED_AUDIT` | `SHELL-AUD-*` (familia canónica completa) | auditoría completa de componentes compartidos y clasificación de propiedad |
| 6 | `H_SHARED_DISTRIBUTION` | `SHELL-PKG-*` (familia canónica completa) | mecanismo de distribución, versionado, compatibilidad, deprecación, actualización y rollback definidos antes de crear paquetes compartidos |
| 7 | `TRANSVERSE_SERVICE_CATALOG` | `TSVC-CAT-001` a `TSVC-CAT-010` | catálogo, propiedad, contratos, seguridad, idempotencia, observabilidad y adopción de servicios transversales |
| 8 | `AUTH_UI_CONTRACT` | `AUTH-UI-030` a `AUTH-UI-039` | contrato de lectura, acciones, contexto, sensibilidad y masking de las vistas |
| 9 | `SHARED_DEVICE_CONTRACT` | `AUTH-DEV-001` a `AUTH-DEV-006` | identidad, sede, área, aplicaciones y permisos máximos del dispositivo compartido definidos antes del paquete |
| 10 | `SIMULATION_CONTRACT` | `AUTH-SIM-001` a `AUTH-SIM-006` | actor habilitado, roles, territorio, turno y separación entre permisos reales y simulados definidos antes del paquete |
| 11 | `AUTHORIZATION_ERRORS` | `AUTH-ERR-001` a `AUTH-ERR-020` | contrato completo de razones y mensajes de bloqueo, sin filtrar información sensible |
| 12 | `NEXO_INVENTORY_CLASSIFICATION` | `NEXO-DOM-001` | clasificación canónica de consumibles, stock por cantidad, reutilizables, activos, repuestos, kits y contenedores antes de diseñar o implementar inventario y remisiones |
| 13 | `NEXO_FUNCTIONAL_UX` | `NEXO-UX-001` a `NEXO-UX-025` | inventario, navegación por actor, flujo completo de remisiones, movimientos, excepciones, prototipos y métricas de piloto |
| 14 | `NEXO_UI_VALIDATION` | `AUTH-UI-052` a `AUTH-UI-060` | diseño, prototipos, validación con usuarios y aprobación de pantallas NEXO antes de implementar |
| 15 | `CONDITIONAL_DESIGN_ARTIFACTS` | Evaluar la matriz condicional de diseño mostrada debajo | cada grupo queda completado o justificado como no aplicable antes de DELIV-PKG |
| 16 | `CONDITIONAL_IMPLEMENTATION_SCOPE` | Evaluar la matriz condicional de implementación mostrada debajo | cada grupo de implementación queda incluido o excluido expresamente en DELIV-PKG antes de E5-GATE-008 |
| 17 | `PACKAGE_DEFINITION` | `DELIV-PKG-001` a `DELIV-PKG-025` | paquete ejecutable, verificable y reversible |
| 18 | `E5_READINESS_PLAN` | `READY-GATE-001` a `READY-GATE-015` | readiness técnico, operativo, de datos, permisos, hardware, soporte, monitoreo, respaldo y piloto |
| 19 | `E5_CUTOVER_PLAN` | `CUTOVER-OPS-001` a `CUTOVER-OPS-010` | cutover, convivencia, doble efecto, conciliación, reversión, métricas y salida de piloto |
| 20 | `E5_HYPERCARE_PLAN` | `HYPERCARE-OPS-001` a `HYPERCARE-OPS-010` | monitoreo, incidentes, conciliación, deuda, soporte, contingencias y autoridad de cierre |
| 21 | `CI_FOUNDATION` | `SHELL-CI-001` a `SHELL-CI-019` | capacidad de probar, versionar, actualizar, revertir y publicar evidencia certificada antes de E5-GATE-008 y reutilizable por SHELL-CI-020 |
| 22 | `R0_DATABASE_SAFETY` | `AUTH-DB-015`; `AUTH-DB-027` a `AUTH-DB-029`; `AUTH-DB-001` a `AUTH-DB-005` | migraciones gobernadas, harness, baseline y drift, respaldo, restauración, rollback y contención inicial de exposición disponibles y certificados antes de E5-GATE-008 |
| 23 | `R1_AUTH_PHYSICAL_CORE` | `AUTH-DB-016`; `AUTH-DB-018`; `AUTH-DB-017`; `AUTH-DB-019`; `AUTH-DB-033`; `AUTH-DB-035`; `AUTH-DB-034`; `AUTH-DB-032`; `AUTH-DB-012` a `AUTH-DB-014` | fundación física canónica de autorización, contexto, identidad y auditoría disponible y certificada antes de los paquetes que dependan de ella |
| 24 | `E5_ENTRY_GATES` | `E5-GATE-001` a `E5-GATE-007` | cobertura, brechas, NFR, rollout, rollback, piloto, capacitación y trazabilidad TREQ verificadas |
| 25 | `PACKAGE_GATE` | `E5-GATE-008::NEXO-REMISSIONS-001` | autorización explícita del paquete, todavía sin despliegue ni cambio físico |
| 26 | `IMPLEMENTATION_START` | `SHELL-CI-020::NEXO-REMISSIONS-001` | Iniciar la implementación y el despliegue únicamente del paquete aprobado. |
| 27 | `H_SHARED_CONTRACTS` | `SHELL-CON-*` (familia canónica completa) | paquetes de contratos compartidos e integraciones implementados y versionados |
| 28 | `H_AUTH_CONTEXT_BASE` | `SHELL-AUTH-001`; `SHELL-CTX-001` | núcleo único de autorización y contexto disponible antes del backend autoritativo |
| 29 | `H_AUTH_CONTEXT_CONVERGENCE` | `SHELL-CTX-002` a `SHELL-CTX-006`; `SHELL-AUTH-002` a `SHELL-AUTH-004` | contexto completo, adapters, scope por solicitud y gates contra legacy implementados |
| 30 | `H_SHARED_REMAINING` | `SHELL-NORM-*` (familia canónica completa); `SHELL-DB-*` (familia canónica completa); `SHELL-UI-*` (familia canónica completa); `SHELL-MIG-*` (familia canónica completa); `SHELL-NATIVE-*` (familia canónica completa); `SHELL-APP-*` (familia canónica completa) | normalización compartida, acceso a datos, componentes web, migración reversible de consumidores, compatibilidad nativa y experiencia del Hub disponibles antes de consumidores finales |
| 31 | `CONDITIONAL_IMPLEMENTATION_EXECUTION` | Ejecutar la matriz condicional de implementación aprobada en DELIV-PKG | todos los grupos aplicables ejecutados bajo el mismo package_id; cada no aplicable conserva su justificación aprobada |
| 32 | `R2_NEXO_DATABASE_PACKAGE` | `AUTH-DB-020`; `AUTH-DB-006` a `AUTH-DB-010`; `AUTH-DB-021`; `AUTH-DB-011`; `AUTH-DB-022` a `AUTH-DB-026` | migración NEXO con RPC, RLS, grants, constraints, Storage, Realtime, automatizaciones, índices y tipos ejecutada bajo el package_id |
| 33 | `SERVER_ACTIONS_COMPLETE` | `AUTH-SRV-001` a `AUTH-SRV-018` | Server Actions, API routes y RPC inventariados, protegidos y migrados al contrato compartido |
| 34 | `SHARED_DEVICE_IMPLEMENTATION` | `AUTH-DEV-007` a `AUTH-DEV-014` | identificación del trabajador, límites efectivos, auditoría, revocación, sesión y pruebas de tablets NEXO implementados |
| 35 | `SIMULATION_IMPLEMENTATION` | `AUTH-SIM-007` a `AUTH-SIM-014` | visibilidad, auditoría, restricciones, solo lectura y validación integral de simulación implementadas |
| 36 | `NEXO_AUTHORIZATION` | `NEXO-AUTH-001` a `NEXO-AUTH-006`; `NEXO-AUTH-008` a `NEXO-AUTH-020` | autorización NEXO obligatoria del alcance base; la protección de producción vinculada permanece condicional y se ejecuta únicamente cuando el paquete incluye INT-PROD-005 |
| 37 | `AUTH_UI_ENFORCEMENT` | `AUTH-UI-040` a `AUTH-UI-051` | protección de navegación, URL, acciones y estados transversales implementada |
| 38 | `H_FINAL_AUTH_ADOPTION` | `SHELL-AUTH-005` | consumidores migrados y certificados al SDK compartido después de backend, adapters, UI y protecciones |
| 39 | `U_AUTHORIZATION_CERTIFICATION` | `AUTH-QA-001` a `AUTH-QA-030` | autorización, territorio, contexto, dispositivo, simulación, servidor, RPC, rollback, auditoría y regresión certificadas |
| 40 | `U_NEXO_EXPERIENCE_CERTIFICATION` | `UX-QA-001` a `UX-QA-020`; `UX-QA-024` | experiencia transversal y NEXO probadas con actores, dispositivos, conectividad, seguridad e idempotencia |
| 41 | `READINESS` | `SHELL-CI-021::NEXO-REMISSIONS-001` | Validar readiness técnico y operativo. |
| 42 | `PILOT` | `SHELL-CI-022::NEXO-REMISSIONS-001` | Ejecutar piloto controlado y conservar evidencia. |
| 43 | `HYPERCARE` | `SHELL-CI-023::NEXO-REMISSIONS-001` | Estabilizar, conciliar y resolver defectos del alcance. |
| 44 | `CERTIFICATION` | `SHELL-CI-024::NEXO-REMISSIONS-001` | Certificar únicamente el paquete de remisiones NEXO. |

##### Matriz condicional de diseño

Se evalúa antes de `DELIV-PKG-001`. “No aplica” exige justificación escrita;
los grupos aplicables deben quedar diseñados antes de definir el paquete.

| Orden | Grupo | Se activa cuando | Tareas exactas |
| ----: | ----- | ---------------- | -------------- |
| 1 | `PRODUCTION_CONDITIONAL` | la remisión incluye productos producidos o faltantes que activan producción | `INT-PROD-005` |
| 2 | `PRINTING_CONDITIONAL` | el paquete imprime documento, etiqueta, manifiesto o comprobante | `PRINT-ARC-001` a `PRINT-ARC-020` |
| 3 | `EVIDENCE_CONDITIONAL` | el paquete almacena fotografías, firmas, archivos o evidencia documental | `EVID-ARC-001` a `EVID-ARC-010` |
| 4 | `QUEUE_CONDITIONAL` | se ejecutan trabajos asíncronos, reintentos diferidos o impresión en cola | `QUEUE-ARC-001` a `QUEUE-ARC-012` |
| 5 | `NOTIFICATIONS_CONDITIONAL` | el paquete envía alertas, novedades, confirmaciones, escalamiento o avisos a actores | `NOTIFY-ARC-001` a `NOTIFY-ARC-010` |
| 6 | `TECHNOLOGY_SUPPORT_CONDITIONAL` | el piloto requiere tablets, red, impresoras, periféricos, telemetría o soporte operativo | `TI-DOM-001` a `TI-DOM-013`; `TI-AUTH-001` a `TI-AUTH-004`; `TI-UX-001` a `TI-UX-006`; `TI-INT-001` a `TI-INT-003` |
| 7 | `INFORMATION_GOVERNANCE_CONDITIONAL` | el paquete conserva documentos, evidencia, datos personales, firmas, exportaciones o retención | `INFO-DOM-001` a `INFO-DOM-013`; `INFO-AUTH-001` a `INFO-AUTH-004`; `INFO-UX-001` a `INFO-UX-006`; `INFO-INT-001` a `INFO-INT-003` |
| 8 | `MASTER_DATA_ANALYTICS_CONDITIONAL` | el paquete crea o cambia datos maestros, métricas oficiales, conciliaciones o analítica de inventario | `DATA-DOM-001` a `DATA-DOM-017`; `DATA-AUTH-001` a `DATA-AUTH-004`; `DATA-UX-001` a `DATA-UX-008`; `DATA-INT-001` a `DATA-INT-004` |
| 9 | `CONTINUITY_CONDITIONAL` | el alcance exige operación degradada, offline, respaldo, restauración, contingencia o reincorporación | `CONT-DOM-001` a `CONT-DOM-015`; `CONT-AUTH-001` a `CONT-AUTH-004`; `CONT-UX-001` a `CONT-UX-007`; `CONT-INT-001` a `CONT-INT-004` |

##### Matriz condicional de implementación

Se decide antes de `E5-GATE-008` y se ejecuta únicamente después de la
puerta, dentro de `SHELL-CI-020::NEXO-REMISSIONS-001` y con el mismo
`package_id`. La exclusión también debe quedar aprobada y trazable.

| Orden | Grupo | Se activa cuando | Tareas exactas |
| ----: | ----- | ---------------- | -------------- |
| 1 | `PRODUCTION_LINK_IMPLEMENTATION` | la remisión incluye faltantes o productos producidos y activa el tratamiento definido en INT-PROD-005 | `NEXO-AUTH-007` |
| 2 | `PHYSICAL_NORMALIZATION_CONDITIONAL` | la transición aprobada modifica o normaliza datos existentes de catálogo, búsqueda o inventario | `DATA-NORM-DB-001` a `DATA-NORM-DB-010` |
| 3 | `EXTERNAL_INTEGRATION_CONDITIONAL` | la remisión consume o publica datos mediante un sistema externo y exige infraestructura física de integración | `INT-DB-001` a `INT-DB-008` |

##### Trabajo posterior preservado

Estas tareas no desaparecen ni se consideran terminadas por certificar el
paquete. Regresan al flujo normal en su fase propietaria.

| Orden | Tareas preservadas | Motivo |
| ----: | ------------------ | ------ |
| 1 | `AUTH-DB-030` a `AUTH-DB-031` | R3 es cierre global posterior a adopción comprobada de todos los consumidores y no puede bloquear el primer paquete NEXO. |
| 2 | `AUTH-DEV-015` a `AUTH-DEV-016` | Las pruebas físicas específicas de PULSO y FOGO permanecen en sus fases propietarias. |
| 3 | `NEXO-DOM-002` a `NEXO-DOM-038`; `NEXO-AUTH-021` a `NEXO-AUTH-032`; `NEXO-UX-026` a `NEXO-UX-048` | LPN, contenedores avanzados, activos, reutilizables, repuestos, flota, mantenimiento e instalaciones continúan en el cierre completo de SUBBLOQUE K2; NEXO-DOM-001 sí es prerrequisito del paquete base. |

Los artefactos del carril no cambian por sí solos el marcador de una tarea
canónica. Cada aprobación global continúa requiriendo alcance completo y
confirmación explícita.
<!-- NEXO-REMISSIONS-ORDER:END -->

#### Cómo seguir la tabla

- dentro de cada rango se comienza por la primera tarea no aprobada;
- una tarea ya aprobada se consume como antecedente y no se repite;
- no se inicia la etapa siguiente hasta cerrar la anterior o registrar una
  suspensión formal del carril;
- las matrices condicionales de diseño se resuelven antes de `DELIV-PKG`;
- los grupos condicionales de implementación se incluyen o excluyen expresamente
  en `DELIV-PKG` y solo se ejecutan después de `E5-GATE-008` dentro de
  `SHELL-CI-020`;
- BLOQUE H se completa íntegramente, pero sus tareas de implementación quedan
  después de la puerta y respetan sus dependencias con BLOQUE R;
- los subconjuntos `AUTH-QA` y `UX-QA` ligados al paquete se ejecutan antes de
  readiness; la certificación transversal completa de BLOQUE U permanece en
  su fase final;
- las tareas posteriores preservadas continúan en el flujo normal y no pueden
  marcarse completas por el cierre de remisiones.

La ejecución prioritaria no permite:

- saltar una dependencia aplicable;
- ejecutar migraciones, backfills, despliegues o cambios físicos antes de
  `E5-GATE-008::<package_id>`;
- utilizar un artefacto de diseño como evidencia de implementación;
- declarar completo un bloque, aplicación o dominio por cerrar un paquete;
- cambiar el significado de una tarea aprobada;
- aprobar parcialmente una tarea transversal;
- introducir excepciones locales que el resto del plan deba heredar;
- desplazar a NEXO la propiedad de contratos, datos o componentes
  transversales;
- convertir deuda o alcance diferido en una omisión sin tarea y propietario.

#### Carril histórico suspendido

`NEXO-REMISSIONS-001 — Remisiones NEXO como primer paquete vertical`

Su antigua designación no autoriza implementación. El estado vigente es
`SUSPENDED`, `active = false`; se conserva para trazabilidad y no puede cambiar
la tarea actual, aprobar marcadores globales ni crear paquetes.

El cierre de este paquete significa exclusivamente que solicitud, preparación,
despacho, custodia, tránsito, recepción, cancelación, movimientos y
conciliación incluidos funcionan y fueron certificados. No significa cierre de
NEXO, BLOQUE K, inventario completo ni Vento OS.
<!-- PRIORITY-DELIVERY-LANES:END -->


FASE 3 — FUNDACIÓN COMPARTIDA, DATOS Y SEGURIDAD

1.  BLOQUE H — Crear la fundación de VENTO-SHELL como núcleo compartido
2.  Crear contratos, eventos, normalización compartida, helpers puros y estructura inicial de @vento/supabase
3.  Ejecutar AUTH-UI-030 a AUTH-UI-039
4.  BLOQUE T — Establecer CI, pruebas, staging, drift, rollback base y el ciclo `SHELL-CI-020` a `SHELL-CI-024`
5.  BLOQUE J — Inventariar y proteger acciones de servidor
6.  BLOQUE R — Ejecutar R0, R1 y los primeros paquetes aprobados de R2
7.  BLOQUE S — Mensajes y experiencia de bloqueo

AUTH-UI-030 a AUTH-UI-039 define:

permisos;
turno;
check-in;
sede;
área;
dispositivos;
simulación;
datos sensibles;
masking.

BLOQUE T deberá establecer la capacidad mínima de validar migraciones,
reconstruir la base, ejecutar pruebas, desplegar en staging, detectar drift
y verificar rollback antes del primer paquete estructural.

BLOQUE J protege acciones de servidor.

BLOQUE R ejecuta inicialmente:

- R0 — preparación y contención;
- R1 — fundación física;
- los primeros paquetes de R2 aprobados y necesarios para habilitar
  las fases siguientes.

R2 continuará progresivamente durante las fases de cada aplicación.

R3 se ejecutará durante el cierre transversal.

<!-- AUTH-DB-032-035:START -->
### Secuencia contractual obligatoria de autorización dentro de R1

```text
AUTH-DB-019
        ↓
AUTH-DB-033
        ↓
AUTH-DB-035
        ↓
AUTH-DB-034
        ↓
AUTH-DB-032
        ↓
AUTH-DB-006 a AUTH-DB-010
```

`AUTH-DB-027` deberá acompañar cada paquete como harness obligatorio.

Reglas:

- `AUTH-DB-033` requiere la arquitectura aprobada de esquemas, helpers, `SECURITY DEFINER`, grants y RLS;
- `AUTH-DB-035` depende del resolver canónico y debe implementar generaciones transaccionales, token de frescura y outbox de invalidación;
- `AUTH-DB-034` se implementa después de disponer del resolver y del contrato físico de frescura;
- `AUTH-DB-032` integra persistencia durable después de disponer de decisiones canónicas;
- `AUTH-DB-006` a `AUTH-DB-010` adoptan el resolver y el evaluador en RPC sensibles;
- las funciones boolean legacy solo se retiran después de compatibilidad, pruebas y certificación.
<!-- AUTH-DB-032-035:END -->

<!-- SHELL-AUTH-CANONICAL:START -->
### Secuencia canónica de autorización compartida

```text
FUNDACIÓN COMPARTIDA
SHELL-AUD-002..005
→ SHELL-PKG-001..008
→ SHELL-CON-001..008

PREPARACIÓN Y NÚCLEO FÍSICO
AUTH-DB-015 + AUTH-DB-027..029 + AUTH-DB-001..005
→ AUTH-DB-019
→ AUTH-DB-033
→ AUTH-DB-036
→ AUTH-DB-035
→ AUTH-DB-034
→ AUTH-DB-032

CONVERGENCIA Y ADOPCIÓN POST-E5 POR PACKAGE
SHELL-AUTH-001 + SHELL-CTX-001
→ SHELL-CTX-002..006
→ SHELL-AUTH-002
→ SHELL-AUTH-003
→ SHELL-AUTH-004
→ AUTH-DB-020
→ AUTH-DB-006..010 + AUTH-DB-021
→ SHELL-AUTH-005
→ AUTH-DB-030
→ AUTH-DB-031
```

`AUTH-DB-027` acompaña cada paquete físico. La migración multi-repositorio
no puede completarse antes de resolver contexto, demostrar frescura e invalidación, evaluar, persistir, adaptar
RPC y RLS, demostrar rollback y bloquear nuevos consumos legacy.
<!-- SHELL-AUTH-CANONICAL:END -->

FASE 4 — HABILITADORES TRANSVERSALES

26. BLOQUE F — ANIMA
27. BLOQUE G — VISO como administrador del modelo
28. SUBBLOQUE G2 — VISO Core
29. BLOQUE H2 — SHELL como aplicación
30. Ejecutar AUTH-UI-040 a AUTH-UI-051
31. BLOQUE P — Dispositivos compartidos
32. BLOQUE Q — Simulación estricta
32A. BLOQUE Z — Tecnología y soporte como habilitador transversal

Secuencia interna recomendada:

```text
TI-DOM-001 a TI-DOM-013
→ TI-AUTH-001 a TI-AUTH-004
→ TI-UX-001 a TI-UX-006
→ TI-INT-001 a TI-INT-003
```

Reglas:

- el modelo operativo, los recursos y los ciclos se definen antes de la experiencia;
- la autorización precede accesos privilegiados, soporte remoto y configuración sensible;
- red, dispositivos, impresión y soporte mínimos deberán estar listos antes de los pilotos que dependan de ellos;
- el BLOQUE Z no sustituye AUTH-DEV, PRINT-ARC, BLOQUE T, BLOQUE X ni continuidad.

32B. BLOQUE AA — Gobierno de información como habilitador transversal

Secuencia interna recomendada:

```text
INFO-DOM-001
→ INFO-DOM-002 e INFO-DOM-003
→ INFO-DOM-004 a INFO-DOM-013
→ INFO-AUTH-001 a INFO-AUTH-004
→ INFO-UX-001 a INFO-UX-006
→ INFO-INT-001 a INFO-INT-003
```

Reglas:

- inventario, responsables y finalidades se definen primero;
- clasificación y taxonomía preceden bibliotecas, búsquedas y exportaciones;
- INFO-DOM-006 deberá aprobarse antes de eliminación o disposición automatizada;
- INFO-DOM-008 e INFO-DOM-009 deberán aprobarse antes de ampliar el tratamiento de datos personales;
- eliminar una cuenta no autoriza eliminar expedientes sujetos a conservación.

32C. BLOQUE AB — Analítica, indicadores y datos maestros como habilitador transversal

Secuencia interna recomendada:

```text
DATA-DOM-001 a DATA-DOM-003
→ DATA-DOM-004 a DATA-DOM-008
→ DATA-DOM-009 a DATA-DOM-013
→ DATA-DOM-014 a DATA-DOM-017
→ DATA-AUTH-001 a DATA-AUTH-004
→ DATA-UX-001 a DATA-UX-008
→ DATA-INT-001 a DATA-INT-004
```

Reglas:

- cada dominio conserva su fuente de verdad y el BLOQUE AB no crea una tabla maestra universal;
- DATA-DOM-001 a DATA-DOM-003 preceden fusiones, migraciones y crosswalks;
- DATA-DOM-004 precede la declaración de cualquier KPI oficial;
- DATA-DOM-006 y DATA-DOM-007 preceden la certificación de reportes;
- ninguna pantalla podrá definir una fórmula local competidora;
- señal, hipótesis, correlación y causa confirmada deberán permanecer separadas;
- una acción de mejora no se cerrará sin comprobar resultados;
- DATA-INT-004 precede el envío de datos a BI, hojas externas o inteligencia artificial;
- la inteligencia artificial actúa como asistente y no como autoridad empresarial.

32D. BLOQUE AC — Continuidad operativa y recuperación como habilitador transversal

Secuencia interna recomendada:

```text
CONT-DOM-001 a CONT-DOM-004
→ CONT-DOM-005 a CONT-DOM-010
→ CONT-DOM-011 a CONT-DOM-015
→ CONT-AUTH-001 a CONT-AUTH-004
→ CONT-UX-001 a CONT-UX-007
→ CONT-INT-001 a CONT-INT-004
```

Reglas:

- CONT-DOM-001 deberá aprobar primero la política, el alcance, los responsables y el ciclo de mantenimiento.
- CONT-DOM-002 y CONT-DOM-003 deberán completarse antes de priorizar procesos o soluciones de recuperación.
- CONT-DOM-004 deberá definir MTPD, RTO, RPO y MBCO antes de contratar, diseñar o certificar mecanismos de recuperación.
- No deberán inventarse objetivos de recuperación sin evidencia de impacto, capacidad, costo y aceptación del propietario empresarial.
- CONT-DOM-005 y CONT-DOM-006 deberán aprobarse antes de habilitar un centro de mando o activar comunicaciones de crisis.
- CONT-DOM-007 y CONT-DOM-008 deberán aprobarse por proceso antes de declarar que existe una contingencia operativa válida.
- Un procedimiento manual deberá conservar folio, responsable, datos mínimos, evidencia, custodio y estado de reincorporación.
- CONT-DOM-009 y CONT-DOM-010 deberán aprobarse antes de utilizar captura offline o papel como registro empresarial durante fallas.
- Ningún incidente podrá cerrarse mientras existan registros pendientes de reincorporar, conflictos sin resolver o conciliaciones incompletas.
- CONT-DOM-011 no podrá considerar protegido un recurso únicamente porque exista un job, una réplica o una copia no restaurada.
- Todo respaldo crítico deberá tener una restauración probada y comparada contra su RPO y RTO.
- CONT-DOM-012 deberá recuperar primero las dependencias necesarias y después validar el resultado empresarial completo.
- CONT-DOM-013 deberá definir alternativas y compromisos antes de aceptar una dependencia externa como crítica.
- CONT-DOM-014 deberá ejecutar ejercicios técnicos y operativos antes de declarar readiness.
- CONT-DOM-015 deberá convertir toda lección en una acción con responsable, fecha y evidencia.
- CONT-AUTH-* deberá aprobarse antes de habilitar break-glass, failover, accesos de emergencia o restauraciones sensibles.
- Los accesos de emergencia deberán ser temporales, justificados, auditados y revocados después del incidente.
- El BLOQUE AC no sustituye al BLOQUE Z, E4, E5, BLOQUE T, BLOQUE U, BLOQUE X ni los runbooks propietarios de cada dominio.
- E5 gobernará la continuidad temporal durante implementaciones; el BLOQUE AC gobernará la continuidad permanente de la empresa.
- Cada dominio conservará la responsabilidad de validar su recuperación, reincorporar sus hechos y conciliar sus resultados.
- Una aplicación no será declarada offline de forma global; la modalidad de contingencia se definirá por capacidad.

AUTH-UI-040 a AUTH-UI-051 implementa:

ocultamiento de enlaces;
bloqueo de URL;
bloqueo de acciones;
protección de servidor;
navegación autorizada;
contexto activo;
simulación;
estados sin acceso;
carga;
vacíos;
errores recuperables.

AUTH-UI-052 a AUTH-UI-060 se ejecutará después,
aplicación por aplicación.

Regla de migración progresiva por aplicación

Antes o durante la implementación de cada aplicación deberá ejecutarse
el paquete R2 correspondiente a sus dominios y fuentes de verdad.

Cada paquete deberá incluir:

- estructuras objetivo;
- compatibilidad temporal;
- dry-run de normalización cuando corresponda;
- detección y resolución de colisiones;
- backfill;
- reconciliación;
- RLS y grants;
- RPC o vistas expuestas;
- tipos generados;
- wrappers compartidos;
- adaptación de consumidores;
- pruebas;
- medición;
- rollback.

No será obligatorio mover todo un dominio antes de comenzar a mejorar
una aplicación si el paquete aprobado permite una transición segura.

Tampoco podrá declararse migrado un dominio mientras alguna aplicación
continúe escribiendo sin control sobre su estructura legacy.

HABILITADOR TEMPORAL — INTEGRACIÓN CON POS EXTERNO

La integración temporal del POS podrá comenzar antes de implementar PULSO
completo cuando se hayan aprobado y ejecutado:

- INT-EXT aplicable;
- INT-POS-001 a INT-POS-014;
- contratos de venta y línea en BLOQUE H;
- almacenamiento seguro de secretos;
- staging de payloads;
- mapeos de sedes y productos;
- restricciones de idempotencia;
- pruebas de reintentos;
- rollback;
- piloto sin efectos.

Orden:

1. Obtener documentación y credencial de pruebas.
2. Importar ventas sin efectos.
3. Validar payloads e idempotencia.
4. Completar mapeos de sedes y productos.
5. Conciliar ventas importadas.
6. Habilitar NEXO en piloto controlado.
7. Habilitar NUMERA en piloto controlado.
8. Habilitar PASS únicamente cuando corresponda.
9. Mantener conciliación periódica.
10. Sustituir posteriormente la fuente externa por PULSO.


Este habilitador:

- no aprueba PULSO;
- no autoriza facturación propia;
- no convierte a NUMERA en sistema fiscal;
- no entrega acceso del proveedor a Supabase;
- no permite descontar inventario sin mapeo;
- no elimina la necesidad de recetas para productos preparados.

FASE 5 — NEXO

No existe un primer paquete vertical preseleccionado para esta fase. El alias
histórico `NEXO-REMISSIONS-001` no reserva ejecución. Cada paquete se definirá
cuando corresponda mediante `DELIV-PKG-001..025::<package_id>` después de
completar el flujo canónico integral aplicable.

El orden de maduración e implementación de los `GAP-PKG-*` es único y
automático. La fuente canónica es la matriz de dependencias y capas de
`DELIV-PKG-015`; el control aplica, en este orden, aristas explícitas entre
packages, capa de implementación y `package_id` como desempate estable. No
existe selección humana de package.

El primer package no `CLOSED` conserva el turno aunque esté bloqueado y aunque
otro posterior alcance `IMPLEMENTATION_READY`. Una cola `IMPLEMENTATION_READY`,
un expediente existente, un orden alfabético o una decisión de `OWN-OPS`,
`OWN-TEC` u `OWN-SEG` no reordenan la línea. Los packages `NO_EJECUTABLE` sin
orden físico canónico permanecen diferidos fuera de la línea activa hasta que
su fuente propietaria materialice un orden válido.

`OWN-OPS`, `OWN-TEC` y `OWN-SEG` conservan sus responsabilidades empresariales,
técnicas y de seguridad dentro de los gates aplicables, pero no seleccionan el
package siguiente. El package actual se obtiene mediante
`docs:package:execution:status`; solo cuando ese package supera
`E5-GATE-008::<package_id>` y sus dependencias aplicables puede exponerse
`SHELL-CI-020::<package_id>` para autorización física separada.
`docs:package:select` no forma parte del flujo vigente.

33. Consumir la matriz E1 y auditar implementación real de NEXO
34. Aprobar alcance de catálogo, inventario, LOC, LPN, activos, reutilizables, repuestos, flota y logística
35. Ejecutar SUBBLOQUE K2 completo, incluidas NEXO-DOM-019 a NEXO-DOM-038, NEXO-AUTH-021 a NEXO-AUTH-032 y NEXO-UX-026 a NEXO-UX-048
36. Ejecutar AUTH-UI-052 a AUTH-UI-060 y validar prototipos por actor, dispositivo y subdominio
37. Aprobar paquetes E5 de NEXO con archivos, datos, autorización, eventos, impresión, pruebas y rollback
38. Ejecutar `SHELL-CI-020` para implementar funcionalidad, pantallas, acciones, datos, autorización, contratos y seguridad de NEXO; ejecutar BLOQUE R cuando aplique
39. Ejecutar `SHELL-CI-021` para completar readiness operativo, integraciones y servicios transversales requeridos
40. Ejecutar `SHELL-CI-022` y `SHELL-CI-023` para cutover, pilotos operativos, conciliación e hypercare
41. Ejecutar `SHELL-CI-024` y aprobar NEXO por procesos y subdominios con evidencia de cierre

FASE 6 — FOGO Y ORIGO

42. Auditar y diseñar FOGO, incluyendo `OPS-REC-001`, `OPS-PRD-001` y `OPS-TRZ-001`
43. Auditar y diseñar ORIGO
44. Ejecutar AUTH-UI-052 a AUTH-UI-060 y validar prototipos de FOGO y ORIGO
45. Aprobar paquetes E5 de FOGO y ORIGO
46. Ejecutar `SHELL-CI-020` para implementar funcionalidad, datos, autorización y seguridad de FOGO; ejecutar BLOQUE R cuando aplique
47. Ejecutar `SHELL-CI-020` para implementar funcionalidad, datos, autorización y seguridad de ORIGO; ejecutar BLOQUE R cuando aplique
48. Implementar INT-PROD — FOGO ↔ NEXO e INT-PROC — ORIGO → NEXO → NUMERA
49. Ejecutar `SHELL-CI-021` y `SHELL-CI-022` para completar readiness y pilotos por proceso
50. Ejecutar `SHELL-CI-023` para conciliación, correcciones e hypercare
51. Ejecutar `SHELL-CI-024` y aprobar FOGO y ORIGO con evidencia de cierre

FOGO y ORIGO podrán avanzar en paralelo después de estabilizar
los contratos de productos, presentaciones, existencias y movimientos
propiedad de NEXO.

FASE 7 — PULSO

52. Auditar venta, caja, pagos, mesas, comandas, preparación, entrega y salón, y ejecutar `OPS-POS-001` antes del diseño detallado del POS
53. Ejecutar SUBBLOQUE N2 — Procesos y experiencia de PULSO
54. Ejecutar AUTH-UI-052 a AUTH-UI-060 y validar prototipos por actor y dispositivo
55. Aprobar paquetes E5 de PULSO
56. Ejecutar `SHELL-CI-020` para implementar funcionalidad, datos, autorización, seguridad e INT-SALES de PULSO; ejecutar BLOQUE R cuando aplique
57. Ejecutar `SHELL-CI-021` y `SHELL-CI-022` para completar readiness y el piloto progresivo en sedes satélite
58. Ejecutar `SHELL-CI-023` para conciliación, correcciones e hypercare
59. Ejecutar `SHELL-CI-024` y aprobar PULSO con evidencia de cierre

FASE 8 — NUMERA

60. Consumir la matriz E1, ejecutar NUMERA-AUD-001 a NUMERA-AUD-012 y resolver `OPS-CST-001` antes de cerrar el alcance financiero objetivo
61. Aprobar alcance ejecutivo, analítico, financiero y contable de NUMERA
62. Ejecutar NUMERA-DOM-001 a NUMERA-DOM-015, SUBBLOQUE O2 y AUTH-UI-052 a AUTH-UI-060
63. Aprobar prototipos y paquetes E5 de NUMERA
64. Ejecutar `SHELL-CI-020` para implementar funcionalidad, datos, autorización, contratos y seguridad de NUMERA; ejecutar BLOQUE R cuando aplique
65. Integrar eventos, conciliaciones y fuentes aprobadas de ORIGO, FOGO, NEXO y ventas
66. Ejecutar `SHELL-CI-021` a `SHELL-CI-023` para readiness, piloto, conciliación e hypercare con contabilidad y dirección
67. Ejecutar `SHELL-CI-024` y aprobar NUMERA únicamente con cobertura, diferencias y evidencia documentadas

FASE 9 — VISO COMPLETO

68. Ejecutar SUBBLOQUE G3 — Experiencia administrativa de VISO
69. Ejecutar AUTH-UI-052 a AUTH-UI-060 y validar prototipos por rol
70. Aprobar paquetes E5 de VISO
71. Ejecutar `SHELL-CI-020` para implementar reorganización funcional, autorización y administración por dominios; ejecutar BLOQUE R cuando aplique
72. Integrar auditoría consolidada y vista previa por trabajador
73. Ejecutar `SHELL-CI-021` y `SHELL-CI-022` para completar readiness y el piloto con cada rol administrativo
74. Ejecutar `SHELL-CI-023` para correcciones e hypercare
75. Ejecutar `SHELL-CI-024` y aprobar VISO completo con evidencia de cierre

FASE 10 — PASS

76. Ejecutar BLOQUE V — PASS e integración con el dominio laboral
77. Diseñar y validar la experiencia del cliente
78. Aprobar paquetes E5 de PASS
79. Ejecutar `SHELL-CI-020` para implementar acumulación y redención desde la fuente comercial vigente sin duplicar identidad, saldo ni efectos; ejecutar BLOQUE R cuando aplique
80. Ejecutar `SHELL-CI-021` para probar identidad cliente, seguridad, datos, integraciones y readiness
81. Ejecutar `SHELL-CI-022` para el piloto progresivo de fidelización
82. Ejecutar `SHELL-CI-023` para conciliación, correcciones e hypercare
83. Ejecutar `SHELL-CI-024` y aprobar PASS con evidencia de cierre

FASE 11 — TALENTO

84. Completar `CAP-TAL-001` a `CAP-TAL-006` dentro de E2
85. Materializar BLOQUE Y y su roadmap propio únicamente después de la puerta definida en `CAP-TAL-006`
86. Auditar y reconciliar la base técnica existente antes de adoptarla
87. Aprobar prototipos, contratos TALENTO → VISO → ANIMA y paquetes E5
88. Ejecutar `SHELL-CI-020` a `SHELL-CI-024` para implementar, validar readiness, pilotear, estabilizar y cerrar sin conceder acceso laboral antes de la vinculación autorizada

FASE 12 — AURA

89. Ejecutar BLOQUE W — AURA como aplicación diferida
90. Completar auditoría funcional
91. Decidir continuidad, reemplazo o retiro
92. Crear roadmap propio y paquetes E5 únicamente si continúa
93. No ampliar permisos ni procesos antes de la decisión

FASE 13 — CIERRE TRANSVERSAL

94. Completar y validar BLOQUE X de extremo a extremo
95. Confirmar idempotencia, reintentos y compensaciones
96. Confirmar que no existan registros manuales duplicados
97. Completar BLOQUE T — CI, versionado, despliegue y evidencia de `SHELL-CI-020` a `SHELL-CI-024`
98. Ejecutar BLOQUE U — Pruebas integrales
99. Ejecutar pruebas de seguridad
100. Ejecutar pruebas funcionales
101. Ejecutar pruebas de experiencia
102. Ejecutar pruebas de integración
103. Validar rollback por aplicación
104. Ejecutar validación final de AUTH-DB-029 — respaldo, restauración y rollback
105. Ejecutar AUTH-DB-030 — retiro controlado de objetos legacy
106. Ejecutar AUTH-DB-031 — certificación de paridad documental, técnica y operativa
107. Confirmar ausencia de drift entre vento-shell, local, staging y producción
108. Certificar reglas de normalización, diccionarios, excepciones, backfills e idempotencia
109. Confirmar inventario, almacenamiento, rotación y revocación de credenciales externas
110. Confirmar que no existan secretos en código, frontend, logs ni tablas expuestas
111. Confirmar estado final del POS externo: vigente, reemplazado por PULSO o retirado
112. Confirmar conciliación entre ventas, inventario, NUMERA y PASS
113. Aprobar cierre documental y operativo

Regla de avance:

DEFINICIÓN
→ AUDITORÍA FUNCIONAL
→ ARQUITECTURA DE DATOS
→ DISEÑO
→ PROTOTIPO
→ AUTORIZACIÓN
→ SEGURIDAD DE SERVIDOR
→ IMPLEMENTACIÓN
→ INTEGRACIÓN
→ PILOTO
→ CORRECCIÓN
→ APROBACIÓN

No se considerará finalizada una aplicación únicamente porque:

compile;
despliegue;
tenga rutas;
tenga tablas;
tenga permisos;
tenga infraestructura parcial.

Una aplicación se considerará finalizada cuando:

sus procesos estén conectados;
sus fuentes de verdad y contratos de datos estén definidos;
cada actor vea la experiencia correcta;
las acciones estén protegidas;
las integraciones sean idempotentes;
la trazabilidad sea completa;
el piloto operativo haya sido aprobado.

<!-- CURRENT-EXECUTABLE-WORK-CORR-002:START -->
### Invariante de governed frontier y trabajo ejecutable

La precedencia física de `DELIV-PKG-015` distingue:

- `PRIMARY_PACKAGE`: primer package dependency-eligible con acción schedulable según dependencias explícitas, capa y `package_id`;
- `CURRENT_EXECUTABLE_WORK`: trabajo exacto del primary;
- `WAITING`: package todavía bloqueado por dependencia, prerrequisito, scope `UNKNOWN` o conflicto;
- `ACTIVE_PHYSICAL`: package que ya inició su lifecycle y conserva los resource locks aplicables.

Un `WAITING` no puede iniciar, desplegar ni cerrar por inferencia, pero tampoco impide que otro root independiente y dependency-eligible continúe. Un `ACTIVE_PHYSICAL` no monopoliza el primary global.

Para mutaciones Supabase, después de R0 se consumen en orden `MRP015-000`, `MRP015-010`, `MRP015-020`, `MRP015-030` y `MRP015-040`; `MRP015-050` se certifica dentro del ciclo del candidato antes del despliegue remoto. Los locks compartidos de transición se mantienen durante CI020/CI021 y los locks exactos persisten durante piloto/hypercare. Los merges y cierres siguen serializados.
<!-- CURRENT-EXECUTABLE-WORK-CORR-002:END -->

<!-- CORR-012-GOVERNED-FRONTIER:START -->
### CORR-012 — Governed eligible frontier para ejecución física

```text
DELIV-PKG-015 partial order
        ↓
explicit package dependencies
        ↓
implementation layer
        ↓
package_id stable tie-breaker
        ↓
DEPENDENCY-ELIGIBLE FRONTIER
        ↓
deterministic primary schedulable package
        │
        ├─ WAITING
        │      → dependency / prerequisite / UNKNOWN / conflict
        │      → package-local block only
        │
        ├─ AUTHORIZATION_FRONTIER
        │      → PENDING_AUTHORIZATION reserves full admission locks
        │      → human approval remains explicit
        │
        └─ ACTIVE_PHYSICAL
               → exact package lifecycle continues
               → CI020/CI021: persistent + exclusive transition locks
               → CI022/CI023/CI024: persistent exact locks only
               → long observation does not hold the global primary
```

Invariantes:

- `human_package_selection=false` permanece obligatorio.
- Las dependencias explícitas son hard prerequisites.
- Capa y `package_id` dan prioridad determinista entre roots dependency-eligible.
- Scope físico o implementation unit no resoluble produce `UNKNOWN` y falla cerrado solo para la admisión física del package afectado.
- Los target paths y implementation units generan locks persistentes exactos.
- Migraciones/schema, configuración Supabase, helpers compartidos de Edge Functions, manifests de dependencias y workflows generan locks exclusivos de transición.
- Los locks exclusivos de transición se mantienen durante CI020/CI021 y se liberan al entrar a CI022; los locks exactos permanecen durante piloto, hypercare y cierre.
- Un handoff `PENDING_AUTHORIZATION` reserva todo su scope probado y no se autoautoriza.
- Cada package preserva `SHELL-CI-020 → SHELL-CI-021 → SHELL-CI-022 → SHELL-CI-023 → SHELL-CI-024`.
- Checkouts físicos simultáneos deben ser independientes.
- Merge y cierre permanecen serializados y deben reconciliar el último `main`.
- El cierre de package sigue dependiendo de CI024 VERIFIED + evidencia; el cierre de aplicación y producto no cambia.
- El auditor de throughput es diagnóstico y nunca concede autorización por sí mismo.

<!-- CORR-012-GOVERNED-FRONTIER:END -->
