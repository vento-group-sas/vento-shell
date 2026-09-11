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


### ✅ AUTH-SIM-013 — Validar Server Actions como rol simulado

**Estado:** APROBADA
**Tarea anterior:** AUTH-SIM-012 — Validar navegación como rol simulado
**Tarea siguiente:** AUTH-SIM-014 — Probar en todas las aplicaciones
**Tipo de tarea:** documental; contrato canónico de validación específica de Server Actions ante procedencia simulada, con materialización posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE Q — Simulación
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/Q_SIMULACION/03_VALIDACION_INTEGRAL_DE_SIMULACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica Server Actions, helpers server, contratos compartidos, rutas, Route Handlers, RPC, RLS, Edge Functions, Supabase, migraciones, datos, sesiones, permisos, aplicaciones, colas, integraciones, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato verificable que deberá demostrar que una Server Action alcanzada desde una simulación nunca consume autoridad simulada como permiso real, nunca convierte `WOULD_ALLOW` en `ALLOW`, nunca produce un efecto empresarial por la procedencia de la preview y conserva una separación inequívoca entre el actor real, la sesión real, el escenario hipotético y cualquier operación real posterior.

La regla raíz queda:

```text
SERVER ACTION
+
SIMULATED ORIGIN
+
REAL BUSINESS ACTION OR PROTECTED REAL READ
=
DENY BEFORE REAL EFFECT
```

Y simultáneamente:

```text
SIMULATED ROLE
!=
SERVER-SIDE AUTHORITY
```

```text
WOULD_ALLOW
!=
ALLOW
```

```text
SIMULATION RESULT
-> executable = false
```

---

#### 2. Pregunta contractual propietaria

Esta tarea responde exclusivamente:

```text
COMO SE DEMUESTRA QUE UNA SERVER ACTION NO EJECUTA CON AUTORIDAD SIMULADA?
```

```text
COMO SE DISTINGUE UNA ACCION EMPRESARIAL REAL DE UNA OPERACION PROPIA DEL LIFECYCLE O DE LA EVALUACION DE SIMULACION?
```

```text
QUE DEBE OCURRIR SI UNA SERVER ACTION RECIBE FORM DATA, ARGUMENTOS, CACHE O CONTEXTO CLIENTE QUE INTENTAN PRESENTAR UN ROL SIMULADO COMO AUTORIDAD?
```

```text
QUE EVIDENCIA DEBE PRODUCIR CADA UNIDAD FISICA PARA CERTIFICAR SERVER ACTIONS BAJO SIMULACION?
```

La prueba integral de todas las aplicaciones permanece reservada a `AUTH-SIM-014`.

---

#### 3. Handoff recibido de AUTH-SIM-012

`AUTH-SIM-012` entrega una frontera de navegación ya cerrada:

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

Por tanto, una Server Action alcanzada después de una ruta, redirect, deep link, tab, refresh, hard reload, back/forward o componente de preview no puede interpretar el cambio de superficie como salida de simulación ni como recuperación automática de autoridad real.

---

#### 4. Handoff recibido de AUTH-SIM-010 y AUTH-SIM-011

`AUTH-SIM-010` conserva el enforcement autoritativo:

```text
SIMULATED ORIGIN
-> REAL EXECUTION FORBIDDEN
```

`AUTH-SIM-011` conserva la experiencia read-only:

```text
SIMULATION PREVIEW
-> READ-ONLY PRESENTATION
-> ZERO REAL EFFECTS
```

Esta tarea no redefine esas dos decisiones.

Su responsabilidad es demostrar específicamente que el boundary Server Action conserva ambas aunque el frontend falle, el control visual sea manipulado o la acción sea invocada por un camino alterno.

---

#### 5. Handoff recibido de AUTH-SIM-006 y AUTH-SRV-015

La separación contractual vigente exige cuatro planos distintos:

```text
REAL_AUTHORITY_PLANE
SIMULATED_EVALUATION_PLANE
SIMULATION_PRESENTATION_PLANE
SIMULATION_AUDIT_PLANE
```

Solo el plano real puede producir `ALLOW` ejecutable.

`AUTH-SRV-015` conserva separados, entre otros:

```text
real_actor_id
real_session_id
real_base_role
real_operational_role
real_site_ids
real_area_ids
real_active_shift_id
```

frente a:

```text
simulated_subject_reference
simulation_session_id
simulated_base_role
simulated_operational_role
simulated_site_id
simulated_area_id
simulated_shift_reference
```

Una Server Action no puede completar campos reales faltantes usando su equivalente simulado.

---

#### 6. Contratos consumidos

La tarea consume sin redefinir:

- `AUTH-SIM-001..005`, para actor, rol y dimensiones hipotéticas del escenario;
- `AUTH-SIM-006`, para separación entre autoridad real, evaluación simulada, presentación y auditoría;
- `AUTH-SIM-007`, para aviso persistente y lifecycle visible;
- `AUTH-SIM-008`, para inicio autoritativo;
- `AUTH-SIM-009`, para terminales, salida y retorno a contexto real fresco;
- `AUTH-SIM-010`, para bloqueo de ejecución, código de bloqueo y cero efectos;
- `AUTH-SIM-011`, para modo read-only;
- `AUTH-SIM-012`, para preservación de procedencia durante navegación;
- `AUTH-SRV-001`, para identidad e inventario de superficies Server Action;
- `AUTH-SRV-004..014`, para protección, autorización, territorio, contexto, estado y atribución de acciones de servidor;
- `AUTH-SRV-015`, para separación y auditoría del rol simulado;
- `AUTH-SRV-016..018`, para respuesta de error, helpers compartidos y prerrequisitos de acciones administrativas;
- `AUTH-DB-013`, para persistencia y lifecycle de simulación;
- el catálogo vigente de `simulation_requirement`;
- los contratos vigentes de autorización, contexto, recursos, privacidad, auditoría, idempotencia, concurrencia y dispositivos compartidos.

---

#### 7. Topología y materialización posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

El marcador documental define una sola vez el contrato reutilizable.

Cada futura materialización física se identifica por su `implementation_unit_id`, reconcilia las Server Actions realmente pertenecientes a esa unidad y produce evidencia propia después del gate E5 aplicable.

Esta tarea no crea, autoriza ni ejecuta una instancia física.

---

#### 8. Resultado material

Se definen cinco artefactos documentales vinculantes:

1. `SIMULATION-SERVER-ACTION-EXECUTION-CONTRACT-001`, que fija el deny previo al efecto y la separación entre autoridad real y procedencia simulada;
2. `SIMULATION-SERVER-ACTION-REQUEST-BOUNDARY-MATRIX-001`, que decide cómo se tratan argumentos, formularios, navegación, cache, reintentos y llamadas directas;
3. `SIMULATION-SERVER-ACTION-EFFECT-MATRIX-001`, que separa mutaciones reales, lecturas protegidas, evaluación simulada, lifecycle de simulación y controles de sesión o recuperación propietarios;
4. `SIMULATION-SERVER-ACTION-LIFECYCLE-MATRIX-001`, que fija comportamiento para `RESOLVING`, `ACTIVE`, `STALE`, `INVALID`, `EXIT_PENDING` y terminales persistidos;
5. `SIMULATION-SERVER-ACTION-PHYSICAL-EVIDENCE-CONTRACT-001`, que define la evidencia mínima exigible por unidad física sin declarar implementación actual.

Resumen:

| Elemento | Cantidad |
| --- | ---: |
| Código público de ejecución simulada reutilizado | 1 |
| Razón interna de enforcement reutilizada | 1 |
| Estado HTTP aplicable reutilizado | 1, `403` |
| Clases documentales de Server Action distinguidas | 4 |
| Estados/lifecycle tratados explícitamente | 10 |
| Familias de efecto real cubiertas | 12 |
| Casos mínimos de prueba futura | 32 |
| Aplicaciones certificadas físicamente por esta tarea | 0 |
| Requisitos de prueba nuevos o modificados | 0 |

---

#### 9. Qué constituye una Server Action para esta validación

La validación consume la identidad ya fijada por `AUTH-SRV-001`.

Una superficie entra en el alcance cuando el inventario propietario la reconoce como Server Action por una directiva `"use server"` de módulo, función inline u otra identidad ya confirmada por el inventario canónico.

No se promueve a Server Action una pieza únicamente por:

- ejecutar en servidor;
- ser `async`;
- usar Supabase;
- vivir en un archivo denominado `actions.ts`;
- invocar una RPC;
- ser Route Handler;
- usar `service_role`;
- ser helper server-only.

Esas superficies conservan sus owners propios.

---

#### 10. Server Action protegida

Una Server Action protegida es una Server Action cuyo resultado puede:

- producir una mutación empresarial;
- cambiar estado o lifecycle de una entidad real;
- ejecutar una transición de proceso;
- generar un efecto externo;
- leer contenido protegido;
- ampliar información del recurso;
- generar un archivo protegido;
- iniciar una operación asíncrona;
- alterar sesión, configuración o seguridad bajo un contrato propietario.

El hecho de ser Server Action no concede ni elimina autoridad.

La naturaleza del efecto y el contrato de la capacidad determinan la protección.

---

#### 11. Cuatro clases documentales de acción

Para evitar el error de bloquear o habilitar indiscriminadamente toda función `"use server"`, esta tarea distingue cuatro clases documentales. No son un nuevo enum físico obligatorio.

| Clase documental | Propósito | Autoridad simulada como permiso | Efecto empresarial real |
| --- | --- | --- | --- |
| acción empresarial real | crear, modificar, eliminar, aprobar, publicar, cobrar, mover, recibir, completar o producir otro efecto de negocio | prohibida | prohibido cuando la procedencia es simulada |
| lectura real protegida vía Server Action | devolver datos, archivos o detalle sometidos a autorización | prohibida | la lectura debe usar autoridad real independiente o denegarse |
| control/evaluación propietaria de simulación | iniciar, revisar, evaluar o terminar el escenario mediante owner explícito | nunca se usa como permiso real | solo efectos internos de simulación/auditoría autorizados por su contrato; cero efectos empresariales |
| control real de sesión o recuperación | autenticación, logout, reautenticación o recuperación bajo owner propio | nunca se usa como permiso | se decide por su contrato real independiente, no por el rol simulado |

La clasificación evita asumir que una operación de lifecycle de simulación es una mutación empresarial autorizada por el rol simulado.

---

#### 12. Acción empresarial real con procedencia simulada

Cuando una Server Action empresarial real recibe una solicitud cuya procedencia autoritativa sigue siendo simulada:

```text
DECISION = DENY
PUBLIC_CODE = AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION
HTTP_STATUS_WHEN_APPLICABLE = 403
INTERNAL_REASON = SIMULATION_EXECUTION_FORBIDDEN
executable = false
BUSINESS_EFFECTS = 0
```

La sesión real se preserva cuando siga siendo válida.

La preview puede continuar únicamente si su lifecycle y su owner permiten seguir mostrándola.

---

#### 13. Lectura protegida vía Server Action

Una lectura protegida no se vuelve segura por ser read-only desde la perspectiva de persistencia.

Si una Server Action intenta obtener datos protegidos usando el rol, sede, área, turno, permiso o sujeto simulados como autoridad, debe denegarse.

Cuando una preview necesita datos reales que el actor ya puede leer, la lectura debe resolverse desde el plano real y bajo autoridad real independiente.

Se mantiene:

```text
SIMULATED ROLE WOULD ALLOW DATA
+
REAL ACTOR CANNOT READ DATA
=
DO NOT EXPOSE DATA
```

---

#### 14. Operaciones propias de simulación

Un control propietario de simulación puede modificar exclusivamente el estado, revisión, auditoría o evidencia del propio escenario cuando su contrato ya lo autorice.

Ejemplos conceptuales:

- iniciar una simulación;
- crear una revisión del escenario;
- calcular una evaluación hipotética;
- registrar evidencia de la evaluación;
- solicitar o confirmar la salida mediante el owner correspondiente.

Estas operaciones no obtienen permiso del rol simulado.

Utilizan la autoridad real del simulador y permanecen separadas del dominio empresarial observado.

---

#### 15. Evaluación simulada no ejecutable

Una evaluación de simulación puede producir únicamente resultados hipotéticos:

```text
WOULD_ALLOW
WOULD_DENY
INDETERMINATE
```

Y conserva:

```text
executable = false
```

La función que calcula ese resultado no puede:

- llamar después al writer real porque obtuvo `WOULD_ALLOW`;
- devolver un token ejecutable;
- devolver `ALLOW` como alias;
- devolver `can_operate=true` como autoridad;
- generar un grant temporal;
- incorporar el rol simulado al contexto real.

---

#### 16. Controles reales de sesión y recuperación

Una acción real de sesión o seguridad no queda automáticamente prohibida por existir una simulación.

Su owner debe resolverla con la sesión y autoridad reales y nunca con el rol simulado.

Esta tarea no redefine, por ejemplo, la política de logout, reautenticación, recuperación de cuenta o cierre de sesión.

Sí exige que ninguno de esos controles atribuya autoridad al sujeto simulado ni transforme la simulación en una sesión autenticada distinta.

---

#### 17. Fuente autoritativa de procedencia simulada

La Server Action no determina procedencia simulada exclusivamente desde datos controlables por cliente.

La decisión debe reconstruirse desde una fuente server-side vigente y correlacionable con la sesión real y el lifecycle de simulación.

No bastan por sí solos:

- `simulation_id` en `FormData`;
- un hidden input;
- query param;
- pathname;
- hash;
- referrer;
- cookie aislada;
- `localStorage`;
- `sessionStorage`;
- estado React;
- prop;
- rol visible;
- `can_operate`;
- un booleano de permiso;
- un `WOULD_ALLOW` recibido del cliente.

---

#### 18. Omitir simulation_id no convierte la solicitud en real

La ausencia de un identificador de simulación enviado por cliente no constituye prueba de procedencia real.

Debe mantenerse:

```text
CLIENT OMITS SIMULATION REFERENCE
!=
SERVER PROVES REAL ORIGIN
```

Si el servidor conoce por fuentes autoritativas que la intención proviene de una preview vigente, la acción conserva procedencia simulada y el efecto real permanece bloqueado.

---

#### 19. simulation_id no es una credencial

Cuando exista una referencia de simulación, esa referencia:

- localiza o correlaciona un escenario;
- no autentica;
- no concede permisos;
- no reemplaza la sesión real;
- no es bearer token;
- no amplía RLS;
- no demuestra que el lifecycle siga vigente;
- no convierte un resultado hipotético en ejecutable.

La Server Action verifica el escenario mediante su owner.

---

#### 20. FormData y argumentos

Todo argumento recibido por la Server Action se considera input no autoritativo hasta que el servidor lo valide contra fuentes propietarias.

No pueden aceptarse como autoridad por venir en `FormData`, objeto serializado, argumento posicional o closure:

- actor;
- rol;
- sede;
- área;
- turno;
- check-in;
- permiso;
- recurso;
- estado del recurso;
- simulación;
- resultado hipotético;
- decisión de autorización.

El input puede expresar intención. No prueba autoridad.

---

#### 21. Hidden inputs

Un campo oculto no recibe más confianza que un campo visible.

Un hidden input puede transportar una referencia necesaria para resolver el intento, pero no puede probar:

- identidad del actor;
- permiso efectivo;
- rol real;
- rol simulado válido;
- territorio;
- lifecycle;
- `ALLOW`;
- estado actual de una entidad.

La manipulación del DOM no crea un bypass.

---

#### 22. Argumentos ligados y closures

Un valor capturado o ligado al renderizar un Server Component no conserva autoridad indefinidamente.

Si entre render y ejecución cambian:

- actor;
- sesión;
- escenario;
- revisión;
- política;
- permiso;
- rol;
- territorio;
- recurso;
- estado;
- versión;

la Server Action debe revalidar lo material antes del efecto.

Una closure no convierte un snapshot en autorización vigente.

---

#### 23. Orden canónico del gate

La secuencia mínima de una Server Action protegida queda:

```text
1. VALIDAR FORMA SEGURA DE LA INTENCION
2. RESOLVER SESION Y PRINCIPAL REALES
3. RESOLVER ACTOR REAL
4. RESOLVER PROCEDENCIA Y LIFECYCLE DE SIMULACION
5. RESOLVER CAPACIDAD, CLASIFICACION Y RECURSO NECESARIOS
6. APLICAR PRECEDENCIA DE RAZONES
7. BLOQUEAR SI LA INTENCION SIMULADA PRETENDE EFECTO O LECTURA REAL PROTEGIDA
8. SOLO UNA SOLICITUD REAL FRESCA PUEDE CONTINUAR A AUTORIZACION EJECUTABLE
9. REVALIDAR ANTES DEL EFECTO CUANDO EL CONTRATO LO EXIJA
10. EJECUTAR O RECHAZAR
11. AUDITAR EL RESULTADO CORRELACIONADO
```

Una validación estructural de forma puede preceder la autorización si no consulta ni revela datos protegidos y no produce efectos.

---

#### 24. Boundary previo al primer efecto

El deny de simulación debe ocurrir antes del primer efecto empresarial.

No es conforme:

```text
WRITE
-> DETECT SIMULATION
-> ROLLBACK BEST EFFORT
```

La regla es:

```text
DETECT / RESOLVE
-> DENY
-> ZERO BUSINESS EFFECTS
```

Un rollback posterior no sustituye el guard previo.

---

#### 25. Transacciones

Abrir una transacción no autoriza a escribir dentro de ella antes de resolver la procedencia.

La materialización física debe colocar el gate de simulación antes de toda mutación de negocio y antes de cualquier operación cuyo efecto no pueda deshacerse de forma total y demostrable.

Una transacción abortada no compensa webhooks, jobs, locks, archivos, notificaciones o side effects que ya hayan salido del boundary transaccional.

---

#### 26. Llamadas RPC desde Server Actions

Una Server Action no puede evadir el contrato delegando la escritura en una RPC.

Si la acción recibe procedencia simulada:

- no pasa rol simulado como rol real;
- no pasa sede/área simuladas como contexto efectivo;
- no invoca un writer confiando en que la RPC corregirá la autoridad después;
- no utiliza una RPC legacy que trate `simulation_id` como habilitación.

El boundary Server Action y el boundary RPC deben conservar semántica equivalente cuando ambos sean aplicables.

---

#### 27. Clientes privilegiados y service role

Una credencial técnica privilegiada no sustituye autorización empresarial.

Si una Server Action utiliza un cliente privilegiado:

```text
TECHNICAL CAPABILITY
!=
HUMAN AUTHORITY
```

La procedencia simulada debe resolverse antes del efecto y el actor real debe conservar atribución.

El uso de `service_role` no puede transformar `WOULD_ALLOW` en permiso.

---

#### 28. RLS y Data API

Una Server Action no puede usar claims, territorio o rol simulados para ampliar una política RLS.

Si la lectura o escritura llega a la Data API:

- el actor y contexto reales conservan el techo de autoridad;
- el rol simulado permanece fuera de claims autoritativos;
- una policy permisiva no repara una decisión de aplicación inválida;
- una policy restrictiva no sustituye la validación de procedencia cuando el efecto requiere contexto adicional.

---

#### 29. Storage y uploads

Una Server Action originada en preview no puede persistir archivos empresariales reales por autoridad simulada.

No se permiten como consecuencia de esa procedencia:

- uploads reales;
- reemplazo de archivos;
- borrado de objetos;
- generación de evidencias empresariales falsas;
- movimientos entre buckets con efecto de dominio.

Una representación de upload dentro de `FULL_PREVIEW` permanece sintética o inerte conforme al owner.

---

#### 30. Exportaciones y generación de archivos

Generar un archivo puede constituir lectura protegida o externalización de información.

Una Server Action no usa el rol simulado para:

- exportar datasets;
- obtener adjuntos protegidos;
- generar documentos con datos no autorizados al actor real;
- producir reportes reales que impliquen un efecto empresarial o una exposición adicional.

La autoridad de lectura se resuelve en el plano real.

---

#### 31. Impresión

Una Server Action originada en preview no puede crear:

- print jobs;
- comandos BrowserPrint;
- spooler entries;
- instrucciones remotas a hardware;
- estados empresariales que afirmen una impresión real.

La preview puede mostrar una representación no ejecutable cuando el owner lo permita.

---

#### 32. Notificaciones

Una Server Action simulada no envía notificaciones reales por:

- email;
- SMS;
- push;
- mensajería interna con efecto real;
- alerta a terceros;
- confirmación empresarial.

La explicación hipotética no se convierte en dispatch.

---

#### 33. Webhooks e integraciones

La procedencia simulada impide que una Server Action despache efectos externos.

No se ejecutan por autoridad simulada:

- webhooks;
- llamadas de proveedor;
- órdenes a servicios externos;
- publicaciones externas;
- movimientos financieros;
- efectos logísticos;
- comandos de hardware.

El boundary debe proteger incluso cuando el sistema externo no soporte rollback.

---

#### 34. Jobs y colas

No es válido sustituir una mutación inmediata por un job para aparentar cero efectos.

Una Server Action originada en preview no puede encolar trabajo empresarial que posteriormente:

- escriba datos;
- envíe mensajes;
- ejecute integraciones;
- imprima;
- procese pagos;
- mueva inventario;
- publique entidades;
- cambie estados reales.

La procedencia debe sobrevivir hasta el consumidor asíncrono cuando el contrato requiera evidencia, pero no como autoridad ejecutable.

---

#### 35. Outbox y eventos de dominio

Un deny por simulación no crea un evento de dominio exitoso.

Puede registrarse auditoría del intento bloqueado, pero no:

- outbox ejecutable;
- evento de negocio que represente éxito;
- transición empresarial parcial;
- side effect diferido.

Auditar un deny no equivale a ejecutar la acción.

---

#### 36. Revalidate y cache de presentación

Una operación de presentación como invalidar cache no puede utilizarse para ocultar o simular una mutación que no ocurrió.

En el camino de deny:

- no se presenta éxito;
- no se refresca una entidad como si hubiera cambiado;
- no se publica un estado optimista como real;
- no se usa cache para conservar `ALLOW` o `WOULD_ALLOW` como autoridad.

La estrategia física de cache pertenece al owner de cada unidad.

---

#### 37. Redirect posterior a Server Action

Un redirect no convierte un deny en éxito ni elimina la causa de seguridad.

La acción no puede:

```text
DENY
-> REDIRECT A DESTINO APARENTEMENTE EXITOSO
```

sin preservar una respuesta segura y no engañosa.

Tampoco puede redirigir a login como respuesta genérica cuando la sesión real sigue siendo válida y la causa correcta es ejecución no permitida en simulación.

---

#### 38. Invocación directa

La protección no depende de que el control visual esté inerte.

Una Server Action debe producir el mismo resultado seguro si el intento llega mediante:

- submit normal;
- progressive enhancement;
- llamada desde un componente cliente;
- llamada desde otro componente permitido por el framework;
- formulario manipulado;
- replay de una solicitud anterior;
- ruta o render distinto al original.

La UI es defensa de experiencia; el servidor es autoridad.

---

#### 39. Módulo use server e inline use server

La semántica de simulación no cambia por el estilo de declaración.

Una acción exportada desde módulo `"use server"` y una acción inline `"use server"` deben satisfacer la misma política cuando protejan el mismo tipo de efecto.

No existe excepción por ubicación del código.

---

#### 40. Acción anidada o delegada

Una Server Action no puede llamar a otro helper o writer y considerar que la segunda función ya no tiene procedencia simulada.

La intención protegida conserva su origen y correlación hasta el boundary que decide el efecto.

Delegar no limpia procedencia.

---

#### 41. Autenticación primero

La ausencia de una sesión real válida conserva su reason owner específico.

No se utiliza `AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION` para ocultar una falta de autenticación que impide resolver al actor real.

La Server Action debe respetar la precedencia contractual vigente.

---

#### 42. Actor real obligatorio

Cuando la acción exige actor humano, el sujeto simulado no llena un actor real ausente.

Debe mantenerse:

```text
real_actor_id = unresolved
+
simulated_subject_reference = known
!=
real_actor_id = simulated_subject_reference
```

La operación falla cerrada mediante el owner de razón aplicable.

---

#### 43. Rol real y rol simulado

El rol simulado no reemplaza:

- rol base real;
- rol operativo real;
- asignaciones reales;
- grants reales;
- denegaciones reales.

Una Server Action no ejecuta con el rol que la pantalla está representando.

---

#### 44. Sede y área

Sede y área simuladas son dimensiones de escenario.

No se usan como cobertura territorial de una mutación real.

Si una acción real posterior necesita sede o área, las resuelve de nuevo desde el contexto real y el recurso real.

---

#### 45. Turno y check-in

Un turno o check-in hipotéticos no satisfacen prerrequisitos laborales de una acción real.

Se mantiene:

```text
SIMULATED SHIFT
!=
ACTIVE REAL SHIFT
```

```text
SIMULATED CHECKIN
!=
REAL CHECKIN
```

---

#### 46. Dispositivo compartido

En dispositivo compartido permanecen separados:

```text
TECHNICAL PRINCIPAL
REAL HUMAN ACTOR
DEVICE ACTOR SESSION
SIMULATED SUBJECT OR ROLE
```

Una Server Action no utiliza la simulación para reemplazar una sesión de actor ausente ni utiliza el principal técnico como actor humano.

---

#### 47. Recurso y estado

Un recurso referenciado desde una preview no conserva automáticamente su estado hasta el submit.

Cuando una acción real fuera de simulación se intente posteriormente, debe revalidarse:

- identidad del recurso;
- existencia;
- versionado;
- estado actual;
- transición;
- territorio;
- autorización.

El resultado hipotético anterior no reserva el estado.

---

#### 48. FULL_PREVIEW

`FULL_PREVIEW` permite una representación funcional no ejecutable.

No cambia la regla Server Action:

```text
FULL_PREVIEW
+
BUSINESS SERVER ACTION
=
NO REAL EXECUTION FROM PREVIEW
```

Un control puede mostrar hipotéticamente que la acción existiría, pero el submit real permanece bloqueado.

---

#### 49. DECISION_ONLY

`DECISION_ONLY` permite únicamente la decisión hipotética y explicación autorizada.

No habilita:

- formulario operativo;
- payload empresarial listo para submit;
- contenido protegido por autoridad simulada;
- Server Action de negocio.

Si una llamada directa alcanza la Server Action, el servidor no confía en la ausencia o presencia del formulario para decidir.

---

#### 50. NOT_ALLOWED

`NOT_ALLOWED` no obtiene una preview funcional ni una Server Action simulada alternativa.

Se mantiene:

```text
NOT_ALLOWED
-> NO SIMULATION PREVIEW FOR THAT CAPABILITY
```

Una llamada directa a la acción real sigue resolviendo autoridad real y no recibe permiso de la simulación.

---

#### 51. Clasificación ausente o desconocida

Una capacidad sin `simulation_requirement` concluyente falla cerrada para preview.

No se adopta `FULL_PREVIEW` como default.

La falta de clasificación tampoco convierte una Server Action en una acción real autorizada.

---

#### 52. WOULD_ALLOW

`WOULD_ALLOW` puede explicar que el escenario hipotético permitiría una capacidad.

Nunca se consume como:

- `authorized=true`;
- `can_operate=true`;
- grant;
- claim;
- token;
- rol efectivo;
- señal para omitir `requireAuthorization`;
- autorización para llamar un writer.

---

#### 53. WOULD_DENY

`WOULD_DENY` describe el escenario simulado.

No significa que la cuenta real haya perdido permisos.

Si el usuario intenta ejecutar desde la preview, la Server Action aplica la precedencia de razones vigente y no reutiliza `WOULD_DENY` como una decisión real cacheada.

---

#### 54. INDETERMINATE

`INDETERMINATE` no se resuelve por optimismo.

No puede transformarse en `ALLOW` para una Server Action.

La causa estructurada del escenario se conserva bajo su owner y el efecto real permanece en cero.

---

#### 55. Código público de ejecución simulada

Cuando existe una solicitud autenticada con procedencia simulada que efectivamente intenta una acción, lectura protegida o efecto real, el código público permanece:

```text
AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION
```

No se reemplaza por:

- `AUTH_ERROR`;
- `FORBIDDEN` genérico sin identidad;
- `NO_PERMISSION`;
- `INVALID_ROLE`;
- `OUT_OF_SHIFT`;
- mensaje libre de Supabase;
- texto de excepción del framework.

---

#### 56. Razón interna

La razón interna aplicable al intento de ejecución permanece:

```text
SIMULATION_EXECUTION_FORBIDDEN
```

No se expone al usuario como detalle de arquitectura cuando el contrato de mensaje seguro no lo permita.

---

#### 57. Estado HTTP

En transportes HTTP aplicables el bloqueo conserva:

```text
403
```

La Server Action no degrada el error a una respuesta de éxito con un booleano ambiguo.

La forma concreta de serialización pertenece al adapter físico, pero debe conservar la semántica canónica.

---

#### 58. Precedencia de razones

No todo error ocurrido durante una simulación utiliza el código de ejecución simulada.

Debe distinguirse:

- sesión real ausente o inválida;
- actor no resoluble;
- solicitante no elegible;
- escenario inválido antes de intento ejecutable;
- clasificación no permitida;
- fuente indisponible;
- intento real de ejecución con procedencia simulada.

Un escenario inválido sin intento real no se degrada automáticamente a `AUTH-ERR-016`.

Una fuente autoritativa indisponible conserva el owner de error técnico vigente, incluido `AUTH-ERR-019` cuando corresponda.

---

#### 59. Error técnico

Timeout, excepción, indisponibilidad de Auth, fallo de base de datos o incapacidad de leer una fuente autoritativa no se presentan falsamente como política de simulación.

La Server Action falla cerrada, conserva cero efectos y usa el reason owner correspondiente.

No existe fallback permisivo por error técnico.

---

#### 60. Validación de input y privacidad

La validación de forma no puede utilizarse para enumerar recursos protegidos antes de resolver la autoridad necesaria.

Un payload inválido puede rechazarse de manera segura sin revelar:

- existencia de filas protegidas;
- permisos internos;
- roles elegibles;
- territorio de terceros;
- reason codes privados;
- identificadores sensibles.

---

#### 61. Sesión real preservada

El deny por ejecución simulada no implica logout.

Si la sesión real continúa válida:

```text
DENY BUSINESS EFFECT
+
PRESERVE REAL SESSION
```

La persona sigue siendo el actor real de la simulación.

---

#### 62. No autoejecución al salir

Salir de simulación no ejecuta la Server Action que había sido intentada dentro de la preview.

Debe mantenerse:

```text
EXIT SIMULATION
!=
RETRY REAL ACTION
```

Una acción real posterior requiere una intención nueva.

---

#### 63. Solicitud real posterior

Después de un terminal confirmado, una operación real exige:

1. contexto real fresco;
2. request nueva;
3. ausencia de procedencia simulada en la intención nueva;
4. autorización real resuelta desde cero;
5. recurso y estado revalidados;
6. idempotencia real independiente.

No se recicla el submit de preview.

---

#### 64. Idempotency keys

Una clave idempotente perteneciente a simulación no se reutiliza para una mutación real.

Se mantienen namespaces o propósitos separados.

Un retry del request simulado sigue siendo simulado incluso si el lifecycle terminó después del primer intento.

---

#### 65. Doble submit

Dos activaciones de un control de preview no producen un único efecto ni efectos duplicados.

Cada intento converge a deny o a una respuesta equivalente segura conforme al owner, con cero efectos empresariales.

La deduplicación no convierte uno de los intentos en real.

---

#### 66. Reintentos de red

Un cliente, framework, proxy o usuario no puede convertir el retry en una solicitud real por omitir campos del escenario.

La procedencia se reconstruye autoritativamente.

No existe retry automático como operación empresarial real.

---

#### 67. Replay de una Server Action antigua

Una request generada mientras la preview estaba vigente conserva su naturaleza histórica.

Después de `COMPLETED`, `EXPIRED`, `REVOKED` o `INVALID` terminal:

```text
OLD SIMULATED REQUEST
-> NO REAL EXECUTION
```

El terminal no reescribe el origen de la solicitud.

---

#### 68. Varias tabs

Varias tabs no crean autoridad independiente.

Si una tab mantiene un formulario de preview y otra termina o cambia el escenario, el submit tardío debe revalidar lifecycle, revisión y procedencia.

Una tab stale no puede ejecutar con un `WOULD_ALLOW` anterior.

---

#### 69. Carrera con terminal

Si el lifecycle llega a un terminal mientras una Server Action de preview está en vuelo, el resultado seguro no es ejecutar la acción como real.

La request sigue originada en simulación.

El terminal bloquea replay y exige una solicitud real nueva para cualquier operación posterior.

---

#### 70. Carrera con cambio de escenario

Si cambia rol, sede, área, turno, check-in, permiso, recurso u otra dimensión material del escenario, una Server Action ligada a una revisión anterior no utiliza la nueva revisión para autorizarse.

Se descarta o deniega conforme al owner.

No se reasigna silenciosamente el request.

---

#### 71. Carrera con cambio de política

Si cambia una fuente material de autorización o clasificación, una evaluación anterior queda stale.

La Server Action no conserva:

- `WOULD_ALLOW`;
- clasificación antigua;
- permisos simulados anteriores;
- datos de cache;

como base ejecutable.

---

#### 72. Respuesta tardía

Una respuesta tardía de evaluación o navegación no puede reactivar un submit ya bloqueado.

La Server Action y la UI deben converger con el estado autoritativo actual sin transformar una respuesta vieja en autorización.

---

#### 73. Offline

Una acción de preview no se encola offline para ejecutarse después como mutación real.

Al reconectar:

- se resuelve de nuevo sesión;
- actor;
- lifecycle;
- contexto;
- autorización;
- recurso;
- intención.

El payload simulado no se sincroniza como comando real.

---

#### 74. Cache

Cache de página, RSC, resultado, contexto o autorización no crea autoridad para una Server Action.

No puede:

- ocultar que una solicitud es simulada;
- conservar un `ALLOW` real incompatible con el estado actual;
- promover `WOULD_ALLOW`;
- mantener un escenario terminal como `ACTIVE`;
- saltar revalidación previa al efecto.

---

#### 75. Navegación previa a la acción

La Server Action debe producir el mismo resultado seguro si fue alcanzada después de:

- navegación interna;
- cambio de layout;
- launcher;
- handoff cross-app;
- redirect cliente;
- redirect servidor;
- deep link;
- URL directa;
- refresh;
- hard reload;
- back/forward;
- nueva tab;
- nueva ventana.

La ruta no determina autoridad.

---

#### 76. Cambio de actor

Si cambia el actor real en una estación compartida, cualquier Server Action perteneciente a la preview anterior pierde validez.

No se transfiere:

- formulario;
- payload;
- rol simulado;
- evaluación;
- idempotency key;
- permiso;
- contexto.

La nueva persona exige resolución nueva.

---

#### 77. Lifecycle RESOLVING

Durante `RESOLVING` no existe base para ejecutar una acción real desde la preview.

Una Server Action empresarial originada en esa superficie no utiliza el último escenario confirmado como fallback.

El efecto permanece bloqueado.

---

#### 78. Lifecycle ACTIVE

`ACTIVE` habilita evaluación y presentación conforme a `simulation_requirement`.

No habilita ejecución empresarial.

Una Server Action de negocio originada en la preview continúa no ejecutable.

---

#### 79. Lifecycle STALE

`STALE` invalida el uso de la evaluación anterior para cualquier Server Action.

No se conserva `WOULD_ALLOW` mientras se revalida.

El efecto real permanece bloqueado.

---

#### 80. INVALID visible

El estado visible `INVALID` durante limpieza o incompatibilidad no convierte la superficie en contexto real.

Una Server Action originada en esa preview no obtiene un fallback real por ausencia del escenario visible.

---

#### 81. EXIT_PENDING

Durante `EXIT_PENDING` la procedencia continúa siendo simulada hasta confirmación autoritativa.

Los submits de preview siguen no ejecutables.

No se anticipa el contexto real.

---

#### 82. Terminales persistidos

`COMPLETED`, `EXPIRED`, `REVOKED` e `INVALID` terminal impiden reutilizar requests simuladas históricas.

El terminal permite iniciar después un contexto real fresco, no convertir requests existentes en reales.

---

#### 83. Auditoría del deny

La evidencia de un intento bloqueado debe poder correlacionar, cuando aplique:

- principal real;
- actor real;
- sesión real;
- Server Action identificada;
- permiso/capacidad;
- recurso o referencia segura;
- simulación;
- revisión;
- procedencia;
- lifecycle;
- razón de bloqueo;
- resultado no ejecutado;
- timestamp;
- correlation id o equivalente.

La auditoría no concede autoridad.

---

#### 84. Auditoría de evaluación simulada

La evidencia hipotética conserva por separado:

- decisión real del actor cuando sea necesaria para usar la herramienta o leer datos;
- escenario simulado;
- resultado `WOULD_*` o `INDETERMINATE`;
- versiones;
- fingerprints;
- razones.

No se registra `WOULD_ALLOW` como autorización o ejecución real.

---

#### 85. Minimización de evidencia

No se almacenan como evidencia ordinaria:

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
- archivos personales innecesarios.

Se conservan referencias y fingerprints mínimos.

---

#### 86. Inventario canónico de Server Actions consumido

`AUTH-SRV-001` conserva un snapshot documental de doce repositorios reconciliados, seis con directiva Server Action detectada y 103 contenedores fuente relevantes en el corte histórico de ese inventario.

Ese snapshot es identidad y evidencia histórica de inventario, no certificación actual de `AUTH-SIM-013`.

Cada futura unidad debe reconciliar drift contra el código realmente asignado a la unidad antes de declarar cobertura.

No se congela el conteo 103 como universo físico permanente.

---

#### 87. Estado físico actual en vento-shell

En el `main` inspeccionado durante esta tarea se observa una Server Action inline en `src/app/page.tsx` denominada `signOutAction` que ejecuta cierre de sesión mediante Supabase y luego redirige al login.

Esta observación demuestra una superficie `"use server"` actual en `vento-shell`.

No demuestra cumplimiento ni incumplimiento de la política de simulación porque el logout es un control real de sesión cuyo comportamiento completo pertenece a su owner.

Sí demuestra que las acciones de sesión no deben clasificarse automáticamente como acción empresarial autorizada o denegada por el rol simulado.

---

#### 88. Brecha física actual: EffectiveContext legacy

`packages/os-context/src/types.ts` conserva un `EffectiveContext` que mezcla en la misma forma:

```text
source = simulation
simulation_id
is_simulation
can_operate
```

junto con roles y contexto efectivos reales.

Ese shape no se adopta como input autoritativo de Server Actions.

Una materialización futura deberá separar procedencia, evaluación y autoridad antes de certificar un writer.

---

#### 89. Brecha física actual: helper booleano

`packages/os-context/src/client.ts` conserva `hasEffectivePermission` con retorno booleano.

Un booleano aislado no demuestra:

- actor real;
- sesión real;
- procedencia;
- lifecycle;
- clasificación;
- recurso;
- razón;
- versión;
- `executable=false`;
- cero efectos.

No puede presentarse como evidencia suficiente de protección de una Server Action.

---

#### 90. Brecha física actual: RPC de simulación legacy

El cliente compartido conserva helpers sobre:

```text
start_context_simulation_v1
stop_context_simulation_v1
```

Su existencia no demuestra el contrato actual de cuatro planos ni la certificación de Server Actions.

Una futura unidad debe reconciliar estos consumidores con los contracts propietarios sin utilizarlos como bypass de procedencia.

---

#### 91. Brecha física actual: requireAuthorization no certificado aquí

El contrato documental exige un patrón compartido de `requireAuthorization`, pero esta tarea no observa una certificación física transversal de que todas las Server Actions asignadas a una unidad consuman un helper materializado y compatible con el contrato de simulación.

Por tanto:

```text
DOCUMENTED HELPER CONTRACT
!=
PHYSICAL SERVER ACTION CERTIFICATION
```

La instancia futura debe aportar evidencia directa por superficie o por un boundary común que cubra de forma demostrable todas las superficies de la unidad.

---

#### 92. Brecha física actual: inventario histórico frente a código vigente

El snapshot de `AUTH-SRV-001` pertenece a commits históricos explícitos de los repositorios inventariados.

Una certificación futura no puede copiar esos conteos y asumir que el código no cambió.

Debe reconciliar como mínimo:

```text
added
removed
renamed
moved
changed
unchanged
```

para las Server Actions de la unidad.

---

#### 93. No reapertura de AUTH-SRV-001

Esta tarea no modifica el inventario histórico aprobado de Server Actions.

Consume su identidad y exige reconciliación de drift durante la materialización física.

Un cambio de código futuro se registra en la evidencia de la unidad o en el owner canónico correspondiente sin reescribir silenciosamente el snapshot histórico.

---

#### 94. No reapertura de AUTH-SRV-015

Esta tarea no redefine:

- actor real;
- sujeto simulado;
- rol simulado;
- identidad de simulación;
- audit envelope;
- cuatro planos;
- evaluación hipotética.

`AUTH-SRV-015` continúa siendo el contrato base de separación y evidencia server.

`AUTH-SIM-013` especializa su aplicación a la frontera ejecutable de Server Actions.

---

#### 95. Frontera con Route Handlers

Route Handlers conservan el mismo principio transversal de no aceptar autoridad simulada, pero su certificación física no se contabiliza como Server Action.

Una acción no puede trasladar el writer a un Route Handler para eludir esta tarea.

La paridad completa multicanal permanece en los owners transversales y pruebas integrales aplicables.

---

#### 96. Frontera con RPC y RLS

La Server Action puede depender de RPC o RLS, pero esta tarea no convierte esas superficies en la misma identidad.

La certificación Server Action demuestra que el entrypoint no presta autoridad simulada ni produce efecto por sí mismo.

RPC y RLS conservan además sus controles y pruebas propias.

---

#### 97. Frontera con AUTH-SIM-014

`AUTH-SIM-014` conserva la prueba integral en las aplicaciones canónicas.

Esta tarea no declara:

- que todas las aplicaciones tengan Server Actions;
- que las aplicaciones sin Server Actions estén certificadas;
- que Route Handlers, RPC, RLS, Edge Functions, Realtime, offline o procesos asíncronos estén certificados solo porque las Server Actions pasen;
- que las diez aplicaciones estén listas productivamente.

Entrega a `AUTH-SIM-014` una regla específica que deberá integrarse con los demás canales.

---

#### 98. Matriz de request boundary

`SIMULATION-SERVER-ACTION-REQUEST-BOUNDARY-MATRIX-001`:

| Entrada o camino | ¿Puede probar autoridad real? | Regla |
| --- | --- | --- |
| `FormData` | no | expresar intención; revalidar server-side |
| hidden input | no | referencia solamente |
| argumento serializado | no | revalidar campos materiales |
| argumento ligado/closure | no | snapshot no equivale a autoridad vigente |
| query param | no | no determina simulación ni permiso |
| pathname | no | navegación no es autoridad |
| cookie aislada | no | requiere contrato server-side completo |
| `simulation_id` cliente | no | correlación, nunca credencial |
| ausencia de `simulation_id` | no | no prueba origen real |
| `WOULD_ALLOW` cliente | no | nunca convertir en `ALLOW` |
| cache de autorización | no por sí sola | validar fingerprint y frescura |
| real session vigente | necesaria cuando aplique | no basta sin permiso/contexto/recurso |
| proyección autoritativa de procedencia | sí para clasificar origen | no concede permiso empresarial |
| decisión real fresca `ALLOW` | sí dentro de su alcance | solo para solicitud real, no para request simulada |

---

#### 99. Matriz de efectos

`SIMULATION-SERVER-ACTION-EFFECT-MATRIX-001`:

| Efecto intentado desde procedencia simulada | Resultado |
| --- | --- |
| insert/update/delete empresarial | DENY antes del write |
| transición de estado real | DENY |
| creación de entidad real | DENY |
| lectura protegida usando autoridad simulada | DENY |
| upload real | DENY |
| exportación protegida | DENY |
| impresión real | DENY |
| notificación real | DENY |
| webhook/integración | DENY |
| job/cola empresarial | no encolar |
| outbox de éxito | no crear |
| evaluación hipotética | permitida solo mediante owner de simulación y `executable=false` |
| auditoría del deny | permitida como evidencia, sin evento empresarial de éxito |
| lifecycle de simulación | únicamente mediante owner real de simulación, sin autoridad del rol simulado |
| control real de sesión | resolver por owner de sesión y autoridad real, nunca por rol simulado |

---

#### 100. Matriz de lifecycle

`SIMULATION-SERVER-ACTION-LIFECYCLE-MATRIX-001`:

| Estado observado | Server Action empresarial originada en preview | Regla |
| --- | --- | --- |
| `RESOLVING` | no ejecutar | no usar escenario anterior |
| `ACTIVE` | DENY | preview vigente sigue no ejecutable |
| `STALE` | no ejecutar | revalidar; no usar `WOULD_ALLOW` stale |
| `INVALID` visible | no ejecutar | no fallback a contexto real |
| `EXIT_PENDING` | DENY | procedencia sigue simulada |
| `COMPLETED` + request antigua | DENY replay | terminal no transforma origen |
| `EXPIRED` + request antigua | DENY replay | no prolongar por cache |
| `REVOKED` + request antigua | DENY replay | revocación prevalece |
| `INVALID` terminal + request antigua | DENY replay | no restaurar sesión real desde request |
| contexto real fresco + request nueva | evaluar autorización real | ya no usa evidencia simulada como permiso |

---

#### 101. Matriz de precedencia mínima

| Condición concluyente | Resultado propietario |
| --- | --- |
| sesión real no válida | reason owner de sesión; no disfrazar como simulación |
| actor real no resoluble | reason owner de identidad/contexto |
| simulador no elegible | reason owner de elegibilidad |
| escenario inválido sin intento real | reason owner del escenario/lifecycle |
| capacidad `NOT_ALLOWED` | no preview; no fabricar writer simulado |
| clasificación desconocida | fail-closed |
| fuente autoritativa indisponible | error técnico propietario, incluyendo `AUTH-ERR-019` cuando aplique |
| request autenticada simulada intenta acción/lectura protegida/efecto real | `AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION` |
| request real fresca posterior | autorización real normal desde cero |

---

#### 102. Casos mínimos de prueba futura

| Caso | Resultado esperado |
| --- | --- |
| `FULL_PREVIEW` + submit Guardar | deny, cero writes |
| `FULL_PREVIEW` + `WOULD_ALLOW` | no writer real |
| `DECISION_ONLY` + llamada directa | no operación real ni contenido protegido |
| `NOT_ALLOWED` + llamada directa | ninguna autoridad por simulación |
| clasificación desconocida | fail-closed |
| `simulation_id` omitido | no convertir request de preview en real |
| `simulation_id` manipulado | no conceder autoridad |
| rol real enviado en hidden input | no confiar en cliente |
| rol simulado enviado como rol efectivo | bloquear mezcla |
| sede/área simuladas en payload | no usar como territorio real |
| turno/check-in simulados | no satisfacer prerrequisitos reales |
| request desde deep link | mismo deny si origen sigue simulado |
| request tras redirect | mismo deny si origen sigue simulado |
| request tras refresh | revalidar procedencia |
| request tras hard reload | revalidar procedencia |
| request desde segunda tab | revalidar lifecycle y revisión |
| doble submit | cero efectos |
| retry de red | cero efectos |
| replay después de terminal | deny replay |
| terminal concurrente | request simulada no se vuelve real |
| cambio concurrente de escenario | request anterior no se reasigna |
| cambio concurrente de política | evaluación stale no autoriza |
| llamada a RPC writer | no bypass |
| cliente privilegiado/service role | no sustituye actor/permiso real |
| upload desde preview | no persistir archivo real |
| export protegido | no generar archivo por autoridad simulada |
| notificación | cero dispatch |
| webhook | cero dispatch |
| job/cola | no encolar efecto empresarial |
| evaluación hipotética propietaria | `executable=false`, cero efectos empresariales |
| salida de simulación propietaria | solo lifecycle; no autoejecutar acción previa |
| contexto real fresco + request nueva | evaluar real desde cero |

---

#### 103. Evidencia mínima de una futura unidad

Cada materialización de `AUTH-SIM-013` para un `implementation_unit_id` deberá demostrar, como mínimo:

1. package y unidad propietaria identificados;
2. gate E5 aplicable en `PASS`;
3. snapshot de código y repositorio identificados;
4. inventario exacto de Server Actions de la unidad reconciliado contra `AUTH-SRV-001`;
5. Server Actions añadidas, retiradas, movidas o cambiadas registradas;
6. clasificación de cada Server Action por efecto real, lectura protegida, simulación o sesión/recuperación propietaria;
7. sesión real resuelta server-side;
8. principal real resuelto;
9. actor real resuelto cuando aplique;
10. procedencia simulada resuelta server-side;
11. lifecycle resuelto;
12. revisión de escenario correlacionada;
13. rol simulado separado del rol real;
14. sede simulada separada de sede real;
15. área simulada separada de área real;
16. turno/check-in simulados separados de prerrequisitos reales;
17. `simulation_id` cliente tratado como no autoritativo;
18. ausencia de `simulation_id` sin bypass;
19. `WOULD_ALLOW` no consumido como `ALLOW`;
20. `WOULD_DENY` no consumido como decisión real;
21. `INDETERMINATE` fail-closed;
22. `FULL_PREVIEW` sin writer real;
23. `DECISION_ONLY` sin writer ni lectura protegida por autoridad simulada;
24. `NOT_ALLOWED` sin preview funcional;
25. clasificación desconocida fail-closed;
26. deny previo al primer efecto empresarial;
27. código público correcto cuando aplique;
28. `403` en transporte aplicable;
29. razón interna correcta;
30. `executable=false` preservado;
31. sesión real preservada cuando corresponda;
32. cero inserts/updates/deletes empresariales;
33. cero transiciones de dominio;
34. cero uploads reales;
35. cero exportaciones protegidas;
36. cero print jobs;
37. cero notificaciones reales;
38. cero webhooks/integraciones;
39. cero jobs/colas empresariales;
40. cero outbox de éxito;
41. RPC llamada por la acción sin bypass;
42. cliente privilegiado sin sustitución de autoridad;
43. reintentos y doble submit con cero efectos;
44. replay posterior a terminal bloqueado;
45. carreras de lifecycle, escenario y política fail-closed;
46. varias tabs convergentes;
47. cambio de actor sin transferencia;
48. auditoría correlacionada del deny;
49. logs sin secretos;
50. rollback sin reintroducir autoridad simulada;
51. pruebas positivas de operación real fuera de simulación;
52. pruebas negativas de ejecución desde simulación;
53. evidencia local y CI de los guards;
54. evidencia de staging u operativa cuando el package lo exija;
55. cobertura suficiente para declarar cada Server Action de la unidad `PASS`, `FAIL` o no aplicable de manera explícita.

---

#### 104. Criterio de cobertura por unidad

Una unidad no queda certificada porque una sola Server Action haya pasado.

Debe cumplirse:

```text
SERVER_ACTIONS_EXPECTED_IN_UNIT
=
SERVER_ACTIONS_CLASSIFIED
=
SERVER_ACTIONS_WITH_EVIDENCE
```

con:

```text
MISSING = 0
DUPLICATES = 0
UNCLASSIFIED = 0
```

Toda exclusión debe tener owner y justificación verificable.

---

#### 105. Resultado por Server Action

Cada Server Action inventariada en la unidad debe terminar con uno de estos resultados documentales de certificación física:

```text
PASS
FAIL
NOT_APPLICABLE
```

`NOT_APPLICABLE` exige que la función no pueda participar en la superficie de simulación evaluada o que su efecto pertenezca inequívocamente a otro control real independiente, con evidencia del owner.

No se utiliza `UNKNOWN` como aprobación.

---

#### 106. Rollback de una futura unidad

El rollback técnico no puede:

- retirar el guard de procedencia simulada;
- volver a aceptar `can_operate` como autoridad;
- volver a aceptar un booleano simulado como permiso;
- usar rol, sede, área, turno o check-in simulados en el contexto real;
- reactivar un writer desde `FULL_PREVIEW`;
- convertir `DECISION_ONLY` en formulario ejecutable;
- permitir `NOT_ALLOWED` por fallback;
- confiar en `simulation_id` cliente;
- permitir bypass al omitir `simulation_id`;
- reactivar replay de requests antiguas;
- reutilizar idempotency keys simuladas para mutaciones reales;
- mover el efecto a RPC, job, cola o webhook para evitar el guard;
- degradar `AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION` a éxito o error genérico;
- borrar evidencia de intentos bloqueados necesaria para auditoría;
- reejecutar automáticamente la operación al salir de simulación.

---

#### 107. Invariantes

1. Una Server Action nunca obtiene autoridad del rol simulado.
2. `WOULD_ALLOW` nunca equivale a `ALLOW`.
3. Todo resultado simulado permanece `executable=false`.
4. `simulation_id` no autentica.
5. Omitir `simulation_id` no prueba origen real.
6. `FormData` no es fuente de autoridad.
7. Hidden inputs no son fuente de autoridad.
8. Closures no conservan autorización indefinida.
9. Pathname no es fuente de autoridad.
10. Query params no son fuente de autoridad.
11. Cache no es fuente de autoridad.
12. Estado React no es fuente de autoridad.
13. Rol visible no es fuente de autoridad.
14. `can_operate` no se adopta como autoridad final.
15. Un booleano de permiso no certifica procedencia ni lifecycle.
16. El actor real permanece separado del sujeto simulado.
17. La sesión real permanece separada de la sesión de simulación.
18. El rol real permanece separado del rol simulado.
19. La sede real permanece separada de la sede simulada.
20. El área real permanece separada del área simulada.
21. El turno real permanece separado del turno simulado.
22. El check-in real permanece separado del check-in simulado.
23. Un principal técnico no sustituye al actor humano.
24. Un cliente privilegiado no sustituye autorización empresarial.
25. La detección ocurre antes del primer efecto empresarial.
26. Un rollback best-effort no sustituye el guard previo.
27. Una transacción no autoriza efectos antes del guard.
28. Una RPC no crea bypass.
29. RLS no consume rol o territorio simulado como autoridad.
30. `FULL_PREVIEW` no habilita writer real.
31. `DECISION_ONLY` no habilita writer ni contenido protegido por autoridad simulada.
32. `NOT_ALLOWED` no se degrada a read-only.
33. Clasificación desconocida falla cerrado.
34. Una lectura protegida por Server Action usa autoridad real independiente.
35. Un upload real no se produce desde preview.
36. Una exportación protegida no se produce por autoridad simulada.
37. Una impresión real no se dispara desde preview.
38. Una notificación real no se envía desde preview.
39. Un webhook real no se despacha desde preview.
40. Una integración real no se ejecuta desde preview.
41. Un job empresarial no se encola desde preview.
42. Una cola no difiere el bypass.
43. Un outbox de éxito no se crea para un deny.
44. Auditar el deny no equivale a ejecutar la acción.
45. El código público de ejecución simulada permanece estable.
46. El HTTP `403` se conserva cuando aplique.
47. La razón interna de enforcement permanece distinguible.
48. Error técnico no se presenta como política de simulación.
49. Escenario inválido sin intento ejecutable no se degrada automáticamente a `AUTH-ERR-016`.
50. La sesión real se preserva cuando sigue siendo válida.
51. El deny no equivale a logout.
52. Salir de simulación no autoejecuta una acción previa.
53. Una acción real posterior exige request nueva.
54. Una acción real posterior exige contexto real fresco.
55. Idempotency keys simuladas no se reutilizan como reales.
56. Doble submit no produce efecto.
57. Retry no convierte request en real.
58. Replay posterior a terminal permanece bloqueado.
59. Una carrera con terminal no transforma la request.
60. Un cambio de escenario invalida requests incompatibles.
61. Un cambio de política invalida evaluaciones stale.
62. Respuestas tardías no reactivan writers.
63. Varias tabs no crean autoridad independiente.
64. Cambio de actor no transfiere preview ni submit.
65. `RESOLVING` no habilita por optimismo.
66. `ACTIVE` mantiene no ejecutabilidad.
67. `STALE` no reutiliza evaluación anterior.
68. `INVALID` visible no degrada a contexto real.
69. `EXIT_PENDING` sigue siendo simulación.
70. Terminales no convierten requests antiguas en reales.
71. La evaluación de simulación puede persistir únicamente evidencia propia autorizada.
72. Lifecycle de simulación no es efecto empresarial autorizado por rol simulado.
73. Controles reales de sesión conservan owner propio.
74. La ubicación inline o de módulo no cambia la política.
75. Delegar a helper no limpia procedencia.
76. Navegación previa no cambia autoridad.
77. Deep link no cambia autoridad.
78. Redirect no cambia autoridad.
79. Refresh no cambia autoridad.
80. Hard reload no cambia autoridad.
81. Back/forward no cambia autoridad.
82. La certificación Server Action no certifica Route Handlers.
83. La certificación Server Action no certifica RPC/RLS por sí sola.
84. La certificación Server Action no certifica Edge Functions.
85. La certificación Server Action no certifica procesos asíncronos por sí sola.
86. El inventario histórico debe reconciliar drift por unidad.
87. `EffectiveContext` legacy no se adopta como contrato final.
88. `hasEffectivePermission` booleano no es evidencia suficiente.
89. Helpers legacy de simulación no certifican el boundary.
90. `AUTH-SRV-001` no se reabre.
91. `AUTH-SRV-015` no se redefine.
92. `AUTH-SIM-012` conserva navegación simulada.
93. `AUTH-SIM-014` conserva prueba integral de aplicaciones.
94. No se crean ni modifican requisitos de prueba.
95. No se modifica 04A.
96. No se ejecutan cambios físicos en esta tarea.

---

#### 108. Resultado documental

La tarea deja cerrado documentalmente:

1. significado de validación Server Action bajo simulación;
2. diferencia entre acción empresarial, lectura protegida, control de simulación y control real de sesión;
3. procedencia simulada autoritativa;
4. prohibición de autoridad desde cliente;
5. tratamiento de `simulation_id` presente y ausente;
6. tratamiento de `FormData`, hidden inputs y argumentos ligados;
7. orden del gate server-side;
8. boundary previo al primer efecto;
9. transacciones;
10. RPC;
11. clientes privilegiados;
12. RLS/Data API;
13. Storage/uploads;
14. exportaciones;
15. impresión;
16. notificaciones;
17. webhooks/integraciones;
18. jobs/colas;
19. outbox;
20. cache y redirects;
21. invocación directa;
22. Server Actions inline y de módulo;
23. autenticación y actor real;
24. separación de roles y territorio;
25. recursos y estado;
26. `FULL_PREVIEW`;
27. `DECISION_ONLY`;
28. `NOT_ALLOWED`;
29. clasificación desconocida;
30. `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE`;
31. código público, razón interna y `403`;
32. precedencia de errores;
33. sesión real preservada;
34. salida y solicitud real posterior;
35. idempotencia, doble submit y retries;
36. replay y concurrencia;
37. tabs, cambio de actor y lifecycle;
38. auditoría y minimización;
39. inventario Server Action como baseline histórico;
40. brechas físicas actuales observadas;
41. evidencia mínima por futura unidad;
42. criterio de cobertura completa por unidad;
43. rollback;
44. handoff hacia la prueba integral de aplicaciones.

---

#### 109. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la cobertura vigente ya exige separar autoridad real y simulada, mantener resultados hipotéticos no ejecutables, rechazar autoridad simulada en Server Actions y demás canales, bloquear antes de efectos, preservar el código de simulación, exigir solicitud real nueva después de salir, mantener paridad multicanal y reconciliar físicamente los consumers y helpers legacy. Esta tarea especializa la certificación de Server Actions sin crear una obligación verificable nueva ni cambiar owner, prioridad, modalidad, paquete, estado o relaciones del registro.

---

#### 110. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- cuatro planos separados de autoridad, evaluación, presentación y auditoría;
- resultado simulado `executable=false`;
- mutaciones y Server Actions sin autoridad simulada;
- navegación de preview sin handlers reales;
- sesión, tokens, cookies y cache con propósitos separados;
- código público de ejecución no permitida en simulación;
- bloqueo previo a filas, transacciones y efectos;
- paridad entre Server Actions y demás canales;
- solicitud real nueva después de salir;
- clasificación 85 `FULL_PREVIEW`, 52 `DECISION_ONLY` y 3 `NOT_ALLOWED`;
- diez aplicaciones canónicas y reconciliación física;
- inventario y protección de acciones de servidor.

Trazabilidad vigente reutilizada: `TREQ-AUTH-119..128`, `TREQ-AUTH-279..288` y las obligaciones de Server Actions ya vinculadas a `AUTH-SRV-001..018`.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `AUTH-SIM-013`.

---

#### 111. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto de tarea fue preparado de forma independiente y todavía no ha sido incorporado al archivo propietario ni sometido al build documental del checkout del usuario |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron apertura de rama, preflight, formateador, task quality, delivery check, topología, TREQ ni batería global dentro del checkout local del usuario |
| REMOTA | `PASS` | se verificaron en solo lectura el cierre de `AUTH-SIM-012` en `main`, continuidad hacia `AUTH-SIM-013`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas de formato y desarrollo, contrato de entrega, handoff completo de `AUTH-SIM-012`, contratos de `AUTH-SRV-001` y `AUTH-SRV-015`, cobertura 04A vigente y estado físico actual de `src/app/page.tsx` y `packages/os-context` |
| OPERATIVA | `NOT_EXECUTED` | no se invocó una Server Action como rol simulado en un entorno desplegado durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron Server Actions, helpers, contratos, aplicaciones, RPC, RLS, Supabase, datos, sesiones, configuración, colas, integraciones ni despliegues |

---

#### 112. Criterios de aceptación

- [x] Se define la certificación específica de Server Actions ante procedencia simulada.
- [x] Se consume el handoff exacto de `AUTH-SIM-012`.
- [x] Se conserva navegación separada de autoridad.
- [x] Se conserva el enforcement de `AUTH-SIM-010`.
- [x] Se conserva read-only de `AUTH-SIM-011`.
- [x] Se conserva salida y contexto real fresco de `AUTH-SIM-009`.
- [x] Se conserva separación de cuatro planos de `AUTH-SIM-006` y `AUTH-SRV-015`.
- [x] Se conserva `PER_IMPLEMENTATION_UNIT`.
- [x] Se conserva `POST_E5_PACKAGE`.
- [x] Se define qué Server Actions entran en el alcance.
- [x] Se distinguen acciones empresariales, lecturas protegidas, controles de simulación y controles de sesión.
- [x] Una acción empresarial con procedencia simulada queda bloqueada antes del efecto.
- [x] Una lectura protegida no usa autoridad simulada.
- [x] Lifecycle/evaluación de simulación no se confunden con efecto empresarial.
- [x] Un control de sesión no usa rol simulado como autoridad.
- [x] `simulation_id` cliente no autentica.
- [x] Omitir `simulation_id` no produce bypass.
- [x] `FormData` no es autoridad.
- [x] Hidden inputs no son autoridad.
- [x] Closures no conservan autorización indefinidamente.
- [x] Se define orden del gate server-side.
- [x] Se exige deny antes del primer efecto empresarial.
- [x] Una transacción no sustituye el guard previo.
- [x] RPC no crea bypass.
- [x] `service_role` no crea autoridad humana.
- [x] RLS no consume contexto simulado como autoridad.
- [x] Uploads reales permanecen bloqueados desde preview.
- [x] Exportaciones protegidas permanecen bloqueadas.
- [x] Impresión real permanece bloqueada.
- [x] Notificaciones reales permanecen bloqueadas.
- [x] Webhooks e integraciones permanecen bloqueados.
- [x] Jobs y colas no difieren la ejecución.
- [x] Outbox de éxito no se crea para un deny.
- [x] Redirect no transforma deny en éxito.
- [x] Invocación directa no crea bypass.
- [x] Inline y módulo `use server` conservan la misma política.
- [x] Delegar a helper no limpia procedencia.
- [x] Actor real no se reemplaza por sujeto simulado.
- [x] Rol simulado no reemplaza rol real.
- [x] Sede y área simuladas no reemplazan territorio real.
- [x] Turno y check-in simulados no satisfacen prerrequisitos reales.
- [x] Dispositivo compartido no sustituye al actor humano.
- [x] Recurso y estado se revalidan para una operación real posterior.
- [x] `FULL_PREVIEW` no habilita writer.
- [x] `DECISION_ONLY` no habilita writer ni contenido protegido.
- [x] `NOT_ALLOWED` no se degrada a preview.
- [x] Clasificación desconocida falla cerrado.
- [x] `WOULD_ALLOW` no equivale a `ALLOW`.
- [x] `WOULD_DENY` no se registra como decisión real.
- [x] `INDETERMINATE` no se resuelve por optimismo.
- [x] Se conserva `AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION`.
- [x] Se conserva `SIMULATION_EXECUTION_FORBIDDEN`.
- [x] Se conserva `403` cuando aplique.
- [x] Se respeta precedencia de reasons.
- [x] Error técnico no se presenta como bloqueo de simulación.
- [x] Sesión real puede preservarse.
- [x] Deny no equivale a logout.
- [x] Salida no autoejecuta acción previa.
- [x] Operación real posterior exige request nueva.
- [x] Idempotency keys simuladas no se reutilizan.
- [x] Doble submit produce cero efectos.
- [x] Retry produce cero efectos.
- [x] Replay posterior a terminal queda bloqueado.
- [x] Carreras de terminal, escenario y política fallan cerrado.
- [x] Varias tabs revalidan.
- [x] Cambio de actor no transfiere submit.
- [x] `RESOLVING` no habilita.
- [x] `ACTIVE` permanece no ejecutable.
- [x] `STALE` no reutiliza evaluación.
- [x] `INVALID` visible no crea fallback real.
- [x] `EXIT_PENDING` mantiene procedencia simulada.
- [x] Terminales no convierten requests antiguas en reales.
- [x] Se define auditoría correlacionada y minimizada.
- [x] Se consume el snapshot histórico de `AUTH-SRV-001` sin tratarlo como inventario físico permanente.
- [x] Se registra la Server Action actual observada en `vento-shell` sin inferir cumplimiento.
- [x] Se registra `EffectiveContext` legacy como brecha de separación.
- [x] Se registra `hasEffectivePermission` booleano como evidencia insuficiente.
- [x] Se registran helpers legacy de simulación sin tratarlos como certificación.
- [x] No se reabre `AUTH-SRV-001`.
- [x] No se redefine `AUTH-SRV-015`.
- [x] Route Handlers, RPC y RLS conservan identidad propia.
- [x] `AUTH-SIM-014` conserva la prueba integral de aplicaciones.
- [x] Se define evidencia mínima por futura unidad.
- [x] Se exige cobertura sin faltantes, duplicados ni no clasificados.
- [x] Se define rollback fail-closed.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se ejecutan cambios físicos.
- [x] `AUTH-SIM-014` permanece reservada.

---

#### 113. Límites

Esta tarea no:

- modifica Server Actions;
- crea Server Actions;
- modifica `src/app/page.tsx`;
- modifica `packages/os-context`;
- materializa `requireAuthorization`;
- cambia `EffectiveContext`;
- cambia `hasEffectivePermission`;
- modifica RPC legacy de simulación;
- modifica rutas;
- modifica router;
- modifica middleware;
- modifica layouts;
- modifica componentes;
- modifica `SimulatedRoleNotice`;
- modifica Route Handlers;
- modifica RPC;
- modifica RLS;
- modifica Edge Functions;
- modifica Realtime;
- modifica Storage;
- modifica Supabase;
- crea migraciones;
- cambia grants;
- cambia sesiones;
- cambia roles;
- cambia permisos;
- cambia `simulation_requirement`;
- reclasifica los 140 permisos;
- modifica `AUTH-DB-013`;
- redefine `AUTH-SRV-015`;
- reescribe el inventario histórico de `AUTH-SRV-001`;
- ejecuta una simulación real;
- invoca una Server Action desplegada;
- certifica una aplicación completa;
- ejecuta la prueba integral de `AUTH-SIM-014`;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A.

---

#### 114. Handoff exacto hacia AUTH-SIM-014

`AUTH-SIM-013` entrega a `AUTH-SIM-014` un boundary Server Action ya especificado:

```text
SIMULATED ORIGIN
+
BUSINESS SERVER ACTION
=
DENY BEFORE EFFECT
```

```text
SERVER ACTION
MUST RESOLVE REAL AUTHORITY
INDEPENDENTLY OF SIMULATED ROLE
```

```text
PASSING SERVER ACTION TESTS
!=
FULL APPLICATION CERTIFICATION
```

`AUTH-SIM-014` deberá integrar esta evidencia con navegación, UI read-only, Route Handlers, RPC/PostgREST, RLS/Data API, Edge Functions, Realtime, offline, procesos asíncronos y demás canales aplicables a cada aplicación, sin inferir cobertura integral a partir de una sola superficie.

---

#### 115. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-SIM-012 — Validar navegación como rol simulado`

**TAREA ACTUAL APROBADA**
`AUTH-SIM-013 — Validar Server Actions como rol simulado`

**SIGUIENTE TAREA RESERVADA**
`AUTH-SIM-014 — Probar en todas las aplicaciones`


### ✅ AUTH-SIM-014 — Probar en todas las aplicaciones

**Estado:** APROBADA
**Tarea anterior:** AUTH-SIM-013 — Validar Server Actions como rol simulado
**Tarea siguiente:** NEXO-DOM-002 — Definir propósito y tipos canónicos de LPN
**Tipo de tarea:** documental; contrato canónico de certificación integral transversal de simulación por aplicación, con materialización posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE Q — Simulación
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/Q_SIMULACION/03_VALIDACION_INTEGRAL_DE_SIMULACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, aplicaciones, Supabase, migraciones, RLS, RPC, Server Actions, Route Handlers, Edge Functions, Realtime, jobs, colas, webhooks, integraciones, datos, permisos, sesiones, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Cerrar el contrato documental de validación integral de simulación definiendo qué debe demostrar cada aplicación canónica de Vento OS para considerarse conforme frente a navegación, presentación read-only, Server Actions, canales server-side, datos, lifecycle, concurrencia, replay y cero efectos reales.

La regla raíz queda:

```text
TEN CANONICAL APPLICATIONS
+
APPLICATION-SPECIFIC APPLICABILITY
+
SIMULATED PROVENANCE PRESERVED
+
READ-ONLY EXPERIENCE
+
SERVER-SIDE ENFORCEMENT
+
REAL DATA CEILING
+
ZERO REAL EFFECTS
+
TRACEABLE EVIDENCE
=
INTEGRAL SIMULATION CERTIFICATION
```

Y siempre:

```text
ONE PASSING SURFACE
!=
APPLICATION CERTIFICATION
```

```text
APPLICATION CERTIFICATION
!=
GLOBAL CERTIFICATION
```

```text
DOCUMENTED CONTRACT
!=
PHYSICAL EVIDENCE
```

#### 2. Pregunta contractual propietaria

Esta tarea responde exclusivamente:

```text
COMO SE CERTIFICA EL CONTRATO DE SIMULACION EN CADA APLICACION CANONICA?
```

```text
QUE CANALES Y EFECTOS DEBE PROBAR CADA APLICACION SEGUN SU ALCANCE REAL?
```

```text
COMO SE DEMUESTRA QUE UNA APLICACION NO ACEPTA AUTORIDAD SIMULADA?
```

```text
QUE CONJUNTO DE EVIDENCIA PERMITE CERRAR EL MINI-BLOQUE DE SIMULACION?
```

No implementa ni ejecuta la certificación física. Define el contrato que deberán satisfacer las futuras unidades propietarias.

#### 3. Handoff recibido de AUTH-SIM-013

`AUTH-SIM-013` entrega una frontera específica de Server Actions ya cerrada:

```text
SIMULATED ORIGIN
+
BUSINESS SERVER ACTION
=
DENY BEFORE EFFECT
```

```text
SERVER ACTION
MUST RESOLVE REAL AUTHORITY
INDEPENDENTLY OF SIMULATED ROLE
```

```text
PASSING SERVER ACTION TESTS
!=
FULL APPLICATION CERTIFICATION
```

Por tanto, esta tarea integra la evidencia de Server Actions con el resto de canales aplicables de cada aplicación sin inferir cobertura integral desde una sola superficie.

#### 4. Handoff recibido de AUTH-SIM-012

`AUTH-SIM-012` entrega navegación simulada bajo estas invariantes:

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

La certificación por aplicación debe demostrar que la navegación no pierde procedencia, aviso, read-only, lifecycle ni techo de autoridad real.

#### 5. Handoff recibido de AUTH-SIM-011

`AUTH-SIM-011` entrega una experiencia de preview con:

```text
SIMULATION PREVIEW
-> READ-ONLY PRESENTATION
-> ZERO REAL EFFECTS
```

La aplicación solo puede certificarse si sus controles mutadores, formularios, shortcuts, autosave, uploads, exportaciones, impresiones, notificaciones e integraciones aplicables permanecen no ejecutables durante la simulación.

#### 6. Handoff recibido de AUTH-SIM-010

`AUTH-SIM-010` conserva el enforcement material:

```text
SIMULATED ORIGIN
-> REAL EXECUTION FORBIDDEN
```

```text
SIMULATED RESULT
-> executable = false
```

La certificación integral no acepta una UI inerte como sustituto del deny server-side.

#### 7. Handoffs de lifecycle

`AUTH-SIM-007..009` conservan:

- aviso persistente;
- inicio autoritativo;
- salida autoritativa;
- expiración;
- revocación;
- invalidez;
- retorno a contexto real fresco.

La aplicación debe demostrar que sus superficies convergen con ese lifecycle y no convierten cambio de pantalla, refresh, tab, pérdida de estado cliente o cierre visual en una transición empresarial inexistente.

#### 8. Contratos consumidos

La tarea consume sin redefinir:

- `AUTH-SIM-001..013`;
- `AUTH-SRV-001..018` según la superficie aplicable;
- `AUTH-DB-013` como fundación append-only de simulación;
- contratos de autorización, contexto, catálogo, recursos, sesiones, dispositivos compartidos, auditoría, idempotencia, privacidad y accesibilidad;
- catálogo vigente de `simulation_requirement`;
- inventario vigente de superficies server-side;
- decisiones canónicas por aplicación;
- evidencia física disponible y brechas ya registradas.

#### 9. Topología y materialización posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

El marcador documental se desarrolla una sola vez.

La certificación física posterior se materializa por `implementation_unit_id` y puede ser consumida por uno o varios paquetes únicamente mediante lineage explícito.

Esta tarea no crea, autoriza ni ejecuta una instancia física.

#### 10. Definición de certificación integral por aplicación

Una aplicación queda certificada únicamente cuando existe evidencia suficiente de todas las dimensiones que le resultan aplicables y evidencia explícita de no aplicabilidad para las que realmente no posee.

La fórmula queda:

```text
APPLICATION PASS
=
ALL APPLICABLE DIMENSIONS PASS
+
ALL NON-APPLICABLE DIMENSIONS JUSTIFIED
+
ZERO UNKNOWN CRITICAL DIMENSIONS
+
ZERO REAL EFFECTS FROM SIMULATION
```

Una dimensión sin evidencia no se convierte en PASS por ausencia de fallos observados.

#### 11. Unidad de certificación

La aplicación es una dimensión de cobertura empresarial.

La identidad física de ejecución sigue siendo:

```text
AUTH-SIM-014::<implementation_unit_id>
```

Por tanto:

```text
APPLICATION
!=
IMPLEMENTATION UNIT
```

Una unidad puede cubrir una o varias superficies de una aplicación y una aplicación puede requerir varias unidades. El expediente debe demostrar completitud mediante lineage, no por igualdad de nombres.

#### 12. Universo canónico de aplicaciones

El universo queda cerrado en diez aplicaciones:

```text
SHELL
ANIMA
AURA
FOGO
NEXO
NUMERA
ORIGO
PASS
PULSO
VISO
```

Resultado documental:

```text
EXPECTED_APPLICATIONS = 10
DOCUMENTED_APPLICATION_DECISIONS = 10
OMITTED_APPLICATIONS = 0
```

No se agrega ni retira una aplicación por observación local de repositorios.

#### 13. Dimensiones obligatorias de certificación

Cada aplicación debe resolver, según aplique:

1. elegibilidad y entrada a simulación;
2. procedencia simulada;
3. aviso persistente;
4. read-only;
5. navegación;
6. Server Components y fetch server-side;
7. Server Actions;
8. Route Handlers o APIs;
9. RPC/PostgREST;
10. RLS/Data API;
11. Edge Functions;
12. Realtime;
13. offline;
14. procesos asíncronos;
15. jobs y colas;
16. webhooks e integraciones;
17. notificaciones;
18. impresión;
19. exportaciones;
20. Storage cuando produzca estado o evidencia empresarial;
21. dispositivos compartidos cuando apliquen;
22. lifecycle y terminales;
23. reautorización posterior a salida;
24. concurrencia, tabs y respuestas tardías;
25. idempotencia y replay;
26. privacidad y minimización;
27. accesibilidad;
28. auditoría y evidencia.

#### 14. Clasificación de simulación preservada

La certificación consume exactamente:

```text
TOTAL = 140
FULL_PREVIEW = 85
DECISION_ONLY = 52
NOT_ALLOWED = 3
```

No modifica esa distribución.

Las claves excluidas permanecen:

```text
aura.access
pass.access
viso.authorization.context_simulations.view
```

Un permiso sin clasificación demostrable permanece fail-closed.

#### 15. Delta físico no reconciliado

La evidencia física vigente registra un baseline de 179 permisos frente al snapshot documental de 140.

La diferencia de 39 identidades no se interpreta como cobertura implícita.

Toda identidad sin clasificación canónica aplicable debe permanecer fuera de certificación positiva hasta que su owner reconcilie catálogo, implementación y pruebas.

#### 16. Regla de aplicabilidad por canal

Un canal puede declararse no aplicable solo cuando existe evidencia versionada y reproducible de que la aplicación o unidad no posee esa superficie ni un equivalente funcional.

No es suficiente:

- no encontrar una coincidencia en una búsqueda parcial;
- no haber visto el canal durante una prueba manual;
- que el repositorio histórico no lo listara;
- que el frontend no muestre un control;
- que una unidad no lo haya ejercitado todavía.

La ausencia no demostrada permanece sin certificar.

#### 17. Regla de PASS por canal

Un canal aplicable obtiene PASS únicamente si demuestra simultáneamente:

- procedencia simulada correctamente detectada o preservada;
- autoridad real separada;
- clasificación vigente;
- resultado simulado no ejecutable;
- deny antes del efecto cuando se intenta ejecución real;
- cero efectos observables;
- causa y respuesta equivalentes al contrato;
- evidencia correlacionable y reproducible.

#### 18. Regla de PASS por aplicación

Una aplicación no puede obtener PASS mientras exista cualquiera de estas condiciones:

- canal crítico aplicable sin evidencia;
- bypass conocido;
- uso autoritativo de rol o contexto simulado;
- ampliación de datos reales;
- writer alcanzable desde preview;
- replay posterior;
- lifecycle divergente;
- integración externa ejecutable;
- evidencia física stale o no atribuible a la versión certificada.

#### 19. Regla de PASS global del mini-bloque

El cierre físico futuro del contrato de simulación requiere:

```text
10 APPLICATION DECISIONS
+
ALL APPLICABLE UNITS CERTIFIED
+
NO UNRESOLVED CRITICAL GAP
+
ZERO SIMULATED AUTHORITY ACCEPTED
+
ZERO REAL EFFECTS
=
SIMULATION BLOCK PHYSICAL PASS
```

Esta tarea documental no declara ese PASS físico.

#### 20. SHELL

SHELL debe demostrar, según sus superficies aplicables:

- que el launcher y navegación no convierten preview en acceso real;
- que la transición entre aplicaciones preserva procedencia hasta revalidación del destino;
- que ningún permiso simulado habilita una aplicación real;
- que Server Components, acciones o handlers propios usan autoridad real;
- que la sesión real permanece separada del escenario;
- que sign-out, perfil y navegación real no se reinterpretan como operaciones del rol simulado;
- que la simulación no convierte SHELL en autoridad universal para aplicaciones destino.

La aplicación destino conserva su propia decisión.

#### 21. ANIMA

ANIMA debe conservar la separación entre simulación laboral y hechos reales de asistencia.

La certificación debe demostrar, según aplique:

- rol, sede, área, turno y check-in simulados no modifican trabajador ni jornada reales;
- ninguna preview registra entrada, salida, novedad o asistencia;
- offline no encola hechos reales derivados de simulación;
- sincronización posterior no convierte una intención simulada en evento laboral;
- datos reales visibles permanecen dentro de la autoridad real del actor.

La ausencia de Server Actions web no elimina la obligación sobre RPC, APIs, sincronización nativa u otros canales reales que sí existan.

#### 22. AURA

AURA conserva la exclusión vigente del permiso `aura.access` y no debe recibir una superficie de simulación fabricada para satisfacer la matriz.

La certificación correcta para la capacidad excluida demuestra:

```text
NOT_ALLOWED
-> NO SIMULATION PREVIEW
-> NO SIMULATED AUTHORITY
```

Si en el futuro aparecen superficies AURA canónicas, deberán ingresar primero por sus owners y catálogo antes de incorporarse a una certificación física de simulación.

#### 23. FOGO

FOGO debe demostrar que una preview productiva no puede:

- crear o editar una receta real;
- iniciar, modificar o cerrar un lote;
- consumir inventario;
- publicar una preparación;
- registrar trazabilidad real;
- imprimir o despachar una orden real;
- producir una integración derivada del escenario.

Rol, área, turno o contexto simulados nunca satisfacen los prerrequisitos operativos reales.

#### 24. NEXO

NEXO debe demostrar que la simulación no produce movimientos físicos ni lógicos de inventario o logística.

Deben quedar cubiertos, según aplique:

- stock;
- entradas;
- retiros;
- transferencias;
- ubicaciones;
- activos;
- conteos;
- remisiones;
- carga;
- recepción;
- tránsito;
- configuraciones operativas;
- impresión de etiquetas;
- acciones de dispositivos compartidos.

Una sede, área, estación o rol simulado no amplía autoridad ni territorio reales.

#### 25. NUMERA

NUMERA debe mantener una frontera reforzada de datos financieros y de costos.

La simulación no puede:

- ampliar entidades o periodos visibles;
- exponer saldos o costos fuera del alcance real;
- registrar asientos, ajustes o cierres;
- persistir un cálculo hipotético como hecho contable;
- exportar información protegida por autoridad simulada;
- disparar procesos financieros reales.

Los cálculos de preview permanecen inequívocamente separados de la contabilidad real.

#### 26. ORIGO

ORIGO debe demostrar que una simulación de compra o recepción no puede:

- crear o modificar una orden real;
- aprobar una compra;
- confirmar una recepción;
- registrar un movimiento de inventario;
- alterar proveedor o maestro;
- enviar comunicación o integración real;
- generar documentos operativos ejecutables.

La cobertura simulada nunca concede acceso adicional a datos del proveedor.

#### 27. PASS

PASS conserva la exclusión vigente de `pass.access` dentro del plano simulado y la separación entre identidad cliente e identidad laboral.

La certificación debe demostrar:

- una sesión cliente real no se convierte en sesión laboral simulada;
- un rol laboral simulado no modifica puntos, nivel, saldo, perfil o identidad cliente;
- no se crea una preview cliente por inferencia desde un rol laboral;
- cualquier superficie administrativa autorizada que represente PASS permanece fuera de la sesión cliente y bajo autoridad real independiente.

#### 28. PULSO

PULSO debe demostrar cero efectos de POS desde simulación.

La preview no puede:

- abrir o alterar una sesión de caja real;
- crear una venta;
- registrar pago;
- redimir beneficios;
- modificar pedido;
- cerrar caja;
- emitir devolución o reembolso;
- imprimir comprobante operativo;
- disparar integración de pago o fiscal;
- transferir custodia.

Un `WOULD_ALLOW` nunca habilita el flujo transaccional real.

#### 29. VISO

VISO administra y presenta simulaciones desde autoridad real, pero no puede autoautorizar la propia capacidad de simulación.

Debe demostrar:

- `viso.authorization.context_simulations.view` permanece `NOT_ALLOWED` como permiso simulado;
- actor real y sujeto simulado permanecen separados;
- herramientas de comparación no escriben configuración real por autoridad simulada;
- administración de roles, sedes, áreas, horarios, catálogos o permisos conserva autorización real independiente;
- la UI de simulación no convierte filtros, role override o contexto hipotético en contexto efectivo real.

#### 30. Matriz canónica por aplicación

| Aplicación | Resultado contractual durante simulación | Condición especial |
| --- | --- | --- |
| `SHELL` | preview y navegación sin autoridad simulada | destino siempre revalida |
| `ANIMA` | preview laboral sin hechos reales de asistencia | offline no ejecuta después |
| `AURA` | exclusión de simulación preservada | no fabricar superficie |
| `FOGO` | preview productiva sin lote ni consumo real | cero efectos de producción |
| `NEXO` | preview logística sin movimientos reales | dispositivos y etiquetas incluidos cuando apliquen |
| `NUMERA` | preview financiera sin efectos contables | minimización reforzada |
| `ORIGO` | preview de compra/recepción sin orden ni recepción real | datos de proveedor bajo autoridad real |
| `PASS` | exclusión laboral preservada | identidad cliente separada |
| `PULSO` | preview POS sin venta, pago ni caja real | cero efectos transaccionales |
| `VISO` | administración real separada de simulación | permiso de simulación no auto-simulable |

#### 31. Matriz de clasificación

| Clasificación | Decisión hipotética | Contenido permitido | Efecto real |
| --- | --- | --- | --- |
| `FULL_PREVIEW` | sí | preview permitida bajo techo real de datos | prohibido |
| `DECISION_ONLY` | sí | decisión y explicación mínima | prohibido |
| `NOT_ALLOWED` | no | sin preview funcional de la capacidad | prohibido |
| desconocida | no asumir | fail-closed | prohibido |

#### 32. Matriz de lifecycle

| Estado | Presentación | Ejecución real desde procedencia simulada |
| --- | --- | --- |
| `DRAFT` | no preview activa | DENY |
| `RESOLVING` | no confirmada | DENY |
| `ACTIVE` | según clasificación | DENY |
| `STALE` | suspendida | DENY |
| `INVALID` visible | retirar o bloquear | DENY |
| `EXIT_PENDING` | conserva semántica simulada | DENY |
| `COMPLETED` con request antigua | artefacto histórico | DENY replay |
| `EXPIRED` con request antigua | artefacto histórico | DENY replay |
| `REVOKED` con request antigua | artefacto histórico | DENY replay |
| `INVALID` terminal con request antigua | artefacto histórico | DENY replay |
| contexto real fresco posterior | fuera de simulación | evaluar desde cero |

#### 33. Matriz multicanal

| Canal | Evidencia mínima de conformidad |
| --- | --- |
| launcher / navegación | no convierte preview en acceso real y revalida destino |
| RSC / fetch server-side | no amplía datos con autoridad simulada |
| Server Actions | deny server-side antes del efecto |
| Route Handlers / APIs | llamada directa no crea bypass |
| RPC / PostgREST | writer no acepta rol, territorio o decisión simulados como autoridad |
| RLS / Data API | policies no amplían filas por contexto simulado |
| Edge Functions | credencial técnica no sustituye autoridad del actor |
| Realtime | scope real preservado y sin origen mutador prohibido |
| offline | no encola mutación real desde preview |
| procesos asíncronos | no difieren el bypass a worker |
| jobs / colas | producer y consumer preservan procedencia y cero efectos |
| webhook / integración | cero dispatch externo |
| notificaciones | cero envío real |
| impresión | cero job físico |
| exportaciones | no externalizan datos por autoridad simulada |

#### 34. Techo de datos reales

En todas las aplicaciones debe mantenerse:

```text
REAL DATA VISIBLE IN PREVIEW
subset_of
REAL ACTOR AUTHORIZED DATA
```

El rol simulado no amplía filas, campos, documentos, adjuntos, saldos, proveedores, clientes, trabajadores, inventario, costos o configuraciones visibles.

Datos sintéticos, vacíos o enmascarados permanecen explícitamente separados de datos reales.

#### 35. Aviso persistente

Toda superficie que presente contenido afectado por simulación debe conservar el aviso definido por su contrato.

La certificación debe demostrar que:

- ruta, layout, modal, portal, tab o refresh no eliminan silenciosamente la condición;
- el aviso no puede descartarse mientras continúe la preview;
- su ausencia accidental no habilita operación real;
- la experiencia sigue siendo perceptible y accesible.

#### 36. Read-only integral

La aplicación debe probar todos los métodos de activación relevantes, no solo el click principal.

Incluye cuando apliquen:

- Enter;
- Space;
- shortcuts;
- command palette;
- doble click;
- touch;
- gestos;
- menús contextuales;
- acciones bulk;
- autosave;
- uploads;
- controles alternos reutilizados.

Ningún método alterno puede conservar un writer real desde preview.

#### 37. Navegación integral

Las pruebas deben incluir los mecanismos de navegación que la aplicación realmente posea:

- links internos;
- push/replace;
- redirects cliente;
- redirects servidor;
- deep links;
- URL directa;
- back/forward;
- back-forward cache;
- refresh;
- hard reload;
- nueva tab;
- nueva ventana;
- cambio de aplicación.

Cada destino revalida lo material y conserva la procedencia simulada cuando corresponda.

#### 38. Server Actions

Toda Server Action empresarial aplicable debe cubrir al menos:

1. llamada desde preview;
2. llamada directa sin depender del control visual;
3. intento con `WOULD_ALLOW`;
4. omisión o manipulación de referencia cliente;
5. replay de payload simulado;
6. lifecycle no vigente;
7. contexto real fresco posterior con solicitud nueva.

El caso simulado debe terminar antes del efecto y el caso real posterior debe reautorizarse desde cero.

#### 39. Route Handlers y APIs

Los endpoints aplicables deben demostrar que invocar directamente el transporte no evita la política.

No se admite una diferencia donde:

```text
UI -> DENY
DIRECT HTTP -> EFFECT
```

La respuesta pública conserva la semántica del owner y cero efectos.

#### 40. RPC y PostgREST

Una llamada directa a Supabase no puede recibir como autoridad:

- rol simulado;
- sede simulada;
- área simulada;
- turno simulado;
- check-in simulado;
- permiso simulado;
- resultado `WOULD_ALLOW`;
- `can_operate`;
- un booleano ambiguo.

Writers y funciones protegidas deben demostrar bloqueo o autoridad real independiente.

#### 41. RLS y Data API

La certificación debe demostrar que el contexto simulado no amplía SELECT, INSERT, UPDATE o DELETE.

No se acepta una política amplia compensada por UI read-only.

Las pruebas negativas deben incluir acceso territorial, recurso y actor fuera del alcance real cuando sean aplicables.

#### 42. Edge Functions

Una Edge Function aplicable conserva procedencia y autoridad real incluso cuando utiliza credenciales técnicas internas.

La credencial del servicio no convierte una operación simulada en efecto autorizado.

Debe existir deny antes de dispatch o mutación cuando la procedencia permanezca simulada.

#### 43. Realtime

Realtime no puede:

- ampliar topics o streams por rol simulado;
- exponer payload protegido fuera del alcance real;
- ocultar una mutación prohibida tratándola como simple actualización de preview.

Toda suscripción real se autoriza mediante el plano real.

#### 44. Offline

Una aplicación con comportamiento offline debe demostrar:

```text
SIMULATED ACTION OFFLINE
-> NO EXECUTABLE BUSINESS QUEUE
```

Al reconectar se revalida lifecycle, actor, sesión, contexto e intención.

No existe autoejecución de una intención capturada durante preview.

#### 45. Procesos asíncronos, jobs y colas

La separación temporal no elimina la procedencia.

Cuando una operación pueda producir un job o mensaje ejecutable:

- el producer no debe encolarlo desde simulación;
- el consumer no debe asumir que el producer ya protegió el origen;
- una referencia simulada recibida por el worker falla cerrado;
- cero efectos externos deben quedar correlacionados.

#### 46. Webhooks e integraciones

Una preview puede representar que existiría una integración, pero no materializarla.

Deben permanecer en cero:

- webhooks;
- pagos;
- facturación;
- mensajería externa;
- proveedores;
- hardware;
- publicaciones externas;
- sincronizaciones empresariales.

#### 47. Notificaciones

La representación hipotética de una notificación no envía mensajes reales.

Email, SMS, push, mensajería interna con efecto empresarial y canales de terceros permanecen sin dispatch desde procedencia simulada.

#### 48. Impresión

La preview puede representar un comprobante, etiqueta o documento cuando el contrato lo permita.

No puede enviar un trabajo a BrowserPrint, spooler, impresora local, impresora remota o hardware equivalente.

La certificación debe observar cero trabajos físicos originados en simulación.

#### 49. Exportaciones

Exportar información real es una salida de datos y requiere autoridad real independiente.

La simulación no puede ampliar:

- datasets;
- reportes;
- adjuntos;
- archivos;
- datos financieros;
- datos personales;
- inventarios;
- información de proveedores o clientes.

Una exportación sintética o enmascarada, cuando exista, permanece inequívocamente etiquetada como preview.

#### 50. Dispositivos compartidos

Cuando una aplicación opere en estación compartida, la certificación conserva separados:

```text
DEVICE
TECHNICAL PRINCIPAL
REAL HUMAN ACTOR
REAL OPERATIONAL CONTEXT
SIMULATION
SIMULATED ROLE
```

Cambiar de trabajador invalida la preview anterior y no transfiere resultados, permisos, formulario ni intención simulados.

#### 51. Concurrencia y múltiples ventanas

Cada aplicación debe cubrir las carreras que le resulten materialmente posibles:

- terminal concurrente;
- expiración;
- cambio de actor;
- cambio de escenario;
- cambio de política;
- respuesta tardía;
- doble click;
- dos tabs;
- refresh durante `EXIT_PENDING`;
- reintento después de timeout.

Si no puede demostrarse procedencia real fresca en el commit point, no existe efecto.

#### 52. Replay e idempotencia

Una identidad usada por preview no se reutiliza como autorización o idempotency key de una mutación real.

Debe probarse que:

- request simulado histórico sigue no ejecutable después del terminal;
- respuesta `WOULD_ALLOW` stale no habilita una acción;
- payload capturado en preview no se reproduce como real;
- la solicitud real posterior utiliza una intención nueva y su propio namespace de idempotencia.

#### 53. Retorno a contexto real

Después de `COMPLETED`, `EXPIRED`, `REVOKED` o `INVALID`, la aplicación no restaura autoridad desde cache o estado previo.

La secuencia válida es:

```text
TERMINAL CONFIRMED
-> SIMULATED STATE DISCARDED
-> REAL CONTEXT RE-RESOLVED
-> NEW REAL REQUEST
-> REAL AUTHORIZATION
```

El terminal no autoejecuta la acción simulada.

#### 54. Evidencia positiva

Las pruebas positivas demuestran únicamente lo que debe funcionar dentro del contrato, por ejemplo:

- preview permitida en `FULL_PREVIEW`;
- decisión visible en `DECISION_ONLY`;
- navegación simulada segura;
- datos reales ya autorizados visibles cuando corresponde;
- salida autoritativa y retorno fresco;
- operación real nueva autorizada después de abandonar correctamente la simulación.

Un positivo nunca requiere producir un efecto real desde procedencia simulada.

#### 55. Evidencia negativa

Las pruebas negativas deben intentar de forma controlada los bypass aplicables:

- control mutador;
- llamada directa;
- manipulación cliente;
- omisión de referencia;
- replay;
- cache stale;
- history;
- deep link;
- RPC directa;
- endpoint directo;
- worker;
- offline;
- tab concurrente;
- actor cambiado;
- permiso desconocido;
- clasificación ausente.

El resultado conforme es deny, no ejecutabilidad y cero efectos.

#### 56. Evidencia mínima por aplicación

El expediente físico futuro debe conservar para cada aplicación:

1. aplicación y versión certificadas;
2. unidades que aportan cobertura;
3. inventario de canales aplicables;
4. justificación de cada no aplicabilidad;
5. permisos o capacidades ejercitados;
6. clasificaciones de simulación usadas;
7. escenarios positivos;
8. escenarios negativos;
9. lifecycle ejercitado;
10. evidencia de cero efectos;
11. evidencia de techo de datos;
12. evidencia de concurrencia/replay cuando aplique;
13. accesibilidad y presentación cuando exista preview;
14. trazabilidad de fallos;
15. resultado final de la aplicación.

#### 57. Evidencia mínima por unidad física

Cada `AUTH-SIM-014::<implementation_unit_id>` debe demostrar:

- package y gate E5 aplicables;
- commit o versión exacta;
- superficies incluidas;
- aplicaciones cubiertas;
- canales cubiertos;
- fixtures y datos de prueba controlados;
- baseline de efectos antes de probar;
- resultado después de cada intento;
- cero escrituras y cero dispatch no autorizados;
- logs y auditoría correlacionables;
- rollback verificable;
- relación con otras unidades necesarias para completar la aplicación.

#### 58. Evidencia de cero efectos

La certificación no se limita a recibir un código de error.

Debe demostrar, cuando aplique:

```text
ROWS_WRITTEN = 0
STATE_TRANSITIONS = 0
OUTBOX_MESSAGES = 0
QUEUED_JOBS = 0
WEBHOOKS_SENT = 0
NOTIFICATIONS_SENT = 0
PRINT_JOBS = 0
EXTERNAL_MUTATIONS = 0
```

Las métricas son semánticas; cada unidad puede usar evidencia física equivalente.

#### 59. Agregación de fallos

Un fallo no se oculta promediando resultados de la aplicación.

La regla es:

```text
ONE CRITICAL APPLICABLE FAILURE
-> APPLICATION FAIL
```

El expediente conserva el canal, escenario, versión, owner y evidencia que bloquean la certificación.

#### 60. No certificación por ausencia de uso

No se considera evidencia suficiente:

- cero sesiones actuales de simulación;
- cero usuarios que hayan intentado la acción;
- ausencia de incidentes;
- feature aún no utilizada;
- código aparentemente inaccesible desde la UI;
- un writer legacy sin consumidores observados.

La seguridad se demuestra mediante contrato y pruebas, no por falta de tráfico.

#### 61. Versiones y fingerprints

La evidencia debe vincularse con la versión real certificada.

Cambios materiales en:

- código;
- catálogo;
- permisos;
- `simulation_requirement`;
- RLS;
- funciones;
- rutas;
- contratos compartidos;
- configuración;
- consumidores;

invalidan la reutilización silenciosa de evidencia anterior cuando afecten el resultado.

#### 62. Auditoría

La certificación conserva, según aplique:

- actor real;
- sesión real;
- aplicación;
- unidad;
- simulación;
- revisión;
- permiso/capacidad;
- recurso;
- canal;
- decisión real;
- resultado simulado;
- razón de bloqueo;
- versión;
- fingerprint;
- timestamp;
- evidencia de efecto cero.

La auditoría no concede autoridad.

#### 63. Privacidad y minimización

La evidencia no almacena por defecto:

- JWT completos;
- access tokens;
- refresh tokens;
- cookies completas;
- contraseñas;
- PIN;
- OTP;
- service-role keys;
- API keys;
- payloads personales innecesarios;
- documentos o información financiera completa cuando basta una referencia segura.

La prueba conserva lo necesario para reproducibilidad sin convertir el expediente en una fuga de datos.

#### 64. Accesibilidad

Las aplicaciones que materialicen preview deben demostrar:

- condición de simulación perceptible sin depender solo de color;
- rol y carácter no ejecutable identificables;
- foco predecible;
- controles inertes comprensibles;
- teclado sin bypass;
- zoom y reflow;
- lector de pantalla cuando aplique;
- cambio de lifecycle anunciado sin ruido repetitivo.

La accesibilidad no sustituye el enforcement, pero forma parte de la certificación integral de la experiencia.

#### 65. Estado físico actual: contratos disponibles

Existen contratos documentales y una fundación física de auditoría de simulación que permiten definir el comportamiento esperado.

También existen inventarios de superficies server-side y una primitiva visual compartida.

Estas bases son evidencia de preparación, no certificación física de las diez aplicaciones.

#### 66. Estado físico actual: mezcla en EffectiveContext

`@vento/os-context` todavía conserva campos de simulación y `can_operate` dentro de un contexto efectivo compartido.

Mientras esa mezcla permanezca en una unidad consumidora sin reconciliación y pruebas suficientes, no puede usarse como evidencia positiva de separación integral.

#### 67. Estado físico actual: booleano de permiso

`hasEffectivePermission` conserva una salida booleana.

Un booleano no demuestra:

- procedencia;
- lifecycle;
- clasificación;
- razón;
- `executable = false`;
- recurso;
- versión;
- fingerprint;
- cero efectos.

No se adopta como evidencia suficiente de certificación.

#### 68. Estado físico actual: start/stop legacy

Los helpers compartidos de inicio y salida todavía conservan integración con RPC legacy.

Su existencia no demuestra un lifecycle consumidor completo conforme en cada aplicación.

La certificación futura debe utilizar la materialización propietaria vigente y demostrar el flujo real de inicio, preview, salida y retorno fresco.

#### 69. Estado físico actual: paridad multicanal no certificada

La inspección estática disponible no demuestra hoy que las diez aplicaciones y todos sus canales aplicables produzcan decisiones equivalentes ante procedencia simulada.

Por tanto:

```text
CURRENT PHYSICAL GLOBAL SIMULATION CERTIFICATION = NOT ESTABLISHED
```

Esta tarea no convierte esa ausencia de evidencia en un PASS documental de implementación.

#### 70. Registro de estado por aplicación para esta tarea documental

| Aplicación | Decisión documental | Certificación física observada por esta tarea |
| --- | --- | --- |
| `SHELL` | definida | `NOT_EXECUTED` |
| `ANIMA` | definida | `NOT_EXECUTED` |
| `AURA` | exclusión preservada | `NOT_EXECUTED` |
| `FOGO` | definida | `NOT_EXECUTED` |
| `NEXO` | definida | `NOT_EXECUTED` |
| `NUMERA` | definida | `NOT_EXECUTED` |
| `ORIGO` | definida | `NOT_EXECUTED` |
| `PASS` | exclusión laboral preservada | `NOT_EXECUTED` |
| `PULSO` | definida | `NOT_EXECUTED` |
| `VISO` | definida | `NOT_EXECUTED` |

La tabla registra exclusivamente el alcance de esta definición documental.

#### 71. Rollback de una futura unidad

El rollback técnico no puede:

- restaurar autoridad simulada como contexto efectivo;
- reactivar `can_operate` como guard ambiguo;
- convertir un booleano simulado en permiso real;
- reactivar writers accesibles desde preview;
- retirar el aviso conservando contenido simulado;
- convertir `NOT_ALLOWED` en read-only;
- convertir `DECISION_ONLY` en formulario operativo;
- degradar permisos desconocidos a `FULL_PREVIEW`;
- restaurar replay offline;
- reutilizar idempotency keys de preview como reales;
- ampliar RLS con rol o territorio simulado;
- reactivar webhooks, impresión, notificaciones o integraciones desde preview;
- borrar evidencia histórica para aparentar conformidad.

#### 72. Invariantes

1. Existen exactamente diez aplicaciones canónicas en la matriz.
2. Ninguna aplicación acepta autoridad simulada.
3. Una superficie aprobada no certifica una aplicación completa.
4. Una aplicación aprobada no certifica el bloque completo.
5. La no aplicabilidad exige evidencia.
6. Evidencia ausente no equivale a PASS.
7. `FULL_PREVIEW` no habilita efectos reales.
8. `DECISION_ONLY` no habilita contenido protegido por autoridad simulada.
9. `NOT_ALLOWED` no se degrada a preview.
10. Clasificación desconocida falla cerrado.
11. La distribución 85/52/3 permanece intacta.
12. El delta físico 179/140 no se interpreta como clasificación automática.
13. AURA conserva su exclusión.
14. PASS conserva separación cliente/laboral.
15. VISO no autoautoriza la simulación.
16. SHELL no concede autoridad a destinos.
17. ANIMA no registra asistencia desde preview.
18. FOGO no produce efectos de producción desde preview.
19. NEXO no mueve inventario ni logística desde preview.
20. NUMERA no produce efectos contables desde preview.
21. ORIGO no crea compras o recepciones desde preview.
22. PULSO no produce efectos POS desde preview.
23. Navegación no crea autoridad.
24. Read-only no sustituye enforcement.
25. Server Actions bloquean antes del efecto.
26. Route Handlers no crean bypass.
27. RPC/PostgREST no aceptan autoridad simulada.
28. RLS/Data API no amplían datos por simulación.
29. Edge Functions no convierten credenciales técnicas en autoridad del actor.
30. Realtime no amplía acceso por simulación.
31. Offline no encola mutaciones reales.
32. Jobs y colas no difieren el bypass.
33. Webhooks e integraciones permanecen en cero efectos.
34. Notificaciones reales no salen desde preview.
35. Impresión física no se dispara desde preview.
36. Exportaciones protegidas exigen autoridad real.
37. El actor real permanece separado del sujeto simulado.
38. La sesión real permanece separada del lifecycle simulado.
39. Cambiar actor invalida la preview previa.
40. Cambiar escenario invalida resultados incompatibles.
41. Cambiar política invalida evidencia stale.
42. Tabs y respuestas tardías no resucitan un estado terminal.
43. El terminal no autoejecuta la acción simulada.
44. Una acción real posterior usa contexto real fresco.
45. Replay simulado permanece prohibido.
46. Idempotencia de preview no se reutiliza para mutación real.
47. La autoridad real es techo de datos.
48. Evidencia de error no basta sin evidencia de cero efectos cuando el canal puede producirlos.
49. Privacidad y minimización forman parte del expediente.
50. Accesibilidad forma parte de la experiencia certificada.
51. La auditoría no concede autoridad.
52. `EffectiveContext` legacy no se adopta como separación certificada.
53. El booleano de permiso legacy no certifica el contrato.
54. Los helpers legacy de start/stop no prueban adopción integral.
55. La paridad multicanal actual no se presume.
56. No se modifica `AUTH-DB-013`.
57. No se redefine `AUTH-SRV-015`.
58. No se crean ni modifican requisitos de prueba.
59. No se modifica 04A.
60. No se ejecutan cambios físicos en esta tarea.

#### 73. Resultado documental

La tarea deja cerrado documentalmente:

1. universo exacto de diez aplicaciones;
2. regla de aplicabilidad por canal;
3. definición de PASS por canal;
4. definición de PASS por aplicación;
5. definición de PASS global futuro;
6. matriz de decisiones por aplicación;
7. interpretación de las tres clasificaciones;
8. tratamiento de permisos no clasificados;
9. matriz de lifecycle;
10. matriz multicanal;
11. techo de datos reales;
12. aviso persistente;
13. read-only;
14. navegación;
15. Server Actions;
16. Route Handlers/APIs;
17. RPC/PostgREST;
18. RLS/Data API;
19. Edge Functions;
20. Realtime;
21. offline;
22. procesos asíncronos;
23. jobs y colas;
24. webhooks e integraciones;
25. notificaciones;
26. impresión;
27. exportaciones;
28. dispositivos compartidos;
29. concurrencia;
30. replay e idempotencia;
31. retorno a contexto real;
32. evidencia positiva y negativa;
33. evidencia mínima por aplicación;
34. evidencia mínima por unidad;
35. cero efectos;
36. agregación de fallos;
37. versiones y fingerprints;
38. auditoría;
39. privacidad;
40. accesibilidad;
41. brechas físicas vigentes;
42. rollback;
43. cierre del mini-bloque documental de simulación.

#### 74. Cierre documental del mini-bloque

Con `AUTH-SIM-014` queda definida la última pieza documental del mini-bloque `AUTH-SIM-012..014`:

```text
AUTH-SIM-012
-> NAVIGATION CERTIFICATION CONTRACT
```

```text
AUTH-SIM-013
-> SERVER ACTION CERTIFICATION CONTRACT
```

```text
AUTH-SIM-014
-> CROSS-APPLICATION INTEGRAL CERTIFICATION CONTRACT
```

Esto cierra la definición documental del tramo, no sus implementaciones físicas futuras.

#### 75. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la cobertura vigente ya protege separación entre autoridad real y simulada, clasificación de simulación, bloqueo de ejecución, paridad multicanal, lifecycle, navegación, Server Actions, aplicaciones canónicas, cero efectos, experiencia, auditoría, invalidación, replay y reconciliación física. Esta tarea agrega la regla de agregación y certificación integral por aplicación sin introducir una obligación verificable nueva ni cambiar owner, prioridad, modalidad, paquete, estado o relaciones del registro.

#### 76. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- simulación no ejecutable y cuatro planos separados;
- resultados `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE`;
- techo de autoridad real sobre datos;
- bloqueo de mutaciones y lecturas protegidas;
- navegación y controles de preview;
- Server Actions y canales server-side;
- lifecycle, salida fresca, invalidación y replay;
- diez aplicaciones canónicas;
- indicador persistente, privacidad, concurrencia e idempotencia;
- reconciliación física de APIs, tipos, permisos, RLS, RPC y consumers.

Trazabilidad vigente reutilizada: `TREQ-AUTH-012`, `TREQ-AUTH-119..128`, `TREQ-AUTH-165`, `TREQ-AUTH-275`, `TREQ-AUTH-279..288` y la cobertura transversal de aplicaciones, UI, contratos compartidos, auditoría y regresión ya registrada.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `AUTH-SIM-014`.

#### 77. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto se preparó de forma independiente y todavía no fue incorporado al archivo propietario ni sometido al build documental del checkout del usuario |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron apertura de rama, preflight, formateador, task quality, delivery check, topología, TREQ ni batería global dentro del checkout local del usuario |
| REMOTA | `PASS` | se verificaron en solo lectura `main`, cierre de `AUTH-SIM-013`, continuidad hacia `AUTH-SIM-014`, owner, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas documentales, contrato de entrega, handoff completo de `AUTH-SIM-013`, matrices previas de simulación, familia 04A AUTH, comandos vigentes y brechas físicas compartidas relevantes |
| OPERATIVA | `NOT_EXECUTED` | no se ejecutó una simulación real ni se probaron recorridos o efectos en aplicaciones desplegadas durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron ni certificaron aplicaciones, código, Server Actions, Route Handlers, RPC, RLS, Edge Functions, Realtime, colas, integraciones, hardware, Supabase, datos o despliegues |

#### 78. Criterios de aceptación

- [x] Se define un universo exacto de diez aplicaciones.
- [x] Se conserva `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`.
- [x] Se distingue aplicación de unidad física.
- [x] Se define aplicabilidad de canales con evidencia obligatoria.
- [x] Se impide usar ausencia no demostrada como `NOT_APPLICABLE`.
- [x] Se define PASS por canal.
- [x] Se define PASS por aplicación.
- [x] Se define cierre físico global futuro sin declararlo ejecutado.
- [x] Se conserva la clasificación 85/52/3.
- [x] Se conservan las tres claves `NOT_ALLOWED`.
- [x] Se registra el delta físico 179/140 sin clasificarlo por inferencia.
- [x] SHELL conserva revalidación en destino.
- [x] ANIMA conserva separación de hechos reales de asistencia.
- [x] AURA conserva exclusión sin fabricar superficie.
- [x] FOGO conserva cero efectos productivos.
- [x] NEXO conserva cero movimientos logísticos o de inventario.
- [x] NUMERA conserva cero efectos financieros y techo reforzado de datos.
- [x] ORIGO conserva cero órdenes y recepciones reales.
- [x] PASS conserva exclusión laboral y separación de identidad cliente.
- [x] PULSO conserva cero efectos POS.
- [x] VISO conserva separación entre administración real y simulación.
- [x] Se cubre aviso persistente.
- [x] Se cubre read-only y métodos alternos de interacción.
- [x] Se cubre navegación integral.
- [x] Se cubren Server Actions.
- [x] Se cubren Route Handlers y APIs.
- [x] Se cubren RPC/PostgREST.
- [x] Se cubren RLS/Data API.
- [x] Se cubren Edge Functions.
- [x] Se cubre Realtime.
- [x] Se cubre offline.
- [x] Se cubren procesos asíncronos, jobs y colas.
- [x] Se cubren webhooks e integraciones.
- [x] Se cubren notificaciones.
- [x] Se cubre impresión.
- [x] Se cubren exportaciones.
- [x] Se cubren dispositivos compartidos cuando apliquen.
- [x] Se cubren concurrencia, tabs y respuestas tardías.
- [x] Se cubren replay e idempotencia.
- [x] Se exige contexto real fresco después de terminal.
- [x] Se definen pruebas positivas y negativas.
- [x] Se define evidencia mínima por aplicación.
- [x] Se define evidencia mínima por unidad.
- [x] Se exige evidencia de cero efectos.
- [x] Un fallo crítico aplicable bloquea PASS de la aplicación.
- [x] Cero tráfico no se acepta como evidencia de seguridad.
- [x] Se vincula evidencia con versiones y fingerprints.
- [x] Se conserva auditoría correlacionable.
- [x] Se conserva privacidad y minimización.
- [x] Se incluye accesibilidad en la certificación integral.
- [x] Se reconoce la fundación física existente sin presentarla como certificación.
- [x] Se conserva la brecha de mezcla de `EffectiveContext`.
- [x] Se conserva la insuficiencia del booleano `hasEffectivePermission`.
- [x] Se conservan los helpers legacy de start/stop como brecha no certificada.
- [x] No se presume paridad multicanal física actual.
- [x] Se define rollback fail-closed.
- [x] Se cierra documentalmente el mini-bloque `AUTH-SIM-012..014`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se ejecutan cambios físicos.
- [x] `NEXO-DOM-002` permanece reservada.

#### 79. Límites

Esta tarea no:

- ejecuta simulaciones reales;
- certifica físicamente ninguna aplicación;
- crea una instancia física;
- modifica aplicaciones;
- modifica código;
- modifica `@vento/os-context`;
- corrige `EffectiveContext`;
- cambia `hasEffectivePermission`;
- modifica Server Actions;
- modifica Route Handlers;
- modifica APIs;
- modifica RPC/PostgREST;
- modifica RLS/Data API;
- modifica Edge Functions;
- modifica Realtime;
- modifica offline queues;
- modifica jobs o colas;
- modifica webhooks o integraciones;
- modifica notificaciones;
- modifica impresión;
- modifica exportaciones;
- modifica Supabase;
- crea migraciones;
- modifica Auth;
- modifica Storage;
- cambia roles;
- cambia permisos;
- cambia `simulation_requirement`;
- reclasifica el snapshot 85/52/3;
- reconcilia por sí sola el delta físico 179/140;
- modifica `AUTH-DB-013`;
- redefine `AUTH-SRV-015`;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-DOM-002`.

#### 80. Handoff de cierre hacia la siguiente etapa

`AUTH-SIM-014` cierra el contrato documental del BLOQUE Q sin transferir semántica de simulación al dominio NEXO.

La continuidad siguiente pertenece a su propia etapa canónica:

```text
AUTH-SIM-014 CLOSED
-> PHASE-04-PQ DOCUMENTARY SEGMENT COMPLETE
-> CONTINUITY RESOLVES NEXT CANONICAL TASK
```

`NEXO-DOM-002` deberá iniciarse únicamente después del cierre documental válido de esta tarea y utilizar sus propios contratos de dominio, sin absorber una implementación física pendiente de simulación.

#### 81. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-SIM-013 — Validar Server Actions como rol simulado`

**TAREA ACTUAL APROBADA**
`AUTH-SIM-014 — Probar en todas las aplicaciones`

**SIGUIENTE TAREA RESERVADA**
`NEXO-DOM-002 — Definir propósito y tipos canónicos de LPN`
