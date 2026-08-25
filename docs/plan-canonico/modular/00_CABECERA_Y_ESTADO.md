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
| Tareas canónicas con marcador | **1594** |
| Tareas `AUTH` únicas | **317** |
| Tareas aprobadas | **1043** |
| Tareas en propuesta | **0** |
| Tareas no iniciadas | **551** |
| Tareas rechazadas | **0** |
| Porcentaje de completamiento | **65.43% (1043/1594)** |
| Compilado derivado local      | `.generated/PLAN_IMPLEMENTACION_VENTO_OS_CANONICO_COMPILADO.md` — regenerable; no versionado    |
| Estado del compilado          | **REGENERABLE LOCALMENTE; CI LO PUBLICA TEMPORALMENTE TRAS VALIDAR**                             |
| ADR vigente                   | `ADR-AUTH-001 — ACCEPTED`                                                                       |
| Última tarea aprobada | **DATA-NORM-DB-009 — Registrar valor previo, valor resultante y versión de regla** |
| Tarea actual | **DATA-NORM-DB-010 — Probar idempotencia, rollback y ausencia de cambios semánticos** |
| Estado de la tarea actual | **NO INICIADA** |
| Siguiente tarea | **INT-DB-001 — Crear registro de sistemas e integraciones externas** |
| Bloque actual | **BLOQUE R — Fundación física, migraciones por dominio y normalización** |
| Progreso del bloque | **BLOQUE R: 42 de 51 aprobadas; DATA-NORM-DB-010 pendiente** |
| Estado de implementación | **GLOBAL_IMPLEMENTATION_ACTIVE** |
| Acción principal obligatoria | **EJECUTAR_IMPLEMENTACION — SHELL-UI-019::GLOBAL** |
| Carril documental | **ACTIVO — DATA-NORM-DB-010** |
| Carril físico | **IN_PROGRESS — SHELL-UI-019::GLOBAL** |
| Alcance físico autorizado | **SHELL-UI-019::GLOBAL** |

### Continuidad inmediata

| Estado          | Valor                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Última aprobada | `DATA-NORM-DB-009` — Registrar valor previo, valor resultante y versión de regla |
| Tarea actual | `DATA-NORM-DB-010` — Probar idempotencia, rollback y ausencia de cambios semánticos — **NO INICIADA** |
| Siguiente tarea | `INT-DB-001` — Crear registro de sistemas e integraciones externas |
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
| CONTINUIDAD ACTIVA | **BLOQUE R: 42 DE 51 APROBADAS — ACTUAL DATA-NORM-DB-010** |
| Implementación física | **SHELL-UI-019::GLOBAL — IN_PROGRESS** |

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
DATA-NORM-DB-009 — Registrar valor previo, valor resultante y versión de regla
        ↓
TAREA ACTUAL
DATA-NORM-DB-010 — Probar idempotencia, rollback y ausencia de cambios semánticos
        ↓
SIGUIENTE TAREA RESERVADA
INT-DB-001 — Crear registro de sistemas e integraciones externas
        ↓
CONTINUIDAD DEL BLOQUE
BLOQUE R — 42 de 51 tareas aprobadas
```
