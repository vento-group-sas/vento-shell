### MINI-BLOQUE — EXPERIENCIA CREATIVA Y COMERCIAL

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia creativa y comercial** dentro de **W AURA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AURA-UX-001` a `AURA-UX-008` — 8 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Diseñar inicio diario simple con prioridades, calendario, pendientes y oportunidades” y concluye con “Diseñar tablero de resultados, atribución y copiloto de recomendaciones”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AURA-UX -->
### Reconciliación topológica de AURA-UX-001 a AURA-UX-008

La familia diseña la experiencia creativa y comercial objetivo. No constituye implementación física y conserva el bloqueo de continuidad de AURA.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ AURA-UX-001 — Diseñar inicio diario simple con prioridades, calendario, pendientes y oportunidades

**Estado:** APROBADA
**Tarea anterior:** AURA-AUTH-004 — Proteger credenciales, tokens, proveedores de IA, prompts, archivos y datos enviados a terceros
**Tarea siguiente:** AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual
**Tipo de tarea:** documental; diseño canónico de la experiencia de inicio diario de AURA, su jerarquía de información, estados, navegación, divulgación progresiva y fronteras con las superficies especializadas posteriores, sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, tablas, migraciones, RLS, funciones, RPC, Storage, jobs, integraciones, datos, secretos, proveedores ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la superficie inicial diaria de AURA para que una persona autorizada pueda entender, sin entrenamiento técnico y sin recorrer módulos antes de orientarse, qué requiere atención hoy, qué está próximo, qué necesita aprobación, qué canal presenta una alerta, qué oportunidad comercial merece seguimiento y qué resultado exige una decisión.

La tarea convierte el contrato aprobado de `CAP-SCOPE-014` en una experiencia canónica de entrada y consume, sin redefinirlos, los dominios y autorizaciones de AURA ya aprobados.

La regla raíz es:

```text
INICIO DIARIO
=
CONTEXTO AUTORIZADO
+ PRIORIDADES EXPLICABLES
+ CALENDARIO INMEDIATO
+ APROBACIONES PENDIENTES
+ ALERTAS DE CANAL
+ OPORTUNIDADES RELEVANTES
+ RESULTADOS QUE EXIGEN ACCION
+ NAVEGACION AL FLUJO PROPIETARIO
```

pero:

```text
INICIO DIARIO
!=
DASHBOARD ANALITICO COMPLETO
!=
BANDEJA UNIVERSAL DE TODAS LAS TAREAS
!=
CONSOLA TECNICA
!=
SUPERFICIE DE APROBACION FINAL
!=
MOTOR DE EJECUCION
```

El objetivo es reducir carga cognitiva y tiempo de orientación sin ocultar estado, autorización, vigencia, fuente o incertidumbre material.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `CAP-SCOPE-014`, especialmente la regla de que la pantalla principal de AURA responda qué debe hacerse hoy, qué está pendiente de aprobación, qué se publica próximamente, qué oportunidad merece atención y qué campaña necesita corrección;
- `H-CAP-SCOPE-014-030`, que identifica como riesgo una AURA saturada de explicaciones, tablas y configuración técnica;
- `AURA-DOM-001`, para marca, identidad, mensajes, claims, restricciones, versiones y vigencia;
- `AURA-DOM-002`, para objetivos, audiencias, briefs, calendario, presupuesto, dependencias, responsables y ciclo de campaña;
- `AURA-DOM-005`, para cuentas, endpoints, programación, estados de publicación, retiros, fallos y reconciliación por canal;
- `AURA-DOM-007`, para oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación;
- `AURA-DOM-008`, para métricas, atribución, confianza, incrementalidad, aprendizaje y cierre de campaña;
- `AURA-DOM-009`, para reputación, comentarios públicos, respuesta y escalamiento;
- `AURA-DOM-010`, para señales, diagnósticos, oportunidades, recomendaciones, explicaciones, confianza, guardas, caducidad y transferencia a dominios propietarios;
- `AURA-AUTH-001` a `AURA-AUTH-004`, para empresa, marca, función, capacidad, recurso, segregación, datos de clientes, acciones masivas, credenciales, proveedores y datos enviados a terceros;
- `VPROC-0056`, para gestionar contenido y promociones desde solicitud y aprobación hasta publicación y retiro;
- `VPROC-0057`, para convertir consultas y oportunidades de canales digitales en casos comerciales trazables;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

La superficie de inicio no crea fuentes maestras, estados de dominio, permisos ni procesos alternos.

---

#### 3. Resultado canónico

AURA deberá disponer de una experiencia de inicio diario que permita responder de inmediato:

```text
¿QUÉ DEBEMOS HACER HOY?
¿QUÉ ESTÁ PENDIENTE DE APROBACIÓN?
¿QUÉ SE PUBLICA PRÓXIMAMENTE?
¿QUÉ OPORTUNIDAD MERECE ATENCIÓN?
¿QUÉ CAMPAÑA NECESITA CORRECCIÓN?
```

La vista diaria tendrá como máximo estas seis familias visibles de trabajo:

1. prioridades;
2. calendario inmediato;
3. aprobaciones;
4. alertas de canal;
5. oportunidades comerciales;
6. resultados que requieren acción.

Configuraciones, fórmulas, prompts, metadatos técnicos, payloads, secretos, trazas completas y explicaciones extensas permanecerán bajo demanda o en sus superficies propietarias.

---

#### 4. Principios de experiencia

La superficie se rige por los siguientes principios:

1. **orientación antes que exploración:** la primera vista indica qué exige atención antes de pedir navegación adicional;
2. **acción antes que explicación extensa:** cada elemento presenta la siguiente acción autorizable y una razón breve de por qué importa ahora;
3. **estado antes que decoración:** vencimiento, bloqueo, incertidumbre, aprobación pendiente o fallo deben ser visibles sin depender del color;
4. **contexto antes que volumen:** empresa, marca, campaña, canal o responsable relevantes permanecen identificables;
5. **fuente antes que inferencia:** un dato desconocido, vencido o degradado no se sustituye por cero ni por una conclusión optimista;
6. **divulgación progresiva:** evidencia, fuentes, diagnóstico y configuración se abren bajo demanda;
7. **una acción crítica conserva su flujo propietario:** el inicio diario deriva al flujo correspondiente en vez de duplicar aprobaciones, publicaciones, respuestas o mutaciones;
8. **autorización antes que visibilidad:** la interfaz no revela títulos, conteos, nombres, clientes, campañas o recursos fuera del alcance autorizado;
9. **simplicidad no significa pérdida de trazabilidad:** la vista resume, pero el objeto fuente conserva identidad, estado, actor, versión y evidencia;
10. **la IA no decide la interfaz por opacidad:** cualquier priorización asistida debe ser explicable y no adquirir autoridad sobre acciones.

---

#### 5. Contexto de entrada

El inicio diario siempre se interpreta dentro de un contexto autorizado.

La barra compacta de contexto deberá permitir reconocer, cuando aplique:

- empresa u organización dentro del alcance del actor;
- marca activa;
- periodo o referencia temporal actual;
- función o ámbito de trabajo cuando sea material;
- filtros activos que cambien el conjunto visible.

Cambiar contexto no modifica permisos ni crea autoridad nueva.

Si una persona tiene acceso a varias marcas o ámbitos, la interfaz podrá permitir cambiar entre ellos, pero no deberá mezclar información de ámbitos distintos en una vista consolidada cuando la autorización o la interpretación empresarial exijan separación.

Un contexto global solo podrá mostrar objetos que sean simultáneamente visibles para el actor y compatibles con la agregación aprobada.

---

#### 6. Arquitectura de la pantalla inicial

La pantalla diaria se organiza en tres niveles visuales:

1. **contexto compacto**, con el ámbito autorizado vigente y filtros esenciales;
2. **acción inmediata**, encabezada por prioridades y calendario próximo;
3. **situaciones que requieren atención**, agrupadas en aprobaciones, alertas, oportunidades y resultados.

En escritorio podrá distribuirse en más de una columna cuando preserve jerarquía y lectura.

En superficies estrechas deberá colapsar a una secuencia única manteniendo el mismo orden de prioridad y sin perder acciones, estados o etiquetas.

No se utilizará una cuadrícula de tarjetas de igual peso para todos los elementos si ello impide distinguir urgencia y siguiente acción.

---

#### 7. Zona de prioridades

La primera zona responde `¿QUÉ DEBEMOS HACER HOY?`.

Una prioridad deberá representar un objeto real y autorizable que requiere atención, no una frase generada sin referencia.

Podrá originarse, entre otros, en:

- un brief o campaña con hito vencido o próximo;
- una aprobación que bloquea trabajo posterior;
- una publicación o retiro dentro de una ventana próxima;
- una alerta de canal que impide una acción prevista;
- una oportunidad comercial con siguiente acción o vencimiento próximo;
- una campaña que activa una guarda o necesita corrección;
- un resultado o recomendación cuya revisión humana no debe diferirse;
- una dependencia material que bloquea trabajo planificado.

Cada prioridad mostrará como mínimo:

- qué requiere atención;
- por qué requiere atención ahora;
- objeto o proceso relacionado;
- marca o contexto cuando sea material;
- estado actual;
- siguiente acción disponible;
- vencimiento o ventana cuando exista;
- responsable o propietario cuando corresponda.

---

#### 8. Orden de prioridad

El orden no podrá depender de un score opaco.

La priorización podrá considerar las dimensiones ya aprobadas por `AURA-DOM-010`:

```text
IMPACTO
+ URGENCIA
+ CONFIANZA
+ FACTIBILIDAD
+ COSTO DE OPORTUNIDAD
+ RIESGO
+ GUARDAS
+ REVERSIBILIDAD
```

La interfaz no fija una fórmula numérica única.

Cuando dos elementos compitan, deberá ser posible entender al menos la razón dominante del orden, por ejemplo:

- vence primero;
- bloquea una publicación o aprobación;
- tiene una guarda crítica activada;
- existe una oportunidad con ventana comercial limitada;
- la evidencia es más sólida;
- el riesgo de no actuar es mayor.

Una recomendación de baja confianza no deberá aparecer como mandato solo por tener impacto estimado alto.

---

#### 9. Calendario inmediato

El calendario inicial es una proyección resumida del contrato de `AURA-DOM-002`.

Deberá mostrar únicamente hitos y compromisos relevantes para la ventana inmediata del actor, como:

- revisión de brief;
- aprobación prevista;
- creación o entrega de pieza;
- publicación programada;
- revisión de campaña;
- cierre o revisión de resultados;
- vencimiento de oferta, claim, activo o dependencia material cuando afecte trabajo próximo.

Reglas:

1. el calendario AURA no se presenta como confirmación de publicación externa;
2. una fecha sin estado verificable no se muestra como efecto confirmado;
3. los eventos vencidos permanecen visibles hasta que el flujo propietario resuelva su estado;
4. fechas de diferentes marcas conservan contexto explícito;
5. un cambio de zona horaria o ámbito no puede alterar silenciosamente el significado temporal del evento;
6. abrir un hito lleva al expediente o flujo propietario, no a una copia local del mismo.

---

#### 10. Aprobaciones pendientes

La zona de aprobaciones responde `¿QUÉ ESTÁ PENDIENTE DE APROBACIÓN?` sin absorber la experiencia detallada de `AURA-UX-004`.

Cada elemento deberá indicar:

- objeto que requiere decisión;
- versión relevante;
- marca o campaña;
- estado;
- quién debe decidir o qué autoridad falta, cuando el actor tenga derecho a conocerlo;
- fecha o impacto del bloqueo;
- acción de navegación al flujo de revisión correspondiente.

El inicio diario no incorpora un botón genérico de `Aprobar todo`, ni fusiona creación, revisión, aprobación, programación y publicación.

Una persona sin capacidad de aprobación podrá ver el estado cuando esté autorizada, pero no recibirá una acción ejecutable que no le corresponda.

---

#### 11. Alertas de canal

La zona de alertas resume problemas que afectan un canal, cuenta, endpoint o publicación sin convertir la pantalla inicial en consola técnica.

Podrá mostrar, cuando corresponda:

- credencial inválida o próxima a requerir atención, sin mostrar su valor;
- permiso o capacidad de proveedor insuficiente;
- publicación o retiro sin confirmación;
- reconciliación requerida;
- rate limit o indisponibilidad relevante;
- endpoint no apto;
- webhook o integración degradados cuando el contrato propietario ya haya clasificado el hecho;
- contenido publicado vencido o discrepancia visible que requiera revisión.

La alerta deberá expresar impacto empresarial y siguiente acción, no un stack trace como contenido principal.

Los detalles técnicos permanecen en `AURA-INT-001`, observabilidad o soporte según corresponda.

---

#### 12. Oportunidades comerciales

La zona de oportunidades responde `¿QUÉ OPORTUNIDAD MERECE ATENCIÓN?` y reutiliza los objetos de `AURA-DOM-007` y `AURA-DOM-010`.

Cada resumen podrá mostrar únicamente los campos necesarios para decidir si debe abrirse el detalle, como:

- identidad o referencia de oportunidad;
- origen;
- etapa;
- siguiente acción;
- vencimiento;
- responsable;
- valor estimado o importancia cuando esté autorizado y tenga fuente válida;
- confianza o advertencia cuando la priorización provenga de una recomendación;
- principal razón de atención.

La superficie inicial no convierte una oportunidad en pedido, cotización, reserva, cliente maestro ni compromiso.

La atención detallada pertenece a `AURA-UX-006`.

---

#### 13. Resultados que requieren acción

Esta zona evita que la pantalla se limite a actividad futura y permite detectar cuándo un resultado observado exige corrección, investigación o decisión.

Podrá incluir:

- campaña con rendimiento que activa una guarda;
- atribución insuficiente para sostener una conclusión material;
- señal de margen, capacidad, reputación o consentimiento que obliga a revisar una acción;
- contenido o publicación que necesita corrección;
- recomendación que solicita revisión humana;
- resultado no concluyente que necesita evidencia adicional;
- aprendizaje que invalida un supuesto vigente.

Cada elemento deberá diferenciar:

```text
HECHO OBSERVADO
!=
DIAGNOSTICO
!=
RECOMENDACION
!=
DECISION
!=
ACCION EJECUTADA
```

La experiencia detallada de resultados, atribución y recomendaciones permanece en `AURA-UX-008`.

---

#### 14. Acción principal y accesos rápidos

El inicio diario deberá ofrecer una acción principal clara cuando exista una tarea autorizada que el usuario pueda iniciar desde AURA.

Los accesos rápidos podrán dirigir a las experiencias propietarias de:

- crear o preparar trabajo creativo;
- campañas;
- oportunidades;
- reputación;
- resultados.

La existencia del acceso no concede permiso.

Si una acción no está autorizada o la superficie propietaria aún no está materializada, el inicio no deberá simular que puede ejecutarse.

La navegación no sustituye los controles de servidor ni la autorización por recurso.

---

#### 15. Contrato visual de cada elemento accionable

Todo elemento accionable de la pantalla deberá poder comunicar, sin abrir el detalle completo:

| Dimensión | Contenido esperado |
| --- | --- |
| identidad | nombre o referencia humana suficiente para reconocer el objeto |
| contexto | marca, campaña, canal u oportunidad cuando sea material |
| estado | condición actual comprensible y diferenciable |
| razón | por qué aparece hoy o por qué requiere atención |
| tiempo | vencimiento, ventana o antigüedad cuando corresponda |
| responsable | persona o función responsable cuando sea útil y autorizada |
| acción | siguiente paso disponible o enlace al flujo propietario |
| confianza/frescura | visible cuando afecte la interpretación del dato |

No se mostrarán campos vacíos como si fueran cero ni etiquetas técnicas sin traducción empresarial.

---

#### 16. Divulgación progresiva

La primera capa mostrará solo lo necesario para decidir qué abrir.

Una segunda capa podrá mostrar:

- explicación breve;
- principales fuentes;
- dependencias;
- guardas;
- confianza;
- versión;
- última actualización.

El detalle completo, cuando exista, permanecerá en la superficie propietaria.

Configuraciones, prompts, metadatos extensos, payloads, IDs técnicos, credenciales, logs, reglas de integración y fórmulas no ocuparán la experiencia cotidiana.

---

#### 17. Navegación a superficies propietarias

El inicio diario es un agregador de orientación y navegación.

Las acciones deberán transferir contexto sin duplicar estado:

```text
APROBACION
-> AURA-UX-004
```

```text
OPORTUNIDAD
-> AURA-UX-006
```

```text
REPUTACION O RESPUESTA PUBLICA
-> AURA-UX-007
```

```text
RESULTADO, ATRIBUCION O RECOMENDACION
-> AURA-UX-008
```

El flujo de marca, brief y calendario visual detallado se desarrollará desde `AURA-UX-002`.

La navegación deberá conservar el contexto de marca, campaña, objeto y filtro relevante siempre que ello no amplíe autorización.

---

#### 18. Estados de carga, vacío, error y parcialidad

La superficie deberá distinguir explícitamente:

- cargando;
- sin elementos aplicables;
- sin autorización para una familia de información;
- fuente no disponible;
- datos vencidos o con frescura insuficiente;
- resultado parcial;
- error técnico;
- contenido listo y vigente.

Reglas:

1. ausencia de datos no equivale a cero;
2. error técnico no equivale a ausencia de trabajo;
3. una zona vacía no deberá ocultar que otra fuente falló;
4. un fallo parcial no bloqueará innecesariamente zonas independientes que sí tengan datos confiables;
5. una zona sin acceso no deberá revelar conteos, títulos o nombres restringidos;
6. un dato cacheado o histórico deberá mostrar su antigüedad si puede inducir una decisión equivocada;
7. reintentar una lectura no ejecutará efectos empresariales.

---

#### 19. Frescura y vigencia

Todo elemento cuyo significado dependa del tiempo deberá preservar la vigencia de su fuente.

La interfaz deberá mostrar última actualización, vencimiento o advertencia de frescura cuando sea material para decidir.

Ejemplos:

- una oferta vencida no permanece como prioridad accionable de publicación;
- una oportunidad caducada no se presenta como vigente sin advertencia;
- una recomendación invalidada no se mantiene en la lista como recomendación activa;
- una alerta ya reconciliada no permanece como bloqueo actual;
- un calendario histórico no se mezcla con la ventana inmediata sin separación.

---

#### 20. Seguridad y privacidad en la experiencia

La simplicidad visual no reduce las reglas de `AURA-AUTH-*`.

La pantalla deberá:

- filtrar por alcance autorizado antes de renderizar contenido;
- evitar enumeración de campañas, clientes, oportunidades o recursos no autorizados;
- minimizar datos personales en resúmenes de oportunidades;
- no mostrar secretos, tokens, client secrets, códigos de recuperación ni valores equivalentes;
- no exponer prompts, archivos o datos enviados a terceros salvo dentro del alcance autorizado y necesario;
- no mostrar datos de otra marca o empresa por conveniencia de agregación;
- conservar las denegaciones y segregaciones aplicables a la acción final;
- evitar que una URL directa o deep link convierta un resumen visible en acceso al detalle no autorizado.

---

#### 21. Responsividad y densidad

La experiencia deberá conservar jerarquía en escritorio y superficies estrechas.

Reglas de diseño:

- la prioridad y la siguiente acción permanecen visibles sin depender de hover;
- las tarjetas o filas evitan párrafos extensos;
- el texto auxiliar visible es breve;
- las listas extensas se resumen y ofrecen navegación al detalle en lugar de crecer indefinidamente;
- tablas densas, matrices y configuración no forman parte de la vista cotidiana;
- el cambio de layout no cambia el orden semántico de lectura;
- las acciones críticas no quedan ocultas detrás de gestos no evidentes.

---

#### 22. Accesibilidad

La pantalla deberá respetar las reglas transversales de accesibilidad del plan canónico.

Como mínimo:

- navegación completa por teclado cuando la superficie sea web;
- foco visible y orden de foco coherente;
- semántica comprensible para tecnologías de asistencia;
- estados y prioridades no expresados solo mediante color;
- targets de interacción utilizables;
- texto ampliable sin pérdida de información o acción;
- errores y advertencias vinculados al elemento que los origina;
- etiquetas claras para iconos y acciones;
- alternativas a interacciones que dependan de arrastre, hover o precisión fina;
- orden semántico consistente cuando el layout cambie por tamaño de pantalla.

---

#### 23. Personalización limitada

La experiencia podrá recordar preferencias de presentación que no cambien autoridad ni oculten obligaciones críticas, como el último contexto autorizado seleccionado o un filtro de vista.

No se permitirá que la personalización:

- suprima silenciosamente una alerta crítica;
- cambie la fuente de verdad;
- mezcle ámbitos no autorizados;
- convierta una recomendación en acción automática;
- altere reglas de prioridad empresarial;
- persista un contexto que ya no está autorizado;
- sustituya los filtros obligatorios de seguridad.

La preferencia visual se distingue de una decisión empresarial.

---

#### 24. Comportamiento ante IA y recomendaciones

Cuando una prioridad u oportunidad provenga de asistencia de IA o del radar de recomendaciones, el inicio deberá mostrar una señal comprensible de que se trata de recomendación y no de hecho ejecutado.

La interfaz deberá permitir abrir bajo demanda:

- explicación;
- fuentes;
- confianza;
- principales guardas;
- datos faltantes;
- fecha de corte.

No deberá presentar `La IA recomienda` como explicación suficiente ni ocultar la incertidumbre relevante.

Aceptar abrir o revisar una recomendación no ejecuta su acción.

---

#### 25. Relación con `VPROC-0056`

El inicio diario no redefine el proceso canónico de contenido y promociones.

Podrá proyectar elementos de:

```text
CONTENT_REQUESTED
BRIEF_UNDER_REVIEW
IN_CREATION
UNDER_REVIEW
PENDING_APPROVAL
APPROVED
SCHEDULED
PUBLISHED
PERFORMANCE_REVIEW
CONTENT_CYCLE_REVIEWED
```

pero cada elemento conserva el estado real de su proceso.

Un resumen no puede saltar revisión, aprobación, programación, publicación, retiro o evaluación.

La pantalla únicamente facilita orientación y navegación.

---

#### 26. Relación con `VPROC-0057`

Las oportunidades provenientes de canales digitales podrán aparecer en el inicio cuando requieran atención del actor.

La proyección deberá preservar:

- identidad o referencia de la oportunidad;
- origen;
- etapa;
- responsable;
- siguiente acción;
- vencimiento o SLA cuando exista;
- contexto mínimo necesario.

Una interacción digital no se presenta como pedido, cliente maestro o venta confirmada.

El detalle y tratamiento permanecen en el flujo propietario y en `AURA-UX-006`.

---

#### 27. Handoff a `AURA-UX-002`

`AURA-UX-001` entrega a `AURA-UX-002` las siguientes decisiones ya fijadas:

- el inicio diario utiliza contexto autorizado de empresa y marca;
- la pantalla cotidiana no se satura con configuración o explicaciones extensas;
- el calendario inmediato es una proyección, no una cola de publicación;
- cada elemento conserva marca, objeto, estado, razón, tiempo y siguiente acción cuando corresponda;
- los detalles se abren mediante divulgación progresiva;
- la navegación conserva contexto sin duplicar fuentes de verdad;
- los estados de vacío, error, parcialidad, vencimiento y falta de autorización son distintos;
- la experiencia detallada de marca, brief y calendario deberá mantener la misma jerarquía y lenguaje empresarial.

`AURA-UX-002` diseñará el sistema de marca, brief guiado y calendario visual sin redefinir la superficie inicial ni convertir el calendario en fuente de ejecución externa.

---

#### 28. Requisitos de prueba derivados

`NO GENERA REQUISITOS DE PRUEBA`.

Justificación:

- el registro vigente ya protege la experiencia simple y progresiva de AURA;
- las obligaciones de marcas, campañas, contenido, autorizaciones, IA, oportunidades, resultados y navegación ya están cubiertas por requisitos existentes;
- esta tarea materializa la arquitectura de experiencia de entrada sin introducir una regla protegida nueva que requiera otro identificador;
- no cambia texto, estado, relación, propietario, paquete, ambiente ni evidencia de ninguna fila del registro canónico.

Requisitos creados: 0.

Requisitos modificados: 0.

Requisitos diferidos: 0.

Requisitos obsoletos: 0.

---

#### 29. Cobertura de prueba vigente reutilizada

Sin modificar el registro, la tarea reutiliza:

- `TREQ-AURA-001`, para marcas, briefs, calendarios, campañas, contenido, activos, versiones, vigencias y estados diferenciados;
- `TREQ-AURA-002`, para una experiencia principal simple y progresiva, grounding, fuentes, frescura, revisión humana y límites de autonomía de IA;
- `TREQ-AURA-003`, para oportunidades, campañas, resultados, guardas, atribución y recomendaciones explicables;
- `TREQ-UX-001`, para que tarea actual, acción principal y estado sean identificables;
- `TREQ-UX-003`, para ajustar información, acciones y densidad al actor y su autorización;
- `TREQ-UX-008`, para clasificar la experiencia por acción y superficie sin derivar autoridad del rol o dispositivo;
- `TREQ-UX-009`, para resolver contexto operativo sin fabricar autoridad;
- `TREQ-INTEGRATION-019`, para conservar contratos y estados de canales externos sin convertir el inicio diario en fuente maestra.

Esta enumeración es trazabilidad de cobertura existente y no constituye creación ni modificación de requisitos.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado dentro del checkout del usuario |
| REMOTA | PASS | se verificaron continuidad, topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, archivo propietario, `CAP-SCOPE-014`, `H-CAP-SCOPE-014-030`, `AURA-DOM-001`, `AURA-DOM-002`, `AURA-DOM-010`, procesos `VPROC-0056` y `VPROC-0057`, autorizaciones AURA, registro 04A aplicable, `package.json` y validadores documentales vigentes |
| OPERATIVA | NOT_APPLICABLE | la tarea diseña una experiencia documental; no ejecuta campañas, aprobaciones, publicaciones, oportunidades, recomendaciones, respuestas ni contactos reales |
| FÍSICA | NOT_APPLICABLE | la familia `AURA-UX-001` a `AURA-UX-008` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, rutas, componentes, datos, integraciones ni despliegues |

La validación remota demuestra consistencia documental de la propuesta. La validación real del repositorio permanece pendiente hasta incorporar el artefacto en su rama documental y ejecutar los validadores canónicos.

---

#### 31. Criterios de aceptación

`AURA-UX-001` queda satisfecha cuando simultáneamente:

1. la primera vista responde qué hacer hoy, qué espera aprobación, qué se publica próximamente, qué oportunidad merece atención y qué campaña necesita corrección;
2. existen como máximo seis familias visibles: prioridades, calendario inmediato, aprobaciones, alertas de canal, oportunidades y resultados que requieren acción;
3. la pantalla inicial no se convierte en consola técnica, dashboard analítico completo ni bandeja universal;
4. empresa, marca y filtros materiales permanecen visibles y autorizados;
5. el cambio de contexto no amplía autoridad ni mezcla ámbitos incompatibles;
6. cada prioridad identifica razón, estado, siguiente acción y tiempo cuando corresponda;
7. la prioridad no depende de un score opaco;
8. el calendario se distingue de la cola real de publicación;
9. las aprobaciones se resumen sin crear aprobación masiva ni saltar segregación;
10. las alertas de canal muestran impacto empresarial sin secretos ni trazas técnicas como contenido principal;
11. las oportunidades conservan etapa, siguiente acción y contexto sin convertirse en pedido o cliente maestro;
12. los resultados separan hecho, diagnóstico, recomendación, decisión y acción;
13. la acción principal solo aparece cuando existe una capacidad autorizada y una superficie propietaria válida;
14. cada elemento comunica identidad, contexto, estado, razón, tiempo y acción suficientes;
15. configuración, prompts, metadatos extensos y evidencia técnica permanecen bajo demanda;
16. la navegación deriva a las superficies propietarias sin duplicar estado;
17. carga, vacío, falta de autorización, error, datos vencidos y resultado parcial permanecen estados distintos;
18. ausencia de datos no se representa como cero;
19. frescura y vigencia son visibles cuando afectan la decisión;
20. resúmenes no revelan información fuera del alcance autorizado;
21. la experiencia conserva jerarquía en escritorio y superficies estrechas;
22. teclado, foco, semántica, contraste, texto ampliable y alternativas a color/hover/drag quedan contemplados;
23. la personalización no puede ocultar alertas críticas ni modificar autorización;
24. recomendaciones de IA permanecen identificables, explicables y no ejecutables por el solo hecho de aparecer;
25. `VPROC-0056` y `VPROC-0057` permanecen procesos propietarios;
26. `AURA-UX-004`, `AURA-UX-006`, `AURA-UX-007` y `AURA-UX-008` conservan sus experiencias detalladas;
27. `AURA-UX-002` recibe el handoff de marca, brief y calendario sin redefinir el inicio diario;
28. se crean y modifican cero requisitos de prueba;
29. no se crea ninguna instancia física;
30. la continuidad queda reservada exclusivamente a `AURA-UX-002`.

---

#### 32. Límites

Esta tarea no autoriza ni ejecuta:

- crear repositorio, runtime, ruta o pantalla real de AURA;
- crear componentes React, vistas móviles, estilos, historias visuales o prototipos ejecutables;
- modificar VISO, Vento-Group, SHELL u otra aplicación;
- crear tablas, vistas, migraciones, funciones, RPC, RLS, Storage, Realtime, jobs o Edge Functions;
- importar datos reales;
- conectar Meta, Google, TikTok, WhatsApp, correo, reseñas, analítica o proveedores de IA;
- almacenar o mostrar credenciales, tokens o secretos;
- crear campañas, briefs, piezas, activos, publicaciones, promociones, cupones o experimentos reales;
- aprobar, programar, publicar, retirar o responder contenido real;
- crear leads, oportunidades, clientes, cotizaciones, pedidos o reservas reales;
- contactar audiencias;
- responder comentarios o reclamos;
- crear métricas, atribuciones o recomendaciones productivas;
- ejecutar recomendaciones;
- redefinir permisos, roles o capacidades;
- seleccionar un framework, librería de componentes o sistema visual físico;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-UX-002`.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUTH-004 — Proteger credenciales, tokens, proveedores de IA, prompts, archivos y datos enviados a terceros`

**TAREA ACTUAL APROBADA**
`AURA-UX-001 — Diseñar inicio diario simple con prioridades, calendario, pendientes y oportunidades`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual`

### [ ] AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual

### [ ] AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables

### [ ] AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros

### [ ] AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas

### [ ] AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos

### [ ] AURA-UX-007 — Diseñar reputación, comentarios, respuestas y escalamiento

### [ ] AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones
