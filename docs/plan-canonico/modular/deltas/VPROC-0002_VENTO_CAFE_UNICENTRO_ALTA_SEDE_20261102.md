# VPROC-0002 — Preparación de alta: Vento Café Unicentro

> **Estado:** `DRAFT_PRE_E5` (2026-11-02). Sede NO creada, empleados NO asignados, sin mutación remota ni E2E certificado. Este es el frente independiente de `VPROC-0002`, no parte del paquete de horarios `VISO-SCHEDULE-MONTHLY-001`.

## Autoridad y objetivo

- Propietaria: **VISO**; proceso `VPROC-0002`, capacidad `CAP-01.03`, autoridad `PROC-CAT-005`; consumidor `VPROC-0007` para programación y **ANIMA** para asistencia.
- Seguimiento [VISO #21](https://github.com/vento-group-sas/vento-viso/issues/21) y [Shell #1038](https://github.com/vento-group-sas/vento-shell/issues/1038); respetar `90_ORDEN_DE_IMPLEMENTACION.md`, `implementation-control.json` y los doce controles de `PROC-COVER-007`.
- Objetivo: establecimiento operativo distinto de la **misma marca Vento Café**, con asignación de trabajadores que laboran también en otras sedes. No crear nueva empresa, ni POS externo, ni activar ventas POS sin aceptación.

## Identidad propuesta — no aplicada

| Elemento | Regla objetivo |
| --- | --- |
| Nombre | Vento Café — Unicentro |
| Código | `VENTO_CAFE_UNICENTRO`, único, revalidar antes de alta |
| Tipo | `site_type=satellite`, `site_kind=store`, confirmar constraints |
| Pertenencia | Marca existente Vento Café; no duplicar razón social |
| Publicación | `sites.is_public=false` inicialmente; PASS y canales comerciales desactivados hasta aprobación separada |
| Geografía | Centro Comercial Unicentro, Cúcuta; número de local, puerta y coordenadas exactas pendientes |
| Trabajador | `employee_sites` activo para la nueva sede; conservar `employees.site_id` principal salvo decisión expresa |
| Permisos | Roles operativos/áreas y administrador territorial, sin ampliar acceso a otras sedes |
| Asistencia | Geocerca ANIMA solo después de verificar coordenadas del local y política `site_attendance_policy` |
| Horarios | `employee_shifts.site_id` de Unicentro; sumar toda la jornada semanal del trabajador en todas las sedes |

## Hallazgos comprobados

1. En producción principal `clzdpinthhtknkmefsxx` existe `sites.code=VENTO_CAFE`; **no** existe Unicentro. No se creó ningún registro.
2. VISO dispone de `/businesses/new`, `/staff/[id]` y `addEmployeeSite`; alta de sede y satélite PASS tiene efectos separados, y la compensación actual no acredita transacción atómica.
3. `employee_sites` puede conservar sede primaria; no equivale a conceder roles o autorización global. Revisar RLS, guardas y publicación de horarios.
4. STAGING es la **rama persistente** `rcrxixmqhrndcervbllp`; deben usarse solo fixtures sintéticos autorizados, no copiar datos personales productivos.

## Doce gates PROC-COVER-007 — pendientes

| Gate | Criterio exigido | Estado |
| --- | --- | --- |
| Resultado | Sede diferenciada en VISO y ANIMA | PENDING |
| Alcance | Marca Vento Café existente; sin nueva empresa jurídica | PENDING |
| Inicio-fin E2E | Alta → activación → trabajador → turno → asistencia | PENDING |
| Flujo normal | Alta y asignación secundaria con principal intacta | PENDING |
| Excepción | Código duplicado, permisos insuficientes o error parcial PASS | PENDING |
| Corrección/reversa | Desactivar sede/vínculo conservando registros previos | PENDING |
| Autorización | Actores y territorios con roles reales | PENDING |
| Datos | Integridad de sites, employee_sites, roles y coordenadas | PENDING |
| Auditoría | Actor, antes/después y decisiones | PENDING |
| Integración | VISO→ANIMA y PASS solo mediante activación independiente | PENDING |
| Continuidad/idempotencia | Reintento sin duplicar sede ni trabajadores | PENDING |
| Pruebas/aceptación | STAGING sintético, negativo/reversa, piloto y aceptación | PENDING |

## Secuencia de implementación y aceptación

1. Obtener local exacto, dirección de acceso y coordenadas en sitio, responsable de operación y fecha de activación; sin eso no activar geocerca ANIMA.
2. Auditar constraints, RLS, roles y ownership de `sites`, `employee_sites`, `pass.pass_satellites` y acciones VISO. Definir si la solución necesita modificación de código o solo configuración.
3. Resolver la frontera física y E5 propietario mediante plan canónico, **sin inventar un package_id**. Preparar idempotencia y compensación de alta sin borrado histórico.
4. Después de gate y autorización específica: STAGING con sede y trabajador sintéticos, alta repetida, principal/secundaria, negativa por territorio, horarios multisedes, ANIMA y reversa.
5. Solo con autorización independiente de producción: backup y preflight, alta definitiva, asignaciones nominativas aprobadas, roles y asistencia; registrar aceptación por proceso.
6. El defecto de tope mensual 186 h de `VPROC-0007` se corrige en su propio paquete; no usar rotaciones de Unicentro para eludir esa protección antes de sustituirla correctamente.

**Estado real:** `SITE_CREATED=false`, `EMPLOYEES_ASSIGNED=false`, `E5_APPROVED=false`, `STAGING_MUTATED=false`, `PRODUCTION_MUTATED=false`, `E2E_CERTIFIED=false`.
