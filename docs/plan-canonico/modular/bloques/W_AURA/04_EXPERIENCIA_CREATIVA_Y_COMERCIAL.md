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

### ✅ AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-001 — Diseñar inicio diario simple con prioridades, calendario, pendientes y oportunidades
**Tarea siguiente:** AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables
**Tipo de tarea:** documental; diseño canónico de la experiencia de memoria de marca, brief guiado y calendario visual de AURA, con versionado, estados, validaciones, navegación y fronteras hacia creación, aprobación y publicación posteriores, sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, tablas, migraciones, RLS, funciones, RPC, Storage, jobs, integraciones, datos, campañas, credenciales, proveedores ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la experiencia con la que AURA deberá permitir comprender y preparar trabajo de marketing sin perder gobierno de marca ni convertir planificación visual en ejecución automática.

La experiencia une tres responsabilidades relacionadas pero distintas:

```text
SISTEMA DE MARCA
-> define el contexto creativo gobernado

BRIEF GUIADO
-> convierte una necesidad en una iniciativa suficientemente completa y versionada

CALENDARIO VISUAL
-> proyecta temporalmente iniciativas, hitos, dependencias y ventanas previstas
```

pero conserva:

```text
MEMORIA DE MARCA
!= BRIEF
!= CAMPANA
!= PIEZA
!= PUBLICACION
!= COLA DE PUBLICACION
```

El objetivo es que una persona autorizada pueda pasar de contexto de marca a un brief revisable y a una lectura temporal compartida sin depender de formularios extensos, configuraciones técnicas o conocimiento del modelo interno de datos.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-UX-001`, que fija contexto autorizado de empresa y marca, divulgación progresiva, navegación sin duplicar fuentes de verdad, estados diferenciados y calendario inmediato como proyección;
- `AURA-DOM-001`, para memoria de marca versionada, identidad, propósito, tono, mensajes, claims, restricciones, variantes, vigencia, responsabilidad y evidencia;
- `AURA-DOM-002`, para objetivo empresarial, hipótesis, audiencia y exclusiones, brief versionado, calendario, presupuesto referenciado, dependencias, responsables, aprobación y ciclo documental de campaña;
- `AURA-DOM-003`, para activos, derechos, versiones y reutilización que el brief podrá referenciar pero no administrar en detalle;
- `AURA-DOM-005`, para mantener publicación, programación externa, reintentos, retiro y reconciliación fuera del calendario de planificación;
- `AURA-AUTH-001` a `AURA-AUTH-004`, para alcance por empresa, marca, función, capacidad y recurso, segregación de funciones, protección de datos y secretos y acceso a terceros;
- `VPROC-0056`, para preservar solicitud, brief, creación, revisión, aprobación, programación, publicación, rendimiento y cierre como estados y responsabilidades diferenciados;
- `CAP-SCOPE-014`, para memoria de marca versionada, brief guiado y calendario como capacidades objetivo de AURA;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

Esta tarea no crea una nueva fuente maestra para marcas, productos, precios, disponibilidad, clientes, ventas, presupuesto, activos o publicación externa.

---

#### 3. Resultado canónico

AURA deberá ofrecer una experiencia continua que permita responder:

```text
¿CON QUÉ MARCA Y VERSIÓN ESTOY TRABAJANDO?
¿QUÉ REGLAS DE IDENTIDAD Y RESTRICCIONES APLICAN?
¿QUÉ NECESIDAD EMPRESARIAL ESTOY CONVIRTIENDO EN BRIEF?
¿QUÉ INFORMACIÓN FALTA ANTES DE REVISAR O APROBAR?
¿QUÉ HITOS Y DEPENDENCIAS EXISTEN EN EL TIEMPO?
¿QUÉ ELEMENTOS DEL CALENDARIO SON SOLO PLANIFICACIÓN Y CUÁLES YA TIENEN ESTADO EN SU FLUJO PROPIETARIO?
```

La experiencia se compone de tres espacios conceptuales conectados:

1. sistema de marca;
2. brief guiado;
3. calendario visual.

Los tres comparten contexto y referencias, pero ninguno sustituye al otro.

---

#### 4. Principios de experiencia

La experiencia se rige por estos principios:

1. **identidad antes que creación:** toda iniciativa parte de una marca y una versión gobernadas cuando la actividad sea de marca;
2. **guía antes que formulario plano:** el brief se construye por decisiones comprensibles, no mediante una lista indiscriminada de campos;
3. **completitud visible:** la persona puede distinguir qué está completo, qué falta, qué está bloqueado y por qué;
4. **hechos desde fuentes propietarias:** precio, disponibilidad, presupuesto, consentimiento, producto y capacidad no se inventan para completar un brief;
5. **versionado visible:** marca y brief muestran cuál versión está vigente y qué cambió materialmente;
6. **calendario como proyección:** mover o mostrar un elemento en calendario no ejecuta una publicación ni cambia por sí solo un estado empresarial;
7. **divulgación progresiva:** evidencia, historial, restricciones y fuentes aparecen bajo demanda sin desaparecer del contrato;
8. **autorización antes que acción:** ver una marca, brief o evento no concede editar, aprobar, programar o publicar;
9. **estado semántico antes que color:** ningún estado depende exclusivamente de color, posición o iconografía;
10. **continuidad de contexto:** al pasar entre marca, brief y calendario se conserva el contexto aplicable sin fabricar autoridad.

---

#### 5. Sistema de marca

El sistema de marca será la superficie de consulta y gobierno de la memoria aprobada que alimenta briefs y creación posterior.

Deberá permitir reconocer, como mínimo:

- marca seleccionada;
- relación con el contexto organizacional autorizado;
- versión de memoria de marca;
- estado y vigencia;
- propósito;
- tono y reglas de expresión;
- mensajes aprobados;
- claims y su condición de evidencia;
- restricciones;
- variantes explícitas aplicables;
- referencias de identidad visual;
- responsables de revisión y aprobación;
- historial de versiones.

No deberá representar una marca como una carpeta de archivos, un prompt libre o una colección de copies sin vigencia.

---

#### 6. Selector y contexto de marca

La experiencia deberá mostrar claramente qué marca gobierna el trabajo actual.

Cuando el actor tenga acceso a varias marcas, el selector deberá:

- listar únicamente marcas autorizadas;
- distinguir marca de empresa, sujeto legal, establecimiento, sede y canal;
- conservar el contexto activo durante la navegación compatible;
- advertir cuando cambiar de marca afecte un brief todavía no guardado o una comparación actual;
- no trasladar automáticamente datos, claims o variantes de una marca a otra;
- impedir que un filtro visual amplíe alcance de autorización.

Un cambio de marca es cambio de contexto, no reasignación automática de un objeto ya versionado.

---

#### 7. Resumen de marca

La vista resumida de una marca priorizará información útil para tomar decisiones creativas y de planificación.

Como mínimo mostrará:

1. propósito aprobado;
2. versión vigente;
3. vigencia;
4. rasgos de tono principales;
5. mensajes o pilares reutilizables;
6. restricciones críticas;
7. claims vigentes que sean relevantes;
8. variantes activas por sede, canal, audiencia o contexto cuando existan;
9. advertencias por evidencia vencida o revisión pendiente;
10. acceso al historial y detalle.

La vista resumida no deberá ocultar una restricción crítica para simplificar la pantalla.

---

#### 8. Tono, mensajes y restricciones

La experiencia deberá separar visual y semánticamente:

```text
TONO
!= MENSAJE
!= CLAIM
!= RESTRICCION
```

El tono describe cómo puede expresarse la marca.

Los mensajes definen formulaciones o significados aprobados dentro de un ámbito.

Los claims son afirmaciones verificables que requieren fuente y vigencia.

Las restricciones limitan lo que puede decirse o hacerse aunque resulte creativamente conveniente.

Cada elemento deberá permitir conocer su ámbito y vigencia sin obligar a leer toda la memoria de marca.

---

#### 9. Claims y evidencia

Cuando un claim sea visible en el sistema de marca, la experiencia deberá distinguir como mínimo:

- claim utilizable y vigente;
- claim próximo a revisión;
- claim con evidencia vencida;
- claim sustituido;
- claim restringido al contexto actual;
- claim no disponible para el actor.

La interfaz podrá resumir la fuente, pero deberá permitir abrir la evidencia autorizada o su referencia.

Queda prohibido tratar como claim aprobado un copy observado, una salida de IA, una pieza histórica o un texto repetido sin evidencia y vigencia suficientes.

---

#### 10. Variantes de marca

Una variante explícita deberá mostrarse como extensión de una versión base, no como una marca paralela.

La experiencia deberá dejar claro:

- qué perfil base hereda;
- qué dimensión especializa;
- qué valores modifica;
- qué restricciones permanecen heredadas;
- cuál es su ámbito;
- cuál es su vigencia;
- quién la aprobó.

Las variantes implícitas por costumbre local, canal, persona o proveedor no se presentarán como canónicas.

---

#### 11. Historial de marca

El historial deberá permitir reconstruir versiones sin convertir una versión antigua en vigente por el solo hecho de consultarla.

Una comparación entre versiones deberá priorizar cambios materiales en:

- propósito;
- tono;
- mensajes;
- claims;
- restricciones;
- ámbitos;
- variantes;
- vigencia;
- responsabilidad.

La interfaz deberá diferenciar `vigente`, `futura`, `sustituida`, `vencida` y `archivada` cuando esas semánticas apliquen.

---

#### 12. Acciones sobre memoria de marca

Las acciones visibles dependerán de capacidad y estado.

Conceptualmente podrán existir acciones como:

- consultar;
- proponer cambio;
- revisar;
- comparar versiones;
- someter a aprobación;
- aprobar cuando exista autoridad separada;
- programar vigencia documental cuando el contrato lo permita;
- sustituir o retirar una versión.

La tarea no asigna permisos concretos ni convierte estas acciones en endpoints o componentes físicos.

Una persona capaz de crear un brief no adquiere por ello capacidad de editar o aprobar memoria de marca.

---

#### 13. Entrada al brief guiado

El brief podrá iniciarse desde:

- una necesidad o solicitud;
- una iniciativa ya registrada;
- una campaña en preparación;
- una marca seleccionada;
- una acción derivada del inicio diario;
- una duplicación controlada de un brief previo como nueva versión o nuevo borrador.

La entrada deberá resolver el contexto disponible sin asumir datos faltantes.

Duplicar un brief no duplica automáticamente su vigencia, aprobación, presupuesto, audiencia, disponibilidad ni calendario. Esos elementos deberán revalidarse.

---

#### 14. Estructura del brief guiado

El brief se construirá por etapas comprensibles.

La secuencia conceptual será:

1. objetivo e hipótesis;
2. marca y versión de memoria;
3. audiencia y exclusiones;
4. mensaje, oferta o acción propuesta;
5. piezas o entregables esperados;
6. canales candidatos;
7. periodo y calendario;
8. presupuesto o límite referenciado cuando aplique;
9. dependencias y datos requeridos;
10. riesgos, restricciones y guardas;
11. responsables y aprobaciones;
12. revisión de completitud antes de avanzar.

La implementación futura podrá presentar pasos combinados o adaptativos, siempre que conserve estas decisiones y no oculte faltantes materiales.

---

#### 15. Objetivo e hipótesis en el brief

El brief deberá empezar por el resultado empresarial que se busca y no por la pieza deseada.

La experiencia diferenciará:

```text
RESULTADO EMPRESARIAL
!= ACTIVIDAD
!= METRICA DE VANIDAD
!= ENTREGABLE CREATIVO
```

La hipótesis se mostrará como relación propuesta y no como hecho demostrado.

Cuando el objetivo sea ambiguo o solo describa una actividad, la experiencia deberá pedir refinamiento antes de considerar el brief completo.

---

#### 16. Audiencia y exclusiones

El brief guiado deberá permitir definir audiencia sin convertir la experiencia en un exportador de personas.

La persona deberá poder comprender:

- propósito de la audiencia;
- criterios de inclusión;
- criterios de exclusión;
- canal o contexto previsto;
- vigencia;
- restricciones de consentimiento o finalidad;
- fuente de atributos cuando sea material.

La experiencia no deberá mostrar miembros identificables por defecto cuando la tarea solo requiere definir la audiencia lógica.

Una audiencia definida no equivale a lista exportada, contacto autorizado ni segmento materializado.

---

#### 17. Mensaje, oferta y hechos variables

El brief deberá distinguir entre intención creativa y hechos empresariales variables.

Cuando el mensaje dependa de:

- precio;
- disponibilidad;
- producto;
- capacidad;
- horario;
- presupuesto;
- beneficio;
- consentimiento;
- fecha comercial;
- claim verificable;

la experiencia deberá identificar la fuente propietaria o declarar el dato como pendiente.

Un campo vacío no se completa con inferencia ni con generación de IA.

---

#### 18. Piezas y entregables esperados

El brief podrá declarar qué resultados creativos se necesitan sin diseñarlos todavía.

Cada entregable podrá expresar, cuando corresponda:

- finalidad;
- formato esperado;
- canal candidato;
- audiencia o contexto;
- fecha objetivo;
- dependencias;
- activos requeridos;
- derechos o restricciones conocidas;
- estado de preparación.

La creación, edición y fábrica de variantes corresponden a `AURA-UX-003`.

---

#### 19. Canales candidatos

El brief podrá declarar canales previstos, pero la experiencia deberá mantener visible que:

```text
CANAL CANDIDATO
!= CUENTA HABILITADA
!= ENDPOINT APTO
!= PUBLICACION PROGRAMADA
```

Un canal previsto sirve para orientar formato, longitud, entregables y calendario.

La habilitación real, las credenciales y la publicación permanecen en sus tareas propietarias.

---

#### 20. Presupuesto y límites económicos

Cuando una iniciativa requiera presupuesto, el brief deberá poder mostrar:

- monto o límite referenciado;
- periodo;
- fuente económica;
- estado de aprobación cuando exista;
- responsable;
- distribución prevista cuando sea relevante;
- advertencia por desactualización o ausencia de fuente.

AURA no se convierte en fuente económica ni permite asumir disponibilidad presupuestal a partir de un número escrito en el brief.

---

#### 21. Dependencias y guardas

La experiencia deberá presentar dependencias como condiciones verificables y no como notas perdidas en texto libre.

Una dependencia podrá estar:

- satisfecha;
- pendiente;
- bloqueada;
- vencida;
- no aplicable;
- desconocida por falta de evidencia.

Las guardas materiales deberán destacarse antes de revisión o aprobación.

Ejemplos incluyen evidencia de claim, disponibilidad, capacidad, presupuesto, consentimiento, derechos de activos, canal apto o aprobación requerida.

`desconocido` no equivale a `satisfecho`.

---

#### 22. Completitud del brief

La experiencia deberá ofrecer una lectura simple de completitud sin convertirla en un porcentaje engañoso.

Como mínimo distinguirá:

```text
BORRADOR INCOMPLETO
LISTO PARA REVISION
EN REVISION
REQUIERE CAMBIOS
LISTO PARA APROBACION
APROBADO
```

Estos nombres expresan semántica de experiencia y no crean por sí solos un namespace físico obligatorio.

Un brief no podrá aparecer `listo` cuando falte una guarda material aunque todos los campos visuales tengan contenido.

---

#### 23. Validación contextual del brief

La validación se presentará cerca de la decisión afectada y en lenguaje empresarial.

Deberá distinguir:

- campo faltante;
- dato no verificable;
- contradicción con memoria de marca;
- claim sin evidencia suficiente;
- dependencia no satisfecha;
- vigencia incompatible;
- falta de autorización;
- error técnico;
- dato vencido;
- conflicto de versión.

La experiencia no usará un mensaje genérico de `formulario inválido` cuando pueda indicar la causa material.

---

#### 24. Versionado del brief

Cada cambio material deberá quedar asociado a una versión reconstruible.

La experiencia deberá permitir reconocer:

- versión actual;
- estado;
- autoría;
- fecha;
- cambio material;
- versión anterior;
- revisión o aprobación asociada;
- motivo de cambio cuando sea requerido.

Cambiar objetivo, marca, audiencia, oferta principal, presupuesto, periodo, claim material, canal principal o dependencia crítica después de aprobación deberá hacer visible la necesidad de nueva revisión proporcional.

---

#### 25. Revisión del brief

Antes de pasar a creación, la experiencia deberá resumir en una sola vista revisable:

- objetivo e hipótesis;
- marca y versión;
- audiencia y exclusiones;
- mensaje u oferta;
- entregables;
- canales candidatos;
- tiempo;
- presupuesto referenciado;
- dependencias;
- guardas;
- responsables;
- faltantes o bloqueos.

La revisión debe evitar que el aprobador tenga que reconstruir el brief recorriendo cada paso de entrada.

Aprobar permanece separado de crear y editar.

---

#### 26. Calendario visual

El calendario será una proyección temporal de planificación.

Deberá permitir visualizar, según contexto autorizado:

- iniciativas;
- hitos de brief;
- ventanas de creación;
- revisiones;
- aprobaciones previstas;
- fechas objetivo de entregables;
- ventanas de publicación previstas;
- fechas comerciales relevantes;
- dependencias temporales;
- revisiones de resultados;
- cierres previstos.

No será fuente maestra de publicación ni reemplazará el estado del proceso propietario.

---

#### 27. Vistas del calendario

El diseño deberá admitir al menos tres lecturas conceptuales del mismo conjunto autorizado:

1. **periodo**, para comprender carga y distribución temporal;
2. **agenda**, para ordenar próximos hitos y vencimientos;
3. **iniciativa**, para leer la secuencia temporal de una campaña o brief concreto.

La implementación futura podrá materializar estas lecturas como mes, semana, lista, timeline u otra composición compatible.

La tarea no obliga a un componente o librería de calendario específica.

---

#### 28. Identidad visual de eventos

Un elemento del calendario deberá comunicar sin depender solo del color:

- tipo de objeto o hito;
- marca;
- estado;
- fecha o ventana;
- responsable cuando aplique;
- bloqueo o dependencia;
- relación con la iniciativa;
- indicador de publicación real únicamente cuando provenga del flujo propietario correspondiente.

El color podrá reforzar agrupación por marca, estado o categoría, pero deberá existir texto, iconografía accesible o etiqueta equivalente.

---

#### 29. Movimiento y edición temporal

Mover visualmente un elemento no deberá producir una mutación empresarial silenciosa.

Cuando la implementación futura permita reprogramar mediante drag-and-drop u otra interacción directa, deberá:

1. comprobar que el actor puede modificar ese objeto;
2. mostrar el cambio propuesto;
3. recalcular dependencias y vigencias afectadas;
4. advertir conflictos;
5. confirmar cuando el cambio sea material;
6. conservar auditoría;
7. no alterar publicaciones externas ya programadas sin pasar por el flujo propietario.

Por tanto:

```text
ARRASTRAR EN CALENDARIO
!= REPROGRAMAR PUBLICACION EXTERNA AUTOMATICAMENTE
```

---

#### 30. Conflictos de calendario

La experiencia deberá hacer visibles conflictos temporales relevantes, por ejemplo:

- entregable previsto después de su publicación objetivo;
- aprobación posterior a la ventana necesaria;
- dependencia no satisfecha antes del hito;
- claim o condición que vence antes de ejecución;
- campañas que compiten por una restricción conocida;
- fecha fuera de vigencia de una oferta;
- actividad bloqueada por un cambio material no revisado.

La detección de conflicto no autoriza reordenamiento automático.

---

#### 31. Calendario y publicación real

El calendario deberá diferenciar claramente:

```text
FECHA PREVISTA
FECHA APROBADA
TARGET PROGRAMADO
PUBLICACION CONFIRMADA
```

Una fecha prevista puede cambiar durante planificación.

Una publicación programada pertenece al contrato de canal y debe conservar cuenta, endpoint, versión, zona horaria, autorización y evidencia.

Una publicación confirmada proviene del estado reconciliado del canal, no de haber alcanzado una fecha visual en el calendario.

---

#### 32. Filtros del calendario

Los filtros podrán incluir, según autoridad:

- marca;
- iniciativa;
- estado;
- tipo de hito;
- responsable;
- canal candidato;
- periodo;
- bloqueos;
- entregables.

Un filtro reduce o reorganiza una proyección; nunca amplía autorización.

Los filtros activos deberán permanecer visibles cuando puedan cambiar materialmente la interpretación de carga o próximos hitos.

---

#### 33. Estados vacíos, error y datos vencidos

Sistema de marca, brief y calendario deberán distinguir:

- no existen objetos todavía;
- no existen objetos para el filtro actual;
- el actor no está autorizado a verlos;
- existe carga en curso;
- existe fallo técnico;
- existe resultado parcial;
- la información está vencida;
- existe conflicto de versión.

Una pantalla vacía no podrá presentarse como evidencia de que no hay campañas, briefs o hitos en el sistema.

---

#### 34. Accesibilidad y adaptación de superficie

La experiencia deberá conservar:

- navegación completa por teclado;
- foco visible;
- semántica y nombres accesibles;
- contraste suficiente;
- información de estado no dependiente solo de color;
- alternativas a hover;
- alternativa a drag-and-drop para cambios temporales cuando esa acción exista;
- lectura con texto ampliado;
- jerarquía estable en superficies estrechas;
- orden lógico de lectura para sistemas de asistencia.

El calendario no deberá exigir precisión motora como única forma de modificar una fecha.

---

#### 35. Navegación entre las tres superficies

La navegación deberá permitir:

```text
MARCA
-> iniciar o consultar BRIEF

BRIEF
-> abrir CONTEXTO DE MARCA
-> abrir CALENDARIO relacionado

CALENDARIO
-> abrir INICIATIVA o BRIEF propietario
```

El cambio de superficie conserva referencias e identidad, pero cada owner sigue siendo responsable de su estado.

No se copiará el mismo objeto para simular continuidad entre vistas.

---

#### 36. Relación con `AURA-UX-001`

La 002 consume el contexto y lenguaje fijados por el inicio diario.

Cuando una prioridad del inicio lleve a marca, brief o calendario:

- se conserva empresa y marca aplicables;
- se conserva el objeto origen;
- se mantiene la razón por la que requiere atención;
- se evita exigir al usuario volver a localizar manualmente la iniciativa;
- la superficie especializada muestra detalle suficiente para resolver el trabajo.

La 002 no redefine las seis familias del inicio diario ni crea un segundo dashboard inicial.

---

#### 37. Relación con `AURA-UX-003`

`AURA-UX-003` recibirá briefs suficientemente completos y referencias de marca gobernadas para diseñar estudio creativo y variantes.

La frontera queda:

```text
AURA-UX-002
-> contexto de marca
-> brief guiado
-> planificación temporal

AURA-UX-003
-> creación asistida
-> edición
-> variantes reutilizables
-> trabajo sobre activos y outputs creativos
```

Esta tarea no diseña canvas creativo, editor de piezas, generación de imágenes, copy asistido, prompts creativos ni biblioteca de variantes.

---

#### 38. Relación con aprobación y publicación posteriores

La experiencia podrá mostrar que un brief o hito requiere aprobación, pero no absorbe la superficie detallada de aprobación y publicación multicanal de `AURA-UX-004`.

Tampoco convierte el calendario en scheduler externo.

Las acciones críticas continuarán respetando segregación de funciones, versión, autorización y revalidación antes del efecto.

---

#### 39. Handoff a `AURA-UX-003`

`AURA-UX-002` entrega a `AURA-UX-003` las siguientes decisiones ya fijadas:

- toda creación parte de contexto de marca gobernado y versión identificable;
- el brief es versionado y distingue objetivo, hipótesis, audiencia, mensaje, entregables, canales candidatos, tiempo, presupuesto, dependencias y guardas;
- un brief incompleto no se promueve silenciosamente a listo;
- hechos variables continúan en sus fuentes propietarias;
- piezas y entregables esperados pueden declararse antes de crearse;
- canales candidatos no equivalen a publicación ni cuenta habilitada;
- cambios materiales del brief exigen nueva revisión proporcional;
- el calendario es proyección de planificación y no cola de publicación;
- una interacción visual de calendario no ejecuta efectos externos;
- marca, brief y calendario comparten contexto sin duplicar fuentes de verdad.

`AURA-UX-003` deberá diseñar el estudio creativo asistido y la fábrica de variantes reutilizables consumiendo este contexto sin redefinir memoria de marca, brief o calendario.

---

#### 40. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- la identidad y memoria de marca, briefs, calendarios, campañas, contenido, versiones y vigencias ya están protegidos por cobertura vigente de AURA;
- la simplicidad, contexto, estado, autorización y navegación ya están protegidos por cobertura transversal de experiencia;
- esta tarea desarrolla la arquitectura de experiencia para contratos ya aprobados sin crear una obligación protegida nueva;
- no modifica texto, estado, relación, propietario, paquete, ambiente ni evidencia de ninguna fila del registro canónico.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 41. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza:

- `TREQ-AURA-001`, para marcas, audiencias, briefs, calendarios, campañas, contenido, versiones, vigencias, propietarios y estados diferenciados;
- `TREQ-AURA-011`, para creación gobernada de contenido y validación de identidad, fechas, alcance y estado inicial sin publicación accidental;
- `TREQ-AURA-012`, para actualización con concurrencia, preservación de identidad, versión, referencias y auditoría;
- `TREQ-AURA-019`, para conservar historial editorial y recuperación sin pérdida de trazabilidad;
- `TREQ-AURA-026`, para auditoría, observabilidad y reconciliación de cambios editoriales;
- `TREQ-UX-001`, para tarea, acción principal y estado identificables;
- `TREQ-UX-003`, para información, acciones y densidad adecuadas al actor y su autorización;
- `TREQ-UX-008`, para clasificar por acción y superficie sin derivar autoridad del rol o dispositivo;
- `TREQ-UX-009`, para resolver contexto operativo sin fabricar autoridad.

Esta enumeración constituye trazabilidad de cobertura existente y no crea ni modifica requisitos.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado dentro del checkout del usuario |
| REMOTA | PASS | se verificaron continuidad, topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, archivo propietario, `AURA-DOM-001`, `AURA-DOM-002`, fronteras con `AURA-DOM-003` y `AURA-DOM-005`, autorizaciones AURA, `VPROC-0056`, cobertura 04A aplicable, `package.json` y validadores documentales vigentes; además se consumió el handoff completo aprobado de `AURA-UX-001` |
| OPERATIVA | NOT_APPLICABLE | la tarea diseña experiencia documental; no crea briefs productivos, campañas, contenido, aprobaciones, publicaciones, presupuestos ni contactos reales |
| FÍSICA | NOT_APPLICABLE | la familia `AURA-UX-001` a `AURA-UX-008` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, rutas, componentes, datos, integraciones ni despliegues |

La validación remota demuestra consistencia documental del artefacto con las fuentes consultadas. La validación real del repositorio permanece pendiente hasta incorporar el archivo en su rama documental y ejecutar los validadores canónicos.

---

#### 43. Criterios de aceptación

`AURA-UX-002` queda satisfecha cuando simultáneamente:

1. sistema de marca, brief guiado y calendario visual son superficies relacionadas pero no colapsadas;
2. la marca seleccionada y su versión gobiernan el contexto creativo aplicable;
3. marca, empresa, sujeto legal, establecimiento, sede y canal permanecen diferenciados;
4. propósito, tono, mensajes, claims, restricciones, variantes y vigencia son distinguibles;
5. claims muestran condición de evidencia y vigencia sin promover copy observado a verdad canónica;
6. las variantes muestran perfil base, ámbito, cambios y restricciones heredadas;
7. el historial permite reconstruir versiones sin reactivar una versión antigua;
8. crear un brief no concede capacidad para editar o aprobar memoria de marca;
9. el brief comienza por objetivo e hipótesis y no por una pieza aislada;
10. audiencia y exclusiones se definen sin materializar listas de personas por defecto;
11. hechos variables conservan fuente propietaria y faltantes no se inventan;
12. piezas y entregables esperados se declaran sin absorber el estudio creativo;
13. canales candidatos no se presentan como cuentas habilitadas o publicaciones programadas;
14. presupuesto se referencia sin convertir AURA en fuente económica;
15. dependencias y guardas tienen estado explícito y `desconocido` no equivale a satisfecho;
16. la completitud del brief distingue borrador, revisión, cambios, aprobación y bloqueos materiales;
17. errores y validaciones se explican cerca de la decisión afectada;
18. cambios materiales de brief conservan versión y nueva revisión proporcional;
19. existe una vista de revisión que resume las decisiones materiales del brief;
20. el calendario proyecta iniciativas, hitos, revisiones, aprobaciones, entregables y ventanas sin ser fuente de publicación;
21. las lecturas de periodo, agenda e iniciativa pueden derivarse del mismo conjunto autorizado;
22. los eventos comunican estado y contexto sin depender solo de color;
23. mover un elemento del calendario no produce una mutación empresarial silenciosa;
24. los conflictos temporales materiales son visibles y no se resuelven automáticamente;
25. fecha prevista, fecha aprobada, target programado y publicación confirmada permanecen diferenciados;
26. filtros no amplían autorización;
27. vacío, filtro sin resultados, falta de autorización, error, parcialidad, vencimiento y conflicto de versión permanecen distintos;
28. la experiencia dispone de alternativas accesibles a hover, color y drag-and-drop;
29. navegar entre marca, brief y calendario conserva identidad sin duplicar objetos;
30. `AURA-UX-001` conserva ownership del inicio diario;
31. `AURA-UX-003` conserva ownership del estudio creativo y variantes;
32. `AURA-UX-004` conserva ownership de aprobación y publicación multicanal detalladas;
33. se crean y modifican cero requisitos de prueba;
34. no se crea ninguna instancia física;
35. la continuidad queda reservada exclusivamente a `AURA-UX-003`.

---

#### 44. Límites

Esta tarea no autoriza ni ejecuta:

- crear repositorio, runtime, ruta, pantalla, componente o prototipo ejecutable de AURA;
- seleccionar framework, librería visual o componente de calendario;
- modificar VISO, Vento-Group, SHELL u otra aplicación;
- crear tablas, migraciones, vistas, funciones, RPC, triggers, RLS, Storage, Realtime, jobs o Edge Functions;
- crear o cambiar marcas reales, identidades organizacionales o titularidad;
- aprobar copies observados como memoria canónica;
- crear claims sin evidencia;
- crear briefs productivos, campañas, presupuestos, audiencias materiales o segmentos reales;
- exportar personas o datos de clientes;
- generar piezas, imágenes, copy, prompts o variantes creativas;
- administrar activos o derechos en detalle;
- aprobar, programar, publicar, retirar o reconciliar contenido externo;
- crear cuentas, endpoints, credenciales, tokens o secretos;
- conectar Meta, Google, TikTok, WhatsApp, correo, reseñas, analítica o proveedores de IA;
- ejecutar drag-and-drop, scheduling o mutaciones reales;
- redefinir permisos, roles o capacidades;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-UX-003`.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-001 — Diseñar inicio diario simple con prioridades, calendario, pendientes y oportunidades`

**TAREA ACTUAL APROBADA**
`AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables`

### ✅ AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual
**Tarea siguiente:** AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros
**Tipo de tarea:** documental; diseño canónico de la experiencia del estudio creativo asistido de AURA y de la fábrica de variantes reutilizables, con grounding, procedencia, versiones, derechos, revisión humana, estados editoriales y fronteras de autorización, sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, tablas, migraciones, RLS, funciones, RPC, Storage, índices, embeddings, jobs, proveedores, credenciales, prompts productivos, datos, activos reales, publicaciones ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la experiencia con la que AURA deberá transformar un brief suficientemente completo y un contexto de marca gobernado en propuestas creativas versionadas, revisables y reutilizables, sin convertir asistencia de IA, edición o generación de variantes en aprobación ni publicación.

La experiencia deberá permitir crear, adaptar, comparar, revisar y reutilizar contenido conservando procedencia, fuentes, derechos, versión, vigencia, contexto y responsabilidad.

La regla raíz es:

```text
CONTEXTO GOBERNADO
+ BRIEF VERSIONADO
+ ACTIVOS Y DERECHOS VALIDOS
+ FUENTES AUTORIZADAS
+ ASISTENCIA CREATIVA
+ REVISION HUMANA
=
PROPUESTA CREATIVA TRAZABLE
```

pero:

```text
SALIDA GENERADA
!= CONTENIDO APROBADO
!= PUBLICACION
```

```text
VARIANTE
!= DERIVADO
!= NUEVA VERSION MATERIAL
!= NUEVO ORIGINAL
```

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-UX-002`, que entrega contexto de marca gobernado, brief versionado, piezas y entregables esperados, canales candidatos, calendario como proyección y hechos variables en sus fuentes propietarias;
- `AURA-DOM-003`, para activos, propiedad funcional, derechos, autorizaciones, originales, derivados, versiones, vigencia, reutilización, revisión y aprobación;
- `AURA-DOM-004`, para grounding, contexto versionado, hecho/inferencia/propuesta, memoria gobernada, proveedor/modelo, minimización de datos, trazabilidad y revisión humana;
- `AURA-DOM-001`, para memoria de marca, claims, restricciones, variantes y vigencias;
- `AURA-DOM-002`, para objetivo, hipótesis, audiencia, brief, calendario, presupuesto referenciado y dependencias;
- `AURA-AUTH-002`, para mantener separadas creación, revisión, aprobación, programación, publicación, retiro y respuesta pública;
- `AURA-AUTH-004`, para credenciales, proveedores de IA, prompts, archivos, datos enviados a terceros, minimización y tratamiento de contenido externo no confiable;
- `VPROC-0056`, para conservar el ciclo canónico desde `CONTENT_REQUESTED` hasta `CONTENT_CYCLE_REVIEWED` sin crear un workflow paralelo;
- `CAP-SCOPE-014`, en especial la biblioteca empresarial de activos, la fábrica de contenido, la asistencia de IA y la separación entre borrador asistido, aprobación y publicación;
- `CAP-SCOPE-016`, para propiedad, custodia, derechos, clasificación, retención y disposición de información y archivos;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

Esta tarea no crea un runtime creativo, no selecciona proveedor de IA y no modifica fuentes maestras de marca, producto, precio, disponibilidad, cliente, venta, presupuesto ni publicación.

---

#### 3. Resultado canónico

AURA deberá ofrecer un estudio creativo en el que una persona autorizada pueda responder, sin perder contexto:

```text
¿QUÉ BRIEF ESTOY RESOLVIENDO?
¿QUÉ MARCA, VERSIÓN Y RESTRICCIONES GOBIERNAN EL TRABAJO?
¿QUÉ FUENTES Y ACTIVOS PUEDO USAR?
¿QUÉ PARTE ES HECHO, INFERENCIA O PROPUESTA?
¿QUÉ VARIANTES EXISTEN Y DE DÓNDE PROVIENEN?
¿QUÉ CAMBIÓ ENTRE VERSIONES?
¿QUÉ FALTA VALIDAR ANTES DE ENVIAR A REVISIÓN?
```

La experiencia se divide conceptualmente en:

1. contexto y brief activo;
2. espacio de creación y edición;
3. fuentes, activos y grounding;
4. variantes y reutilización;
5. historial y comparación;
6. preparación para revisión.

Cada espacio comparte el mismo expediente creativo sin convertirse en una fuente de verdad paralela.

---

#### 4. Principios de experiencia

El estudio creativo se rige por estos principios:

1. **brief antes que generación:** toda creación deberá quedar asociada a un propósito, marca y contexto identificables;
2. **fuentes antes que afirmaciones:** un hecho material no se inventa para completar una pieza;
3. **propuesta antes que aprobación:** una salida generada o editada permanece propuesta hasta atravesar revisión y aprobación;
4. **procedencia antes que reutilización:** toda variante debe conservar de dónde proviene;
5. **derechos antes que transformación:** la capacidad técnica de transformar un archivo no demuestra derecho a hacerlo;
6. **versionado antes que sobrescritura:** un cambio material no destruye la versión anterior;
7. **human-in-the-loop:** la asistencia acelera creación, no sustituye responsabilidad editorial;
8. **minimización antes que terceros:** solo se envía a un proveedor la información necesaria y autorizada;
9. **estado semántico antes que apariencia:** borrador, propuesta, revisión y aprobación no dependen de color o posición visual;
10. **reutilización gobernada:** una variante reutilizable conserva alcance, vigencia, restricciones y evidencia.

---

#### 5. Arquitectura conceptual del estudio

El estudio deberá mantener visibles, en distintos niveles de detalle, cinco referencias principales:

```text
BRIEF ACTIVO
MARCA Y VERSION
PIEZA / PROPUESTA ACTUAL
FUENTES Y ACTIVOS CONSUMIDOS
ESTADO EDITORIAL
```

Ninguna de estas referencias podrá derivarse de una selección visual si el expediente no la contiene explícitamente.

El estudio podrá ofrecer herramientas diferentes según tipo de trabajo, pero todas deberán preservar el mismo contrato de trazabilidad.

---

#### 6. Entrada desde `AURA-UX-002`

Al ingresar desde un brief, el estudio deberá recibir sin reinterpretar:

- objetivo empresarial;
- hipótesis cuando exista;
- marca y versión de memoria;
- audiencia y exclusiones aplicables;
- mensaje, oferta o acción prevista;
- entregables requeridos;
- canales candidatos;
- periodo y calendario;
- presupuesto referenciado cuando corresponda;
- dependencias;
- guardas;
- responsables;
- información faltante o bloqueos vigentes.

Un brief incompleto podrá abrirse para exploración creativa únicamente si la experiencia deja claro qué partes no permiten todavía producir una propuesta revisable o aprobable.

---

#### 7. Contexto creativo visible

La superficie principal deberá permitir conocer de forma compacta:

- marca activa;
- versión de memoria de marca;
- brief y versión;
- objetivo;
- audiencia o contexto previsto;
- entregable actual;
- restricciones críticas;
- claims o mensajes relevantes;
- fuentes pendientes de verificar;
- estado editorial actual.

La divulgación progresiva permitirá abrir el detalle sin saturar la superficie principal.

---

#### 8. Frontera entre hecho, inferencia y propuesta

Toda asistencia deberá conservar la distinción:

```text
HECHO
-> respaldado por fuente autorizada y vigente

INFERENCIA
-> interpretación explícita derivada de hechos

PROPUESTA
-> contenido creativo que requiere decisión humana
```

La interfaz no deberá presentar una inferencia o propuesta como hecho mediante estilo, redacción o ubicación.

Cuando una afirmación material no pueda comprobarse, deberá permanecer marcada como pendiente o bloqueada para tratamiento factual.

---

#### 9. Asistencia creativa de IA

La asistencia podrá ayudar a:

- proponer enfoques;
- generar borradores de copy;
- sugerir estructuras;
- resumir un brief;
- adaptar longitud;
- proponer variantes;
- transformar tono dentro de límites aprobados;
- sugerir combinaciones de activos permitidos;
- señalar inconsistencias;
- identificar información faltante;
- comparar alternativas.

La asistencia no podrá adquirir por sí sola autoridad para aprobar, publicar, promocionar, contactar clientes, responder crisis, cambiar maestros ni ejecutar acciones externas.

---

#### 10. Grounding y fuentes

El estudio deberá permitir reconocer qué fuentes sustentan el trabajo actual.

La experiencia podrá mostrar primero referencias esenciales y permitir abrir bajo demanda:

- fuente;
- versión o corte;
- frescura;
- ámbito;
- evidencia;
- conflicto con otra fuente;
- dato pendiente;
- razón de uso.

Las fuentes recuperadas no se copiarán como nuevos maestros de AURA.

---

#### 11. Datos variables y frescura

Precio, disponibilidad, horario, capacidad, beneficio, producto, condición comercial, consentimiento, presupuesto y demás hechos variables permanecerán en su propietario.

El estudio deberá distinguir:

- vigente;
- próximo a vencer;
- vencido;
- no disponible;
- contradictorio;
- fuera del alcance autorizado;
- fallo técnico de recuperación.

Ninguna de esas condiciones se reemplaza silenciosamente por un valor estimado para completar una pieza.

---

#### 12. Contenido externo no confiable

Texto, documento, sitio, comentario, archivo o contenido recuperado desde una fuente externa será tratado como dato de entrada y no como instrucción con autoridad sobre el estudio.

El estudio deberá impedir que contenido externo:

- cambie las restricciones de marca;
- amplíe acceso a herramientas;
- solicite secretos o credenciales;
- cambie el proveedor autorizado;
- suprima guardas;
- autorice publicación;
- altere el alcance del actor;
- redefina el brief;
- convierta una propuesta en aprobación.

La experiencia podrá advertir cuando una fuente incluya instrucciones incompatibles con el contexto gobernado.

---

#### 13. Prompts e instrucciones creativas

Las instrucciones utilizadas para asistencia deberán ser gobernables y trazables sin obligar al usuario a administrar configuración técnica.

La experiencia deberá distinguir entre:

- intención expresada por el usuario;
- brief y reglas de marca;
- instrucciones creativas gobernadas;
- contexto recuperado;
- restricciones del trabajo;
- parámetros técnicos que no deben dominar la experiencia principal.

Una edición libre de texto no deberá permitir desactivar restricciones, inventar autoridad o borrar procedencia.

---

#### 14. Minimización antes de proveedores

Antes de enviar información a un proveedor externo, la experiencia deberá poder identificar qué datos, fragmentos o archivos son necesarios para la finalidad concreta.

No se enviarán por defecto:

- datos personales no necesarios;
- secretos;
- credenciales;
- expedientes completos cuando basta una proyección;
- información de otras marcas o campañas;
- archivos completos cuando basta una representación reducida;
- propiedad intelectual fuera del uso autorizado;
- identificadores internos irrelevantes.

Ver un dato dentro de Vento OS no implica permiso para transferirlo a terceros.

---

#### 15. Transparencia de proveedor y modelo

La superficie principal no deberá llenarse de configuración técnica, pero el usuario autorizado podrá consultar bajo demanda:

- proveedor;
- modelo o versión cuando sea verificable;
- finalidad;
- fuentes utilizadas;
- instrucciones relevantes gobernadas;
- datos o activos enviados;
- resultado;
- advertencias de degradación.

Cambiar proveedor o modelo no podrá presentarse como irrelevante cuando pueda alterar comportamiento material, datos enviados o restricciones.

---

#### 16. Biblioteca de activos dentro del estudio

El estudio podrá consultar activos gobernados sin convertirse en propietario de la biblioteca.

Cada activo visible deberá preservar, cuando corresponda:

- identidad estable;
- original;
- derivados;
- versión;
- propietario funcional;
- derechos;
- autorizaciones;
- vigencia;
- marcas o ámbitos permitidos;
- finalidades;
- restricciones de transformación y reutilización.

Un archivo o URL sin gobierno suficiente no se presentará como activo reutilizable aprobado.

---

#### 17. Guardas de derechos y uso

Antes de incorporar o transformar un activo, la experiencia deberá poder bloquear o advertir por:

- derecho no demostrado;
- licencia vencida;
- autorización de persona ausente o incompatible;
- canal no permitido;
- territorio no permitido;
- modificación no autorizada;
- reutilización fuera de finalidad;
- marca incompatible;
- activo retirado;
- evidencia insuficiente.

La persona usuaria no deberá resolver jurídicamente una condición mediante una simple confirmación visual cuando el contrato exige evidencia o autoridad distinta.

---

#### 18. Original, derivado, variante y nueva versión material

La fábrica deberá distinguir:

```text
ORIGINAL
-> fuente creativa gobernada

DERIVADO
-> representación transformada que conserva procedencia

VARIANTE
-> adaptación con propósito o contexto explícito

NUEVA VERSION MATERIAL
-> cambio que altera contenido, significado, oferta, claim, marca o condición relevante
```

Una variante no se convertirá en nuevo original por exportarse o duplicarse.

Un cambio material no heredará automáticamente la aprobación de la versión previa.

---

#### 19. Fábrica de variantes reutilizables

La fábrica deberá permitir producir familias de variantes desde una propuesta o activo gobernado, preservando una relación explícita con su origen.

Cada variante deberá poder declarar:

- propósito;
- brief de origen;
- marca y versión;
- pieza o activo base;
- dimensión adaptada;
- canal candidato;
- formato;
- audiencia o contexto cuando aplique;
- idioma o locale cuando corresponda;
- restricciones;
- vigencia;
- revisión requerida;
- relación con otras variantes.

Crear múltiples variantes no multiplica autoridad ni aprobación.

---

#### 20. Dimensiones de variante

La experiencia podrá permitir variantes por dimensiones como:

- relación de aspecto;
- duración;
- longitud de copy;
- formato visual;
- idioma o locale autorizado;
- canal candidato;
- audiencia o contexto explícito;
- sede cuando exista variante de marca autorizada;
- CTA;
- plantilla;
- composición;
- tono dentro del rango permitido.

No toda combinación de dimensiones es válida. La fábrica deberá conservar restricciones de marca, derechos, canal, vigencia y negocio.

---

#### 21. Variantes técnicas y variantes materiales

La experiencia deberá distinguir:

```text
VARIANTE TECNICA
-> cambia representación sin alterar significado material
```

```text
VARIANTE MATERIAL
-> cambia copy, claim, oferta, audiencia, CTA, significado, contexto o condición relevante
```

Una variante técnica podrá requerir una revisión menor cuando el alcance aprobado lo permita.

Una variante material deberá volver al nivel de revisión proporcional a lo que cambió.

---

#### 22. Reutilización

El estudio podrá sugerir reutilizar contenido únicamente cuando se pueda demostrar compatibilidad con:

- derechos;
- autorización;
- marca;
- versión;
- vigencia;
- finalidad;
- audiencia o contexto;
- canal previsto;
- hechos materiales actuales;
- restricciones aplicables.

Historial de uso o desempeño favorable no equivale a permiso para reutilizar.

---

#### 23. Plantillas y patrones creativos

Una plantilla o patrón reutilizable deberá representar estructura creativa y no una aprobación permanente de su contenido.

Deberá conservar, cuando corresponda:

- identidad;
- propósito;
- marca o ámbito compatible;
- campos variables;
- elementos bloqueados;
- restricciones;
- versión;
- vigencia;
- activos obligatorios u opcionales;
- reglas de adaptación.

Una plantilla no podrá congelar precio, disponibilidad, claim o condición comercial como si fueran hechos eternos.

---

#### 24. Edición de copy

La experiencia de copy deberá permitir distinguir:

- texto original generado o aportado;
- ediciones humanas;
- sugerencias asistidas;
- hechos respaldados;
- claims;
- placeholders pendientes;
- restricciones aplicables.

Una edición que elimina una advertencia o fuente no elimina la obligación contractual que la originó.

---

#### 25. Trabajo visual y multimedia

Cuando el entregable incluya imagen, video, audio o documento, el estudio deberá conservar relación entre:

- pieza;
- activos fuente;
- transformaciones;
- versión;
- derechos;
- subtítulos, copy o audio asociados;
- dimensiones o formato;
- restricciones;
- variante resultante.

La experiencia no deberá presentar una transformación generativa como si fuera el original aportado.

---

#### 26. Consistencia multimodal

Texto, imagen, audio, CTA y metadatos deberán revisarse como una pieza coherente.

Como mínimo se deberán detectar contradicciones materiales entre:

- copy y activo visual;
- claim y evidencia;
- producto mencionado y producto mostrado;
- oferta y condición comercial;
- fecha y vigencia;
- CTA y destino;
- marca y variante aplicada.

Corregir una modalidad no deberá dejar silenciosamente otra en una versión incompatible.

---

#### 27. Versionado creativo

Cada propuesta deberá conservar identidad y versión.

Una versión nueva deberá poder registrar:

- versión anterior;
- actor;
- origen del cambio;
- cambios materiales;
- fuentes o activos añadidos o retirados;
- resultado de asistencia cuando corresponda;
- motivo;
- estado editorial.

Guardar no equivale a aprobar.

---

#### 28. Comparación entre versiones

La experiencia deberá permitir comparar versiones priorizando cambios relevantes en:

- copy;
- claims;
- activos;
- CTA;
- audiencia o contexto;
- marca;
- derechos;
- fuentes;
- restricciones;
- vigencia.

Una comparación deberá evitar que cambios materiales queden ocultos entre ajustes puramente visuales o mecánicos.

---

#### 29. Borradores y recuperación

La experiencia deberá poder distinguir al menos:

- borrador guardado;
- cambios no guardados;
- versión recuperada;
- conflicto de edición;
- autosave o persistencia pendiente cuando exista implementación futura;
- fallo de proveedor de IA;
- fallo al recuperar una fuente;
- fallo al obtener un activo.

Un error técnico no deberá convertir una versión anterior en la versión actual por inferencia.

---

#### 30. Edición concurrente

Cuando dos actores trabajen sobre el mismo expediente, la experiencia futura deberá evitar sobrescritura silenciosa.

Ante conflicto deberá ser posible reconocer:

- base común;
- versión local;
- versión remota;
- actor;
- momento;
- diferencias materiales;
- opciones de resolución autorizadas.

Esta tarea define la experiencia y no prescribe todavía un mecanismo físico de concurrencia.

---

#### 31. Preparación para revisión

Antes de enviar una versión a revisión, el estudio deberá mostrar un resumen de preparación que permita comprobar, según corresponda:

- brief y objetivo;
- marca y versión;
- restricciones;
- claims y fuentes;
- activos y derechos;
- hechos variables y frescura;
- variantes incluidas;
- CTA y destinos;
- información pendiente;
- cambios materiales desde la última revisión;
- responsable de la propuesta.

Si falta una guarda material, la versión no deberá presentarse como lista para revisión.

---

#### 32. Integración con `VPROC-0056`

El estudio se inserta principalmente en:

```text
BRIEF_UNDER_REVIEW
-> IN_CREATION
-> UNDER_REVIEW
-> PENDING_APPROVAL
```

La frontera es:

```text
IN_CREATION
-> crear y editar propuestas

UNDER_REVIEW
-> revisión editorial o especializada

PENDING_APPROVAL
-> versión concreta preparada para decisión de aprobación
```

El estudio no redefine estos estados ni permite saltarlos por usar IA.

---

#### 33. Revisión humana

Toda salida asistida deberá permanecer sujeta a revisión humana antes de aprobación empresarial.

La revisión deberá poder mostrar:

- qué parte fue generada o transformada;
- qué parte fue editada por personas;
- fuentes materiales;
- hechos pendientes;
- restricciones aplicadas;
- activos y derechos;
- cambios desde la versión anterior;
- versión exacta sometida a revisión.

Un revisor puede corregir, devolver o rechazar. Revisar no equivale a aprobar.

---

#### 34. Frontera de autorización

La interfaz deberá separar capacidad de:

```text
VER
CREAR
EDITAR
GENERAR
TRANSFORMAR
REVISAR
SOMETER A APROBACION
APROBAR
PROGRAMAR
PUBLICAR
RETIRAR
```

El hecho de poder crear o generar contenido no concede las capacidades posteriores.

Las transiciones sensibles consumen la autorización propietaria de `AURA-AUTH-002` y demás controles aplicables.

---

#### 35. Estados de IA y degradación

El estudio deberá distinguir, cuando exista asistencia:

- disponible;
- procesando;
- resultado parcial;
- resultado completo;
- cancelado;
- limitado;
- timeout;
- proveedor no disponible;
- respuesta inválida;
- fuente faltante;
- contexto insuficiente;
- bloqueado por política o autorización.

Un fallo técnico no deberá presentarse como rechazo editorial ni un resultado parcial como pieza completa.

---

#### 36. Reintentos y resultados múltiples

Un reintento de generación deberá conservar relación con la solicitud original y no sobrescribir silenciosamente salidas anteriores.

La experiencia deberá permitir comparar resultados alternativos sin perder:

- versión;
- proveedor/modelo cuando aplique;
- contexto;
- fuentes;
- restricciones;
- actor;
- momento;
- decisión humana posterior.

Elegir una alternativa la convierte en propuesta seleccionada, no en contenido aprobado.

---

#### 37. Accesibilidad y operación por teclado

Las operaciones esenciales del estudio deberán poder comprenderse y ejecutarse sin depender exclusivamente de drag-and-drop, color, hover o gestos de precisión.

Como mínimo deberán existir alternativas accesibles para:

- seleccionar versión;
- navegar variantes;
- comparar;
- abrir fuentes;
- reconocer bloqueos;
- enviar a revisión;
- descartar una propuesta;
- volver al brief.

Los estados deben contar con texto o semántica equivalente además de representación visual.

---

#### 38. Navegación y preservación de contexto

Al navegar entre brief, estudio, biblioteca y revisión deberá preservarse:

- empresa y marca;
- brief;
- pieza o variante actual;
- versión;
- razón de navegación;
- estado editorial;
- filtros relevantes que no impliquen autoridad.

Volver al brief no deberá perder el trabajo actual ni cambiar silenciosamente de marca o versión.

---

#### 39. Handoff a `AURA-UX-004`

`AURA-UX-003` entrega a `AURA-UX-004` únicamente versiones suficientemente preparadas para revisión y aprobación, conservando:

- brief y objetivo;
- marca y versión;
- pieza y versión exacta;
- variantes incluidas;
- fuentes y frescura relevantes;
- assets y derechos;
- claims;
- cambios materiales;
- revisión humana realizada cuando corresponda;
- estado editorial;
- bloqueos o condiciones todavía vigentes;
- canales candidatos sin asumir publicación;
- trazabilidad de asistencia cuando aplique.

`AURA-UX-004` deberá diseñar aprobación y publicación multicanal sin redefinir el estudio creativo, grounding, biblioteca de activos ni fábrica de variantes.

---

#### 40. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- grounding, asistencia de IA, fuentes, revisión humana, minimización, límites de autonomía, activos, derechos, versionado y estados editoriales ya están protegidos por cobertura vigente de AURA, autorización e integración;
- esta tarea desarrolla la arquitectura de experiencia de contratos ya aprobados sin introducir una obligación protegida nueva;
- no modifica texto, estado, relación, propietario, paquete, ambiente ni evidencia de ninguna fila del registro canónico.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 41. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza:

- `TREQ-AURA-001`, para marcas, contenido, activos, versiones, vigencias, propietarios y separación entre pieza, publicación y promoción;
- `TREQ-AURA-002`, para contexto versionado, fuentes autorizadas, hecho/inferencia/propuesta, proveedor/modelo, minimización de datos, trazabilidad y límites de autonomía de IA;
- `TREQ-AURA-011`, para creación gobernada de contenido sin publicación accidental;
- `TREQ-AURA-012`, para actualización con preservación de identidad, versión, concurrencia y auditoría;
- `TREQ-AURA-018`, para carga y tratamiento seguro de media con validación de archivo, derechos y alcance;
- `TREQ-AURA-019`, para separar borrador, revisión, aprobación, programación, publicación, retiro y archivo;
- `TREQ-AURA-026`, para auditoría, observabilidad y reconciliación editorial;
- `TREQ-AUTH-018`, para minimización, finalidad, sensibilidad y límites sobre datos personales;
- `TREQ-INTEGRATION-019`, para contratos versionados con proveedores externos, correlación, payload, estado y conciliación de datos excesivos o credenciales.

Esta enumeración constituye trazabilidad de cobertura vigente y no crea ni modifica requisitos.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado dentro del checkout del usuario |
| REMOTA | PASS | se verificaron continuidad, topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, archivo propietario, `AURA-DOM-003`, `AURA-DOM-004`, fronteras de `AURA-AUTH-002` y `AURA-AUTH-004`, brechas de `CAP-SCOPE-014`, `VPROC-0056`, cobertura 04A de AURA/AUTH/INTEGRATION, `package.json` y validadores documentales vigentes; además se consumió el handoff completo aprobado de `AURA-UX-002` disponible para trabajo adelantado |
| OPERATIVA | NOT_APPLICABLE | la tarea diseña experiencia documental; no genera contenido empresarial real, no usa proveedores, no transforma activos reales y no ejecuta publicación ni contacto |
| FÍSICA | NOT_APPLICABLE | la familia `AURA-UX-001` a `AURA-UX-008` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, rutas, componentes, datos, proveedores, integraciones ni despliegues |

La validación remota demuestra consistencia documental del artefacto con las fuentes consultadas. La validación real del repositorio permanece pendiente hasta incorporar el archivo en su rama documental y ejecutar los validadores canónicos.

---

#### 43. Criterios de aceptación

`AURA-UX-003` queda satisfecha cuando simultáneamente:

1. el estudio parte de brief, marca y versión identificables;
2. el usuario puede distinguir hecho, inferencia y propuesta;
3. la asistencia de IA permanece subordinada a fuentes, restricciones y revisión humana;
4. los datos variables no se inventan ni se congelan como maestros de AURA;
5. contenido externo no confiable no adquiere autoridad sobre instrucciones, permisos o herramientas;
6. prompts e instrucciones creativas permanecen gobernables sin saturar la experiencia con configuración técnica;
7. la minimización de datos ocurre antes de cualquier proveedor externo;
8. proveedor y modelo pueden consultarse bajo demanda sin convertirse en el centro de la experiencia;
9. los activos conservan identidad, original, derivados, versión, derechos, vigencia y restricciones;
10. original, derivado, variante y nueva versión material permanecen separados;
11. cada variante conserva origen, propósito, dimensión adaptada, restricciones y estado;
12. variantes técnicas y materiales tienen tratamiento de revisión proporcional;
13. reutilización exige compatibilidad vigente de derechos, marca, finalidad, canal y hechos materiales;
14. plantillas y patrones no congelan claims o hechos variables como verdades permanentes;
15. copy, imagen, audio, CTA y metadatos pueden revisarse como pieza coherente;
16. el versionado preserva historia y no sobrescribe silenciosamente trabajo aprobado o revisado;
17. los conflictos de edición no se resuelven mediante pérdida silenciosa de una versión;
18. antes de revisión existe un resumen de preparación con bloqueos y cambios materiales;
19. `VPROC-0056` conserva `IN_CREATION`, `UNDER_REVIEW`, `PENDING_APPROVAL` y demás estados canónicos;
20. revisar no equivale a aprobar;
21. crear, editar, generar, revisar, aprobar, programar y publicar permanecen capacidades distintas;
22. fallo de proveedor, resultado parcial y bloqueo de política permanecen estados distintos;
23. los reintentos de generación conservan versiones y resultados anteriores;
24. la experiencia esencial no depende exclusivamente de drag-and-drop, color, hover o gestos finos;
25. la navegación conserva contexto sin fabricar autoridad;
26. `AURA-UX-004` recibe una versión preparada para decisión sin absorber el estudio creativo;
27. se crean y modifican cero requisitos de prueba;
28. no se crea ninguna instancia física;
29. la continuidad queda reservada exclusivamente a `AURA-UX-004`.

---

#### 44. Límites

Esta tarea no autoriza ni ejecuta:

- crear repositorio, runtime, ruta, pantalla, componente o prototipo ejecutable de AURA;
- seleccionar framework, editor, canvas, librería gráfica o proveedor de IA;
- crear cuentas, API keys, tokens, secretos o credenciales;
- enviar prompts, datos o archivos reales a terceros;
- crear tablas, migraciones, vistas, funciones, RPC, triggers, RLS, Storage, Realtime, embeddings, índices vectoriales, jobs o Edge Functions;
- generar, editar o transformar piezas reales;
- cargar o migrar activos reales;
- cambiar derechos, licencias o autorizaciones;
- crear memoria persistente o catálogo físico de prompts;
- entrenar o ajustar modelos con datos de Vento;
- crear briefs, campañas, audiencias, promociones o presupuestos productivos;
- aprobar contenido;
- programar, publicar, retirar o reconciliar contenido externo;
- contactar clientes o audiencias;
- modificar producto, precio, disponibilidad, inventario, venta, cliente, consentimiento, costo o margen;
- redefinir permisos, roles o capacidades;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-UX-004`.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-002 — Diseñar sistema de marca, brief guiado y calendario visual`

**TAREA ACTUAL APROBADA**
`AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros`

### ✅ AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables
**Tarea siguiente:** AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas
**Tipo de tarea:** documental; diseño canónico de la experiencia de aprobación, programación, publicación multicanal, seguimiento por target, recuperación, retiro y reconciliación de AURA, preservando segregación de funciones, versionado, autorización y estados técnicos diferenciados sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, tablas, migraciones, RLS, funciones, RPC, Storage, jobs, colas, webhooks, integraciones, cuentas, credenciales, publicaciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la experiencia con la que AURA deberá permitir revisar una versión preparada, emitir una decisión de aprobación, definir targets multicanal, programar o ejecutar una publicación autorizada, comprender el estado independiente de cada target y recuperar fallos o resultados ambiguos sin perder trazabilidad ni producir efectos duplicados.

La regla raíz de experiencia es:

```text
VERSION PREPARADA
-> REVISION
-> APROBACION
-> TARGETS DE PUBLICACION
-> PROGRAMACION O EJECUCION
-> ESTADO POR TARGET
-> RECONCILIACION
-> RECUPERACION O RETIRO
```

pero conserva:

```text
REVISAR
!= APROBAR
!= PROGRAMAR
!= PUBLICAR
!= CONFIRMAR EXTERNAMENTE
!= RETIRAR
```

La experiencia no deberá reducir un ciclo distribuido y parcialmente incierto a un único booleano de publicación.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-UX-003`, para recibir versiones suficientemente preparadas con brief, marca, versión, pieza, variantes, fuentes, activos, derechos, claims, cambios materiales, revisión humana, estado editorial, bloqueos, canales candidatos y trazabilidad de asistencia;
- `AURA-DOM-005`, para cuenta empresarial, endpoint, publicación, target, programación, intento, idempotencia, resultado ambiguo, reintento, retiro y reconciliación por canal;
- `AURA-AUTH-002`, para separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública, exigir segregación de funciones y revalidar autoridad inmediatamente antes del efecto;
- `AURA-AUTH-001`, para empresa, marca, función, capacidad, recurso y contexto;
- `AURA-AUTH-004`, para mantener credenciales, tokens, secretos y principales técnicos fuera de la autoridad empresarial visible en la experiencia;
- `VPROC-0056`, para preservar el ciclo canónico desde creación hasta revisión, aprobación, programación, publicación, evaluación y cierre;
- `CAP-SCOPE-014`, para publicación multicanal gobernada, idempotencia, conciliación, estados claros y ausencia de publicación accidental;
- `OPS-CAN-001`, para familias de canal, endpoints, propiedad, seguridad y continuidad;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

La tarea no redefine el estudio creativo, grounding, biblioteca de activos, fábrica de variantes, seguridad de secretos ni integración técnica con proveedores.

---

#### 3. Resultado canónico

AURA deberá ofrecer una experiencia que permita responder, para una versión concreta:

```text
¿QUE VERSION ESTOY REVISANDO?
¿QUE CAMBIO DESDE LA VERSION ANTERIOR?
¿QUIEN PUEDE APROBARLA Y QUE BLOQUEOS EXISTEN?
¿PARA QUE TARGETS SE PRETENDE PUBLICAR?
¿QUE TARGETS ESTAN LISTOS, BLOQUEADOS, PROGRAMADOS O EN EJECUCION?
¿QUE PASO REALMENTE EN CADA CANAL?
¿QUE REQUIERE REINTENTO, RECONCILIACION, INTERVENCION O RETIRO?
```

La experiencia se divide en cinco espacios conceptuales conectados:

1. bandeja y detalle de aprobación;
2. configuración de targets de publicación;
3. programación y confirmación de acción;
4. monitor de estado por target;
5. recuperación, reconciliación y retiro.

---

#### 4. Principios de experiencia

La experiencia se rige por:

1. **versión exacta antes que decisión:** nunca se aprueba una pieza abstracta sin identificar la versión;
2. **autoridad antes que acción:** una acción visible no implica que el actor pueda ejecutarla;
3. **target antes que publicación genérica:** cada canal conserva estado propio;
4. **estado externo antes que optimismo:** la UI no declara éxito sin evidencia suficiente;
5. **ambigüedad visible:** timeout, respuesta parcial o confirmación incompleta no se degradan a fallo o éxito inventados;
6. **recuperación antes que repetición:** un reintento solo aparece cuando la situación es reconciliada o clasificada como segura para repetir;
7. **segregación comprensible:** la interfaz explica por qué una persona puede revisar pero no aprobar, o aprobar pero no publicar;
8. **evidencia bajo demanda:** historial, actor, intentos, referencias externas y diagnóstico permanecen accesibles;
9. **fail-closed en acciones críticas:** falta de autorización, versión, vigencia o correlación bloquea el efecto;
10. **simplicidad sin colapsar estados:** la interfaz resume, pero no fusiona conceptos materialmente distintos.

---

#### 5. Entrada desde AURA-UX-003

La 004 recibe únicamente una versión preparada para decisión.

La entrada deberá conservar:

- brief y objetivo;
- marca y versión;
- pieza y versión exacta;
- variantes incluidas;
- fuentes y frescura relevantes;
- activos y derechos;
- claims;
- cambios materiales;
- revisión humana realizada cuando corresponda;
- estado editorial;
- bloqueos o condiciones todavía vigentes;
- canales candidatos;
- trazabilidad de asistencia cuando aplique.

Si la versión deja de coincidir con la entregada por la 003, la experiencia deberá invalidar cualquier decisión que dependiera de la versión anterior.

---

#### 6. Bandeja de aprobación

La bandeja de aprobación deberá priorizar decisiones reales pendientes y no una lista genérica de contenido.

Cada elemento deberá mostrar como mínimo:

- pieza o iniciativa;
- marca;
- versión;
- tipo de decisión pendiente;
- actor o función que preparó la versión cuando sea material;
- revisión previa requerida y su estado;
- bloqueos materiales;
- vigencia relevante;
- targets previstos;
- fecha o ventana cuando exista;
- razón por la que requiere decisión ahora.

La bandeja no deberá exponer objetos fuera del alcance autorizado ni derivar permisos a partir del nombre del rol.

---

#### 7. Filtros de la bandeja

La bandeja podrá filtrar por:

- marca;
- estado;
- tipo de contenido;
- responsable;
- fecha o vencimiento;
- canal candidato;
- bloqueo;
- decisión requerida.

Los filtros reorganizan el conjunto autorizado y nunca amplían autorización.

Un filtro sin resultados deberá distinguirse de falta de autorización, fallo técnico o ausencia real de pendientes.

---

#### 8. Detalle de aprobación

El detalle deberá permitir revisar la versión exacta sin reconstruir el contexto recorriendo múltiples superficies.

Como mínimo presentará:

1. brief y objetivo;
2. marca y versión;
3. preview de la pieza o composición;
4. cambios materiales respecto de la versión relevante anterior;
5. claims y hechos variables;
6. activos y derechos;
7. fuentes y frescura;
8. revisión humana previa;
9. bloqueos y guardas;
10. targets candidatos;
11. vigencias;
12. historial de decisión cuando exista.

La información técnica profunda permanecerá bajo demanda.

---

#### 9. Comparación de versiones

La aprobación deberá poder comparar la versión actual con aquella que fue revisada o aprobada previamente cuando exista.

La comparación priorizará cambios en:

- copy;
- claim;
- oferta o hecho variable;
- CTA;
- enlace;
- activo;
- audiencia o contexto;
- marca;
- restricción;
- derecho;
- target previsto;
- vigencia.

Un cambio material deberá impedir que una aprobación antigua se presente como todavía aplicable por defecto.

---

#### 10. Resultado de revisión

La experiencia distinguirá al menos:

```text
PENDIENTE DE REVISION
REQUIERE CAMBIOS
REVISION FAVORABLE
PENDIENTE DE APROBACION
APROBADO
RECHAZADO
```

Estos estados de experiencia no sustituyen los estados canónicos de `VPROC-0056`; deberán mapearse sin crear un namespace competidor.

Una revisión favorable no equivale a aprobación final.

---

#### 11. Acción de aprobación

La acción de aprobar deberá mostrar explícitamente:

- versión exacta;
- objetivo de la aprobación;
- alcance de la decisión;
- guardas todavía vigentes;
- targets cubiertos cuando el alcance lo incluya;
- vigencia o condiciones de reutilización cuando existan;
- actor que emite la decisión.

La experiencia no podrá ofrecer una aprobación silenciosa mediante cambio de color, toggle genérico o guardado automático.

---

#### 12. Segregación de funciones visible

Cuando una acción esté denegada por segregación de funciones, la experiencia deberá explicar la razón sin exponer información sensible innecesaria.

Ejemplos:

```text
CREASTE ESTA VERSION
-> PUEDES CORREGIRLA
-> NO PUEDES EMITIR LA APROBACION FINAL DE LA MISMA DECISION CRITICA
```

```text
APROBASTE LA VERSION
-> LA APROBACION NO CONCEDE PUBLICACION POR SI SOLA
```

```text
PUEDES PUBLICAR
-> LA CAPACIDAD NO CONCEDE ACCESO A CREDENCIALES
```

La UI no resolverá conflictos de segregación habilitando manualmente botones ocultos.

---

#### 13. Denegaciones y bloqueos

Las acciones deberán mostrar bloqueo explícito ante, entre otros:

- capacidad ausente;
- recurso fuera de empresa o marca;
- versión no aprobada;
- aprobación vencida o invalidada;
- conflicto de segregación;
- cuenta o endpoint no apto;
- derechos vencidos;
- dato material vencido;
- CTA o destino inválido;
- estado incompatible;
- servicio de autorización no disponible;
- correlación insuficiente;
- target sin capacidad requerida.

Una denegación no se representará como error técnico genérico cuando la causa sea de autoridad o estado.

---

#### 14. Definición de targets multicanal

Una versión aprobada podrá tener varios targets independientes.

La experiencia deberá representar:

```text
VERSION APROBADA
  -> TARGET A
  -> TARGET B
  -> TARGET C
```

Cada target conserva su propio:

- familia de canal;
- endpoint;
- cuenta empresarial cuando aplique;
- formato o variante;
- audiencia o contexto;
- locale;
- zona horaria;
- fecha prevista;
- vigencia;
- autorización;
- estado;
- intentos;
- referencia externa;
- retiro y reconciliación.

El éxito de un target no cambia el estado de los demás.

---

#### 15. Selector de endpoint

El selector deberá mostrar únicamente endpoints autorizados y aptos para el contexto.

Deberá distinguir:

```text
FAMILIA DE CANAL
!= CUENTA
!= ENDPOINT
!= CREDENCIAL
```

La experiencia podrá mostrar estado de aptitud, marca, ámbito, capacidades relevantes y última verificación necesaria para decidir.

No mostrará secretos ni permitirá inferirlos.

---

#### 16. Compatibilidad por target

Antes de permitir programación o publicación, la experiencia deberá comprobar y mostrar compatibilidad entre:

- variante y formato;
- canal;
- dimensiones o restricciones técnicas relevantes;
- locale;
- vigencia;
- CTA y destino;
- derechos;
- audiencia o finalidad;
- capacidad soportada por el endpoint.

Una incompatibilidad técnica no deberá disfrazarse como falta de aprobación ni viceversa.

---

#### 17. Preview multicanal

La experiencia podrá presentar previews por target para ayudar a revisar cómo se materializará la misma intención en canales distintos.

El preview deberá indicar:

- qué variante usa;
- qué información es simulada;
- qué elementos dependen de la plataforma real;
- qué CTA y destino se esperan;
- qué restricciones podrían alterar el resultado final.

Un preview nunca constituye evidencia de publicación real.

---

#### 18. Integridad de enlaces y CTA

Antes de aprobar un target publicable, la experiencia deberá hacer visible la validación del destino cuando exista URL, CTA, canonical o redirección.

Deberán bloquearse o marcarse como incompatibles, según el contrato propietario:

- destinos inexistentes;
- `#` utilizado como sustituto de acción real;
- destinos retirados;
- ciclos;
- esquemas inseguros;
- redirecciones inesperadas;
- rutas que no representan la acción anunciada.

La experiencia no corrige por inferencia un destino materialmente incorrecto.

---

#### 19. Programación

Programar deberá ser una acción distinta de aprobar.

La superficie deberá solicitar o confirmar, cuando corresponda:

- target exacto;
- versión aprobada;
- fecha y hora;
- zona horaria;
- ventana de vigencia;
- locale;
- audiencia o contexto;
- política de contingencia;
- guardas pendientes que deben revalidarse al ejecutar.

Una fecha textual sin zona horaria explícita no deberá presentarse como programación ejecutable.

---

#### 20. Revalidación antes del efecto

La experiencia deberá comunicar que una publicación programada puede bloquearse posteriormente si pierde una condición necesaria.

Ejemplos:

- aprobación invalidada;
- versión sustituida;
- derecho vencido;
- oferta vencida;
- CTA retirado;
- endpoint no apto;
- permiso revocado;
- dato material desactualizado.

La programación no congela indefinidamente autoridad ni hechos dinámicos.

---

#### 21. Cambio material después de aprobación

Si una versión cambia materialmente después de aprobación, la experiencia deberá:

1. identificar la aprobación afectada;
2. marcar targets dependientes;
3. bloquear nuevas ejecuciones de la versión modificada;
4. conservar publicaciones históricas ya confirmadas;
5. devolver la nueva versión al punto de revisión o aprobación correspondiente;
6. evitar que un target programado cambie silenciosamente de contenido.

Una edición posterior no muta el payload de una publicación ya autorizada sin nueva decisión.

---

#### 22. Monitor de publicación

La experiencia deberá mostrar estado por target y no únicamente por pieza.

Estados técnicos mínimos visibles o representables:

```text
PLANNED
SCHEDULED
QUEUED
DISPATCHING
PUBLISHED_CONFIRMED
PUBLISHED_UNCONFIRMED
FAILED_RETRYABLE
FAILED_FINAL
CANCELLED_BEFORE_DISPATCH
RETIREMENT_PENDING
RETIRED_CONFIRMED
RECONCILIATION_REQUIRED
```

La representación visual podrá simplificar nombres para el usuario, pero no fusionar significados incompatibles.

---

#### 23. Estado agregado de una publicación multicanal

Cuando una pieza tenga varios targets, el estado agregado deberá ser una proyección explicable del conjunto y nunca ocultar fallos parciales.

Ejemplos conceptuales:

```text
3 DE 4 TARGETS CONFIRMADOS
1 TARGET REQUIERE RECONCILIACION
```

```text
PUBLICACION PARCIAL
```

```text
RETIRO PARCIAL
```

La UI deberá permitir abrir inmediatamente el target divergente.

---

#### 24. Resultado ambiguo

La experiencia deberá tratar explícitamente la incertidumbre.

Regla obligatoria:

```text
REQUEST ENVIADO
+ TIMEOUT O RESPUESTA AMBIGUA
-> PUBLISHED_UNCONFIRMED O RECONCILIATION_REQUIRED
-> RECONCILIAR
-> SOLO DESPUES DECIDIR REINTENTO
```

La interfaz no ofrecerá un botón principal de `Reintentar` cuando todavía exista posibilidad razonable de que el primer efecto se haya producido.

---

#### 25. Vista de intentos

Cada target deberá poder mostrar historial de intentos sin saturar la vista principal.

El detalle incluirá, cuando corresponda:

- operación;
- número de intento;
- momento;
- resultado clasificado;
- referencia técnica no secreta;
- error o diagnóstico;
- evidencia de confirmación;
- correlación con el target;
- condición de reintento;
- estado de reconciliación.

Los intentos anteriores no se sobrescriben cuando existe un reintento.

---

#### 26. Reintento seguro

Un reintento deberá aparecer como acción solo si:

- el fallo es clasificable como reintentable;
- no existe resultado ambiguo sin reconciliar;
- la versión sigue vigente;
- la autorización sigue vigente;
- la ventana temporal sigue abierta;
- el endpoint continúa apto;
- la operación conserva identidad idempotente;
- ninguna condición material cambió.

Un reintento no es una nueva publicación empresarial cuando representa la misma intención.

---

#### 27. Recuperación guiada

La experiencia deberá ofrecer rutas de recuperación distintas según causa.

Ejemplos:

| Situación | Acción principal de experiencia |
| --- | --- |
| autenticación o permiso revocado | bloquear ejecución y derivar a custodia/autorización |
| rate limit | mostrar espera/reintento gobernado |
| validación de formato | volver a corregir variante o target |
| timeout ambiguo | reconciliar antes de repetir |
| rechazo de política de plataforma | revisión humana |
| endpoint inexistente | corregir configuración gobernada |
| CTA inválido | volver al owner del destino o pieza |
| aprobación invalidada | volver a aprobación |
| ventana vencida | reprogramar únicamente si las demás guardas siguen válidas |

La experiencia no deberá usar un único mensaje `Falló la publicación` para todas estas condiciones.

---

#### 28. Reconciliación

La superficie de reconciliación deberá permitir comparar:

```text
ESTADO INTERNO ESPERADO
VS
ESTADO EXTERNO OBSERVADO
```

Deberá responder:

- qué se esperaba;
- qué se observó;
- cuándo se observó;
- qué identificador externo existe;
- qué evidencia falta;
- si existe una acción segura;
- si debe escalarse a intervención humana.

La reconciliación no convierte automáticamente al canal externo en fuente maestra empresarial.

---

#### 29. Retiro

Retirar deberá ser una acción distinta de eliminar evidencia.

La experiencia deberá mostrar:

- publicación o target exacto;
- motivo;
- autoridad requerida;
- estado externo conocido;
- efecto esperado;
- dependencia de confirmación externa;
- conservación del historial.

Se distingue:

```text
RETIRO SOLICITADO
!= RETIRO EXTERNO CONFIRMADO
```

---

#### 30. Retiro parcial multicanal

Una orden de retiro sobre varios targets deberá permitir ver el estado independiente de cada uno.

La experiencia no mostrará `Retirado` a nivel global mientras exista un target aún visible, ambiguo o pendiente de confirmación.

Un retiro fallido o parcial deberá entrar a recuperación y reconciliación sin borrar la publicación histórica.

---

#### 31. Cancelación antes del despacho

La cancelación de una programación antes de producir efecto externo deberá diferenciarse del retiro de una publicación ya producida.

La experiencia deberá mostrar si la operación fue:

- cancelada antes de cola;
- cancelada antes de despacho;
- imposible de cancelar porque el proveedor ya recibió el intento;
- transformada en retiro porque el efecto externo ya existe o puede existir.

No se tratará una cancelación tardía como garantía de ausencia de efecto sin evidencia.

---

#### 32. Auditoría y timeline

Cada publicación deberá disponer de un timeline capaz de reconstruir:

- creación o preparación de la versión;
- revisión;
- aprobación;
- definición de targets;
- programación;
- cambios de horario;
- intentos;
- confirmaciones;
- fallos;
- reconciliaciones;
- reintentos;
- retiros;
- actores empresariales;
- principales técnicos cuando aplique.

La experiencia distinguirá decisión empresarial, ejecución técnica y confirmación externa.

---

#### 33. Responsabilidad y siguiente acción

Para cada estado no terminal la UI deberá mostrar quién o qué owner debe intervenir a continuación, sin convertir esa asignación en autorización.

Ejemplos:

- creador corrige contenido;
- revisor confirma cambios;
- aprobador decide;
- operador autorizado programa;
- custodia resuelve cuenta o permiso;
- integración reconcilia estado externo;
- responsable editorial decide ante rechazo de plataforma.

Los pendientes no deberán quedar como errores narrativos sin propietario funcional.

---

#### 34. Notificaciones

Las notificaciones derivadas de aprobación o publicación deberán ser informativas y accionables, pero no ejecutar efectos por sí mismas.

Podrán informar, según autorización:

- aprobación requerida;
- aprobación rechazada;
- programación próxima;
- target bloqueado;
- publicación confirmada;
- publicación ambigua;
- fallo final;
- retiro pendiente;
- reconciliación requerida.

Una notificación nunca sustituye la revalidación al abrir la acción protegida.

---

#### 35. Estados vacíos, parciales y de error

La experiencia deberá diferenciar:

- no existen pendientes;
- el filtro no devuelve resultados;
- el actor no tiene acceso;
- carga en curso;
- respuesta parcial;
- fallo técnico;
- datos desactualizados;
- estado externo no disponible;
- reconciliación pendiente;
- canal temporalmente no apto.

Una pantalla sin publicaciones confirmadas no demuestra que no existan intentos o efectos ambiguos.

---

#### 36. Accesibilidad y seguridad de interacción

La experiencia deberá conservar:

- navegación completa por teclado;
- foco visible;
- nombres accesibles;
- estados no dependientes solo de color;
- alternativa a hover;
- confirmación explícita de acciones críticas;
- diferenciación clara entre acciones destructivas, reversibles y recuperables;
- lectura estable en superficies estrechas;
- mensajes de error asociados a la decisión afectada.

La publicación o retiro no podrán depender únicamente de gestos o interacciones de precisión.

---

#### 37. Relación con AURA-AUTH-002

La 004 consume las autoridades diferenciadas definidas por `AURA-AUTH-002`.

La experiencia no decide quién tiene cada capacidad; únicamente respeta y hace comprensible la decisión autoritativa vigente.

Se preserva:

```text
CREAR != REVISAR != APROBAR != PROGRAMAR != PUBLICAR != RETIRAR
```

Un principal técnico podrá ejecutar una transición ya autorizada, pero no aparecer como aprobador empresarial por poseer una credencial o service role.

---

#### 38. Relación con AURA-DOM-005

`AURA-DOM-005` conserva ownership del contrato de cuenta, endpoint, target, publicación, intento, idempotencia, estados técnicos, reconciliación y retiro.

`AURA-UX-004` únicamente diseña cómo esos conceptos se entienden y operan de forma segura por una persona autorizada.

La UI no crea un segundo estado de publicación ni sustituye el estado reconciliado del dominio.

---

#### 39. Relación con AURA-UX-003

La 004 no absorbe:

- canvas o editor creativo;
- grounding;
- memoria de IA;
- generación;
- variantes;
- activos y derechos en detalle;
- prompts creativos.

Cuando una decisión requiera corregir contenido, la navegación regresará a la superficie propietaria de creación preservando versión, motivo y contexto.

---

#### 40. Handoff a `AURA-UX-005`

`AURA-UX-004` entrega a `AURA-UX-005` una experiencia ya capaz de distinguir:

- versión aprobada;
- aprobación vigente;
- targets;
- programación;
- publicación confirmada o ambigua;
- fallos y recuperación;
- retiro;
- historial por canal;
- autoridad y segregación;
- estado parcial multicanal;
- correlación con la pieza y el canal.

`AURA-UX-005` deberá diseñar campañas, promociones, cupones, experimentos y guardas sin redefinir aprobación editorial, publicación, reintentos, retiro o reconciliación por canal.

---

#### 41. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- identidad, versionado, separación entre aprobación y publicación, retiro lógico, integridad de enlaces, auditoría, autorización e idempotencia ya cuentan con cobertura vigente;
- la publicación multicanal, los resultados ambiguos y la reconciliación ya están protegidos por contratos de dominio, autorización e integración existentes;
- esta tarea desarrolla la arquitectura de experiencia de obligaciones ya aprobadas sin crear una nueva regla protegida;
- no modifica texto, estado, relación, propietario, paquete, ambiente ni evidencia de ninguna fila del registro canónico.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 42. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza:

- `TREQ-AURA-001`, para identidades, versiones, vigencias, estados editoriales y separación entre aprobación y publicación;
- `TREQ-AURA-011`, para impedir publicación accidental al crear contenido;
- `TREQ-AURA-012`, para preservar identidad, versión, concurrencia y referencias al actualizar;
- `TREQ-AURA-013`, para retiro reversible, conservación de evidencia y prohibición de eliminación física como comportamiento canónico;
- `TREQ-AURA-019`, para mantener borrador, revisión, aprobación, programación, publicación, ocultamiento, retiro y archivo como transiciones distintas;
- `TREQ-AURA-025`, para integridad de URL, CTA, canonical, preview y redirecciones;
- `TREQ-AURA-026`, para auditoría, observabilidad y reconciliación de mutaciones editoriales y publicaciones;
- `TREQ-INTEGRATION-019`, para canales, payloads, identificadores externos, idempotencia, eventos tardíos y conciliación;
- `TREQ-AUTH-018`, para mantener finalidad, alcance y protección de datos cuando un target involucre información de clientes.

Esta enumeración constituye trazabilidad de cobertura vigente y no crea ni modifica requisitos.

---

#### 43. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado dentro del checkout del usuario |
| REMOTA | PASS | se verificaron continuidad, topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, archivo propietario, dependencia explícita de `AURA-DOM-005` y `AURA-AUTH-002`, estados de `VPROC-0056`, contratos de autorización AURA, cobertura 04A de AURA/AUTH/INTEGRATION, `package.json` y validadores documentales vigentes; además se consumió el handoff completo aprobado de `AURA-UX-003` disponible para trabajo adelantado |
| OPERATIVA | NOT_APPLICABLE | la tarea diseña experiencia documental; no aprueba, programa, publica, reintenta, retira ni reconcilia contenido real |
| FÍSICA | NOT_APPLICABLE | la familia `AURA-UX-001` a `AURA-UX-008` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, canales, cuentas, credenciales, colas, datos, integraciones ni despliegues |

---

#### 44. Criterios de aceptación

`AURA-UX-004` queda satisfecha cuando simultáneamente:

1. revisión, aprobación, programación, publicación, confirmación externa y retiro permanecen decisiones distintas;
2. la experiencia identifica la versión exacta sometida a decisión;
3. cambios materiales invalidan la reutilización automática de una aprobación previa;
4. la bandeja de aprobación muestra contexto, versión, bloqueos, vigencia y decisión requerida;
5. una revisión favorable no equivale a aprobación final;
6. la segregación de funciones es comprensible y no se deriva de un rol nominal;
7. una aprobación no concede programación ni publicación por sí sola;
8. cada target conserva endpoint, formato, variante, audiencia o contexto, zona horaria, estado, intentos y referencia externa propios;
9. familia de canal, cuenta, endpoint y credencial permanecen separados;
10. el selector no expone secretos ni convierte credenciales en autoridad;
11. preview multicanal no se presenta como publicación real;
12. URL y CTA se validan antes de un target publicable;
13. programación exige versión aprobada, fecha, zona horaria y vigencia compatibles;
14. la programación no congela indefinidamente hechos dinámicos ni autoridad;
15. una edición posterior no muta silenciosamente un target ya programado;
16. los estados técnicos por target conservan los significados definidos por `AURA-DOM-005`;
17. el estado agregado no oculta fallos o divergencias parciales;
18. timeout o resultado ambiguo no se presenta como fallo ni éxito confirmado;
19. un resultado ambiguo se reconcilia antes de ofrecer reintento;
20. los intentos anteriores permanecen trazables;
21. un reintento exige vigencia, autoridad, ventana, endpoint apto e idempotencia;
22. recuperación distingue autenticación, rate limit, validación, timeout, rechazo de plataforma, endpoint, CTA, aprobación y ventana vencida;
23. reconciliación compara estado interno esperado con estado externo observado;
24. retiro solicitado y retiro externo confirmado permanecen separados;
25. el retiro preserva evidencia histórica;
26. cancelación previa al despacho y retiro posterior al efecto permanecen distintos;
27. la auditoría distingue decisión empresarial, ejecución técnica y confirmación externa;
28. cada situación no terminal tiene owner o siguiente acción identificable;
29. notificaciones no ejecutan efectos ni sustituyen revalidación;
30. vacío, falta de autorización, parcialidad, fallo técnico y estado externo no disponible permanecen diferenciados;
31. la experiencia esencial no depende exclusivamente de color, hover o gestos de precisión;
32. `AURA-AUTH-002` conserva ownership de autoridad y segregación;
33. `AURA-DOM-005` conserva ownership del contrato de publicación y reconciliación;
34. `AURA-UX-003` conserva ownership del estudio creativo y variantes;
35. `AURA-UX-005` recibe el handoff de publicación sin redefinirlo;
36. se crean y modifican cero requisitos de prueba;
37. no se crea ninguna instancia física;
38. la continuidad queda reservada exclusivamente a `AURA-UX-005`.

---

#### 45. Límites

Esta tarea no autoriza ni ejecuta:

- crear repositorio, runtime, ruta, pantalla, componente o prototipo ejecutable de AURA;
- crear tablas, migraciones, vistas, funciones, RPC, triggers, RLS, Storage, Realtime, jobs, colas o Edge Functions;
- conectar canales reales;
- crear, modificar o recuperar cuentas reales;
- crear, leer, rotar o revelar credenciales o secretos;
- generar, editar o transformar contenido real;
- aprobar contenido productivo;
- programar publicaciones reales;
- publicar, actualizar, ocultar o retirar contenido externo;
- emitir reintentos reales;
- reconciliar proveedores reales;
- enviar mensajes o contactar audiencias;
- crear campañas, promociones, cupones o experimentos productivos;
- modificar datos de clientes, producto, precio, disponibilidad, venta, costo o margen;
- redefinir roles, capacidades o segregación;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-UX-005`.

---

#### 46. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-003 — Diseñar estudio creativo asistido y fábrica de variantes reutilizables`

**TAREA ACTUAL APROBADA**
`AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas`

### ✅ AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros
**Tarea siguiente:** AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos
**Tipo de tarea:** documental; diseño canónico de la experiencia de campañas, promociones, cupones, experimentos y guardas económicas y operativas de AURA, preservando ownership de PASS, PULSO, NUMERA, NEXO y FOGO y sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, campañas reales, promociones, cupones, beneficios, reglas transaccionales, experimentos activos, audiencias operativas, tablas, migraciones, RLS, funciones, RPC, jobs, colas, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la experiencia con la que AURA deberá convertir una campaña planificada y aprobada en un expediente comprensible de ejecución comercial y experimental, mostrando qué se quiere lograr, qué se va a comunicar, qué promociones o cupones están relacionados, qué experimento aplica, qué guardas habilitan o bloquean el avance y qué dominios propietarios deben confirmar los efectos antes de operar.

La regla raíz es:

```text
CAMPANA AURA
=
INTENCION DE MARKETING
+ HIPOTESIS
+ AUDIENCIA Y EXCLUSIONES
+ PIEZAS Y TARGETS
+ PROMOCION O CUPON CUANDO APLIQUE
+ EXPERIMENTO CUANDO APLIQUE
+ GUARDAS
+ TRAZABILIDAD
```

pero:

```text
CAMPANA
!= PROMOCION
!= CUPON
!= BENEFICIO
!= REGLA TRANSACCIONAL
!= REDENCION
!= DESCUENTO APLICADO
!= VENTA
```

La experiencia facilita decisiones y coordinación. No convierte AURA en autoridad transaccional, económica, de fidelización, inventario o capacidad productiva.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-UX-004`, para recibir versión aprobada, targets, programación, publicación, recuperación, retiro y estado multicanal sin redefinir ese ciclo;
- `AURA-DOM-006`, para campaña, experimento, promoción, cupón, guardas económicas y operativas, correlación y fronteras con otros dominios;
- `AURA-AUTH-003`, para proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas, incluyendo finalidad, minimización, consentimiento, alcance y revalidación;
- `AURA-AUTH-002`, para mantener separadas creación, revisión, aprobación, programación y publicación;
- `AURA-AUTH-001`, para empresa, marca, función, capacidad, recurso y contexto;
- `AURA-DOM-005`, para no redefinir publicación, reintentos, retiro o reconciliación por canal;
- `PASS`, para identidad de cliente, consentimiento, preferencias, beneficios, reglas de fidelización, elegibilidad, redención y ledger;
- `PULSO`, para pedido, venta, condiciones comerciales, validación de aplicabilidad y efecto realmente aplicado;
- `NUMERA`, para presupuesto, costo, margen, rentabilidad y guardas económicas autorizadas;
- `NEXO`, para producto, existencia, disponibilidad e inventario;
- `FOGO`, para capacidad y restricciones productivas;
- `AURA-DOM-008`, para atribución, confianza, incrementalidad y aprendizaje cuantitativo posterior;
- `CAP-SCOPE-014`, especialmente las fronteras de campañas, experimentos, promociones y cupones;
- `VPROC-0056`, para el ciclo canónico de contenido y promociones asociado a una campaña;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

Ninguna de estas fuentes cambia de propietaria por esta tarea.

---

#### 3. Resultado canónico

AURA deberá ofrecer una experiencia que permita responder, para una campaña concreta:

```text
¿QUE OBJETIVO E HIPOTESIS GOBIERNAN ESTA CAMPANA?
¿QUE AUDIENCIA Y EXCLUSIONES APLICAN?
¿QUE PIEZAS Y TARGETS ESTAN VINCULADOS?
¿EXISTE UNA PROMOCION, CUPON O BENEFICIO RELACIONADO?
¿QUE DOMINIO MATERIALIZA LA REGLA REAL?
¿EXISTE UN EXPERIMENTO Y COMO SE ASIGNA?
¿QUE GUARDAS ESTAN VIGENTES, BLOQUEADAS, VENCIDAS O SIN EVIDENCIA?
¿QUE IMPIDE INICIAR, CONTINUAR O AMPLIAR?
¿QUE EFECTOS YA OCURRIDOS DEBEN PRESERVARSE?
```

La experiencia se divide en seis espacios conceptuales conectados:

1. portafolio y detalle de campañas;
2. promoción y cupón relacionados;
3. configuración experimental;
4. panel de guardas;
5. preparación, inicio, pausa, cancelación y seguimiento;
6. historial y correlaciones con publicaciones, redenciones, ventas y resultados.

---

#### 4. Fronteras conceptuales obligatorias

La interfaz deberá preservar explícitamente:

```text
IDEA != CAMPANA != EXPERIMENTO != PIEZA != PUBLICACION
```

```text
PROMOCION != CUPON != BENEFICIO PASS != REGLA TRANSACCIONAL
```

```text
VISIBLE != ELEGIBLE != APLICABLE != APLICADO
```

```text
HIPOTESIS != RESULTADO OBSERVADO != CAUSALIDAD DEMOSTRADA
```

```text
PRESUPUESTO REFERENCIADO != GASTO AUTORIZADO != GASTO REAL
```

```text
STOCK OBSERVADO != STOCK RESERVADO != DISPONIBILIDAD GARANTIZADA
```

```text
CAPACIDAD OBSERVADA != CAPACIDAD COMPROMETIDA
```

```text
PAUSAR CAMPANA != REVERTIR EFECTOS YA CONFIRMADOS
```

La experiencia no podrá colapsar estas diferencias en etiquetas genéricas de activo/inactivo o válido/inválido.

---

#### 5. Arquitectura de experiencia

La experiencia se organiza alrededor de un `campaign_id` estable y una versión identificable.

Desde el portafolio se accede a:

- identidad y objetivo;
- hipótesis;
- audiencia y exclusiones;
- calendario;
- piezas y publicaciones vinculadas;
- promociones, cupones o beneficios referenciados;
- experimentos;
- guardas;
- responsables y aprobaciones;
- correlaciones con ejecución externa;
- historial de decisiones.

Las superficies podrán resumir el estado, pero la decisión material siempre deberá permitir abrir la evidencia propietaria que la soporta.

---

#### 6. Entrada desde AURA-UX-004

La 005 recibe de la 004 una experiencia ya capaz de distinguir:

- versión aprobada;
- aprobación vigente;
- targets;
- programación;
- publicación confirmada o ambigua;
- fallos y recuperación;
- retiro;
- historial por canal;
- autoridad y segregación;
- parcialidad multicanal.

La 005 no modifica esos estados para representar una campaña.

Una campaña podrá correlacionar varias publicaciones, pero:

```text
ESTADO DE CAMPANA
!=
ESTADO TECNICO DE PUBLICACION
```

La caída de un target no se transforma automáticamente en cancelación total de campaña, y una campaña activa no convierte un target fallido en publicado.

---

#### 7. Portafolio de campañas

El portafolio deberá priorizar comprensión operativa y no densidad administrativa.

Cada fila o tarjeta podrá resumir:

- campaña y versión;
- marca;
- objetivo;
- responsable;
- periodo;
- estado de preparación o ejecución;
- guardas materiales;
- experimento cuando exista;
- promoción o cupón relacionado;
- señales de bloqueo;
- próxima decisión requerida.

Filtros y agrupaciones podrán incluir marca, periodo, responsable, objetivo y situación, pero un filtro visual no concede autoridad sobre los recursos mostrados.

---

#### 8. Detalle de campaña

El detalle deberá separar como mínimo:

1. **Resumen:** objetivo, hipótesis, audiencia, vigencia y responsable;
2. **Contenido y canales:** piezas, versiones y targets provenientes del ciclo creativo/publicación;
3. **Oferta:** promociones, cupones o beneficios referenciados;
4. **Experimento:** unidad, tratamientos, control, exclusiones y ventana;
5. **Guardas:** económicas, operativas, de consentimiento, publicación y autorización;
6. **Ejecución:** decisiones de inicio, pausa, cancelación y cierre;
7. **Evidencia:** correlaciones, cambios, actores y resultados observados.

El detalle no deberá obligar al usuario a interpretar tablas técnicas para conocer si existe un bloqueo material.

---

#### 9. Identidad y versionado de campaña

Una campaña conserva identidad estable y versiones materiales.

La experiencia deberá mostrar cuándo una modificación cambia materialmente:

- objetivo;
- hipótesis;
- audiencia;
- oferta;
- promoción;
- cupón;
- experimento;
- guardas;
- periodo;
- presupuesto referenciado;
- piezas o targets relevantes.

Una nueva versión no sobrescribe historial ni reutiliza silenciosamente aprobaciones o guardas evaluadas para una versión anterior.

---

#### 10. Objetivo e hipótesis

La cabecera de campaña deberá hacer visible:

- objetivo empresarial;
- hipótesis;
- indicador o señal que se pretende observar;
- supuestos materiales;
- restricciones conocidas;
- responsable;
- fecha o ventana de evaluación.

La hipótesis se presenta como hipótesis, no como verdad.

La experiencia no deberá convertir métricas preliminares, interacción o correlación en causalidad demostrada. La evaluación cuantitativa final pertenece a `AURA-DOM-008`.

---

#### 11. Audiencia y exclusiones

La campaña deberá mostrar audiencia y exclusiones como referencias gobernadas, no como una lista libre de personas.

La experiencia deberá distinguir:

```text
AUDIENCIA DEFINIDA
!= SEGMENTO MATERIALIZADO
!= MIEMBROS IDENTIFICABLES
!= PERSONAS CONTACTABLES
```

Cuando una acción dependa de identidad, finalidad, consentimiento o preferencia, la interfaz deberá mostrar el resultado vigente proveniente de la fuente propietaria y bloquear el efecto cuando no pueda demostrarse.

La membresía histórica no se presenta como elegibilidad actual.

---

#### 12. Preparación para iniciar

Antes de presentar una campaña como elegible para iniciar, la experiencia deberá componer, sin asumir ownership de los hechos:

```text
PLAN APROBADO
+ CONTENIDO APROBADO
+ TARGETS PUBLICABLES
+ REGLAS MATERIALIZABLES CUANDO APLIQUEN
+ GUARDAS ECONOMICAS RESUELTAS
+ GUARDAS OPERATIVAS RESUELTAS
+ AUTORIZACION VIGENTE
```

Cada término deberá poder abrir su evidencia.

La ausencia, vencimiento o conflicto de una condición material no se degrada a advertencia decorativa cuando el dominio propietario exige bloqueo.

---

#### 13. Espacio de promoción

La promoción relacionada deberá presentarse como intención comercial gobernada.

La experiencia podrá mostrar:

- identidad y versión;
- oferta comunicada;
- alcance;
- vigencia;
- producto, categoría o beneficio referenciados;
- límites y exclusiones;
- compatibilidades;
- regla propietaria relacionada;
- guardas;
- autoridad y aprobación;
- publicaciones correlacionadas;
- criterio de pausa o retiro.

Nunca deberá insinuar que la promoción por sí sola aplica un descuento o concede un beneficio.

---

#### 14. Promoción y regla transaccional

La separación visible será:

```text
AURA
-> INTENCION PROMOCIONAL
```

```text
PASS / PULSO
-> REGLA EJECUTABLE SEGUN EL DOMINIO
```

```text
PULSO
-> VALIDACION EN CONTEXTO
-> EFECTO REALMENTE APLICADO
```

La UI deberá permitir saber qué regla propietaria materializa la intención sin duplicar su lógica dentro de AURA.

Si la regla no existe, está vencida, no está disponible o no coincide con la versión de campaña, el caso se muestra bloqueado o no materializable, no “aproximadamente listo”.

---

#### 15. Espacio de cupón

Cuando exista cupón, la experiencia deberá conservar:

- promoción o beneficio de origen;
- regla y versión propietarias;
- vigencia;
- alcance de marca, sede, canal o modalidad;
- límites;
- exclusiones;
- compatibilidad;
- carácter público o individualizado cuando corresponda;
- autoridad de validación;
- correlación con el efecto comercial.

Se conserva:

```text
CODIGO DE CUPON != AUTORIZACION DE DESCUENTO
```

La interfaz no declarará “usado” o “redimido” por mera visibilidad, copia o presentación del código.

---

#### 16. Cupón público e individualizado

La experiencia deberá distinguir un instrumento de difusión general de uno asociado a una identidad o elegibilidad particular.

Para cupones individualizados:

- AURA no crea maestro paralelo de cliente;
- la identidad se resuelve mediante la fuente propietaria;
- consentimiento y finalidad siguen aplicando cuando corresponda;
- compartir un código no amplía la elegibilidad;
- el resultado de redención proviene del dominio que ejecuta la regla.

Los datos identificables se muestran con minimización y alcance proporcional.

---

#### 17. Espacio de experimento

Un experimento deberá presentarse como objeto separado de la campaña.

La experiencia deberá mostrar:

- identidad;
- campaña y versión de origen;
- hipótesis;
- unidad de asignación;
- población elegible;
- exclusiones;
- tratamientos o variantes;
- control o comparación;
- ventana;
- guardas;
- criterio de pausa o detención;
- referencias futuras de medición;
- responsable y aprobaciones.

La campaña puede existir sin experimento y un experimento no adquiere autoridad comercial adicional por pertenecer a una campaña.

---

#### 18. Unidad de asignación

La UI deberá nombrar y explicar la unidad sobre la que se asigna el tratamiento.

Cuando la unidad corresponda a una referencia de persona, cuenta, pedido, sede, canal, publicación o periodo:

- AURA conserva la referencia necesaria;
- el dominio propietario conserva la identidad y el hecho;
- una ausencia técnica no se transforma en grupo control;
- la unidad deberá ser compatible con finalidad, consentimiento y guardas aplicables.

No se permite una unidad implícita inferida solo por conveniencia de interfaz.

---

#### 19. Tratamientos, variantes y control

La experiencia deberá distinguir:

```text
VARIANTE CREATIVA
!= PROMOCION
!= REGLA DE PRECIO
```

Un tratamiento podrá referenciar contenido, horario, canal, oferta comunicada, incentivo o secuencia cuando el contrato lo permita.

El grupo de control o comparación deberá ser explícito.

No se clasificarán como control personas, pedidos o targets que simplemente quedaron sin efecto por error técnico, denegación, falta de datos, revocación o fallo del proveedor.

---

#### 20. Exclusiones y contaminación experimental

La UI deberá hacer visibles las incompatibilidades materiales entre campañas, experimentos o promociones.

Podrán mostrarse:

- exclusiones entre experimentos;
- incompatibilidades de promociones;
- solapamiento de audiencia;
- exposición previa relevante;
- restricciones por marca, sede o canal;
- motivo de exclusión;
- regla que impide una asignación.

La experiencia no inventa una política universal de exclusión; representa la política gobernada que aplique a cada caso.

---

#### 21. Sistema de guardas

Las guardas se presentarán como evaluaciones independientes, trazables y con fuente.

Toda guarda material deberá poder responder:

- qué protege;
- qué fuente la decide;
- qué versión o dato se evaluó;
- cuándo se evaluó;
- hasta cuándo es utilizable;
- cuál fue el resultado;
- por qué bloquea cuando bloquea;
- quién puede resolver el caso;
- qué debe revalidarse antes de un efecto.

La interfaz no reduce guardas heterogéneas a un único booleano sin evidencia.

---

#### 22. Guardas económicas

Las guardas económicas consumen decisiones autorizadas de NUMERA o de la autoridad económica propietaria.

La experiencia podrá mostrar, cuando corresponda:

- presupuesto referenciado;
- límite autorizado;
- margen mínimo o condición económica gobernada;
- exposición máxima;
- costo esperado;
- tope financiado;
- resultado de evaluación;
- fuente, versión y frescura.

AURA no recalcula una verdad económica propia para transformar un bloqueo en autorización.

Dato económico ausente, vencido, conflictivo o inaccesible no se presenta como `PASS` implícito.

---

#### 23. Guardas de inventario y disponibilidad

Cuando una campaña prometa producto o disponibilidad, la experiencia deberá consumir hechos autorizados de NEXO y distinguir:

```text
LECTURA DE INVENTARIO
!= RESERVA
!= PROMESA FUTURA
```

La UI deberá mostrar cuando una lectura está desactualizada o cuando una condición ya no satisface la guarda.

La campaña no reserva inventario ni corrige existencias desde AURA.

---

#### 24. Guardas de capacidad

Cuando una campaña pueda afectar producción o servicio, la experiencia deberá consumir la señal o decisión autorizada de capacidad.

Se conserva:

```text
CAPACIDAD OBSERVADA
!= CAPACIDAD COMPROMETIDA
```

AURA podrá mostrar restricciones, ventanas o bloqueos provenientes de FOGO u otra fuente propietaria aplicable, pero no comprometer producción por inferencia.

---

#### 25. Guardas de consentimiento y finalidad

Cuando la campaña implique contacto o tratamiento de datos personales, la experiencia deberá mostrar la situación vigente de:

- finalidad;
- consentimiento aplicable;
- preferencia de canal;
- vigencia;
- revocación;
- exclusiones;
- fuente propietaria.

Una revocación aplicable bloquea nuevos efectos afectados.

El permiso para ver una campaña o un lead no equivale a permiso para contactar una persona.

---

#### 26. Guardas de publicación

La campaña podrá consumir el estado de targets definido por AURA-UX-004, pero no redefinirlo.

La experiencia deberá distinguir:

- target preparado;
- target bloqueado;
- target programado;
- publicación confirmada;
- publicación ambigua;
- recuperación pendiente;
- retiro solicitado o confirmado.

Una campaña no se presenta como completamente ejecutada si targets materiales permanecen ambiguos o bloqueados.

---

#### 27. Estado de una guarda

La experiencia podrá resumir una guarda como satisfecha, bloqueante, vencida, pendiente de evidencia, no aplicable o técnicamente no resoluble, siempre que el detalle preserve el resultado propietario real.

Estos descriptores son de presentación y no crean un namespace de estados empresariales competidor.

La diferencia entre:

```text
DENEGACION
AUSENCIA DE DATO
DATO VENCIDO
CONFLICTO
FALLO TECNICO
NO_APLICABLE
```

debe permanecer visible.

---

#### 28. Confirmación de inicio

La acción de iniciar una campaña deberá presentar una confirmación proporcional al riesgo.

Antes de confirmar, la experiencia deberá resumir:

- campaña y versión;
- objetivo;
- periodo;
- audiencia y exclusiones;
- promoción/cupón cuando aplique;
- experimento cuando aplique;
- publicaciones o targets implicados;
- guardas materiales;
- bloqueos resueltos;
- responsable;
- efectos que ocurrirán fuera de AURA.

La confirmación visual no sustituye la revalidación autoritativa inmediatamente antes de cada efecto protegido.

---

#### 29. Monitor de campaña activa

Durante ejecución, la experiencia deberá separar:

- estado de la campaña;
- estado de publicaciones;
- estado de experimento;
- vigencia de promoción o cupón;
- estado de guardas;
- efectos confirmados de dominios propietarios;
- incidencias abiertas;
- próxima decisión humana.

El monitor deberá permitir comprender parcialidad sin declarar éxito global por la existencia de algunos efectos correctos.

---

#### 30. Pausa, cancelación y cierre

Las acciones de pausa, cancelación y cierre deberán mostrar su alcance real.

Se conserva:

```text
PAUSAR CAMPANA
!= CANCELAR NUEVOS EFECTOS
!= RETIRAR PUBLICACIONES
!= REVERTIR REDENCIONES
!= REVERTIR VENTAS
```

Una pausa puede impedir nuevos efectos según el contrato aplicable, pero no borra ni revierte hechos ya confirmados.

La interfaz deberá advertir qué superficies requieren acciones adicionales de dominios propietarios.

---

#### 31. Detención experimental

Cuando una guarda o señal exija detener un experimento, la experiencia deberá conservar:

- motivo;
- momento;
- responsable;
- unidades ya asignadas;
- efectos ya confirmados;
- tratamientos suspendidos;
- evidencia disponible;
- elementos que requieren reconciliación.

Detener el experimento no elimina historia ni reclasifica silenciosamente exposiciones previas.

---

#### 32. Resultado promocional y redención

AURA podrá mostrar correlaciones con:

- cupones emitidos;
- elegibilidad;
- redenciones;
- descuentos aplicados;
- ventas relacionadas;
- reversas cuando existan.

Pero los estados y montos deberán provenir de PASS/PULSO o del dominio propietario correspondiente.

Se conserva:

```text
PROMOCION PUBLICADA
!= REDENCION
!= DESCUENTO APLICADO
!= VENTA
```

AURA no inventa resultados faltantes para completar el embudo.

---

#### 33. Lectura temprana del experimento

La experiencia podrá mostrar observaciones preliminares cuando existan, pero deberá distinguirlas de una conclusión estadística o causal.

Toda lectura temprana deberá indicar, cuando corresponda:

- ventana observada;
- fuente;
- cobertura;
- datos todavía incompletos;
- restricciones;
- motivo de alerta;
- si existe una guarda que exige detener.

La decisión sobre confianza, incrementalidad y atribución final pertenece a `AURA-DOM-008`.

---

#### 34. Presupuesto y exposición

La experiencia podrá mostrar presupuesto referenciado, consumo observado y exposición cuando existan fuentes autorizadas.

Deberá diferenciar:

```text
PRESUPUESTO REFERENCIADO
!= COMPROMISO
!= GASTO REAL
!= RESULTADO ECONOMICO
```

Los números no se recalculan silenciosamente dentro de AURA.

Una discrepancia deberá mostrar fuente, frescura y necesidad de conciliación en lugar de seleccionar el valor más conveniente.

---

#### 35. Frescura y revalidación

Toda guarda material deberá mostrar cuándo fue evaluada y cuándo necesita revalidación.

La experiencia deberá revalidar o exigir revalidación antes de nuevos efectos cuando cambien elementos como:

- versión de campaña;
- promoción o cupón;
- audiencia;
- consentimiento;
- presupuesto;
- disponibilidad;
- capacidad;
- autorización;
- publicación;
- periodo o vigencia.

Una evaluación histórica puede conservar valor probatorio sin continuar siendo ejecutable.

---

#### 36. Acciones masivas

Cuando una acción afecte múltiples recursos, la experiencia deberá mostrar antes de ejecutar:

- universo candidato;
- elementos autorizados;
- exclusiones;
- motivo de exclusión;
- volumen;
- efecto pretendido;
- guardas aplicables;
- riesgo de parcialidad;
- tratamiento ante fallos.

La selección de muchas filas no escala automáticamente una capacidad individual.

Los nuevos efectos deberán detenerse si la autoridad o una condición material deja de ser válida.

---

#### 37. Parcialidad y recuperación

Una operación parcial deberá distinguir:

- candidatos;
- autorizados;
- excluidos;
- ejecutados;
- fallidos;
- ambiguos;
- pendientes de reconciliación.

La experiencia no ofrecerá “reintentar todo” cuando algunos efectos ya estén confirmados.

Los reintentos deberán preservar idempotencia y la autoridad vigente del dominio propietario.

---

#### 38. Auditoría e historial

El historial de campaña deberá permitir reconstruir:

- actor;
- versión;
- objetivo e hipótesis;
- cambios materiales;
- audiencia y exclusiones;
- promoción o cupón referenciado;
- experimento;
- guardas evaluadas;
- decisión de inicio, pausa, cancelación o cierre;
- publicaciones relacionadas;
- efectos confirmados;
- fallos y parcialidad;
- correlaciones con dominios propietarios;
- timestamp y motivo cuando corresponda.

La experiencia deberá distinguir decisión empresarial, ejecución técnica y resultado observado.

---

#### 39. Simplicidad, accesibilidad y comunicación de riesgo

La experiencia esencial no dependerá únicamente de:

- color;
- iconos sin etiqueta;
- hover;
- gestos de precisión;
- abreviaturas técnicas.

Los bloqueos materiales deberán expresar:

1. qué impide avanzar;
2. por qué;
3. qué fuente lo decidió;
4. quién puede resolverlo;
5. qué sucedería si la condición cambia.

La interfaz podrá usar divulgación progresiva para detalles técnicos sin ocultar riesgos materiales.

---

#### 40. Relación con AURA-UX-004

La 005 no absorbe:

- aprobación editorial;
- configuración técnica de targets;
- programación de publicaciones;
- estado técnico por canal;
- reintentos de publicación;
- reconciliación externa;
- retiro de publicaciones.

Cuando la campaña necesite operar una publicación, navegará a la superficie propietaria preservando `campaign_id`, versión, target y motivo.

---

#### 41. Handoff a `AURA-UX-006`

`AURA-UX-005` entrega a `AURA-UX-006` una experiencia capaz de conservar:

- campaña de origen;
- objetivo e hipótesis;
- marca;
- audiencia o contraparte cuando corresponda;
- promociones u ofertas comunicadas;
- canal y publicación de origen;
- responsable;
- fechas;
- guardas relevantes;
- correlación y contexto suficiente para explicar por qué surgió una señal comercial.

`AURA-UX-006` deberá diseñar bandeja de oportunidades, B2B, catering y eventos sin convertir automáticamente interacción, campaña o respuesta en lead, cliente, propuesta o pedido y sin reabrir las reglas de campaña, promoción, cupón o experimento fijadas aquí.

---

#### 42. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- campañas, promociones, oportunidades, presupuesto, guardas y fronteras PULSO/PASS/NUMERA ya cuentan con cobertura vigente;
- consentimiento, privacidad, autorización, exportación y acciones masivas ya están protegidos por requisitos vigentes de PASS, AUTH e integración;
- publicación, idempotencia y reconciliación se encuentran cubiertas por contratos previamente aprobados;
- esta tarea desarrolla la arquitectura de experiencia de obligaciones existentes sin crear una nueva regla protegida;
- no modifica texto, estado, relación, propietario, paquete, ambiente ni evidencia de ninguna fila del registro canónico.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 43. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza:

- `TREQ-AURA-003`, para campañas, promociones, oportunidades, presupuesto, guardas, atribución y fronteras PULSO/PASS/NUMERA;
- `TREQ-AURA-001`, para mantener idea, campaña, pieza, publicación y promoción como objetos diferenciados y gobernados por identidad, versión y vigencia;
- `TREQ-AURA-002`, para límites de autonomía de IA, fuentes, frescura y prohibición de promocionar o contactar sin autoridad;
- `TREQ-PASS-010`, para identidad, contactos, preferencias, consentimiento, finalidad, canal, versión y vigencia;
- `TREQ-PASS-011`, para comunicaciones y resultados con autoridad explícita;
- `TREQ-PASS-012`, para privacidad, revocación y bloqueo de marketing posterior cuando aplique;
- `TREQ-PULSO-005` y `TREQ-PULSO-006`, para pedido, venta, descuentos, estados comerciales y acciones sensibles auditables;
- `TREQ-NUMERA-004`, para presupuesto, costo, margen, escenarios y rentabilidad con método, fuente, versión y vigencia;
- `TREQ-AUTH-018`, para protección de datos de clientes y exportaciones bajo finalidad y alcance;
- `TREQ-INTEGRATION-019`, para canales, payloads, identificadores, idempotencia, eventos tardíos y reconciliación.

Esta enumeración constituye trazabilidad de cobertura vigente y no crea ni modifica requisitos.

---

#### 44. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado dentro del checkout del usuario |
| REMOTA | PASS | se verificaron continuidad, archivo propietario, topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, dependencia de `AURA-DOM-006`, protección de `AURA-AUTH-003`, fronteras con PASS/PULSO/NUMERA/NEXO/FOGO, cobertura 04A de AURA y validadores documentales vigentes; además se consumió la versión completa aprobada de `AURA-UX-004` disponible para trabajo adelantado |
| OPERATIVA | NOT_APPLICABLE | la tarea diseña experiencia documental y no inicia campañas, ejecuta promociones, emite cupones, asigna experimentos, contacta audiencias, aplica descuentos ni modifica presupuestos, inventario o capacidad reales |
| FÍSICA | NOT_APPLICABLE | la familia `AURA-UX-001` a `AURA-UX-008` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, integraciones, campañas, datos ni despliegues |

---

#### 45. Criterios de aceptación

`AURA-UX-005` queda satisfecha cuando simultáneamente:

1. campaña, promoción, cupón, beneficio, regla transaccional, redención, descuento y venta permanecen conceptos distintos;
2. AURA conserva intención, campaña, hipótesis, experimento y correlación sin apropiarse de reglas transaccionales;
3. PASS conserva identidad, consentimiento, beneficios, fidelización y redención cuando corresponda;
4. PULSO conserva pedido, venta, validación de aplicabilidad y efecto comercial aplicado;
5. NUMERA conserva presupuesto, costo, margen y rentabilidad;
6. NEXO conserva producto, existencia e inventario;
7. FOGO conserva capacidad productiva;
8. el portafolio identifica objetivo, responsable, periodo, guardas y próxima decisión;
9. el detalle separa contenido, oferta, experimento, guardas, ejecución e historial;
10. cambios materiales crean una nueva versión o invalidan decisiones reutilizadas cuando corresponda;
11. hipótesis se presenta como hipótesis y no como hecho;
12. audiencia no equivale a segmento materializado ni a persona contactable;
13. la preparación para inicio muestra cada dependencia material y su evidencia;
14. promoción no aplica directamente un efecto comercial;
15. código de cupón no equivale a autorización de descuento;
16. cupones individualizados no crean maestro paralelo de cliente;
17. experimento permanece objeto separado de campaña;
18. unidad de asignación es explícita y gobernada;
19. variante creativa no equivale a promoción ni regla de precio;
20. grupo control no se construye con fallos técnicos o denegaciones;
21. exclusiones y contaminación experimental permanecen visibles;
22. cada guarda muestra fuente, versión, frescura, resultado, motivo y owner de resolución;
23. dato económico ausente o vencido no se convierte en autorización;
24. lectura de inventario no equivale a reserva ni promesa futura;
25. capacidad observada no equivale a capacidad comprometida;
26. revocación aplicable bloquea nuevos efectos afectados;
27. guardas de publicación consumen AURA-UX-004 sin redefinir estados técnicos por canal;
28. denegación, ausencia, vencimiento, conflicto, fallo técnico y no aplicabilidad permanecen distintos;
29. confirmación de inicio resume alcance y riesgo pero no sustituye revalidación autoritativa;
30. monitor de campaña separa campaña, publicación, experimento, promoción y guardas;
31. pausa, cancelación, retiro y reversión permanecen acciones distintas;
32. detener experimento preserva asignaciones y evidencia;
33. resultados de redención, descuento y venta provienen de dominios propietarios;
34. lectura temprana no se presenta como causalidad demostrada;
35. presupuesto referenciado, compromiso, gasto y resultado económico permanecen separados;
36. guardas se revalidan ante cambios materiales;
37. una acción masiva muestra candidatos, autorizados, exclusiones, volumen y efecto;
38. reintentos no duplican efectos confirmados;
39. historial distingue decisión empresarial, ejecución técnica y resultado observado;
40. la experiencia esencial no depende solo de color, hover o gesto de precisión;
41. `AURA-UX-004` conserva ownership de aprobación y publicación multicanal;
42. `AURA-UX-006` recibe contexto de origen sin convertir automáticamente interacción en lead, cliente, propuesta o pedido;
43. se crean y modifican cero requisitos de prueba;
44. no se crea ninguna instancia física;
45. la continuidad queda reservada exclusivamente a `AURA-UX-006`.

---

#### 46. Límites

Esta tarea no autoriza ni ejecuta:

- crear repositorio, runtime, ruta, pantalla o componente de AURA;
- crear tablas, migraciones, vistas, funciones, RPC, triggers, RLS, Storage, Realtime, jobs, colas o Edge Functions;
- crear campañas productivas;
- activar experimentos reales;
- asignar personas o transacciones a tratamientos reales;
- crear promociones reales;
- crear o modificar reglas transaccionales de PASS o PULSO;
- emitir, redimir o revertir cupones reales;
- aplicar descuentos o beneficios;
- crear pedidos o ventas;
- modificar identidad, consentimiento o preferencias de clientes;
- materializar segmentos reales;
- contactar audiencias;
- exportar datos;
- cambiar presupuesto, costo, margen o rentabilidad;
- reservar o ajustar inventario;
- comprometer capacidad productiva;
- programar, publicar, reintentar, reconciliar o retirar contenido real;
- declarar causalidad o incrementalidad final;
- crear leads, propuestas o pedidos por inferencia;
- modificar requisitos del registro 04A;
- adelantar `AURA-UX-006`.

---

#### 47. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros`

**TAREA ACTUAL APROBADA**
`AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos`

### ✅ AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas
**Tarea siguiente:** AURA-UX-007 — Diseñar reputación, comentarios, respuestas y escalamiento
**Tipo de tarea:** documental; diseño canónico de la experiencia de bandeja unificada de interacciones, leads, oportunidades, pipeline B2B, catering, eventos y handoff comercial de AURA, preservando ownership de PASS, PULSO, NEXO, FOGO, ORIGO y NUMERA y sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, leads reales, oportunidades reales, cuentas B2B, cotizaciones, pedidos, reservas, eventos, contactos, exportaciones, tablas, migraciones, RLS, funciones, RPC, jobs, colas, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la experiencia con la que AURA deberá recibir, clasificar, calificar, priorizar y dar seguimiento a interacciones comerciales provenientes de campañas, formularios, mensajes, redes, WhatsApp, correo, referidos u otros orígenes autorizados, convirtiéndolas únicamente cuando corresponda en leads u oportunidades trazables y transfiriéndolas explícitamente a PULSO cuando se requiera cotización, pedido, catering, evento, reserva o compromiso comercial.

La regla raíz es:

```text
INTERACCION
!= CONSULTA
!= LEAD
!= CLIENTE
!= OPORTUNIDAD
!= PROPUESTA
!= COTIZACION
!= PEDIDO
!= COMPROMISO OPERATIVO
```

AURA gobierna origen, triage, lead, oportunidad, etapa, responsable, siguiente acción y handoff. PASS conserva identidad y consentimiento. PULSO conserva caso comercial, cotización, pedido y compromiso frente al cliente. NEXO, FOGO, ORIGO y NUMERA conservan inventario, capacidad, compras y hechos económicos.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-UX-005`, para recibir campaña de origen, objetivo, hipótesis, marca, audiencia o contraparte, oferta comunicada, canal, publicación, responsable, fechas, guardas y correlación sin convertir señal comercial en oportunidad por inferencia;
- `AURA-DOM-007`, para interacción, lead, oportunidad, pipeline, B2B, catering, eventos y transferencia a operación;
- `AURA-AUTH-003`, para proteger leads, datos de clientes, reasignaciones, exportaciones y acciones masivas bajo finalidad, minimización, consentimiento y alcance;
- `AURA-AUTH-001`, para empresa, marca, función, capacidad, recurso y contexto;
- `AURA-DOM-006`, para no redefinir campaña, experimento, promoción, cupón ni guardas;
- `AURA-DOM-009`, para no absorber reputación, comentario público, respuesta pública ni escalamiento a servicio;
- `VPROC-0057`, como proceso canónico de consultas y oportunidades digitales de AURA;
- `VPROC-0041`, como proceso propietario de cotización, aprobación, capacidad, producción, facturación y entrega de catering o venta B2B;
- `OPS-B2B-001`, para modalidades B2B y contrato de transferencia AURA → PULSO;
- `PASS`, para identidad, preferencias, consentimiento y finalidad;
- `PULSO`, para caso comercial, oferta, cotización, pedido, reserva y compromiso;
- `NEXO`, para producto, inventario, reserva física, alistamiento y entrega;
- `FOGO`, para capacidad productiva, orden, lote y restricciones de producción;
- `ORIGO`, para compras y recepciones requeridas;
- `NUMERA`, para costo, margen, crédito, pago, cartera y rentabilidad;
- `CAP-SCOPE-014`, especialmente los hallazgos sobre bandeja unificada, identidad, B2B/catering y pipeline;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

Ninguna de estas fuentes cambia de propietaria por esta tarea.

---

#### 3. Resultado canónico

AURA deberá ofrecer una experiencia que permita responder, para cada interacción u oportunidad:

```text
¿DE DONDE LLEGO?
¿QUE TIPO DE INTERACCION ES?
¿EXISTE UN LEAD O UNA OPORTUNIDAD REAL?
¿QUE FINALIDAD Y CONSENTIMIENTO APLICAN?
¿QUIEN ES RESPONSABLE?
¿CUAL ES LA ETAPA CANONICA?
¿CUAL ES LA SIGUIENTE ACCION?
¿CUANDO VENCE?
¿QUE VALOR O PROBABILIDAD SON SOLO ESTIMACIONES?
¿REQUIERE HANDOFF A PULSO?
¿PULSO ACEPTO, DEVOLVIO O RECHAZO?
¿QUE PROCESO PROPIETARIO CONTINUA?
¿COMO SE CERRO Y POR QUE?
```

La experiencia se divide en seis espacios conceptuales conectados:

1. bandeja unificada de interacciones;
2. triage y calificación;
3. pipeline de leads y oportunidades;
4. detalle de oportunidad y seguimiento;
5. B2B, catering, eventos y handoff comercial;
6. historial, correlaciones y resultados posteriores autorizados.

---

#### 4. Fronteras conceptuales obligatorias

La interfaz deberá preservar explícitamente:

```text
INTERACCION != LEAD != OPORTUNIDAD != CLIENTE
```

```text
PERSONA O CONTACTO != CLIENTE PASS != CUENTA B2B != REPRESENTANTE AUTORIZADO
```

```text
OPORTUNIDAD AURA != CASO COMERCIAL PULSO != COTIZACION PULSO != PEDIDO PULSO
```

```text
PROPUESTA != ACEPTACION DEL CLIENTE != APROBACION INTERNA != COMPROMISO OPERATIVO
```

```text
FECHA SOLICITADA != FECHA PROMETIDA != CAPACIDAD RESERVADA
```

```text
VALOR ESTIMADO != PRECIO APROBADO != VENTA REAL != INGRESO RECONOCIDO
```

```text
PROBABILIDAD ESTIMADA != HECHO != CONVERSION DEMOSTRADA
```

Estas diferencias permanecen aunque la misma pantalla las muestre relacionadas.

---

#### 5. Arquitectura de experiencia

La experiencia se organiza alrededor de identidades estables de interacción, lead y oportunidad.

Desde la bandeja se podrá navegar hacia:

- origen y canal;
- interacción original;
- triage;
- lead cuando exista;
- oportunidad cuando exista;
- contraparte preliminar;
- campaña o publicación de origen;
- etapa canónica;
- responsable;
- siguiente acción;
- vencimiento;
- valor y probabilidad estimados cuando correspondan;
- modalidad B2B preliminar;
- handoff;
- referencias PULSO posteriores;
- cierre y motivo.

La interfaz no creará una identidad única artificial que borre estas capas.

---

#### 6. Entrada desde AURA-UX-005

La 006 recibe de la 005, cuando exista, contexto suficiente para explicar el origen de una señal comercial:

- campaña;
- objetivo e hipótesis;
- marca;
- audiencia o contraparte;
- promoción u oferta comunicada;
- canal;
- publicación;
- responsable;
- fechas;
- guardas relevantes;
- correlación.

Se preserva:

```text
CAMPANA
-> PUEDE ORIGINAR INTERACCION
-> PUEDE ORIGINAR LEAD U OPORTUNIDAD
```

pero:

```text
CAMPANA != OPORTUNIDAD != PEDIDO
```

Una respuesta, clic, mensaje o formulario no nace automáticamente como lead calificado.

---

#### 7. Bandeja unificada

La bandeja deberá reunir de forma gobernada interacciones provenientes de formularios, mensajes, redes, WhatsApp, correo, referidos y otros canales autorizados.

Cada fila o tarjeta deberá poder resumir:

- origen;
- canal;
- contraparte preliminar;
- contenido o necesidad mínima;
- campaña o publicación de origen cuando exista;
- clasificación;
- estado canónico;
- responsable;
- siguiente acción;
- vencimiento;
- indicación de consentimiento o restricción aplicable;
- señales de duplicado, conflicto o handoff.

La bandeja no es un inbox sin semántica: debe permitir distinguir qué requiere triage, calificación, respuesta, transferencia o cierre.

---

#### 8. Orígenes y canales

Formularios, mensajes, redes, WhatsApp, correo, ManyChat, referidos y otros canales son fuentes de interacción, no fuentes maestras de oportunidad o cliente.

La experiencia deberá conservar, cuando exista:

- identificador interno;
- identificador externo;
- canal;
- cuenta o endpoint;
- timestamp;
- contenido relevante;
- campaña o publicación correlacionada;
- estado de ingestión;
- evidencia de duplicado o reintento.

El canal nunca podrá declarar por sí solo cliente, oportunidad ganada o pedido.

---

#### 9. Máquina canónica VPROC-0057

La experiencia deberá representar exactamente la máquina aprobada:

```text
DIGITAL_INQUIRY_RECEIVED
-> TRIAGED
-> QUALIFICATION_PENDING
-> QUALIFIED
-> ASSIGNED
-> RESPONSE_IN_PROGRESS
-> COMMERCIAL_HANDOFF_PENDING
-> FOLLOW_UP_IN_PROGRESS
-> DIGITAL_INQUIRY_RESOLVED
```

El pipeline AURA es una proyección de estos estados y no una segunda máquina paralela.

La UI podrá agrupar o resumir visualmente, pero no podrá perder ni sustituir el significado canónico de cada estado.

---

#### 10. Nacimiento y triage

`DIGITAL_INQUIRY_RECEIVED` exige una interacción correlacionable con canal, contraparte preliminar y contenido mínimo.

Al nacer:

```text
INTERACCION RECIBIDA
!= OPORTUNIDAD CALIFICADA
!= CLIENTE
!= PEDIDO
!= RECLAMO
!= VENTA
```

`TRIAGED` deberá distinguir al menos:

- consulta informativa;
- señal de interés comercial;
- oportunidad potencial;
- intención de pedido;
- solicitud B2B;
- catering o evento;
- reserva o requerimiento operativo;
- reclamo o servicio;
- interacción sin finalidad comercial válida;
- duplicado o ruido.

La clasificación no cambia el propietario del proceso destino.

---

#### 11. Lead

La experiencia de lead deberá representar una señal comercial identificable o correlacionable que amerita evaluación, pero todavía no demuestra una oportunidad calificada.

Podrá mostrar, cuando exista:

- `lead_id`;
- origen y canal;
- campaña o publicación;
- contraparte preliminar;
- necesidad o señal;
- momento de captura;
- responsable o cola inicial;
- finalidad;
- consentimiento;
- restricciones de contacto;
- referencias permitidas a mensajes o adjuntos.

Un lead no equivale a cliente PASS ni autoriza contacto fuera de finalidad.

---

#### 12. Oportunidad

Una oportunidad deberá mostrar como mínimo:

- `opportunity_id`;
- origen;
- relación con `lead_id` cuando exista;
- campaña o publicación de origen;
- contraparte preliminar autorizada;
- necesidad y alcance;
- categoría comercial;
- etapa vigente;
- valor estimado cuando exista sustento;
- probabilidad estimada cuando se use;
- responsable;
- siguiente acción;
- vencimiento;
- restricciones y consentimiento;
- evidencias o documentos referenciados;
- motivo de descarte, pérdida o cierre cuando corresponda;
- referencias de handoff y resultados posteriores.

La oportunidad no duplica el caso comercial de PULSO.

---

#### 13. Calificación

`QUALIFICATION_PENDING` deberá mostrar qué falta para decidir si existe una oportunidad real.

La experiencia deberá permitir resolver, cuando aplique:

- necesidad y alcance preliminar;
- contraparte y rol de contacto;
- finalidad legítima;
- consentimiento o base aplicable;
- fecha o ventana requerida;
- marca, producto o servicio;
- modalidad comercial;
- presupuesto orientativo declarado;
- compatibilidad preliminar con oferta;
- restricciones conocidas;
- información faltante;
- siguiente acción.

Dato ausente no se completa por inferencia.

---

#### 14. Resultado de calificación

La experiencia deberá distinguir resultados como:

- requiere más información;
- consulta sin oportunidad;
- oportunidad calificada;
- transferida a otro proceso propietario;
- duplicada pero correlacionable;
- fuera de alcance;
- descartada con motivo;
- requiere revisión humana.

`QUALIFIED` significa que cumple criterios para seguimiento comercial, no que exista venta, precio aprobado, capacidad, crédito o pedido.

---

#### 15. Correlación y duplicados

Dos interacciones no se fusionarán por coincidencia débil.

La experiencia no tratará como evidencia suficiente por sí sola:

- mismo nombre;
- mismo correo;
- mismo teléfono;
- misma empresa;
- mismo canal;
- texto similar;
- misma campaña.

Deberá ser posible marcar la relación como:

- misma oportunidad;
- oportunidades diferentes;
- seguimiento del mismo asunto;
- caso ya transferido;
- correlación incierta.

La interacción original nunca se elimina para simplificar el pipeline.

---

#### 16. Identidad y PASS

Se preserva:

```text
CLIENTE PASS != LEAD AURA
IDENTIDAD PASS != OPORTUNIDAD AURA
```

Cuando exista identidad PASS autorizada, AURA mostrará una referencia mínima y claramente identificada como externa al dominio de oportunidad.

AURA no deberá presentar como editable dentro de la oportunidad:

- perfil completo;
- consentimientos maestros;
- historial total de compras;
- ledger de fidelización;
- datos sensibles no necesarios.

---

#### 17. Pipeline

El pipeline deberá mostrar el trabajo activo sin reducirlo a abierto/cerrado.

Como mínimo deberá hacer visibles:

- recibidas;
- clasificadas;
- calificación pendiente;
- calificadas;
- asignadas;
- respuesta en curso;
- handoff comercial pendiente;
- seguimiento en curso;
- resueltas.

Cada agrupación visual deberá permitir volver al estado canónico exacto.

---

#### 18. Responsable, siguiente acción y vencimiento

Toda oportunidad activa deberá mostrar de forma prominente:

- responsable vigente;
- siguiente acción;
- fecha o condición de vencimiento;
- dependencia conocida;
- bloqueo cuando exista.

La experiencia deberá señalar como anomalía una oportunidad activa sin responsable o sin siguiente acción.

Cambiar responsable conserva la transferencia; no reescribe la historia.

---

#### 19. Valor estimado y probabilidad

El valor estimado, cuando exista, deberá mostrar:

- moneda;
- rango o valor;
- origen;
- fecha;
- supuestos;
- actor;
- vigencia.

La probabilidad, cuando se use, deberá indicar si proviene de:

- juicio humano;
- regla;
- modelo;
- otra estimación versionada.

Se preserva:

```text
VALOR ESTIMADO != COTIZACION != VENTA != INGRESO
PROBABILIDAD != HECHO
```

---

#### 20. Detalle de oportunidad

El detalle deberá separar como mínimo:

1. **Origen:** interacción, canal, campaña y publicación;
2. **Necesidad:** descripción, alcance y modalidad preliminar;
3. **Contraparte:** referencia mínima autorizada;
4. **Pipeline:** estado, responsable, siguiente acción y vencimiento;
5. **Estimaciones:** valor, probabilidad y supuestos;
6. **Seguimiento:** respuestas, acciones y resultados;
7. **Handoff:** destino, estado y correlación;
8. **Resultado:** pérdida, transferencia, cierre o hecho propietario posterior;
9. **Historia:** cambios, actores y timestamps.

La cotización o pedido relacionado se presenta como referencia PULSO, no como sección editable de AURA.

---

#### 21. Respuesta y seguimiento

`RESPONSE_IN_PROGRESS` y `FOLLOW_UP_IN_PROGRESS` permanecerán separados.

La experiencia deberá conservar:

- finalidad vigente;
- consentimiento o permiso aplicable;
- responsable;
- última acción;
- siguiente acción;
- canal;
- fecha;
- resultado;
- referencias relevantes.

No se continuará contacto si la finalidad, consentimiento o restricción aplicable lo impiden.

---

#### 22. Consentimiento y finalidad

Una interacción iniciada por una contraparte no concede permiso ilimitado de marketing.

La experiencia deberá poder diferenciar:

- respuesta a solicitud iniciada por la contraparte;
- seguimiento relacionado con la solicitud;
- marketing futuro;
- permiso por canal;
- tratamiento necesario para cotización o prestación del servicio.

Una compra, mensaje, visita, campaña o interacción pública no fabrican consentimiento.

---

#### 23. Datos mínimos de contraparte

Antes del handoff, la experiencia operará con información mínima necesaria.

Podrá representar, según necesidad:

- nombre o razón social preliminar;
- tipo de contraparte;
- contacto de trabajo;
- rol declarado;
- organización;
- localidad relevante;
- necesidad;
- fecha;
- restricciones;
- canal de origen;
- finalidad o consentimiento.

AURA no crea expediente completo de cliente, crédito, facturación o KYC.

---

#### 24. B2B y modalidades preservadas

Cuando una oportunidad requiera `VPROC-0041`, la experiencia podrá clasificar preliminarmente las modalidades aprobadas:

- `B2B-PROG` — suministro empresarial programado;
- `B2B-PUNT` — pedido empresarial puntual;
- `CAT-EMP` — catering empresarial;
- `EV-COM` — evento comercial complejo;
- `B2B-DIST` — distribución o reventa autorizada.

La modalidad ayuda a enrutar; no declara por sí sola viabilidad, precio, capacidad, crédito o aprobación.

Una compra grande no se convierte automáticamente en B2B.

---

#### 25. Cuenta B2B y personas relacionadas

La experiencia deberá preservar:

```text
CUENTA B2B
!= REPRESENTANTE LEGAL
!= CONTACTO COMERCIAL
!= CONTACTO OPERATIVO
!= PAGADOR
!= RECEPTOR
!= BENEFICIARIO
!= USUARIO AUTENTICADO
```

AURA podrá mostrar contraparte y roles preliminares suficientes para calificación.

La verificación completa de autoridad, facturación, crédito y compromiso pertenece al expediente PULSO y a los dominios propietarios.

---

#### 26. Catering empresarial

Una oportunidad `CAT-EMP` podrá capturar antes del handoff, cuando corresponda:

- organización;
- tipo de evento o servicio;
- fecha y ventana solicitadas;
- asistentes o cobertura estimada;
- necesidades preliminares;
- restricciones alimentarias declaradas;
- destinos;
- servicio, montaje o equipos solicitados;
- documentos disponibles;
- contacto responsable;
- canal de origen;
- restricciones y consentimiento.

La interfaz deberá presentar estos datos como requerimientos o solicitudes, nunca como confirmaciones.

---

#### 27. Eventos comerciales

La experiencia deberá separar:

```text
EVENTO COMERCIAL
!= CAMPANA DE MARKETING
!= PUBLICACION DE EVENTO
!= RESERVA COMERCIAL
```

AURA conserva origen, oportunidad y seguimiento.

PULSO conserva reserva comercial, condiciones, cambios, cancelación y cierre cuando corresponda.

Una conversación o pieza promocional no reserva capacidad.

---

#### 28. No promesa antes de handoff

Antes de confirmación por los dominios propietarios, AURA no mostrará como comprometidos:

- precio definitivo;
- descuento;
- crédito;
- capacidad;
- inventario;
- fecha firme;
- transporte;
- producción;
- facturación;
- disponibilidad garantizada.

Fecha solicitada, presupuesto orientativo y necesidad declarada deberán estar etiquetados como datos de la contraparte o estimaciones.

---

#### 29. Criterios de handoff

`COMMERCIAL_HANDOFF_PENDING` deberá hacerse visible cuando continuar materialmente requiera otro proceso propietario.

La experiencia deberá orientar a handoff cuando se necesite:

- cotización formal;
- pedido;
- venta B2B;
- catering;
- evento comercial complejo;
- reserva comercial;
- condición especial de precio o crédito;
- validación de capacidad;
- compromiso operativo.

Una conversación sin contexto mínimo no crea automáticamente un handoff.

---

#### 30. Preparación del handoff AURA → PULSO

Antes de transferir, la UX deberá mostrar el sobre mínimo que será compartido:

- `opportunity_id`;
- origen y canal;
- campaña o publicación de origen cuando exista;
- contraparte preliminar;
- necesidad y alcance;
- fecha y siguiente acción;
- responsable;
- consentimiento y restricciones;
- adjuntos permitidos;
- correlación;
- intención/versionado necesario para idempotencia.

La persona deberá poder reconocer qué datos viajan y por qué.

---

#### 31. Resultado del handoff

Los resultados deberán mostrarse como estados diferentes:

```text
ACEPTADO != DEVUELTO != RECHAZADO
```

Cuando PULSO acepte:

- AURA conserva `opportunity_id`;
- PULSO crea o correlaciona `commercial_case_id`;
- las identidades quedan vinculadas;
- todavía no existe cotización ni pedido por ese solo hecho.

Si se devuelve, la UX deberá mostrar la información faltante o inconsistencia.

Si se rechaza, deberá mostrar motivo y proceso alternativo cuando exista.

---

#### 32. Idempotencia y handoff ambiguo

Reintentar la misma transferencia no deberá crear casos comerciales duplicados.

La experiencia deberá conservar y, cuando sea material, hacer visible:

- intención estable;
- versión de oportunidad;
- correlación;
- resultado anterior;
- motivo del reintento;
- evidencia del receptor.

Se preserva:

```text
RESULTADO DESCONOCIDO != HANDOFF FALLIDO
```

Ante resultado ambiguo, la acción primaria será reconciliar antes de reenviar.

---

#### 33. Después del handoff

Un handoff aceptado no convierte AURA en interfaz operativa de PULSO.

AURA podrá consumir proyecciones autorizadas para mostrar:

- estado comercial relevante;
- `commercial_case_id`;
- versión y vigencia de cotización cuando exista;
- referencia de pedido o reserva cuando exista;
- resultado comercial permitido;
- necesidad de seguimiento AURA.

Estas proyecciones serán de solo lectura salvo contrato explícito posterior.

---

#### 34. Propuesta, cotización y pedido

La UX deberá preservar:

```text
OPORTUNIDAD AURA
-> REFERENCIA A PROPUESTA O COTIZACION PULSO
```

No:

```text
OPORTUNIDAD AURA
-> COTIZACION EDITABLE EN AURA
```

Y además:

```text
OPORTUNIDAD AURA != PEDIDO PULSO
```

Precio, impuestos, crédito, condiciones, aceptación, pedido y compromiso operativo permanecen en PULSO y dominios relacionados.

---

#### 35. Capacidad, inventario, compras y economía

La experiencia podrá mostrar necesidades y referencias autorizadas, pero no prometer hechos propietarios.

Se preserva:

```text
NECESIDAD CAPTURADA != CAPACIDAD VALIDADA != CAPACIDAD RESERVADA
```

Después del handoff:

- FOGO conserva capacidad productiva;
- NEXO conserva inventario, reserva física, alistamiento y entrega;
- ORIGO conserva compras y recepciones;
- NUMERA conserva costo, margen, crédito, pago, cartera y rentabilidad;
- PULSO conserva el compromiso comercial.

Una falla de consulta no se transforma en aprobación.

---

#### 36. Reclamos, servicio y reputación

Cuando el triage detecte reclamo, devolución, caso de servicio, comentario reputacional o interacción pública negativa, la UX deberá impedir que se convierta en oportunidad para cerrar o esconder el problema.

Se preserva:

```text
RECLAMO != OPORTUNIDAD
COMENTARIO PUBLICO != LEAD
RESPUESTA PUBLICA != CIERRE DE CASO
```

La clasificación deberá permitir transferir o navegar hacia el proceso propietario manteniendo origen y referencia mínima.

La experiencia de reputación y respuesta pública pertenece a `AURA-UX-007`.

---

#### 37. Cierre, pérdida y oportunidad ganada

Toda oportunidad cerrada sin conversión deberá mostrar motivo suficientemente específico.

La experiencia deberá distinguir, cuando corresponda:

- no era oportunidad;
- fuera de alcance;
- falta de información;
- contraparte no elegible;
- necesidad no atendible;
- fecha no viable;
- precio o condición no aceptados;
- capacidad no disponible;
- cliente desistió;
- no hubo respuesta;
- duplicado;
- transferida a otro proceso;
- otra razón documentada.

AURA no declarará ganada una oportunidad solo por respuesta positiva, reunión, cotización enviada, handoff aceptado o reserva solicitada.

Cuando ganar dependa de un hecho comercial, el resultado se consume desde PULSO o la fuente propietaria.

---

#### 38. Resolución de VPROC-0057

`DIGITAL_INQUIRY_RESOLVED` deberá mostrar que la interacción recibió respuesta o handoff aceptado y que el seguimiento terminó con resultado documentado.

Resolver `VPROC-0057` no cierra automáticamente:

- pedido;
- reclamo;
- reserva;
- venta;
- cartera;
- producción;
- entrega.

La experiencia deberá mantener enlaces de continuidad hacia esos procesos cuando existan.

---

#### 39. Operación degradada

Si falla un canal o integración, la UX deberá permitir distinguir captura manual controlada de operación normal.

Deberá preservarse:

- origen;
- referencia o mensaje original;
- responsable;
- siguiente acción;
- estado de consentimiento;
- incertidumbre de correlación;
- necesidad de reconciliación.

No se reenviará un handoff ambiguo ni se prometerá precio, fecha o capacidad por falta de acceso a la fuente propietaria.

---

#### 40. Datos personales y adjuntos

La UX aplicará minimización antes de almacenar, mostrar, exportar o transferir información.

No mostrará por conveniencia:

- perfil PASS completo;
- historial completo de compras;
- ledger de puntos;
- documentos financieros completos;
- información de crédito;
- documentos de identidad no requeridos;
- datos sensibles no necesarios.

Un adjunto deberá conservar referencia, finalidad, propietario, acceso y vigencia.

Un archivo recibido no se presume válido, vigente, contractual ni prueba de aceptación.

---

#### 41. Acciones sensibles y masivas

Ver una oportunidad no autoriza automáticamente:

- reasignar;
- cerrar;
- marcar ganada;
- exportar;
- contactar;
- modificar en masa.

Cuando exista una acción masiva autorizada, la experiencia deberá mostrar universo, elementos autorizados, exclusiones, efecto, parcialidad y motivo de los elementos no ejecutables.

La selección visual de múltiples filas no constituye autoridad.

---

#### 42. Auditoría e historial

La experiencia deberá permitir reconstruir:

- interacción original;
- `lead_id` cuando exista;
- `opportunity_id`;
- origen y canal;
- campaña o publicación;
- clasificación;
- estado `VPROC-0057`;
- responsable;
- siguiente acción;
- estimaciones y fuentes;
- consentimiento o finalidad;
- handoff solicitado;
- resultado del handoff;
- referencias PULSO posteriores;
- cierre y motivo;
- actor y timestamp de cambios materiales.

La interfaz deberá diferenciar hechos históricos de acciones todavía ejecutables.

---

#### 43. Observabilidad y alertas

La futura experiencia deberá poder señalar, como mínimo:

- interacción sin triage;
- oportunidad sin responsable;
- oportunidad sin siguiente acción;
- oportunidad vencida;
- duplicado no resuelto;
- conflicto de identidad;
- consentimiento ausente o retirado;
- handoff pendiente;
- handoff ambiguo;
- handoff potencialmente duplicado;
- caso PULSO sin correlación cuando debía existir;
- oportunidad cerrada sin motivo;
- oportunidad marcada ganada sin hecho propietario;
- interacción resuelta con proceso derivado todavía sin referencia.

Una alerta no autoriza corregir datos silenciosamente.

---

#### 44. Simplicidad, accesibilidad y divulgación progresiva

La bandeja deberá priorizar trabajo accionable y no densidad de CRM.

La experiencia esencial no dependerá únicamente de:

- color;
- iconos sin etiqueta;
- hover;
- drag-and-drop;
- gestos de precisión;
- abreviaturas técnicas.

La información técnica de integración, IDs externos y payloads se mostrará bajo demanda, sin ocultar bloqueos materiales, vencimientos, consentimientos ni resultados ambiguos.

---

#### 45. Handoff a `AURA-UX-007`

`AURA-UX-006` entrega a `AURA-UX-007` una experiencia capaz de distinguir correctamente:

- interacción comercial;
- comentario público;
- reclamo o caso de servicio;
- origen y canal;
- identidad o contraparte mínima autorizada;
- clasificación de triage;
- campaña o publicación relacionada;
- referencia al proceso propietario cuando exista;
- historial suficiente para no duplicar ni ocultar el caso.

`AURA-UX-007` deberá diseñar reputación, comentarios, respuestas y escalamiento sin convertir comentario público en oportunidad, sin cerrar reclamos por responder públicamente y sin reabrir el pipeline B2B, catering, eventos o handoff comercial fijado aquí.

---

#### 46. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- la separación entre lead, cliente, oportunidad, propuesta y pedido ya está cubierta por requisitos vigentes;
- oportunidades, B2B, catering, origen, contraparte, responsable, etapa, guardas, acciones, resultado y cierre ya cuentan con cobertura AURA;
- identidad, consentimiento, finalidad y correlación ya están protegidos por PASS y autorización transversal;
- pedido, venta, acciones sensibles e idempotencia ya están cubiertos por PULSO;
- canales, leads, identificadores y reconciliación ya están protegidos por integración;
- esta tarea desarrolla la arquitectura de experiencia de obligaciones existentes sin crear una nueva regla protegida;
- no modifica texto, estado, relación, propietario, paquete, ambiente ni evidencia de ninguna fila del registro canónico.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 47. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea reutiliza:

- `TREQ-AURA-003`, para oportunidades, B2B, catering, origen, contraparte, responsable, etapa, fechas, acciones, resultado y cierre, y para separar lead, cliente, oportunidad, propuesta y pedido;
- `TREQ-AURA-002`, para impedir autonomía de IA sobre contacto, aceptación o acciones comerciales y exigir grounding cuando exista asistencia;
- `TREQ-PASS-010`, para identidad, consentimiento, finalidad, correlación y prohibición de fusiones automáticas débiles;
- `TREQ-PASS-011`, para separar solicitudes, reclamos, reservas, comunicaciones, compensaciones y resultados de servicio;
- `TREQ-PASS-012`, para privacidad, revocación y bloqueo de usos futuros afectados;
- `TREQ-PULSO-005` y `TREQ-PULSO-006`, para pedido, venta, acciones sensibles, estados independientes, idempotencia y preservación histórica;
- `TREQ-NUMERA-004`, para presupuesto, costo, margen, escenarios y rentabilidad con método, fuente, versión y vigencia;
- `TREQ-AUTH-018`, para proteger datos de clientes, búsquedas, exportaciones y usos posteriores a revocación;
- `TREQ-INTEGRATION-019`, para leads, canales, identificadores internos y externos, payloads, idempotencia, eventos tardíos y conciliación.

Esta enumeración constituye trazabilidad de cobertura vigente y no crea ni modifica requisitos.

---

#### 48. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la incorporación y compilación documental corresponden al lifecycle local de la tarea |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha insertado ni validado dentro del checkout del usuario |
| REMOTA | PASS | se verificaron continuidad, archivo propietario, topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, `AURA-DOM-007`, estados exactos de `VPROC-0057`, `VPROC-0041`, modalidades B2B, hallazgos `H-CAP-SCOPE-014-018` a `021`, autorización de leads y datos, cobertura 04A y validadores documentales vigentes; además se consumió la versión completa aprobada de `AURA-UX-005` disponible para trabajo adelantado |
| OPERATIVA | NOT_APPLICABLE | la tarea diseña experiencia documental y no captura leads, contacta personas, crea cotizaciones, pedidos, reservas, eventos, ventas ni compromisos reales |
| FÍSICA | NOT_APPLICABLE | la familia `AURA-UX-001` a `AURA-UX-008` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se autorizan runtime, Supabase, integraciones, datos ni despliegues |

---

#### 49. Criterios de aceptación

`AURA-UX-006` queda satisfecha cuando simultáneamente:

1. interacción, consulta, lead, cliente, oportunidad, propuesta, cotización, pedido y compromiso permanecen separados;
2. la bandeja unifica orígenes sin convertir canales en maestros de cliente u oportunidad;
3. `VPROC-0057` conserva exactamente sus nueve estados canónicos;
4. el pipeline proyecta `VPROC-0057` sin crear otra máquina de estados;
5. una interacción recibida no nace como oportunidad calificada;
6. triage distingue oportunidad de reclamo, pedido, consulta y otros procesos;
7. lead no equivale a identidad PASS;
8. oportunidad conserva `opportunity_id`, origen, necesidad, etapa, responsable, siguiente acción y vencimiento;
9. coincidencias débiles no fusionan interacciones o identidades automáticamente;
10. consentimiento y finalidad permanecen visibles y gobernados;
11. una oportunidad activa sin responsable o siguiente acción se identifica como anomalía;
12. valor estimado y probabilidad se presentan como estimaciones y no hechos;
13. la experiencia preserva `B2B-PROG`, `B2B-PUNT`, `CAT-EMP`, `EV-COM` y `B2B-DIST` como modalidades preliminares gobernadas;
14. una compra grande no se clasifica automáticamente como B2B;
15. catering captura requerimientos sin confirmar menú, precio, capacidad, logística o fecha;
16. evento comercial se separa de campaña, publicación y reserva;
17. AURA no promete precio, descuento, crédito, capacidad, inventario, transporte, producción ni fecha firme;
18. `COMMERCIAL_HANDOFF_PENDING` identifica necesidad de transferencia sin crear pedido;
19. el handoff AURA → PULSO muestra el conjunto mínimo que será transferido;
20. aceptar, devolver y rechazar handoff son resultados distintos;
21. handoff aceptado crea o correlaciona caso comercial sin crear cotización ni pedido automáticamente;
22. handoff ambiguo exige reconciliación antes de retry;
23. propuestas, cotizaciones, pedidos y reservas PULSO se muestran como proyecciones autorizadas;
24. PULSO conserva caso comercial, oferta, cotización, pedido y compromiso;
25. PASS conserva identidad y consentimiento;
26. FOGO conserva capacidad productiva;
27. NEXO conserva inventario, reserva física, alistamiento y entrega;
28. ORIGO conserva compras y recepciones;
29. NUMERA conserva costo, margen, crédito, pago, cartera y rentabilidad;
30. reclamos y comentarios públicos no se convierten en oportunidades para evitar su proceso propietario;
31. oportunidad perdida o descartada conserva motivo;
32. oportunidad ganada depende del hecho propietario aplicable;
33. resolver `VPROC-0057` no cierra pedidos, reclamos, reservas, ventas, cartera, producción ni entrega;
34. operación degradada conserva origen, trazabilidad y reconciliación;
35. datos personales y adjuntos aplican minimización, finalidad, acceso y vigencia;
36. ver una oportunidad no autoriza reasignar, cerrar, marcar ganada, exportar o contactar;
37. el historial reconstruye interacción, lead, oportunidad, estado, responsable, handoff y cierre;
38. la observabilidad detecta oportunidades huérfanas, vencidas, duplicadas o con handoff ambiguo;
39. la experiencia esencial no depende solo de color, iconos, hover o drag-and-drop;
40. `AURA-UX-005` conserva campañas, promociones, cupones, experimentos y guardas;
41. `AURA-UX-007` conserva reputación, comentarios, respuestas y escalamiento;
42. se crean y modifican cero requisitos de prueba;
43. no se crea ninguna instancia física;
44. la continuidad queda reservada exclusivamente a `AURA-UX-007`.

---

#### 50. Límites

Esta tarea no autoriza ni ejecuta:

- crear repositorio, runtime, ruta, pantalla o componente de AURA;
- crear tablas, migraciones, vistas, funciones, RPC, triggers, RLS, Storage, Realtime, jobs, colas o Edge Functions;
- capturar leads reales;
- importar conversaciones reales;
- contactar clientes o prospectos;
- crear campañas, promociones o cupones;
- exportar segmentos, listas o datos reales;
- crear o fusionar cuentas PASS;
- modificar consentimientos;
- crear cuentas B2B reales;
- verificar documentos de contrapartes reales;
- crear cotizaciones;
- aprobar precios, descuentos o crédito;
- crear pedidos o ventas;
- reservar capacidad;
- reservar inventario;
- crear órdenes de producción o compra;
- crear reservas comerciales;
- comprometer fechas o entregas;
- emitir facturas;
- crear cartera;
- transferir archivos o datos personales a terceros reales;
- crear adaptadores, APIs o webhooks;
- modificar VISO, PASS, PULSO, NEXO, FOGO, ORIGO o NUMERA;
- definir métricas, atribución, confianza o incrementalidad;
- diseñar reputación, comentario público o respuesta pública de `AURA-UX-007`;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-UX-007`.

---

#### 51. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas`

**TAREA ACTUAL APROBADA**
`AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-007 — Diseñar reputación, comentarios, respuestas y escalamiento`

### ✅ AURA-UX-007 — Diseñar reputación, comentarios, respuestas y escalamiento

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos
**Tarea siguiente:** AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones
**Tipo de tarea:** documental; diseño canónico de la experiencia de inbox reputacional, clasificación, respuesta pública, moderación, escalamiento a servicio, seguimiento y cierre visible de AURA, preservando ownership de PULSO, PASS y VISO y sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — experiencia creativa y comercial`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/04_EXPERIENCIA_CREATIVA_Y_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean rutas, pantallas, componentes, repositorios, cuentas de canal, reseñas, comentarios, respuestas, reclamos, compensaciones, identidades, tablas, migraciones, RLS, funciones, RPC, webhooks, jobs, integraciones, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Diseñar la experiencia con la que AURA deberá recibir y gobernar señales públicas de reputación provenientes de reseñas, comentarios, menciones, valoraciones y otras superficies autorizadas, clasificarlas, priorizarlas, preparar respuestas trazables, escalar a servicio cuando corresponda y mostrar de forma inequívoca qué parte del tratamiento público está resuelta y qué parte continúa abierta en un proceso propietario distinto.

La regla raíz es:

```text
RESEÑA
!= COMENTARIO
!= MENCION
!= FEEDBACK
!= RECLAMO FORMAL
!= CASO DE SERVICIO
!= RESPUESTA PUBLICA
!= RESOLUCION
```

AURA gobierna reputación, contexto público, clasificación, respuesta y seguimiento reputacional. PULSO conserva reclamos, devoluciones, compensaciones y cierre formal de `VPROC-0046`. PASS conserva identidad y consentimiento. VISO conserva la superficie administrativa de servicio prevista.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-UX-006`, para mantener separadas oportunidad comercial, caso B2B y señal reputacional y no convertir comentarios públicos en leads por inferencia;
- `AURA-DOM-009`, para identidad reputacional, clasificación, severidad, respuesta pública, moderación, escalamiento a servicio, reconciliación y cierre reputacional;
- `AURA-DOM-004`, para grounding, separación entre hecho, inferencia y propuesta, trazabilidad de IA y revisión humana;
- `AURA-DOM-005`, para cuentas, endpoints, publicación, idempotencia, resultado ambiguo, retiro y reconciliación externa;
- `AURA-DOM-008`, para impedir que volumen, sentimiento o comentarios se presenten como impacto empresarial sin método y confianza;
- `AURA-AUTH-002`, para separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública;
- `AURA-AUTH-003`, para proteger leads, datos de clientes, exportaciones y acciones masivas cuando una señal reputacional se correlacione con una persona o caso;
- `AURA-AUTH-004`, para credenciales, proveedores, archivos y datos enviados a terceros;
- `VPROC-0046 — Gestionar reclamo, devolución, compensación y aprendizaje de causa`, bajo ownership PULSO;
- `CAP-SCOPE-010`, para separar pregunta, solicitud, reclamo, feedback, devolución, compensación, reserva y comunicación;
- `CAP-SCOPE-014`, especialmente `CAP-14.11 — Gestionar reputación y comentarios públicos`;
- los hallazgos `H-CAP-SCOPE-014-025` y `H-CAP-SCOPE-014-026`;
- el registro canónico de requisitos de prueba vigente;
- la reconciliación topológica de `AURA-UX-001` a `AURA-UX-008`, que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE`.

Ninguna de estas fuentes cambia de propietaria por esta tarea.

---

#### 3. Resultado canónico

AURA deberá ofrecer una experiencia capaz de responder, para cada señal reputacional:

```text
¿DONDE APARECIO?
¿CUAL ES EL ELEMENTO EXACTO?
¿QUE CONTENIDO ORIGINAL SE OBSERVO?
¿QUE PARTE ES HECHO Y QUE PARTE ES INFERENCIA?
¿QUE CLASIFICACION Y SEVERIDAD TIENE?
¿QUE CONFIANZA TIENE ESA CLASIFICACION?
¿REQUIERE RESPUESTA PUBLICA?
¿REQUIERE REVISION HUMANA?
¿REQUIERE ESCALAMIENTO A SERVICIO?
¿EXISTE UN CASO FORMAL RELACIONADO?
¿QUIEN ES RESPONSABLE?
¿QUE RESPUESTA FUE PROPUESTA, APROBADA Y PUBLICADA?
¿EL ESTADO EXTERNO ESTA CONFIRMADO O ES AMBIGUO?
¿QUE PARTE SIGUE ABIERTA FUERA DE AURA?
```

La experiencia se organiza alrededor de seis superficies conceptuales:

1. inbox reputacional;
2. detalle y contexto de la señal;
3. clasificación, riesgo y decisión de tratamiento;
4. preparación, revisión y publicación de respuesta;
5. escalamiento y vínculo con servicio;
6. seguimiento, reconciliación, historial y cierre reputacional.

---

#### 4. Fronteras conceptuales obligatorias

La interfaz deberá preservar explícitamente:

```text
CONTENIDO OBSERVADO != CLASIFICACION != INFERENCIA != HECHO EMPRESARIAL
```

```text
AUTOR PUBLICO != PERSONA CLIENTE CONFIRMADA
```

```text
RESPUESTA PROPUESTA != RESPUESTA APROBADA != RESPUESTA PUBLICADA
```

```text
RESPUESTA PUBLICA PUBLICADA != RECLAMO RESUELTO != COMPENSACION APROBADA
```

```text
PRIORIDAD REPUTACIONAL != PRIORIDAD VPROC-0046
```

```text
ELEMENTO ELIMINADO EN CANAL != PROBLEMA RESUELTO
```

Estas diferencias permanecen aunque una misma vista presente los objetos relacionados.

---

#### 5. Arquitectura de experiencia

La experiencia deberá ofrecer navegación estable entre:

- señal original;
- proveedor y canal;
- marca y sede cuando exista evidencia;
- publicación o campaña relacionada cuando corresponda;
- autor externo mínimo permitido;
- clasificación;
- severidad;
- confianza;
- responsable;
- decisión de tratamiento;
- borrador y versiones de respuesta;
- revisión y aprobación;
- estado externo de publicación;
- moderación cuando exista;
- escalamiento;
- caso formal correlacionado cuando exista;
- seguimiento;
- reconciliación;
- historial y cierre reputacional.

La navegación no convierte estas relaciones en un objeto único ni borra ownership externo.

---

#### 6. Entrada desde AURA-UX-006

La 007 recibe continuidad de experiencia desde la 006 sin absorber el pipeline comercial.

Se conserva:

```text
INTERACCION COMERCIAL
!= SEÑAL REPUTACIONAL
```

Una interacción pública podrá contener una oportunidad comercial, un reclamo, una pregunta o una señal reputacional, pero deberá clasificarse antes de enviarse al proceso correspondiente.

Si existe una necesidad comercial real, la experiencia podrá enlazar con el objeto de AURA-UX-006 sin convertir la señal reputacional en oportunidad automáticamente.

Si existe investigación, remedio o decisión de servicio, el destino correcto será el proceso propietario de servicio y no el pipeline B2B.

---

#### 7. Inbox reputacional canónico

El inbox deberá reunir de forma gobernada reseñas, comentarios, menciones, valoraciones y otras señales públicas autorizadas.

Cada elemento deberá poder resumir:

- tipo de señal;
- canal o proveedor;
- marca;
- sede cuando esté demostrada;
- publicación o campaña correlacionada cuando exista;
- fragmento seguro del contenido;
- timestamp de origen;
- clasificación;
- severidad;
- confianza;
- responsable;
- decisión pendiente;
- estado de respuesta;
- estado de escalamiento;
- referencia de caso formal cuando exista;
- indicadores de ambigüedad, duplicado o reconciliación.

El inbox no reducirá toda la operación a leído/no leído o abierto/cerrado.

---

#### 8. Vistas de trabajo del inbox

La experiencia deberá permitir distinguir, como mínimo:

- sin clasificar;
- clasificados pendientes de decisión;
- pendientes de revisión humana;
- respuestas en preparación;
- respuestas pendientes de aprobación;
- respuestas publicadas pendientes de confirmación;
- escalaciones pendientes;
- elementos vinculados con caso de servicio;
- elementos bajo seguimiento;
- elementos con reconciliación pendiente;
- tratamiento reputacional cerrado con proceso externo todavía abierto;
- completamente cerrados dentro del alcance reputacional.

Una agrupación visual podrá resumir, pero no colapsar estados materialmente distintos.

---

#### 9. Filtros y orden

Los filtros deberán operar sobre atributos autorizados y no ampliar acceso.

Podrán incluir, cuando corresponda:

- canal;
- marca;
- sede demostrada;
- tipo de señal;
- tema;
- severidad;
- confianza;
- responsable;
- estado de tratamiento;
- estado de respuesta;
- estado de escalamiento;
- existencia de caso formal;
- fecha;
- campaña o publicación correlacionada.

Filtrar o seleccionar elementos no concede capacidad para responder, moderar, exportar o ejecutar acciones masivas.

---

#### 10. Detalle de la señal

El detalle deberá mantener separado:

- contenido original observado;
- evidencia de captura;
- identidad externa;
- contexto de publicación;
- clasificación vigente;
- historial de clasificaciones;
- inferencias asistidas;
- fuentes empresariales relacionadas;
- respuestas y versiones;
- escalaciones;
- vínculos con casos formales;
- acciones de moderación;
- eventos de reconciliación;
- historial de responsables.

La interfaz no reescribirá el contenido original para ajustarlo a una clasificación posterior.

---

#### 11. Identidad del elemento

La experiencia deberá hacer visible que:

```text
MISMO TEXTO != MISMO ELEMENTO
```

```text
MISMO AUTOR VISIBLE != MISMA PERSONA CLIENTE
```

```text
MISMA PUBLICACION != MISMO COMENTARIO
```

La identidad deberá apoyarse en identificadores del proveedor, canal, contexto y timestamps cuando estén disponibles.

Una posible duplicidad se presenta como hipótesis revisable y no como fusión automática.

---

#### 12. Observado versus interpretado

La interfaz deberá distinguir visualmente:

- texto observado;
- dato nativo del canal;
- clasificación humana;
- clasificación asistida;
- nivel de confianza;
- inferencia de intención;
- hecho empresarial confirmado desde otra fuente.

Una afirmación del autor no se presenta como verdad confirmada por Vento.

Una etiqueta generada por IA no se presenta como hecho observado.

---

#### 13. Ejes de clasificación

La experiencia deberá permitir revisar por separado:

1. naturaleza de la interacción;
2. tema principal;
3. severidad o riesgo;
4. necesidad de respuesta;
5. necesidad de escalamiento;
6. confianza y limitaciones de la clasificación.

Estos ejes pueden divergir.

Por ejemplo, una reseña positiva puede contener un problema de seguridad que exija escalamiento.

---

#### 14. Naturaleza de la interacción

La clasificación deberá poder representar, cuando aplique:

- pregunta pública;
- reconocimiento o felicitación;
- sugerencia;
- experiencia compartida;
- inconformidad;
- alegación o acusación;
- solicitud de ayuda;
- solicitud de remedio;
- contenido abusivo;
- spam;
- contenido no relacionado;
- señal ambigua.

Estas categorías orientan tratamiento; no crean automáticamente un reclamo formal.

---

#### 15. Tema y contexto

La experiencia podrá referenciar temas como:

- producto;
- calidad percibida;
- servicio;
- pedido;
- entrega;
- pago;
- promoción o beneficio;
- reserva o evento;
- sede;
- canal;
- marca;
- comunicación o campaña;
- privacidad;
- seguridad;
- riesgo material.

El tema no determina por sí solo causa, responsabilidad ni remedio.

---

#### 16. Severidad

La severidad deberá mostrar su razón y no derivarse únicamente del sentimiento.

La experiencia deberá resaltar cuando exista posible:

- afectación a seguridad;
- riesgo legal o regulatorio;
- exposición de datos personales;
- acusación de fraude o conducta grave;
- devolución, reembolso o compensación potencial;
- incidente operacional activo;
- alta difusión pública;
- incidente multicanal;
- riesgo reputacional significativo.

La severidad reputacional no sustituye la prioridad formal del caso de servicio.

---

#### 17. Confianza e incertidumbre

Cuando clasificación, identidad, sede, producto, pedido, campaña, causa o intención sean inciertos, la interfaz deberá conservar la incertidumbre.

Se deberá poder mostrar:

- clasificación propuesta;
- confianza;
- evidencia usada;
- dato faltante;
- necesidad de revisión.

Baja confianza en una decisión material no conduce a silencio automático; conduce a revisión.

---

#### 18. Revisión humana reforzada

La experiencia deberá forzar o destacar revisión humana cuando exista:

- riesgo legal;
- seguridad;
- privacidad;
- acusación grave;
- crisis;
- posible compensación;
- reclamo formal o potencial;
- contenido ambiguo con impacto material;
- respuesta que admita hechos o responsabilidades;
- cuenta sensible;
- fuente con autoridad o frescura dudosa.

Una recomendación asistida no puede saltar esta guarda.

---

#### 19. Responsable y asignación

Todo elemento que requiera acción deberá mostrar responsable vigente y fecha de asignación.

La asignación reputacional no concede automáticamente autoridad para:

- aprobar respuesta;
- publicar;
- moderar;
- compensar;
- cerrar un caso de servicio.

Cambiar de responsable conserva historial y motivo.

---

#### 20. Decisión de tratamiento

La experiencia deberá exigir una decisión explícita entre estados conceptuales como:

- no requiere respuesta;
- requiere respuesta pública;
- requiere revisión adicional;
- requiere conversación privada autorizada;
- requiere escalamiento a servicio;
- requiere escalamiento a otra función competente;
- requiere moderación o reporte;
- requiere monitoreo.

La decisión conserva actor, motivo y timestamp.

---

#### 21. Espacio de preparación de respuesta

El editor o espacio conceptual de respuesta deberá mostrar:

- señal exacta respondida;
- marca y cuenta objetivo;
- tono y lineamientos vigentes;
- borrador actual;
- versiones previas;
- fuentes usadas para afirmaciones materiales;
- alertas de privacidad;
- alertas de hechos no comprobados;
- estado de revisión;
- estado de aprobación;
- estado de publicación.

Una respuesta no se considera publicada por estar aprobada.

---

#### 22. Grounding de respuestas

Antes de aprobar una respuesta con afirmaciones materiales, la experiencia deberá permitir verificar su fuente.

No se presentará como confirmado sin evidencia suficiente:

- composición o atributo específico de producto;
- aprobación de devolución o reembolso;
- fecha de entrega;
- disponibilidad;
- responsabilidad de una persona;
- compensación;
- conclusión de investigación;
- falsedad de una reseña;
- resolución de un caso todavía abierto.

La UI deberá favorecer la corrección factual sobre la velocidad de respuesta.

---

#### 23. Privacidad en público

Antes de publicar, la experiencia deberá detectar o advertir exposición innecesaria de:

- nombre completo;
- teléfono;
- correo;
- dirección;
- datos de pago;
- identificadores sensibles de pedido;
- detalle interno de investigación;
- documentos;
- datos laborales;
- información de terceros;
- compensaciones confidenciales.

Cuando se requiera información privada, la acción correcta será mover la conversación a un canal autorizado, no solicitar datos sensibles en público.

---

#### 24. Paso de público a privado

Mover una conversación deberá conservar:

- elemento público origen;
- razón del cambio de canal;
- canal privado autorizado;
- responsable;
- timestamp;
- correlación posterior;
- restricciones de minimización.

La UI deberá mantener visible:

```text
CONVERSACION TRASLADADA A PRIVADO != CASO RESUELTO
```

---

#### 25. Asistencia de IA

La IA podrá ayudar a:

- resumir;
- proponer tema;
- sugerir sentimiento;
- detectar señales de riesgo;
- proponer borradores;
- comparar tono de marca;
- detectar posible duplicidad;
- priorizar revisión.

La experiencia deberá impedir presentar como acción ejecutable autónoma:

- publicar respuesta;
- responder crisis;
- admitir responsabilidad;
- negar hechos no comprobados;
- prometer compensación;
- crear o cerrar reclamos;
- moderar contenido;
- identificar definitivamente una persona cliente.

---

#### 26. Segregación visible de acciones

La experiencia deberá mantener acciones, estados y permisos diferenciados para:

```text
CLASIFICAR
!= PROPONER RESPUESTA
!= REVISAR RESPUESTA
!= APROBAR RESPUESTA
!= PUBLICAR RESPUESTA
!= MODERAR
!= ESCALAR A SERVICIO
!= CERRAR CASO DE SERVICIO
```

La UI nunca utilizará un único botón o estado que haga parecer equivalentes estas decisiones.

---

#### 27. Ciclo visible de respuesta

La respuesta deberá mostrar un ciclo explícito, como mínimo conceptual:

```text
SIN_RESPUESTA_DEFINIDA
-> BORRADOR
-> REVISION
-> APROBACION
-> LISTA_PARA_PUBLICAR
-> PUBLICACION_SOLICITADA
-> PUBLICADA_CONFIRMADA
```

Y deberá permitir estados no terminales o excepcionales como:

```text
PUBLICACION_AMBIGUA
RECONCILIACION_REQUERIDA
CORRECCION_REQUERIDA
RETIRO_REQUERIDO
```

Estos nombres son representación UX del contrato y no crean un nuevo namespace técnico propietario.

---

#### 28. Disparadores de escalamiento a servicio

La experiencia deberá destacar escalamiento cuando exista necesidad de investigación, decisión o remedio formal, incluyendo:

- devolución;
- reembolso;
- reposición;
- compensación;
- problema de pedido, entrega, pago o beneficio;
- inconformidad que requiera decisión formal;
- incidente de seguridad, salud o privacidad;
- repetición de un problema que exija investigación de causa;
- evidencia que deba gestionarse mediante expediente formal;
- situación en la que responder públicamente no sea suficiente.

Escalar no presupone responsabilidad ni validez del reclamo.

---

#### 29. Proyección de `VPROC-0046`

Cuando exista caso formal relacionado, AURA deberá mostrar únicamente una proyección autorizada del proceso propietario.

Los estados canónicos preservados son:

```text
CLAIM_RECEIVED
-> TRIAGE_IN_PROGRESS
-> EVIDENCE_PENDING
-> UNDER_INVESTIGATION
-> RESOLUTION_PROPOSED
-> AUTHORIZATION_PENDING
-> REMEDY_IN_PROGRESS
-> CAUSE_ACTION_PENDING
-> CUSTOMER_VALIDATION_PENDING
-> CLAIM_CASE_CLOSED
```

AURA no podrá editar esas transiciones desde la experiencia reputacional.

---

#### 30. Handoff mínimo a servicio

La acción de escalar deberá mostrar y confirmar únicamente el contexto necesario:

- identidad del elemento reputacional;
- canal y referencia externa;
- texto o evidencia relevante;
- timestamp;
- marca y sede demostradas;
- producto, publicación, campaña, pedido o venta correlacionados con evidencia cuando existan;
- motivo de escalamiento;
- clasificación y limitaciones;
- riesgo observado;
- respuestas públicas ya emitidas;
- identidad cliente únicamente cuando exista correlación autorizada;
- adjuntos permitidos.

La UI no ofrecerá por defecto copiar un perfil completo del cliente.

---

#### 31. Resultado del handoff

La experiencia deberá distinguir claramente:

- aceptado y correlacionado;
- devuelto por información insuficiente;
- rechazado por proceso incorrecto;
- ya existente y deduplicado;
- resultado desconocido pendiente de reconciliación.

Estos resultados no comparten un mismo estado de éxito/fallo.

---

#### 32. Handoff ambiguo

Si no se conoce el resultado de una transferencia, la experiencia deberá bloquear el reintento ciego cuando exista riesgo de duplicar casos.

Se conserva:

```text
RESULTADO DESCONOCIDO != HANDOFF FALLIDO
```

La UI deberá orientar a reconciliación antes de volver a transferir.

---

#### 33. Autor desconocido o no vinculado

Una señal pública podrá existir sin identidad PASS conocida.

La experiencia deberá poder mostrar:

```text
AUTOR PUBLICO NO VINCULADO
```

sin forzar:

- creación de cuenta PASS;
- fusión por nombre;
- fusión por correo o teléfono no verificados;
- enriquecimiento innecesario de perfil.

Una correlación posterior conserva cuándo y bajo qué evidencia se estableció.

---

#### 34. Correlación con pedido o venta

Cuando se intente relacionar una señal con pedido o venta, la UI deberá mostrar la fuente de la correlación y su confianza.

No bastan por sí solos:

- fecha aproximada;
- nombre visible;
- producto mencionado;
- publicación de campaña;
- sede inferida.

La experiencia no permitirá revelar públicamente que una persona realizó una compra como consecuencia de una coincidencia débil.

---

#### 35. Calificación, feedback y reclamo

La experiencia deberá representar explícitamente:

```text
CALIFICACION BAJA != RECLAMO AUTOMATICO
```

```text
FEEDBACK != RECLAMO != CONVERSACION
```

Una señal negativa puede activar revisión o sugerir escalamiento, pero no abrir ni cerrar por sí sola un caso formal.

---

#### 36. Resultado de servicio de vuelta a AURA

Cuando el caso formal cambie, AURA podrá mostrar una proyección mínima autorizada, como:

- referencia de caso;
- estado general utilizable externamente;
- existencia de una decisión comunicable;
- confirmación de que un seguimiento público es permitido;
- timestamp de cambio;
- resultado externo seguro cuando corresponda.

La experiencia no requiere el expediente interno completo de servicio.

---

#### 37. Estado público y estado de servicio separados

La UI deberá poder mostrar simultáneamente combinaciones como:

| Tratamiento público | Caso de servicio | Lectura correcta |
| --- | --- | --- |
| pendiente | no creado | requiere decisión reputacional |
| completado | abierto | comunicación pública atendida; servicio continúa |
| pendiente | cerrado | caso formal terminó; comunicación pública todavía pendiente |
| completado | cerrado | ambos frentes completados |
| sin respuesta deliberada | abierto | silencio público decidido; servicio continúa |

No se utilizará un único booleano `resolved`.

---

#### 38. Compensaciones y remedios

AURA no deberá presentar controles para aprobar o ejecutar desde esta experiencia:

- devolución;
- reembolso;
- reposición;
- descuento;
- cortesía;
- cupón;
- puntos;
- crédito;
- otro efecto económico.

La experiencia podrá comunicar un remedio únicamente después de recibir una decisión autorizada desde su dominio propietario.

---

#### 39. Moderación

Responder y moderar permanecen acciones distintas.

La experiencia de moderación deberá mostrar, cuando exista soporte del proveedor:

- política aplicable;
- motivo;
- autoridad requerida;
- acción solicitada;
- resultado externo;
- timestamp;
- evidencia;
- necesidad de reconciliación.

Un comentario incómodo o negativo no podrá clasificarse automáticamente como spam para mejorar métricas.

---

#### 40. Edición o eliminación del contenido fuente

La experiencia deberá distinguir:

```text
ELEMENTO EDITADO
!= HISTORIA ANTERIOR BORRADA
```

```text
ELEMENTO ELIMINADO
!= PROBLEMA RESUELTO
```

Cuando el proveedor cambie o elimine el contenido, AURA deberá mostrar la versión externa vigente y conservar la evidencia histórica permitida según retención y privacidad.

---

#### 41. Corrección o retiro de respuesta propia

Si Vento debe corregir, editar o retirar una respuesta, la experiencia deberá conservar:

- relación con la versión anterior;
- motivo;
- autoridad;
- nueva versión;
- acción externa solicitada;
- estado confirmado o ambiguo;
- timestamp.

No se sobrescribe silenciosamente la historia.

La corrección de respuesta no cambia automáticamente el estado de `VPROC-0046`.

---

#### 42. Idempotencia y reconciliación

La UI deberá impedir que doble clic, retry, timeout o recuperación de conexión se presenten como razón suficiente para repetir una publicación o moderación.

Cuando el resultado externo sea ambiguo deberá mostrar:

```text
RECONCILIACION_REQUERIDA
```

antes de volver a ejecutar una acción potencialmente duplicable.

---

#### 43. Eventos tardíos y fuera de orden

Un evento externo tardío no deberá hacer que la experiencia:

- recree un elemento ya conciliado;
- reabra automáticamente un caso formal cerrado;
- marque una respuesta antigua como vigente;
- convierta eliminación externa en resolución;
- duplique una moderación.

La UI deberá preferir historial y reconciliación antes que reescritura silenciosa.

---

#### 44. No responder como decisión explícita

Cuando un elemento revisado no deba recibir respuesta, la experiencia deberá registrar la decisión y su motivo.

Podrá corresponder a:

- política;
- duplicidad;
- spam confirmado;
- conversación ya trasladada;
- riesgo de amplificación;
- limitación del canal;
- otra razón aprobada.

Falta de asignación, error técnico o elemento perdido no se presentarán como decisión deliberada de no responder.

---

#### 45. Seguimiento

El seguimiento deberá conservar lineage con el elemento original cuando:

- el caso formal siga abierto;
- la respuesta publicada requiera confirmación;
- exista nueva réplica material;
- el problema se repita;
- aumente el riesgo reputacional;
- la función competente solicite actualización pública.

La interfaz no creará otra identidad de caso por comodidad.

---

#### 46. Crisis, seguridad, privacidad y riesgo legal

Cuando exista posible crisis, seguridad, privacidad o riesgo legal, la experiencia deberá:

- bloquear automatización autónoma de respuesta;
- destacar revisión humana obligatoria;
- preservar evidencia;
- escalar a la función competente;
- impedir promesas antes de decisión;
- mantener trazabilidad reputacional sin adquirir ownership de la investigación.

La rapidez de respuesta no prevalece sobre estas guardas.

---

#### 47. Alegaciones y hechos no comprobados

La experiencia deberá permitir distinguir:

- afirmación del autor;
- hecho confirmado;
- hecho contradicho por evidencia;
- asunto no comprobado;
- opinión subjetiva.

Un borrador que transforme una inferencia interna en afirmación pública deberá mostrar una guarda antes de aprobación.

---

#### 48. Incidentes con múltiples elementos

Cuando varias señales puedan pertenecer al mismo incidente, la experiencia podrá agruparlas sin destruir identidades fuente.

La agrupación deberá conservar:

- cada elemento;
- cada autor;
- cada canal;
- regla de agrupación;
- confianza;
- posibilidad de separar elementos;
- relación con uno o varios casos formales.

Agrupar no fusiona personas ni crea causa confirmada.

---

#### 49. Reputación por marca, sede y producto

Toda asociación a marca, sede o producto deberá mostrar fuente o evidencia suficiente.

No se inferirá sede únicamente por ubicación aproximada, horario o producto común.

No se creará un producto alternativo desde texto libre.

Cuando la correlación sea incierta, la interfaz deberá conservar ese estado en vez de completar el dato por conveniencia.

---

#### 50. Privacidad de trabajadores y terceros

Una mención pública a una persona trabajadora o tercero no autoriza exponer:

- expediente laboral;
- desempeño;
- medidas internas;
- identidad completa innecesaria;
- datos del cliente;
- investigación reservada.

Si se requiere investigación laboral, disciplinaria, legal o de seguridad, la experiencia deberá escalar al propietario competente sin crear un expediente paralelo en AURA.

---

#### 51. Evidencia audiovisual y archivos

Fotografías, videos, capturas y adjuntos deberán mostrarse bajo minimización y acceso por finalidad.

La experiencia no deberá ofrecer envío automático de ese contenido a proveedores de IA o terceros.

Los archivos deberán conservar referencia, propietario, vigencia, sensibilidad y acceso gobernado cuando corresponda.

---

#### 52. Auditoría e historial

Toda acción material deberá poder reconstruir:

- actor;
- acción;
- objeto;
- versión;
- motivo;
- timestamp;
- fuente;
- autorización relevante;
- resultado;
- referencia externa;
- referencia de caso formal cuando exista.

Cambios posteriores de clasificación, severidad, responsable, correlación, respuesta o vínculo con caso no borran el estado histórico que sustentó decisiones anteriores.

---

#### 53. Cierre reputacional

El tratamiento reputacional podrá cerrarse cuando:

- la clasificación y decisión estén registradas;
- cualquier respuesta requerida tenga estado externo conocido o excepción explícita;
- cualquier escalamiento requerido tenga resultado conocido;
- no existan acciones reputacionales pendientes sin responsable;
- la relación con procesos externos permanezca visible;
- el cierre no falsee el estado del servicio.

Se preserva:

```text
TRATAMIENTO REPUTACIONAL CERRADO
!= CASO DE SERVICIO CERRADO
```

---

#### 54. Handoff a AURA-UX-008

La siguiente experiencia podrá recibir de la 007 únicamente señales gobernadas y resultados reputacionales trazables, incluyendo cuando corresponda:

- volumen por tipo y canal;
- tiempos de observación, clasificación, respuesta y escalamiento;
- distribución de temas y severidad;
- estado de respuesta;
- estado de escalamiento;
- relación con caso formal;
- resultados externos reconciliados;
- confianza e incertidumbre;
- tendencias agregadas autorizadas.

Se preserva:

```text
SEÑAL REPUTACIONAL != CAUSA DEMOSTRADA != IMPACTO EMPRESARIAL
```

`AURA-UX-008` podrá presentar resultados y recomendaciones, pero no deberá reinterpretar un cierre público como cierre de servicio ni convertir volumen de comentarios en causalidad.

---

#### 55. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la separación entre reputación y servicio, el gobierno de respuestas públicas, la prohibición de autonomía sensible de IA, identidad, privacidad, idempotencia, reconciliación y fronteras AURA/PULSO/PASS ya están cubiertos por requisitos vigentes. Esta tarea desarrolla la experiencia prevista por esa cobertura sin ampliar el registro.

---

#### 56. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-003`, para reputación, resultados, cierre y separación entre respuesta pública y reclamo formal;
- `TREQ-AURA-002`, para grounding, privacidad, trazabilidad de IA y prohibición de respuesta autónoma sensible;
- `TREQ-AURA-001`, para identidad, versión, aprobación, publicación y trazabilidad de contenido;
- `TREQ-PASS-011`, para preguntas, solicitudes, reclamos, feedback, decisión, comunicación y cierre separados;
- `TREQ-PASS-010`, para identidad, consentimiento y prohibición de fusiones implícitas;
- `TREQ-INTEGRATION-019`, para comentarios, identificadores internos/externos, payloads, estados, idempotencia, reintentos y reconciliación;
- la cobertura vigente de PULSO asociada a reclamos, devoluciones, compensaciones y acciones sensibles;
- la cobertura transversal vigente de autorización, privacidad, auditoría y evidencia.

Esta enumeración es trazabilidad de cobertura existente y no constituye creación ni modificación del registro.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la compilación documental corresponde a la incorporación mediante el lifecycle del repositorio y no se ejecutó desde esta entrega |
| LOCAL | NOT_EXECUTED | el artefacto todavía no se ha incorporado al checkout del usuario ni sometido allí a formatter, quality, delivery check y batería global |
| REMOTA | PASS | se verificaron protocolo, contrato de entrega, continuidad, topología `DEFINE_ONCE`/`NO_PHYSICAL_INSTANCE`, owner AURA, `AURA-DOM-009`, `AURA-AUTH-002`, `AURA-AUTH-003`, los estados canónicos de `VPROC-0046`, ownership PULSO, hallazgos reputacionales 025/026, cobertura 04A aplicable, package.json y lifecycle documental vigentes; además se utiliza como base adelantada el artefacto completo aprobado de `AURA-UX-006` sin tratarlo como publicado |
| OPERATIVA | NOT_APPLICABLE | no se consultaron cuentas, reseñas, comentarios, clientes, reclamos ni casos reales y no se ejecutó ninguna respuesta o moderación |
| FÍSICA | NOT_APPLICABLE | la tarea es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no crea código, datos, permisos, integraciones, Supabase ni despliegues |

---

#### 58. Criterios de aceptación

La tarea queda sustantivamente completa cuando se cumple simultáneamente:

1. existe inbox reputacional separado del pipeline comercial;
2. reseña, comentario, mención, feedback, reclamo y caso formal permanecen objetos distintos;
3. contenido observado, clasificación, inferencia y hecho empresarial se distinguen visualmente;
4. autor público no se presenta como identidad PASS por inferencia;
5. clasificación conserva naturaleza, tema, severidad, escalamiento y confianza por separado;
6. sentimiento no decide por sí solo routing ni cierre;
7. baja confianza material conduce a revisión;
8. elementos que requieren acción tienen responsable;
9. no respuesta puede ser una decisión explícita y no un fallo oculto;
10. respuesta pública conserva señal origen, versión, fuentes, actores y estado externo;
11. privacidad pública impide exponer datos sensibles;
12. mover a privado no cierra el asunto;
13. IA puede asistir pero no publicar, moderar, compensar ni resolver crisis de forma autónoma;
14. clasificar, proponer, revisar, aprobar, publicar, moderar y escalar permanecen separados;
15. existen disparadores claros para escalamiento a servicio;
16. `VPROC-0046` mantiene sus estados y ownership PULSO;
17. AURA consume `VPROC-0046` solo como proyección autorizada;
18. handoff de servicio minimiza datos;
19. handoff aceptado, devuelto, rechazado, deduplicado y ambiguo permanecen distintos;
20. resultado ambiguo se reconcilia antes de retry;
21. correlación con pedido o venta exige evidencia;
22. calificación baja no crea reclamo automáticamente;
23. tratamiento público y servicio muestran estados independientes;
24. AURA no decide devoluciones, reembolsos, compensaciones ni otros remedios;
25. moderación exige política, autoridad y trazabilidad;
26. contenido negativo legítimo no se clasifica como spam por conveniencia;
27. edición o eliminación externa no prueba resolución ni borra historia;
28. corrección o retiro de respuesta conserva lineage;
29. publicaciones y moderaciones potencialmente duplicables son idempotentes y reconciliables;
30. eventos tardíos no reescriben estados terminales válidos;
31. prioridad reputacional y prioridad de servicio permanecen distintas;
32. crisis, seguridad, privacidad y riesgo legal fuerzan revisión humana apropiada;
33. alegaciones no se presentan como hechos confirmados;
34. incidentes multi-elemento conservan identidad de cada señal y autor;
35. marca, sede y producto no se completan sin evidencia;
36. privacidad de trabajadores y terceros queda protegida;
37. evidencia audiovisual no se envía automáticamente a IA o terceros;
38. historial y auditoría preservan decisiones anteriores;
39. cierre reputacional no falsea el estado de servicio;
40. el handoff a `AURA-UX-008` entrega señales y resultados gobernados, no causalidad inventada;
41. se crean y modifican cero requisitos de prueba;
42. no se crea ninguna instancia física;
43. la siguiente tarea reservada es exactamente `AURA-UX-008`.

---

#### 59. Límites

Esta tarea no autoriza ni ejecuta:

- conectar cuentas o proveedores externos;
- leer reseñas, comentarios o menciones reales;
- publicar respuestas reales;
- editar o retirar respuestas reales;
- ocultar, borrar o reportar contenido real;
- crear bots de moderación;
- crear modelos de sentimiento o clasificación;
- seleccionar proveedor de IA;
- enviar contenido real a IA o terceros;
- crear cuentas PASS desde identidades públicas;
- identificar clientes por inferencia;
- abrir, modificar o cerrar reclamos reales;
- ejecutar devoluciones, reembolsos o compensaciones;
- modificar pedidos o ventas;
- crear tablas, vistas, funciones, RPC, triggers o migraciones;
- modificar Supabase, RLS, Storage, Realtime o Edge Functions;
- redefinir `VPROC-0046`;
- diseñar adaptadores, webhooks, OAuth o payloads de `AURA-INT-001`;
- definir contratos físicos de `AURA-INT-002`;
- asignar permisos concretos de `AURA-AUTH-*`;
- redefinir métricas o atribución de `AURA-DOM-008`;
- crear o modificar requisitos del registro 04A;
- iniciar implementación física;
- adelantar `AURA-UX-008`.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos`

**TAREA ACTUAL APROBADA**
`AURA-UX-007 — Diseñar reputación, comentarios, respuestas y escalamiento`

**SIGUIENTE TAREA RESERVADA**
`AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones`

### [ ] AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones
