### MINI-BLOQUE — EXPERIENCIA ADMINISTRATIVA

<!-- PLAN-SECTION-META:START -->
**Cobertura canónica:** `VISO-UX-001` a `VISO-UX-020` — 20 tareas.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:VISO-UX -->
### Reconciliación topológica de VISO-UX-001 a VISO-UX-020

Este bloque constituye un delta funcional ejecutable de VISO: reorganiza navegación, crea secciones, aplica alcance territorial, muestra conflictos y permisos, enlaza propietarios y ejecuta pruebas con administradores reales.

| Propiedad | Valor |
| --- | --- |
| modalidad | `PER_IMPLEMENTATION_UNIT` |
| gate temporal | `POST_E5_PACKAGE` |
| identidad física | `<task_id>::<implementation_unit_id>` |

### ✅ VISO-UX-001 — Reorganizar navegación por dominios administrativos

**Estado:** APROBADA
**Tarea anterior:** NUMERA-UX-028 — Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva
**Tarea siguiente:** VISO-UX-002 — Crear sección Personal
**Tipo de tarea:** definición técnico-documental de la arquitectura de navegación administrativa de VISO; fija la jerarquía de entrada, seis dominios administrativos, reglas de pertenencia, navegación interna, deep links, filtrado por autorización, tratamiento de rutas hijas y frontera de superficies con propietario externo, conservando `PER_IMPLEMENTATION_UNIT` como topología de materialización posterior y `POST_E5_PACKAGE` como gate físico
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato de navegación administrativa definido; la materialización runtime permanece pendiente por `implementation_unit_id` y solo puede ejecutarse después del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, navegación runtime, `app_navigation_items`, `app_screen_registry`, rutas, componentes, permisos, Supabase, datos, migraciones, RLS, RPC, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la arquitectura de información que debe usar VISO para dejar de presentar una colección heterogénea de rutas administrativas como un menú plano o dependiente de cómo fueron creadas técnicamente y reorganizar la navegación alrededor de dominios empresariales comprensibles.

La navegación objetivo debe permitir que una persona autorizada responda sin conocer rutas, tablas, repositorios ni nombres internos:

```text
¿ESTOY EN VISO?
¿QUÉ DOMINIO ADMINISTRATIVO NECESITO?
¿QUÉ PUEDO CONSULTAR O ADMINISTRAR EN MI ALCANCE?
¿CUÁL ES LA SUPERFICIE PRINCIPAL DEL DOMINIO?
¿CUÁNDO DEBO IR A OTRA APLICACIÓN PROPIETARIA?
```

La tarea reorganiza la arquitectura de navegación.

No diseña todavía el contenido final de cada sección, no crea nuevas capacidades empresariales y no convierte a VISO en propietario universal de funciones existentes en otras aplicaciones.

---

#### 2. Naturaleza y topología

La topología aplicable es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
instance_pattern = <task_id>::<implementation_unit_id>
```

Por tanto:

- el marcador canónico define una sola vez el contrato de navegación;
- cada materialización física aplicable pertenece a una `implementation_unit_id` gobernada;
- la aprobación documental no crea ni autoriza una instancia física;
- ninguna materialización puede ejecutarse antes del gate `POST_E5_PACKAGE` aplicable;
- la navegación física deberá demostrar conformidad con este contrato sin reabrir sus decisiones por conveniencia local.

---

#### 3. Handoff recibido del cierre anterior y del núcleo de VISO

La continuidad canónica entra a esta tarea después de `NUMERA-UX-028`, pero el diseño de VISO consume además el núcleo administrativo ya cerrado por `VISO-CORE-001..006`.

Se preservan como invariantes:

```text
VISO_ADMINISTRA_EL_MODELO = YES
VISO_ES_PROPIETARIO_UNIVERSAL_DE_LA_OPERACION = NO
NAVEGACION_ES_AUTORIZACION = NO
RUTA_VISIBLE_ES_AUTORIZACION = NO
ROL_NOMINAL_ES_AUTORIZACION = NO
SEDE_SELECCIONADA_ES_TERRITORIO = NO
PERFIL_OPERATIVO_ES_ROL_EFECTIVO = NO
PREVIEW_ES_AUTORIZACION_REAL = NO
SIMULACION_ES_AUTORIZACION_REAL = NO
```

El núcleo ya protege trabajador, organización, sede, área, roles, perfiles, matrices, asignaciones, contexto, procedencia, conflictos, límites y auditoría.

`VISO-UX-001` decide únicamente cómo organizar la entrada administrativa a esas capacidades y a sus handoffs.

---

#### 4. Fuentes de navegación consumidas

La tarea consume sin sustituir:

- el inventario estable de rutas VISO y sus identidades `VISO-ROUTE-*`;
- el contrato administrativo transversal que organiza trabajo administrativo por dominio, responsabilidad, caso o maestro;
- el núcleo mínimo de VISO y sus fronteras de ownership;
- la autorización de VISO ya definida;
- la configuración runtime basada en `app_navigation_items`;
- el registro de superficies basado en `app_screen_registry`;
- el filtrado por `required_permission_code` y contexto efectivo;
- la navegación responsive y colapsable ya provista por el shell visual de VISO;
- las tareas `VISO-UX-002..007`, propietarias del contenido de los seis dominios;
- las tareas `VISO-UX-013..020`, propietarias de alcance territorial, procedencia, conflictos, preview, ownership, handoffs, divulgación progresiva y validación con usuarios reales.

---

#### 5. Problema AS-IS que resuelve la tarea

El snapshot actual de VISO conserva rutas que mezclan, en una misma aplicación física:

- núcleo administrativo propio de VISO;
- configuración de organización;
- personal;
- programación laboral;
- roles y permisos;
- operación administrativa;
- auditoría;
- superficies comerciales;
- productos;
- menús;
- PASS;
- CMS;
- vacantes;
- contabilidad;
- actualizaciones y otras superficies con ownership distinto o todavía en transición.

La existencia física de una ruta dentro de `vento-viso` no determina su dominio propietario ni justifica conservarla como entrada primaria de VISO.

Se congela:

```text
PHYSICAL_ROUTE_LOCATION
!= CANONICAL_DOMAIN_OWNERSHIP
!= PRIMARY_NAVIGATION_PLACEMENT
```

---

#### 6. Resultado contractual

Se define el contrato:

```text
VISO_ADMINISTRATIVE_NAVIGATION_CONTRACT = VISO-ADMINISTRATIVE-NAVIGATION-001
```

El contrato produce una navegación administrativa con:

```text
SPECIAL_ENTRY_COUNT = 1
ADMINISTRATIVE_DOMAIN_COUNT = 6
SYSTEM_ROUTE_CLASS_COUNT = 1
CROSS_OWNER_TRANSITION_CLASS_COUNT = 1
CHILD_ROUTE_CLASS_COUNT = 1
```

La entrada especial es `Inicio`.

Los seis dominios son exactamente:

```text
Personal
Programación
Acceso y seguridad
Organización
Operación
Auditoría
```

No se crea un séptimo dominio administrativo de VISO por conveniencia de rutas legacy.

---

#### 7. Orden canónico de navegación

La jerarquía visible objetivo queda:

```text
Inicio

Personal
Programación
Acceso y seguridad
Organización
Operación
Auditoría
```

`Inicio` no cuenta como dominio administrativo.

El orden de los seis dominios coincide con la secuencia de desarrollo `VISO-UX-002..007` y constituye la jerarquía de navegación primaria de VISO.

La materialización física podrá usar agrupación visual, secciones plegables o mecanismos equivalentes siempre que preserve este orden semántico y no mezcle dominios.

---

#### 8. Entrada especial `Inicio`

La ruta raíz de VISO permanece como entrada administrativa especial.

Se conserva:

```text
PRIMARY_ENTRY = /
PRIMARY_ENTRY_LABEL = Inicio
PRIMARY_ENTRY_IS_ADMIN_DOMAIN = NO
PRIMARY_ENTRY_IS_PERMISSION_WILDCARD = NO
```

`Inicio` puede resumir información autorizada y enlazar a destinos permitidos.

No concede autoridad sobre esos destinos y no sustituye sus permisos, contexto ni guards.

Su contenido por perfil permanece reservado a `VISO-UX-008..012`.

---

#### 9. Dominio `Personal`

`Personal` representa la navegación administrativa relacionada con la persona trabajadora y su relación administrativa dentro de VISO.

Su contenido final pertenece a:

```text
VISO-UX-002 — Crear sección Personal
```

`VISO-UX-001` solo fija:

- que `Personal` existe como dominio primario;
- que no absorbe reclutamiento completo de TALENTO;
- que no absorbe asistencia personal de ANIMA;
- que las rutas hijas de una persona no necesitan aparecer como entradas independientes del sidebar;
- que una superficie de detalle conserva la identidad de la persona y el contexto con el que fue abierta.

---

#### 10. Dominio `Programación`

`Programación` representa la administración de programación laboral y sus vistas autorizadas.

Su contenido final pertenece a:

```text
VISO-UX-003 — Crear sección Programación
```

`VISO-UX-001` fija que:

- Semana y Mes pertenecen al mismo dominio de navegación;
- una variante semanal, mensual, global, de métricas o configuración no crea un dominio nuevo;
- la existencia de varias rutas no permite crear fuentes de programación paralelas;
- las reglas específicas del delta mensual permanecen en `VISO-SCH-*` y no se redefinen aquí.

---

#### 11. Dominio `Acceso y seguridad`

`Acceso y seguridad` representa la administración de roles, permisos, matrices, simulación permitida, dispositivos y configuración administrativa de acceso.

Su contenido final pertenece a:

```text
VISO-UX-004 — Crear sección Acceso y seguridad
```

La navegación no convierte esta sección en wildcard.

Debe conservarse:

```text
ACCESS_SECTION_VISIBLE
!= ALL_SECURITY_ACTIONS_ALLOWED
```

Cada superficie y acción continúa usando el permiso exacto, el contexto y la autorización server-side aplicables.

---

#### 12. Dominio `Organización`

`Organización` representa la estructura administrativa necesaria para ubicar personas, sedes, áreas y relaciones organizacionales autorizadas.

Su contenido final pertenece a:

```text
VISO-UX-005 — Crear sección Organización
```

Se preserva:

```text
ORGANIZACION != SEDE
SEDE != AREA
AREA != PERMISO
NOMBRE_DE_SEDE != ALCANCE
```

La sección no convierte a VISO en propietario de datos jurídicos, comerciales o maestros que tengan otro owner.

---

#### 13. Dominio `Operación`

`Operación` representa configuración y supervisión administrativa de contexto operativo que sí pertenece a VISO.

Su contenido final pertenece a:

```text
VISO-UX-006 — Crear sección Operación
```

El dominio puede organizar configuración administrativa de:

- puntos de marcación;
- perfiles operativos;
- roles por sede;
- preview administrativo;
- relaciones de contexto que VISO deba administrar.

No absorbe ejecución propietaria de NEXO, FOGO, ORIGO, PULSO, NUMERA, PASS, ANIMA u otras aplicaciones.

---

#### 14. Dominio `Auditoría`

`Auditoría` representa consulta administrativa autorizada de cambios, decisiones, conflictos y evidencia que VISO puede mostrar dentro de su frontera.

Su contenido final pertenece a:

```text
VISO-UX-007 — Crear sección Auditoría
```

La navegación debe mantener:

```text
AUDITORIA_DESCRIBE_LO_OCURRIDO = YES
AUDITORIA_ES_ESTADO_VIGENTE = NO
AUDITORIA_ES_AUTORIZACION = NO
```

Una superficie de auditoría perteneciente funcionalmente a otro dominio no se vuelve propiedad de VISO por aparecer físicamente en `vento-viso`.

---

#### 15. Relación con los dieciséis dominios administrativos transversales

El contrato transversal de experiencia administrativa contiene dieciséis dominios empresariales.

VISO no debe reproducirlos como dieciséis grupos de sidebar.

La navegación VISO proyecta únicamente los dominios que corresponden a su responsabilidad administrativa directa y conserva handoffs hacia las aplicaciones propietarias para el resto.

Se congela:

```text
TRANSVERSAL_ADMIN_DOMAIN_COUNT = 16
VISO_PRIMARY_ADMIN_NAV_DOMAIN_COUNT = 6
```

Los diez dominios restantes no se convierten por inferencia en secciones locales de VISO.

---

#### 16. Clasificación obligatoria de toda superficie VISO observada

Toda ruta o superficie considerada por la navegación deberá resolverse en exactamente una de estas clases:

| Clase | Significado | Tratamiento de navegación |
| --- | --- | --- |
| `PRIMARY_ENTRY` | entrada especial de VISO | visible como `Inicio` cuando esté autorizada |
| `VISO_DOMAIN_ENTRY` | entrada principal de uno de los seis dominios | visible dentro de su dominio cuando esté autorizada |
| `CHILD_OR_DETAIL_ROUTE` | alta, detalle, configuración o drill-down dependiente | no compite como entrada primaria; se alcanza desde su padre o deep link válido |
| `SYSTEM_ROUTE` | login, denegación u otra superficie técnica de sesión/estado | fuera de la navegación administrativa ordinaria |
| `CROSS_OWNER_TRANSITION` | superficie físicamente presente en VISO cuyo dominio propietario es otro o permanece pendiente de handoff | no se promociona como dominio VISO; conserva transición hasta `VISO-UX-017/018` y gates aplicables |

No se admite una sexta clase genérica `OTHER` para evitar decidir ownership o ubicación.

---

#### 17. Inventario de rutas protegido

La reorganización consume el registro de identidades VISO sin renumerarlo.

Se conserva como universo contractual:

```text
VISO_ROUTE_ID_RANGE = VISO-ROUTE-001..VISO-ROUTE-061
VISO_PAGE_COUNT_TARGET = 61
```

La reorganización:

- no renumera `VISO-ROUTE-*`;
- no asigna una identidad nueva a una ruta por moverla de grupo;
- no convierte una ruta hija en pantalla nueva por mostrarla desde otra sección;
- no elimina una identidad histórica para simplificar el sidebar;
- no declara certificada la reconciliación física de las 61 rutas sin la evidencia de sus tareas propietarias.

---

#### 18. Distribución AS-IS observada que debe ser reconciliada

El inventario y el delta mensual protegido permiten distinguir el universo actual de 61 rutas en estas familias observables antes del diseño detallado de `VISO-UX-002..007`:

| Familia AS-IS | Cantidad | Decisión de `VISO-UX-001` |
| --- | ---: | --- |
| raíz `/` | 1 | `PRIMARY_ENTRY` |
| rutas de sistema `/login` y `/no-access` | 2 | `SYSTEM_ROUTE` |
| familia `/staff*`, incluyendo mensual | 11 | debe distribuirse entre dominios propietarios posteriores sin crear un dominio `staff` |
| familia `/operations*` y `/operations-map` | 6 | candidata a `Operación`, su detalle final queda en `VISO-UX-006` |
| `/ops/audit` | 1 | candidata a `Auditoría`, su detalle final queda en `VISO-UX-007` |
| `/roles-permissions` y `/app-navigation` | 2 | candidatas a `Acceso y seguridad`, su detalle final queda en `VISO-UX-004` |
| `/businesses*` y `/sites*` | 6 | candidatas a `Organización`, su detalle final queda en `VISO-UX-005` |
| demás rutas observadas | 32 | `CROSS_OWNER_TRANSITION` o clasificación posterior explícita; no se convierten automáticamente en dominios VISO |

Los conteos describen el inventario de transición.

No son una autorización para retirar, mover o exponer físicamente una ruta.

---

#### 19. Rutas hijas y de detalle

Una navegación por dominios no debe convertir cada página física en entrada primaria.

Se conserva:

```text
LIST_ROUTE
!= DETAIL_ROUTE
!= CREATE_ROUTE
!= CONFIGURATION_SUBROUTE
```

Rutas como:

```text
/new
/[id]
/[slug]
/settings
/manage
```

se consideran hijas cuando dependen semánticamente de una superficie padre.

Una ruta hija puede abrirse por acción contextual o deep link autorizado sin aparecer en el sidebar.

---

#### 20. Navegación data-driven

El runtime actual ya consume navegación mediante filas gobernadas de `app_navigation_items`.

La materialización de este contrato debe reutilizar ese mecanismo o una evolución canónica equivalente.

Se preserva:

```text
NAVIGATION_SOURCE_IS_GOVERNED_DATA = YES
DUPLICATE_HARDCODED_NAV_TREE_REQUIRED = NO
```

La tarea no ordena crear un segundo catálogo de navegación en código.

La configuración física deberá conservar identidad de aplicación, grupo, orden, destino, permiso requerido y activación de cada entrada.

---

#### 21. Registro de pantallas y promoción a navegación

`app_screen_registry` permanece como registro de superficies detectadas y su clasificación navegable.

Se mantiene la separación:

```text
SCREEN_EXISTS
!= SCREEN_IS_MENU_CANDIDATE
!= SCREEN_IS_ACTIVE_NAV_ITEM
```

Una pantalla detectada no aparece en el menú por existir en código.

Su incorporación exige clasificación de dominio, ownership, elegibilidad como entrada primaria y permiso correspondiente.

---

#### 22. `group_label` no concede semántica por sí solo

El runtime actual puede agrupar filas por `group_label` y `group_order`.

La materialización de `VISO-UX-001` deberá hacer que esas agrupaciones representen los seis dominios aprobados.

No se permitirá usar una etiqueta arbitraria para:

- crear un dominio nuevo;
- esconder una superficie cross-owner dentro de un grupo VISO;
- evitar un handoff;
- ampliar permisos;
- mezclar configuración, operación y auditoría bajo una etiqueta genérica.

---

#### 23. Filtrado por autorización

La navegación continúa siendo fail-closed.

Una entrada primaria solo puede mostrarse cuando exista un `required_permission_code` resoluble y la autorización efectiva permita su lectura dentro del contexto aplicable.

Se conserva:

```text
MISSING_REQUIRED_PERMISSION = HIDE_OR_DENY
NAV_ITEM_VISIBLE = AUTHORIZATION_PROJECTION_ONLY
NAV_ITEM_VISIBLE != ACTION_AUTHORIZED
```

La acción destino vuelve a validar su propia autorización.

---

#### 24. Alcance territorial y contexto

La organización por dominios no elimina contexto.

La navegación debe seguir respetando, cuando apliquen:

- sede activa;
- área activa;
- actor efectivo;
- rol operativo;
- turno o jornada cuando el contrato lo exija;
- dispositivo compartido;
- simulación;
- recurso concreto.

`VISO-UX-013` conserva la definición detallada del alcance territorial de la experiencia.

`VISO-UX-001` únicamente prohíbe que el dominio visible fabrique o amplíe contexto.

---

#### 25. Dispositivos compartidos

La navegación en dispositivo compartido conserva su filtro por aplicación y rol de navegación aplicable.

La reorganización de dominios no puede hacer visible una sección completa si el dispositivo o actor solo está autorizado para una parte.

Se conserva:

```text
SHARED_DEVICE_DOMAIN_VISIBILITY
= DERIVED_FROM_ALLOWED_NAV_ITEMS
```

No:

```text
SHARED_DEVICE_DOMAIN_VISIBILITY
= DOMAIN_LABEL_EXISTS
```

---

#### 26. Deep links y acceso directo

Una ruta puede seguir siendo alcanzable sin aparecer como entrada primaria.

Todo deep link debe:

1. resolver sesión y actor;
2. revalidar acceso a VISO;
3. resolver contexto requerido;
4. revalidar permiso del destino;
5. resolver recurso y estado cuando aplique;
6. fallar cerrado si el destino dejó de ser válido o autorizado.

Mover una entrada de grupo no cambia estas reglas.

---

#### 27. La navegación no transporta autoridad

Queda prohibido transportar mediante URL, query, storage local o metadata visual:

- permiso efectivo;
- actor autoritativo;
- estado objetivo;
- rol efectivo no revalidado;
- alcance territorial autoritativo;
- aprobación;
- decisión de autorización.

La navegación transporta únicamente referencias no secretas necesarias para abrir el destino y revalidarlo.

---

#### 28. Superficies con propietario externo

La existencia actual en VISO de superficies de:

- contabilidad;
- productos;
- menús;
- contenido;
- PASS;
- CMS;
- vacantes;
- comercial;
- tarifas;
- actualizaciones;
- otros dominios no propietarios;

no las convierte en secciones primarias de VISO.

Se congela:

```text
CROSS_OWNER_ROUTE_IN_VISO
!= VISO_DOMAIN
```

Su disposición final pertenece a `VISO-UX-017` y `VISO-UX-018`, además de los contratos de retiro, alias, redirects y consumidores ya existentes.

---

#### 29. No retiro prematuro

`VISO-UX-001` clasifica navegación objetivo pero no autoriza borrar rutas.

Una superficie cross-owner existente permanece disponible según su contrato actual hasta que exista:

- propietario destino definido;
- handoff protegido;
- reemplazo o destino materializado;
- autorización equivalente o más restrictiva;
- consumidores reconciliados;
- rollout y rollback aplicables;
- evidencia de que el retiro no rompe deep links ni operación.

La limpieza física de navegación no precede esas condiciones.

---

#### 30. Relación con `VISO-UX-017`

`VISO-UX-017 — Evitar duplicar configuración propia de otras aplicaciones` conserva la decisión sobre qué configuración debe dejar de administrarse localmente en VISO.

`VISO-UX-001` no resuelve anticipadamente cada duplicidad.

Solo establece que una superficie de ownership externo no puede convertirse en dominio VISO por su ubicación física actual.

---

#### 31. Relación con `VISO-UX-018`

`VISO-UX-018 — Enlazar a la aplicación propietaria cuando corresponda` conserva la definición final de los handoffs cross-app.

`VISO-UX-001` exige que la arquitectura de navegación tenga un lugar para esos handoffs sin presentarlos como mutaciones locales equivalentes.

Se conserva:

```text
CROSS_APP_LINK
!= LOCAL_EDITOR
```

---

#### 32. Relación con `VISO-UX-019`

`VISO-UX-019 — Aplicar divulgación progresiva a seguridad avanzada` conserva el diseño detallado de información avanzada.

La navegación primaria no debe competir con detalles técnicos, matrices extensas, diagnósticos o configuración excepcional.

Las opciones avanzadas deberán aparecer dentro del dominio adecuado y bajo demanda.

---

#### 33. Etiquetas de navegación

Las etiquetas primarias deben usar lenguaje empresarial.

Queda prohibido usar como nombre primario de sección:

- tabla;
- schema;
- RPC;
- permiso;
- repositorio;
- componente;
- helper;
- migración;
- identificador técnico;
- nombre de archivo;
- implementación interna.

Los seis nombres aprobados son la taxonomía empresarial de primer nivel.

---

#### 34. Sidebar colapsado y responsive

La reorganización debe conservar semántica también cuando el sidebar esté colapsado o la navegación se muestre en móvil.

Se exige:

- accesibilidad por teclado;
- nombre accesible de cada destino;
- asociación inequívoca con su dominio;
- no depender solo del color;
- conservar contexto activo relevante;
- permitir volver al nivel de dominio sin perder la ruta actual;
- evitar que el modo colapsado convierta seis dominios en una lista indistinguible de iconos.

La implementación visual concreta pertenece a la unidad física aplicable.

---

#### 35. Estado activo y navegación anidada

Una ruta hija mantiene activo el dominio y la entrada padre correspondiente.

Se conserva:

```text
DETAIL_ROUTE_ACTIVE
→ PARENT_DOMAIN_ACTIVE
```

No se exige insertar cada detalle como entrada visible para obtener estado activo.

La navegación debe poder identificar el dominio actual a partir de la relación canónica de la superficie, no únicamente por coincidencia textual accidental del pathname.

---

#### 36. Estado sin entradas autorizadas

Si una persona no posee ninguna entrada autorizada dentro de un dominio:

```text
VISIBLE_DOMAIN_WITH_ZERO_ALLOWED_ITEMS = NO
```

Ocultar el dominio no equivale a negar silenciosamente una ruta que el usuario intentó abrir por deep link.

El acceso directo debe producir el estado de denegación canónico cuando corresponda.

---

#### 37. Administración de navegación

La superficie existente de administración de navegación puede continuar gestionando entradas detectadas y activas, pero deberá respetar este contrato al operar sobre VISO.

No podrá usarse para:

- crear dominios de primer nivel incompatibles con los seis aprobados;
- promover automáticamente toda pantalla detectada;
- convertir una ruta hija en entrada primaria sin decisión explícita;
- convertir una superficie cross-owner en dominio VISO;
- omitir permiso requerido;
- saltar la clasificación propietaria.

La herramienta administra configuración.

No redefine arquitectura canónica por sí sola.

---

#### 38. Comportamiento de `/operations*`

El runtime actual ya colapsa distintas rutas `/operations*` hacia una entrada principal de `Operación` en el shell de navegación.

Esa decisión es compatible con este contrato:

```text
MULTIPLE_CHILD_ROUTES
→ ONE_PRIMARY_DOMAIN_ENTRY
```

La reorganización generaliza el principio sin convertir todos los dominios en una única ruta ni perder rutas hijas legítimas.

---

#### 39. Compatibilidad con la navegación actual

La implementación podrá realizar una transición gradual siempre que durante la ventana de compatibilidad:

- las rutas existentes sigan protegidas;
- las identidades `VISO-ROUTE-*` permanezcan estables;
- el destino no dependa de una etiqueta antigua para autorizar;
- no existan dos mutaciones competidoras para la misma capacidad;
- los enlaces antiguos conduzcan a un destino seguro o permanezcan activos hasta su retiro gobernado;
- el cambio de agrupación no altere datos ni ownership.

---

#### 40. Contrato de pertenencia a dominio

Una entrada pertenece a uno de los seis dominios solo cuando la capacidad primaria que representa satisface simultáneamente:

1. intención administrativa compatible;
2. ownership o proyección administrativa legítima de VISO;
3. superficie principal o acceso razonable al dominio;
4. permiso de lectura/navegación resoluble;
5. contexto y territorio compatibles;
6. ausencia de un owner externo que deba recibir el handoff en lugar de un editor local.

Si la sexta condición falla, la superficie se clasifica como transición cross-owner y no como dominio VISO.

---

#### 41. Contrato de no duplicación

Se congela:

```text
SAME_CAPABILITY_IN_MULTIPLE_DOMAINS_AS_PRIMARY = FORBIDDEN
```

Una capacidad puede ser referenciada desde otra sección mediante:

- enlace contextual;
- resumen;
- relación;
- evidencia;
- shortcut autorizado;

pero conserva un único dominio primario dentro de VISO o un único owner externo cuando no pertenece a VISO.

---

#### 42. Preservación de contexto al navegar

La navegación entre dominios no debe fabricar ni perder silenciosamente:

- sede;
- área;
- actor efectivo;
- modo de simulación;
- recurso seleccionado;
- versión;
- filtro material;

cuando esos elementos formen parte legítima de la experiencia destino.

Los valores autoritativos se revalidan.

Los filtros de presentación pueden restablecerse cuando el contrato del destino así lo defina.

---

#### 43. Regla de cambio de dominio

Cambiar de dominio significa cambiar de área administrativa de trabajo.

No significa:

- cambiar de aplicación propietaria automáticamente;
- cambiar de actor;
- cambiar de rol efectivo;
- cambiar de sede;
- conceder permiso;
- iniciar un proceso;
- guardar cambios pendientes.

Cualquier efecto adicional requiere su contrato propietario.

---

#### 44. Error, denegación y ausencia permanecen separados

La navegación debe distinguir:

```text
NO_ALLOWED_ITEMS
!= NOT_AUTHORIZED
!= NOT_AVAILABLE
!= NOT_IMPLEMENTED
!= TECHNICAL_FAILURE
```

Un error al cargar navegación no puede interpretarse como menú vacío válido.

Una denegación no puede presentarse como ruta inexistente cuando ello rompa la experiencia de seguridad aprobada.

---

#### 45. Decisiones congeladas

```text
VISO_ADMINISTRATIVE_NAVIGATION_CONTRACT = VISO-ADMINISTRATIVE-NAVIGATION-001
PRIMARY_ENTRY = /
PRIMARY_ENTRY_LABEL = Inicio
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
TRANSVERSAL_ADMIN_DOMAIN_COUNT = 16
VISO_ROUTE_ID_RANGE = VISO-ROUTE-001..VISO-ROUTE-061
VISO_PAGE_COUNT_TARGET = 61
NAVIGATION_SOURCE_IS_GOVERNED_DATA = YES
SCREEN_EXISTS_IS_MENU_ENTRY = NO
MISSING_REQUIRED_PERMISSION_FAILS_CLOSED = YES
NAV_ITEM_VISIBLE_IS_AUTHORIZATION = NO
CROSS_OWNER_ROUTE_IN_VISO_IS_VISO_DOMAIN = NO
SAME_CAPABILITY_IN_MULTIPLE_DOMAINS_AS_PRIMARY = FORBIDDEN
ROUTE_RENUMBERING_AUTHORIZED = NO
ROUTE_RETIREMENT_AUTHORIZED = NO
TREQ_CHANGES = 0
```

---

#### 46. Handoffs internos del minibloque

La arquitectura entrega a las tareas siguientes:

| Tarea | Handoff recibido |
| --- | --- |
| `VISO-UX-002` | dominio `Personal`, regla de pertenencia y frontera TALENTO/ANIMA |
| `VISO-UX-003` | dominio `Programación`, familia de programación y preservación del delta `VISO-SCH-*` |
| `VISO-UX-004` | dominio `Acceso y seguridad`, navegación fail-closed y frontera con autorización real |
| `VISO-UX-005` | dominio `Organización`, relaciones organización/sede/área sin fabricar alcance |
| `VISO-UX-006` | dominio `Operación`, configuración administrativa sin absorber operación propietaria |
| `VISO-UX-007` | dominio `Auditoría`, lectura de evidencia sin convertir auditoría en estado o autorización |

Las tareas posteriores deciden sus entradas concretas sin cambiar la taxonomía de primer nivel.

---

#### 47. Hallazgos y carryovers

| Hallazgo | Bloquea `VISO-UX-001` | Propietario | Condición de salida |
| --- | --- | --- | --- |
| las 61 rutas requieren reconciliación física final contra el commit estable del paquete | no | `CODE-AUD-021` / `AUTH-UI-061` | registro final y código estable coinciden sin rutas fuera de catálogo |
| varias superficies físicas de VISO pertenecen funcionalmente a otros dominios | no | `VISO-UX-017` / `VISO-UX-018` / owners aplicables | cada superficie conserva owner, handoff y disposición sin doble mutación |
| la agrupación runtime actual depende de datos de navegación y puede conservar labels históricos | no | materialización física de `VISO-UX-001` | las entradas VISO materializadas respetan los seis dominios y su orden |
| la clasificación hoja por hoja de cada dominio aún no corresponde a esta tarea | no | `VISO-UX-002..007` | cada sección define sus entradas, hijos, ayudas y fronteras sin crear dominios nuevos |
| validación con administradores reales no está ejecutada | no | `VISO-UX-020` | piloto controlado demuestra comprensión, eficiencia y ausencia de navegación accidental |

No queda un pendiente narrativo sin owner ni condición de salida.

---

#### 48. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

La tarea especializa navegación administrativa ya protegida por requisitos vigentes de arquitectura de información, autorización, inventario de rutas, ownership, deep links, no retiro prematuro y validación UX. No introduce una obligación ejecutable independiente que requiera modificar el Registro Canónico de Requisitos de Prueba.

---

#### 49. Cobertura de prueba vigente reutilizada

Esta sección es trazabilidad y no modifica el Registro 04A.

- `TREQ-UX-001` — navegación comprensible y acción principal sin depender de nombres técnicos;
- `TREQ-UX-008` — clasificación de intención por superficie y separación de intenciones competidoras;
- `TREQ-UX-013` — navegación administrativa organizada por dominio, responsabilidad, caso o maestro;
- `TREQ-UX-020` — ownership y contrato consistentes entre aplicaciones;
- `TREQ-UX-021` — diferenciación de carriles por estructura, jerarquía, etiquetas, iconografía, contexto y accesibilidad;
- `TREQ-UX-023` — inventario, clasificación y retiro gobernado de rutas y sidebars;
- `TREQ-VISO-004` — inventario reconciliado de 61 páginas VISO;
- `TREQ-VISO-005` — identidades estables `VISO-ROUTE-001..061`;
- `TREQ-VISO-012` — 59 rutas protegidas y dos públicas controladas;
- `TREQ-VISO-014` — resolución de sesión, acceso, contexto territorial, dispositivo y simulación según guard;
- `TREQ-VISO-022` — no retirar prematuramente solapamientos y superficies todavía consumidas;
- `TREQ-VISO-023` — reconciliación final de las 61 rutas y vínculo de la ruta mensual.

---

#### 50. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-001`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en la rama documental local de `VISO-UX-001`. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, la secuencia activa `PHASE-09-VISO-COMPLETE`, `NUMERA-UX-028` como tarea anterior, `VISO-UX-002` como siguiente tarea, el marcador propietario, la topología `PER_IMPLEMENTATION_UNIT`, el gate `POST_E5_PACKAGE`, el núcleo aprobado de VISO, los contratos administrativos transversales, el inventario de rutas, el Registro 04A aplicable y la implementación remota actual de navegación data-driven en `vento-viso`. |
| OPERATIVA | NOT_EXECUTED | No se modificó navegación runtime, no se cambió configuración, no se alteraron permisos y no se ejecutó una prueba con usuarios reales. |
| FÍSICA | NOT_EXECUTED | La materialización física por `implementation_unit_id` permanece pendiente y requiere gate `POST_E5_PACKAGE` y autorización física propia. |

---

#### 51. Criterios de aceptación

La tarea queda aceptable cuando:

1. existe exactamente un contrato `VISO-ADMINISTRATIVE-NAVIGATION-001`;
2. `Inicio` permanece como entrada especial y no como dominio;
3. existen exactamente seis dominios administrativos de primer nivel;
4. los dominios son `Personal`, `Programación`, `Acceso y seguridad`, `Organización`, `Operación` y `Auditoría`;
5. el orden de dominios coincide con `VISO-UX-002..007`;
6. no se crea un dominio técnico o legacy adicional;
7. la navegación se organiza por intención administrativa y ownership, no por ubicación física del archivo;
8. una ruta existente en `vento-viso` no adquiere ownership VISO por su sola presencia;
9. los dieciséis dominios administrativos transversales no se replican como dieciséis secciones VISO;
10. cada superficie navegable se clasifica en una única clase de navegación;
11. `PRIMARY_ENTRY`, `VISO_DOMAIN_ENTRY`, `CHILD_OR_DETAIL_ROUTE`, `SYSTEM_ROUTE` y `CROSS_OWNER_TRANSITION` permanecen diferenciadas;
12. no existe fallback `OTHER` para evitar clasificación;
13. `VISO-ROUTE-001..061` conserva identidad estable;
14. no se renumeran rutas por reorganizar el menú;
15. la ruta raíz permanece inventariada;
16. `/login` y `/no-access` permanecen fuera de la navegación administrativa ordinaria;
17. rutas hijas no compiten obligatoriamente como entradas del sidebar;
18. `new`, `detail`, `settings` y `manage` pueden conservarse como navegación contextual;
19. `app_navigation_items` permanece como mecanismo data-driven reutilizable o se evoluciona mediante contrato canónico equivalente;
20. no se crea un árbol hardcoded duplicado;
21. `app_screen_registry` no convierte toda pantalla detectada en entrada de menú;
22. `group_label` no puede crear semántica incompatible con los seis dominios;
23. una entrada sin permiso resoluble falla cerrada;
24. una entrada visible no equivale a acción autorizada;
25. el destino revalida su propia autorización;
26. la sede visible no fabrica alcance;
27. el área visible no fabrica permiso;
28. el dominio visible no fabrica contexto;
29. la navegación de dispositivo compartido deriva de entradas realmente autorizadas;
30. deep links revalidan sesión, acceso, contexto, permiso, recurso y estado;
31. URLs no transportan autoridad;
32. las superficies cross-owner no se promueven a dominios VISO;
33. `VISO-UX-017` conserva la decisión de no duplicación;
34. `VISO-UX-018` conserva el handoff hacia aplicaciones propietarias;
35. no se retira una ruta antes de cumplir sus gates de sustitución y compatibilidad;
36. las etiquetas primarias usan lenguaje empresarial;
37. el sidebar colapsado conserva semántica accesible de dominio;
38. responsive no altera clasificación ni autorización;
39. una ruta hija activa mantiene identificable su dominio padre;
40. un dominio sin entradas autorizadas no se muestra vacío como si concediera acceso;
41. error de carga, ausencia de entradas y denegación permanecen distintos;
42. `/operations*` puede proyectarse mediante una entrada principal sin perder rutas hijas;
43. la transición no duplica mutaciones para la misma capacidad;
44. una capacidad no pertenece primariamente a dos dominios a la vez;
45. la navegación entre dominios no cambia actor, rol, sede o permiso por inferencia;
46. los seis dominios entregan handoff explícito a `VISO-UX-002..007`;
47. los carryovers tienen owner y condición de salida;
48. no se crean requisitos de prueba;
49. no se modifican requisitos de prueba;
50. no se realizan cambios físicos desde esta tarea documental.

---

#### 52. Límites

Esta tarea no:

- implementa el nuevo sidebar;
- modifica `vento-viso`;
- modifica `app_navigation_items`;
- modifica `app_screen_registry`;
- crea o elimina rutas;
- renumera `VISO-ROUTE-*`;
- crea redirects;
- retira aliases;
- elimina superficies legacy;
- cambia permisos;
- crea permisos;
- cambia guards;
- cambia autorización server-side;
- cambia contexto territorial;
- cambia comportamiento de dispositivos compartidos;
- cambia simulación;
- modifica Supabase;
- crea migraciones;
- modifica datos;
- cambia RLS;
- cambia RPC;
- cambia Auth;
- cambia Storage;
- cambia Realtime;
- despliega código;
- selecciona package;
- autoriza una instancia física;
- ejecuta una instancia física;
- define el contenido completo de `Personal`;
- define el contenido completo de `Programación`;
- define el contenido completo de `Acceso y seguridad`;
- define el contenido completo de `Organización`;
- define el contenido completo de `Operación`;
- define el contenido completo de `Auditoría`;
- decide todavía cada retiro cross-owner;
- sustituye `VISO-UX-017`;
- sustituye `VISO-UX-018`;
- ejecuta pruebas con administradores reales;
- desarrolla `VISO-UX-002`.

---

#### 53. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-UX-028 — Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva`

**TAREA ACTUAL APROBADA**
`VISO-UX-001 — Reorganizar navegación por dominios administrativos`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-002 — Crear sección Personal`
### ✅ VISO-UX-002 — Crear sección Personal

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-001 — Reorganizar navegación por dominios administrativos
**Tarea siguiente:** VISO-UX-003 — Crear sección Programación
**Tipo de tarea:** definición técnico-documental de la sección administrativa `Personal` de VISO; fija su entrada principal, composición, rutas hijas, vínculo con necesidades y vacantes empresariales, expediente laboral, incorporación, revisión administrativa de asistencia, retiro y handoffs hacia TALENTO, ANIMA, Programación y Acceso y seguridad, sin convertir la ubicación física actual de una pantalla en ownership y conservando `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la sección `Personal` definido; su materialización runtime permanece pendiente por `implementation_unit_id` y detrás del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, rutas, navegación runtime, pantallas, componentes, permisos, Supabase, datos, migraciones, RLS, RPC, Storage, Auth, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la sección administrativa `Personal` de VISO para que una persona autorizada pueda localizar, comprender y administrar el ciclo laboral de trabajadores sin mezclarlo con reclutamiento prelaboral, programación de turnos, autoservicio personal, configuración de acceso, dispositivos compartidos o funciones propietarias de otras aplicaciones.

La sección debe responder de forma directa:

```text
¿QUIÉNES SON LOS TRABAJADORES QUE PUEDO ADMINISTRAR?
¿CUÁL ES SU ESTADO LABORAL VIGENTE?
¿QUÉ VÍNCULO, EPISODIO Y EXPEDIENTE LABORAL ESTOY CONSULTANDO?
¿QUÉ ACCIÓN ADMINISTRATIVA PUEDO REALIZAR SOBRE ESA PERSONA?
¿QUÉ INFORMACIÓN SOLO DEBO CONSULTAR O ENLAZAR EN OTRA APLICACIÓN O DOMINIO?
¿QUÉ CAMBIOS REQUIEREN PROGRAMACIÓN, ACCESO, SEGURIDAD O UN HANDOFF EXTERNO?
```

`Personal` no es un contenedor genérico para todo lo relacionado con trabajadores.

Es la sección administrativa propietaria de la relación laboral y de su expediente dentro de los límites aprobados para VISO.

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001` entrega sin reapertura:

```text
PRIMARY_ENTRY = Inicio
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
```

También entrega estas reglas:

- una ruta físicamente presente en `vento-viso` no adquiere ownership por ubicación;
- las rutas hijas no compiten como entradas primarias;
- una superficie con owner externo usa handoff y no una copia mutable;
- la navegación visible no equivale a autorización;
- las identidades `VISO-ROUTE-001..061` no se renumeran;
- la navegación permanece data-driven;
- `Personal` recibe la frontera TALENTO/ANIMA y la regla de pertenencia a dominio.

`VISO-UX-002` desarrolla únicamente ese handoff.

---

#### 3. Topología y gate

La tarea conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La definición documental ocurre una sola vez.

La materialización física posterior:

- pertenece a una unidad de implementación gobernada;
- no se autoriza desde este marcador;
- no puede ejecutarse antes del gate aplicable;
- debe conservar las fronteras y decisiones definidas aquí.

---

#### 4. Contrato de sección

Se define:

```text
VISO_PERSONAL_SECTION_CONTRACT = VISO-PERSONAL-SECTION-001
DOMAIN_LABEL = Personal
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-041
PRIMARY_OBSERVED_ROUTE = /staff
PRIMARY_CANONICAL_SCREEN = VSCREEN-0014
PRIMARY_CANONICAL_PROCESS = VPROC-0006
PRIMARY_CANONICAL_STEP = VPROC-0006::STEP-MAINTAIN_EMPLOYMENT_RECORD
PRIMARY_INTENT = ADMINISTRATIVE_EMPLOYMENT_RECORD
TREQ_CHANGES = 0
```

La relación entre `/staff` y `VSCREEN-0014` debe materializarse y demostrarse mediante los contratos de pantalla y navegación aplicables.

Esta tarea no presume que una coincidencia funcional sea por sí sola un binding físico ya certificado.

---

#### 5. Frontera funcional entre TALENTO, VISO y ANIMA

La sección conserva la frontera ya aprobada:

```text
TALENTO
→ candidato
→ postulación
→ expediente prelaboral
→ evidencia de selección
→ experiencia de candidatura

VISO
→ necesidad de personal
→ vacante empresarial autorizada
→ autoridad de selección y contratación
→ condiciones de vinculación
→ registro laboral
→ episodio laboral
→ asignaciones administrativas
→ administración laboral
→ cierre laboral

ANIMA
→ experiencia del trabajador activado
→ consulta personal
→ programación publicada
→ captura de asistencia
→ solicitudes y acciones personales autorizadas
```

Por tanto:

```text
CANDIDATO != TRABAJADOR
POSTULACIÓN != VÍNCULO LABORAL
INVITACIÓN != EMPLEADO ACTIVO
EMPLEADO ACTIVO != ACCESO AUTORIZADO
PERFIL PERSONAL != EXPEDIENTE ADMINISTRATIVO COMPLETO
```

---

#### 6. Alcance exacto de `Personal`

La sección cubre como capacidades administrativas propias o coordinadas:

1. directorio de trabajadores;
2. estado laboral vigente;
3. vínculo y episodio laboral;
4. incorporación y activación laboral coordinada;
5. expediente laboral autorizado;
6. necesidades de personal y vacantes empresariales gobernadas por VISO;
7. consulta de asignaciones organizacionales aplicables;
8. revisión administrativa de asistencia y excepciones laborales cuando corresponda;
9. consulta y resolución de casos laborales relacionados con el trabajador;
10. coordinación de retiro laboral y cierre;
11. handoffs hacia Programación;
12. handoffs hacia Acceso y seguridad;
13. handoffs hacia TALENTO;
14. handoffs hacia ANIMA;
15. consulta de evidencia y estado sin invadir Auditoría.

No crea una capacidad nueva.

Organiza capacidades ya aprobadas.

---

#### 7. Capacidades expresamente fuera de `Personal`

No pertenecen como edición primaria a esta sección:

- postulación y expediente prelaboral completo de TALENTO;
- entrevistas, notas y evaluaciones prelaborales propietarias de TALENTO;
- publicación pública operada por TALENTO;
- programación semanal y mensual;
- plantillas y reglas de programación;
- configuración de permisos y matrices;
- administración de dispositivos compartidos;
- roles operativos y matrices territoriales como editor principal;
- operación física de asistencia;
- check-in y check-out del trabajador;
- experiencia personal del trabajador;
- operación de otras aplicaciones;
- auditoría histórica como editor;
- pagos y beneficios laborales como motor financiero.

La sección puede mostrar resumen o handoff autorizado hacia esas capacidades.

---

#### 8. Entrada principal observada

La entrada observada `VISO-ROUTE-041` conserva:

```text
route = /staff
navigation_class = VISO_DOMAIN_ENTRY
canonical_domain = Personal
```

Su función objetivo es ser la entrada administrativa al dominio.

No debe convertirse en una pantalla que mezcle permanentemente:

- trabajadores;
- programación;
- dispositivos compartidos;
- seguridad;
- operación;
- candidatos;
- CMS;
- otras configuraciones sin relación directa con el ciclo laboral.

---

#### 9. Disposición de la familia `/staff*`

La familia observada se distribuye así:

| Route ID | Patrón observado | Decisión de dominio | Clase de navegación | Propietario de detalle |
| --- | --- | --- | --- | --- |
| `VISO-ROUTE-041` | `/staff` | `Personal` | `VISO_DOMAIN_ENTRY` | `VISO-UX-002` |
| `VISO-ROUTE-042` | `/staff/new` | `Personal` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-002` |
| `VISO-ROUTE-043` | `/staff/[id]` | `Personal` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-002` |
| `VISO-ROUTE-044` | `/staff/attendance` | `Personal` como revisión administrativa | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-002`, consumiendo hechos de ANIMA |
| `VISO-ROUTE-045` | `/staff/calendar` | `Programación` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-003` |
| `VISO-ROUTE-046` | `/staff/schedule` | `Programación` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-003` |
| `VISO-ROUTE-047` | `/staff/schedule/global` | `Programación` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-003` |
| `VISO-ROUTE-048` | `/staff/schedule/metrics` | `Programación` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-003` |
| `VISO-ROUTE-049` | `/staff/schedule/settings` | `Programación` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-003` |
| `VISO-ROUTE-050` | `/staff/shared-devices/new` | `Acceso y seguridad` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-004` |
| `VISO-ROUTE-061` | `/staff/schedule/month` | `Programación` | `CHILD_OR_DETAIL_ROUTE` | `VISO-UX-003` |

Esta distribución no elimina ni mueve físicamente rutas.

Fija el ownership de experiencia para su materialización posterior.

---

#### 10. Vacantes empresariales dentro de `Personal`

La planeación de necesidades de personal y la vacante empresarial autorizada pertenecen funcionalmente a VISO.

Las rutas observadas:

```text
VISO-ROUTE-051 = /vacancies
VISO-ROUTE-052 = /vacancies/new
VISO-ROUTE-053 = /vacancies/[id]
```

se clasifican para esta arquitectura como rutas hijas de `Personal`, no como un séptimo dominio.

Se conserva:

```text
VACANTE_EMPRESARIAL = VISO
PUBLICACIÓN_Y_EXPERIENCIA_DE_CANDIDATURA = TALENTO
```

La UI de VISO puede administrar la necesidad, condiciones y autorización empresarial.

No puede convertirse en propietaria del perfil candidato, la postulación o el expediente de selección.

---

#### 11. Estado transitorio de `/vacancies*`

El runtime observado actualmente lee y escribe superficies del esquema `talento` desde páginas físicas de VISO.

Este hecho se clasifica como transición física existente.

No redefine la frontera canónica.

La materialización posterior deberá asegurar que:

- VISO gobierne la vacante empresarial;
- TALENTO reciba la proyección autorizada;
- una publicación no cambie silenciosamente la necesidad fuente;
- candidatos y postulaciones no se editen como copias locales en VISO;
- las decisiones empresariales conserven evidencia y autorización propias.

El retiro o refactor físico de la escritura transitoria pertenece a las tareas de ownership, integración y materialización aplicables.

---

#### 12. Pantallas canónicas relacionadas

`Personal` consume estas superficies canónicas sin alterar sus identidades:

| Screen ID | Nombre | Proceso principal | Papel dentro de `Personal` |
| --- | --- | --- | --- |
| `VSCREEN-0013` | Vinculación e incorporación | `VPROC-0006` | flujo administrativo de alta laboral coordinada |
| `VSCREEN-0014` | Directorio y expediente laboral | `VPROC-0006` | superficie principal del dominio |
| `VSCREEN-0016` | Revisión de asistencia | `VPROC-0008` | supervisión administrativa de hechos capturados por ANIMA |
| `VSCREEN-0017` | Novedades, ausencias y reemplazos | `VPROC-0009` | caso laboral relacionado con la persona y sus efectos |
| `VSCREEN-0018` | Retiro y revocación coordinada | `VPROC-0011` | cierre laboral y coordinación de revocación |

`VSCREEN-0015 — Programación laboral` queda reservado a `VISO-UX-003`.

---

#### 13. Pantallas prelaborales y frontera de selección

Las superficies canónicas:

```text
VSCREEN-0011 = Embudo de candidatos
VSCREEN-0012 = Caso de selección
```

no convierten el expediente prelaboral en propiedad mutable de `Personal`.

La frontera aprobada exige:

- TALENTO como propietario del candidato, postulación y expediente prelaboral;
- VISO como autoridad empresarial sobre necesidad, decisión y condiciones autorizadas;
- una proyección mínima en VISO cuando sea necesaria para decidir;
- ausencia de copia competidora del expediente.

La asignación física histórica de una pantalla a una aplicación no invalida esta frontera.

---

#### 14. Composición de la sección

La entrada de `Personal` debe organizar la experiencia en cuatro zonas conceptuales:

```text
1. CONTEXTO Y RESUMEN
2. DIRECTORIO DE TRABAJADORES
3. ACCIONES Y CASOS LABORALES
4. HANDOFFS Y DETALLE BAJO DEMANDA
```

No se exige que estas zonas sean cuatro componentes físicos ni cuatro rutas.

La materialización puede variar mientras preserve jerarquía, intención y ownership.

---

#### 15. Contexto y resumen

El resumen puede mostrar, dentro del alcance autorizado:

- trabajadores activos;
- trabajadores inactivos;
- incorporaciones pendientes;
- retiros o cierres pendientes;
- casos laborales que requieren decisión;
- necesidades o vacantes empresariales abiertas;
- alertas de expediente incompleto;
- indicadores de cobertura o preparación cuando exista fuente canónica.

Un conteo no concede acceso al detalle oculto.

Un indicador agregado no puede revelar población fuera del alcance territorial del administrador.

---

#### 16. Directorio de trabajadores

El directorio es el foco ordinario de la sección.

Debe permitir localizar trabajadores mediante información administrativa comprensible y filtros autorizados.

Como mínimo puede usar:

- nombre o alias;
- estado laboral;
- sede administrable;
- área cuando corresponda;
- rol base o función visible según permiso;
- estado de vínculo;
- indicadores de expediente o readiness no sensibles.

La lista no debe exponer por defecto datos personales sensibles o identificadores que no sean necesarios para identificar administrativamente al trabajador.

---

#### 17. Búsqueda y filtros

Los filtros del directorio son filtros de presentación.

No son autoridad.

Se conserva:

```text
FILTER_SITE != AUTHORIZED_SITE_SCOPE
FILTER_ROLE != EFFECTIVE_PERMISSION
FILTER_STATUS != EMPLOYMENT_AUTHORITY
```

Una búsqueda nunca puede ampliar las filas visibles por encima del alcance que el servidor ya autorizó.

---

#### 18. Estado laboral

La sección debe diferenciar como mínimo:

```text
ACTIVO
INACTIVO
INCORPORACIÓN_EN_CURSO
RETIRO_EN_CURSO
CERRADO
ESTADO_NO_RESUELTO
```

La etiqueta visual puede adaptarse al contrato físico definitivo.

La semántica debe conservar que:

- `inactivo` no implica necesariamente borrado;
- un cierre laboral conserva historia;
- un reingreso no reactiva autoridad anterior por inferencia;
- la ausencia de datos no se representa como un estado válido inventado.

---

#### 19. Identidad de persona, trabajador y episodio

La sección debe mantener separados:

```text
PERSONA
IDENTIDAD_DE_AUTENTICACIÓN
CANDIDATO
POSTULACIÓN
EMPLEADO
EPISODIO_LABORAL
USUARIO
ROL
ASIGNACIÓN
TURNO
PERMISO
```

Un detalle de trabajador debe abrir un episodio laboral concreto cuando la historia lo requiera.

Un reingreso crea nuevo episodio y aprovisionamiento gobernado.

No restaura permisos o sesiones antiguas automáticamente.

---

#### 20. Detalle del trabajador

La superficie de detalle debe organizar información autorizada por bloques progresivos:

1. resumen laboral;
2. vínculo y vigencia;
3. sedes y áreas asignadas;
4. roles y perfiles como resumen;
5. documentos laborales autorizados;
6. asistencia y casos relacionados;
7. preparación o requisitos aplicables;
8. historial y evidencia disponibles;
9. acciones de lifecycle autorizadas;
10. handoffs a otros dominios.

No todos los bloques se muestran a todos los administradores.

---

#### 21. Incorporación y vinculación

La incorporación administrativa consume el contrato de `VSCREEN-0013` y el prototipo transversal aprobado.

La secuencia conceptual conserva:

```text
IDENTIDAD O CANDIDATO ELEGIBLE
→ VALIDAR DUPLICADOS
→ DECISIÓN LABORAL AUTORIZADA
→ CREAR O ACTIVAR VÍNCULO
→ CREAR EPISODIO LABORAL
→ ASOCIAR DOCUMENTOS Y VIGENCIA
→ PREPARAR ASIGNACIONES
→ PREPARAR ACCESO SIN CONCEDERLO POR INFERENCIA
→ HANDOFF A PROGRAMACIÓN Y ACCESO
→ RECEIPT
```

La materialización no puede reducir este ciclo a “enviar invitación”.

---

#### 22. Invitación no equivale a vinculación

Se congela:

```text
INVITATION_SENT != EMPLOYEE_CREATED
INVITATION_ACCEPTED != EMPLOYMENT_AUTHORIZED
INVITATION_ACCEPTED != SITE_ASSIGNED
INVITATION_ACCEPTED != ROLE_GRANTED
INVITATION_ACCEPTED != APP_ACCESS_GRANTED
```

La ruta observada `/staff/new` puede permanecer como entrada de transición o alta coordinada, pero su resultado debe respetar estas reglas.

El cliente no determina por sí mismo rol, sede, área o privilegio final.

---

#### 23. Necesidades de personal

`Personal` puede presentar necesidades de personal aprobadas o en preparación cuando VISO sea la autoridad empresarial.

Debe distinguir:

```text
NECESIDAD_DE_PERSONAL
VACANTE_EMPRESARIAL
PUBLICACIÓN_DE_VACANTE
POSTULACIÓN
```

Una necesidad no se convierte automáticamente en publicación.

Una publicación no concede autoridad para contratar.

---

#### 24. Vacantes

La administración de vacantes en `Personal` debe concentrarse en la parte que VISO gobierna:

- necesidad;
- cargo o función requerida;
- empresa y territorio aplicables;
- condiciones autorizadas;
- cupos;
- vigencia;
- estado empresarial;
- autoridad de apertura, suspensión, cierre o reapertura;
- proyección que TALENTO puede publicar.

La experiencia del candidato no se implementa dentro de VISO.

---

#### 25. Revisión administrativa de asistencia

`VSCREEN-0016` pertenece a VISO como superficie de supervisión.

La fuente de hechos de asistencia permanece en ANIMA y en los contratos compartidos correspondientes.

La sección puede:

- consultar hechos autorizados;
- detectar excepciones;
- mostrar diferencia y evidencia;
- iniciar o resolver una corrección autorizada;
- vincular efectos laborales posteriores.

No puede sobrescribir silenciosamente el evento original.

---

#### 26. Asistencia visible en el directorio

Un estado como “en turno”, “fuera de turno” o “sin registros” puede aparecer como resumen contextual cuando:

- provenga de una fuente canónica;
- esté autorizado;
- sea vigente;
- no se use como sustituto de programación;
- no se use como autoridad para modificar datos laborales.

El resumen no convierte `Personal` en propietaria de captura de asistencia.

---

#### 27. Novedades, ausencias y reemplazos

`VSCREEN-0017` puede alcanzarse desde el contexto del trabajador cuando exista un caso laboral relacionado.

La sección debe mostrar la relación entre:

- persona;
- caso;
- estado;
- periodo afectado;
- evidencia;
- decisión pendiente o tomada;
- impacto proyectado sobre programación o asistencia;
- owner de la siguiente acción.

El caso no se resuelve alterando directamente el hecho fuente.

---

#### 28. Programación como handoff

Las vistas de calendario, programación semanal, global, métricas, settings y mes no forman parte del contenido primario de `Personal`.

Desde un trabajador se puede ofrecer un enlace contextual como:

```text
Ver programación
```

pero la edición se ejecuta dentro del dominio `Programación` definido por `VISO-UX-003`.

No se mantienen dos editores de turnos.

---

#### 29. Acceso y seguridad como handoff

La sección `Personal` puede mostrar resumen de:

- rol base;
- rol operativo vigente o configurado;
- sedes y áreas asignadas;
- estado de acceso;
- conflictos visibles;
- sesiones o dispositivos cuando el contrato lo permita.

La mutación de:

- roles;
- permisos;
- matrices;
- delegaciones;
- excepciones;
- dispositivos compartidos;
- simulación de autoridad;

pertenece a `Acceso y seguridad` y a sus contratos propietarios.

---

#### 30. Dispositivos compartidos

El tab o contenido AS-IS de dispositivos compartidos dentro de `/staff` no forma parte del diseño objetivo de `Personal`.

Se congela:

```text
SHARED_DEVICE_ADMINISTRATION_PRIMARY_DOMAIN = Acceso y seguridad
PERSONAL_MAY_SHOW_DEVICE_RELATIONSHIP_SUMMARY = YES
PERSONAL_MAY_ADMINISTER_SHARED_DEVICE = NO
```

La transición física no autoriza retirar controles existentes antes de tener sucesor validado.

---

#### 31. Organización y asignaciones

`Personal` puede mostrar la pertenencia laboral a organización, sede y área.

Debe conservar:

```text
ORGANIZACIÓN != SEDE
SEDE != ÁREA
ASIGNACIÓN != ELEGIBILIDAD
ASIGNACIÓN != PERMISO
```

Cuando la acción cambie estructura organizacional, la experiencia debe hacer handoff a `Organización` o al contrato propietario aplicable.

Cuando la acción cambie autoridad o elegibilidad, debe hacer handoff a `Acceso y seguridad`.

---

#### 32. Documentos laborales

El expediente puede mostrar documentos laborales autorizados y su estado.

Debe diferenciar:

- documento laboral definitivo;
- documento prelaboral de TALENTO;
- referencia transferida;
- archivo físico;
- metadatos;
- revisión;
- vigencia;
- evidencia.

Los documentos prelaborales no se copian automáticamente al expediente laboral.

Solo una transferencia autorizada y trazable puede incorporarlos o referenciarlos.

---

#### 33. Información de salud

La sección no almacena ni presenta historia clínica ocupacional.

Cuando corresponda, solo puede consumir el concepto ocupacional mínimo autorizado y necesario para una decisión laboral legítima.

No se expondrán diagnósticos, historia clínica o datos médicos detallados por conveniencia administrativa.

---

#### 34. Autoservicio en ANIMA

La experiencia del trabajador permanece separada.

Superficies como:

```text
VSCREEN-0032 = Mi perfil laboral
VSCREEN-0125 = Mi carnet laboral
VSCREEN-0126 = Mis documentos laborales
```

son canales personales de ANIMA.

`Personal` puede explicar o enlazar su disponibilidad cuando corresponda.

No debe replicarlas como autoservicio dentro del backoffice administrativo.

---

#### 35. Desempeño y desarrollo

La capacidad `CAP-02.10 — Acompañar desempeño y desarrollo` permanece diferida hasta contar con propósito, privacidad, proceso y uso aprobados.

Por tanto:

```text
PERFORMANCE_AND_DEVELOPMENT_IN_PERSONAL = DEFERRED
```

`Personal` no crea ratings, scores, evaluaciones de desempeño ni ranking de trabajadores por inferencia.

La ausencia de esta capacidad no bloquea la sección básica.

---

#### 36. Retiro laboral

El cierre consume `VSCREEN-0018` y `VPROC-0011`.

La experiencia debe coordinar:

- fecha efectiva;
- motivo autorizado;
- vínculo y episodio;
- asignaciones;
- turnos pendientes;
- accesos y sesiones;
- dispositivos y activos cuando apliquen;
- documentos;
- responsabilidades;
- handoffs;
- revocaciones;
- evidencia de cierre;
- pendientes remanentes.

La terminación laboral y la revocación técnica no se tratan como una sola mutación indivisible.

---

#### 37. Reingreso

Un reingreso no reactiva el episodio anterior.

La sección debe tratarlo como:

```text
PERSONA_EXISTENTE
+
NUEVA_AUTORIZACIÓN_LABORAL
→ NUEVO_EPISODIO_LABORAL
→ NUEVAS_ASIGNACIONES
→ NUEVA_EVALUACIÓN_DE_ACCESO
```

Historial, evidencia y vínculos anteriores permanecen conservados.

---

#### 38. Privacidad y minimización

La lista y el detalle aplican minimización por necesidad administrativa.

No se mostrará por defecto:

- documento completo cuando no sea necesario;
- información bancaria;
- datos médicos;
- notas prelaborales internas;
- documentos sensibles completos;
- información de otros territorios;
- datos personales no relacionados con la tarea actual.

La existencia del dato no concede visibilidad.

---

#### 39. Autorización de lectura

Entrar a VISO no autoriza a leer todo `Personal`.

La experiencia debe resolver, según contrato aplicable:

- acceso a la aplicación;
- permiso de lectura de personal;
- territorio;
- recurso trabajador;
- sensibilidad del campo;
- modalidad de dispositivo;
- simulación;
- finalidad.

Las acciones destino vuelven a autorizar.

---

#### 40. Autorización de mutación

Editar un trabajador no puede interpretarse como permiso universal.

Cada mutación material conserva autorización por acción.

Ejemplos conceptuales distintos:

```text
EDITAR_DATO_LABORAL
ASIGNAR_SEDE
CAMBIAR_ROL
PUBLICAR_TURNO
CORREGIR_ASISTENCIA
CERRAR_VÍNCULO
REVOCAR_ACCESO
```

Una capacidad no se infiere desde otra.

---

#### 41. Alcance territorial

La lista y el detalle respetan el territorio administrable.

Se conserva:

```text
TRABAJADOR_VISIBLE
→ solo si la lectura está autorizada

TRABAJADOR_VISIBLE
!= trabajador editable

TRABAJADOR_VISIBLE_EN_UNA_SEDE
!= detalle global de todas sus sedes
```

La definición transversal final de experiencia territorial permanece en `VISO-UX-013`.

---

#### 42. Trabajadores multisede

Una persona puede tener relaciones con varias sedes.

La sección puede indicar que existen asignaciones adicionales cuando sea necesario para comprender el caso.

No debe revelar detalle territorial fuera del alcance del administrador.

Un conteo global puede ser calculado por el servidor sin exponer las sedes ocultas cuando el contrato lo requiera.

---

#### 43. Roles en la lista

Mostrar un rol en una fila es información administrativa.

No constituye:

- autorización;
- elegibilidad territorial;
- rol operativo efectivo;
- permiso;
- turno vigente.

Las etiquetas deben usar el catálogo canónico aplicable y no aliases locales inventados por la UI.

---

#### 44. Acciones principales

La sección puede ofrecer, según autorización y estado:

- abrir trabajador;
- iniciar incorporación;
- crear o administrar necesidad/vacante empresarial;
- revisar asistencia;
- abrir caso laboral;
- iniciar retiro;
- navegar a programación;
- navegar a acceso y seguridad;
- navegar a TALENTO;
- navegar a ANIMA.

No se muestran acciones imposibles para el estado o contexto actual como si estuvieran disponibles.

---

#### 45. Estados vacíos

La sección distingue:

```text
NO_HAY_TRABAJADORES_AUTORIZADOS
NO_HAY_RESULTADOS_PARA_FILTROS
NO_HAY_CASOS_PENDIENTES
NO_HAY_VACANTES_EMPRESARIALES
FUENTE_NO_DISPONIBLE
ERROR_TÉCNICO
```

No se usa un mismo “sin datos” para todos los casos.

---

#### 46. Errores

Un error de carga no puede exponerse como ausencia real de trabajadores.

Los mensajes principales deben:

- explicar qué no pudo cargarse;
- evitar detalles técnicos sensibles;
- conservar una siguiente acción segura;
- no afirmar falta de permiso si la causa es técnica;
- no exponer nombres de tabla, secretos o errores brutos como mensaje principal.

El detalle técnico autorizado permanece en diagnóstico separado.

---

#### 47. Divulgación progresiva

La sección prioriza información necesaria para decidir.

La lista no debe convertirse en un expediente completo por fila.

El detalle no debe mostrar simultáneamente todos los contratos, documentos, eventos y permisos cuando no son necesarios.

La experiencia progresa:

```text
RESUMEN
→ DETALLE LABORAL
→ DETALLE SENSIBLE AUTORIZADO
→ EVIDENCIA O HISTORIAL BAJO DEMANDA
```

---

#### 48. Responsive y accesibilidad

La sección debe conservar:

- búsqueda y filtros accesibles;
- foco de teclado;
- etiquetas comprensibles;
- estados no dependientes solo de color;
- tablas o listas adaptables sin perder identidad del trabajador;
- acciones críticas distinguibles de navegación;
- contenido esencial disponible sin hover;
- jerarquía estable entre escritorio y móvil.

El tamaño de pantalla no cambia permisos ni dominio.

---

#### 49. Navegación contextual

Desde un trabajador, los handoffs deben transportar únicamente referencias necesarias y no autoridad.

Se prohíbe transportar en URL:

- permiso efectivo;
- actor autoritativo;
- rol efectivo impuesto por cliente;
- token;
- estado objetivo;
- datos personales sensibles innecesarios.

El destino revalida contexto y autorización.

---

#### 50. Integridad de la navegación data-driven

La materialización debe usar el contrato de navegación aprobado en `VISO-UX-001`.

`Personal` no introduce un sidebar paralelo hardcoded.

Las entradas que representen esta sección deben conservar:

- app;
- grupo;
- orden;
- destino;
- permiso requerido;
- estado de activación;
- owner;
- clasificación de superficie.

---

#### 51. Compatibilidad con el AS-IS observado

El runtime actual de `/staff` mezcla en una misma entrada:

- directorio de empleados;
- filtros por sede, estado y rol;
- resumen de asistencia;
- preparación de carnet;
- navegación a horario;
- navegación a reportes;
- dispositivos compartidos;
- invitación de trabajadores.

La tarea no declara ese diseño inválido en bloque.

Lo reconcilia así:

| Elemento observado | Tratamiento objetivo |
| --- | --- |
| directorio | permanece en `Personal` |
| estado laboral | permanece en `Personal` |
| sedes visibles | permanece como resumen autorizado |
| rol visible | permanece como resumen, no como autoridad |
| asistencia reciente | permanece como resumen o enlace autorizado |
| carnet/readiness | permanece como estado resumido cuando exista fuente canónica |
| horario semanal | handoff a `Programación` |
| calendario | handoff a `Programación` |
| dispositivos compartidos | handoff a `Acceso y seguridad` |
| invitación | se reconcilia con vinculación gobernada; no crea autoridad por sí sola |

---

#### 52. Conflictos con estado real

Cuando la UI muestre información desactualizada o incompatible con el estado servidor:

- el servidor prevalece;
- la pantalla no guarda silenciosamente sobre una versión más reciente;
- el usuario recibe explicación del conflicto;
- se ofrece recarga, comparación o resolución según contrato;
- los cambios críticos conservan evidencia.

La visualización final de conflictos generales permanece en `VISO-UX-015`.

---

#### 53. Vista previa

La sección puede preparar una vista previa de cambios que afecten:

- vínculo;
- sede;
- área;
- rol;
- acceso;
- retiro;
- programación relacionada.

La vista previa no concede autoridad ni persiste por sí sola.

La experiencia exacta de preview de trabajador permanece en `VISO-UX-016`.

---

#### 54. Procedencia

Cuando una asignación, rol, permiso o estado tenga procedencia relevante para decidir, `Personal` puede mostrar un resumen comprensible de origen.

La definición final de procedencia visible pertenece a `VISO-UX-014`.

`Personal` no crea un evaluador nuevo para explicar permisos.

---

#### 55. Ownership y handoff

La sección aplica estas reglas:

```text
SOURCE_OWNED_BY_VISO
→ VISO puede administrar según permiso

SOURCE_OWNED_BY_OTHER_APP
→ VISO muestra resumen o proyección autorizada
→ VISO enlaza al owner
→ VISO no mantiene copia mutable competidora
```

La eliminación de duplicaciones y los handoffs finales permanecen reforzados por `VISO-UX-017` y `VISO-UX-018`.

---

#### 56. Decisiones congeladas

```text
VISO_PERSONAL_SECTION_CONTRACT = VISO-PERSONAL-SECTION-001
DOMAIN = Personal
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-041
PRIMARY_OBSERVED_ROUTE = /staff
PRIMARY_CANONICAL_SCREEN = VSCREEN-0014
PRIMARY_CANONICAL_PROCESS = VPROC-0006
PERSONAL_OWNS_EMPLOYMENT_ADMINISTRATION = YES
PERSONAL_OWNS_CANDIDATE_RECORD = NO
PERSONAL_OWNS_SCHEDULE_EDITOR = NO
PERSONAL_OWNS_SHARED_DEVICE_ADMIN = NO
PERSONAL_OWNS_ATTENDANCE_CAPTURE = NO
PERSONAL_MAY_REVIEW_ATTENDANCE = YES
PERSONAL_MAY_GOVERN_BUSINESS_VACANCY = YES
TALENTO_OWNS_PRELABORAL_RECORD = YES
ANIMA_OWNS_WORKER_PERSONAL_CHANNEL = YES
PROGRAMACION_OWNER = VISO-UX-003
ACCESS_SECURITY_OWNER = VISO-UX-004
PERFORMANCE_AND_DEVELOPMENT_IN_PERSONAL = DEFERRED
TREQ_CHANGES = 0
```

---

#### 57. Hallazgos y carryovers

| Hallazgo | Bloquea `VISO-UX-002` | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `/staff` mezcla actualmente dispositivos, programación y personal | no | materialización de `VISO-UX-002`, `VISO-UX-003` y `VISO-UX-004` | cada capacidad aparece en su dominio sin perder compatibilidad ni autorización |
| `/vacancies*` escribe actualmente datos del esquema TALENTO desde VISO | no | `VISO-UX-017`, `VISO-UX-018`, contratos TALENTO e integración aplicables | VISO gobierna la vacante empresarial y TALENTO recibe proyección sin copia competidora |
| la invitación actual no puede representar por sí sola el ciclo completo de vinculación | no | materialización de `VISO-UX-002` y contratos de vinculación | alta laboral exige decisión, episodio, asignaciones y handoffs gobernados |
| desempeño y desarrollo siguen sin proceso y privacidad final aprobados | no | propietarios ya definidos por `CAP-02.10` | proceso, finalidad, privacidad y uso aprobados antes de habilitar la capacidad |
| el binding físico entre rutas observadas y pantallas canónicas debe demostrarse | no | materialización y validadores de pantalla aplicables | cada destino queda vinculado a screen/process/step sin inventar identidad nueva |
| validación con administradores reales permanece pendiente | no | `VISO-UX-020` | piloto controlado demuestra comprensión y ausencia de mezcla entre dominios |

No queda un pendiente narrativo sin owner ni condición de salida.

---

#### 58. Handoff a `VISO-UX-003`

`VISO-UX-003 — Crear sección Programación` recibe explícitamente:

```text
VISO-ROUTE-045 = /staff/calendar
VISO-ROUTE-046 = /staff/schedule
VISO-ROUTE-047 = /staff/schedule/global
VISO-ROUTE-048 = /staff/schedule/metrics
VISO-ROUTE-049 = /staff/schedule/settings
VISO-ROUTE-061 = /staff/schedule/month
VSCREEN-0015 = Programación laboral
VPROC-0007 = proceso principal de programación
```

También recibe la regla:

```text
PERSONAL_MAY_LINK_TO_SCHEDULE = YES
PERSONAL_MAY_EDIT_SCHEDULE_LOCALLY = NO
```

`VISO-UX-003` no debe devolver esas rutas al dominio `Personal` por mantener el prefijo físico `/staff`.

---

#### 59. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA
**Requisitos creados:** 0
**Requisitos modificados:** 0

```text
REQUISITOS_DIFERIDOS = 0
REQUISITOS_DESCARTADOS = 0
REQUISITOS_OBSOLETOS = 0
```

La tarea especializa una sección administrativa utilizando obligaciones ya protegidas sobre navegación, ownership, identidad laboral, handoff TALENTO–VISO–ANIMA, autorización, territorio, privacidad y continuidad de rutas. No introduce una obligación independiente que exija cambiar el Registro Canónico de Requisitos de Prueba.

---

#### 60. Cobertura de prueba vigente reutilizada

Esta sección constituye trazabilidad y no modifica el Registro 04A.

- `TREQ-VISO-001` — coherencia entre configuración administrativa de trabajadores y resultado consumido por aplicaciones;
- `TREQ-VISO-014` — rutas protegidas resuelven sesión, acceso, territorio, dispositivo y simulación;
- `TREQ-TALENTO-002` — fronteras funcionales explícitas entre TALENTO, VISO y ANIMA;
- `TREQ-TALENTO-003` — persona, autenticación, candidato, postulación, empleado y episodio permanecen diferenciados;
- `TREQ-TALENTO-004` — VISO gobierna requisición y vacante empresarial mientras TALENTO publica proyección autorizada;
- `TREQ-TALENTO-007` — handoff laboral bloqueado, idempotente y recuperable sin duplicar identidades o acceso;
- `TREQ-AUTH-007` — capacidad administrativa explícita y alcance;
- `TREQ-AUTH-009` — territorio determinista;
- `TREQ-AUTH-016` — revocación sin destruir historia;
- `TREQ-UX-013` — navegación administrativa organizada por dominio, responsabilidad, caso o maestro;
- `TREQ-UX-020` — ownership consistente y ausencia de copias mutables competidoras;
- `TREQ-UX-023` — migración y retiro de superficies solo mediante reemplazo protegido y reversible.

---

#### 61. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-002`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado dentro de la rama documental de `VISO-UX-002`. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, el marcador canónico de `VISO-UX-002`, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, el owner modular, el artefacto aprobado de `VISO-UX-001`, contratos de personas y TALENTO, matrices administrativas, inventario de 61 rutas VISO, pantallas y procesos canónicos, Registro 04A aplicable y el AS-IS de `/staff` y `/vacancies*` en `vento-viso`. |
| OPERATIVA | NOT_EXECUTED | No se modificaron trabajadores, vínculos, vacantes, asistencia, programación, permisos, dispositivos, documentos ni casos reales. |
| FÍSICA | NOT_EXECUTED | No se modificó código, navegación runtime, Supabase ni despliegues; la materialización queda pendiente por unidad y gate aplicable. |

---

#### 62. Criterios de aceptación

La tarea queda aceptable cuando:

1. existe exactamente un contrato `VISO-PERSONAL-SECTION-001`;
2. `Personal` permanece como el primer dominio administrativo después de `Inicio`;
3. `VISO-ROUTE-041` se conserva como entrada observada principal del dominio;
4. la identidad de `VISO-ROUTE-041` no se renumera;
5. `/staff/new` permanece como ruta hija y no como dominio;
6. `/staff/[id]` permanece como detalle y no como dominio;
7. `/staff/attendance` se trata como revisión administrativa y no captura propietaria;
8. `/staff/calendar` pertenece a `Programación`;
9. `/staff/schedule` pertenece a `Programación`;
10. `/staff/schedule/global` pertenece a `Programación`;
11. `/staff/schedule/metrics` pertenece a `Programación`;
12. `/staff/schedule/settings` pertenece a `Programación`;
13. `/staff/schedule/month` pertenece a `Programación`;
14. `/staff/shared-devices/new` pertenece a `Acceso y seguridad`;
15. `/vacancies` se integra como capacidad hija de `Personal` y no como séptimo dominio;
16. `/vacancies/new` permanece hija;
17. `/vacancies/[id]` permanece detalle;
18. VISO gobierna la necesidad y vacante empresarial;
19. TALENTO conserva publicación, postulación y expediente prelaboral;
20. ANIMA conserva experiencia personal del trabajador;
21. candidato y trabajador permanecen separados;
22. postulación y vínculo laboral permanecen separados;
23. invitación y creación de empleado permanecen separadas;
24. invitación y acceso permanecen separadas;
25. `VSCREEN-0013` conserva vinculación e incorporación;
26. `VSCREEN-0014` conserva directorio y expediente laboral;
27. `VSCREEN-0016` conserva revisión de asistencia;
28. `VSCREEN-0017` conserva novedades, ausencias y reemplazos;
29. `VSCREEN-0018` conserva retiro y revocación coordinada;
30. `VSCREEN-0015` permanece reservado a `VISO-UX-003`;
31. las pantallas prelaborales no convierten a VISO en owner del expediente candidato;
32. el directorio no expone datos sensibles innecesarios;
33. filtros de sede no amplían territorio;
34. filtros de rol no conceden autoridad;
35. estado visible no equivale a permiso de editar;
36. trabajador multisede no revela sedes fuera del alcance autorizado;
37. rol base, rol operativo, perfil, turno y permiso permanecen distintos;
38. el detalle aplica divulgación progresiva;
39. el detalle puede enlazar a Programación sin editar horarios localmente;
40. el detalle puede enlazar a Acceso y seguridad sin editar matrices localmente;
41. el detalle puede enlazar a TALENTO sin duplicar expediente;
42. el detalle puede enlazar a ANIMA sin duplicar autoservicio;
43. asistencia visible proviene de fuente canónica;
44. una corrección de asistencia no sobrescribe el hecho original;
45. documentos laborales y prelaborales permanecen diferenciados;
46. historia clínica ocupacional no entra en la sección;
47. desempeño y desarrollo permanecen diferidos;
48. retiro coordina y no colapsa cierre laboral con revocación técnica;
49. reingreso crea un nuevo episodio;
50. errores técnicos no se presentan como lista vacía válida;
51. estados vacíos distinguen causa;
52. la navegación sigue siendo data-driven;
53. no se crea sidebar paralelo;
54. deep links revalidan autoridad;
55. URLs no transportan autoridad ni datos sensibles innecesarios;
56. cada carryover tiene owner y condición de salida;
57. no se crean requisitos de prueba;
58. no se modifican requisitos de prueba;
59. no se modifica 04A;
60. no se ejecutan cambios físicos desde esta tarea documental.

---

#### 63. Límites

Esta tarea no:

- modifica `vento-viso`;
- modifica `/staff`;
- modifica `/vacancies`;
- crea rutas nuevas;
- elimina rutas;
- renumera `VISO-ROUTE-*`;
- modifica navegación runtime;
- modifica `app_navigation_items`;
- modifica `app_screen_registry`;
- crea un sidebar hardcoded;
- crea una tabla;
- crea una vista;
- crea una RPC;
- crea una migración;
- cambia RLS;
- cambia grants;
- cambia Auth;
- cambia Storage;
- cambia Realtime;
- cambia datos reales;
- crea candidatos;
- crea trabajadores;
- envía invitaciones;
- crea vínculos;
- activa empleados;
- asigna sedes;
- asigna áreas;
- asigna roles;
- concede permisos;
- crea turnos;
- publica horarios;
- captura asistencia;
- corrige asistencia real;
- crea vacantes reales;
- publica vacantes;
- modifica expedientes;
- mueve documentos;
- ejecuta retiro laboral;
- revoca accesos;
- reactiva trabajadores;
- habilita desempeño y desarrollo;
- implementa `VISO-UX-003`;
- implementa `VISO-UX-004`;
- sustituye `VISO-UX-013` a `VISO-UX-020`;
- selecciona package;
- autoriza una instancia física;
- ejecuta una instancia física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

---

#### 64. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-001 — Reorganizar navegación por dominios administrativos`

**TAREA ACTUAL APROBADA**
`VISO-UX-002 — Crear sección Personal`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-003 — Crear sección Programación`
### ✅ VISO-UX-003 — Crear sección Programación

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-002 — Crear sección Personal
**Tarea siguiente:** VISO-UX-004 — Crear sección Acceso y seguridad
**Tipo de tarea:** definición técnico-documental de la sección administrativa `Programación` de VISO; fija su workspace principal, jerarquía Semana/Mes, contexto territorial y temporal, composición de vistas semanal detallada y mensual masiva, calendario contextual, superficies globales, métricas y configuración, estados de borrador/revisión/publicación, reglas de consistencia visual y handoffs hacia ANIMA, Personal, Organización, Acceso y seguridad y Auditoría, sin redefinir políticas propietarias de `VISO-SCH-*` y conservando `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la sección `Programación` definido; su materialización runtime permanece pendiente por `implementation_unit_id` y detrás del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, rutas, navegación runtime, pantallas, componentes, permisos, contratos compartidos, Supabase, datos, migraciones, RLS, RPC, triggers, Storage, Auth, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la sección administrativa `Programación` de VISO para que una persona autorizada pueda planear, revisar, comparar, publicar y corregir programación laboral desde una experiencia coherente, sin crear fuentes paralelas entre Semana y Mes, sin mezclar programación con asistencia personal y sin convertir una proyección visual en autoridad sobre turnos.

La sección debe responder de forma directa:

```text
¿QUÉ PERIODO Y TERRITORIO ESTOY PROGRAMANDO?
¿QUÉ TRABAJADORES PUEDO PROGRAMAR EN ESE CONTEXTO?
¿QUÉ TURNOS ESTÁN EN BORRADOR, EN REVISIÓN O PUBLICADOS?
¿QUÉ CAMBIOS ESTOY PROPONIENDO?
¿QUÉ CONFLICTOS O LÍMITES EXISTEN ANTES DE GUARDAR O PUBLICAR?
¿QUÉ EFECTO TENDRÁ LA PUBLICACIÓN?
¿QUÉ VISTA NECESITO: SEMANA, MES, GLOBAL, CALENDARIO, MÉTRICAS O CONFIGURACIÓN?
```

`Programación` no es una segunda fuente de asistencia ni una colección de calendarios independientes.

Es la experiencia administrativa propietaria del proceso de programación laboral `VPROC-0007` dentro de VISO.

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001` entrega sin reapertura:

```text
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
```

Para `Programación` entrega además:

- Semana y Mes pertenecen al mismo dominio;
- una variante semanal, mensual, global, de métricas o configuración no crea un dominio nuevo;
- varias rutas no autorizan fuentes de programación paralelas;
- las reglas específicas del delta mensual permanecen en `VISO-SCH-*`;
- navegación visible y acceso directo no sustituyen autorización;
- la identidad estable `VISO-ROUTE-001..061` no se renumera.

Esta tarea desarrolla el contenido y la experiencia de ese dominio sin reabrir la arquitectura de primer nivel.

---

#### 3. Handoff recibido de `VISO-UX-002`

La tarea anterior entrega explícitamente a `Programación`:

```text
VISO-ROUTE-045 = /staff/calendar
VISO-ROUTE-046 = /staff/schedule
VISO-ROUTE-047 = /staff/schedule/global
VISO-ROUTE-048 = /staff/schedule/metrics
VISO-ROUTE-049 = /staff/schedule/settings
VISO-ROUTE-061 = /staff/schedule/month
VSCREEN-0015 = Programación laboral
```

Las seis rutas conservan la clasificación heredada:

```text
navigation_class = CHILD_OR_DETAIL_ROUTE
canonical_domain = Programación
```

`Personal` puede enlazar a `Programación` conservando trabajador y contexto como selectores, pero no edita turnos dentro de la sección `Personal`.

---

#### 4. Topología y gate

La tarea conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
physical_identity = VISO-UX-003::implementation_unit_id
```

La definición documental no autoriza ninguna materialización física.

Cada materialización posterior deberá demostrar que:

- pertenece a la unidad de implementación correcta;
- respeta el gate temporal;
- consume este contrato sin crear una variante local incompatible;
- no adelanta decisiones pendientes de `VISO-SCH-*`, `CODE-AUD-021` o `AUTH-UI-061`.

---

#### 5. Contrato de sección

Se define:

```text
VISO_PROGRAMACION_SECTION_CONTRACT = VISO-PROGRAMACION-SECTION-001
DOMAIN_LABEL = Programación
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-046
PRIMARY_OBSERVED_ROUTE = /staff/schedule
PRIMARY_CANONICAL_SCREEN = VSCREEN-0015
PRIMARY_CANONICAL_PROCESS = VPROC-0007
PRIMARY_CANONICAL_STEP = VPROC-0007::STEP-PLAN_AND_PUBLISH_SCHEDULE
PRIMARY_INTENT = WORKFORCE_SCHEDULING
TREQ_CHANGES = 0
```

La relación entre la ruta observada, la pantalla canónica y el proceso deberá materializarse y demostrarse por los contratos de pantalla, proceso y navegación aplicables.

La coincidencia funcional observada no constituye por sí sola certificación física.

---

#### 6. Proceso propietario

La sección se organiza alrededor de:

```text
VPROC-0007
Administrar asignaciones laborales y programación publicada con historial y revisión controlada
```

VISO conserva ownership de la programación laboral.

ANIMA consume programación publicada y presenta la experiencia personal del trabajador.

SHELL y las aplicaciones autorizadas consumen contexto derivado cuando corresponda.

Ninguna vista de calendario, tabla, dashboard, métrica o pantalla móvil se convierte en una segunda fuente de programación por mostrar turnos.

---

#### 7. Unidad autoritativa y revisión publicada

Se conserva la decisión ya aprobada:

```text
UNIDAD AUTORITATIVA CONSUMIBLE
=
TURNO + REVISIÓN PUBLICADA
```

Por tanto:

```text
PUBLICAR UN TURNO
!=
MARCAR UNA FILA COMO VISIBLE
```

```text
TURNO PUBLICADO
!=
TURNO VIGENTE EN ESTE INSTANTE
```

```text
PUBLICACIÓN
!=
NOTIFICACIÓN
```

La UI debe representar estas diferencias sin inventar una semántica más simple que modifique el contrato.

---

#### 8. Estados canónicos de `VPROC-0007`

La experiencia deberá poder representar los estados canónicos vigentes:

1. `SCHEDULE_DRAFT`;
2. `UNDER_REVIEW`;
3. `PENDING_PUBLICATION`;
4. `PUBLISHED`;
5. `IN_EXECUTION`;
6. `CHANGE_UNDER_REVIEW`;
7. `PERIOD_RECONCILIATION_PENDING`;
8. `SCHEDULE_PERIOD_CLOSED`.

La interfaz puede usar etiquetas humanas equivalentes cuando exista traducción aprobada, pero no puede:

- fusionar estados materialmente distintos;
- tratar todo turno no publicado como el mismo estado de negocio;
- representar `PUBLISHED` como ejecución confirmada;
- ocultar una revisión o corrección pendiente;
- reescribir historial para simplificar la vista.

---

#### 9. Flujo administrativo de referencia

La sección conserva el flujo funcional:

```text
BORRADOR
→ VALIDACIÓN
→ REVISIÓN CUANDO APLIQUE
→ PENDIENTE DE PUBLICACIÓN
→ PUBLICACIÓN
→ NOTIFICACIÓN
→ CONSUMO EN ANIMA
→ EJECUCIÓN / ASISTENCIA
→ CORRECCIÓN O RECONCILIACIÓN CUANDO APLIQUE
```

La experiencia visual puede adaptar pasos que no apliquen a un caso concreto, pero no puede omitir silenciosamente:

- validación;
- autoridad;
- conflictos;
- revisión cuando sea exigida;
- receipt o resultado de publicación;
- trazabilidad de la revisión sustituida.

---

#### 10. Jerarquía interna del dominio

La jerarquía objetivo queda:

```text
Programación
├── Semana
├── Mes
├── Vista global
├── Calendario contextual
├── Métricas
└── Configuración
```

Prioridad de experiencia:

```text
1. Semana / Mes
2. Vista global cuando el alcance lo permita
3. Calendario contextual
4. Métricas
5. Configuración avanzada
```

`Métricas` y `Configuración` no compiten visualmente con la actividad frecuente de planear y publicar.

---

#### 11. Matriz de rutas del dominio

| Ruta estable | Patrón observado | Papel dentro de `Programación` | Navegación heredada | Regla principal |
| --- | --- | --- | --- | --- |
| `VISO-ROUTE-045` | `/staff/calendar` | `CONTEXT_CALENDAR` | `CHILD_OR_DETAIL_ROUTE` | contextualiza fechas y eventos; no es fuente de turnos |
| `VISO-ROUTE-046` | `/staff/schedule` | `WEEKLY_PLANNER` | `CHILD_OR_DETAIL_ROUTE` | workspace semanal principal observado |
| `VISO-ROUTE-047` | `/staff/schedule/global` | `CROSS_SITE_SCHEDULE_VIEW` | `CHILD_OR_DETAIL_ROUTE` | proyección autorizada entre sedes, sin ampliar autoridad |
| `VISO-ROUTE-048` | `/staff/schedule/metrics` | `SCHEDULE_ANALYTICS` | `CHILD_OR_DETAIL_ROUTE` | análisis secundario; no decide política laboral |
| `VISO-ROUTE-049` | `/staff/schedule/settings` | `PLANNER_CONFIGURATION` | `CHILD_OR_DETAIL_ROUTE` | configuración avanzada bajo divulgación progresiva |
| `VISO-ROUTE-061` | `/staff/schedule/month` | `MONTHLY_BULK_PLANNER` | `CHILD_OR_DETAIL_ROUTE` | planificación mensual masiva del mismo proceso |

No se crean rutas nuevas, no se retiran rutas y no se renumeran identidades.

---

#### 12. Entrada principal observada

`/staff/schedule` permanece como workspace principal observado de programación.

Su función objetivo es ofrecer:

- contexto territorial;
- periodo;
- selector Semana/Mes;
- planificación detallada;
- estado de revisión y publicación;
- acceso secundario a vistas globales, calendario, métricas y configuración;
- resultados y errores comprensibles.

No debe convertirse en una pantalla con widgets no relacionados que oculten la planificación.

---

#### 13. Selector primario Semana / Mes

Semana y Mes son dos vistas del mismo contrato.

El selector deberá:

- ser visible dentro del workspace de programación;
- conservar el contexto territorial permitido;
- conservar un periodo equivalente al cambiar de horizonte;
- evitar perder selección relevante cuando el cambio sea representable;
- indicar con claridad qué horizonte está activo;
- funcionar por teclado;
- ser usable en pantalla pequeña;
- no crear una entrada de sidebar independiente para cada horizonte.

La transición conceptual es:

```text
SEMANA
↔
MES
```

no:

```text
APLICACIÓN SEMANAL
↔
APLICACIÓN MENSUAL
```

---

#### 14. Fuente única de programación

La regla central queda:

```text
SEMANA_SOURCE
=
MES_SOURCE
=
PROGRAMACIÓN AUTORITATIVA DE VPROC-0007
```

No se permite:

```text
SEMANA_WRITE_MODEL != MES_WRITE_MODEL
```

ni:

```text
SEMANA_PUBLICATION_POLICY != MES_PUBLICATION_POLICY
```

La tabla física, vista, RPC o shape de persistencia que materialice esa fuente se resuelve en su capa propietaria y no se congela desde esta tarea UX.

---

#### 15. Contexto visible obligatorio

Toda vista de programación debe hacer visible el contexto material que determina qué se está observando o editando.

Como mínimo debe poder expresar, cuando aplique:

- sede o alcance territorial;
- periodo activo;
- trabajador o conjunto de trabajadores;
- área;
- rol operativo;
- estado de programación;
- revisión o versión relevante;
- modo real frente a simulación cuando exista;
- alcance global solo cuando esté autorizado.

El contexto visible no es autoridad.

El servidor vuelve a validar la operación.

---

#### 16. Alcance territorial

La selección de sede o contexto territorial:

- filtra la experiencia;
- no concede permisos;
- no agrega sedes no autorizadas;
- no permite editar un trabajador fuera del alcance;
- no convierte una vista global en wildcard;
- no sustituye la validación de área, rol o turno.

El detalle de experiencia territorial permanece reservado a `VISO-UX-013`.

Esta tarea solo exige que la sección no oculte ni fabrique el contexto.

---

#### 17. Vista semanal detallada

La vista `Semana` es la superficie de planificación detallada de corto horizonte.

Debe priorizar:

1. siete días del periodo semanal;
2. trabajadores programables en el contexto;
3. bloque o turno por día;
4. rol operativo y área cuando apliquen;
5. inicio y fin;
6. descanso o pausa según contrato vigente;
7. estado de borrador/publicación;
8. conflictos visibles;
9. totales relevantes del periodo;
10. acciones de guardar, revisar, publicar o corregir según autoridad.

La densidad puede ser alta en escritorio, pero la acción principal debe permanecer comprensible.

---

#### 18. Separación entre planificación y asistencia

La vista semanal puede mostrar señales de asistencia como contexto posterior cuando sea útil y esté autorizado.

Sin embargo:

```text
PROGRAMACIÓN
!=
ASISTENCIA
```

La programación define lo planificado y publicado.

ANIMA captura hechos de asistencia.

Una marca de entrada o salida no reescribe el turno histórico.

Una corrección de asistencia no debe aparecer como edición implícita de programación.

---

#### 19. Vista mensual masiva

La vista `Mes` está destinada a planificación masiva por trabajador y periodo mensual.

Debe permitir comprender simultáneamente:

- trabajador seleccionado;
- mes seleccionado;
- sede o contexto visible;
- días válidos del mes;
- bloques propuestos;
- fechas de cada bloque;
- rol y área;
- horario;
- descanso o pausa cuando corresponda;
- notas autorizadas;
- total actual;
- total nuevo;
- total proyectado;
- política o límite aplicable;
- estado del resultado.

No debe exigir navegar día por día para construir un patrón mensual repetitivo.

---

#### 20. Calendario mensual correcto

La cuadrícula o selector de fechas mensual debe usar únicamente días válidos del mes real.

Se preserva:

```text
FEBRERO = 28 O 29 DÍAS
ABRIL/JUNIO/SEPTIEMBRE/NOVIEMBRE = 30 DÍAS
RESTO = 31 DÍAS
```

La navegación de mes deberá soportar:

- cambio de mes;
- cambio de año;
- retorno a un periodo equivalente;
- zona horaria contractual;
- ausencia de fechas ficticias.

La vista no puede materializar un día 31 en un mes de 30 ni tratar el 29 de febrero como universal.

---

#### 21. Constructor multibloque

La experiencia mensual admite una composición multibloque.

Cada bloque representa una intención de horario homogénea sobre un conjunto de fechas.

Un bloque puede contener, según la política vigente:

- tipo laboral o descanso;
- rol operativo;
- área;
- hora de inicio;
- hora de fin;
- descanso o pausa;
- fechas;
- nota autorizada.

El máximo de bloques y otras restricciones cuantitativas no se fijan en esta tarea UX.

Se consumen desde la política canónica definida por `VISO-SCH-003`.

---

#### 22. Bloques plegables

Para evitar una pantalla mensual excesivamente larga:

- un bloque activo puede mostrar edición completa;
- los bloques no activos pueden mostrarse plegados;
- un bloque plegado debe conservar un resumen suficiente;
- el resumen incluye tipo, horario cuando aplique, cantidad de días y rol/área relevante;
- cambiar el bloque activo no pierde ediciones locales válidas;
- quitar un bloque exige una acción explícita;
- la expansión debe exponer `aria-expanded` o semántica accesible equivalente.

El plegado es presentación.

No cambia el contenido ni la autoridad del bloque.

---

#### 23. Pertenencia única de fecha en modalidad rápida

Cuando la modalidad mensual rápida aplique la regla de exclusividad de fecha:

```text
UNA FECHA
→ UN BLOQUE DEL CONSTRUCTOR RÁPIDO
```

Mover una fecha entre bloques debe ser explícito y visible.

La interfaz debe informar:

- fecha movida;
- bloque de origen;
- bloque de destino.

No se elimina silenciosamente una fecha de un bloque al seleccionarla en otro.

La política exacta permanece gobernada por `VISO-SCH-003`.

---

#### 24. Presets mensuales

Los presets de selección de fechas son ayudas de edición, no comandos autoritativos.

Pueden existir alternativas equivalentes como:

- días laborables;
- todo el mes;
- limpiar selección;
- patrones aprobados posteriores.

Todo preset deberá:

- mostrar el resultado antes de guardar;
- respetar exclusividad de fecha cuando aplique;
- no alterar bloques ocultos sin señal visible;
- dejar la selección final inspeccionable.

---

#### 25. Horarios y duración

El bloque debe mostrar inicio y fin de forma inequívoca.

La UI deberá impedir o señalar duraciones inválidas según la política vigente.

Las reglas sobre:

- overnight;
- turnos partidos;
- duración máxima;
- duración mínima;
- granularidad;
- descansos;
- redondeo;

permanecen bajo `VISO-SCH-003` y no se reinventan aquí.

La experiencia consume esas reglas y explica el resultado.

---

#### 26. Descansos

Un descanso o bloque no laboral debe distinguirse visual y semánticamente de un turno laboral.

No se permite representar un descanso como turno de cero horas si ello cambia la semántica contractual.

Cuando la política vigente use bloques de descanso:

- deben identificarse como tales;
- no deben requerir rol o área si el contrato no lo exige;
- deben conservar fechas;
- deben participar en validaciones de conflicto cuando corresponda;
- no deben inflar horas laborales.

---

#### 27. Notas

Las notas son contexto complementario.

No pueden transportar:

- permisos;
- autoridad;
- rol efectivo;
- reglas de excepción no aprobadas;
- información sensible innecesaria;
- instrucciones que sustituyan un campo contractual.

La nota puede usar divulgación progresiva para no ocupar espacio cuando esté vacía.

---

#### 28. Vista previa de impacto

Antes de guardar una operación mensual masiva, la experiencia debe mostrar:

```text
ACTUAL
+
NUEVAS
=
PROYECTADO
```

Además debe mostrar el límite o política aplicable cuando exista.

La vista previa debe distinguir:

- dato actual;
- cambio propuesto;
- resultado proyectado;
- umbral preventivo cuando exista;
- límite de bloqueo cuando exista;
- consecuencia de guardar o publicar.

El color es apoyo visual.

Nunca sustituye texto, número ni decisión del servidor.

---

#### 29. Política de límite mensual

Esta tarea no aprueba valores numéricos de horas.

Los valores observados en el delta congelado permanecen provisionales:

```text
WARNING_AS_IS = 174 h
LIMIT_AS_IS = 186 h
```

No se convierten por esta tarea en constantes UX canónicas.

La experiencia final deberá consumir una política:

- exacta;
- versionada;
- auditable;
- compartida por Semana y Mes;
- consistente entre cliente y servidor.

La definición de esa política pertenece a `VISO-SCH-004`.

---

#### 30. Total mensual entre sedes

Cuando el contrato de límite exige total mensual global del trabajador, el cálculo considera todas las sedes pertinentes.

La experiencia administrativa conserva simultáneamente:

```text
TOTAL PARA VALIDAR LÍMITE
PUEDE SER MULTISEDE
```

pero:

```text
DETALLE VISIBLE
NO SE AMPLÍA POR ESE CÁLCULO
```

La UI puede mostrar un total agregado autorizado sin revelar turnos, sedes o detalles fuera del alcance visible del administrador.

---

#### 31. Borrador y publicación son acciones distintas

La sección debe mantener separadas:

```text
GUARDAR BORRADOR
```

```text
PUBLICAR
```

No pueden compartir una confirmación ambigua.

Deben poder tener:

- permisos distintos;
- precondiciones distintas;
- consecuencias distintas;
- receipts distintos;
- errores distintos.

La definición detallada pertenece a `VISO-SCH-005` y a los contratos de autorización aplicables.

---

#### 32. Borrador sobre límite

El baseline congelado conserva la posibilidad de que una propuesta sobre el límite quede como borrador cuando la política lo permita.

La experiencia debe comunicar de forma explícita:

```text
SE PUEDE GUARDAR COMO BORRADOR
!=
SE PUEDE PUBLICAR
```

No debe mostrar un borrador sobre límite como programación válida o publicada.

La regla final de política permanece bajo `VISO-SCH-004` y `VISO-SCH-005`.

---

#### 33. Publicación

La publicación debe presentarse como transición autoritativa.

Antes de solicitarla, la UI debe poder mostrar:

- periodo;
- población afectada;
- revisión que se publica;
- conflictos relevantes;
- límite aplicable;
- cambios frente a lo vigente;
- consecuencia de la publicación;
- notificación posterior cuando corresponda.

Después de una publicación válida debe existir un resultado identificable.

Una animación, toast o cambio de color no sustituye el receipt de negocio.

---

#### 34. Publicación semanal y mensual equivalente

Semana y Mes no pueden tener semánticas incompatibles de publicación.

Se conserva:

```text
WEEK_PUBLISH_POLICY
=
MONTH_PUBLISH_POLICY
```

para las dimensiones contractualmente compartidas.

La granularidad de selección puede variar, pero no:

- el significado de publicar;
- el control de autoridad;
- el límite aplicable;
- la revisión vigente;
- la trazabilidad;
- la notificación contractual.

---

#### 35. Revisión y aprobación

Cuando el flujo requiera revisión separada, la interfaz debe distinguir:

- quien preparó;
- quien revisa;
- quien puede publicar;
- estado pendiente;
- conflictos abiertos;
- diferencia entre revisar y ejecutar.

No se infiere segregación únicamente por rol mostrado en pantalla.

La autoridad efectiva se revalida.

---

#### 36. Conflictos antes de guardar

La sección debe hacer visibles los conflictos detectables antes de guardar o publicar.

Como categorías de experiencia se contemplan:

- solapamiento temporal;
- incompatibilidad de rol y área;
- territorio no válido;
- trabajador no elegible;
- indisponibilidad;
- descanso incompatible;
- límite mensual;
- concurrencia;
- estado desactualizado;
- dependencia faltante;
- revisión obsoleta.

La UI puede anticipar conflictos.

El servidor debe recalcular los controles decisorios inmediatamente antes del efecto.

---

#### 37. Conflictos no resueltos por color

Nunca se modela:

```text
ROJO = DENY
VERDE = ALLOW
```

como única evidencia.

Cada conflicto material debe poder expresar:

- qué ocurrió;
- sobre quién o qué periodo;
- por qué bloquea o advierte;
- qué se puede corregir;
- si requiere otra autoridad;
- si el estado cambió desde la carga inicial.

---

#### 38. Concurrencia

La experiencia debe asumir que la programación puede cambiar mientras el administrador edita.

Por tanto:

- una vista cargada no congela el servidor;
- un preview no reserva turnos;
- una fila visible no demuestra que siga disponible;
- una publicación debe detectar revisión o estado obsoleto;
- no se resuelven conflictos empresariales con `last write wins` silencioso.

La política detallada pertenece a `VISO-SCH-006`.

---

#### 39. Corrección de programación publicada

Una corrección posterior a publicación:

- no reescribe silenciosamente la revisión histórica;
- conserva la revisión anterior;
- conserva motivo y actor;
- muestra qué cambia;
- muestra a quién afecta;
- vuelve a validar conflictos y autoridad;
- produce una revisión o transición trazable.

La experiencia no ofrece “editar publicado” como si fuera un borrador mutable ordinario.

---

#### 40. Eliminación masiva

Cuando exista eliminación masiva de programación mensual:

- debe quedar limitada al conjunto permitido por el contrato;
- el baseline actual la restringe a borradores;
- la selección debe ser explícita;
- el alcance debe verse antes de confirmar;
- el resultado debe indicar qué se eliminó y qué no;
- la auditoría no puede omitirse.

La regla exacta de estados eliminables pertenece a `VISO-SCH-005` y a la autorización de servidor aplicable.

---

#### 41. Contexto de trabajador

Al abrir Programación desde `Personal`, el trabajador puede viajar como selector de contexto.

Se conserva:

```text
PERSONAL_LINK
→ worker_id COMO SELECTOR
→ PROGRAMACIÓN REVALIDA ALCANCE Y AUTORIDAD
```

No se conserva:

```text
worker_id EN URL
→ AUTORIDAD
```

La sección puede preseleccionar el trabajador si sigue siendo administrable en el contexto efectivo.

---

#### 42. Contexto de sede

El cambio de sede debe:

- usar solo sedes administrables;
- actualizar los trabajadores y roles disponibles;
- actualizar el periodo sin perderlo cuando sea posible;
- invalidar selecciones incompatibles;
- evitar conservar áreas o roles de otra sede;
- volver a resolver acciones permitidas.

La sede seleccionada no es un permiso.

---

#### 43. Área y rol operativo

Área y rol deben presentarse como dimensiones distintas pero compatibles.

La UI no puede:

- inferir área únicamente por nombre de rol cuando existen varias opciones;
- usar rol base como sustituto silencioso del rol operativo;
- ofrecer combinaciones no válidas por conveniencia visual;
- conservar una combinación al cambiar de sede si ya no aplica.

Las matrices propietarias permanecen en Acceso y seguridad y contratos de autorización.

Programación las consume.

---

#### 44. Vista global entre sedes

`/staff/schedule/global` es una superficie secundaria de programación.

Su función es permitir una proyección autorizada entre sedes cuando el administrador tenga alcance suficiente.

Debe conservar:

- filtros territoriales explícitos;
- origen de cada turno;
- sede y contexto;
- periodo;
- estado;
- ausencia de wildcard implícito.

Una vista global no concede capacidad de edición global.

---

#### 45. Calendario contextual

`/staff/calendar` pertenece al dominio `Programación` como superficie contextual heredada.

No obstante, el runtime observado muestra que el calendario puede presentar fechas procedentes de capacidades distintas de programación laboral.

Por tanto, se fija:

```text
CALENDAR_ROUTE_DOMAIN = Programación
CALENDAR_DATA_OWNERSHIP = POR EVENTO / CAPACIDAD PROPIETARIA
```

El calendario puede superponer fechas útiles, pero:

- un evento de mantenimiento no se convierte en turno;
- un vencimiento laboral no se convierte en programación;
- una fecha manual no altera `VPROC-0007`;
- una superficie de otro owner debe enlazar a su owner cuando corresponda;
- la programación laboral mostrada sigue viniendo de la fuente autoritativa de `VPROC-0007`.

---

#### 46. Calendario no es editor universal

La ruta de calendario no puede convertirse en un editor genérico de cualquier evento mostrado.

Cada evento deberá poder distinguir al menos:

- categoría;
- fecha;
- owner funcional;
- acción disponible;
- contexto territorial permitido;
- destino de edición cuando exista.

Cuando el owner sea externo a Programación, la acción es un handoff protegido, no una mutación local equivalente.

---

#### 47. Métricas de programación

`/staff/schedule/metrics` es una superficie secundaria de análisis.

Puede presentar, según contratos aprobados:

- cobertura;
- programación planificada;
- ejecución observada;
- asistencia correlacionada;
- carga por periodo;
- patrones históricos;
- indicadores por sede;
- indicadores agregados.

Esta tarea no aprueba:

- ranking laboral como política de decisión;
- premios automáticos;
- penalizaciones;
- evaluación de desempeño;
- decisiones disciplinarias;
- scoring de personas como autoridad.

Toda interpretación con efecto laboral requiere su owner y contrato específicos.

---

#### 48. Diferenciar programado, ejecutado y medido

La experiencia de métricas debe conservar:

```text
PROGRAMADO
!=
ASISTIDO
!=
TRABAJADO
!=
RECONCILIADO
!=
DESEMPEÑO
```

Una métrica calculada desde asistencia no modifica el turno.

Una métrica de puntualidad no es una decisión laboral por sí sola.

Un total mensual de horas programadas no equivale a horas efectivamente trabajadas.

---

#### 49. Configuración del planificador

`/staff/schedule/settings` es una superficie avanzada.

Puede agrupar configuraciones relacionadas con:

- cobertura;
- disponibilidad;
- reglas por trabajador;
- límites de planificación;
- preferencias;
- concurrencia por rol;
- configuración territorial compatible.

La configuración avanzada usa divulgación progresiva y no ocupa el primer nivel visual del trabajo diario.

---

#### 50. Configuración no crea políticas locales

Una pantalla de configuración no puede crear una política paralela a la fuente canónica.

Se conserva:

```text
UI SETTING
→ EDITA UNA POLÍTICA CANÓNICA AUTORIZADA
```

no:

```text
UI SETTING
→ CREA UNA REGLA LOCAL SOLO PARA ESA PANTALLA
```

Valores con efecto sobre autorización, horas, disponibilidad o concurrencia deben conservar versión, owner, vigencia y auditoría cuando el contrato lo exija.

---

#### 51. Disponibilidad

La disponibilidad puede ser un insumo para planificación.

No equivale a turno publicado.

Se conserva:

```text
DISPONIBILIDAD
!=
PROGRAMACIÓN
```

```text
PREFERENCIA
!=
DISPONIBILIDAD OBLIGATORIA
```

```text
SUGERENCIA
!=
PUBLICACIÓN
```

La sección debe evitar que una sugerencia derivada aparezca como decisión confirmada.

---

#### 52. Sugerencias de planificación

Si la implementación ofrece sugerencias automáticas o basadas en histórico:

- el resultado permanece en borrador;
- se identifica como sugerido;
- el administrador puede inspeccionarlo antes de aceptar;
- no se publica automáticamente;
- no se usa como autoridad de rol, área o disponibilidad;
- no penaliza al trabajador por no coincidir con un patrón histórico.

Esta tarea no define un algoritmo de optimización.

---

#### 53. Relación con ANIMA

ANIMA consume programación publicada.

Se conserva:

```text
VISO
→ PUBLICA REVISIÓN
→ CONTRATO DE INTEGRACIÓN
→ ANIMA PRESENTA PROGRAMACIÓN DEL TRABAJADOR
```

ANIMA no mantiene un editor competidor.

Un cambio realizado en VISO no se considera consumido por ANIMA únicamente porque apareció un toast de publicación.

La notificación y sincronización conservan su contrato propio.

---

#### 54. Notificación a ANIMA

La publicación puede disparar notificación o proyección hacia ANIMA.

La experiencia debe distinguir:

```text
PUBLICATION_RESULT = SUCCESS
```

frente a:

```text
NOTIFICATION_RESULT = PENDING / SUCCESS / RECOVERABLE_FAILURE
```

según los contratos técnicos que se materialicen.

Una notificación fallida no puede transformar una publicación válida en una edición local incierta ni ocultar el estado real.

---

#### 55. Relación con `Personal`

`Personal` conserva trabajador, vínculo y expediente.

`Programación` conserva turnos y revisiones.

Los handoffs permitidos incluyen:

- trabajador → abrir programación del trabajador;
- programación → abrir detalle laboral autorizado;
- caso laboral → consultar efecto sobre programación cuando corresponda.

No se crean editores duplicados.

---

#### 56. Relación con `Organización`

`Organización` conserva definición y gobierno de sedes, áreas y estructura.

`Programación` consume esas identidades para asignar contexto.

Programación no:

- crea una sede para resolver un turno;
- crea un área ad hoc;
- renombra estructura;
- usa un área agregada como wildcard;
- modifica ownership organizacional.

---

#### 57. Relación con `Acceso y seguridad`

`Acceso y seguridad` conserva:

- permisos;
- roles administrativos;
- roles operativos;
- matrices territoriales;
- excepciones;
- simulación;
- dispositivos cuando aplique.

`Programación` consume el resultado necesario para determinar qué opciones mostrar y qué acción solicitar.

La autorización decisoria permanece en servidor.

---

#### 58. Relación con `Auditoría`

`Programación` muestra receipts y trazabilidad contextual suficiente para comprender cambios recientes.

La investigación histórica profunda pertenece a `Auditoría`.

Se permite handoff desde:

- revisión publicada;
- corrección;
- conflicto;
- publicación;
- eliminación;
- cambio de configuración;

hacia la evidencia auditable correspondiente.

---

#### 59. Relación con `Operación`

Operación puede consumir el contexto derivado de un turno publicado para habilitar o contextualizar procesos posteriores.

No puede usar una vista de Programación para ejecutar una capacidad operativa sin revalidación.

Programación tampoco absorbe las pantallas operativas por mostrar rol, área o jornada.

---

#### 60. Deep links

Un deep link puede conservar selectores como:

- sede;
- periodo;
- trabajador;
- horizonte;
- revisión;
- elemento visible.

No puede transportar autoridad.

Toda entrada directa debe revalidar:

- sesión;
- acceso a VISO;
- permiso aplicable;
- territorio;
- recurso;
- contexto;
- estado actual.

---

#### 61. URL y privacidad

No se introducirán en URL:

- datos sensibles del trabajador;
- documentos;
- salario;
- notas privadas;
- permiso efectivo completo;
- tokens;
- justificaciones sensibles;
- payloads de bloques.

Los IDs usados como selectores permanecen sujetos a control de acceso en servidor.

---

#### 62. Navegación responsive

La sección deberá funcionar en:

- escritorio;
- tablet;
- móvil.

La adaptación preferida queda:

```text
ESCRITORIO
→ matriz / tabla densa + paneles

TABLET
→ matriz compacta + edición lateral o modal

MÓVIL
→ drill-down por trabajador/día/bloque + acciones explícitas
```

La vista móvil no elimina funciones críticas.

Si requiere desplazamiento horizontal, debe existir jerarquía y foco claros para evitar perder el contexto.

---

#### 63. Semana responsive

En pantallas estrechas la vista semanal puede transformar la matriz en:

- lista por trabajador;
- lista por día;
- cards de turno;
- selector de día;
- drawer o modal de edición.

La transformación conserva:

- periodo;
- sede;
- trabajador;
- estado;
- rol/área;
- acciones;
- conflictos.

---

#### 64. Mes responsive

El constructor mensual debe evitar una cuadrícula inusable en móvil.

Puede usar:

- bloques plegables;
- selector de días adaptable;
- resumen sticky o equivalente;
- controles de periodo compactos;
- detalle por bloque.

El usuario debe poder verificar qué fechas pertenecen a cada bloque antes de guardar.

---

#### 65. Accesibilidad

La sección deberá conservar:

- navegación por teclado;
- foco visible;
- labels explícitos;
- asociación entre error y campo;
- `aria-expanded` o equivalente en bloques plegables;
- estados anunciables para mensajes dinámicos relevantes;
- contraste suficiente;
- información no dependiente solo de color;
- orden lógico al cambiar entre Semana y Mes.

---

#### 66. Estados de carga

Una vista de programación debe diferenciar:

```text
LOADING
EMPTY
NO_AUTHORITY
NO_TERRITORY
NO_WORKERS
NO_SCHEDULE
ERROR
STALE
```

No se muestra “sin turnos” cuando en realidad falló la consulta.

No se muestra “sin trabajadores” cuando el administrador carece de alcance.

No se muestra un dataset stale como estado vigente sin indicación cuando esa frescura sea material.

---

#### 67. Estado vacío semanal

Si no existen turnos para una semana válida:

- se conserva el contexto de semana y sede;
- se informa que no existe programación en ese periodo;
- solo aparece acción de creación si está autorizada;
- no se interpreta ausencia como error;
- no se oculta una restricción de acceso detrás del estado vacío.

---

#### 68. Estado vacío mensual

Si un trabajador o periodo no tiene programación:

- se mantiene visible el periodo;
- se muestran días válidos;
- se puede iniciar una propuesta solo si existe autoridad;
- el total actual se representa como cero únicamente si fue calculado correctamente;
- no se infiere que el trabajador pueda programarse en cualquier sede o área.

---

#### 69. Errores de servidor

Los errores de guardado o publicación deben ser comprensibles y accionables.

La UI debe distinguir, al menos conceptualmente:

- falta de autorización;
- territorio inválido;
- trabajador no elegible;
- conflicto de horario;
- revisión obsoleta;
- límite excedido;
- estado no compatible;
- validación de datos;
- dependencia temporal;
- fallo técnico recuperable.

No se expone error bruto del proveedor cuando contenga información sensible.

---

#### 70. URLs o formularios manipulados

Una URL, formulario o Server Action modificados fuera de la UI no pueden:

- cambiar trabajador no autorizado;
- ampliar sede;
- introducir área ajena;
- introducir rol incompatible;
- publicar una revisión no seleccionable;
- saltar límites;
- cambiar estado;
- convertir simulación en ejecución.

El servidor rechaza la acción y la UI presenta un estado canónico comprensible.

---

#### 71. Autoridad de escritura

La existencia de `requireStaffScheduleAccess` observada en el runtime demuestra una barrera de acceso, no una certificación de permisos atómicos de escritura.

Esta tarea UX no aprueba reutilizar un permiso de consulta para:

- crear;
- actualizar;
- eliminar;
- publicar;
- corregir;
- autorizar excepciones.

La separación de capacidades pertenece a los contratos de autorización y a `VISO-SCH-007`.

---

#### 72. Estado físico mensual observado

El delta mensual permanece:

```text
CONGELADO_PENDIENTE_DE_ESTABILIZACION
```

Esta tarea puede usarlo como evidencia AS-IS de la experiencia existente, pero no lo declara:

- estable;
- desplegable;
- canónico en sus valores provisionales;
- autorizado para producción;
- prueba de cierre de `VISO-SCH-*`.

---

#### 73. Valores AS-IS que no se canonizan aquí

El runtime y delta observados incluyen actualmente, entre otros:

```text
MAX_MONTHLY_SHIFT_BLOCKS_AS_IS = 12
WARNING_AS_IS = 174 h
LIMIT_AS_IS = 186 h
QUICK_OVERNIGHT_AS_IS = NO
BREAK_MINUTES_AS_IS = 0 EN EL DELTA CONGELADO
```

Estos valores permanecen provisionales o propietarios de `VISO-SCH-003` y `VISO-SCH-004`.

`VISO-UX-003` define cómo presentar políticas, no su número final.

---

#### 74. Matriz de ownership de decisiones pendientes

| Decisión | Owner canónico | Tratamiento en `VISO-UX-003` |
| --- | --- | --- |
| misma fuente Semana/Mes | `VISO-SCH-001` | obligatoria para la UX; no se redefine almacenamiento |
| horizontes, calendario y zona horaria | `VISO-SCH-002` | se presenta de forma coherente |
| bloques, overnight, descansos y modalidad rápida | `VISO-SCH-003` | se consume; valores finales no se fijan aquí |
| límite, warning, vigencia y excepciones | `VISO-SCH-004` | se visualiza; política final no se inventa |
| borrador, revisión, publicación y corrección | `VISO-SCH-005` | se distinguen acciones y estados |
| conflictos, concurrencia y rollback | `VISO-SCH-006` | se exponen resultados y stale state |
| permisos, auditoría y notificación | `VISO-SCH-007` | se reflejan sin conceder autoridad visual |
| aprobación integral pre-E5 | `VISO-SCH-008` | condición física posterior |
| reconciliación técnica del delta | `CODE-AUD-021` | no se declara cerrada |
| reconciliación de ruta mensual | `AUTH-UI-061` | se conserva `VISO-ROUTE-061` sin certificarla |

No se crea una tarea nueva para ninguna de estas decisiones.

---

#### 75. Ruta mensual reservada

Se preserva:

```text
VISO-ROUTE-061
/staff/schedule/month
```

Su navegación objetivo es por selector/deep link dentro del dominio, no como entrada primaria independiente del sidebar.

La tarea no certifica el runtime mensual ni reemplaza `AUTH-UI-061`.

---

#### 76. Vista semanal observada

El runtime observado de `/staff/schedule` ya contiene elementos compatibles con el contrato objetivo:

- sede;
- semana;
- trabajadores;
- turnos;
- rol y área;
- estados de borrador/publicación;
- totales por periodos;
- señales de asistencia;
- acciones de planificación.

Estas observaciones sirven para reconciliar AS-IS y TO-BE.

No convierten la implementación existente en cumplimiento automático.

---

#### 77. Vista mensual observada

El runtime observado de `/staff/schedule/month` ya contiene:

- meses con número real de días;
- selector de sede;
- trabajadores;
- turnos del mes;
- builder multibloque;
- bloques plegables;
- selección exclusiva de fecha en modalidad rápida;
- preview actual/nuevas/proyectado;
- warning y límite AS-IS;
- acciones de borrador, publicación y eliminación.

El contrato de esta tarea conserva los patrones útiles y separa los valores provisionales de las decisiones canónicas pendientes.

---

#### 78. Selector Semana/Mes observado

El runtime observado dispone de un selector compartido que:

- detecta `/staff/schedule`;
- detecta `/staff/schedule/month`;
- conserva `site_id`;
- transforma week/month para mantener periodo equivalente;
- muestra `Semana` y `Mes`.

Este patrón es compatible con el contrato objetivo y deberá conservar paridad funcional cuando se materialice la tarea.

---

#### 79. Bloques plegables observados

El builder mensual observado:

- mantiene un bloque activo;
- pliega los demás;
- muestra tipo, horario, días y resumen;
- expone `aria-expanded`;
- permite quitar bloques;
- muestra contenido completo del bloque activo.

El patrón es válido como referencia AS-IS.

La tarea no fija el componente concreto ni obliga a reutilizar su implementación física.

---

#### 80. Movimiento explícito de fechas observado

El builder actual informa cuando una fecha se mueve entre bloques.

Ese comportamiento se conserva como requisito de experiencia:

```text
FECHA MOVIDA
→ ORIGEN VISIBLE
→ DESTINO VISIBLE
```

La implementación futura puede cambiar el texto o componente, pero no volver silencioso el movimiento.

---

#### 81. Preview observado

El builder mensual observado presenta:

```text
Actual
Nuevas
Proyectado
Estado
```

La estructura es compatible con el contrato objetivo.

La implementación final deberá obtener política y decisiones decisorias desde contratos canónicos, no desde hardcodes visuales divergentes.

---

#### 82. Vista global observada

La existencia de `/staff/schedule/global` confirma una superficie secundaria de alcance amplio.

Su materialización final debe demostrar:

- alcance real del actor;
- diferenciación entre consulta y edición;
- identificación de sede;
- límites de datos visibles;
- ausencia de ampliación por agregación.

---

#### 83. Métricas observadas

El runtime actual de métricas calcula indicadores de programación y asistencia.

La UI final puede conservar indicadores útiles, pero esta tarea prohíbe promover textos, rankings o incentivos actuales a política laboral canónica sin un owner aprobado.

La superficie permanece analítica y secundaria.

---

#### 84. Configuración observada

El runtime actual de configuración contiene cobertura, disponibilidad, reglas de trabajador y límites de concurrencia.

La experiencia final debe conservar:

- separación entre planificación y configuración;
- contexto territorial;
- reglas visibles;
- edición autorizada;
- procedencia de la política;
- handoff a owner cuando una regla pertenezca a otro dominio.

---

#### 85. No crear un segundo sidebar

La sección se integra en la navegación administrativa definida por `VISO-UX-001`.

No se crea:

- sidebar paralelo;
- navegación hardcoded independiente;
- grupo `staff` adicional;
- entrada de primer nivel por cada ruta.

Las superficies secundarias viven dentro de `Programación`.

---

#### 86. Orden visual recomendado por intención

Dentro del dominio se preserva la prioridad:

```text
PLANEAR
→ REVISAR
→ PUBLICAR
→ COMPARAR / CONSULTAR
→ CONFIGURAR
→ AUDITAR
```

No se organiza el trabajo por nombres técnicos de archivos o tablas.

---

#### 87. Divulgación progresiva

La sección debe ocultar complejidad avanzada hasta que sea necesaria.

Ejemplos de contenido secundario:

- configuración;
- notas;
- métricas detalladas;
- conflictos expandidos;
- historial;
- información de auditoría;
- parámetros avanzados;
- acciones excepcionales.

La divulgación progresiva no oculta advertencias críticas ni consecuencias de publicación.

---

#### 88. Receipt de guardado

Después de guardar un borrador debe quedar claro:

- qué periodo se afectó;
- qué trabajador o conjunto fue afectado;
- qué quedó en borrador;
- qué no fue publicado;
- qué advertencias permanecen;
- qué acción sigue disponible.

Un borrador guardado no se anuncia como programación comunicada al trabajador.

---

#### 89. Receipt de publicación

Después de publicar debe quedar claro:

- periodo;
- revisión publicada;
- población afectada;
- resultado;
- actor o autoridad cuando corresponda mostrarlo;
- notificación o proyección downstream en el nivel permitido;
- conflictos o fallos parciales si existieran.

La UI no debe afirmar que ANIMA recibió algo si esa evidencia no existe.

---

#### 90. Receipt de corrección

Después de una corrección debe poder identificarse:

- revisión anterior;
- nueva revisión;
- motivo;
- alcance afectado;
- estado de publicación;
- resultado de notificación cuando aplique.

No se sobrescribe la historia para mostrar únicamente el último estado.

---

#### 91. Performance de experiencia

La sección deberá evitar que el volumen mensual o global degrade la comprensión.

Puede usar:

- paginación;
- virtualización;
- carga por contexto;
- filtros;
- plegado;
- resumen agregado;
- lazy loading de detalles secundarios.

La optimización no puede cambiar el conjunto autoritativo ni ocultar elementos afectados por una mutación masiva.

---

#### 92. Consistencia entre vistas

Para un mismo turno y revisión:

```text
SEMANA
MES
GLOBAL
CALENDARIO
MÉTRICAS
```

deben presentar identidades y estado compatibles con su función.

Una diferencia de presentación no puede producir una diferencia de verdad.

Si existe inconsistencia, la UX debe favorecer el estado autoritativo y exponer la necesidad de refresco o reconciliación.

---

#### 93. Frescura

Antes de una mutación material se revalida el estado necesario.

La UI debe estar preparada para informar:

- datos actualizados por otro actor;
- periodo publicado mientras se editaba;
- turno eliminado o modificado;
- política cambiada;
- cambio de territorio o autoridad.

No se sobrescribe silenciosamente el estado más reciente.

---

#### 94. Simulación

Cuando exista simulación administrativa autorizada:

- se distingue visualmente del contexto real;
- no ejecuta mutaciones reales;
- no publica;
- no notifica;
- no amplía datos reales visibles;
- no se convierte en helper de autorización real.

La definición detallada permanece en las tareas propietarias de simulación y seguridad.

---

#### 95. Dispositivo compartido

En dispositivo compartido, Programación conserva los controles de navegación y actor efectivo aplicables.

La sección no supone que el dispositivo sea el actor.

Toda acción sensible identifica y revalida al actor autorizado conforme a los contratos de acceso.

---

#### 96. Acciones masivas

Toda acción masiva debe diferenciar:

```text
SELECCIONAR LO VISIBLE
!=
SELECCIONAR TODO EL RESULTADO
```

cuando ambas posibilidades existan.

Antes de ejecutar debe poder mostrarse:

- población congelada o criterio exacto;
- cantidad afectada;
- periodo;
- territorio;
- conflictos;
- resultado esperado.

Después debe existir resultado por elemento cuando el contrato lo exija.

---

#### 97. No inferir autorización desde rol mostrado

Mostrar un rol administrativo o operativo en la interfaz no concede capacidad.

La sección no implementa:

```text
IF role == gerente THEN allow
```

como autoridad final.

La decisión consume permisos, alcance, contexto y recurso según los contratos vigentes.

---

#### 98. No inferir contexto desde preferencias

Una preferencia de trabajador, sede seleccionada, último filtro o valor de formulario no sustituye:

- asignación vigente;
- territorio permitido;
- rol aplicable;
- área compatible;
- turno autoritativo.

La experiencia puede sugerir valores, pero el servidor determina elegibilidad.

---

#### 99. No retiro prematuro

Esta tarea clasifica la experiencia objetivo pero no autoriza retirar rutas o componentes actuales.

Cualquier retiro posterior exige:

- reemplazo materializado;
- consumidores reconciliados;
- paridad funcional necesaria;
- autorización equivalente o más restrictiva;
- pruebas;
- rollback o reversibilidad cuando corresponda.

---

#### 100. Carryovers a tareas posteriores del minibloque

`VISO-UX-003` entrega a las tareas posteriores únicamente lo necesario:

| Tarea posterior | Handoff |
| --- | --- |
| `VISO-UX-004` | Programación consume permisos y matrices; Acceso y seguridad conserva ownership |
| `VISO-UX-005` | Programación consume sedes/áreas; Organización conserva ownership |
| `VISO-UX-006` | Operación consume contexto de turno cuando corresponda, sin editar programación |
| `VISO-UX-007` | publicaciones/correcciones producen trazabilidad investigable |
| `VISO-UX-013` | la experiencia territorial debe aplicar alcance exacto |
| `VISO-UX-014` | origen de permisos debe mostrarse comprensiblemente cuando aplique |
| `VISO-UX-015` | conflictos previos a guardar se visualizan con actual/nuevo/proyectado y consecuencias |
| `VISO-UX-016` | preview de trabajador debe reflejar efecto exacto sin ampliar detalle territorial |
| `VISO-UX-017` | configuraciones de otros owners no se duplican |
| `VISO-UX-018` | handoffs cross-app se materializan como enlaces protegidos |
| `VISO-UX-019` | seguridad avanzada usa divulgación progresiva |
| `VISO-UX-020` | pruebas con administradores cubren Semana/Mes, meses variables, exceso, corrección, publicación, navegación y errores |

Esta tarea no desarrolla anticipadamente esas responsabilidades.

---

#### 101. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

Justificación:

- el Registro Canónico ya contiene cobertura específica para la ruta mensual, paridad Semana/Mes, meses de longitud variable, bloques, fechas, límites, borrador/publicación, conflictos, concurrencia, rollback, autorización, auditoría y notificación;
- esta tarea organiza esa cobertura en la experiencia administrativa sin crear una regla de negocio nueva;
- los valores de política todavía pendientes permanecen en sus tareas propietarias y no se fijan desde UX.

---

#### 102. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico, la tarea reutiliza especialmente:

- `TREQ-VISO-013` para la ruta mensual y su protección;
- `TREQ-VISO-024` para meses de 28, 29, 30 y 31 días;
- `TREQ-VISO-025` para una sola fuente Semana/Mes;
- `TREQ-VISO-026` para preview reactivo actual/propuesto/proyectado;
- `TREQ-VISO-027` para conservar datos por bloque;
- `TREQ-VISO-028` para pertenencia única y movimiento explícito de fecha;
- `TREQ-VISO-029` para máximo de bloques equivalente entre cliente y servidor;
- `TREQ-VISO-030` para horario, pausas y overnight válidos;
- `TREQ-VISO-031` para política de descanso visible;
- `TREQ-VISO-032` para límite exacto, versionado y auditable;
- `TREQ-VISO-033` para total mensual multisedes sin ampliar detalle visible;
- `TREQ-VISO-034` para una única política de warning y límite;
- `TREQ-VISO-035` para borrador sobre límite sin publicación;
- `TREQ-VISO-036` para política equivalente de publicación Semana/Mes;
- `TREQ-VISO-037` para separar guardar borrador y publicar;
- `TREQ-VISO-038` para recalcular conflictos en servidor;
- `TREQ-VISO-039` para concurrencia de publicaciones;
- `TREQ-VISO-040` para rollback;
- `TREQ-VISO-041` para eliminación masiva de borradores autorizados;
- `TREQ-VISO-042` para revalidación en servidor;
- `TREQ-VISO-043` para auditoría;
- `TREQ-VISO-044` para notificación idempotente hacia ANIMA;
- `TREQ-VISO-045` para bloquear manipulación de URL, formulario o Server Action.

La mención en esta sección es trazabilidad heredada y no una modificación de 04A.

---

#### 103. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-003`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en la rama documental local de `VISO-UX-003`. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, el owner del minibloque, la topología `PER_IMPLEMENTATION_UNIT`, el gate `POST_E5_PACKAGE`, `VPROC-0007`, `VSCREEN-0015`, los estados canónicos del proceso, `INT-WORK-001`, el delta mensual congelado, `VISO-SCH-001..008`, `VISO-ROUTE-045..049` y `061`, el Registro 04A aplicable y las superficies actuales de programación en `vento-viso/main`. |
| OPERATIVA | NOT_EXECUTED | No se creó, editó, publicó ni corrigió programación real; no se notificó a ANIMA ni se ejecutó una acción sobre trabajadores. |
| FÍSICA | NOT_EXECUTED | No se modificaron UI, Server Actions, contratos, Supabase, datos, migraciones ni despliegues; la materialización permanece por `implementation_unit_id` detrás de `POST_E5_PACKAGE`. |

---

#### 104. Criterios de aceptación

1. existe exactamente un contrato `VISO-PROGRAMACION-SECTION-001`;
2. la tarea conserva `VISO-UX-002` como anterior y `VISO-UX-004` como siguiente;
3. la topología permanece `PER_IMPLEMENTATION_UNIT`;
4. el gate físico permanece `POST_E5_PACKAGE`;
5. `Programación` es el segundo dominio administrativo definido por `VISO-UX-001`;
6. `VPROC-0007` permanece como proceso propietario;
7. `VSCREEN-0015` permanece como pantalla canónica principal;
8. `/staff/schedule` permanece como workspace principal observado;
9. `VISO-ROUTE-045`, `046`, `047`, `048`, `049` y `061` permanecen dentro de Programación;
10. las seis rutas conservan `CHILD_OR_DETAIL_ROUTE` heredado de `VISO-UX-002`;
11. Semana y Mes son horizontes del mismo dominio;
12. Semana y Mes consumen la misma programación autoritativa;
13. no existe una fuente mensual paralela;
14. no existe una fuente semanal paralela;
15. el selector Semana/Mes conserva contexto representable;
16. Mes usa solo fechas válidas de 28, 29, 30 o 31 días;
17. el cambio de año no produce fechas inválidas;
18. el contexto territorial permanece visible;
19. contexto visible no equivale a autoridad;
20. la vista semanal prioriza siete días y trabajadores programables;
21. la vista mensual prioriza edición masiva por trabajador;
22. el builder mensual soporta bloques plegables como patrón de experiencia;
23. un bloque plegado conserva resumen suficiente;
24. una fecha movida entre bloques se comunica explícitamente;
25. la modalidad rápida no elimina silenciosamente fechas;
26. rol y área permanecen dimensiones diferenciadas;
27. horarios inválidos producen estado comprensible;
28. overnight y descansos se rigen por `VISO-SCH-003`;
29. el máximo de bloques se rige por `VISO-SCH-003`;
30. `12` no se canoniza desde esta tarea;
31. `174 h` no se canoniza desde esta tarea;
32. `186 h` no se canoniza desde esta tarea;
33. warning y límite provienen de una política única;
34. la UI puede mostrar actual, nuevas y proyectado;
35. el total multisedes no amplía detalle visible;
36. guardar borrador y publicar son acciones distintas;
37. un borrador sobre límite no se presenta como publicable;
38. publicación semanal y mensual comparten semántica contractual;
39. `PUBLISHED` no se presenta como ejecución actual por definición;
40. publicación y notificación permanecen separadas;
41. una publicación produce un resultado identificable;
42. la notificación a ANIMA no se afirma sin evidencia;
43. los ocho estados canónicos de `VPROC-0007` permanecen representables;
44. una corrección no sobrescribe historia;
45. conflictos se muestran antes de guardar o publicar cuando son detectables;
46. el servidor sigue siendo decisorio sobre conflictos materiales;
47. el color no sustituye explicación;
48. stale state y concurrencia se contemplan;
49. no se usa `last write wins` silencioso;
50. eliminación masiva no se presenta como operación irrestricta;
51. `/staff/schedule/global` no crea wildcard territorial;
52. `/staff/calendar` permanece contextual y no fuente de turnos;
53. los eventos de otros owners en calendario no transfieren ownership;
54. `/staff/schedule/metrics` permanece secundario;
55. la tarea no canoniza rankings ni premios laborales;
56. programado, asistido, trabajado y reconciliado permanecen distintos;
57. `/staff/schedule/settings` permanece configuración avanzada;
58. configuración no crea políticas locales divergentes;
59. disponibilidad no equivale a programación;
60. preferencia no equivale a disponibilidad obligatoria;
61. sugerencia no equivale a publicación;
62. ANIMA no se convierte en editor competidor;
63. Personal no edita turnos localmente;
64. Organización conserva ownership de sedes y áreas;
65. Acceso y seguridad conserva ownership de permisos y matrices;
66. Auditoría conserva investigación histórica profunda;
67. Operación no obtiene autoridad por consumir contexto de turno;
68. deep links revalidan autoridad;
69. URLs no contienen datos sensibles innecesarios;
70. la experiencia funciona en escritorio, tablet y móvil;
71. móvil conserva acciones críticas;
72. bloques plegables exponen semántica accesible;
73. estados dinámicos no dependen solo de color;
74. estados `LOADING`, `EMPTY`, `NO_AUTHORITY`, `NO_TERRITORY`, `NO_WORKERS`, `NO_SCHEDULE`, `ERROR` y `STALE` no se confunden;
75. un error de consulta no se presenta como dataset vacío;
76. una URL o formulario manipulados no amplían alcance;
77. `requireStaffScheduleAccess` no se declara permiso suficiente de escritura por esta tarea;
78. el delta mensual continúa congelado hasta sus gates propietarios;
79. `CODE-AUD-021` no se declara cerrado;
80. `AUTH-UI-061` no se declara cerrado;
81. `VISO-SCH-001..008` no se declaran aprobadas desde esta tarea;
82. las rutas no se crean ni retiran;
83. las identidades `VISO-ROUTE-*` no se renumeran;
84. no se crea un sidebar paralelo;
85. las vistas secundarias no compiten con Semana/Mes;
86. toda acción masiva muestra alcance suficiente;
87. una preferencia o filtro no se convierte en autoridad;
88. simulación no ejecuta mutaciones reales;
89. dispositivo compartido no se convierte en actor;
90. no se crean requisitos de prueba;
91. no se modifican requisitos de prueba;
92. no se modifica 04A;
93. la cobertura vigente se referencia fuera de la sección de cero cambios;
94. no se realizan cambios físicos desde esta tarea documental.

---

#### 105. Límites

Esta tarea no:

- modifica `vento-viso`;
- modifica `/staff/calendar`;
- modifica `/staff/schedule`;
- modifica `/staff/schedule/global`;
- modifica `/staff/schedule/metrics`;
- modifica `/staff/schedule/settings`;
- modifica `/staff/schedule/month`;
- crea rutas;
- elimina rutas;
- renumera `VISO-ROUTE-*`;
- modifica navegación runtime;
- modifica `app_navigation_items`;
- modifica `app_screen_registry`;
- crea componentes;
- cambia `ScheduleViewSwitch`;
- cambia `MonthlyShiftBuilder`;
- fija el componente físico final;
- crea tablas;
- crea vistas;
- crea funciones o RPC;
- crea triggers;
- crea migraciones;
- modifica RLS;
- modifica grants;
- modifica Auth;
- modifica Storage;
- modifica Realtime;
- modifica datos;
- crea turnos reales;
- edita turnos reales;
- elimina turnos reales;
- publica turnos reales;
- corrige turnos reales;
- crea asistencia;
- corrige asistencia;
- notifica a ANIMA;
- cambia sedes;
- cambia áreas;
- asigna roles;
- concede permisos;
- aprueba `VISO-SCH-001` a `VISO-SCH-008`;
- ejecuta `CODE-AUD-021`;
- ejecuta `AUTH-UI-061`;
- aprueba `12` como máximo canónico de bloques;
- aprueba `174 h` como warning canónico;
- aprueba `186 h` como límite canónico;
- aprueba overnight;
- aprueba política de descansos;
- define permisos atómicos de escritura;
- sustituye `VISO-UX-013` a `VISO-UX-020`;
- selecciona package;
- autoriza una instancia física;
- ejecuta una instancia física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

---

#### 106. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-002 — Crear sección Personal`

**TAREA ACTUAL APROBADA**
`VISO-UX-003 — Crear sección Programación`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-004 — Crear sección Acceso y seguridad`
### ✅ VISO-UX-004 — Crear sección Acceso y seguridad

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-003 — Crear sección Programación
**Tarea siguiente:** VISO-UX-005 — Crear sección Organización
**Tipo de tarea:** definición técnico-documental de la sección administrativa `Acceso y seguridad` de VISO; compone en una experiencia coherente los contratos aprobados de roles base y operativos, matrices de permisos, elegibilidad territorial, perfiles y asignaciones, preview contextual, simulación, procedencia, conflictos, excepciones, gobierno de dispositivos compartidos, auditoría de seguridad, solicitudes y certificaciones de acceso y exporte controlado de matriz, sin crear una segunda fuente de autorización y conservando `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la sección `Acceso y seguridad` definido; su materialización runtime permanece pendiente por `implementation_unit_id` y detrás del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, rutas, navegación runtime, componentes, catálogos de autorización, contratos compartidos, permisos, grants, denies, perfiles, asignaciones, dispositivos, Supabase, datos, migraciones, RLS, RPC, Auth, secretos, sesiones, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la sección administrativa `Acceso y seguridad` de VISO para que una persona autorizada pueda comprender, revisar y gobernar el acceso de Vento OS sin confundir catálogo, configuración, contexto, simulación, decisión efectiva, auditoría o navegación.

La sección debe responder de forma directa:

```text
¿QUÉ ROLES Y PERMISOS CANÓNICOS EXISTEN?
¿QUÉ CONCESIONES BASE Y OPERATIVAS ESTÁN CONFIGURADAS?
¿QUÉ SEDE, ÁREA, PERFIL O TURNO PARTICIPAN EN EL CONTEXTO?
¿QUÉ ACCESO EFECTIVO TENDRÍA ESTE TRABAJADOR?
¿DE DÓNDE PROVIENE CADA PERMISO O DENEGACIÓN?
¿EXISTE UN CONFLICTO REAL DE CONFIGURACIÓN?
¿HAY UNA EXCEPCIÓN INDIVIDUAL Y CUÁNDO VENCE?
¿QUÉ DISPOSITIVO COMPARTIDO PARTICIPA Y CON QUÉ LÍMITES?
¿QUIÉN PUEDE ADMINISTRAR ESTE CAMBIO?
¿QUÉ CAMBIÓ, QUIÉN LO HIZO Y QUÉ RESULTADO PRODUJO?
```

`Acceso y seguridad` no es una colección de switches de permisos ni una pantalla que traduzca el nombre de un rol en autoridad.

Es la experiencia administrativa de gobierno del acceso que consume los contratos canónicos de autorización y el proceso `VPROC-0059` sin reemplazarlos.

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001` entrega sin reapertura:

```text
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
```

Para `Acceso y seguridad` entrega además:

- administración de roles, permisos, matrices, simulación permitida, dispositivos y configuración administrativa de acceso;
- prohibición de interpretar visibilidad de navegación como autorización;
- navegación data-driven sin wildcard por dominio;
- clasificación de `/roles-permissions` y `/app-navigation` como superficies candidatas de esta sección;
- conservación de las identidades `VISO-ROUTE-*` existentes;
- obligación de mantener handoffs protegidos en vez de duplicar ownership.

Se conserva expresamente:

```text
ACCESS_SECTION_VISIBLE
!=
ALL_SECURITY_ACTIONS_ALLOWED
```

Esta tarea desarrolla el contenido del tercer dominio sin reabrir la arquitectura de primer nivel.

---

#### 3. Handoff recibido de `VISO-UX-002`

`VISO-UX-002` entrega a `Acceso y seguridad` la responsabilidad experiencial sobre la creación y gobierno posterior de dispositivos compartidos que hoy aparece físicamente dentro de la familia `/staff*`.

La identidad observada preservada es:

```text
VISO-ROUTE-050
/staff/shared-devices/new
```

Su clasificación objetivo dentro de esta arquitectura es:

```text
canonical_domain = Acceso y seguridad
navigation_class = CHILD_OR_DETAIL_ROUTE
```

La ubicación física bajo `/staff` no convierte el dispositivo en contenido de `Personal`.

`Personal` puede mostrar relaciones de acceso de un trabajador y enlazar a esta sección, pero no se convierte en editor paralelo de seguridad.

---

#### 4. Handoff recibido de `VISO-UX-003`

`VISO-UX-003` conserva una frontera explícita:

```text
Programación
→ consume roles operativos, sedes, áreas, perfiles y decisiones de autorización
→ no administra la fuente de esos contratos
```

Por tanto:

- `Programación` puede seleccionar un rol operativo elegible para un turno;
- puede mostrar que un rol o área son incompatibles;
- puede consumir una evaluación autorizativa o de contexto;
- puede bloquear una publicación por validaciones propietarias;
- no puede conceder un permiso;
- no puede crear un rol canónico;
- no puede ampliar el territorio del administrador;
- no puede convertir un perfil de planificación en autoridad.

La administración de esos contratos permanece en `Acceso y seguridad` y en sus tareas propietarias `VISO-AUTH-*`.

---

#### 5. Topología y gate

La tarea conserva:

```text
TASK_ID = VISO-UX-004
SEQUENCE_ID = PHASE-09-VISO-COMPLETE
WORK_MODE = PER_IMPLEMENTATION_UNIT
PHYSICAL_INSTANCE_IDENTITY = <task_id>::<implementation_unit_id>
EXECUTION_GATE = POST_E5_PACKAGE
DOCUMENTARY_PHYSICAL_CHANGES = 0
```

La definición documental no autoriza ninguna instancia física.

Cada futura materialización deberá resolver su `implementation_unit_id`, package y gate correspondiente antes de tocar UI, rutas, datos, autorización o Supabase.

---

#### 6. Contrato raíz de la sección

Se define:

```text
VISO_ACCESO_SEGURIDAD_SECTION_CONTRACT = VISO-ACCESO-SEGURIDAD-SECTION-001
DOMAIN_LABEL = Acceso y seguridad
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-037
PRIMARY_OBSERVED_ROUTE = /roles-permissions
PRIMARY_CANONICAL_SCREEN = VSCREEN-0019
PRIMARY_CANONICAL_PROCESS = VPROC-0059
PRIMARY_CANONICAL_STEP = VPROC-0059::STEP-MAINTAIN_ACCESS_CATALOG
PRIMARY_INTENT = ACCESS_AND_SECURITY_GOVERNANCE
TREQ_CHANGES = 0
```

`PRIMARY_OBSERVED_ROUTE` identifica la superficie física existente más cercana al propósito principal.

No implica que su implementación AS-IS satisfaga el contrato canónico ni que todas las capacidades del dominio deban materializarse en una única URL.

---

#### 7. Regla cardinal de autoridad

Toda la experiencia se subordina a:

```text
INTERFAZ
!=
AUTORIDAD
```

```text
ROL VISIBLE
!=
PERMISO EFECTIVO
```

```text
PERMISO MOSTRADO
!=
PERMISO CONCEDIDO
```

```text
NAVEGACIÓN VISIBLE
!=
AUTORIZACIÓN
```

```text
SIMULACIÓN ALLOW
!=
AUTORIDAD REAL
```

La sección explica y administra configuración mediante operaciones autorizadas.

La decisión efectiva sigue perteneciendo al modelo canónico de autorización, evaluado en servidor con identidad, actor, permiso exacto, carril, territorio, recurso, contexto, vigencia, denegaciones y demás condiciones contractuales.

---

#### 8. Proceso propietario

El proceso canónico es:

```text
VPROC-0059
Gestionar el ciclo de acceso tecnológico desde solicitud hasta revocación y verificación
```

`Acceso y seguridad` no reduce ese ciclo a una tabla de permisos.

La sección debe poder representar configuración permanente, decisiones, solicitudes, revisiones, aprovisionamiento, vigencia, revocación, dispositivos, evidencia y auditoría sin fundir sus significados.

---

#### 9. Estados de `VPROC-0059`

La experiencia deberá representar sin colapsar:

```text
ACCESS_REQUESTED
IDENTITY_VALIDATING
OWNER_APPROVAL_PENDING
SECURITY_REVIEW_PENDING
APPROVED
PROVISIONING_IN_PROGRESS
ACCESS_ACTIVE
PERIODIC_REVIEW_PENDING
DEPROVISIONING_IN_PROGRESS
ACCESS_LIFECYCLE_CLOSED
```

Cada estado conserva su verdad mínima.

En particular:

```text
APPROVED
!=
PROVISIONED
```

```text
PROVISIONING_IN_PROGRESS
!=
ACCESS_ACTIVE
```

```text
DEPROVISIONING_IN_PROGRESS
!=
ACCESS_LIFECYCLE_CLOSED
```

La UI no utilizará una etiqueta genérica `Activo/Inactivo` para borrar la diferencia entre solicitud, aprobación, disponibilidad efectiva, revisión y cierre.

---

#### 10. Pantallas canónicas principales

El dominio consume como núcleo cuatro pantallas canónicas ya registradas:

| Pantalla | Nombre | Paso principal | Rol de pantalla |
| --- | --- | --- | --- |
| `VSCREEN-0019` | Catálogo de roles y permisos | `VPROC-0059::STEP-MAINTAIN_ACCESS_CATALOG` | `CONFIGURE` |
| `VSCREEN-0020` | Perfil de acceso del trabajador | `VPROC-0059::STEP-ASSIGN_EFFECTIVE_ACCESS` | `CONFIGURE` |
| `VSCREEN-0021` | Simulación de permisos y conflictos | `VPROC-0059::STEP-SIMULATE_ACCESS_DECISION` | `SIMULATE` |
| `VSCREEN-0022` | Gobierno de dispositivos compartidos | `VPROC-0059::STEP-GOVERN_SHARED_DEVICES` | `CONFIGURE` |

La existencia de estas identidades lógicas no autoriza inventar cuatro rutas físicas nuevas.

La materialización podrá resolver navegación interna, tabs, subviews o rutas existentes únicamente durante su instancia física propietaria y sin romper las identidades de pantalla.

---

#### 11. Pantalla de solicitudes y certificaciones

La sección reconoce además:

```text
VSCREEN-0114 = Solicitudes y certificaciones de acceso
VPROC-0059::STEP-REVIEW_AND_CERTIFY_ACCESS
ROLE = APPROVE
POSITION = DECISION
```

Esta pantalla completa la dimensión de ciclo de vida que no cabe en un catálogo o perfil individual.

Permite representar solicitud, aprobación, vigencia, revisión periódica y revocación sin confundir:

```text
CATÁLOGO
CONCESIÓN
SOLICITUD
APROBACIÓN
APROVISIONAMIENTO
ACCESO ACTIVO
REVISIÓN
REVOCACIÓN
```

No sustituye `VSCREEN-0019..0022`.

---

#### 12. Familias administrativas consumidas

La sección compone las familias:

| Familia | Propósito dentro del dominio |
| --- | --- |
| `ADM-TASK-018` | gestionar catálogos de roles base y operativos |
| `ADM-TASK-019` | gestionar permisos, alcances, denegaciones y matrices por rol |
| `ADM-TASK-020` | asignar perfiles, sedes y áreas permitidas a trabajadores |
| `ADM-TASK-021` | gobernar excepciones individuales, delegaciones, vigencias y revocaciones |
| `ADM-TASK-022` | simular acceso efectivo, explicar procedencia y resolver conflictos |
| `ADM-TASK-023` | gobernar dispositivos compartidos durante su ciclo autorizado |
| `ADM-TASK-024` | revisar auditoría de seguridad y exportar la matriz cuando exista capacidad autorizada |

Estas familias son intenciones administrativas.

No crean permisos, rutas, tablas ni operaciones físicas por sí mismas.

---

#### 13. Arquitectura interna del dominio

La experiencia se organiza conceptualmente en siete áreas internas:

```text
1. Resumen de acceso
2. Roles y matrices
3. Personas y asignaciones
4. Simulación y conflictos
5. Excepciones y solicitudes
6. Dispositivos compartidos
7. Auditoría y exporte
```

Son áreas de experiencia del mismo dominio.

No son siete dominios de navegación primaria ni siete fuentes de autorización.

---

#### 14. Resumen de acceso

La entrada al dominio deberá priorizar situación y riesgo antes que densidad técnica.

Puede resumir, dentro del alcance autorizado:

- configuraciones pendientes de revisión;
- accesos en solicitud o aprobación;
- conflictos bloqueantes conocidos;
- excepciones próximas a vencer;
- revisiones periódicas pendientes;
- dispositivos suspendidos o con atención requerida;
- cambios recientes relevantes;
- enlaces hacia matrices, perfiles, simulación y auditoría.

No podrá mostrar un contador global de seguridad si el actor no está autorizado para observar su población completa.

Una cifra agregada nunca amplía el territorio visible.

---

#### 15. Disposición de rutas observadas

La tarea fija la siguiente clasificación objetivo sin ejecutar movimiento físico:

| Route ID | Ruta observada | Tratamiento de experiencia | Regla |
| --- | --- | --- | --- |
| `VISO-ROUTE-037` | `/roles-permissions` | `VISO_DOMAIN_ENTRY` objetivo | entrada física observada más cercana al catálogo y matrices; debe evolucionar hacia el contrato canónico sin conservar autoridad legacy |
| `VISO-ROUTE-005` | `/app-navigation` | `CHILD_OR_DETAIL_ROUTE` de configuración relacionada | administra descubribilidad y agrupación de navegación, nunca concede autoridad |
| `VISO-ROUTE-050` | `/staff/shared-devices/new` | `CHILD_OR_DETAIL_ROUTE` | alta observada de dispositivo; no representa por sí sola el ciclo completo de gobierno |

La clasificación anterior es semántica de destino.

No elimina, renombra ni mueve físicamente ninguna ruta desde esta tarea documental.

---

#### 16. `VISO-ROUTE-037 — /roles-permissions`

Esta ruta es la entrada física observada más cercana a `VSCREEN-0019`.

Su propósito objetivo será conducir al administrador hacia:

- catálogos canónicos de roles;
- matrices base y operativas;
- scopes admitidos;
- relaciones territoriales;
- permisos exactos;
- explicación de restricciones;
- preview o simulación antes de cambios sensibles cuando corresponda;
- trazabilidad de la operación administrativa.

La implementación actual se considera evidencia AS-IS.

No se certifica como implementación final únicamente porque ya permita agregar o quitar filas de permisos.

---

#### 17. `VISO-ROUTE-005 — /app-navigation`

`/app-navigation` pertenece a la experiencia de administración relacionada con acceso porque muestra qué superficies se ofrecen y qué permiso declarado condiciona su presencia.

Sin embargo:

```text
required_permission_code EN NAVEGACIÓN
!=
DECISIÓN DE AUTORIZACIÓN
```

La configuración de navegación puede:

- agrupar entradas;
- ordenar entradas;
- activar o desactivar exposición del menú dentro de su contrato;
- vincular una entrada con un permiso declarado.

No puede:

- crear una `PermissionKey`;
- conceder un grant;
- borrar un deny;
- ampliar scope;
- fabricar una capability inexistente;
- convertir una ruta en autorizada por hacerla visible.

---

#### 18. `VISO-ROUTE-050 — /staff/shared-devices/new`

La ruta observada conserva su identidad estable y pasa a ser tratada como detalle de `Acceso y seguridad`.

Su existencia demuestra únicamente una superficie de alta.

La experiencia completa de `VSCREEN-0022` deberá cubrir el ciclo autorizado de dispositivo y no podrá reducirse a:

```text
CREATE DEVICE
=
GOVERN DEVICE
```

La creación es una etapa del gobierno del dispositivo, no el contrato completo.

---

#### 19. Superficies `/operations*` con contenido de seguridad

El runtime actual contiene capacidades relacionadas con seguridad bajo rutas de la familia `/operations*`, entre ellas superficies de matriz rol/sede y preview.

Se conserva la clasificación de navegación recibida de `VISO-UX-001`:

```text
/operations*
→ candidata a dominio Operación
→ detalle final reservado a VISO-UX-006
```

`VISO-UX-004` no renumera ni reclasifica físicamente esas rutas.

Lo que sí fija es la propiedad semántica de los contratos de autorización:

```text
MATRIZ DE SEGURIDAD CANÓNICA
SIMULACIÓN CANÓNICA
PROCEDENCIA
CONFLICTOS
→ Acceso y seguridad
```

Una superficie transitoria en `Operación` no adquiere una segunda fuente de verdad por su ubicación.

---

#### 20. `/operations/site-roles` como transición

La superficie observada `/operations/site-roles` puede representar parte de la configuración rol × sede × área.

Hasta su reconciliación física:

- no se crea un segundo editor equivalente dentro de `Acceso y seguridad`;
- no se declara el AS-IS como contrato definitivo;
- no se retira la ruta;
- no se pierde acceso existente todavía requerido;
- cualquier futura consolidación deberá conservar datos, autorización, auditabilidad y rollback;
- `VISO-UX-006`, `VISO-UX-017` y `VISO-UX-018` conservan el tratamiento posterior de ruta, duplicidad y handoff.

---

#### 21. `/operations/preview` como transición

La superficie observada `/operations/preview` muestra una vista construida a partir de matrices físicas existentes.

No se declara equivalente a `VISO-AUTH-013` ni a `VISO-AUTH-014` únicamente por usar la palabra preview o simulación.

El contrato canónico exige distinguir:

```text
PREVIEW CONTEXTUAL
→ describe contexto actual o propuesto

SIMULACIÓN DE AUTORIZACIÓN
→ evalúa permisos exactos mediante contrato de simulación
```

Una lista calculada en UI a partir de una matriz observada no sustituye `SimulatedAuthorizationDecisionV1` ni puede otorgar autoridad.

---

#### 22. Catálogo de roles base

La sección consume el catálogo administrativo aprobado de exactamente ocho roles base vigentes.

La experiencia deberá mantenerlos separados de:

- roles operativos;
- permisos;
- sedes;
- áreas;
- dispositivos;
- usuarios técnicos;
- oficios legacy;
- aliases locales.

El código canónico es la identidad.

La etiqueta humana es presentación.

La posición visual no define jerarquía autorizativa.

---

#### 23. Catálogo de roles operativos

La sección consume el catálogo administrativo aprobado de exactamente doce roles operativos vigentes.

El rol operativo representa función temporal dentro de contexto válido.

Se conserva:

```text
ROL OPERATIVO CATALOGADO
!=
ROL OPERATIVO ASIGNADO
!=
ROL OPERATIVO EFECTIVO
!=
PERMISO
```

La experiencia podrá mostrar familia, uso y restricciones sin transformar esa información en concesión.

---

#### 24. Matriz de permisos por rol base

La matriz base deberá mostrar de forma administrable:

- rol base canónico;
- permiso canónico exacto;
- modalidad;
- scope admitido;
- territorio cuando aplique;
- condición y vigencia cuando correspondan;
- estado de la configuración;
- procedencia de la configuración;
- impacto esperado antes de mutar cuando el flujo lo exija.

Ausencia de grant no se presentará automáticamente como deny explícito.

No existe un `manage all permissions` implícito.

---

#### 25. Matriz de permisos por rol operativo

La matriz operativa permanece separada de la matriz base.

La UI no unifica ambas en una tabla que oculte el carril de procedencia.

Cada concesión deberá conservar:

- `OperationalRoleCode` exacto;
- `PermissionKey` exacta;
- modalidad compatible;
- scope compatible;
- restricciones contextuales;
- evidencia de configuración.

Un rol operativo no recibe permisos por pertenecer a una familia funcional.

---

#### 26. Elegibilidad rol × sede

La relación rol operativo × sede expresa elegibilidad de configuración.

No significa:

```text
ROL ELEGIBLE EN SEDE
=
TRABAJADOR ASIGNADO
```

ni:

```text
ROL ELEGIBLE EN SEDE
=
PERMISO EFECTIVO
```

La experiencia deberá mostrar el carácter territorial de la relación y evitar lenguaje de concesión final.

---

#### 27. Elegibilidad rol × área

La relación rol operativo × área está subordinada a su sede válida.

La UI deberá preservar los estados contractuales cuando apliquen:

```text
EXACT_BINDING
AREA_BINDING_UNRESOLVED
NO_AREA_NOT_REQUIRED
```

`NO_AREA_NOT_REQUIRED` no es wildcard.

`AREA_BINDING_UNRESOLVED` no autoriza inferir un área.

---

#### 28. Perfil operativo por trabajador

El perfil operativo es configuración habitual de planificación.

Puede proponer valores predeterminados permitidos, pero no concede autoridad.

Se conserva:

```text
PERFIL
!=
ASIGNACIÓN TERRITORIAL
!=
ROL DE TURNO
!=
PERMISO
```

La experiencia deberá indicar cuándo un perfil está completo, incompleto, inactivo o incompatible sin completar silenciosamente el dato faltante.

---

#### 29. Sedes asignadas al trabajador

La asignación trabajador × sede expresa relación laboral o administrativa autorizada.

No concede por sí misma una capacidad.

La UI deberá diferenciar:

- sede primaria;
- sedes adicionales asignadas;
- vigencia de la relación;
- estado activo o terminado;
- territorio que puede llegar a ser elegible para una operación;
- permiso efectivo finalmente evaluado.

Una sede primaria no sustituye la sede de un turno ni una sede de alcance autorizativo.

---

#### 30. Áreas asignadas al trabajador

La asignación trabajador × área expresa afiliación habitual cuando el contrato la usa.

No se presenta como requisito universal ni como área operativa efectiva.

La experiencia deberá mostrar su sede padre y evitar cualquier área huérfana o traslado implícito entre sedes.

---

#### 31. Rol operativo del turno

La sección reconoce que el rol operativo de un turno se administra en coordinación con `Programación`, pero su semántica de autorización proviene del contrato aprobado.

No se permite completar un turno laboral mediante fallback desde:

- rol base;
- perfil;
- default;
- único rol visible;
- historial;
- área habitual;
- selección previa de UI.

El rol del turno debe ser explícito cuando el contrato lo exige.

---

#### 32. Validación de turno sin rol

Un turno laboral sin rol operativo requerido es una configuración incompleta.

La sección deberá permitir entender:

- qué turno está afectado;
- por qué falta el rol;
- qué dato debe corregirse;
- si el defecto bloquea publicación;
- qué propietario resuelve la configuración.

No sugerirá cambiar el rol base del trabajador para reparar un turno.

---

#### 33. Validación de área incompatible

Un turno con rol presente puede continuar bloqueado por incompatibilidad territorial.

La experiencia deberá conservar el orden lógico:

```text
ROL VÁLIDO
→ SEDE VÁLIDA
→ ÁREA PRESENTE O AUSENCIA PERMITIDA
→ ÁREA EXISTE Y ESTÁ ACTIVA
→ ÁREA PERTENECE A LA SEDE
→ BINDING EXACTO ROL × SEDE × ÁREA
```

No se inferirá el área desde perfil, afiliación habitual, dispositivo o último turno.

---

#### 34. Perfil de acceso del trabajador

`VSCREEN-0020` será la superficie lógica para comprender el acceso de un trabajador concreto.

Debe componer, según autorización:

- identidad laboral mínima necesaria;
- rol base;
- sedes asignadas;
- áreas asignadas cuando existan;
- perfiles operativos;
- roles operativos elegibles;
- grants individuales;
- denies aplicables;
- excepciones y vigencias;
- contexto de turno cuando corresponda;
- estado de solicitudes o revisión;
- resultado de preview y enlaces de simulación.

No debe presentar todo lo anterior como una única “lista de permisos”.

---

#### 35. Vista previa trabajador × sede × área × turno

El preview canónico de `VISO-AUTH-013` describe una combinación concreta y justificable.

Puede comparar:

```text
ESTADO ACTUAL
ESTADO PROPUESTO
```

sin persistir la propuesta.

El preview no produce una decisión autorizativa.

Antes de guardar, la operación propietaria debe revalidar actor, permiso, datos, territorio y cambios concurrentes en servidor.

---

#### 36. Simulador de permisos efectivos

`VSCREEN-0021` deberá invocar la semántica de simulación aprobada.

La simulación:

- parte de un actor real autorizado para simular;
- conserva contexto real de referencia;
- construye un contexto hipotético separado;
- evalúa permisos exactos mediante el contrato de simulación;
- devuelve resultado hipotético;
- no modifica sesión real;
- no modifica grants;
- no modifica asignaciones;
- no modifica turnos;
- no modifica datos empresariales.

Se conserva:

```text
SIMULATED ALLOW
!=
REAL ALLOW
```

---

#### 37. Indicador persistente de simulación

Mientras exista un escenario simulado, la UI deberá mostrar un indicador persistente y comprensible.

Ese estado no podrá depender únicamente de color.

Acciones con efecto real no podrán reutilizar automáticamente el resultado simulado como autorización.

Salir de simulación debe eliminar la proyección hipotética de la experiencia sin alterar el estado real.

---

#### 38. Origen de cada permiso

La procedencia explica una decisión ya evaluada.

La sección deberá poder mostrar, cuando la evidencia exista:

- permiso exacto;
- decisión;
- carril;
- grants coincidentes;
- denies aplicables;
- scope;
- territorio;
- restricción de dispositivo cuando participe;
- versiones contractuales relevantes;
- plano real o simulado.

No se permite resumir siempre:

```text
Tiene permiso por su rol
```

si la procedencia real es más compleja.

---

#### 39. Procedencia no es reevaluación

La interfaz no reconstruirá autoridad leyendo por separado tablas de roles, perfiles y excepciones.

Se conserva:

```text
PROCEDENCIA
→ explica una decisión

PROCEDENCIA
!=
SEGUNDO EVALUADOR
```

Si no existe evidencia suficiente, la UI deberá indicar que la procedencia autoritativa no puede reconstruirse, no inventarla.

---

#### 40. Conflictos de configuración

La sección deberá distinguir:

```text
CONFLICTO REAL
REDUNDANCIA
DENY VÁLIDO
DEFAULT DENY
CONFIGURACIÓN INCOMPLETA
DEUDA LEGACY
FALLO TÉCNICO
```

No todos los estados negativos son conflicto.

Un conflicto real existe cuando configuraciones o contrato canónico no pueden coexistir válidamente dentro del mismo snapshot aplicable.

---

#### 41. Conflicto no equivale a deny

Un deny válido puede coexistir con grants candidatos y producir una decisión final denegada sin constituir conflicto de configuración.

La UI deberá mostrar la procedencia del deny y reservar la etiqueta de conflicto para una incompatibilidad contractual real.

---

#### 42. Conflictos antes de guardar

Cuando el conflicto sea detectable antes de una mutación, la experiencia deberá mostrar:

- elemento afectado;
- regla incompatible;
- alcance;
- severidad;
- efecto sobre la propuesta;
- propietario de resolución;
- si bloquea o solo advierte;
- acción segura disponible.

Un conflicto bloqueante no se supera mediante confirmación genérica de UI.

---

#### 43. Excepciones individuales

Las excepciones son configuraciones explícitas y limitadas para una persona concreta.

No se utilizarán para:

- reconstruir una matriz incompleta;
- copiar todos los permisos de otro rol;
- corregir una sede incompatible;
- corregir un área incompatible;
- crear una PermissionKey inexistente;
- saltar segregación de funciones;
- otorgar autoridad al dispositivo.

---

#### 44. Experiencia de excepción

Una excepción deberá mostrar, según su contrato:

- sujeto exacto;
- permiso exacto;
- efecto solicitado;
- scope;
- territorio;
- motivo;
- vigencia;
- solicitante;
- aprobador requerido;
- estado;
- efecto simulado cuando corresponda;
- conflictos;
- auditoría;
- acción de suspensión o revocación disponible según autoridad.

No existe excepción “permanente por comodidad” sin la vigencia y gobierno que exija el contrato.

---

#### 45. Autoridad para administrar seguridad

La capacidad de ver el dominio no concede capacidad de mutación.

La sección deberá evaluar operaciones administrativas atómicas y exactas.

Se prohíbe crear por UX un permiso genérico equivalente a:

```text
manage all security
```

La autoridad de cada acción se resuelve mediante el catálogo vigente y sus contratos.

---

#### 46. Rol privilegiado no equivale a bypass

Se conserva:

```text
role = propietario
!=
BYPASS
```

```text
role = gerente_general
!=
BYPASS
```

```text
role = gerente
!=
SECURITY_ADMIN_GLOBAL
```

El nombre del rol puede participar en un grant canónico, pero no reemplaza el permiso exacto ni el scope.

---

#### 47. Segregación de funciones

La experiencia deberá impedir que una interfaz densa convierta en equivalentes operaciones que tienen autoridades distintas.

Deben permanecer distinguibles, cuando existan contractualmente:

```text
VER
PROPONER
APROBAR
CONCEDER
SUSPENDER
REVOCAR
SIMULAR
AUDITAR
EXPORTAR
```

La autoridad para auditar no concede mutación.

La autoridad para mutar un grant no concede el permiso objetivo que se está administrando.

---

#### 48. Reautenticación y controles reforzados

Cuando el contrato propietario de una acción sensible requiera reautenticación, segregación, aprobación o confirmación reforzada, la experiencia deberá integrarlas explícitamente.

`VISO-UX-004` no crea una regla de reautenticación nueva ni decide qué operaciones la exigen.

Solo prohíbe omitir un gate que el contrato vigente requiera.

---

#### 49. Cambio de seguridad como operación explicable

Antes de una mutación sensible, la UI deberá mostrar un resumen suficiente de:

```text
ANTES
CAMBIO PROPUESTO
DESPUÉS ESPERADO
SUJETO
PERMISO O RELACIÓN
SCOPE / TERRITORIO
VIGENCIA
CONFLICTOS
AUTORIDAD REQUERIDA
```

La densidad exacta dependerá del tipo de operación.

No se exige mostrar información que el actor no está autorizado a conocer.

---

#### 50. Resultado de una mutación

Una operación de seguridad exitosa deberá producir un resultado comprensible que permita identificar:

- qué cambió;
- sobre qué sujeto o configuración;
- desde cuándo;
- qué quedó vigente;
- qué quedó pendiente;
- qué evidencia o auditoría se generó;
- qué debe revisarse después.

Un toast “Guardado” sin contexto no es suficiente para una acción de alto impacto.

---

#### 51. Dispositivos compartidos

`VSCREEN-0022` gobierna el ciclo administrativo de dispositivos compartidos.

La experiencia deberá mantener separados:

```text
PRINCIPAL TÉCNICO DEL DISPOSITIVO
ACTOR HUMANO EFECTIVO
SEDE
ÁREA
PLANTILLA / CAPACIDADES DEL DISPOSITIVO
PERMISOS DEL ACTOR
```

La autoridad efectiva en dispositivo compartido no puede exceder la intersección permitida por dispositivo y actor.

---

#### 52. Ciclo de dispositivo compartido

La experiencia de dispositivo no termina en la creación.

Deberá poder representar, conforme a sus contratos propietarios:

- registro;
- activación;
- uso;
- cambio de actor;
- expiración cuando aplique;
- suspensión;
- rotación de credenciales cuando corresponda;
- revocación;
- retiro;
- evidencia y auditoría.

`VISO-ROUTE-050` AS-IS cubre solo una parte observable de ese ciclo.

---

#### 53. Dispositivo no es aprobador

Se conserva:

```text
DEVICE IDENTITY
!=
HUMAN AUTHORITY
```

Una plantilla de dispositivo puede restringir aplicaciones o acciones.

No puede conceder a una persona una capacidad que el actor no posee.

---

#### 54. `service_role` y cliente administrativo

La existencia de un cliente administrativo o `service_role` en una implementación no constituye autorización empresarial.

La UI no mostrará el acceso técnico interno como si fuera una capability administrativa concedida.

Toda mutación sigue necesitando decisión de negocio autorizada antes del efecto privilegiado.

---

#### 55. Solicitudes de acceso

Una solicitud de acceso deberá conservar como mínimo la separación entre:

```text
NECESIDAD SOLICITADA
IDENTIDAD VALIDADA
APROBACIÓN DEL PROPIETARIO
REVISIÓN DE SEGURIDAD
APROBACIÓN
APROVISIONAMIENTO
ACCESO ACTIVO
```

Registrar una solicitud no crea permiso, sesión ni acceso efectivo.

---

#### 56. Revisión periódica

`PERIODIC_REVIEW_PENDING` deberá presentarse como una obligación de recertificación o revisión, no como acceso automáticamente inválido ni automáticamente renovado.

La decisión posterior debe preservar:

- necesidad;
- propietario;
- uso;
- vigencia;
- evidencia de revisión;
- resultado aplicado.

---

#### 57. Revocación y cierre

La sección deberá representar revocación coordinada y verificable cuando el proceso o vínculo la exijan.

No se confunde:

```text
SOLICITAR REVOCACIÓN
INICIAR DEPROVISIONING
REVOCAR COMPONENTES
VERIFICAR RESIDUOS
CERRAR CICLO
```

El cierre no borra historia ni convierte un reingreso posterior en restauración automática de permisos antiguos.

---

#### 58. Auditoría de seguridad

La sección deberá ofrecer acceso contextual a la auditoría de seguridad aprobada en `VISO-AUTH-018`.

La auditoría permite responder:

- qué cambió o se intentó cambiar;
- sobre qué objeto;
- quién actuó;
- bajo qué autoridad;
- con qué territorio y contexto históricos;
- cuál era el estado anterior;
- cuál fue el estado posterior;
- cuál fue el resultado.

La auditoría es append-only desde la perspectiva de la experiencia administrativa.

---

#### 59. Frontera con el dominio `Auditoría`

`Acceso y seguridad` puede mostrar historial contextual del elemento que se administra y enlazar a una investigación más profunda.

`VISO-UX-007 — Crear sección Auditoría` conserva ownership sobre la experiencia transversal de investigación, correlación y revisión histórica amplia.

Se evita:

```text
AUDITORÍA CONTEXTUAL DE SEGURIDAD
=
SEGUNDO SISTEMA DE AUDITORÍA
```

---

#### 60. Exporte de matriz de acceso

El exporte definido por `VISO-AUTH-020` es una fotografía real, consistente y point-in-time de autoridad efectiva y procedencia.

No es:

- simulación;
- editor;
- fuente de permisos;
- historial de auditoría;
- mecanismo de reimportación.

La sección puede reservar su acción y mostrar su estado de disponibilidad.

---

#### 61. Exporte bloqueado por capacidad ausente

La tarea no inventa una PermissionKey de exportación.

Si el catálogo vigente no contiene la capacidad exacta propietaria de esa operación, la experiencia deberá mantener el exporte físicamente no ejecutable y explicar el bloqueo de forma segura.

Se conserva:

```text
UI BUTTON EXISTING
!=
EXPORT AUTHORIZED
```

---

#### 62. Formato del exporte

`VISO-UX-004` no fija XLSX, CSV, JSON ni otro formato como única serialización canónica.

La futura implementación deberá elegir una representación que preserve semántica, clasificación, volumen, seguridad y trazabilidad.

No se habilita reimportación desde el archivo exportado.

---

#### 63. Navegación interna

La sección deberá evitar convertir cada contrato de seguridad en una entrada de primer nivel.

La navegación interna puede usar:

- tabs;
- subnavegación;
- filtros;
- drawers;
- detail panels;
- deep links protegidos;
- enlaces contextuales desde Personal, Programación u Organización.

La elección física final se resuelve en implementación.

La semántica deberá conservarse aunque cambie el componente.

---

#### 64. Deep links

Un deep link puede preservar selectores como:

- trabajador;
- rol;
- permiso;
- sede;
- área;
- solicitud;
- dispositivo;
- snapshot o referencia de auditoría permitida.

Los selectores nunca transportan autoridad.

Al abrir el destino se revalidan sesión, actor, permiso, territorio, recurso, vigencia y demás contexto aplicable.

---

#### 65. URL y datos sensibles

Los deep links no incluirán innecesariamente:

- secretos;
- tokens;
- PIN;
- credenciales;
- hashes;
- payloads completos de autorización;
- datos personales sensibles;
- estructuras internas que permitan escalar o reconstruir seguridad.

Un identificador opaco tampoco convierte el destino en autorizado.

---

#### 66. Densidad guiada y experta

La sección debe aplicar divulgación progresiva.

Modo guiado prioriza:

- intención;
- sujeto;
- acción;
- alcance;
- impacto;
- conflictos;
- aprobación;
- resultado.

Modo experto puede exponer matrices densas, scopes y filtros necesarios para administración autorizada.

El modo experto no añade autoridad ni omite validaciones.

---

#### 67. Roles y permisos en modo experto

Las matrices extensas podrán ofrecer:

- búsqueda;
- filtros por aplicación;
- filtros por rol;
- filtros por permiso;
- filtros por modalidad;
- filtros por scope;
- filtros territoriales autorizados;
- agrupación comprensible;
- comparación antes/después.

No se utilizará una cuadrícula visual para ocultar datos contractuales esenciales de una relación.

---

#### 68. Configuración individual guiada

El perfil de acceso de un trabajador deberá ser preferentemente guiado para acciones individuales.

El administrador debe poder comprender la diferencia entre:

- relación laboral;
- sede asignada;
- área asignada;
- perfil operativo;
- rol de turno;
- grant individual;
- deny;
- excepción;
- permiso efectivo.

No se resumirá todo bajo una etiqueta ambigua “Rol y permisos”.

---

#### 69. Operaciones masivas

Cuando una implementación futura permita acciones masivas, la experiencia deberá mostrar antes de ejecutar:

- población objetivo;
- territorio;
- cambio exacto;
- exclusiones;
- conflictos;
- filas bloqueadas;
- autoridad requerida;
- resultado esperado.

Una acción masiva no transforma una capacidad individual en capacidad global.

---

#### 70. Alcance territorial

La sección consume el territorio canónico.

El scope visible debe corresponder al scope efectivo permitido para el actor.

Se prohíbe:

```text
FILTRO = Todas las sedes
→ AUTORIZACIÓN GLOBAL
```

Si el actor administra varias sedes, la experiencia muestra únicamente el universo permitido.

`VISO-UX-013` conserva la definición detallada de limitación visual según alcance territorial.

---

#### 71. Organización no es seguridad

`VISO-UX-005 — Crear sección Organización` conserva ownership sobre:

- empresas;
- marcas;
- establecimientos;
- sedes;
- áreas;
- zonas;
- relaciones organizativas.

`Acceso y seguridad` consume esas identidades para scopes, asignaciones y matrices.

No edita la estructura organizativa como efecto lateral de una configuración de permisos.

---

#### 72. Programación no es seguridad

`Programación` conserva ownership de la creación, revisión y publicación de turnos.

`Acceso y seguridad` define y explica las reglas de roles, áreas, perfiles y permisos que esos turnos deben respetar.

Una corrección de seguridad no reprograma turnos silenciosamente.

Una corrección de programación no concede permisos silenciosamente.

---

#### 73. Personal no es seguridad

`Personal` conserva el expediente laboral y los handoffs administrativos de la persona.

Puede enlazar al perfil de acceso del trabajador.

No administra grants o denies dentro del expediente como una copia local.

La vista de persona puede mostrar un resumen de acceso autorizado, pero la mutación pertenece a esta sección.

---

#### 74. Operación no es seguridad

`Operación` puede consumir rol operativo efectivo, territorio, dispositivo y permisos para ejecutar acciones empresariales.

No debe ofrecer un editor paralelo de la matriz canónica.

Las superficies legacy de configuración existentes dentro de `/operations*` permanecen transitorias hasta su reconciliación propietaria.

---

#### 75. SHELL y contratos compartidos

SHELL conserva las fundaciones compartidas de identidad, sesión, contexto, autorización, contratos y componentes transversales que le correspondan.

VISO administra el gobierno empresarial permitido sobre esas capacidades.

Se conserva:

```text
VISO ADMINISTRA
!=
VISO REDEFINE EL CONTRATO COMPARTIDO
```

La UI no escribe archivos versionados de contratos ni crea strings locales de permisos para resolver una necesidad visual.

---

#### 76. ANIMA

ANIMA no se convierte en consola de administración de seguridad.

Puede consumir contexto efectivo y mostrar al trabajador la información propia autorizada.

No puede:

- conceder permisos;
- editar matrices;
- aprobar excepciones;
- administrar dispositivos compartidos;
- modificar territorio de otros trabajadores.

---

#### 77. Onboarding y activación

La creación o activación de una persona no equivale a completar su seguridad.

Se mantiene la separación entre:

```text
IDENTIDAD
VÍNCULO LABORAL
ASIGNACIONES
APROBACIONES DE ACCESO
APROVISIONAMIENTO
ACCESO ACTIVO
```

La sección podrá recibir handoffs de incorporación y mostrar pendientes de seguridad sin convertir el onboarding en un grant automático.

---

#### 78. Offboarding y revocación

El retiro laboral debe coordinar el cierre de acceso conforme a los contratos propietarios.

`Acceso y seguridad` deberá permitir observar la revocación y sus residuos relevantes sin borrar:

- persona;
- vínculo histórico;
- programación histórica;
- asistencia;
- documentos sujetos a retención;
- auditoría.

Un reingreso posterior no reactiva automáticamente configuraciones anteriores.

---

#### 79. Permisos inexistentes o retirados

Una clave desconocida, inexistente o retirada no se presentará como “permiso que el usuario no tiene”.

La experiencia deberá fallar cerrada y distinguir, según contratos vigentes, error estructural de ausencia ordinaria de grant.

La UI no ofrecerá crear automáticamente la clave desde una matriz o ruta.

---

#### 80. Errores técnicos

Un timeout, dependencia caída o fuente no confiable no se convertirá en un deny empresarial inventado.

La experiencia debe distinguir:

```text
DENY DECIDIDO
CONFIGURACIÓN INCONSISTENTE
PERMISO NO REGISTRADO
FALLO TÉCNICO
```

El mensaje público será seguro y accionable sin revelar arquitectura sensible.

---

#### 81. Fail closed

Ante evidencia insuficiente para una mutación sensible:

```text
EJECUTAR = NO
```

La UI podrá conservar el trabajo no autoritativo permitido, mostrar qué falta y ofrecer recuperación segura.

No ejecutará usando un resultado stale, incompleto o reconstruido por fallback local.

---

#### 82. Concurrencia

Entre preview y guardado pueden cambiar:

- grants;
- denies;
- rol;
- asignaciones;
- territorio;
- turno;
- dispositivo;
- catálogo;
- versión contractual.

La operación propietaria deberá revalidar la autoridad y el estado relevante inmediatamente antes del efecto.

El preview no bloquea el mundo ni crea un lease de autorización salvo contrato explícito futuro.

---

#### 83. Estado stale

La experiencia deberá poder indicar que una vista o simulación quedó obsoleta.

Un resultado stale no puede reutilizarse como decisión vigente.

La recuperación es volver a resolver el contexto y la autorización, no ocultar el cambio.

---

#### 84. Confirmaciones

Una confirmación de seguridad no deberá usar texto genérico cuando el efecto sea material.

Debe identificar suficientemente:

- acción;
- sujeto;
- permiso o configuración;
- alcance;
- vigencia;
- consecuencia principal.

La confirmación no sustituye autorización server-side.

---

#### 85. Receipts y evidencia

Después de una operación autorizada, la experiencia deberá poder ofrecer una evidencia navegable o referencia segura hacia:

- resultado;
- actor;
- momento;
- configuración afectada;
- decisión de autorización correlacionable;
- evento de auditoría correspondiente cuando exista.

No se exponen secretos o payloads internos para demostrar trazabilidad.

---

#### 86. Búsqueda y filtros

La búsqueda debe ser un mecanismo de navegación dentro del universo ya autorizado.

Buscar por trabajador, rol, permiso, sede o dispositivo no amplía la población visible.

Un resultado cero puede significar cero coincidencias dentro del scope permitido; no se utilizará para inferir existencia de información fuera del territorio.

---

#### 87. Minimización

La sección mostrará la mínima información necesaria para tomar una decisión administrativa autorizada.

Por defecto no expondrá:

- secretos;
- tokens;
- credenciales;
- PIN;
- hashes;
- valores internos de sesión;
- datos personales no necesarios;
- dumps de tablas;
- payloads completos de evaluación cuando basta una explicación segura.

---

#### 88. Información sensible y masking

Masking visual no sustituye autorización ni minimización de payload.

Cuando un campo no está autorizado, deberá excluirse o protegerse en la capa propietaria correspondiente antes de depender de presentación.

La UI no cargará el modelo completo para después ocultarlo solamente con CSS.

---

#### 89. Accesibilidad

Las decisiones críticas no dependerán solo de:

- color;
- posición;
- icono sin etiqueta;
- hover;
- densidad visual.

Conflictos, denies, simulación, estados pendientes, riesgos y bloqueos deberán contar con texto o semántica accesible equivalente.

---

#### 90. Responsive

La sección deberá conservar capacidad administrativa en escritorio, tablet y móvil sin transformar móvil en una versión permisiva o incompleta.

En pantallas estrechas:

- las matrices pueden reflow a cards o detalle;
- filtros pueden plegarse;
- información avanzada puede usar disclosure;
- acciones críticas conservan contexto y confirmación;
- el estado de simulación permanece visible;
- el actor y territorio efectivos no desaparecen cuando son materialmente relevantes.

---

#### 91. Estados de experiencia

La sección deberá diferenciar al menos:

```text
LOADING
EMPTY
NO_AUTHORITY
NO_TERRITORY
NO_MATCHES
CONFLICT
STALE
TECHNICAL_FAILURE
PARTIAL_READ
READY
```

No se presentará `EMPTY` cuando la consulta falló.

No se presentará `NO_AUTHORITY` como error técnico.

No se presentará `CONFLICT` como deny ordinario.

---

#### 92. Operaciones sin autoridad

Una acción que el actor no puede ejecutar debe quedar ausente o claramente no ejecutable según el patrón UX aplicable.

La interfaz nunca dependerá de un botón deshabilitado como única defensa.

La llamada directa a Server Action, Route Handler, RPC u otro canal deberá producir una decisión equivalente.

---

#### 93. Navegación basada en autorización

El menú puede ocultar entradas que el actor no puede usar.

Eso mejora experiencia, no seguridad.

Se conserva:

```text
NAV FILTER
=
PROYECCIÓN UX
```

```text
SERVER AUTHORIZATION
=
CONTROL DECISORIO
```

---

#### 94. No wildcard por `viso.access`

El acceso general a VISO no concede administración de seguridad.

`viso.access`, la existencia de una sesión o poder abrir la sección son prerrequisitos insuficientes para mutaciones sensibles.

Cada operación usa su capacidad exacta vigente.

---

#### 95. No wildcard por permiso legacy

Las superficies actuales que usan permisos amplios observados se consideran transición.

Esta tarea no certifica como autoridad canónica:

- `staff.permissions.manage` como wildcard universal;
- `staff.manage` como gobierno completo de dispositivos o seguridad;
- cualquier alias legacy equivalente;
- cualquier permiso elegido únicamente porque la pantalla actual lo consume.

La materialización deberá reconciliar cada operación con el catálogo vigente sin inventar nombres nuevos.

---

#### 96. AS-IS de `/roles-permissions`

El runtime observado actualmente:

- exige un permiso legacy de administración de permisos;
- carga roles;
- carga un catálogo humano de permisos;
- carga sedes, áreas y tipos de área;
- consulta y muta `role_permissions`;
- permite guardar o retirar relaciones con scopes.

Se clasifica:

```text
EVIDENCIA AS-IS
NO CERTIFICACIÓN DEL CONTRATO FINAL
```

La futura materialización deberá cerrar la diferencia contra `VISO-AUTH-003`, `004` y `019` antes de declarar cumplimiento.

---

#### 97. AS-IS de `/app-navigation`

El runtime observado actualmente:

- agrupa navegación;
- edita filas de `app_navigation_items`;
- promueve pantallas detectadas;
- muestra `required_permission_code`;
- protege sus mutaciones con un permiso legacy observado.

Se conserva como superficie de navegación administrada, pero no como editor de grants.

La reconciliación futura deberá separar claramente:

```text
PUBLICAR UNA ENTRADA DE NAVEGACIÓN
!=
CONCEDER SU PERMISO
```

---

#### 98. AS-IS de creación de dispositivo compartido

El runtime observado actualmente permite crear un usuario técnico, aplicar plantilla, relacionar apps/políticas y registrar un evento de creación.

Esa evidencia no demuestra todavía el ciclo completo requerido por `VSCREEN-0022`.

Quedan fuera de la certificación de esta tarea documental:

- activación real completa;
- suspensión;
- rotación;
- revocación;
- retiro;
- cierre de sesiones o credenciales residuales;
- equivalencia entre todos los consumidores.

---

#### 99. AS-IS del preview operativo

El runtime observado de `/operations/preview` deriva acciones visibles a partir de matrices físicas y selectores de sede, área y rol.

No se utilizará como evidencia de que existe el simulador canónico de permisos efectivos.

Para ser simulación canónica deberá consumir el contrato de simulación, conservar actor real, escenario hipotético, decisión por permiso y separación estricta de autoridad real.

---

#### 100. AS-IS de matriz de roles por sede

El runtime observado de `/operations/site-roles` representa relaciones de rol, sede y área.

No se elimina ni duplica desde esta tarea.

Su futura reconciliación deberá demostrar:

- compatibilidad con catálogos canónicos;
- autoridad administrativa exacta;
- territorio;
- relaciones padre e hijo;
- ausencia de permisos implícitos;
- auditoría;
- convergencia con la experiencia de `Acceso y seguridad`.

---

#### 101. Regla de no duplicación

Para una misma capacidad mutable deberá existir un único owner de escritura canónica.

Durante la transición pueden coexistir:

- una superficie antigua todavía consumida;
- una proyección nueva;
- un handoff;
- una vista read-only.

No pueden coexistir dos editores que modifiquen la misma autoridad con contratos divergentes.

---

#### 102. Regla de retiro

Ninguna ruta o editor AS-IS se retira por esta definición.

El retiro físico posterior requiere:

- destino materializado;
- paridad funcional necesaria;
- autorización equivalente o más restrictiva;
- migración o reconciliación de datos cuando aplique;
- consumidores actualizados;
- pruebas;
- rollback;
- monitorización y evidencia.

`VISO-UX-017` y `VISO-UX-018` conservan la decisión transversal de evitar duplicación y construir handoffs.

---

#### 103. Relación con `VISO-UX-013`

`VISO-UX-013 — Limitar información según alcance territorial` desarrollará la aplicación transversal de scope visible.

`VISO-UX-004` fija únicamente que ninguna superficie de seguridad puede ampliar territorio por:

- filtro;
- selector;
- ruta;
- rol visible;
- simulación;
- dispositivo;
- matriz local.

---

#### 104. Relación con `VISO-UX-014`

`VISO-UX-014 — Mostrar origen de permisos de forma comprensible` conserva el diseño transversal final de la explicación de procedencia.

Esta tarea reserva dentro de `Acceso y seguridad` el lugar donde esa explicación se utiliza y exige que no sea reemplazada por frases ambiguas.

No adelanta el diseño final de copy, jerarquía o visualización de procedencia.

---

#### 105. Relación con `VISO-UX-015`

`VISO-UX-015 — Mostrar conflictos antes de guardar` conserva el patrón transversal de conflicto pre-save.

`VISO-UX-004` identifica las configuraciones de seguridad como consumidoras prioritarias de ese patrón.

No redefine la taxonomía propietaria de conflictos aprobada en `VISO-AUTH-016`.

---

#### 106. Relación con `VISO-UX-016`

`VISO-UX-016 — Permitir vista previa exacta de cada trabajador` desarrollará la experiencia transversal final de preview individual.

Esta tarea fija que `Acceso y seguridad` debe consumir el preview sin confundirlo con simulación o autoridad.

---

#### 107. Relación con `VISO-UX-017`

`VISO-UX-017 — Evitar duplicar configuración propia de otras aplicaciones` decidirá la convergencia final de superficies que hoy viven físicamente en ubicaciones no propietarias.

`VISO-UX-004` no retira ni clona esas superficies anticipadamente.

---

#### 108. Relación con `VISO-UX-018`

`VISO-UX-018 — Enlazar a la aplicación propietaria cuando corresponda` desarrollará los handoffs cross-app definitivos.

Esta tarea exige que un enlace preserve intención y selectores permitidos, pero que la aplicación destino revalide autoridad y contexto.

---

#### 109. Relación con `VISO-UX-019`

`VISO-UX-019 — Aplicar divulgación progresiva a seguridad avanzada` conserva el diseño transversal final de densidad y progressive disclosure.

`VISO-UX-004` define qué contenido de seguridad necesita niveles guiado y experto sin decidir todavía cada componente final.

---

#### 110. Relación con `VISO-UX-020`

`VISO-UX-020 — Ejecutar pruebas con administradores reales` deberá validar la comprensión, seguridad y operabilidad de esta sección con roles administrativos representativos.

Esta tarea no declara esas pruebas ejecutadas.

---

#### 111. Handoff hacia `VISO-UX-005`

`VISO-UX-005 — Crear sección Organización` recibe una frontera explícita:

```text
Acceso y seguridad
→ consume sedes y áreas como identidades territoriales
→ no administra su estructura maestra

Organización
→ administra estructura organizativa
→ no administra permisos por efecto lateral
```

Debe preservarse:

```text
ORGANIZATION STRUCTURE CHANGE
!=
SECURITY GRANT
```

Un cambio de sede o área puede invalidar o exigir reconciliar configuraciones de seguridad, pero no crea silenciosamente autoridad nueva.

---

#### 112. Carryovers

| Carryover | Owner | Condición de salida |
| --- | --- | --- |
| materializar la sección y sus subviews | instancia física de `VISO-UX-004` | package y `POST_E5_PACKAGE` satisfechos, autorización física propia y validaciones de implementación |
| limitar información por territorio | `VISO-UX-013` | patrón transversal de alcance visible aprobado y materializado |
| explicar procedencia de forma comprensible | `VISO-UX-014` | patrón final de origen de permisos aprobado |
| mostrar conflictos antes de guardar | `VISO-UX-015` | patrón final de conflicto pre-save aprobado |
| preview exacto por trabajador | `VISO-UX-016` | experiencia transversal de preview aprobada |
| retirar duplicidad de superficies legacy | `VISO-UX-017` | owner, reemplazo, paridad, pruebas y rollback demostrados |
| handoffs cross-app | `VISO-UX-018` | contrato de enlace y revalidación de destino aprobado |
| progressive disclosure avanzado | `VISO-UX-019` | patrón de seguridad avanzada aprobado |
| validación con administradores reales | `VISO-UX-020` | pruebas ejecutadas y evidencia aceptada |
| reconciliar rutas `/operations*` con ownership final | `VISO-UX-006`, `VISO-UX-017`, `VISO-UX-018` | navegación y mutación sin segundo editor ni pérdida de consumidores |
| habilitar exporte real de matriz | contrato y package propietarios de autorización | PermissionKey exacta activa, autorización server-side y materialización física validada |

No queda un pendiente narrativo sin propietario.

---

#### 113. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el Registro Canónico ya protege autorización por permiso/contexto/scope, catálogos, administración territorial, segregación, dispositivo compartido, simulación, server-side enforcement, revocación y coherencia administrativa de VISO; el minibloque `VISO-AUTH-001..020` ya definió los contratos sustantivos que esta tarea compone experiencialmente; y esta tarea no crea PermissionKeys, roles, scopes, grants, denies, tablas, transiciones, dispositivos, evaluadores, mutaciones o reglas de negocio nuevas.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 114. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico, la tarea reutiliza especialmente:

- `TREQ-VISO-001` para coherencia entre administración de roles, permisos, sedes, áreas, perfiles, excepciones, preview, conflictos, procedencia, territorio, auditoría y resultado consumido;
- `TREQ-AUTH-001` para impedir que nombres locales de rol sustituyan autorización canónica;
- `TREQ-AUTH-002` para exigir que toda clave de permiso exista en el catálogo vigente;
- `TREQ-AUTH-003` para ciclo auditable de dispositivos compartidos;
- `TREQ-AUTH-004` para equivalencia entre evaluadores;
- `TREQ-AUTH-007` para administración explícitamente autorizada y territorial;
- `TREQ-AUTH-008` para separar prerrequisitos administrativos y operativos;
- `TREQ-AUTH-009` para resolución territorial determinista;
- `TREQ-AUTH-010` para segregación de funciones y límites de concesiones individuales;
- `TREQ-AUTH-011` para intersección entre dispositivo y actor efectivo;
- `TREQ-AUTH-012` para separar simulación y autoridad real;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC;
- `TREQ-AUTH-014` para coherencia de carriles administrativo y operativo;
- `TREQ-AUTH-015` para controles y trazabilidad de simulación;
- `TREQ-AUTH-016` para revocación coordinada y ausencia de autoridad residual;
- `TREQ-UX-001` para navegación y acción principal comprensibles;
- `TREQ-UX-002` para errores y recuperación en lenguaje humano;
- `TREQ-UX-003` para densidad, acciones e información adecuadas a autorización y tarea.

La mención en esta sección es trazabilidad heredada y no una modificación de 04A.

---

#### 115. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-004`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en la rama documental local de `VISO-UX-004`. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, el protocolo, contrato de entrega, continuidad, topología, políticas de tarea, owner del minibloque, `VISO-UX-001` y `002` publicados, la base aprobada `VISO-UX-003`, `VISO-AUTH-001..020`, `VPROC-0059`, `VSCREEN-0019..0022` y `0114`, las familias `ADM-TASK-018..024`, el inventario `VISO-ROUTE-*`, el Registro 04A aplicable, los scripts documentales vigentes y las superficies AS-IS relevantes en `vento-viso/main`. |
| OPERATIVA | NOT_EXECUTED | No se concedieron, retiraron, simularon, aprobaron ni revocaron permisos reales; no se administraron trabajadores, dispositivos, sesiones o accesos reales. |
| FÍSICA | NOT_EXECUTED | No se modificaron UI, rutas, Server Actions, contratos, catálogos, Supabase, datos, migraciones, RLS, Auth, secretos ni despliegues; la materialización permanece por `implementation_unit_id` detrás de `POST_E5_PACKAGE`. |

---

#### 116. Criterios de aceptación

1. existe exactamente un contrato `VISO-ACCESO-SEGURIDAD-SECTION-001`;
2. la tarea conserva `VISO-UX-003` como anterior y `VISO-UX-005` como siguiente;
3. la topología permanece `PER_IMPLEMENTATION_UNIT`;
4. el gate físico permanece `POST_E5_PACKAGE`;
5. `Acceso y seguridad` es el tercer dominio administrativo definido por `VISO-UX-001`;
6. `VPROC-0059` permanece como proceso propietario principal;
7. `VSCREEN-0019` permanece como pantalla canónica principal del catálogo;
8. `VSCREEN-0020` permanece como perfil de acceso del trabajador;
9. `VSCREEN-0021` permanece como simulación de permisos y conflictos;
10. `VSCREEN-0022` permanece como gobierno de dispositivos compartidos;
11. `VSCREEN-0114` permanece como superficie de solicitudes y certificaciones de acceso;
12. `/roles-permissions` se identifica como entrada física observada más cercana sin certificar su AS-IS como implementación final;
13. `/app-navigation` se clasifica como configuración relacionada y no como fuente de autoridad;
14. `/staff/shared-devices/new` pertenece semánticamente a `Acceso y seguridad` como detalle de alta;
15. `VISO-ROUTE-050` conserva identidad estable;
16. las rutas `/operations*` no se renumeran ni reclasifican físicamente desde esta tarea;
17. `/operations/site-roles` no se duplica con un segundo editor canónico;
18. `/operations/preview` no se declara simulador canónico por su nombre;
19. el dominio no crea rutas nuevas;
20. el dominio no retira rutas existentes;
21. navegación visible no equivale a autorización;
22. abrir VISO no concede administración de seguridad;
23. abrir la sección no concede mutaciones;
24. rol visible no equivale a permiso efectivo;
25. rol base y rol operativo permanecen separados;
26. el catálogo base conserva exactamente ocho identidades vigentes;
27. el catálogo operativo conserva exactamente doce identidades vigentes;
28. códigos canónicos y etiquetas humanas permanecen diferenciados;
29. una posición visual no crea jerarquía autorizativa;
30. la matriz base permanece separada de la matriz operativa;
31. ausencia de grant no se presenta automáticamente como deny explícito;
32. no existe wildcard implícito por nombre de rol;
33. rol × sede expresa elegibilidad y no permiso;
34. rol × área expresa compatibilidad y no permiso;
35. `NO_AREA_NOT_REQUIRED` no se convierte en wildcard;
36. `AREA_BINDING_UNRESOLVED` no infiere área;
37. perfil operativo no equivale a asignación territorial;
38. perfil operativo no equivale a rol efectivo;
39. perfil operativo no equivale a permiso;
40. sede asignada no equivale a permiso;
41. área asignada no equivale a área efectiva universal;
42. rol operativo de turno se mantiene explícito cuando el contrato lo exige;
43. turno sin rol no usa fallback desde perfil o rol base;
44. incompatibilidad de área conserva validación rol → sede → área → binding;
45. el perfil de acceso no colapsa todas las relaciones en una lista de permisos;
46. preview contextual no muta;
47. preview contextual no autoriza;
48. estado actual y propuesto permanecen diferenciados;
49. la operación final revalida después del preview;
50. simulación usa actor real autorizado para simular;
51. simulación conserva contexto hipotético separado;
52. simulación no muta grants;
53. simulación no muta asignaciones;
54. simulación no muta turnos;
55. simulated allow no equivale a real allow;
56. el estado de simulación se indica persistentemente;
57. salir de simulación no altera autoridad real;
58. procedencia explica una decisión y no reevalúa permisos;
59. procedencia puede distinguir fuentes positivas y negativas;
60. una procedencia insuficiente no se inventa;
61. conflicto real, deny, default deny, redundancia y fallo técnico permanecen diferenciados;
62. deny válido no se convierte automáticamente en conflicto;
63. conflicto bloqueante no se supera con confirmación genérica;
64. excepciones individuales no reconstruyen roles;
65. excepciones individuales no corrigen territorio inválido;
66. excepciones individuales no crean PermissionKeys;
67. excepciones conservan sujeto, permiso, scope, motivo y vigencia;
68. la autoridad de seguridad usa capacidades atómicas exactas;
69. la tarea no crea un permiso `manage all security`;
70. `propietario` no obtiene bypass por nombre;
71. `gerente_general` no obtiene bypass por nombre;
72. `gerente` no obtiene administración global por nombre;
73. ver, proponer, aprobar, conceder, suspender, revocar, simular, auditar y exportar pueden conservar autoridades distintas;
74. autoridad de auditoría no concede mutación;
75. administrar un grant no concede automáticamente el permiso objetivo;
76. gates de reautenticación o segregación propietarios no se omiten;
77. cambios sensibles muestran antes/después cuando corresponde;
78. una mutación exitosa produce resultado identificable;
79. dispositivo compartido conserva principal técnico y actor humano separados;
80. dispositivo no concede autoridad por sí mismo;
81. autoridad en dispositivo compartido no excede la intersección permitida;
82. alta de dispositivo no se confunde con ciclo completo;
83. `service_role` no se presenta como autoridad empresarial;
84. solicitud de acceso no crea acceso efectivo;
85. `APPROVED` no se presenta como `ACCESS_ACTIVE`;
86. revisión periódica no renueva automáticamente;
87. deprovisioning no se presenta como cierre hasta verificar residuos;
88. revocación no borra historia;
89. reingreso no restaura automáticamente autoridad anterior;
90. auditoría de seguridad es append-only desde UX;
91. auditoría contextual no duplica el dominio `Auditoría`;
92. exporte representa snapshot real y no simulación;
93. exporte no es editor;
94. exporte no es fuente de permisos;
95. exporte no es reimportable;
96. no se inventa una PermissionKey de exportación;
97. exporte permanece bloqueado mientras no exista capacidad exacta autorizada;
98. no se fija XLSX, CSV o JSON como único formato;
99. navegación interna no crea nuevos dominios primarios;
100. deep links conservan selectores y revalidan autoridad;
101. URLs no transportan secretos ni autoridad;
102. modo guiado y experto comparten las mismas reglas de seguridad;
103. filtros expertos no amplían scope;
104. configuración individual distingue rol, perfil, asignación, grant, deny y excepción;
105. acciones masivas muestran población, alcance, conflictos y resultado;
106. un selector “todas las sedes” no crea alcance global;
107. Organización conserva ownership de estructura maestra;
108. Programación conserva ownership de turnos;
109. Personal conserva ownership de expediente laboral;
110. Operación no obtiene un editor paralelo de seguridad;
111. SHELL conserva contratos compartidos sin que VISO los redefina;
112. ANIMA no administra seguridad de terceros;
113. onboarding no concede autoridad automáticamente;
114. offboarding coordina revocación sin borrar evidencia;
115. permiso inexistente no se presenta como falta personal de grant;
116. fallo técnico no se convierte en deny empresarial;
117. fail closed aplica ante evidencia insuficiente;
118. resultados stale no se reutilizan como autoridad;
119. cambios concurrentes obligan revalidación propietaria;
120. confirmaciones sensibles identifican efecto material;
121. receipts conservan trazabilidad sin exponer secretos;
122. búsqueda opera únicamente dentro del universo autorizado;
123. minimización se aplica antes de depender de masking visual;
124. estados críticos no dependen solo de color;
125. la experiencia responsive conserva contexto y acciones críticas;
126. `LOADING`, `EMPTY`, `NO_AUTHORITY`, `NO_TERRITORY`, `NO_MATCHES`, `CONFLICT`, `STALE`, `TECHNICAL_FAILURE`, `PARTIAL_READ` y `READY` no se confunden;
127. ocultar un control no sustituye protección de servidor;
128. Server Action, API, RPC y demás canales no pueden eludir autorización;
129. `viso.access` no es wildcard de seguridad;
130. `staff.permissions.manage` observado no se certifica como permiso canónico universal;
131. `staff.manage` observado no se certifica como gobierno completo de dispositivos;
132. el AS-IS de `/roles-permissions` permanece evidencia y no certificación;
133. el AS-IS de `/app-navigation` no concede grants;
134. el AS-IS de shared device creation no se declara ciclo completo;
135. el AS-IS de preview operativo no se declara simulación canónica;
136. el AS-IS de matriz por sede no se declara owner definitivo de experiencia;
137. no existen dos editores canónicos simultáneos para la misma capacidad;
138. ningún editor legacy se retira antes de paridad, pruebas y rollback;
139. `VISO-UX-013` conserva el patrón territorial detallado;
140. `VISO-UX-014` conserva el patrón final de procedencia comprensible;
141. `VISO-UX-015` conserva el patrón final de conflictos pre-save;
142. `VISO-UX-016` conserva el patrón final de preview por trabajador;
143. `VISO-UX-017` conserva la eliminación de duplicidad;
144. `VISO-UX-018` conserva handoffs a owners;
145. `VISO-UX-019` conserva progressive disclosure avanzado;
146. `VISO-UX-020` conserva pruebas con administradores reales;
147. `VISO-UX-005` recibe la frontera de estructura organizativa;
148. no se crean requisitos de prueba;
149. no se modifican requisitos de prueba;
150. no se modifica 04A;
151. la cobertura vigente se referencia fuera de la sección de cero cambios;
152. no se realizan cambios físicos desde esta tarea documental.

---

#### 117. Límites

Esta tarea no:

- modifica `vento-viso`;
- modifica `/roles-permissions`;
- modifica `/app-navigation`;
- modifica `/staff/shared-devices/new`;
- modifica `/operations/site-roles`;
- modifica `/operations/preview`;
- crea rutas;
- elimina rutas;
- renumera `VISO-ROUTE-*`;
- crea un nuevo dominio de navegación;
- modifica navegación runtime;
- modifica `app_navigation_items`;
- modifica `app_screen_registry`;
- crea componentes;
- crea PermissionKeys;
- renombra PermissionKeys;
- retira PermissionKeys;
- crea roles base;
- crea roles operativos;
- modifica catálogos versionados de roles;
- crea grants;
- elimina grants;
- crea denies;
- elimina denies;
- crea excepciones reales;
- revoca excepciones reales;
- cambia sedes;
- cambia áreas;
- asigna sedes a trabajadores;
- asigna áreas a trabajadores;
- crea perfiles operativos;
- modifica perfiles operativos;
- asigna roles a turnos;
- crea turnos;
- modifica turnos;
- publica turnos;
- crea dispositivos compartidos;
- activa dispositivos;
- suspende dispositivos;
- rota credenciales;
- revoca dispositivos;
- crea usuarios técnicos;
- crea sesiones;
- revoca sesiones;
- crea tokens;
- revoca tokens;
- ejecuta simulaciones reales;
- genera exportes reales;
- reimporta matrices;
- modifica auditoría;
- crea tablas;
- crea vistas;
- crea funciones o RPC;
- crea triggers;
- crea migraciones;
- modifica RLS;
- modifica grants de base de datos;
- modifica Auth;
- modifica Storage;
- modifica Realtime;
- modifica secretos;
- modifica datos;
- despliega cambios;
- aprueba packages;
- selecciona package;
- autoriza una instancia física;
- ejecuta una instancia física;
- sustituye `VISO-AUTH-001..020`;
- sustituye `VISO-UX-005..020`;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

---

#### 118. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-003 — Crear sección Programación`

**TAREA ACTUAL APROBADA**
`VISO-UX-004 — Crear sección Acceso y seguridad`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-005 — Crear sección Organización`
### ✅ VISO-UX-005 — Crear sección Organización

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-004 — Crear sección Acceso y seguridad
**Tarea siguiente:** VISO-UX-006 — Crear sección Operación
**Tipo de tarea:** definición técnico-documental de la sección administrativa `Organización` de VISO; compone la estructura organizativa, jurídica, comercial y territorial canónica, sus relaciones tipadas, vigencias, cambios, impacto y handoffs hacia aplicaciones consumidoras, sin fusionar organización, titular, marca, establecimiento, instalación, sede, área, zona, estación, canal o centro de costo, sin convertir estructura en autorización y conservando `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la sección `Organización` definido; su materialización runtime permanece pendiente por `implementation_unit_id` y detrás del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, rutas, navegación runtime, componentes, catálogos organizacionales, contratos compartidos, Supabase, datos, migraciones, RLS, RPC, Storage, Auth, secretos, permisos, asignaciones, inventario, PASS, NUMERA, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la sección administrativa `Organización` de VISO para que una persona autorizada pueda comprender, consultar y gobernar la estructura empresarial de Vento OS sin confundir conceptos jurídicos, comerciales, físicos, operativos, territoriales o financieros.

La sección debe responder de forma directa:

```text
¿QUÉ ES LA ORGANIZACIÓN Y QUÉ NO LO ES?
¿QUIÉN ES EL TITULAR JURÍDICO?
¿QUÉ MARCAS OPERA EL GRUPO?
¿QUÉ ESTABLECIMIENTOS ESTÁN DOCUMENTADOS?
¿QUÉ INSTALACIONES FÍSICAS EXISTEN?
¿QUÉ SEDES OPERATIVAS EXISTEN Y CUÁL ES SU VIGENCIA?
¿QUÉ ÁREAS PERTENECEN A CADA SEDE?
¿QUÉ ZONAS O ESTACIONES EXISTEN SIN CONVERTIRSE EN ÁREAS?
¿QUÉ RELACIÓN TIENE CADA ELEMENTO CON LOS DEMÁS?
¿QUÉ CAMBIO SE PROPONE Y QUÉ CONSUMIDORES AFECTA?
¿QUÉ EVIDENCIA JURÍDICA, OPERATIVA O FÍSICA RESPALDA EL DATO?
¿QUÉ PARTE DEL CAMBIO PERTENECE A VISO Y QUÉ PARTE REQUIERE UN HANDOFF?
```

`Organización` no es una tabla de sedes y tampoco es un árbol que derive permisos por jerarquía.

Es la experiencia administrativa que proyecta y gobierna el catálogo organizacional canónico, conserva historia y relaciones, distingue fuente interna de evidencia externa y entrega identidades estables a los consumidores sin permitir catálogos competidores.

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001` entrega sin reapertura:

```text
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
```

Para `Organización` entrega además:

- la responsabilidad de representar la estructura administrativa necesaria para ubicar personas, sedes, áreas y relaciones organizacionales autorizadas;
- la obligación de no interpretar una sede seleccionada como alcance de autorización;
- la prohibición de interpretar un área como permiso;
- la familia observada `/businesses*` y `/sites*` como seis rutas candidatas que requieren clasificación final en esta tarea;
- la conservación de las identidades `VISO-ROUTE-*` existentes;
- la regla de que una ruta físicamente presente no adquiere ownership por ubicación;
- la obligación de mantener handoffs hacia aplicaciones propietarias cuando la capacidad primaria no pertenezca a VISO.

Se conserva expresamente:

```text
ORGANIZACION != SEDE
SEDE != AREA
AREA != PERMISO
NOMBRE_DE_SEDE != ALCANCE
```

Esta tarea desarrolla el cuarto dominio sin reabrir la taxonomía de navegación de primer nivel.

---

#### 3. Handoff recibido de `VISO-UX-004`

`VISO-UX-004` entrega una frontera explícita entre estructura organizacional y seguridad:

```text
Acceso y seguridad
→ consume sedes y áreas como identidades territoriales
→ no administra su estructura maestra

Organización
→ administra estructura organizativa
→ no administra permisos por efecto lateral
```

Debe preservarse:

```text
ORGANIZATION_STRUCTURE_CHANGE
!=
SECURITY_GRANT
```

Un cambio de sede, área, relación o vigencia puede invalidar o exigir reconciliar configuraciones de seguridad.

No concede silenciosamente autoridad nueva.

La sección `Organización` deberá exponer el impacto de seguridad como dependencia afectada y conducir al owner correspondiente cuando se requiera reconciliación.

No editará matrices, grants, denies, perfiles, excepciones o permisos como efecto lateral de un cambio estructural.

---

#### 4. Contrato de sección

Se define:

```text
VISO_ORGANIZATION_SECTION_CONTRACT = VISO-ORGANIZATION-SECTION-001
DOMAIN_LABEL = Organización
DOMAIN_ORDER = 4
PRIMARY_CANONICAL_SCREEN = VSCREEN-0008
PRIMARY_CANONICAL_PROCESS = VPROC-0002
PRIMARY_CANONICAL_STEP = VPROC-0002::STEP-MAINTAIN_ORGANIZATIONAL_STRUCTURE
PRIMARY_INTENT = ADMINISTRATIVE_ORGANIZATIONAL_STRUCTURE
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-038
PRIMARY_OBSERVED_ROUTE = /sites
```

La ruta observada no limita la identidad lógica de la pantalla.

Se conserva:

```text
PRIMARY_OBSERVED_ROUTE
!=
COMPLETE_CANONICAL_MODEL
```

`/sites` es la entrada física actual más cercana al contrato objetivo, pero la sección canónica cubre más conceptos que la tabla o la familia de rutas existente.

---

#### 5. Pantalla canónica principal

La pantalla canónica principal es:

```text
VSCREEN-0008 — Estructura organizativa
```

Su declaración aprobada permanece:

```text
Mantener empresas, titulares, marcas, establecimientos,
sedes, áreas, zonas y relaciones organizativas autorizadas.
```

Su proceso principal permanece:

```text
VPROC-0002
— Mantener una estructura organizativa y jurídica coherente
  entre empresas, marcas, establecimientos, sedes y áreas
```

Su paso dominante permanece:

```text
VPROC-0002::STEP-MAINTAIN_ORGANIZATIONAL_STRUCTURE
```

La pantalla no deriva autorización de la jerarquía visible.

---

#### 6. Procesos complementarios dentro del dominio

`Organización` no se reduce a `VPROC-0002`.

La experiencia puede enlazar capacidades complementarias del dominio `ADM-ORG` sin fusionar procesos:

| Proceso | Uso dentro de la sección | Regla |
| --- | --- | --- |
| `VPROC-0002` | estructura organizativa y jurídica | proceso principal |
| `VPROC-0003` | responsabilidades, políticas, delegaciones y límites | subespacio de gobierno organizativo; no altera estructura por inferencia |
| `VPROC-0004` | compromisos y transferencias entre negocios, sedes y áreas | coordinación relacionada; no crea una relación estructural permanente por el solo hecho de aceptar un compromiso |

La existencia de un enlace entre estos procesos no significa que compartan estados o identidad de instancia.

---

#### 7. Pantallas canónicas relacionadas

La sección organiza principalmente:

| Screen ID | Pantalla | Papel en `Organización` |
| --- | --- | --- |
| `VSCREEN-0008` | Estructura organizativa | entrada principal y workspace propietario |
| `VSCREEN-0009` | Políticas, delegaciones y límites | superficie relacionada de gobierno organizativo |
| `VSCREEN-0010` | Compromisos y transferencias internas | superficie relacionada de coordinación entre unidades |

`VSCREEN-0008` continúa siendo la identidad principal de la estructura.

`VSCREEN-0009` no convierte una política en una relación de estructura.

`VSCREEN-0010` no convierte un compromiso temporal en pertenencia organizacional permanente.

Esta tarea no inventa rutas físicas nuevas para ninguna de esas pantallas.

---

#### 8. Familias administrativas cubiertas

La sección consume las tareas de `ADM-ORG`:

| Task ID | Capacidad administrativa | Tratamiento de experiencia |
| --- | --- | --- |
| `ADM-TASK-001` | gestionar empresas, titulares jurídicos y marcas operadas | guiada + aprobación |
| `ADM-TASK-002` | gestionar establecimientos, sedes, áreas y zonas; referenciar centros de costo sin redefinirlos | guiada |
| `ADM-TASK-003` | definir propietarios de proceso, responsables, suplentes y límites de decisión | guiada + aprobación |
| `ADM-TASK-004` | crear, versionar, aprobar y retirar políticas empresariales | experta + aprobación |
| `ADM-TASK-005` | revisar impacto de un cambio organizativo antes de publicarlo | aprobación + auditoría |

La sección no incorpora `ADM-PEOPLE`, `ADM-ACCESS`, `ADM-INVENTORY`, `ADM-FINANCE` o `ADM-CUSTOMER` como editores internos.

Puede mostrar su impacto y conducir mediante handoff.

---

#### 9. Universo conceptual cerrado

El dominio debe mantener diferenciadas, como mínimo, estas identidades conceptuales:

```text
ORGANIZATION_SCOPE
LEGAL_SUBJECT
BRAND
COMMERCIAL_ESTABLISHMENT
BUSINESS_LINE
PHYSICAL_FACILITY
OPERATIONAL_SITE
ORGANIZATIONAL_AREA
PHYSICAL_ZONE
WORKSTATION
COMMERCIAL_CHANNEL
EXTERNAL_OPERATIONAL_POINT
```

Además puede mostrar una referencia a `COST_CENTER` cuando exista un contrato financiero aprobado.

`COST_CENTER` no se convierte por ello en entidad maestra propiedad de VISO.

---

#### 10. Separación semántica obligatoria

Se congela:

```text
ECOSISTEMA U ORGANIZACIÓN
!= TITULAR JURÍDICO
!= MARCA
!= ESTABLECIMIENTO DE COMERCIO
!= LÍNEA DE NEGOCIO
!= INSTALACIÓN FÍSICA
!= SEDE OPERATIVA
!= ÁREA
!= ZONA
!= ESTACIÓN
!= CANAL
!= CENTRO DE COSTO
```

Compartir nombre no fusiona identidades.

Compartir dirección no fusiona identidades.

Compartir titular no fusiona identidades.

Compartir una instalación no fusiona sedes.

Compartir una aplicación consumidora no fusiona dominios.

---

#### 11. Identidad estable

Cada elemento organizacional canónico debe conservar, cuando aplique:

- identificador estable e inmutable;
- código canónico independiente del nombre visible;
- nombre vigente;
- tipo explícito;
- estado;
- vigencia;
- propietario funcional;
- fuente o evidencia de validación;
- relaciones tipadas;
- referencias históricas de reemplazo o cierre.

El nombre visible no es:

- clave de integración;
- condición de negocio;
- permiso;
- scope;
- capacidad operativa;
- identificador histórico suficiente.

---

#### 12. Relaciones tipadas

La sección debe poder representar, sin inferencia por coincidencia textual, relaciones como:

```text
BELONGS_TO_ORGANIZATION_SCOPE
LEGALLY_OWNED_BY
OPERATED_BY
USES_BRAND
REGISTERED_AS_ESTABLISHMENT_OF
OCCUPIES_FACILITY
CONTAINS_AREA
CONTAINS_ZONE
HOSTS_WORKSTATION
SERVES_CHANNEL
INVOICES_THROUGH
CUSTODIED_BY
REPLACED_BY
VALID_FROM / VALID_TO
```

Una relación visible debe conservar su tipo.

No se permitirá representar todas las relaciones como un genérico `parent_id` sin semántica visible cuando eso oculte titularidad, operación, ocupación, vigencia o reemplazo.

---

#### 13. Estado jurídico y estado operativo

La experiencia debe mantener separados:

```text
EXISTENCIA_OPERATIVA_CONFIRMADA
EVIDENCIA_DOCUMENTAL_DISPONIBLE
VALIDACION_PROFESIONAL_PENDIENTE
VIGENCIA_INTERNA
VIGENCIA_EXTERNA_O_REGISTRAL
PUBLICACION_PERMITIDA_O_RESTRINGIDA
```

Un elemento puede estar operativo internamente sin estar jurídicamente verificado.

La UI no bloqueará la representación de una realidad operativa confirmada solo porque falte una validación externa.

Sí bloqueará presentar ese dato como jurídicamente verificado o usarlo como dato oficial externo cuando la validación exigida permanezca pendiente.

---

#### 14. Evidencia externa

Conservan autoridad externa, cuando correspondan:

- razón social o nombre del titular;
- identificación tributaria;
- matrícula o existencia de establecimiento;
- titularidad registral de marca;
- dirección registral;
- vigencia legal.

Vento OS conserva referencia, copia, estado de validación y trazabilidad.

No sustituye el registro oficial.

---

#### 15. Fuente interna de estructura

La fuente interna permanece conceptualmente:

```text
SUPABASE VENTO
→ catálogo organizacional canónico
→ administrado mediante VISO
→ contratos compartidos desde vento-shell
```

Las aplicaciones consumidoras no mantienen catálogos editables equivalentes.

---

#### 16. Fuente única y proyecciones

Se conserva:

```text
ONE_CANONICAL_ORGANIZATIONAL_SOURCE
→ MANY_CONSUMER_PROJECTIONS
```

No:

```text
ONE_EDITABLE_ORGANIZATION_COPY_PER_APP
```

Las aplicaciones pueden recibir únicamente los campos y relaciones que necesiten.

Una proyección no se convierte en fuente por ser más visible, más reciente en una caché o estar físicamente alojada en otra aplicación.

---

#### 17. Responsabilidades por consumidor

La sección debe hacer comprensible esta frontera:

| Componente | Responsabilidad |
| --- | --- |
| VISO | administración autorizada, revisión de impacto, vigencia y gobierno experiencial de la estructura |
| `vento-shell` | contratos, tipos, contexto y distribución segura a consumidores |
| Supabase VENTO | persistencia, integridad, RLS, migraciones y proyecciones canónicas |
| ANIMA | consume organización para identidad laboral, asignaciones, turnos y asistencia |
| NEXO | consume organización para inventario, LOC, remisiones y logística; no es owner del catálogo organizacional |
| FOGO | consume sede y área para producción y recetas |
| ORIGO | consume estructura para compras, recepción y responsabilidad |
| PULSO | consume sede y contexto para venta, caja y operación comercial |
| NUMERA | consume dimensiones jurídicas, operativas y financieras; gobierna semántica financiera propia |
| PASS | consume proyección pública de marca, sede, dirección y enlaces |
| sitio público / CMS | consume proyección pública; no es fuente jurídica u operativa |

---

#### 18. Estructura de navegación interna

La sección debe priorizar intención administrativa y no tabla física.

Se proponen conceptualmente estas vistas internas, sin crear rutas nuevas desde esta tarea:

```text
Organización
├── Estructura
├── Entidades y marcas
├── Sedes y áreas
├── Relaciones
├── Cambios e impacto
└── Políticas y responsabilidades
```

La implementación puede usar tabs, subnav, paneles o páginas hijas.

Debe preservar la semántica anterior y la divulgación progresiva.

---

#### 19. Entrada principal

La entrada principal debe permitir:

- comprender el alcance organizacional vigente;
- navegar desde elementos de alto nivel hacia relaciones y unidades territoriales;
- distinguir claramente entidad jurídica, marca, establecimiento, instalación, sede y área;
- detectar estados pendientes o no verificados;
- buscar por código, nombre, tipo y estado sin convertir el nombre en identidad;
- abrir un detalle estable;
- iniciar un cambio únicamente cuando exista autoridad exacta.

La entrada no muestra por defecto todas las acciones sensibles.

---

#### 20. Resumen de estructura

El resumen puede mostrar conteos como:

- titulares;
- marcas;
- establecimientos;
- instalaciones;
- sedes activas;
- áreas activas;
- zonas;
- puntos externos;
- cambios pendientes;
- validaciones externas pendientes.

Un conteo no concede capacidad y no reemplaza el detalle.

---

#### 21. Disposición de las seis rutas candidatas

La familia entregada por `VISO-UX-001` se resuelve así:

| Route ID | Ruta | Decisión de `VISO-UX-005` |
| --- | --- | --- |
| `VISO-ROUTE-007` | `/businesses` | `CROSS_OWNER_TRANSITION`; mezcla proyección PASS con relación a sede, no representa el catálogo organizacional completo |
| `VISO-ROUTE-008` | `/businesses/new` | `CROSS_OWNER_TRANSITION`; la creación conjunta de `site` + configuración PASS debe separarse por ownership |
| `VISO-ROUTE-009` | `/businesses/[id]` | `CROSS_OWNER_TRANSITION`; detalle mixto de `sites` y `pass_satellites` |
| `VISO-ROUTE-038` | `/sites` | `VISO_DOMAIN_ENTRY`; entrada física observada principal del dominio Organización |
| `VISO-ROUTE-039` | `/sites/[id]` | `CHILD_OR_DETAIL_ROUTE`; detalle estructural mixto que debe preservar handoffs hacia owners externos |
| `VISO-ROUTE-040` | `/sites/[id]/documentos` | `CROSS_OWNER_TRANSITION`; usa la sede como contexto, pero la capacidad primaria es gobierno de requisitos documentales |

Los IDs no se renumeran.

La clasificación no retira físicamente ninguna ruta.

---

#### 22. `VISO-ROUTE-038 — /sites`

`/sites` es la entrada física observada más cercana a `VSCREEN-0008`.

Actualmente consulta, entre otros elementos:

- `sites`;
- cantidad de `areas`;
- existencia de configuración `pass_satellites`;
- cantidad de `inventory_locations`.

La experiencia objetivo debe distinguir:

```text
ESTRUCTURA ORGANIZACIONAL
→ owned by Organización

SEÑALES DE CONSUMIDORES
→ read-only summary o handoff
```

La cantidad de LOC no convierte inventario en parte de la estructura organizacional editable.

La existencia de configuración PASS no convierte `pass_satellites` en entidad organizacional maestra.

---

#### 23. `VISO-ROUTE-039 — /sites/[id]`

El detalle actual mezcla:

- identidad de sede;
- áreas;
- LOCs de inventario;
- configuración operativa;
- enlaces a documentos;
- enlaces a mapa operativo.

El target de `Organización` conserva dentro de su ownership únicamente lo que corresponda a estructura organizativa.

La experiencia deberá separar visual y contractualmente:

```text
DETALLE ESTRUCTURAL DE SEDE
→ Organización

LOC Y UBICACIONES DE INVENTARIO
→ NEXO

CONFIGURACIÓN OPERATIVA
→ VISO-UX-006 / owner funcional aplicable

DOCUMENTOS Y REQUISITOS
→ gobierno documental / owner aplicable
```

No se duplicará ninguna mutación en tabs distintos.

---

#### 24. Áreas dentro de una sede

`areas` es una base parcial reutilizable.

La sección debe permitir distinguir:

- código estable;
- nombre;
- tipo o kind;
- vigencia;
- sede padre;
- relación funcional;
- estado activo/inactivo;
- evidencia o validación cuando aplique.

Se conserva:

```text
AREA
!=
ROL
!=
PERFIL
!=
PERMISO
```

Un área no adquiere autoridad por existir.

---

#### 25. Zonas y estaciones

Una zona o estación representa granularidad física o funcional menor que un área.

Se conserva:

```text
PHYSICAL_ZONE
!= ORGANIZATIONAL_AREA

WORKSTATION
!= ORGANIZATIONAL_AREA
```

La UI no promoverá automáticamente:

- terraza;
- cámara fría;
- cuarto de congelación;
- caja;
- mostrador;
- recepción;
- despacho;
- punto de impresión;

como áreas organizacionales.

---

#### 26. LOCs e inventario

`inventory_locations` pertenece al modelo físico de inventario de NEXO.

La sección `Organización` puede mostrar:

- número de LOC asociados;
- estado agregado;
- enlace contextual;
- impacto potencial de un cierre de sede o área.

No puede:

- crear LOC como parte del editor organizacional;
- editar posiciones;
- cambiar custodia de inventario;
- alterar stock;
- redefinir la taxonomía NEXO.

La ruta actual que mezcla áreas y LOC queda reconocida como transición.

---

#### 27. `VISO-ROUTE-040 — /sites/[id]/documentos`

La ruta actual administra `required_document_rules` vinculadas a una sede.

La sede aporta contexto.

La capacidad primaria es documental y de elegibilidad, no estructural.

Por tanto:

```text
SITE_CONTEXT
!=
ORGANIZATION_OWNERSHIP_OF_DOCUMENT_RULE
```

La experiencia `Organización` puede enlazar hacia esa configuración.

No la presenta como propiedad inherente de una sede ni como parte del catálogo organizacional.

La resolución final de navegación y handoff permanece coordinada con `VISO-UX-017` y `VISO-UX-018`.

---

#### 28. Familia `/businesses*`

El AS-IS de `/businesses*` no representa un catálogo canónico de empresas.

Actualmente combina:

- registros `pass_satellites`;
- relación con `sites`;
- creación o actualización de sede;
- logos y estilo;
- colores;
- enlaces;
- overrides de dirección y coordenadas;
- slots u otra configuración comercial de PASS.

El nombre de ruta `businesses` no redefine el significado empresarial de `LEGAL_SUBJECT`, `BRAND`, `COMMERCIAL_ESTABLISHMENT` u `OPERATIONAL_SITE`.

---

#### 29. Separación de `sites` y `pass_satellites`

Se preserva la decisión canónica:

```text
sites
→ estructura operativa parcial

pass_satellites
→ proyección comercial / experiencia PASS
```

Pueden coexistir.

No deben competir por los mismos campos sin contrato de propiedad y precedencia.

La tarea no ordena fusionar ambas estructuras.

---

#### 30. Alta de estructura versus alta de experiencia PASS

El flujo actual de `/businesses/new` crea una sede y luego una configuración PASS dentro de la misma acción de experiencia.

El target deberá separar las decisiones:

```text
CREAR O MODIFICAR ELEMENTO ESTRUCTURAL
→ owner Organización

CONFIGURAR EXPERIENCIA PASS
→ owner PASS / proyección autorizada
```

Una falla en la configuración PASS no debe redefinir la identidad estructural.

Una alta de sede no debe implicar automáticamente que la sede es pública o está disponible en PASS.

---

#### 31. Titular jurídico

`LEGAL_SUBJECT` representa a la persona jurídica o natural que asume obligaciones frente a terceros.

La sección debe distinguir:

- identidad interna;
- nombre o razón social;
- evidencia oficial;
- vigencia;
- estado de validación externa;
- relaciones con marcas y establecimientos;
- relaciones con procesos consumidores.

No debe usar:

- cuenta bancaria;
- marca visible;
- sede;
- dirección compartida;
- emisor histórico de una venta aislada;

como sustituto automático del titular jurídico.

---

#### 32. Organización como ecosistema

`ORGANIZATION_SCOPE` es el paraguas interno para gobernar el ecosistema.

Se conserva:

```text
VENTO GROUP — ECOSISTEMA
→ ORGANIZATION_SCOPE

VENTO GROUP S.A.S.
→ LEGAL_SUBJECT
```

Mostrar ambos elementos con nombres relacionados no autoriza fusionarlos.

---

#### 33. Marca

`BRAND` representa identidad comercial.

Una marca:

- puede operar en una o varias sedes;
- puede compartir titular con otras marcas;
- puede usar distintas instalaciones;
- puede tener canales asociados;
- puede tener titularidad registral pendiente de validación;
- no es sede;
- no es establecimiento por inferencia;
- no es scope de autorización por defecto.

La sección debe mostrar las relaciones sin convertir la marca en árbol jerárquico de permisos.

---

#### 34. Establecimiento de comercio

`COMMERCIAL_ESTABLISHMENT` representa una figura comercial o registral documentada.

No se crea por:

- compartir nombre con una marca;
- existir una sede;
- tener un punto de venta;
- aparecer en PASS;
- usar una dirección;
- aparecer en una factura aislada.

Su estado de validación externa debe ser visible.

---

#### 35. Línea de negocio

`BUSINESS_LINE` representa un frente u oferta comercial que no necesita sede propia.

Ejemplo canónico:

```text
Catering
→ BUSINESS_LINE / servicio
→ usa capacidades y sedes existentes
→ no crea sede propia por defecto
```

La experiencia debe impedir que una línea de negocio sea promovida a sede o empresa solo para facilitar navegación.

---

#### 36. Instalación física

`PHYSICAL_FACILITY` representa un inmueble o espacio físico identificable.

Puede alojar más de un contexto operativo.

La instalación no concede:

- permiso;
- rol;
- alcance a todas las sedes que aloje;
- autoridad sobre todos los procesos del inmueble.

La relación de ocupación debe ser explícita.

---

#### 37. Sede operativa

`OPERATIONAL_SITE` es la unidad territorial primaria para contexto operativo de Vento OS.

La sección debe conservar:

- identidad estable;
- estado;
- vigencia;
- clasificación descriptiva;
- relaciones con instalación, marca y organización;
- áreas contenidas;
- capacidades explícitas cuando el contrato correspondiente las consuma.

El nombre o `site_type` no concede capacidad.

---

#### 38. Capacidad no deriva del tipo de sede

Se prohíbe:

```text
site_type = X
→ por sí solo
→ PUEDE VENDER / PRODUCIR / ALMACENAR / SOLICITAR / DESPACHAR / RECIBIR / ADMINISTRAR
```

Las capacidades se gobiernan mediante contratos explícitos.

La sección puede mostrar capacidad como relación o resumen.

No la infiere desde el nombre.

---

#### 39. Áreas agregadas `Todos` o `General`

Un área técnica usada solo como agregador de interfaz no se presenta como unidad organizacional real.

Se conserva:

```text
Todos / General
→ filtro o compatibilidad temporal
→ NO ORGANIZATIONAL_AREA REAL
```

No puede recibir como si fuera una unidad real:

- inventario;
- personal;
- permisos;
- responsabilidad;
- procesos.

La tarea no ejecuta su retiro físico.

---

#### 40. Puntos externos

`EXTERNAL_OPERATIONAL_POINT` no es una sede ordinaria.

Debe conservar, cuando se materialice:

- propósito;
- custodio;
- bienes o procesos permitidos;
- dirección protegida;
- vigencia;
- restricciones de acceso;
- relación con una sede o proceso propietario;
- evidencia de autorización.

No aparecerá por defecto como sede seleccionable para trabajadores, inventario o navegación general.

---

#### 41. Casos organizacionales aprobados

La experiencia deberá poder representar sin colapsar conceptos:

- Vento Group como `ORGANIZATION_SCOPE`;
- Vento Group S.A.S. como `LEGAL_SUBJECT`;
- Vento Café como marca, establecimiento cuando esté documentado, sede e instalación relacionadas;
- Saudo como marca, establecimiento cuando esté documentado, sede e instalación relacionadas;
- Molka como marca, establecimiento cuando esté documentado, sede e instalación relacionadas;
- Vento Producción como establecimiento o referencia comercial documentada cuando corresponda;
- Centro de Producción y Distribución como una instalación y una sede principal mientras no exista evidencia territorial independiente;
- Vaila Vainilla como marca o frente comercial con puntos externos pendientes de reconciliación, no como sede o titular jurídico por inferencia;
- Catering como línea de negocio o servicio sin sede propia.

La UI no debe presentar estas clasificaciones provisionales como validación externa completa cuando no la haya.

---

#### 42. Oficina 1

`Oficina 1` conserva el tratamiento aprobado:

```text
SEDE ADMINISTRATIVA INTERNA ACTIVA
RELACIÓN FÍSICA EXACTA PENDIENTE
ESTADO REGISTRAL NO VERIFICADO
DIRECCIÓN PÚBLICA NO PUBLICABLE SIN VALIDACIÓN
```

La sección debe permitir que un estado interno operativo coexista con validación registral pendiente.

No bloqueará toda la estructura por esa incertidumbre.

No publicará el dato pendiente como confirmado.

---

#### 43. Centro de Producción y Distribución

Se conserva:

```text
CENTRO DE PRODUCCIÓN Y DISTRIBUCIÓN
→ una instalación física
→ una sede operativa principal
→ varias áreas productivas, logísticas y de apoyo
```

`Distribución` no crea automáticamente una segunda sede.

Recepción, alistamiento y despacho pueden ser procesos, zonas o estaciones dentro de `Bodega y Abastecimiento` mientras el contrato propietario no determine otra cosa.

---

#### 44. Vento Café

La sección debe poder representar:

```text
Vento Café
→ BRAND
→ COMMERCIAL_ESTABLISHMENT cuando esté documentado
→ OPERATIONAL_SITE
→ PHYSICAL_FACILITY
→ áreas propias
→ canales asociados
```

Áreas objetivo conocidas:

- Servicio / Salón;
- Cocina;
- Barra.

Terraza es zona.

Caja y mostrador son estaciones, no áreas independientes por defecto.

---

#### 45. Saudo

La sección debe poder representar:

```text
Saudo
→ BRAND
→ COMMERCIAL_ESTABLISHMENT cuando esté documentado
→ OPERATIONAL_SITE
→ PHYSICAL_FACILITY
→ Área Operativa Integral
```

Las diferencias funcionales internas pueden expresarse por rol, estación, proceso y permiso sin crear áreas artificiales.

---

#### 46. Molka

La sección debe poder representar:

```text
Molka
→ BRAND
→ COMMERCIAL_ESTABLISHMENT cuando esté documentado
→ OPERATIONAL_SITE
→ PHYSICAL_FACILITY
→ Área Operativa Integral
```

No se presenta Cocina como área productiva mientras la realidad operativa aprobada no cambie.

---

#### 47. Vaila Vainilla

Se conserva la clasificación:

```text
BRAND / BUSINESS_FRONT
+ COMMERCIAL_CHANNELS
+ EXTERNAL_OPERATIONAL_POINTS PENDIENTES DE RECONCILIACIÓN
```

No se clasifica automáticamente como:

- titular jurídico independiente;
- establecimiento confirmado;
- sede formal;
- centro de costo definitivo;
- emisor único de factura.

La sección debe mostrar el carácter pendiente sin inventar una estructura definitiva.

---

#### 48. Centros de costo

El dominio puede mostrar una referencia financiera cuando exista un contrato canónico de NUMERA.

No define:

- maestro financiero de centros de costo;
- reglas de imputación;
- conciliación;
- contabilidad;
- presupuesto;
- facturación.

Se conserva:

```text
ORGANIZATIONAL_RELATION_TO_COST_CENTER
!=
FINANCIAL_OWNERSHIP
```

La semántica financiera permanece en NUMERA y sus contratos propietarios.

---

#### 49. Canales comerciales

`COMMERCIAL_CHANNEL` no es sede, marca ni titular.

La sección puede mostrar relaciones como `SERVES_CHANNEL`.

La configuración operativa y comercial del canal pertenece a su dominio propietario.

No se administra desde `Organización` por el solo hecho de estar relacionado con una marca o sede.

---

#### 50. Cambio estructural como proceso

El ciclo principal de `VPROC-0002` se conserva:

```text
STRUCTURE_CHANGE_REQUESTED
→ UNDER_VALIDATION
→ CHANGE_DESIGNED
→ PENDING_APPROVAL
→ APPROVED_FOR_IMPLEMENTATION
→ IN_IMPLEMENTATION
→ PENDING_VERIFICATION
→ STRUCTURE_CHANGE_VERIFIED
```

La experiencia no colapsará esos estados en un único formulario de guardar.

---

#### 51. Aprobación no equivale a vigencia verificada

Se conserva:

```text
APPROVED_FOR_IMPLEMENTATION
!=
STRUCTURE_CHANGE_VERIFIED
```

La aprobación autoriza un cambio.

No demuestra:

- que todas las relaciones fueron actualizadas;
- que los consumidores adoptaron la nueva estructura;
- que no quedan referencias legacy;
- que la proyección pública fue reconciliada;
- que las configuraciones de seguridad fueron revalidadas.

---

#### 52. Alta

Una alta organizacional deberá capturar, cuando aplique:

- tipo;
- código estable;
- nombre;
- propietario funcional;
- evidencia mínima;
- relaciones obligatorias;
- fecha de vigencia;
- capacidades iniciales explícitas cuando exista contrato propietario;
- revisión de autorización;
- consumidores afectados.

No se crea una entidad solo para satisfacer una ruta o una selección de interfaz.

---

#### 53. Cambio

Un cambio deberá conservar:

- motivo;
- actor;
- valor anterior;
- valor propuesto;
- fecha efectiva;
- consumidores afectados;
- tratamiento de operaciones abiertas;
- aprobación cuando corresponda;
- evidencia de verificación posterior.

La UI debe diferenciar edición ordinaria de cambio estructural sensible.

---

#### 54. Cierre, fusión o reemplazo

Antes de cerrar, fusionar o reemplazar un elemento se debe revisar, según aplique:

- trabajadores activos asignados;
- turnos o check-ins vigentes;
- inventario o LOC activos;
- documentos abiertos;
- compras abiertas;
- producción abierta;
- remisiones abiertas;
- pedidos abiertos;
- caja abierta;
- dispositivos compartidos activos;
- referencias públicas;
- integraciones;
- evidencia e historia que debe conservarse.

Un cierre con dependencias activas no se presenta como operación simple de borrado.

---

#### 55. No eliminación destructiva

Un elemento referenciado no se elimina de forma que rompa historia.

La experiencia debe favorecer:

- vigencia temporal;
- desactivación;
- reemplazo explícito;
- alias controlado;
- relación `REPLACED_BY`;
- trazabilidad.

La tarea no fija una API física específica.

---

#### 56. Revisión de impacto antes de publicar

`ADM-TASK-005` exige que un cambio organizativo sensible muestre impacto antes de producir efecto.

El preview de impacto debe poder responder, según la entidad:

```text
¿QUÉ TRABAJADORES QUEDAN AFECTADOS?
¿QUÉ TURNOS O CONTEXTOS TERRITORIALES QUEDAN AFECTADOS?
¿QUÉ CONFIGURACIONES DE SEGURIDAD DEBEN REVALIDARSE?
¿QUÉ LOC O INVENTARIO DEPENDEN DE LA SEDE O ÁREA?
¿QUÉ DOCUMENTOS O REGLAS LA REFERENCIAN?
¿QUÉ OPERACIONES ABIERTAS EXISTEN?
¿QUÉ DISPOSITIVOS COMPARTIDOS DEPENDEN DEL CONTEXTO?
¿QUÉ PROYECCIONES PÚBLICAS O INTEGRACIONES DEBEN ACTUALIZARSE?
```

El impacto es informativo y preventivo.

No reemplaza las validaciones server-side de cada owner.

---

#### 57. Impacto cross-app

Cada consumidor conserva su propia responsabilidad.

`Organización` puede identificar dependencias.

No ejecuta automáticamente:

- correcciones de personal;
- reprogramación de turnos;
- cambios de permisos;
- traslado de inventario;
- corrección de recetas;
- cambios de compras;
- cierre de cajas;
- actualizaciones de fidelización;
- asientos financieros.

Cada efecto requiere su proceso y autorización propietarios.

---

#### 58. Handoff a Acceso y seguridad

Cuando un cambio organizacional afecte scope, sede o área usados por autorización:

```text
Organización
→ registra cambio estructural
→ identifica configuraciones afectadas
→ handoff a Acceso y seguridad
→ revalidación por owner
```

No:

```text
Organización
→ concede, mueve o repara permisos automáticamente
```

---

#### 59. Handoff a Personal

Un cambio de sede o área no reasigna trabajadores silenciosamente.

La sección puede mostrar cuántas relaciones laborales dependen del elemento y conducir a `Personal`.

Las asignaciones laborales permanecen en su owner.

---

#### 60. Handoff a Programación

Un cambio territorial no modifica turnos publicados por efecto lateral.

La sección puede mostrar:

- turnos afectados;
- vigencias incompatibles;
- necesidad de revisión.

La modificación de programación permanece en `Programación`.

---

#### 61. Handoff a Operación

`VISO-UX-006` conserva la configuración y supervisión administrativa del contexto operativo.

`Organización` entrega:

- identidades de sede;
- identidades de área;
- zonas o estaciones cuando el contrato las use;
- vigencia;
- relaciones estructurales.

No absorbe:

- puntos de marcación;
- perfiles operativos;
- roles por sede;
- preview operativo;
- configuración operativa de ejecución.

---

#### 62. Handoff a NEXO

NEXO consume sedes y áreas.

NEXO conserva ownership sobre:

- LOC;
- posiciones;
- stock;
- inventario;
- contenedores;
- remisiones;
- ubicaciones logísticas propietarias.

Una sede o área puede ser prerequisite de esos objetos.

No los vuelve parte del catálogo organizacional editable.

---

#### 63. Handoff a PASS

PASS consume una proyección autorizada de:

- marca;
- sede;
- nombre público;
- dirección pública;
- coordenadas públicas;
- enlaces permitidos;
- estado de disponibilidad cuando el contrato lo defina.

Los overrides y metadatos de `pass_satellites` no sustituyen el catálogo organizacional.

La convergencia física permanece en sus tareas y transiciones propietarias.

---

#### 64. Handoff a NUMERA

NUMERA consume dimensiones:

- jurídicas;
- territoriales;
- operativas;
- de responsabilidad;
- de costo cuando corresponda.

NUMERA no redefine sedes o titulares.

VISO no redefine centros de costo, imputaciones o reglas contables.

---

#### 65. Políticas y responsabilidades

`VSCREEN-0009` puede aparecer desde `Organización` como superficie relacionada.

Debe preservar:

```text
ESTRUCTURA
!=
POLÍTICA
!=
RESPONSABILIDAD
!=
DELEGACIÓN
!=
PERMISO
```

Asignar un responsable funcional no concede automáticamente un permiso.

Publicar una política no crea automáticamente una relación estructural.

---

#### 66. Vigencia de políticas

Cuando la sección enlace políticas o delegaciones, debe distinguir:

- borrador;
- revisión;
- aprobación;
- publicación;
- vigencia;
- revisión posterior;
- cierre del ciclo de gobierno.

No presenta una versión aprobada pero no vigente como regla activa.

---

#### 67. Compromisos entre unidades

`VSCREEN-0010` puede aparecer como superficie relacionada para coordinación entre negocios, sedes y áreas.

Se conserva:

```text
COMMITMENT_ACCEPTED
!=
ORGANIZATIONAL_RELATION_CREATED
```

Un compromiso no altera la estructura maestra salvo que exista un cambio estructural separado y aprobado.

---

#### 68. Búsqueda

La sección debe permitir buscar por:

- código;
- nombre;
- tipo;
- estado;
- vigencia;
- relación;
- sede;
- marca;
- titular;
- validación pendiente.

La búsqueda no usa coincidencia de texto para inferir relaciones.

---

#### 69. Filtros

Filtros útiles incluyen:

- activos;
- en validación;
- suspendidos;
- cerrados;
- reemplazados;
- con validación externa pendiente;
- con cambios pendientes;
- con consumidores afectados;
- por tipo conceptual.

Los filtros son proyección de consulta.

No crean scope de autorización.

---

#### 70. Alcance territorial

La sección debe mostrar claramente qué parte de la estructura puede consultar o administrar el actor.

Se conserva:

```text
VISIBLE_ORGANIZATION_NODE
!=
AUTHORIZED_MUTATION
```

La mutación requiere autorización server-side exacta.

No se deriva de:

- breadcrumb;
- árbol visible;
- sede activa;
- rol nominal;
- nombre de empresa;
- relación padre-hijo.

---

#### 71. Navegación por árbol

Puede utilizarse un árbol o grafo para comprensión.

Ese árbol es una visualización.

No será la única fuente semántica porque la estructura contiene relaciones no estrictamente jerárquicas:

- una marca puede relacionarse con varias sedes;
- una instalación puede alojar más de un contexto;
- un titular puede relacionarse con varios establecimientos;
- una sede puede servir varios canales;
- un reemplazo conserva historia temporal.

La UI debe poder representar relaciones tipadas sin forzarlas a una sola jerarquía.

---

#### 72. Detalle de entidad

El detalle debe poder mostrar:

- identidad estable;
- nombre y código;
- tipo;
- estado;
- vigencia;
- propietario funcional;
- evidencia;
- relaciones entrantes y salientes;
- consumidores;
- cambios pendientes;
- historial relevante;
- acciones autorizadas;
- handoffs.

La densidad se adapta al tipo de elemento.

---

#### 73. Historial

Renombrar, mover, cerrar, fusionar o reemplazar no borra la historia.

La experiencia debe permitir reconstruir:

- valor anterior;
- relación anterior;
- vigencia;
- actor;
- motivo;
- decisión;
- elemento reemplazante cuando exista.

La auditoría detallada puede residir en el dominio `Auditoría`.

`Organización` muestra la historia necesaria para comprender el estado actual y el cambio.

---

#### 74. Auditoría no es estado actual

Se conserva:

```text
CURRENT_ORGANIZATION_STATE
!=
AUDIT_HISTORY
```

El estado actual proviene de la fuente canónica vigente.

La auditoría explica cómo cambió.

No se reconstruye el estado actual tomando la última fila visible de un log sin contrato.

---

#### 75. Errores de consistencia

La sección debe diferenciar:

- dato inexistente;
- relación ausente;
- validación externa pendiente;
- conflicto estructural;
- referencia legacy;
- dependencia activa que bloquea cierre;
- fallo técnico de lectura;
- falta de autorización.

No los colapsa en `No disponible`.

---

#### 76. Conflictos estructurales

Ejemplos que deben tratarse como conflicto o inconsistencia, según contrato:

- área vinculada a una sede distinta de la declarada;
- relación temporal solapada incompatible;
- elemento cerrado presentado como activo;
- relación de reemplazo cíclica;
- tipo conceptual incompatible con una relación;
- duplicación de identidad canónica;
- uso de un agregado `Todos` como área real;
- sede creada por inferencia desde un nombre;
- dos fuentes editables compitiendo por el mismo campo canónico.

La UI no debe reparar el conflicto escogiendo silenciosamente una fila.

---

#### 77. Concurrencia

Antes de guardar un cambio estructural sensible se debe revalidar:

- versión;
- estado;
- vigencia;
- relaciones relevantes;
- consumidores afectados;
- dependencias bloqueantes;
- autoridad del actor.

Si la base cambió desde el preview, la UI no debe aplicar el cambio sobre una versión obsoleta sin reconciliación.

---

#### 78. Estado stale

Una vista abierta de estructura puede quedar obsoleta por:

- modificación paralela;
- cambio de vigencia;
- nueva evidencia externa;
- cierre de una dependencia;
- cambio de autorización;
- actualización contractual.

La experiencia debe detectar la pérdida de frescura antes de una mutación sensible.

---

#### 79. Confirmación de acciones sensibles

Altas, cierres, fusiones, reemplazos y cambios de titular o vigencia pueden requerir confirmación reforzada según riesgo.

La confirmación debe mostrar:

- objeto;
- cambio;
- fecha efectiva;
- impacto;
- dependencias;
- consecuencias conocidas;
- handoffs pendientes.

La confirmación no sustituye la autorización.

---

#### 80. Receipts

Una mutación aceptada debe producir evidencia suficiente para responder:

- qué cambió;
- sobre qué identidad;
- quién lo realizó;
- cuándo;
- con qué vigencia;
- qué quedó pendiente;
- qué consumidores requieren reconciliación;
- qué verificación posterior falta.

Un receipt no significa que el ciclo `VPROC-0002` ya alcanzó `STRUCTURE_CHANGE_VERIFIED`.

---

#### 81. Publicación y proyección externa

Un dato interno no se publica automáticamente.

La sección debe distinguir:

```text
INTERNAL_ACTIVE
PUBLICABLE
EXTERNALLY_VERIFIED
```

Un elemento puede ser válido para operación interna y no estar permitido para publicación externa.

---

#### 82. Direcciones

La experiencia debe diferenciar:

- dirección física;
- dirección registral;
- dirección de correspondencia;
- dirección pública comercial;
- referencia interna;
- coordenadas;
- vigencia;
- fuente.

PASS no necesita recibir una dirección privada interna.

Contabilidad puede necesitar una dirección registral distinta de la dirección pública.

---

#### 83. Privacidad

Los puntos externos pueden incluir direcciones sensibles.

La sección debe aplicar minimización y autorización antes de mostrar:

- domicilios privados;
- documentos jurídicos;
- contactos protegidos;
- evidencia sensible;
- coordenadas no públicas.

La relación con una entidad no hace públicos sus datos.

---

#### 84. Archivos y evidencia

Los documentos que acreditan titularidad, matrícula, dirección o relación pueden mostrarse como evidencia vinculada.

El almacenamiento, visor, retención y gobierno documental permanecen en su owner.

`Organización` consume referencias y estados.

No crea un subsistema documental paralelo.

---

#### 85. Responsive

La estructura debe conservar comprensión en escritorio y móvil.

En pantallas estrechas:

- el tipo conceptual sigue visible;
- el código estable no desaparece cuando sea necesario para desambiguar;
- estado y vigencia siguen distinguibles;
- relaciones principales siguen navegables;
- acciones sensibles no se convierten en iconos ambiguos;
- el árbol no será el único mecanismo de navegación.

---

#### 86. Accesibilidad

La diferenciación entre:

- tipo;
- estado;
- pendiente;
- conflicto;
- relación;
- validación externa;

no dependerá únicamente de color.

Los controles deben tener etiquetas comprensibles y orden de foco coherente.

---

#### 87. Lenguaje humano

Las etiquetas primarias usarán lenguaje empresarial.

La UI no presentará como conceptos principales:

- tabla `sites`;
- tabla `areas`;
- schema;
- FK;
- RPC;
- `site_type`;
- `pass_satellites`;
- `inventory_locations`;
- nombres de migraciones.

Esos detalles pueden aparecer en diagnóstico técnico autorizado, no como taxonomía de negocio.

---

#### 88. Códigos técnicos y nombres humanos

El código estable puede mostrarse como información secundaria.

El nombre humano puede cambiar.

Se conserva:

```text
DISPLAY_NAME_CHANGE
!=
IDENTITY_CHANGE
```

Renombrar no crea una nueva identidad.

---

#### 89. Deep links

Un deep link hacia sede, área u otra entidad debe revalidar:

- sesión;
- acceso a VISO;
- permiso exacto;
- territorio;
- recurso;
- estado;
- vigencia;
- sensibilidad.

La URL no transporta autoridad.

---

#### 90. Navegación a consumidores

Desde un detalle organizacional se pueden ofrecer enlaces contextuales a:

- Personal;
- Programación;
- Acceso y seguridad;
- Operación;
- NEXO;
- PASS;
- NUMERA;
- gobierno documental;
- Auditoría.

El destino revalida su autorización.

El handoff conserva el identificador canónico necesario y no una copia mutable del objeto.

---

#### 91. No wildcard por `viso.access`

`viso.access` puede permitir entrada a la aplicación cuando el contrato vigente lo admita.

No concede automáticamente:

- crear titular;
- editar marca;
- crear sede;
- cerrar área;
- fusionar elementos;
- cambiar vigencia;
- publicar datos externos;
- administrar documentos;
- editar consumidores.

Cada acción sensible requiere su capacidad exacta cuando exista.

---

#### 92. AS-IS de `/businesses*`

La evidencia actual muestra que las rutas `/businesses*` usan guard de acceso a VISO y administran `pass_satellites`, además de tocar `sites` en altas o ediciones.

Esto se clasifica como implementación transitoria mixta.

No se certifica como patrón target de ownership.

La futura materialización deberá separar la mutación estructural de la proyección PASS y proteger cada operación con su contrato propietario.

---

#### 93. AS-IS de `/sites`

La evidencia actual muestra que `/sites`:

- lee `sites`;
- consulta `areas`;
- consulta `inventory_locations`;
- consulta `pass_satellites`;
- presenta enlaces a detalles y superficies relacionadas.

La lectura agregada es compatible con una vista de organización si cada dato conserva owner.

No autoriza editar todos esos dominios desde la misma sección.

---

#### 94. AS-IS de `/sites/[id]`

La evidencia actual muestra acciones que administran `areas` y `inventory_locations` desde el mismo detalle, además de componentes de operación.

La tarea clasifica esta composición como mezcla física de transición.

La semántica target exige separar:

- estructura organizacional;
- ubicación de inventario;
- operación;
- documentos.

No se retira ni modifica físicamente la ruta desde esta tarea.

---

#### 95. AS-IS de `/sites/[id]/documentos`

La evidencia actual muestra acciones sobre `required_document_rules` con `site_id` como contexto.

El mapa de transición de datos clasifica esa familia dentro del dominio documental y de evidencia, no dentro de la estructura organizacional.

La sección `Organización` conservará un handoff contextual.

No absorberá la mutación documental.

---

#### 96. No duplicación

Una capacidad no tendrá dos editores activos con autoridad equivalente.

Se conserva:

```text
OWNER_MUTATION
+ CONSUMER_PROJECTION
+ HANDOFF
```

No:

```text
OWNER_MUTATION
+ LOCAL_COPY_MUTATION
+ MANUAL_RECONCILIATION
```

---

#### 97. Regla de retiro

Una superficie transitoria solo puede retirarse después de demostrar:

- reemplazo protegido;
- equivalencia funcional;
- consumidores migrados;
- deep links tratados;
- autorización equivalente;
- observabilidad;
- rollback;
- validación de usuario;
- monitoreo posterior.

Esta tarea no declara retiradas las rutas mixtas.

---

#### 98. Relación con `VISO-UX-013`

`VISO-UX-013 — Limitar información según alcance territorial` desarrollará el patrón transversal de qué parte de la estructura puede ver cada actor.

`VISO-UX-005` define que estructura y autoridad son distintas.

No reemplaza la tarea transversal de alcance visible.

---

#### 99. Relación con `VISO-UX-014`

`VISO-UX-014 — Mostrar origen de permisos de forma comprensible` pertenece al dominio de seguridad.

`Organización` puede mostrar que una relación o vigencia afecta contexto.

No explica procedencia de permisos por su cuenta.

---

#### 100. Relación con `VISO-UX-015`

`VISO-UX-015 — Mostrar conflictos antes de guardar` desarrollará el patrón transversal de pre-save conflict.

`Organización` entrega conflictos estructurales e impacto como casos consumidores de ese patrón.

---

#### 101. Relación con `VISO-UX-016`

`VISO-UX-016 — Permitir vista previa exacta de cada trabajador` utiliza estructura organizacional como contexto.

No convierte el preview de trabajador en editor de sedes o áreas.

---

#### 102. Relación con `VISO-UX-017`

`VISO-UX-017 — Evitar duplicar configuración propia de otras aplicaciones` recibe directamente:

- `pass_satellites` versus estructura organizacional;
- `inventory_locations` dentro del detalle de sede;
- reglas documentales dentro de `/sites/[id]/documentos`;
- cualquier editor cross-owner detectado durante materialización.

---

#### 103. Relación con `VISO-UX-018`

`VISO-UX-018 — Enlazar a la aplicación propietaria cuando corresponda` desarrollará los handoffs definitivos hacia NEXO, PASS, NUMERA y otros owners.

`VISO-UX-005` deja identificados los cruces y el contexto que deben conservar.

---

#### 104. Relación con `VISO-UX-019`

`VISO-UX-019 — Aplicar divulgación progresiva a seguridad avanzada` no es sustituida por esta tarea.

`Organización` aplica divulgación progresiva general, pero no diseña la experiencia avanzada de seguridad.

---

#### 105. Relación con `VISO-UX-020`

`VISO-UX-020 — Ejecutar pruebas con administradores reales` deberá validar, entre otros casos:

- distinguir marca de sede;
- distinguir sede de área;
- comprender estado jurídico pendiente;
- identificar owner de un dato mixto;
- interpretar impacto antes de un cierre;
- encontrar un handoff sin duplicar edición;
- reconocer que una jerarquía visible no concede acceso.

Esta tarea no declara esas pruebas ejecutadas.

---

#### 106. Handoff hacia `VISO-UX-006`

`VISO-UX-006 — Crear sección Operación` recibe una frontera explícita:

```text
Organización
→ define identidades estructurales y relaciones
→ define vigencia organizativa
→ entrega sede, área, zona o estación cuando existan contractualmente
→ no administra el contexto operativo de ejecución

Operación
→ consume estructura válida
→ administra configuración y supervisión operativa propia de VISO
→ no redefine la organización
```

Debe preservarse:

```text
ORGANIZATIONAL_STRUCTURE
!=
OPERATIONAL_CONFIGURATION
```

`VISO-UX-006` deberá recibir, como mínimo:

- `OPERATIONAL_SITE` vigente;
- `ORGANIZATIONAL_AREA` vigente;
- zonas o estaciones contractuales cuando apliquen;
- relaciones necesarias para resolver contexto;
- exclusión de LOC como estructura organizacional;
- exclusión de proyección PASS como estructura operativa;
- prohibición de inferir capacidades desde nombre o `site_type`.

---

#### 107. Carryovers

| Carryover | Owner | Condición de salida |
| --- | --- | --- |
| materializar la sección y sus subviews | instancia física de `VISO-UX-005` | package y `POST_E5_PACKAGE` satisfechos, autorización física propia y validaciones de implementación |
| completar catálogo de titulares, marcas y establecimientos | transición E3/E5 y owners ya definidos por `CAP-SCOPE-001` | modelo canónico persistido, migrado y validado sin fuentes competidoras |
| separar `sites` de `pass_satellites` | transición propietaria de PASS y Supabase | propiedad de campos, proyección y consumidores reconciliados |
| separar LOC del detalle estructural | NEXO + `VISO-UX-017/018` | handoff o superficie propietaria protegida disponible |
| separar reglas documentales de la ruta de sede | owner documental + `VISO-UX-017/018` | superficie propietaria protegida y handoff validado |
| limitar información por territorio | `VISO-UX-013` | patrón transversal de alcance visible aprobado y materializado |
| conflictos pre-save | `VISO-UX-015` | patrón final de conflicto antes de guardar aprobado |
| handoffs cross-app | `VISO-UX-018` | contrato de enlace y revalidación de destino aprobado |
| pruebas con administradores reales | `VISO-UX-020` | piloto controlado y criterios de readiness satisfechos |

---

#### 108. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la integridad semántica de organización, titulares, marcas, establecimientos, sedes, áreas, zonas, estaciones, canales y puntos externos ya está protegida por el Registro Canónico; también existen requisitos vigentes para fuente única, proyecciones consumidoras, navegación, ownership, rutas VISO, autorización territorial y convergencia PASS. Esta tarea compone esas decisiones en la experiencia `Organización` y clasifica superficies AS-IS sin crear entidades, relaciones, permisos, tablas, migraciones, mutaciones o reglas de negocio nuevas.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 109. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico, la tarea reutiliza especialmente:

- `TREQ-SUPABASE-011` para integridad semántica, identidad estable, relaciones tipadas, ausencia de fusiones por nombre o metadato, conservación histórica y no competencia de fuentes;
- `TREQ-INTEGRATION-006` para una sola captura propietaria y propagación por contratos o eventos;
- `TREQ-AUTH-009` para resolución territorial determinista y ausencia de ampliación de alcance por estructura visible;
- `TREQ-VISO-001` para coherencia entre sedes, áreas, autorización, preview, conflictos y consumidores;
- `TREQ-VISO-004` y `TREQ-VISO-005` para conservar el inventario y las identidades de rutas VISO;
- `TREQ-VISO-022` y `TREQ-VISO-023` para no retirar prematuramente superficies y reconciliar el universo completo de rutas;
- `TREQ-UX-005` para fuente de verdad visible, corrección trazable y ausencia de copias competidoras;
- `TREQ-UX-020` para ownership y contrato consistentes entre aplicaciones;
- `TREQ-UX-023` para clasificación y retiro gobernado de superficies;
- `TREQ-PASS-004` para que los datos de sede mostrados por PASS correspondan a la fuente canónica;
- `TREQ-PASS-006` para convergencia de `site_id`, marca, dirección y experiencia comercial.

La mención en esta sección es trazabilidad heredada y no una modificación de 04A.

---

#### 110. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-005`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en una rama documental de `VISO-UX-005`. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, protocolo, contrato de entrega, secuencia activa, topología, políticas de tarea, owner del minibloque, `VISO-UX-001..004` publicados y `VISO-UX-005` como tarea actual pendiente, `CAP-SCOPE-001`, `ADM-TASK-001..005`, `VSCREEN-0008..0010`, `VPROC-0002..0004`, inventario `VISO-ROUTE-001..061`, Registro 04A aplicable, scripts documentales vigentes y el AS-IS actual de `/businesses*` y `/sites*` en `vento-viso/main`. |
| OPERATIVA | NOT_EXECUTED | No se crearon, cerraron, fusionaron, trasladaron ni reclasificaron entidades reales; no se modificaron sedes, áreas, trabajadores, inventario, permisos, PASS, documentos o datos financieros. |
| FÍSICA | NOT_EXECUTED | No se modificaron UI, rutas, Server Actions, contratos, catálogos, Supabase, migraciones, RLS, Auth, datos ni despliegues; la materialización permanece por `implementation_unit_id` detrás de `POST_E5_PACKAGE`. |

---

#### 111. Criterios de aceptación

1. existe exactamente un contrato `VISO-ORGANIZATION-SECTION-001`;
2. la tarea conserva `VISO-UX-004` como anterior y `VISO-UX-006` como siguiente;
3. la topología permanece `PER_IMPLEMENTATION_UNIT`;
4. el gate físico permanece `POST_E5_PACKAGE`;
5. `Organización` es el cuarto dominio administrativo definido por `VISO-UX-001`;
6. `VSCREEN-0008` permanece como pantalla canónica principal;
7. `VPROC-0002` permanece como proceso principal;
8. `VPROC-0003` y `VPROC-0004` se presentan como procesos relacionados y no como estados de `VPROC-0002`;
9. `ADM-TASK-001..005` conservan su ownership `ADM-ORG`;
10. el universo conceptual distingue `ORGANIZATION_SCOPE`;
11. distingue `LEGAL_SUBJECT`;
12. distingue `BRAND`;
13. distingue `COMMERCIAL_ESTABLISHMENT`;
14. distingue `BUSINESS_LINE`;
15. distingue `PHYSICAL_FACILITY`;
16. distingue `OPERATIONAL_SITE`;
17. distingue `ORGANIZATIONAL_AREA`;
18. distingue `PHYSICAL_ZONE`;
19. distingue `WORKSTATION`;
20. distingue `COMMERCIAL_CHANNEL`;
21. distingue `EXTERNAL_OPERATIONAL_POINT`;
22. un centro de costo no se vuelve maestro financiero de VISO;
23. cada elemento conserva identidad estable cuando aplique;
24. el nombre visible no sustituye el ID o código canónico;
25. las relaciones son tipadas;
26. compartir nombre no crea relación;
27. compartir dirección no crea relación;
28. compartir titular no fusiona entidades;
29. estado jurídico y operativo permanecen separados;
30. validación externa pendiente no se muestra como confirmada;
31. realidad operativa confirmada puede representarse sin fingir verificación registral;
32. existe una sola fuente interna canónica de estructura;
33. consumidores reciben proyecciones y no copias editables equivalentes;
34. PASS permanece consumidor de proyección pública;
35. NEXO permanece owner de LOC e inventario;
36. NUMERA permanece owner de semántica financiera propia;
37. `/sites` se clasifica como `VISO_DOMAIN_ENTRY`;
38. `/sites/[id]` se clasifica como `CHILD_OR_DETAIL_ROUTE`;
39. `/sites/[id]/documentos` se clasifica como `CROSS_OWNER_TRANSITION`;
40. `/businesses` se clasifica como `CROSS_OWNER_TRANSITION`;
41. `/businesses/new` se clasifica como `CROSS_OWNER_TRANSITION`;
42. `/businesses/[id]` se clasifica como `CROSS_OWNER_TRANSITION`;
43. las seis identidades de ruta permanecen estables;
44. la clasificación no retira físicamente rutas;
45. `pass_satellites` no se declara catálogo organizacional canónico;
46. `sites` y `pass_satellites` pueden coexistir con ownership explícito;
47. la alta de sede se separa conceptualmente de la configuración PASS;
48. crear una sede no la publica automáticamente en PASS;
49. LOC no se edita como parte de la estructura organizacional target;
50. `required_document_rules` no se presenta como parte del catálogo organizacional;
51. el detalle de sede reconoce la mezcla física AS-IS;
52. el target separa estructura, inventario, operación y documentos;
53. un área no es rol;
54. un área no es permiso;
55. una zona no es área por defecto;
56. una estación no es área por defecto;
57. `Todos` o `General` no se presenta como unidad organizacional real;
58. `site_type` no concede capacidad;
59. el nombre de sede no concede capacidad;
60. la marca no es scope de autorización por defecto;
61. el titular jurídico no sustituye contexto operativo;
62. la instalación física no concede acceso a todos los contextos;
63. un punto externo no es sede ordinaria;
64. Oficina 1 conserva estado provisional seguro;
65. Vento Group ecosistema y Vento Group S.A.S. titular permanecen separados;
66. Vento Café puede conservar identidades relacionadas separadas;
67. Saudo puede conservar identidades relacionadas separadas;
68. Molka puede conservar identidades relacionadas separadas;
69. Vaila no se convierte en sede o titular por inferencia;
70. Catering no se convierte en sede por inferencia;
71. Centro de Producción y Distribución no se duplica como sede sin evidencia;
72. distribución puede expresarse como capacidad o proceso sin crear sede;
73. `VPROC-0002` conserva los ocho estados aprobados;
74. `APPROVED_FOR_IMPLEMENTATION` no equivale a `STRUCTURE_CHANGE_VERIFIED`;
75. alta estructural conserva tipo, código, nombre, owner, evidencia, relaciones y vigencia;
76. cambio estructural conserva motivo, actor, antes, después, fecha efectiva e impacto;
77. cierre o fusión revisa dependencias activas;
78. no se exige borrado destructivo de identidades históricas;
79. existe preview de impacto conceptual antes de cambios sensibles;
80. preview de impacto no ejecuta efectos cross-app;
81. Organización no reasigna trabajadores silenciosamente;
82. Organización no modifica turnos silenciosamente;
83. Organización no concede permisos silenciosamente;
84. Organización no traslada inventario silenciosamente;
85. Organización no reescribe datos PASS silenciosamente;
86. Organización no reescribe centros de costo silenciosamente;
87. existe handoff hacia Personal cuando hay asignaciones afectadas;
88. existe handoff hacia Programación cuando hay turnos afectados;
89. existe handoff hacia Acceso y seguridad cuando hay configuración territorial afectada;
90. existe handoff hacia Operación para configuración operativa;
91. existe handoff hacia NEXO para LOC e inventario;
92. existe handoff hacia PASS para proyección comercial;
93. existe handoff hacia NUMERA para semántica financiera;
94. `VSCREEN-0009` no convierte políticas en estructura;
95. `VSCREEN-0010` no convierte compromisos en relaciones permanentes;
96. búsqueda no infiere relaciones por texto;
97. filtros no crean scope;
98. árbol visual no es fuente de autorización;
99. relaciones no estrictamente jerárquicas pueden representarse;
100. detalle conserva identidad, relaciones, vigencia y consumers;
101. historial no se borra al renombrar o reemplazar;
102. auditoría no se confunde con estado actual;
103. conflictos estructurales no se reparan eligiendo silenciosamente una fila;
104. concurrencia se revalida antes de guardar;
105. estado stale bloquea una mutación sensible hasta reconciliación;
106. acciones sensibles muestran impacto antes de confirmación;
107. receipts no declaran verificación final por sí solos;
108. dato interno activo no implica publicable;
109. direcciones conservan tipos distintos;
110. datos sensibles de puntos externos se minimizan;
111. evidencia documental se referencia sin crear un subsistema paralelo;
112. responsive conserva tipo, estado y vigencia;
113. accesibilidad no depende solo de color;
114. lenguaje primario no usa nombres de tablas como taxonomía de negocio;
115. cambio de nombre no cambia identidad;
116. deep links revalidan autorización;
117. handoffs revalidan autorización en destino;
118. `viso.access` no es wildcard de mutaciones organizacionales;
119. el AS-IS de `/businesses*` queda descrito como mezcla transitoria;
120. el AS-IS de `/sites*` queda descrito sin canonizar la mezcla;
121. no existen dos editores target para la misma capacidad;
122. ninguna ruta se retira sin gates de sustitución;
123. `VISO-UX-013` conserva alcance visible transversal;
124. `VISO-UX-015` conserva patrón de conflicto pre-save;
125. `VISO-UX-017` conserva no duplicación cross-app;
126. `VISO-UX-018` conserva handoffs definitivos;
127. `VISO-UX-020` conserva pruebas con administradores reales;
128. `VISO-UX-006` recibe el handoff exacto de estructura hacia Operación;
129. los carryovers tienen owner y condición de salida;
130. no se crean requisitos de prueba;
131. no se modifican requisitos de prueba;
132. no se realizan cambios físicos desde esta tarea documental.

---

#### 112. Límites

Esta tarea no:

- modifica el catálogo organizacional físico;
- crea tablas;
- crea migraciones;
- crea datos;
- hace backfill;
- crea titulares jurídicos reales;
- verifica documentos externos;
- cambia titularidad;
- cambia facturación;
- cambia recaudo;
- crea o cierra sedes reales;
- crea o cierra áreas reales;
- crea zonas reales;
- crea estaciones reales;
- crea puntos externos reales;
- elimina `Todos` o `General` físicamente;
- modifica `sites`;
- modifica `areas`;
- modifica `inventory_locations`;
- modifica `pass_satellites`;
- modifica `required_document_rules`;
- modifica capacidades operativas;
- modifica `site_type`;
- modifica asignaciones laborales;
- modifica programación;
- modifica permisos;
- modifica matrices de seguridad;
- modifica perfiles operativos;
- modifica documentos;
- modifica centros de costo;
- modifica contabilidad;
- modifica PASS;
- modifica NEXO;
- modifica NUMERA;
- modifica datos públicos;
- publica direcciones;
- publica información registral;
- crea permisos;
- crea roles;
- crea scopes;
- define una API física nueva;
- define una tabla física nueva por cada tipo conceptual;
- obliga a una jerarquía de árbol única;
- inventa rutas nuevas;
- renumera `VISO-ROUTE-*`;
- retira rutas existentes;
- ejecuta una instancia física;
- sustituye `VISO-UX-006..020`;
- ejecuta pruebas con administradores reales;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

---

#### 113. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-004 — Crear sección Acceso y seguridad`

**TAREA ACTUAL APROBADA**
`VISO-UX-005 — Crear sección Organización`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-006 — Crear sección Operación`
### ✅ VISO-UX-006 — Crear sección Operación

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-005 — Crear sección Organización
**Tarea siguiente:** VISO-UX-007 — Crear sección Auditoría
**Tipo de tarea:** definición técnico-documental de la sección administrativa `Operación` de VISO; compone la configuración y supervisión del contexto operativo que VISO administra —puntos de marcación, catálogo y elegibilidad de roles operativos, perfiles operativos por trabajador y sede, y preview diagnóstico— sin convertir esa configuración en autorización real, turno publicado, check-in, permiso efectivo ni ejecución propietaria de NEXO, FOGO, ORIGO, PULSO, NUMERA, PASS o ANIMA, conservando `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la sección `Operación` definido; su materialización runtime permanece pendiente por `implementation_unit_id` y detrás del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, rutas, navegación runtime, componentes, Supabase, contratos compartidos, datos, migraciones, RLS, RPC, Auth, Storage, secretos, roles, permisos, turnos, asistencia, LOC, capacidades de otras aplicaciones, auditoría ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la sección administrativa `Operación` de VISO para que una persona autorizada pueda configurar y supervisar el contexto operativo que conecta trabajador, sede, área, rol operativo y puntos físicos sin confundir configuración administrativa con autorización, programación, asistencia o ejecución empresarial.

La sección debe responder de forma directa:

```text
¿QUÉ CONTEXTO OPERATIVO PUEDE EXISTIR EN UNA SEDE Y ÁREA?
¿QUÉ ROLES OPERATIVOS ESTÁN ADMITIDOS EN CADA CONTEXTO?
¿QUÉ ROL ES DEFAULT Y QUÉ SIGNIFICA REALMENTE ESE DEFAULT?
¿QUÉ PUNTOS FÍSICOS PUEDEN USARSE PARA ENTRADA O SALIDA?
¿QUÉ PERFIL OPERATIVO TIENE UN TRABAJADOR COMO PREFERENCIA O BASE DE PLANIFICACIÓN?
¿QUÉ PARTE DEL CONTEXTO VIENE DE ORGANIZACIÓN?
¿QUÉ PARTE LA FIJA UN TURNO PUBLICADO?
¿QUÉ PARTE LA ACTIVA ANIMA DURANTE LA JORNADA?
¿QUÉ PARTE ES SEGURIDAD Y NO DEBE EDITARSE AQUÍ?
¿QUÉ CONFIGURACIÓN ESTÁ INCOMPLETA, INCOMPATIBLE O STALE?
¿QUÉ CAMBIO ADMINISTRATIVO SE HARÁ Y QUÉ CONSUMIDORES PUEDE AFECTAR?
¿QUÉ HANDOFF CORRESPONDE CUANDO LA MUTACIÓN PERTENECE A OTRO OWNER?
```

`Operación` no es la operación empresarial de Vento OS.

Es la experiencia administrativa de VISO para gobernar la configuración de contexto que otras aplicaciones consumen durante una operación autorizada.

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001` entrega sin reapertura:

```text
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
```

Para `Operación` entrega además:

- la familia física `VISO-ROUTE-024..029` como seis superficies candidatas que requieren clasificación final;
- la regla `MULTIPLE_CHILD_ROUTES → ONE_PRIMARY_DOMAIN_ENTRY`;
- la obligación de mantener `/operations` como entrada primaria observada cuando la materialización respete ownership y autorización;
- la conservación de todas las identidades `VISO-ROUTE-*`;
- la prohibición de convertir ubicación física de una ruta en ownership funcional;
- la obligación de no absorber ejecución de otras aplicaciones;
- la navegación data-driven y fail-closed;
- la separación entre navegación visible y autoridad real.

Se preserva:

```text
VISO_ADMINISTRA_EL_MODELO = YES
VISO_ES_PROPIETARIO_UNIVERSAL_DE_LA_OPERACION = NO
NAVEGACION_ES_AUTORIZACION = NO
RUTA_VISIBLE_ES_AUTORIZACION = NO
```

---

#### 3. Handoff recibido de `VISO-UX-003`

`Programación` conserva la creación, revisión y publicación de turnos.

`Operación` puede consumir el contexto derivado de un turno publicado para explicar o diagnosticar configuración posterior.

Se conserva:

```text
PROGRAMACION_PUBLICADA
!=
CONTEXTO_OPERATIVO_ACTIVO
```

Un turno puede declarar:

- sede;
- área;
- rol operativo;
- punto de entrada;
- punto de salida;
- vigencia temporal.

Pero la mera existencia del turno no demuestra:

- check-in activo;
- permiso efectivo;
- sesión válida;
- contexto fresco;
- autorización para ejecutar una acción concreta.

`Operación` no modifica silenciosamente turnos para corregir su propia configuración.

Cuando detecte incompatibilidad con un turno publicado deberá mostrarla y conducir al owner de Programación.

---

#### 4. Handoff recibido de `VISO-UX-004`

`Acceso y seguridad` conserva ownership semántico sobre:

- catálogo y asignación de permisos;
- matrices de seguridad;
- grants;
- denies;
- excepciones;
- simulación canónica de autorización;
- procedencia de permisos;
- conflictos de seguridad;
- administración restringida de seguridad.

Las superficies físicas `/operations/site-roles` y `/operations/preview` permanecen en la familia observada de `Operación`, pero su ubicación no crea un segundo evaluador de seguridad.

Se conserva:

```text
MATRIZ_OPERATIVA
!=
MATRIZ_DE_PERMISOS

PREVIEW_OPERATIVO
!=
SIMULACION_CANONICA_DE_AUTORIZACION

ROL_OPERATIVO_ADMITIDO
!=
PERMISO_EFECTIVO
```

`Operación` puede administrar elegibilidad operativa y mostrar diagnóstico.

No puede conceder autoridad por efecto lateral.

---

#### 5. Handoff recibido de `VISO-UX-005`

`Organización` entrega:

- `OPERATIONAL_SITE` vigente;
- `ORGANIZATIONAL_AREA` vigente;
- zonas o estaciones contractuales cuando apliquen;
- relaciones estructurales válidas;
- vigencia organizativa;
- identidad estable de los elementos.

`Operación` consume esa estructura.

No la redefine.

Se conserva:

```text
ORGANIZATIONAL_STRUCTURE
!=
OPERATIONAL_CONFIGURATION
```

La sección no podrá inferir capacidades por:

- nombre visible;
- `site_type`;
- `site_kind`;
- marca;
- dirección;
- pertenencia a una instalación;
- coincidencia textual.

LOC, posiciones y ubicaciones de inventario no se convierten en estructura organizativa ni en configuración operativa propietaria de VISO.

---

#### 6. Contrato de sección

Se define:

```text
VISO_OPERATION_SECTION_CONTRACT = VISO-OPERATION-SECTION-001
DOMAIN_LABEL = Operación
DOMAIN_ORDER = 5
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-024
PRIMARY_OBSERVED_ROUTE = /operations
OBSERVED_ROUTE_FAMILY = VISO-ROUTE-024..029
OBSERVED_ROUTE_COUNT = 6
CANONICAL_SCREEN_INVENTED_BY_THIS_TASK = NO
CANONICAL_PROCESS_INVENTED_BY_THIS_TASK = NO
MUTATION_OWNER_IS_ROUTE_LOCATION = NO
OPERATION_CONFIGURATION_IS_AUTHORIZATION = NO
OPERATION_CONFIGURATION_IS_SCHEDULE = NO
OPERATION_CONFIGURATION_IS_ATTENDANCE = NO
OPERATION_CONFIGURATION_IS_BUSINESS_EXECUTION = NO
```

El catálogo E2 vigente no demuestra una identidad `VSCREEN-*` única equivalente a toda la familia `/operations*`.

Esta tarea no inventa una pantalla o proceso para llenar ese vacío.

La sección se define por dominio administrativo, ownership y contratos consumidos.

---

#### 7. Frontera semántica principal

`Operación` administra configuración y supervisión de contexto.

No ejecuta el trabajo operativo de las aplicaciones propietarias.

```text
VISO / OPERACION
→ configura contexto
→ configura elegibilidad operativa
→ configura puntos físicos aplicables
→ configura defaults administrativos
→ diagnostica coherencia
→ proyecta impacto

ANIMA
→ activa experiencia personal del trabajador
→ ejecuta check-in / pausa / check-out propios

NEXO
→ ejecuta inventario y logística

FOGO
→ ejecuta producción

ORIGO
→ ejecuta compras y recepción propietaria

PULSO
→ ejecuta venta y operación comercial

NUMERA
→ ejecuta dominio financiero

PASS
→ ejecuta experiencia del cliente
```

VISO no se vuelve editor universal por centralizar configuración administrativa.

---

#### 8. Entrada principal observada

`VISO-ROUTE-024 — /operations` es la entrada física observada principal de la familia.

El runtime actual la presenta como centro de configuración del contexto operativo.

La experiencia objetivo debe usarla como entrada de dominio solo cuando:

- la entrada de navegación esté gobernada;
- el usuario tenga acceso administrativo válido a VISO;
- las subcapacidades visibles estén filtradas por autoridad;
- cada mutación conserve su owner real;
- las superficies cross-owner no sean tratadas como editores propios de VISO.

La existencia de `/operations` no concede acceso a todos sus hijos.

---

#### 9. Disposición de la familia `VISO-ROUTE-024..029`

| Route ID | Patrón observado | Decisión de dominio | Clase de navegación | Propiedad semántica |
| --- | --- | --- | --- | --- |
| `VISO-ROUTE-024` | `/operations` | `Operación` | `VISO_DOMAIN_ENTRY` | composición y entrada del dominio |
| `VISO-ROUTE-025` | `/operations/checkin-points` | `Operación` | `CHILD_OR_DETAIL_ROUTE` | configuración administrativa de puntos físicos de marcación |
| `VISO-ROUTE-026` | `/operations/employee-profiles` | `Operación` | `CHILD_OR_DETAIL_ROUTE` | defaults y perfil operativo administrativo por trabajador/sede, sin autoridad real |
| `VISO-ROUTE-027` | `/operations/preview` | `Operación` | `CHILD_OR_DETAIL_ROUTE` | diagnóstico de configuración operativa; no simulación canónica de seguridad |
| `VISO-ROUTE-028` | `/operations/site-roles` | `Operación` | `CHILD_OR_DETAIL_ROUTE` | elegibilidad de rol operativo por sede/área; no matriz de permisos |
| `VISO-ROUTE-029` | `/operations-map` | transición multiowner | `CROSS_OWNER_TRANSITION` | composición AS-IS que mezcla estructura, capacidades y LOC; requiere separación/handoff |

`VISO-ROUTE-030 — /ops/audit` no pertenece a esta familia final.

Su tratamiento corresponde a `VISO-UX-007`.

---

#### 10. Arquitectura interna del dominio

La sección se organiza conceptualmente en cinco áreas:

```text
1. Resumen operativo
2. Roles por sede y área
3. Perfiles operativos
4. Puntos de marcación
5. Diagnóstico / preview
```

`Mapa operativo` no se incorpora como sexto editor propio mientras conserve mutaciones cross-owner.

Puede existir como handoff o proyección durante transición.

---

#### 11. Modelo mínimo de contexto operativo

El contexto operativo efectivo no es un único campo.

Cuando el proceso lo requiera puede involucrar:

```text
principal autenticado
+ actor humano efectivo
+ vínculo laboral vigente
+ turno publicado vigente
+ check-in activo cuando aplique
+ sede operativa efectiva
+ área efectiva cuando aplique
+ rol operativo efectivo
+ permiso exacto
+ recurso
+ dispositivo
+ versión / frescura
```

La sección `Operación` administra solo las piezas que realmente pertenecen a VISO.

No sustituye al evaluador canónico de autorización.

---

#### 12. Rol base y rol operativo

Se conserva:

```text
BASE_ROLE
!=
OPERATIONAL_ROLE
```

El rol base representa identidad administrativa o transversal según el contrato aprobado.

El rol operativo representa función efectiva de una operación y puede variar por turno y contexto.

No se modifica `employees.role` como consecuencia de:

- check-in;
- cambio de sede de turno;
- perfil operativo default;
- selección de área;
- uso de un punto de marcación;
- preview.

---

#### 13. Catálogo de roles operativos

`Operación` consume el catálogo cerrado de roles operativos aprobado por los contratos de autorización y contexto.

La experiencia no permitirá roles libres por texto cuando el contrato requiera identidad canónica.

Cada opción mostrada deberá preservar al menos:

- código estable;
- etiqueta humana;
- familia cuando exista;
- estado/vigencia;
- requisitos operativos relevantes;
- referencia al catálogo propietario.

No se crea un rol nuevo porque un administrador escriba un nombre en una matriz.

---

#### 14. Matriz rol × sede × área

La matriz operativa responde:

```text
¿ESTE ROL OPERATIVO PUEDE SER USADO EN ESTA SEDE Y, CUANDO APLIQUE, EN ESTA ÁREA?
```

No responde:

```text
¿ESTA PERSONA TIENE ESTE PERMISO?
```

Por tanto:

```text
SITE_OPERATIONAL_ROLE_ELIGIBILITY
!=
AUTHORIZATION_GRANT
```

La matriz debe conservar:

- sede;
- área opcional según contrato;
- rol operativo canónico;
- estado activo/inactivo;
- condición default cuando exista;
- requisitos de punto externo cuando existan;
- orden o metadatos contractuales vigentes;
- trazabilidad de cambio.

---

#### 15. Semántica de `default`

Un rol marcado como default significa preferencia o resolución administrativa permitida dentro de un contexto compatible.

No significa:

- permiso automático;
- rol efectivo permanente;
- bypass de selección cuando existen incompatibilidades;
- autoridad sobre toda la sede;
- sustitución del rol declarado por un turno publicado.

Cuando exista más de una opción válida y no haya resolución determinista, la experiencia deberá requerir una decisión explícita del owner correspondiente.

---

#### 16. Área opcional y área obligatoria

Una relación de rol operativo puede ser:

- aplicable a toda la sede cuando el contrato lo permita;
- específica de un área;
- incompatible con áreas determinadas.

`area_id = null` no se interpretará automáticamente como:

```text
TODAS_LAS_AREAS_AUTORIZADAS
```

La semántica de ausencia deberá venir del contrato propietario.

---

#### 17. Perfil operativo por trabajador y sede

El perfil operativo administrativo puede conservar defaults como:

- trabajador;
- sede;
- rol operativo default;
- punto de entrada default;
- punto de salida default;
- estado/vigencia.

Se conserva:

```text
EMPLOYEE_OPERATIONAL_PROFILE
!=
ACTIVE_OPERATIONAL_CONTEXT
```

El perfil facilita planificación y configuración.

No concede autoridad ni crea un turno.

---

#### 18. Perfil operativo y Programación

Programación puede consumir un perfil operativo para proponer valores compatibles al crear o editar un turno.

La propuesta no será una mutación silenciosa.

El turno publicado conserva su propia versión y contexto.

Un cambio posterior del perfil no reescribe turnos ya publicados por efecto lateral.

---

#### 19. Perfil operativo y Acceso y seguridad

El perfil operativo no equivale a:

- grant;
- deny;
- excepción;
- permiso;
- role assignment de seguridad;
- scope global.

Si la selección de un perfil revela un conflicto de autorización, `Operación` muestra el conflicto o conduce al owner.

No lo corrige concediendo permisos.

---

#### 20. Puntos de marcación

Un punto de marcación es un contexto físico utilizado para validar entrada o salida cuando el proceso lo requiere.

Puede conservar:

- identidad estable;
- código;
- etiqueta;
- coordenadas;
- radio de geocerca;
- tipo físico;
- estado/vigencia;
- relación con la configuración que lo consume.

No se presenta automáticamente como sede operativa ordinaria.

---

#### 21. Punto de marcación y sede operativa

Se conserva:

```text
CHECKIN_POINT
!=
OPERATIONAL_SITE
```

Un punto físico puede usarse para geocerca sin ser el territorio de autorización.

Ejemplo conceptual:

```text
sede operativa del turno = Centro de Producción y Distribución
punto físico de entrada = patio de vehículo autorizado
```

El punto de entrada no reemplaza la sede del turno.

---

#### 22. `checkin_site_id` y `checkout_site_id`

Cuando existan en el contrato vigente:

- identifican puntos físicos de entrada o salida;
- no conceden permisos;
- no cambian el owner del turno;
- no cambian el rol base;
- no determinan por sí solos el área efectiva;
- no convierten un punto oculto en sede navegable.

La ausencia debe diferenciarse de un punto inválido o retirado.

---

#### 23. Geocerca

La geocerca es una condición física de una operación de asistencia o presencia.

No es una frontera de autorización empresarial completa.

Se conserva:

```text
GEOFENCE_MATCH
!=
AUTHORIZED_TO_OPERATE
```

Una persona puede estar físicamente dentro de un radio y no tener:

- turno válido;
- rol operativo compatible;
- permiso exacto;
- vínculo vigente;
- contexto fresco.

---

#### 24. Check-in y activación de contexto

ANIMA conserva la experiencia personal de check-in, pausa y check-out.

`Operación` configura elementos que ANIMA consume.

No ejecuta el check-in del trabajador ni lo suplanta administrativamente.

Se conserva:

```text
VISO_CONFIGURES
ANIMA_ACTIVATES_PERSONAL_ATTENDANCE_FLOW
AUTH_EVALUATES
OWNER_APP_EXECUTES
```

---

#### 25. Contexto activo

Un contexto activo debe derivarse de hechos vigentes y del contrato compartido.

No se persiste o reconstruye desde una selección de UI como si esa selección fuese autoridad.

La sección puede mostrar una proyección administrativa del contexto.

La mutación real en otra aplicación deberá revalidar el contexto.

---

#### 26. Frescura

La experiencia debe tratar como potencialmente stale cualquier preview o diagnóstico cuando cambie cualquiera de estas entradas relevantes:

- vínculo laboral;
- asignación territorial;
- estructura de sede o área;
- matriz de roles operativos;
- perfil operativo;
- turno;
- check-in;
- permiso;
- excepción;
- dispositivo;
- versión contractual.

Un resultado stale no se reutiliza como autorización.

---

#### 27. Preview operativo

`/operations/preview` puede ofrecer una vista administrativa de coherencia entre:

- sedes;
- áreas;
- roles operativos;
- perfiles;
- puntos físicos;
- permisos proyectados cuando sean visibles de forma autorizada;
- warnings de configuración.

Su función es explicar y diagnosticar.

No ejecutar.

---

#### 28. Preview operativo y simulación canónica

Se conserva:

```text
OPERATIONAL_PREVIEW
!=
AUTHORIZATION_SIMULATION
```

Para declararse simulación canónica tendría que consumir el contrato de simulación aprobado y conservar actor real, escenario hipotético, decisión por permiso, separación de autoridad real y auditoría correspondiente.

Esta tarea no eleva el AS-IS actual a esa categoría.

---

#### 29. Warnings de configuración

La experiencia puede detectar, entre otros:

- sede sin matriz operativa cuando se requiere;
- área sin rol compatible;
- varios roles sin default cuando la operación espera resolución automática;
- perfil con rol fuera de matriz;
- perfil con punto retirado;
- turno con rol no admitido;
- punto requerido ausente;
- referencia territorial inactiva;
- configuración duplicada o competidora;
- datos stale.

Un warning no será tratado automáticamente como deny.

---

#### 30. Error, conflicto y deny

Se mantienen separados:

```text
VALIDATION_ERROR
CONFIGURATION_CONFLICT
AUTHORIZATION_DENY
TECHNICAL_FAILURE
STALE_CONTEXT
MISSING_CONTEXT
```

La interfaz deberá explicar la clase real sin inventar una causa de seguridad.

---

#### 31. `/operations/checkin-points`

`VISO-ROUTE-025` permanece como superficie hija de `Operación`.

Su experiencia objetivo administra puntos físicos de marcación sin tratarlos como sedes operativas visibles por defecto.

Debe mostrar:

- identidad;
- código;
- nombre;
- tipo;
- dirección o referencia permitida;
- coordenadas cuando apliquen;
- radio;
- estado;
- usos o impactos relevantes antes de retirar.

---

#### 32. Alta de punto físico

Antes de crear un punto, la experiencia debe validar:

- identidad/código no duplicados;
- tipo permitido;
- coordenadas válidas cuando sean obligatorias;
- radio válido;
- finalidad;
- exposición permitida;
- permisos administrativos;
- conflictos evidentes.

Crear el punto no lo asigna automáticamente a un trabajador o turno.

---

#### 33. Cambio de punto físico

Un cambio de coordenadas, radio o estado puede afectar:

- perfiles operativos;
- turnos futuros;
- turnos publicados;
- check-in/check-out;
- geocercas activas;
- operación offline;
- evidencia de asistencia.

La experiencia deberá mostrar impacto detectable antes de guardar.

No reescribe historia de asistencia.

---

#### 34. Retiro de punto físico

Un punto referenciado no debe eliminarse destructivamente sin reconciliación.

La experiencia preferirá:

- desactivación;
- vigencia;
- reemplazo controlado;
- bloqueo por referencias activas;
- preservación histórica.

La acción exacta depende del contrato físico propietario.

---

#### 35. `/operations/site-roles`

`VISO-ROUTE-028` permanece como superficie hija de `Operación`.

Representa la configuración de roles operativos admitidos por sede y área.

No se renombra conceptualmente como `Permisos por sede`.

La interfaz debe usar lenguaje de elegibilidad operativa.

---

#### 36. Matriz y catálogo

La matriz deberá seleccionar roles desde catálogo canónico.

Se prohíbe:

- código libre;
- rol inventado por UI;
- duplicar catálogo;
- usar `employees.role` como catálogo de roles operativos;
- inferir rol por nombre de sede;
- inferir permisos desde pertenencia a la matriz.

---

#### 37. Duplicidad física de `site_operational_roles`

La evidencia canónica registra fuentes competidoras que deben reconciliarse antes de admitir una autoridad física definitiva.

Por tanto esta tarea:

- no declara una tabla concreta como autoridad final por inferencia;
- no promueve una copia por ser la usada por el runtime actual;
- no autoriza doble escritura;
- exige convergencia antes de retirar compatibilidad;
- conserva área, default, estado, auditoría y referencias durante transición.

---

#### 38. `/operations/employee-profiles`

`VISO-ROUTE-026` permanece como superficie hija de `Operación`.

La experiencia debe administrar defaults operativos por trabajador y sede sin presentar esos defaults como el contexto efectivo actual.

Debe permitir comprender:

```text
TRABAJADOR
+ SEDE
+ ROL OPERATIVO DEFAULT
+ PUNTO ENTRADA DEFAULT
+ PUNTO SALIDA DEFAULT
+ VIGENCIA
```

---

#### 39. Compatibilidad de perfil

Al guardar un perfil se deben verificar, cuando sean materialmente aplicables:

- trabajador vigente;
- sede válida;
- rol presente en catálogo;
- rol admitido en la sede/área correspondiente;
- puntos físicos válidos;
- requisitos de punto externo;
- duplicidad de perfil;
- conflictos detectables;
- alcance administrativo del actor.

El servidor conserva la decisión final.

---

#### 40. `/operations/preview`

`VISO-ROUTE-027` permanece como superficie hija de diagnóstico.

Debe diferenciar claramente:

- configuración actual;
- escenario seleccionado;
- warnings;
- permisos proyectados si la lectura está autorizada;
- fuente de cada elemento;
- timestamp o versión suficiente para reconocer stale state.

No habrá botón ambiguo que convierta preview en aplicación masiva de configuración.

---

#### 41. `/operations-map`

`VISO-ROUTE-029` se clasifica como `CROSS_OWNER_TRANSITION`.

El AS-IS observado combina en una sola superficie:

- sedes;
- áreas;
- visibilidad operativa;
- capacidades por sede;
- LOC;
- asignaciones de personas;
- reglas o referencias de producción;
- reglas comerciales;
- permisos y otros consumidores.

Esa composición es útil como evidencia y diagnóstico.

No autoriza ownership universal de VISO.

---

#### 42. Disposición de `/operations-map`

La evolución debe separar, mediante handoff o subviews propietarias:

```text
ESTRUCTURA ORGANIZATIVA
→ Organización

LOC / UBICACIÓN DE INVENTARIO
→ NEXO

CAPACIDAD OPERATIVA PROPIETARIA
→ owner del proceso/capacidad

SEGURIDAD
→ Acceso y seguridad

CONFIGURACIÓN DE CONTEXTO VISO
→ Operación
```

Hasta esa separación, la ruta no se retira ni se certifica como diseño final.

---

#### 43. Capacidades de sede

Una capacidad como vender, producir, almacenar, solicitar, preparar, despachar o recibir no se deriva de `site_type` ni del nombre.

La sección puede mostrar capacidades como contexto o diagnóstico cuando estén contractualmente disponibles.

No se apropia de la escritura de una capacidad cuyo owner pertenezca a otra aplicación o proceso.

---

#### 44. `operational_visibility`

La visibilidad operativa es configuración de presentación/uso de contexto.

No equivale a:

- existencia jurídica;
- sede activa en Organización;
- autorización territorial;
- capacidad de ejecutar todos los procesos;
- publicación comercial.

Cambiar visibilidad no concede permisos.

---

#### 45. Relación con Personal

`Personal` conserva:

- expediente laboral;
- estado laboral;
- vínculo;
- asignaciones laborales propietarias;
- retiro.

`Operación` consume únicamente los atributos necesarios para configurar contexto.

No modifica datos laborales protegidos como efecto lateral.

---

#### 46. Relación con Programación

`Programación` conserva:

- creación de turnos;
- edición de turnos;
- publicación;
- revisión;
- cancelación;
- historial de programación.

`Operación` provee o consume configuración compatible.

No crea turnos desde sus editores de matriz o perfil.

---

#### 47. Relación con Acceso y seguridad

`Acceso y seguridad` conserva:

- permisos;
- grants;
- denies;
- excepciones;
- matrices de seguridad;
- simulación canónica;
- procedencia;
- conflictos de autorización.

`Operación` conserva:

- catálogo operativo consumido;
- elegibilidad rol × sede × área;
- defaults operativos;
- puntos físicos;
- diagnóstico de configuración.

La frontera se representa como handoff, no como duplicación.

---

#### 48. Relación con Organización

`Organización` conserva identities y vigencias de:

- sedes;
- áreas;
- zonas;
- estaciones;
- relaciones estructurales.

`Operación` no crea una sede para resolver un punto de marcación.

No crea un área para resolver un rol.

---

#### 49. Relación con ANIMA

ANIMA consume:

- turno publicado;
- área;
- rol operativo;
- punto de entrada;
- punto de salida;
- contexto aplicable a asistencia.

ANIMA no debe administrar matrices de terceros ni modificar `employees.role` por check-in.

`Operación` no realiza la experiencia personal de asistencia.

---

#### 50. Relación con NEXO

NEXO consume contexto operativo para autorizar y contextualizar acciones de inventario y logística.

NEXO conserva ownership de:

- inventario;
- LOC;
- stock;
- remisiones;
- movimientos;
- activos logísticos dentro de su dominio.

VISO no edita esas operaciones desde `Operación`.

---

#### 51. Relación con FOGO

FOGO consume contexto de sede, área y rol operativo cuando el proceso productivo lo requiere.

FOGO conserva ownership de:

- lotes;
- recetas;
- producción;
- calidad productiva;
- consumos y resultados.

`Operación` no inicia ni cierra lotes.

---

#### 52. Relación con ORIGO

ORIGO conserva compras y recepción propietaria.

El contexto operativo puede limitar o contextualizar actores y territorio.

No convierte VISO en editor de órdenes, proveedores o recepciones.

---

#### 53. Relación con PULSO

PULSO conserva venta y operación comercial propietaria.

`Operación` puede proveer contexto de actor, sede o área mediante contratos compartidos.

No administra caja, pedidos, salón o venta.

---

#### 54. Relación con NUMERA

NUMERA conserva hechos económicos, obligaciones y dimensiones financieras propietarias.

`Operación` no deriva centro de costo definitivo desde área, rol o sede por inferencia.

---

#### 55. Relación con PASS

PASS consume proyecciones públicas o comerciales autorizadas.

Un punto de marcación oculto no se publica en PASS por pertenecer físicamente a una sede.

`Operación` no administra cliente, recompensas o experiencia comercial.

---

#### 56. Handoff hacia Auditoría

`VISO-UX-007` recibe evidencia de cambios y decisiones relevantes de `Operación`.

La sección `Operación` puede enlazar a auditoría cuando una persona necesite investigar:

- quién cambió una matriz;
- quién cambió un perfil;
- quién cambió un punto;
- qué configuración existía en un momento;
- qué warning se produjo;
- qué versión se consumió.

No convierte el log en estado vigente.

---

#### 57. Navegación interna

La navegación interna del dominio puede proyectar:

```text
Vista previa
Puntos de marcación
Roles por sede
Perfiles operativos
```

El orden visual puede adaptarse a la tarea del usuario, pero deberá conservar:

- una única entrada primaria `Operación`;
- hijos identificables;
- no duplicar `operations-map` como editor propio mientras siga cross-owner;
- no crear entradas a capacidades no autorizadas;
- no interpretar tab visible como permiso.

---

#### 58. Descubribilidad y autorización

Una opción interna visible deberá depender de capacidad administrativa real o de una regla de navegación gobernada.

La ausencia de `permissionCode` explícito observada en páginas AS-IS no certifica que el acceso de aplicación sea suficiente para una futura mutación sensible.

Se conserva:

```text
viso.access
!=
ADMINISTRAR_TODO_EL_CONTEXTO_OPERATIVO
```

---

#### 59. Acceso directo

Un deep link a cualquier ruta hija debe revalidar:

- sesión;
- actor;
- aplicación;
- permiso exacto cuando exista;
- territorio;
- recurso;
- vigencia;
- contexto adicional aplicable.

La navegación no es un control de seguridad suficiente.

---

#### 60. Mutaciones de servidor

Toda mutación debe revalidar en servidor los datos enviados por formularios o URL.

No confiará en:

- opciones filtradas en cliente;
- hidden inputs;
- labels visibles;
- selección previa;
- preview;
- ruta de origen;
- navegación lateral.

---

#### 61. Concurrencia

Antes de guardar un cambio sensible, la experiencia debe soportar revalidación si la configuración cambió desde la carga.

No se acepta `last write wins` silencioso cuando pueda:

- invalidar turnos;
- crear matriz incompatible;
- cambiar punto físico usado;
- ampliar o reducir contexto;
- ocultar una diferencia relevante.

---

#### 62. Preview antes de guardar

Cuando el cambio tenga impacto material detectable, la experiencia debe mostrar:

```text
ACTUAL
+
CAMBIO PROPUESTO
=
RESULTADO PROYECTADO
```

El preview debe indicar:

- objetos afectados;
- consumidores conocidos;
- bloqueos;
- warnings;
- owner de cualquier corrección externa requerida.

---

#### 63. Confirmación

La confirmación de una acción sensible debe nombrar el efecto real.

Ejemplos de intención comprensible:

- activar o desactivar elegibilidad de un rol en una sede/área;
- cambiar el punto físico default de un perfil;
- retirar un punto de marcación;
- actualizar un default operativo.

No usar confirmaciones genéricas que oculten consecuencias.

---

#### 64. Receipt

Después de una mutación exitosa, la experiencia deberá mostrar un resultado suficiente para que el administrador comprenda:

- qué cambió;
- sobre qué contexto;
- desde cuándo;
- qué warnings permanecen;
- si existe trabajo pendiente en otro owner;
- referencia de trazabilidad permitida.

El receipt no es auditoría completa.

---

#### 65. Estados de experiencia

La UI debe diferenciar como mínimo:

```text
LOADING
EMPTY
READY
NO_AUTHORITY
NO_TERRITORY
NO_MATCHES
VALIDATION_ERROR
CONFLICT
STALE
TECHNICAL_FAILURE
PARTIAL_READ
```

No se utilizará un estado único `Sin datos` para todas las causas.

---

#### 66. Estado vacío

Un estado vacío debe indicar qué está vacío:

- no hay puntos;
- no hay roles admitidos;
- no hay perfiles;
- no hay resultados para filtros;
- no hay warnings.

No debe invitar a crear datos cuando el actor no tiene autoridad.

---

#### 67. Fallo parcial

Si una lectura compuesta falla parcialmente:

- se identifica qué fuente falló;
- no se presenta una matriz incompleta como completa;
- no se habilita una mutación basada en información insuficiente;
- la recuperación no borra el diagnóstico.

---

#### 68. Búsqueda y filtros

Las listas densas podrán filtrar por:

- trabajador;
- sede;
- área;
- rol operativo;
- estado;
- necesidad de punto externo;
- punto físico;
- warning;
- vigencia.

Los filtros operan dentro del universo autorizado.

---

#### 69. Modo guiado y experto

Acciones individuales y de mayor riesgo deberán priorizar modo guiado.

Listados de matriz y diagnóstico podrán usar modo experto.

Ambos modos comparten:

- la misma autoridad;
- la misma fuente;
- las mismas validaciones;
- la misma trazabilidad.

El modo experto no concede scope adicional.

---

#### 70. Acciones masivas

Si una implementación futura habilita cambios masivos, antes de aplicar deberá mostrar:

- población;
- sede/área;
- cambio exacto;
- exclusiones;
- conflictos;
- filas bloqueadas;
- warnings;
- autoridad requerida;
- resultado esperado.

Una selección masiva no crea wildcard territorial.

---

#### 71. Privacidad

Los perfiles operativos deberán mostrar únicamente datos personales necesarios para identificar al trabajador y administrar el contexto.

No se incluirán por defecto:

- documentos médicos;
- datos financieros;
- información sensible no necesaria;
- secretos;
- tokens;
- credenciales.

---

#### 72. Accesibilidad

Estados críticos no dependen únicamente de color.

La navegación, warnings, tablas y formularios deberán tener:

- labels explícitos;
- foco identificable;
- orden de teclado coherente;
- mensajes vinculados a campos;
- confirmaciones comprensibles;
- lectura semántica suficiente.

---

#### 73. Responsive

En pantallas estrechas se preservan:

- contexto seleccionado;
- objeto en edición;
- warning crítico;
- acción primaria;
- owner/handoff;
- estado de guardado.

Responsive no cambia autorización ni oculta condiciones materiales.

---

#### 74. Terminología

La UI usa términos distintos para:

```text
rol base
rol operativo
perfil operativo
rol del turno
permiso
punto de marcación
sede
área
zona
LOC
```

No se reutiliza `rol` de forma ambigua cuando el contexto exige precisión.

---

#### 75. Prohibición de inferencias por nombre

No se decide comportamiento mediante:

- `contains("centro")`;
- `contains("saudo")`;
- `contains("conductor")`;
- nombre de empleado;
- nombre de sede;
- nombre de área;
- texto de label.

Las decisiones consumen identidades y contratos.

---

#### 76. Datos AS-IS

Las siguientes superficies y objetos se consideran evidencia de implementación actual, no certificación automática del diseño final:

- `operational_roles`;
- `site_operational_roles`;
- `employee_site_operational_profiles`;
- `viso_operational_checkin_points`;
- `vento_site_operational_role_matrix_v1`;
- `operational_role_permissions`;
- `employee_shifts.operational_role`;
- `employee_shifts.area_id`;
- `employee_shifts.checkin_site_id`;
- `employee_shifts.checkout_site_id`;
- `get_operational_context` y consumidores relacionados;
- rutas `/operations*`;
- `/operations-map`.

Cada objeto debe reconciliarse con su owner y contrato vigente antes de certificación física.

---

#### 77. Fuente única y proyecciones

La experiencia no debe crear nuevas copias editables del mismo concepto.

Se conserva:

```text
CANONICAL_SOURCE
→ AUTHORIZED_PROJECTION
→ CONSUMER
```

No:

```text
EDITOR_A
+
EDITOR_B
+
EDITOR_C
→ CONCILIACION_MANUAL
```

---

#### 78. Reconciliación de matrices duplicadas

La existencia documentada de más de una representación de roles por sede debe tratarse como deuda de transición con owner y gate.

No se resuelve desde UX mediante:

- elegir la tabla que resulte más cómoda;
- escribir a ambas;
- borrar una sin migración;
- ocultar la diferencia en UI.

---

#### 79. Offline

Una cola offline no podrá ejecutar posteriormente con un contexto operativo que ya no sea válido.

Al recuperar conectividad, el consumidor propietario deberá revalidar:

- vínculo;
- turno;
- check-in;
- territorio;
- rol operativo;
- permiso;
- frescura.

Esta tarea no implementa esa cola.

---

#### 80. Dispositivos compartidos

Cuando un contexto operativo se use desde dispositivo compartido:

- el dispositivo no se convierte en trabajador;
- el principal técnico no hereda autoridad del administrador;
- el actor humano efectivo debe quedar identificado;
- los límites del dispositivo se intersectan con autoridad del actor.

La administración completa del dispositivo permanece en `Acceso y seguridad`.

---

#### 81. Simulación

Un escenario simulado nunca modifica:

- perfil;
- turno;
- check-in;
- matriz operativa;
- grants;
- sesión real.

Si el preview operativo presenta un escenario hipotético, deberá marcarlo claramente como diagnóstico sin autoridad.

---

#### 82. Auditoría

Toda mutación real de configuración deberá producir evidencia según el contrato transversal aplicable.

`Operación` no implementa un ledger nuevo.

`VISO-UX-007` define la experiencia de consulta administrativa de esa evidencia.

---

#### 83. Deep links entre dominios VISO

Los enlaces hacia:

- Personal;
- Programación;
- Acceso y seguridad;
- Organización;
- Auditoría;

transportan únicamente identificadores y filtros permitidos.

El destino vuelve a autorizar.

---

#### 84. Deep links hacia otras aplicaciones

Un handoff a NEXO, FOGO, ORIGO, PULSO, NUMERA, PASS o ANIMA debe preservar:

- owner destino;
- objeto suficiente;
- contexto mínimo;
- return contract cuando exista;
- revalidación en destino.

La URL no transporta autoridad.

---

#### 85. Handoff a `VISO-UX-007`

`VISO-UX-007 — Crear sección Auditoría` recibe:

- cambios de configuración operativa como hechos consultables;
- necesidad de distinguir estado vigente de historia;
- actor y tiempo cuando el contrato lo permita;
- referencias a conflictos y warnings sin convertirlos en verdad actual;
- enlaces desde matrices, perfiles y puntos hacia evidencia autorizada.

Auditoría no se convierte en editor de `Operación`.

---

#### 86. Handoffs posteriores del minibloque

| Tarea posterior | Handoff |
| --- | --- |
| `VISO-UX-007` | evidencia e historia consultable de cambios operativos |
| `VISO-UX-013` | limitación visual y acciones según territorio autorizado |
| `VISO-UX-014` | procedencia comprensible de decisiones y permisos proyectados |
| `VISO-UX-015` | conflictos visibles antes de guardar |
| `VISO-UX-016` | patrón final de preview por trabajador/contexto sin ampliar autoridad |
| `VISO-UX-017` | eliminación de configuración duplicada o de owner externo |
| `VISO-UX-018` | handoffs cross-app protegidos |
| `VISO-UX-019` | progressive disclosure para configuración avanzada |
| `VISO-UX-020` | pruebas con administradores reales |

---

#### 87. Carryovers

| Carryover | Owner | Condición de salida |
| --- | --- | --- |
| materializar la sección y sus subviews | instancia física de `VISO-UX-006` | package aplicable y `POST_E5_PACKAGE` satisfechos, autorización física propia y validaciones de implementación |
| reconciliar fuentes de `site_operational_roles` | transición Supabase ya propietaria | autoridad única, migración, consumidores, rollback y pruebas demostrados |
| separar preview operativo de simulación canónica | `VISO-UX-016` + contratos AUTH | preview final consume contrato correcto o queda explícitamente diagnóstico |
| separar mutaciones cross-owner de `/operations-map` | `VISO-UX-017/018` + owners afectados | cada mutación queda en owner o handoff protegido sin doble escritura |
| cerrar permisos operativos efectivos | `Acceso y seguridad` + AUTH | evaluador y catálogo canónicos demostrados por paquete |
| reconciliar turnos históricos incompatibles | Programación + owners de datos | datos corregidos mediante proceso gobernado sin reescribir historia silenciosamente |
| limitar visualmente por territorio | `VISO-UX-013` | patrón transversal materializado y validado |
| mostrar procedencia | `VISO-UX-014` | procedencia comprensible sin exponer internals sensibles |
| mostrar conflictos pre-save | `VISO-UX-015` | patrón de conflicto materializado |
| reconciliar las 61 rutas contra runtime final | `CODE-AUD-021` / `AUTH-UI-061` | inventario y código estable coinciden |

---

#### 88. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el Registro Canónico vigente ya protege separación entre carriles administrativos y operativos, resolución determinista de sede/área, rol operativo, turno, check-in, autorización efectiva, trazabilidad, coherencia de VISO, contexto laboral compartido, estructura organizacional, fuentes únicas, rutas VISO y transición de matrices duplicadas; esta tarea compone esas decisiones en una sección UX sin crear una regla empresarial, PermissionKey, fuente de verdad, tabla, transición, evaluador, rol, scope, permiso, turno, geocerca, RPC o mutación nueva.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 89. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico, la tarea reutiliza especialmente:

- `TREQ-VISO-001` para coherencia entre configuración administrativa, territorio, perfiles, conflictos, auditoría y resultado consumido;
- `TREQ-AUTH-008` para separar prerrequisitos administrativos y operativos y exigir contexto operativo cuando corresponda;
- `TREQ-AUTH-009` para resolución territorial determinista y denegación de cruces no autorizados;
- `TREQ-AUTH-012` para mantener simulación separada de autoridad real;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, rol operativo, turno, check-in, sede, área, permiso y decisión;
- `TREQ-INTEGRATION-007` para contrato único entre programación, asistencia y contexto derivado sin duplicar jornadas;
- `TREQ-SUPABASE-011` para integridad semántica de organización, sede, área, zona y punto externo;
- `TREQ-SUPABASE-335` para reconciliar las fuentes competidoras de roles por sede antes de admitir nuevas escrituras definitivas;
- `TREQ-UX-005` para fuente visible, estado y corrección sin copias competidoras;
- `TREQ-UX-020` para mantener ownership y contrato al proyectar una capacidad en varias aplicaciones;
- `TREQ-UX-023` para no retirar rutas ni superficies antes de reemplazo protegido, probado y reversible.

La mención en esta sección es trazabilidad heredada y no una modificación de 04A.

---

#### 90. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-006`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en la rama documental local de `VISO-UX-006`. |
| REMOTA | PASS | Se verificaron `vento-shell/main` en `0f83577c3338e5759ccafde9ce13cc84504e57bc`, protocolo, contrato de entrega, continuidad, topología, políticas, owner del minibloque, `VISO-UX-001..004` publicados, la versión completa aprobada de `VISO-UX-005`, el handoff de Organización, contratos VISO/AUTH aplicables, catálogo de pantallas/procesos, inventario `VISO-ROUTE-024..030`, Registro 04A aplicable, scripts documentales y las superficies AS-IS de `vento-viso/main` en `df3f28654188e4c8a4dd64e057c1f01ef602a2ba`. |
| OPERATIVA | NOT_EXECUTED | No se crearon o cambiaron puntos de marcación, matrices, perfiles, turnos, check-ins, permisos, contextos activos ni capacidades reales. |
| FÍSICA | NOT_EXECUTED | No se modificaron UI, rutas, navegación, Server Actions, contratos, Supabase, datos, migraciones, RLS, Auth, secretos ni despliegues; la materialización permanece por `implementation_unit_id` detrás de `POST_E5_PACKAGE`. |

---

#### 91. Criterios de aceptación

1. existe exactamente un contrato `VISO-OPERATION-SECTION-001`;
2. la tarea conserva `VISO-UX-005` como anterior y `VISO-UX-007` como siguiente;
3. la topología permanece `PER_IMPLEMENTATION_UNIT`;
4. el gate físico permanece `POST_E5_PACKAGE`;
5. `Operación` es el quinto dominio administrativo definido por `VISO-UX-001`;
6. `/operations` se reconoce como entrada física observada principal sin convertir ruta en ownership universal;
7. `VISO-ROUTE-024..029` conserva exactamente seis identidades de ruta;
8. ninguna identidad `VISO-ROUTE-*` se renumera;
9. `VISO-ROUTE-024` se clasifica `VISO_DOMAIN_ENTRY`;
10. `VISO-ROUTE-025` se clasifica `CHILD_OR_DETAIL_ROUTE`;
11. `VISO-ROUTE-026` se clasifica `CHILD_OR_DETAIL_ROUTE`;
12. `VISO-ROUTE-027` se clasifica `CHILD_OR_DETAIL_ROUTE`;
13. `VISO-ROUTE-028` se clasifica `CHILD_OR_DETAIL_ROUTE`;
14. `VISO-ROUTE-029` se clasifica `CROSS_OWNER_TRANSITION`;
15. `/ops/audit` permanece reservado a `VISO-UX-007`;
16. la tarea no inventa una identidad `VSCREEN-*` para `/operations`;
17. la tarea no inventa un `VPROC-*` para llenar una equivalencia no demostrada;
18. configuración operativa y autorización permanecen separadas;
19. configuración operativa y programación permanecen separadas;
20. configuración operativa y asistencia permanecen separadas;
21. configuración operativa y ejecución empresarial permanecen separadas;
22. VISO no se convierte en owner universal de NEXO;
23. VISO no se convierte en owner universal de FOGO;
24. VISO no se convierte en owner universal de ORIGO;
25. VISO no se convierte en owner universal de PULSO;
26. VISO no se convierte en owner universal de NUMERA;
27. VISO no se convierte en owner universal de PASS;
28. VISO no absorbe la experiencia personal de ANIMA;
29. `BASE_ROLE` y `OPERATIONAL_ROLE` permanecen distintos;
30. el check-in no modifica `employees.role`;
31. un perfil default no modifica `employees.role`;
32. un rol operativo se selecciona desde catálogo canónico;
33. no se admiten roles operativos libres cuando el contrato exige catálogo;
34. matriz rol×sede×área expresa elegibilidad y no permiso efectivo;
35. un rol admitido no concede un permiso por sí solo;
36. `default` no equivale a autoridad;
37. `area_id = null` no se interpreta automáticamente como wildcard;
38. el perfil operativo por trabajador/sede es default administrativo y no contexto activo;
39. cambiar perfil no reescribe turnos publicados;
40. Programación conserva ownership de turnos;
41. Acceso y seguridad conserva ownership de permisos;
42. Organización conserva ownership de estructura;
43. un punto de marcación no se convierte automáticamente en sede;
44. `checkin_site_id` no concede permisos;
45. `checkout_site_id` no concede permisos;
46. geocerca válida no equivale a autorización operativa;
47. ANIMA conserva check-in/check-out del trabajador;
48. Operación no ejecuta check-in administrativo en nombre del trabajador;
49. contexto activo se deriva de hechos vigentes y no de un selector de UI;
50. preview operativo no equivale a simulación canónica;
51. preview no se reutiliza como autoridad;
52. un warning no se convierte automáticamente en deny;
53. error de validación y deny permanecen distintos;
54. fallo técnico y deny permanecen distintos;
55. stale context y deny permanecen distintos;
56. `/operations/checkin-points` conserva ownership de configuración de puntos físicos de VISO;
57. el alta de punto no lo asigna automáticamente a perfiles o turnos;
58. el cambio de punto muestra impacto detectable;
59. el retiro de punto preserva referencias históricas;
60. `/operations/site-roles` usa lenguaje de elegibilidad operativa;
61. `/operations/site-roles` no se presenta como editor de permisos;
62. la matriz no infiere roles desde nombres de sede;
63. la matriz no infiere permisos desde rol admitido;
64. la duplicidad física de `site_operational_roles` permanece explícita hasta reconciliación;
65. no se autoriza doble escritura para ocultar la duplicidad;
66. `/operations/employee-profiles` distingue perfil de contexto efectivo;
67. un perfil exige compatibilidad con sede/rol/puntos cuando corresponda;
68. el servidor conserva validación final de perfil;
69. `/operations/preview` queda como diagnóstico;
70. preview muestra fuente o contexto suficiente para reconocer stale state;
71. `/operations-map` no se certifica como editor final de Operación;
72. `/operations-map` conserva clasificación `CROSS_OWNER_TRANSITION`;
73. LOC permanece en NEXO;
74. áreas permanecen en Organización como estructura maestra;
75. capacidades propietarias conservan su owner;
76. `operational_visibility` no equivale a autorización;
77. `operational_visibility` no equivale a existencia jurídica;
78. site type no concede capacidades;
79. nombre de sede no concede capacidades;
80. Personal conserva expediente y vínculo;
81. Operación no modifica datos laborales protegidos como efecto lateral;
82. Programación conserva publicación e historial de turnos;
83. Operación no crea turnos desde matrices o perfiles;
84. Acceso y seguridad conserva grants, denies y excepciones;
85. Operación no crea grants al guardar elegibilidad;
86. Organización conserva identidades de sede y área;
87. Operación no crea una sede para representar un punto;
88. Operación no crea un área para representar un rol;
89. ANIMA consume contexto sin administrar matrices de terceros;
90. NEXO consume contexto sin transferir ownership de inventario a VISO;
91. FOGO consume contexto sin transferir ownership productivo a VISO;
92. ORIGO consume contexto sin transferir ownership de compras a VISO;
93. PULSO consume contexto sin transferir ownership comercial a VISO;
94. NUMERA consume dimensiones sin transferir ownership financiero a VISO;
95. PASS no publica puntos ocultos por inferencia;
96. Auditoría recibe handoff de evidencia sin convertirse en editor;
97. existe una sola entrada primaria de dominio Operación;
98. los hijos no compiten como entradas primarias;
99. la visibilidad de un hijo depende de autoridad aplicable;
100. `viso.access` no se trata como wildcard administrativo;
101. deep link revalida en destino;
102. formulario manipulado no elude validación de servidor;
103. hidden inputs no transportan autoridad;
104. filtros de cliente no sustituyen autorización;
105. cambios concurrentes se revalidan antes de guardar cuando son materiales;
106. no se acepta `last write wins` silencioso para configuración sensible;
107. preview pre-save muestra actual, cambio y proyectado cuando corresponde;
108. confirmación sensible describe efecto real;
109. receipt describe resultado y pendientes sin sustituir auditoría;
110. `LOADING` y `EMPTY` permanecen distintos;
111. `NO_AUTHORITY` y `NO_TERRITORY` permanecen distintos;
112. `NO_MATCHES` no se presenta como falta de configuración global;
113. `CONFLICT` y `STALE` permanecen distintos;
114. `TECHNICAL_FAILURE` no se presenta como deny;
115. `PARTIAL_READ` no habilita mutación basada en información incompleta;
116. búsquedas y filtros permanecen dentro del universo autorizado;
117. modo experto no amplía scope;
118. acciones masivas futuras no crean wildcard territorial;
119. privacidad limita datos del trabajador a lo necesario;
120. estados críticos no dependen solo de color;
121. responsive conserva contexto y acciones críticas;
122. terminología distingue rol base, rol operativo, perfil, permiso y rol de turno;
123. no se infiere comportamiento por nombres visibles;
124. objetos AS-IS se tratan como evidencia y no certificación automática;
125. no se crean copias editables de una fuente canónica;
126. las matrices competidoras se reconcilian mediante transición gobernada;
127. operación offline debe revalidar contexto antes de producir efectos posteriores;
128. dispositivo compartido no se convierte en actor humano;
129. un escenario simulado no muta contexto real;
130. auditoría se consume mediante contratos existentes y no mediante un ledger nuevo creado aquí;
131. handoffs internos transportan identificadores mínimos y no autoridad;
132. handoffs cross-app revalidan en destino;
133. `VISO-UX-007` recibe el handoff exacto de evidencia de Operación;
134. todos los carryovers tienen owner y condición de salida;
135. no se crean requisitos de prueba;
136. no se modifican requisitos de prueba;
137. no se modifica 04A;
138. la cobertura reutilizada se declara fuera de la sección de cero cambios;
139. no se realizan cambios físicos desde esta tarea documental;
140. la continuidad termina en `VISO-UX-007` sin desarrollar esa tarea.

---

#### 92. Límites

Esta tarea no:

- modifica `vento-viso`;
- modifica `/operations`;
- modifica `/operations/checkin-points`;
- modifica `/operations/employee-profiles`;
- modifica `/operations/preview`;
- modifica `/operations/site-roles`;
- modifica `/operations-map`;
- modifica `/ops/audit`;
- crea rutas;
- elimina rutas;
- renumera `VISO-ROUTE-*`;
- modifica navegación runtime;
- modifica `app_navigation_items`;
- crea un `VSCREEN-*`;
- crea un `VPROC-*`;
- crea roles base;
- crea roles operativos;
- modifica catálogos de roles;
- crea permisos;
- crea PermissionKeys;
- concede grants;
- crea denies;
- crea excepciones;
- modifica matriz de permisos;
- ejecuta simulación canónica;
- crea sedes;
- modifica sedes;
- crea áreas;
- modifica áreas;
- crea zonas;
- crea estaciones;
- crea LOC;
- modifica LOC;
- crea puntos de marcación reales;
- modifica puntos de marcación reales;
- elimina puntos de marcación reales;
- crea perfiles operativos reales;
- modifica perfiles operativos reales;
- crea relaciones rol×sede×área reales;
- modifica relaciones rol×sede×área reales;
- crea turnos;
- modifica turnos;
- publica turnos;
- cancela turnos;
- crea check-ins;
- crea check-outs;
- corrige asistencia;
- inicia contexto operativo real;
- ejecuta acciones de NEXO;
- ejecuta acciones de FOGO;
- ejecuta acciones de ORIGO;
- ejecuta acciones de PULSO;
- ejecuta acciones de NUMERA;
- ejecuta acciones de PASS;
- cambia datos laborales en Personal;
- cambia estructura en Organización;
- cambia seguridad en Acceso y seguridad;
- modifica auditoría;
- crea tablas;
- crea vistas;
- crea funciones o RPC;
- crea triggers;
- crea migraciones;
- modifica RLS;
- modifica Auth;
- modifica Storage;
- modifica Realtime;
- modifica secretos;
- modifica datos;
- despliega cambios;
- aprueba packages;
- selecciona package;
- autoriza una instancia física;
- ejecuta una instancia física;
- sustituye `VISO-UX-007..020`;
- ejecuta pruebas con administradores reales;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

---

#### 93. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-005 — Crear sección Organización`

**TAREA ACTUAL APROBADA**
`VISO-UX-006 — Crear sección Operación`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-007 — Crear sección Auditoría`
### ✅ VISO-UX-007 — Crear sección Auditoría

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-006 — Crear sección Operación
**Tarea siguiente:** VISO-UX-008 — Definir inicio para propietario
**Tipo de tarea:** definición técnico-documental de la sección administrativa `Auditoría` de VISO; establece una experiencia transversal de investigación y reconstrucción histórica autorizada sobre cambios, intentos, decisiones, conflictos, correcciones, rollbacks y evidencia relacionada, sin confundir auditoría con estado vigente, autorización, observabilidad, recuperación, exportación o mutación, y conserva `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la sección `Auditoría` definido; la superficie física observada `/ops/audit` permanece como diagnóstico de consistencia AS-IS y no demuestra materialización de la auditoría canónica; la implementación runtime queda pendiente por `implementation_unit_id` y detrás de `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, rutas, navegación runtime, componentes, contratos, permisos, Supabase, tablas, vistas, migraciones, RPC, RLS, Auth, datos, writers, retención, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la sección administrativa `Auditoría` de VISO para que un actor autorizado pueda reconstruir hechos históricos relevantes sin convertir el visor de evidencia en una segunda fuente de estado, una consola de seguridad, un SIEM o un mecanismo de ejecución.

La sección debe responder de forma directa:

```text
¿QUÉ OCURRIÓ O SE INTENTÓ HACER?
¿CUÁNDO OCURRIÓ Y CUÁNDO QUEDÓ REGISTRADO?
¿QUIÉN SOLICITÓ, APROBÓ O EJECUTÓ LA ACCIÓN?
¿QUÉ SUJETO, RECURSO, CONFIGURACIÓN O PROCESO FUE AFECTADO?
¿CUÁL ERA EL ESTADO HISTÓRICO ANTERIOR?
¿CUÁL FUE EL RESULTADO HISTÓRICO POSTERIOR?
¿QUÉ DECISIÓN, MOTIVO, CONFLICTO O CORRELACIÓN EXPLICA EL HECHO?
¿QUÉ TERRITORIO HISTÓRICO APLICABA?
¿QUÉ EVIDENCIA ES CANÓNICA, LEGACY, RELACIONADA O INCOMPLETA?
¿DÓNDE DEBO IR PARA ACTUAR, SIN MUTAR DESDE EL HISTORIAL?
```

La regla raíz queda:

```text
AUDITORÍA
=
RECONSTRUCCIÓN HISTÓRICA AUTORIZADA
+
EVIDENCIA TRAZABLE
+
CORRELACIÓN
+
CONTEXTO HISTÓRICO
+
MINIMIZACIÓN
```

Y nunca:

```text
AUDITORÍA
=
ESTADO VIGENTE
```

ni:

```text
AUDITORÍA
=
AUTORIZACIÓN
```

ni:

```text
AUDITORÍA
=
CONSOLA DE MUTACIÓN
```

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001` entrega sin reapertura:

```text
ADMINISTRATIVE_DOMAIN_COUNT = 6
DOMAIN_1 = Personal
DOMAIN_2 = Programación
DOMAIN_3 = Acceso y seguridad
DOMAIN_4 = Organización
DOMAIN_5 = Operación
DOMAIN_6 = Auditoría
```

Para `Auditoría` entrega además:

```text
AUDITORIA_DESCRIBE_LO_OCURRIDO = YES
AUDITORIA_ES_ESTADO_VIGENTE = NO
AUDITORIA_ES_AUTORIZACION = NO
```

También conserva que una superficie físicamente presente en `vento-viso` no adquiere ownership, intención ni ubicación primaria únicamente por su ruta o nombre.

La familia observada contiene una candidata histórica:

```text
VISO-ROUTE-030
/ops/audit
```

pero `VISO-UX-001` deja su clasificación final a esta tarea.

---

#### 3. Handoff recibido de `VISO-UX-004`

`VISO-UX-004 — Crear sección Acceso y seguridad` entrega una frontera explícita:

```text
HISTORIAL CONTEXTUAL DE SEGURIDAD
!=
EXPERIENCIA TRANSVERSAL DE AUDITORÍA
```

`Acceso y seguridad` puede:

- mostrar historial contextual de un elemento administrado;
- explicar cambios relevantes al permiso, grant, deny, perfil o configuración que el actor está consultando;
- enlazar una investigación más profunda.

`Auditoría` conserva ownership sobre:

- investigación transversal;
- correlación entre eventos;
- reconstrucción histórica amplia;
- navegación entre evidencia relacionada;
- lectura de before/after;
- filtros históricos;
- contexto territorial histórico;
- explicación del resultado sin reinterpretarlo.

La existencia de historial contextual dentro de `Acceso y seguridad` no crea un segundo sistema de auditoría.

---

#### 4. Handoff recibido de `VISO-UX-006`

`VISO-UX-006 — Crear sección Operación` reserva expresamente:

```text
VISO-ROUTE-030 — /ops/audit
```

para esta tarea.

También deja fijadas estas fronteras:

- `Operación` administra configuración y supervisión del contexto operativo propio de VISO;
- `Organización` conserva sedes, áreas y estructura;
- `Programación` conserva turnos;
- ANIMA conserva check-in/check-out y experiencia del trabajador;
- `Acceso y seguridad` conserva permisos, grants, denies, excepciones, procedencia, conflictos y simulación canónica;
- NEXO conserva LOC, inventario y ejecución logística;
- las demás aplicaciones conservan sus operaciones empresariales propietarias.

Por tanto, `Auditoría` puede investigar evidencia de esas capacidades únicamente cuando exista una fuente auditable autorizada.

No absorbe su estado vigente ni sus acciones propietarias.

---

#### 5. Handoff recibido de `VISO-AUTH-018`

`VISO-AUTH-018 — Auditar cambios de seguridad` define la semántica y seguridad de la auditoría de cambios de autorización.

Esta tarea la consume sin reabrirla.

Se preserva:

```text
CAMBIO HISTÓRICO
!=
ESTADO ACTUAL

DECISIÓN ALLOW
!=
CAMBIO APLICADO

AUDITAR SEGURIDAD
!=
ADMINISTRAR SEGURIDAD
```

La sección `Auditoría` debe materializar una experiencia coherente con ese contrato.

No redefine qué constituye evidencia válida.

---

#### 6. Topología y gate

La tarea conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La definición documental ocurre una sola vez.

La materialización física posterior:

- pertenece a una `implementation_unit_id` gobernada;
- requiere el package propietario aplicable;
- requiere `E5-GATE-008::<package_id> = PASS` cuando corresponda;
- no se autoriza desde esta tarea documental;
- no se ejecuta por la existencia del AS-IS actual;
- debe conservar las fronteras definidas aquí.

No existe una instancia global implícita para `VISO-UX-007`.

---

#### 7. Contrato de sección

Se define:

```text
VISO_AUDIT_SECTION_CONTRACT = VISO-AUDIT-SECTION-001
DOMAIN_LABEL = Auditoría
DOMAIN_ORDER = 6
OBSERVED_AUDIT_ROUTE_ID = VISO-ROUTE-030
OBSERVED_AUDIT_ROUTE = /ops/audit
OBSERVED_AUDIT_ROUTE_AS_IS = OPERATIONAL_CONSISTENCY_DIAGNOSTIC
TREQ_CHANGES = 0
```

No se declara un `VSCREEN-*` ni un `VPROC-*` principal porque las fuentes canónicas vigentes no demuestran una identidad uno-a-uno aprobada para la experiencia transversal de auditoría definida aquí.

No se inventan esos identificadores para completar una matriz visual.

---

#### 8. Auditoría como sexto dominio administrativo

`Auditoría` es el sexto dominio de navegación administrativa de VISO.

Su función no es ejecutar trabajo primario.

Su función es permitir que un actor autorizado:

1. encuentre evidencia histórica;
2. reconstruya una acción o intento;
3. entienda actores y sujetos;
4. distinga decisión de ejecución;
5. revise before/after cuando exista;
6. siga correlación y causalidad explícitas;
7. entienda el territorio histórico;
8. examine conflictos o resultados;
9. navegue a evidencia relacionada;
10. identifique el owner de una acción posterior.

La sección no convierte una investigación en permiso para corregir el sistema desde el mismo historial.

---

#### 9. Regla semántica de pertenencia

Una superficie pertenece al dominio `Auditoría` cuando su intención primaria es reconstruir hechos históricos respaldados por evidencia auditable.

Por tanto:

```text
CONSULTAR ESTADO ACTUAL
!=
AUDITAR
```

```text
BUSCAR INCONSISTENCIAS ACTUALES
!=
AUDITAR
```

```text
MOSTRAR KPIs ACTUALES
!=
AUDITAR
```

```text
MOSTRAR updated_at
!=
AUDITAR
```

Una pantalla de diagnóstico puede ser útil, pero no se convierte en auditoría histórica por usar la palabra `audit` en su ruta, título o componente.

---

#### 10. AS-IS verificado de `VISO-ROUTE-030`

La ruta física observada es:

```text
VISO-ROUTE-030
/ops/audit
src/app/ops/audit/page.tsx
```

Su implementación actual:

- exige acceso general a VISO mediante `requireAppAccess`;
- usa un cliente administrativo para lectura;
- consulta `sites`;
- consulta `areas`;
- consulta `area_kinds`;
- consulta `inventory_locations`;
- consulta `employees`;
- consulta `employee_sites`;
- consulta `employee_inventory_location_assignments`;
- calcula consistencia del estado actual;
- muestra áreas sin LOC;
- muestra LOCs sin área;
- muestra trabajadores sin LOC de retiro;
- muestra tipos de área inactivos en uso;
- muestra posibles nombres duplicados de áreas;
- enlaza a superficies de trabajadores.

No consulta un historial de cambios.

No reconstruye eventos históricos.

No consume la capacidad exacta de lectura de auditoría de seguridad.

---

#### 11. Decisión sobre `/ops/audit`

Se congela:

```text
/ops/audit AS-IS
!=
VISO_AUDIT_SECTION_CONTRACT
```

Mientras conserve su semántica actual, `VISO-ROUTE-030` se trata como `CROSS_OWNER_TRANSITION` para la reorganización administrativa.

La razón es contractual:

- mezcla estado vigente de Organización;
- mezcla LOC y relaciones de inventario de NEXO;
- mezcla trabajadores y asignaciones;
- ejecuta diagnóstico de consistencia actual;
- no describe hechos históricos;
- no posee una única semántica de auditoría canónica demostrada.

Esta clasificación no retira la ruta.

No renumera `VISO-ROUTE-030`.

No autoriza a moverla físicamente.

No decide todavía qué owner recibe cada diagnóstico interno.

---

#### 12. No promover el AS-IS a entrada canónica

La entrada de navegación `Auditoría` no puede apuntar a `/ops/audit` y declararse conforme mientras la ruta conserve su implementación actual.

Se preserva:

```text
RUTA CON NOMBRE audit
!=
ENTRADA CANÓNICA DE AUDITORÍA
```

La futura materialización deberá reconciliar la navegación, la identidad semántica, el permiso de lectura y la superficie física sin hacer que una misma ruta represente intenciones contradictorias.

Esta tarea no inventa una ruta física nueva para resolver esa brecha.

---

#### 13. No retiro prematuro de `VISO-ROUTE-030`

`VISO-ROUTE-030` permanece dentro del inventario protegido.

No se elimina por no cumplir todavía el contrato objetivo.

Cualquier retiro, traslado o transformación física posterior exige:

- owner resuelto;
- consumidores identificados;
- reemplazo o handoff materializado cuando corresponda;
- navegación reconciliada;
- autorización equivalente o más restrictiva;
- pruebas;
- rollback o reversibilidad;
- inventario de rutas consistente.

---

#### 14. Experiencia objetivo de entrada

Cuando exista una materialización conforme, la entrada `Auditoría` deberá presentar una experiencia de consulta histórica y no un dashboard de estado actual.

La composición conceptual es:

```text
Auditoría
├── ventana temporal acotada
├── filtros autorizados
├── lista histórica estable
├── resultado del evento
├── actor y sujeto minimizados
├── fuente y nivel de evidencia
├── contexto histórico permitido
└── acceso al detalle
```

No se fija aquí una ruta física concreta para esa entrada.

---

#### 15. Cómo debe verse la lista histórica

La lista debe priorizar comprensión empresarial antes que nombres de tablas.

Ejemplo conceptual:

```text
28 sep 2026 · 16:44
Permiso operativo revocado
Resultado: APPLIED
Actor: Administrador autorizado
Sujeto: trabajador / rol / permiso
Territorio histórico: Sede Centro
Fuente: CANONICAL

28 sep 2026 · 15:12
Intento de cambio bloqueado
Resultado: CONFLICT
Actor: Administrador autorizado
Sujeto: configuración protegida
Fuente: CANONICAL
```

La representación visual no crea nuevos valores canónicos.

---

#### 16. La lista no es un feed genérico

La sección no muestra cualquier log disponible.

Un elemento solo entra al universo consultable cuando:

- existe una fuente auditable identificable;
- el evento posee identidad estable o referencia estable;
- el actor tiene capacidad de lectura aplicable;
- el alcance permite ver el evento;
- la proyección respeta sensibilidad y minimización;
- la fuente puede explicar su completitud.

No se agregan logs de consola, observabilidad o timestamps de filas para llenar la interfaz.

---

#### 17. Familias de evidencia

La sección puede relacionar las familias definidas por el contrato de seguridad:

```text
SECURITY_CONFIGURATION_CHANGE
SECURITY_CONFIGURATION_ATTEMPT
AUTHORIZATION_DECISION
SIMULATION_AUDIT
DEVICE_LIFECYCLE_AUDIT
CONTEXT_INVALIDATION_EVIDENCE
RELATED_SECURITY_EVIDENCE
```

También puede consumir evidencia histórica de otros dominios de VISO cuando exista un contrato propietario auditable.

No se crea una tabla universal ni un tipo universal de evento para homogeneizar fuentes incompatibles.

---

#### 18. Estado de la fuente de evidencia

La experiencia debe poder distinguir, cuando corresponda:

```text
CANONICAL
LEGACY_LIMITED
RELATED_EVIDENCE
EVIDENCE_INCOMPLETE
```

Estas etiquetas describen la calidad y procedencia de la evidencia presentada.

No modifican el evento persistido.

No elevan una fuente legacy al nivel canónico.

---

#### 19. Fuente canónica histórica

La fuente de verdad histórica es la evidencia persistida por el mecanismo propietario del cambio, intento, decisión o evento.

No son equivalentes:

- la fila vigente;
- el estado actual del trabajador;
- el rol actual;
- la sede actual;
- el área actual;
- la selección visual actual;
- un mensaje de éxito;
- una notificación;
- un log de consola;
- `created_at` o `updated_at` aislados;
- una comparación ad hoc entre dos lecturas actuales.

La UI no reconstruye historia inventando deltas.

---

#### 20. Evidencia append-only

La experiencia de auditoría trata la evidencia histórica como append-only.

Una corrección, compensación, aclaración o rollback posterior genera nueva evidencia vinculada cuando el contrato propietario así lo exige.

No se permite desde la sección:

```text
EDITAR EVENTO HISTÓRICO
BORRAR EVENTO PARA OCULTAR ERROR
REESCRIBIR BEFORE/AFTER
CAMBIAR ACTOR HISTÓRICO
CAMBIAR TERRITORIO HISTÓRICO
CAMBIAR RESULTADO HISTÓRICO
```

---

#### 21. Resultado aplicado e intento

La sección debe separar:

```text
CAMBIO APLICADO
```

de:

```text
INTENTO DE CAMBIO
```

Una autorización `ALLOW` no prueba que la mutación se aplicó.

La aplicación exige evidencia de resultado material.

---

#### 22. Categorías de resultado

Cuando la fuente propietaria las utilice, la vista puede representar:

```text
APPLIED
DENIED
INVALID
CONFLICT
TECHNICAL_FAILURE
NO_CHANGE
ROLLED_BACK
```

La interfaz puede traducir etiquetas para comprensión.

No puede cambiar la semántica de la fuente.

---

#### 23. `DENIED` y `TECHNICAL_FAILURE`

Se preserva:

```text
DENIED
!=
TECHNICAL_FAILURE
```

`DENIED` representa una negativa de seguridad o regla aplicable.

`TECHNICAL_FAILURE` representa una falla técnica que impidió resolver o completar la operación.

La UI no presenta un fallo técnico como decisión de seguridad.

---

#### 24. `CONFLICT`

Un resultado `CONFLICT` puede vincularse a la evidencia de conflicto propietaria.

La sección puede mostrar:

- tipo de conflicto;
- fuente;
- cambio solicitado;
- actor;
- resultado;
- referencia correlacionada;
- tiempo.

No vuelve a evaluar ni cambiar si el conflicto era bloqueante.

---

#### 25. `NO_CHANGE`

`NO_CHANGE` significa que el estado autoritativo no cambió.

Puede representar una solicitud idempotente o redundante.

No se transforma en:

```text
APPLIED
```

ni en:

```text
DENIED
```

---

#### 26. `ROLLED_BACK`

Un evento `ROLLED_BACK` conserva evidencia de:

- intento;
- decisión relacionada;
- proceso o transacción;
- motivo;
- resultado del rollback;
- correlación.

La interfaz no afirma `cero efectos` si la atomicidad no puede demostrarse.

---

#### 27. Change sets

Cuando una acción administrativa produzca varios cambios ligados a un mismo comando, la sección debe conservar la unidad del change set.

Conceptualmente:

```text
CHANGE_SET
├── identidad
├── actor
├── decisión
├── motivo
├── aprobación
├── correlación
├── resultado
└── items ordenados
```

La lista puede mostrar primero la acción agrupada y desplegar sus items.

No crea eventos falsos independientes para cada fila cuando la fuente define una sola transacción.

---

#### 28. Cardinalidad del change set

Cuando exista `change_count`, debe coincidir con el número real de items persistidos.

La UI no:

- oculta items para cuadrar el total;
- inventa items faltantes;
- duplica items para ajustar cardinalidad;
- calcula una cardinalidad alternativa como si fuera canónica.

---

#### 29. Before y after

Cuando la fuente preserve snapshots históricos, la experiencia puede mostrar:

```text
BEFORE
→
CHANGED_FIELDS
→
AFTER
```

Los snapshots provienen de evidencia histórica persistida.

No se recalculan desde el estado actual.

---

#### 30. Creación y ausencia histórica

Para una creación legítima puede existir:

```text
before = no existente
after = estado creado
```

La ausencia no se transforma en un objeto vacío inventado.

La UI debe diferenciar `no existía` de `evidencia faltante`.

---

#### 31. Evidencia incompleta

Si un evento requiere before/after, actor, decisión o correlación y la fuente no los posee, la experiencia debe indicar:

```text
EVIDENCIA INCOMPLETA
```

No completa huecos mediante inferencia.

La falta de datos puede limitar el detalle sin ocultar la identidad del hallazgo autorizado.

---

#### 32. Campos cambiados

`changed_fields`, cuando exista, delimita las propiedades afectadas.

La interfaz puede resaltar esos campos.

No infiere cambios adicionales comparando objetos con distintas representaciones, defaults o versiones.

---

#### 33. Fingerprints y versiones

Cuando la fuente incluya fingerprints o versiones, la sección puede presentarlos como evidencia técnica autorizada.

Ejemplos conceptuales:

```text
before_fingerprint
after_fingerprint
item_fingerprint
change_set_fingerprint
contract_version
dataset_version
dataset_hash
```

La UI no recalcula esos valores en cliente para sustituir la evidencia persistida.

---

#### 34. Decisión de autorización vinculada

Cuando el contrato propietario incluya una referencia como:

```text
authorization_decision_id
```

la experiencia puede navegar conceptualmente:

```text
CAMBIO
→
DECISIÓN DE AUTORIZACIÓN
```

sin convertir la decisión en el cambio mismo.

---

#### 35. Decisión y ejecución

Se conserva:

```text
DECISIÓN
!=
EJECUCIÓN
```

Una decisión `ALLOW` demuestra que se permitió continuar según el contrato correspondiente.

No demuestra por sí sola:

- escritura aplicada;
- transacción confirmada;
- evento emitido;
- caché invalidada;
- notificación entregada.

---

#### 36. Correlación

La experiencia puede correlacionar referencias explícitas como:

```text
correlation_id
causation_id
command_id
authorization_decision_id
change_set_id
permission_change_id
```

La correlación no se infiere únicamente porque dos eventos:

- ocurrieron cerca en el tiempo;
- afectaron al mismo trabajador;
- usaron la misma pantalla;
- fueron ejecutados por el mismo actor.

---

#### 37. Causalidad

`causation_id`, cuando existe, expresa causalidad explícita.

La UI puede representarla como cadena o vínculo.

No fabrica una relación causal para mejorar visualmente una línea de tiempo.

---

#### 38. Vínculos de evidencia

Cuando la fuente los permita, se pueden presentar vínculos tipados como:

```text
AUTHORIZATION_DECISION
APPROVAL
SOURCE_EVIDENCE
INCIDENT
CORRECTION
MIGRATION
AUDIT_ENTRY
```

Un vínculo demuestra relación.

No concede automáticamente acceso al contenido completo del sistema relacionado.

---

#### 39. Solicitante, aprobador y ejecutor

La sección debe distinguir, cuando existan:

```text
SOLICITÓ
APROBÓ
EJECUTÓ
```

No se colapsan siempre en `modificado por`.

Un mismo actor puede ocupar varios papeles solo cuando la evidencia así lo demuestre.

---

#### 40. Principal, actor y principal técnico

La experiencia debe conservar la diferencia entre:

```text
principal_id
effective_actor_id
technical_principal_id
```

El principal técnico no se presenta como autor empresarial cuando existe un actor humano efectivo.

Un job o una migración no recibe un humano ficticio.

---

#### 41. Dispositivo y sesión

`device_id` y `session_id`, cuando existan, pueden formar parte del detalle autorizado.

No sustituyen la identidad del actor.

Su exposición queda sujeta a minimización, sensibilidad y necesidad de investigación.

---

#### 42. Tiempo histórico

La sección distingue:

```text
occurred_at
!=
recorded_at
```

`occurred_at` representa cuándo ocurrió la acción o hecho.

`recorded_at` representa cuándo la evidencia quedó registrada.

La UI no utiliza un solo timestamp ambiguo cuando ambos tienen significado distinto.

---

#### 43. Territorio histórico

La investigación usa el territorio relevante cuando ocurrió el evento.

Ejemplo:

```text
EVENTO OCURRIÓ EN SEDE A
+
TRABAJADOR HOY ESTÁ EN SEDE B
```

El historial no se reclasifica como si hubiera ocurrido en Sede B.

Se conserva:

```text
TERRITORIO HISTÓRICO
!=
TERRITORIO ACTUAL
```

---

#### 44. Recurso protegido y resolución territorial

Para auditoría de seguridad se conservan:

```text
permission = viso.authorization.audit_logs.view
resource = AUDIT_EVENT
territory = RECURSIVE_EVENT
mode = BASE_ONLY
```

La lectura no depende de un turno operativo ni check-in por sí misma.

La concesión de la capacidad y su alcance siguen perteneciendo a las matrices y excepciones canónicas.

Esta tarea no otorga el permiso a ningún actor nuevo.

---

#### 45. Auditoría transversal no significa permiso universal

Poder entrar al dominio `Auditoría` no concede acceso a toda evidencia de Vento OS.

Cada evento o familia relacionada conserva:

- capacidad de lectura;
- recurso;
- alcance;
- sensibilidad;
- minimización;
- política de vínculo;
- owner.

La sección compone una experiencia.

No crea un wildcard.

---

#### 46. Filtros mínimos conceptuales

La experiencia puede ofrecer filtros por dimensiones que la fuente auditable soporte, por ejemplo:

- rango temporal;
- actor;
- sujeto;
- trabajador objetivo;
- rol base;
- rol operativo;
- permiso;
- aplicación;
- familia de evidencia;
- source kind;
- change kind;
- resultado;
- carril;
- efecto;
- organización;
- sede;
- área;
- correlation id;
- command id;
- reason code;
- sensibilidad;
- referencia de aprobación;
- referencia de origen.

No se presenta un filtro que obligue a inventar campos inexistentes.

---

#### 47. Los filtros reducen, nunca amplían

Se conserva:

```text
FILTRO SOLICITADO
⊆
CONJUNTO AUTORIZADO
```

Un `site_id`, `area_id`, actor, subject o event id enviado por cliente no amplía la consulta.

El servidor construye o valida la lectura contra el conjunto permitido.

---

#### 48. Búsqueda por trabajador

Buscar por trabajador objetivo no concede acceso a todos sus eventos.

Cada evento sigue sujeto a:

```text
CAPACIDAD DE LECTURA
+
AUDIT_EVENT
+
RECURSIVE_EVENT
+
ALCANCE DEL AUDITOR
+
MINIMIZACIÓN
```

---

#### 49. Búsqueda por actor

Buscar por actor tampoco crea propiedad.

Un auditor no obtiene acceso a toda su propia actividad solo por ser el actor de eventos históricos.

La política del evento sigue aplicando.

---

#### 50. Ventana temporal acotada

La lista usa una ventana temporal explícita o una ventana por defecto acotada.

No se hace una consulta ilimitada como comportamiento ordinario.

El actor puede ampliar el rango únicamente dentro de los límites permitidos.

---

#### 51. Orden estable

El orden por defecto de una fuente compatible debe ser temporal descendente y estable.

Conceptualmente:

```text
occurred_at DESC
+
identificador estable DESC
```

Los empates no se reordenan de forma no determinista entre páginas.

---

#### 52. Paginación server-side

La lista se pagina en servidor o mediante un mecanismo equivalente que preserve seguridad y estabilidad.

No se permite:

```text
DESCARGAR TODO
→
FILTRAR EN CLIENTE
```

La paginación no ocurre antes de establecer el conjunto autorizado de forma que pueda filtrar silenciosamente eventos prohibidos y revelar cardinalidades laterales.

---

#### 53. Cursor y crecimiento del historial

Los eventos pueden seguir llegando mientras el auditor pagina.

La implementación debe usar un cursor estable o una estrategia equivalente.

No se bloquea el sistema de escritura solo para mantener una lista congelada.

---

#### 54. Detalle de evento

El detalle puede presentar, cuando existan y estén autorizados:

```text
identidad del evento
familia
actor
principal
sujeto
aplicación
permiso
carril
efecto
operación
resultado
changed_fields
before
after
motivo
aprobación
fuente
territorio histórico
decision_id
correlation_id
causation_id
versiones
fingerprints
occurred_at
recorded_at
retención
links
```

No todos los campos se muestran a todo auditor.

---

#### 55. Profundidad progresiva

La experiencia puede organizar el detalle como:

```text
RESUMEN
→
CAMBIO
→
BEFORE / AFTER
→
DECISIÓN
→
APROBACIÓN
→
EVIDENCIA RELACIONADA
```

Abrir un nivel más profundo revalida la autoridad aplicable cuando corresponda.

No se precarga todo el payload sensible únicamente porque el primer nivel sea visible.

---

#### 56. Acceso directo

Una URL directa o deep link a un evento no hereda autorización de una visita anterior.

Para auditoría de seguridad se revalida, según el contrato:

```text
viso.authorization.audit_logs.view
+
actor
+
alcance
+
AUDIT_EVENT
+
RECURSIVE_EVENT
```

Una lista previamente autorizada no funciona como capability token.

---

#### 57. Consistencia lista–detalle

Un evento visible en lista debe poder abrirse con la misma política o explicar de forma segura por qué dejó de estar disponible.

La lista no muestra campos que la política de detalle prohíbe revelar.

Un cambio de autoridad exige revalidación.

---

#### 58. Errores seguros y denegación

Una consulta sin autoridad suficiente no revela:

- si existe un evento oculto;
- quién actuó;
- qué permiso fue afectado;
- qué sede o área contiene;
- qué reason code posee;
- qué evidencia relacionada existe.

La experiencia distingue:

```text
SIN EVENTOS VISIBLES
!=
NO AUTORIZADO
!=
FUENTE NO DISPONIBLE
!=
FALLO TÉCNICO
```

sin filtrar información sensible.

---

#### 59. Estado vacío

Un estado vacío debe explicar únicamente lo que el actor puede concluir.

Ejemplo conceptual:

```text
No hay eventos visibles para los filtros y el periodo seleccionados.
```

No afirma que no existan eventos fuera del alcance del auditor.

---

#### 60. Minimización

La auditoría contiene evidencia suficiente para investigar.

No se convierte en un repositorio duplicado de datos personales.

Los snapshots y detalles se limitan a campos permitidos, referencias y valores necesarios.

La investigación no elimina la obligación de mínimo privilegio.

---

#### 61. Datos que no se reconstruyen para completar un evento

La experiencia no intenta recuperar o reconstruir desde otras fuentes valores sensibles prohibidos en payloads auditables, como:

```text
jwt
refresh_token
api_key
pin
password
credential_secret
private_key
raw_session_token
email
phone
document
address
photo
medical
disciplinary_text
```

La ausencia deliberada de esos datos no convierte la evidencia en incompleta.

---

#### 62. Sensibilidad

Cuando la evidencia conserve clasificación, la sección respeta valores como:

```text
FUNCTIONAL
FUNCTIONAL_SENSITIVE
ADMINISTRATIVE
PRIVILEGED
```

La sensibilidad puede afectar:

- visibilidad;
- detalle;
- vínculos;
- retención;
- tratamiento visual.

No es una etiqueta decorativa.

---

#### 63. Retención

La sección puede mostrar la clase de retención autorizada cuando sea relevante.

No cambia:

- política de retención;
- legal hold;
- plazo;
- purga;
- excepción permanente.

La lectura de auditoría no concede capacidad de eliminación.

---

#### 64. Correcciones

Una corrección histórica se representa como evidencia nueva y vinculada.

Cuando el contrato use:

```text
CORRECT_METADATA
```

la experiencia debe diferenciar una corrección de metadata de un cambio de autoridad material.

La corrección no reemplaza el evento original.

---

#### 65. Migraciones y jobs

Una evidencia originada por:

```text
JOB
MIGRATION
RECOVERY
```

puede carecer legítimamente de actor humano interactivo.

La UI conserva:

- source;
- principal técnico;
- comando;
- correlación;
- motivo o referencia;
- versión;
- resultado.

No atribuye la acción al último administrador que inició sesión.

---

#### 66. Legacy

Una fuente legacy puede mostrarse como evidencia limitada cuando:

- su origen es conocido;
- su identidad es estable;
- su lectura está autorizada;
- se conoce su grado de completitud;
- la UI la etiqueta como limitada.

No se normalizan por inferencia actor, permiso, carril, territorio, reason code o resultado que la fuente no pueda demostrar.

---

#### 67. Métricas de auditoría

La experiencia puede mostrar conteos derivados únicamente cuando:

- se calculan sobre el conjunto autorizado;
- no permiten inferir eventos ocultos;
- separan cambios aplicados de intentos;
- no mezclan `DENIED` con `TECHNICAL_FAILURE`;
- no mezclan cambios con decisiones;
- la ventana temporal es explícita.

Las métricas no sustituyen la lista de eventos ni el detalle.

---

#### 68. Color, iconos y etiquetas

El diseño visual puede usar color, iconos o etiquetas para facilitar lectura.

Se conserva:

```text
REPRESENTACIÓN VISUAL
!=
RESULTADO CANÓNICO
```

Un color rojo no transforma automáticamente un evento en deny, conflicto o error.

Un check verde no convierte una decisión `ALLOW` en cambio aplicado.

---

#### 69. Auditoría del acceso a auditoría

Consultar evidencia sensible también puede ser una acción auditable.

La implementación física deberá conservar el contrato aplicable sin crear recursión infinita.

La sección no oculta el hecho de que un auditor consultó evidencia cuando esa consulta debe registrarse.

---

#### 70. Frontera con `Acceso y seguridad`

`Acceso y seguridad` sigue siendo owner de:

- catálogos de roles;
- matrices;
- grants;
- denies;
- excepciones;
- procedencia;
- conflictos de seguridad;
- simulación canónica;
- administración de seguridad.

`Auditoría` puede investigar su evidencia histórica.

No edita esos objetos desde la vista histórica.

---

#### 71. Capacidad exacta de auditoría de seguridad

Para el historial de seguridad se conserva:

```text
viso.authorization.audit_logs.view
```

La existencia de `viso.access`, una sesión administrativa o acceso general a VISO no sustituye esa capacidad.

La ausencia actual de un consumidor físico de `audit_logs.view` en `vento-viso` no autoriza un fallback a `requireAppAccess` para declarar conforme la sección.

---

#### 72. Frontera con `VISO-AUTH-019`

`VISO-AUTH-019` conserva quién puede administrar seguridad.

Esta tarea preserva:

```text
AUDITAR SEGURIDAD
!=
ADMINISTRAR SEGURIDAD
```

Y también:

```text
PODER ADMINISTRAR
!=
PODER VER TODA AUDITORÍA
```

si el alcance de lectura no lo permite.

---

#### 73. Frontera con `VISO-UX-013`

`VISO-UX-013 — Limitar información según alcance territorial` conserva la presentación general de información administrativa por alcance.

Esta tarea fija para la auditoría que:

- el territorio histórico no se reemplaza por el actual;
- un filtro territorial solo reduce;
- el evento se autoriza sobre su contexto histórico aplicable;
- un cambio posterior de sede no reescribe el pasado.

---

#### 74. Frontera con `VISO-UX-019`

`VISO-UX-019 — Aplicar divulgación progresiva a seguridad avanzada` conserva la estrategia visual general para revelar detalle sensible.

Esta tarea define qué niveles de evidencia puede necesitar la investigación.

No adelanta el diseño final de seguridad avanzada.

---

#### 75. Frontera con Organización

`Organización` conserva el estado vigente y las mutaciones autorizadas de estructura.

`Auditoría` puede investigar cambios históricos de organización únicamente cuando exista evidencia propietaria auditable.

No se crea historia comparando la fila actual de `sites` o `areas` con una memoria local.

---

#### 76. Frontera con Programación

`Programación` conserva turnos, borradores, publicaciones, correcciones y su experiencia propietaria.

La auditoría puede correlacionar publicaciones o correcciones cuando exista evidencia histórica canónica.

Se preserva el handoff ya declarado:

```text
PUBLICACIONES / CORRECCIONES
→
TRAZABILIDAD INVESTIGABLE
```

La sección no modifica turnos desde el historial.

---

#### 77. Frontera con Operación

`Operación` conserva la configuración administrativa operativa propia de VISO.

`Auditoría` recibe el handoff explícito de evidencia de cambios y decisiones relevantes de `Operación`. Cuando exista una fuente auditable, debe permitir investigar:

- quién cambió una matriz;
- quién cambió un perfil operativo;
- quién cambió un punto de marcación;
- qué configuración existía en un momento histórico;
- qué warning se produjo;
- qué versión se consumió.

Toda mutación real de configuración debe producir evidencia según el contrato transversal aplicable. `Operación` no implementa un ledger nuevo y `Auditoría` no lo inventa.

No convierte el estado vigente de:

- puntos de marcación;
- perfiles operativos;
- roles por sede;
- preview;


en eventos históricos por inferencia.

---

#### 78. Frontera con NEXO y LOC

NEXO conserva ownership de LOC, inventario y ejecución logística.

La presencia de `inventory_locations` dentro de `/ops/audit` no transfiere ownership a VISO.

Los diagnósticos actuales sobre LOC pertenecen al carryover de reconciliación y handoff.

La auditoría transversal puede enlazar evidencia de NEXO únicamente mediante contratos autorizados.

---

#### 79. Frontera con ANIMA

ANIMA conserva la experiencia del trabajador y los eventos operativos que le correspondan, incluyendo captura de asistencia según sus contratos.

VISO no copia un historial de ANIMA para fabricar una auditoría propia.

Cuando exista evidencia relacionada autorizada, `Auditoría` puede enlazarla preservando owner, permiso y minimización.

---

#### 80. Frontera con otras aplicaciones

FOGO, ORIGO, PULSO, NUMERA, PASS, AURA y demás aplicaciones conservan sus auditorías, procesos y datos propietarios.

La sección `Auditoría` no se convierte en repositorio central de todos sus logs.

Una investigación transversal puede usar referencias o proyecciones autorizadas sin duplicar el sistema propietario.

---

#### 81. Handoffs en lugar de mutación

Desde un evento histórico puede existir una acción contextual como:

```text
VER OBJETO ACTUAL
IR A SUPERFICIE PROPIETARIA
ABRIR EVIDENCIA RELACIONADA
```

cada una sujeta a autorización propia.

No existe una acción genérica:

```text
CORREGIR DESDE AQUÍ
```

---

#### 82. No replay

Un evento histórico no ofrece un botón universal `Repetir`.

Reejecutar una intención requeriría:

- nueva solicitud;
- autorización actual;
- recurso actual;
- contexto actual;
- idempotencia actual;
- nueva evidencia.

La historia no es una cola de comandos ejecutables.

---

#### 83. No consola de recuperación

La sección no puede, por sí misma:

- revocar grants;
- revocar denies;
- cambiar matrices;
- cambiar roles;
- cambiar sedes;
- cambiar áreas;
- cambiar turnos;
- cerrar sesiones;
- bloquear dispositivos;
- ejecutar rollback;
- corregir eventos.

Puede enlazar a una superficie propietaria cuando exista y el actor tenga autoridad.

---

#### 84. No SIEM

`Auditoría` no se convierte en:

- SIEM;
- visor universal de logs;
- observabilidad general;
- agregador de errores;
- consola SQL;
- visor de stack traces;
- visor de secretos;
- explorador de logs de proveedor;
- sistema genérico de incidentes.

La sección administra evidencia empresarial y de seguridad conforme a contratos VENTO.

---

#### 85. Investigación no equivale a expediente

La auditoría puede aportar evidencia a una investigación.

No crea automáticamente:

- incidente;
- caso disciplinario;
- investigación laboral;
- expediente jurídico;
- ticket técnico.

La apertura y gestión de esos objetos pertenece a sus owners.

---

#### 86. Exportación no incluida

La lectura de auditoría no implica exportación masiva.

Esta tarea no define:

- CSV;
- JSON;
- XLSX;
- PDF;
- archivo bruto;
- dump;
- descarga masiva.

Una exportación sensible futura requiere contrato y capacidad explícitos.

---

#### 87. Impresión no incluida

La capacidad de lectura tampoco implica impresión.

Esta tarea no crea:

- plantilla imprimible;
- permiso de impresión;
- job de impresión;
- archivo para terceros.

---

#### 88. No inventar capacidad de exporte

No se crea:

```text
viso.authorization.audit_logs.export
```

ni una capacidad equivalente no presente en el catálogo canónico.

`audit_logs.view` no se interpreta como `export`.

---

#### 89. Privacidad del auditor

Ser auditor no elimina la privacidad.

La proyección visible debe limitar:

- datos personales;
- campos sensibles;
- referencias no necesarias;
- contenido de sistemas relacionados;
- internals técnicos.

La investigación se diseña bajo mínimo privilegio.

---

#### 90. Error técnico visible

Cuando falle la carga de evidencia, la UI debe informar un estado técnico seguro.

No debe mostrar:

- SQL;
- stack trace;
- secretos;
- credenciales;
- mensajes internos del proveedor;
- payloads completos no minimizados.

Un fallo técnico no se presenta como `DENIED`.

---

#### 91. Fuente no disponible

Una fuente obligatoria temporalmente inaccesible se representa como indisponible.

No se sustituye con:

- caché sin frescura demostrable;
- timestamps actuales;
- copia local no versionada;
- otra fuente con semántica parecida.

La sección puede degradar el detalle sin inventar certeza.

---

#### 92. Frescura y revalidación

La autorización de lectura se revalida cuando:

- cambia el actor;
- cambia el alcance;
- cambia la sesión;
- se abre un deep link;
- se abre un nivel sensible;
- el contrato exige frescura nueva.

La existencia de una lista ya cargada no otorga autoridad permanente.

---

#### 93. Caché

Cualquier caché futura debe preservar:

- identidad de evento;
- política de acceso;
- sensibilidad;
- versión;
- frescura;
- revocación o invalidación aplicable.

La tarea no autoriza cachear payloads sensibles en cliente por conveniencia.

---

#### 94. Rendimiento

La experiencia debe evitar cargas masivas.

El rendimiento se protege mediante:

- ventana temporal acotada;
- filtros server-side;
- paginación estable;
- proyección mínima;
- carga progresiva de detalle;
- no precarga de evidencia relacionada sensible.

No se cambia semántica para optimizar consultas.

---

#### 95. Responsive y accesibilidad

La experiencia debe mantener comprensible:

- orden temporal;
- resultado;
- actor;
- sujeto;
- fuente;
- before/after;
- relación entre eventos;

sin depender exclusivamente de color o ancho de escritorio.

En pantallas estrechas, la jerarquía puede apilarse sin perder la relación entre evento, resultado y contexto.

---

#### 96. Lenguaje visible

La interfaz prioriza lenguaje empresarial comprensible.

Puede traducir conceptos técnicos manteniendo el valor canónico disponible para detalle autorizado.

Ejemplos:

```text
APPLIED → Aplicado
DENIED → Denegado
CONFLICT → Conflicto
NO_CHANGE → Sin cambio
ROLLED_BACK → Revertido
```

La traducción no modifica el dato persistido.

---

#### 97. Navegación data-driven

La futura entrada `Auditoría` debe integrarse con la navegación gobernada de VISO.

Se conserva:

```text
NAVIGATION_SOURCE_IS_GOVERNED_DATA = YES
```

La tarea no ordena crear un árbol hardcoded paralelo.

La presencia en navegación requiere identidad semántica, destino conforme y permiso de lectura resoluble.

---

#### 98. Navegación visible no es autorización

Se conserva:

```text
AUDIT_MENU_VISIBLE
!=
AUDIT_EVENT_AUTHORIZED
```

La navegación puede proyectar que existe el dominio.

Cada consulta y cada detalle vuelven a validar la autorización aplicable.

---

#### 99. Permiso faltante

Una entrada de auditoría que requiera capacidad exacta no se publica como funcional usando acceso general a VISO cuando esa capacidad no puede resolverse.

La ausencia del permiso exacto no se corrige con:

- rol nominal;
- `viso.access`;
- app admin client;
- service role;
- visibilidad previa;
- query client-side.

---

#### 100. `service_role` no es autoridad del usuario

La futura implementación puede usar infraestructura técnica privilegiada únicamente dentro del patrón autorizado.

Un cliente administrativo o `service_role` no demuestra que el actor humano tenga derecho a leer el evento.

La autorización se resuelve antes de devolver la proyección sensible.

---

#### 101. Lista, detalle y métricas comparten frontera

No se admite que:

```text
LISTA = FILTRADA
DETALLE = SIN FILTRO
```

ni:

```text
LISTA = AUTORIZADA
MÉTRICA = GLOBAL
```

Lista, detalle, conteos y vínculos deben respetar la misma frontera o una más restrictiva.

---

#### 102. No inferir eventos ocultos por conteos

Los KPIs o totales no pueden revelar que existen eventos fuera del alcance del auditor.

Un conteo global no se muestra si la política solo autoriza un subconjunto.

La paginación tampoco revela cardinalidades prohibidas por side channel.

---

#### 103. Estado actual opcional separado

Cuando sea útil enlazar al estado actual, la experiencia lo presenta como referencia separada.

Conceptualmente:

```text
SNAPSHOT HISTÓRICO
──────────────
ESTADO ACTUAL — abrir en superficie propietaria
```

No se mezclan campos de ambas épocas en un solo objeto.

---

#### 104. Fuente de seguridad y `AUTH-DB-012`

La fundación física de `AUTH-DB-012` cubre cambios de permisos mediante evidencia append-only.

La sección conserva sus identidades cuando corresponda.

No declara `AUTH-DB-012` como tabla universal de auditoría de VISO.

---

#### 105. Adopción de writers

La existencia de infraestructura de auditoría no prueba que todos los writers actuales emitan evidencia canónica.

Se conserva:

```text
INFRAESTRUCTURA DISPONIBLE
!=
COBERTURA END-TO-END
```

La futura implementación debe verificar adopción real por writer y package.

La UI no etiqueta como `CANONICAL` una fuente que todavía no demuestre esa adopción.

---

#### 106. Simulación

Una simulación de autorización puede producir evidencia relacionada.

Se conserva:

```text
SIMULACIÓN
!=
CAMBIO REAL
```

La sección no presenta una simulación como mutación aplicada.

---

#### 107. Lifecycle de dispositivos

La auditoría del lifecycle de dispositivos conserva su owner y contrato.

`Auditoría` puede enlazar evidencia relacionada cuando sea pertinente y autorizada.

No copia el lifecycle a una tabla local para homogeneizarlo.

---

#### 108. Invalidación de contexto

Una mutación puede generar invalidación de contexto o autoridad derivada.

La interfaz solo presenta una relación:

```text
CAMBIO
→
INVALIDACIÓN
```

cuando exista correlación demostrable.

No infiere invalidación por el tipo del cambio.

---

#### 109. Eventos de catálogo

Una activación de catálogo puede conservar versión, hash, fuente y timestamp.

La sección no representa ese evento como si se hubiera modificado individualmente cada trabajador afectado indirectamente.

El evento de catálogo conserva su granularidad real.

---

#### 110. Grants y denies históricos

Un grant histórico conserva su efecto aunque después aparezca un deny.

Un deny histórico conserva su efecto aunque después se revoque.

La auditoría no reescribe el pasado con el estado efectivo actual.

---

#### 111. Revocación y expiración

Se conserva:

```text
REVOKE
!=
DELETE
```

Y:

```text
EXPIRE
!=
REVOKE
```

La historia conserva identidad y motivo de la transición real.

---

#### 112. Aprobación y activación

Cuando el contrato admita ambos momentos:

```text
APPROVE
!=
ACTIVATE
```

La auditoría puede mostrar cada hecho por separado.

La aprobación no inventa una activación inmediata.

---

#### 113. Vigencia empresarial

Cuando un cambio tenga `effective_from` o `effective_until`, esos valores representan vigencia empresarial.

No se confunden con el timestamp en que el evento de auditoría fue escrito.

La interfaz puede mostrar ambas dimensiones.

---

#### 114. Carryover sobre `/ops/audit`

El AS-IS de `/ops/audit` deja un hallazgo no bloqueante para esta definición documental:

| Hallazgo | Bloquea `VISO-UX-007` | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `VISO-ROUTE-030` conserva un diagnóstico actual que mezcla sedes, áreas, LOC, trabajadores y asignaciones y no cumple la semántica histórica del dominio `Auditoría` | no | `VISO-UX-017` / `VISO-UX-018` / owners aplicables | la superficie queda reconciliada por ownership y handoff o por una materialización explícita que elimine la contradicción semántica sin renumerar ni retirar prematuramente la ruta |

No se decide por inferencia cuál de los owners debe absorber toda la superficie.

---

#### 115. Carryover de entrada física conforme

Las fuentes vigentes no demuestran todavía una ruta física ya conforme que pueda declararse entrada canónica final del dominio `Auditoría`.

Esto no bloquea el contrato documental.

Propietario de salida:

```text
materialización física de VISO-UX-007
+
reconciliación de navegación y pantallas
```

Condición exacta de salida:

- identidad semántica no contradictoria;
- destino físico aprobado;
- permiso de lectura resoluble;
- lista y detalle autorizados;
- evidencia histórica real;
- navegación gobernada;
- pruebas aplicables.

---

#### 116. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos descartados:** 0
**Requisitos obsoletos:** 0

La tarea organiza y especializa una experiencia administrativa de auditoría ya protegida por contratos vigentes de trazabilidad, autorización, territorio, evidencia, inventario de rutas, ownership, privacidad y no retiro prematuro.

No introduce una regla empresarial protegida independiente que exija modificar el Registro Canónico de Requisitos de Prueba.

---

#### 117. Cobertura de prueba vigente reutilizada

Esta sección es trazabilidad heredada y no modifica el Registro Canónico de Requisitos de Prueba.

Se reutiliza especialmente:

- `TREQ-VISO-001` para coherencia entre administración, autorización, efecto visible, conflictos, procedencia, territorio y auditoría;
- `TREQ-VISO-004` y `TREQ-VISO-005` para conservar el inventario y las identidades estables de rutas VISO;
- `TREQ-VISO-022` y `TREQ-VISO-023` para no retirar prematuramente superficies y reconciliar el universo de rutas;
- `TREQ-AUTH-007` para administración y lectura sensible bajo capacidad y territorio autorizados;
- `TREQ-AUTH-009` para resolución territorial determinista;
- `TREQ-AUTH-011` para atribución de actor, dispositivo, sede, área y cambios de trabajador;
- `TREQ-AUTH-012` para separar simulación de autoridad real y conservar evidencia;
- `TREQ-AUTH-013` para impedir bypass server-side mediante input manipulado;
- `TREQ-AUTH-014` para invalidación y frescura de autoridad derivada;
- `TREQ-AUTH-015` para decisiones y acciones protegidas con evidencia correlacionable, incluyendo denegaciones, reintentos, rollback y operaciones administrativas;
- `TREQ-AUTH-016` para revocación sin destruir historia;
- `TREQ-UX-020` para ownership y contrato consistentes entre aplicaciones;
- `TREQ-UX-023` para clasificación y retiro gobernado de superficies.

La mención de estos identificadores es únicamente cobertura existente.

---

#### 118. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-007`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en una rama documental de `VISO-UX-007`. |
| REMOTA | PASS | Se verificaron el `main` vigente de `vento-shell`, la continuidad del bloque G3, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, owner documental, `VISO-UX-001..006` publicados, el inventario de `VISO-ROUTE-030`, `VISO-AUTH-018`, contratos de auditoría y el AS-IS actual de `src/app/ops/audit/page.tsx` en `vento-viso/main`; la superficie actual es un diagnóstico de consistencia y no un historial de cambios. |
| OPERATIVA | NOT_EXECUTED | No se consultaron eventos productivos, no se ejecutaron investigaciones reales y no se modificaron configuraciones, permisos, sedes, áreas, LOC, trabajadores, turnos ni datos empresariales. |
| FÍSICA | NOT_EXECUTED | No se modificaron `vento-viso`, Supabase, tablas de auditoría, writers, rutas, navegación, contratos, migraciones, datos, RLS, RPC, Auth ni despliegues. |

---

#### 119. Criterios de aceptación

1. existe exactamente un contrato `VISO-AUDIT-SECTION-001`;
2. la tarea conserva `VISO-UX-006` como anterior y `VISO-UX-008` como siguiente;
3. la topología permanece `PER_IMPLEMENTATION_UNIT`;
4. el gate físico permanece `POST_E5_PACKAGE`;
5. `Auditoría` es el sexto dominio administrativo definido por `VISO-UX-001`;
6. auditoría describe hechos históricos y no estado vigente;
7. auditoría no se convierte en autorización;
8. auditoría no se convierte en consola de mutación;
9. la experiencia transversal de investigación permanece separada del historial contextual de `Acceso y seguridad`;
10. `VISO-AUTH-018` conserva la semántica de auditoría de seguridad;
11. `VISO-UX-007` no redefine qué evidencia es válida;
12. no se inventa un `VSCREEN-*` principal;
13. no se inventa un `VPROC-*` principal;
14. `VISO-ROUTE-030` conserva su identidad;
15. `/ops/audit` AS-IS se reconoce como diagnóstico de consistencia actual;
16. `/ops/audit` AS-IS no se declara auditoría canónica;
17. `/ops/audit` no se promociona como `VISO_DOMAIN_ENTRY` conforme mientras conserve semántica contradictoria;
18. `VISO-ROUTE-030` se trata como `CROSS_OWNER_TRANSITION` mientras persista el AS-IS actual;
19. no se retira prematuramente `VISO-ROUTE-030`;
20. no se inventa una nueva ruta física para llenar la brecha;
21. la futura entrada `Auditoría` requiere destino semánticamente conforme;
22. la navegación permanece data-driven;
23. menú visible no equivale a evento autorizado;
24. `viso.access` no sustituye la capacidad exacta de auditoría de seguridad;
25. `viso.authorization.audit_logs.view` permanece la capacidad exacta para esa familia;
26. `AUDIT_EVENT` permanece el recurso protegido de esa lectura;
27. `RECURSIVE_EVENT` conserva la resolución territorial histórica;
28. la lectura permanece `BASE_ONLY` para esa capacidad;
29. la tarea no concede capacidades a actores nuevos;
30. la evidencia histórica se separa del estado actual;
31. la evidencia permanece append-only;
32. una corrección produce nueva evidencia vinculada cuando aplica;
33. `ALLOW` se distingue de cambio aplicado;
34. cambio aplicado se distingue de intento;
35. `DENIED` se distingue de `TECHNICAL_FAILURE`;
36. `INVALID` conserva su significado;
37. `CONFLICT` conserva su significado;
38. `NO_CHANGE` no se presenta como aplicado;
39. `ROLLED_BACK` conserva evidencia;
40. change set e items conservan su granularidad;
41. la cardinalidad declarada coincide con items reales;
42. before/after proviene de evidencia persistida;
43. CREATE puede tener before inexistente;
44. evidencia faltante no se inventa;
45. `changed_fields` delimita el diff cuando existe;
46. fingerprints no se recalculan en cliente como sustituto;
47. decisión y ejecución permanecen separadas;
48. correlación no se infiere por proximidad;
49. causalidad no se infiere sin referencia;
50. links relacionados no conceden acceso al objeto destino;
51. solicitante, aprobador y ejecutor pueden distinguirse;
52. actor humano no se sustituye por principal técnico;
53. jobs y migraciones no fabrican actor humano;
54. `occurred_at` se distingue de `recorded_at`;
55. territorio histórico no se reescribe con territorio actual;
56. el dominio no crea permiso universal de auditoría;
57. los filtros solo usan dimensiones respaldadas por la fuente;
58. los filtros solo reducen el conjunto autorizado;
59. búsqueda por trabajador no concede todos sus eventos;
60. búsqueda por actor no crea propiedad;
61. la ventana temporal es acotada;
62. el orden de lista es estable;
63. la paginación es server-side o equivalente seguro;
64. el cursor tolera crecimiento append-only sin orden inestable;
65. el detalle aplica minimización;
66. la profundidad progresiva no precarga payload sensible;
67. el acceso directo revalida autorización;
68. lista y detalle conservan política consistente;
69. los errores no revelan eventos ocultos;
70. el vacío no afirma inexistencia fuera del alcance;
71. no se reconstruyen secretos para completar evidencia;
72. sensibilidad se respeta;
73. retención se respeta y no se administra desde la sección;
74. legacy se etiqueta como limitado cuando corresponda;
75. legacy no se normaliza por inferencia;
76. métricas se calculan solo sobre conjunto autorizado;
77. métricas no permiten inferir eventos ocultos;
78. color e iconos no redefinen resultados;
79. consultar auditoría puede ser auditable;
80. `Acceso y seguridad` conserva ownership de sus mutaciones;
81. `VISO-AUTH-019` conserva quién administra seguridad;
82. `VISO-UX-013` conserva la experiencia territorial general;
83. `VISO-UX-019` conserva divulgación progresiva de seguridad avanzada;
84. Organización conserva estructura vigente;
85. Programación conserva turnos y publicaciones;
86. Operación conserva configuración operativa vigente;
87. NEXO conserva LOC e inventario;
88. ANIMA conserva su experiencia y eventos propietarios;
89. otras aplicaciones conservan sus auditorías y procesos;
90. los handoffs no mutan desde el historial;
91. no existe replay genérico;
92. la sección no es consola de recuperación;
93. la sección no es SIEM;
94. la investigación no crea expediente disciplinario o incidente por inferencia;
95. la lectura no implica exportación;
96. la lectura no implica impresión;
97. no se inventa una capacidad de exporte;
98. la privacidad del auditor aplica mínimo privilegio;
99. los errores técnicos no exponen internals;
100. una fuente indisponible no se sustituye por datos no equivalentes;
101. la autoridad se revalida ante cambios relevantes;
102. una caché futura no puede ampliar autoridad;
103. el rendimiento usa rango, filtros, paginación y carga progresiva;
104. la experiencia es usable sin depender solo de color;
105. las etiquetas visibles no cambian valores canónicos;
106. `service_role` no es autoridad del usuario;
107. lista, detalle y métricas respetan una frontera coherente;
108. conteos no revelan eventos ocultos;
109. el estado actual, si se enlaza, permanece separado del snapshot histórico;
110. `AUTH-DB-012` no se declara auditoría universal de VISO;
111. infraestructura de auditoría no se confunde con adopción end-to-end de writers;
112. simulación no se presenta como cambio real;
113. lifecycle de dispositivo conserva su owner;
114. invalidación solo se correlaciona cuando existe evidencia;
115. eventos de catálogo conservan su granularidad;
116. grants y denies históricos no se reescriben por el estado actual;
117. `REVOKE` se distingue de delete;
118. `EXPIRE` se distingue de revoke;
119. aprobación se distingue de activación cuando aplica;
120. vigencia empresarial se distingue del timestamp de auditoría;
121. el carryover de `/ops/audit` tiene owner y condición de salida;
122. la ausencia de ruta física conforme tiene condición de salida explícita;
123. no se crean requisitos de prueba;
124. no se modifican requisitos de prueba;
125. no se modifica el Registro Canónico de Requisitos de Prueba;
126. no se ejecutan cambios físicos;
127. no se modifica Supabase;
128. toda futura modificación de Supabase de VENTO permanece en `vento-shell`.

---

#### 120. Límites

Esta tarea no:

- modifica código de `vento-viso`;
- modifica `/ops/audit`;
- mueve rutas;
- crea rutas;
- renumera `VISO-ROUTE-*`;
- retira rutas;
- crea `VSCREEN-*`;
- crea `VPROC-*`;
- crea tablas de auditoría;
- crea vistas SQL;
- crea RPC;
- crea RLS;
- crea funciones;
- crea triggers;
- crea migraciones;
- modifica Supabase;
- modifica Auth;
- modifica Storage;
- modifica Realtime;
- modifica Edge Functions;
- modifica cron o colas;
- cambia secretos;
- crea eventos reales;
- corrige eventos históricos;
- borra evidencia;
- cambia retención;
- ejecuta purgas;
- crea legal holds;
- crea permisos;
- reasigna permisos;
- crea `audit_logs.export`;
- exporta auditoría;
- imprime auditoría;
- administra grants;
- administra denies;
- administra matrices;
- cambia perfiles;
- cambia sedes;
- cambia áreas;
- cambia turnos;
- cambia LOC;
- cambia inventario;
- cambia dispositivos;
- ejecuta simulaciones;
- ejecuta rollback;
- ejecuta replay;
- abre incidentes;
- abre casos disciplinarios;
- crea SIEM;
- agrega logs de infraestructura;
- expone SQL o stack traces;
- copia auditorías propietarias de otras aplicaciones;
- selecciona package;
- prepara package gate;
- aprueba package gate;
- autoriza implementación física;
- ejecuta implementación física;
- desarrolla `VISO-UX-008`;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

La identidad exacta de cualquier unidad física futura se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 121. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-006 — Crear sección Operación`

**TAREA ACTUAL APROBADA**
`VISO-UX-007 — Crear sección Auditoría`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-008 — Definir inicio para propietario`
### ✅ VISO-UX-008 — Definir inicio para propietario

**Estado:** APROBADA
**Tarea anterior:** VISO-UX-007 — Crear sección Auditoría
**Tarea siguiente:** VISO-UX-009 — Definir inicio para gerente general
**Tipo de tarea:** definición técnico-documental de la proyección `Inicio` de VISO para el rol base canónico `propietario`; especializa la pantalla ejecutiva existente para presentar prioridades, decisiones pendientes, excepciones, riesgos, indicadores, compromisos y accesos administrativos autorizados con alcance y procedencia explícitos, sin convertir el rol en wildcard, sin duplicar bandejas o datos de aplicaciones propietarias, sin ejecutar mutaciones desde el resumen y conservando `PER_IMPLEMENTATION_UNIT` con gate físico `POST_E5_PACKAGE`
**Bloque:** BLOQUE G3 — VISO completo
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/G_VISO/03_EXPERIENCIA_ADMINISTRATIVA.md`
**Estado físico resultante:** contrato completo de la proyección `Inicio` para `propietario` definido sobre la entrada especial `/`; la raíz física actual de `vento-viso` permanece AS-IS y requiere materialización posterior por `implementation_unit_id` para alinearse con este contrato detrás de `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se modifican `vento-viso`, la ruta `/`, componentes, navegación runtime, permisos, matrices, contratos compartidos, Supabase, datos, migraciones, RLS, RPC, Auth, Storage, secretos, aplicaciones propietarias, despliegues ni configuración remota
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe funcionar la entrada `Inicio` de VISO cuando la persona resuelta posee el rol base canónico `propietario`, de modo que pueda comprender qué requiere atención ejecutiva sin convertir la página en un backoffice universal, un launcher paralelo, una bandeja transversal duplicada o una fuente de autorización.

La experiencia debe permitir responder de forma directa:

```text
¿QUÉ REQUIERE MI DECISIÓN O SEGUIMIENTO?
¿QUÉ EXCEPCIONES O RIESGOS REQUIEREN ATENCIÓN?
¿QUÉ INDICADORES AUTORIZADOS EXPLICAN LA SITUACIÓN?
¿QUÉ COMPROMISOS IMPORTANTES SIGUEN ABIERTOS?
¿QUÉ DOMINIO DE VISO DEBO ABRIR PARA INVESTIGAR O ACTUAR?
¿QUÉ INFORMACIÓN PROVIENE DE OTRA APLICACIÓN PROPIETARIA?
¿QUÉ ALCANCE ESTOY VIENDO?
¿QUÉ DATOS ESTÁN FRESCOS, PARCIALES, NO DISPONIBLES O BLOQUEADOS?
```

La regla raíz queda:

```text
INICIO PROPIETARIO
=
PROYECCIÓN EJECUTIVA AUTORIZADA
+
ALCANCE EXPLÍCITO
+
PRIORIDADES DE FUENTE
+
DECISIONES PENDIENTES
+
EXCEPCIONES Y RIESGOS
+
INDICADORES TRAZABLES
+
HANDOFFS SEGUROS
```

Y nunca:

```text
ROL PROPIETARIO
=
AUTORIZACIÓN UNIVERSAL
```

ni:

```text
INICIO
=
SEGUNDO SISTEMA DE DATOS
```

ni:

```text
INICIO
=
CONSOLA DE MUTACIÓN DIRECTA
```

---

#### 2. Handoff recibido de `VISO-UX-001`

`VISO-UX-001 — Reorganizar navegación por dominios administrativos` entrega sin reapertura:

```text
PRIMARY_ENTRY = /
PRIMARY_ENTRY_LABEL = Inicio
PRIMARY_ENTRY_IS_ADMIN_DOMAIN = NO
PRIMARY_ENTRY_IS_PERMISSION_WILDCARD = NO
ADMINISTRATIVE_DOMAIN_COUNT = 6
```

Los seis dominios continúan siendo exactamente:

```text
Personal
Programación
Acceso y seguridad
Organización
Operación
Auditoría
```

La entrada `Inicio`:

- puede resumir información autorizada;
- puede conducir a destinos permitidos;
- no concede autoridad sobre esos destinos;
- no sustituye permisos, contexto, recursos ni guards;
- no crea un séptimo dominio;
- conserva la identidad histórica de la ruta raíz;
- recibe su contenido por perfil desde `VISO-UX-008..012`.

Esta tarea desarrolla únicamente la variante `propietario`.

---

#### 3. Handoff recibido de `VISO-UX-002..007`

Las seis tareas de dominio entregan a `Inicio` superficies y fronteras ya definidas:

| Dominio | Capacidad de `Inicio` | Frontera que se conserva |
| --- | --- | --- |
| `Personal` | resumir trabajo laboral administrativo autorizado y abrir su superficie propietaria | no absorbe TALENTO ni ANIMA |
| `Programación` | resumir cobertura, excepciones o decisiones autorizadas de programación | no crea, publica o corrige turnos desde el home |
| `Acceso y seguridad` | advertir sobre decisiones, conflictos o revisiones de seguridad autorizadas | no concede, revoca o simula autoridad desde el home |
| `Organización` | presentar cambios, decisiones o estructura relevante de gobierno | no deriva permisos desde jerarquía, sede o área |
| `Operación` | resumir configuración operativa administrativa relevante | no ejecuta operación propietaria ni crea contexto activo |
| `Auditoría` | señalar evidencia o anomalías que merezcan investigación | no convierte historia en estado vigente ni muta desde el historial |

`Inicio` compone referencias y estados.

No crea un séptimo owner funcional.

---

#### 4. Handoff recibido de `VISO-UX-007`

`VISO-UX-007 — Crear sección Auditoría` cierra el sexto dominio y deja intacta la continuidad hacia esta tarea.

La proyección de propietario puede mostrar, cuando exista autoridad y evidencia suficiente:

- que existen cambios relevantes recientes;
- que una anomalía requiere investigación;
- que una decisión produjo un resultado histórico consultable;
- que una fuente de evidencia está incompleta o limitada.

No puede:

- exponer payload sensible del evento en el home;
- sustituir la sección `Auditoría`;
- deducir causalidad;
- presentar historia como estado actual;
- ejecutar corrección, rollback o replay desde una tarjeta.

---

#### 5. Naturaleza, topología y gate

La topología permanece:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
instance_pattern = <task_id>::<implementation_unit_id>
```

Por tanto:

- esta tarea define una sola vez el contrato documental del perfil `propietario`;
- la materialización física posterior pertenece a una unidad de implementación gobernada;
- la aprobación documental no crea ni autoriza una instancia física;
- ninguna materialización se ejecuta antes del gate aplicable;
- cada unidad física debe demostrar que conserva las decisiones de este contrato.

---

#### 6. Contrato de `Inicio` para propietario

Se define:

```text
VISO_OWNER_HOME_CONTRACT = VISO-OWNER-HOME-001
HOME_PROFILE = propietario
PRIMARY_ENTRY_LABEL = Inicio
PRIMARY_OBSERVED_ROUTE_ID = VISO-ROUTE-001
PRIMARY_OBSERVED_ROUTE = /
CANONICAL_SCREEN_TARGET = VSCREEN-0007
CANONICAL_SCREEN_NAME = Inicio ejecutivo y gerencial
PRIMARY_CANONICAL_PROCESS = VPROC-0001
PRIMARY_CANONICAL_STEP = VPROC-0001::STEP-REVIEW_EXECUTIVE_WORK
SCREEN_MODALITY = OWNER_WORKSPACE
PRIMARY_INTERACTION_ROLE = MONITOR
PRIMARY_STEP_POSITION = CROSS_CUTTING
HOME_IS_ADMIN_DOMAIN = NO
HOME_PROFILE_IS_AUTHORIZATION = NO
HOME_IS_GLOBAL_TASK_INBOX = NO
HOME_IS_CROSS_OWNER_EDITOR = NO
TREQ_CHANGES = 0
```

La relación entre `VISO-ROUTE-001`, la ruta `/` y `VSCREEN-0007` es el objetivo canónico de esta proyección.

La materialización física deberá demostrar ese binding mediante los contratos de pantalla, navegación y paquete aplicables.

Esta tarea no declara que el código AS-IS ya lo cumpla.

---

#### 7. Identidad canónica de pantalla

La pantalla objetivo ya existe:

```text
VSCREEN-0007 — Inicio ejecutivo y gerencial
```

Su declaración canónica permanece:

```text
Presentar prioridades, excepciones, indicadores y decisiones pendientes
 de dirección o gerencia con alcance explícito.
```

La tarea no crea otra pantalla como:

```text
Inicio propietario
Dashboard propietario
Panel propietario
Home owner
```

como identidad canónica independiente.

El perfil `propietario` es una proyección de contenido sobre `VSCREEN-0007`.

---

#### 8. Proceso principal

La pantalla conserva:

```text
PRIMARY_PROCESS = VPROC-0001
```

La referencia funcional vigente de ese proceso es gobernar decisiones empresariales con:

- registro;
- alcance;
- responsable;
- compromisos;
- seguimiento.

`Inicio` no reemplaza el proceso.

Lo proyecta para revisión ejecutiva.

---

#### 9. Paso dominante

Se conserva:

```text
VPROC-0001::STEP-REVIEW_EXECUTIVE_WORK
```

con función:

```text
Revisar prioridades y decisiones ejecutivas
```

La modalidad es:

```text
MONITOR
CROSS_CUTTING
```

Por ello la página privilegia comprensión, priorización y navegación.

No privilegia edición directa.

---

#### 10. Procesos relacionados

`VSCREEN-0007` conserva como procesos relacionados:

```text
VPROC-0061
VPROC-0063
```

`VPROC-0061` aporta la dimensión de:

```text
medición
→ análisis
→ decisión de mejora
→ verificación del resultado
```

`VPROC-0063` aporta la dimensión de riesgos empresariales:

```text
riesgo
→ tratamiento
→ responsable
→ seguimiento
```

Ser procesos relacionados no los convierte en widgets obligatorios ni autoriza a VISO a duplicar los datos de su owner.

---

#### 11. Rol base `propietario`

El rol `propietario` representa gobierno organizacional y puede disponer de la cobertura administrativa más amplia permitida por los contratos vigentes.

Se conserva:

```text
PROPIETARIO
+
PERMISO BASE EXPLÍCITO
+
ALCANCE VÁLIDO
+
RECURSO RESUELTO
=
AUTORIZACIÓN ADMINISTRATIVA POSIBLE
```

La palabra `propietario` no concede una acción por sí sola.

---

#### 12. Prohibición de wildcard

Queda preservado:

```text
propietario != *
propietario != bypass operativo
propietario != service_role
propietario != acceso automático a APP-REVIEW
```

La composición del home no puede implementar un atajo equivalente mediante:

- mostrar todo;
- consultar todo con cliente privilegiado y filtrar después;
- asumir alcance global por cargo;
- habilitar acciones porque el rol coincide;
- omitir denegaciones individuales;
- omitir restricciones de recurso;
- omitir contexto cuando una capacidad lo exige.

---

#### 13. Perfil de presentación no equivale a autoridad

Esta tarea puede utilizar el rol base resuelto para elegir una variante visual.

No puede utilizarlo para decidir la autorización de cada dato o acción.

Se conserva:

```text
HOME_PROFILE = propietario
```

pero:

```text
HOME_PROFILE
!=
AUTHORIZATION_DECISION
```

Cada proyección visible vuelve a depender de su capacidad, alcance, recurso y contexto aplicables.

---

#### 14. Entrada a VISO

`VISO-UX-008` comienza después de que la persona ya ha entrado válidamente a VISO.

La tarea no redefine el home global de SHELL.

No se admite:

```text
ROL = propietario
→ SHELL AUTOREDIRECT A VISO
```

La selección de aplicación en el ecosistema conserva sus contratos propietarios.

---

#### 15. Alcance del propietario

La proyección no interpreta `propietario` como visibilidad territorial ilimitada.

Puede existir cobertura amplia de organización ordinaria, pero permanecen vigentes:

- recursos exactos;
- ámbitos organizacionales;
- territorios explícitos;
- dominios aislados;
- APP-REVIEW;
- restricciones de sensibilidad;
- denegaciones;
- reglas de dispositivo;
- reautenticación;
- condiciones operativas de capacidades de doble carril.

---

#### 16. `G(B)` no equivale a universo absoluto

Cuando una capacidad utilice cobertura organizacional ordinaria:

```text
G(B)
```

continúa excluyendo superficies o dominios que su contrato excluya, incluidos entornos aislados y de revisión cuando corresponda.

El home no convierte `G(B)` en:

```text
ALL_DATA
```

---

#### 17. Territorio explícito

Una tarjeta o indicador territorial se calcula únicamente sobre el conjunto permitido.

Se conserva:

```text
VISIBLE_AGGREGATE
⊆
AUTHORIZED_DATASET
```

Nunca:

```text
GLOBAL_AGGREGATE
→ FILTRAR DESPUÉS
```

cuando esa estrategia exponga información que el actor no puede consultar.

---

#### 18. Denegaciones y restricciones conservan precedencia

Una concesión amplia al rol base no elimina:

- denegación individual;
- denegación estructural;
- restricción de recurso;
- requisito de reautenticación;
- bloqueo de dispositivo;
- incompatibilidad de contexto;
- indisponibilidad de fuente;
- sensibilidad superior.

El home debe degradar la proyección afectada sin inventar acceso alternativo.

---

#### 19. Estado AS-IS de la ruta raíz

La ruta observada actual es:

```text
VISO-ROUTE-001
/
src/app/page.tsx
```

Su familia observada es:

```text
INICIO
```

Actualmente exige acceso general a VISO antes de renderizar.

Eso protege la entrada a la aplicación.

No demuestra todavía protección específica de cada resumen o destino.

---

#### 20. Contenido AS-IS observado

La raíz física actual presenta un `Panel VISO` y consulta conteos de:

- trabajadores;
- usuarios de Vento Pass;
- satélites o negocios de PASS;
- colecciones comerciales;
- recompensas de fidelización;
- vacantes.

También ofrece enlaces o acciones rápidas hacia:

- personal;
- PASS;
- negocios;
- menú comercial;
- vacantes;
- contenido PASS;
- website CMS.

Esta lista describe el snapshot físico.

No constituye el diseño objetivo aprobado por esta tarea.

---

#### 21. Brecha principal del AS-IS

La página actual mezcla capacidades de múltiples owners en una sola composición y utiliza acceso general a VISO como guard de entrada.

El objetivo requiere:

```text
RESUMEN POR RESPONSABILIDAD EJECUTIVA
+
PROYECCIÓN AUTORIZADA POR ELEMENTO
+
OWNER EXPLÍCITO
+
ALCANCE EXPLÍCITO
```

No:

```text
CONTEOS DISPONIBLES TÉCNICAMENTE
+
LINKS HISTÓRICOS
```

---

#### 22. El AS-IS no se certifica por coincidencia parcial

Que la ruta actual:

- exista;
- tenga tarjetas;
- tenga números;
- tenga accesos rápidos;
- use un guard de aplicación;

no demuestra conformidad con `VSCREEN-0007`.

La futura materialización deberá reconciliar contenido, ownership, autorización, alcance, estados, navegación y evidencia.

---

#### 23. Arquitectura de información objetivo

La proyección `propietario` se organiza conceptualmente en estas regiones:

```text
1. Contexto y alcance
2. Requiere decisión
3. Excepciones y riesgos
4. Indicadores ejecutivos autorizados
5. Compromisos y seguimiento
6. Dominios VISO
7. Handoffs a owners externos
```

La implementación puede usar otros componentes visuales si conserva esta semántica.

---

#### 24. Región `Contexto y alcance`

La cabecera deberá permitir comprender:

- que la persona está en VISO;
- que está viendo `Inicio`;
- que la variante de presentación corresponde al perfil `propietario`;
- qué organización o ámbito autorizado aplica;
- si existe simulación activa;
- si el contexto está degradado, parcial o desactualizado.

No mostrará un selector que amplíe autoridad.

---

#### 25. Perfil visible sin tratarlo como permiso

La UI puede identificar el contexto de presentación con texto comprensible como:

```text
Vista de propietario
```

siempre que no sugiera:

```text
Acceso total
Superusuario
Control absoluto
```

El rol explica por qué se usa esta composición.

No explica por sí solo cada autorización.

---

#### 26. Región `Requiere decisión`

Esta región presenta objetos que realmente requieran una decisión, revisión o aprobación del actor dentro de su alcance.

Cada elemento debe conservar, cuando aplique:

- asunto;
- owner;
- prioridad de fuente;
- plazo o vencimiento;
- alcance;
- estado;
- responsable;
- consecuencia resumida;
- destino propietario.

---

#### 27. Ninguna aprobación se ejecuta desde el resumen

La acción principal de una tarjeta de decisión es navegar a la superficie propietaria.

No se admite un botón genérico de:

```text
APROBAR
```

que ejecute la mutación desde el home sin:

- contexto completo;
- evidencia;
- autorización atómica;
- segregación;
- reautenticación cuando aplique;
- validación final del owner.

---

#### 28. Región `Excepciones y riesgos`

La región presenta situaciones que necesitan atención por desviación, conflicto, riesgo o condición excepcional.

Puede incluir proyecciones autorizadas de:

- riesgos empresariales;
- conflictos administrativos;
- cobertura laboral problemática;
- incumplimientos o vencimientos;
- excepciones operativas administrativas;
- anomalías de auditoría;
- degradaciones relevantes de fuente.

No crea un motor universal de riesgos.

---

#### 29. Riesgo no equivale a alerta técnica

Se conserva:

```text
BUSINESS_RISK
!=
TECHNICAL_LOG
!=
APPLICATION_ERROR
```

Un incidente técnico puede alimentar una proyección ejecutiva únicamente cuando exista un contrato que lo convierta en información empresarial relevante.

El home no se convierte en observabilidad.

---

#### 30. Conflicto no equivale a error

Una contradicción de configuración, una denegación, una indisponibilidad técnica y un conflicto prospectivo conservan sus semánticas propietarias.

No se muestran bajo una única etiqueta genérica:

```text
Problemas
```

si ello elimina la consecuencia o el owner.

---

#### 31. Región `Indicadores ejecutivos autorizados`

La región presenta un conjunto reducido de indicadores con valor directivo.

Cada indicador debe identificar o poder resolver:

- qué mide;
- fuente propietaria;
- periodo;
- alcance;
- unidad;
- actualización;
- estado de disponibilidad;
- destino para análisis cuando exista.

---

#### 32. No todos los conteos son indicadores

Un número disponible en una tabla no se convierte automáticamente en KPI.

Se preserva:

```text
ROW_COUNT
!=
BUSINESS_INDICATOR
```

Un indicador requiere semántica, fuente, alcance y periodo comprensibles.

---

#### 33. No fabricar KPI desde el home

`VISO-UX-008` no define nuevas fórmulas financieras, comerciales, productivas, laborales o logísticas.

Cuando el indicador pertenece a otra aplicación:

- la aplicación propietaria conserva cálculo y fuente;
- VISO consume una proyección autorizada;
- el enlace abre el owner;
- no se mantiene una fórmula duplicada en el home.

---

#### 34. Indicadores financieros

NUMERA conserva ownership de hechos económicos, costos, tesorería, presupuestos, cierres y análisis financiero.

`Inicio` puede presentar una proyección autorizada de alto nivel cuando exista contrato y fuente.

No calcula:

- margen;
- caja;
- utilidad;
- presupuesto;
- cartera;
- costo;

mediante lógica paralela.

---

#### 35. Indicadores operativos

NEXO, FOGO, ORIGO y PULSO conservan sus métricas y hechos propietarios.

VISO puede mostrar un resumen directivo autorizado.

No convierte una métrica en capacidad de ejecución operativa.

---

#### 36. Indicadores laborales

Personal y Programación pueden entregar información administrativa útil a dirección.

La proyección debe aplicar minimización.

No utiliza la página ejecutiva para exponer por defecto:

- expediente individual completo;
- información médica;
- texto disciplinario;
- documentos privados;
- detalle personal innecesario.

---

#### 37. Indicadores de seguridad

La presencia de una anomalía o revisión de seguridad puede proyectarse de forma mínima.

El home no expone:

- grants completos;
- denies completos;
- scopes sensibles;
- eventos privilegiados;
- detalles técnicos de autorización;

sin abrir la superficie especializada y revalidar autoridad.

---

#### 38. Región `Compromisos y seguimiento`

La región puede resumir compromisos empresariales abiertos relacionados con dirección.

Cada elemento debe conservar:

- compromiso;
- responsable;
- fecha;
- estado;
- owner;
- alcance;
- referencia al objeto propietario.

No crea un segundo ledger de compromisos.

---

#### 39. Compromiso no equivale a tarea local

La proyección puede presentar trabajo que requiere seguimiento.

No lo copia como una nueva entidad de VISO si el owner ya conserva su identidad.

Se conserva:

```text
PROJECTION_ITEM
!=
NEW_BUSINESS_RECORD
```

---

#### 40. Frontera con la bandeja transversal de SHELL

SHELL ya posee la identidad canónica:

```text
VSCREEN-0005 — Bandeja transversal de tareas y notificaciones
```

`Inicio` de VISO no duplica esa bandeja.

La diferencia es:

```text
SHELL
→ coordinación transversal de trabajo y notificaciones

VISO Inicio propietario
→ revisión ejecutiva de decisiones, excepciones, indicadores y seguimiento administrativo
```

---

#### 41. No existe una segunda bandeja global

Queda prohibido que `Inicio`:

- replique todos los work items de SHELL;
- consuma todas las notificaciones del ecosistema;
- ejecute claim;
- ejecute start;
- cambie ownership de trabajo;
- mantenga estados paralelos de bandeja.

Puede enlazar al trabajo propietario cuando corresponda.

---

#### 42. Región `Dominios VISO`

La página puede mostrar accesos hacia los seis dominios canónicos:

```text
Personal
Programación
Acceso y seguridad
Organización
Operación
Auditoría
```

No los convierte en seis métricas obligatorias.

Su objetivo es orientar.

---

#### 43. Acceso a `Personal`

El acceso a `Personal` se presenta cuando la persona tenga autoridad suficiente para la superficie destino.

Puede acompañarse de un resumen permitido.

No muestra expedientes individuales únicamente porque el rol sea `propietario`.

---

#### 44. Acceso a `Programación`

El acceso a `Programación` puede destacar cobertura, excepciones o decisiones autorizadas.

No permite publicar, editar o eliminar programación desde el home.

Toda mutación se ejecuta en la superficie propietaria con validación vigente.

---

#### 45. Acceso a `Acceso y seguridad`

El home puede señalar que existe trabajo de seguridad relevante.

No presenta una consola reducida de grants, denies, roles o perfiles.

La seguridad avanzada conserva su propia profundidad y controles.

---

#### 46. Acceso a `Organización`

El home puede mostrar cambios estructurales pendientes, decisiones o alertas de consistencia autorizadas.

No trata sede, área o jerarquía como permiso.

---

#### 47. Acceso a `Operación`

El home puede mostrar estado administrativo de configuración operativa relevante.

No crea rol operativo efectivo, turno, check-in o permiso por abrir esa tarjeta.

---

#### 48. Acceso a `Auditoría`

El home puede mostrar una señal mínima de hechos que requieren investigación.

La apertura de auditoría vuelve a validar su autorización y alcance.

No precarga payload histórico sensible para esconderlo visualmente después.

---

#### 49. Visibilidad de una tarjeta

Una tarjeta o región visible requiere que su proyección sea autorizada.

Se conserva:

```text
VISIBLE_HOME_ITEM
=
AUTHORIZED_PROJECTION
```

No:

```text
VISIBLE_HOME_ITEM
=
ROLE_NAME_MATCH
```

---

#### 50. Destino visible no implica acción permitida

Aunque un destino sea visible:

```text
DESTINATION_VISIBLE
!=
ALL_DESTINATION_ACTIONS_ALLOWED
```

La superficie destino revalida cada acción.

---

#### 51. Región `Handoffs a owners externos`

El propietario puede requerir información o decisiones cuyo owner no es VISO.

La página puede presentar accesos autorizados hacia aplicaciones propietarias como:

- NUMERA;
- NEXO;
- FOGO;
- ORIGO;
- PULSO;
- ANIMA;
- otras superficies laborales canónicas cuando correspondan.

La lista física final depende de capacidad, disponibilidad y contrato.

---

#### 52. Handoff no equivale a editor local

Se conserva:

```text
CROSS_APP_LINK
!=
LOCAL_EDITOR
```

El home puede:

- explicar qué requiere atención;
- mostrar un resumen permitido;
- identificar al owner;
- abrir el destino.

No replica el formulario propietario.

---

#### 53. PASS y la frontera cliente

Una capacidad administrativa relacionada con clientes puede tener un owner laboral distinto de PASS.

El tema del dato no decide la aplicación destino.

La proyección utiliza el owner canónico de la acción.

No usa PASS como backoffice universal por asociación temática.

---

#### 54. AURA diferida

Una identidad o capacidad diferida no se promociona al home como destino operativo por existir en catálogo.

La presentación exige:

- lifecycle compatible;
- superficie materializada;
- autorización;
- disponibilidad;
- handoff válido.

---

#### 55. Priorización

El home puede ordenar trabajo por prioridad únicamente cuando la prioridad provenga de una fuente propietaria o de una regla canónica reproducible.

No calcula un score local opaco con:

- cantidad de registros;
- color;
- rol;
- aplicación;
- posición en el DOM;
- recencia aislada.

---

#### 56. Prioridad de fuente

Cuando un objeto posea prioridad canónica:

- la proyección conserva el valor;
- puede traducirlo visualmente;
- no lo recalcula;
- no lo eleva porque el usuario sea propietario;
- no lo degrada por pertenecer a otro owner.

---

#### 57. Sin prioridad canónica

Si no existe una prioridad gobernada:

- el home puede agrupar por tipo, vencimiento o owner cuando exista dato fiable;
- no inventa `CRÍTICO`, `ALTO`, `MEDIO` o `BAJO`;
- no sugiere una urgencia inexistente.

---

#### 58. Vencimientos

Un vencimiento solo se muestra cuando proviene del objeto o proceso propietario.

No se infiere por:

- antigüedad visual;
- fecha de actualización;
- tiempo desde creación;
- ausencia de actividad.

---

#### 59. Decisiones pendientes

Un elemento se considera pendiente de decisión únicamente cuando:

- existe una transición o revisión realmente pendiente;
- el actor puede al menos consultar el objeto;
- el contrato admite que esa persona participe en la decisión;
- el estado es vigente;
- el owner confirma la condición.

---

#### 60. Pendiente no equivale a ejecutable

Puede existir un elemento que requiere atención pero cuya acción aún no sea ejecutable.

Se conserva:

```text
ATTENTION_REQUIRED
!=
ACTION_EXECUTABLE
```

La UI explica el bloqueo sin fabricar un botón funcional.

---

#### 61. Elementos bloqueados

Un elemento bloqueado puede aparecer si el actor está autorizado a conocer el bloqueo y esa información es útil para seguimiento.

Debe distinguir:

- bloqueado por dependencia;
- bloqueado por autorización;
- bloqueado por conflicto;
- bloqueado por dato faltante;
- bloqueado por indisponibilidad técnica;
- bloqueado por lifecycle.

No expone detalles sensibles del motivo si el actor no puede conocerlos.

---

#### 62. Conteos autorizados

Todo badge o conteo se calcula sobre el conjunto visible y autorizado.

Se preserva:

```text
VISIBLE_COUNT
=
COUNT(AUTHORIZED_SET)
```

No se admite mostrar un total global y ocultar filas posteriores cuando ese total revele información prohibida.

---

#### 63. Cero real y cero por autorización

La experiencia debe evitar confundir:

```text
0 ELEMENTOS EXISTENTES
```

con:

```text
0 ELEMENTOS VISIBLES
```

cuando esa distinción pueda hacerse de forma segura.

No revela la existencia de objetos ocultos para explicar el cero.

---

#### 64. Estados vacíos

La UI distingue al menos conceptualmente:

```text
SIN ELEMENTOS
SIN ELEMENTOS AUTORIZADOS
FUENTE NO DISPONIBLE
FUENTE NO IMPLEMENTADA
DATOS PARCIALES
ERROR TÉCNICO
```

La redacción final no debe revelar información que la política de seguridad prohíba.

---

#### 65. Frescura

Un resumen ejecutivo debe permitir conocer si el dato es vigente para la decisión que representa.

Cuando la fuente lo soporte, conserva:

- timestamp de actualización;
- periodo;
- versión;
- snapshot;
- estado de sincronización;
- freshness contract.

---

#### 66. Dato stale

Un dato reconocido como stale no se presenta como vigente.

La UI puede:

- etiquetarlo;
- degradar el indicador;
- bloquear una acción dependiente;
- ofrecer navegación al owner.

No reemplaza automáticamente el valor con cero.

---

#### 67. Indisponibilidad

Una fuente obligatoria no disponible no se convierte en:

```text
SIN PENDIENTES
```

ni en:

```text
TODO BIEN
```

La indisponibilidad conserva identidad propia.

---

#### 68. Carga parcial

Si una región puede cargarse de forma independiente, un fallo local puede degradar únicamente esa región cuando el contrato lo permita.

No debe invalidarse todo el home por un widget no crítico.

Tampoco debe presentarse el home completo como sano si una fuente crítica falló.

---

#### 69. Fuente de verdad visible

Cada resumen debe poder identificar su owner funcional.

La experiencia puede usar lenguaje humano como:

```text
Fuente: NUMERA
Fuente: Programación
Fuente: Auditoría
```

sin exponer detalles técnicos innecesarios.

---

#### 70. Procedencia de datos

La procedencia sirve para explicar de dónde viene el resultado.

No concede autoridad.

La presentación detallada del origen de permisos continúa reservada a `VISO-UX-014`.

---

#### 71. Frontera con `VISO-UX-013`

`VISO-UX-013 — Limitar información según alcance territorial` conserva el patrón transversal detallado de presentación territorial.

Esta tarea fija únicamente la obligación de que el home:

- no amplíe territorio;
- muestre alcance suficiente para interpretar el dato;
- no mezcle sedes invisibles en agregados;
- no use un selector visual como autoridad.

---

#### 72. Frontera con `VISO-UX-014`

`VISO-UX-014 — Mostrar origen de permisos de forma comprensible` conserva la experiencia detallada de procedencia autorizativa.

`Inicio` no intenta resolver anticipadamente esa explicación.

Puede indicar que una acción o destino no está disponible sin fabricar el origen.

---

#### 73. Frontera con `VISO-UX-015`

`VISO-UX-015 — Mostrar conflictos antes de guardar` conserva el patrón detallado de conflictos prospectivos.

El home puede indicar que existe un conflicto que requiere atención.

No ejecuta la comparación pre-save ni toma la decisión del editor propietario.

---

#### 74. Frontera con `VISO-UX-016`

`VISO-UX-016 — Permitir vista previa exacta de cada trabajador` conserva el preview detallado individual.

El home no muestra simulaciones masivas de trabajadores ni utiliza un preview como estado real.

---

#### 75. Frontera con `VISO-UX-017`

`VISO-UX-017 — Evitar duplicar configuración propia de otras aplicaciones` conserva la decisión final sobre duplicidades físicas.

Esta tarea clasifica como no conformes las mutaciones cross-owner dentro del home, pero no retira todavía las superficies históricas.

---

#### 76. Frontera con `VISO-UX-018`

`VISO-UX-018 — Enlazar a la aplicación propietaria cuando corresponda` conserva el patrón final de handoff cross-app.

Esta tarea exige que cualquier acceso externo futuro sea un handoff protegido.

No fija todavía todos los destinos físicos.

---

#### 77. Frontera con `VISO-UX-019`

`VISO-UX-019 — Aplicar divulgación progresiva a seguridad avanzada` conserva la presentación detallada de información sensible.

Esta tarea exige minimización en `Inicio` y evita precargar detalle privilegiado.

No diseña anticipadamente los niveles internos de seguridad avanzada.

---

#### 78. Frontera con `VISO-UX-020`

`VISO-UX-020 — Ejecutar pruebas con administradores reales` conserva la validación con personas usuarias.

La proyección de propietario deberá entrar en ese piloto con casos representativos de:

- decisión;
- riesgo;
- indicador;
- excepción;
- navegación a dominio;
- handoff externo;
- dato parcial;
- denegación;
- error.

---

#### 79. No edición inline sensible

`Inicio` no debe convertirse en superficie de edición rápida para acciones de alto impacto.

No se ejecutan inline:

- grants;
- denies;
- cambios de rol;
- publicación de horarios;
- cambios organizacionales;
- cierre financiero;
- ajustes de inventario;
- aprobaciones de compra;
- publicación comercial;
- rollback;
- revocaciones;
- cambios de retención.

---

#### 80. Acciones seguras del home

Las acciones ordinarias del home son:

```text
ABRIR
REVISAR
IR AL DETALLE
VER DOMINIO
VER OWNER
INVESTIGAR
```

Una futura acción adicional debe demostrar que su atomicidad, autorización y consecuencia son compatibles con la naturaleza `MONITOR` de la pantalla.

---

#### 81. Deep links

Un enlace desde `Inicio` transporta únicamente referencias no secretas suficientes para abrir el destino.

La superficie destino debe:

1. resolver sesión;
2. resolver actor;
3. resolver recurso;
4. resolver alcance;
5. validar capacidad;
6. cargar estado vigente.

El home no transporta una decisión `ALLOW`.

---

#### 82. Retorno a `Inicio`

Una superficie propietaria puede volver a `/` sin convertir parámetros del retorno en autoridad.

El regreso puede conservar preferencias de UX seguras como:

- sección visual;
- periodo no sensible;
- filtros permitidos.

No conserva una autorización stale.

---

#### 83. Preferencias personales

Una preferencia de presentación puede modificar:

- orden de regiones secundarias cuando esté permitido;
- densidad;
- colapsado;
- periodo por defecto;
- widgets opcionales autorizados.

No puede:

- revelar una región prohibida;
- cambiar el alcance;
- crear una capacidad;
- elevar prioridad canónica;
- mantener un dato sensible tras perder autoridad.

---

#### 84. Personalización no crea contratos paralelos

No se crea una matriz local de:

```text
rol → widgets → permisos
```

como fuente de seguridad.

La composición puede tener reglas de presentación.

La visibilidad real se resuelve con autorización vigente.

---

#### 85. Simulación

Si el contexto vigente corresponde a una simulación autorizada, el home debe distinguirlo de la autoridad real.

Se conserva:

```text
SIMULATED_VIEW
!=
REAL_AUTHORITY
```

Una simulación no habilita mutaciones desde tarjetas.

---

#### 86. Indicador visual de simulación

La condición de simulación debe ser suficientemente visible para evitar que la persona confunda:

- datos simulados;
- alcance simulado;
- decisiones simuladas;

con su contexto real.

El detalle del patrón transversal permanece en los contratos de simulación y seguridad.

---

#### 87. Dispositivo compartido

La entrada desde un dispositivo compartido conserva las reglas del dispositivo, actor y reautenticación.

El rol `propietario` no elimina esos controles.

Una sesión técnica de dispositivo no se presenta como actor humano.

---

#### 88. Reautenticación

Un enlace hacia una acción sensible puede exigir reautenticación en el destino.

`Inicio` no evita ese paso porque la sesión ya exista o porque el usuario sea propietario.

---

#### 89. Cambio de autoridad durante la sesión

Si cambian grants, denies, alcance, estado laboral o contexto relevante:

- las proyecciones deben revalidarse conforme a la política de frescura;
- un widget anteriormente visible no conserva autoridad por caché;
- una navegación posterior revalida.

---

#### 90. Concurrencia

Mientras el home está abierto, los objetos pueden cambiar.

La tarjeta es una proyección.

El destino debe volver a consultar estado vigente antes de una acción.

No se aprueba un cambio usando exclusivamente el snapshot del home.

---

#### 91. Caché

Una futura caché de la página deberá respetar:

- actor;
- ámbito;
- versión de permisos;
- sensibilidad;
- freshness;
- invalidación.

No se admite una caché compartida entre actores que pueda mezclar datos autorizados.

---

#### 92. Carga progresiva

La UI puede cargar regiones en paralelo o progresivamente.

La estrategia no cambia:

- autorización;
- owner;
- alcance;
- semántica de ausencia;
- semántica de error.

---

#### 93. Responsive

La prioridad informativa se conserva en desktop, tablet y tamaños reducidos.

El layout responsive no puede:

- ocultar el alcance;
- ocultar el estado de simulación;
- ocultar un bloqueo crítico;
- transformar una etiqueta en autorización;
- convertir varias acciones sensibles en un menú ambiguo.

---

#### 94. Accesibilidad

La página debe ser navegable sin depender únicamente de:

- color;
- hover;
- posición;
- iconografía sin nombre.

Prioridad, riesgo, estado, frescura y bloqueo requieren texto o semántica accesible equivalente.

---

#### 95. Teclado y foco

El orden de foco debe seguir la jerarquía de la información.

Los elementos interactivos distinguen:

- tarjeta navegable;
- enlace;
- filtro;
- disclosure;
- botón real.

Una tarjeta informativa no se anuncia como botón si no ejecuta acción.

---

#### 96. Densidad

La página ejecutiva evita presentar un muro de tablas.

La información primaria debe favorecer:

- síntesis;
- excepción;
- comparación;
- decisión;
- navegación.

El detalle permanece en superficies especializadas.

---

#### 97. Divulgación progresiva general

El home presenta primero información suficiente para decidir dónde profundizar.

No incluye por defecto:

- payloads completos;
- listas extensas;
- historial exhaustivo;
- matrices completas;
- documentos completos;
- PII innecesaria.

---

#### 98. Estado `NOT_AUTHORIZED`

La UI no revela datos ocultos para explicar una denegación.

Dependiendo del contrato puede:

- ocultar la región;
- presentar acceso no disponible;
- conducir a una explicación segura.

No inventa un fallback privilegiado.

---

#### 99. Estado `NOT_AVAILABLE`

Un destino autorizado puede estar temporalmente no disponible.

El home distingue disponibilidad de autorización.

```text
AUTHORIZED
!=
AVAILABLE
```

---

#### 100. Estado `NOT_IMPLEMENTED`

Una capacidad canónica todavía no materializada no se presenta como operativa.

El home puede omitirla o mostrar un estado gobernado cuando sea útil.

No crea una ruta ficticia para llenar el espacio.

---

#### 101. Estado `TECHNICAL_FAILURE`

Un fallo técnico no se interpreta como:

- cero;
- deny;
- ausencia de trabajo;
- cumplimiento;
- estado saludable.

La región degradada conserva una explicación segura.

---

#### 102. Error parcial versus error global

El contrato debe distinguir:

```text
REGION_FAILURE
```

de:

```text
HOME_CANNOT_BE_AUTHORIZED
```

Un error secundario no inutiliza todo el home cuando las demás regiones siguen siendo seguras.

Un fallo en resolución de actor o autoridad sí puede requerir fail-closed global.

---

#### 103. Registro de acceso

Las lecturas sensibles desde `Inicio` deben conservar la trazabilidad exigida por sus contratos propietarios.

Esta tarea no crea un nuevo ledger de lectura.

No elimina obligaciones de auditoría por tratarse de un resumen.

---

#### 104. Telemetría de experiencia

La futura implementación puede medir de forma minimizada:

- regiones vistas;
- navegación iniciada;
- tiempo hasta abrir una decisión;
- errores de carga;
- handoffs completados;
- abandono.

La telemetría no registra contenido sensible como sustituto de eventos de negocio.

---

#### 105. Éxito de la experiencia

El éxito del home no se mide por cantidad de tarjetas.

Debe favorecer que la persona:

1. reconozca qué requiere atención;
2. entienda por qué;
3. conozca el alcance;
4. identifique el owner;
5. navegue al destino correcto;
6. no obtenga autoridad adicional;
7. no necesite conocer rutas o tablas.

---

#### 106. No optimizar para “mostrar todo”

El rol propietario no justifica máxima densidad.

Se conserva:

```text
MÁS AUTORIDAD POTENCIAL
!=
MÁS INFORMACIÓN SIEMPRE VISIBLE
```

La página prioriza relevancia y minimización.

---

#### 107. Comparaciones

Una comparación entre sedes, periodos o dominios solo se presenta cuando:

- la métrica es comparable;
- la fuente lo admite;
- el alcance autoriza ambos lados;
- la temporalidad es compatible;
- la unidad es consistente.

No compara cifras heterogéneas para producir una señal ejecutiva falsa.

---

#### 108. Tendencias

Una tendencia exige al menos una serie o comparación temporal válida de la fuente propietaria.

No se infiere tendencia desde dos snapshots incompatibles ni desde cambios de definición.

---

#### 109. Semántica de color

El color puede reforzar prioridad, riesgo o estado.

No los define.

Se conserva:

```text
COLOR
!=
BUSINESS_STATE
```

---

#### 110. Iconografía

Un icono puede ayudar a distinguir dominios o estados.

No sustituye:

- texto;
- owner;
- estado;
- severidad;
- accesibilidad.

---

#### 111. Nomenclatura

La página usa lenguaje empresarial.

Evita como labels primarios:

- nombres de tablas;
- schemas;
- RPC;
- namespaces internos;
- nombres de componentes;
- identificadores técnicos;

salvo en vistas de diagnóstico autorizadas.

---

#### 112. Navegación hacia los seis dominios

El home conserva la jerarquía de primer nivel aprobada.

No introduce grupos como:

```text
Otros
Herramientas
Legacy
Tablas
Backoffice
```

para esconder ownership no resuelto.

---

#### 113. No promoción de rutas cross-owner

Una ruta histórica físicamente alojada en `vento-viso` no se convierte en acceso ejecutivo de VISO por aparecer en el código actual.

Su tratamiento sigue `VISO-UX-017/018`.

---

#### 114. Ruta raíz estable

La identidad histórica se conserva:

```text
VISO-ROUTE-001 = /
```

Esta tarea no:

- renumera la ruta;
- crea `/owner`;
- crea `/dashboard-owner`;
- crea `/executive`;
- redirige el rol a otra URL.

---

#### 115. Pantalla estable

La identidad de pantalla se conserva:

```text
VSCREEN-0007
```

Los perfiles `VISO-UX-008..012` pueden definir composiciones distintas sin crear cinco pantallas canónicas por nombre de rol.

---

#### 116. Frontera con `VISO-UX-009`

`VISO-UX-009 — Definir inicio para gerente general` definirá la proyección del siguiente perfil.

Esta tarea no decide:

- qué regiones exactas verá `gerente_general`;
- qué prioridad tendrá su contexto;
- qué diferencias existirán con `propietario`;
- qué acciones o resúmenes serán propios de ese perfil.

---

#### 117. Frontera con `VISO-UX-010`

El inicio de gerente de sede queda reservado a `VISO-UX-010`.

No se usa la versión `propietario` como fallback territorial para gerentes.

---

#### 118. Frontera con `VISO-UX-011`

El inicio de auxiliar administrativa queda reservado a `VISO-UX-011`.

La amplitud de la vista propietaria no se hereda por pertenecer a una función administrativa.

---

#### 119. Frontera con `VISO-UX-012`

El inicio de contador queda reservado a `VISO-UX-012`.

La información financiera no se presenta con la misma composición únicamente porque `propietario` pueda consultar parte de ella.

---

#### 120. Selección de variante

La materialización futura debe resolver la variante desde identidad y rol base canónicos vigentes.

No usa:

- texto de cargo;
- alias;
- correo;
- grupo local;
- label de UI;
- preferencia del navegador;
- query string.

La selección de variante no sustituye autorización.

---

#### 121. Rol desconocido o inconsistente

Si la identidad requerida para elegir la variante no puede resolverse de forma confiable, la implementación no debe presentar la vista de propietario por conveniencia.

El fallback final pertenece al modelo de acceso y a las demás variantes canónicas.

No se asume `propietario`.

---

#### 122. Cambio de rol

Si el rol base cambia durante la vigencia de la sesión:

- la variante de home debe revalidarse según frescura;
- no conserva widgets de propietario por caché;
- no conserva datos ya no permitidos;
- no conserva acciones.

---

#### 123. Sesión técnica no define variante humana

`service_role`, un job, una función privilegiada o un principal técnico no pueden activar la variante `propietario`.

La variante pertenece al actor humano resuelto.

---

#### 124. Owners y responsables

Cada elemento proyectado conserva un responsable comprensible cuando la fuente lo proporcione.

No se asigna automáticamente al propietario como responsable de todo lo visible.

Se conserva:

```text
VISIBLE_TO_OWNER
!=
OWNED_BY_OWNER
```

---

#### 125. Escalamiento

Un objeto puede ser visible por escalamiento.

El escalamiento debe provenir del proceso propietario.

El home no crea una regla genérica:

```text
TODO VENCIDO
→ PROPIETARIO
```

sin contrato que la sustente.

---

#### 126. Riesgos y decisiones sin owner

Un objeto que requiera atención ejecutiva y carezca de owner válido debe presentarse como inconsistencia cuando el actor esté autorizado a conocerla.

El home no corrige silenciosamente el owner.

La reparación pertenece al proceso propietario.

---

#### 127. Ausencia de evidencia

Una recomendación o decisión que requiera evidencia no se presenta como lista para aprobar si la evidencia obligatoria falta.

Puede mostrarse como:

```text
EVIDENCIA INCOMPLETA
```

sin fabricar una conclusión.

---

#### 128. Explicación de una señal

Una señal ejecutiva debe ser explicable con datos permitidos.

No se acepta una tarjeta que solo diga:

```text
Atención requerida
```

sin owner, categoría o contexto suficiente para saber dónde continuar.

---

#### 129. Explicabilidad no expone internals

La explicación puede indicar:

- regla empresarial;
- periodo;
- alcance;
- fuente;
- estado;
- resultado.

No necesita exponer:

- SQL;
- stack trace;
- token;
- secreto;
- query interna;
- service role;
- detalles de proveedor.

---

#### 130. Materialización de datos

La futura implementación puede consumir:

- proyecciones server-side;
- servicios propietarios;
- contratos compartidos;
- vistas o RPC autorizadas existentes;
- agregados propietarios.

Esta tarea no escoge una arquitectura física universal.

---

#### 131. No usar cliente administrativo como permiso

La disponibilidad técnica de un cliente privilegiado no sustituye la autorización del actor.

Se preserva:

```text
SERVER PRIVILEGE
!=
HUMAN AUTHORITY
```

El futuro reader del home debe demostrar cómo restringe cada proyección al conjunto autorizado.

---

#### 132. Consultas agregadas

Los agregados deben resolverse de forma segura en servidor.

No se permite descargar conjuntos amplios no autorizados para:

```text
cargar todo
→ filtrar en cliente
→ mostrar un número
```

---

#### 133. Datos cross-owner

Cuando un resumen combine dimensiones de varios owners, la composición debe preservar:

- fuente por dimensión;
- compatibilidad temporal;
- identidad de los objetos;
- alcance;
- ausencia o error;
- owner de la acción siguiente.

No crea una tabla maestra duplicada.

---

#### 134. Unidades y moneda

Una métrica con unidad o moneda conserva su unidad explícita.

La página no suma ni compara valores de unidades incompatibles sin una transformación canónica de su owner.

---

#### 135. Zona horaria

Fechas, vencimientos y periodos se presentan usando la política temporal propietaria.

No se convierte silenciosamente todo evento a la zona del navegador si ello cambia su significado empresarial.

---

#### 136. Periodo por defecto

El home puede utilizar una ventana por defecto para indicadores y actividad.

La ventana debe ser comprensible y no puede alterar la semántica del proceso.

Cambiar el periodo de visualización no cambia autoridad.

---

#### 137. Búsqueda global

Esta tarea no crea un buscador universal de todos los objetos de Vento OS.

Una futura búsqueda debe conservar owner, autorización, minimización y clasificación.

No se deriva de `Inicio` por conveniencia.

---

#### 138. Exportación

La capacidad de ver un resumen no concede exportación.

Se conserva:

```text
VIEW
!=
EXPORT
```

No se agrega un botón genérico de descarga del dashboard.

---

#### 139. Impresión

La capacidad de ver el home tampoco concede impresión de datos sensibles.

No se crean plantillas o permisos de impresión mediante esta tarea.

---

#### 140. Compartir

Compartir una vista, URL o captura no es una capacidad derivada del contrato.

Los links conservan revalidación de acceso.

No se generan snapshots públicos.

---

#### 141. Notificaciones

`Inicio` puede reflejar estados producidos por sistemas de notificación o trabajo.

No crea una nueva notificación únicamente porque una tarjeta sea visible.

La emisión pertenece a su contrato propietario.

---

#### 142. Lectura silenciosa no produce efecto empresarial

Cargar el home no debe:

- aprobar;
- reconocer formalmente;
- cerrar;
- reclamar;
- asignar;
- cambiar prioridad;
- marcar evidencia como revisada;
- disparar una mutación de negocio;

salvo que exista un contrato explícito posterior para esa acción.

---

#### 143. Idempotencia de lectura

Refrescar `Inicio` conserva comportamiento de lectura.

La misma carga repetida no produce efectos empresariales adicionales.

---

#### 144. Degradación segura

Cuando una fuente opcional falla, la página no inventa datos.

Cuando una fuente crítica de autoridad falla, la región o página falla cerrado según el contrato.

No se sustituye una fuente canónica por una lista local hardcodeada.

---

#### 145. Hardcode de tarjetas

Puede existir estructura de presentación en código.

No puede existir un catálogo hardcodeado que declare autorización por:

```text
if role == propietario
→ show everything
```

La elegibilidad de cada proyección consume contratos vigentes.

---

#### 146. Evolución del catálogo

La incorporación futura de una nueva capacidad o aplicación no la agrega automáticamente al home.

Debe existir:

- owner;
- finalidad ejecutiva;
- proyección segura;
- autorización;
- destino;
- tratamiento de ausencia y error.

---

#### 147. Aplicaciones retiradas o diferidas

Una aplicación retirada, diferida o no disponible no conserva una tarjeta histórica por inercia.

La retirada física del acceso se gobierna por los contratos de navegación, consumidores y rollout correspondientes.

---

#### 148. No retiro prematuro del AS-IS

Esta tarea define el objetivo.

No autoriza borrar hoy:

- tarjetas;
- rutas;
- accesos históricos;
- componentes;
- páginas cross-owner.

El retiro físico exige materialización, reconciliación, pruebas y rollback cuando corresponda.

---

#### 149. Mapeo de la raíz actual

La futura unidad física deberá reconciliar cada elemento AS-IS del root con una de estas disposiciones:

```text
KEEP_AS_OWNER_HOME_PROJECTION
MOVE_TO_VISO_DOMAIN
CONVERT_TO_CROSS_OWNER_HANDOFF
REMOVE_AFTER_REPLACEMENT
DEFER_WITH_OWNER
```

No se admite:

```text
KEEP_BECAUSE_IT_ALREADY_EXISTS
```

como justificación suficiente.

---

#### 150. Tarjetas actuales relacionadas con PASS

Las tarjetas de usuarios, contenido o recompensas de PASS no permanecen automáticamente en `Inicio` por existir en el código actual.

Su tratamiento final depende de:

- owner funcional;
- utilidad ejecutiva real;
- autorización;
- `VISO-UX-017`;
- `VISO-UX-018`;
- fronteras laborales/cliente aplicables.

---

#### 151. Tarjetas actuales comerciales

Menú comercial, producto comercial y otras superficies de venta conservan el owner definido por sus contratos.

El home no se convierte en editor comercial general.

Una necesidad ejecutiva puede expresarse como indicador o handoff.

---

#### 152. Tarjetas actuales de vacantes

La existencia de vacantes puede ser relevante para dirección.

Sin embargo:

- TALENTO conserva candidatura y selección según sus fronteras;
- VISO conserva trabajo administrativo que sí le corresponde;
- el home no recrea el embudo de candidatos como widget completo.

---

#### 153. Website CMS

La presencia histórica de accesos a website CMS en la raíz no convierte CMS en dominio VISO.

La futura disposición debe respetar ownership y las tareas `VISO-UX-017/018`.

---

#### 154. Trabajadores

Un conteo de trabajadores puede ser útil solo si existe definición ejecutiva, alcance y periodo apropiados.

El número bruto de filas de `employees` no se declara KPI por esta tarea.

---

#### 155. Resumen de organización

`Organización` puede aportar señales como cambios pendientes o estructura relevante.

No se usa el número de sedes como sustituto de salud organizacional.

---

#### 156. Programación y cobertura

La dirección puede necesitar conocer excepciones de cobertura.

La proyección debe provenir del modelo de programación y no de una suma local incompatible con Semana/Mes.

---

#### 157. Seguridad y acceso

Una revisión pendiente de acceso puede ser ejecutivamente relevante.

El home presenta únicamente la mínima señal necesaria.

La acción ocurre en `Acceso y seguridad`.

---

#### 158. Operación administrativa

Una inconsistencia de perfil, punto o elegibilidad puede aparecer como excepción autorizada.

No se mezcla con ejecución operativa en tiempo real.

---

#### 159. Auditoría y anomalías

La dirección puede requerir investigar cambios de alto impacto.

La tarjeta de home no contiene el ledger ni un diff completo.

Conduce a la experiencia `Auditoría` cuando exista autorización.

---

#### 160. Estado de salud global

Esta tarea no define un semáforo único de “salud de la empresa”.

Un agregado de salud requeriría reglas de composición, pesos y fuentes canónicas que no se inventan aquí.

---

#### 161. Score ejecutivo

No se crea un `executive_score`, `health_score` o ranking equivalente.

Los riesgos e indicadores conservan su semántica propia.

---

#### 162. Recomendaciones automáticas

La página puede mostrar recomendaciones únicamente si una fuente propietaria produce una recomendación explicable y gobernada.

No genera decisiones empresariales con heurísticas locales no aprobadas.

---

#### 163. IA y análisis automático

Esta tarea no autoriza que una IA:

- apruebe;
- priorice de forma autoritativa;
- conceda acceso;
- modifique riesgo;
- cambie owner;
- publique;
- cierre.

Una futura asistencia analítica requiere su propio contrato y evidencia.

---

#### 164. Privacidad

El home aplica minimización especialmente sobre:

- datos personales;
- documentos;
- salud;
- disciplina;
- seguridad;
- clientes;
- finanzas;
- evidencia de investigación.

La capacidad de dirección no elimina necesidad de conocer.

---

#### 165. Identificadores visibles

La UI prioriza nombres humanos seguros.

IDs técnicos pueden existir para trazabilidad o soporte autorizado.

No deben convertirse en la principal orientación del propietario.

---

#### 166. Drill-down

Toda profundización conserva:

```text
SUMMARY
→ DOMAIN OR OWNER
→ OBJECT
→ ACTION
```

con revalidación en cada frontera necesaria.

El home no intenta contener todo el drill-down.

---

#### 167. Breadcrumb y retorno

La navegación debe dejar claro cuándo la persona salió de `Inicio` hacia:

- un dominio VISO;
- una superficie hija;
- otra aplicación propietaria.

La forma visual final puede variar.

La identidad del owner no debe ocultarse.

---

#### 168. Estados históricos

Un indicador histórico o de auditoría debe estar identificado como histórico.

No se mezcla con estado actual sin etiqueta temporal suficiente.

---

#### 169. Snapshot ejecutivo

Un snapshot puede representar un punto en el tiempo.

Debe conservar:

- periodo;
- fuente;
- alcance;
- timestamp o versión;

cuando el contrato lo exija.

No se presenta como live si no lo es.

---

#### 170. Actualización manual

Un control de refresco puede solicitar una nueva lectura.

No ejecuta procesos empresariales ni recalcula datos mediante lógica no propietaria.

---

#### 171. Tiempo real

Realtime no es obligatorio para todo widget.

La frecuencia de actualización debe corresponder al valor y fuente del dato.

Esta tarea no exige suscripciones globales ni canales nuevos.

---

#### 172. Rendimiento

El home no debe depender de descargar datasets completos para producir cada resumen.

La futura unidad deberá diseñar lecturas proporcionadas, paginadas o agregadas según la fuente.

Esta tarea no fija una tecnología específica.

---

#### 173. Fallo de una aplicación externa

Si un owner externo está degradado:

- el resumen afectado declara indisponibilidad o stale según evidencia;
- los demás dominios seguros pueden continuar;
- no se sustituye con datos de una copia local no autoritativa.

---

#### 174. Fallbacks

Un fallback solo es válido si su contrato propietario lo reconoce.

No se admite:

```text
SOURCE ERROR
→ USE OLD LOCAL TABLE SILENTLY
```

---

#### 175. Mantenimiento

Una aplicación en mantenimiento puede conservar un handoff no ejecutable con explicación segura.

`NOT_AVAILABLE` no se convierte en `NOT_AUTHORIZED`.

---

#### 176. Bloqueos estructurales

Si la identidad, autorización o estructura administrativa no pueden resolverse con confianza, la composición no inventa un home de propietario parcial como si fuera confiable.

La política fail-closed aplicable prevalece.

---

#### 177. Seguridad de query string

Parámetros de URL pueden controlar presentación segura.

No pueden establecer:

- rol;
- scope;
- site authority;
- actor;
- permission;
- approval;
- simulation authority.

---

#### 178. Seguridad de almacenamiento local

`localStorage`, `sessionStorage` o cookies de presentación no son fuente de:

- rol base;
- territorio;
- permiso;
- owner;
- resultado empresarial.

---

#### 179. Acceso directo a `/`

La ruta raíz debe resolver su guard vigente.

Una URL directa no omite:

- sesión;
- acceso a VISO;
- actor;
- contexto requerido;
- variante válida.

---

#### 180. Resultado sin elementos

Un propietario válido puede tener un home sin decisiones pendientes.

La experiencia debe seguir ofreciendo orientación y accesos autorizados sin inventar urgencias para llenar el espacio.

---

#### 181. Resultado con alto volumen

Cuando existan muchos objetos:

- el home muestra síntesis;
- limita listas;
- conserva conteos seguros;
- ofrece drill-down;
- no renderiza cientos de filas como dashboard inicial.

---

#### 182. Resultado con múltiples owners

Un bloque que contenga elementos de varios owners debe identificarlos por objeto o categoría.

No los presenta como si VISO fuera el propietario de todos.

---

#### 183. Filtros de home

Los filtros deben ser pocos y orientados a decisión.

Pueden incluir, si existe soporte:

- periodo;
- ámbito autorizado;
- categoría;
- estado.

No se convierten en un constructor de consultas universal.

---

#### 184. Filtro territorial no amplía

Seleccionar una sede o unidad solo reduce o cambia dentro del conjunto permitido.

No activa un territorio no concedido.

---

#### 185. Filtro “Todos”

Una opción visual `Todos` significa:

```text
TODOS LOS ELEMENTOS AUTORIZADOS EN ESTA PROYECCIÓN
```

No:

```text
TODOS LOS ELEMENTOS DE LA BASE DE DATOS
```

---

#### 186. Comparación “organización completa”

Una vista agregada de organización completa solo existe cuando la autorización y la fuente soportan ese alcance.

El rol no la fabrica.

---

#### 187. Niveles de detalle

El home puede separar:

```text
RESUMEN
DETALLE DE DOMINIO
DETALLE DE OBJETO
```

La progresión no precarga datos que solo son necesarios en niveles posteriores.

---

#### 188. Acciones destructivas

No existe acción destructiva desde la página inicial.

Cualquier futuro atajo destructivo requeriría una revisión contractual explícita incompatible con la naturaleza actual `MONITOR`.

---

#### 189. Confirmaciones

Navegar no requiere una confirmación destructiva.

Las confirmaciones pertenecen a la acción propietaria cuando existe efecto.

El home no añade modales genéricos de confirmación a todo.

---

#### 190. Errores comprensibles

Los errores visibles usan lenguaje de negocio o acceso seguro.

No obligan al propietario a interpretar:

- PostgreSQL;
- Supabase internals;
- nombres de funciones;
- código de repositorio;
- stack traces.

---

#### 191. Soporte

Un error técnico relevante puede ofrecer una ruta hacia soporte cuando exista.

El home no se convierte en `VSCREEN-0006` ni replica diagnóstico técnico.

---

#### 192. Responsabilidad funcional

`VSCREEN-0007` conserva foco ejecutivo.

No absorbe:

- mantenimiento de estructura;
- programación;
- seguridad;
- operación;
- auditoría;
- contabilidad;
- logística;
- producción;
- compras;
- POS;

como editores locales.

---

#### 193. Fuentes de decisión

Una decisión mostrada debe tener un objeto fuente identificable.

No se crea una entidad genérica `decision_pending` para copiar decisiones de todo el ecosistema por conveniencia.

---

#### 194. Historial de decisión

El home puede indicar que existe historial.

La reconstrucción pertenece a `Auditoría` o al owner correspondiente.

No mantiene un historial paralelo dentro de la tarjeta.

---

#### 195. Decisiones completadas

Una decisión ya completada deja de aparecer como pendiente cuando la fuente lo confirma.

No permanece por caché hasta que el usuario la descarte manualmente.

---

#### 196. Riesgos cerrados

Un riesgo tratado o cerrado no sigue marcado como abierto por una copia stale.

Si el home usa snapshot, debe reflejar su timestamp y freshness.

---

#### 197. Indicador sin fuente

Un KPI cuya fuente no puede resolverse no se muestra con un último valor indefinidamente sin explicación.

La UI conserva estado stale o indisponible según contrato.

---

#### 198. Objetos no localizados

Si un handoff apunta a un objeto que ya no existe o fue retirado:

- el destino revalida;
- la UI presenta resultado seguro;
- el home no recrea el objeto desde datos embebidos.

---

#### 199. Versiones de contrato

Cuando un indicador o decisión dependa de una versión de política o contrato, la fuente conserva esa versión.

El home no usa siempre la versión actual para reinterpretar el pasado.

---

#### 200. Reconciliación con `VSCREEN-0007`

La futura implementación se considera conforme únicamente si la raíz `/` puede demostrar que su intención dominante coincide con:

```text
prioridades
+
excepciones
+
indicadores
+
decisiones pendientes
+
alcance explícito
```

sin perder las fronteras de autorización y ownership.

---

#### 201. Reconciliación con `VPROC-0001`

La proyección debe apoyar revisión y seguimiento de decisiones empresariales.

No convierte el home en el lugar donde todos los procesos son ejecutados.

---

#### 202. Reconciliación con `VPROC-0061`

Los indicadores y mejoras deben conservar relación entre:

- medición;
- análisis;
- decisión;
- verificación.

Una métrica decorativa sin uso decisional no se promociona por esta tarea.

---

#### 203. Reconciliación con `VPROC-0063`

Los riesgos visibles deben conservar la semántica del registro y tratamiento de riesgo propietario.

No se crea una lista ad hoc de “riesgos” basada en errores de UI.

---

#### 204. Casos representativos obligatorios para materialización

La futura unidad debe cubrir al menos estos escenarios:

1. propietario con múltiples dominios autorizados y decisiones pendientes;
2. propietario sin decisiones pendientes;
3. propietario con denegación específica sobre una región;
4. propietario con alcance territorial parcial;
5. propietario con indicador stale;
6. owner externo no disponible;
7. riesgo de alta relevancia autorizado;
8. decisión bloqueada por dependencia;
9. simulación activa;
10. cambio de autoridad durante sesión;
11. error parcial de una región;
12. fallo de resolución de autoridad;
13. handoff cross-app válido;
14. acceso directo al detalle revalidado;
15. ausencia de datos que no se confunde con cero.

---

#### 205. Pruebas de render esperadas

La futura materialización deberá verificar:

- jerarquía visual;
- responsive;
- estados vacíos;
- estados parciales;
- denegaciones seguras;
- fuentes no disponibles;
- indicadores stale;
- long labels;
- altos conteos;
- ausencia de overflow;
- foco y teclado.

Esta sección no ejecuta esas pruebas.

---

#### 206. Pruebas de autorización esperadas

La futura unidad deberá demostrar que:

- el rol no es wildcard;
- una denegación prevalece cuando corresponde;
- un filtro no amplía scope;
- un deep link revalida;
- un conteo no incluye objetos invisibles;
- perder autoridad elimina la proyección;
- el cliente privilegiado no funciona como bypass.

---

#### 207. Pruebas de ownership esperadas

La futura unidad deberá demostrar que:

- cada mutación se ejecuta en su owner;
- los enlaces cross-app conservan identidad;
- el home no duplica fórmulas;
- el home no crea records espejo;
- la raíz no promociona rutas históricas cross-owner como dominios VISO.

---

#### 208. Pruebas de estado y error esperadas

Deben distinguirse:

```text
EMPTY
DENIED
UNAVAILABLE
NOT_IMPLEMENTED
PARTIAL
STALE
TECHNICAL_FAILURE
```

sin colapsarlos en una sola tarjeta vacía.

---

#### 209. Pruebas de accesibilidad esperadas

La futura implementación deberá cubrir, como mínimo:

- landmarks;
- headings;
- nombres accesibles;
- foco visible;
- navegación por teclado;
- contraste;
- estados no dependientes solo de color;
- lectura comprensible de prioridad, riesgo, freshness y bloqueo.

---

#### 210. Pruebas de handoff esperadas

Un handoff debe demostrar:

1. destino correcto;
2. owner correcto;
3. referencia mínima;
4. ausencia de secretos en URL;
5. autorización revalidada;
6. error seguro si el objeto cambió;
7. retorno comprensible cuando aplique.

---

#### 211. Métricas de piloto

`VISO-UX-020` puede observar, para esta variante:

- tiempo para localizar una decisión;
- porcentaje de navegación al owner correcto;
- errores de interpretación de alcance;
- confusión entre indicador y acción;
- confusión entre VISO y aplicación propietaria;
- tasa de intentos sobre opciones no autorizadas;
- comprensión de estados stale o parciales.

No se fijan objetivos numéricos sin evidencia de piloto.

---

#### 212. Carryovers

Los pendientes quedan asignados:

| Hallazgo | Bloquea `VISO-UX-008` | Propietario | Condición de salida |
| --- | --- | --- | --- |
| la raíz física actual mezcla conteos y accesos históricos de varios owners | no | unidad física de `VISO-UX-008` + `VISO-UX-017/018` | `/` materializado conforme a `VSCREEN-0007`, ownership reconciliado y handoffs seguros |
| el binding físico entre `VISO-ROUTE-001` y `VSCREEN-0007` no está certificado por esta tarea documental | no | materialización física + validadores de pantalla/ruta aplicables | código, registro y pruebas demuestran una sola intención dominante |
| la presentación territorial detallada aún no pertenece a esta tarea | no | `VISO-UX-013` | patrón transversal de alcance materializado y probado |
| la explicación detallada de procedencia de permisos aún no pertenece a esta tarea | no | `VISO-UX-014` | patrón de origen de permisos materializado |
| conflictos pre-save pertenecen a una tarea posterior | no | `VISO-UX-015` | editor propietario muestra conflicto antes de guardar |
| preview exacto por trabajador pertenece a una tarea posterior | no | `VISO-UX-016` | preview materializado sin ampliar datos visibles |
| duplicidades cross-owner no se retiran desde esta tarea | no | `VISO-UX-017` | cada duplicidad tiene disposición final y reemplazo seguro |
| handoffs externos finales no se fijan todos desde esta tarea | no | `VISO-UX-018` | destino y enlace protegido definidos por superficie |
| seguridad avanzada requiere divulgación progresiva específica | no | `VISO-UX-019` | patrón detallado materializado |
| la comprensión real de la composición no está validada con administradores | no | `VISO-UX-020` | piloto demuestra comprensión y navegación correctas |

No queda pendiente narrativo sin owner ni condición de salida.

---

#### 213. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** el Registro Canónico vigente ya protege autorización server-side, alcance, navegación administrativa, ownership, coherencia de VISO, inventario de rutas, minimización, estados seguros, handoffs, auditoría, conflictos y experiencia comprensible. Esta tarea especializa esas obligaciones para la composición `Inicio` del perfil `propietario` sin crear una regla empresarial nueva, permiso, recurso, rol, scope, proceso, pantalla, ruta, tabla, cálculo, transición o mutación independiente.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos descartados:** 0

**Requisitos obsoletos:** 0

---

#### 214. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico, la tarea reutiliza especialmente:

- `TREQ-VISO-001` para coherencia de VISO, alcance, conflictos, procedencia y auditoría;
- `TREQ-VISO-004` y `TREQ-VISO-005` para conservar inventario e identidades de rutas;
- `TREQ-VISO-011`, `TREQ-VISO-012` y `TREQ-VISO-014` para protección de rutas, superficie pública controlada y resolución de contexto;
- `TREQ-VISO-022` y `TREQ-VISO-023` para no retirar prematuramente superficies y reconciliar el universo VISO;
- la cobertura UX vigente de navegación comprensible, fuente visible, ownership entre aplicaciones, clasificación por dominio y tratamiento de superficies sin duplicar mutaciones.

Estas referencias son trazabilidad heredada.

No actualizan 04A.

---

#### 215. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental del checkout local todavía no se ha ejecutado para `VISO-UX-008`. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado, normalizado ni validado en una rama documental de `VISO-UX-008`. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, protocolo, contrato de entrega, manifest, continuidad, topología, políticas de tarea, owner del minibloque, contrato de navegación de `VISO-UX-001`, identidades `VISO-ROUTE-001` y `VSCREEN-0007`, bindings de pantalla/proceso/paso, proceso `VPROC-0001`, procesos relacionados `VPROC-0061` y `VPROC-0063`, matriz canónica del rol `propietario`, Registro 04A aplicable, scripts documentales y el AS-IS de `vento-viso/main` para `src/app/page.tsx`; la versión completa aprobada de `VISO-UX-007` se utilizó como predecesora documental permitida por el modo de trabajo adelantado. |
| OPERATIVA | NOT_EXECUTED | No se consultaron ni modificaron decisiones reales, riesgos, indicadores, permisos, turnos, trabajadores, clientes, finanzas, inventario o producción; no se ejecutó ninguna acción empresarial. |
| FÍSICA | NOT_EXECUTED | No se modificaron `vento-viso`, rutas, componentes, contratos, Supabase, datos, migraciones, RLS, RPC, Auth, secretos, deploys ni configuración runtime; la materialización permanece por `implementation_unit_id` detrás de `POST_E5_PACKAGE`. |

---

#### 216. Criterios de aceptación

1. existe exactamente un contrato `VISO-OWNER-HOME-001`;
2. la tarea conserva `VISO-UX-007` como anterior y `VISO-UX-009` como siguiente;
3. la topología permanece `PER_IMPLEMENTATION_UNIT`;
4. el gate físico permanece `POST_E5_PACKAGE`;
5. la entrada especial continúa siendo `/`;
6. `Inicio` no se convierte en séptimo dominio administrativo;
7. `VISO-ROUTE-001` conserva identidad y no se renumera;
8. `VSCREEN-0007` es la pantalla canónica objetivo;
9. no se crea otra pantalla por nombre de rol;
10. `VPROC-0001` permanece proceso principal;
11. `VPROC-0001::STEP-REVIEW_EXECUTIVE_WORK` permanece paso dominante;
12. la modalidad permanece `OWNER_WORKSPACE`;
13. el papel dominante permanece `MONITOR`;
14. `VPROC-0061` y `VPROC-0063` permanecen procesos relacionados;
15. el rol `propietario` no se interpreta como wildcard;
16. el perfil de presentación no equivale a autorización;
17. el rol no produce auto-redirección desde SHELL;
18. el home empieza después de acceso válido a VISO;
19. una denegación vigente conserva precedencia;
20. el ámbito organizacional no se convierte en universo absoluto;
21. los agregados se calculan únicamente sobre información autorizada;
22. los filtros no amplían scope;
23. una sede seleccionada no concede territorio;
24. `Todos` significa todos los elementos autorizados;
25. el AS-IS actual no se declara conforme por existir;
26. la raíz actual queda identificada como `VISO-ROUTE-001`;
27. la composición AS-IS de PASS, comercial, vacantes y CMS no se canoniza por inercia;
28. el home objetivo se organiza alrededor de contexto, decisiones, riesgos, indicadores, seguimiento, dominios y handoffs;
29. la cabecera permite comprender contexto y alcance;
30. simulación se distingue de autoridad real;
31. las decisiones pendientes provienen de su owner;
32. una decisión pendiente no implica acción ejecutable;
33. no existe aprobación genérica desde tarjeta;
34. excepciones y riesgos conservan semántica propietaria;
35. error técnico no se convierte en riesgo empresarial;
36. conflicto no se convierte en error genérico;
37. indicadores declaran fuente, periodo, alcance y unidad cuando aplique;
38. un row count no se declara KPI automáticamente;
39. el home no inventa fórmulas financieras;
40. NUMERA conserva ownership financiero;
41. aplicaciones operativas conservan sus métricas propietarias;
42. datos laborales se minimizan;
43. seguridad se resume sin exponer detalle privilegiado;
44. compromisos conservan identidad y owner;
45. el home no duplica la bandeja `VSCREEN-0005` de SHELL;
46. no existe segunda bandeja global de trabajo;
47. los seis dominios VISO permanecen accesos conceptuales principales;
48. cada tarjeta visible corresponde a una proyección autorizada;
49. un destino visible no concede todas sus acciones;
50. los handoffs externos no se convierten en editor local;
51. PASS no se usa como backoffice por asociación temática;
52. una aplicación diferida no se promociona por catálogo;
53. prioridad solo se conserva desde fuente o regla canónica;
54. el home no inventa un score de prioridad;
55. vencimientos provienen de la fuente;
56. elementos bloqueados conservan razón segura;
57. conteos no revelan elementos ocultos;
58. los estados vacíos distinguen ausencia, deny, indisponibilidad, no implementación, parcial y error;
59. datos stale no se muestran como vigentes;
60. indisponibilidad no se presenta como cero;
61. una carga parcial no invalida regiones seguras por defecto;
62. cada resumen conserva owner funcional;
63. procedencia de datos no concede autorización;
64. `VISO-UX-013` conserva la presentación territorial detallada;
65. `VISO-UX-014` conserva procedencia de permisos;
66. `VISO-UX-015` conserva conflictos pre-save;
67. `VISO-UX-016` conserva preview individual;
68. `VISO-UX-017` conserva la deduplicación cross-owner;
69. `VISO-UX-018` conserva el patrón final de handoff;
70. `VISO-UX-019` conserva divulgación progresiva de seguridad;
71. `VISO-UX-020` conserva pruebas con administradores reales;
72. no se ejecutan mutaciones sensibles inline;
73. las acciones ordinarias del home son navegación y revisión;
74. deep links transportan referencias, no autoridad;
75. preferencias de UI no cambian permisos;
76. no existe matriz local rol→widgets como fuente de seguridad;
77. dispositivo compartido no elimina reautenticación;
78. cambio de autoridad invalida proyecciones stale;
79. concurrencia obliga a revalidar en destino;
80. caché no mezcla actores ni ámbitos;
81. responsive conserva contexto y bloqueos;
82. accesibilidad no depende solo de color;
83. la densidad prioriza síntesis y drill-down;
84. `NOT_AUTHORIZED` no revela información oculta;
85. `NOT_AVAILABLE` se distingue de deny;
86. `NOT_IMPLEMENTED` no inventa destino;
87. `TECHNICAL_FAILURE` no se convierte en ausencia;
88. acceso sensible conserva auditoría propietaria;
89. telemetría no sustituye evidencia empresarial;
90. más autoridad potencial no implica más información visible;
91. comparaciones usan unidades y periodos compatibles;
92. tendencias no se infieren desde snapshots incompatibles;
93. color no redefine estado empresarial;
94. labels primarios usan lenguaje empresarial;
95. no se crean grupos genéricos para ocultar ownership;
96. rutas cross-owner no se promocionan por ubicación física;
97. no se crea `/owner`, `/dashboard-owner` ni otra ruta;
98. no se crea un `VSCREEN-*` nuevo;
99. no se crea un `VPROC-*` nuevo;
100. `VISO-UX-009` conserva el inicio de gerente general;
101. `VISO-UX-010` conserva gerente de sede;
102. `VISO-UX-011` conserva auxiliar administrativa;
103. `VISO-UX-012` conserva contador;
104. la variante se resuelve desde identidad canónica, no query o alias;
105. un rol inconsistente no cae a propietario por conveniencia;
106. un principal técnico no activa la variante humana;
107. visible al propietario no significa propiedad del propietario;
108. escalamiento proviene de contrato propietario;
109. evidencia incompleta no se presenta como lista para aprobar;
110. la explicación no expone internals sensibles;
111. disponibilidad de cliente administrativo no sustituye permiso humano;
112. agregados se resuelven de forma segura en servidor;
113. composición cross-owner no crea tabla maestra duplicada;
114. zona horaria y periodo conservan semántica propietaria;
115. ver no concede exportar;
116. ver no concede imprimir;
117. cargar el home no produce efecto empresarial;
118. refrescar es idempotente respecto a efectos empresariales;
119. no existe fallback local silencioso ante error de fuente;
120. no se hardcodea `propietario → mostrar todo`;
121. una capacidad nueva no entra automáticamente al home;
122. no se retiran superficies AS-IS antes de reemplazo gobernado;
123. cada elemento AS-IS recibe disposición verificable en materialización;
124. website CMS no se convierte en dominio VISO por estar enlazado hoy;
125. conteo de trabajadores no se declara KPI sin contrato;
126. programación consume la misma fuente canónica de sus vistas;
127. auditoría se resume sin copiar el ledger;
128. no se crea score ejecutivo o semáforo global inventado;
129. privacidad aplica incluso para dirección;
130. drill-down revalida fronteras;
131. snapshots identifican temporalidad;
132. realtime no se exige indiscriminadamente;
133. el home no descarga datasets completos para resumirlos;
134. un fallo externo no activa copia no autoritativa;
135. query string y storage local no pueden fijar autoridad;
136. acceso directo a `/` conserva guard;
137. ausencia de trabajo no fabrica urgencias;
138. alto volumen se sintetiza en lugar de renderizarse completo;
139. filtros no se convierten en query builder universal;
140. no existen acciones destructivas desde `Inicio`;
141. errores usan lenguaje comprensible;
142. soporte no convierte el home en diagnóstico técnico;
143. decisiones visibles conservan objeto fuente;
144. decisiones completadas salen de pendientes cuando el owner lo confirma;
145. indicadores sin fuente no conservan un valor indefinidamente sin estado;
146. `VSCREEN-0007` mantiene una intención dominante;
147. `VPROC-0001` mantiene revisión y seguimiento, no ejecución universal;
148. los casos representativos de materialización quedan definidos;
149. pruebas futuras cubren render, autorización, ownership, estados, accesibilidad y handoffs;
150. todos los carryovers tienen owner y condición de salida;
151. no se crean requisitos de prueba;
152. no se modifican requisitos de prueba;
153. no se modifica el Registro Canónico de Requisitos de Prueba;
154. no se modifica Supabase;
155. toda futura modificación de Supabase VENTO permanece en `vento-shell`;
156. no se ejecuta implementación física desde esta tarea documental.

---

#### 217. Límites

Esta tarea no:

- modifica código de `vento-viso`;
- modifica `src/app/page.tsx`;
- crea componentes;
- crea rutas;
- mueve rutas;
- renumera `VISO-ROUTE-*`;
- retira rutas;
- crea redirects;
- crea `VSCREEN-*`;
- crea `VPROC-*`;
- crea pasos de proceso;
- cambia ownership de procesos;
- crea permisos;
- modifica permisos;
- cambia matrices;
- asigna roles;
- convierte `propietario` en wildcard;
- crea scopes;
- amplía territorio;
- crea grants;
- crea denies;
- crea excepciones individuales;
- crea una bandeja global de trabajo;
- modifica la bandeja de SHELL;
- crea KPIs nuevos;
- define fórmulas financieras;
- define fórmulas comerciales;
- define fórmulas productivas;
- crea un score ejecutivo;
- crea un semáforo universal de salud;
- ejecuta aprobaciones;
- ejecuta publicaciones;
- ejecuta revocaciones;
- ejecuta rollback;
- ejecuta mutaciones de otros owners;
- crea exportes;
- crea impresión;
- crea tablas;
- crea vistas SQL;
- crea RPC;
- crea RLS;
- crea funciones;
- crea triggers;
- crea migraciones;
- modifica Supabase;
- modifica Auth;
- modifica Storage;
- modifica Realtime;
- modifica Edge Functions;
- modifica cron o colas;
- cambia secretos;
- modifica datos reales;
- cambia PASS;
- cambia NUMERA;
- cambia NEXO;
- cambia FOGO;
- cambia ORIGO;
- cambia PULSO;
- cambia ANIMA;
- cambia TALENTO;
- cambia AURA;
- selecciona package;
- prepara package gate;
- aprueba package gate;
- autoriza implementación física;
- ejecuta implementación física;
- desarrolla `VISO-UX-009`;
- desarrolla `VISO-UX-010`;
- desarrolla `VISO-UX-011`;
- desarrolla `VISO-UX-012`;
- desarrolla `VISO-UX-013..020`;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba.

La identidad exacta de cualquier unidad física futura se resolverá exclusivamente mediante el package y gate aplicables.

---

#### 218. Continuidad

**ÚLTIMA TAREA APROBADA**
`VISO-UX-007 — Crear sección Auditoría`

**TAREA ACTUAL APROBADA**
`VISO-UX-008 — Definir inicio para propietario`

**SIGUIENTE TAREA RESERVADA**
`VISO-UX-009 — Definir inicio para gerente general`
### [ ] VISO-UX-009 — Definir inicio para gerente general
### [ ] VISO-UX-010 — Definir inicio para gerente de sede
### [ ] VISO-UX-011 — Definir inicio para auxiliar administrativa
### [ ] VISO-UX-012 — Definir inicio para contador
### [ ] VISO-UX-013 — Limitar información según alcance territorial
### [ ] VISO-UX-014 — Mostrar origen de permisos de forma comprensible
### [ ] VISO-UX-015 — Mostrar conflictos antes de guardar
### [ ] VISO-UX-016 — Permitir vista previa exacta de cada trabajador
### [ ] VISO-UX-017 — Evitar duplicar configuración propia de otras aplicaciones
### [ ] VISO-UX-018 — Enlazar a la aplicación propietaria cuando corresponda
### [ ] VISO-UX-019 — Aplicar divulgación progresiva a seguridad avanzada
### [ ] VISO-UX-020 — Ejecutar pruebas con administradores reales

### Alcance del delta

`VISO-UX-003` incluye Semana/Mes, contexto, vista semanal detallada, mensual masiva, calendario correcto, multibloque plegable, estados borrador/publicado, misma fuente y responsive.

`VISO-UX-015` muestra actual, nuevas, proyectado, límite, solapamientos, territorio, fechas movidas y consecuencia. El color no sustituye servidor.

`VISO-UX-016` incluye total entre sedes sin revelar detalle innecesario.

`VISO-UX-020` prueba multibloque, longitudes de mes, exceso, corrección, publicación, navegación y errores.
