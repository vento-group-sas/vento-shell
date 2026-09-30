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

### [ ] AURA-UX-004 — Diseñar aprobación y publicación multicanal con estado y recuperación claros

### [ ] AURA-UX-005 — Diseñar campañas, promociones, cupones, experimentos y guardas

### [ ] AURA-UX-006 — Diseñar bandeja de oportunidades, B2B, catering y eventos

### [ ] AURA-UX-007 — Diseñar reputación, comentarios, respuestas y escalamiento

### [ ] AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones
