# VENTO OS — MAPA MAESTRO DE TRABAJO Y CONTINUIDAD

> Archivo derivado. No editar manualmente.
>
> Vista humana coordinada de correcciones, documentación canónica, preparación por governed frontier de packages e implementación física. El detalle exhaustivo inferior conserva la autoridad estructural utilizada por los validadores.
>
> El marcador documental define contratos; las instancias físicas materializan únicamente lo autorizado. Ningún carril reabre ni sustituye silenciosamente al otro.

## 🚦 QUÉ HACER AHORA — SIN INTERPRETAR NI ELEGIR

> **Prioridad del checkout actual:** ejecutar MATURE_PACKAGE_GATE sobre GAP-PKG-002.
>
> Las secciones siguientes son las únicas colas vigentes. Corrección, documentación, preparación de package e implementación física son estados distintos; una no autoriza silenciosamente a la otra.

### 1. Correcciones canónicas

- **Acción:** ninguna corrección abierta.

### 2. Ejecuta el primary de la governed frontier — `GAP-PKG-002`

- **CURRENT_EXECUTABLE_WORK:** `GAP-PKG-002`
- **Posición topológica:** **2/189**; prioridad derivada, sin selección humana.
- **Estado efectivo:** `COMPILED`
- **Acción exacta:** `MATURE_PACKAGE_GATE`
- **Objetivo exacto:** `GAP-PKG-002`
- **Comando exacto:** `npm run docs:package:gate:status -- --package-id GAP-PKG-002`
- **Expediente package-gate:** `docs/plan-canonico/modular/package-gate-instances/GAP-PKG-002.json` — `MATURATION_DRAFT`
- **Gates:** **2/6 PASS**; faltan **4**.
- **Por qué:** GAP-PKG-002 debe completar identidad, unidades, evidencia y aprobación de gate.
- **Regla:** preparar o aprobar el expediente no autoriza todavía código, migraciones, despliegues ni cambios remotos.

### 3. Continúa la documentación — `UX-QA-017`

- **Tarea exacta:** `UX-QA-017` — La aplicación propietaria conserva la fuente de verdad
- **Haz ahora:** Convierte «La aplicación propietaria conserva la fuente de verdad» en una condición verificable, con responsable, evidencia y criterio de cierre.
- **Archivo propietario:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
- **Regla:** si corre en paralelo con una corrección o un package, usar checkout independiente y serializar los cierres.

### 4. Instancias físicas gobernadas en curso

- **Regla:** cada instancia conserva autorización, checkout, resource locks y lifecycle propios; prioridad no significa exclusividad.
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
| 🟦 **DOCUMENTACIÓN** | `ACTIVO` | `UX-QA-017` — La aplicación propietaria conserva la fuente de verdad | `UX-QA-018` — Los eventos idempotentes no duplican efectos | Una tarea documental activa |
| 🟧 **IMPLEMENTACIÓN FÍSICA** | `PENDING_AUTHORIZATION` | `SHELL-CI-022::GAP-PKG-001` — Ejecutar cutover y piloto conforme al plan aprobado | `SHELL-CI-022::GAP-PKG-018` | Governed active set; prioridad ≠ exclusividad |

> Coordinación: `CONTROLLED_DUAL_LANE`. Los carriles pueden avanzar en paralelo en checkouts independientes; los cierres se serializan y el segundo carril reconcilia el `main` más reciente antes de cerrar.

## Progreso por carril

| Carril | Completado | Pendiente / restante | Actual |
| --- | ---: | ---: | --- |
| 🟦 **Documentación** | **1569/1596 aprobadas** | **27** no aprobadas (0 propuesta, 0 rechazadas) | `UX-QA-017` |
| 🟧 **Implementación física conocida** | **104/108 VERIFIED** | **4** no terminales | `SHELL-CI-022::GAP-PKG-001` |

- **Ruta documental activa:** `NORMAL-CANONICAL-FLOW-001`
- **Etapa documental:** `PHASE-13-U-INTEGRAL-CERTIFICATION` — Pruebas integrales y certificación transversal
- **Siguiente etapa documental:** `PHASE-13-R3-LEGACY-RETIREMENT`
- **Puntero de compatibilidad del control de instancias:** `AUTORIZAR_IMPLEMENTACION` — `SHELL-CI-022::GAP-PKG-001`
- **Entrada mutante normal:** `docs:implementation:advance`
- **Estado físico declarado:** `PENDING_AUTHORIZATION`
- **Estado físico efectivo:** `PENDING_AUTHORIZATION`
- **Recovery físico:** `AWAIT_EXPLICIT_AUTHORIZATION`
- **Instancias físicas en espera de predecesora:** **0**
- **Cobertura documental de la ruta:** **todas las tareas, exactamente una vez**

### 🟧 Cola física visible

> Muestra hasta 12 instancias físicas no terminales conocidas por el control. No crea autorizaciones ni materializa instancias futuras por inferencia.

| # | Posición | Instancia | Contrato | Estado declarado | Estado efectivo | Condición |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-001` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |
| 2 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-018` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |
| 3 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-019` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |
| 4 | **EN CURSO** | `SHELL-CI-022::GAP-PKG-045` | Ejecutar cutover y piloto conforme al plan aprobado | `PENDING_AUTHORIZATION` | `PENDING_AUTHORIZATION` | EN_CURSO — AUTORIZAR_IMPLEMENTACIÓN |

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
| 1 | **ACTUAL** | `UX-QA-017` — La aplicación propietaria conserva la fuente de verdad | Convierte «La aplicación propietaria conserva la fuente de verdad» en una condición verificable, con responsable, evidencia y criterio de cierre. |
| 2 | PENDIENTE | `UX-QA-018` — Los eventos idempotentes no duplican efectos | Convierte «Los eventos idempotentes no duplican efectos» en una condición verificable, con responsable, evidencia y criterio de cierre. |
| 3 | PENDIENTE | `UX-QA-019` — Los fallos parciales permiten recuperación | Convierte «Los fallos parciales permiten recuperación» en una condición verificable, con responsable, evidencia y criterio de cierre. |
| 4 | PENDIENTE | `UX-QA-020` — Cada aplicación supera piloto con usuarios reales | Convierte «Cada aplicación supera piloto con usuarios reales» en una condición verificable, con responsable, evidencia y criterio de cierre. |
| 5 | PENDIENTE | `UX-QA-021` — Probar SHELL por tipo de actor | Prueba SHELL por tipo de actor en escenarios representativos y registra resultados y defectos reales. |
| 6 | PENDIENTE | `UX-QA-022` — Probar ANIMA con trabajadores y administradores | Prueba ANIMA con trabajadores y administradores en escenarios representativos y registra resultados y defectos reales. |
| 7 | PENDIENTE | `UX-QA-023` — Probar VISO por rol administrativo | Prueba VISO por rol administrativo en escenarios representativos y registra resultados y defectos reales. |
| 8 | PENDIENTE | `UX-QA-024` — Probar NEXO por rol operativo | Prueba NEXO por rol operativo en escenarios representativos y registra resultados y defectos reales. |
| 9 | PENDIENTE | `UX-QA-025` — Probar FOGO por área productiva | Prueba FOGO por área productiva en escenarios representativos y registra resultados y defectos reales. |
| 10 | PENDIENTE | `UX-QA-026` — Probar ORIGO por etapa de compra | Prueba ORIGO por etapa de compra en escenarios representativos y registra resultados y defectos reales. |
| 11 | PENDIENTE | `UX-QA-027` — Probar PULSO por punto operativo | Prueba PULSO por punto operativo en escenarios representativos y registra resultados y defectos reales. |
| 12 | PENDIENTE | `UX-QA-028` — Probar NUMERA por alcance financiero | Prueba NUMERA por alcance financiero en escenarios representativos y registra resultados y defectos reales. |

## 🟦 Preparación documental — próximas tareas

> Dependencias, pruebas y cierre se leen de la tarea cuando ya están declarados. "Precedencia de ruta" y "perfil previsto" son ayudas derivadas y no amplían el contrato canónico.

### 1. `UX-QA-017` — La aplicación propietaria conserva la fuente de verdad

- **Qué hace:** Convierte «La aplicación propietaria conserva la fuente de verdad» en una condición verificable, con responsable, evidencia y criterio de cierre.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-016`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 2. `UX-QA-018` — Los eventos idempotentes no duplican efectos

- **Qué hace:** Convierte «Los eventos idempotentes no duplican efectos» en una condición verificable, con responsable, evidencia y criterio de cierre.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-017`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 3. `UX-QA-019` — Los fallos parciales permiten recuperación

- **Qué hace:** Convierte «Los fallos parciales permiten recuperación» en una condición verificable, con responsable, evidencia y criterio de cierre.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-018`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 4. `UX-QA-020` — Cada aplicación supera piloto con usuarios reales

- **Qué hace:** Convierte «Cada aplicación supera piloto con usuarios reales» en una condición verificable, con responsable, evidencia y criterio de cierre.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-019`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 5. `UX-QA-021` — Probar SHELL por tipo de actor

- **Qué hace:** Prueba SHELL por tipo de actor en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-020`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 6. `UX-QA-022` — Probar ANIMA con trabajadores y administradores

- **Qué hace:** Prueba ANIMA con trabajadores y administradores en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-021`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 7. `UX-QA-023` — Probar VISO por rol administrativo

- **Qué hace:** Prueba VISO por rol administrativo en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-022`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 8. `UX-QA-024` — Probar NEXO por rol operativo

- **Qué hace:** Prueba NEXO por rol operativo en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-023`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 9. `UX-QA-025` — Probar FOGO por área productiva

- **Qué hace:** Prueba FOGO por área productiva en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-024`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 10. `UX-QA-026` — Probar ORIGO por etapa de compra

- **Qué hace:** Prueba ORIGO por etapa de compra en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-025`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 11. `UX-QA-027` — Probar PULSO por punto operativo

- **Qué hace:** Prueba PULSO por punto operativo en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-026`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`

### 12. `UX-QA-028` — Probar NUMERA por alcance financiero

- **Qué hace:** Prueba NUMERA por alcance financiero en escenarios representativos y registra resultados y defectos reales.
- **Trabajo canónico ahora:** El marcador canónico define una sola vez el contrato de certificación.
- **Ciclo:** Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL`
- **Dependencias para desarrollar:** Precedencia de ruta: `UX-QA-027`
- **Se ejecuta después de:** Las dependencias temporales se resuelven exclusivamente mediante execution_gate.
- **Regla de repetición:** Se registra una ejecución por package_id y una certificación GLOBAL-FINAL agregada cuando corresponda.
- **Pruebas:** Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo
- **Cierre del marcador global:** Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.
- **Fuente:** `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`


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
| 31 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | BLOQUE U — Pruebas integrales y certificación transversal | ACTIVE | `UX-QA-017` |
| 32 | `PHASE-13-R3-LEGACY-RETIREMENT` | BLOQUE R3 — Retiro legacy y certificación final | ACTIVE | `AUTH-DB-030` |
| 3 | `PHASE-02-E1-EXTERNAL-GOVERNANCE-CONDITIONAL` | BLOQUE E1 — Expediente condicional de gobierno externo | DEFERRED | `EXT-GOV-001` |
| 8 | `PHASE-02-VISO-SCHEDULE-DELTA` | BLOQUE G — Reconciliación de programación laboral VISO | DEFERRED | `VISO-SCH-001` |

## 🟦 Secuencia documental pendiente exacta — autoridad machine-readable

> Esta tabla conserva deliberadamente las columnas `Identificador` y `Título canónico`: otros validadores la consumen como autoridad machine-readable. Las etapas `ACTIVE` aparecen primero; las `DEFERRED` permanecen al final sin perderse.

| Pendiente # | Orden canónico | Etapa | Estado | Identificador | Título canónico | Qué hace | Ciclo | Dependencias para desarrollar | Ejecución posterior | Pruebas / TREQ | Cierre global | Fragmento propietario |
| ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1581 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-017` | La aplicación propietaria conserva la fuente de verdad | Convierte «La aplicación propietaria conserva la fuente de verdad» en una condición verificable, con responsable, evidencia y criterio de cierre. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-016` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 2 | 1582 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-018` | Los eventos idempotentes no duplican efectos | Convierte «Los eventos idempotentes no duplican efectos» en una condición verificable, con responsable, evidencia y criterio de cierre. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-017` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 3 | 1583 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-019` | Los fallos parciales permiten recuperación | Convierte «Los fallos parciales permiten recuperación» en una condición verificable, con responsable, evidencia y criterio de cierre. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-018` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 4 | 1584 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-020` | Cada aplicación supera piloto con usuarios reales | Convierte «Cada aplicación supera piloto con usuarios reales» en una condición verificable, con responsable, evidencia y criterio de cierre. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-019` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 5 | 1585 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-021` | Probar SHELL por tipo de actor | Prueba SHELL por tipo de actor en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-020` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 6 | 1586 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-022` | Probar ANIMA con trabajadores y administradores | Prueba ANIMA con trabajadores y administradores en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-021` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 7 | 1587 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-023` | Probar VISO por rol administrativo | Prueba VISO por rol administrativo en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-022` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 8 | 1588 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-024` | Probar NEXO por rol operativo | Prueba NEXO por rol operativo en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-023` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 9 | 1589 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-025` | Probar FOGO por área productiva | Prueba FOGO por área productiva en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-024` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 10 | 1590 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-026` | Probar ORIGO por etapa de compra | Prueba ORIGO por etapa de compra en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-025` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 11 | 1591 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-027` | Probar PULSO por punto operativo | Prueba PULSO por punto operativo en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-026` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 12 | 1592 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-028` | Probar NUMERA por alcance financiero | Prueba NUMERA por alcance financiero en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-027` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 13 | 1593 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-029` | Probar PASS como cliente | Prueba PASS como cliente en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-028` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 14 | 1594 | `PHASE-13-U-INTEGRAL-CERTIFICATION` | NO INICIADA | `UX-QA-030` | Probar AURA únicamente después de aprobar su continuidad | Prueba AURA únicamente después de aprobar su continuidad en escenarios representativos y registra resultados y defectos reales. | Instancia por paquete y certificación global final — `<task_id>::<package_id> + <task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-029` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: unitarias/render, accesibilidad, regresión visual e integración del flujo | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md` |
| 15 | 1595 | `PHASE-13-R3-LEGACY-RETIREMENT` | NO INICIADA | `AUTH-DB-030` | Retirar objetos legacy únicamente después de adopción comprobada | Retira objetos legacy únicamente después de adopción comprobada solo después de verificar el reemplazo y el rollback. | Una certificación global final — `<task_id>::GLOBAL-FINAL` | Precedencia de ruta: `UX-QA-030` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: paridad contractual y operativa, build por consumidor, regresión y rollback | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/R_SUPABASE/06_R3_RETIRO_Y_CERTIFICACION_FINAL.md` |
| 16 | 1596 | `PHASE-13-R3-LEGACY-RETIREMENT` | NO INICIADA | `AUTH-DB-031` | Certificar paridad entre documento, vento-shell, Supabase y aplicaciones | Certifica paridad entre documento, vento-shell, Supabase y aplicaciones con evidencia de paridad y cumplimiento. | Una certificación global final — `<task_id>::GLOBAL-FINAL` | Precedencia de ruta: `AUTH-DB-030` | Las dependencias temporales se resuelven exclusivamente mediante execution_gate. | Por definir al desarrollar · perfil previsto: paridad contractual y operativa, build por consumidor, regresión y rollback | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/R_SUPABASE/06_R3_RETIRO_Y_CERTIFICACION_FINAL.md` |
| 17 | 223 | `PHASE-02-E1-EXTERNAL-GOVERNANCE-CONDITIONAL` | NO INICIADA | `EXT-GOV-001` | Verificar soporte documental de titulares, marcas y cuentas externas del ecosistema | Verifica soporte documental de titulares, marcas y cuentas externas del ecosistema, registra brechas y deja evidencia del resultado. | Definir una sola vez sin instancia física propia — `<task_id>` | `OPS-GOV-001` aprobada + expediente disponible | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | OPS-GOV-001 podrá aprobarse cuando se confirme que: | `bloques/E1_DESCUBRIMIENTO_OPERATIVO/02A_TAREAS_DERIVADAS_OPS_AUD_001.md` |
| 18 | 612 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-001` | Definir contrato funcional de programación laboral | Define contrato funcional de programación laboral con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `EXT-GOV-001` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 19 | 613 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-002` | Definir horizontes semanal y mensual | Define horizontes semanal y mensual con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-001` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 20 | 614 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-003` | Definir bloques, fechas, duración y modalidad rápida | Define bloques, fechas, duración y modalidad rápida con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-002` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 21 | 615 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-004` | Definir límites mensuales, advertencias, vigencia y excepciones | Define límites mensuales, advertencias, vigencia y excepciones con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-003` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 22 | 616 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-005` | Definir borrador, revisión, publicación y corrección | Define borrador, revisión, publicación y corrección con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-004` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 23 | 617 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-006` | Definir conflictos, integridad, concurrencia y recuperación | Define conflictos, integridad, concurrencia y recuperación con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-005` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 24 | 618 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-007` | Definir autorización, auditoría, eventos y notificaciones | Define autorización, auditoría, eventos y notificaciones con reglas, responsables, excepciones y criterios verificables. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-006` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: contrato, integración, denegaciones, seguridad/RLS y regresión | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 25 | 619 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `VISO-SCH-008` | Aprobar contrato de programación antes de E5 | Aprueba contrato de programación antes de E5 solo después de revisar evidencia y bloqueos. | Definir una sola vez sin instancia física propia — `<task_id>` | Precedencia de ruta: `VISO-SCH-007` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/G_VISO/01A_PROGRAMACION_LABORAL.md` |
| 26 | 620 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `CODE-AUD-021` | Reconciliar el delta técnico de programación mensual VISO | Reconcilia el delta técnico de programación mensual VISO con sus fuentes canónicas y resuelve cada diferencia. | Definir una sola vez sin instancia física propia — `<task_id>` | commit estable; migración documentada; snapshots CODE-AUD- aprobados | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: consistencia documental, TREQ y validación funcional proporcional al materializar | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/E1_DESCUBRIMIENTO_OPERATIVO/04B_RECONCILIACION_DELTA_VISO_PROGRAMACION.md` |
| 27 | 621 | `PHASE-02-VISO-SCHEDULE-DELTA` | NO INICIADA | `AUTH-UI-061` | Reconciliar rutas y superficies VISO posteriores al inventario aprobado | Reconcilia rutas y superficies VISO posteriores al inventario aprobado con sus fuentes canónicas y resuelve cada diferencia. | Definir una sola vez sin instancia física propia — `<task_id>` | `CODE-AUD-021`, commit estable, `VISO-SCH-008` | No crea una instancia física propia. | Por definir al desarrollar · perfil previsto: contrato, integración, denegaciones, seguridad/RLS y regresión | Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables. | `bloques/I_NAVEGACION_Y_PANTALLAS/07_RECONCILIACION_DE_DERIVA_POSTERIOR.md` |
