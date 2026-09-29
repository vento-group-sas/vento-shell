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
### [ ] VISO-UX-004 — Crear sección Acceso y seguridad
### [ ] VISO-UX-005 — Crear sección Organización
### [ ] VISO-UX-006 — Crear sección Operación
### [ ] VISO-UX-007 — Crear sección Auditoría
### [ ] VISO-UX-008 — Definir inicio para propietario
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
