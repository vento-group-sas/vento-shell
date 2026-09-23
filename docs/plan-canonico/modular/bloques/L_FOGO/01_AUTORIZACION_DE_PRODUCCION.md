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

### [ ] FOGO-AUTH-005 — Restringir Repostería
### [ ] FOGO-AUTH-006 — Restringir Cocina
### [ ] FOGO-AUTH-007 — Restringir Insumos
### [ ] FOGO-AUTH-008 — Definir permisos de supervisor
### [ ] FOGO-AUTH-009 — Proteger inicio de producción
### [ ] FOGO-AUTH-010 — Proteger producción parcial
### [ ] FOGO-AUTH-011 — Proteger finalización
### [ ] FOGO-AUTH-012 — Proteger correcciones y anulaciones
### [ ] FOGO-AUTH-013 — Proteger lotes y recetas
### [ ] FOGO-AUTH-014 — Registrar actor y turno
### [ ] FOGO-AUTH-015 — Migrar a paquetes de vento-shell
### [ ] FOGO-AUTH-016 — Ejecutar pruebas integrales
