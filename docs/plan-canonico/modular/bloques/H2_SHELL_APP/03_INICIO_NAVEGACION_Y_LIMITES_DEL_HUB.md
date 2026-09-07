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


### [ ] SHELL-APP-011 — Separar aplicaciones laborales de superficies adyacentes sin convertir SHELL en acceso del cliente
### [ ] SHELL-APP-012 — Mantener PASS fuera del RBAC laboral del cliente
### [ ] SHELL-APP-013 — Evitar lógica funcional propia de otras aplicaciones
### [ ] SHELL-APP-014 — Definir retorno seguro entre aplicaciones
### [ ] SHELL-APP-015 — Conservar contexto al cambiar de aplicación
### [ ] SHELL-APP-016 — Conservar tarea en curso cuando corresponda
