### MINI-BLOQUE — CONTRATO FUNCIONAL DE PROGRAMACIÓN LABORAL

<!-- PLAN-SECTION-META:START -->
**Cobertura canónica:** `VISO-SCH-001` a `VISO-SCH-008` — 8 tareas.
<!-- PLAN-SECTION-META:END -->

### [ ] VISO-SCH-001 — Definir contrato funcional de programación laboral

Fijar frontera de `VPROC-0007`, unidad, periodo, trabajador, sede, área, rol, turno, versión y relación con ANIMA. Semana y mes son proyecciones del mismo proceso/fuente.

### [ ] VISO-SCH-002 — Definir horizontes semanal y mensual

Definir navegación, 28/29/30/31 días, zona horaria, cambio de año, contexto y responsabilidades de cada vista.

### [ ] VISO-SCH-003 — Definir bloques, fechas, duración y modalidad rápida

Decidir máximo de bloques, exclusividad de fecha, turnos partidos, overnight, duración, descansos, notas, presets y edición. Los valores actuales son provisionales.

### [ ] VISO-SCH-004 — Definir límites mensuales, advertencias, vigencia y excepciones

Resolver valor, unidad, redondeo, aplicación global/contrato/trabajador, vigencia, meses parciales, ausencias, extras, advertencias, excepciones, autoridad y auditoría. `186 h` y `174 h` son provisionales.

### [ ] VISO-SCH-005 — Definir borrador, revisión, publicación y corrección

Mapear a estados de `VPROC-0007` y definir alcance/atomicidad de publicación y corrección.

### [ ] VISO-SCH-006 — Definir conflictos, integridad, concurrencia y recuperación

Cubrir solapamientos, disponibilidad, descansos, límites, territorio, concurrencia, idempotencia, rollback, estado parcial y corrección versionada.

### [ ] VISO-SCH-007 — Definir autorización, auditoría, eventos y notificaciones

Diferenciar consultar, crear, modificar, eliminar borrador, revisar, publicar, corregir y autorizar excepción. Vincular actores, simulación, territorio, `published_by`, eventos y ANIMA.

### [ ] VISO-SCH-008 — Aprobar contrato de programación antes de E5

Exige `CODE-AUD-021`, `AUTH-UI-061`, límite resuelto, datos/publicación definidos, `04A`, pruebas, rollback y ausencia de fuente competidora.

### Requisitos

Materializar `TREQ-VISO-024` en adelante desde el `04A` local completo al desarrollar estas tareas.

### Conciliación candidata de jornada y horas extra (2026-11-02)

**Esta sección NO cierra las ocho tareas ni sustituye su aprobación.** [Expediente E5 candidato](../../deltas/VISO-SCHEDULE-MONTHLY-001_E5_PREPARACION_HORAS_EXTRA.md) y [delta histórico/adenda](../../deltas/DELTA-VISO-SCHEDULE-20260731-001.md). El paquete continúa `MATURING`.

- **VISO-SCH-001/002:** turnos `public.employee_shifts` de todas las sedes del trabajador, fuente única semana/mes y cálculo diario/semanal en `America/Bogota`, incluidos cruces de mes/año y meses de 28 a 31 días.
- **VISO-SCH-003:** política explícita de pausas, descansos, turnos partidos y overnight; no asumir que `break_minutes=0` satisface el descanso legal.
- **VISO-SCH-004:** sustituir el tope mensual provisional `186 h` y la advertencia `174 h` por jornada ordinaria pactada y vigente (máximo general 42 h/semana desde 15-07-2026), autorizaciones de extras y controles diarios/semanales (límite general 2 h extra/día y 12/semana, con excepciones legales fundamentadas). Los totales mensuales son un **desglose**, no tope duro de publicación; el divisor salarial 210 es ajeno al máximo de turnos.
- **VISO-SCH-005:** publicar turnos con extras legales **autorizadas**; denegar los que incumplan normativa, contrato o autorización. Borrador, revisión, autorización, publicación y corrección son acciones distintas.
- **VISO-SCH-006:** sumar todas las sedes y semanas completas, bloquear solapes, asegurar atomicidad e idempotencia ante concurrencia, conservar reversa versionada.
- **VISO-SCH-007:** permisos granulares, alcance territorial, auditoría de actor/política y notificación recuperable/idempotente a ANIMA; las horas programadas **no** prueban horas realmente laboradas.
- **VISO-SCH-008:** `CODE-AUD-021`, `AUTH-UI-061`, 04A de 14 columnas, contrato individual, política laboral, pruebas, rollback y `DELIV-PKG-001..025` **pendientes**; no aprobar `E5-GATE-008` ni `SHELL-CI-020` sin evidencia nueva.

**04A gobernado:** solo se actualizó el texto de las reglas protegidas de `TREQ-VISO-032/033/034/035/036/039/040/043`; se conservaron los 48 IDs, catorce columnas, relaciones, estados y artefactos de prueba. Las tareas siguen sin evidencia E2E.
