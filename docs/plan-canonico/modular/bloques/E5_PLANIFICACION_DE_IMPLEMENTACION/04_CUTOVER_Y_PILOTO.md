### CUTOVER Y PILOTO

Estas tareas diseñan y aprueban el plan que `SHELL-CI-022` ejecutará después
de superar `SHELL-CI-021`.

### ✅ CUTOVER-OPS-001 — Definir criterio para seleccionar fecha, ventana y responsables del cutover

**Estado:** APROBADA
**Tarea anterior:** READY-GATE-015 — Definir autoridad y criterio para aprobar la entrada al piloto operativo
**Tarea siguiente:** CUTOVER-OPS-002 — Definir secuencia de activación por sede, área, rol o proceso
**Tipo de tarea:** documental — definición normativa y materialización del criterio para seleccionar, por paquete y candidato autorizado, una fecha y ventana de cutover operativamente viable, resolver los responsables ya existentes que deberán estar disponibles durante esa ventana y dejar un expediente reproducible para la ejecución posterior; sin ejecutar cutover, piloto, despliegues, promociones, rollback, cambios de configuración, migraciones, DDL/DML, backfills, modificaciones de datos ni operaciones sobre Supabase
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>`

---

#### 1. Propósito

`CUTOVER-OPS-001` define cómo seleccionar una fecha y una ventana de cutover para una instancia concreta de paquete que ya haya recibido un handoff elegible desde `READY-GATE-015`, y cómo demostrar que durante esa ventana estarán disponibles las autoridades, responsables técnicos, responsables operativos, soporte y autoridades de recuperación que el expediente del paquete ya exige.

La tarea responde exclusivamente a estas preguntas:

```text
¿QUÉ PAQUETE, CANDIDATO, AMBIENTE Y ALCANCE ESTÁN AUTORIZADOS PARA ENTRAR?
+
¿QUÉ FECHA Y VENTANA SON COMPATIBLES CON ESE MISMO ALCANCE?
+
¿LA VENTANA PERMITE EJECUTAR, VERIFICAR Y, SI SE DISPARA, RECUPERAR SIN IMPROVISAR?
+
¿LAS AUTORIDADES Y RESPONSABLES YA DEFINIDOS ESTÁN IDENTIFICADOS Y DISPONIBLES?
+
¿LAS DEPENDENCIAS, SOPORTE, OBSERVABILIDAD Y CONDICIONES OPERATIVAS SIGUEN VIGENTES?
=
VENTANA DE CUTOVER SELECCIONABLE Y TRAZABLE
```

La selección de una fecha no constituye ejecución. La existencia de una fecha en un calendario no constituye autorización de entrada al piloto. La tarea tampoco crea una autoridad nueva: resuelve y referencia las autoridades y responsables que ya pertenecen al expediente aprobado del paquete y a sus contratos de readiness, rollout, rollback, soporte y operación.

---

#### 2. Resultado sustantivo

La tarea materializa cuatro piezas documentales por `package_id`:

1. `cutover_window_candidates::<package_id>` — conjunto de ventanas candidatas consideradas, con sus restricciones, dependencias y motivos de descarte o bloqueo;
2. `cutover_responsibility_map::<package_id>` — resolución de las autoridades y responsables ya existentes que deben cubrir la ventana, sin crear roles ni propietarios nuevos;
3. `cutover_window_decision::<package_id>` — resultado documental de selección de ventana para el mismo paquete, candidato, ambiente y alcance autorizados;
4. `cutover_window_manifest::<package_id>` — expediente único que conserva fecha, zona horaria, límites de la ventana, identidad del candidato, referencias de readiness, disponibilidad de responsables, condiciones de recuperación y evidencia de la decisión.

Estas piezas son diseño para la ejecución posterior de `SHELL-CI-022::<package_id>`. No afirman que la ventana haya ocurrido ni que sus actividades se hayan ejecutado.

---

#### 3. Alcance y fronteras

`CUTOVER-OPS-001` consume contratos ya aprobados y no los redefine.

En particular:

- consume `READY-GATE-015` como única puerta final de elegibilidad para entrada al piloto;
- consume `DELIV-PKG-019` como propietario de la estrategia de despliegue y rollout;
- consume `DELIV-PKG-020` como propietario del rollback técnico, funcional y de datos;
- consume `DELIV-PKG-022` como propietario del alcance, actores, sedes, datos, dispositivos, entorno, duración, cohortes, exclusiones y salvaguardas del piloto;
- consume `READY-GATE-010` para cobertura de soporte, responsables y escalamiento;
- consume `READY-GATE-011` para monitoreo, métricas y alertas;
- consume `READY-GATE-012` para respaldo y rollback probados;
- consume `READY-GATE-013` para la línea base previa al piloto;
- consume `READY-GATE-014` para riesgos aceptados y condiciones de suspensión;
- no redefine el criterio de autorización de entrada ya cerrado por `READY-GATE-015`;
- no define la secuencia de activación por sede, área, rol o proceso, reservada a `CUTOVER-OPS-002`;
- no define convivencia temporal con el proceso anterior, reservada a `CUTOVER-OPS-003`;
- no diseña controles contra doble registro o doble efecto, reservados a `CUTOVER-OPS-004`;
- no define conciliaciones durante el piloto, reservadas a `CUTOVER-OPS-005`;
- no define el criterio operativo de pausa, reversión o continuación, reservado a `CUTOVER-OPS-006`;
- no diseña el registro de incidentes, decisiones o cambios de alcance, reservado a `CUTOVER-OPS-007`;
- no redefine métricas del piloto, reservadas a `CUTOVER-OPS-008`;
- no decide la salida del piloto, reservada a `CUTOVER-OPS-009`;
- no define las condiciones ni la evidencia de elegibilidad para retirar el proceso anterior, reservadas a `CUTOVER-OPS-010`; el retiro lógico o físico permanece fuera de CUTOVER y solo podrá ejecutarse mediante sus tareas propietarias posteriores.

La tarea selecciona **cuándo** puede ejecutarse el cutover y **qué responsables existentes deben cubrir esa ventana**. Las tareas siguientes conservan la propiedad de cómo se activa, cómo convive, cómo se controla, cómo se concilia y cómo se decide durante y después de la ejecución.

---

#### 4. Precondición obligatoria de elegibilidad

Una ventana solo puede entrar al proceso de selección cuando exista, para la misma instancia:

```text
package_id
+
candidato
+
ambiente
+
alcance autorizado
+
pilot_entry_decision = APROBAR_ENTRADA
```

La referencia a `READY-GATE-015` debe demostrar que la decisión de entrada:

1. corresponde exactamente al mismo `package_id`;
2. corresponde al mismo candidato o revisión que se pretende ejecutar;
3. corresponde al mismo ambiente;
4. corresponde al mismo alcance autorizado de sedes, actores, procesos, datos, dispositivos o superficies aplicables;
5. permanece vigente y no ha sido invalidada por un cambio material posterior.

`DENEGAR_ENTRADA`, `BLOQUEAR_DECISION` o ausencia de decisión válida impiden seleccionar una ventana ejecutable.

Cuando `READY-GATE-015` haya resuelto `NO_APLICA`, `CUTOVER-OPS-001` no fabricará una ventana de cutover para esa instancia. Si el modelo aprobado del paquete depende de la ventana de otra raíz o cohorte y no posee una ventana independiente, esa dependencia deberá quedar referenciada de forma explícita y no podrá convertirse en una ventana autónoma por inferencia.

---

#### 5. Unidad de selección

La unidad mínima de selección de ventana es:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
cutover_date
+
window_start
+
window_end
+
timezone
```

No se permite una fecha sin zona horaria ni una “ventana abierta” sin inicio y fin identificables.

Una misma fecha puede contener más de una ventana candidata, pero solo podrá quedar seleccionada aquella cuya compatibilidad haya sido evaluada contra el mismo candidato, ambiente, alcance, responsables y dependencias.

La selección no transforma una ventana candidata en una autorización para ampliar cohorte, sede, rol, proceso, dispositivo, dato o ambiente.

---

#### 6. Fuentes obligatorias para construir las ventanas candidatas

Las ventanas candidatas deberán derivarse exclusivamente de información vigente del mismo expediente:

1. decisión de entrada de `READY-GATE-015`;
2. artefacto, ambiente y estrategia de rollout de `DELIV-PKG-019`;
3. objetivos, disparadores, autoridad y procedimiento de recuperación de `DELIV-PKG-020`;
4. alcance y modalidad de piloto de `DELIV-PKG-022`;
5. cobertura de soporte y escalamiento confirmada por `READY-GATE-010`;
6. cobertura de observabilidad confirmada por `READY-GATE-011`;
7. evidencia de respaldo y rollback aplicable confirmada por `READY-GATE-012`;
8. línea base vigente de `READY-GATE-013`;
9. riesgos aceptados y condiciones de suspensión vigentes de `READY-GATE-014`;
10. dependencias, precondiciones, calendarios, restricciones operativas o disponibilidades que ya estén materializadas en las fuentes propietarias del paquete.

Si una restricción necesaria no está materializada en una fuente canónica o en evidencia de readiness, no se inventa. La ausencia que impida determinar la viabilidad de la ventana produce bloqueo de selección y debe conservar propietario y condición de salida.

---

#### 7. Criterios para seleccionar la fecha

Una fecha candidata es elegible únicamente cuando, para el alcance evaluado:

1. la decisión `APROBAR_ENTRADA` sigue vigente;
2. el candidato y ambiente no han cambiado desde la decisión de readiness;
3. no existe una dependencia obligatoria abierta que impida la ejecución;
4. las restricciones operativas materializadas permiten realizar el cutover en esa fecha;
5. los responsables obligatorios pueden cubrir la ventana completa que les corresponda;
6. soporte, monitoreo y escalamiento permanecen disponibles durante la exposición prevista;
7. la capacidad de recuperación requerida puede ejercerse dentro de la ventana o de la reserva explícitamente asociada;
8. las condiciones de suspensión vigentes no están ya materializadas antes de iniciar;
9. cualquier tercero, proveedor o dependencia externa necesaria tiene disponibilidad confirmada cuando el contrato del paquete la exige;
10. la fecha permite conservar evidencia, trazabilidad y handoff sin crear periodos sin propietario.

No se establece un día de la semana, horario nocturno, horario comercial, duración mínima universal ni “mejor momento” global. Esas decisiones dependen de las restricciones y evidencias de cada paquete.

Una fecha con menor actividad operativa no se considera automáticamente mejor. Una fecha más cercana tampoco prevalece sobre otra si reduce cobertura, recuperación, observabilidad o disponibilidad de autoridad.

---

#### 8. Composición obligatoria de la ventana

La ventana seleccionada deberá reservar capacidad temporal suficiente para las actividades aplicables del paquete sin imponer duraciones universales.

Como mínimo deberá distinguir:

1. **checkpoint previo** — confirmación inmediata de que candidato, ambiente, alcance, responsables y condiciones de entrada siguen siendo los autorizados;
2. **intervalo de ejecución** — tiempo previsto para las acciones que `SHELL-CI-022::<package_id>` ejecutará conforme al plan aprobado;
3. **intervalo de verificación inmediata** — tiempo necesario para comprobar señales y resultados que el plan exija antes de dar por terminada la ventana técnica;
4. **reserva de recuperación** — capacidad temporal compatible con el objetivo y procedimiento de rollback, recovery, compensation o reconciliation de `DELIV-PKG-020` cuando aplique;
5. **handoff operativo** — punto en el que la responsabilidad pasa de la ejecución del cutover a la observación o fase posterior definida por las tareas siguientes.

Estas divisiones no presuponen que todas las actividades deban ser secuenciales ni fijan minutos u horas por defecto. La duración deberá derivarse de la estrategia, complejidad, objetivos de recuperación, evidencia y condiciones reales del paquete.

La ventana es inválida si solo alcanza para “hacer el cambio” pero no permite cumplir las verificaciones y la capacidad de recuperación que el expediente exige.

---

#### 9. Resolución de responsables

`cutover_responsibility_map::<package_id>` deberá resolver personas, actores, funciones o autoridades reales a partir de identidades ya aprobadas. No podrá crear un rol universal de “jefe de cutover” ni asignar un `OWN-*` distinto por conveniencia.

La resolución deberá cubrir, cuando aplique:

| Responsabilidad durante la ventana                   | Fuente de autoridad                                                                            |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| decisión sobre la ventana seleccionada y su vigencia | `Responsable de decisión` `OWN-*` ya asignado al paquete                                       |
| ejecución técnica del cambio                         | propietario o ejecutor técnico materializado por el expediente de implementación del paquete   |
| disponibilidad y coordinación del alcance operativo  | propietario o responsable operativo ya materializado para el proceso, sede o cohorte aplicable |
| soporte y escalamiento                               | responsables vigentes demostrados por `READY-GATE-010`                                         |
| observación y respuesta ante señales                 | propietarios y receptores vigentes demostrados por `READY-GATE-011`                            |
| decisión o ejecución de recuperación                 | autoridad y ejecutores definidos por `DELIV-PKG-020`, preservando su segregación               |
| decisión frente a riesgo o condición de suspensión   | autoridad definida por `READY-GATE-014` y los contratos que dicha puerta consume               |

Reglas:

1. una misma persona solo podrá cubrir varias responsabilidades cuando la autorización y segregación vigentes lo permitan;
2. la disponibilidad nominal no equivale a autoridad;
3. un proveedor puede ejecutar o asistir dentro de su alcance, pero no hereda autoridad empresarial por estar disponible;
4. un responsable sin suplencia requerida o sin mecanismo de escalamiento aplicable bloquea la ventana;
5. ninguna ausencia se resuelve creando un propietario ad hoc dentro de esta tarea;
6. cualquier identidad pendiente deberá conservar la fuente propietaria que debe resolverla antes de seleccionar la ventana.

---

#### 10. Cobertura temporal de responsables

La disponibilidad se evalúa contra el intervalo en el que cada responsabilidad puede ser requerida, no solo contra el instante de inicio.

La selección deberá demostrar, cuando aplique:

- cobertura desde el checkpoint previo hasta el cierre de la ejecución;
- continuidad de responsable durante cambios de turno;
- cobertura del intervalo de verificación inmediata;
- disponibilidad de la autoridad y ejecutores de recuperación durante toda la reserva aplicable;
- cobertura de soporte y observabilidad durante el periodo exigido por el paquete;
- mecanismo de handoff cuando una persona deje de estar disponible antes de terminar su obligación.

Un contacto “de guardia” sin alcance, aceptación o canal verificables no constituye cobertura. El silencio de un responsable tampoco constituye aceptación de la ventana.

---

#### 11. Compatibilidad con rollout y piloto

La ventana de cutover no reemplaza la estrategia progresiva de `DELIV-PKG-019` ni la duración del piloto de `DELIV-PKG-022`.

Por tanto:

1. `CUTOVER-OPS-001` no fuerza `FULL`, `LIMITED`, `PILOT`, `SHADOW` ni otro estado de activación;
2. cualquier cohorte, canary, pausa o promoción sigue gobernada por los contratos propietarios correspondientes;
3. la duración posterior del piloto no se reduce a la duración de la ventana de cutover;
4. cuando `DELIV-PKG-022` exija una ventana de piloto que continúe durante días o ciclos operativos, la fecha de cutover únicamente establece el inicio autorizado de la exposición correspondiente;
5. una raíz compartida, de control o sin ventana independiente conserva el tratamiento aprobado en `DELIV-PKG-022` y no recibe un cutover artificial;
6. las raíces AURA, TALENTO o dependencias externas conservan sus bloqueos mientras sus condiciones propietarias sigan abiertas.

---

#### 12. Conflictos y concurrencia

Dos o más ventanas de paquetes podrán coexistir únicamente si sus expedientes permiten demostrar que la concurrencia no rompe dependencias, capacidad de recuperación, soporte, observabilidad, segregación ni ownership.

Si existen paquetes con:

- dependencia de implementación entre sí;
- recursos técnicos compartidos;
- misma cohorte o proceso crítico;
- misma autoridad de recuperación;
- cobertura de soporte limitada;
- ventanas de terceros incompatibles;
- efectos cuya separación no puede demostrarse;

la selección deberá conservar la dependencia y bloquear la simultaneidad hasta que una fuente propietaria permita demostrar compatibilidad.

`CUTOVER-OPS-001` no inventa un algoritmo global de prioridad entre paquetes. Cuando varias ventanas sean igualmente elegibles, la decisión deberá quedar atribuida al `Responsable de decisión` vigente y sustentada en restricciones u objetivos ya materializados, no en un orden implícito.

---

#### 13. Resultado documental de cada ventana candidata

Cada ventana candidata tendrá uno de estos resultados documentales:

| Resultado      | Condición                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SELECCIONADA` | satisface todas las precondiciones aplicables, tiene responsables resueltos y constituye la ventana elegida para el mismo paquete, candidato, ambiente y alcance |
| `DESCARTADA`   | es evaluable pero existe otra ventana elegida o una restricción material documentada demuestra que no debe utilizarse                                            |
| `BLOQUEADA`    | falta evidencia, identidad, disponibilidad, autoridad o resolución suficiente para determinar que la ventana puede ejecutarse de forma gobernada                 |
| `NO_APLICA`    | el modelo aprobado demuestra que la instancia no posee una ventana de cutover independiente                                                                      |

Solo puede existir una `SELECCIONADA` vigente por la misma instancia de `package_id + candidate_ref + environment + authorized_scope_ref`.

`DESCARTADA` no equivale a fallo del paquete. `BLOQUEADA` no puede transformarse en `SELECCIONADA` por decisión verbal sin resolver la causa. `NO_APLICA` requiere trazabilidad al modelo aprobado y no se usa para ocultar una ventana pendiente.

---

#### 14. Contenido mínimo de `cutover_window_manifest::<package_id>`

El manifiesto de la ventana seleccionada deberá conservar, como mínimo:

| Campo                         | Regla                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `package_id`                  | identidad canónica exacta del paquete                                           |
| `candidate_ref`               | candidato o revisión autorizado                                                 |
| `environment`                 | ambiente exacto autorizado                                                      |
| `authorized_scope_ref`        | referencia al alcance aprobado sin ampliaciones                                 |
| `pilot_entry_decision_ref`    | referencia vigente a `APROBAR_ENTRADA` de `READY-GATE-015`                      |
| `cutover_date`                | fecha civil de la ventana                                                       |
| `window_start`                | inicio exacto                                                                   |
| `window_end`                  | fin exacto                                                                      |
| `timezone`                    | zona horaria explícita aplicable                                                |
| `rollout_plan_ref`            | referencia al contrato aplicable de `DELIV-PKG-019`                             |
| `recovery_plan_ref`           | referencia al contrato aplicable de `DELIV-PKG-020`                             |
| `pilot_scope_ref`             | referencia al alcance aplicable de `DELIV-PKG-022`                              |
| `support_readiness_ref`       | evidencia vigente de cobertura de `READY-GATE-010`                              |
| `observability_readiness_ref` | evidencia vigente de `READY-GATE-011`                                           |
| `rollback_readiness_ref`      | evidencia vigente de `READY-GATE-012`                                           |
| `baseline_ref`                | referencia vigente de `READY-GATE-013`                                          |
| `risk_ref`                    | referencia vigente de `READY-GATE-014`                                          |
| `responsibility_map_ref`      | mapa de responsables resueltos para la ventana                                  |
| `candidate_windows_ref`       | conjunto de ventanas consideradas y su disposición                              |
| `selection_result`            | `SELECCIONADA`, `DESCARTADA`, `BLOQUEADA` o `NO_APLICA` según corresponda       |
| `decision_actor`              | autoridad existente que adopta la selección                                     |
| `decision_at`                 | momento atribuible de la decisión                                               |
| `blocking_reason`             | causa concreta cuando exista bloqueo                                            |
| `blocking_owner`              | propietario canónico de resolver la causa                                       |
| `evidence_refs`               | referencias suficientes para reproducir la selección, sin secretos innecesarios |

La identidad temporal del manifiesto debe ser inequívoca. Cambiar fecha, inicio, fin, zona horaria, candidato, ambiente o alcance produce una nueva decisión de ventana; no se corrige silenciosamente el manifiesto anterior como si nunca hubiera existido.

---

#### 15. Invalidez y revalidación de una ventana seleccionada

Una ventana deja de ser ejecutable cuando, antes de su inicio, ocurre cualquiera de estas condiciones:

1. cambia el candidato o revisión;
2. cambia el ambiente;
3. cambia el alcance autorizado;
4. `READY-GATE-015` deja de respaldar `APROBAR_ENTRADA` para la misma instancia;
5. aparece una condición de suspensión aplicable de `READY-GATE-014`;
6. cambia materialmente la estrategia de rollout o la capacidad de recuperación;
7. desaparece cobertura obligatoria de responsable, soporte, observabilidad o rollback;
8. una dependencia obligatoria pasa a estado abierto o no demostrable;
9. la evidencia necesaria vence, queda obsoleta o deja de corresponder al mismo candidato;
10. la ventana ya transcurrió sin ejecución.

La consecuencia es volver a evaluar la selección con las fuentes propietarias actualizadas. Esta tarea no reabre ni corrige por sí sola una puerta de readiness, un plan de rollout, un rollback o una decisión de riesgo.

Una reprogramación no puede preservar artificialmente una autorización que estaba vinculada a condiciones ya cambiadas.

---

#### 16. Evidencia suficiente e insuficiente

Puede sustentar la selección, según corresponda:

- decisión reproducible de `READY-GATE-015`;
- calendario o disponibilidad operativa atribuible;
- evidencia vigente de cobertura de responsables;
- referencias de rollout y recovery aprobadas;
- disponibilidad confirmada de terceros obligatorios;
- evidencia de soporte, observabilidad, rollback, baseline y riesgo vigente;
- registro de restricciones o dependencias que justifique selección, descarte o bloqueo;
- aceptación trazable de la autoridad que selecciona la ventana.

No es suficiente por sí solo:

- una invitación de calendario;
- un mensaje de chat con una fecha;
- “todos están disponibles” sin identidades y alcance;
- una fecha histórica usada por otro paquete;
- una ventana de mantenimiento genérica sin correlación con el candidato;
- un `APROBAR_ENTRADA` perteneciente a otro candidato, ambiente o alcance;
- disponibilidad del proveedor sin autoridad ni responsables internos;
- un plan de rollback documental sin readiness vigente cuando la puerta aplicable exige evidencia;
- ausencia de incidentes como prueba de que una fecha es segura;
- una estimación de duración sin fuente en el expediente;
- una ventana que no deja capacidad para las verificaciones y recuperación exigibles.

---

#### 17. Tratamiento de bloqueos

Todo `BLOQUEADA` deberá identificar:

1. causa concreta;
2. fuente que impide resolverla;
3. propietario canónico de la resolución;
4. condición objetiva de salida;
5. evidencia que deberá actualizarse;
6. efecto sobre la ventana y sobre cualquier ventana dependiente.

No se permite un pendiente narrativo sin dueño documental.

Si el bloqueo pertenece a readiness, rollout, rollback, piloto, soporte, observabilidad, riesgo o identidad física, la corrección deberá ocurrir en la fuente propietaria correspondiente antes de recalcular la selección.

---

#### 18. Handoff a `CUTOVER-OPS-002`

`CUTOVER-OPS-001` entrega a `CUTOVER-OPS-002` únicamente una frontera temporal y de responsabilidad ya seleccionada:

```text
PAQUETE / CANDIDATO / AMBIENTE / ALCANCE
+
FECHA / INICIO / FIN / ZONA HORARIA
+
RESPONSABLES Y AUTORIDADES RESUELTOS
+
REFERENCIAS VIGENTES DE READINESS / ROLLOUT / RECOVERY
=
VENTANA BASE PARA DISEÑAR LA SECUENCIA DE ACTIVACIÓN
```

`CUTOVER-OPS-002` podrá ordenar la activación dentro de esa frontera, pero no deberá reinterpretar una ventana `BLOQUEADA` como ejecutable ni cambiar silenciosamente fecha, candidato, ambiente, alcance o autoridad.

---

#### 19. Separación entre planificación y ejecución

La secuencia permanece:

```text
SHELL-CI-020::<package_id>
→ implementación aplicable
→ SHELL-CI-021::<package_id>
→ READY-GATE-015 resuelto
→ plan CUTOVER-OPS aplicable
→ SHELL-CI-022::<package_id>
```

`SHELL-CI-022::<package_id>` será quien conserve durante la ejecución real paquete, versión, ambiente, ventana, actor, decisión y evidencia.

Esta tarea:

- no reserva calendarios reales;
- no envía invitaciones;
- no despliega;
- no activa cohortes;
- no ejecuta pruebas productivas;
- no inicia el piloto;
- no ejecuta rollback;
- no cambia datos;
- no modifica configuración;
- no modifica Supabase.

---

#### 20. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `CUTOVER-OPS-001` materializa un criterio documental de selección temporal y resolución de responsables para ejecutar posteriormente contratos ya aprobados. No crea comportamiento empresarial, transición de estado de negocio, autorización server-side, regla de cálculo, contrato de integración, persistencia, SLA, algoritmo de rollout, mecanismo de rollback ni conducta de runtime nueva. La ejecución y evidencia física permanecen asignadas a `SHELL-CI-022::<package_id>`, mientras rollout, rollback, alcance de piloto y readiness conservan sus autoridades propietarias.

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

---

#### 21. Criterios de aceptación documental

`CUTOVER-OPS-001` queda documentalmente completo cuando:

1. la tarea conserva `READY-GATE-015 → CUTOVER-OPS-001 → CUTOVER-OPS-002`;
2. una ventana solo puede seleccionarse para la misma instancia que conserva `APROBAR_ENTRADA`;
3. paquete, candidato, ambiente, alcance, fecha, inicio, fin y zona horaria quedan identificados;
4. se prohíbe usar una decisión de readiness de otro candidato, ambiente o alcance;
5. se materializa un conjunto de ventanas candidatas y su disposición;
6. la fecha se selecciona por restricciones y evidencia del paquete, sin horario o duración universal inventados;
7. la ventana contempla checkpoint previo, ejecución, verificación, capacidad de recuperación y handoff cuando apliquen;
8. la duración de la ventana no se confunde con la duración del piloto;
9. `DELIV-PKG-019` conserva rollout y promoción;
10. `DELIV-PKG-020` conserva rollback técnico, funcional y de datos;
11. `DELIV-PKG-022` conserva alcance, cohortes y duración de piloto;
12. `READY-GATE-010..014` conservan sus autoridades de soporte, observabilidad, rollback probado, baseline y riesgo;
13. el `Responsable de decisión` `OWN-*` se reutiliza desde el paquete sin crear una autoridad global nueva;
14. responsables técnicos, operativos, de soporte, observabilidad y recuperación se resuelven desde fuentes existentes;
15. disponibilidad nominal no se confunde con autoridad;
16. proveedor externo no sustituye ownership ni autoridad interna;
17. una ventana sin cobertura de responsabilidades obligatorias queda bloqueada;
18. concurrencia entre paquetes exige compatibilidad demostrable y no se presume;
19. se definen `SELECCIONADA`, `DESCARTADA`, `BLOQUEADA` y `NO_APLICA` con semántica inequívoca;
20. existe como máximo una ventana `SELECCIONADA` vigente para la misma instancia;
21. todo bloqueo tiene causa, propietario y condición de salida;
22. cambios materiales invalidan la ejecutabilidad de la ventana y exigen revalidación;
23. `cutover_window_manifest::<package_id>` conserva los campos mínimos para reproducir la decisión;
24. `CUTOVER-OPS-002` recibe la frontera temporal sin que esta tarea adelante la secuencia de activación;
25. la ejecución real permanece en `SHELL-CI-022::<package_id>`;
26. no se ejecutan cambios físicos, código, despliegues, migraciones, DDL/DML, backfills, modificaciones de datos, configuración remota ni operaciones de Supabase;
27. se crean cero requisitos `TREQ-*`, se modifican cero requisitos `TREQ-*` y se afectan cero fragmentos 04A.

---

#### 22. Continuidad

**ÚLTIMA TAREA APROBADA**
`READY-GATE-015 — Definir autoridad y criterio para aprobar la entrada al piloto operativo`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-001 — Definir criterio para seleccionar fecha, ventana y responsables del cutover`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-002 — Definir secuencia de activación por sede, área, rol o proceso`


### ✅ CUTOVER-OPS-002 — Definir secuencia de activación por sede, área, rol o proceso

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-001 — Definir criterio para seleccionar fecha, ventana y responsables del cutover
**Tarea siguiente:** CUTOVER-OPS-003 — Definir convivencia temporal con el proceso anterior
**Tipo de tarea:** documental — definición normativa y materialización de la secuencia de activación por paquete dentro de la ventana de cutover ya seleccionada, resolviendo unidades y olas por sede, área, rol, proceso o intersección aplicable sin ampliar el alcance autorizado ni ejecutar activaciones, promociones, despliegues, rollback, cambios de configuración, migraciones, DDL/DML, backfills, modificaciones de datos u operaciones sobre Supabase

---

#### 1. Propósito

`CUTOVER-OPS-002` define el orden concreto que deberá seguir una instancia de paquete durante el cutover para exponer únicamente el alcance ya autorizado, dentro de la ventana seleccionada por `CUTOVER-OPS-001` y conforme a los contratos de rollout y piloto ya aprobados.

La tarea responde exclusivamente a esta pregunta:

```text
DADO UN PAQUETE ELEGIBLE,
CON CANDIDATO, AMBIENTE, ALCANCE Y VENTANA YA FIJADOS,
¿QUÉ UNIDADES DEL ALCANCE PUEDEN ACTIVARSE,
EN QUÉ ORDEN,
CUÁLES PUEDEN COMPARTIR UNA MISMA OLA,
Y QUÉ DEPENDENCIAS DEBEN PERMANECER CERRADAS
ANTES DE PASAR A LA SIGUIENTE UNIDAD?
```

La tarea no selecciona nuevamente la fecha, no amplía la cohorte, no redefine porcentajes de rollout y no decide todavía cuándo pausar, revertir o continuar. Su resultado es una secuencia documental consumible que `SHELL-CI-022::<package_id>` podrá ejecutar únicamente después de que todos los contratos de cutover aplicables hayan quedado aprobados.

---

#### 2. Resultado sustantivo

Por cada instancia ejecutable de `package_id`, la tarea materializa cuatro piezas:

1. `activation_dimension_resolution::<package_id>` — decisión de qué dimensión o intersección de dimensiones puede aislar de forma válida la exposición: sede, área, rol, proceso o combinación aplicable;
2. `activation_unit_set::<package_id>` — conjunto exhaustivo de unidades de activación dentro del alcance ya autorizado, sin agregar identidades externas;
3. `activation_sequence_plan::<package_id>` — olas ordenadas, dependencias entre unidades, reglas de serialización o paralelismo y puntos obligatorios de decisión;
4. `activation_sequence_manifest::<package_id>` — expediente reproducible que enlaza paquete, candidato, ambiente, alcance, ventana, modalidad de piloto, perfil de rollout, unidades, olas, responsables y contratos posteriores requeridos antes de la ejecución.

El resultado documental de esta tarea es `ESPECIFICADO`. Ninguna unidad queda `IMPLEMENTADA`, `VALIDADA` ni efectivamente activada por aprobar este documento.

---

#### 3. Entradas obligatorias y frontera de autoridad

`CUTOVER-OPS-002` consume, sin redefinirlos:

- `CUTOVER-OPS-001`: paquete, candidato, ambiente, alcance, fecha, inicio, fin, zona horaria y responsables de la ventana;
- `READY-GATE-015`: elegibilidad final de entrada para la misma instancia;
- `DELIV-PKG-015`: dependencias y orden técnico consolidado del paquete;
- `DELIV-PKG-018`: control de activación, estado seguro y especialización del perfil;
- `DELIV-PKG-019`: etapas de rollout, cohortes, canary, pausas de evidencia y promoción;
- `DELIV-PKG-020`: recuperación y rollback aplicables;
- `DELIV-PKG-022`: modalidad y alcance exacto del piloto;
- `READY-GATE-010..014`: soporte, observabilidad, rollback probado, línea base y riesgo vigentes.

La tarea no sustituye:

- `CUTOVER-OPS-003`, propietaria de la convivencia temporal con el proceso anterior;
- `CUTOVER-OPS-004`, propietaria de los controles contra doble registro y doble efecto;
- `CUTOVER-OPS-005`, propietaria de las conciliaciones durante el piloto;
- `CUTOVER-OPS-006`, propietaria del criterio de pausa, reversión o continuación;
- `CUTOVER-OPS-007`, propietaria del registro de incidentes, decisiones y cambios de alcance;
- `CUTOVER-OPS-008`, propietaria de las métricas de tiempos, errores, adopción y resultado empresarial;
- `CUTOVER-OPS-009`, propietaria de la salida del piloto;
- `CUTOVER-OPS-010`, propietaria de las condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutar retiro lógico o físico.

---

#### 4. Precondición para construir una secuencia ejecutable

Una secuencia solo puede quedar marcada como `SECUENCIADA` cuando existe una ventana `SELECCIONADA` y vigente en `CUTOVER-OPS-001` para exactamente:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
cutover_window_ref
```

La secuencia no puede:

1. reutilizar una ventana perteneciente a otro candidato;
2. incorporar una sede, área, rol, proceso, actor, dispositivo o dato fuera del alcance autorizado;
3. cambiar el ambiente;
4. cambiar la autoridad de decisión;
5. reemplazar una ventana bloqueada por una secuencia teórica;
6. convertir una instancia `NO_APLICA` en una activación directa.

Si cualquiera de esas identidades cambia, la secuencia deja de ser ejecutable y debe recalcularse sobre una ventana válida.

---

#### 5. Universo territorial permitido

Cuando la dimensión territorial aplique, la secuencia solo podrá utilizar sedes ya incluidas en el alcance aprobado.

El universo territorial canónico disponible para `SITE-DIR-001` permanece limitado a:

- `Oficina 1`;
- `Centro de Producción`;
- `Vento Café`;
- `Saudo`;
- `Molka`.

La pertenencia de una sede a este universo no implica que deba participar en un paquete concreto. Cada instancia utilizará exclusivamente la intersección entre este universo y `authorized_scope_ref`.

No se crea una sede nueva para facilitar una ola de activación.

---

#### 6. Dimensiones de secuenciación

Las dimensiones admitidas son:

| Dimensión   | Uso válido                                                                                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SEDE`      | separar exposición entre sedes o puntos ya autorizados cuando cada unidad pueda operar, observarse y recuperarse de forma independiente                    |
| `AREA`      | separar una parte organizativa materializada dentro del alcance cuando su operación y ownership sean distinguibles sin romper el proceso                   |
| `ROL`       | separar actores por rol o función ya autorizados cuando la exposición pueda gobernarse sin alterar permisos ni crear combinaciones inconsistentes          |
| `PROCESO`   | preservar como unidad un flujo operativo cuando su estado, transacción, datos, autorización o integración deban permanecer coherentes de extremo a extremo |
| `COMPUESTA` | usar la intersección de dos o más dimensiones cuando esa intersección sea la verdadera unidad aislable                                                     |
| `UNICA`     | conservar todo el alcance autorizado como una sola unidad cuando dividirlo no sea seguro, material o demostrable                                           |

No existe una jerarquía universal `SEDE → AREA → ROL → PROCESO` ni su inversa.

---

#### 7. Regla determinista para resolver la dimensión

`activation_dimension_resolution::<package_id>` se resuelve en este orden lógico:

1. identificar las dimensiones que realmente existen en `authorized_scope_ref`;
2. descartar cualquier dimensión cuyo valor exacto no esté materializado por una fuente canónica;
3. preservar las dependencias técnicas y funcionales de `DELIV-PKG-015/019`;
4. determinar si el proceso exige atomicidad de extremo a extremo;
5. determinar qué particiones pueden ser observadas y recuperadas de manera independiente con los contratos vigentes;
6. elegir la menor unidad completa que reduzca exposición sin romper atomicidad, autorización, integridad de datos, integración ni ownership;
7. si ninguna dimensión individual satisface la condición, utilizar `COMPUESTA`;
8. si ninguna partición es demostrablemente segura o útil, utilizar `UNICA`.

La atomicidad del proceso prevalece sobre el deseo de obtener una ola más pequeña.

La ausencia de una dimensión no se interpreta como permiso para inventarla.

---

#### 8. Condiciones específicas por dimensión

##### 8.1. Secuenciación por sede

`SEDE` es válida cuando:

- la sede está dentro del alcance aprobado;
- el efecto empresarial puede limitarse territorialmente;
- datos, dispositivos o integraciones no obligan a activar simultáneamente otra sede;
- soporte, observabilidad y recuperación cubren la sede durante su exposición;
- no existe una dependencia que haga inconsistente operar una sede nueva mientras otra autorizada permanece sin activar.

Si dos sedes comparten un estado o efecto que no puede aislarse, no se separan artificialmente.

##### 8.2. Secuenciación por área

`AREA` es válida únicamente si el área:

- posee identidad canónica materializada;
- pertenece al alcance autorizado;
- tiene frontera operativa distinguible;
- puede exponerse sin dejar un proceso parcialmente incoherente;
- conserva ownership, soporte y recuperación trazables.

Un nombre informal de equipo o departamento no crea una unidad de activación.

##### 8.3. Secuenciación por rol

`ROL` es válida cuando:

- el rol o función está materializado y autorizado;
- la exposición no concede autoridad adicional;
- los actores restantes pueden continuar en su estado seguro sin romper el proceso;
- el servidor conserva la autorización autoritativa independientemente del estado de exposición;
- no se crea una combinación de roles que haga imposible completar una operación.

La secuenciación por rol controla exposición; no modifica RBAC, permisos, RLS ni alcance de autorización.

##### 8.4. Secuenciación por proceso

`PROCESO` es obligatoria como frontera atómica cuando dividir el flujo entre unidades produciría cualquiera de estos efectos:

- transición de estado incompleta;
- doble captura potencial del mismo hecho;
- pérdida de identidad transaccional;
- autorización inconsistente entre pasos;
- efectos externos imposibles de atribuir a una sola unidad;
- dependencia de datos que exija una activación coherente;
- consumidor o productor incompatible durante una división.

Esta tarea solo preserva la atomicidad. El tratamiento de convivencia, doble efecto y conciliación permanece reservado a `CUTOVER-OPS-003..005`.

---

#### 9. Unidad de activación

Cada `activation_unit` deberá identificar como mínimo:

| Campo                  | Regla                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| `package_id`           | paquete canónico de la instancia                                        |
| `candidate_ref`        | mismo candidato autorizado por la ventana                               |
| `environment`          | mismo ambiente autorizado                                               |
| `authorized_scope_ref` | alcance de origen                                                       |
| `sequence_mode`        | modalidad de secuenciación aplicable                                    |
| `dimension_type`       | `SEDE`, `AREA`, `ROL`, `PROCESO`, `COMPUESTA` o `UNICA`                 |
| `site_ref`             | sede exacta cuando aplique                                              |
| `area_ref`             | área exacta cuando aplique                                              |
| `role_ref`             | rol o función exacta cuando aplique                                     |
| `process_ref`          | proceso exacto cuando aplique                                           |
| `dependency_layer`     | capa de precedencia heredada, cuando exista                             |
| `responsible_ref`      | responsable ya resuelto para la unidad                                  |
| `rollout_state_before` | estado seguro previo heredado de `DELIV-PKG-018/019`                    |
| `target_rollout_state` | estado permitido por `DELIV-PKG-018/019`; no se inventa una etapa nueva |
| `recovery_ref`         | referencia a recuperación aplicable                                     |
| `observability_ref`    | señales aplicables a la unidad                                          |
| `status`               | resultado documental de la unidad                                       |

Una unidad es una partición del alcance autorizado, nunca una ampliación.

---

#### 10. Cobertura exhaustiva del alcance

Para una instancia `DIRECT_ORDERED_ACTIVATION`, el conjunto de unidades debe cumplir simultáneamente:

1. **cobertura completa:** toda identidad del alcance que deba activarse aparece al menos una vez;
2. **sin ampliación:** ninguna identidad externa aparece;
3. **sin duplicación efectiva:** una misma combinación de dimensiones no queda activa en dos unidades incompatibles;
4. **sin huérfanos:** toda unidad tiene responsable, dependencias y referencias de control;
5. **sin solapamiento ambiguo:** cuando dos unidades comparten una dimensión, la intersección está expresamente delimitada;
6. **reconciliación exacta:** la unión de las unidades coincide con el alcance que realmente deberá activarse.

Cuando el alcance autorizado contiene una sola unidad aislable, el resultado correcto es una secuencia de una sola unidad. No se divide artificialmente para aparentar progresividad.

---

#### 11. Modelo de olas

`activation_sequence_plan::<package_id>` organiza las unidades en olas ordinales:

```text
WAVE-001
→ checkpoint de decisión
→ WAVE-002
→ checkpoint de decisión
→ ...
→ última ola autorizada dentro del plan
```

Cada ola contiene una o más unidades.

Dos unidades pueden pertenecer a la misma ola únicamente cuando se demuestra que:

- no existe dependencia de precedencia entre ellas;
- no comparten un estado cuya mutación exija orden;
- su observabilidad puede atribuirse de manera suficiente;
- su recuperación no depende de ejecutar primero la otra;
- no compiten por una responsabilidad cuya cobertura obligue a serializarlas;
- la exposición simultánea no rompe el aislamiento aprobado.

Si la independencia no puede demostrarse, las unidades se serializan.

El ordinal es monotónico y no se reutiliza dentro de la misma revisión del manifiesto.

---

#### 12. Orden entre olas

El orden de las olas se construye aplicando esta precedencia:

1. dependencias obligatorias del paquete;
2. atomicidad de proceso;
3. estado seguro y progresión permitida por `DELIV-PKG-018/019`;
4. aislamiento de la cohorte definida por `DELIV-PKG-022`;
5. capacidad de observación y recuperación de la unidad;
6. menor exposición completa entre las alternativas que siguen siendo válidas;
7. decisión atribuible del responsable vigente cuando persistan alternativas equivalentes.

No se adelanta una unidad dependiente por conveniencia de calendario.

No existe promoción automática por completar una ola.

---

#### 13. Punto de decisión entre olas

Toda transición entre olas queda estructuralmente bloqueada por un `continuation_gate_ref`.

`CUTOVER-OPS-002` define **dónde** existe ese punto de decisión, pero no define **qué umbrales producen continuar, pausar o revertir**.

La semántica de esa decisión pertenece a `CUTOVER-OPS-006`.

Por tanto:

- una ola posterior puede quedar ordenada documentalmente;
- su ejecución no queda autorizada por el mero orden;
- `SHELL-CI-022::<package_id>` deberá consumir la decisión vigente de `CUTOVER-OPS-006` antes de avanzar cuando corresponda;
- no se interpreta silencio, transcurso del tiempo o ausencia de incidente como autorización de continuación.

---

#### 14. Relación con los estados de rollout

La secuencia de cutover conserva las máquinas de estado de `DELIV-PKG-018/019`.

Para perfiles directos, la tarea no crea etapas entre:

- `GATE`;
- `BUILD_VERIFY`;
- `STAGING`;
- `PROD_SHADOW` o especialización equivalente;
- `PILOT`;
- las expansiones posteriores gobernadas por `DELIV-PKG-019`.

`CUTOVER-OPS-002` ordena **las unidades dentro del alcance de activación aplicable**. No redefine `CANARY_5`, `LIMITED_25`, `LIMITED_50`, `FULL_100` ni las especializaciones de cada perfil.

La secuencia por sede, área, rol o proceso tampoco sustituye la cohorte nominable de `DELIV-PKG-022` por un porcentaje.

---

#### 15. Especialización por perfil técnico

| Perfil           | Tratamiento de `CUTOVER-OPS-002`                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TP-DB-001`      | secuenciar la exposición del comportamiento o camino nuevo; no fragmentar una migración física solo para fabricar olas                                           |
| `TP-DOM-001`     | secuenciar unidades del alcance funcional preservando hechos ya confirmados y atomicidad de dominio                                                              |
| `TP-AUTH-001`    | secuenciar exposición sin alterar autoridad; `SHADOW_COMPARE` no concede permisos y una unidad nunca redefine roles                                              |
| `TP-INT-001`     | secuenciar unidades de integración que puedan aislar efectos; una misma operación y sus reintentos no se dividen entre caminos incompatibles                     |
| `TP-UI-001`      | secuenciar exposición de interfaz por alcance aprobado; distribución del build y visibilidad funcional permanecen conceptos distintos                            |
| `TP-SHARED-001`  | no crear una activación independiente artificial; heredar la secuencia de consumidores directos compatibles                                                      |
| `TP-CONTROL-001` | observar las olas que el control gobierna; solo secuenciar enforcement propio cuando exista una frontera ejecutable y el contrato de rollout permita segmentarla |
| `TP-AURA-001`    | no producir secuencia ejecutable mientras persista el bloqueo AURA                                                                                               |
| `TP-EXT-001`     | no producir secuencia ejecutable mientras el gate externo permanezca abierto                                                                                     |
| `TP-FUTURE-001`  | mantener fuera de la línea funcional vigente                                                                                                                     |

---

#### 16. Reconciliación del universo de modalidades heredado

`DELIV-PKG-022` conserva 207 raíces y `CUTOVER-OPS-002` no cambia esa clasificación.

| Modalidad heredada            | Cantidad | Decisión de secuenciación                                                                                  |
| ----------------------------- | -------: | ---------------------------------------------------------------------------------------------------------- |
| `PILOT-DIRECT-001`            |  **159** | `DIRECT_ORDERED_ACTIVATION` cuando exista ventana seleccionada y vigente                                   |
| `PILOT-SHARED-001`            |    **3** | `CONSUMER_DERIVED_ACTIVATION`; sin secuencia directa independiente                                         |
| `PILOT-CONTROL-001`           |   **27** | `GOVERNED_OBSERVATION`; sin activación artificial, salvo enforcement ejecutable ya permitido por su perfil |
| AURA bloqueada                |   **14** | `BLOCKED_NO_SEQUENCE` mientras persista su gate                                                            |
| dependencia externa bloqueada |    **2** | `BLOCKED_NO_SEQUENCE` mientras persista el gate externo                                                    |
| TALENTO fuera de línea actual |    **2** | `OUT_OF_CURRENT_LINE`                                                                                      |

Reconciliación:

```text
159 + 3 + 27 + 14 + 2 + 2 = 207
```

Esta tabla materializa el tratamiento de las modalidades sin reasignar ninguna raíz ni cambiar su `package_id`.

---

#### 17. Modalidades sin activación directa

##### 17.1. Contratos compartidos

Una raíz `PILOT-SHARED-001`:

- no recibe una ola propia ficticia;
- referencia las secuencias de consumidores directos que realmente ejercen el contrato;
- se considera observada durante esas olas;
- no se promociona porque haya transcurrido una ola de un solo consumidor si su contrato exige cobertura adicional.

##### 17.2. Controles

Una raíz `PILOT-CONTROL-001`:

- observa las olas de las capacidades que gobierna;
- no recibe sede, área, rol o proceso propios por inferencia;
- puede tener una unidad de enforcement solo si existe una frontera ejecutable materializada y el perfil aprobado permite segmentarla sin perder integridad;
- conserva bloqueo físico cuando su fuente propietaria aún lo exija.

##### 17.3. AURA, dependencias externas y línea futura

Las raíces no ejecutables en la línea actual no reciben secuencias vacías presentadas como éxito.

Su resultado permanece bloqueado o fuera de línea según la fuente propietaria. Solo una reapertura canónica que cierre el gate correspondiente y produzca posteriormente una ventana válida permitirá construir una secuencia ejecutable.

---

#### 18. Estados documentales de la secuencia

`activation_sequence_plan::<package_id>` utilizará:

| Estado              | Semántica                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `SECUENCIADA`       | existe ventana válida, dimensión resuelta, cobertura completa y orden reproducible de unidades                               |
| `BLOQUEADA`         | falta una identidad, dependencia, frontera de aislamiento, responsable, evidencia o referencia obligatoria                   |
| `NO_APLICA_DIRECTA` | la modalidad aprobada no posee activación directa independiente                                                              |
| `FUERA_DE_LINEA`    | la raíz pertenece a una línea funcional que no puede ejecutarse en la fase actual                                            |
| `INVALIDADA`        | una secuencia previamente especificada dejó de corresponder al candidato, ambiente, alcance, ventana o dependencias vigentes |

`SECUENCIADA` no significa ejecutada.

---

#### 19. Contratos que deben quedar enlazados antes de ejecución

El orden puede aprobarse documentalmente antes de desarrollar tareas posteriores del bloque, pero la ejecución física no podrá iniciar sin que cada referencia aplicable exista y esté vigente.

| Necesidad                                               | Propietario       |
| ------------------------------------------------------- | ----------------- |
| convivencia con el proceso anterior por ola o unidad    | `CUTOVER-OPS-003` |
| control contra doble registro o doble efecto            | `CUTOVER-OPS-004` |
| conciliación exigible durante piloto                    | `CUTOVER-OPS-005` |
| decisión entre continuar, pausar o revertir             | `CUTOVER-OPS-006` |
| registro de incidentes, decisiones y cambios de alcance | `CUTOVER-OPS-007` |
| métricas operativas del piloto                          | `CUTOVER-OPS-008` |
| decisión de salida del piloto                           | `CUTOVER-OPS-009` |
| condiciones y evidencia de elegibilidad para retiro     | `CUTOVER-OPS-010` |

La referencia pendiente a una de estas tareas tiene dueño documental exacto; no constituye autorización para improvisar su contenido durante la ejecución.

---

#### 20. Contenido mínimo de `activation_sequence_manifest::<package_id>`

El manifiesto deberá conservar:

1. `package_id`;
2. `candidate_ref`;
3. `environment`;
4. `authorized_scope_ref`;
5. `cutover_window_ref`;
6. `pilot_entry_decision_ref`;
7. `rollout_profile_ref`;
8. `pilot_scope_ref`;
9. `sequence_mode`;
10. `dimension_resolution_ref`;
11. total de unidades esperadas;
12. total de unidades materializadas;
13. total de olas;
14. lista ordenada de olas;
15. miembros exactos de cada ola;
16. dimensiones y valores exactos de cada unidad;
17. dependencias entre unidades;
18. responsables aplicables;
19. estado seguro previo y estado objetivo permitido;
20. referencias de observabilidad y recuperación;
21. `continuation_gate_ref` entre olas cuando aplique;
22. referencias propietarias de `CUTOVER-OPS-003..010` exigibles antes de ejecución;
23. estado documental global;
24. causa, propietario y condición de salida de cualquier bloqueo;
25. revisión del manifiesto y referencia de evidencia documental.

Los conteos deben reconciliar exactamente el alcance materializado de la instancia.

---

#### 21. Regla de cambio e invalidación

La secuencia se invalida cuando cambia materialmente cualquiera de estos elementos:

- candidato;
- ambiente;
- alcance autorizado;
- ventana;
- modalidad de piloto;
- dependencia obligatoria;
- frontera de proceso;
- autorización o rol aplicable;
- responsable obligatorio;
- estrategia de rollout;
- capacidad de recuperación;
- condición de riesgo que afecte la exposición.

La corrección deberá realizarse en la fuente propietaria del elemento cambiado y luego recalcularse la secuencia.

No se edita silenciosamente una ola histórica para aparentar que siempre correspondió al nuevo alcance.

---

#### 22. Tratamiento de bloqueos

Todo `BLOQUEADA` deberá conservar:

1. unidad o secuencia afectada;
2. causa concreta;
3. insumo faltante;
4. propietario canónico;
5. tarea propietaria cuando exista;
6. condición objetiva de salida;
7. olas dependientes afectadas;
8. evidencia que deberá actualizarse.

No se permite `TBD`, “por definir” ni un pendiente sin propietario.

Una secuencia parcialmente construida no se redondea a `SECUENCIADA`.

---

#### 23. Handoff a `CUTOVER-OPS-003`

`CUTOVER-OPS-002` entrega a `CUTOVER-OPS-003`:

```text
VENTANA VIGENTE
+
ALCANCE AUTORIZADO
+
UNIDADES DE ACTIVACIÓN
+
OLAS ORDENADAS
+
DEPENDENCIAS
+
RESPONSABLES
+
ESTADO SEGURO PREVIO Y ESTADO OBJETIVO PERMITIDO
=
FRONTERA EXACTA PARA DEFINIR LA CONVIVENCIA TEMPORAL
```

`CUTOVER-OPS-003` podrá definir la convivencia del proceso anterior dentro de esta secuencia, pero no podrá ampliar unidades, cambiar su orden por inferencia ni alterar candidato, ambiente o alcance sin invalidar y recalcular la fuente correspondiente.

---

#### 24. Separación entre planificación y ejecución

La secuencia operativa permanece:

```text
SHELL-CI-021::<package_id>
→ entrada aprobada
→ CUTOVER-OPS-001 con ventana seleccionada
→ CUTOVER-OPS-002 con secuencia especificada
→ contratos restantes de CUTOVER aplicables
→ SHELL-CI-022::<package_id>
```

`SHELL-CI-022::<package_id>` será quien materialice la ejecución real y conserve paquete, versión, ambiente, ventana, actor, decisión y evidencia.

Esta tarea no:

- activa sedes;
- activa áreas;
- activa roles;
- activa procesos;
- cambia feature flags;
- despliega artefactos;
- modifica datos;
- ejecuta migraciones;
- ejecuta rollback;
- cambia permisos;
- modifica Supabase.

---

#### 25. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `CUTOVER-OPS-002` materializa el orden documental de exposición para ejecutar posteriormente contratos de rollout, piloto, autorización, observabilidad y recuperación ya aprobados. No introduce un comportamiento empresarial nuevo, una transición de estado de negocio, una regla de autorización, un contrato de integración, una persistencia, un cálculo, un algoritmo runtime, un umbral de promoción ni un mecanismo nuevo de rollback. Los comportamientos ejecutables y sus pruebas permanecen gobernados por los requisitos y matrices ya vinculados a los paquetes; esta tarea únicamente organiza su ejecución futura dentro de un alcance previamente autorizado.

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

---

#### 26. Criterios de aceptación documental

`CUTOVER-OPS-002` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-001 → CUTOVER-OPS-002 → CUTOVER-OPS-003`;
2. solo secuencia instancias con ventana válida de `CUTOVER-OPS-001`;
3. no cambia paquete, candidato, ambiente, alcance, fecha, ventana ni autoridad;
4. define `activation_dimension_resolution`, `activation_unit_set`, `activation_sequence_plan` y `activation_sequence_manifest`;
5. admite `SEDE`, `AREA`, `ROL`, `PROCESO`, `COMPUESTA` y `UNICA` sin imponer una jerarquía universal;
6. preserva atomicidad de proceso antes de minimizar el tamaño de una unidad;
7. toda dimensión usada existe en una fuente canónica y pertenece al alcance autorizado;
8. las sedes se limitan al universo canónico y a la intersección aprobada para la instancia;
9. las unidades reconcilian exactamente el alcance activable, sin faltantes, ampliaciones ni duplicaciones ambiguas;
10. una instancia indivisible conserva una sola unidad y no fabrica progresividad;
11. las olas poseen ordinal reproducible;
12. el paralelismo exige independencia demostrable; en caso contrario se serializa;
13. las dependencias heredadas prevalecen sobre conveniencia de calendario;
14. cada transición entre olas conserva un punto de decisión sin anticipar el criterio de `CUTOVER-OPS-006`;
15. no existe promoción automática por tiempo ni por completar una ola;
16. se preservan los estados y perfiles de `DELIV-PKG-018/019`;
17. la cohorte de piloto no se transforma en porcentaje;
18. las 207 raíces quedan reconciliadas por modalidad como 159 directas, 3 shared, 27 control y 18 no ejecutables en la línea actual;
19. shared no recibe una activación independiente ficticia;
20. control no recibe una activación ficticia y conserva su tratamiento de observación o enforcement aplicable;
21. AURA, dependencia externa y línea futura conservan sus gates;
22. se definen `SECUENCIADA`, `BLOQUEADA`, `NO_APLICA_DIRECTA`, `FUERA_DE_LINEA` e `INVALIDADA`;
23. todo bloqueo tiene causa, propietario y condición de salida;
24. los contratos posteriores `CUTOVER-OPS-003..010` quedan vinculados por propietario sin anticipar sus decisiones;
25. cambios materiales invalidan la secuencia y obligan a recalcularla desde fuentes vigentes;
26. el manifiesto contiene conteos reconciliables de unidades y olas;
27. la ejecución física permanece en `SHELL-CI-022::<package_id>`;
28. no se ejecutan código, despliegues, activaciones, promociones, migraciones, DDL/DML, backfills, modificaciones de datos, configuración remota ni operaciones de Supabase;
29. se crean cero requisitos `TREQ-*`, se modifican cero requisitos `TREQ-*` y se afectan cero fragmentos 04A.

---

#### 27. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-001 — Definir criterio para seleccionar fecha, ventana y responsables del cutover`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-002 — Definir secuencia de activación por sede, área, rol o proceso`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-003 — Definir convivencia temporal con el proceso anterior`


### ✅ CUTOVER-OPS-003 — Definir convivencia temporal con el proceso anterior

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-002 — Definir secuencia de activación por sede, área, rol o proceso
**Tarea siguiente:** CUTOVER-OPS-004 — Diseñar controles contra doble registro y doble efecto durante la transición
**Tipo de tarea:** documental — definición normativa y materialización de la convivencia temporal entre el proceso anterior y el proceso objetivo para cada unidad y ola de activación ya secuenciada, preservando una autoridad inequívoca por alcance, la compatibilidad temporal aprobada y las rutas de recuperación existentes; sin ampliar el alcance, alterar la secuencia, ejecutar activaciones, diseñar todavía controles contra doble registro o doble efecto, conciliar resultados, decidir pausa/reversión/continuación, retirar el proceso anterior, desplegar cambios, modificar configuración, ejecutar migraciones, DDL/DML, backfills, modificaciones de datos ni operaciones sobre Supabase
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>`

---

#### 1. Propósito

`CUTOVER-OPS-003` define cómo puede convivir temporalmente el proceso anterior con el proceso objetivo durante una secuencia de activación ya aprobada, sin convertir esa convivencia en doble autoridad, doble escritura, doble efecto ni retiro anticipado de la ruta anterior.

La tarea responde exclusivamente a estas preguntas:

```text
¿QUÉ UNIDAD Y OLA ESTÁN SIENDO ACTIVADAS?
+
¿QUÉ PROCESO O RUTA ANTERIOR SIGUE APLICANDO A ESA UNIDAD O AL RESTO DEL ALCANCE?
+
¿QUÉ RUTA ES AUTORITATIVA ANTES, DURANTE Y DESPUÉS DEL PUNTO DE ACTIVACIÓN?
+
¿QUÉ COMPATIBILIDAD TEMPORAL YA APROBADA DEBE CONSERVARSE?
+
¿QUÉ TRABAJO EN CURSO, COLAS, REINTENTOS O EFECTOS PREEXISTENTES DEBEN MANTENER SU RUTA?
+
¿QUÉ USO DEL PROCESO ANTERIOR SIGUE PERMITIDO Y HASTA QUÉ FRONTERA DOCUMENTAL?
=
CONVIVENCIA TEMPORAL DEFINIDA SIN AMBIGÜEDAD DE AUTORIDAD
```

La tarea no ejecuta el cambio de autoridad ni activa ninguna ola. Tampoco diseña todavía los controles que impedirán físicamente el doble registro o doble efecto: esa responsabilidad pertenece a `CUTOVER-OPS-004`.

---

#### 2. Resultado sustantivo

Para cada instancia aplicable de `package_id`, `CUTOVER-OPS-003` materializa cuatro piezas documentales:

1. `coexistence_scope_resolution::<package_id>` — identifica, sobre las unidades y olas ya definidas por `CUTOVER-OPS-002`, dónde existe realmente un proceso o ruta anterior que deba convivir temporalmente con el proceso objetivo;
2. `coexistence_authority_map::<package_id>` — fija por unidad y estado de activación qué ruta conserva la autoridad operacional, sin crear una segunda fuente de verdad;
3. `coexistence_transition_plan::<package_id>` — documenta el uso permitido del proceso anterior, las referencias de compatibilidad temporal, el tratamiento del trabajo en curso y las dependencias de recuperación;
4. `coexistence_manifest::<package_id>` — consolida alcance, unidades, olas, referencias del proceso anterior y objetivo, fronteras de autoridad, compatibilidad, bloqueos, responsables y handoff a las tareas siguientes.

Estas piezas describen una transición futura dentro de `SHELL-CI-022::<package_id>`. No prueban que la convivencia haya ocurrido ni que una unidad haya sido activada.

---

#### 3. Entradas obligatorias y frontera de autoridad

`CUTOVER-OPS-003` consume, sin redefinirlos:

- `CUTOVER-OPS-001`: paquete, candidato, ambiente, alcance, fecha, ventana, zona horaria y responsables vigentes;
- `CUTOVER-OPS-002`: dimensión de activación, unidades, olas, orden, dependencias, responsables, estado seguro previo, estado objetivo permitido y puntos de decisión entre olas;
- `READY-GATE-015`: elegibilidad final de entrada para la misma instancia;
- `DELIV-PKG-009`: plan de transición, compatibilidad temporal, autoridad única de escritura, backfills y lane de retiro legacy;
- `DELIV-PKG-010`: contratos de eventos, productores, consumidores, idempotencia, retry, compensación y conciliación ya aprobados cuando apliquen;
- `DELIV-PKG-012`: frontera autoritativa de servidor y permisos vigentes cuando apliquen;
- `DELIV-PKG-015`: dependencias, bloqueos y orden técnico consolidado;
- `DELIV-PKG-018`: default seguro, targeting, activación, expiración y kill switch aplicables;
- `DELIV-PKG-019`: estrategia de rollout, shadow, cohortes, pausas de evidencia y promoción;
- `DELIV-PKG-020`: rollback técnico, funcional y de datos, recovery, compensation y tratamiento de efectos irreversibles;
- `DELIV-PKG-021`: runbooks, procedimientos, soporte y audiencia operativa aplicables;
- `DELIV-PKG-022`: alcance, actores, sedes, datos, dispositivos, entorno, duración, cohortes, exclusiones y salvaguardas del piloto;
- `READY-GATE-010`: cobertura de soporte y escalamiento;
- `READY-GATE-011`: monitoreo, métricas y alertas disponibles;
- `READY-GATE-012`: respaldo, restauración y rollback aplicables;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión vigentes.

No se permite usar esta tarea para reconstruir o corregir silenciosamente una fuente anterior. Si una entrada material es ambigua, incompatible o inexistente, la convivencia queda bloqueada hasta que la fuente propietaria resuelva la condición.

---

#### 4. Invariante de interpretación

Se adopta la separación obligatoria:

```text
CONVIVENCIA TEMPORAL
≠ DOBLE AUTORIDAD
≠ DOBLE ESCRITURA
≠ DOBLE EFECTO
≠ ROLLBACK
≠ CONCILIACIÓN
≠ RETIRO LEGACY
```

La coexistencia puede significar que componentes, rutas, interfaces, procesos manuales o mecanismos de recuperación permanezcan disponibles al mismo tiempo, pero no autoriza que dos rutas sean simultáneamente autoritativas para el mismo alcance y el mismo hecho empresarial salvo que una fuente canónica previa haya definido expresamente una semántica compatible.

`SHADOW` no crea una segunda autoridad empresarial. `FULL_100` tampoco autoriza por sí solo retirar el proceso anterior ni volver irreversible el cutover.

---

#### 5. Unidad mínima de decisión de convivencia

La convivencia se define sobre la misma unidad ya materializada por `CUTOVER-OPS-002`:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
activation_unit_ref
+
wave_ref
```

`CUTOVER-OPS-003` no puede:

- crear unidades nuevas;
- fusionar unidades existentes;
- dividir una unidad para simplificar la convivencia;
- cambiar el orden de olas;
- mover una sede, área, rol, proceso o intersección a otra ola;
- ampliar cohorte, actor, dato, dispositivo, superficie o ambiente;
- sustituir la unidad canónica por una agrupación inventada.

Si la convivencia segura exige modificar la secuencia, la tarea queda `BLOQUEADA` y la corrección debe ocurrir en la fuente propietaria antes de recalcular 003.

---

#### 6. Identificación del proceso o ruta anterior

Para cada `activation_unit_ref`, el manifiesto deberá resolver `previous_process_ref` a partir de una fuente canónica vigente.

La referencia puede corresponder al proceso, ruta, mecanismo manual, implementación legacy, consumidor, flujo o superficie anterior que realmente conserva responsabilidad antes de la activación. No se exige convertirla en un `VPROC-*` cuando la fuente no la modela así.

Reglas:

1. no se inventa `previous_process_ref` a partir del título del paquete, aplicación, repositorio, pantalla o capability;
2. si no existe proceso anterior aplicable, la unidad se clasifica `NO_APLICA` para convivencia y no recibe una ruta legacy ficticia;
3. si existe una ruta anterior pero su identidad o frontera no puede determinarse con evidencia suficiente, la unidad queda `BLOQUEADA`;
4. una ruta técnica antigua que permanece únicamente por compatibilidad no se presenta como proceso empresarial autoritativo;
5. una ruta de recuperación de `DELIV-PKG-020` no se presenta como ruta operativa normal salvo que su contrato lo permita expresamente.

---

#### 7. Estados documentales de convivencia

Cada unidad usa exactamente uno de estos estados documentales:

| Estado       | Semántica                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFINIDA`   | existe proceso o ruta anterior aplicable y la frontera temporal de autoridad y uso está resuelta mediante fuentes vigentes                                          |
| `NO_APLICA`  | no existe convivencia aplicable para esa unidad o la fuente canónica demuestra que no hay proceso anterior que deba mantenerse                                      |
| `BLOQUEADA`  | la convivencia sería necesaria, pero falta o contradice una condición indispensable de autoridad, compatibilidad, secuencia, recuperación, soporte u observabilidad |
| `INVALIDADA` | una decisión previamente definida dejó de ser ejecutable por cambio material de candidato, ambiente, alcance, secuencia o fuente propietaria                        |

No se utiliza `DEFINIDA` para ocultar una identidad anterior desconocida ni `NO_APLICA` por simple ausencia de documentación.

---

#### 8. Regla de autoridad por unidad

Toda unidad con convivencia aplicable deberá materializar, como mínimo:

- `authority_before_activation`;
- `authority_after_activation`;
- `previous_process_allowed_use`;
- `target_process_allowed_use`;
- `recovery_authority_ref` cuando aplique;
- `authority_change_precondition_ref`;
- `authority_reversion_ref` cuando aplique.

La regla normativa es:

1. antes del punto de activación de la unidad, la autoridad permanece donde la fuente vigente la ubique;
2. la nueva ruta no se vuelve autoritativa por estar desplegada, visible, instalada, disponible o incluida en `SHADOW`;
3. la autoridad solo puede cambiar cuando se ejecute el punto de activación previsto y se cumplan los gates aplicables de la secuencia;
4. una unidad ya activada no vuelve a la ruta anterior por conveniencia operativa; una reversión debe seguir `DELIV-PKG-020` y la decisión propietaria de `CUTOVER-OPS-006`;
5. el resto de unidades todavía no activadas conserva la ruta que les corresponda sin recibir exposición anticipada;
6. una misma operación lógica, intento, idempotency key o retry no puede cambiar de ruta por pertenecer a una cohorte diferente a mitad de su ciclo cuando el contrato de integración exige continuidad de ruta.

Esta tarea fija la frontera documental. Los mecanismos físicos que harán cumplir esa frontera se diseñan en `CUTOVER-OPS-004`.

---

#### 9. Convivencia segmentada por olas

Cuando `CUTOVER-OPS-002` haya definido varias olas, puede existir simultáneamente:

- proceso objetivo autoritativo para unidades cuya activación ya haya sido ejecutada y aceptada conforme a los gates aplicables;
- proceso anterior autoritativo para unidades cuya activación todavía no haya ocurrido;
- compatibilidad técnica temporal entre componentes de ambas generaciones cuando `DELIV-PKG-009` o `DELIV-PKG-019` lo requieran;
- una ruta anterior retenida únicamente para recuperación cuando `DELIV-PKG-020` así lo defina.

La coexistencia entre olas nunca autoriza que una unidad se atienda alternativamente por una ruta u otra según disponibilidad momentánea, preferencia del operador o conveniencia técnica.

El alcance no activado no se utiliza como fallback informal para una unidad activada, y el alcance activado no absorbe silenciosamente unidades de olas posteriores.

---

#### 10. Compatibilidad temporal técnica

La compatibilidad temporal se consume de `DELIV-PKG-009` y de los contratos consolidados del paquete.

Por tanto:

1. una migración, esquema, vista, contrato, productor, consumidor o build puede requerir coexistencia técnica backward-compatible sin que exista doble autoridad empresarial;
2. las migraciones y contratos no se fraccionan por porcentaje; el porcentaje de rollout gobierna exposición de comportamiento únicamente cuando sea técnicamente seguro;
3. la autoridad única de escritura definida por la transición debe conservarse mientras existan componentes de generaciones distintas;
4. la presencia simultánea de versiones compatibles no autoriza doble escritura, doble confirmación ni duplicación de estado de negocio;
5. una incompatibilidad crítica bloquea la convivencia y la promoción de la unidad afectada;
6. el retiro físico de compatibilidad, adapters, rutas o superficies legacy permanece reservado a la tarea propietaria de retiro y no se ejecuta en 003.

---

#### 11. Trabajo en curso al cruzar la frontera de activación

Cada unidad con operaciones en curso deberá identificar, por referencia a los contratos existentes, cómo se conserva la autoridad de esas operaciones durante la transición.

El manifiesto deberá distinguir, cuando aplique:

- operaciones iniciadas antes del punto de activación y todavía no finalizadas;
- solicitudes o comandos enviados pero sin resultado definitivo;
- colas, outbox, reintentos, jobs o tareas diferidas pendientes;
- adjuntos, borradores o estados locales todavía no sincronizados;
- efectos externos cuyo resultado sea incierto;
- procesos manuales abiertos que no pueden migrarse de forma atómica.

Reglas:

1. una operación en curso no cambia automáticamente de ruta porque la unidad haya cambiado de interfaz o build;
2. si la fuente ya define una estrategia de finalización, migración, retry, compensación o recuperación, 003 la referencia sin modificarla;
3. si no puede determinarse qué ruta debe completar una operación en curso, la unidad queda `BLOQUEADA` antes de activarse;
4. un resultado externo incierto no se asume fallido para reenviarlo por la ruta nueva;
5. esta tarea no ejecuta conciliaciones ni crea reglas de compensación nuevas.

---

#### 12. Uso permitido del proceso anterior

`previous_process_allowed_use` deberá quedar explícito por unidad y derivado de las fuentes vigentes.

Puede conservarse únicamente para los fines que ya estén autorizados, por ejemplo:

- operación normal de unidades todavía no activadas;
- compatibilidad técnica necesaria mientras conviven generaciones;
- finalización de trabajo en curso bajo la ruta que ya lo posee;
- recuperación o reversión conforme a `DELIV-PKG-020`;
- consulta o soporte cuando una fuente canónica lo permita sin generar un nuevo efecto empresarial.

La lista anterior no concede permisos por sí misma. Cada uso debe estar respaldado por la fuente propietaria del paquete.

Una vez activada una unidad, el proceso anterior no puede seguirse usando como ruta normal para esa misma unidad salvo que la fuente canónica haya definido expresamente una convivencia de autoridad compatible. La falta de comodidad, capacitación, velocidad o familiaridad con la nueva ruta no crea una excepción.

---

#### 13. `SHADOW` y coexistencia sin efecto empresarial

Cuando `DELIV-PKG-019` permita `SHADOW`, la presencia del candidato puede coexistir con la ruta anterior únicamente sin producir un nuevo efecto empresarial.

Por tanto:

- `SHADOW` no transfiere autoridad;
- no crea una segunda confirmación del mismo hecho;
- no habilita una mutación adicional por observar el resultado;
- no sustituye la cohorte o piloto definidos por `DELIV-PKG-022`;
- no autoriza retirar la ruta anterior;
- si la mera presencia del candidato modifica comportamiento, `SHADOW` no aplica y la convivencia debe conservar el estado seguro definido por las fuentes propietarias.

---

#### 14. Recuperación no equivale a operación paralela

La retención del proceso anterior para rollback, recovery, compensation o restore no significa que permanezca habilitado como ruta operativa normal.

`DELIV-PKG-020` conserva la propiedad de:

- disparadores de rollback;
- autoridad para decidirlo y ejecutarlo;
- objetivo técnico y funcional seguro;
- tratamiento de datos y efectos externos;
- restore, recovery, compensation y conciliación aplicables.

`CUTOVER-OPS-003` solo registra qué dependencia de recuperación obliga a mantener temporalmente una ruta, artefacto, compatibilidad o capacidad anterior disponible.

La decisión de continuar, pausar o revertir durante la ejecución pertenece a `CUTOVER-OPS-006`.

---

#### 15. Integraciones, eventos y efectos externos

Cuando la unidad dependa de integraciones o efectos externos:

1. una misma operación lógica debe conservar la ruta compatible que le corresponda durante su ciclo;
2. un idempotency key o retry no puede reencaminarse entre proceso anterior y objetivo de forma que cambie la semántica ya aprobada;
3. `SHADOW` o sandbox no deben producir un efecto productivo nuevo cuando el contrato vigente los define como no efectivos;
4. un efecto externo incierto debe conservar el tratamiento de reconciliación, retry o compensación de `DELIV-PKG-010` y `DELIV-PKG-020`;
5. 003 no crea colas, DLQ, eventos, compensaciones ni políticas nuevas;
6. la conciliación material durante el piloto permanece reservada a `CUTOVER-OPS-005`.

---

#### 16. Datos, migraciones y autoridad de escritura

La convivencia de datos conserva las reglas aprobadas de `DELIV-PKG-009` y `DELIV-PKG-020`.

En particular:

- una migración aplicada no se revierte editando su historia para simular que nunca ocurrió;
- la compatibilidad temporal puede exigir conservar superficies antiguas mientras consumidores y rutas terminan su transición;
- la fuente autoritativa de escritura no se duplica por coexistencia;
- backfills, DDL, DML, cambios de RLS, Storage o Realtime no se ejecutan en esta tarea;
- la recuperación de datos no se confunde con rollback de interfaz o build;
- un hecho empresarial confirmado conserva su historia y, cuando corresponda, se corrige, compensa o reconcilia según contratos existentes.

Toda modificación física de Supabase VENTO permanece fuera de esta tarea y bajo su autoridad propietaria vigente.

---

#### 17. Offline, móvil y trabajo diferido

Cuando existan clientes offline, móviles o trabajo diferido, la convivencia deberá conservar la clasificación y autoridad de los elementos pendientes.

Ocultar una superficie, distribuir otro build, activar una ola o volver a una versión anterior no elimina por sí mismo:

- outbox pendientes;
- intentos locales;
- adjuntos todavía no sincronizados;
- comandos en retry;
- acciones pendientes de reautorización.

Cada elemento deberá seguir el contrato ya aprobado para determinar si se completa, descarta, reautoriza, compensa o reconcilia. 003 no crea una semántica nueva para esos estados y bloquea la unidad cuando la fuente vigente no permite determinar un tratamiento seguro.

---

#### 18. Soporte, observabilidad y operación durante la convivencia

La convivencia solo puede quedar `DEFINIDA` cuando las referencias aplicables permiten observar y soportar ambos estados que existirán temporalmente.

El manifiesto deberá conservar:

- responsables y escalamiento de `READY-GATE-010`;
- señales, métricas, alertas y propietarios de `READY-GATE-011` y `DELIV-PKG-017`;
- riesgos aceptados y condiciones de suspensión de `READY-GATE-014`;
- runbooks y procedimientos de `DELIV-PKG-021`;
- referencias de recuperación de `DELIV-PKG-020`.

Esta tarea no define métricas nuevas ni umbrales nuevos. Si la coexistencia introduce un estado que las fuentes de observabilidad vigentes no permiten distinguir o diagnosticar cuando esa distinción es necesaria para ejecutar con seguridad, la unidad queda `BLOQUEADA` hasta que la fuente propietaria resuelva la brecha.

---

#### 19. Inicio y término documental de la convivencia

La convivencia de una unidad comienza documentalmente cuando existe una frontera aprobada en la que la ruta anterior debe seguir disponible al mismo tiempo que el candidato o la ruta objetivo entra en la secuencia de activación.

La convivencia deja de requerir operación normal del proceso anterior para una unidad cuando:

1. esa unidad ya alcanzó el estado objetivo permitido conforme a la secuencia y gates aplicables;
2. no conserva trabajo en curso cuya autoridad siga en la ruta anterior;
3. ninguna compatibilidad temporal vigente exige mantener la ruta anterior como participante normal;
4. cualquier retención restante corresponde exclusivamente a recuperación, soporte, evidencia o retiro posterior.

Ese resultado no autoriza el retiro lógico ni físico del proceso anterior. `CUTOVER-OPS-010` conserva únicamente la responsabilidad de definir las condiciones, la evidencia y la decisión documental de elegibilidad para retiro; cualquier retiro material posterior pertenece a su tarea de implementación propietaria.

---

#### 20. Condiciones de bloqueo

Una unidad queda `BLOQUEADA` para convivencia cuando ocurra cualquiera de estas condiciones:

1. no puede identificarse el proceso o ruta anterior que realmente posee la operación previa;
2. existe ambigüedad sobre qué ruta es autoritativa para el mismo alcance;
3. la secuencia exige que una misma operación lógica pueda saltar entre rutas sin contrato aprobado;
4. la compatibilidad técnica requerida no está demostrada o existe incompatibilidad crítica;
5. no puede determinarse el tratamiento del trabajo en curso;
6. la ruta anterior se necesita para recuperación, pero su disponibilidad o autoridad no está cubierta por `DELIV-PKG-020`;
7. la convivencia requeriría ampliar alcance, permisos, cohorte, sede, rol, proceso, dato, dispositivo o ambiente;
8. soporte u observabilidad no permiten operar de forma segura el estado temporal cuando son exigibles;
9. una dependencia de `DELIV-PKG-015` permanece abierta;
10. una condición de suspensión vigente ya está materializada;
11. el candidato, ambiente, alcance, ventana o secuencia dejaron de coincidir con las fuentes de 001 y 002;
12. el tratamiento exigiría inventar una regla de negocio, autorización, dato, evento, retry, compensación, rollback o conciliación no aprobada.

Todo bloqueo deberá conservar causa, propietario documental y condición de salida verificable.

---

#### 21. Invalidation y revalidación

`coexistence_manifest::<package_id>` queda `INVALIDADA` cuando cambie materialmente cualquiera de estas fuentes:

- candidato o revisión;
- ambiente;
- alcance autorizado;
- ventana de `CUTOVER-OPS-001`;
- dimensión, unidades, olas u orden de `CUTOVER-OPS-002`;
- transición o compatibilidad de `DELIV-PKG-009`;
- contratos de integración de `DELIV-PKG-010`;
- autorización de `DELIV-PKG-012`;
- dependencias de `DELIV-PKG-015`;
- activación o default seguro de `DELIV-PKG-018`;
- rollout de `DELIV-PKG-019`;
- recuperación de `DELIV-PKG-020`;
- piloto de `DELIV-PKG-022`;
- soporte, observabilidad, riesgo o elegibilidad de readiness.

La revalidación debe partir de las fuentes vigentes. No se parchea únicamente el campo que cambió cuando ese cambio altera la frontera de autoridad o la secuencia.

---

#### 22. Contenido mínimo del manifiesto

`coexistence_manifest::<package_id>` deberá contener, como mínimo:

1. `package_id`;
2. `candidate_ref`;
3. `environment`;
4. `authorized_scope_ref`;
5. referencia a la ventana vigente de `CUTOVER-OPS-001`;
6. referencia al manifiesto de secuencia de `CUTOVER-OPS-002`;
7. `activation_unit_ref`;
8. `wave_ref` y posición aplicable;
9. `previous_process_ref` o justificación de `NO_APLICA`;
10. referencia de la ruta o proceso objetivo cuando exista en las fuentes;
11. `authority_before_activation`;
12. `authority_after_activation`;
13. `previous_process_allowed_use`;
14. `target_process_allowed_use`;
15. referencia de compatibilidad temporal de `DELIV-PKG-009` cuando aplique;
16. referencia de rollout/shadow de `DELIV-PKG-019`;
17. referencia de recovery/rollback de `DELIV-PKG-020`;
18. tratamiento documentado de trabajo en curso;
19. dependencias de integración o efectos externos aplicables;
20. soporte y escalamiento aplicables;
21. observabilidad aplicable;
22. riesgo o condición de suspensión aplicable;
23. estado `DEFINIDA`, `NO_APLICA`, `BLOQUEADA` o `INVALIDADA`;
24. causa, propietario y condición de salida de cualquier bloqueo;
25. revisión documental y referencias de evidencia.

Los conteos de unidades deberán reconciliar exactamente el universo recibido de `CUTOVER-OPS-002`.

---

#### 23. Frontera con `CUTOVER-OPS-004..010`

`CUTOVER-OPS-003` fija la frontera que las tareas siguientes consumen, sin anticiparlas:

| Tarea             | Responsabilidad reservada                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `CUTOVER-OPS-004` | diseñar los controles que impiden doble registro y doble efecto usando la autoridad y fronteras definidas por 003     |
| `CUTOVER-OPS-005` | definir las conciliaciones exigibles durante el piloto                                                                |
| `CUTOVER-OPS-006` | definir el criterio operativo de pausa, reversión o continuación entre puntos de decisión                             |
| `CUTOVER-OPS-007` | diseñar el registro de incidentes, decisiones y cambios de alcance                                                    |
| `CUTOVER-OPS-008` | definir métricas de tiempos, errores, adopción y resultado empresarial                                                |
| `CUTOVER-OPS-009` | definir criterio y evidencia para declarar salida del piloto                                                          |
| `CUTOVER-OPS-010` | definir condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutarlo |

003 puede declarar que una referencia posterior será exigible antes de ejecución, pero no puede completar por anticipado la decisión de su propietario.

---

#### 24. Handoff a `CUTOVER-OPS-004`

`CUTOVER-OPS-003` entrega a `CUTOVER-OPS-004` únicamente la frontera documental necesaria para diseñar controles contra duplicidad:

```text
UNIDADES Y OLAS VIGENTES
+
PROCESO/RUTA ANTERIOR APLICABLE
+
RUTA OBJETIVO APLICABLE
+
AUTORIDAD ANTES Y DESPUÉS DE ACTIVACIÓN
+
USO PERMITIDO DE LA RUTA ANTERIOR
+
TRABAJO EN CURSO Y FRONTERAS DE RUTA
+
COMPATIBILIDAD TEMPORAL
+
REFERENCIAS DE RECUPERACIÓN
=
SUPERFICIE EXACTA DONDE 004 DEBE IMPEDIR DOBLE REGISTRO O DOBLE EFECTO
```

`CUTOVER-OPS-004` no podrá ampliar alcance, modificar la secuencia ni reinterpretar una ambigüedad de autoridad como autorización para operar ambas rutas.

---

#### 25. Separación entre planificación y ejecución

`CUTOVER-OPS-003` es exclusivamente documental.

No ejecuta:

- activaciones;
- promociones;
- cambios de routing;
- feature flags;
- cutover;
- rollback o recovery;
- conciliaciones;
- migraciones;
- DDL/DML;
- backfills;
- compensaciones;
- correcciones de datos;
- retiro legacy;
- cambios de código;
- despliegues;
- cambios remotos;
- operaciones de Supabase.

La ejecución futura corresponde a `SHELL-CI-022::<package_id>` dentro de la ruta autorizada y consumiendo los contratos posteriores que sean aplicables.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0.
**Requisitos modificados:** 0.

**Justificación:** `CUTOVER-OPS-003` materializa, para la secuencia de cutover, la aplicación conjunta de reglas de transición, compatibilidad temporal, autoridad única de escritura, integración, autorización, rollout, shadow, rollback, recovery, soporte y observabilidad que ya están aprobadas y cubiertas por requisitos existentes. `DELIV-PKG-009`, `DELIV-PKG-019`, `DELIV-PKG-020` y `DELIV-PKG-022` ya determinan que sus decisiones documentales reutilizan el registro 04A vigente sin crear semántica ejecutable nueva. Esta tarea no cambia el contenido, identidad, estado, relación o criterio de ningún `TREQ-*` y no corresponde generar fragmentos 04A.

---

#### 27. Criterios de aceptación documental

`CUTOVER-OPS-003` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-002 → CUTOVER-OPS-003 → CUTOVER-OPS-004`;
2. usa exactamente las unidades, olas y orden materializados por 002;
3. no cambia paquete, candidato, ambiente, alcance, fecha, ventana ni autoridad de readiness;
4. identifica el proceso o ruta anterior por fuente canónica o demuestra `NO_APLICA`;
5. no inventa `VPROC-*`, rutas legacy, sistemas, owners ni repositorios;
6. define `coexistence_scope_resolution`, `coexistence_authority_map`, `coexistence_transition_plan` y `coexistence_manifest`;
7. cada unidad usa exactamente `DEFINIDA`, `NO_APLICA`, `BLOQUEADA` o `INVALIDADA`;
8. cada unidad `DEFINIDA` posee frontera de autoridad antes y después de activación;
9. `SHADOW` nunca se trata como segunda autoridad empresarial;
10. `FULL_100` no se trata como autorización de retiro legacy;
11. la convivencia técnica backward-compatible no se convierte en doble autoridad de escritura;
12. las migraciones y contratos no se fraccionan por porcentaje;
13. una unidad no alterna de ruta por conveniencia operativa;
14. una misma operación lógica, intento o retry conserva la ruta exigida por sus contratos vigentes;
15. el trabajo en curso recibe tratamiento referenciado o bloquea la unidad;
16. los efectos externos inciertos no se asumen fallidos para reejecutarlos por otra ruta;
17. una ruta retenida para recovery no se presenta como operación paralela normal;
18. soporte, observabilidad, riesgo y recuperación quedan referenciados cuando son aplicables;
19. toda incompatibilidad crítica bloquea la convivencia de la unidad afectada;
20. todo bloqueo conserva causa, propietario y condición de salida;
21. cambios materiales invalidan el manifiesto y obligan a revalidar desde fuentes vigentes;
22. el manifiesto reconcilia exactamente todas las unidades recibidas de 002;
23. 003 no diseña todavía controles de doble registro o doble efecto;
24. 003 no ejecuta conciliaciones;
25. 003 no decide pausa, reversión o continuación;
26. 003 no define métricas, salida del piloto ni condiciones de elegibilidad para retiro del proceso anterior, y tampoco ejecuta retiro lógico o físico;
27. `CUTOVER-OPS-004` recibe una frontera de autoridad suficiente para diseñar los controles contra duplicidad sin reinterpretar alcance;
28. la ejecución física permanece en `SHELL-CI-022::<package_id>`;
29. no se ejecutan código, despliegues, activaciones, promociones, migraciones, DDL/DML, backfills, modificaciones de datos, configuración remota ni operaciones de Supabase;
30. se crean cero requisitos `TREQ-*`, se modifican cero requisitos `TREQ-*` y se afectan cero fragmentos 04A.

---

#### 28. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-002 — Definir secuencia de activación por sede, área, rol o proceso`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-003 — Definir convivencia temporal con el proceso anterior`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-004 — Diseñar controles contra doble registro y doble efecto durante la transición`


### ✅ CUTOVER-OPS-004 — Diseñar controles contra doble registro y doble efecto durante la transición

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-003 — Definir convivencia temporal con el proceso anterior
**Tarea siguiente:** CUTOVER-OPS-005 — Definir conciliaciones durante el piloto
**Tipo de tarea:** documental — definición normativa y materialización de los controles contra doble registro y doble efecto sobre las unidades, olas y fronteras de autoridad ya definidas para el cutover, vinculando mecanismos canónicos existentes de identidad de operación, idempotencia, atomicidad, deduplicación, fencing, autorización, retry, trabajo diferido y efectos externos; sin implementar controles físicos, ejecutar activaciones, modificar routing, crear colas, cambiar feature flags, conciliar resultados, decidir pausa/reversión/continuación, retirar legacy, desplegar código, ejecutar migraciones, DDL/DML, backfills, modificar datos ni operar Supabase
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>` y de completar los contratos CUTOVER aplicables

---

#### 1. Propósito

`CUTOVER-OPS-004` define dónde y cómo deberán aplicarse durante la transición los controles canónicos ya existentes que impiden que una misma operación lógica sea registrada más de una vez o produzca más de un efecto empresarial por coexistencia entre la ruta anterior y la ruta objetivo.

La tarea parte de la frontera resuelta por `CUTOVER-OPS-003` y responde exclusivamente a estas preguntas:

```text
¿QUÉ UNIDAD Y OLA ESTÁN EXPUESTAS?
+
¿QUÉ RUTA ES AUTORITATIVA PARA ESA UNIDAD Y ESA OPERACIÓN?
+
¿CUÁL ES LA IDENTIDAD ESTABLE DE LA OPERACIÓN O HECHO?
+
¿QUÉ MECANISMO CANÓNICO YA APROBADO IMPIDE REEJECUCIÓN O DOBLE EFECTO?
+
¿QUÉ SUCEDE ANTE RETRY, TIMEOUT, OFFLINE, REENVÍO, COLA O RESULTADO EXTERNO INCIERTO?
+
¿QUÉ SUPERFICIE DEBE QUEDAR BLOQUEADA SI NO PUEDE DEMOSTRARSE EL CONTROL?
=
TRANSICIÓN SIN DOBLE REGISTRO NI DOBLE EFECTO
```

La tarea no crea una nueva semántica de idempotencia. Materializa la aplicación, por frontera de cutover, de contratos ya protegidos por el registro canónico de requisitos y por los expedientes `DELIV-PKG-*`.

---

#### 2. Definiciones operativas

Para esta tarea:

- **doble registro**: materialización repetida del mismo hecho, solicitud, comando, expediente, recepción, movimiento, confirmación o dato empresarial cuando el contrato vigente exige una única captura o identidad autoritativa;
- **doble efecto**: producción más de una vez de una consecuencia empresarial para una misma operación lógica, incluyendo mutaciones internas o efectos externos gobernados por el paquete;
- **operación lógica**: unidad identificable que conserva identidad estable durante su ciclo, incluidos retries, reenvíos, procesamiento asíncrono, offline o recuperación;
- **control anti-duplicidad**: mecanismo aprobado por la fuente propietaria que permite impedir, detectar antes de aplicar o reconocer de manera determinista una repetición sin convertirla en un efecto adicional;
- **fence de autoridad**: restricción que impide que una ruta no autoritativa produzca una mutación o efecto para la unidad gobernada;
- **resultado incierto**: operación para la cual no existe todavía evidencia suficiente de éxito o fallo definitivo y que, por tanto, no puede reenviarse por otra ruta asumiendo fracaso.

Estas definiciones no sustituyen la semántica específica de cada dominio o integración.

---

#### 3. Resultado sustantivo

Por cada instancia aplicable de `package_id`, la tarea materializa cuatro piezas documentales:

1. `duplicate_risk_surface::<package_id>` — inventario de superficies donde la convivencia puede producir registro o efecto duplicado;
2. `duplicate_control_binding::<package_id>` — vínculo de cada superficie con el control, contrato, requisito `TREQ-*`, propietario y mecanismo existente que debe protegerla;
3. `transition_effect_fence_plan::<package_id>` — frontera de autoridad y enforcement que debe permanecer vigente antes, durante y después del punto de activación de cada unidad;
4. `duplicate_control_manifest::<package_id>` — expediente consolidado de unidades, operaciones, identidades, riesgos, controles, estados, bloqueos y referencias que `SHELL-CI-022::<package_id>` deberá consumir durante la ejecución.

Estas piezas son diseño documental. No demuestran que el mecanismo físico exista, esté desplegado o haya sido probado.

---

#### 4. Entradas obligatorias

`CUTOVER-OPS-004` consume, sin redefinirlos:

- `CUTOVER-OPS-001`: ventana y responsables vigentes;
- `CUTOVER-OPS-002`: unidades, olas, orden, dependencias, estados seguros y puntos de decisión;
- `CUTOVER-OPS-003`: proceso o ruta anterior, ruta objetivo, autoridad antes/después, uso permitido de cada ruta, trabajo en curso, compatibilidad temporal y recovery;
- `DELIV-PKG-009`: transición, compatibilidad, coexistencia de escrituras y retiro legacy;
- `DELIV-PKG-010`: eventos, entrega, identidad, idempotencia, retry, colas, DLQ, compensación y conciliación;
- `DELIV-PKG-012`: autorización y frontera autoritativa de servidor;
- `DELIV-PKG-015`: dependencias y orden técnico;
- `DELIV-PKG-016`: requisitos `TREQ-*`, niveles de prueba, fixtures, ambientes, responsables y evidencia esperada;
- `DELIV-PKG-017`: observabilidad, logs, métricas, trazas, alertas y auditoría;
- `DELIV-PKG-018`: estado seguro, targeting, activación y kill switch;
- `DELIV-PKG-019`: rollout, shadow, cohortes, pausas y promoción;
- `DELIV-PKG-020`: rollback, recovery, compensation y tratamiento de efectos inciertos o irreversibles;
- `DELIV-PKG-022`: alcance y cohorte autorizados del piloto;
- `READY-GATE-010..015`: soporte, observabilidad, recuperación, línea base, riesgo y autorización final de entrada.

Cuando una entrada no permita determinar el control aplicable sin inventar comportamiento, la superficie queda `BLOQUEADA`.

---

#### 5. Invariante principal de anti-duplicidad

Para toda superficie mutable o productora de efectos:

```text
UNA OPERACIÓN LÓGICA
→ UNA IDENTIDAD ESTABLE
→ UNA RUTA AUTORITATIVA
→ UN MECANISMO CANÓNICO DE PROTECCIÓN
→ COMO MÁXIMO UN EFECTO EMPRESARIAL EFECTIVO
```

Se preservan además estas reglas:

1. el mismo identificador con el mismo contenido no puede producir un efecto adicional y debe reconocer o recuperar el resultado ya obtenido conforme al contrato aplicable;
2. el mismo identificador con contenido lógico distinto debe producir conflicto o rechazo conforme al contrato existente;
3. un retry no crea una nueva operación por el solo hecho de repetirse;
4. cambiar de interfaz, build, sede activa, ola o ruta técnica no autoriza cambiar la identidad de una operación ya iniciada;
5. una operación no puede saltar de la ruta anterior a la objetivo para eludir un resultado incierto;
6. una ruta `SHADOW` no produce un segundo efecto empresarial;
7. una ruta retenida para recovery no se convierte en segunda ruta operativa normal;
8. la inexistencia o indeterminación del control no se interpreta como permiso para continuar.

---

#### 6. Unidad mínima de control

La unidad mínima de evaluación es:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
activation_unit_ref
+
wave_ref
+
operation_or_effect_ref
```

`operation_or_effect_ref` debe provenir del contrato funcional, de integración, datos, evento, acción, proceso o superficie ya materializada para el paquete.

No se inventan operaciones genéricas para completar una matriz.

Una misma `activation_unit_ref` puede contener varias superficies con controles distintos. La aprobación de una superficie no cubre automáticamente las demás.

---

#### 7. Inventario de superficies de riesgo

`duplicate_risk_surface::<package_id>` deberá evaluar, cuando existan en las fuentes del paquete:

| Superficie                                | Riesgo de transición que debe resolverse                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| mutación síncrona de servidor             | envío repetido, doble submit, uso simultáneo de ruta anterior y objetivo                            |
| RPC o transacción de datos                | repetición de mutación, carrera, estado parcialmente aplicado                                       |
| job, cola, outbox, inbox o tarea diferida | reentrega, lease vencido, doble consumidor, replay                                                  |
| webhook o callback                        | entrega repetida o fuera de orden                                                                   |
| integración externa                       | timeout con resultado incierto, retry o reenvío por canal alterno                                   |
| operación offline o móvil                 | sincronización repetida, reenvío después de reconexión                                              |
| proceso manual/legacy                     | doble digitación o registro paralelo después del cambio de autoridad                                |
| notificación, impresión o evidencia       | repetición de un efecto externo o documento cuando el contrato exige unicidad                       |
| inventario, costo, contabilidad o ledger  | duplicación de movimiento, recepción, costo, obligación o hecho económico                           |
| `SHADOW`                                  | mutación accidental desde una ruta que solo debía observar                                          |
| backfill o transición de datos            | doble aplicación sobre una identidad ya procesada cuando el contrato aprobado contemple reanudación |
| recuperación                              | reejecución del efecto original al intentar restaurar servicio                                      |

Una superficie inexistente o no aplicable se marca `NO_APLICA` con referencia a la fuente que lo demuestra.

---

#### 8. Familias de control permitidas

`CUTOVER-OPS-004` no selecciona tecnología por preferencia. Cada superficie debe enlazarse con uno o más mecanismos ya aprobados por su contrato propietario.

Las familias documentales admitidas son:

| Familia                        | Uso                                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `AUTHORITY_FENCE`              | impedir que una ruta no autoritativa produzca mutaciones para la unidad                                                |
| `STABLE_OPERATION_IDENTITY`    | conservar identidad estable entre intentos, retries, offline y rutas compatibles                                       |
| `IDEMPOTENT_RESULT_REUSE`      | reconocer una repetición equivalente y recuperar el resultado original sin producir otro efecto                        |
| `CONTENT_CONFLICT_GUARD`       | rechazar la reutilización de una misma identidad con contenido lógico incompatible                                     |
| `ATOMICITY_OR_VERSION_GUARD`   | impedir efectos parciales o carreras mediante transacción, versión, bloqueo, claim o mecanismo equivalente ya aprobado |
| `OUTBOX_INBOX_OR_CLAIM_GUARD`  | controlar entrega y consumo repetibles en procesamiento asíncrono                                                      |
| `EXTERNAL_EFFECT_GUARD`        | preservar correlación/idempotencia y evitar reenvío ciego ante resultado externo incierto                              |
| `SHADOW_NO_EFFECT_GUARD`       | asegurar que una superficie observacional no produzca mutaciones empresariales                                         |
| `WORK_IN_PROGRESS_ROUTE_FENCE` | mantener una operación ya iniciada bajo la ruta que conserva su autoridad hasta resolución conforme a su contrato      |
| `OBSERVABILITY_AUDIT_GUARD`    | conservar intento, resultado, duplicado reconocido, conflicto y efecto final sin exponer secretos                      |
| `FAIL_CLOSED_GUARD`            | impedir activación o mutación cuando falta un control obligatorio o su estado no es demostrable                        |

Un paquete puede usar mecanismos físicos diferentes para una misma familia. La tarea no obliga a una tabla, índice, lock, cola o librería concreta si la fuente propietaria no la ha definido.

---

#### 9. Selección del control por superficie

Para cada superficie se aplica este algoritmo documental:

1. identificar la operación o efecto exacto;
2. identificar la ruta autoritativa derivada de `CUTOVER-OPS-003`;
3. identificar el requisito `TREQ-*` ya vinculado al paquete o al contrato que protege esa conducta;
4. identificar el mecanismo físico o contractual planificado en `DELIV-PKG-007..016`;
5. comprobar que el mecanismo sigue siendo compatible con candidato, ambiente y secuencia;
6. comprobar que cubre retries, concurrencia o reentrega que realmente apliquen;
7. comprobar que el mecanismo no depende de que ambas rutas sean simultáneamente autoritativas;
8. registrar el control y su propietario;
9. si el mecanismo no existe, no es identificable o resulta insuficiente para el riesgo materializado, marcar `BLOQUEADA`.

No se crea un mecanismo nuevo dentro de 004 para convertir un bloqueo en éxito.

---

#### 10. Control de doble registro entre ruta anterior y ruta objetivo

Cuando ambas superficies estén disponibles temporalmente:

1. solo la ruta autoritativa definida por 003 puede crear o confirmar el hecho para la unidad;
2. la ruta no autoritativa deberá quedar en el uso permitido definido por 003;
3. una interfaz legacy todavía visible no conserva derecho de escritura por visibilidad;
4. una interfaz objetivo desplegada pero todavía no activada no adquiere derecho de escritura por disponibilidad;
5. un operador no puede registrar el mismo hecho en ambas rutas para “asegurar” que quede procesado;
6. un fallback manual no puede crear una copia autoritativa competidora salvo que exista un contrato previo específico que modele ese comportamiento;
7. si no puede hacerse cumplir la autoridad única con los mecanismos existentes, la unidad queda `BLOQUEADA`.

La existencia simultánea de dos superficies técnicas no equivale a dos fuentes de verdad.

---

#### 11. Control de reintentos y reenvíos

Los retries preservan el contrato de `TREQ-INTEGRATION-003`:

- misma identidad estable;
- mismo contenido lógico esperado;
- estado durable;
- resultado recuperable;
- límites y clasificación de retry del contrato propietario;
- tratamiento explícito de timeout o resultado desconocido;
- no creación de un nuevo efecto por repetición equivalente.

Está prohibido:

- cambiar la idempotency key para “forzar” un segundo intento;
- reenviar por la ruta alternativa sin resolver el resultado del intento anterior;
- considerar un timeout como fallo definitivo sin evidencia suficiente;
- reiniciar desde cero una operación cuya identidad durable todavía existe;
- utilizar el cambio de ola como motivo para generar una nueva identidad para la misma operación lógica.

---

#### 12. Operaciones asíncronas, colas y webhooks

Cuando el paquete consuma procesamiento asíncrono, el control deberá enlazar el mecanismo aprobado de:

- outbox;
- inbox;
- claim atómico;
- lock;
- versión;
- clave de operación;
- hash lógico;
- estado durable;
- resultado recuperable;
- DLQ o equivalente;
- observabilidad y recuperación controlada;

según corresponda a las fuentes propietarias.

La tarea no exige que todos esos mecanismos existan simultáneamente. Exige que el mecanismo aplicable satisfaga el contrato ya aprobado.

La reentrega de un mensaje o webhook no debe transformarse en una segunda operación empresarial.

---

#### 13. Concurrencia y mutaciones de datos

Para superficies con mutaciones concurrentes:

1. se conserva la atomicidad o mecanismo idempotente/reconciliable aprobado;
2. una escritura parcial no se acepta como estado final de una operación;
3. dos rutas no pueden mantener contadores, ledgers, stock, costos o estados autoritativos competidores para el mismo hecho;
4. versionado, locking, constraints, transacción, claim u otro mecanismo equivalente solo se exige cuando ya pertenece al contrato físico o de prueba del paquete;
5. si una condición de carrera material no está cubierta por ningún mecanismo aprobado, la unidad queda `BLOQUEADA` y la corrección pertenece a la fuente técnica propietaria.

004 no crea ni modifica tablas, índices, constraints, funciones, políticas RLS ni RPC.

---

#### 14. Efectos externos y resultado incierto

Para pagos, proveedores, impresión, notificaciones, webhooks, dispositivos u otros efectos externos aplicables:

1. la operación conserva una correlación o identidad estable;
2. un timeout no autoriza repetir por otra ruta como una operación nueva;
3. un resultado incierto permanece en el estado previsto por el contrato propietario hasta que pueda determinarse su tratamiento;
4. un retry reutiliza la identidad exigida por el contrato;
5. la ruta objetivo no reemite automáticamente un efecto iniciado por la ruta anterior;
6. la ruta anterior no reemite automáticamente un efecto iniciado por la ruta objetivo;
7. la conciliación que determine el resultado final pertenece a `CUTOVER-OPS-005`;
8. la compensación o recuperación conserva la propiedad de `DELIV-PKG-010` y `DELIV-PKG-020`.

004 define el fence de duplicidad; no ejecuta conciliación ni compensación.

---

#### 15. Offline, móvil y trabajo diferido

Para elementos pendientes originados antes o durante la frontera de activación:

- outbox;
- comandos locales;
- formularios pendientes de sincronización;
- adjuntos;
- retries;
- trabajos diferidos;
- operaciones en curso;

deberán conservar identidad y ownership de ruta conforme a `CUTOVER-OPS-003` y a sus contratos técnicos.

La reconexión no convierte un elemento pendiente en una operación nueva.

Si un cliente antiguo y uno nuevo pueden reenviar el mismo trabajo sin compartir o correlacionar la identidad exigida por el contrato, la unidad se considera `BLOQUEADA` hasta que la fuente propietaria cierre la condición.

---

#### 16. `SHADOW` y superficies no efectivas

Toda superficie `SHADOW` deberá enlazar un control que garantice que su ejecución:

- no confirma el mismo hecho una segunda vez;
- no escribe una segunda fuente autoritativa;
- no genera notificación, impresión, pago, movimiento, costo, inventario, expediente u otro efecto empresarial adicional;
- no consume una operación productiva como si fuera una segunda ejecución;
- conserva observabilidad suficiente para comparar sin convertirse en autoridad.

Cuando el candidato no pueda observar sin mutar, el modo `SHADOW` no es válido para esa superficie y se conserva el estado seguro definido por sus fuentes propietarias.

---

#### 17. Fencing por cambio de autoridad

`transition_effect_fence_plan::<package_id>` deberá reflejar la frontera de 003:

##### Antes de la activación

- la ruta anterior conserva únicamente la autoridad que 003 le atribuya;
- la ruta objetivo permanece en su estado seguro o no efectivo;
- cualquier operación iniciada conserva identidad estable.

##### En el punto de activación

- la transferencia de autoridad ocurre solo si los gates aplicables permiten ejecutar ese punto;
- no se abre una ventana de doble autoridad;
- el control contra duplicidad debe ser aplicable antes de aceptar la primera mutación autoritativa de la nueva ruta.

##### Después de la activación

- la nueva ruta solo asume las unidades realmente activadas;
- la ruta anterior conserva únicamente los usos permitidos por 003;
- trabajo en curso anterior sigue el tratamiento aprobado;
- una reversión utiliza `DELIV-PKG-020` y `CUTOVER-OPS-006`, no un bypass informal del fence.

---

#### 18. Evidencia documental exigida al control

Cada `duplicate_control_binding` deberá conservar, como mínimo:

| Campo                     | Regla                                                          |
| ------------------------- | -------------------------------------------------------------- |
| `package_id`              | identidad canónica                                             |
| `candidate_ref`           | mismo candidato autorizado                                     |
| `environment`             | mismo ambiente                                                 |
| `activation_unit_ref`     | unidad exacta de 002/003                                       |
| `wave_ref`                | ola exacta                                                     |
| `operation_or_effect_ref` | operación o efecto protegido                                   |
| `authoritative_route_ref` | ruta autoritativa derivada de 003                              |
| `risk_type`               | doble registro, doble efecto o ambos                           |
| `control_family`          | familia documental aplicable                                   |
| `control_source_ref`      | fuente propietaria del mecanismo                               |
| `treq_refs`               | requisitos existentes que protegen la conducta                 |
| `implementation_ref`      | referencia física planificada cuando exista                    |
| `retry_identity_ref`      | identidad o contrato aplicable a reintentos cuando corresponda |
| `external_effect_ref`     | contrato de efecto externo cuando aplique                      |
| `observability_ref`       | señal o evidencia esperada                                     |
| `owner_ref`               | propietario vigente                                            |
| `status`                  | estado documental del binding                                  |
| `blocking_reason`         | causa concreta cuando exista                                   |
| `blocking_owner`          | propietario canónico de resolución                             |
| `exit_condition`          | condición verificable para salir del bloqueo                   |

No se almacenan secretos, tokens ni payloads sensibles como evidencia ordinaria.

---

#### 19. Estados documentales

Cada binding usa exactamente uno de estos estados:

| Estado             | Semántica                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `CONTROL_DEFINIDO` | existe riesgo aplicable y está vinculado a un mecanismo canónico suficiente ya planificado/aprobado                              |
| `NO_APLICA`        | la superficie no puede producir registro o efecto duplicado bajo el contrato vigente, con fundamento trazable                    |
| `BLOQUEADA`        | existe riesgo material pero no puede identificarse o demostrarse un control suficiente                                           |
| `INVALIDADA`       | un binding previamente definido dejó de corresponder a candidato, ambiente, unidad, autoridad, contrato o implementación vigente |

`CONTROL_DEFINIDO` no significa `IMPLEMENTADO` ni `VALIDADO`.

---

#### 20. Regla de bloqueo obligatorio

La unidad no puede considerarse lista para ejecutar cuando exista al menos una superficie material con estado `BLOQUEADA`.

Causas de bloqueo incluyen:

1. falta identidad estable donde el contrato la exige;
2. dos rutas pueden mutar simultáneamente el mismo alcance;
3. un retry podría cambiar de ruta o crear nueva identidad;
4. timeout externo puede producir reenvío ciego;
5. no existe control suficiente frente a reentrega de cola/webhook;
6. el trabajo offline puede reaparecer como operación nueva;
7. `SHADOW` produce efectos;
8. una mutación crítica carece de atomicidad o mecanismo equivalente exigido por su contrato;
9. observabilidad no permite atribuir intento, resultado y efecto cuando el contrato lo requiere;
10. la implementación física referenciada no corresponde al candidato o ambiente;
11. el control depende de una tarea o paquete cuyo gate permanece abierto;
12. la solución exigiría inventar una regla o mecanismo no aprobado.

Cada bloqueo conserva propietario y condición de salida. No se usa `TBD`.

---

#### 21. Relación con `DELIV-PKG-016` y el registro 04A

004 no crea una matriz de pruebas paralela.

Los controles deberán enlazar los `TREQ-*` ya aplicables al paquete y, en particular cuando corresponda:

- `TREQ-INTEGRATION-003` para identidad estable, idempotencia, retry, estado durable y resultado recuperable;
- `TREQ-INTEGRATION-004` para trazabilidad de cadenas y ausencia de duplicación por retry;
- `TREQ-INTEGRATION-005` para continuidad de proceso y contexto entre aplicaciones;
- `TREQ-INTEGRATION-006` para captura única y resolución de fuentes competidoras;
- requisitos de dominio como `TREQ-INTEGRATION-007..010` cuando el paquete esté dentro de esos contratos;
- `TREQ-SUPABASE-001` para compatibilidad legacy y gate de retiro cuando aplique;
- `TREQ-SUPABASE-002` para atomicidad o mecanismo idempotente/reconciliable en operaciones de inventario y representaciones relacionadas;
- `TREQ-SHELL-006` para compatibilidad entre contratos y consumidores;
- `TREQ-SHELL-007` para recuperación independiente y compatible;
- cualquier otro requisito ya vinculado por `DELIV-PKG-016` a la operación concreta.

La lista es de reutilización, no una reasignación global de requisitos a todos los paquetes.

---

#### 22. Tratamiento por modalidad heredada

La clasificación de `CUTOVER-OPS-002` se conserva sin cambios:

| Modalidad heredada            | Tratamiento en 004                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `PILOT-DIRECT-001`            | materializar bindings para las superficies efectivas de sus unidades secuenciadas                             |
| `PILOT-SHARED-001`            | proteger el contrato compartido en las ejecuciones de consumidores directos; no crear una activación ficticia |
| `PILOT-CONTROL-001`           | observar o aplicar enforcement solo donde exista una superficie ejecutable ya aprobada                        |
| AURA bloqueada                | conservar bloqueo; no diseñar un mecanismo físico ficticio                                                    |
| dependencia externa bloqueada | conservar bloqueo hasta cerrar su gate                                                                        |
| TALENTO fuera de línea actual | mantener fuera de ejecución en esta línea                                                                     |

La cobertura heredada continúa reconciliando:

```text
159 + 3 + 27 + 14 + 2 + 2 = 207
```

004 no cambia modalidad, paquete, perfil técnico ni gate.

---

#### 23. Frontera con `CUTOVER-OPS-005`

`CUTOVER-OPS-004` impide o reconoce duplicidad antes de permitir un segundo efecto. No define las conciliaciones empresariales que deberán comparar resultados durante el piloto.

El handoff a 005 es:

```text
UNIDADES Y OLAS
+
OPERACIONES Y EFECTOS IDENTIFICADOS
+
RUTA AUTORITATIVA
+
IDENTIDAD ESTABLE / CORRELACIÓN
+
CONTROL ANTI-DUPLICIDAD VINCULADO
+
RESULTADOS INCIERTOS O REPETICIONES RECONOCIDAS
+
SEÑALES Y EVIDENCIA ESPERADA
=
SUPERFICIES QUE CUTOVER-OPS-005 DEBERÁ CONCILIAR CUANDO CORRESPONDA
```

`CUTOVER-OPS-005` no deberá reinterpretar una duplicación bloqueada como una diferencia reconciliable aceptable ni modificar la autoridad fijada por 003.

---

#### 24. Frontera con las tareas posteriores

004 no anticipa:

- `CUTOVER-OPS-005`: conciliaciones durante el piloto;
- `CUTOVER-OPS-006`: criterio de pausa, reversión o continuación;
- `CUTOVER-OPS-007`: registro de incidentes, decisiones y cambios de alcance;
- `CUTOVER-OPS-008`: métricas de tiempos, errores, adopción y resultado empresarial;
- `CUTOVER-OPS-009`: autoridad y criterio de salida del piloto;
- `CUTOVER-OPS-010`: condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutar retiro lógico o físico.

Una señal de duplicidad podrá ser consumida posteriormente por esas tareas, pero 004 no define sus umbrales ni sus decisiones.

---

#### 25. Invalidation y revalidación

`duplicate_control_manifest::<package_id>` queda `INVALIDADA` cuando cambia materialmente:

- candidato;
- ambiente;
- alcance;
- ventana;
- unidad u ola;
- autoridad de 003;
- operación o efecto protegido;
- contrato de integración;
- mecanismo físico referenciado;
- estrategia de retry;
- modelo de datos;
- estrategia de rollout;
- recovery/rollback;
- requisito `TREQ-*` aplicable;
- responsable del control.

La revalidación debe partir de las fuentes vigentes. No se conserva un binding antiguo por similitud de nombre o tecnología.

---

#### 26. Contenido mínimo del manifiesto

`duplicate_control_manifest::<package_id>` deberá conservar:

1. `package_id`;
2. `candidate_ref`;
3. `environment`;
4. `authorized_scope_ref`;
5. `cutover_window_ref`;
6. `activation_sequence_ref`;
7. `coexistence_manifest_ref`;
8. total de unidades recibidas;
9. total de unidades evaluadas;
10. total de superficies evaluadas;
11. bindings por `operation_or_effect_ref`;
12. ruta autoritativa por binding;
13. control family;
14. fuentes propietarias;
15. `treq_refs`;
16. referencias físicas planificadas cuando existan;
17. manejo de retry, offline o resultado incierto cuando apliquen;
18. observabilidad y evidencia esperada;
19. propietario;
20. estado;
21. bloqueos, propietario y condición de salida;
22. revisión documental y referencias de evidencia.

Todas las unidades recibidas de 003 deben quedar evaluadas, aunque su resultado sea `NO_APLICA`.

---

#### 27. Separación entre diseño y ejecución

`CUTOVER-OPS-004` es exclusivamente documental.

No ejecuta:

- bloqueos físicos;
- writes fences;
- feature flags;
- constraints;
- locks;
- colas;
- outbox/inbox;
- webhooks;
- retries;
- conciliaciones;
- compensaciones;
- rollback;
- migraciones;
- DDL/DML;
- backfills;
- despliegues;
- mutaciones de datos;
- configuración remota;
- operaciones sobre Supabase.

La implementación física corresponde a las tareas y paquetes propietarios ya definidos. La ejecución de cutover corresponde a `SHELL-CI-022::<package_id>`.

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

**Justificación:** `CUTOVER-OPS-004` no introduce una regla ejecutable nueva. Materializa, en la frontera concreta de cutover definida por `CUTOVER-OPS-002/003`, la ubicación y vinculación de controles ya protegidos por requisitos vigentes: identidad estable, idempotencia, reutilización de resultado, conflicto por contenido, retry controlado, atomicidad o mecanismo equivalente, captura única, prevención de fuentes competidoras, compatibilidad legacy, recuperación y trazabilidad. La implementación y prueba de esos comportamientos permanece vinculada a los paquetes mediante `DELIV-PKG-016` y a sus tareas técnicas propietarias. La tarea no cambia identidad, contenido, estado, relación, prioridad, paquete, repositorio, artefacto ni evidencia de ninguna fila `TREQ-*`.

---

#### 29. Criterios de aceptación documental

`CUTOVER-OPS-004` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-003 → CUTOVER-OPS-004 → CUTOVER-OPS-005`;
2. utiliza únicamente unidades, olas, alcance y autoridad definidos por 002/003;
3. define `duplicate_risk_surface`, `duplicate_control_binding`, `transition_effect_fence_plan` y `duplicate_control_manifest`;
4. toda superficie mutable o productora de efectos queda evaluada;
5. cada operación aplicable conserva identidad estable conforme a su contrato;
6. una repetición equivalente no produce un segundo efecto;
7. una reutilización incompatible de identidad queda asociada al conflicto exigido por el contrato vigente;
8. ningún retry cambia de ruta para eludir un resultado incierto;
9. un timeout no se interpreta automáticamente como fallo definitivo;
10. el trabajo offline o diferido no pierde identidad por reconexión o cambio de ola;
11. una ruta no autoritativa no conserva permiso de mutación por seguir visible o disponible;
12. `SHADOW` no produce un segundo efecto empresarial;
13. recovery no se convierte en segunda ruta operativa;
14. procesamiento asíncrono referencia mecanismos existentes de idempotencia, claim, outbox/inbox, lock, versión o equivalente según aplicabilidad;
15. operaciones de datos preservan la atomicidad o mecanismo equivalente ya aprobado;
16. efectos externos inciertos no se reenvían ciegamente por otra ruta;
17. la tarea no define conciliaciones, compensaciones o nuevos contratos de retry;
18. ninguna tecnología concreta se impone por preferencia;
19. todo control tiene fuente propietaria y `treq_refs` aplicables;
20. `CONTROL_DEFINIDO` no se confunde con `IMPLEMENTADO` o `VALIDADO`;
21. toda superficie material sin control suficiente queda `BLOQUEADA`;
22. todo bloqueo tiene causa, propietario y condición de salida;
23. los cambios materiales invalidan el manifiesto y exigen revalidación;
24. las modalidades heredadas reconcilian `159 + 3 + 27 + 14 + 2 + 2 = 207`;
25. shared y control no reciben activaciones ficticias;
26. AURA, EXT y TALENTO conservan sus gates;
27. 005 recibe superficies de conciliación sin que 004 ejecute la conciliación;
28. la ejecución física permanece en `SHELL-CI-022::<package_id>` y en las tareas técnicas propietarias;
29. no se ejecutan código, despliegues, activaciones, promociones, migraciones, DDL/DML, backfills, cambios de datos, configuración remota ni operaciones de Supabase;
30. se crean cero requisitos `TREQ-*`, se modifican cero requisitos `TREQ-*` y se afectan cero fragmentos 04A.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-003 — Definir convivencia temporal con el proceso anterior`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-004 — Diseñar controles contra doble registro y doble efecto durante la transición`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-005 — Definir conciliaciones durante el piloto`


### ✅ CUTOVER-OPS-005 — Definir conciliaciones durante el piloto

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-004 — Diseñar controles contra doble registro y doble efecto durante la transición
**Tarea siguiente:** CUTOVER-OPS-006 — Definir criterio de pausa, reversión o continuación
**Tipo de tarea:** documental — definición normativa y materialización del plan de conciliación durante el piloto sobre las unidades, olas, operaciones, efectos, identidades, fuentes autoritativas, resultados inciertos y controles anti-duplicidad ya definidos, vinculando reglas canónicas existentes de correlación, comparación, idempotencia, fuentes de verdad, recuperación, compensación, observabilidad y evidencia; sin ejecutar conciliaciones, corregir datos, reintentar operaciones, compensar efectos, modificar autoridad, decidir pausa/reversión/continuación, registrar incidentes, retirar legacy, desplegar código, ejecutar migraciones, DDL/DML, backfills, cambios remotos ni operaciones sobre Supabase
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>` y de completar los contratos CUTOVER aplicables

---

#### 1. Propósito

`CUTOVER-OPS-005` define cómo deberá demostrarse durante el piloto que las representaciones, efectos y resultados que deban converger permanecen coherentes con su fuente autoritativa y con los contratos aprobados del paquete.

La tarea parte de la superficie entregada por `CUTOVER-OPS-004` y responde exclusivamente a estas preguntas:

```text
¿QUÉ UNIDAD, OLA, OPERACIÓN O EFECTO REQUIERE CONCILIACIÓN?
+
¿CUÁL ES LA FUENTE AUTORITATIVA QUE DEFINE EL RESULTADO ESPERADO?
+
¿QUÉ IDENTIDAD O CORRELACIÓN PERMITE COMPARAR EL MISMO HECHO?
+
¿QUÉ CONTRAPARTE OBSERVADA DEBE CONTRASTARSE?
+
¿QUÉ REGLA DE COMPARACIÓN YA APROBADA DETERMINA COINCIDENCIA O DIFERENCIA?
+
¿LA DIFERENCIA ESTÁ EXPLÍCITAMENTE PERMITIDA, SIGUE INCIERTA O CONSTITUYE UNA ANOMALÍA?
+
¿QUÉ EVIDENCIA Y PROPIETARIO CONSERVAN EL RESULTADO?
=
CONCILIACIÓN DEL PILOTO DEFINIDA SIN INVENTAR FUENTES, TOLERANCIAS NI CORRECCIONES
```

Esta tarea no ejecuta la conciliación ni corrige una diferencia. Materializa el contrato que la ejecución posterior deberá consumir.

---

#### 2. Definiciones de trabajo

Para esta tarea:

- **conciliación**: comparación trazable entre una fuente autoritativa y una o más representaciones, entregas, efectos o resultados relacionados, usando identidad y regla de comparación ya aprobadas;
- **fuente autoritativa**: fuente de verdad, productora empresarial, ledger, estado de dominio, sistema externo contractual o referencia explícitamente gobernada por la fuente propietaria;
- **contraparte observada**: proyección, consumidor, integración, efecto externo, registro compatible, resultado técnico o representación derivada que debe concordar con la fuente autoritativa según el contrato aplicable;
- **clave de conciliación**: identidad estable, clave empresarial, `event_id`, `operation_id`, `correlation_id`, clave de efecto, versión o combinación explícitamente aprobada que permite asegurar que se compara el mismo hecho;
- **regla de comparación**: contrato vigente que define qué campos, estados, cantidades, versiones, relaciones o efectos deben coincidir y qué divergencias temporales, si existen, son admisibles;
- **resultado incierto**: caso en el que existe posibilidad de efecto o mutación, pero la evidencia disponible todavía no permite clasificarlo como aplicado o no aplicado;
- **diferencia esperada**: divergencia temporal admitida expresamente por una fuente canónica, con condición de convergencia o cierre identificable;
- **diferencia no resuelta**: divergencia no autorizada o todavía no explicada por el contrato aplicable.

La conciliación no equivale a promedio, mayoría, copia bidireccional, sobrescritura, reparación automática ni elección de la fuente con el dato “más reciente”.

---

#### 3. Resultado sustantivo

Por cada instancia aplicable de `package_id`, la tarea materializa cuatro piezas documentales:

1. `pilot_reconciliation_surface::<package_id>` — conjunto de superficies que requieren o pueden requerir conciliación durante el piloto;
2. `pilot_reconciliation_rule_binding::<package_id>` — vínculo de cada superficie con su fuente autoritativa, contraparte, clave de correlación, regla de comparación, requisitos existentes, propietario y evidencia;
3. `pilot_reconciliation_plan::<package_id>` — orden y momento documental en que deberán evaluarse las conciliaciones aplicables dentro de la secuencia ya aprobada;
4. `pilot_reconciliation_manifest::<package_id>` — expediente consolidado de unidades, olas, superficies, reglas, resultados posibles, bloqueos, responsables y handoff a `CUTOVER-OPS-006`.

Estas piezas no constituyen evidencia de ejecución. Un plan `DEFINIDO` no implica que una conciliación haya sido corrida ni que una diferencia haya sido resuelta.

---

#### 4. Entradas obligatorias

`CUTOVER-OPS-005` consume, sin redefinirlas:

- `CUTOVER-OPS-001`: ventana, candidato, ambiente, alcance y responsables vigentes;
- `CUTOVER-OPS-002`: unidades, olas, orden, dependencias, estado seguro y puntos de decisión;
- `CUTOVER-OPS-003`: ruta anterior, ruta objetivo, autoridad antes/después, trabajo en curso, compatibilidad temporal y recovery;
- `CUTOVER-OPS-004`: operaciones y efectos, identidad estable, control anti-duplicidad, resultados inciertos, repeticiones reconocidas, señales y evidencia esperada;
- `DELIV-PKG-009`: migraciones, backfills, compatibilidad temporal y retiro legacy;
- `DELIV-PKG-010`: eventos, productoras, consumidoras, entrega, idempotencia, retry, colas, aislamiento, compensación y conciliación;
- `DELIV-PKG-012`: autorización y frontera autoritativa de servidor;
- `DELIV-PKG-015`: dependencias, bloqueos y orden técnico;
- `DELIV-PKG-016`: requisitos de prueba, niveles, fixtures, entornos, responsables y evidencia esperada;
- `DELIV-PKG-017`: logs, métricas, trazas, alertas, correlación y auditoría;
- `DELIV-PKG-018`: estado seguro, targeting, activación y kill switch;
- `DELIV-PKG-019`: rollout, shadow, cohortes, pausas y promoción;
- `DELIV-PKG-020`: rollback, recovery, compensation, efectos irreversibles y conciliación;
- `DELIV-PKG-022`: alcance y cohorte de piloto;
- `READY-GATE-010..015`: soporte, observabilidad, recuperación, línea base, riesgos y autorización final de entrada.

Si una entrada necesaria no permite identificar una fuente autoritativa, clave de conciliación o regla de comparación sin inferencia, la superficie queda `BLOQUEADA`.

---

#### 5. Invariante principal

Toda conciliación ejecutable deberá respetar:

```text
MISMO HECHO U OPERACIÓN
+
IDENTIDAD / CORRELACIÓN ESTABLE
+
FUENTE AUTORITATIVA EXPLÍCITA
+
CONTRAPARTE IDENTIFICADA
+
REGLA DE COMPARACIÓN VIGENTE
+
EVIDENCIA REPRODUCIBLE
=
RESULTADO DE CONCILIACIÓN ATRIBUIBLE
```

Se prohíbe:

1. conciliar por semejanza de texto, timestamp aproximado o posición visual cuando la identidad canónica exige otra clave;
2. escoger como fuente de verdad el valor mayor, menor, más reciente o mayoritario sin contrato explícito;
3. considerar que dos valores iguales prueban por sí solos que corresponden al mismo hecho;
4. convertir una diferencia en corrección automática;
5. interpretar ausencia de registro, log, callback o ACK como ausencia de efecto;
6. aceptar una duplicación confirmada como “diferencia tolerable”;
7. reejecutar una operación para intentar hacer coincidir las fuentes;
8. sobrescribir historia para eliminar la evidencia de una diferencia.

---

#### 6. Unidad mínima de conciliación

La unidad mínima documental es:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
activation_unit_ref
+
wave_ref
+
reconciliation_subject_ref
```

`reconciliation_subject_ref` identifica el hecho, operación, efecto, entidad, proyección, entrega o relación concreta que debe compararse.

Una unidad de activación puede producir cero, una o varias superficies de conciliación. No se crea una conciliación artificial para completar una cantidad predeterminada.

---

#### 7. Superficies que deben evaluarse

`pilot_reconciliation_surface::<package_id>` deberá revisar, cuando apliquen según las fuentes del paquete:

| Superficie                                    | Conciliación exigible                                                                                       |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| resultado `RESULT_UNKNOWN` o equivalente      | confirmar si el efecto ocurrió antes de permitir cualquier tratamiento posterior                            |
| retry o repetición reconocida                 | comprobar que la operación conserva un único resultado o efecto conforme a su contrato                      |
| productor → consumidor                        | comparar hecho fuente, identidad, versión, audiencia y proyección cuando el contrato exige convergencia     |
| outbox/inbox/cola/job                         | correlacionar operación, intento, entrega, resultado y estado durable                                       |
| webhook/callback externo                      | correlacionar solicitud, respuesta, callback, estado externo y estado interno gobernado                     |
| inventario/ledger/costo                       | comprobar representaciones que el contrato exige mantener atómicas o reconciliables                         |
| migración/backfill                            | comprobar cobertura, identidad, procedencia y resultado cuando el plan de transición exige conciliación     |
| offline/móvil                                 | correlacionar trabajo local pendiente con el resultado autoritativo después de sincronización               |
| ruta anterior/ruta objetivo                   | verificar que la transición no dejó fuentes competidoras cuando la compatibilidad exige una sola autoridad  |
| proyección/Realtime/cache                     | comprobar convergencia solo cuando el contrato la trata como representación derivada                        |
| reporte/analítica                             | comprobar cobertura, duplicados, frescura, linaje y reconciliación cuando el paquete incluye esa superficie |
| efecto irreversible o parcialmente reversible | conservar evidencia y tratamiento de `DELIV-PKG-020` sin simular reversibilidad                             |

Una superficie solo entra al plan cuando una fuente aprobada demuestra que debe existir relación de coherencia o convergencia.

---

#### 8. Determinación de la fuente autoritativa

La fuente autoritativa se resuelve por precedencia contractual:

1. fuente primaria de dominio o sistema propietario ya aprobada;
2. productora empresarial definida por el contrato de eventos;
3. ledger o registro autoritativo expresamente definido;
4. fuente externa cuando el contrato aprobado le atribuye autoridad sobre ese hecho;
5. otra fuente expresamente materializada por la tarea propietaria.

No son fuentes autoritativas por sí mismas:

- una pantalla;
- una copia local;
- una caché;
- una proyección;
- Realtime;
- un log;
- una métrica;
- una tabla por ser técnicamente accesible;
- una Edge Function por ejecutar código;
- un webhook por transportar un mensaje;
- una aplicación consumidora;
- la ruta anterior después de perder autoridad;
- la ruta objetivo antes de recibirla.

Si dos fuentes reclaman autoridad sobre el mismo hecho y ninguna precedencia canónica lo resuelve, la conciliación queda `BLOQUEADA`.

---

#### 9. Identidad y correlación

Toda comparación deberá usar la identidad aprobada para la superficie.

Según aplicabilidad, podrá incluir:

- identificador empresarial estable;
- `event_id`;
- `operation_id`;
- `idempotency_key`;
- `correlation_id`;
- `causation_id`;
- clave de efecto;
- versión de agregado o recurso;
- identificador externo contractual;
- clave compuesta aprobada.

Reglas:

1. un retry conserva la identidad de la operación que el contrato exige;
2. una redelivery conserva la identidad del evento;
3. una operación externa conserva correlación suficiente para consultar su resultado;
4. una clave de conciliación no se reconstruye por coincidencia de nombre o descripción;
5. si la identidad se perdió y no existe contrato seguro para reconstruirla, el caso queda `BLOQUEADA`;
6. la conciliación no crea un identificador retroactivo para aparentar que dos registros siempre fueron el mismo hecho.

---

#### 10. Regla de comparación

Cada `pilot_reconciliation_rule_binding` deberá referenciar una regla ya aprobada que determine qué comparar.

La regla puede exigir, según la superficie:

- existencia;
- identidad;
- versión;
- estado;
- cantidad;
- unidad;
- importe;
- moneda;
- recurso;
- propietario;
- actor o principal;
- alcance;
- orden causal;
- conteo de efectos;
- estado externo;
- timestamp semántico;
- cobertura;
- frescura;
- integridad referencial;
- linaje.

No existe una lista universal de campos obligatorios para todas las conciliaciones.

Si una comparación requiere tolerancia numérica, ventana temporal, rounding, timezone, orden, cardinalidad o equivalencia semántica, ese criterio debe provenir de una fuente canónica. 005 no inventa tolerancias por conveniencia.

---

#### 11. Momento de conciliación

`pilot_reconciliation_plan::<package_id>` deberá ubicar cada conciliación en uno o más momentos ya permitidos por el contrato aplicable:

- después de una operación o efecto cuando el resultado debe verificarse inmediatamente;
- antes de reintentar un `RESULT_UNKNOWN`;
- después de recibir callback o confirmación externa;
- al cerrar un lote o trabajo asíncrono cuando el contrato lo exige;
- antes de un checkpoint entre olas;
- al finalizar una ola cuando la evidencia del paquete lo requiere;
- antes de una decisión de recovery o compensation cuando la reversibilidad depende del estado real;
- al cierre del periodo de piloto cuando una fuente exige convergencia acumulada.

La tarea no fija una frecuencia universal ni un intervalo por defecto.

`CUTOVER-OPS-006` conserva la propiedad de decidir qué resultado de conciliación obliga a continuar, pausar o revertir.

---

#### 12. Clasificación documental de resultados

Cada ejecución futura deberá poder materializar uno de estos resultados documentales:

| Estado                   | Semántica                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `CONCILIADA`             | la comparación ejecutada coincide con la regla aplicable y existe evidencia reproducible                                |
| `DIFERENCIA_ESPERADA`    | existe divergencia explícitamente permitida por un contrato vigente y su condición de convergencia sigue abierta        |
| `DIFERENCIA_NO_RESUELTA` | existe divergencia no explicada o no permitida por la regla vigente                                                     |
| `RESULTADO_INCIERTO`     | no existe evidencia suficiente para determinar el estado o efecto real                                                  |
| `DUPLICIDAD_CONFIRMADA`  | la evidencia demuestra más de un registro o efecto donde el contrato exige unicidad                                     |
| `NO_APLICA`              | la superficie no requiere conciliación bajo el contrato vigente                                                         |
| `BLOQUEADA`              | no puede construirse o ejecutarse de forma segura por falta de fuente, identidad, regla, acceso o evidencia obligatoria |
| `INVALIDADA`             | el binding dejó de corresponder a candidato, ambiente, unidad, fuente, contrato o implementación vigentes               |

En el artefacto de planificación, estos valores describen el espacio de resultados permitido. No se asigna `CONCILIADA` sin ejecución real.

---

#### 13. Diferencias esperadas

`DIFERENCIA_ESPERADA` solo puede usarse cuando la fuente propietaria define explícitamente:

1. qué representaciones pueden divergir;
2. por qué esa divergencia es válida;
3. desde qué evento o frontera comienza;
4. cuál es su condición objetiva de convergencia o cierre;
5. qué evidencia permite demostrar que sigue dentro del contrato.

No se convierte latencia desconocida, dato faltante, error silencioso o duplicación en diferencia esperada.

Una divergencia cuyo periodo permitido venció pasa al tratamiento que corresponda según la regla propietaria y no conserva automáticamente `DIFERENCIA_ESPERADA`.

---

#### 14. Resultados inciertos

Un `RESULTADO_INCIERTO` se conserva como incertidumbre hasta obtener evidencia suficiente.

Reglas:

- no se presume éxito;
- no se presume fallo;
- no se reejecuta por otra ruta para “comprobar”;
- se consulta o reconcilia conforme al contrato de integración y recovery;
- conserva identidad, intentos, timestamps semánticos y evidencia disponible;
- si la incertidumbre no puede resolverse dentro de la capacidad aprobada del paquete, queda explícitamente entregada a la decisión de `CUTOVER-OPS-006`;
- cualquier incidente o decisión derivada se registrará mediante `CUTOVER-OPS-007`.

005 no define el umbral temporal que transforma la incertidumbre en una decisión de pausa o reversión.

---

#### 15. Duplicidad confirmada

La conciliación puede detectar una duplicidad, pero no la normaliza.

Ante `DUPLICIDAD_CONFIRMADA`:

1. se preservan todas las identidades y efectos observados;
2. no se elimina ni fusiona historia para ocultar la repetición;
3. se referencia el binding de `CUTOVER-OPS-004` que debía impedirla;
4. se conserva la fuente autoritativa;
5. se preserva la evidencia necesaria para diagnóstico y tratamiento;
6. la decisión de continuar, pausar o revertir pertenece a `CUTOVER-OPS-006`;
7. el registro del incidente pertenece a `CUTOVER-OPS-007`;
8. correction, compensation, reverse, refund, adjust, restate u otra acción solo se ejecuta mediante el contrato propietario correspondiente.

Una duplicidad confirmada nunca puede clasificarse como `CONCILIADA`.

---

#### 16. Integraciones, eventos y trabajo asíncrono

Para superficies gobernadas por `DELIV-PKG-010`:

- un evento empresarial y un evento técnico no se comparan como si fueran la misma identidad;
- el `event_id` permanece estable en redelivery;
- un retry crea nuevo intento, no nueva operación empresarial;
- un timeout posterior a una posible frontera de efecto exige consulta o conciliación antes de reejecución;
- `DEAD_LETTER`, `QUARANTINE` y `RECONCILIATION` conservan sus semánticas técnicas y no se convierten en estados empresariales;
- una consumidora puede tener estado técnico diferente sin cambiar el hecho confirmado por la productora;
- una proyección se concilia contra la fuente propietaria cuando el contrato exige convergencia;
- un coordinador de compensación no adquiere autoridad para escribir la fuente privada de otra aplicación.

005 no crea eventos, colas, workers, DLQ, compensaciones ni políticas de retry.

---

#### 17. Datos, ledger e inventario

Cuando una superficie afecte ledger, stock, costos u otras representaciones relacionadas:

1. se identifica la fuente o conjunto autoritativo definido por el contrato;
2. se utiliza la identidad empresarial o transaccional aprobada;
3. se comparan las representaciones que deben permanecer atómicas o reconciliables;
4. un fallo parcial conserva evidencia de cada efecto conocido;
5. una diferencia no se corrige sobrescribiendo historia;
6. una reejecución no sustituye la conciliación;
7. correction, adjust, reverse, compensate u otra operación posterior conserva su propia identidad y autorización.

La tarea no ejecuta DML ni modifica valores.

---

#### 18. Migraciones, backfills y compatibilidad

Cuando `DELIV-PKG-009` materialice una transición que exige conciliación:

- origen y destino se correlacionan por la identidad definida por el plan;
- se conserva procedencia;
- se valida cobertura cuando corresponda;
- se distinguen dato ausente, nulo, no aplicable, desconocido y pendiente cuando el contrato lo exige;
- una diferencia de esquema o representación no se considera diferencia empresarial si la regla de transición define equivalencia explícita;
- un backfill no autoriza efectos empresariales secundarios que el contrato prohíbe;
- la retirada legacy no se acelera por una conciliación parcial.

El retiro físico permanece reservado exclusivamente a su tarea de implementación propietaria. `CUTOVER-OPS-010` solo define las condiciones, la evidencia y la decisión documental de elegibilidad para ese retiro.

---

#### 19. Offline, móvil y trabajo diferido

Los elementos pendientes originados antes o durante la activación deberán conciliarse con su identidad original.

Aplican estas reglas:

- reconexión no crea una segunda identidad;
- un outbox pendiente se compara con el resultado autoritativo antes de decidir tratamiento cuando exista incertidumbre;
- una operación local no se declara “perdida” por no aparecer todavía en una proyección;
- una sincronización repetida no convierte una representación derivada en fuente de verdad;
- si el cliente antiguo y el nuevo producen representaciones que no pueden correlacionarse con seguridad, la superficie queda `BLOQUEADA`.

005 no define una nueva estrategia offline.

---

#### 20. Proyecciones, Realtime, cache y reporting

Una representación derivada se concilia de acuerdo con su contrato y nunca adquiere autoridad por coincidencia.

En particular:

- Realtime permanece mecanismo de sincronización cuando así está definido;
- una caché puede quedar temporalmente rezagada únicamente si el contrato lo permite;
- una proyección no corrige el hecho fuente;
- un reporte no se considera certificado si su fuente está vencida, incompleta, degradada o sin reconciliar cuando la regla aplicable lo exige;
- cero, nulo, no aplica, desconocido, no recibido y pendiente no se colapsan en un único valor si el contrato los distingue;
- un dashboard coincidente no prueba integridad del dato fuente por sí solo.

---

#### 21. Conciliación manual controlada

Una intervención manual solo puede formar parte del plan cuando el procedimiento propietario ya la contempla.

Debe conservar, como mínimo:

- identidad del caso;
- fuente autoritativa;
- contraparte;
- regla utilizada;
- actor autorizado;
- antes y después cuando exista una acción posterior;
- motivo;
- evidencia;
- relación con incidente o recovery cuando aplique.

La tarea no crea una excepción de autorización para “arreglar” conciliaciones manualmente.

---

#### 22. Observabilidad y evidencia

`DELIV-PKG-017` sigue siendo propietario de señales, logs, métricas, trazas, alertas y auditoría.

Para 005, la evidencia mínima de una conciliación deberá permitir reconstruir:

1. paquete, candidato y ambiente;
2. unidad y ola;
3. sujeto conciliado;
4. fuente autoritativa;
5. contraparte;
6. identidad o correlación;
7. regla de comparación y versión;
8. instante o periodo evaluado;
9. resultado;
10. diferencia observada cuando exista;
11. responsable;
12. referencias de evidencia;
13. relación con control anti-duplicidad, recovery o incidente cuando aplique.

No se registran secretos completos, credenciales ni payloads sensibles por conveniencia de diagnóstico.

---

#### 23. Aplicabilidad al universo heredado

`CUTOVER-OPS-005` conserva las 207 raíces y las modalidades de piloto de `DELIV-PKG-022`:

| Modalidad heredada            | Cantidad | Tratamiento de conciliación                                                                                      |
| ----------------------------- | -------: | ---------------------------------------------------------------------------------------------------------------- |
| `PILOT-DIRECT-001`            |  **159** | evaluar todas las superficies de sus unidades efectivamente pilotadas que tengan regla de conciliación aplicable |
| `PILOT-SHARED-001`            |    **3** | conciliar mediante consumidores directos y contratos compartidos; no crear un piloto independiente               |
| `PILOT-CONTROL-001`           |   **27** | observar y conciliar únicamente las superficies gobernadas que el control deba verificar; no inventar mutaciones |
| AURA bloqueada                |   **14** | conservar el bloqueo; no ejecutar ni simular conciliaciones productivas                                          |
| dependencia externa bloqueada |    **2** | conservar el gate externo; no inventar contraparte o resultado                                                   |
| TALENTO fuera de línea actual |    **2** | mantener fuera de ejecución en esta línea                                                                        |

Reconciliación del universo:

```text
159 + 3 + 27 + 14 + 2 + 2 = 207
```

Esta tarea no reasigna `package_id`, perfil, modalidad, alcance ni estado heredado.

---

#### 24. Cobertura por unidad

Para toda instancia que llegue desde `CUTOVER-OPS-004`, el manifiesto deberá demostrar:

1. total de unidades recibidas;
2. total de unidades evaluadas;
3. total de superficies identificadas;
4. total con conciliación requerida;
5. total `NO_APLICA` con fundamento;
6. total `BLOQUEADA`;
7. ausencia de unidades huérfanas;
8. ausencia de superficies duplicadas por la misma identidad y regla;
9. trazabilidad de cada superficie a su fuente propietaria;
10. reconciliación exacta entre inventario de entrada y tratamiento de salida.

Una unidad sin superficie conciliable no se convierte artificialmente en una conciliación vacía; queda cubierta mediante `NO_APLICA` documentado.

---

#### 25. Condiciones de bloqueo

Una superficie queda `BLOQUEADA` cuando ocurra al menos una de estas condiciones:

1. no existe fuente autoritativa identificable;
2. dos fuentes reclaman autoridad sin precedencia resuelta;
3. falta identidad o correlación suficiente;
4. no existe contraparte identificable cuando el contrato exige comparación;
5. la regla de comparación no está materializada;
6. se necesitaría inventar tolerancia, rounding, timezone, equivalencia o ventana;
7. un resultado incierto no puede consultarse ni correlacionarse de forma segura;
8. falta evidencia u observabilidad obligatoria;
9. el control anti-duplicidad de 004 está bloqueado para la misma superficie;
10. la implementación física requerida no corresponde al candidato o ambiente;
11. la superficie depende de un gate todavía abierto;
12. conciliar exigiría ampliar alcance, permisos, cohorte, sede, rol, dato, dispositivo o ambiente;
13. la única forma disponible de “conciliar” sería modificar o borrar historia sin contrato aprobado.

Todo bloqueo conserva causa, insumo faltante, propietario canónico, fuente o tarea propietaria y condición verificable de salida.

---

#### 26. Invalidación y revalidación

`pilot_reconciliation_manifest::<package_id>` queda `INVALIDADA` cuando cambia materialmente:

- candidato;
- ambiente;
- alcance;
- ventana;
- unidad u ola;
- autoridad de `CUTOVER-OPS-003`;
- superficie o control de `CUTOVER-OPS-004`;
- fuente autoritativa;
- identidad o correlación;
- regla de comparación;
- contrato de integración;
- modelo de datos;
- estrategia de transición;
- rollout;
- recovery/rollback;
- observabilidad;
- requisito de prueba aplicable.

La revalidación parte de las fuentes vigentes. Una conciliación histórica permanece como evidencia de la revisión que realmente evaluó y no se reescribe para corresponder a una revisión posterior.

---

#### 27. Contenido mínimo del manifiesto

`pilot_reconciliation_manifest::<package_id>` deberá conservar como mínimo:

1. `package_id`;
2. `candidate_ref`;
3. `environment`;
4. `authorized_scope_ref`;
5. `cutover_window_ref`;
6. `activation_sequence_ref`;
7. `coexistence_manifest_ref`;
8. `duplicate_control_manifest_ref`;
9. total de unidades recibidas;
10. total de unidades evaluadas;
11. `activation_unit_ref`;
12. `wave_ref`;
13. `reconciliation_subject_ref`;
14. `authoritative_source_ref`;
15. `observed_counterpart_ref`;
16. `correlation_key_ref`;
17. `comparison_rule_ref`;
18. momento o trigger documental de conciliación;
19. referencias de requisitos y prueba ya vinculadas por el paquete;
20. referencias de observabilidad;
21. responsable;
22. espacio de resultado aplicable;
23. bloqueos, propietario y condición de salida;
24. revisión documental;
25. referencias de evidencia.

El manifiesto de planificación no almacena un resultado ejecutado inexistente.

---

#### 28. Relación con requisitos vigentes

005 reutiliza, según la superficie concreta y la matriz de `DELIV-PKG-016`, requisitos existentes que ya protegen:

- identidad estable, resultado recuperable, idempotencia y conciliación de trabajo reintentable;
- trazabilidad de intentos y efectos;
- captura única y resolución de fuentes competidoras;
- atomicidad o mecanismo idempotente y reconciliable para representaciones relacionadas;
- calidad, duplicados, frescura, backfills, reconciliación y linaje de datos;
- compatibilidad legacy y recuperación;
- contratos específicos de dominio vinculados a cada paquete.

La presencia de una referencia existente no significa que aplique a todas las raíces. Cada binding conserva únicamente los requisitos que `DELIV-PKG-016` y las fuentes propietarias vinculen a la superficie real.

---

#### 29. Handoff a `CUTOVER-OPS-006`

`CUTOVER-OPS-005` entrega a `CUTOVER-OPS-006`:

```text
UNIDADES Y OLAS VIGENTES
+
SUPERFICIES DE CONCILIACIÓN
+
FUENTE AUTORITATIVA Y CONTRAPARTE
+
IDENTIDAD / CORRELACIÓN
+
REGLA DE COMPARACIÓN
+
ESPACIO DE RESULTADOS
+
DIFERENCIAS NO RESUELTAS
+
RESULTADOS INCIERTOS
+
DUPLICIDADES CONFIRMADAS
+
BLOQUEOS Y EVIDENCIA
=
ENTRADAS TRAZABLES PARA DEFINIR CONTINUAR, PAUSAR O REVERTIR
```

005 no decide qué combinación de resultados autoriza continuar, obliga a pausar o exige revertir. Esa semántica pertenece exclusivamente a `CUTOVER-OPS-006`.

---

#### 30. Frontera con las tareas posteriores

Esta tarea no anticipa:

- `CUTOVER-OPS-006`: criterio de pausa, reversión o continuación;
- `CUTOVER-OPS-007`: registro de incidentes, decisiones y cambios de alcance;
- `CUTOVER-OPS-008`: métricas de tiempos, errores, adopción y resultado empresarial;
- `CUTOVER-OPS-009`: autoridad y criterio para aprobar salida del piloto o exigir correcciones;
- `CUTOVER-OPS-010`: condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutar retiro lógico o físico.

Una diferencia, incertidumbre o duplicidad puede convertirse en entrada de esas tareas, pero 005 no define sus umbrales, decisiones ni acciones.

---

#### 31. Separación entre planificación y ejecución

`CUTOVER-OPS-005` es exclusivamente documental.

No ejecuta:

- queries de conciliación;
- scripts de comparación;
- reintentos;
- correcciones;
- compensaciones;
- refunds;
- reversas;
- ajustes;
- restatements;
- escrituras;
- migraciones;
- DDL/DML;
- backfills;
- cambios de RLS;
- cambios de feature flags;
- despliegues;
- operaciones remotas;
- operaciones sobre Supabase.

La ejecución de cutover y piloto corresponde a `SHELL-CI-022::<package_id>` consumiendo los contratos aplicables. Las acciones correctivas pertenecen a sus fuentes técnicas y funcionales propietarias.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Fragmentos 04A afectados:** 0

**Justificación:** `CUTOVER-OPS-005` no introduce una nueva regla ejecutable, algoritmo de comparación, tolerancia, transición de estado empresarial, fuente de verdad, mecanismo de idempotencia, retry, compensación o recuperación. Materializa dentro de la frontera concreta del piloto cuándo y contra qué fuentes deberán aplicarse obligaciones de conciliación ya existentes y ya vinculadas a los paquetes. Cuando una fuente no define identidad, comparación, tolerancia o tratamiento suficiente, esta tarea bloquea la superficie en lugar de crear una semántica nueva.

---

#### 33. Criterios de aceptación documental

`CUTOVER-OPS-005` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-004 → CUTOVER-OPS-005 → CUTOVER-OPS-006`;
2. usa únicamente unidades, olas, operaciones, efectos y controles recibidos de las tareas anteriores;
3. define `pilot_reconciliation_surface`, `pilot_reconciliation_rule_binding`, `pilot_reconciliation_plan` y `pilot_reconciliation_manifest`;
4. toda superficie de conciliación identifica el mismo paquete, candidato, ambiente y alcance;
5. toda conciliación aplicable identifica fuente autoritativa;
6. toda conciliación aplicable identifica contraparte;
7. toda conciliación aplicable usa identidad o correlación estable;
8. toda conciliación aplicable referencia una regla vigente de comparación;
9. no se inventan tolerancias, ventanas, rounding, timezone o equivalencias;
10. no se elige fuente autoritativa por mayoría, recencia o conveniencia;
11. un resultado incierto no se presume exitoso ni fallido;
12. un resultado incierto no se reejecuta para intentar resolverlo;
13. una duplicidad confirmada nunca se clasifica como conciliada;
14. una diferencia esperada requiere contrato explícito y condición de convergencia;
15. una diferencia no resuelta conserva evidencia y propietario;
16. no se sobrescribe historia para ocultar divergencias;
17. eventos empresariales y eventos técnicos conservan identidades y semánticas distintas;
18. un retry conserva la identidad de la operación que su contrato exige;
19. Realtime, cache, UI, logs y métricas no adquieren autoridad por ser observables;
20. inventario, ledger y costos usan las reglas de atomicidad o conciliación ya aprobadas cuando aplican;
21. migraciones y backfills conservan procedencia e identidad cuando requieren conciliación;
22. offline y trabajo diferido preservan identidad a través de la reconexión;
23. conciliación manual no amplía autorización;
24. evidencia permite reconstruir fuente, contraparte, identidad, regla y resultado;
25. las 207 raíces conservan la distribución `159 + 3 + 27 + 14 + 2 + 2`;
26. todas las unidades recibidas quedan cubiertas mediante conciliación aplicable o `NO_APLICA` fundamentado;
27. todo bloqueo conserva causa, insumo, propietario y condición de salida;
28. cambios materiales invalidan el manifiesto y obligan a revalidar;
29. 006 recibe entradas de conciliación sin que 005 decida continuar, pausar o revertir;
30. 005 no registra incidentes, define métricas, aprueba salida ni retira legacy;
31. la ejecución física permanece en `SHELL-CI-022::<package_id>` y en las tareas técnicas propietarias;
32. no se ejecutan código, queries, scripts, despliegues, migraciones, DDL/DML, backfills, cambios de datos, configuración remota ni operaciones de Supabase;
33. se crean cero requisitos de prueba, se modifican cero requisitos de prueba y se afectan cero fragmentos 04A.

---

#### 34. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-004 — Diseñar controles contra doble registro y doble efecto durante la transición`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-005 — Definir conciliaciones durante el piloto`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-006 — Definir criterio de pausa, reversión o continuación`


### ✅ CUTOVER-OPS-006 — Definir criterio de pausa, reversión o continuación

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-005 — Definir conciliaciones durante el piloto
**Tarea siguiente:** CUTOVER-OPS-007 — Diseñar el registro de incidentes, decisiones y cambios de alcance
**Tipo de tarea:** documental — definición normativa y materialización, por paquete y checkpoint de piloto, del criterio determinista para decidir continuidad, pausa o reversión a partir de señales, riesgos, conciliaciones, controles anti-duplicidad, evidencia, rollout y rollback ya aprobados; sin ejecutar piloto, promoción, pausa física, kill switch, rollback, restore, compensación, corrección, cambios de alcance, despliegues, migraciones, DDL/DML, backfills, cambios de configuración, modificaciones de datos ni operaciones sobre Supabase
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>` y de completar los contratos CUTOVER aplicables

---

#### 1. Propósito

`CUTOVER-OPS-006` define cómo una instancia de piloto deberá resolver, en cada checkpoint aplicable, una de tres disposiciones operativas:

```text
CONTINUAR
PAUSAR
REVERTIR
```

La decisión se construye únicamente con evidencia y reglas ya aprobadas para el mismo paquete, candidato, ambiente, alcance, unidad y ola.

La tarea responde exclusivamente a estas preguntas:

```text
¿LA IDENTIDAD Y EL ALCANCE EVALUADOS SIGUEN SIENDO LOS AUTORIZADOS?
+
¿LAS SEÑALES, RIESGOS, CONTROLES, CONCILIACIONES Y EVIDENCIAS OBLIGATORIAS SIGUEN VIGENTES?
+
¿EXISTE UNA CONDICIÓN QUE BLOQUEA EXPANSIÓN PERO PERMITE MANTENER UN ESTADO SEGURO?
+
¿EXISTE UN DISPARADOR DE RECUPERACIÓN O ROLLBACK YA APROBADO QUE EXIGE RETIRAR EL CANDIDATO?
+
¿LA AUTORIDAD CORRECTA PUEDE EMITIR LA DECISIÓN CON EVIDENCIA?
=
CONTINUAR, PAUSAR O REVERTIR SIN INFERENCIAS
```

006 no crea nuevos umbrales, severidades, tolerancias, tiempos, RTO, RPO, SLO, métricas, autoridades ni mecanismos de recuperación.

---

#### 2. Resultado sustantivo

Por cada instancia aplicable de `package_id`, la tarea materializa cuatro piezas documentales:

1. `pilot_decision_input_set::<package_id>` — conjunto de entradas vigentes que deben evaluarse en el checkpoint;
2. `pilot_decision_rule_binding::<package_id>` — vínculo entre cada condición observable y su fuente propietaria, severidad, autoridad, tratamiento y evidencia;
3. `pilot_decision_evaluation::<package_id>` — evaluación reproducible que resuelve `CONTINUAR`, `PAUSAR` o `REVERTIR` cuando la instancia es evaluable;
4. `pilot_decision_manifest::<package_id>` — expediente consolidado de identidad, checkpoint, reglas aplicadas, evidencia, decisión, autoridad, bloqueos y handoff posterior.

Estas piezas diseñan la decisión futura. No afirman que un piloto haya sido ejecutado ni que una disposición haya ocurrido.

---

#### 3. Entradas obligatorias

006 consume, sin redefinirlas:

- `CUTOVER-OPS-001`: candidato, ambiente, alcance, ventana y responsables vigentes;
- `CUTOVER-OPS-002`: unidades, olas, dependencias y `continuation_gate_ref`;
- `CUTOVER-OPS-003`: convivencia, autoridad entre proceso anterior y objetivo, trabajo en curso y recovery;
- `CUTOVER-OPS-004`: operaciones, efectos, identidad estable, controles anti-duplicidad, resultados inciertos y evidencia;
- `CUTOVER-OPS-005`: superficies de conciliación, fuente autoritativa, contraparte, correlación, reglas y resultados;
- `READY-GATE-010`: soporte, responsables y escalamiento;
- `READY-GATE-011`: monitoreo, métricas, alertas y fuentes observables;
- `READY-GATE-012`: respaldo, restore, rollback y recuperación probados;
- `READY-GATE-013`: línea base previa al piloto;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`: decisión vigente de entrada al piloto;
- `DELIV-PKG-013`: umbrales y guardrails NFR aplicables;
- `DELIV-PKG-016`: requisitos y evidencia de prueba aplicables;
- `DELIV-PKG-017`: observabilidad, severidad, alertas, auditoría y propietarios;
- `DELIV-PKG-018`: default seguro, targeting, autoridad de activación/suspensión/desactivación y kill switch;
- `DELIV-PKG-019`: etapas, cohortes, pausas, promoción y gates de expansión;
- `DELIV-PKG-020`: disparadores, autoridad, objetivo seguro, procedimiento y conciliación de rollback/recovery;
- `DELIV-PKG-022`: modalidad, cohorte, alcance, duración y salvaguardas del piloto;
- `DELIV-PKG-023`: criterios de aceptación y evidencia que serán relevantes para el cierre, sin anticipar la salida del piloto.

Una entrada no vigente, contradictoria o correspondiente a otra revisión no se sustituye por una estimación local.

---

#### 4. Unidad mínima de decisión

La unidad mínima de `pilot_decision_evaluation` es:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
cutover_window_ref
+
activation_unit_ref
+
wave_ref
+
checkpoint_ref
```

Cuando una modalidad no tenga unidad u ola independiente, la decisión conserva la referencia de la raíz o consumidor que gobierna su exposición.

Dos evaluaciones con candidato, ambiente, alcance, unidad, ola o checkpoint distintos son decisiones diferentes y no pueden mezclarse para obtener un resultado agregado.

---

#### 5. Dos capas que no pueden confundirse

006 separa obligatoriamente:

| Capa                        | Valores                                                                       | Semántica                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `decision_evaluation_state` | `EVALUABLE`, `BLOQUEADA`, `INVALIDADA`, `NO_APLICA_DIRECTA`, `FUERA_DE_LINEA` | indica si existe base suficiente y vigente para emitir una disposición             |
| `operational_decision`      | `CONTINUAR`, `PAUSAR`, `REVERTIR`                                             | disposición que puede emitir la autoridad aplicable cuando la evaluación es válida |

Una evaluación `BLOQUEADA` o `INVALIDADA` no se convierte en `CONTINUAR`.

Si ya existe exposición activa y la evaluación queda `BLOQUEADA` o `INVALIDADA`, la disposición fail-closed es detener nueva expansión mediante `PAUSAR`, salvo que una regla propietaria de `DELIV-PKG-020` exija `REVERTIR`.

Para una raíz que nunca entró en exposición por bloqueo AURA, EXT o fuera de línea TALENTO, no se fabrica una pausa operativa inexistente.

---

#### 6. Principio de precedencia

La decisión sigue esta precedencia:

```text
IDENTIDAD Y VIGENCIA
→ DISPARADORES DE ROLLBACK/RECOVERY
→ CONDICIONES DE SUSPENSIÓN Y BLOQUEO
→ GATES DE CONTINUACIÓN/PROMOCIÓN
→ DECISIÓN EXPLÍCITA DE AUTORIDAD
```

Reglas:

1. una identidad inválida impide continuar;
2. un disparador aplicable de `DELIV-PKG-020` no se degrada a advertencia;
3. una condición que exige suspensión impide expansión mientras permanezca activa;
4. solo en ausencia de condiciones de reversión o pausa se evalúa continuidad;
5. la decisión no se obtiene por votación ni por mayoría de señales;
6. una señal de menor severidad no cancela una condición bloqueante;
7. la ausencia de observación no equivale a evidencia positiva.

---

#### 7. Criterio de `CONTINUAR`

`CONTINUAR` solo puede emitirse cuando todas las condiciones obligatorias aplicables al checkpoint sean verdaderas:

1. `package_id`, candidato, ambiente, alcance, ventana, unidad y ola corresponden a la misma instancia autorizada;
2. la autorización de entrada heredada de `READY-GATE-015` permanece vigente;
3. ningún cambio material invalidó los contratos de cutover aplicables;
4. los riesgos aceptados siguen dentro de alcance, vigencia y controles de `READY-GATE-014`;
5. ninguna condición de suspensión vigente está materializada;
6. las fuentes críticas de observabilidad requeridas por `READY-GATE-011` y `DELIV-PKG-017` están disponibles;
7. soporte, escalamiento y responsables requeridos permanecen disponibles cuando el checkpoint los necesita;
8. el control anti-duplicidad aplicable de `CUTOVER-OPS-004` no está bloqueado;
9. toda conciliación exigible para el checkpoint está `CONCILIADA` o, cuando el contrato lo permita expresamente, `DIFERENCIA_ESPERADA` dentro de su condición de convergencia;
10. no existe `DIFERENCIA_NO_RESUELTA`, `RESULTADO_INCIERTO` o `DUPLICIDAD_CONFIRMADA` pendiente que afecte la seguridad de la expansión;
11. no existe violación de seguridad, autorización, privacidad o integridad con tolerancia contractual cero;
12. no existe `OBS-P0`, `OBS-P1`, gap P0/P1, incompatibilidad crítica o bloqueo equivalente aplicable sin resolución;
13. los umbrales y guardrails NFR aplicables permanecen satisfechos;
14. el candidato conserva capacidad de retorno al default seguro y recovery conforme a sus contratos vigentes;
15. si el checkpoint implica ampliar exposición, se cumplen además todos los gates de promoción de `DELIV-PKG-019`;
16. la evidencia requerida es actual, atribuible y suficiente para la misma revisión;
17. la autoridad aplicable emite la decisión de forma explícita.

No existe continuidad automática por tiempo transcurrido, ausencia aparente de incidentes, baja utilización, silencio de alertas, finalización de una ventana o finalización de una ola.

---

#### 8. Degradaciones controladas

Una condición `OBS-P2` o `OBS-P3` no obliga por sí sola a pausar cuando el contrato NFR aplicable permite operación degradada controlada.

`CONTINUAR` en ese caso exige:

- que la degradación esté dentro de la condición permitida por su fuente;
- que no exista una condición de suspensión relacionada;
- que el riesgo y su vigencia permanezcan gobernados;
- que la observabilidad permita detectar empeoramiento;
- que exista responsable y tratamiento;
- que la decisión quede atribuida.

006 no redefine qué degradaciones son tolerables.

---

#### 9. Criterio de `PAUSAR`

`PAUSAR` significa detener toda nueva expansión, promoción, incorporación de unidad, actor, sede, dispositivo, tráfico o alcance mientras se conserva el estado seguro permitido por las fuentes propietarias.

Debe emitirse cuando no exista todavía una obligación confirmada de reversión y ocurra al menos una condición aplicable como:

1. `READY-GATE-014` materializa una condición de suspensión;
2. se pierde una fuente crítica necesaria para evaluar seguridad, integridad o continuidad;
3. una entrada obligatoria queda desactualizada, bloqueada o contradictoria;
4. un checkpoint no dispone de evidencia suficiente;
5. existe `DIFERENCIA_NO_RESUELTA`;
6. existe `RESULTADO_INCIERTO`;
7. existe `DUPLICIDAD_CONFIRMADA` mientras su disposición de recovery no haya sido determinada;
8. una conciliación obligatoria está bloqueada;
9. un control anti-duplicidad requerido está bloqueado o no puede demostrarse efectivo;
10. existe `OBS-P0`, `OBS-P1`, gap P0/P1 o incompatibilidad crítica que bloquea expansión;
11. existe una violación de tolerancia cero cuya disposición de rollback aún debe resolver la autoridad propietaria;
12. se detecta un cambio material de candidato, ambiente, alcance, cohorte, autorización, datos, contrato o configuración;
13. la autoridad requerida no está disponible o su identidad no puede resolverse;
14. el soporte o escalamiento obligatorio para el periodo deja de estar disponible;
15. la capacidad de recovery requerida deja de poder demostrarse vigente;
16. aparece un defecto que impide satisfacer el gate de continuación;
17. una condición de rollback se encuentra bajo evaluación y continuar aumentaría exposición antes de resolverla.

`PAUSAR` es fail-closed frente a evidencia insuficiente. No equivale a rollback ni a aceptación de la situación observada.

---

#### 10. Efectos de `PAUSAR`

Una pausa futura deberá producir documentalmente estos efectos:

1. congelar la cohorte y el alcance;
2. impedir la siguiente ola o promoción;
3. mantener la autoridad y fronteras de escritura vigentes;
4. preservar operaciones y efectos ya confirmados;
5. impedir retries ciegos sobre resultados inciertos;
6. conservar evidencia y correlación;
7. activar únicamente la contención o default seguro que la fuente propietaria autorice;
8. detener el cómputo de días activos del piloto cuando la pausa sea de seguridad bajo `DELIV-PKG-022`;
9. entregar la condición observada al propietario correspondiente;
10. exigir nueva evaluación antes de reanudar.

Una pausa no reinicia por sí sola la duración del piloto. Un cambio material de candidato, contrato, datos, autorización o cohorte sí obliga a una nueva ventana para el alcance cambiado conforme a `DELIV-PKG-022`.

---

#### 11. Reanudación después de una pausa

Eliminar la causa inmediata de una pausa no produce `CONTINUAR` automáticamente.

Para reanudar deberán demostrarse nuevamente:

- identidad y alcance vigentes;
- cierre o disposición válida de la condición que originó la pausa;
- restauración de señales y evidencia obligatorias;
- vigencia de riesgos aceptados y condiciones de suspensión;
- estado de conciliación requerido;
- capacidad de recovery aplicable;
- ausencia de disparador que exija reversión;
- autoridad explícita para continuar.

La reevaluación podrá limitarse a las fuentes afectadas únicamente cuando pueda demostrarse que las demás conservaron vigencia.

---

#### 12. Criterio de `REVERTIR`

`REVERTIR` significa activar el camino de rollback/recovery ya definido por `DELIV-PKG-020` para retirar o neutralizar de forma gobernada la exposición del candidato en el alcance afectado.

Solo puede emitirse cuando:

1. existe un disparador de `DELIV-PKG-020` aplicable y demostrado;
2. el disparador corresponde al mismo paquete, candidato, ambiente y alcance;
3. la fuente propietaria determina que mantener la exposición no es la disposición segura;
4. existe autoridad vigente para decidir el rollback/recovery aplicable;
5. el objetivo seguro o estado de recuperación está identificado;
6. el procedimiento aplicable es el vigente para esa revisión;
7. se conocen las fronteras entre contención, rollback técnico, rollback funcional, restore, compensation, correction y reconciliation;
8. la decisión conserva evidencia suficiente para iniciar la ejecución sin inventar pasos.

006 no ejecuta ninguno de esos mecanismos.

---

#### 13. Disparadores de reversión heredados

La evaluación deberá vincular, según aplicabilidad, los disparadores ya definidos en `DELIV-PKG-020`, entre ellos:

- violación de seguridad, autorización o integridad con tolerancia contractual cero;
- `OBS-P0`, `OBS-P1` o gap P0/P1 cuya contención requiera retirar el candidato;
- incumplimiento de un umbral NFR aprobado;
- incompatibilidad de contrato, runtime, dispositivo, migración, esquema o consumidor;
- drift de release, configuración, migración, RLS/grants, tipos o procedencia que invalide el candidato;
- conciliación fallida, duplicado material, estado empresarial incoherente o efecto externo desconocido que no pueda mantenerse expuesto con seguridad;
- pérdida o corrupción de datos;
- imposibilidad de demostrar un punto consistente recuperable;
- incapacidad de demostrar artefacto, versión o configuración efectiva;
- incumplimiento de objetivos de recuperación aprobados ante una interrupción real.

La presencia de una señal abre la evaluación conforme al contrato propietario; 006 no convierte una señal genérica en rollback automático si `DELIV-PKG-020` exige una clasificación adicional.

---

#### 14. Cuando existe disparador pero la reversión no es ejecutable

Si existe una condición que requiere evaluar reversión pero falta evidencia, autoridad, objetivo seguro o procedimiento ejecutable:

1. `CONTINUAR` queda prohibido;
2. la expansión se mantiene `PAUSAR`;
3. se conserva la condición como bloqueo crítico;
4. no se improvisa un rollback;
5. se activa el escalamiento ya aprobado;
6. la resolución operativa se entrega al propietario de `DELIV-PKG-020`;
7. el hecho y la decisión deberán quedar registrados por `CUTOVER-OPS-007` durante la ejecución real.

La incapacidad de ejecutar una reversión segura no transforma el riesgo en aceptable.

---

#### 15. Kill switch, contención y reversión

El kill switch de `DELIV-PKG-018` no equivale a rollback completo.

006 conserva estas fronteras:

| Mecanismo                  | Decisión relacionada                                                       | Límite                                                                                              |
| -------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| congelar cohorte           | `PAUSAR`                                                                   | impide expansión; no altera efectos ya confirmados                                                  |
| kill switch/default seguro | `PAUSAR` o parte de una disposición de recovery cuando la fuente lo ordene | detiene exposición nueva; no deshace datos ni efectos externos                                      |
| rollback técnico           | `REVERTIR`                                                                 | vuelve código, release, configuración, routing o contrato compatible; no restaura datos por sí solo |
| rollback funcional         | `REVERTIR`                                                                 | retira comportamiento nuevo; conserva historia de hechos confirmados                                |
| restore                    | `REVERTIR` cuando `DELIV-PKG-020` lo determine                             | exige aislamiento, compatibilidad, validación y reconciliación                                      |
| compensation/correction    | tratamiento posterior gobernado                                            | no borra el hecho original y exige resultado conocido y autoridad                                   |
| reconciliation             | soporte de decisión y cierre                                               | no es por sí sola una reversión                                                                     |

006 no transforma una pausa en borrado, compensación o restore.

---

#### 16. Tratamiento de resultados de conciliación

Los resultados de `CUTOVER-OPS-005` se consumen así:

| Resultado 005            | Tratamiento mínimo en 006                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `CONCILIADA`             | puede satisfacer la condición de conciliación aplicable                                            |
| `DIFERENCIA_ESPERADA`    | puede permitir continuidad únicamente dentro del contrato explícito y su condición de convergencia |
| `DIFERENCIA_NO_RESUELTA` | `PAUSAR`; `REVERTIR` si además satisface un disparador de 020                                      |
| `RESULTADO_INCIERTO`     | `PAUSAR`; no retry ciego; `REVERTIR` solo si 020 resuelve esa disposición                          |
| `DUPLICIDAD_CONFIRMADA`  | `PAUSAR`; nunca se normaliza; `REVERTIR` si la condición de 020 lo exige                           |
| `BLOQUEADA`              | `PAUSAR` durante exposición activa; sin continuidad                                                |
| `INVALIDADA`             | evaluación de 006 `INVALIDADA`; durante exposición activa se detiene expansión hasta revalidar     |
| `NO_APLICA`              | no crea un gate artificial de conciliación                                                         |

Una conciliación positiva no cancela una alerta, un riesgo, un defecto o un disparador de recovery independiente.

---

#### 17. Defectos detectados durante la ejecución

Cuando la ejecución real detecte un defecto:

1. se clasifica contra el gate y severidad propietarios;
2. la decisión de 006 no puede ignorarlo por falta de volumen;
3. si bloquea el checkpoint, se emite `PAUSAR` o `REVERTIR` conforme al contrato aplicable;
4. `CUTOVER-OPS-007` conservará el incidente y la decisión;
5. deberá materializarse una tarea de corrección exacta y un requisito de regresión antes de continuar o cerrar cuando el defecto lo exija;
6. 006 no inventa anticipadamente el identificador de esa tarea ni del requisito porque todavía no existe un defecto real observado.

La corrección no se considera cerrada hasta que su fuente propietaria produzca la evidencia exigida.

---

#### 18. Checkpoints obligatorios

`pilot_decision_evaluation` se ejecutará documentalmente en los puntos aplicables ya definidos por la secuencia:

1. antes de iniciar la primera unidad u ola;
2. antes de cada ola posterior;
3. después de la verificación inmediata que la ola exija;
4. cuando una señal materialice una condición de suspensión;
5. cuando aparezca un resultado incierto, diferencia no resuelta o duplicidad;
6. cuando se active una evaluación de rollback/recovery;
7. después de resolver una pausa y antes de reanudar;
8. antes de cualquier expansión o promoción gobernada por `DELIV-PKG-019`;
9. cuando un cambio material invalide las entradas anteriores.

No se define una frecuencia universal por minutos u horas.

---

#### 19. Matriz determinista de decisión

La evaluación sigue esta matriz:

| Condición agregada                                                                                           | Decisión                                                                                |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| trigger de 020 demostrado + disposición propietaria exige retiro + autoridad/objetivo/procedimiento vigentes | `REVERTIR`                                                                              |
| condición de suspensión o bloqueo activa, sin obligación confirmada de reversión                             | `PAUSAR`                                                                                |
| evaluación bloqueada o invalidada durante exposición activa                                                  | `PAUSAR`                                                                                |
| evidencia crítica ausente o fuente crítica no disponible                                                     | `PAUSAR`                                                                                |
| resultado incierto, diferencia no resuelta o duplicidad confirmada sin disposición de reversión cerrada      | `PAUSAR`                                                                                |
| todos los gates aplicables satisfechos + sin condición de pausa/reversión + autoridad explícita              | `CONTINUAR`                                                                             |
| raíz sin exposición directa por modalidad compartida/control                                                 | decisión derivada o de observación según la raíz gobernada; no se crea decisión directa |
| raíz bloqueada antes de exposición o fuera de línea                                                          | no se fabrica `CONTINUAR`, `PAUSAR` o `REVERTIR` ejecutados                             |

Cuando dos condiciones producen disposiciones distintas, `REVERTIR` prevalece sobre `PAUSAR` únicamente si la obligación de reversión ya está demostrada bajo `DELIV-PKG-020`. En cualquier otro conflicto no resuelto se conserva `PAUSAR` fail-closed.

---

#### 20. Autoridad de decisión

006 no crea un “comité de cutover” universal ni una autoridad nueva.

La autoridad se resuelve por operación:

- promoción o expansión: propietario `OWN-*` y responsable técnico exigidos por `DELIV-PKG-019`;
- activación, suspensión, desactivación o default seguro: autoridad definida por `DELIV-PKG-018` para el control aplicable;
- riesgo residual y condición de suspensión: autoridad ya vinculada por `READY-GATE-014`;
- rollback/recovery: autoridad funcional y técnica definida por `DELIV-PKG-020`;
- soporte y escalamiento: responsables confirmados por `READY-GATE-010`;
- decisión frente a señal operativa: propietario/routing definido por `DELIV-PKG-017`.

Si la segregación exige más de una autoridad, ninguna aprobación parcial se convierte en decisión válida.

Disponibilidad nominal no equivale a autoridad.

---

#### 21. Evidencia mínima de una decisión

Toda decisión futura deberá permitir reconstruir:

1. `package_id`;
2. candidato y revisión;
3. ambiente;
4. alcance autorizado;
5. ventana;
6. unidad y ola;
7. checkpoint;
8. estado de evaluación;
9. conjunto de entradas evaluadas;
10. reglas y versiones aplicadas;
11. señales relevantes;
12. riesgos y condiciones de suspensión aplicables;
13. resultados de conciliación aplicables;
14. controles anti-duplicidad aplicables;
15. disparadores de rollback evaluados;
16. gates de promoción evaluados cuando corresponda;
17. decisión emitida;
18. autoridad o autoridades;
19. momento efectivo;
20. justificación basada en evidencia;
21. referencias de evidencia;
22. bloqueos y condición de salida cuando existan.

Una captura aislada, una afirmación manual o el simple estado “verde” de un componente no sustituye el expediente.

---

#### 22. Duración del piloto y pausas

006 conserva `DUR-DIR-001` de `DELIV-PKG-022`:

- piloto directo: 14 días calendario activos y al menos un ciclo operativo completo;
- un día pausado por seguridad no cuenta como día activo;
- si el ciclo aplicable supera 14 días, se completa el primer ciclo íntegro iniciado bajo piloto;
- reinicios técnicos sin cambio de cohorte ni candidato no reinician el reloj;
- cambios materiales de candidato, contrato, datos, autorización o cohorte obligan a una nueva ventana para el alcance cambiado;
- completar la duración no equivale a aceptación ni promoción.

006 no usa la duración como autorización automática para `CONTINUAR`.

---

#### 23. Cohorte durante pausa o reversión

Cuando se active `PAUSAR` o `REVERTIR`:

- la cohorte queda congelada;
- no se agregan actores;
- no se agregan sedes;
- no se agregan dispositivos;
- no se agrega tráfico para compensar tiempo perdido;
- no se amplían datos ni permisos;
- los efectos reales ya confirmados se preservan;
- cualquier recuperación o conciliación se rige por `DELIV-PKG-020`.

La decisión no puede ampliar el alcance autorizado de `DELIV-PKG-022`.

---

#### 24. Aplicabilidad al universo heredado

006 conserva las 207 raíces y su modalidad de `DELIV-PKG-022`:

| Modalidad                     | Cantidad | Tratamiento 006                                                                                |
| ----------------------------- | -------: | ---------------------------------------------------------------------------------------------- |
| `PILOT-DIRECT-001`            |  **159** | evaluación directa por unidad/ola/checkpoint cuando la raíz haya entrado válidamente en piloto |
| `PILOT-SHARED-001`            |    **3** | decisión derivada de consumidores directos; no se crea exposición o checkpoint independiente   |
| `PILOT-CONTROL-001`           |   **27** | observa los pilotos gobernados y aporta señales/gates; no se fabrica una mutación propia       |
| AURA bloqueada                |   **14** | `BLOQUEADA`; sin decisión operativa ejecutada mientras persista el gate                        |
| dependencia externa bloqueada |    **2** | `BLOQUEADA`; sin decisión operativa ejecutada mientras persista `EXT-GOV-001`                  |
| TALENTO fuera de línea actual |    **2** | `FUERA_DE_LINEA`; sin decisión operativa en esta línea                                         |

Reconciliación:

```text
159 + 3 + 27 + 14 + 2 + 2 = 207
```

Las tres raíces compartidas siguen siendo `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`, conforme a `DELIV-PKG-022`.

La clasificación exacta de cada raíz se hereda de la matriz homónima de `DELIV-PKG-022`; 006 no crea una segunda clasificación ni reasigna identidades.

---

#### 25. Reglas para modalidades compartidas y de control

##### 25.1. `PILOT-SHARED-001`

- no posee reloj de piloto independiente;
- no recibe una ola artificial;
- se observa a través de consumidores directos compatibles;
- una condición propia del contrato compartido puede bloquear los consumidores afectados cuando su fuente así lo determine;
- la reanudación exige verificar nuevamente el contrato compartido y las raíces consumidoras afectadas.

##### 25.2. `PILOT-CONTROL-001`

- no posee exposición empresarial independiente por el solo hecho de observar;
- sus señales y gates pueden alimentar la decisión de las raíces gobernadas;
- no recibe rollback de deploy ficticio cuando no existe cambio físico propio;
- una condición bloqueante del control se aplica únicamente al alcance que su contrato gobierna;
- no adquiere autoridad sobre las raíces observadas por ser un control.

---

#### 26. AURA, EXT y TALENTO

##### 26.1. AURA

Las 14 raíces AURA permanecen bloqueadas. 006 no emite una decisión de continuación, pausa o reversión de una exposición que no está autorizada.

##### 26.2. EXT

Las 2 raíces condicionadas por `EXT-GOV-001` permanecen bloqueadas hasta cumplir su gate. No se inventan proveedor, credencial, callback, señal, rollback ni decisión operativa.

##### 26.3. TALENTO

Las 2 raíces TALENTO permanecen fuera de la línea actual. 006 conserva el contrato futuro sin simular piloto o recovery productivo.

---

#### 27. Cambios materiales e invalidación

`pilot_decision_manifest::<package_id>` queda `INVALIDADA` cuando cambia materialmente:

- candidato;
- commit, artefacto o release que define la revisión;
- ambiente;
- alcance;
- ventana;
- unidad u ola;
- cohorte;
- autoridad;
- contrato de convivencia;
- control anti-duplicidad;
- fuente o regla de conciliación;
- feature flag/configuración gobernada;
- señal o contrato de observabilidad;
- umbral/guardrail NFR;
- estrategia de rollout;
- disparador, objetivo o procedimiento de rollback/recovery;
- requisito de prueba aplicable.

La invalidación obliga a reevaluar con fuentes vigentes. No se reescribe una decisión histórica para aparentar que correspondía a otra revisión.

---

#### 28. Condiciones de bloqueo documental

La evaluación queda `BLOQUEADA` cuando:

1. falta una entrada obligatoria;
2. dos fuentes vigentes se contradicen sobre autoridad, alcance o tratamiento;
3. no puede demostrarse identidad del candidato;
4. no puede demostrarse el ambiente;
5. no puede demostrarse el alcance;
6. falta una señal crítica requerida;
7. falta una regla necesaria para clasificar una condición;
8. existe un disparador potencial de rollback sin evidencia suficiente para resolver su disposición;
9. la autoridad requerida no está identificada o disponible;
10. el objetivo seguro o procedimiento de recovery requerido no está materializado;
11. la conciliación necesaria está bloqueada;
12. continuar exigiría inventar un umbral, tolerancia, permiso, alcance o excepción.

Todo bloqueo conserva causa, insumo faltante, propietario canónico, fuente o tarea responsable y condición verificable de salida.

---

#### 29. Relación con `CUTOVER-OPS-007`

006 define qué información debe producir una evaluación, pero no diseña el registro operativo de incidentes y decisiones.

Durante la ejecución real, 007 será propietario del registro de:

- incidentes;
- decisiones de continuar, pausar o revertir;
- cambios de alcance;
- actores y timestamps;
- razones;
- evidencia;
- relación con acciones de corrección, recovery o regresión.

006 entrega a 007 la semántica de la decisión; 007 define su registro trazable.

---

#### 30. Frontera con `CUTOVER-OPS-008..010`

006 no anticipa:

- `CUTOVER-OPS-008`: definición de métricas de tiempos, errores, adopción y resultado empresarial;
- `CUTOVER-OPS-009`: autoridad y criterio para aprobar salida del piloto o exigir correcciones;
- `CUTOVER-OPS-010`: condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutar retiro lógico o físico.

En particular:

- `CONTINUAR` dentro del piloto no equivale a aprobar salida;
- completar 14 días activos no equivale a aprobar salida;
- una decisión de `REVERTIR` no define por sí sola el retiro futuro del proceso objetivo o del anterior;
- las métricas que 008 formalice no pueden aplicarse retroactivamente como umbrales inventados por 006.

---

#### 31. Handoff operativo

006 entrega a la ejecución futura y a 007:

```text
IDENTIDAD VIGENTE
+
CHECKPOINT
+
ENTRADAS Y REGLAS APLICABLES
+
SEÑALES Y RIESGOS
+
CONCILIACIONES Y CONTROLES
+
DISPARADORES DE ROLLBACK
+
GATES DE PROMOCIÓN
+
AUTORIDAD
+
DECISIÓN CONTINUAR / PAUSAR / REVERTIR
+
EVIDENCIA Y BLOQUEOS
=
DECISIÓN OPERATIVA TRAZABLE
```

`SHELL-CI-022::<package_id>` ejecutará el checklist y las acciones que correspondan. 006 no produce evidencia operativa anticipada.

---

#### 32. Separación entre planificación y ejecución

006 es exclusivamente documental.

No ejecuta:

- activación o desactivación real;
- promoción de cohortes;
- expansión de tráfico;
- pausa física;
- kill switch;
- rollback técnico o funcional;
- restore;
- recovery;
- compensación;
- corrección de datos;
- retry;
- conciliación;
- despliegues;
- migraciones;
- DDL/DML;
- backfills;
- cambios de RLS/grants;
- cambios de configuración remota;
- operaciones sobre Supabase.

Toda modificación futura de Supabase VENTO continúa perteneciendo a `vento-shell`.

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Fragmentos 04A afectados:** 0

**Justificación:** 006 no introduce un nuevo comportamiento empresarial, umbral, severidad, métrica, algoritmo de recovery, mecanismo de rollback, estado de dominio, autorización ni tolerancia. Materializa la precedencia y el binding operativo entre condiciones ya definidas por readiness, NFR, observabilidad, rollout, rollback, controles anti-duplicidad y conciliación. Las obligaciones de rollback independiente, evidencia reproducible, idempotencia, resultado recuperable, conciliación y control de fuentes competidoras ya están protegidas por requisitos vigentes y vinculadas por `DELIV-PKG-016`. Si una decisión necesitara un criterio no existente en esas fuentes, la evaluación queda bloqueada en vez de crear una regla por inferencia.

---

#### 34. Criterios de aceptación documental

`CUTOVER-OPS-006` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-005 → CUTOVER-OPS-006 → CUTOVER-OPS-007`;
2. materializa `pilot_decision_input_set`, `pilot_decision_rule_binding`, `pilot_decision_evaluation` y `pilot_decision_manifest`;
3. separa estado de evaluación de disposición operativa;
4. limita las disposiciones operativas a `CONTINUAR`, `PAUSAR` y `REVERTIR`;
5. define precedencia determinista entre reversión, pausa y continuidad;
6. `CONTINUAR` exige evidencia positiva y decisión explícita;
7. no existe continuidad automática por tiempo, silencio o ausencia aparente de incidentes;
8. `PAUSAR` congela expansión sin fingir rollback;
9. la pausa de seguridad no cuenta como día activo del piloto;
10. la reanudación después de pausa exige nueva evaluación;
11. `REVERTIR` consume únicamente disparadores y procedimientos vigentes de `DELIV-PKG-020`;
12. un disparador potencial sin recovery ejecutable prohíbe continuar y mantiene pausa/escalamiento;
13. kill switch, rollback técnico, rollback funcional, restore, compensation y reconciliation permanecen separados;
14. `DIFERENCIA_NO_RESUELTA`, `RESULTADO_INCIERTO` y `DUPLICIDAD_CONFIRMADA` no autorizan continuidad;
15. `DIFERENCIA_ESPERADA` solo puede permitir continuidad dentro de su contrato explícito;
16. `OBS-P0/P1`, gaps P0/P1 y tolerancias cero bloquean expansión conforme a sus fuentes;
17. `OBS-P2/P3` solo permiten continuidad si el contrato vigente permite degradación controlada;
18. riesgos aceptados no justifican continuidad después de materializarse una condición de suspensión;
19. pérdida de una fuente crítica no se interpreta como normalidad;
20. la autoridad se hereda de 018, 019, 020, readiness y 017 sin crear roles nuevos;
21. no se mezclan decisiones de paquetes, candidatos, ambientes, alcances, unidades, olas o checkpoints distintos;
22. la cohorte queda congelada durante pausa o reversión;
23. las 207 raíces conservan exactamente `159 + 3 + 27 + 14 + 2 + 2`;
24. las 3 raíces shared conservan `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`;
25. AURA, EXT y TALENTO conservan sus gates;
26. un cambio material invalida la evaluación anterior;
27. todo bloqueo conserva causa, propietario y condición de salida;
28. los defectos reales futuros se entregan a 007 y a una corrección/regresión exacta antes de continuar o cerrar cuando corresponda;
29. 007 recibe la semántica de decisión sin que 006 diseñe su registro;
30. 008 conserva propiedad de las métricas;
31. 009 conserva propiedad de la salida del piloto;
32. 010 conserva la propiedad de las condiciones, evidencia y decisión documental de elegibilidad para retiro del proceso anterior, sin ejecutar retiro lógico o físico;
33. la ejecución real permanece en `SHELL-CI-022::<package_id>`;
34. no se ejecutan código, despliegues, configuración remota, rollback, restore, conciliación, migraciones, DDL/DML, backfills, cambios de datos ni operaciones de Supabase;
35. se crean cero requisitos de prueba, se modifican cero requisitos de prueba y se afectan cero fragmentos 04A.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-005 — Definir conciliaciones durante el piloto`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-006 — Definir criterio de pausa, reversión o continuación`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-007 — Diseñar el registro de incidentes, decisiones y cambios de alcance`


### ✅ CUTOVER-OPS-007 — Diseñar el registro de incidentes, decisiones y cambios de alcance

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-006 — Definir criterio de pausa, reversión o continuación
**Tarea siguiente:** CUTOVER-OPS-008 — Definir métricas de tiempos, errores, adopción y resultado empresarial
**Tipo de tarea:** documental — diseño normativo y materialización completa del registro trazable que la ejecución futura del cutover y piloto utilizará para conservar incidentes, decisiones de continuar/pausar/revertir y cambios de alcance por paquete, candidato, ambiente, unidad, ola y checkpoint, preservando autoridad, cronología, evidencia, causalidad e historial sin ejecutar acciones operativas ni redefinir métricas, criterios de salida, rollback o retiro legacy
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>` y de los contratos CUTOVER aplicables

---

#### 1. Propósito

`CUTOVER-OPS-007` diseña el registro operativo que deberá conservar lo ocurrido y lo decidido durante la ejecución real del cutover y del piloto.

El registro debe responder de forma reproducible:

```text
¿QUÉ OCURRIÓ?
+
¿A QUÉ PAQUETE, CANDIDATO, AMBIENTE, ALCANCE, UNIDAD, OLA Y CHECKPOINT AFECTÓ?
+
¿QUIÉN LO DETECTÓ, REGISTRÓ, DECIDIÓ O AUTORIZÓ?
+
¿QUÉ EVIDENCIA EXISTE?
+
¿QUÉ DECISIÓN SE TOMÓ?
+
¿EL ALCANCE CAMBIÓ O PERMANECIÓ IGUAL?
+
¿QUÉ ACCIÓN, CORRECCIÓN, RECOVERY O REEVALUACIÓN QUEDÓ VINCULADA?
=
HISTORIAL OPERATIVO TRAZABLE SIN REESCRIBIR EL PASADO
```

La tarea diseña y materializa el contrato documental del registro. No inventa incidentes, decisiones ejecutadas, cambios de alcance, defectos, timestamps, actores ni evidencia que todavía no existan.

---

#### 2. Resultado sustantivo

El registro queda compuesto por una envolvente común y tres clases de entrada:

1. **entrada de incidente** — conserva el hecho observado, su clasificación, impacto, responsables, escalamiento, contención, recuperación y relación con decisiones;
2. **entrada de decisión** — conserva una decisión real `CONTINUAR`, `PAUSAR` o `REVERTIR` emitida bajo la semántica de `CUTOVER-OPS-006`;
3. **entrada de cambio de alcance** — conserva una solicitud, decisión de autoridad y efecto real sobre el alcance sin convertir el registro en fuente de autorización.

Todas las entradas pertenecen a una misma bitácora cronológica por `package_id` y mantienen referencias cruzadas cuando forman parte de la misma cadena causal.

El registro no reemplaza las fuentes propietarias de incidentes, autorización, rollout, rollback, riesgos, pruebas, métricas o alcance. Su función es preservar la secuencia de hechos y decisiones de la ejecución del piloto.

---

#### 3. Entradas canónicas obligatorias

007 consume sin redefinir:

- `CUTOVER-OPS-001`: candidato, ambiente, alcance, ventana y responsables;
- `CUTOVER-OPS-002`: unidades, olas, dependencias y checkpoints;
- `CUTOVER-OPS-003`: convivencia y autoridad entre proceso anterior y objetivo;
- `CUTOVER-OPS-004`: operaciones, efectos, controles anti-duplicidad y resultados inciertos;
- `CUTOVER-OPS-005`: conciliaciones, diferencias, duplicidades y evidencia;
- `CUTOVER-OPS-006`: estados de evaluación y decisiones `CONTINUAR`, `PAUSAR` y `REVERTIR`;
- `READY-GATE-010`: soporte, responsables y escalamiento;
- `READY-GATE-011`: observabilidad, señales, alertas y fuentes;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `DELIV-PKG-017`: severidad, señales, auditoría, propietarios y evidencia;
- `DELIV-PKG-018`: autoridad de activación, suspensión, desactivación y default seguro;
- `DELIV-PKG-019`: rollout, cohortes, pausas, promoción y evidencia;
- `DELIV-PKG-020`: disparadores, autoridad, objetivo y procedimiento de rollback/recovery;
- `DELIV-PKG-022`: modalidad, cohorte, alcance, duración y salvaguardas del piloto;
- `TREQ-CONT-002`: obligaciones vigentes de clasificación, responsables, decisiones, escalamiento, comunicaciones, contención, recuperación, autoridad y bitácora cronológica de incidentes.

007 no reabre una decisión de esas fuentes para simplificar el registro.

---

#### 4. Fronteras obligatorias

007 no define:

- una severidad nueva;
- un catálogo nuevo de incidentes;
- un workflow empresarial nuevo para incidentes;
- una autoridad nueva de suspensión, promoción o rollback;
- un permiso nuevo para ampliar el piloto;
- un umbral nuevo;
- una métrica nueva;
- un algoritmo de aceptación;
- un procedimiento técnico de rollback;
- una política nueva de retención;
- una regla de compensación o conciliación;
- una decisión de salida del piloto;
- una decisión documental de elegibilidad para retiro del proceso anterior, sin ejecutar dicho retiro.

Cuando una fuente propietaria no resuelve una de esas materias, el registro conserva el bloqueo o la referencia pendiente; no crea una regla por inferencia.

---

#### 5. Envolvente común de toda entrada

Toda entrada real del registro deberá conservar, cuando aplique:

| Campo lógico            | Regla                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `record_id`             | identidad estable de la entrada; no se reutiliza para otro hecho o decisión         |
| `record_type`           | distingue incidente, decisión o cambio de alcance                                   |
| `package_id`            | raíz canónica exacta                                                                |
| `candidate_ref`         | candidato o revisión realmente evaluados                                            |
| `environment`           | ambiente efectivo                                                                   |
| `authorized_scope_ref`  | alcance vigente al momento del hecho o decisión                                     |
| `cutover_window_ref`    | ventana aplicable                                                                   |
| `activation_unit_ref`   | unidad aplicable sin inventarla cuando la modalidad no la posee                     |
| `wave_ref`              | ola aplicable sin crear una ola artificial                                          |
| `checkpoint_ref`        | checkpoint de decisión o verificación cuando exista                                 |
| `occurred_at`           | momento del hecho cuando pueda determinarse                                         |
| `detected_at`           | momento de detección cuando corresponda                                             |
| `recorded_at`           | momento en que la entrada fue registrada                                            |
| `actor_ref`             | actor que observó o registró el hecho                                               |
| `authority_ref`         | autoridad de la decisión cuando corresponda                                         |
| `source_refs`           | fuentes operativas o canónicas que sustentan la entrada                             |
| `evidence_refs`         | referencias reproducibles de evidencia sin copiar secretos por conveniencia         |
| `caused_by_ref`         | entrada previa causal cuando exista                                                 |
| `related_record_refs`   | otras entradas relacionadas sin fusionar semánticas                                 |
| `supersedes_record_ref` | referencia a una entrada corregida o ampliada, sin borrar la original               |
| `summary`               | descripción suficiente para entender el hecho o decisión sin sustituir la evidencia |

Un campo no aplicable permanece no aplicable conforme a la modalidad heredada; no se rellena con un valor ficticio.

---

#### 6. Regla append-only e historial

La bitácora es append-only en sentido documental:

1. una entrada registrada no se reescribe para hacerla coincidir con información posterior;
2. una corrección crea una nueva entrada o revisión vinculada a la anterior;
3. el dato original permanece trazable;
4. una decisión posterior no borra la decisión anterior;
5. una reevaluación conserva el vínculo con la decisión que la precedió;
6. un cambio de alcance conserva el alcance anterior y el nuevo alcance autorizado;
7. una evidencia nueva complementa el historial sin convertir una observación pasada en otra distinta;
8. el orden cronológico debe poder reconstruirse aun cuando `occurred_at`, `detected_at` y `recorded_at` no sean iguales.

La bitácora no usa edición destructiva como mecanismo de corrección histórica.

---

#### 7. Separación entre hecho, riesgo, defecto, decisión y cambio de alcance

El registro no colapsa objetos distintos:

| Objeto                        | Tratamiento                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| riesgo aceptado               | antecedente gobernado por `READY-GATE-014`; no equivale a incidente                                                                   |
| incidente                     | hecho observado durante ejecución que requiere trazabilidad y tratamiento conforme a su fuente                                        |
| defecto                       | causa o falla de producto/proceso que puede originar corrección y regresión; no equivale por sí sola a toda la bitácora del incidente |
| decisión                      | disposición `CONTINUAR`, `PAUSAR` o `REVERTIR` emitida bajo 006                                                                       |
| cambio de alcance             | modificación solicitada o autorizada de la frontera del piloto; no equivale a una decisión de 006                                     |
| acción de recovery/corrección | ejecución gobernada por su fuente técnica o funcional y vinculada al registro mediante evidencia                                      |

Una misma situación puede tener entradas relacionadas de varios tipos, pero cada una conserva su semántica.

---

#### 8. Entrada de incidente

Toda entrada de incidente real deberá conservar como mínimo:

1. identidad común de la envolvente;
2. naturaleza conforme a la clasificación propietaria;
3. alcance afectado;
4. impacto observado;
5. urgencia cuando la fuente la exija;
6. severidad conforme a la fuente vigente;
7. momento y fuente de detección;
8. declaración o activación cuando aplique;
9. responsable y sustituto cuando la fuente lo exija;
10. escalamiento realizado;
11. comunicaciones operativas relevantes;
12. contención aplicada o referencia a ella;
13. estado operativo observado;
14. decisiones relacionadas;
15. recovery o recuperación relacionada;
16. desactivación o cierre cuando ocurra;
17. evidencia;
18. relaciones con otros expedientes que no deban fusionarse.

007 no redefine las categorías ni severidades de `TREQ-CONT-002`; las consume.

---

#### 9. Incidentes relacionados pero no intercambiables

Cuando un hecho tenga dimensión laboral, tecnológica, de seguridad de información o de continuidad:

- cada expediente propietario conserva su identidad;
- 007 puede relacionarlos mediante referencias;
- no se fusionan para ocultar responsabilidades distintas;
- un cierre en un expediente no cierra automáticamente los demás;
- la autoridad de activación o cierre se toma de la fuente propietaria;
- la relación causal debe poder reconstruirse sin duplicar el hecho como si fueran eventos independientes cuando no lo son.

---

#### 10. Entrada de decisión

Una entrada de decisión solo puede registrar una decisión emitida conforme a `CUTOVER-OPS-006`:

```text
CONTINUAR
PAUSAR
REVERTIR
```

Debe conservar:

1. referencia a la evaluación 006 correspondiente;
2. estado de evaluación que precedió la decisión;
3. paquete, candidato, ambiente, alcance, unidad, ola y checkpoint;
4. decisión emitida;
5. autoridad o autoridades requeridas;
6. motivo sustentado en reglas vigentes;
7. señales, riesgos, incidentes, conciliaciones o bloqueos relevantes;
8. evidencia utilizada;
9. momento efectivo;
10. alcance exacto al que aplica;
11. acción posterior o handoff cuando exista;
12. decisión anterior relacionada cuando la nueva decisión la supersede operativamente.

El registro no transforma silencio, tiempo transcurrido ni ausencia aparente de incidentes en `CONTINUAR`.

---

#### 11. Decisiones y acciones permanecen separadas

Registrar una decisión no demuestra que la acción correspondiente se ejecutó.

Por tanto:

- `PAUSAR` no demuestra que un flag, routing o cohorte haya cambiado;
- `REVERTIR` no demuestra que rollback, restore, recovery o compensation hayan terminado;
- `CONTINUAR` no demuestra que una siguiente ola haya comenzado;
- una acción física deberá conservar su propia evidencia y referencia a la decisión que la autorizó;
- el registro puede enlazar decisión y ejecución, pero no convertir una en evidencia de la otra.

---

#### 12. Entrada de cambio de alcance

Toda entrada de cambio de alcance deberá conservar:

1. alcance vigente antes del cambio;
2. dimensión o dimensiones cuya modificación se solicita;
3. razón de la solicitud;
4. solicitante;
5. momento de solicitud;
6. fuente o requisito que obliga o permite evaluar el cambio;
7. autoridad propietaria que debe resolverlo;
8. referencia a la decisión de autorización;
9. alcance autorizado resultante, únicamente cuando exista decisión válida;
10. momento efectivo, únicamente cuando el cambio haya entrado realmente en vigor;
11. unidades, olas, cohortes, actores, sedes, dispositivos, datos o superficies afectadas;
12. evaluaciones o artefactos que quedan invalidados;
13. nueva ventana o reevaluación requerida por las fuentes vigentes;
14. evidencia.

La solicitud de cambio no modifica por sí sola `authorized_scope_ref`.

---

#### 13. Cambio de alcance no autorizado

Si una solicitud no cuenta con autorización válida:

- el alcance efectivo permanece sin cambios;
- la solicitud queda registrada como hecho de gobierno, no como alcance nuevo;
- ninguna unidad, actor, sede, dispositivo, dato, superficie o tráfico se agrega por inferencia;
- si existió un intento de operar fuera del alcance, ese hecho se vincula al incidente o control propietario que corresponda;
- la ausencia de autoridad bloquea cualquier efecto del cambio.

007 no crea una excepción de autorización.

---

#### 14. Cambio material y reevaluación

Cuando una fuente vigente determine que el cambio es material:

1. la evaluación 006 previa para el alcance afectado deja de ser reutilizable como autorización de continuidad;
2. se registran las referencias de invalidación;
3. se ejecuta nuevamente el gate o evaluación que la fuente propietaria exija;
4. cuando `DELIV-PKG-022` lo ordene por cambio material de candidato, contrato, datos, autorización o cohorte, se inicia una nueva ventana para el alcance cambiado;
5. el historial anterior permanece válido como evidencia de lo que ocurrió bajo la revisión previa.

No se altera retroactivamente una decisión antigua para hacerla corresponder al nuevo alcance.

---

#### 15. Correlación causal mínima

El registro deberá poder representar cadenas como:

```text
INCIDENTE
→ DECISIÓN PAUSAR
→ CONTENCIÓN / DIAGNÓSTICO
→ CORRECCIÓN O RECOVERY
→ EVIDENCIA
→ REEVALUACIÓN 006
→ DECISIÓN CONTINUAR
```

o:

```text
INCIDENTE
→ DECISIÓN REVERTIR
→ ROLLBACK / RECOVERY 020
→ CONCILIACIÓN 005
→ EVIDENCIA
→ REEVALUACIÓN
```

o:

```text
SOLICITUD DE CAMBIO DE ALCANCE
→ DECISIÓN DE AUTORIDAD
→ INVALIDACIÓN DE EVALUACIÓN PREVIA
→ NUEVA VENTANA / REEVALUACIÓN CUANDO APLIQUE
→ DECISIÓN 006
```

Las flechas expresan correlación documental; no ejecutan acciones.

---

#### 16. Orden temporal

El registro distingue:

- momento del hecho;
- momento de detección;
- momento de registro;
- momento de decisión;
- momento efectivo de una acción o cambio cuando exista.

Reglas:

1. los timestamps reales no se fabrican cuando la fuente no los proporciona;
2. un registro tardío conserva el momento real conocido del hecho y el momento de registro;
3. eventos con igual timestamp deben seguir siendo distinguibles por su identidad y correlación;
4. la cronología no sustituye causalidad;
5. la causalidad no se presume únicamente por proximidad temporal;
6. correcciones de timestamp se documentan sin borrar el valor histórico.

---

#### 17. Autoridad y actor

El registro distingue:

- quien detecta;
- quien registra;
- quien ejecuta;
- quien decide;
- quien autoriza;
- quien escala;
- quien comunica;
- quien cierra cuando exista esa autoridad.

Una persona disponible no adquiere autoridad por aparecer en la bitácora.

Las autoridades se heredan de las fuentes vigentes: 017 para señales/routing, 018 para activación o suspensión, 019 para promoción, 020 para rollback/recovery, readiness para riesgos/soporte y 006 para la semántica de decisión.

---

#### 18. Evidencia y datos sensibles

Cada entrada deberá referenciar evidencia suficiente para que otra persona autorizada pueda reconstruir el hecho o decisión.

El registro:

- conserva referencias a logs, métricas, trazas, auditoría, tickets, manifiestos, resultados de prueba o evidencia operativa cuando sean aplicables;
- no copia secretos, tokens, credenciales o payloads sensibles completos por conveniencia;
- no usa datos personales como dimensión ordinaria cuando basta una referencia autorizada;
- conserva procedencia, versión y contexto de la evidencia;
- distingue evidencia observada de interpretación;
- no presenta una captura aislada como prueba suficiente cuando la fuente exige evidencia reproducible.

---

#### 19. Relación con controles anti-duplicidad y conciliación

007 consume resultados de 004 y 005 sin reinterpretarlos.

Cuando un incidente o decisión esté relacionado con:

- doble registro;
- doble efecto;
- resultado incierto;
- diferencia no resuelta;
- duplicidad confirmada;
- conciliación fallida;
- efecto externo desconocido;

el registro conserva la referencia exacta al control o conciliación que produjo la evidencia y a la decisión 006 resultante.

007 no corrige ni concilia datos.

---

#### 20. Defectos, corrección y regresión

Cuando durante la ejecución real se confirme un defecto:

1. el incidente conserva la observación y evidencia;
2. la decisión 006 conserva el tratamiento operativo;
3. la corrección se asigna a una tarea exacta mediante el flujo canónico correspondiente;
4. cuando el defecto exija protección de regresión, se materializa el requisito `TREQ-*` correspondiente en ese flujo;
5. el registro 007 conserva `correction_task_ref` y `regression_requirement_ref` una vez existan;
6. no se inventan anticipadamente esos identificadores;
7. no se continúa ni se cierra cuando la fuente propietaria exige corrección y regresión previas.

007 no crea requisitos de regresión para defectos hipotéticos.

---

#### 21. Cierre y reapertura de entradas

Cerrar un incidente o completar una decisión registrada no autoriza borrar el historial.

Cuando una fuente permita cierre o desactivación:

- se conserva autoridad;
- se conserva evidencia de recuperación;
- se conservan acciones pendientes;
- se conservan relaciones con conciliación y recovery;
- un pendiente obligatorio sin propietario impide presentar el expediente como resuelto;
- nueva evidencia material puede originar una nueva entrada relacionada sin reescribir la anterior.

La semántica exacta de estados de incidente pertenece a la fuente propietaria; 007 no crea un enum paralelo.

---

#### 22. Bloqueos documentales

Una entrada o relación queda documentalmente bloqueada cuando:

1. no puede resolverse `package_id`;
2. candidato o ambiente no pueden demostrarse;
3. falta la referencia de alcance necesaria;
4. una decisión carece de autoridad demostrable;
5. un cambio de alcance pretende ser efectivo sin autorización;
6. un incidente exige clasificación propietaria y esta no puede resolverse;
7. falta evidencia obligatoria;
8. dos fuentes vigentes se contradicen sobre la misma decisión o autoridad;
9. una relación causal se intenta afirmar sin evidencia;
10. se pretende cerrar un expediente con acciones obligatorias pendientes sin propietario.

Todo bloqueo conserva la fuente responsable y la condición verificable que permitirá resolverlo.

---

#### 23. Invalidación

Una entrada histórica no se invalida por haber ocurrido bajo una revisión anterior; permanece como evidencia histórica.

Lo que puede quedar invalidado para uso futuro es una evaluación, decisión reutilizable, alcance o referencia cuando cambie materialmente:

- candidato;
- ambiente;
- alcance;
- cohorte;
- autorización;
- contrato;
- datos;
- configuración;
- unidad u ola;
- estrategia de rollout;
- recovery/rollback;
- observabilidad;
- regla de conciliación;
- requisito aplicable.

La nueva entrada referencia el cambio y no modifica el pasado.

---

#### 24. Cobertura de las 207 raíces

El registro conserva el universo completo de `GAP-PKG-001..207` definido por `DELIV-PKG-022`.

La cobertura documental de 007 no significa que las 207 raíces tengan incidentes o decisiones ejecutadas. Significa que cada identidad tiene una decisión explícita de tratamiento para el registro:

- si existe un hecho real aplicable, se registra bajo su identidad exacta;
- si no existe hecho real, no se fabrica una fila operativa de incidente, decisión o cambio;
- modalidad, estado, alcance y gate se heredan de `DELIV-PKG-022`;
- 007 no crea un segundo inventario de modalidades.

| `package_id`  | Fuente de modalidad/alcance      | Tratamiento 007                                                                      | Estado documental 007 | Bloqueo/condición                                                                                       |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------- |
| `GAP-PKG-001` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-002` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-003` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-004` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-005` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-006` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-007` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-008` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-009` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-010` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-011` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-012` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-013` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-014` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-015` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-016` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-017` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-018` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-019` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-020` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-021` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-022` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-023` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-024` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-025` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-026` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-027` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-028` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-029` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-030` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-031` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-032` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-033` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-034` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-035` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-036` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-037` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-038` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-039` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-040` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-041` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-042` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-043` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-044` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-045` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-046` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-047` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-048` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-049` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-050` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-051` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-052` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-053` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-054` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-055` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-056` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-057` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-058` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-059` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-060` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-061` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-062` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-063` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-064` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-065` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-066` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-067` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-068` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-069` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-070` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-071` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-072` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-073` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-074` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-075` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-076` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-077` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-078` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-079` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-080` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-081` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-082` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-083` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-084` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-085` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-086` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-087` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-088` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-089` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-090` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-091` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-092` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-093` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-094` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-095` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-096` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-097` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-098` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-099` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-100` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-101` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-102` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-103` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-104` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-105` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-106` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-107` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-108` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-109` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-110` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-111` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-112` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-113` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-114` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-115` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-116` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-117` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-118` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-119` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-120` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-121` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-122` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-123` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-124` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-125` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-126` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-127` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-128` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-129` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-130` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-131` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-132` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-133` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-134` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-135` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-136` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-137` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-138` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-139` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-140` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-141` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-142` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-143` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-144` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-145` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-146` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-147` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-148` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-149` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-150` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-151` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-152` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-153` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-154` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-155` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-156` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-157` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-158` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-159` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-160` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-161` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-162` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-163` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-164` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-165` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-166` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-167` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-168` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-169` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-170` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-171` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-172` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-173` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-174` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-175` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-176` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-177` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-178` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-179` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-180` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-181` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-182` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-183` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-184` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-185` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-186` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-187` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-188` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-189` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-190` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-191` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-192` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-193` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-194` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-195` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-196` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-197` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-198` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-199` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-200` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-201` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-202` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-203` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-204` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-205` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-206` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |
| `GAP-PKG-207` | fila homónima de `DELIV-PKG-022` | incidente real, decisión de `CUTOVER-OPS-006` o cambio de alcance real cuando exista | `ESPECIFICADO`        | conservar modalidad, alcance, estado y gate heredados; 007 no los reclasifica ni crea eventos ficticios |

---

#### 25. Reconciliación cuantitativa

La materialización documental demuestra:

```text
PAQUETES ESPERADOS = 207
PAQUETES MATERIALIZADOS EN LA MATRIZ 007 = 207
IDENTIFICADORES ÚNICOS = 207
FALTANTES = 0
DUPLICADOS = 0
```

La distribución operativa heredada permanece:

```text
160 PILOT-DIRECT-001
+ 3 PILOT-SHARED-001
+ 26 PILOT-CONTROL-001
+ 14 AURA bloqueadas
+ 2 EXT bloqueadas
+ 2 TALENTO fuera de línea
= 207
```

Las tres raíces `PILOT-SHARED-001` permanecen `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`.

007 no reasigna ninguna raíz entre modalidades.

---

#### 26. Tratamiento por modalidad

##### 26.1. `PILOT-DIRECT-001`

Las 160 raíces directas registran hechos y decisiones bajo sus unidades, olas y checkpoints reales cuando lleguen válidamente a ejecución.

##### 26.2. `PILOT-SHARED-001`

Las 3 raíces compartidas:

- no reciben una cohorte humana propia;
- no reciben una ola artificial;
- relacionan hechos del contrato compartido con los consumidores directos afectados;
- conservan identidad propia de paquete;
- no duplican un incidente del consumidor como si hubiera ocurrido dos veces.

##### 26.3. `PILOT-CONTROL-001`

Las 26 raíces de control:

- pueden aportar señales, gates o hechos de control;
- no reciben una mutación empresarial ficticia;
- no reciben rollback de deploy ficticio cuando no existe cambio físico propio;
- conservan relación con las raíces gobernadas sin absorber su identidad.

##### 26.4. AURA, EXT y TALENTO

Las 14 AURA, 2 EXT y 2 TALENTO conservan sus gates. Mientras no exista exposición autorizada no se inventan incidentes de piloto, decisiones de ejecución ni cambios de alcance efectivos.

---

#### 27. Relación con duración y pausa

007 registra los hechos temporales necesarios para reconstruir una pausa, pero no calcula métricas nuevas.

Cuando exista una pausa de seguridad:

- se registra inicio y fin reales cuando estén disponibles;
- se referencia la decisión `PAUSAR`;
- se conserva la evidencia de reanudación;
- `DELIV-PKG-022` mantiene la regla de que ese día no cuenta como día activo del piloto;
- un cambio material que obligue a nueva ventana se registra con su referencia de alcance y reevaluación.

007 no decide por sí sola si la duración total ya satisface un criterio de salida.

---

#### 28. Handoff a `CUTOVER-OPS-008`

007 entrega a 008 hechos crudos y trazables, no KPIs calculados:

```text
PAQUETE / CANDIDATO / AMBIENTE / ALCANCE
+
TIMESTAMPS REALES DISPONIBLES
+
INCIDENTES Y CLASIFICACIÓN HEREDADA
+
DECISIONES 006
+
PAUSAS / REANUDACIONES / REVERSIÓN
+
CAMBIOS DE ALCANCE
+
EVIDENCIA Y CORRELACIÓN
=
FUENTE TRAZABLE PARA DEFINIR MÉTRICAS EN 008
```

008 podrá definir tiempos, errores, adopción y resultado empresarial sobre estas fuentes sin que 007 anticipe fórmulas, denominadores, umbrales o objetivos.

---

#### 29. Frontera con `CUTOVER-OPS-008..010`

007 no anticipa:

- `CUTOVER-OPS-008`: métricas de tiempos, errores, adopción y resultado empresarial;
- `CUTOVER-OPS-009`: autoridad y criterio para aprobar salida del piloto o exigir correcciones;
- `CUTOVER-OPS-010`: condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutar retiro lógico o físico.

Registrar una decisión `CONTINUAR` dentro del piloto no equivale a aprobar salida.

Registrar una reversión no decide el retiro definitivo de ningún proceso.

---

#### 30. Separación entre planificación y ejecución

007 es exclusivamente documental.

No ejecuta:

- creación de incidentes reales;
- decisiones operativas;
- cambios de alcance;
- activación o suspensión;
- promociones;
- kill switch;
- rollback;
- restore;
- recovery;
- compensation;
- conciliación;
- correcciones;
- despliegues;
- migraciones;
- DDL/DML;
- backfills;
- cambios de RLS/grants;
- configuración remota;
- operaciones sobre Supabase.

La ejecución real y captura de evidencia corresponden a `SHELL-CI-022::<package_id>` y a los sistemas o procedimientos propietarios que esa ejecución consuma.

---

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Fragmentos 04A afectados:** 0

**Justificación:** `CUTOVER-OPS-007` no introduce un comportamiento empresarial nuevo, una severidad, una transición operativa nueva, una autoridad, una regla de autorización, un umbral, una métrica ni un mecanismo de rollback. La clasificación, autoridad, cronología, decisiones, escalamiento, comunicaciones, contención y recuperación de incidentes ya están protegidas por `TREQ-CONT-002`; las decisiones `CONTINUAR`, `PAUSAR` y `REVERTIR` ya fueron materializadas por `CUTOVER-OPS-006`; rollout y rollback permanecen gobernados por `DELIV-PKG-019/020`. 007 diseña el registro correlacionado y append-only que conserva esos hechos. Un defecto real futuro que exija una protección de regresión deberá crear o modificar su requisito en el flujo de corrección concreto, no de forma hipotética en esta tarea.

---

#### 32. Criterios de aceptación documental

`CUTOVER-OPS-007` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-006 → CUTOVER-OPS-007 → CUTOVER-OPS-008`;
2. materializa una envolvente común para todas las entradas;
3. separa incidente, decisión y cambio de alcance;
4. cada entrada conserva identidad estable;
5. cada entrada se vincula al `package_id` exacto;
6. candidato, ambiente y alcance se conservan cuando aplican;
7. unidad, ola y checkpoint no se inventan para modalidades que no los poseen;
8. hecho, detección, registro, decisión y efecto pueden conservar timestamps distintos;
9. actor y autoridad permanecen separados;
10. la bitácora es append-only y las correcciones no borran historia;
11. los incidentes consumen la clasificación propietaria y no crean una severidad paralela;
12. expedientes laborales, tecnológicos, de seguridad y continuidad pueden relacionarse sin fusionarse;
13. decisiones operativas se limitan a las tres semánticas ya aprobadas por 006;
14. registrar una decisión no demuestra su ejecución física;
15. una solicitud de alcance no cambia el alcance efectivo;
16. un cambio solo queda efectivo con autoridad válida;
17. un cambio material invalida las evaluaciones que la fuente propietaria determine;
18. cuando 022 lo exige, el cambio material inicia una nueva ventana para el alcance cambiado;
19. la causalidad se expresa mediante referencias y no se presume por proximidad temporal;
20. evidencia observada se distingue de interpretación;
21. secretos, credenciales y payloads sensibles no se copian por conveniencia;
22. resultados de 004 y 005 se vinculan sin reinterpretarlos;
23. un defecto real conserva relación con corrección y requisito de regresión una vez materializados;
24. no se inventan identificadores de corrección ni TREQ para defectos hipotéticos;
25. el cierre de una entrada no borra decisiones, acciones ni evidencia previas;
26. todo bloqueo conserva fuente responsable y condición de salida;
27. las 207 raíces están materializadas exactamente una vez en la matriz de cobertura;
28. existen 207 identificadores únicos, 0 faltantes y 0 duplicados;
29. la distribución heredada `159 + 3 + 27 + 14 + 2 + 2 = 207` permanece intacta;
30. las raíces shared continúan siendo `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`;
31. AURA, EXT y TALENTO conservan sus gates;
32. 007 registra timestamps/fuentes para 008 sin definir métricas;
33. 008 conserva propiedad exclusiva de las métricas;
34. 009 conserva propiedad de la salida del piloto;
35. 010 conserva la propiedad de las condiciones, evidencia y decisión documental de elegibilidad para retiro del proceso anterior, sin ejecutar retiro lógico o físico;
36. la ejecución real permanece en `SHELL-CI-022::<package_id>`;
37. no se ejecutan código, despliegues, cambios de configuración, rollback, restore, conciliación, migraciones, DDL/DML, backfills, cambios de datos ni operaciones sobre Supabase;
38. se crean cero requisitos de prueba, se modifican cero requisitos de prueba y se afectan cero fragmentos 04A.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-006 — Definir criterio de pausa, reversión o continuación`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-007 — Diseñar el registro de incidentes, decisiones y cambios de alcance`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-008 — Definir métricas de tiempos, errores, adopción y resultado empresarial`


### ✅ CUTOVER-OPS-008 — Definir métricas de tiempos, errores, adopción y resultado empresarial

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-007 — Diseñar el registro de incidentes, decisiones y cambios de alcance
**Tarea siguiente:** CUTOVER-OPS-009 — Definir autoridad y criterio para aprobar salida del piloto o exigir correcciones
**Tipo de tarea:** documental — definición normativa y materialización del sistema de medición del cutover y piloto para tiempos, errores, adopción y resultado empresarial por paquete, candidato, ambiente, alcance y ventana comparable, con fórmulas reproducibles, denominadores explícitos, vínculo a línea base, reglas de calidad y segmentación, y tratamiento completo de las 207 raíces; sin ejecutar mediciones, inventar valores observados, crear umbrales de salida, aprobar la salida del piloto, promover paquetes ni retirar el proceso anterior
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>` y de los contratos CUTOVER aplicables

---

#### 1. Propósito

`CUTOVER-OPS-008` define cómo medir el comportamiento real del cutover y del piloto sin convertir una observación aislada, una métrica de vanidad o un agregado no comparable en evidencia de éxito.

La tarea responde:

```text
¿CUÁNTO TIEMPO TOMÓ Y EN QUÉ PARTE DEL FLUJO?
+
¿CUÁNTOS ERRORES OCURRIERON, SOBRE QUÉ DENOMINADOR Y CON QUÉ CLASIFICACIÓN?
+
¿QUÉ PARTE DEL ALCANCE ELEGIBLE UTILIZÓ EFECTIVAMENTE EL CAMINO CANDIDATO?
+
¿QUÉ RESULTADO EMPRESARIAL OBSERVABLE CAMBIÓ FRENTE A LA LÍNEA BASE COMPARABLE?
+
¿LA FUENTE, DEFINICIÓN, VENTANA, CALIDAD Y SEGMENTACIÓN PERMITEN COMPARAR?
=
EXPEDIENTE DE MÉTRICAS REPRODUCIBLE PARA LA DECISIÓN POSTERIOR
```

008 define métricas y reglas de cálculo. No afirma valores reales porque la ejecución todavía no ha ocurrido y no fija por sí sola el criterio de salida reservado a `CUTOVER-OPS-009`.

---

#### 2. Resultado sustantivo

Por cada `package_id`, 008 deja materializadas cinco piezas documentales:

1. **alcance de medición** — identidad exacta de paquete, candidato, ambiente, alcance autorizado, modalidad, ventana y baseline aplicables;
2. **catálogo de métricas** — métricas de tiempos, errores, adopción y resultado empresarial con fórmula, unidad, granularidad y fuentes;
3. **vínculo de comparabilidad** — relación de cada métrica comparable con `baseline_manifest::<package_id>` de `READY-GATE-013`;
4. **plan de medición** — fuentes, dimensiones, filtros, calidad, frescura, tratamiento de pausas, cambios materiales y datos faltantes;
5. **manifiesto de métricas** — estructura que la ejecución futura deberá completar con valores, evidencia y estado de calidad sin alterar la definición después de observar resultados.

Las cinco piezas son parte del mismo expediente y no crean una fuente paralela para señales ya gobernadas por `DELIV-PKG-017`, objetivos NFR de `DELIV-PKG-013` ni métricas empresariales ya gobernadas por el registro canónico de indicadores.

---

#### 3. Entradas canónicas obligatorias

008 consume sin redefinir:

- `CUTOVER-OPS-001`: candidato, ambiente, alcance, ventana y responsables;
- `CUTOVER-OPS-002`: unidades, olas y checkpoints;
- `CUTOVER-OPS-003`: autoridad temporal entre proceso anterior y objetivo;
- `CUTOVER-OPS-004`: controles anti-duplicidad y resultados inciertos;
- `CUTOVER-OPS-005`: conciliaciones, diferencias, duplicidades y evidencia;
- `CUTOVER-OPS-006`: evaluaciones y decisiones `CONTINUAR`, `PAUSAR` y `REVERTIR`;
- `CUTOVER-OPS-007`: timestamps reales, incidentes, decisiones, pausas, reanudaciones, reversión, cambios de alcance, evidencia y correlación;
- `DELIV-PKG-013`: umbrales NFR, hard ceilings, objetivos cuantitativos y fuentes de medición;
- `DELIV-PKG-017`: métricas, logs, trazas, alertas, auditoría, perfiles `TP-*`, propietarios y resultado empresarial observable;
- `DELIV-PKG-022`: modalidad, cohorte, actores, sedes, datos, dispositivos, ambiente y `DUR-DIR-001`;
- `DELIV-PKG-023`: criterios medibles de aceptación y tratamiento de defectos;
- `READY-GATE-011`: disponibilidad real de monitoreo, métricas, SLI/SLO, alertas y metamonitoreo;
- `READY-GATE-013`: línea base previa al piloto, definición, fuente, ventana, corte, segmentación, calidad y comparabilidad;
- `TREQ-DATA-002`, `TREQ-DATA-003` y `TREQ-DATA-005`: contrato canónico ya vigente para definición, cálculo, calidad, baseline, guardrails, comparación y uso decisional de métricas;
- `TREQ-CONT-002`: clasificación y cronología de incidentes.

Una métrica no puede obtener una definición más conveniente en 008 que la que ya posea en su fuente canónica.

---

#### 4. Fronteras obligatorias

008 no:

- crea una autorización de piloto;
- amplía cohorte, sede, dato, dispositivo, consumidor, proceso o ambiente;
- redefine severidades de incidentes;
- convierte un rechazo empresarial válido en error técnico por conveniencia;
- reduce hard ceilings o guardrails NFR;
- inventa un target empresarial no sustentado;
- promedia versiones o poblaciones no comparables;
- interpreta correlación como causalidad demostrada;
- decide `CONTINUAR`, `PAUSAR` o `REVERTIR`;
- aprueba salida del piloto;
- exige correcciones como decisión final de salida;
- promueve a `CANARY_5`, `LIMITED_25`, `LIMITED_50` o `FULL_100`;
- decide retiro legacy.

La autoridad y el criterio final para usar estas métricas en la salida pertenecen a `CUTOVER-OPS-009`.

---

#### 5. Contrato común de toda métrica

Toda definición materializada por 008 deberá conservar los campos exigidos por la semántica vigente de `TREQ-DATA-002`:

| Campo lógico            | Regla                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| nombre empresarial      | describe la señal sin depender del nombre de una tabla o dashboard                           |
| propósito de decisión   | explica qué pregunta del piloto ayuda a responder                                            |
| propietario             | referencia al propietario vigente de la métrica o al `OWN-*` aplicable; no crea un rol nuevo |
| fórmula                 | operación reproducible, sin cálculo local alternativo                                        |
| numerador               | explícito cuando la métrica sea una tasa o razón                                             |
| denominador             | explícito y elegible; no puede variar silenciosamente                                        |
| granularidad            | evento, operación, actor, consumidor, proceso, unidad, ola, día o periodo según definición   |
| dimensiones             | solo dimensiones aprobadas necesarias para interpretar el resultado                          |
| filtros                 | reglas que determinan inclusión y exclusión                                                  |
| unidad                  | segundos, minutos, horas, días, porcentaje, conteo, moneda, cantidad u otra unidad canónica  |
| zona horaria/calendario | los de la fuente y ventana aprobadas                                                         |
| fuente                  | telemetría, bitácora 007, conciliación 005, baseline 013 u otra fuente propietaria           |
| frescura                | condición bajo la cual el dato todavía representa la ventana evaluada                        |
| calidad                 | cobertura, completitud, duplicados, reconciliación y comparabilidad                          |
| versión                 | definición congelada para la ventana evaluada                                                |
| estado de certificación | no se presenta como certificado antes de evidencia válida                                    |
| drill-down              | referencia autorizada hasta hechos fuente sin exponer secretos                               |
| regla de comparación    | baseline, periodo y dimensiones comparables                                                  |
| target o guardrail      | referencia a una fuente aprobada; nunca número inventado por 008                             |

Una misma versión y contexto debe producir el mismo resultado independientemente de la vista que lo presente.

---

#### 6. Unidad de medición del piloto

Toda medición se vincula como mínimo a:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
pilot_modality
+
measurement_window
+
metric_definition_version
```

Cuando corresponda, agrega:

```text
activation_unit_ref
+
wave_ref
+
checkpoint_ref
+
baseline_manifest_ref
+
process_or_operation_ref
+
cohort_ref
```

Un valor agregado que mezcle candidatos, ambientes, alcances o definiciones distintas no es una medición válida de 008.

---

#### 7. Familia de tiempos

La familia de tiempos distingue tiempos operativos de cutover, tiempos de respuesta a incidentes y tiempos de producto ya gobernados por NFR.

##### 7.1. Tiempo activo de piloto

**Pregunta:** ¿cuánto tiempo válido de exposición ha transcurrido bajo la misma cohorte, candidato, alcance y definición?

```text
tiempo_activo_piloto
=
duración calificada como activa por DUR-DIR-001
```

Reglas:

- en modalidad directa, usa los días que `DELIV-PKG-022` califica como activos;
- un día pausado por seguridad no cuenta como día activo;
- un cambio material que obliga a nueva ventana no se mezcla con la ventana anterior;
- completar 14 días activos y un ciclo operativo es una condición heredada de 022, no una decisión de salida de 008;
- shared y control no crean un reloj directo: observan las ventanas de consumidores o pilotos gobernados;
- AURA, EXT y FUTURE no acumulan tiempo de piloto mientras permanezcan sin exposición autorizada.

##### 7.2. Tiempo de detección

Cuando `occurred_at` y `detected_at` de 007 sean comparables:

```text
tiempo_deteccion
=
detected_at - occurred_at
```

Si el momento del hecho no puede demostrarse, la métrica queda `NO_DISPONIBLE` para ese incidente; no se sustituye por cero.

##### 7.3. Tiempo de decisión

Cuando exista un evento causal que abre evaluación y una decisión 006 correlacionada:

```text
tiempo_decision
=
decision_at - evaluation_opened_at
```

La cercanía temporal sin vínculo causal no autoriza emparejar eventos.

##### 7.4. Tiempo de recuperación

Cuando exista una pausa, reversión o recovery real:

```text
tiempo_recuperacion
=
recovery_confirmed_at - recovery_started_at
```

Si no hubo recovery porque no existió disparador, el resultado es `NO_APLICA`, no `0`.

##### 7.5. Latencias funcionales y técnicas

Las latencias de interacción, navegación, foreground, async, sincronización y demás clases NFR conservan exactamente la fórmula, percentil, ventana y hard ceiling de `DELIV-PKG-013`.

008 las incorpora como guardrails diagnósticos y no crea un percentil nuevo para sustituir el aprobado.

---

#### 8. Familia de errores

La familia de errores evita usar un conteo bruto sin exposición.

##### 8.1. Tasa de error elegible

```text
tasa_error_elegible
=
errores_elegibles
/
intentos_elegibles
× 100
```

**Numerador:** resultados que la fuente propietaria clasifica como error para la operación, contrato, proceso o perfil correspondiente.

**Denominador:** intentos realmente elegibles y observados dentro del mismo paquete, candidato, ambiente, alcance, ventana, operación y definición.

Reglas:

1. un `deny` correcto de autorización no es error por el solo hecho de ser negativo;
2. una validación empresarial correctamente rechazada no es error técnico salvo que la fuente la clasifique así;
3. un retry correlacionado no se cuenta como una nueva operación lógica cuando el contrato de idempotencia conserva la misma identidad;
4. `SHADOW` no se mezcla con efectos productivos como si fuera exposición equivalente;
5. intentos fuera de cohorte no entran al denominador del piloto;
6. datos duplicados por instrumentación se corrigen en calidad, no se convierten en “más tráfico”;
7. un denominador cero produce `SIN_OBSERVACIONES`, no una tasa de 0 %.

##### 8.2. Incidentes por severidad

```text
incidentes_por_severidad
=
conteo de incidentes 007
agrupado por clasificación propietaria
```

Se conserva además el número de incidentes abiertos y cerrados sin que 008 redefina severidades.

##### 8.3. Defectos bloqueantes o mayores abiertos

008 consume el criterio vigente de `DELIV-PKG-023`:

```text
defectos_bloqueantes_o_mayores_abiertos
=
conteo de defectos aplicables aún abiertos
```

El guardrail heredado para cierre es `0`, pero la decisión de salida de piloto sigue perteneciendo a 009.

##### 8.4. Duplicidad, incertidumbre y conciliación

Como diagnósticos obligatorios cuando apliquen:

- duplicidades confirmadas de 004/005;
- resultados inciertos;
- conciliaciones fallidas;
- diferencias no resueltas;
- efectos externos desconocidos.

No se suman categorías incompatibles en una “tasa de error total” que oculte la naturaleza del riesgo.

---

#### 9. Familia de adopción

Adopción significa uso efectivo del camino candidato por la población o unidad elegible realmente expuesta; no significa mera disponibilidad de código, existencia de un flag ni pertenencia nominal a la cohorte.

##### 9.1. Unidad de adopción

La unidad se resuelve desde la modalidad y el perfil canónicos:

- actor o unidad operativa cuando el flujo directo sea ejercido por personas;
- proceso u operación cuando el resultado sea operacional y no tenga sentido medir personas;
- consumidor cuando se trate de integración o contrato;
- contrato compartido mediante sus consumidores directos;
- `NO_APLICA_DIRECTA` para controles sin exposición empresarial independiente.

No se fuerza una métrica “usuarios activos” a DB, integración, control o contrato compartido cuando esa unidad no representa su adopción real.

##### 9.2. Tasa de adopción elegible

Para una unidad de adopción válida:

```text
tasa_adopcion_elegible
=
unidades_elegibles_expuestas_con_al_menos_un_uso_candidato_exitoso
/
unidades_elegibles_realmente_expuestas
× 100
```

El denominador no es “todos los empleados”, “todos los clientes” ni “todos los usuarios potenciales”. Solo incluye unidades que la evidencia demuestra elegibles y realmente expuestas dentro del alcance autorizado.

Un denominador cero produce `SIN_OBSERVACIONES`.

##### 9.3. Participación de operaciones candidatas

Cuando el proceso pueda ejecutarse por más de un camino durante la convivencia y la población sea comparable:

```text
participacion_operaciones_candidatas
=
operaciones_logicas_exitosas_por_camino_candidato
/
operaciones_logicas_elegibles_exitosas_por_cualquier_camino_autorizado
× 100
```

No aplica si el contrato exige switch atómico sin caminos simultáneamente elegibles.

##### 9.4. Profundidad de uso

Como diagnóstico, cuando exista una unidad de adopción repetible:

```text
operaciones_candidatas_por_unidad_adoptante
=
operaciones_candidatas_exitosas
/
unidades_con_adopcion_confirmada
```

Esta métrica no sustituye la tasa de adopción y no se usa para compensar una cobertura baja con mucha actividad de pocos actores.

---

#### 10. Familia de resultado empresarial

008 no crea un “score de éxito” universal.

Cada paquete usa la métrica o indicador empresarial canónico que su expediente, proceso, baseline o señal de `DELIV-PKG-017` identifique como efecto empresarial observable. La definición debe conservar la versión de `TREQ-DATA-002`.

##### 10.1. Valor durante piloto

```text
valor_resultado_piloto
=
cálculo de la métrica empresarial canónica
sobre la población, periodo, dimensiones y filtros de la ventana de piloto
```

##### 10.2. Cambio absoluto frente a baseline

Cuando la comparación sea válida:

```text
cambio_absoluto
=
valor_resultado_piloto - valor_baseline_comparable
```

##### 10.3. Cambio relativo

Solo cuando el baseline sea distinto de cero y la definición permita una razón:

```text
cambio_relativo_pct
=
(valor_resultado_piloto - valor_baseline_comparable)
/
abs(valor_baseline_comparable)
× 100
```

Cuando el baseline sea cero, el cambio relativo queda `NO_APLICA`; se conserva el cambio absoluto u otra comparación autorizada por la definición canónica.

##### 10.4. Tipos de resultado

La métrica empresarial puede ser, según su fuente:

- tasa o proporción;
- duración;
- cantidad;
- valor monetario;
- estado o cumplimiento;
- calidad;
- productividad;
- volumen;
- otro indicador canónico ya versionado.

008 no transforma tipos distintos en un índice compuesto sin una fuente canónica que lo autorice.

---

#### 11. Vínculo obligatorio con línea base

Toda métrica que pretenda demostrar cambio debe vincularse con el elemento comparable de `baseline_manifest::<package_id>`.

La comparación exige conservar:

- misma definición o una regla explícita de compatibilidad entre versiones;
- misma unidad;
- mismo calendario y zona horaria;
- dimensiones comparables;
- población o regla de cobertura comparable;
- fuente o linaje compatible;
- corte previo a exposición;
- calidad suficiente;
- segmentación necesaria para no ocultar deterioros.

Una baseline `CERO_MEDIDO` es un cero real. `SIN_OBSERVACIONES`, `NO_DISPONIBLE`, `PROVISIONAL` y `RECONSTRUIDA` conservan exactamente la semántica de `READY-GATE-013`.

---

#### 12. Ventanas de medición

Se distinguen tres ventanas:

1. **baseline** — congelada por `READY-GATE-013`;
2. **exposición piloto** — intervalos en los que el alcance candidato estuvo efectivamente expuesto;
3. **respuesta operativa** — intervalos de incidente, pausa, reversión, recovery o conciliación que pueden extenderse fuera de la exposición normal.

No se mezclan:

- datos posteriores al cambio material con la ventana anterior;
- periodos pausados con exposición activa para métricas de adopción;
- datos de `SHADOW` con efectos productivos;
- consumidores fuera de alcance con la cohorte;
- staging/CI con producción salvo que una métrica sea explícitamente de readiness y no de piloto.

---

#### 13. Cambios materiales y versionado

Un cambio material de candidato, contrato, autorización, datos, cohorte, ambiente o alcance:

1. cierra la recolección de la definición/ventana anterior sin borrar su historia;
2. conserva los valores anteriores como evidencia del periodo previo;
3. invalida su reutilización cuando la fuente determine pérdida de comparabilidad;
4. exige nueva referencia de baseline cuando `READY-GATE-013` o 022 así lo requieran;
5. abre una nueva versión de medición para el alcance cambiado;
6. impide combinar ambos periodos como si fueran una sola experiencia homogénea.

El cambio de definición nunca se aplica retroactivamente a valores ya usados.

---

#### 14. Calidad y estados de dato

Para métricas de 008 se conservan estados distintos:

| Estado              | Semántica                                                                           |
| ------------------- | ----------------------------------------------------------------------------------- |
| `VALIDO`            | fuente, definición, población, ventana, calidad y comparabilidad suficientes        |
| `CERO_MEDIDO`       | la consulta válida produjo cero                                                     |
| `SIN_OBSERVACIONES` | el denominador o ventana aplicable no contiene observaciones suficientes            |
| `NO_DISPONIBLE`     | no existe dato confiable para calcular                                              |
| `PROVISIONAL`       | existe valor con limitación explícita aún aceptable solo donde su fuente lo permita |
| `RECONSTRUIDA`      | cálculo posterior desde historia autoritativa, identificado como reconstrucción     |
| `NO_APLICA`         | la modalidad o semántica demuestra que la métrica no corresponde                    |

`0`, `null`, ausencia, no disponible y no aplica no son equivalentes.

---

#### 15. Cobertura, duplicados y datos tardíos

Antes de presentar una métrica como válida se verifica:

- cobertura del periodo esperado;
- completitud de eventos requeridos;
- duplicados de telemetría;
- correlación de reintentos;
- eventos tardíos;
- orden cuando sea relevante;
- reconciliación con hechos autoritativos;
- cambios de esquema;
- calidad de dimensiones;
- exclusiones documentadas.

Un valor puede estar matemáticamente calculado y aun así quedar `NO_DISPONIBLE`, `PROVISIONAL` o bloqueado para decisión por calidad insuficiente.

---

#### 16. Segmentación obligatoria

La vista agregada debe permitir segmentar, únicamente cuando sea canónicamente aplicable, por:

- `package_id`;
- candidato o revisión;
- ambiente;
- alcance autorizado;
- modalidad;
- unidad;
- ola;
- checkpoint;
- proceso u operación;
- cohorte;
- sede;
- área;
- rol;
- dispositivo o clase de dispositivo;
- consumidor;
- severidad;
- camino anterior/objetivo cuando la convivencia lo permita.

No se introduce alta cardinalidad por persona en observabilidad agregada cuando no sea necesaria ni autorizada.

Un promedio global no puede ocultar un hard ceiling, una sede degradada, un consumidor incompatible o una cohorte con resultado materialmente peor.

---

#### 17. Propietarios y segregación

Toda métrica conserva:

- propietario de definición desde su fuente canónica;
- productor técnico de evidencia cuando corresponda;
- `OWN-*` de la raíz según `DELIV-PKG-017`;
- responsable operativo de cohorte cuando aplique;
- autoridad de incidentes o recovery únicamente para sus decisiones propietarias.

El productor del dato no se convierte automáticamente en autoridad de salida del piloto.

009 deberá consumir estas responsabilidades sin que 008 cree una autoridad nueva.

---

#### 18. Guardrails heredados

Las métricas de 008 deben presentarse junto con los guardrails aplicables de `DELIV-PKG-013` y `DELIV-PKG-023`.

Entre otros, cuando correspondan:

- hard ceilings de interacción, navegación, foreground, async y sincronización;
- cero efectos duplicados por retry;
- cero confirmaciones locales falsas;
- cero violaciones de privacidad definidas;
- cero incumplimientos críticos abiertos;
- `AC-NFR-001`;
- `AC-OBS-001`;
- `AC-PILOT-001`;
- `AC-ROLLBACK-001`;
- `AC-DEFECT-001`.

Una mejora de adopción o resultado empresarial no compensa un guardrail crítico incumplido.

---

#### 19. Relación con incidentes, defectos y decisiones

Cada valor o cambio relevante puede enlazar, cuando corresponda:

- incidente de 007;
- decisión 006;
- pausa o reanudación;
- reversión;
- recovery;
- diferencia/conciliación de 005;
- control anti-duplicidad de 004;
- defecto y corrección;
- requisito de regresión materializado después de un defecto real.

El cálculo no altera la bitácora append-only de 007.

---

#### 20. Pausas y reversión

Durante una pausa:

- el reloj activo se trata conforme a `DUR-DIR-001`;
- la adopción no incorpora exposición que no ocurrió;
- los errores e incidentes reales continúan en su cronología;
- el tiempo de recuperación puede seguir avanzando si el recovery está activo;
- una reanudación no borra la pausa;
- una reversión no convierte automáticamente métricas previas en inválidas: permanecen como historia de la ventana que efectivamente ocurrió.

---

#### 21. Métricas shared

Para `PILOT-SHARED-001`:

- no existe reloj humano propio;
- tiempos y errores se miden sobre el contrato compartido y las ventanas de consumidores directos;
- adopción se expresa como **consumo del contrato por consumidores directos elegibles**, no como actores ficticios;
- resultado empresarial se deriva de los consumidores afectados y conserva la identidad del contrato compartido;
- un mismo evento no se duplica para inflar métricas de raíz shared y consumidor;
- la observación termina cuando finalice la última ventana directa requerida por 022.

---

#### 22. Métricas de control

Para `PILOT-CONTROL-001`:

- no existe adopción empresarial directa;
- `adopción directa = NO_APLICA`;
- se conserva como diagnóstico la cobertura del control sobre los pilotos gobernados;
- tiempos se refieren a detección, evaluación, decisión o cobertura cuando la fuente los produzca;
- errores se refieren a fallos del control o a condiciones gobernadas sin duplicar el error de la raíz consumidora;
- resultado empresarial directo es `NO_APLICA` cuando el control no produce un efecto empresarial independiente;
- cuando el control gobierna un resultado de consumidores, la evidencia se deriva con referencia a esas raíces, sin apropiarse del resultado.

Los cuatro controles con identidad física pendiente continúan bloqueados conforme a 022.

---

#### 23. AURA, EXT y TALENTO

##### 23.1. AURA

Las 14 raíces AURA permanecen `BLOQUEADO_AURA`. No se fabrican baseline productiva, exposición, adopción, errores de piloto ni resultado empresarial observado.

##### 23.2. Dependencias externas

`GAP-PKG-027` y `GAP-PKG-157` permanecen `BLOQUEADO_EXT_GOV_001`. No se mide piloto externo hasta que exista activación formal y alcance ejecutable.

##### 23.3. TALENTO

`GAP-PKG-064` y `GAP-PKG-197` permanecen `FUERA_DE_LINEA_ACTUAL`. Sus métricas de piloto quedan fuera de línea, no en cero.

---

#### 24. Matriz materializada de las 207 raíces

La matriz conserva exactamente la modalidad y el estado de `DELIV-PKG-022` y añade una decisión explícita de aplicabilidad por familia de métricas.

Semántica:

- `DIRECTA`: la familia se calcula sobre exposición propia válida;
- `DIRECTA_CON_BASELINE`: se calcula sobre el resultado empresarial canónico y baseline comparable;
- `DERIVADA_CONSUMIDORES`: se obtiene desde consumidores directos sin duplicar hechos;
- `CONSUMO_CONTRATO`: adopción como consumo del contrato shared;
- `COBERTURA_GOBERNADA`: tiempos de los pilotos o decisiones que el control gobierna;
- `CONTROL_GOBERNADO`: errores o fallos de control sin duplicar errores de consumidores;
- `DERIVADA_ALCANCE_GOBERNADO`: resultado empresarial únicamente mediante las raíces gobernadas;
- `NO_APLICA_DIRECTA`: no existe adopción o resultado empresarial independiente;
- `BLOQUEADA`: no se fabrican valores mientras persiste el gate;
- `FUERA_DE_LINEA`: no existe medición de piloto en la línea actual.

| `package_id`  | Modalidad 022          | Alcance   | Estado heredado                    | Tiempos                 | Errores                 | Adopción            | Resultado empresarial        | Estado 008       |
| ------------- | ---------------------- | --------- | ---------------------------------- | ----------------------- | ----------------------- | ------------------- | ---------------------------- | ---------------- |
| `GAP-PKG-001` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-002` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-003` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_BLOQUEADO_014`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-004` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-005` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-006` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-007` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-008` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-009` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-010` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-011` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-012` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-013` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-014` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-015` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-016` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-017` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-018` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-019` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-020` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-021` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-022` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-023` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-024` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-025` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-026` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-027` | `PILOT-BLOCK-EXT-001`  | `EXT`     | `BLOQUEADO_EXT_GOV_001`            | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-028` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-029` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-030` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-031` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-032` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-033` | `PILOT-SHARED-001`     | `SHARED`  | `SIN_PILOTO_DIRECTO_BLOQUEADO_014` | `DERIVADA_CONSUMIDORES` | `DERIVADA_CONSUMIDORES` | `CONSUMO_CONTRATO`  | `DERIVADA_CONSUMIDORES`      | `ESPECIFICADO`   |
| `GAP-PKG-034` | `PILOT-SHARED-001`     | `SHARED`  | `SIN_PILOTO_DIRECTO_BLOQUEADO_014` | `DERIVADA_CONSUMIDORES` | `DERIVADA_CONSUMIDORES` | `CONSUMO_CONTRATO`  | `DERIVADA_CONSUMIDORES`      | `ESPECIFICADO`   |
| `GAP-PKG-035` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-036` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-037` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-038` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-039` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-040` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-041` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-042` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-043` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-044` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-045` | `PILOT-SHARED-001`     | `SHARED`  | `SIN_PILOTO_DIRECTO_BLOQUEADO_014` | `DERIVADA_CONSUMIDORES` | `DERIVADA_CONSUMIDORES` | `CONSUMO_CONTRATO`  | `DERIVADA_CONSUMIDORES`      | `ESPECIFICADO`   |
| `GAP-PKG-046` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-047` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-048` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-049` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-050` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-051` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-052` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-053` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-054` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-055` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-056` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-057` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-058` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-059` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-060` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-061` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-062` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_BLOQUEADO_014`            | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-063` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-064` | `PILOT-FUTURE-001`     | `FUTURE`  | `FUERA_DE_LINEA_ACTUAL`            | `FUERA_DE_LINEA`        | `FUERA_DE_LINEA`        | `FUERA_DE_LINEA`    | `FUERA_DE_LINEA`             | `FUERA_DE_LINEA` |
| `GAP-PKG-065` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_BLOQUEADO_014`            | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-066` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-067` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-068` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-069` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-070` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-071` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-072` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-073` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-074` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-075` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-076` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-077` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-078` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-079` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-080` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-081` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-082` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-083` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-084` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-085` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-086` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-087` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-088` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-089` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-090` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-091` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-092` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-093` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-094` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-095` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-096` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-097` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-098` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-099` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-100` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-101` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-102` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-103` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-104` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-105` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-106` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-107` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-108` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-109` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-110` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-111` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-112` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-113` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-114` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-115` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-116` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-117` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-118` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-119` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-120` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-121` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-122` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-123` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-124` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-125` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-126` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-127` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-128` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-129` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-130` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-131` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-132` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-133` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-134` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-135` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-136` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-137` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-138` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-139` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-140` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_BLOQUEADO_014`            | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-141` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-142` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-143` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-144` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-145` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-146` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-147` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-148` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-149` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-150` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-151` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-152` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-153` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-154` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-155` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-156` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-157` | `PILOT-BLOCK-EXT-001`  | `EXT`     | `BLOQUEADO_EXT_GOV_001`            | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-158` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-159` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-160` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-161` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-162` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-163` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-164` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-165` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-166` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-167` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-168` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-169` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-170` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-171` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-172` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_BLOQUEADO_014`            | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-173` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-174` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-175` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-176` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-177` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-178` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-179` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-180` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-181` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-182` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-183` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-184` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-185` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-186` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-187` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-188` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-189` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-190` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-191` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-192` | `PILOT-BLOCK-AURA-001` | `AURA`    | `BLOQUEADO_AURA`                   | `BLOQUEADA`             | `BLOQUEADA`             | `BLOQUEADA`         | `BLOQUEADA`                  | `BLOQUEADO`      |
| `GAP-PKG-193` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-194` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-195` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-196` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-197` | `PILOT-FUTURE-001`     | `FUTURE`  | `FUERA_DE_LINEA_ACTUAL`            | `FUERA_DE_LINEA`        | `FUERA_DE_LINEA`        | `FUERA_DE_LINEA`    | `FUERA_DE_LINEA`             | `FUERA_DE_LINEA` |
| `GAP-PKG-198` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-199` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-200` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |
| `GAP-PKG-201` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-202` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-203` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-204` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-205` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-206` | `PILOT-DIRECT-001`     | `DIR`     | `ESPECIFICADO_BLOQUEADO_014`       | `DIRECTA`               | `DIRECTA`               | `DIRECTA`           | `DIRECTA_CON_BASELINE`       | `ESPECIFICADO`   |
| `GAP-PKG-207` | `PILOT-CONTROL-001`    | `CONTROL` | `OBSERVE_SIN_DEPLOY_DIRECTO`       | `COBERTURA_GOBERNADA`   | `CONTROL_GOBERNADO`     | `NO_APLICA_DIRECTA` | `DERIVADA_ALCANCE_GOBERNADO` | `ESPECIFICADO`   |

---

#### 25. Reconciliación cuantitativa

```text
RAÍCES ESPERADAS = 207
RAÍCES MATERIALIZADAS = 207
IDENTIFICADORES ÚNICOS = 207
FALTANTES = 0
DUPLICADOS = 0

160 PILOT-DIRECT-001
+ 3 PILOT-SHARED-001
+ 26 PILOT-CONTROL-001
+ 14 PILOT-BLOCK-AURA-001
+ 2 PILOT-BLOCK-EXT-001
+ 2 PILOT-FUTURE-001
= 207
```

Dentro de control:

```text
22 OBSERVE_SIN_DEPLOY_DIRECTO
+ 4 OBSERVE_BLOQUEADO_014
= 26
```

Las tres raíces shared siguen siendo `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`.

Los cuatro controles con gate físico abierto pendiente siguen siendo `GAP-PKG-062`, `GAP-PKG-065`, `GAP-PKG-140` y `GAP-PKG-172`.

---

#### 26. Manifiesto futuro de métricas

La ejecución posterior deberá poder completar, por métrica aplicable:

- `package_id`;
- candidato;
- ambiente;
- alcance;
- modalidad;
- definición/version de métrica;
- propósito;
- propietario;
- fórmula;
- numerador y denominador cuando apliquen;
- unidad;
- granularidad;
- dimensiones y filtros;
- ventana;
- baseline de comparación;
- fuente;
- valor observado;
- estado de calidad;
- cobertura;
- frescura;
- comparabilidad;
- target/guardrail de fuente cuando exista;
- evidencia;
- incidentes/decisiones relacionados;
- cambios materiales;
- observaciones de interpretación.

Un manifiesto sin valor real durante esta fase no se presenta como evidencia ejecutada.

---

#### 27. Reglas contra métricas engañosas

Queda prohibido interpretar como éxito:

1. código desplegado sin uso efectivo;
2. flag habilitado sin exposición;
3. número bruto de eventos sin denominador;
4. porcentaje con denominador cambiante;
5. promedio que oculta hard ceiling o segmento crítico;
6. ausencia de incidentes cuando la telemetría está incompleta;
7. cero calculado a partir de datos ausentes;
8. adopción calculada sobre población no elegible;
9. actividad de pocos usuarios como sustituto de cobertura;
10. resultado empresarial comparado con baseline contaminada;
11. mejora empresarial que ignora guardrails críticos;
12. cambio de definición aplicado retroactivamente;
13. datos de staging presentados como resultado productivo;
14. una correlación temporal presentada como causa demostrada;
15. valores de ventanas distintas agregados después de un cambio material.

---

#### 28. Handoff a `CUTOVER-OPS-009`

008 entrega a 009, por paquete y ventana válida:

```text
IDENTIDAD DE PAQUETE / CANDIDATO / AMBIENTE / ALCANCE
+
MODALIDAD Y VENTANA
+
DEFINICIONES VERSIONADAS
+
VALORES FUTUROS DE TIEMPOS
+
VALORES FUTUROS DE ERRORES
+
VALORES FUTUROS DE ADOPCIÓN
+
RESULTADO EMPRESARIAL Y DELTA CONTRA BASELINE
+
GUARDRAILS Y NFR HEREDADOS
+
CALIDAD / COBERTURA / COMPARABILIDAD
+
INCIDENTES / DECISIONES / CAMBIOS DE ALCANCE
+
EVIDENCIA
=
EXPEDIENTE DE MEDICIÓN PARA LA DECISIÓN DE SALIDA
```

009 es propietario de:

- quién puede aprobar la salida;
- qué combinación de evidencia permite aprobar;
- qué condición obliga a exigir correcciones;
- cómo se trata una métrica sin target de salida explícito;
- qué evidencia adicional es necesaria antes de decidir.

008 no emite `APROBAR_SALIDA`, `EXIGIR_CORRECCIONES` ni equivalente.

---

#### 29. Frontera con `CUTOVER-OPS-009` y `CUTOVER-OPS-010`

- `CUTOVER-OPS-009` define autoridad y criterio de salida del piloto o correcciones.
- `CUTOVER-OPS-010` define condiciones, evidencia y decisión documental de elegibilidad para retirar el proceso anterior, sin ejecutar retiro lógico o físico.

Una métrica favorable no retira legacy.

Un piloto con 14 días activos cumplidos no aprueba salida automáticamente.

Un resultado empresarial mejor no permite ignorar defectos, seguridad, integridad, NFR, observabilidad o conciliación.

---

#### 30. Separación entre planificación y ejecución

008 es exclusivamente documental.

No ejecuta:

- instrumentación;
- consultas productivas;
- dashboards;
- alertas;
- creación de datos;
- activación de flags;
- cambios de cohorte;
- promociones;
- rollback;
- recovery;
- compensaciones;
- conciliaciones;
- correcciones;
- despliegues;
- migraciones;
- DDL/DML;
- backfills;
- cambios de RLS/grants;
- cambios remotos;
- operaciones sobre Supabase.

La captura real y el cálculo con evidencia ocurrirán durante la ejecución autorizada de `SHELL-CI-022::<package_id>` utilizando las fuentes materializadas por readiness y observabilidad.

---

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Fragmentos 04A afectados:** 0

**Requisitos existentes consumidos:** `TREQ-DATA-002`, `TREQ-DATA-003`, `TREQ-DATA-005`, `TREQ-CONT-002`.

**Justificación:** 008 materializa fórmulas, denominadores, granularidad, dimensiones, baseline, calidad, comparabilidad y uso decisional del piloto dentro de obligaciones ya registradas. `TREQ-DATA-002` protege expresamente la definición versionada de toda métrica, su fórmula, numerador, denominador, granularidad, dimensiones, filtros, unidad, fuente y comparación; `TREQ-DATA-003` protege calidad, cobertura, duplicados, datos tardíos, reconciliación y linaje; `TREQ-DATA-005` protege baseline, target, métrica principal, drivers, guardrails, ventana, segmentos, resultado y cambios de definición. 008 no modifica esas reglas ni introduce un comportamiento runtime nuevo que requiera una fila adicional.

---

#### 32. Criterios de aceptación documental

`CUTOVER-OPS-008` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-007 → CUTOVER-OPS-008 → CUTOVER-OPS-009`;
2. define un contrato común compatible con `TREQ-DATA-002`;
3. toda métrica tiene propósito de decisión, propietario, fórmula, granularidad, fuente y versión;
4. toda tasa tiene numerador y denominador explícitos;
5. cero, ausencia, no disponible y no aplica permanecen separados;
6. la familia de tiempos distingue tiempo activo, detección, decisión, recovery y latencias NFR;
7. las latencias NFR conservan targets y hard ceilings de 013;
8. tiempo activo usa `DUR-DIR-001` sin inventar un reloj alternativo;
9. la familia de errores usa un denominador elegible;
10. rechazos válidos no se convierten automáticamente en errores;
11. retries correlacionados no inflan intentos lógicos;
12. incidentes conservan severidad propietaria;
13. defectos abiertos consumen el criterio de 023;
14. duplicidades e incertidumbres conservan evidencia de 004/005;
15. la unidad de adopción se resuelve por modalidad y perfil;
16. adopción no se calcula sobre población total no expuesta;
17. shared mide consumo de contrato, no actores ficticios;
18. control declara adopción directa no aplicable;
19. resultado empresarial usa una definición canónica, no un score universal;
20. cambio absoluto se calcula solo contra baseline comparable;
21. cambio relativo no divide por baseline cero;
22. baseline conserva definición, población, ventana, calidad y dimensiones comparables;
23. una baseline contaminada por exposición no puede usarse;
24. cambios materiales abren una nueva versión/ventana y no reescriben historia;
25. una pausa no se cuenta como exposición activa para adopción;
26. eventos de incidente/recovery conservan su cronología aun durante pausa;
27. la calidad controla cobertura, duplicados, datos tardíos y reconciliación;
28. la segmentación no permite que promedios oculten un hard ceiling o segmento crítico;
29. propietarios de definición, evidencia y decisión permanecen separados;
30. guardrails de 013 y criterios de 023 no se compensan con adopción o resultado empresarial;
31. las 207 raíces aparecen exactamente una vez;
32. existen 207 identificadores únicos, 0 faltantes y 0 duplicados;
33. la distribución reconcilia `159 + 3 + 27 + 14 + 2 + 2 = 207`;
34. las 3 shared siguen siendo 033, 034 y 045;
35. los 4 controles bloqueados siguen siendo 062, 065, 140 y 172;
36. AURA conserva 14 raíces bloqueadas;
37. EXT conserva exactamente 027 y 157 bloqueadas;
38. TALENTO conserva exactamente 064 y 197 fuera de línea;
39. no se inventan valores observados ni evidencia de ejecución;
40. no se inventan targets empresariales;
41. 009 conserva propiedad exclusiva de autoridad y criterio de salida;
42. 010 conserva la propiedad exclusiva, dentro de CUTOVER, de las condiciones, evidencia y decisión documental de elegibilidad para retiro del proceso anterior; la ejecución material queda fuera de 010;
43. la ejecución real permanece en `SHELL-CI-022::<package_id>`;
44. no se ejecutan código, instrumentación, consultas productivas, despliegues, cambios de configuración, migraciones, DDL/DML, backfills, cambios de datos ni operaciones sobre Supabase;
45. se crean cero requisitos de prueba, se modifican cero requisitos y se afectan cero fragmentos 04A.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-007 — Diseñar el registro de incidentes, decisiones y cambios de alcance`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-008 — Definir métricas de tiempos, errores, adopción y resultado empresarial`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-009 — Definir autoridad y criterio para aprobar salida del piloto o exigir correcciones`


### ✅ CUTOVER-OPS-009 — Definir autoridad y criterio para aprobar salida del piloto o exigir correcciones

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-008 — Definir métricas de tiempos, errores, adopción y resultado empresarial
**Tarea siguiente:** CUTOVER-OPS-010 — Definir condiciones y evidencia para retirar el proceso anterior
**Tipo de tarea:** documental — definición normativa y materialización completa, por paquete y modalidad de piloto, de la autoridad final y del criterio determinista con el que la ejecución futura podrá aprobar la salida del piloto, exigir correcciones o bloquear la decisión cuando la evidencia sea insuficiente; sin ejecutar salida, promoción, correcciones, despliegues, rollback, retiro legacy, migraciones, DDL/DML, backfills, cambios de configuración, modificaciones de datos ni operaciones sobre Supabase
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0
**Ejecución posterior:** `SHELL-CI-022::<package_id>` después de `SHELL-CI-021::<package_id>` y de los contratos CUTOVER aplicables

---

#### 1. Propósito

`CUTOVER-OPS-009` cierra el gobierno documental de la decisión de salida del piloto.

La tarea responde, para una instancia exacta de paquete, a estas preguntas:

```text
¿EL PAQUETE, CANDIDATO, AMBIENTE, ALCANCE Y VENTANA EVALUADOS SON LOS MISMOS QUE PRODUJERON LA EVIDENCIA?
+
¿TODOS LOS CRITERIOS DE ACEPTACIÓN APLICABLES FUERON EJECUTADOS Y RESUELTOS?
+
¿LAS MÉTRICAS Y GUARDRAILS QUE PARTICIPAN EN LA DECISIÓN TIENEN DEFINICIÓN, CALIDAD Y COMPARABILIDAD SUFICIENTES?
+
¿EXISTEN DEFECTOS, INCIDENTES, RECOVERIES, CONCILIACIONES, BLOQUEOS O CAMBIOS DE ALCANCE ABIERTOS QUE IMPIDAN CERRAR?
+
¿LA AUTORIDAD FINAL DEL PAQUETE ESTÁ RESUELTA Y VIGENTE?
=
DECISIÓN TRAZABLE DE SALIDA, CORRECCIÓN O BLOQUEO
```

La tarea no afirma que ningún paquete haya ejecutado ya el piloto ni que exista evidencia real de salida. Define el contrato que deberá utilizarse cuando esa evidencia exista.

---

#### 2. Resultado sustantivo

La tarea materializa cinco piezas documentales por `package_id`:

1. `required_pilot_exit_evidence_set::<package_id>` — conjunto completo de criterios, métricas decisionales, hechos operativos, bloqueos y evidencia que deben reconciliarse antes de decidir;
2. `pilot_exit_authority::<package_id>` — resolución de la autoridad final usando el `Responsable de decisión` ya asignado a la raíz por `DELIV-PKG-017` y consumido por `DELIV-PKG-023`, sin crear una autoridad nueva;
3. `pilot_exit_evaluation::<package_id>` — evaluación reproducible de identidad, criterios, evidencia, métricas, calidad, vigencia y bloqueos;
4. `pilot_exit_decision::<package_id>` — decisión determinista `APROBAR_SALIDA`, `EXIGIR_CORRECCIONES`, `BLOQUEAR_DECISION` o `NO_APLICA`;
5. `pilot_exit_decision_manifest::<package_id>` — expediente futuro que conservará la decisión, autoridad, evidencia utilizada, criterios evaluados, métricas decisionales, bloqueos, correcciones exigidas y referencias de continuidad.

Ninguna de estas piezas ejecuta físicamente la salida ni modifica el estado de producción por sí sola.

---

#### 3. Entradas canónicas obligatorias

009 consume sin redefinir:

- `CUTOVER-OPS-001`: paquete, candidato, ambiente, alcance, ventana y responsables;
- `CUTOVER-OPS-002`: unidades, olas, dependencias y checkpoints;
- `CUTOVER-OPS-003`: convivencia y autoridad entre proceso anterior y objetivo;
- `CUTOVER-OPS-004`: controles contra doble registro y doble efecto;
- `CUTOVER-OPS-005`: conciliaciones, diferencias, duplicidades y resultados inciertos;
- `CUTOVER-OPS-006`: decisiones operativas `CONTINUAR`, `PAUSAR` y `REVERTIR`;
- `CUTOVER-OPS-007`: bitácora append-only de incidentes, decisiones y cambios de alcance;
- `CUTOVER-OPS-008`: tiempos, errores, adopción, resultado empresarial, baseline, calidad y comparabilidad;
- `DELIV-PKG-013`: umbrales y guardrails NFR aplicables;
- `DELIV-PKG-016`: requisitos de prueba vinculados y evidencia esperada;
- `DELIV-PKG-017`: observabilidad y `Responsable de decisión` de cada raíz;
- `DELIV-PKG-019`: rollout, pausas y promoción posteriores;
- `DELIV-PKG-020`: rollback, recovery, compensation y reconciliation;
- `DELIV-PKG-021`: documentación, procedimientos, soporte y capacitación;
- `DELIV-PKG-022`: modalidad, cohorte, alcance y duración del piloto;
- `DELIV-PKG-023`: criterios medibles de aceptación y `EVID-CLOSE-001`;
- `DELIV-PKG-024`: reconciliación de trazabilidad TREQ por paquete;
- `READY-GATE-013`: baseline congelada y comparabilidad;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`: patrón de resolución de autoridad final a partir del responsable existente del paquete.

Las obligaciones vigentes de definición y calidad de métricas, decisión de cierre o iteración e historial de incidentes continúan protegidas por los requisitos canónicos existentes de DATA y CONT. 009 no los redefine.

---

#### 4. Fronteras obligatorias

009 no:

- ejecuta la salida del piloto;
- promueve `CANARY_5`, `LIMITED_25`, `LIMITED_50` o `FULL_100`;
- modifica cohortes, targeting, flags o configuración;
- realiza correcciones técnicas o funcionales;
- ejecuta retests;
- ejecuta rollback, restore, recovery, compensation o reconciliation;
- crea un target empresarial por inferencia;
- redefine severidades, NFR, criterios de aceptación o perfiles 023;
- acepta evidencia planeada como evidencia ejecutada;
- convierte una mejora de negocio en autorización para ignorar un guardrail;
- retira el proceso anterior;
- autoriza borrado de datos, objetos, código, rutas, contratos o infraestructura legacy;
- ejecuta DDL, DML, migraciones, backfills, cambios de RLS/grants ni operaciones sobre Supabase.

La promoción posterior continúa perteneciendo a `DELIV-PKG-019`. `CUTOVER-OPS-010` pertenece exclusivamente a la evaluación documental de elegibilidad para retirar el proceso anterior; el retiro lógico o físico posterior permanece en sus tareas de implementación propietarias.

---

#### 5. Unidad mínima de decisión

La unidad mínima de `pilot_exit_decision` es:

```text
package_id
+
candidate_ref
+
environment
+
authorized_scope_ref
+
pilot_window_ref
+
modalidad_022
```

Cuando la modalidad tenga unidades, olas o checkpoints propios, la decisión agregada deberá poder reconciliar también esas dimensiones.

No se combinan para una misma decisión:

- candidatos distintos;
- ambientes distintos;
- alcances distintos;
- ventanas separadas por un cambio material;
- definiciones de métrica incompatibles;
- cohortes cuya comparabilidad no esté demostrada.

---

#### 6. Autoridad canónica de salida

`pilot_exit_authority::<package_id>` se resuelve desde el `Responsable de decisión` de la fila homónima de `DELIV-PKG-017`, utilizado además por los criterios de `DELIV-PKG-023`.

Reglas:

1. la identidad `OWN-*` vigente se preserva; 009 no crea un comité, rol o propietario universal;
2. la persona o función que produce evidencia no adquiere por ello autoridad final;
3. la autoridad final no puede cambiar un `FAIL`, `BLOQUEADO` o evidencia faltante a `PASS` por criterio discrecional;
4. la autoridad final no sustituye la autoridad propietaria de rollback, riesgo, seguridad, incidentes, datos o autorización;
5. un suplente solo puede decidir cuando la fuente canónica aplicable reconozca esa sustitución;
6. la autoridad se evalúa para el alcance exacto de la decisión; una autoridad válida para otra raíz, sede, ambiente o dominio no se hereda;
7. si las fuentes vigentes asignan autoridades incompatibles para la misma decisión, el resultado es `BLOQUEAR_DECISION` hasta resolver la contradicción en su fuente propietaria.

---

#### 7. Evidencia mínima de autoridad

La decisión futura deberá conservar, como mínimo:

- `package_id`;
- `decision_owner_ref`;
- fuente canónica que asigna ese responsable;
- alcance de decisión;
- vigencia o condición temporal aplicable;
- actor real que emite la decisión;
- mecanismo de sustitución cuando se utilice;
- evidencia de autoridad;
- momento de decisión.

Una firma, comentario o presencia en una reunión sin autoridad demostrable no satisface esta sección.

---

#### 8. Estados permitidos de decisión

`pilot_exit_decision::<package_id>` utiliza exactamente:

| Decisión              | Semántica                                                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APROBAR_SALIDA`      | toda condición obligatoria aplicable está satisfecha con evidencia reproducible y la autoridad final es válida                                     |
| `EXIGIR_CORRECCIONES` | existe evidencia suficiente de uno o más incumplimientos materiales corregibles que impiden aprobar la salida                                      |
| `BLOQUEAR_DECISION`   | todavía falta evidencia, autoridad, vigencia, comparabilidad o resolución suficiente para aprobar la salida o exigir correcciones de forma fundada |
| `NO_APLICA`           | la fuente canónica demuestra que esa instancia no tiene una salida de piloto evaluable bajo la línea actual                                        |

No existe `APROBAR_CON_PENDIENTES`, `APROBAR_PARCIAL`, `APROBAR_POR_TIEMPO`, `APROBAR_POR_PROMEDIO` ni equivalente.

---

#### 9. Conjunto obligatorio de criterios de aceptación

`required_pilot_exit_evidence_set::<package_id>` incorpora los criterios aplicables del perfil 023 de la raíz:

1. `AC-TREQ-001`;
2. `AC-NFR-001`;
3. `AC-OBS-001`;
4. `AC-PILOT-001`;
5. `AC-ROLLBACK-001`;
6. `AC-DOC-001`;
7. `AC-DEFECT-001`;
8. `AC-MANIFEST-001`.

La aplicabilidad exacta se hereda de `ACC-DIRECT-001`, `ACC-SHARED-001`, `ACC-CONTROL-001`, `ACC-AURA-001`, `ACC-EXT-001` o `ACC-FUTURE-001` según la fila homónima de `DELIV-PKG-023`.

Un criterio `NO_APLICA` solo puede excluirse cuando la propia fuente canónica demuestra su no aplicabilidad. Ausencia de evidencia no equivale a `NO_APLICA`.

---

#### 10. Entradas adicionales de decisión desde 008 y CUTOVER

Además del perfil 023, la evaluación conserva:

- métricas de tiempos aplicables;
- tasa o conteo de errores elegible;
- adopción según modalidad;
- resultado empresarial y comparación contra baseline cuando existan;
- calidad, cobertura, frescura y comparabilidad;
- guardrails y targets ya existentes;
- incidentes y decisiones de 007/006;
- duplicidades, incertidumbres y conciliaciones de 004/005;
- pausas, reversión y recovery;
- cambios de alcance;
- correcciones y retests ya ejecutados cuando existan.

Estas entradas no crean un segundo catálogo de criterios. Se utilizan para demostrar, explicar o bloquear los criterios y decisiones que ya son aplicables.

---

#### 11. Regla determinista de `APROBAR_SALIDA`

`APROBAR_SALIDA` solo puede emitirse cuando se cumplen simultáneamente todas las condiciones aplicables:

1. la identidad de paquete, candidato, ambiente, alcance y ventana coincide en todo el expediente;
2. el perfil 023 aplicable está resuelto para la misma instancia;
3. todos los criterios aplicables de 023 están en `PASS`;
4. no existe ningún criterio aplicable en `FAIL`, `BLOQUEADO` o `PENDIENTE_DE_EVIDENCIA`;
5. todo `NO_APLICA` está respaldado por una fuente canónica;
6. la duración exigida por 022 fue satisfecha cuando la modalidad posee duración directa;
7. no existe una ampliación no autorizada de cohorte, sede, dispositivo, datos, tráfico o alcance;
8. no permanece abierto un defecto bloqueante o mayor;
9. no permanece abierto un recovery, rollback, compensation o reconciliation que el expediente exija cerrar;
10. no permanece una duplicidad confirmada, resultado incierto o diferencia no resuelta que un criterio aplicable considere bloqueante;
11. no existe una condición activa de pausa o reversión incompatible con declarar la salida;
12. las señales obligatorias y la evidencia requerida estuvieron disponibles durante la ventana exigida;
13. las métricas utilizadas como evidencia decisional tienen calidad y comparabilidad suficientes;
14. todo target o guardrail que sea vinculante para salida y tenga fuente canónica está satisfecho;
15. el manifiesto de evidencia está completo, consistente y referenciable;
16. la autoridad final está resuelta, vigente y corresponde al alcance exacto;
17. ningún cambio material posterior invalidó candidato, baseline, alcance, evidencia o decisión.

La ausencia aparente de incidentes no autoriza salida si la cobertura de observabilidad es insuficiente.

---

#### 12. Regla determinista de `EXIGIR_CORRECCIONES`

`EXIGIR_CORRECCIONES` se emite cuando existe evidencia suficiente de incumplimiento material corregible que impide `APROBAR_SALIDA`.

Incluye, cuando aplique:

- un criterio 023 en `FAIL`;
- incumplimiento de un NFR o hard ceiling aplicable;
- defecto bloqueante o mayor abierto;
- falla de observabilidad que haya producido evidencia suficiente de incumplimiento material;
- scope drift o ampliación no autorizada demostrada;
- duplicidad confirmada;
- conciliación fallida o diferencia material no resuelta;
- recovery incompleto;
- incompatibilidad de contrato o consumidor demostrada;
- métrica decisional con target o guardrail canónico incumplido;
- evidencia inconsistente que demuestre un resultado incorrecto, y no meramente ausencia de información.

La decisión deberá identificar cada incumplimiento, su evidencia, la fuente propietaria, el alcance afectado y la corrección o reevaluación necesaria.

---

#### 13. `correction_requirement_set::<package_id>`

Toda decisión `EXIGIR_CORRECCIONES` deberá producir un conjunto de obligaciones de corrección sin inventar identificadores futuros.

Por cada incumplimiento real deberá conservarse:

- criterio o guardrail afectado;
- evidencia del incumplimiento;
- fuente propietaria;
- tarea exacta de corrección cuando haya sido creada por el flujo canónico correspondiente;
- propietario de la corrección;
- alcance afectado;
- necesidad de detener, mantener pausa o revertir cuando la fuente propietaria así lo exija;
- prueba o validación que deberá repetirse;
- requisito de regresión una vez materializado cuando el defecto real lo exija;
- baseline o ventana que deba recapturarse por cambio material;
- criterios 023 que deberán reevaluarse;
- métricas 008 que deberán recalcularse;
- condición verificable para volver a presentar la instancia a 009.

009 no crea por anticipado IDs de defectos, tareas de corrección o requisitos de regresión para fallos hipotéticos.

---

#### 14. Regla determinista de `BLOQUEAR_DECISION`

Se utiliza `BLOQUEAR_DECISION` cuando no existe base suficiente para una decisión fundada.

Entre otras condiciones:

1. algún criterio aplicable está `BLOQUEADO` o `PENDIENTE_DE_EVIDENCIA`;
2. la autoridad final no puede demostrarse;
3. el candidato, ambiente, alcance o ventana no son coherentes entre fuentes;
4. falta evidencia obligatoria;
5. una métrica necesaria para una decisión está `SIN_OBSERVACIONES`, `NO_DISPONIBLE` o conserva una limitación que impide usarla;
6. la baseline requerida no es comparable;
7. dos fuentes vigentes se contradicen sobre la misma decisión;
8. un cambio material exige nueva ventana o nueva baseline y todavía no existe evidencia suficiente;
9. un consumidor obligatorio de una raíz shared no fue evaluado;
10. un control obligatorio no cubrió todas las ventanas que gobierna;
11. existe un resultado incierto cuyo tratamiento propietario todavía no permite clasificar el criterio;
12. la evidencia disponible no permite distinguir incumplimiento material de falta de observación.

Bloquear no equivale a aprobar ni a declarar defecto. Cada bloqueo deberá conservar la fuente responsable y la condición verificable de salida.

---

#### 15. Regla de `NO_APLICA`

`NO_APLICA` solo se utiliza cuando la modalidad y estado canónicos demuestran que no existe una salida de piloto evaluable para esa instancia.

No se utiliza para:

- un piloto incompleto;
- una raíz directa sin evidencia;
- una raíz shared con consumidores pendientes;
- un control pendiente de evidencia;
- un paquete bloqueado que sí deberá pilotarse cuando cierre su gate.

AURA, EXT y TALENTO conservan su estado propietario mientras no exista exposición autorizada; 009 no fabrica una decisión de salida sobre una ejecución inexistente.

---

#### 16. Métricas sin target explícito de salida

Una métrica de 008 sin target o guardrail explícito de salida recibe este tratamiento determinista:

1. si ninguna fuente canónica la declara vinculante para la aceptación, se conserva como evidencia diagnóstica y **no puede aprobar ni reprobar la salida por sí sola**;
2. si una fuente canónica la declara vinculante y ya existe target o guardrail, se evalúa exactamente contra ese valor;
3. si una fuente canónica exige usarla como criterio vinculante pero el target, regla de comparación o condición decisional necesaria no está materializado, el resultado es `BLOQUEAR_DECISION` para ese alcance;
4. no se inventa un porcentaje, mejora mínima, tolerancia ni dirección favorable;
5. una mejora aparente tampoco compensa un criterio de seguridad, integridad, NFR, observabilidad, defectos o conciliación incumplido.

La evidencia deberá conservar la fuente exacta que hizo vinculante o meramente diagnóstica cada métrica.

---

#### 17. Riesgo residual y condiciones de suspensión

Un riesgo residual aceptado en `READY-GATE-014` no equivale a un permiso para convertir un criterio fallido en `PASS`.

Para la salida:

- la aceptación de riesgo debe seguir vigente para el mismo candidato, ambiente y alcance;
- una condición de suspensión activada prevalece hasta su resolución conforme a su fuente;
- una excepción vencida o ampliada fuera de su alcance bloquea la decisión;
- no se crea una excepción nueva dentro de 009;
- una mejora empresarial no compensa una condición de suspensión activa.

---

#### 18. Pausas, reversión y recuperación

La existencia histórica de una pausa o reversión no impide por sí sola una salida futura, pero exige demostrar el tratamiento completo correspondiente.

Antes de `APROBAR_SALIDA`:

- toda pausa debe conservar inicio, fin y decisión relacionada cuando existan;
- una reanudación debe haber sido autorizada conforme a 006;
- una reversión debe conservar evidencia de recovery conforme a 020;
- cualquier conciliación obligatoria posterior debe estar resuelta;
- el reloj activo debe respetar `DUR-DIR-001`;
- una ventana materialmente reiniciada no se completa sumando exposición incompatible de la ventana anterior.

---

#### 19. Defectos y regresión

Cuando el piloto real detecte un defecto:

1. 007 conserva el hecho y su evidencia;
2. 009 consume su clasificación y el criterio 023 afectado;
3. si el defecto impide salida, la decisión es `EXIGIR_CORRECCIONES` cuando exista evidencia suficiente;
4. la corrección pertenece a la tarea técnica o funcional exacta creada por el flujo canónico de corrección;
5. cuando el defecto requiera protección de regresión, el requisito correspondiente se materializa en ese flujo y se vincula después al expediente;
6. el retest debe producir evidencia nueva;
7. la decisión previa no se reescribe: una nueva evaluación de 009 registra un nuevo resultado relacionado.

No se marca como corregido un defecto por existir un commit, PR o plan de corrección sin evidencia del retest aplicable.

---

#### 20. Cambios materiales e invalidación

Un cambio material posterior a la evidencia de salida puede invalidar la evaluación reutilizable.

Incluye, cuando aplique:

- candidato;
- ambiente;
- autorización;
- alcance;
- cohorte;
- datos;
- contrato;
- configuración;
- estrategia de rollout;
- baseline;
- definición de métrica;
- requisito aplicable;
- recovery o rollback;
- consumidor obligatorio;
- unidad u ola.

La evaluación anterior permanece como historia. El alcance cambiado requiere la recaptura o reevaluación que sus fuentes propietarias determinen.

---

#### 21. Manifiesto futuro de decisión

`pilot_exit_decision_manifest::<package_id>` deberá poder conservar, como mínimo:

- `package_id`;
- `candidate_ref`;
- `environment`;
- `authorized_scope_ref`;
- `pilot_window_ref`;
- modalidad 022;
- perfil 023;
- referencia a `EVID-CLOSE-001`;
- resultado de cada criterio aplicable;
- evidencia por criterio;
- métricas decisionales de 008 y versión de definición;
- baseline y comparabilidad cuando apliquen;
- target o guardrail y fuente cuando exista;
- incidentes, defectos, duplicidades y conciliaciones relevantes;
- decisiones 006 relacionadas;
- cambios de alcance;
- bloqueos vigentes;
- correcciones exigidas;
- referencias de retest;
- `decision_owner_ref`;
- actor real de decisión;
- evidencia de autoridad;
- decisión final;
- motivo reproducible;
- momento de decisión;
- decisión previa relacionada cuando exista;
- handoff posterior permitido por la decisión.

El manifiesto no sustituye la evidencia fuente y no contiene secretos por conveniencia.

---

#### 22. Semántica para `PILOT-DIRECT-001`

Para las 160 raíces directas:

- la salida se evalúa sobre la ventana propia de la raíz;
- `ACC-DIRECT-001` exige los ocho criterios aplicables;
- `DUR-DIR-001` debe estar completo;
- el candidato y alcance deben coincidir con la evidencia de cierre;
- no existe aprobación por completar únicamente el reloj;
- cualquier `FAIL`, `BLOQUEADO` o `PENDIENTE_DE_EVIDENCIA` aplicable impide `APROBAR_SALIDA`.

---

#### 23. Semántica para `PILOT-SHARED-001`

Para `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`:

- no se crea un reloj de piloto propio;
- la evaluación se deriva de todos los consumidores directos necesarios definidos por el contrato;
- un consumidor obligatorio no evaluado bloquea la decisión;
- la raíz shared conserva su propia autoridad de decisión y no absorbe la autoridad de sus consumidores;
- la compatibilidad, pruebas, observabilidad, defectos y manifiesto propios deben estar resueltos;
- el mismo hecho no se duplica entre consumidor y contrato shared para inflar evidencia.

---

#### 24. Semántica para `PILOT-CONTROL-001`

Para las 26 raíces de control:

- no se crea una salida de exposición empresarial ficticia;
- la decisión evalúa el cierre del control respecto de todas las ventanas que realmente gobierna;
- las 22 raíces `OBSERVE_SIN_DEPLOY_DIRECTO` no requieren un deploy ficticio;
- `GAP-PKG-062`, `GAP-PKG-065`, `GAP-PKG-140` y `GAP-PKG-172` conservan bloqueo mientras su identidad física requerida no esté resuelta;
- el `Responsable de decisión` del control no adquiere autoridad sobre los paquetes gobernados;
- un control incompleto mantiene bloqueados únicamente los alcances que su contrato gobierna.

---

#### 25. AURA, EXT y TALENTO

##### 25.1. AURA

Las 14 raíces AURA permanecen bloqueadas. Mientras no exista exposición autorizada, no se fabrica una evaluación de salida ni evidencia de piloto.

##### 25.2. Dependencias externas

`GAP-PKG-027` y `GAP-PKG-157` conservan `BLOQUEADO_EXT_GOV_001`. No existe salida de un piloto externo que todavía no haya sido autorizado y ejecutado.

##### 25.3. TALENTO

`GAP-PKG-064` y `GAP-PKG-197` permanecen `FUERA_DE_LINEA_ACTUAL`. 009 conserva su contrato futuro sin simular una decisión de salida productiva.

---

#### 26. Matriz materializada de las 207 raíces

Cada identidad aparece exactamente una vez. La matriz materializa **cómo deberá evaluarse la salida** cuando exista evidencia real; no emite una decisión operativa futura por anticipado.

| `package_id`  | Modalidad 022          | Perfil 023        | Estado heredado 023         | Tratamiento 009                                                                         | Autoridad final                                                | Estado documental 009 | Condición vigente                                                                      |
| ------------- | ---------------------- | ----------------- | --------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------- |
| `GAP-PKG-001` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-002` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-003` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `BLOQUEADO_014_Y_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-004` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-005` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-006` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-007` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-008` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-009` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-010` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-011` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-012` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-013` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-014` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-015` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-016` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-017` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-018` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-019` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-020` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-021` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-022` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-023` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-024` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-025` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-026` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-027` | `PILOT-BLOCK-EXT-001`  | `ACC-EXT-001`     | `BLOQUEADO_EXT_GOV`         | sin decisión de salida ejecutable mientras el gate externo permanezca cerrado           | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva `EXT-GOV-001`                                                                 |
| `GAP-PKG-028` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-029` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-030` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-031` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-032` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-033` | `PILOT-SHARED-001`     | `ACC-SHARED-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación derivada de consumidores directos; sin reloj propio                          | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | todos los consumidores obligatorios y evidencia shared deben quedar resueltos          |
| `GAP-PKG-034` | `PILOT-SHARED-001`     | `ACC-SHARED-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación derivada de consumidores directos; sin reloj propio                          | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | todos los consumidores obligatorios y evidencia shared deben quedar resueltos          |
| `GAP-PKG-035` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-036` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-037` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-038` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-039` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-040` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-041` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-042` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-043` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-044` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-045` | `PILOT-SHARED-001`     | `ACC-SHARED-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación derivada de consumidores directos; sin reloj propio                          | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | todos los consumidores obligatorios y evidencia shared deben quedar resueltos          |
| `GAP-PKG-046` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-047` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-048` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-049` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-050` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-051` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-052` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-053` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-054` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-055` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-056` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-057` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-058` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-059` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-060` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-061` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-062` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `BLOQUEADO_014_Y_EVIDENCIA` | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva gate de identidad física pendiente de 022/023                                 |
| `GAP-PKG-063` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-064` | `PILOT-FUTURE-001`     | `ACC-FUTURE-001`  | `FUERA_DE_LINEA_ACTUAL`     | sin decisión de salida en la línea funcional actual                                     | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `FUERA_DE_LINEA`      | requiere activación formal de TALENTO antes de cualquier piloto                        |
| `GAP-PKG-065` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `BLOQUEADO_014_Y_EVIDENCIA` | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva gate de identidad física pendiente de 022/023                                 |
| `GAP-PKG-066` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-067` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-068` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-069` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-070` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-071` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-072` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-073` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-074` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-075` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-076` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-077` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-078` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-079` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-080` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-081` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-082` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-083` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-084` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-085` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-086` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-087` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-088` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-089` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-090` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-091` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-092` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-093` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-094` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-095` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-096` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-097` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-098` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-099` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-100` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-101` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-102` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-103` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-104` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-105` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-106` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-107` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-108` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-109` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-110` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-111` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-112` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-113` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-114` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-115` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-116` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-117` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-118` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-119` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-120` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-121` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-122` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-123` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-124` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-125` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-126` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-127` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-128` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-129` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-130` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-131` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-132` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-133` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-134` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-135` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-136` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-137` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-138` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-139` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-140` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `BLOQUEADO_014_Y_EVIDENCIA` | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva gate de identidad física pendiente de 022/023                                 |
| `GAP-PKG-141` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-142` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-143` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-144` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-145` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-146` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-147` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-148` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-149` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-150` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-151` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-152` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-153` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-154` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-155` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-156` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-157` | `PILOT-BLOCK-EXT-001`  | `ACC-EXT-001`     | `BLOQUEADO_EXT_GOV`         | sin decisión de salida ejecutable mientras el gate externo permanezca cerrado           | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva `EXT-GOV-001`                                                                 |
| `GAP-PKG-158` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-159` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-160` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-161` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-162` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-163` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-164` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-165` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-166` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-167` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-168` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-169` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-170` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-171` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-172` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `BLOQUEADO_014_Y_EVIDENCIA` | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva gate de identidad física pendiente de 022/023                                 |
| `GAP-PKG-173` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-174` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-175` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-176` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-177` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-178` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-179` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-180` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-181` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-182` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-183` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-184` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-185` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-186` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-187` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-188` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-189` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-190` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-191` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-192` | `PILOT-BLOCK-AURA-001` | `ACC-AURA-001`    | `BLOQUEADO_AURA`            | sin decisión de salida ejecutable mientras no exista piloto autorizado                  | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `BLOQUEADO`           | conserva bloqueo AURA propietario                                                      |
| `GAP-PKG-193` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-194` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-195` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-196` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-197` | `PILOT-FUTURE-001`     | `ACC-FUTURE-001`  | `FUERA_DE_LINEA_ACTUAL`     | sin decisión de salida en la línea funcional actual                                     | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `FUERA_DE_LINEA`      | requiere activación formal de TALENTO antes de cualquier piloto                        |
| `GAP-PKG-198` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-199` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-200` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |
| `GAP-PKG-201` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-202` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-203` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-204` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-205` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-206` | `PILOT-DIRECT-001`     | `ACC-DIRECT-001`  | `BLOQUEADO_014_Y_EVIDENCIA` | evaluación directa de salida sobre su ventana propia                                    | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia ejecutada + criterios aplicables completos; sin salida automática por tiempo |
| `GAP-PKG-207` | `PILOT-CONTROL-001`    | `ACC-CONTROL-001` | `PENDIENTE_DE_EVIDENCIA`    | cierre del control sobre todas las ventanas gobernadas; sin salida empresarial ficticia | Responsable de decisión de la fila homónima de `DELIV-PKG-017` | `ESPECIFICADO`        | evidencia de control requerida sobre todas las ventanas gobernadas                     |

---

#### 27. Reconciliación cuantitativa

La matriz demuestra:

```text
RAÍCES ESPERADAS = 207
RAÍCES MATERIALIZADAS = 207
IDENTIFICADORES ÚNICOS = 207
FALTANTES = 0
DUPLICADOS = 0

160 PILOT-DIRECT-001
+ 3 PILOT-SHARED-001
+ 26 PILOT-CONTROL-001
+ 14 PILOT-BLOCK-AURA-001
+ 2 PILOT-BLOCK-EXT-001
+ 2 PILOT-FUTURE-001
= 207
```

Dentro de `PILOT-CONTROL-001`:

```text
22 controles sin deploy directo confirmado
+ 4 controles con gate físico pendiente
= 26
```

Las tres raíces shared permanecen `GAP-PKG-033`, `GAP-PKG-034` y `GAP-PKG-045`.

Los cuatro controles con gate físico pendiente permanecen `GAP-PKG-062`, `GAP-PKG-065`, `GAP-PKG-140` y `GAP-PKG-172`.

Las 14 raíces AURA, las 2 EXT y las 2 TALENTO conservan exactamente su modalidad heredada.

La distribución de estados heredados de `DELIV-PKG-023` también permanece intacta:

```text
167 BLOQUEADO_014_Y_EVIDENCIA
+ 22 PENDIENTE_DE_EVIDENCIA
+ 14 BLOQUEADO_AURA
+ 2 BLOQUEADO_EXT_GOV
+ 2 FUERA_DE_LINEA_ACTUAL
= 207
```

009 no promueve ninguno de esos estados por aprobación documental.

---

#### 28. Relación con promoción posterior

`APROBAR_SALIDA` significa únicamente que la instancia evaluada satisfizo el contrato de salida del piloto.

No significa:

- que una siguiente cohorte haya sido activada;
- que exista autorización automática para `CANARY_5`, `LIMITED_25`, `LIMITED_50` o `FULL_100`;
- que el candidato haya sido promovido;
- que el feature flag haya cambiado;
- que la ruta anterior haya sido deshabilitada;
- que el proceso anterior pueda retirarse.

Cualquier promoción posterior continúa bajo `DELIV-PKG-019` y las autorizaciones que su expediente exija.

---

#### 29. Handoff a `CUTOVER-OPS-010`

Cuando exista una decisión real `APROBAR_SALIDA`, 009 podrá entregar a 010:

```text
PAQUETE / CANDIDATO / AMBIENTE / ALCANCE
+
VENTANA Y MODALIDAD
+
DECISIÓN APROBAR_SALIDA
+
AUTORIDAD Y EVIDENCIA
+
CRITERIOS 023 COMPLETOS
+
MÉTRICAS Y GUARDRAILS DECISIONALES
+
INCIDENTES / DEFECTOS / RECOVERIES / CONCILIACIONES RESUELTOS SEGÚN APLICABILIDAD
+
HISTORIAL DE CAMBIOS Y CORRECCIONES
=
ENTRADA ELEGIBLE PARA EVALUAR CONDICIONES DE RETIRO DEL PROCESO ANTERIOR
```

Ese handoff **no autoriza el retiro**. 010 deberá definir y comprobar sus propias condiciones y evidencia de retiro legacy.

`EXIGIR_CORRECCIONES`, `BLOQUEAR_DECISION` o ausencia de una decisión válida no producen elegibilidad de retiro.

---

#### 30. Separación entre planificación y ejecución

009 es exclusivamente documental.

No ejecuta:

- decisiones reales de salida;
- correcciones;
- retests;
- activaciones;
- promociones;
- cambios de targeting;
- cambios de feature flags;
- rollback, recovery o compensation;
- conciliaciones;
- retiro legacy;
- eliminación de código, datos, objetos o rutas;
- despliegues;
- migraciones;
- DDL/DML;
- backfills;
- cambios de RLS/grants;
- configuración remota;
- operaciones sobre Supabase.

La evidencia real y la decisión futura pertenecen a la ejecución autorizada de `SHELL-CI-022::<package_id>` consumiendo los contratos aplicables.

---

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Fragmentos 04A afectados:** 0

**Justificación:** 009 no introduce un comportamiento empresarial o técnico ejecutable nuevo, ni crea permisos, transiciones runtime, fórmulas, métricas, severidades, umbrales, mecanismos de recuperación o criterios de aceptación nuevos. Materializa el gobierno documental para resolver la autoridad final y combinar de forma determinista criterios, métricas y evidencia ya definidos por las fuentes canónicas de E5 y CUTOVER. Los comportamientos verificables subyacentes continúan protegidos por el registro canónico vigente; un defecto real futuro que requiera regresión se incorporará mediante su flujo de corrección propietario y no como requisito hipotético de esta tarea.

---

#### 32. Criterios de aceptación documental

`CUTOVER-OPS-009` queda documentalmente completo cuando:

1. conserva `CUTOVER-OPS-008 → CUTOVER-OPS-009 → CUTOVER-OPS-010`;
2. resuelve la autoridad final por referencia a la fila homónima de `DELIV-PKG-017` sin crear un rol nuevo;
3. distingue productor de evidencia, propietario de criterio y autoridad final;
4. materializa `required_pilot_exit_evidence_set`;
5. materializa `pilot_exit_authority`;
6. materializa `pilot_exit_evaluation`;
7. materializa `pilot_exit_decision`;
8. materializa `pilot_exit_decision_manifest`;
9. utiliza únicamente `APROBAR_SALIDA`, `EXIGIR_CORRECCIONES`, `BLOQUEAR_DECISION` y `NO_APLICA`;
10. prohíbe aprobación con pendientes o por mero transcurso del tiempo;
11. exige todos los criterios 023 aplicables en `PASS` para `APROBAR_SALIDA`;
12. impide que `FAIL`, `BLOQUEADO` o `PENDIENTE_DE_EVIDENCIA` aplicable se redondee a aprobación;
13. exige que todo `NO_APLICA` tenga fuente canónica;
14. conserva los ocho criterios de aceptación de 023 sin redefinirlos;
15. conserva la duración de 022 sin convertirla por sí sola en aprobación;
16. conserva targets y hard ceilings de 013 sin inventar tolerancias;
17. utiliza las métricas de 008 con su definición, calidad y comparabilidad;
18. una métrica sin target de salida no aprueba ni reprueba por sí sola salvo que una fuente la haga vinculante;
19. si una métrica vinculante carece de regla decisional necesaria, la decisión queda bloqueada y no se inventa un target;
20. una mejora empresarial no compensa seguridad, integridad, NFR, observabilidad, defectos o conciliación incumplidos;
21. `EXIGIR_CORRECCIONES` requiere evidencia suficiente de incumplimiento material;
22. cada corrección real conserva fuente, propietario, retest y condición de nueva presentación;
23. no se inventan IDs de corrección o regresión para fallos hipotéticos;
24. la bitácora 007 permanece append-only y una nueva decisión no borra la anterior;
25. pausas, reversión, recovery y conciliación quedan resueltos conforme a sus fuentes antes de aprobar cuando sean aplicables;
26. cambios materiales invalidan únicamente el uso futuro de la evaluación afectada y no reescriben historia;
27. shared se evalúa por consumidores obligatorios sin crear reloj propio;
28. control se evalúa sobre ventanas gobernadas sin crear una exposición empresarial ficticia;
29. las 4 raíces de control con identidad física pendiente conservan bloqueo;
30. AURA conserva 14 raíces bloqueadas;
31. EXT conserva `GAP-PKG-027` y `GAP-PKG-157` bloqueadas;
32. TALENTO conserva `GAP-PKG-064` y `GAP-PKG-197` fuera de línea;
33. las 207 raíces aparecen exactamente una vez;
34. existen 207 identificadores únicos, 0 faltantes y 0 duplicados;
35. la distribución reconcilia `159 + 3 + 27 + 14 + 2 + 2 = 207`;
36. las tres shared continúan siendo 033, 034 y 045;
37. los cuatro controles bloqueados continúan siendo 062, 065, 140 y 172;
38. `APROBAR_SALIDA` no ejecuta promoción;
39. `APROBAR_SALIDA` no autoriza retirar legacy;
40. 010 conserva propiedad exclusiva de las condiciones y evidencia para retirar el proceso anterior;
41. la ejecución real y captura de evidencia permanecen en `SHELL-CI-022::<package_id>`;
42. no se ejecutan código, correcciones, retests, despliegues, configuración remota, rollback, recovery, conciliaciones, migraciones, DDL/DML, backfills, cambios de datos ni operaciones sobre Supabase;
43. se crean cero requisitos de prueba, se modifican cero requisitos y se afectan cero fragmentos 04A.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-008 — Definir métricas de tiempos, errores, adopción y resultado empresarial`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-009 — Definir autoridad y criterio para aprobar salida del piloto o exigir correcciones`

**SIGUIENTE TAREA RESERVADA**
`CUTOVER-OPS-010 — Definir condiciones y evidencia para retirar el proceso anterior`


### ✅ CUTOVER-OPS-010 — Definir condiciones y evidencia para retirar el proceso anterior

**Estado:** APROBADA
**Tarea anterior:** CUTOVER-OPS-009 — Definir autoridad y criterio para aprobar salida del piloto o exigir correcciones
**Tarea siguiente:** HYPERCARE-OPS-001 — Definir inicio, duración y salida del acompañamiento intensivo
**Tipo de tarea:** documental — definición de condiciones, evidencia, bloqueos y expediente de elegibilidad para retirar el proceso anterior después del piloto, sin ejecutar retiro lógico o físico, despliegues, migraciones ni cambios remotos

---

#### 1. Resultado canónico

`CUTOVER-OPS-010` cierra el bloque CUTOVER definiendo cómo determinar, para una instancia exacta de paquete, candidato, ambiente, alcance autorizado y superficie legacy, si el proceso anterior reúne evidencia suficiente para quedar **elegible para retiro**.

La tarea no equipara salida aprobada del piloto con retiro. `CUTOVER-OPS-009` entrega únicamente una entrada elegible cuando existe una decisión válida `APROBAR_SALIDA`; 010 agrega la comprobación independiente de que el proceso anterior ya no conserva una necesidad material como autoridad, compatibilidad, consumidor, soporte de trabajo en curso, recuperación, conciliación, fuente de datos, integración o evidencia.

El resultado documental se materializa mediante cinco piezas:

1. `legacy_retirement_scope::<package_id>` — identifica las superficies del proceso anterior realmente sujetas a evaluación de retiro y su procedencia canónica;
2. `required_legacy_retirement_evidence_set::<package_id>` — consolida las obligaciones de evidencia ya definidas por transición, aceptación, observabilidad, compatibilidad, conciliación, rollback y registro de requisitos;
3. `legacy_retirement_evaluation::<package_id>` — evalúa cada superficie contra todas las condiciones aplicables sin inferir cierre por ausencia de señales;
4. `legacy_retirement_decision::<package_id>` — registra el resultado documental de elegibilidad, bloqueo, no aplicabilidad o invalidación;
5. `legacy_retirement_manifest::<package_id>` — conserva alcance, superficies, fuentes, condiciones, evidencia, bloqueos, responsables y relación con la fase siguiente.

Ninguna de estas piezas elimina, desactiva, renombra, modifica o despliega componentes del proceso anterior.

---

#### 2. Fuentes canónicas consumidas

010 consume sin redefinir autoridad:

1. `CUTOVER-OPS-001..009`, en especial:
   - unidades, olas y secuencia de activación de 002;
   - convivencia, proceso anterior, proceso objetivo, autoridad, compatibilidad, trabajo en curso y recuperación de 003;
   - controles contra doble registro y doble efecto de 004;
   - conciliaciones y tratamiento de resultados inciertos de 005;
   - decisión de pausa, reversión o continuación de 006;
   - bitácora y evidencia de cambio de 007;
   - métricas de 008;
   - autoridad y decisión de salida de 009;
2. `DELIV-PKG-009`, que gobierna transición, backfill, compatibilidad temporal, lane de retiro legacy y `ZERO_CONFIRMED`;
3. `DELIV-PKG-010`, para operaciones asíncronas, retry, colas, compensación y conciliación cuando existan;
4. `DELIV-PKG-014..017`, para identidad física, dependencias, pruebas y observabilidad;
5. `DELIV-PKG-018..020`, para activación, rollout, rollback y recuperación;
6. `DELIV-PKG-022..025`, para piloto, aceptación, trazabilidad y decisión documental del paquete;
7. el registro 04A vigente, en particular los requisitos de retiro seguro, compatibilidad, consumidores, integridad, rollback, idempotencia, conciliación, trazabilidad e historia;
8. las fuentes propietarias de cada superficie cuando definan conservación, retención, soporte, consumidor o dependencia adicional.

La precedencia es conservadora: una fuente propietaria que exija conservar una superficie impide declararla elegible para retiro aunque otra evidencia demuestre que dejó de ser autoridad empresarial.

---

#### 3. Distinciones obligatorias

010 mantiene separadas las siguientes decisiones:

| Concepto                    | Significado en 010                                                                                   | No significa                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| pérdida de autoridad legacy | la superficie anterior ya no decide ni produce el efecto empresarial autoritativo según 003          | que pueda eliminarse                                                      |
| compatibilidad temporal     | la superficie anterior permanece por contrato para consumidores o transición                         | doble autoridad                                                           |
| uso cero observado          | la telemetría aplicable cumple la puerta `ZERO_CONFIRMED` de `DELIV-PKG-009`                         | inexistencia absoluta demostrada por una sola búsqueda                    |
| retiro lógico               | el proceso anterior deja de estar habilitado como camino operativo conforme a la transición aprobada | eliminación física                                                        |
| retiro físico               | eliminación futura de la superficie exacta mediante su tarea de implementación propietaria           | efecto ejecutado por 010                                                  |
| conservación histórica      | datos, auditoría, evidencia, crosswalks y referencias continúan preservados                          | mantener activa la lógica legacy                                          |
| rollback o recovery         | mecanismo aprobado para volver a un objetivo seguro o recuperar hechos                               | autorización automática para mantener el proceso anterior indefinidamente |
| elegibilidad de retiro      | todas las condiciones documentales aplicables están satisfechas con evidencia reproducible           | retiro ya ejecutado o validado                                            |

La pérdida de autoridad es condición necesaria cuando aplica, pero no es evidencia suficiente de retiro.

---

#### 4. Unidad canónica de evaluación

La evaluación no se realiza de forma global por nombre de aplicación ni por lote de paquetes. Cada instancia se identifica por la combinación verificable de:

- `package_id`;
- `candidate_ref`;
- `environment`;
- `authorized_scope_ref`;
- `activation_unit_ref` y `wave_ref` cuando apliquen;
- referencia del proceso o superficie anterior heredada de 003;
- `TRANSITION_KEY` o identidad propietaria equivalente cuando exista en `DELIV-PKG-009`;
- referencia de la superficie objetivo o sucesora cuando la disposición canónica la exija.

Una misma raíz puede contener más de una identidad de transición y, por tanto, más de una decisión de retiro. No se permite reducir todas sus superficies a un único veredicto si sus dependencias, consumidores o disposiciones son distintas.

---

#### 5. Alcance de superficies legacy

`legacy_retirement_scope::<package_id>` deberá clasificar únicamente superficies demostrables por fuente canónica. Entre ellas pueden existir, según el paquete:

- procesos o caminos operativos anteriores;
- rutas de escritura o lectura;
- contratos, wrappers, aliases o vistas de compatibilidad;
- funciones, RPC, endpoints, jobs, triggers o automatizaciones;
- productores, consumidores, webhooks, colas y trabajo diferido;
- tablas, vistas, relaciones, políticas u objetos de transición;
- flags o controles temporales de activación;
- adaptadores de consumidor;
- integraciones externas y callbacks;
- operación offline o trabajo en curso aún vinculado a la superficie anterior;
- artefactos de recuperación que todavía dependan de la implementación legacy.

La inclusión en esta lista no autoriza retiro. La identidad física exacta continúa gobernada por `DELIV-PKG-014` y las fuentes propietarias.

---

#### 6. Relación con la lane de retiro de `DELIV-PKG-009`

010 no crea una segunda secuencia de retiro. Consume la lane ya aprobada:

`INVENTORIED → SUCCESSOR_PROVEN → DEPRECATION_ANNOUNCED → NO_NEW_USAGE_FENCED → LEGACY_READ_ONLY → ZERO_USAGE_OBSERVED → DATA_AND_EVIDENCE_PRESERVED → LOGICALLY_DISABLED → PHYSICALLY_REMOVED → POST_REMOVAL_OBSERVED → RETIREMENT_CLOSED`.

La evaluación de 010 debe señalar qué hitos están demostrados, cuáles siguen pendientes y qué fuente aporta la evidencia. No puede saltar hitos ni interpretar una etapa posterior como cumplida porque una anterior parezca innecesaria.

Las disposiciones E3 conservan su semántica:

- `CONSERVAR`: no entra en retiro por conveniencia;
- `MOVER`: el origen solo puede avanzar hacia retiro después de autoridad objetivo y consumidores migrados;
- `FUSIONAR`: los no sobrevivientes solo pueden avanzar después de crosswalk estable y ausencia de referencias pendientes;
- `DIVIDIR`: la fuente solo puede avanzar después de cobertura completa del routing aprobado;
- `RETIRAR`: sigue deprecación progresiva sin inventar sucesor.

---

#### 7. Condición de entrada desde `CUTOVER-OPS-009`

Una evaluación de retiro solo puede comenzar como candidata a elegibilidad cuando la misma instancia posee una decisión vigente `APROBAR_SALIDA` de 009.

Los siguientes casos impiden una conclusión favorable:

- `EXIGIR_CORRECCIONES` vigente;
- `BLOQUEAR_DECISION` vigente;
- ausencia de decisión válida;
- evaluación de 009 invalidada por cambio material;
- candidato, ambiente, alcance o unidad distintos de los evaluados por 009.

`APROBAR_SALIDA` no prueba ninguna condición de retiro por sí sola.

---

#### 8. Condición de autoridad única

Para una superficie candidata a retiro deberá existir evidencia de que:

1. la superficie objetivo conserva la autoridad definida por 003 para el estado posterior a activación;
2. el proceso anterior no conserva autorización para crear nuevos hechos, confirmaciones o efectos empresariales dentro del alcance evaluado;
3. cualquier presencia técnica residual del proceso anterior es no autoritativa y está clasificada por una razón canónica;
4. 004 no registra una brecha que permita doble registro, doble efecto o reintento por una segunda ruta;
5. no existe una ventana de doble autoridad usada como mecanismo de transición.

Si la autoridad no puede demostrarse de forma unívoca, el retiro queda bloqueado.

---

#### 9. Condición de consumidores y compatibilidad

La elegibilidad exige demostrar, según aplicabilidad, que:

- los consumidores declarados de la superficie anterior fueron migrados, retirados o conservados bajo un contrato que no requiere ejecutar la lógica legacy candidata a retiro;
- las dependencias estáticas, dinámicas, de framework, navegación, base de datos, scripts, CI e integraciones externas aplicables fueron cubiertas por la evidencia propietaria;
- una compatibilidad temporal todavía necesaria permanece explícitamente retenida y, mientras dependa de la superficie anterior, bloquea el retiro físico de esa superficie;
- la ausencia de imports o referencias en una búsqueda aislada no se interpreta como ausencia total de consumidores;
- no se usa eliminación en cascada para descubrir o resolver dependencias ocultas.

La superficie puede haber perdido autoridad empresarial y aun así permanecer retenida por compatibilidad. Esa retención no reabre autoridad.

---

#### 10. Condición `ZERO_CONFIRMED`

Para toda superficie cuyo retiro físico dependa de uso cero, 010 reutiliza exactamente `ZERO_CONFIRMED` de `DELIV-PKG-009`.

No se crea una ventana nueva ni un umbral alternativo. La evidencia deberá demostrar que las señales exigidas por esa fuente cubren su ventana aprobada, incluidos los ciclos y horizontes aplicables a releases, jobs, TTL, reintentos y soporte.

Una sola métrica en cero, una búsqueda negativa, ausencia de tickets o falta de actividad visible en una interfaz no sustituyen `ZERO_CONFIRMED`.

Si la ventana todavía no terminó, la conclusión de retiro permanece bloqueada por evidencia pendiente; 010 no anticipa el resultado.

---

#### 11. Condición de trabajo en curso

La superficie anterior no será elegible para retiro mientras exista trabajo en curso que dependa materialmente de ella y no tenga tratamiento aprobado.

La evidencia deberá resolver, cuando aplique:

- solicitudes iniciadas antes de activación;
- formularios, operaciones o adjuntos pendientes;
- colas locales u operaciones offline;
- jobs, outbox, inbox o mensajes todavía procesables;
- reintentos programados;
- casos parcialmente completados;
- operaciones que deban volver a una interfaz anterior para completar un paso;
- referencias históricas que aún requieran ejecución y no solo lectura.

El trabajo en curso puede cerrarse, completarse, transferirse o mantenerse bajo el tratamiento ya definido por 003 y las fuentes propietarias; 010 no inventa una migración de WIP.

---

#### 12. Condición de operaciones asíncronas y resultados inciertos

No se declara elegibilidad mientras exista una operación reintentable, encolada, externa u offline con resultado incierto cuya resolución pueda requerir el proceso anterior.

La evaluación deberá demostrar, según aplicabilidad:

- identidad estable de la operación;
- estado durable y resultado recuperable;
- ausencia de duplicación por reenvío o cambio de ruta;
- conciliación de resultados desconocidos;
- cierre o tratamiento controlado de dead-letter, retry o replay;
- trazabilidad del efecto final.

Un timeout, ACK ausente o error de transporte no permite asumir que el efecto anterior no ocurrió.

---

#### 13. Condición de conciliación

Toda discrepancia relevante identificada por 005 o por las fuentes propietarias deberá estar resuelta antes de una conclusión favorable.

La evaluación distingue al menos:

- estructura y contrato;
- datos y fuente de verdad;
- efectos empresariales;
- permisos y seguridad;
- eventos y trabajo asíncrono;
- integraciones externas;
- evidencia y auditoría;
- trabajo en curso.

Una diferencia pendiente, una fuente competidora no resuelta o una conciliación manual sin procedencia y cierre bloquea el retiro de la superficie afectada.

---

#### 14. Condición de datos, migración y backfill

Cuando la superficie legacy participa en datos o transición física, deberá existir evidencia de que:

1. el destino aplicable fue materializado y reconciliado conforme a la disposición propietaria;
2. los backfills, replays o conversiones exigidos están cerrados con su evidencia;
3. no existen referencias huérfanas o divergencias conocidas que requieran la superficie anterior para interpretación o reparación;
4. la fuente de verdad posterior está definida y no compite con una copia legacy editable;
5. la historia efectiva, claves, crosswalks y procedencia necesarias permanecen preservadas;
6. el baseline remoto aplicable no conserva un gate de reconciliación abierto que bloquee retiro.

El retiro no puede usarse para ocultar drift, datos incompatibles o una transición incompleta.

---

#### 15. Condición de rollback, fallback y recovery

010 separa estrictamente retiro de recuperación.

Una superficie anterior no es elegible para retiro físico si la estrategia vigente de `DELIV-PKG-020`, 006 o una fuente propietaria todavía la requiere como:

- objetivo de rollback funcional;
- fallback operativo aprobado;
- mecanismo de recovery;
- herramienta necesaria para reconciliar efectos confirmados;
- interfaz necesaria para completar trabajo en curso;
- dependencia temporal para consumidores no migrados.

Cuando la estrategia de recuperación haya evolucionado hacia un objetivo seguro que ya no dependa de esa superficie, la evaluación podrá usar la nueva evidencia canónica. 010 no modifica por sí misma el rollback aprobado.

---

#### 16. Condición de observabilidad y trazabilidad

La evidencia de retiro deberá ser reproducible y atribuible a la instancia exacta evaluada.

Según la superficie, podrá consumir:

- métricas de uso y efecto;
- logs y trazas correlacionadas;
- auditoría de decisiones y mutaciones;
- conteos de consumidores o ejecuciones;
- eventos, colas y estados de retry;
- conciliaciones;
- resultados de pruebas y controles;
- evidencia de dependencias y referencias;
- historial de cambios de 007.

Toda evidencia deberá conservar fuente, ventana, ambiente, candidato o versión, alcance, responsable, resultado y referencia verificable. Una observación sin procedencia no cierra una condición.

---

#### 17. Condición de historia, auditoría y evidencia

Retirar el proceso anterior no autoriza destruir hechos históricos.

Antes de declarar elegibilidad deberá demostrarse que permanecen accesibles mediante el modelo aprobado, según aplicabilidad:

- hechos empresariales ya confirmados;
- identidad y versión originalmente utilizadas;
- auditoría de actor, tiempo, causa y resultado;
- documentos y evidencia sujetos a retención;
- relaciones y crosswalks necesarios para interpretar historia;
- registros de migración, conciliación, corrección y retiro;
- evidencia necesaria para soporte, investigación o cumplimiento.

La preservación puede quedar en estructuras distintas de la lógica legacy, pero no puede depender de una eliminación destructiva que vuelva irreconstruible la historia.

---

#### 18. Condición para objetos Supabase y contratos heredados

Cuando la superficie candidata incluya wrapper, alias, columna, vista, fallback, tabla, función, RPC, trigger, política, publicación, bucket u otro objeto gobernado por Supabase, la evaluación deberá reutilizar las puertas existentes del 04A.

Como mínimo, la evidencia aplicable debe cubrir:

- propietario y consumidores;
- condición de activación y evidencia de uso;
- paridad o reemplazo aprobado;
- dependencias SQL y externas cuando apliquen;
- datos existentes;
- estrategia de rollback;
- puerta explícita de retiro;
- ambiente y drift;
- conservación histórica y contractual.

La clasificación de un objeto como legacy o gobernado por Vento no constituye autorización de retiro.

---

#### 19. Condición para flags y controles temporales

Un flag, guardia o configuración temporal podrá ser evaluado para retiro únicamente según la expiración y condiciones ya definidas en `DELIV-PKG-018` y su tratamiento posterior.

Retirar un control temporal no debe:

- reabrir el camino legacy como autoridad;
- eliminar un kill switch todavía requerido;
- convertir una configuración temporal en permiso;
- dejar una ruta nueva activa sin su contrato permanente;
- romper rollback o recuperación todavía vigentes.

010 registra la dependencia; no cambia valores de configuración.

---

#### 20. Evidencia mínima por superficie

`required_legacy_retirement_evidence_set::<package_id>` deberá poder responder, para cada superficie evaluada:

| Dimensión           | Pregunta obligatoria                                  | Evidencia de fuente                |
| ------------------- | ----------------------------------------------------- | ---------------------------------- |
| identidad           | ¿qué superficie exacta se evalúa?                     | 003, 009, 014 y fuente propietaria |
| disposición         | ¿conservar, mover, fusionar, dividir o retirar?       | E3 / 009                           |
| salida de piloto    | ¿existe `APROBAR_SALIDA` vigente?                     | 009                                |
| autoridad           | ¿la superficie anterior dejó de ser autoritativa?     | 003, 004, 007                      |
| consumidores        | ¿quedan consumidores que dependan de ella?            | 009, 014, 015, observabilidad      |
| compatibilidad      | ¿sigue existiendo obligación temporal activa?         | 003, 009, contratos propietarios   |
| uso                 | ¿se cumplió la puerta `ZERO_CONFIRMED` cuando aplica? | 009, 017, evidencia ejecutada      |
| WIP                 | ¿queda trabajo en curso dependiente?                  | 003, 005, evidencia operativa      |
| async / externo     | ¿quedan retries, colas o resultados inciertos?        | 004, 005, 010 de paquetes, 017     |
| datos               | ¿migración, backfill y reconciliación están cerrados? | 009, 014..016, 04A                 |
| rollback / recovery | ¿la recuperación vigente aún necesita legacy?         | 006, 020                           |
| historia            | ¿datos, auditoría y evidencia permanecen preservados? | 007, 04A y fuentes propietarias    |
| drift               | ¿existe gate remoto o diferencia material abierta?    | 009, 014, fuentes técnicas         |
| ejecución física    | ¿hay identidad y propietario para la acción futura?   | 014, 015 y tarea propietaria       |

Una dimensión no aplicable requiere una fuente que justifique la no aplicabilidad.

---

#### 21. Regla documental de decisión

`legacy_retirement_decision::<package_id>` utiliza exclusivamente los siguientes resultados documentales:

- `RETIRO_ELEGIBLE` — todas las condiciones aplicables están cerradas con evidencia reproducible y no existe dependencia material activa que requiera la superficie anterior;
- `RETIRO_BLOQUEADO` — existe al menos una condición aplicable incumplida, no demostrada o todavía dependiente de legacy;
- `NO_APLICA` — la instancia no posee una superficie anterior susceptible de retiro o su disposición canónica exige conservación;
- `INVALIDADA` — cambió materialmente la identidad de candidato, ambiente, alcance, unidad, superficie, autoridad, disposición o una fuente de decisión necesaria.

`RETIRO_ELEGIBLE` significa **elegibilidad documental**. No equivale a `LOGICALLY_DISABLED`, `PHYSICALLY_REMOVED`, `POST_REMOVAL_OBSERVED` ni `RETIREMENT_CLOSED`.

No existe aprobación parcial por promedio. Una sola condición aplicable bloqueada impide `RETIRO_ELEGIBLE` para esa superficie.

---

#### 22. Causas mínimas de bloqueo

La evaluación queda `RETIRO_BLOQUEADO` cuando se presente al menos una de estas situaciones:

1. no existe `APROBAR_SALIDA` vigente de 009;
2. la superficie no tiene identidad verificable;
3. la disposición propietaria exige `CONSERVAR` y se intenta retirar;
4. la autoridad posterior no está demostrada;
5. el proceso anterior todavía puede producir hechos o efectos nuevos;
6. persiste un consumidor que requiere la superficie;
7. existe compatibilidad temporal activa dependiente de legacy;
8. `ZERO_CONFIRMED` aplica y no está demostrado;
9. existe WIP dependiente sin tratamiento cerrado;
10. existen retries, mensajes, callbacks o resultados inciertos sin conciliación;
11. existe drift o baseline bloqueante sin resolver;
12. migración, backfill, routing o crosswalk aplicable no está cerrado;
13. rollback, fallback o recovery vigente todavía requiere la superficie;
14. historia, auditoría, evidencia o retención dependen de una eliminación destructiva;
15. la observabilidad no permite atribuir uso y efecto a la superficie evaluada;
16. la identidad física o el propietario de la acción futura no están confirmados;
17. una fuente canónica posterior invalida la evaluación previa.

La causa de bloqueo debe conservar propietario y condición de salida. 010 no crea una solución técnica para forzar el desbloqueo.

---

#### 23. Tratamiento de `NO_APLICA`

`NO_APLICA` no puede usarse para evitar evidencia.

Solo procede cuando una fuente canónica demuestra una de estas condiciones:

- no existe proceso anterior para la unidad evaluada;
- la superficie pertenece a una modalidad sin transición legacy aplicable;
- la disposición propietaria es `CONSERVAR` y por ello no existe decisión de retiro en este alcance;
- la raíz o modalidad permanece fuera de la línea ejecutable actual y no posee una instancia real de piloto de la cual retirar un proceso anterior.

Una duda sobre identidad, consumidor, uso o dependencia produce bloqueo, no `NO_APLICA`.

---

#### 24. Invalidación y reevaluación

Una decisión de elegibilidad se invalida cuando cambie materialmente cualquiera de los siguientes elementos:

- candidato o revisión;
- ambiente;
- alcance autorizado;
- unidad u ola;
- proceso anterior o superficie objetivo;
- `TRANSITION_KEY` o disposición;
- autoridad posterior;
- consumidores o compatibilidad;
- estrategia de rollback/recovery;
- contrato de retención o evidencia;
- gate de baseline o drift;
- una fuente propietaria usada para justificar la decisión.

La invalidación no borra el expediente histórico. Una nueva evaluación deberá conservar referencia a la anterior y explicar la diferencia material.

---

#### 25. Contenido mínimo del manifiesto

`legacy_retirement_manifest::<package_id>` deberá poder conservar, como mínimo:

1. `package_id`;
2. `candidate_ref`;
3. `environment`;
4. `authorized_scope_ref`;
5. `activation_unit_ref` y `wave_ref` cuando apliquen;
6. referencia de la decisión `APROBAR_SALIDA` de 009;
7. referencia del `coexistence_manifest` de 003;
8. referencia de la superficie legacy;
9. `TRANSITION_KEY` o identidad propietaria equivalente cuando exista;
10. disposición canónica;
11. referencia de la superficie objetivo cuando aplique;
12. estado de autoridad anterior y posterior;
13. consumidores y dependencias relevantes;
14. compatibilidad todavía requerida o cerrada;
15. resultado de `ZERO_CONFIRMED` cuando aplique;
16. estado de WIP;
17. estado de operaciones asíncronas o externas inciertas;
18. estado de conciliación;
19. estado de migración/backfill/routing/crosswalk cuando aplique;
20. dependencia vigente de rollback/fallback/recovery;
21. evidencia de historia, auditoría y retención;
22. evidencia de observabilidad;
23. gates o drift pendientes;
24. resultado `legacy_retirement_decision`;
25. causas de bloqueo y propietarios cuando existan;
26. referencias de evidencia;
27. historial de invalidaciones y reevaluaciones.

El manifiesto es un expediente documental y no una orden de eliminación.

---

#### 26. Reutilización explícita del registro 04A

010 no introduce una semántica nueva de retiro. La evaluación se apoya, entre otros, en requisitos ya vigentes que protegen:

- retiro de rutas, componentes, funciones, scripts o endpoints únicamente con evidencia reproducible de consumidores y pruebas aplicables;
- compatibilidad de contratos y consumidores;
- rollback independiente sin pérdida de datos ni auditoría;
- wrappers, aliases, columnas, vistas y fallbacks legacy con propietario, consumidores, paridad, rollback y puerta explícita de retiro;
- objetos Supabase con mapa de propietarios, consumidores, datos, reemplazo y rollback antes de eliminación;
- operaciones idempotentes y reconciliables;
- trazabilidad de efectos y reintentos sin duplicación;
- captura única de datos empresariales, resolución de fuentes competidoras y preservación de evidencia;
- fuente de verdad, historia efectiva y linaje de datos.

010 materializa la aplicación de esas reglas al cierre de CUTOVER. No cambia su contenido, estado, secuencia ni relación.

---

#### 27. Cobertura de las 207 raíces y modalidades heredadas

La tarea no reclasifica el universo de paquetes ni altera las modalidades heredadas por CUTOVER.

Las 207 raíces continúan bajo sus identidades canónicas y solo pueden generar una evaluación de retiro cuando exista una instancia real y elegible de piloto. Los paquetes bloqueados, fuera de línea o sin proceso anterior real no adquieren elegibilidad por la aprobación documental de 010.

010 tampoco convierte una raíz `CONTROL`, `SHARED`, AURA, EXT o TALENTO en una transición directa. Cada una conserva sus gates y propietarios ya definidos.

No existe aprobación de retiro por lote de 207 raíces.

---

#### 28. Separación entre planificación y ejecución

010 es exclusivamente documental.

No ejecuta:

- retiro lógico;
- retiro físico;
- borrado de código o datos;
- eliminación de tablas, vistas, funciones, RPC, triggers, políticas, buckets o publicaciones;
- cambios de feature flags o configuración;
- despliegues;
- DDL o DML;
- migraciones o backfills;
- cambios de RLS o grants;
- activaciones o promociones;
- rollback, fallback, recovery o compensation;
- replays o purga de colas;
- conciliaciones físicas;
- cambios en Supabase remoto;
- cambios en consumidores externos.

Las acciones futuras permanecen en sus tareas de implementación y ejecución propietarias con la evidencia correspondiente.

---

#### 29. Handoff al bloque HYPERCARE

Al cerrar CUTOVER, 010 puede entregar a la fase HYPERCARE, sin ejecutar ninguna acción:

- superficies ya elegibles documentalmente pero todavía no retiradas;
- superficies bloqueadas y causa exacta;
- dependencias legacy todavía retenidas;
- obligaciones de observación, soporte, conciliación o recovery que continúan abiertas;
- evidencia de uso, autoridad y consumidores que debe mantenerse vigente;
- historial de decisiones e invalidaciones.

Este handoff no define inicio, duración ni salida de hypercare; esa materia comienza en `HYPERCARE-OPS-001`.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Fragmentos 04A afectados:** 0

**Justificación:** 010 no crea un comportamiento empresarial, técnico, de autorización, cálculo, persistencia, integración, retry, compatibilidad, rollback o retiro ejecutable nuevo. Define un expediente documental que aplica al cierre de CUTOVER las puertas y evidencias ya aprobadas por `DELIV-PKG-009`, CUTOVER previo y el registro 04A vigente. En particular, no altera `ZERO_CONFIRMED`, no introduce umbrales nuevos, no redefine consumidores, no crea una secuencia de retiro paralela y no autoriza eliminación física. Los comportamientos verificables subyacentes ya están protegidos por requisitos existentes de SHELL, SUPABASE, INTEGRATION, DATA y dominios propietarios.

---

#### 31. Criterios de aceptación documental

`CUTOVER-OPS-010` queda documentalmente completa cuando:

1. conserva `CUTOVER-OPS-009 → CUTOVER-OPS-010 → HYPERCARE-OPS-001`;
2. mantiene el retiro separado de la aprobación de salida del piloto;
3. exige una decisión vigente `APROBAR_SALIDA` antes de considerar elegibilidad;
4. no permite que `APROBAR_SALIDA` autorice retiro por sí sola;
5. materializa `legacy_retirement_scope`;
6. materializa `required_legacy_retirement_evidence_set`;
7. materializa `legacy_retirement_evaluation`;
8. materializa `legacy_retirement_decision`;
9. materializa `legacy_retirement_manifest`;
10. evalúa superficies por identidad verificable y no únicamente por paquete o aplicación;
11. conserva `TRANSITION_KEY` y disposición propietaria cuando existan;
12. no retira una disposición `CONSERVAR` por conveniencia;
13. reutiliza la lane de retiro ya definida en `DELIV-PKG-009`;
14. reutiliza `ZERO_CONFIRMED` sin crear otro umbral;
15. no acepta una búsqueda negativa de código como evidencia única de uso cero;
16. exige autoridad objetivo unívoca y ausencia de nueva autoridad legacy;
17. impide doble escritura o doble efecto durante el cierre;
18. exige cierre de consumidores y compatibilidad aplicables;
19. conserva compatibilidad todavía necesaria sin devolver autoridad al proceso anterior;
20. exige tratamiento cerrado del trabajo en curso;
21. exige resolución de operaciones asíncronas o externas con resultado incierto;
22. exige conciliaciones aplicables cerradas;
23. exige migración, backfill, routing o crosswalk cerrados cuando correspondan;
24. impide retirar una superficie todavía necesaria para rollback, fallback o recovery;
25. preserva hechos, historia, auditoría, evidencia y obligaciones de retención;
26. exige procedencia de observabilidad y evidencia;
27. exige identidad física y propietario antes de cualquier futura acción material;
28. distingue `RETIRO_ELEGIBLE` de retiro lógico, retiro físico y cierre de retiro;
29. una sola condición aplicable abierta produce `RETIRO_BLOQUEADO`;
30. `NO_APLICA` requiere fuente canónica y no puede ocultar una duda;
31. los cambios materiales invalidan la evaluación sin reescribir su historia;
32. no existe aprobación de retiro global por las 207 raíces;
33. AURA, EXT, TALENTO, shared y control conservan sus gates heredados;
34. el handoff a HYPERCARE conserva superficies elegibles, bloqueadas y dependencias retenidas sin definir la tarea siguiente;
35. no se ejecutan retiros, borrados, despliegues, configuración, DDL/DML, migraciones, backfills, rollback, recovery, conciliaciones ni operaciones remotas;
36. se crean cero requisitos de prueba, se modifican cero requisitos y se afectan cero fragmentos 04A.

La ejecución real conservará paquete, versión, ambiente, ventana, actor,
decisión y evidencia mediante `SHELL-CI-022`. Los defectos encontrados deberán
generar una tarea de corrección exacta y un requisito de regresión antes de
continuar o cerrar.

---

#### 32. Continuidad

**ÚLTIMA TAREA APROBADA**
`CUTOVER-OPS-009 — Definir autoridad y criterio para aprobar salida del piloto o exigir correcciones`

**TAREA ACTUAL APROBADA**
`CUTOVER-OPS-010 — Definir condiciones y evidencia para retirar el proceso anterior`

**SIGUIENTE TAREA RESERVADA**
`HYPERCARE-OPS-001 — Definir inicio, duración y salida del acompañamiento intensivo`
