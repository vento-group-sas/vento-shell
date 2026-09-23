# DOCUMENTO CANÓNICO DE CONTINUIDAD — AUTORIZACIÓN VENTO OS

> **IMPORTANTE**
>
> Este archivo es el punto de entrada del plan canónico modular de Vento OS.
>
> Las fuentes documentales canónicas son los fragmentos enumerados, ordenados y controlados mediante `manifest.json`.
>
> El archivo ubicado en `.generated/PLAN_IMPLEMENTACION_VENTO_OS_CANONICO_COMPILADO.md` es un artefacto local regenerable para lectura integral, validación y transferencia de contexto. No se versiona en Git, no debe editarse manualmente y CI lo publica temporalmente después de reconstruirlo desde las fuentes canónicas.

## Estado canónico

| Campo                         | Valor                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Versión                       | 2026-07-25                                                                                      |
| Revisión documental           | **58**                                                                                          |
| Estado documental             | **VIGENTE**                                                                                     |
| Arquitectura documental       | **MODULAR CANÓNICA**                                                                            |
| Fuente de orden canónico      | `manifest.json`                                                                                 |
| Fragmentos canónicos | **315** |
| Tareas canónicas con marcador | **1596** |
| Tareas `AUTH` únicas | **319** |
| Tareas aprobadas | **1277** |
| Tareas en propuesta | **0** |
| Tareas no iniciadas | **319** |
| Tareas rechazadas | **0** |
| Porcentaje de completamiento | **80.01% (1277/1596)** |
| Compilado derivado local      | `.generated/PLAN_IMPLEMENTACION_VENTO_OS_CANONICO_COMPILADO.md` — regenerable; no versionado    |
| Estado del compilado          | **REGENERABLE LOCALMENTE; CI LO PUBLICA TEMPORALMENTE TRAS VALIDAR**                             |
| ADR vigente                   | `ADR-AUTH-001 — ACCEPTED`                                                                       |
| Última tarea aprobada | **FOGO-AUTH-005 — Restringir Repostería** |
| Tarea actual | **FOGO-AUTH-006 — Restringir Cocina** |
| Estado de la tarea actual | **NO INICIADA** |
| Siguiente tarea | **FOGO-AUTH-007 — Restringir Insumos** |
| Bloque actual | **BLOQUES L Y M — FOGO y ORIGO** |
| Progreso del bloque | **BLOQUES L Y M: 8 de 65 aprobadas; FOGO-AUTH-006 pendiente** |
| Estado de implementación | **GOVERNED_ACTIVE_SET** |
| Acción principal obligatoria | **AUTORIZAR_IMPLEMENTACION — SHELL-CI-022::GAP-PKG-001** |
| Carril documental | **ACTIVO — FOGO-AUTH-006** |
| Carril físico | **PENDING_AUTHORIZATION — SHELL-CI-022::GAP-PKG-001 | PENDING_AUTHORIZATION — SHELL-CI-022::GAP-PKG-018 | PENDING_AUTHORIZATION — SHELL-CI-022::GAP-PKG-019 | PENDING_AUTHORIZATION — SHELL-CI-022::GAP-PKG-045** |
| Alcance físico autorizado | **NINGUNO** |

### Continuidad inmediata

| Estado          | Valor                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Última aprobada | `FOGO-AUTH-005` — Restringir Repostería |
| Tarea actual | `FOGO-AUTH-006` — Restringir Cocina — **NO INICIADA** |
| Siguiente tarea | `FOGO-AUTH-007` — Restringir Insumos |
| Restricción | **NO EJECUTAR CÓDIGO, DATOS, SUPABASE NI DESPLIEGUES SIN UNA INSTANCIA EXPLÍCITAMENTE AUTORIZADA** |

## Progreso documental aprobado

| Grupo de tareas                   | Estado                                       |
| --------------------------------- | -------------------------------------------- |
| `AUTH-CAT-001` a `AUTH-CAT-024`   | **APROBADAS**                                |
| `AUTH-RBAC-001` a `AUTH-RBAC-028` | **APROBADAS**                                |
| BLOQUE D                          | **CERRADO DOCUMENTALMENTE**                  |
| `AUTH-MOD-001` a `AUTH-MOD-020`   | **APROBADAS**                                |
| `AUTH-MOD-021` | **APROBADA — PUERTA SUPERADA** |
| `AUTH-CTX-001` a `AUTH-CTX-030` | **APROBADAS** |
| CONTINUIDAD ACTIVA | **BLOQUES L Y M: 8 DE 65 APROBADAS — ACTUAL FOGO-AUTH-006** |
| Implementación física | **SHELL-CI-022::GAP-PKG-001 — PENDING_AUTHORIZATION | SHELL-CI-022::GAP-PKG-018 — PENDING_AUTHORIZATION | SHELL-CI-022::GAP-PKG-019 — PENDING_AUTHORIZATION | SHELL-CI-022::GAP-PKG-045 — PENDING_AUTHORIZATION** |

## Reglas de edición

1. Los archivos ubicados dentro de `docs/plan-canonico/modular/` son las fuentes documentales editables.
2. El orden de compilación debe corresponder exclusivamente al registrado en `manifest.json`.
3. No debe editarse manualmente ningún archivo dentro de `.generated/`.
4. Cada cambio guardado en un fragmento canónico debe regenerar y validar automáticamente el compilado.
5. Una tarea no puede marcarse como aprobada hasta que el usuario indique expresamente `APROBADO`.
6. No debe adelantarse la tarea siguiente ni modificarse una decisión aprobada sin autorización expresa.
7. Las migraciones, cambios de código, modificaciones de Supabase y despliegues solo pueden ejecutarse dentro de una instancia física explícitamente autorizada por `implementation-control.json`; aprobar el marcador documental no concede esa autorización.

## Navegación principal

- [Protocolo obligatorio](./01_PROTOCOLO.md)
- [Roadmap maestro](./02_ROADMAP_MAESTRO.md)
- [Contexto y decisión de autorización](./bloques/E_CONTEXTO_Y_DECISION/00_INTRO.md)
- [Descubrimiento integral de operación y cobertura](./bloques/E1_DESCUBRIMIENTO_OPERATIVO/00_INTRO.md)
- [Arquitectura funcional y experiencia](./bloques/E2_PROCESOS_Y_EXPERIENCIA/00_BLOQUE_E2.md)
- [Arquitectura integral de Supabase](./bloques/E3_SUPABASE/00_INTRO.md)
- [Servicios operativos transversales](./bloques/E4_SERVICIOS_TRANSVERSALES/00_INTRO.md)
- [Paquetes de implementación y preparación operativa](./bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/00_INTRO.md)
- [Matrices operativas de caja, barra y cocina](./bloques/D_MATRICES/03_OPERATIVOS_CAJA_BARRA_COCINA.md)
- [Orden de implementación](./90_ORDEN_DE_IMPLEMENTACION.md)
- [Estado inicial conocido](./99_ESTADO_INICIAL_CONOCIDO.md)
- Documento compilado local: ejecutar `npm run docs:plan:build` y abrir `.generated/PLAN_IMPLEMENTACION_VENTO_OS_CANONICO_COMPILADO.md`
- [Registro global de tareas](./.generated/REGISTRO_GLOBAL_DE_TAREAS.md)

## Control de continuidad

```text
ÚLTIMA TAREA APROBADA
FOGO-AUTH-005 — Restringir Repostería
        ↓
TAREA ACTUAL
FOGO-AUTH-006 — Restringir Cocina
        ↓
SIGUIENTE TAREA RESERVADA
FOGO-AUTH-007 — Restringir Insumos
        ↓
CONTINUIDAD DEL BLOQUE
BLOQUES L Y M — 8 de 65 tareas aprobadas
```
