### MINI-BLOQUE — RECONCILIACIÓN DE DERIVA POSTERIOR

<!-- PLAN-SECTION-META:START -->
**Cobertura canónica:** `AUTH-UI-061` — 1 tarea.
<!-- PLAN-SECTION-META:END -->

### [ ] AUTH-UI-061 — Reconciliar rutas y superficies VISO posteriores al inventario aprobado

**Estado:** RECONCILIACIÓN ESTÁTICA REALIZADA; CIERRE AUTH/E2E BLOQUEADO  
**Delta:** `DELTA-VISO-SCHEDULE-20260731-001`  
**Snapshot base:** `AUTH-UI-005`  
**Dependencias:** `CODE-AUD-021`, commit estable y evidencia de inventario  
**Consumidor posterior de la salida:** `VISO-SCH-008` (no es prerrequisito de `AUTH-UI-061`)  
**Salida:** `VISO-ROUTE-DELTA-001`

#### Ruta esperada

| ID | Patrón | Archivo | Tipo | Familia | Acceso | Menú |
| --- | --- | --- | --- | --- | --- | --- |
| `VISO-ROUTE-061` | `/staff/schedule/month` | `src/app/staff/schedule/month/page.tsx` | `ESTATICA` | `PERSONAL_PROGRAMACION` | `requireStaffScheduleAccess` | no; selector/deep link |

#### Conteos esperados

| Métrica | Antes | Esperado |
| --- | ---: | ---: |
| páginas | 60 | 61 |
| estáticas | 47 | 48 |
| dinámicas | 13 | 13 |
| protegidas | 58 | 59 |
| guard especializado | 2 | 3 |
| públicas | 2 | 2 |
| handlers | 10 | 10 |
| patrones | 70 | 71 |

Recalcular cifras y huellas sobre commit final.

#### Destinos

- proceso/paso `AUTH-UI-011/012`;
- propiedad/consumo `013/014`;
- clasificación `015–025`;
- depuración `026–029`;
- permisos `030–045`;
- experiencia `046–060`;
- package E5.

#### TREQ existentes

Modificar `TREQ-VISO-004`, `005`, `006`, `012`, `013`, `015`, `016` y `023`; reemplazar `04A` completo.

#### Aceptación

- [ ] Commit/huellas.
- [ ] ID 061 único.
- [ ] No renumerar anteriores.
- [ ] Guard confirmado.
- [ ] Separar ruta/layout/componentes/acciones.
- [ ] `04A` completo.
- [ ] No inferir menú.

#### Resultado de auditoría y corrección de dependencia — 2026-11-02

La salida [`VISO-ROUTE-DELTA-001`](../../deltas/VISO-ROUTE-DELTA-001.md) inspecciona `vento-viso/main@3820ea02fdd8e6492a95c659a60a83a9210939e0`: ruta `VISO-ROUTE-061` presente y estática, página autenticada por `requireStaffScheduleAccess`, layout propio, tres componentes y cinco módulos de acciones de planificación. El selector **Semana/Mes** está observado; no se infiere entrada de menú lateral. Inventario local `94d3b8fd` = 61 páginas, 48 estáticas, 13 dinámicas, 10 handlers; el fixture de `main` declara 59 protegidas/2 públicas, **sin comprobar las 59 rutas E2E**.

**P0 de autorización:** el helper consulta solo `staff.schedule.view` y se reutiliza en acciones que mutan mediante `createAdminClient`. `deleteManyShiftAction` usa `.delete().in('id', shiftIds)` sin filtro de borrador ni `site_id`; requieren permisos diferenciados, control territorial, reversa/auditoría y pruebas negativas antes de cualquier aprobación. No se considera que la existencia del guard pruebe seguridad de las mutaciones.

**Corrección de contradicción canónica:** la dependencia original de esta tarea hacia `VISO-SCH-008` creaba un ciclo, pues `VISO-SCH-008` exige esta misma `AUTH-UI-061` y el orden `90_ORDEN_DE_IMPLEMENTACION.md` fija `CODE-AUD-021 → AUTH-UI-061 → VISO-SCH-001..008`. **Se eliminó únicamente esa dependencia invertida:** `VISO-SCH-008` recibe el acta 061 como precondición posterior. No se modifican el orden, los IDs, la frontera de paquetes ni las tareas de E1.

**Estado de aceptación:** commit y archivos de la ruta identificados; ID 061 sin renumeración; clasificación de superficies documentada. **Pendientes:** autorización diferenciada y probada para cada Server Action, E2E de rutas protegidas/negadas, fingerprints y recuento total sobre SHA de `main`, registro 04A revisado por propietario, `CODE-AUD-021` cerrado con QA, y `VISO-SCH-008`. Esta tarea se mantiene **[ ] PENDIENTE**, no `COMPLETE`; E5 sin aprobar.
