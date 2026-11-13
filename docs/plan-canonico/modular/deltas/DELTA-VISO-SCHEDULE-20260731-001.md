# DELTA-VISO-SCHEDULE-20260731-001 — Programación mensual VISO

## Estado

| Campo | Valor |
| --- | --- |
| Estado | `CONGELADO_PENDIENTE_DE_ESTABILIZACION` |
| Fecha | 2026-07-31 |
| Aplicación | `viso` |
| Repositorio | `devVentoGroup/vento-viso` |
| Migraciones | `devVentoGroup/vento-shell` |
| Proceso | `VPROC-0007` |
| Capacidad nueva | No |
| Proceso nuevo | No |
| Permiso nuevo | No aprobado |
| Commit estable | Pendiente |
| Package | `VISO-SCHEDULE-MONTHLY-001` — reservado |

## Propósito

Congelar la implementación local mientras se completa contrato funcional, reconciliación, seguridad, arquitectura, pruebas y paquete de despliegue.

## Archivos observados

`vento-viso`:

```text
src/app/staff/schedule/layout.tsx
src/app/staff/schedule/month/page.tsx
src/app/staff/schedule/month/actions.ts
src/app/staff/schedule/month/constants.ts
src/components/viso/schedule-view-switch.tsx
src/components/viso/monthly-shift-builder.tsx
```

`vento-shell`:

```text
supabase/migrations/20260731082600_viso_monthly_schedule_186_hour_publish_guard.sql
```

## Comportamiento congelado

1. Semana y mes son vistas del mismo proceso.
2. Mes representa 28, 29, 30 o 31 días.
3. Una operación rápida usa un trabajador y hasta 12 bloques.
4. Cada bloque tiene rol/área, inicio, fin, fechas y nota.
5. Una fecha pertenece a un solo bloque en el constructor rápido.
6. No admite overnight en esta modalidad.
7. Guarda `break_minutes = 0` provisionalmente.
8. Todo turno nuevo queda en borrador.
9. El preview suma actual, nuevas y proyectadas.
10. El total mensual agrega todas las sedes.
11. Advertencia provisional: 174 h.
12. Límite provisional: 186 h/11.160 min.
13. Borradores pueden exceder.
14. Publicación se bloquea por encima del límite.
15. Eliminación mensual solo afecta borradores.
16. Publicación notifica a ANIMA mediante el adaptador existente.

## Decisiones provisionales y propietario

| Decisión | Tarea |
| --- | --- |
| 186 h y 174 h | `VISO-SCH-004` |
| bloques, overnight, descansos | `VISO-SCH-003` |
| borrador/publicación/corrección | `VISO-SCH-005` |
| concurrencia y rollback | `VISO-SCH-006` |
| permisos, auditoría, notificación | `VISO-SCH-007` |

## Riesgos abiertos

- hardcode duplicado en TypeScript y PL/pgSQL;
- política no versionada;
- trigger row-level sin prueba de concurrencia;
- cliente administrativo para totales entre sedes;
- helper de acceso posiblemente demasiado amplio;
- versionado de periodo incompleto;
- ausencia de pruebas automatizadas;
- paridad semanal/mensual no certificada;
- notificación sin prueba de idempotencia;
- `SECURITY DEFINER` sin cierre de owner/grants;
- borrado masivo sin auditoría aprobada.

## Tareas nuevas

- `CODE-AUD-021`;
- `VISO-SCH-001` a `VISO-SCH-008`;
- `AUTH-UI-061`.

## Criterios de descongelación

- [ ] Commit estable.
- [ ] Build y typecheck.
- [ ] `CODE-AUD-021` ejecutada.
- [ ] `AUTH-UI-061` ejecutada.
- [ ] `VISO-SCH-001` a `008` aprobadas.
- [ ] Límite confirmado o sustituido.
- [ ] E3 clasifica función/trigger.
- [ ] `04A` completo actualizado.
- [ ] Package E5 aprobado.
- [ ] Pruebas y rollback.
- [ ] Piloto e hypercare.

```text
PRODUCTION_RELEASE_AUTHORIZED = false
CANONICAL_RULE_186H_APPROVED = false
ACTIVE_SEQUENCE_CHANGED = false
```

## Adenda de reconciliación — 2026-11-02 (candidata, no descongela)

**Motivo:** el responsable confirmó el defecto empresarial de publicación sobre `186 h` mensuales y solicitó **horas extra legales autorizables**, manteniendo horarios de trabajadores compartidos entre sedes. Esta adenda conserva las 16 observaciones históricas anteriores como **AS-IS** y no afirma que la regla haya sido sustituida en producción.

**Contrato objetivo propuesto:** [VISO-SCHEDULE-MONTHLY-001_E5_PREPARACION_HORAS_EXTRA.md](./VISO-SCHEDULE-MONTHLY-001_E5_PREPARACION_HORAS_EXTRA.md). Desde 15-07-2026, la jornada ordinaria máxima general es 42 h por semana; las horas suplementarias se controlan por jornada pactada, día/semana y excepciones legales, con límites generales 2 h extra diarias y 12 semanales. La distribución flexible pactada hasta 9 h diarias dentro de 42 h semanales puede ser ordinaria. El divisor salarial 210 h/mes no es límite de publicación; `186`/`188` no son topes legales mensuales generales. **La contratación y régimen particular requieren validación jurídica antes de habilitar el cambio.**

**Cambio gobernado de requisitos:** el `04A_08_VISO.md` conserva sus 48 filas `TREQ-VISO-001..048` y 14 columnas; actualiza exclusivamente el texto de la regla protegida de `032`, `033`, `034`, `035`, `036`, `039`, `040` y `043`. `TREQ-VISO-035` ya no debe prohibir toda publicación con extras: exige autorización comprobable y cumplimiento legal. No cambia los IDs de rutas, tareas, evidencia ni el estado `IDENTIFICADO`.

**Riesgos actuales pendientes de cierre:**
- VISO `month/constants.ts`, `month/page.tsx`, `month/actions.ts` y `month/block-actions.ts` emplean `186/174`; `publishWeekAction` carece de validación homogénea en TS.
- STAGING persistente `rcrxixmqhrndcervbllp` y producción `clzdpinthhtknkmefsxx` conservan trigger `trg_viso_monthly_schedule_publish_limit` y función `viso_enforce_monthly_schedule_publish_limit` con `11160` min; la función cuenta borradores en el total aun al publicar una selección. Se revisarán `SECURITY DEFINER`, owner, grants, RLS, concurrencia y atomicidad.
- La ruta de migración del expediente de julio es **referencia histórica**: no está presente en Shell `main@03d3be4a5f396ede66084c6ab217203f0f48c14c` ni en el historial remoto inspeccionado. No inventar historial ni sustituir migración antigua; la futura corrección exige migración **forward** generada por Supabase CLI y documentada en `vento-shell`, posterior al gate autorizado.
- `public.employees` no posee política de jornada pactada; `public.shift_policy` tiene reglas operativas distintas. Origen, titularidad y vigencia de la jornada individual siguen `BLOCKED`.
- VISO typecheck en `fix/gap-pkg-004-viso-qa@94d3b8fd` PASS; suite `npm test` FAIL (46/47 PASS por ausencia de contenedor Docker QA identificado en prueba SSR GAP-PKG-004, no por cálculo de extras). Shell comprobó integridad 7.066 TREQ y frontera vigente GAP-PKG-004; no hay QA nueva de horas extra ni E2E VISO→ANIMA.

**Estado real:** `CODE-AUD-021=PENDING`, `AUTH-UI-061=PENDING`, `VISO-SCH-001..008=PENDING_APPROVAL`, `DELIV-PKG-001..025::VISO-SCHEDULE-MONTHLY-001=PENDING`, `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001=NOT_APPROVED`, `SHELL-CI-020=NOT_STARTED`, `PRODUCTION_RELEASE_AUTHORIZED=false`.

**Continuidad:** cerrar contrato laboral por contrato/semana y la auditoría sobre SHA estable; revalidar `04A` y acta `AUTH-UI-061`; luego compilar expediente E5, pruebas, respaldo y rollback. La rama de esta adenda es **DRAFT documental**, no autoriza implementación física ni altera la frontera de GAP-PKG-004.
