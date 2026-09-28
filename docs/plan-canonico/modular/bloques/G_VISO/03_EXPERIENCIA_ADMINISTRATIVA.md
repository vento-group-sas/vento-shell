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
### [ ] VISO-UX-002 — Crear sección Personal
### [ ] VISO-UX-003 — Crear sección Programación
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
