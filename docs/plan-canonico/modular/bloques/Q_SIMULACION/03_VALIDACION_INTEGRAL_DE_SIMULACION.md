### MINI-BLOQUE — VALIDACIÓN INTEGRAL DE SIMULACIÓN

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **validación integral de simulación** dentro de **Q SIMULACIÓN**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AUTH-SIM-012` a `AUTH-SIM-014` — 3 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `AUTH-SIM-012`: Validar navegación como rol simulado
- `AUTH-SIM-013`: Validar Server Actions como rol simulado
- `AUTH-SIM-014`: Probar en todas las aplicaciones
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-SIM-012 — Validar navegación como rol simulado

**Estado:** APROBADA
**Tarea anterior:** AUTH-SIM-011 — Definir modo solo lectura
**Tarea siguiente:** AUTH-SIM-013 — Validar Server Actions como rol simulado
**Tipo de tarea:** documental; contrato canónico de validación de navegación durante simulación, con materialización posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE Q — Simulación
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/Q_SIMULACION/03_VALIDACION_INTEGRAL_DE_SIMULACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica rutas, router, middleware, componentes, Server Actions, Route Handlers, Supabase, RLS, RPC, datos, permisos, sesiones, aplicaciones, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato verificable que deberá demostrar que una persona puede recorrer una vista previa de Vento OS como rol simulado sin que la navegación convierta el escenario hipotético en contexto real, pierda la procedencia simulada, amplíe acceso, reactive controles ejecutables o termine implícitamente la simulación.

La regla raíz queda:

```text
SIMULATION PREVIEW
+
READ-ONLY PRESENTATION
+
SIMULATED PROVENANCE PRESERVED
+
LIFECYCLE REVALIDATED
+
REAL AUTHORITY KEPT SEPARATE
=
SAFE SIMULATED NAVIGATION
```

Y siempre:

```text
ROUTE CHANGE
!=
EXIT SIMULATION
```

```text
SIMULATED NAVIGATION
!=
REAL ROUTE AUTHORIZATION
```

```text
WOULD_ALLOW
!=
ALLOW
```

---

#### 2. Pregunta contractual propietaria

Esta tarea responde exclusivamente:

```text
COMO SE VALIDA QUE LA NAVEGACION CONSERVA LA SIMULACION?
```

```text
COMO SE EVITA QUE UNA RUTA, REDIRECT, REFRESH O DEEP LINK CONVIERTA LA PREVIEW EN CONTEXTO REAL?
```

```text
COMO DEBE COMPORTARSE EL DESTINO CUANDO LA CAPACIDAD ES FULL_PREVIEW, DECISION_ONLY O NOT_ALLOWED?
```

```text
QUE EVIDENCIA DEBE PRODUCIR CADA UNIDAD FISICA PARA CERTIFICAR NAVEGACION SIMULADA?
```

La certificación específica de Server Actions permanece reservada a `AUTH-SIM-013`.

La prueba integral transversal de todas las aplicaciones permanece reservada a `AUTH-SIM-014`.

---

#### 3. Handoff recibido de AUTH-SIM-011

`AUTH-SIM-011` entrega una superficie con semántica visual ya cerrada:

```text
SIMULATION PREVIEW
-> READ-ONLY PRESENTATION
-> ZERO REAL EFFECTS
```

```text
NAVIGATION INSIDE PREVIEW
MUST PRESERVE
SIMULATED PROVENANCE
```

La navegación validada por esta tarea no redefine read-only.

Debe demostrar que ese contrato sobrevive a la transición entre superficies.

---

#### 4. Handoff recibido de AUTH-SIM-010

`AUTH-SIM-010` mantiene el enforcement autoritativo:

```text
SIMULATED ORIGIN
-> REAL EXECUTION FORBIDDEN
```

La navegación no puede utilizarse para evitar ese guard.

Moverse a otra ruta, layout, aplicación o ventana no transforma una solicitud de origen simulado en una solicitud real.

---

#### 5. Handoff recibido de AUTH-SIM-009

`AUTH-SIM-009` ya fijó que la salida requiere un terminal autoritativo y una resolución posterior de contexto real fresco.

Por tanto:

```text
NAVIGATE AWAY
!=
SIMULATION_COMPLETED
```

```text
CLOSE TAB
!=
SIMULATION_COMPLETED
```

```text
REFRESH
!=
SIMULATION_COMPLETED
```

```text
OPEN ANOTHER APP
!=
SIMULATION_COMPLETED
```

La navegación nunca sustituye el servicio propietario de salida.

---

#### 6. Handoff recibido de AUTH-SIM-007 y AUTH-SIM-008

Durante la navegación deben preservarse las semánticas visibles:

```text
RESOLVING
ACTIVE
STALE
INVALID
EXIT_PENDING
```

y el lifecycle autoritativo de inicio.

La ruta destino no inventa `ACTIVE` a partir de URL, cache, storage o estado de componente.

---

#### 7. Contratos consumidos

La tarea consume sin redefinir:

- `AUTH-SIM-001..005`, para actor, rol y dimensiones hipotéticas;
- `AUTH-SIM-006`, para separación de autoridad, evaluación, presentación y auditoría;
- `AUTH-SIM-007`, para aviso persistente y lifecycle visible;
- `AUTH-SIM-008`, para inicio autoritativo;
- `AUTH-SIM-009`, para terminales y retorno real fresco;
- `AUTH-SIM-010`, para bloqueo de ejecución y cero efectos;
- `AUTH-SIM-011`, para semántica read-only;
- `AUTH-SRV-015`, para separación entre servicios reales y evaluación simulada;
- `AUTH-DB-013`, para persistencia y lifecycle de simulación;
- el catálogo vigente de `simulation_requirement`;
- los contratos de navegación, aplicación, contexto, recurso, privacidad, accesibilidad, dispositivo compartido e invalidación ya aprobados.

---

#### 8. Topología y materialización posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

El marcador documental se desarrolla una sola vez.

La validación física posterior se materializa por `implementation_unit_id`.

Esta tarea no crea, autoriza ni ejecuta ninguna instancia física.

---

#### 9. Definición de navegación simulada

Navegación simulada es el tránsito entre representaciones de superficies dentro de una simulación vigente, conservando:

- actor real;
- sesión real;
- identidad de simulación;
- revisión vigente;
- rol simulado tipado;
- contexto hipotético;
- `simulation_requirement`;
- lifecycle;
- read-only;
- aviso persistente;
- cero efectos reales;
- autoridad real como techo de datos.

No equivale a navegar con los permisos del rol simulado.

---

#### 10. Navegación de preview frente a navegación real

Se distinguen dos carriles:

```text
SIMULATION PRESENTATION PLANE
-> PREVIEW NAVIGATION
```

```text
REAL AUTHORITY PLANE
-> REAL NAVIGATION
```

Una transición de preview no cruza al plano real por el solo hecho de cambiar pathname o aplicación.

El cambio de carril requiere terminar o abandonar de forma autoritativa la simulación cuando corresponda y resolver contexto real fresco.

---

#### 11. Fuente autoritativa del estado de navegación

No son fuente suficiente para demostrar simulación vigente:

- pathname;
- query params;
- hash;
- referrer;
- history state;
- cookie aislada;
- `localStorage`;
- `sessionStorage`;
- IndexedDB;
- estado React;
- prop local;
- nombre del rol;
- nombre de la aplicación;
- `simulation_id` aportado unilateralmente por el cliente;
- `can_operate`;
- resultado simulado cacheado.

El destino debe consumir una proyección resuelta por el owner correspondiente.

---

#### 12. Identidades que deben permanecer separadas

Toda validación debe mantener separados:

```text
REAL ACTOR
REAL SESSION
REAL ROLE
REAL CONTEXT
SIMULATION IDENTITY
SIMULATED ROLE
SIMULATED CONTEXT
DESTINATION
```

La identidad de destino no reemplaza ninguna identidad de autorización.

---

#### 13. Precondición de navegación

Para tratar una transición como navegación simulada deben poder demostrarse, según aplique:

1. sesión real vigente;
2. actor real vigente;
3. simulación asociada y no terminal;
4. revisión o escenario vigente;
5. procedencia simulada;
6. clasificación del permiso o capacidad;
7. destino reconocible por el owner;
8. read-only aplicable;
9. frontera de datos bajo autoridad real.

La ausencia de evidencia concluyente no habilita navegación permisiva.

---

#### 14. Resultado esperado de la validación

Una ruta simulada válida demuestra simultáneamente:

```text
ORIGIN IS SIMULATED
DESTINATION REMAINS SIMULATED
NOTICE REMAINS PERCEPTIBLE
READ-ONLY REMAINS ACTIVE
REAL AUTHORITY IS NOT EXPANDED
NO REAL EFFECT OCCURS
```

Si cualquiera de estas propiedades no puede demostrarse, la preview no debe presentarse como transición simulada válida.

---

#### 15. Vista de navegación no equivale a apertura real

La simulación puede representar aplicaciones, rutas, módulos y destinos hipotéticos.

Sin embargo:

```text
ROUTE VISIBLE IN PREVIEW
!=
ROUTE OPENABLE WITH SIMULATED AUTHORITY
```

La apariencia de accesibilidad nunca sustituye la autorización real.

---

#### 16. FULL_PREVIEW

Cuando una capacidad es `FULL_PREVIEW`, una ruta puede participar en una preview funcional si:

- la simulación sigue vigente;
- el destino conserva procedencia simulada;
- el aviso permanece;
- el modo read-only permanece;
- los datos reales visibles no exceden la autoridad real del actor;
- cualquier dato adicional es sintético, vacío o enmascarado conforme al owner;
- no existe ejecución real.

`FULL_PREVIEW` no concede acceso real al destino.

---

#### 17. DECISION_ONLY

Cuando una capacidad es `DECISION_ONLY`:

- puede mostrarse la decisión hipotética y su explicación permitida;
- no se abre por autoridad simulada un recurso protegido;
- no se materializa una pantalla operativa completa;
- no se transporta al actor a un formulario real;
- no se expone contenido protegido por el rol simulado.

La navegación puede conducir únicamente a una presentación explicativa permitida por el owner, no a una superficie operativa habilitada por la simulación.

---

#### 18. NOT_ALLOWED

Cuando una capacidad es `NOT_ALLOWED`:

```text
NO SIMULATION PREVIEW FOR THAT CAPABILITY
```

La navegación no degrada esta clasificación a read-only.

No se crea una ruta de preview alternativa para evadir la exclusión.

---

#### 19. Clasificación ausente o desconocida

Si `simulation_requirement` no puede resolverse de forma concluyente:

```text
UNKNOWN SIMULATION CLASSIFICATION
-> FAIL CLOSED
```

No se usa `FULL_PREVIEW` como default.

---

#### 20. Destino no compatible con simulación

Si el destino no puede conservar las propiedades de simulación exigidas:

- no se abre como contexto real implícito;
- no se oculta silenciosamente el aviso;
- no se elimina read-only para continuar;
- no se considera salida;
- no se reutiliza un `WOULD_ALLOW`;
- la superficie adopta una condición segura conforme a su owner.

El usuario puede salir mediante el flujo propietario de salida cuando corresponda.

---

#### 21. Destino permitido al actor real

Que el actor real tenga acceso al destino fuera de simulación no autoriza a reutilizar esa autoridad dentro de una transición originada en preview.

Debe mantenerse:

```text
REAL ACTOR MAY ACCESS DESTINATION
+
CURRENT REQUEST HAS SIMULATED ORIGIN
=
CURRENT REQUEST REMAINS SIMULATED
```

Una navegación real posterior requiere intención real nueva y contexto real fresco.

---

#### 22. Destino no permitido al actor real

El rol simulado no amplía el acceso real del actor.

Si el destino requeriría datos o acceso que la persona real no posee:

- no se obtiene ese acceso por simulación;
- no se descargan datos para ocultarlos después;
- no se transportan credenciales simuladas;
- no se utiliza el rol simulado en guards reales.

La preview podrá utilizar representación sintética, enmascarada o explicativa únicamente cuando el contrato lo permita.

---

#### 23. Navegación interna dentro de una aplicación

Una transición interna debe:

- conservar procedencia simulada;
- conservar lifecycle;
- revalidar lo material antes de publicar el destino;
- mantener el aviso;
- mantener read-only;
- descartar respuestas stale;
- no reusar autoridad real o simulada de forma ambigua.

El router no es una fuente de autorización.

---

#### 24. Navegación entre layouts

Cambiar de layout no puede:

- desmontar el aviso y convertir la página en real;
- perder el modo read-only;
- sustituir el contexto simulado por contexto real cacheado;
- reactivar handlers;
- omitir la revalidación requerida.

La composición destino debe conocer o resolver la condición de simulación antes de presentar contenido operativo.

---

#### 25. Navegación entre aplicaciones

Cuando una preview representa transición entre aplicaciones:

1. la aplicación origen no concede autoridad a la aplicación destino;
2. la aplicación destino resuelve sus contratos propios;
3. el actor real permanece el mismo mientras la sesión siga vigente;
4. el rol simulado permanece una dimensión hipotética, no una credencial;
5. la clasificación del destino debe resolverse;
6. el destino no hereda un `ALLOW` de la aplicación origen;
7. la salida no se infiere por cambiar de aplicación.

---

#### 26. Handoff cross-app

Un handoff de preview puede transportar referencias mínimas necesarias para reconstruir la intención simulada, pero esas referencias:

- no son tokens de autorización;
- no son claims;
- no son grants;
- no son prueba de lifecycle vigente;
- no sustituyen la revalidación del destino;
- no autorizan datos.

La aplicación destino verifica la fuente propietaria antes de presentar la preview.

---

#### 27. Launcher

El launcher puede representar visibilidad hipotética cuando la simulación lo permita.

Debe mantenerse:

```text
APP VISIBLE IN SIMULATION
!=
REAL APP ACCESS
```

Seleccionar una aplicación desde preview no utiliza el rol simulado para superar el acceso real ni los guards del destino.

---

#### 28. Deep links

Un deep link:

- localiza un destino;
- no inicia simulación;
- no reactiva simulación terminal;
- no concede rol;
- no concede permisos;
- no restaura contexto desde parámetros;
- no transforma un escenario simulado en contexto real.

Si existe una simulación vigente asociada al actor, el destino debe resolverla por la fuente autoritativa.

---

#### 29. URL directa

Escribir o pegar una URL directamente no constituye bypass.

El destino no confía en que el flujo comenzó desde una pantalla anterior.

Debe producir el mismo resultado seguro que una navegación interna equivalente.

---

#### 30. Query params

Un parámetro de consulta puede transportar información de presentación cuando el owner lo permita, pero no puede establecer:

- actor;
- rol real;
- rol simulado autoritativo;
- sede real;
- área real;
- turno real;
- permiso;
- `ALLOW`;
- lifecycle activo.

Manipular query params no cambia autoridad.

---

#### 31. Hash y fragmentos

Un fragmento de URL no crea ni elimina simulación.

Puede cambiar una sección visible o posición de la página, pero no modifica:

- lifecycle;
- procedencia;
- autorización;
- read-only;
- clasificación;
- contexto real.

---

#### 32. Redirect cliente

Un redirect iniciado en cliente conserva la misma obligación de revalidación en el destino.

No se considera seguro porque provenga de código interno.

Una respuesta stale o un callback anterior no puede redirigir a una superficie real usando la intención simulada.

---

#### 33. Redirect servidor

Un redirect producido por servidor tampoco concede autoridad adicional.

El destino debe evaluar sus propias condiciones.

La existencia de una respuesta server-side no transforma `WOULD_ALLOW` en `ALLOW`.

---

#### 34. Replace y push del router

Cambiar la historia mediante operaciones equivalentes a push o replace no cambia el lifecycle.

El método de navegación no decide si la simulación está activa.

---

#### 35. Back

Navegar hacia atrás no puede restaurar una preview vieja como vigente sin revalidación.

Si el lifecycle cambió desde la visita anterior, prevalece el estado autoritativo actual.

---

#### 36. Forward

Navegar hacia adelante no puede reactivar una simulación terminal ni una revisión stale.

El browser history no es una fuente de autoridad.

---

#### 37. Back-forward cache

Cuando una página vuelve desde cache de navegación:

- no se asume que `ACTIVE` sigue vigente;
- no se reactivan handlers;
- no se conserva un `WOULD_ALLOW` como actual;
- la superficie vuelve a comprobar lifecycle y contexto material antes de presentarse como preview vigente.

---

#### 38. Refresh

Un refresh debe reconstruir:

- sesión real;
- actor real;
- lifecycle;
- simulación asociada;
- revisión vigente;
- clasificación;
- datos permitidos;
- aviso;
- read-only.

No se reconstruye la autoridad desde estado React o storage.

---

#### 39. Hard reload

Una recarga completa no equivale a salida.

Si la simulación sigue vigente, la aplicación vuelve a resolverla.

Si ya es terminal, la aplicación no resucita la preview.

---

#### 40. Nueva pestaña

Abrir un destino en otra pestaña no clona autoridad desde la pestaña origen.

La nueva pestaña debe resolver por sí misma:

- sesión;
- actor;
- lifecycle;
- destino;
- clasificación;
- procedencia.

No se acepta un snapshot del tab origen como prueba suficiente.

---

#### 41. Nueva ventana

Una nueva ventana aplica la misma regla que una nueva pestaña.

La apertura no crea otra simulación independiente ni otra sesión de autorización.

---

#### 42. Varias tabs

Todas las tabs asociadas al mismo lifecycle deben converger.

Una tab no puede:

- conservar `ACTIVE` después de un terminal;
- ejecutar navegación real porque otra tab salió;
- ocultar el aviso por estado local;
- restaurar un escenario anterior;
- transferir un draft hipotético como intención real.

---

#### 43. Cambio de actor en dispositivo compartido

Si cambia el actor humano:

- la preview anterior deja de ser utilizable;
- la navegación no continúa en nombre del actor anterior;
- no se transfiere rol simulado;
- no se transfieren resultados;
- no se reutiliza la sesión de simulación como autoridad;
- se vuelve a resolver el contexto conforme al owner.

---

#### 44. Principal técnico

El principal técnico de un dispositivo compartido no sustituye al actor humano.

La navegación puede conservar el principal técnico necesario para el dispositivo, pero no obtiene de él autorización humana ni contexto simulado.

---

#### 45. Navegación durante RESOLVING

Mientras el estado visible es `RESOLVING`:

- no se publica como confirmada una ruta basada en un escenario no resuelto;
- no se conserva una preview anterior como vigente;
- no se habilita destino por optimismo;
- no se usa un resultado cacheado para decidir acceso.

La UI puede mostrar estado seguro mientras revalida.

---

#### 46. Navegación durante ACTIVE

En `ACTIVE`, una transición puede continuar dentro de la preview cuando el destino y su clasificación lo permiten.

Debe preservar aviso, read-only y procedencia simulada.

`ACTIVE` no habilita acción real.

---

#### 47. Navegación durante STALE

En `STALE`:

- la preview se suspende;
- una navegación no renueva vigencia;
- el último resultado no se usa para abrir contenido adicional;
- debe revalidarse antes de continuar.

---

#### 48. Navegación durante INVALID visible

`INVALID` de presentación no es fallback a contexto real.

La ruta no habilita controles reales simplemente porque la preview deba retirarse.

Se espera o ejecuta la recuperación propietaria.

---

#### 49. Navegación durante EXIT_PENDING

Durante `EXIT_PENDING`:

- la superficie sigue tratándose como simulada;
- un cambio de ruta no confirma la salida;
- no se anticipa contexto real;
- no se habilitan acciones reales;
- no se oculta prematuramente el aviso.

---

#### 50. Navegación después de COMPLETED

Después de `COMPLETED`, una request o enlace originado en la preview anterior no se convierte en real.

Se descartan artefactos simulados stale.

Una acción real posterior exige nueva intención y nueva autorización real.

---

#### 51. Navegación después de EXPIRED

Una simulación expirada no puede continuar por navegación.

El destino no utiliza cache o URL para prolongar `ACTIVE`.

---

#### 52. Navegación después de REVOKED

Una revocación prevalece sobre cualquier historial de navegación local.

El destino no puede reactivar el escenario por refresh, deep link o back.

---

#### 53. Navegación después de INVALID terminal

Un lifecycle terminal inválido no se transforma en sesión real.

La aplicación vuelve a resolver contexto real conforme al contrato propietario antes de permitir navegación real.

---

#### 54. Respuestas tardías

Después de cambiar de destino, una respuesta tardía del origen o de una revisión anterior no puede:

- reemplazar el estado actual;
- reactivar aviso incorrecto;
- publicar `ACTIVE` obsoleto;
- abrir una ruta anterior;
- habilitar controles;
- restaurar datos no vigentes.

Se compara identidad, revisión, correlación y lifecycle antes de aceptar la respuesta.

---

#### 55. Carrera entre navegación y terminal

Si una navegación y un terminal ocurren concurrentemente, el terminal autoritativo prevalece.

No se completa la transición como preview activa después de conocer el terminal.

---

#### 56. Carrera entre navegación y cambio de escenario

Si cambia una dimensión material del escenario durante una transición:

- la navegación anterior queda asociada a la revisión antigua;
- su respuesta no sustituye la nueva;
- el destino revalida la revisión vigente;
- no se conserva un `WOULD_ALLOW` anterior.

---

#### 57. Carrera entre navegación y cambio de política

Una modificación material del catálogo, permiso, contexto o política invalida la proyección stale.

La navegación no conserva una decisión anterior como autoridad.

---

#### 58. Offline antes de navegar

Offline no crea una navegación autoritativa nueva.

Puede conservar presentación local segura si el owner lo permite, pero no ampliar datos ni abrir una superficie que requiera resolución nueva.

---

#### 59. Offline durante navegación

Si se pierde conectividad durante una transición material:

- no se asume éxito;
- no se confirma un destino que requiera autoridad nueva;
- no se transforma la preview en editor offline;
- no se encola una acción real;
- al reconectar se revalida.

---

#### 60. Reconexión

La reconexión no reproduce automáticamente la última navegación como operación real.

Se vuelve a resolver lifecycle, actor, clasificación y destino.

---

#### 61. Cache de datos

Una ruta puede reutilizar datos cacheados únicamente cuando el owner puede demostrar que siguen siendo válidos para:

- actor real;
- alcance real;
- revisión;
- lifecycle;
- política vigente.

La cache nunca amplía el dataset por rol simulado.

---

#### 62. Cache de navegación

Una cache de ruta no es prueba de simulación vigente.

No puede restaurar por sí sola:

- aviso;
- rol simulado;
- `ACTIVE`;
- read-only;
- datos;
- autorización.

---

#### 63. Prefetch

El prefetch de una ruta no debe descargar datos protegidos que el actor real no puede consultar.

La posibilidad de representar hipotéticamente un destino no autoriza prefetch de su contenido real.

---

#### 64. Streaming y carga parcial

Una navegación con contenido parcial no debe filtrar información antes de resolver las condiciones aplicables.

Skeleton, streaming o render progresivo no convierten la verificación tardía en autorización válida.

---

#### 65. Error de destino

Un error técnico en la ruta destino no habilita fallback permisivo.

La superficie distingue fallo técnico de decisión de autorización y mantiene la simulación en condición segura.

---

#### 66. Destino inexistente

Una ruta inexistente no termina la simulación ni cambia autoridad.

La experiencia puede mostrar el error de navegación sin convertir la sesión a contexto real.

---

#### 67. Redirección por acceso real insuficiente

Si la autoridad real impide entrar al destino real, la preview no usa el rol simulado para superar esa denegación.

Cualquier superficie explicativa permanece separada de la ruta protegida.

---

#### 68. Acción desde navegación

Un link, breadcrumb, tab, card, menú, command palette o acceso rápido que represente navegación no puede convertirse en writer empresarial.

Si su activación produce efectos distintos de navegación, esos efectos permanecen bajo `AUTH-SIM-010`.

---

#### 69. Breadcrumbs

Los breadcrumbs pueden representar jerarquía de la preview.

Activarlos conserva procedencia simulada y no restaura contexto real por retroceder en la jerarquía.

---

#### 70. Menús y navegación lateral

Menús laterales, superiores o contextuales pueden mostrar destinos hipotéticos conforme a la clasificación.

La visibilidad de una opción no constituye `ALLOW`.

---

#### 71. Command palette y búsqueda de destinos

Una paleta o buscador de rutas no crea bypass.

Los resultados pueden representar opciones permitidas de preview, pero el destino vuelve a validar las condiciones aplicables.

---

#### 72. Navegación por teclado

Tab, Enter, shortcuts o accesos rápidos deben producir semántica equivalente a click.

No existe un camino alterno que pierda read-only o procedencia simulada.

---

#### 73. Navegación táctil

Tap, swipe, long press o gestos equivalentes no cambian las reglas de simulación.

---

#### 74. Accesibilidad de transición

La persona debe poder comprender:

- que continúa en simulación;
- qué rol sigue siendo simulado;
- que el destino es una preview;
- que las acciones reales siguen no ejecutables;
- cuándo la preview se encuentra resolviendo, stale, inválida o saliendo.

La transición no depende únicamente de color o animación.

---

#### 75. Foco después de navegar

El manejo de foco pertenece al owner de la superficie, pero no puede ocultar el estado de simulación ni impedir percibir el aviso obligatorio.

La navegación no necesita anunciar repetidamente todo el aviso si el estado no cambió, siempre que siga siendo perceptible y accesible.

---

#### 76. Privacidad de destino

La navegación simulada no revela:

- rutas ocultas por seguridad;
- nombres de recursos que el actor real no puede conocer;
- identificadores sensibles;
- permisos internos;
- claims;
- reason codes privados;
- tokens;
- secretos;
- datos de terceros fuera del alcance real.

La simulación explica sin ampliar información protegida.

---

#### 77. Datos reales en el destino

Debe mantenerse:

```text
SIMULATED ROLE WOULD SEE DATA
+
REAL ACTOR CANNOT READ DATA
=
DO NOT EXPOSE REAL DATA
```

La navegación no modifica esa regla.

---

#### 78. Datos sintéticos en el destino

Una preview `FULL_PREVIEW` puede usar datos sintéticos si el owner lo permite.

Deben permanecer diferenciados de registros reales y no crear entidades empresariales.

---

#### 79. Datos enmascarados en el destino

El enmascaramiento puede apoyar una preview cuando el contrato lo permita.

No sustituye autorización ni puede ser reversible mediante información entregada al cliente.

---

#### 80. Estado vacío

Una preview puede utilizar estado vacío.

Ese estado no prueba que el sistema real carezca de registros.

---

#### 81. Formulario en destino

Cuando `FULL_PREVIEW` permita representar un formulario:

- permanece read-only en el sentido definido por `AUTH-SIM-011`;
- los cambios locales siguen siendo hipotéticos;
- no existe autosave real;
- el submit real permanece no ejecutable.

La navegación hacia el formulario no habilita el writer.

---

#### 82. DECISION_ONLY y rutas operativas

`DECISION_ONLY` no abre una ruta operativa completa por el solo hecho de que la decisión hipotética sea positiva.

Puede mostrarse una explicación del resultado sin exponer el recurso protegido.

---

#### 83. NOT_ALLOWED y launcher

Una capacidad `NOT_ALLOWED` no aparece como preview funcional habilitable por la simulación.

Si una aplicación contiene otras capacidades simulables, esas capacidades se evalúan por separado sin convertir la excluida en permitida.

---

#### 84. La simulación no elige el guard real

El rol simulado no selecciona qué guard real ejecutar ni qué política omitir.

La ruta destino conserva sus protecciones reales.

---

#### 85. No préstamo de autorización entre rutas

Una decisión real o simulada obtenida para una ruta no autoriza otra ruta por semejanza.

Cambiar recurso, capacidad, aplicación o contexto exige la evaluación correspondiente.

---

#### 86. No préstamo de resultados entre revisiones

Una evaluación de una revisión anterior no acompaña automáticamente a la nueva ruta.

La revisión vigente controla la preview.

---

#### 87. No préstamo entre actor y sujeto simulado

El sujeto simulado no se convierte en actor autenticado del destino.

La auditoría y acceso real continúan perteneciendo al actor real.

---

#### 88. No préstamo entre dispositivo y humano

El principal de dispositivo no se convierte en usuario humano al cambiar de aplicación o ruta.

---

#### 89. No bypass por pérdida de estado cliente

Perder un estado local durante navegación debe producir re-resolución o condición segura.

Nunca produce:

```text
SIMULATION STATE MISSING
-> ASSUME REAL CONTEXT
```

---

#### 90. No bypass por manipulación de history

Modificar history state, volver atrás, avanzar o reemplazar URL no cambia el plano de autoridad.

---

#### 91. No bypass por rutas no instrumentadas

Una ruta que todavía no materialice el contrato no se considera automáticamente segura.

La ausencia de instrumentación física permanece una brecha hasta que la unidad correspondiente aporte evidencia.

---

#### 92. No bypass por navegación externa

Una preview no dispara integraciones, pagos, mapas operativos, proveedores, hardware ni otros flujos externos con efectos reales por tratarse de un enlace.

La naturaleza y autorización del destino externo pertenecen a su owner.

---

#### 93. Separación con Server Actions

Esta tarea puede exigir que la navegación no produzca efectos reales.

No certifica internamente la implementación de Server Actions.

`AUTH-SIM-013` mantiene la responsabilidad específica de demostrar que Server Actions no consumen autoridad simulada.

---

#### 94. Separación con prueba integral de aplicaciones

Esta tarea define el contrato de navegación y la matriz mínima de validación.

No declara que las diez aplicaciones ya lo cumplan físicamente.

`AUTH-SIM-014` conserva la certificación integral por aplicaciones aplicables.

---

#### 95. Aplicaciones canónicas como universo de destino

El universo de aplicaciones canónicas sigue siendo:

- SHELL;
- ANIMA;
- AURA;
- FOGO;
- NEXO;
- NUMERA;
- ORIGO;
- PASS;
- PULSO;
- VISO.

Esta tarea no crea rutas concretas ni declara cobertura física completa por aplicación.

---

#### 96. Regla de AURA

AURA conserva la exclusión de simulación vigente donde `simulation_requirement = NOT_ALLOWED`.

La navegación no fabrica una preview funcional de una capacidad excluida.

---

#### 97. Regla de PASS

PASS conserva la separación del dominio cliente y la exclusión vigente donde corresponda.

La navegación simulada laboral no mezcla identidad cliente con RBAC laboral.

---

#### 98. Regla de VISO

VISO no utiliza su propia capacidad de administrar o consultar simulaciones como permiso simulado para autoautorizar navegación.

El simulador sigue dependiendo del actor y autoridad reales.

---

#### 99. Regla de SHELL

SHELL coordina navegación y presentación, pero no se convierte en autoridad universal.

Una card, launcher o handoff de SHELL no concede permiso a la aplicación destino.

---

#### 100. Regla de aplicaciones operativas

ANIMA, FOGO, NEXO, NUMERA, ORIGO y PULSO pueden participar en previews únicamente conforme a clasificación y contratos vigentes.

La navegación hacia una preview no produce asistencia, producción, movimiento, costo, compra, recepción, venta, pago, cierre u otro efecto real.

---

#### 101. Estado físico positivo observado

Existe una primitiva compartida `SimulatedRoleNotice` para presentar título, rol simulado, descripción y etiqueta no ejecutable.

Esa primitiva aporta visibilidad.

No demuestra por sí sola:

- persistencia entre rutas;
- revalidación del lifecycle;
- integración con router;
- handoff cross-app;
- control de deep links;
- convergencia de tabs;
- bloqueo de escapes a contexto real.

---

#### 102. Estado físico no certificado

La inspección estática disponible no permite declarar hoy una certificación transversal de navegación simulada en todas las rutas y consumidores.

La ausencia de esa evidencia es coherente con `ESPECIFICADO_NO_MATERIALIZADO`.

No se inventa una implementación física para cerrar documentalmente la tarea.

---

#### 103. Matriz mínima de tipos de transición

| Transición | Condición esperada |
| --- | --- |
| misma ruta, cambio de subvista | conserva simulación y read-only |
| ruta interna misma aplicación | revalida lo material y conserva procedencia |
| cambio de layout | no pierde aviso ni read-only |
| launcher a aplicación | destino no hereda autoridad; resuelve su contrato |
| cross-app | handoff mínimo + revalidación en destino |
| deep link | localiza; no concede autoridad |
| URL directa | no bypass |
| redirect cliente | no bypass |
| redirect servidor | no bypass |
| back | no restaura estado stale como vigente |
| forward | no reactiva terminales |
| back-forward cache | revalida antes de publicar `ACTIVE` |
| refresh | reconstruye desde fuentes autoritativas |
| hard reload | no equivale a salida |
| nueva pestaña | resuelve por sí misma |
| nueva ventana | resuelve por sí misma |
| offline | no confirma ni amplía navegación |
| reconexión | revalida antes de continuar |
| salida solicitada | `EXIT_PENDING` conserva semántica simulada |
| terminal confirmado | request antiguo no se vuelve real |

---

#### 104. Matriz de clasificación y navegación

| `simulation_requirement` | Navegación de preview | Datos | Controles |
| --- | --- | --- | --- |
| `FULL_PREVIEW` | puede representar recorrido compatible | autoridad real como techo; sintético/enmascarado cuando aplique | read-only; cero efectos |
| `DECISION_ONLY` | solo hacia presentación explicativa permitida | sin recurso protegido por autoridad simulada | sin formulario operativo |
| `NOT_ALLOWED` | sin preview funcional de la capacidad | sin datos por simulación | sin controles de preview |
| ausente o desconocido | fail-closed | no ampliar | no habilitar |

---

#### 105. Matriz de lifecycle y navegación

| Estado | Navegación |
| --- | --- |
| `RESOLVING` | no confirmar destino basado en escenario no resuelto |
| `ACTIVE` | puede continuar preview compatible |
| `STALE` | suspender y revalidar |
| `INVALID` visible | no fallback a contexto real |
| `EXIT_PENDING` | continuar tratándose como simulada |
| `COMPLETED` | retirar preview; request antiguo no es real |
| `EXPIRED` | no prolongar por cache o URL |
| `REVOKED` | no reactivar |
| `INVALID` terminal | no convertir en sesión real |
| contexto real fresco posterior | navegación real se evalúa desde cero |

---

#### 106. Matriz de fuente no autoritativa

| Fuente | Puede localizar/presentar | Puede probar simulación vigente | Puede conceder autoridad |
| --- | ---: | ---: | ---: |
| pathname | sí | no | no |
| query param | sí | no | no |
| hash | sí | no | no |
| history state | sí | no | no |
| cookie aislada | puede participar técnicamente | no por sí sola | no |
| localStorage | puede guardar preferencia no sensible | no | no |
| sessionStorage | puede guardar preferencia no sensible | no | no |
| IndexedDB | puede apoyar cache segura | no | no |
| estado React | sí | no | no |
| `simulation_id` cliente | puede ser referencia | no por sí solo | no |
| rol mostrado | sí | no | no |
| `can_operate` | no se adopta como autoridad final | no | no |

---

#### 107. Matriz de concurrencia

| Caso | Resultado esperado |
| --- | --- |
| navegación + terminal | terminal prevalece |
| navegación + cambio de escenario | respuesta antigua se descarta |
| navegación + cambio de política | proyección stale se revalida |
| dos tabs navegan distinto | ambas conservan lifecycle común |
| una tab sale y otra navega | la segunda converge al terminal |
| respuesta tardía del origen | no reemplaza destino vigente |
| refresh durante transición | re-resolver |
| offline durante transición | no asumir éxito |
| cambio de actor | no transferir preview |

---

#### 108. Matriz de bypass

| Intento | Resultado |
| --- | --- |
| pegar URL protegida | no obtiene autoridad simulada |
| quitar query de simulación | no convierte en contexto real |
| añadir query de simulación | no inicia ni autoriza |
| manipular history | no cambia lifecycle |
| borrar storage | no termina simulación ni habilita real |
| conservar storage stale | no reactiva terminal |
| ocultar aviso | no habilita navegación real |
| abrir nueva tab | revalida |
| usar back-forward cache | revalida |
| invocar destino sin launcher | mismo guard |
| perder estado React | condición segura, nunca real por default |

---

#### 109. Evidencia mínima de una futura unidad

Cada materialización `AUTH-SIM-012` para un `implementation_unit_id` deberá demostrar, como mínimo:

1. package y unidad identificados;
2. gate E5 aplicable en PASS;
3. rutas y mecanismos de transición aplicables inventariados;
4. origen simulado demostrable;
5. destino identificado;
6. lifecycle revalidado;
7. revisión vigente revalidada;
8. actor real preservado;
9. sesión real preservada cuando siga vigente;
10. rol simulado separado del real;
11. contexto hipotético separado del real;
12. clasificación resuelta;
13. `FULL_PREVIEW` conforme;
14. `DECISION_ONLY` conforme;
15. `NOT_ALLOWED` conforme;
16. clasificación desconocida fail-closed;
17. aviso persistente durante la transición;
18. read-only persistente;
19. cero autoridad simulada real;
20. cero efectos empresariales;
21. real data ceiling preservado;
22. deep link sin bypass;
23. URL directa sin bypass;
24. query params sin autoridad;
25. hash sin autoridad;
26. redirect cliente sin bypass;
27. redirect servidor sin bypass;
28. back sin resurrección stale;
29. forward sin resurrección;
30. back-forward cache con revalidación;
31. refresh con revalidación;
32. hard reload sin salida implícita;
33. nueva tab con revalidación;
34. nueva ventana con revalidación;
35. tabs convergentes;
36. cambio de actor sin transferencia;
37. principal técnico separado;
38. `RESOLVING` fail-closed;
39. `ACTIVE` sin ejecución real;
40. `STALE` suspendido;
41. `INVALID` sin fallback real;
42. `EXIT_PENDING` sin anticipación;
43. terminal sin replay;
44. respuestas tardías descartadas;
45. carrera con terminal segura;
46. carrera con cambio de escenario segura;
47. carrera con cambio de política segura;
48. offline sin navegación autoritativa nueva;
49. reconexión con revalidación;
50. cache sin autoridad;
51. prefetch sin fuga de datos;
52. streaming sin exposición previa;
53. error técnico sin fallback permisivo;
54. destino inexistente sin cambio de autoridad;
55. accesibilidad de simulación perceptible;
56. privacidad y minimización;
57. logs y evidencia sin secretos;
58. trazabilidad suficiente para reproducir el caso;
59. rollback sin reintroducir escape a contexto real;
60. prueba positiva y negativa de los mecanismos de navegación aplicables.

---

#### 110. Casos mínimos de prueba futura

| Caso | Resultado esperado |
| --- | --- |
| `FULL_PREVIEW` navega a subvista | continúa simulada y read-only |
| `FULL_PREVIEW` navega a otra ruta | destino revalida y mantiene preview |
| `DECISION_ONLY` intenta abrir recurso | no abre recurso por autoridad simulada |
| `NOT_ALLOWED` intenta abrir preview | sin preview funcional |
| clasificación desconocida | fail-closed |
| deep link con simulación vigente | revalida y preserva procedencia si aplica |
| deep link sin simulación vigente | no crea simulación |
| URL directa a destino protegido | no bypass |
| borrar flag cliente | no convierte preview en real |
| refresh en `ACTIVE` | reconstruye y revalida |
| refresh en `EXIT_PENDING` | no supone salida |
| back tras terminal | no resucita preview |
| forward a página cacheada | no resucita preview |
| nueva tab | no clona autoridad |
| dos tabs + revocación | ambas convergen al resolver |
| offline durante cambio de ruta | no confirma transición autoritativa |
| reconexión | revalida antes de continuar |
| cambio de actor compartido | preview anterior no se transfiere |
| respuesta tardía | se descarta si no corresponde a estado vigente |
| prefetch de ruta no autorizada realmente | no expone datos protegidos |
| ruta sin integración de simulación | no se trata como real por default |
| salida confirmada + request viejo | request viejo sigue siendo simulado/no ejecutable |
| contexto real fresco + nueva navegación | se evalúa como navegación real nueva |

---

#### 111. Auditoría de validación

La evidencia futura debe poder correlacionar, cuando aplique:

- actor real;
- sesión real;
- simulación;
- revisión;
- origen;
- destino;
- clasificación;
- lifecycle observado;
- versión o fingerprint material;
- resultado de la validación;
- timestamp autoritativo;
- motivo seguro de bloqueo cuando corresponda.

La auditoría de navegación no concede autoridad.

---

#### 112. Minimización de evidencia

No se almacenan por defecto como evidencia de validación:

- JWT completos;
- access tokens;
- refresh tokens;
- cookies completas;
- contraseñas;
- PIN;
- OTP;
- service-role keys;
- API keys;
- payloads empresariales sensibles completos;
- documentos personales innecesarios.

Se utilizan referencias y fingerprints mínimos.

---

#### 113. Rollback de una futura unidad

El rollback técnico no puede:

- convertir pérdida de estado simulado en contexto real;
- retirar revalidación de deep links;
- confiar en query params como autoridad;
- confiar en history como autoridad;
- reactivar rutas reales por `WOULD_ALLOW`;
- retirar el aviso mientras siga activa la preview;
- retirar read-only mientras la simulación siga vigente;
- habilitar prefetch de datos no autorizados;
- reintroducir replay de requests simuladas;
- reactivar cache terminal;
- transferir simulación entre actores;
- convertir `DECISION_ONLY` en ruta operativa;
- convertir `NOT_ALLOWED` en preview read-only;
- degradar clasificación desconocida a `FULL_PREVIEW`;
- sustituir guards server-side por lógica de router.

---

#### 114. Invariantes

1. Ruta simulada no equivale a ruta real autorizada.
2. Cambiar de ruta no equivale a salir.
3. Cambiar de aplicación no equivale a salir.
4. Refresh no equivale a salir.
5. Hard reload no equivale a salir.
6. Cerrar una tab no equivale a salir.
7. Abrir otra tab no crea autoridad.
8. Browser history no crea autoridad.
9. Query params no crean autoridad.
10. Hash no crea autoridad.
11. Estado React no crea autoridad.
12. Storage cliente no crea autoridad.
13. `simulation_id` cliente no crea autoridad.
14. `can_operate` no se adopta como autoridad final.
15. El actor real permanece separado del rol simulado.
16. La sesión real permanece separada del lifecycle simulado.
17. El principal técnico no sustituye al humano.
18. `WOULD_ALLOW` nunca equivale a `ALLOW`.
19. `FULL_PREVIEW` no habilita ejecución real.
20. `DECISION_ONLY` no habilita recurso protegido.
21. `NOT_ALLOWED` no se degrada a read-only.
22. Clasificación desconocida falla cerrado.
23. El aviso permanece perceptible cuando corresponde.
24. Read-only permanece mientras la preview siga vigente.
25. La navegación conserva procedencia simulada.
26. La autoridad real es techo de datos.
27. Prefetch no amplía datos.
28. Streaming no filtra antes de validar.
29. Deep link no inicia simulación.
30. Deep link no resucita terminal.
31. URL directa no crea bypass.
32. Redirect cliente no crea bypass.
33. Redirect servidor no crea bypass.
34. Back no resucita estado stale.
35. Forward no resucita terminales.
36. Back-forward cache exige revalidación.
37. `RESOLVING` no habilita por optimismo.
38. `ACTIVE` no habilita acción real.
39. `STALE` exige revalidación.
40. `INVALID` visible no degrada a contexto real.
41. `EXIT_PENDING` sigue siendo simulación.
42. `COMPLETED` impide replay de preview.
43. `EXPIRED` impide prolongación local.
44. `REVOKED` prevalece sobre cache.
45. `INVALID` terminal no crea sesión real.
46. Una respuesta tardía no reemplaza el estado vigente.
47. Un terminal concurrente prevalece.
48. Un cambio de escenario invalida respuestas incompatibles.
49. Un cambio de política invalida proyecciones stale.
50. Offline no crea navegación autoritativa nueva.
51. Reconexión exige revalidación.
52. Cache no crea autoridad.
53. Un error técnico no produce fallback permisivo.
54. Una ruta inexistente no termina simulación.
55. Un destino sin soporte de preview no se abre como real implícitamente.
56. El launcher no concede autoridad.
57. Un handoff cross-app no concede autoridad.
58. La aplicación destino resuelve sus contratos propios.
59. AURA conserva exclusiones vigentes.
60. PASS conserva separación cliente/laboral.
61. VISO no autoautoriza simulación.
62. Las aplicaciones operativas conservan cero efectos.
63. `AUTH-SIM-010` sigue siendo autoridad de enforcement.
64. `AUTH-SIM-011` sigue siendo autoridad de experiencia read-only.
65. `AUTH-SIM-013` conserva certificación específica de Server Actions.
66. `AUTH-SIM-014` conserva certificación integral de aplicaciones.
67. `AUTH-DB-013` no se reabre.
68. `AUTH-SRV-015` no se redefine.
69. No se crean ni modifican requisitos de prueba.
70. No se modifica 04A.
71. No se ejecutan cambios físicos en esta tarea.

---

#### 115. Resultado documental

La tarea deja cerrado documentalmente:

1. significado de navegación simulada;
2. separación entre navegación de preview y navegación real;
3. precondiciones para tratar una transición como simulada;
4. preservación de actor, sesión, simulación, revisión y contexto;
5. interpretación de `FULL_PREVIEW`;
6. interpretación de `DECISION_ONLY`;
7. interpretación de `NOT_ALLOWED`;
8. fail-closed ante clasificación desconocida;
9. ruta interna;
10. cambio de layout;
11. cross-app;
12. launcher;
13. deep links;
14. URL directa;
15. query params;
16. hash;
17. redirects;
18. history;
19. back-forward cache;
20. refresh y hard reload;
21. tabs y ventanas;
22. cambio de actor;
23. lifecycle visible;
24. terminales;
25. carreras;
26. offline y reconexión;
27. cache y prefetch;
28. streaming;
29. privacidad;
30. accesibilidad;
31. techo de datos reales;
32. aplicaciones canónicas como universo;
33. estado físico no certificado;
34. matriz mínima de transiciones;
35. matriz de clasificación;
36. matriz de lifecycle;
37. matriz de bypass;
38. evidencia mínima por futura unidad;
39. auditoría y minimización;
40. rollback;
41. handoff hacia Server Actions.

---

#### 116. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la cobertura vigente ya exige separación entre vista de navegación y evaluación concreta, preservación de autoridad real, clasificación de simulación, bloqueo multicanal, cero efectos, paridad de canales, lifecycle, invalidación, experiencia, aplicaciones y reconciliación física. Esta tarea especializa el contrato de validación de navegación sin crear una obligación verificable nueva ni cambiar owner, prioridad, modalidad, paquete, estado o relaciones del registro.

---

#### 117. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- vista de matriz o navegación separada de la evaluación de acción;
- actor real como techo de autoridad y datos;
- navegación hipotética no ejecutable;
- cuatro planos separados;
- `FULL_PREVIEW`, `DECISION_ONLY` y `NOT_ALLOWED`;
- bloqueo de procedencia simulada;
- paridad de launcher y canales;
- lifecycle, invalidación, cache, offline y concurrencia;
- aplicaciones canónicas;
- reconciliación física.

Trazabilidad vigente reutilizada: `TREQ-AUTH-085`, `TREQ-AUTH-086`, `TREQ-AUTH-119..128`, `TREQ-AUTH-165` y `TREQ-AUTH-279..288`.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `AUTH-SIM-012`.

---

#### 118. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto de tarea fue preparado de forma independiente y todavía no ha sido incorporado al archivo propietario ni sometido al build documental del checkout del usuario |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron apertura de rama, preflight, formateador, task quality, delivery check, topología, TREQ ni batería global dentro del checkout local del usuario |
| REMOTA | `PASS` | se verificaron en solo lectura `main`, cierre de `AUTH-SIM-011`, continuidad hacia `AUTH-SIM-012`, owner de la tarea, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas de formato y desarrollo, contrato de entrega, handoff completo de `AUTH-SIM-011`, reglas previas de navegación de `AUTH-SIM-006`, clasificación vigente, cobertura 04A y estado físico de `SimulatedRoleNotice` |
| OPERATIVA | `NOT_EXECUTED` | no se ejecutó navegación real como rol simulado en una aplicación desplegada durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron rutas, router, middleware, componentes, aplicaciones, Server Actions, Route Handlers, Supabase, RLS, RPC, sesiones, datos, configuración ni despliegues |

---

#### 119. Criterios de aceptación

- [x] Se define navegación simulada sin convertirla en autoridad real.
- [x] Se conserva `ROUTE CHANGE != EXIT SIMULATION`.
- [x] Se conserva `WOULD_ALLOW != ALLOW`.
- [x] Se consume el handoff read-only de `AUTH-SIM-011`.
- [x] Se conserva el enforcement de `AUTH-SIM-010`.
- [x] Se conserva el lifecycle de `AUTH-SIM-007..009`.
- [x] Se conserva `PER_IMPLEMENTATION_UNIT`.
- [x] Se conserva `POST_E5_PACKAGE`.
- [x] Se define fuente no autoritativa de navegación.
- [x] Se preservan actor real, sesión real y rol simulado como identidades separadas.
- [x] Se define precondición de navegación simulada.
- [x] `FULL_PREVIEW` conserva read-only y techo de datos reales.
- [x] `DECISION_ONLY` no abre recurso protegido por autoridad simulada.
- [x] `NOT_ALLOWED` no se degrada a preview.
- [x] Clasificación desconocida falla cerrado.
- [x] Un destino incompatible no se abre como real implícitamente.
- [x] Acceso real del actor al destino no vuelve real la request simulada.
- [x] Falta de acceso real no se compensa con rol simulado.
- [x] Navegación interna conserva procedencia.
- [x] Cambios de layout no pierden aviso ni read-only.
- [x] Cross-app no transfiere `ALLOW`.
- [x] Handoff cross-app no se usa como credencial.
- [x] Launcher visible no equivale a acceso real.
- [x] Deep link no inicia simulación.
- [x] URL directa no crea bypass.
- [x] Query params no crean autoridad.
- [x] Hash no crea autoridad.
- [x] Redirect cliente no crea bypass.
- [x] Redirect servidor no crea bypass.
- [x] Router push/replace no cambia lifecycle.
- [x] Back no restaura preview stale como vigente.
- [x] Forward no reactiva terminales.
- [x] Back-forward cache revalida.
- [x] Refresh reconstruye desde fuentes autoritativas.
- [x] Hard reload no equivale a salida.
- [x] Nueva tab revalida.
- [x] Nueva ventana revalida.
- [x] Varias tabs convergen.
- [x] Cambio de actor no transfiere preview.
- [x] Principal técnico no sustituye al humano.
- [x] `RESOLVING` no habilita por optimismo.
- [x] `ACTIVE` preserva preview sin ejecución real.
- [x] `STALE` suspende navegación permisiva.
- [x] `INVALID` visible no degrada a contexto real.
- [x] `EXIT_PENDING` mantiene procedencia simulada.
- [x] `COMPLETED` bloquea replay del request anterior.
- [x] `EXPIRED` no se prolonga por cache.
- [x] `REVOKED` no se revierte por navegación.
- [x] `INVALID` terminal no crea sesión real.
- [x] Respuestas tardías se descartan cuando son incompatibles.
- [x] Terminal concurrente prevalece.
- [x] Cambio de escenario invalida navegación stale.
- [x] Cambio de política invalida proyecciones stale.
- [x] Offline no crea navegación autoritativa nueva.
- [x] Reconexión exige revalidación.
- [x] Cache no crea autoridad.
- [x] Prefetch no amplía datos.
- [x] Streaming no filtra datos antes de validar.
- [x] Error técnico no crea fallback permisivo.
- [x] Ruta inexistente no termina la simulación.
- [x] Breadcrumbs y menús conservan procedencia.
- [x] Command palette no crea bypass.
- [x] Teclado y gestos producen semántica equivalente.
- [x] La transición sigue siendo accesible y perceptible.
- [x] Privacidad y minimización se conservan.
- [x] Datos reales requieren autoridad real.
- [x] Datos sintéticos permanecen separados.
- [x] Datos enmascarados no sustituyen autorización.
- [x] Empty state no afirma ausencia real de datos.
- [x] Formularios destino permanecen no ejecutables.
- [x] No se presta autorización entre rutas.
- [x] No se prestan resultados entre revisiones.
- [x] Sujeto simulado no se convierte en actor.
- [x] Pérdida de estado cliente no produce contexto real por default.
- [x] Rutas no instrumentadas permanecen sin certificación.
- [x] Navegación externa no produce efectos reales.
- [x] `AUTH-SIM-013` conserva Server Actions.
- [x] `AUTH-SIM-014` conserva certificación integral.
- [x] Se preservan las diez aplicaciones canónicas sin declarar cobertura física.
- [x] AURA conserva exclusión vigente.
- [x] PASS conserva separación cliente/laboral.
- [x] VISO no autoautoriza simulación.
- [x] SHELL no se convierte en autoridad universal.
- [x] Aplicaciones operativas conservan cero efectos.
- [x] `SimulatedRoleNotice` se reconoce como presentación, no certificación de navegación.
- [x] Se define evidencia mínima por futura unidad.
- [x] Se define rollback fail-closed.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se ejecutan cambios físicos.
- [x] `AUTH-SIM-013` permanece reservada.

---

#### 120. Límites

Esta tarea no:

- modifica rutas;
- crea rutas;
- modifica router;
- modifica middleware;
- modifica layouts;
- modifica `AppShell`;
- modifica `SimulatedRoleNotice`;
- modifica aplicaciones;
- modifica `@vento/os-context`;
- modifica Server Components;
- modifica Client Components;
- modifica Server Actions;
- modifica Route Handlers;
- modifica Edge Functions;
- modifica Realtime;
- modifica Supabase;
- crea migraciones;
- cambia RLS;
- cambia grants;
- cambia RPC;
- cambia sesiones;
- cambia roles;
- cambia permisos;
- cambia `simulation_requirement`;
- reclasifica permisos;
- modifica `AUTH-DB-013`;
- redefine `AUTH-SRV-015`;
- ejecuta navegación física;
- ejecuta simulaciones reales;
- certifica una aplicación concreta;
- certifica Server Actions de `AUTH-SIM-013`;
- ejecuta la prueba integral de `AUTH-SIM-014`;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A.

---

#### 121. Handoff exacto hacia AUTH-SIM-013

`AUTH-SIM-012` entrega a `AUTH-SIM-013` una frontera de navegación cerrada:

```text
NAVIGATION MAY PRESERVE A SIMULATION
BUT NEVER GRANTS REAL AUTHORITY
```

```text
DESTINATION REQUEST WITH SIMULATED ORIGIN
REMAINS NON-EXECUTABLE
```

```text
ROUTER / URL / HISTORY
ARE NOT AUTHORIZATION SOURCES
```

`AUTH-SIM-013` deberá demostrar específicamente que una Server Action alcanzada desde cualquier ruta, redirect, deep link, tab, refresh o componente de preview no consume autoridad simulada ni produce un efecto real.

La certificación de Server Actions no puede sustituirse por una prueba visual de navegación.

---

#### 122. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-SIM-011 — Definir modo solo lectura`

**TAREA ACTUAL APROBADA**
`AUTH-SIM-012 — Validar navegación como rol simulado`

**SIGUIENTE TAREA RESERVADA**
`AUTH-SIM-013 — Validar Server Actions como rol simulado`


### [ ] AUTH-SIM-013 — Validar Server Actions como rol simulado
### [ ] AUTH-SIM-014 — Probar en todas las aplicaciones
