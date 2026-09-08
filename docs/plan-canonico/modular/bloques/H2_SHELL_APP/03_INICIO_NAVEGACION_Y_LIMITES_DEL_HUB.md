### MINI-BLOQUE — INICIO NAVEGACIÓN Y LIMITES DEL HUB

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **inicio navegación y limites del hub** dentro de **H2 SHELL APP**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `SHELL-APP-009` a `SHELL-APP-016` — 8 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Definir página inicial por tipo de usuario” y concluye con “Conservar tarea en curso cuando corresponda”.
<!-- PLAN-SECTION-META:END -->

### ✅ SHELL-APP-009 — Definir página inicial por tipo de usuario

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-008 — Mostrar tareas pendientes transversales
**Tarea siguiente:** SHELL-APP-010 — Explicar por qué una aplicación está bloqueada
**Tipo de tarea:** definición técnico-documental de la entrada inicial de SHELL por actor efectivo; fija la experiencia laboral `task-first` para `EMPLOYEE` y el tratamiento cerrado de `CUSTOMER`, `SYSTEM` y `UNRESOLVED`, sin derivar la página desde nombres de rol y conservando `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** política documental de página inicial definida para los cuatro tipos canónicos de actor efectivo, con inicio laboral orientado a contexto y trabajo para `EMPLOYEE`, sin cambios de runtime ni creación de instancia física
**Cambios físicos autorizados:** ninguno; no se modifican rutas, código, launcher, login, middleware, contratos, permisos, Supabase, datos, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué experiencia inicial debe presentar SHELL cuando una identidad llega al Hub sin un destino de navegación ya resuelto, utilizando únicamente categorías y decisiones canónicas existentes.

La página inicial debe responder primero:

```text
¿QUIÉN ES EL ACTOR EFECTIVO?
¿EXISTE UNA IDENTIDAD LABORAL VÁLIDA?
¿CUÁL ES SU CONTEXTO ESENCIAL?
¿QUÉ TRABAJO TIENE AHORA?
¿CUÁL ES SU SIGUIENTE ACCIÓN?
¿QUÉ OTROS ACCESOS AUTORIZADOS NECESITA?
```

La decisión principal queda:

```text
ACTOR EFECTIVO CANÓNICO
+
IDENTIDAD LABORAL VÁLIDA CUANDO APLIQUE
+
shell.access EFECTIVO CUANDO APLIQUE
+
CONTEXTO LABORAL PROYECTABLE
+
TRABAJO PENDIENTE AUTORIZADO
+
APLICACIONES VISIBLES YA RESUELTAS
→
EXPERIENCIA INICIAL DE SHELL
```

---

#### 2. Handoff recibido de `SHELL-APP-008`

Se reciben sin reapertura:

1. región `Contexto laboral` con `Turno`, `Sede`, `Área` y `Rol operativo`;
2. superficie separada `Trabajo pendiente`;
3. trabajo pendiente basado exclusivamente en `work_item` reales;
4. `AHORA` con máximo un foco principal;
5. colas secundarias `DESPUÉS`, `EN ESPERA` y `BLOQUEADAS`;
6. prioridad canónica, no ranking local;
7. ownership conservado en `owner_app_code`;
8. SHELL como coordinador y proyección, no propietaria universal;
9. apertura de tarea distinta de claim e inicio;
10. navegación a la aplicación propietaria con revalidación;
11. ausencia, indisponibilidad e incompletitud separadas;
12. minimización y conteos sin fuga de trabajo oculto;
13. frescura y cambio de actor sin heredar trabajo;
14. separación estricta entre `Contexto laboral` y `Trabajo pendiente`.

`SHELL-APP-009` decide únicamente cómo esas superficies participan en la entrada inicial.

---

#### 3. Fuente canónica de “tipo de usuario”

El título histórico usa “tipo de usuario”.

La decisión canónica vigente se ancla en `actor_type`, no en una taxonomía local de SHELL.

Se conservan exactamente cuatro tipos de actor efectivo:

| `actor_type` | Naturaleza | Página laboral interactiva de SHELL |
| --- | --- | --- |
| `EMPLOYEE` | persona con identidad laboral resoluble | puede recibirla si cumple las condiciones de entrada |
| `CUSTOMER` | identidad de cliente | no recibe el Hub laboral |
| `SYSTEM` | actor técnico no humano | no recibe interfaz humana |
| `UNRESOLVED` | actor no resuelto con confianza | falla cerrado |

No se crea un quinto tipo.

---

#### 4. Actor no equivale a rol

Se conserva:

```text
ACTOR TYPE
≠
ROL BASE
≠
ROL OPERATIVO
≠
CARGO
≠
NIVEL JERÁRQUICO
≠
APLICACIÓN VISIBLE
```

Por tanto, esta tarea no crea categorías de identidad administrativas, operativas, híbridas o gerenciales.

Una misma persona puede ejecutar acciones de carriles distintos.

El carril pertenece a la acción y a la superficie, no al nombre del rol.

---

#### 5. Matriz de decisión inicial por actor efectivo

| Actor efectivo | Resultado inicial |
| --- | --- |
| `EMPLOYEE` válido, activo y con `shell.access` efectivo | entrada laboral interactiva de SHELL |
| `CUSTOMER` | sin página laboral de SHELL; frontera cliente permanece separada |
| `SYSTEM` | sin página interactiva humana |
| `UNRESOLVED` | sin Hub laboral; fallo cerrado |
| `EMPLOYEE` inválido o inactivo | sin Hub laboral |
| `EMPLOYEE` sin `shell.access` efectivo | sin Hub laboral |
| cualquier actor con bloqueo estructural global aplicable | sin Hub laboral autorizado |

La matriz describe presentación posterior a una resolución válida.

No concede permisos.

---

#### 6. Regla principal para `EMPLOYEE`

La entrada normal de un `EMPLOYEE` no será un menú de módulos.

Será una página laboral orientada a contexto y trabajo.

Orden conceptual obligatorio:

```text
1. CONTEXTO ESENCIAL
2. FOCO ACTUAL
3. ACCIÓN PRINCIPAL
4. ESTADO O BLOQUEO
5. SIGUIENTES OBLIGACIONES RESUMIDAS
6. ACCESOS SECUNDARIOS
```

SHELL compone esta experiencia con las decisiones ya aprobadas de `SHELL-APP-004` a `SHELL-APP-008`.

---

#### 7. Inicio laboral `task-first`

Para todo `EMPLOYEE` que pueda entrar al Hub laboral:

```text
INICIO LABORAL
→ CONTEXTO PRIMERO
→ TRABAJO PRIMERO
→ APLICACIONES COMO ACCESO SECUNDARIO
```

No se usa el grid de aplicaciones como única orientación inicial.

El trabajador no debe elegir una aplicación antes de comprender qué debe hacer.

---

#### 8. Contexto esencial

La página consume la región `Contexto laboral` ya definida.

Puede presentar:

```text
Turno
Sede
Área
Rol operativo
```

con las semánticas de ausencia, indisponibilidad y validez aprobadas por sus tareas propietarias.

La página no vuelve a calcular esos hechos ni los convierte en permisos.

---

#### 9. Trabajo pendiente

La página consume `Trabajo pendiente` como superficie separada.

Cuando existe foco vigente:

```text
AHORA
→ máximo 1 foco principal
→ acción principal humana
```

Las demás obligaciones permanecen en:

```text
DESPUÉS
EN ESPERA
BLOQUEADAS
```

La página inicial no crea otro algoritmo de prioridad.

---

#### 10. Trabajo administrativo concreto

Una obligación administrativa puede aparecer como foco cuando:

- existe como `work_item` real;
- pertenece al actor o cola autorizada;
- su carril es compatible;
- su estado y readiness permiten presentarla;
- la aplicación propietaria conserva autoridad;
- la proyección es vigente.

Por tanto, trabajo administrativo concreto puede ser foco sin convertir toda la página inicial en backoffice ni dashboard denso.

---

#### 11. El rol no produce otro home

Ningún rol base ni rol operativo redirige por sí mismo a:

- VISO;
- NUMERA;
- NEXO;
- una ruta administrativa;
- un dashboard;
- una aplicación favorita.

Esto aplica también a `trabajador_operativo`.

La visibilidad de aplicaciones continúa resolviéndose por `SHELL-APP-002` y `SHELL-APP-003`.

---

#### 12. Empleado con contexto operativo vigente

Cuando el empleado dispone de contexto operativo vigente, la página muestra ese contexto conforme a las decisiones aprobadas.

El contexto puede afectar:

- aplicaciones visibles;
- elegibilidad de trabajo;
- readiness de obligaciones.

No cambia `actor_type` ni crea otra página por nombre del rol operativo.

---

#### 13. Empleado sin turno vigente

La ausencia de turno no redirige automáticamente al launcher ni a administración.

La página inicial sigue siendo laboral y muestra el estado que corresponda.

Puede expresar, conforme a contratos ya aprobados:

```text
Sin turno vigente
Sin tareas pendientes
Solo tareas futuras
Trabajo no disponible
```

cuando la proyección válida lo determine.

No inventa trabajo para llenar la página.

---

#### 14. Empleado sin tareas

`NO_WORK_AVAILABLE` es un resultado válido.

Cuando la proyección confiable determina que no existe trabajo pendiente:

```text
Sin tareas pendientes
```

permanece como estado principal.

Los accesos secundarios autorizados pueden seguir disponibles.

No sustituyen el estado vacío ni se presentan como tareas.

---

#### 15. Trabajo no disponible o parcial

Cuando `Trabajo pendiente` no puede resolverse con confianza, la página no presenta `Sin tareas pendientes`.

Una proyección incompleta permanece explícitamente incompleta.

La página no calcula cero tareas para una fuente que falló.

Los accesos secundarios no ocultan el fallo ni cambian la completitud del trabajo.

---

#### 16. Aplicaciones como accesos secundarios

El Hub conserva la capacidad de abrir aplicaciones autorizadas.

Dentro del inicio laboral, las aplicaciones se ubican conceptualmente como:

```text
ACCESOS SECUNDARIOS
```

después del contexto, foco, acción, estado y obligaciones resumidas.

La tarea no define el layout final.

---

#### 17. Fuente de los accesos secundarios

Los accesos secundarios reutilizan exclusivamente:

```text
SHELL-APP-002 — visibilidad por actor
+
SHELL-APP-003 — visibilidad por contexto
```

La página inicial no mantiene otra matriz local de rol, tipo de usuario o cargo hacia aplicaciones.

---

#### 18. Sin redirección por conveniencia

No producen destino inicial autoritativo:

- una única aplicación visible;
- la última aplicación abierta;
- una aplicación favorita;
- el orden del catálogo;
- el orden del DOM;
- la marca de aplicación asociada al rol;
- una preferencia local.

La página laboral conserva primero contexto y estado del trabajo.

---

#### 19. Inicio no equivale a autoejecución

Mostrar un foco al entrar en SHELL:

```text
≠ CLAIM
≠ START
≠ COMPLETE
```

La existencia del foco tampoco obliga a redirigir inmediatamente a la aplicación propietaria.

La acción primaria puede abrirla conforme a `SHELL-APP-008`.

---

#### 20. Entrada por defecto versus destino explícito

Esta tarea define la entrada por defecto de SHELL.

No redefine un destino explícito y válido ya resuelto por un flujo autorizado.

Se conserva:

```text
ENTRADA POR DEFECTO A SHELL
≠
DEEP LINK VÁLIDO
≠
RETORNO CROSS-APP
≠
REANUDACIÓN DE TAREA
```

Las reglas completas de retorno y conservación permanecen reservadas a tareas posteriores del mismo minibloque.

---

#### 21. `CUSTOMER`

`CUSTOMER` no recibe la página laboral de SHELL.

Resultado:

```text
CUSTOMER
→ NO GRID LABORAL
→ NO CONTEXTO LABORAL
→ NO TRABAJO LABORAL PROYECTADO POR SHELL
```

Esta tarea no convierte Vento Pass en tarjeta principal ni en home laboral.

---

#### 22. Frontera cliente todavía reservada

La clasificación `CUSTOMER` no autoriza a `SHELL-APP-009` a decidir una redirección automática hacia PASS.

La frontera exacta entre SHELL laboral y superficie cliente permanece reservada a:

- `SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente`;
- `SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente`.

Esta tarea define únicamente:

```text
CUSTOMER
→ NO LABOR HOME
```

---

#### 23. Persona con identidad cliente y laboral

Si una misma persona posee identidad cliente y además identidad laboral válida, SHELL utiliza el actor efectivo ya resuelto.

Cuando el actor efectivo para la sesión laboral es `EMPLOYEE`, aplica el inicio laboral.

No se mezclan simultáneamente RBAC laboral e identidad cliente para fabricar un home híbrido.

---

#### 24. `SYSTEM`

`SYSTEM` no recibe:

- página inicial humana;
- contexto laboral visual;
- cola de trabajo humana;
- launcher interactivo;
- selector de aplicaciones;
- menú de navegación humana.

Las integraciones técnicas consumen sus contratos propios.

---

#### 25. `UNRESOLVED`

`UNRESOLVED` falla cerrado.

Resultado:

```text
VISIBLE_LABOR_HOME = NO
VISIBLE_LABOR_APPS = 0
```

No se usan como fallback email, texto del perfil, rol persistido en cliente, última aplicación, cookie de simulación, selección local ni lista estática de tarjetas.

---

#### 26. Empleado inválido, inactivo o sin `shell.access`

Una identidad laboral histórica, suspendida, incompatible o inactiva no conserva el home por tener sesión técnica.

La entrada laboral requiere empleado válido y `shell.access` efectivo.

Un rol operativo no concede `shell.access`.

La página inicial no funciona como bypass de una decisión denegada.

---

#### 27. Bloqueo estructural global

Un problema estructural global aplicable impide construir un home laboral autorizado.

La UI no conserva una composición anteriormente válida por caché cuando el actor o su resolución estructural dejan de ser confiables.

La explicación detallada de bloqueo de aplicaciones individuales permanece reservada a `SHELL-APP-010`.

---

#### 28. AURA, PASS y SHELL

Se conservan las decisiones anteriores:

```text
AURA
→ DEFERRED_RESERVED

PASS
→ ADJACENT_RESERVED

SHELL
→ HUB_SELF
```

AURA no se activa.

PASS no entra al grid laboral primario.

SHELL no se muestra como tarjeta de sí misma.

---

#### 29. Fuentes separadas

La composición inicial no crea un payload monolítico autoritativo.

Se conserva:

```text
CONTEXTO LABORAL
→ proyección de contexto

TRABAJO PENDIENTE
→ proyección de work items

APLICACIONES
→ decisiones de visibilidad
```

La página compone esas proyecciones sin adquirir autoridad sobre sus fuentes.

---

#### 30. Coherencia temporal y cambio de actor

La página no presenta como una sola realidad actor, contexto, trabajo y aplicaciones de versiones incompatibles.

Cuando cambia el actor humano:

1. se descarta la composición personal anterior;
2. se recalcula acceso a SHELL;
3. se recalcula contexto;
4. se recalcula trabajo pendiente;
5. se recalculan accesos secundarios;
6. no se heredan foco, conteos ni preferencias como autoridad.

El dispositivo no determina `actor_type`.

---

#### 31. Simulación y estado de resolución

Una simulación no cambia el home real del actor.

Antes de resolver actor, acceso y proyecciones, la página no afirma:

```text
Sin tareas pendientes
```

ni:

```text
No tienes aplicaciones
```

como resultados confirmados.

Carga o resolución no equivalen a estado vacío.

---

#### 32. Lenguaje, accesibilidad y privacidad

La página inicial usa intención y resultado, no nombres de tablas, RPC, códigos de permiso, enums, rutas internas, componentes o repositorios.

Su jerarquía semántica conserva:

```text
Contexto
Trabajo actual
Acción
Estado
Siguientes obligaciones
Accesos secundarios
```

El significado no depende solo de color, iconos, posición o animación.

La composición no revela mediante badges, títulos, nombres de aplicaciones o estados la existencia de trabajo o capacidades de otros actores.

---

#### 33. No dashboard universal ni administración como relleno

La entrada laboral no se transforma en un dashboard universal de KPIs, gráficos, indicadores ejecutivos, anuncios, reportes, métricas financieras, configuración, auditoría o administración general.

Cuando no exista trabajo:

```text
SIN TRABAJO
≠
MOSTRAR ADMINISTRACIÓN COMO TAREA
```

Los accesos secundarios autorizados continúan siendo navegación.

No se presentan como obligaciones.

---

#### 34. Fronteras con tareas posteriores

Esta tarea no:

- define la explicación completa de bloqueo de una aplicación, reservada a `SHELL-APP-010`;
- define la frontera final laboral/cliente, reservada a `SHELL-APP-011`;
- redefine PASS y su RBAC cliente, reservado a `SHELL-APP-012`;
- absorbe lógica funcional de otras aplicaciones, frontera de `SHELL-APP-013`;
- define retorno seguro cross-app, reservado a `SHELL-APP-014`;
- define conservación de contexto, reservada a `SHELL-APP-015`;
- define conservación técnica de tarea en curso, reservada a `SHELL-APP-016`;
- define layout final por dispositivo, reservado a `SHELL-APP-017` y `SHELL-APP-018`.

---

#### 35. No fijar una ruta nueva

La tarea define la semántica de entrada inicial.

No crea una ruta runtime ni exige una URL adicional.

La materialización física posterior reconciliará la ruta existente con esta política dentro de la unidad de implementación autorizada.

---

#### 36. Decisión documental consolidada

```text
EMPLOYEE
+
EMPLEADO VÁLIDO
+
shell.access = ALLOW
→ HOME LABORAL INTERACTIVO

HOME LABORAL
→ CONTEXTO ESENCIAL
→ FOCO / ESTADO DE TRABAJO
→ ACCIÓN PRINCIPAL
→ OBLIGACIONES SECUNDARIAS
→ APPS AUTORIZADAS COMO ACCESO SECUNDARIO

CUSTOMER
→ NO LABOR HOME

SYSTEM
→ NO UI HUMANA

UNRESOLVED
→ FAIL CLOSED

ROL BASE
X DEFINE HOME

ROL OPERATIVO
X DEFINE HOME

ÚLTIMA APP
X DEFINE HOME

APP ÚNICA
X AUTOREDIRECT

HOME
X MENÚ DE MÓDULOS COMO ÚNICA ORIENTACIÓN

SIN TRABAJO
X ADMINISTRACIÓN COMO RELLENO
```

---

#### 37. Handoff a `SHELL-APP-010`

La siguiente tarea recibe:

1. cuatro tipos canónicos de actor sin ampliación;
2. `EMPLOYEE` como único tipo que puede recibir el home laboral interactivo de SHELL;
3. `CUSTOMER` fuera del home laboral, con frontera cliente todavía reservada;
4. `SYSTEM` sin interfaz humana;
5. `UNRESOLVED` fail closed;
6. página laboral `task-first`;
7. orden `Contexto → Foco → Acción → Estado → Obligaciones → Accesos secundarios`;
8. launcher conservado como navegación secundaria;
9. visibilidad de aplicaciones reutilizada desde `SHELL-APP-002` y `SHELL-APP-003`;
10. ausencia de redirección por rol, última app o única app visible;
11. estados sin trabajo sin administración como relleno;
12. composición sin adquirir autoridad sobre contexto, work items o aplicaciones;
13. explicación detallada de por qué una aplicación está bloqueada todavía no definida.

`SHELL-APP-010` podrá explicar bloqueos de aplicación sin reabrir la decisión de página inicial.

---

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea especializa en SHELL reglas ya protegidas de clasificación por actor y superficie, foco de trabajo, estados vacíos, navegación cross-app y visibilidad autorizada.

No modifica ninguna regla protegida ni el Registro Canónico de Requisitos de Prueba.

---

#### 39. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-UX-001` — tarea actual, acción principal y estado identificables en superficies operativas;
- `TREQ-UX-003` — información, acciones y densidad adecuadas al actor y autorización;
- `TREQ-UX-008` — clasificación por acción y superficie, no por aplicación, rol o dispositivo;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricar autoridad;
- `TREQ-UX-020` — consistencia cross-app y SHELL sin inferir carril por ruta o aplicación;
- `TREQ-UX-021` — diferenciación de carriles por estructura y semántica, no solo color;
- `TREQ-UX-024` — foco derivado de un ítem de trabajo real;
- `TREQ-UX-029` — entrada operativa con foco principal y colas secundarias;
- `TREQ-UX-033` — separación entre estación, actor humano, foco y sesión técnica;
- `TREQ-UX-034` — SHELL puede proyectar y navegar, pero la propietaria revalida y ejecuta;
- `TREQ-UX-037` — estados vacíos diferenciados sin inventar trabajo ni usar administración como relleno;
- `TREQ-UX-038` — jerarquía estructural y accesibilidad del foco;
- `TREQ-SHELL-028` — catálogo único y versionado para launcher y navegación;
- `TREQ-SHELL-030` — visibilidad derivada de permisos y contexto sin sustituir autorización.

Esta sección es trazabilidad heredada.

No actualiza 04A.

---

#### 40. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto aún no ha sido insertado ni sometido a la batería documental del checkout local de `SHELL-APP-009`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía format, quality, delivery, validadores de dominio ni batería global sobre la rama local de `SHELL-APP-009`. |
| REMOTA | PASS | Se verificaron el `main` posterior al cierre de `SHELL-APP-008`, continuidad H2, archivo propietario vigente, topología `PER_IMPLEMENTATION_UNIT`, protocolo, contrato de entrega, políticas documentales, cuatro tipos canónicos de actor, visibilidad por actor y contexto, handoff de `SHELL-APP-008`, principios `UX-BASE-001/002`, registro 04A UX vigente y validadores documentales aplicables. |
| OPERATIVA | NOT_APPLICABLE | La tarea define política documental de inicio y no prueba usuarios, rutas, trabajo real ni navegación desplegada. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea ni autoriza una materialización física de `SHELL-APP-009` y no modifica runtime, infraestructura, datos ni despliegues. |

---

#### 41. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-009 — Definir página inicial por tipo de usuario`.
- [ ] `SHELL-APP-008` permanece como tarea anterior.
- [ ] `SHELL-APP-010` permanece como siguiente tarea.
- [ ] La tarea permanece exclusivamente documental.
- [ ] La topología futura permanece `PER_IMPLEMENTATION_UNIT` sin crear instancia física.
- [ ] “Tipo de usuario” se resuelve mediante los cuatro `actor_type` canónicos.
- [ ] Se conservan exactamente `EMPLOYEE`, `CUSTOMER`, `SYSTEM` y `UNRESOLVED`.
- [ ] No se crean tipos administrativos, operativos, híbridos o gerenciales de identidad.
- [ ] El nombre del rol base no selecciona la página inicial.
- [ ] El nombre del rol operativo no selecciona la página inicial.
- [ ] `EMPLOYEE` válido y con `shell.access` puede recibir el home laboral.
- [ ] Un empleado inactivo no conserva el home laboral.
- [ ] Sin `shell.access` no se muestra el home laboral como bypass.
- [ ] `CUSTOMER` no recibe el Hub laboral.
- [ ] `CUSTOMER` no se redirige automáticamente a PASS desde esta tarea.
- [ ] `SYSTEM` no recibe interfaz humana.
- [ ] `UNRESOLVED` falla cerrado.
- [ ] La página inicial laboral es `task-first`.
- [ ] Contexto esencial precede al foco.
- [ ] El foco precede a accesos secundarios.
- [ ] Existe máximo un foco principal.
- [ ] La acción principal no equivale a claim ni inicio.
- [ ] Las obligaciones secundarias no compiten con el foco.
- [ ] El launcher permanece como acceso secundario.
- [ ] La lista de apps secundarias procede de `SHELL-APP-002/003`.
- [ ] No existe una nueva matriz local rol → apps.
- [ ] Una única app visible no produce auto-redirección.
- [ ] La última app abierta no determina el home.
- [ ] Una preferencia no desplaza el foco.
- [ ] La existencia de foco no fuerza auto-redirección a la propietaria.
- [ ] Un destino explícito válido permanece separado de la entrada por defecto.
- [ ] Sin turno no se redirige a administración como fallback.
- [ ] Sin tareas se conserva un estado vacío legítimo.
- [ ] Trabajo no disponible no se confunde con cero trabajo.
- [ ] Datos parciales permanecen explícitamente parciales.
- [ ] El contexto visible no se recalcula localmente.
- [ ] `Trabajo pendiente` no se reconstruye localmente.
- [ ] Los accesos secundarios no conceden autorización.
- [ ] AURA permanece diferida.
- [ ] PASS permanece adyacente y fuera del grid laboral primario.
- [ ] SHELL no se muestra como tarjeta de sí misma.
- [ ] Un cambio de actor recalcula toda la composición.
- [ ] Un dispositivo compartido no determina actor ni home.
- [ ] Una simulación no sustituye el home real.
- [ ] La carga inicial no se presenta como estado vacío confirmado.
- [ ] La navegación usa lenguaje humano.
- [ ] La jerarquía de inicio es accesible y no depende solo del color.
- [ ] Los conteos y títulos no filtran datos de otros actores.
- [ ] El home no se convierte en dashboard universal.
- [ ] La administración no se usa como relleno ante ausencia de trabajo.
- [ ] SHELL no absorbe lógica funcional de otras aplicaciones.
- [ ] No se fija layout final por dispositivo.
- [ ] No se crea una ruta runtime.
- [ ] No se desarrolla `SHELL-APP-010`.
- [ ] No se desarrollan `SHELL-APP-011` ni `SHELL-APP-012`.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se modifica código.
- [ ] No se modifica Supabase.
- [ ] No se crean migraciones.
- [ ] No se despliega.
- [ ] No se crea ni autoriza una instancia física.

---

#### 42. Límites

Esta tarea no:

- modifica `actor_type`;
- crea tipos de actor;
- modifica roles base;
- modifica roles operativos;
- modifica `AccessContext`;
- modifica `AuthorizationDecision`;
- modifica `SafeContextProjectionV1`;
- modifica el contrato de `work_item`;
- modifica prioridad;
- crea tareas, claims ni ejecución;
- modifica `shell.access`;
- modifica permisos, grants o denies;
- modifica visibilidad aprobada de aplicaciones;
- modifica el catálogo de aplicaciones;
- activa AURA;
- incorpora PASS al grid laboral;
- define el home cliente de PASS;
- define la explicación de bloqueo de aplicaciones;
- absorbe lógica funcional de aplicaciones propietarias;
- define retorno seguro cross-app;
- define conservación cross-app de contexto;
- define conservación técnica de tarea en curso;
- define experiencia final de computador o tablet;
- modifica la ruta `/`;
- crea rutas;
- modifica `/login`;
- modifica `returnTo`;
- modifica middleware;
- modifica Server Actions;
- modifica RPC;
- modifica RLS;
- modifica Auth;
- modifica Supabase;
- modifica datos;
- crea migraciones;
- crea configuración;
- despliega;
- crea o autoriza instancia física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba;
- desarrolla `SHELL-APP-010`.

---

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-008 — Mostrar tareas pendientes transversales`

**TAREA ACTUAL APROBADA**
`SHELL-APP-009 — Definir página inicial por tipo de usuario`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-010 — Explicar por qué una aplicación está bloqueada`


### ✅ SHELL-APP-010 — Explicar por qué una aplicación está bloqueada

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-009 — Definir página inicial por tipo de usuario
**Tarea siguiente:** SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente
**Tipo de tarea:** definición técnico-documental de la explicación de bloqueo de aplicaciones en SHELL; especializa la presentación del estado no navegable usando decisiones y razones públicas canónicas sin crear un catálogo local de errores, sin elevar razones contextuales internas a autoridad pública y conservando `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** política documental de explicación de aplicaciones bloqueadas definida sobre visibilidad vigente, `SafeDecisionProjectionV1`, `AuthorizationReasonCode` y el catálogo compartido de mensajes, sin modificar el runtime del Hub ni crear una instancia física
**Cambios físicos autorizados:** ninguno; no se modifican código, rutas, launcher, contratos, catálogos, mensajes, permisos, Supabase, datos, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo SHELL debe explicar que una aplicación visible o contextualmente relevante no puede abrirse, de forma humana, específica, segura, accionable, consistente con la autorización canónica y diferenciada de una indisponibilidad técnica, una aplicación oculta, una aplicación diferida o una superficie adyacente.

La persona debe poder comprender, cuando corresponda:

```text
QUÉ APLICACIÓN NO PUEDE ABRIR
+
POR QUÉ NO PUEDE ABRIRLA
+
SI ES UNA DENEGACIÓN, UN BLOQUEO RECUPERABLE O UN FALLO TÉCNICO
+
QUÉ PUEDE HACER AHORA
+
QUÉ NO CAMBIÓ
+
QUÉ REFERENCIA SEGURA PUEDE USAR PARA SOPORTE
```

La explicación nunca se convierte en fuente de autorización.

---

#### 2. Handoff recibido de `SHELL-APP-009`

Se reciben sin reapertura:

1. `EMPLOYEE` como único tipo de actor que puede recibir el home laboral interactivo de SHELL;
2. `CUSTOMER` fuera del home laboral;
3. `SYSTEM` sin interfaz humana;
4. `UNRESOLVED` con fallo cerrado;
5. página laboral `task-first`;
6. orden conceptual `Contexto → Foco → Acción → Estado → Obligaciones → Accesos secundarios`;
7. aplicaciones como accesos secundarios;
8. visibilidad de aplicaciones proveniente exclusivamente de `SHELL-APP-002` y `SHELL-APP-003`;
9. ausencia de redirección por rol, última aplicación o aplicación única;
10. prohibición de usar administración como relleno;
11. composición sin adquirir autoridad sobre contexto, trabajo o aplicaciones;
12. explicación detallada del bloqueo reservada expresamente a esta tarea.

Esta tarea no vuelve a decidir qué aplicación es visible.

Decide qué ocurre cuando una aplicación que sí pertenece a la presentación vigente queda no navegable y existe una causa que puede explicarse de forma segura.

---

#### 3. Problema AS-IS que se debe superar

El runtime actual de SHELL reduce la evaluación local de cada aplicación a dos estados:

```text
enabled
disabled
```

y presenta:

```text
enabled
→ Disponible
→ Abrir

disabled
→ Sin acceso
→ Bloqueada
```

Además, el comportamiento actual convierte en `disabled` el fallo de la segunda firma de compatibilidad de `has_permission`.

Por tanto, la superficie AS-IS no distingue suficientemente entre:

```text
DENEGACIÓN CANÓNICA
FALTA DE CONTEXTO RECUPERABLE
APLICACIÓN SIN RELEVANCIA PARA EL ACTOR
CONFIGURACIÓN INCONSISTENTE
PERMISO NO REGISTRADO
EVALUACIÓN DE AUTORIZACIÓN NO DISPONIBLE
```

La tarea define la política TO-BE.

No modifica el código.

---

#### 4. Principio rector

La explicación de bloqueo se construye así:

```text
APLICACIÓN PRESENTABLE
+
ESTADO DE VISIBILIDAD YA RESUELTO
+
DECISIÓN SEGURA DE app.access
+
CÓDIGO PÚBLICO CANÓNICO
+
PERFIL DE MENSAJE COMPARTIDO
→
EXPLICACIÓN HUMANA NO NAVEGABLE
```

Nunca:

```text
BOOLEANO false
→ "Sin acceso"
```

ni:

```text
ERROR RPC
→ "No tienes permiso"
```

ni:

```text
LaneReasonCode
→ MAPEO LOCAL A AuthorizationReasonCode
```

ni:

```text
NOMBRE DEL ROL
→ CAUSA DE BLOQUEO
```

---

#### 5. La visibilidad se resuelve antes que la explicación

`SHELL-APP-010` no cambia la política aprobada de presentación.

Se conserva:

```text
HIDDEN_BASE
→ no se muestra por el solo rol base

CONTEXT_HIDDEN
→ no se muestra sin relevancia contextual actual

CONTEXT_VISIBLE
→ visible y navegable cuando la autorización de entrada es válida

CONTEXT_BLOCKED
→ puede mostrarse bloqueada
→ no navegable
→ requiere razón pública gobernada cuando corresponda
```

Una aplicación oculta no se convierte en visible únicamente para explicar que está oculta.

---

#### 6. Una aplicación bloqueada no es una aplicación oculta

Queda prohibido:

```text
NO ELEGIBLE
→ MOSTRAR TARJETA BLOQUEADA
```

como fallback universal.

La política es:

```text
SIN RELEVANCIA
→ OCULTA

RELEVANTE + BLOQUEO
→ BLOQUEADA Y EXPLICABLE

AUTORIZADA
→ VISIBLE Y NAVEGABLE
```

Esto preserva la reducción de opciones irrelevantes y evita enumerar capacidades que el actor no necesita conocer.

---

#### 7. `CONTEXT_BLOCKED`

`CONTEXT_BLOCKED` es el estado de presentación vigente para una aplicación contextual que posee relevancia actual para el actor, no obtiene autorización de entrada por el carril aplicable, conserva información pública suficiente para ser presentada y no debe habilitar navegación.

La tarjeta bloqueada no sustituye la razón pública ni el guard de la aplicación destino.

---

#### 8. `CONTEXT_HIDDEN`

`CONTEXT_HIDDEN` permanece oculto.

Ejemplos heredados incluyen ausencia de elegibilidad contextual actual, rol operativo sin grant ni override de entrada y contexto sin condiciones que justifiquen presentar la aplicación.

No se muestra una explicación del motivo de ocultamiento.

---

#### 9. Aplicaciones base

Para aplicaciones de entrada base, la falta de `ALLOW` base no crea automáticamente una tarjeta bloqueada.

Se conserva:

```text
VISIBLE_BASE
→ requiere BASE ALLOW efectivo

HIDDEN_BASE
→ no existe ALLOW base
```

Si una aplicación base ya forma parte de una superficie legítimamente presentable por otra decisión aprobada y su evaluación actual no puede confirmarse, la presentación deberá seguir la política de indisponibilidad segura de esta tarea sin reutilizar un `ALLOW` obsoleto.

---

#### 10. AURA no usa un bloqueo de autorización local

AURA permanece:

```text
DEFERRED_RESERVED
```

Resultado:

```text
AURA
→ no es capacidad navegable
→ no se convierte en AUTH_APP_ACCESS_DENIED
→ no recibe una explicación local de autorización por estar diferida
```

Su estado diferido pertenece al ciclo de vida de la aplicación.

Esta tarea no activa AURA ni inventa un reason code para su diferimiento.

---

#### 11. PASS no se presenta como aplicación laboral bloqueada

PASS permanece:

```text
ADJACENT_RESERVED
```

La ausencia de PASS en el grid laboral no se explica como `No tienes acceso` ni como una denegación laboral.

La frontera laboral versus cliente permanece reservada a `SHELL-APP-011` y `SHELL-APP-012`.

---

#### 12. `NO_INTERACTIVE_HUB`

`CUSTOMER`, `SYSTEM` y `UNRESOLVED` no reciben una cuadrícula laboral de aplicaciones bloqueadas.

No existe fallback:

```text
NO_INTERACTIVE_HUB
→ MOSTRAR TODAS LAS APPS BLOQUEADAS
```

La explicación de una tarjeta bloqueada aplica únicamente dentro de una experiencia de SHELL que ya puede presentarse al actor correspondiente.

---

#### 13. Fuente pública de la explicación

La explicación de una denegación visible deberá consumir una `SafeDecisionProjectionV1` válida.

Su forma aprobada contiene:

```text
projection_version
correlation_id
app_code
permission_key
outcome
safe_message_code
reason_codes
visible_fields
mutable_fields
```

Para una denegación:

```text
outcome = DENY
safe_message_code = AuthorizationReasonCode válido
reason_codes ⊆ AuthorizationReasonCode
```

SHELL no transforma una decisión completa en un booleano y luego intenta reconstruir la causa.

---

#### 14. `safe_message_code` es la razón principal pública

Cuando la decisión segura es `DENY`:

```text
safe_message_code
→ razón pública principal para presentación
```

`reason_codes` conserva las razones públicas adicionales aprobadas, pero SHELL no las vuelca como una lista técnica ni elige otra razón por orden local.

La composición visible debe seguir el contrato compartido de mensajes.

---

#### 15. `ALLOW` no posee explicación de bloqueo

Para una proyección segura con:

```text
outcome = ALLOW
```

se conserva:

```text
safe_message_code = null
reason_codes = []
```

SHELL no inventa una advertencia de bloqueo sobre una decisión `ALLOW`.

La navegación continúa sujeta a las demás condiciones de disponibilidad empresarial y al guard de destino.

---

#### 16. Universo cerrado de razones públicas

La explicación de autorización utiliza exactamente los veinte `AuthorizationReasonCode` vigentes:

```text
AUTH_NO_SESSION
AUTH_USER_INACTIVE
AUTH_APP_ACCESS_DENIED
AUTH_ADMIN_PERMISSION_DENIED
AUTH_OPERATIONAL_PERMISSION_DENIED
AUTH_SITE_ASSIGNMENT_REQUIRED
AUTH_ACTIVE_SITE_REQUIRED
AUTH_AREA_ASSIGNMENT_REQUIRED
AUTH_ACTIVE_AREA_REQUIRED
AUTH_PUBLISHED_SHIFT_REQUIRED
AUTH_OUTSIDE_SHIFT_WINDOW
AUTH_CHECKIN_REQUIRED
AUTH_OPERATIONAL_ROLE_REQUIRED
AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE
AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA
AUTH_SHARED_DEVICE_NOT_AUTHORIZED
AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION
AUTH_ADMINISTRATIVE_CONFIGURATION_INCONSISTENT
AUTH_PERMISSION_NOT_REGISTERED
AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE
```

No se crea un código `SHELL_APP_BLOCKED`.

No se crea un namespace local de SHELL.

---

#### 17. Los namespaces permanecen separados

Se conservan como universos distintos:

```text
AuthorizationReasonCode
StructuralIssueCode
LaneAvailabilityReasonCode
LaneReasonCode
```

SHELL no hace mapeos por nombre parecido entre esos namespaces, no convierte `blocked_reasons` legacy en motivo público y falla cerrado ante un valor desconocido o incompatible.

---

#### 18. La proyección contextual no expone la causa pública de autorización

`SafeContextProjectionV1` no expone como superficie cliente:

- `LaneReasonCode`;
- `StructuralIssueCode`;
- `LaneAvailabilityReasonCode`;
- severidad estructural;
- `safe_message` estructural;
- `structural_issues`;
- `subject_id`;
- fuente resolutora;
- evidencia interna.

Por tanto:

```text
SafeContextProjectionV1
≠ fuente del mensaje de denegación de app.access
```

La causa pública de una denegación procede de `SafeDecisionProjectionV1`.

---

#### 19. Readiness no equivale a autorización

Se conserva:

```text
READY
≠ ALLOW

INVALID
≠ DENY configurado

UNAVAILABLE
≠ INVALID
```

La UI no interpreta readiness como permiso o denegación.

---

#### 20. Ausencia normal de contexto no fabrica una denegación

Una ausencia contextual normal puede explicar que una aplicación no esté disponible únicamente cuando la evaluación canónica del permiso de entrada produce la razón pública correspondiente.

SHELL no fabrica reason codes a partir de ausencia local de turno, check-in, sede, área, rol operativo, dispositivo o campos vacíos del frontend.

---

#### 21. Check-in y permiso de entrada

La política de `SHELL-APP-003` permanece vigente:

```text
nexo.access
fogo.access
origo.access
pulso.access
```

usan un prerrequisito de entrada operacional `T`, no `T+C`.

Por tanto, un turno vigente sin check-in no permite a SHELL inventar `AUTH_CHECKIN_REQUIRED` como motivo de bloqueo de la aplicación.

`AUTH_CHECKIN_REQUIRED` solo se presenta cuando la evaluación autoritativa del permiso exacto devuelve esa razón.

Las capacidades internas `T+C` continúan siendo responsabilidad de la aplicación propietaria.

---

#### 22. Rol operativo

SHELL no explica un bloqueo mediante el nombre visible del rol.

Las razones públicas aplicables son únicamente las devueltas por la decisión canónica, por ejemplo:

```text
AUTH_OPERATIONAL_ROLE_REQUIRED
AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE
AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA
```

cuando correspondan.

No se construyen reglas locales como `aplicación bloqueada porque eres <rol>`.

---

#### 23. Sede y área

La presentación podrá explicar las razones públicas canónicas:

```text
AUTH_SITE_ASSIGNMENT_REQUIRED
AUTH_ACTIVE_SITE_REQUIRED
AUTH_AREA_ASSIGNMENT_REQUIRED
AUTH_ACTIVE_AREA_REQUIRED
```

solo cuando sean la salida de la evaluación segura aplicable.

SHELL no convierte valores nulos de sede o área en una denegación por sí misma.

---

#### 24. Turno

Las razones públicas de turno permanecen separadas:

```text
AUTH_PUBLISHED_SHIFT_REQUIRED
AUTH_OUTSIDE_SHIFT_WINDOW
```

SHELL no colapsa ambas en `Sin turno`.

La ausencia de turno publicado y estar fuera de la ventana de un turno publicado son hechos distintos y conservan recuperación distinta.

---

#### 25. Aplicación sin acceso

Cuando la decisión de entrada a la aplicación produce:

```text
AUTH_APP_ACCESS_DENIED
```

la explicación compartida es la fuente de presentación.

SHELL no reemplaza esa razón con nombre de rol, permiso crudo, nombre de tabla, resultado de RPC, sugerencia para pedir privilegios o una lista de personas que sí tienen acceso.

La tarjeta permanece no navegable.

---

#### 26. Permiso administrativo u operativo

Las razones:

```text
AUTH_ADMIN_PERMISSION_DENIED
AUTH_OPERATIONAL_PERMISSION_DENIED
```

permanecen distintas.

SHELL no las utiliza para inferir que todo el acceso a una aplicación está bloqueado cuando proceden de una capacidad interna distinta de `app.access`.

```text
DENY DE UNA ACCIÓN INTERNA
≠
DENY AUTOMÁTICO DE app.access
```

La explicación de la tarjeta debe corresponder al permiso exacto de entrada.

---

#### 27. Dispositivo compartido

`AUTH_SHARED_DEVICE_NOT_AUTHORIZED` dispone de perfiles de presentación gobernados para sesión personal requerida, dispositivo no disponible, revisión de configuración y aplicación no disponible en el dispositivo.

SHELL no selecciona el perfil por heurística local.

Consume el perfil determinado por el contrato compartido.

---

#### 28. Simulación

`AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION` no se eleva automáticamente a bloqueo de toda la aplicación.

Solo se presenta como explicación de entrada cuando la decisión exacta evaluada para esa entrada lo devuelve.

Una acción interna prohibida en simulación permanece responsabilidad de la superficie propietaria.

---

#### 29. Configuración inconsistente

Cuando el backend concluye:

```text
AUTH_ADMINISTRATIVE_CONFIGURATION_INCONSISTENT
```

SHELL no presenta `No tienes permiso`.

La explicación comunica que la configuración necesaria no pudo validarse de forma coherente y que se requiere revisión autorizada.

La sesión no se invalida por este hecho.

---

#### 30. Permiso no registrado

Cuando la razón pública es:

```text
AUTH_PERMISSION_NOT_REGISTERED
```

la UI utiliza el mensaje compartido de función no disponible y la referencia segura de soporte.

No expone el `PermissionKey` interno como instrucción ordinaria al trabajador.

No crea la clave faltante ni intenta un alias.

---

#### 31. Evaluación de autorización no disponible

Cuando la autorización no pudo evaluarse de forma confiable, la razón pública segura es:

```text
AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE
```

La UI no presenta `No tienes acceso` porque:

```text
NO SE PUDO VERIFICAR
≠
SE VERIFICÓ UNA DENEGACIÓN
```

La navegación queda bloqueada hasta obtener una evaluación válida.

---

#### 32. Fallo técnico no es denegación

La frontera runtime distingue:

```text
DENIED
CONTRACT_INVALID
BACKEND_UNAVAILABLE
BACKEND_RESPONSE_INVALID
```

Solo `DENIED` procede de una decisión canónica válida con `DENY`.

Los fallos técnicos o contractuales bloquean navegación, pero no se representan como falta personal de permiso.

El adaptador seguro reduce hacia presentación el fallo técnico mediante la razón pública aprobada correspondiente.

El cliente no hace ese mapping.

---

#### 33. Prohibición del fallback `false → disabled`

El comportamiento futuro no podrá conservar como semántica final:

```text
RPC ERROR
→ false
→ disabled
→ Sin acceso
```

La compatibilidad física legacy puede existir durante transición en su owner correspondiente, pero la experiencia final preserva:

```text
DENIED
≠
EVALUATION_UNAVAILABLE
```

---

#### 34. Mensajes compartidos, no copy local

SHELL consume:

```text
vento.authorization.messages@1.0.0
```

y sus perfiles aprobados.

No mantiene un objeto local `reasonCodeToMessage` ni copia manualmente títulos, descripciones y CTAs.

La futura materialización debe consumir la fuente compartida.

---

#### 35. Regla para perfiles con campos opcionales

Algunos perfiles aprobados poseen título o acción principal deliberadamente ausentes.

Cuando el perfil indique `null`, SHELL no inventa un título o CTA específico para completar visualmente la tarjeta.

La superficie mantiene su estado estructural de no navegación y utiliza únicamente los elementos aprobados.

---

#### 36. Perfil público de `AUTH_APP_ACCESS_DENIED`

El perfil canónico correspondiente comunica:

```text
Título:
No tienes acceso a esta aplicación

Mensaje:
Tu sesión está activa, pero esta aplicación no está habilitada para tu cuenta.

Acción principal:
Volver a Vento OS

Acción secundaria:
Cerrar sesión
```

SHELL reutiliza este perfil.

No lo reescribe por aplicación.

---

#### 37. Perfil público de evaluación no disponible

El perfil canónico correspondiente comunica:

```text
Título:
No pudimos verificar el acceso

Mensaje:
Ocurrió un problema técnico al verificar tu acceso. No se realizó ningún cambio.
Intenta nuevamente en unos minutos o informa el código de soporte.
```

`Intentar de nuevo` solo puede mostrarse cuando la política aprobada indique que el resultado es retryable.

SHELL no habilita reintento ciego.

---

#### 38. Anatomía de la explicación en SHELL

Cuando la aplicación se presenta bloqueada o temporalmente no verificable, la superficie debe poder mostrar, según el perfil aprobado:

1. identidad humana de la aplicación;
2. estado no navegable;
3. título humano cuando exista;
4. mensaje seguro;
5. acción principal cuando exista y sea válida;
6. acción secundaria o ayuda cuando exista;
7. confirmación de estado preservado cuando el contrato la incluya;
8. referencia segura de correlación o soporte cuando corresponda.

No todas las razones requieren los ocho elementos.

---

#### 39. Badge no sustituye explicación

Etiquetas como `Bloqueada`, `Sin acceso` o `No disponible` no bastan por sí mismas.

Un estado no navegable debe permitir comprender la causa segura cuando la política ordene que la aplicación permanezca visible.

La interfaz no obliga a adivinar por qué el control está deshabilitado.

---

#### 40. Acción primaria segura

La acción ofrecida procede del perfil compartido y debe ser ejecutable para el actor.

SHELL no ofrece como recuperación universal pedir permisos, cambiarse de rol, usar la cuenta de otra persona, elegir cualquier sede, falsificar check-in, entrar mediante URL directa, usar otro dispositivo sin saber que está permitido, reintentar una mutación no idempotente o ignorar el bloqueo.

---

#### 41. No revelar autoridad de terceros

Una explicación no muestra:

- qué roles tienen el permiso;
- qué empleados sí pueden entrar;
- qué grant falta internamente;
- qué deny ganó;
- matched grants;
- matched denies;
- datasets de autorización;
- criterios antifraude;
- reglas de seguridad sensibles;
- recursos secretos.

El actor recibe únicamente la información necesaria para comprender su situación y actuar de forma segura.

---

#### 42. No exponer detalles técnicos

La tarjeta o detalle ordinario no muestra:

- SQLSTATE;
- stack trace;
- mensaje crudo de Supabase;
- nombre de RPC;
- tabla;
- policy RLS;
- JWT;
- cookie;
- token;
- context fingerprint;
- catalog hash;
- `StructuralIssue.source`;
- `subject_id`;
- payload de evidencia interna.

La referencia de soporte debe ser segura.

---

#### 43. `correlation_id`

`correlation_id` puede presentarse como referencia de soporte cuando la política de la superficie lo permita.

No es token, permiso, capability, `decision_id`, recurso ni autorización reutilizable.

Copiar una referencia de correlación nunca permite ejecutar la acción bloqueada.

---

#### 44. Navegación sigue deshabilitada

Toda aplicación presentada como bloqueada conserva:

```text
NAVIGABLE = NO
```

Manipular HTML, `href`, estado local, JavaScript, DOM, query string o navegación directa no autoriza la aplicación destino.

La aplicación propietaria revalida la entrada y toda acción interna.

---

#### 45. Cambio de razón y frescura

Si cambia el contexto, el actor, el dispositivo, el turno o la configuración, SHELL no modifica localmente la razón anterior.

Debe obtener una nueva proyección segura.

Una explicación obsoleta no conserva autoridad ni CTA de navegación.

La estrategia física de caché permanece en sus tareas propietarias.

---

#### 46. Cambio de actor en dispositivo compartido

Al cambiar actor:

1. se descarta la explicación personal del actor anterior;
2. se recalcula la visibilidad de aplicaciones;
3. se recalcula la decisión de entrada;
4. se recalcula el perfil de presentación;
5. no se hereda reason code;
6. no se hereda acción de recuperación;
7. no se hereda referencia privada.

La estación no es el actor humano.

---

#### 47. Estado preservado

Cuando el perfil indica expresamente que no se realizó ningún cambio, SHELL puede comunicarlo.

SHELL no inventa una afirmación de persistencia si la fuente no la provee.

```text
NO RECIBIR RESPUESTA
≠
NO SE REALIZÓ NINGÚN EFECTO
```

Una incertidumbre técnica no se convierte en confirmación de no ejecución sin evidencia.

---

#### 48. Una explicación no modifica permisos

Acciones como `Solicitar revisión`, `Registrar entrada`, `Ver mi horario`, `Iniciar sesión` o `Volver` son recuperación o navegación.

No modifican por sí mismas grants, denies, rol base, rol operativo, sede, área, turno, check-in, dispositivo, aplicación o permiso.

La modificación correspondiente, si existe, conserva su owner.

---

#### 49. Relación con la página inicial

En el home `task-first` aprobado por `SHELL-APP-009`, una aplicación bloqueada aparece únicamente dentro de los accesos secundarios cuando la política de visibilidad ya determinó que debe presentarse.

La explicación no desplaza contexto esencial, foco actual, acción principal del trabajo, estado del trabajo ni obligaciones pendientes.

Un bloqueo de aplicación secundaria no se convierte automáticamente en el foco principal.

---

#### 50. Relación con `Trabajo pendiente`

Una tarea puede referenciar una aplicación propietaria que temporalmente no puede abrirse.

En ese caso:

- el `work_item` conserva su propio estado;
- SHELL no completa, cancela ni reasigna la tarea;
- la aplicación conserva ownership;
- la imposibilidad de abrir el destino puede producir una explicación segura;
- la tarea no se marca iniciada por el intento;
- la recuperación sigue el contrato del work item y de la autorización.

La explicación de la app no sustituye el motivo de bloqueo propio de la tarea.

---

#### 51. Aplicación no disponible versus acceso denegado

Se conserva:

```text
APLICACIÓN NO DISPONIBLE POR CICLO DE VIDA
≠
AUTH_APP_ACCESS_DENIED

EVALUACIÓN TÉCNICA NO DISPONIBLE
≠
AUTH_APP_ACCESS_DENIED

APLICACIÓN OCULTA POR IRRELEVANCIA
≠
APLICACIÓN BLOQUEADA
```

La etiqueta visual final podrá variar por categoría, pero no podrá colapsar estas semánticas.

---

#### 52. Aplicación conocida no implica derecho a explicación sensible

Conocer el nombre o URL de una aplicación no concede derecho a obtener qué roles la usan, qué módulos tiene, qué permisos faltan, qué recursos contiene o qué configuración sensible produjo una restricción.

La explicación minimiza información según el actor y el contrato público.

---

#### 53. Accesibilidad y responsive

La condición bloqueada debe ser perceptible sin depender únicamente de gris, opacidad, icono de candado, posición, hover o animación.

El estado y su explicación deben estar disponibles semánticamente para teclado y tecnologías de asistencia.

Computador, tablet y otras superficies permitidas pueden variar la composición visual, pero no cambiar reason code, decisión, mensaje gobernado, acción permitida, navegabilidad o datos expuestos.

---

#### 54. Casos obligatorios de diseño y prueba posterior

La futura materialización deberá cubrir al menos:

1. app visible y `ALLOW`;
2. app contextual con `CONTEXT_BLOCKED`;
3. app con `CONTEXT_HIDDEN`;
4. app base sin elegibilidad;
5. ausencia de turno publicado;
6. fuera de ventana de turno;
7. ausencia de área aplicable;
8. rol operativo ausente;
9. rol incompatible con sede;
10. rol incompatible con área;
11. dispositivo compartido no autorizado;
12. permiso no registrado;
13. configuración inconsistente;
14. evaluación backend no disponible;
15. respuesta backend inválida;
16. reason code desconocido;
17. `SafeDecisionProjectionV1` con versión incompatible;
18. múltiples reason codes públicos con un `safe_message_code`;
19. cambio de actor;
20. cambio de contexto;
21. proyección stale;
22. AURA diferida;
23. PASS adyacente;
24. manipulación del HTML para habilitar navegación;
25. deep link directo hacia la aplicación destino.

Los casos no crean implementación en esta tarea.

---

#### 55. Antipatrones prohibidos

```text
false = "Sin acceso"
error = "No tienes permiso"
rol = motivo del bloqueo
LaneReasonCode = reason público
StructuralIssue.safe_message = copy del cliente
app oculta = tarjeta bloqueada
AURA diferida = acceso denegado
PASS adyacente = acceso denegado
check-in ausente = bloquear app.access T
botón deshabilitado = explicación suficiente
mensaje visible = lógica de autorización
cambiar href = habilitar aplicación
```

---

#### 56. Decisión documental consolidada

```text
VISIBILIDAD
→ SHELL-APP-002 / SHELL-APP-003

HOME
→ SHELL-APP-009

APP PRESENTABLE + ALLOW
→ VISIBLE
→ NAVEGABLE

APP RELEVANTE + DENY PÚBLICO VÁLIDO
→ NO NAVEGABLE
→ EXPLICACIÓN DESDE SafeDecisionProjectionV1
→ MENSAJE DESDE CATÁLOGO COMPARTIDO

CONTEXT_BLOCKED
→ PUEDE PRESENTARSE
→ NO NAVEGABLE
→ RAZÓN PÚBLICA GOBERNADA CUANDO CORRESPONDA

CONTEXT_HIDDEN / HIDDEN_BASE
→ NO SE PRESENTA SOLO PARA EXPLICAR FALTA DE ACCESO

EVALUATION_UNAVAILABLE
→ NO NAVEGABLE
→ NO SE PRESENTA COMO DENEGACIÓN PERSONAL

AURA
→ DEFERRED_RESERVED
→ NO AUTH DENY LOCAL

PASS
→ ADJACENT_RESERVED
→ NO AUTH DENY LABORAL

SafeContextProjectionV1
→ NO EXPONE RAZONES INTERNAS PARA COPY PÚBLICO

SafeDecisionProjectionV1
→ FUENTE PÚBLICA DE DENEGACIÓN

20 AuthorizationReasonCode
→ UNIVERSO CERRADO

COPY
→ vento.authorization.messages@1.0.0

DESTINO
→ REVALIDA AUTORIZACIÓN
```

---

#### 57. Handoff a `SHELL-APP-011`

`SHELL-APP-011` recibe:

1. política de bloqueo que solo aplica a aplicaciones pertenecientes a la presentación vigente;
2. `CONTEXT_HIDDEN` y `HIDDEN_BASE` separados de `CONTEXT_BLOCKED`;
3. AURA diferida fuera de una denegación de autorización;
4. PASS adyacente fuera de una denegación laboral;
5. `SafeDecisionProjectionV1` como fuente pública de razón de autorización;
6. veinte `AuthorizationReasonCode` cerrados;
7. mensajes gobernados por `vento.authorization.messages@1.0.0`;
8. indisponibilidad técnica separada de denegación;
9. ausencia de copy local y de mapping desde razones contextuales internas;
10. navegación bloqueada y revalidación obligatoria en destino;
11. frontera laboral versus superficies adyacentes todavía no desarrollada.

La siguiente tarea podrá separar superficies adyacentes sin reinterpretar PASS como aplicación laboral bloqueada.

---

#### 58. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea especializa en SHELL reglas ya protegidas por autorización, contexto, mensajes, proyecciones seguras, experiencia humana y navegación no autorizable desde UI.

No modifica el Registro Canónico de Requisitos de Prueba.

---

#### 59. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-UX-002` — error, bloqueo o fallo parcial explicado en lenguaje humano con causa, estado preservado y recuperación;
- `TREQ-UX-003` — información y acciones adecuadas al actor y autorización, con minimización;
- `TREQ-UX-008` — clasificación por acción, efecto y superficie, no por nombre de aplicación o rol;
- `TREQ-UX-009` — contexto operativo real sin autoridad fabricada desde cliente;
- `TREQ-UX-037` — estados de contexto, bloqueo y permiso diferenciados sin inventar trabajo ni bypass;
- `TREQ-SHELL-016` — aplicación sin acceso efectivo no navegable y resistente a bypass de interfaz;
- `TREQ-SHELL-030` — visibilidad derivada de permisos/contexto sin sustituir autorización de servidor;
- `TREQ-SHELL-044` — namespaces cerrados y separados para razones públicas, problemas estructurales y disponibilidad;
- `TREQ-SHELL-063` — frontera server/client y consumo cliente limitado a proyecciones seguras;
- `TREQ-SHELL-071` — `SafeDecisionProjectionV1` limitada a razones públicas y datos permitidos;
- `TREQ-SHELL-073` — separación cerrada entre denegación, contrato inválido, backend no disponible y respuesta backend inválida.

Estas referencias constituyen trazabilidad heredada.

No actualizan 04A.

---

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto aún no ha sido insertado ni sometido a la batería documental del checkout local de `SHELL-APP-010`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía el formateador, calidad, delivery check, validadores de dominio ni batería global sobre la rama local de `SHELL-APP-010`. |
| REMOTA | PASS | Se verificaron `main` posterior al cierre de `SHELL-APP-009`, continuidad H2, archivo propietario y marcador vigente, topología `PER_IMPLEMENTATION_UNIT`, protocolo, contrato de entrega, políticas de formato/desarrollo, `package.json`, `SHELL-APP-001..003`, `SHELL-APP-009`, `AUTH-ERR-001..020`, `UX-BASE-006`, contratos y razones públicas materializados, `SafeDecisionProjectionV1`, 04A SHELL, 04A UX y el runtime AS-IS de `src/app/page.tsx`. |
| OPERATIVA | NOT_APPLICABLE | La tarea define política documental de explicación; no valida usuarios reales, permisos reales, dominios, mensajes desplegados ni navegación productiva. |
| FÍSICA | NOT_APPLICABLE | Esta aprobación documental no crea ni autoriza una instancia física de `SHELL-APP-010` y no modifica código, datos, infraestructura ni despliegues. |

---

#### 61. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-010 — Explicar por qué una aplicación está bloqueada`.
- [ ] `SHELL-APP-009` permanece como tarea anterior.
- [ ] `SHELL-APP-011` permanece como siguiente tarea.
- [ ] La tarea permanece exclusivamente documental.
- [ ] La topología futura permanece `PER_IMPLEMENTATION_UNIT` sin crear instancia física.
- [ ] Se conserva la visibilidad definida por `SHELL-APP-002` y `SHELL-APP-003`.
- [ ] `HIDDEN_BASE` no se convierte automáticamente en tarjeta bloqueada.
- [ ] `CONTEXT_HIDDEN` no se convierte automáticamente en tarjeta bloqueada.
- [ ] `CONTEXT_BLOCKED` permanece no navegable.
- [ ] Una aplicación sin relevancia contextual no se presenta para explicar un bloqueo.
- [ ] AURA permanece `DEFERRED_RESERVED`.
- [ ] AURA no produce una denegación local por estar diferida.
- [ ] PASS permanece `ADJACENT_RESERVED`.
- [ ] PASS no se presenta como aplicación laboral bloqueada.
- [ ] Los actores `NO_INTERACTIVE_HUB` no reciben una cuadrícula de apps bloqueadas.
- [ ] La razón pública de denegación procede de `SafeDecisionProjectionV1`.
- [ ] Se conservan exactamente nueve campos raíz de `SafeDecisionProjectionV1`.
- [ ] `DENY` exige un `safe_message_code` público válido.
- [ ] `ALLOW` conserva `safe_message_code = null`.
- [ ] `ALLOW` conserva `reason_codes = []`.
- [ ] Se conservan exactamente veinte `AuthorizationReasonCode`.
- [ ] No se crea `SHELL_APP_BLOCKED`.
- [ ] No se crea un namespace local de reasons.
- [ ] Los namespaces de razones permanecen separados.
- [ ] No se mapean razones contextuales a razones públicas por coincidencia nominal.
- [ ] `SafeContextProjectionV1` no se usa como fuente de copy de denegación.
- [ ] `READY` no se interpreta como `ALLOW`.
- [ ] `UNAVAILABLE` no se interpreta como `DENY`.
- [ ] `INVALID` no se interpreta como denegación empresarial.
- [ ] Ausencias locales de turno, sede, área, check-in o rol no fabrican reason codes.
- [ ] Un check-in ausente no bloquea por inferencia los permisos de entrada `T`.
- [ ] `AUTH_PUBLISHED_SHIFT_REQUIRED` y `AUTH_OUTSIDE_SHIFT_WINDOW` permanecen distintos.
- [ ] `AUTH_APP_ACCESS_DENIED` no expone grants, denies ni roles de terceros.
- [ ] Un deny de capacidad interna no se eleva a deny de `app.access`.
- [ ] Los perfiles de dispositivo compartido se consumen desde el contrato.
- [ ] La simulación no bloquea toda la app por inferencia.
- [ ] Configuración inconsistente no se presenta como falta de permiso.
- [ ] Permiso no registrado no se resuelve mediante alias local.
- [ ] Evaluación no disponible no se presenta como acceso denegado.
- [ ] `DENIED` permanece separado de fallos contractuales y técnicos.
- [ ] No se conserva `false → disabled → Sin acceso` como semántica final.
- [ ] Los mensajes proceden del catálogo compartido.
- [ ] SHELL no mantiene un mapa local reason → copy.
- [ ] Los elementos `null` de un perfil no reciben copy inventado.
- [ ] Un badge de bloqueo no sustituye la explicación.
- [ ] La acción primaria procede de la política aprobada.
- [ ] No se recomienda pedir privilegios como bypass.
- [ ] No se exponen permisos de terceros ni detalles técnicos sensibles.
- [ ] `correlation_id` no se trata como capability.
- [ ] Una app bloqueada permanece no navegable.
- [ ] Manipular `href` o DOM no autoriza el destino.
- [ ] El destino revalida autorización.
- [ ] Un cambio de actor o contexto obliga a recalcular explicación.
- [ ] Una proyección stale no conserva navegación.
- [ ] SHELL no inventa el estado preservado.
- [ ] La explicación no modifica permisos, roles ni contexto.
- [ ] Un bloqueo de app secundaria no desplaza automáticamente el foco del trabajador.
- [ ] El work item no se marca iniciado por intentar abrir una app bloqueada.
- [ ] Ciclo de vida no disponible permanece separado de acceso denegado.
- [ ] La explicación no enumera capacidades ocultas.
- [ ] El bloqueo es accesible sin depender solo de color u opacidad.
- [ ] La semántica permanece igual entre dispositivos.
- [ ] No se desarrolla la frontera laboral/cliente reservada a `SHELL-APP-011`.
- [ ] No se desarrolla el RBAC cliente reservado a `SHELL-APP-012`.
- [ ] No se modifican mensajes canónicos.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se modifica código.
- [ ] No se modifica Supabase.
- [ ] No se crean migraciones.
- [ ] No se despliega.
- [ ] No se crea ni autoriza una instancia física.

---

#### 62. Límites

Esta tarea no redefine visibilidad, catálogo de aplicaciones, catálogos de razones, contratos de contexto/decisión, mensajes compartidos, permisos, grants, denies, roles, turnos, check-ins, sedes, áreas, dispositivos, simulación ni lógica funcional propietaria.

Tampoco implementa UI, modifica `src/app/page.tsx`, RPC, RLS, Auth, Supabase, datos, migraciones, configuración o despliegues.

No crea ni autoriza una instancia física, no crea ni modifica requisitos de prueba, no modifica el Registro Canónico de Requisitos de Prueba y no desarrolla `SHELL-APP-011`.

---

#### 63. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-009 — Definir página inicial por tipo de usuario`

**TAREA ACTUAL APROBADA**
`SHELL-APP-010 — Explicar por qué una aplicación está bloqueada`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente`


### ✅ SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-010 — Explicar por qué una aplicación está bloqueada
**Tarea siguiente:** SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente
**Tipo de tarea:** definición técnico-documental de la frontera de presentación entre el Hub laboral de SHELL y las superficies adyacentes; conserva el catálogo, actor efectivo, visibilidad y autorización existentes, fija PASS como superficie cliente adyacente fuera del grid laboral primario y mantiene `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** frontera documental laboral/adyacente definida para las diez aplicaciones canónicas, con siete identidades de aplicación laboral primaria o contextual, una identidad `HUB_SELF`, una aplicación laboral diferida y una aplicación cliente adyacente, sin cambios de runtime ni creación de instancia física
**Cambios físicos autorizados:** ninguno; no se modifican código, rutas, launcher, login, autenticación, contratos, catálogo de aplicaciones, permisos, RBAC, Supabase, datos, configuración, dominios ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Separar de forma explícita la experiencia laboral de SHELL de cualquier superficie adyacente que pertenezca a otro dominio de identidad, sin convertir Vento OS en portal universal para clientes, login normal de Vento Pass, launcher de productos cliente, puente de identidad cliente hacia RBAC laboral ni home híbrido empleado/cliente.

La decisión conserva:

```text
SHELL
→ HUB LABORAL

PASS
→ APLICACIÓN DE CLIENTE
→ SUPERFICIE ADYACENTE

AURA
→ APLICACIÓN LABORAL
→ DIFERIDA

APLICACIONES LABORALES NÚCLEO
→ ACCESOS LABORALES SEGÚN VISIBILIDAD Y AUTORIZACIÓN
```

La separación es de identidad, propósito y presentación. No crea autoridad nueva.

---

#### 2. Handoff recibido de `SHELL-APP-010`

Se reciben sin reapertura:

1. `HIDDEN_BASE` y `CONTEXT_HIDDEN` permanecen distintos de `CONTEXT_BLOCKED`;
2. una aplicación oculta no se convierte en tarjeta bloqueada;
3. AURA diferida no se presenta como denegación de autorización;
4. PASS adyacente no se presenta como denegación laboral;
5. una denegación visible usa `SafeDecisionProjectionV1` y razones públicas gobernadas;
6. indisponibilidad técnica y denegación permanecen separadas;
7. SHELL no crea copy ni mappings locales de autorización;
8. una aplicación bloqueada permanece no navegable;
9. la aplicación destino revalida autorización;
10. la frontera laboral versus superficies adyacentes quedó reservada a esta tarea.

Esta tarea no redefine la explicación de bloqueos.

---

#### 3. Fuentes de clasificación

La separación reutiliza únicamente clasificaciones ya aprobadas:

```text
AppCode
+
TIPO DE APLICACIÓN
+
DOMINIO DE IDENTIDAD
+
ALCANCE DEL ROADMAP
+
CLASE DE PRESENTACIÓN EN SHELL
+
actor_type
```

No se infiere desde nombre comercial, repositorio, dominio web, existencia de un permiso `*.access`, presencia en una lista local, contenido temático de una pantalla ni último destino visitado.

---

#### 4. Universo canónico de aplicaciones

Se conservan exactamente diez aplicaciones:

| Código | Nombre | Tipo | Dominio de identidad | Roadmap |
| --- | --- | --- | --- | --- |
| `shell` | Vento OS | Hub | Laboral | Núcleo |
| `anima` | ANIMA | Híbrida | Laboral | Núcleo |
| `viso` | VISO | Administrativa | Laboral | Núcleo |
| `nexo` | NEXO | Híbrida | Laboral | Núcleo |
| `fogo` | FOGO | Operativa | Laboral | Núcleo |
| `origo` | ORIGO | Híbrida | Laboral | Núcleo |
| `pulso` | PULSO | Operativa | Laboral | Núcleo |
| `numera` | NUMERA | Híbrida | Laboral | Núcleo |
| `aura` | AURA | Administrativa | Laboral | Diferido |
| `pass` | Vento Pass | Cliente | Cliente | Adyacente |

No se crea ninguna identidad adicional.

---

#### 5. Clasificación de presentación heredada

Se conserva exactamente:

| Aplicación | Clase de presentación |
| --- | --- |
| `shell` | `HUB_SELF` |
| `anima` | `PRIMARY_BASE` |
| `viso` | `PRIMARY_BASE` |
| `nexo` | `PRIMARY_BASE_OR_CONTEXT` |
| `fogo` | `PRIMARY_BASE_OR_CONTEXT` |
| `origo` | `PRIMARY_BASE_OR_CONTEXT` |
| `pulso` | `PRIMARY_CONTEXT_ONLY` |
| `numera` | `PRIMARY_BASE` |
| `aura` | `DEFERRED_RESERVED` |
| `pass` | `ADJACENT_RESERVED` |

Estas clases gobiernan presentación y no sustituyen una decisión de autorización.

---

#### 6. Resultado cuantitativo de la frontera

La reconciliación queda:

```text
CANONICAL_APPS = 10
HUB_SELF = 1
PRIMARY_BASE = 3
PRIMARY_BASE_OR_CONTEXT = 3
PRIMARY_CONTEXT_ONLY = 1
DEFERRED_RESERVED = 1
ADJACENT_RESERVED = 1

1 + 3 + 3 + 1 + 1 + 1 = 10

APLICACIONES CON CARRIL BASE PRIMARIO = 6
```

Las siete identidades que pueden participar como aplicaciones laborales primarias o contextuales son:

```text
anima
viso
nexo
fogo
origo
pulso
numera
```

---

#### 7. SHELL es la superficie laboral de coordinación

`shell` permanece `HUB_SELF`.

SHELL organiza contexto laboral, trabajo pendiente, accesos laborales autorizados y navegación general. No aparece como tarjeta de sí misma y no absorbe la experiencia cliente de PASS.

```text
SHELL
≠
PORTAL UNIVERSAL DE TODOS LOS PRODUCTOS VENTO
```

---

#### 8. Región laboral primaria

La experiencia de un `EMPLOYEE` puede proyectar como accesos secundarios `anima`, `viso`, `nexo`, `fogo`, `origo`, `pulso` y `numera`, exclusivamente conforme a visibilidad por actor, visibilidad por contexto, disponibilidad, bloqueo, autorización de entrada y ciclo de vida.

Pertenecer a este universo no produce `ALLOW`.

---

#### 9. AURA no es superficie adyacente

AURA conserva:

```text
DOMINIO = Laboral
ROADMAP = Diferido
PRESENTACIÓN = DEFERRED_RESERVED
```

Por tanto, AURA sigue fuera de navegación mientras permanezca diferida, pero no se reclasifica como producto cliente ni como superficie adyacente.

---

#### 10. PASS es la única aplicación adyacente actual

En el catálogo vigente:

```text
ADJACENT_CUSTOMER_APPS = 1
```

y esa identidad es `pass`.

No se inventan otras aplicaciones adyacentes. Una futura superficie adyacente requerirá clasificación canónica explícita.

---

#### 11. Significado de `ADJACENT_RESERVED`

Para PASS, `ADJACENT_RESERVED` significa simultáneamente:

- existe canónicamente;
- pertenece al dominio de cliente;
- no forma parte del grid laboral primario;
- una posible elegibilidad laboral-administrativa no equivale al acceso normal del cliente;
- una posible elegibilidad laboral-administrativa no la convierte en tarjeta laboral primaria;
- su exposición laboral exacta requiere contrato propio;
- su acceso normal de cliente permanece fuera de la política laboral de SHELL.

`ADJACENT_RESERVED` no concede acceso.

---

#### 12. El tema de los datos no cambia el dominio de la aplicación

Que una aplicación laboral procese información relacionada con clientes no la convierte en aplicación cliente.

PULSO puede operar ventas, pedidos, fidelización y clientes y sigue siendo laboral. VISO puede administrar información empresarial relacionada con clientes y sigue siendo laboral.

La clasificación depende de la identidad canónica de la aplicación y del propósito de la acción, no del sustantivo mostrado en los datos.

---

#### 13. ANIMA tampoco es superficie adyacente

ANIMA contiene experiencias personales del trabajador, pero su dominio de identidad continúa siendo laboral.

```text
AUTOSERVICIO DEL TRABAJADOR
≠
SUPERFICIE CLIENTE
```

Las acciones personales del trabajador no convierten ANIMA en PASS ni en aplicación cliente.

---

#### 14. Identidad principal de PASS

PASS conserva:

```text
TIPO = Cliente
DOMINIO DE IDENTIDAD = Cliente
ROADMAP = Adyacente
```

El acceso normal del cliente no se autoriza mediante `employees.role` ni mediante otra fuente de RBAC laboral.

---

#### 15. `pass.access` permanece separado del acceso del cliente

El permiso `pass.access` permanece en el catálogo laboral y conserva modalidad `BASE_ONLY`, pero su significado canónico no es autorizar la sesión normal del cliente.

Se conserva:

```text
PASS_CUSTOMER_ACCESS
≠
LABOR_RBAC
```

Esta tarea no elimina, renombra ni redefine `pass.access`.

---

#### 16. Elegibilidad laboral-administrativa de PASS

Las concesiones laborales existentes hacia PASS se interpretan únicamente como elegibilidad laboral-administrativa adyacente.

```text
PASS_LABOR_ADMIN_ELIGIBILITY
≠
PRIMARY_LABOR_HUB_CARD
```

Una concesión laboral no transforma la experiencia cliente completa en aplicación laboral.

---

#### 17. `pass.access` no basta para materializar una superficie

Se conserva:

```text
PERMISO EXISTENTE
≠
CAPACIDAD NAVEGABLE CONFIRMADA
```

La futura exposición laboral de PASS exige al menos superficie laboral o administrativa explícita, owner funcional, destino canónico, proceso aprobado, autorización exacta, consumidor registrado y disponibilidad demostrable.

Mientras esa superficie no esté resuelta:

```text
ADJACENT_RESERVED
→ NO PROMOCIÓN AUTOMÁTICA A NAVEGABLE
```

---

#### 18. Baseline de consumidores laborales de PASS

El registro canónico de consumidores de contexto/autorización conserva:

```text
PASS
→ 0 consumidores laborales por defecto
```

Por tanto, SHELL no inventa una ruta laboral de PASS únicamente porque existan el código `pass` y el permiso `pass.access`.

---

#### 19. Empleado con elegibilidad laboral hacia PASS

Si un `EMPLOYEE` posee una concesión laboral compatible con `pass.access`, SHELL no convierte por esa sola condición a PASS en tarjeta primaria.

La elegibilidad sigue siendo adyacente y su navegación permanece condicionada a la existencia de una superficie laboral-administrativa explícitamente aprobada.

---

#### 20. Empleado sin elegibilidad laboral hacia PASS

Un `EMPLOYEE` sin elegibilidad laboral hacia PASS tampoco recibe una tarjeta `Vento Pass — Bloqueada` como fallback.

La ausencia de elegibilidad no convierte una superficie adyacente en capacidad que deba enumerarse.

---

#### 21. `CUSTOMER` no recibe el Hub laboral

Se conserva:

```text
CUSTOMER
→ NO_INTERACTIVE_LABOR_HUB
```

Un cliente no recibe home laboral, contexto laboral, trabajo pendiente laboral ni grid de aplicaciones laborales. Tampoco recibe PASS como tarjeta dentro de ese grid.

---

#### 22. SHELL no es el login normal del cliente

La superficie de acceso de SHELL pertenece al ecosistema laboral.

```text
SHELL LOGIN
≠
CUSTOMER PASS LOGIN
```

Compartir infraestructura técnica de autenticación no convierte ambas experiencias en una misma frontera funcional. La entrada normal del cliente permanece responsabilidad de PASS y sus contratos propietarios.

---

#### 23. No existe redirección automática `CUSTOMER → PASS` desde SHELL

La clasificación `actor_type = CUSTOMER` no autoriza a SHELL a construir una redirección automática hacia PASS.

Esta tarea no crea rutas, redirect, deep link ni bootstrap de sesión cliente.

El resultado se conserva:

```text
CUSTOMER
→ SIN HOME LABORAL
```

---

#### 24. SHELL no hace bootstrap de una sesión cliente

SHELL no utiliza `shell.access`, rol base, rol operativo, sede, área, turno, check-in, concesiones laborales ni selección local para fabricar una sesión o autorización cliente.

Una sesión autenticada tampoco demuestra por sí sola que el actor pueda usar PASS como cliente.

---

#### 25. Infraestructura compartida no mezcla dominios

Puede existir infraestructura técnica compartida, pero se conserva:

```text
AUTENTICACIÓN COMPARTIDA POSIBLE
≠
AUTORIZACIÓN COMPARTIDA
≠
MISMO ACTOR EFECTIVO
≠
MISMO HOME
≠
MISMO RBAC
```

---

#### 26. Persona con identidad laboral y de cliente

Una misma persona puede relacionarse con Vento como trabajador y cliente sin crear un actor híbrido nuevo.

Cuando la sesión laboral resuelve `actor_type = EMPLOYEE`, SHELL presenta exclusivamente la experiencia laboral aplicable. La identidad cliente no se fusiona en el home para mostrar puntos, perfil de fidelización, pedidos personales ni controles de PASS.

---

#### 27. No se mezclan perfiles laborales y de cliente

La superficie laboral no combina `employee + customer profile` como una identidad de autorización única.

Datos de cliente no completan rol base, rol operativo, sede, área, turno, check-in ni permisos laborales. Datos laborales tampoco completan la autorización normal del cliente.

---

#### 28. Trabajo laboral relacionado con PASS no equivale a uso cliente

Una persona puede ejecutar trabajo empresarial sobre fidelización, puntos, redenciones, clientes, campañas, soporte o configuración comercial. Ese trabajo sigue siendo laboral cuando se ejecuta mediante aplicación, permiso, actor y proceso laborales.

Ejemplo:

```text
PULSO
→ redención realizada por trabajador autorizado
→ trabajo laboral
→ no sesión cliente PASS
```

---

#### 29. La aplicación propietaria conserva la capacidad

Si una operación laboral relacionada con PASS pertenece canónicamente a PULSO, VISO u otra aplicación laboral, SHELL navega hacia ese owner conforme a autorización.

No redirige a PASS por asociación temática.

---

#### 30. `owner_app_code = pass` no crea una tarjeta primaria

Si en el futuro aparece un `work_item` legítimo cuyo owner sea `pass`, esa referencia no reclasifica automáticamente toda la aplicación como laboral primaria.

Antes de presentar navegación deberán estar resueltos naturaleza laboral de la superficie, actor admitido, permiso exacto, destino, disponibilidad y contrato de handoff.

---

#### 31. Separación conceptual en la página laboral

La página `task-first` conserva:

```text
CONTEXTO
FOCO
ACCIÓN
ESTADO
OBLIGACIONES
ACCESOS SECUNDARIOS
```

Dentro de los accesos secundarios, la presentación futura debe distinguir conceptualmente:

```text
ACCESOS LABORALES
≠
SUPERFICIES ADYACENTES
```

Esta tarea no fija columnas, tabs, cards, drawers, tamaños ni breakpoints.

---

#### 32. Una superficie adyacente no compite con el trabajo

Una superficie adyacente no se vuelve foco por existir, no desplaza el `work_item`, no compite con la acción principal, no se mezcla con aplicaciones laborales como si tuviera el mismo propósito y no se usa como relleno cuando no existen tareas.

La prioridad `task-first` permanece intacta.

---

#### 33. No se usa el mismo conteo para laboral y adyacente

SHELL no deberá presentar una cifra como `10 apps laborales` porque el catálogo de diez incluye `shell` como Hub, AURA diferida y PASS cliente adyacente.

Los conteos futuros deberán respetar clase de presentación y disponibilidad real.

---

#### 34. Copy AS-IS no redefine la frontera

Texto promocional como `Un solo acceso para todo el ecosistema` no tiene autoridad para convertir SHELL en portal cliente.

La semántica canónica prevalece sobre copy, chips, métricas y listas locales. Esta tarea no modifica todavía esos textos físicos.

---

#### 35. Los chips de login no son catálogo laboral

La lista visual de `Apps conectadas` observada en `/login` no define catálogo, dominio, superficie adyacente, disponibilidad ni autorización.

La frontera final se deriva de contratos canónicos, no de listas locales.

---

#### 36. `shell.access` no autoriza al cliente

`shell.access` permanece `BASE_ONLY` y gobierna la entrada laboral de SHELL conforme a las decisiones previas.

No se usa como permiso de acceso normal de `CUSTOMER`.

---

#### 37. `pass.access` no completa `shell.access`

La existencia de `pass.access` no satisface `shell.access`; la existencia de `shell.access` tampoco satisface la autorización normal del cliente PASS.

Son identidades y propósitos distintos.

---

#### 38. La frontera no crea SSO cliente

Esta tarea no define SSO entre SHELL y PASS cliente, intercambio de tokens cliente, sincronización de sesión, retorno cliente hacia SHELL, logout conjunto laboral/cliente ni account linking.

---

#### 39. `returnTo` no redefine el dominio

Un parámetro, URL o destino solicitado no puede transformar la entrada laboral de SHELL en entrada cliente PASS por sí solo.

La validación completa de retorno cross-app permanece reservada a `SHELL-APP-014`.

---

#### 40. Deep link no reclasifica la superficie

Conocer o abrir directamente una URL de PASS no la clasifica como aplicación laboral ni concede acceso cliente o laboral-administrativo.

La superficie destino resuelve su propio actor y autorización.

---

#### 41. PASS no hereda contexto laboral por navegación

Una navegación futura hacia una superficie adyacente no transporta como autoridad rol base, rol operativo, turno, check-in, sede, área ni selección de estación.

Esos datos solo podrán proyectarse cuando un contrato laboral explícito los requiera y nunca se convierten en credenciales del cliente.

---

#### 42. SHELL no importa contexto cliente al Hub

SHELL no utiliza saldo de puntos, nivel de fidelización, perfil de cliente, pedidos personales, preferencias comerciales, consentimientos ni historial PASS para decidir visibilidad laboral.

---

#### 43. Privacidad de la separación

La región laboral no revela por defecto si el trabajador posee cuenta PASS, es cliente de una marca, tiene puntos, pertenece a un nivel, mantiene pedidos personales o preferencias de marketing.

Una capacidad laboral autorizada podrá acceder a datos de cliente solo cuando su finalidad y contrato lo permitan.

---

#### 44. Cambio de actor

Cuando cambia el actor efectivo entre `EMPLOYEE` y `CUSTOMER`, SHELL no conserva grid, accesos, bloqueos, contexto, trabajo ni elegibilidad adyacente del actor anterior.

Toda proyección debe resolverse nuevamente.

---

#### 45. Dispositivo compartido

Un dispositivo laboral compartido no convierte al actor en cliente PASS ni mantiene una sesión cliente personal por inferencia desde el actor operativo.

---

#### 46. Simulación

La simulación laboral no puede convertirse en simulación de identidad cliente.

```text
SIMULAR ROL O CONTEXTO LABORAL
≠
IMPERSONAR CUSTOMER
```

---

#### 47. Estado de ciclo de vida antes de presentación

Se conserva:

```text
APLICACIÓN LABORAL + DIFERIDA
→ NO NAVEGABLE
```

para AURA, y:

```text
APLICACIÓN ADYACENTE + SIN SUPERFICIE LABORAL CONFIRMADA
→ NO PROMOCIÓN AUTOMÁTICA
```

para PASS.

---

#### 48. Frontera visual mínima

Cuando una futura superficie adyacente pueda presentarse legítimamente a un empleado, deberá distinguirse de los accesos laborales mediante estructura perceptible y semántica, no únicamente mediante color, icono u opacidad.

La persona debe poder comprender que entra a una superficie de propósito distinto. El diseño final por dispositivo permanece reservado a tareas posteriores.

---

#### 49. Frontera de navegación

Una superficie adyacente nunca se presenta como parte requerida del flujo laboral ordinario salvo que exista un `work_item` o handoff laboral explícito con owner, permiso y destino propios.

Incluso entonces, el handoff no convierte la experiencia cliente completa en capacidad laboral.

---

#### 50. No existe acceso cliente por transitividad

Queda prohibido:

```text
EMPLOYEE tiene shell.access
+
EMPLOYEE tiene pass.access
→ CUSTOMER ACCESS
```

También:

```text
CUSTOMER autenticado
→ shell.access implícito
```

---

#### 51. Branding e infraestructura común no fusionan fronteras

Compartir marca Vento, dominio corporativo, Supabase, repositorio de migraciones, catálogo, librerías, estilos o componentes no convierte dos productos en una misma frontera de identidad.

---

#### 52. Futuras superficies adyacentes

Una futura superficie solo podrá clasificarse como adyacente mediante decisión canónica que defina identidad estable, owner, dominio de identidad, propósito, actor admitido, condición de exposición, navegación, autorización, datos proyectables y retorno.

SHELL no crea categorías adyacentes dinámicamente desde URLs externas.

---

#### 53. La tarea no crea un nuevo tipo de aplicación

Se mantienen los cinco tipos descriptivos aprobados:

```text
hub
administrative
operational
hybrid
customer
```

`ADJACENT_RESERVED` es clase de presentación, no sexto tipo de aplicación.

---

#### 54. La tarea no crea un nuevo actor

Se mantienen exactamente:

```text
EMPLOYEE
CUSTOMER
SYSTEM
UNRESOLVED
```

No se crean `EMPLOYEE_CUSTOMER`, `PASS_USER`, `ADJACENT_USER` ni `HYBRID_USER`.

---

#### 55. Decisión documental consolidada

```text
CANONICAL APPS = 10

shell
→ HUB_SELF
→ laboral

anima / viso / nexo / fogo / origo / pulso / numera
→ laborales primarias o contextuales
→ visibilidad y autorización ya gobernadas

aura
→ laboral
→ DEFERRED_RESERVED
→ no navegable mientras permanezca diferida

pass
→ customer
→ ADJACENT_RESERVED
→ fuera del grid laboral primario

EMPLOYEE
→ puede recibir home laboral
→ no recibe experiencia cliente por inferencia

CUSTOMER
→ no recibe home laboral
→ SHELL no se convierte en entrada normal de PASS

pass.access
→ permiso laboral BASE_ONLY existente
→ no autoriza al cliente
→ no convierte PASS en tarjeta primaria
→ no materializa por sí solo una superficie navegable

PASS_CUSTOMER_ACCESS
≠ LABOR_RBAC

PASS_LABOR_ADMIN_ELIGIBILITY
≠ PRIMARY_LABOR_HUB_CARD
```

---

#### 56. Handoff a `SHELL-APP-012`

`SHELL-APP-012` recibe:

1. PASS fijada como única aplicación cliente adyacente actual;
2. PASS fuera del grid laboral primario;
3. `CUSTOMER` fuera del Hub laboral;
4. ausencia de redirección automática cliente desde SHELL;
5. `pass.access` conservado como permiso laboral `BASE_ONLY`;
6. `pass.access` separado de la autorización normal del cliente;
7. elegibilidad laboral-administrativa PASS separada de tarjeta primaria;
8. baseline de cero consumidores laborales por defecto para PASS;
9. prohibición de inferir una superficie laboral PASS desde el permiso;
10. separación entre identidad laboral y perfil cliente;
11. prohibición de mezclar contexto laboral con autoridad cliente;
12. necesidad de resolver el significado y uso final del RBAC laboral de PASS sin alterar la frontera cliente.

La siguiente tarea podrá especificar la regla RBAC de PASS sin volver a mezclar ambas experiencias.

---

#### 57. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea especializa en SHELL una frontera ya protegida por catálogo de aplicaciones, clasificación de actor, autorización, visibilidad, identidad cliente, minimización y registro de consumidores.

No modifica el Registro Canónico de Requisitos de Prueba.

---

#### 58. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-SHELL-001` — una aplicación no se considera operativa por registro o permiso aislado;
- `TREQ-SHELL-003` — identidad, destino, estado y disponibilidad de aplicación provienen del catálogo gobernado;
- `TREQ-SHELL-028` — launcher, login, navegación y registros consumen una fuente versionada de aplicaciones;
- `TREQ-SHELL-030` — visibilidad de navegación no sustituye autorización de servidor;
- `TREQ-SHELL-080` — el registro de consumidores conserva PASS con cero consumidores laborales por defecto y prohíbe inventar rutas;
- `TREQ-UX-003` — cada actor recibe únicamente información y acciones adecuadas a su tarea y autorización;
- `TREQ-UX-008` — la intención se clasifica por acción, efecto y actor, no por nombre de aplicación;
- `TREQ-UX-009` — el contexto operativo no puede fabricarse desde estado local;
- `TREQ-PASS-010` — la identidad cliente separa persona, cuenta autenticada, relación, perfil, preferencias y consentimientos.

Estas referencias constituyen trazabilidad heredada y no actualizan 04A.

---

#### 59. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto aún no ha sido insertado ni sometido a la batería documental del checkout local de `SHELL-APP-011`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía formateo, quality, delivery, topología, package checks ni batería global sobre la rama local de `SHELL-APP-011`. |
| REMOTA | PASS | Se verificaron el `main` posterior al cierre de `SHELL-APP-010`, continuidad H2, ruta normal, topología `PER_IMPLEMENTATION_UNIT`, protocolo, contrato de entrega, políticas de formato/desarrollo, `package.json`, owner H2, `SHELL-APP-002`, `SHELL-APP-003`, `SHELL-APP-009`, `SHELL-APP-010`, catálogo de aplicaciones, modalidad de `*.access`, semántica de `pass.access`, 04A SHELL, 04A PASS y runtime AS-IS de `/` y `/login`. |
| OPERATIVA | NOT_APPLICABLE | La tarea define la frontera documental laboral/adyacente; no prueba cuentas cliente reales, empleados reales, autenticación productiva, navegación desplegada ni dominios productivos. |
| FÍSICA | NOT_APPLICABLE | Esta aprobación documental no crea ni autoriza una instancia física de `SHELL-APP-011` y no modifica código, datos, infraestructura ni despliegues. |

---

#### 60. Criterios de aceptación

- [ ] El título y la continuidad corresponden exactamente a `SHELL-APP-010 → SHELL-APP-011 → SHELL-APP-012`.
- [ ] La tarea permanece exclusivamente documental y `PER_IMPLEMENTATION_UNIT` no autoriza materialización física.
- [ ] Se conservan exactamente diez aplicaciones canónicas.
- [ ] `shell` permanece `HUB_SELF`.
- [ ] Existen exactamente siete identidades de aplicación laboral primaria o contextual.
- [ ] AURA permanece laboral, diferida y `DEFERRED_RESERVED`.
- [ ] PASS permanece tipo Cliente, dominio Cliente, roadmap Adyacente y `ADJACENT_RESERVED`.
- [ ] PASS es la única aplicación cliente adyacente actual.
- [ ] PASS no entra al grid laboral primario.
- [ ] Aplicaciones laborales que procesan datos de clientes no se reclasifican como cliente.
- [ ] ANIMA permanece laboral aunque contenga autoservicio personal.
- [ ] `CUSTOMER` no recibe Hub laboral y `EMPLOYEE` continúa siendo el actor del home laboral.
- [ ] No se crea actor híbrido empleado/cliente.
- [ ] SHELL no se convierte en login normal del cliente ni crea redirección automática `CUSTOMER → PASS`.
- [ ] Compartir autenticación técnica no mezcla autorización.
- [ ] `shell.access` no autoriza clientes.
- [ ] `pass.access` permanece `BASE_ONLY` y no autoriza la sesión normal del cliente.
- [ ] `pass.access` no completa `shell.access` ni crea por sí solo una tarjeta laboral PASS.
- [ ] La elegibilidad laboral-administrativa PASS no se convierte en tarjeta primaria.
- [ ] Se conserva el baseline PASS de cero consumidores laborales por defecto.
- [ ] No se inventa ruta laboral PASS.
- [ ] Un empleado sin elegibilidad PASS no recibe tarjeta PASS bloqueada por fallback.
- [ ] Un empleado con elegibilidad PASS no recibe tarjeta primaria por esa sola concesión.
- [ ] Una futura superficie laboral PASS requiere owner y contrato explícitos.
- [ ] Un `work_item` con owner PASS no reclasifica automáticamente toda PASS.
- [ ] Accesos laborales y superficies adyacentes permanecen conceptualmente separados y no compiten con el foco `task-first`.
- [ ] No se presentan las diez aplicaciones como si todas fueran apps laborales navegables.
- [ ] Copy, chips o listas AS-IS no redefinen la frontera canónica.
- [ ] `returnTo` y deep links no cambian dominio ni conceden acceso.
- [ ] PASS no hereda contexto laboral como autoridad cliente.
- [ ] SHELL no importa perfil personal PASS al home laboral.
- [ ] La región laboral no revela por defecto la relación personal del trabajador con PASS.
- [ ] Cambio de actor invalida proyecciones anteriores.
- [ ] Dispositivo compartido y simulación laboral no crean identidad cliente.
- [ ] Una superficie adyacente navegable futura deberá distinguirse semánticamente de accesos laborales.
- [ ] No existe acceso cliente por transitividad, branding o infraestructura común.
- [ ] No se crea un sexto tipo de aplicación ni un quinto `actor_type`.
- [ ] No se desarrolla el RBAC final de PASS reservado a `SHELL-APP-012`.
- [ ] No se desarrolla retorno cross-app reservado a `SHELL-APP-014`.
- [ ] No se modifica código, Supabase, permisos, datos, configuración ni despliegues.
- [ ] No se crean ni modifican requisitos de prueba y no se modifica 04A.
- [ ] No se crea ni autoriza una instancia física.

---

#### 61. Límites

Esta tarea no modifica el catálogo de aplicaciones, tipos, dominios de identidad, AURA, permisos, grants, denies, matrices, roles, tipos de actor, contratos funcionales de PASS, puntos, redenciones, pedidos, perfiles cliente, owners de capacidades ajenas, proyecciones seguras, mensajes de bloqueo, visibilidad por actor o contexto, página inicial `task-first`, retorno cross-app, conservación de contexto/tarea, UI responsive, código, middleware, Auth, Supabase, datos, migraciones, configuración o despliegues.

No crea ni autoriza una instancia física, no crea ni modifica requisitos de prueba, no modifica el Registro Canónico de Requisitos de Prueba y no desarrolla `SHELL-APP-012`.

---

#### 62. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-010 — Explicar por qué una aplicación está bloqueada`

**TAREA ACTUAL APROBADA**
`SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente`


### ✅ SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente
**Tarea siguiente:** SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones
**Tipo de tarea:** definición técnico-documental de la frontera de autorización entre la identidad cliente de PASS y las capacidades laborales relacionadas con PASS; fija el significado de `pass.access`, conserva la separación cliente/laboral, reconcilia la elegibilidad base existente con las superficies PASS observadas y mantiene `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** contrato documental de frontera PASS/RBAC cerrado: el cliente continúa fuera del RBAC laboral, `pass.access` queda limitado a una capacidad laboral-administrativa `BASE_ONLY` y las superficies laborales relacionadas con PASS permanecen separadas de la experiencia cliente, sin cambios de runtime ni creación de instancia física
**Cambios físicos autorizados:** ninguno; no se modifican código, rutas, autenticación, catálogo, permisos, matrices, Supabase, datos, RLS, RPC, configuración, aplicaciones ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Cerrar la ambigüedad histórica producida por la coexistencia de:

```text
PASS
→ aplicación de tipo Cliente
→ dominio de identidad Cliente
→ roadmap Adyacente

pass.access
→ permiso existente dentro del catálogo laboral
→ BASE_ONLY

PASS runtime
→ experiencia principal de cliente
→ superficies laborales embebidas observadas
```

La tarea establece una frontera verificable que impide convertir el RBAC laboral en mecanismo de autorización del cliente y, al mismo tiempo, conserva las capacidades laborales relacionadas con PASS que ya poseen propietario, controles y trazabilidad canónicos.

La regla central queda:

```text
AUTORIZACIÓN NORMAL DEL CLIENTE PASS
≠
RBAC LABORAL

CAPACIDAD LABORAL RELACIONADA CON PASS
→ AUTORIZACIÓN LABORAL EXPLÍCITA

pass.access
→ ENTRADA LABORAL-ADMINISTRATIVA
→ NO IDENTIDAD CLIENTE
→ NO AUTORIZACIÓN TOTAL DE PASS
```

---

#### 2. Handoff recibido de `SHELL-APP-011`

Se reciben sin reapertura:

1. PASS es la única aplicación cliente adyacente actual;
2. PASS permanece fuera del grid laboral primario;
3. `CUSTOMER` permanece fuera del Hub laboral;
4. SHELL no crea redirección automática `CUSTOMER → PASS`;
5. `pass.access` se conserva como permiso laboral `BASE_ONLY`;
6. `pass.access` está separado de la autorización normal del cliente;
7. elegibilidad laboral-administrativa hacia PASS no equivale a tarjeta primaria;
8. PASS conserva baseline de cero consumidores laborales por defecto dentro del registro compartido de autorización/contexto;
9. el permiso no autoriza a inventar una superficie laboral navegable;
10. identidad laboral y perfil cliente permanecen separados;
11. contexto laboral no se convierte en autoridad cliente;
12. esta tarea debe cerrar el significado y uso del RBAC laboral de PASS sin alterar la frontera cliente.

---

#### 3. Decisión principal

La ambigüedad se cierra con dos carriles conceptualmente independientes:

```text
CARRIL CLIENTE
principal autenticado
→ identidad cliente válida
→ contratos de PASS
→ recurso/acción de cliente
→ autorización propia del dominio cliente

CARRIL LABORAL
principal autenticado
→ identidad laboral válida
→ actor EMPLOYEE
→ permiso laboral exacto
→ contexto/alcance cuando aplique
→ autorización laboral
```

No existe conversión automática entre los dos carriles.

---

#### 4. Identidad canónica de PASS

Se conserva:

| Campo | Decisión |
| --- | --- |
| `app_code` | `pass` |
| Nombre | Vento Pass |
| Tipo de aplicación | Cliente |
| Dominio de identidad | Cliente |
| Alcance de roadmap | Adyacente |
| Clase de presentación en SHELL | `ADJACENT_RESERVED` |

La existencia de componentes laborales dentro del repositorio PASS no cambia esta identidad primaria.

---

#### 5. Fuente de identidad del cliente

La identidad normal del cliente pertenece al dominio:

```text
public.users
```

y no se resuelve desde:

```text
employees.role
role_permissions
employee_permissions
operational_role_permissions
turno
check-in
rol operativo
sede operativa
área operativa
```

La relación laboral de una persona no sustituye su identidad cliente.

---

#### 6. Fuente de identidad laboral

Cuando una capacidad relacionada con PASS es laboral, el actor debe resolverse por la arquitectura laboral vigente:

```text
principal autenticado
+
employees
+
empleado activo
+
actor efectivo EMPLOYEE
+
permiso laboral exacto
+
alcance/contexto aplicable
→ decisión laboral
```

Una fila en `public.users` no sustituye a `employees`.

---

#### 7. Una persona puede tener ambas relaciones

La misma persona puede ser simultáneamente:

```text
CLIENTE
+
TRABAJADOR
```

sin que exista un actor híbrido nuevo.

Se conserva:

```text
actor_type ∈ {
  EMPLOYEE,
  CUSTOMER,
  SYSTEM,
  UNRESOLVED
}
```

La acción concreta determina qué actor efectivo y qué contrato deben utilizarse.

---

#### 8. Regla de no fusión

Queda prohibido derivar:

```text
CUSTOMER + employee encontrado
→ CUSTOMER_EMPLOYEE
```

o:

```text
EMPLOYEE + perfil PASS encontrado
→ EMPLOYEE_CUSTOMER
```

La coexistencia de identidades se representa mediante relaciones separadas y resolución explícita por superficie y acción.

---

#### 9. Significado final de `pass.access`

`pass.access` se conserva como permiso canónico laboral de entrada:

```text
permission_key = pass.access
authorization_requirement = BASE_ONLY
scope_profile = NT-CLIENT-ADMIN
```

Su significado queda limitado a:

```text
ENTRAR A UNA SUPERFICIE LABORAL-ADMINISTRATIVA DE PASS
CUANDO ESA SUPERFICIE EXISTA, ESTÉ REGISTRADA
Y SEA NAVEGABLE SEGÚN SU CONTRATO
```

No representa el acceso normal del cliente final.

---

#### 10. `pass.access` no es autenticación de cliente

Una decisión laboral:

```text
pass.access = ALLOW
```

no produce:

- autenticación cliente;
- creación de perfil cliente;
- cuenta PASS;
- sesión cliente;
- nivel de fidelización;
- saldo de puntos;
- historial de compras;
- consentimiento;
- preferencias;
- autorización de pedidos.

---

#### 11. `pass.access` no es permiso paraguas

`pass.access` tampoco concede automáticamente:

- consultar clientes;
- buscar cuentas;
- ver datos personales;
- otorgar puntos;
- ajustar puntos;
- validar canjes;
- redimir beneficios;
- administrar campañas;
- modificar preferencias;
- gestionar consentimientos;
- procesar reclamos;
- operar pedidos;
- ejecutar acciones propietarias de PULSO.

Cada capacidad laboral requiere su permiso y owner exactos.

---

#### 12. Modalidad `BASE_ONLY`

La modalidad de `pass.access` permanece:

```text
BASE_ONLY
```

Esto significa que la capacidad solo puede satisfacerse por el carril base compatible.

No significa:

```text
GLOBAL
UNIVERSAL
CLIENTE
SIN RECURSO
SIN DENEGACIONES
SIN VALIDACIÓN
```

La evaluación conserva empleado activo, permiso activo, alcance, recurso, denegaciones y demás restricciones aplicables.

---

#### 13. Matriz base exacta para `pass.access`

Se conserva la decisión aprobada de los ocho roles base vigentes:

| Rol base | `pass.access` | Resultado |
| --- | --- | --- |
| `propietario` | ASIGNAR | elegibilidad laboral-administrativa `NT-CLIENT-ADMIN` |
| `gerente_general` | ASIGNAR | elegibilidad laboral-administrativa `NT-CLIENT-ADMIN` |
| `gerente` | NO ASIGNAR | denegación por defecto |
| `supervisor` | NO ASIGNAR | denegación por defecto |
| `auxiliar_administrativa` | NO ASIGNAR | denegación por defecto |
| `contador` | NO ASIGNAR | denegación por defecto |
| `marketing` | NO ASIGNAR | denegación por defecto |
| `trabajador_operativo` | NO ASIGNAR | denegación por defecto |

Total:

```text
BASE_ROLES = 8
PASS_ACCESS_BASE_GRANTS = 2
PASS_ACCESS_BASE_DEFAULT_DENIALS = 6
```

---

#### 14. Propietario

Para `propietario`:

```text
pass.access
→ ASIGNAR
→ BASE_ONLY
→ NT-CLIENT-ADMIN
```

La asignación permite únicamente elegibilidad hacia una superficie laboral-administrativa PASS válida.

No concede autoridad de cliente ni autoridad funcional ilimitada.

---

#### 15. Gerente general

Para `gerente_general`:

```text
pass.access
→ ASIGNAR
→ BASE_ONLY
→ NT-CLIENT-ADMIN
```

La semántica es idéntica en naturaleza a la de propietario respecto de la frontera cliente/laboral.

No existe bypass por nombre de rol.

---

#### 16. Gerente y supervisor

`gerente` y `supervisor` no reciben `pass.access` por su rol base.

La condición se mantiene por denegación por defecto.

Una responsabilidad local de sede no implica administración de PASS.

---

#### 17. Roles funcionales

`auxiliar_administrativa`, `contador` y `marketing` no reciben `pass.access` por defecto.

En particular:

```text
marketing
≠ acceso implícito a PASS
≠ acceso implícito a clientes
≠ acceso implícito a puntos
≠ acceso implícito a canjes
```

Las responsabilidades futuras deberán materializarse mediante capacidades laborales atómicas y explícitas.

---

#### 18. `trabajador_operativo`

`trabajador_operativo` no recibe `pass.access` por el rol base.

Una función operativa relacionada con clientes o fidelización debe pertenecer al permiso operativo o laboral concreto de la aplicación propietaria.

No se utiliza `pass.access` como sustituto de esas capacidades.

---

#### 19. Concesión individual

Una futura concesión individual laboral de `pass.access`, si es válida según los contratos canónicos, conserva exactamente la misma frontera:

```text
INDIVIDUAL ALLOW DE pass.access
≠ CUSTOMER ACCESS
```

No puede convertir un permiso laboral en credencial de cliente.

---

#### 20. Denegaciones y precedencia

Una concesión base no supera:

- denegación individual aplicable;
- denegación transversal;
- empleado inactivo;
- configuración inconsistente;
- recurso inválido;
- superficie no disponible;
- aislamiento de ambiente;
- bloqueo estructural.

La semántica de PASS no crea una excepción de precedencia.

---

#### 21. `CUSTOMER` permanece fuera del RBAC laboral

Para acceso normal a PASS:

```text
actor_type = CUSTOMER
```

no se consulta el RBAC laboral como mecanismo de concesión de acceso al producto cliente.

El cliente no necesita:

```text
shell.access
pass.access
employees.role
role_permissions
turno
check-in
```

para ser cliente legítimo de PASS.

---

#### 22. Un cliente sin empleado sigue siendo cliente válido

La ausencia de una fila laboral:

```text
employee = null
```

no debe invalidar por sí misma una sesión cliente válida.

Las capacidades laborales embebidas se ocultan o quedan no disponibles.

La experiencia normal de cliente continúa bajo su contrato propio.

---

#### 23. Un empleado sin perfil cliente no adquiere PASS cliente

La existencia de:

```text
employee activo
+
pass.access ALLOW
```

no crea una identidad cliente inexistente.

No se sintetizan:

- `public.users`;
- perfil;
- relación de marca;
- puntos;
- preferencias;
- consentimientos.

---

#### 24. Baseline runtime vigente de PASS

El snapshot canónico vigente de PASS conserva:

```text
15 Stack.Screen de cliente
21 superficies lógicas cliente/transversales
0 rutas exclusivamente laborales
3 superficies laborales embebidas activas dentro de Home
```

La rama `main` de PASS continúa en el mismo commit utilizado por el inventario aprobado.

Por tanto, no existe evidencia actual de una ruta laboral dedicada que convierta `pass.access` en navegación autónoma.

---

#### 25. Superficie laboral embebida 001

Se conserva:

```text
PASS-LABOR-SURFACE-001
```

como bloque de contexto dentro del menú de usuario de `Home`.

Puede mostrar rol y sede laborales cuando la identidad laboral y la capacidad aplicable estén válidamente resueltas.

No transforma `Home` en pantalla laboral.

---

#### 26. Superficie laboral embebida 002

Se conserva:

```text
PASS-LABOR-SURFACE-002
```

como conjunto de acciones embebidas del menú para cambio de rol/sede y retorno al rol real.

No constituye una ruta laboral ni una capacidad autónoma.

Su presentación no concede autoridad.

---

#### 27. Superficie laboral embebida 003

Se conserva:

```text
PASS-LABOR-SURFACE-003
```

como modal de simulación observado.

La selección de rol o sede debe permanecer separada de autoridad real.

No puede autorizar mutaciones ni reemplazar el contexto resuelto por servidor.

---

#### 28. `Home` sigue siendo superficie de cliente

Aunque `Home` contenga los tres bloques laborales:

```text
Home
→ CUSTOMER SURFACE
```

Se prohíbe:

```text
Home + employeeRole
→ LABOR APP
```

o:

```text
Home + role switcher
→ LABOR NAVIGATION
```

La clasificación de la pantalla no cambia por bloques condicionales embebidos.

---

#### 29. Cero rutas exclusivamente laborales

Mientras el inventario no cambie mediante una decisión canónica posterior:

```text
PASS_EXCLUSIVE_LABOR_ROUTES = 0
```

Un permiso `pass.access` existente no autoriza a SHELL a inventar:

- ruta;
- tarjeta;
- deep link;
- dashboard;
- launcher;
- pantalla administrativa.

---

#### 30. Baseline de consumidores de autorización/contexto

El registro compartido conserva:

```text
PASS_LABOR_CONSUMERS_DEFAULT = 0
```

dentro del baseline de consumidores de autorización/contexto.

Esto impide fabricar un consumidor nuevo solo para “dar uso” a `pass.access`.

Cualquier consumidor real posterior debe registrarse con owner, path, API actual/objetivo, migración, evidencia y removal gate.

---

#### 31. Las superficies laborales embebidas no contradicen el baseline

Los tres bloques laborales observados en PASS forman parte del inventario de superficies y de sus TREQ propietarios.

Eso no significa que ya exista un consumidor canónico nuevo del SDK compartido de autorización/contexto.

Se conserva la diferencia entre:

```text
SUPERFICIE OBSERVADA
≠
CONSUMIDOR CANÓNICO REGISTRADO
```

---

#### 32. Rol local de PASS no es autoridad

El runtime actual contiene claves locales como:

```text
owner
manager
global_manager
staff
cashier
waiter
barista
cook
chef
baker
pastry
warehouse
logistics
client
```

Estas cadenas no son una segunda taxonomía canónica de autorización.

No pueden utilizarse como claves definitivas para decidir permisos.

---

#### 33. `PRIVILEGED_ROLES` es evidencia AS-IS, no contrato

La lista local observada:

```text
owner
manager
global_manager
```

utilizada para habilitar controles de cambio de rol/sede es un hallazgo AS-IS.

No equivale a:

```text
CANONICAL_AUTHORIZATION_ALLOWLIST
```

La autorización final debe provenir del modelo canónico.

---

#### 34. Alias ingleses

Los alias locales no sustituyen los códigos canónicos de rol.

Por tanto:

```text
owner
≠ autoridad canónica por string

manager
≠ autoridad canónica por string

global_manager
≠ autoridad canónica por string
```

La reconciliación de consumidores y aliases pertenece a las tareas propietarias ya registradas.

---

#### 35. Perfil laboral mínimo

Cuando PASS necesite conocer que un cliente autenticado también posee relación laboral, la proyección laboral debe ser mínima y vinculada al usuario autenticado.

No podrá:

- consultar perfiles de terceros;
- usar correo coincidente como prueba suficiente;
- usar datos cliente para elevar rol;
- tratar ausencia de empleado como permiso;
- exponer información laboral no necesaria.

---

#### 36. Error laboral no derriba la experiencia cliente

Si falla:

- consulta de `employees`;
- consulta de sedes;
- carga de rol laboral;
- simulación;
- componente laboral de contexto;

la respuesta segura es aislar la capacidad laboral afectada.

No se debe transformar el fallo en:

```text
CUSTOMER SESSION INVALID
```

cuando la sesión cliente sigue siendo válida.

---

#### 37. Sedes laborales

Una sede mostrada en controles laborales de PASS solo puede provenir de asignaciones laborales válidas.

No se convierte en sede efectiva por:

- selección cliente;
- AsyncStorage;
- parámetro;
- estado React;
- perfil de cliente;
- última sede visitada comercialmente.

---

#### 38. Simulación laboral

Toda simulación debe mantener:

```text
REAL ROLE
REAL SITE
SIMULATED ROLE
SIMULATED SITE
```

como conceptos separados.

La simulación no modifica:

- rol persistente;
- grants reales;
- identidad cliente;
- saldo;
- puntos;
- permisos server.

---

#### 39. Persistencia local

Estado local, caché o AsyncStorage no son fuentes de autorización.

La persistencia de una selección simulada debe quedar subordinada a:

- actor vigente;
- expiración;
- limpieza;
- revalidación;
- reglas de simulación.

Una selección de otro usuario no puede revivir después del cambio de sesión.

---

#### 40. Acciones de fidelización ejecutadas por trabajadores

La operación laboral sobre puntos o redenciones no convierte al trabajador en cliente ni usa `pass.access` como permiso funcional.

Cada acción debe conservar:

```text
EMPLOYEE
+
OWNER APP
+
PERMISSION KEY EXACTA
+
RECURSO
+
SEDE/CONTEXTO
+
DECISIÓN SERVER
```

---

#### 41. PULSO conserva sus operaciones

Las superficies operativas de PULSO relacionadas con PASS permanecen propiedad de PULSO cuando el contrato así lo define.

Ejemplos:

- identificar cliente;
- mostrar proyección mínima;
- otorgar puntos;
- validar redención;
- confirmar actor en dispositivo compartido.

No se duplican como rutas laborales de PASS.

---

#### 42. `pos.main` no reemplaza permisos atómicos

La existencia de un permiso general de acceso a PULSO no autoriza por sí sola cada acción de fidelización.

Del mismo modo:

```text
pass.access
```

tampoco reemplaza los permisos atómicos de esas operaciones.

---

#### 43. Datos de cliente para personal laboral

Un trabajador solo recibe los campos de cliente necesarios para la acción autorizada.

No se deriva acceso masivo a:

- correo;
- teléfono;
- documento;
- fecha de nacimiento;
- historial;
- preferencias;
- consentimientos;
- saldo;

por tener `pass.access`.

---

#### 44. Saldo y ledger

El saldo de puntos pertenece al modelo de fidelización del cliente.

Un permiso de entrada laboral-administrativa:

```text
pass.access
```

no habilita modificación del ledger.

Toda modificación requiere el contrato de servidor, permiso, actor, recurso, idempotencia y auditoría aplicables.

---

#### 45. Consentimientos y preferencias

Consentimientos y preferencias comerciales pertenecen al propósito cliente y de privacidad correspondiente.

Una relación laboral no permite utilizarlos, cambiarlos o ignorarlos por defecto.

Una acción laboral sobre esos datos requiere finalidad y capacidad explícitas.

---

#### 46. Acceso directo y deep link

Conocer un enlace de PASS no concede:

```text
CUSTOMER ACCESS
```

ni:

```text
LABOR ADMIN ACCESS
```

La superficie destino revalida su identidad y autorización propietarias.

SHELL no transforma un deep link en permiso.

---

#### 47. Tarjeta de SHELL

PASS permanece:

```text
ADJACENT_RESERVED
```

y no ingresa al grid laboral primario por la existencia de los dos grants base de `pass.access`.

La presentación futura de una superficie laboral PASS requerirá contrato explícito y no podrá confundirse con la entrada cliente.

---

#### 48. No tarjeta bloqueada por defecto

Para roles sin `pass.access`, SHELL no debe fabricar:

```text
Vento Pass
→ Bloqueada
```

como si PASS perteneciera al conjunto laboral primario.

La ausencia de elegibilidad laboral-administrativa conserva la superficie adyacente fuera de presentación.

---

#### 49. No promoción por owner o gerencia

Que `propietario` y `gerente_general` tengan elegibilidad base no convierte PASS completa en herramienta administrativa general.

La concesión queda acotada a:

```text
NT-CLIENT-ADMIN
```

y a superficies laborales-administrativas reales.

---

#### 50. No nuevas matrices locales

SHELL y PASS no pueden crear otra matriz como:

```text
if role === "owner" → allow
if role === "manager" → allow
```

para sustituir la decisión canónica.

Las listas locales solo pueden participar como presentación o transición controlada sin autoridad final.

---

#### 51. No reutilización de identidad cliente para elevar permisos

Se prohíbe derivar rol laboral desde:

- tier del cliente;
- nivel de fidelización;
- marca preferida;
- número de compras;
- saldo;
- email;
- teléfono;
- nombre;
- atributos autoadministrables.

La identidad cliente nunca eleva autoridad laboral.

---

#### 52. No reutilización de identidad laboral para ventajas cliente

La condición de trabajador tampoco concede automáticamente:

- puntos especiales;
- nivel cliente;
- recompensas;
- redenciones;
- acceso a compras;
- datos de otra cuenta.

Cualquier política comercial para empleados requerirá contrato propietario independiente.

---

#### 53. Separación de logout y sesión

Esta tarea no afirma que cliente y trabajador deban tener sesiones técnicas completamente distintas.

Sí fija que:

```text
SESIÓN TÉCNICA COMPARTIDA POSIBLE
≠
AUTORIZACIÓN COMPARTIDA
```

Cerrar o renovar una sesión debe respetar los contratos propietarios sin inferir permisos cruzados.

---

#### 54. Cambio de actor

Ante cambio efectivo de actor o usuario:

- se invalidan proyecciones laborales anteriores;
- se limpia simulación que no pertenezca al nuevo contexto;
- no se conserva rol/sede del actor anterior;
- no se conserva autoridad por haber estado visible previamente.

---

#### 55. Dispositivo compartido

Una estación laboral o POS compartido no utiliza la sesión del cliente como identidad del trabajador.

Las mutaciones laborales deben identificar al actor humano real conforme al contrato de dispositivo.

La sesión administrativa del dispositivo no transfiere privilegios al operador.

---

#### 56. Seguridad ante manipulación cliente

Cambiar desde el cliente:

- rol;
- sede;
- navegación;
- flags;
- estado React;
- AsyncStorage;
- parámetros;

no puede producir una decisión ALLOW en servidor.

La manipulación solo puede cambiar presentación no autoritativa o terminar en rechazo.

---

#### 57. Autoridad de SHELL

SHELL coordina:

- identidad laboral;
- contexto laboral;
- trabajo;
- presentación de accesos;
- handoff seguro.

SHELL no se convierte en fuente funcional de:

- fidelización;
- clientes;
- campañas;
- puntos;
- pedidos;
- canjes.

La siguiente tarea profundiza la prohibición general de absorber lógica de otras aplicaciones.

---

#### 58. Responsables ya existentes de las brechas físicas

Esta tarea no crea pendientes narrativos nuevos.

Las condiciones físicas observadas ya tienen propietarios canónicos, entre ellos:

| Brecha | Propietario canónico existente |
| --- | --- |
| inventario y frontera de superficies PASS | `AUTH-UI-009` y continuidad `AUTH-UI-*` |
| perfil laboral mínimo en PASS | `AUTH-UI-030` a `AUTH-UI-044`, `AUTH-DB-002`, `AUTH-SRV-*` |
| sedes laborales autorizadas | `AUTH-UI-022`, `AUTH-UI-037`, `AUTH-SRV-006`, `AUTH-SRV-012` |
| simulación de rol/sede | `AUTH-SIM-*`, `AUTH-UI-038`, `AUTH-SRV-015` |
| reconciliación de roles locales | `AUTH-CAT-003`, `AUTH-CAT-017` a `AUTH-CAT-019`, `AUTH-UI-026`, `AUTH-UI-045` |
| operaciones laborales PULSO/PASS | `PULSO-AUTH-016`, `PASS-INT-*`, `AUTH-SRV-*` |
| consumidores de autorización/contexto | `SHELL-AUTH-003` a `SHELL-AUTH-005` |

No se inventa otro owner.

---

#### 59. Resultado documental consolidado

```text
PASS
→ CUSTOMER APP
→ CUSTOMER IDENTITY DOMAIN
→ ADJACENT_RESERVED

CUSTOMER ACCESS
→ NO LABOR RBAC

pass.access
→ CANONICAL LABOR PERMISSION
→ BASE_ONLY
→ NT-CLIENT-ADMIN
→ NOT CUSTOMER AUTH

BASE GRANTS
→ propietario
→ gerente_general

DEFAULT NO GRANT
→ gerente
→ supervisor
→ auxiliar_administrativa
→ contador
→ marketing
→ trabajador_operativo

PASS RUNTIME SNAPSHOT
→ 15 CUSTOMER STACK SCREENS
→ 21 CUSTOMER/TRANSVERSE LOGICAL SURFACES
→ 0 EXCLUSIVE LABOR ROUTES
→ 3 EMBEDDED LABOR SURFACES

LOCAL ROLE ALLOWLIST
→ AS-IS ONLY
→ NOT AUTHORITY

PULSO PASS-RELATED OPERATIONS
→ REMAIN PULSO-OWNED WHEN CANONICAL CONTRACT SAYS SO

SHELL
→ DOES NOT CREATE CUSTOMER AUTH
→ DOES NOT INVENT PASS LABOR ROUTE
```

---

#### 60. Handoff a `SHELL-APP-013`

`SHELL-APP-013` recibe:

1. SHELL como coordinador y no propietaria de lógica PASS;
2. `pass.access` delimitado a entrada laboral-administrativa;
3. separación entre acceso de aplicación y capacidades funcionales internas;
4. operaciones de fidelización conservadas en sus owners canónicos;
5. PULSO como owner de sus superficies operativas relacionadas con PASS;
6. prohibición de convertir rutas o asociaciones temáticas en propiedad funcional;
7. prohibición de crear lógica de negocio en SHELL para resolver ausencia de contrato de otra aplicación;
8. obligación de revalidar autorización en la aplicación propietaria;
9. separación estricta entre presentación coordinada y ejecución funcional.

La siguiente tarea puede generalizar esta frontera a todas las aplicaciones sin reabrir la identidad cliente de PASS.

---

#### 61. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea consolida en SHELL decisiones ya protegidas por requisitos vigentes de AUTH, SHELL y PASS.

No altera reglas históricas, estados, relaciones ni secuencias del Registro Canónico de Requisitos de Prueba.

---

#### 62. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, la tarea reutiliza:

- `TREQ-AUTH-001` — una lista local de roles no concede autorización final;
- `TREQ-AUTH-006` — identidad cliente y campos privilegiados permanecen separados y minimizados;
- `TREQ-AUTH-007` — administración laboral requiere capacidad explícita y territorio válido;
- `TREQ-SHELL-001` — registro o permiso aislado no convierte una aplicación en capacidad operativa;
- `TREQ-SHELL-030` — visibilidad no sustituye autorización de servidor;
- `TREQ-SHELL-031` — simulación de rol/sede permanece separada de autoridad real;
- `TREQ-SHELL-080` — registro de consumidores conserva PASS con cero consumidores laborales por defecto;
- `TREQ-SHELL-086` — role allowlists, overrides y datos del caller no crean autoridad local;
- `TREQ-PASS-010` — identidad, cuenta, perfil, preferencias y consentimientos de cliente permanecen separados;
- `TREQ-PASS-015` — PASS conserva cero rutas exclusivamente laborales mientras no exista un delta aprobado;
- `TREQ-PASS-016` — controles laborales embebidos requieren perfil laboral vigente y capacidad aprobada;
- `TREQ-PASS-017` — perfil laboral mínimo vinculado al usuario autenticado;
- `TREQ-PASS-018` — sedes laborales de PASS proceden de asignaciones autorizadas;
- `TREQ-PASS-019` — rol/sede locales son simulación, no autoridad;
- `TREQ-PASS-020` — simulación laboral posee ciclo de vida y limpieza;
- `TREQ-PASS-021` — roles locales PASS deben reconciliarse con el catálogo canónico;
- `TREQ-PASS-022` — operaciones PULSO relacionadas con PASS requieren permisos exactos;
- `TREQ-PASS-034` — superficies PASS y PULSO se reconcilian sin duplicar ownership.

Estas referencias son trazabilidad heredada y no representan cambios del registro.

---

#### 63. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto aún no ha sido insertado ni compilado dentro de la rama local de `SHELL-APP-012`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía formateo, quality, delivery, topología ni batería documental sobre el checkout local de `SHELL-APP-012`. |
| REMOTA | PASS | Se verificaron el `main` posterior al cierre de `SHELL-APP-011`, continuidad, ruta normal, topología, políticas documentales, owner H2, handoff de `SHELL-APP-011`, catálogo y modalidad de PASS, matrices de ocho roles base, ADR de identidad, 04A de AUTH/SHELL/PASS, inventario `AUTH-UI-009` y el runtime vigente de PASS en el mismo commit de su snapshot aprobado. |
| OPERATIVA | NOT_APPLICABLE | La tarea define una frontera documental; no prueba sesiones reales de clientes, trabajadores, puntos, redenciones, POS ni navegación desplegada. |
| FÍSICA | NOT_APPLICABLE | La aprobación documental no crea ni autoriza una instancia `SHELL-APP-012::implementation_unit_id` y no modifica código, datos, Supabase, infraestructura ni despliegues. |

---

#### 64. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente`.
- [ ] `SHELL-APP-011` permanece como tarea anterior.
- [ ] `SHELL-APP-013` permanece como tarea siguiente.
- [ ] La tarea permanece exclusivamente documental.
- [ ] `PER_IMPLEMENTATION_UNIT` se conserva únicamente como topología física posterior.
- [ ] PASS conserva `app_code = pass`.
- [ ] PASS conserva tipo `Cliente`.
- [ ] PASS conserva dominio de identidad `Cliente`.
- [ ] PASS conserva roadmap `Adyacente`.
- [ ] PASS conserva `ADJACENT_RESERVED`.
- [ ] La identidad normal del cliente se mantiene separada de `employees`.
- [ ] `public.users` no sustituye identidad laboral.
- [ ] Una persona puede ser cliente y trabajador sin crear actor híbrido.
- [ ] Se conservan exactamente cuatro `actor_type`.
- [ ] `CUSTOMER` no recibe RBAC laboral por su identidad cliente.
- [ ] Un cliente válido no requiere `pass.access`.
- [ ] Un cliente válido no requiere `shell.access`.
- [ ] Un cliente sin empleado puede conservar su experiencia cliente.
- [ ] Un empleado sin perfil cliente no recibe identidad cliente por inferencia.
- [ ] `pass.access` se conserva; no se elimina.
- [ ] `pass.access` conserva modalidad `BASE_ONLY`.
- [ ] `pass.access` conserva alcance `NT-CLIENT-ADMIN`.
- [ ] `pass.access` se limita a entrada laboral-administrativa.
- [ ] `pass.access` no autentica clientes.
- [ ] `pass.access` no concede puntos.
- [ ] `pass.access` no concede redenciones.
- [ ] `pass.access` no expone automáticamente fidelización.
- [ ] `pass.access` no es permiso paraguas de PASS.
- [ ] Se conservan exactamente ocho roles base.
- [ ] `propietario` conserva grant de `pass.access`.
- [ ] `gerente_general` conserva grant de `pass.access`.
- [ ] `gerente` no recibe grant por defecto.
- [ ] `supervisor` no recibe grant por defecto.
- [ ] `auxiliar_administrativa` no recibe grant por defecto.
- [ ] `contador` no recibe grant por defecto.
- [ ] `marketing` no recibe grant por defecto.
- [ ] `trabajador_operativo` no recibe grant por defecto.
- [ ] El total queda en 2 grants y 6 denegaciones por defecto.
- [ ] Ningún rol obtiene bypass por nombre.
- [ ] Una concesión individual laboral no concede acceso cliente.
- [ ] Las denegaciones y bloqueos canónicos conservan precedencia.
- [ ] El snapshot PASS conserva 15 `Stack.Screen`.
- [ ] El snapshot PASS conserva 21 superficies cliente/transversales.
- [ ] PASS conserva 0 rutas exclusivamente laborales.
- [ ] PASS conserva 3 superficies laborales embebidas.
- [ ] `PASS-LABOR-SURFACE-001` no convierte Home en laboral.
- [ ] `PASS-LABOR-SURFACE-002` no se considera ruta laboral.
- [ ] `PASS-LABOR-SURFACE-003` permanece simulación no autoritativa.
- [ ] Home continúa clasificada como superficie cliente.
- [ ] El baseline compartido conserva 0 consumidores laborales PASS por defecto.
- [ ] Una superficie observada no se confunde con consumidor canónico registrado.
- [ ] No se inventa ruta laboral para utilizar `pass.access`.
- [ ] PASS no entra al grid laboral primario.
- [ ] Roles locales ingleses no son claves canónicas de autorización.
- [ ] `PRIVILEGED_ROLES` no se convierte en allowlist canónica.
- [ ] Los controles laborales requieren identidad y capacidad válidas.
- [ ] Un error laboral no invalida por sí solo una sesión cliente válida.
- [ ] La sede seleccionada localmente no se convierte en autoridad.
- [ ] AsyncStorage y estado React no conceden permisos.
- [ ] Simulación laboral no modifica identidad cliente ni autorización real.
- [ ] Operaciones de fidelización laborales usan permisos exactos.
- [ ] Operaciones PULSO permanecen atribuidas a PULSO cuando corresponda.
- [ ] `pos.main` no sustituye permisos atómicos.
- [ ] El personal recibe proyecciones mínimas de datos cliente.
- [ ] El saldo o ledger no se modifica por `pass.access`.
- [ ] Consentimientos no se modifican por relación laboral implícita.
- [ ] Deep links no conceden acceso.
- [ ] No se fabrica tarjeta PASS bloqueada para roles sin grant.
- [ ] Los dos grants base no promocionan PASS completa a herramienta administrativa.
- [ ] SHELL no crea matrices locales de roles.
- [ ] Identidad cliente no eleva autoridad laboral.
- [ ] Identidad laboral no concede ventajas cliente por inferencia.
- [ ] Compartir sesión técnica no equivale a compartir autorización.
- [ ] Cambio de actor invalida contexto/simulación anterior.
- [ ] Dispositivo compartido no transfiere privilegios.
- [ ] Manipulación cliente no produce ALLOW.
- [ ] Las brechas físicas conservan propietarios existentes.
- [ ] No se modifica catálogo.
- [ ] No se modifican matrices.
- [ ] No se modifican permisos.
- [ ] No se modifica Supabase.
- [ ] No se modifica runtime.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se desarrolla `SHELL-APP-013`.
- [ ] No se crea ni autoriza una instancia física.

---

#### 65. Límites

Esta tarea no:

- elimina `pass.access`;
- crea un permiso sustituto;
- cambia `BASE_ONLY`;
- cambia matrices aprobadas;
- crea grants;
- crea denies explícitos redundantes;
- cambia `public.users`;
- cambia `employees`;
- redefine autenticación cliente;
- crea SSO cliente;
- crea account linking;
- crea una identidad híbrida;
- modifica puntos;
- modifica ledger;
- modifica redenciones;
- modifica pedidos;
- modifica campañas;
- modifica consentimientos;
- modifica preferencias;
- modifica perfil de cliente;
- crea rutas laborales PASS;
- crea tarjetas PASS en SHELL;
- crea consumidores nuevos de autorización/contexto;
- modifica el registro de consumidores;
- corrige los aliases locales de roles;
- corrige `PRIVILEGED_ROLES`;
- implementa simulación canónica;
- corrige el Header de PASS;
- modifica PULSO;
- mueve ownership de PULSO a PASS;
- cambia `SafeContextProjectionV1`;
- cambia `SafeDecisionProjectionV1`;
- cambia RLS;
- cambia RPC;
- modifica migraciones;
- modifica Supabase;
- modifica datos;
- cambia configuración;
- despliega;
- crea una instancia física;
- autoriza implementación física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica 04A;
- desarrolla lógica funcional de otras aplicaciones reservada a `SHELL-APP-013`.

---

#### 66. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente`

**TAREA ACTUAL APROBADA**
`SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones`


### ✅ SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente
**Tarea siguiente:** SHELL-APP-014 — Definir retorno seguro entre aplicaciones
**Tipo de tarea:** definición técnico-documental de la frontera de propiedad funcional de SHELL; fija qué puede coordinar, proyectar y presentar el Hub sin absorber procesos, reglas de negocio, consultas propietarias, mutaciones, estados ni autoridad de otras aplicaciones, conservando `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** contrato documental de no absorción funcional definido para SHELL sobre las diez aplicaciones canónicas, la propiedad vigente de 69 procesos, los ítems de trabajo, proyecciones y comandos entre aplicaciones, sin modificar runtime ni crear instancia física
**Cambios físicos autorizados:** ninguno; no se modifican código, rutas, componentes, contratos, procesos, ownership, permisos, Supabase, datos, RLS, RPC, migraciones, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir una frontera verificable para que SHELL siga siendo el Hub coordinador de Vento OS sin convertirse en una aplicación monolítica que replique o ejecute la lógica funcional de ANIMA, VISO, NEXO, FOGO, ORIGO, PULSO, NUMERA, AURA o PASS.

La regla central queda:

```text
SHELL
→ COORDINA
→ PROYECTA
→ PRESENTA
→ NAVEGA
→ ENTREGA REFERENCIAS SEGURAS

SHELL
≠ PROPIETARIA UNIVERSAL
≠ MOTOR DE PROCESOS AJENOS
≠ FUENTE DE VERDAD DE DOMINIOS AJENOS
≠ AUTORIZADOR UNIVERSAL
≠ ESCRITOR UNIVERSAL
```

La presencia de una tarea, dato, enlace, resumen, botón o estado de otra aplicación dentro del Hub no transfiere ownership ni permite reimplementar su comportamiento.

---

#### 2. Handoff recibido de `SHELL-APP-012`

Se reciben sin reapertura:

1. SHELL como coordinador y no propietaria de lógica PASS;
2. `pass.access` delimitado a entrada laboral-administrativa;
3. separación entre acceso de aplicación y capacidades funcionales internas;
4. operaciones de fidelización conservadas en sus owners canónicos;
5. PULSO como owner de sus superficies operativas relacionadas con PASS;
6. prohibición de convertir rutas o asociaciones temáticas en propiedad funcional;
7. prohibición de crear lógica de negocio en SHELL para resolver ausencia de contrato de otra aplicación;
8. obligación de revalidar autorización en la aplicación propietaria;
9. separación estricta entre presentación coordinada y ejecución funcional.

Esta tarea generaliza esas reglas a las diez aplicaciones canónicas.

---

#### 3. Problema que se resuelve

Un Hub transversal necesita conocer suficiente información para:

- mostrar contexto;
- presentar trabajo pendiente;
- explicar accesos;
- abrir aplicaciones;
- coordinar handoffs;
- mostrar referencias y proyecciones mínimas.

Ese rol transversal puede degenerar en un anti-patrón si SHELL comienza a:

- consultar tablas ajenas para reconstruir reglas de negocio;
- ejecutar mutaciones de otra aplicación;
- copiar formularios de dominio;
- decidir estados de procesos ajenos;
- reproducir validaciones propietarias;
- implementar un fallback local cuando un servicio o aplicación no está disponible;
- completar tareas por el solo hecho de mostrarlas;
- compensar o corregir hechos ajenos;
- centralizar toda operación porque el Hub ya presenta el acceso.

La tarea bloquea esa deriva antes de materializar la experiencia final de navegación.

---

#### 4. Principio rector de propiedad funcional

La propiedad se obtiene de los contratos canónicos de proceso, capacidad, fuente y trabajo.

No se obtiene de:

```text
UBICACIÓN DEL CÓDIGO
NOMBRE DEL REPOSITORIO
NOMBRE DE UNA TABLA
NOMBRE DE UNA PANTALLA
RUTA O DEEP LINK
ÚLTIMO ESCRITOR
APLICACIÓN QUE PRESENTA EL DATO
APLICACIÓN QUE DISPARA LA NAVEGACIÓN
APLICACIÓN QUE RECIBE UN EVENTO
APLICACIÓN QUE MUESTRA UN WORK ITEM
```

Mover o reutilizar una representación técnica no cambia por sí mismo el owner funcional.

---

#### 5. Qué se considera lógica funcional de otra aplicación

Para esta tarea, constituye lógica funcional ajena cualquier comportamiento que defina o altere el significado empresarial de un dominio cuyo owner no es SHELL.

Incluye, entre otros:

1. validar una regla empresarial propietaria;
2. decidir una transición de estado de proceso;
3. crear, modificar, cancelar, cerrar, revertir o compensar un hecho empresarial;
4. calcular un resultado que sea fuente de verdad del dominio;
5. resolver elegibilidad empresarial propia de la aplicación;
6. interpretar un recurso para decidir un estado funcional;
7. ejecutar una consulta que reconstruya semántica propietaria desde datos crudos;
8. modificar tablas, RPC, endpoints o recursos de otra propietaria;
9. mantener formularios de dominio que produzcan la mutación propietaria;
10. ejecutar claim, start, completion, cancelación o reasignación de trabajo ajeno;
11. fabricar una regla sustitutiva cuando el owner o su contrato no estén disponibles;
12. corregir directamente un dato ajeno para “sincronizar” aplicaciones.

---

#### 6. Qué no demuestra ownership

Ninguna de estas condiciones transfiere propiedad funcional a SHELL:

- el dato aparece en el home;
- el dato se usa para ordenar o presentar una referencia autorizada;
- existe una tarjeta de aplicación;
- SHELL conoce el `AppCode`;
- SHELL conoce un `ProcessId`;
- SHELL conoce un `work_item_id`;
- el repositorio `vento-shell` contiene un contrato compartido;
- el repositorio `vento-shell` contiene una migración de Supabase;
- una librería compartida vive dentro del workspace técnico;
- SHELL recibe un evento;
- SHELL participa en un handoff;
- SHELL inicia navegación hacia el owner;
- una aplicación se encuentra temporalmente indisponible.

---

#### 7. Fuente canónica de ownership

La proyección materializada de propiedad funcional conserva como autoridades:

```text
PROC-CAT-005
PROC-APPLICATION-OWNERSHIP-REGISTRY-001
CAP-MAP-008
SHELL-CON-015
SHELL-CON-016
```

Para procesos:

```text
process_id
→ owner_app_code
→ authority_ref
```

Para una capacidad específica, la fuente aplicable debe resolverse con la granularidad aprobada.

Una referencia no resuelta no puede completarse por inferencia desde nombres, tablas, repositorios, rutas o UI.

---

#### 8. Universo vigente de propiedad de procesos

El contrato materializado de ownership conserva:

```text
CANONICAL_APP_CODES = 10
PROCESS_OWNER_APP_CODES_USED = 9
CANONICAL_PROCESSES = 69
SHELL_OWNED_PROCESSES = 0
NON_SHELL_OWNED_PROCESSES = 69
```

La distribución vigente es:

| `owner_app_code` | Procesos propietarios |
| --- | ---: |
| `shell` | 0 |
| `anima` | 1 |
| `viso` | 20 |
| `nexo` | 16 |
| `fogo` | 6 |
| `origo` | 4 |
| `pulso` | 12 |
| `numera` | 7 |
| `aura` | 2 |
| `pass` | 1 |
| **Total** | **69** |

La diferencia entre diez aplicaciones canónicas y nueve aplicaciones propietarias de procesos es deliberada.

---

#### 9. Matriz de frontera por aplicación

| Aplicación | Dominio o rol canónico resumido | Procesos propios vigentes | Lo que SHELL puede hacer | Lo que SHELL no absorbe |
| --- | --- | ---: | --- | --- |
| `shell` | Hub laboral y coordinación | 0 | presentar home, contexto permitido, trabajo proyectado, accesos y navegación | apropiarse de los 69 procesos ajenos |
| `anima` | fuerza laboral, asistencia y relación del trabajador | 1 | mostrar referencias o trabajo autorizado y abrir ANIMA | turnos, asistencia, documentos o lógica laboral propietaria |
| `viso` | administración, gobierno, seguridad y supervisión | 20 | mostrar obligaciones administrativas autorizadas y abrir VISO | mutaciones administrativas, decisiones o gobierno de otros dominios |
| `nexo` | inventario y logística | 16 | proyectar tareas o referencias mínimas y abrir NEXO | stock, remisiones, ubicaciones, movimientos, activos o logística |
| `fogo` | producción | 6 | proyectar trabajo productivo autorizado y abrir FOGO | lotes, órdenes, recetas, consumo o ejecución productiva |
| `origo` | compras y abastecimiento | 4 | proyectar obligaciones autorizadas y abrir ORIGO | órdenes, proveedores, recepción o decisiones de abastecimiento |
| `pulso` | POS, ventas, pedidos, pagos, salón y fidelización operativa | 12 | mostrar referencias autorizadas y abrir PULSO | ventas, pedidos, pagos, caja, puntos, redenciones o entregas |
| `numera` | costos, gastos, rentabilidad y finanzas | 7 | mostrar referencias o trabajo financiero autorizado y abrir NUMERA | cálculo financiero fuente, conciliación, costos o cierres propietarios |
| `aura` | aplicación administrativa laboral diferida | 2 | conservar su identidad y estado canónico cuando corresponda | implementar su producto o lógica por estar diferida |
| `pass` | producto cliente adyacente | 1 | respetar la frontera adyacente y handoffs explícitos autorizados | identidad cliente, cuenta, pedidos, puntos, recompensas o lógica cliente |

La matriz conserva el owner vigente; no reasigna procesos.

---

#### 10. Cero procesos de SHELL no significa cero responsabilidad propia

`SHELL_OWNED_PROCESSES = 0` se refiere al registro canónico vigente de 69 procesos empresariales.

No significa que la aplicación SHELL carezca de comportamiento propio.

SHELL sí posee responsabilidades de Hub, entre ellas:

- entrada al ecosistema laboral;
- composición del home de SHELL;
- presentación de contexto permitido;
- presentación de trabajo proyectado;
- presentación de accesos;
- explicación segura de bloqueos;
- navegación y coordinación entre superficies;
- gestión de su propia experiencia de sesión conforme a contratos compartidos.

Esas responsabilidades no convierten a SHELL en propietaria de los procesos empresariales que presenta.

---

#### 11. Responsabilidades legítimas de SHELL

SHELL puede implementar lógica propia cuando el efecto pertenece al Hub y no modifica significado empresarial ajeno.

Ejemplos admitidos:

1. componer regiones del home aprobadas;
2. renderizar un catálogo canónico de accesos;
3. consumir proyecciones seguras de contexto y autorización;
4. mostrar referencias mínimas de work items autorizados;
5. presentar estados de disponibilidad y bloqueo según contratos aprobados;
6. elegir composición responsive de su propia UI;
7. formatear datos ya proyectados sin cambiar su semántica;
8. conservar estado puramente visual que no conceda autoridad ni altere un proceso;
9. abrir el destino propietario con referencias autorizadas;
10. propagar correlación técnica no autoritativa cuando el contrato aplicable lo permita.

---

#### 12. Presentar no equivale a ejecutar

Se conserva:

```text
MOSTRAR
≠ EJECUTAR

NAVEGAR
≠ MUTAR

PROYECTAR
≠ POSEER

CONOCER UNA REFERENCIA
≠ AUTORIZAR

MOSTRAR UNA ACCIÓN
≠ APLICAR SU EFECTO
```

La UI de SHELL puede hacer visible una posibilidad sin convertirse en el ejecutor de la capacidad empresarial.

---

#### 13. Referencias y proyecciones no adquieren propiedad

Las representaciones compartidas admitidas por el contrato de ownership incluyen:

```text
REFERENCE
PROJECTION
CONTROLLED_CACHE
DERIVED_RESULT
EVIDENCE_COPY
```

Una referencia, proyección, caché controlada o copia de evidencia no adquiere autoridad sobre el original.

SHELL debe conservar esa separación.

---

#### 14. `DERIVED_RESULT` de presentación

Un resultado derivado puede pertenecer a SHELL únicamente cuando su semántica sea propia de la presentación y no reescriba el hecho fuente.

Ejemplos compatibles:

- formatear una fecha ya autorizada;
- agrupar visualmente elementos que ya llegaron en una proyección autorizada;
- contar únicamente elementos ya visibles y permitidos cuando ese conteo no revele filas ocultas;
- truncar o adaptar copy para el dispositivo;
- elegir una disposición visual.

No son resultados de presentación:

- recalcular prioridad empresarial;
- reconstruir saldo;
- determinar stock disponible;
- decidir una aprobación;
- calcular un costo fuente;
- inferir readiness del proceso;
- reconstruir un estado ausente desde campos parciales.

---

#### 15. Work items

El contrato de trabajo conserva:

```text
owner_app_code
```

como propietaria empresarial de cada obligación runtime.

SHELL puede mostrar una proyección autorizada del work item, pero no adquiere por ello ownership.

Se conserva:

```text
ELIGIBILITY
≠ OFFER
≠ ASSIGNMENT
≠ CLAIM
≠ EXECUTION
≠ COMPLETION
```

Abrir, visualizar o navegar desde SHELL no produce claim, start, completion ni cancelación.

---

#### 16. Estado de trabajo y aplicación propietaria

Cuando un work item aparece en SHELL:

- su `work_item_id` permanece opaco;
- su `owner_app_code` permanece vigente;
- su estado procede del owner o contrato compartido autorizado;
- su `next_action_code` no concede permiso;
- su versión debe conservarse;
- la acción real se revalida en la autoridad propietaria;
- SHELL no fabrica una transición local para mantener fluidez visual.

---

#### 17. Handoff no transfiere ownership automáticamente

Un handoff puede transferir trabajo, custodia o responsabilidad de atención sin transferir automáticamente la propiedad del hecho empresarial.

Por tanto:

```text
HANDOFF
≠ OWNER CHANGE
```

SHELL puede coordinar el handoff conforme al contrato compartido, pero no interpreta la recepción como permiso para modificar el dominio de la aplicación origen o destino.

---

#### 18. Lectura cross-app

SHELL no deberá crear consultas propietarias para reconstruir desde datos crudos el significado interno de otra aplicación.

La lectura transversal debe preferir:

```text
PROYECCIÓN CANÓNICA
REFERENCIA COMPARTIDA
CONTRATO DE LECTURA AUTORIZADO
```

La proyección debe ser mínima, versionada, atribuible y compatible con la finalidad de SHELL.

Una consulta directa que copie reglas, filtros, joins o interpretación empresarial de otra aplicación constituye acoplamiento funcional y no se vuelve válida por ser de solo lectura.

---

#### 19. Escritura cross-app

SHELL no escribe directamente el estado privado de otra propietaria.

La secuencia canónica es:

```text
SHELL COMO CONSUMIDOR AUTORIZADO
→ SOLICITA ACCIÓN MEDIANTE CONTRATO
→ OWNER REVALIDA ACTOR, AUTORIZACIÓN, CONTEXTO, ESTADO, VERSIÓN Y RECURSO
→ OWNER APLICA O RECHAZA
→ OWNER CONFIRMA RESULTADO
→ SHELL PRESENTA RESULTADO SEGURO
```

La presentación de la acción en el Hub no concede autoridad de escritura.

---

#### 20. Comando propietario

Cuando exista un comando cross-app aprobado, SHELL puede actuar como consumidor únicamente dentro del contrato declarado.

El comando no permite a SHELL:

- modificar directamente la tabla fuente;
- llamar una mutación ajena sin contrato;
- omitir autorización del owner;
- omitir versión o idempotencia cuando apliquen;
- convertir una respuesta parcial en éxito;
- cambiar a otro endpoint para forzar el efecto;
- reproducir localmente el efecto ante error.

---

#### 21. Confirmación del owner antes del éxito

SHELL no presenta una mutación ajena como completada hasta recibir un resultado confirmado por la autoridad propietaria.

Se prohíbe:

```text
CLICK
→ ÉXITO OPTIMISTA EMPRESARIAL IRREVERSIBLE
```

cuando el efecto fuente todavía no ha sido confirmado.

Los estados visuales transitorios deben permanecer diferenciados de un hecho empresarial confirmado.

---

#### 22. Ausencia de contrato

Si SHELL necesita una capacidad de otra aplicación y no existe contrato suficiente:

```text
NO CONTRACT
→ NO LOCAL REIMPLEMENTATION
→ NO DIRECT DATABASE FALLBACK
→ NO FOREIGN MUTATING RPC
→ NO INVENTED BUSINESS RULE
```

La ausencia de contrato es una restricción que debe conservarse.

No se resuelve absorbiendo la lógica en el Hub.

---

#### 23. Owner no disponible

Si la aplicación o servicio propietario no está disponible:

- SHELL no ejecuta un sustituto local;
- no modifica el recurso mediante otra aplicación;
- no afirma que la operación quedó completada;
- conserva la referencia y el estado seguro que pueda demostrar;
- diferencia indisponibilidad técnica de denegación y de resultado empresarial;
- ofrece únicamente recuperación o navegación permitida por contratos existentes.

La continuidad de contexto y retorno se define en tareas posteriores.

---

#### 24. Proyección stale, incompleta o inválida

SHELL no convierte una proyección stale, incompleta o inválida en una nueva fuente de verdad.

Resultado:

```text
STALE
→ REFRESH O BLOQUEO SEGURO

INCOMPLETE
→ ESTADO INCOMPLETO EXPLÍCITO

INVALID
→ NO INTERPRETAR COMO HECHO EMPRESARIAL
```

No se completan campos faltantes mediante inferencias locales.

---

#### 25. Error técnico no equivale a resultado funcional

Se conserva la separación:

```text
ERROR TÉCNICO
≠ DENY
≠ CANCELLED
≠ COMPLETED
≠ NO_WORK_AVAILABLE
≠ SIN STOCK
≠ SALDO CERO
≠ PROCESO RECHAZADO
```

SHELL presenta el error técnico de forma segura sin fabricar el outcome del dominio propietario.

---

#### 26. Autorización y lógica funcional permanecen separadas

SHELL puede consumir la decisión canónica de autorización necesaria para su presentación.

Eso no lo autoriza a reproducir la autorización interna de cada acción de otra aplicación.

La aplicación propietaria debe revalidar la acción real.

Se conserva:

```text
VISIBILIDAD EN SHELL
≠ AUTORIZACIÓN FINAL DE LA ACCIÓN
```

---

#### 27. `app.access` no equivale a capacidad interna

Los permisos de entrada siguen separados de las capacidades funcionales específicas.

Ejemplos:

```text
nexo.access
≠ registrar retiro

fogo.access
≠ crear lote

origo.access
≠ aprobar compra

pulso.access
≠ otorgar puntos

pass.access
≠ administrar cuenta cliente
```

SHELL no transforma una decisión de entrada en autoridad para funciones internas.

---

#### 28. Código compartido no equivale a lógica de SHELL

El repositorio `vento-shell` contiene fundaciones compartidas que pueden ser consumidas por varias aplicaciones.

La ubicación física de un contrato en ese repositorio no convierte su semántica en propiedad de la aplicación `shell`.

Se mantiene la separación:

```text
vento-shell
→ REPOSITORIO TÉCNICO

shell
→ APP_CODE DEL HUB

@vento/contracts/*
@vento/os-context/*
otros paquetes compartidos aprobados
→ FUNDACIONES TRANSVERSALES SEGÚN SU CONTRATO
```

---

#### 29. Ownership técnico y funcional

Un mismo repositorio puede alojar:

- aplicación SHELL;
- paquetes compartidos;
- validadores;
- migraciones;
- contratos;
- tooling de CI.

Esto no autoriza la ecuación:

```text
ARCHIVO EN vento-shell
→ OWNER FUNCIONAL = shell
```

El owner funcional continúa resolviéndose desde las autoridades canónicas aplicables.

---

#### 30. Supabase en `vento-shell`

La gobernanza del proyecto exige que las modificaciones de Supabase de VENTO se creen, versionen, documenten y ejecuten desde `vento-shell`.

Esa regla de repositorio no cambia la propiedad empresarial del dato.

Por tanto:

```text
MIGRACIÓN UBICADA EN vento-shell
≠ DATO PROPIEDAD DE shell

RPC IMPLEMENTADA DESDE vento-shell
≠ CAPACIDAD PROPIEDAD DE shell
```

Una futura modificación de Supabase deberá seguir respetando el owner funcional, la autorización y los contratos del dominio afectado.

---

#### 31. Criterios para promover algo a fundación compartida

Una lógica no se vuelve compartida por conveniencia técnica.

Antes de promoverla debe existir una decisión canónica que identifique, como mínimo:

1. owner semántico o autoridad fuente;
2. finalidad transversal real;
3. contrato verificable;
4. namespace y versión;
5. consumidores declarados;
6. límites de renderer o plataforma cuando apliquen;
7. comportamiento ante incompatibilidad;
8. pruebas del package y consumidores;
9. estrategia de rollback;
10. ausencia de absorción de reglas de dominio propietarias.

Sin esa decisión, la lógica permanece en su aplicación o renderer propietario.

---

#### 32. Ser genérico o puro no basta

No se promoverá a SHELL o a un paquete compartido una superficie únicamente porque:

- esté escrita en TypeScript;
- sea una función pura;
- se repita en dos lugares;
- parezca reutilizable;
- tenga un nombre genérico;
- no use componentes visuales;
- sea fácil de mover;
- viva cerca de un contrato compartido.

La semántica y el owner prevalecen sobre la forma técnica.

---

#### 33. Patrones cross-app prohibidos

Se preservan como incompatibles con esta frontera:

```text
DIRECT_FOREIGN_TABLE_WRITE
DIRECT_FOREIGN_RPC_WITHOUT_CONTRACT
CLIENT_MULTI_OWNER_TRANSACTION
SHARED_SCHEMA_OWNER_BYPASS
TRIGGER_CASCADE_INTO_FOREIGN_DOMAIN
WORKER_OR_CRON_FOREIGN_MUTATION
WEBHOOK_DIRECT_FOREIGN_MUTATION
CONSUMER_PROJECTION_AS_SOURCE_WRITE
MANUAL_SQL_CROSS_DOMAIN_REPAIR
BATCH_OR_IMPORT_CROSS_DOMAIN_WRITE
COMPENSATION_BY_FOREIGN_EDIT
SHELL_OR_ADMIN_HUB_FOREIGN_MUTATION
```

En particular, SHELL no adquiere escritura universal por presentar una acción.

---

#### 34. ANIMA

SHELL puede presentar información laboral mínima o un work item cuyo owner sea ANIMA.

No puede sustituir a ANIMA para:

- registrar asistencia;
- decidir una marcación;
- administrar documentos laborales;
- modificar un hecho propio de la relación del trabajador;
- completar una etapa propietaria por navegación.

---

#### 35. VISO

SHELL puede presentar una obligación administrativa o referencia segura de VISO.

No puede convertir el Hub en consola universal para:

- administrar seguridad;
- modificar roles o permisos;
- publicar decisiones propietarias de VISO;
- mutar datos de otros dominios porque VISO los supervise.

Presentar una decisión no transfiere propiedad de escritura.

---

#### 36. NEXO

SHELL puede mostrar una referencia autorizada a una remisión, conteo, retiro, ubicación, activo u obligación logística cuando el contrato de trabajo lo permita.

No puede:

- recalcular stock;
- registrar movimientos;
- preparar o recibir remisiones;
- asignar ubicaciones;
- crear traslados;
- ejecutar conteos;
- corregir inventario.

Esas acciones permanecen en NEXO y sus contratos propietarios.

---

#### 37. FOGO

SHELL puede proyectar una tarea de producción y abrir FOGO.

No puede:

- crear lotes;
- registrar consumo;
- determinar ejecución productiva;
- modificar recetas;
- cerrar producción;
- reemplazar FOGO porque su superficie esté indisponible.

---

#### 38. ORIGO

SHELL puede presentar obligaciones relacionadas con compra, proveedor o recepción cuando exista una proyección autorizada.

No puede:

- crear o aprobar órdenes por inferencia;
- modificar proveedores;
- registrar recepción física;
- alterar el ciclo de abastecimiento;
- convertir una vista transversal en owner de compras.

---

#### 39. PULSO

SHELL puede abrir PULSO o presentar referencias mínimas autorizadas.

No puede:

- registrar ventas;
- modificar pedidos;
- cobrar;
- cerrar caja;
- entregar pedidos;
- otorgar puntos;
- validar redenciones;
- ejecutar operaciones PULSO relacionadas con PASS.

Las superficies operativas relacionadas con PASS permanecen PULSO-owned cuando así lo establece el contrato canónico.

---

#### 40. NUMERA

SHELL puede presentar una obligación financiera o referencia autorizada.

No puede reconstruir ni convertirse en fuente de:

- costos;
- gastos;
- rentabilidad;
- punto de equilibrio;
- conciliaciones;
- reportes financieros fuente.

Un resumen visible no convierte al Hub en motor financiero.

---

#### 41. AURA

AURA conserva su identidad canónica y sus procesos propietarios aunque su roadmap permanezca diferido.

El diferimiento no autoriza:

```text
AURA NO DISPONIBLE
→ IMPLEMENTAR SU LÓGICA EN SHELL
```

SHELL conserva la reserva y no crea una implementación sustituta.

---

#### 42. PASS

PASS permanece como aplicación cliente adyacente y conserva su proceso propietario.

SHELL no absorbe:

- identidad cliente;
- perfil;
- pedidos;
- preferencias;
- consentimientos;
- fidelización;
- puntos;
- recompensas;
- redenciones.

La frontera específica de `pass.access` aprobada en `SHELL-APP-012` permanece intacta.

---

#### 43. Estado AS-IS de la página principal de SHELL

El runtime vigente de `src/app/page.tsx` conserva principalmente:

- catálogo local de cinco accesos;
- resolución legacy de `has_permission` para entrada;
- tarjetas `Disponible` o `Sin acceso`;
- navegación hacia aplicaciones;
- sesión y cierre de sesión;
- placeholders de perfil y configuración ya inventariados.

No se utiliza esta tarea para corregir ese catálogo local, la compatibilidad legacy de autorización, los estados de bloqueo o los placeholders.

Esas brechas conservan sus propietarios y tareas ya aprobadas o reservadas.

---

#### 44. No utilizar el Hub como fallback funcional

Cuando una aplicación tenga una brecha, deuda o feature pendiente, SHELL no debe “resolverla” incorporando temporalmente el formulario o regla al Hub.

Se prohíbe:

```text
OWNER INCOMPLETO
→ COPIA EN SHELL

OWNER CAÍDO
→ FLUJO LOCAL EN SHELL

CONTRATO AUSENTE
→ QUERY DIRECTA

ENDPOINT FALLA
→ WRITE DIRECTO
```

Una solución temporal sigue requiriendo owner, contrato, autorización, evidencia y retiro gobernado.

---

#### 45. No duplicar lógica para mejorar UX

Reducir pasos de navegación no justifica duplicar lógica funcional.

Una experiencia más directa debe lograrse mediante:

- deep link autorizado;
- handoff contractual;
- comando propietario explícito;
- proyección mínima;
- componente compartido aprobado cuando corresponda.

No mediante una segunda implementación de la misma regla dentro de SHELL.

---

#### 46. No usar eventos como comandos

Recibir o conocer un evento empresarial no autoriza a SHELL a ejecutar la acción que produjo ese evento ni una mutación compensatoria.

Se conserva:

```text
EVENTO
→ HECHO CONFIRMADO

EVENTO
≠ COMANDO
≠ PERMISO
≠ TRANSFERENCIA DE OWNER
```

---

#### 47. No convertir observabilidad en autoridad

Logs, métricas, auditoría, correlación y evidencia pueden permitir que SHELL o herramientas transversales expliquen o diagnostiquen un estado.

No permiten:

- corregir el recurso;
- saltar el owner;
- repetir una mutación;
- conceder permiso;
- declarar completado un proceso.

---

#### 48. Respuesta segura cuando la lógica pertenece a otra aplicación

| Condición observada en SHELL | Respuesta segura | Respuesta prohibida |
| --- | --- | --- |
| proyección válida | presentar la información permitida | reinterpretar el dato como fuente local |
| acción disponible con owner válido | abrir el owner o solicitar el comando aprobado | ejecutar mutación directa |
| owner indisponible | informar indisponibilidad y preservar referencia | implementar fallback empresarial |
| contrato ausente | bloquear la acción local | inventar endpoint, regla o query |
| proyección stale | refrescar o bloquear | usarla como autoridad vigente |
| proyección incompleta | mostrar incompletitud | rellenar por inferencia |
| deny del owner | presentar razón segura cuando exista | buscar otro carril para forzar allow |
| error técnico | presentar error técnico | convertirlo en resultado empresarial |
| resultado pendiente | mantener pending | mostrar éxito antes de confirmación |
| work item visible | abrir o referenciar según contrato | marcarlo iniciado o completado |

---

#### 49. Ownership no resuelto

Cuando la autoridad compartida no pueda resolver el owner con suficiente granularidad:

```text
OWNER = UNRESOLVED
→ NO INFERIR
→ NO MATERIALIZAR LÓGICA EN SHELL
```

La resolución debe volver a las autoridades canónicas de propiedad y capacidad ya existentes.

Esta tarea no crea un nuevo owner ni una tarea administrativa paralela.

---

#### 50. Separación con `SHELL-APP-014`

Esta tarea define que SHELL puede coordinar navegación sin ejecutar la lógica propietaria.

No define todavía:

- forma final del retorno entre aplicaciones;
- validación completa de `returnTo`;
- allowlist de destinos de retorno;
- expiración del retorno;
- compatibilidad de deep links;
- recuperación del origen tras una aplicación externa.

Esas decisiones permanecen reservadas a `SHELL-APP-014`.

---

#### 51. Separación con `SHELL-APP-015`

Esta tarea exige no fabricar contexto funcional durante una transición.

No define todavía qué partes del contexto se conservan al cambiar de aplicación ni cómo se revalidan después del cambio.

Esa responsabilidad permanece reservada a `SHELL-APP-015`.

---

#### 52. Separación con `SHELL-APP-016`

Esta tarea establece que mostrar o navegar desde un work item no modifica su lifecycle.

No define todavía cuándo una tarea en curso debe conservarse entre aplicaciones, cómo se reanuda o cómo se trata una interrupción.

Esa responsabilidad permanece reservada a `SHELL-APP-016`.

---

#### 53. Decisión documental consolidada

```text
CANONICAL APPS
→ 10

CANONICAL PROCESSES
→ 69

SHELL PROCESS OWNERSHIP
→ 0

SHELL
→ HUB
→ COORDINATOR
→ PRESENTATION OWNER OF ITS OWN SURFACES
→ CONSUMER OF SAFE REFERENCES/PROJECTIONS
→ NAVIGATION COORDINATOR

FOREIGN DOMAIN
→ OWNER APP RETAINS BUSINESS AUTHORITY

REFERENCE / PROJECTION / CACHE / EVIDENCE
→ NO OWNERSHIP TRANSFER

WORK ITEM DISPLAY
→ NO CLAIM
→ NO START
→ NO COMPLETE

CROSS-APP MUTATION
→ EXPLICIT CONTRACT
→ OWNER REVALIDATES
→ OWNER MUTATES
→ OWNER CONFIRMS

NO CONTRACT / OWNER UNAVAILABLE
→ NO SHELL FALLBACK BUSINESS LOGIC

vento-shell REPOSITORY
→ MAY HOST SHARED FOUNDATION AND SUPABASE CHANGES
→ DOES NOT MAKE shell APP UNIVERSAL OWNER

SHARED PROMOTION
→ REQUIRES CANONICAL OWNER + CONTRACT + CONSUMERS + TESTS + ROLLBACK

SHELL-APP-014
→ RETORNO SEGURO RESERVADO

SHELL-APP-015
→ CONSERVACIÓN DE CONTEXTO RESERVADA

SHELL-APP-016
→ CONSERVACIÓN DE TAREA EN CURSO RESERVADA
```

---

#### 54. Handoff a `SHELL-APP-014`

`SHELL-APP-014` recibe:

1. SHELL como coordinador sin ownership universal;
2. 69 procesos conservados en sus nueve aplicaciones propietarias vigentes;
3. navegación separada de ejecución funcional;
4. referencias, proyecciones y work items sin transferencia de ownership;
5. aplicación destino obligada a revalidar autorización, contexto, estado, versión y recurso;
6. handoff separado de cambio de owner;
7. ausencia de fallback funcional en SHELL cuando el destino está indisponible;
8. error técnico separado del resultado empresarial;
9. navegación que no produce claim, start ni completion;
10. detalle de retorno seguro todavía no definido.

La siguiente tarea puede definir el retorno cross-app sin reabrir la propiedad funcional.

---

#### 55. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea consolida para SHELL fronteras ya protegidas por contratos y requisitos vigentes de autorización, ownership, integración, trabajo y sharing.

No modifica el Registro Canónico de Requisitos de Prueba.

---

#### 56. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-AUTH-001` — una lista local de roles o presentación no concede autorización final;
- `TREQ-SHELL-001` — una aplicación no se considera operativa por la sola existencia de un registro o permiso; requiere owner, alcance, proceso y superficie verificables;
- `TREQ-SHELL-002` — responsabilidades compartidas deben provenir de implementación compartida, generada o local explícitamente clasificada;
- `TREQ-SHELL-003` — identidad, destino, estado y disponibilidad de aplicaciones proceden del catálogo canónico;
- `TREQ-SHELL-057` — pantallas, layouts, formularios de dominio, composición de procesos, consultas propias y capacidades de plataforma permanecen en el renderer o aplicación propietaria salvo sharing canónico completo;
- `TREQ-SHELL-063` — la frontera cliente/servidor de contexto y autorización no permite convertir proyecciones o lógica cliente en autoridad;
- `TREQ-INTEGRATION-006` — cada dato empresarial se captura en su aplicación propietaria y se propaga mediante contratos o eventos aprobados;
- `TREQ-INTEGRATION-288` a `TREQ-INTEGRATION-317` — requisitos vigentes derivados de `INT-APP-010` que protegen la prohibición de escrituras cruzadas sin contrato y sus controles asociados.

Estas referencias constituyen trazabilidad heredada.

No actualizan 04A.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto aún no ha sido insertado ni sometido a `docs:plan:build` en la rama local de `SHELL-APP-013`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía formateo, quality, delivery, topología ni batería documental sobre el checkout local de `SHELL-APP-013`. |
| REMOTA | PASS | Se verificaron `main` en `fe6e34235b842b7470d51701e7d25b777f605574` posterior al cierre de `SHELL-APP-012`, continuidad H2, owner y marcador vigente, ruta normal, topología `PER_IMPLEMENTATION_UNIT`, políticas de formato/desarrollo, validadores aplicables, `package.json`, catálogo de diez aplicaciones, handoff de `SHELL-APP-012`, contrato materializado de ownership con 69 procesos y `shell = 0`, contrato de work items, principios E2, `INT-APP-010`, 04A AUTH/SHELL/INTEGRATION y el runtime vigente de `src/app/page.tsx`. |
| OPERATIVA | NOT_APPLICABLE | La tarea define una frontera documental y no ejecuta procesos reales de inventario, producción, compras, POS, finanzas, talento, AURA o PASS. |
| FÍSICA | NOT_APPLICABLE | La aprobación documental no crea ni autoriza una instancia física de `SHELL-APP-013` y no modifica código, datos, Supabase, infraestructura ni despliegues. |

---

#### 58. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones`.
- [ ] `SHELL-APP-012` permanece como tarea anterior.
- [ ] `SHELL-APP-014` permanece como tarea siguiente.
- [ ] La tarea permanece exclusivamente documental.
- [ ] `PER_IMPLEMENTATION_UNIT` se conserva únicamente como topología de materialización posterior.
- [ ] Se conservan exactamente diez aplicaciones canónicas.
- [ ] Se conservan exactamente 69 procesos en el registro de ownership vigente.
- [ ] Se conservan exactamente nueve aplicaciones con al menos un proceso propietario.
- [ ] `shell` conserva exactamente cero procesos propietarios dentro de los 69 procesos vigentes.
- [ ] `anima` conserva 1 proceso propietario.
- [ ] `viso` conserva 20 procesos propietarios.
- [ ] `nexo` conserva 16 procesos propietarios.
- [ ] `fogo` conserva 6 procesos propietarios.
- [ ] `origo` conserva 4 procesos propietarios.
- [ ] `pulso` conserva 12 procesos propietarios.
- [ ] `numera` conserva 7 procesos propietarios.
- [ ] `aura` conserva 2 procesos propietarios.
- [ ] `pass` conserva 1 proceso propietario.
- [ ] La suma de procesos propietarios permanece en 69.
- [ ] Cero procesos propietarios no elimina las responsabilidades legítimas del Hub.
- [ ] SHELL permanece coordinador transversal y no propietaria universal.
- [ ] Ubicación de código no define owner funcional.
- [ ] Repositorio técnico no define owner funcional.
- [ ] Tabla o RPC no define owner funcional por su nombre o ubicación.
- [ ] Presentar información no transfiere ownership.
- [ ] Navegar no transfiere ownership.
- [ ] Recibir un evento no transfiere ownership.
- [ ] Un handoff no cambia owner automáticamente.
- [ ] Un work item conserva `owner_app_code`.
- [ ] Mostrar un work item no produce claim.
- [ ] Mostrar un work item no produce start.
- [ ] Mostrar un work item no produce completion.
- [ ] `next_action_code` no concede permiso.
- [ ] La aplicación propietaria revalida la acción efectiva.
- [ ] SHELL puede consumir referencias mínimas autorizadas.
- [ ] SHELL puede consumir proyecciones seguras autorizadas.
- [ ] Una proyección no se convierte en fuente de verdad local.
- [ ] Una caché controlada no transfiere ownership.
- [ ] Una copia de evidencia no transfiere ownership.
- [ ] Un resultado derivado de presentación no reescribe el hecho fuente.
- [ ] SHELL no recalcula prioridad empresarial localmente.
- [ ] SHELL no reconstruye estados funcionales ausentes.
- [ ] SHELL no crea consultas propietarias de otra aplicación para reconstruir su semántica.
- [ ] SHELL no escribe directamente tablas de otra propietaria.
- [ ] SHELL no invoca mutaciones extranjeras sin contrato.
- [ ] SHELL no ejecuta una transacción cliente que muta múltiples owners como una sola autoridad local.
- [ ] SHELL no usa triggers, workers o webhooks para escribir silenciosamente otro dominio.
- [ ] SHELL no usa proyecciones para sobrescribir la fuente.
- [ ] SHELL no realiza reparación cross-domain manual como lógica normal.
- [ ] SHELL no compensa mediante edición del dominio ajeno.
- [ ] `SHELL_OR_ADMIN_HUB_FOREIGN_MUTATION` permanece prohibido.
- [ ] Toda mutación cross-app autorizada usa contrato explícito.
- [ ] El owner revalida actor, autorización, contexto, estado, versión y recurso.
- [ ] El owner aplica o rechaza la mutación.
- [ ] El owner confirma el resultado antes de que SHELL lo trate como hecho final.
- [ ] Un contrato ausente no produce reimplementación local.
- [ ] Un owner indisponible no produce fallback empresarial en SHELL.
- [ ] Una proyección stale no se usa como autoridad vigente.
- [ ] Una proyección incompleta no se rellena por inferencia.
- [ ] Un error técnico no se convierte en estado empresarial.
- [ ] Visibilidad en SHELL no sustituye autorización del owner.
- [ ] `app.access` no se convierte en capacidad interna.
- [ ] El repositorio `vento-shell` no se confunde con la aplicación `shell`.
- [ ] Un package compartido dentro de `vento-shell` no se considera lógica de SHELL por ubicación.
- [ ] La gobernanza de Supabase desde `vento-shell` no transfiere propiedad empresarial a `shell`.
- [ ] El sharing exige owner, contrato, consumidores, pruebas y rollback.
- [ ] Ser TypeScript, puro o reutilizable no basta para promover lógica a sharing.
- [ ] ANIMA conserva su lógica laboral propietaria.
- [ ] VISO conserva su lógica administrativa propietaria.
- [ ] NEXO conserva inventario y logística.
- [ ] FOGO conserva producción.
- [ ] ORIGO conserva compras y abastecimiento.
- [ ] PULSO conserva POS, ventas, pedidos, pagos y operaciones de fidelización que le pertenecen.
- [ ] NUMERA conserva su lógica financiera propietaria.
- [ ] AURA diferida no se reimplementa en SHELL.
- [ ] PASS conserva su lógica cliente y la frontera aprobada en `SHELL-APP-012`.
- [ ] El AS-IS de `src/app/page.tsx` se registra sin corregirse desde esta tarea.
- [ ] No se usa SHELL como fallback de una feature incompleta de otra aplicación.
- [ ] No se duplica lógica funcional únicamente para reducir navegación.
- [ ] Los eventos no se usan como comandos.
- [ ] Observabilidad no se convierte en autoridad de corrección.
- [ ] Ownership no resuelto falla cerrado sin inferencia.
- [ ] No se desarrolla el retorno seguro reservado a `SHELL-APP-014`.
- [ ] No se desarrolla conservación de contexto reservada a `SHELL-APP-015`.
- [ ] No se desarrolla conservación de tarea en curso reservada a `SHELL-APP-016`.
- [ ] No se modifican ownership, procesos, capacidades ni catálogo.
- [ ] No se modifica código.
- [ ] No se modifica Supabase.
- [ ] No se crean migraciones.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se crea ni autoriza una instancia física.

---

#### 59. Límites

Esta tarea no:

- reasigna procesos;
- modifica `owner_app_code`;
- cambia `PROC-CAT-005`;
- cambia `CAP-MAP-008`;
- cambia la proyección materializada de ownership;
- crea procesos para SHELL;
- elimina responsabilidades legítimas del Hub;
- crea comandos cross-app nuevos;
- crea endpoints;
- crea RPC;
- crea Server Actions;
- crea tablas;
- crea vistas;
- crea triggers;
- crea workers;
- crea webhooks;
- crea eventos;
- crea work items;
- modifica el lifecycle de work items;
- cambia `AppCode`;
- cambia permisos;
- cambia matrices;
- cambia autorización;
- cambia contratos compartidos;
- promueve código a packages compartidos;
- modifica ANIMA;
- modifica VISO;
- modifica NEXO;
- modifica FOGO;
- modifica ORIGO;
- modifica PULSO;
- modifica NUMERA;
- modifica AURA;
- modifica PASS;
- modifica `src/app/page.tsx`;
- corrige catálogo local de SHELL;
- corrige `has_permission` legacy;
- corrige placeholders de perfil o configuración;
- define retorno seguro entre aplicaciones;
- define conservación de contexto cross-app;
- define conservación de tarea en curso;
- modifica Supabase;
- modifica datos;
- crea migraciones;
- cambia configuración;
- despliega;
- crea una instancia física;
- autoriza implementación física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica 04A.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente`

**TAREA ACTUAL APROBADA**
`SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-014 — Definir retorno seguro entre aplicaciones`


### ✅ SHELL-APP-014 — Definir retorno seguro entre aplicaciones

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones
**Tarea siguiente:** SHELL-APP-015 — Conservar contexto al cambiar de aplicación
**Tipo de tarea:** definición técnico-documental del retorno seguro entre aplicaciones y de la frontera de `returnTo`; especializa navegación, autenticación y handoffs sin convertir un destino de retorno en autorización, ownership, estado empresarial ni reanudación implícita, y conserva `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** contrato documental de retorno cross-app definido para SHELL sobre navegación ordinaria, round-trip de autenticación y handoff ligado a proceso, con validación fail-closed del destino y sin modificar runtime ni crear instancia física
**Cambios físicos autorizados:** ninguno; no se modifican rutas, código, autenticación, middleware, contratos, catálogos, dominios, permisos, Supabase, datos, RLS, RPC, migraciones, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo una persona o flujo autorizado puede salir de una superficie de Vento OS, atravesar otra aplicación o el acceso central y regresar a un destino válido sin perder la intención de navegación ni convertir el retorno en una fuente de autoridad.

La política debe impedir simultáneamente:

- redirecciones hacia orígenes arbitrarios;
- confianza en parámetros de URL como autorización;
- retorno a una aplicación que ya no es válida para el actor;
- reapertura silenciosa de una instancia empresarial distinta;
- duplicación de efectos por navegación repetida;
- transferencia accidental de ownership entre aplicaciones;
- restauración de contexto o trabajo que ya quedó obsoleto;
- uso de SHELL como fallback funcional cuando el destino no puede ejecutar su responsabilidad.

La regla central queda:

```text
RETORNO
=
CONTINUIDAD DE NAVEGACIÓN VALIDADA

RETORNO
!=
AUTORIZACIÓN
!=
OWNERSHIP
!=
CLAIM
!=
START
!=
COMPLETE
!=
RESULTADO EMPRESARIAL
```

---

#### 2. Handoff recibido de `SHELL-APP-013`

Se reciben sin reapertura:

1. SHELL coordina sin convertirse en propietaria universal;
2. los 69 procesos empresariales vigentes conservan sus nueve aplicaciones propietarias;
3. navegación y ejecución funcional permanecen separadas;
4. referencias, proyecciones y work items no transfieren ownership;
5. la aplicación destino revalida autorización, contexto, estado, versión y recurso;
6. un handoff no cambia automáticamente la propietaria;
7. si el destino está indisponible, SHELL no absorbe su lógica como fallback;
8. error técnico y resultado empresarial permanecen distintos;
9. navegar no produce claim, inicio ni finalización;
10. el detalle del retorno cross-app se desarrolla exclusivamente aquí.

Esta tarea no reabre la distribución funcional cerrada por `SHELL-APP-013`.

---

#### 3. Alcance exacto de la tarea

`SHELL-APP-014` define exclusivamente:

- qué significa un retorno seguro;
- cómo se trata `returnTo` como dato no confiable;
- qué clases conceptuales de viaje deben distinguirse;
- qué condiciones hacen elegible un destino;
- cómo se valida un origen o destino antes de navegar;
- cómo se trata un retorno ligado a un handoff de proceso;
- qué ocurre ante destino inválido, obsoleto, no autorizado o técnicamente indisponible;
- qué información puede y no puede transportarse en la navegación;
- cuándo un retorno previo deja de ser reutilizable;
- cómo se evita que una redirección produzca autoridad o un efecto empresarial.

No define todavía la restauración completa de contexto ni la conservación técnica de una tarea en curso.

---

#### 4. Tres escenarios conceptuales distintos

La política distingue tres escenarios sin crear un enum nuevo:

| Escenario | Finalidad | Autoridad principal |
| --- | --- | --- |
| round-trip de autenticación | llegar al acceso central y volver a un destino permitido | sesión e identidad revalidadas + destino permitido |
| navegación cross-app ordinaria | abrir otra aplicación o volver al Hub sin afirmar handoff empresarial | catálogo, visibilidad y autorización vigentes |
| retorno ligado a handoff | continuar la misma intención dentro de una relación empresarial aprobada | contrato `ApplicationHandoffRelation` + aplicación propietaria y receptora |

Los tres pueden utilizar navegación web, pero no comparten automáticamente el mismo significado empresarial.

---

#### 5. `returnTo` es una sugerencia de transporte no confiable

`returnTo` puede expresar un destino solicitado.

No demuestra:

- identidad;
- actor efectivo;
- rol base;
- rol operativo;
- permiso;
- sede;
- área;
- turno;
- check-in;
- ownership;
- pertenencia a un handoff;
- estado de proceso;
- existencia de una tarea;
- autorización para mutar.

Por tanto:

```text
returnTo recibido
→ NORMALIZAR
→ VALIDAR
→ RESOLVER DESTINO PERMITIDO
→ NAVEGAR SOLO SI SIGUE SIENDO VÁLIDO
```

Nunca:

```text
returnTo recibido
→ REDIRECT DIRECTO
```

---

#### 6. Baseline AS-IS observado

El runtime vigente conserva una frontera todavía permisiva:

- `safeReturnTo()` acepta cualquier valor absoluto que comience por `http://` o `https://`;
- una sesión ya existente puede redirigirse hacia el valor normalizado por esa función;
- después de un inicio de sesión exitoso, el cliente asigna el destino a `window.location.href`;
- el middleware construye el acceso central incorporando la URL completa solicitada como `returnTo`.

Esta condición es evidencia AS-IS.

No constituye la política TO-BE y no se corrige físicamente en esta tarea documental.

---

#### 7. Política TO-BE para rutas internas

Una ruta relativa solo puede admitirse como retorno cuando:

1. su resolución permanece dentro de la aplicación o superficie que legítimamente la interpreta;
2. el patrón de ruta continúa vigente;
3. no intenta cambiar de origen mediante sintaxis ambigua;
4. no contiene un esquema embebido;
5. no contiene credenciales;
6. el actor puede llegar a esa superficie bajo sus contratos actuales;
7. la aplicación destino vuelve a validar la acción efectiva.

Una ruta relativa válida para una aplicación no se convierte por ello en ruta válida para otra.

---

#### 8. Política TO-BE para destinos absolutos

Un destino absoluto solo puede admitirse cuando el origen exacto está explícitamente aprobado para:

- la aplicación correspondiente;
- el ambiente correspondiente;
- el flujo solicitado;
- el estado de ciclo de vida vigente.

La tarea no crea una lista hardcodeada de hosts.

La materialización posterior deberá resolver los orígenes permitidos desde las fuentes canónicas propietarias vigentes y rechazar cualquier destino que no pueda reconciliarse con ellas.

---

#### 9. Esquemas admitidos

La existencia de una URL sintácticamente válida no basta.

Un esquema solo puede utilizarse cuando está aprobado por el contrato de navegación aplicable.

Quedan rechazados por defecto:

- esquemas desconocidos;
- esquemas no registrados para el flujo;
- URLs que intenten incorporar credenciales en la autoridad;
- destinos que cambien silenciosamente de protocolo o ambiente;
- valores que dependan de interpretación permisiva del navegador.

La tarea no inventa un catálogo nuevo de esquemas.

---

#### 10. No se infiere confianza por sufijo o branding

No es válido razonar:

```text
contiene "vento"
→ DESTINO CONFIABLE
```

ni:

```text
termina en un dominio parecido
→ DESTINO CONFIABLE
```

ni:

```text
la metadata local conoce el host
→ DESTINO AUTORIZADO
```

La confianza requiere identidad canónica de aplicación, origen aprobado y ambiente compatible.

---

#### 11. El ambiente forma parte de la validez

Un retorno no puede cruzar por inferencia entre:

- producción;
- staging;
- preview;
- desarrollo;
- sandbox;
- cualquier ambiente futuro gobernado.

La coincidencia de ruta o aplicación no autoriza un salto de ambiente.

El destino debe pertenecer al ambiente efectivo del flujo o a una transición cross-environment expresamente autorizada por su contrato propietario.

Esta tarea no crea una transición cross-environment nueva.

---

#### 12. Sin lista local paralela de destinos

SHELL no mantendrá una segunda autoridad como:

```text
ALLOWED_RETURN_HOSTS = [...]
```

si esa lista replica manualmente un catálogo o configuración canónica ya existente.

Una implementación puede materializar una proyección derivada o adaptador verificable, pero la fuente de significado debe conservar propietario, versión y frescura.

Una lista local stale falla cerrada; no amplía destinos por conveniencia.

---

#### 13. Validación antes y después de autenticación

La elegibilidad del destino debe comprobarse tanto para:

- una sesión ya existente;
- una sesión que acaba de autenticarse.

No puede existir esta diferencia:

```text
SESION EXISTENTE
→ DESTINO VALIDADO

LOGIN NUEVO
→ DESTINO CRUDO
```

ni la inversa.

La forma de entrada cambia, pero la frontera de retorno es la misma.

---

#### 14. La validación no puede depender solo del cliente

Una asignación de navegador, estado React, query parameter o helper cliente no constituye la única barrera de seguridad.

La navegación final y la aplicación receptora deberán conservar validaciones autoritativas en las capas propietarias aplicables.

Modificar desde el cliente:

- `returnTo`;
- `href`;
- `location`;
- query parameters;
- estado local;

no puede fabricar acceso.

---

#### 15. Destino permitido no equivale a autorización de aplicación

Incluso si un origen es válido:

```text
ORIGEN APROBADO
!=
app.access ALLOW
```

El destino conserva su guard.

Por tanto, un usuario que conoce una URL válida no obtiene por ello una aplicación que su actor o contexto no puede abrir.

---

#### 16. Visibilidad y retorno permanecen separados

La política aprobada de visibilidad continúa perteneciendo a `SHELL-APP-002` y `SHELL-APP-003`.

Se conserva:

```text
RETORNO VALIDO
!=
FORZAR APP VISIBLE

APP VISIBLE
!=
ACEPTAR CUALQUIER RETORNO HACIA ELLA
```

Un destino oculto por irrelevancia no reaparece solo porque fue mencionado por un parámetro anterior.

---

#### 17. Aplicación bloqueada

Cuando la aplicación es presentable pero actualmente no navegable:

- el retorno no la habilita;
- no se reutiliza un `ALLOW` anterior;
- la explicación segura sigue `SHELL-APP-010`;
- el destino continúa siendo no navegable;
- modificar el enlace no sustituye la revalidación de la aplicación receptora.

El retorno no transforma `CONTEXT_BLOCKED` en autorización.

---

#### 18. Aplicación técnicamente indisponible

Una indisponibilidad técnica del destino:

```text
!= DENY EMPRESARIAL
!= TAREA COMPLETADA
!= RESULTADO NEGATIVO DEL PROCESO
```

SHELL puede presentar recuperación o navegación segura ya aprobada.

No ejecuta la operación funcional en nombre de la aplicación indisponible.

---

#### 19. AURA permanece diferida

AURA conserva su ciclo de vida diferido.

Un valor de retorno que apunte a AURA no:

- activa AURA;
- crea readiness;
- crea una tarjeta navegable;
- crea permiso;
- convierte una relación documental de handoff en capacidad operativa.

El estado de ciclo de vida prevalece sobre el destino solicitado.

---

#### 20. PASS permanece adyacente

PASS conserva:

```text
ADJACENT_RESERVED
```

Esta tarea no crea:

- `CUSTOMER → PASS` automático;
- SSO cliente;
- account linking;
- intercambio de autorización cliente/laboral;
- retorno laboral hacia PASS por transitividad.

Una navegación futura hacia una superficie PASS deberá respetar la frontera cliente/laboral aprobada por `SHELL-APP-011` y `SHELL-APP-012`.

---

#### 21. Round-trip de autenticación no es handoff empresarial

El viaje:

```text
APP
→ LOGIN CENTRAL
→ APP
```

puede existir exclusivamente para restaurar una sesión válida.

No implica:

- `HANDOFF_REQUEST`;
- `HANDOFF_PROJECTION`;
- cambio de etapa empresarial;
- aceptación de trabajo;
- cambio de propietaria;
- nuevo proceso.

No se obliga a crear una relación `ApplicationHandoffRelation` para cada acceso central.

---

#### 22. Navegación ordinaria no es handoff empresarial

Abrir una aplicación autorizada desde SHELL o regresar al Hub puede ser una navegación ordinaria.

La mera existencia de:

- un link;
- una tarjeta;
- un deep link;
- un botón volver;
- historial del navegador;

no convierte el viaje en handoff empresarial.

Un handoff requiere pertenencia al contrato empresarial correspondiente.

---

#### 23. Universo actual de `ApplicationHandoffRelation`

El contrato estático materializado conserva exactamente:

```text
RELACIONES = 49
DIRECTA = 27
CONDICIONAL = 22
PROCESOS = 8
APLICACIONES PARTICIPANTES = 9
APLICACIONES PROPIETARIAS EN ESTE CORTE = 1
TUPLAS DUPLICADAS = 0
OWNER_IGUAL_PARTICIPANT = 0
```

La única aplicación propietaria dentro de este universo de relaciones es:

```text
viso
```

Estas cifras no describen toda navegación de Vento OS; describen exclusivamente el universo contractual vigente de handoffs materializados por `SHELL-CON-014::GLOBAL`.

---

#### 24. Ocho procesos del universo de handoff

Se conservan exactamente:

```text
VPROC-0005
VPROC-0006
VPROC-0007
VPROC-0009
VPROC-0011
VPROC-0059
VPROC-0065
VPROC-0066
```

Un `ProcessId` sintácticamente válido pero ausente de este conjunto no puede presentarse como relación vigente de `ApplicationHandoffRelation` por inferencia.

---

#### 25. Nueve aplicaciones participantes del universo de handoff

Se conservan exactamente:

```text
shell
anima
nexo
fogo
origo
pulso
numera
aura
pass
```

La pertenencia al conjunto de participantes no demuestra que exista una relación para cualquier proceso, pareja o dirección imaginada.

La tupla exacta sigue siendo la identidad de pertenencia.

---

#### 26. Identidad de relación de handoff

Una relación vigente se identifica únicamente mediante:

```text
ProcessId
+
owner_application
+
participant_application
```

No se crea:

- un ID serial alternativo;
- un ID derivado desde una URL;
- un ID derivado desde una pantalla;
- un ID derivado desde el usuario;
- un ID derivado desde `returnTo`.

La navegación utiliza la relación; no redefine su identidad.

---

#### 27. `DIRECTA` y `CONDICIONAL`

Se conservan dos clases contractuales:

```text
DIRECTA
CONDICIONAL
```

Una relación `CONDICIONAL` no queda habilitada por la sola existencia de la fila.

Debe satisfacerse la condición empresarial y técnica propietaria que haga aplicable el handoff.

SHELL no interpreta `CONDICIONAL` como un permiso débil ni como fallback navegable.

---

#### 28. Constantes de integración del handoff

Para las 49 relaciones vigentes se conservan:

```text
consumer_mode = SOLICITUD_HANDOFF_Y_EVENTO
integration_profile = HANDOFF_PROJECTION
exchange_family = HANDOFF_REQUEST
```

Estas constantes clasifican el intercambio.

No convierten una redirección en un evento confirmado ni una solicitud en efecto ejecutado.

---

#### 29. Datos mínimos que un handoff runtime deberá poder preservar

Cuando un retorno pertenezca a un handoff real, la materialización posterior deberá poder conservar, cuando aplique:

- el mismo proceso;
- la misma instancia de proceso;
- el recurso empresarial exacto;
- aplicación propietaria;
- aplicación participante;
- actor emisor;
- actor o función receptora;
- sede;
- área;
- estado vigente;
- trabajo o acción pendiente;
- destino de retorno;
- correlación y causalidad;
- evidencia;
- emisión;
- recepción;
- aceptación;
- resultado;
- idempotencia suficiente contra doble aceptación o doble efecto.

Esta tarea no define un payload físico nuevo.

---

#### 30. URL no es contenedor del estado empresarial

Los elementos anteriores no se trasladan indiscriminadamente como query parameters.

Se conserva:

```text
URL
→ REFERENCIA DE NAVEGACIÓN MINIMIZADA

ESTADO EMPRESARIAL
→ FUENTE PROPIETARIA
```

Por tanto, una URL no debe transportar como autoridad:

- estado completo del proceso;
- permisos;
- roles;
- decisión de autorización;
- saldo;
- resultado de una mutación;
- evidencia sensible;
- secretos.

---

#### 31. Mismo proceso y misma instancia

Regresar desde una aplicación participante no crea otra instancia empresarial por conveniencia de navegación.

Para un handoff vigente:

```text
PROCESS_ID ANTES = PROCESS_ID DESPUÉS
PROCESS_INSTANCE_REF ANTES = PROCESS_INSTANCE_REF DESPUÉS
```

salvo que el proceso propietario confirme explícitamente una transición que cree otra instancia bajo un contrato distinto.

El navegador no toma esa decisión.

---

#### 32. Handoff no cambia ownership

Se conserva:

```text
owner_application
→ mantiene registro principal, reglas, estado, corrección y cierre

participant_application
→ solicita, recibe o ejecuta solo el efecto permitido
```

El hecho de que una persona termine visualmente en la participante no transfiere ownership.

El retorno tampoco lo devuelve porque nunca se había transferido por navegación.

---

#### 33. Enviar no equivale a aceptar

Para un handoff:

```text
SEND
!=
RECEIVE
!=
ACCEPT
!=
EXECUTE
!=
COMPLETE
```

La navegación puede ocurrir entre cualquiera de esos hitos cuando el flujo lo requiera, pero no sustituye el estado empresarial propietario.

---

#### 34. La receptora revalida

Antes de ejecutar un efecto, la aplicación receptora debe revalidar como mínimo los elementos que su contrato requiera, incluidos cuando apliquen:

- relación de handoff;
- actor;
- autorización;
- contexto;
- recurso;
- estado;
- versión.

Un valor recibido desde la URL no puede declarar que esas validaciones ya ocurrieron.

---

#### 35. La propietaria conserva la verdad del resultado

Un parámetro como:

```text
success=true
completed=1
approved=yes
```

no puede convertirse en resultado empresarial.

El resultado debe proceder de la fuente propietaria o de una proyección/evento aprobado que confirme el hecho.

SHELL solo presenta el resultado seguro que pueda demostrar.

---

#### 36. Navegación sin efecto empresarial

Abrir, redirigir, volver, refrescar o repetir una URL no produce por sí mismo:

- escritura empresarial;
- aceptación;
- aprobación;
- claim;
- start;
- complete;
- cancelación;
- compensación.

Si el flujo exige un efecto, este debe ejecutarse mediante el contrato propietario correspondiente y conservar su idempotencia.

---

#### 37. Idempotencia separada del retorno

Un retorno puede repetirse por:

- refresh;
- back/forward;
- reintento de autenticación;
- reapertura de pestaña;
- recuperación del navegador.

La repetición de navegación no autoriza repetir el efecto empresarial.

Los efectos reintentables conservan las claves, resultados recuperables y controles de idempotencia de sus contratos propietarios.

---

#### 38. Deep links compatibles

Un deep link puede participar en el retorno únicamente si:

- pertenece a una aplicación y ambiente aprobados;
- el patrón continúa soportado;
- la aplicación receptora conserva compatibilidad para esa versión;
- el destino revalida su autoridad;
- no amplía datos ni privilegios por los parámetros transportados.

Un deep link conocido no es un bypass.

---

#### 39. Ruta renombrada o reemplazada

Cuando una ruta haya sido sustituida, el retorno solo podrá usar:

- el destino vigente; o
- una transición compatible y gobernada que siga dentro de su ventana de soporte.

Queda prohibido seleccionar por heurística una ruta “parecida” o el primer destino disponible.

Una compatibilidad retirada produce retorno inválido, no navegación aproximada.

---

#### 40. No se inventa una duración universal

Esta tarea no fija un TTL numérico arbitrario para todos los retornos.

La vigencia depende del contrato que originó el retorno.

Como mínimo, un retorno anterior deja de ser reutilizable cuando se demuestra cualquiera de estas condiciones aplicables:

- cambió el actor efectivo de forma incompatible;
- la sesión requerida dejó de ser válida;
- el destino dejó de pertenecer al ambiente o aplicación aprobados;
- la ruta o compatibilidad terminó su vigencia;
- el handoff dejó de ser aplicable;
- el proceso o instancia ya no admite la continuación solicitada;
- el recurso o versión ya no coincide con la intención original;
- una fuente propietaria marca la referencia como expirada, supersedida o inválida.

Una futura implementación puede tener expiraciones concretas cuando su contrato propietario las defina.

---

#### 41. Cambio de actor

Ante un cambio efectivo de actor:

- no se hereda el permiso del actor anterior;
- no se conserva un destino privilegiado solo porque estaba abierto;
- no se reutiliza contexto autoritativo anterior;
- la aplicación destino vuelve a resolver autorización.

Un retorno puede seguir apuntando a una superficie pública o permitida para el nuevo actor, pero debe volver a calificarse desde cero.

---

#### 42. Logout y sesión inválida

Cerrar sesión invalida la confianza previa asociada a la sesión.

Un destino almacenado o visible antes del logout no puede reintroducir privilegios al volver a abrirse.

Después de una nueva autenticación:

```text
IDENTIDAD ACTUAL
+
DESTINO ACTUALMENTE PERMITIDO
→ POSIBLE RETORNO
```

No:

```text
DESTINO PREVIO
→ PRIVILEGIO PREVIO RESTAURADO
```

---

#### 43. Dispositivo compartido

En una estación compartida, el retorno no puede transportar la autoridad del operador anterior ni la autoridad máxima de la sesión técnica del dispositivo.

La aplicación receptora debe identificar y validar al actor humano efectivo conforme al contrato del dispositivo cuando la acción lo requiera.

Cambiar de trabajador invalida cualquier proyección de navegación que dependa del actor anterior.

---

#### 44. Historial del navegador

`Back`, `Forward` y restauración de pestaña son mecanismos del navegador.

No constituyen una fuente canónica de continuidad.

Al volver mediante historial:

- la superficie revalida sesión;
- la superficie revalida actor y autorización cuando aplique;
- una proyección stale no se trata como vigente;
- una mutación anterior no se repite por navegación.

---

#### 45. Sin pila recursiva de `returnTo`

Esta tarea no crea una cadena autoritativa como:

```text
returnTo=A?returnTo=B?returnTo=C
```

para representar continuidad empresarial.

La continuidad multi-app se conserva mediante identidades y correlaciones contractuales del flujo, no mediante una pila de URLs confiada recursivamente.

Cada salto valida su destino actual.

---

#### 46. Minimización del destino

El retorno no debe contener secretos ni material que aumente el impacto de una fuga de URL.

No se transportan en un destino de retorno:

- contraseñas;
- access tokens;
- refresh tokens;
- credenciales de proveedor;
- secretos de aplicación;
- claves API;
- evidencia sensible completa;
- datos personales no necesarios;
- decisiones de autorización serializadas como verdad reutilizable.

Las referencias opacas aprobadas se minimizan al propósito del flujo.

---

#### 47. Fragmentos y query parameters

Query parameters y fragmentos pueden transportar información de navegación cuando el contrato de la superficie los admite.

No pueden:

- crear permisos;
- cambiar el actor;
- elevar el alcance;
- confirmar una acción;
- sustituir el recurso validado en servidor;
- reclasificar la aplicación;
- seleccionar un ambiente no aprobado.

Toda referencia sensible conserva minimización y validación propietaria.

---

#### 48. Retorno seguro ante fallo de destino

Si el destino solicitado no puede validarse, el sistema falla cerrado.

No se intenta una URL aproximada ni una aplicación “equivalente”.

La recuperación deberá seleccionar únicamente una superficie que ya sea segura para el actor y el estado disponibles conforme a contratos aprobados.

Para un `EMPLOYEE` que conserve entrada válida a SHELL, el home laboral aprobado puede actuar como superficie segura cuando corresponda.

Esto no crea el mismo fallback para otros tipos de actor.

---

#### 49. Fallback por tipo de actor

Se conserva la política de `SHELL-APP-009`:

| Actor efectivo | Tratamiento de recuperación |
| --- | --- |
| `EMPLOYEE` válido y con entrada efectiva a SHELL | puede volver a la experiencia laboral segura ya aprobada |
| `CUSTOMER` | no se envía por defecto al Hub laboral ni a PASS por inferencia |
| `SYSTEM` | no recibe interfaz humana de fallback |
| `UNRESOLVED` | falla cerrado sin Hub laboral |

La tarea no crea un quinto actor ni una ruta alternativa específica por rol.

---

#### 50. Fallo técnico durante autenticación

Un error de autenticación o de resolución del destino no se presenta como resultado del proceso empresarial solicitado.

Se conserva la intención únicamente hasta donde pueda demostrarse de forma segura.

No se afirma que el trabajo fue completado, rechazado o cancelado por un fallo técnico de navegación.

---

#### 51. Fallo técnico después de un handoff

Si la navegación hacia la participante falla después de una solicitud de handoff:

- no se presume aceptación;
- no se presume ejecución;
- no se crea otro handoff por recargar;
- el estado empresarial se consulta desde sus fuentes propietarias;
- la recuperación no modifica el proceso desde SHELL.

La idempotencia del efecto permanece en el contrato técnico propietario.

---

#### 52. Reentrada después de resultado confirmado

Cuando la fuente propietaria ya confirma que el resultado solicitado ocurrió, volver a una URL anterior no reactiva automáticamente la acción.

La superficie deberá mostrar el estado vigente o conducir a la siguiente acción permitida conforme al propietario.

No repite el comando porque la URL anterior siga disponible.

---

#### 53. Contexto que esta tarea sí conserva conceptualmente

Para validar el retorno, esta tarea reconoce que pueden ser necesarias referencias a:

- actor;
- aplicación origen y destino;
- proceso e instancia;
- recurso;
- sede y área;
- estado;
- versión;
- correlación;
- acción o trabajo pendiente.

Reconocer estas referencias no define cómo se restauran en la UI ni qué parte del contexto se mantiene al cambiar de aplicación.

Ese detalle permanece reservado a `SHELL-APP-015`.

---

#### 54. Tarea en curso todavía reservada

Esta tarea no decide:

- si una tarea queda `CLAIMED` durante el cambio de aplicación;
- cómo se renueva un lease;
- cómo se conserva `IN_PROGRESS`;
- cómo se reanuda un draft;
- cómo se maneja `COMPLETION_PENDING_SYNC`;
- cómo se representa una pausa;
- cuándo una tarea debe volver al foco principal.

Estas decisiones permanecen reservadas a `SHELL-APP-016` y a los contratos técnicos propietarios.

---

#### 55. SHELL no se convierte en proxy universal

El retorno seguro no autoriza a SHELL a:

- reenviar cualquier request a cualquier host;
- actuar como reverse proxy universal;
- ejecutar RPC de la aplicación destino;
- consultar datos privados para reconstruir una operación ajena;
- firmar una decisión empresarial en nombre de otra aplicación;
- almacenar payloads funcionales completos para “reanudar” una app.

SHELL conserva coordinación y navegación, no ejecución universal.

---

#### 56. Propiedad de corrección del hallazgo AS-IS

La existencia actual de `safeReturnTo` permisivo ya está registrada como una brecha física de SHELL.

Esta tarea no crea un pendiente narrativo paralelo.

La corrección física deberá permanecer en las tareas y controles de interfaz/servidor ya vinculados al requisito vigente de frontera de `returnTo`, y en la futura materialización autorizada que consuma este contrato.

No se inventa aquí un `implementation_unit_id` ni una rama física.

---

#### 57. Resultado documental consolidado

```text
RETURN TARGET
→ UNTRUSTED INPUT
→ NORMALIZE
→ VALIDATE APP / ORIGIN / ENVIRONMENT / FLOW
→ REVALIDATE SESSION AND DESTINATION AUTHORITY
→ NAVIGATE OR FAIL CLOSED

AUTH ROUND-TRIP
→ NOT BUSINESS HANDOFF

ORDINARY CROSS-APP NAVIGATION
→ NOT BUSINESS HANDOFF BY DEFAULT

PROCESS HANDOFF RETURN
→ EXACT ApplicationHandoffRelation WHEN HANDOFF SEMANTICS APPLY
→ SAME PROCESS / INSTANCE
→ OWNER PRESERVED
→ RECEIVER REVALIDATES

URL
→ NAVIGATION REFERENCE
→ NOT BUSINESS STATE
→ NOT AUTHORIZATION

NAVIGATION
→ NO BUSINESS EFFECT BY ITSELF

INVALID / STALE / UNAUTHORIZED DESTINATION
→ FAIL CLOSED
→ SAFE RECOVERY BY CURRENT ACTOR CONTRACT

SHELL-APP-015
→ CONTEXT RESTORATION RESERVED

SHELL-APP-016
→ WORK-IN-PROGRESS PRESERVATION RESERVED
```

---

#### 58. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea especializa para SHELL reglas de retorno, handoff, navegación, autorización, propiedad, idempotencia y compatibilidad que ya están protegidas por cobertura canónica vigente.

No introduce una identidad, comportamiento empresarial o frontera de seguridad nueva que requiera modificar el registro.

---

#### 59. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-SHELL-003` — destinos e identidad de aplicaciones proceden de fuente canónica y no de listas locales divergentes;
- `TREQ-SHELL-016` — una aplicación sin acceso efectivo permanece no navegable y la manipulación de interfaz no concede operación;
- `TREQ-SHELL-018` — `returnTo` admite solo rutas internas u orígenes Vento OS explícitamente aprobados, normalizados y ligados al flujo, rechazando URLs absolutas arbitrarias, esquemas no permitidos, credenciales embebidas y dominios no registrados;
- `TREQ-SHELL-019` — una sesión ya válida solo se redirige a un destino permitido bajo la política de acceso vigente;
- `TREQ-INTEGRATION-001` — esquemas, dominios y URLs corresponden al ambiente y contrato aprobados;
- `TREQ-INTEGRATION-003` — efectos reintentables conservan identidad estable, resultado recuperable e idempotencia;
- `TREQ-INTEGRATION-005` — el traspaso conserva proceso, recurso, actor, sede, área, estado, acción pendiente y destino de retorno, con revalidación en la receptora y compatibilidad controlada de deep links;
- `TREQ-INTEGRATION-006` — los datos empresariales permanecen en su aplicación propietaria y se propagan por contratos aprobados;
- `TREQ-PROC-034` — todo traspaso conserva identidad de instancia, actores, función, contexto, territorio, pendientes, tiempos y aceptación sin crear un proceso paralelo.

Estas referencias son trazabilidad heredada.

No actualizan 04A.

---

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado ni sometido a `docs:plan:build` dentro de la rama local de `SHELL-APP-014`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía formateo, quality, delivery, topología ni la batería documental sobre el checkout local de `SHELL-APP-014`. |
| REMOTA | PASS | Se verificaron `main` posterior al cierre de `SHELL-APP-013`, continuidad H2, ruta normal, topología `PER_IMPLEMENTATION_UNIT`, políticas vigentes de formato y desarrollo, archivo propietario y marcador actual, `package.json`, preflight y lifecycle documental, contrato estático materializado y `VERIFIED` de `SHELL-CON-014::GLOBAL`, universo 49/27/22/8/9 de handoffs, TREQ vigentes de SHELL/INTEGRATION/PROC y el runtime AS-IS de `returnTo` en login, formulario y middleware. |
| OPERATIVA | NOT_APPLICABLE | La tarea define política documental de retorno; no ejecuta sesiones reales, handoffs empresariales, procesos, navegadores productivos ni cambios de actor desplegados. |
| FÍSICA | NOT_APPLICABLE | La aprobación documental no crea ni autoriza una instancia física de `SHELL-APP-014` y no modifica código, rutas, datos, Supabase, infraestructura ni despliegues. |

---

#### 61. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-014 — Definir retorno seguro entre aplicaciones`.
- [ ] `SHELL-APP-013` permanece como tarea anterior.
- [ ] `SHELL-APP-015` permanece como tarea siguiente.
- [ ] La tarea permanece exclusivamente documental.
- [ ] `PER_IMPLEMENTATION_UNIT` se conserva solo como topología posterior.
- [ ] El retorno se define como continuidad de navegación y no como autorización.
- [ ] `returnTo` se trata como input no confiable.
- [ ] Una ruta relativa no puede salir de la superficie que legítimamente la interpreta.
- [ ] Una URL absoluta requiere origen explícitamente aprobado para aplicación, ambiente y flujo.
- [ ] No se crea una lista hardcodeada de hosts como nueva autoridad canónica.
- [ ] Se rechazan esquemas no aprobados.
- [ ] Se rechazan credenciales embebidas.
- [ ] Se rechazan dominios no registrados.
- [ ] Un nombre parecido a Vento no crea confianza.
- [ ] Un retorno no cruza ambientes por inferencia.
- [ ] Una sesión existente y un login nuevo usan la misma frontera de destino permitido.
- [ ] La validación no depende solo del cliente.
- [ ] Un origen válido no equivale a `app.access`.
- [ ] Retorno y visibilidad permanecen separados.
- [ ] Una app bloqueada no se habilita por un retorno anterior.
- [ ] Una app indisponible no convierte a SHELL en fallback funcional.
- [ ] AURA permanece diferida.
- [ ] PASS permanece adyacente.
- [ ] No se crea SSO cliente ni `CUSTOMER → PASS` automático.
- [ ] El round-trip de autenticación no se clasifica automáticamente como handoff empresarial.
- [ ] La navegación ordinaria no se clasifica automáticamente como handoff empresarial.
- [ ] El universo de handoff conserva exactamente 49 relaciones.
- [ ] Se conservan exactamente 27 relaciones `DIRECTA`.
- [ ] Se conservan exactamente 22 relaciones `CONDICIONAL`.
- [ ] Se conservan exactamente 8 `ProcessId` en el universo materializado.
- [ ] Se conservan exactamente 9 aplicaciones participantes.
- [ ] `viso` conserva la única propiedad dentro del universo actual de handoffs.
- [ ] Se conservan 0 tuplas duplicadas.
- [ ] Se conservan 0 relaciones owner=participant.
- [ ] Se conservan los ocho `ProcessId` exactos aprobados.
- [ ] Se conservan las nueve aplicaciones participantes exactas aprobadas.
- [ ] La identidad de relación sigue siendo la tupla ProcessId/owner/participant.
- [ ] No se crea ID serial alternativo para el handoff.
- [ ] `CONDICIONAL` no se interpreta como relación habilitada por defecto.
- [ ] Se conservan `SOLICITUD_HANDOFF_Y_EVENTO`, `HANDOFF_PROJECTION` y `HANDOFF_REQUEST`.
- [ ] La tarea no crea un payload runtime de handoff.
- [ ] La URL no transporta estado empresarial como autoridad.
- [ ] Un handoff conserva el mismo proceso e instancia salvo transición propietaria explícita.
- [ ] La navegación no cambia ownership.
- [ ] Enviar, recibir, aceptar, ejecutar y completar permanecen separados.
- [ ] La receptora revalida contrato, actor, autorización, contexto, recurso, estado y versión cuando apliquen.
- [ ] Un parámetro de éxito no constituye resultado empresarial.
- [ ] Navegar no produce efecto empresarial por sí mismo.
- [ ] Refrescar o volver no repite una mutación.
- [ ] Deep links siguen contrato, ambiente, soporte y autorización.
- [ ] Una ruta retirada no se reemplaza por heurística.
- [ ] No se inventa un TTL universal.
- [ ] Un retorno stale o incompatible deja de ser reutilizable.
- [ ] Cambio de actor obliga a recalificar el destino.
- [ ] Logout no conserva privilegios mediante un destino previo.
- [ ] Un dispositivo compartido no transfiere autoridad entre operadores.
- [ ] Historial del navegador no es autoridad canónica de retorno.
- [ ] No se crea una pila recursiva de URLs como modelo empresarial.
- [ ] El destino no contiene secretos ni tokens.
- [ ] Query parameters no crean permisos ni resultados.
- [ ] Un retorno inválido falla cerrado.
- [ ] La recuperación respeta el tipo de actor efectivo.
- [ ] `CUSTOMER`, `SYSTEM` y `UNRESOLVED` no reciben fallback laboral por inferencia.
- [ ] Un fallo de autenticación no se presenta como resultado empresarial.
- [ ] Un fallo de navegación después de handoff no se interpreta como aceptación.
- [ ] Reabrir una URL después de un resultado no repite la acción.
- [ ] La restauración detallada de contexto permanece reservada a `SHELL-APP-015`.
- [ ] La conservación técnica de tarea en curso permanece reservada a `SHELL-APP-016`.
- [ ] SHELL no se convierte en proxy universal.
- [ ] La brecha AS-IS de `safeReturnTo` conserva sus propietarios físicos existentes.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se modifica código.
- [ ] No se modifica Supabase.
- [ ] No se crean migraciones.
- [ ] No se despliega.
- [ ] No se crea ni autoriza una instancia física.

---

#### 62. Límites

Esta tarea no:

- cambia el catálogo canónico de aplicaciones;
- cambia el ownership de los 69 procesos;
- modifica las 49 relaciones de handoff;
- crea otra relación;
- habilita una relación condicional;
- cambia `AppCode`;
- cambia `ProcessId`;
- crea una identidad de handoff adicional;
- crea rutas;
- crea URLs;
- fija dominios nuevos;
- fija un origen de producción por inferencia;
- fija un TTL universal;
- crea un stack de `returnTo`;
- crea cookies nuevas;
- crea tokens de retorno;
- crea un payload runtime de handoff;
- implementa inbox u outbox;
- implementa idempotencia;
- implementa persistencia;
- implementa SSO cliente;
- implementa account linking;
- activa AURA;
- incorpora PASS al Hub laboral;
- cambia visibilidad de aplicaciones;
- cambia explicación de bloqueos;
- absorbe lógica de otra aplicación;
- restaura detalladamente contexto cross-app;
- conserva técnicamente una tarea en curso;
- define leases o claims;
- define UI final de computador o tablet;
- corrige físicamente `safeReturnTo`;
- corrige middleware;
- corrige el formulario de login;
- modifica permisos;
- modifica autorización runtime;
- modifica Supabase;
- modifica RLS;
- modifica RPC;
- modifica migraciones;
- modifica datos;
- modifica configuración;
- despliega;
- crea una instancia física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica 04A;
- desarrolla `SHELL-APP-015`;
- desarrolla `SHELL-APP-016`.

---

#### 63. Handoff a `SHELL-APP-015`

`SHELL-APP-015` recibe:

1. destino de retorno validado antes de navegar;
2. `returnTo` tratado como transporte no confiable;
3. aplicación destino obligada a revalidar autoridad;
4. origen, ambiente y flujo compatibles como condición de retorno;
5. handoff empresarial separado de navegación ordinaria y autenticación;
6. proceso e instancia preservados conceptualmente cuando el handoff lo exige;
7. actor, recurso, sede, área, estado, versión y correlación reconocidos como referencias que pueden condicionar el retorno;
8. URL minimizada y no autoritativa;
9. retorno stale, inválido o no autorizado con fallo cerrado;
10. cambio de actor o sesión que obliga a recalificar el destino;
11. prohibición de usar historial o query parameters como autoridad;
12. detalle de restauración del contexto todavía no definido.

La siguiente tarea podrá decidir qué contexto se conserva o se reconstruye al cambiar de aplicación sin reabrir la política de destino seguro.

---

#### 64. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones`

**TAREA ACTUAL APROBADA**
`SHELL-APP-014 — Definir retorno seguro entre aplicaciones`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-015 — Conservar contexto al cambiar de aplicación`


### ✅ SHELL-APP-015 — Conservar contexto al cambiar de aplicación

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-014 — Definir retorno seguro entre aplicaciones
**Tarea siguiente:** SHELL-APP-016 — Conservar tarea en curso cuando corresponda
**Tipo de tarea:** definición técnico-documental de continuidad de contexto cross-app; fija qué referencias pueden conservarse durante un cambio de aplicación, qué hechos deben resolverse de nuevo para el `AppCode` destino y cómo impedir que snapshots, filtros, URLs o proyecciones del origen se conviertan en autoridad, conservando `PER_IMPLEMENTATION_UNIT` únicamente como topología de materialización posterior
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/03_INICIO_NAVEGACION_Y_LIMITES_DEL_HUB.md`
**Estado físico resultante:** contrato documental de continuidad de contexto cross-app definido con re-resolución autoritativa por aplicación destino, preservación mínima no autoritativa y separación estricta de la conservación de tarea en curso reservada a `SHELL-APP-016`, sin modificar runtime ni crear una instancia física
**Cambios físicos autorizados:** ninguno; no se modifican código, rutas, componentes, contratos compartidos, cachés, sesión, permisos, Supabase, datos, RLS, RPC, migraciones, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir qué significa **conservar contexto** cuando una persona cambia de una aplicación Vento OS a otra sin convertir continuidad de experiencia en reutilización de autoridad.

La decisión raíz queda:

```text
CAMBIO DE APLICACIÓN
+
REFERENCIAS DE CONTINUIDAD VÁLIDAS
+
IDENTIDAD Y SESIÓN VIGENTES
+
APP DESTINO CANÓNICA
→
NUEVA RESOLUCIÓN AUTORITATIVA EN DESTINO
→
CONTEXTO DESTINO VÁLIDO
```

Y nunca:

```text
CONTEXTO DEL ORIGEN
→ COPIAR
→ CONTEXTO AUTORITATIVO DEL DESTINO
```

Conservar contexto significa que la experiencia puede mantener continuidad semántica suficiente para que el actor comprenda dónde está y qué relación existe con el flujo anterior, mientras la aplicación destino vuelve a resolver sus hechos efectivos.

---

#### 2. Handoff recibido de `SHELL-APP-014`

Se reciben sin reapertura:

1. destino de retorno validado antes de navegar;
2. `returnTo` tratado como transporte no confiable;
3. aplicación destino obligada a revalidar autoridad;
4. origen, ambiente y flujo compatibles como condición de retorno;
5. handoff empresarial separado de navegación ordinaria y autenticación;
6. proceso e instancia preservados conceptualmente cuando el handoff lo exige;
7. actor, recurso, sede, área, estado, versión y correlación reconocidos como referencias que pueden condicionar el retorno;
8. URL minimizada y no autoritativa;
9. retorno stale, inválido o no autorizado con fallo cerrado;
10. cambio de actor o sesión que obliga a recalificar el destino;
11. historial del navegador y query parameters sin autoridad;
12. detalle de restauración de contexto reservado expresamente a esta tarea.

`SHELL-APP-015` no redefine la política de destino seguro.

---

#### 3. Definición canónica de continuidad de contexto

La continuidad de contexto cross-app se compone de dos capas distintas:

```text
CONTINUIDAD SEMÁNTICA
→ conserva referencias mínimas y orientación humana

CONTEXTO AUTORITATIVO
→ se resuelve nuevamente para la aplicación destino
```

La primera puede acompañar la navegación.

La segunda no se transporta como autoridad entre aplicaciones.

---

#### 4. Invariante principal: contexto ligado a aplicación

`AccessContextV1` se resuelve para una aplicación canónica solicitante.

Por tanto:

```text
AccessContext ORIGEN
≠
AccessContext DESTINO
```

aunque ambos correspondan a:

- la misma persona;
- la misma sesión;
- el mismo turno;
- la misma sede;
- la misma área;
- el mismo rol operativo;
- el mismo dispositivo.

La igualdad visible de algunos valores no convierte los dos contextos en la misma resolución.

---

#### 5. Cambio de aplicación no reutiliza `AccessContextV1`

Al abrir una aplicación distinta, el contexto autoritativo del origen no se reutiliza como contexto del destino.

La aplicación destino debe resolver un contexto nuevo utilizando:

- su `AppCode` canónico;
- la credencial técnica y sesión vigentes;
- las fuentes empresariales autoritativas;
- el instante de resolución aplicable;
- los contratos de contexto vigentes.

El caller no suministra actor, empleado, rol, sede, área, turno, check-in o dispositivo como hechos efectivos.

---

#### 6. `context_id` no es identidad cross-app

`context_id` identifica una resolución de contexto.

No representa:

- identidad global de sesión;
- identidad permanente del trabajador;
- handoff;
- proceso;
- recurso;
- tarea;
- cadena de navegación.

Un cambio de aplicación puede producir otro `context_id` aunque los valores visibles resulten equivalentes.

La continuidad no exige igualdad de `context_id`.

---

#### 7. Mismo contexto visible como resultado, no como supuesto

Si la aplicación destino resuelve nuevamente:

```text
mismo turno
+
misma sede operativa
+
misma área operativa
+
mismo rol operativo
```

la interfaz puede presentar continuidad visual.

Ese resultado significa:

```text
DOS RESOLUCIONES VÁLIDAS
→ HECHOS VISIBLES EQUIVALENTES
```

No significa:

```text
EL DESTINO CONFÍA EN EL SNAPSHOT DEL ORIGEN
```

---

#### 8. Hechos que deben resolverse de nuevo

La resolución destino conserva la forma completa del contrato contextual aplicable.

Deben volver a resolverse o validarse, cuando correspondan:

1. principal;
2. actor efectivo;
3. identidad de dominio;
4. empleado;
5. rol base;
6. sedes asignadas;
7. áreas asignadas;
8. cobertura administrativa;
9. turno vigente;
10. check-in vigente;
11. rol operativo;
12. sede operativa;
13. área operativa;
14. contexto de dispositivo;
15. readiness del carril base;
16. readiness del carril operativo;
17. problemas estructurales;
18. metadata y frescura de resolución.

Ninguna de estas dimensiones se hereda únicamente porque la navegación provenga de una aplicación autorizada.

---

#### 9. Lo que sí puede conservar la navegación

Sin crear otro contrato runtime, la navegación puede conservar referencias ya permitidas por sus contratos propietarios, entre ellas:

- aplicación de origen;
- aplicación destino;
- intención de navegación;
- relación de retorno aprobada;
- correlación y causalidad;
- proceso e instancia cuando exista un handoff válido;
- referencia al recurso cuando el contrato de handoff la requiera;
- referencia de estado o versión cuando sea necesaria para revalidar;
- información mínima de presentación que permita orientar al actor durante la transición.

Cada referencia conserva su propietario y no se convierte en autoridad contextual.

---

#### 10. Referencia no equivale a hecho efectivo

Una referencia transportada como:

```text
site_id
area_id
role_code
shift_ref
resource_ref
```

solo puede conservar significado si el contrato propietario la admite como referencia.

Nunca constituye por sí sola:

```text
SEDE OPERATIVA EFECTIVA
ÁREA OPERATIVA EFECTIVA
ROL OPERATIVO EFECTIVO
TURNO VIGENTE
AUTORIZACIÓN SOBRE EL RECURSO
```

El destino revalida contra su contexto y sus fuentes.

---

#### 11. `SafeContextProjectionV1` como proyección, no transferencia de autoridad

`SafeContextProjectionV1` conserva su condición de DTO seguro de presentación y transporte.

Sus doce campos permanecen:

```text
projection_version
app_code
context_id
resolved_at
principal_type
actor_type
base_role_code
operational_role_code
operational_site_id
operational_area_id
base_readiness
operational_readiness
```

Esta tarea no agrega campos.

La proyección no contiene permiso, `ALLOW`, `DENY` ni autoridad ejecutable.

---

#### 12. `app_code` de la proyección impide reinterpretación

Una `SafeContextProjectionV1` emitida para una aplicación conserva su `app_code`.

La aplicación destino no puede:

- cambiar ese código;
- ignorarlo;
- interpretar la proyección como si hubiese sido emitida para el destino;
- usarla para evitar su propia resolución;
- convertirla en capability token.

Una proyección del origen sigue siendo una proyección del origen.

---

#### 13. Uso permitido de la proyección durante transición

Cuando la experiencia necesite continuidad visual, una proyección segura vigente del origen puede utilizarse únicamente como orientación transitoria claramente no autoritativa.

Puede permitir que el actor comprenda, por ejemplo, cuál era el contexto desde el que inició la transición.

Mientras el destino no haya resuelto su contexto:

- la proyección anterior no habilita acciones contextuales;
- no confirma el contexto del destino;
- no se mezcla con datos parciales nuevos;
- no sustituye el estado de resolución.

---

#### 14. No se crea un contrato `ContextTransfer`

Esta tarea no crea:

- un nuevo DTO cross-app;
- un `ContextTransfer`;
- un token de contexto;
- un identificador global de contexto;
- una cookie cross-app de autoridad;
- un payload universal de contexto;
- una sesión paralela de contexto.

Los contratos existentes continúan siendo las autoridades.

---

#### 15. Re-resolución al entrar al destino

La secuencia conceptual obligatoria es:

```text
ORIGEN
→ valida navegación
→ transporta únicamente referencias permitidas
→ abre destino
→ destino identifica su AppCode
→ destino resuelve AccessContext nuevo
→ destino valida contrato y frescura
→ destino presenta su contexto
→ acciones posteriores se autorizan en sus fronteras exactas
```

La navegación no puede saltar la resolución del destino.

---

#### 16. Cambio de aplicación mediante SHELL

Cuando SHELL coordina el salto:

```text
SHELL
→ COORDINA
→ NO POSEE EL CONTEXTO EMPRESARIAL
→ NO REESCRIBE EL CONTEXTO PARA EL DESTINO
```

SHELL puede presentar y transportar referencias permitidas.

No se convierte en un servicio autoritativo universal de contexto por ocupar el centro de navegación.

---

#### 17. Cambio directo entre aplicaciones

Un salto directo entre aplicaciones internas no reduce los controles.

La aplicación receptora aplica las mismas obligaciones de:

- destino válido;
- sesión vigente;
- actor vigente;
- resolución contextual propia;
- revalidación del recurso;
- autorización server-side.

No es obligatorio pasar visualmente por SHELL para conservar estas garantías.

---

#### 18. Retorno a la aplicación de origen

Volver a una aplicación utilizada previamente no reactiva automáticamente su `AccessContextV1` anterior.

La aplicación que vuelve a ser destino debe resolver nuevamente su contexto.

Por tanto:

```text
A → B → A
```

implica conceptualmente:

```text
contexto A1
→ contexto B1
→ contexto A2
```

`A2` puede ser equivalente a `A1`, pero no se presume que lo sea.

---

#### 19. Round-trip de autenticación

Un round-trip por autenticación conserva la intención de retorno según `SHELL-APP-014`.

No conserva una autorización contextual anterior como si la sesión no hubiese cambiado.

Después de autenticación o reautenticación, el destino vuelve a resolver:

- sesión;
- actor;
- contexto;
- autorización aplicable.

La autenticación exitosa no demuestra que el contexto previo continúe vigente.

---

#### 20. Cambio de actor

Si cambia el actor efectivo:

```text
CONTEXTO ANTERIOR
→ DESCARTAR COMO ORIENTACIÓN ACTIVA
```

No se conservan visualmente como contexto vigente del nuevo actor:

- turno;
- sede;
- área;
- rol operativo;
- readiness;
- trabajo;
- datos personales.

Esto es obligatorio en dispositivos compartidos.

---

#### 21. Cambio de sesión

Si la sesión expira, se cierra o cambia de sujeto:

- las referencias vinculadas al actor anterior se recalifican;
- el contexto anterior deja de ser vigente;
- no se reutiliza una proyección almacenada;
- el destino requiere nueva resolución antes de cualquier acción contextual.

Una cookie o estado cliente remanente no preserva autoridad.

---

#### 22. Dispositivo compartido

La terminal y el actor humano permanecen separados.

Al cambiar de aplicación en un dispositivo compartido:

1. el destino vuelve a resolver principal y actor;
2. aplica las restricciones actuales del dispositivo;
3. no hereda el actor anterior por identidad del terminal;
4. no usa `shared_device_id` como sustituto de identidad humana;
5. no conserva turno, sede, área o rol del usuario anterior.

El dispositivo puede restringir; nunca amplía autoridad.

---

#### 23. Turno

El segmento `Turno` conserva la semántica aprobada por `SHELL-APP-004`.

Al cambiar de aplicación:

- el turno visible puede mantenerse solo si la resolución destino confirma el mismo hecho;
- un turno que terminó durante la navegación no se conserva;
- un check-in nuevo o terminado modifica la presentación;
- un turno ambiguo no se selecciona por semejanza con el origen;
- fallo de resolución no se convierte en ausencia.

No se transportan horas antiguas para llenar un contexto no resuelto.

---

#### 24. Sede

La sede operativa del destino procede nuevamente del contexto operativo resuelto.

No se utiliza como fallback:

- sede seleccionada;
- sede primaria;
- última sede operativa;
- sede de la aplicación de origen;
- sede del dispositivo;
- sede incluida en una URL.

La sede administrativa y la sede operativa permanecen separadas.

---

#### 25. Área

El área operativa del destino se deriva nuevamente del contexto válido.

No se fabrica desde:

- área seleccionada;
- filtro administrativo;
- área primaria;
- área del origen;
- tipo de área;
- query parameter;
- local storage.

La operación site-wide válida permanece distinguible de un área operativa específica.

---

#### 26. Rol operativo

El rol operativo no se conserva como string de navegación.

El destino utiliza el rol operativo que resulte de su contexto vigente.

Un `role_code` recibido como referencia:

- no crea rol efectivo;
- no corrige contexto faltante;
- no sustituye el turno;
- no amplía territorio;
- no concede permiso.

El rol base permanece separado.

---

#### 27. Readiness

`base_readiness` y `operational_readiness` son atributos de una proyección contextual específica.

El destino no hereda readiness del origen.

Debe consumir el readiness que corresponda al contexto recién resuelto.

Se conserva la invariante:

```text
READY
≠
ALLOW
```

y un cambio de aplicación no altera esa frontera.

---

#### 28. Contexto administrativo

Un filtro, selección o cobertura administrativa puede acompañar una transición únicamente cuando la aplicación destino posea un contrato que permita consumirlo como preferencia o referencia.

Nunca se transforma por transitividad en:

- sede operativa;
- área operativa;
- territorio del recurso;
- alcance de permiso;
- autorización.

Si el destino no reconoce la preferencia, la descarta sin fabricar equivalencia.

---

#### 29. Contexto operativo

El contexto operativo se deriva de hechos vigentes.

No existe una propiedad cross-app editable llamada:

```text
sede actual
área actual
rol actual
```

que pueda sobrescribirse para cambiar el contexto real.

Las aplicaciones presentan hechos resueltos; no los sincronizan mediante estado de UI.

---

#### 30. Territorio del recurso

Conservar la sede o área visibles no demuestra que el recurso del destino pertenezca a ese territorio.

Antes de una acción sobre recurso, la frontera propietaria compara:

```text
CONTEXTO EFECTIVO
+
TERRITORIO DEL RECURSO
+
PERMISO Y SCOPE
+
ESTADO DEL RECURSO
```

según sus contratos.

El contexto cross-app no sustituye el contrato de recurso.

---

#### 31. Handoff empresarial

Cuando la navegación forma parte de un handoff válido, las referencias de:

- proceso;
- instancia;
- recurso;
- actor emisor;
- participante;
- estado;
- versión;
- correlación;
- destino de retorno

pueden preservar continuidad del mismo proceso.

El contexto efectivo del receptor se sigue resolviendo de nuevo.

Un handoff válido no congela turno, sede, área, rol o autorización del receptor.

---

#### 32. Relación con las 49 relaciones de handoff materializadas

La matriz vigente de `SHELL-CON-014` conserva:

```text
49 relaciones
27 directas
22 condicionales
8 procesos
9 aplicaciones participantes
```

`SHELL-APP-015` no modifica esa matriz.

La existencia de una relación declara que el traspaso está contractualmente reconocido; no declara que el contexto del emisor sea el contexto del receptor.

---

#### 33. Relación condicional

Una relación `CONDICIONAL` no queda habilitada por transportar contexto.

La condición propietaria debe cumplirse de forma independiente.

No se permite:

```text
CONTEXTO DEL ORIGEN PARECE COMPATIBLE
→ HABILITAR RELACIÓN CONDICIONAL
```

La elegibilidad se resuelve en la frontera propietaria.

---

#### 34. Correlación y causalidad

La correlación puede conservarse entre aplicaciones para reconstruir:

- quién inició la transición;
- qué flujo la causó;
- qué solicitud corresponde a qué resultado;
- qué retorno pertenece al mismo recorrido.

La correlación no concede:

- identidad;
- contexto;
- permiso;
- ownership;
- prioridad;
- claim;
- estado de proceso.

Es trazabilidad, no autoridad.

---

#### 35. URL y query parameters

La URL puede transportar únicamente datos permitidos por el contrato de navegación.

No constituye fuente autoritativa de:

- actor;
- rol;
- sede;
- área;
- turno;
- check-in;
- dispositivo;
- readiness;
- permiso;
- scope;
- decisión.

Un query parameter correcto sintácticamente puede ser inválido semánticamente y debe revalidarse.

---

#### 36. Historial del navegador

`back`, `forward`, restauración de pestaña o historial no reactivan automáticamente el contexto que existía cuando se creó una entrada del historial.

La superficie restaurada:

1. identifica la sesión vigente;
2. resuelve contexto aplicable;
3. compara cualquier referencia con el estado actual;
4. presenta el resultado vigente.

El historial no es snapshot de autoridad.

---

#### 37. Reload y reapertura

Recargar una aplicación o volver a abrirla no justifica confiar en:

- estado React persistido;
- store cliente;
- memoria de módulo;
- `localStorage`;
- `sessionStorage`;
- una proyección antigua;
- datos precargados por otra aplicación.

La presentación puede restaurarse progresivamente, pero la autoridad se obtiene de fuentes vigentes.

---

#### 38. Deep links

Un deep link válido identifica un destino y puede incluir referencias admitidas.

No transporta un contexto operativo autoritativo.

Al abrir un deep link:

```text
DESTINO VÁLIDO
→ RESOLUCIÓN DE CONTEXTO
→ REVALIDACIÓN
→ PRESENTACIÓN / ACCIÓN
```

Un deep link no invierte ese orden.

---

#### 39. Prohibición de snapshots mezclados

Queda prohibido construir un contexto aparente combinando campos de resoluciones diferentes.

Ejemplos prohibidos:

```text
turno del origen
+
sede del destino
```

```text
rol operativo del origen
+
readiness nuevo
```

```text
área almacenada
+
context_id nuevo
```

Cada presentación contextual debe corresponder a una resolución coherente o a una proyección derivada de ella.

---

#### 40. Carrera entre navegación y cambio contextual

Si turno, check-in, rol, sede, área, actor, asignación o dispositivo cambian mientras una navegación está en curso:

```text
ESTADO NUEVO CONFIRMADO
→ PREVALECE
```

El destino no fuerza equivalencia con el contexto que inició la navegación.

Una referencia que ya no coincide se trata como stale o incompatible según su contrato.

---

#### 41. Contexto stale

Un contexto o proyección obsoletos:

- pueden servir como evidencia histórica o referencia de transición cuando sea seguro;
- no autorizan ejecución;
- no se presentan como vigentes;
- no rellenan campos faltantes del nuevo contexto;
- no se usan como fallback para mantener disponibilidad.

La aplicación debe obtener estado nuevo o fallar cerrado para las capacidades dependientes de contexto.

---

#### 42. Frescura y caché

La estrategia física de caché no pertenece a esta tarea.

Se preservan las responsabilidades existentes:

```text
L0 request-scoped
→ propietario contractual correspondiente

L1 cross-request
→ SHELL-CTX-006

generaciones y token de frescura
→ AUTH-DB-035
```

`SHELL-APP-015` solo exige que una aplicación consumidora no trate un valor stale como contexto vigente.

---

#### 43. TTL no equivale a vigencia

Un TTL no demuestra que el contexto siga siendo correcto.

Puede existir un cambio relevante antes de su vencimiento.

Por tanto:

```text
TTL VÁLIDO
≠
CONTEXTO AUTORITATIVO VIGENTE
```

Esta tarea no introduce otro TTL ni otra política de caché.

---

#### 44. Pérdida de red durante el cambio

Si el destino no puede resolver un contexto requerido por pérdida de red o indisponibilidad:

- no reutiliza como autoridad el contexto del origen;
- no inventa `Sin turno`, `Sin sede` o `Sin área`;
- no asume readiness;
- no habilita acciones contextuales por optimismo;
- distingue indisponibilidad de ausencia legítima.

La recuperación técnica pertenece a los contratos de resiliencia y a la aplicación propietaria.

---

#### 45. Estado humano durante resolución

Sin crear estados contractuales nuevos, la interfaz puede distinguir conceptualmente:

| Condición | Tratamiento |
| --- | --- |
| contexto del origen conocido y transición iniciada | origen puede mantenerse como referencia visual temporal |
| destino resolviendo | acciones dependientes del contexto destino permanecen bloqueadas |
| destino confirma hechos equivalentes | se presenta continuidad sin afirmar reutilización del snapshot |
| destino confirma hechos distintos | se reemplaza la referencia anterior por el contexto nuevo |
| destino demuestra ausencia legítima | se presenta el estado de ausencia aplicable |
| destino no puede resolver con confianza | se presenta indisponibilidad o invalidez segura |
| actor o sesión cambió | se descarta la referencia contextual anterior |

La copy final de error permanece en sus contratos propietarios.

---

#### 46. No parpadeo autoritativo

La búsqueda de continuidad visual no permite mostrar el contexto viejo como vigente durante unos milisegundos y habilitar controles dependientes de él.

Puede existir continuidad visual de orientación, pero debe diferenciarse de:

- contexto confirmado;
- readiness confirmado;
- autorización confirmada.

La UI no sacrifica seguridad para evitar un cambio visual.

---

#### 47. Cambio legítimo de contexto

Si el destino resuelve un contexto diferente, no se considera automáticamente error.

Ejemplos legítimos incluyen:

- una aplicación que no aplica carril operativo;
- cambio de check-in;
- fin de turno;
- cambio aprobado de asignación;
- restricción de dispositivo distinta;
- `app_code` con política contextual diferente.

El nuevo contexto se presenta sin intentar restaurar el anterior.

---

#### 48. Ausencia versus invalidez

Se conserva la distinción:

```text
AUSENCIA LEGÍTIMA
≠
INFORMACIÓN NO DISPONIBLE
≠
CONTRATO INVÁLIDO
≠
CONTEXTO STALE
```

Una aplicación no transforma una condición desconocida en `null` para conservar navegación fluida.

---

#### 49. Frontera laboral y PASS

La continuidad de contexto laboral no se proyecta por defecto hacia la superficie cliente de PASS.

Un tránsito hacia PASS no autoriza transportar:

- rol base laboral;
- rol operativo;
- turno;
- check-in;
- sede operativa;
- área operativa;
- readiness laboral;
- permisos laborales.

La identidad cliente y el RBAC cliente conservan sus contratos propios.

---

#### 50. AURA diferida

La presencia de AURA en catálogos o relaciones documentales no autoriza activarla mediante un salto de contexto.

`SHELL-APP-015` no cambia su readiness ni su estado de roadmap.

Una referencia contextual válida no convierte una aplicación diferida en destino operativo disponible.

---

#### 51. Simulación

`SimulationContext` permanece separado del contexto real.

Un cambio de aplicación no:

- convierte simulación en contexto real;
- transporta un override como rol efectivo;
- sustituye sede o área reales con valores simulados;
- permite ejecutar una mutación real desde una proyección simulada.

La simulación conserva sus contratos y superficies propietarias.

---

#### 52. Delegación e impersonación

Cuando exista delegación o impersonación autorizada por sus contratos, su condición no puede desaparecer visualmente por cambiar de aplicación si continúa siendo material para la seguridad de la experiencia.

Sin embargo, el destino debe volver a resolver el actor efectivo y su contexto.

Esta tarea no crea mecanismos de delegación ni impersonación.

---

#### 53. Separación de autorización

Conservar contexto no significa conservar una decisión de autorización.

Toda acción protegida conserva:

```text
CONTEXTO VIGENTE
+
PERMISO EXACTO
+
RECURSO EXACTO
+
ESTADO ACTUAL
→
NUEVA EVALUACIÓN CUANDO CORRESPONDA
```

Una decisión emitida para otra aplicación, permiso, recurso o snapshot no se reutiliza por conveniencia.

---

#### 54. Separación con trabajo en curso

Esta tarea no define cómo conservar:

- claim;
- lease;
- tarea activa;
- borrador de dominio;
- progreso de formulario;
- operación offline pendiente;
- custodia;
- bloqueo optimista;
- checkpoint de proceso;
- mecanismo de resume.

Esas decisiones pertenecen a `SHELL-APP-016` y a los contratos propietarios de cada proceso.

`SHELL-APP-015` conserva únicamente la semántica contextual necesaria para que esa tarea posterior pueda decidir reanudación sin heredar autoridad stale.

---

#### 55. Formularios abiertos

Una superficie que permanezca abierta mientras cambia el contexto no puede confirmar una mutación con la autoridad anterior.

Antes de una mutación contextual:

- revalida el contexto aplicable;
- revalida el recurso;
- revalida la autorización;
- detecta incompatibilidades.

El tratamiento del borrador y su reanudación queda fuera de esta tarea.

---

#### 56. Ownership funcional

La propiedad funcional aprobada por `SHELL-APP-013` permanece intacta.

SHELL no adquiere ownership sobre:

- turnos;
- asistencia;
- inventario;
- producción;
- compras;
- POS;
- finanzas;
- maestros;
- procesos;
- recursos.

La continuidad cross-app coordina acceso a hechos; no traslada su fuente de verdad.

---

#### 57. Estado AS-IS del SDK contextual

El package físico actual `@vento/os-context` conserva todavía una forma legacy `EffectiveContext` y adapters directos a RPC heredadas.

Entre sus campos legacy existen:

```text
effective_operational_role
site_id
area_id
shift_id
is_simulation
bypass_applied
can_operate
blocked_reasons
```

Esta tarea no adopta esa forma como contrato final.

No corrige runtime, no migra consumidores y no materializa los contratos contextuales pendientes.

---

#### 58. Prohibiciones de implementación local

Una aplicación no resuelve continuidad cross-app mediante:

- copiar `EffectiveContext` del origen;
- compartir un store mutable global;
- transportar `can_operate`;
- persistir `bypass_applied`;
- usar `blocked_reasons` como decisión;
- consultar tablas locales para completar contexto;
- mantener una matriz local de sede o rol;
- usar el último contexto exitoso ante fallo;
- rebautizar un snapshot del origen con el `AppCode` destino.

Estas prácticas crean una segunda autoridad y quedan prohibidas.

---

#### 59. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA**

**Requisitos creados:** 0

**Requisitos modificados:** 0

Justificación: la tarea especializa para SHELL la continuidad de contexto cross-app utilizando contratos de contexto, navegación, handoff, frescura, UX y seguridad ya protegidos por requisitos vigentes. No introduce una identidad contractual nueva, un nuevo DTO, una nueva decisión de autorización ni una nueva conducta observable que requiera una fila adicional en el registro.

El Registro Canónico de Requisitos de Prueba permanece sin cambios.

---

#### 60. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, se reutiliza la cobertura vigente de:

- `TREQ-SHELL-018` — frontera segura de `returnTo` y destinos aprobados;
- `TREQ-SHELL-030` — visibilidad derivada de permisos y contexto sin sustituir autorización;
- `TREQ-SHELL-063` — frontera server/client de contexto y autorización;
- `TREQ-SHELL-067` — resolución de `AccessContext` para `AppCode` canónico, validada y fail closed;
- `TREQ-SHELL-070` — `SafeContextProjectionV1` con allowlist cerrada y sin autoridad ejecutable;
- `TREQ-SHELL-072` — cliente sin RPC internas de autorización ni autoridad propia;
- `TREQ-INTEGRATION-005` — handoff con proceso, recurso, actor, territorio, estado, acción y destino de retorno preservados con revalidación;
- `TREQ-UX-006` — recuperación segura frente a pérdida de sesión, red, dispositivo o proveedor;
- `TREQ-UX-009` — contexto operativo resuelto sin fabricarlo desde filtros, preferencias o estado técnico;
- `TREQ-UX-011` — cruces entre carriles y aplicaciones con correlación, contexto y reautorización.

La lista expresa trazabilidad de cobertura existente y no modifica esas filas.

---

#### 61. Matriz de decisión cross-app

| Situación | ¿Puede conservar orientación del origen? | ¿Debe resolver contexto destino? | Resultado |
| --- | --- | --- | --- |
| misma sesión y actor, app distinta | sí, de forma mínima | sí | contexto destino manda |
| misma persona y mismos valores visibles | sí | sí | equivalencia confirmada, no snapshot reutilizado |
| `returnTo` validado después de login | sí, intención | sí | retorno solo tras resolución destino |
| handoff válido | sí, referencias contractuales | sí | continuidad de proceso sin transferencia de contexto |
| deep link válido | sí, referencia admitida | sí | destino revalida |
| cambio de turno durante navegación | no como vigente | sí | nuevo turno o estado seguro |
| cambio de check-in | no como vigente | sí | nueva condición operativa |
| cambio de sede o área | no como vigente | sí | nuevo territorio efectivo |
| cambio de rol operativo | no como vigente | sí | rol nuevo o ausencia válida |
| actor distinto en dispositivo compartido | no | sí | contexto anterior descartado |
| sesión expirada o reemplazada | no | sí después de autenticación válida | contexto anterior descartado |
| red caída sin resolución disponible | solo como referencia explícita si es seguro | sí antes de operar | no autoridad stale |
| proyección origen con versión desconocida | no | sí | rechazo de la proyección |
| app destino diferida o no disponible | no habilita | no produce disponibilidad | se mantiene bloqueada |
| tránsito a PASS cliente | no se transporta contexto laboral | aplica contrato cliente, no contexto laboral | fronteras separadas |

---

#### 62. Matriz de preservación por dimensión

| Dimensión | Durante el salto | En el destino |
| --- | --- | --- |
| actor efectivo | referencia solo para correlación cuando el contrato lo permita | se resuelve de nuevo |
| rol base | no se usa como authority carry-over | se resuelve de nuevo |
| turno | puede orientar temporalmente | se resuelve de nuevo |
| check-in | no se presume vigente | se resuelve de nuevo |
| rol operativo | no se transporta como efectivo | se resuelve de nuevo |
| sede operativa | no se transporta como efectiva | se resuelve de nuevo |
| área operativa | no se transporta como efectiva | se resuelve de nuevo |
| readiness | no se hereda | se obtiene del nuevo contexto |
| dispositivo | terminal puede ser físicamente el mismo | restricciones se resuelven de nuevo |
| proceso/instancia | puede conservarse en handoff válido | se revalida contra owner |
| recurso | puede conservarse como referencia | scope, territorio y estado se revalidan |
| correlación | sí | se conserva como trazabilidad |
| decisión de autorización | no | se evalúa donde corresponda |
| `context_id` | puede quedar como referencia histórica | nueva resolución usa su propia identidad |

---

#### 63. Matriz de fuentes rechazadas como autoridad destino

| Fuente | Tratamiento |
| --- | --- |
| query parameter | referencia no confiable; validar |
| fragmento URL | nunca autoridad contextual |
| `returnTo` | transporte de destino; no contexto |
| `localStorage` | no autoridad |
| `sessionStorage` | no autoridad |
| cookie editable de UI | no autoridad |
| React state | no autoridad |
| store global cliente | no autoridad |
| historial del navegador | no autoridad |
| último contexto exitoso | no fallback autoritativo |
| `EffectiveContext` legacy del origen | no contrato destino |
| `SafeContextProjectionV1` del origen | presentación/orientación; no autoridad destino |
| sede primaria | no sede operativa |
| sede seleccionada | no sede operativa |
| área seleccionada | no área operativa |
| nombre del rol | no rol efectivo |
| dispositivo compartido | no actor humano |
| simulación | no contexto real |

---

#### 64. Seguridad y privacidad

La continuidad cross-app aplica minimización.

No se transportan por conveniencia:

- tokens;
- secretos;
- credenciales;
- grants;
- denies;
- fingerprints internos;
- SQLSTATE;
- stack traces;
- queries;
- nombres de tablas;
- identificadores de otros actores;
- asignaciones completas;
- GPS o geocercas;
- evidencia interna innecesaria.

Las referencias necesarias se limitan al contrato de navegación o handoff aplicable.

---

#### 65. Observabilidad

La trazabilidad futura debe permitir distinguir al menos:

```text
ORIGEN
DESTINO
CORRELACIÓN
RESOLUCIÓN DE CONTEXTO DESTINO
CAMBIO O EQUIVALENCIA DE CONTEXTO
RESULTADO DE NAVEGACIÓN
```

sin registrar datos sensibles como sustituto de evidencia.

Observar una transición no concede autoridad para modificar el contexto.

---

#### 66. Compatibilidad y versiones

Una proyección o contrato contextual se consume solo si su versión es compatible.

Una versión desconocida no se interpreta por semejanza estructural.

Una aplicación no puede aceptar un payload antiguo y completar campos con defaults locales para simular compatibilidad.

La transición de versiones conserva sus gates y contratos propietarios.

---

#### 67. Fallo seguro

Cuando el destino no puede demostrar un contexto válido:

```text
NO CONTEXTO CONFIABLE
→ NO ACCIÓN DEPENDIENTE DE CONTEXTO
```

La aplicación puede seguir mostrando superficies que no dependan de ese contexto si están autorizadas por su propio carril.

No se bloquea por inferencia toda la identidad base, pero tampoco se inventa el carril operativo.

---

#### 68. Rollback conceptual

Una futura implementación podrá retirar o degradar mecanismos de optimización sin degradar las invariantes de esta tarea.

El rollback seguro siempre puede volver a:

```text
RESOLUCIÓN FRESCA POR APP DESTINO
+
SIN REUTILIZACIÓN CROSS-APP DE AUTORIDAD
```

Nunca vuelve a:

- copiar contexto legacy;
- servir stale para mantener disponibilidad;
- confiar en URL;
- usar actor del dispositivo;
- usar sede primaria como operativa;
- restaurar `can_operate` como decisión.

---

#### 69. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado en la rama documental de `SHELL-APP-015` ni sometido a la compilación canónica del plan. |
| LOCAL | NOT_EXECUTED | El checkout local de `SHELL-APP-015` todavía no ha ejecutado formateo, quality, delivery, topología ni la batería documental posterior a la inserción. |
| REMOTA | PASS | Se verificó `main` en `382e67b0976a6ffc7be423d629dac0459d32e3c4`, cierre de `SHELL-APP-014`, `active-sequence.json` con `SHELL-APP-015` como siguiente trabajo documental, owner vigente, ruta normal, topología `PER_IMPLEMENTATION_UNIT`, políticas de formato/desarrollo, protocolo, manifest, contratos `AccessContextV1` y `SafeContextProjectionV1`, responsabilidades de `SHELL-CTX-006`, principios UX cross-app, cobertura 04A aplicable y estado legacy actual de `@vento/os-context`. |
| OPERATIVA | NOT_APPLICABLE | La tarea define semántica documental de continuidad de contexto; no ejecuta un proceso empresarial ni modifica una sesión operativa real. |
| FÍSICA | NOT_APPLICABLE | Esta aprobación documental no crea ni autoriza una instancia `SHELL-APP-015` por `implementation_unit_id` y no modifica código, Supabase, datos, infraestructura ni despliegues. |

---

#### 70. Criterios de aceptación

- [ ] `SHELL-APP-014` permanece como tarea anterior.
- [ ] `SHELL-APP-016` permanece como tarea siguiente.
- [ ] La tarea conserva topología `PER_IMPLEMENTATION_UNIT` solo para materialización posterior.
- [ ] `AccessContextV1` del origen nunca se reutiliza como contexto autoritativo del destino.
- [ ] Cada aplicación destino resuelve contexto usando su propio `AppCode`.
- [ ] `context_id` no se usa como identidad cross-app.
- [ ] Igualdad visible de contexto se interpreta como resultado de resoluciones equivalentes.
- [ ] Principal, actor, identidad, empleado, roles, territorio, turno, check-in, dispositivo, readiness e issues se resuelven de nuevo cuando apliquen.
- [ ] Referencias de navegación y handoff permanecen no autoritativas.
- [ ] `SafeContextProjectionV1` conserva exactamente sus doce campos.
- [ ] La proyección del origen no se rebautiza ni se usa como proyección del destino.
- [ ] No se crea un nuevo contrato de transferencia de contexto.
- [ ] Retornar a una aplicación previamente visitada exige nueva resolución.
- [ ] Login y reautenticación no restauran autorización contextual anterior.
- [ ] Cambio de actor o sesión descarta el contexto previo.
- [ ] Dispositivo compartido no transfiere actor humano.
- [ ] Turno, sede, área y rol visibles solo permanecen si el destino los confirma.
- [ ] Readiness no se hereda y no se convierte en `ALLOW`.
- [ ] Filtros administrativos no se transforman en contexto operativo.
- [ ] Territorio del recurso se revalida independientemente.
- [ ] Handoff conserva continuidad de proceso sin transferir contexto efectivo.
- [ ] Las 49 relaciones de handoff permanecen sin modificación.
- [ ] Correlación conserva trazabilidad sin autoridad.
- [ ] URL, historial, reload y deep links no son fuentes de contexto.
- [ ] No se mezclan campos de snapshots distintos.
- [ ] Un cambio contextual concurrente hace prevalecer el estado nuevo confirmado.
- [ ] Contexto stale no se usa como fallback autoritativo.
- [ ] No se crea política de caché, TTL o invalidación alternativa.
- [ ] Pérdida de red no convierte contexto viejo en autoridad.
- [ ] Ausencia, indisponibilidad, invalidez y stale permanecen separados.
- [ ] PASS no recibe contexto laboral por transitividad.
- [ ] AURA no se activa por continuidad de contexto.
- [ ] Simulación no se convierte en contexto real.
- [ ] Delegación o impersonación no desaparecen silenciosamente cuando sean materiales.
- [ ] Decisiones de autorización no se reutilizan cross-app.
- [ ] Claims, leases, borradores, checkpoints y resume permanecen reservados a `SHELL-APP-016`.
- [ ] Formularios abiertos no confirman con contexto vencido.
- [ ] SHELL conserva coordinación sin ownership universal.
- [ ] `EffectiveContext` legacy no se adopta como contrato final.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se modifica el Registro Canónico de Requisitos de Prueba.
- [ ] No se modifica runtime ni se crea una instancia física.

---

#### 71. Handoff a `SHELL-APP-016`

`SHELL-APP-016` recibe:

1. contexto autoritativo resuelto por aplicación, nunca copiado cross-app;
2. distinción entre continuidad semántica y autoridad;
3. actor, sesión, turno, sede, área, rol y dispositivo revalidados en destino;
4. referencias de proceso, instancia, recurso y correlación conservables cuando exista contrato;
5. contexto stale sin autoridad;
6. prohibición de mezclar snapshots;
7. formulario o superficie abierta obligada a revalidar antes de mutar;
8. ausencia, invalidez e indisponibilidad separadas;
9. handoff y navegación sin claim, start ni resume implícitos;
10. definición de conservación de trabajo en curso todavía pendiente.

La siguiente tarea puede decidir qué estado de tarea, claim, borrador o checkpoint se conserva y cómo se reanuda, sin reabrir la política contextual.

---

#### 72. Límites

Esta tarea no:

- modifica `AccessContextV1`;
- modifica `SafeContextProjectionV1`;
- crea contratos compartidos nuevos;
- crea payloads runtime de handoff;
- crea rutas, URLs o deep links;
- modifica `returnTo`;
- implementa SSO;
- modifica sesión o cookies;
- implementa caché L0 o L1;
- implementa generación o invalidación de frescura;
- implementa contexto en `@vento/os-context`;
- migra consumidores legacy;
- modifica turnos o check-ins;
- modifica sedes, áreas o roles;
- modifica dispositivos compartidos;
- modifica simulación, delegación o impersonación;
- modifica permisos, grants, denies, scopes o decisiones;
- modifica ownership, procesos o relaciones de handoff;
- modifica PASS;
- activa AURA;
- modifica código de SHELL;
- modifica Supabase, RLS, RPC, migraciones o datos;
- crea una instancia física;
- define claim, lease, borrador, checkpoint, offline queue o resume;
- desarrolla `SHELL-APP-016`.

---

#### 73. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-014 — Definir retorno seguro entre aplicaciones`

**TAREA ACTUAL APROBADA**
`SHELL-APP-015 — Conservar contexto al cambiar de aplicación`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-016 — Conservar tarea en curso cuando corresponda`


### [ ] SHELL-APP-016 — Conservar tarea en curso cuando corresponda
