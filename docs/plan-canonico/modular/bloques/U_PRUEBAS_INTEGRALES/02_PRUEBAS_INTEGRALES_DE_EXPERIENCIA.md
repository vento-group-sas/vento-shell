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
### ✅ UX-QA-009 — No se registra dos veces la misma información

**Estado:** APROBADA
**Tarea anterior:** UX-QA-008 — El proceso continúa correctamente entre aplicaciones
**Tarea siguiente:** UX-QA-010 — Los cambios conservan trazabilidad
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por paquete y globalmente que cada hecho empresarial se captura o produce una sola vez en su fuente válida, se reutiliza con semántica y linaje correctos, no obliga a transcripción o carga redundante entre pasos o aplicaciones y conserva recapturas legítimas cuando representan una observación, atestación o verificación nueva
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de captura única y reutilización segura definido; las ejecuciones `UX-QA-009::<package_id>` y la certificación `UX-QA-009::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff estructural de `UX-QA-008`, el contrato de captura única de `UX-BASE-007`, los contratos de integración, pantalla, fuente y evidencia y la cobertura de prueba vigente, pero no infiere que ningún package, formulario, importación, integración, dispositivo o flujo desplegado haya demostrado ausencia real de doble registro
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican formularios, componentes, rutas, deep links, contratos runtime, eventos, APIs, RPC, Server Actions, tablas, maestros, archivos, documentos, colas, idempotencia, permisos, sesiones, RLS, datos, Supabase, repositorios consumidores, despliegues ni aplicaciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que una persona no debe registrar nuevamente información que ya existe como el mismo hecho empresarial y puede reutilizarse de forma vigente, autorizada y trazable.

La certificación deberá responder, para cada package aplicable:

```text
¿EL DATO PEDIDO YA EXISTE COMO EL MISMO HECHO EMPRESARIAL?
¿EXISTE UNA FUENTE AUTORITATIVA IDENTIFICABLE?
¿EL SISTEMA REUTILIZA O DERIVA EL HECHO EN VEZ DE PEDIR TRANSCRIPCIÓN?
¿CUANDO SE PREGUNTA OTRA VEZ EXISTE UNA RAZÓN MATERIAL Y EXPLICABLE?
¿LA RECAPTURA REPRESENTA UNA OBSERVACIÓN, ATESTACIÓN O VERIFICACIÓN NUEVA?
¿LOS RETRIES, IMPORTACIONES Y CAMBIOS DE SUPERFICIE EVITAN CREAR UN SEGUNDO REGISTRO O EFECTO?
```

La tarea no busca minimizar campos a cualquier costo. Busca eliminar duplicación sin convertir hechos diferentes en uno solo ni contaminar verificaciones independientes.

#### 2. Resultado canónico

`UX-QA-009` establece `UX-QA-SINGLE-CAPTURE-CERTIFICATION-001@1.0.0`.

El resultado define:

- unidad certificable de captura única por package;
- identidad semántica mínima del hecho evaluado;
- modos válidos de reutilización, confirmación y recaptura;
- oracle para distinguir duplicación de observación legítima;
- criterios cross-app y entre pasos;
- tratamiento de fuentes, proyecciones, cachés y copias;
- criterios de documentos y evidencia;
- tratamiento de dispositivos compartidos;
- tratamiento de offline, retries e idempotencia;
- tratamiento de imports y operaciones masivas;
- tratamiento de modos guiado y experto;
- evidencia positiva y negativa requerida;
- criterio por package;
- criterio global final;
- handoff a `UX-QA-010` sin absorber la trazabilidad de cambios.

#### 3. Alcance exacto

La certificación aplica cuando un flujo consume o produce información que puede existir previamente en:

- el mismo paso;
- un paso anterior del mismo proceso;
- otra aplicación;
- una fuente maestra;
- una proyección;
- un documento o archivo;
- un borrador válido;
- una cola offline;
- una importación;
- un dispositivo compartido;
- una vista guiada o experta;
- una operación repetitiva o masiva.

El scope no se decide por el nombre visual de un campo. Se decide por identidad semántica del hecho.

#### 4. Handoff recibido de `UX-QA-008`

`UX-QA-008` entrega:

- proceso y caso conservados al cambiar de aplicación;
- tarea, recurso, versión, retorno y acción pendiente conocidos;
- propietaria de la mutación identificada;
- referencias cross-app revalidadas;
- ausencia de autoridad transportada;
- lugares donde una reconstrucción manual del contexto indica posible duplicación.

`UX-QA-009` consume esas decisiones sin reabrir la semántica del handoff.

#### 5. Frontera con `UX-QA-008`

`UX-QA-008` responde:

```text
¿EL PROCESO CONTINÚA CORRECTAMENTE ENTRE APLICACIONES?
```

`UX-QA-009` responde:

```text
¿EL MISMO HECHO EMPRESARIAL EVITA SER CAPTURADO O PRODUCIDO DOS VECES?
```

Un handoff puede conservar correctamente el proceso y aun así obligar a una transcripción duplicada. Ese segundo problema pertenece a `UX-QA-009`.

#### 6. Frontera con `UX-QA-010`

`UX-QA-009` certifica ausencia de doble registro y reutilización semánticamente correcta.

`UX-QA-010` conserva exclusivamente:

- trazabilidad de cambios;
- antes y después;
- actor del cambio;
- motivo;
- versión;
- supersesión;
- reconstrucción histórica.

`UX-QA-009` puede exigir que una reutilización tenga linaje suficiente para demostrar que no es una copia competidora, pero no redefine el contrato de auditoría de cambios de `UX-QA-010`.

#### 7. Regla principal

Regla canónica:

```text
UN HECHO EMPRESARIAL
→ UNA FUENTE AUTORITATIVA
→ UNA CAPTURA O PRODUCCIÓN ORIGINAL
→ REUTILIZACIONES TRAZABLES
```

Pero:

```text
MISMO TEXTO
O
MISMO NÚMERO
≠
MISMO HECHO EMPRESARIAL
```

#### 8. Qué constituye el mismo hecho empresarial

La equivalencia exige demostrar, como mínimo:

```text
DEFINICIÓN
+
SUJETO
+
UNIDAD
+
MOMENTO
+
ALCANCE
+
FINALIDAD
+
RESPONSABLE
+
MÉTODO DE OBTENCIÓN
```

Dos campos con la etiqueta `cantidad`, `fecha`, `responsable`, `sede`, `estado` u `observación` no son equivalentes por compartir nombre.

#### 9. Qué no constituye el mismo hecho

Ejemplos obligatorios de hechos distintos aunque compartan valor:

```text
CANTIDAD SOLICITADA
≠ CANTIDAD PRODUCIDA
≠ CANTIDAD PREPARADA
≠ CANTIDAD CARGADA
≠ CANTIDAD RECIBIDA
```

```text
FECHA SOLICITADA
≠ FECHA PROMETIDA
≠ FECHA EJECUTADA
≠ FECHA REGISTRADA
```

```text
RESPONSABLE ASIGNADO
≠ ACTOR QUE EJECUTÓ
≠ ACTOR QUE APROBÓ
```

La igualdad del valor no autoriza reutilización como hecho actual.

#### 10. Unidad de certificación de información

Cada caso deberá identificar suficientemente:

- definición del dato;
- sujeto;
- fuente propietaria;
- registro fuente;
- versión;
- momento de producción o captura;
- vigencia;
- propósito;
- clasificación;
- política de reutilización;
- política de corrección;
- package y proceso donde se prueba.

No se exige que estos campos existan literalmente como una tabla runtime para aprobar la tarea documental.

#### 11. Modos canónicos de tratamiento

La prueba deberá reconocer los modos ya aprobados:

```text
DERIVE_AUTOMATICALLY
REUSE_AS_FACT
PREFILL_EDITABLE
DISPLAY_FOR_CONFIRMATION
REFERENCE_ONLY
RECAPTURE_REQUIRED
INDEPENDENT_OBSERVATION
NOT_REUSABLE
```

No existe un modo válido `COPY_PREVIOUS_VALUE`.

#### 12. Oracle de selección del modo

Antes de considerar correcto un campo o dato del flujo se deberá demostrar:

```text
1. IDENTIFICAR EL HECHO REQUERIDO
2. LOCALIZAR SU FUENTE O CANDIDATOS
3. COMPARAR SEMÁNTICA, SUJETO, PROPÓSITO Y ALCANCE
4. VALIDAR VERSIÓN, VIGENCIA, CLASIFICACIÓN Y DERECHO DE USO
5. DETERMINAR SI ES HECHO, REFERENCIA O NUEVA OBSERVACIÓN
6. ELEGIR EL MODO DE TRATAMIENTO
7. MOSTRAR ORIGEN Y FRESCURA CUANDO SEA MATERIAL
8. REGISTRAR LA ACCIÓN LEGÍTIMA SIN CREAR UNA SEGUNDA FUENTE
```

Si la equivalencia no puede demostrarse, la reutilización como hecho actual no es válida.

#### 13. Fuente autoritativa

Un hecho reutilizado deberá conservar una fuente propietaria identificable.

Ejemplos contractuales:

- identidad laboral desde identidad laboral canónica;
- sede, área, turno y rol desde contexto de acceso resuelto;
- proveedor y orden aprobada desde ORIGO;
- remisión y custodia logística desde NEXO;
- receta y lote productivo desde FOGO;
- venta, pedido y pago desde PULSO;
- decisión laboral desde su dominio propietario;
- hechos económicos en NUMERA consumiendo hechos de origen.

Una copia visible no se convierte en nueva fuente de verdad.

#### 14. Proyecciones, cachés y réplicas

Una proyección, caché o réplica podrá servir para lectura cuando conserve:

- fuente;
- versión;
- frescura;
- reconciliación;
- límites de escritura.

```text
COPIA SIN LINAJE
≠
FUENTE AUTORITATIVA
```

La prueba deberá fallar si una pantalla corrige una copia local como sustituto de corregir o notificar a la fuente propietaria.

#### 15. Herencia entre pasos

La salida aprobada de un paso deberá convertirse en entrada referenciada del siguiente cuando represente el mismo hecho.

```text
PASO A PRODUCE
→ REGISTRO AUTORITATIVO
→ EVENTO O CONTRATO
→ PASO B CONSUME
```

El actor B no deberá copiar manualmente identificadores, datos estructurados, evidencia o contexto ya resuelto.

#### 16. Continuidad cross-app consumida de `UX-QA-008`

Cuando el siguiente paso viva en otra aplicación:

- la referencia al caso se conserva;
- la propietaria del dato permanece identificada;
- la receptora revalida autoridad y estado;
- el dato estructurado se consume por contrato, referencia, evento, proyección, API o RPC protegido;
- no se usa copy-paste como integración;
- no se crea un maestro paralelo por aplicación.

La continuidad no convierte a la consumidora en propietaria del dato.

#### 17. Contexto de actor y estación

La interfaz no deberá pedir manualmente hechos ya resueltos por contratos autoritativos, incluyendo cuando aplique:

- nombre del trabajador;
- identificador del trabajador;
- rol operativo;
- sede activa;
- área activa;
- turno;
- check-in;
- estación o dispositivo;
- hora del servidor.

Seleccionar un destino, tercero, lote o recurso sí puede ser una decisión empresarial nueva y no constituye duplicación por sí sola.

#### 18. Valores de referencia frente a observaciones actuales

Cuando el paso necesita una observación nueva, el valor previo deberá permanecer como referencia y no convertirse automáticamente en el valor actual.

Ejemplo:

```text
ORDENADO: 24
RECIBIDO FÍSICAMENTE: [captura actual]
```

La prueba falla si `24` se precarga como recibido y aparece confirmado sin observación real.

#### 19. Observaciones físicas y hechos de ejecución

Recapturar es obligatorio cuando el flujo necesita una realidad nueva que puede diferir de lo planificado o anterior.

Casos:

- cantidad física recibida;
- cantidad producida;
- temperatura observada;
- peso real;
- estado físico de un empaque;
- ubicación física confirmada;
- custodia aceptada;
- pago efectivamente recibido;
- asistencia o presencia;
- activo devuelto;
- inspección de calidad.

El sistema puede reutilizar contexto y expectativa, pero no inventar la observación.

#### 20. Verificación independiente

Una segunda captura es válida cuando su propósito es obtener evidencia independiente.

Casos:

- conteo ciego;
- doble control de caja;
- verificación del receptor;
- inspección independiente de calidad;
- aprobación segregada;
- confirmación de custodia por actor entrante;
- segunda lectura crítica.

La prueba exigirá que:

1. el valor previo pueda ocultarse cuando exista riesgo de sesgo;
2. la nueva observación tenga actor, momento y método propios;
3. la segunda captura no sobrescriba automáticamente la primera;
4. la comparación sea posterior;
5. la interfaz explique por qué se solicita otra vez.

#### 21. Confirmación y atestación

Confirmar no significa reescribir.

Una confirmación correcta conserva:

```text
HECHO MOSTRADO
+
EFECTO EXPLICADO
+
ACCIÓN EXPLÍCITA
+
IDENTIDAD
+
TIMESTAMP
```

La prueba falla si confirmar exige volver a escribir nombre, documento, monto o frase completa sin necesidad material.

#### 22. Precarga editable

`PREFILL_EDITABLE` será correcto cuando:

- exista una fuente razonablemente vigente;
- la persona pueda corregirla;
- la corrección pertenezca al flujo;
- no se reescriba el histórico;
- el origen sea identificable.

La evidencia deberá distinguir si la corrección afecta solo el caso, solicita actualizar el maestro, crea versión o exige revisión.

#### 23. Corrección del dato

Cuando un dato conocido sea incorrecto, la experiencia deberá distinguir entre:

```text
CORREGIR EL DATO MAESTRO
CORREGIR SOLO ESTE CASO
CREAR UNA VERSIÓN NUEVA
REGISTRAR UNA EXCEPCIÓN
SOLICITAR REVISIÓN A LA FUENTE
```

Editar una copia local de otro dominio para evitar el handoff es fallo crítico.

#### 24. Snapshots históricos

Un maestro vigente y el snapshot utilizado en una transacción cerrada son objetos semánticamente distintos.

Ejemplo:

```text
DIRECCIÓN ACTUAL DEL CLIENTE
≠
DIRECCIÓN UTILIZADA EN UNA ENTREGA YA CERRADA
```

Actualizar el maestro no autoriza reescribir el histórico.

#### 25. Documentos, archivos y evidencia

El mismo archivo no deberá cargarse nuevamente por cada etapa o aplicación cuando puede reutilizarse de manera autorizada.

La reutilización deberá distinguir:

- identidad del documento;
- versión;
- objeto de archivo;
- clasificación;
- propósito;
- vigencia;
- derecho de acceso.

Modos admisibles:

```text
REFERENCE
COPY_WITH_LINEAGE
DERIVED_FACT_ONLY
NO_TRANSFER
```

#### 26. Nueva carga legítima de documento

Una nueva carga puede ser correcta cuando:

- el documento venció;
- cambió materialmente;
- se requiere una firma distinta;
- la integridad o calidad no es suficiente;
- la finalidad no permite reutilización;
- existe reemplazo explícito.

La prueba no confundirá una versión legítimamente nueva con duplicación documental.

#### 27. Integración entre aplicaciones

La información ajena se transportará mediante contratos gobernados, no mediante trabajo humano redundante.

Válidos:

- contratos versionados;
- referencias;
- eventos empresariales;
- proyecciones controladas;
- APIs o RPC protegidos;
- receipts;
- idempotency keys;
- conciliación.

Inválidos como flujo ordinario:

- copy-paste;
- texto libre usado como transporte de datos estructurados;
- archivo intermedio no gobernado;
- lectura directa no autorizada de tablas ajenas;
- maestro paralelo;
- parámetro de URL tratado como verdad.

#### 28. NEXO

En un caso de remisión, la prueba deberá diferenciar información reutilizable de observación nueva.

Ejemplo:

| Etapa | Reutiliza | Captura nueva |
| --- | --- | --- |
| solicitud | solicitante, sede, catálogo, unidad, políticas | cantidad solicitada y necesidad |
| preparación | líneas solicitadas, producto, destino | lote, ubicación, cantidad preparada, faltantes |
| carga | remisión preparada, vehículo y conductor autorizados | cantidad cargada y aceptación de custodia |
| recepción | origen, destino, líneas, lote y trazabilidad | cantidad recibida, diferencias y estado físico |
| cierre | evidencias previas | decisión de diferencia cuando corresponda |

El receptor no debe reescribir número de remisión, productos, origen o conductor.

#### 29. ORIGO

Una recepción podrá reutilizar de la orden aprobada:

- proveedor;
- destino;
- productos;
- presentaciones;
- cantidades ordenadas;
- términos vigentes.

La recepción seguirá capturando hechos propios como cantidad recibida, calidad, diferencia, documento real o aceptación cuando corresponda.

#### 30. FOGO

La orden o plan puede aportar receta, versión, producto, cantidad planificada, insumos esperados, área, prioridad y destino.

El flujo deberá capturar como hechos nuevos cuando aplique:

- lote real;
- consumo real;
- rendimiento real;
- merma;
- controles observados;
- liberación o bloqueo.

La receta no se duplicará como texto editable sin versión y linaje.

#### 31. PULSO

Pedido, mesa, cliente, total, canal y estado ya confirmados no deberán reconstruirse manualmente para una etapa posterior.

Una nueva captura seguirá siendo necesaria cuando representa:

- método de pago actual;
- propina cuando aplique;
- aceptación o entrega;
- evidencia del cobro;
- resultado actual de una interacción.

Un timeout no autoriza repetir el cobro o recrear el pedido sin consultar el resultado anterior.

#### 32. NUMERA

NUMERA consumirá hechos económicos procedentes de sus fuentes operativas.

```text
IMPORTAR, CLASIFICAR Y CONCILIAR
≠
VOLVER A DIGITAR LA OPERACIÓN
```

Una intervención contable puede clasificar, conciliar, distribuir, aprobar o ajustar mediante el mecanismo propietario. No puede crear una copia manual del hecho de origen como sustituto del contrato.

#### 33. TALENTO, VISO y ANIMA

Los datos ya verificados entre persona, candidatura, oferta, pre-registro, empleado y episodio laboral se reutilizarán según finalidad y permiso.

No se pedirá identidad, contacto o documento válido nuevamente solo porque cambió de aplicación.

Sí permanecen como hechos nuevos cuando corresponda:

- aceptación de oferta;
- atestación actual;
- observación ocupacional actual;
- actualización explícita de un dato vigente;
- decisión propia del nuevo proceso.

#### 34. PASS y datos del cliente

La prueba distinguirá:

- perfil vigente;
- dirección de una entrega concreta;
- datos fiscales de una factura;
- preferencia de comunicación;
- consentimiento por finalidad;
- snapshot histórico de una transacción.

El perfil podrá precargarse cuando sea válido para la finalidad, pero no reemplaza snapshots ni consentimientos nuevos.

#### 35. Dispositivos compartidos

En una estación compartida puede reutilizarse contexto propio de estación y tarea.

No se reutilizará del actor anterior:

- identidad;
- datos personales;
- búsqueda;
- favoritos;
- PIN;
- firma;
- selecciones personales;
- borradores privados.

```text
REUTILIZAR CONTEXTO DE ESTACIÓN
≠
REUTILIZAR IDENTIDAD DEL ACTOR ANTERIOR
```

#### 36. Offline, retries e idempotencia

Cada captura offline aplicable deberá conservar identidad suficiente para no recrearse al sincronizar.

Se espera, según el contrato del package:

- identificador local estable;
- actor y contexto de origen;
- recurso y versión;
- clave idempotente;
- estado de sincronización;
- campos producidos;
- referencias reutilizadas;
- conflicto o receipt.

Al reconectar:

```text
CONSULTAR ESTADO
→ REVALIDAR
→ SINCRONIZAR UNA VEZ
→ CONCILIAR
```

#### 37. Resultado desconocido

Un timeout o pérdida de respuesta no demuestra que la operación no ocurrió.

La experiencia deberá consultar o recuperar el resultado antes de invitar a recrear:

- movimiento;
- recepción;
- pago;
- pedido;
- documento;
- evento;
- registro equivalente.

Un segundo efecto por reintento no es solamente una falla UX; bloquea la certificación del caso.

#### 38. Escaneo y captura automática

Cuando un código o periférico aporta información confiable, la prueba deberá demostrar que sustituye transcripción manual sin ocultar el resultado.

Ejemplos:

- LOC;
- LPN;
- código de producto;
- orden existente;
- factura estructurada;
- peso desde báscula;
- fecha y hora del servidor.

Captura automática no significa verdad incuestionable: el resultado debe poder validarse, corregirse o rechazarse cuando corresponda.

#### 39. Importaciones

Una importación no podrá convertirse en un mecanismo de duplicación masiva.

La prueba de imports aplicables deberá observar:

- staging separado;
- versión del formato;
- mapeo;
- validación;
- detección de duplicados;
- comparación con fuente existente;
- simulación;
- resultado por fila;
- rechazo o conciliación antes de afectar la fuente de verdad.

#### 40. Operaciones repetitivas y masivas

Un valor común podrá capturarse una vez cuando:

- el alcance sea visible;
- los elementos sean compatibles;
- las excepciones puedan editarse;
- exista resumen previo;
- no se aplique silenciosamente a elementos incompatibles.

La optimización no debe obligar a repetir línea por línea un mismo hecho común.

#### 41. Cambio entre modo guiado y experto

Cambiar de superficie deberá conservar, cuando sea compatible:

- objeto;
- población;
- versión;
- alcance;
- borrador;
- diferencias;
- validaciones;
- simulación.

No deberá:

- crear una segunda escritura;
- crear un segundo receipt;
- transportar autoridad implícita;
- perder el registro ya confirmado;
- obligar a volver a capturar el mismo hecho.

#### 42. Filtros y vistas guardadas

Los filtros y vistas guardadas son configuración de consulta, no una segunda copia empresarial del dato.

La prueba deberá evitar que:

- un filtro oculto haga parecer que falta información y provoque recreación manual;
- una vista guardada incompatible conserve un universo obsoleto;
- un filtro se interprete como fuente autoritativa;
- la ausencia visual de una fila se trate como inexistencia del registro sin comprobar la fuente.

#### 43. Predeterminados e inferencias

Un default solo será válido si:

- procede de una regla aprobada;
- es visible;
- no simula observación física;
- puede cambiarse cuando corresponde;
- no amplía autoridad.

Queda prohibido usar como hechos actuales por conveniencia:

- última sede;
- cantidad planificada como recibida;
- aceptación marcada;
- fecha actual como fecha real de un hecho pasado;
- responsable del último caso.

#### 44. Privacidad, finalidad y minimización

La existencia de un dato no autoriza su reutilización para cualquier finalidad.

La prueba deberá considerar, según aplique:

- finalidad;
- base o autorización;
- clasificación;
- actor consumidor;
- minimización;
- territorio;
- transferencia;
- conservación;
- revocación o restricción vigente.

Si una pantalla no tiene derecho al original, no deberá pedir el mismo dato sensible nuevamente solo para reconstruirlo localmente.

#### 45. Explicación de recaptura

Cuando el modo correcto sea `RECAPTURE_REQUIRED` o `INDEPENDENT_OBSERVATION`, la interfaz deberá explicar por qué pregunta otra vez.

Ejemplos válidos:

```text
Te mostramos la cantidad solicitada como referencia.
Registra la cantidad que recibiste físicamente.
```

```text
Este conteo es independiente.
El valor anterior se oculta para evitar sesgo.
```

```text
El documento anterior venció.
Se requiere una versión vigente.
```

#### 46. Accesibilidad y eficiencia

La prueba deberá comprobar que:

- precargados y vacíos son distinguibles;
- origen y frescura no dependen solo del color;
- confirmar no exige copiar texto;
- datos derivados son legibles;
- errores se asocian a campos corregibles;
- selección o escaneo reducen teclado cuando corresponde;
- autocompletado no mueve el foco de forma impredecible;
- una persona puede entender qué dato está reutilizado y cuál debe producir.

#### 47. Casos positivos mínimos

Todo package aplicable deberá incluir casos positivos representativos de su alcance.

El conjunto deberá cubrir cuando existan en el package:

1. reutilización de un hecho vigente;
2. derivación automática de contexto;
3. confirmación sin reescritura;
4. referencia de valor anterior con observación nueva;
5. handoff entre pasos;
6. handoff cross-app;
7. documento reutilizado por referencia o versión;
8. borrador u operación offline recuperada una sola vez;
9. importación con deduplicación;
10. operación masiva con valor común visible.

#### 48. Casos negativos mínimos

La evidencia deberá intentar y bloquear cuando aplique:

1. copy-paste de un identificador ya disponible;
2. maestro paralelo en aplicación consumidora;
3. precargar un valor planificado como observado;
4. reutilizar dato vencido como vigente;
5. reusar dato personal para finalidad incompatible;
6. reusar información del actor anterior en dispositivo compartido;
7. subir nuevamente el mismo documento sin causa material;
8. crear un segundo registro tras timeout;
9. cambiar guiado/experto y generar doble escritura;
10. importar filas duplicadas sin detección;
11. corregir una copia local en vez de la fuente;
12. mostrar un valor previo durante verificación ciega cuando debe ocultarse.

#### 49. Casos que no demuestran captura única por sí solos

No bastan como certificación:

- que el formulario tenga menos campos;
- que dos pantallas se parezcan;
- que exista autocompletado visual;
- que un campo tenga valor inicial;
- que una API responda 200;
- que una tabla tenga constraint único sin demostrar semántica correcta;
- que el frontend deshabilite el botón;
- que no se observe duplicación en un solo happy path;
- que el usuario recuerde el dato y lo escriba igual;
- que una importación termine sin error;
- que una segunda observación coincida numéricamente con la primera.

#### 50. Oracle de captura única

Un caso es conforme cuando puede responderse afirmativamente:

```text
MISMO_HECHO_IDENTIFICADO
AND FUENTE_AUTORITATIVA_CONOCIDA
AND MODO_DE_TRATAMIENTO_CORRECTO
AND SIN_TRANSCRIPCION_REDUNDANTE
AND SIN_SEGUNDA_FUENTE_COMPETIDORA
AND RECAPTURA_SOLO_SI_ES_NUEVO_HECHO_O_VERIFICACION
AND RESULTADO_REINTENTABLE_NO_DUPLICADO
```

Cuando el package no consume información previa en un determinado paso, la ausencia de reutilización no es automáticamente un fallo.

#### 51. Identidad del caso de prueba

Cada caso deberá conservar, según aplique:

- `package_id`;
- `case_id`;
- proceso y paso;
- pantalla o superficie;
- actor y contexto;
- definición del hecho;
- fuente propietaria;
- versión de fuente;
- modo esperado;
- valor de referencia cuando corresponda;
- valor observado o producido cuando corresponda;
- resultado;
- receipt o correlación cuando corresponda;
- evidencia de no duplicación;
- hallazgos.

#### 52. Unidad de certificación por package

La identidad física futura es:

```text
UX-QA-009::<package_id>
```

Cada package aplicable deberá demostrar su propio universo de hechos reutilizados y recapturados.

Un PASS en un package no certifica automáticamente otro package.

#### 53. Cobertura mínima por package

La ejecución posterior deberá inventariar al menos:

- puntos de captura manual;
- valores derivados;
- valores precargados;
- confirmaciones;
- observaciones nuevas;
- verificaciones independientes;
- documentos;
- imports;
- handoffs;
- retries u offline cuando existan;
- fuentes propietarias involucradas.

Todo punto manual deberá quedar clasificado como necesario o duplicado.

#### 54. Certificación global final

La identidad global futura es:

```text
UX-QA-009::GLOBAL-FINAL
```

La certificación global final requiere:

- todos los packages aplicables evaluados;
- ausencia de fallos críticos abiertos;
- cobertura cross-app representativa;
- ausencia de maestros paralelos no justificados;
- ausencia de recapturas ordinarias sin razón;
- ausencia de doble efecto conocido por retry en los casos cubiertos;
- recapturas legítimas preservadas;
- hallazgos diferidos con propietario y condición exacta de salida.

#### 55. Invalidación de evidencia

La evidencia queda inválida si:

- cambia la semántica del dato;
- cambia la fuente propietaria;
- cambia el contrato de handoff;
- cambia el modo de tratamiento;
- cambia la política de privacidad o finalidad material;
- cambia la importación o deduplicación relevante;
- cambia el modelo offline o idempotente relevante;
- cambia el dispositivo o actor de forma que afecte persistencia de contexto;
- el caso usó datos precargados que no representan la versión vigente;
- la evidencia fue producida antes de la versión E5 que se pretende certificar.

#### 56. Métricas de soporte

Métricas permitidas por package cuando exista instrumentación:

- campos manuales por tarea;
- porcentaje de hechos derivados o reutilizados;
- recapturas justificadas;
- recapturas no justificadas;
- copy-paste detectado o pasos manuales equivalentes;
- correcciones de precarga;
- divergencias entre copias;
- duplicados documentales;
- filas importadas duplicadas o rechazadas;
- retries con resultado recuperado;
- efectos duplicados detectados;
- errores de transcripción;
- abandonos atribuibles a recaptura;
- uso de contingencia manual.

No existe un umbral global arbitrario que permita compensar un fallo crítico con un promedio favorable.

#### 57. Guardrail laboral

Las métricas no se utilizarán aisladamente para sancionar a una persona por:

- corregir un dato precargado;
- registrar una diferencia física real;
- ejecutar una recaptura requerida;
- realizar una verificación independiente;
- detener una secuencia por inconsistencia;
- rechazar información que no puede confirmar.

El objeto de la certificación es el sistema y el flujo, no la velocidad individual.

#### 58. Fallos críticos

Bloquean el caso, según aplique:

- maestro paralelo para el mismo hecho sin contrato;
- copy-paste obligatorio entre aplicaciones para datos estructurados ya disponibles;
- valor planificado usado como observación real;
- segundo pago, movimiento, recepción o efecto equivalente por retry;
- reutilización de actor o dato personal anterior en dispositivo compartido;
- dato sensible reutilizado para finalidad incompatible;
- segunda fuente competidora que puede divergir;
- importación que crea duplicados sin control;
- corrección local que deja la fuente autoritativa sin reconciliar;
- verificación ciega contaminada por exposición del valor anterior cuando esa independencia es requisito.

#### 59. Hallazgos no críticos

Un hallazgo podrá diferirse únicamente si:

- no genera segunda fuente;
- no crea efecto duplicado;
- no transforma un hecho distinto en reutilizado;
- no expone información indebida;
- no contamina verificación independiente;
- tiene propietario canónico;
- tiene condición exacta de salida;
- su impacto está documentado en el package.

No existe la categoría narrativa `mejorar después` sin dueño.

#### 60. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea define cómo certificar conductas ya cubiertas por requisitos existentes y no introduce una obligación verificable nueva que exija actualizar el registro.

#### 61. Cobertura de prueba vigente reutilizada

La certificación reutiliza, sin modificar, la cobertura ya aprobada de captura única, fuente, semántica, documentos, cross-app, offline, imports y cambio de superficie.

Cobertura principal:

- `TREQ-UX-005`;
- `TREQ-UX-118` a `TREQ-UX-138`;
- `TREQ-UX-197`;
- `TREQ-UX-375`;
- `TREQ-UX-394`;
- `TREQ-UX-401`;
- `TREQ-INTEGRATION-003`;
- `TREQ-INTEGRATION-005`;
- `TREQ-INTEGRATION-006`.

Esta lista es trazabilidad reutilizada; no representa requisitos creados o modificados por `UX-QA-009`.

#### 62. Evidencia de validación

| Clase | Estado | Evidencia documental disponible en esta aprobación |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecuta build físico ni de producto para aprobar el contrato documental. |
| LOCAL | NOT_EXECUTED | La incorporación y los validadores reales del checkout corresponden a la batería posterior. |
| REMOTA | PASS | Se revisaron las fuentes canónicas remotas vigentes, la continuidad, la topología, `UX-BASE-007`, 04A UX, contratos de integración y la base aprobada `UX-QA-008`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recorridos operativos reales durante la aprobación documental. |
| FÍSICA | NOT_EXECUTED | Las instancias por package y `GLOBAL-FINAL` permanecen sujetas a `POST_E5_PACKAGE`. |

#### 63. Evidencia mínima posterior por caso

La ejecución física posterior deberá conservar suficiente evidencia para demostrar:

- hecho requerido;
- fuente esperada;
- modo esperado;
- versión y frescura;
- acción presentada al actor;
- campos reutilizados o derivados;
- campos realmente nuevos;
- razón de recaptura cuando existe;
- ausencia de segundo registro o efecto;
- resultado del retry cuando aplica;
- evidencia de deduplicación en import cuando aplica;
- evidencia de limpieza entre actores cuando aplica;
- resultado final.

La evidencia puede ser automática, operativa o física según el package, pero deberá ser reproducible.

#### 64. Seguridad y privacidad de la evidencia

La evidencia no deberá exponer:

- PIN;
- tokens;
- secretos;
- documentos completos si no son necesarios;
- datos personales ajenos al caso;
- contenido clínico o sensible cuando basta un hecho derivado;
- payloads no minimizados.

Las capturas deberán redactar o pseudonimizar información sensible cuando sea compatible con el objetivo probatorio.

#### 65. Responsabilidad de un fallo

Un fallo deberá asignarse a la familia propietaria real, por ejemplo:

- pantalla o formulario;
- integración cross-app;
- contrato de datos;
- autorización;
- fuente maestra;
- importación;
- offline o idempotencia;
- dispositivo compartido;
- evidencia o documento;
- package E5 propietario.

`UX-QA-009` no inventará una tarea administrativa nueva si ya existe un propietario canónico.

#### 66. Casos fuera de alcance

No pertenecen por sí solos a esta certificación:

- rediseñar el esquema de datos;
- implementar deduplicación física nueva;
- crear constraints;
- crear idempotency keys;
- crear tablas o RPC;
- fusionar maestros;
- corregir duplicados históricos;
- modificar eventos;
- desplegar integraciones;
- cambiar permisos;
- cambiar política de retención;
- diseñar auditoría de cambios;
- certificar continuidad de red;
- certificar rendimiento global.

Las brechas encontradas se remiten al propietario existente.

#### 67. Criterio de aceptación por package

Un package puede declararse conforme únicamente cuando:

- sus hechos reutilizables tienen fuente y modo correctos;
- no obliga a transcripción redundante de hechos ya disponibles;
- no mantiene fuentes competidoras del mismo hecho;
- conserva hechos distintos aunque compartan valor;
- las recapturas legítimas están justificadas y explicadas;
- las verificaciones independientes permanecen independientes;
- los documentos se reutilizan o versionan correctamente;
- los handoffs no dependen de copy-paste;
- offline, retry e import no crean duplicados en los casos aplicables;
- cambio de actor o superficie no recrea ni reasigna información indebidamente;
- los fallos críticos están cerrados;
- la evidencia es reproducible y minimizada.

#### 68. Criterios de aceptación

- [ ] Se certifica por hecho empresarial y no por etiqueta visual del campo.
- [ ] Cada hecho reutilizado conserva fuente propietaria identificable.
- [ ] Se distinguen `DERIVE_AUTOMATICALLY`, `REUSE_AS_FACT`, `PREFILL_EDITABLE`, `DISPLAY_FOR_CONFIRMATION`, `REFERENCE_ONLY`, `RECAPTURE_REQUIRED`, `INDEPENDENT_OBSERVATION` y `NOT_REUSABLE`.
- [ ] No existe reutilización implícita tipo copiar el valor anterior.
- [ ] Los contextos autoritativos no se vuelven campos manuales.
- [ ] Los pasos posteriores consumen referencias en lugar de transcribir salidas previas.
- [ ] Los handoffs cross-app consumen contratos y no copy-paste.
- [ ] Una aplicación consumidora no crea un maestro paralelo.
- [ ] Los valores planificados no se convierten en observaciones reales.
- [ ] Las verificaciones independientes no se eliminan como supuesta duplicación.
- [ ] Confirmar no exige reescribir el dato.
- [ ] Las correcciones distinguen maestro, caso, versión, excepción y revisión de fuente.
- [ ] Los snapshots históricos no se reescriben al cambiar un maestro.
- [ ] Los documentos no se cargan repetidamente sin razón material.
- [ ] Una nueva versión documental legítima no se clasifica como duplicado.
- [ ] Los dispositivos compartidos no heredan información del actor anterior.
- [ ] Los retries y reconexiones consultan resultado antes de recrear efectos.
- [ ] Las importaciones aplicables prueban detección de duplicados antes de afectar la fuente.
- [ ] Las operaciones masivas capturan una vez los valores comunes compatibles.
- [ ] Cambiar entre modo guiado y experto no genera una segunda escritura o receipt.
- [ ] Los defaults no simulan observaciones ni autoridad.
- [ ] La reutilización de información sensible valida finalidad y minimización.
- [ ] Toda recaptura necesaria explica su razón.
- [ ] Existe evidencia positiva y negativa por package aplicable.
- [ ] Los fallos críticos tienen propietario y bloquean el caso.
- [ ] Existe criterio `UX-QA-009::GLOBAL-FINAL`.
- [ ] La sección `Requisitos de prueba derivados` declara cero cambios y no contiene identificadores de requisitos.
- [ ] La cobertura heredada está separada de la sección de cero cambios.
- [ ] No se ejecutó implementación física durante esta aprobación documental.
- [ ] `UX-QA-010` conserva íntegramente la certificación de trazabilidad de cambios.

#### 69. Límites

Esta tarea no:

- modifica `UX-BASE-007`;
- modifica `UX-QA-008`;
- modifica `INT-APP-*`;
- modifica `PROC-SCREEN-*`;
- crea fuentes maestras;
- fusiona fuentes;
- corrige duplicados históricos;
- crea o modifica tablas;
- crea constraints;
- crea schemas de deduplicación;
- crea idempotency keys;
- cambia retries;
- cambia colas;
- crea imports;
- modifica Server Actions, APIs o RPC;
- cambia permisos;
- cambia sesiones;
- cambia RLS;
- modifica Supabase;
- modifica documentos o archivos reales;
- cambia formularios o componentes;
- ejecuta pruebas E2E;
- ejecuta pruebas operativas;
- ejecuta pruebas físicas;
- certifica packages sin evidencia posterior a E5;
- modifica el Registro 04A;
- crea una instancia física durante esta aprobación documental.

#### 70. Handoff a `UX-QA-010`

`UX-QA-009` entrega a `UX-QA-010`:

- fuentes autoritativas identificadas;
- diferencias entre hecho original, reutilización, observación nueva y corrección;
- puntos donde una corrección cambia maestro, caso o versión;
- receipts y resultados únicos cuando aplican;
- ausencia de maestros paralelos como condición previa;
- snapshots históricos preservados;
- lugares donde un cambio necesita demostrar actor, antes, después, motivo y versión.

`UX-QA-010` podrá certificar trazabilidad de cambios sin reabrir la decisión de captura única.

#### 71. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-008 — El proceso continúa correctamente entre aplicaciones`

**TAREA ACTUAL APROBADA**
`UX-QA-009 — No se registra dos veces la misma información`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-010 — Los cambios conservan trazabilidad`
### ✅ UX-QA-010 — Los cambios conservan trazabilidad

**Estado:** APROBADA
**Tarea anterior:** UX-QA-009 — No se registra dos veces la misma información
**Tarea siguiente:** UX-QA-011 — Las tareas críticas soportan conectividad inestable
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por package y globalmente que todo cambio material conserva historia reconstruible, actor y contexto, estado anterior y posterior cuando aplica, motivo, autoridad, versiones, tiempos, correlación, causalidad, evidencia y resultado sin reescritura destructiva ni exposición indebida
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de trazabilidad de cambios definido; las ejecuciones por package y la certificación global final permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff de `UX-QA-009`, `NFR-REQ-006`, contratos de autorización, integración y auditoría y cobertura de prueba vigente, pero no afirma que un package desplegado conserve ya toda la evidencia requerida
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican componentes, flujos, eventos runtime, esquemas, tablas, triggers, logs, auditoría física, políticas de retención, permisos, datos, Supabase, integraciones, despliegues ni repositorios consumidores
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS demostrará que un cambio material puede reconstruirse después sin depender de memoria humana, texto libre, estado actual aislado ni logs técnicos volátiles.

La certificación deberá responder, para cada package aplicable:

```text
¿QUÉ CAMBIÓ?
¿SOBRE QUÉ RECURSO Y PROCESO?
¿QUIÉN O QUÉ PRODUJO EL CAMBIO?
¿CON QUÉ CONTEXTO Y AUTORIDAD?
¿CUÁL ERA EL ESTADO ANTERIOR CUANDO CORRESPONDE?
¿CUÁL QUEDÓ COMO ESTADO NUEVO?
¿POR QUÉ SE CAMBIÓ?
¿QUÉ VERSIÓN, POLÍTICA O REGLA ESTABA VIGENTE?
¿CUÁNDO OCURRIÓ, SE REGISTRÓ, SE RECIBIÓ Y SE CONFIRMÓ?
¿QUÉ COMANDO, EVENTO, RETRY, HANDOFF O EVIDENCIA LO CAUSÓ?
¿EL HISTORIAL ANTERIOR SIGUE RECONSTRUIBLE?
```

La tarea certifica trazabilidad empresarial de cambios. No convierte toda actividad técnica en evento empresarial ni exige exponer el historial completo a cualquier actor.

#### 2. Resultado canónico

`UX-QA-010` establece `UX-QA-CHANGE-TRACEABILITY-CERTIFICATION-001@1.0.0`.

El resultado define:

- unidad certificable de cambio por package;
- evidencia mínima de atribución, temporalidad y causalidad;
- relación entre estado vigente e historia;
- tratamiento de corrección, reverso, cancelación, anulación y reapertura;
- trazabilidad de acciones humanas, automáticas, administrativas e integradas;
- regla de comparación entre vista previa y receipt final;
- pruebas positivas, negativas y de frontera;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`;
- identidad de ejecución por package y certificación global final;
- criterios de invalidez de evidencia;
- handoff exacto a `UX-QA-011`.

#### 3. Alcance exacto

La certificación aplica cuando el package produce o presenta cambios materiales en:

- estado de proceso;
- datos maestros;
- datos de caso;
- asignaciones;
- permisos o alcance;
- configuración;
- inventario, custodia o ubicación;
- cantidades o resultados de ejecución;
- documentos y versiones;
- aprobaciones, rechazos o excepciones;
- pagos, conciliaciones o ajustes;
- publicaciones;
- archivos, evidencia o metadatos relevantes;
- decisiones automáticas;
- importaciones y operaciones masivas;
- correcciones, reversos, cancelaciones, anulaciones y reaperturas;
- handoffs que terminan en un efecto material;
- acciones offline conciliadas posteriormente.

No todo clic, lectura, hover o navegación constituye un cambio material. Las lecturas sensibles o privilegiadas podrán requerir auditoría por contratos propios aunque no alteren el recurso.

#### 4. Handoff recibido de `UX-QA-009`

`UX-QA-009` entrega como hechos de entrada:

- fuente autoritativa identificada;
- diferenciación entre hecho original, reutilización, observación nueva y corrección;
- ausencia de maestro paralelo como condición deseable;
- snapshots históricos preservables;
- receipts únicos cuando aplican;
- operaciones idempotentes cuando aplican;
- lugares donde una corrección cambia maestro, caso o versión;
- puntos donde un actor necesita comprender qué se corrigió y por qué.

`UX-QA-010` usa esas decisiones para demostrar historia reconstruible. No vuelve a decidir si el dato debía capturarse una vez.

#### 5. Frontera con `UX-QA-009`

`UX-QA-009` responde:

```text
¿SE CAPTURA O PRODUCE EL MISMO HECHO UNA SOLA VEZ?
```

`UX-QA-010` responde:

```text
¿LOS CAMBIOS POSTERIORES SOBRE ESE HECHO CONSERVAN HISTORIA Y CAUSA?
```

Un package puede evitar doble digitación y aun así fallar `UX-QA-010` si sobrescribe silenciosamente valores, pierde al actor, no conserva versión o no puede relacionar corrección con el hecho anterior.

#### 6. Frontera con `UX-QA-011`

`UX-QA-011` certificará que tareas críticas soportan conectividad inestable.

`UX-QA-010` solo exige que, cuando existan acciones offline, reintentos o conciliaciones, sus cambios conserven trazabilidad suficiente. No certifica disponibilidad, degradación, duración offline, capacidad de cola ni continuidad operativa bajo red inestable.

#### 7. Regla principal

Regla canónica:

```text
ESTADO VIGENTE
+
HISTORIA NO DESTRUCTIVA
+
ATRIBUCIÓN
+
CAUSA
+
TIEMPO
+
VERSIÓN
+
RESULTADO
=
CAMBIO TRAZABLE
```

Pero:

```text
ESTADO ACTUAL
!= HISTORIAL SUFICIENTE
```

Y:

```text
LOG TÉCNICO
!= AUDITORÍA EMPRESARIAL
```

#### 8. Unidad certificable de cambio

La unidad mínima de evaluación será un cambio con significado empresarial identificable por:

```text
process_id
process_version
process_instance_id
resource_type
resource_id
resource_version
action
outcome
```

Cuando alguno no aplique deberá existir una razón tipada o un contrato alternativo explícito. No se inventarán identificadores para completar la evidencia.

#### 9. Identidad del recurso

El caso deberá demostrar que el cambio pertenece al recurso correcto.

La certificación falla si:

- el historial mezcla dos recursos con identificadores reutilizados;
- la corrección crea un segundo recurso sin relación explícita;
- un identificador externo sustituye al identificador canónico;
- un cambio de aplicación rompe la identidad;
- una importación no puede relacionar fila, entidad y resultado;
- un merge o consolidación pierde las identidades originales.

#### 10. Estado vigente frente a historia

La interfaz y el dominio deberán poder distinguir:

```text
ESTADO VIGENTE AUTORITATIVO
HISTORIAL DE EVENTOS
EVIDENCIA DE SOPORTE
RELACIÓN DE CORRECCIÓN O SUSTITUCIÓN
```

Mostrar solo el valor actual no demuestra trazabilidad.

#### 11. Historia no destructiva

Queda prohibido como condición de aceptación:

- sobrescribir un hecho anterior para dejar solo el valor nuevo;
- borrar una aprobación válida porque fue revertida;
- eliminar una transición para simplificar la línea de tiempo;
- cambiar el timestamp original durante conciliación;
- reutilizar un identificador para un hecho diferente;
- convertir una anulación en ausencia histórica del hecho.

Una corrección puede cambiar la verdad vigente sin destruir la verdad histórica.

#### 12. Antes y después

Cuando el tipo de cambio lo permita, la evidencia deberá conservar:

```text
previous_state
new_state
```

La representación podrá ser estructurada, resumida o referenciada según sensibilidad y tamaño.

No será obligatorio duplicar payloads completos para demostrar el cambio.

#### 13. Campos materiales sin modificación

Cuando una vista previa o revisión final sea material para la decisión, la experiencia deberá permitir distinguir:

- campos modificados;
- campos relevantes que permanecen iguales;
- alcance afectado;
- objetos afectados;
- dependencias conocidas;
- vigencia propuesta;
- advertencias aplicables.

La ausencia de un campo en la diferencia no podrá interpretarse automáticamente como confirmación de que se mantuvo igual si el contrato no lo garantiza.

#### 14. Motivo

Cambios sensibles, correctivos, reversibles, destructivos o excepcionales deberán conservar un motivo estructurado cuando el dominio lo exija.

Se distinguirán:

```text
reason_code
reason_detail_ref
```

El detalle no deberá utilizarse como depósito indiscriminado de información sensible.

#### 15. Actor y autoridad

La trazabilidad deberá distinguir, según aplicabilidad:

- sujeto autenticado;
- identidad empresarial;
- actor efectivo;
- rol base;
- rol operativo efectivo;
- actor de servicio;
- actor simulado o delegado;
- dispositivo;
- sesión;
- sede;
- área;
- turno;
- check-in;
- permiso o autoridad relevante.

La última persona que usó un dispositivo no se inferirá como autora del cambio.

#### 16. Acciones de sistema

Cuando un proceso automático produzca un cambio material, la evidencia deberá identificar:

- servicio, job o regla;
- versión de regla o configuración;
- evento o iniciador causal;
- entradas referenciadas;
- resultado;
- límites o umbrales relevantes;
- posibilidad de revisión humana cuando aplique;
- corrección posterior y su relación causal.

Una recomendación no se registrará como decisión final hasta que el proceso autorizado produzca el efecto correspondiente.

#### 17. Correlación y causalidad

La evidencia deberá conservar vínculos suficientes para reconstruir:

```text
COMANDO
→ DECISIÓN
→ EVENTO
→ EFECTO
→ RECEIPT O CONCILIACIÓN
```

Cuando exista distribución entre servicios o aplicaciones se conservarán, según aplique:

- `command_id`;
- `request_id`;
- `correlation_id`;
- `causation_id`;
- `event_id`;
- `idempotency_key`;
- intento;
- resultado.

#### 18. Tiempo

La certificación deberá distinguir cuando aplique:

- momento de ocurrencia;
- momento de registro;
- momento de recepción;
- momento de persistencia autoritativa;
- momento de sincronización;
- vigencia efectiva;
- expiración.

El orden técnico de inserción no sustituye el orden causal.

#### 19. Zona horaria y reloj de dispositivo

La evidencia deberá conservar una interpretación temporal inequívoca.

Un reloj de dispositivo desviado:

- no se corregirá silenciosamente;
- podrá marcarse como no confiable;
- no deberá alterar el momento original sin evidencia;
- no deberá impedir reconstruir recepción y persistencia del servidor.

#### 20. Versión

Todo cambio material deberá conservar las versiones necesarias para interpretarlo históricamente.

Según el caso:

- versión del recurso;
- versión del proceso;
- versión del contrato;
- versión de política;
- versión de configuración;
- versión de documento;
- versión de regla automática;
- versión de formato importado.

Cambiar el sistema después no deberá volver ambiguo el significado del evento histórico.

#### 21. Política vigente

Cuando una política, permiso, configuración o regla determine el cambio, deberá poder identificarse cuál versión aplicó.

No es suficiente almacenar el nombre actual de la política si su contenido cambió posteriormente.

#### 22. Resultado

La trazabilidad deberá distinguir, según aplicabilidad:

```text
SUCCEEDED
REJECTED
DENIED
PARTIAL
FAILED
UNKNOWN
CANCELLED
REVERSED
SUPERSEDED
```

Los nombres concretos podrán variar por dominio, pero un resultado desconocido no podrá presentarse como éxito.

#### 23. Receipt final

Cuando el cambio produzca un receipt o acuse material, este deberá permitir relacionar:

- intención;
- recurso;
- alcance;
- resultado real;
- diferencias frente a la vista previa cuando aplique;
- actor;
- tiempo;
- correlación;
- fallos parciales;
- siguiente acción.

El receipt no sustituye el historial; es una evidencia consumible de su resultado.

#### 24. Vista previa frente a resultado

Para cambios administrativos o masivos de impacto, la certificación deberá poder comparar:

```text
PROPUESTA
→ VALIDACIÓN AUTORITATIVA
→ EJECUCIÓN
→ RESULTADO REAL
```

Si el servidor modifica, rechaza o reduce el alcance, el receipt deberá hacerlo visible.

#### 25. Corrección

Una corrección deberá conservar, según aplicabilidad:

- hecho corregido;
- valor o estado anterior;
- valor o estado nuevo;
- motivo;
- actor y autoridad;
- tiempos;
- evidencia;
- versión de regla;
- efecto sobre dependencias;
- identificador del evento corregido.

La corrección no edita silenciosamente el pasado.

#### 26. Supersesión

Cuando una versión sustituye a otra:

- la anterior permanece identificable;
- la nueva declara su relación;
- se distingue vigencia de existencia histórica;
- consumidores pueden resolver cuál es actual;
- evidencia antigua sigue interpretable.

#### 27. Reverso

Un reverso deberá ser un hecho nuevo relacionado con el hecho original.

```text
HECHO ORIGINAL
→ REVERSO
```

No:

```text
HECHO ORIGINAL
→ DESAPARECE DEL HISTORIAL
```

#### 28. Cancelación y anulación

Cancelación y anulación deberán conservar:

- objeto original;
- estado previo;
- actor;
- motivo;
- tiempo;
- autoridad;
- efecto real;
- documentos o efectos que permanecen válidos;
- relación con procesos posteriores.

#### 29. Reapertura

Reabrir un proceso o expediente deberá crear una nueva transición auditable.

La reapertura no podrá fingir que el cierre anterior nunca ocurrió.

#### 30. Eliminación y retiro lógico

Cuando un dominio permita retiro, archivo, desactivación o eliminación gobernada, la interfaz deberá distinguir la operación real.

Una acción visual de ocultamiento no podrá presentarse como eliminación física si los datos permanecen por obligación o política.

La certificación de disposición física pertenece a sus tareas propietarias; `UX-QA-010` solo exige que el cambio de estado sea trazable.

#### 31. Documentos y evidencia

Reemplazar un documento o evidencia deberá conservar, cuando corresponda:

- versión anterior;
- versión nueva;
- motivo;
- actor;
- tiempo;
- hash o referencia de integridad;
- relación de supersesión;
- finalidad y clasificación relevantes.

La nueva versión no vuelve inexistente la anterior cuando el contrato exige preservación.

#### 32. Cambios de configuración

Cambios de configuración material deberán conservar:

- configuración anterior;
- propuesta;
- configuración resultante;
- objetos afectados;
- dependencia relevante;
- actor;
- autoridad;
- motivo;
- vigencia;
- receipt.

#### 33. Cambios de autorización

Cambios de rol, permiso, alcance, matriz o contexto deberán permitir reconstruir:

- quién solicitó;
- quién autorizó;
- sujeto afectado;
- permiso o alcance anterior;
- nuevo permiso o alcance;
- motivo;
- vigencia;
- evidencia de segregación cuando aplique.

El acceso a esa información seguirá gobernado por autorización y minimización.

#### 34. Cambios de maestros

Una modificación de maestro deberá preservar la diferencia entre:

```text
MAESTRO ACTUAL
SNAPSHOT HISTÓRICO
CASO PARTICULAR
```

Actualizar el maestro no reescribe automáticamente casos cerrados que dependieron de la versión anterior.

#### 35. Cambios de caso

Corregir solo un caso deberá quedar diferenciado de corregir la fuente maestra.

La interfaz no podrá inducir a creer que ambas operaciones tienen el mismo alcance.

#### 36. Inventario y custodia

Cambios en inventario, ubicación, lote o custodia deberán relacionar:

- recurso;
- ubicación o custodio anterior;
- ubicación o custodio nuevo;
- cantidad cuando aplique;
- actor;
- proceso;
- evidencia;
- resultado;
- diferencias y conciliación cuando existan.

#### 37. Producción

Cambios de lote, estado, liberación, bloqueo, rendimiento, consumo o merma deberán conservar su procedencia y no sustituir silenciosamente valores previamente observados.

#### 38. Compras y recepción

Correcciones en orden, recepción, proveedor, presentación, cantidad o diferencia deberán mantener separados:

- pedido;
- hecho recibido;
- diferencia;
- corrección;
- resolución.

No se reescribe la recepción física para forzar coincidencia con la orden.

#### 39. Ventas, pagos y devoluciones

Cambios sobre venta, pago, devolución, caja o conciliación deberán preservar relación entre operación original y ajuste posterior.

Un ajuste contable no reemplaza el evento comercial original.

#### 40. NUMERA y conciliación

Una conciliación deberá declarar:

- fuentes comparadas;
- periodo;
- versión;
- unidad;
- tolerancia;
- regla de equivalencia;
- diferencias;
- responsable;
- decisión;
- evidencia.

La conciliación no podrá modificar datos fuente solo para hacer coincidir totales.

#### 41. TALENTO, VISO y ANIMA

Cambios de estado en candidato, postulación, oferta, empleado o episodio deberán conservar identidad y episodios históricos.

Un reingreso, traslado, promoción, cancelación o corrección deberá distinguirse del evento original y conservar motivo y autoridad.

#### 42. PASS

Cambios en perfil, dirección, consentimiento, preferencia o datos de una transacción deberán distinguir maestro vigente de snapshot utilizado por una operación cerrada.

Cambiar el perfil actual no debe alterar silenciosamente una entrega o factura histórica.

#### 43. Cross-app

Cuando un cambio atraviesa aplicaciones, la cadena deberá conservar:

```text
ORIGEN
→ CONTRATO O EVENTO
→ ENTREGA
→ CONSUMIDOR
→ EFECTO
→ RECEIPT O CONCILIACIÓN
```

La aplicación consumidora no se convierte por ello en propietaria del dato.

#### 44. Eventos e integraciones

La evidencia cross-app deberá permitir reconstruir, según aplique:

- productor;
- consumidor;
- versión de contrato;
- evento;
- correlación;
- causalidad;
- deduplicación;
- transformación;
- error;
- compensación;
- resultado final.

#### 45. Retries

Un retry conservará la identidad lógica de la operación.

Cuando el contrato use idempotencia:

- se reutiliza la misma clave;
- aumenta el intento;
- se conserva el resultado previo cuando exista;
- no aparece un segundo efecto material;
- cada intento puede quedar trazado sin multiplicar el hecho empresarial.

#### 46. Resultado desconocido

Ante resultado desconocido:

```text
CONSULTAR ESTADO
→ RECONCILIAR
→ DECIDIR
```

No:

```text
REPETIR CAMBIO A CIEGAS
```

La decisión final deberá conservar relación con el intento original.

#### 47. Offline

Cuando un cambio haya ocurrido offline, la trazabilidad deberá conservar, según aplique:

- identificador local estable;
- actor y contexto originales;
- tiempo original;
- secuencia local;
- recurso y versión;
- operación pendiente;
- idempotencia;
- estado de sincronización;
- conflicto;
- decisión de conciliación;
- tiempos de recepción y persistencia.

Esta sección no certifica la capacidad de trabajar offline; solo la trazabilidad de cambios que el package declare soportar.

#### 48. Conflictos

Un conflicto deberá generar evidencia de:

- versiones comparadas;
- campos o estados incompatibles;
- regla aplicable;
- actor o proceso que decide;
- decisión final;
- información preservada;
- necesidad de escalamiento cuando corresponda.

#### 49. Operaciones masivas

Una operación masiva deberá permitir reconstruir:

- intención común;
- población objetivo;
- filtros o selección;
- versión base;
- simulación o vista previa cuando aplique;
- actor;
- autorización;
- resultado por elemento;
- fallos parciales;
- receipt global;
- posibles reintentos sin duplicación.

#### 50. Importaciones

Una importación deberá conservar:

- archivo o fuente;
- versión de formato;
- mapeo;
- staging;
- validaciones;
- duplicados detectados;
- comparación;
- decisión;
- resultado por fila;
- recursos creados, modificados, omitidos o rechazados;
- actor y tiempos.

La importación no podrá borrar el origen de cada cambio.

#### 51. Cambio entre modo guiado y experto

Cambiar de superficie deberá conservar:

- objeto;
- alcance;
- versión;
- borrador compatible;
- validaciones;
- identidad de la operación;
- receipt único.

No se admite una segunda escritura material solo por cambiar de modo.

#### 52. Dispositivos compartidos

La trazabilidad deberá mantener separados:

```text
DISPOSITIVO
ACTOR
SESIÓN
TURNO
ÁREA
```

Cambiar actor deberá cerrar o aislar el contexto anterior. La siguiente persona no heredará autoría sobre cambios previos.

#### 53. Denegaciones

Cuando una acción material sea denegada y el contrato exija evidencia, la trazabilidad deberá conservar:

- actor;
- recurso;
- acción intentada;
- razón tipada minimizada;
- permiso o política relevante;
- tiempo;
- correlación.

La denegación no crea el efecto empresarial solicitado.

#### 54. Fallos técnicos

Un fallo técnico podrá generar evidencia de intento, pero no deberá presentarse como un cambio empresarial completado.

Se distinguirá:

```text
INTENTO
!= EFECTO CONFIRMADO
```

#### 55. Auditoría frente a observabilidad

La certificación no acepta como sustituto único:

- log de consola;
- stack trace;
- métrica agregada;
- trace sin contexto empresarial;
- screenshot aislado.

Estas señales pueden complementar la prueba, pero el cambio debe relacionarse con proceso, recurso, actor o servicio, acción, resultado y causa.

#### 56. Inmutabilidad de auditoría

La superficie de auditoría será de solo lectura respecto del hecho histórico.

Anotar, escalar, corregir o abrir un caso deberá producir una acción separada con identidad y autorización propias.

#### 57. Acceso a auditoría

Consultar o exportar auditoría deberá respetar:

- autorización de servidor;
- finalidad;
- población mínima;
- rango temporal;
- filtros;
- enmascaramiento;
- límites de exportación;
- clasificación;
- registro de acceso cuando aplique.

Tener permiso para operar un proceso no concede automáticamente acceso a su historial completo.

#### 58. Privacidad y minimización

La evidencia no deberá duplicar secretos, tokens, PIN, credenciales ni payloads completos sin necesidad.

La trazabilidad suficiente no significa retener todos los datos visibles en una pantalla.

#### 59. Datos sensibles

Para datos sensibles podrán conservarse:

- identificadores o referencias;
- hashes;
- reason codes;
- hechos derivados permitidos;
- clasificación;
- evidencia minimizada.

El historial no autoriza exposición irrestricta.

#### 60. Vista de historial para usuario operativo

Cuando el flujo requiera mostrar historial al trabajador, la interfaz deberá priorizar significado humano:

- qué cambió;
- cuándo;
- quién o qué lo produjo cuando sea apropiado;
- estado resultante;
- razón relevante;
- siguiente acción.

No deberá exponer identificadores técnicos sin valor operativo como sustituto de explicación.

#### 61. Vista administrativa

Una vista administrativa podrá ofrecer mayor densidad y comparación, pero deberá conservar:

- filtros visibles;
- universo consultado;
- versiones;
- fuentes;
- diferencias;
- actor;
- tiempos;
- correlación;
- receipt;
- autorización.

#### 62. Línea de tiempo

Una línea de tiempo deberá diferenciar cuando corresponda:

- tiempo de ocurrencia;
- tiempo de recepción;
- tiempo de persistencia;
- tiempo de sincronización;
- zona horaria;
- actor;
- principal técnico;
- contexto;
- antes;
- después;
- correlación;
- receipt.

Ordenar solo por creación técnica puede ser incorrecto en escenarios offline o distribuidos.

#### 63. Comparadores

Los comparadores deberán declarar:

- fuente A;
- fuente B;
- periodo;
- versión;
- unidad;
- tolerancia;
- regla de equivalencia;
- dueño;
- acción permitida sobre cada diferencia.

#### 64. Reconocimiento de advertencias

El reconocimiento explícito de una advertencia solo será obligatorio cuando exista riesgo material justificable.

Cuando se exige, deberá conservar razón y evidencia proporcional sin convertir toda acción ordinaria en una confirmación decorativa.

#### 65. Caso positivo mínimo

Un caso positivo mínimo demuestra:

1. recurso y proceso identificados;
2. cambio material ejecutado una vez;
3. actor o servicio correcto;
4. contexto efectivo correcto;
5. estado anterior recuperable cuando aplica;
6. estado nuevo recuperable;
7. motivo cuando aplica;
8. versión relevante;
9. tiempos suficientes;
10. correlación y causalidad cuando aplican;
11. receipt o evidencia de resultado;
12. historial anterior preservado.

#### 66. Casos positivos obligatorios por package

Cada package aplicable deberá incluir, según su alcance, casos de:

- cambio ordinario exitoso;
- cambio rechazado o denegado;
- corrección;
- reverso o cancelación;
- cambio cross-app;
- cambio automático;
- retry;
- cambio masivo o importación si existe;
- historial consultable;
- actor/contexto correcto.

Los casos no aplicables deberán justificarse por el alcance real del package.

#### 67. Casos negativos mínimos

La certificación deberá intentar detectar:

- sobrescritura silenciosa;
- actor ausente o incorrecto;
- contexto heredado de otra persona;
- recurso equivocado;
- motivo ausente donde es obligatorio;
- timestamp reescrito;
- versión ausente;
- correlación rota;
- receipt no relacionado;
- segundo efecto por retry;
- auditoría editable;
- log técnico usado como única evidencia;
- secreto expuesto en evento;
- cambio sin estado anterior cuando el contrato exige comparación;
- anulación que borra el hecho original;
- importación sin resultado por fila;
- operación masiva sin población reconstruible.

#### 68. Casos que no demuestran trazabilidad por sí solos

No bastan por sí solos:

- que la pantalla muestre “guardado”;
- que exista `updated_at`;
- que exista `updated_by`;
- que el log contenga un request;
- que el recurso tenga versión;
- que el usuario recuerde lo que hizo;
- que exista un screenshot final;
- que un evento tenga timestamp sin causalidad;
- que el audit log exista pero no pueda relacionarse con el recurso;
- que el historial muestre texto libre sin estructura.

#### 69. Oracle de trazabilidad

Para cada caso se aplicará:

```text
SI no existe cambio material
→ N/A para esta certificación concreta

SI existe cambio material y no puede identificarse recurso o proceso
→ FAIL

SI existe cambio material y no puede atribuirse actor o servicio
→ FAIL

SI el contrato exige estado anterior y este fue destruido
→ FAIL

SI el cambio no conserva resultado o causalidad suficiente
→ FAIL

SI un retry crea un segundo efecto material
→ FAIL

SI una corrección borra el hecho corregido
→ FAIL

SI la evidencia expone secretos innecesarios
→ FAIL

SI estado vigente, historia y corrección pueden reconstruirse con evidencia proporcional
→ PASS
```

#### 70. Identidad del caso de prueba

Cada caso deberá declarar como mínimo:

- `case_id`;
- package evaluado;
- aplicación;
- proceso;
- recurso;
- tipo de cambio;
- actor o servicio esperado;
- contexto esperado;
- versión inicial;
- acción;
- resultado esperado;
- campos de trazabilidad obligatorios;
- evidencia producida;
- resultado observado;
- veredicto.

#### 71. Unidad de certificación por package

Cada package aplicable se certificará de forma independiente bajo una identidad equivalente a:

`UX-QA-010::<package_id>`

Un PASS de otro package no se hereda.

#### 72. Cobertura mínima por package

La cobertura deberá abarcar únicamente las superficies y efectos que el package declara materializar.

No se exigirá una matriz de casos ajena a su alcance, pero no podrá omitirse un cambio material que sí produzca.

#### 73. Certificación global final

`UX-QA-010::GLOBAL-FINAL` solo podrá cerrarse cuando:

- todos los packages aplicables tengan decisión válida;
- no existan fallos críticos abiertos;
- las excepciones estén gobernadas;
- la correlación cross-app necesaria sea reconstruible;
- los cambios automáticos estén cubiertos;
- la evidencia permita reconstrucción extremo a extremo donde corresponda;
- no existan familias completas de cambios sin owner ni prueba.

La certificación global no sustituye los PASS por package.

#### 74. Invalidación de evidencia

La evidencia queda inválida si:

- corresponde a otra versión material del package;
- usa datos o contratos incompatibles con el estado evaluado;
- omite actor, recurso o resultado cuando son obligatorios;
- depende de logs ya rotados sin otra evidencia;
- fue producida con permisos o contexto distintos al caso;
- oculta un fallo parcial;
- pierde correlación entre origen y destino;
- fue editada manualmente sin procedencia;
- expone información prohibida y no puede aceptarse como evidencia segura.

#### 75. Métricas de soporte

Métricas útiles:

- porcentaje de cambios materiales con evento o evidencia correlacionable;
- cambios sin actor resoluble;
- cambios sin versión;
- cambios sin motivo cuando aplica;
- correcciones sin relación con hecho anterior;
- eventos huérfanos;
- cadenas de correlación rotas;
- retries con efecto duplicado;
- tiempos inconsistentes;
- receipts sin efecto resoluble;
- operaciones masivas con fallos no individualizados;
- importaciones sin resultado por fila;
- consultas de auditoría sin registro cuando aplica.

Las métricas no sustituyen el oracle por caso.

#### 76. Guardrail laboral

La evidencia de trazabilidad se usa para comprender hechos, reconstruir procesos, investigar incidentes y demostrar controles.

No se utilizará de forma aislada para inferir productividad, intención, culpa o desempeño individual sin contexto operacional, procedimiento aplicable y revisión humana correspondiente.

#### 77. Fallos críticos

Bloquean PASS del package:

- cambio material sin recurso identificable;
- cambio material sin actor o servicio atribuible;
- corrección destructiva;
- reverso que elimina historia;
- retry que duplica efecto;
- cadena cross-app no reconstruible para un efecto crítico;
- autoridad o contexto no resolubles en un cambio protegido;
- auditoría manipulable como si fuera el hecho original;
- evidencia que incluye secretos prohibidos;
- operación masiva cuyo impacto no puede reconstruirse;
- resultado desconocido presentado como éxito.

#### 78. Hallazgos no críticos

Un hallazgo solo podrá diferirse si:

- no destruye historia;
- no rompe atribución;
- no rompe causalidad material;
- no genera efecto duplicado;
- no expone información indebida;
- no impide reconstruir el resultado;
- tiene propietario canónico;
- tiene condición exacta de salida;
- su impacto está documentado en el package.

No existe un pendiente narrativo sin dueño.

#### 79. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea define cómo certificar conductas ya cubiertas por contratos y requisitos vigentes y no introduce una obligación verificable nueva que exija actualizar el registro.

#### 80. Cobertura de prueba vigente reutilizada

La certificación reutiliza, sin modificar, cobertura existente de fuente de verdad, historial, autorización, integración, vista previa, auditoría, comparación, receipts y cambios administrativos.

Cobertura principal:

- `TREQ-UX-005`;
- `TREQ-UX-011`;
- `TREQ-UX-334`;
- `TREQ-UX-335`;
- `TREQ-UX-360`;
- `TREQ-UX-396`;
- `TREQ-UX-398`;
- `TREQ-UX-403`;
- `TREQ-UX-429`;
- `TREQ-UX-432`;
- `TREQ-UX-445`;
- `TREQ-AUTH-015`;
- `TREQ-INTEGRATION-006`;
- `TREQ-INTEGRATION-023`.

Esta lista es trazabilidad reutilizada; no representa requisitos creados o modificados por `UX-QA-010`.

#### 81. Evidencia de validación

| Clase | Estado | Evidencia documental disponible en esta aprobación |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecuta build físico ni de producto para aprobar el contrato documental. |
| LOCAL | NOT_EXECUTED | La incorporación y los validadores reales del checkout corresponden a la batería posterior. |
| REMOTA | PASS | Se revisaron las fuentes canónicas remotas vigentes, continuidad, topología, `NFR-REQ-006`, 04A UX, AUTH e INTEGRATION y la base aprobada `UX-QA-009`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recorridos operativos reales durante esta aprobación documental. |
| FÍSICA | NOT_EXECUTED | Las instancias por package y `GLOBAL-FINAL` permanecen sujetas a `POST_E5_PACKAGE`. |

#### 82. Evidencia mínima posterior por caso

La ejecución posterior deberá conservar suficiente evidencia para demostrar:

- identidad del recurso;
- proceso e instancia;
- versión;
- estado previo cuando aplica;
- estado nuevo;
- actor o servicio;
- contexto efectivo;
- autoridad relevante;
- motivo cuando aplica;
- tiempos;
- correlación y causalidad;
- resultado;
- receipt;
- evidencia de no destrucción histórica;
- evidencia de no duplicación ante retry cuando aplica.

La evidencia deberá ser reproducible y proporcional.

#### 83. Seguridad y privacidad de la evidencia

La evidencia no deberá exponer:

- PIN;
- tokens;
- secretos;
- credenciales;
- documentos completos cuando basta una referencia;
- payloads no minimizados;
- información clínica o sensible ajena al objetivo probatorio;
- datos de actores no necesarios para la decisión.

Los valores sensibles podrán representarse mediante referencias, hashes, categorías o redacción compatible con el objetivo de prueba.

#### 84. Responsabilidad de un fallo

Todo FAIL deberá identificar:

- package;
- proceso;
- recurso;
- tipo de cambio;
- evidencia ausente o contradictoria;
- severidad;
- owner canónico;
- condición exacta de salida;
- impacto sobre `GLOBAL-FINAL`.

El fallo no autoriza modificar contratos ajenos desde esta tarea.

#### 85. Casos fuera de alcance

Quedan fuera de esta aprobación documental:

- crear tablas o esquemas de auditoría;
- implementar outbox, inbox o event store;
- definir partición o índices físicos;
- modificar RLS;
- configurar retención física;
- ejecutar disposición de datos;
- implementar observabilidad;
- crear dashboards de auditoría;
- desplegar componentes;
- crear migraciones;
- modificar Supabase;
- ejecutar pruebas físicas;
- certificar conectividad inestable;
- certificar recuperación completa ante pérdida de red.

#### 86. Criterio de aceptación por package

Un package obtiene PASS únicamente si:

1. todos sus cambios materiales aplicables están inventariados;
2. cada caso obligatorio tiene evidencia válida;
3. el historial no se destruye;
4. actor o servicio y contexto son atribuibles;
5. recurso y versión son resolubles;
6. causa y resultado son reconstruibles;
7. tiempos son interpretables;
8. correcciones y reversos preservan relaciones;
9. retries no duplican efectos;
10. cross-app conserva correlación cuando aplica;
11. evidencia está minimizada y protegida;
12. no existe fallo crítico abierto.

#### 87. Criterios de aceptación

- [ ] Se define un contrato de certificación de trazabilidad de cambios por package y global final.
- [ ] Se distingue estado vigente de historia suficiente.
- [ ] Se distingue auditoría empresarial de logs técnicos.
- [ ] Todo cambio material puede relacionarse con proceso y recurso cuando aplica.
- [ ] Actor humano, servicio, dispositivo y contexto se distinguen correctamente.
- [ ] Las correcciones conservan antes, después, motivo y relación con el hecho corregido cuando aplica.
- [ ] Reversos, anulaciones y reaperturas no destruyen historia.
- [ ] Los tiempos de ocurrencia, recepción, persistencia y sincronización pueden diferenciarse cuando aplica.
- [ ] Correlación, causalidad e idempotencia se conservan en cambios distribuidos.
- [ ] La vista previa puede compararse con el resultado real en cambios de impacto cuando aplica.
- [ ] Receipts finales conservan resultado, actor, tiempo y correlación suficientes.
- [ ] Las acciones automáticas identifican regla o servicio causal.
- [ ] Las operaciones masivas conservan población y resultado por elemento.
- [ ] Las importaciones conservan procedencia y resultado por fila.
- [ ] La auditoría histórica no se edita como sustituto de una corrección nueva.
- [ ] El acceso a auditoría respeta autorización y minimización.
- [ ] La evidencia no expone secretos ni payloads completos innecesarios.
- [ ] Los retries no crean un segundo efecto empresarial.
- [ ] Resultado desconocido no se presenta como éxito.
- [ ] Las instancias por package no se infieren como ejecutadas por aprobar este contrato documental.
- [ ] `GLOBAL-FINAL` permanece pendiente hasta disponer de evidencia posterior suficiente.
- [ ] No se crea ni modifica ningún requisito de prueba.
- [ ] No se ejecutan cambios físicos.
- [ ] `UX-QA-011` conserva su responsabilidad sobre conectividad inestable.

#### 88. Límites

Esta tarea:

- no implementa auditoría física;
- no define tecnología única de event store;
- no obliga a duplicar payloads completos;
- no convierte logs en fuente de verdad empresarial;
- no concede acceso general a historial;
- no fija plazos legales de retención;
- no implementa archivo, hold ni disposición;
- no modifica permisos;
- no modifica bases de datos;
- no modifica datos;
- no modifica Supabase;
- no ejecuta reconciliaciones reales;
- no certifica resiliencia de red;
- no certifica disponibilidad;
- no certifica packages sin evidencia posterior a E5;
- no crea una instancia física durante esta aprobación documental.

#### 89. Handoff a `UX-QA-011`

`UX-QA-010` entrega a `UX-QA-011`:

- identidad de proceso y recurso;
- actor y contexto originales;
- tiempos diferenciados;
- operación y resultado;
- correlación y causalidad;
- idempotencia e intento cuando aplican;
- evidencia de conflicto o conciliación cuando existe;
- estado pendiente, confirmado o desconocido;
- preservación del historial durante retry o sincronización;
- frontera entre intento y efecto confirmado.

`UX-QA-011` podrá certificar conectividad inestable sin reabrir el contrato de trazabilidad de cambios.

#### 90. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-009 — No se registra dos veces la misma información`

**TAREA ACTUAL APROBADA**
`UX-QA-010 — Los cambios conservan trazabilidad`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-011 — Las tareas críticas soportan conectividad inestable`
### ✅ UX-QA-011 — Las tareas críticas soportan conectividad inestable

**Estado:** APROBADA
**Tarea anterior:** UX-QA-010 — Los cambios conservan trazabilidad
**Tarea siguiente:** UX-QA-012 — El retorno entre aplicaciones conserva contexto
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por package y globalmente que las tareas críticas mantienen un resultado mínimo seguro, estado comprensible, trabajo preservado, idempotencia, revalidación y recuperación gobernada ante conectividad lenta, intermitente, parcial, ausente o incierta, sin presentar efectos locales como confirmados ni ampliar autoridad
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de conectividad inestable definido; las ejecuciones por package y la certificación global final permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff de `UX-QA-010`, `NFR-REQ-001`, `NFR-REQ-004`, `UX-BASE-013`, `UX-BASE-014` y cobertura vigente, pero no afirma que un package desplegado sea ya offline-capable o resiliente
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican aplicaciones, colas, Service Workers, almacenamiento local, contratos runtime, RPC, RLS, Supabase, dispositivos, red, periféricos, datos, despliegues ni configuraciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS certificará que una tarea crítica conserva un comportamiento seguro y comprensible cuando la conectividad deja de ser estable, sin convertir una caída de red en pérdida silenciosa de trabajo, doble ejecución, autorización heredada, confirmación ficticia o conflicto resuelto destructivamente.

La certificación deberá responder, para cada package aplicable:

```text
¿QUÉ PARTE DE LA TAREA DEBE SEGUIR DISPONIBLE?
¿QUÉ PARTE DEBE PAUSARSE?
¿QUÉ PUEDE CONSULTARSE CON DATOS STALE?
¿QUÉ PUEDE CAPTURARSE LOCALMENTE?
¿QUÉ PUEDE QUEDAR EN COLA?
¿QUÉ EXIGE RESPUESTA AUTORITATIVA?
¿QUÉ RESULTADO ESTÁ CONFIRMADO Y CUÁL NO?
¿QUÉ OCURRE SI LA RED CAE ANTES, DURANTE O DESPUÉS DEL ENVÍO?
¿CÓMO SE EVITA DUPLICAR EL EFECTO?
¿CÓMO SE REVALIDAN ACTOR, CONTEXTO, VERSIÓN Y AUTORIDAD AL VOLVER?
¿CÓMO SE RECUPERA EL TRABAJO SIN LAST WRITE WINS?
¿QUÉ EVIDENCIA DEMUESTRA EL RESULTADO?
```

#### 2. Resultado canónico

`UX-QA-011` establece `UX-QA-CRITICAL-CONNECTIVITY-CERTIFICATION-001@1.0.0`.

El resultado define:

- universo de tareas críticas certificables;
- modelo de estados de conectividad y disponibilidad;
- política por capacidad y clase offline;
- separación entre captura local y efecto empresarial;
- idempotencia y tratamiento de resultado desconocido;
- aislamiento por actor, contexto, área y dispositivo;
- sincronización causal y deadlines heredados;
- manejo de conflictos, reautorización y reconciliación;
- pruebas adversariales de red, servicio, sesión, dispositivo, esquema, almacenamiento y periféricos;
- evidencia por package y certificación global final;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`;
- handoff exacto a `UX-QA-012`.

#### 3. Alcance exacto

La certificación aplica a tareas y etapas con criticidad efectiva `C0`, `C1` o `C2`, y a cualquier `critical_stage_overrides[]` que eleve una etapa a una de esas clases.

También aplica a una capacidad no clasificada globalmente como crítica cuando su package declare que una dependencia, ventana, recurso o condición concreta eleva la etapa efectiva durante el escenario probado.

`C3` y `C4` permanecen fuera del universo crítico primario, pero se incluyen como regresión cuando comparten colas, caché, sincronización, sesión, dispositivo o recursos con tareas críticas.

#### 4. Handoff recibido de `UX-QA-010`

`UX-QA-010` entrega:

- identidad de proceso y recurso;
- actor y contexto originales;
- tiempos diferenciados;
- operación y resultado;
- correlación y causalidad;
- idempotencia e intento cuando aplican;
- evidencia de conflicto o conciliación;
- estado pendiente, confirmado o desconocido;
- preservación del historial durante retry o sincronización;
- frontera entre intento y efecto confirmado.

`UX-QA-011` usa esas referencias para someter la tarea a fallos de conectividad sin reabrir el contrato de trazabilidad.

#### 5. Frontera con `UX-QA-010`

`UX-QA-010` responde:

```text
¿PUEDO RECONSTRUIR EL CAMBIO Y SU CAUSA?
```

`UX-QA-011` responde:

```text
¿LA TAREA CRÍTICA SIGUE SIENDO SEGURA Y RECUPERABLE
CUANDO LA CONECTIVIDAD SE DEGRADA?
```

Una tarea puede conservar trazabilidad y aun fallar `UX-QA-011` si pierde borradores, duplica una mutación, oculta datos stale, hereda autoridad o no distingue un resultado desconocido.

#### 6. Frontera con `UX-QA-012`

`UX-QA-012` certificará que el retorno entre aplicaciones conserva contexto.

`UX-QA-011` puede atravesar varias aplicaciones durante un escenario, pero solo certifica conectividad, preservación de trabajo y reconciliación. No decide todavía si el retorno cross-app reconstruye correctamente el contexto de navegación.

#### 7. Definición de tarea crítica

Las clases heredadas son:

```text
C0  seguridad, inocuidad, acceso o continuidad
C1  misión operativa
C2  negocio y compromisos del ciclo
C3  importante y recuperable
C4  planificable o diferible
```

Para `UX-QA-011`, `C0`, `C1` y `C2` forman el universo crítico ordinario.

Una etapa puede elevar su criticidad respecto de la clase base del proceso; la certificación deberá usar la criticidad efectiva del escenario, no únicamente la etiqueta global del proceso.

#### 8. Regla principal

```text
SIN CONEXIÓN
!= SIN CONTROL

CAPTURA LOCAL
!= EFECTO EMPRESARIAL CONFIRMADO

REINTENTO
!= NUEVA OPERACIÓN

CONECTIVIDAD RECUPERADA
!= OPERACIÓN YA RECONCILIADA
```

#### 9. Resultado mínimo seguro

Una tarea crítica no necesita conservar todas sus capacidades durante degradación.

Debe demostrar una de estas salidas gobernadas:

```text
RESULTADO MÍNIMO SEGURO
PAUSA SEGURA
CONTINGENCIA MANUAL GOBERNADA
LECTURA DE REFERENCIA CONTROLADA
CAPTURA LOCAL REVALIDABLE
EJECUCIÓN BAJO ENVELOPE FINITO
BLOQUEO EXPLÍCITO SIN PÉRDIDA DE TRABAJO
```

La degradación nunca autoriza omitir controles materiales.

#### 10. Estados de disponibilidad empresarial

Se reutilizan:

```text
AVAILABLE
DEGRADED_SAFE
UNAVAILABLE
UNKNOWN
RECOVERING
RECONCILIATION_REQUIRED
```

`DEGRADED_SAFE` no equivale a disponibilidad plena ni a autorización para saltar validaciones.

#### 11. Vector de conectividad de experiencia

La certificación deberá observar por separado:

```text
network_reachability
service_reachability
session_validity
context_freshness
resource_freshness
sync_health
peripheral_health
last_verified_at
```

El package falla si reduce todo el diagnóstico a Wi-Fi conectado/desconectado.

#### 12. Estados de conectividad de experiencia

Se reutilizan:

```text
ONLINE_HEALTHY
ONLINE_DEGRADED
INTERMITTENT
OFFLINE_CONFIRMED
CONNECTIVITY_UNKNOWN
RECOVERING
SYNC_BLOCKED
```

Estos estados pertenecen a la experiencia definida por `UX-BASE-013`.

#### 13. Estados de disponibilidad no funcional

`NFR-REQ-004` conserva su propio vector:

```text
ONLINE_STABLE
ONLINE_DEGRADED
PARTIAL_SERVICE
OFFLINE_CONFIRMED
CONNECTIVITY_UNKNOWN
RECOVERING_SYNC
SYNC_BLOCKED
```

La certificación no tratará ambos vocabularios como aliases automáticos. Cada package deberá documentar su proyección explícita entre estado no funcional y estado visible.

#### 14. Dependencias obligatorias

La disponibilidad de una operación puede depender de:

- transporte de red;
- identidad y sesión;
- resolución de `AccessContext`;
- servicio propietario del dominio;
- sincronización;
- reloj confiable;
- almacenamiento local seguro;
- proveedor externo;
- periférico.

La tarea se considera disponible solo si sus dependencias obligatorias están disponibles o existe un perfil degradado aprobado.

#### 15. Política por capacidad

Cada consulta o comando deberá declarar uno de estos modos:

```text
ONLINE_REQUIRED
ONLINE_PREFERRED
STALE_READ_ONLY
OFFLINE_CAPTURE_ALLOWED
OFFLINE_QUEUE_ALLOWED
MANUAL_CONTINGENCY
NOT_AVAILABLE_OFFLINE
```

No existe un modo offline global de aplicación.

#### 16. Clases no funcionales offline

Se reutilizan:

```text
OF0_ONLINE_ONLY
OF1_CACHED_REFERENCE
OF2_LOCAL_DRAFT
OF3_LOCAL_CAPTURE
OF4_LEASED_EXECUTION
OF5_MANUAL_CONTINGENCY
```

La clase se evalúa por operación o etapa, no por pantalla completa.

#### 17. Correspondencia entre política y clase

La certificación no exige una correspondencia uno-a-uno universal entre los modos UX y las clases `OF*`.

Cada package deberá demostrar que la combinación usada:

- conserva el mismo efecto empresarial permitido;
- no amplía autoridad;
- no convierte borrador en mutación;
- no convierte referencia stale en verdad vigente;
- no convierte contingencia manual en un canal digital paralelo;
- no omite la reconciliación requerida.

#### 18. `C0`

Para una etapa `C0`, la caída digital no puede eliminar la capacidad de contención o respuesta mínima necesaria para seguridad, inocuidad, acceso o continuidad.

Si el efecto digital no puede producirse con seguridad, deberá existir pausa, contención o contingencia manual gobernada conforme al contrato propietario.

#### 19. `C1`

Para una etapa `C1`, la prueba debe demostrar que la degradación no pierde trabajo operativo material, custodia, venta, producción, entrega u obligación dentro de su ventana.

Cuando el efecto final exija servidor, la preparación o evidencia permitida se preserva y la confirmación permanece pendiente.

#### 20. `C2`

Para una etapa `C2`, el package deberá conservar propietario, vencimiento, estado visible, backlog controlado y criterio de reconciliación dentro del ciclo empresarial aplicable.

La tolerancia temporal no autoriza almacenamiento indefinido ni pérdida silenciosa.

#### 21. Etapas críticas elevadas

Cuando una etapa use `critical_stage_overrides[]`, el escenario deberá registrar:

- proceso base;
- clase base;
- etapa exacta;
- clase efectiva;
- detonante de elevación;
- ventana;
- resultado mínimo;
- dependencia que se degrada;
- política de salida.

#### 22. Red lenta

La prueba deberá demostrar que latencia o respuestas tardías no generan doble envío, múltiples intenciones ni confirmación prematura.

La interfaz mostrará progreso y resultado sin inducir toques repetidos como mecanismo de recuperación.

#### 23. Pérdida antes de enviar

Si la conectividad se pierde antes de que una intención salga del dispositivo:

- no se afirmará recepción remota;
- se conservará borrador o intención local solo cuando la política lo permita;
- el estado será inequívoco;
- el retry posterior conservará la misma intención cuando corresponda.

#### 24. Pérdida durante el envío

Si la red cae durante una mutación, la prueba deberá demostrar que el cliente no puede inferir por sí solo si el servidor ejecutó el efecto.

El caso se clasifica antes de decidir cualquier retry.

#### 25. Pérdida después de ejecutar y antes de responder

Este escenario produce riesgo de `RESULT_UNKNOWN` o equivalente.

La salida correcta es:

```text
CONSULTAR IDEMPOTENCY KEY
→ CONSULTAR RECEIPT
→ CONSULTAR ESTADO AUTORITATIVO
→ CLASIFICAR
→ REINTENTAR, CONCILIAR O DETENER
```

Crear una segunda intención independiente es FAIL.

#### 26. Intermitencia

La prueba deberá alternar disponibilidad durante la interacción y demostrar:

- ausencia de retry ciego;
- preservación de intentos;
- estabilidad de la UI;
- visibilidad del estado;
- conservación del trabajo local autorizado;
- no inversión del orden causal.

#### 27. Servicio parcial

Wi-Fi o Internet disponibles no bastan.

La prueba deberá aislar fallos de identidad, contexto, servicio propietario, sincronización, proveedor o periférico y comprobar que solo las capacidades dependientes se bloquean o degradan.

#### 28. Datos stale

Una lectura stale deberá mostrar:

- fuente;
- versión;
- última actualización;
- vigencia o expiración;
- limitaciones;
- acciones bloqueadas por antigüedad.

`STALE_READ_ONLY` nunca habilita una mutación que exige estado vigente.

#### 29. Sesión expirada

Una sesión expirada no se convierte en autorización offline.

El trabajo preparatorio permitido podrá preservarse, pero la acción protegida requerirá reautenticación o envelope vigente según su contrato.

#### 30. Permiso o dispositivo revocado

La reaparición de conectividad deberá descargar o resolver revocaciones antes de vaciar colas protegidas.

Una captura local revocada podrá conservarse como evidencia cuando el contrato lo permita, pero no obliga al servidor a ejecutar el efecto solicitado.

#### 31. Cambio de actor

Las colas y borradores estarán aislados por actor.

Cambiar de trabajador:

- detiene nuevas mutaciones del actor anterior;
- conserva atribución original;
- protege sus borradores;
- no entrega pendientes al nuevo actor;
- exige nuevo contexto;
- bloquea mutaciones si no existe identidad offline aprobada.

#### 32. Cambio de área, sede, turno o check-in

El cambio invalida cualquier supuesto de contexto anterior.

La prueba deberá resolver un `AccessContext` nuevo y demostrar que pendientes anteriores no cambian silenciosamente de territorio o responsabilidad.

#### 33. Dispositivo compartido

En estaciones compartidas se deberá demostrar aislamiento por:

```text
DISPOSITIVO
+
ACTOR
+
CONTEXTO
+
ÁREA
```

No habrá herencia implícita de borradores, autorización, claim, custodia o cola.

#### 34. Dos dispositivos sobre el mismo recurso

La prueba deberá incluir cambios concurrentes desde dos dispositivos y demostrar:

- detección de versión o conflicto;
- no duplicación;
- no `last write wins` empresarial;
- preservación de ambas evidencias;
- siguiente acción segura.

#### 35. Idempotencia

Toda mutación elegible para cola tendrá identidad estable por intención empresarial.

```text
MISMA INTENCIÓN
→ MISMA IDEMPOTENCY KEY

NUEVA INTENCIÓN
→ NUEVA KEY
```

La protección debe existir más allá del estado visual del botón.

#### 36. Dependencias y orden causal

La sincronización deberá respetar dependencias explícitas.

Un prerequisito rechazado bloquea sus dependientes, pero no monopoliza operaciones independientes.

Las colas de actores o áreas diferentes no se fusionan y la prioridad no invierte causalidad.

#### 37. Prioridades de sincronización

Se reutilizan:

```text
SYNC-0_BLOCKING
SYNC-1_URGENT
SYNC-2_OPERATIONAL
SYNC-3_CYCLE
SYNC-4_DEFERRED
```

El package deberá respetar el deadline de su contrato; `SYNC-0` no permite acción dependiente antes de un resultado terminal.

#### 38. `OF4_LEASED_EXECUTION`

Una operación offline bajo envelope deberá demostrar:

- actor exacto;
- capacidad exacta;
- recurso o alcance finito;
- sede y área;
- turno o ventana;
- límites;
- emisión;
- vencimiento;
- versión de política;
- dispositivo;
- condición de revalidación.

El envelope no puede ampliar su propio alcance ni vigencia.

#### 39. Acciones obligatoriamente en línea

Sin contrato específico posterior, permanecen `ONLINE_REQUIRED`:

- aprobaciones y rechazos sensibles;
- anulaciones, reversas y reaperturas;
- pagos, reembolsos y cierres financieros;
- cambios de permiso, rol o dispositivo;
- publicación de horarios, recetas, precios o configuración;
- exportaciones sensibles;
- lotes administrativos;
- overrides;
- cierre de conciliaciones.

#### 40. Contingencia manual

Toda contingencia manual deberá tener:

- condición de activación;
- responsable;
- identificador o numeración;
- datos mínimos;
- control de duplicados;
- custodia;
- momento de digitalización;
- responsable de conciliación;
- criterio de cierre.

La contingencia no se presenta como efecto digital confirmado.

#### 41. Observación física

Una observación offline conservará por separado:

```text
HECHO OBSERVADO
HORA DE OBSERVACIÓN
HORA DE REGISTRO LOCAL
HORA DE SINCRONIZACIÓN
```

La hora de sincronización no sustituye el momento del hecho.

#### 42. Claims, custodia y handoffs

Por defecto son online:

- tomar trabajo compartido;
- iniciar trabajo excluyente;
- transferir custodia;
- aceptar recepción definitiva;
- liberar al actor anterior;
- completar un handoff.

Una excepción exige lease previo, actor y recurso exactos, vencimiento, alcance, evidencia y reconciliación.

#### 43. Periféricos

Backend y periférico se evaluarán por separado.

La prueba deberá distinguir:

- comando preparado;
- comando enviado;
- recepción;
- ejecución física;
- receipt;
- resultado desconocido;
- posibilidad segura de retry.

Un datáfono, impresora, escáner, cámara o báscula disponible localmente no demuestra que el efecto empresarial haya quedado confirmado.

#### 44. Archivos y evidencia

Se deberán diferenciar estados como:

```text
LOCAL_ONLY
QUEUED
UPLOADING
UPLOADED_UNLINKED
LINKED_AND_CONFIRMED
FAILED_RETRYABLE
FAILED_TERMINAL
```

Un archivo subido parcialmente o sin vínculo empresarial no cierra la tarea.

#### 45. Reinicio y pérdida de energía

Pendientes y borradores podrán sobrevivir únicamente bajo política explícita.

Al volver, el sistema revalida actor, aplicación, esquema, dispositivo, conectividad, dependencias y cancelaciones antes de cualquier ejecución en segundo plano.

#### 46. Actualización con operaciones pendientes

La prueba deberá cubrir una aplicación o esquema nuevo con operaciones antiguas.

Una incompatibilidad no elimina silenciosamente el pendiente ni lo ejecuta bajo un shape distinto. Deberá migrarse, cuarentenarse, descartarse con motivo o enviarse a soporte según contrato.

#### 47. Almacenamiento bajo presión

La prueba cubrirá almacenamiento cercano al límite, lleno o corrupto.

El sistema no deberá confirmar trabajo que no pudo persistir de forma durable ni eliminar silenciosamente evidencia o pendientes para liberar espacio.

#### 48. Reloj incorrecto

Un reloj local inválido no podrá extender sesión, lease, turno, ventana, vigencia ni autorización.

La evidencia conservará los tiempos disponibles y marcará la incertidumbre en vez de corregir silenciosamente el hecho original.

#### 49. Backlog al reconectar

La cola acumulada no debe degradar la tarea foreground crítica hasta volverla inutilizable.

La prueba deberá observar:

- profundidad;
- edad del pendiente más antiguo;
- prioridad;
- dependencias;
- tiempo hasta resultado o conflicto;
- impacto sobre la interacción activa.

#### 50. Secuencia de reconexión

La secuencia canónica es:

```text
1. ESTABILIZAR CONECTIVIDAD
2. VERIFICAR HORA Y SERVICIOS
3. REVALIDAR SESIÓN Y DISPOSITIVO
4. RESOLVER NUEVO ACCESS CONTEXT
5. DESCARGAR REVOCACIONES Y VERSIONES
6. CLASIFICAR OPERACIONES PENDIENTES
7. SINCRONIZAR POR DEPENDENCIAS
8. CONSULTAR RECEIPTS
9. DETENER Y EXPLICAR CONFLICTOS
10. ACTUALIZAR PROYECCIONES
11. CONFIRMAR AL TRABAJADOR
```

El package falla si vacía la cola apenas detecta señal de red.

#### 51. Conflictos

Se probarán, según aplicabilidad:

```text
RESOURCE_VERSION_CONFLICT
CONTEXT_CHANGED
AUTHORIZATION_CHANGED
DUPLICATE_OPERATION
DEPENDENCY_REJECTED
SCHEMA_INCOMPATIBLE
BUSINESS_STATE_CHANGED
QUANTITY_CONFLICT
CUSTODY_CONFLICT
TIME_WINDOW_EXPIRED
```

Ningún conflicto empresarial se resuelve por `last write wins` silencioso.

#### 52. Resultado desconocido

`CONNECTIVITY_UNKNOWN` o `RESULT_UNKNOWN` bloquean un nuevo intento independiente hasta consultar receipt, estado o evidencia suficiente.

El package falla si el mensaje al usuario sugiere repetir para estar seguro.

#### 53. Reautorización

`REAUTH_REQUIRED` preserva el trabajo permitido, pero no conserva autoridad.

La reautenticación debe producir contexto vigente y no reactivar automáticamente una intención que ya pudo expirar o perder elegibilidad.

#### 54. Reconciliación

`RECONCILIATION_REQUIRED` significa que existe trabajo físico, local o remoto que todavía debe compararse antes de declarar un resultado autoritativo.

La conciliación deberá preservar ambas fuentes, diferencias, decisión, actor responsable y evidencia.

#### 55. Local frente a autoritativo

La interfaz deberá distinguir como mínimo:

```text
GUARDADO EN ESTE EQUIPO
PENDIENTE DE SINCRONIZAR
ENVIADO
ESPERANDO CONFIRMACIÓN
CONFIRMADO POR EL SERVIDOR
NECESITA REVISIÓN
```

No se aceptará un `Guardado`, `Listo` o `Completado` ambiguo cuando el efecto real todavía sea incierto.

#### 56. Lenguaje humano

La interfaz explicará:

- qué ocurrió;
- qué trabajo se conserva;
- qué está pendiente;
- qué acción está bloqueada;
- qué puede hacerse ahora;
- quién debe intervenir;
- cuándo se revisará;
- referencia de soporte no secreta.

No mostrará HTTP, SQL, stack, payload ni códigos técnicos como instrucción principal al trabajador.

#### 57. Accesibilidad

Los estados de conectividad y sincronización:

- no dependerán de color;
- tendrán texto;
- serán anunciables;
- no usarán modales repetitivos;
- serán operables por teclado, tacto y lector;
- permitirán revisar pendientes y conflictos;
- distinguirán local, cola, conflicto y confirmado.

#### 58. Privacidad local

Una capacidad offline se descartará si el riesgo de almacenamiento local supera el beneficio operativo.

La caché o cola aplicará minimización, aislamiento, expiración, protección y exclusión de secretos.

#### 59. Observabilidad

La evidencia posterior deberá poder medir, según aplique:

```text
time_offline
queue_depth
queue_bytes
oldest_pending_age
sync_attempts
sync_latency
conflicts_by_class
unknown_results
duplicates_prevented
operations_expired
operations_quarantined
manual_contingencies
reconciliation_duration
local_storage_pressure
schema_migration_failures
```

Las métricas no se utilizarán para responsabilizar al trabajador por fallas de infraestructura.

#### 60. Evidencia técnica actual del repositorio

El repositorio vigente ya contiene contratos y componentes parciales que distinguen estados como `RESULT_UNKNOWN` y `RECONCILIATION_REQUIRED`, y validadores que prohíben presentar una cola local como aceptación remota.

Esa evidencia parcial no equivale a certificación de `UX-QA-011` para ningún package. La capacidad crítica deberá demostrar su comportamiento end-to-end en el entorno y dispositivos que le correspondan.

#### 61. Inventario obligatorio por package

Antes de ejecutar la certificación física, cada package deberá materializar una matriz que incluya por capacidad crítica:

- `process_id`;
- etapa;
- clase base;
- override efectivo si existe;
- ventana de disponibilidad;
- resultado mínimo;
- política de conectividad;
- clase `OF*`;
- prioridad `SYNC-*`;
- servicios requeridos;
- recurso;
- actor;
- dispositivo;
- periféricos;
- idempotencia;
- persistencia local;
- frescura;
- conciliación;
- oracle;
- evidencia.

No se acepta una afirmación genérica de “soporta offline”.

#### 62. Universo mínimo de escenarios

Cada capacidad aplicable deberá probar, según corresponda:

1. red lenta;
2. pérdida antes de enviar;
3. pérdida durante envío;
4. ejecución del servidor seguida de pérdida de respuesta;
5. reconexión breve y nueva caída;
6. servicio parcial;
7. sesión expirada;
8. permiso o dispositivo revocado;
9. cambio de actor;
10. cambio de área, turno o check-in;
11. dos dispositivos sobre el mismo recurso;
12. duplicado;
13. dependencia rechazada;
14. operación expirada;
15. esquema antiguo;
16. actualización con pendientes;
17. almacenamiento lleno o corrupto;
18. reloj incorrecto;
19. reinicio o pérdida de energía;
20. archivo parcialmente cargado;
21. backend y periférico divergentes;
22. backlog de reconexión;
23. contingencia manual;
24. recuperación del checkpoint sin heredar autoridad.

Cada package podrá añadir escenarios; no podrá omitir uno aplicable sin justificación contractual.

#### 63. Perfiles de red de prueba

La certificación deberá usar perfiles controlados que permitan reproducir:

- latencia elevada;
- pérdida;
- cortes completos;
- flapping;
- recuperación parcial;
- dependencia externa indisponible.

Los valores cuantitativos pertenecen al package, ambiente o presupuesto de respuesta aplicable. Esta tarea no inventa umbrales universales.

#### 64. Oracle

Cada escenario tendrá un oracle que determine:

- estado esperado visible;
- efecto empresarial permitido;
- efecto bloqueado;
- persistencia esperada;
- receipt esperado;
- retry permitido o prohibido;
- conflicto esperado;
- criterio de reconciliación;
- estado terminal válido.

Sin oracle reproducible no existe PASS.

#### 65. Evidencia por ejecución

La evidencia deberá conservar, según aplicabilidad:

- package;
- proceso;
- etapa;
- criticidad efectiva;
- dispositivo;
- aplicación;
- actor y contexto;
- recurso y versión;
- perfil de conectividad;
- timestamps;
- operación local;
- idempotency key;
- intentos;
- receipt;
- estado visible;
- estado autoritativo;
- conflicto;
- decisión;
- resultado;
- capturas o trazas minimizadas.

#### 66. Evidencia física

Cuando la tarea dependa de red, dispositivo o periférico real, la ejecución posterior deberá incluir prueba física controlada.

La emulación de navegador podrá complementar, pero no sustituir, la evidencia que dependa de hardware, radio, suspensión, energía, almacenamiento o periféricos.

#### 67. Evidencia negativa

La certificación deberá demostrar activamente que no ocurre:

```text
EFECTO DUPLICADO POR REINTENTO
OPERACIÓN LOCAL MOSTRADA COMO CONFIRMADA
BORRADOR TRANSFERIDO ENTRE ACTORES
MUTACIÓN CON ENVELOPE VENCIDO
LAST WRITE WINS EMPRESARIAL
PÉRDIDA SILENCIOSA DE PENDIENTES
RETRY DE RESULTADO DESCONOCIDO SIN CONSULTA
VACÍO DE COLA ANTES DE REVALIDAR
```

#### 68. Fallo crítico

Un caso es FAIL crítico cuando, entre otros:

- duplica un efecto material;
- pierde evidencia o trabajo autorizado;
- confirma un resultado incierto;
- amplía autoridad;
- mezcla actores o áreas;
- omite un bloqueo `ONLINE_REQUIRED`;
- resuelve conflicto destructivamente;
- no puede reconciliar un hecho crítico;
- impide el resultado mínimo de un `C0` sin contingencia propietaria válida.

#### 69. `BLOCKED`

Una instancia podrá quedar `BLOCKED` únicamente cuando una dependencia obligatoria impida ejecutar el escenario y exista:

- dependencia exacta;
- propietario;
- evidencia del bloqueo;
- condición de salida;
- impacto sobre el package y `GLOBAL-FINAL`.

No se convierte un FAIL observado en `BLOCKED`.

#### 70. `STALE`

Una evidencia previa se considera stale cuando cambia materialmente:

- package;
- contrato de conectividad;
- clase crítica;
- operación;
- esquema;
- dispositivo;
- política de autorización;
- idempotencia;
- dependencia;
- mecanismo de persistencia o reconciliación.

La evidencia stale no autoriza PASS.

#### 71. Hallazgos diferibles

Un hallazgo solo podrá diferirse si:

- no habilita un efecto inseguro;
- no duplica intención;
- no pierde trabajo crítico;
- no oculta resultado desconocido;
- no amplía autoridad;
- no elimina evidencia;
- tiene propietario canónico;
- tiene condición exacta de salida;
- su impacto está documentado.

#### 72. Responsabilidad de fallas

Las fallas de red, proveedor, infraestructura, sincronización o dispositivo no se atribuyen disciplinariamente al trabajador por métricas de tiempo o retry.

La evidencia deberá distinguir acción humana de condición técnica.

#### 73. Criterio de PASS por package

Un package obtiene PASS únicamente si:

1. inventaria todas sus capacidades críticas aplicables;
2. asigna política de conectividad y clase `OF*`;
3. ejecuta todos los escenarios aplicables;
4. preserva trabajo y atribución;
5. no duplica efectos;
6. distingue local de autoritativo;
7. revalida autoridad al volver;
8. respeta dependencias y prioridad;
9. evita `last write wins` empresarial;
10. resuelve o bloquea resultados desconocidos;
11. conserva evidencia suficiente;
12. no mantiene fallos críticos abiertos.

#### 74. Criterio de `GLOBAL-FINAL`

`UX-QA-011::GLOBAL-FINAL` solo puede obtener PASS cuando:

- todos los packages aplicables tienen estado terminal válido;
- ningún package crítico conserva FAIL abierto;
- los escenarios compartidos son coherentes entre aplicaciones;
- no existen dos semánticas incompatibles para local, queued, confirmed o unknown;
- los dispositivos y estaciones aplicables cuentan con evidencia física suficiente;
- los bloqueos restantes tienen propietario y no invalidan la certificación global;
- la evidencia no está stale.

#### 75. Identidad de ejecución física futura

La topología es:

```text
MODE: PER_PACKAGE_AND_GLOBAL_FINAL
EXECUTION_GATE: POST_E5_PACKAGE
```

Identidades futuras:

```text
UX-QA-011::<package_id>
UX-QA-011::GLOBAL-FINAL
```

Aprobar este contrato documental no crea ni ejecuta esas instancias.

#### 76. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea certifica obligaciones ya definidas por contratos y requisitos vigentes. No introduce una nueva obligación que requiera actualizar el registro 04A.

#### 77. Cobertura de prueba vigente reutilizada

La cobertura principal reutilizada, sin modificación, incluye:

- `TREQ-UX-036`;
- `TREQ-UX-250` a `TREQ-UX-273`;
- `TREQ-UX-274` a `TREQ-UX-296` en la frontera de checkpoint y reanudación;
- `TREQ-INTEGRATION-023` y requisitos propietarios de idempotencia, cola, autorización, continuidad y dispositivo que cada package declare aplicables.

Esta lista es trazabilidad reutilizada y no representa requisitos creados o modificados por `UX-QA-011`.

#### 78. Evidencia de validación

| Clase | Estado | Evidencia documental disponible en esta aprobación |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecuta build físico ni de producto para aprobar el contrato documental. |
| LOCAL | NOT_EXECUTED | La incorporación y los validadores reales del checkout corresponden a la batería posterior. |
| REMOTA | PASS | Se revisaron fuentes canónicas remotas vigentes, continuidad, topología, `NFR-REQ-001`, `NFR-REQ-004`, `UX-BASE-013`, `UX-BASE-014`, 04A UX, contratos de interfaz existentes y la base aprobada `UX-QA-010`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recorridos operativos reales bajo degradación durante esta aprobación documental. |
| FÍSICA | NOT_EXECUTED | Las instancias por package y `GLOBAL-FINAL` permanecen sujetas a `POST_E5_PACKAGE` y a pruebas controladas posteriores. |

#### 79. Evidencia mínima posterior por caso

Cada caso deberá permitir responder:

- qué dependencia falló;
- qué criticidad era efectiva;
- qué política de conectividad aplicó;
- qué trabajo se preservó;
- qué efecto se bloqueó o produjo;
- qué estado vio el trabajador;
- qué evidencia local existió;
- qué receipt existió;
- si hubo retry;
- si hubo conflicto;
- si hubo reautorización;
- cómo terminó la reconciliación.

#### 80. Seguridad de la evidencia

No se capturarán en artefactos de prueba:

- PIN;
- tokens;
- secretos;
- credenciales;
- payloads sensibles completos;
- información ajena al caso;
- contenido de otros actores sin necesidad probatoria.

Las referencias de soporte deberán ser no secretas.

#### 81. Criterios de aceptación

- [ ] Se define un contrato de certificación de conectividad inestable por package y global final.
- [ ] `C0`, `C1`, `C2` y overrides críticos se evalúan por criticidad efectiva.
- [ ] Red, servicio, sesión, contexto, frescura, sincronización y periféricos se distinguen.
- [ ] Cada capacidad declara política de conectividad y clase offline aplicable.
- [ ] Local, queued, sent, acknowledged, confirmed y unknown no se confunden.
- [ ] Resultado desconocido nunca produce retry independiente ciego.
- [ ] Las mutaciones reintentables conservan idempotencia estable.
- [ ] Dependencias se sincronizan en orden causal.
- [ ] La reconexión revalida sesión, dispositivo, contexto, versiones y revocaciones antes de enviar.
- [ ] Cambios de actor, área, turno y dispositivo no transfieren autoridad ni borradores.
- [ ] `ONLINE_REQUIRED` bloquea efectos sensibles cuando corresponde.
- [ ] `OF4` exige envelope previo y finito.
- [ ] Contingencia manual conserva numeración, custodia y reconciliación.
- [ ] Conflictos no usan `last write wins` empresarial.
- [ ] Datos stale muestran frescura y limitan acciones.
- [ ] Reinicio, actualización y almacenamiento bajo presión no pierden silenciosamente trabajo.
- [ ] Backend y periféricos se prueban de forma independiente.
- [ ] La UI comunica estados de forma humana y accesible.
- [ ] La evidencia posterior cubre escenarios adversariales aplicables.
- [ ] La prueba física se exige cuando la operación depende de hardware o red real.
- [ ] Las métricas no responsabilizan al trabajador por fallas técnicas.
- [ ] No se crea ni modifica ningún requisito de prueba.
- [ ] No se ejecutan cambios físicos.
- [ ] `UX-QA-012` conserva íntegramente la responsabilidad sobre retorno cross-app y contexto.

#### 82. Límites

Esta tarea:

- no implementa modo offline;
- no crea colas;
- no crea Service Workers;
- no define tecnología de almacenamiento local;
- no modifica idempotencia runtime;
- no crea envelopes de autorización;
- no modifica permisos;
- no modifica Supabase;
- no modifica datos;
- no configura red;
- no compra ni configura hardware;
- no ejecuta contingencias reales;
- no certifica packages sin evidencia posterior a E5;
- no convierte toda aplicación en offline-capable;
- no redefine `NFR-REQ-004` ni `UX-BASE-013`;
- no certifica todavía el retorno entre aplicaciones.

#### 83. Handoff a `UX-QA-012`

`UX-QA-011` entrega a `UX-QA-012`:

- actor y contexto revalidados después de degradación;
- aplicación propietaria;
- proceso e instancia;
- tarea y paso semántico;
- recurso y versión;
- estado de conectividad;
- estado de sincronización;
- operaciones pendientes;
- receipts disponibles;
- conflictos;
- resultado confirmado, pendiente o desconocido;
- checkpoint recuperable cuando existe;
- evidencia de que la recuperación no heredó autoridad.

`UX-QA-012` podrá certificar el retorno entre aplicaciones sin reabrir la política de conectividad.

#### 84. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-010 — Los cambios conservan trazabilidad`

**TAREA ACTUAL APROBADA**
`UX-QA-011 — Las tareas críticas soportan conectividad inestable`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-012 — El retorno entre aplicaciones conserva contexto`
### ✅ UX-QA-012 — El retorno entre aplicaciones conserva contexto

**Estado:** APROBADA
**Tarea anterior:** UX-QA-011 — Las tareas críticas soportan conectividad inestable
**Tarea siguiente:** UX-QA-013 — El retorno conserva el proceso cuando corresponde
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por package y globalmente que un retorno entre aplicaciones conserva la identidad del trabajo, el objeto empresarial, el punto de retorno, el contexto humano necesario, el resultado y la evidencia aplicables, sin transportar autoridad, restaurar contexto obsoleto, depender del historial del navegador ni decidir todavía si el proceso debe permanecer reanudable
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de retorno cross-app con conservación de contexto definido; las ejecuciones `UX-QA-012::<package_id>` y `UX-QA-012::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff de `UX-QA-011`, `UX-QA-008`, `UX-BASE-008`, `UX-BASE-014`, contratos de pantalla, handoff e integración y cobertura vigente, pero no afirma que un package desplegado haya demostrado todavía retorno real entre aplicaciones
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican rutas, deep links, componentes, contratos runtime, consumidores, eventos, colas, checkpoints, permisos, sesiones, datos, Supabase, dispositivos, despliegues ni aplicaciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS certificará que una persona que sale de una aplicación para completar, revisar o intentar una parte del trabajo en otra aplicación puede regresar sin perder ni reconstruir manualmente el contexto que todavía es válido.

La certificación deberá responder, para cada package aplicable:

```text
¿A QUÉ TRABAJO SE ESTÁ REGRESANDO?
¿A QUÉ PROCESO E INSTANCIA PERTENECE?
¿QUÉ RECURSO Y VERSIÓN SON RELEVANTES?
¿CUÁL ERA EL PUNTO DE ORIGEN Y EL RETORNO DECLARADO?
¿QUÉ RESULTADO PRODUJO O NO PRODUJO LA APLICACIÓN DESTINO?
¿QUÉ ESTADO PENDIENTE, CONFLICTO O RECEIPT DEBE SEGUIR VISIBLE?
¿QUÉ CONTEXTO HUMANO PUEDE CONSERVARSE?
¿QUÉ CONTEXTO DEBE REVALIDARSE?
¿QUÉ INFORMACIÓN NO PUEDE RESTAURARSE COMO AUTORIDAD?
¿QUÉ OCURRE SI EL RETORNO YA NO ES VÁLIDO?
```

Regla central:

```text
VOLVER A UNA APLICACIÓN
!=
VOLVER AL CONTEXTO CORRECTO
```

#### 2. Resultado canónico

`UX-QA-012` establece `UX-QA-CROSS-APP-RETURN-CONTEXT-CERTIFICATION-001@1.0.0`.

El resultado define:

- unidad certificable de retorno entre aplicaciones;
- identidad mínima del trabajo que debe sobrevivir al viaje cross-app;
- relación entre `return_contract`, origen, destino y siguiente superficie;
- contexto humano preservable y contexto autoritativo revalidable;
- tratamiento de éxito, rechazo, cancelación, expiración, aceptación parcial y reconciliación;
- persistencia de resultado, receipt, conflicto y operación pendiente durante el retorno;
- retorno válido, inválido, obsoleto y no aplicable;
- comportamiento en actor, sesión, área, dispositivo o versión cambiados;
- relación con `CrossAppHandoff` y checkpoints semánticos ya materializados;
- casos positivos y negativos por package;
- criterio `GLOBAL-FINAL`;
- handoff exacto a `UX-QA-013`.

#### 3. Alcance exacto

La certificación aplica cuando un flujo aprobado declara al menos una transición entre aplicaciones y un retorno o siguiente destino relacionado con el mismo trabajo.

Incluye, cuando apliquen:

- SHELL hacia una aplicación propietaria y retorno;
- aplicación A hacia aplicación B y retorno a A;
- aplicación A hacia aplicación B y retorno a una superficie transversal;
- aplicación A hacia aplicación B y retorno a otra pantalla de A;
- retorno después de una acción confirmada;
- retorno después de cancelación o rechazo;
- retorno con resultado pendiente;
- retorno con aceptación parcial;
- retorno con conflicto o reconciliación requerida;
- deep link semántico con `return_contract`;
- handoff desde tablet, kiosco, desktop o móvil cuando el package lo soporte;
- retorno después de conectividad degradada cuando `UX-QA-011` ya entregó estado recuperable.

No exige un retorno cuando el contrato del proceso determina legítimamente que el siguiente trabajo permanece en la aplicación destino o concluye allí.

#### 4. Handoff recibido de `UX-QA-011`

`UX-QA-011` entrega:

- actor y contexto revalidados después de degradación;
- aplicación propietaria;
- proceso e instancia;
- tarea y paso semántico;
- recurso y versión;
- estado de conectividad;
- estado de sincronización;
- operaciones pendientes;
- receipts disponibles;
- conflictos;
- resultado confirmado, pendiente o desconocido;
- checkpoint recuperable cuando existe;
- evidencia de que la recuperación no heredó autoridad.

`UX-QA-012` usa ese estado para evaluar el retorno cross-app sin reabrir la política de conectividad.

#### 5. Frontera con `UX-QA-008`

`UX-QA-008` certifica la continuidad completa de un proceso al cruzar aplicaciones:

```text
ORIGEN
→ HANDOFF
→ DESTINO
→ REVALIDACIÓN
→ ACCIÓN
→ RESULTADO
→ RETORNO O SIGUIENTE PASO
```

`UX-QA-012` especializa únicamente la parte:

```text
RESULTADO O ESTADO EN DESTINO
→ RETORNO
→ CONTEXTO CORRECTO EN LA SUPERFICIE RESULTANTE
```

Un package puede haber demostrado que llega correctamente al destino y aun fallar esta tarea si vuelve a una portada genérica, pierde el recurso, pierde el receipt, restaura filtros equivocados o reconstruye autoridad desde el origen.

#### 6. Frontera con `UX-QA-011`

`UX-QA-011` responde:

```text
¿LA TAREA CRÍTICA SIGUE SIENDO SEGURA Y RECUPERABLE
CUANDO LA CONECTIVIDAD SE DEGRADA?
```

`UX-QA-012` responde:

```text
¿AL REGRESAR ENTRE APLICACIONES
SE CONSERVA EL CONTEXTO CORRECTO DEL TRABAJO?
```

La conectividad puede ser estable y el retorno fallar por navegación, identidad, versión o contexto incorrectos.

#### 7. Frontera con `UX-QA-013`

`UX-QA-013` certificará si el retorno conserva el proceso cuando corresponde.

`UX-QA-012` no decide todavía si el proceso debe:

- continuar;
- permanecer pausado;
- cerrar;
- avanzar a otra etapa;
- quedar superseded;
- exigir handoff;
- exigir reasignación;
- entrar en conciliación.

Regla:

```text
CONTEXTO DE RETORNO CORRECTO
!=
DECISIÓN DE REANUDABILIDAD DEL PROCESO
```

Esta tarea certifica que el contexto que llega al retorno es correcto. `UX-QA-013` decidirá si ese contexto debe conservar un proceso activo o presentar otro estado de continuidad.

#### 8. Unidad certificable

La unidad mínima es:

```text
PACKAGE
+
RELACIÓN CROSS-APP APLICABLE
+
ESCENARIO DE RETORNO
+
RESULTADO OBSERVABLE
```

Cada relación deberá identificar:

- aplicación origen;
- aplicación destino;
- proceso;
- instancia;
- recurso;
- acción o trabajo pendiente;
- `return_contract` cuando exista;
- resultado esperado del destino;
- superficie esperada después del retorno.

#### 9. Relación canónica antes de navegar

La relación de handoff debe existir antes de renderizar o navegar.

No se certifica una relación inferida por:

- coincidencia de rutas;
- nombre de pantalla;
- que dos aplicaciones compartan un componente;
- que el usuario tenga acceso a ambas;
- historial del navegador;
- query string arbitraria;
- una URL copiada;
- estado React;
- una preferencia local.

La relación debe provenir del contrato canónico aplicable.

#### 10. Identidad mínima del trabajo

Cuando existan, el retorno deberá conservar referencias suficientes a:

```text
process_id
process_instance_id
task_or_work_item_ref
business_object_ref
resource_version_or_observed_version
source_application
source_screen_or_surface
destination_application
destination_screen_or_surface
return_contract
pending_action_ref
checkpoint_ref
correlation_ref
receipt_ref
```

La forma es conceptual. La tarea no crea un payload runtime nuevo.

#### 11. Mismo proceso e instancia

Un retorno válido no debe cambiar silenciosamente de proceso o instancia.

Regla:

```text
MISMO RECURSO VISUAL
!=
MISMA INSTANCIA EMPRESARIAL
```

La prueba falla si el retorno abre un recurso parecido, otra orden, otro lote, otra entrega, otra persona o una instancia distinta por heurística.

#### 12. Recurso exacto

El retorno deberá preservar la identidad del recurso aplicable.

No son sustitutos válidos:

- primer resultado de búsqueda;
- último recurso abierto;
- fila seleccionada previamente sin verificación;
- alias ambiguo;
- nombre visible sin identificador estable;
- recurso de otra área con la misma etiqueta.

#### 13. Versión y estado observado

La versión transportada permite detectar cambio, no imponer el estado anterior.

Regla:

```text
VERSIÓN DE ORIGEN
=
REFERENCIA PARA COMPARAR

VERSIÓN DE ORIGEN
!=
VERDAD AUTORITATIVA AL REGRESAR
```

Si el recurso cambió, la superficie de retorno deberá reflejar el estado vigente y explicar la diferencia cuando sea material.

#### 14. `return_contract`

El `return_contract` determina el destino semántico previsto después del handoff.

Debe permitir resolver, según el contrato del proceso:

- aplicación de retorno;
- superficie o intención de retorno;
- recurso o trabajo relacionado;
- condición de retorno;
- comportamiento ante éxito;
- comportamiento ante cancelación;
- comportamiento ante rechazo;
- comportamiento ante resultado pendiente o incierto.

No transporta permiso ni autoridad.

#### 15. Retorno no equivalente al botón Atrás

El botón Atrás del navegador, del sistema operativo o de una shell puede coincidir con el retorno correcto, pero no constituye su contrato.

La prueba falla si la única estrategia de retorno es:

```text
HISTORY.BACK
```

sin demostrar identidad del trabajo y destino semántico.

#### 16. Contexto persistente visible

La experiencia deberá conservar, cuando aplique, contexto humano suficiente para reconocer:

- de dónde viene el trabajo;
- a qué aplicación se fue;
- qué proceso o tarea sigue relacionada;
- qué recurso se está tratando;
- qué paso o acción motivó el handoff;
- qué resultado se obtuvo;
- qué queda pendiente;
- qué bloqueo existe;
- cuál es la siguiente acción segura.

#### 17. `CrossAppHandoff`

La materialización vigente `CrossAppHandoff` presenta siete estados:

```text
OFFERED
ACCEPTED
REJECTED
EXPIRED
CANCELLED
PARTIALLY_ACCEPTED
RECONCILIATION_REQUIRED
```

Y conserva siete slots semánticos:

```text
PERSISTENT_CONTEXT
BLOCKING_STATE
WORK_IDENTITY
STEP_CONTENT
PRIMARY_ACTION
SECONDARY_SUPPORT
RESULT_AND_RECEIPT
```

`UX-QA-012` no exige que todos los consumidores usen un componente específico, pero el comportamiento observable deberá preservar semántica equivalente cuando el package declare ese patrón.

#### 18. `PERSISTENT_CONTEXT`

El contexto persistente debe permitir que la persona reconozca la continuidad sin reconstruirla mentalmente.

Puede incluir:

- origen y destino humanos;
- proceso o caso;
- sede y área como contexto visible;
- momento relevante;
- estado del handoff;
- información de retorno.

No puede convertir esos valores en autoridad runtime.

#### 19. `WORK_IDENTITY`

La identidad del trabajo deberá seguir perceptible durante y después del retorno.

Ejemplos conceptuales:

```text
Recepción OC-2026-00418
Entrega RM-2026-00183
Lote LOT-2026-00091
Solicitud SOL-2026-00107
```

La etiqueta humana complementa, no reemplaza, la identidad estable.

#### 20. `STEP_CONTENT`

El paso presentado deberá corresponder al estado real del handoff.

No se mostrará:

- acción ya completada como pendiente;
- acción rechazada como disponible;
- aceptación parcial como éxito global;
- resultado desconocido como confirmado;
- una acción de otra aplicación por conveniencia visual.

#### 21. `RESULT_AND_RECEIPT`

Cuando exista resultado o receipt, deberá permanecer relacionado con el mismo trabajo durante el retorno.

El receipt puede demostrar recepción o resultado según su contrato; no se interpreta genéricamente como éxito empresarial.

#### 22. Contexto humano frente a autoridad

Regla:

```text
CONTEXTO HUMANO PRESERVADO
!=
ACCESS CONTEXT REUTILIZADO SIN REVALIDACIÓN
```

Se puede mostrar como referencia:

- actor anterior;
- sede;
- área;
- turno;
- aplicación origen;
- filtro o agrupación;
- recurso;
- paso.

La siguiente acción material debe usar autoridad vigente resuelta por su propietario.

#### 23. Contexto que nunca se restaura como autoridad

No se conservarán como autorización por el retorno:

- permission codes vistos anteriormente;
- roles efectivos no revalidados;
- grants;
- claims de UI;
- tokens;
- secretos;
- PIN;
- sesión asumida como válida;
- actor autoritativo transportado por URL;
- estado objetivo impuesto por cliente;
- aprobación previa reutilizada en otro recurso;
- excepción vencida;
- step-up vencido.

#### 24. Actor emisor y actor receptor

El actor emisor permanece atribuible al handoff cuando corresponda.

El actor que ejecutará una acción en destino o después del retorno deberá revalidarse.

```text
ACTOR EMISOR
!=
AUTORIDAD AUTOMÁTICA DEL ACTOR ACTUAL
```

#### 25. Mismo actor

Cuando el mismo actor continúa:

- la identidad puede mostrarse de forma consistente;
- la sesión se revalida según política;
- el contexto operativo se compara con el vigente;
- las referencias del trabajo se conservan;
- no se solicita recapturar información ya conocida sin causa.

#### 26. Cambio de actor

Si el actor cambia durante el handoff o antes del retorno:

- el contexto anterior no se reasigna silenciosamente;
- datos personales del actor anterior se protegen;
- la nueva autoridad se resuelve desde cero según contrato;
- el trabajo solo se muestra o acepta si el nuevo actor puede verlo;
- un borrador personal no cambia de dueño por navegación.

#### 27. Sesión expirada

Si la sesión expira en destino o durante el retorno:

- se conserva referencia segura al trabajo;
- no se conserva autoridad vencida;
- se reautentica cuando corresponda;
- se resuelve contexto nuevo;
- se vuelve al trabajo únicamente si sigue permitido y válido.

#### 28. Sede y área

Sede y área pueden formar parte del contexto humano preservado.

La prueba deberá distinguir:

```text
ÁREA MOSTRADA
!=
ÁREA AUTORIZADA PARA LA SIGUIENTE MUTACIÓN
```

Si cambian sede o área, el retorno debe mostrar el cambio material y revalidar las condiciones aplicables.

#### 29. Turno y check-in

Cuando turno o check-in sean relevantes:

- pueden viajar como referencia observada;
- se comparan con el estado actual;
- no se reactivan por volver a una pantalla;
- una expiración no se oculta restaurando el contexto anterior.

#### 30. Dispositivo compartido

En dispositivos compartidos, el retorno deberá:

- preservar la identidad del trabajo sin exponer información privada innecesaria;
- revalidar actor;
- no mostrar borradores de otro trabajador;
- no recuperar autoridad desde el dispositivo;
- limpiar datos personales conforme al contrato aplicable;
- permitir continuidad solo si la política del dispositivo lo soporta.

#### 31. Cambio de dispositivo

Un retorno en otro dispositivo solo será válido cuando exista una referencia sincronizada o transferencia segura aprobada.

No se prometerá recuperar:

- borradores solo locales;
- archivos no sincronizados;
- selecciones efímeras;
- estado UI que nunca salió del equipo anterior.

#### 32. Éxito confirmado en destino

Si la aplicación destino confirma un efecto empresarial:

- el retorno conserva el mismo caso;
- muestra el resultado vigente;
- conserva receipt o referencia de resultado cuando aplique;
- no ofrece repetir la misma intención por defecto;
- puede conducir al siguiente paso definido por contrato.

#### 33. Navegación completada sin éxito empresarial

Regla:

```text
APLICACIÓN DESTINO ABIERTA
!=
HANDOFF ACEPTADO

NAVEGACIÓN COMPLETADA
!=
EFECTO EMPRESARIAL CONFIRMADO
```

La UI no inferirá aceptación por abrir, visualizar o cerrar una aplicación.

#### 34. `OFFERED`

`OFFERED` conserva la oferta y el contexto, pero no transfiere responsabilidad ni confirma efecto.

El retorno debe mostrar el trabajo como todavía no aceptado cuando esa sea la realidad.

#### 35. `ACCEPTED`

`ACCEPTED` requiere el resultado propietario aplicable y no se deduce de navegación.

El retorno podrá avanzar únicamente sobre el estado confirmado.

#### 36. `REJECTED`

`REJECTED` no cancela todo el proceso por inferencia.

El retorno deberá conservar:

- identidad del caso;
- rechazo;
- causa segura cuando corresponda;
- siguiente acción gobernada;
- información preservada necesaria.

La decisión sobre continuidad posterior pertenece a `UX-QA-013`.

#### 37. `EXPIRED`

Un handoff expirado:

- no reutiliza autoridad vencida;
- conserva identidad y evidencia necesarias;
- no se presenta como aceptado;
- vuelve a una superficie segura que explique la condición.

#### 38. `CANCELLED`

`CANCELLED` no se deriva de cerrar un modal, pestaña o aplicación.

La cancelación debe provenir del contrato propietario y el retorno debe reflejar su estado real.

#### 39. `PARTIALLY_ACCEPTED`

Una aceptación parcial:

- no se presenta como éxito global;
- conserva elementos aceptados, rechazados y pendientes;
- preserva correlación y evidencia;
- impide repetir efectos ya aceptados;
- muestra el estado residual que debe resolverse.

#### 40. `RECONCILIATION_REQUIRED`

Cuando el estado exige conciliación:

- el retorno conserva la incertidumbre;
- no corrige cross-app por inferencia;
- no ofrece retry ciego;
- preserva evidencia y referencias;
- dirige a la responsabilidad propietaria correspondiente.

#### 41. Resultado desconocido

Si existe `RESULT_UNKNOWN` en un contrato relacionado:

- se consulta idempotencia, receipt o estado antes de ofrecer repetición;
- el retorno no crea una intención nueva;
- la persona ve que el resultado sigue sin determinarse;
- el siguiente paso permanece bloqueado o gobernado hasta clasificar el resultado.

#### 42. Cancelar y volver

Cuando la persona cancela legítimamente una acción en destino:

- vuelve al contexto de origen todavía aplicable;
- no se marca la acción como completada;
- no desaparece el caso;
- se conserva lo que pueda preservarse sin inventar efecto;
- se muestra la siguiente acción segura.

#### 43. Rechazo y volver

El retorno después de rechazo debe permitir comprender:

- qué fue rechazado;
- qué permanece vigente;
- qué trabajo no se perdió;
- quién puede resolver;
- si existe alternativa legítima.

No se vuelve a una pantalla neutra que oculte el rechazo.

#### 44. Conflicto y volver

Ante conflicto:

- el retorno conserva recurso y versiones relevantes;
- muestra que el trabajo necesita revisión;
- no sobrescribe el servidor;
- no aplica `last write wins`;
- no cambia a otro recurso para salir del bloqueo.

#### 45. Recurso cerrado o sustituido

Si el recurso fue completado, cancelado, fusionado, sustituido o retirado durante el handoff:

- el retorno no reabre el recurso por restaurar UI;
- conserva la identidad original para explicación;
- muestra el estado vigente;
- ofrece únicamente acciones permitidas por el contrato actual.

#### 46. Ruta de retorno obsoleta

Una ruta, pantalla o deep link retirados no podrán convertirse en una vuelta silenciosa a una superficie incorrecta.

El sistema deberá:

- resolver compatibilidad aprobada cuando exista;
- fallar cerrado cuando no exista;
- conservar el caso;
- explicar que el destino anterior dejó de ser válido;
- no adivinar un replacement por similitud de nombre.

#### 47. Retorno inválido

Un retorno es inválido cuando, por ejemplo:

- apunta a otra aplicación sin relación canónica;
- el proceso o instancia no coinciden;
- el recurso no coincide;
- la superficie fue retirada sin compatibilidad;
- el actor no puede acceder al trabajo;
- el contexto es incompatible;
- el contrato de retorno expiró;
- la evidencia recibida contradice el estado vigente.

Un retorno inválido falla cerrado y preserva información suficiente para recuperación segura.

#### 48. Retorno desde SHELL

SHELL puede actuar como superficie transversal de entrada o retorno.

SHELL puede mostrar:

- contexto;
- identidad del trabajo;
- estado del handoff;
- resultado o bloqueo;
- siguiente destino permitido.

SHELL no ejecuta por ello la mutación propietaria ni se convierte en fuente del estado empresarial.

#### 49. Retorno hacia SHELL

Volver a SHELL después de una aplicación propietaria deberá conservar, cuando aplique:

- tarea o caso relacionado;
- aplicación propietaria;
- resultado confirmado o pendiente;
- bloqueo;
- siguiente acción;
- receipt seguro;
- referencia del contexto.

No basta con volver al launcher general sin relación con el trabajo.

#### 50. Retorno aplicación a aplicación

Cuando una aplicación retorna directamente a otra:

- la relación debe estar aprobada;
- el destino de retorno debe estar resuelto;
- la aplicación receptora revalida actor, contexto y permiso;
- la identidad del trabajo se conserva;
- la mutación sigue perteneciendo a su propietaria;
- el retorno no crea una relación nueva.

#### 51. Return target y navegación

El target de retorno podrá materializarse mediante la tecnología apropiada del package, pero la certificación observa semántica, no implementación concreta.

Puede ser:

- deep link opaco;
- navegación interna coordinada;
- shell route;
- intent móvil;
- mecanismo equivalente aprobado.

La tecnología no puede ser la fuente de autoridad.

#### 52. Deep link opaco

Un deep link válido no transporta:

- permiso;
- token;
- actor autoritativo;
- AccessContext completo;
- estado objetivo a imponer;
- secretos;
- aprobación.

Transporta únicamente referencias necesarias y no secretas según contrato.

#### 53. Filtros y selección

Un retorno puede conservar filtros o selección como ayuda de orientación cuando:

- siguen siendo reproducibles;
- no amplían el universo autorizado;
- no ocultan cambios materiales;
- no sustituyen territorio ni permiso;
- la selección sigue correspondiendo al recurso esperado.

#### 54. Contexto administrativo

Si el origen era una superficie administrativa:

- filtros, periodo, sede o agrupación pueden conservarse como presentación;
- no se convierten en alcance autoritativo;
- una fila seleccionada no equivale a permiso de mutación;
- el retorno conserva la consulta solo si sigue siendo válida y segura.

#### 55. Contexto operativo

Si el origen era una tarea operativa:

- se preserva la identidad exacta del trabajo;
- se preserva área y estación como referencia;
- se revalida actor y contexto;
- no se obliga a volver a navegar desde una portada;
- no se pierde el resultado producido en destino.

#### 56. Trabajo pendiente

El retorno debe conservar perceptible cualquier trabajo todavía pendiente.

Ejemplos:

- falta aceptación;
- falta confirmación del servidor;
- falta conciliación;
- falta revisión de diferencia;
- falta reautenticación;
- falta acción de otro actor.

No se oculta un pendiente porque la pantalla origen volvió a cargar.

#### 57. Operaciones locales o pendientes de sincronización

Cuando `UX-QA-011` haya dejado operaciones locales o pendientes:

- el retorno conserva su identidad;
- no las marca como completadas;
- no genera duplicados;
- muestra estado de sincronización;
- revalida antes de ejecutar efectos posteriores.

#### 58. Receipts

El retorno conservará referencias a receipts que sean necesarias para explicar el resultado.

Se distinguirá:

```text
RECEIPT DE RECEPCIÓN
RECEIPT DE EFECTO
RESULTADO EMPRESARIAL
```

cuando el contrato los separe.

#### 59. Correlación y causalidad

Cuando el proceso ya define correlación o causalidad, el retorno deberá conservarla.

No se crea una correlación nueva solo por volver a otra aplicación.

#### 60. Borradores

Un retorno solo puede recuperar un borrador cross-app cuando existe un contrato que lo permita.

Sin contrato:

```text
REFERENCIA AL TRABAJO
SÍ

COPIA ARBITRARIA DEL BORRADOR
NO
```

#### 61. Archivos y evidencia

Si un handoff incluye evidencia:

- se conserva su referencia;
- un archivo local no se declara subido;
- un upload no vinculado no se declara evidencia confirmada;
- el retorno muestra el estado real;
- no se pierde la relación con el recurso.

#### 62. Periféricos

Si el destino interactúa con impresora, cámara, escáner, báscula o datáfono:

- el retorno conserva el resultado conocido o desconocido;
- no infiere ejecución física por navegación;
- no repite el comando sin resolver estado cuando exista riesgo de doble efecto.

#### 63. Conectividad inestable durante el retorno

La pérdida de conectividad durante el retorno no cambia las reglas de contexto.

Se conserva:

- identidad del trabajo;
- estado local o pendiente;
- resultado conocido;
- receipt disponible;
- bloqueo;
- checkpoint.

La reanudación técnica permanece gobernada por `UX-QA-011` y contratos propietarios.

#### 64. Reinicio durante el retorno

Si la aplicación o dispositivo se reinicia entre destino y retorno:

- la UI no reconstruye autoridad desde almacenamiento local;
- recupera únicamente referencias permitidas;
- revalida actor y contexto;
- consulta estado vigente;
- clasifica trabajo pendiente antes de continuar.

#### 65. Actualización de aplicación

Una actualización no puede hacer que un return target incompatible abra un contexto parecido por heurística.

Si el contrato cambió:

- se aplica compatibilidad explícita;
- se migra referencia cuando exista regla aprobada;
- o se falla cerrado conservando el caso.

#### 66. Accesibilidad

El contexto de retorno deberá ser perceptible por:

- texto;
- estructura semántica;
- teclado cuando aplique;
- lector de pantalla;
- tacto en superficies compatibles.

El estado no dependerá únicamente de color, animación, posición visual o icono.

#### 67. Privacidad

La continuidad no justifica mostrar información innecesaria de:

- actor anterior;
- cliente;
- trabajador;
- datos sensibles;
- otros recursos;
- filtros privados;
- payloads técnicos.

El retorno muestra solo lo necesario para reconocer y continuar de forma segura.

#### 68. Caso positivo mínimo

Un caso positivo demuestra:

1. relación cross-app aprobada;
2. misma instancia empresarial antes y después;
3. mismo recurso esperado;
4. `return_contract` o destino equivalente resuelto;
5. resultado de destino correctamente clasificado;
6. contexto humano preservado;
7. autoridad revalidada;
8. receipt o pendiente conservado cuando aplica;
9. retorno a la superficie correcta;
10. cero recaptura innecesaria del contexto conocido.

#### 69. Casos positivos obligatorios por package

Según alcance, deberán incluir:

- éxito confirmado y retorno;
- cancelación y retorno;
- rechazo y retorno;
- aceptación parcial y retorno;
- reconciliación requerida y retorno;
- sesión expirada;
- versión cambiada;
- retorno hacia SHELL;
- retorno desde SHELL;
- aplicación A → B → A;
- aplicación A → B → superficie transversal;
- dispositivo compartido cuando aplique;
- conectividad degradada cuando aplique.

Los casos no aplicables deberán justificarse por el package.

#### 70. Casos negativos mínimos

La certificación deberá detectar:

- volver a portada genérica;
- volver a recurso distinto;
- perder proceso o instancia;
- perder receipt;
- perder estado pendiente;
- restaurar permiso desde URL;
- restaurar actor anterior como autoridad;
- aceptar handoff por navegación;
- presentar aceptación parcial como éxito;
- ocultar rechazo;
- ocultar conflicto;
- usar browser back como única semántica;
- recuperar borrador ajeno;
- restaurar filtro como territorio autorizado;
- repetir efecto ya confirmado;
- abrir ruta retirada sin compatibilidad;
- inferir recurso por heurística;
- perder correlación;
- exponer secreto en el enlace;
- borrar contexto por reinicio.

#### 71. Oracle de retorno

Para cada caso:

```text
SI no existe relación cross-app aplicable
→ N/A

SI existe relación pero no existe retorno en el contrato
→ N/A para retorno; no inventar uno

SI el retorno cambia proceso, instancia o recurso sin contrato
→ FAIL

SI el retorno depende solo de historial de navegación
→ FAIL

SI se pierde resultado, receipt, pendiente o conflicto material
→ FAIL

SI se restaura autoridad desde el origen
→ FAIL

SI el destino de retorno dejó de ser válido y se abre otro por heurística
→ FAIL

SI se preserva identidad, contexto humano, resultado y siguiente destino seguro
Y la autoridad se revalida
→ PASS
```

#### 72. Identidad del caso de prueba

Cada caso deberá declarar, como mínimo:

- `case_id`;
- package;
- relación cross-app;
- aplicación origen;
- aplicación destino;
- superficie origen;
- superficie destino;
- proceso;
- instancia;
- recurso;
- versión observada;
- estado del handoff;
- resultado de destino;
- `return_contract` o equivalente;
- contexto esperado al retornar;
- autoridad que debe revalidarse;
- evidencia;
- resultado observado;
- veredicto.

#### 73. Evidencia mínima posterior

La evidencia posterior deberá permitir reconstruir:

- origen;
- destino;
- relación canónica;
- proceso e instancia;
- recurso;
- actor emisor;
- actor actual cuando corresponda;
- contexto visible;
- contexto revalidado;
- estado del handoff;
- resultado o receipt;
- destino de retorno;
- superficie finalmente mostrada;
- diferencias encontradas;
- veredicto.

#### 74. Evidencia de navegación no suficiente por sí sola

No bastan por sí solos:

- screenshot final;
- URL final;
- que la app correcta esté abierta;
- que el usuario pueda pulsar Atrás;
- que el componente renderice;
- que el deep link responda;
- que el route name coincida;
- que exista un botón Volver.

La evidencia debe relacionar navegación con el mismo trabajo y contexto.

#### 75. Evidencia física actual y límite

Existe materialización física compartida de contratos y presentación cross-app, incluyendo relaciones estáticas de handoff y `CrossAppHandoff`.

Esa existencia:

- permite inspección contractual;
- permite pruebas unitarias o estáticas de componentes;
- no demuestra por sí sola adopción por consumidores;
- no demuestra retorno end-to-end de un package;
- no sustituye la ejecución posterior `UX-QA-012::<package_id>`.

#### 76. Estado de certificación por package

Estados permitidos del caso o package:

```text
PASS
FAIL
BLOCKED
STALE
```

`BLOCKED` exige dependencia externa o evidencia imposible de obtener todavía. Un comportamiento incorrecto observado es `FAIL`, no `BLOCKED`.

#### 77. `STALE`

La evidencia previa se vuelve stale cuando cambia materialmente:

- `return_contract`;
- relación de handoff;
- ruta o deep link;
- proceso;
- recurso;
- versión del contrato;
- política de autorización;
- aplicación propietaria;
- superficie de retorno;
- semántica de estado;
- componente compartido consumido;
- package evaluado.

#### 78. Hallazgos diferibles

Un hallazgo solo podrá diferirse si:

- no cambia de recurso o proceso;
- no pierde trabajo;
- no oculta resultado o conflicto;
- no amplía autoridad;
- no provoca doble efecto;
- no expone información sensible;
- tiene owner canónico;
- tiene condición exacta de salida;
- su impacto sobre `GLOBAL-FINAL` queda documentado.

#### 79. Criterio de PASS por package

Un package obtiene PASS únicamente si:

1. inventaria todas sus relaciones de retorno aplicables;
2. demuestra mismo proceso, instancia y recurso donde corresponda;
3. preserva contexto humano suficiente;
4. revalida autoridad;
5. conserva resultado, receipt, pendiente y conflicto cuando aplican;
6. no depende del historial del navegador como contrato;
7. no adivina return targets;
8. trata correctamente los siete estados de handoff aplicables;
9. protege privacidad en cambios de actor o dispositivo;
10. no repite efectos confirmados;
11. conserva evidencia suficiente;
12. no mantiene fallos críticos abiertos.

#### 80. Criterio de `GLOBAL-FINAL`

`UX-QA-012::GLOBAL-FINAL` solo puede obtener PASS cuando:

- todos los packages aplicables tienen decisión válida;
- ningún flujo cross-app crítico conserva FAIL abierto;
- los contratos de retorno son coherentes entre aplicaciones;
- SHELL no actúa como writer universal;
- no existen dos semánticas incompatibles para aceptación, retorno o receipt;
- los consumidores que declaran retorno cuentan con evidencia suficiente;
- los hallazgos diferidos no invalidan el contexto global;
- la evidencia no está stale.

#### 81. Identidad de ejecución física futura

La topología es:

```text
MODE: PER_PACKAGE_AND_GLOBAL_FINAL
EXECUTION_GATE: POST_E5_PACKAGE
```

Identidades futuras:

```text
UX-QA-012::<package_id>
UX-QA-012::GLOBAL-FINAL
```

Aprobar este contrato documental no crea ni ejecuta esas instancias.

#### 82. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea certifica obligaciones ya definidas por contratos y requisitos vigentes. No introduce una obligación verificable nueva que requiera actualizar el registro 04A.

#### 83. Cobertura de prueba vigente reutilizada

La cobertura principal reutilizada, sin modificación, incluye:

- `TREQ-UX-034`;
- `TREQ-UX-144`;
- `TREQ-UX-149`;
- `TREQ-UX-290`;
- `TREQ-UX-369`;
- `TREQ-INTEGRATION-005`;
- `TREQ-INTEGRATION-023`;
- requisitos propietarios de handoff, autorización, idempotencia, checkpoint, navegación y retorno que cada package declare aplicables.

Esta lista es trazabilidad reutilizada y no representa requisitos creados o modificados por `UX-QA-012`.

#### 84. Evidencia de validación

| Clase | Estado | Evidencia documental disponible en esta aprobación |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecuta build físico ni de producto para aprobar el contrato documental. |
| LOCAL | NOT_EXECUTED | La incorporación y los validadores reales del checkout corresponden a la batería posterior. |
| REMOTA | PASS | Se revisaron fuentes canónicas remotas vigentes, continuidad, topología, `UX-QA-008`, `UX-BASE-008`, contratos de pantalla y handoff, 04A UX, materialización `CrossAppHandoff` y la base aprobada `UX-QA-011`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recorridos end-to-end entre aplicaciones durante esta aprobación documental. |
| FÍSICA | NOT_EXECUTED | Las instancias por package y `GLOBAL-FINAL` permanecen sujetas a `POST_E5_PACKAGE`. |

#### 85. Seguridad de la evidencia

La evidencia no deberá contener:

- tokens;
- secretos;
- PIN;
- credenciales;
- payloads sensibles completos;
- AccessContext serializado innecesariamente;
- datos privados de otro actor;
- URLs con información secreta;
- contenido no necesario para demostrar el retorno.

#### 86. Fallos críticos

Bloquean PASS del package:

- retorno a proceso o instancia incorrectos;
- retorno a recurso incorrecto;
- autoridad transportada o restaurada sin revalidación;
- resultado pendiente presentado como confirmado;
- aceptación inferida por navegación;
- receipt o conflicto material perdido;
- efecto duplicado al volver;
- retorno inválido resuelto por heurística;
- contexto de otro actor expuesto o heredado;
- secreto transportado por enlace;
- incapacidad de relacionar origen, destino y retorno con el mismo caso.

#### 87. Casos fuera de alcance

Quedan fuera de esta aprobación documental:

- crear rutas;
- crear deep links;
- cambiar `return_contract` runtime;
- implementar navegadores o routers;
- migrar consumidores;
- publicar `@vento/ui-web`;
- implementar persistencia de checkpoints;
- crear inbox u outbox;
- modificar autorización;
- modificar contratos de idempotencia;
- cambiar aplicaciones;
- modificar Supabase;
- modificar datos;
- ejecutar pruebas físicas;
- certificar que el proceso debe permanecer activo después del retorno.

#### 88. Criterios de aceptación

- [ ] Se define un contrato de certificación de retorno cross-app por package y global final.
- [ ] El retorno conserva proceso, instancia y recurso cuando el contrato así lo exige.
- [ ] `return_contract` se trata como destino semántico y no como autoridad.
- [ ] El retorno no depende únicamente del historial del navegador.
- [ ] Contexto humano y autoridad runtime permanecen separados.
- [ ] El actor receptor o actual se revalida antes de una acción material.
- [ ] Sede, área, turno y check-in preservados como referencia no sustituyen el contexto vigente.
- [ ] El resultado de destino permanece correctamente clasificado al volver.
- [ ] Receipt, conflicto, pendiente y reconciliación no se pierden por navegación.
- [ ] Abrir una aplicación no equivale a aceptar un handoff.
- [ ] `OFFERED`, `ACCEPTED`, `REJECTED`, `EXPIRED`, `CANCELLED`, `PARTIALLY_ACCEPTED` y `RECONCILIATION_REQUIRED` mantienen semánticas distintas.
- [ ] La aceptación parcial no se presenta como éxito global.
- [ ] Un retorno inválido falla cerrado y no adivina destino por heurística.
- [ ] Un recurso cerrado o sustituido no se reabre por restaurar UI.
- [ ] Deep links no transportan permiso, token, actor autoritativo ni estado objetivo.
- [ ] SHELL puede presentar contexto sin convertirse en writer universal.
- [ ] Cambios de actor o dispositivo no transfieren borradores ni autoridad.
- [ ] Conectividad inestable conserva contexto sin duplicar efectos.
- [ ] La evidencia posterior relaciona origen, destino y retorno con el mismo trabajo.
- [ ] La UI compartida existente no se trata como evidencia suficiente de adopción end-to-end.
- [ ] No se crea ni modifica ningún requisito de prueba.
- [ ] No se ejecutan cambios físicos.
- [ ] `UX-QA-013` conserva íntegramente la responsabilidad de certificar si el proceso debe permanecer conservado o reanudable después del retorno.

#### 89. Límites

Esta tarea:

- no implementa navegación;
- no implementa `return_contract`;
- no crea relaciones de handoff;
- no cambia ownership de aplicaciones;
- no transporta autoridad;
- no implementa retry;
- no implementa idempotencia;
- no resuelve conflictos empresariales;
- no crea checkpoints;
- no migra consumidores;
- no publica componentes;
- no modifica permisos;
- no modifica datos;
- no modifica Supabase;
- no ejecuta pruebas físicas;
- no certifica packages sin evidencia posterior a E5;
- no decide si el proceso debe continuar después del retorno.

#### 90. Handoff a `UX-QA-013`

`UX-QA-012` entrega a `UX-QA-013`:

- relación cross-app validada;
- aplicación origen y destino;
- superficie de retorno;
- proceso e instancia;
- recurso y versión vigente observada;
- actor actual revalidado cuando aplica;
- contexto operativo vigente;
- estado del handoff;
- resultado confirmado, pendiente, rechazado, parcial o en conciliación;
- receipt y correlación disponibles;
- checkpoint o referencia recuperable cuando existe;
- trabajo pendiente;
- evidencia de que el retorno no transportó autoridad;
- evidencia de que el contexto visible corresponde al mismo caso.

`UX-QA-013` podrá decidir si ese retorno debe conservar o reanudar el proceso sin reabrir la identidad cross-app ni el contexto del retorno.

#### 91. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-011 — Las tareas críticas soportan conectividad inestable`

**TAREA ACTUAL APROBADA**
`UX-QA-012 — El retorno entre aplicaciones conserva contexto`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-013 — El retorno conserva el proceso cuando corresponde`
### ✅ UX-QA-013 — El retorno conserva el proceso cuando corresponde

**Estado:** APROBADA
**Tarea anterior:** UX-QA-012 — El retorno entre aplicaciones conserva contexto
**Tarea siguiente:** UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por package y globalmente que, después de un retorno entre aplicaciones, Vento OS conserva, reanuda, revisa, espera, reasigna, concilia o termina el proceso según su estado autoritativo vigente, sin convertir navegación, checkpoint, borrador, claim, receipt, historial del navegador ni contexto preservado en autoridad ni reiniciar silenciosamente una obligación ya ejecutada
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato de certificación de continuidad y reanudación del proceso después del retorno definido; las ejecuciones `UX-QA-013::<package_id>` y `UX-QA-013::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff de `UX-QA-012`, `UX-BASE-014`, `SHELL-APP-016`, contratos vigentes de work items y la superficie materializada `InterruptedProcessState`, pero no afirma que ningún package desplegado haya demostrado todavía continuidad end-to-end
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican estados de proceso, work items, claims, leases, checkpoints, borradores, handoffs, rutas, deep links, autorización, sesiones, eventos, colas, datos, Supabase, dispositivos, componentes, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS certificará que, después de volver de otra aplicación o superficie, la persona continúa el mismo proceso únicamente cuando el estado empresarial vigente permite hacerlo.

La certificación deberá responder, para cada package aplicable:

```text
¿EL PROCESO SIGUE VIGENTE?
¿SIGUE SIENDO LA MISMA INSTANCIA EMPRESARIAL?
¿EL TRABAJO SIGUE PERTENECIENDO AL MISMO ACTOR O RESPONSABLE?
¿EL RECURSO Y SU VERSIÓN SIGUEN SIENDO COMPATIBLES?
¿EL WORK ITEM SIGUE ABIERTO Y EN UN ESTADO REANUDABLE?
¿EXISTE CLAIM, LEASE, CUSTODIA, BORRADOR O CHECKPOINT QUE DEBA REVALIDARSE?
¿HAY UN RESULTADO PENDIENTE O DESCONOCIDO QUE IMPIDA CONTINUAR?
¿EL PROCESO DEBE REANUDARSE, REVISARSE, ESPERAR, HACER HANDOFF, REASIGNARSE, CONCILIARSE O TERMINAR?
```

Regla central:

```text
VOLVER AL CONTEXTO CORRECTO
!=
REANUDAR AUTOMÁTICAMENTE EL PROCESO
```

#### 2. Resultado canónico

`UX-QA-013` establece `UX-QA-PROCESS-CONTINUITY-AFTER-RETURN-CERTIFICATION-001@1.0.0`.

El resultado define:

- unidad certificable de continuidad del proceso después del retorno;
- decisión observable de continuidad para la misma obligación empresarial;
- relación entre proceso, instancia, work item, recurso, estado y punto semántico;
- condiciones de reanudación directa y reanudación con revisión;
- tratamiento de espera, bloqueo, handoff, reasignación, reautenticación y conciliación;
- tratamiento de estados terminales, supersesión y expiración;
- relación entre checkpoint, borrador, receipt, claim, custodia y estado empresarial;
- prohibición de crear continuidad por navegación o historial;
- casos positivos y negativos por package;
- criterio `GLOBAL-FINAL`;
- handoff exacto a `UX-QA-014`.

#### 3. Alcance exacto

La certificación aplica cuando `UX-QA-012` ya determinó el contexto correcto del retorno y el flujo aprobado necesita decidir qué ocurre con el proceso relacionado.

Incluye, cuando apliquen:

- retorno al mismo proceso y misma instancia;
- retorno a un paso posterior del mismo proceso;
- retorno con trabajo todavía en ejecución;
- retorno con pausa controlada;
- retorno con claim o lease vigente, expirado o conflictivo;
- retorno con dependencia esperada;
- retorno con bloqueo recuperable;
- retorno después de handoff;
- retorno después de cambio de actor;
- retorno después de cambio de sede, área, turno o dispositivo;
- retorno con borrador o checkpoint recuperable;
- retorno con resultado pendiente o desconocido;
- retorno con conflicto o conciliación requerida;
- retorno después de que el proceso terminó, fue cancelado, expiró o fue sustituido.

No exige reanudar un proceso cuando la verdad autoritativa indique que ya no corresponde.

#### 4. Handoff recibido de `UX-QA-012`

`UX-QA-012` entrega:

- relación cross-app validada;
- aplicación origen y destino;
- superficie de retorno;
- proceso e instancia;
- recurso y versión vigente observada;
- actor actual revalidado cuando aplica;
- contexto operativo vigente;
- estado del handoff;
- resultado confirmado, pendiente, rechazado, parcial o en conciliación;
- receipt y correlación disponibles;
- checkpoint o referencia recuperable cuando existe;
- trabajo pendiente;
- evidencia de que el retorno no transportó autoridad;
- evidencia de que el contexto visible corresponde al mismo caso.

`UX-QA-013` usa ese handoff sin reabrir la identidad cross-app ni la semántica del retorno.

#### 5. Frontera con `UX-QA-012`

`UX-QA-012` responde:

```text
¿AL VOLVER ENTRE APLICACIONES
SE CONSERVA EL CONTEXTO CORRECTO DEL TRABAJO?
```

`UX-QA-013` responde:

```text
¿CON ESE CONTEXTO YA CORRECTO
EL PROCESO DEBE CONTINUAR Y DE QUÉ FORMA?
```

Un retorno puede ser correcto y aun no permitir reanudación porque el trabajo terminó, fue reasignado, expiró, cambió de versión, perdió autorización o requiere conciliación.

#### 6. Frontera con `UX-BASE-014`

`UX-BASE-014` define el contrato transversal de reanudación después de interrupciones.

Se conserva su regla:

```text
REANUDAR
!=
VOLVER A LA ÚLTIMA PANTALLA
```

Y su secuencia conceptual:

```text
RECONSTRUIR EL PUNTO DE TRABAJO
+
REVALIDAR EL ESTADO ACTUAL
+
COMPARAR CAMBIOS
+
CONTINUAR DE FORMA SEGURA
```

`UX-QA-013` no redefine ese contrato; certifica su cumplimiento observable por package después de un retorno.

#### 7. Frontera con `SHELL-APP-016`

`SHELL-APP-016` define para SHELL cuándo una obligación merece continuidad prioritaria y cómo tratar estados de work item, claim, checkpoint y recuperación.

`UX-QA-013` no convierte esa definición en una regla exclusiva de SHELL.

La certificación exige semántica equivalente en cualquier package aplicable, respetando siempre a la aplicación propietaria del proceso.

#### 8. Frontera con `UX-QA-014`

`UX-QA-014` certificará si el trabajador completa la tarea dentro del tiempo objetivo.

`UX-QA-013` no mide productividad, duración, latencia humana ni cumplimiento de SLA de experiencia.

Regla:

```text
CONTINUIDAD CORRECTA DEL PROCESO
!=
TIEMPO OBJETIVO DE COMPLETAR LA TAREA
```

Una espera legítima, un bloqueo externo, una reautenticación, un handoff o una conciliación no deberán convertirse en tiempo improductivo por inferencia en `UX-QA-014`.

#### 9. Unidad certificable

La unidad mínima es:

```text
PACKAGE
+
RELACIÓN DE RETORNO APLICABLE
+
PROCESO E INSTANCIA
+
WORK ITEM O OBLIGACIÓN RELACIONADA
+
ESTADO AUTORITATIVO POST-RETORNO
+
DECISIÓN DE CONTINUIDAD
+
RESULTADO OBSERVABLE
```

Cada caso deberá poder demostrar si la obligación continúa, cambia de tratamiento o termina.

#### 10. Identidad de continuidad

La continuidad deberá conservar, cuando existan:

```text
process_id
process_instance_id
work_item_id
task_or_work_item_ref
process_step
business_object_ref
resource_version_or_observed_version
owner_app_code
status
readiness_status
claim_or_lease_ref
checkpoint_ref
draft_ref
pending_operation_ref
receipt_ref
correlation_ref
```

La forma es conceptual. La tarea no crea un payload runtime nuevo.

#### 11. Misma obligación empresarial

La reanudación solo puede tratarse como continuidad cuando sigue existiendo la misma obligación empresarial o una continuación explícitamente relacionada por el contrato propietario.

Regla:

```text
MISMA PANTALLA
!=
MISMA OBLIGACIÓN
```

```text
MISMO RECURSO
!=
MISMO WORK ITEM
```

```text
MISMO PROCESS_ID
!=
MISMA PROCESS_INSTANCE_ID
```

#### 12. Navegación sin mutación implícita

Se conserva:

```text
ABRIR APLICACIÓN
!= START

VOLVER A SHELL
!= PAUSE

CAMBIAR DE APLICACIÓN
!= RELEASE

VOLVER AL RECURSO
!= RESUME

REFRESH
!= RETRY EMPRESARIAL
```

La navegación no cambia por sí sola el estado empresarial.

#### 13. Trabajo ya iniciado

Por defecto:

```text
TRABAJO VÁLIDO EN EJECUCIÓN
→ CONSERVA CONTINUIDAD
```

siempre que continúen siendo válidos:

- proceso;
- instancia;
- recurso;
- estado;
- responsabilidad;
- contexto;
- autorización;
- claim o lease cuando aplique;
- custodia cuando aplique;
- resultado conocido.

#### 14. Work item como referencia

Cuando exista `work_item_id`, se conserva como referencia opaca a la obligación runtime.

No se utiliza para inferir autoridad.

```text
CONOCER work_item_id
!=
PODER REANUDARLO
```

La aplicación propietaria debe confirmar que el work item sigue vigente y visible para el actor actual.

#### 15. Estados conceptuales de work item

La certificación reconoce el contrato vigente de estados conceptuales:

```text
NOT_READY
AVAILABLE
OFFERED
ASSIGNED
CLAIMED
IN_PROGRESS
WAITING
BLOCKED
PAUSED
COMPLETION_PENDING_SYNC
COMPLETED
CANCELLED
SUPERSEDED
EXPIRED
CONFLICT
RECONCILIATION_REQUIRED
```

`UX-QA-013` no crea estados nuevos ni modifica sus significados.

#### 16. Estados de reanudación observables

La materialización compartida `InterruptedProcessState` expone diecisiete estados canónicos:

```text
NO_CHECKPOINT
DRAFT_ONLY
CHECKPOINT_AVAILABLE
VALIDATING
RESUMABLE
RESUMABLE_WITH_REVIEW
WAITING_FOR_DEPENDENCY
HANDOFF_REQUIRED
REASSIGNMENT_REQUIRED
CONFLICT
RESULT_UNKNOWN
REAUTH_REQUIRED
RECONCILIATION_REQUIRED
SUPERSEDED
COMPLETED
EXPIRED
INVALID
```

Estos estados de presentación y continuidad no sustituyen `WorkItemStatus` ni estados de dominio.

#### 17. Sin mapeo uno a uno obligatorio

No se exige una equivalencia uno a uno entre `WorkItemStatus` e `InterruptedProcessStatus`.

Ejemplo:

```text
WORK ITEM = CLAIMED
```

puede producir una decisión distinta según vigencia del claim, actor, contexto, recurso y política de takeover.

La certificación observa coherencia semántica, no una tabla artificial de equivalencias.

#### 18. `RESUMABLE`

Solo procede cuando la evidencia confirma, según aplique:

- mismo proceso e instancia;
- obligación todavía abierta;
- recurso vigente;
- versión compatible;
- actor permitido;
- contexto compatible;
- autorización revalidada;
- claim o lease válido o renovado;
- custodia compatible;
- ausencia de resultado desconocido;
- ausencia de conflicto no resuelto;
- checkpoint o borrador compatibles cuando existan.

La reanudación abre el punto semántico correcto, no una portada genérica.

#### 19. `RESUMABLE_WITH_REVIEW`

Se utiliza cuando el proceso puede continuar, pero cambió información material desde la interrupción.

La experiencia deberá mostrar qué cambió antes de permitir una acción final.

Puede incluir:

- versión del recurso cambiada;
- campos no superpuestos modificados;
- prioridad cambiada;
- responsable actualizado sin perder ownership;
- dependencia resuelta;
- borrador parcialmente compatible;
- resultado nuevo que altera el siguiente paso.

No se permite `last write wins` silencioso.

#### 20. `VALIDATING`

Mientras se resuelven actor, contexto, estado, recurso, versión, claim, custodia, receipts o pendientes:

```text
VALIDATING
→ NO CONTINUAR TODAVÍA
```

La UI no mostrará una acción material de continuidad como si la clasificación estuviera resuelta.

#### 21. `NO_CHECKPOINT`

La ausencia de checkpoint no demuestra que el proceso terminó ni que sea imposible recuperarlo.

La aplicación propietaria deberá resolver la obligación autoritativa disponible.

La prueba falla si:

- se inventa un proceso nuevo por no encontrar checkpoint;
- se trata la última URL como checkpoint;
- se reinicia un flujo ya existente;
- se oculta una obligación todavía vigente.

#### 22. `DRAFT_ONLY`

Un borrador recuperable no equivale a un proceso activo ni autoriza una mutación.

Puede conservarse para:

- revisión;
- copia segura de información;
- reaplicación compatible;
- soporte;
- conciliación.

No puede sobreescribir el estado autoritativo por existir localmente.

#### 23. `CHECKPOINT_AVAILABLE`

Un checkpoint disponible es una referencia de continuidad, no una decisión final de reanudación.

Debe pasar por revalidación antes de convertirse en `RESUMABLE` o cualquier otro estado operativo.

#### 24. `WAITING_FOR_DEPENDENCY`

Una obligación en espera conserva:

- proceso e instancia;
- condición esperada;
- responsable actual;
- última actualización;
- vencimiento cuando exista;
- siguiente acción segura.

No se fuerza como foco principal cuando el actor no tiene una acción inmediata.

#### 25. Bloqueo recuperable

Cuando el proceso está `BLOCKED`, la certificación deberá demostrar quién posee la siguiente acción.

Si el actor actual puede resolver, escalar o proteger custodia, el proceso puede conservar prioridad.

Si el bloqueo pertenece exclusivamente a otro actor o dependencia, la experiencia deberá reflejarlo sin fingir reanudación activa.

#### 26. `HANDOFF_REQUIRED`

Se utiliza cuando la continuidad exige transferir formalmente responsabilidad, custodia o trabajo.

Regla:

```text
HANDOFF REQUERIDO
!=
CAMBIO SILENCIOSO DE ACTOR
```

Hasta aceptación válida, el receptor no hereda responsabilidad.

#### 27. `REASSIGNMENT_REQUIRED`

Se utiliza cuando el trabajo sigue existiendo, pero ya no puede continuar bajo el actor o asignación anterior.

La prueba deberá demostrar:

- causa de la reasignación;
- conservación de la obligación;
- ausencia de autoridad heredada;
- siguiente propietario o mecanismo gobernado;
- preservación de evidencia y pendientes.

#### 28. `REAUTH_REQUIRED`

Si la sesión, step-up, permiso o contexto vencieron:

- se conserva referencia segura al trabajo;
- no se conserva autoridad vencida;
- se reautentica o reautoriza según contrato;
- se vuelve a resolver el estado vigente;
- solo entonces se determina la continuidad.

#### 29. `RESULT_UNKNOWN`

Cuando una intención pudo haber sido enviada antes de la interrupción:

```text
RESULT_UNKNOWN
→ CONSULTAR IDEMPOTENCIA
→ CONSULTAR RECEIPT
→ CONSULTAR ESTADO AUTORITATIVO
→ CLASIFICAR
```

Queda prohibido iniciar otra intención para “asegurar” el resultado.

#### 30. `CONFLICT`

Ante conflicto de versión, actor, claim, custodia o estado:

- se conserva el caso;
- se muestran las diferencias materiales;
- no se oculta el conflicto mediante navegación;
- no se aplica sobrescritura silenciosa;
- la continuidad se transforma en trabajo de resolución.

#### 31. `RECONCILIATION_REQUIRED`

La conciliación se exige cuando los hechos disponibles no permiten determinar con seguridad el estado empresarial.

Puede incluir:

- operación con receipt ambiguo;
- custodia física y digital divergentes;
- handoff parcialmente aceptado;
- efecto externo sin confirmación;
- evento fuera de orden;
- proceso y recurso con versiones incompatibles.

No se reanuda el paso material hasta resolver la incertidumbre.

#### 32. `COMPLETION_PENDING_SYNC`

Este estado no equivale a `COMPLETED`.

Al volver:

- se consulta la intención original;
- se consulta receipt;
- se consulta estado empresarial;
- se evita un segundo intento;
- se clasifica el resultado antes de habilitar otra acción.

#### 33. `COMPLETED`

Un proceso o work item completado no se reanuda como activo.

La superficie puede mostrar resultado, receipt, trazabilidad o siguiente obligación separada.

Regla:

```text
COMPLETED
!=
RESUMABLE
```

#### 34. `CANCELLED`

Un estado empresarial cancelado permanece terminal salvo que el contrato propietario cree una nueva obligación explícita.

Volver a una pantalla antigua no reabre el proceso.

#### 35. `SUPERSEDED`

Cuando una obligación fue sustituida:

- no se reanuda la obligación anterior;
- se conserva su identidad para explicación y trazabilidad;
- solo se orienta hacia el reemplazo cuando existe relación explícita;
- no se adivina el reemplazo por similitud de nombre o recurso.

#### 36. `EXPIRED`

Una obligación expirada:

- no recupera autoridad por volver;
- no renueva automáticamente un claim o aprobación;
- conserva evidencia y explicación necesarias;
- ofrece únicamente acciones permitidas por el contrato vigente.

#### 37. `INVALID`

Se utiliza cuando la referencia de continuidad ya no puede resolverse de forma segura.

La prueba falla si el sistema:

- abre otro recurso por heurística;
- crea una obligación sustituta sin contrato;
- restaura un proceso antiguo;
- ignora incompatibilidad de esquema o identidad.

#### 38. Cambio de paso dentro del mismo proceso

El mismo proceso puede continuar en un paso distinto si la transición fue confirmada por la autoridad propietaria.

Regla:

```text
MISMA INSTANCIA
+
NUEVO PASO VIGENTE
=
CONTINUIDAD POSIBLE
```

No se fuerza volver al paso anterior por conservar una pantalla o checkpoint viejo.

#### 39. Cambio de recurso

Si la transición aprobada del proceso cambia legítimamente el recurso de trabajo, la continuidad deberá demostrar la relación explícita.

Sin esa relación:

```text
RECURSO DISTINTO
→ NO ASUMIR MISMO TRABAJO
```

#### 40. Cambio de versión

La versión observada antes del retorno sirve para comparar.

No impone el estado anterior.

Se distinguirá:

```text
SIN CAMBIOS
CAMBIOS COMPATIBLES
CAMBIOS QUE EXIGEN REVISIÓN
CAMBIOS EN CONFLICTO
RECURSO CERRADO
RECURSO CANCELADO
RECURSO REEMPLAZADO
ESQUEMA INCOMPATIBLE
```

#### 41. Claim y lease

La existencia de una referencia previa no demuestra vigencia.

Se deberá comprobar, según aplique:

- propietario;
- actor;
- recurso;
- etapa;
- versión;
- vencimiento;
- heartbeat;
- dispositivo;
- área;
- posibilidad de renovación;
- política de takeover.

#### 42. Custodia

La custodia física no se deriva del estado visual.

Cuando exista custodia:

- se identifica la última transferencia confirmada;
- se compara con el estado digital;
- se impiden dobles aceptaciones;
- se separan actor físico, transcriptor y aprobador cuando corresponda;
- divergencias van a conciliación.

#### 43. Cambio de actor

Si el actor cambia:

- el trabajo anterior no cambia de propietario por navegación;
- se protege información personal;
- la autoridad se resuelve desde cero;
- un borrador personal no se transfiere implícitamente;
- claim y custodia requieren contrato explícito;
- la continuidad puede convertirse en handoff, reasignación o bloqueo.

#### 44. Mismo actor

Cuando el mismo actor continúa:

- se revalida sesión;
- se revalida contexto;
- se revalida autorización;
- se consulta estado vigente;
- se preserva identidad del trabajo;
- se evita recaptura innecesaria;
- no se presume que el claim sigue vigente.

#### 45. Cambio de sede, área o turno

Toda variación material obliga a resolver un contexto nuevo.

```text
CONTEXTO NUEVO COMPATIBLE
→ CONTINUIDAD POSIBLE DESPUÉS DE REVALIDAR

CONTEXTO NUEVO INCOMPATIBLE
→ BLOQUEAR, REASIGNAR O HACER HANDOFF
```

La sede anterior no se usa como fallback autoritativo.

#### 46. Cambio de dispositivo

Continuar en otro dispositivo exige una referencia sincronizada o transferencia segura.

No se prometerá recuperar:

- borradores solo locales;
- archivos no sincronizados;
- selecciones efímeras;
- estado UI no persistido;
- autoridad del dispositivo anterior.

#### 47. Reinicio y actualización

Después de reinicio, suspensión o actualización:

- no se ejecuta trabajo en segundo plano por inferencia;
- no se restaura autoridad obsoleta;
- no se muestran datos del actor anterior;
- se validan esquema, sesión, contexto, recurso, pendientes y cancelaciones.

#### 48. Resultado confirmado en la aplicación destino

Si el destino completó un efecto empresarial que cambia el proceso:

- se refleja el nuevo estado autoritativo;
- se conserva receipt cuando aplique;
- no se repite el paso anterior;
- la continuidad puede avanzar al siguiente paso o quedar terminal.

Abrir la aplicación destino nunca es evidencia suficiente del efecto.

#### 49. Cancelación o rechazo en destino

Cancelar o rechazar una acción auxiliar no determina por sí solo que el proceso completo termine.

La aplicación propietaria deberá resolver:

- qué obligación sigue vigente;
- qué paso permanece pendiente;
- si debe volver al paso anterior;
- si requiere otra acción;
- si el proceso pasa a un estado terminal.

#### 50. Aceptación parcial

Cuando el destino produjo un resultado parcial:

- se conservan elementos confirmados;
- se conservan rechazados y pendientes;
- no se repiten efectos aceptados;
- la continuidad se calcula sobre el estado residual real.

#### 51. Proceso no equivalente a pantalla

Una pantalla puede representar más de un estado de proceso.

Un proceso puede atravesar varias pantallas.

Por tanto:

```text
PANTALLA ABIERTA
!=
ESTADO DEL PROCESO
```

La certificación se ancla en identidades y hechos, no en rutas visuales.

#### 52. Prohibición de clonar trabajo para reanudar

No se certifica una solución que:

- duplique `work_item_id`;
- cree un work item espejo de retorno;
- copie estado anterior y lo marque vigente;
- convierta una notificación en obligación;
- reconstruya un proceso desde historial del navegador;
- genere otra intención para sortear un resultado desconocido.

#### 53. Borrador, checkpoint, receipt y estado empresarial

Se conserva la separación:

```text
BORRADOR
!= CHECKPOINT
!= OPERACIÓN PENDIENTE
!= RECEIPT
!= ESTADO EMPRESARIAL
```

Cada objeto aporta evidencia distinta y no sustituye a los demás.

#### 54. Trabajo pendiente

El retorno deberá conservar perceptible el trabajo todavía pendiente, por ejemplo:

- acción no ejecutada;
- dependencia en espera;
- conciliación;
- reautenticación;
- revisión de cambios;
- aceptación de handoff;
- reasignación;
- resolución de conflicto.

No se oculta un pendiente porque la pantalla volvió a cargar.

#### 55. Foco frente a estado

El foco pertenece a la experiencia del actor.

El estado pertenece al proceso o work item.

Por tanto:

```text
IN_PROGRESS
→ NORMALMENTE FOCO

WAITING
→ NORMALMENTE EN ESPERA

BLOCKED
→ FOCO O COLA SEGÚN SIGUIENTE ACCIÓN

RECONCILIATION_REQUIRED
→ FOCO DE RECUPERACIÓN CUANDO EXIGE ACCIÓN
```

La UI no modifica el estado empresarial para acomodar la jerarquía visual.

#### 56. Prioridad al volver

Cuando existan múltiples obligaciones recuperables, la experiencia priorizará sin alterar sus estados.

Orden conceptual:

```text
1. RESULTADOS DESCONOCIDOS O CONCILIACIONES
2. CUSTODIAS Y HANDOFFS PENDIENTES
3. TRABAJO EN EJECUCIÓN CON CONTINUIDAD VÁLIDA
4. PAUSAS Y BORRADORES RECUPERABLES
5. TAREAS PRÓXIMAS A VENCER
6. COLA ORDINARIA
```

Una prioridad visual no concede autorización.

#### 57. Caso positivo mínimo

Un caso positivo demuestra:

1. contexto de retorno correcto según `UX-QA-012`;
2. misma obligación o relación explícita de continuidad;
3. estado autoritativo posterior conocido;
4. actor y contexto revalidados;
5. recurso y versión compatibles o diferencia explicada;
6. claim, custodia, checkpoint y borrador tratados según contrato;
7. resultado pendiente o desconocido resuelto antes de repetir;
8. decisión de continuidad correcta;
9. superficie y acción coherentes con esa decisión;
10. cero autoridad restaurada desde navegación o cliente.

#### 58. Casos positivos obligatorios por package

Según alcance, deberán cubrir:

- `IN_PROGRESS` que continúa;
- `PAUSED` reanudable;
- `RESUMABLE_WITH_REVIEW` por versión cambiada;
- `WAITING` con dependencia pendiente;
- `BLOCKED` con acción propia;
- bloqueo que pertenece a otro actor;
- claim válido;
- claim expirado;
- handoff requerido;
- reasignación requerida;
- sesión expirada con reautenticación;
- resultado desconocido;
- conflicto;
- conciliación;
- completado;
- cancelado;
- superseded;
- expirado;
- cambio de dispositivo cuando aplique;
- cambio de sede o área cuando aplique.

Los casos no aplicables deberán justificarse por el package.

#### 59. Casos negativos mínimos

La certificación deberá detectar:

- reanudar solo porque volvió la misma URL;
- reanudar un proceso completado;
- reabrir uno cancelado;
- revivir una obligación superseded;
- renovar claim por inferencia;
- transferir borrador por cambio de actor;
- restaurar autoridad vencida;
- perder trabajo pendiente;
- repetir una operación con resultado desconocido;
- sobrescribir cambios concurrentes;
- convertir un checkpoint en estado empresarial;
- cambiar de instancia sin contrato;
- clonar un work item para retorno;
- ocultar conciliación;
- tratar `WAITING` como trabajo activo obligatorio;
- mantener un bloqueo sin owner;
- reanudar sobre contexto incompatible;
- adivinar recurso o reemplazo;
- abrir el paso anterior cuando el proceso ya avanzó.

#### 60. Oracle de continuidad

Para cada caso:

```text
SI UX-QA-012 no demuestra contexto de retorno válido
→ NO CERTIFICAR CONTINUIDAD COMO PASS

SI la obligación está terminal
→ NO REANUDAR

SI existe resultado desconocido
→ RESOLVER ANTES DE REPETIR

SI existe conflicto o conciliación pendiente
→ RECUPERAR / CONCILIAR, NO CONTINUAR CIEGAMENTE

SI el actor o contexto ya no son compatibles
→ REAUTH / HANDOFF / REASSIGNMENT / BLOCK

SI la obligación sigue abierta, el estado es compatible,
el actor está autorizado y no existe incertidumbre material
→ RESUMABLE O RESUMABLE_WITH_REVIEW SEGÚN CAMBIOS
```

#### 61. Identidad del caso de prueba

Cada caso deberá declarar, como mínimo:

- `case_id`;
- package;
- relación de retorno;
- aplicación origen y destino;
- proceso;
- instancia;
- work item cuando exista;
- paso anterior;
- paso vigente;
- recurso;
- versión anterior y vigente;
- estado anterior;
- estado autoritativo posterior;
- estado de reanudación observable;
- actor;
- contexto;
- claim o lease;
- custodia cuando aplique;
- checkpoint;
- borrador;
- receipt y pendientes;
- decisión esperada;
- decisión observada;
- evidencia;
- veredicto.

#### 62. Evidencia mínima posterior

La evidencia deberá permitir reconstruir:

- que el retorno corresponde al mismo caso;
- estado del proceso antes y después;
- estado del work item cuando exista;
- actor y contexto vigentes;
- recurso y versión;
- claim o lease;
- custodia;
- checkpoint o borrador;
- operaciones pendientes;
- receipts;
- conflicto o conciliación;
- decisión de continuidad;
- acción presentada;
- acción realmente ejecutada;
- veredicto.

#### 63. Evidencia insuficiente por sí sola

No bastan:

- screenshot de una pantalla de continuidad;
- que exista un botón `Continuar`;
- que renderice `InterruptedProcessState`;
- que el work item exista en cliente;
- que la ruta coincida;
- que un checkpoint esté presente;
- que exista un receipt sin interpretar;
- que el actor sea el mismo nombre visible;
- que la app vuelva al mismo recurso.

La evidencia debe demostrar coherencia con la verdad autoritativa.

#### 64. Materialización física existente y límite

Existe materialización compartida de:

- contrato estático de work items;
- estados y contratos de procesos;
- `InterruptedProcessState`;
- contratos de handoff y contexto relacionados.

Esa existencia:

- permite inspección contractual;
- permite pruebas estáticas de las superficies compartidas;
- no demuestra adopción por consumidores;
- no demuestra clasificación correcta por package;
- no demuestra continuidad end-to-end;
- no sustituye las futuras ejecuciones `UX-QA-013::<package_id>`.

#### 65. Estado de certificación por package

Estados permitidos:

```text
PASS
FAIL
BLOCKED
STALE
```

`BLOCKED` exige dependencia externa o evidencia imposible de obtener todavía.

Un comportamiento incorrecto observado es `FAIL`.

#### 66. `STALE`

La evidencia previa se vuelve stale cuando cambia materialmente:

- contrato de proceso;
- identidad o estados de work item;
- política de reanudación;
- clasificación de `InterruptedProcessState`;
- handoff;
- return contract;
- autorización;
- claim o lease;
- recurso o esquema;
- aplicación propietaria;
- consumidor evaluado;
- reglas de checkpoint o borrador.

#### 67. Hallazgos diferibles

Un hallazgo solo podrá diferirse si:

- no reanuda una obligación terminal;
- no duplica efectos;
- no amplía autoridad;
- no cambia de instancia o recurso;
- no pierde custodia ni trabajo confirmado;
- no oculta conflicto o resultado desconocido;
- tiene owner canónico;
- tiene condición exacta de salida;
- su impacto sobre `GLOBAL-FINAL` queda documentado.

#### 68. Criterio de PASS por package

Un package obtiene PASS únicamente si:

1. inventaria todas las relaciones de retorno donde deba decidir continuidad;
2. clasifica correctamente cada obligación posterior al retorno;
3. no confunde navegación con estado empresarial;
4. revalida actor, contexto y autorización;
5. revalida claim, custodia y recurso cuando aplican;
6. distingue reanudación directa de revisión, espera, bloqueo, handoff, reasignación y conciliación;
7. no reanuda estados terminales;
8. no repite efectos con resultado pendiente o desconocido;
9. preserva evidencia y pendientes;
10. presenta una acción coherente con el estado autoritativo;
11. conserva privacidad en cambios de actor o dispositivo;
12. no mantiene fallos críticos abiertos.

#### 69. Criterio de `GLOBAL-FINAL`

`UX-QA-013::GLOBAL-FINAL` solo puede obtener PASS cuando:

- todos los packages aplicables tienen decisión válida;
- todas las relaciones certificadas por `UX-QA-012` que exigen continuidad están cubiertas;
- no existe ningún package que reanude un proceso terminal;
- no existen dos semánticas incompatibles de `RESUMABLE`, espera, handoff o conciliación;
- ningún consumidor convierte navegación en mutación;
- ningún consumidor clona work items para volver;
- resultados desconocidos e idempotencia mantienen la misma política transversal;
- claims, custodia y contexto se revalidan de forma coherente;
- los hallazgos diferidos no invalidan la continuidad global;
- la evidencia no está stale.

#### 70. Identidad de ejecución física futura

La topología es:

```text
MODE: PER_PACKAGE_AND_GLOBAL_FINAL
EXECUTION_GATE: POST_E5_PACKAGE
```

Identidades futuras:

```text
UX-QA-013::<package_id>
UX-QA-013::GLOBAL-FINAL
```

Aprobar este contrato documental no crea ni ejecuta esas instancias.

#### 71. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea certifica obligaciones de continuidad, reanudación, idempotencia, handoff, contexto y recuperación ya registradas. No introduce una obligación verificable nueva que requiera modificar el registro canónico de requisitos de prueba.

#### 72. Cobertura de prueba vigente reutilizada

Sin modificar el registro, la cobertura reutilizada incluye:

- `TREQ-UX-024` a `TREQ-UX-040` — identidad de work item, elegibilidad, asignación, claim, ejecución, prioridad, continuidad, handoff, concurrencia, leases, offline, frescura, reanudación, accesibilidad, eventos y versionado;
- `TREQ-UX-274` a `TREQ-UX-296` — checkpoint, interrupciones, reanudación, borradores, receipts, resultados desconocidos, actores, handoffs, claims, custodia, contexto, conflictos, dispositivos, aplicaciones, privacidad, retención y pruebas;
- `TREQ-UX-006` — recuperación ante pérdida de red, sesión, dispositivo o proveedor sin perder ni duplicar trabajo;
- `TREQ-INTEGRATION-003` — idempotencia, resultado recuperable y tratamiento seguro de reintentos;
- `TREQ-INTEGRATION-005` — continuidad de proceso, recurso, actor, estado, acción pendiente y retorno entre aplicaciones con revalidación;
- requisitos propietarios de proceso, autorización, contexto, custodia, handoff y recuperación que cada package declare aplicables.

Estas referencias son trazabilidad heredada y no representan cambios del registro.

#### 73. Evidencia de validación

| Clase | Estado | Evidencia documental disponible en esta aprobación |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecuta build físico ni de producto para aprobar el contrato documental. |
| LOCAL | NOT_EXECUTED | La incorporación, formateo y validadores reales del checkout corresponden a la batería posterior. |
| REMOTA | PASS | Se verificaron `main`, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, owner del BLOQUE U, `UX-BASE-014`, `SHELL-APP-016`, contratos vigentes de work items y procesos, `InterruptedProcessState`, cobertura 04A de integración y la base aprobada `UX-QA-012`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recorridos end-to-end de reanudación o conciliación sobre packages desplegados durante esta aprobación documental. |
| FÍSICA | NOT_EXECUTED | Las instancias por package y `GLOBAL-FINAL` permanecen sujetas a `POST_E5_PACKAGE`. |

#### 74. Seguridad de la evidencia

La evidencia no deberá contener:

- tokens;
- secretos;
- PIN;
- credenciales;
- contenido sensible completo de borradores;
- AccessContext serializado innecesariamente;
- datos privados de otro actor;
- payloads completos de autorización;
- URLs con información secreta.

#### 75. Fallos críticos

Bloquean PASS del package:

- reanudar una obligación terminal;
- abrir otra instancia o recurso por heurística;
- restaurar autoridad desde checkpoint, URL o cliente;
- renovar claim sin validación;
- transferir custodia o borrador implícitamente;
- repetir una operación con resultado desconocido;
- ocultar conflicto o conciliación;
- presentar `COMPLETION_PENDING_SYNC` como `COMPLETED`;
- reconstruir un work item espejo;
- perder evidencia o trabajo confirmado;
- continuar con contexto incompatible;
- aplicar `last write wins` silencioso;
- no poder relacionar retorno, proceso, instancia y obligación con el mismo caso.

#### 76. Casos fuera de alcance

Quedan fuera de esta aprobación documental:

- crear checkpoints;
- crear borradores persistentes;
- implementar claims o leases;
- implementar handoffs;
- crear work items runtime;
- modificar estados de proceso;
- crear rutas o deep links;
- modificar `InterruptedProcessState`;
- migrar consumidores;
- modificar autorización;
- modificar idempotencia;
- modificar colas;
- modificar Supabase;
- modificar datos;
- ejecutar pruebas físicas;
- medir todavía el tiempo objetivo del trabajador.

#### 77. Criterios de aceptación

- [ ] Se define un contrato de certificación de continuidad post-retorno por package y global final.
- [ ] El contexto correcto de `UX-QA-012` se consume sin reabrir su responsabilidad.
- [ ] Reanudar no equivale a volver a la última pantalla.
- [ ] Navegación y retorno no mutan el estado empresarial por sí solos.
- [ ] La misma pantalla no se confunde con la misma obligación.
- [ ] `process_id`, `process_instance_id`, `work_item_id`, recurso y paso permanecen semánticamente separados.
- [ ] Los dieciséis estados conceptuales de work item conservan su semántica vigente.
- [ ] Los diecisiete estados de `InterruptedProcessState` se tratan como clasificación de continuidad y no como autoridad.
- [ ] `RESUMABLE` exige revalidación completa aplicable.
- [ ] `RESUMABLE_WITH_REVIEW` explica cambios materiales antes de continuar.
- [ ] `WAITING`, bloqueo, handoff, reasignación, reautenticación y conciliación conservan tratamientos distintos.
- [ ] `RESULT_UNKNOWN` se resuelve antes de cualquier repetición.
- [ ] `COMPLETED`, `CANCELLED`, `SUPERSEDED` y `EXPIRED` no se reanudan como obligación activa.
- [ ] Claim, lease y custodia se revalidan y no se presumen vigentes.
- [ ] Borrador, checkpoint, operación pendiente, receipt y estado empresarial permanecen separados.
- [ ] Cambio de actor o dispositivo no transfiere trabajo ni autoridad implícitamente.
- [ ] Cambios de versión no usan `last write wins` silencioso.
- [ ] La ausencia de checkpoint no crea una obligación nueva.
- [ ] La evidencia posterior relaciona retorno, proceso, instancia, work item y decisión de continuidad.
- [ ] La materialización compartida existente no se trata como evidencia suficiente de adopción end-to-end.
- [ ] No se crea ni modifica ningún requisito de prueba.
- [ ] No se ejecutan cambios físicos.
- [ ] `UX-QA-014` conserva íntegramente la responsabilidad de certificar tiempo objetivo después de que la continuidad del proceso esté correctamente clasificada.

#### 78. Límites

Esta tarea:

- no implementa reanudación;
- no persiste checkpoints;
- no crea work items;
- no modifica claims ni leases;
- no transfiere custodia;
- no crea handoffs;
- no cambia ownership;
- no reescribe estados de dominio;
- no implementa retry;
- no ejecuta conciliación;
- no cambia autorización;
- no modifica rutas;
- no modifica consumidores;
- no publica componentes;
- no modifica datos;
- no modifica Supabase;
- no ejecuta pruebas físicas;
- no certifica packages sin evidencia posterior a E5;
- no evalúa productividad individual ni tiempo objetivo.

#### 79. Handoff a `UX-QA-014`

`UX-QA-013` entrega a `UX-QA-014`:

- package y caso certificado;
- proceso e instancia;
- work item u obligación aplicable;
- estado autoritativo post-retorno;
- clasificación de continuidad;
- actor y contexto revalidados;
- recurso y versión vigente;
- claim, custodia y checkpoint relevantes;
- resultados pendientes o desconocidos ya clasificados;
- condición de espera, bloqueo, handoff, reasignación o conciliación cuando exista;
- instante o referencia desde la cual el trabajo vuelve a ser ejecutable de forma legítima;
- evidencia de que navegación y recuperación técnica no fueron contabilizadas como acción empresarial.

`UX-QA-014` podrá medir el tiempo objetivo sin confundir esperas legítimas, fallas técnicas, reautenticación, handoffs o conciliaciones con demora atribuible al trabajador.

#### 80. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-012 — El retorno entre aplicaciones conserva contexto`

**TAREA ACTUAL APROBADA**
`UX-QA-013 — El retorno conserva el proceso cuando corresponde`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo`
### ✅ UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo

**Estado:** APROBADA
**Tarea anterior:** UX-QA-013 — El retorno conserva el proceso cuando corresponde
**Tarea siguiente:** UX-QA-015 — Los bloqueos se entienden sin códigos técnicos
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por package y globalmente que una persona trabajadora puede completar una tarea representativa dentro del tiempo objetivo previamente definido para su escenario, distinguiendo tiempo end-to-end, tiempo activo, latencia técnica, espera legítima, dependencia, reautenticación, handoff, interrupción, recuperación y conciliación, sin convertir la medición en vigilancia o evaluación punitiva individual
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato documental de certificación de tiempo objetivo de tarea definido; las ejecuciones `UX-QA-014::<package_id>` y `UX-QA-014::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff aprobado de `UX-QA-013`, la línea base de fricción de `UX-BASE-008`, los presupuestos técnicos de `NFR-REQ-003`, los guardrails humanos y de accesibilidad vigentes y la evidencia que cada package declare aplicable, sin afirmar que ningún package desplegado cumpla todavía su tiempo objetivo
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican código, rutas, componentes, contratos runtime, telemetría productiva, procesos, work items, autorización, colas, datos, Supabase, dispositivos, configuración, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS certificará que una persona trabajadora puede completar una tarea representativa dentro del tiempo objetivo aprobado para el escenario, sin confundir velocidad humana con latencia técnica, espera empresarial o fallas de la plataforma.

La certificación deberá responder, para cada package aplicable:

```text
¿QUÉ TAREA EXACTA SE ESTÁ MIDIENDO?
¿CUÁNDO EMPIEZA LEGÍTIMAMENTE LA MEDICIÓN?
¿CUÁNDO TERMINA CON UN RESULTADO EMPRESARIAL O HANDOFF VÁLIDO?
¿CUÁL ES EL TIEMPO OBJETIVO APROBADO PARA ESTE ESCENARIO?
¿QUÉ PARTE DEL TIEMPO ES ACTIVA Y QUÉ PARTE ES ESPERA?
¿QUÉ PARTE DEPENDE DE SISTEMA, DISPOSITIVO, RED, PERIFÉRICO O TERCERO?
¿LA PERSONA COMPLETA EL TRABAJO SIN OMITIR CONTROLES, CREAR ERRORES O PEDIR AYUDA EVITABLE?
¿EL RESULTADO SIGUE SIENDO CORRECTO, SEGURO, TRAZABLE Y RECUPERABLE?
```

Regla central:

```text
COMPLETAR MÁS RÁPIDO
!=
COMPLETAR MEJOR
```

Y también:

```text
TIEMPO OBJETIVO DE TAREA
!=
VELOCIDAD INDIVIDUAL DEL TRABAJADOR
```

#### 2. Resultado documental

`UX-QA-014` define el contrato de certificación de tiempo objetivo de tarea para BLOQUE U.

El resultado establece:

- unidad certificable por package y escenario;
- fuente obligatoria del tiempo objetivo;
- frontera entre tiempo de tarea y tiempo de respuesta técnico;
- eventos válidos de inicio y fin;
- segmentación de tiempo activo y espera;
- tratamiento de bloqueos, dependencias, handoffs, interrupciones y recuperación;
- reglas de medición en estaciones, dispositivos y condiciones reales;
- guardrails de accesibilidad, seguridad y calidad;
- criterios de PASS por package;
- criterio `GLOBAL-FINAL`;
- handoff exacto a `UX-QA-015`.

#### 3. Handoff recibido de `UX-QA-013`

`UX-QA-013` entrega:

- package y caso certificado;
- proceso e instancia;
- work item u obligación aplicable;
- estado autoritativo vigente;
- clasificación de continuidad;
- actor y contexto revalidados;
- recurso y versión vigente;
- claim, custodia y checkpoint relevantes;
- resultados pendientes o desconocidos ya clasificados;
- condición de espera, bloqueo, handoff, reasignación o conciliación cuando exista;
- instante o referencia desde la cual el trabajo vuelve a ser ejecutable de forma legítima;
- evidencia de que navegación y recuperación técnica no fueron tratadas como acción empresarial.

`UX-QA-014` usa ese handoff para evitar atribuir al trabajador tiempo que pertenece a una espera o recuperación que el sistema ya clasificó.

#### 4. Alcance exacto

La certificación aplica a tareas humanas representativas incluidas en un package cuando exista:

- actor objetivo definido;
- proceso y paso identificables;
- escenario reproducible;
- contexto de sede, área, turno o modalidad cuando aplique;
- estación o dispositivo objetivo;
- resultado esperado;
- tiempo objetivo aprobado y trazable;
- criterios de calidad y seguridad que no pueden omitirse para ganar tiempo;
- evidencia suficiente para distinguir actividad humana y espera no atribuible.

No se certifica un tiempo si la tarea medida no tiene frontera funcional estable.

#### 5. Frontera con `UX-QA-013`

`UX-QA-013` responde:

```text
¿EL TRABAJO PUEDE CONTINUAR
Y DE QUÉ FORMA?
```

`UX-QA-014` responde:

```text
¿CUANDO EL TRABAJO ES LEGÍTIMAMENTE EJECUTABLE,
PUEDE COMPLETARSE DENTRO DEL TIEMPO OBJETIVO
SIN DEGRADAR EL RESULTADO?
```

Una tarea no empieza a consumir tiempo atribuible al trabajador mientras el sistema aún está resolviendo si la obligación puede ejecutarse.

#### 6. Frontera con `UX-QA-015`

`UX-QA-015` certificará que los bloqueos se entienden sin códigos técnicos.

`UX-QA-014` sí registra:

- existencia del bloqueo;
- duración observada;
- punto del flujo afectado;
- impacto sobre el tiempo end-to-end;
- si la tarea pudo continuar o no.

Pero no certifica todavía la calidad lingüística del mensaje de bloqueo.

#### 7. Frontera con `UX-BASE-008`

`UX-BASE-008` ya define que la mejora de tareas frecuentes se mide con:

- tasa de finalización correcta;
- tiempo end-to-end;
- tiempo activo y de espera;
- toques y campos manuales;
- desplazamientos y cambios de estación;
- aplicaciones y pantallas atravesadas;
- retrocesos;
- abandonos;
- errores y correcciones;
- reintentos;
- conflictos;
- recuperación;
- satisfacción y comprensión.

`UX-QA-014` no redefine esa base. La convierte en una certificación ejecutable posterior por package.

#### 8. Frontera con `NFR-REQ-003`

`NFR-REQ-003` establece explícitamente:

```text
TIEMPO DE RESPUESTA
!=
TIEMPO TOTAL DEL PROCESO
!=
TIEMPO DE ATENCIÓN HUMANA
```

Por tanto, `UX-QA-014` no usa presupuestos de render, navegación, API, job, escáner o periférico como sustituto del tiempo objetivo humano.

Esos presupuestos se conservan como causas y componentes técnicos del tiempo end-to-end.

#### 9. No existe un tiempo universal de trabajador

Esta tarea no fija una duración única para todas las tareas de Vento OS.

Queda prohibido declarar, por ejemplo:

```text
TODA TAREA DEBE DURAR X SEGUNDOS
```

El tiempo objetivo debe corresponder a:

- tarea concreta;
- actor o cohorte relevante;
- contexto operativo;
- estación o dispositivo;
- frecuencia;
- criticidad;
- controles obligatorios;
- modalidad física;
- condiciones aprobadas del package.

#### 10. Fuente obligatoria del tiempo objetivo

Cada ejecución futura `UX-QA-014::<package_id>` deberá vincular el tiempo objetivo con una fuente aprobada y trazable.

La fuente puede proceder, según el caso, de:

- línea base y objetivo definidos al aplicar `UX-BASE-008`;
- criterios de aceptación del proceso o superficie propietaria;
- plan de prueba del package;
- criterios aprobados de piloto;
- requisito operativo o empresarial ya canónico;
- evidencia histórica aprobada y suficientemente comparable.

Si el package no puede demostrar de dónde sale el tiempo objetivo, `UX-QA-014` no inventa uno y la certificación queda bloqueada.

#### 11. Una línea base no es automáticamente el objetivo

El tiempo AS-IS observado puede contener:

- recaptura;
- pasos redundantes;
- espera evitable;
- navegación incorrecta;
- copia manual entre aplicaciones;
- errores de diseño;
- entrenamiento informal;
- contingencias permanentes.

Por tanto:

```text
TIEMPO AS-IS
!=
TIEMPO OBJETIVO POR DEFINICIÓN
```

La línea base sirve para comparar y justificar el objetivo, no para congelar ineficiencias.

#### 12. El objetivo no se reduce por deseo

Un tiempo objetivo menor debe conservar:

- mismo o mejor resultado;
- misma o mejor seguridad;
- misma autorización;
- misma atribución;
- misma evidencia;
- mismo control de diferencias;
- misma idempotencia;
- recuperación no peor;
- accesibilidad no peor.

No se acepta un objetivo que solo pueda cumplirse omitiendo controles.

#### 13. Unidad certificable

La unidad mínima de evidencia deberá distinguir:

- package;
- proceso;
- paso o tarea;
- escenario;
- actor o cohorte;
- contexto;
- estación y dispositivo;
- datos utilizados;
- condición de red y dependencias;
- objetivo temporal aplicable;
- resultado esperado;
- resultado observado.

Una cifra agregada de toda una aplicación no sustituye esa unidad.

#### 14. Inicio de la medición

El inicio debe ser un evento observable y reproducible.

Para una tarea ordinaria puede corresponder al primer instante en que:

- la obligación está disponible para el actor;
- el actor ya fue identificado;
- el contexto requerido está resuelto;
- las precondiciones conocidas están disponibles;
- la acción puede comenzar legítimamente.

Si el package incluye descubrimiento o navegación dentro del objetivo, el inicio se ubica antes y esa decisión debe estar declarada.

#### 15. Inicio después de una interrupción

Cuando el escenario proviene de `UX-QA-013`, el reloj atribuible a ejecución no empieza mientras el estado esté siendo reconstruido o validado.

Empieza cuando la obligación queda legítimamente:

- reanudable;
- reanudable con revisión ya presentada;
- reasignada al actor actual;
- disponible después de resolver la condición aplicable.

La recuperación técnica previa se registra por separado.

#### 16. Fin de la medición

El fin debe corresponder a un resultado empresarial o handoff que el propietario reconozca como cierre de la obligación del actor medido.

No se detiene el reloj únicamente porque:

- cambió la URL;
- desapareció un modal;
- apareció un toast;
- se cerró una pantalla;
- se envió una solicitud sin receipt;
- se inició un job cuyo resultado todavía pertenece a la misma obligación humana.

#### 17. Handoff como final válido

Un handoff puede cerrar la tarea del actor medido únicamente cuando el proceso propietario define que la responsabilidad de esa persona termina allí.

En ese caso deben existir:

- handoff válido;
- destinatario o cola propietaria;
- estado trazable;
- resultado de entrega u oferta según contrato;
- siguiente responsabilidad claramente separada.

La espera posterior no se carga artificialmente al actor anterior.

#### 18. Trabajo pendiente no es finalización

No se considera tarea completada por el trabajador cuando el sistema únicamente muestra:

- guardado local;
- pendiente de sincronización;
- resultado desconocido;
- validando;
- esperando receipt;
- operación en cola sin que el proceso defina allí el fin de responsabilidad humana.

La frontera exacta la conserva el proceso propietario.

#### 19. Tiempo end-to-end

La evidencia conserva el tiempo total observado desde el inicio declarado hasta el fin declarado.

Este valor refleja la experiencia completa del escenario.

Debe poder descomponerse para evitar atribuciones incorrectas.

#### 20. Tiempo activo

El tiempo activo comprende periodos en los que la persona puede avanzar materialmente la tarea mediante una acción esperada.

Incluye, cuando corresponda:

- lectura necesaria;
- captura;
- selección;
- comparación;
- verificación;
- movimiento físico propio de la tarea;
- uso de periféricos bajo control del actor;
- corrección de errores propios del flujo observado.

No significa productividad individual.

#### 21. Espera técnica

Se registra separadamente el tiempo en que la persona no puede avanzar por:

- latencia de sistema;
- carga de datos;
- autenticación técnica;
- procesamiento servidor;
- cola técnica;
- periférico;
- dependencia externa;
- sincronización;
- recuperación de conectividad.

Los presupuestos técnicos aplicables permanecen gobernados por `NFR-REQ-003` y contratos propietarios.

#### 22. Espera empresarial legítima

Se registra separadamente la espera causada por:

- aprobación de otro actor;
- dependencia de otro proceso;
- recepción física;
- enfriamiento, cocción, maduración u otra condición material;
- ventana horaria;
- proveedor externo;
- conciliación;
- investigación requerida;
- handoff pendiente cuando la responsabilidad original todavía no terminó.

No se presenta como lentitud humana.

#### 23. Bloqueo

Cuando existe un bloqueo real:

- se conserva el instante de aparición;
- se conserva su duración;
- se registra si la tarea podía avanzar por otra vía válida;
- se distingue de una espera ordinaria;
- no se obliga a la persona a reintentar para “mantener el cronómetro”.

La comprensibilidad del bloqueo pertenece a `UX-QA-015`.

#### 24. Reautenticación y step-up

Una reautenticación exigida por riesgo puede formar parte legítima del tiempo end-to-end.

Debe registrarse separadamente cuando:

- fue requerida por política;
- el sistema la repitió innecesariamente;
- falló por plataforma;
- el actor no podía continuar sin ella.

No se reduce seguridad para mejorar el tiempo.

#### 25. Interrupción

Una interrupción real debe separar:

- tiempo anterior a la interrupción;
- pausa;
- recuperación;
- tiempo posterior a la reanudación.

La pausa no se atribuye al trabajador cuando el escenario establece que no podía avanzar.

La continuidad debe conservar la semántica aprobada por `UX-QA-013`.

#### 26. Cambio de actor

Si la tarea cambia legítimamente de actor:

- se cierra o segmenta la medición del actor anterior según el proceso;
- no se transfiere automáticamente su tiempo activo al nuevo actor;
- el objetivo del nuevo actor se evalúa contra su responsabilidad propia;
- se conserva el tiempo end-to-end del proceso cuando sea una métrica adicional pertinente.

No se construye un ranking individual combinando actores distintos.

#### 27. Cambio de dispositivo o estación

Cuando el flujo exige desplazamiento o cambio de estación, el tiempo se conserva como parte del escenario si el diseño aprobado lo requiere.

Debe distinguirse si el cambio es:

- necesario por operación;
- provocado por limitación del sistema;
- provocado por falta de periférico;
- provocado por incompatibilidad;
- evitable mediante un diseño posterior.

#### 28. Condiciones físicas representativas

La certificación posterior debe usar, cuando aplique:

- tamaño y montaje de pantalla reales;
- postura real;
- guantes o manos ocupadas;
- ruido;
- iluminación;
- humedad o grasa;
- movilidad;
- escáner;
- impresora;
- báscula;
- datáfono;
- red representativa;
- cambio de actor en estación compartida.

Un escritorio de desarrollo no sustituye automáticamente la estación objetivo.

#### 29. Accesibilidad

El tiempo objetivo no puede invalidar una alternativa accesible ni penalizar a quien la utilice.

Se conserva:

```text
MÁS TIEMPO POR UNA MODALIDAD ACCESIBLE
!=
FALLO DEL TRABAJADOR
```

La certificación evalúa si la experiencia ofrece una ruta funcional, segura y razonable para los perfiles soportados.

#### 30. Ajustes y necesidades representativas

Cuando una persona usa:

- lector de pantalla;
- zoom;
- teclado;
- navegación por interruptor;
- alto contraste;
- texto grande;
- reducción de movimiento;
- alternativa a gesto o arrastre;

la evidencia debe conservar esa modalidad.

No se mezclan tiempos de modalidades materialmente distintas como si fueran idénticas.

#### 31. Trabajadores nuevos y experimentados

Cuando la tarea tenga curva de aprendizaje material, la evidencia debe distinguir, si aplica:

- trabajadores nuevos;
- trabajadores experimentados;
- familiaridad digital relevante;
- capacitación recibida;
- práctica previa con el prototipo o sistema.

El objetivo no se prueba únicamente con quienes diseñaron o implementaron la solución.

#### 32. Capacitación

La capacitación no puede usarse para compensar permanentemente:

- navegación confusa;
- términos técnicos no comprensibles;
- pasos redundantes;
- estados ambiguos;
- errores recuperables mal diseñados.

La evidencia deberá indicar qué conocimiento previo era legítimamente requerido por el puesto.

#### 33. Primera ejecución y uso habitual

Cuando sean materialmente diferentes, se distinguen:

- primera ejecución;
- uso habitual;
- recuperación después de ausencia prolongada;
- ejecución después de cambio de proceso o interfaz.

No se aprueba una tarea frecuente solo porque el equipo experto la ejecuta rápido después de memorizarla.

#### 34. Camino ordinario

El tiempo objetivo del camino ordinario se mide sobre el flujo correcto y autorizado.

No se permite acelerar mediante:

- bypass de aprobación;
- omisión de verificación;
- ocultamiento de diferencias;
- uso de datos stale;
- reutilización de contexto inválido;
- autoaprobación;
- acciones masivas no autorizadas;
- reintentos ciegos.

#### 35. Excepciones

Las acciones excepcionales no deben contaminar el tiempo objetivo del camino ordinario.

Cuando el escenario incluye una excepción real:

- se mide como escenario separado;
- conserva su autoridad y controles;
- se documenta su causa;
- no se compara directamente con un caso ordinario como si fueran equivalentes.

#### 36. Error y corrección

Se registran por escenario:

- errores de selección;
- captura incorrecta;
- retrocesos;
- correcciones;
- validaciones fallidas;
- intentos repetidos;
- deshacer o volver a intentar cuando sea legítimo.

Una tarea que cumple el tiempo únicamente porque el participante no detectó un error no obtiene PASS.

#### 37. Ayuda requerida

Se registra si la persona necesitó:

- instrucciones adicionales;
- apoyo de otro trabajador;
- soporte técnico;
- documentación externa;
- explicación del término;
- ayuda para recuperar un error.

La ayuda esperada por diseño debe estar declarada; la ayuda improvisada cuenta como fricción.

#### 38. Abandono

Un escenario abandonado no desaparece del análisis temporal.

Debe conservar:

- punto de abandono;
- tiempo transcurrido;
- causa observada;
- estado del trabajo;
- posibilidad de recuperación;
- necesidad de ayuda.

La ausencia de finalización es un resultado de la prueba.

#### 39. Reintentos

Un reintento por:

- doble toque;
- timeout;
- pérdida de respuesta;
- reconexión;
- navegador;
- periférico;

no se presenta como trabajo adicional imputable al trabajador sin analizar su causa.

Los efectos empresariales conservan idempotencia y resultado recuperable.

#### 40. Offline y conectividad inestable

Cuando el package admite trabajo offline:

- se distingue captura local de confirmación autoritativa;
- se mide el trabajo humano disponible offline;
- se registra espera de sincronización por separado;
- una reconexión no obliga a rehacer trabajo válido;
- un estado pendiente no se cuenta como completado si el proceso exige confirmación.

#### 41. Periféricos

El escenario conserva por separado:

- interacción humana;
- lectura o captura del periférico;
- procesamiento técnico;
- confirmación autoritativa;
- resultado físico cuando aplique.

Un periférico lento puede hacer fallar el tiempo objetivo end-to-end sin convertir al trabajador en causa del incumplimiento.

#### 42. Tareas por lote

Cuando existe trabajo por lote, el objetivo debe declarar la unidad medida:

- lote completo;
- elemento individual;
- preparación del lote;
- tratamiento de excepciones;
- cierre o conciliación.

No se divide el tiempo por cantidad para afirmar artificialmente cumplimiento individual cuando existen costos fijos o excepciones materiales.

#### 43. Tareas multiaplicación

Una tarea que atraviesa aplicaciones conserva:

- misma intención;
- mismo proceso;
- misma obligación o handoff trazable;
- tiempos por tramo;
- tiempo de transición;
- tiempo de revalidación;
- tiempo de espera.

La navegación rápida no compensa pérdida de contexto o autoridad.

#### 44. Búsqueda y descubrimiento

Cuando encontrar la tarea forma parte del objetivo, se registra separadamente:

- tiempo hasta encontrarla;
- primera selección correcta;
- búsqueda utilizada;
- ruta equivocada;
- retroceso;
- ayuda terminológica.

El tiempo de descubrimiento no se oculta iniciando el cronómetro después de que otra persona abrió la pantalla correcta.

#### 45. Acción principal y cierre

La tarea debe permitir que la persona identifique:

- qué debe hacer;
- sobre qué recurso;
- con qué efecto;
- cuándo terminó;
- cuál es el siguiente paso.

La falta de claridad que genera espera, duda o retroceso se conserva como evidencia.

#### 46. Datos de prueba

Los datos deben ser realistas respecto de:

- cardinalidad;
- estados;
- diferencias;
- unidades;
- nombres;
- cantidades;
- excepciones;
- historial relevante.

Un fixture trivial no certifica una tarea que en operación trabaja con listas, variantes o diferencias materiales.

#### 47. Datos sensibles

La prueba no necesita exponer datos personales o secretos reales para medir tiempo.

Se utilizan datos minimizados, sintéticos o protegidos cuando sea posible.

La evidencia temporal no contiene:

- PIN;
- tokens;
- secretos;
- credenciales;
- datos personales innecesarios;
- contenido sensible completo.

#### 48. Evidencia mínima por ejecución

Cada ejecución física futura debe conservar suficiente evidencia para reconstruir:

- qué se pidió hacer;
- quién participó por cohorte o identificador minimizado;
- dónde y con qué dispositivo;
- qué datos se usaron;
- cuál era el objetivo;
- cuándo empezó;
- cuándo terminó;
- qué esperas ocurrieron;
- qué errores ocurrieron;
- qué ayuda fue necesaria;
- cuál fue el resultado;
- si el resultado fue correcto;
- qué controles permanecieron activos.

#### 49. Evidencia temporal

La evidencia debe permitir distinguir al menos:

- tiempo end-to-end;
- tiempo activo;
- espera técnica;
- espera empresarial;
- bloqueo;
- interrupción;
- recuperación;
- handoff cuando aplique.

No exige una implementación única de telemetría.

#### 50. No se aprueba con un promedio aislado

Un promedio puede ocultar:

- abandonos;
- outliers repetibles;
- una cohorte que no puede completar;
- latencia de cola;
- errores graves;
- fallos de accesibilidad;
- dependencia de ayuda.

La evidencia deberá conservar la distribución o los resultados individuales minimizados suficientes para explicar variación material.

#### 51. Tamaño de muestra

Esta tarea no inventa un tamaño universal de muestra humana.

El package debe justificar el conjunto de participantes según:

- riesgo;
- frecuencia;
- número de actores;
- diferencias entre sedes o áreas;
- experiencia;
- modalidad física;
- accesibilidad;
- criticidad del resultado.

Una muestra pequeña se interpreta cualitativamente y no se presenta como precisión estadística inexistente.

#### 52. Comparación con baseline

Cuando exista baseline comparable, la evidencia registra:

- tiempo anterior;
- tiempo nuevo;
- cambio de errores;
- cambio de ayuda;
- cambio de pasos;
- cambio de espera;
- cambio de recuperación;
- cambio de satisfacción o comprensión cuando aplique.

La mejora temporal no compensa una degradación material de seguridad o calidad.

#### 53. Condiciones de pico

Las tareas sensibles a picos deben probarse en una carga representativa o mediante evidencia equivalente del package.

Debe distinguirse si el incumplimiento proviene de:

- concurrencia;
- cola;
- dependencia lenta;
- estación compartida;
- disponibilidad de periférico;
- operación humana;
- diseño de flujo.

#### 54. Relación con presupuestos técnicos

Cuando el tiempo end-to-end falla y existe una etapa técnica aplicable, se contrasta con los presupuestos de `NFR-REQ-003`.

Esto permite determinar si el package incumple por:

- sistema;
- flujo humano;
- ambos;
- dependencia externa;
- condición física.

No permite reemplazar la prueba humana por un benchmark técnico.

#### 55. Calidad antes que velocidad

Bloquean PASS aunque el tiempo objetivo se cumpla:

- resultado incorrecto;
- omisión de control;
- duplicado;
- autorización inválida;
- pérdida de evidencia;
- bypass de segregación;
- uso de dato stale como vigente;
- pérdida de trabajo;
- exposición de información;
- acción irreversible no comprendida;
- accesibilidad materialmente insuficiente.

#### 56. Uso no punitivo

La métrica de tiempo se utiliza para evaluar el sistema, el flujo y la operación diseñada.

No se utiliza para:

- ranking individual;
- sanción disciplinaria;
- inferir motivación;
- inferir competencia general;
- comparar personas sin contexto;
- penalizar una discapacidad o ajuste;
- penalizar el registro correcto de una diferencia;
- incentivar omitir controles.

#### 57. Privacidad de participantes

La evidencia debe minimizar identidad personal.

Cuando sea necesario relacionar varias ejecuciones de una misma cohorte, se utilizará un identificador de estudio o mecanismo equivalente aprobado, sin convertir el artefacto de certificación en monitoreo productivo permanente.

#### 58. Observación y telemetría

La telemetría existente puede apoyar la evidencia cuando:

- sus eventos son semánticamente correctos;
- el inicio y fin pueden demostrarse;
- la versión de producto es conocida;
- el contexto es comparable;
- la privacidad está gobernada.

La telemetría no sustituye por sí sola la observación de comprensión, error, ayuda, postura o condición física.

#### 59. Resultado por escenario

Cada escenario posterior debe quedar clasificado de forma explícita como:

- cumple el objetivo y conserva calidad;
- no cumple el objetivo;
- no es comparable por cambio material de escenario;
- queda bloqueado por falta de objetivo o evidencia;
- no aplica al package.

La causa del incumplimiento se documenta sin atribuirla automáticamente al trabajador.

#### 60. Regla de PASS por package

`UX-QA-014::<package_id>` solo puede obtener PASS cuando:

- todos los escenarios obligatorios aplicables tienen objetivo trazable;
- el inicio y fin están definidos;
- la tarea se completa correctamente;
- el tiempo objetivo aplicable se cumple según el criterio aprobado del escenario;
- ningún guardrail crítico se degrada;
- los incumplimientos no quedan ocultos por promedios;
- toda excepción o hallazgo pendiente tiene propietario y condición de salida;
- la evidencia no está stale respecto de la versión certificada.

#### 61. Incumplimiento legítimamente no atribuible al trabajador

Cuando la tarea supera su objetivo por una causa externa al actor, el package sigue registrando el incumplimiento end-to-end si corresponde.

La evidencia debe asignar la causa al propietario correcto, por ejemplo:

- latencia técnica;
- dependencia externa;
- periférico;
- diseño de flujo;
- falta de información;
- bloqueo;
- handoff;
- contexto;
- red;
- capacidad.

No se transforma el fallo del sistema en fallo humano.

#### 62. Hallazgos diferidos

Todo hallazgo que no bloquee inmediatamente debe declarar:

- qué falta;
- impacto sobre el tiempo o la calidad;
- propietario canónico;
- por qué no bloquea el package actual;
- condición exacta de salida;
- evidencia que deberá volver a medirse.

No se crea una tarea nueva cuando ya existe un owner canónico.

#### 63. Regresión

Un package no conserva PASS indefinidamente si cambia materialmente:

- flujo;
- navegación;
- copy;
- número de pasos;
- autorización;
- dispositivo;
- periférico;
- red;
- integración;
- datos;
- contexto;
- política de reanudación;
- tarea o proceso propietario.

El cambio aplicable obliga a revalidar el escenario afectado.

#### 64. Compatibilidad con rollback

La evidencia de tiempo no puede impedir rollback cuando una nueva versión degrada:

- calidad;
- seguridad;
- accesibilidad;
- recuperación;
- estabilidad;
- tiempo objetivo de forma material.

El package conserva su estrategia de reversa y comparación.

#### 65. Certificación global final

`UX-QA-014::GLOBAL-FINAL` exige demostrar que:

- todos los packages aplicables fueron evaluados;
- no existen packages obligatorios sin evidencia;
- los objetivos utilizados son trazables y no contradictorios;
- los escenarios comparables conservan reglas coherentes;
- las diferencias legítimas por proceso, actor, estación o riesgo están declaradas;
- no existe una regla global punitiva de velocidad individual;
- no existen incumplimientos críticos abiertos sin propietario y salida;
- la evidencia global corresponde a versiones vigentes.

#### 66. No se promedia el ecosistema para ocultar fallos

Un package o escenario crítico que incumple no obtiene cobertura por promedio global.

```text
MUCHAS TAREAS RÁPIDAS
+
UNA TAREA CRÍTICA IMPOSIBLE O INSEGURA
!=
CERTIFICACIÓN GLOBAL
```

#### 67. Identidad de ejecución física futura

La topología aplicable es:

```text
MODE: PER_PACKAGE_AND_GLOBAL_FINAL
EXECUTION_GATE: POST_E5_PACKAGE
```

Identidades futuras:

```text
UX-QA-014::<package_id>
UX-QA-014::GLOBAL-FINAL
```

Esta aprobación documental no crea ni ejecuta esas instancias.

#### 68. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea certifica obligaciones de eficiencia, finalización correcta, rendimiento técnico, accesibilidad, continuidad, estaciones y recuperación ya registradas. No introduce una obligación verificable nueva que requiera modificar el Registro Canónico de Requisitos de Prueba.

#### 69. Cobertura de prueba vigente reutilizada

Sin modificar el registro, la cobertura reutilizada incluye:

- `TREQ-UX-041` a `TREQ-UX-058` — navegación humana, búsqueda, retorno, telemetría y validación terminológica que afectan descubrimiento y transición hacia la tarea;
- `TREQ-UX-139` a `TREQ-UX-159` — línea base de fricción end-to-end, camino ordinario mínimo, continuidad, latencia, idempotencia, recuperación, métricas y guardrails laborales derivados de `UX-BASE-008`;
- `TREQ-UX-204` a `TREQ-UX-226` — perfil táctil, ergonomía, reflow, entradas, periféricos, ambiente, dispositivo compartido, conectividad, accesibilidad y prueba física;
- `TREQ-UX-274` a `TREQ-UX-296` — checkpoint, interrupción, reanudación, actores, contexto, conflictos, dispositivos, aplicaciones y recuperación que permiten segmentar correctamente el tiempo después de una interrupción;
- `TREQ-PROC-271` a `TREQ-PROC-294` — presupuestos de respuesta, inicio y fin técnico, percentiles, hard ceilings, trabajo asíncrono, timeout, idempotencia, dispositivos, periféricos, integraciones, carga y evidencia de `NFR-REQ-003`;
- `TREQ-PROC-390` a `TREQ-PROC-424` — accesibilidad, ergonomía, tiempo suficiente, error, recuperación, dispositivos reales y validación con trabajadores derivados de `NFR-REQ-007`;
- requisitos propietarios de proceso, estación, autorización, integración, contingencia y package que cada ejecución declare aplicables.

Estas referencias son trazabilidad heredada y no representan cambios del registro.

#### 70. Evidencia de validación

| Clase | Estado | Evidencia documental disponible en esta aprobación |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecuta build de producto ni benchmark físico para aprobar este contrato documental. |
| LOCAL | NOT_EXECUTED | La incorporación, formateo, quality, delivery check y batería real del checkout corresponden a la ejecución posterior. |
| REMOTA | PASS | Se verificaron `main`, owner del BLOQUE U, marcador `UX-QA-014`, continuidad, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, `UX-BASE-008`, `NFR-REQ-003`, guardrails de accesibilidad y la base aprobada `UX-QA-013`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron todavía sesiones humanas, mediciones end-to-end ni escenarios representativos de packages desplegados durante esta aprobación documental. |
| FÍSICA | NOT_EXECUTED | Las instancias por package y `GLOBAL-FINAL` permanecen sujetas a `POST_E5_PACKAGE` y evidencia real posterior. |

#### 71. Seguridad de la evidencia

La evidencia temporal no debe exponer:

- secretos;
- credenciales;
- PIN;
- tokens;
- payloads sensibles completos;
- datos personales innecesarios;
- diagnósticos o información de salud;
- datos de otro actor;
- texto libre no necesario para explicar el escenario.

#### 72. Fallos críticos

Bloquean PASS del package cuando aplican:

- cumplir el tiempo omitiendo un control obligatorio;
- completar con resultado incorrecto;
- duplicar un efecto;
- medir desde un punto artificialmente tardío;
- detener el cronómetro antes del resultado válido;
- ocultar espera o error para mejorar la cifra;
- atribuir latencia técnica al trabajador;
- penalizar una modalidad accesible;
- depender de ayuda no declarada para completar el flujo;
- usar una muestra no representativa para afirmar cobertura general;
- excluir abandonos del resultado;
- perder contexto o trabajo durante interrupción;
- no tener fuente aprobada para el tiempo objetivo;
- no poder explicar una desviación material.

#### 73. Criterios de aceptación

- [ ] Se define una certificación temporal por package y `GLOBAL-FINAL`.
- [ ] La tarea consume el handoff de `UX-QA-013` sin reabrir continuidad ya clasificada.
- [ ] Tiempo de tarea, tiempo de respuesta técnico, tiempo total del proceso y atención humana permanecen separados.
- [ ] No existe una duración universal inventada para trabajadores.
- [ ] Cada escenario exige un tiempo objetivo aprobado y trazable.
- [ ] La línea base AS-IS no se confunde automáticamente con el objetivo.
- [ ] Inicio y fin de la medición son observables y reproducibles.
- [ ] El tiempo end-to-end se descompone en actividad y esperas relevantes.
- [ ] Latencia técnica conserva ownership técnico y no se imputa automáticamente al trabajador.
- [ ] Dependencias, handoffs y bloqueos se registran sin distorsionar la responsabilidad humana.
- [ ] Interrupciones y reanudaciones conservan la semántica de `UX-QA-013`.
- [ ] Cambio de actor no produce ranking ni transferencia artificial de tiempo.
- [ ] Dispositivo, estación, periféricos y condiciones físicas se prueban cuando aplican.
- [ ] Accesibilidad y ajustes no se penalizan por velocidad.
- [ ] Trabajadores nuevos y experimentados se distinguen cuando la curva de aprendizaje es material.
- [ ] La capacitación no compensa una interfaz permanentemente deficiente.
- [ ] Excepciones se miden separadas del camino ordinario.
- [ ] Errores, correcciones, ayuda y abandonos permanecen dentro de la evidencia.
- [ ] Offline, retries y resultado desconocido no crean tiempo ficticio ni efectos duplicados.
- [ ] Las tareas por lote declaran su unidad de medición.
- [ ] Las tareas multiapp conservan trazabilidad por tramo.
- [ ] Si descubrimiento forma parte del objetivo, no se inicia el cronómetro después de abrir la pantalla correcta.
- [ ] El resultado correcto prevalece sobre velocidad.
- [ ] No se aprueba por promedio aislado.
- [ ] El tamaño de muestra se justifica por riesgo y contexto, sin falsa precisión estadística.
- [ ] La métrica no se usa como vigilancia ni ranking individual.
- [ ] Cada incumplimiento conserva propietario y condición de salida.
- [ ] `UX-QA-014::<package_id>` solo obtiene PASS con todos sus escenarios obligatorios aplicables resueltos.
- [ ] `GLOBAL-FINAL` no oculta un fallo crítico mediante promedio del ecosistema.
- [ ] No se crea ni modifica ningún requisito de prueba.
- [ ] No se ejecutan cambios físicos durante esta tarea documental.
- [ ] `UX-QA-015` conserva íntegramente la responsabilidad de certificar comprensibilidad de bloqueos.

#### 74. Límites

Esta tarea:

- no define salarios, cuotas ni productividad laboral;
- no crea ranking de trabajadores;
- no establece un tiempo universal;
- no implementa telemetría productiva;
- no crea analytics nuevos;
- no cambia rutas;
- no modifica procesos;
- no cambia autorización;
- no implementa colas;
- no modifica handoffs;
- no cambia contratos de reanudación;
- no modifica `NFR-REQ-003`;
- no modifica `UX-BASE-008`;
- no modifica dispositivos ni periféricos;
- no publica componentes;
- no modifica datos;
- no modifica Supabase;
- no ejecuta pruebas físicas;
- no certifica packages antes de `POST_E5_PACKAGE`;
- no certifica todavía la comprensibilidad de bloqueos.

#### 75. Handoff a `UX-QA-015`

`UX-QA-014` entrega a `UX-QA-015`:

- package y escenario;
- actor o cohorte;
- proceso y tarea;
- contexto y estación;
- objetivo temporal trazable;
- tiempo end-to-end observado;
- segmentación entre tiempo activo y esperas;
- bloqueos encontrados;
- momento y duración de cada bloqueo;
- efecto del bloqueo sobre finalización, error, ayuda o abandono;
- evidencia de si la persona pudo identificar el siguiente paso;
- causa técnica o empresarial del bloqueo cuando ya esté resuelta;
- hallazgos que requieren lenguaje humano, explicación o recuperación más clara.

`UX-QA-015` podrá certificar la comprensibilidad de los bloqueos sin reinterpretar el objetivo temporal ni culpar al trabajador por la existencia del bloqueo.

#### 76. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-013 — El retorno conserva el proceso cuando corresponde`

**TAREA ACTUAL APROBADA**
`UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-015 — Los bloqueos se entienden sin códigos técnicos`
### ✅ UX-QA-015 — Los bloqueos se entienden sin códigos técnicos

**Estado:** APROBADA
**Tarea anterior:** UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo
**Tarea siguiente:** UX-QA-016 — La información sensible se oculta correctamente
**Tipo de tarea:** documental; definición canónica de la certificación integral de experiencia que demuestra por package y globalmente que bloqueos, denegaciones, esperas, conflictos, fallos técnicos, validaciones y estados relacionados se presentan en lenguaje humano, específico, accionable, seguro y accesible, sin exigir que la persona interprete reason codes, permission keys, SQLSTATE, errores de proveedor, nombres de tablas, enums internos o diagnósticos técnicos, y sin convertir el mensaje visible en fuente de autorización o estado empresarial
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/02_PRUEBAS_INTEGRALES_DE_EXPERIENCIA.md`
**Estado físico resultante:** contrato documental de certificación de comprensibilidad de bloqueos definido; las ejecuciones `UX-QA-015::<package_id>` y `UX-QA-015::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la tarea consume el handoff aprobado de `UX-QA-014`, el contrato `UX-HUMAN-BLOCKING-EXPLANATION-CONTRACT-001`, las políticas de explicación ya aprobadas por aplicaciones y la evidencia que cada package declare aplicable, sin afirmar que la existencia de `ContextDiagnostic`, catálogos de reason codes o copy documental certifique adopción end-to-end
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican código, copy productivo, rutas, componentes, contratos runtime, catálogos de mensajes, reason codes, autorización, telemetría, procesos, work items, datos, Supabase, dispositivos, configuración, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo Vento OS certificará que una persona puede comprender un bloqueo o condición equivalente sin interpretar códigos técnicos y puede identificar con seguridad qué ocurrió, qué no ocurrió, qué quedó preservado, qué le impide continuar, qué puede hacer ahora y quién o qué condición resolverá el impedimento.

La certificación deberá responder, para cada scenario aplicable:

```text
¿LA PERSONA ENTIENDE QUÉ LE IMPIDE CONTINUAR?
¿ENTIENDE POR QUÉ OCURRE EN ESTE CASO?
¿SABE QUÉ ACCIÓN O RESULTADO QUEDÓ BLOQUEADO?
¿SABE QUÉ INFORMACIÓN O TRABAJO QUEDÓ GUARDADO?
¿SABE QUÉ PUEDE HACER AHORA?
¿SABE QUIÉN O QUÉ CONDICIÓN PUEDE RESOLVERLO?
¿SABE CUÁNDO REVISAR, REINTENTAR O ESCALAR?
¿PUEDE DAR UNA REFERENCIA SEGURA A SOPORTE SIN COPIAR DIAGNÓSTICO INTERNO?
```

Regla central:

```text
CAUSA ESTRUCTURADA Y AUDITABLE
+
CONTEXTO SEGURO
+
ESTADO REAL DE LA OPERACIÓN
+
POLÍTICA DE RECUPERACIÓN
→
EXPLICACIÓN HUMANA ACCIONABLE
```

Y también:

```text
MENSAJE HUMANO
!=
REASON CODE
!=
DECISIÓN DE AUTORIZACIÓN
!=
ESTADO DE DOMINIO
!=
EXCEPCIÓN TÉCNICA
```

#### 2. Resultado documental

`UX-QA-015` define el contrato de certificación integral de comprensibilidad de bloqueos para BLOQUE U.

El resultado establece:

- unidad certificable por package y escenario;
- clasificación mínima de condiciones;
- oracle humano de comprensión y acción;
- frontera entre causa estructurada y copy visible;
- reglas para estado preservado y siguiente acción;
- tratamiento de denegaciones, esperas, conflictos y fallos técnicos;
- reglas de reintento y resultado desconocido;
- seguridad de referencias y diagnóstico secundario;
- accesibilidad y lenguaje no punitivo;
- pruebas con actores representativos;
- criterios de PASS por package;
- criterio `GLOBAL-FINAL`;
- handoff exacto a `UX-QA-016`.

#### 3. Handoff recibido de `UX-QA-014`

`UX-QA-014` entrega:

- package y escenario;
- actor o cohorte;
- proceso y tarea;
- contexto y estación;
- objetivo temporal trazable;
- tiempo end-to-end observado;
- segmentación entre tiempo activo y esperas;
- bloqueos encontrados;
- momento y duración de cada bloqueo;
- efecto del bloqueo sobre finalización, error, ayuda o abandono;
- evidencia de si la persona pudo identificar el siguiente paso;
- causa técnica o empresarial del bloqueo cuando ya esté resuelta;
- hallazgos que requieren lenguaje humano, explicación o recuperación más clara.

`UX-QA-015` usa ese handoff para certificar comprensión sin reinterpretar el objetivo temporal ni atribuir el bloqueo a la persona trabajadora.

#### 4. Alcance exacto

La certificación aplica a condiciones visibles o materialmente relevantes que:

- impiden ejecutar una acción;
- limitan una acción;
- suspenden una acción;
- retrasan una acción;
- requieren corregir información;
- exigen esperar otra condición o actor;
- detectan conflicto o versión obsoleta;
- informan un fallo técnico;
- informan un resultado desconocido;
- requieren escalamiento o revisión;
- advierten un riesgo sin impedir continuar.

No se certifica únicamente la presencia de un componente visual. Se certifica la experiencia completa desde la causa vigente hasta la comprensión y siguiente acción de la persona.

#### 5. Frontera con `UX-QA-014`

`UX-QA-014` responde:

```text
¿EL TRABAJO PUEDE COMPLETARSE
DENTRO DEL TIEMPO OBJETIVO?
```

`UX-QA-015` responde:

```text
¿CUANDO EL FLUJO SE BLOQUEA O CAMBIA DE ESTADO,
LA PERSONA ENTIENDE QUÉ PASA Y QUÉ HACER
SIN INTERPRETAR CÓDIGOS TÉCNICOS?
```

Un bloqueo puede explicar parte de un incumplimiento temporal, pero `UX-QA-015` no recalcula ni redefine el tiempo objetivo de `UX-QA-014`.

#### 6. Frontera con `UX-QA-016`

`UX-QA-016` certificará que la información sensible se oculta correctamente.

`UX-QA-015` sí exige que el mensaje visible no necesite exponer:

- secretos;
- tokens;
- credenciales;
- stack traces;
- SQL;
- payloads completos;
- nombres internos innecesarios;
- permisos de terceros;
- diagnósticos sensibles.

Pero no certifica por sí sola toda la política de masking, minimización o privacidad de datos del ecosistema. Esa responsabilidad permanece en `UX-QA-016`.

#### 7. Autoridad de `UX-BASE-006`

`UX-BASE-006` ya define `UX-HUMAN-BLOCKING-EXPLANATION-CONTRACT-001`.

`UX-QA-015` no redefine ese contrato. Lo convierte en certificación integral posterior por package y globalmente.

La separación canónica permanece:

```text
CAUSA ESTRUCTURADA Y AUDITABLE
→ TRADUCCIÓN HUMANA SEGÚN ACTOR, CONTEXTO Y CANAL
```

#### 8. Autoridad de aplicaciones y superficies propietarias

Las aplicaciones pueden especializar mensajes y presentación cuando conserven:

- la misma causa estructurada vigente;
- la misma semántica empresarial;
- la misma frontera de autorización;
- el estado real de la operación;
- la política de recuperación autorizada;
- minimización y accesibilidad equivalentes.

Un copy local no puede inventar una causa distinta para hacer el mensaje más cómodo.

#### 9. Evidencia compartida existente

Existe una materialización compartida `ContextDiagnostic` capaz de presentar:

- título;
- resumen;
- condiciones;
- contexto preservado;
- acciones bloqueadas;
- instrucción de resolución;
- responsable opcional;
- condición de revisión opcional;
- referencia de soporte opcional.

Su validador físico mantiene reason codes, `blocked_reasons`, autoridad, contexto runtime, permisos, Supabase y recuperación fuera del componente.

Esa materialización es evidencia de una pieza reutilizable, no evidencia de adopción integral por todos los consumidores ni de comprensión humana en todas las aplicaciones.

#### 10. Unidad certificable

La unidad futura será:

```text
UX-QA-015::<package_id>
```

Cada unidad certifica únicamente los escenarios de bloqueo aplicables a ese package.

La certificación global final será:

```text
UX-QA-015::GLOBAL-FINAL
```

No existe PASS global si falta evidencia obligatoria de un package incluido en el universo final.

#### 11. Topología y gate

Se conserva:

```text
MODE = PER_PACKAGE_AND_GLOBAL_FINAL
EXECUTION_GATE = POST_E5_PACKAGE
```

La tarea documental no ejecuta esas instancias.

#### 12. No existe un mensaje universal

Queda prohibido tratar cualquiera de estos textos como solución universal:

```text
Ocurrió un error
Acceso denegado
No autorizado
Algo salió mal
No se pudo procesar
Intenta nuevamente
Operación inválida
Contacta al administrador
```

Un mensaje puede ser breve, pero debe conservar la información necesaria para decidir con seguridad.

#### 13. Taxonomía mínima obligatoria

La certificación distingue al menos:

| Clase | Significado |
| --- | --- |
| `BLOCKED` | La acción es pertinente, pero falta una condición obligatoria. |
| `DENIED` | La autorización no permite la acción para el actor, alcance o recurso actuales. |
| `WAITING` | La tarea depende normalmente de tiempo, evento o actor externo. |
| `CONFLICT` | El recurso o versión cambió y no puede aplicarse la intención anterior sin revisión. |
| `TECHNICAL_FAILURE` | Una dependencia técnica falló o no respondió. |
| `VALIDATION_REQUIRED` | Falta información, evidencia o corrección que la persona puede aportar. |
| `WARNING` | Puede continuarse, pero existe riesgo o consecuencia que debe comprenderse. |
| `INFO` | Existe una condición relevante sin acción inmediata obligatoria. |

Queda prohibido presentar todo resultado distinto de éxito como `TECHNICAL_FAILURE`.

#### 14. Oracle humano de comprensión

Para un bloqueo aplicable, la persona debe poder explicar con sus propias palabras, según corresponda:

```text
1. QUÉ PASÓ
2. QUÉ NO PASÓ
3. QUÉ QUEDÓ GUARDADO
4. QUÉ IMPIDE CONTINUAR
5. QUÉ PUEDE HACER AHORA
6. QUIÉN O QUÉ LO RESUELVE
7. CUÁNDO REVISAR O REINTENTAR
8. QUÉ REFERENCIA SEGURA PUEDE DAR A SOPORTE
```

La prueba no debe enseñar previamente la respuesta ni traducir el mensaje durante la ejecución.

#### 15. Título humano

El título describe el efecto o condición visible para la persona.

Ejemplos válidos:

```text
Falta identificar al trabajador
La recepción espera la entrega del conductor
Tu jornada terminó
Las cantidades cambiaron mientras revisabas
No pudimos confirmar el envío
Este documento necesita una corrección
```

No es suficiente:

```text
AUTH_CHECKIN_REQUIRED
RPC timeout
42501
PGRST116
Version mismatch
Constraint violation
```

#### 16. Causa segura

La causa visible explica la condición necesaria sin exponer detalle interno innecesario.

Debe distinguir, cuando aplique:

- falta de una condición;
- denegación real;
- espera normal;
- conflicto;
- problema técnico;
- dato corregible;
- resultado desconocido;
- estado stale o no disponible.

#### 17. Efecto

La explicación identifica qué acción, resultado o tramo queda afectado.

No basta indicar que existe un problema.

La persona debe poder saber si:

- no puede iniciar;
- no puede confirmar;
- no puede modificar;
- puede seguir leyendo;
- puede continuar con otras tareas;
- debe esperar;
- debe revisar cambios;
- debe escalar.

#### 18. Estado preservado

Cuando exista trabajo previo, la persona debe distinguir entre:

```text
NO SE GUARDÓ NINGÚN CAMBIO
SE GUARDÓ UN BORRADOR LOCAL
EL SERVIDOR CONFIRMÓ LOS CAMBIOS
SE GUARDÓ SOLO UNA PARTE
NO SE PUDO CONFIRMAR EL ESTADO
```

No se certifica un mensaje que obliga a adivinar si el trabajo se perdió.

#### 19. Siguiente acción

La acción propuesta debe ser:

- concreta;
- segura;
- actualmente ejecutable;
- coherente con el actor;
- coherente con el estado de dominio;
- coherente con la política de recuperación.

Ejemplos válidos:

```text
Identificarme en este dispositivo
Registrar el check-in
Revisar las cantidades modificadas
Actualizar la recepción antes de confirmar
Guardar y continuar después
Consultar el estado del envío
Solicitar corrección al proveedor
```

#### 20. Acción genérica insuficiente

No se certifica como suficiente una acción primaria que solo diga:

```text
Aceptar
Continuar
Resolver
Reintentar
Contactar administrador
```

cuando el usuario todavía no sabe qué condición debe resolver o por qué esa acción es segura.

#### 21. Responsable

Cuando la persona no pueda resolver el bloqueo directamente, la explicación identifica una clase de responsable o proceso coherente.

Ejemplos:

- responsable de la tarea anterior;
- supervisor del área;
- responsable de Compras;
- Talento;
- Contabilidad;
- soporte técnico;
- seguridad o privacidad;
- conciliación automática.

No se usa `administrador` como propietario universal.

#### 22. Condición de revisión

Cuando el bloqueo dependa de tiempo, evento o tercero, la explicación deberá indicar, cuando la fuente lo conozca:

- evento esperado;
- próxima revisión;
- condición de desbloqueo;
- ventana aplicable;
- posibilidad de continuar con otra tarea;
- condición de escalamiento.

No se inventan tiempos cuando la fuente no los define.

#### 23. Referencia segura de soporte

La persona puede recibir una referencia segura y reproducible para soporte o auditoría.

La referencia:

- no sustituye el mensaje humano;
- no revela secretos;
- no exige copiar stack traces;
- no exige copiar SQL;
- no exige interpretar el reason code;
- puede correlacionarse con evidencia técnica restringida.

#### 24. Reason code como dato secundario

Un reason code estable puede existir y ser necesario para:

- lógica propietaria;
- auditoría;
- telemetría;
- traducción;
- soporte restringido;
- consistencia entre canales.

Pero:

```text
REASON CODE
!=
COPY PRINCIPAL PARA EL TRABAJADOR
```

Si se muestra como referencia secundaria, debe estar claramente separado del contenido necesario para comprender y actuar.

#### 25. `BLOCKED`

Para `BLOCKED`, la prueba debe demostrar que la persona entiende:

- que la acción puede llegar a ser válida;
- qué condición falta;
- qué parte permanece disponible;
- quién o qué la desbloquea;
- qué hacer mientras tanto cuando exista alternativa.

No se presenta como sanción, permiso faltante genérico ni fallo técnico si la causa real es contextual o empresarial.

#### 26. `DENIED`

Para `DENIED`, la explicación debe:

- indicar la frontera funcional conocida;
- no ofrecer bypass;
- no sugerir usar una cuenta ajena;
- no recomendar cambiar de rol como atajo;
- no enumerar privilegios de otras personas;
- no revelar recursos que el actor no debe conocer.

La persona debe entender qué no está permitido sin recibir información sensible adicional.

#### 27. `WAITING`

Una espera normal no es un error.

La prueba debe comprobar que la persona puede identificar:

- qué evento se espera;
- quién posee la próxima acción cuando sea conocido;
- cuándo revisar o bajo qué condición cambia el estado;
- si puede hacer otra tarea;
- cómo escalar si se supera la condición prevista.

#### 28. `CONFLICT`

Ante conflicto o versión obsoleta, la explicación debe indicar:

- qué cambió;
- si el trabajo local quedó guardado;
- qué versión o fuente es autoritativa;
- qué se debe revisar;
- si se puede reaplicar, comparar o descartar;
- quién conserva el trabajo o custodia.

Queda prohibido ocultar el conflicto y aplicar `last write wins` silencioso.

#### 29. `TECHNICAL_FAILURE`

Un fallo técnico distingue al menos, cuando aplique:

```text
FALLO ANTES DE ENVIAR
DEPENDENCIA NO DISPONIBLE
TIMEOUT CON RESULTADO DESCONOCIDO
FALLO DESPUÉS DE CONFIRMACIÓN
SINCRONIZACIÓN PARCIAL
ERROR TERMINAL
```

La persona recibe el efecto conocido, el estado preservado, la acción segura y una referencia de soporte.

#### 30. `VALIDATION_REQUIRED`

Cuando la persona puede corregir el problema, el mensaje debe localizar la condición exacta.

Ejemplos:

```text
Falta seleccionar el lote de origen
Debes registrar una razón para esta diferencia
La fecha debe ser posterior a la recepción
Falta una fotografía legible
```

No se muestran errores de campos ocultos o que el actor no puede modificar.

#### 31. `WARNING` e `INFO`

`WARNING` e `INFO` no se convierten en bloqueos para aumentar severidad visual.

La prueba verifica que:

- una advertencia permita continuar cuando realmente está permitido;
- una información no compita con la acción principal;
- el copy no implique que el proceso falló cuando no falló;
- la interfaz no obligue a confirmar repetidamente estados informativos.

#### 32. Resultado desconocido

Regla crítica:

```text
NO RECIBIR RESPUESTA
!=
OPERACIÓN NO EJECUTADA
```

Ante resultado desconocido, la explicación debe impedir que la persona interprete el estado como fracaso definitivo o repita una mutación como nueva intención.

Debe orientar a consultar:

- receipt;
- estado de dominio;
- idempotency key o scope;
- conciliación;
- resultado posterior.

#### 33. Reintento

`Reintentar` solo es una acción válida cuando:

- la causa es transitoria;
- repetir es seguro;
- la operación es idempotente o no comenzó;
- se conoce qué quedó guardado;
- la política propietaria permite repetir;
- existe límite o estrategia de reintento cuando corresponde.

Un botón de reintento no convierte un resultado desconocido en operación fallida.

#### 34. Conectividad y offline

La persona debe distinguir, cuando aplique:

```text
TRABAJANDO SIN CONEXIÓN
GUARDADO EN ESTE DISPOSITIVO
EN COLA
PENDIENTE DE CONFIRMACIÓN
SINCRONIZANDO
RESULTADO DESCONOCIDO
CONFLICTO DE SINCRONIZACIÓN
ACCIÓN REQUIERE CONEXIÓN
```

No se presenta `Completado` cuando el propietario todavía no confirmó el resultado.

#### 35. Dispositivo compartido

En estación, kiosco o tablet compartida, la prueba distingue:

- dispositivo no autorizado;
- actor no identificado;
- actor sin turno;
- rol incompatible;
- aplicación no admitida;
- sesión del actor vencida;
- contexto stale.

Un bloqueo del dispositivo no se presenta como fallo personal del trabajador.

El cambio de actor no conserva mensajes ni referencias privadas del actor anterior.

#### 36. Handoff y cross-app

Cuando el bloqueo ocurre durante un flujo entre aplicaciones, el mensaje debe conservar la identidad empresarial del caso.

La persona debe poder identificar:

- qué proceso sigue activo;
- qué aplicación o actor posee la siguiente acción;
- qué quedó confirmado;
- qué está pendiente;
- qué puede hacer ahora.

El texto no puede afirmar aceptación o finalización solo porque ocurrió navegación.

#### 37. Operaciones masivas

Una operación masiva muestra resultados parciales cuando existan.

Ejemplo:

```text
18 completados
2 bloqueados por cambio de estado
1 fuera del alcance actual
1 pendiente de conciliación
```

No se certifica un mensaje `Operación completada` cuando una parte relevante no terminó.

#### 38. Frescura y estado stale

Un mensaje puede quedar obsoleto cuando cambia:

- actor;
- contexto;
- recurso;
- versión;
- claim;
- autorización;
- dependencia;
- estado del proceso.

La certificación comprueba que una explicación stale no siga instruyendo una acción inválida.

#### 39. Autorización y razón pública

Cuando una denegación visible deriva de autorización, la explicación consume la razón pública aprobada o proyección segura correspondiente.

Queda prohibido reconstruir la causa visible desde:

- un booleano `false`;
- el nombre del rol;
- `blocked_reasons` legacy;
- coincidencia textual entre namespaces;
- un error técnico;
- una heurística local.

#### 40. Namespaces técnicos separados

Permanecen separados los namespaces y formas técnicas que posean significado contractual distinto.

La prueba falla si una superficie mezcla o renombra por similitud:

- reason codes públicos;
- structural issues;
- lane reasons;
- errores técnicos;
- códigos locales de consumidor.

La persona no debe aprender esa taxonomía para poder completar su tarea.

#### 41. Código desconocido o incompatible

Si una causa técnica no puede traducirse de forma segura:

```text
VALOR DESCONOCIDO
→ FALLAR CERRADO EN PRESENTACIÓN
→ NO INVENTAR UNA EXPLICACIÓN ESPECÍFICA
→ CONSERVAR REFERENCIA PARA DIAGNÓSTICO
```

La interfaz puede comunicar indisponibilidad o necesidad de soporte sin afirmar una causa no demostrada.

#### 42. Frontera de seguridad con `UX-QA-016`

`UX-QA-015` exige que la explicación sea segura para el actor actual.

Eso implica, para esta tarea:

- no depender de datos sensibles para entender la acción;
- no revelar permiso de terceros;
- no mostrar secretos o credenciales;
- no exponer reglas antifraude;
- no exponer diagnóstico técnico innecesario.

La prueba exhaustiva de ocultamiento y masking queda en `UX-QA-016`.

#### 43. Accesibilidad

La explicación debe poder percibirse y operarse sin depender exclusivamente de:

- color;
- icono;
- hover;
- vibración;
- sonido;
- ubicación visual.

Cuando aplique:

- se asocia al control o región afectada;
- existe orden de lectura coherente;
- el foco no se pierde;
- múltiples errores tienen resumen navegable;
- la referencia de soporte puede leerse o copiarse;
- actualizaciones automáticas no producen anuncios repetitivos inútiles.

#### 44. Lenguaje no punitivo

Quedan fuera de certificación positiva mensajes como:

```text
Cometiste un error
No sabes hacer esta tarea
Usuario inválido
Operación ilegal
Fallaste la validación
```

cuando la causa pertenece a configuración, dependencia, dato incompleto, concurrencia, autorización o sistema.

El texto debe ser directo, neutral y específico.

#### 45. Terminología validada

La explicación usa vocabulario empresarial comprensible para la audiencia aplicable.

Los términos internos pueden existir en auditoría, soporte o documentación técnica, pero no deben ser requisito de comprensión ordinaria.

Cuando exista terminología ya validada por `UX-BASE-015`, la certificación no la sustituye por sinónimos técnicos locales.

#### 46. Acción disponible realmente ejecutable

La prueba no se limita a leer el copy.

Si el mensaje ofrece una acción, se comprueba que la acción:

- exista;
- sea visible o alcanzable;
- corresponda al actor;
- no requiera una autoridad que el actor no tiene;
- no produzca un efecto diferente al descrito;
- no conduzca a otro bloqueo sin contexto.

Un mensaje correcto con CTA inexistente falla la certificación.

#### 47. Responsable realmente resoluble

Si la explicación indica que otra persona, área o proceso resuelve el caso, la evidencia debe demostrar que ese responsable tiene un canal o flujo real de resolución cuando el package lo incluya.

No se certifica una instrucción que envía al actor a un responsable genérico inexistente.

#### 48. Recuperación coherente

La recuperación visible debe coincidir con el estado real.

Queda prohibido ofrecer:

- reintento cuando el resultado es desconocido;
- edición cuando el recurso ya cerró;
- continuar cuando falta autorización;
- cancelar cuando la operación no admite cancelación;
- recargar como sustituto de conciliación;
- volver a enviar como sustituto de consultar receipt.

#### 49. Relación con idempotencia

La comprensibilidad de un bloqueo no puede crear duplicados.

La prueba comprueba, cuando aplique, que:

- el usuario no interprete silencio como necesidad de pulsar otra vez;
- el copy distinga pendiente de fallido;
- el CTA de reintento conserve la intención correcta;
- un doble toque no produzca un segundo efecto;
- el mensaje de resultado desconocido conduzca a consulta o conciliación.

#### 50. Relación con tiempo objetivo

Los hallazgos de `UX-QA-014` pueden revelar que un bloqueo aumenta:

- tiempo end-to-end;
- ayuda requerida;
- abandono;
- reintentos;
- correcciones.

`UX-QA-015` usa esa evidencia para comprobar claridad, pero no convierte la velocidad de lectura del mensaje en KPI disciplinario.

#### 51. Medición de comprensión

La prueba observa, según el escenario:

- interpretación correcta de la causa;
- identificación correcta del efecto;
- reconocimiento del estado preservado;
- selección de siguiente acción;
- capacidad de identificar responsable;
- necesidad de ayuda externa;
- reintentos incorrectos;
- escalamiento incorrecto;
- abandono;
- recuperación correcta.

El tiempo puede registrarse como contexto, pero la aprobación depende de comprensión y acción segura, no de velocidad individual aislada.

#### 52. Participantes

Cuando la certificación requiera prueba humana, el package selecciona participantes representativos de:

- actor que ejecuta;
- actor que supervisa cuando aplique;
- personal nuevo y experimentado cuando la diferencia sea material;
- dispositivo personal o compartido cuando aplique;
- sedes o áreas materialmente distintas;
- necesidades de accesibilidad representativas cuando correspondan.

No se certifica comprensibilidad únicamente con personal de desarrollo o con quien redactó el mensaje.

#### 53. Prueba sin enseñar la respuesta

Durante la sesión, quien prueba no debe traducir previamente el código técnico ni explicar qué significa el bloqueo antes de medir.

Se permite preguntar:

```text
¿Qué te impide continuar?
¿Qué crees que pasó?
¿Qué quedó guardado?
¿Qué harías ahora?
¿Quién tendría que resolverlo?
¿Cómo sabrías cuándo volver a intentarlo?
```

No se considera evidencia válida una respuesta obtenida después de enseñar la solución.

#### 54. Riesgo crítico

Para bloqueos relacionados con:

- seguridad;
- dinero;
- inventario;
- custodia;
- acceso;
- privacidad;
- inocuidad;
- acciones irreversibles;
- resultados desconocidos con riesgo de duplicación;

una interpretación peligrosa bloquea PASS aunque otras observaciones sean correctas.

Un promedio no compensa un malentendido crítico.

#### 55. Mensaje consistente entre superficies

Una misma causa estructurada no debe producir instrucciones materialmente contradictorias entre:

- SHELL;
- aplicación propietaria;
- tablet;
- kiosco;
- móvil;
- notificación;
- vista administrativa;
- recuperación posterior.

La presentación puede variar por canal, pero el significado y la siguiente acción segura permanecen coherentes.

#### 56. Estado actual frente a notificación histórica

Una notificación o deep link puede contener un resumen histórico.

Al abrirlo, la aplicación vuelve a resolver el estado vigente.

No se certifica un flujo que conserve como verdad actual un mensaje antiguo cuando el proceso ya cambió.

#### 57. Copy localizado y versionado

Cuando exista localización:

- el significado contractual no cambia por idioma;
- el código estable no se traduce;
- el copy sí puede localizarse;
- la acción y el responsable conservan equivalencia;
- la versión de mensaje puede correlacionarse con la evidencia.

Una traducción no puede convertir `WAITING` en fallo ni `DENIED` en bloqueo recuperable.

#### 58. Referencia técnica secundaria

Para soporte autorizado puede existir detalle adicional.

Ese detalle:

- se presenta bajo demanda;
- no desplaza el mensaje humano principal;
- respeta autorización;
- evita secretos;
- conserva correlación;
- no convierte la vista ordinaria en consola de depuración.

#### 59. Antipatrones prohibidos

Se consideran fallos de certificación, cuando aplican:

```text
BOOLEANO FALSE → "SIN ACCESO"
REASON CODE → COPY PRINCIPAL
ERROR HTTP → ESTADO EMPRESARIAL
TIMEOUT → "NO SE EJECUTÓ"
SPINNER DESAPARECE → "COMPLETADO"
CONTACTA ADMINISTRADOR → RECUPERACIÓN UNIVERSAL
BOTÓN DESHABILITADO SIN EXPLICACIÓN
RLS DENIED → MENSAJE AL TRABAJADOR
STACK TRACE → AYUDA
REFRESH → CONCILIACIÓN
```

#### 60. Clases mínimas de escenario

Cada package seleccionará las clases aplicables y justificará las no aplicables:

| Clase | Escenario |
| --- | --- |
| `B1_CONTEXT` | falta de actor, turno, check-in, sede, área o contexto requerido |
| `B2_AUTHORIZATION` | denegación canónica segura |
| `B3_VALIDATION` | dato o evidencia corregible por el actor |
| `B4_WAITING` | dependencia normal de tiempo, evento o tercero |
| `B5_CONFLICT` | cambio concurrente, versión, claim o recurso |
| `B6_TECHNICAL_PRE_SEND` | fallo técnico antes de iniciar efecto |
| `B7_RESULT_UNKNOWN` | timeout o pérdida de respuesta después de enviar |
| `B8_OFFLINE_SYNC` | estado local, cola, sincronización o conflicto |
| `B9_SHARED_DEVICE` | actor/dispositivo/contexto en estación compartida |
| `B10_CROSS_APP` | bloqueo durante handoff o retorno entre aplicaciones |
| `B11_PARTIAL_BATCH` | operación masiva con resultados parciales |
| `B12_STALE_MESSAGE` | mensaje o instrucción que quedó obsoleta |
| `B13_ACCESSIBILITY` | bloqueo percibido mediante tecnología asistiva o modalidad alternativa |
| `B14_SUPPORT_ESCALATION` | caso que requiere referencia y escalamiento |

No todos los packages deben ejecutar catorce clases. Sí deben declarar su matriz de aplicabilidad.

#### 61. Caso positivo mínimo

Un caso positivo demuestra, según corresponda:

```text
CAUSA VIGENTE
→ MENSAJE HUMANO CORRECTO
→ ESTADO PRESERVADO CORRECTO
→ ACCIÓN SEGURA
→ RESPONSABLE O CONDICIÓN CORRECTOS
→ RECUPERACIÓN COHERENTE
```

La persona puede completar la decisión sin conocer identificadores técnicos.

#### 62. Casos negativos obligatorios

Cuando apliquen, se deben incluir casos donde:

- el reason code es visible sin traducción;
- el mensaje es demasiado genérico;
- el CTA no resuelve la causa;
- se ofrece reintento inseguro;
- el estado preservado es falso;
- la causa visible no coincide con la causa estructurada;
- el mensaje stale permanece después de cambiar el estado;
- el actor cambia;
- el dispositivo cambia;
- el recurso cambia;
- el resultado es desconocido;
- el responsable visible no puede resolver;
- el mensaje revela información que debería permanecer restringida.

#### 63. Oracle por escenario

Un escenario obtiene PASS únicamente cuando la evidencia demuestra simultáneamente:

- clasificación correcta;
- causa visible compatible con la causa autoritativa;
- efecto correctamente explicado;
- estado preservado correcto;
- siguiente acción segura;
- responsable o condición correctos cuando apliquen;
- ausencia de dependencia de códigos técnicos;
- accesibilidad aplicable;
- ausencia de bypass;
- ausencia de reintento inseguro;
- ausencia de contradicción con el estado actual.

#### 64. PASS por package

`UX-QA-015::<package_id>` obtiene PASS cuando:

1. existe matriz de aplicabilidad;
2. todos los escenarios obligatorios aplicables fueron ejecutados;
3. no existe malentendido crítico abierto;
4. los mensajes se derivan de causas estructuradas vigentes;
5. no existe CTA inseguro o imposible;
6. los estados preservados coinciden con la realidad;
7. los reintentos cumplen la política propietaria;
8. los canales relevantes mantienen significado coherente;
9. accesibilidad aplicable no introduce una explicación inferior;
10. los hallazgos restantes tienen propietario y condición de salida compatibles con el gate del package.

#### 65. No PASS por apariencia aislada

No constituyen PASS por sí solos:

- screenshot de un mensaje;
- storybook aislado;
- snapshot HTML;
- existencia de `ContextDiagnostic`;
- existencia de `RecoverableErrorState`;
- catálogo de reason codes;
- documento de copy;
- prueba de render sin causa real;
- validador unitario sin consumidor;
- una demostración con datos ideales.

#### 66. `GLOBAL-FINAL`

`UX-QA-015::GLOBAL-FINAL` exige:

- universe final de packages aplicables identificado;
- cada package obligatorio con estado verificable;
- cero malentendidos críticos abiertos;
- cero bloqueos ordinarios cuyo único copy sea código técnico;
- coherencia cross-app materialmente suficiente;
- reglas de resultado desconocido y reintento conservadas;
- accesibilidad y escalamiento sin huecos críticos;
- hallazgos no bloqueantes con owner y cierre trazable.

No se promedian fallos críticos para declarar PASS global.

#### 67. Hallazgos y ownership

Todo hallazgo registra como mínimo:

```text
finding_id
package_id
scenario_id
process_id
actor_profile
blocking_class
observed_message_version
structured_cause_ref
observed_behavior
expected_behavior
severity
owner_task_or_package
closure_condition
evidence_refs
status
```

No se deja un hallazgo narrativo sin dueño.

#### 68. Severidad orientada a riesgo

Una clasificación de severidad debe considerar:

- riesgo de acción incorrecta;
- posibilidad de duplicar efectos;
- pérdida de trabajo;
- exposición de información;
- bloqueo completo de tarea;
- escalamiento equivocado;
- frecuencia;
- disponibilidad de recuperación segura;
- población afectada.

El número de usuarios observados no reduce por sí solo una interpretación peligrosa.

#### 69. Evidencia esperada por package

La futura ejecución conserva evidencia suficiente para reconstruir:

- versión del package;
- ambiente;
- escenario;
- actor/cohorte;
- causa estructurada;
- mensaje presentado;
- acción disponible;
- estado preservado;
- resultado de comprensión;
- resultado de recuperación;
- referencia de soporte cuando aplique;
- defectos y cierre.

La evidencia no requiere almacenar texto libre sensible de la persona cuando no sea necesario.

#### 70. Observabilidad permitida

Puede medirse de forma agregada y no disciplinaria:

- bloqueos por causa y proceso;
- tiempo hasta resolución;
- reintentos evitables;
- abandono después de bloqueo;
- mensajes sin acción útil;
- escalamiento incorrecto;
- conflictos;
- estados desconocidos;
- causas de configuración o sistema.

No se usa la telemetría para calificar a la persona por haber encontrado un bloqueo.

#### 71. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Requisitos creados: 0

Requisitos modificados: 0

La tarea certifica cobertura existente y no altera el Registro Canónico de Requisitos de Prueba.

#### 72. Cobertura de prueba vigente reutilizada

Sin modificar el registro, `UX-QA-015` reutiliza principalmente:

- `TREQ-UX-097` a `TREQ-UX-117` — taxonomía, traducción humana, estado preservado, recuperación, denegaciones, contexto, esperas, conflictos, conectividad, fallos técnicos, seguridad, dispositivos compartidos, operaciones masivas, accesibilidad, lenguaje, auditoría y validación con trabajadores;
- `TREQ-UX-002` — error, bloqueo o fallo parcial explicado en lenguaje humano con causa, estado preservado y recuperación;
- cobertura de accesibilidad y errores ya vinculada a las tareas NFR y UX vigentes;
- cobertura de autorización y reason codes ya vinculada a `AUTH-ERR-001` a `AUTH-ERR-020` y contratos compartidos correspondientes.

Estas referencias son trazabilidad heredada. No representan cambios 04A de esta entrega.

#### 73. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | Esta tarea documental no ejecuta build físico de aplicaciones ni packages. |
| LOCAL | NOT_EXECUTED | La incorporación en la rama `task/ux-qa-015` y los validadores reales del checkout permanecen pendientes; no se declaran ejecutados anticipadamente. |
| REMOTA | PASS | Se verificaron `origin/main`, `active-sequence.json`, topología `PER_PACKAGE_AND_GLOBAL_FINAL`, gate `POST_E5_PACKAGE`, owner canónico, marcador `UX-QA-015`, sucesora `UX-QA-016`, `UX-BASE-006`, `SHELL-APP-010`, `ContextDiagnostic`, su validador y `package.json` vigente. |
| OPERATIVA | PASS | El contrato fue contrastado documentalmente con la taxonomía de bloqueos, separación reason code/copy, estado preservado, recuperación, seguridad, accesibilidad, handoff de `UX-QA-014` y límites con `UX-QA-016`. |
| FÍSICA | NOT_APPLICABLE | La tarea no ejecuta pruebas reales con packages o trabajadores; esas instancias pertenecen a `UX-QA-015::<package_id>` y `UX-QA-015::GLOBAL-FINAL` después de `POST_E5_PACKAGE`. |

#### 74. Criterios de aceptación

- [ ] Se define certificación por package y `GLOBAL-FINAL`.
- [ ] Se consume el handoff completo de `UX-QA-014` sin reabrir su objetivo temporal.
- [ ] Se conserva la taxonomía de `UX-BASE-006` sin colapsarla en error genérico.
- [ ] Causa estructurada y mensaje humano permanecen separados.
- [ ] El mensaje humano no se convierte en fuente de lógica ni autorización.
- [ ] La persona puede identificar qué ocurrió y qué no ocurrió.
- [ ] La persona puede identificar qué trabajo quedó preservado.
- [ ] La persona puede identificar qué impide continuar.
- [ ] La persona puede identificar una siguiente acción segura cuando exista.
- [ ] La persona puede identificar responsable o condición de revisión cuando aplique.
- [ ] Existe referencia segura para soporte cuando sea necesaria.
- [ ] Reason codes, permission keys, SQLSTATE y excepciones técnicas no son copy principal ordinario.
- [ ] `BLOCKED` y `DENIED` permanecen diferenciados.
- [ ] `WAITING` no se presenta como fallo.
- [ ] `CONFLICT` no sobrescribe cambios silenciosamente.
- [ ] `TECHNICAL_FAILURE` distingue resultado desconocido de fallo antes de enviar.
- [ ] `VALIDATION_REQUIRED` señala condiciones que el actor realmente puede corregir.
- [ ] `WARNING` e `INFO` no se convierten artificialmente en bloqueos.
- [ ] Un timeout no se presenta como operación no ejecutada sin evidencia.
- [ ] `Reintentar` solo aparece cuando repetir es seguro.
- [ ] Offline y sincronización distinguen local, pendiente, enviado, confirmado y conflicto.
- [ ] Dispositivos compartidos separan actor, contexto y dispositivo.
- [ ] Handoffs conservan proceso y no confunden navegación con resultado.
- [ ] Operaciones masivas muestran parciales de forma explícita.
- [ ] Un mensaje stale no continúa instruyendo acciones inválidas.
- [ ] Denegaciones usan razones públicas aprobadas y no `blocked_reasons` legacy como copy.
- [ ] Un código desconocido no produce una causa inventada.
- [ ] La explicación visible no depende de datos sensibles para ser comprensible.
- [ ] La accesibilidad no depende solo de color, icono, hover, sonido o posición.
- [ ] El lenguaje es neutral, específico y no punitivo.
- [ ] Los términos validados no se sustituyen por jerga técnica local.
- [ ] Todo CTA ofrecido existe y es ejecutable por el actor actual.
- [ ] Todo responsable visible corresponde a una vía real de resolución cuando el package la incluye.
- [ ] La recuperación no contradice el estado real del proceso.
- [ ] La comprensibilidad no crea reintentos o duplicados.
- [ ] Las pruebas humanas no enseñan la respuesta antes de medir.
- [ ] Un malentendido crítico bloquea PASS aunque el promedio sea favorable.
- [ ] Canales diferentes no presentan instrucciones materialmente contradictorias para la misma causa.
- [ ] La notificación histórica se revalida al abrir la superficie vigente.
- [ ] El copy localizado conserva significado contractual.
- [ ] El detalle técnico secundario permanece bajo demanda y protegido.
- [ ] Cada package declara matriz de escenarios aplicables.
- [ ] Los casos negativos incluyen código técnico, copy genérico, retry inseguro y estado preservado falso cuando apliquen.
- [ ] PASS por package exige todos los escenarios obligatorios resueltos.
- [ ] `GLOBAL-FINAL` no oculta fallos críticos mediante promedio.
- [ ] Todos los hallazgos conservan owner y condición de salida.
- [ ] No se crea ni modifica ningún requisito de prueba.
- [ ] No se ejecutan cambios físicos durante esta tarea documental.
- [ ] `UX-QA-016` conserva íntegramente la responsabilidad de certificar ocultamiento de información sensible.

#### 75. Límites

Esta tarea:

- no redacta todo el copy definitivo de cada pantalla;
- no crea un catálogo nuevo de reason codes;
- no modifica `AUTH-ERR-001` a `AUTH-ERR-020`;
- no modifica `UX-BASE-006`;
- no implementa `ContextDiagnostic`;
- no migra consumidores;
- no crea autorización;
- no cambia permisos;
- no ejecuta retries;
- no ejecuta conciliación;
- no cambia estado de dominio;
- no modifica work items;
- no modifica rutas;
- no modifica notificaciones;
- no modifica telemetría productiva;
- no modifica datos;
- no modifica Supabase;
- no ejecuta pruebas físicas;
- no certifica packages antes de `POST_E5_PACKAGE`;
- no certifica exhaustivamente masking, minimización ni privacidad global, responsabilidad de `UX-QA-016`.

#### 76. Handoff a `UX-QA-016`

`UX-QA-015` entrega a `UX-QA-016`:

- package y escenario certificado;
- actor/cohorte y contexto;
- clase de bloqueo o condición;
- causa estructurada de referencia;
- versión de mensaje observada;
- campos visibles necesarios para comprensión;
- campos o datos omitidos deliberadamente por seguridad;
- referencia segura de soporte cuando exista;
- evidencia de que la persona comprendió causa, efecto y siguiente acción;
- hallazgos donde la explicación fue correcta pero pudo exponer información innecesaria;
- canales y superficies donde se presentó el bloqueo;
- estado de accesibilidad y recuperación asociado.

`UX-QA-016` podrá certificar ocultamiento de información sensible sin volver a decidir la comprensibilidad semántica ya certificada por `UX-QA-015`.

#### 77. Continuidad

**ÚLTIMA TAREA APROBADA**
`UX-QA-014 — El trabajador completa la tarea dentro del tiempo objetivo`

**TAREA ACTUAL APROBADA**
`UX-QA-015 — Los bloqueos se entienden sin códigos técnicos`

**SIGUIENTE TAREA RESERVADA**
`UX-QA-016 — La información sensible se oculta correctamente`
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
