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


### [ ] SHELL-APP-010 — Explicar por qué una aplicación está bloqueada
### [ ] SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente
### [ ] SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente
### [ ] SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones
### [ ] SHELL-APP-014 — Definir retorno seguro entre aplicaciones
### [ ] SHELL-APP-015 — Conservar contexto al cambiar de aplicación
### [ ] SHELL-APP-016 — Conservar tarea en curso cuando corresponda
