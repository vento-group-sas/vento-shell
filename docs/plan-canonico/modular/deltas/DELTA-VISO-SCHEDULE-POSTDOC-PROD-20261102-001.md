# DELTA-VISO-SCHEDULE-POSTDOC-PROD-20261102-001 — Excepción productiva posterior al snapshot canónico

## Identidad y estado de la reconciliación

| Campo | Valor |
| --- | --- |
| Fecha del hecho | 2026-11-02 (America/Bogota) |
| Naturaleza | `CAMBIO_POSTDOCUMENTACION / DESVIACION_EJECUTADA_FUERA_DE_SECUENCIA` |
| Estado documental de esta adenda | `PROPUESTA_PENDIENTE_DE_REVISION`; no se autodeclara aprobada |
| Aplicación y propietaria | VISO, `VPROC-0007`, `CAP-02.06` |
| Consumidora principal | ANIMA (comunicación de turnos; E2E no certificada) |
| Paquete canónico | `VISO-SCHEDULE-MONTHLY-001` — reservado; implementación integral pendiente |
| Cambio del catálogo | Cero procesos, capacidades, aplicaciones, paquetes o identificadores TREQ nuevos |
| E1 histórico | Se conserva `DELTA-VISO-SCHEDULE-20260731-001` tal como fue aprobado/congelado |
| Gate E5 del paquete | `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001 = PENDING` |
| Proceso funcional | `VPROC-0007 = PARTIAL / E2E_PENDING`; no declarar COMPLETE |
| Entorno real | Supabase producción padre `clzdpinthhtknkmefsxx`; STAGING = rama persistente `rcrxixmqhrndcervbllp`, intacta |

**Propósito:** registrar una modificación correctiva de producción ocurrida después de los snapshots y del diseño documental, sin ocultar que se ejecutó antes de la puerta E5, sin reescribir el AS-IS histórico y sin elevar una QA técnica a aceptación de proceso.

## 1. Hecho posterior a documentación: antes y después

| Aspecto | Snapshot previo / estado anterior | Estado realmente observado el 2026-11-02 |
| --- | --- | --- |
| Umbral mensual de advertencia | `174 h` provisional en el delta E1 (no regla legal aprobada) | La UI del hotfix usa referencia salarial de `210 h` y proyección semanal; la cifra mensual no autoriza ni liquida horas extra |
| Bloqueo de publicación | Trigger PostgreSQL con límite fijo de `11.160 min = 186 h/mes` | Reemplazado: no existe bloqueo fijo de 186 h/mes |
| Defensa de publicación activa | Límite mensual, incluso con turnos legales en distintas semanas | Guard general de `54 h/semana` y `11 h/día`, sumando sedes de cada trabajador |
| Control administrativo | Regla mensual insuficiente; permiso y revisión pendientes de unificación | La Server Action de publicación exige `staff.manage` por sede y confirmación de revisión; no acredita contrato personal |
| Duración ordinaria pactada | `VISO-SCH-004` debía resolver contrato, vigencia y excepción | Todavía no se verifica ni incorpora automáticamente la jornada ordinaria contractual por trabajador |
| Autorización individual de extras | Pendiente de diseño y aceptación | **NO implementada en producción**: la segunda migración candidata no se aplicó |
| Preservación histórica | Turnos existentes y eventos debían conservarse | Después de la migración SQL, se observaron `4.815` turnos y `4.373` publicados, sin cambio de esos conteos; no es E2E |
| Notificación a ANIMA | Adaptador existente, idempotencia sin acreditar | No existe certificación E2E real de notificación o reversión |

**Limitación crítica:** `54 h/semana` y `11 h/día` son defensas generales del hotfix, **no** una política laboral individual aprobada. El máximo diario de 11 h no acredita por sí solo el acuerdo flexible de nueve horas ordinarias ni la autorización de dos horas adicionales. El hotfix no sustituye ANIMA/NUMERA, asistencia real, recargos, liquidación, descansos ni permisos de excepción por trabajador.

## 2. Evidencia física exacta, sin confundir candidato con producción

| Capa | Identidad y resultado |
| --- | --- |
| VISO producción | [`viso.ventogroup.co`](https://viso.ventogroup.co), Vercel deployment `dpl_3m5mntrBBrs3nmiQL5uic28F9Rh5`, estado `READY`, commit desplegado `01eaf4b88b3295620dca7e081a6a82e9b170aa3c` |
| Rama de release VISO | `hotfix/viso-prod-overtime-release-20261102`; commit exacto anterior; no hay merge acreditado a `main` |
| QA código del release | [VISO GitHub Actions #41497990955](https://github.com/vento-group-sas/vento-viso/actions/runs/41497990955), `SUCCESS` en ese commit (pruebas de origen, proyección, tipos, lint y build) |
| SQL fuente creado con Supabase CLI | [`20261102182951_viso_prod_monthly_overtime_publish.sql`](https://github.com/vento-group-sas/vento-shell/blob/hotfix/viso-prod-overtime-sql-20261102/supabase/migrations/20261102182951_viso_prod_monthly_overtime_publish.sql) — SQL forward concreto, propiedad de Shell |
| Registro real de migración alojada | Proyecto `clzdpinthhtknkmefsxx`: versión **`20261102195239`**, nombre **`viso_prod_monthly_overtime_publish`**, aplicado mediante MCP `apply_migration`, luego del baseline `00000000000000` |
| Comprobación DB tras aplicar | `weekly_guard=true`, `daily_guard=true`, `old_186_live=false`; exactamente `1` trigger activo para la función |
| QA SQL aislada | [Laboral y rollback PG16/17 #41509425559](https://github.com/vento-group-sas/vento-shell/actions/runs/41509425559) y [regresión SQL PG16/17 #41509425651](https://github.com/vento-group-sas/vento-shell/actions/runs/41509425651), ambos `SUCCESS` en Shell `4bfcad73f846065ee1768b6b2c01b5d1e4547cab` |
| Segunda migración contractual | [`20261102184824_viso_employee_labor_terms_week_authorizations.sql`](https://github.com/vento-group-sas/vento-shell/blob/hotfix/viso-prod-overtime-sql-20261102/supabase/migrations/20261102184824_viso_employee_labor_terms_week_authorizations.sql) — **solo candidata, NO aplicada** |
| PR de alcance más amplio | [VISO #22](https://github.com/vento-group-sas/vento-viso/pull/22) permanece `DRAFT` en SHA `07616eeb0e8ef588f5af9bb01f406477855b896e`; **ese SHA no es el desplegado** |
| Estado de entornos | Producción padre afectada exclusivamente; no escribir ni tomar como destino de este cambio la rama STAGING persistente |

**Deriva de identidad de migración a conciliar:** el nombre físico del archivo SQL en Shell empieza por `20261102182951`, pero la migración **registrada** en Supabase producción es `20261102195239`. El contenido forward proviene de ese archivo; ambas identidades deben conservarse explícitamente en el expediente y ser reconocidas por el inventario de migraciones. **No renombrar ni duplicar a ciegas migraciones, no hacer `supabase db push` global**, y no afirmar que un archivo con el timestamp del CLI es el mismo registro temporal que el alojado.

La prueba de rollback del SQL original fue satisfactoria **solo en PostgreSQL aislado**: 192 h/mes rechazadas, 184 h/mes aceptadas y tablas de ensayo preservadas. **No se verificó una restauración real de respaldo productivo**, ni pruebas E2E con usuario/actor autenticado para la publicación superior a 186 h.

## 3. Desviación del orden canónico: registro sin aprobación retroactiva

El plan vigente ordena `CODE-AUD-021 → AUTH-UI-061 → VISO-SCH-001..008 → DELIV-PKG → E5-GATE-008 → SHELL-CI-020 → BLOQUE R → readiness/cutover/hypercare`. El release urgente de 2026-11-02 se materializó antes de completar esa secuencia y su gate.

- **Decisión operativa efectiva:** el responsable solicitó corregir urgentemente la producción existente y no crear un segundo proyecto Supabase. Se ejecutó el alcance técnico limitado de SQL y web.
- **No equivale a autorización canónica E5:** esa instrucción y el éxito técnico **no** satisfacen `E5-GATE-008`, `READY-GATE-012`, `VISO-SCH-008` ni `PROC-COVER-007`.
- **Clasificación de gobierno:** excepción postdocumentación **ya ejecutada**, con incumplimiento de secuencia documental/operativa; registrar hechos, responsables, evidencia, riesgo y acciones correctivas. No inventar un gate PASS ex post, ni reescribir el snapshot congelado.
- **Frontera física:** el hotfix mínimo ejecutado no habilita por inferencia el segundo esquema de contratos, grants nuevos, migraciones masivas, una integración ANIMA/NUMERA ni el despliegue del PR #22 completo.

**Estado de esta conciliación:** la adenda evidencia lo ocurrido y propone la regularización; su incorporación/aprobación deberá seguir revisión documental de Shell. El alcance del proceso integral y el flujo canónico futuro mantienen intactos sus requisitos y su orden.

## 4. Impacto sobre fuentes canónicas y reconciliación requerida

| Fuente / identidad | Impacto real | Tratamiento |
| --- | --- | --- |
| E1, snapshot `DELTA-VISO-SCHEDULE-20260731-001` | Descripción histórica de `174/186` ya no representa runtime | **Conservar como historial**; este delta nuevo documenta el cambio |
| `04B / CODE-AUD-021` | Inventario anterior a release y deriva de ruta/acción/trigger | Reevaluar en commit desplegado y también PR #22; dejar tarea abierta |
| E2, `VPROC-0007` / `PROC-CAT-005` | Solo un proceso VISO, sin cambiar propietaria ni consumidora ANIMA | Conservar `PARTIAL` y todos los gates de `PROC-COVER-007` |
| `G_VISO / VISO-SCH-001..008` | `VISO-SCH-004` más afectada; `005/006/007/008` vinculadas | Sin marcar aprobadas; completar política contractual, vigencia, permisos y casos reales |
| E3, `SUPA-TRANS` y BLOQUE R | Trigger de producción distinto del estado documental previo; timestamp de migración diverge del archivo fuente | Vincular ambas identidades y evaluar rollback/seguridad sin tocar otros esquemas |
| 04A, `TREQ-VISO-032..044` | Reglas sobre límite mensual, umbral, publicación, concurrencia, auditoría e integración deben recalibrarse | **Cambio de requisitos detectado; modificación 04A PENDIENTE** de regeneración completa y aprobación |
| E5, `VISO-SCHEDULE-MONTHLY-001` | Despliegue físico anterior a `E5-GATE-008` | Registrar desviación; puertas y E2E siguen pendientes, sin regularizar por declaración |
| #1020 / fundaciones compartidas | No se creó paquete `@vento/*` ni se modificó fundación | **Sin cambio técnico ni nuevo estado en #1020** |
| POS PULSO y otros `VPROC` | No participan | Conservar sus estados; sin expansión de alcance |

### Requisitos de prueba 04A directamente relacionados

- `TREQ-VISO-032`: sustituir la interpretación de un **bloqueo mensual fijo** por política versionada de jornada individual ordinaria y extras; el total mensual es información/referencia, no techo legal universal.
- `TREQ-VISO-033/034`: conservar total multisede sin fuga territorial y exigir una misma política efectiva en frontend, backend y PostgreSQL; la fórmula genérica actual no cumple plenamente la contractual.
- `TREQ-VISO-035/036/037`: diferenciar borrador y publicación y garantizar la misma validación al publicar semana o mes; no bloquear por superar 186 h/mes si el conjunto semanal/diario es válido.
- `TREQ-VISO-038/039/040`: validar conflictos, atomización y concurrencia; las pruebas sintéticas PG16/17 son evidencia técnica parcial, no recuperación productiva.
- `TREQ-VISO-041`: borrado masivo solo de borradores; **no ha cambiado su requisito**.
- `TREQ-VISO-042/043/044`: permisos territoriales, identidad/actor, auditoría de la política y notificación ANIMA idempotente; continuarán sin E2E/aceptación integral.
- `TREQ-VISO-045`: pruebas negativas de formularios y Server Actions relevantes para la evolución de VISO; conservar como dependencia de seguridad, no marcar verificadas implícitamente.

**Gobierno obligatorio de 04A:** preservar los `TREQ` existentes, catorce columnas, orden, relaciones, estados e historia. Como existe modificación semántica, **deberá** aplicarse el procedimiento de regeneración del registro lógico completo desde la fuente modular `04A_00..04A_20` y sus validadores, **no** editar filas manuales sueltas, crear `TREQ_NUEVOS_*` ni cambiar solo un compilado. Esta adenda **no modifica 04A** ni reclama haber satisfecho ese paso.

## 5. Riesgos y cierre pendiente (sin falsas aprobaciones)

| Control | Estado al corte | Condición concreta para cerrar |
| --- | --- | --- |
| SQL hotfix instalado y leído de vuelta | `PASS TÉCNICO EN PRODUCCIÓN` | Mantener seguimiento de SQL exacto y deriva del ledger |
| VISO release SHA correcto y dominio real | `PASS TÉCNICO EN PRODUCCIÓN` | Conservar ID de despliegue y SHA |
| Pruebas sintéticas de concurrencia y rollback | `PASS EN LABORATORIO` | No sustituir E2E ni restore real |
| Contrato individual, flexibilidad, autorización de extra por empleado | `PENDIENTE` | Política/soportes laborales, referencias ANIMA válidas, autoridad efectiva y esquema gobernado |
| Fuente documental laboral | `RIESGO ABIERTO` | En ANIMA: 13 registros de contrato aprobados con vencimiento de mayo/junio 2026 y `approved_at` ausente; revisar sin alterar soportes ni suponer validez |
| Backup/restauración productiva | `NO VERIFICADO` | Evidencia recuperable del mismo sistema, sin exigir por esta adenda proyecto adicional ni registrar PASS ficticio |
| Prueba E2E VISO→PostgreSQL→ANIMA | `PENDIENTE` | Publicar un mes real con actor/sede autorizados y escenarios de exceso mensual permitido, rechazo semanal, reversa y notificación |
| `CODE-AUD-021`, `AUTH-UI-061`, `VISO-SCH-001..008` | `ABIERTAS` | Reconciliar sobre commits exactos y cerrar por sus propietarios |
| Regeneración de 04A / `TREQ-VISO-032..044` | `PENDIENTE` | 14 columnas y verificaciones completas con revisión documental |
| `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001` | `PENDING` | Completar alcance del paquete y registrar evaluación real, no ratificación automática |
| `VPROC-0007` / 12 gates `PROC-COVER-007` | `PARTIAL / E2E_PENDING` | Aceptación integral del proceso, incluidas excepciones, integración y auditoría |

**Resultado de la adenda:** cambio postdocumentación identificado y trazable; excepción de secuencia declarada; datos físicos, SHA, migración real y alcance diferenciados del candidato completo. **No cambia por sí sola** el plan activo, 04A, prioridades, permisos, E5, ni estados `COMPLETE`; propone la continuidad de regularización para revisión y aprobación.

## Referencias

- [Tablero funcional #1038](https://github.com/vento-group-sas/vento-shell/issues/1038).
- [Incidencia propietaria VISO #20](https://github.com/vento-group-sas/vento-viso/issues/20).
- [PR VISO #22: contrato integral aún DRAFT](https://github.com/vento-group-sas/vento-viso/pull/22).
- [Expediente SQL de candidato y rollback — rama Shell aislada](https://github.com/vento-group-sas/vento-shell/blob/hotfix/viso-prod-overtime-sql-20261102/docs/plan-canonico/modular/deltas/VISO_PRODUCTION_OVERTIME_SQL_CANDIDATE_20261102.md).
