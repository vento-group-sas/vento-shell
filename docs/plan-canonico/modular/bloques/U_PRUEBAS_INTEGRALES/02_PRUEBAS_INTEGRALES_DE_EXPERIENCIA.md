### MINI-BLOQUE — PRUEBAS INTEGRALES DE EXPERIENCIA

<!-- PLAN-SECTION-META:START -->
**Cobertura canónica:** `UX-QA-001` a `UX-QA-030` — 30 tareas.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:UX-QA -->
### Reconciliación topológica de UX-QA-001 a UX-QA-030

Cada paquete ejecuta su subconjunto de experiencia aplicable y el cierre integral ejecuta la certificación global final.

| modalidad | `PER_PACKAGE_AND_GLOBAL_FINAL` |
| gate temporal | `POST_E5_PACKAGE` |

### ✅ UX-QA-001 — El trabajador identifica su siguiente tarea

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-030 — Ejecutar prueba de regresión completa
**Tarea siguiente:** UX-QA-002 — La acción principal se encuentra sin capacitación
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que un trabajador puede identificar qué trabajo debe atender ahora o cuál es su siguiente obligación válida desde una superficie operativa, sin depender de nombres técnicos, listas planas, alertas, navegación exploratoria ni conocimiento previo del sistema, preservando contexto, ownership, prioridad explicable, accesibilidad y ausencia honesta de trabajo, sin ejecutar físicamente pruebas de usuario durante esta tarea documental
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de identificación del siguiente trabajo definido; las ejecuciones `UX-QA-001::<package_id>` y la certificación `UX-QA-001::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; esta tarea consume los contratos aprobados de foco y trabajo de `UX-BASE-002`, navegación/ownership aplicables y requisitos UX vigentes, pero no infiere que ningún package, aplicación, superficie, dispositivo, ambiente o cohorte humana ya haya superado la prueba
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas E2E, sesiones con usuarios, pruebas de accesibilidad sobre runtime, capturas de telemetría, mutaciones de datos, claims, cambios de prioridad, navegación real, Supabase, despliegues, configuración ni instrumentación nueva
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que, al entrar a una superficie operativa aplicable, el trabajador puede responder de forma correcta y verificable:

```text
¿QUÉ DEBO ATENDER AHORA?
```

O, cuando no exista trabajo actualmente ejecutable:

```text
¿CUÁL ES MI SIGUIENTE OBLIGACIÓN VÁLIDA O QUÉ CONDICIÓN IMPIDE TENERLA?
```

La prueba no certifica todavía que el trabajador comprenda por sí mismo el comando detallado para ejecutar la tarea ni todos los matices del estado del proceso. Esas responsabilidades permanecen separadas en `UX-QA-002` y `UX-QA-003`.

#### 2. Resultado canónico

`UX-QA-001` establece `UX-QA-NEXT-WORK-IDENTIFICATION-001@1.0.0`.

El contrato certifica conjuntamente que:

1. existe una fuente real de trabajo y no una tarea fabricada por presentación;
2. el foco principal corresponde al actor, contexto y momento vigentes;
3. la selección del foco es determinista, versionada y explicable;
4. el trabajador distingue el foco principal de obligaciones secundarias;
5. la interfaz no obliga a explorar menús, dashboards o aplicaciones para descubrir qué hacer;
6. una tarea de otro contexto no se convierte silenciosamente en foco ejecutable;
7. una tarea ya iniciada no es desplazada arbitrariamente por trabajo nuevo;
8. un estado sin trabajo es representado honestamente y no se rellena con configuración o administración;
9. SHELL o cualquier agregador conserva el owner de la capacidad y no convierte proyección en ejecución;
10. el foco sigue siendo identificable con accesibilidad, conectividad degradada y restricciones de dispositivo aplicables;
11. la evidencia permite medir identificación sin convertir velocidad aislada en mecanismo disciplinario;
12. la certificación puede terminar en `PASS`, `FAIL`, `BLOCKED` o `STALE` sin falso verde.

#### 3. Alcance exacto

Esta tarea define:

- qué significa identificar la siguiente tarea;
- qué es una fuente válida de foco;
- qué objetos no pueden presentarse como tarea;
- cómo se resuelve el foco cuando existe trabajo ejecutable;
- cómo se representa trabajo ya iniciado;
- cómo se diferencia foco principal de cola secundaria;
- cómo se trata trabajo de otro contexto;
- cómo se trata la ausencia válida de trabajo;
- cómo se demuestra prioridad explicable;
- cómo se protege el ownership de la aplicación propietaria;
- cómo se trata información stale u offline;
- cómo se protege la identificación en dispositivos compartidos;
- cómo se valida accesibilidad de la identificación;
- qué evidencia y métricas se conservan;
- la ejecución por package y la reconciliación `GLOBAL-FINAL`.

No define el copy detallado de la acción principal, el entendimiento del estado, la recuperación de errores, la relevancia por rol, los handoffs completos ni la concurrencia de claims como objetivos principales de esta tarea.

#### 4. Handoff recibido de `AUTH-QA-030`

`AUTH-QA-030` cierra documentalmente el minibloque de autorización y entrega a la certificación de experiencia las siguientes invariantes:

- un foco visible no concede autoridad;
- la autorización final sigue en servidor/RPC/RLS según corresponda;
- actor, territorio, turno, check-in, dispositivo y contexto no se inventan desde UI;
- una proyección o deep link no sustituye revalidación;
- evidencia stale no puede convertirse en `PASS`;
- una regresión crítica de autorización bloquea la certificación física aplicable.

`UX-QA-001` consume esas invariantes como precondiciones. No las redefine.

#### 5. Frontera con `UX-QA-002`

`UX-QA-001` pregunta:

```text
¿PUEDO IDENTIFICAR CUÁL ES EL TRABAJO QUE DEBO ATENDER?
```

`UX-QA-002` preguntará:

```text
¿PUEDO IDENTIFICAR LA ACCIÓN PRINCIPAL SIN CAPACITACIÓN ESPECIAL?
```

Por tanto, `UX-QA-001` puede comprobar que existe una acción primaria asociada al foco como señal estructural, pero no certifica todavía que su copy, verbo, objeto y resultado sean comprensibles sin capacitación.

#### 6. Frontera con `UX-QA-003`

`UX-QA-001` puede requerir señales mínimas de estado para distinguir tarea ejecutable, futura, bloqueada o inexistente.

No certifica todavía que el trabajador comprenda completamente el estado del proceso, sus transiciones o sus implicaciones. Esa responsabilidad pertenece a `UX-QA-003`.

#### 7. Definición de trabajador aplicable

Para esta tarea, `trabajador` es el actor humano que opera una superficie laboral u operativa con identidad y contexto válidos para el package evaluado.

No se considera trabajador a:

- la sesión técnica del dispositivo;
- una cuenta de servicio;
- el principal administrativo que presta infraestructura a un kiosco;
- el dispositivo físico;
- una simulación usada como si fuera autoridad real;
- un cliente de PASS actuando fuera de una superficie laboral explícita;
- un actor no autenticado cuando el proceso exige identidad humana.

#### 8. Definición de siguiente tarea

La siguiente tarea es la obligación de trabajo que debe ocupar el foco del actor de acuerdo con el estado vigente del proceso, su asignación o elegibilidad, el contexto válido y la política de prioridad aplicable.

Puede coincidir con:

- trabajo ya iniciado que debe continuar;
- una tarea asignada;
- una tarea ofrecida y aceptable;
- una obligación disponible para claim;
- una respuesta de seguridad o custodia crítica;
- una tarea de seguimiento cuya condición de reactivación ya se cumplió.

No equivale automáticamente a “la fila más nueva”, “la primera tarjeta de una API”, “la notificación más reciente” ni “la opción superior del menú”.

#### 9. Fuente canónica del foco

Todo foco deberá derivarse de un ítem de trabajo real y trazable.

La evidencia del package debe poder vincular como mínimo, cuando aplique:

```text
work_item_id
process_id
process_instance_id
step_or_stage
owner_app_code
resource_reference
assignment_or_eligibility
context_reference
state_and_version
next_action_reference
priority_policy_version
```

Una implementación puede especializar nombres físicos, pero la prueba debe poder demostrar equivalencia semántica con este contrato.

#### 10. Objetos que no constituyen tarea por sí solos

No se certificará como tarea actual o siguiente:

- una alerta sin obligación propia;
- una notificación;
- un mensaje informativo;
- una entrada de menú;
- un acceso rápido;
- una aplicación disponible;
- un registro reciente;
- un KPI;
- una métrica;
- un banner;
- una recomendación sin obligación gobernada;
- una pantalla abierta anteriormente;
- una preferencia local;
- un filtro;
- un enlace profundo sin work item resoluble.

Cualquiera de esos objetos puede originar navegación o derivar un ítem de trabajo, pero no reemplaza su identidad canónica.

#### 11. Una sola respuesta dominante a “qué hago ahora”

Cuando exista trabajo ejecutable, la superficie inicial no presentará múltiples obligaciones con el mismo peso visual como respuesta simultánea a “qué hago ahora”.

Debe existir:

```text
1 FOCO PRINCIPAL
+ OBLIGACIONES SECUNDARIAS DIFERENCIADAS
```

No se acepta:

```text
10 TARJETAS EQUIVALENTES
+ 10 CTAs PRIMARIOS
+ NINGUNA PRIORIZACIÓN EXPLICABLE
```

#### 12. Política de selección del foco

La selección deberá ser determinista, versionada y explicable.

Orden conceptual reutilizado:

```text
NIVEL 0 — seguridad, emergencia o custodia crítica
NIVEL 1 — trabajo ya en ejecución que debe continuar
NIVEL 2 — compromiso inmediato con cliente, producción, entrega o cadena
NIVEL 3 — tarea asignada con vencimiento o bloqueo de terceros
NIVEL 4 — tarea disponible priorizada por política
NIVEL 5 — mantenimiento, seguimiento o trabajo sin urgencia
```

La implementación puede materializar reglas más específicas por dominio, pero un `PASS` exige que el resultado sea reproducible y no dependa de un score opaco creado únicamente en frontend.

#### 13. Factores de prioridad permitidos

Dentro de la política aprobada pueden influir, cuando correspondan:

- seguridad y riesgo;
- custodia física;
- cliente o receptor esperando;
- dependencia que bloquea trabajo posterior;
- fecha requerida o ventana válida;
- SLA;
- secuencia de proceso;
- tarea ya iniciada;
- asignación directa;
- antigüedad y prevención de starvation;
- compatibilidad de estación;
- disponibilidad de recurso;
- coste de cambio de contexto;
- carga del actor o equipo;
- prioridad autorizada y su motivo.

#### 14. Factores que no pueden fabricar prioridad autoritativa

No bastan por sí solos:

- posición manual sin evento auditable;
- `created_at desc` como regla universal;
- nombre del rol;
- jerarquía verbal de una persona;
- valor económico aislado;
- color elegido en frontend;
- presión informal;
- alerta duplicada;
- preferencia personal persistida;
- orden de llegada de una respuesta de red.

#### 15. Explicabilidad

La persona debe poder comprender por qué el foco aparece primero sin exponer scores internos sensibles, datos de otros trabajadores ni reglas de seguridad explotables.

Ejemplos conceptuales válidos:

```text
Continúa esta recepción: ya la empezaste y conserva custodia pendiente.
```

```text
Prepara esta remisión ahora: la ventana de salida vence pronto.
```

La explicación no necesita revelar toda la lógica de ranking, pero debe ser coherente con la política aplicada.

#### 16. Continuidad del trabajo ya iniciado

Una tarea válida ya iniciada permanece como foco por defecto cuando conserva obligación activa y puede continuar de forma segura.

Trabajo nuevo no la desplaza únicamente por ser más reciente.

Si el foco cambia, la evidencia debe demostrar una causa permitida, por ejemplo:

- emergencia;
- pérdida de autorización;
- cambio de contexto;
- cancelación o supersesión;
- handoff válido;
- bloqueo que impide continuar;
- política explícita de preemption.

#### 17. Contexto compatible

Una tarea de otra sede, área, turno, vehículo, estación o contexto incompatible no se convierte en foco ejecutable solo porque sea visible para la cuenta.

Si debe mostrarse para preparación o traslado, se mantiene diferenciada y debe comunicar que existe una precondición anterior a la ejecución.

Cambiar contexto es un flujo explícito y revalidado; no un efecto lateral del clic sobre la tarjeta.

#### 18. Cola secundaria

Además del foco principal, las demás obligaciones se agrupan semánticamente como:

```text
AHORA
DESPUÉS
EN ESPERA
BLOQUEADAS
```

La prueba debe comprobar que la cola secundaria permite reconocer, cuando aplique:

- cuántas obligaciones existen;
- cuáles vencen pronto;
- cuáles requieren otro contexto;
- cuáles están esperando una condición;
- cuáles ya fueron tomadas;
- cuáles están bloqueadas y por qué.

No certifica todavía toda la semántica de estado; certifica que la cola no destruye la identificación del foco.

#### 19. Estado sin trabajo

`NO_WORK_AVAILABLE` es un resultado válido.

La interfaz no inventará trabajo ni usará administración/configuración como relleno cuando no exista una obligación operativa válida.

Se distinguirá, según el package:

- sin turno;
- sin check-in;
- sin contexto;
- sin tareas;
- solo tareas futuras;
- solo tareas bloqueadas;
- permiso insuficiente;
- estación incompatible;
- datos no sincronizados.

`UX-QA-001` certifica que el trabajador no recibe una falsa “siguiente tarea” en esos estados.

#### 20. Dispositivos compartidos

En una estación compartida se separan:

```text
COLA DE ESTACIÓN
ACTOR HUMANO ACTUAL
FOCO DEL ACTOR
SESIÓN TÉCNICA DEL DISPOSITIVO
```

Sin actor humano, solo puede existir una proyección mínima compatible con seguridad y privacidad.

Cambiar actor obliga a recalcular elegibilidad y foco; no se hereda la siguiente tarea del actor anterior.

#### 21. SHELL y aplicaciones propietarias

SHELL puede mostrar una proyección agregada del foco o navegar hacia la aplicación propietaria.

Siempre:

```text
SHELL PRESENTA O NAVEGA
≠ SHELL ADQUIERE OWNERSHIP FUNCIONAL
```

La aplicación propietaria revalida actor, autorización, contexto, recurso, estado y versión antes de ejecutar.

Abrir un work item no equivale a claim, inicio ni completion.

#### 22. Identificación cross-app

Cuando el foco vive en otra aplicación, el trabajador debe poder identificar de forma inequívoca:

- qué trabajo es;
- qué owner lo ejecuta;
- qué contexto material aplica;
- si puede abrirlo ahora;
- si existe una precondición pendiente.

El enlace transporta referencias, no autoridad.

#### 23. Datos stale y conectividad

Un foco derivado de caché debe declarar frescura compatible con el contrato.

Estados conceptuales reutilizados:

```text
FRESH
STALE_READ_ONLY
OFFLINE_EXECUTABLE_WITH_LEASE
OFFLINE_CAPTURE_ONLY
REFRESH_REQUIRED
```

Una proyección stale que ya no permite demostrar actor, contexto, versión o elegibilidad no puede certificarse como siguiente tarea ejecutable.

#### 24. Minimización de datos

La tarjeta de foco muestra solo la información necesaria para identificar y ejecutar el trabajo.

No se acepta usar como mecanismo de identificación una exposición innecesaria de:

- salario;
- diagnóstico;
- datos bancarios;
- expediente completo;
- notas internas;
- datos de otros actores;
- razones sensibles de prioridad;
- payloads técnicos completos.

#### 25. Accesibilidad de la identificación

El foco debe ser identificable mediante estructura y texto, no únicamente por color, sonido, vibración, animación o posición visual.

La validación aplicable debe considerar:

- jerarquía semántica;
- encabezado accesible;
- navegación por teclado donde aplique;
- lector de pantalla donde aplique;
- texto para prioridad/bloqueo;
- tamaño táctil adecuado a la estación;
- ausencia de señales exclusivamente cromáticas;
- foco visual predecible.

#### 26. Superficies y dispositivos aplicables

La ejecución por package deberá declarar qué superficies forman parte de la certificación.

El universo puede incluir, según el package:

- web de escritorio;
- tablet;
- kiosco;
- móvil;
- estación compartida;
- launcher o Hub;
- pantalla propietaria del proceso;
- proyección cross-app.

Una superficie no implementada o no aplicable se documenta; no se convierte automáticamente en `PASS`.

#### 27. Casos de referencia por aplicación

Sin sustituir el diseño específico de cada package, ejemplos de foco correcto incluyen:

- NEXO: preparar remisión, contar ubicación, recibir custodia o ubicar LPN;
- FOGO: ejecutar paso de lote o registrar rendimiento;
- ORIGO: verificar entrega o recepción física asignada;
- PULSO: atender pedido, cobrar o entregar;
- ANIMA: confirmar obligación propia o consultar siguiente acción laboral;
- VISO: responder una decisión o bloqueo concreto dentro del carril aplicable;
- NUMERA: atender una revisión o conciliación asignada;
- TALENTO: completar un requisito propio o atender un caso asignado en el carril correcto.

Un package solo certifica los ejemplos que realmente formen parte de su alcance.

#### 28. Métrica principal

La ejecución debe medir el tiempo necesario para **identificar** el foco correcto desde la entrada definida del escenario.

No se fija un número global arbitrario en esta tarea documental.

Cada package deberá declarar antes de ejecutar:

- cohorte o actor esperado;
- escenario;
- dispositivo/superficie;
- nivel de formación permitido;
- punto inicial;
- oráculo de respuesta correcta;
- umbral o criterio de aceptación aprobado por el package/piloto cuando corresponda.

Un umbral inventado después de observar resultados invalida la certificación.

#### 29. Métricas complementarias

Cuando correspondan se registran:

- aperturas incorrectas;
- selección de una tarea no elegible;
- cambios de foco;
- solicitudes de ayuda;
- tiempo hasta identificar;
- vencimientos omitidos;
- starvation;
- foco stale presentado;
- tareas de otro contexto confundidas como ejecutables;
- elección de administración/configuración como supuesto trabajo operativo.

Las métricas se interpretan con volumen, complejidad, recursos, formación y contexto.

#### 30. Prohibición de uso disciplinario aislado

Tiempo para identificar, aperturas incorrectas o solicitudes de ayuda no se usan de forma aislada para sancionar a una persona.

La evidencia de esta tarea evalúa la calidad del sistema y del flujo bajo un escenario controlado.

#### 31. Oráculo de identificación

Cada caso deberá contar con un oráculo previo que indique cuál debe ser el resultado correcto.

El oráculo puede ser:

```text
FOCUS = <work_item_id>
```

O:

```text
NO_WORK_AVAILABLE = TRUE
REASON_CLASS = <canonical_reason>
```

No se acepta declarar correcto el ítem que la UI mostró solo porque fue el que apareció.

#### 32. Evidencia mínima por caso

Cada caso conserva, cuando aplique:

- `package_id`;
- commit/build evaluado;
- escenario;
- actor/cohorte;
- superficie y dispositivo;
- contexto esperado;
- universo de work items de entrada;
- política/version de prioridad;
- foco esperado;
- foco presentado;
- resultado de identificación;
- tiempo de identificación;
- aperturas incorrectas;
- razón de fallo o bloqueo;
- evidencia accesible aplicable;
- timestamps;
- identificador de ejecución.

#### 33. Identidad de evidencia

Un `PASS` pertenece a una combinación concreta de:

```text
package_id
+ package version / commit
+ consumer build
+ fixture/data set
+ policy/catalog versions
+ scenario
+ surface/device class
+ actor/cohort definition
```

Cambiar materialmente cualquiera de esos elementos puede volver la evidencia `STALE`.

#### 34. Estados de ejecución

Estados permitidos para la instancia física futura:

- `PASS` — todos los casos obligatorios aplicables cumplen;
- `FAIL` — al menos un caso obligatorio produce resultado incorrecto;
- `BLOCKED` — falta una dependencia necesaria para ejecutar honestamente;
- `STALE` — la evidencia existente ya no representa el build, contrato o contexto actual.

No existe `PARTIAL_PASS` para habilitar cierre.

#### 35. Casos positivos mínimos

La ejecución por package incluirá, cuando apliquen:

1. una única tarea ejecutable;
2. trabajo ya iniciado que debe continuar;
3. varias tareas donde la política produce un foco inequívoco;
4. una tarea urgente legítima;
5. una tarea asignada al actor;
6. una tarea disponible para su cola autorizada;
7. cola secundaria con obligaciones futuras;
8. ausencia válida de trabajo;
9. proyección cross-app con owner explícito;
10. estación compartida después de identificar actor;
11. foco accesible mediante la modalidad aplicable;
12. tarea stale correctamente degradada a no ejecutable cuando corresponde.

#### 36. Casos negativos mínimos

La ejecución por package incluirá, cuando apliquen:

1. alerta sin work item;
2. notificación sin obligación;
3. menú presentado como tarea;
4. registro reciente presentado como foco;
5. KPI presentado como trabajo;
6. tarea de otra sede;
7. tarea de otra área;
8. tarea de otro turno;
9. tarea incompatible con estación;
10. tarea ya tomada por otro actor;
11. tarea cancelada;
12. tarea completada;
13. tarea sustituida;
14. tarea futura habilitada como si fuera ejecutable;
15. tarea bloqueada ocupando foco sin acción válida;
16. administración usada como relleno de `NO_WORK_AVAILABLE`;
17. foco heredado del actor anterior en dispositivo compartido;
18. foco derivado de filtro local;
19. foco derivado solo de `created_at`;
20. score frontend opaco que contradice la política;
21. deep link que intenta transferir autoridad;
22. foco stale presentado como vigente;
23. diez tarjetas con peso equivalente y sin foco dominante;
24. foco comunicado solo mediante color;
25. tarea cuyo owner no puede resolverse;
26. evidencia que no permite demostrar cuál era el universo de trabajo evaluado.

#### 37. Ejecución por package

Para cada `package_id` aplicable se materializará en el futuro:

```text
UX-QA-001::<package_id>
```

La instancia deberá registrar:

- package exacto;
- owner/repositorios consumidores;
- superficies incluidas;
- dispositivos incluidos;
- fixtures;
- política de foco;
- actores/cohortes;
- casos obligatorios;
- evidencia;
- resultado;
- bloqueadores;
- commit/build;
- vigencia de evidencia.

La aprobación documental actual no crea esas instancias.

#### 38. Certificación `GLOBAL-FINAL`

Cuando todas las instancias aplicables estén cerradas y la topología lo permita, podrá materializarse:

```text
UX-QA-001::GLOBAL-FINAL
```

El cierre global no promedia fallos entre packages.

Un package obligatorio en `FAIL`, `BLOCKED` o `STALE` impide declarar `PASS` global mientras siga dentro del alcance requerido.

#### 39. Regla de completitud

`PASS` exige:

```text
UNIVERSO DE SUPERFICIES APLICABLES DECLARADO
+ CASOS OBLIGATORIOS COMPLETOS
+ ORÁCULOS PREVIOS
+ FOCUS CORRECTO EN TODOS LOS CASOS OBLIGATORIOS
+ CERO TAREA FABRICADA
+ CERO CRUCE DE CONTEXTO PRESENTADO COMO EJECUTABLE
+ CERO EVIDENCIA STALE ACEPTADA COMO VIGENTE
+ EVIDENCIA REPRODUCIBLE
= PASS
```

#### 40. Dependencias de seguridad

Un defecto de experiencia no puede corregirse mostrando una tarea que el actor no está autorizado a ejecutar.

Si autorización/contexto impiden resolver un foco seguro, la experiencia debe mostrar el estado correspondiente y la instancia queda `BLOCKED` o prueba el caso negativo; nunca fabrica autoridad para satisfacer UX.

#### 41. No inferencia desde implementación parcial

No se declarará `PASS` porque:

- existe una tarjeta llamada “Siguiente tarea”;
- existe un componente `TaskCard`;
- un mock luce correcto;
- una demo fue entendida por una persona;
- el backend devuelve un primer elemento;
- un snapshot visual coincide;
- un build compila;
- una sola aplicación funciona;
- existe un test unitario de ranking.

La certificación exige la evidencia integral del package y sus superficies obligatorias.

#### 42. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea materializa una certificación ya exigida por cobertura UX vigente y no cambia el Registro Canónico de Requisitos de Prueba.

#### 43. Cobertura de prueba vigente reutilizada

Sin modificar 04A, esta tarea reutiliza principalmente:

- `TREQ-UX-001` — tarea actual, siguiente acción y estado identificables en superficies operativas;
- `TREQ-UX-009` — contexto operativo completo sin fabricar autoridad desde estado local;
- `TREQ-UX-024` — foco derivado de un work item real y no de alertas, menús o registros;
- `TREQ-UX-026` — selección determinista, versionada y explicable del foco;
- `TREQ-UX-029` — foco principal y colas `Ahora`, `Después`, `En espera` y `Bloqueadas`;
- `TREQ-UX-030` — una única acción primaria asociada al foco, sin autoridad fabricada en cliente;
- `TREQ-UX-038` — identificación accesible y no dependiente de una única señal sensorial;
- `TREQ-UX-039` — medición de identificación con contexto y guardas de equidad;
- `TREQ-UX-041` — navegación ordinaria sin etiquetas técnicas como mecanismo principal;
- `TREQ-UX-141` — golden path desde trabajo pertinente hasta resultado y siguiente paso.

Estas referencias son trazabilidad heredada y no una actualización del registro.

#### 44. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido incorporado ni sometido a la batería documental del checkout local de `UX-QA-001`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía `format --write`, `format --check`, quality, delivery, topología, TREQ ni batería global sobre la rama local de `UX-QA-001`. |
| REMOTA | PASS | Se verificaron el iniciador documental vigente, protocolo, contrato de entrega, manifest modular, continuidad, active sequence, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, owner de experiencia, marcador `UX-QA-001`, sucesora `UX-QA-002`, contrato `UX-BASE-002`, contratos SHELL de foco/navegación y el fragmento UX del Registro Canónico mediante blob completo. |
| OPERATIVA | NOT_EXECUTED | No se han ejecutado todavía sesiones controladas, pruebas con trabajadores, mediciones de tiempo para identificar, pruebas de accesibilidad ni escenarios de foco sobre packages materializados. |
| FÍSICA | NOT_EXECUTED | No se han materializado `UX-QA-001::<package_id>` ni `UX-QA-001::GLOBAL-FINAL`; la ejecución física permanece sujeta a `POST_E5_PACKAGE` y autorización física fuera de este carril. |

#### 45. Criterios de aceptación

- [ ] El título es exactamente `UX-QA-001 — El trabajador identifica su siguiente tarea`.
- [ ] La continuidad es `AUTH-QA-030 → UX-QA-001 → UX-QA-002`.
- [ ] La topología permanece `PER_PACKAGE_AND_GLOBAL_FINAL`.
- [ ] El gate físico permanece `POST_E5_PACKAGE`.
- [ ] La tarea no declara ejecución física inexistente.
- [ ] El foco deriva de un work item real y trazable.
- [ ] El worker puede distinguir un foco principal de obligaciones secundarias.
- [ ] La selección del foco es determinista, versionada y explicable.
- [ ] Trabajo ya iniciado conserva precedencia cuando sigue siendo válido.
- [ ] Una tarea incompatible con contexto no se presenta como ejecutable.
- [ ] `NO_WORK_AVAILABLE` se acepta sin inventar trabajo.
- [ ] Una alerta, menú, notificación o registro reciente no se presenta como tarea sin obligación real.
- [ ] SHELL no adquiere ownership por mostrar el foco.
- [ ] Navegar no produce claim, start ni completion.
- [ ] El cambio de actor en dispositivo compartido recalcula foco.
- [ ] La identificación no depende solo de color, posición, sonido o animación.
- [ ] La evidencia permite conocer el universo evaluado y el foco esperado.
- [ ] La medición de tiempo no introduce un umbral global inventado.
- [ ] Las métricas no se convierten en mecanismo disciplinario aislado.
- [ ] `UX-QA-002` conserva la certificación específica de comprensión de la acción principal.
- [ ] `UX-QA-003` conserva la certificación específica de comprensión del estado.
- [ ] La sección `Requisitos de prueba derivados` declara literalmente cero cambios y no contiene IDs TREQ.
- [ ] No se modifica 04A.

#### 46. Condiciones de fallo o bloqueo físico futuro

La instancia física futura no puede cerrar `PASS` si:

- no existe fuente canónica del foco;
- el oráculo se deriva de la misma salida bajo prueba;
- la UI muestra un ítem distinto al esperado en un caso obligatorio;
- no puede demostrarse actor/contexto aplicable;
- el foco proviene de una preferencia o filtro local no autoritativo;
- existe una tarea obligatoria de mayor precedencia omitida;
- una tarea ya iniciada es desplazada sin causa autorizada;
- la evidencia es stale;
- no puede reproducirse la política/version de selección;
- el package no declara sus superficies obligatorias;
- la prueba omite una clase de dispositivo incluida en el package sin justificación;
- existe un defecto crítico de autorización que impide ejecutar el escenario de forma segura.

#### 47. Handoff a `UX-QA-002`

`UX-QA-001` entrega a `UX-QA-002`:

- foco principal inequívoco;
- owner y contexto resolubles;
- work item real;
- prioridad y pertenencia explicables;
- una acción primaria asociada al foco;
- separación entre foco y cola secundaria;
- casos con y sin trabajo válidos;
- dispositivos/superficies declarados.

`UX-QA-002` podrá evaluar si la acción principal se entiende sin capacitación extensa sin reabrir la decisión sobre cuál es el trabajo que debe atenderse.

#### 48. Límites

Esta tarea no:

- implementa la pantalla inicial;
- crea work items;
- define nuevos estados de dominio;
- modifica algoritmos de prioridad runtime;
- crea claims;
- ejecuta claims;
- inicia tareas;
- completa tareas;
- cambia asignaciones;
- cambia turnos, check-ins, sedes o áreas;
- modifica autorización;
- modifica contexto;
- modifica datos;
- modifica Supabase;
- modifica navegación;
- crea instrumentación;
- define umbrales de productividad globales;
- ejecuta estudios con trabajadores;
- certifica `UX-QA-002`;
- certifica `UX-QA-003`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 49. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-030 — Ejecutar prueba de regresión completa`

**TAREA ACTUAL APROBADA**
`UX-QA-001 — El trabajador identifica su siguiente tarea`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-002 — La acción principal se encuentra sin capacitación`
### ✅ UX-QA-002 — La acción principal se encuentra sin capacitación

**Estado:** APROBADA
**Tarea anterior:** UX-QA-001 — El trabajador identifica su siguiente tarea
**Tarea siguiente:** UX-QA-003 — El trabajador comprende el estado del proceso
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que, una vez identificado el trabajo correcto, un trabajador apto para el proceso puede localizar y comprender la acción principal ordinaria sin capacitación específica sobre rutas, nombres técnicos, marcas de aplicación, atajos, códigos internos o memorización de la interfaz, preservando autorización, seguridad, accesibilidad, contexto, lenguaje humano y separación respecto de la comprensión completa del estado
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de descubrimiento y comprensión de la acción principal definido; las ejecuciones `UX-QA-002::<package_id>` y la certificación `UX-QA-002::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el foco ya resuelto por `UX-QA-001`, la gramática de acción de `UX-BASE-002`, el lenguaje y navegación de `UX-BASE-003` y la cobertura UX vigente, pero no infiere que ningún package, aplicación, superficie, dispositivo o cohorte humana ya haya superado la prueba
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan sesiones con trabajadores, pruebas E2E, mediciones de usabilidad, cambios de copy, componentes, rutas, autorización, datos, Supabase, despliegues, configuración, telemetría ni instrumentación nueva
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que, una vez resuelto correctamente el foco de trabajo, la persona puede responder de forma correcta y verificable:

```text
¿QUÉ ACCIÓN PRINCIPAL DEBO EJECUTAR SOBRE ESTE TRABAJO?
```

sin depender de una capacitación específica cuyo único objetivo sea enseñar dónde está el botón, qué ruta abrir, qué marca memorizar, qué código interpretar o qué secuencia de interfaz recordar.

La prueba no elimina la formación profesional, operativa, legal, de seguridad o de riesgo necesaria para realizar el trabajo real.

#### 2. Resultado canónico

`UX-QA-002` establece `UX-QA-PRIMARY-ACTION-DISCOVERABILITY-001@1.0.0`.

El contrato certifica conjuntamente que:

1. el foco evaluado ya fue resuelto por una fuente de trabajo válida;
2. existe una acción primaria inequívoca para ese foco cuando el estado permite actuar;
3. la acción utiliza lenguaje humano y no identificadores técnicos como instrucción ordinaria;
4. el trabajador puede localizarla sin memorizar rutas, menús, aplicaciones o atajos;
5. el trabajador puede comprender qué hará la acción antes de ejecutarla;
6. la etiqueta diferencia acciones empresariales que tienen efectos distintos;
7. una marca de aplicación no sustituye la instrucción humana;
8. abreviaturas o términos especializados no excluyen a quien no conoce el código interno;
9. la accesibilidad conserva la identidad de la acción sin depender de icono, color, posición o gesto implícito;
10. una confirmación, step-up o reautorización posterior no vuelve ambigua la acción primaria;
11. el cliente no obtiene autoridad por mostrar la acción ni por enviar un estado objetivo;
12. la evidencia permite medir descubrimiento y comprensión sin convertir velocidad aislada en mecanismo disciplinario;
13. la certificación puede terminar en `PASS`, `FAIL`, `BLOCKED` o `STALE` sin falso verde.

#### 3. Alcance exacto

Esta tarea define:

- qué significa encontrar la acción principal sin capacitación específica de interfaz;
- qué conocimiento previo puede asumirse y cuál invalida la prueba;
- cómo se diferencia descubrir una acción de comprender todo el estado del proceso;
- cómo se diferencia una acción primaria de navegación, ayuda, configuración y excepción;
- cómo se formula la acción en lenguaje humano;
- cómo se tratan verbos genéricos, marcas, códigos y abreviaturas;
- cómo se trata una acción cross-app;
- cómo se conserva autorización y revalidación;
- cómo se prueba accesibilidad y distintos dispositivos;
- qué cohortes y escenarios deben declararse;
- qué oráculo previo define la acción correcta;
- qué evidencia y métricas se conservan;
- la ejecución por package y la reconciliación `GLOBAL-FINAL`.

No certifica todavía que el trabajador comprenda completamente el estado del proceso, todos los bloqueos, todas las transiciones ni la recuperación de errores.

#### 4. Handoff recibido de `UX-QA-001`

`UX-QA-001` entrega a esta tarea:

- un foco principal inequívoco;
- un `work_item` real y trazable;
- owner funcional resoluble;
- contexto compatible;
- prioridad y pertenencia explicables;
- separación entre foco y cola secundaria;
- una referencia de acción primaria asociada al foco;
- casos con y sin trabajo válidos;
- superficies y dispositivos declarados.

`UX-QA-002` no vuelve a decidir cuál trabajo debe atenderse. Evalúa si, sobre el foco ya correcto, la persona encuentra y comprende la acción principal.

#### 5. Frontera con `UX-QA-001`

`UX-QA-001` responde:

```text
¿CUÁL ES EL TRABAJO QUE DEBO ATENDER?
```

`UX-QA-002` responde:

```text
¿QUÉ DEBO HACER AHORA SOBRE ESE TRABAJO?
```

Una interfaz puede acertar el foco y fallar esta tarea si obliga a adivinar el CTA, memorizar un menú o interpretar una etiqueta técnica.

#### 6. Frontera con `UX-QA-003`

`UX-QA-002` certifica la identidad y comprensión de la acción principal.

`UX-QA-003` certificará la comprensión del estado del proceso y sus implicaciones.

Por tanto, esta tarea puede comprobar que una acción no se presenta como disponible cuando estructuralmente no lo está, pero no absorbe la certificación completa de estados, transiciones, bloqueos o significado de cada estado.

#### 7. Significado canónico de "sin capacitación"

Para esta tarea, `sin capacitación` significa:

```text
SIN ENTRENAMIENTO ESPECÍFICO PARA DESCUBRIR LA INTERFAZ
```

No significa:

```text
SIN FORMACIÓN PARA EL TRABAJO REAL
```

La persona evaluada puede conocer su oficio, procedimiento empresarial, reglas de seguridad y responsabilidad laboral, pero no deberá necesitar que alguien le enseñe previamente:

- la ruta exacta del sistema;
- el nombre del repositorio o componente;
- el código de permiso;
- la tabla o RPC;
- el nombre técnico del estado;
- un atajo no visible;
- una marca de aplicación como sustituto de la instrucción;
- una secuencia arbitraria de clics que la interfaz no explique.

#### 8. Formación previa permitida

La prueba puede admitir, cuando el package lo declare antes de ejecutar:

- formación obligatoria del oficio;
- inducción de seguridad;
- capacitación regulatoria;
- habilitación para operar maquinaria o equipos;
- conocimiento del proceso empresarial real;
- familiaridad básica con el dispositivo;
- uso habitual de ayudas de accesibilidad;
- términos empresariales estables que hayan sido validados para la población objetivo.

La presencia de esa formación no permite entrenar específicamente la respuesta del caso bajo prueba.

#### 9. Formación que invalida la evidencia

La evidencia no certifica esta tarea si, antes del caso evaluado, se enseña al participante:

- qué botón seleccionar;
- dónde aparece el CTA;
- qué ruta o menú recorrer;
- qué aplicación abrir por nombre sin explicar la finalidad;
- qué icono representa la acción;
- qué abreviatura técnica debe memorizar;
- qué opción elegir en el escenario exacto;
- cuál es la respuesta esperada del oráculo.

Un tutorial mostrado inmediatamente antes del caso cuenta como capacitación específica si revela la solución.

#### 10. Definición de acción principal

La acción principal es el comando humano dominante que corresponde al siguiente efecto válido sobre el foco actual.

Debe responder, cuando sea necesario, a:

```text
VERBO HUMANO
+ OBJETO O RESULTADO
+ ALCANCE O CONTEXTO RELEVANTE
```

Ejemplos conceptuales:

```text
Preparar remisión
Confirmar recepción
Registrar conteo
Cobrar pedido
Entregar pedido
Continuar lote
Confirmar asistencia
Revisar solicitud
```

La etiqueta final depende del dominio y del estado vigente.

#### 11. Una sola acción primaria ordinaria

Cuando el foco permita una acción ordinaria dominante, la superficie no presentará varias acciones con el mismo peso como respuesta simultánea a "qué hago ahora".

Debe existir:

```text
1 ACCIÓN PRIMARIA
+ ACCIONES SECUNDARIAS DIFERENCIADAS
+ EXCEPCIONES FUERA DEL CAMINO ORDINARIO
```

No se acepta que confirmar, cancelar, configurar, auditar, forzar y ejecutar compitan visualmente como acciones equivalentes.

#### 12. Gramática de la acción

La acción deberá utilizar verbo más objeto y, cuando sea necesario para desambiguar, alcance o resultado.

No se consideran suficientes por sí solas etiquetas genéricas como:

```text
Abrir
Ver
Gestionar
Procesar
Aceptar
Continuar
Ir
Hacer
```

Una forma breve puede ser válida cuando el nombre accesible y el contexto inmediato forman una instrucción inequívoca sin depender de posición visual.

#### 13. Acción y efecto empresarial

La etiqueta debe anticipar el efecto empresarial real sin prometer más autoridad o resultado del que el comando puede producir.

No se utilizará una etiqueta que haga parecer equivalentes acciones materialmente distintas, por ejemplo:

```text
Preparar ≠ Despachar ≠ Recibir
Contar ≠ Validar ≠ Ajustar
Guardar ≠ Enviar ≠ Aprobar
Abrir ≠ Ejecutar
```

#### 14. La acción no se deriva del texto del cliente

El copy visible ayuda a la persona a comprender la acción, pero no define por sí mismo la transición autoritativa.

La aplicación propietaria deberá resolver el comando desde identidad, estado, versión, autorización y contexto vigentes.

No se acepta que el cliente envíe un estado objetivo o una etiqueta como autoridad para forzar la transición.

#### 15. Navegar no equivale a ejecutar

Un CTA que solamente navega deberá expresar el propósito de esa navegación cuando sea necesario.

Abrir otra pantalla, aplicación o modal no se contará como ejecución del trabajo salvo que el contrato del proceso defina realmente ese efecto.

```text
NAVEGAR
≠ CLAIM
≠ START
≠ COMPLETE
≠ APPROVE
```

#### 16. Marcas de aplicación

NEXO, FOGO, ORIGO, PULSO, VISO, NUMERA, ANIMA, TALENTO, PASS y SHELL pueden aparecer como contexto de producto.

No son una instrucción suficiente por sí solas.

No se certifica:

```text
Ir a NEXO
```

como equivalente a:

```text
Preparar la remisión seleccionada en NEXO
```

cuando el trabajador necesita conocer el resultado que se espera de él.

#### 17. Nombres técnicos prohibidos como instrucción ordinaria

La acción principal no dependerá de comprender como etiqueta primaria:

- nombre de tabla;
- schema;
- RPC;
- componente;
- ruta;
- permiso;
- enum;
- migration ID;
- nombre de repositorio;
- UUID;
- reason code;
- clave interna.

Esos elementos pueden existir en diagnóstico separado y autorizado.

#### 18. Términos especializados y abreviaturas

Un término especializado puede aparecer de forma primaria cuando:

1. representa un concepto empresarial real;
2. tiene significado estable;
3. es conocido o validado para la población objetivo;
4. no se confunde con una identidad técnica interna;
5. cuenta con contexto humano o divulgación progresiva cuando la población lo requiere.

No se asumirá que conocer `LOC`, `LPN`, `SKU` u otra sigla interna es requisito universal para descubrir una acción.

#### 19. Consistencia semántica

El mismo comando empresarial utilizará una identidad semántica coherente entre aplicaciones y superficies.

Acciones diferentes conservarán nombres diferentes aunque compartan pantalla, componente o ruta.

La personalización por rol, dispositivo o contexto puede cambiar orden, visibilidad o descripción, pero no puede hacer que la misma etiqueta represente efectos incompatibles.

#### 20. Acción cross-app

Cuando la acción continúe en otra aplicación, la persona deberá identificar primero el resultado humano y secundariamente el owner que lo ejecutará.

El handoff puede transportar referencias necesarias, pero no permiso, actor autoritativo, token, estado objetivo ni autoridad de ejecución.

El destino revalida el comando antes de cualquier efecto.

#### 21. Acciones sensibles y confirmaciones

Una acción principal puede requerir después:

- confirmación;
- step-up;
- firma;
- doble control;
- segregación;
- reautorización;
- lectura de consecuencia;
- captura de evidencia.

La existencia de esos gates no permite ocultar o volver ambigua la intención primaria.

`UX-QA-002` certifica que la persona entiende qué acción intenta iniciar; no elimina controles posteriores.

#### 22. Acción no disponible

Si la acción esperada no puede ejecutarse, la superficie no deberá fabricar una alternativa peligrosa solo para mantener un CTA activo.

La prueba puede comprobar que la acción pertinente sigue siendo identificable y que no se ofrece una acción falsa.

La comprensión completa del motivo, estado y transición pertenece a `UX-QA-003`; la recuperación detallada pertenece a tareas posteriores del minibloque.

#### 23. Configuración y excepciones

Configuración, auditoría, soporte, override y acciones excepcionales no competirán al mismo nivel con la acción ordinaria.

Una acción excepcional no se convierte en primaria únicamente porque exista técnicamente o porque el actor tenga permiso para usarla.

#### 24. Accesibilidad de la acción

La acción principal deberá conservar identidad comprensible mediante:

- texto visible o nombre accesible completo;
- jerarquía estructural;
- foco de teclado donde aplique;
- lector de pantalla donde aplique;
- objetivo táctil adecuado;
- orden de navegación predecible;
- señales redundantes cuando exista urgencia o restricción.

No dependerá únicamente de:

- color;
- posición;
- icono;
- sonido;
- vibración;
- animación;
- gesto oculto;
- hover no disponible en el dispositivo.

#### 25. Dispositivos y superficies aplicables

La ejecución por package declarará las superficies incluidas, que pueden abarcar:

- web de escritorio;
- tablet;
- kiosco;
- móvil;
- estación compartida;
- launcher o Hub;
- superficie propietaria del proceso;
- salto cross-app.

Una acción clara en escritorio no certifica automáticamente móvil, kiosco o lector de pantalla.

#### 26. Actor de prueba

La cohorte debe representar a una persona autorizable para el proceso evaluado y suficientemente preparada para el trabajo real.

La prueba no mezclará:

```text
NO CONOCE LA INTERFAZ
```

con:

```text
NO SABE HACER EL TRABAJO
```

Cuando el proceso exija formación obligatoria, la cohorte deberá cumplirla antes de evaluar descubrimiento de interfaz.

#### 27. Punto inicial del caso

Cada escenario declarará antes de ejecutarse:

- package;
- build o versión;
- actor/cohorte;
- formación permitida;
- foco ya resuelto;
- superficie y dispositivo;
- contexto;
- punto exacto de entrada;
- acción esperada;
- ayudas permitidas;
- criterio de aceptación.

El caso no comenzará después de que un facilitador haya señalado el control correcto.

#### 28. Oráculo previo

Cada caso contará con un oráculo definido antes de observar al participante.

Forma conceptual:

```text
FOCUS_ID = referencia canónica del foco
PRIMARY_ACTION_ID = identidad semántica de la acción
EXPECTED_HUMAN_INTENT = intención humana esperada
OWNER_APP = aplicación propietaria
```

No se acepta declarar correcta la acción que el trabajador eligió únicamente porque fue la que eligió.

#### 29. Ayuda durante la prueba

La ayuda se clasificará, como mínimo, en:

- ninguna;
- aclaración del escenario sin revelar la acción;
- ayuda de accesibilidad habitual;
- explicación de término empresarial ya permitido;
- pista de navegación;
- señalamiento del CTA;
- instrucción directa de la respuesta.

Una pista de navegación, señalamiento del CTA o instrucción directa impide contar ese caso como descubrimiento autónomo.

#### 30. Casos positivos mínimos

La ejecución por package incluirá, cuando apliquen:

1. acción primaria ordinaria visible sobre un foco correcto;
2. acción cuya etiqueta exige verbo y objeto para no ser ambigua;
3. acción cross-app con finalidad humana explícita;
4. acción sensible que después exige confirmación o step-up;
5. acción con término especializado acompañado por contexto humano;
6. acción accesible por teclado;
7. acción comprensible por lector de pantalla;
8. acción en superficie táctil;
9. mismo comando con significado consistente entre dos superficies;
10. persona nueva en la interfaz pero preparada para el proceso real;
11. persona experimentada usada como cohorte comparativa cuando el package lo requiera.

#### 31. Casos negativos mínimos

La ejecución por package incluirá, cuando apliquen:

1. CTA genérico sin objeto ni contexto suficiente;
2. icono sin nombre accesible;
3. acción ordinaria oculta en menú de excepciones;
4. tres o más CTAs con el mismo peso visual y sin dominante;
5. instrucción basada solo en nombre de aplicación;
6. permiso, enum, ruta o código técnico usado como etiqueta principal;
7. abreviatura no validada como única instrucción;
8. mismo label que ejecuta efectos distintos según actor;
9. labels distintos para el mismo efecto sin motivo contractual;
10. navegación que se presenta como ejecución completada;
11. CTA visible que intenta enviar un estado objetivo autoritativo desde cliente;
12. acción que solo puede descubrirse por hover;
13. acción que depende solo de color o posición;
14. acción que requiere memorizar una ruta no expresada;
15. tutorial previo que revela la respuesta del escenario;
16. salto cross-app que solo dice la marca de destino;
17. acción sensible cuyo texto oculta su impacto real;
18. control que parece ejecutable aunque el owner no pueda resolverlo de forma segura;
19. superficie que cambia el significado de la misma acción entre escritorio y móvil;
20. participante que necesita que el facilitador señale el CTA para continuar.

#### 32. Métricas principales

La ejecución registrará, cuando correspondan:

- identificación correcta de la acción primaria;
- primera selección correcta;
- tiempo hasta identificar la acción;
- tiempo hasta iniciar la acción cuando sea seguro medirlo;
- aperturas incorrectas;
- número de pasos de navegación previos;
- solicitudes de ayuda;
- tipo de ayuda requerida;
- dependencia de término técnico;
- abandono;
- acción equivocada seleccionada;
- diferencia entre cohortes nuevas y experimentadas.

No se fija un umbral global arbitrario en esta tarea documental.

#### 33. Umbral y criterio de aceptación por package

Cada package declarará su criterio antes de ejecutar la prueba.

El criterio deberá considerar:

- riesgo de la acción;
- frecuencia;
- dispositivo;
- complejidad del proceso;
- formación obligatoria;
- población objetivo;
- accesibilidad;
- contexto físico;
- consecuencias de una selección incorrecta.

Un umbral creado después de ver los resultados invalida la certificación.

#### 34. Prohibición de uso disciplinario aislado

Tiempo para identificar, número de errores, solicitudes de ayuda o familiaridad con una marca no se usarán aisladamente para sancionar a una persona.

La evidencia evalúa la calidad del sistema y del flujo bajo un escenario controlado.

#### 35. Evidencia mínima por caso

Cada caso conservará, cuando aplique:

- `package_id`;
- commit/build evaluado;
- escenario;
- actor/cohorte;
- formación permitida;
- superficie y dispositivo;
- foco esperado;
- identidad de acción esperada;
- etiqueta visible;
- nombre accesible;
- owner de la acción;
- acción seleccionada;
- primera selección correcta o incorrecta;
- tiempo de identificación;
- pasos previos;
- ayuda solicitada;
- tipo de ayuda;
- términos que generaron duda;
- resultado;
- razón de fallo o bloqueo;
- timestamps;
- identificador de ejecución.

#### 36. Identidad de evidencia

Un `PASS` pertenece a una combinación concreta de:

```text
package_id
+ package version / commit
+ consumer build
+ fixture/data set
+ scenario
+ surface/device class
+ actor/cohort definition
+ training allowance
+ terminology version
```

Cambiar materialmente cualquiera de esos elementos puede volver la evidencia `STALE`.

#### 37. Estados de ejecución

Estados permitidos para la instancia física futura:

- `PASS` — todos los casos obligatorios aplicables cumplen;
- `FAIL` — al menos un caso obligatorio exige ayuda prohibida, produce una acción incorrecta o no permite comprender la acción primaria;
- `BLOCKED` — falta una dependencia necesaria para ejecutar honestamente;
- `STALE` — la evidencia existente ya no representa el build, copy, contrato, dispositivo, cohorte o contexto actual.

No existe `PARTIAL_PASS` para habilitar cierre.

#### 38. Ejecución por package

Para cada `package_id` aplicable se materializará en el futuro una instancia con identidad conceptual:

```text
UX-QA-002::<package_id>
```

La instancia deberá registrar:

- package exacto;
- owner/repositorios consumidores;
- superficies incluidas;
- dispositivos incluidos;
- actores/cohortes;
- formación permitida;
- foco y acción oracle;
- casos obligatorios;
- evidencia;
- resultado;
- bloqueadores;
- commit/build;
- vigencia de evidencia.

La aprobación documental actual no crea esas instancias.

#### 39. Certificación `GLOBAL-FINAL`

Cuando todas las instancias aplicables estén cerradas y la topología lo permita, podrá materializarse la certificación global final de `UX-QA-002`.

El cierre global no promedia fallos entre packages.

Un package obligatorio en `FAIL`, `BLOCKED` o `STALE` impide declarar `PASS` global mientras siga dentro del alcance requerido.

#### 40. Regla de completitud

`PASS` exige:

```text
FOCO CORRECTO YA RESUELTO
+ ACCIÓN PRIMARIA ORACLE DEFINIDA ANTES DE LA PRUEBA
+ COHORTE Y FORMACIÓN PERMITIDA DECLARADAS
+ ACCIÓN EN LENGUAJE HUMANO
+ CERO DEPENDENCIA OBLIGATORIA DE CÓDIGO TÉCNICO
+ CERO MEMORIZACIÓN DE NAVEGACIÓN COMO REQUISITO
+ CERO AYUDA QUE REVELE LA RESPUESTA EN CASOS AUTÓNOMOS
+ ACCESIBILIDAD APLICABLE
+ REAUTORIZACIÓN CONSERVADA
+ EVIDENCIA REPRODUCIBLE
= PASS
```

#### 41. Seguridad y autorización

Una interfaz más comprensible no puede ampliar autoridad.

Si la acción no es válida para el actor, recurso, estado o contexto, la experiencia debe respetar el resultado autoritativo.

La prueba no puede declarar `PASS` porque un CTA sea claro si ese CTA concede una operación que el servidor no debería permitir.

#### 42. No inferencia desde implementación parcial

No se declarará `PASS` porque:

- existe un botón grande;
- el CTA está primero en el DOM;
- un diseñador entiende el copy;
- una demo fue comprendida por una persona experta;
- el botón tiene un icono conocido;
- el nombre de la aplicación es visible;
- existe un tooltip;
- un snapshot visual luce limpio;
- un test unitario valida el componente;
- la acción funciona en una sola superficie;
- el build compila.

La certificación exige evidencia integral del package y sus casos obligatorios.

#### 43. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea materializa una certificación ya exigida por cobertura UX vigente y no cambia el Registro Canónico de Requisitos de Prueba.

#### 44. Cobertura de prueba vigente reutilizada

Sin modificar 04A, esta tarea reutiliza principalmente:

- `TREQ-UX-001` — tarea, acción principal y estado identificables sin capacitación extensa;
- `TREQ-UX-024` — foco derivado de un work item real;
- `TREQ-UX-029` — foco dominante y obligaciones secundarias diferenciadas;
- `TREQ-UX-030` — acción primaria humana y reautorización propietaria;
- `TREQ-UX-038` — accesibilidad y señales redundantes;
- `TREQ-UX-039` — métricas interpretadas con formación y contexto, sin uso disciplinario aislado;
- `TREQ-UX-041` — exclusión de identificadores técnicos como etiquetas ordinarias;
- `TREQ-UX-043` — gramática diferenciada y verbo más objeto para acciones;
- `TREQ-UX-044` — términos especializados y abreviaturas validados con trabajadores;
- `TREQ-UX-045` — consistencia semántica entre aplicaciones;
- `TREQ-UX-046` — marca de aplicación acompañada por finalidad humana;
- `TREQ-UX-052` — búsqueda y aliases sin exigir conocimiento técnico;
- `TREQ-UX-056` — nombres accesibles completos y ausencia de dependencia de icono o color.

Estas referencias son trazabilidad heredada y no una actualización del registro.

#### 45. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido incorporado ni sometido a la batería documental del checkout local de `UX-QA-002`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía `format --write`, `format --check`, quality, delivery, topología, TREQ ni batería global sobre la rama local de `UX-QA-002`. |
| REMOTA | PASS | Se verificaron protocolo, contrato de entrega, manifest modular, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, archivo propietario, marcadores `UX-QA-002` y `UX-QA-003`, contratos `UX-BASE-002` y `UX-BASE-003`, Registro Canónico UX y validadores documentales aplicables; el handoff inmediato proviene además del artefacto completo aprobado de `UX-QA-001` suministrado para trabajo documental adelantado. |
| OPERATIVA | NOT_EXECUTED | No se han ejecutado todavía sesiones controladas con trabajadores, mediciones de descubrimiento, pruebas de comprensión de CTA ni escenarios de ayuda sobre packages materializados. |
| FÍSICA | NOT_EXECUTED | No se han materializado instancias físicas de `UX-QA-002` ni su certificación global final; la ejecución física permanece sujeta a `POST_E5_PACKAGE` y autorización física fuera de este carril. |

#### 46. Criterios de aceptación

- [ ] El título es exactamente `UX-QA-002 — La acción principal se encuentra sin capacitación`.
- [ ] La continuidad es `UX-QA-001 → UX-QA-002 → UX-QA-003`.
- [ ] La topología permanece `PER_PACKAGE_AND_GLOBAL_FINAL`.
- [ ] El gate físico permanece `POST_E5_PACKAGE`.
- [ ] La tarea no declara ejecución física inexistente.
- [ ] `sin capacitación` queda acotado a descubrimiento y comprensión de interfaz, no a eliminación de formación profesional, legal o de seguridad.
- [ ] La acción primaria usa lenguaje humano y no exige memorizar rutas o identificadores técnicos.
- [ ] La acción expresa verbo y objeto y agrega alcance cuando sea necesario para desambiguar.
- [ ] Existe una acción primaria ordinaria dominante cuando el foco permite actuar.
- [ ] Navegar no se confunde con claim, start, complete o approve.
- [ ] La marca de aplicación no sustituye la instrucción humana.
- [ ] Términos especializados y abreviaturas no se asumen universales sin validación.
- [ ] La personalización no cambia silenciosamente el significado de una acción.
- [ ] Los saltos cross-app conservan finalidad humana y revalidación.
- [ ] Confirmaciones y step-up no se eliminan para hacer más simple el flujo.
- [ ] La acción no obtiene autoridad del cliente ni del copy visible.
- [ ] La acción es identificable por medios accesibles aplicables.
- [ ] La cohorte de prueba diferencia desconocimiento de la interfaz de falta de competencia para el trabajo real.
- [ ] La formación permitida se declara antes de ejecutar.
- [ ] El oráculo de acción se define antes de observar al participante.
- [ ] Ayuda que revela el CTA no se cuenta como descubrimiento autónomo.
- [ ] No se crea un umbral global arbitrario después de observar resultados.
- [ ] Las métricas no se usan aisladamente para sancionar trabajadores.
- [ ] `UX-QA-003` conserva la certificación específica de comprensión del estado.
- [ ] La sección `Requisitos de prueba derivados` declara literalmente cero cambios y no contiene IDs TREQ.
- [ ] No se modifica 04A.

#### 47. Condiciones de fallo o bloqueo físico futuro

La instancia física futura no puede cerrar `PASS` si:

- la acción oracle no fue definida antes del caso;
- el foco de entrada no puede demostrarse;
- el participante requiere que le señalen el CTA;
- la respuesta depende de memorizar una ruta o marca;
- la acción se expresa solo con un código técnico no validado;
- una etiqueta genérica permite más de una interpretación material;
- el mismo label ejecuta efectos incompatibles;
- una acción distinta usa un label engañosamente equivalente;
- el CTA es inaccesible en una modalidad obligatoria;
- un salto cross-app pierde la finalidad humana;
- la prueba elimina una confirmación o control de seguridad para facilitar el éxito;
- el cliente intenta definir la transición autoritativa desde copy o estado objetivo;
- la cohorte carece de formación obligatoria del trabajo real y eso contamina el resultado;
- el participante fue entrenado con la respuesta exacta del caso;
- el package no declara sus superficies obligatorias;
- la evidencia no permite distinguir descubrimiento autónomo de ayuda del facilitador;
- la evidencia es `STALE`.

#### 48. Handoff a `UX-QA-003`

`UX-QA-002` entrega a `UX-QA-003`:

- foco ya identificado;
- acción primaria inequívoca;
- identidad semántica de la acción;
- copy humano o nombre accesible;
- owner funcional;
- contexto de ejecución;
- reautorización preservada;
- formación permitida declarada;
- superficie/dispositivo declarados;
- casos donde la acción está disponible y casos donde no debe fabricarse.

`UX-QA-003` podrá evaluar si el trabajador comprende el estado actual y sus implicaciones sin reabrir la decisión sobre cuál es el trabajo ni cuál es la acción principal correspondiente.

#### 49. Límites

Esta tarea no:

- rediseña pantallas;
- cambia copy en runtime;
- crea rutas;
- crea componentes;
- implementa navegación;
- cambia prioridades;
- crea work items;
- cambia estados de dominio;
- ejecuta claims;
- inicia o completa trabajo;
- modifica autorización;
- elimina confirmaciones;
- elimina step-up;
- elimina formación obligatoria;
- certifica competencia laboral;
- certifica seguridad ocupacional;
- modifica datos;
- modifica Supabase;
- modifica telemetría;
- ejecuta estudios con trabajadores;
- define un umbral universal de velocidad;
- certifica `UX-QA-003`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 50. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-001 — El trabajador identifica su siguiente tarea`

**TAREA ACTUAL APROBADA**
`UX-QA-002 — La acción principal se encuentra sin capacitación`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-003 — El trabajador comprende el estado del proceso`
### ✅ UX-QA-003 — El trabajador comprende el estado del proceso

**Estado:** APROBADA
**Tarea anterior:** UX-QA-002 — La acción principal se encuentra sin capacitación
**Tarea siguiente:** UX-QA-004 — Los errores indican cómo continuar
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que, una vez identificado el trabajo correcto y comprendida su acción principal, un trabajador puede comprender el estado actual del proceso, distinguir qué ya ocurrió, qué sigue pendiente, quién debe actuar, qué puede hacerse ahora y si la información está confirmada, pendiente, bloqueada, stale, offline o en conflicto, sin depender de enums, reason codes, colores, nombres técnicos ni inferencias del frontend, preservando fuente de verdad, autorización, accesibilidad, contexto, ownership y la frontera con la recuperación detallada de errores
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de comprensión del estado del proceso definido; las ejecuciones `UX-QA-003::<package_id>` y la certificación `UX-QA-003::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el foco ya resuelto por `UX-QA-001`, la acción primaria ya resuelta por `UX-QA-002`, las proyecciones humanas y contratos de estado aprobados en E2 y la cobertura UX vigente, pero no infiere que ningún package, aplicación, superficie, dispositivo o cohorte humana ya haya superado la prueba
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan sesiones con trabajadores, pruebas E2E, mediciones de comprensión, cambios de estados de dominio, copy, componentes, rutas, autorización, datos, Supabase, despliegues, configuración, telemetría ni instrumentación nueva
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que, una vez identificado el trabajo correcto y comprendida la acción principal correspondiente, la persona puede responder de forma correcta y verificable:

```text
¿EN QUÉ ESTADO ESTÁ ESTE PROCESO AHORA?
¿QUÉ YA OCURRIÓ?
¿QUÉ SIGUE PENDIENTE?
¿QUIÉN DEBE ACTUAR?
¿QUÉ PUEDO HACER AHORA?
¿LO QUE VEO ESTÁ CONFIRMADO Y VIGENTE?
```

sin depender de interpretar enums, reason codes, colores aislados, nombres técnicos, efectos visuales ambiguos ni conocimiento interno del sistema.

#### 2. Resultado canónico

`UX-QA-003` establece `UX-QA-PROCESS-STATE-COMPREHENSION-001@1.0.0`.

El contrato certifica conjuntamente que:

1. el foco evaluado ya fue resuelto correctamente;
2. la acción primaria ya fue identificada y comprendida cuando existe;
3. el estado visible corresponde a una fuente autoritativa o declara claramente su naturaleza provisional;
4. la persona distingue lo confirmado de lo pendiente;
5. la persona distingue estado del proceso, disponibilidad de acción, autorización y conectividad;
6. la persona reconoce qué parte ya ocurrió y cuál todavía no;
7. la persona reconoce quién conserva la responsabilidad o quién debe actuar;
8. una espera no se confunde con un bloqueo;
9. una denegación no se presenta como simple espera;
10. un fallo técnico no se presenta como estado empresarial consumado;
11. una operación local pendiente de sincronización no se presenta como resultado confirmado;
12. un estado stale, desconocido o en conflicto no se presenta como vigente;
13. un proceso completado, cancelado o sustituido no se presenta como trabajo ejecutable;
14. la proyección humana conserva diferencias materiales entre estados;
15. la comprensión no depende únicamente de color, icono, animación, sonido o posición;
16. la evidencia permite medir comprensión sin convertir errores aislados en mecanismo disciplinario;
17. la certificación puede terminar en `PASS`, `FAIL`, `BLOCKED` o `STALE` sin falso verde.

#### 3. Alcance exacto

Esta tarea define:

- qué significa comprender el estado de un proceso;
- qué dimensiones mínimas debe poder explicar la persona;
- cómo se separan estado del proceso, acción, autorización y conectividad;
- cómo se distingue confirmado, pendiente y local;
- cómo se representa responsabilidad y siguiente actor;
- cómo se distinguen espera, bloqueo, denegación, conflicto y fallo técnico;
- cómo se tratan estados sin trabajo, sin contexto o sin permiso;
- cómo se trata frescura y evidencia stale;
- cómo se trata trabajo offline o pendiente de sincronización;
- cómo se conserva comprensión en saltos cross-app;
- cómo se conserva accesibilidad;
- qué escenarios, cohortes y oráculos se declaran;
- qué evidencia y métricas se conservan;
- la ejecución por package y la reconciliación `GLOBAL-FINAL`.

No define todavía la recuperación detallada de errores, la redacción completa de instrucciones de reparación, el escalamiento operativo completo ni la lógica de retry. Esas responsabilidades permanecen en `UX-QA-004` y tareas posteriores del minibloque.

#### 4. Handoff recibido de `UX-QA-002`

`UX-QA-002` entrega a esta tarea:

- foco ya identificado;
- acción primaria inequívoca;
- identidad semántica de la acción;
- copy humano o nombre accesible;
- owner funcional;
- contexto de ejecución;
- reautorización preservada;
- formación permitida declarada;
- superficie y dispositivo declarados;
- casos donde la acción está disponible y casos donde no debe fabricarse.

`UX-QA-003` no vuelve a decidir cuál trabajo debe atenderse ni cuál es la acción primaria. Evalúa si la persona comprende el estado que hace válida, pendiente, imposible, finalizada o incierta esa acción.

#### 5. Frontera con `UX-QA-001`

`UX-QA-001` responde:

```text
¿CUÁL ES EL TRABAJO QUE DEBO ATENDER?
```

`UX-QA-003` no vuelve a priorizar ni seleccionar ese trabajo.

Una interfaz puede acertar el foco y aun fallar esta tarea si no permite saber si el trabajo está listo, en curso, esperando, bloqueado, completado, pendiente de confirmación o ya no vigente.

#### 6. Frontera con `UX-QA-002`

`UX-QA-002` responde:

```text
¿QUÉ ACCIÓN PRINCIPAL DEBO EJECUTAR?
```

`UX-QA-003` responde:

```text
¿QUÉ SIGNIFICA EL ESTADO ACTUAL Y QUÉ IMPLICA PARA ESA ACCIÓN?
```

Una acción puede ser perfectamente comprensible y, aun así, el estado puede ser ambiguo o engañoso.

#### 7. Frontera con `UX-QA-004`

`UX-QA-003` certifica que la persona comprende el estado, incluida la diferencia entre una condición ordinaria, una espera, un bloqueo, una denegación, un conflicto o un fallo técnico.

`UX-QA-004` certificará que, cuando exista error o impedimento que requiera intervención, la persona entiende cómo continuar, corregir, reintentar, escalar o cancelar de forma segura.

Por tanto:

```text
COMPRENDER QUÉ ESTÁ PASANDO
≠
CERTIFICAR TODA LA RECUPERACIÓN
```

#### 8. Definición de estado del proceso

Para esta tarea, `estado del proceso` es la proyección humana de la situación vigente de una instancia, tarea, recurso o relación empresarial dentro de su ciclo, con suficiente información para distinguir:

- qué ya ocurrió;
- qué no ha ocurrido todavía;
- si existe una acción válida ahora;
- qué condición limita el avance;
- quién conserva responsabilidad;
- si el estado está confirmado, pendiente, stale o incierto;
- qué siguiente transición o condición es esperable cuando sea material.

No equivale automáticamente a un enum interno.

#### 9. Estado, acción, autorización y conectividad son dimensiones distintas

La certificación deberá impedir las siguientes equivalencias falsas:

```text
ESTADO DEL PROCESO
≠ ACCIÓN SIGUIENTE

ACCIÓN VISIBLE
≠ AUTORIZACIÓN

SIN CONEXIÓN
≠ PROCESO FALLIDO

BOTÓN DESHABILITADO
≠ ESTADO EMPRESARIAL

PANTALLA ABIERTA
≠ TRABAJO INICIADO
```

Una persona debe poder reconocer esas diferencias sin conocimiento técnico.

#### 10. Preguntas mínimas de comprensión

Para cada caso aplicable, la persona deberá poder responder, con el nivel de detalle definido por el package:

1. cuál es el estado actual;
2. qué evidencia confirma ese estado;
3. qué evento o acción relevante ya ocurrió;
4. qué todavía está pendiente;
5. quién debe actuar a continuación;
6. si ella puede actuar ahora;
7. si el estado es final o transitorio;
8. si la información está vigente;
9. si existe una condición que impide avanzar;
10. si el resultado ya fue confirmado por la fuente de verdad.

No todos los casos requieren diez respuestas verbales separadas; la prueba puede demostrar comprensión por decisiones correctas siempre que el oráculo sea trazable.

#### 11. Fuente de verdad y proyección

La interfaz puede proyectar un estado desde otra aplicación, caché o agregador.

Siempre:

```text
PROYECCIÓN VISIBLE
≠ FUENTE DE VERDAD POR SÍ SOLA
```

La evidencia debe poder resolver, cuando aplique:

- aplicación o servicio propietario;
- identidad de la instancia;
- versión o referencia vigente;
- timestamp relevante;
- estado autoritativo observado;
- estado humano presentado.

Una proyección no puede inventar una transición.

#### 12. Estado confirmado y estado pendiente

La persona deberá distinguir claramente entre:

```text
CONFIRMADO
```

y:

```text
PENDIENTE DE CONFIRMACIÓN
```

Un comando enviado, un guardado local, una solicitud aceptada por el cliente o una animación de éxito no equivalen a resultado empresarial confirmado cuando todavía falta confirmación autoritativa.

#### 13. Estado local y estado autoritativo

Cuando exista estado local necesario para continuidad, la interfaz deberá indicar si representa:

- borrador;
- captura local;
- envío pendiente;
- confirmación del servidor;
- resultado desconocido;
- conflicto;
- estado reconciliado.

La tarea no crea una taxonomía runtime universal; exige que cada package demuestre una proyección humana inequívoca de sus estados reales.

#### 14. Etapa o paso actual

La persona debe poder identificar la etapa o paso relevante sin interpretar un identificador técnico.

La proyección deberá diferenciar, cuando sea material:

```text
DÓNDE ESTOY
QUÉ YA SE CUMPLIÓ
QUÉ FALTA PARA AVANZAR
```

El frontend no deberá inferir una etapa nueva únicamente porque se pulsó un control.

#### 15. Hecho ocurrido y efecto esperado

La interfaz deberá distinguir:

```text
ACCIÓN SOLICITADA
ACCIÓN ACEPTADA
EFECTO EMPRESARIAL CONFIRMADO
```

cuando esos momentos sean materialmente distintos.

Ejemplos conceptuales:

```text
Envío solicitado
≠ entrega confirmada

Cobro iniciado
≠ pago confirmado

Impresión enviada
≠ documento impreso

Conteo guardado localmente
≠ conteo registrado en la fuente autoritativa
```

#### 16. Responsabilidad y siguiente actor

Cuando la comprensión del estado dependa de ownership, la persona deberá poder reconocer:

- quién conserva la responsabilidad;
- si la responsabilidad ya cambió;
- si existe un handoff pendiente;
- si el siguiente actor es ella, otra persona, otro equipo o un proceso externo;
- si una aceptación todavía no ocurrió.

La interfaz no debe presentar responsabilidad transferida antes del evento que realmente la cambia.

#### 17. Espera y bloqueo

`WAITING` y `BLOCKED` permanecen semánticamente distintos.

Una espera representa una condición normal de dependencia temporal, evento o actor externo.

Un bloqueo representa una condición que impide avanzar y requiere resolución o decisión antes de continuar.

La prueba certifica que la persona distingue ambos significados. La instrucción detallada de recuperación del bloqueo pertenece a `UX-QA-004`.

#### 18. Denegación y bloqueo

Una denegación de autorización no se presentará como simple bloqueo recuperable por insistencia.

La persona deberá distinguir que:

```text
DENIED
```

significa que la acción no está permitida para el actor, alcance o recurso vigente, mientras que un bloqueo puede corresponder a una condición potencialmente resoluble.

La prueba no autoriza revelar reglas sensibles ni ofrecer bypass.

#### 19. Fallo técnico y estado empresarial

`TECHNICAL_FAILURE` no se convertirá automáticamente en un estado empresarial final.

La persona debe poder distinguir, cuando aplique:

- lo último que el sistema sabe con certeza;
- qué operación se intentó;
- si existe resultado confirmado;
- si el estado empresarial quedó desconocido;
- si hace falta refrescar o reconciliar.

No se mostrará `Completado` únicamente porque una solicitud salió del cliente.

#### 20. Validación requerida

Cuando el proceso requiere datos, evidencia o correcciones antes de avanzar, la presentación debe distinguir:

```text
FALTA VALIDAR O CORREGIR
```

de:

```text
PROCESO FALLIDO
```

La persona debe comprender qué parte sigue siendo válida y qué parte todavía no permite transición.

#### 21. Estados sin trabajo o contexto

Cuando aplique, la interfaz diferenciará al menos las situaciones canónicas ya definidas por cobertura vigente:

- sin turno;
- sin check-in;
- sin contexto;
- sin tareas;
- solo tareas futuras;
- solo tareas bloqueadas;
- permiso insuficiente;
- estación incompatible;
- datos no sincronizados.

No inventará una etapa operativa ni una siguiente acción falsa para llenar un estado vacío.

#### 22. Trabajo completado, cancelado o sustituido

Una obligación completada, cancelada o sustituida no deberá presentarse como ejecutable.

La persona debe poder reconocer que:

- el trabajo ya terminó;
- dejó de ser válido;
- fue reemplazado;
- o pertenece únicamente a consulta histórica.

Una notificación tardía o caché no revive automáticamente el trabajo.

#### 23. Frescura del estado

La proyección deberá conservar una señal de frescura compatible con el riesgo y el package.

La persona no debe asumir que:

```text
VISIBLE
=
VIGENTE
```

cuando el sistema conoce que la información puede estar stale.

#### 24. Estado stale

Un estado `STALE` de evidencia o proyección no se contará como comprensión correcta del estado vigente.

Cuando la información ya no represente el build, versión, contexto, actor, recurso o instancia actual, la certificación deberá degradarse y exigir actualización o nueva evidencia.

#### 25. Offline y sincronización pendiente

Cuando el package permita trabajo offline, la persona debe distinguir:

```text
CAPTURADO LOCALMENTE
PENDIENTE DE SINCRONIZACIÓN
CONFIRMADO POR LA FUENTE AUTORITATIVA
```

No se certifica un `PASS` si una operación pendiente de sincronización se presenta como efecto empresarial confirmado.

#### 26. Conflicto y resultado desconocido

Cuando existe conflicto de versión, concurrencia o resultado desconocido, la interfaz debe evitar una conclusión falsa.

La persona debe poder reconocer que el estado necesita resolución o reconciliación y que repetir la acción puede ser inseguro.

La recuperación detallada y el retry permanecen fuera de esta tarea.

#### 27. Estado cross-app

Cuando el proceso continúa entre aplicaciones, el significado del estado debe conservarse.

El salto cross-app no puede:

- cambiar silenciosamente el estado;
- convertir una proyección en autoridad;
- perder el owner;
- perder la identidad de la instancia;
- ocultar que una transición sigue pendiente.

La aplicación propietaria conserva la resolución autoritativa.

#### 28. Handoffs

En un handoff, la persona deberá distinguir:

```text
HANDOFF INICIADO
≠ HANDOFF ACEPTADO
≠ RESPONSABILIDAD TRANSFERIDA
```

cuando esos momentos sean distintos en el contrato real.

Un handoff rechazado, vencido o incierto permanece visible como tal.

#### 29. Cambios de actor en dispositivo compartido

Cambiar de trabajador no cambia retroactivamente:

- efectos ya confirmados;
- autoría;
- estado del proceso;
- ownership ya transferido.

Los pendientes conservan su actor y evidencia conforme al contrato aplicable.

La nueva persona no heredará una operación lista para confirmar como si la hubiera iniciado.

#### 30. Lenguaje humano del estado

Los estados internos se proyectarán mediante lenguaje humano versionado.

La proyección deberá expresar, cuando sea necesario:

```text
SITUACIÓN HUMANA
+ CONSECUENCIA
+ SIGUIENTE CONDICIÓN O ACCIÓN
```

sin usar como mensaje ordinario:

- enum interno;
- reason code;
- SQL;
- stack;
- permiso;
- ruta;
- identificador técnico.

La acción detallada de recuperación pertenece a `UX-QA-004`.

#### 31. Estados materialmente distintos no colapsan

Dos estados con consecuencias distintas no compartirán una etiqueta que haga creer que son equivalentes.

Ejemplos conceptuales:

```text
Pendiente de envío
≠ Enviado

Enviado
≠ Confirmado

Esperando
≠ Bloqueado

Bloqueado
≠ Denegado

Desconocido
≠ Fallido

Finalizado
≠ Cancelado
```

El package debe mapear sus estados reales sin inventar equivalencias.

#### 32. Accesibilidad del estado

La comprensión deberá conservarse mediante:

- texto o nombre accesible;
- estructura semántica;
- headings y regiones coherentes;
- foco de teclado cuando aplique;
- lector de pantalla cuando aplique;
- señales redundantes;
- orden comprensible;
- anuncio de cambios relevantes.

No dependerá únicamente de:

- color;
- icono;
- posición;
- animación;
- sonido;
- vibración;
- cuenta regresiva sin texto;
- cambio visual no anunciado.

#### 33. Dispositivos y superficies aplicables

La ejecución por package declarará las superficies incluidas, que pueden abarcar:

- web de escritorio;
- tablet;
- kiosco;
- móvil;
- estación compartida;
- launcher o Hub;
- superficie propietaria del proceso;
- proyección cross-app.

Comprender el estado en escritorio no certifica automáticamente móvil, kiosco o lector de pantalla.

#### 34. Actor y cohorte de prueba

La cohorte deberá representar a una persona autorizable y suficientemente preparada para el trabajo real.

La prueba no mezclará:

```text
NO COMPRENDE EL ESTADO PRESENTADO
```

con:

```text
NO CONOCE EL PROCESO EMPRESARIAL BÁSICO
```

Cuando el dominio exija formación obligatoria, la cohorte deberá cumplirla antes de evaluar la claridad del estado.

#### 35. Punto inicial del caso

Cada escenario declarará antes de ejecutarse:

- package;
- build o versión;
- actor/cohorte;
- formación permitida;
- foco esperado;
- acción primaria esperada;
- instancia de proceso;
- estado autoritativo de entrada;
- superficie y dispositivo;
- contexto;
- ayudas permitidas;
- preguntas u observables de comprensión;
- criterio de aceptación.

El caso no comenzará después de que el facilitador haya explicado el significado del estado exacto bajo prueba.

#### 36. Oráculo previo

Cada caso contará con un oráculo definido antes de observar al participante.

Forma conceptual:

```text
PROCESS_INSTANCE = referencia canónica
AUTHORITATIVE_STATE = identidad o clase real del estado
HUMAN_MEANING = significado esperado
CONFIRMATION_CLASS = confirmado, pendiente, local, stale o incierto según aplique
RESPONSIBILITY = actor o owner esperado
ACTION_AVAILABILITY = permitida, no disponible o condicionada
```

Los nombres físicos pueden especializarse por package.

No se acepta declarar correcto el significado inferido por el participante únicamente porque coincidió con lo que la UI mostraba.

#### 37. Ayuda durante la prueba

La ayuda se clasificará, como mínimo, en:

- ninguna;
- aclaración del escenario sin explicar el estado;
- ayuda de accesibilidad habitual;
- explicación de término empresarial previamente permitido;
- pista sobre dónde leer el estado;
- explicación directa del significado;
- instrucción de qué respuesta dar.

Una explicación directa del significado impide contar ese caso como comprensión autónoma.

#### 38. Casos positivos mínimos

La ejecución por package incluirá, cuando apliquen:

1. trabajo disponible y listo para acción;
2. trabajo ya iniciado;
3. acción solicitada y resultado confirmado;
4. operación pendiente de confirmación;
5. espera normal por evento o actor externo;
6. bloqueo legítimo;
7. denegación de autorización;
8. validación requerida;
9. estado final completado;
10. estado cancelado o sustituido;
11. proyección stale correctamente señalada;
12. trabajo offline pendiente de sincronización;
13. handoff iniciado pero no aceptado;
14. handoff aceptado y responsabilidad transferida;
15. conflicto visible sin falso estado final;
16. estado cross-app consistente;
17. estado comprensible por teclado;
18. estado comprensible por lector de pantalla;
19. estado visible en superficie táctil;
20. estado vacío o sin contexto correctamente diferenciado.

#### 39. Casos negativos mínimos

La ejecución por package incluirá, cuando apliquen:

1. enum técnico usado como única explicación;
2. estado comunicado solo por color;
3. estado comunicado solo por icono;
4. acción enviada presentada como resultado confirmado;
5. guardado local presentado como persistencia autoritativa;
6. pendiente de sincronización presentado como completado;
7. espera presentada como bloqueo;
8. bloqueo presentado como denegación;
9. denegación presentada como retry ordinario;
10. fallo técnico presentado como cancelación empresarial;
11. estado desconocido presentado como fallido;
12. caché stale presentada como vigente;
13. trabajo completado presentado como ejecutable;
14. tarea sustituida reaparecida por sincronización tardía;
15. handoff iniciado presentado como responsabilidad transferida;
16. cambio de actor que atribuye pendientes al actor nuevo;
17. cross-app que cambia el significado del estado;
18. label genérico que colapsa dos estados con consecuencias distintas;
19. animación de éxito usada como única evidencia de confirmación;
20. participante que necesita explicación directa del estado para responder.

#### 40. Métricas principales

La ejecución registrará, cuando correspondan:

- identificación correcta del estado;
- explicación correcta de qué ya ocurrió;
- explicación correcta de qué sigue pendiente;
- identificación del responsable o siguiente actor;
- identificación correcta de disponibilidad de acción;
- distinción confirmado versus pendiente;
- distinción waiting versus blocked;
- distinción estado empresarial versus fallo técnico;
- distinción vigente versus stale;
- errores de interpretación;
- solicitudes de ayuda;
- tipo de ayuda;
- tiempo de comprensión cuando sea útil;
- decisiones inseguras provocadas por mala interpretación.

No se fija un umbral global arbitrario en esta tarea documental.

#### 41. Criterio de aceptación por package

Cada package declarará su criterio antes de ejecutar.

El criterio deberá considerar:

- riesgo de interpretar mal el estado;
- frecuencia del proceso;
- complejidad;
- dispositivo;
- contexto físico;
- población objetivo;
- formación obligatoria;
- accesibilidad;
- consecuencia de una transición indebida;
- criticidad de distinguir pendiente y confirmado.

Un criterio creado después de observar resultados invalida la certificación.

#### 42. Prohibición de uso disciplinario aislado

Tiempo de comprensión, errores de interpretación o solicitudes de ayuda no se usarán de forma aislada para sancionar a una persona.

La evidencia evalúa la calidad de la proyección de estado y del flujo bajo un escenario controlado.

#### 43. Evidencia mínima por caso

Cada caso conservará, cuando aplique:

- `package_id`;
- commit/build evaluado;
- escenario;
- actor/cohorte;
- formación permitida;
- superficie y dispositivo;
- contexto;
- process/work item de referencia;
- estado autoritativo esperado;
- estado humano presentado;
- clase de confirmación;
- owner o responsable esperado;
- acción disponible esperada;
- respuestas u observables del participante;
- errores de interpretación;
- ayuda solicitada;
- tipo de ayuda;
- resultado;
- razón de fallo o bloqueo;
- timestamps;
- identificador de ejecución.

#### 44. Identidad de evidencia

Un `PASS` pertenece a una combinación concreta de:

```text
package_id
+ package version / commit
+ consumer build
+ fixture/data set
+ scenario
+ process/state version
+ surface/device class
+ actor/cohort definition
+ training allowance
+ terminology version
```

Cambiar materialmente cualquiera de esos elementos puede volver la evidencia `STALE`.

#### 45. Estados de ejecución

Estados permitidos para la instancia física futura:

- `PASS` — todos los casos obligatorios aplicables cumplen;
- `FAIL` — al menos un caso obligatorio produce una interpretación materialmente incorrecta del estado;
- `BLOCKED` — falta una dependencia necesaria para ejecutar honestamente;
- `STALE` — la evidencia existente ya no representa el build, estado, contrato, dispositivo, cohorte o contexto actual.

No existe `PARTIAL_PASS` para habilitar cierre.

#### 46. Ejecución por package

Para cada `package_id` aplicable se materializará en el futuro una instancia con identidad conceptual:

```text
UX-QA-003::<package_id>
```

La instancia deberá registrar:

- package exacto;
- owner/repositorios consumidores;
- superficies incluidas;
- dispositivos incluidos;
- actores/cohortes;
- formación permitida;
- estados y escenarios obligatorios;
- oráculos;
- evidencia;
- resultado;
- bloqueadores;
- commit/build;
- vigencia de evidencia.

La aprobación documental actual no crea esas instancias.

#### 47. Certificación `GLOBAL-FINAL`

Cuando todas las instancias aplicables estén cerradas y la topología lo permita, podrá materializarse la certificación global final de `UX-QA-003`.

El cierre global no promedia fallos entre packages.

Un package obligatorio en `FAIL`, `BLOCKED` o `STALE` impide declarar `PASS` global mientras siga dentro del alcance requerido.

#### 48. Regla de completitud

`PASS` exige:

```text
FOCO CORRECTO YA RESUELTO
+ ACCIÓN PRIMARIA YA RESUELTA
+ ESTADO AUTORITATIVO ORACLE DEFINIDO
+ SIGNIFICADO HUMANO INEQUÍVOCO
+ CONFIRMADO Y PENDIENTE DIFERENCIADOS
+ ESTADO, ACCIÓN, AUTORIZACIÓN Y CONECTIVIDAD DIFERENCIADOS
+ RESPONSABILIDAD RESOLUBLE
+ WAITING Y BLOCKED NO COLAPSADOS
+ CERO FALSO COMPLETADO
+ CERO ESTADO STALE PRESENTADO COMO VIGENTE
+ ACCESIBILIDAD APLICABLE
+ EVIDENCIA REPRODUCIBLE
= PASS
```

#### 49. Seguridad y autorización

Comprender el estado no amplía autoridad.

Una interfaz no puede convertir claridad en permiso.

Si el actor no está autorizado, la proyección debe representar la situación sin revelar información sensible ni ofrecer bypass.

La prueba no declarará `PASS` si un estado comprensible conduce a una acción que el servidor no debería permitir.

#### 50. No inferencia desde implementación parcial

No se declarará `PASS` porque:

- existe un badge de estado;
- el color parece correcto;
- existe un enum;
- una demo fue entendida por una persona experta;
- hay un icono de check;
- existe un spinner;
- el frontend muestra `success`;
- un snapshot coincide;
- un test unitario valida un componente;
- el backend devuelve un campo `status`;
- una sola aplicación funciona;
- el build compila.

La certificación exige evidencia integral del package y sus casos obligatorios.

#### 51. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea materializa una certificación ya exigida por cobertura UX vigente y no cambia el Registro Canónico de Requisitos de Prueba.

#### 52. Cobertura de prueba vigente reutilizada

Sin modificar 04A, esta tarea reutiliza principalmente:

- `TREQ-UX-001` — tarea, acción principal y estado del proceso identificables sin capacitación extensa;
- `TREQ-UX-005` — fuente de verdad, estado confirmado o pendiente, actor y último cambio visibles;
- `TREQ-UX-031` — separación semántica entre `WAITING` y `BLOCKED`;
- `TREQ-UX-036` — frescura, offline, sincronización pendiente y revalidación;
- `TREQ-UX-037` — estados sin turno, contexto, trabajo, permiso o sincronización diferenciados;
- `TREQ-UX-038` — estado y foco comunicados mediante señales accesibles y redundantes;
- `TREQ-UX-039` — métricas interpretadas con contexto y sin uso disciplinario aislado;
- `TREQ-UX-054` — proyección humana versionada de estados internos sin inferir transiciones desde copy;
- `TREQ-UX-055` — errores, bloqueos y falta de acceso expresados en lenguaje humano con capa técnica separada.

Estas referencias son trazabilidad heredada y no una actualización del registro.

#### 53. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido incorporado ni sometido a la batería documental del checkout local de `UX-QA-003`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía `format --write`, `format --check`, quality, delivery, topología, TREQ ni batería global sobre la rama local de `UX-QA-003`. |
| REMOTA | PASS | Se verificaron protocolo, contrato de entrega, manifest modular, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, archivo propietario, marcadores `UX-QA-003` y `UX-QA-004`, contratos de foco, navegación, estado, bloqueo, conectividad y accesibilidad aplicables, y Registro Canónico UX; el handoff inmediato proviene además del artefacto completo aprobado de `UX-QA-002` suministrado para trabajo documental adelantado. |
| OPERATIVA | NOT_EXECUTED | No se han ejecutado todavía sesiones controladas con trabajadores, mediciones de comprensión de estado ni escenarios de confirmed/pending/waiting/blocked/stale/offline sobre packages materializados. |
| FÍSICA | NOT_EXECUTED | No se han materializado instancias físicas de `UX-QA-003` ni su certificación global final; la ejecución física permanece sujeta a `POST_E5_PACKAGE` y autorización física fuera de este carril. |

#### 54. Criterios de aceptación

- [ ] El título es exactamente `UX-QA-003 — El trabajador comprende el estado del proceso`.
- [ ] La continuidad es `UX-QA-002 → UX-QA-003 → UX-QA-004`.
- [ ] La topología permanece `PER_PACKAGE_AND_GLOBAL_FINAL`.
- [ ] El gate físico permanece `POST_E5_PACKAGE`.
- [ ] La tarea no declara ejecución física inexistente.
- [ ] El foco y la acción primaria se consumen como handoff y no se redefinen.
- [ ] El estado visible corresponde a una fuente real o declara su naturaleza provisional.
- [ ] La persona distingue confirmado de pendiente.
- [ ] La persona distingue estado del proceso de disponibilidad de acción.
- [ ] La persona distingue estado del proceso de autorización.
- [ ] La persona distingue estado del proceso de conectividad.
- [ ] La persona reconoce qué ya ocurrió y qué sigue pendiente.
- [ ] La persona puede resolver ownership o siguiente actor cuando sea material.
- [ ] `WAITING` y `BLOCKED` no se vuelven equivalentes.
- [ ] `DENIED` no se presenta como retry ordinario.
- [ ] Un fallo técnico no se presenta como estado empresarial final.
- [ ] Un resultado desconocido no se presenta como fallido ni completado sin evidencia.
- [ ] Un estado stale no se presenta como vigente.
- [ ] Trabajo offline pendiente de sincronización no se presenta como confirmado.
- [ ] Estados finalizados, cancelados o sustituidos no se presentan como ejecutables.
- [ ] Handoff iniciado no equivale a responsabilidad transferida.
- [ ] El cambio de actor no reatribuye pendientes ni efectos confirmados.
- [ ] Estados materialmente distintos conservan significados humanos distintos.
- [ ] La comprensión no depende solo de color, icono, sonido o animación.
- [ ] El oráculo del estado se define antes del caso.
- [ ] Ayuda que explica directamente el significado no se cuenta como comprensión autónoma.
- [ ] No se crea un umbral global arbitrario después de observar resultados.
- [ ] Las métricas no se usan aisladamente para sancionar trabajadores.
- [ ] `UX-QA-004` conserva la certificación específica de cómo continuar ante errores.
- [ ] La sección `Requisitos de prueba derivados` declara literalmente cero cambios y no contiene IDs TREQ.
- [ ] No se modifica 04A.

#### 55. Condiciones de fallo o bloqueo físico futuro

La instancia física futura no puede cerrar `PASS` si:

- el estado autoritativo no puede determinarse;
- el oráculo se deriva de la misma UI bajo prueba;
- el participante confunde pendiente con confirmado;
- un resultado local se interpreta como resultado empresarial definitivo;
- una espera se interpreta como bloqueo;
- un bloqueo se interpreta como denegación o viceversa;
- un fallo técnico se interpreta como estado final del proceso;
- un estado desconocido se presenta como completado o fallido;
- un estado stale se presenta como vigente;
- una tarea completada, cancelada o sustituida aparece ejecutable;
- un handoff pendiente se presenta como responsabilidad transferida;
- un cambio de actor modifica la autoría o ownership sin evento válido;
- dos estados con consecuencias distintas usan una proyección indistinguible;
- el estado solo se comunica mediante una señal no accesible;
- la prueba requiere explicar directamente al participante el significado del estado;
- el package no declara sus superficies o escenarios obligatorios;
- la evidencia es `STALE`.

#### 56. Handoff a `UX-QA-004`

`UX-QA-003` entrega a `UX-QA-004`:

- foco correcto;
- acción principal correcta;
- estado actual comprendido;
- fuente de verdad identificable;
- distinción entre confirmado, pendiente y local;
- ownership o siguiente actor resoluble;
- separación entre espera, bloqueo, denegación, conflicto y fallo técnico;
- frescura y conectividad conocidas;
- estados de error o impedimento que requieren una respuesta humana.

`UX-QA-004` podrá evaluar si, ante un error o impedimento que requiera intervención, la persona comprende cómo continuar de forma segura sin reabrir la definición del foco, la acción ni el significado del estado.

#### 57. Límites

Esta tarea no:

- cambia estados de dominio;
- crea estados nuevos;
- redefine state machines;
- implementa componentes;
- modifica copy en runtime;
- crea rutas;
- modifica navegación;
- cambia prioridades;
- crea work items;
- ejecuta claims;
- inicia o completa trabajo;
- cambia ownership;
- ejecuta handoffs;
- modifica autorización;
- ejecuta retries;
- resuelve conflictos;
- crea mecanismos offline;
- modifica datos;
- modifica Supabase;
- modifica telemetría;
- implementa observabilidad;
- ejecuta estudios con trabajadores;
- define un umbral universal de velocidad;
- certifica `UX-QA-004`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 58. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-002 — La acción principal se encuentra sin capacitación`

**TAREA ACTUAL APROBADA**
`UX-QA-003 — El trabajador comprende el estado del proceso`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-004 — Los errores indican cómo continuar`
### ✅ UX-QA-004 — Los errores indican cómo continuar

**Estado:** APROBADA
**Tarea anterior:** UX-QA-003 — El trabajador comprende el estado del proceso
**Tarea siguiente:** UX-QA-005 — Un rol no ve opciones irrelevantes
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que, ante un error, bloqueo, espera, conflicto, denegación, validación pendiente, fallo técnico o resultado parcial que requiera una respuesta humana, el trabajador comprende qué ocurrió, qué efecto tuvo, qué trabajo o datos se conservaron, cuál es la acción segura disponible, quién puede resolver la condición, cuándo revisar o reintentar y qué referencia usar para soporte, sin depender de códigos técnicos, mensajes genéricos, permisos internos ni retries inseguros, preservando autorización, idempotencia, accesibilidad, privacidad, ownership, fuente de verdad y la frontera con la composición de opciones por rol de la tarea siguiente
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de recuperación comprensible y segura definido; las ejecuciones `UX-QA-004::<package_id>` y la certificación `UX-QA-004::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el foco resuelto por `UX-QA-001`, la acción primaria resuelta por `UX-QA-002`, la comprensión de estado resuelta por `UX-QA-003`, el contrato aprobado `UX-HUMAN-BLOCKING-EXPLANATION-CONTRACT-001` y la cobertura UX vigente, pero no infiere que ningún package, aplicación, superficie, dispositivo, escenario de fallo o cohorte humana ya haya superado la prueba
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan sesiones con trabajadores, pruebas E2E, inyección de fallos, retries, reconciliaciones, mutaciones, cambios de copy, componentes, rutas, permisos, reason codes, observabilidad, datos, Supabase, despliegues, configuración ni instrumentación nueva
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que, cuando una condición impida, limite, suspenda, retrase o vuelva incierto el avance, la persona puede responder de forma correcta y verificable:

```text
¿QUÉ OCURRIÓ?
¿QUÉ NO OCURRIÓ O NO PUDO CONFIRMARSE?
¿QUÉ DATOS O TRABAJO QUEDARON CONSERVADOS?
¿QUÉ PUEDO HACER AHORA DE FORMA SEGURA?
¿QUIÉN PUEDE RESOLVERLO SI YO NO PUEDO?
¿CUÁNDO O BAJO QUÉ CONDICIÓN DEBO REVISAR O REINTENTAR?
¿QUÉ REFERENCIA PUEDO DAR A SOPORTE O AL RESPONSABLE?
```

sin depender de stacks, SQL, nombres de tablas, RPC, permisos internos, códigos HTTP, reason codes crudos, identificadores opacos ni conocimiento técnico del sistema.

#### 2. Resultado canónico

`UX-QA-004` establece `UX-QA-SAFE-RECOVERY-COMPREHENSION-001@1.0.0`.

El contrato certifica conjuntamente que:

1. el foco correcto ya fue resuelto;
2. la acción primaria ya fue resuelta;
3. el estado actual ya fue comprendido;
4. la condición presentada se clasifica con semántica coherente;
5. la persona comprende qué ocurrió y qué efecto produjo;
6. el mensaje declara qué estado o trabajo quedó preservado cuando sea material;
7. la acción de recuperación propuesta es concreta y ejecutable por el actor actual;
8. `Reintentar` solo aparece cuando repetir es seguro;
9. un resultado desconocido no se transforma en retry automático;
10. un bloqueo no se confunde con denegación;
11. una espera normal no se presenta como fallo;
12. una validación corregible identifica exactamente qué debe corregirse;
13. un conflicto no se resuelve mediante sobrescritura silenciosa;
14. un fallo técnico no expone detalles técnicos innecesarios;
15. el escalamiento identifica una clase de responsable coherente;
16. la persona conoce la condición o momento de revisión cuando existe espera;
17. la referencia de soporte es segura y utilizable;
18. el mensaje no ofrece bypass de autorización;
19. la explicación es accesible y no depende únicamente de color, icono, hover, vibración o sonido;
20. el texto visible no gobierna lógica ni sustituye el estado de dominio;
21. la evidencia permite medir recuperación sin convertir fallos aislados en mecanismo disciplinario;
22. la certificación puede terminar en `PASS`, `FAIL`, `BLOCKED` o `STALE` sin falso verde.

#### 3. Alcance exacto

Esta tarea define:

- qué significa que un error o impedimento indique cómo continuar;
- las categorías humanas de condición que deben diferenciarse;
- la anatomía mínima de una explicación accionable;
- cómo se declara causa, efecto y estado preservado;
- cómo se selecciona una acción de recuperación segura;
- cuándo un retry es válido y cuándo debe bloquearse;
- cómo se tratan bloqueos, denegaciones, esperas, conflictos, fallos técnicos y validaciones;
- cómo se trata un resultado parcial o desconocido;
- cómo se identifica responsable, escalamiento y revisión;
- cómo se conserva contexto cross-app y en notificaciones;
- cómo se protege privacidad y antienumeración;
- cómo se conserva accesibilidad;
- qué escenarios, cohortes y oráculos se declaran;
- qué evidencia y métricas se conservan;
- la ejecución por package y la reconciliación `GLOBAL-FINAL`.

No decide todavía qué opciones ordinarias deben estar visibles u ocultas para cada rol. Esa responsabilidad permanece en `UX-QA-005`.

#### 4. Handoff recibido de `UX-QA-003`

`UX-QA-003` entrega a esta tarea:

- foco correcto;
- acción principal correcta;
- estado actual comprendido;
- fuente de verdad identificable;
- distinción entre confirmado, pendiente y local;
- ownership o siguiente actor resoluble;
- separación entre espera, bloqueo, denegación, conflicto y fallo técnico;
- frescura y conectividad conocidas;
- estados de error o impedimento que requieren una respuesta humana.

`UX-QA-004` no vuelve a decidir el significado del estado. Evalúa si, con ese estado ya comprendido, la persona sabe continuar de forma segura.

#### 5. Frontera con `UX-QA-001`, `UX-QA-002` y `UX-QA-003`

La secuencia certifica preguntas distintas:

```text
UX-QA-001
¿QUÉ TRABAJO DEBO ATENDER?

UX-QA-002
¿QUÉ ACCIÓN PRINCIPAL DEBO EJECUTAR?

UX-QA-003
¿EN QUÉ ESTADO ESTÁ EL PROCESO?

UX-QA-004
SI ALGO IMPIDE O ALTERA EL AVANCE,
¿CÓMO CONTINÚO DE FORMA SEGURA?
```

Una superficie puede aprobar las tres primeras preguntas y fallar esta tarea si deja a la persona sin ruta segura de recuperación.

#### 6. Frontera con `UX-QA-005`

`UX-QA-004` puede certificar que una acción relevante pero temporalmente no ejecutable explique por qué está bloqueada y cómo continuar.

`UX-QA-005` certificará que un rol no vea opciones irrelevantes para su tarea y autorización.

Por tanto:

```text
OPCIÓN RELEVANTE PERO BLOQUEADA
→ DEBE EXPLICARSE CUANDO CORRESPONDA

OPCIÓN IRRELEVANTE PARA EL ROL
→ NO SE CONSERVA COMO RUIDO SOLO PARA EXPLICARLA
```

Esta tarea no redefine la composición completa de la pantalla por rol.

#### 7. Qué significa «error» en esta tarea

El título usa «errores» como expresión de experiencia del usuario, no como taxonomía única de runtime.

La certificación incluye condiciones que pueden requerir orientación aunque no sean errores técnicos:

- `BLOCKED`;
- `DENIED`;
- `WAITING`;
- `CONFLICT`;
- `TECHNICAL_FAILURE`;
- `VALIDATION_REQUIRED`;
- `WARNING`;
- `INFO` cuando comunica una condición material para continuar.

No todo resultado distinto de éxito se clasifica como fallo técnico.

#### 8. Taxonomía canónica consumida

La prueba conserva las diferencias aprobadas:

| Categoría | Significado humano | Continuación esperada |
|---|---|---|
| `BLOCKED` | La acción es pertinente, pero falta una condición o resolución obligatoria. | Explicar causa, responsable y condición de desbloqueo. |
| `DENIED` | La acción no está permitida para el actor, alcance o recurso vigente. | Explicar la frontera sin revelar información sensible ni ofrecer bypass. |
| `WAITING` | La tarea depende normalmente de tiempo, evento o actor externo. | Mostrar dependencia, propietario y próxima revisión. |
| `CONFLICT` | El recurso, versión, claim o contexto cambió. | Detener, refrescar, comparar o resolver sin sobrescribir silenciosamente. |
| `TECHNICAL_FAILURE` | Una dependencia técnica falló o no respondió. | Declarar efecto conocido, estado preservado, acción segura y referencia. |
| `VALIDATION_REQUIRED` | Faltan datos, evidencia o correcciones que el actor puede aportar. | Señalar exactamente qué debe corregirse y dónde. |
| `WARNING` | Puede continuarse, pero existe riesgo o consecuencia material. | Explicar la consecuencia y confirmar solo cuando corresponda. |
| `INFO` | Existe una condición relevante sin acción inmediata obligatoria. | Informar sin competir con la tarea principal. |

La certificación no crea estas categorías; prueba su aplicación comprensible.

#### 9. Un mensaje genérico no es recuperación

No serán suficientes por sí solos:

```text
Ocurrió un error
Algo salió mal
No autorizado
Operación inválida
Intenta nuevamente
No se pudo procesar
Contacta al administrador
Reintentar
Continuar
```

La persona debe poder tomar una decisión segura a partir de la explicación.

#### 10. Capas separadas

La prueba exige conservar la separación:

```text
CAUSA ESTRUCTURADA Y AUDITABLE
+
CONTEXTO SEGURO
+
ESTADO DE LA OPERACIÓN
+
POLÍTICA DE RECUPERACIÓN
=
EXPLICACIÓN HUMANA ACCIONABLE
```

Y prohíbe las equivalencias:

```text
MENSAJE HUMANO
≠ REASON CODE
≠ DECISIÓN DE AUTORIZACIÓN
≠ ESTADO DE DOMINIO
≠ EXCEPCIÓN TÉCNICA
```

Cambiar el texto visible no puede cambiar la lógica contractual.

#### 11. Anatomía mínima de una explicación

Cuando sea material, la persona debe poder resolver:

1. título humano del impedimento;
2. causa segura;
3. efecto sobre la acción o proceso;
4. estado preservado;
5. acción siguiente segura;
6. responsable o proceso resolutor;
7. condición temporal o de revisión;
8. referencia segura para soporte o auditoría.

La interfaz puede compactar la presentación, pero no eliminar información necesaria para decidir con seguridad.

#### 12. Título humano

El título describe el efecto sobre el trabajo y no el subsistema que falló.

Ejemplos válidos conceptualmente:

```text
La recepción espera la entrega del conductor
La cantidad cambió mientras revisabas
No pudimos confirmar el envío
Falta identificar al trabajador
Este documento necesita una corrección
```

No serán suficientes como mensaje principal:

```text
RPC timeout
RLS denied
Version mismatch
Constraint violation
Session null
HTTP 500
```

#### 13. Causa segura

La explicación debe comunicar la condición que impide o modifica el avance con el nivel mínimo necesario para el actor.

La causa segura:

- no fabrica una explicación si la causa es desconocida;
- no revela datos de terceros;
- no revela permisos internos;
- no expone antifraude;
- no expone secretos;
- no expone SQL, stack, payload ni estructuras internas;
- puede generalizar información cuando la persona no tiene derecho a conocer más.

#### 14. Efecto

La persona deberá comprender qué quedó afectado y qué continúa disponible.

Ejemplos de preguntas verificables:

```text
¿LA ACCIÓN SE EJECUTÓ?
¿LA TAREA SIGUE ABIERTA?
¿LA CUSTODIA CAMBIÓ?
¿EL BORRADOR SIGUE DISPONIBLE?
¿PUEDO HACER OTRA TAREA MIENTRAS ESPERO?
```

El mensaje no debe sugerir una pérdida, confirmación o transferencia que la fuente de verdad no demuestre.

#### 15. Estado preservado

Cuando exista trabajo previo, la persona deberá distinguir al menos el resultado real aplicable:

```text
NO SE GUARDÓ NINGÚN CAMBIO
SE GUARDÓ UN BORRADOR LOCAL
EL SERVIDOR CONFIRMÓ LOS CAMBIOS
SE GUARDÓ SOLO UNA PARTE
NO SE PUDO CONFIRMAR EL ESTADO
```

Regla crítica:

```text
NO RECIBIR RESPUESTA
≠ OPERACIÓN NO EJECUTADA
```

#### 16. Acción siguiente segura

La acción propuesta debe:

- ser ejecutable por el actor actual;
- corresponder al estado vigente;
- nombrar verbo y objeto cuando sea material;
- no fabricar autoridad;
- no repetir efectos ya confirmados;
- no saltar validaciones obligatorias;
- no convertir una excepción en flujo ordinario;
- conservar contexto suficiente.

Ejemplos conceptuales válidos:

```text
Actualizar la recepción
Revisar las cantidades modificadas
Corregir la fecha de vencimiento
Solicitar revisión al responsable del área
Consultar si el envío ya fue confirmado
Guardar el borrador y continuar después
```

#### 17. Retry seguro

`Reintentar` solo puede ser una acción certificable cuando el oráculo demuestra que:

1. la causa es transitoria o ya se resolvió;
2. repetir está permitido;
3. la operación es idempotente o no llegó a iniciarse;
4. se conoce qué parte quedó guardada;
5. el resultado anterior no permanece desconocido;
6. existe límite, backoff o estrategia equivalente cuando aplique;
7. la reautorización necesaria se conserva.

Si cualquiera de estas condiciones no puede probarse, retry no se considera una ruta segura.

#### 18. Resultado desconocido

Cuando el sistema no puede determinar si una mutación se ejecutó, la persona debe comprender que repetir puede ser peligroso.

La recuperación deberá priorizar, según el contrato del package:

- consultar estado;
- consultar receipt o identidad idempotente;
- refrescar desde la fuente autoritativa;
- reconciliar;
- escalar con referencia segura.

No se declarará `PASS` si la interfaz ofrece retry ciego ante resultado desconocido.

#### 19. `BLOCKED`

Para un bloqueo, la persona deberá comprender:

- qué condición falta;
- qué se conservó;
- quién puede resolverla;
- cuál es la condición de desbloqueo;
- si puede realizar otra tarea mientras espera;
- cuándo escalar si no se resuelve.

El bloqueo no concede bypass ni cambio improvisado de contexto.

#### 20. `DENIED`

Para una denegación, la persona deberá comprender la frontera funcional aplicable sin recibir una falsa promesa de recuperación mediante insistencia.

La interfaz no ofrecerá como solución inmediata:

- elevar permisos;
- cambiar rol arbitrariamente;
- usar otra cuenta;
- compartir credenciales;
- seleccionar un recurso oculto;
- repetir indefinidamente.

`DENIED` puede tener orientación, pero no una ruta que viole autorización.

#### 21. `WAITING`

Una espera normal debe mostrar, cuando sea material:

- evento esperado;
- propietario de la siguiente acción;
- fecha o condición de revisión;
- efecto sobre custodia;
- tareas alternativas permitidas;
- condición de escalamiento.

Una notificación enviada no demuestra recepción ni handoff.

#### 22. `CONFLICT`

Ante versión obsoleta, claim perdido o modificación concurrente, la persona debe comprender:

- qué recurso cambió;
- si su trabajo local quedó preservado;
- cuál es la versión autoritativa;
- qué diferencias requieren revisión;
- si puede comparar, reaplicar, corregir o descartar;
- quién conserva tarea o custodia.

No se certifica una recuperación basada en `last write wins` silencioso.

#### 23. `TECHNICAL_FAILURE`

Un fallo técnico deberá distinguir, cuando aplique:

```text
FALLO ANTES DE ENVIAR
DEPENDENCIA NO DISPONIBLE
TIMEOUT CON RESULTADO DESCONOCIDO
FALLO DESPUÉS DE CONFIRMACIÓN
SINCRONIZACIÓN PARCIAL
ERROR TERMINAL
```

La persona recibe efecto conocido, estado guardado, acción segura y referencia; el detalle técnico permanece en observabilidad restringida.

#### 24. `VALIDATION_REQUIRED`

Cuando la persona puede corregir la condición, el mensaje deberá identificar exactamente:

- dato;
- evidencia;
- campo;
- condición;
- precondición;
- paso de corrección.

No se mostrarán como bloqueantes campos ocultos o no editables para ese actor sin una ruta clara de resolución.

Cuando existan varios errores, deberá existir resumen accesible sin perder la asociación con cada control o región.

#### 25. `WARNING` e `INFO`

Una advertencia no debe bloquear por costumbre.

`WARNING` puede exigir confirmación cuando el riesgo o consecuencia lo justifique, pero no convertirá una simple información en impedimento artificial.

`INFO` no competirá con la acción primaria ni se presentará como incidente.

#### 26. Responsabilidad y escalamiento

`Contacta al administrador` no es una salida universal.

Cuando el actor no pueda resolver la condición, la explicación debe identificar una clase de responsable coherente, por ejemplo:

- responsable de la tarea anterior;
- supervisor del área activa;
- gerente de sede;
- Compras;
- Contabilidad;
- Talento;
- soporte técnico;
- seguridad o privacidad;
- proceso automático de conciliación.

El escalamiento conserva contexto suficiente para evitar recaptura manual innecesaria.

#### 27. Condición de revisión

Cuando no exista acción inmediata, la persona debe saber qué evento, momento o condición vuelve a hacer útil revisar la tarea.

La explicación puede expresar, según el package:

- próxima revisión automática;
- vencimiento de SLA;
- confirmación esperada;
- recuperación de conectividad;
- resolución de otro actor;
- nueva versión autoritativa;
- conciliación completada.

No se exige inventar una hora cuando la fuente no la conoce.

#### 28. Referencia segura de soporte

Cuando soporte, auditoría o un responsable requieran correlación, la interfaz deberá ofrecer una referencia segura que la persona pueda leer o copiar.

La referencia:

- no sustituye la explicación humana;
- no debe revelar secretos;
- no obliga a exponer stack, SQL, payload o permission code;
- debe permitir que la capa autorizada recupere el contexto técnico pertinente.

#### 29. Seguridad, privacidad y antienumeración

Una explicación clara no amplía el derecho a conocer.

La prueba deberá verificar que la recuperación no revela:

- actores autorizados que el usuario no debe conocer;
- existencia de recursos protegidos;
- reglas antifraude;
- datos médicos o financieros no necesarios;
- tokens;
- secretos;
- nombres internos sensibles;
- detalles de infraestructura.

La orientación puede generalizar causa o responsable cuando la privacidad lo exija.

#### 30. Bloqueos de contexto

Cuando el impedimento se relacione con actor, sede, área, turno, check-in, rol, dispositivo, delegación, simulación o frescura, la explicación deberá indicar la dimensión faltante o incompatible y conservar fail-closed.

No se certifican fallbacks como:

- sede primaria;
- última sede usada;
- rol inferido por nombre;
- área del dispositivo;
- usuario anterior;
- cuenta compartida.

#### 31. Conectividad inestable

La persona deberá distinguir, cuando aplique:

```text
TRABAJANDO SIN CONEXIÓN
GUARDADO EN ESTE DISPOSITIVO
PENDIENTE DE CONFIRMACIÓN DEL SERVIDOR
SINCRONIZACIÓN EN CONFLICTO
ACCIÓN REQUIERE CONEXIÓN
```

La recuperación no mostrará `Completado` antes de confirmación autoritativa.

#### 32. Resultado parcial

Una operación parcialmente aplicada no se presenta como éxito global ni como fallo total si ambas conclusiones son falsas.

La persona deberá poder identificar:

- qué elementos tuvieron éxito;
- qué elementos fallaron o quedaron pendientes;
- qué elementos requieren conciliación;
- qué puede reintentarse;
- qué no debe repetirse.

#### 33. Operaciones masivas

En acciones masivas o por lotes, la recuperación deberá conservar los éxitos y separar los casos elegibles para retry.

No se repetirá automáticamente el conjunto completo si algunos elementos ya produjeron efecto.

La evidencia deberá demostrar tratamiento por elemento o agrupación equivalente que evite duplicados.

#### 34. Cross-app, notificaciones y deep links

SHELL, notificaciones, correos, push y aplicaciones propietarias pueden presentar una misma causa con detalle apropiado al canal, pero al abrir deben revalidar:

- estado;
- autorización;
- contexto;
- owner;
- acción segura.

Una notificación no congela para siempre texto, responsable ni recuperación.

Un deep link stale no puede conducir a una instrucción contradictoria con el estado actual.

#### 35. Dispositivos compartidos

En kioscos, tablets y estaciones compartidas, la explicación deberá distinguir entre problemas de:

- dispositivo;
- estación;
- actor;
- turno;
- rol;
- aplicación;
- sesión.

Un fallo técnico del terminal no se atribuye al trabajador.

Un cambio de actor retira mensajes, referencias y borradores privados que no correspondan al actor nuevo.

#### 36. Accesibilidad

La recuperación deberá:

- asociarse al control o región afectada;
- anunciarse cuando aparezca después de una acción;
- mover foco solo cuando sea necesario;
- ofrecer resumen navegable cuando existan varias validaciones;
- conservar orden entre causa, efecto y acción;
- usar nombres claros para acciones;
- permitir leer o copiar la referencia de soporte;
- no depender solo de color, icono, hover, sonido, vibración o animación;
- evitar anuncios repetitivos que impidan continuar.

#### 37. Lenguaje y tono

La explicación deberá ser:

- directa;
- neutral;
- específica;
- no punitiva;
- consistente con vocabulario real;
- adecuada al conocimiento del actor;
- localizable y versionada.

No se certificará copy que culpe al trabajador por fallos de configuración, concurrencia, autorización o sistema.

#### 38. Ciclo de vida del mensaje

La prueba deberá contemplar mensajes que puedan quedar:

```text
ACTIVE
RESOLVED
SUPERSEDED
STALE
ACKNOWLEDGED
```

Un mensaje resuelto no permanece como bloqueo activo.

Un mensaje stale o superseded no reemplaza el estado vigente.

Causas distintas no se colapsan en un texto ambiguo solo para reducir ruido.

#### 39. Frescura de la recuperación

La acción propuesta deberá corresponder al estado vigente al momento de ejecutarse.

Una explicación correcta al momento de emitirse puede quedar obsoleta por:

- cambio de versión;
- cambio de actor;
- cambio de autorización;
- resolución externa;
- cambio de custodia;
- cambio de conectividad;
- expiración temporal.

La certificación degrada a `STALE` si la evidencia ya no representa el contexto actual.

#### 40. Superficies y dispositivos aplicables

Cada package deberá declarar las superficies donde una persona puede encontrar impedimentos materiales, por ejemplo:

- web operativa;
- tablet;
- kiosco;
- móvil;
- estación compartida;
- superficie administrativa cuando forme parte del package;
- handoff cross-app;
- bandeja o notificación que active recuperación.

No se presume cobertura por probar un único navegador o dispositivo.

#### 41. Actor y cohorte de prueba

La cohorte futura deberá representar los actores reales del package, incluyendo cuando aplique:

- trabajadores frecuentes;
- trabajadores nuevos en la interfaz;
- supervisores con funciones específicas;
- actores de dispositivo compartido;
- personas que operen bajo presión temporal;
- usuarios de tecnología de asistencia.

La prueba no puede usar únicamente autores del producto o personas que conozcan internamente los reason codes.

#### 42. Punto inicial del caso

Cada caso debe comenzar con:

- identidad exacta de la tarea o recurso;
- actor/contexto resueltos;
- estado previo conocido;
- acción intentada o condición observada;
- causa estructurada preparada por fixture o ambiente controlado;
- oracle de efecto y estado preservado;
- política de recuperación esperada.

El participante no recibe la respuesta antes de comenzar.

#### 43. Oráculo previo

Antes de ejecutar el caso, el package deberá definir qué constituye respuesta correcta para:

- categoría;
- efecto;
- estado preservado;
- acción siguiente;
- responsable;
- condición de revisión;
- retry seguro o prohibido;
- referencia de soporte cuando aplique.

El oráculo no puede derivarse después de observar la respuesta del participante.

#### 44. Ayuda durante la prueba

La prueba distinguirá:

- ayuda ordinaria disponible en producto;
- ayuda externa del facilitador;
- explicación directa de la respuesta.

Si el facilitador debe decir qué ocurrió, qué se guardó o cuál botón usar para recuperar, ese caso no demuestra comprensión autónoma.

La ayuda utilizada se registra como evidencia.

#### 45. Casos positivos mínimos

El conjunto aplicable deberá incluir, cuando exista en el package:

1. validación corregible;
2. bloqueo por dependencia;
3. espera normal;
4. denegación de autorización;
5. conflicto de versión o concurrencia;
6. fallo técnico antes de enviar;
7. timeout o resultado desconocido;
8. trabajo local pendiente de sincronización;
9. resultado parcial;
10. recuperación con responsable externo;
11. referencia segura para soporte;
12. recuperación accesible por teclado o tecnología de asistencia;
13. recuperación cross-app;
14. mensaje resuelto o superseded que deja de bloquear.

Los casos no aplicables se justifican por package; no se marcan artificialmente como `PASS`.

#### 46. Casos negativos mínimos

La certificación deberá detectar, cuando aplique:

- mensaje genérico sin acción;
- botón deshabilitado sin explicación;
- technical code como mensaje principal;
- retry sobre resultado desconocido;
- retry que puede duplicar efecto;
- denegación presentada como bloqueo recuperable;
- espera presentada como error;
- estado preservado incorrecto;
- pérdida silenciosa de borrador;
- `Contacta al administrador` sin responsable útil;
- referencia de soporte secreta o inexistente;
- conflicto resuelto por overwrite silencioso;
- resultado parcial presentado como éxito global;
- acción de recuperación no autorizada para el actor;
- explicación stale;
- copy culpabilizante;
- explicación inaccesible;
- deep link que conserva una recuperación ya obsoleta.

#### 47. Métricas principales

La evidencia podrá registrar, según package:

- porcentaje de casos donde el trabajador identifica la causa humana suficiente;
- porcentaje donde identifica correctamente qué quedó guardado;
- elección de recuperación segura;
- retries inseguros intentados;
- escalamiento al responsable incorrecto;
- abandono después de un impedimento;
- tiempo hasta decidir la acción correcta;
- ayuda requerida;
- conflictos no reconocidos;
- resultados desconocidos interpretados como éxito o fallo definitivo;
- referencias de soporte utilizables;
- defectos de accesibilidad;
- mensajes sin acción útil.

#### 48. Criterio de aceptación por package

Cada package deberá fijar antes de ejecutar:

- universo de escenarios obligatorios;
- actores obligatorios;
- superficies obligatorias;
- número de casos o sesiones;
- defectos críticos de tolerancia cero;
- criterio cuantitativo o cualitativo de comprensión;
- política de repetición de la prueba;
- vigencia máxima de evidencia.

No existe un umbral global improvisado después de observar resultados.

#### 49. Prohibición de uso disciplinario aislado

Las métricas de recuperación se interpretarán con:

- complejidad;
- calidad del copy;
- latencia;
- disponibilidad de recursos;
- contexto;
- formación real del trabajo;
- conectividad;
- defectos del sistema.

No se usarán por sí solas para sancionar o clasificar trabajadores.

#### 50. Evidencia mínima por caso

La evidencia física futura deberá permitir reconstruir al menos:

- package;
- build/commit;
- superficie/dispositivo;
- actor/cohorte anonimizada cuando corresponda;
- escenario;
- categoría esperada;
- estado previo;
- efecto real;
- estado preservado real;
- explicación presentada;
- acción elegida;
- ayuda utilizada;
- resultado;
- defecto o bloqueo;
- timestamp;
- oracle aplicado.

Los datos personales se minimizan conforme a política.

#### 51. Identidad de evidencia

La evidencia de cada instancia se vinculará a:

```text
UX-QA-004::<package_id>
```

La certificación global final se vinculará a:

```text
UX-QA-004::GLOBAL-FINAL
```

No se reutilizará evidencia de otro package sin demostrar equivalencia del alcance.

#### 52. Estados de ejecución

La materialización física futura utilizará resultados conceptuales:

```text
PASS
FAIL
BLOCKED
STALE
```

Estos estados describen la ejecución física futura y no sustituyen los estados documentales de evidencia del artefacto.

No existe `PARTIAL_PASS` para habilitar cierre.

#### 53. Ejecución por package

Para cada `package_id` aplicable se materializará en el futuro una instancia con identidad conceptual:

```text
UX-QA-004::<package_id>
```

La instancia deberá registrar:

- package exacto;
- owners/repositorios consumidores;
- superficies incluidas;
- dispositivos incluidos;
- actores/cohortes;
- categorías aplicables;
- escenarios obligatorios;
- políticas de recovery y retry;
- oráculos;
- evidencia;
- resultado;
- bloqueadores;
- commit/build;
- vigencia de evidencia.

La aprobación documental actual no crea esas instancias.

#### 54. Certificación `GLOBAL-FINAL`

Cuando todas las instancias aplicables estén cerradas y la topología lo permita, podrá materializarse la certificación global final de `UX-QA-004`.

El cierre global no promedia fallos entre packages.

Un package obligatorio en `FAIL`, `BLOCKED` o `STALE` impide declarar `PASS` global mientras siga dentro del alcance requerido.

#### 55. Regla de completitud

`PASS` exige:

```text
FOCO CORRECTO YA RESUELTO
+ ACCIÓN PRIMARIA YA RESUELTA
+ ESTADO COMPRENDIDO YA RESUELTO
+ CATEGORÍA COHERENTE
+ CAUSA HUMANA SEGURA
+ EFECTO COMPRENSIBLE
+ ESTADO PRESERVADO VERAZ
+ ACCIÓN SIGUIENTE EJECUTABLE
+ RETRY SEGURO O CORRECTAMENTE BLOQUEADO
+ RESPONSABLE O CONDICIÓN DE REVISIÓN CUANDO APLIQUE
+ REFERENCIA SEGURA CUANDO APLIQUE
+ CERO BYPASS DE AUTORIZACIÓN
+ CERO DUPLICACIÓN INDUCIDA POR RECOVERY
+ ACCESIBILIDAD APLICABLE
+ EVIDENCIA REPRODUCIBLE
= PASS
```

#### 56. Seguridad y autorización

Una ruta de recuperación no puede conceder una capacidad que la acción original no tenía.

La prueba falla si la explicación induce a:

- elevar permisos por conveniencia;
- cambiar de cuenta;
- utilizar credenciales ajenas;
- escoger un contexto no autorizado;
- ignorar segregación de funciones;
- saltar una aprobación;
- repetir una mutación sin reautorización necesaria.

#### 57. No inferencia desde implementación parcial

No se declarará `PASS` porque:

- existe un toast de error;
- existe una pantalla de error;
- existe un reason code;
- el botón `Reintentar` funciona técnicamente;
- un test unitario cubre un componente;
- el backend devuelve un mensaje;
- un caso feliz compila;
- una demo manual pareció clara;
- una sola categoría funciona;
- una sola aplicación funciona;
- soporte puede interpretar el stack;
- un snapshot contiene el copy esperado.

La certificación exige evidencia integral del package y de sus escenarios obligatorios.

#### 58. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea materializa una certificación ya exigida por cobertura UX vigente y no cambia el Registro Canónico de Requisitos de Prueba.

#### 59. Cobertura de prueba vigente reutilizada

Sin modificar 04A, esta tarea reutiliza principalmente:

- `TREQ-UX-002` — errores, bloqueos y fallos parciales deben explicar qué ocurrió, qué se conservó y cómo continuar sin duplicar efectos;
- `TREQ-UX-031` — separación de `WAITING` y `BLOCKED`, causa, responsable, siguiente acción, escalamiento y revisión;
- `TREQ-UX-037` — estados sin contexto, permiso, trabajo o sincronización diferenciados sin fabricar una salida;
- `TREQ-UX-038` — bloqueo y estado comunicados mediante señales accesibles y redundantes;
- `TREQ-UX-039` — métricas interpretadas con contexto y sin uso disciplinario aislado;
- `TREQ-UX-054` — proyección humana de estados sin inferir lógica desde copy;
- `TREQ-UX-055` — mensaje humano, efecto, siguiente paso y referencia segura con detalle técnico separado;
- `TREQ-UX-097` — taxonomía diferenciada de bloqueo, denegación, espera, conflicto, fallo técnico, validación, warning e info;
- `TREQ-UX-099` — anatomía mínima de título, causa, efecto, estado preservado, acción, responsable, revisión y referencia;
- `TREQ-UX-100` — recuperación concreta y retry únicamente cuando repetir sea seguro;
- `TREQ-UX-101` — estado preservado veraz y prohibición de interpretar timeout como operación no ejecutada;
- `TREQ-UX-102` — responsable y escalamiento con contexto, sin salida universal de administrador;
- `TREQ-UX-103` — denegación segura sin fuga de información ni bypass;
- `TREQ-UX-104` — bloqueos de contexto sin fallback permisivo;
- `TREQ-UX-105` — validaciones corregibles que indican el dato o condición exactos;
- `TREQ-UX-106` — esperas con evento, propietario, revisión, custodia y escalamiento;
- `TREQ-UX-107` — conflictos sin sobrescritura silenciosa;
- `TREQ-UX-108` — estados offline y sincronización diferenciados;
- `TREQ-UX-109` — fallos técnicos diferenciados y conciliación antes de repetir cuando el resultado es desconocido;
- `TREQ-UX-110` — divulgación segura y antienumeración;
- `TREQ-UX-111` — mensajes correctos en dispositivos compartidos;
- `TREQ-UX-112` — resultados parciales y retries por elemento sin duplicación;
- `TREQ-UX-113` — coherencia cross-app con revalidación al abrir;
- `TREQ-UX-114` — accesibilidad de explicación y recuperación;
- `TREQ-UX-115` — lenguaje directo, neutral, no punitivo y localizable;
- `TREQ-UX-189` — requisitos condicionales visibles antes de confirmar;
- `TREQ-UX-346` — explicación previa de propósito, efecto, owner y requisitos en flujos guiados;
- `TREQ-UX-353` — requisitos condicionales con causa visible;
- `TREQ-UX-356` — error guiado con causa, lugar de corrección y datos conservados;
- `TREQ-UX-421` — validación preventiva en momentos proporcionales del flujo.

Estas referencias son trazabilidad heredada y no una actualización del registro.

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido incorporado ni sometido a la batería documental del checkout local de `UX-QA-004`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía `format --write`, `format --check`, quality, delivery, topología, TREQ ni batería global sobre la rama local de `UX-QA-004`. |
| REMOTA | PASS | Se verificaron protocolo, contrato de entrega, manifest modular, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, archivo propietario, marcadores `UX-QA-004` y `UX-QA-005`, `UX-HUMAN-BLOCKING-EXPLANATION-CONTRACT-001`, contratos de conectividad/reanudación y Registro Canónico UX vigentes; el handoff inmediato proviene además del artefacto completo aprobado de `UX-QA-003` usado como base para trabajo documental adelantado. |
| OPERATIVA | NOT_EXECUTED | No se han ejecutado todavía sesiones controladas con trabajadores, inyección de impedimentos, mediciones de recuperación ni escenarios de retry, conflicto, timeout, validación o escalamiento sobre packages materializados. |
| FÍSICA | NOT_EXECUTED | No se han materializado instancias físicas de `UX-QA-004` ni su certificación global final; la ejecución física permanece sujeta a `POST_E5_PACKAGE` y autorización física fuera de este carril. |

#### 61. Criterios de aceptación

- [ ] El título es exactamente `UX-QA-004 — Los errores indican cómo continuar`.
- [ ] La continuidad es `UX-QA-003 → UX-QA-004 → UX-QA-005`.
- [ ] La topología permanece `PER_PACKAGE_AND_GLOBAL_FINAL`.
- [ ] El gate físico permanece `POST_E5_PACKAGE`.
- [ ] La tarea no declara ejecución física inexistente.
- [ ] Foco, acción primaria y estado se consumen como handoff y no se redefinen.
- [ ] La explicación clasifica de forma coherente la condición aplicable.
- [ ] Mensaje humano, reason code, autorización y estado de dominio permanecen separados.
- [ ] La persona comprende qué ocurrió y qué efecto produjo.
- [ ] La persona conoce qué trabajo o dato quedó preservado cuando sea material.
- [ ] La acción de recuperación es concreta y ejecutable por el actor.
- [ ] Retry se ofrece únicamente cuando repetir es seguro.
- [ ] Un resultado desconocido no induce retry ciego.
- [ ] `BLOCKED`, `DENIED` y `WAITING` conservan significados distintos.
- [ ] `VALIDATION_REQUIRED` identifica qué debe corregirse.
- [ ] Un conflicto no sobrescribe silenciosamente trabajo.
- [ ] Un fallo técnico no expone información técnica innecesaria.
- [ ] Un resultado parcial no se presenta como éxito global.
- [ ] La recuperación no duplica efectos ya confirmados.
- [ ] El responsable o condición de revisión es resoluble cuando corresponda.
- [ ] La referencia de soporte es segura y utilizable cuando corresponda.
- [ ] La explicación no ofrece bypass de autorización.
- [ ] La explicación conserva privacidad y antienumeración.
- [ ] Cross-app y notificaciones revalidan estado y autorización al abrir.
- [ ] Dispositivos compartidos separan problemas de actor y dispositivo.
- [ ] La recuperación no depende solo de color, icono, hover, sonido o vibración.
- [ ] El lenguaje es directo, neutral y no punitivo.
- [ ] Un mensaje resuelto, stale o superseded no permanece como instrucción vigente.
- [ ] El oráculo se define antes del caso.
- [ ] Ayuda que revela directamente la recuperación no se cuenta como comprensión autónoma.
- [ ] No se crea un umbral global arbitrario después de observar resultados.
- [ ] Las métricas no se usan aisladamente para sancionar trabajadores.
- [ ] `UX-QA-005` conserva la certificación específica de opciones irrelevantes por rol.
- [ ] La sección `Requisitos de prueba derivados` declara literalmente cero cambios y no contiene IDs TREQ.
- [ ] No se modifica 04A.

#### 62. Condiciones de fallo o bloqueo físico futuro

La instancia física futura no puede cerrar `PASS` si:

- la causa humana suficiente no puede determinarse;
- el participante no comprende el efecto real;
- el estado preservado mostrado es falso;
- la recuperación propuesta no es ejecutable por el actor;
- se ofrece retry sobre resultado desconocido;
- se ofrece retry que puede duplicar un efecto;
- una denegación ofrece bypass;
- una espera se presenta como fallo;
- un bloqueo no identifica condición de salida cuando esta existe;
- una validación corregible no indica qué corregir;
- un conflicto sobrescribe silenciosamente;
- un resultado parcial se presenta como éxito global;
- el escalamiento carece de responsable o contexto suficiente cuando es necesario;
- la referencia de soporte revela información sensible o no sirve para correlación;
- la explicación depende de una señal inaccesible;
- el mensaje stale continúa guiando una acción ya inválida;
- el facilitador debe explicar directamente qué hacer;
- el package no declara sus escenarios obligatorios;
- la evidencia es `STALE`.

#### 63. Handoff a `UX-QA-005`

`UX-QA-004` entrega a `UX-QA-005`:

- foco correcto;
- acción primaria correcta;
- estado actual comprendido;
- errores e impedimentos clasificados con semántica coherente;
- recuperación segura y accionable cuando la condición es relevante;
- distinción entre bloqueo relevante y opción irrelevante;
- autorización y privacidad preservadas;
- contexto, actor y dispositivo resueltos;
- señal de qué controles son materialmente necesarios para continuar.

`UX-QA-005` podrá evaluar si cada rol ve únicamente información y acciones pertinentes, sin conservar opciones irrelevantes como ruido ni ocultar obligaciones realmente bloqueadas.

#### 64. Límites

Esta tarea no:

- crea reason codes;
- modifica categorías runtime;
- cambia estados de dominio;
- redefine state machines;
- implementa componentes;
- modifica copy en runtime;
- crea rutas;
- modifica navegación;
- cambia prioridades;
- crea work items;
- ejecuta claims;
- inicia o completa trabajo;
- cambia ownership;
- ejecuta handoffs;
- modifica autorización;
- ejecuta retries;
- ejecuta conciliaciones;
- resuelve conflictos físicos;
- crea mecanismos offline;
- modifica datos;
- modifica Supabase;
- modifica telemetría;
- implementa observabilidad;
- crea tickets o escalamiento físico;
- ejecuta estudios con trabajadores;
- decide la composición completa de opciones por rol;
- certifica `UX-QA-005`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 65. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-003 — El trabajador comprende el estado del proceso`

**TAREA ACTUAL APROBADA**
`UX-QA-004 — Los errores indican cómo continuar`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-005 — Un rol no ve opciones irrelevantes`
### ✅ UX-QA-005 — Un rol no ve opciones irrelevantes

**Estado:** APROBADA
**Tarea anterior:** UX-QA-004 — Los errores indican cómo continuar
**Tarea siguiente:** UX-QA-006 — Las pantallas táctiles funcionan en tablet
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que la superficie presentada a un actor contiene únicamente capacidades, datos, navegación, acciones, alertas y controles pertinentes para su intención, tarea, etapa, autorización y contexto vigentes, sin construir una unión indiscriminada de permisos, sin reintroducir funciones irrelevantes por búsqueda, favoritos, deep links, caché o dispositivos compartidos, sin ocultar obligaciones materialmente necesarias y sin confundir relevancia con autorización, seguridad o diseño táctil
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de relevancia contextual por actor y rol definido; las ejecuciones `UX-QA-005::<package_id>` y la certificación `UX-QA-005::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume foco, acción, estado y recuperación ya definidos por `UX-QA-001` a `UX-QA-004`, el contrato aprobado `UX-CONTEXTUAL-RELEVANCE-CONTRACT-001` y la cobertura UX vigente, pero no infiere que ningún package, aplicación, superficie, rol, dispositivo o cohorte humana ya haya superado la prueba
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan sesiones con trabajadores, pruebas E2E, cambios de navegación, permisos, roles, componentes, copy, rutas, layouts, payloads, masking, datos, Supabase, caché, búsqueda, favoritos, deep links, dispositivos, instrumentación, despliegues ni modificaciones de producto
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que, para una persona situada en una tarea y contexto concretos, la experiencia responde de forma correcta y verificable:

```text
¿VEO SOLO LO QUE NECESITO PARA ESTA INTENCIÓN Y ESTE TRABAJO?
¿LAS OPCIONES QUE NO ME CORRESPONDEN QUEDAN FUERA DEL FLUJO ORDINARIO?
¿LAS OBLIGACIONES QUE SÍ ME CORRESPONDEN SIGUEN VISIBLES AUNQUE ESTÉN BLOQUEADAS?
¿CAMBIAR DE ROL, TAREA O CONTEXTO RECONSTRUYE CORRECTAMENTE LA SUPERFICIE?
```

La certificación no busca producir una interfaz mínima por estética. Busca demostrar que la composición visible conserva relevancia, seguridad perceptual, obligaciones y contexto sin convertir el menú en una copia de todos los permisos del actor.

#### 2. Resultado canónico

`UX-QA-005` establece `UX-QA-CONTEXTUAL-RELEVANCE-CERTIFICATION-001@1.0.0`.

Este resultado define:

- la unidad certificable de relevancia;
- las dimensiones que deben fijarse antes de observar la superficie;
- la separación entre autorización, relevancia, visibilidad, descubrimiento, habilitación y obligación;
- los estados de presentación esperados;
- el oracle para decidir qué debe aparecer, relegarse, explicarse u ocultarse;
- la cobertura mínima por actor, rol, carril, tarea, etapa, territorio, dispositivo y contexto;
- la evidencia por package;
- la evidencia global final;
- los fallos que invalidan la certificación.

No crea una policy runtime nueva ni un schema físico.

#### 3. Alcance exacto de la certificación

La prueba cubre, cuando existan en el package evaluado:

- aplicaciones y accesos entre aplicaciones;
- navegación primaria y secundaria;
- destinos y rutas;
- vistas, secciones, tabs y cards;
- acciones primarias y secundarias;
- acciones masivas;
- campos, columnas y filtros;
- indicadores, badges y agregados;
- alertas y notificaciones;
- búsqueda;
- favoritos y recientes;
- deep links y aliases;
- estados vacíos;
- opciones de configuración;
- superficies de supervisión;
- superficies administrativas;
- superficies de auditoría;
- experiencias personales, de cliente o candidato;
- dispositivos personales y compartidos;
- comportamiento con contexto fresco, cambiado u obsoleto.

La cobertura se limita a superficies y capacidades realmente materializadas por cada package. No exige inventar una pantalla para probar una capacidad inexistente.

#### 4. Handoff recibido de `UX-QA-004`

La prueba recibe como precondiciones:

- foco de trabajo correctamente identificado;
- acción principal correctamente comprendida;
- estado del proceso correctamente comprendido;
- bloqueos, esperas, denegaciones, conflictos y fallos diferenciados;
- recuperación segura disponible cuando corresponde;
- distinción entre obligación bloqueada y capacidad irrelevante;
- contexto, actor y dispositivo resueltos;
- autorización y privacidad preservadas;
- señal suficiente para saber qué controles son materialmente necesarios para continuar.

`UX-QA-005` no vuelve a evaluar la calidad completa del mensaje de error. Evalúa si ese mensaje o control aparece únicamente cuando corresponde al actor y al contexto evaluados.

#### 5. Frontera con autorización

Regla canónica:

```text
AUTORIZADO
≠ RELEVANTE AHORA

VISIBLE
≠ AUTORIZADO

OCULTO
≠ DENEGADO
```

La prueba no considera correcto mostrar una función únicamente porque exista permiso para ella.

La superficie ordinaria deberá excluir capacidades que:

- no pertenecen a la intención actual;
- corresponden a otra etapa;
- pertenecen a otro carril;
- requieren otro territorio;
- son propias de otro actor;
- no aportan al resultado actual;
- son excepcionales o avanzadas fuera de su entrada aprobada.

La protección del servidor permanece obligatoria aunque una opción esté oculta.

#### 6. Frontera con `UX-QA-006`

`UX-QA-006` certificará que las pantallas táctiles aplicables funcionan correctamente en tablet.

Por tanto, `UX-QA-005` puede exigir que la composición visible sea correcta en una superficie tablet, pero no certifica:

- tamaño de objetivos táctiles;
- separación física entre controles;
- orientación;
- zoom;
- teclado virtual;
- uso con guantes;
- montaje físico;
- postura;
- brillo;
- distancia de lectura;
- interacción específica con periféricos.

El handoff hacia `UX-QA-006` entrega una superficie ya depurada por relevancia.

#### 7. Frontera con `UX-QA-007`

`UX-QA-007` certificará que las vistas administrativas no contaminan la operación.

`UX-QA-005` sí verifica que una opción administrativa irrelevante no aparezca ante un rol o tarea operativa concretos, pero no absorbe la certificación estructural completa de separación entre superficies administrativas y operativas reservada a `UX-QA-007`.

#### 8. Qué significa rol en esta prueba

El nombre del rol no es suficiente para construir el oracle.

Cada caso fija como mínimo:

- actor efectivo;
- identidad de dominio;
- rol base;
- rol operativo efectivo, cuando aplique;
- delegación o simulación, cuando aplique;
- carril de experiencia;
- intención actual;
- tarea o caso actual;
- proceso y etapa;
- recurso;
- empresa, sede y área;
- turno y check-in cuando sean obligatorios;
- dispositivo;
- frescura;
- sensibilidad;
- vigencia.

El rol es una dimensión de la proyección, no su única fuente.

#### 9. Caso base de comparación

Una certificación no se realiza con capturas aisladas de un único actor.

Cada escenario relevante tendrá al menos un contraste entre:

```text
ACTOR A
→ opción relevante

ACTOR B O CONTEXTO B
→ misma opción irrelevante, no revelable o relegada
```

cuando exista una variante real del proceso que permita esa comparación.

El contraste puede variar rol, carril, etapa, territorio, custodia, turno, dispositivo o intención, siempre que el factor cambiado quede registrado.

#### 10. Unidad mínima de relevancia

El oracle no se limita a la existencia de una ruta.

Puede evaluar individualmente:

- aplicación;
- grupo de navegación;
- destino;
- vista;
- sección;
- tab;
- card;
- campo;
- columna;
- filtro;
- indicador;
- alerta;
- acción;
- enlace cross-app;
- notificación;
- resultado de búsqueda;
- badge;
- agregado;
- estado vacío.

Una pantalla puede ser relevante y contener elementos irrelevantes. La aprobación de la pantalla no blanquea todos sus elementos internos.

#### 11. Estados de presentación observables

La evidencia utilizará las semánticas canónicas:

```text
PRIMARY
SECONDARY
DISCOVERABLE
CONTEXTUAL_DISABLED
REQUIRED_BLOCKED
HIDDEN
```

Interpretación para la prueba:

| Estado | Expectativa observable |
| --- | --- |
| `PRIMARY` | visible de inmediato como acción o destino dominante de la tarea |
| `SECONDARY` | visible con menor jerarquía y vinculado al mismo resultado o proceso |
| `DISCOVERABLE` | fuera del flujo principal; accesible únicamente mediante mecanismo autorizado y pertinente |
| `CONTEXTUAL_DISABLED` | visible porque sigue siendo relevante, no accionable y acompañado de explicación |
| `REQUIRED_BLOCKED` | obligación vigente visible aunque no pueda completarse aún |
| `HIDDEN` | fuera de la superficie, tab order y árbol accesible ordinarios |

#### 12. Oracle principal

Para cada elemento evaluado se responde, en este orden:

```text
1. ¿EL ACTOR PUEDE CONOCER SU EXISTENCIA?
2. ¿ESTÁ AUTORIZADO PARA EL ALCANCE CORRESPONDIENTE?
3. ¿ES RELEVANTE PARA LA INTENCIÓN, TAREA Y ETAPA ACTUALES?
4. ¿ES UNA OBLIGACIÓN QUE NO PUEDE OCULTARSE?
5. ¿PUEDE EJECUTARSE AHORA?
6. ¿REQUIERE UNA SUPERFICIE SEPARADA?
7. ¿DEBE SER PRIMARY, SECONDARY, DISCOVERABLE, CONTEXTUAL_DISABLED, REQUIRED_BLOCKED O HIDDEN?
```

La respuesta esperada procede de contratos y estado autoritativos, no de lo que el frontend haya decidido renderizar.

#### 13. Irrelevante no significa prohibido

Una capacidad autorizada puede ser irrelevante en la superficie actual y convertirse en relevante después de un cambio explícito de intención o carril.

Ejemplo:

```text
GERENTE REVISANDO HORARIOS
→ horarios, cobertura, conflictos, publicación
↛ inventario, recetas y proveedores
```

Que el gerente pueda acceder posteriormente a otro dominio no obliga a mostrar ese dominio dentro de la tarea actual.

#### 14. Irrelevante no significa escondido para siempre

`DISCOVERABLE` es válido cuando:

- la capacidad está autorizada;
- no compite con el flujo ordinario;
- existe una razón legítima para conservar descubribilidad;
- el mecanismo de acceso revalida contexto;
- abrirla representa un cambio de intención coherente.

La prueba falla si el mecanismo secundario se convierte en un menú universal disfrazado.

#### 15. Obligación bloqueada no es irrelevante

No se permite reducir ruido ocultando una obligación vigente.

Debe permanecer visible como `REQUIRED_BLOCKED` cuando, por ejemplo:

- existe una recepción bajo custodia pendiente;
- debe resolverse un conteo rechazado;
- falta completar un documento obligatorio;
- hay una alerta de seguridad aplicable;
- existe un cierre de jornada pendiente;
- el actor conserva una responsabilidad que no puede ejecutar temporalmente.

La prueba falla si una política de minimización hace desaparecer la obligación.

#### 16. Acción relevante temporalmente deshabilitada

Una capacidad `CONTEXTUAL_DISABLED` se conserva visible si:

- pertenece al trabajo actual;
- el actor sigue siendo el responsable adecuado;
- una precondición temporal impide ejecutarla;
- la causa puede explicarse sin revelar información indebida.

Debe existir explicación perceptible y la opción no debe presentarse como si fuera irrelevante.

#### 17. Superficie operativa

En un caso operativo se espera priorizar:

1. tarea actual;
2. acción siguiente;
3. recurso;
4. evidencia necesaria;
5. estado;
6. bloqueo o handoff;
7. obligaciones compatibles.

La prueba busca como falsos positivos ordinarios:

- catálogos maestros;
- configuración global;
- matrices de permisos;
- reportes gerenciales densos;
- exportaciones no relacionadas;
- auditoría técnica;
- acciones de otra etapa;
- controles administrativos sin relación con el trabajo.

#### 18. Superficie administrativa

Una superficie administrativa no obtiene excepción a la regla de relevancia.

Debe limitarse por:

- territorio;
- proceso;
- periodo;
- población;
- decisión pendiente;
- autoridad;
- sensibilidad;
- segregación de funciones.

Un actor con permisos amplios no recibe automáticamente un catálogo completo de capacidades.

#### 19. Supervisión

La prueba verifica que supervisar no se convierta visualmente en ejecutar, configurar o corregir todo.

Una superficie de supervisión puede mostrar:

- estado operativo;
- bloqueos;
- riesgos;
- carga;
- SLA;
- excepciones que requieren intervención;
- evidencia necesaria para coordinar.

No debe ofrecer por defecto acciones que fabriquen hechos operativos en nombre de otro actor ni controles globales no relacionados.

#### 20. Configuración, gobierno y auditoría

Estas capacidades no compiten con el flujo ordinario únicamente porque el actor tenga permisos.

La prueba exige intención explícita y superficie apropiada para:

- mantener catálogos;
- cambiar políticas;
- editar plantillas;
- administrar reglas;
- versionar configuración;
- inspeccionar auditoría;
- gobernar roles, permisos o integraciones.

Ver evidencia de auditoría no convierte la observación en capacidad de corregir la fuente.

#### 21. Experiencia personal, cliente y candidato

Cuando una persona actúa sobre su propio caso, la superficie se limita a la información y acciones que le corresponden.

La prueba busca exposición impropia de:

- herramientas internas;
- notas privadas;
- scores internos;
- comparaciones con terceros;
- datos de otros actores;
- estructuras técnicas internas;
- acciones de backoffice.

Una misma identidad técnica con relaciones diferentes no fusiona automáticamente sus menús.

#### 22. Actores con múltiples roles

Regla crítica:

```text
ROL A + ROL B + DELEGACIÓN + SIMULACIÓN
≠ MENÚ ÚNICO CON TODO
```

La prueba verifica que:

- el carril activo sea explícito;
- la intención actual limite la superficie;
- cambiar de carril reconstruya la proyección;
- una simulación sea perceptible;
- las capacidades de otro carril no permanezcan mezcladas;
- los filtros administrativos no se conviertan en contexto operativo.

#### 23. Proceso, etapa, recurso y custodia

Ver un recurso no vuelve pertinentes todas sus acciones.

La evidencia deberá cubrir, cuando aplique:

- acciones válidas únicamente en una etapa;
- acciones futuras que no deben aparecer como CTA actual;
- recursos asignados a otro actor;
- custodia vigente;
- extremo correcto de un handoff;
- territorio correcto;
- cambios de estado que vuelven irrelevante un control previamente visible.

#### 24. Cambios de contexto

Se debe demostrar que la proyección se invalida ante un cambio material de:

- actor;
- rol operativo;
- sede;
- área;
- turno;
- check-in;
- dispositivo;
- permiso;
- asignación;
- estado;
- custodia;
- delegación;
- simulación;
- sensibilidad;
- vigencia.

Una opción del contexto anterior que permanezca visible después del cambio constituye fallo.

#### 25. Dispositivos compartidos

El dispositivo define límites, no identidad humana.

Para un relevo de actor se prueba que:

- se reconstruya la proyección;
- desaparezcan opciones personales del actor anterior;
- favoritos del actor anterior no sobrevivan como autoridad;
- recientes no revelen datos anteriores;
- búsquedas no conserven resultados de otro actor;
- obligaciones del nuevo actor aparezcan según su propio contexto;
- sin actor no se expongan capacidades humanas como si existiera una sesión válida.

#### 26. Búsqueda

La búsqueda no constituye bypass de relevancia.

Debe:

- filtrar antes de mostrar;
- revalidar autorización;
- revalidar contexto;
- evitar títulos sensibles cuando el actor no debe conocerlos;
- evitar resultados de otra sede, actor o carril;
- devolver cero resultados de forma honesta cuando corresponda.

#### 27. Favoritos y recientes

Los favoritos conservan identidad semántica, no autoridad ni relevancia eterna.

Un favorito o reciente debe:

- revalidarse al abrir;
- desaparecer o degradarse cuando deja de ser pertinente;
- no conservar datos del actor anterior;
- no reintroducir capacidades revocadas;
- no saltar el cambio explícito de carril requerido.

#### 28. Deep links y aliases

Conocer una URL no convierte el destino en pertinente ni visible.

La prueba verifica que:

- se revalide actor;
- se revalide contexto;
- se revalide recurso;
- se revalide estado;
- no se muestre información sensible antes de resolver visibilidad;
- aliases legacy no revivan funciones retiradas;
- un enlace válido pero no pertinente redirija o responda de acuerdo con el contrato aprobado sin ampliar acceso.

#### 29. Navegación cross-app

Una opción cross-app solo aparece cuando la intención humana es relevante.

La prueba falla si una aplicación muestra todos los destinos del ecosistema únicamente porque el actor puede abrirlos desde SHELL.

El enlace permitido:

- declara finalidad humana;
- identifica la aplicación propietaria cuando sea útil;
- no transporta autoridad;
- no transporta un contexto inválido;
- exige revalidación en destino.

#### 30. Alertas y notificaciones

Una alerta debe corresponder a una necesidad real de:

- actuar;
- decidir;
- conocer;
- seguir;
- escalar;
- cumplir.

No basta con que el actor tenga acceso genérico al dominio.

La prueba verifica que alertas dirigidas a otro rol, territorio, caso o etapa no aparezcan como propias.

#### 31. Estados vacíos

La prueba distingue:

```text
NO HAY DATOS EN EL ALCANCE
NO HAY TRABAJO PARA ESTE ACTOR
NO HAY TRABAJO EN ESTE CONTEXTO
EXISTE TRABAJO PERO NO ES VISIBLE
FALTA CONTEXTO
LA INFORMACIÓN NO PUDO CARGARSE
LA PROYECCIÓN ESTÁ DESACTUALIZADA
```

Un estado vacío falla si ofrece crear, configurar, importar o administrar cuando esas acciones no son pertinentes para el actor y contexto actuales.

#### 32. Personalización

Las preferencias pueden reorganizar elementos permitidos, pero no cambiar el universo autorizado y relevante.

La prueba falla si personalización permite:

- mostrar una función no autorizada;
- fijar una opción que ya no es relevante;
- ocultar una obligación crítica;
- convertir una excepción en acción primaria;
- heredar preferencias de otro actor en un dispositivo compartido;
- revelar un campo que el contrato actual dejó de exponer.

#### 33. Excepciones y opciones avanzadas

Una excepción no es relevante por el solo hecho de que el actor pueda solicitarla.

Cuando exista una salida excepcional válida:

- no compite con la acción ordinaria;
- se identifica como flujo separado;
- conserva autoridad y motivo;
- conserva evidencia y vigencia;
- retorna al flujo cuando corresponde.

Las opciones avanzadas legítimas deben permanecer fuera del flujo principal sin ocultar datos u obligaciones críticos.

#### 34. Campos, columnas y filtros

La relevancia se aplica dentro de la pantalla.

La prueba verifica que el actor no reciba visualmente campos o columnas que:

- no necesita para actuar o decidir;
- pertenecen a otro carril;
- pertenecen a otro territorio;
- contienen información sensible innecesaria;
- son configuración interna;
- solo interesan a auditoría o soporte técnico.

Esta tarea no certifica por sí sola toda la seguridad de datos de `UX-QA-016`; sí certifica que los datos irrelevantes no formen parte de la experiencia ordinaria observada.

#### 35. Badges, totales y agregados

Ocultar una lista no basta si un agregado revela el universo oculto.

La prueba busca filtraciones de relevancia mediante:

- contadores;
- badges;
- gráficos;
- previews;
- tooltips;
- autocompletados;
- nombres de archivo;
- texto de notificación;
- estados vacíos.

Los agregados observados deben tener alcance igual o más restrictivo que el detalle autorizado para ese actor.

#### 36. Accesibilidad de la relevancia

La reducción de opciones debe conservar accesibilidad.

La prueba exige que:

- `HIDDEN` no permanezca en tab order;
- `HIDDEN` no permanezca en árbol accesible ordinario;
- `CONTEXTUAL_DISABLED` tenga explicación perceptible;
- `REQUIRED_BLOCKED` permanezca navegable cuando sea una obligación;
- la acción primaria mantenga orden lógico de foco;
- no se dependa solo de color u opacidad;
- la eliminación visual no destruya la única ruta usable por teclado o lector de pantalla.

#### 37. Caché, offline y frescura

Una proyección obsoleta no puede ampliar opciones.

Se evalúan, cuando apliquen:

```text
FRESH
STALE_READ_ONLY
OFFLINE_ALLOWED
REFRESH_REQUIRED
REVOKED
```

La prueba falla si:

- reaparece una capacidad por caché antigua;
- una revocación se ignora al reconectar;
- un actor nuevo recibe el menú cacheado del anterior;
- una tarea iniciada conserva más información que la necesaria;
- una acción local se sincroniza sin revalidación.

#### 38. Clases mínimas de escenario

Cada package seleccionará las clases aplicables y justificará las no aplicables:

| Clase | Escenario |
| --- | --- |
| `R1_OPERATIONAL` | trabajador en ejecución ordinaria |
| `R2_SUPERVISORY` | supervisor observando o resolviendo excepciones autorizadas |
| `R3_ADMINISTRATIVE` | actor realizando decisión o mantenimiento administrativo |
| `R4_PERSONAL` | persona actuando sobre su propio caso |
| `R5_MULTI_ROLE` | actor con más de un rol o carril disponible |
| `R6_CONTEXT_CHANGE` | cambio de sede, área, turno, etapa, custodia o asignación |
| `R7_SHARED_DEVICE` | cambio de actor en tablet, kiosco o estación compartida |
| `R8_DIRECT_ENTRY` | búsqueda, favorito, reciente, deep link o alias |
| `R9_REQUIRED_BLOCKED` | obligación vigente temporalmente bloqueada |
| `R10_STALE_OR_OFFLINE` | proyección obsoleta, offline o revocada |
| `R11_CROSS_APP` | destino o alerta entre aplicaciones |
| `R12_EMPTY_STATE` | ausencia de trabajo, falta de contexto o falta de visibilidad |

No todos los packages deben materializar las doce clases. Sí deben declarar su matriz de aplicabilidad.

#### 39. Casos positivos

Un caso positivo demuestra, según corresponda:

- acción principal visible;
- opciones secundarias pertinentes con menor jerarquía;
- obligación bloqueada visible y explicada;
- función autorizada pero no ordinaria relegada a `DISCOVERABLE`;
- superficie reconstruida correctamente tras cambiar de rol o contexto;
- alerta pertinente dirigida al actor correcto;
- enlace cross-app pertinente;
- estado vacío que no inventa administración ni configuración;
- personalización limitada al conjunto permitido.

#### 40. Casos negativos

Debe existir evidencia negativa para las fronteras de mayor riesgo aplicables.

Ejemplos:

- opción de otro rol ausente;
- opción de otra etapa ausente;
- configuración ausente durante operación;
- función de otro territorio ausente;
- capacidad del actor anterior ausente en dispositivo compartido;
- resultado sensible ausente de búsqueda;
- favorito obsoleto sin autoridad residual;
- deep link sin revelación previa;
- campo irrelevante ausente;
- badge sin filtración de elementos ocultos;
- obligación bloqueada no convertida en `HIDDEN`.

#### 41. Oracle documental por elemento

Cada elemento materialmente evaluado tendrá:

```text
semantic_id
surface_id
actor_fixture
role_context
intent
process_stage
resource_scope
expected_presentation_state
expected_visibility
expected_actionability
expected_reason
observed_result
verdict
```

La forma anterior es de evidencia documental. No obliga a crear un contrato runtime con estos campos.

#### 42. Identidad de caso físico futuro

Las ejecuciones usarán:

```text
UX-QA-005::<package_id>
```

para certificación por package, y:

```text
UX-QA-005::GLOBAL-FINAL
```

para el cierre transversal.

No existe una única instancia global que sustituya las ejecuciones por package.

#### 43. Evidencia por package

Cada package aplicable deberá conservar como mínimo:

- `package_id`;
- aplicaciones y superficies evaluadas;
- versión desplegada;
- ambiente;
- actor o fixture de actor;
- rol y carril efectivos;
- contexto relevante;
- matriz de clases aplicables;
- elementos positivos esperados;
- elementos negativos esperados;
- obligaciones bloqueadas esperadas;
- método de observación;
- evidencia de accesibilidad cuando aplique;
- resultados observados;
- defectos abiertos;
- responsable de corrección;
- estado final.

#### 44. Evidencia automatizada

Cuando la superficie permita inspección automatizada, la evidencia puede incluir:

- navegación renderizada;
- elementos accesibles;
- ausencia de semantic IDs no permitidos;
- estados de presentación;
- deshabilitación de controles relevantes;
- cambios tras modificar contexto;
- respuestas a deep links;
- resultados de búsqueda;
- limpieza tras cambio de actor;
- invariantes de caché.

La automatización no sustituye la validación humana cuando la pregunta sea de carga cognitiva, pertinencia semántica o comprensión del carril.

#### 45. Evidencia con actores reales

Cuando el package llegue al gate físico correspondiente, los escenarios humanos aplicables observarán si la persona:

- identifica rápidamente la acción relevante;
- no explora opciones ajenas para completar la tarea;
- no interpreta funciones administrativas como parte del flujo ordinario;
- reconoce obligaciones bloqueadas como propias;
- cambia de carril de manera explícita cuando necesita otra intención;
- no depende de memorizar rutas ocultas para completar trabajo legítimo.

El facilitador no debe indicar dónde está la opción correcta salvo que el caso haya sido clasificado como asistencia y quede separado de la medición autónoma.

#### 46. Métricas obligatorias de integridad

Se registran, cuando sean observables:

```text
irrelevant_visible_count
forbidden_visible_count
required_hidden_count
stale_context_visible_count
previous_actor_residue_count
inaccessible_hidden_residue_count
wrong_lane_primary_count
wrong_stage_action_count
```

Para una ejecución PASS:

```text
irrelevant_visible_count = 0 para los elementos declarados irrelevantes por el oracle
forbidden_visible_count = 0
required_hidden_count = 0
stale_context_visible_count = 0
previous_actor_residue_count = 0
inaccessible_hidden_residue_count = 0
wrong_lane_primary_count = 0
wrong_stage_action_count = 0
```

No se congela un máximo universal de opciones visibles. La cantidad correcta depende del package, tarea, carril y contexto.

#### 47. Métricas de experiencia no usadas como gate aislado

Pueden registrarse:

- tiempo hasta la primera acción válida;
- aperturas de menús secundarios;
- búsquedas para encontrar trabajo;
- cambios de carril;
- intentos sobre funciones no pertinentes;
- ayuda requerida;
- retrocesos;
- errores de selección.

Estas métricas requieren interpretación con complejidad, volumen, entrenamiento previo y contexto. No se usarán de forma aislada para evaluar a una persona.

#### 48. Severidad de hallazgos

| Hallazgo | Severidad mínima |
| --- | --- |
| opción no autorizada presentada como ejecutable | crítica |
| obligación vigente oculta | crítica |
| residuo del actor anterior en dispositivo compartido | crítica |
| control de otro contexto que conserva acción | crítica |
| dato sensible irrelevante expuesto | crítica |
| función irrelevante visible como CTA ordinario | alta |
| configuración compitiendo con operación | alta |
| alerta dirigida al rol equivocado | alta |
| elemento `HIDDEN` todavía en tab order o árbol accesible | alta |
| opción secundaria relevante con jerarquía imperfecta pero sin ambigüedad material | media |

Una severidad menor no convierte automáticamente el package en PASS; el gate debe aplicar sus criterios de cierre.

#### 49. Criterio por package

`UX-QA-005::<package_id>` obtiene PASS únicamente cuando:

- la matriz de aplicabilidad está completa;
- existe oracle trazable;
- los casos críticos y altos aplicables fueron ejecutados;
- no quedan exposiciones irrelevantes críticas o altas sin resolver;
- no existen obligaciones necesarias ocultas;
- los cambios de contexto aplicables reconstruyen correctamente la superficie;
- los mecanismos alternativos no reintroducen opciones inválidas;
- la evidencia no está stale respecto de la versión certificada.

#### 50. Criterio `GLOBAL-FINAL`

`UX-QA-005::GLOBAL-FINAL` obtiene PASS cuando:

- todos los packages aplicables tienen resultado final aceptable;
- no existe package omitido sin justificación;
- los contratos de presentación usados son compatibles;
- las clases críticas tienen cobertura transversal suficiente;
- no existe divergencia no explicada entre aplicaciones para la misma semántica;
- los defectos bloqueantes están cerrados;
- la evidencia corresponde a las versiones que se pretenden certificar.

El cierre global no sustituye un package faltante con una demostración genérica.

#### 51. Cambio de versión y stale evidence

La evidencia deja de ser suficiente cuando cambia materialmente:

- navegación;
- permisos;
- roles;
- relevancia;
- contexto;
- presentación de estados;
- composición de superficie;
- masking;
- búsqueda;
- favoritos;
- deep links;
- dispositivo compartido;
- aplicación propietaria;
- contrato de proceso.

Un cambio sin impacto demostrado puede conservar evidencia únicamente si el responsable registra por qué no altera el oracle ni el resultado observado.

#### 52. Seguridad y privacidad

Esta tarea no reemplaza pruebas específicas de autorización o privacidad.

Sin embargo, un PASS exige que la experiencia observada no contradiga esos contratos.

No se acepta como justificación:

```text
EL SERVIDOR LO BLOQUEA, ASÍ QUE PODEMOS MOSTRARLO
```

cuando la mera visibilidad contradice relevancia, minimización o no divulgación aprobadas.

#### 53. No inferencia desde implementación parcial

La existencia de componentes, estados de navegación, guards o políticas en código no certifica `UX-QA-005`.

Del mismo modo, una captura visual limpia no demuestra por sí sola:

- revalidación al cambiar contexto;
- ausencia en búsqueda;
- ausencia en árbol accesible;
- ausencia después de cambiar actor;
- comportamiento de deep links;
- cobertura de otros roles;
- coherencia entre packages.

La certificación exige evidencia de los escenarios aplicables.

#### 54. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea certifica cobertura ya registrada. No modifica el Registro Canónico de Requisitos de Prueba.

#### 55. Cobertura de prueba vigente reutilizada

La trazabilidad principal reutiliza, sin modificarlos:

- `TREQ-UX-003`;
- `TREQ-UX-008`;
- `TREQ-UX-013`;
- `TREQ-UX-016`;
- `TREQ-UX-017`;
- `TREQ-UX-029`;
- `TREQ-UX-037`;
- `TREQ-UX-047`;
- `TREQ-UX-049`;
- `TREQ-UX-055`;
- `TREQ-UX-059` a `TREQ-UX-076`;
- `TREQ-UX-094`;
- `TREQ-UX-097`;
- `TREQ-UX-099`;
- `TREQ-UX-102`;
- `TREQ-UX-105`;
- `TREQ-UX-143`;
- `TREQ-UX-186`;
- `TREQ-UX-229`;
- `TREQ-UX-234`.

La enumeración es trazabilidad de cobertura existente y no constituye alta ni modificación de requisitos.

#### 56. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La aprobación documental no ejecuta build de producto ni certificación física. |
| LOCAL | NOT_EXECUTED | El artefacto se prepara para incorporación mediante el lifecycle documental; los validadores del checkout permanecen pendientes hasta ejecutar la batería. |
| REMOTA | PASS | Se verificaron protocolo, contrato de entrega, manifest modular, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, archivo propietario, marcadores `UX-QA-005` y `UX-QA-006`, `UX-CONTEXTUAL-RELEVANCE-CONTRACT-001`, cobertura UX 04A vigente y el handoff completo aprobado de `UX-QA-004` usado como base adelantada. |
| OPERATIVA | NOT_EXECUTED | No se realizaron sesiones de observación con actores ni ejecución sobre superficies desplegadas. |
| FÍSICA | NOT_EXECUTED | No se materializaron ni ejecutaron instancias `UX-QA-005::<package_id>` ni `UX-QA-005::GLOBAL-FINAL`. |

#### 57. Criterios de aceptación

`UX-QA-005` queda documentalmente definida cuando se confirma que:

- [ ] la continuidad es `UX-QA-004 → UX-QA-005 → UX-QA-006`;
- [ ] autorización y relevancia permanecen separadas;
- [ ] el rol no se usa como única fuente de la proyección;
- [ ] la unidad de evaluación cubre elementos internos, no solo rutas completas;
- [ ] los seis estados de presentación tienen oracle explícito;
- [ ] `HIDDEN` no se usa para ocultar obligaciones vigentes;
- [ ] `REQUIRED_BLOCKED` y `CONTEXTUAL_DISABLED` permanecen distinguibles;
- [ ] las superficies operativas no exhiben capacidades administrativas irrelevantes;
- [ ] superficies administrativas siguen limitadas por intención y alcance;
- [ ] supervisión no se convierte en ejecución universal;
- [ ] múltiples roles no producen una unión indiscriminada de capacidades;
- [ ] cambios de actor o contexto reconstruyen la superficie;
- [ ] dispositivos compartidos no conservan opciones del actor anterior;
- [ ] búsqueda, favoritos, recientes y deep links revalidan relevancia;
- [ ] navegación cross-app muestra solo intenciones pertinentes;
- [ ] alertas llegan únicamente a quien debe conocer, decidir o actuar;
- [ ] estados vacíos no ofrecen acciones irrelevantes;
- [ ] personalización no amplía el conjunto permitido ni oculta obligaciones;
- [ ] campos, badges y agregados no reintroducen información irrelevante;
- [ ] elementos ocultos no permanecen en tab order o árbol accesible;
- [ ] caché y offline no amplían capacidades;
- [ ] existe matriz de escenarios aplicables por package;
- [ ] el resultado por package y `GLOBAL-FINAL` queda definido;
- [ ] las métricas críticas tienen umbral cero;
- [ ] no se fija un máximo universal arbitrario de opciones visibles;
- [ ] la sección `Requisitos de prueba derivados` declara cero cambios y no contiene IDs TREQ;
- [ ] la cobertura heredada está separada de la sección de cero cambios;
- [ ] no se ejecutó implementación física durante esta aprobación documental;
- [ ] `UX-QA-006` conserva íntegra la certificación táctil en tablet;
- [ ] `UX-QA-007` conserva íntegra la certificación estructural de no contaminación administrativa.

#### 58. Fallos que bloquean la certificación física

Bloquean el PASS cuando sean aplicables:

- una opción irrelevante aparece como `PRIMARY` o CTA ordinario;
- una opción no autorizada se presenta como ejecutable;
- una obligación requerida desaparece por simplificación;
- un cambio de contexto deja controles accionables del contexto anterior;
- un dispositivo compartido conserva navegación o datos del actor anterior;
- búsqueda, favorito, reciente o deep link reintroduce una capacidad inválida;
- un badge o agregado revela elementos que el actor no debe conocer;
- un elemento `HIDDEN` permanece accesible por teclado o lector;
- una caché antigua amplía capacidades;
- la matriz de roles o escenarios aplicables está incompleta;
- la evidencia pertenece a una versión materialmente distinta;
- el package no puede explicar por qué un elemento observado es relevante;
- el facilitador debe navegar por opciones irrelevantes para completar el caso;
- la evidencia contradice autorización, privacidad o contratos de proceso.

#### 59. Handoff a `UX-QA-006`

`UX-QA-005` entrega a `UX-QA-006`:

- foco principal depurado;
- opciones secundarias pertinentes;
- obligaciones bloqueadas preservadas;
- opciones irrelevantes fuera del flujo ordinario;
- contexto y actor correctos;
- navegación y controles reconstruidos para el contexto vigente;
- elementos ocultos fuera del foco y árbol accesible ordinario;
- superficie lista para evaluar interacción táctil sin ruido funcional ajeno.

`UX-QA-006` podrá evaluar tamaño, separación, interacción, orientación y condiciones físicas de tablet sin reabrir qué capacidades deben estar presentes para el rol.

#### 60. Límites

Esta tarea no:

- crea roles;
- crea permisos;
- modifica autorización;
- redefine RLS;
- crea una policy runtime de relevancia;
- crea componentes;
- modifica navegación;
- modifica rutas;
- modifica copy;
- cambia layouts;
- cambia campos;
- cambia masking;
- modifica payloads;
- cambia búsqueda;
- modifica favoritos;
- cambia deep links;
- cambia caché;
- modifica comportamiento offline;
- modifica datos;
- modifica Supabase;
- ejecuta pruebas con usuarios;
- ejecuta pruebas E2E;
- certifica targets táctiles;
- certifica `UX-QA-006`;
- certifica la separación administrativa completa de `UX-QA-007`;
- certifica en profundidad la ocultación de información sensible de `UX-QA-016`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 61. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-004 — Los errores indican cómo continuar`

**TAREA ACTUAL APROBADA**
`UX-QA-005 — Un rol no ve opciones irrelevantes`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-006 — Las pantallas táctiles funcionan en tablet`
### ✅ UX-QA-006 — Las pantallas táctiles funcionan en tablet

**Estado:** APROBADA
**Tarea anterior:** UX-QA-005 — Un rol no ve opciones irrelevantes
**Tarea siguiente:** UX-QA-007 — Las vistas administrativas no contaminan la operación
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que una superficie operativa materializada para tablet puede completarse mediante interacción táctil precisa, legible, accesible y segura bajo su perfil real de dispositivo, postura, orientación, montaje, ambiente, conectividad y periféricos, sin depender de precisión de mouse, hover, gestos ocultos, teclado físico, targets insuficientes, composición de escritorio encogida ni supuestos no comprobados sobre el puesto
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación táctil en tablet definido; las ejecuciones `UX-QA-006::<package_id>` y la certificación `UX-QA-006::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume la superficie depurada por relevancia de `UX-QA-005`, `TOUCH-BASELINE-1.0.0`, los contratos `UX-STATION-*`, la cobertura UX vigente y la materialización compartida actual `TabletTaskSurface` como evidencia técnica parcial, pero no infiere que ningún package, dispositivo, estación, montaje, cohorte humana o flujo desplegado ya haya superado una prueba táctil física
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pilotos, sesiones con trabajadores, pruebas sobre hardware real, cambios de componentes, CSS, layouts, targets, gestos, navegación, copy, flujos, periféricos, montaje, dispositivos, compras, permisos, datos, Supabase, despliegues ni modificaciones de producto
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que una pantalla destinada a operación en tablet no es únicamente responsive, sino realmente operable mediante tacto en el contexto físico para el que fue materializada.

La certificación deberá responder, para cada package aplicable:

```text
¿PUEDO COMPLETAR LA TAREA CON TACTO SIN PRECISIÓN DE MOUSE?
¿LOS CONTROLES SON ALCANZABLES, LEGIBLES Y DIFERENCIABLES?
¿ORIENTACIÓN, TECLADO, ZOOM Y REFLOW CONSERVAN CONTEXTO Y ACCIÓN?
¿DOBLE TOQUE, LATENCIA O RECONEXIÓN EVITAN EFECTOS DUPLICADOS?
¿EL USO REAL DE LA TABLET ES SEGURO EN EL PUESTO Y LA POSTURA PREVISTOS?
```

`RESPONSIVE` no constituye por sí solo evidencia de `TOUCH_READY`.

#### 2. Resultado canónico

`UX-QA-006` establece `UX-QA-TABLET-TACTILE-CERTIFICATION-001@1.0.0`.

El resultado define:

- unidad certificable de tablet;
- perfil mínimo de dispositivo y estación;
- oracle de targets, espaciado, alcance y estabilidad;
- oracle de orientación, reflow, zoom y teclado virtual;
- alternativas obligatorias a gestos y precisión fina;
- interacción con captura, periféricos y conectividad cuando apliquen;
- evidencia de actor, contexto, privacidad y relevo en tablet compartida;
- escenarios mínimos de error, latencia y repetición;
- evidencia automatizada, operativa y física requerida;
- criterio por package;
- criterio `GLOBAL-FINAL`;
- condiciones que vuelven stale una evidencia previa.

No crea un componente nuevo ni redefine `TOUCH-BASELINE-1.0.0`.

#### 3. Alcance exacto

La certificación cubre las superficies materializadas que declaren uso operativo en tablet, incluidas cuando corresponda:

- `PERSONAL_TABLET`;
- `SHARED_TABLET`;
- tablet sostenida con una o dos manos;
- tablet montada en base, pared, mostrador, carro o estación;
- orientación vertical y horizontal cuando estén permitidas;
- tareas con teclado virtual;
- tareas con escáner o cámara;
- tareas que consumen impresora, báscula, datáfono u otro periférico;
- operación online, degradada u offline cuando el contrato del package lo permita;
- cambio de actor en dispositivo compartido;
- accesibilidad por teclado, lector, switch, stylus o mouse cuando aplique.

No convierte automáticamente un kiosco fijo o un escritorio en caso de tablet. La matriz de aplicabilidad de cada package debe declarar la clase real evaluada.

#### 4. Handoff recibido de `UX-QA-005`

La prueba recibe una superficie en la que ya se definieron:

- foco principal pertinente;
- opciones secundarias pertinentes;
- obligaciones bloqueadas que no deben ocultarse;
- opciones irrelevantes fuera del flujo ordinario;
- actor y contexto correctos;
- navegación correspondiente a la intención vigente;
- elementos ocultos fuera del foco y árbol accesible ordinario.

`UX-QA-006` no reabre qué capacidades deberían estar presentes para el actor. Evalúa si las capacidades correctas pueden utilizarse táctilmente en tablet.

#### 5. Frontera con `UX-QA-005`

Regla:

```text
CAPACIDAD CORRECTA PARA EL ACTOR
≠
INTERACCIÓN TÁCTIL CORRECTA
```

Una pantalla puede tener contenido perfectamente relevante y aun fallar `UX-QA-006` por targets pequeños, separación insegura, teclado que cubre el CTA, gesto no descubrible o montaje incompatible.

#### 6. Frontera con `UX-QA-007`

`UX-QA-007` certificará que las vistas administrativas no contaminan la operación.

`UX-QA-006` puede detectar que densidad, tablas o controles administrativos vuelven inviable una tarea en tablet, pero no absorbe la certificación estructural completa de separación entre operación y administración.

#### 7. Significado de “funciona en tablet”

Un caso es conforme únicamente cuando la tarea aplicable puede completarse sin introducir riesgo material mediante:

- tacto ordinario;
- lectura suficiente;
- targets y separación adecuados;
- postura y alcance compatibles;
- reflow sin pérdida funcional;
- feedback perceptible;
- entrada de datos proporcional;
- manejo seguro de interrupciones y latencia;
- controles accesibles;
- protección de actor, contexto y privacidad.

No significa solamente que la ruta abra, que no exista overflow visible o que un test de componente renderice.

#### 8. Unidad certificable

Cada ejecución física futura se identifica por:

```text
UX-QA-006::<package_id>
```

La unidad observada dentro del package se registra al menos con:

```text
package_id
application_id
surface_id
process_id
step_id
actor_class
station_profile
surface_class
device_class
os_and_runtime
orientation
mounting_profile
input_methods
peripheral_profile
connectivity_profile
build_or_release
scenario_id
```

`GLOBAL-FINAL` no sustituye una unidad aplicable omitida.

#### 9. Matriz de aplicabilidad

Antes de ejecutar casos, cada package clasificará sus superficies tablet como:

```text
APPLICABLE
NOT_APPLICABLE
PROFILE_INCOMPLETE
BLOCKED_BY_PHYSICAL_DEPENDENCY
```

`NOT_APPLICABLE` requiere justificación trazable. `PROFILE_INCOMPLETE` no puede convertirse en PASS por emulación de escritorio.

#### 10. Perfil mínimo del dispositivo y estación

La evidencia debe conocer, según aplique:

- clase de tablet;
- sistema operativo y runtime;
- tamaño y relación de aspecto;
- orientación permitida;
- montaje, altura e inclinación;
- distancia de lectura;
- postura;
- una o dos manos;
- mano dominante cuando sea material;
- movilidad;
- relevo entre actores;
- guantes, humedad, grasa, harina, polvo o frío;
- iluminación y reflejos;
- ruido;
- conectividad;
- energía;
- periféricos;
- sensibilidad de la información;
- frecuencia y criticidad de la tarea.

Sin perfil suficiente, el caso permanece `PROFILE_INCOMPLETE`.

#### 11. Oracle de targets táctiles

Se conserva `TOUCH-BASELINE-1.0.0`:

```text
OBJETIVO PREFERENTE OPERATIVO
48 × 48 unidades lógicas

APPLE NATIVO
mínimo 44 × 44 pt

PISO WEB
24 × 24 CSS px conforme a las condiciones WCAG aplicables
```

El piso web no se usa como tamaño ordinario objetivo de operación.

La medición corresponde al área activable completa, no únicamente al icono visible.

#### 12. Excepciones de tamaño

Una excepción a la preferencia de `48 × 48` no obtiene PASS únicamente porque alcance el piso normativo.

Debe demostrar:

- justificación del control;
- separación suficiente;
- ausencia de activación accidental material;
- equivalencia funcional accesible;
- validación en la orientación y montaje aplicables;
- compatibilidad con el caso real de uso.

#### 13. Espaciado y áreas activables

La certificación verifica que:

- hit areas no se superponen;
- targets vecinos no capturan el mismo toque;
- acciones incompatibles están suficientemente separadas;
- controles repetidos por fila mantienen alineación estable;
- el target no se desplaza inesperadamente mientras el dedo está sobre la superficie;
- confirmar y cancelar no forman una pareja propensa a toque accidental;
- una acción destructiva no es el target más fácil de alcanzar por accidente.

#### 14. Acción principal y alcance

El CTA principal debe:

- permanecer asociado al contenido que afecta;
- ser alcanzable con la postura y montaje previstos;
- no tapar información crítica;
- conservar ubicación suficientemente estable;
- seguir disponible al aparecer teclado o panel secundario;
- no competir físicamente con cancelación, excepción o navegación.

No se adopta una “zona universal del pulgar” sin validar el puesto real.

#### 15. Postura y esfuerzo

Bloquean la certificación cuando sean necesarios para completar el flujo:

- precisión fina sostenida;
- brazo elevado durante una parte material de la tarea;
- alternancia repetida entre extremos de pantalla sin necesidad funcional;
- escritura larga sosteniendo el dispositivo;
- abandonar el puesto para alcanzar un control;
- bloquear la visión del producto o zona de trabajo.

El análisis debe considerar personas de distinta altura y lateralidad cuando el puesto sea compartido.

#### 16. Orientación y reflow

En orientaciones admitidas:

- no habrá scroll horizontal ordinario para completar el flujo;
- etiquetas, valores, errores y controles conservarán relación;
- contexto y acción principal permanecerán disponibles;
- el borrador no se perderá al cambiar tamaño u orientación;
- no aparecerán CTAs duplicados por variantes de layout;
- el punto de lectura no saltará de forma destructiva.

Una orientación fija solo es válida cuando el perfil de estación la justifica.

#### 17. Teclado virtual

La aparición del teclado no puede:

- ocultar el campo activo;
- ocultar su error;
- ocultar una confirmación material sin alternativa clara;
- desplazar el CTA a una posición impredecible;
- provocar pérdida de borrador;
- crear scroll horizontal;
- impedir volver al contenido contextual necesario.

#### 18. Zoom y tamaño de texto

La superficie debe conservar operación y comprensión ante los modos de zoom o tamaño de texto exigibles por su contrato de accesibilidad.

No se aceptan como solución ordinaria:

- clipping;
- texto esencial truncado sin alternativa;
- controles superpuestos;
- contenido inaccesible fuera del viewport;
- reducción de texto crítico para conservar densidad.

#### 19. Gestos y alternativas

No pueden constituir el único mecanismo de una función ordinaria o crítica:

- hover;
- swipe oculto;
- arrastre preciso;
- pulsación prolongada;
- doble toque;
- gesto de borde;
- pinza para acceder a información esencial.

Todo arrastre no esencial al significado debe tener alternativa de puntero simple.

#### 20. Modalidades alternativas de entrada

La certificación no penaliza el uso compatible de:

- teclado;
- mouse;
- stylus;
- switch access;
- lector de pantalla;
- escáner;
- controles físicos autorizados.

La tablet no debe bloquear esas modalidades cuando sean seguras y formen parte del perfil aplicable.

#### 21. Minimización de teclado

Las tareas operativas deben evitar transcripción innecesaria mediante, según corresponda:

- contexto resuelto;
- escaneo;
- selección corta;
- valores derivados;
- controles de cantidad;
- teclado numérico;
- motivos estructurados;
- captura automática desde periférico.

Texto libre necesario debe conservar borrador y permitir revisión.

#### 22. Cantidades y captura numérica

Cuando el package capture cantidades, se verifican:

- valor;
- unidad;
- presentación;
- precisión;
- límites;
- referencia esperada sin convertirla en observación;
- validación inmediata;
- targets amplios para incremento o decremento;
- entrada directa cuando el rango lo requiera;
- conservación ante teclado, rotación y pérdida de foco.

Cero, vacío y no observado permanecen distintos.

#### 23. Escáner y cámara

Cuando la tablet consuma escáner o cámara, la evidencia diferencia como mínimo:

```text
LISTO
LEYENDO
RECONOCIDO
NO RECONOCIDO
DUPLICADO
FUERA DE CONTEXTO
SIN PERIFÉRICO
CONTINGENCIA MANUAL
```

Una lectura no prueba por sí sola una mutación empresarial confirmada.

#### 24. Periféricos

Si la tarea depende de impresora, báscula, datáfono, escáner, cámara u otro periférico, la superficie debe mostrar de forma comprensible:

- dependencia seleccionada;
- estado conocido;
- acción enviada;
- confirmación recibida;
- resultado pendiente o desconocido;
- alternativa segura;
- referencia de soporte cuando corresponda.

El PASS táctil no sustituye la certificación del hardware o del resultado físico.

#### 25. Guantes, humedad, higiene y ambiente

Cuando el perfil declare condiciones ambientales materiales, la prueba incluye las condiciones representativas aplicables.

Un target grande no convierte una interacción antihigiénica o insegura en aceptable.

Si el tacto directo no es apropiado, el caso debe usar la modalidad híbrida o alternativa definida por la estación.

#### 26. Iluminación, ruido y movimiento

La interfaz debe conservar comprensión con:

- reflejos previsibles;
- iluminación real del puesto;
- ruido que invalide feedback exclusivamente sonoro;
- vibración o movimiento aplicables;
- distancia de lectura aplicable.

Color, audio o vibración no serán la única señal de estado.

#### 27. Seguridad física

La certificación falla si completar la tarea exige interactuar con la tablet mientras la persona debe mantener atención física incompatible, por ejemplo durante:

- conducción;
- manipulación de cuchillos o calor;
- maquinaria;
- movimiento de cargas;
- una acción que requiere ambas manos;
- una maniobra de seguridad.

El proceso debe ofrecer un punto seguro de interacción.

#### 28. Actor y contexto visibles

En tablet compartida deben poder comprenderse, según aplique:

- estación o dispositivo;
- sede;
- área;
- actor humano;
- rol operativo;
- turno;
- check-in;
- tarea o recurso;
- conectividad;
- simulación o delegación.

El nombre técnico del dispositivo no sustituye al actor.

#### 29. Cambio de actor

El escenario de relevo verificará que:

```text
SE DETIENEN NUEVAS MUTACIONES
→ SE RESUELVE TAREA, BORRADOR Y CUSTODIA
→ SE CIERRA O TRANSFIERE LA SESIÓN SEGÚN CONTRATO
→ SE LIMPIAN DATOS PERSONALES Y PREFERENCIAS
→ SE IDENTIFICA EL NUEVO ACTOR
→ SE RESUELVE NUEVO CONTEXTO
→ SE RECONSTRUYE LA SUPERFICIE
```

No se heredan PIN, firma, favoritos, búsquedas, filtros, borradores ni datos sensibles incompatibles.

#### 30. Privacidad visual

En tablets visibles para clientes o terceros se verifican, cuando apliquen:

- minimización;
- masking;
- bloqueo de previews sensibles;
- limpieza al cambiar actor;
- ausencia de notificaciones privadas innecesarias;
- bloqueo o protección física proporcional.

Modo tablet compartida no convierte datos internos en públicos.

#### 31. Acciones sensibles y destructivas

Las acciones financieras, destructivas, de custodia, publicación, acceso o excepción deben:

- separarse del CTA ordinario;
- mostrar recurso y efecto;
- evitar proximidad peligrosa;
- usar confirmación o step-up cuando corresponda;
- permitir cancelar antes del efecto;
- producir receipt cuando el contrato lo exija;
- impedir ejecución duplicada.

#### 32. Doble toque, latencia y concurrencia

La prueba incluye, cuando apliquen:

- doble toque;
- taps durante latencia;
- rotación durante trabajo;
- callback tardío;
- lectura duplicada;
- reconexión;
- actualización concurrente.

Resultado obligatorio:

```text
UNA INTENCIÓN MATERIAL
NO PRODUCE DOS EFECTOS EMPRESARIALES
```

Deshabilitar visualmente un botón no es la única defensa aceptable.

#### 33. Feedback táctil y resultado

Toda acción material debe mostrar una progresión perceptible compatible con:

```text
TOQUE RECONOCIDO
→ PROCESANDO
→ CONFIRMADO
```

O bien:

```text
TOQUE RECONOCIDO
→ BLOQUEADO / PENDIENTE / RESULTADO DESCONOCIDO
```

La UI no mostrará éxito antes de una confirmación que el contrato requiera.

#### 34. Conectividad

Cuando el package permita operación degradada, la tablet debe mostrar:

- estado de conexión;
- frescura;
- pendientes;
- último punto confirmado;
- limitaciones actuales;
- acción segura disponible.

No se acepta una mutación offline presentada como confirmada si aún depende del servidor.

#### 35. Accesibilidad táctil

La prueba incluye según aplicabilidad:

- nombre accesible;
- rol y estado;
- orden lógico de foco;
- lector de pantalla;
- teclado;
- switch access;
- zoom;
- tamaño de texto;
- contraste;
- reflow;
- alternativa a gestos;
- alternativa a audio y color;
- tiempo suficiente;
- autenticación accesible.

Una hit area ampliada no debe capturar el toque o foco de un control vecino.

#### 36. Tablet personal frente a tablet compartida

`PERSONAL_TABLET` y `SHARED_TABLET` comparten el baseline táctil, pero no la misma política de sesión.

En `SHARED_TABLET` son obligatorios, cuando apliquen:

- identificación explícita del actor;
- limpieza entre actores;
- no persistencia de información personal incompatible;
- reconstrucción de contexto;
- protección de borradores y custodia;
- no herencia de capacidades del actor anterior.

#### 37. Implementación compartida observada

El repositorio contiene actualmente `TabletTaskSurface` en `@vento/ui-web` con:

- clases `PERSONAL_TABLET` y `SHARED_TABLET`;
- slots para contexto persistente, bloqueo, identidad de trabajo, contenido de paso, acción primaria, soporte secundario y resultado/receipt;
- reflow de una columna y composición amplia condicionada por media query;
- `min-width: 0` y `max-width: 100%`;
- targets interactivos con mínimo CSS de `48px` en ambas dimensiones dentro de la superficie;
- foco visible y `scroll-margin` para controles;
- ausencia de dependencia de hover en su CSS;
- ausencia de lógica empresarial, autorización, conectividad, periféricos y sesión dentro del componente.

Esto es evidencia técnica parcial de una fundación compartida. No constituye PASS físico de `UX-QA-006` para ningún package.

#### 38. Evidencia automatizada permitida

Antes de prueba física pueden aportar evidencia:

- tests de componente;
- tests de reflow;
- validación de targets;
- validación de orden semántico;
- test de teclado y foco;
- test de zoom y clipping;
- test de alternativas a gesto;
- E2E con viewport tablet;
- pruebas de doble envío;
- pruebas de rotación o resize cuando la plataforma lo permita;
- validadores de `TabletTaskSurface`.

La emulación de viewport no sustituye el dispositivo real para postura, alcance, guantes, brillo, montaje, fatiga o toque accidental.

#### 39. Evidencia física futura

Para obtener PASS físico cuando el package sea aplicable se requiere evidencia representativa del dispositivo o clase real prevista, incluyendo según corresponda:

- orientación;
- montaje;
- postura;
- trabajador representativo;
- condiciones ordinarias y de pico;
- guantes o ambiente real;
- periféricos;
- conectividad degradada;
- cambio de actor;
- iluminación y ruido;
- interrupción y reanudación;
- errores y excepciones;
- tecnología de asistencia aplicable.

#### 40. Proporcionalidad de validación humana

La decisión aprobada de `UX-STATION-008` permite avanzar documental y técnicamente sin fingir una campaña formal de campo ya realizada.

Por tanto:

```text
AUSENCIA DE SESIÓN FORMAL AHORA
≠ PASS FÍSICO
```

La evidencia humana y física requerida para producción se conserva para piloto y certificación del BLOQUE U según el package y sus riesgos.

#### 41. Clases mínimas de escenario

Cuando sean aplicables, el dossier del package cubre:

1. portrait ordinario;
2. landscape ordinario;
3. teclado virtual abierto;
4. zoom o texto ampliado;
5. una mano;
6. tablet montada;
7. doble toque;
8. tap durante latencia;
9. rotación durante captura;
10. cambio de actor;
11. conectividad degradada;
12. periférico no disponible;
13. error de validación;
14. bloqueo material;
15. acción sensible;
16. lector o teclado cuando aplique;
17. ambiente o guantes cuando apliquen;
18. interrupción y reanudación.

La matriz puede declarar `NOT_APPLICABLE` con justificación por escenario.

#### 42. Casos positivos

Ejemplos de evidencia conforme:

- acción primaria alcanzable sin cubrir el dato crítico;
- cantidad modificada con target amplio y unidad visible;
- teclado abierto sin ocultar error ni confirmación;
- rotación que conserva borrador y contexto;
- escaneo reconocido sin confirmar automáticamente una mutación irreversible;
- doble toque que produce un único efecto;
- tablet compartida que limpia la sesión anterior;
- pérdida de red que muestra el estado real y conserva trabajo según contrato;
- lector de pantalla que mantiene el orden lógico de la tarea.

#### 43. Casos negativos

Ejemplos que bloquean PASS cuando apliquen:

- botón esencial de tamaño o separación insuficiente para el puesto;
- acción destructiva adyacente al CTA ordinario;
- teclado que cubre el control necesario;
- hover como única vía;
- swipe oculto como único acceso a una obligación;
- drag preciso sin alternativa;
- scroll horizontal necesario para completar la tarea;
- orientación que pierde borrador;
- target que se mueve bajo el dedo durante actualización;
- doble toque que duplica una mutación;
- dispositivo compartido que conserva datos del actor anterior;
- mensaje audible sin equivalente visible en ambiente ruidoso;
- interacción requerida durante una maniobra físicamente insegura.

#### 44. Métricas mínimas

Se registran cuando sean observables:

```text
completion_success
accidental_activation_count
duplicate_effect_count
hidden_or_unreachable_required_control_count
horizontal_scroll_required_count
context_loss_count
draft_loss_count
wrong_actor_residue_count
unexplained_block_count
peripheral_uncertainty_count
help_required
```

Para un PASS no puede existir:

```text
duplicate_effect_count > 0
hidden_or_unreachable_required_control_count > 0
wrong_actor_residue_count > 0
```

Una activación accidental material de acción destructiva o de custodia bloquea el PASS aunque el conteo total de errores sea bajo.

#### 45. Métricas de experiencia

Pueden medirse:

- tiempo de tarea;
- toques erróneos;
- retrocesos;
- uso de teclado;
- escaneos fallidos;
- cambios de orientación;
- necesidad de ayuda;
- postura o fatiga observada;
- tiempo hasta feedback;
- recuperación tras interrupción.

No se fija un umbral universal de velocidad. Estas métricas se interpretan por tarea, estación, complejidad, entorno y población.

#### 46. Severidad de hallazgos

| Hallazgo | Severidad mínima |
| --- | --- |
| doble toque produce efecto empresarial duplicado | crítica |
| acción físicamente insegura exigida por el flujo | crítica |
| actor anterior conserva capacidad o dato sensible | crítica |
| acción destructiva activable accidentalmente de forma material | crítica |
| control obligatorio inaccesible con modalidad aplicable | crítica |
| pérdida de borrador o custodia al rotar o interrumpir | alta |
| target operativo insuficiente con errores observables | alta |
| teclado oculta la corrección o confirmación necesaria | alta |
| gesto oculto como único mecanismo de obligación | alta |
| layout requiere scroll horizontal ordinario para completar tarea | alta |
| jerarquía táctil mejorable sin efecto material sobre ejecución | media |

La severidad final se conserva en el sistema de defectos propietario del package.

#### 47. Criterio por package

`UX-QA-006::<package_id>` obtiene PASS únicamente cuando:

- la matriz de aplicabilidad está completa;
- los perfiles tablet aplicables están resueltos;
- existe oracle trazable contra `TOUCH-BASELINE-1.0.0`;
- los escenarios críticos aplicables fueron cubiertos;
- no queda hallazgo crítico o alto abierto que invalide operación táctil;
- no existen efectos duplicados por interacción repetida;
- actor y contexto permanecen correctos en tablet compartida;
- accesibilidad aplicable está cubierta;
- la evidencia técnica y física requerida corresponde a la versión certificada.

#### 48. Criterio `GLOBAL-FINAL`

`UX-QA-006::GLOBAL-FINAL` obtiene PASS cuando:

- todos los packages con superficie tablet aplicable poseen resultado final aceptable;
- ningún package aplicable fue omitido sin justificación;
- la línea base táctil se interpreta de forma compatible entre aplicaciones;
- las excepciones de target o modalidad están justificadas y trazadas;
- los defectos bloqueantes están cerrados;
- la cobertura física representativa requerida fue completada;
- la evidencia corresponde a las versiones que se pretenden certificar.

La existencia de un componente compartido no reemplaza resultados por package.

#### 49. Evidencia stale

Debe revalidarse la parte afectada cuando cambie materialmente:

- layout;
- CSS que altere tamaño o posición;
- componente táctil;
- navegación;
- foco;
- teclado o captura;
- orientación admitida;
- perfil de dispositivo;
- montaje;
- periférico;
- flujo de actor compartido;
- conectividad;
- acción sensible;
- versión de proceso;
- browser, runtime o sistema operativo cuando el cambio pueda afectar interacción.

Un cambio sin impacto puede conservar evidencia únicamente con justificación trazable.

#### 50. Seguridad y privacidad

`UX-QA-006` no reemplaza autorización, privacidad ni hardening del dispositivo.

Sin embargo, el PASS táctil no puede contradecirlos. No es válido mejorar usabilidad mostrando datos adicionales, manteniendo sesiones anteriores, relajando step-up o exponiendo configuración técnica.

#### 51. No inferencia desde implementación parcial

No constituyen certificación suficiente por sí solos:

- media queries correctas;
- `48px` declarado en CSS;
- un Storybook funcional;
- render server-side correcto;
- un viewport emulado;
- un screenshot sin overflow;
- una demo con mouse;
- un test unitario del componente.

Cada evidencia demuestra únicamente su capa observada.

#### 52. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea certifica cobertura ya registrada. No modifica el Registro Canónico de Requisitos de Prueba.

#### 53. Cobertura de prueba vigente reutilizada

La trazabilidad principal reutiliza, sin modificar:

- `TREQ-UX-004`;
- `TREQ-UX-015`;
- `TREQ-UX-021`;
- `TREQ-UX-033`;
- `TREQ-UX-038`;
- `TREQ-UX-056`;
- `TREQ-UX-074`;
- `TREQ-UX-088`;
- `TREQ-UX-091`;
- `TREQ-UX-093`;
- `TREQ-UX-111`;
- `TREQ-UX-114`;
- `TREQ-UX-133`;
- `TREQ-UX-137`;
- `TREQ-UX-204` a `TREQ-UX-226`.

La enumeración es trazabilidad de cobertura existente y no constituye alta ni modificación de requisitos.

#### 54. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La aprobación documental no ejecuta build de producto ni prueba de la aplicación desplegada. |
| LOCAL | NOT_EXECUTED | El artefacto se prepara para incorporación mediante el lifecycle documental; los validadores del checkout permanecen pendientes hasta ejecutar la batería. |
| REMOTA | PASS | Se verificaron protocolo, contrato de entrega, manifest modular, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, archivo propietario, marcadores `UX-QA-006` y `UX-QA-007`, `TOUCH-BASELINE-1.0.0`, `UX-STATION-008`, cobertura UX 04A vigente, la implementación compartida actual `TabletTaskSurface` y el handoff completo aprobado de `UX-QA-005` usado como base adelantada. |
| OPERATIVA | NOT_EXECUTED | No se realizaron walkthroughs sobre una aplicación desplegada ni sesiones con actores representativos. |
| FÍSICA | NOT_EXECUTED | No se ejecutaron pruebas en tablet real, montaje, postura, ambiente o periféricos y no se materializaron instancias `UX-QA-006::<package_id>` ni `UX-QA-006::GLOBAL-FINAL`. |

#### 55. Criterios de aceptación

`UX-QA-006` queda documentalmente definida cuando se confirma que:

- [ ] la continuidad es `UX-QA-005 → UX-QA-006 → UX-QA-007`;
- [ ] la prueba distingue responsive de touch-ready;
- [ ] existe unidad certificable por package;
- [ ] la aplicabilidad de tablet queda explícita;
- [ ] el perfil de dispositivo y estación es obligatorio;
- [ ] `TOUCH-BASELINE-1.0.0` permanece como fuente del oracle táctil;
- [ ] el objetivo preferente de 48 por 48 unidades lógicas se conserva sin convertirlo en equivalencia física universal;
- [ ] el piso web y la referencia Apple no se confunden con objetivo ordinario;
- [ ] targets y hit areas se evalúan como áreas activables reales;
- [ ] espaciado y acciones incompatibles tienen tratamiento explícito;
- [ ] postura, alcance y montaje forman parte de la evidencia;
- [ ] orientación, reflow, zoom y teclado virtual conservan operación;
- [ ] hover, drag preciso y gestos ocultos no son únicos mecanismos;
- [ ] captura numérica, escaneo y periféricos tienen oracle cuando aplican;
- [ ] ambiente, guantes, higiene, iluminación y ruido se cubren proporcionalmente;
- [ ] seguridad física prevalece sobre reducción de pasos;
- [ ] tablet compartida conserva actor y contexto sin residuos del anterior;
- [ ] acciones sensibles permanecen separadas y protegidas;
- [ ] doble toque y latencia no duplican efectos;
- [ ] feedback diferencia procesando de confirmado;
- [ ] conectividad y estado offline no producen falso éxito;
- [ ] accesibilidad táctil está incluida;
- [ ] la implementación `TabletTaskSurface` se trata solo como evidencia técnica parcial;
- [ ] emulación y tests automatizados no sustituyen la evidencia física cuando sea requerida;
- [ ] el criterio por package y `GLOBAL-FINAL` queda definido;
- [ ] la sección `Requisitos de prueba derivados` declara cero cambios y no contiene IDs TREQ;
- [ ] la cobertura heredada está separada de la sección de cero cambios;
- [ ] no se ejecutó implementación física durante esta aprobación documental;
- [ ] `UX-QA-007` conserva íntegra la certificación de separación administrativa.

#### 56. Fallos que bloquean la certificación física

Bloquean el PASS cuando sean aplicables:

- perfil físico obligatorio ausente;
- target o separación que produce activación accidental material;
- acción crítica inaccesible mediante tacto;
- CTA oculto por teclado sin alternativa segura;
- pérdida de contexto o borrador al rotar;
- scroll horizontal necesario para completar la tarea;
- gesto oculto o hover como única ruta a una obligación;
- doble interacción que duplica un efecto empresarial;
- target que cambia de posición bajo el dedo durante una actualización;
- tablet compartida con residuo del actor anterior;
- estado offline presentado como confirmado sin evidencia;
- operación que exige interacción durante una maniobra físicamente insegura;
- dato sensible expuesto por adaptar la pantalla;
- ausencia de prueba física requerida para una superficie crítica;
- evidencia perteneciente a una versión materialmente distinta.

#### 57. Handoff a `UX-QA-007`

`UX-QA-006` entrega a `UX-QA-007`:

- superficie táctil de tablet con interacción y targets definidos;
- contexto y foco preservados durante reflow;
- acción principal operable sin depender de controles administrativos;
- densidad táctil evaluable por tarea;
- tablet compartida con actor y contexto diferenciados;
- evidencia de que la adaptación al dispositivo no justifica introducir backoffice denso en el flujo operativo.

`UX-QA-007` podrá certificar separación estructural entre operación y administración sin reabrir el baseline de interacción táctil.

#### 58. Límites

Esta tarea no:

- modifica `TOUCH-BASELINE-1.0.0`;
- crea o modifica componentes;
- cambia `TabletTaskSurface`;
- modifica CSS;
- cambia targets o layouts físicos;
- diseña hardware;
- selecciona marcas o modelos;
- define compras;
- cambia montaje;
- modifica periféricos;
- cambia drivers o firmware;
- modifica autorización;
- cambia roles;
- modifica datos o Supabase;
- ejecuta sesiones con trabajadores;
- ejecuta pruebas E2E;
- ejecuta pruebas en dispositivos reales;
- certifica un package por mera inspección de código;
- certifica kioscos fijos que no sean caso tablet aplicable;
- certifica la contaminación administrativa reservada a `UX-QA-007`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 59. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-005 — Un rol no ve opciones irrelevantes`

**TAREA ACTUAL APROBADA**
`UX-QA-006 — Las pantallas táctiles funcionan en tablet`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-007 — Las vistas administrativas no contaminan la operación`
### ✅ UX-QA-007 — Las vistas administrativas no contaminan la operación

**Estado:** APROBADA
**Tarea anterior:** UX-QA-006 — Las pantallas táctiles funcionan en tablet
**Tarea siguiente:** UX-QA-008 — El proceso continúa correctamente entre aplicaciones
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que las superficies de ejecución operativa permanecen enfocadas en trabajo, contexto, estado, evidencia, bloqueo y siguiente acción, sin incorporar backoffice denso, configuración, auditoría, reportes, exportaciones, edición masiva, catálogos maestros ni controles administrativos por el solo hecho de que el actor tenga permisos amplios o el dispositivo sea un computador completo
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de separación operativo-administrativa definido; las ejecuciones `UX-QA-007::<package_id>` y la certificación `UX-QA-007::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff táctil de `UX-QA-006`, el contrato de densidad de `UX-BASE-012`, los patrones `UX-ADMIN-001` a `UX-ADMIN-005`, la cobertura UX vigente y los contratos de pantalla y autorización aplicables, pero no infiere que ningún package o superficie desplegada ya haya demostrado separación efectiva en runtime
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican rutas, menús, componentes, layouts, tablas, filtros, permisos, roles, superficies operativas o administrativas, exportaciones, dashboards, datos, Supabase, dispositivos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que las capacidades administrativas existen donde corresponden sin contaminar la experiencia ordinaria de quienes ejecutan trabajo operativo.

La certificación deberá responder, para cada package aplicable:

```text
¿LA OPERACIÓN CONSERVA FOCO EN LA TAREA ACTUAL?
¿CONFIGURACIÓN, AUDITORÍA Y BACKOFFICE PERMANECEN FUERA DEL FLUJO ORDINARIO?
¿TENER PERMISO ADMINISTRATIVO NO CONVIERTE LA PANTALLA OPERATIVA EN MENÚ UNIVERSAL?
¿EL CAMBIO A ADMINISTRACIÓN ES EXPLÍCITO, AUTORIZADO Y CONTEXTUAL?
¿VOLVER A OPERACIÓN RESTAURA UN CONTEXTO OPERATIVO EXACTO?
```

Una superficie administrativa correcta puede ser densa. El fallo de `UX-QA-007` aparece cuando esa densidad o sus capacidades invaden la ejecución ordinaria.

#### 2. Resultado canónico

`UX-QA-007` establece `UX-QA-OPERATION-ADMIN-SEPARATION-001@1.0.0`.

El resultado define:

- unidad certificable de separación;
- carriles evaluados;
- niveles de densidad permitidos por intención;
- contenido permitido en operación;
- contenido administrativo incompatible con el flujo ordinario;
- reglas para actores con múltiples responsabilidades;
- reglas para supervisión operativa;
- transición explícita entre operación y administración;
- tratamiento de dispositivos compartidos y POS;
- protección de datos, exportaciones y preferencias;
- evidencia positiva y negativa;
- criterio por package;
- criterio `GLOBAL-FINAL`;
- condiciones que invalidan evidencia previa.

No elimina la administración ni obliga a que toda administración viva en una aplicación distinta.

#### 3. Alcance exacto

La certificación cubre, cuando apliquen:

- superficies de `OPERATIONAL_EXECUTION`;
- superficies de `OPERATIONAL_SUPERVISION`;
- superficies de `ADMINISTRATIVE_WORK`;
- superficies de `CONFIGURATION_GOVERNANCE`;
- superficies de `AUDIT_ANALYTICS`;
- estaciones compartidas;
- computadores POS;
- tablets operativas;
- escritorio administrativo;
- navegación, búsqueda, favoritos y accesos recientes;
- enlaces profundos;
- vistas de tabla, grid, dashboard y panel;
- filtros, columnas, agregados y selección masiva;
- configuración y catálogos maestros;
- exportación, impresión y copia;
- auditoría e historial;
- cambio de rol o intención de trabajo.

La prueba evalúa separación por propósito y contexto, no por nombre de aplicación ni tipo físico de dispositivo.

#### 4. Handoff recibido de `UX-QA-006`

La prueba recibe una superficie en la que, cuando es tablet:

- la interacción táctil aplicable es operable;
- el contexto y foco sobreviven reflow;
- la acción principal permanece alcanzable;
- actor y contexto están diferenciados;
- la densidad táctil ya puede evaluarse por tarea;
- la adaptación al dispositivo no justifica insertar backoffice denso.

`UX-QA-007` no reabre targets, gestos, postura ni baseline táctil.

#### 5. Frontera con `UX-QA-006`

Regla:

```text
TOUCH_READY
≠
OPERATIONALLY_FOCUSED
```

Una tabla administrativa puede ser perfectamente táctil y aun fallar `UX-QA-007` si aparece en una estación cuya intención activa es ejecutar trabajo operativo.

#### 6. Frontera con `UX-QA-008`

`UX-QA-008` certificará que el proceso continúa correctamente entre aplicaciones.

`UX-QA-007` solo exige que un handoff a una superficie administrativa o de vuelta a operación conserve una frontera explícita. No certifica todavía continuidad cross-app, entrega de contexto entre aplicaciones ni retorno técnico.

#### 7. Regla principal

```text
PERMISO ADMINISTRATIVO
≠
RELEVANCIA OPERATIVA
```

```text
PC GRANDE
≠
BACKOFFICE
```

```text
CAPACIDAD DISPONIBLE
≠
CAPACIDAD QUE DEBE COMPETIR CON LA TAREA ACTUAL
```

La interfaz debe resolver primero intención, carril y contexto.

#### 8. Carriles evaluados

La certificación distingue:

| Carril | Propósito | Densidad ordinaria |
| --- | --- | --- |
| `OPERATIONAL_EXECUTION` | ejecutar una tarea o paso empresarial | baja |
| `OPERATIONAL_SUPERVISION` | coordinar, revisar bloqueos y priorizar | baja a media |
| `ADMINISTRATIVE_WORK` | comparar, planificar, conciliar, revisar o aprobar | media a alta |
| `CONFIGURATION_GOVERNANCE` | configurar reglas y parámetros | media a alta |
| `AUDIT_ANALYTICS` | reconstruir, auditar y analizar | media a alta |
| `PERSONAL_CUSTOMER_CANDIDATE` | gestionar caso propio | baja |

El carril no se deriva del cargo ni de la aplicación.

#### 9. Niveles de densidad

La certificación usa:

```text
D0_FOCUSED
D1_CONTEXTUAL
D2_COMPARATIVE
D3_ANALYTICAL
D4_SPECIALIZED
```

Regla base:

```text
OPERACIÓN ORDINARIA
→ D0 o D1

SUPERVISIÓN OPERATIVA
→ D1 y D2 SOLO CUANDO LA TAREA LO JUSTIFIQUE

ADMINISTRACIÓN, CONFIGURACIÓN Y AUDITORÍA
→ D2 a D4 SEGÚN NECESIDAD REAL
```

La cantidad de datos disponibles no aumenta por sí sola el nivel permitido.

#### 10. Contenido mínimo permitido en operación

Una superficie de ejecución operativa puede mostrar, según aplique:

- actor;
- sede y área activas;
- turno o check-in;
- tarea actual;
- recurso actual;
- estado;
- evidencia necesaria;
- cantidades o datos requeridos por el paso;
- bloqueo;
- contingencia;
- siguiente acción;
- resultado o receipt;
- cola secundaria pertinente;
- ayuda contextual proporcional.

El objetivo es completar trabajo, no administrar el dominio completo.

#### 11. Contenido que no compite ordinariamente con la operación

Salvo necesidad operacional explícita y contrato específico, permanecen fuera del flujo ordinario:

- tablas maestras completas;
- catálogos empresariales generales;
- administración de permisos;
- configuración transversal;
- edición de parámetros maestros;
- costos y márgenes no necesarios para ejecutar;
- salarios, información médica o datos sensibles ajenos a la tarea;
- historial técnico completo;
- dashboards analíticos;
- auditoría avanzada;
- exportaciones masivas;
- importaciones administrativas;
- operaciones masivas;
- publicación global;
- gestión de versiones administrativas;
- mantenimiento técnico del dispositivo;
- herramientas de soporte interno.

#### 12. Existencia no equivale a contaminación

Una capacidad administrativa puede existir en el mismo producto siempre que:

- no compita con la acción operativa;
- requiera intención explícita para abrirse;
- revalide autoridad;
- preserve la frontera de contexto;
- no convierta un menú operativo en catálogo universal;
- pueda abandonarse sin perder el trabajo operativo seguro;
- no deje datos administrativos sensibles visibles al regresar.

#### 13. Actor con múltiples roles

Una persona con roles operativos y administrativos no recibirá la unión visual indiscriminada de ambos conjuntos.

La certificación comprobará que:

- el carril activo es perceptible;
- la tarea activa determina la composición;
- cambiar de carril es deliberado;
- el cambio reconstruye relevancia;
- permisos no utilizados permanecen fuera del foco;
- volver a operación resuelve de nuevo actor, área, tarea y estado pertinentes.

#### 14. Supervisión operativa

Supervisar no equivale a administrar todo.

Una superficie de supervisión puede incluir:

- colas;
- bloqueos;
- carga;
- cumplimiento;
- asignaciones pertinentes;
- alertas;
- excepciones operativas;
- coordinación entre áreas autorizadas.

No obtiene automáticamente:

- configuración global;
- edición de permisos;
- administración de catálogos;
- exportación irrestricta;
- aprobación universal;
- corrección histórica.

#### 15. Administración legítima

Una vista administrativa puede ser densa cuando la tarea necesita:

- comparar múltiples registros;
- planificar;
- conciliar;
- revisar diferencias;
- aprobar;
- configurar;
- auditar;
- investigar;
- analizar tendencias;
- administrar catálogos o versiones;
- ejecutar operaciones masivas controladas.

`UX-QA-007` no penaliza densidad legítima en el carril correcto.

#### 16. Workspace administrativo

Una superficie administrativa deberá declarar al menos:

- propósito;
- actor o simulación;
- rol;
- cobertura;
- territorio;
- periodo;
- filtros activos;
- frescura;
- modo de lectura o edición;
- población o universo de trabajo cuando aplique.

Este contexto no se transforma automáticamente en contexto operativo.

#### 17. Filtros administrativos

Regla:

```text
FILTRO ADMINISTRATIVO
≠
AREA OPERATIVA ACTIVA
```

Seleccionar `Todas las sedes`, una sede, un área o una población en backoffice:

- no concede autoridad adicional;
- no cambia automáticamente turno o check-in;
- no cambia custodia;
- no cambia claim;
- no fija por sí solo el contexto de una mutación física.

#### 18. Acciones físicas desde administración

Cuando una decisión administrativa derive en una acción física o operacional:

1. la interfaz identifica el caso u objeto;
2. el actor solicita actuar;
3. se cambia al carril operativo correspondiente;
4. se resuelven área, estación, recurso y contexto exactos;
5. se revalida autoridad;
6. solo entonces se ofrece la acción física.

La vista comparativa no actúa como sustituto del contexto operativo.

#### 19. Tablas administrativas

Las tablas administrativas legítimas conservarán:

- identidad estable de fila;
- encabezados comprensibles;
- unidades;
- origen;
- frescura;
- orden determinista;
- sensibilidad;
- estado de carga y vacío;
- política de detalle;
- acciones exactas;
- paginación o virtualización;
- política de exportación.

Su existencia no justifica copiar la misma tabla a una estación operativa.

#### 20. Tablas en operación

Una tabla operativa solo es conforme cuando representa directamente el trabajo requerido y mantiene carga proporcional.

Ejemplos admisibles:

- cola de pedidos;
- líneas que deben verificarse;
- pendientes de producción;
- ubicaciones de un retiro;
- diferencias de una recepción.

Ejemplos incompatibles con operación ordinaria:

- maestro completo de productos;
- historial total de recetas;
- matriz global de permisos;
- auditoría técnica;
- listado completo de costos y márgenes;
- tabla de configuración general.

#### 21. Búsqueda

La búsqueda del carril operativo:

- prioriza trabajo y recursos pertinentes;
- no expone destinos administrativos por mera coincidencia textual;
- no revela títulos o datos sensibles de superficies no pertinentes;
- revalida autorización y carril antes de abrir un resultado.

Una búsqueda administrativa puede ser más amplia, pero se mantiene en su workspace.

#### 22. Favoritos y recientes

Favoritos, recientes y accesos rápidos:

- conservan intención y carril;
- no aparecen en operación si pertenecen a administración y no son pertinentes;
- se revalidan al abrirse;
- no reviven permisos ni contexto obsoletos;
- no persisten entre actores en dispositivos compartidos cuando contengan información personal o sensible.

#### 23. Deep links

Un enlace directo a administración:

- no se convierte en acción operativa;
- revalida actor, permiso, territorio y contexto;
- puede abrir el workspace administrativo solo si procede;
- no introduce controles administrativos dentro de la pantalla operativa de origen;
- no revela metadatos sensibles antes de autorizar.

#### 24. Configuración

Configurar es un carril distinto de ejecutar.

Una configuración puede afectar operación, pero su edición:

- se realiza en superficie apropiada;
- identifica alcance y versión;
- muestra impacto;
- aplica autorización proporcional;
- conserva auditoría;
- no se expone como control ordinario junto al CTA de ejecución.

#### 25. Auditoría

Auditar no equivale a corregir el hecho fuente.

La auditoría:

- puede reconstruir historia;
- puede investigar;
- puede anotar o escalar cuando corresponda;
- no modifica silenciosamente el hecho original;
- abre una acción separada si se requiere corrección.

La operación ordinaria no necesita cargar el historial técnico completo para funcionar.

#### 26. Exportación

Visualizar y exportar son capacidades separadas.

La operación ordinaria no mostrará exportación masiva por el solo hecho de que el navegador pueda descargar archivos.

Cuando una exportación sea legítima deberá validar:

- finalidad;
- columnas;
- territorio;
- periodo;
- filtros;
- masking;
- volumen;
- clasificación;
- retención;
- destinatario cuando aplique.

#### 27. Selección y operaciones masivas

Las operaciones masivas pertenecen ordinariamente al carril administrativo o experto.

No deben competir con una tarea operacional individual salvo contrato expreso.

Toda acción masiva válida identifica:

- conjunto seleccionado;
- territorio;
- filtros;
- elegibilidad;
- efecto;
- resultado parcial;
- estrategia de reintento;
- evidencia.

#### 28. Edición inline

La edición en línea no convierte una tabla en superficie operacional.

Cuando exista en administración:

- aplica solo a campos habilitados;
- preserva control de versión;
- permite cancelar;
- muestra estado guardado;
- no oculta validaciones dependientes.

Receta, precio, permiso, salario, costo, publicación o configuración sensible requieren superficies adecuadas al riesgo.

#### 29. Datos sensibles

La separación de carriles protege además proyección de datos.

Una superficie operativa no recibe información administrativa sensible porque:

- exista en el mismo registro;
- el actor tenga otro rol;
- la pantalla sea grande;
- un componente ya tenga la columna disponible;
- un endpoint devuelva más datos de los necesarios.

La minimización debe existir también en la fuente autoritativa aplicable.

#### 30. Dispositivos compartidos

En dispositivos compartidos:

- `D0` y `D1` son la composición ordinaria;
- `D2` requiere justificación limitada;
- `D3` y `D4` quedan fuera del flujo ordinario;
- una herramienta administrativa temporal requiere sesión personal o step-up cuando aplique;
- se aplican masking y no persistencia;
- se limpia el contexto al cerrar o cambiar actor;
- la administración no queda abierta después del retorno a operación.

#### 31. Computadores POS

```text
POS FISICAMENTE CAPAZ DE EJECUTAR UN NAVEGADOR COMPLETO
≠
WORKSTATION ADMINISTRATIVA
```

La certificación falla si cocina, caja, producción, recepción o bodega muestran de forma ordinaria backoffice completo solo porque el equipo sea un PC.

#### 32. Tablet operativa

La adaptación táctil de `UX-QA-006` no autoriza aumentar densidad administrativa.

Una tablet puede:

- operar `D0` o `D1`;
- consultar una vista administrativa limitada cuando su tarea lo justifique;
- derivar a equipo compatible para trabajo experto.

No debe convertir tablas D3 o D4 en tarjetas operativas sin preservar la intención administrativa real.

#### 33. Escritorio administrativo

Un escritorio administrativo puede usar:

- tablas;
- paneles comparativos;
- filtros avanzados;
- selección múltiple;
- vistas guardadas;
- teclado y mouse;
- acciones masivas controladas.

No por ello debe mezclar ejecución física ordinaria en la misma superficie.

#### 34. Recetario operativo y administración de recetas

Para FOGO se conserva la frontera:

```text
RECETARIO OPERATIVO
→ proyección por área y trabajo vigente

ADMINISTRACIÓN DE RECETAS
→ workspace administrativo separado
```

Una receta empresarial puede conservar una identidad y versión únicas sin obligar a administrar su ciclo completo desde el POS de producción.

#### 35. Estación multiárea

Una estación puede atender varias áreas autorizadas sin crear un área combinada.

La certificación exige:

- área visible por tarea;
- cambio explícito cuando corresponda;
- contexto autoritativo exacto por mutación;
- ausencia de una lista plana que mezcle trabajo incompatible;
- administración de configuración separada del selector operativo.

#### 36. Excepciones administrativas

Una excepción legítima puede abrir una capacidad administrativa desde operación únicamente cuando:

- la necesidad sea real;
- el actor tenga autoridad;
- la intención cambie de forma visible;
- el dato sensible esté protegido;
- exista retorno controlado;
- el flujo no convierta la excepción en ruta ordinaria.

#### 37. Divulgación progresiva

Las opciones avanzadas pueden permanecer descubribles sin competir con la operación.

La certificación acepta:

- enlace contextual;
- menú secundario;
- drawer o panel separado;
- cambio de workspace;
- handoff a superficie especializada.

No acepta que todos los controles avanzados permanezcan siempre visibles alrededor del CTA operativo.

#### 38. Administración dentro de la misma aplicación

La separación no exige otra aplicación.

Puede existir en el mismo producto si:

- la navegación diferencia intención;
- el workspace es identificable;
- el contexto se reconstruye;
- las acciones y datos cambian de forma gobernada;
- existe retorno seguro;
- no se presenta simultáneamente todo como un único tablero universal.

#### 39. Administración en otra aplicación

Si la capacidad administrativa vive en otra aplicación, `UX-QA-007` solo certifica la frontera conceptual y visual.

La continuidad del proceso, transferencia de contexto, deep link y retorno cross-app pertenecen a `UX-QA-008` y contratos de integración aplicables.

#### 40. Menús

El menú operativo se organiza por:

- trabajo;
- obligación;
- resultado;
- siguiente paso;
- destinos secundarios pertinentes.

El menú administrativo se organiza por:

- planificar;
- revisar;
- aprobar;
- conciliar;
- configurar;
- auditar.

No se genera un menú único a partir de tablas, schemas o permisos acumulados.

#### 41. Oráculo positivo

Un caso positivo demuestra que:

1. el actor entra a operación;
2. observa tarea, contexto y siguiente acción;
3. capacidades administrativas no pertinentes no compiten;
4. una necesidad administrativa se abre mediante transición explícita;
5. el workspace administrativo muestra propósito y alcance;
6. al volver, operación reconstruye contexto exacto;
7. no quedan datos, filtros o controles administrativos contaminando la superficie operativa.

#### 42. Oráculo negativo

Un caso falla si cualquiera de estas conductas aparece sin justificación contractual:

- tabla maestra completa dentro de ejecución;
- costos o márgenes no necesarios visibles en producción;
- configuración junto al CTA principal;
- permisos o usuarios administrables desde estación ordinaria;
- exportación masiva en POS compartido;
- auditoría técnica mezclada con trabajo físico;
- acciones masivas disponibles durante una tarea individual;
- paneles analíticos compitiendo con el siguiente paso;
- filtros administrativos usados como contexto operativo;
- un rol amplio produce menú universal;
- una pantalla grande eleva silenciosamente densidad;
- un favorito administrativo reaparece como opción operativa principal;
- una herramienta administrativa queda abierta al cambiar actor.

#### 43. Casos mínimos por actor

Cada package aplicable incluirá, cuando existan:

- actor puramente operativo;
- actor operativo con permisos administrativos adicionales;
- supervisor operativo;
- administrador especializado;
- auditor;
- actor con múltiples roles;
- actor sin permiso administrativo;
- actor en simulación o delegación si el package las soporta.

La prueba no se limita al caso de máximo permiso.

#### 44. Casos mínimos por dispositivo

Según aplicabilidad:

- escritorio administrativo;
- portátil;
- tablet personal;
- tablet compartida;
- POS táctil;
- kiosco;
- estación de producción;
- móvil de apoyo.

El tipo de hardware no sustituye la clasificación del carril.

#### 45. Casos mínimos de navegación

Se probarán cuando existan:

- entrada por home;
- entrada por cola;
- búsqueda;
- favorito;
- reciente;
- deep link;
- notificación;
- handoff contextual;
- cambio de rol;
- cambio de área;
- retorno desde administración.

Todas deben preservar la frontera correspondiente.

#### 46. Casos mínimos de datos

La prueba verificará que:

- la operación recibe proyección mínima;
- columnas administrativas no viajan innecesariamente al cliente operativo cuando la arquitectura permita evitarlo;
- conteos sensibles no se filtran por badges;
- previews no revelan información administrativa;
- masking no es únicamente cosmético;
- caché o preferencias no reintroducen datos del actor anterior.

#### 47. Casos mínimos de autorización

La prueba demuestra que:

- ocultar administración no reemplaza controles de servidor;
- conocer una URL no amplía permisos;
- mostrar una capacidad administrativa no autoriza cada acción interna;
- una persona autorizada para administrar puede seguir viendo una superficie operativa enfocada;
- el cambio de carril revalida autoridad material.

#### 48. Casos mínimos de accesibilidad

La diferenciación de carriles no depende únicamente de color.

Se verificará:

- propósito nombrado;
- estructura y encabezados;
- jerarquía;
- foco;
- lectura por lector de pantalla;
- navegación por teclado;
- nombres accesibles;
- estados de selección;
- reflow;
- zoom;
- alternativas a iconos ambiguos.

#### 49. Casos mínimos de estado vacío

Una superficie operativa sin trabajo:

- no muestra administración como relleno;
- no ofrece configuración genérica;
- no confunde falta de trabajo con falta de permiso;
- conserva explicación y siguiente paso seguros.

Una superficie administrativa vacía conserva alcance y filtros para explicar el universo consultado.

#### 50. Casos mínimos de error

Un error operacional:

- no deriva automáticamente al backoffice;
- no recomienda elevar permisos como solución genérica;
- no abre configuración técnica al trabajador ordinario.

Un error administrativo conserva su workspace y no transforma el contexto operativo de origen.

#### 51. Evidencia por package

Cada instancia `UX-QA-007::<package_id>` deberá conservar como mínimo:

- package evaluado;
- superficies operativas incluidas;
- superficies administrativas relacionadas;
- actores y roles representados;
- dispositivos aplicables;
- niveles de densidad observados;
- rutas de transición entre carriles;
- pruebas positivas;
- pruebas negativas;
- evidencia de autorización;
- evidencia de proyección de datos cuando aplique;
- hallazgos;
- severidad;
- owner;
- resultado.

#### 52. Resultado por package

Estados de certificación:

```text
PASS
FAIL
NOT_APPLICABLE
```

`PASS` requiere que todas las superficies aplicables mantengan frontera coherente bajo los actores y accesos representativos definidos para el package.

`NOT_APPLICABLE` requiere justificación verificable de que el package no expone ni consume una frontera operativo-administrativa material.

#### 53. Fallos bloqueantes por package

Bloquean `PASS` cuando sean aplicables:

- backoffice denso dentro de ejecución ordinaria;
- configuración o auditoría como CTA operacional común;
- rol amplio que genera menú universal;
- D3 o D4 ordinario en estación compartida;
- datos administrativos sensibles presentes sin necesidad;
- exportación o descarga masiva desde POS compartido;
- filtro administrativo tratado como área activa;
- retorno a operación con contexto administrativo residual;
- cambio de actor que conserva vista, filtros o datos sensibles;
- deep link que evita la frontera de intención;
- acción física ejecutada directamente desde vista comparativa sin resolver contexto exacto;
- configuración de recetas dentro del recetario operacional ordinario;
- hardware usado como única justificación para densidad.

#### 54. Hallazgos no bloqueantes

Un hallazgo puede diferirse únicamente si:

- no viola separación material;
- no expone datos ni capacidades indebidas;
- no introduce riesgo de acción accidental;
- tiene owner exacto;
- tiene tarea propietaria existente;
- tiene condición de cierre;
- tiene vencimiento o gate cuando corresponda.

No se crean tareas narrativas nuevas para acomodar hallazgos ya cubiertos.

#### 55. Certificación global final

`UX-QA-007::GLOBAL-FINAL` requiere:

1. todos los packages aplicables evaluados;
2. cero fallos bloqueantes abiertos;
3. consistencia del significado de carriles y niveles de densidad;
4. ausencia de menús universales introducidos por integración;
5. ausencia de estaciones compartidas convertidas en backoffice persistente;
6. cobertura representativa de actores con permisos múltiples;
7. consistencia de proyección de datos y privacidad;
8. hallazgos diferidos trazables y aceptables;
9. evidencia vigente respecto de la versión desplegada.

#### 56. Frescura de evidencia

La evidencia deberá repetirse o revalidarse cuando cambie materialmente:

- navegación principal;
- clasificación de carril;
- nivel de densidad;
- roles;
- permisos;
- superficies de administración;
- tablas o dashboards reutilizados en operación;
- proyección de datos;
- búsqueda, favoritos o deep links;
- comportamiento de dispositivo compartido;
- handoff entre operación y administración;
- versión desplegada del package.

#### 57. Independencia respecto del nombre de aplicación

No se presume que:

- VISO sea siempre administrativo;
- NEXO sea siempre operativo;
- FOGO sea siempre operativo;
- un módulo denominado configuración sea automáticamente correcto;
- una ruta denominada dashboard sea automáticamente administrativa.

La clasificación se resuelve por tarea, intención, actor, efecto y contexto.

#### 58. Independencia respecto del cargo

No se presume que:

- gerente deba ver todo;
- supervisor deba configurar;
- administrador deba operar desde backoffice;
- trabajador operativo nunca pueda abrir una tarea administrativa autorizada.

La separación gobierna la experiencia activa, no una jerarquía rígida de personas.

#### 59. Compatibilidad con modo guiado y experto

Los patrones administrativos existentes permanecen válidos:

- modo guiado para altas, configuración y decisiones complejas ocasionales;
- modo experto para consulta, comparación, edición masiva y auditoría;
- ayuda contextual, validación preventiva y vista previa de impacto;
- prototipos administrativos representativos.

`UX-QA-007` comprueba que esos patrones no aparezcan donde la intención activa sea ejecución ordinaria.

#### 60. Telemetría y métricas

Cuando exista instrumentación, puede observarse:

- entradas accidentales a administración desde operación;
- abandono después de un cambio de carril;
- retorno correcto al contexto operativo;
- controles administrativos seleccionados por error;
- uso de exportación desde dispositivos no apropiados;
- frecuencia de cambio entre carriles;
- necesidad de ayuda;
- errores por contexto o territorio.

Estas métricas no sustituyen el oracle contractual.

#### 61. Privacidad de métricas

La telemetría no se utilizará para:

- sancionar velocidad individual;
- inferir incompetencia por usar ayuda;
- registrar datos sensibles innecesarios;
- conservar payloads administrativos completos;
- perfilar al trabajador por su navegación cuando no sea necesario para seguridad o mejora del proceso.

#### 62. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea certifica cobertura ya registrada y no modifica el Registro Canónico de Requisitos de Prueba.

#### 63. Cobertura de prueba vigente reutilizada

La trazabilidad principal reutiliza, sin modificar:

- `TREQ-UX-003`;
- `TREQ-UX-010`;
- `TREQ-UX-016`;
- `TREQ-UX-021`;
- `TREQ-UX-029`;
- `TREQ-UX-047`;
- `TREQ-UX-048`;
- `TREQ-UX-062`;
- `TREQ-UX-063`;
- `TREQ-UX-064`;
- `TREQ-UX-074`;
- `TREQ-UX-227` a `TREQ-UX-249`;
- `TREQ-UX-324`.

La enumeración es trazabilidad de cobertura existente y no constituye alta ni modificación de requisitos.

#### 64. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La aprobación documental no ejecuta build de producto ni prueba superficies desplegadas. |
| LOCAL | NOT_EXECUTED | El artefacto se prepara para incorporación mediante el lifecycle documental; los validadores del checkout permanecen pendientes hasta ejecutar la batería. |
| REMOTA | PASS | Se verificaron protocolo, contrato de entrega, manifest modular, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, archivo propietario, marcadores `UX-QA-007` y `UX-QA-008`, el contrato completo `UX-BASE-012`, los patrones `UX-ADMIN-001` a `UX-ADMIN-005`, cobertura UX 04A vigente y el handoff completo aprobado de `UX-QA-006` usado como base adelantada. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron walkthroughs sobre aplicaciones desplegadas ni actores representativos en runtime. |
| FÍSICA | NOT_EXECUTED | No se validaron estaciones, POS, tablets o escritorios reales y no se materializaron instancias `UX-QA-007::<package_id>` ni `UX-QA-007::GLOBAL-FINAL`. |

#### 65. Criterios de aceptación

`UX-QA-007` queda documentalmente definida cuando se confirma que:

- [ ] la continuidad es `UX-QA-006 → UX-QA-007 → UX-QA-008`;
- [ ] autorización y relevancia visual permanecen separadas;
- [ ] los carriles operativos y administrativos tienen propósitos distintos;
- [ ] `D0` a `D4` se usan según intención y no según tamaño del equipo;
- [ ] la operación ordinaria permanece enfocada en tarea, contexto, evidencia, bloqueo y siguiente acción;
- [ ] backoffice, configuración, auditoría y exportaciones no compiten con la ejecución ordinaria;
- [ ] un actor con múltiples roles no recibe una unión indiscriminada de capacidades;
- [ ] supervisión operativa no se convierte en administración universal;
- [ ] una transición a administración es explícita y revalida autoridad;
- [ ] una acción física desde administración resuelve un contexto operativo exacto;
- [ ] filtros administrativos no se convierten en área operativa;
- [ ] tablas administrativas legítimas permanecen permitidas en su carril;
- [ ] tablas operativas se justifican por el trabajo y no por reutilización de backoffice;
- [ ] búsqueda, favoritos, recientes y deep links conservan la frontera;
- [ ] configuración y auditoría mantienen superficies apropiadas;
- [ ] exportar es capacidad separada de visualizar;
- [ ] acciones masivas permanecen fuera de la tarea operacional individual salvo contrato expreso;
- [ ] datos sensibles se minimizan y no reaparecen por permisos acumulados;
- [ ] dispositivos compartidos no conservan backoffice persistente;
- [ ] un POS completo no se interpreta como workstation administrativa;
- [ ] la adaptación táctil de `UX-QA-006` no aumenta densidad por inferencia;
- [ ] recetario operativo y administración de recetas mantienen frontera;
- [ ] una estación multiárea conserva área exacta por mutación;
- [ ] excepciones administrativas no se convierten en ruta ordinaria;
- [ ] la misma aplicación puede alojar ambos carriles solo con separación perceptible y gobernada;
- [ ] otra aplicación no transfiere a esta tarea la certificación cross-app de `UX-QA-008`;
- [ ] casos positivos y negativos quedan definidos por package;
- [ ] existe criterio `GLOBAL-FINAL`;
- [ ] la sección `Requisitos de prueba derivados` declara cero cambios y no contiene IDs TREQ;
- [ ] la cobertura heredada está separada de la sección de cero cambios;
- [ ] no se ejecutó implementación física durante esta aprobación documental;
- [ ] `UX-QA-008` conserva íntegra la certificación de continuidad entre aplicaciones.

#### 66. Límites

Esta tarea no:

- modifica `UX-BASE-012`;
- rediseña `UX-ADMIN-001` a `UX-ADMIN-005`;
- crea menús;
- cambia rutas;
- mueve componentes;
- crea dashboards;
- cambia tablas o grids;
- modifica permisos;
- cambia roles;
- crea workspaces;
- cambia filtros;
- modifica exportaciones;
- cambia configuración;
- modifica auditoría;
- altera FOGO, NEXO, ORIGO, PULSO, VISO, NUMERA, PASS, ANIMA o TALENTO;
- modifica datos o Supabase;
- ejecuta pruebas E2E;
- ejecuta pruebas físicas;
- certifica separación por mera inspección documental;
- certifica continuidad cross-app reservada a `UX-QA-008`;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 67. Handoff a `UX-QA-008`

`UX-QA-007` entrega a `UX-QA-008`:

- carril activo explícito;
- superficie operativa libre de contaminación administrativa ordinaria;
- workspace administrativo identificado cuando corresponde;
- transición entre carriles conceptual y gobernada;
- contexto que debe reconstruirse al volver a operación;
- prohibición de usar una vista comparativa como contexto físico implícito;
- fronteras de datos y autoridad que un handoff cross-app no puede ampliar.

`UX-QA-008` podrá certificar continuidad entre aplicaciones sin reabrir la separación estructural entre operación y administración.

#### 68. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-006 — Las pantallas táctiles funcionan en tablet`

**TAREA ACTUAL APROBADA**
`UX-QA-007 — Las vistas administrativas no contaminan la operación`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-008 — El proceso continúa correctamente entre aplicaciones`
### ✅ UX-QA-008 — El proceso continúa correctamente entre aplicaciones

**Estado:** APROBADA
**Tarea anterior:** UX-QA-007 — Las vistas administrativas no contaminan la operación
**Tarea siguiente:** UX-QA-009 — No se registra dos veces la misma información
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que un proceso que cruza aplicaciones conserva intención, tarea, recurso, versión, punto de continuidad y retorno sin reiniciarse, sin transportar autoridad implícita, sin desplazar la propiedad de la mutación y sin presentar éxito antes de la confirmación de la aplicación propietaria
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de continuidad cross-app definido; las ejecuciones `UX-QA-008::<package_id>` y la certificación `UX-QA-008::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff estructural de `UX-QA-007`, las reglas cross-app de `UX-BASE-008`, los contratos de pantalla y aplicación, los contratos `INT-APP-*` y la cobertura de prueba vigente, pero no infiere que ningún package, deep link, evento, ruta o integración desplegada haya demostrado continuidad real
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican rutas, deep links, componentes, clientes, eventos, colas, APIs, RPC, Server Actions, permisos, sesiones, contratos runtime, datos, Supabase, repositorios consumidores, despliegues ni aplicaciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que una persona puede continuar un mismo proceso cuando el siguiente trabajo pertenece a otra aplicación sin tener que reconstruir manualmente el caso y sin convertir el handoff en una transferencia de autoridad.

La certificación deberá responder, para cada package aplicable:

```text
¿EL CAMBIO DE APLICACIÓN CONSERVA EL MISMO PROCESO Y CASO?
¿LA PERSONA LLEGA AL RECURSO, ETAPA Y ACCIÓN CORRECTOS?
¿LA APLICACIÓN DESTINO REVALIDA AUTORIDAD Y ESTADO?
¿LA ESCRITURA SIGUE PERTENECIENDO A SU PROPIETARIO?
¿EL RETORNO O SIGUIENTE PASO SE RESUELVE SIN REINICIAR EL FLUJO?
```

La certificación no busca que todas las aplicaciones se comporten como una sola. Busca que sus fronteras sean explícitas y que cruzarlas no rompa el proceso.

#### 2. Resultado canónico

`UX-QA-008` establece `UX-QA-CROSS-APP-CONTINUITY-001@1.0.0`.

El resultado define:

- unidad certificable de continuidad entre aplicaciones;
- contrato observable de entrada al handoff;
- referencias que deben conservarse;
- referencias que nunca se interpretan como autoridad;
- reglas de revalidación en destino;
- propiedad de lectura, proyección y mutación;
- reglas de retorno y siguiente paso;
- tratamiento de cancelación, denegación, conflicto y versión obsoleta;
- tratamiento de cambio de actor o contexto;
- tratamiento de superficies transversales de SHELL;
- continuidad en modos guiados y expertos cuando cruzan aplicaciones;
- continuidad de borradores compatibles sin inventar persistencia compartida;
- evidencia positiva y negativa;
- criterio por package;
- criterio `GLOBAL-FINAL`;
- condiciones que invalidan evidencia previa.

#### 3. Alcance exacto

La certificación cubre, cuando apliquen:

- SHELL hacia una aplicación propietaria;
- una aplicación propietaria hacia otra aplicación propietaria;
- retorno desde una aplicación destino hacia la aplicación origen;
- continuación desde una bandeja transversal;
- deep links semánticos;
- navegación entre pantallas con distinta `primary_application_id`;
- handoffs operativos;
- handoffs administrativos;
- transición de modo guiado a experto cuando exista cambio de aplicación;
- transición de modo experto a guiado cuando exista cambio de aplicación;
- proyecciones cross-app que conducen a una mutación propietaria;
- pasos de proceso que dependen de hechos producidos por otra aplicación;
- acciones pendientes que deben retomarse después del cambio de aplicación;
- dispositivos personales y compartidos cuando el package los soporte;
- estado confirmado, bloqueado, denegado, conflictivo o pendiente durante el handoff.

No exige que cada proceso cruce aplicaciones. Solo certifica los handoffs realmente declarados por el package.

#### 4. Handoff recibido de `UX-QA-007`

`UX-QA-008` recibe una experiencia en la que:

- el carril activo es explícito;
- la operación ordinaria está separada del backoffice;
- una superficie administrativa legítima está identificada como tal;
- cambiar entre operación y administración no ocurre por accidente;
- el contexto operativo debe reconstruirse antes de una acción física;
- una vista comparativa no se convierte en área operativa por inferencia;
- una aplicación no puede ampliar autoridad solo porque la anterior podía mostrar una capacidad.

La tarea actual no reabre la separación operativo-administrativa.

#### 5. Frontera con `UX-QA-007`

Regla:

```text
CARRIL CORRECTO
≠
CONTINUIDAD CROSS-APP DEMOSTRADA
```

Una pantalla puede estar perfectamente clasificada y aun fallar `UX-QA-008` si el usuario pierde el recurso, vuelve al inicio de la aplicación o debe reconstruir el caso al cruzar la frontera.

#### 6. Frontera con `UX-QA-009`

`UX-QA-009` certificará que la misma información no se registre dos veces.

`UX-QA-008` puede detectar como síntoma de un handoff roto que la persona tenga que volver a seleccionar o reconstruir datos ya conocidos, pero no certifica la política general de captura única, deduplicación funcional ni ausencia de doble registro.

Regla:

```text
CONTINUAR EL MISMO CASO
≠
CERTIFICAR TODA LA POLÍTICA DE NO DUPLICACIÓN
```

#### 7. Frontera con `UX-QA-010`

`UX-QA-010` certificará la trazabilidad de los cambios.

`UX-QA-008` exige evidencia suficiente para demostrar origen, destino y continuidad, pero no reemplaza la auditoría histórica completa ni certifica por sí sola todos los eventos de trazabilidad.

#### 8. Frontera con `UX-QA-011`

`UX-QA-011` certificará tareas críticas bajo conectividad inestable.

`UX-QA-008` únicamente exige que un handoff que no pueda resolverse no finja éxito ni pierda el punto de continuidad. La resiliencia completa frente a red inestable permanece fuera de alcance.

#### 9. Regla principal

```text
CAMBIAR DE APLICACIÓN
≠
REINICIAR EL PROCESO
```

El flujo esperado es:

```text
TAREA EN APLICACIÓN A
→ HANDOFF SEMÁNTICO
→ APLICACIÓN PROPIETARIA B
→ REVALIDACIÓN
→ CONTINUACIÓN EN EL PUNTO CORRECTO
→ RESULTADO CONFIRMADO
→ RETORNO O SIGUIENTE PASO
```

#### 10. Regla de autoridad

```text
CONTEXTO TRANSPORTADO
≠
AUTORIDAD TRANSPORTADA
```

La aplicación origen puede transportar referencias suficientes para localizar el trabajo. La aplicación destino debe resolver nuevamente la autoridad efectiva.

Nunca se considera prueba de autorización:

- la URL de origen;
- la existencia de un botón en la aplicación A;
- un rol mostrado por el cliente;
- un filtro activo;
- una selección previa;
- un estado objetivo enviado por query string;
- un token funcional inventado por la UI;
- que SHELL haya mostrado la aplicación;
- que una aplicación anterior haya permitido leer el recurso.

#### 11. Contrato mínimo de handoff de pantalla

La certificación reconoce el contrato aprobado de composición entre aplicaciones:

```text
source_screen_id
source_application_id
destination_screen_id
destination_application_id
business_object_ref
return_contract
```

Estos campos permiten localizar la transición, pero no sustituyen la revalidación de identidad, permiso, contexto, recurso, territorio, versión y estado.

#### 12. Referencias funcionales que deben conservarse

Cuando existan en el proceso, el handoff deberá conservar de forma segura y verificable referencias a:

- proceso;
- tarea o unidad de trabajo;
- recurso empresarial;
- versión relevante;
- punto de continuidad;
- origen del retorno;
- acción pendiente;
- pantalla origen;
- aplicación origen;
- pantalla destino;
- aplicación destino;
- referencia del objeto empresarial;
- correlación existente cuando el proceso ya la define.

Actor y contexto pueden viajar como referencias para orientación, pero nunca como autoridad final.

#### 13. Datos que no se transportan como autoridad

Queda prohibido que el handoff convierta en autoridad:

- permisos;
- roles efectivos no revalidados;
- claims persistidos por el cliente;
- tokens funcionales improvisados;
- estado objetivo impuesto por la UI;
- decisión de autorización;
- resultado empresarial todavía no confirmado;
- versión asumida sin relectura;
- área operativa inferida desde una vista administrativa;
- actor de una sesión anterior;
- aprobación previa aplicada a otro recurso;
- excepción o step-up vencido.

#### 14. Revalidación obligatoria en destino

La aplicación destino debe poder demostrar, antes de una acción material:

```text
IDENTIDAD
+
ACTOR EFECTIVO
+
PERMISO
+
CONTEXTO
+
RECURSO
+
TERRITORIO
+
VERSIÓN
+
ESTADO
```

Si cualquiera cambia respecto de la referencia recibida, el destino usa la realidad vigente y no el supuesto del origen.

#### 15. Propiedad de la pantalla

Cada pantalla conserva una `primary_application_id` canónica.

Un handoff:

- no mueve la pantalla al SHELL;
- no convierte a la aplicación origen en propietaria del destino;
- no permite que el destino adopte maestros de la aplicación origen;
- no duplica una pantalla por compartir componentes;
- no cambia identidad de pantalla por una ruta temporal;
- no convierte una proyección en fuente de verdad.

#### 16. Propiedad de la mutación

Regla:

```text
ORQUESTAR
≠
ESCRIBIR EN DOMINIO AJENO
```

La aplicación que presenta el flujo puede coordinar el siguiente paso, pero toda mutación empresarial debe seguir el contrato de su propietaria.

La prueba falla si una aplicación:

- escribe directamente una tabla ajena sin contrato aprobado;
- mantiene un maestro paralelo para evitar el handoff;
- aplica una transición empresarial cuya propiedad corresponde a otra aplicación;
- presenta como confirmado un efecto que la propietaria no confirmó;
- oculta cuál sistema es fuente del resultado.

#### 17. Proyecciones cross-app

Una proyección de otra aplicación solo es válida cuando:

- es contractual;
- es mínima para la finalidad;
- identifica su fuente;
- no crea un maestro paralelo;
- no adquiere derechos de escritura por estar visible;
- hace perceptibles retrasos o estados no confirmados cuando son materiales;
- deriva a la propietaria para mutaciones.

#### 18. SHELL como superficie transversal

SHELL puede:

- mostrar aplicaciones disponibles;
- resolver entrada y contexto;
- presentar tareas y notificaciones transversales;
- conducir a la aplicación propietaria;
- ofrecer soporte y diagnóstico transversal autorizado.

SHELL no debe:

- ejecutar en su bandeja la mutación empresarial propietaria;
- duplicar formularios de NEXO, FOGO, ORIGO, PULSO, NUMERA, VISO, PASS o ANIMA;
- convertir una notificación en autoridad;
- inventar estado del proceso;
- confirmar resultados que todavía pertenecen a otra aplicación.

#### 19. Entrada correcta al destino

El destino debe abrir, cuando el contrato lo permita:

```text
LA TAREA
+
EL RECURSO
+
LA ETAPA
+
EL PUNTO DE CONTINUIDAD
```

No basta con abrir:

- la portada de la aplicación;
- un menú general;
- una tabla sin el recurso seleccionado;
- la última pantalla visitada;
- una ruta genérica que obliga a reconstruir el caso.

#### 20. Deep links semánticos

Un deep link válido:

- identifica una intención estable;
- resuelve el destino canónico;
- conserva referencia empresarial suficiente;
- no codifica permisos como autoridad;
- no salta revalidación;
- no depende de una ruta legacy retirada sin compatibilidad;
- no abre un recurso distinto ante colisión de identificadores;
- no deja al usuario atrapado si el destino ya no es válido.

#### 21. Retorno

Todo handoff que declare retorno debe especificar un comportamiento comprensible después de:

- éxito;
- cancelación;
- denegación;
- conflicto;
- versión obsoleta;
- recurso inexistente;
- sesión vencida;
- resultado todavía pendiente.

El retorno no debe depender únicamente del botón del navegador.

#### 22. Retorno tras éxito

Después de un resultado confirmado, la experiencia puede:

- volver a la tarea origen;
- avanzar al siguiente paso del proceso;
- permanecer en la aplicación destino cuando el siguiente trabajo también le pertenece;
- regresar a una bandeja transversal con estado actualizado.

La elección debe estar determinada por el contrato del proceso, no por conveniencia de routing.

#### 23. Cancelación

Cancelar una acción en destino:

- no equivale a completar el proceso;
- no produce un receipt de éxito;
- no cambia el estado empresarial salvo contrato explícito de cancelación;
- conserva el origen de retorno cuando sigue vigente;
- permite retomar el trabajo sin inventar un resultado.

#### 24. Denegación

Si la aplicación destino determina que la persona ya no puede continuar:

- no ejecuta la acción;
- no confía en la autorización de origen;
- muestra causa segura y siguiente paso conforme a los contratos de error;
- conserva referencia suficiente para soporte o retorno;
- no transforma la denegación en error técnico genérico.

#### 25. Versión obsoleta

Si el recurso cambió entre origen y destino:

```text
REFERENCIA RECIBIDA
≠
VERSIÓN VIGENTE
```

La aplicación destino debe:

- detectar la diferencia cuando sea material;
- impedir una acción sobre estado obsoleto;
- mostrar la versión vigente o mecanismo de conciliación permitido;
- preservar el trabajo seguro cuando corresponda;
- no forzar silenciosamente el estado enviado por el origen.

#### 26. Recurso inexistente o retirado

Si el recurso ya no existe, fue fusionado, sustituido, cancelado o retirado:

- el destino no abre un recurso parecido por heurística;
- no usa el primer resultado de búsqueda;
- explica que la referencia dejó de ser válida;
- aplica una ruta de recuperación gobernada cuando exista;
- conserva la identidad original para diagnóstico.

#### 27. Cambio de actor

Un handoff no puede sobrevivir silenciosamente a un cambio de actor cuando la acción depende de identidad humana.

Al cambiar actor:

- se revalida la sesión;
- se limpia autoridad heredada;
- se protege información personal;
- se reevalúa el permiso;
- se decide si la tarea puede ser retomada por el nuevo actor;
- no se reasigna un borrador personal por defecto.

#### 28. Dispositivo compartido

En tablet, kiosco o POS compartido:

- la aplicación técnica puede permanecer disponible;
- la identidad humana no permanece por comodidad;
- el handoff conserva solo referencias compatibles con el relevo;
- la siguiente mutación exige actor válido cuando corresponda;
- datos personales del actor anterior no reaparecen;
- el dispositivo no se convierte en aprobador.

#### 29. Cambio de área o territorio

Cuando el handoff conduce a trabajo en otro ámbito autorizado:

- la aplicación destino calcula el territorio efectivo;
- el filtro de origen no se convierte en territorio;
- una vista administrativa multiárea no fija el área física;
- la mutación conserva un territorio exacto;
- los conflictos con turno, sede, área o dispositivo bloquean la acción material.

#### 30. Estado del proceso

La continuidad requiere distinguir:

```text
ESTADO DEL PROCESO
ESTADO DE LA PANTALLA
ESTADO DEL HANDOFF
ESTADO DEL RESULTADO
```

Abrir el destino no significa que el proceso avanzó.

Un spinner, navegación completada o carga de pantalla tampoco constituye confirmación empresarial.

#### 31. Resultado confirmado

La experiencia solo puede avanzar como si la acción hubiera ocurrido cuando existe confirmación autoritativa del resultado aplicable.

Regla:

```text
NAVEGACIÓN COMPLETADA
≠
EFECTO EMPRESARIAL CONFIRMADO
```

#### 32. Resultado pendiente

Cuando el destino inició trabajo pero el resultado todavía no está confirmado:

- se muestra estado pendiente;
- se conserva el recurso y la acción;
- no se habilita una segunda ejecución equivalente por simple navegación;
- el retorno explica que el proceso todavía espera confirmación;
- no se inventa un estado final.

La certificación detallada de idempotencia y doble registro permanece en sus tareas propietarias.

#### 33. Conflicto

Ante conflicto de versión, concurrencia, custodia o estado:

- la continuidad se detiene en un punto seguro;
- se preserva la información necesaria para reconciliar;
- no se sobrescribe silenciosamente;
- no se salta a otro recurso;
- el retorno o recuperación permanece determinado.

#### 34. Handoffs de modo guiado

Cuando un flujo guiado cruza aplicaciones:

- conserva el mismo caso o correlación existente;
- conserva objeto y versión;
- conserva el paso de origen y el punto de retorno;
- cada escritura se ejecuta en su propietaria;
- la aplicación destino revalida autoridad;
- volver al asistente no reinicia los pasos ya confirmados.

#### 35. Handoffs de modo experto

Cuando una superficie experta deriva a otra aplicación:

- conserva población, selección y objeto aplicables sin reinterpretarlos como permiso;
- conserva la referencia al filtro o consulta cuando sea reproducible;
- distingue filas visibles de universo autorizado;
- envía la mutación a la propietaria;
- recibe resultado por objeto cuando el contrato lo exija;
- no transforma la tabla transversal en fuente maestra.

#### 36. Cambio entre modo guiado y experto

Cuando el cambio además cruza aplicaciones, la continuidad debe conservar, según aplique:

- objeto;
- versión;
- alcance;
- borrador compatible;
- validaciones ya satisfechas que sigan vigentes;
- diferencias detectadas;
- simulación vigente;
- punto de retorno.

No puede utilizarse el cambio de modo para omitir revisión, segregación o aprobación.

#### 37. Borradores

La tarea no inventa un almacén transversal de borradores.

Un borrador puede continuar entre aplicaciones únicamente si existe un contrato previo que determine:

- propietario;
- identidad estable;
- versión;
- campos transferibles;
- sensibilidad;
- vigencia;
- política de cancelación;
- limpieza en dispositivos compartidos.

Sin ese contrato, el handoff transporta referencias, no el borrador completo por inferencia.

#### 38. Ayuda y validaciones

Un cambio de aplicación no debe eliminar:

- errores ya detectados que sigan vigentes;
- ayudas necesarias para el siguiente paso;
- advertencias materiales;
- vista previa de impacto todavía válida;
- requisitos de confirmación;
- información de versión o frescura.

Si una validación depende de datos de destino, se recalcula allí.

#### 39. Propiedad de datos

La continuidad cross-app no autoriza:

- copiar maestros para evitar llamadas;
- persistir una segunda fuente de verdad;
- escribir en almacenamiento ajeno desde el cliente;
- corregir localmente un dato propietario de otra aplicación;
- inferir que una proyección stale es el hecho actual.

#### 40. Eventos y efectos posteriores

Cuando el resultado de una aplicación genera efectos en otras mediante eventos:

- el usuario debe distinguir el efecto confirmado del efecto todavía eventual cuando sea material;
- la aplicación que recibe el evento no reescribe el hecho de origen;
- una demora de proyección no convierte el commit propietario en inexistente;
- una proyección fallida no debe mostrarse como si todos los consumidores estuvieran actualizados.

La certificación técnica profunda de eventos permanece en `INT-APP-*`.

#### 41. Causalidad observable

La evidencia del caso debe permitir relacionar, sin exponer secretos:

```text
ORIGEN
→ HANDOFF
→ DESTINO
→ DECISIÓN DE REVALIDACIÓN
→ ACCIÓN O BLOQUEO
→ RESULTADO
→ RETORNO O SIGUIENTE PASO
```

No se exige que toda esta información sea visible simultáneamente al usuario final; debe ser demostrable durante la certificación.

#### 42. Multi-hop

Un proceso puede requerir:

```text
A → B → C → A
```

La prueba no considera correcto un multi-hop solo porque cada enlace funciona aislado.

Debe demostrarse que:

- el mismo proceso continúa;
- cada destino recibe la referencia correcta;
- cada paso revalida su autoridad;
- no se pierde el recurso;
- no se crea un segundo caso por navegación;
- el retorno final llega al punto esperado.

La política de doble registro general permanece en `UX-QA-009`.

#### 43. Aplicación origen cerrada o recargada

Si el origen deja de estar montado después del handoff:

- el destino no depende de estado React o memoria efímera como única referencia;
- el contrato de retorno debe poder resolverse o degradarse de forma explícita;
- la pérdida de UI no convierte el proceso en inexistente;
- no se simula que el usuario puede volver a un estado que ya no existe.

La implementación concreta de persistencia pertenece a los packages propietarios.

#### 44. Navegación hacia aplicación incorrecta

Es fallo crítico cuando:

- el objeto pertenece a otra aplicación propietaria;
- el destino tiene una intención distinta;
- una ruta legacy conduce a una pantalla no equivalente;
- un alias resuelve un recurso de otro tipo;
- SHELL abre una superficie transversal en lugar del workspace propietario;
- el retorno lleva a un proceso diferente.

#### 45. Fuente y destino explícitos en evidencia

Cada caso de prueba debe registrar:

- aplicación origen;
- pantalla origen cuando exista identidad canónica;
- intención de salida;
- aplicación destino;
- pantalla destino;
- recurso de prueba;
- versión o estado inicial relevante;
- acción esperada;
- resultado esperado;
- comportamiento de retorno.

#### 46. Casos positivos mínimos

Por package aplicable se cubrirán, cuando existan:

1. handoff A → B con acción confirmada y retorno correcto;
2. apertura directa desde SHELL al recurso propietario;
3. destino que revalida y permite continuar;
4. destino que detecta versión nueva y obliga a reconciliar;
5. destino que deniega sin perder referencia del caso;
6. cancelación en destino con retorno seguro;
7. actor válido que continúa después del handoff;
8. cambio de actor que obliga a nueva resolución;
9. proyección cross-app que deriva a la propietaria para escribir;
10. multi-hop completo cuando el package lo declare.

#### 47. Casos negativos mínimos

La evidencia deberá intentar, cuando apliquen:

- abrir solo la portada de destino en lugar de la tarea;
- transportar permiso mediante URL o estado de cliente;
- reutilizar autorización de la aplicación origen;
- actuar sobre una versión obsoleta;
- resolver un recurso ambiguo por primer resultado;
- usar un filtro administrativo como territorio operativo;
- escribir directamente un dominio ajeno;
- mostrar éxito por navegación antes del commit;
- volver a un origen equivocado;
- perder la acción pendiente;
- continuar con actor anterior en dispositivo compartido;
- convertir una proyección en fuente de verdad;
- esconder que un efecto consumidor continúa pendiente;
- usar una ruta legacy no equivalente como destino.

#### 48. Casos que no demuestran continuidad por sí solos

No son evidencia suficiente:

- que ambas aplicaciones abran;
- que exista un enlace;
- que la URL contenga el ID esperado;
- que el usuario pueda copiar y pegar el identificador;
- que el mismo componente visual exista en ambas apps;
- que la navegación no arroje error JavaScript;
- que el origen y destino compartan sesión técnica;
- que un mock muestre el flujo feliz;
- que un evento figure como emitido sin confirmar el efecto relevante;
- que una persona experta sepa reconstruir manualmente el caso.

#### 49. Oracle de continuidad

El oracle de cada escenario compara:

```text
ANTES DEL HANDOFF
vs
DESPUÉS DEL HANDOFF
vs
DESPUÉS DEL RESULTADO
vs
RETORNO O SIGUIENTE PASO
```

Debe permanecer coherente:

- identidad del proceso;
- recurso empresarial;
- versión vigente o reconciliada;
- tarea o paso pendiente;
- propiedad de la acción;
- autoridad revalidada;
- estado confirmado;
- destino de retorno.

#### 50. Métricas de soporte

Podrán registrarse, sin crear un umbral global arbitrario:

- `wrong_destination_count`;
- `lost_business_object_count`;
- `lost_process_context_count`;
- `manual_reconstruction_count`;
- `stale_version_action_count`;
- `authority_transport_count`;
- `owner_boundary_bypass_count`;
- `false_success_count`;
- `lost_return_count`;
- `actor_context_leak_count`;
- `multi_hop_break_count`;
- tiempo adicional por handoff;
- cantidad de pasos de reconstrucción manual.

Los umbrales de rendimiento o fricción se fijan por package cuando exista línea base real.

#### 51. Fallos críticos

Bloquean el caso:

- autorización heredada sin revalidación;
- mutación ejecutada por propietaria incorrecta;
- acción sobre recurso distinto al referenciado;
- acción sobre versión obsoleta cuando el cambio es material;
- éxito presentado antes de confirmación autoritativa;
- pérdida del recurso o proceso que obliga a reconstrucción insegura;
- filtración de actor o información privada del usuario anterior;
- retorno a otro caso o proceso;
- transición física basada en territorio administrativo no revalidado;
- bypass de segregación por cambiar de aplicación.

#### 52. Hallazgos no críticos

Un hallazgo puede no bloquear el caso cuando:

- aumenta fricción sin riesgo material;
- el retorno es correcto pero añade un paso redundante;
- la etiqueta del destino es mejorable sin ambigüedad;
- existe una espera perceptible pero el estado permanece correcto;
- la aplicación destino presenta una ayuda adicional no invasiva.

Todo hallazgo diferido deberá tener propietario y condición de cierre dentro del package o tarea ya existente.

#### 53. Unidad de certificación por package

La identidad física posterior es:

```text
UX-QA-008::<package_id>
```

Cada package aplicable debe identificar:

- handoffs realmente incluidos;
- aplicaciones origen y destino;
- pantallas o superficies aplicables;
- procesos y recursos de prueba;
- estados y versiones relevantes;
- actores y territorios aplicables;
- escenarios positivos;
- escenarios negativos;
- evidencia automatizada y/o manual requerida;
- hallazgos;
- decisión final.

#### 54. Certificación global final

La identidad final es:

```text
UX-QA-008::GLOBAL-FINAL
```

La certificación global no repite mecánicamente todos los casos. Comprueba que:

- todos los packages aplicables cerraron su alcance;
- no quedan handoffs canónicos sin package propietario;
- las fronteras de aplicación son coherentes transversalmente;
- las rutas cross-app no dependen de autoridad del cliente;
- SHELL no absorbió mutaciones empresariales;
- los patrones guiado/experto preservan continuidad;
- no existe una excepción global sin propietario;
- cambios posteriores no invalidaron evidencia relevante.

#### 55. Invalidación de evidencia

La evidencia debe repetirse para el alcance afectado cuando cambie materialmente:

- aplicación propietaria de una pantalla;
- ruta o deep link con semántica de handoff;
- contrato `return_contract`;
- identidad o versión del objeto transportado;
- autorización de destino;
- frontera de escritura;
- proceso o paso primario;
- política de actor o dispositivo compartido;
- modo guiado/experto;
- contrato de eventos que modifica el resultado visible;
- alias legacy utilizado para compatibilidad.

#### 56. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La conducta certificada ya está cubierta por contratos de UX, integración, pantalla, autorización, continuidad e idempotencia aprobados. Esta tarea define la forma integral de demostrar esa cobertura por package y globalmente, sin modificar el Registro 04A.

#### 57. Cobertura de prueba vigente reutilizada

Se reutiliza, entre otra cobertura vigente aplicable:

- `TREQ-UX-149` — transición cross-app conservando proceso, tarea, recurso, versión, retorno y acción pendiente sin transportar autoridad;
- `TREQ-INTEGRATION-005` — preservación de contexto y revalidación en la aplicación receptora;
- `TREQ-INTEGRATION-003` — identidad idempotente, resultado recuperable y tratamiento de reintento;
- `TREQ-INTEGRATION-006` — fuente empresarial única y ausencia de fuentes competidoras;
- `TREQ-UX-144` — entrada en tarea, recurso, etapa y punto de continuidad correctos;
- `TREQ-UX-369` — continuidad de guías cross-app con caso o correlación y propietario de cada escritura;
- `TREQ-UX-375` — interoperabilidad guiado/experto sin duplicar escrituras ni omitir controles;
- `TREQ-UX-400` — superficie transversal que conserva fuente canónica y envía mutaciones a su propietaria;
- `TREQ-UX-401` — cambio experto/guiado conservando objeto, población, borrador, alcance y versión;
- `TREQ-UX-425` — validación transversal sin descargar datos no autorizados al cliente;
- `TREQ-UX-434` — vista previa de efectos cross-app y estrategia ante rechazo parcial;
- `TREQ-UX-446` — conservación de ayuda, errores, borrador, versión y simulación al cambiar de modo;
- cobertura adicional UX vigente asociada a contexto, actor, tarea, errores, dispositivos, privacidad y pantallas.

La enumeración es trazabilidad de cobertura existente y no constituye una modificación del registro.

#### 58. Evidencia de validación

| Clase | Estado | Evidencia documental de esta tarea |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecuta build de producto durante la definición documental del contrato |
| LOCAL | NOT_EXECUTED | no se ejecutan casos cross-app en checkout o aplicaciones locales durante esta definición |
| REMOTA | PASS | fuentes canónicas remotas, topología, contrato de entrega, políticas, bloque propietario, cobertura 04A y contratos cross-app fueron contrastados para redactar el contrato |
| OPERATIVA | NOT_EXECUTED | los recorridos reales entre aplicaciones permanecen pendientes de cada package posterior a E5 |
| FÍSICA | NOT_EXECUTED | no se ejecutan pruebas en tablets, POS, kioscos o puestos físicos durante esta tarea documental |

#### 59. Evidencia mínima posterior por caso

La ejecución posterior debe conservar, cuando aplique:

- package y ambiente;
- build o versión bajo prueba;
- aplicación y pantalla origen;
- aplicación y pantalla destino;
- proceso;
- recurso;
- versión inicial;
- actor y territorio de prueba;
- acción de salida;
- referencia transportada;
- resultado de revalidación;
- acción ejecutada o bloqueo;
- resultado autoritativo;
- retorno o siguiente paso;
- evidencia de que la propietaria realizó la mutación;
- hallazgos y decisión.

No se exige exponer secretos, tokens ni datos sensibles en la evidencia.

#### 60. Seguridad y privacidad de la evidencia

La evidencia no debe almacenar innecesariamente:

- tokens de sesión;
- PIN;
- credenciales;
- headers de autorización;
- secretos de deep link;
- datos personales completos;
- payloads sensibles cuando una referencia o hash sea suficiente.

La prueba debe demostrar la frontera sin crear otra fuga.

#### 61. Responsabilidad de un fallo

La causa se asigna al propietario real:

| Tipo de fallo | Propietario de corrección |
| --- | --- |
| ruta o deep link incorrecto | package o pantalla que produce la navegación |
| destino equivocado | contrato de pantalla/aplicación o package consumidor |
| autoridad heredada | autorización del destino o handoff técnico propietario |
| mutación en dominio ajeno | aplicación/package que viola la frontera de escritura |
| pérdida de proceso o recurso | contrato de handoff / SHELL / package de integración aplicable |
| retorno incorrecto | flujo o package que declara el `return_contract` |
| proyección desactualizada presentada como confirmada | package consumidor/proyección propietaria |
| actor anterior heredado | dispositivo, sesión o package consumidor |
| problema general de doble captura | `UX-QA-009` y propietarios de captura única |
| trazabilidad incompleta del cambio | `UX-QA-010` y contratos de auditoría |
| fallo bajo conectividad inestable | `UX-QA-011` y contratos de continuidad |

#### 62. Casos fuera de alcance

No se certifica aquí:

- calidad visual general de cada aplicación;
- separación operativo-administrativa ya cubierta por `UX-QA-007`;
- política global de captura única de `UX-QA-009`;
- trazabilidad completa de `UX-QA-010`;
- comportamiento integral bajo red inestable de `UX-QA-011`;
- rendimiento global de eventos;
- consistencia de todas las proyecciones analíticas;
- compensaciones completas;
- disaster recovery;
- disponibilidad de proveedores externos;
- migración de rutas legacy no incluida en un package aplicable.

#### 63. Criterio de aceptación por package

Un package puede cerrar `UX-QA-008::<package_id>` cuando:

- todos sus handoffs aplicables están identificados;
- el origen entrega referencias suficientes y no autoridad;
- el destino revalida identidad, permiso, contexto, recurso, territorio, versión y estado cuando corresponda;
- el destino abre el punto correcto de continuidad;
- la mutación permanece en su propietaria;
- el resultado no se presenta confirmado antes de serlo;
- éxito, cancelación, denegación, conflicto y versión obsoleta tienen salida determinada;
- el retorno o siguiente paso es correcto;
- los casos negativos críticos no logran bypass;
- los hallazgos abiertos tienen propietario y condición de cierre;
- la evidencia es reproducible y protege secretos.

#### 64. Criterios de aceptación

- [ ] El cambio de aplicación no reinicia el proceso.
- [ ] El destino abre tarea, recurso, etapa y punto de continuidad correctos cuando el contrato lo permite.
- [ ] Proceso, tarea, recurso, versión, retorno y acción pendiente se conservan mediante referencias seguras.
- [ ] El handoff no transporta permisos ni autoridad implícita.
- [ ] La aplicación destino revalida autoridad y estado.
- [ ] Un filtro o cobertura administrativa no se convierte en contexto operativo.
- [ ] La propiedad de pantalla y la propiedad de mutación permanecen explícitas.
- [ ] SHELL conduce a la propietaria sin absorber la mutación empresarial.
- [ ] Una proyección cross-app no se convierte en fuente maestra.
- [ ] El resultado visual no se confunde con confirmación empresarial.
- [ ] Las versiones obsoletas bloquean o reconcilian antes de actuar.
- [ ] La cancelación no marca el proceso como completado.
- [ ] La denegación no pierde la referencia necesaria para continuar o recuperar.
- [ ] El cambio de actor no hereda autoridad ni datos personales del actor anterior.
- [ ] Los dispositivos compartidos no convierten el principal técnico en actor humano.
- [ ] Los handoffs guiados conservan caso y punto de retorno.
- [ ] Los handoffs expertos conservan alcance sin convertir filtros en permiso.
- [ ] Cambiar de modo no permite omitir segregación, revisión o aprobación.
- [ ] El multi-hop completo conserva proceso, recurso y retorno cuando el package lo declara.
- [ ] Existe evidencia positiva y negativa por package aplicable.
- [ ] Los fallos críticos tienen dueño y bloquean el caso.
- [ ] No se exige una métrica global de fricción sin línea base real.
- [ ] Existe criterio `GLOBAL-FINAL`.
- [ ] La sección `Requisitos de prueba derivados` declara cero cambios y no contiene identificadores de requisitos.
- [ ] La cobertura heredada está separada de la sección de cero cambios.
- [ ] No se ejecutó implementación física durante esta aprobación documental.
- [ ] `UX-QA-009` conserva íntegra la certificación de no registrar dos veces la misma información.

#### 65. Límites

Esta tarea no:

- modifica `UX-BASE-008`;
- modifica contratos `PROC-SCREEN-*`;
- modifica `INT-APP-*`;
- redefine aplicaciones propietarias;
- crea rutas o deep links;
- crea schemas de handoff;
- modifica eventos;
- cambia idempotencia;
- cambia retries;
- crea colas;
- modifica Server Actions, APIs o RPC;
- cambia permisos;
- cambia sesiones;
- cambia RLS;
- modifica Supabase;
- crea maestros compartidos;
- mueve pantallas entre aplicaciones;
- resuelve rutas legacy físicamente;
- ejecuta pruebas E2E;
- ejecuta pruebas físicas;
- certifica packages sin evidencia posterior a E5;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 66. Handoff a `UX-QA-009`

`UX-QA-008` entrega a `UX-QA-009`:

- proceso y recurso conservados entre aplicaciones;
- propietaria de cada mutación identificada;
- referencias cross-app ya revalidadas;
- punto de continuidad conocido;
- resultado y retorno distinguibles;
- ausencia de autoridad transportada como condición previa;
- lugares donde una reconstrucción o recaptura manual indicaría posible duplicación.

`UX-QA-009` podrá certificar ausencia de doble registro sin reabrir la semántica del handoff cross-app.

#### 67. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-007 — Las vistas administrativas no contaminan la operación`

**TAREA ACTUAL APROBADA**
`UX-QA-008 — El proceso continúa correctamente entre aplicaciones`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-009 — No se registra dos veces la misma información`
### [ ] UX-QA-009 — No se registra dos veces la misma información
### [ ] UX-QA-010 — Los cambios conservan trazabilidad
### [ ] UX-QA-011 — Las tareas críticas soportan conectividad inestable
### [ ] UX-QA-012 — El retorno entre aplicaciones conserva contexto
### [ ] UX-QA-013 — El retorno conserva el proceso cuando corresponde
### [ ] UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo
### [ ] UX-QA-015 — Los bloqueos se entienden sin códigos técnicos
### [ ] UX-QA-016 — La información sensible se oculta correctamente
### [ ] UX-QA-017 — La aplicación propietaria conserva la fuente de verdad
### [ ] UX-QA-018 — Los eventos idempotentes no duplican efectos
### [ ] UX-QA-019 — Los fallos parciales permiten recuperación
### [ ] UX-QA-020 — Cada aplicación supera piloto con usuarios reales
### [ ] UX-QA-021 — Probar SHELL por tipo de actor
### [ ] UX-QA-022 — Probar ANIMA con trabajadores y administradores
### [ ] UX-QA-023 — Probar VISO por rol administrativo
### [ ] UX-QA-024 — Probar NEXO por rol operativo
### [ ] UX-QA-025 — Probar FOGO por área productiva
### [ ] UX-QA-026 — Probar ORIGO por etapa de compra
### [ ] UX-QA-027 — Probar PULSO por punto operativo
### [ ] UX-QA-028 — Probar NUMERA por alcance financiero
### [ ] UX-QA-029 — Probar PASS como cliente
### [ ] UX-QA-030 — Probar AURA únicamente después de aprobar su continuidad

### Subconjunto VISO mensual

`002`, `003`, `004`, `006`, `007`, `008`, `009`, `010`, `012`, `015`, `016`, `017`, `018`, `019`, `020` y `023` son obligatorias.
