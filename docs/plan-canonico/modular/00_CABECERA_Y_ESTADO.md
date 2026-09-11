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
| Tareas aprobadas | **1170** |
| Tareas en propuesta | **0** |
| Tareas no iniciadas | **426** |
| Tareas rechazadas | **0** |
| Porcentaje de completamiento | **73.31% (1170/1596)** |
| Compilado derivado local      | `.generated/PLAN_IMPLEMENTACION_VENTO_OS_CANONICO_COMPILADO.md` — regenerable; no versionado    |
| Estado del compilado          | **REGENERABLE LOCALMENTE; CI LO PUBLICA TEMPORALMENTE TRAS VALIDAR**                             |
| ADR vigente                   | `ADR-AUTH-001 — ACCEPTED`                                                                       |
| Última tarea aprobada | **NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar** |
| Tarea actual | **NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN** |
| Estado de la tarea actual | **NO INICIADA** |
| Siguiente tarea | **NEXO-DOM-005 — Definir división, unión y transferencia de contenido** |
| Bloque actual | **BLOQUE K — NEXO** |
| Progreso del bloque | **BLOQUE K: 28 de 127 aprobadas; NEXO-DOM-004 pendiente** |
| Estado de implementación | **GLOBAL_IMPLEMENTATION_READY** |
| Acción principal obligatoria | **AUTORIZAR_IMPLEMENTACION — SHELL-CI-022::GAP-PKG-001** |
| Carril documental | **ACTIVO — NEXO-DOM-004** |
| Carril físico | **PENDING_AUTHORIZATION — SHELL-CI-022::GAP-PKG-001** |
| Alcance físico autorizado | **NINGUNO** |

### Continuidad inmediata

| Estado          | Valor                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Última aprobada | `NEXO-DOM-003` — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar |
| Tarea actual | `NEXO-DOM-004` — Definir contenido, empaque y desempaque de LPN — **NO INICIADA** |
| Siguiente tarea | `NEXO-DOM-005` — Definir división, unión y transferencia de contenido |
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
| CONTINUIDAD ACTIVA | **BLOQUE K: 28 DE 127 APROBADAS — ACTUAL NEXO-DOM-004** |
| Implementación física | **SHELL-CI-022::GAP-PKG-001 — PENDING_AUTHORIZATION** |

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
NEXO-DOM-003 — Definir ciclo de vida de LPN: crear, activar, cerrar, anular y reetiquetar
        ↓
TAREA ACTUAL
NEXO-DOM-004 — Definir contenido, empaque y desempaque de LPN
        ↓
SIGUIENTE TAREA RESERVADA
NEXO-DOM-005 — Definir división, unión y transferencia de contenido
        ↓
CONTINUIDAD DEL BLOQUE
BLOQUE K — 28 de 127 tareas aprobadas
```
