# VISO-ROUTE-DELTA-001 — Reconciliación AUTH-UI-061, programación laboral

> **Control:** `AUTH-UI-061` · **Corte:** 2026-11-02 · **Estado:** `STATIC_RECONCILIATION_PERFORMED / AUTH_AND_E2E_BLOCKED`. No modificar inventario E1 aprobado ni renumerar `VISO-ROUTE-001..060`; el identificador 061 representa **una sola página nueva**, no una autorización aprobada para publicar horas extra.

## Identidad reproducible

| Dimensión | Resultado comprobado o delimitado |
| --- | --- |
| `route_id` | `VISO-ROUTE-061`, propuesto por la tarea canónica `AUTH-UI-061` |
| Patrón de URL | `/staff/schedule/month`; páginas con `?site_id`, `?month`, `?employee_id` no son rutas distintas |
| Archivo y blob | [`src/app/staff/schedule/month/page.tsx`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/month/page.tsx), blob Git `0568a8249112bb7fd9f3a2461fe7e192bed13cb1` |
| SHA fuente | `vento-viso/main@3820ea02fdd8e6492a95c659a60a83a9210939e0` comprobado `identical` contra `main` |
| Tipo | `ESTATICA`, `PERSONAL_PROGRAMACION` |
| Proceso / aplicación | `VPROC-0007` / VISO, consumo ANIMA, `VISO-SCHEDULE-MONTHLY-001` (reservado) |
| Guard | `requireStaffScheduleAccess('/staff/schedule/month', site_id)` (server); `staff.schedule.view` → `requireAppAccess` |
| Navegación observada | Selector `ScheduleViewSwitch` dentro de `staff/schedule/layout.tsx`, link **Semana/Mes**; no asignar entrada de menú lateral por inferencia |
| Layout mensual | `src/app/staff/schedule/month/layout.tsx`: envuelve página con `MonthlyScheduleOrganizer` |
| Componentes propios | `monthly-shift-builder.tsx`, `monthly-schedule-organizer.tsx`, `schedule-view-switch.tsx`; no contarlos como páginas |
| Acciones | `month/actions.ts` (4 funciones), `month/block-actions.ts` (1), `month/operational-view-actions.ts` (1), `month/visibility-actions.ts` (2); además 14 funciones exportadas en `staff/schedule/actions.ts` para semana |
| Handler de la página | **Ninguno** adicional: los 10 `route.ts` existentes son superficies diferentes y conservan identidad propia |

**Auditoría de conteos:** listado de archivos del checkout local `fix/gap-pkg-004-viso-qa@94d3b8fd` = **61 páginas**, **48 estáticas**, **13 dinámicas** y **10 route handlers**; `src/app/page.tsx` incluida. El fixture del código de `main` en `scripts/quality/viso-consumer-baseline-gate.test.mjs` espera exactamente 61/48/13/59 protegidas/2 públicas/10 handlers/71 patrones. **No atribuir al SHA de `main` el resultado de enumeración local**: falta ejecutar el inventariador contra ese SHA exacto y probar las 59 protecciones mediante peticiones. El snapshot E1 aprobado de 60 rutas permanece intacto.

### Conjunto de los diez handlers separados de páginas

`/api/health`; `/api/viso/attendance-report`; `/api/viso/menu/reorder`; `/api/viso/staff-schedule-hidden-employees`; `/api/viso/staff-schedule-shifts`; `/api/viso/upload-commercial-menu-image`; `/api/viso/upload-logo`; `/api/viso/upload-product-image`; `/api/viso/upload-website-media`; `/menu/[id]/personalizaciones`. Los parámetros de una URL tampoco elevan el conteo de patrones.

## 2. Guardas y autorización: matriz de hechos y brechas

La fuente de [`requireStaffScheduleAccess`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/helpers.ts) remite a `requireAppAccess({appId:'viso',permissionCode:'staff.schedule.view',siteId,allowPermissionAccess:true})`. Este guard consulta usuario Auth, sesión operacional/territorio, permisos, dispositivo compartido y posible rol simulado en [`src/lib/auth/guard.ts`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/lib/auth/guard.ts); la **identidad inicial y la protección de lectura existen en código**. Eso no implica autorización segura de *todas las mutaciones*. Las acciones usan `createAdminClient`: el control territorial debe ocurrir en cada acción antes de afectar filas.

| Superficie de escritura/lectura | Autoridad comprobada en código | Control faltante que impide PASS |
| --- | --- | --- |
| `StaffScheduleMonthPage` (SSR lectura) | Auth + permiso `staff.schedule.view` con `site_id` solicitado | Verificar rechazo real de usuario sin sede; SSR usa cliente administrador y catálogo de `sites` |
| `createMonthlyShiftsAction` y `createMonthlyScheduleBlocksAction` | `requireStaffScheduleAccess` + validación `employees.site_id` o `employee_sites` activo | Separar `create` del permiso `view`; pruebas de rol, área y otras sedes |
| `deleteMonthlyDraftShiftAction` / `deleteMonthlyDraftsAction` | Filtros de `site_id` y `published_at IS NULL` observados | `delete` distinto de `view`; auditoría, reversa, corrección por lote |
| `publishMonthAction` | `requireStaffScheduleAccess`, UPDATE por sede/mes a borradores; fecha y `published_by` | Permiso `publish`, extras aprobadas, evaluación por semana/contrato, lock e idempotencia |
| `publishWeekAction` | Mismo helper `view` y UPDATE publicado; trigger legado aplica límite | Permiso `publish`, paridad Semana/Mes, consolidación multisedes y autorización de extras |
| `deleteShiftAction` (semana) | `published_at IS NULL`, pero solo helper `view` sin `site_id` en query de borrado | Scope por recurso, rol de eliminación, test negativo y auditoría |
| **`deleteManyShiftAction` (semana)** | `.delete().in('id',shiftIds)` y helper `view` **sin** filtro `site_id` ni `published_at IS NULL` | **P0 — riesgo de eliminar turnos publicados o de otras sedes; no certificar ni justificar con UI** |
| `setScheduleEmployeeHiddenAction` | `view`, actualización de `staff_schedule_hidden_employees` con `hidden_by/updated_by=null` | Permiso específico, scope de datos y autoría/auditoría |
| `getMonthlyOperationalViewAction` / `getScheduleHiddenEmployeeIdsAction` | `view` + cliente admin | Minimización por territorio en consulta y negativa ante sede manipulada |
| `return_to` de formularios | `month/actions.ts::redirectWithMessage` concatena `return_to` a `redirect` | Allowlist de retorno interno y pruebas de redirección manipulada: **riesgo sin explotación confirmada** |

**Resultado de seguridad:** `GUARD_PRESENT=YES`, `READ_PERMISSION_PRESENT=YES`, `MUTATION_LEAST_PRIVILEGE=FAIL_STATIC`, `SITE_SCOPING_OF_ALL_MUTATIONS=FAIL_STATIC`, `SHARED_DEVICE_AND_SIMULATION_E2E=NOT_RUN`, `BYPASS_OR_IDOR_EXPLOIT=NOT_TESTED`.

## 3. Reconciliación con requisitos existentes sin alterar 04A

| TREQ | Evidencia ahora / límite |
| --- | --- |
| `TREQ-VISO-004`, `006` | 61/48/13 por recuento local + fixture `main`; SHA exacto de enumeración formal pendiente |
| `TREQ-VISO-005` | `VISO-ROUTE-061` única ruta nueva prevista, sin renumerar 001..060 |
| `TREQ-VISO-012` | 59 protegidas y 2 públicas declaradas en fixture; denegaciones E2E pendientes |
| `TREQ-VISO-013` | Guard de **lectura** visto; acciones de escritura no cumplen separación de permisos |
| `TREQ-VISO-015` | Esta acta separa página/layout/componentes/acciones/handlers y registra drift de conteos |
| `TREQ-VISO-016` | 10 handlers enumerados, aparte de páginas; su seguridad individual se certifica fuera del alcance 061 |
| `TREQ-VISO-023` | Propietario `VPROC-0007`, aplicación, permiso actual y paquete vinculados; aceptación runtime pendiente |
| `TREQ-VISO-037/041/042/043/045` | Hallazgos `AUD21-F02/F03/F07/F09`; controles negados o sin E2E; prioridad P0 en eliminación masiva |

Se preservan **48 filas, 14 columnas, identificadores, relaciones y estados `IDENTIFICADO`** del 04A; las correcciones de reglas de jornada ya están en el PR #1055. No se reescriben filas E1 por una inspección de código. Un requisito nuevo o materialmente distinto exigirá cambio gobernado de las 14 columnas, no actualización encubierta de evidencias como si fueran aprobaciones.

## 4. Contradicción del orden canónico y resolución de dependencia

**Inconsistencia real:** el texto original de `AUTH-UI-061` declara `VISO-SCH-008` como dependencia, pero `VISO-SCH-008` exige `AUTH-UI-061` como entrada, y `90_ORDEN_DE_IMPLEMENTACION.md` ordena `CODE-AUD-021 → AUTH-UI-061 → VISO-SCH-001..008`. No pueden exigirse ambas dependencias al mismo tiempo para cerrar tareas.

**Resolución de planificación en este PR:** corregir solamente el campo **Dependencias** de la tarea `AUTH-UI-061` a `CODE-AUD-021`, commit estable y evidencias de ruta; declarar expresamente que **`VISO-SCH-008` es consumidor posterior de la salida `VISO-ROUTE-DELTA-001`**. Conservar el plan 90, la reserva E5, 04A, los VPROC y el orden físico sin alteración. La corrección de un ciclo documental **no acredita** que esas tareas hayan finalizado.

## 5. Pruebas obligatorias y cierre

| Control | Estado |
| --- | --- |
| `main` SHA exacto de VISO con ruta verificable | **PASS** |
| Identidad 061 sin renumeración histórica | **PASS estático** |
| Separación página / layout / componentes / acciones / handlers | **PASS estático** |
| Guard de acceso inicial, alcance `site_id` | **PRESENTE**, eficacia E2E pendiente |
| Permisos de escritura y eliminación masiva | **FAIL estático**, hallazgo P0 |
| 61/48/13/59/2/10/71 ejecutados sobre SHA exacto de main | **PENDING** (fixture y checkout con otro SHA) |
| Pruebas directas negativas sin login / sin permiso / sede ajena | **NOT RUN** |
| `TREQ-VISO-045` parámetros URL/form y `return_to` | **PENDING** |
| `04A` 14 columnas, sin renumeración ni cambio de estados | **PASS documental** |
| `AUTH-UI-061` cierre y `E5-GATE-008` | **BLOCKED** por seguridad/QA/contrato |

La salida de esta auditoría alimenta [`CODE-DELTA-VISO-SCHEDULE-001`](./CODE-DELTA-VISO-SCHEDULE-001.md), `VISO-SCH-007/008` y `DELIV-PKG` sin conceder autorización. No editar ramas GAP-PKG-004, AUTH ni QA Kernel, ni SQL STAGING/producción, ni inventario aprobado E1.

`AUTH_UI_061=STATIC_RECONCILIATION_PERFORMED_CLOSURE_BLOCKED` · `E5_GATE=NOT_APPROVED` · `VPROC_0007_E2E=PENDING`
