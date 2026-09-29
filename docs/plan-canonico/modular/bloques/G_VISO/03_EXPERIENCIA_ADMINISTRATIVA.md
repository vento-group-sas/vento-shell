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
