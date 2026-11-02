### MINI-BLOQUE — RECONCILIACIÓN DE DELTAS POSTERIORES AL SNAPSHOT E1

<!-- PLAN-SECTION-META:START -->
Esta sección registra reconciliaciones técnicas posteriores a snapshots aprobados sin reescribirlos ni reabrir E1 en bloque.

**Cobertura canónica:** `CODE-AUD-021` — 1 tarea.
<!-- PLAN-SECTION-META:END -->

### [ ] CODE-AUD-021 — Reconciliar el delta técnico de programación mensual VISO

**Estado:** AUDITORÍA ESTÁTICA DOCUMENTADA; VALIDACIONES Y CIERRE PENDIENTES  
**Delta:** `DELTA-VISO-SCHEDULE-20260731-001`  
**Dependencias:** commit estable; migración documentada; snapshots `CODE-AUD-*` aprobados  
**Salida:** `CODE-DELTA-VISO-SCHEDULE-001`

#### Alcance

1. Recontar rutas, layouts, componentes, formularios y acciones.
2. Registrar `/staff/schedule/month` y guard.
3. Registrar layout y dos componentes nuevos.
4. Inventariar cuatro Server Actions.
5. Vincular tablas, vistas, perfiles y matriz de roles.
6. Vincular notificación ANIMA.
7. Inventariar función, trigger y migración.
8. Ejecutar build, typecheck, lint y pruebas.
9. Auditar autorización.
10. Auditar concurrencia, idempotencia, transacción y rollback.
11. Actualizar implementación verificable de programación.
12. Destinar todo hallazgo.

#### Deltas esperados sujetos a ejecución

| Métrica | Antes | Esperado |
| --- | ---: | ---: |
| Rutas web | 168 | 169 |
| Rutas VISO | 60 | 61 |
| Rutas VISO personal | 10 | 11 |
| Layouts | 9 | 10 |
| Layouts VISO | 1 | 2 |
| Componentes | 290 | 292 |
| Componentes VISO | 46 | 48 |
| Archivos Server Action | 101 | 102 |
| Archivos Server Action VISO | 41 | 42 |

Otros conteos deben recalcularse; no se infieren.

#### Hallazgos mínimos

- hardcodes 186/174;
- permiso por acción;
- totales entre sedes;
- paridad semana/mes;
- concurrencia y atomicidad;
- notificación idempotente;
- borrado/auditoría;
- pruebas;
- versionado de periodo.

#### Requisitos de prueba

No genera nuevos por sí sola; consume los reservados por `VISO-SCH-*`. Un hallazgo nuevo exige actualizar `04A` antes de aprobación.

#### Aceptación

- [ ] Commit fijado.
- [ ] Comandos reales ejecutados.
- [ ] Delta cuantitativo real.
- [ ] Guard y acciones auditados.
- [ ] Migración/rollback inspeccionados.
- [ ] Hallazgos con tarea.
- [ ] Evidencia histórica preservada.
- [ ] Entrega a `AUTH-UI-061` y E5.

#### Reconciliación ejecutada — 2026-11-02, sin cierre

El expediente [`CODE-DELTA-VISO-SCHEDULE-001`](../../deltas/CODE-DELTA-VISO-SCHEDULE-001.md) fija `vento-viso/main@3820ea02fdd8e6492a95c659a60a83a9210939e0` como **SHA de lectura real** y registra los objetos, guardias, cinco módulos de acciones y 22 exportaciones de programación, las tablas, la notificación ANIMA y **11 hallazgos con responsable**. El recuento local compatible con fixtures de `main` confirma **61 páginas**, **48 estáticas**, **13 dinámicas** y **10 handlers**, pero se originó en **otro SHA** (`94d3b8fd`) y no acredita por sí solo el árbol definitivo de `main`.

**Hallazgos bloqueantes observados:** código `186/174`; trigger DB `11160` tanto en STAGING como en producción, `SECURITY DEFINER` y grants a revisar; `staff.schedule.view` reutilizado para escrituras con cliente administrador; `deleteManyShiftAction` sin `site_id` ni `published_at IS NULL`; avisos ANIMA sin idempotencia durable acreditada; historial de migración del delta de julio no presente en Shell `main`. La ausencia de migración no se corrige con DDL manual: requiere lineage, rollback y forward bajo gate.

**Validaciones no satisfechas:** typecheck previo PASS solo en checkout `94d3b8fd`; test previo **FAIL 46/47** por contenedor QA de GAP-PKG-004, lint **BLOCKED** por aprobación local pendiente, build del SHA `3820ea02` **NOT RUN**. Faltan QA/SSR sobre SHA de `main`, recuento global reproducible con metodología comparable, pruebas de permisos y concurrencia, restauración/rollback, integración ANIMA. Se conservan las ocho casillas de aceptación hasta acreditarlas individualmente y la tarea **permanece [ ] PENDIENTE**.

**Salida:** acta estática entregada a `AUTH-UI-061` y `VISO-SCH-001..008` como insumo; no aprobó `VISO-SCH-008`, `DELIV-PKG` o `E5-GATE-008`.
