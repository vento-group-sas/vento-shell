# VENTO OS — MAPA MAESTRO DE TRABAJO Y CONTINUIDAD

> Archivo derivado. No editar manualmente.
>
> Vista humana coordinada de correcciones, documentación canónica, preparación por governed frontier de packages e implementación física. El detalle exhaustivo inferior conserva la autoridad estructural utilizada por los validadores.
>
> El marcador documental define contratos; las instancias físicas materializan únicamente lo autorizado. Ningún carril reabre ni sustituye silenciosamente al otro.

## 🚦 QUÉ HACER AHORA — SIN INTERPRETAR NI ELEGIR

> **Prioridad del checkout actual:** ejecutar MATERIALIZE_PHYSICAL_HANDOFF sobre SHELL-CI-020::GAP-PKG-003.
>
> Las secciones siguientes son las únicas colas vigentes. Corrección, documentación, preparación de package e implementación física son estados distintos; una no autoriza silenciosamente a la otra.

### 1. Correcciones canónicas

- **Acción:** ninguna corrección abierta.

### 2. Ejecuta el primary de la governed frontier — `GAP-PKG-003`

- **CURRENT_EXECUTABLE_WORK:** `GAP-PKG-003`
- **Posición topológica:** **3/189**; prioridad derivada, sin selección humana.
- **Estado efectivo:** `IMPLEMENTATION_READY`
- **Acción exacta:** `MATERIALIZE_PHYSICAL_HANDOFF`
- **Objetivo exacto:** `SHELL-CI-020::GAP-PKG-003`
- **Comando exacto:** `npm run docs:package:handoff -- --package-id GAP-PKG-003`
- **Expediente package-gate:** `docs/plan-canonico/modular/package-gate-instances/GAP-PKG-003.json` — `APPROVED_FOR_IMPLEMENTATION`
- **Gates:** **6/6 PASS**; faltan **0**.
- **Por qué:** GAP-PKG-003 completó dossier, gate y dependencias; su handoff físico solo puede materializarse con admisión de recursos ADMISSIBLE.
- **Regla:** preparar o aprobar el expediente no autoriza todavía código, migraciones, despliegues ni cambios remotos.

### 3. Continúa la documentación canónica

- **Acción:** la ruta documental está completa.

### 4. Instancias físicas gobernadas en curso

- **Regla:** cada instancia conserva autorización, checkout, resource locks y lifecycle propios; prioridad no significa exclusividad.
- `SHELL-CI-020::GAP-PKG-002` — declared=`AUTHORIZED` — effective=`AUTHORIZED` — `EJECUTAR_IMPLEMENTACIÓN`
  - Contrato: Implementar y desplegar cada paquete aprobado por E5
  - Integridad: `VALID`
  - Recovery: `START_IMPLEMENTATION_BRANCH`
  - Comando mutante normal: `npm run docs:implementation:advance -- --instance-id SHELL-CI-020::GAP-PKG-002`
  - Registro: `docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-002.json`
- `SHELL-CI-022::GAP-PKG-001` — declared=`PENDING_AUTHORIZATION` — effective=`PENDING_AUTHORIZATION` — `AUTORIZAR_IMPLEMENTACIÓN`
  - Contrato: Ejecutar cutover y piloto conforme al plan aprobado
  - Integridad: `VALID`
  - Recovery: `AWAIT_EXPLICIT_AUTHORIZATION`
  - Comando mutante normal: `npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-001`
  - Registro: `docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-001.json`
- `SHELL-CI-022::GAP-PKG-018` — declared=`PENDING_AUTHORIZATION` — effective=`PENDING_AUTHORIZATION` — `AUTORIZAR_IMPLEMENTACIÓN`
  - Contrato: Ejecutar cutover y piloto conforme al plan aprobado
  - Integridad: `VALID`
  - Recovery: `AWAIT_EXPLICIT_AUTHORIZATION`
  - Comando mutante normal: `npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-018`
  - Registro: `docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-018.json`
- `SHELL-CI-022::GAP-PKG-019` — declared=`PENDING_AUTHORIZATION` — effective=`PENDING_AUTHORIZATION` — `AUTORIZAR_IMPLEMENTACIÓN`
  - Contrato: Ejecutar cutover y piloto conforme al plan aprobado
  - Integridad: `VALID`
  - Recovery: `AWAIT_EXPLICIT_AUTHORIZATION`
  - Comando mutante normal: `npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-019`
  - Registro: `docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-019.json`
- `SHELL-CI-022::GAP-PKG-045` — declared=`PENDING_AUTHORIZATION` — effective=`PENDING_AUTHORIZATION` — `AUTORIZAR_IMPLEMENTACIÓN`
  - Contrato: Ejecutar cutover y piloto conforme al plan aprobado
  - Integridad: `VALID`
  - Recovery: `AWAIT_EXPLICIT_AUTHORIZATION`
  - Comando mutante normal: `npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-045`
  - Registro: `docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-045.json`

## Panel de control — dos carriles

| Carril | Estado | Trabajo actual | Siguiente | Regla |
| --- | --- | --- | --- | --- |
| 🟦 **DOCUMENTACIÓN** | `COMPLETA` | — | FIN DE RUTA | Ruta documental completa; los pendientes restantes permanecen diferidos |
| 🟧 **IMPLEMENTACIÓN FÍSICA** | `AUTHORIZED` | `SHELL-CI-020::GAP-PKG-002` — Implementar y desplegar cada paquete aprobado por E5 | `SHELL-CI-022::GAP-PKG-001` | Governed active set; prioridad ≠ exclusividad |

> Coordinación: `DOCUMENTATION_COMPLETE`. La ruta documental esta completa; no requiere checkout paralelo. El carril fisico conserva su lifecycle gobernado.

## Progreso por carril

| Carril | Completado | Pendiente / restante | Actual |
| --- | ---: | ---: | --- |
| 🟦 **Documentación** | **1585/1596 aprobadas** | **11** no aprobadas (0 propuesta, 0 rechazadas) | `NINGUNA` |
| 🟧 **Implementación física conocida** | **104/109 VERIFIED** | **5** no terminales | `SHELL-CI-020::GAP-PKG-002` |

- **Ruta documental activa:** `NORMAL-CANONICAL-FLOW-001`
- **Etapa documental:** `PHASE-13-R3-LEGACY-RETIREMENT` — Retiro legacy y certificación final
- **Siguiente etapa documental:** `NINGUNA`
- **Puntero de compatibilidad del control de instancias:** `EJECUTAR_IMPLEMENTACION` — `SHELL-CI-020::GAP-PKG-002`
- **Entrada mutante normal:** `docs:implementation:advance`
- **Estado físico declarado:** `AUTHORIZED`
- **Estado físico efectivo:** `AUTHORIZED`
- **Recovery físico:** `START_IMPLEMENTATION_BRANCH`
- **Instancias físicas en espera de predecesora:** **0**
- **Cobertura documental de la ruta:** **todas las tareas, exactamente una vez**

### 🟧 Cola física visible

> Muestra hasta 12 instancias físicas no terminales conocidas por el control. No crea autorizaciones ni materializa instancias futuras por inferencia.

| # | Posición | Instancia | Contrato | Estado declarado | Estado efectivo | Condición |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | **EN CURSO** | `SHELL-CI-020::GAP-PKG-002` | Implementar y desplegar cada paquete aprobado por E5 | `AUTHORIZED` | `AUTHORIZED` | EN_CURSO — EJECUTAR_IMPLEMENTACIÓN |
| 2 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-001` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |
| 3 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-018` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |
| 4 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-019` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |
| 5 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-045` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |

## Modos de trabajo y materialización

> La topología determina si una definición queda solo como contrato o genera trabajo físico global, por paquete, por unidad o de cierre final. La tabla siguiente sigue siendo descriptiva; la autorización física continúa gobernada por implementation-control.

| Modo | Significado | Tareas en el plan | Regla contra repetición |
| --- | --- | ---: | --- |
| `DEFINE_ONCE` | Definir una sola vez sin instancia física propia | 1109 | Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución. |
| `GLOBAL_ENABLE_ONCE` | Una instancia física global reutilizable | 96 | Existe como máximo una instancia física global reutilizable por todos los paquetes aplicables. |
| `GLOBAL_FINAL` | Una certificación global final | 2 | Se materializa una sola instancia GLOBAL-FINAL cuando sus prerrequisitos estén cerrados. |
| `PER_IMPLEMENTATION_UNIT` | Una instancia por implementation_unit_id | 218 | Cada implementation_unit_id se materializa como máximo una vez y puede ser consumido por varios package_id mediante lineage. |
| `PER_PACKAGE_AND_GLOBAL_FINAL` | Instancia por paquete y certificación global final | 60 | Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda. |
| `TEMPLATE_PER_PACKAGE` | Una instancia por package_id | 111 | Cada package_id aplicable registra su propia instancia sin reabrir el marcador global. |

## 🟦 Carril documental — próximas tareas

> Esta es la línea documental inmediata. Orienta la lectura sin iniciar ni ampliar tareas; el contrato y el fragmento propietario siguen siendo la autoridad.

| # | Estado | Tarea | Qué hace |
| ---: | --- | --- | --- |
| 1 | PENDIENTE | `EXT-GOV-001` — Verificar soporte documental de titulares, marcas y cuentas externas del ecosistema | Verifica soporte documental de titulares, marcas y cuentas externas del ecosistema, registra brechas y deja evidencia del resultado. |
| 2 | PENDIENTE | `VISO-SCH-001` — Definir contrato funcional de programación laboral | Define contrato funcional de programación laboral con reglas, responsables, excepciones y criterios verificables. |
| 3 | PENDIENTE | `VISO-SCH-002` — Definir horizontes semanal y mensual | Define horizontes semanal y mensual con reglas, responsables, excepciones y criterios verificables. |
| 4 | PENDIENTE | `VISO-SCH-003` — Definir bloques, fechas, duración y modalidad rápida | Define bloques, fechas, duración y modalidad rápida con reglas, responsables, excepciones y criterios verificables. |
| 5 | PENDIENTE | `VISO-SCH-004` — Definir límites mensuales, advertencias, vigencia y excepciones | Define límites mensuales, advertencias, vigencia y excepciones con reglas, responsables, excepciones y criterios verificables. |
| 6 | PENDIENTE | `VISO-SCH-005` — Definir borrador, revisión, publicación y corrección | Define borrador, revisión, publicación y corrección con reglas, responsables, excepciones y criterios verificables. |
| 7 | PENDIENTE | `VISO-SCH-006` — Definir conflictos, integridad, concurrencia y recuperación | Define conflictos, integridad, concurrencia y recuperación con reglas, responsables, excepciones y criterios verificables. |
| 8 | PENDIENTE | `VISO-SCH-007` — Definir autorización, auditoría, eventos y notificaciones | Define autorización, auditoría, eventos y notificaciones con reglas, responsables, excepciones y criterios verificables. |
| 9 | PENDIENTE | `VISO-SCH-008` — Aprobar contrato de programación antes de E5 | Aprueba contrato de programación antes de E5 solo después de revisar evidencia y bloqueos. |
| 10 | PENDIENTE | `CODE-AUD-021` — Reconciliar el delta técnico de programación mensual VISO | Reconcilia el delta técnico de programación mensual VISO con sus fuentes canónicas y resuelve cada diferencia. |
| 11 | PENDIENTE | `AUTH-UI-061` — Reconciliar rutas y superficies VISO posteriores al inventario aprobado | Reconcilia rutas y superficies VISO posteriores al inventario aprobado con sus fuentes canónicas y resuelve cada diferencia. |

## 🟦 Preparación documental — próximas tareas

> Dependencias, pruebas y cierre se leen de la tarea cuando ya están declarados. "Precedencia de ruta" y "perfil previsto" son ayudas derivadas y no amplían el contrato canónico.

### 1. `EXT-GOV-001` — Verificar soporte documental de titulares, marcas y cuentas externas del ecosistema

- **Qué hace:** Verifica soporte documental de titulares, marcas y cuentas externas del ecosistema, registra brechas y deja evidencia del resultado.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** `OPS-GOV-001` aprobada + expediente disponible
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** OPS-GOV-001 podrá aprobarse cuando se confirme que:
- **Fuente:** `bloques/E1_DESCUBRIMIENTO_OPERATIVO/02A_TAREAS_DERIVADAS_OPS_AUD_001.md`

### 2. `VISO-SCH-001` — Definir contrato funcional de programación laboral

- **Qué hace:** Define contrato funcional de programación laboral con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `EXT-GOV-001`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 3. `VISO-SCH-002` — Definir horizontes semanal y mensual

- **Qué hace:** Define horizontes semanal y mensual con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-001`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 4. `VISO-SCH-003` — Definir bloques, fechas, duración y modalidad rápida

- **Qué hace:** Define bloques, fechas, duración y modalidad rápida con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-002`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 5. `VISO-SCH-004` — Definir límites mensuales, advertencias, vigencia y excepciones

- **Qué hace:** Define límites mensuales, advertencias, vigencia y excepciones con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-003`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 6. `VISO-SCH-005` — Definir borrador, revisión, publicación y corrección

- **Qué hace:** Define borrador, revisión, publicación y corrección con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-004`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 7. `VISO-SCH-006` — Definir conflictos, integridad, concurrencia y recuperación

- **Qué hace:** Define conflictos, integridad, concurrencia y recuperación con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-005`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 8. `VISO-SCH-007` — Definir autorización, auditoría, eventos y notificaciones

- **Qué hace:** Define autorización, auditoría, eventos y notificaciones con reglas, responsables, excepciones y criterios verificables.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-006`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: contrato, integración, denegaciones, seguridad/RLS y regresión
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 9. `VISO-SCH-008` — Aprobar contrato de programación antes de E5

- **Qué hace:** Aprueba contrato de programación antes de E5 solo después de revisar evidencia y bloqueos.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** Precedencia de ruta: `VISO-SCH-007`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md`

### 10. `CODE-AUD-021` — Reconciliar el delta técnico de programación mensual VISO

- **Qué hace:** Reconcilia el delta técnico de programación mensual VISO con sus fuentes canónicas y resuelve cada diferencia.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** commit estable; migración documentada; snapshots CODE-AUD- aprobados
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/E1_DESCUBRIMIENTO_OPERATIVO/04B_RECONCILIACION_DELTA_VISO_PROGRAMACION.md`

### 11. `AUTH-UI-061` — Reconciliar rutas y superficies VISO posteriores al inventario aprobado

- **Qué hace:** Reconcilia rutas y superficies VISO posteriores al inventario aprobado con sus fuentes canónicas y resuelve cada diferencia.
- **Trabajo canónico ahora:** El marcador canónico se desarrolla y aprueba una sola vez como contrato reutilizable.
- **Ciclo:** Definir una sola vez sin instancia física propia — `<task_id>`
- **Dependencias para desarrollar:** `CODE-AUD-021`, commit estable, `VISO-SCH-008`
- **Se ejecuta después de:** No crea una instancia física propia.
- **Regla de repetición:** Los consumidores reutilizan el contrato aprobado sin repetir esta tarea como ejecución.
- **Pruebas:** Por definir al desarrollar · perfil previsto: contrato, integración, denegaciones, seguridad/RLS y regresión
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/I_NAVEGACION_Y_PANTALLAS/07_RECONCILIACION_DE_DERIVA_POSTERIOR.md`


## Contrato obligatorio para ejecutar cada tarea

Antes de desarrollar:

1. consultar la rama canónica vigente y verificar que la fila continúa siendo la tarea actual;
2. leer completa la sección propietaria, sus TREQ, decisiones, dependencias y consumidores;
3. reconciliar el alcance contra el código vigente de todos los repositorios afectados;
4. enumerar cada superficie afectada y asignarle disposición `CREAR`, `MODIFICAR`, `REUTILIZAR`, `RETIRAR`, `SIN_CAMBIO_JUSTIFICADO` o `DIFERIR_A_<TASK-ID>`;
5. declarar archivos exactos, funciones/símbolos, contratos, datos, permisos, integraciones, pruebas y evidencia esperada.

No puede quedar sin revisar ninguna categoría aplicable:

- aplicaciones, rutas, layouts, pantallas, componentes, formularios y navegación;
- acciones de usuario, hooks, servicios, adaptadores, consultas, estado local y utilidades;
- Server Actions, API/route handlers, RPC, funciones SQL, triggers, Edge Functions, jobs, cron, colas y webhooks;
- tablas, vistas, relaciones, constraints, RLS, grants, Storage, Realtime, tipos y migraciones;
- eventos, productores, consumidores, idempotencia, retry, compensación y conciliación;
- configuración, variables, secretos, feature flags, observabilidad, logs y alertas;
- pruebas unitarias, contractuales, integración, seguridad, E2E, regresión, dispositivo y operación;
- documentación, capacitación, rollout, rollback, piloto, evidencia y soporte.

Para cerrar:

1. cada superficie descubierta debe estar resuelta por esta tarea o vinculada a otra tarea canónica exacta;
2. toda exclusión o diferimiento debe tener justificación, propietario y momento de resolución;
3. deben ejecutarse las validaciones proporcionales y registrarse resultados reales, incluidos los fallos;
4. el compilador, el registro TREQ y la continuidad deben quedar consistentes;
5. el estado solo cambia mediante aprobación explícita; la siguiente fila no se inicia por inferencia.

**Regla de cero omisiones:** una función, archivo, ruta, objeto de datos o consumidor descubierto sin tarea propietaria bloquea el cierre. Debe incorporarse al alcance actual o asignarse expresamente a una tarea posterior existente; si ninguna existe, se crea primero la tarea canónica faltante y se regenera esta guía.

## 🟦 Etapas documentales pendientes

| Orden | Etapa | Bloque | Activación | Primera tarea pendiente |
| ---: | --- | --- | --- | --- |
| 3 | `PHASE-02-E1-EXTERNAL-GOVERNANCE-CONDITIONAL` | BLOQUE E1 — Expediente condicional de gobierno externo | DEFERRED | `EXT-GOV-001` |
| 8 | `PHASE-02-VISO-SCHEDULE-DELTA` | BLOQUE G — Reconciliación de programación laboral VISO | DEFERRED | `VISO-SCH-001` |

## 🟦 Secuencia documental pendiente exacta — autoridad machine-readable

> Esta tabla conserva deliberadamente las columnas `Identificador` y `Título canónico`: otros validadores la consumen como autoridad machine-readable. Las etapas `ACTIVE` aparecen primero; las `DEFERRED` permanecen al final sin perderse.

| Pendiente # | Orden canónico | Etapa | Estado | Identificador | Título canónico | Qué hace | Ciclo | Dependencias para desarrollar | Ejecución posterior | Pruebas / TREQ | Cierre global | Fragmento propietario |
| ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 223 | `PHASE-02-E1-EXTERNAL-GOVERNANCE-CONDITIONAL` | NO INICIADA | `EXT-GOV-001` | Verificar soporte documental de titulares, marcas y cuentas externas del ecosistema | Verifica soporte documental de titulares, marcas y cuentas externas del ecosistema, registra brechas y deja evidencia del resultado. | Definir una sola vez sin instancia física propia — `<task_id>` | `OPS-GOV-001` aprobada + expediente disponible | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | OPS-GOV-001 podrá aprobarse cuando se confirme que: | `bloques/E1_DESCUBRIMIENTO_OPERATIVO/02A_TAREAS_DERIVADAS_OPS_AUD_001.md` |
| 2 | 612 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-001` | Definir contrato funcional de programación laboral | Define contrato funcional de programación laboral con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `EXT-GOV-001` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 3 | 613 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-002` | Definir horizontes semanal y mensual | Define horizontes semanal y mensual con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-001` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 4 | 614 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-003` | Definir bloques, fechas, duración y modalidad rápida | Define bloques, fechas, duración y modalidad rápida con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-002` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 5 | 615 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-004` | Definir límites mensuales, advertencias, vigencia y excepciones | Define límites mensuales, advertencias, vigencia y excepciones con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-003` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 6 | 616 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-005` | Definir borrador, revisión, publicación y corrección | Define borrador, revisión, publicación y corrección con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-004` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 7 | 617 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-006` | Definir conflictos, integridad, concurrencia y recuperación | Define conflictos, integridad, concurrencia y recuperación con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-005` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 8 | 618 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-007` | Definir autorización, auditoría, eventos y notificaciones | Define autorización, auditoría, eventos y notificaciones con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-006` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: contrato, integración, denegaciones, seguridad/RLS y regresión | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 9 | 619 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-008` | Aprobar contrato de programación antes de E5 | Aprueba contrato de programación antes de E5 solo después de revisar evidencia y bloqueos. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-007` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 10 | 620 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `CODE-AUD-021` | Reconciliar el delta técnico de programación mensual VISO | Reconcilia el delta técnico de programación mensual VISO con sus fuentes canónicas y resuelve cada diferencia. | Definir una sola vez sin instancia física propia — `<task_id>` | commit estable; migración documentada; snapshots CODE-AUD- aprobados | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/E1_DESCUBRIMIENTO_OPERATIVO/04B_RECONCILIACION_DELTA_VISO_PROGRAMACION.md` |
| 11 | 621 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `AUTH-UI-061` | Reconciliar rutas y superficies VISO posteriores al inventario aprobado | Reconcilia rutas y superficies VISO posteriores al inventario aprobado con sus fuentes canónicas y resuelve cada diferencia. | Definir una sola vez sin instancia física propia — `<task_id>` | `CODE-AUD-021`, commit estable, `VISO-SCH-008` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: contrato, integración, denegaciones, seguridad/RLS y regresión | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/I_NAVEGACION_Y_PANTALLAS/07_RECONCILIACION_DE_DERIVA_POSTERIOR.md` |
