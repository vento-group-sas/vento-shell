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

### [ ] FOGO-AUTH-003 — Filtrar cola por sede y área
### [ ] FOGO-AUTH-004 — Restringir Panadería
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
