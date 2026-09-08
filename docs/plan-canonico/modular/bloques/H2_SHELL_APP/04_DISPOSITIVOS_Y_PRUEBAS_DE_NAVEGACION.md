### MINI-BLOQUE — DISPOSITIVOS, PRUEBAS Y SANEAMIENTO DE NAVEGACIÓN

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **dispositivos, pruebas y saneamiento de navegación** dentro de **H2 SHELL APP**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `SHELL-APP-017` a `SHELL-APP-021` — 5 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `SHELL-APP-017`: Diseñar experiencia para computador
- `SHELL-APP-018`: Diseñar experiencia para tablet
- `SHELL-APP-019`: Probar navegación por rol
- `SHELL-APP-020`: Probar navegación con bloqueos reales
- `SHELL-APP-021`: Retirar placeholders de perfil y configuración sin destino real
<!-- PLAN-SECTION-META:END -->

### ✅ SHELL-APP-017 — Diseñar experiencia para computador

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-016 — Conservar tarea en curso cuando corresponda
**Tarea siguiente:** SHELL-APP-018 — Diseñar experiencia para tablet
**Tipo de tarea:** documental de diseño de experiencia para computador; contrato de composición, jerarquía e interacción de SHELL; materialización física posterior según topología `PER_IMPLEMENTATION_UNIT`
**Bloque:** H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/04_DISPOSITIVOS_Y_PRUEBAS_DE_NAVEGACION.md`
**Estado físico resultante:** contrato documental de experiencia de SHELL para computador definido; runtime de SHELL, consumidores y componentes compartidos sin modificaciones
**Cambios físicos autorizados:** ninguno; no se modifican código, componentes compartidos, navegación runtime, autorización, contratos físicos, Supabase, datos, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la experiencia canónica de SHELL cuando se utiliza en un computador, conservando la semántica aprobada de contexto laboral, trabajo pendiente, página inicial, navegación entre aplicaciones, retorno seguro, resolución de contexto y continuidad del trabajo.

La tarea transforma esas decisiones en una composición de escritorio verificable sin convertir el tamaño de pantalla en una fuente de autoridad, sin trasladar lógica empresarial a SHELL y sin anticipar la experiencia específica de tablet.

#### 2. Resultado de la tarea

La experiencia de computador queda definida como una superficie `task-first` de baja a media densidad contextual, orientada a que el actor comprenda rápidamente:

1. bajo qué contexto está operando;
2. cuál es su obligación actual;
3. qué acción principal puede realizar;
4. qué estado, bloqueo o condición de continuidad afecta el trabajo;
5. qué obligaciones vienen después;
6. qué accesos secundarios están disponibles.

La pantalla amplia se utiliza para mejorar orientación, comparación local y persistencia visual del contexto, no para exhibir indiscriminadamente más controles, aplicaciones, datos o capacidades.

#### 3. Decisión central

```text
COMPUTADOR
!= BACKOFFICE UNIVERSAL

PANTALLA GRANDE
!= MAYOR AUTORIDAD

SHELL EN COMPUTADOR
= CONTEXTO VISIBLE
+ FOCO DE TRABAJO DOMINANTE
+ ACCION PRINCIPAL CLARA
+ ESTADO Y CONTINUIDAD
+ OBLIGACIONES SECUNDARIAS
+ NAVEGACION DE APOYO
```

La experiencia de computador no altera el significado empresarial del trabajo ni la política de acceso ya resuelta por servidor.

#### 4. Clasificación de densidad por defecto

El Hub laboral de SHELL en computador adopta `D1_CONTEXTUAL` como densidad ordinaria.

`D1_CONTEXTUAL` permite mostrar el foco actual junto con contexto, estado y siguientes obligaciones sin convertirse en una superficie analítica o administrativa densa.

No se eleva a `D2_COMPARATIVE`, `D3_ANALYTICAL` o `D4_SPECIALIZED` por ninguna de estas razones aisladas:

- el dispositivo es un computador;
- la pantalla es grande;
- existe teclado y mouse;
- el actor tiene un rol jerárquico;
- el actor posee permisos amplios;
- una aplicación propietaria tiene muchas funciones;
- existen numerosas filas, tablas o métricas disponibles.

#### 5. Trabajo administrativo desde SHELL

Un `work_item` administrativo real puede convertirse en el foco actual de SHELL.

En ese caso, SHELL continúa siendo `D1_CONTEXTUAL` y muestra la obligación, su contexto mínimo, estado y acción principal. Si la ejecución requiere una superficie `D2`, `D3` o `D4`, la acción conduce al workspace especializado de la aplicación propietaria.

```text
FOCO ADMINISTRATIVO EN SHELL
-> ORIENTAR
-> EXPLICAR
-> NAVEGAR

NO
-> REPLICAR EL BACKOFFICE PROPIETARIO
```

#### 6. Orden semántico obligatorio

La experiencia de computador conserva este orden conceptual:

```text
1. CONTEXTO ESENCIAL
2. FOCO ACTUAL
3. ACCION PRINCIPAL
4. ESTADO O BLOQUEO
5. SIGUIENTES OBLIGACIONES RESUMIDAS
6. ACCESOS SECUNDARIOS
```

La composición visual puede aprovechar el ancho disponible, pero no puede invertir esa jerarquía ni hacer que los accesos a aplicaciones compitan con el foco de trabajo.

#### 7. Estructura general de escritorio

En un computador con ancho suficiente, SHELL puede distribuirse en dos regiones estructurales principales:

```text
+----------------------+-------------------------------------------+
| NAVEGACION DE APOYO  | ESPACIO PRINCIPAL DE TRABAJO              |
|                      |                                           |
| trabajo y destinos   | contexto                                  |
| permitidos           | foco actual                               |
|                      | accion principal                          |
|                      | estado / bloqueo / continuidad             |
|                      | siguientes obligaciones                   |
|                      | accesos secundarios                       |
+----------------------+-------------------------------------------+
```

La navegación lateral es apoyo; el espacio principal conserva la prioridad visual y semántica.

#### 8. Jerarquía dentro del espacio principal

En ancho amplio, el espacio principal puede usar una composición asimétrica:

```text
CONTEXTO

+--------------------------------------+----------------------+
| FOCO ACTUAL                          | SIGUIENTES            |
|                                      |                      |
| tarea                                | DESPUES              |
| propietario                          | EN ESPERA            |
| estado                               | BLOQUEADAS           |
| accion principal                     |                      |
| continuidad / evidencia minima       |                      |
+--------------------------------------+----------------------+

ACCESOS SECUNDARIOS
```

La región de foco debe conservar mayor peso que la región de obligaciones secundarias. No se utilizan varias columnas equivalentes que conviertan todas las opciones en prioridades competidoras.

#### 9. Reflujo dentro de computador

Cuando el ancho disponible disminuya por ventana reducida, zoom, panel lateral del sistema o multitarea, la composición debe reordenarse manteniendo el mismo significado:

```text
CONTEXTO
FOCO ACTUAL
ACCION PRINCIPAL
ESTADO / BLOQUEO / CONTINUIDAD
DESPUES
EN ESPERA
BLOQUEADAS
ACCESOS SECUNDARIOS
```

Una ventana estrecha de computador no se convierte semánticamente en la experiencia de tablet. La clasificación por dispositivo y la composición táctil específica permanecen separadas.

#### 10. Sin breakpoint semántico universal nuevo

Esta tarea no crea un número canónico de píxeles, `rem`, puntos o resolución para decidir cuándo un computador deja de usar una distribución lateral.

La implementación física posterior podrá reutilizar primitivas responsive compatibles, pero deberá preservar la jerarquía definida aquí y demostrar su comportamiento en los tamaños objetivo reales.

#### 11. Cabecera

La cabecera de computador conserva funciones globales y breves:

- identidad visual de Vento/SHELL;
- identidad de aplicación cuando corresponda;
- estado global material cuando sea necesario;
- acciones de sesión realmente disponibles;
- acceso al mecanismo de navegación cuando la composición lo requiera.

La cabecera no se convierte en una barra de herramientas empresarial universal y no concentra acciones de negocio ajenas al foco actual.

#### 12. Contexto laboral visible

`Turno`, `Sede`, `Área` y `Rol operativo` permanecen visibles de forma compacta antes del foco o inmediatamente asociados a él.

Son hechos resueltos, no selectores de autoridad.

Una presentación válida puede usar una franja de contexto, una región de `AppShell` o una composición equivalente, siempre que:

- el actor pueda identificar el contexto vigente antes de actuar;
- una selección visual no fabrique contexto;
- la sede administrativa filtrada no sustituya la sede operativa;
- el último valor visto no se use como fallback autoritativo.

#### 13. Contexto no es navegación

La zona de contexto no actúa como menú de cambio silencioso de sede, área, turno o rol.

Si existe un flujo legítimo de cambio de contexto, ese flujo debe:

1. ser explícito;
2. comprobar trabajo en curso;
3. resolver los efectos sobre claim, borrador, custodia y pendientes;
4. obtener un `AccessContext` nuevo;
5. revalidar la obligación y la acción disponible.

#### 14. Navegación de apoyo

La navegación persistente de computador se organiza por trabajo, intención y destinos relevantes, no como inventario completo de módulos o entidades.

Puede proyectar los estados compartidos ya existentes:

- `PRIMARY`;
- `SECONDARY`;
- `DISCOVERABLE`;
- `CONTEXTUAL_DISABLED`;
- `REQUIRED_BLOCKED`.

Estos son estados de presentación y no decisiones de autorización.

#### 15. Navegación persistente no implica visibilidad total

Tener espacio para una barra lateral no autoriza a mostrar todas las aplicaciones, pantallas o acciones del ecosistema.

La navegación se construye únicamente sobre destinos ya resueltos como relevantes y visibles para el actor y contexto vigentes.

Los destinos bloqueados que deban permanecer comprensibles se representan con su semántica de bloqueo; los destinos irrelevantes o no revelables no se agregan como relleno.

#### 16. Aplicaciones como acceso secundario

El catálogo de aplicaciones no domina la página inicial laboral de computador.

Los accesos a aplicaciones pueden aparecer como navegación o región secundaria cuando sean pertinentes, pero se subordinan al trabajo actual.

```text
TAREA
-> DESTINO PROPIETARIO

NO

APLICACION
-> BUSCAR QUE HACER
```

#### 17. Foco actual

SHELL muestra como máximo un foco principal `AHORA`.

El foco debe corresponder a un `work_item` real y contener una presentación humana suficiente para reconocer:

- qué obligación es;
- qué aplicación la posee;
- qué estado público tiene;
- qué recurso o resultado humano está implicado cuando sea necesario;
- qué acción principal procede o por qué no procede.

#### 18. El foco no duplica el contrato empresarial

La región `AHORA` consume una proyección autorizada del trabajo. No almacena una copia mutable del recurso, del proceso ni del estado empresarial únicamente para renderizar la pantalla.

SHELL no modifica `work_item.status` por presentar, enfocar, abrir o navegar.

#### 19. Acción principal

La acción principal aparece físicamente próxima al foco que modifica o abre.

No se separa en una barra global distante cuando esa separación pueda hacer ambiguo el objeto sobre el cual actuará.

La acción:

- utiliza lenguaje humano;
- representa una intención vigente;
- no envía estado objetivo como autoridad;
- no reutiliza una decisión `ALLOW` anterior;
- conduce a la superficie propietaria cuando la ejecución no pertenece a SHELL.

#### 20. Una sola acción primaria dominante

La superficie principal evita múltiples CTA con peso equivalente.

Acciones de orientación, consulta, revisión o acceso secundario pueden existir con jerarquía menor, pero no compiten visualmente con la acción ordinaria del foco.

Las acciones excepcionales no se elevan a la misma prominencia que la acción normal solo porque exista espacio disponible.

#### 21. Estado, bloqueo y continuidad

El estado material del foco aparece asociado a la obligación y a su acción.

La experiencia distingue, cuando aplique:

- disponible para continuar;
- en validación;
- en espera;
- bloqueado;
- requiere actualizar;
- requiere reautorización;
- conflicto;
- conciliación requerida;
- resultado desconocido;
- completado o supersedido.

La etiqueta visible no sustituye el estado canónico del propietario.

#### 22. Trabajo ya iniciado

Un `IN_PROGRESS` válido permanece como foco por defecto aunque exista nuevo trabajo ordinario en la cola.

Una nueva tarjeta, una aplicación recién abierta, una notificación o una obligación de menor compromiso no desplazan silenciosamente una tarea iniciada.

Las interrupciones de seguridad, emergencia, custodia crítica o política explícita conservan su tratamiento específico.

#### 23. `CLAIMED` no equivale a `IN_PROGRESS`

Una tarea reclamada pero todavía no iniciada conserva una presentación distinta de una tarea en ejecución.

La interfaz no comunica progreso inexistente ni atribuye ejecución por la mera existencia de un claim.

Si el claim requiere renovación o perdió vigencia, la acción disponible se obtiene de la autoridad propietaria antes de permitir continuidad.

#### 24. `PAUSED`

Una tarea pausada puede conservar prominencia cuando sigue siendo la obligación principal recuperable del actor.

La presentación debe indicar que el trabajo no está actualmente ejecutándose y que reanudar requiere la clasificación y revalidación correspondientes.

`PAUSED` no se presenta como `IN_PROGRESS` ni como trabajo finalizado.

#### 25. `WAITING`

Una obligación `WAITING` deja de ocupar el foco ordinario salvo que el seguimiento de la dependencia sea en sí la obligación actual.

Debe conservar:

- qué evento o condición se espera;
- responsable cuando corresponda;
- última actualización relevante;
- condición de reactivación;
- siguiente acción disponible.

#### 26. `BLOCKED`

`BLOCKED` permanece separado de `WAITING`.

La superficie comunica como mínimo:

- que existe una obligación real;
- por qué no puede avanzar en lenguaje permitido;
- qué datos o trabajo permanecen conservados;
- quién o qué debe resolver la condición;
- qué acción segura existe, si existe.

Un bloqueo no se oculta simplemente para limpiar la pantalla.

#### 27. `COMPLETION_PENDING_SYNC`

Cuando la ejecución empresarial todavía no esté confirmada por la fuente autoritativa, SHELL no presenta la obligación como completada.

La experiencia puede indicar que el trabajo fue preparado o enviado y está pendiente de confirmación, pero conserva la diferencia entre:

```text
INTENCION PREPARADA
ENVIO
ACKNOWLEDGEMENT
ESTADO EMPRESARIAL CONFIRMADO
```

#### 28. Conflicto y conciliación

`CONFLICT` y `RECONCILIATION_REQUIRED` no se convierten en un botón genérico `Continuar`.

La pantalla debe orientar al actor hacia la comparación, revisión, reasignación o conciliación que corresponda y mantener visible qué parte de su trabajo quedó conservada.

No se aplica `last write wins` silencioso desde SHELL.

#### 29. Reanudación de trabajo

Cuando existe una interrupción recuperable, la región principal puede cambiar temporalmente de “ejecución” a “reanudación”.

Antes de ofrecer continuidad ejecutable deben comprobarse, según corresponda:

- actor;
- sesión;
- dispositivo;
- `AccessContext` nuevo;
- obligación autoritativa;
- recurso y versión;
- checkpoint;
- borrador;
- operaciones pendientes;
- receipt;
- claim o lease;
- custodia;
- permiso exacto.

#### 30. Estados de reanudación

La experiencia reutiliza la clasificación ya aprobada:

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

No se crea una taxonomía de escritorio alternativa.

#### 31. `RESUMABLE`

La acción `Continuar` solo puede presentarse como ejecutable después de demostrar `RESUMABLE` bajo las precondiciones aprobadas.

La entrada debe conducir al punto semántico exacto de la obligación y no a una portada genérica que obligue al trabajador a reconstruir manualmente su tarea.

#### 32. `RESUMABLE_WITH_REVIEW`

Cuando cambiaron hechos relevantes pero el trabajo puede recuperarse, la experiencia de computador aprovecha el espacio disponible para mostrar una comparación clara entre:

- trabajo conservado;
- estado actual;
- cambios posteriores;
- campos compatibles;
- campos conflictivos;
- acción segura siguiente.

La mayor capacidad visual del computador se usa para comprensión y no para automatizar una sobrescritura.

#### 33. `RESULT_UNKNOWN`

Cuando existe resultado desconocido, la pantalla prioriza resolver la intención original.

No ofrece una segunda acción equivalente mientras no se hayan consultado idempotencia, receipt y estado empresarial suficientes para clasificar el resultado.

La experiencia evita textos que induzcan a “intentar otra vez” sin esa resolución.

#### 34. Borrador, checkpoint y estado empresarial

La composición puede mostrar que existe trabajo guardado, pero mantiene separadas estas identidades:

```text
BORRADOR
CHECKPOINT
OPERACION PENDIENTE
RECEIPT
ESTADO EMPRESARIAL
```

Un borrador recuperable no se presenta como cambio empresarial confirmado.

#### 35. Cambio entre aplicaciones

Cuando el foco conduce a otra aplicación, SHELL preserva la continuidad definida por las tareas anteriores:

- destino validado;
- retorno seguro;
- referencias no secretas permitidas;
- proceso, tarea y recurso cuando el contrato de handoff lo permita;
- correlación y trazabilidad;
- resolución nueva del contexto en destino;
- revalidación del trabajo y de la acción.

La composición de computador no agrega una vía de bypass cross-app.

#### 36. Retorno a SHELL

Al volver desde una aplicación propietaria, SHELL no restaura ciegamente la tarjeta, la cola o el contexto que estaban visibles antes del salto.

Resuelve de nuevo el estado necesario y muestra la versión vigente del foco y las obligaciones secundarias.

Si la tarea fue completada, reasignada, cancelada, bloqueada o supersedida durante la ausencia, la superficie refleja ese resultado actual.

#### 37. Cambio de contexto durante navegación

Una referencia de navegación puede ayudar a reconstruir intención y continuidad, pero no transporta autoridad de sede, área, turno, rol, dispositivo o permiso.

Si el contexto resuelto en destino cambia materialmente, la obligación puede pasar de ejecutable a revisión, bloqueo, handoff, reasignación o ausencia.

La experiencia explica el estado sin fabricar el contexto anterior como fallback.

#### 38. Cambio de actor

Cuando cambia el actor efectivo:

1. se retira el foco personal anterior;
2. se retiran sus colas personales;
3. no se heredan claims;
4. no se heredan borradores;
5. no se hereda una acción primaria preparada;
6. se limpia información personal no necesaria;
7. se resuelven contexto y trabajo para el nuevo actor.

#### 39. Computador compartido

Una sesión técnica del computador no constituye por sí sola actor empresarial.

Una estación compartida puede mantener capacidades de dispositivo o una cola mínima permitida, pero la atribución de trabajo y las acciones humanas requieren un actor identificado conforme a los contratos aplicables.

La pantalla no reutiliza el foco del trabajador anterior para acelerar el relevo.

#### 40. Carga inicial

Antes de obtener contexto y proyección de trabajo suficientes, SHELL usa un estado neutral de resolución.

No muestra prematuramente:

- `Sin tareas pendientes`;
- una aplicación como foco por defecto;
- una tarea antigua como ejecutable;
- una acción principal basada en caché no validada.

#### 41. Estado sin tareas

`Sin tareas pendientes` solo se presenta después de resolver de forma válida el universo visible correspondiente al actor y contexto.

No se interpreta como:

- sin turno;
- sin check-in;
- sin contexto;
- fuente propietaria no disponible;
- proyección incompleta;
- permiso insuficiente;
- datos stale.

#### 42. Fuente parcial o no disponible

Si una aplicación propietaria no puede aportar su proyección, SHELL no transforma el fallo en “cero tareas”.

La superficie diferencia indisponibilidad, incompletitud o necesidad de actualización según los contratos existentes y evita revelar información que el actor no deba conocer.

#### 43. Frescura

Una obligación stale no conserva autoridad visual para iniciar trabajo.

Cuando la fuente exige actualización, la acción ordinaria cambia a una orientación segura equivalente a actualizar o revisar antes de continuar.

La pantalla no utiliza el tamaño de computador ni la permanencia de una pestaña abierta como evidencia de vigencia.

#### 44. Navegación por teclado

Toda navegación ordinaria de SHELL en computador debe ser operable mediante teclado sin exigir mouse.

El orden de foco sigue la jerarquía semántica del contenido y evita saltar desde navegación secundaria hacia acciones alejadas del objeto actual.

No se crea en esta tarea una gramática propietaria de atajos globales.

#### 45. Mouse y puntero

Hover puede complementar información, nunca ser la única forma de descubrir:

- estado;
- bloqueo;
- nombre de una acción;
- propietario del trabajo;
- contexto esencial;
- explicación necesaria.

Los controles siguen siendo reconocibles y activables sin depender de una posición precisa del puntero.

#### 46. Foco visible

Todo control interactivo conserva indicador de foco visible.

Al abrir o cerrar navegación, aviso, detalle o región de recuperación, el foco se mueve de forma predecible y regresa a un objetivo lógico cuando corresponda.

La reordenación visual responsive no altera arbitrariamente el orden de navegación por teclado.

#### 47. Salto al contenido principal

La experiencia de computador conserva un mecanismo equivalente a “saltar al contenido” cuando existe navegación repetitiva antes del espacio principal.

Esto permite entrar directamente al foco actual sin recorrer todos los destinos en cada navegación.

#### 48. Landmarks y estructura semántica

La composición diferencia como mínimo:

- cabecera;
- navegación cuando exista;
- contenido principal;
- regiones de estado o avisos cuando sean materialmente distintas.

El diseño visual no sustituye encabezados, nombres accesibles ni relaciones semánticas.

#### 49. Scroll

La tarea principal no depende de scroll horizontal de página para encontrar su acción o estado.

Las regiones internas que por naturaleza necesiten desplazamiento especializado deben mantener foco, contexto y accesibilidad, pero SHELL no introduce tablas horizontales solo para llenar ancho disponible.

La navegación persistente no debe ocultar contenido principal ni crear dos jerarquías de scroll que impidan localizar el foco.

#### 50. Zoom y cambio de tamaño

Al cambiar zoom o tamaño de ventana:

- el contexto no desaparece como autoridad implícita;
- el foco sigue siendo reconocible;
- la acción principal continúa asociada al objeto correcto;
- bloqueos y estados siguen visibles;
- las colas secundarias pueden pasar debajo del foco;
- no se pierde trabajo ni se reinicia la obligación por reflow.

#### 51. Sin anchura fija del portal como contrato

Esta tarea no obliga a encapsular todo SHELL dentro de una tarjeta estrecha centrada.

El computador debe utilizar el ancho disponible de manera proporcional, con límites de lectura donde sean útiles, manteniendo el foco dominante y evitando espacios dedicados a controles irrelevantes.

#### 52. Avisos globales

Avisos de sesión, conectividad, degradación o condición global aparecen separados de la acción empresarial del foco.

Un aviso no se convierte en tarea salvo que exista un `work_item` real que represente esa obligación.

La existencia de un banner no altera por sí sola prioridad, claim ni estado del trabajo.

#### 53. Estado de conectividad

Cuando la conectividad sea material, la experiencia comunica de forma humana la diferencia entre:

- online saludable;
- online degradado;
- conectividad incierta;
- offline confirmado;
- recuperación;
- sincronización bloqueada.

El estado no se deduce únicamente del icono de red del computador.

#### 54. Privacidad de las colas secundarias

Los conteos y títulos de `DESPUÉS`, `EN ESPERA` y `BLOQUEADAS` se calculan sobre el mismo universo autorizado que se renderiza.

No se muestran totales que permitan inferir trabajo oculto de otro actor, sede, área o proceso.

Los detalles sensibles permanecen minimizados hasta que exista finalidad y autorización para revelarlos.

#### 55. Identificadores técnicos

La experiencia ordinaria no requiere que el usuario conozca:

- `work_item_id`;
- `process_instance_id`;
- UUID de recursos;
- códigos de permisos;
- nombres de RPC;
- tablas;
- schemas;
- componentes;
- repositorios;
- estados técnicos que dispongan de una representación humana aprobada.

Los identificadores necesarios para navegación, correlación o auditoría pueden mantenerse fuera de la presentación ordinaria.

#### 56. Accesibilidad del estado

Foco, urgencia, bloqueo, espera, stale, contexto y disponibilidad no dependen únicamente de color.

La experiencia usa texto, estructura y estados accesibles suficientes para que un actor comprenda la situación con contraste reducido, tecnologías de asistencia o sin señales visuales secundarias.

#### 57. Aplicaciones laborales

La experiencia de computador consume la visibilidad de aplicaciones ya resuelta por las tareas anteriores.

No crea una nueva lista hardcodeada, una matriz de aplicaciones por rol ni una inferencia basada en rutas existentes.

Un destino visible no significa que cualquier acción interna de esa aplicación esté autorizada.

#### 58. Usuarios cliente y PASS

El workspace laboral de computador no se proyecta por defecto sobre la experiencia cliente de PASS.

No se transportan turno, rol operativo, sede, área, claim, cola laboral o readiness laboral hacia PASS únicamente porque el mismo usuario pueda autenticarse en ambos dominios.

#### 59. AURA

Esta tarea no activa AURA ni interpreta documentación de AURA como disponibilidad runtime.

Un destino AURA solo podrá aparecer cuando sus gates, catálogo y política de visibilidad aplicables lo permitan.

#### 60. Componentes compartidos existentes

La materialización física posterior puede reutilizar, cuando su contrato resulte compatible, componentes compartidos ya existentes como:

- `AppShell`;
- `TaskNavigation`;
- `ProcessStatusLine`;
- `PrimaryActionPanel`;
- `ContextDiagnostic`;
- `RecoverableErrorState`;
- `InterruptedProcessState`;
- `CrossAppHandoff`.

Esta tarea no declara que SHELL runtime ya los consuma ni modifica sus contratos.

#### 61. Relación con `AppShell`

La composición documental es compatible con una shell compartida que exponga cabecera, navegación, contexto, avisos y contenido principal.

La navegación de computador puede ser persistente mientras exista ancho suficiente y pasar a una divulgación adaptativa cuando no lo exista, siempre preservando:

- orden semántico;
- foco;
- nombre accesible;
- retorno del foco;
- separación entre navegación y autorización.

#### 62. Relación con `TaskNavigation`

Los estados de presentación de navegación compartida se reutilizan sin cambiar su significado.

`CONTEXTUAL_DISABLED` y `REQUIRED_BLOCKED` no son permisos denegados genéricos ni sustituyen la razón canónica aplicable.

Un ítem de navegación no adquiere estado de trabajo por aparecer como `PRIMARY`.

#### 63. Relación con `PrimaryActionPanel`

Una materialización posterior puede usar el panel compartido para mantener una única acción primaria y separar estados `READY`, `PENDING`, `CONTEXTUAL_DISABLED` y `REQUIRED_BLOCKED`.

La correspondencia exacta entre estado empresarial, autorización y estado visual debe resolverse fuera del componente de presentación y no se infiere en cliente.

#### 64. Estado físico actual que no se promueve a contrato

La implementación actual de SHELL puede contener una portada centrada en tarjetas de aplicaciones, una lista física limitada de aplicaciones y verificaciones legacy.

Esos hechos se tratan como estado físico existente y no como definición objetivo de 017.

La tarea tampoco modifica ese runtime ni declara su migración completada.

#### 65. Diferencia objetivo frente a portada app-first

La diferencia documental principal es:

| Dimensión | Estado físico heredado observado | Objetivo documental de 017 |
|---|---|---|
| entrada laboral | aplicaciones como contenido dominante | trabajo y contexto como contenido dominante |
| foco | aplicación que el usuario decide abrir | obligación actual derivada de trabajo real |
| acción principal | entrar a una aplicación | actuar sobre la obligación o abrir su propietaria |
| aplicaciones | tarjetas protagonistas | destinos secundarios o navegación de apoyo |
| contexto | no gobierna la composición principal | visible antes de actuar y resuelto por servidor |
| continuidad | no determinada por la portada | consume retorno, contexto y trabajo definidos por 014–016 |
| densidad | derivada de la composición existente | `D1_CONTEXTUAL` por defecto |

La tabla es una reconciliación documental; no representa una modificación física ejecutada.

#### 66. Placeholders de perfil y configuración

Esta tarea no retira ni redefine destinos placeholder de perfil, configuración u otras superficies sin destino real.

Su saneamiento permanece reservado a:

`SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real`.

017 únicamente evita que esos placeholders se conviertan en fundamento del diseño objetivo.

#### 67. Frontera con `SHELL-APP-018`

017 no define:

- tamaños táctiles finales;
- gestos;
- densidad táctil específica;
- ergonomía de tablet sostenida o montada;
- composición final de `TabletTaskSurface`;
- política particular de tablet compartida;
- orientación física de tablet;
- interacción optimizada para guantes o manos ocupadas.

Esas decisiones pertenecen a `SHELL-APP-018`.

#### 68. Frontera con `SHELL-APP-019`

017 define cómo debe organizarse la navegación de computador, pero no ejecuta ni certifica la matriz de navegación por rol.

La prueba sistemática de actores, roles, contexto, visibilidad, destinos y denegaciones pertenece a:

`SHELL-APP-019 — Probar navegación por rol`.

#### 69. Frontera con `SHELL-APP-020`

017 define la representación de bloqueo y continuidad en computador, pero no certifica todavía el comportamiento contra bloqueos físicos o autoritativos reales.

La prueba con bloqueos reales pertenece a:

`SHELL-APP-020 — Probar navegación con bloqueos reales`.

#### 70. Requisitos de prueba derivados

No se crean, modifican, difieren, descartan ni vuelven obsoletos requisitos de prueba en esta tarea.

La experiencia de computador especializa visualmente comportamientos que ya están cubiertos por requisitos vigentes de SHELL y UX.

#### 71. Cobertura de prueba vigente reutilizada

La trazabilidad existente que protege las decisiones de 017 incluye, sin modificación:

- `TREQ-SHELL-016` — un acceso bloqueado no debe navegar y el destino mantiene enforcement propio;
- `TREQ-SHELL-017` — logout invalida sesión y evita reutilizar contexto anterior;
- `TREQ-SHELL-030` — visibilidad de navegación derivada de permiso y contexto, sin convertir la UI en autorización;
- `TREQ-SHELL-063` — consumo de proyección segura sin ampliar autoridad;
- `TREQ-SHELL-070` — shape seguro de contexto compartido;
- `TREQ-SHELL-072` — parsing cliente puro, sin decisiones de autoridad;
- `TREQ-UX-009` — resolución completa del contexto operativo aplicable;
- `TREQ-UX-020` — significado, ownership y contrato coherentes entre aplicaciones;
- `TREQ-UX-021` — diferenciación estructural, accesible y responsive;
- `TREQ-UX-024` — foco derivado de un ítem de trabajo real;
- `TREQ-UX-028` — una tarea válida iniciada permanece como foco por defecto y conserva continuidad ante interrupción;
- `TREQ-UX-029` — foco principal más `Después`, `En espera` y `Bloqueadas`;
- `TREQ-UX-034` — SHELL proyecta y navega; la propietaria revalida y ejecuta;
- `TREQ-UX-036` — frescura, offline y reanudación segura;
- `TREQ-UX-038` — foco comunicado mediante estructura y señales accesibles;
- `TREQ-UX-047` — navegación operativa organizada por trabajo y resultados;
- `TREQ-UX-063` — superficie operativa enfocada, sin backoffice denso como flujo ordinario;
- `TREQ-UX-141` — golden path desde obligación hasta resultado y siguiente paso;
- `TREQ-UX-227` a `TREQ-UX-230` — densidad justificada por tarea y no por tipo físico de dispositivo;
- `TREQ-UX-238` — interacción de administración densa compatible con teclado, mouse y accesibilidad;
- `TREQ-UX-274` a `TREQ-UX-296` — checkpoint, interrupciones, clasificación de reanudación, claim, custodia, conflicto, contexto, continuidad cross-device y cross-app.

Esta enumeración es trazabilidad de cobertura vigente y no una actualización del Registro Canónico de Requisitos de Prueba.

#### 72. Matriz de composición por estado

| Situación resuelta | Región dominante | Acción principal permitida en SHELL | Tratamiento de secundarias |
|---|---|---|---|
| trabajo `IN_PROGRESS` válido | foco actual | continuar o abrir punto propietario validado | visibles con menor jerarquía |
| trabajo `CLAIMED` no iniciado | foco actual | acción vigente después de validar claim | no se presenta progreso inexistente |
| trabajo `PAUSED` recuperable | continuidad | iniciar clasificación de reanudación | se conservan sin desplazar la pausa recuperable |
| `RESUMABLE` | continuidad | continuar al punto semántico | visibles con menor jerarquía |
| `RESUMABLE_WITH_REVIEW` | revisión | comparar/revisar antes de continuar | permanecen secundarias |
| `WAITING` sin seguimiento activo | cola `EN ESPERA` | acción de seguimiento si corresponde | el siguiente foco elegible puede ocupar `AHORA` |
| `BLOCKED` | foco o cola según obligación | resolver, escalar u orientar según contrato | el bloqueo no se oculta |
| `COMPLETION_PENDING_SYNC` | estado del foco | revisar sincronización/confirmación | no se presenta como completado |
| `RESULT_UNKNOWN` | recuperación | resolver intención original | no se ofrece reintento equivalente |
| `CONFLICT` | revisión/conciliación | comparar o conciliar | sin sobrescritura silenciosa |
| sin trabajo válido | estado vacío | ninguna acción empresarial inventada | accesos secundarios permitidos permanecen secundarios |
| fuente incompleta/no disponible | indisponibilidad | actualizar/reintentar consulta segura | no se convierte en cero tareas |

#### 73. Matriz de jerarquía visual

| Elemento | Jerarquía ordinaria | Puede ocupar región principal | Puede conceder autoridad |
|---|---|---:|---:|
| contexto esencial | alta | sí, como franja previa al foco | no |
| foco `AHORA` | máxima | sí | no |
| acción primaria | máxima asociada al foco | sí | no |
| bloqueo/continuidad material | alta | sí | no |
| `DESPUÉS` | media | no mientras exista foco válido | no |
| `EN ESPERA` | media | solo si el seguimiento es la obligación actual | no |
| `BLOQUEADAS` | media/alta según riesgo | solo si la resolución es la obligación actual | no |
| navegación de apoyo | secundaria | no | no |
| accesos a aplicaciones | secundaria | no por defecto | no |
| avisos globales | contextual | solo si impiden toda operación aplicable | no |

#### 74. Matriz de entradas y fuentes rechazadas

| Fuente o señal | Uso permitido | Uso prohibido |
|---|---|---|
| proyección autoritativa de trabajo | representar foco y colas | crear mutaciones empresariales desde la proyección |
| `AccessContext` resuelto | presentar contexto vigente | reutilizarlo como autoridad para otra aplicación |
| SafeContextProjection | orientación segura | convertirla en capability |
| deep link opaco | localizar destino e intención permitida | transportar actor, permiso o estado objetivo como autoridad |
| URL / history | navegación | restaurar checkpoint o autorización |
| `localStorage` / estado de componente | preferencia o borrador solo si un contrato lo permite | definir trabajo, actor o permiso autoritativos |
| tarjeta de aplicación | acceso secundario | inventar una obligación |
| notificación | alertar/orientar | convertirse automáticamente en `work_item` |
| tamaño de pantalla | elegir composición responsive | ampliar permiso, rol o densidad empresarial |
| teclado/mouse | modalidad de interacción | justificar backoffice denso |

#### 75. Seguridad

La experiencia de computador mantiene `fail closed`:

- una navegación visible no autoriza el destino;
- una acción previamente disponible no se ejecuta si cambió contexto, permiso, recurso o versión;
- una tarea stale no continúa por estar todavía dibujada;
- una pestaña abierta no conserva claim indefinidamente;
- un retorno no recupera autoridad anterior;
- una sesión técnica de dispositivo no sustituye al actor humano;
- una vista ancha no expone más datos de los permitidos.

#### 76. Observabilidad y verificabilidad

Una futura implementación debe permitir verificar, sin depender solo de inspección visual:

- qué `work_item` fue presentado como foco;
- qué propietario y estado respaldaron la presentación;
- qué contexto vigente acompañó la resolución;
- qué acción principal se proyectó;
- si el foco cambió y por qué;
- si una obligación pasó a stale, bloqueo, espera, conflicto o reanudación;
- si una navegación cross-app conservó correlación sin transportar autoridad.

La telemetría no convierte presentación o apertura en inicio empresarial.

#### 77. Criterios de aceptación

- [ ] La experiencia de computador está definida como `task-first` y `D1_CONTEXTUAL` por defecto.
- [ ] El tamaño físico de la pantalla no amplía autoridad ni determina por sí mismo densidad administrativa.
- [ ] El orden contexto → foco → acción → estado → siguientes obligaciones → accesos secundarios queda preservado.
- [ ] Existe como máximo un foco `AHORA` dominante.
- [ ] `DESPUÉS`, `EN ESPERA` y `BLOQUEADAS` conservan semántica distinta y menor jerarquía que un foco válido.
- [ ] La navegación lateral, cuando exista, funciona como apoyo y no como inventario universal de módulos.
- [ ] Aplicaciones y accesos secundarios no dominan la página inicial laboral.
- [ ] Una obligación administrativa puede ser foco sin transformar SHELL en workspace `D2`–`D4`.
- [ ] `IN_PROGRESS`, `CLAIMED`, `PAUSED`, `WAITING`, `BLOCKED`, `COMPLETION_PENDING_SYNC`, `CONFLICT` y `RECONCILIATION_REQUIRED` permanecen diferenciados.
- [ ] La clasificación de reanudación aprobada se reutiliza sin crear estados alternativos de escritorio.
- [ ] `RESULT_UNKNOWN` bloquea el reintento equivalente hasta resolver la intención original.
- [ ] Borrador, checkpoint, operación pendiente, receipt y estado empresarial permanecen separados.
- [ ] Cambio de actor limpia foco, colas y datos personales del actor anterior y no transfiere claims o borradores implícitamente.
- [ ] La experiencia admite teclado y mouse sin depender de hover ni crear atajos obligatorios nuevos.
- [ ] Foco visible, landmarks, salto al contenido y orden semántico permanecen compatibles con accesibilidad.
- [ ] El reflow conserva jerarquía y no convierte automáticamente una ventana estrecha de computador en experiencia de tablet.
- [ ] No se introduce un breakpoint universal nuevo ni dimensiones físicas normativas.
- [ ] Se preservan las fronteras de 014, 015 y 016 para retorno, contexto y continuidad del trabajo.
- [ ] La experiencia no activa PASS laboral ni AURA por inferencia.
- [ ] Los placeholders de perfil/configuración permanecen reservados a `SHELL-APP-021`.
- [ ] La experiencia táctil específica permanece reservada a `SHELL-APP-018`.
- [ ] La matriz de pruebas por rol permanece reservada a `SHELL-APP-019`.
- [ ] Las pruebas con bloqueos reales permanecen reservadas a `SHELL-APP-020`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos en esta tarea.

#### 78. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_APPLICABLE | La tarea define un contrato documental y no autoriza modificación ejecutable ni artefacto runtime que requiera build propio. |
| LOCAL | NOT_EXECUTED | La validación del checkout completo corresponde al lifecycle documental después de incorporar el marcador aprobado. |
| REMOTA | NOT_EXECUTED | La validación de rama y PR pertenece al cierre documental; esta tarea no declara un resultado remoto de lifecycle antes de ese cierre. |
| OPERATIVA | PASS | La composición fue contrastada documentalmente contra contexto laboral, trabajo pendiente, página inicial, retorno, conservación de contexto, continuidad de trabajo, densidad UX y contratos compartidos vigentes, preservando sus fronteras de responsabilidad. |
| FÍSICA | NOT_APPLICABLE | No se modifican ni despliegan superficies físicas, dispositivos, runtime, Supabase o consumidores durante esta tarea. |

#### 79. Límites

Esta tarea no:

- modifica componentes de `@vento/ui-web`;
- migra `src/app/page.tsx`;
- sustituye verificaciones legacy de autorización;
- crea un nuevo catálogo de aplicaciones;
- crea una tabla universal de tareas;
- crea persistencia de checkpoints;
- crea claim o lease manager;
- define el layout táctil de tablet;
- define breakpoints universales;
- define tamaños táctiles;
- certifica roles;
- certifica bloqueos reales;
- retira placeholders de perfil/configuración;
- activa AURA;
- cambia PASS;
- modifica 04A;
- autoriza implementación física.

Toda materialización posterior debe respetar ownership, topología y gates vigentes.

#### 80. Handoff a `SHELL-APP-018`

`SHELL-APP-018` recibe una semántica ya cerrada:

- contexto antes de actuar;
- un solo foco dominante;
- acción primaria asociada al foco;
- estado, bloqueo y continuidad visibles;
- `DESPUÉS`, `EN ESPERA` y `BLOQUEADAS` como obligaciones secundarias diferenciadas;
- aplicaciones como accesos secundarios;
- retorno, contexto y continuidad cross-app ya gobernados por 014–016;
- densidad determinada por tarea y no por tamaño del dispositivo.

018 podrá cambiar composición, ergonomía e interacción para tablet sin cambiar esos significados.

#### 81. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-016 — Conservar tarea en curso cuando corresponda`

**TAREA ACTUAL APROBADA**
`SHELL-APP-017 — Diseñar experiencia para computador`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-018 — Diseñar experiencia para tablet`


### ✅ SHELL-APP-018 — Diseñar experiencia para tablet

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-017 — Diseñar experiencia para computador
**Tarea siguiente:** SHELL-APP-019 — Probar navegación por rol
**Tipo de tarea:** documental de diseño de experiencia para tablet; especializa composición, ergonomía e interacción táctil de SHELL sobre semántica ya aprobada; materialización física posterior según topología `PER_IMPLEMENTATION_UNIT`
**Bloque:** H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/04_DISPOSITIVOS_Y_PRUEBAS_DE_NAVEGACION.md`
**Estado físico resultante:** contrato documental de experiencia de SHELL para tablet definido; runtime de SHELL, componentes compartidos, consumidores, dispositivos y configuración sin modificaciones
**Cambios físicos autorizados:** ninguno; no se modifican código, componentes compartidos, navegación runtime, autorización, datos, Supabase, dispositivos, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la experiencia canónica de SHELL cuando la superficie aplicable es una tablet personal o compartida, especializando para interacción táctil la semántica ya aprobada de contexto laboral, foco de trabajo, siguiente acción, bloqueos, continuidad, navegación y retorno entre aplicaciones.

La tarea fija cómo debe organizarse SHELL para que una persona pueda operar con lectura mínima, objetivos táctiles adecuados, contexto persistente y una única acción principal, sin convertir una tablet en un escritorio reducido, un kiosco implícito, una fuente de autoridad o un backoffice general.

#### 2. Alcance

Esta tarea define exclusivamente la experiencia de SHELL para las clases de superficie tablet ya reconocidas:

- `PERSONAL_TABLET`;
- `SHARED_TABLET`.

La definición cubre:

- composición semántica;
- jerarquía visual y táctil;
- reflow;
- orientación;
- postura y alcance;
- targets táctiles;
- navegación secundaria;
- teclado virtual;
- entradas alternativas;
- actor y contexto en tablet compartida;
- privacidad entre actores;
- conectividad y frescura;
- interrupción y reanudación;
- feedback;
- accesibilidad;
- fronteras con periféricos, kiosco, backoffice y aplicaciones propietarias.

No se implementa ninguna de estas decisiones durante la tarea documental.

#### 3. Resultado canónico

SHELL en tablet queda definido como una superficie:

```text
TASK-FIRST
+ TOUCH-FIRST
+ CONTEXT-AWARE
+ LOW-TO-MEDIUM DENSITY
+ ONE PRIMARY FOCUS
+ ONE PRIMARY ACTION
+ SAFE RESUME
+ SECONDARY NAVIGATION
```

La tablet mejora movilidad, proximidad al trabajo y velocidad táctil, pero no cambia la autoridad empresarial ni crea una semántica distinta de trabajo.

#### 4. Decisión central

Se fija:

```text
TABLET
!= DESKTOP ENCOGIDO

TABLET
!= KIOSCO IMPLÍCITO

TABLET COMPARTIDA
!= ACTOR COMPARTIDO

PANTALLA TÁCTIL
!= AUTORIDAD

ORIENTACIÓN
!= CONTEXTO

TAMAÑO DE VIEWPORT
!= PERMISO
```

La experiencia se deriva de tarea, actor, contexto, estación, clase de superficie y capacidades ya resueltas por sus propietarios.

#### 5. Semántica heredada de `SHELL-APP-017`

018 conserva sin redefinir:

1. contexto esencial antes de actuar;
2. un único foco `AHORA` dominante;
3. una acción principal asociada al foco;
4. estado, bloqueo y continuidad visibles;
5. `DESPUÉS`, `EN ESPERA` y `BLOQUEADAS` como obligaciones secundarias distintas;
6. aplicaciones como accesos secundarios;
7. navegación cross-app sin transportar autoridad;
8. revalidación al retornar;
9. densidad determinada por la tarea y no por el dispositivo.

La especialización táctil puede cambiar disposición, tamaño, agrupación, alcance y modalidad, pero no esos significados.

#### 6. Perfil de superficie obligatorio

Antes de elegir una composición tablet, la capa propietaria deberá tener resuelto, cuando aplique:

```text
TAREA
+ ACTOR
+ CONTEXTO
+ ESTACIÓN
+ CLASE DE SUPERFICIE
+ POSTURA
+ MOVILIDAD
+ AMBIENTE
+ MODALIDAD DE ENTRADA
+ PERIFÉRICOS
+ RIESGO
+ CONECTIVIDAD
```

SHELL no deduce ese perfil a partir de `userAgent`, touch points, orientación CSS, ancho de viewport, nombre del dispositivo, URL o presencia de un puntero táctil.

#### 7. Clases tablet admitidas

| Clase | Significado | Uso en SHELL | Autoridad implícita |
|---|---|---|---:|
| `PERSONAL_TABLET` | tablet asignada o utilizada en una sesión personal ya resuelta | composición táctil con contexto del actor vigente | no |
| `SHARED_TABLET` | tablet usada sucesivamente por distintos trabajadores | composición táctil con identidad humana y contexto material perceptibles | no |

No se crea una tercera clase tablet por área, sede, aplicación, rol o tamaño de pantalla.

#### 8. Frontera con `FIXED_KIOSK`

`FIXED_KIOSK` no pertenece a esta tarea.

Una tablet físicamente montada no se convierte automáticamente en kiosco. La clasificación depende del perfil de estación, gobierno del host, restricciones del dispositivo y contrato correspondiente.

La experiencia tablet no absorbe:

- contención del sistema operativo;
- allowlists del host;
- administración MDM;
- salida de mantenimiento;
- fullscreen como frontera de seguridad;
- reglas propietarias de `KioskTaskSurface`.

#### 9. Densidad por defecto

El Hub laboral de SHELL en tablet permanece ordinariamente en `D1_CONTEXTUAL`.

Puede reducirse localmente a `D0_FOCUSED` cuando una tarea, postura o estación exige atención casi exclusiva al paso actual.

No asciende a `D2_COMPARATIVE`, `D3_ANALYTICAL` o `D4_SPECIALIZED` por:

- ser una tablet grande;
- estar en orientación horizontal;
- disponer de teclado o stylus;
- pertenecer a gerencia;
- tener permisos amplios;
- admitir muchas aplicaciones;
- existir espacio visual sobrante.

#### 10. Trabajo administrativo desde tablet

Una obligación administrativa puede aparecer como foco real de SHELL en tablet.

SHELL conserva su función de orientación y continuidad. Si la ejecución exige una superficie densa, comparación extensa, edición masiva, auditoría profunda o workspace especializado, la acción principal conduce a la aplicación propietaria cuando el perfil, dispositivo y autorización lo permiten.

La tablet no obliga a replicar en SHELL una interfaz administrativa completa.

#### 11. Orden semántico obligatorio

La experiencia tablet conserva este orden:

```text
1. CONTEXTO PERSISTENTE
2. BLOQUEO MATERIAL, SI EXISTE
3. IDENTIDAD DEL TRABAJO
4. CONTENIDO DEL PASO
5. ACCIÓN PRINCIPAL, SI EXISTE
6. SOPORTE SECUNDARIO
7. RESULTADO O RECEIPT, SI EXISTE
```

Este orden coincide con la composición compartida disponible para tablet y evita crear una jerarquía paralela solo para SHELL.

#### 12. Correspondencia con `TabletTaskSurface`

La materialización compartida vigente ofrece los slots:

| Orden | Slot | Papel en la experiencia de SHELL |
|---:|---|---|
| 1 | `PERSISTENT_CONTEXT` | actor, estación y contexto material ya resueltos |
| 2 | `BLOCKING_STATE` | bloqueo o condición material que impide el avance ordinario |
| 3 | `WORK_IDENTITY` | obligación, objeto o foco actual |
| 4 | `STEP_CONTENT` | información y decisión del paso actual |
| 5 | `PRIMARY_ACTION` | única acción principal segura, cuando existe |
| 6 | `SECONDARY_SUPPORT` | ayuda, detalle o acciones secundarias no competidoras |
| 7 | `RESULT_AND_RECEIPT` | resultado confirmado, pendiente o clasificación ya resuelta |

018 adopta esta anatomía como referencia compatible de composición, sin afirmar que el runtime actual de SHELL ya la consuma.

#### 13. `TabletTaskSurface` no recibe autoridad

La futura integración de SHELL no deberá convertir el componente compartido en resolvedor de:

- actor;
- permisos;
- rol;
- sede;
- área;
- turno;
- check-in;
- elegibilidad;
- conectividad;
- orientación autoritativa;
- dispositivo;
- idempotencia;
- retry;
- estado empresarial.

La dirección permanece:

```text
PROPIETARIO RESUELVE
-> PROYECCIÓN SEGURA
-> SHELL COMPONE
-> TabletTaskSurface PRESENTA
```

#### 14. Composición de una columna

En espacio táctil reducido o cuando la postura favorece lectura secuencial, la composición ordinaria usa una columna principal.

Prioridades:

1. no separar el dato crítico de la acción que afecta;
2. no obligar a alternar repetidamente entre extremos de pantalla;
3. no crear dos focos simultáneos;
4. conservar contexto y trabajo identificables durante scroll;
5. mantener secundarias por debajo de la obligación principal.

#### 15. Composición con espacio horizontal suficiente

Cuando exista espacio usable suficiente, puede separarse:

```text
CONTENIDO DEL PASO
|
RAIL DE ACCIONES Y SOPORTE
```

La segunda región no crea un segundo workspace, una segunda tarea ni una nueva autoridad.

La composición ancha conserva:

- un solo `WORK_IDENTITY`;
- un solo `STEP_CONTENT`;
- como máximo un `PRIMARY_ACTION`;
- la misma semántica de estados;
- el mismo orden lógico de lectura y accesibilidad.

#### 16. No existe un breakpoint de autoridad

Los breakpoints CSS pueden modificar presentación, pero no deciden:

- clase de superficie;
- actor;
- autorización;
- densidad empresarial;
- tarea vigente;
- contexto laboral;
- si una acción es segura;
- si un workspace administrativo debe existir.

Una media query nunca sustituye la resolución del perfil.

#### 17. Reflow

La experiencia debe refluir sin scroll horizontal ordinario para completar la tarea principal.

Durante reflow se conserva:

- contexto material;
- identidad del trabajo;
- estado;
- errores;
- datos capturados;
- borrador cuando su propietario lo permite;
- acción principal;
- soporte;
- resultado.

El reflow no duplica regiones ni crea estados diferentes entre retrato y paisaje.

#### 18. Orientación

Retrato y paisaje son presentaciones del mismo estado semántico.

Rotar la tablet no puede:

- cambiar actor;
- cambiar sede o área;
- modificar foco;
- reiniciar el proceso;
- perder borrador;
- volver a enviar una intención;
- confirmar una operación;
- transformar una acción secundaria en primaria;
- activar un modo administrativo.

Una orientación fija solo procede cuando el perfil de estación o proceso la exige.

#### 19. Postura y montaje

La experiencia debe soportar perfiles como:

- tablet sostenida con una mano;
- tablet sostenida con dos manos;
- operación de pie;
- tablet apoyada temporalmente;
- tablet montada con inclinación controlada;
- uso por personas de distintas alturas y lateralidad.

No se declara una zona universal de alcance. La posición efectiva de controles frecuentes debe validarse con el montaje y postura reales.

#### 20. Objetivos táctiles

Los controles ordinarios compuestos dentro de la experiencia deben usar preferentemente un área activable mínima equivalente a 48 por 48 unidades lógicas.

Se conserva además:

- mínimo nativo Apple de 44 por 44 puntos cuando corresponda;
- piso web WCAG de 24 por 24 CSS px como conformidad mínima, no como objetivo operativo ordinario;
- el hit area puede ser mayor que el icono visible;
- guantes, movimiento, riesgo y precisión requerida pueden exigir objetivos mayores.

#### 21. Separación entre acciones

Las áreas activables no se superponen.

Se mantiene separación perceptible entre:

- confirmar y cancelar;
- aceptar y rechazar;
- avanzar y eliminar;
- acción ordinaria y excepción;
- controles de filas o elementos adyacentes;
- cerrar sesión y continuar trabajo;
- acción principal y acción destructiva.

La proximidad visual no puede volver ambiguo el efecto de un toque impreciso.

#### 22. Acción principal táctil

La acción principal:

- permanece próxima al contenido que modifica;
- conserva posición estable durante la intención;
- no se desplaza bajo el dedo por animaciones o actualizaciones irrelevantes;
- no se oculta tras navegación secundaria;
- no es sustituida por un icono ambiguo;
- puede faltar cuando no existe salida segura.

Deshabilitar visualmente un control no sustituye la revalidación de servidor.

#### 23. Barra persistente de acción

Una barra persistente puede usarse únicamente cuando ayuda al alcance y no:

- cubre campos;
- tapa errores;
- oculta consecuencias;
- invade áreas seguras;
- duplica el CTA;
- fija una acción que dejó de ser elegible;
- impide zoom o reflow.

La persistencia visual no convierte la acción en permanentemente válida.

#### 24. Navegación secundaria

La navegación de SHELL permanece subordinada al trabajo.

En tablet puede presentarse mediante una superficie táctil compacta o divulgación explícita, siempre que:

- no requiera hover;
- no oculte el foco actual;
- no convierta aplicaciones en mosaico dominante;
- no exponga destinos no autorizados;
- no conserve estado personal de otro actor;
- no interprete la apertura como inicio de trabajo.

Esta tarea no impone una ubicación universal de navegación inferior, lateral o superior.

#### 25. Accesos a aplicaciones

Los accesos a aplicaciones son secundarios frente a una obligación vigente.

Cuando no exista trabajo válido, pueden adquirir mayor prominencia como navegación disponible, pero no fabrican una tarea ni prueban elegibilidad empresarial.

En tablet se evita presentar una cuadrícula de módulos como sustituto de una bandeja laboral cuando ya existe trabajo real.

#### 26. `AHORA`

Como máximo una obligación ocupa `AHORA`.

El foco incluye suficiente información para reconocer:

- objeto;
- estado;
- propietario;
- bloqueo material;
- siguiente acción;
- continuidad si existe interrupción;
- frescura cuando sea relevante.

Tocar una tarjeta secundaria no altera autoridad por sí solo.

#### 27. `DESPUÉS`, `EN ESPERA` y `BLOQUEADAS`

Estas familias permanecen separadas.

En tablet pueden compactarse como listas o regiones progresivas, pero no mezclarse en una sola lista sin significado.

| Familia | Significado | Tratamiento táctil |
|---|---|---|
| `DESPUÉS` | obligación elegible posterior | accesible sin competir con `AHORA` |
| `EN ESPERA` | espera legítima de dependencia o confirmación | muestra condición y seguimiento aplicable |
| `BLOQUEADAS` | requiere resolución identificada | muestra bloqueo y acción segura, si existe |

#### 28. Estados de continuidad

Tablet reutiliza la clasificación de continuidad aprobada.

No crea aliases táctiles para:

- `CHECKPOINT_AVAILABLE`;
- `VALIDATING`;
- `RESUMABLE`;
- `RESUMABLE_WITH_REVIEW`;
- `WAITING_FOR_DEPENDENCY`;
- `HANDOFF_REQUIRED`;
- `REASSIGNMENT_REQUIRED`;
- `CONFLICT`;
- `RESULT_UNKNOWN`;
- `REAUTH_REQUIRED`;
- `RECONCILIATION_REQUIRED`;
- `SUPERSEDED`;
- `COMPLETED`;
- `EXPIRED`;
- `INVALID`.

La presentación táctil no cambia el significado de esos estados.

#### 29. `RESULT_UNKNOWN`

Cuando el resultado es desconocido:

- no se ofrece el mismo CTA como reintento ciego;
- no se crea una nueva intención equivalente por doble toque;
- se conserva la obligación de resolver o conciliar la intención original;
- la UI explica que no puede afirmar éxito ni fracaso;
- la acción segura llega ya resuelta por el propietario.

#### 30. Borrador, checkpoint y resultado

Se mantiene:

```text
BORRADOR
!= CHECKPOINT
!= OPERACIÓN PENDIENTE
!= RECEIPT
!= ESTADO EMPRESARIAL
```

Cerrar teclado, rotar pantalla, cambiar aplicación, bloquear la tablet o volver a SHELL no promueve un artefacto al estado siguiente.

#### 31. Teclado virtual

SHELL y las superficies propietarias deberán minimizar escritura durante operación táctil.

Cuando exista captura:

- el teclado no cubre el campo activo;
- el error asociado permanece alcanzable;
- la consecuencia de confirmar sigue visible cuando es material;
- el cierre del teclado no confirma;
- abrir teclado no cambia foco empresarial;
- el borrador se conserva ante una falla recuperable según contrato propietario.

#### 32. Minimización de escritura

La interfaz prefiere:

- datos derivados de contexto confiable;
- escaneo;
- listas cortas contextuales;
- controles de cantidad;
- motivos estructurados;
- teclado numérico apropiado;
- captura periférica cuando el proceso la gobierna.

Texto libre solo se solicita cuando produce información nueva que no puede derivarse de forma segura.

#### 33. Cantidades y unidades

Cuando un paso presenta o captura cantidad, la experiencia conserva:

```text
VALOR
+ UNIDAD
+ PRESENTACIÓN
+ LÍMITE
+ PRECISIÓN
+ EFECTO
```

Cero, vacío, desconocido y no observado permanecen estados distintos.

SHELL no ejecuta conversiones empresariales por estar en tablet; la aplicación propietaria conserva esa responsabilidad.

#### 34. Gestos

Ninguna función esencial depende exclusivamente de:

- hover;
- swipe oculto;
- drag preciso;
- long press;
- doble toque;
- pinza;
- gesto de borde;
- icono sin etiqueta cuando el significado no es universal.

Si existe arrastre, debe existir alternativa de puntero simple salvo que el movimiento sea esencial al propósito.

#### 35. Modalidades alternativas

La experiencia no bloquea artificialmente:

- teclado;
- mouse;
- stylus;
- lector de pantalla;
- switch access;
- controles accesibles compatibles.

`TOUCH-FIRST` significa optimizada para tacto, no `TOUCH-ONLY`.

#### 36. Guantes, humedad y entorno

El uso de tablet debe considerar, según estación:

- guantes;
- humedad;
- grasa;
- harina o polvo;
- frío;
- limpieza;
- reflejos;
- ruido;
- vibración;
- movimiento;
- distancia de lectura.

Aumentar el tamaño de botones no basta si tocar la pantalla es antihigiénico, inseguro o ineficiente.

#### 37. Manos ocupadas y seguridad física

SHELL no exige interacción con pantalla mientras la persona:

- conduce;
- manipula cuchillos;
- trabaja con calor o maquinaria;
- sostiene cargas;
- sostiene un producto con ambas manos;
- debe mantener atención continua sobre el entorno.

El proceso propietario define un punto seguro de interacción o una modalidad alternativa.

#### 38. Periféricos

Escáner, cámara, impresora, báscula, datáfono y otros periféricos permanecen bajo sus propietarios.

SHELL puede presentar una conclusión o navegación relacionada con el trabajo, pero no interpreta por sí mismo:

- lectura recibida;
- dispositivo seleccionado;
- capacidad disponible;
- comando enviado;
- ejecución física;
- resultado confirmado;
- retry seguro.

Captura y efecto empresarial permanecen separados.

#### 39. Tablet personal

`PERSONAL_TABLET` no concede autoridad persistente por pertenecer a una persona.

Cada acción sigue dependiendo de:

- sesión vigente;
- actor efectivo;
- contexto;
- permiso;
- recurso;
- estado;
- versión;
- condiciones de la aplicación propietaria.

Una asociación técnica del equipo no sustituye esas comprobaciones.

#### 40. Tablet compartida

`SHARED_TABLET` exige que la identidad humana y el contexto material sean perceptibles cuando puedan afectar atribución o autoridad.

La tablet técnica nunca se presenta como trabajador.

Cuando no existe actor humano válido, las mutaciones personales permanecen bloqueadas y la interfaz conduce a la identificación o resolución segura correspondiente.

#### 41. Contexto visible en tablet compartida

Según aplique, la superficie permite reconocer:

- estación o dispositivo;
- sede;
- área;
- actor humano;
- rol operativo;
- turno;
- check-in;
- tarea o recurso;
- conectividad;
- simulación o delegación vigente.

La presentación puede compactar estos datos, pero no ocultar una dimensión cuya confusión pueda cambiar atribución, autoridad o efecto.

#### 42. Configuración del dispositivo solo restringe

Una aplicación, sede, área, rol, estación o plantilla fijados al dispositivo pueden limitar posibilidades técnicas o de presentación.

No pueden:

- conceder permiso;
- crear actor;
- crear turno;
- crear check-in;
- fabricar sede activa;
- fabricar área activa;
- asumir ownership del recurso;
- ampliar autorización.

#### 43. Cambio de actor

La transición de actor en tablet compartida sigue:

```text
DETENER NUEVAS MUTACIONES
-> RESOLVER TRABAJO / BORRADOR / CLAIM / CUSTODIA
-> CERRAR O TRANSFERIR SEGÚN CONTRATO PROPIETARIO
-> LIMPIAR CAPAS PERSONALES
-> IDENTIFICAR NUEVO ACTOR
-> RESOLVER NUEVO CONTEXTO
-> RECALCULAR TRABAJO Y CAPACIDADES
```

El actor nuevo no hereda estado personal del anterior por continuidad visual.

#### 44. Datos que no se heredan entre actores

No se transfieren implícitamente:

- PIN;
- firma;
- preferencias personales;
- búsquedas;
- favoritos;
- filtros personales;
- datos sensibles;
- borradores personales;
- claims;
- strong reauth;
- historial privado;
- una selección de recurso incompatible;
- controles avanzados abiertos.

Los hechos empresariales autoritativos permanecen en su fuente propietaria y pueden reaparecer si el nuevo actor está autorizado para verlos.

#### 45. Expiración e inactividad

La inactividad puede bloquear nuevas mutaciones y proteger la pantalla conforme a la política propietaria.

No puede:

- borrar silenciosamente trabajo;
- convertir el dispositivo en actor;
- transferir una tarea al siguiente usuario;
- mantener strong reauth después de expirar;
- reactivar autoridad stale al volver.

La reanudación reconstruye contexto y elegibilidad.

#### 46. Privacidad

En tablet compartida o visible a terceros se aplica minimización antes del render.

SHELL no usa ocultamiento visual como sustituto de autorización.

Se evitan previews innecesarios de:

- datos personales;
- finanzas;
- permisos internos;
- salud;
- notas internas;
- datos de terceros;
- secretos;
- diagnósticos técnicos sensibles.

#### 47. Conectividad

La experiencia diferencia, según la política ya resuelta de cada acción:

- online requerido;
- captura offline permitida;
- cola offline permitida;
- lectura stale read-only;
- contingencia manual.

SHELL no decide esa política por el tipo de dispositivo.

#### 48. Estado perceptible de conectividad

Cuando sea material, la interfaz muestra en lenguaje humano:

- conexión;
- frescura;
- pendientes;
- último punto confirmado;
- limitaciones;
- siguiente acción segura.

Una caché no es autorización y un guardado local no equivale a confirmación de servidor.

#### 49. Reconexión

Reconectar no ejecuta automáticamente una intención pendiente ni restaura autoridad anterior.

La capa propietaria revalida, según corresponda:

- actor;
- sesión;
- contexto;
- permiso;
- recurso;
- versión;
- claim;
- custodia;
- estado de la intención pendiente.

#### 50. Doble toque e idempotencia

Un doble toque, repetición durante latencia, rotación, reconexión o callback tardío no debe producir un segundo efecto empresarial.

La superficie diferencia:

```text
TOQUE RECONOCIDO
-> PROCESANDO
-> CONFIRMADO
   o BLOQUEADO
   o PENDIENTE
   o RESULTADO DESCONOCIDO
```

La protección real contra duplicación permanece en la frontera propietaria y de servidor.

#### 51. Feedback

Toda interacción relevante reconoce la intención sin simular éxito.

Se mantienen separados:

- reconocimiento local;
- solicitud enviada;
- aceptación técnica;
- efecto empresarial confirmado;
- confirmación física;
- resultado desconocido.

Sonido o vibración pueden reforzar, pero nunca ser el único canal.

#### 52. Errores y bloqueos

Un error o bloqueo operativo en tablet debe permitir entender, según aplique:

```text
QUÉ OCURRIÓ
QUÉ NO OCURRIÓ
QUÉ SE CONSERVÓ
QUÉ IMPIDE CONTINUAR
QUÉ PUEDE HACER AHORA
QUIÉN RESUELVE
```

No se muestran códigos técnicos como explicación principal al trabajador.

#### 53. Carga inicial

Mientras se resuelven trabajo y contexto, SHELL usa un estado neutral de resolución.

No presenta prematuramente:

- `Sin tareas pendientes`;
- acceso confirmado;
- actor confirmado;
- contexto confirmado;
- bloqueo definitivo;
- una lista de aplicaciones como sustituto del resultado todavía desconocido.

#### 54. Estado vacío

Un estado vacío solo se presenta cuando la fuente aplicable ha confirmado que no existe trabajo visible para el universo autorizado y fresco.

Una consulta fallida, parcial, stale o no resuelta no equivale a cero tareas.

#### 55. Fuente parcial o no disponible

Si una fuente propietaria no está disponible:

- el estado se muestra como indisponibilidad o frescura insuficiente;
- no se fabrican work items;
- no se eliminan obligaciones conocidas por inferencia;
- no se promueve un acceso secundario a foco por ausencia de datos;
- se ofrece únicamente una acción segura ya gobernada.

#### 56. Navegación cross-app

Tablet reutiliza los contratos de retorno, contexto y continuidad de `SHELL-APP-014`, `SHELL-APP-015` y `SHELL-APP-016`.

Un handoff puede transportar intención y correlación permitidas, pero no:

- permiso;
- actor como autoridad;
- sede o área como authority claim;
- estado objetivo impuesto;
- claim transferido por URL;
- checkpoint fabricado desde history.

#### 57. Retorno a SHELL

Al volver desde otra aplicación, SHELL vuelve a resolver el estado necesario.

No restaura ciegamente:

- acción previa;
- tarjeta previa;
- claim;
- actor;
- contexto;
- resultado;
- filtro personal;
- contenido sensible.

La continuidad preserva la obligación, no una captura visual obsoleta.

#### 58. Cambio de aplicación con trabajo en curso

Cambiar de aplicación no marca el trabajo como completado ni liberado.

La capa propietaria conserva la distinción entre:

- trabajo en progreso;
- pausa;
- espera;
- handoff;
- claim;
- custodia;
- operación pendiente;
- cierre confirmado.

SHELL orienta y vuelve a proyectar el estado resuelto.

#### 59. Aplicación propietaria

SHELL no absorbe lógica empresarial por tener una superficie tablet.

La aplicación propietaria conserva:

- validación del recurso;
- ejecución;
- mutación;
- autorización final;
- idempotencia;
- receipts;
- captura especializada;
- periféricos;
- reglas de unidad;
- reglas de negocio;
- reconciliación.

#### 60. Componentes compartidos compatibles

La futura experiencia puede componer, cuando corresponda, componentes compartidos ya existentes para:

- contexto;
- diagnóstico;
- errores recuperables;
- navegación de trabajo;
- estado de proceso;
- acción principal;
- confirmación sensible;
- simulación;
- interrupción;
- handoff cross-app;
- superficie tablet.

018 no declara que SHELL los consuma hoy ni autoriza su modificación.

#### 61. Estado AS-IS de SHELL

La página inicial vigente continúa siendo una implementación legacy centrada principalmente en acceso a aplicaciones y resolución `has_permission`.

Ese AS-IS no redefine el contrato TO-BE aprobado para computador ni el contrato tablet de 018.

La implementación posterior deberá reconciliarse mediante el lifecycle físico correspondiente, sin tratar el código actual como definición canónica de experiencia.

#### 62. Accesibilidad táctil

La experiencia conserva:

- nombre, rol y estado accesibles;
- orden de foco lógico;
- foco visible;
- lector de pantalla;
- teclado;
- switch access;
- zoom;
- escalado de texto;
- contraste;
- reflow;
- alternativas a gesto, audio y color;
- tiempo suficiente para leer y actuar;
- autenticación accesible según propietario.

El área activable ampliada debe corresponder al control anunciado y no capturar objetivos vecinos.

#### 63. Foco de accesibilidad

Una actualización de estado no fuerza foco de manera universal.

El sistema debe:

- conservar orden semántico;
- anunciar cambios críticos mediante el patrón apropiado cuando corresponda;
- evitar traps de teclado;
- mantener controles alcanzables con teclado virtual;
- permitir navegación a contenido principal;
- no ocultar información crítica por colapso visual.

#### 64. Movimiento y estabilidad

Animación, transición o reordenamiento no deben mover un objetivo mientras la persona intenta tocarlo.

El movimiento no sustituye:

- estado;
- feedback;
- confirmación;
- bloqueo;
- receipt.

Se respeta reducción de movimiento cuando aplique.

#### 65. Ayuda contextual

La ayuda prioriza:

1. microayuda breve;
2. guía del paso;
3. escalamiento con contexto seguro.

No exige abandonar el foco ni copiar logs, secretos o códigos técnicos.

La ayuda es secundaria y no compite con `PRIMARY_ACTION`.

#### 66. Sin administración del dispositivo en flujo ordinario

SHELL tablet no presenta en el flujo laboral ordinario controles de:

- MDM;
- red del sistema;
- credenciales técnicas;
- allowlists;
- drivers;
- configuración de navegador;
- depuración;
- secretos;
- mantenimiento privilegiado.

La existencia de soporte técnico no crea un backoffice dentro de la superficie laboral.

#### 67. Simulación y delegación

Si existe simulación o delegación válida, debe permanecer perceptible conforme a sus contratos propietarios.

La tablet no mezcla actor real con actor simulado, no convierte preview en mutación y no usa una simulación como autorización real.

El cambio de actor o contexto invalida las proyecciones que dejen de ser vigentes.

#### 68. Matriz de composición por situación

| Situación | Región dominante | Acción principal | Tratamiento tablet |
|---|---|---|---|
| trabajo `IN_PROGRESS` válido | `WORK_IDENTITY` + `STEP_CONTENT` | continuar según estado revalidado | foco táctil dominante |
| trabajo `CLAIMED` no iniciado | identidad del trabajo | iniciar acción elegible | no muestra progreso inexistente |
| `PAUSED` recuperable | continuidad | iniciar clasificación de reanudación | no auto-reanuda por volver a pantalla |
| `RESUMABLE` | continuidad | continuar al punto validado | CTA único y estable |
| `RESUMABLE_WITH_REVIEW` | revisión | revisar antes de continuar | cambios visibles antes del CTA |
| `WAITING` | estado/cola secundaria | seguimiento si corresponde | no bloquea otro foco elegible |
| `BLOCKED` | bloqueo material | resolver o escalar si existe salida segura | bloqueo visible antes del CTA |
| `COMPLETION_PENDING_SYNC` | resultado/estado | revisar sincronización | no se presenta completado |
| `RESULT_UNKNOWN` | resultado/recuperación | resolver intención original | no reintento equivalente |
| `CONFLICT` | revisión | comparar o conciliar | sin sobrescritura silenciosa |
| sin trabajo válido confirmado | estado vacío | sin acción empresarial inventada | accesos secundarios disponibles |
| fuente parcial o no disponible | indisponibilidad | consulta segura o espera | no equivale a cero trabajo |

#### 69. Matriz de modalidad de entrada

| Modalidad | Uso válido | Condición |
|---|---|---|
| tacto | selección y acción ordinaria | target, separación, postura y riesgo adecuados |
| teclado virtual | captura necesaria | no oculta campo, error ni consecuencia material |
| teclado físico | entrada compatible | no convierte la superficie en escritorio administrativo |
| stylus | precisión o firma propietaria cuando aplique | no requerido como única entrada ordinaria |
| mouse | apoyo compatible | no habilita hover-only |
| escáner/cámara | identificación o captura propietaria | captura no equivale a efecto confirmado |
| periférico físico | medición, pago, impresión u otra función especializada | estado y resultado gobernados externamente |

#### 70. Matriz de actor en tablet compartida

| Estado | Presentación | Mutación personal |
|---|---|---|
| actor no resuelto | superficie neutral de identificación/resolución | bloqueada |
| actor vigente + contexto válido | identidad y contexto materiales perceptibles | según autorización de servidor |
| actor cambiando | transición explícita y limpieza | bloqueada hasta nueva resolución |
| sesión expirada | protección de pantalla + continuidad preservada | bloqueada hasta reautenticación/revalidación |
| actor nuevo | nueva resolución de contexto y trabajo | no hereda estado personal anterior |
| dispositivo revocado/incompatible | condición material de bloqueo | bloqueada |

#### 71. Matriz de orientación y reflow

| Cambio | Debe conservar | No puede provocar |
|---|---|---|
| retrato → paisaje | estado, foco, draft, acción elegible | envío o confirmación |
| paisaje → retrato | orden semántico, errores, resultado | pérdida de contexto |
| teclado abierto | campo, error y consecuencia | scroll horizontal estructural |
| zoom/texto aumentado | significado y operabilidad | ocultamiento de CTA material |
| ancho disponible mayor | misma obligación y estado | densidad administrativa automática |
| ancho disponible menor | una columna operable | conversión automática a otra clase de dispositivo |

#### 72. Matriz de conectividad

| Estado resuelto | Presentación | Restricción |
|---|---|---|
| online vigente | estado y frescura ordinarios | autorización sigue en servidor |
| actualización en curso | conserva información conocida | no sustituye por vacío |
| offline capture allowed | pendiente local explícito | no presenta confirmación remota |
| offline queue allowed | cola y estado perceptibles | no duplica al reconectar |
| stale read-only | antigüedad y limitación visibles | no habilita mutación |
| manual contingency | instrucción humana y condición de retorno | no simula operación digital confirmada |
| result unknown | incertidumbre explícita | no retry ciego |

#### 73. Matriz de fronteras de responsabilidad

| Materia | SHELL tablet | Propietario externo |
|---|---|---|
| perfil de dispositivo | consume conclusión | estación/dispositivo |
| actor y contexto | presenta proyección | resolutores de identidad/contexto |
| autorización | orienta disponibilidad | servidor propietario |
| work item | presenta proyección | dominio propietario |
| acción principal | compone acción ya resuelta | dominio + autorización |
| ejecución | no ejecuta por presentación | aplicación propietaria |
| idempotencia | refleja estado | servidor/contrato de intención |
| periféricos | orienta si aplica | host/aplicación/driver |
| reanudación | presenta clasificación | checkpoint + propietarios |
| handoff | orienta y navega | contratos cross-app |
| privacidad | minimiza presentación | política + servidor + proyección |

#### 74. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA NUEVOS

**Requisitos creados:** **0**
**Requisitos modificados:** **0**

La tarea especializa en SHELL comportamientos táctiles, de dispositivo compartido, densidad, continuidad y accesibilidad ya protegidos por el Registro Canónico vigente. No introduce una obligación de comportamiento nueva que requiera alterar el registro.

#### 75. Cobertura de prueba vigente reutilizada

La trazabilidad existente aplicable a 018 incluye, sin modificación:

- `TREQ-SHELL-016` — un acceso bloqueado no navega y el destino mantiene enforcement propio;
- `TREQ-SHELL-017` — logout invalida sesión y evita reutilizar contexto anterior;
- `TREQ-SHELL-030` — visibilidad de navegación derivada de permisos y contexto sin convertir UI en autorización;
- `TREQ-SHELL-063` — consumo de proyección segura sin ampliar autoridad;
- `TREQ-SHELL-070` — shape seguro de contexto compartido;
- `TREQ-SHELL-072` — parsing cliente puro, sin decisiones de autoridad;
- `TREQ-UX-009` — contexto operativo completo cuando aplique;
- `TREQ-UX-020` — significado y ownership coherentes entre aplicaciones;
- `TREQ-UX-021` — diferenciación estructural, accesible y responsive;
- `TREQ-UX-024` — foco derivado de trabajo real;
- `TREQ-UX-028` — continuidad del foco válido iniciado;
- `TREQ-UX-029` — foco principal con obligaciones secundarias diferenciadas;
- `TREQ-UX-034` — SHELL proyecta y navega mientras la propietaria revalida y ejecuta;
- `TREQ-UX-036` — frescura, offline y reanudación segura;
- `TREQ-UX-038` — foco comunicado mediante estructura y señales accesibles;
- `TREQ-UX-047` — navegación organizada por trabajo y resultados;
- `TREQ-UX-063` — superficie operativa enfocada sin backoffice denso ordinario;
- `TREQ-UX-141` — golden path desde obligación hasta resultado y siguiente paso;
- `TREQ-UX-199` — divulgación táctil, actor/contexto y limpieza en dispositivo compartido;
- `TREQ-UX-204` a `TREQ-UX-226` — perfil táctil, targets, ergonomía, reflow, entradas, periféricos, ambiente, actor compartido, privacidad, idempotencia, feedback, conectividad, accesibilidad, kiosco y prueba física;
- `TREQ-UX-227` a `TREQ-UX-230` — densidad determinada por tarea y no por tipo físico de dispositivo;
- `TREQ-UX-274` a `TREQ-UX-296` — checkpoint, interrupción, reanudación, claim, custodia, conflicto y continuidad cross-device/cross-app;
- `TREQ-UX-2053` — identidad técnica del dispositivo separada del actor humano;
- `TREQ-UX-2057` — configuración técnica del dispositivo solo restringe y no concede contexto o autoridad;
- `TREQ-UX-2058` — cambio o expiración de actor limpia estado personal y exige resolución nueva;
- `TREQ-UX-2059` — caché y conectividad no sustituyen autorización vigente en dispositivo compartido.

Esta enumeración documenta trazabilidad vigente y no altera el Registro Canónico de Requisitos de Prueba.

#### 76. Observabilidad y verificabilidad

Una futura implementación debe permitir verificar, sin convertir telemetría en autoridad:

- clase de superficie aplicada;
- work item presentado como foco;
- actor y contexto proyectados;
- estado de conectividad material;
- acción principal proyectada;
- ausencia de doble CTA equivalente;
- cambios de actor y limpieza de estado personal;
- interrupción y reanudación;
- orientación/reflow sin pérdida de estado;
- intentos repetidos o dobles toques evitados;
- bloqueos y resultado desconocido;
- handoff y retorno cross-app;
- uso de modalidades alternativas cuando correspondan.

La medición no debe convertirse en vigilancia individual ni en prueba de autorización.

#### 77. Seguridad

La experiencia tablet mantiene `fail closed`:

- touch no concede autoridad;
- viewport no concede autoridad;
- dispositivo compartido no concede autoridad;
- un actor anterior no autoriza al siguiente;
- una caché no autoriza;
- una navegación visible no autoriza;
- una pantalla abierta no conserva claim indefinidamente;
- reconectar no confirma pendientes;
- rotar no reenvía intenciones;
- un periférico presente no autoriza su uso;
- un resultado local no simula efecto empresarial;
- una acción stale no se conserva habilitada por continuidad visual.

#### 78. Criterios de aceptación

- [ ] La experiencia de tablet está definida como `task-first`, `touch-first` y `D1_CONTEXTUAL` ordinaria.
- [ ] `PERSONAL_TABLET` y `SHARED_TABLET` son las únicas clases tablet de esta tarea.
- [ ] `FIXED_KIOSK` permanece fuera de 018.
- [ ] La experiencia no detecta clase, autoridad o densidad desde user agent, touch points, viewport u orientación.
- [ ] El orden semántico coincide con contexto, bloqueo, trabajo, paso, acción, soporte y resultado.
- [ ] Existe como máximo una acción principal y puede faltar cuando no hay salida segura.
- [ ] La composición de una columna y la composición ancha conservan la misma semántica.
- [ ] No existe scroll horizontal ordinario como requisito para completar el trabajo principal.
- [ ] Rotación, reflow, zoom y teclado no alteran actor, foco, borrador, intención o autoridad.
- [ ] Los objetivos táctiles ordinarios usan preferentemente 48 por 48 unidades lógicas y respetan los mínimos aplicables.
- [ ] Acciones incompatibles conservan separación y hit areas no superpuestas.
- [ ] Ninguna función esencial depende solo de hover, swipe oculto, drag preciso, long press, doble toque, pinza o gesto de borde.
- [ ] Teclado, mouse, stylus y tecnologías de asistencia permanecen compatibles cuando corresponda.
- [ ] La escritura se minimiza y el teclado virtual no oculta datos materiales.
- [ ] Cantidad, unidad, presentación, precisión y efecto permanecen explícitos cuando aplican.
- [ ] Guantes, humedad, grasa, harina, frío, reflejo, ruido, movimiento y distancia se consideran por perfil de estación.
- [ ] La interfaz no exige tocar la pantalla durante una condición físicamente insegura.
- [ ] Periféricos permanecen bajo ownership externo y captura no equivale a efecto empresarial.
- [ ] Tablet personal no concede autoridad persistente por asociación técnica del dispositivo.
- [ ] Tablet compartida mantiene actor humano y contexto material perceptibles.
- [ ] Sin actor válido no existen mutaciones personales habilitadas.
- [ ] La configuración del dispositivo solo restringe; no concede permiso, sede, área, turno o check-in.
- [ ] Cambio de actor limpia estado personal sin transferir borradores, claims, strong reauth o datos privados.
- [ ] Inactividad protege la superficie sin borrar trabajo ni restaurar autoridad stale.
- [ ] Conectividad, frescura, pendientes y último punto confirmado permanecen distinguibles cuando son materiales.
- [ ] Doble toque, latencia, rotación, reconexión y callbacks tardíos no deben duplicar efectos.
- [ ] Feedback local, enviado, confirmado, físico y desconocido permanecen separados.
- [ ] Carga, vacío, indisponibilidad y fuente parcial no se confunden.
- [ ] Retorno y handoff cross-app conservan 014–016 y no transportan autoridad.
- [ ] `TabletTaskSurface` se usa como referencia compatible sin afirmar adopción actual de SHELL.
- [ ] El AS-IS app-first actual no redefine el TO-BE tablet.
- [ ] La accesibilidad táctil cubre foco, lector, teclado, switch, zoom, reflow y alternativas sensoriales.
- [ ] La administración del dispositivo no invade el flujo laboral ordinario.
- [ ] La prueba sistemática por rol permanece reservada a `SHELL-APP-019`.
- [ ] La prueba con bloqueos reales permanece reservada a `SHELL-APP-020`.
- [ ] Los placeholders de perfil/configuración permanecen reservados a `SHELL-APP-021`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos en esta tarea.

#### 79. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_APPLICABLE | La tarea define un contrato documental y no autoriza modificación ejecutable ni artefacto runtime que requiera build propio. |
| LOCAL | NOT_EXECUTED | La comprobación del checkout completo corresponde al lifecycle documental después de incorporar la tarea en su archivo propietario y normalizarla. |
| REMOTA | NOT_EXECUTED | La comprobación de rama, PR y checks pertenece al cierre documental y no se declara anticipadamente. |
| OPERATIVA | PASS | El contrato fue contrastado documentalmente contra `SHELL-APP-017`, `UX-BASE-011`, densidad de `UX-BASE-012`, gramática y bandeja `UX-STATION`, requisitos vigentes de tablet/dispositivo compartido y la implementación compartida actual de `TabletTaskSurface`, preservando ownership y límites. |
| FÍSICA | NOT_APPLICABLE | Esta tarea no despliega ni prueba un dispositivo real; la validación física representativa permanece como obligación de materialización y piloto posteriores. |

#### 80. Límites

Esta tarea no:

- modifica `TabletTaskSurface`;
- declara que SHELL ya consume `TabletTaskSurface`;
- convierte una tablet en kiosco;
- implementa MDM;
- define hardware definitivo;
- compra dispositivos;
- configura orientaciones del sistema operativo;
- crea breakpoints de autoridad;
- implementa navegación runtime;
- modifica `src/app/page.tsx`;
- modifica autorización;
- cambia Supabase;
- cambia datos;
- crea o modifica TREQ;
- ejecuta pruebas por rol;
- ejecuta pruebas con bloqueos reales;
- retira placeholders de perfil o configuración;
- activa AURA;
- cambia PASS;
- autoriza implementación física.

Toda materialización posterior debe respetar ownership, topología, gates y pruebas físicas aplicables.

#### 81. Handoff a `SHELL-APP-019`

`SHELL-APP-019` recibe dos contratos de experiencia ya cerrados:

- computador, definido por `SHELL-APP-017`;
- tablet, definido por `SHELL-APP-018`.

019 deberá probar navegación por rol sin redefinir composición, densidad, autoridad, continuidad, clases tablet o semántica táctil.

Su trabajo deberá verificar actores, roles, contexto, visibilidad, destinos y denegaciones sobre las experiencias ya definidas.

#### 82. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-017 — Diseñar experiencia para computador`

**TAREA ACTUAL APROBADA**
`SHELL-APP-018 — Diseñar experiencia para tablet`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-019 — Probar navegación por rol`


### ✅ SHELL-APP-019 — Probar navegación por rol

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-018 — Diseñar experiencia para tablet
**Tarea siguiente:** SHELL-APP-020 — Probar navegación con bloqueos reales
**Tipo de tarea:** validación técnico-documental de navegación por actor, rol y contexto sobre los contratos canónicos de SHELL y el runtime AS-IS remoto; registra cobertura, resultados y no conformidades sin ejecutar bloqueos físicos reales ni modificar runtime; materialización física posterior según topología `PER_IMPLEMENTATION_UNIT`
**Bloque:** H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/04_DISPOSITIVOS_Y_PRUEBAS_DE_NAVEGACION.md`
**Estado físico resultante:** matriz documental de navegación por rol cerrada contra el snapshot remoto vigente; contrato TO-BE verificable y runtime AS-IS clasificado como no conforme en los desvíos registrados; código, datos, Supabase, consumidores y despliegues permanecen sin modificaciones
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, componentes compartidos, autorización, datos, Supabase, configuración, pruebas ejecutables, dispositivos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Probar documentalmente la navegación de SHELL por actor, rol y contexto sobre las decisiones ya aprobadas de visibilidad, página inicial, bloqueo, continuidad, experiencia de computador y experiencia de tablet.

La tarea debe responder de forma verificable:

1. qué actor puede recibir el Hub laboral;
2. qué aplicaciones son presentables por carril base;
3. qué aplicaciones pueden adquirir visibilidad por carril operativo;
4. qué papel tiene cada rol base;
5. qué papel tiene cada rol operativo;
6. qué ocurre cuando el contexto está ausente, inválido, obsoleto o ambiguo;
7. qué destinos son navegables;
8. qué estados deben quedar ocultos, bloqueados o reservados;
9. si computador y tablet conservan la misma semántica de autorización;
10. si el runtime AS-IS observado permite certificar esas reglas.

El resultado de esta tarea es una validación y un registro de no conformidades. No constituye implementación de las correcciones encontradas.

#### 2. Alcance de prueba

La validación cubre:

- los cuatro tipos canónicos de actor efectivo;
- los ocho roles base vigentes;
- los doce roles operativos vigentes;
- las diez aplicaciones canónicas;
- los permisos de entrada `*.access`;
- carril base;
- carril operativo;
- visibilidad base;
- visibilidad contextual;
- ocultamiento;
- bloqueo de presentación;
- reserva por lifecycle;
- frontera laboral/cliente;
- entrada al Hub;
- navegación secundaria;
- computador;
- tablet personal;
- tablet compartida;
- URL directa como frontera de reautorización;
- cambio de actor y contexto;
- frescura;
- separación entre denegación y fallo técnico;
- AS-IS de `src/app/page.tsx`;
- primitivas compartidas de navegación ya materializadas.

No se ejecutan sesiones productivas ni bloqueos reales de infraestructura.

#### 3. Fuentes canónicas consumidas

La prueba consume sin reabrir:

- `SHELL-APP-002` para visibilidad por actor;
- `SHELL-APP-003` para visibilidad por contexto;
- `SHELL-APP-004` a `SHELL-APP-007` para contexto laboral visible;
- `SHELL-APP-008` para trabajo pendiente;
- `SHELL-APP-009` para página inicial por actor efectivo;
- `SHELL-APP-010` para explicación segura de aplicaciones bloqueadas;
- `SHELL-APP-011` y `SHELL-APP-012` para fronteras laborales y cliente;
- `SHELL-APP-014` a `SHELL-APP-016` para retorno, contexto y continuidad;
- `SHELL-APP-017` para experiencia de computador;
- `SHELL-APP-018` para experiencia de tablet;
- el catálogo, autorización, contexto y primitivas compartidas ya aprobados.

019 no crea una fuente paralela de permisos, roles o visibilidad.

#### 4. Snapshot remoto evaluado

La auditoría documental queda anclada al snapshot remoto:

| Campo | Valor |
|---|---|
| Repositorio | `vento-group-sas/vento-shell` |
| Rama | `main` |
| Commit | `23907b52b30b91485ac0eb2e5022a8b891c3d93a` |
| Archivo runtime principal evaluado | `src/app/page.tsx` |
| Componente compartido de navegación evaluado | `packages/ui-web/src/TaskNavigation.tsx` |
| Validador compartido evaluado | `packages/ui-web/scripts/validate-task-navigation.mjs` |
| Estado de la evaluación | `AUDITORIA_DOCUMENTAL_COMPLETA` |

Cambios posteriores del runtime obligarán a una nueva evaluación antes de reutilizar este resultado como evidencia de conformidad física.

#### 5. Distinción entre aprobar la prueba y aprobar el runtime

Se fija:

```text
PRUEBA DOCUMENTAL COMPLETA
!=
RUNTIME CONFORME
```

La tarea puede quedar documentalmente aprobada aunque el sistema observado presente desvíos.

El resultado queda separado en:

```text
RESULTADO_AUDITORIA_019 = PASS_DOCUMENTAL
RESULTADO_CONFORMIDAD_AS_IS = NO_CONFORME
RESULTADO_PRUEBA_FISICA_POR_ACTORES = NO_EJECUTADO
```

Los desvíos son salida de la prueba, no motivo para falsificar un PASS del producto.

#### 6. Estados internos de resultado usados por la matriz

Las matrices de 019 usan únicamente estas etiquetas descriptivas:

| Estado | Significado |
|---|---|
| `CONFORME_CONTRATO` | la expectativa está definida de forma coherente por los contratos vigentes |
| `NO_CONFORME_AS_IS` | el código remoto observado contradice o no materializa una obligación verificable |
| `NO_CERTIFICABLE_AS_IS` | el snapshot no contiene la información o integración necesaria para demostrar la expectativa completa |
| `NO_EJECUTADO_FISICO` | exige sesión, actor, dispositivo o ambiente real |
| `RESERVADO_020` | corresponde específicamente a bloqueos reales de la siguiente tarea |

Estas etiquetas no sustituyen estados de autorización, de proceso ni de evidencia.

#### 7. Universo de actor efectivo

Se conservan exactamente cuatro tipos:

| Actor | Hub laboral esperado |
|---|---|
| `EMPLOYEE` | elegible únicamente si es laboralmente válido y posee entrada efectiva a SHELL |
| `CUSTOMER` | no recibe Hub laboral |
| `SYSTEM` | no recibe interfaz humana |
| `UNRESOLVED` | falla cerrado |

No se añade una categoría por rol, dispositivo, sede o aplicación.

#### 8. Resultado AS-IS por tipo de actor

| Caso | Expectativa canónica | Resultado AS-IS | Evidencia |
|---|---|---|---|
| `EMPLOYEE` válido | Hub laboral sujeto a identidad laboral, `shell.access`, contexto y trabajo | `NO_CERTIFICABLE_AS_IS` | la raíz comprueba usuario autenticado, pero no materializa la clasificación canónica del actor ni la entrada `shell.access` |
| `CUSTOMER` | sin Hub laboral | `NO_CONFORME_AS_IS` | el runtime no distingue `CUSTOMER` antes de construir la experiencia laboral |
| `SYSTEM` | sin interfaz humana | `NO_CERTIFICABLE_AS_IS` | el runtime no implementa clasificación `SYSTEM` en la raíz |
| `UNRESOLVED` | fail closed sin grid laboral | `NO_CERTIFICABLE_AS_IS` | la raíz distingue sesión ausente, pero no demuestra la clasificación de un usuario autenticado con actor laboral no resoluble |

Hallazgo asociado: `RNF-02`.

#### 9. Universo de roles base

Se conservan exactamente:

1. `propietario`;
2. `gerente_general`;
3. `gerente`;
4. `supervisor`;
5. `auxiliar_administrativa`;
6. `contador`;
7. `marketing`;
8. `trabajador_operativo`.

El nombre del rol no constituye autorización ni define una página inicial distinta.

#### 10. Universo de aplicaciones

La navegación se contrasta contra diez identidades:

1. `shell`;
2. `anima`;
3. `viso`;
4. `nexo`;
5. `fogo`;
6. `origo`;
7. `pulso`;
8. `numera`;
9. `aura`;
10. `pass`.

SHELL es `HUB_SELF`, AURA permanece reservada por lifecycle y PASS permanece fuera del grid laboral primario.

#### 11. Modalidad de entrada por aplicación

| Aplicación | Permiso | Modalidad |
|---|---|---|
| SHELL | `shell.access` | `BASE_ONLY` |
| ANIMA | `anima.access` | `BASE_ONLY` |
| VISO | `viso.access` | `BASE_ONLY` |
| NEXO | `nexo.access` | `BASE_OR_OPERATIONAL` |
| FOGO | `fogo.access` | `BASE_OR_OPERATIONAL` |
| ORIGO | `origo.access` | `BASE_OR_OPERATIONAL` |
| PULSO | `pulso.access` | `OPERATIONAL_ONLY` |
| NUMERA | `numera.access` | `BASE_ONLY` |
| AURA | `aura.access` | `BASE_ONLY` más reserva de lifecycle |
| PASS | `pass.access` | `BASE_ONLY` dentro de frontera adyacente |

019 prueba estas modalidades; no las redefine.

#### 12. Matriz canónica base por rol

Leyenda:

- `HUB` = superficie SHELL;
- `V` = visible por carril base;
- `H` = no visible por carril base;
- `D` = diferida;
- `A` = adyacente, fuera del grid laboral primario.

| Rol base | SHELL | ANIMA | VISO | NEXO | FOGO | ORIGO | PULSO | NUMERA | AURA | PASS |
|---|---|---|---|---|---|---|---|---|---|---|
| `propietario` | HUB | V | V | V | V | V | H | V | D | A |
| `gerente_general` | HUB | V | V | V | V | V | H | V | D | A |
| `gerente` | HUB | V | V | V | V | V | H | V | D | H |
| `supervisor` | HUB | V | V | V | V | V | H | H | D | H |
| `auxiliar_administrativa` | HUB | V | V | V | V | V | H | V | D | H |
| `contador` | HUB | V | V | V | V | V | H | V | D | H |
| `marketing` | HUB | V | V | V | H | H | H | H | D | H |
| `trabajador_operativo` | HUB | V | H | H | H | H | H | H | D | H |

Control heredado:

```text
BASE_VISIBILITY_EDGES = 39
ANIMA = 8
VISO = 7
NEXO = 7
FOGO = 6
ORIGO = 6
NUMERA = 5
PULSO = 0
```

#### 13. Resultado de prueba por rol base

| Caso | Rol | Resultado del contrato | Certificación AS-IS | Motivo principal |
|---|---|---|---|---|
| `RNAV-B01` | `propietario` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | el runtime no proyecta el catálogo completo ni una matriz canónica de actor/rol |
| `RNAV-B02` | `gerente_general` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | mismo límite estructural |
| `RNAV-B03` | `gerente` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | mismo límite estructural |
| `RNAV-B04` | `supervisor` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | mismo límite estructural |
| `RNAV-B05` | `auxiliar_administrativa` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | mismo límite estructural |
| `RNAV-B06` | `contador` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | mismo límite estructural |
| `RNAV-B07` | `marketing` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | mismo límite estructural |
| `RNAV-B08` | `trabajador_operativo` | `CONFORME_CONTRATO` | `NO_CERTIFICABLE_AS_IS` | el runtime no puede demostrar ANIMA como acceso base y ausencia ordinaria del resto mediante la política final |

Todos los roles base quedan cubiertos una vez. Faltantes: 0. Duplicados: 0.

#### 14. No se prueba autorización por nombre de rol

Los ocho casos anteriores no deben implementarse como:

```text
if role == ...
```

La matriz es un oracle documental de reconciliación.

La navegación real debe provenir de:

```text
ACTOR EFECTIVO
+ DECISIÓN DE AUTORIZACIÓN
+ CONTEXTO CUANDO APLIQUE
+ POLÍTICA DE PRESENTACIÓN
```

#### 15. Concesiones individuales

Una concesión individual válida puede cambiar la salida efectiva respecto de la baseline del rol base.

Por tanto, 019 no declara que la tabla de la sección 12 sea un resultado inmutable por persona.

Caso obligatorio:

```text
ROL BASE SIN ALLOW
+ CONCESIÓN INDIVIDUAL VÁLIDA
-> PUEDE PRODUCIR ALLOW
```

y:

```text
ROL BASE CON ALLOW
+ DENY APLICABLE
-> NO CONSERVA ALLOW POR LA TABLA
```

La UI no intenta identificar localmente qué fuente produjo la decisión.

#### 16. Universo de roles operativos

Se conservan exactamente doce:

1. `cajero_satelite`;
2. `barista_satelite`;
3. `cocinero_satelite`;
4. `servicio_salon`;
5. `mostrador_satelite`;
6. `operador_integral_satelite`;
7. `produccion_cocina`;
8. `produccion_panaderia`;
9. `produccion_reposteria`;
10. `bodeguero`;
11. `conductor_logistica`;
12. `gerencia_operativa`.

No son tipos de actor ni sustituyen el rol base.

#### 17. Matriz operativa heredada

| Rol operativo | NEXO | FOGO | ORIGO | PULSO |
|---|---|---|---|---|
| `cajero_satelite` | candidato | — | — | candidato |
| `barista_satelite` | candidato | — | — | candidato |
| `cocinero_satelite` | candidato | — | — | candidato |
| `servicio_salon` | candidato | — | — | candidato |
| `mostrador_satelite` | candidato | — | — | candidato |
| `operador_integral_satelite` | candidato | — | — | candidato |
| `produccion_cocina` | candidato | candidato | — | — |
| `produccion_panaderia` | candidato | candidato | — | — |
| `produccion_reposteria` | candidato | candidato | — | — |
| `bodeguero` | candidato | — | candidato | — |
| `conductor_logistica` | candidato | — | — | — |
| `gerencia_operativa` | candidato | candidato | candidato | candidato |

Control heredado:

```text
OPERATIONAL_ROLES = 12
OPERATIONAL_VISIBILITY_EDGES = 25
NEXO = 12
PULSO = 7
FOGO = 4
ORIGO = 2
```

#### 18. Resultado de prueba por rol operativo

| Caso | Rol operativo | Candidatos esperados | Certificación AS-IS |
|---|---|---|---|
| `RNAV-O01` | `cajero_satelite` | NEXO, PULSO | `NO_CONFORME_AS_IS` |
| `RNAV-O02` | `barista_satelite` | NEXO, PULSO | `NO_CONFORME_AS_IS` |
| `RNAV-O03` | `cocinero_satelite` | NEXO, PULSO | `NO_CONFORME_AS_IS` |
| `RNAV-O04` | `servicio_salon` | NEXO, PULSO | `NO_CONFORME_AS_IS` |
| `RNAV-O05` | `mostrador_satelite` | NEXO, PULSO | `NO_CONFORME_AS_IS` |
| `RNAV-O06` | `operador_integral_satelite` | NEXO, PULSO | `NO_CONFORME_AS_IS` |
| `RNAV-O07` | `produccion_cocina` | NEXO, FOGO | `NO_CONFORME_AS_IS` |
| `RNAV-O08` | `produccion_panaderia` | NEXO, FOGO | `NO_CONFORME_AS_IS` |
| `RNAV-O09` | `produccion_reposteria` | NEXO, FOGO | `NO_CONFORME_AS_IS` |
| `RNAV-O10` | `bodeguero` | NEXO, ORIGO | `NO_CONFORME_AS_IS` |
| `RNAV-O11` | `conductor_logistica` | NEXO | `NO_CONFORME_AS_IS` |
| `RNAV-O12` | `gerencia_operativa` | NEXO, FOGO, ORIGO, PULSO | `NO_CONFORME_AS_IS` |

Motivo común verificado: la raíz vigente no consume una resolución explícita de turno, rol operativo, sede y área para producir la política contextual final; usa el helper legacy de permiso para las cinco tarjetas locales y entrega `null` como sede y área desde el caller.

Todos los roles operativos quedan cubiertos una vez. Faltantes: 0. Duplicados: 0.

#### 19. `candidato` no equivale a visible

Cada celda `candidato` de la matriz operativa requiere resolver:

```text
TURNO VIGENTE
+ ROL OPERATIVO
+ SEDE
+ ÁREA CUANDO EL GRANT LA EXIGE
+ GRANT
+ DENY
+ ESTADO DE APLICACIÓN
+ DECISIÓN DE AUTORIZACIÓN
```

La matriz operativa no es allowlist de frontend.

#### 20. Prerrequisito operativo de entrada

Para NEXO, FOGO, ORIGO y PULSO se conserva:

```text
PRERREQUISITO DE ENTRADA = T
```

donde `T` exige turno publicado y vigente, pero no exige check-in activo para `app.access`.

019 verifica específicamente que:

```text
TURNO VIGENTE SIN CHECK-IN
!=
APLICACIÓN AUTOMÁTICAMENTE BLOQUEADA
```

Las capacidades internas `T+C` pertenecen al destino.

#### 21. Matriz de contexto de entrada

| Escenario | BASE_OR_OPERATIONAL | OPERATIONAL_ONLY | Resultado esperado |
|---|---|---|---|
| sin turno vigente + base ALLOW | visible por base | no aplicable | navegable por base |
| sin turno vigente + sin base ALLOW | no visible por operativo | PULSO no visible | oculto contextual |
| turno vigente sin check-in + grant completo | visible por operativo | visible por operativo | navegable |
| turno vigente + check-in compatible | visible por operativo | visible por operativo | navegable |
| check-in activo incompatible | base independiente puede sobrevivir | carril operativo inválido | no derivar ALLOW operativo |
| área requerida ausente | base independiente puede sobrevivir | carril operativo incompleto | bloqueo u ocultamiento según relevancia segura |
| turno ambiguo | base independiente puede sobrevivir | sin ALLOW operativo | no seleccionar turno por conveniencia |
| turno expirado/cancelado/retirado | base independiente puede sobrevivir | sin ALLOW operativo | no conservar visibilidad operativa stale |
| contexto stale | requiere nueva resolución | requiere nueva resolución | no reutilizar autoridad |
| bloqueo estructural global | sin grid laboral | sin grid laboral | fail closed |

#### 22. Independencia de carriles

Para NEXO, FOGO y ORIGO:

```text
BASE_ALLOW COMPLETO
OR
OPERATIONAL_ALLOW COMPLETO
```

puede producir entrada.

No se acepta:

```text
PERMISO DE UN CARRIL
+ TERRITORIO DEL OTRO
```

para construir una autorización híbrida.

PULSO no posee carril base de entrada.

#### 23. Página inicial por rol

La prueba confirma como oracle:

```text
MISMO ACTOR TYPE EMPLOYEE
-> MISMA SEMÁNTICA DE HOME LABORAL
```

El rol no produce homes diferentes.

Ninguno de estos roles redirige por nombre a una aplicación:

- propietario;
- gerente general;
- gerente;
- supervisor;
- auxiliar administrativa;
- contador;
- marketing;
- trabajador operativo;
- cualquiera de los doce roles operativos.

Las diferencias pertenecen a trabajo, aplicaciones visibles y contexto, no a una plantilla de home separada por rol.

#### 24. Resultado AS-IS de página inicial

El runtime observado continúa centrado en:

```text
CENTRO DE APLICACIONES
+ CINCO TARJETAS
```

y no materializa la composición final:

```text
CONTEXTO
-> FOCO DE TRABAJO
-> ACCIÓN PRINCIPAL
-> ESTADO
-> OBLIGACIONES
-> ACCESOS SECUNDARIOS
```

Resultado:

```text
RNF-06 = NO_CONFORME_AS_IS
```

Este hallazgo no reabre 017 ni 018.

#### 25. Cobertura de computador y tablet

Cada oracle de actor y rol de 019 aplica a:

- experiencia de computador de 017;
- `PERSONAL_TABLET` de 018;
- `SHARED_TABLET` de 018 cuando corresponda.

La semántica de autorización y visibilidad no cambia por dispositivo.

Control conceptual:

```text
8 ROLES BASE x 2 FAMILIAS DE EXPERIENCIA = 16 PROYECCIONES MÍNIMAS
12 ROLES OPERATIVOS x 2 FAMILIAS DE EXPERIENCIA = 24 PROYECCIONES MÍNIMAS
TOTAL ROLE-SURFACE = 40
```

La tablet compartida añade limpieza de actor y contexto, no otra matriz de permisos.

#### 26. Cambio de actor en dispositivo compartido

Al cambiar actor:

1. la navegación anterior deja de ser vigente;
2. se descartan proyecciones personales;
3. se resuelve el actor nuevo;
4. se resuelve contexto nuevo;
5. se recalcula trabajo;
6. se recalculan aplicaciones;
7. no se hereda un enlace habilitado del actor anterior;
8. no se hereda una explicación personal de bloqueo.

Una tablet técnica no conserva el rol del trabajador previo.

#### 27. Cambio de rol operativo

Un rol operativo nuevo requiere realidad laboral y contexto nuevos.

No se admite:

```text
SELECTOR DE ROL
-> NUEVA NAVEGACIÓN AUTORIZADA
```

sin resolución propietaria.

El estado local, URL, cookie o nombre visual no cambian autoridad.

#### 28. Cambio de sede y área

La navegación dependiente de carril operativo debe recalcularse si cambia:

- sede;
- área;
- turno;
- compatibilidad del rol;
- grant;
- deny.

Una tarjeta visible por contexto anterior no conserva navegación cuando la proyección queda stale.

#### 29. Aplicación visible no equivale a autorización interna

Se prueba la invariancia:

```text
APP VISIBLE
!=
TODAS LAS ACCIONES PERMITIDAS
```

La aplicación destino vuelve a resolver permisos, contexto, recurso y estado para cada capacidad protegida.

#### 30. Aplicación oculta no equivale a endpoint desprotegido

Se mantiene:

```text
APP OCULTA
+ URL DIRECTA
-> DESTINO REAUTORIZA
```

019 valida esta regla como contrato de navegación.

La ejecución adversarial con bloqueos reales, sesiones y destinos desplegados pertenece a 020 o a la materialización física correspondiente.

#### 31. Estado bloqueado

Cuando una aplicación deba permanecer visible como bloqueada:

- no es navegable;
- no conserva `href` ejecutable como salida ordinaria;
- la causa pública procede de la decisión segura;
- la UI no infiere la causa desde el rol;
- la UI no presenta un fallo técnico como deny personal.

`TaskNavigation` ya posee estados presentacionales no accionables para bloqueo contextual y bloqueo requerido.

#### 32. Estado oculto

`HIDDEN_BASE` o `CONTEXT_HIDDEN` no se convierten automáticamente en una tarjeta deshabilitada.

Una aplicación que no debe revelarse permanece fuera de la navegación presentada.

Por tanto:

```text
HIDDEN
!=
DISABLED VISIBLE
```

La selección entre ocultar y bloquear proviene de la política canónica de presentación.

#### 33. AURA

AURA permanece:

```text
DEFERRED_RESERVED
```

Ningún rol base u operativo la vuelve visible por estar presente en el catálogo.

019 no activa AURA.

#### 34. PASS

PASS permanece fuera del grid laboral primario.

Los casos de propietario y gerente general que tengan una relación administrativa adyacente no convierten PASS en una aplicación laboral de SHELL.

019 no mezcla identidad `CUSTOMER` con RBAC laboral.

#### 35. ANIMA y NUMERA

ANIMA y NUMERA forman parte de la matriz base aprobada.

El runtime actual del launcher no las incluye entre sus cinco tarjetas.

Resultado:

```text
RNF-01 = NO_CONFORME_AS_IS
```

La ausencia impide certificar la matriz completa de roles desde el Hub vigente.

#### 36. PULSO

PULSO es `OPERATIONAL_ONLY` para entrada ordinaria.

El runtime actual la trata como una de cinco tarjetas consultadas mediante el mismo helper general usado para las demás.

Sin consumo explícito de la política contextual final de 003, 019 no puede certificar la navegación PULSO por los siete roles operativos candidatos.

Resultado:

```text
RNF-03 = NO_CONFORME_AS_IS
```

#### 37. Denegación versus indisponibilidad técnica

El runtime AS-IS intenta dos firmas de `has_permission`.

Cuando ambas producen error, `resolveAccess` devuelve:

```text
disabled
```

La presentación posterior usa `Sin acceso` / `Bloqueada`.

Esto colapsa:

```text
DENIED
```

y:

```text
EVALUATION_UNAVAILABLE
```

como una misma salida visual.

Resultado:

```text
RNF-04 = NO_CONFORME_AS_IS
```

#### 38. Hidden versus blocked en AS-IS

Las cinco aplicaciones locales se materializan como tarjetas tanto cuando están habilitadas como cuando quedan `disabled`.

El runtime no posee una clasificación explícita que distinga:

```text
VISIBLE_BASE
CONTEXT_VISIBLE
CONTEXT_BLOCKED
CONTEXT_HIDDEN
DEFERRED_RESERVED
ADJACENT_RESERVED
```

Resultado:

```text
RNF-05 = NO_CONFORME_AS_IS
```

#### 39. Catálogo runtime limitado

El launcher AS-IS contiene únicamente:

- VISO;
- NEXO;
- FOGO;
- ORIGO;
- PULSO.

No contiene como tarjetas:

- ANIMA;
- NUMERA;
- AURA;
- PASS;
- SHELL, que correctamente no debe ser tarjeta de sí mismo.

La omisión de ANIMA y NUMERA es material para la prueba por rol; AURA y PASS conservan además sus reservas canónicas.

#### 40. Actor efectivo no materializado en la raíz

La raíz usa la sesión Supabase para determinar si existe `user`.

No se observa en `src/app/page.tsx` una resolución explícita de:

```text
EMPLOYEE
CUSTOMER
SYSTEM
UNRESOLVED
```

ni una comprobación explícita de empleado activo y `shell.access` antes de construir el Hub laboral.

Resultado:

```text
RNF-02 = NO_CONFORME_AS_IS
```

#### 41. Carril operativo no materializado en la raíz

El caller del launcher envía `p_site_id = null` y `p_area_id = null` al helper legacy y no recibe en esa superficie una proyección explícita de:

- turno vigente;
- rol operativo;
- sede operativa;
- área operativa;
- check-in;
- relevancia contextual;
- estado de carril.

Resultado:

```text
RNF-03 = NO_CONFORME_AS_IS
```

No se concluye que la base de datos carezca de esos conceptos. El hallazgo se limita al consumo visible en la raíz evaluada.

#### 42. `TaskNavigation` compartido

El componente compartido materializado:

- admite `PRIMARY`;
- admite `SECONDARY`;
- admite `DISCOVERABLE`;
- admite `CONTEXTUAL_DISABLED`;
- admite `REQUIRED_BLOCKED`;
- no admite `HIDDEN` como estado renderizable;
- vuelve no accionables los dos estados bloqueados;
- no conoce roles;
- no conoce permisos;
- no conoce `AccessContext`;
- no consulta Supabase;
- no decide autorización;
- conserva orden e identidades entregados por el owner.

Esta separación es compatible con el contrato de 019.

#### 43. Resultado del validador compartido como evidencia estática

El validador de `TaskNavigation` contiene cincuenta escenarios de su contrato propio e inspecciona, entre otras fronteras:

- estados bloqueados no accionables;
- ausencia de inferencia de permisos;
- ausencia de inferencia de roles;
- ausencia de inferencia de contexto;
- ausencia de Supabase y red;
- preservación de orden;
- identidad estable;
- navegación accesible;
- reflow;
- separación del landmark de `AppShell`.

019 no presenta ese validador como prueba de roles de SHELL.

Prueba el componente, no la política de navegación por actor del Hub.

#### 44. Hallazgos reales

| ID | Hallazgo | Severidad documental | Bloquea cierre documental de 019 | Propietario de salida |
|---|---|---|---|---|
| `RNF-01` | launcher AS-IS no materializa el universo necesario para certificar la matriz completa de aplicaciones por rol | alta | no | materialización física de visibilidad/catálogo de SHELL |
| `RNF-02` | raíz AS-IS no materializa la clasificación de actor efectivo y entrada laboral final antes del Hub | crítica | no | materialización física de contexto/entrada de SHELL |
| `RNF-03` | raíz AS-IS no materializa la política final del carril operativo para navegación contextual | crítica | no | materialización física de `SHELL-APP-003` y contratos de autorización |
| `RNF-04` | errores del helper legacy terminan presentados como `disabled`, sin preservar denegación versus evaluación no disponible | alta | no | materialización física de explicación segura de `SHELL-APP-010` |
| `RNF-05` | cinco tarjetas AS-IS no distinguen ocultamiento, bloqueo contextual, reserva y visibilidad final | alta | no | materialización física de `SHELL-APP-002`, `SHELL-APP-003` y `SHELL-APP-010` |
| `RNF-06` | home AS-IS continúa app-first y no materializa aún la navegación task-first aprobada en 009, 017 y 018 | alta | no | materialización física de experiencia SHELL |
| `RNF-07` | el componente compartido seguro de navegación existe, pero `src/app/page.tsx` no lo consume como integración final | media | no | adopción/migración física correspondiente |
| `RNF-08` | no existe evidencia de ejecución por actores reales dentro de esta tarea documental | esperada | no | instancia física posterior de prueba y certificación |

Ningún hallazgo crea una nueva tarea canónica.

#### 45. Condiciones de salida de los hallazgos

`RNF-01` se cierra cuando el runtime consume un catálogo gobernado capaz de representar la política aprobada completa sin listas locales divergentes.

`RNF-02` se cierra cuando la entrada laboral consume actor efectivo y condiciones de acceso a SHELL resueltas por sus propietarios antes de renderizar el Hub.

`RNF-03` se cierra cuando NEXO, FOGO, ORIGO y PULSO reciben la proyección contextual de entrada aprobada, con carriles completos e independientes.

`RNF-04` se cierra cuando una denegación válida y una evaluación no disponible producen estados públicos distintos.

`RNF-05` se cierra cuando la presentación diferencia explícitamente visible, oculto, bloqueado, diferido y adyacente según el contrato.

`RNF-06` se cierra cuando el home materializa la composición task-first ya aprobada.

`RNF-07` se cierra cuando la adopción física correspondiente demuestra paridad, compatibilidad y rollback.

`RNF-08` se cierra únicamente con evidencia física o integrada de actores y ambientes autorizados.

019 no declara ninguna de estas condiciones cumplida.

#### 46. Matriz de invariantes de seguridad por rol

| Invariante | Resultado contractual |
|---|---|
| rol base no es autorización | `CONFORME_CONTRATO` |
| rol operativo no es actor | `CONFORME_CONTRATO` |
| tarjeta visible no es capability | `CONFORME_CONTRATO` |
| tarjeta oculta no elimina guard de destino | `CONFORME_CONTRATO` |
| aplicación `BASE_ONLY` no recibe acceso desde rol operativo | `CONFORME_CONTRATO` |
| PULSO no recibe fallback base | `CONFORME_CONTRATO` |
| base y operativo no mezclan fragmentos | `CONFORME_CONTRATO` |
| turno futuro no habilita navegación actual | `CONFORME_CONTRATO` |
| check-in no es requisito de `app.access` con prerrequisito `T` | `CONFORME_CONTRATO` |
| contexto stale no conserva autoridad | `CONFORME_CONTRATO` |
| dispositivo compartido no es actor | `CONFORME_CONTRATO` |
| simulación no concede navegación real | `CONFORME_CONTRATO` |

#### 47. Matriz de resultados AS-IS

| Superficie/contrato | Resultado |
|---|---|
| universo de diez aplicaciones | `NO_CONFORME_AS_IS` |
| cuatro tipos de actor en root | `NO_CONFORME_AS_IS` |
| ocho roles base certificables end-to-end | `NO_CERTIFICABLE_AS_IS` |
| doce roles operativos certificables end-to-end | `NO_CONFORME_AS_IS` |
| carril operativo de entrada | `NO_CONFORME_AS_IS` |
| distinción deny/error técnico | `NO_CONFORME_AS_IS` |
| hidden versus blocked | `NO_CONFORME_AS_IS` |
| task-first home | `NO_CONFORME_AS_IS` |
| primitiva compartida role-agnostic | `CONFORME_CONTRATO` |
| bloqueos reales y adversariales | `RESERVADO_020` |
| prueba física con trabajadores | `NO_EJECUTADO_FISICO` |

#### 48. No se modifica la evidencia histórica

Los resultados de 019 no reescriben retrospectivamente:

- auditorías AS-IS anteriores;
- contratos de autorización;
- decisiones de 002 y 003;
- decisiones de página inicial;
- contratos de bloqueo;
- experiencias 017 y 018;
- evidencia de componentes compartidos.

019 registra el estado observado frente a esas fuentes.

#### 49. No se convierte un FAIL AS-IS en requisito nuevo

Los hallazgos son incumplimientos o materializaciones pendientes de reglas ya existentes.

Por tanto:

```text
HALLAZGO AS_IS
!=
REQUISITO NUEVO
```

La corrección deberá demostrar conformidad contra la cobertura vigente en el lifecycle físico aplicable.

#### 50. Frontera con `SHELL-APP-020`

019 no ejecuta bloqueos reales.

Queda reservado a 020 verificar, según sus fuentes vigentes:

- denegaciones reales;
- contextos inválidos reales;
- expiraciones;
- pérdida de autorización;
- fallos de backend;
- bloqueo por dispositivo;
- URL directa bajo guard real;
- cambio de actor real;
- cambios de turno, sede o área en ejecución;
- recuperación después del bloqueo;
- mensajes y acciones realmente observados.

019 entrega los oracles y defectos de navegación por rol que 020 podrá consumir sin reabrir la matriz.

#### 51. Frontera con `SHELL-APP-021`

Los enlaces actuales de perfil y configuración que todavía apuntan a `/` no se corrigen en 019.

Su retiro permanece reservado a:

`SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real`.

La presencia de esos placeholders no se usa para distorsionar el resultado de navegación por rol.

#### 52. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La prueba confronta el runtime AS-IS con reglas de navegación, autorización, contexto, seguridad y presentación que ya poseen cobertura canónica. Los hallazgos registrados son no conformidades frente a obligaciones existentes, no reglas nuevas.

#### 53. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, 019 reutiliza especialmente:

- `TREQ-SHELL-015` — disponibilidad del launcher derivada de decisión canónica;
- `TREQ-SHELL-016` — aplicación sin acceso efectivo no navegable y enforcement propio del destino;
- `TREQ-SHELL-028` — catálogo único versionado para launcher y navegación;
- `TREQ-SHELL-030` — visibilidad derivada de permisos y contexto sin sustituir autorización;
- `TREQ-SHELL-031` — simulación separada de autoridad real;
- `TREQ-SHELL-063` — frontera server/client sin decisión autoritativa en la UI;
- `TREQ-SHELL-070` — proyección segura de contexto;
- `TREQ-SHELL-071` — proyección segura de decisión;
- `TREQ-SHELL-072` — cliente sin autoridad propia;
- `TREQ-SHELL-073` — separación entre denegación, contrato inválido y fallos de backend.

También permanecen aplicables los requisitos de autorización y UX propietarios que protegen actor efectivo, modalidad, territorio, dispositivo, accesibilidad, continuidad y navegación.

Esta enumeración es trazabilidad heredada. No actualiza el registro.

#### 54. Resultado cuantitativo

```text
ACTOR_TYPES_TESTED = 4
BASE_ROLES_TESTED = 8
OPERATIONAL_ROLES_TESTED = 12
CANONICAL_APPS_IN_ORACLE = 10

BASE_MATRIX_EDGES = 39
OPERATIONAL_MATRIX_EDGES = 25

BASE_ROLE_CASES = 8
OPERATIONAL_ROLE_CASES = 12
ROLE_CASES_TOTAL = 20

ROLE_SURFACE_PROJECTIONS_MINIMUM = 40

AS_IS_FINDINGS = 8
AS_IS_FINDINGS_BLOCKING_DOCUMENTARY_CLOSE = 0
NEW_TREQ = 0
MODIFIED_TREQ = 0
```

#### 55. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-019 — Probar navegación por rol`.
- [ ] `SHELL-APP-018` permanece como tarea anterior.
- [ ] `SHELL-APP-020` permanece como siguiente tarea.
- [ ] La tarea permanece en carril documental.
- [ ] La topología posterior `PER_IMPLEMENTATION_UNIT` no se interpreta como autorización física.
- [ ] Se cubren exactamente cuatro tipos de actor efectivo.
- [ ] Se cubren exactamente ocho roles base.
- [ ] Se cubren exactamente doce roles operativos.
- [ ] Se conserva el universo de diez aplicaciones.
- [ ] La matriz base conserva 39 relaciones de visibilidad.
- [ ] La matriz operativa conserva 25 relaciones candidatas.
- [ ] NEXO conserva 12 roles operativos candidatos.
- [ ] PULSO conserva 7.
- [ ] FOGO conserva 4.
- [ ] ORIGO conserva 2.
- [ ] La navegación no se deriva del nombre de rol.
- [ ] `CUSTOMER`, `SYSTEM` y `UNRESOLVED` no reciben Hub laboral por inferencia.
- [ ] `shell.access` permanece como condición de entrada laboral de SHELL.
- [ ] Carril base y carril operativo permanecen independientes.
- [ ] `T` no se transforma en `T+C` para `app.access`.
- [ ] Un turno vigente sin check-in puede seguir habilitando entrada cuando el grant lo permite.
- [ ] Turno futuro, ambiguo, expirado, cancelado o retirado no crea visibilidad operativa vigente.
- [ ] Aplicación visible no concede capacidades internas.
- [ ] Aplicación oculta no elimina enforcement del destino.
- [ ] `HIDDEN` no se colapsa a tarjeta bloqueada.
- [ ] Denegación y evaluación no disponible permanecen distintas.
- [ ] AURA permanece diferida.
- [ ] PASS permanece fuera del grid laboral primario.
- [ ] ANIMA y NUMERA forman parte de la matriz base aunque no estén hoy en el launcher AS-IS.
- [ ] Computador y tablet conservan la misma semántica de roles.
- [ ] Tablet compartida no hereda navegación entre actores.
- [ ] Los veinte roles consumidos por la prueba tienen exactamente una decisión documental.
- [ ] Los hallazgos AS-IS tienen propietario y condición de salida.
- [ ] Los hallazgos no crean tareas canónicas nuevas.
- [ ] Los bloqueos reales permanecen reservados a 020.
- [ ] Los placeholders permanecen reservados a 021.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

#### 56. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_APPLICABLE | 019 produce exclusivamente un artefacto documental de prueba y hallazgos; no modifica código ejecutable ni crea una prueba runtime que requiera build propio en esta etapa. |
| LOCAL | NOT_EXECUTED | La tarea todavía no ha sido incorporada y normalizada en el checkout local del lifecycle documental, por lo que format, quality, delivery y batería global permanecen pendientes de ese checkout. |
| REMOTA | PASS | Se inspeccionó `main` en `23907b52b30b91485ac0eb2e5022a8b891c3d93a`, la continuidad vigente, topología, políticas documentales, owner H2, contratos de visibilidad 002/003, página inicial 009, bloqueo 010, experiencias 017/018, 04A SHELL, `src/app/page.tsx`, `TaskNavigation` y su validador compartido. |
| OPERATIVA | PASS | Se ejecutó una prueba documental estática completa sobre los cuatro tipos de actor, ocho roles base, doce roles operativos, diez aplicaciones, 39 relaciones base, 25 relaciones operativas y las fronteras de navegación; el resultado registra explícitamente que el runtime AS-IS es no conforme y que no se ejecutaron sesiones reales. |
| FÍSICA | NOT_APPLICABLE | La ejecución con actores, dispositivos, ambientes y bloqueos reales no pertenece a esta aprobación documental; 020 y el lifecycle físico posterior conservan esa evidencia. |

#### 57. Límites

Esta tarea no:

- modifica `src/app/page.tsx`;
- modifica `TaskNavigation`;
- modifica componentes compartidos;
- crea un test ejecutable de runtime;
- altera roles;
- altera grants;
- altera denies;
- crea permisos;
- modifica catálogo;
- modifica `AccessContext`;
- modifica autorización;
- modifica Supabase;
- modifica datos;
- despliega aplicaciones;
- prueba usuarios productivos;
- prueba bloqueos reales;
- afirma que una URL directa ya fue denegada en ambiente real;
- corrige los hallazgos;
- activa AURA;
- introduce PASS al Hub laboral;
- retira placeholders;
- crea o modifica requisitos de prueba;
- autoriza una instancia física.

#### 58. Resultado canónico de 019

La salida queda:

```text
CONTRATO DE NAVEGACIÓN POR ROL
-> VERIFICADO DOCUMENTALMENTE

4 TIPOS DE ACTOR
-> CUBIERTOS

8 ROLES BASE
-> CUBIERTOS

12 ROLES OPERATIVOS
-> CUBIERTOS

10 APLICACIONES
-> CUBIERTAS EN EL ORACLE

RUNTIME AS_IS
-> NO CONFORME

HALLAZGOS
-> REGISTRADOS CON OWNER Y SALIDA

BLOQUEOS REALES
-> RESERVADOS A 020

CAMBIO FÍSICO
-> NO AUTORIZADO
```

#### 59. Handoff a `SHELL-APP-020`

020 recibe:

1. los cuatro tipos de actor;
2. los ocho roles base;
3. los doce roles operativos;
4. la matriz base de 39 relaciones;
5. la matriz operativa de 25 relaciones;
6. los oracles de entrada por contexto;
7. la separación base/operativo;
8. la regla `T` para entrada;
9. la separación hidden/blocked;
10. la separación deny/evaluation unavailable;
11. los ocho hallazgos AS-IS;
12. la exigencia de enforcement propio del destino;
13. la invariancia entre computador y tablet;
14. la prohibición de transportar autoridad por navegación.

020 deberá probar bloqueos reales sin redefinir estas matrices.

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-018 — Diseñar experiencia para tablet`

**TAREA ACTUAL APROBADA**
`SHELL-APP-019 — Probar navegación por rol`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-020 — Probar navegación con bloqueos reales`


### ✅ SHELL-APP-020 — Probar navegación con bloqueos reales

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-019 — Probar navegación por rol
**Tarea siguiente:** SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real
**Tipo de tarea:** validación técnico-documental de navegación ante bloqueos reales representados por código, contratos y pruebas ejecutables vigentes; contrasta el comportamiento AS-IS de SHELL con los oráculos canónicos sin ejecutar una instancia física, modificar runtime ni certificar ambientes no observados
**Bloque:** H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/04_DISPOSITIVOS_Y_PRUEBAS_DE_NAVEGACION.md`
**Estado físico resultante:** matriz canónica de navegación bloqueada y recuperación cerrada contra el snapshot remoto vigente, con cobertura estática de bloqueos materializados y brechas AS-IS identificadas; runtime, datos, Supabase, consumidores, dispositivos y despliegues sin modificaciones
**Cambios físicos autorizados:** ninguno; no se modifican código, navegación runtime, contratos, pruebas ejecutables, autorización, datos, Supabase, configuración, dispositivos, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Probar documentalmente cómo debe comportarse la navegación de SHELL cuando una decisión de entrada, un contexto, un dispositivo, una sesión o una dependencia impiden continuar de forma segura, utilizando bloqueos que ya están representados por fuentes reales del repositorio vigente.

La tarea debe determinar:

1. qué clases de bloqueo son relevantes para la entrada a una aplicación;
2. cuáles pertenecen únicamente a una capacidad interna y no deben bloquear toda la aplicación;
3. qué ocurre cuando no existe sesión válida;
4. qué ocurre cuando el actor laboral no es válido;
5. qué ocurre ante denegación de acceso;
6. qué ocurre ante contexto operativo inválido;
7. qué ocurre ante contexto obsoleto;
8. qué ocurre ante dispositivo compartido no autorizado;
9. qué ocurre ante simulación;
10. qué ocurre ante indisponibilidad técnica de autorización;
11. qué ocurre ante navegación directa;
12. cómo cambia la presentación después de recuperar una condición válida;
13. qué parte está materializada en código o pruebas ejecutables;
14. qué parte todavía no puede certificarse físicamente desde el runtime AS-IS de SHELL.

#### 2. Alcance

La validación cubre:

- entrada a SHELL;
- entrada desde SHELL hacia aplicaciones laborales;
- decisión de autorización exacta;
- bloqueo estructural;
- bloqueo del carril base;
- bloqueo del carril operativo;
- sesión ausente o inválida;
- empleado inactivo;
- sede y área;
- turno;
- check-in cuando el permiso exacto lo exige;
- rol operativo;
- dispositivo compartido;
- simulación;
- configuración inconsistente;
- permiso no registrado;
- indisponibilidad del evaluador;
- frescura;
- cambio de actor;
- cambio de turno, sede o área;
- navegación directa;
- separación entre `DENY` y fallo técnico;
- presentación segura del bloqueo;
- recuperación;
- computador;
- tablet personal;
- tablet compartida.

No se ejecutan mutaciones ni cambios de infraestructura.

#### 3. Snapshot remoto evaluado

La prueba queda anclada al siguiente snapshot verificable:

| Campo | Valor |
|---|---|
| Repositorio | `vento-group-sas/vento-shell` |
| Rama | `main` |
| Commit | `35089a93ff41753d565090b5e766547daa45868f` |
| Última tarea aprobada | `SHELL-APP-019 — Probar navegación por rol` |
| Tarea actual | `SHELL-APP-020 — Probar navegación con bloqueos reales` |
| Siguiente tarea | `SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real` |
| Owner H2 inspeccionado | `04_DISPOSITIVOS_Y_PRUEBAS_DE_NAVEGACION.md` |
| Runtime SHELL inspeccionado | `src/app/page.tsx`, `src/app/login/page.tsx`, `middleware.ts` |
| Evidencia backend inspeccionada | suites SQL de autorización, frescura, simulación, dispositivo y persistencia |

Una modificación posterior de estas superficies exige reconciliar la evidencia antes de reutilizarla como fotografía vigente.

#### 4. Handoff recibido de `SHELL-APP-019`

019 entrega sin reapertura:

1. cuatro tipos de actor;
2. ocho roles base;
3. doce roles operativos;
4. matriz base de 39 relaciones;
5. matriz operativa de 25 relaciones;
6. oráculos de entrada por contexto;
7. separación base/operativo;
8. prerrequisito `T` para entrada operativa;
9. separación entre ocultamiento y bloqueo;
10. separación entre denegación e indisponibilidad de evaluación;
11. ocho hallazgos AS-IS;
12. enforcement propio del destino;
13. invariancia entre computador y tablet;
14. prohibición de transportar autoridad por navegación.

020 prueba los bloqueos sin modificar esas matrices.

#### 5. Significado de “bloqueo real”

En esta tarea:

```text
BLOQUEO REAL
=
CONDICIÓN REPRESENTADA POR
CÓDIGO VIGENTE
O CONTRATO CANÓNICO VIGENTE
O PRUEBA EJECUTABLE VIGENTE
```

No significa:

```text
BLOQUEO REAL
=
PRUEBA PRODUCTIVA DECLARADA SIN EVIDENCIA
```

Por tanto, la tarea diferencia:

- existencia y semántica del bloqueo;
- materialización observable en el repositorio;
- presentación actual de SHELL;
- ejecución física en un ambiente y actor concretos.

#### 6. Regla general de navegación bloqueada

La navegación solo puede continuar cuando existe una conclusión autoritativa suficiente para hacerlo.

Se conserva:

```text
ALLOW VÁLIDO
-> PUEDE CONTINUAR SEGÚN LAS DEMÁS CONDICIONES

DENY VÁLIDO
-> NO NAVEGA

CONTRATO INVÁLIDO
-> NO NAVEGA

BACKEND NO DISPONIBLE
-> NO NAVEGA

RESPUESTA BACKEND INVÁLIDA
-> NO NAVEGA

CONTEXTO STALE
-> NO CONSERVA AUTORIDAD ANTERIOR
```

La UI no transforma una ausencia de evidencia en acceso.

#### 7. Frontera entre aplicación y capacidad interna

Un bloqueo de una capacidad interna no se eleva automáticamente a bloqueo de entrada de toda la aplicación.

Se conserva:

```text
DENY DE PERMISO INTERNO
!=
DENY DE app.access
```

La tarjeta o destino de aplicación se gobierna por la evaluación exacta de su permiso de entrada.

#### 8. Universo público de razones

La presentación de autorización reutiliza exactamente el universo vigente de veinte razones públicas:

1. `AUTH_NO_SESSION`;
2. `AUTH_USER_INACTIVE`;
3. `AUTH_APP_ACCESS_DENIED`;
4. `AUTH_ADMIN_PERMISSION_DENIED`;
5. `AUTH_OPERATIONAL_PERMISSION_DENIED`;
6. `AUTH_SITE_ASSIGNMENT_REQUIRED`;
7. `AUTH_ACTIVE_SITE_REQUIRED`;
8. `AUTH_AREA_ASSIGNMENT_REQUIRED`;
9. `AUTH_ACTIVE_AREA_REQUIRED`;
10. `AUTH_PUBLISHED_SHIFT_REQUIRED`;
11. `AUTH_OUTSIDE_SHIFT_WINDOW`;
12. `AUTH_CHECKIN_REQUIRED`;
13. `AUTH_OPERATIONAL_ROLE_REQUIRED`;
14. `AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE`;
15. `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA`;
16. `AUTH_SHARED_DEVICE_NOT_AUTHORIZED`;
17. `AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION`;
18. `AUTH_ADMINISTRATIVE_CONFIGURATION_INCONSISTENT`;
19. `AUTH_PERMISSION_NOT_REGISTERED`;
20. `AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE`.

020 no crea un código local de SHELL.

#### 9. Matriz principal de las veinte razones

| Razón pública | Tratamiento de navegación en 020 | Regla de no inferencia |
|---|---|---|
| `AUTH_NO_SESSION` | bloquea una navegación que requiere sesión válida | no se sustituye por presencia visual de email o cookies |
| `AUTH_USER_INACTIVE` | bloquea entrada laboral cuando la decisión exacta la devuelve | no se deduce solo de una etiqueta de perfil |
| `AUTH_APP_ACCESS_DENIED` | bloquea la aplicación evaluada | no se reescribe por rol |
| `AUTH_ADMIN_PERMISSION_DENIED` | bloquea la capacidad exacta evaluada | no bloquea toda la aplicación si procede de otro permiso |
| `AUTH_OPERATIONAL_PERMISSION_DENIED` | bloquea la capacidad exacta evaluada | no bloquea toda la aplicación si procede de otro permiso |
| `AUTH_SITE_ASSIGNMENT_REQUIRED` | bloquea cuando la autorización exacta exige asignación territorial | no se fabrica desde un campo vacío del cliente |
| `AUTH_ACTIVE_SITE_REQUIRED` | bloquea cuando la decisión exige sede operativa vigente | no se usa sede seleccionada como fallback |
| `AUTH_AREA_ASSIGNMENT_REQUIRED` | bloquea cuando el contrato exacto exige afiliación de área | no se inventa desde el nombre del rol |
| `AUTH_ACTIVE_AREA_REQUIRED` | bloquea cuando el grant exacto exige área operativa válida | no se sustituye por área primaria |
| `AUTH_PUBLISHED_SHIFT_REQUIRED` | bloquea cuando el permiso exacto exige turno publicado/vigente | un turno futuro no satisface el requisito actual |
| `AUTH_OUTSIDE_SHIFT_WINDOW` | bloquea cuando el actor está fuera de la ventana válida | no se colapsa con ausencia total de turno |
| `AUTH_CHECKIN_REQUIRED` | bloquea únicamente permisos que realmente exijan check-in | no se fabrica para `app.access` cuyo prerrequisito sea `T` |
| `AUTH_OPERATIONAL_ROLE_REQUIRED` | bloquea cuando el permiso exacto exige rol operativo | el rol base no lo reemplaza |
| `AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE` | bloquea el carril afectado | no se elige otra sede para conseguir acceso |
| `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA` | bloquea el carril afectado | no se elige otra área para conseguir acceso |
| `AUTH_SHARED_DEVICE_NOT_AUTHORIZED` | bloquea cuando la decisión exacta considera incompatible el dispositivo | el dispositivo no se convierte en actor |
| `AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION` | bloquea la acción real afectada en simulación | no convierte preview en autoridad |
| `AUTH_ADMINISTRATIVE_CONFIGURATION_INCONSISTENT` | bloquea sin atribuir falta de permiso al trabajador | no se traduce como `No tienes acceso` |
| `AUTH_PERMISSION_NOT_REGISTERED` | bloquea la función no registrada | no crea alias ni permiso local |
| `AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE` | bloquea mientras no pueda verificarse autorización | no se representa como deny personal |

#### 10. Sesión ausente

El middleware vigente contiene un bloqueo real de acceso a superficies protegidas:

- ausencia de cookies Supabase conduce al acceso;
- ausencia de configuración requerida conduce al acceso;
- error al validar la sesión conduce al acceso y limpia cookies Supabase aplicables;
- sesión sin usuario válido conduce al acceso y limpia cookies aplicables.

Esto prueba la existencia de una frontera fail-closed para sesión en el runtime actual.

No prueba por sí solo la política final de actor laboral de SHELL.

#### 11. Sesión presente no equivale a actor laboral válido

La existencia de `user` en Supabase no demuestra:

- `EMPLOYEE`;
- empleado activo;
- `shell.access`;
- contexto laboral;
- rol operativo;
- aplicación elegible.

La navegación final sigue necesitando las resoluciones aprobadas en tareas anteriores.

El runtime AS-IS todavía no materializa toda esa cadena en `src/app/page.tsx`.

#### 12. Empleado inactivo

Un actor laboral inactivo no conserva navegación por:

- sesión técnica aún válida;
- rol histórico;
- grant histórico;
- tarjeta cacheada;
- aplicación abierta;
- contexto anterior.

La razón pública se consume solo desde la decisión autoritativa aplicable.

#### 13. Denegación de acceso a aplicación

Cuando el permiso exacto de entrada produce `AUTH_APP_ACCESS_DENIED`:

```text
NAVIGABLE = NO
```

La UI puede presentar la explicación segura aprobada.

No muestra:

- grant faltante;
- deny ganador;
- tabla;
- política;
- rol de otra persona;
- permiso crudo como instrucción de soporte.

#### 14. Denegación administrativa

`AUTH_ADMIN_PERMISSION_DENIED` mantiene alcance sobre el permiso exacto evaluado.

Ejemplo de frontera:

```text
APP ACCESS = ALLOW
CAPACIDAD ADMINISTRATIVA = DENY
```

no autoriza a SHELL a ocultar toda la aplicación.

El destino conserva el bloqueo de la capacidad administrativa.

#### 15. Denegación operativa

`AUTH_OPERATIONAL_PERMISSION_DENIED` mantiene la misma regla de precisión.

Una denegación operacional interna:

```text
!=
DENEGACIÓN AUTOMÁTICA DE app.access
```

La aplicación puede seguir siendo visible por un carril base independiente cuando corresponda.

#### 16. Sede requerida

Cuando la decisión exacta requiere sede:

- no se usa sede primaria como autoridad sustituta;
- no se usa sede seleccionada;
- no se usa sede del dispositivo sin reconciliación;
- no se usa último valor conocido;
- no se deriva una sede desde la URL.

El carril afectado permanece no autorizado.

#### 17. Sede activa requerida

Una sede existente pero no válida para el contexto operativo no satisface la autorización.

Un cambio de sede invalida la proyección dependiente de la sede anterior.

La navegación no conserva el resultado anterior por continuidad visual.

#### 18. Área requerida

Cuando el grant concreto exige área:

- área nula no se interpreta como cualquier área;
- área primaria no sustituye área operativa;
- área elegida en cliente no amplía autoridad;
- el nombre del rol no fabrica el área.

Roles legítimamente site-wide conservan la semántica definida por su contrato.

#### 19. Área activa requerida

Un área inactiva, incompatible o perteneciente a otro contexto no completa el carril.

La UI no intenta encontrar automáticamente otra área que produzca un resultado permisivo.

#### 20. Turno publicado requerido

Para permisos operativos de entrada que exigen `T`:

```text
T
=
TURNO PUBLICADO Y VIGENTE
```

No satisfacen `T`:

- borrador;
- turno futuro;
- turno finalizado;
- turno cancelado;
- turno retirado;
- turno ambiguo.

#### 21. Fuera de ventana

`AUTH_OUTSIDE_SHIFT_WINDOW` permanece distinto de `AUTH_PUBLISHED_SHIFT_REQUIRED`.

Esto permite distinguir:

```text
NO EXISTE TURNO PUBLICADO APLICABLE
```

de:

```text
EXISTE TURNO PERO NO ES VIGENTE AHORA
```

La recuperación puede ser diferente y SHELL no colapsa ambos estados.

#### 22. Check-in requerido

La frontera aprobada de 019 se mantiene:

```text
nexo.access
fogo.access
origo.access
pulso.access
```

usan prerrequisito operativo de entrada `T`.

Por tanto, SHELL no puede inventar `AUTH_CHECKIN_REQUIRED` para esas entradas solo porque no exista check-in.

`AUTH_CHECKIN_REQUIRED` permanece válido para capacidades cuyo contrato exacto use `T+C`.

#### 23. Rol operativo requerido

Un rol operativo se obtiene de la realidad laboral resuelta.

No puede provenir de:

- selector visual;
- rol base;
- cookie;
- query;
- aplicación abierta;
- dispositivo;
- última sesión;
- texto visible.

Sin rol operativo válido, el carril que lo necesita no produce entrada.

#### 24. Rol operativo incompatible con sede

La incompatibilidad no se repara localmente cambiando sede.

El resultado seguro es conservar bloqueado el carril operativo afectado y solicitar nueva resolución cuando corresponda.

Un carril base independiente puede seguir siendo válido si el bloqueo no es transversal.

#### 25. Rol operativo incompatible con área

La misma separación aplica al área.

No se mezclan:

```text
ROL DE UN CONTEXTO
+
ÁREA DE OTRO CONTEXTO
```

para fabricar un `ALLOW`.

#### 26. Dispositivo compartido no autorizado

La identidad técnica del dispositivo solo puede restringir.

No puede conceder:

- actor;
- rol;
- permiso;
- turno;
- sede;
- área;
- check-in.

La suite de dispositivo vigente contiene pruebas ejecutables de fallo cerrado para dispositivo desconocido y para una decisión `DENY` al intentar registrar dispositivo.

#### 27. Simulación

La simulación permanece no ejecutable como autoridad real.

La suite vigente de simulación contiene controles ejecutables que:

- impiden marcar una evaluación simulada como ejecutable;
- rechazan permisos clasificados `NOT_ALLOWED`;
- mantienen tres permisos en esa categoría dentro del snapshot probado;
- impiden que la administración de simulación se auto-simule como autorización real.

La navegación real nunca deriva un `ALLOW` desde un resultado hipotético.

#### 28. Configuración administrativa inconsistente

Cuando la autorización no puede validar coherentemente la configuración necesaria:

- se bloquea la navegación afectada;
- no se culpa al usuario;
- no se sustituye por `AUTH_APP_ACCESS_DENIED`;
- no se cierra la sesión únicamente por esta razón;
- la recuperación pertenece a revisión autorizada.

#### 29. Permiso no registrado

Un permiso ausente del catálogo gobernado no se crea en cliente ni se corrige mediante:

- alias;
- string alternativo;
- nombre de aplicación;
- permiso parecido;
- rol;
- fallback legacy no autorizado.

La función permanece no disponible hasta corregir su propietario.

#### 30. Evaluación de autorización no disponible

La indisponibilidad técnica produce una semántica distinta de `DENY`.

Se conserva:

```text
NO SE PUDO EVALUAR
!=
SE EVALUÓ Y SE DENEGÓ
```

La suite de persistencia vigente modela explícitamente:

- `AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE`;
- `TECHNICAL_UNAVAILABLE`;
- `decision_produced = false`;
- `executable = false`;
- sesión preservada;
- efecto no confirmado;
- recuperación controlada.

#### 31. Cuatro categorías internas de fallo

Los adapters futuros conservan las categorías cerradas:

```text
DENIED
CONTRACT_INVALID
BACKEND_UNAVAILABLE
BACKEND_RESPONSE_INVALID
```

Solo `DENIED` deriva de una decisión canónica válida con `DENY`.

Las otras tres categorías también bloquean, pero no se presentan como falta de permiso del trabajador.

#### 32. Comportamiento AS-IS del launcher

La raíz vigente resuelve cinco tarjetas mediante `has_permission`.

El resultado se reduce a:

```text
enabled
o
disabled
```

y la tarjeta muestra:

```text
Disponible
o
Sin acceso / Bloqueada
```

Esta interfaz no representa todavía el universo completo de causas aprobado.

#### 33. Error de RPC en el launcher

El runtime intenta primero una firma de `has_permission` y luego una segunda firma de compatibilidad.

Si ambas fallan:

```text
return "disabled"
```

Por tanto, el AS-IS no conserva la diferencia entre:

- denegación autoritativa;
- contrato inválido;
- backend no disponible;
- respuesta inválida.

Este resultado conserva el hallazgo `RNF-04` de 019.

#### 34. Tarjeta bloqueada AS-IS

Una tarjeta con `access = disabled` no recibe enlace de apertura.

El runtime presenta un botón deshabilitado con `aria-disabled="true"`.

Esto aporta evidencia estática de bloqueo en la superficie SHELL actual.

No demuestra enforcement de la aplicación destino.

#### 35. Oculto y bloqueado siguen separados

La política final mantiene:

```text
HIDDEN
!=
BLOCKED VISIBLE
```

El AS-IS actual renderiza sus cinco aplicaciones locales incluso cuando quedan `disabled`.

Por tanto, no certifica la política completa de:

- visible;
- contextual visible;
- contextual bloqueada;
- contextual oculta;
- diferida;
- adyacente.

Esto conserva `RNF-05`.

#### 36. Navegación directa

Alterar:

- DOM;
- `href`;
- JavaScript;
- estado local;
- query string;
- historial;
- enlace copiado;

no puede crear autoridad.

La aplicación destino debe reautorizar.

La evidencia 04A vigente mantiene esa comprobación de destino sin certificar, por lo que 020 no declara una ejecución E2E inexistente.

#### 37. Frontera `returnTo`

El login vigente acepta actualmente cualquier valor que comience por:

```text
http://
https://
```

como retorno.

Esto mantiene una brecha real ya registrada para navegación.

020 no la corrige ni la usa como comportamiento aprobado.

La recuperación de esta brecha conserva su propietario existente.

#### 38. Cambio de actor

Cuando cambia el actor efectivo:

1. la navegación personal anterior deja de ser vigente;
2. las decisiones anteriores no se reutilizan;
3. se descarta la presentación personal anterior;
4. se resuelve nuevo contexto;
5. se reevalúan permisos;
6. se recalculan destinos;
7. no se hereda un bloqueo personal ni un `ALLOW`.

Esto es especialmente obligatorio en tablet compartida.

#### 39. Cambio de turno

Un cambio de turno puede alterar:

- rol operativo;
- sede;
- área;
- ventana temporal;
- elegibilidad del carril operativo.

La aplicación previamente visible por contexto no conserva autoridad sin nueva resolución.

#### 40. Cambio de sede

La sede anterior no permanece válida por estar dibujada en la interfaz.

Una nueva realidad territorial obliga a recalcular el carril afectado.

#### 41. Cambio de área

Cuando un grant exige área, la variación de área invalida la conclusión dependiente del valor anterior.

No existe transición permisiva automática entre áreas.

#### 42. Cambio de rol operativo

La navegación se recalcula desde el nuevo contexto.

La UI no convierte un selector, etiqueta o cookie en transición laboral.

#### 43. Cambio de grant o deny

Un grant retirado o un deny nuevo puede invalidar una navegación previamente disponible.

Se conserva:

```text
ANTES FUE ALLOW
!=
SIGUE SIENDO ALLOW
```

La visibilidad anterior no es capability.

#### 44. Contexto obsoleto

La infraestructura de frescura vigente incluye generación, bindings, invalidación y pruebas ejecutables dedicadas.

020 adopta la regla:

```text
STALE
!=
AUTORIDAD VIGENTE
```

Una caché o snapshot anterior no puede autorizar después de un evento invalidante.

#### 45. Sesión expirada

Una sesión expirada bloquea nuevas acciones protegidas.

La superficie puede preservar continuidad documental o de trabajo según contrato, pero no autoridad.

Reautenticar no significa reusar automáticamente la decisión anterior.

#### 46. Backend indisponible

Cuando la dependencia de autorización no está disponible:

- no se presenta `ALLOW`;
- no se presenta una denegación personal inventada;
- no se ejecuta el destino protegido;
- la sesión puede preservarse;
- la UI utiliza el perfil público seguro aplicable;
- el retry solo existe cuando la política lo permite.

#### 47. Respuesta backend inválida

Una respuesta con shape, versión o catálogo incompatible no se castea como decisión válida.

La navegación permanece bloqueada.

La falla contractual no se convierte en reason code de autorización por similitud de texto.

#### 48. Contrato inválido

Una versión desconocida, estructura parcial o valor fuera del catálogo falla cerrado.

No existe fallback hacia un booleano legacy para declarar conformidad final.

#### 49. Evaluador de autorización materializado

El repositorio contiene una suite ejecutable dedicada al evaluador canónico con 174 aserciones declaradas.

Entre sus escenarios se encuentra una comprobación de sesión ausente que conserva `AUTH_NO_SESSION`.

La existencia del test demuestra materialización de la comprobación.

Esta tarea no declara el resultado de una ejecución que no observó.

#### 50. Suite de frescura materializada

Existe una suite ejecutable dedicada a frescura de contexto.

Inspecciona, entre otras materias:

- owner aislado;
- RLS;
- privilegios;
- generaciones;
- bindings;
- invalidación;
- fuentes materializadas;
- fuentes todavía bloqueadas;
- identidad de sesión;
- exposición mínima.

Esto proporciona evidencia real de que el problema de contexto stale tiene implementación y pruebas específicas.

#### 51. Suite de simulación materializada

Existe una suite ejecutable dedicada a auditoría de simulación.

La suite contiene escenarios que fallan cerrado cuando:

- el caller intenta marcar una simulación como ejecutable;
- intenta simular un permiso cuyo contrato es `NOT_ALLOWED`;
- intenta relabelar una política de simulación;
- intenta auto-simular la administración real de simulación.

La simulación continúa separada de autoridad.

#### 52. Suite de dispositivo materializada

Existe una suite ejecutable dedicada a dispositivo con 199 aserciones declaradas.

Incluye comprobaciones de que:

- un dispositivo desconocido falla cerrado;
- una decisión `DENY` no permite registrar dispositivo;
- una identidad de versión inválida es rechazada.

Esto confirma una frontera real de dispositivo en backend.

#### 53. Persistencia de decisión y fallo técnico materializados

Existe una suite ejecutable de persistencia con 457 aserciones declaradas.

La suite modela separadamente:

- decisiones `ALLOW`;
- decisiones `DENY`;
- fallos técnicos;
- intentos de evaluación;
- correlación;
- no ejecutabilidad del fallo;
- efectos no confirmados;
- política de recuperación.

020 utiliza esa separación como evidencia del oráculo técnico.

#### 54. Matriz de evidencia estática

| Familia | Evidencia materializada observada | Resultado para 020 |
|---|---|---|
| sesión ausente | middleware + evaluador | bloqueo representado |
| app deny | evaluador/persistencia + tarjeta deshabilitada | bloqueo representado; UI final incompleta |
| sede/área/turno/rol | contratos + evaluador/contexto | oráculo representado; consumo final de SHELL incompleto |
| contexto stale | infraestructura y suite de frescura | bloqueo representado |
| dispositivo | contratos y suite de dispositivo | bloqueo representado |
| simulación | contratos y suite de simulación | bloqueo representado |
| indisponibilidad técnica | contrato y suite de persistencia | bloqueo representado; UI AS-IS colapsa causa |
| navegación directa | obligación de enforcement en destino | no certificada E2E |
| `returnTo` no aprobado | código AS-IS permite absoluto HTTP/HTTPS | brecha real confirmada |
| cambio de actor | contrato de dispositivo compartido/contexto | oráculo definido; ejecución humana no afirmada |

#### 55. Reconciliación de los ocho hallazgos de 019

| Hallazgo heredado | Efecto en 020 | Owner conservado | Condición de salida |
|---|---|---|---|
| `RNF-01` | impide probar el universo completo de apps desde el launcher actual | materialización física de catálogo/visibilidad de SHELL | launcher consume catálogo gobernado y política completa |
| `RNF-02` | impide probar todos los bloqueos por actor desde la raíz actual | materialización física de entrada/contexto de SHELL | actor efectivo y entrada laboral se resuelven antes de render |
| `RNF-03` | impide probar navegación contextual final desde SHELL | materialización física de visibilidad contextual/autorización | carril operativo final se consume en la raíz |
| `RNF-04` | hace indistinguible deny de fallo técnico en la UI actual | materialización física de explicación segura | cuatro categorías se proyectan sin colapso indebido |
| `RNF-05` | impide distinguir ocultamiento y bloqueo final | materialización física de presentación | visible/oculto/bloqueado/reservado quedan diferenciados |
| `RNF-06` | limita la prueba de bloqueo sobre el home task-first final | materialización física de experiencia SHELL | home consume contexto, foco, acción y accesos secundarios |
| `RNF-07` | la primitiva segura existe sin integración final en la raíz | adopción física correspondiente | integración demuestra paridad y rollback |
| `RNF-08` | no existe ejecución con actores reales dentro de la documentación | lifecycle físico posterior | evidencia atribuible a ambiente, actor y commit |

019 no queda reescrita; 020 consume estos hallazgos.

#### 56. Bloqueo global versus bloqueo de carril

Se conserva la diferencia:

```text
BLOCKING_ALL
```

impide el Hub laboral autorizado.

Un problema limitado al carril operativo puede dejar vigente un carril base independiente de NEXO, FOGO u ORIGO.

PULSO no tiene fallback base de entrada.

#### 57. Bloqueo visible versus ausencia

Una aplicación puede quedar:

- no presentable;
- visible pero bloqueada;
- visible y navegable;
- reservada por lifecycle.

La elección pertenece a la política de presentación ya aprobada.

020 no convierte todos los `DENY` en tarjetas visibles.

#### 58. Mensaje seguro

La explicación visible proviene de la proyección segura y del catálogo compartido de mensajes.

La superficie no reconstruye la razón a partir de:

- rol;
- ausencia de campo;
- error RPC;
- texto del backend;
- HTTP status aislado;
- nombre de tabla;
- permiso local.

#### 59. Información que no se expone

Un bloqueo ordinario no revela:

- matched grants;
- matched denies;
- datasets;
- SQLSTATE;
- stack trace;
- JWT;
- cookie;
- token;
- service role;
- query interna;
- payload completo de contexto;
- huellas internas;
- secretos;
- sujetos no autorizados;
- listas de personas con acceso.

#### 60. Recuperación

Una recuperación segura puede requerir:

- reautenticación;
- nueva resolución de contexto;
- esperar ventana válida;
- corregir configuración;
- cambiar dispositivo mediante proceso autorizado;
- terminar simulación;
- registrar check-in cuando el permiso exacto lo requiera;
- revisión administrativa;
- retry técnico gobernado.

La UI no ofrece una recuperación que amplíe autoridad.

#### 61. Recuperar no equivale a reusar decisión

Después de resolver la causa:

```text
NUEVA REALIDAD
-> NUEVA RESOLUCIÓN
-> NUEVA EVALUACIÓN
```

No se reactiva una tarjeta usando un `ALLOW` anterior.

#### 62. Idempotencia durante bloqueo

Repetir el toque, recargar, rotar, volver del destino o reconectar no debe crear una segunda intención empresarial.

Un bloqueo no se supera multiplicando solicitudes.

#### 63. Navegación en computador

La experiencia de computador conserva:

- contexto;
- foco;
- acción;
- bloqueo;
- continuidad;
- accesos secundarios.

La mayor superficie visual no muestra información interna adicional sobre autorización.

#### 64. Navegación en tablet

Tablet conserva la misma decisión de autoridad.

Tacto, orientación, tamaño, teclado o dispositivo compartido no cambian el outcome.

Un target más grande no convierte una acción bloqueada en elegible.

#### 65. Tablet compartida

Cuando un bloqueo depende del actor:

- la explicación pertenece al actor vigente;
- cambiar actor descarta la explicación personal anterior;
- se recalcula la navegación;
- no se hereda una recuperación;
- no se hereda strong reauth;
- no se hereda un destino autorizado.

La estación técnica permanece separada del trabajador.

#### 66. Accesibilidad del bloqueo

Un estado bloqueado debe ser perceptible sin depender únicamente de:

- color;
- icono;
- hover;
- sonido;
- vibración;
- posición.

Cuando exista explicación o recuperación, debe ser alcanzable mediante modalidades accesibles aplicables.

#### 67. No se usa un botón deshabilitado como seguridad

El estado visual:

```text
disabled
```

es presentación.

No sustituye:

- autorización server-side;
- guard del destino;
- RLS;
- validación del recurso;
- decisión de contexto.

#### 68. Observabilidad

La evidencia futura de una ejecución física deberá permitir atribuir, de forma segura:

- commit;
- aplicación;
- permiso exacto;
- actor o fixture controlado;
- contexto relevante;
- tipo de resultado;
- reason code público cuando aplique;
- correlación;
- destino;
- resultado de navegación;
- recuperación;
- ausencia de efecto no autorizado.

La observabilidad no expone secretos ni convierte `correlation_id` en autoridad.

#### 69. Qué no puede certificarse desde esta tarea documental

No se declara como físicamente ejecutado:

- navegador en staging;
- cuenta real de cada rol;
- manipulación real de DOM contra cada aplicación;
- guard real de cada repositorio destino;
- cambio real de turno en ambiente;
- cambio real de sede;
- cambio real de área;
- expiración real de sesión;
- revocación real durante navegación;
- caída real del backend;
- recuperación real posterior;
- mensajes visuales desplegados finales.

Estas comprobaciones requieren la instancia física y ambiente atribuibles correspondientes.

#### 70. Resultado sustantivo

La tarea concluye:

```text
BLOQUEOS CANÓNICOS
-> RECONCILIADOS

20 RAZONES PÚBLICAS
-> CLASIFICADAS

DENY VS FALLO TÉCNICO
-> SEPARADOS

BLOQUEO DE APP VS CAPACIDAD INTERNA
-> SEPARADOS

SESIÓN
-> BLOQUEO AS_IS OBSERVABLE

TARJETA DESHABILITADA
-> BLOQUEO AS_IS OBSERVABLE

EVALUADOR / FRESCURA / SIMULACIÓN / DISPOSITIVO / PERSISTENCIA
-> PRUEBAS EJECUTABLES MATERIALIZADAS

DESTINO E2E
-> NO CERTIFICADO DESDE LA DOCUMENTACIÓN

SHELL AS_IS
-> NO MATERIALIZA TODA LA PRESENTACIÓN FINAL

CAMBIO FÍSICO
-> NO AUTORIZADO
```

#### 71. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

Los bloqueos, fronteras de autorización, fallos técnicos, navegación adversarial, contexto y seguridad utilizados por 020 ya están protegidos por requisitos vigentes. La tarea los contrasta contra el repositorio actual y no introduce una obligación independiente.

#### 72. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico, la tarea reutiliza especialmente:

- `TREQ-SHELL-014` — sesión válida en la raíz y snapshot del launcher;
- `TREQ-SHELL-015` — disponibilidad derivada de decisión canónica y compatibilidad legacy fail-closed;
- `TREQ-SHELL-016` — aplicación sin acceso no navegable y enforcement propio del destino;
- `TREQ-SHELL-017` — cierre de sesión y no reutilización de contexto anterior;
- `TREQ-SHELL-018` — retorno restringido a destinos aprobados;
- `TREQ-SHELL-030` — visibilidad por permiso/contexto sin sustituir autorización;
- `TREQ-SHELL-031` — simulación separada de autoridad;
- `TREQ-SHELL-063` — frontera server/client fail-closed;
- `TREQ-SHELL-069` — solo `ALLOW` válido permite continuar;
- `TREQ-SHELL-070` — proyección segura de contexto;
- `TREQ-SHELL-071` — proyección segura de decisión;
- `TREQ-SHELL-072` — cliente sin autoridad propia;
- `TREQ-SHELL-073` — separación entre deny, contrato inválido y fallos backend;
- `TREQ-SHELL-078` — invalidación después de cambios relevantes;
- `TREQ-SHELL-079` — correlación y observabilidad sin ampliar autoridad.

Los requisitos de autorización propietarios continúan cubriendo las razones y condiciones subyacentes.

#### 73. Decisiones sobre 04A

La prueba no cambia:

- regla protegida;
- owner;
- paquete;
- estado;
- artefacto;
- último resultado;
- evidencia;
- relación.

La existencia de pruebas ejecutables inspeccionadas no se convierte en resultado `VERIFICADO`, porque esta conversación no ejecutó esas suites ni certificó un ambiente.

#### 74. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-020 — Probar navegación con bloqueos reales`.
- [ ] `SHELL-APP-019` permanece como tarea anterior.
- [ ] `SHELL-APP-021` permanece como siguiente tarea.
- [ ] La conversación permanece documental.
- [ ] La topología `PER_IMPLEMENTATION_UNIT` no se interpreta como autorización física.
- [ ] Se conserva el handoff completo de 019.
- [ ] Las veinte razones públicas vigentes están cubiertas.
- [ ] No se crea reason code local.
- [ ] Denegación e indisponibilidad técnica permanecen distintas.
- [ ] Deny de capacidad interna no se convierte en deny automático de aplicación.
- [ ] `AUTH_CHECKIN_REQUIRED` no se fabrica para `app.access` con prerrequisito `T`.
- [ ] Ausencia de sesión bloquea navegación protegida.
- [ ] Usuario autenticado no se confunde con empleado válido.
- [ ] Contexto stale no conserva autoridad.
- [ ] Cambio de actor obliga nueva resolución.
- [ ] Cambio de turno obliga nueva resolución cuando afecta navegación.
- [ ] Cambio de sede obliga nueva resolución cuando afecta navegación.
- [ ] Cambio de área obliga nueva resolución cuando afecta navegación.
- [ ] Cambio de rol operativo obliga nueva resolución.
- [ ] Cambio de grant o deny invalida resultados anteriores aplicables.
- [ ] Dispositivo compartido no concede autoridad.
- [ ] Simulación no concede autoridad real.
- [ ] Permiso no registrado no recibe alias local.
- [ ] Configuración inconsistente no se presenta como falta personal de permiso.
- [ ] Fallo backend bloquea sin simular un deny.
- [ ] Respuesta inválida bloquea.
- [ ] Contrato inválido bloquea.
- [ ] Tarjeta AS-IS `disabled` permanece no accionable.
- [ ] El bloqueo visual no sustituye enforcement server-side.
- [ ] Navegación directa no se considera autorización.
- [ ] La brecha de `returnTo` queda registrada sin corrección desde 020.
- [ ] Los ocho hallazgos de 019 conservan owner y condición de salida.
- [ ] Las suites ejecutables inspeccionadas no se presentan como ejecutadas.
- [ ] Computador y tablet conservan la misma semántica de autoridad.
- [ ] El dispositivo compartido limpia navegación personal al cambiar actor.
- [ ] La explicación no expone evidencia sensible.
- [ ] La recuperación no amplía permisos.
- [ ] 021 permanece sin desarrollar.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

#### 75. Evidencia de validación

| Clase | Estado | Evidencia |
|---|---|---|
| BUILD | NOT_APPLICABLE | La tarea produce exclusivamente un contrato documental de prueba y no modifica artefactos ejecutables que requieran build propio en esta etapa. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido incorporado al checkout documental de la tarea, por lo que su normalización y batería local corresponden al lifecycle posterior a la incorporación. |
| REMOTA | PASS | Se inspeccionaron `main` en `35089a93ff41753d565090b5e766547daa45868f`, continuidad, topología, políticas documentales, owner H2, 019, 010, 04A SHELL, `middleware.ts`, raíz, login y las suites vigentes de evaluador, frescura, simulación, dispositivo y persistencia. |
| OPERATIVA | PASS | Se cerró la matriz documental de bloqueos contra código, contratos y pruebas ejecutables reales del snapshot, incluyendo las veinte razones públicas, separación app/capacidad, deny/técnico, stale, dispositivo, simulación, navegación directa y recuperación, registrando expresamente las no conformidades AS-IS. |
| FÍSICA | NOT_APPLICABLE | La tarea documental no autoriza sesiones de staging, actores reales, cambios de ambiente ni ejecución de bloqueos físicos; esas evidencias pertenecen al lifecycle físico aplicable. |

#### 76. Límites

Esta tarea no:

- modifica `middleware.ts`;
- modifica `src/app/page.tsx`;
- modifica `src/app/login/page.tsx`;
- modifica contratos;
- modifica mensajes de autorización;
- modifica suites SQL;
- ejecuta migraciones;
- ejecuta pruebas de base de datos;
- cambia Supabase;
- cambia grants o denies;
- cambia roles;
- cambia permisos;
- cambia contexto;
- modifica dispositivos;
- configura staging;
- usa cuentas productivas;
- modifica aplicaciones destino;
- corrige `returnTo`;
- certifica enforcement E2E de destinos;
- declara ejecutadas suites inspeccionadas;
- cambia estados de requisitos por inferencia;
- crea requisitos;
- modifica 04A;
- desarrolla 021;
- autoriza implementación física.

#### 77. Cierre del minibloque de pruebas de navegación

Con 019 y 020 queda documentalmente definido:

```text
NAVEGACIÓN POR ROL
+
NAVEGACIÓN ANTE BLOQUEOS
```

019 fija quién y bajo qué contexto puede navegar.

020 fija qué impide navegar, cómo se distingue el bloqueo, qué debe revalidarse y qué brechas impiden certificar el AS-IS completo.

La materialización continúa separada del cierre documental.

#### 78. Handoff a `SHELL-APP-021`

021 recibe únicamente su responsabilidad ya reservada:

- los enlaces visibles `Mi perfil` y `Configuración de usuario`;
- su destino actual `/`;
- la obligación de no presentar una capacidad inexistente;
- el inventario y hallazgos previos relacionados.

021 no recibe autorización para corregir los bloqueos documentados en 020 ni para reabrir la matriz de navegación.

#### 79. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-019 — Probar navegación por rol`

**TAREA ACTUAL APROBADA**
`SHELL-APP-020 — Probar navegación con bloqueos reales`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real`


### [ ] SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real

**Propósito:** eliminar del Hub las acciones `Mi perfil` y `Configuración` mientras no exista una capacidad funcional aprobada y una ruta propietaria distinta de `/`.

**Dependencias:** decisión de retiro `SHELL-AUD-011`; composición definida por `SHELL-UI-010`.

**Puerta de cierre:** ninguna acción visible anuncia una capacidad inexistente; navegación, build y rollback de SHELL quedan verificados. Crear perfil o configuración requerirá una tarea funcional nueva y aprobación independiente.
