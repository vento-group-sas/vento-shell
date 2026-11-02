# CODE-DELTA-VISO-SCHEDULE-001 — Auditoría técnica real del delta mensual VISO

> **Tarea:** `CODE-AUD-021` · **Corte:** 2026-11-02 · **Resultado:** `STATIC_AUDIT_PERFORMED / CLOSURE_BLOCKED`. Esta acta es un resultado de inspección estática y lectura SQL, **NO** un `CODE-AUD-021 COMPLETE`, `VISO-SCH-008`, E5 ni una certificación de seguridad/E2E.

## 1. Identidades, fuentes y distinción de evidencias

- Código fuente auditado: [`vento-viso/main@3820ea02fdd8e6492a95c659a60a83a9210939e0`](https://github.com/vento-group-sas/vento-viso/commit/3820ea02fdd8e6492a95c659a60a83a9210939e0). `GitHub compare main...SHA` devolvió **identical**, ahead=0, behind=0; se leyeron archivos por ese ref en GitHub.
- **Inventario de archivos local, fuente secundaria:** `vento-viso/fix/gap-pkg-004-viso-qa@94d3b8fd72309a3f8e71f055c31fc7c2b6e0587b`, árbol limpio. El SHA es **distinto** y el commit local no se resolvió en GitHub; sus conteos **no certifican por sí solos** el árbol de `main`.
- Fuente normativa y administrativa: `90_ORDEN_DE_IMPLEMENTACION.md`; `E1/.../04B_RECONCILIACION_DELTA_VISO_PROGRAMACION.md`; `G_VISO/01A_PROGRAMACION_LABORAL.md`; `I/.../07_RECONCILIACION_DE_DERIVA_POSTERIOR.md`; `04A_08_VISO.md`; `DELTA-VISO-SCHEDULE-20260731-001.md`. Los snapshots antiguos se preservan.
- DB: consultas **SELECT exclusivamente** el 2026-11-02 en la rama STAGING persistente `rcrxixmqhrndcervbllp` y, separadamente, en producción legada `clzdpinthhtknkmefsxx`; no se consultaron registros nominativos.
- Seguimiento: [VISO #20](https://github.com/vento-group-sas/vento-viso/issues/20), [Shell #1038](https://github.com/vento-group-sas/vento-shell/issues/1038) y [PR #1055 DRAFT](https://github.com/vento-group-sas/vento-shell/pull/1055).

## 2. Inventario realmente inspeccionado y diferencias con julio

| Superficie | Baseline/esperado del delta congelado (julio) | Evidencia nueva | Interpretación |
| --- | --- | --- | --- |
| Páginas `page.tsx` de VISO | 60 → **61** | **61** rutas de archivo en worktree local; 61 en fixture contractual de `main` | Coincidencia de cantidad; falta árbol exacto automatizado para SHA de `main` |
| Rutas estáticas / dinámicas | 47 → **48** / **13** | **48 estáticas, 13 dinámicas** clasificadas por segmentos `[id]`/`[slug]` en los 61 archivos locales; fixture de `main` coincide | Evidencia estática compatible, sin prueba de acceso a todas |
| Route handlers | **10** | **10** archivos `route.ts` contados localmente, separados de páginas | Conteo observado, no E2E de handlers |
| Layouts `src/app/**/layout.tsx` | 9 → **10** | **4** archivos locales: raíz, calendario, programación y programación mensual | **DRIFT de métrica/no equivalencia**; no afirmar 10 ni renumerar por el baseline |
| Componentes `src/components/**/*` | 290 → **292** (métrica histórica sin algoritmo actual) | **49 TSX** locales dentro de `src/components`, de ellos **41** en `src/components/viso` | Métrica NO comparable al total antiguo; existen componentes inline y otras rutas; falta definición de granuralidad |
| Server Action archivos | 101 → **102** (global); 41 → **42** (VISO) | En `src/app/staff/schedule`: **5 módulos explícitos**, **22 funciones `export async function`** en `main` (14 semanales + 4 mensuales legacy + 1 bloque nuevo + 1 lectura operacional + 2 visibilidad) | `actions.ts` exacto: 2 archivos; nombre `*-actions.ts`: otros 3; total global 102/42 **no verificado** |
| Ruta mensual | `/staff/schedule/month` nueva, ID `VISO-ROUTE-061` | Página, layout, componentes, guard y selector presentes en el código `main` | Ruta REAL; contrato `AUTH-UI-061` sigue en auditoría |

No sumar handlers, layouts, acciones o componentes como páginas; no sustituir cifras históricas de agosto/julio por métricas de otra semántica. La evidencia local es de un SHA distinto; `TREQ-VISO-004/006/015/023` requieren revalidación automatizada sobre commit final de VISO.

## 3. Frontera de código del planner actual

| Objeto | Fuente concreta y observación |
| --- | --- |
| Vista mensual | [`src/app/staff/schedule/month/page.tsx`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/month/page.tsx) · página autenticada, consulta de `sites`, turnos por sede y totales por trabajador en todas las sedes |
| Layout del planner | [`month/layout.tsx`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/month/layout.tsx) · incorpora `MonthlyScheduleOrganizer` |
| Selector | [`schedule-view-switch.tsx`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/components/viso/schedule-view-switch.tsx) · Semana/Mes en layout de `/staff/schedule` |
| Constructor rápido | [`monthly-shift-builder.tsx`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/components/viso/monthly-shift-builder.tsx) → `createMonthlyScheduleBlocksAction` |
| Acciones mensuales históricas | [`month/actions.ts`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/month/actions.ts) · `createMonthlyShiftsAction`, `deleteMonthlyDraftShiftAction`, `deleteMonthlyDraftsAction`, `publishMonthAction` |
| Acción de bloques nueva | [`month/block-actions.ts`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/month/block-actions.ts) · `createMonthlyScheduleBlocksAction`; máximo 12 bloques y `break_minutes=0` |
| Acciones auxiliares | `month/operational-view-actions.ts` lectura; `month/visibility-actions.ts` lectura/actualización de ocultamiento de personal |
| Acciones semanales | [`staff/schedule/actions.ts`](https://github.com/vento-group-sas/vento-viso/blob/3820ea02fdd8e6492a95c659a60a83a9210939e0/src/app/staff/schedule/actions.ts) · 14 acciones exportadas, incluyen `publishWeekAction`, `deleteManyShiftAction`, turnos, asistencia a planificación y reglas |
| Fuente compartida | `public.employee_shifts`; `employees`; `employee_sites`; `sites`; vista `vento_site_operational_role_matrix_v1`; `employee_site_operational_profiles`; `staff_schedule_hidden_employees`; adaptador `notifyShiftChange` a ANIMA |

## 4. Hallazgos priorizados, asignados a tareas existentes

| ID de hallazgo | Prioridad | Evidencia del commit `3820ea02` / SQL alojado | Destino y estado |
| --- | --- | --- | --- |
| `AUD21-F01` | **P0** | `month/constants.ts`: 186 h, 174 h; `month/page.tsx` y `publishMonthAction` bloquean más de 11.160 min aun cuando extras son legales | `VISO-SCH-004`, `TREQ-VISO-032/034/035/036`: **FAIL funcional AS-IS** |
| `AUD21-F02` | **P0** | `requireStaffScheduleAccess` exige solo `staff.schedule.view`; se usa también para crear, editar, borrar, publicar y ocultar; las acciones mutan con `createAdminClient` | `AUTH-UI-061`, `VISO-SCH-007`, `AUTH-SRV-005`, `TREQ-VISO-013/037/042/045`: **sin segregación de permisos acreditada** |
| `AUD21-F03` | **P0** | `staff/schedule/actions.ts::deleteManyShiftAction` usa `.delete().in('id', shiftIds)` sin filtro `published_at IS NULL`, sin `site_id` explícito y con permiso de lectura | `VISO-SCH-005/007`, `TREQ-VISO-041/042/043`: **ruta potencial de eliminación de turnos publicados o ajenos, requiere prueba negativa** |
| `AUD21-F04` | Alta | SQL de STAGING y producción: trigger habilitado `BEFORE INSERT OR UPDATE` por fila, función `SECURITY DEFINER` propiedad de `postgres`, `search_path=public`, permiso `EXECUTE` efectivo para `anon/authenticated`; lee borradores y publicados | `VISO-SCH-006/007`, `SUPA-TRANS` aplicables; **auditoría de seguridad pendiente**; `RETURNS trigger` no es una RPC directamente invocable como función normal |
| `AUD21-F05` | Alta | Publicación de mes y semana: UPDATE SQL y después `notifyShiftChange`; no se observó outbox durable ni `idempotency_key` de versión; reintento y fallo después de UPDATE pueden divergir de ANIMA | `VISO-SCH-005/006/007`, `TREQ-VISO-039/043/044`: **E2E y recuperación pendientes** |
| `AUD21-F06` | Alta | `month/actions.ts` compara antes de UPDATE un snapshot del total de todas las sedes; el trigger valida fila a fila y suma también borradores no seleccionados. `publishWeekAction` no hace el mismo preflight TS | `VISO-SCH-004/006`, `TREQ-VISO-033/036/038/039`: **paridad y concurrencia sin certificar** |
| `AUD21-F07` | Alta | `month/actions.ts::redirectWithMessage` usa `return_to` de FormData sin permitir-lista de rutas observada; `redirect` recibe ese valor concatenado. Revisar redirección externa y parámetros manipulados | `AUTH-UI-061`, `AUTH-SRV-004`, `TREQ-VISO-045`: **posible open redirect; no explotabilidad demostrada** |
| `AUD21-F08` | Alta | `page.tsx` usa cliente administrativo después del guard con contexto de sede, pero lee inicialmente catálogo de sedes y totales de todas las sedes por trabajador | `VISO-SCH-007`, `AUTH-SRV-012`, `TREQ-VISO-033/042`: **revalidar minimización/territorio en SSR** |
| `AUD21-F09` | Alta | `deleteManyShiftAction` carece de reversa/auditoría propia de eliminación; `month/visibility-actions.ts` cambia estado global con `hidden_by/updated_by=null` | `VISO-SCH-005/007`, `AUTH-SRV-011/014`, `TREQ-VISO-041/043`: **auditoría y reversa no certificadas** |
| `AUD21-F10` | Bloqueante | Migración histórica `20260731082600_viso_monthly_schedule_186_hour_publish_guard.sql` citada en delta **NO está en `vento-shell/main`**; manifest canónico actual inicia en baseline y migraciones 20260826+. SQL alojado existe; rollback específico no localizado | `CODE-AUD-021`, `VISO-SCH-006/008`, `SUPA-TRANS-013/015`, `AUTH-DB-028/029`: **lineage, restore y forward pendiente** |
| `AUD21-F11` | Alta | VISO `employees` y `shift_policy` no modelan la jornada pactada/versionada ni aprobación individual de extras; la duración del turno no prueba horas efectivamente laboradas | `VISO-SCH-001/004/008`, `TREQ-VISO-032/034/043`: **contrato y fuente de verdad pendiente** |

**Precisión técnica:** el UPDATE SQL único puede ser atómico como sentencia; **no** se certifican locks entre transacciones ni consistencia con avisos externos. No se afirmará un `SECURITY DEFINER` explotable por la sola existencia de `EXECUTE` sobre una función de trigger.

## 5. Resultado QA real y límites

| Ejecución | SHA/entorno | Resultado y lectura |
| --- | --- | --- |
| `npm run typecheck` VISO | checkout local `94d3b8fd` (distinto de main) | **PASS** en ejecución anterior, no válido como QA del SHA `3820ea02` |
| `npm run test` VISO | mismo checkout `94d3b8fd` | **FAIL** global: 46/47 PASS, falla `QA_DOCKER_DATABASE_CONTAINER_MISSING_OR_AMBIGUOUS` en prueba SSR GAP-004 |
| `npm run lint` VISO | checkout local | **BLOCKED**: herramienta respondió `LOCAL_APPROVAL_PENDING_IN_VSCODE`; sin ejecución |
| `npm run build` VISO | commit `3820ea02` | **NOT RUN**; no atribuir build ajeno |
| Validaciones Shell PR #1055 | SHA independiente del registro documental | CI plan y Required Gate **PASS antes de esta acta**, no acreditan calidad runtime de VISO |
| pgTAP extra/legalidad, publicación concurrente, rollback | STAGING/QA físico del paquete | **NOT RUN**; no mutaciones remotas |

**Aceptación `CODE-AUD-021`:** commit y fuentes estáticas fijados; guard y acciones inspeccionados; hallazgos ligados a propietarios; historia preservada; entrega a `AUTH-UI-061` preparada. **PENDIENTES para cierre:** conteos globales con definición única sobre SHA exacto, lint/typecheck/build/test del mismo SHA, migración con rollback probado, autorización negativa y concurrencia, seguridad del `SECURITY DEFINER`, notificación ANIMA E2E.

## 6. Continuidad gobernada

1. Usar esta auditoría como entrada de `VISO-ROUTE-DELTA-001` y `VISO-SCH-001..008`; no marcar `CODE-AUD-021` ni `AUTH-UI-061` aprobadas por su sola creación.
2. Resolver los hallazgos P0 antes de aceptar publicación de horas extra o certificar VPROC-0007. Las correcciones físicas a VISO y SQL pertenecen a un paquete autorizado después de su `E5-GATE-008` aplicable; migraciones forward solo creadas con Supabase CLI y conservadas en `vento-shell`.
3. Preservar `GAP-PKG-004` como frontera determinista vigente, worktrees de AUTH y QA Kernel, `04A` de 14 columnas y los 69 VPROC. No cambiar ningún estado E2E/producción sin evidencia real.

`CODE_AUD_021=CLOSURE_BLOCKED` · `AUDIT_STATIC=PERFORMED` · `REMOTE_MUTATIONS=0` · `E5_GATE=NOT_APPROVED` · `VPROC_0007_E2E=PENDING`
