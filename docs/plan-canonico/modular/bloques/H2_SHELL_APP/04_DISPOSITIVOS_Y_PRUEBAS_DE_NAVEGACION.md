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


### [ ] SHELL-APP-018 — Diseñar experiencia para tablet
### [ ] SHELL-APP-019 — Probar navegación por rol
### [ ] SHELL-APP-020 — Probar navegación con bloqueos reales

### [ ] SHELL-APP-021 — Retirar placeholders de perfil y configuración sin destino real

**Propósito:** eliminar del Hub las acciones `Mi perfil` y `Configuración` mientras no exista una capacidad funcional aprobada y una ruta propietaria distinta de `/`.

**Dependencias:** decisión de retiro `SHELL-AUD-011`; composición definida por `SHELL-UI-010`.

**Puerta de cierre:** ninguna acción visible anuncia una capacidad inexistente; navegación, build y rollback de SHELL quedan verificados. Crear perfil o configuración requerirá una tarea funcional nueva y aprobación independiente.
