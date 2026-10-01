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
### [ ] UX-QA-002 — La acción principal se encuentra sin capacitación
### [ ] UX-QA-003 — El trabajador comprende el estado del proceso
### [ ] UX-QA-004 — Los errores indican cómo continuar
### [ ] UX-QA-005 — Un rol no ve opciones irrelevantes
### [ ] UX-QA-006 — Las pantallas táctiles funcionan en tablet
### [ ] UX-QA-007 — Las vistas administrativas no contaminan la operación
### [ ] UX-QA-008 — El proceso continúa correctamente entre aplicaciones
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
