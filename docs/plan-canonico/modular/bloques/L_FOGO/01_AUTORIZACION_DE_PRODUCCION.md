### MINI-BLOQUE — AUTORIZACIÓN DE PRODUCCION

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **autorización de produccion** dentro de **L FOGO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `FOGO-AUTH-001` a `FOGO-AUTH-016` — 16 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar vistas y acciones productivas” y concluye con “Ejecutar pruebas integrales”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:FOGO-AUTH -->
### Reconciliación topológica de FOGO-AUTH-001 a FOGO-AUTH-016

La familia separa inventario/definición de permisos de la protección física posterior.

| Tareas | Modalidad | Gate |
| --- | --- | --- |
| `FOGO-AUTH-001`, `FOGO-AUTH-002`, `FOGO-AUTH-008` | `DEFINE_ONCE` | `NO_PHYSICAL_INSTANCE` |
| `FOGO-AUTH-003..007`, `FOGO-AUTH-009..016` | `PER_IMPLEMENTATION_UNIT` | `POST_E5_PACKAGE` |

### ✅ FOGO-AUTH-001 — Inventariar vistas y acciones productivas

**Estado:** APROBADA
**Tarea anterior:** OPS-TRZ-001 — Definir el contrato empresarial de lotes, etiquetas y trazabilidad productiva
**Tarea siguiente:** FOGO-AUTH-002 — Definir permisos por área productiva
**Tipo de tarea:** inventario documental integral de vistas, superficies técnicas, acciones de servidor, acciones funcionales canónicas y controles de autorización observados de FOGO
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, permisos, rutas, navegación, Supabase, RLS, RPC, migraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y trazable las vistas y acciones productivas de FOGO que deben ser consumidas por la familia `FOGO-AUTH-*`, separando:

```text
RUTA / VISTA AS-IS
≠
SUPERFICIE TECNICA
≠
SERVER ACTION
≠
PANTALLA CANONICA TO-BE
≠
ACCION FUNCIONAL CANONICA
≠
PERMISO
≠
AUTORIZACION EFECTIVA
```

La tarea fija el universo de entrada de autorización sin conceder permisos ni modificar la implementación.

---

#### 2. Fuentes verificadas

La línea base consume:

- `AUTH-UI-002` y `FOGO-ROUTE-INVENTORY-001`;
- repositorio runtime `vento-group-sas/vento-fogo`;
- head runtime observado `a40683b2413d621fb3f54f2eebb8743a42bad3d7`;
- snapshot histórico aprobado `b6b9ed00e5267cabaac1a5a1090d93d5f60e86f2`;
- comparación `b6b9ed00... → a40683b2...`, con siete commits de diferencia y cero cambios en archivos `src/app/**`;
- inventario de acciones de servidor de BLOQUE J;
- `SCREEN-CANONICAL-CATALOG-001`;
- contratos compartidos de acciones funcionales;
- catálogo canónico de recursos y permisos FOGO;
- contratos `OPS-REC-001`, `OPS-PRD-001` y `OPS-TRZ-001`;
- registro 04A vigente del dominio FOGO.

La vigencia actual del inventario de rutas se considera demostrada para esta tarea porque los cambios posteriores al snapshot aprobado no tocaron las fuentes de página, route handler o Server Actions inventariadas.

---

#### 3. Resultado cuantitativo

```text
RUTAS DE PAGINA AS-IS = 9
SUPERFICIES TECNICAS ROUTE HANDLER = 1
ACCIONES SERVER-SIDE AS-IS INVENTARIADAS = 4
PANTALLAS CANONICAS FOGO = 15
ACCIONES FUNCIONALES PRIMARIAS CANONICAS = 15
ACCIONES FUNCIONALES SECUNDARIAS REGISTRADAS = 60
ACCIONES FUNCIONALES CANONICAS TOTALES = 75
PERMISOS CANONICOS FOGO ACTUALMENTE DEFINIDOS EN CONTRATO DE RECURSO = 6
```

No se cuentan como vistas independientes los layouts, loading states, helpers, componentes, filtros o query parameters.

---

#### 4. Inventario AS-IS de vistas

| ID | Ruta | Archivo | Clase | Familia | Control observado | Decisión de inventario |
| --- | --- | --- | --- | --- | --- | --- |
| `FOGO-ROUTE-001` | `/` | `src/app/page.tsx` | `VISTA` | `INICIO` | `fogo.access / acceso de aplicacion` | Sin mutacion productiva propia |
| `FOGO-ROUTE-002` | `/login` | `src/app/login/page.tsx` | `REDIRECT_BRIDGE` | `ACCESO` | `flujo SHELL` | No es vista operativa |
| `FOGO-ROUTE-003` | `/no-access` | `src/app/no-access/page.tsx` | `VISTA_ESTADO` | `ACCESO` | `denegacion` | No concede ni repara autoridad |
| `FOGO-ROUTE-004` | `/recipe-book` | `src/app/recipe-book/page.tsx` | `VISTA` | `OPERACION` | `fogo.access observado` | Recetario operativo; permiso exacto por accion no se infiere |
| `FOGO-ROUTE-005` | `/recipes` | `src/app/recipes/page.tsx` | `VISTA` | `ADMINISTRACION` | `production.recipes.manage observado` | Literal legacy/local; no equivale a permiso canonico final |
| `FOGO-ROUTE-006` | `/recipes/new` | `src/app/recipes/new/page.tsx` | `VISTA` | `ADMINISTRACION` | `production.recipes.manage observado` | Contiene Server Action saveRecipe de creacion |
| `FOGO-ROUTE-007` | `/recipes/[id]/edit` | `src/app/recipes/[id]/edit/page.tsx` | `VISTA` | `ADMINISTRACION` | `production.recipes.manage observado` | Contiene Server Action saveRecipe de actualizacion |
| `FOGO-ROUTE-008` | `/production-batches` | `src/app/production-batches/page.tsx` | `VISTA` | `OPERACION` | `production.batches.view observado` | Consulta y seguimiento de lotes |
| `FOGO-ROUTE-009` | `/production-batches/new` | `src/app/production-batches/new/page.tsx` | `VISTA` | `OPERACION` | `fogo.access en superficie; production.recipe_book.view en accion` | Contiene Server Action createBatch |

Reconciliación:

```text
EXPECTED_ASIS_PAGE_ROUTES = 9
MATERIALIZED_ASIS_PAGE_ROUTES = 9
MISSING = 0
DUPLICATES = 0
```

---

#### 5. Superficies y acciones técnicas AS-IS

| ID inventario | Fuente | Acción | Tipo | Efecto | Control observado | Decisión |
| --- | --- | --- | --- | --- | --- | --- |
| `FOGO-ACTION-ASIS-001` | `src/app/recipes/new/page.tsx` | `saveRecipe` | `SERVER_ACTION` | `CREAR_RECETA` | `production.recipes.manage` | Crea receta, relaciones y configuracion; identidad distinta por source_path |
| `FOGO-ACTION-ASIS-002` | `src/app/recipes/[id]/edit/page.tsx` | `saveRecipe` | `SERVER_ACTION` | `ACTUALIZAR_RECETA` | `production.recipes.manage` | Actualiza receta y relaciones; no comparte identidad con FOGO-ACTION-ASIS-001 |
| `FOGO-ACTION-ASIS-003` | `src/app/production-batches/new/page.tsx` | `createBatch` | `SERVER_ACTION` | `CREAR_LOTE` | `production.recipe_book.view + firma de actor compartido cuando aplica` | Invoca fogo_create_real_production_batch; la mutacion no puede inferir autoridad solo desde la vista |
| `FOGO-ACTION-ASIS-004` | `src/app/recipes/pdf/route.tsx` | `GET` | `ROUTE_HANDLER` | `EXPORTAR_RECETARIO_PDF` | `production.recipes.manage` | Superficie tecnica; no cuenta como pantalla |

Reglas de identidad:

1. mismo nombre de función en archivos distintos no implica misma acción;
2. el `source_path` forma parte de la identidad de inventario;
3. un route handler no se convierte en pantalla;
4. abrir una vista no concede permiso para ejecutar su Server Action;
5. una lectura nominal no se interpreta como permiso de mutación;
6. toda acción con efecto empresarial deberá revalidar actor, contexto, recurso, estado y permiso exacto en su tarea propietaria.

---

#### 6. Inventario canónico TO-BE de vistas y acciones funcionales

| Pantalla | Vista canónica | Proceso propietario | Acción primaria | Paso / semántica primaria | Acciones secundarias registradas | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| `VSCREEN-0055` | Inicio y cola de producción | `VPROC-0033` | `VSCREEN-0055::PRIMARY` | `VPROC-0033::STEP-TRIAGE_PRODUCTION_QUEUE` — Priorizar cola de producción | `VSCREEN-0055::SECONDARY:01`; `VSCREEN-0055::SECONDARY:02`; `VSCREEN-0055::SECONDARY:03`; `VSCREEN-0055::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0056` | Planeación de producción | `VPROC-0033` | `VSCREEN-0056::PRIMARY` | `VPROC-0033::STEP-PLAN_PRODUCTION` — Planear producción | `VSCREEN-0056::SECONDARY:01`; `VSCREEN-0056::SECONDARY:02`; `VSCREEN-0056::SECONDARY:03`; `VSCREEN-0056::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0057` | Preparación e inicio de lote | `VPROC-0034` | `VSCREEN-0057::PRIMARY` | `VPROC-0034::STEP-PREPARE_AND_START_BATCH` — Preparar e iniciar lote | `VSCREEN-0057::SECONDARY:01`; `VSCREEN-0057::SECONDARY:02`; `VSCREEN-0057::SECONDARY:03`; `VSCREEN-0057::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0058` | Ejecución de lote | `VPROC-0034` | `VSCREEN-0058::PRIMARY` | `VPROC-0034::STEP-EXECUTE_BATCH` — Ejecutar lote | `VSCREEN-0058::SECONDARY:01`; `VSCREEN-0058::SECONDARY:02`; `VSCREEN-0058::SECONDARY:03`; `VSCREEN-0058::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0059` | Registro parcial de producción | `VPROC-0034` | `VSCREEN-0059::PRIMARY` | `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS` — Registrar avance parcial | `VSCREEN-0059::SECONDARY:01`; `VSCREEN-0059::SECONDARY:02`; `VSCREEN-0059::SECONDARY:03`; `VSCREEN-0059::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0060` | Finalización y cierre de lote | `VPROC-0037` | `VSCREEN-0060::PRIMARY` | `VPROC-0037::STEP-CLOSE_BATCH` — Finalizar y cerrar lote | `VSCREEN-0060::SECONDARY:01`; `VSCREEN-0060::SECONDARY:02`; `VSCREEN-0060::SECONDARY:03`; `VSCREEN-0060::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0061` | Receta operativa | `VPROC-0016` | `VSCREEN-0061::PRIMARY` | `VPROC-0016::STEP-CONSULT_APPLICABLE_RECIPE` — Consultar receta aplicable | `VSCREEN-0061::SECONDARY:01`; `VSCREEN-0061::SECONDARY:02`; `VSCREEN-0061::SECONDARY:03`; `VSCREEN-0061::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0062` | Catálogo y editor de recetas | `VPROC-0016` | `VSCREEN-0062::PRIMARY` | `VPROC-0016::STEP-AUTHOR_RECIPE` — Crear o editar receta | `VSCREEN-0062::SECONDARY:01`; `VSCREEN-0062::SECONDARY:02`; `VSCREEN-0062::SECONDARY:03`; `VSCREEN-0062::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0063` | Revisión, aprobación y publicación de receta | `VPROC-0016` | `VSCREEN-0063::PRIMARY` | `VPROC-0016::STEP-APPROVE_AND_PUBLISH_RECIPE` — Aprobar y publicar receta | `VSCREEN-0063::SECONDARY:01`; `VSCREEN-0063::SECONDARY:02`; `VSCREEN-0063::SECONDARY:03`; `VSCREEN-0063::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0064` | Prueba de receta y rendimiento | `VPROC-0016` | `VSCREEN-0064::PRIMARY` | `VPROC-0016::STEP-TEST_RECIPE_AND_YIELD` — Probar receta y rendimiento | `VSCREEN-0064::SECONDARY:01`; `VSCREEN-0064::SECONDARY:02`; `VSCREEN-0064::SECONDARY:03`; `VSCREEN-0064::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0065` | Control de calidad y liberación | `VPROC-0035` | `VSCREEN-0065::PRIMARY` | `VPROC-0035::STEP-DECIDE_QUALITY_RELEASE` — Decidir liberación de calidad | `VSCREEN-0065::SECONDARY:01`; `VSCREEN-0065::SECONDARY:02`; `VSCREEN-0065::SECONDARY:03`; `VSCREEN-0065::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0066` | Empaque, etiquetado y almacenamiento de terminado | `VPROC-0036` | `VSCREEN-0066::PRIMARY` | `VPROC-0036::STEP-PACK_AND_TRANSFER_FINISHED_GOOD` — Empacar y transferir producto terminado | `VSCREEN-0066::SECONDARY:01`; `VSCREEN-0066::SECONDARY:02`; `VSCREEN-0066::SECONDARY:03`; `VSCREEN-0066::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0067` | Reproceso, aprovechamiento, merma y cierre productivo | `VPROC-0037` | `VSCREEN-0067::PRIMARY` | `VPROC-0037::STEP-RESOLVE_PRODUCTION_DISPOSITION` — Resolver reproceso, aprovechamiento o merma | `VSCREEN-0067::SECONDARY:01`; `VSCREEN-0067::SECONDARY:02`; `VSCREEN-0067::SECONDARY:03`; `VSCREEN-0067::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0173` | Trazabilidad e investigación de lote | `VPROC-0035` | `VSCREEN-0173::PRIMARY` | `VPROC-0035::STEP-INVESTIGATE_BATCH_TRACEABILITY` — Investigar trazabilidad de lote | `VSCREEN-0173::SECONDARY:01`; `VSCREEN-0173::SECONDARY:02`; `VSCREEN-0173::SECONDARY:03`; `VSCREEN-0173::SECONDARY:04` | `INVENTARIADA` |
| `VSCREEN-0174` | Controles operativos de inocuidad | `VPROC-0014` | `VSCREEN-0174::PRIMARY` | `VPROC-0014::STEP-EXECUTE_FOOD_SAFETY_CONTROL` — Ejecutar control operativo de inocuidad | `VSCREEN-0174::SECONDARY:01`; `VSCREEN-0174::SECONDARY:02`; `VSCREEN-0174::SECONDARY:03`; `VSCREEN-0174::SECONDARY:04` | `INVENTARIADA` |

Reconciliación:

```text
EXPECTED_FOGO_VSCREEN = 15
MATERIALIZED_FOGO_VSCREEN = 15
MISSING = 0
DUPLICATES = 0

PRIMARY_ACTIONS = 15
SECONDARY_ACTIONS = 60
TOTAL_FUNCTIONAL_ACTION_IDENTITIES = 75
```

La identidad de las cuatro acciones secundarias por pantalla está congelada por el contrato compartido. Esta tarea no inventa su semántica empresarial ni un permiso individual cuando la fuente propietaria todavía no lo declara.

---

#### 7. Permisos canónicos existentes

| Permiso canónico | Recurso | Localizador | Uso contractual |
| --- | --- | --- | --- |
| `fogo.access` | `APP_SURFACE` | `app_code canónico` | Acceso a superficie FOGO; no concede acciones internas |
| `fogo.production.batches.view` | `PRODUCTION_BATCH` | `batch_id o filtro normalizado` | Lectura de lote vigente/histórico bajo SITE_AREA |
| `fogo.production.batches.create` | `PRODUCTION_BATCH` | `borrador con sede, área/línea, producto, receta publicada y orden origen` | Creación idempotente con validaciones y auditoría |
| `fogo.production.orders.view` | `PRODUCTION_ORDER` | `order_id o filtro por participación` | Lectura por relación de orden productiva |
| `fogo.production.recipe_book.view` | `RECIPE_PUBLICATION` | `published_recipe_version_id o consulta por producto/proceso` | Solo versiones publicadas y vigentes |
| `fogo.production.recipes.view` | `RECIPE_DEFINITION` | `recipe_definition_id o filtro organizacional` | Lectura administrativa con campos sensibles protegidos |

Estos seis permisos son el vocabulario canónico existente observado para FOGO. No se deduce que sean suficientes para todas las acciones inventariadas.

En particular:

```text
PERMISO DE VISTA
!=
PERMISO DE MUTACION

PERMISO LOCAL production.*
!=
EQUIVALENCIA AUTOMATICA CON fogo.production.*

AUTOR DE RECURSO
!=
PROPIETARIO AUTORIZANTE

ROL
!=
PERMISO

AREA
!=
PERMISO
```

`FOGO-AUTH-002` consume este inventario para definir permisos por área productiva sin borrar la separación por recurso y acción.

---

#### 8. Separación AS-IS / TO-BE

No se fuerza una correspondencia uno a uno entre las nueve rutas actuales y las quince pantallas canónicas.

```text
9 RUTAS ACTUALES
≠
15 PANTALLAS CANONICAS
```

El rediseño objetivo contiene capacidades que hoy pueden:

- estar agregadas en una misma ruta;
- depender de acciones internas;
- no tener todavía una ruta propia;
- estar representadas parcialmente;
- requerir materialización posterior en E5.

La autorización se diseña contra el contrato canónico y conserva la evidencia AS-IS para transición; no renombra una ruta actual como pantalla futura sin evidencia.

---

#### 9. Clasificación de vistas actuales

| Clase | Rutas | Decisión |
| --- | --- | --- |
| acceso / estado | `FOGO-ROUTE-002`, `FOGO-ROUTE-003` | fuera de operación productiva; siguen protegidas por contratos transversales |
| inicio | `FOGO-ROUTE-001` | superficie de entrada; no concede acciones internas |
| operación | `FOGO-ROUTE-004`, `FOGO-ROUTE-008`, `FOGO-ROUTE-009` | requieren separar lectura, inicio de lote y mutaciones reales |
| administración de recetas | `FOGO-ROUTE-005`, `FOGO-ROUTE-006`, `FOGO-ROUTE-007` | requieren separar consulta, creación, edición, aprobación/publicación y exportación |
| superficie técnica | `FOGO-HANDLER-001` | exportación PDF server-side; no pantalla |

---

#### 10. Acciones productivas sensibles detectadas

Se consideran sensibles, como mínimo:

- crear lote real;
- modificar receta;
- crear receta;
- cambiar estado de receta;
- publicar o retirar una receta cuando el flujo lo permita;
- exportar fórmula o recetario;
- iniciar producción;
- registrar producción parcial;
- finalizar ejecución;
- corregir o anular hechos productivos;
- decidir calidad;
- liberar, retener, rechazar o reprocesar;
- gestionar lote y trazabilidad;
- registrar actor y turno;
- empacar, etiquetar o transferir terminado;
- ejecutar controles de inocuidad.

Que una acción exista en el catálogo canónico no demuestra que ya esté implementada físicamente en una ruta actual.

---

#### 11. Hallazgos y destinos

| Hallazgo | Hecho | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- | --- |
| `FOGO-AUTH-001-F01` | El snapshot de rutas de AUTH-UI-002 estaba anclado a `b6b9ed00...`; el head actual de `vento-group-sas/vento-fogo` es `a40683b2...`. | `NO_BLOQUEA` | `FOGO-AUTH-001` | Comparación de commits demuestra 7 commits de diferencia y cero cambios en `src/app/**`; se adopta el head actual como evidencia de vigencia del inventario. |
| `FOGO-AUTH-001-F02` | Los permisos observados en runtime usan literales locales `production.*`, mientras el catálogo canónico usa namespace `fogo.production.*`. | `BLOQUEA_MIGRACION_NO_DOCUMENTACION` | `FOGO-AUTH-002 / FOGO-AUTH-013 / FOGO-AUTH-015` | Definir matriz por área/recurso, proteger recetas/lotes y migrar posteriormente sin inferir equivalencia automática. |
| `FOGO-AUTH-001-F03` | `createBatch` es una mutación real pero hoy revalida `production.recipe_book.view`, un permiso de lectura nominal. | `BLOQUEA_CONFORMIDAD_DE_MUTACION_NO_INVENTARIO` | `FOGO-AUTH-009 / FOGO-AUTH-013 / FOGO-AUTH-016` | Clasificar y proteger la acción exacta; probar que creación de lote exige autoridad de mutación y actor efectivo. |
| `FOGO-AUTH-001-F04` | Las dos acciones `saveRecipe` comparten nombre pero viven en archivos fuente distintos. | `NO_BLOQUEA` | `FOGO-AUTH-001` | Conservarlas como identidades distintas por `source_path`; no colapsarlas por nombre. |
| `FOGO-AUTH-001-F05` | Existen 60 identidades secundarias canónicas para las 15 pantallas FOGO, pero este contrato compartido no especializa aquí su semántica empresarial individual. | `NO_BLOQUEA` | `FOGO-AUTH-002..016 y FOGO-UX-001..015` | Conservar IDs; no inventar permisos ni significados secundarios fuera de sus contratos propietarios. |

No queda un hallazgo narrativo sin dueño y condición de salida.

---

#### 12. Handoff a FOGO-AUTH-002

`FOGO-AUTH-002` recibe exactamente:

```text
9 rutas AS-IS
1 route handler tecnico
4 acciones server-side AS-IS
15 pantallas VSCREEN canónicas
75 identidades de acción funcional
6 permisos canónicos existentes
5 hallazgos con owner
```

Su trabajo es definir permisos por área productiva y no volver a descubrir el universo de superficies.

---

#### 13. Handoff al resto de FOGO-AUTH

| Tarea | Entrada proveniente de este inventario |
| --- | --- |
| `FOGO-AUTH-003` | vistas operativas cuya cola debe filtrarse por sede y área |
| `FOGO-AUTH-004..007` | superficies/acciones que deben restringirse por área productiva |
| `FOGO-AUTH-008` | acciones de supervisión que requieren permiso separado |
| `FOGO-AUTH-009` | acción canónica de inicio de producción y `createBatch` AS-IS |
| `FOGO-AUTH-010` | registro parcial |
| `FOGO-AUTH-011` | finalización |
| `FOGO-AUTH-012` | correcciones y anulaciones |
| `FOGO-AUTH-013` | lotes, recetas, versionado y acciones sensibles |
| `FOGO-AUTH-014` | actor y turno |
| `FOGO-AUTH-015` | transición a paquetes/contratos compartidos |
| `FOGO-AUTH-016` | pruebas integrales sobre el universo inventariado |

---

#### 14. Requisitos de prueba derivados

**NO GENERA NI MODIFICA REQUISITOS DE PRUEBA.**

Justificación: el inventario y sus invariantes ya están cubiertos por requisitos vigentes de FOGO y autorización. La tarea reconcilia y especializa el universo actual/canónico para la familia `FOGO-AUTH-*` sin introducir un comportamiento observable nuevo.

---

#### 15. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-FOGO-005` a `TREQ-FOGO-024` para identidad y exhaustividad del inventario de rutas;
- `TREQ-FOGO-001` a `TREQ-FOGO-004` para receta, lote, planificación, calidad, trazabilidad y acciones productivas;
- requisitos transversales de autorización que exigen actor efectivo, contexto, recurso, estado y acción exacta.

Esta trazabilidad no modifica 04A.

---

#### 16. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell` vigente, owner, topología, continuidad, catálogo de recursos, catálogo de 15 pantallas, 75 identidades funcionales, inventario AS-IS histórico y `vento-group-sas/vento-fogo@a40683b2...`; la comparación desde `b6b9ed00...` no contiene cambios en `src/app/**`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron permisos, recetas, lotes, producción, exportaciones ni pruebas físicas. |
| FÍSICA | NOT_APPLICABLE | `FOGO-AUTH-001` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`. |

---

#### 17. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] aparecen exactamente nueve rutas AS-IS;
- [ ] aparece exactamente un route handler técnico;
- [ ] aparecen exactamente cuatro acciones server-side AS-IS;
- [ ] las dos funciones `saveRecipe` permanecen como identidades distintas por archivo;
- [ ] `createBatch` conserva su efecto real y su control observado sin reinterpretarlo como permiso final;
- [ ] aparecen exactamente quince pantallas canónicas FOGO;
- [ ] cada pantalla tiene su acción primaria y las cuatro identidades secundarias;
- [ ] el total canónico es 75 acciones funcionales;
- [ ] se preservan seis permisos canónicos existentes sin inventar permisos faltantes;
- [ ] no se fuerza equivalencia uno a uno entre rutas actuales y pantallas canónicas;
- [ ] no se presenta `production.*` como equivalente automático a `fogo.production.*`;
- [ ] cada hallazgo tiene owner y condición de salida;
- [ ] `FOGO-AUTH-002` recibe el universo completo sin redescubrimiento;
- [ ] no se crean ni modifican TREQ;
- [ ] no se ejecutan cambios físicos.

---

#### 18. Límites

Esta tarea no:

- crea permisos;
- asigna permisos por área;
- cambia guards;
- modifica Server Actions;
- modifica RPC;
- cambia RLS;
- migra namespaces;
- crea pantallas;
- implementa las quince pantallas canónicas;
- interpreta las 60 acciones secundarias más allá de su identidad registrada;
- corrige `createBatch`;
- modifica `saveRecipe`;
- cambia el handler PDF;
- cambia rutas;
- crea datos;
- ejecuta pruebas productivas;
- autoriza E5.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`OPS-TRZ-001 — Definir el contrato empresarial de lotes, etiquetas y trazabilidad productiva`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-001 — Inventariar vistas y acciones productivas`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-002 — Definir permisos por área productiva`

### ✅ FOGO-AUTH-002 — Definir permisos por área productiva

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-001 — Inventariar vistas y acciones productivas
**Tarea siguiente:** FOGO-AUTH-003 — Filtrar cola por sede y área
**Tipo de tarea:** definición documental integral del contrato de permisos productivos por área, rol operativo, recurso y contexto efectivo de FOGO
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, guards, permisos persistidos, roles, navegación, Supabase, RLS, RPC, migraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y reutilizable cómo se aplican los permisos canónicos actuales de FOGO a las áreas productivas vigentes, sin convertir el área, el rol, la sede, el dispositivo o una vista en autorización por sí mismos.

La tarea especializa para FOGO una regla ya aprobada por el modelo transversal:

```text
ROL OPERATIVO
!=
PERMISO

ÁREA ACTIVA
!=
PERMISO

PERMISO
!=
ALCANCE SUFICIENTE
```

La autorización productiva resulta de la intersección entre identidad, turno, rol operativo efectivo, sede, área, permiso exacto, territorio del recurso, estado y restricciones aplicables.

---

#### 2. Fuentes verificadas

La definición consume y conserva:

- `FOGO-AUTH-001` como inventario inmediato aprobado;
- `AUTH-RBAC-014 — Crear matriz de produccion_cocina`;
- `AUTH-RBAC-015 — Crear matriz de produccion_panaderia`;
- `AUTH-RBAC-016 — Crear matriz de produccion_reposteria`;
- catálogo canónico y normalización de permisos FOGO;
- contrato canónico de alcance de permisos;
- contrato canónico de recurso;
- modelo transversal de sede, área, turno, rol operativo y precedencia;
- contratos de dispositivos compartidos para `production_kitchen`, `production_bakery`, `production_pastry` y `warehouse_kiosk`;
- contratos `OPS-REC-001`, `OPS-PRD-001` y `OPS-TRZ-001`;
- registro 04A vigente de AUTH y FOGO;
- runtime `vento-group-sas/vento-fogo` en `a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

La base inmediata entregada por `FOGO-AUTH-001` permanece:

```text
RUTAS AS-IS = 9
ROUTE HANDLERS = 1
ACCIONES SERVER-SIDE AS-IS = 4
PANTALLAS CANONICAS FOGO = 15
ACCIONES FUNCIONALES CANONICAS = 75
PERMISOS CANONICOS FOGO EXISTENTES = 6
HALLAZGOS CON OWNER = 5
```

Esta tarea no redescubre ese universo.

---

#### 3. Decisión principal

FOGO reutiliza las mismas claves de permiso operativas entre áreas productivas y restringe su ejercicio mediante contexto y territorio. No se crean claves distintas por Cocina, Panadería o Repostería.

```text
MISMO PERMISO CANONICO
+
ROL OPERATIVO EFECTIVO
+
SEDE ACTIVA COMPATIBLE
+
ÁREA ACTIVA EXACTA
+
RECURSO COMPATIBLE
=
CAPACIDAD ACOTADA AL CONTEXTO
```

No se crean variantes de clave por nombre de área. La separación se expresa en el alcance efectivo, no en una proliferación de permisos.

---

#### 4. Áreas y roles productivos canónicos

Las matrices operativas vigentes reconocen exactamente tres perfiles productivos FOGO:

| Rol operativo efectivo | Sede requerida | Área activa exacta | Plantilla operativa |
| --- | --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente | `production_kitchen` |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería | `production_bakery` |
| `produccion_reposteria` | Centro de Producción | Repostería | `production_pastry` |

Reconciliación: tres perfiles esperados, tres materializados, cero faltantes y cero duplicados.

El rol operativo procede del turno publicado y vigente. El nombre del trabajador, un rol legacy, una plantilla de dispositivo o una selección cliente-side no sustituyen esa resolución.

---

#### 5. Matriz canónica de permisos FOGO por área productiva

Se evalúan los seis permisos FOGO actualmente canónicos contra los tres perfiles productivos.

| Permiso canónico | Cocina Caliente | Galletería y Panadería | Repostería | Regla resultante |
| --- | --- | --- | --- | --- |
| `fogo.access` | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | Permite entrar a FOGO bajo contexto operativo válido; no concede capacidades internas. |
| `fogo.production.batches.view` | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | Solo lotes dentro del territorio operativo efectivo del área y sus relaciones autorizadas. |
| `fogo.production.batches.create` | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | Solo un destino productivo concreto compatible con sede, área, orden, receta publicada y capacidad. |
| `fogo.production.orders.view` | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | Solo órdenes destinadas, asignadas o relacionadas legítimamente con el área productiva efectiva. |
| `fogo.production.recipe_book.view` | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | **ASIGNAR OPERATIVO** | Solo publicación vigente y aplicable al producto, proceso, sede y área del contexto. |
| `fogo.production.recipes.view` | **NO ASIGNAR** | **NO ASIGNAR** | **NO ASIGNAR** | Es lectura administrativa de definiciones de receta; no se deriva del rol productivo. |

Reconciliación cuantitativa:

| Control | Resultado |
| --- | ---: |
| Perfiles de área productiva | 3 |
| Permisos canónicos FOGO evaluados por perfil | 6 |
| Decisiones esperadas | 18 |
| Decisiones materializadas | 18 |
| Decisiones **ASIGNAR OPERATIVO** | 15 |
| Decisiones **NO ASIGNAR** | 3 |
| Faltantes | 0 |
| Duplicados | 0 |
| Claves de permiso nuevas | 0 |

---

#### 6. Perfiles de alcance heredados por área

La matriz no crea nuevos scopes. Conserva los perfiles ya aprobados:

| Área | Acceso FOGO | Órdenes | Lotes | Crear lote | Recetario operativo |
| --- | --- | --- | --- | --- | --- |
| Cocina Caliente | `CTX-PROD-KITCHEN-FOGO-APP` | `CTX-PROD-KITCHEN-ORDER` | `CTX-PROD-KITCHEN-BATCH` | `CTX-PROD-KITCHEN-BATCH-CREATE` | `CTX-PROD-KITCHEN-RECIPE-BOOK` |
| Galletería y Panadería | `CTX-PROD-BAKERY-FOGO-APP` | `CTX-PROD-BAKERY-ORDER` | `CTX-PROD-BAKERY-BATCH` | `CTX-PROD-BAKERY-BATCH-CREATE` | `CTX-PROD-BAKERY-RECIPE-BOOK` |
| Repostería | `CTX-PROD-PASTRY-FOGO-APP` | `CTX-PROD-PASTRY-ORDER` | `CTX-PROD-PASTRY-BATCH` | `CTX-PROD-PASTRY-BATCH-CREATE` | `CTX-PROD-PASTRY-RECIPE-BOOK` |

Estos perfiles son límites, no permisos nuevos.

---

#### 7. Contrato de autorización efectiva

Para una capacidad productiva ordinaria, la decisión efectiva deberá satisfacer simultáneamente:

```text
ACTOR EFECTIVO VALIDO
+
TURNO PUBLICADO Y VIGENTE
+
ROL OPERATIVO EFECTIVO COMPATIBLE
+
SEDE ACTIVA = CENTRO DE PRODUCCION
+
AREA ACTIVA EXACTA DEL PERFIL
+
CHECK-IN CUANDO EL PERMISO LO EXIJA
+
PERMISO CANONICO EXACTO
+
RECURSO / DESTINO / RELACION / APLICABILIDAD COMPATIBLE
+
ESTADO EMPRESARIAL VALIDO
+
SIN DENEGACION PREVALENTE
=
AUTORIZACION
```

La ausencia de cualquiera de los elementos exigidos produce denegación cerrada.

No son equivalentes:

```text
ROL = PERMISO
AREA = PERMISO
DISPOSITIVO = PERMISO
VISTA VISIBLE = PERMISO
AUTORIA DEL RECURSO = PERMISO
CHECK-IN = PERMISO
```

---

#### 8. Regla territorial por permiso

La especialización por área conserva el contrato de recurso de cada permiso:

| Permiso | Recurso | Resolución aplicable al carril productivo |
| --- | --- | --- |
| `fogo.access` | `APP_SURFACE` | No tiene territorio de recurso; su concesión operativa solo habilita entrada a la aplicación bajo contexto válido. |
| `fogo.production.batches.view` | `PRODUCTION_BATCH` | `SITE_AREA`; en carril operativo se limita al `CTX` efectivo del actor y al territorio persistido del lote. |
| `fogo.production.batches.create` | `PRODUCTION_BATCH` | `SITE_AREA_DRAFT`; exige un único destino concreto y no admite creación transversal, global o sin sede/área aplicables. |
| `fogo.production.orders.view` | `PRODUCTION_ORDER` | `RELATION_SIDES`; la visibilidad requiere relación autorizada con sede solicitante, sede productiva o áreas relacionadas y se acota por el contexto operativo. |
| `fogo.production.recipe_book.view` | `RECIPE_PUBLICATION` | `APPLICABILITY`; solo publicación vigente aplicable al producto, proceso, sede y área que el actor puede ejecutar. |
| `fogo.production.recipes.view` | `RECIPE_DEFINITION` | `ORG`; lectura administrativa del catálogo autorizado, fuera de la concesión operativa de las tres áreas productivas. |

Un scope genérico más amplio admitido por el catálogo para carriles administrativos no amplía el carril productivo.

---

#### 9. Aislamiento entre áreas

Las tres áreas productivas comparten vocabulario de permisos, pero no comparten territorio operativo.

Reglas obligatorias:

1. `produccion_cocina` no adquiere autoridad sobre Galletería y Panadería ni Repostería.
2. `produccion_panaderia` no adquiere autoridad sobre Cocina Caliente ni Repostería.
3. `produccion_reposteria` no adquiere autoridad sobre Cocina Caliente ni Galletería y Panadería.
4. Compartir Centro de Producción no convierte la sede en un scope que una todas las áreas.
5. Un turno debe resolver el área concreta requerida por la operación.
6. Un recurso de otra área no se vuelve accesible porque tenga el mismo tipo, producto, receta o creador.
7. Una operación multiárea que solo esté parcialmente autorizada se deniega; no se ejecuta parcialmente por inferencia.
8. Una rotación o cambio de turno obliga a recalcular el contexto y deja de autorizar con el área anterior.
9. El dispositivo puede imponer un techo adicional, pero nunca ampliar el área del actor.
10. Una denegación explícita o una incompatibilidad estructural prevalece sobre una concesión operativa.

---

#### 10. Frontera de Insumos y Bodega

`Insumos` no se convierte en un cuarto rol productivo FOGO.

El modelo vigente separa:

```text
PRODUCCION
produccion_cocina
produccion_panaderia
produccion_reposteria

BODEGA / INSUMOS
bodeguero
warehouse_kiosk
```

La plantilla `warehouse_kiosk` pertenece a SHELL, NEXO y ORIGO y la matriz de `bodeguero` no asigna `fogo.access`. Por tanto:

- bodega no obtiene autoridad productiva por custodiar insumos;
- producción no obtiene autoridad de inventario general por consumir insumos;
- los roles productivos pueden consumir las capacidades NEXO expresamente concedidas en sus matrices para consultar y registrar insumos vinculados a su área, orden y lote;
- el recetario operativo de FOGO solo expone insumos necesarios para ejecutar la receta publicada aplicable;
- `FOGO-AUTH-007 — Restringir Insumos` materializará posteriormente la restricción propia de esa superficie o flujo sin crear `produccion_insumos` ni convertir bodega en área productiva FOGO.

---

#### 11. Reconciliación con AS-IS y permisos legacy

La definición TO-BE no declara equivalencias automáticas con los literales actuales del runtime.

| Evidencia AS-IS | Decisión contractual |
| --- | --- |
| `production.recipes.manage` en rutas y acciones de recetas | Es legacy/local; no se transforma por inferencia en `fogo.production.recipes.view` ni en una familia completa de mutaciones. |
| `production.batches.view` observado en consulta de lotes | Se reconcilia conceptualmente con `fogo.production.batches.view`, sin autorizar una migración física en esta tarea. |
| `production.recipe_book.view` observado en `createBatch` | No satisface el contrato de mutación; crear lote exige la capacidad canónica de creación y revalidación server-side en su tarea propietaria. |
| `production.recipes.manage` en `/recipes/pdf` | Permanece evidencia legacy de protección; esta tarea no concede exportación al rol productivo ni define un alias wildcard. |

La normalización vigente mantiene `fogo.production.recipes.manage` como `DECOMPOSE_REQUIRED`. No se crea un alias que conceda automáticamente lectura, creación, actualización, archivo, aprobación, publicación o exportación.

---

#### 12. Aplicación al universo funcional inventariado

Las 75 identidades funcionales de `FOGO-AUTH-001` se conservan, pero `FOGO-AUTH-002` no inventa una clave de permiso para cada identidad cuando su semántica atómica todavía no está declarada por su contrato propietario.

La regla transversal queda fijada así:

```text
ACCION FUNCIONAL INVENTARIADA
+
AREA PRODUCTIVA
!=
PERMISO AUTOMATICO
```

Para toda acción futura:

1. el área define un límite territorial y contextual;
2. la acción debe tener permiso exacto o contrato propietario explícito;
3. una acción de lectura no habilita mutación;
4. una acción primaria no hereda autoridad a sus secundarias;
5. una pantalla visible no habilita todas sus acciones;
6. las 60 identidades secundarias permanecen estables sin semántica o permiso inventados en esta tarea.

---

#### 13. Cobertura de superficies operativas actuales

Sobre las rutas AS-IS inventariadas, esta tarea fija únicamente la relación contractual que ya puede demostrarse:

| Superficie / acción | Contrato de área resultante |
| --- | --- |
| `/recipe-book` | El rol productivo solo consulta recetario publicado y aplicable a su contexto mediante `fogo.production.recipe_book.view`; no obtiene maestro administrativo. |
| `/production-batches` | La consulta de lotes usa `fogo.production.batches.view` dentro del área efectiva. |
| `/production-batches/new` como vista | La visibilidad de la superficie no autoriza la mutación. |
| `createBatch` | La intención canónica requiere `fogo.production.batches.create` y contexto exacto; la corrección física queda en sus tareas posteriores. |
| `/recipes`, `/recipes/new`, `/recipes/[id]/edit` | No forman parte de la concesión operativa ordinaria de los tres roles productivos; la administración de recetas conserva carril y permisos separados. |
| `/recipes/pdf` | No se concede por pertenecer al área; exportación y protección server-side conservan contrato propietario separado. |

---

#### 14. Excepciones y precedencia

Las excepciones no pueden convertir el contrato de área en un wildcard.

1. Una concesión individual sigue sujeta a identidad, sede, área, recurso, estado y restricciones aplicables.
2. Una denegación individual válida prevalece sobre una concesión equivalente cuando el modelo transversal así lo resuelve.
3. Una cobertura administrativa puede permitir lecturas o administración según su permiso exacto, pero no se reutiliza como turno productivo.
4. `fogo.production.recipes.view` puede existir en el carril base administrativo sin convertir al actor en productor ni conceder recetario operativo por implicación.
5. Los permisos de supervisor no se derivan de estas tres matrices; pertenecen a `FOGO-AUTH-008`.
6. Un rol productivo no adquiere autoridad de supervisor por antigüedad, oficio, título laboral o uso habitual de la estación.
7. Un perfil de dispositivo solo limita la sesión; no asigna rol ni permiso.
8. Un actor sin área activa cuando la operación la exige queda denegado.

---

#### 15. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| Los tres roles productivos usan las mismas cinco capacidades FOGO operativas, pero con perfiles de contexto distintos. | No bloquea esta definición. | `FOGO-AUTH-002` | Matriz 3 × 6 cerrada y sin claves por área inventadas. |
| `fogo.production.recipes.view` es base/administrativo y no pertenece a la concesión operativa ordinaria de Cocina, Panadería o Repostería. | No bloquea esta definición. | `FOGO-AUTH-002` | Queda **NO ASIGNAR** en las tres áreas. |
| `production.*` del runtime no equivale automáticamente a `fogo.production.*`. | Bloquea la migración física, no esta definición documental. | `FOGO-AUTH-013 / FOGO-AUTH-015` | Normalización y migración física usan claves exactas sin alias ampliatorio. |
| `createBatch` usa hoy un permiso nominal de lectura. | Bloquea la conformidad de la mutación, no esta definición documental. | `FOGO-AUTH-009 / FOGO-AUTH-013 / FOGO-AUTH-016` | La mutación revalida `fogo.production.batches.create`, actor, contexto, recurso, estado e idempotencia en el punto de efecto. |
| Las 60 acciones secundarias canónicas no tienen semántica empresarial individual congelada en el inventario de entrada. | No bloquea esta definición. | `FOGO-AUTH-003..016 / FOGO-UX-001..015` | Cada contrato propietario especializa únicamente las acciones que le correspondan sin renombrar los IDs. |
| `Insumos` no corresponde a un cuarto rol productivo FOGO en las matrices vigentes. | No bloquea esta definición. | `FOGO-AUTH-007` | La restricción posterior conserva bodega/NEXO separada de producción y aplica el área del actor a los insumos consumibles. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 16. Handoff a FOGO-AUTH-003..008

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-003` | La cola deberá respetar la sede activa y el área efectiva; una consulta no podrá ampliar territorio por filtros de cliente. |
| `FOGO-AUTH-004` | `produccion_panaderia` queda limitado a Centro de Producción + Galletería y Panadería con los cinco permisos operativos definidos. |
| `FOGO-AUTH-005` | `produccion_reposteria` queda limitado a Centro de Producción + Repostería con los cinco permisos operativos definidos. |
| `FOGO-AUTH-006` | `produccion_cocina` queda limitado a Centro de Producción + Cocina Caliente con los cinco permisos operativos definidos. |
| `FOGO-AUTH-007` | Los insumos se restringen por área, orden, lote, receta e integración NEXO sin crear un rol productivo adicional ni autoridad de bodega. |
| `FOGO-AUTH-008` | La supervisión requiere contrato separado; no se infiere autoridad multiárea desde los roles productivos ordinarios. |

---

#### 17. Handoff a FOGO-AUTH-009..016

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-009` | Inicio de producción y creación de lote requieren capacidad de mutación exacta y área efectiva compatible. |
| `FOGO-AUTH-010` | Registro parcial debe conservar el mismo actor, turno, área, lote y permiso específico de la acción. |
| `FOGO-AUTH-011` | Finalización no se hereda de crear o consultar lote; exige autoridad específica. |
| `FOGO-AUTH-012` | Correcciones y anulaciones no se derivan del rol productivo ordinario ni de permisos de lectura. |
| `FOGO-AUTH-013` | Lotes y recetas deberán normalizar permisos legacy, separar lectura de mutación y mantener el alcance de área. |
| `FOGO-AUTH-014` | Actor y turno deberán persistir como evidencia del contexto efectivo de la acción. |
| `FOGO-AUTH-015` | La migración a paquetes compartidos deberá conservar exactamente esta matriz y no introducir aliases ampliatorios. |
| `FOGO-AUTH-016` | Las pruebas integrales deberán demostrar aislamiento entre áreas, denegación cruzada, mutaciones con permiso exacto y ausencia de escalamiento por dispositivo o vista. |

---

#### 18. Requisitos de prueba derivados

**NO GENERA NI MODIFICA REQUISITOS DE PRUEBA.**

Justificación: la tarea especializa para FOGO contratos de rol operativo, territorio, contexto, segregación de funciones, permiso exacto y denegación server-side que ya tienen cobertura canónica vigente. No introduce un comportamiento observable nuevo ni una nueva clave de permiso.

---

#### 19. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-AUTH-001` para impedir autorización final por nombre de rol;
- `TREQ-AUTH-004` para exigir decisiones equivalentes por actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` para separar capacidades administrativas y operativas y exigir turno, check-in, rol efectivo, sede y área cuando corresponda;
- `TREQ-AUTH-009` para resolución determinista de sede y área y denegación de cruces territoriales;
- `TREQ-AUTH-010` para segregación de funciones entre producción, bodega, caja, conducción, compras y recepción;
- `TREQ-AUTH-013` para impedir bypass de autorización y exigir permiso, actor, territorio, contexto y estado en mutaciones;
- `TREQ-FOGO-001` a `TREQ-FOGO-004` para contratos productivos de receta, lote, planificación, ejecución, calidad y trazabilidad;
- `TREQ-FOGO-022` para impedir atribuir permisos no demostrados;
- `TREQ-FOGO-023` para impedir que abrir la vista de creación autorice por sí solo crear un lote.

Esta trazabilidad no modifica 04A.

---

#### 20. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, TREQ y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@2c5b15e42b2ff6cd5365ccafd4d66b3a720faf84`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, catálogo de seis permisos FOGO, contratos de recurso y alcance, matrices operativas de Cocina/Panadería/Repostería, frontera de bodega y registro 04A vigente. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, permisos, recetas, órdenes, lotes, producción, filtros, dispositivos ni pruebas de autorización. |
| FÍSICA | NOT_APPLICABLE | `FOGO-AUTH-002` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`. |

---

#### 21. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] aparecen exactamente tres perfiles productivos FOGO;
- [ ] cada perfil conserva su rol, sede y área exacta;
- [ ] se evalúan exactamente seis permisos FOGO por cada perfil;
- [ ] existen exactamente dieciocho decisiones de matriz;
- [ ] existen quince asignaciones operativas y tres decisiones **NO ASIGNAR**;
- [ ] `fogo.production.recipes.view` permanece fuera de la concesión operativa de los tres perfiles;
- [ ] no se crean permisos específicos por nombre de área;
- [ ] `fogo.access` no se interpreta como wildcard;
- [ ] `fogo.production.batches.create` exige destino productivo concreto y no hereda autoridad de una vista;
- [ ] `fogo.production.recipe_book.view` queda limitado a publicación vigente y aplicable al contexto;
- [ ] una relación de orden no amplía territorio más allá de la participación autorizada;
- [ ] un rol de Cocina no accede a Panadería/Repostería y viceversa;
- [ ] `Insumos` no se convierte en un cuarto rol productivo FOGO;
- [ ] bodega no recibe FOGO por custodiar insumos y producción no recibe inventario general por consumirlos;
- [ ] los literales `production.*` no se tratan como equivalentes automáticos de `fogo.production.*`;
- [ ] no se inventan permisos para las 60 acciones secundarias;
- [ ] cada hallazgo diferido tiene owner y condición de salida;
- [ ] no se crean ni modifican TREQ;
- [ ] no se ejecutan cambios físicos.

---

#### 22. Límites

Esta tarea no:

- crea nuevos permisos;
- persiste grants;
- crea un rol `produccion_insumos`;
- modifica matrices RBAC ya aprobadas;
- asigna permisos de supervisor;
- implementa filtrado de cola;
- cambia navegación;
- cambia guards;
- cambia middleware;
- modifica Server Actions;
- corrige `createBatch`;
- modifica `saveRecipe`;
- cambia el handler PDF;
- descompone físicamente `fogo.production.recipes.manage`;
- migra `production.*` a `fogo.production.*`;
- modifica NEXO, ORIGO o sus permisos;
- modifica Supabase, RLS, RPC, migraciones o datos;
- crea pantallas;
- especializa individualmente las 60 acciones secundarias;
- autoriza E5;
- ejecuta pruebas productivas.

---

#### 23. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-001 — Inventariar vistas y acciones productivas`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-002 — Definir permisos por área productiva`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-003 — Filtrar cola por sede y área`

### ✅ FOGO-AUTH-003 — Filtrar cola por sede y área

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-002 — Definir permisos por área productiva
**Tarea siguiente:** FOGO-AUTH-004 — Restringir Panadería
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización FOGO del filtrado server-side de la cola productiva por sede activa, área productiva efectiva, permiso exacto, estado ejecutable y territorio real del recurso
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-003::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo la cola operativa de FOGO limita sus elementos a la sede activa, el área productiva efectiva y el territorio real de cada recurso antes de exponer datos al cliente, sin convertir parámetros de URL, filtros visuales, sede seleccionada, área seleccionada, dispositivo, nombre de rol o visibilidad de pantalla en autoridad.

La regla central queda fijada así:

```text
CONTEXTO OPERATIVO EFECTIVO
+
PERMISO EXACTO
+
TERRITORIO REAL DEL RECURSO
+
ESTADO ELEGIBLE
+
REGLAS DE APLICABILIDAD
=
ELEMENTO AUTORIZABLE EN COLA
```

El filtrado de cola es una consecuencia de la autorización; no la sustituye.

---

#### 2. Fuentes y entradas canónicas

La definición consume y conserva:

- `FOGO-AUTH-001` como inventario de superficies y acciones;
- `FOGO-AUTH-002` como contrato inmediato de permisos por área productiva;
- `VSCREEN-0055 — Inicio y cola de producción`;
- `VPROC-0033 — Planear producción desde demanda, inventario, capacidad, prioridad y fecha requerida`;
- `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada`;
- contratos de sede, área, turno, rol operativo, scope, recurso, denegación, frescura y autorización server-side;
- `TREQ-FOGO-003` como cobertura vigente de planificación por sede y área;
- `TREQ-AUTH-009`, `TREQ-AUTH-013` y cobertura territorial transversal vigente;
- runtime `vento-group-sas/vento-fogo` verificado en `a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

`FOGO-AUTH-002` entrega exactamente esta frontera para la cola:

```text
SEDE ACTIVA COMPATIBLE
+
AREA ACTIVA EXACTA
+
PERMISO OPERATIVO
+
RECURSO COMPATIBLE
```

La cola no puede ampliar esa frontera.

---

#### 3. Identidad canónica de la cola

La cola operativa corresponde a `VSCREEN-0055 — Inicio y cola de producción`.

Su propósito canónico es presentar producción pendiente, priorizada y disponible para el área y contexto efectivos. Su acción primaria está vinculada a:

```text
VPROC-0033::STEP-TRIAGE_PRODUCTION_QUEUE
```

La superficie presenta trabajo derivado de planificación y ejecución productiva, pero no redefine la autoridad de esos procesos.

La cola puede representar, según el contrato propietario y el estado vigente:

- planes productivos liberados por `VPROC-0033`;
- órdenes productivas listas para preparación de `VPROC-0034`;
- lotes o identidades de ejecución ya materializados cuando su estado todavía los haga operables por el actor.

No se crea en esta tarea un modelo de datos nuevo ni se obliga a que esas identidades vivan en una sola tabla.

---

#### 4. Estados mínimos que pueden originar trabajo en cola

Los estados canónicos ya definidos conservan su semántica:

| Proceso | Estado canónico | Tratamiento en cola |
| --- | --- | --- |
| `VPROC-0033` | `PRODUCTION_PLAN_RELEASED` | Puede originar trabajo visible si sede, área, permiso, aplicabilidad y relaciones son compatibles. |
| `VPROC-0034` | `PRODUCTION_ORDER_READY` | Puede presentarse como trabajo listo para preparación cuando el actor está autorizado en el área correspondiente. |
| `VPROC-0034` | estados posteriores no terminales | Solo permanecen visibles cuando la acción concreta de seguimiento o ejecución pertenece al actor, al área y al estado actual. |
| `VPROC-0034` | `PRODUCTION_EXECUTION_COMPLETED` | No permanece como trabajo pendiente de la cola operativa; su consulta histórica pertenece a la superficie o contrato que corresponda. |

La inclusión en cola nunca se deriva únicamente del nombre del estado. También exige territorio, permiso y relación aplicables.

---

#### 5. Contextos productivos ordinarios

La cola operativa ordinaria reconoce los tres perfiles productivos definidos por `FOGO-AUTH-002`:

| Rol operativo efectivo | Sede efectiva requerida | Área efectiva exacta |
| --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería |
| `produccion_reposteria` | Centro de Producción | Repostería |

Para estos perfiles, la cola es estrictamente de un área efectiva a la vez.

Compartir sede no permite mezclar trabajo de otras áreas.

---

#### 6. Resolución territorial de la cola

Para un actor productivo ordinario, el territorio visible se resuelve así:

```text
ACTOR EFECTIVO
→ TURNO PUBLICADO Y VIGENTE
→ ROL OPERATIVO EFECTIVO
→ SEDE OPERATIVA DEL TURNO
→ AREA OPERATIVA DEL TURNO
→ PERMISO EXACTO
→ TERRITORIO REAL DEL RECURSO
→ ESTADO Y APLICABILIDAD
→ FILA AUTORIZABLE
```

Reglas obligatorias:

1. la sede operativa procede del turno vigente;
2. el área operativa procede del mismo turno cuando el rol la exige;
3. el área debe pertenecer a la sede efectiva;
4. `null` en un área requerida produce denegación cerrada;
5. la sede seleccionada para navegación no sustituye la sede del turno;
6. el área seleccionada para navegación no sustituye el área del turno;
7. un cambio de turno, sede, área o rol invalida la cola previamente resuelta;
8. una fila cuyo territorio no pueda resolverse no se expone por fallback.

---

#### 7. Territorio real del elemento de cola

El contexto del actor no reemplaza el territorio del recurso.

Cada elemento candidato deberá resolver de forma verificable la sede y el área productiva que realmente gobiernan su ejecución.

La resolución puede provenir del propio recurso o de una relación canónica trazable con su plan, orden, receta, destino productivo o lote. Lo que no puede ocurrir es inferir territorio desde:

- el texto de un producto;
- el nombre de una receta;
- el creador del registro;
- la pestaña seleccionada;
- el parámetro enviado por el navegador;
- el último contexto almacenado en cliente;
- una coincidencia parcial de sede sin área cuando el área es obligatoria.

Si el territorio material no puede demostrarse, el elemento queda fuera de la cola operativa.

---

#### 8. Regla de filtrado server-side

La consulta protegida debe aplicar la frontera territorial antes de serializar filas hacia el cliente.

```text
RESOLVER ACTOR Y CONTEXTO
→ RESOLVER PERMISO
→ CONSTRUIR TERRITORIO AUTORIZABLE
→ OBTENER CANDIDATOS COMPATIBLES
→ RESOLVER TERRITORIO REAL DE CADA CANDIDATO
→ APLICAR ESTADO Y APLICABILIDAD
→ EXCLUIR NO AUTORIZADOS
→ MINIMIZAR CAMPOS
→ ORDENAR Y SERIALIZAR
```

No es válido:

```text
CONSULTAR COLA GLOBAL
→ ENVIARLA AL CLIENTE
→ OCULTAR FILAS EN REACT
```

La UI puede aplicar filtros adicionales de presentación únicamente sobre un conjunto que ya fue autorizado en servidor.

---

#### 9. Parámetros de cliente y filtros visibles

Valores como:

```text
site_id
area_id
area_kind
status
priority
product_id
recipe_id
```

son criterios de búsqueda o presentación, no autoridad.

Un parámetro solicitado por el cliente puede:

- reducir un conjunto ya autorizado;
- seleccionar una vista compatible con el contexto;
- ordenar o segmentar resultados autorizados.

No puede:

- ampliar la sede efectiva;
- ampliar el área efectiva;
- saltar el turno;
- sustituir un permiso;
- fabricar una relación con el recurso;
- convertir `null` en wildcard;
- devolver filas de otra área porque el actor conozca su identificador.

Una solicitud territorial incompatible falla cerrada o devuelve un conjunto vacío según el contrato de interfaz propietario, pero nunca hace fallback a una cola más amplia.

---

#### 10. Permisos que gobiernan la cola

La cola no introduce claves nuevas.

Las capacidades existentes se conservan con su función exacta:

| Permiso | Uso dentro de esta tarea |
| --- | --- |
| `fogo.access` | Permite entrada a FOGO bajo contexto válido; no concede filas de cola por sí solo. |
| `fogo.production.orders.view` | Autoriza consulta de órdenes relacionadas legítimamente con el territorio operativo efectivo. |
| `fogo.production.batches.view` | Autoriza consulta de lotes dentro del territorio operativo efectivo y del recurso. |
| `fogo.production.batches.create` | No es requisito para listar toda la cola; gobierna la futura mutación de creación cuando corresponda. |
| `fogo.production.recipe_book.view` | Permite consultar publicación aplicable cuando la cola necesite presentar la receta operativa autorizada. |
| `fogo.production.recipes.view` | Permanece administrativo y no amplía la cola productiva ordinaria. |

Una pantalla visible con `fogo.access` no autoriza automáticamente todas las filas ni todas las acciones asociadas.

---

#### 11. Priorización sin ampliación territorial

`VSCREEN-0055` puede priorizar elementos autorizados, pero la prioridad se aplica después de resolver el conjunto territorial permitido.

```text
AUTORIZAR CONJUNTO
→ FILTRAR TERRITORIO
→ FILTRAR ELEGIBILIDAD
→ PRIORIZAR
```

Nunca:

```text
PRIORIZAR GLOBAL
→ MOSTRAR PRIMEROS N
→ ASUMIR QUE SON DEL AREA
```

Una prioridad alta no convierte un trabajo de otra área en visible ni ejecutable.

---

#### 12. Supervisión y visibilidad multiárea

Esta tarea no concede visibilidad multiárea a supervisores.

`FOGO-AUTH-008 — Definir permisos de supervisor` conserva la responsabilidad de establecer qué capacidad adicional, si alguna, permite supervisión entre áreas.

Hasta que ese contrato aplique:

- los roles productivos ordinarios permanecen restringidos a un área efectiva;
- no se infiere multiárea desde el título laboral `supervisor`;
- no se infiere multiárea desde pertenecer al Centro de Producción;
- no se infiere multiárea desde una selección de interfaz.

---

#### 13. Dispositivo compartido

El dispositivo puede imponer un techo adicional de aplicación, sede o área, pero no puede ampliar el territorio humano.

Para una futura materialización en dispositivo compartido, el conjunto visible deberá satisfacer simultáneamente el contexto efectivo del trabajador y las restricciones válidas del dispositivo cuando apliquen.

Esta tarea no redefine identidad del dispositivo, handoff de trabajador, expiración, PIN, revocación ni propósito del terminal.

---

#### 14. Frescura y concurrencia

Una cola resuelta deja de ser autoridad suficiente cuando cambia cualquiera de estos hechos materiales:

- actor efectivo;
- turno;
- rol operativo;
- sede del turno;
- área del turno;
- check-in cuando aplique;
- permiso o grant;
- sede o área del recurso;
- versión del plan;
- estado de la orden o lote;
- cancelación, cierre o cambio de elegibilidad.

La futura implementación deberá revalidar antes de una mutación aunque el elemento se hubiera mostrado previamente en la cola.

---

#### 15. Minimización y no revelación

Un recurso fuera del territorio autorizado no debe llegar al cliente para ser ocultado posteriormente.

La proyección de cola deberá limitarse a los datos necesarios para identificar y priorizar trabajo autorizado.

No se usarán filas denegadas para:

- conteos visibles;
- indicadores de prioridad;
- totales por producto;
- badges;
- autocompletados;
- filtros con valores descubiertos desde otra área;
- mensajes que revelen que existe un trabajo protegido.

---

#### 16. AS-IS verificado y brecha de adopción

El runtime actual de `vento-fogo` no demuestra todavía el contrato de cola canónica.

Se verificó que `/production-batches`:

- protege la página con `production.batches.view`;
- consulta `production_batches`;
- recibe opcionalmente `site_id` desde `searchParams`;
- aplica `.eq("site_id", siteId)` únicamente cuando ese parámetro existe;
- no incorpora `area_id` en la proyección observada de la consulta;
- presenta lotes históricos/registrados, no constituye por sí sola `VSCREEN-0055` completa.

También se verificó que el shell de aplicación puede resolver contexto operativo de sede y área, pero esa existencia no demuestra que la consulta de lotes o la futura cola lo esté usando como frontera server-side.

Por tanto:

```text
FILTRO OPCIONAL POR URL
!=
COLA CANONICA FILTRADA POR CONTEXTO EFECTIVO
```

La diferencia se materializará únicamente en las instancias físicas futuras de esta tarea.

---

#### 17. Convergencia técnica futura

La materialización deberá llevar a una frontera coherente entre:

```text
CONTEXTO CANONICO
→ AUTORIZACION
→ QUERY / RPC / VISTA AUTORIZADA
→ PROYECCION DE COLA
→ ACCION POSTERIOR REVALIDADA
```

Si la unidad física necesita cambios en consulta, helper, RPC, vista, RLS o contrato compartido, todos deberán usar la misma semántica territorial.

No se autoriza mantener dos motores que puedan devolver conjuntos territoriales distintos para el mismo actor y snapshot.

---

#### 18. Ownership de Supabase

Toda futura modificación VENTO relacionada con:

- RPC de cola;
- vistas SQL;
- RLS;
- funciones territoriales;
- índices;
- tablas o columnas;
- triggers;
- grants;
- tipos generados;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Este marcador documental no ejecuta cambios Supabase.

---

#### 19. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `/production-batches` acepta un filtro `site_id` suministrado por cliente y no demuestra una frontera derivada del contexto efectivo. | Bloquea conformidad física de la cola, no esta definición documental. | `FOGO-AUTH-003::<implementation_unit_id>` | La unidad propietaria deriva el territorio desde contexto autorizado y trata filtros del cliente solo como refinamiento. |
| La consulta observada de `production_batches` no proyecta `area_id`. | Bloquea demostrar aislamiento por área desde esa consulta aislada. | `FOGO-AUTH-003::<implementation_unit_id>` | La unidad resuelve de forma trazable el área real del recurso sin inferencias cliente-side. |
| `VSCREEN-0055` es un contrato canónico más amplio que la página histórica de lotes observada. | No bloquea esta definición. | `FOGO-UX-003 / FOGO-UX-004 / FOGO-AUTH-003` | El diseño UX y la materialización física consumen la misma identidad de cola y contexto efectivo. |
| La visibilidad multiárea de supervisión no pertenece a esta tarea. | No bloquea. | `FOGO-AUTH-008` | El contrato de supervisor define permisos y alcance explícitos sin reutilizar el rol ordinario. |
| Una fila mostrada puede dejar de ser ejecutable antes de la acción. | Riesgo de autorización stale. | `FOGO-AUTH-009..012 / FOGO-AUTH-014` | Cada mutación revalida actor, turno, área, permiso, recurso y estado inmediatamente antes del efecto. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 20. Materialización física posterior

La topología vigente de `FOGO-AUTH-003` es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define el contrato global una sola vez.

Cada materialización futura usa:

```text
FOGO-AUTH-003::<implementation_unit_id>
```

La unidad exacta y su paquete propietario se resuelven desde las fuentes canónicas de implementación; esta tarea no inventa `implementation_unit_id`, no reasigna packages y no autoriza código.

La materialización solo puede comenzar después de que el paquete aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

---

#### 21. Handoff a FOGO-AUTH-004..008

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-004` | Panadería consume una cola ya limitada a Centro de Producción + Galletería y Panadería; no recibe trabajo de Cocina o Repostería por filtro cliente-side. |
| `FOGO-AUTH-005` | Repostería consume la misma regla con su área efectiva exacta. |
| `FOGO-AUTH-006` | Cocina consume la misma regla con Cocina Caliente como área efectiva exacta. |
| `FOGO-AUTH-007` | Insumos visibles desde trabajo productivo deben conservar el área, orden, lote y receta autorizados sin ampliar inventario general. |
| `FOGO-AUTH-008` | La supervisión deberá definir explícitamente cualquier lectura multiárea; esta tarea no la concede. |

---

#### 22. Handoff a FOGO-AUTH-009..016 y FOGO-UX

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-009` | Iniciar producción desde una fila visible exige revalidar permiso de mutación, actor, turno, sede, área, recurso y estado. |
| `FOGO-AUTH-010` | Producción parcial no conserva autoridad únicamente porque el lote estaba visible al abrir la cola. |
| `FOGO-AUTH-011` | Finalización se autoriza por acción y estado, no por pertenencia previa a la cola. |
| `FOGO-AUTH-012` | Corrección o anulación no se deriva de visibilidad ni prioridad. |
| `FOGO-AUTH-014` | Actor y turno efectivos deben quedar trazables en las acciones originadas desde la cola. |
| `FOGO-AUTH-015` | La migración a paquetes compartidos conserva la misma resolución territorial sin filtros permisivos locales. |
| `FOGO-AUTH-016` | Las pruebas integrales demuestran aislamiento por sede/área, filtros cliente-side no ampliatorios y revalidación antes de mutar. |
| `FOGO-UX-003` | El inicio por área productiva presenta el contexto efectivo sin convertir selección visual en autorización. |
| `FOGO-UX-004` | La producción pendiente del turno se obtiene del conjunto ya autorizado y no de una cola global ocultada en cliente. |

---

#### 23. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el filtrado territorial de FOGO ya está cubierto por requisitos vigentes de contexto, aislamiento territorial, autorización server-side, planificación por sede/área y mutación revalidada. Esta tarea especializa el contrato y asigna ownership de materialización sin introducir una obligación verificable nueva fuera de esa cobertura.

---

#### 24. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-AUTH-001` para impedir autorización final por nombre de rol;
- `TREQ-AUTH-004` para decisiones equivalentes por actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` para exigir turno, rol, sede y área cuando correspondan;
- `TREQ-AUTH-009` para resolución determinista de sede y área y denegación de cruces territoriales;
- `TREQ-AUTH-013` para impedir bypass de autorización y revalidar territorio y recurso en servidor;
- `TREQ-AUTH-014` y `TREQ-AUTH-015` para frescura, convergencia y evidencia de decisión cuando apliquen;
- `TREQ-FOGO-001` para ciclo productivo trazable;
- `TREQ-FOGO-003` para planificación con sede, área, prioridad, capacidad, versión y órdenes derivadas;
- `TREQ-FOGO-004` para ejecución productiva y estados independientes;
- `TREQ-FOGO-023` para impedir que una vista autorice por sí sola una mutación.

Esta trazabilidad no modifica 04A.

---

#### 25. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, TREQ y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@d2d84604df053d0ff49d46395f36f9609c757b8b`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, `VSCREEN-0055`, `VPROC-0033`, `VPROC-0034`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, contratos territoriales vigentes y el AS-IS de `/production-batches`; la entrada inmediata `FOGO-AUTH-002` se consume desde su artefacto completo aprobado en la conversación. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó cola, planificación, turno, filtros, producción ni pruebas de autorización reales. |
| FÍSICA | NOT_APPLICABLE | El marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-003::<implementation_unit_id>`. |

---

#### 26. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0055` queda identificada como la cola operativa canónica;
- [ ] la cola se deriva de contexto efectivo y no de parámetros del cliente;
- [ ] Cocina, Panadería y Repostería conservan áreas exactas separadas;
- [ ] compartir Centro de Producción no une las tres colas;
- [ ] sede y área del actor permanecen separadas del territorio del recurso;
- [ ] `null` no funciona como wildcard de área;
- [ ] una fila sin territorio demostrable queda fuera de la cola operativa;
- [ ] `site_id` y `area_id` cliente-side solo pueden reducir un conjunto ya autorizado;
- [ ] la consulta filtra antes de serializar;
- [ ] la UI no recibe filas protegidas para ocultarlas posteriormente;
- [ ] la prioridad se aplica después del filtrado territorial;
- [ ] `fogo.access` no concede filas ni acciones internas por sí solo;
- [ ] la visibilidad multiárea de supervisor permanece reservada a `FOGO-AUTH-008`;
- [ ] toda mutación posterior revalida autoridad aunque la fila hubiera sido visible;
- [ ] cambios de turno, sede, área, permiso o estado invalidan decisiones previas;
- [ ] el AS-IS de `/production-batches` queda identificado como adopción pendiente y no como cumplimiento;
- [ ] cualquier cambio futuro de Supabase pertenece a `vento-shell`;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican TREQ;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 27. Límites

Esta tarea no:

- implementa la cola;
- modifica código de `vento-fogo`;
- modifica `production_batches`;
- crea tablas, vistas o columnas;
- modifica RLS;
- crea RPC;
- crea migraciones;
- modifica grants;
- cambia turnos o check-ins;
- modifica matrices RBAC;
- crea permisos nuevos;
- concede visibilidad multiárea a supervisores;
- redefine dispositivos compartidos;
- diseña la pantalla visual final;
- define el contrato completo de planificación;
- inicia lotes;
- registra producción parcial;
- finaliza lotes;
- corrige ni anula producción;
- migra permisos legacy;
- ejecuta E5;
- crea o autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

---

#### 28. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-002 — Definir permisos por área productiva`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-003 — Filtrar cola por sede y área`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-004 — Restringir Panadería`
### ✅ FOGO-AUTH-004 — Restringir Panadería

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-003 — Filtrar cola por sede y área
**Tarea siguiente:** FOGO-AUTH-005 — Restringir Repostería
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización FOGO de la autorización de `produccion_panaderia` al territorio exacto Centro de Producción + Galletería y Panadería, con aislamiento server-side de órdenes, lotes, creación de lote y recetario operativo
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-004::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo FOGO restringe la operación ordinaria de Panadería al actor efectivo `produccion_panaderia`, a Centro de Producción y al área exacta Galletería y Panadería, evitando que compartir sede, aplicación, catálogo, receta, producto, dispositivo o permiso base produzca acceso accidental a Cocina Caliente, Repostería, administración de recetas o inventario general.

La regla central queda:

```text
ROL OPERATIVO EFECTIVO = produccion_panaderia
+
SEDE EFECTIVA = Centro de Producción
+
AREA EFECTIVA EXACTA = Galletería y Panadería
+
PERMISO EXACTO
+
RECURSO / RELACION APLICABLE A PANADERIA
+
ESTADO Y PRERREQUISITOS DE LA ACCION
=
CAPACIDAD AUTORIZABLE DE PANADERIA
```

La palabra “Panadería”, el nombre del producto o una selección visual no constituyen autoridad.

---

#### 2. Fuentes y entradas canónicas

La definición consume y conserva:

- `FOGO-AUTH-001` como inventario de superficies y acciones productivas;
- `FOGO-AUTH-002` como contrato de permisos por área productiva;
- `FOGO-AUTH-003` como frontera server-side de cola por sede, área, permiso, recurso y estado;
- la matriz canónica de `produccion_panaderia` de BLOQUE D;
- `production_bakery` como plantilla de dispositivo operacional compatible con `produccion_panaderia`;
- contratos de identidad, turno, check-in, sede, área, scope, recurso, denegación y frescura;
- catálogo canónico de permisos FOGO;
- `VSCREEN-0055`, `VSCREEN-0057`, `VSCREEN-0061` y superficies posteriores que consuman órdenes, lotes o recetario bajo Panadería;
- contratos productivos y de receta aprobados;
- runtime `vento-group-sas/vento-fogo` observado en `a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

La tarea anterior entrega esta entrada exacta:

```text
COLA YA AUTORIZADA
=
Centro de Producción
+
Galletería y Panadería
+
permiso exacto
+
recurso compatible
```

Esta tarea especializa ese límite para las capacidades FOGO de Panadería; no lo amplía.

---

#### 3. Identidad operativa exacta de Panadería

La identidad operativa ordinaria queda:

| Dimensión | Valor canónico |
| --- | --- |
| Rol operativo | `produccion_panaderia` |
| Familia | Producción |
| Sede efectiva | Centro de Producción |
| Área efectiva | Galletería y Panadería |
| Plantilla compatible de dispositivo | `production_bakery` |
| Aplicación productiva | FOGO |

Reglas:

1. el rol efectivo procede del turno publicado y vigente;
2. el área efectiva procede del mismo contexto laboral autorizado;
3. el área debe pertenecer a la sede efectiva;
4. un perfil, cookie, query parameter o dispositivo no asigna por sí mismo el rol humano;
5. un dispositivo puede restringir el contexto, nunca ampliarlo;
6. la coincidencia parcial con “Panadería” no sustituye la identidad canónica del área;
7. ausencia de un área requerida produce denegación cerrada.

---

#### 4. Territorio autorizado de Panadería

Para operación ordinaria, el territorio autorizado es exclusivamente:

```text
Centro de Producción
└── Galletería y Panadería
```

No forma parte de este territorio:

- Cocina Caliente;
- Repostería;
- bodega general;
- inventario global del Centro de Producción;
- áreas de otras sedes;
- áreas “sin asignar”;
- áreas inferidas desde texto, producto o receta;
- una sede completa sin área productiva exacta cuando la capacidad exige área.

Compartir Centro de Producción no crea herencia lateral entre las tres áreas productivas.

---

#### 5. Permisos FOGO aplicables a `produccion_panaderia`

La tarea no crea claves nuevas y conserva exactamente la decisión ya aprobada:

| Permiso | Decisión operativa | Alcance para Panadería |
| --- | --- | --- |
| `fogo.access` | ASIGNAR OPERATIVO | Entrada a FOGO bajo turno vigente, Centro de Producción y Galletería y Panadería exacta. No concede recursos internos por sí solo. |
| `fogo.production.batches.view` | ASIGNAR OPERATIVO | Lotes vinculados a ejecución de Galletería y Panadería dentro del territorio autorizado. |
| `fogo.production.batches.create` | ASIGNAR OPERATIVO | Creación de lote únicamente para orden, receta, cantidades, área y estado aplicables a Galletería y Panadería. |
| `fogo.production.orders.view` | ASIGNAR OPERATIVO | Órdenes destinadas o asignadas a Galletería y Panadería dentro del periodo/contexto autorizado. |
| `fogo.production.recipe_book.view` | ASIGNAR OPERATIVO | Proyección operativa publicada y aplicable a la producción de Galletería y Panadería. |
| `fogo.production.recipes.view` | NO ASIGNAR | Capacidad administrativa/base; no pertenece al rol operativo de Panadería. |

Ninguna concesión de la tabla funciona como wildcard de FOGO.

---

#### 6. Frontera de entrada a FOGO

`fogo.access` habilita únicamente la entrada contextual a FOGO.

Para `produccion_panaderia`, el servidor deberá comprobar como mínimo:

```text
ACTOR EFECTIVO
→ TURNO PUBLICADO Y VIGENTE
→ ROL produccion_panaderia
→ Centro de Producción
→ Galletería y Panadería
→ fogo.access
→ ENTRADA A FOGO
```

La entrada no demuestra automáticamente autoridad para:

- órdenes;
- lotes;
- creación de lotes;
- recetario operativo;
- recetas administrativas;
- transiciones posteriores del lote;
- calidad, liberación, corrección o supervisión.

---

#### 7. Restricción de cola heredada de `FOGO-AUTH-003`

La cola de Panadería parte de un conjunto ya autorizado en servidor.

Un elemento de `VSCREEN-0055` solo puede aparecer como trabajo de Panadería cuando su territorio material o relación canónica trazable resuelva a:

```text
site = Centro de Producción
area = Galletería y Panadería
```

No es válido:

```text
COLA GLOBAL DEL CENTRO DE PRODUCCION
→ filtro visual “Panadería”
→ ocultar Cocina/Repostería en cliente
```

Los conteos, prioridades y filtros visibles también se calculan sobre el conjunto autorizado, no sobre filas de otras áreas.

---

#### 8. Restricción de órdenes de producción

`fogo.production.orders.view` permite únicamente consultar órdenes cuya relación empresarial las destine o asigne a Galletería y Panadería.

La autorización de una orden exige simultáneamente:

- actor efectivo autorizado;
- turno y sede compatibles;
- área efectiva exacta;
- permiso `fogo.production.orders.view`;
- relación verificable de la orden con Galletería y Panadería;
- estado consultable para la superficie o paso actual.

La consulta no concede:

- reasignar la orden;
- aprobarla;
- modificarla;
- cancelarla;
- moverla a otra área;
- convertirla en autoridad para crear cualquier lote.

Una orden de Cocina Caliente o Repostería no es visible por compartir sede ni por conocer su identificador.

---

#### 9. Restricción de consulta de lotes

`fogo.production.batches.view` se limita a lotes cuyo territorio o genealogía productiva resuelva a Galletería y Panadería.

La decisión deberá poder demostrarse mediante una relación canónica con uno o más de estos elementos, según el modelo propietario:

- orden productiva;
- receta/version publicada;
- ruta productiva;
- área del lote;
- ejecución productiva;
- destino o relación material que determine el área.

No se autoriza un lote únicamente porque:

- fue creado por el mismo actor;
- pertenece al Centro de Producción;
- contiene un producto típico de panadería;
- aparece en un filtro cliente-side;
- comparte una ubicación general con otra área.

---

#### 10. Restricción de creación de lote

`fogo.production.batches.create` es una capacidad distinta de consultar recetario y de consultar lotes.

Para Panadería, una creación de lote deberá revalidar inmediatamente antes del efecto:

```text
ACTOR
+
TURNO / CHECK-IN CUANDO APLIQUE
+
ROL produccion_panaderia
+
Centro de Producción
+
Galletería y Panadería
+
fogo.production.batches.create
+
ORDEN APLICABLE
+
RECETA PUBLICADA Y APLICABLE
+
CANTIDADES / UNIDADES VALIDAS
+
ESTADO ELEGIBLE
+
IDEMPOTENCIA
=
CREACION AUTORIZABLE
```

La creación deberá atribuir el lote al actor efectivo y conservar trazabilidad del recurso y contexto.

Esta tarea no convierte `fogo.production.batches.create` en permiso para iniciar, avanzar, finalizar, corregir, anular, liberar o cerrar cualquier estado posterior. Esas acciones conservan sus tareas propietarias.

---

#### 11. Restricción del recetario operativo

`fogo.production.recipe_book.view` permite únicamente el recetario operativo publicado y aplicable al trabajo autorizado de Galletería y Panadería.

La proyección autorizada puede contener la información necesaria para ejecutar la producción, por ejemplo:

- producto y versión publicada;
- rendimiento y porciones;
- ingredientes e insumos operativos necesarios;
- unidades;
- pasos y controles;
- instrucciones aplicables al lote.

No concede por implicación:

- borradores;
- versiones no publicadas;
- edición;
- aprobación o publicación;
- costos o márgenes administrativos no necesarios;
- secretos de otro dominio;
- exportación masiva;
- maestro completo de recetas;
- recetas de Cocina Caliente o Repostería no aplicables al contexto.

La aplicabilidad se decide en servidor por publicación, proceso, producto, relaciones y contexto; no por búsqueda de texto.

---

#### 12. Exclusión de `fogo.production.recipes.view`

`fogo.production.recipes.view` permanece `BASE_ONLY` y **NO ASIGNAR** para `produccion_panaderia`.

Por tanto:

```text
fogo.production.recipe_book.view
!=
fogo.production.recipes.view
```

El rol operativo no obtiene acceso al catálogo administrativo por:

- poder ejecutar una receta;
- poder consultar un lote;
- poder crear un lote;
- aparecer en Centro de Producción;
- usar una terminal `production_bakery`;
- ser autor de una observación o consumo.

La administración de recetas conserva su carril propietario.

---

#### 13. Aislamiento frente a Cocina Caliente y Repostería

Para un actor ordinario de Panadería:

| Recurso / capacidad | Galletería y Panadería | Cocina Caliente | Repostería |
| --- | --- | --- | --- |
| Cola productiva | PERMITIDA si cumple contrato | DENEGADA | DENEGADA |
| Orden relacionada | PERMITIDA si cumple contrato | DENEGADA | DENEGADA |
| Lote relacionado | PERMITIDO si cumple contrato | DENEGADO | DENEGADO |
| Crear lote | PERMITIDO si cumple contrato | DENEGADO | DENEGADO |
| Recetario publicado aplicable | PERMITIDO | DENEGADO salvo relación canónica futura explícita | DENEGADO salvo relación canónica futura explícita |
| Maestro administrativo | DENEGADO | DENEGADO | DENEGADO |

Una relación futura legítima entre áreas deberá ser explícita y modelada por el contrato propietario; no se infiere desde esta tarea.

---

#### 14. Parámetros de cliente y navegación

Valores como:

```text
site_id
area_id
recipe_id
batch_id
product_id
status
q
```

son localizadores o filtros de presentación.

Pueden reducir o seleccionar dentro de un conjunto autorizado, pero no pueden:

- cambiar el rol efectivo;
- cambiar el área del turno;
- convertir Centro de Producción completo en territorio de Panadería;
- solicitar filas de Cocina o Repostería;
- habilitar un permiso no concedido;
- hacer que un área inválida funcione como wildcard;
- convertir una receta o lote conocido en recurso autorizable.

La manipulación directa de URL debe fallar cerrada respecto de autoridad.

---

#### 15. Identidad de área y prohibición de heurísticas como autoridad

La autorización debe usar identidad canónica y relaciones resolubles, no coincidencias textuales.

Expresiones como:

```text
PAN
PANADERIA
panaderia
“producto de panadería”
```

pueden existir como compatibilidad de presentación o normalización, pero nunca reemplazan:

- `area_id` canónico;
- pertenencia del área a la sede;
- rol efectivo;
- turno;
- permiso;
- relación del recurso con el área.

La denominación visible del área no constituye una clave de autorización.

---

#### 16. Dispositivo `production_bakery`

La plantilla `production_bakery` es compatible con:

```text
produccion_panaderia
+
Centro de Producción
+
Galletería y Panadería exacta
```

Cuando exista una instancia física válida, el dispositivo puede imponer un techo adicional de sede, área, aplicación o acciones permitidas.

Nunca puede:

- asignar por sí solo `produccion_panaderia` a un trabajador;
- ampliar el área humana;
- conceder `fogo.production.recipes.view`;
- conceder multiárea;
- sustituir turno, check-in o firma del actor cuando apliquen;
- convertir una terminal de consulta en terminal de mutación no autorizada.

La intersección válida es siempre la más restrictiva entre contexto humano y dispositivo.

---

#### 17. Frescura y revalidación

Una decisión de Panadería queda obsoleta cuando cambia cualquiera de estos hechos materiales:

- actor efectivo;
- turno;
- check-in;
- rol operativo;
- sede;
- área;
- grant o permiso;
- relación de la orden con el área;
- receta o versión aplicable;
- estado del lote;
- ruta productiva;
- dispositivo o restricción del dispositivo;
- cancelación, cierre o reasignación del recurso.

Toda mutación deberá revalidar autoridad en servidor inmediatamente antes del efecto aunque la pantalla o fila se hubiera mostrado correctamente segundos antes.

---

#### 18. Minimización y no revelación

Un recurso de Cocina Caliente, Repostería u otra sede no debe llegar al cliente del actor de Panadería para ser ocultado posteriormente.

Las filas denegadas tampoco se usan para producir:

- conteos;
- totales;
- badges;
- prioridades;
- filtros descubiertos;
- autocompletados;
- nombres de recetas;
- identificadores de lote u orden;
- mensajes que confirmen existencia del recurso protegido.

La respuesta autorizada contiene únicamente datos necesarios para la operación de Panadería.

---

#### 19. AS-IS verificado y brechas de adopción

El runtime observado de `vento-fogo` contiene mecanismos parciales de sede, área y permisos, pero no demuestra todavía el contrato completo de Panadería.

Se verificó que `src/app/recipe-book/page.tsx`:

- exige entrada a FOGO;
- comprueba `production.recipe_book.view`;
- pasa `siteId` al chequeo observado para roles no owner;
- pasa `areaId: undefined` en ese chequeo;
- para usuarios no management deja `selectedAreaId` vacío;
- consulta `recipe_cards` publicados y, para no owner, los limita por sede;
- no demuestra desde esta superficie una restricción server-side al área exacta Galletería y Panadería;
- contiene `isStandalonePanaderiaArea(...)`, basado en código/nombre, útil como comportamiento de presentación pero insuficiente como autoridad.

Se verificó que `src/app/production-batches/page.tsx`:

- exige `production.batches.view`;
- consulta `production_batches`;
- acepta `site_id` opcional desde `searchParams`;
- aplica filtro de sede solo cuando el parámetro existe;
- no proyecta `area_id` en la fila observada;
- no demuestra aislamiento de Panadería frente a Cocina o Repostería.

Se verificó que `src/app/production-batches/new/page.tsx`:

- modela recetas con `site_id` y `area_id`;
- entra a la acción `createBatch` mediante `production.recipe_book.view`;
- registra/firma la acción con código `production.batches.create` cuando aplica;
- llama a `fogo_create_real_production_batch`;
- por esta fuente aislada no queda demostrado que la acción completa revalide el permiso exacto de creación y el área canónica de Panadería antes de producir el efecto.

También se verificó que la capa de autorización runtime acepta `siteId` y `areaId`, por lo que existe soporte técnico para una convergencia contextual; la existencia de esos parámetros no equivale a adopción completa en todas las superficies.

---

#### 20. Convergencia técnica futura

La materialización deberá converger hacia una sola semántica:

```text
CONTEXTO EFECTIVO
→ TERRITORIO PANADERIA
→ PERMISO EXACTO
→ RECURSO APLICABLE
→ QUERY / RPC / RLS / SERVER ACTION
→ PROYECCION MINIMA
→ REVALIDACION DE MUTACION
```

No se autoriza mantener rutas en las que:

- una página filtra por área pero el RPC no;
- el permiso usa sede sin área mientras el recurso exige área;
- la UI restringe Panadería pero RLS devuelve toda la sede;
- la Server Action confía en una receta seleccionada sin revalidar territorio;
- un helper legacy decide por texto y otro por `area_id`.

La futura unidad física deberá reconciliar todas las capas que participen en el mismo efecto.

---

#### 21. Ownership de Supabase

Toda futura modificación VENTO necesaria para materializar esta restricción en:

- RLS;
- RPC;
- funciones de autorización;
- vistas SQL;
- relaciones de área;
- índices;
- grants;
- triggers;
- tipos generados;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Este marcador no ejecuta cambios Supabase.

---

#### 22. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El recetario observado comprueba el permiso con sede pero `areaId` indefinida para el chequeo mostrado. | Bloquea demostrar aislamiento físico de Panadería desde esa superficie. | `FOGO-AUTH-004::<implementation_unit_id>` | La unidad aplicable deriva/revalida el área efectiva y limita recetas al contexto autorizado antes de serializar. |
| El recetario observado no aplica `selectedAreaId` para el rol ordinario no management. | Puede dejar la UI en un alcance de sede mayor que el contrato de Panadería si otras capas no restringen. | `FOGO-AUTH-004::<implementation_unit_id>` | El conjunto ordinario queda limitado server-side al área exacta, sin depender de filtro visual. |
| La vista de lotes observada no proyecta `area_id` y usa `site_id` opcional cliente-side. | No demuestra aislamiento entre áreas del Centro de Producción. | `FOGO-AUTH-004::<implementation_unit_id>` junto con la materialización territorial de `FOGO-AUTH-003` | El recurso resuelve territorio real y la consulta devuelve solo lotes autorizados de Panadería. |
| `createBatch` entra con `production.recipe_book.view` mientras la acción empresarial es `production.batches.create`. | Riesgo de autoridad insuficientemente explícita si la capa final no revalida el permiso exacto. | `FOGO-AUTH-004::<implementation_unit_id>` / `FOGO-AUTH-009` según unidad propietaria de la mutación | La mutación revalida permiso exacto, actor, contexto, receta, orden, área y estado antes del efecto. |
| La función `isStandalonePanaderiaArea` usa código/nombre. | No bloquea UX; sí impide tratar esa heurística como autoridad. | `FOGO-AUTH-004::<implementation_unit_id>` / `FOGO-UX` cuando corresponda | La autorización usa identidad canónica; la heurística queda solo como presentación/compatibilidad o se retira. |
| El acceso a insumos e inventario relacionado pertenece a otra frontera. | No bloquea esta tarea. | `FOGO-AUTH-007` | La tarea 007 restringe insumos sin conceder inventario general. |
| La lectura multiárea de supervisión no pertenece a un operador ordinario. | No bloquea. | `FOGO-AUTH-008` | El contrato de supervisor define capacidad y alcance explícitos. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 23. Materialización física posterior

La topología vigente de `FOGO-AUTH-004` es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define el contrato global una sola vez.

Cada materialización futura usa:

```text
FOGO-AUTH-004::<implementation_unit_id>
```

La unidad exacta y el paquete propietario se resuelven desde las fuentes canónicas de implementación. Esta tarea no inventa `implementation_unit_id`, no reasigna packages y no autoriza código.

La materialización solo puede comenzar después de que el paquete aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

---

#### 24. Handoff a FOGO-AUTH-005..008

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-005` | Repostería deberá aplicar el mismo patrón de aislamiento con `produccion_reposteria` y Repostería exacta, sin heredar filas, recetas, lotes u órdenes de Panadería. |
| `FOGO-AUTH-006` | Cocina deberá aplicar el mismo patrón con `produccion_cocina` y Cocina Caliente exacta. |
| `FOGO-AUTH-007` | Los insumos consumidos desde Panadería deberán conservar relación con orden/lote/receta/área autorizados y no abrir inventario general. |
| `FOGO-AUTH-008` | Cualquier lectura o acción multiárea de supervisión deberá ser explícita; esta tarea no la concede. |

---

#### 25. Handoff a acciones posteriores de FOGO

Esta tarea no define permisos atómicos nuevos para transiciones todavía propietarias de `FOGO-AUTH-009..016`.

Conserva para esas tareas la regla:

```text
SER RECURSO DE PANADERIA
+
SER VISIBLE
!=
ESTAR AUTORIZADO PARA CUALQUIER MUTACION
```

Toda acción posterior deberá revalidar su propio permiso, estado, actor, turno, territorio y recurso.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el aislamiento de Panadería especializa obligaciones vigentes de autorización contextual, denegación territorial, planificación/ejecución productiva, recetario aplicable, servidor fail-closed y mutación revalidada. La tarea asigna alcance y ownership de materialización sin introducir una regla verificable independiente que requiera una fila nueva o modificada del registro.

---

#### 27. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-AUTH-001` para impedir autorización final por nombre de rol;
- `TREQ-AUTH-004` para decisiones equivalentes por actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` para exigir turno, rol, sede y área cuando correspondan;
- `TREQ-AUTH-009` para resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-013` para impedir bypass de autorización y exigir decisión server-side;
- `TREQ-AUTH-014` y `TREQ-AUTH-015` para frescura, convergencia y trazabilidad de decisión;
- `TREQ-FOGO-001` para ciclo productivo y actor/turno auditables;
- `TREQ-FOGO-002` para receta publicada/versionada y autorización de fórmulas sensibles;
- `TREQ-FOGO-003` para planificación con sede y área explícitas;
- `TREQ-FOGO-004` para ejecución productiva con autoridad y alcance explícitos;
- `TREQ-FOGO-013` para fail-closed de páginas protegidas;
- `TREQ-FOGO-023` para impedir que la visibilidad de una vista autorice por sí sola una mutación.

Esta trazabilidad no modifica 04A.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@d2d84604df053d0ff49d46395f36f9609c757b8b`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, matriz `produccion_panaderia`, contrato `production_bakery`, catálogo de permisos y el AS-IS de recetario, lotes, creación de lote y autorización runtime. `FOGO-AUTH-003` se consume desde el artefacto completo aprobado por el usuario mientras su cierre remoto permanece pendiente. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, check-ins, órdenes, lotes, recetas, dispositivos ni pruebas reales de aislamiento entre áreas. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-004::<implementation_unit_id>`. |

---

#### 29. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] el rol objetivo es exactamente `produccion_panaderia`;
- [ ] la sede ordinaria es Centro de Producción;
- [ ] el área ordinaria es Galletería y Panadería exacta;
- [ ] compartir sede no concede Cocina Caliente ni Repostería;
- [ ] `production_bakery` solo restringe y no asigna autoridad humana;
- [ ] `fogo.access` no funciona como wildcard;
- [ ] `fogo.production.orders.view` solo expone órdenes relacionadas con Panadería;
- [ ] `fogo.production.batches.view` solo expone lotes relacionados con Panadería;
- [ ] `fogo.production.batches.create` exige permiso exacto y revalidación contextual antes del efecto;
- [ ] `fogo.production.recipe_book.view` solo expone publicación operativa aplicable;
- [ ] `fogo.production.recipes.view` permanece fuera del carril operativo;
- [ ] parámetros de cliente no amplían autoridad;
- [ ] texto, código visible o slug de “Panadería” no sustituyen `area_id` y relaciones canónicas;
- [ ] filas denegadas no llegan al cliente ni contaminan conteos/filtros;
- [ ] una mutación revalida autoridad aunque el recurso hubiera sido visible;
- [ ] el AS-IS del recetario queda reconocido como insuficiente para demostrar aislamiento exacto por área;
- [ ] el AS-IS de lotes queda reconocido como insuficiente para demostrar aislamiento exacto por área;
- [ ] la frontera de insumos permanece reservada a `FOGO-AUTH-007`;
- [ ] la supervisión multiárea permanece reservada a `FOGO-AUTH-008`;
- [ ] cualquier cambio futuro de Supabase pertenece a `vento-shell`;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 30. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- crea o modifica migraciones;
- modifica RLS, RPC, grants o datos;
- modifica matrices RBAC ya aprobadas;
- crea permisos nuevos;
- redefine Repostería;
- redefine Cocina Caliente;
- abre inventario general;
- define la frontera completa de insumos de `FOGO-AUTH-007`;
- concede supervisión multiárea;
- redefine identidad o lifecycle de dispositivos;
- diseña UX final;
- define permisos atómicos de inicio, producción parcial, finalización, corrección, anulación, calidad o cierre;
- ejecuta E5;
- crea o autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

---

#### 31. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-003 — Filtrar cola por sede y área`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-004 — Restringir Panadería`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-005 — Restringir Repostería`

### ✅ FOGO-AUTH-005 — Restringir Repostería

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-004 — Restringir Panadería
**Tarea siguiente:** FOGO-AUTH-006 — Restringir Cocina
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización FOGO de la autorización de `produccion_reposteria` al territorio exacto Centro de Producción + Repostería, con aislamiento server-side de órdenes, lotes, creación de lote y recetario operativo
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-005::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo FOGO restringe la operación ordinaria de Repostería al actor efectivo `produccion_reposteria`, a Centro de Producción y al área exacta Repostería, evitando que compartir sede, aplicación, catálogo, receta, producto, dispositivo o permiso base produzca acceso accidental a Cocina Caliente, Galletería y Panadería, administración de recetas o inventario general.

La regla central queda:

```text
ROL OPERATIVO EFECTIVO = produccion_reposteria
+
SEDE EFECTIVA = Centro de Producción
+
AREA EFECTIVA EXACTA = Repostería
+
PERMISO EXACTO
+
RECURSO / RELACION APLICABLE A REPOSTERIA
+
ESTADO Y PRERREQUISITOS DE LA ACCION
=
CAPACIDAD AUTORIZABLE DE REPOSTERIA
```

La palabra “Repostería”, el nombre del producto o una selección visual no constituyen autoridad.

---

#### 2. Fuentes y entradas canónicas

La definición consume y conserva:

- `FOGO-AUTH-001` como inventario de superficies y acciones productivas;
- `FOGO-AUTH-002` como contrato de permisos por área productiva;
- `FOGO-AUTH-003` como frontera server-side de cola por sede, área, permiso, recurso y estado;
- `FOGO-AUTH-004` como patrón inmediato de aislamiento de un área productiva hermana sin herencia lateral dentro de Centro de Producción;
- la matriz canónica de `produccion_reposteria` de BLOQUE D;
- `production_pastry` como plantilla de dispositivo operacional compatible con `produccion_reposteria`;
- contratos de identidad, turno, check-in, sede, área, scope, recurso, denegación y frescura;
- catálogo canónico de permisos FOGO;
- contratos productivos y de receta aprobados;
- runtime `vento-group-sas/vento-fogo` observado en `a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

La tarea anterior entrega esta entrada exacta:

```text
AISLAMIENTO DE AREA PRODUCTIVA
=
actor operativo exacto
+
sede efectiva
+
área efectiva exacta
+
permiso exacto
+
recurso compatible
+
decisión server-side
```

Esta tarea aplica ese patrón a Repostería sin heredar autoridad de Panadería.

---

#### 3. Identidad operativa exacta de Repostería

La identidad operativa ordinaria queda:

| Dimensión | Valor canónico |
| --- | --- |
| Rol operativo | `produccion_reposteria` |
| Familia | Producción |
| Sede efectiva | Centro de Producción |
| Área efectiva | Repostería |
| Plantilla compatible de dispositivo | `production_pastry` |
| Aplicación productiva | FOGO |

Reglas:

1. el rol efectivo procede del turno publicado y vigente;
2. el área efectiva procede del mismo contexto laboral autorizado;
3. el área debe pertenecer a la sede efectiva;
4. un perfil, cookie, query parameter o dispositivo no asigna por sí mismo el rol humano;
5. un dispositivo puede restringir el contexto, nunca ampliarlo;
6. coincidencias de texto, slug, categoría o producto con “Repostería” no sustituyen la identidad canónica del área;
7. ausencia de un área requerida produce denegación cerrada.

---

#### 4. Territorio autorizado de Repostería

Para operación ordinaria, el territorio autorizado es exclusivamente:

```text
Centro de Producción
└── Repostería
```

No forma parte de este territorio:

- Cocina Caliente;
- Galletería y Panadería;
- bodega general;
- inventario global del Centro de Producción;
- áreas de otras sedes;
- áreas “sin asignar”;
- áreas inferidas desde texto, producto o receta;
- una sede completa sin área productiva exacta cuando la capacidad exige área.

Compartir Centro de Producción no crea herencia lateral entre las tres áreas productivas.

---

#### 5. Permisos FOGO aplicables a `produccion_reposteria`

La tarea no crea claves nuevas y conserva exactamente la decisión ya aprobada:

| Permiso | Decisión operativa | Alcance para Repostería |
| --- | --- | --- |
| `fogo.access` | ASIGNAR OPERATIVO | Entrada a FOGO bajo turno vigente, Centro de Producción y Repostería exacta. No concede recursos internos por sí solo. |
| `fogo.production.batches.view` | ASIGNAR OPERATIVO | Lotes vinculados a ejecución de Repostería dentro del territorio autorizado. |
| `fogo.production.batches.create` | ASIGNAR OPERATIVO | Creación de lote únicamente para orden, receta, cantidades, área y estado aplicables a Repostería. |
| `fogo.production.orders.view` | ASIGNAR OPERATIVO | Órdenes destinadas o asignadas a Repostería dentro del periodo/contexto autorizado. |
| `fogo.production.recipe_book.view` | ASIGNAR OPERATIVO | Proyección operativa publicada y aplicable a la producción de Repostería. |
| `fogo.production.recipes.view` | NO ASIGNAR | Capacidad administrativa/base; no pertenece al rol operativo de Repostería. |

Ninguna concesión de la tabla funciona como wildcard de FOGO.

---

#### 6. Frontera de entrada a FOGO

`fogo.access` habilita únicamente la entrada contextual a FOGO.

Para `produccion_reposteria`, el servidor deberá comprobar como mínimo:

```text
ACTOR EFECTIVO
→ TURNO PUBLICADO Y VIGENTE
→ ROL produccion_reposteria
→ Centro de Producción
→ Repostería
→ fogo.access
→ ENTRADA A FOGO
```

La entrada no demuestra automáticamente autoridad para órdenes, lotes, creación de lotes, recetario operativo, recetas administrativas, transiciones posteriores del lote, calidad, liberación, corrección o supervisión.

---

#### 7. Restricción de cola heredada de `FOGO-AUTH-003`

La cola de Repostería parte de un conjunto ya autorizado en servidor.

Un elemento de la cola productiva solo puede aparecer como trabajo de Repostería cuando su territorio material o relación canónica trazable resuelva a:

```text
site = Centro de Producción
area = Repostería
```

No es válido:

```text
COLA GLOBAL DEL CENTRO DE PRODUCCION
→ filtro visual “Repostería”
→ ocultar Cocina/Panadería en cliente
```

Los conteos, prioridades, badges, búsquedas y filtros visibles también se calculan sobre el conjunto autorizado, no sobre filas de otras áreas.

---

#### 8. Aislamiento respecto de Panadería

`FOGO-AUTH-004` no crea una jerarquía entre áreas ni un permiso reutilizable de Panadería.

Para `produccion_reposteria`:

- una orden de Galletería y Panadería permanece fuera de alcance;
- un lote de Galletería y Panadería permanece fuera de alcance;
- una receta publicada solo para Galletería y Panadería permanece fuera de alcance;
- un `area_id` de Galletería y Panadería no puede reemplazarse por Repostería desde el cliente;
- conocer el identificador de un recurso de Panadería no concede lectura;
- compartir producto, ingrediente, presentación, ubicación general o proceso no crea relación autorizante.

La misma regla aplica simétricamente contra Cocina Caliente.

---

#### 9. Restricción de órdenes de producción

`fogo.production.orders.view` permite únicamente consultar órdenes cuya relación empresarial las destine o asigne a Repostería.

La autorización exige simultáneamente:

- actor efectivo autorizado;
- turno y sede compatibles;
- área efectiva exacta;
- permiso `fogo.production.orders.view`;
- relación verificable de la orden con Repostería;
- estado consultable para la superficie o paso actual.

La consulta no concede reasignar, aprobar, modificar, cancelar, mover de área ni convertir la orden en autoridad para crear cualquier lote.

Una orden de Cocina Caliente o Galletería y Panadería no es visible por compartir sede ni por conocer su identificador.

---

#### 10. Restricción de consulta de lotes

`fogo.production.batches.view` se limita a lotes cuyo territorio o genealogía productiva resuelva a Repostería.

La decisión deberá poder demostrarse mediante una relación canónica con uno o más de estos elementos, según el modelo propietario:

- orden productiva;
- receta/version publicada;
- ruta productiva;
- área del lote;
- ejecución productiva;
- destino o relación material que determine el área.

No se autoriza un lote únicamente porque fue creado por el mismo actor, pertenece al Centro de Producción, contiene un producto típico de repostería, aparece en un filtro cliente-side o comparte una ubicación general con otra área.

---

#### 11. Restricción de creación de lote

`fogo.production.batches.create` es una capacidad distinta de consultar recetario y de consultar lotes.

Para Repostería, una creación de lote deberá revalidar inmediatamente antes del efecto:

```text
ACTOR
+
TURNO / CHECK-IN CUANDO APLIQUE
+
ROL produccion_reposteria
+
Centro de Producción
+
Repostería
+
fogo.production.batches.create
+
ORDEN APLICABLE
+
RECETA PUBLICADA Y APLICABLE
+
CANTIDADES / UNIDADES VALIDAS
+
ESTADO ELEGIBLE
+
IDEMPOTENCIA
=
CREACION AUTORIZABLE
```

La creación deberá atribuir el lote al actor efectivo y conservar trazabilidad del recurso y contexto.

Esta tarea no convierte `fogo.production.batches.create` en permiso para iniciar, avanzar, finalizar, corregir, anular, liberar o cerrar cualquier estado posterior. Esas acciones conservan sus tareas propietarias.

---

#### 12. Restricción del recetario operativo

`fogo.production.recipe_book.view` permite únicamente el recetario operativo publicado y aplicable al trabajo autorizado de Repostería.

La proyección autorizada puede contener únicamente la información necesaria para ejecutar la producción, por ejemplo producto y versión publicada, rendimiento, porciones, ingredientes, unidades, pasos, controles e instrucciones aplicables.

No concede por implicación:

- borradores;
- versiones no publicadas;
- edición;
- aprobación o publicación;
- costos o márgenes administrativos no necesarios;
- secretos de otro dominio;
- exportación masiva;
- maestro completo de recetas;
- recetas de Cocina Caliente o Galletería y Panadería no aplicables al contexto efectivo.

`fogo.production.recipes.view` permanece separado y no se hereda.

---

#### 13. Aplicabilidad de receta

Una receta no entra al recetario operativo de Repostería solo por estar publicada.

La aplicabilidad deberá considerar el contexto canónico disponible, incluyendo cuando corresponda:

- producto;
- proceso;
- sede;
- área;
- versión publicada;
- vigencia;
- orden o necesidad productiva;
- restricciones operativas de la receta.

Una publicación aplicable a otra área no se vuelve aplicable a Repostería por selección visual o por compartir insumos.

---

#### 14. Parámetros de cliente y navegación

Los parámetros `site_id`, `area_id`, `recipe_id`, filtros de estado, búsqueda, producto, cantidad u otros parámetros de navegación son locators o refinadores de un conjunto ya autorizado.

Nunca pueden:

- crear sede efectiva;
- crear área efectiva;
- sustituir turno;
- conceder permisos;
- ampliar la lista de recetas;
- exponer órdenes o lotes de otra área;
- cambiar el territorio real de un recurso;
- habilitar una mutación no autorizada.

Un valor cliente incompatible se ignora como autoridad o produce denegación; nunca amplía el conjunto permitido.

---

#### 15. Resolución server-side obligatoria

La secuencia mínima para una lectura operativa queda:

```text
1. resolver actor efectivo
2. resolver turno/contexto laboral vigente
3. resolver sede efectiva
4. resolver area efectiva = Repostería
5. validar permiso exacto
6. construir territorio autorizado
7. resolver territorio/relacion del recurso
8. intersectar recurso con territorio
9. validar estado y aplicabilidad
10. minimizar proyeccion
11. ordenar / paginar
12. serializar solamente filas autorizadas
```

No se consulta un universo amplio para esconder después las filas en cliente.

---

#### 16. Denegación cruzada

Se deniega cuando ocurra cualquiera de estas condiciones:

- rol distinto sin capacidad explícita equivalente;
- sede distinta;
- área distinta;
- área ausente cuando es obligatoria;
- recurso sin relación demostrable con Repostería;
- receta no aplicable;
- permiso ausente;
- turno/check-in requerido ausente o inválido;
- estado incompatible;
- parámetro cliente que intenta cruzar territorio;
- dispositivo incompatible que intenta ampliar el actor;
- fallo técnico que impide demostrar la autorización.

`null`, ausencia o fallo de resolución no significan “todas las áreas”.

---

#### 17. No revelación de recursos denegados

Los recursos fuera del territorio de Repostería no deberán contaminar:

- filas devueltas;
- conteos;
- badges;
- prioridades;
- resultados de búsqueda;
- opciones descubiertas de filtros;
- nombres de recetas;
- productos o metadatos sensibles;
- mensajes que permitan enumerar identificadores protegidos.

La denegación no deberá revelar si un recurso ajeno existe salvo que otro contrato explícito autorice esa información.

---

#### 18. Mutaciones y revalidación

La visibilidad previa de un recurso nunca sustituye la autorización de la acción.

Toda mutación posterior deberá revalidar en el punto de efecto:

- actor efectivo;
- permiso exacto de mutación;
- turno/contexto requerido;
- sede;
- área;
- recurso;
- relación con Repostería;
- estado;
- idempotencia o concurrencia cuando aplique.

Un recurso visible antes de un cambio de turno, rol, sede, área, permiso o estado puede dejar de ser accionable inmediatamente.

---

#### 19. Dispositivo `production_pastry`

La plantilla `production_pastry` puede limitar la sesión a:

```text
Centro de Producción + Repostería
```

pero no crea por sí sola:

- rol `produccion_reposteria`;
- turno;
- check-in;
- permisos FOGO;
- autoridad sobre recetas, órdenes o lotes;
- capacidad sobre otras áreas.

Si actor y dispositivo difieren, prevalece la intersección más restrictiva compatible con el contrato. El dispositivo nunca amplía al actor.

---

#### 20. Frescura e invalidación

La autorización visible o cacheada deberá invalidarse o revalidarse cuando cambie materialmente cualquiera de estos elementos:

- actor;
- sesión;
- turno;
- rol;
- sede;
- área;
- check-in;
- permisos;
- aplicabilidad o versión de receta;
- asignación/estado de orden;
- territorio o estado del lote;
- política del dispositivo.

Una respuesta obtenida bajo un contexto anterior no autoriza una acción posterior bajo un contexto diferente.

---

#### 21. AS-IS verificable de `vento-fogo`

En `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7` no se observan identificadores runtime específicos `produccion_reposteria`, `production_pastry` o `PASTRY` que por sí solos materialicen esta frontera.

El recetario observado:

- usa `production.recipe_book.view`;
- resuelve una sede activa;
- realiza el chequeo mostrado con `areaId` indefinida;
- para actores ordinarios no management no convierte `requestedAreaId` en autoridad efectiva de área;
- consulta recetas por sede para no-owner y puede filtrar área posteriormente en la lógica de página.

La vista de lotes observada:

- usa `production.batches.view`;
- consulta `production_batches`;
- admite `site_id` opcional desde parámetros;
- no proyecta `area_id` en la fila mostrada.

La creación de lote observada entra con `production.recipe_book.view` y llama `fogo_create_real_production_batch`; la frontera canónica exige que el punto de efecto demuestre el permiso de creación y el territorio exacto, independientemente de esa entrada visual.

Por tanto, el runtime actual no constituye evidencia suficiente de aislamiento físico exacto de Repostería.

---

#### 22. Convergencia técnica futura

La materialización deberá converger, según la unidad propietaria, hacia una cadena equivalente a:

```text
CONTEXTO EFECTIVO
→ AUTORIZACION EXACTA
→ QUERY / RPC / VIEW TERRITORIAL
→ PROYECCION MINIMA
→ REVALIDACION DE MUTACION
→ AUDITORIA
```

No se prescribe aquí un helper, tabla o RPC concreto si la unidad de implementación todavía no lo ha fijado.

La solución deberá evitar duplicar reglas divergentes entre página, server action, RPC, RLS y dispositivo.

---

#### 23. Ownership de Supabase

Toda futura modificación VENTO necesaria para materializar esta restricción en RLS, RPC, funciones de autorización, vistas SQL, relaciones de área, índices, grants, triggers, tipos generados o pruebas de base de datos pertenece exclusivamente a `vento-group-sas/vento-shell`.

Este marcador no ejecuta cambios Supabase.

---

#### 24. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El recetario observado comprueba el permiso con sede pero `areaId` indefinida para el chequeo mostrado. | Bloquea demostrar aislamiento físico de Repostería desde esa superficie. | `FOGO-AUTH-005::<implementation_unit_id>` | La unidad aplicable deriva/revalida el área efectiva y limita recetas al contexto autorizado antes de serializar. |
| El recetario observado no usa el área solicitada como autoridad efectiva para el rol ordinario no management. | Puede dejar la UI en un alcance de sede mayor que el contrato de Repostería si otras capas no restringen. | `FOGO-AUTH-005::<implementation_unit_id>` | El conjunto ordinario queda limitado server-side al área exacta, sin depender de filtro visual. |
| La vista de lotes observada no proyecta `area_id` y usa `site_id` opcional cliente-side. | No demuestra aislamiento entre áreas del Centro de Producción. | `FOGO-AUTH-005::<implementation_unit_id>` junto con la materialización territorial de `FOGO-AUTH-003` | El recurso resuelve territorio real y la consulta devuelve solo lotes autorizados de Repostería. |
| `createBatch` entra con `production.recipe_book.view` mientras la acción empresarial es `production.batches.create`. | Riesgo de autoridad insuficientemente explícita si la capa final no revalida el permiso exacto. | `FOGO-AUTH-005::<implementation_unit_id>` / `FOGO-AUTH-009` según unidad propietaria de la mutación | La mutación revalida permiso exacto, actor, contexto, receta, orden, área y estado antes del efecto. |
| No se observan claves runtime específicas de Repostería que demuestren por sí mismas esta frontera. | No bloquea el contrato; bloquea atribuir materialización inexistente. | `FOGO-AUTH-005::<implementation_unit_id>` | La unidad correspondiente demuestra el aislamiento exacto mediante autoridad y recurso canónicos, no por nombre visible. |
| El acceso a insumos e inventario relacionado pertenece a otra frontera. | No bloquea esta tarea. | `FOGO-AUTH-007` | La tarea 007 restringe insumos sin conceder inventario general. |
| La lectura multiárea de supervisión no pertenece a un operador ordinario. | No bloquea. | `FOGO-AUTH-008` | El contrato de supervisor define capacidad y alcance explícitos. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 25. Materialización física posterior

La topología vigente de `FOGO-AUTH-005` es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define el contrato global una sola vez.

Cada materialización futura usa:

```text
FOGO-AUTH-005::<implementation_unit_id>
```

La unidad exacta y el paquete propietario se resuelven desde las fuentes canónicas de implementación. Esta tarea no inventa `implementation_unit_id`, no reasigna packages y no autoriza código.

La materialización solo puede comenzar después de que el paquete aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

---

#### 26. Handoff a FOGO-AUTH-006..008

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-006` | Cocina deberá aplicar el mismo patrón de aislamiento con `produccion_cocina` y Cocina Caliente exacta, sin heredar filas, recetas, lotes u órdenes de Repostería. |
| `FOGO-AUTH-007` | Los insumos consumidos desde Repostería deberán conservar relación con orden/lote/receta/área autorizados y no abrir inventario general. |
| `FOGO-AUTH-008` | Cualquier lectura o acción multiárea de supervisión deberá ser explícita; esta tarea no la concede. |

---

#### 27. Handoff a acciones posteriores de FOGO

Esta tarea no define permisos atómicos nuevos para transiciones todavía propietarias de `FOGO-AUTH-009..016`.

Conserva para esas tareas la regla:

```text
SER RECURSO DE REPOSTERIA
+
SER VISIBLE
!=
ESTAR AUTORIZADO PARA CUALQUIER MUTACION
```

Toda acción posterior deberá revalidar su propio permiso, estado, actor, turno, territorio y recurso.

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el aislamiento de Repostería especializa obligaciones vigentes de autorización contextual, denegación territorial, planificación/ejecución productiva, recetario aplicable, servidor fail-closed y mutación revalidada. La tarea asigna alcance y ownership de materialización sin introducir una regla verificable independiente que requiera una fila nueva o modificada del registro.

---

#### 29. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-AUTH-001` para impedir autorización final por nombre de rol;
- `TREQ-AUTH-004` para decisiones equivalentes por actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` para exigir turno, rol, sede y área cuando correspondan;
- `TREQ-AUTH-009` para resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-013` para impedir bypass de autorización y exigir decisión server-side;
- `TREQ-AUTH-014` y `TREQ-AUTH-015` para frescura, convergencia y trazabilidad de decisión;
- `TREQ-FOGO-001` para ciclo productivo y actor/turno auditables;
- `TREQ-FOGO-002` para receta publicada/versionada y autorización de fórmulas sensibles;
- `TREQ-FOGO-003` para planificación con sede y área explícitas;
- `TREQ-FOGO-004` para ejecución productiva con autoridad y alcance explícitos;
- `TREQ-FOGO-013` para fail-closed de páginas protegidas;
- `TREQ-FOGO-023` para impedir que la visibilidad de una vista autorice por sí sola una mutación.

Esta trazabilidad no modifica 04A.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@e121be29e400dba9360bad08c2c2b663da13497f`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, matriz `produccion_reposteria`, contrato `production_pastry`, catálogo de permisos y el AS-IS de recetario, lotes y creación de lote. `FOGO-AUTH-004` se consume como dependencia completa aprobada en trabajo adelantado; su cierre canónico se valida antes de `docs:task:start` de esta tarea. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, check-ins, órdenes, lotes, recetas, dispositivos ni pruebas reales de aislamiento entre áreas. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-005::<implementation_unit_id>`. |

---

#### 31. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] el rol objetivo es exactamente `produccion_reposteria`;
- [ ] la sede ordinaria es Centro de Producción;
- [ ] el área ordinaria es Repostería exacta;
- [ ] compartir sede no concede Cocina Caliente ni Galletería y Panadería;
- [ ] `production_pastry` solo restringe y no asigna autoridad humana;
- [ ] `fogo.access` no funciona como wildcard;
- [ ] `fogo.production.orders.view` solo expone órdenes relacionadas con Repostería;
- [ ] `fogo.production.batches.view` solo expone lotes relacionados con Repostería;
- [ ] `fogo.production.batches.create` exige permiso exacto y revalidación contextual antes del efecto;
- [ ] `fogo.production.recipe_book.view` solo expone publicación operativa aplicable;
- [ ] `fogo.production.recipes.view` permanece fuera del carril operativo;
- [ ] parámetros de cliente no amplían autoridad;
- [ ] texto, slug, producto o categoría de “Repostería” no sustituyen `area_id` y relaciones canónicas;
- [ ] filas denegadas no llegan al cliente ni contaminan conteos/filtros;
- [ ] una mutación revalida autoridad aunque el recurso hubiera sido visible;
- [ ] el AS-IS del recetario queda reconocido como insuficiente para demostrar aislamiento exacto por área;
- [ ] el AS-IS de lotes queda reconocido como insuficiente para demostrar aislamiento exacto por área;
- [ ] la frontera de insumos permanece reservada a `FOGO-AUTH-007`;
- [ ] la supervisión multiárea permanece reservada a `FOGO-AUTH-008`;
- [ ] cualquier cambio futuro de Supabase pertenece a `vento-shell`;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 32. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- crea o modifica migraciones;
- modifica RLS, RPC, grants o datos;
- modifica matrices RBAC ya aprobadas;
- crea permisos nuevos;
- redefine Panadería;
- redefine Cocina Caliente;
- abre inventario general;
- define la frontera completa de insumos de `FOGO-AUTH-007`;
- concede supervisión multiárea;
- redefine identidad o lifecycle de dispositivos;
- diseña UX final;
- define permisos atómicos de inicio, producción parcial, finalización, corrección, anulación, calidad o cierre;
- ejecuta E5;
- crea o autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-004 — Restringir Panadería`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-005 — Restringir Repostería`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-006 — Restringir Cocina`

### ✅ FOGO-AUTH-006 — Restringir Cocina

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-005 — Restringir Repostería
**Tarea siguiente:** FOGO-AUTH-007 — Restringir Insumos
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización FOGO de la autorización de `produccion_cocina` al territorio exacto Centro de Producción + Cocina Caliente, con aislamiento server-side de órdenes, lotes, creación de lote y recetario operativo
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-006::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo FOGO restringe la operación ordinaria de Cocina Caliente al actor efectivo `produccion_cocina`, a Centro de Producción y al área exacta Cocina Caliente, evitando que compartir sede, aplicación, catálogo, receta, producto, dispositivo o permiso base produzca acceso accidental a Galletería y Panadería, Repostería, cocina satélite, administración de recetas o inventario general.

La regla central queda:

```text
ROL OPERATIVO EFECTIVO = produccion_cocina
+
SEDE EFECTIVA = Centro de Producción
+
AREA EFECTIVA EXACTA = Cocina Caliente
+
PERMISO EXACTO
+
RECURSO / RELACION APLICABLE A COCINA CALIENTE
+
ESTADO Y PRERREQUISITOS DE LA ACCION
=
CAPACIDAD AUTORIZABLE DE COCINA CALIENTE
```

La palabra “Cocina”, el nombre del producto, una receta, una terminal o una selección visual no constituyen autoridad.

---

#### 2. Fuentes y entradas canónicas

La definición consume y conserva:

- `FOGO-AUTH-001` como inventario de superficies y acciones productivas;
- `FOGO-AUTH-002` como contrato de permisos por área productiva;
- `FOGO-AUTH-003` como frontera server-side de cola por sede, área, permiso, recurso y estado;
- `FOGO-AUTH-004` y `FOGO-AUTH-005` como patrón inmediato de aislamiento entre áreas hermanas de Centro de Producción;
- la matriz canónica de `produccion_cocina` de BLOQUE D;
- `production_kitchen` como plantilla de dispositivo operacional compatible con `produccion_cocina`;
- la separación canónica entre `produccion_cocina` y `cocinero_satelite`;
- contratos de identidad, turno, check-in, sede, área, scope, recurso, denegación y frescura;
- catálogo canónico de permisos FOGO;
- contratos productivos y de receta aprobados;
- runtime `vento-group-sas/vento-fogo` observado en `a40683b2413d621fb3f54f2eebb8743a42bad3d7`.

La tarea anterior entrega esta entrada exacta:

```text
AISLAMIENTO DE AREA PRODUCTIVA
=
actor operativo exacto
+
sede efectiva
+
área efectiva exacta
+
permiso exacto
+
recurso compatible
+
decisión server-side
```

Esta tarea aplica ese patrón a Cocina Caliente sin heredar autoridad de Repostería o Panadería y sin confundir producción central con cocina satélite.

---

#### 3. Identidad operativa exacta de Cocina Caliente

La identidad operativa ordinaria queda:

| Dimensión | Valor canónico |
| --- | --- |
| Rol operativo | `produccion_cocina` |
| Familia | Producción |
| Sede efectiva | Centro de Producción |
| Área efectiva | Cocina Caliente |
| Plantilla compatible de dispositivo | `production_kitchen` |
| Aplicación productiva | FOGO |

Reglas:

1. el rol efectivo procede del turno publicado y vigente;
2. el área efectiva procede del mismo contexto laboral autorizado;
3. el área debe pertenecer a la sede efectiva;
4. un perfil, cookie, query parameter o dispositivo no asigna por sí mismo el rol humano;
5. un dispositivo puede restringir el contexto, nunca ampliarlo;
6. coincidencias de texto, slug, categoría, producto o receta con “Cocina” no sustituyen la identidad canónica del área;
7. ausencia de un área requerida produce denegación cerrada.

---

#### 4. Separación de producción central y cocina satélite

`produccion_cocina` y `cocinero_satelite` son identidades operativas distintas.

No es válido:

```text
cocinero_satelite = produccion_cocina
kitchen_satellite = production_kitchen
production_center = production_kitchen
```

La frontera aprobada queda:

| Dimensión | Producción central | Cocina satélite |
| --- | --- | --- |
| Rol | `produccion_cocina` | `cocinero_satelite` |
| Territorio | Centro de Producción + Cocina Caliente | Sede satélite + área exacta de cocina correspondiente |
| Plantilla | `production_kitchen` | `kitchen_satellite` |
| FOGO productivo central | Según permisos exactos de esta tarea | No se concede por equivalencia de nombre |

El legacy `production_center` no se reutiliza como autoridad porque no distingue las tres áreas productivas centrales.

---

#### 5. Territorio autorizado de Cocina Caliente

Para operación ordinaria, el territorio autorizado es exclusivamente:

```text
Centro de Producción
└── Cocina Caliente
```

No forma parte de este territorio:

- Galletería y Panadería;
- Repostería;
- cocinas satélite;
- bodega general;
- inventario global del Centro de Producción;
- áreas de otras sedes;
- áreas “sin asignar”;
- áreas inferidas desde texto, producto o receta;
- una sede completa sin área productiva exacta cuando la capacidad exige área.

Compartir Centro de Producción no crea herencia lateral entre las tres áreas productivas.

---

#### 6. Permisos FOGO aplicables a `produccion_cocina`

La tarea no crea claves nuevas y conserva exactamente la decisión ya aprobada:

| Permiso | Decisión operativa | Alcance para Cocina Caliente |
| --- | --- | --- |
| `fogo.access` | ASIGNAR OPERATIVO | Entrada a FOGO bajo turno vigente, Centro de Producción y Cocina Caliente exacta. No concede recursos internos por sí solo. |
| `fogo.production.batches.view` | ASIGNAR OPERATIVO | Lotes vinculados a órdenes y ejecución de Cocina Caliente dentro del territorio autorizado. |
| `fogo.production.batches.create` | ASIGNAR OPERATIVO | Creación de lote únicamente para órdenes válidas de Cocina Caliente, con receta publicada, cantidades, unidad, responsable, área, estado e idempotencia válidos. |
| `fogo.production.orders.view` | ASIGNAR OPERATIVO | Órdenes destinadas o asignadas a Cocina Caliente dentro del periodo/contexto autorizado. |
| `fogo.production.recipe_book.view` | ASIGNAR OPERATIVO | Proyección operativa publicada y aplicable a la producción de Cocina Caliente. |
| `fogo.production.recipes.view` | NO ASIGNAR | Capacidad administrativa/base; no pertenece al rol operativo de Cocina Caliente. |

Ninguna concesión de la tabla funciona como wildcard de FOGO.

---

#### 7. Frontera de entrada a FOGO

`fogo.access` habilita únicamente la entrada contextual a FOGO.

Para `produccion_cocina`, el servidor deberá comprobar como mínimo:

```text
ACTOR EFECTIVO
→ TURNO PUBLICADO Y VIGENTE
→ ROL produccion_cocina
→ Centro de Producción
→ Cocina Caliente
→ fogo.access
→ ENTRADA A FOGO
```

La entrada no demuestra automáticamente autoridad para órdenes, lotes, creación de lotes, recetario operativo, recetas administrativas, transiciones posteriores del lote, calidad, liberación, corrección, supervisión o inventario general.

---

#### 8. Restricción de cola heredada de `FOGO-AUTH-003`

La cola de Cocina Caliente parte de un conjunto ya autorizado en servidor.

Un elemento de la cola productiva solo puede aparecer como trabajo de Cocina Caliente cuando su territorio material o relación canónica trazable resuelva a:

```text
site = Centro de Producción
area = Cocina Caliente
```

No es válido:

```text
COLA GLOBAL DEL CENTRO DE PRODUCCION
→ filtro visual “Cocina”
→ ocultar Panadería/Repostería en cliente
```

Los conteos, prioridades, badges, búsquedas y filtros visibles también se calculan sobre el conjunto autorizado, no sobre filas de otras áreas.

---

#### 9. Aislamiento respecto de Panadería y Repostería

Para `produccion_cocina`:

- una orden de Galletería y Panadería o Repostería permanece fuera de alcance;
- un lote de Galletería y Panadería o Repostería permanece fuera de alcance;
- una receta publicada solo para otra área permanece fuera de alcance;
- un `area_id` de otra área no puede reemplazarse por Cocina Caliente desde el cliente;
- conocer el identificador de un recurso ajeno no concede lectura;
- compartir producto, ingrediente, presentación, ubicación general o proceso no crea relación autorizante.

Las tareas 004 y 005 no crean una jerarquía ni un permiso transversal reutilizable por Cocina Caliente.

---

#### 10. Restricción de órdenes de producción

`fogo.production.orders.view` permite únicamente consultar órdenes cuya relación empresarial las destine o asigne a Cocina Caliente.

La autorización exige simultáneamente:

- actor efectivo autorizado;
- turno y sede compatibles;
- área efectiva exacta;
- permiso `fogo.production.orders.view`;
- relación verificable de la orden con Cocina Caliente;
- estado consultable para la superficie o paso actual.

La consulta no concede reasignar, aprobar, modificar, cancelar, mover de área ni convertir la orden en autoridad para crear cualquier lote.

Una orden de Galletería y Panadería, Repostería o una cocina satélite no es visible por compartir categoría, receta o identificador.

---

#### 11. Restricción de consulta de lotes

`fogo.production.batches.view` se limita a lotes cuyo territorio o genealogía productiva resuelva a Cocina Caliente.

La decisión deberá poder demostrarse mediante una relación canónica con uno o más de estos elementos, según el modelo propietario:

- orden productiva;
- receta/version publicada;
- ruta productiva;
- área del lote;
- ejecución productiva;
- destino o relación material que determine el área.

No se autoriza un lote únicamente porque fue creado por el mismo actor, pertenece al Centro de Producción, contiene un producto típico de cocina, aparece en un filtro cliente-side o comparte una ubicación general con otra área.

---

#### 12. Restricción de creación de lote

`fogo.production.batches.create` es una capacidad distinta de consultar recetario y de consultar lotes.

Para Cocina Caliente, una creación de lote deberá revalidar inmediatamente antes del efecto:

```text
ACTOR
+
TURNO / CHECK-IN CUANDO APLIQUE
+
ROL produccion_cocina
+
Centro de Producción
+
Cocina Caliente
+
fogo.production.batches.create
+
ORDEN APLICABLE
+
RECETA PUBLICADA Y APLICABLE
+
CANTIDADES / UNIDADES VALIDAS
+
ESTADO ELEGIBLE
+
IDEMPOTENCIA
=
CREACION AUTORIZABLE
```

La creación deberá atribuir el lote al actor efectivo y conservar trazabilidad del recurso y contexto.

Esta tarea no convierte `fogo.production.batches.create` en permiso para iniciar, avanzar, finalizar, corregir, anular, liberar o cerrar cualquier estado posterior. Esas acciones conservan sus tareas propietarias.

---

#### 13. Restricción del recetario operativo

`fogo.production.recipe_book.view` permite únicamente el recetario operativo publicado y aplicable al trabajo autorizado de Cocina Caliente.

La proyección autorizada puede contener únicamente la información necesaria para ejecutar la producción, por ejemplo producto y versión publicada, rendimiento, porciones, ingredientes, unidades, pasos, controles e instrucciones aplicables.

No concede por implicación:

- borradores;
- versiones no publicadas;
- edición;
- aprobación o publicación;
- costos o márgenes administrativos no necesarios;
- secretos de otro dominio;
- exportación masiva;
- maestro completo de recetas;
- recetas de Galletería y Panadería, Repostería o cocina satélite no aplicables al contexto efectivo.

`fogo.production.recipes.view` permanece separado y no se hereda.

---

#### 14. Aplicabilidad de receta

Una receta no entra al recetario operativo de Cocina Caliente solo por estar publicada.

La aplicabilidad deberá considerar el contexto canónico disponible, incluyendo cuando corresponda:

- producto;
- proceso;
- sede;
- área;
- versión publicada;
- vigencia;
- orden o necesidad productiva;
- restricciones operativas de la receta.

Una publicación aplicable a otra área o a una cocina satélite no se vuelve aplicable a Cocina Caliente por selección visual o por compartir insumos.

---

#### 15. Parámetros de cliente y navegación

Los parámetros `site_id`, `area_id`, `recipe_id`, `batch_id`, `product_id`, `status`, `q`, cantidad u otros parámetros de navegación son localizadores o refinadores de un conjunto ya autorizado.

Nunca pueden:

- crear sede efectiva;
- crear área efectiva;
- sustituir turno;
- conceder permisos;
- ampliar la lista de recetas;
- exponer órdenes o lotes de otra área;
- cambiar el territorio real de un recurso;
- habilitar una mutación no autorizada.

Un valor cliente incompatible se ignora como autoridad o produce denegación; nunca amplía el conjunto permitido.

---

#### 16. Resolución server-side obligatoria

La secuencia mínima para una lectura operativa queda:

```text
1. resolver actor efectivo
2. resolver turno/contexto laboral vigente
3. resolver sede efectiva
4. resolver area efectiva = Cocina Caliente
5. validar permiso exacto
6. construir territorio autorizado
7. resolver territorio/relacion del recurso
8. intersectar recurso con territorio
9. validar estado y aplicabilidad
10. minimizar proyeccion
11. ordenar / paginar
12. serializar solamente filas autorizadas
```

No se consulta un universo amplio para esconder después las filas en cliente.

---

#### 17. Denegación cruzada

Se deniega cuando ocurra cualquiera de estas condiciones:

- rol distinto sin capacidad explícita equivalente;
- sede distinta;
- área distinta;
- área ausente cuando es obligatoria;
- recurso sin relación demostrable con Cocina Caliente;
- receta no aplicable;
- permiso ausente;
- turno/check-in requerido ausente o inválido;
- estado incompatible;
- parámetro cliente que intenta cruzar territorio;
- dispositivo incompatible que intenta ampliar el actor;
- actor `cocinero_satelite` tratado como `produccion_cocina` por equivalencia nominal;
- fallo técnico que impide demostrar la autorización.

`null`, ausencia o fallo de resolución no significan “todas las áreas”.

---

#### 18. No revelación de recursos denegados

Los recursos fuera del territorio de Cocina Caliente no deberán contaminar:

- filas devueltas;
- conteos;
- badges;
- prioridades;
- resultados de búsqueda;
- opciones descubiertas de filtros;
- nombres de recetas;
- productos o metadatos sensibles;
- mensajes que permitan enumerar identificadores protegidos.

La denegación no deberá revelar si un recurso ajeno existe salvo que otro contrato explícito autorice esa información.

---

#### 19. Mutaciones y revalidación

La visibilidad previa de un recurso nunca sustituye la autorización de la acción.

Toda mutación posterior deberá revalidar en el punto de efecto:

- actor efectivo;
- permiso exacto de mutación;
- turno/contexto requerido;
- sede;
- área;
- recurso;
- relación con Cocina Caliente;
- estado;
- idempotencia o concurrencia cuando aplique.

Un recurso visible antes de un cambio de turno, rol, sede, área, permiso o estado puede dejar de ser accionable inmediatamente.

---

#### 20. Dispositivo `production_kitchen`

La plantilla `production_kitchen` puede limitar la sesión a:

```text
Centro de Producción + Cocina Caliente
```

pero no crea por sí sola:

- rol `produccion_cocina`;
- turno;
- check-in;
- permisos FOGO;
- autoridad sobre recetas, órdenes o lotes;
- capacidad sobre otras áreas;
- equivalencia con `kitchen_satellite`.

Si actor y dispositivo difieren, prevalece la intersección más restrictiva compatible con el contrato. El dispositivo nunca amplía al actor.

---

#### 21. Frontera con NEXO e insumos

La matriz de `produccion_cocina` contiene capacidades NEXO operativas adicionales para consultar y registrar consumos trazables, pero esta tarea no desarrolla esa frontera.

Por tanto:

```text
AUTORIZACION FOGO DE COCINA CALIENTE
!=
INVENTARIO GENERAL
!=
AUTORIDAD DE BODEGA
```

El acceso a insumos, ubicaciones, stock, LPN, lotes de inventario y retiros deberá conservar relación con orden, lote, receta y área autorizados y pertenece a `FOGO-AUTH-007`.

Esta tarea no asigna remisiones, compras, recepciones, ajustes, traslados, conteos ni autoridad general sobre inventario.

---

#### 22. Frescura e invalidación

La autorización visible o cacheada deberá invalidarse o revalidarse cuando cambie materialmente cualquiera de estos elementos:

- actor;
- sesión;
- turno;
- rol;
- sede;
- área;
- check-in;
- permisos;
- aplicabilidad o versión de receta;
- asignación/estado de orden;
- territorio o estado del lote;
- política del dispositivo.

Una respuesta obtenida bajo un contexto anterior no autoriza una acción posterior bajo un contexto diferente.

---

#### 23. AS-IS verificable de `vento-fogo`

En `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7` no se observan identificadores runtime específicos `produccion_cocina` o `production_kitchen` que por sí solos materialicen esta frontera.

El recetario observado:

- usa `production.recipe_book.view`;
- resuelve una sede activa;
- realiza el chequeo mostrado con `areaId` indefinida;
- para actores ordinarios no management no convierte `requestedAreaId` en autoridad efectiva de área;
- consulta recetas por sede para no-owner y puede filtrar área posteriormente en la lógica de página.

La vista de lotes observada:

- usa `production.batches.view`;
- consulta `production_batches`;
- admite `site_id` opcional desde parámetros;
- no proyecta `area_id` en la fila mostrada.

La creación de lote observada entra con `production.recipe_book.view` y llama `fogo_create_real_production_batch`; la frontera canónica exige que el punto de efecto demuestre el permiso de creación y el territorio exacto, independientemente de esa entrada visual.

Por tanto, el runtime actual no constituye evidencia suficiente de aislamiento físico exacto de Cocina Caliente.

---

#### 24. Convergencia técnica futura

La materialización deberá converger, según la unidad propietaria, hacia una cadena equivalente a:

```text
CONTEXTO EFECTIVO
→ AUTORIZACION EXACTA
→ QUERY / RPC / VIEW TERRITORIAL
→ PROYECCION MINIMA
→ REVALIDACION DE MUTACION
→ AUDITORIA
```

No se prescribe aquí un helper, tabla o RPC concreto si la unidad de implementación todavía no lo ha fijado.

La solución deberá evitar duplicar reglas divergentes entre página, server action, RPC, RLS y dispositivo.

---

#### 25. Ownership de Supabase

Toda futura modificación VENTO necesaria para materializar esta restricción en RLS, RPC, funciones de autorización, vistas SQL, relaciones de área, índices, grants, triggers, tipos generados o pruebas de base de datos pertenece exclusivamente a `vento-group-sas/vento-shell`.

Este marcador no ejecuta cambios Supabase.

---

#### 26. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El recetario observado comprueba el permiso con sede pero `areaId` indefinida para el chequeo mostrado. | Bloquea demostrar aislamiento físico de Cocina Caliente desde esa superficie. | `FOGO-AUTH-006::<implementation_unit_id>` | La unidad aplicable deriva/revalida el área efectiva y limita recetas al contexto autorizado antes de serializar. |
| El recetario observado no usa el área solicitada como autoridad efectiva para el rol ordinario no management. | Puede dejar la UI en un alcance de sede mayor que el contrato de Cocina Caliente si otras capas no restringen. | `FOGO-AUTH-006::<implementation_unit_id>` | El conjunto ordinario queda limitado server-side al área exacta, sin depender de filtro visual. |
| La vista de lotes observada no proyecta `area_id` y usa `site_id` opcional cliente-side. | No demuestra aislamiento entre áreas del Centro de Producción. | `FOGO-AUTH-006::<implementation_unit_id>` junto con la materialización territorial de `FOGO-AUTH-003` | El recurso resuelve territorio real y la consulta devuelve solo lotes autorizados de Cocina Caliente. |
| `createBatch` entra con `production.recipe_book.view` mientras la acción empresarial es `production.batches.create`. | Riesgo de autoridad insuficientemente explícita si la capa final no revalida el permiso exacto. | `FOGO-AUTH-006::<implementation_unit_id>` / `FOGO-AUTH-009` según unidad propietaria de la mutación | La mutación revalida permiso exacto, actor, contexto, receta, orden, área y estado antes del efecto. |
| El legacy `production_center` no distingue Cocina Caliente, Galletería y Panadería y Repostería. | Impide usar esa plantilla como autoridad suficiente del área. | `FOGO-AUTH-006::<implementation_unit_id>` junto con el contrato de dispositivos vigente | La unidad aplicable usa contexto canónico y `production_kitchen` sin herencia del legacy. |
| `cocinero_satelite` y `produccion_cocina` son roles distintos. | Un alias o normalización incorrecta produciría escalamiento entre operación satélite y producción central. | `FOGO-AUTH-006::<implementation_unit_id>` | La decisión usa el rol efectivo canónico y el territorio correspondiente, sin equivalencia nominal. |
| El acceso a insumos e inventario relacionado pertenece a otra frontera. | No bloquea esta tarea. | `FOGO-AUTH-007` | La tarea 007 restringe insumos sin conceder inventario general. |
| La lectura multiárea de supervisión no pertenece a un operador ordinario. | No bloquea. | `FOGO-AUTH-008` | El contrato de supervisor define capacidad y alcance explícitos. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 27. Materialización física posterior

La topología vigente de `FOGO-AUTH-006` es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define el contrato global una sola vez.

Cada materialización futura usa:

```text
FOGO-AUTH-006::<implementation_unit_id>
```

La unidad exacta y el paquete propietario se resuelven desde las fuentes canónicas de implementación. Esta tarea no inventa `implementation_unit_id`, no reasigna packages y no autoriza código.

La materialización solo puede comenzar después de que el paquete aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

---

#### 28. Handoff a FOGO-AUTH-007..008

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-007` | Los insumos consumidos desde Cocina Caliente deberán conservar relación con orden/lote/receta/área autorizados y no abrir inventario general ni autoridad de bodega. |
| `FOGO-AUTH-008` | Cualquier lectura o acción multiárea de supervisión deberá ser explícita; esta tarea no la concede. |

---

#### 29. Handoff a acciones posteriores de FOGO

Esta tarea no define permisos atómicos nuevos para transiciones todavía propietarias de `FOGO-AUTH-009..016`.

Conserva para esas tareas la regla:

```text
SER RECURSO DE COCINA CALIENTE
+
SER VISIBLE
!=
ESTAR AUTORIZADO PARA CUALQUIER MUTACION
```

Toda acción posterior deberá revalidar su propio permiso, estado, actor, turno, territorio y recurso.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el aislamiento de Cocina Caliente especializa obligaciones vigentes de autorización contextual, denegación territorial, planificación/ejecución productiva, recetario aplicable, servidor fail-closed y mutación revalidada. La separación respecto de cocina satélite y dispositivos legacy aplica decisiones canónicas ya existentes y no introduce una obligación verificable independiente que requiera una fila nueva o modificada del registro.

---

#### 31. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-AUTH-001` para impedir autorización final por nombre de rol;
- `TREQ-AUTH-004` para decisiones equivalentes por actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` para exigir turno, rol, sede y área cuando correspondan;
- `TREQ-AUTH-009` para resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-013` para impedir bypass de autorización y exigir decisión server-side;
- `TREQ-AUTH-014` y `TREQ-AUTH-015` para frescura, convergencia y trazabilidad de decisión;
- `TREQ-FOGO-001` para ciclo productivo y actor/turno auditables;
- `TREQ-FOGO-002` para receta publicada/versionada y autorización de fórmulas sensibles;
- `TREQ-FOGO-003` para planificación con sede y área explícitas;
- `TREQ-FOGO-004` para ejecución productiva con autoridad y alcance explícitos;
- `TREQ-FOGO-013` para fail-closed de páginas protegidas;
- `TREQ-FOGO-023` para impedir que la visibilidad de una vista autorice por sí sola una mutación.

Esta trazabilidad no modifica 04A.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@ff465b3d132e8a3115d1d6497394d3834b4ed325`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, continuidad con `FOGO-AUTH-005` como anterior, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, matriz `produccion_cocina`, contrato `production_kitchen`, separación de `cocinero_satelite`, catálogo de permisos y el AS-IS de recetario, lotes y creación de lote. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, check-ins, órdenes, lotes, recetas, dispositivos ni pruebas reales de aislamiento entre áreas. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-006::<implementation_unit_id>`. |

---

#### 33. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] el rol objetivo es exactamente `produccion_cocina`;
- [ ] la sede ordinaria es Centro de Producción;
- [ ] el área ordinaria es Cocina Caliente exacta;
- [ ] `produccion_cocina` no se confunde con `cocinero_satelite`;
- [ ] `production_kitchen` no se confunde con `kitchen_satellite` ni `production_center`;
- [ ] compartir sede no concede Galletería y Panadería ni Repostería;
- [ ] `production_kitchen` solo restringe y no asigna autoridad humana;
- [ ] `fogo.access` no funciona como wildcard;
- [ ] `fogo.production.orders.view` solo expone órdenes relacionadas con Cocina Caliente;
- [ ] `fogo.production.batches.view` solo expone lotes relacionados con Cocina Caliente;
- [ ] `fogo.production.batches.create` exige permiso exacto y revalidación contextual antes del efecto;
- [ ] `fogo.production.recipe_book.view` solo expone publicación operativa aplicable;
- [ ] `fogo.production.recipes.view` permanece fuera del carril operativo;
- [ ] parámetros de cliente no amplían autoridad;
- [ ] texto, producto, receta o categoría de “Cocina” no sustituyen `area_id` y relaciones canónicas;
- [ ] filas denegadas no llegan al cliente ni contaminan conteos/filtros;
- [ ] una mutación revalida autoridad aunque el recurso hubiera sido visible;
- [ ] el AS-IS del recetario queda reconocido como insuficiente para demostrar aislamiento exacto por área;
- [ ] el AS-IS de lotes queda reconocido como insuficiente para demostrar aislamiento exacto por área;
- [ ] la frontera de insumos permanece reservada a `FOGO-AUTH-007`;
- [ ] la supervisión multiárea permanece reservada a `FOGO-AUTH-008`;
- [ ] cualquier cambio futuro de Supabase pertenece a `vento-shell`;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 34. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- crea o modifica migraciones;
- modifica RLS, RPC, grants o datos;
- modifica matrices RBAC ya aprobadas;
- crea permisos nuevos;
- redefine Panadería;
- redefine Repostería;
- redefine `cocinero_satelite`;
- abre inventario general;
- desarrolla la frontera completa de insumos de `FOGO-AUTH-007`;
- concede supervisión multiárea;
- redefine identidad o lifecycle de dispositivos;
- diseña UX final;
- define permisos atómicos de inicio, producción parcial, finalización, corrección, anulación, calidad o cierre;
- ejecuta E5;
- crea o autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-005 — Restringir Repostería`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-006 — Restringir Cocina`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-007 — Restringir Insumos`

### ✅ FOGO-AUTH-007 — Restringir Insumos

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-006 — Restringir Cocina
**Tarea siguiente:** FOGO-AUTH-008 — Definir permisos de supervisor
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — especialización FOGO/NEXO de la autorización de insumos productivos, limitada por actor, sede, área productiva, orden o lote, receta/version aplicable, ubicación, stock y operación de consumo, sin crear un cuarto rol productivo ni autoridad general de bodega
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-007::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo un actor productivo autorizado puede consultar, identificar y consumir insumos necesarios para su trabajo sin convertir FOGO en propietario del inventario, sin crear un rol `produccion_insumos`, sin convertir bodega en una cuarta área productiva y sin conceder inventario general por compartir Centro de Producción.

La regla central queda:

```text
ACTOR PRODUCTIVO AUTORIZADO
+
SEDE Y AREA PRODUCTIVA EFECTIVAS
+
ORDEN O LOTE PRODUCTIVO AUTORIZADO
+
RECETA / VERSION PUBLICADA Y APLICABLE
+
INSUMO CANONICO NECESARIO
+
UBICACION / STOCK / LOTE DE INVENTARIO AUTORIZADOS
+
PERMISO NEXO EXACTO
+
ESTADO Y PRERREQUISITOS DE LA OPERACION
=
CAPACIDAD AUTORIZABLE SOBRE INSUMOS
```

La palabra “insumo”, la pertenencia al Centro de Producción, la presencia del producto en una receta o conocer un identificador no constituyen autoridad.

---

#### 2. Fuentes y entradas canónicas

La definición consume y conserva:

- `FOGO-AUTH-002` como contrato de permisos por las tres áreas productivas;
- `FOGO-AUTH-003` como frontera server-side por sede, área, permiso, recurso y estado;
- `FOGO-AUTH-004`, `FOGO-AUTH-005` y `FOGO-AUTH-006` como contratos de aislamiento de Panadería, Repostería y Cocina Caliente;
- las matrices canónicas `AUTH-RBAC-014`, `AUTH-RBAC-015` y `AUTH-RBAC-016`;
- el catálogo y contrato de recurso NEXO para ubicaciones, LPN, stock, lotes productivos de inventario y retiros;
- `INT-PROD-001` como contrato de solicitud/reserva de materiales entre FOGO y NEXO;
- `INT-PROD-002` como propietario del registro de consumo en NEXO;
- los contratos vigentes de receta, orden, lote, identidad, turno, check-in, sede, área, recurso, idempotencia y trazabilidad;
- las plantillas operativas `production_kitchen`, `production_bakery` y `production_pastry`;
- el runtime observado de `vento-group-sas/vento-fogo` y `vento-group-sas/vento-nexo`.

La tarea anterior entrega esta entrada exacta:

```text
TRES AREAS PRODUCTIVAS AISLADAS
=
Cocina Caliente
+
Galletería y Panadería
+
Repostería
```

Esta tarea aplica ese aislamiento a los materiales consumibles y a sus superficies NEXO sin unir las áreas ni crear autoridad transversal.

---

#### 3. Insumos no es un cuarto rol productivo

El canon vigente reconoce exactamente tres roles productivos ordinarios:

| Rol operativo | Sede | Área productiva | Dispositivo compatible |
| --- | --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente | `production_kitchen` |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería | `production_bakery` |
| `produccion_reposteria` | Centro de Producción | Repostería | `production_pastry` |

Por tanto:

```text
NO EXISTE:
produccion_insumos
```

y tampoco se crea una cuarta área FOGO denominada “Insumos”.

Los insumos son recursos empresariales gobernados por NEXO que una ejecución productiva autorizada puede consultar o consumir dentro de una relación concreta con su área, orden, lote y receta.

---

#### 4. Separación de ownership FOGO y NEXO

La propiedad funcional queda:

| Dominio | Owner funcional |
| --- | --- |
| Orden productiva, receta/version, ejecución, lote productivo y rendimiento | FOGO |
| Producto, presentación, unidad, ubicación, LPN, stock, lote de inventario, retiro y movimiento de existencias | NEXO |
| Contratos de autorización y toda modificación VENTO de Supabase | `vento-shell` |

Reglas:

1. FOGO determina qué materiales requiere la ejecución mediante orden y receta/version aplicables;
2. NEXO determina qué existencia real puede consultarse, reservarse, consumirse o moverse;
3. FOGO no crea una proyección alternativa de stock como fuente de verdad;
4. NEXO no redefine la receta, orden o lote productivo;
5. una pantalla FOGO puede presentar información mínima de materiales sin adquirir ownership de inventario;
6. cualquier efecto sobre existencias conserva el contrato propietario de NEXO.

---

#### 5. Capacidades NEXO ya concedidas a las tres áreas productivas

Las matrices vigentes asignan exactamente las mismas once claves NEXO operativas a `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`:

| Permiso | Función dentro de producción |
| --- | --- |
| `nexo.access` | Entrar a NEXO bajo contexto operativo válido. |
| `nexo.catalog.products.view` | Identificar productos e insumos necesarios. |
| `nexo.catalog.presentations.view` | Interpretar presentaciones, empaques y conversiones publicadas. |
| `nexo.catalog.categories.view` | Localizar referencias relacionadas con la ejecución. |
| `nexo.catalog.units.view` | Resolver unidades y equivalencias publicadas. |
| `nexo.inventory.locations.view` | Consultar únicamente ubicaciones aplicables al territorio productivo. |
| `nexo.inventory.lpns.view` | Consultar LPN o contenedores relacionados con insumos o lote autorizado. |
| `nexo.inventory.stock.view` | Consultar disponibilidad necesaria dentro del alcance autorizado. |
| `nexo.inventory.production_batches.view` | Consultar trazabilidad de inventario vinculada a lotes productivos autorizados. |
| `nexo.inventory.withdrawals.view` | Consultar retiros o consumos relacionados con el actor o recurso productivo autorizado. |
| `nexo.inventory.withdrawals.register` | Registrar consumo trazable contra una orden o lote productivo válido. |

Esta tarea no crea nuevas claves ni transforma ninguna de estas concesiones en wildcard de inventario.

---

#### 6. Frontera de `nexo.access`

`nexo.access` habilita únicamente la entrada contextual a NEXO.

No concede por sí solo:

- catálogo completo;
- ubicaciones completas;
- stock completo;
- LPN completos;
- retiros de terceros;
- movimientos generales;
- bodega;
- remisiones;
- ajustes;
- entradas;
- traslados;
- conteos;
- configuración.

Cada capacidad interna exige su permiso exacto, territorio, recurso y prerrequisitos.

---

#### 7. Proyección mínima de catálogo

Las capacidades de productos, presentaciones, categorías y unidades se utilizan únicamente para interpretar la ejecución productiva.

La proyección operativa podrá incluir lo mínimo necesario para:

- identificar el insumo;
- resolver presentación;
- resolver unidad de entrada y unidad de stock;
- aplicar conversión publicada;
- distinguir producto activo/elegible;
- relacionar el insumo con receta, orden o lote.

No concede:

- creación o edición de productos;
- edición de presentaciones, categorías o unidades;
- proveedores;
- costos o márgenes no necesarios;
- configuración de inventario;
- catálogo administrativo transversal.

---

#### 8. Ubicaciones autorizadas

`nexo.inventory.locations.view` no concede ver todas las ubicaciones de la sede.

Una ubicación es consultable por un actor productivo solo cuando:

- pertenece a la sede autorizada;
- es compatible con el área productiva efectiva o con una relación material explícita;
- puede abastecer el insumo requerido según el contrato propietario;
- su estado permite la operación;
- la proyección es necesaria para identificar el origen físico del material.

Zona, posición o código LOC no sustituyen la pertenencia territorial de la ubicación.

---

#### 9. Consulta de stock

`nexo.inventory.stock.view` se limita al stock que pueda participar legítimamente en la ejecución autorizada.

La consulta deberá considerar, según corresponda:

- producto/presentación;
- unidad y conversión;
- sede;
- área;
- ubicación;
- lote o LPN;
- estado de disponibilidad;
- reserva previa;
- cuarentena, daño, vencimiento u otra condición;
- relación con orden, lote o receta.

Stock físico observado no equivale a stock autorizable ni a stock reservado.

---

#### 10. Consulta de LPN

`nexo.inventory.lpns.view` solo expone LPN cuyo territorio vigente o histórico corresponda a la consulta autorizada y cuya información sea necesaria para seleccionar o trazar material.

El permiso no concede:

- mover el LPN;
- reasignar ubicación;
- abrir otro territorio;
- consultar todo su historial fuera de necesidad;
- modificar custodia;
- consumir contenido sin autorización de retiro.

Si el LPN cambia de territorio, la decisión utiliza el territorio real aplicable al estado consultado.

---

#### 11. Lotes productivos vinculados al inventario

`nexo.inventory.production_batches.view` permite únicamente la trazabilidad de inventario necesaria para relacionar existencias con un lote productivo autorizado.

La lectura no concede:

- consultar lotes de otra área;
- modificar existencias;
- corregir consumos;
- iniciar movimientos;
- cambiar el estado productivo;
- convertir un lote FOGO en autoridad general sobre inventario.

La relación deberá ser verificable mediante identidad canónica y no por coincidencia de nombres.

---

#### 12. Consulta de retiros y consumos

`nexo.inventory.withdrawals.view` se limita a:

- consumos del actor cuando el contrato lo permita;
- consumos del lote productivo autorizado;
- consumos de la orden autorizada;
- retiros relacionados con el área productiva efectiva;
- evidencia necesaria para conciliación de la ejecución.

No expone retiros generales de la sede, otras áreas, bodega o trabajadores no relacionados.

---

#### 13. Registro de consumo

`nexo.inventory.withdrawals.register` representa la operación empresarial de registrar salida o consumo de existencias; no es una simple inserción de fila.

Para producción, una autorización válida exige como mínimo:

```text
ACTOR EFECTIVO
+
TURNO Y CHECK-IN ACTIVOS
+
ROL PRODUCTIVO AUTORIZADO
+
SEDE Y AREA EFECTIVAS
+
nexo.inventory.withdrawals.register
+
ORDEN O LOTE PRODUCTIVO AUTORIZADO
+
RECETA / VERSION APLICABLE
+
INSUMO REQUERIDO
+
UBICACION ORIGEN AUTORIZADA
+
STOCK / LOTE / LPN UTILIZABLE CUANDO APLIQUE
+
CANTIDAD Y UNIDAD VALIDAS
+
IDEMPOTENCIA Y CONTROL DE CONCURRENCIA
=
CONSUMO AUTORIZABLE
```

La mutación debe revalidarse server-side inmediatamente antes del efecto.

---

#### 14. Vínculo obligatorio con área, orden, lote y receta

Un consumo productivo no se autoriza solamente por coincidir producto y sede.

La cadena de relación debe permitir demostrar, según el momento del proceso:

```text
AREA PRODUCTIVA
↔ ORDEN
↔ LOTE PRODUCTIVO
↔ RECETA / VERSION
↔ LINEA MATERIAL / INSUMO
↔ EXISTENCIA ORIGEN
↔ RETIRO / CONSUMO
```

No todos los extremos tienen que estar materializados en la misma tabla, pero la relación empresarial debe ser determinista y auditable.

Un retiro manual sin vínculo productivo no se transforma en consumo de FOGO por escribir una nota o un texto descriptivo.

---

#### 15. Disponibilidad, reserva y consumo son hechos distintos

La tarea conserva la separación definida por los contratos de integración:

```text
DISPONIBLE
!=
RESERVADO
!=
CONSUMIDO
```

Reglas:

1. una lectura de stock no reserva;
2. una reserva no consume;
3. una reserva pertenece al contrato de preparación de materiales;
4. el consumo pertenece al contrato NEXO de efecto sobre existencias;
5. una respuesta perdida no autoriza repetir el efecto;
6. una corrección no sobrescribe silenciosamente la historia previa;
7. una cancelación de trabajo debe liberar o reconciliar recursos mediante el contrato propietario.

---

#### 16. Inventario general y bodega permanecen fuera

La operación productiva ordinaria no recibe autoridad de bodega.

Quedan fuera por defecto:

- ajustes de inventario;
- entradas ordinarias o excepcionales;
- asignaciones de ubicación;
- configuración de catálogo de ubicación;
- movimientos generales;
- creación de traslados;
- zonas y posiciones de almacenamiento como catálogo general;
- operaciones de bodega;
- validaciones de stock;
- conteos de inventario;
- conteos iniciales;
- remisiones;
- operaciones logísticas;
- compras y recepciones ORIGO.

La posibilidad de consumir un insumo desde una ubicación autorizada no convierte al actor productivo en `bodeguero`.

---

#### 17. Remisiones no son consumo productivo

Una remisión puede abastecer la sede o participar como antecedente logístico, pero sus capacidades pertenecen a roles y procesos distintos.

El actor productivo no obtiene por `FOGO-AUTH-007`:

- solicitar remisión;
- preparar remisión;
- despachar remisión;
- recibir remisión;
- cancelar remisión;
- administrar logística.

El material recibido solo entra al carril productivo cuando NEXO lo reconoce como existencia utilizable y el contrato de producción lo relaciona con una ejecución autorizada.

---

#### 18. Compras y ORIGO permanecen separados

La necesidad productiva de un insumo no concede:

- acceso a proveedores;
- órdenes de compra;
- recepciones de compra;
- precios administrativos;
- autoridad para abastecer o comprar.

FOGO expresa necesidad productiva; NEXO gobierna inventario; ORIGO conserva compras y recepciones.

---

#### 19. Unidades y conversiones

Toda cantidad productiva y de inventario deberá conservar unidades compatibles y conversiones canónicas.

No se autoriza:

- inventar factores en la UI;
- mezclar unidad de receta con unidad de stock sin conversión publicada;
- redondear de forma diferente entre FOGO y NEXO;
- registrar un consumo con unidad ambigua;
- usar una presentación distinta para producir un efecto equivalente sin demostrar la conversión.

La cantidad consumida deberá poder reconciliarse con la cantidad productiva y la identidad exacta del insumo.

---

#### 20. Lote, condición y vencimiento

Cuando el producto esté sujeto a trazabilidad, la selección de existencia deberá conservar la información aplicable de:

- lote o serial;
- origen;
- ubicación;
- cantidad;
- estado de liberación;
- vencimiento o vida útil;
- cuarentena;
- daño, pérdida u otra condición;
- requerimientos de frío u otra condición operacional.

Una existencia no utilizable no se vuelve consumible por ser visible o por tener cantidad positiva.

---

#### 21. Idempotencia, concurrencia y no doble consumo

Toda mutación de consumo deberá impedir:

- stock negativo no autorizado;
- dos consumos del mismo intento lógico;
- dos órdenes reservando o consumiendo la misma existencia incompatible;
- replay con payload diferente bajo el mismo identificador;
- actualización parcial que deje movimiento y proyección divergentes;
- contabilizar simultáneamente stock suelto y contenido de LPN como existencias independientes;
- reintento ciego después de un timeout con resultado desconocido.

La operación deberá producir un resultado recuperable y auditable.

---

#### 22. No inferir autoridad desde la receta

La receta/version publicada determina qué material necesita una ejecución, no quién puede consumir cualquier existencia.

Por tanto:

```text
RECETA CONTIENE INSUMO
!=
AUTORIZACION DE INVENTARIO
```

La decisión final continúa exigiendo actor, contexto, permiso NEXO, territorio, recurso y estado.

---

#### 23. Dispositivos productivos

Las plantillas `production_kitchen`, `production_bakery` y `production_pastry` pueden restringir la sesión a su área productiva compatible y al package operacional permitido.

Nunca pueden:

- crear un rol `produccion_insumos`;
- ampliar el territorio humano;
- conceder bodega;
- conceder remisiones;
- conceder compras;
- sustituir turno o check-in;
- convertir un permiso legacy en autoridad más amplia;
- autorizar un consumo sin vínculo con el recurso productivo.

La intersección entre actor y dispositivo siempre adopta la restricción más estrecha.

---

#### 24. AS-IS observado en FOGO

El runtime observado de FOGO demuestra una integración material parcial, no el contrato objetivo completo.

La creación de lote:

- captura cantidades reales por ingrediente;
- invoca `fogo_create_real_production_batch`;
- puede seleccionar existencias;
- puede modificar proyecciones de inventario;
- puede insertar movimientos `production_consume`;
- registra consumos del lote durante la creación productiva.

Esto demuestra capacidad técnica de consumo, pero no demuestra por sí solo la separación canónica FOGO → NEXO con autorización, reserva/consumo, idempotencia, posting y conciliación independientes.

La implementación vigente no convierte a FOGO en owner del inventario.

---

#### 25. AS-IS observado en NEXO

El runtime observado de NEXO contiene una superficie genérica de retiro con capacidad real de producir movimientos de inventario.

Se observó que `src/app/inventory/withdraw/page.tsx`:

- entra mediante el código legacy `inventory.withdraw`;
- la normalización canónica converge esa capacidad a `nexo.inventory.withdrawals.register`;
- permite seleccionar sede por parámetro URL antes de preferencias y sede del empleado;
- lista ubicaciones activas por sede en la superficie observada;
- usa `manual_withdraw_enabled` con valor por defecto permisivo cuando no existe configuración;
- separa el modo de inventario real de un movimiento operativo `stock_consume_position`;
- la server action observada resuelve sede desde preferencias/empleado y valida que la ubicación pertenezca a la sede;
- no demuestra en esa acción una revalidación explícita del área productiva efectiva;
- no demuestra vínculo obligatorio con orden, lote, receta/version, reserva o línea material FOGO;
- puede llamar `consume_inventory_stock_from_positions`, insertar `inventory_movements` y actualizar proyecciones de stock.

Esta superficie genérica no constituye por sí sola la materialización del consumo productivo gobernado por esta tarea.

---

#### 26. Normalización de permiso legacy

Los códigos legacy:

```text
nexo.inventory.withdraw
nexo.kiosk_withdraw.view
```

convergen en la capacidad canónica:

```text
nexo.inventory.withdrawals.register
```

La forma de acceso —kiosco, tablet, PC o interfaz personal— no crea permisos empresariales distintos.

La compatibilidad legacy puede mantenerse durante transición, pero la decisión canónica, auditoría y tests deben converger al permiso normalizado y a su contrato de recurso.

---

#### 27. Orden de decisión server-side

La secuencia mínima para consultar o consumir insumos queda:

```text
1. resolver actor efectivo
2. resolver turno y check-in cuando corresponda
3. resolver rol productivo
4. resolver sede y area efectivas
5. validar permiso exacto
6. resolver orden/lote/receta aplicables
7. derivar material requerido
8. resolver existencia y territorio reales en NEXO
9. validar unidad, cantidad, lote/LPN, condicion y estado
10. aplicar idempotencia/concurrencia
11. minimizar datos en lecturas o ejecutar la mutacion atomica
12. registrar evidencia y correlacion
```

Los parámetros de cliente solo pueden seleccionar o refinar dentro del conjunto autorizado.

---

#### 28. Denegación y no revelación

La decisión falla cerrada cuando no pueda demostrarse cualquiera de las relaciones obligatorias.

Un recurso denegado no deberá utilizarse para producir:

- filas visibles;
- conteos;
- stock agregado;
- autocompletados;
- nombres de ubicaciones;
- LPN;
- lotes;
- sugerencias de productos;
- mensajes que permitan enumerar existencia protegida.

`null`, ausencia, error de resolución o contexto incompleto no significan “toda la sede” ni “todas las áreas”.

---

#### 29. Frescura y revalidación

La decisión queda obsoleta cuando cambia materialmente:

- actor;
- turno;
- check-in;
- rol;
- sede;
- área;
- permiso;
- orden o lote productivo;
- receta/version;
- requerimiento material;
- ubicación;
- stock;
- lote/LPN;
- condición o vencimiento;
- reserva;
- configuración del dispositivo;
- estado del recurso.

Toda mutación revalida autoridad inmediatamente antes del efecto, aunque el insumo hubiera sido visible previamente.

---

#### 30. Ownership de Supabase

Toda futura modificación VENTO necesaria para materializar esta frontera en:

- RLS;
- RPC;
- funciones de autorización;
- movimientos;
- reservas;
- retiros;
- proyecciones de stock;
- relaciones de área;
- locks;
- idempotencia;
- auditoría;
- tipos generados;
- pruebas de base de datos

pertenece exclusivamente a `vento-group-sas/vento-shell`.

Este marcador no ejecuta cambios Supabase.

---

#### 31. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El consumo vigente de FOGO puede producir efectos NEXO dentro de `fogo_create_real_production_batch`. | No demuestra la separación empresarial completa entre ejecución productiva y operación de inventario. | `FOGO-AUTH-007::<implementation_unit_id>` junto con `INT-PROD-001`/`INT-PROD-002` y la unidad de integración aplicable | La unidad materializada conserva autorización exacta, ownership NEXO, correlación, idempotencia y conciliación sin doble efecto. |
| La superficie genérica NEXO observada entra con `inventory.withdraw`, código legacy de la capacidad de retiro. | Puede mantener semántica de autorización divergente si consumidor y contrato canónico no convergen. | Unidad NEXO aplicable y `FOGO-AUTH-007::<implementation_unit_id>` cuando el consumidor sea productivo | El consumidor productivo usa o normaliza de forma verificable `nexo.inventory.withdrawals.register` con el mismo resultado de autorización. |
| La server action de retiro observada resuelve sede desde preferencias/empleado y valida ubicación por sede, sin demostrar área productiva efectiva. | Puede permitir un alcance mayor al área productiva si otras capas no cierran la decisión. | `FOGO-AUTH-007::<implementation_unit_id>` y owner NEXO de la superficie | La mutación deriva/revalida área efectiva y territorio real del origen antes del efecto. |
| La superficie de retiro observada no demuestra vínculo obligatorio con orden, lote, receta/version, reserva o línea material FOGO. | Un retiro manual no prueba consumo productivo trazable. | `FOGO-AUTH-007::<implementation_unit_id>` + contrato `INT-PROD-002` | El consumo productivo conserva correlación determinista con ejecución y material requeridos. |
| `manual_withdraw_enabled` usa un default permisivo en la función observada. | No bloquea el contrato, pero no puede sustituir autorización canónica ni habilitar producción por defecto. | Owner NEXO de configuración/consumo | La flag se trata solo como capacidad operacional adicional y nunca como grant de autorización. |
| Bodega, remisiones y compras permanecen dominios separados. | Evita ampliar permisos productivos por necesidad material. | Matrices NEXO/ORIGO y tareas propietarias existentes | Las materializaciones consumen contratos propietarios sin conceder nuevas capacidades desde FOGO. |
| La supervisión multiárea no pertenece a un operador ordinario. | No bloquea. | `FOGO-AUTH-008` | La tarea 008 define explícitamente cualquier autoridad multiárea. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 32. Materialización física posterior

La topología vigente de `FOGO-AUTH-007` es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define el contrato global una sola vez.

Cada materialización futura usa:

```text
FOGO-AUTH-007::<implementation_unit_id>
```

La unidad exacta y el paquete propietario se resuelven desde las fuentes canónicas de implementación. Esta tarea no inventa `implementation_unit_id`, no reasigna packages y no autoriza código.

La materialización solo puede comenzar después de que el paquete aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

---

#### 33. Handoff a FOGO-AUTH-008..016

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-008` | Cualquier supervisor con lectura o acción multiárea deberá recibir autoridad explícita; la restricción ordinaria de insumos no se amplía por supervisión implícita. |
| `FOGO-AUTH-009..016` | Una acción productiva posterior no queda autorizada por haber podido consultar o consumir insumos; cada mutación revalida su permiso, estado, actor, territorio y recurso. |

La visibilidad o consumo de materiales no sustituye autorización para iniciar, avanzar, finalizar, corregir, anular, liberar o cerrar producción.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea especializa obligaciones vigentes de autorización territorial, receta/version, ejecución productiva, inventario reconciliable, unidad/conversión, trazabilidad de lotes, idempotencia e integración FOGO/NEXO. Define alcance y ownership de materialización sin introducir una obligación verificable independiente fuera de esa cobertura.

---

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-AUTH-008` para exigir contexto laboral y territorial aplicable;
- `TREQ-AUTH-009` para resolver sede/área de forma determinista y denegar cruces;
- `TREQ-AUTH-013` para impedir bypass de autorización y exigir decisión server-side;
- `TREQ-AUTH-014` y `TREQ-AUTH-015` para frescura, convergencia y trazabilidad;
- `TREQ-FOGO-001` para ciclo productivo, consumo y efectos de inventario auditables;
- `TREQ-FOGO-002` para receta/version exacta, ingredientes, unidades y desviaciones;
- `TREQ-FOGO-003` para planificación con sede, área, receta, cantidades y restricciones materiales;
- `TREQ-FOGO-004` para ejecución con orden, lote, receta, materiales, cantidades y conciliación;
- `TREQ-NEXO-010` para unidades, conversiones, disponibilidad y política equivalentes;
- `TREQ-NEXO-011` para movimientos/proyecciones reconciliables, atomicidad, idempotencia y concurrencia;
- `TREQ-NEXO-012` para lote, condición, vencimiento, ubicación y trazabilidad;
- `TREQ-INTEGRATION-003` para idempotencia, reintentos y resultado recuperable;
- `TREQ-INTEGRATION-006` para propiedad de datos y ausencia de fuentes competidoras.

Esta trazabilidad no modifica 04A.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@ff465b3d132e8a3115d1d6497394d3834b4ed325`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, `vento-nexo/main@f0a12557a1a258c84b025933653dc756de4b5a59`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, las tres matrices productivas, contratos de recurso NEXO, normalización de retiro y el AS-IS de FOGO/NEXO. `FOGO-AUTH-006` se consume como dependencia completa aprobada en trabajo adelantado; su cierre canónico se valida antes de iniciar esta tarea en el repositorio. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron retiros, reservas, consumos, lotes, LPN, stock real ni pruebas operativas de las tres áreas. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-007::<implementation_unit_id>`. |

---

#### 37. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] no se crea un rol `produccion_insumos`;
- [ ] no se crea una cuarta área productiva de insumos;
- [ ] FOGO conserva ownership de ejecución y NEXO de inventario;
- [ ] las tres áreas productivas reutilizan exactamente las once capacidades NEXO ya asignadas;
- [ ] `nexo.access` no funciona como wildcard;
- [ ] catálogo, ubicaciones, LPN, stock, lotes y retiros quedan minimizados al recurso productivo autorizado;
- [ ] el consumo exige `nexo.inventory.withdrawals.register`, turno/check-in cuando aplican y área efectiva;
- [ ] el consumo mantiene relación verificable con orden o lote, receta/version e insumo;
- [ ] disponibilidad, reserva y consumo permanecen hechos distintos;
- [ ] receta visible no concede autoridad de inventario;
- [ ] no se concede bodega general;
- [ ] no se conceden ajustes, entradas, traslados, conteos o remisiones;
- [ ] no se conceden compras o recepciones ORIGO;
- [ ] unidades y conversiones son canónicas y reconciliables;
- [ ] lote/LPN/condición/vencimiento se validan cuando aplican;
- [ ] idempotencia y concurrencia impiden doble consumo y stock negativo no autorizado;
- [ ] los dispositivos solo restringen;
- [ ] el código legacy de retiro no redefine el permiso canónico;
- [ ] el AS-IS de FOGO se reconoce como integración material parcial;
- [ ] el AS-IS de NEXO se reconoce como retiro genérico insuficiente para demostrar consumo productivo completo;
- [ ] los hallazgos tienen owner y condición de salida;
- [ ] cualquier cambio Supabase pertenece a `vento-shell`;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 38. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo` o `vento-nexo`;
- modifica datos;
- crea o modifica migraciones;
- modifica RLS, RPC, grants, triggers o proyecciones de inventario;
- crea permisos nuevos;
- crea roles nuevos;
- redefine matrices RBAC;
- redefine el lifecycle de bodega;
- concede remisiones;
- concede compras;
- define autoridad de supervisor;
- redefine el contrato completo de reserva de `INT-PROD-001`;
- redefine el contrato completo de consumo de `INT-PROD-002`;
- define permisos de inicio, parcial, finalización, corrección, anulación, calidad o cierre;
- ejecuta E5;
- crea o autoriza una instancia física;
- reasigna packages;
- modifica el Registro 04A.

---

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-006 — Restringir Cocina`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-007 — Restringir Insumos`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-008 — Definir permisos de supervisor`

### ✅ FOGO-AUTH-008 — Definir permisos de supervisor

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-007 — Restringir Insumos
**Tarea siguiente:** FOGO-AUTH-009 — Proteger inicio de producción
**Tipo de tarea:** documental; definición `DEFINE_ONCE` de autoridad de supervisión FOGO, separación entre carril base `supervisor` y carril operativo `gerencia_operativa`, lectura multiárea explícita y fronteras de mutación, sin instancia física propia
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, permisos, datasets, contratos publicados, Supabase, RLS, RPC, migraciones, datos, dispositivos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma inequívoca qué significa **supervisar FOGO** sin inventar un cuarto rol productivo, sin convertir el título `supervisor` en wildcard y sin mezclar los dos carriles canónicos de autorización.

La regla raíz es:

```text
SUPERVISIÓN FOGO
=
AUTORIDAD BASE COMPLETA DEL ROL supervisor
O
AUTORIDAD OPERATIVA COMPLETA DEL ROL gerencia_operativa
```

Los dos carriles son independientes. Un mismo trabajador puede satisfacer ambos en momentos distintos o simultáneamente cuando sus contratos lo permitan, pero ningún fragmento incompleto de un carril puede reparar, ampliar o completar el otro.

Esta tarea cierra la frontera reservada por `FOGO-AUTH-002..007`: la lectura multiárea de supervisión existe únicamente cuando deriva de cobertura administrativa o contexto operativo explícitos y nunca por compartir sede, usar una estación, seleccionar un área en interfaz, tener antigüedad o portar un nombre de rol.

---

#### 2. Decisión principal

FOGO conserva dos formas canónicas y separadas de supervisión:

| Carril | Identidad canónica | Naturaleza | Territorio | Vigencia |
| --- | --- | --- | --- | --- |
| Base administrativo | `supervisor` | seguimiento y supervisión local mediante permisos base explícitos | cobertura administrativa activa `AS/AA` del actor | mientras rol, concesión y cobertura base permanezcan vigentes |
| Operativo de coordinación | `gerencia_operativa` | coordinación directa de la jornada mediante permisos operativos explícitos | sede operativa activa y recursos/áreas relacionados con la jornada | únicamente durante contexto operativo válido |

No se admite:

```text
supervisor = gerencia_operativa
supervisor = productor
supervisor = todas las areas del Centro de Produccion
supervisor = todas las sedes
supervisor = todas las capacidades FOGO
gerencia_operativa = supervisor base
gerencia_operativa = creador de lotes
gerencia_operativa = administrador de recetas
lectura multiárea = permiso de mutación
```

Un trabajador con rol base `supervisor` puede asumir `gerencia_operativa` cuando exista un contexto operativo válido, pero los grants, alcances, prerrequisitos, razones y auditorías de cada carril se resuelven de forma independiente.

---

#### 3. Handoff recibido de FOGO-AUTH-002..007

Esta definición consume sin reinterpretación las siguientes fronteras ya aprobadas:

1. solo existen tres roles productivos ordinarios: `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`;
2. los tres roles productivos permanecen restringidos a sus áreas exactas y no adquieren autoridad de supervisor;
3. `FOGO-AUTH-003` reserva cualquier lectura multiárea a un contrato explícito de supervisión;
4. `FOGO-AUTH-004`, `FOGO-AUTH-005` y `FOGO-AUTH-006` prohíben inferir supervisión desde Panadería, Repostería o Cocina Caliente;
5. `FOGO-AUTH-007` conserva insumos, stock, LPN, ubicaciones y retiros dentro del área, orden, lote y receta autorizados y no convierte supervisión en autoridad de bodega;
6. compartir Centro de Producción, dispositivo, aplicación o contexto visual no fusiona territorios productivos.

Esta tarea no reabre esas decisiones; define únicamente el carril que puede observar más de un área cuando exista autoridad explícita para hacerlo.

---

#### 4. Universo FOGO evaluado

El catálogo vigente contiene exactamente seis permisos FOGO relevantes para esta tarea:

| Permiso | Modalidad canónica | Recurso / frontera |
| --- | --- | --- |
| `fogo.access` | `BASE_OR_OPERATIONAL` | `APP_SURFACE`; entrada a FOGO, sin recursos internos por implicación |
| `fogo.production.batches.view` | `BASE_OR_OPERATIONAL` | `PRODUCTION_BATCH`; territorio real `SITE_AREA` |
| `fogo.production.batches.create` | `OPERATIONAL_ONLY` | `PRODUCTION_BATCH`; destino productivo exacto `SITE_AREA_DRAFT` |
| `fogo.production.orders.view` | `BASE_OR_OPERATIONAL` | `PRODUCTION_ORDER`; relación entre sede solicitante, sede productiva y áreas relacionadas |
| `fogo.production.recipe_book.view` | `OPERATIONAL_ONLY` | `RECIPE_PUBLICATION`; publicación aplicable al contexto productivo |
| `fogo.production.recipes.view` | `BASE_ONLY` | `RECIPE_DEFINITION`; catálogo organizacional sensible |

La tarea no crea aliases, wildcards ni permisos nuevos.

---

#### 5. Matriz FOGO del carril base supervisor

La matriz base aprobada para `supervisor` se conserva exactamente:

| Permiso | Decisión desde `supervisor` | Alcance / condición |
| --- | --- | --- |
| `fogo.access` | **ASIGNAR** | `NT-APP`; permite entrar a FOGO, no amplía territorio ni concede capacidades internas |
| `fogo.production.batches.view` | **ASIGNAR** | `AS/AA`; lotes cuya sede o área pertenece a la cobertura administrativa activa del supervisor |
| `fogo.production.batches.create` | **NO ASIGNAR** | capacidad `OPERATIONAL_ONLY`; supervisar no permite crear lotes |
| `fogo.production.orders.view` | **ASIGNAR** | `AS/AA`; órdenes cuya relación territorial pertenece a la cobertura administrativa activa |
| `fogo.production.recipe_book.view` | **NO ASIGNAR** | capacidad `OPERATIONAL_ONLY`; el carril base no la satisface |
| `fogo.production.recipes.view` | **NO ASIGNAR** | receta maestra sensible; la matriz base del supervisor no la concede |

Resultado del carril base FOGO:

```text
3 CONCESIONES
3 AUSENCIAS DE CONCESION
0 MUTACIONES PRODUCTIVAS CONCEDIDAS
```

La cobertura `AS/AA` puede contener más de una sede o más de un área cuando esas asignaciones existan realmente. Esa unión sigue siendo cobertura administrativa explícita y no alcance global.

---

#### 6. Matriz FOGO del carril operativo gerencia_operativa

La matriz operativa aprobada para `gerencia_operativa` se conserva exactamente:

| Permiso | Decisión desde `gerencia_operativa` | Alcance / condición |
| --- | --- | --- |
| `fogo.access` | **ASIGNAR OPERATIVO** | `CTX-MGR-FOGO-APP`; entrada a FOGO durante el turno de coordinación |
| `fogo.production.batches.view` | **ASIGNAR OPERATIVO** | `CTX-MGR-PRODUCTION-STATUS`; lotes relacionados con la sede activa, áreas operativas o abastecimientos que afectan la jornada |
| `fogo.production.batches.create` | **NO ASIGNAR** | la creación corresponde al rol productivo responsable; coordinación no sustituye producción |
| `fogo.production.orders.view` | **ASIGNAR OPERATIVO** | `CTX-MGR-PRODUCTION-STATUS`; órdenes relacionadas con la jornada coordinada |
| `fogo.production.recipe_book.view` | **ASIGNAR OPERATIVO** | `CTX-MGR-PRODUCTION-RECIPE`; recetario operativo mínimo necesario para verificar ejecución, rendimiento o incidencias activas |
| `fogo.production.recipes.view` | **NO ASIGNAR** | capacidad `BASE_ONLY`; el carril operativo no concede el maestro de recetas |

Resultado del carril operativo FOGO:

```text
4 CONCESIONES OPERATIVAS
2 AUSENCIAS DE CONCESION
0 AUTORIDAD PARA CREAR LOTES
0 AUTORIDAD PARA ADMINISTRAR EL MAESTRO DE RECETAS
```

La visibilidad operativa se limita a coordinación de la jornada. No equivale a todas las áreas de una sede ni a todas las sedes de la organización.

---

#### 7. Composición obligatoria entre carriles

Para permisos `BASE_OR_OPERATIONAL`, la decisión se calcula por carril completo:

```text
ALLOW_FINAL
=
ALLOW_BASE_COMPLETO
OR
ALLOW_OPERATIVO_COMPLETO
```

Está prohibido construir una autorización híbrida como:

```text
permiso del carril base
+
territorio del carril operativo
+
turno de otra sesión
=
ALLOW
```

Cuando ambos carriles autorizan lecturas distintas, el conjunto efectivo puede ser la unión de **recursos autorizados de forma completa por cada carril**, nunca una combinación cartesiana de territorios, roles o contextos.

Ejemplo permitido:

```text
lote A autorizado por cobertura base AS/AA
UNION
lote B autorizado por CTX-MGR-PRODUCTION-STATUS
```

Ejemplo prohibido:

```text
sede autorizada solo por carril base
+
area autorizada solo por carril operativo
=
lote C autorizado
```

Una denegación, bloqueo estructural, recurso fuera de territorio o contexto inválido conserva la precedencia transversal que le corresponda y no se repara por el otro carril salvo que ese otro carril produzca de forma independiente una autorización completa para el mismo recurso y permiso.

---

#### 8. Lectura multiárea del supervisor base

El rol base `supervisor` puede consultar lotes y órdenes de más de un área únicamente cuando cada recurso pertenece a su cobertura administrativa activa.

La resolución debe usar:

- asignaciones administrativas canónicas de sede y área;
- territorio persistido o relación territorial real del recurso;
- permiso exacto;
- estado y restricciones del recurso cuando apliquen;
- denegaciones y límites estructurales vigentes.

No se usa como autoridad:

- sede seleccionada en UI;
- área seleccionada en UI;
- sede primaria del empleado como sustituto de asignaciones;
- pertenecer al Centro de Producción;
- texto, slug, nombre de producto o categoría;
- uso habitual de una estación;
- título laboral distinto de la concesión canónica.

Una cobertura con varias sedes se interpreta como unión de sedes expresamente asignadas, nunca como `G` ni como incorporación automática de sedes futuras.

---

#### 9. Lectura multiárea de gerencia_operativa

`gerencia_operativa` puede observar producción de más de un área durante la jornada solo cuando los recursos están vinculados con la sede operativa activa y con la coordinación real del turno.

`CTX-MGR-PRODUCTION-STATUS` autoriza seguimiento de órdenes y lotes relacionados con:

- la sede activa;
- sus áreas operativas relevantes para la jornada;
- abastecimientos o incidencias que afecten la coordinación actual.

No autoriza:

- otra sede no relacionada con el turno;
- un lote sin relación territorial demostrable;
- una receta administrativa;
- una orden histórica ajena a la coordinación;
- mutar el recurso por haberlo visto.

La sede activa es un límite superior operativo, no un wildcard que convierta todas sus áreas y recursos en autorizados automáticamente.

---

#### 10. Recetario operativo bajo supervisión

El permiso `fogo.production.recipe_book.view` es `OPERATIONAL_ONLY`.

Por tanto:

- `supervisor` base por sí solo **no** obtiene el recetario operativo;
- un trabajador que además satisfaga `gerencia_operativa` puede obtenerlo por el carril operativo;
- la publicación debe estar vigente y ser aplicable al producto, proceso y contexto coordinado;
- el conjunto se limita al recetario necesario para verificar ejecución, rendimiento o incidencias activas;
- no incluye borradores, definiciones maestras, edición, publicación, exportación masiva ni fórmulas de otro dominio;
- `fogo.production.recipes.view` continúa fuera de esta supervisión.

Supervisar una orden no transforma la definición maestra de su receta en información automáticamente autorizada.

---

#### 11. Frontera entre supervisar y producir

La supervisión definida aquí no concede ninguna mutación productiva.

En particular:

```text
VER LOTE != CREAR LOTE
VER ORDEN != INICIAR PRODUCCION
VER RECETARIO OPERATIVO != MODIFICAR RECETA
COORDINAR PRIORIDAD != REESCRIBIR PRIORIDAD
OBSERVAR DESVIACION != CORREGIR O ANULAR
```

`fogo.production.batches.create` permanece sin concesión tanto para `supervisor` base como para `gerencia_operativa`.

Si el mismo trabajador posee además un rol productivo ordinario válido, una eventual creación de lote se evaluará exclusivamente por ese carril productivo completo y por la acción propietaria correspondiente. La supervisión no aporta fragmentos para completar esa autorización.

---

#### 12. Prioridades, urgencias y overrides

La planificación productiva conserva prioridad, aprobaciones y overrides como decisiones auditables, pero el catálogo FOGO evaluado en esta tarea no contiene una mutación atómica que autorice por sí sola a un supervisor a cambiar esos valores.

Por ello:

1. `FOGO-AUTH-008` define quién puede **supervisar y coordinar** la información visible;
2. no se inventa un permiso de override;
3. una futura acción de corrección, anulación, repriorización o excepción debe usar el permiso exacto que su contrato propietario establezca;
4. hasta que exista esa autoridad exacta, la lectura o coordinación no autoriza la mutación;
5. los cambios de prioridad o excepción deberán conservar actor, motivo, antes/después, recurso, territorio y evidencia.

La materialización de correcciones y anulaciones permanece en `FOGO-AUTH-012`; la experiencia de planificación y coordinación permanece en las tareas FOGO-UX propietarias de esa superficie.

---

#### 13. Relación con los tres roles productivos

Los roles productivos ordinarios no heredan supervisión:

| Rol productivo | Área ordinaria | Autoridad multiárea por este rol |
| --- | --- | --- |
| `produccion_cocina` | Cocina Caliente | ninguna |
| `produccion_panaderia` | Galletería y Panadería | ninguna |
| `produccion_reposteria` | Repostería | ninguna |

Un productor con antigüedad, responsabilidad informal o uso de una terminal compartida no se convierte en supervisor.

Del mismo modo, un supervisor no se convierte en productor. Cada acción productiva posterior deberá demostrar el rol/carril operativo que realmente la autoriza.

---

#### 14. Relación con insumos e inventario

La visibilidad multiárea de producción no abre inventario general.

Cuando un recurso visible incluya información de insumos, el conjunto continúa sujeto a las fronteras aprobadas en `FOGO-AUTH-007`:

- producto o ingrediente relacionado con una receta aplicable;
- orden o lote productivo relacionado;
- ubicación, stock, LPN o retiro que conserve territorio real;
- permiso NEXO exacto cuando la información pertenezca a NEXO;
- ninguna autoridad implícita de bodega, ajuste, entrada, traslado, conteo, remisión o compra.

Ver varias áreas productivas no convierte al supervisor en `bodeguero` ni amplía el catálogo de movimientos permitido.

---

#### 15. Dispositivos compartidos

La plantilla `operations_management_terminal` puede alojar SHELL, FOGO, NEXO, ORIGO y PULSO para una sesión operacional de `gerencia_operativa`, con sede operativa activa y área exacta cuando el permiso la exija.

En FOGO esa plantilla admite como techo de superficie:

- `fogo.access`;
- `fogo.production.batches.view`;
- `fogo.production.orders.view`;
- `fogo.production.recipe_book.view`.

No admite por esta función:

- `fogo.production.batches.create`;
- `fogo.production.recipes.view`.

El dispositivo solo restringe. Nunca crea rol, permiso, cobertura base, sede, área ni autoridad multiárea.

---

#### 16. Parámetros de interfaz y filtros

Los parámetros `site_id`, `area_id`, filtros de estado, producto, receta, prioridad o búsqueda únicamente pueden reducir un conjunto ya autorizado.

No pueden:

- seleccionar una sede no cubierta por `supervisor`;
- crear un área de coordinación para `gerencia_operativa`;
- ampliar una consulta de lotes u órdenes;
- activar recetario operativo;
- convertir una vista autorizada en permiso de mutación.

La resolución territorial ocurre antes de serializar datos al cliente. Las filas protegidas no deben viajar al navegador para ser ocultadas posteriormente.

---

#### 17. Frescura y cambio de contexto

Toda decisión de supervisión debe invalidarse y resolverse nuevamente cuando cambie cualquiera de los elementos que gobierna su carril, entre ellos:

- rol base o concesión base;
- cobertura administrativa de sedes o áreas;
- rol operativo efectivo;
- turno publicado y vigente;
- check-in cuando corresponda;
- sede o área operativa;
- permiso;
- estado o territorio del recurso;
- límites del dispositivo compartido;
- revocaciones o denegaciones aplicables.

Una fila visible bajo un contexto anterior no conserva autoridad para una acción posterior.

---

#### 18. Estado AS-IS observado en vento-fogo

La implementación vigente no demuestra todavía el contrato completo definido en esta tarea.

En `src/app/recipe-book/page.tsx` se observa que:

- la clasificación local `isManagement` reconoce `propietario`, `gerente_general` y `gerente`;
- no expresa de forma equivalente los carriles canónicos `supervisor` base y `gerencia_operativa`;
- el chequeo observado de `production.recipe_book.view` usa sede, pero deja `areaId` sin resolver en la llamada mostrada;
- la selección de área se habilita mediante la heurística local de management;
- para actores fuera de esa heurística, la presentación puede operar a nivel de sede;
- el chequeo observado de `production.batches.create` también deja `areaId` sin resolver en la llamada mostrada.

En la vista histórica de lotes ya auditada, la consulta observada utiliza un filtro opcional de sede y no demuestra por sí sola resolución completa de área para supervisión.

Estas observaciones son brechas de adopción, no una redefinición del contrato canónico.

---

#### 19. Propiedad de las brechas AS-IS

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| La heurística local de management del recetario no representa por sí sola `supervisor` base ni `gerencia_operativa`. | Puede divergir del evaluador canónico y de las matrices vigentes. | `FOGO-AUTH-015` | El consumidor usa contratos compartidos de rol/contexto/permisos y deja de convertir listas locales de roles en autoridad final. |
| `production.recipe_book.view` se evalúa en la llamada observada sin `areaId` resuelta. | No demuestra aplicabilidad territorial completa del recetario operativo. | materializaciones aplicables de `FOGO-AUTH-003..007` y adopción de `FOGO-AUTH-015` | La consulta deriva contexto efectivo y recurso aplicable en servidor antes de serializar. |
| La selección de área del recetario depende de una heurística visual de management. | Un filtro visual puede divergir de la cobertura base o del contexto operativo real. | `FOGO-AUTH-015` y tareas FOGO-UX propietarias | La UI consume el conjunto ya autorizado y la selección solo lo refina. |
| La vista histórica de lotes no demuestra el contrato multiárea completo. | No puede tomarse como prueba de cobertura de supervisor. | materializaciones territoriales aplicables y `FOGO-AUTH-016` | Pruebas integrales demuestran recursos permitidos y denegados para ambos carriles. |
| No existe un permiso FOGO de override de prioridad dentro de las seis claves evaluadas. | La coordinación no puede reinterpretarse como mutación. | `FOGO-AUTH-012` y superficie UX propietaria | La acción futura usa permiso exacto, actor, motivo, territorio, estado y auditoría; hasta entonces falla cerrado. |

No se crea una instancia física de `FOGO-AUTH-008`; sus consumidores materializan estas decisiones dentro de sus tareas propietarias.

---

#### 20. Topología y materialización

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. este marcador se desarrolla y aprueba una sola vez;
2. no existe identidad de instancia física propia para esta tarea;
3. no se autoriza código, migración, dataset, despliegue ni modificación remota desde `FOGO-AUTH-008`;
4. `FOGO-AUTH-009..016` y las unidades de implementación aplicables consumen este contrato sin reabrirlo;
5. cualquier cambio futuro de Supabase perteneciente a VENTO se versionará y ejecutará desde `vento-shell` bajo la tarea física propietaria correspondiente.

---

#### 21. Handoff a FOGO-AUTH-009..016

| Tarea | Entrada exacta proveniente de esta definición |
| --- | --- |
| `FOGO-AUTH-009` | iniciar producción o crear lote no se deriva de supervisión; exige capacidad de mutación exacta y carril productivo válido |
| `FOGO-AUTH-010` | registrar producción parcial exige revalidación de actor, turno, área, lote, estado y permiso; haber visto el lote no basta |
| `FOGO-AUTH-011` | finalizar producción requiere autoridad propia y no se hereda de lectura administrativa u operativa |
| `FOGO-AUTH-012` | correcciones, anulaciones, repriorizaciones u overrides deben usar acción y permiso exactos; supervisión no funciona como bypass |
| `FOGO-AUTH-013` | lotes y recetas conservan separación entre lectura, creación, recetario operativo y definición maestra sensible |
| `FOGO-AUTH-014` | toda acción supervisada o productiva registra actor y contexto efectivo sin atribuir autoridad por nombre de rol |
| `FOGO-AUTH-015` | los consumidores migran a contratos compartidos conservando la separación `supervisor` / `gerencia_operativa` y eliminando heurísticas locales ampliatorias |
| `FOGO-AUTH-016` | las pruebas integrales demuestran ambos carriles, lectura multiárea autorizada, denegación cruzada, frescura y ausencia de escalamiento por dispositivo o vista |

---

#### 22. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la separación entre rol base, rol operativo, territorio, permisos exactos, segregación de funciones, planificación productiva, frescura y auditoría ya está cubierta por requisitos vigentes. Esta tarea especializa la aplicación de esas obligaciones a la supervisión FOGO sin introducir una obligación verificable nueva fuera de la cobertura existente.

---

#### 23. Cobertura de prueba vigente reutilizada

Esta tarea consume como trazabilidad, sin modificar texto, estado, relación, secuencia ni propietario, al menos:

- `TREQ-AUTH-001` — autorización final por permisos, contexto y alcance; no por nombre de rol;
- `TREQ-AUTH-004` — equivalencia de decisión entre evaluadores para el mismo actor, permiso, sede, área y contexto;
- `TREQ-AUTH-008` — separación entre carril base y carril operativo con prerrequisitos propios;
- `TREQ-AUTH-009` — resolución determinista de sede y área y denegación de cruces territoriales;
- `TREQ-AUTH-010` — segregación de funciones entre producción, inventario, logística y administración;
- `TREQ-AUTH-014` — frescura de contexto y decisión antes de efectos sensibles;
- `TREQ-AUTH-015` — trazabilidad y evidencia de decisiones de autorización;
- `TREQ-FOGO-003` — planificación productiva con sede, área, prioridad, aprobaciones y overrides auditables;
- `TREQ-SHELL-040` — catálogo exacto de roles base, incluido `supervisor`;
- `TREQ-SHELL-041` — catálogo exacto de roles operativos, incluido `gerencia_operativa`;
- `TREQ-SHELL-042` — scopes admitidos y límites territoriales sin wildcard implícito;
- `TREQ-SHELL-043` — tipos compartidos de contexto sin bypass ni autoridad derivada de strings locales.

La enumeración anterior es cobertura reutilizada y no constituye una modificación del Registro 04A.

---

#### 24. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@edad8f4ad23ddffc0e14dfd6e2663f21ba92e62c`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, la topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, matrices canónicas de `supervisor` y `gerencia_operativa`, modalidades, scopes, prerrequisitos, contratos de recurso y el AS-IS del recetario FOGO. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron sesiones reales de supervisor, `gerencia_operativa`, turnos, check-ins, áreas, lotes, órdenes, dispositivos ni pruebas adversariales multiárea. |
| FÍSICA | NOT_APPLICABLE | `FOGO-AUTH-008` no crea instancia física propia ni autoriza materialización. |

---

#### 25. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `supervisor` y `gerencia_operativa` permanecen como identidades distintas;
- [ ] un mismo trabajador puede satisfacer ambos carriles sin fusionarlos;
- [ ] `fogo.access` no funciona como wildcard;
- [ ] el supervisor base conserva exactamente tres concesiones FOGO y tres ausencias de concesión;
- [ ] `gerencia_operativa` conserva exactamente cuatro concesiones FOGO y dos ausencias de concesión;
- [ ] `fogo.production.batches.create` no se concede por supervisión;
- [ ] `fogo.production.recipes.view` no se concede por supervisión;
- [ ] el recetario operativo solo puede venir del carril operativo válido;
- [ ] cobertura administrativa multiárea usa asignaciones reales `AS/AA`, no UI ni sede primaria inferida;
- [ ] coordinación operativa multiárea se limita a la sede y jornada relacionadas;
- [ ] una sede activa no se convierte en wildcard de todas sus áreas y recursos;
- [ ] cada recurso debe ser autorizado completamente por al menos un carril;
- [ ] no se mezclan permiso, territorio o contexto de carriles distintos para fabricar un `ALLOW`;
- [ ] productores ordinarios no heredan supervisión;
- [ ] supervisores no heredan ejecución productiva;
- [ ] lectura de lotes u órdenes no autoriza inicio, parcial, cierre, corrección, anulación ni override;
- [ ] la supervisión de insumos no abre inventario general ni autoridad de bodega;
- [ ] `operations_management_terminal` solo restringe y no otorga autoridad;
- [ ] filtros de cliente únicamente reducen conjuntos ya autorizados;
- [ ] cambios de rol, cobertura, turno, check-in, sede, área, permiso, recurso o dispositivo invalidan decisiones previas;
- [ ] el AS-IS de recetario queda clasificado como adopción pendiente y no como cumplimiento;
- [ ] las brechas físicas tienen propietario y condición de salida;
- [ ] la topología queda `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 26. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- modifica `vento-shell` fuera del documento propietario;
- crea permisos nuevos;
- modifica matrices RBAC aprobadas;
- crea o cambia roles;
- crea una jerarquía automática entre `supervisor` y `gerencia_operativa`;
- concede `fogo.production.batches.create`;
- concede `fogo.production.recipes.view`;
- define la UX final del supervisor;
- modifica prioridades, órdenes, lotes, recetas, consumos o stock;
- define inicio, producción parcial, finalización, corrección, anulación, cierre o calidad;
- crea o modifica migraciones, RLS, RPC, grants o datos;
- cambia contratos de dispositivo;
- ejecuta E5;
- crea o autoriza una instancia física;
- modifica el Registro 04A.

---

#### 27. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-007 — Restringir Insumos`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-008 — Definir permisos de supervisor`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-009 — Proteger inicio de producción`

### ✅ FOGO-AUTH-009 — Proteger inicio de producción

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-008 — Definir permisos de supervisor
**Tarea siguiente:** FOGO-AUTH-010 — Proteger producción parcial
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — protección server-side del inicio productivo de `VPROC-0034`, creación o apertura del lote ejecutable y transición autorizada hacia `IN_PRODUCTION`, con permiso exacto, contexto efectivo, orden, receta/version, materiales preparados, idempotencia y auditoría
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-009::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la frontera de autorización del **inicio de producción** en FOGO de forma que una pantalla visible, una receta consultable, una orden visible, una firma de dispositivo o una llamada técnica no puedan iniciar por sí solas una ejecución productiva.

La regla raíz queda:

```text
ORDEN PRODUCTIVA AUTORIZADA
+
RECETA / VERSION PUBLICADA Y APLICABLE
+
ACTOR Y CONTEXTO OPERATIVO VALIDOS
+
SEDE Y AREA EXACTAS
+
PERMISO fogo.production.batches.create
+
MATERIALES Y RECURSOS PREPARADOS CUANDO CORRESPONDA
+
ESTADO DE ORIGEN VALIDO
+
IDENTIDAD IDEMPOTENTE DE LA ACCION
=
INICIO PRODUCTIVO AUTORIZABLE
```

Ningún elemento aislado sustituye el conjunto completo.

---

#### 2. Handoff recibido de FOGO-AUTH-001..008

Esta tarea consume sin reinterpretación las fronteras ya aprobadas:

1. `FOGO-AUTH-001` inventarió `VSCREEN-0057 — Preparación e inicio de lote`, `VPROC-0034::STEP-PREPARE_AND_START_BATCH` y la acción AS-IS `FOGO-ACTION-ASIS-003 / createBatch`;
2. `FOGO-AUTH-002` asignó `fogo.production.batches.create` únicamente al carril operativo de `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`, cada uno en su territorio exacto;
3. `FOGO-AUTH-003` estableció que visibilidad en la cola no equivale a autoridad de mutación;
4. `FOGO-AUTH-004`, `FOGO-AUTH-005` y `FOGO-AUTH-006` aislaron Panadería, Repostería y Cocina Caliente y prohibieron iniciar trabajo cruzando áreas;
5. `FOGO-AUTH-007` separó reserva, disponibilidad y consumo de insumos de la autoridad de iniciar producción;
6. `FOGO-AUTH-008` estableció que `supervisor` y `gerencia_operativa` no reciben `fogo.production.batches.create` por supervisión y que leer lotes u órdenes no habilita producción.

Por tanto, `FOGO-AUTH-009` no crea roles, áreas, permisos ni autoridad de supervisión. Protege la mutación de inicio y su transición empresarial.

---

#### 3. Identidad canónica de la superficie protegida

| Dimensión | Identidad canónica |
| --- | --- |
| Aplicación | `fogo` |
| Pantalla | `VSCREEN-0057 — Preparación e inicio de lote` |
| Acción primaria | `VSCREEN-0057::PRIMARY` |
| Proceso | `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada` |
| Paso | `VPROC-0034::STEP-PREPARE_AND_START_BATCH — Preparar e iniciar lote` |
| Permiso de mutación | `fogo.production.batches.create` |
| Recurso | `PRODUCTION_BATCH` |
| Territorio de recurso | `SITE_AREA_DRAFT` |
| Modalidad | `OPERATIONAL_ONLY` |
| Alcance de escritura | `SITE-WRITE` |
| Prerrequisito operativo | `T+C` |

`VSCREEN-0057` es una superficie de ejecución. Su existencia no crea autoridad y sus parámetros no son fuente de verdad del permiso, territorio, orden, receta, versión ni estado.

---

#### 4. Actores ordinarios autorizables

La capacidad ordinaria `fogo.production.batches.create` permanece asignada únicamente a los tres perfiles productivos definidos en `FOGO-AUTH-002`:

| Rol operativo efectivo | Sede | Área productiva exacta | Resultado para inicio |
| --- | --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente | autorizable solo dentro de este territorio |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería | autorizable solo dentro de este territorio |
| `produccion_reposteria` | Centro de Producción | Repostería | autorizable solo dentro de este territorio |

No son fuentes de autoridad para esta mutación:

- el rol base `supervisor`;
- el rol operativo `gerencia_operativa`;
- `bodeguero` por custodiar insumos;
- una plantilla de dispositivo;
- una selección de sede o área en interfaz;
- el creador previo de una receta, orden o lote;
- la mera visibilidad de `VSCREEN-0057`.

Una ampliación futura de actores requiere contrato canónico propio; esta tarea no la infiere.

---

#### 5. Significado exacto de “inicio”

`VPROC-0034` distingue preparación de ejecución real.

La progresión relevante es:

```text
VPROC-0034.PRODUCTION_ORDER_READY
        ↓
VPROC-0034.MATERIALS_RESERVING
        ↓
VPROC-0034.MATERIALS_READY
        ↓
VPROC-0034.IN_PRODUCTION
```

Interpretación obligatoria:

| Estado | Verdad mínima | No significa |
| --- | --- | --- |
| `PRODUCTION_ORDER_READY` | existe una orden autorizada con producto, cantidad, receta o versión, sede, área y fecha requerida | que la preparación o producción hayan comenzado |
| `MATERIALS_RESERVING` | FOGO inició verificación y obtención de materiales | que exista reserva completa o que pueda producirse |
| `MATERIALS_READY` | materiales y demás recursos requeridos están preparados y validados | que la producción ya haya comenzado |
| `IN_PRODUCTION` | comienza la ejecución de pasos y pueden capturarse consumos, tiempos y desviaciones | que exista producción parcial registrada, salida reportada, cierre o liberación de calidad |

Por tanto:

```text
MATERIALS_RESERVING != INICIO DE PRODUCCION
MATERIALS_READY != INICIO DE PRODUCCION
MATERIALS_READY -> IN_PRODUCTION = TRANSICION DE INICIO PRODUCTIVO
```

La preparación y creación de una identidad de lote ejecutable pueden ocurrir antes del inicio real, pero no autorizan saltar los estados ni anticipar efectos posteriores.

---

#### 6. Condiciones mínimas antes de preparar o abrir el lote

Antes de crear o abrir la identidad ejecutable asociada con `VSCREEN-0057`, el servidor deberá poder resolver y validar de forma determinista:

1. principal autenticado;
2. actor efectivo;
3. turno publicado y vigente;
4. check-in activo cuando corresponda al permiso y superficie;
5. rol operativo efectivo compatible;
6. sede activa autorizada;
7. área productiva exacta autorizada;
8. permiso exacto `fogo.production.batches.create`;
9. orden productiva estable y versión vigente;
10. producto y cantidad autorizados por la orden;
11. versión exacta de receta publicada y aplicable;
12. territorio del borrador o lote compatible con la sede y área efectivas;
13. fecha, estado y restricciones empresariales compatibles;
14. identidad de correlación e idempotencia suficiente para impedir creación duplicada;
15. ausencia de una denegación prevalente o contradicción estructural.

La ausencia, ambigüedad o incompatibilidad de un dato requerido produce denegación cerrada.

---

#### 7. Condiciones adicionales para `MATERIALS_READY -> IN_PRODUCTION`

La transición que representa el inicio real exige revalidación completa inmediatamente antes del efecto.

Además de las condiciones anteriores, debe demostrarse:

1. la instancia correcta de `VPROC-0034` existe y sigue en `MATERIALS_READY`;
2. la orden y su versión continúan vigentes y autorizadas;
3. la receta/version continúa siendo la que gobierna esa ejecución;
4. los materiales requeridos y demás recursos aplicables están preparados y validados;
5. las reservas o excepciones de material necesarias son las vigentes y pertenecen a la ejecución correcta;
6. actor, turno, check-in, rol, sede y área no cambiaron desde la preparación;
7. el permiso exacto continúa permitido;
8. el recurso no fue iniciado, cancelado, sustituido o avanzado por otro actor de forma concurrente;
9. la identidad idempotente no corresponde a un payload incompatible;
10. el dispositivo, cuando aplique, continúa permitiendo la acción y el actor fue identificado de forma válida.

Una autorización obtenida al cargar la página no se reutiliza como autorización final de inicio.

---

#### 8. Regla server-side y punto de efecto

La autoridad debe comprobarse en el punto en que el sistema puede crear el lote ejecutable o cambiar el estado productivo.

No basta con:

```text
CHECK EN UI
CHECK AL ABRIR LA PAGINA
CHECK DE LECTURA DEL RECETARIO
CHECK DE FIRMA DE DISPOSITIVO
=
AUTORIZACION DE MUTACION
```

La Server Action, Route Handler, RPC, función SQL, RLS y cualquier otra frontera capaz de producir el efecto deben impedir que una llamada directa o manipulada salte:

- permiso exacto;
- actor efectivo;
- contexto operativo;
- sede y área;
- orden y versión;
- receta y versión;
- estado de origen;
- restricciones de recurso;
- controles de concurrencia e idempotencia.

Si una capa inferior puede ejecutarse directamente, esa capa debe validar el contrato aplicable o permanecer inaccesible a consumidores que no hayan sido autorizados por una frontera equivalente.

---

#### 9. Parámetros de cliente y datos no confiables

Los parámetros enviados por navegador o formulario son localizadores o propuestas de captura; no son autoridad.

En particular, no pueden autorizar por sí solos:

- `recipe_id`;
- cantidad solicitada o producida;
- `destination_location_id`;
- ingredientes;
- cantidades reales;
- paquetes;
- salidas o coproductos;
- notas;
- PIN del actor;
- sede;
- área;
- estado;
- ruta productiva;
- identificadores ocultos en inputs o query params.

El servidor resuelve nuevamente el recurso canónico y compara cada dato relevante con orden, receta/version, contexto y políticas vigentes antes del efecto.

---

#### 10. Orden productiva obligatoria

El proceso canónico `VPROC-0034` nace desde una orden autorizada.

Por tanto, iniciar producción exige una referencia empresarial verificable a:

```text
ORDEN PRODUCTIVA
+
VERSION VIGENTE DE LA ORDEN
+
PRODUCTO / CANTIDAD
+
RECETA O VERSION
+
SEDE / AREA
+
FECHA REQUERIDA
```

Una receta publicada por sí sola no crea una orden ni autoriza producción espontánea.

Una señal de demanda, pedido, mínimo, recomendación, remisión o prioridad tampoco crea por sí sola una ejecución aprobada.

Si la implementación transitoria aún permite crear lotes sin una orden canónica, esa capacidad se clasifica como adopción pendiente y no redefine el contrato objetivo.

---

#### 11. Receta y versión

La acción de inicio utiliza una publicación vigente y aplicable, pero no adquiere autoridad administrativa sobre definiciones maestras.

Reglas:

1. la receta debe estar publicada;
2. la versión utilizada debe quedar identificable de forma estable;
3. una versión retirada o incompatible no origina un nuevo inicio;
4. producto, sede, área y aplicabilidad deben corresponder con la orden y el contexto;
5. una lectura previa del recetario no garantiza que la publicación siga vigente al iniciar;
6. `fogo.production.recipe_book.view` no sustituye `fogo.production.batches.create`;
7. `fogo.production.recipes.view` no forma parte de esta mutación.

El inicio revalida la publicación aplicable inmediatamente antes de producir el efecto.

---

#### 12. Materiales y separación FOGO / NEXO

El inicio productivo conserva la frontera aprobada entre producción e inventario.

```text
FOGO
orden + receta/version + lote + ejecucion

NEXO
stock + reserva + retiro/consumo + movimiento + conciliacion
```

Reglas obligatorias:

1. `MATERIALS_RESERVING` no demuestra reserva física completa;
2. `MATERIALS_READY` requiere la evidencia productiva de que materiales y recursos aplicables están preparados y validados;
3. una reserva NEXO no inicia producción por sí sola;
4. el inicio FOGO no fabrica reserva ni disponibilidad inexistentes;
5. avanzar a `IN_PRODUCTION` habilita capturas posteriores, pero no equivale por sí mismo a un consumo NEXO ya conciliado;
6. esta tarea no redefine el ledger, retiro o consumo físico de NEXO;
7. `FOGO-AUTH-010` conserva la producción parcial y las capturas posteriores.

---

#### 13. Idempotencia y concurrencia

La creación o inicio debe soportar reintentos sin duplicar la ejecución empresarial.

Contrato mínimo:

```text
MISMA IDENTIDAD IDEMPOTENTE
+
MISMA OPERACION LOGICA
+
MISMO CONTENIDO RELEVANTE
=
MISMO RESULTADO EMPRESARIAL
```

Y:

```text
MISMA IDENTIDAD IDEMPOTENTE
+
CONTENIDO INCOMPATIBLE
=
CONFLICTO
```

Reglas:

1. un doble clic no crea dos lotes;
2. un retry por timeout o respuesta perdida no duplica inicio ni efectos correlacionados;
3. dos actores no pueden iniciar concurrentemente la misma ejecución desde el mismo estado de origen;
4. una transición basada en versión stale debe revalidarse;
5. si otro actor ya llevó el recurso a un estado incompatible, el intento posterior no retrocede ni reinicia silenciosamente;
6. el mecanismo concreto de lock, versión o compare-and-set pertenece a la materialización, pero el resultado observable debe satisfacer estas invariantes.

---

#### 14. Estado de origen y transiciones permitidas

Esta tarea protege únicamente la preparación e inicio.

Transiciones de interés:

```text
PRODUCTION_ORDER_READY -> MATERIALS_RESERVING
MATERIALS_RESERVING -> MATERIALS_READY
MATERIALS_READY -> IN_PRODUCTION
```

La autoridad para una transición no se hereda a las siguientes.

En particular:

- poder entrar en `MATERIALS_RESERVING` no autoriza `IN_PRODUCTION`;
- poder iniciar no autoriza registrar producción parcial;
- poder iniciar no autoriza finalizar;
- poder iniciar no autoriza corregir o anular;
- poder iniciar no autoriza editar recetas;
- poder iniciar no autoriza ajustar inventario general.

Los contratos posteriores permanecen propietarios de esas acciones.

---

#### 15. Dispositivo compartido

Cuando el inicio se ejecuta desde una estación compartida, la autoridad efectiva sigue siendo la intersección entre el actor real y el límite del dispositivo.

La firma de actor:

- identifica y atribuye al humano cuando el dispositivo la exige;
- usa la acción exacta `production.batches.create` en el runtime observado;
- no concede el permiso;
- no sustituye turno, check-in, sede, área, orden, receta/version o estado;
- no amplía el territorio permitido por el actor;
- debe quedar correlacionable con el recurso finalmente afectado.

Un dispositivo `production_kitchen`, `production_bakery` o `production_pastry` solo restringe; nunca autoriza por sí mismo.

---

#### 16. Auditoría mínima del inicio

El hecho de inicio debe poder reconstruirse sin depender de logs de interfaz.

La evidencia correlacionable incluye, según aplique:

- principal técnico;
- actor efectivo;
- rol base;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- dispositivo;
- permiso evaluado;
- orden y versión;
- receta y versión;
- lote o identidad de ejecución;
- estado anterior;
- estado posterior;
- decisión y razones;
- identidad de correlación e idempotencia;
- timestamp;
- resultado o error;
- indicador de si existieron efectos persistidos.

`FOGO-AUTH-014` permanece responsable de consolidar actor y turno como evidencia canónica transversal de las acciones productivas; esta tarea define qué debe conservar el inicio para poder cumplir ese handoff.

---

#### 17. Denegación, error y recuperación

Ante una denegación de autorización:

```text
EFECTOS PRODUCTIVOS = 0
```

No se crea un lote alternativo, no se avanza estado, no se consume inventario, no se publica salida y no se reintenta automáticamente la mutación con un permiso distinto.

Ante fallo técnico:

1. no se convierte el fallo en `ALLOW`;
2. el cliente no decide si el efecto ocurrió;
3. antes de repetir se recupera el resultado durable mediante la identidad de correlación/idempotencia;
4. un resultado desconocido no habilita crear una segunda ejecución para “asegurar” éxito;
5. el mensaje al usuario no revela datos protegidos de otra sede, área, orden o receta.

---

#### 18. Estado AS-IS observado en vento-fogo

La implementación vigente contiene controles parciales útiles, pero no demuestra todavía el contrato completo.

En `src/app/production-batches/new/page.tsx` se observa:

1. la página exige acceso a FOGO y usa `production.recipe_book.view` como permiso de entrada;
2. la receta seleccionada debe existir, estar `published` y tener `site_id` y `area_id`;
3. antes de renderizar la operación se evalúa `production.batches.create` con la sede y área de la receta;
4. la Server Action `createBatch` vuelve a entrar mediante `requireAppAccess` usando `production.recipe_book.view`;
5. la acción valida cantidades y, cuando aplica, destino, ingredientes, empaques y salidas;
6. en dispositivo compartido solicita firma con `actionCode = production.batches.create`;
7. la acción invoca `fogo_create_real_production_batch`;
8. la llamada observada no transporta una referencia canónica de orden productiva ni una identidad explícita de idempotencia;
9. el permiso exacto de creación sí aparece en la página, pero por esta fuente aislada no queda demostrado que la misma autorización exacta se revalide en el punto final de mutación;
10. la firma puede asociarse posteriormente con el `batchId` creado.

Estas piezas no se descartan; se clasifican como adopción parcial del contrato objetivo.

---

#### 19. Brecha de acoplamiento del RPC vigente

La evidencia canónica vigente sobre `fogo_create_real_production_batch` indica que la implementación transitoria puede, dentro de una misma operación de producción:

- crear el lote;
- seleccionar existencias;
- registrar consumos;
- modificar proyecciones de inventario;
- insertar movimientos `production_consume`;
- registrar salida productiva y, según el modo, afectar inventario de terminado.

Eso excede la semántica aislada de **inicio**.

La regla objetivo queda:

```text
INICIAR PRODUCCION
!=
REGISTRAR TODO EL PARCIAL
!=
CONCILIAR TODO EL CONSUMO
!=
REPORTAR TODA LA SALIDA
!=
FINALIZAR
!=
LIBERAR INVENTARIO
```

`FOGO-AUTH-009` protege la creación/apertura y la transición de inicio; no absorbe la producción parcial de `FOGO-AUTH-010`, la finalización de `FOGO-AUTH-011`, las correcciones/anulaciones de `FOGO-AUTH-012`, la normalización de lotes/recetas de `FOGO-AUTH-013` ni los contratos de integración FOGO/NEXO.

---

#### 20. Invariantes de autorización del inicio

| Invariante | Resultado obligatorio |
| --- | --- |
| permiso de lectura sin permiso de creación | `DENY` |
| actor sin turno vigente | `DENY` |
| actor sin check-in cuando aplica | `DENY` |
| rol productivo de otra área | `DENY` |
| orden de otra sede o área | `DENY` |
| receta publicada pero no aplicable | `DENY` |
| receta retirada o versión incompatible | `DENY` |
| `MATERIALS_RESERVING` sin readiness | no puede pasar a `IN_PRODUCTION` |
| firma de dispositivo sin permiso humano | `DENY` |
| supervisor o gerencia operativa sin capacidad productiva exacta | `DENY` |
| request cliente con `area_id` ampliatorio | `DENY` |
| estado de origen stale o incompatible | `DENY` o conflicto recuperable, nunca reinicio silencioso |
| retry equivalente de una operación ya confirmada | mismo resultado empresarial, sin duplicado |
| retry con payload incompatible | conflicto |

---

#### 21. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `createBatch` entra a la Server Action con `production.recipe_book.view`, aunque la mutación empresarial exige creación de lote. | Bloquea demostrar autorización exacta en el punto de efecto. | `FOGO-AUTH-009::<implementation_unit_id>` | La unidad revalida `fogo.production.batches.create` o su contrato canónico materializado inmediatamente antes del efecto y una llamada directa no puede saltar esa decisión. |
| La página evalúa `production.batches.create` con sede/área de la receta, pero ese check previo puede quedar stale. | No basta para proteger la mutación. | `FOGO-AUTH-009::<implementation_unit_id>` | Actor, contexto, recurso, estado y permiso se recalculan en la mutación autoritativa. |
| La llamada observada a `fogo_create_real_production_batch` no incluye una referencia canónica de orden productiva. | Impide demostrar que todo inicio nace de una orden/version autorizada. | `FOGO-AUTH-009::<implementation_unit_id>` | La unidad materializada correlaciona el inicio con orden/version canónicas o demuestra una adaptación equivalente aprobada. |
| La llamada observada no expone una identidad explícita de idempotencia empresarial. | Existe riesgo de lote o inicio duplicado ante retry o respuesta perdida si capas inferiores no lo resuelven. | `FOGO-AUTH-009::<implementation_unit_id>` | La unidad demuestra replay seguro, conflicto por payload incompatible y ausencia de duplicados. |
| El RPC transitorio acopla creación con consumos y efectos posteriores. | No impide definir el contrato, pero impide tratar el AS-IS como máquina canónica de inicio. | `FOGO-AUTH-010..013` e integraciones FOGO/NEXO según la responsabilidad exacta | Las unidades propietarias separan progresión, consumo, salida, cierre y reconciliación sin duplicar efectos. |
| Los literales runtime `production.*` no equivalen automáticamente al namespace `fogo.production.*`. | Bloquea afirmar adopción final del catálogo canónico. | `FOGO-AUTH-013 / FOGO-AUTH-015` | La migración usa claves canónicas exactas y elimina aliases ampliatorios no autorizados. |
| La asociación final de firma de dispositivo con el lote puede ocurrir después de la inserción. | Puede degradar trazabilidad si falla la asociación aunque el efecto exista. | `FOGO-AUTH-014` y contrato de dispositivo aplicable | La evidencia final conserva actor, dispositivo y recurso de forma recuperable y auditable. |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 22. Frontera con tareas posteriores

| Tarea | Responsabilidad reservada |
| --- | --- |
| `FOGO-AUTH-010` | proteger capturas y producción parcial después de `IN_PRODUCTION` |
| `FOGO-AUTH-011` | proteger finalización productiva |
| `FOGO-AUTH-012` | proteger correcciones, anulaciones, repriorizaciones u overrides aplicables |
| `FOGO-AUTH-013` | proteger y normalizar lotes, recetario y definiciones de receta, incluido namespace legacy |
| `FOGO-AUTH-014` | consolidar actor y turno como evidencia durable de las acciones productivas |
| `FOGO-AUTH-015` | migrar consumidores al paquete compartido sin aliases o bypass locales |
| `FOGO-AUTH-016` | certificar integralmente autorización, denegaciones, concurrencia, idempotencia y aislamiento |

La autoridad de iniciar no se reutiliza como autoridad de esas acciones.

---

#### 23. Materialización física posterior

La topología vigente de `FOGO-AUTH-009` es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define el contrato global una sola vez.

Cada materialización futura usa:

```text
FOGO-AUTH-009::<implementation_unit_id>
```

La materialización solo puede comenzar después de que el paquete aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita.

El marcador global no implementa código, RPC, RLS, migraciones, datos ni despliegues.

---

#### 24. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el inicio productivo, el ciclo de lote, permiso exacto, autorización server-side, contexto operativo, territorio, segregación, dispositivo compartido, idempotencia, auditoría y progresión de estados ya están cubiertos por requisitos vigentes. Esta tarea especializa esa cobertura sobre `VSCREEN-0057` y el inicio de `VPROC-0034` sin introducir una obligación verificable nueva fuera de esos contratos.

---

#### 25. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-FOGO-001` para ciclo de inicio, parcial, consumo, desperdicio, resultado, finalización, cancelación/corrección, actor, turno, cantidades, inventario, concurrencia e idempotencia;
- `TREQ-FOGO-002` para versión exacta e inmutabilidad de receta publicada;
- `TREQ-FOGO-003` para orden derivada de planificación aprobada, restricciones, materiales, prioridad y overrides trazables;
- `TREQ-FOGO-004` para ejecución productiva, lote, receta/version, materiales, pasos, desviaciones, rendimiento, merma y separación de finalización/calidad/inventario;
- `TREQ-AUTH-001` para impedir autorización final por nombres de rol;
- `TREQ-AUTH-004` para decisiones equivalentes entre evaluadores;
- `TREQ-AUTH-008` para exigir contexto operativo completo a capacidades operativas;
- `TREQ-AUTH-009` para resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-010` para segregación de funciones entre producción y bodega;
- `TREQ-AUTH-011` para identidad efectiva en dispositivo compartido;
- `TREQ-AUTH-013` para impedir bypass de UI/API/RPC y exigir permiso, actor, territorio, contexto y estado en mutaciones;
- `TREQ-AUTH-014` para invalidación de decisiones stale;
- `TREQ-AUTH-015` para evidencia correlacionable de cada decisión y acción protegida.

Esta trazabilidad no modifica el Registro 04A.

---

#### 26. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@798eb8ca508959f664147e441be13c39890aef26`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, `VSCREEN-0057`, `VPROC-0034::STEP-PREPARE_AND_START_BATCH`, estados `PRODUCTION_ORDER_READY`, `MATERIALS_RESERVING`, `MATERIALS_READY`, `IN_PRODUCTION`, permiso `fogo.production.batches.create`, contratos de recurso/alcance/prerrequisitos, 04A vigente y el AS-IS de `createBatch`/`fogo_create_real_production_batch`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron turnos, check-ins, órdenes, recetas, reservas, lotes, transiciones, dispositivos, reintentos ni pruebas reales de concurrencia o denegación. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-009::<implementation_unit_id>`. |

---

#### 27. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] la superficie protegida es exactamente `VSCREEN-0057` con `VPROC-0034::STEP-PREPARE_AND_START_BATCH`;
- [ ] el permiso de mutación es exactamente `fogo.production.batches.create`;
- [ ] el permiso permanece `OPERATIONAL_ONLY`, `SITE-WRITE`, recurso `PRODUCTION_BATCH` y territorio `SITE_AREA_DRAFT`;
- [ ] los tres roles productivos ordinarios conservan sede y área exactas;
- [ ] `supervisor` y `gerencia_operativa` no adquieren creación por supervisión;
- [ ] receta visible o `fogo.production.recipe_book.view` no autorizan crear lote;
- [ ] `PRODUCTION_ORDER_READY`, `MATERIALS_RESERVING`, `MATERIALS_READY` e `IN_PRODUCTION` conservan significados distintos;
- [ ] el inicio real queda identificado como transición `MATERIALS_READY -> IN_PRODUCTION`;
- [ ] una transición previa no autoriza automáticamente la siguiente;
- [ ] existe orden productiva/version verificable antes del inicio;
- [ ] receta/version publicada y aplicable se revalida al mutar;
- [ ] actor, turno, check-in, rol, sede y área se revalidan en el punto de efecto;
- [ ] parámetros de cliente no se usan como autoridad;
- [ ] una llamada directa a Server Action/RPC no puede saltar autorización;
- [ ] el dispositivo compartido identifica al actor pero no concede autoridad;
- [ ] `MATERIALS_READY` exige evidencia de preparación y no se infiere desde stock visual o reserva aislada;
- [ ] iniciar FOGO no equivale a consumo NEXO ya conciliado;
- [ ] retries equivalentes no duplican lote ni inicio;
- [ ] payload incompatible con la misma identidad idempotente produce conflicto;
- [ ] estado stale o concurrencia no reinician ni retroceden silenciosamente;
- [ ] una denegación deja cero efectos productivos;
- [ ] el AS-IS de `createBatch` queda clasificado como adopción parcial y no como cumplimiento integral;
- [ ] la producción parcial permanece reservada a `FOGO-AUTH-010`;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] cualquier modificación futura de Supabase perteneciente a VENTO se realiza desde `vento-shell` bajo la instancia física propietaria;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 28. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- modifica `fogo_create_real_production_batch`;
- modifica Server Actions, RPC, RLS, grants o datos;
- crea o modifica migraciones;
- crea permisos nuevos;
- modifica matrices RBAC aprobadas;
- crea una jerarquía de supervisión;
- redefine planificación productiva;
- redefine el contrato completo de reserva NEXO;
- registra producción parcial;
- finaliza producción;
- corrige o anula lotes;
- administra recetas;
- libera calidad;
- publica producto terminado en inventario;
- redefine empaque o etiquetado;
- diseña UX final;
- ejecuta E5;
- crea o autoriza una instancia física;
- modifica el Registro 04A.

---

#### 29. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-008 — Definir permisos de supervisor`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-009 — Proteger inicio de producción`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-010 — Proteger producción parcial`

### ✅ FOGO-AUTH-010 — Proteger producción parcial

**Estado:** APROBADA
**Tarea anterior:** FOGO-AUTH-009 — Proteger inicio de producción
**Tarea siguiente:** FOGO-AUTH-011 — Proteger finalización
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — protección server-side del registro parcial de `VPROC-0034` durante `IN_PRODUCTION`, con actor y contexto efectivos, territorio persistido del lote, estado vigente, capacidad exacta de mutación, deltas versionados, idempotencia, concurrencia, trazabilidad y separación estricta entre avance, consumo físico y finalización
**Bloque:** BLOQUE L — FOGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/L_FOGO/01_AUTORIZACION_DE_PRODUCCION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `FOGO-AUTH-010::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la frontera de autorización y consistencia del **registro parcial de producción** en FOGO para que una ejecución ya iniciada pueda conservar avances reales sin convertir cada captura en cierre, sin sobrescribir historia y sin permitir que una vista visible, un lote consultable, una autoridad de creación previa o un payload de cliente modifiquen producción por sí solos.

La regla raíz queda:

```text
LOTE EN EJECUCION AUTORIZABLE
+
ACTOR Y CONTEXTO OPERATIVO VIGENTES
+
SEDE Y AREA DEL LOTE COMPATIBLES
+
CAPACIDAD EXACTA DE MUTACION PARA LA ACCION PARCIAL
+
ESTADO VPROC-0034.IN_PRODUCTION VIGENTE
+
DELTA PRODUCTIVO VALIDO Y VERSIONADO
+
IDENTIDAD IDEMPOTENTE
+
CONTROL DE CONCURRENCIA
=
CAPTURA PARCIAL AUTORIZABLE
```

La captura parcial conserva hechos de ejecución. No concede por sí sola finalización, liberación de calidad, publicación de inventario ni autoridad para corregir historia previa.

---

#### 2. Handoff recibido de FOGO-AUTH-001..009

Esta tarea consume sin reinterpretación las fronteras ya aprobadas:

1. `FOGO-AUTH-001` inventarió `VSCREEN-0059 — Registro parcial de producción` y `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS — Registrar avance parcial` como identidades canónicas de FOGO;
2. `FOGO-AUTH-002` limitó el carril productivo ordinario a `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`, cada uno dentro de su sede y área efectivas;
3. `FOGO-AUTH-003` estableció que visibilidad en la cola no equivale a autoridad de mutación;
4. `FOGO-AUTH-004`, `FOGO-AUTH-005` y `FOGO-AUTH-006` aislaron territorialmente Panadería, Repostería y Cocina Caliente;
5. `FOGO-AUTH-007` separó el hecho productivo FOGO de la reserva, retiro, consumo y movimiento físico autoritativos de NEXO;
6. `FOGO-AUTH-008` estableció que supervisar, coordinar o leer lotes no concede mutaciones productivas ordinarias;
7. `FOGO-AUTH-009` protegió creación e inicio y dejó explícito que poder iniciar producción no autoriza registrar producción parcial.

`FOGO-AUTH-010` no reabre esas decisiones. Protege exclusivamente las capturas posteriores al inicio mientras la ejecución permanece activa.

---

#### 3. Identidad canónica de la superficie protegida

| Dimensión | Identidad canónica |
| --- | --- |
| Aplicación | `fogo` |
| Pantalla | `VSCREEN-0059 — Registro parcial de producción` |
| Acción primaria | `VSCREEN-0059::PRIMARY` |
| Proceso | `VPROC-0034 — Preparar materiales y ejecutar producción contra una versión aprobada` |
| Paso | `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS — Registrar avance parcial` |
| Clase de acción | `CAPTURE` |
| Fase | `IN_PROGRESS` |
| Recurso empresarial | `PRODUCTION_BATCH` |
| Estado ordinario de origen | `VPROC-0034.IN_PRODUCTION` |
| Evento de ejecución reutilizado | `VPROC-0034.EVT-003 — producción en curso` |

`VSCREEN-0059` conserva avances parciales sin cerrar prematuramente el resultado. La pantalla y sus parámetros son superficies de interacción, no fuentes de autoridad.

---

#### 4. Capacidad exacta de mutación y prohibición de inferencia

El catálogo canónico vigente de FOGO no contiene una clave dedicada a la captura parcial de un lote. Las claves operativas existentes separan entrada, lectura, creación de lote, lectura de órdenes y recetario operativo.

Por tanto, este marcador fija una regla fail-closed:

```text
fogo.production.batches.view
!=
AUTORIDAD PARA REGISTRAR AVANCE

fogo.production.batches.create
!=
AUTORIDAD AUTOMATICA PARA REGISTRAR AVANCE

fogo.production.recipe_book.view
!=
AUTORIDAD PARA REGISTRAR AVANCE
```

La materialización de cada `FOGO-AUTH-010::<implementation_unit_id>` deberá vincular la mutación parcial a una **capacidad canónica concreta y registrada** cuya semántica cubra esa acción. El código de esa capacidad no se inventa en este marcador global.

Una unidad física no puede declararse conforme si resuelve la captura parcial mediante:

- permiso de lectura;
- permiso de creación reutilizado por conveniencia sin contrato explícito de la acción;
- nombre de rol;
- pertenencia previa al lote;
- visibilidad de la pantalla;
- firma de dispositivo aislada;
- literal local `production.*` no normalizado;
- ausencia de comprobación de permiso presentada como compatibilidad temporal.

Si la capacidad exacta todavía no está materializada para una unidad, la mutación parcial permanece no ejecutable hasta que la misma unidad y las tareas propietarias de normalización/migración de permisos satisfagan el contrato canónico aplicable. No se abre un wildcard ni un alias ampliatorio.

---

#### 5. Actores ordinarios autorizables

La captura parcial ordinaria permanece dentro de los tres perfiles productivos definidos para FOGO:

| Rol operativo efectivo | Sede | Área productiva exacta | Condición territorial |
| --- | --- | --- | --- |
| `produccion_cocina` | Centro de Producción | Cocina Caliente | solo lotes persistidos en este territorio |
| `produccion_panaderia` | Centro de Producción | Galletería y Panadería | solo lotes persistidos en este territorio |
| `produccion_reposteria` | Centro de Producción | Repostería | solo lotes persistidos en este territorio |

No adquieren mutación parcial por implicación:

- `supervisor`;
- `gerencia_operativa`;
- `bodeguero`;
- quien haya creado el lote;
- quien haya creado o publicado la receta;
- quien pueda consultar órdenes o lotes;
- quien administre la estación física.

Una ampliación futura requiere autoridad explícita de la acción y no puede derivarse de supervisión o lectura.

---

#### 6. Estado empresarial de origen

La captura parcial ordinaria se autoriza sobre una instancia existente de `VPROC-0034` que haya alcanzado realmente:

```text
VPROC-0034.IN_PRODUCTION
```

Ese estado significa que se ejecutan pasos de receta y se capturan consumos, tiempos y desviaciones.

No son estados equivalentes para capturar avance ordinario:

```text
PRODUCTION_ORDER_READY
MATERIALS_RESERVING
MATERIALS_READY
OUTPUT_REPORTED
CONSUMPTION_RECONCILIATION_PENDING
READY_FOR_QUALITY
PRODUCTION_EXECUTION_COMPLETED
```

Reglas:

1. un lote que todavía está en preparación no puede recibir avance productivo como si ya estuviera ejecutándose;
2. una captura stale no puede hacer retroceder `OUTPUT_REPORTED` o estados posteriores a `IN_PRODUCTION`;
3. una ejecución completada no puede recibir un nuevo parcial ordinario;
4. una corrección posterior pertenece a la acción propietaria de corrección y no se disfraza como otro parcial;
5. la reanudación después de una interrupción deberá demostrar un estado vigente que permita continuar, no asumirlo desde una pantalla abierta.

---

#### 7. Semántica del avance parcial

Una captura parcial representa un hecho incremental de una ejecución activa. Puede conservar, según aplique:

- paso o etapa ejecutada;
- cantidad observada durante el intervalo;
- tiempo o duración real;
- material utilizado declarado por FOGO;
- salida parcial observada;
- merma, desperdicio o desviación observados;
- medición o control operacional asociado;
- comentario estructurado o motivo cuando corresponda;
- evidencia autorizada;
- referencias NEXO correlacionadas cuando exista efecto físico.

No significa por sí sola:

- lote terminado;
- salida final;
- rendimiento final;
- consumo NEXO conciliado;
- calidad liberada;
- producto disponible;
- remisión satisfecha;
- inventario terminado publicado;
- cierre productivo aprobado.

---

#### 8. Delta actual y acumulado

Toda captura deberá distinguir el hecho nuevo de la proyección acumulada.

Contrato conceptual:

```text
ACUMULADO_ANTERIOR_VERIFICADO
+
DELTA_ACTUAL_ACEPTADO
=
ACUMULADO_RESULTANTE
```

Reglas:

1. el cliente no suministra un total acumulado autoritativo capaz de borrar capturas previas;
2. un delta no puede reescribir silenciosamente el plan, la receta, la orden o las cantidades históricas;
3. cualquier proyección acumulada se calcula o valida server-side contra la versión vigente;
4. el delta conserva unidad, precisión y regla de conversión aplicables;
5. un delta negativo no se usa como corrección genérica de un hecho ya confirmado;
6. una diferencia entre plan y acumulado permanece visible hasta su tratamiento propietario;
7. la identidad del lote no cambia por producción parcial ni por diferencia de rendimiento.

---

#### 9. Datos mínimos de una captura protegida

Sin imponer nombres físicos de columnas o tablas, la operación deberá poder resolver y auditar como mínimo:

- identidad estable del lote o ejecución;
- instancia de `VPROC-0034`;
- orden productiva y versión;
- receta y versión exacta;
- producto o salida aplicable;
- sede y área persistidas del lote;
- estado y versión vigentes del agregado;
- cantidad planificada y unidad;
- delta de la captura actual;
- acumulado anterior verificable;
- acumulado resultante verificable;
- materiales y deltas de consumo productivo cuando apliquen;
- salida parcial, rendimiento, merma o desviaciones cuando apliquen;
- paso, tiempo o control operacional relevante;
- principal técnico y actor efectivo;
- rol operativo efectivo;
- turno y check-in cuando correspondan;
- dispositivo cuando aplique;
- momento de ocurrencia y registro;
- `correlation_id`, `causation_id`, `request_id` o equivalentes del contrato compartido cuando apliquen;
- identidad idempotente estable;
- referencia de resultado y auditoría.

La materialización física podrá usar los shapes canónicos correspondientes, pero no perder ninguna verdad empresarial requerida por esta lista.

---

#### 10. Revalidación server-side en cada captura

Cada mutación parcial deberá revalidar inmediatamente antes del efecto:

```text
PRINCIPAL TECNICO
+
ACTOR EFECTIVO
+
TURNO PUBLICADO Y VIGENTE
+
CHECK-IN CUANDO APLIQUE
+
ROL OPERATIVO EFECTIVO
+
SEDE ACTIVA
+
AREA ACTIVA
+
CAPACIDAD EXACTA DE LA ACCION
+
LOTE Y TERRITORIO PERSISTIDOS
+
ESTADO Y VERSION ACTUALES
+
ORDEN / RECETA / VERSION VINCULADAS
+
DELTA Y CAMPOS PERMITIDOS
+
SIN DENEGACION PREVALENTE
=
MUTACION PARCIAL AUTORIZABLE
```

Una decisión obtenida al cargar la pantalla no se reutiliza como autorización indefinida.

---

#### 11. Territorio del lote

La sede y el área del recurso persistido prevalecen sobre valores suministrados por el cliente.

Reglas:

1. el lote debe pertenecer al territorio operativo efectivo del actor;
2. compartir Centro de Producción no une Cocina, Panadería y Repostería;
3. un cambio de turno o área invalida la autoridad anterior;
4. un actor rotado a otra área no continúa capturando sobre el lote abierto con una decisión stale;
5. un lote sin territorio resoluble cuando la operación lo exige se deniega cerrado;
6. una captura multiárea no se ejecuta parcialmente por inferencia;
7. `site_id` y `area_id` de formularios o URL son localizadores o filtros, no autoridad.

---

#### 12. Actor, turno y continuidad de atribución

La captura debe registrar al humano que efectivamente realizó la acción, no únicamente al usuario técnico que mantiene abierta una sesión.

La identidad de actor puede variar entre capturas del mismo lote si el trabajo cambia legítimamente de trabajador o turno. Ese cambio:

- no cambia la identidad del lote;
- no transfiere autoridad previa;
- exige resolución fresca de contexto;
- conserva quién hizo cada captura;
- conserva el principal técnico y dispositivo cuando aplique;
- no permite que el nuevo actor edite silenciosamente hechos históricos del actor anterior.

La continuidad del lote no implica continuidad de autorización personal.

---

#### 13. Dispositivo compartido

En estación compartida, la operación parcial deberá aplicar la intersección entre:

```text
LIMITES DEL DISPOSITIVO
∩
AUTORIDAD DEL ACTOR EFECTIVO
∩
TERRITORIO DEL LOTE
∩
ESTADO ACTUAL
```

Cuando el contrato de dispositivo exija firma o identificación reforzada, esa evidencia se resuelve para la captura actual.

La firma:

- identifica al actor;
- no crea el permiso;
- no amplía sede o área;
- no convierte al administrador de la estación en ejecutor productivo;
- no autoriza una captura sobre estado incompatible.

---

#### 14. Campos permitidos y protección contra sobreescritura

La acción parcial solo puede modificar los hechos pertenecientes a la captura de avance.

Queda prohibido usarla para alterar silenciosamente:

- identidad del lote;
- orden de origen;
- versión de receta aplicada;
- sede o área persistidas;
- cantidad planificada histórica;
- identidad de capturas previas;
- autor de una captura anterior;
- disposición de calidad;
- movimientos NEXO ya confirmados;
- estado terminal;
- genealogía ya materializada;
- resultado de cierre aprobado.

Un cambio legítimo sobre esos elementos utiliza su acción propietaria y conserva historia no destructiva.

---

#### 15. Idempotencia de la captura parcial

Cada captura con efecto debe tener una identidad idempotente estable dentro de su alcance.

Huella mínima conceptual:

```text
TIPO_DE_ACCION
+
LOTE / INSTANCIA
+
VERSION ESPERADA
+
ACTOR EFECTIVO
+
DELTA NORMALIZADO
+
UNIDADES
+
PASO O CONTEXTO OPERACIONAL
+
REFERENCIAS DE EFECTO
```

Resultados:

| Caso | Resultado obligatorio |
| --- | --- |
| misma identidad + misma huella | devolver resultado durable previo; no duplicar captura |
| misma identidad + huella incompatible | conflicto; cero segundo efecto |
| respuesta perdida | recuperar resultado antes de repetir la mutación |
| estado ya avanzado por otra operación | revalidar y responder conflicto/estado vigente; no retroceder |

Un retry técnico no equivale a una nueva producción real.

---

#### 16. Concurrencia y control de versión

Dos capturas concurrentes no pueden provocar pérdida de actualización ni doble contabilización.

La materialización deberá usar versión esperada, bloqueo, compare-and-swap, claim o mecanismo equivalente compatible con su arquitectura.

Invariantes:

1. cada captura aceptada se aplica una sola vez;
2. el acumulado resultante incorpora todos los deltas confirmados;
3. una escritura stale no sobrescribe un acumulado más nuevo;
4. el orden de persistencia se puede reconstruir;
5. el estado de proceso no retrocede por carrera;
6. una captura que cruza un cambio de actor, turno, área o estado vuelve a autorizarse antes de cualquier efecto.

---

#### 17. Relación con `VPROC-0034.EVT-003`

`VPROC-0034.EVT-003` conserva la semántica de **producción en curso** y puede representar el hecho durable de ejecución con captura de consumos, tiempos y desviaciones.

Una captura parcial válida:

- puede producir o actualizar la evidencia que sustenta producción en curso;
- no crea una definición `EVT-*` nueva;
- no convierte cada delta en un evento empresarial de cierre;
- conserva el mismo `process_instance_id` y lote cuando corresponde;
- mantiene correlación con la captura que la originó.

Los eventos se reutilizan conforme al catálogo existente; no se crea un segundo ciclo paralelo de estados.

---

#### 18. Frontera con `OUTPUT_REPORTED`

`VPROC-0034.OUTPUT_REPORTED` es un estado posterior de handoff cuyo significado es que se registraron salidas, rendimiento y merma sin liberación de calidad.

Por tanto:

1. registrar un parcial ordinario mientras se ejecuta no obliga a transicionar a `OUTPUT_REPORTED`;
2. una salida parcial observada puede conservarse dentro del expediente sin presentarse como resultado final;
3. la transición a `OUTPUT_REPORTED` deberá satisfacer su contrato de estado y no se deriva de que `produced_qty > 0`;
4. `OUTPUT_REPORTED` no implica conciliación de consumos;
5. `OUTPUT_REPORTED` no implica finalización, calidad liberada ni inventario disponible.

La 010 protege la captura; no redefine la transición terminal ni absorbe la finalización propietaria de la 011.

---

#### 19. Producción parcial inferior a la planificada

Cuando una ejecución termine posteriormente con salida inferior a la planificada y el proceso/autoridad aplicable lo permita, las capturas realizadas deben conservar suficiente verdad para demostrar que:

1. la cantidad planificada no fue reducida silenciosamente;
2. la cantidad faltante no se convirtió en producto terminado;
3. el rendimiento real y la diferencia permanecieron explícitos;
4. materiales consumidos, devueltos y desperdiciados pueden conciliarse;
5. motivo y autoridad de una aceptación con diferencia pueden vincularse al cierre;
6. NEXO no recibe una cantidad faltante ficticia;
7. una remisión o necesidad externa no queda satisfecha por inferencia.

La decisión de aceptar el cierre con diferencia no se ejecuta mediante la captura parcial ordinaria.

---

#### 20. Interrupción de producción

Si la ejecución se interrumpe después de uno o más avances parciales:

- se conserva el último estado real alcanzado;
- se conservan capturas, materiales, salida parcial, merma, evidencia y efectos ya ocurridos;
- no se emite `VPROC-0034.PRODUCTION_EXECUTION_COMPLETED` como si la ejecución hubiese terminado normalmente;
- los movimientos físicos confirmados permanecen inmutables;
- solo el trabajo futuro se cancela mediante la acción propietaria aplicable;
- el cierre posterior debe explicar resultado residual, variaciones y pendientes.

Una interrupción no convierte la historia en vacía y no autoriza borrar parciales previamente aceptados.

---

#### 21. Separación FOGO / NEXO durante parciales

FOGO conserva la verdad productiva de la captura. NEXO conserva la verdad física de reserva, retiro, consumo, traslado, posting y conciliación de existencias.

```text
CAPTURA FOGO DE USO / AVANCE
!=
MOVIMIENTO NEXO CONFIRMADO
!=
CONSUMO NEXO RECONCILIADO
```

Reglas:

1. una captura FOGO puede iniciar o continuar el handoff hacia NEXO;
2. no puede fabricar un movimiento NEXO ni declararlo conciliado;
3. una respuesta visual de stock no prueba el efecto físico;
4. una cantidad productiva puede estar registrada mientras su operación física correlacionada permanece pendiente;
5. diferencias abiertas permanecen explícitas;
6. la conciliación posterior compara requerido, reservado, emitido, consumido, devuelto, desperdiciado y diferencia;
7. cualquier cambio futuro de Supabase perteneciente a VENTO se crea, versiona y ejecuta desde `vento-shell` bajo la instancia física propietaria.

---

#### 22. Denegación, error y recuperación

Una captura denegada debe producir cero efectos empresariales.

Se deniega o falla cerrado cuando, entre otros casos:

- no existe actor efectivo válido;
- turno o check-in requerido no están vigentes;
- sede o área no coinciden con el lote;
- la capacidad exacta de mutación no está materializada o no es concedida;
- el lote no está en estado compatible;
- la versión esperada está obsoleta;
- el delta es inválido o viola invariantes;
- la receta/orden vinculadas no son resolubles;
- el payload intenta alterar campos fuera de la acción;
- la firma requerida de dispositivo falta o no corresponde al actor;
- una clave idempotente se reutiliza con contenido incompatible;
- existe fallo técnico que impide obtener una decisión autorizativa confiable.

Un fallo técnico no se convierte en `ALLOW`, y un retry no se ejecuta a ciegas si el resultado previo es incierto.

---

#### 23. Estado AS-IS observado en `vento-fogo`

El runtime vigente demuestra creación y consulta de lotes, pero no demuestra una superficie canónica separada para el registro parcial de `VPROC-0034`.

Se observa:

- `src/app/production-batches/new/page.tsx` captura cantidades reales durante `createBatch` y llama a `fogo_create_real_production_batch`;
- la operación actual mezcla creación del lote con consumos y otros efectos del resultado en un mismo flujo transitorio;
- `src/app/production-batches/page.tsx` consulta `production_batch_consumptions` para visualizar consumos registrados;
- no se observó en el runtime revisado una acción separada que materialice `VSCREEN-0059::PRIMARY` o `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS` como lifecycle incremental;
- no se observó una transición física explícita que mantenga múltiples capturas parciales versionadas dentro de `IN_PRODUCTION`.

Conclusión AS-IS:

```text
CAPTURA FINAL / ACOPLADA EXISTENTE
!=
REGISTRO PARCIAL CANONICO MATERIALIZADO
```

La ausencia de la superficie separada no se corrige declarando equivalente el RPC existente.

---

#### 24. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| El catálogo FOGO vigente no contiene una clave dedicada a captura parcial. | Bloquea una materialización conforme si la unidad pretende mutar parciales sin capacidad canónica concreta. | `FOGO-AUTH-010::<implementation_unit_id>` con normalización/migración propietaria en `FOGO-AUTH-013` / `FOGO-AUTH-015` cuando aplique | la acción parcial queda ligada a una capacidad canónica registrada, con alcance explícito y pruebas negativas contra lectura/creación no equivalentes |
| El runtime actual acopla creación, cantidades reales y efectos posteriores dentro de `fogo_create_real_production_batch`. | Bloquea declarar el lifecycle parcial como materializado. | `FOGO-AUTH-010::<implementation_unit_id>` y unidad técnica propietaria del consumidor | existe captura incremental protegida o adaptación equivalente que conserva estados, idempotencia, deltas y ownership sin falsificar parciales |
| `production_batch_consumptions` es visible pero no demuestra autorización ni lifecycle de captura. | Riesgo de confundir dato observado con mutación protegida. | `FOGO-AUTH-010::<implementation_unit_id>` | lectura y escritura quedan separadas; la mutación revalida actor, contexto, capacidad, lote, estado y versión |
| Una captura puede coincidir con handoffs NEXO todavía pendientes. | No bloquea el contrato; exige estado durable y conciliación posterior. | `INT-PROD-002` / `FOGO-AUTH-010::<implementation_unit_id>` | cada efecto productivo mantiene correlación con la operación física y no se presenta como reconciliado antes de serlo |
| Finalización e interrupción requieren acciones distintas a registrar un parcial. | No bloquea. | `FOGO-AUTH-011` / `FOGO-AUTH-012` | cierre, cancelación o corrección utilizan sus acciones propietarias sin reusar el endpoint parcial |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 25. Frontera con tareas posteriores

| Tarea | Frontera preservada |
| --- | --- |
| `FOGO-AUTH-011` | protege la finalización; una captura parcial no hereda autoridad para cerrar ni emitir ejecución completada |
| `FOGO-AUTH-012` | protege correcciones y anulaciones; un parcial aceptado no se reescribe mediante otro delta negativo o edición destructiva |
| `FOGO-AUTH-013` | normaliza la protección de lotes/recetas y permisos legacy; no convierte aliases amplios en autorización parcial |
| `FOGO-AUTH-014` | registra actor y turno con la evidencia completa de cada captura |
| `FOGO-AUTH-015` | migra consumidores a contratos compartidos conservando capacidad exacta, contexto, versión e idempotencia |
| `FOGO-AUTH-016` | prueba integralmente parciales, denegaciones, concurrencia, stale state, shared device y ausencia de escalamiento |
| `FOGO-UX-007` y superficies propietarias aplicables | representan el avance sin presentar parciales como cierre o resultado liberado |

Esta tarea no adelanta ninguna de esas materializaciones.

---

#### 26. Materialización física posterior

La topología canónica aplicable es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Consecuencias:

1. este marcador define el contrato global de la acción parcial;
2. no autoriza una ejecución física global;
3. cada materialización usa `FOGO-AUTH-010::<implementation_unit_id>`;
4. la unidad física solo puede abrirse después del `E5-GATE-008::<package_id>` aplicable y de la autorización física explícita;
5. una misma decisión global puede ser consumida por varias unidades sin convertirlas en una sola instancia;
6. la unidad debe probar su binding real de permiso/capacidad, guard server-side, persistencia, idempotencia, concurrencia, estados y auditoría;
7. ningún cambio de Supabase se ejecuta desde `vento-fogo`; pertenece a `vento-shell`.

---

#### 27. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el ciclo de producción parcial, actor/turno, cantidades, consumos, desviaciones, autorización de mutaciones, territorio, segregación, shared device, frescura, idempotencia, concurrencia y auditoría ya están cubiertos por requisitos vigentes. Esta tarea especializa esa cobertura sobre `VSCREEN-0059` y `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS` sin introducir una obligación verificable nueva fuera de esos contratos.

---

#### 28. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura vigente de:

- `TREQ-FOGO-001` para demostrar inicio, producción parcial, consumo, desperdicio, resultado, finalización, cancelación/corrección, actor, turno, cantidades y efectos de inventario auditables;
- `TREQ-FOGO-004` para conservar orden, lote, receta/version, cantidades, materiales, pasos, desviaciones, rendimiento, merma y controles durante la ejecución;
- `TREQ-AUTH-008` para exigir contexto operativo completo a capacidades operativas;
- `TREQ-AUTH-009` para resolución determinista de sede/área y denegación de cruces territoriales;
- `TREQ-AUTH-010` para segregación de funciones entre producción e inventario/bodega;
- `TREQ-AUTH-011` para identidad efectiva y límites en dispositivo compartido;
- `TREQ-AUTH-013` para impedir bypass de UI/API/RPC y exigir permiso exacto, actor, territorio, contexto, estado y campos permitidos en cada mutación;
- `TREQ-AUTH-014` para invalidación de autoridad stale ante cambios de turno, área, trabajador, dispositivo, rol o asignación;
- `TREQ-AUTH-015` para evidencia correlacionable de cada decisión y acción protegida.

Esta trazabilidad no modifica el Registro 04A.

---

#### 29. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@7df8c5a6c1ed1882dfeecafcd10f7116118c3a41`, `vento-fogo/main@a40683b2413d621fb3f54f2eebb8743a42bad3d7`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, `VSCREEN-0059`, `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS`, estados/eventos de `VPROC-0034`, reglas de producción parcial e interrupción, contratos de autorización y recurso, cobertura 04A vigente y el AS-IS de `production-batches`; `FOGO-AUTH-009` se consume desde su artefacto completo aprobado, todavía pendiente de incorporación remota al momento de esta preparación anticipada. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron lotes reales, capturas parciales, turnos, check-ins, dispositivos, handoffs NEXO, reintentos, concurrencia ni pruebas adversariales de autorización. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `FOGO-AUTH-010::<implementation_unit_id>`. |

---

#### 30. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] la superficie protegida es exactamente `VSCREEN-0059` con `VPROC-0034::STEP-CAPTURE_BATCH_PROGRESS`;
- [ ] la acción conserva clase `CAPTURE` y contexto `IN_PROGRESS`;
- [ ] la captura ordinaria exige una instancia vigente en `VPROC-0034.IN_PRODUCTION`;
- [ ] `VPROC-0034.EVT-003` se reutiliza sin inventar otro catálogo de eventos;
- [ ] una captura parcial no finaliza el lote;
- [ ] una captura parcial no obliga a entrar a `OUTPUT_REPORTED`;
- [ ] `OUTPUT_REPORTED` no se interpreta como consumo conciliado, finalización o calidad liberada;
- [ ] la capacidad de mutación parcial debe ser canónica, concreta y registrada antes de cualquier materialización;
- [ ] `batches.view`, `batches.create` y `recipe_book.view` no se usan como equivalentes automáticos de la autoridad parcial;
- [ ] los tres roles productivos ordinarios conservan sede y área exactas;
- [ ] supervisor, gerencia operativa, bodega, autor de receta o creador de lote no adquieren mutación parcial por implicación;
- [ ] actor, turno, check-in, rol, sede, área, capacidad, lote, estado y versión se revalidan en cada captura;
- [ ] el territorio persistido del lote prevalece sobre parámetros de cliente;
- [ ] el delta actual se distingue del acumulado anterior y resultante;
- [ ] el cliente no puede sobrescribir autoritativamente acumulados o historia;
- [ ] un delta negativo no funciona como corrección genérica;
- [ ] la identidad del lote permanece estable ante producción parcial;
- [ ] retries equivalentes no duplican capturas;
- [ ] la misma identidad idempotente con huella incompatible produce conflicto;
- [ ] capturas concurrentes no generan lost update ni doble contabilización;
- [ ] una escritura stale no retrocede el estado;
- [ ] shared device identifica al actor sin ampliar autoridad;
- [ ] FOGO y NEXO mantienen verdad productiva y física separadas;
- [ ] un parcial no fabrica movimientos ni conciliación NEXO;
- [ ] la producción parcial inferior a plan conserva plan, faltante, rendimiento, diferencias y material consumido/devuelto/desperdiciado;
- [ ] una interrupción conserva la historia y no emite finalización normal falsa;
- [ ] el AS-IS queda clasificado como flujo acoplado, no como lifecycle parcial canónico materializado;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] la finalización permanece reservada a `FOGO-AUTH-011`;
- [ ] correcciones y anulaciones permanecen reservadas a `FOGO-AUTH-012`;
- [ ] cualquier modificación futura de Supabase perteneciente a VENTO se realiza desde `vento-shell` bajo la instancia física propietaria;
- [ ] la topología queda `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 31. Límites

Esta tarea no:

- implementa código;
- modifica `vento-fogo`;
- modifica `fogo_create_real_production_batch`;
- crea una tabla o endpoint físico de parciales;
- inventa una clave de permiso nueva;
- reutiliza por contrato `fogo.production.batches.create` como permiso de captura parcial;
- modifica matrices RBAC aprobadas;
- modifica Server Actions, RPC, RLS, grants o datos;
- crea o modifica migraciones;
- redefine el inicio protegido por `FOGO-AUTH-009`;
- finaliza producción;
- corrige o anula lotes;
- modifica recetas;
- libera calidad;
- publica producto terminado en inventario;
- cierra remisiones o necesidades externas;
- reconcilia por sí sola movimientos NEXO;
- redefine empaque o etiquetado;
- diseña UX final;
- ejecuta E5;
- crea o autoriza una instancia física;
- modifica el Registro 04A.

---

#### 32. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-AUTH-009 — Proteger inicio de producción`

**TAREA ACTUAL APROBADA**
`FOGO-AUTH-010 — Proteger producción parcial`

**SIGUIENTE TAREA RESERVADA**
`FOGO-AUTH-011 — Proteger finalización`

### [ ] FOGO-AUTH-011 — Proteger finalización
### [ ] FOGO-AUTH-012 — Proteger correcciones y anulaciones
### [ ] FOGO-AUTH-013 — Proteger lotes y recetas
### [ ] FOGO-AUTH-014 — Registrar actor y turno
### [ ] FOGO-AUTH-015 — Migrar a paquetes de vento-shell
### [ ] FOGO-AUTH-016 — Ejecutar pruebas integrales
