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
