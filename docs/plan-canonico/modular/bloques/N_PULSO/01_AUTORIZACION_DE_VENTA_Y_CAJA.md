### MINI-BLOQUE — AUTORIZACIÓN DE VENTA Y CAJA

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **autorización de venta y caja** dentro de **N PULSO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `PULSO-AUTH-001` a `PULSO-AUTH-016` — 16 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar vistas POS” y concluye con “Ejecutar pruebas integrales”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:PULSO-AUTH -->
### Reconciliación topológica de PULSO-AUTH-001 a PULSO-AUTH-016

`PULSO-AUTH-001..008` inventarían superficies y definen permisos; `PULSO-AUTH-009..016` materializan protección, contexto, dispositivo, trazabilidad, migración y pruebas.

| Tareas | Modalidad | Gate |
| --- | --- | --- |
| `PULSO-AUTH-001..008` | `DEFINE_ONCE` | `NO_PHYSICAL_INSTANCE` |
| `PULSO-AUTH-009..016` | `PER_IMPLEMENTATION_UNIT` | `POST_E5_PACKAGE` |

### ✅ PULSO-AUTH-001 — Inventariar vistas POS

**Estado:** APROBADA
**Tarea anterior:** OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede
**Tarea siguiente:** PULSO-AUTH-002 — Inventariar órdenes
**Tipo de tarea:** inventario documental cerrado de las vistas, rutas de página y superficies de acceso AS-IS de PULSO que constituyen la base de autorización del POS, reconciliando identidades `PULSO-ROUTE-*`, páginas runtime, guard observado, contexto territorial, duplicidades funcionales, relación con `VSCREEN-*`, ownership y handoffs hacia órdenes, salón, escáner, importaciones y permisos, sin definir todavía permisos atómicos ni materializar protección física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica rutas, componentes, guards, permisos, navegación, tablas, vistas, RPC, RLS, migraciones, Supabase, datos, contratos generados, `vento-pulso`, `vento-shell` ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma exhaustiva, estable y verificable las vistas POS actualmente expuestas por `vento-pulso` para que las tareas posteriores de autorización trabajen sobre un universo técnico único y no reconstruyan las superficies desde nombres de componentes, enlaces visibles o conocimiento funcional parcial.

La tarea debe dejar resuelto:

- qué rutas de página existen realmente;
- cuáles representan vistas de negocio y cuál representa un estado de denegación;
- qué archivo fuente identifica a cada ruta;
- qué guard se observa en las vistas de negocio;
- qué parámetros modifican contexto sin crear nuevas rutas;
- qué superficies comparten implementación;
- qué vistas agrupan responsabilidades que luego requieren autorización por acción;
- qué rutas no deben confundirse con las veinte pantallas canónicas PULSO;
- qué hallazgos se transfieren a `PULSO-AUTH-002` a `PULSO-AUTH-016`.

---

#### 2. Handoff recibido de OPS-POS-001

`OPS-POS-001` entrega la configuración documental de sede, zonas, mesas, puntos de servicio y estaciones que las superficies PULSO deberán consumir sin convertir estructura física en autoridad.

Handoff:

```text
OPS-POS-001
→ site_id como alcance técnico de sede
→ zonas y mesas como configuración operativa
→ estación separada de dispositivo y área de autorización
→ PULSO-AUTH-001
```

Consecuencia para este inventario:

```text
VISTA POS
+
CONTEXTO DE SEDE
!=
AUTORIDAD SOBRE TODAS LAS ACCIONES DE ESA SEDE
```

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- el inventario se define una sola vez;
- no se crea una instancia física;
- no se modifica `vento-pulso`;
- no se crean ni retiran rutas;
- no se cambia `pos.main`;
- no se crean permisos nuevos;
- no se modifica navegación runtime;
- no se modifica `active-sequence.json` manualmente;
- las protecciones físicas posteriores permanecen en `PULSO-AUTH-009..016` y en los paquetes propietarios.

---

#### 4. Fuentes verificadas

El inventario se reconcilia contra:

- `PULSO-UX-001` aprobado;
- `OPS-POS-001` aprobado por el usuario como base inmediata;
- `AUTH-UI-004 — Inventariar todas las rutas de PULSO`;
- inventario técnico de navegación del BLOQUE I;
- catálogo `VSCREEN-*` y bindings pantalla-proceso-paso;
- registro 04A del dominio PULSO;
- `task-work-topology.json`;
- `active-sequence.json` y continuidad vigentes;
- árbol actual de `vento-pulso`;
- `pulso-consumer-baseline-gate.mjs` vigente;
- `src/lib/auth/guard.ts` y `src/lib/auth/permissions.ts` vigentes;
- los seis archivos `page.tsx` actuales.

---

#### 5. Frontera raíz

Este inventario conserva obligatoriamente:

```text
RUTA DE PÁGINA
!=
VISTA DE NEGOCIO
!=
ESTADO DE DENEGACIÓN
!=
PANTALLA CANÓNICA VSCREEN
!=
COMPONENTE
!=
SERVER ACTION
!=
ROUTE HANDLER
!=
ELEMENTO DE MENÚ
!=
REGISTRO RUNTIME
!=
PERMISO DEFINITIVO
!=
PROCESO COMPLETO
```

Una relación funcional entre dos elementos no los convierte en una misma identidad.

---

#### 6. Snapshot técnico verificado

Repositorio consumidor inspeccionado:

```text
vento-group-sas/vento-pulso
branch = main
HEAD = 715b5683db05caa010d725679b5ada4705a6da6e
framework = Next.js App Router
```

La línea base de rutas se encuentra materialmente estable respecto del inventario aprobado previamente: los seis archivos de página conservan los mismos blobs fuente.

El avance del commit general no se interpreta como drift de rutas cuando las identidades y contenidos fuente de esas páginas permanecen iguales.

---

#### 7. Cardinalidad canónica AS-IS

El universo actual contiene exactamente:

```text
PAGE_ROUTES = 6
STATIC_ROUTES = 6
DYNAMIC_ROUTES = 0
BUSINESS_ROUTES = 5
DENY_ROUTES = 1
ROUTE_HANDLERS = 0
LOCAL_LOGIN_ROUTE = 0
```

No existen faltantes ni rutas inesperadas dentro de la línea base verificada.

---

#### 8. Matriz canónica de vistas y rutas

| ID | Patrón | Archivo fuente | Clasificación | Familia observada | Estado de acceso observado |
| --- | --- | --- | --- | --- | --- |
| `PULSO-ROUTE-001` | `/` | `src/app/page.tsx` | vista de negocio | `POS_SCANNER` | protegida |
| `PULSO-ROUTE-002` | `/no-access` | `src/app/no-access/page.tsx` | estado de denegación | `ACCESO` | no ejecuta guard propio |
| `PULSO-ROUTE-003` | `/orders` | `src/app/orders/page.tsx` | vista de negocio | `PEDIDOS_OPERACION` | protegida |
| `PULSO-ROUTE-004` | `/sales-imports` | `src/app/sales-imports/page.tsx` | vista de negocio | `IMPORTACION_VENTAS` | protegida |
| `PULSO-ROUTE-005` | `/salon` | `src/app/salon/page.tsx` | vista de negocio | `SALON` | protegida |
| `PULSO-ROUTE-006` | `/scanner` | `src/app/scanner/page.tsx` | vista de negocio | `POS_SCANNER` | protegida |

Total esperado y materializado:

```text
ROUTES_EXPECTED = 6
ROUTES_MATERIALIZED = 6
MISSING = 0
UNEXPECTED = 0
DUPLICATE_PATTERNS = 0
DUPLICATE_SOURCE_FILES = 0
```

---

#### 9. `PULSO-ROUTE-001` — `/`

La raíz actual monta la experiencia `ScannerPage`.

Observaciones:

- consume `site_id` como parámetro de consulta cuando está presente;
- ejecuta `requireAppAccess`;
- declara aplicación `pulso`;
- observa `pos.main` como permiso local;
- exige acceso de aplicación;
- resuelve sede;
- comunica al componente si la sesión opera sobre dispositivo compartido.

Esta ruta no se declara equivalente a `VSCREEN-0080 — Inicio POS` por el solo hecho de ser `/`.

---

#### 10. `PULSO-ROUTE-002` — `/no-access`

`/no-access` es un estado de denegación.

Propiedades inventariadas:

- no es vista empresarial;
- no ejecuta una acción de negocio;
- no concede permisos;
- no repara permisos;
- no revela datos de una vista protegida;
- ofrece retorno a `/`;
- no incrementa el conteo de pantallas canónicas PULSO.

Su diseño transversal posterior pertenece a los contratos de estados sin acceso.

---

#### 11. `PULSO-ROUTE-003` — `/orders`

`/orders` es una vista agregada de operación de pedidos.

La superficie actual concentra evidencia de:

- lectura de pedidos;
- líneas y estados;
- fulfillment;
- estado de pago;
- despacho;
- conversaciones;
- historial de eventos;
- solicitudes de facturación;
- acciones de transición ejecutadas en servidor;
- componentes live y bridges.

La apertura de `/orders` no autoriza por sí sola cada acción contenida en la vista.

El detalle funcional y de recursos pasa a `PULSO-AUTH-002`.

---

#### 12. `PULSO-ROUTE-004` — `/sales-imports`

`/sales-imports` es una superficie administrativa y de integración.

Evidencia AS-IS:

- carga de archivo;
- hash de archivo;
- mapeos externos;
- lotes;
- filas;
- publicación posterior;
- acciones protegidas de servidor.

La visibilidad de la vista no autoriza automáticamente carga, mapeo o publicación.

El inventario específico pasa a `PULSO-AUTH-005`.

---

#### 13. `PULSO-ROUTE-005` — `/salon`

`/salon` es la vista actual de salón.

Consume evidencia de:

- zonas;
- mesas;
- sesiones;
- llamados;
- estado visual;
- actualización Realtime;
- aislamiento observado por `site_id`.

`OPS-POS-001` aporta el contrato documental de configuración física, pero no convierte una zona o estación en permiso.

El inventario detallado de recursos y acciones pasa a `PULSO-AUTH-003`.

---

#### 14. `PULSO-ROUTE-006` — `/scanner`

`/scanner` monta `ScannerPage`, al igual que `/`.

La ruta conserva identidad propia porque:

- posee patrón URL distinto;
- posee archivo fuente distinto;
- puede tener enlaces o retornos propios;
- su consolidación no ha sido autorizada.

El detalle del escáner y sus acciones pasa a `PULSO-AUTH-004`.

---

#### 15. Relación `/` ↔ `/scanner`

La relación observada es:

```text
PULSO-ROUTE-001
+
PULSO-ROUTE-006
→ mismo componente principal ScannerPage
→ identidades de ruta distintas
```

Esto no autoriza concluir todavía:

- duplicado a eliminar;
- alias canónico;
- redirect;
- reemplazo de una por otra;
- equivalencia con `VSCREEN-0080`.

La clasificación de duplicidad o retiro continúa fuera de esta tarea.

---

#### 16. Rutas estáticas y ausencia de rutas dinámicas

Las seis rutas son estáticas.

No existen patrones `[id]`, `[slug]` u otros segmentos dinámicos en la línea base de páginas PULSO.

Regla:

```text
QUERY PARAMETER
!=
DYNAMIC ROUTE
```

---

#### 17. Parámetros de consulta observados

Entre los parámetros consumidos por las rutas se encuentran:

- `site_id`;
- `view`;
- `fulfillment`;
- `message`;
- `error`;
- `ok`.

Estos parámetros:

- modifican contexto, filtros o feedback;
- no crean una nueva identidad `PULSO-ROUTE`;
- no conceden otra sede;
- no convierten un mensaje en estado empresarial autoritativo;
- no sustituyen autorización server-side.

---

#### 18. Ausencia de route handlers App Router

El árbol actual no contiene archivos `route.ts`, `route.tsx`, `route.js` o `route.jsx` bajo `src/app`.

Por tanto:

```text
APP_ROUTER_ROUTE_HANDLERS = 0
```

Server Actions, RPC consumidas, helpers y módulos internos permanecen fuera del conteo de vistas.

---

#### 19. Ausencia de `/login` local

PULSO no expone una ruta local `/login`.

La autenticación no se considera ausente: el guard delega el ingreso al contrato SSO del SHELL.

Regla:

```text
NO_LOCAL_LOGIN_ROUTE
!=
NO_AUTHENTICATION
```

No se inventaría el destino de autenticación externo como ruta PULSO.

---

#### 20. Guard observado en vistas de negocio

Las cinco rutas de negocio ejecutan `requireAppAccess`.

La evidencia transversal observada incluye:

- `appId: pulso`;
- acceso de aplicación obligatorio;
- `pos.main` como permiso local declarado;
- resolución territorial de sede;
- retorno seguro a la vista solicitada.

El inventario registra existencia técnica del guard, no suficiencia contractual de `pos.main`.

---

#### 21. `pos.main` es evidencia AS-IS, no diseño final

Actualmente las cinco vistas de negocio convergen sobre el permiso local observado `pos.main`.

Esto no autoriza concluir:

```text
pos.main
=
leer pedidos
=
mutar pedidos
=
importar ventas
=
gestionar salón
=
identificar cliente
=
redimir puntos
=
abrir/cerrar caja
```

La separación atómica de permisos pertenece a `PULSO-AUTH-006`, `PULSO-AUTH-007` y `PULSO-AUTH-008`, junto con los contratos transversales de autorización.

---

#### 22. Abrir una vista no autoriza sus mutaciones

Regla obligatoria:

```text
VIEW_ACCESS
!=
ACTION_AUTHORITY
```

Toda acción sensible debe revalidar, según corresponda:

- principal;
- actor efectivo;
- permiso exacto;
- sede;
- recurso;
- estado actual;
- columnas o transición permitidas;
- evidencia de la decisión.

Esta tarea no define todavía los permisos exactos.

---

#### 23. Contexto territorial

`site_id` forma parte del contexto técnico observado, pero no puede ampliar autoridad por manipulación de URL.

La vista debe quedar subordinada al contexto autorizado de:

- sesión;
- asignación operativa;
- sede;
- actor;
- dispositivo cuando aplique.

La materialización definitiva del límite territorial continúa en `PULSO-AUTH-011`.

---

#### 24. Actor efectivo y dispositivo compartido

La existencia de una ruta protegida no prueba que todas sus acciones ya tengan atribución humana suficiente.

Se mantienen separadas:

```text
PRINCIPAL TÉCNICO
ACTOR HUMANO
DISPOSITIVO
SEDE
ESTACIÓN
PERMISO
```

Los flujos de dispositivo compartido y actor real continúan en `PULSO-AUTH-012` y `PULSO-AUTH-013`.

---

#### 25. Simulación y override

La capacidad transversal de simulación o override de rol no convierte la vista simulada en autoridad real.

Esta tarea solo conserva la existencia del contexto como parte de la frontera de acceso observada.

Ninguna conclusión de permiso final se deriva desde una vista renderizada bajo simulación.

---

#### 26. Inventario técnico `PULSO-SURFACE-003`

El baseline vigente define:

```text
PULSO-SURFACE-003
= inventario de rutas y navegación
```

Su contrato espera exactamente los seis archivos de página de esta tarea.

La evaluación contractual requiere:

```text
page_count = 6
unique_page_count = 6
dynamic_page_count = 0
handler_count = 0
business_route_count = 5
deny_route_count = 1
root_scanner_distinct = true
local_login_absent = true
query_params_are_not_routes = true
protected_direct_access = true
```

---

#### 27. Relación con las doce superficies técnicas PULSO

El baseline separa doce superficies técnicas.

Esta tarea inventaría como universo de vistas a `PULSO-SURFACE-003`, pero conserva relaciones con:

- `PULSO-SURFACE-001` — identidad, sesión, SSO y acceso;
- `PULSO-SURFACE-002` — contexto operativo, sede, actor y dispositivo;
- `PULSO-SURFACE-004` — escáner e identificación;
- `PULSO-SURFACE-006` — pedidos, líneas, estado, pago y fulfillment;
- `PULSO-SURFACE-007` — despacho, chat, facturación e historial;
- `PULSO-SURFACE-008` — salón, mesas, sesiones, llamados y Realtime;
- `PULSO-SURFACE-009` — importación de ventas.

Las demás superficies técnicas no se convierten en rutas por estar relacionadas con una vista.

---

#### 28. Huella fuente actual de las seis páginas

| Ruta | Git blob verificado |
| --- | --- |
| `/` | `40431b2e8d160c9f1af81e870e0e41b401b87018` |
| `/no-access` | `0fdd5fdef9f5cca7bd2789443969a63b817c2061` |
| `/orders` | `abcaefaec16a42e4ece18575addb93e25b1a1228` |
| `/sales-imports` | `cdc69eeab9229e4e23069969e4192395291b364b` |
| `/salon` | `4e47a7b4a7e569d05013c0c351ca7fc7d51e6d99` |
| `/scanner` | `ace214820e9aaa93a4524731202924719d743ee6` |

Los seis blobs coinciden con la línea base técnica aprobada en `AUTH-UI-004`.

---

#### 29. Huella de acceso compartido

Fuentes de acceso verificadas:

| Archivo | Git blob verificado |
| --- | --- |
| `src/lib/auth/guard.ts` | `ae708911c06e0bae35dead2343879d69ec23ee5b` |
| `src/lib/auth/permissions.ts` | `8087fbe3b949c9b8fe553f1d1d76ef4da169bd22` |

También coinciden con la huella aprobada previamente para el inventario de rutas PULSO.

---

#### 30. Baseline runtime vigente

El contrato técnico vigente de `vento-pulso` se encuentra en:

```text
scripts/quality/pulso-consumer-baseline-gate.mjs
blob = b50fc12744bc1eb913aee3756a383df81475938b
```

El baseline mantiene como expectativa explícita:

- seis page files;
- cero handlers;
- cero páginas dinámicas;
- cinco rutas de negocio;
- una ruta de denegación.

La tarea documenta esa evidencia; no ejecuta certificación física del consumidor.

---

#### 31. Universo canónico de pantallas PULSO recibido

`PULSO-UX-001` fijó veinte pantallas canónicas primarias:

```text
VSCREEN-0080..VSCREEN-0093
VSCREEN-0147..VSCREEN-0152
```

Conteo:

```text
PULSO_CANONICAL_SCREENS = 20
PULSO_ASIS_PAGE_ROUTES = 6
```

---

#### 32. Ruta AS-IS y pantalla canónica no son equivalentes por conteo

Regla obligatoria:

```text
6 RUTAS AS-IS
!=
20 PANTALLAS CANÓNICAS
```

Una ruta puede:

- agrupar varias responsabilidades canónicas;
- servir una capacidad parcial;
- representar un estado técnico;
- no tener todavía equivalencia uno a uno con una `VSCREEN-*`.

---

#### 33. Matriz de relación ruta → intención canónica

| Ruta | Evidencia funcional AS-IS | Relación canónica permitida en esta tarea |
| --- | --- | --- |
| `/` | scanner / identificación | entrada técnica existente; no equivale por inferencia a `VSCREEN-0080` |
| `/no-access` | denegación | sin equivalencia a pantalla empresarial PULSO |
| `/orders` | pedidos, estado, fulfillment, despacho, conversación | evidencia parcial de varias pantallas de pedido; no fusión contractual |
| `/sales-imports` | importación y publicación por lotes | superficie técnica administrativa; no equivalencia automática a canal live |
| `/salon` | zonas, mesas, sesiones, llamados | evidencia AS-IS directamente relacionada con `VSCREEN-0082`, sin probar cobertura completa |
| `/scanner` | scanner / identificación | superficie de identificación y loyalty; detalle reservado a `PULSO-AUTH-004` |

---

#### 34. `VSCREEN-0080 — Inicio POS`

La existencia de `/` no demuestra que `VSCREEN-0080` esté materializada como workspace integral.

El runtime raíz actual monta `ScannerPage`.

Por tanto:

```text
ROOT_ROUTE_EXISTS
+
SCANNER_RENDERED
!=
CANONICAL_POS_HOME_COMPLETE
```

El diseño de experiencia objetivo permanece en el subbloque PULSO-UX.

---

#### 35. `/orders` como vista agregada

`/orders` concentra capacidades que se relacionan con múltiples pantallas canónicas, entre ellas pedido, seguimiento y entrega.

La tarea no crea una equivalencia uno a uno entre el archivo `page.tsx` y una única `VSCREEN-*`.

El inventario específico de órdenes en `PULSO-AUTH-002` deberá separar:

- lectura;
- estado;
- pago observado;
- fulfillment;
- despacho;
- conversación;
- facturación;
- historial;
- acciones sensibles.

---

#### 36. `/salon` y `VSCREEN-0082`

`/salon` es la evidencia AS-IS más directa para `VSCREEN-0082 — Mapa de salón y mesas`.

Sin embargo, la existencia de la ruta no prueba por sí sola:

- autorización final de lectura;
- autorización de apertura de sesión;
- asignación de mesa;
- atención de llamado;
- resolución;
- cancelación;
- cierre.

Ese desglose pertenece a `PULSO-AUTH-003` y contratos posteriores.

---

#### 37. Scanner y loyalty

`/` y `/scanner` exponen una capacidad de scanner e identificación que se relaciona con cliente y loyalty.

La propiedad empresarial de fidelización permanece en PASS.

```text
SCANNER EN PULSO
!=
LEDGER PASS EN PULSO
```

`PULSO-AUTH-004` debe inventariar la superficie; las protecciones de acumulación y redención continúan en `PULSO-AUTH-009` y `PULSO-AUTH-010`.

---

#### 38. Importaciones y venta POS nativa

`/sales-imports` no se considera por inferencia una venta POS nativa ni una bandeja live de canal externo.

```text
IMPORTACIÓN BATCH
!=
PEDIDO NATIVO
!=
PEDIDO EXTERNO LIVE
```

El inventario detallado pasa a `PULSO-AUTH-005`.

---

#### 39. Caja y pagos no tienen ruta dedicada completa demostrada

El inventario actual no agrega rutas inexistentes para:

- apertura de caja;
- cierre de caja;
- revisión integral de caja;
- cobro como pantalla dedicada completa.

La existencia de campos o acciones relacionadas dentro de `/orders` no crea esos patrones de ruta.

---

#### 40. Capacidades canónicas sin ruta AS-IS dedicada

Tampoco se inventan rutas dedicadas para, entre otras:

- catering/B2B;
- reservas/eventos;
- reclamos/compensaciones;
- satisfacción;
- publicación completa de oferta;
- coordinación integral de tercero.

Su ausencia de ruta dedicada no elimina las pantallas canónicas ni demuestra que deban descartarse.

---

#### 41. Estado de menú y registro runtime

No se observó sincronizador local de navegación en `vento-pulso`.

La tarea conserva:

```text
RUNTIME_REGISTRY_STATUS = NOT_EVALUATED
MENU_STATUS = NOT_EVALUATED
```

No se infiere ausencia de registros remotos a partir de ausencia de sincronizador local.

La reconciliación de navegación runtime pertenece al contrato transversal correspondiente.

---

#### 42. Componentes no contados como vistas

No incrementan el conteo de rutas:

- `orders-board-live.tsx`;
- `orders-board.tsx`;
- `orders-board-legacy.tsx`;
- bridges de despacho;
- chat live;
- inbox de conversaciones;
- `ScannerPage`;
- `SalonPage`;
- helpers;
- módulos API internos;
- Server Actions.

Estos elementos pueden ser evidencia de una ruta, pero no crean otra identidad de página.

---

#### 43. Deuda `orders-board-legacy`

La cadena runtime actual conserva una dependencia con `orders-board-legacy.tsx`.

Esta tarea únicamente registra el hecho.

No autoriza:

- retirar el legacy;
- declarar paridad;
- fusionar los componentes;
- convertir la deuda en una nueva ruta.

El tratamiento permanece gobernado por la continuidad ya asignada.

---

#### 44. Regla de identidad estable

Cada vista inventariada conserva conjuntamente:

```text
PULSO-ROUTE-ID
+
URL PATTERN
+
SOURCE FILE
```

Mientras no exista decisión posterior, una ruta no cambia de identidad por:

- etiqueta visible;
- componente compartido;
- query parameter;
- cambio de filtro;
- enlace desde otra pantalla.

---

#### 45. Detección de duplicados

La línea base verificada contiene:

```text
DUPLICATE_ROUTE_IDS = 0
DUPLICATE_URL_PATTERNS = 0
DUPLICATE_SOURCE_FILES = 0
```

El par `/` y `/scanner` comparte componente principal, pero no patrón ni archivo fuente.

Por tanto no se elimina ni fusiona desde este inventario.

---

#### 46. Drift que invalida el inventario

Obligan a revisar esta matriz:

- alta de `page.*`;
- retiro de `page.*`;
- movimiento de archivo;
- cambio de patrón;
- introducción de segmento dinámico;
- alta de route handler;
- retiro o cambio de guard;
- cambio del permiso observado;
- cambio del tratamiento de sede;
- cambio del componente principal que altere intención material;
- introducción de login local;
- cambio material de navegación.

---

#### 47. Snapshot y huella

La evidencia documental debe conservar al menos:

- repositorio;
- rama;
- commit;
- ruta;
- archivo fuente;
- blob cuando esté disponible;
- clasificación;
- guard observado;
- límites de inferencia.

Un commit distinto no invalida automáticamente todo el inventario; invalida las conclusiones afectadas cuando cambian sus fuentes materiales.

---

#### 48. Handoff a PULSO-AUTH-002

`PULSO-AUTH-002 — Inventariar órdenes` recibe:

```text
PULSO-ROUTE-003
→ /orders
→ PEDIDOS_OPERACION
→ vista agregada
→ apertura != autoridad de acciones
```

Debe inventariar recursos, acciones, estados y fronteras de órdenes sin rediseñar toda la navegación PULSO.

---

#### 49. Handoff a PULSO-AUTH-003

`PULSO-AUTH-003 — Inventariar salón` recibe:

```text
PULSO-ROUTE-005
→ /salon
→ SALON
→ site_id
→ zonas / mesas / sesiones / llamados
→ contrato físico de OPS-POS-001
```

Debe separar lectura y acciones de salón por actor, estado y recurso.

---

#### 50. Handoff a PULSO-AUTH-004

`PULSO-AUTH-004 — Inventariar escáner` recibe:

```text
PULSO-ROUTE-001
+
PULSO-ROUTE-006
→ POS_SCANNER
→ mismo ScannerPage
→ dos identidades de ruta
```

Debe inventariar capacidades del scanner sin fusionar rutas ni transferir ownership de PASS.

---

#### 51. Handoff a PULSO-AUTH-005

`PULSO-AUTH-005 — Inventariar importaciones` recibe:

```text
PULSO-ROUTE-004
→ /sales-imports
→ IMPORTACION_VENTAS
→ carga / mapeo / lote / publicación
```

Debe separar cada acción sensible de la mera visibilidad de la vista.

---

#### 52. Handoff a permisos PULSO-AUTH-006..008

Las tareas de permisos reciben como restricción:

```text
pos.main observado
!=
permiso final suficiente
```

`PULSO-AUTH-006` define permisos de cajero.

`PULSO-AUTH-007` define permisos de supervisor.

`PULSO-AUTH-008` define permisos de cierre y anulación.

Esta tarea no crea claves de permiso nuevas.

---

#### 53. Handoff a materialización PULSO-AUTH-009..016

La materialización posterior debe consumir el inventario aprobado sin reabrir su cardinalidad salvo drift demostrado.

Incluye:

- acumulación protegida;
- redenciones protegidas;
- límite por sede del turno;
- dispositivos compartidos;
- actor ejecutor;
- configuración administrativa separada;
- migración a paquetes de `vento-shell`;
- pruebas integrales.

---

#### 54. Fronteras de ownership

Una vista PULSO puede consumir información o acciones de otros dominios sin adquirir ownership.

Se conservan, entre otras, estas fronteras:

```text
PASS → fidelización
NEXO → inventario y movimientos físicos
FOGO → receta y producción
NUMERA → registro económico y conciliación financiera
SHELL → SSO, contexto y fundaciones compartidas
PULSO → experiencia y proceso comercial de venta/caja/salón
```

---

#### 55. Hallazgos con propietario

| Hallazgo | Efecto | Propietario de salida |
| --- | --- | --- |
| `/` y `/scanner` comparten `ScannerPage` | posible duplicidad o alias, no resuelta | clasificación transversal + `PULSO-AUTH-004` |
| cinco vistas usan `pos.main` | granularidad insuficiente como diseño final | `PULSO-AUTH-006..008` y contratos transversales |
| `/orders` concentra múltiples acciones | apertura no puede conceder todas las mutaciones | `PULSO-AUTH-002` |
| `/sales-imports` concentra acciones administrativas | importación requiere separación de autoridad | `PULSO-AUTH-005` |
| `/salon` combina lectura y acciones | exige segregación por recurso/estado | `PULSO-AUTH-003` |
| no existe `/login` local | frontera SSO debe conservarse | contrato SHELL / navegación transversal |
| menú runtime no evaluado | no inferir navegación aprobada | reconciliación transversal de navegación |
| cero route handlers | futuras altas deben producir delta | control de drift / paquete propietario |
| snapshot puede derivar | requiere comparación de árbol y fuentes | `SHELL-CI-017` y paquete propietario |

No queda hallazgo material sin propietario o condición de salida.

---

#### 56. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

La conducta verificable necesaria para este inventario ya está registrada en la familia PULSO del Registro 04A.

---

#### 57. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-PULSO-008` — detectar exactamente seis archivos de página;
- `TREQ-PULSO-009` — identidad estable por ruta, patrón y fuente;
- `TREQ-PULSO-010` — seis patrones estáticos y query params no convertidos en rutas;
- `TREQ-PULSO-011` — conservar `/` y `/scanner` hasta decisión de consolidación;
- `TREQ-PULSO-012` — delegación SSO sin login PULSO inventado;
- `TREQ-PULSO-013` — `/no-access` como estado seguro de denegación;
- `TREQ-PULSO-014` — guard de las cinco rutas de negocio;
- `TREQ-PULSO-015` — `site_id` no amplía territorio;
- `TREQ-PULSO-016` — abrir `/orders` no concede mutaciones;
- `TREQ-PULSO-017` — abrir `/sales-imports` no concede carga/mapeo/publicación;
- `TREQ-PULSO-018` — aislamiento y segregación de `/salon`;
- `TREQ-PULSO-019` — query params dentro del contrato de su ruta;
- `TREQ-PULSO-020` — componentes y Server Actions fuera del conteo de rutas;
- `TREQ-PULSO-021` — evidencia anclada a repositorio, rama, commit, patrón y fuente;
- `TREQ-PULSO-022` — rechazo de duplicados;
- `TREQ-PULSO-023` — delta explícito ante drift;
- `TREQ-PULSO-024` — infraestructura existente no demuestra autorización o proceso completo;
- `TREQ-PULSO-025` — reconciliación posterior con registro y navegación runtime;
- `TREQ-PULSO-026` — permiso observado separado de suficiencia contractual;
- `TREQ-PULSO-027` — fronteras de aplicación preservadas.

La mención en esta sección es trazabilidad y no una actualización del Registro 04A.

---

#### 58. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; no hay cambio físico en el consumidor |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico |
| REMOTA | PASS | se verificaron `vento-shell` y `vento-pulso`, owner files, continuidad, topología, 04A, árbol runtime, seis page files, blobs de acceso y baseline vigente |
| OPERATIVA | NOT_EXECUTED | no se abrió una sesión POS ni se ejecutaron acciones reales de caja, pedidos, salón, scanner o importación |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida el inventario documental; no certifica autorización E2E del consumidor.

---

#### 59. Criterios de aceptación

- [ ] El inventario contiene exactamente seis rutas de página.
- [ ] Las seis rutas conservan IDs `PULSO-ROUTE-001..006`.
- [ ] Se registran cinco vistas de negocio y un estado de denegación.
- [ ] Se registran cero rutas dinámicas.
- [ ] Se registran cero route handlers App Router.
- [ ] Los seis patrones URL son únicos.
- [ ] Los seis archivos fuente son únicos.
- [ ] `/` y `/scanner` permanecen separados aunque compartan `ScannerPage`.
- [ ] `/no-access` no se trata como vista empresarial.
- [ ] Se conserva ausencia de `/login` local y frontera SSO con SHELL.
- [ ] `site_id`, `view`, `fulfillment`, `message`, `error` y `ok` no se contabilizan como rutas.
- [ ] Se registra `pos.main` únicamente como permiso observado.
- [ ] No se declara `pos.main` suficiente para todas las acciones.
- [ ] Se distingue acceso a vista de autoridad de mutación.
- [ ] `/orders` queda entregada a `PULSO-AUTH-002`.
- [ ] `/salon` queda entregada a `PULSO-AUTH-003`.
- [ ] `/` y `/scanner` quedan entregadas a `PULSO-AUTH-004`.
- [ ] `/sales-imports` queda entregada a `PULSO-AUTH-005`.
- [ ] Los permisos finales quedan reservados a `PULSO-AUTH-006..008`.
- [ ] La materialización queda reservada a `PULSO-AUTH-009..016`.
- [ ] Se distingue seis rutas AS-IS de veinte pantallas canónicas PULSO.
- [ ] No se inventan rutas para pantallas canónicas aún no materializadas.
- [ ] Los blobs actuales de las seis páginas coinciden con la línea base aprobada.
- [ ] Todo hallazgo tiene propietario de salida.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 60. Límites

Esta tarea no:

- inventaría todavía el detalle de órdenes;
- inventaría todavía el detalle de salón;
- inventaría todavía el detalle del scanner;
- inventaría todavía el detalle de importaciones;
- define permisos de cajero;
- define permisos de supervisor;
- define permisos de cierre o anulación;
- crea claves de permiso;
- cambia `pos.main`;
- protege físicamente acumulación o redención;
- limita físicamente la operación por sede;
- integra dispositivos POS compartidos;
- implementa firma de actor;
- migra PULSO a paquetes;
- ejecuta pruebas integrales;
- rediseña `VSCREEN-0080`;
- crea una ruta por cada `VSCREEN-*`;
- elimina `/` o `/scanner`;
- retira `orders-board-legacy`;
- crea o elimina route handlers;
- crea navegación runtime;
- modifica `app_screen_registry` o `app_navigation_items`;
- modifica código;
- modifica Supabase o datos;
- modifica el Registro 04A;
- ejecuta implementación física.

---

#### 61. Continuidad

**ÚLTIMA TAREA APROBADA**
`OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-001 — Inventariar vistas POS`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-002 — Inventariar órdenes`
### ✅ PULSO-AUTH-002 — Inventariar órdenes

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-001 — Inventariar vistas POS
**Tarea siguiente:** PULSO-AUTH-003 — Inventariar salón
**Tipo de tarea:** inventario documental cerrado de la superficie AS-IS de órdenes expuesta por `PULSO-ROUTE-003` (`/orders`), reconciliando recursos leídos, estados independientes, filtros, acciones operativas, despacho, regalos, facturación, conversación, historial, Realtime, callers de servidor y navegador, dependencia legacy, permisos observados, contexto territorial y handoffs de autorización, sin definir permisos finales ni modificar código, datos o Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, tablas, vistas, funciones, RPC, RLS, Realtime, Edge Functions, migraciones, permisos, rutas, componentes, datos, contratos generados, `vento-shell` ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma exhaustiva, estable y verificable la superficie actual de órdenes de PULSO para que las tareas posteriores de autorización trabajen sobre un universo técnico único y no reconstruyan el tablero desde botones visibles, nombres de componentes o inferencias sobre el proceso comercial.

La tarea debe dejar resuelto:

- qué identidad de ruta contiene el tablero de órdenes;
- qué archivos componen materialmente la experiencia runtime;
- qué recursos se leen;
- qué estados se muestran y cuáles deben permanecer independientes;
- qué filtros modifican la vista sin crear otras rutas;
- qué acciones mutan estado operativo;
- qué acciones gestionan despacho;
- qué acciones gestionan regalos;
- qué superficies gestionan conversación y archivo;
- qué evidencia de facturación se presenta;
- qué actualizaciones llegan por Realtime;
- qué operaciones se invocan desde Server Actions y cuáles directamente desde el navegador;
- qué permisos se observan sin convertirlos en diseño final;
- qué deuda legacy sigue activa;
- qué responsabilidades se transfieren a autorización y materialización posterior.

---

#### 2. Handoff recibido de PULSO-AUTH-001

`PULSO-AUTH-001` entrega una identidad estable:

```text
PULSO-ROUTE-003
→ /orders
→ PEDIDOS_OPERACION
→ vista agregada
→ apertura != autoridad de acciones
```

También entrega como restricciones:

```text
VIEW_ACCESS != ACTION_AUTHORITY
pos.main observado != permiso final suficiente
site_id observado != autoridad territorial por sí mismo
```

Esta tarea profundiza únicamente la superficie de órdenes y no reabre el inventario de las otras cinco rutas PULSO.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el inventario se define una sola vez;
- no crea instancia física propia;
- no modifica el consumidor;
- no crea o retira acciones;
- no crea permisos;
- no modifica RPC;
- no modifica RLS;
- no modifica Realtime;
- no modifica Edge Functions;
- no cambia estados runtime;
- no retira `orders-board-legacy`;
- no modifica `active-sequence.json` manualmente;
- la protección física posterior permanece en `PULSO-AUTH-009..016`, contratos transversales y paquetes propietarios.

---

#### 4. Fuentes verificadas

El inventario se reconcilia contra:

- `PULSO-AUTH-001` aprobado como base inmediata;
- `PULSO-UX-001` aprobado;
- registro 04A vigente del dominio PULSO;
- inventario transversal de superficies de servidor;
- `task-work-topology.json`;
- continuidad y secuencia documental vigentes;
- árbol actual de `vento-pulso`;
- `src/app/orders/page.tsx`;
- `src/app/orders/orders-board-live.tsx`;
- `src/app/orders/orders-board.tsx`;
- `src/app/orders/orders-board-legacy.tsx`;
- `src/app/orders/orders-live-bridge.tsx`;
- `src/app/orders/order-chat-live.tsx`;
- `src/app/orders/orders-chat-inbox.tsx`;
- `src/app/orders/delivery-dispatch-bridge.tsx`;
- `src/app/orders/delivery-override-bridge.tsx`;
- `scripts/quality/pulso-consumer-baseline-gate.mjs`.

La existencia de una superficie técnica se registra como evidencia AS-IS y no como aprobación de su diseño definitivo.

---

#### 5. Frontera raíz

Este inventario conserva obligatoriamente:

```text
RUTA /orders
!=
TABLERO VISUAL
!=
RECURSO DE DATOS
!=
ESTADO DE PEDIDO
!=
ESTADO DE PAGO
!=
ESTADO DE DESPACHO
!=
ESTADO DE CONVERSACIÓN
!=
ESTADO DE FACTURACIÓN
!=
CHECKLIST DE REGALO
!=
ACCIÓN OPERATIVA
!=
PERMISO FINAL
!=
PROCESO COMERCIAL COMPLETO
```

Una relación entre dos elementos no fusiona sus identidades ni sus autoridades.

---

#### 6. Snapshot técnico verificado

Repositorio consumidor inspeccionado:

```text
repository = vento-group-sas/vento-pulso
branch = main
HEAD = 715b5683db05caa010d725679b5ada4705a6da6e
framework = Next.js App Router
route = /orders
route_id = PULSO-ROUTE-003
```

La página fuente conserva el blob aprobado previamente para `/orders`:

```text
src/app/orders/page.tsx
blob = abcaefaec16a42e4ece18575addb93e25b1a1228
```

La tarea documenta este snapshot; un commit posterior no invalida automáticamente todo el inventario, pero obliga a revisar las conclusiones cuyas fuentes materiales cambien.

---

#### 7. Identidad canónica de la superficie

La identidad base es:

```text
PULSO-ROUTE-003
+
/orders
+
src/app/orders/page.tsx
+
PEDIDOS_OPERACION
```

Los componentes, bridges, Server Actions, RPC y suscripciones que sirven a la ruta no crean nuevas identidades `PULSO-ROUTE`.

---

#### 8. Cadena runtime observada del tablero

La cadena principal de representación contiene:

```text
src/app/orders/page.tsx
→ OrdersBoardLive
→ OrdersBoard
→ BaseOrdersBoard
→ orders-board-legacy.tsx
```

Concretamente:

- `page.tsx` prepara datos, filtros y acciones;
- `orders-board-live.tsx` añade sincronización y mutaciones optimistas;
- `orders-board.tsx` decora la experiencia con lógica de regalos;
- `orders-board.tsx` importa `OrdersBoard` desde `orders-board-legacy.tsx` como `BaseOrdersBoard`;
- la implementación legacy permanece, por tanto, en la cadena runtime actual.

Esta tarea no autoriza retirar ninguna capa.

---

#### 9. Cardinalidad técnica del universo de órdenes

El inventario principal contiene:

```text
PAGE_ROUTE = 1
PRIMARY_PAGE = 1
BOARD_LAYERS = 3
DELIVERY_BRIDGES = 2
CHAT_SURFACES = 2
LIVE_ORDER_BRIDGES = 1
BASELINE_SURFACES = 2
```

Las dos superficies contractuales del baseline asociadas directamente son:

```text
PULSO-SURFACE-006 = pedidos, líneas, estado, pago y fulfillment
PULSO-SURFACE-007 = despacho, chat, facturación e historial
```

La cardinalidad describe el snapshot técnico y no inventa pantallas adicionales.

---

#### 10. Parámetros y filtros observados

La ruta consume parámetros de consulta para contexto o filtrado, entre ellos:

```text
site_id
view
fulfillment
message
error
```

Los filtros funcionales observados incluyen:

```text
view:
- active
- delivered
- cancelled
- all

fulfillment:
- all
- delivery
- pickup
- on_premise
```

Regla:

```text
QUERY FILTER
!=
NEW ROUTE
!=
NEW SCREEN IDENTITY
!=
AUTHORITY
```

---

#### 11. Estados de pedido observados

El tablero reconoce actualmente:

```text
pending
confirmed
preparing
ready_for_dispatch
in_transit
on_the_way
delivered
cancelled
```

La existencia simultánea de `in_transit` y `on_the_way` se conserva como evidencia AS-IS.

Esta tarea no los fusiona, renombra ni declara equivalentes en el contrato de datos.

---

#### 12. Estados de pago observados

La superficie presenta estados de pago como dimensión independiente del estado de pedido:

```text
paid
pending
pending_payment
unpaid
failed
cancelled
refunded
not_required
```

Regla obligatoria:

```text
ORDER_STATUS
!=
PAYMENT_STATUS
```

La presencia de `payment_status` en el tablero no demuestra materialización completa de cobro, conciliación, caja o documento fiscal.

---

#### 13. Modalidades de fulfillment observadas

El tablero distingue como mínimo:

```text
delivery
pickup
on_premise
```

La modalidad condiciona presentación, pago y acciones operativas, pero no crea otra identidad de pedido.

Regla:

```text
FULFILLMENT_TYPE
!=
ORDER_IDENTITY
```

---

#### 14. Estados de despacho observados

La superficie maneja una dimensión de despacho separada, con etiquetas para estados como:

```text
not_required
pending
assigned
ready_for_dispatch
in_transit
delivered
cancelled
```

Regla:

```text
ORDER_STATUS
!=
DISPATCH_STATUS
```

Una transición de pedido puede correlacionarse con despacho sin convertir ambas máquinas de estado en una sola.

---

#### 15. Fuentes o canales observados

El código presenta etiquetas para fuentes como:

```text
vento_pass
pulso
pos
web
```

La etiqueta de origen:

- no cambia el propietario del pedido interno;
- no demuestra por sí sola deduplicación de un canal externo;
- no materializa automáticamente `VSCREEN-0087 — Bandeja de pedidos de canales externos`;
- no convierte un pedido importado, web o PASS en una ruta distinta.

---

#### 16. Matriz de recursos leídos

| Recurso observado | Uso AS-IS en `/orders` | Naturaleza |
| --- | --- | --- |
| `orders` | identidad, sede, estado, pago, fulfillment, despacho, cliente/guest, totales y contexto operativo | núcleo de pedido |
| `order_items` | líneas del pedido, cantidades, precios y referencias de producto | línea comercial |
| `products` | enriquecimiento de líneas | maestro consumido |
| `order_item_options` | opciones/configuración de líneas | detalle de línea |
| `order_billing_requests` | solicitud y resultado visible de facturación | fiscal/documental |
| `order_status_events` | historial de operaciones y transiciones | auditoría operativa |
| `employees` | resolución visual de actores de eventos | identidad laboral consumida |
| `order_conversations` | conversación asociada al pedido | comunicación |
| `order_messages` | mensajes asociados a conversación/pedido | comunicación |

La lectura conjunta no transfiere ownership entre dominios.

---

#### 17. Lectura principal de pedidos

La página consulta pedidos limitados a la sede resuelta y aplica orden temporal y filtros de vista.

La evidencia observada conserva:

```text
ORDER
+
SITE
+
STATUS
+
PAYMENT
+
FULFILLMENT
+
DISPATCH
```

El query de la página es una proyección operativa de lectura; no define por sí solo el contrato final de autorización de cada columna.

---

#### 18. Líneas, productos y opciones

La superficie reconstruye detalle comercial desde líneas y enriquecimientos relacionados.

Se conserva la separación:

```text
ORDER
!=
ORDER_ITEM
!=
PRODUCT MASTER
!=
ITEM OPTION
```

Esta tarea no autoriza mutaciones de línea, producto, precio, descuento o inventario por la mera capacidad de mostrarlos.

---

#### 19. Facturación observada

`/orders` presenta evidencia de `order_billing_requests`, incluyendo información como:

- identidad fiscal solicitada;
- correo de facturación;
- estado de solicitud;
- proveedor;
- referencia externa;
- número de factura;
- CUFE cuando existe;
- referencias de PDF/XML cuando existen;
- error cuando existe;
- timestamps del ciclo observado.

En el snapshot revisado, esta presencia se inventaría como lectura y visualización de evidencia.

No se declara desde esta tarea una autoridad de emisión, anulación o regeneración fiscal.

---

#### 20. Historial de eventos

El tablero consume `order_status_events` para exponer historial de operaciones y transiciones.

La evidencia incluye campos relacionados con:

```text
operation
from_status
to_status
from_dispatch_status
to_dispatch_status
dispatch_partner
dispatch_reference
actor
metadata
created_at
```

La existencia de actor o metadata en un evento no certifica por sí sola que todas las operaciones actuales ya tengan atribución de actor efectivo completa.

---

#### 21. Conversaciones y mensajes

La superficie vincula:

```text
ORDER
→ ORDER_CONVERSATION
→ ORDER_MESSAGES
```

La identidad de conversación permanece separada de la identidad de pedido.

Los mensajes conservan, entre otros:

- `conversation_id`;
- `order_id`;
- `site_id`;
- autor;
- tipo de autor;
- cuerpo;
- timestamp.

La conversación es una capacidad relacionada con el pedido, no un estado del pedido.

---

#### 22. Contadores y vistas operativas

El tablero calcula o presenta conteos derivados del conjunto visible, incluyendo pedidos activos y pedidos listos para despacho.

Los conteos son proyecciones de la vista actual.

Regla:

```text
UI_COUNTER
!=
AUTHORITATIVE_BUSINESS_STATE
```

Un contador no sustituye la lectura del recurso ni una decisión de autorización.

---

#### 23. Server Action de operación de pedido

`page.tsx` expone una acción de servidor para cambios operativos de pedido.

Antes de invocar la RPC observada, la acción valida datos de entrada y ejecuta `requireAppAccess` con:

```text
appId = pulso
permissionCode = pos.main
requireAppAccessPermission = true
siteId = sede solicitada/resuelta
```

La mutación se delega a:

```text
public.update_order_operational_state
```

La presencia de este guard es evidencia AS-IS y no aprobación de `pos.main` como permiso final de todas las operaciones.

---

#### 24. Operaciones de transición observadas

El conjunto de operaciones explícitas del tablero incluye:

| Operación | Intención observada |
| --- | --- |
| `mark_preparing` | llevar el pedido hacia preparación |
| `mark_ready` | marcarlo listo para la siguiente etapa |
| `mark_in_transit` | iniciar tránsito de una entrega |
| `mark_delivered` | registrar entrega/cierre operativo visible |
| `mark_cancelled` | cancelar el pedido |
| `assign_dispatch` | asignar o actualizar referencia de despacho |

Estas operaciones son identidades de acción y no simples nombres de botones.

La tarea no define todavía qué rol final puede ejecutar cada una.

---

#### 25. Regla de pago observada para delivery

El código bloquea la progresión operativa de un pedido `delivery` no cancelado cuando `payment_status` no es `paid`, conservando cancelación como salida visible.

La regla AS-IS observada es aproximadamente:

```text
fulfillment = delivery
AND order_status != cancelled
AND payment_status != paid
→ progression_blocked
```

Esta tarea documenta la regla del consumidor.

No la eleva a contrato final de pagos ni certifica que todos los callers posibles estén sujetos al mismo control.

---

#### 26. Restricción observada para tránsito

La acción `mark_in_transit` se trata como operación propia de `delivery` en la acción de servidor revisada.

Regla AS-IS:

```text
mark_in_transit
→ requiere order.fulfillment_type = delivery
```

No se extrapola esta regla a otros callers sin evidencia.

---

#### 27. Asignación de despacho

La asignación de despacho utiliza la misma familia RPC de operación de pedido con:

```text
operation = assign_dispatch
p_dispatch_partner
p_dispatch_reference
```

La interfaz exige al menos partner o referencia para intentar la operación.

Se conservan separadas:

```text
ASSIGN_DISPATCH
!=
MARK_IN_TRANSIT
!=
MARK_DELIVERED
```

---

#### 28. Mutación directa desde `orders-board-live`

Además de las Server Actions, `orders-board-live.tsx` invoca desde el cliente Supabase:

```text
public.update_order_operational_state
```

para operaciones optimistas y asignación de despacho.

Esto demuestra que la superficie posee más de un caller técnico hacia la misma familia de mutación.

Por tanto:

```text
SERVER_ACTION_GUARD
!=
PROOF_THAT_EVERY_CALLER_USES_SERVER_ACTION
```

La autorización efectiva de la RPC debe ser verificada en su contrato propietario; esta tarea no la presume.

---

#### 29. Checklist operativo de regalos

`orders-board.tsx` reconoce tres operaciones de regalo:

```text
mark_card_prepared
mark_card_included
mark_price_free_packaging_confirmed
```

Las invoca mediante:

```text
public.update_order_gift_operational_state
```

El snapshot de regalo puede contener comprador, destinatario, políticas de contacto, mensaje de tarjeta, estado de tarjeta y confirmación de empaque sin precios.

Estas operaciones forman parte del tratamiento operativo del pedido y no transfieren a PULSO el ownership del ledger de fidelización PASS.

---

#### 30. Realtime de pedidos en `orders-board-live`

`orders-board-live.tsx` abre un canal por sede:

```text
pulso-orders-local:<site_id>
```

Suscripciones observadas:

- `UPDATE` sobre `orders` filtrado por `site_id`;
- `INSERT` sobre `orders` filtrado por `site_id`;
- `INSERT` sobre `order_status_events` sin filtro de `site_id` declarado en la suscripción del cliente.

El handler de eventos solo incorpora un evento a entradas cuyo `order_id` ya está presente en el tablero visible.

La tarea registra ambas condiciones sin declarar seguridad E2E de Realtime.

---

#### 31. Sincronización de órdenes visibles

El cliente puede resincronizar los pedidos actualmente visibles leyendo campos como:

```text
id
status
payment_status
fulfillment_type
dispatch_status
dispatch_partner
dispatch_reference
```

La resincronización corrige o confirma estado visual después de actividad optimista, visibilidad de página o recuperación de conectividad.

Esto no sustituye idempotencia ni control de concurrencia en la autoridad de datos.

---

#### 32. Bridge de alertas live

`orders-live-bridge.tsx` escucha cambios de `orders` por sede.

Evidencia observada:

- `INSERT` de pedido → alerta operativa y refresh programado;
- `UPDATE` de pedido → detección de transición hacia `payment_status = paid` para delivery y alerta correspondiente;
- estado de conexión Realtime visible para la UI.

Una alerta no muta por sí sola el pedido ni confirma el resultado de pago.

---

#### 33. Chat embebido del pedido

`order-chat-live.tsx` gestiona el chat asociado al pedido seleccionado.

Evidencia observada:

- marca lectura mediante `mark_order_conversation_read`;
- lee mensajes de la conversación;
- escucha `INSERT` de `order_messages` por `conversation_id`;
- envía a través de una acción recibida desde el servidor;
- considera cerrado el envío operativo cuando el pedido está `delivered` o `cancelled`;
- después de un envío exitoso intenta notificar mediante la Edge Function `order-message-notify`.

La notificación es un efecto posterior al mensaje y no su autoridad de persistencia.

---

#### 34. Inbox de conversaciones

`orders-chat-inbox.tsx` añade una superficie agregada de conversación por sede.

Evidencia observada:

- conversaciones activas;
- conversaciones archivadas;
- conteo de no leídos;
- lectura de pedidos relacionados;
- carga de mensajes;
- marcado como leído;
- archivado/restauración;
- archivado masivo de conversaciones finalizadas elegibles;
- inserción de mensajes;
- Realtime de mensajes, conversaciones y pedidos.

Esta superficie no crea otra ruta de página.

---

#### 35. Mutaciones de chat observadas

Las identidades técnicas observadas incluyen:

```text
public.mark_order_conversation_read
public.get_staff_order_chat_unread_counts
public.set_order_conversation_archived
public.archive_finished_order_conversations
INSERT public.order_messages
supabase.functions.invoke("order-message-notify")
```

El inbox contiene un camino de inserción de mensajes desde cliente Supabase, mientras el chat embebido usa una acción de servidor para persistir el mensaje.

La coexistencia de callers se registra para reconciliación posterior; no se declara automáticamente incorrecta ni equivalente.

---

#### 36. Archivo de conversaciones

El inbox separa:

```text
ACTIVE_CONVERSATION
!=
ARCHIVED_CONVERSATION
```

La interfaz observa como condición para archivo ordinario que el pedido esté finalizado y no existan mensajes pendientes de lectura.

También existe una operación de archivo masivo de conversaciones finalizadas.

La política efectiva debe permanecer en la autoridad de servidor/RPC y no depender únicamente del botón visible.

---

#### 37. Edge Function de notificación de mensajes

La superficie invoca:

```text
order-message-notify
```

como efecto de notificación posterior al mensaje.

Regla:

```text
MESSAGE_PERSISTED
!=
NOTIFICATION_DELIVERED
```

Un fallo de push no debe reinterpretarse como inexistencia del mensaje ya persistido.

La implementación y configuración de la Edge Function pertenecen a `vento-shell` y a sus contratos de infraestructura.

---

#### 38. Bridge de enlace para domiciliario

Después de una asignación de despacho, `delivery-dispatch-bridge.tsx` verifica el pedido por `order_id` y `site_id` y puede solicitar:

```text
public.create_order_delivery_courier_link
```

Luego prepara un enlace para el portal del domiciliario y una salida hacia WhatsApp.

Se conserva:

```text
ASSIGN_DISPATCH
!=
CREATE_COURIER_LINK
!=
SEND_WHATSAPP
```

La generación del enlace no se interpreta como entrega completada.

---

#### 39. Override de confirmación de entrega

`delivery-override-bridge.tsx` observa una capacidad excepcional para pedidos `delivery` en estados `in_transit` u `on_the_way`.

Antes de presentar la opción manual consulta:

```text
public.has_permission
permission = pulso.delivery.override
site_id = sede del pedido
```

La confirmación excepcional invoca:

```text
public.override_order_delivery_confirmation
```

con motivo, comentario y metadata de origen.

La UI exige un comentario mínimo antes de invocar la RPC.

El permiso observado es evidencia AS-IS de esta acción específica; no se generaliza al resto de operaciones del tablero.

---

#### 40. Permisos observados en la superficie

Se observan al menos dos referencias de autorización distintas:

```text
pos.main
→ guard de acceso a /orders y Server Actions revisadas

pulso.delivery.override
→ capacidad excepcional de confirmación manual de entrega
```

Por tanto:

```text
ONE_VIEW
!=
ONE_PERMISSION
```

Y también:

```text
OBSERVED_PERMISSION
!=
FINAL_PERMISSION_MODEL
```

La definición final de permisos permanece en `PULSO-AUTH-006..008` y contratos transversales de autorización.

---

#### 41. Contexto territorial

`site_id` participa en lecturas, acciones, RPC, canales Realtime y bridges.

La frontera obligatoria es:

```text
site_id solicitado
→ debe reconciliarse con sesión/contexto autorizado
→ no puede ampliar territorio por manipulación de URL o payload
```

La tarea conserva la evidencia de uso territorial, pero no certifica todos los paths de enforcement.

La materialización del límite por sede continúa en `PULSO-AUTH-011`.

---

#### 42. Regla de autorización por recurso y estado

Toda acción sensible de órdenes debe permanecer conceptualmente separada por:

```text
PRINCIPAL
+
ACTOR EFECTIVO
+
PERMISO EXACTO
+
SITE
+
ORDER_ID
+
RESOURCE
+
CURRENT_STATE
+
REQUESTED_OPERATION
+
ALLOWED_COLUMNS
```

Esta tarea inventaría el universo que deberá protegerse.

No define todavía la matriz final actor → permiso → operación.

---

#### 43. Acceso a la vista y autoridad de mutación

Regla heredada y confirmada:

```text
OPEN /orders
!=
MARK_PREPARING
!=
MARK_READY
!=
MARK_IN_TRANSIT
!=
MARK_DELIVERED
!=
MARK_CANCELLED
!=
ASSIGN_DISPATCH
!=
UPDATE_GIFT_CHECKLIST
!=
SEND_MESSAGE
!=
ARCHIVE_CHAT
!=
DELIVERY_OVERRIDE
```

La ruta agrupa capacidades heterogéneas.

Por tanto, un guard de página no puede ser tratado como evidencia suficiente de autorización granular de todas ellas.

---

#### 44. Dependencia runtime de `orders-board-legacy`

La dependencia legacy no es solo histórica.

En el snapshot actual:

```text
orders-board.tsx
imports
OrdersBoard as BaseOrdersBoard
from ./orders-board-legacy
```

Y `orders-board-live.tsx` consume el `OrdersBoard` decorado.

Resultado:

```text
LEGACY_RUNTIME_DEPENDENCY = ACTIVE
```

Esta tarea no declara paridad, retiro ni reemplazo completados.

---

#### 45. Deuda de paridad y retiro

La cobertura vigente exige que la migración futura conserve paridad de:

- pedidos;
- filtros;
- transiciones;
- despacho;
- conversación;
- historial;
- facturación;
- regalos;
- eventos;
- actualización en tiempo real.

La presencia de componentes nuevos junto al legacy no demuestra que esa paridad ya esté cerrada.

El retiro del import runtime permanece fuera de esta tarea.

---

#### 46. `PULSO-SURFACE-006`

El baseline define esta superficie como:

```text
PULSO-SURFACE-006
= pedidos, líneas, estado, pago y fulfillment
```

Su familia de validación requiere evidencia equivalente a:

```text
order_id
site_valid
lines_valid
payment_rule_valid
fulfillment_valid
transition_supported
resource_scope_valid
no_duplicate_effect
```

Esta tarea inventaría los elementos que participan en ese contrato; no ejecuta la certificación física del consumidor.

---

#### 47. `PULSO-SURFACE-007`

El baseline define:

```text
PULSO-SURFACE-007
= despacho, chat, facturación e historial
```

Su familia de validación requiere evidencia equivalente a:

```text
order_id
dispatch_scope_valid
conversation_bound
message_valid
events_attributable
billing_reference_bound
resource_scope_valid
```

La superficie agrupa recursos relacionados sin convertirlos en un único permiso.

---

#### 48. Relación con pantallas canónicas PULSO

`/orders` aporta evidencia parcial a varias pantallas canónicas, sin equivalencia uno a uno:

| Pantalla canónica | Relación AS-IS observada |
| --- | --- |
| `VSCREEN-0081 — Creación de venta o pedido` | relación parcial con pedido, no creación integral demostrada por esta ruta |
| `VSCREEN-0083 — Detalle y modificación de pedido` | relación directa parcial mediante detalle y operaciones |
| `VSCREEN-0084 — Cobro y medios de pago` | estado/regla de pago visible; cobro integral no demostrado |
| `VSCREEN-0088 — Seguimiento de preparación y entrega` | relación directa parcial mediante estados, despacho y Realtime |
| `VSCREEN-0091 — Anulación, devolución y reembolso` | cancelación visible; devolución/reembolso integral no demostrado |
| `VSCREEN-0151 — Coordinación de entrega mediante tercero` | bridges de despacho, enlace y confirmación; coordinación completa no demostrada |

La ruta no absorbe por inferencia las responsabilidades completas de esas pantallas.

---

#### 49. Relación con procesos canónicos

La superficie se relaciona principalmente con procesos PULSO ya inventariados, entre ellos:

- `VPROC-0038` — servicio en mesa;
- `VPROC-0039` — mostrador o para llevar;
- `VPROC-0040` — normalización de pedidos externos;
- `VPROC-0042` — modificación/cancelación/devolución;
- `VPROC-0043` — cobro y confirmación de pago;
- `VPROC-0050` — entrega mediante tercero.

La presencia técnica de una acción en `/orders` no demuestra que todo el proceso canónico esté materializado en esa ruta.

---

#### 50. Frontera de ownership PULSO

PULSO conserva en esta superficie:

- identidad y seguimiento comercial del pedido;
- líneas y contexto comercial mostrado;
- operación de estados del pedido;
- relación con fulfillment;
- coordinación visible de despacho;
- conversación en contexto del pedido;
- relación visible con facturación;
- historial operativo;
- checklist operativo de regalo.

La propiedad se limita al contrato comercial que le corresponde.

---

#### 51. Fronteras con PASS, NEXO, FOGO y NUMERA

Se mantienen las fronteras:

```text
PASS
→ identidad/loyalty y superficies cliente compartidas

NEXO
→ inventario y movimientos físicos

FOGO
→ receta, preparación/lote y producción propietaria

NUMERA
→ reconocimiento económico y conciliación contable

PULSO
→ pedido, venta, operación comercial y coordinación de entrega al cliente
```

Un pedido puede consumir o producir efectos para otros dominios sin transferirles ni adquirir su ownership.

---

#### 52. Estados independientes obligatorios

El inventario confirma múltiples máquinas o dimensiones de estado:

```text
ORDER_STATUS
PAYMENT_STATUS
DISPATCH_STATUS
CONVERSATION_STATUS
BILLING_REQUEST_STATUS
GIFT_CHECKLIST_STATUS
```

Deben permanecer separadas salvo contrato explícito posterior.

Nunca:

```text
ORDER_DELIVERED
=
PAYMENT_PAID
=
INVOICE_ISSUED
=
CHAT_ARCHIVED
=
GIFT_CHECKLIST_COMPLETE
```

---

#### 53. Callers de navegador y servidor

La superficie actual contiene una mezcla de callers:

```text
SERVER COMPONENT / SERVER ACTION
CLIENT SUPABASE RPC
CLIENT TABLE INSERT
CLIENT REALTIME
CLIENT EDGE FUNCTION INVOCATION
```

Esta diversidad es parte material del inventario de autorización.

Una validación aplicada en un caller no demuestra automáticamente que todos los demás callers estén cubiertos por la misma validación.

---

#### 54. Hallazgos y propietarios de salida

| Hallazgo | Efecto | Propietario de salida |
| --- | --- | --- |
| `pos.main` protege acceso general pero la vista contiene acciones heterogéneas | requiere permisos atómicos | `PULSO-AUTH-006..008` |
| existe `pulso.delivery.override` como permiso específico observado | confirma necesidad de granularidad | `PULSO-AUTH-006..008` + autorización transversal |
| `site_id` aparece en múltiples callers | exige límite territorial consistente | `PULSO-AUTH-011` |
| existen callers directos desde navegador hacia RPC/tablas | el guard de página no basta como prueba | `PULSO-AUTH-014`, `PULSO-AUTH-016` y contratos de servidor |
| `orders-board-legacy` sigue en runtime | retiro requiere paridad demostrada | `PULSO-AUTH-015`, `PULSO-AUTH-016` y paquete propietario |
| chat posee dos caminos de persistencia observados | exige reconciliar autorización/auditoría | `PULSO-AUTH-014`, `PULSO-AUTH-016` |
| `order_status_events` Realtime no declara filtro `site_id` en el subscription descriptor | requiere demostrar aislamiento efectivo por políticas/recursos | `PULSO-AUTH-011`, `PULSO-AUTH-016` |
| delivery usa link temporal/portal y override | requiere seguridad específica de tercero y excepción | `PULSO-AUTH-006..008`, `PULSO-AUTH-016` y contratos de integración |
| facturación se presenta pero no se observa emisión integral en esta ruta | no confundir lectura con autoridad fiscal | contratos PULSO/NUMERA/fiscal propietarios |
| estados de pedido, pago y despacho son distintos | impedir fusiones de estado | `PULSO-AUTH-016` y paquetes propietarios |

No queda hallazgo material de este inventario sin propietario o condición de salida.

---

#### 55. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

La conducta verificable necesaria para el inventario de órdenes ya está cubierta por requisitos vigentes del dominio PULSO y contratos transversales.

---

#### 56. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-PULSO-002` — paridad y retiro controlado de `orders-board-legacy`;
- `TREQ-PULSO-004` — mutaciones mediante acciones nombradas y autorizadas;
- `TREQ-PULSO-005` — separación del ciclo comercial, líneas, estados y efectos;
- `TREQ-PULSO-006` — separación de venta, pago, caja y factura;
- `TREQ-PULSO-007` — entrega, tercero, PIN, override, privacidad e idempotencia;
- `TREQ-PULSO-014` — guard y acceso directo a rutas de negocio;
- `TREQ-PULSO-015` — `site_id` no amplía territorio;
- `TREQ-PULSO-016` — abrir `/orders` no autoriza sus mutaciones;
- `TREQ-PULSO-019` — query parameters no crean rutas ni autoridad;
- `TREQ-PULSO-020` — componentes, bridges y Server Actions no cuentan como rutas;
- `TREQ-PULSO-021` — evidencia anclada a repositorio, commit y fuente;
- `TREQ-PULSO-024` — infraestructura existente no demuestra proceso o autorización completa;
- `TREQ-PULSO-026` — permiso observado separado de suficiencia contractual;
- `TREQ-PULSO-027` — fronteras entre aplicaciones preservadas.

La mención en esta sección es trazabilidad y no una actualización del Registro 04A.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; la tarea no modifica el consumidor |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico durante la redacción |
| REMOTA | PASS | se verificaron `vento-shell` y `vento-pulso`, continuidad, topología, 04A, owner file, árbol actual de órdenes, página, boards, bridges, chat, baseline, blobs y contratos documentales aplicables |
| OPERATIVA | NOT_EXECUTED | no se operaron pedidos reales, pagos, despachos, chats, regalos, facturación ni entregas |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida el inventario documental contra el snapshot inspeccionado; no certifica autorización E2E, RLS, RPC, Realtime, Edge Functions ni operación real.

---

#### 58. Criterios de aceptación

- [ ] Se conserva `PULSO-ROUTE-003` como identidad única de `/orders`.
- [ ] Se identifica `src/app/orders/page.tsx` como página propietaria runtime de la ruta.
- [ ] Se inventaría la cadena `page → live board → decorated board → legacy board`.
- [ ] Se registra que `orders-board-legacy` sigue activo en runtime.
- [ ] Se separan pedido, línea, producto y opciones.
- [ ] Se separan estado de pedido, pago, despacho, conversación, facturación y regalo.
- [ ] Se registran los ocho estados de pedido observados.
- [ ] Se registran las modalidades `delivery`, `pickup` y `on_premise`.
- [ ] Se registran filtros `active`, `delivered`, `cancelled` y `all`.
- [ ] Se registran `mark_preparing`, `mark_ready`, `mark_in_transit`, `mark_delivered`, `mark_cancelled` y `assign_dispatch`.
- [ ] Se registra `update_order_operational_state` como RPC de operación observada.
- [ ] Se registra que existen callers de Server Action y callers directos desde cliente.
- [ ] Se registran las tres operaciones de checklist de regalo.
- [ ] Se registra `update_order_gift_operational_state`.
- [ ] Se inventarían lectura y gestión de conversaciones/mensajes.
- [ ] Se registran marcado de lectura, conteos, archivo y archivo masivo de chat.
- [ ] Se registra la invocación de `order-message-notify` como efecto de notificación.
- [ ] Se inventaría `create_order_delivery_courier_link` separadamente de asignación y entrega.
- [ ] Se inventaría `pulso.delivery.override` únicamente como permiso específico observado.
- [ ] Se inventaría `override_order_delivery_confirmation` como capacidad excepcional.
- [ ] Se registra la regla AS-IS que bloquea progresión de delivery sin pago confirmado.
- [ ] Se registra la restricción AS-IS de tránsito para delivery.
- [ ] Se inventarían `PULSO-SURFACE-006` y `PULSO-SURFACE-007` sin fusionarlas.
- [ ] Se registra el subscription de eventos sin filtro `site_id` declarado y su handler limitado a pedidos visibles.
- [ ] Se distingue `pos.main` observado de suficiencia contractual.
- [ ] Se conserva `site_id` como contexto, no como autoridad.
- [ ] Se conservan fronteras con PASS, NEXO, FOGO y NUMERA.
- [ ] Se relaciona `/orders` con pantallas canónicas solo de forma parcial y explícita.
- [ ] Todo hallazgo queda asignado a un propietario de salida.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 59. Límites

Esta tarea no:

- define permisos finales de cajero;
- define permisos finales de supervisor;
- define permisos de cierre o anulación;
- crea claves de permiso;
- cambia `pos.main`;
- cambia `pulso.delivery.override`;
- modifica guards;
- modifica RPC;
- modifica funciones SQL;
- modifica RLS;
- modifica Realtime;
- modifica Edge Functions;
- modifica tablas o datos;
- crea migraciones;
- cambia estados de pedido;
- cambia estados de pago;
- cambia estados de despacho;
- modifica reglas de fulfillment;
- retira `orders-board-legacy`;
- declara paridad del reemplazo;
- rediseña `/orders`;
- crea rutas nuevas;
- implementa caja;
- implementa cobro integral;
- emite facturas;
- implementa devolución o reembolso integral;
- rediseña delivery;
- rediseña chat;
- modifica PASS, NEXO, FOGO o NUMERA;
- modifica el Registro 04A;
- ejecuta implementación física.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-001 — Inventariar vistas POS`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-002 — Inventariar órdenes`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-003 — Inventariar salón`
### ✅ PULSO-AUTH-003 — Inventariar salón

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-002 — Inventariar órdenes
**Tarea siguiente:** PULSO-AUTH-004 — Inventariar escáner
**Tipo de tarea:** inventario documental cerrado de la superficie AS-IS de salón expuesta por `PULSO-ROUTE-005` (`/salon`), reconciliando zonas, mesas, sesiones, llamados, estados derivados, lecturas y mutaciones directas, compatibilidad pública sobre el esquema `pos`, RLS, permisos observados, atribución de actor, Realtime, fronteras con la configuración física de `OPS-POS-001` y handoffs de autorización, sin definir permisos finales ni modificar código, datos o Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, zonas, mesas, sesiones, llamados, vistas, tablas, políticas RLS, grants, Realtime, funciones, RPC, migraciones, Supabase, permisos, rutas, componentes, datos, contratos generados, `vento-shell` ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma exhaustiva, estable y verificable la superficie actual de salón de PULSO para que las tareas posteriores de autorización trabajen sobre un universo técnico único y no reconstruyan la operación desde colores de mesa, botones visibles o nombres de tablas.

La tarea debe dejar resuelto:

- qué identidad de ruta contiene el salón;
- qué archivos componen materialmente la experiencia runtime;
- qué recursos se leen;
- cómo se relacionan zona, mesa, sesión y llamado;
- qué estados son persistidos y cuáles son derivados de UI;
- qué acciones mutan datos desde navegador;
- qué acciones de salón no están presentes en la superficie actual;
- qué alcance territorial se observa;
- qué autoridad RLS protege cada recurso;
- qué compatibilidad pública existe sobre el esquema propietario `pos`;
- qué atribución de actor se conserva o queda incompleta;
- qué contrato Realtime declara el código y qué configuración remota lo respalda actualmente;
- qué decisiones físicas de `OPS-POS-001` deben permanecer separadas de la autorización;
- qué responsabilidades pasan a permisos, contexto, dispositivos, actor efectivo, configuración, migración y pruebas posteriores.

---

#### 2. Handoff recibido de PULSO-AUTH-002

`PULSO-AUTH-002` conserva la regla transversal recibida desde `PULSO-AUTH-001`:

```text
VIEW_ACCESS
!=
ACTION_AUTHORITY
```

La continuidad cambia de recurso sin cambiar esa regla:

```text
PULSO-AUTH-002
→ inventario cerrado de /orders
→ continuidad documental
→ PULSO-AUTH-003
→ inventario cerrado de /salon
```

Esta tarea no reabre decisiones del tablero de órdenes.

---

#### 3. Handoff específico recibido de PULSO-AUTH-001

`PULSO-AUTH-001` entrega exactamente:

```text
PULSO-ROUTE-005
→ /salon
→ SALON
→ site_id
→ zonas / mesas / sesiones / llamados
→ contrato físico de OPS-POS-001
```

Y exige separar lectura y acciones por actor, estado y recurso.

---

#### 4. Handoff físico recibido de OPS-POS-001

`OPS-POS-001` define la semántica física que la vista de salón consume sin convertirla en permiso.

Se conserva obligatoriamente:

```text
MARCA
!=
SEDE
!=
ÁREA OPERATIVA
!=
ZONA FÍSICA
!=
PUNTO DE SERVICIO
!=
ESTACIÓN
!=
MESA
!=
DISPOSITIVO
!=
ÁREA DE AUTORIZACIÓN
```

También se conserva:

```text
TABLE_ID ESTABLE
!=
TABLE_NUMBER VISIBLE
```

Una zona o mesa física no concede autoridad por su ubicación.

---

#### 5. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el inventario se define una sola vez;
- no crea instancia física propia;
- no modifica el consumidor;
- no crea zonas ni mesas;
- no abre ni cierra sesiones;
- no crea ni resuelve llamados;
- no modifica RLS;
- no modifica grants;
- no agrega relaciones a Realtime;
- no crea permisos;
- no crea Server Actions ni RPC;
- no modifica `active-sequence.json` manualmente;
- la materialización posterior permanece en las tareas y paquetes propietarios.

---

#### 6. Fuentes verificadas

El inventario se reconcilia contra:

- `PULSO-AUTH-001` aprobado en la fuente canónica;
- `PULSO-AUTH-002` aprobado por el usuario como base inmediata;
- `OPS-POS-001` aprobado;
- `PULSO-UX-001` aprobado;
- registro 04A vigente del dominio PULSO;
- `task-work-topology.json`;
- continuidad y secuencia documental vigentes;
- árbol actual de `vento-pulso`;
- `src/app/salon/page.tsx`;
- `src/modules/salon/components/salon-page.tsx`;
- `src/modules/salon/lib/status.ts`;
- `src/modules/salon/types.ts`;
- `src/lib/auth/guard.ts`;
- `src/lib/auth/permissions.ts`;
- `scripts/quality/pulso-consumer-baseline-gate.mjs`;
- catálogo remoto de Supabase para las relaciones propietarias y sus vistas públicas;
- políticas RLS, grants y publicación Realtime remotas aplicables al universo inspeccionado.

La evidencia remota se utiliza para describir el AS-IS y no autoriza mutaciones.

---

#### 7. Frontera raíz

Este inventario conserva obligatoriamente:

```text
RUTA /salon
!=
ZONA
!=
MESA
!=
SESIÓN DE MESA
!=
LLAMADO DE SERVICIO
!=
ESTADO VISUAL DE MESA
!=
ASIGNACIÓN DE RESPONSABLE
!=
PEDIDO
!=
CUENTA
!=
PERMISO FINAL
!=
PROCESO DE SERVICIO COMPLETO
```

Una relación entre dos identidades no fusiona sus lifecycles ni sus autoridades.

---

#### 8. Snapshot técnico verificado

Repositorio consumidor inspeccionado:

```text
repository = vento-group-sas/vento-pulso
branch = main
HEAD = 715b5683db05caa010d725679b5ada4705a6da6e
route = /salon
route_id = PULSO-ROUTE-005
```

Huella de fuentes principales:

| Fuente | Git blob verificado |
| --- | --- |
| `src/app/salon/page.tsx` | `4e47a7b4a7e569d05013c0c351ca7fc7d51e6d99` |
| `src/modules/salon/components/salon-page.tsx` | `6f7c5fa80895359152002053e49f36cf405ba066` |
| `src/modules/salon/lib/status.ts` | `95b06cba76bf4b573c914868d5b24c8d13852d5d` |
| `src/modules/salon/types.ts` | `3a1ecc52bf760cc1c6162f210db0d84e5444a70d` |
| `scripts/quality/pulso-consumer-baseline-gate.mjs` | `b50fc12744bc1eb913aee3756a383df81475938b` |

Un cambio posterior de commit obliga a revisar las conclusiones cuyas fuentes materiales hayan cambiado.

---

#### 9. Identidad canónica de la superficie

La identidad base es:

```text
PULSO-ROUTE-005
+
/salon
+
src/app/salon/page.tsx
+
SALON
```

Los módulos auxiliares no crean rutas adicionales.

---

#### 10. Superficie contractual del baseline

El baseline vigente identifica:

```text
PULSO-SURFACE-008
= salón, mesas, sesiones, llamados y Realtime
```

Sus fuentes obligatorias son exactamente:

```text
src/app/salon/page.tsx
src/modules/salon/components/salon-page.tsx
src/modules/salon/lib/status.ts
src/modules/salon/types.ts
```

La evaluación técnica de esa superficie exige evidencia de:

```text
site_id
zones_scoped
tables_scoped
sessions_scoped
calls_scoped
realtime_scoped
cleanup_registered
transition_valid
```

La presencia del baseline no demuestra por sí sola que cada condición esté operativa en el entorno remoto.

---

#### 11. Relación con VSCREEN-0082 y VPROC-0038

La intención canónica directamente relacionada es:

```text
VSCREEN-0082 = Mapa de salón y mesas
VPROC-0038 = servicio en mesa
```

La ruta `/salon` constituye evidencia AS-IS directa, pero permanece clasificada como materialización parcial.

Por tanto:

```text
/salon EXISTE
!=
VSCREEN-0082 COMPLETA
!=
VPROC-0038 COMPLETO
```

---

#### 12. Guard observado de la ruta

La página ejecuta `requireAppAccess` con:

```text
appId = pulso
permissionCode = pos.main
requireAppAccessPermission = true
site_id = parámetro solicitado cuando existe
```

El helper normaliza el permiso local a:

```text
pulso.pos.main
```

La ruta exige acceso a la aplicación y permiso observado antes de cargar el snapshot inicial.

---

#### 13. `site_id` solicitado y sede resuelta

La página construye su contexto con:

```text
siteId = site_id solicitado
         o sede resuelta por el guard
         o cadena vacía si ninguna existe
```

Todas las lecturas iniciales agregan una condición por `site_id`.

Regla contractual:

```text
QUERY PARAMETER site_id
!=
AUTORIDAD TERRITORIAL
```

La autoridad territorial final permanece subordinada al guard, RLS y contratos de contexto.

---

#### 14. Cardinalidad principal del universo inventariado

El universo directo de `/salon` contiene:

```text
PAGE_ROUTE = 1
PRIMARY_COMPONENT = 1
RESOURCE_FAMILIES = 4
DIRECT_READ_FAMILIES = 4
DIRECT_WRITE_FAMILIES = 1
PERSISTED_CALL_STATUSES = 4
MANUAL_REQUEST_TYPES_EXPOSED = 4
UI_TABLE_STATUSES = 6
POSTGRES_CHANGE_SUBSCRIPTIONS_DECLARED = 2
```

Las cuatro familias principales son:

```text
ZONES
TABLES
SESSIONS
SERVICE_CALLS
```

---

#### 15. Matriz de recursos directos

| Recurso lógico | API pública consumida | Relación propietaria remota | Lectura en `/salon` | Escritura en `/salon` |
| --- | --- | --- | --- | --- |
| zonas | `public.pos_zones` | `pos.pos_zones` | sí | no observada |
| mesas | `public.pos_tables` | `pos.pos_tables` | sí | no observada |
| sesiones | `public.pos_sessions` | `pos.pos_sessions` | sí | no observada |
| llamados | `public.pos_table_service_calls` | `pos.pos_table_service_calls` | sí | sí |

La API pública no cambia el ownership de las tablas `pos.*`.

---

#### 16. Compatibilidad pública y seguridad de vistas

Las cuatro identidades consumidas desde `public` existen remotamente como vistas de compatibilidad.

Las cuatro están configuradas con:

```text
security_invoker = true
```

Y son:

```text
UPDATABLE = YES
INSERTABLE = YES
```

Por tanto, el uso de `.from("pos_table_service_calls")` desde el cliente puede alcanzar la tabla propietaria mediante la vista pública y continúa sujeto al contexto del invocador y al RLS subyacente.

---

#### 17. RLS en relaciones propietarias

Las cuatro tablas propietarias `pos.*` tienen RLS habilitado.

La existencia de RLS se registra como defensa existente.

No equivale a demostrar granularidad suficiente para cada acción de salón.

---

#### 18. Política observada de zonas

`pos.pos_zones` conserva una política `ALL` para `authenticated` cuya condición observada es:

```text
has_permission('pulso.pos.main', site_id)
```

La misma condición se aplica como `USING` y `WITH CHECK`.

Consecuencia AS-IS:

```text
PERMISO GENERAL OBSERVADO
→ puede cubrir lectura y escritura de zona bajo RLS
```

La ruta actual solo lee zonas; la amplitud de la política no se adopta como diseño final.

---

#### 19. Política observada de mesas

`pos.pos_tables` conserva una política `ALL` para `authenticated` con:

```text
has_permission('pulso.pos.main', site_id)
```

La ruta actual solo lee mesas.

La administración de configuración física no debe derivarse del permiso general de uso del POS.

---

#### 20. Políticas observadas de sesiones

`pos.pos_sessions` conserva:

```text
SELECT
→ has_permission('pulso.pos.main', site_id)

ALL para escritura
→ has_permission('pulso.pos.main', site_id)
```

La ruta `/salon` solo consulta sesiones abiertas.

No se observan en esta superficie acciones de apertura, reasignación o cierre de sesión.

---

#### 21. Políticas observadas de llamados

`pos.pos_table_service_calls` usa una regla diferente.

Lectura:

```text
is_employee()
AND
can_access_site(site_id)
```

Inserción:

```text
is_employee()
AND
can_access_site(site_id)
AND
(created_by IS NULL OR created_by = auth.uid())
```

Actualización:

```text
is_employee()
AND
can_access_site(site_id)
```

Estas políticas no exigen el permiso `pulso.pos.main` observado por la ruta.

---

#### 22. Frontera de autorización expuesta por las políticas

El snapshot conserva dos niveles distintos:

```text
ENTRADA A /salon
→ pulso.pos.main

MUTACIÓN RLS DE LLAMADOS
→ empleado + acceso a sede
```

Por tanto:

```text
ROUTE_GUARD
!=
MUTATION_AUTHORITY
```

La diferencia debe permanecer explícita hasta que las tareas de permisos materialicen una política atómica por acción.

---

#### 23. Grants observados

El rol `authenticated` conserva privilegios de tabla amplios sobre las relaciones propietarias y vistas públicas inspeccionadas, incluyendo capacidades de lectura y mutación según relación.

La autorización efectiva queda, por tanto, fuertemente condicionada por RLS y por la semántica de la acción consumidora.

Un grant técnico no se considera permiso empresarial.

---

#### 24. Lectura de zonas

La superficie lee zonas con:

```text
site_id = sede actual
is_active = true
```

Y las ordena por:

```text
display_order
name
```

Las zonas inactivas no aparecen en el snapshot operativo ordinario.

---

#### 25. Lectura de mesas

La superficie lee mesas por `site_id` y conserva:

- `zone_id`;
- nombre;
- número visible;
- forma;
- capacidad;
- posición X/Y;
- rotación;
- ancho y alto;
- estado activo.

No filtra `is_active` en la consulta de mesas.

Las mesas inactivas pueden, por tanto, permanecer visibles en el snapshot y se derivan como `blocked` en UI.

---

#### 26. Lectura de sesiones

La superficie lee únicamente sesiones:

```text
site_id = sede actual
status = open
```

Conserva:

- `table_id`;
- `server_id`;
- `pax`;
- `opened_at`;
- `closed_at`;
- notas.

La consulta no recupera sesiones cerradas para el mapa operativo.

---

#### 27. Lectura de llamados

La superficie lee únicamente llamados:

```text
site_id = sede actual
status IN (pending, acknowledged)
```

Conserva además:

- zona;
- mesa;
- sesión opcional;
- dispositivo opcional;
- fuente;
- tipo de solicitud;
- prioridad;
- notas;
- creador;
- asignado;
- marcas temporales de reconocimiento, resolución y cancelación.

Los llamados `resolved` o `cancelled` no forman parte del snapshot activo ordinario.

---

#### 28. Relación zona → mesa

La vista construye un índice por `zone_id` y agrega a cada mesa:

```text
zoneName
zoneColor
```

La zona se utiliza como agrupación física visual.

No se convierte en área de autorización.

---

#### 29. Relación mesa → sesión activa

Para cada mesa, la UI elige como `activeSession` la sesión abierta más reciente según `opened_at` entre las recibidas.

Regla observada:

```text
MÚLTIPLES SESIONES ABIERTAS RECIBIDAS PARA UNA MESA
→ UI conserva la más reciente
```

Esto es una decisión de proyección de UI y no una garantía de unicidad en base de datos.

---

#### 30. Relación mesa → llamado activo

Para cada mesa, la UI elige como `activeCall` el llamado activo más reciente según `created_at`.

La bandeja lateral, en cambio, conserva todos los llamados activos recibidos.

Por tanto:

```text
ESTADO VISUAL DE UNA MESA
→ puede representar solo el llamado activo más reciente

BANDEJA DE ALERTAS
→ puede representar varios llamados activos
```

---

#### 31. Estados persistidos de llamados

El contrato remoto admite exactamente:

```text
pending
acknowledged
resolved
cancelled
```

La superficie ordinaria consulta solo los dos primeros.

El inventario no fusiona estado persistido con etiqueta visual.

---

#### 32. Tipos persistidos de solicitud

El contrato remoto admite:

```text
attention
bill
order
cancel
urgent
```

La UI tiene etiqueta para los cinco tipos, pero la creación manual actual expone solo:

```text
attention
bill
order
urgent
```

No se observa creación manual de `cancel` desde esta superficie.

---

#### 33. Fuentes persistidas de llamado

El contrato remoto admite:

```text
button
qr
manual
system
```

La acción manual de `/salon` utiliza:

```text
source_type = manual
```

La existencia de `device_id` y de otras fuentes no implica que esta vista las administre.

---

#### 34. Prioridades persistidas

El contrato admite:

```text
normal
high
critical
```

La creación manual asigna:

```text
urgent → critical
bill   → high
attention → normal
order     → normal
```

La bandeja ordena primero por prioridad y después por antigüedad ascendente.

---

#### 35. Estados visuales derivados de mesa

La UI deriva exactamente seis estados:

```text
attention_requested
bill_requested
ordering
occupied
available
blocked
```

No son un enum persistido de mesa.

Se calculan a partir de `is_active`, sesión abierta y llamado activo.

---

#### 36. Precedencia del estado visual

La derivación aplica esta precedencia:

```text
mesa inactiva
→ blocked

llamado activo bill
→ bill_requested

llamado activo order
→ ordering

otro llamado activo
→ attention_requested

sesión abierta sin llamado activo
→ occupied

ninguna condición anterior
→ available
```

Un llamado activo domina visualmente sobre el estado `occupied` de una sesión abierta.

---

#### 37. Acción observada — crear llamado manual

La UI permite crear un llamado manual para la mesa seleccionada.

El insert conserva:

```text
site_id
zone_id
table_id
session_id opcional
source_type = manual
request_type
status = pending
priority
```

No se observa escritura explícita de:

```text
created_by
assigned_to
```

---

#### 38. Atribución del creador en llamado manual

La política de inserción permite:

```text
created_by = auth.uid()
O
created_by IS NULL
```

Como la UI no envía `created_by`, el snapshot no demuestra atribución obligatoria del actor creador para el llamado manual.

La identidad técnica de sesión no sustituye esa atribución humana.

---

#### 39. Acción observada — reconocer llamado

La acción visible `Tomar` actualiza:

```text
status = acknowledged
acknowledged_at = timestamp actual
```

La mutación se realiza desde navegador sobre la vista pública actualizable.

No se observa una Server Action ni RPC nombrada para esta transición en el consumidor inspeccionado.

---

#### 40. `Tomar` no equivale a asignar responsable

La acción `Tomar` no modifica:

```text
assigned_to
```

Por tanto:

```text
ETIQUETA UI = Tomar
!=
ASIGNACIÓN PERSISTIDA DE RESPONSABLE
```

El inventario mantiene separadas atención y asignación.

---

#### 41. Acción observada — resolver llamado

La acción `Resolver` actualiza:

```text
status = resolved
resolved_at = timestamp actual
```

El botón se muestra tanto para llamados `pending` como `acknowledged`.

Por tanto, la UI permite una resolución directa de `pending` a `resolved` sin exigir previamente `acknowledged`.

---

#### 42. Predicados observados de actualización

La actualización de un llamado utiliza como predicado de consulta:

```text
id = call.id
```

No añade en la misma mutación:

```text
site_id = sede actual
estado de origen esperado
assigned_to = actor esperado
```

RLS conserva el límite de acceso a sede observado, pero no constituye por sí sola una precondición explícita de transición de estado.

---

#### 43. Acciones no observadas en `/salon`

No se observan controles runtime en esta superficie para:

- abrir una sesión de mesa;
- cerrar una sesión de mesa;
- cambiar `server_id`;
- asignar explícitamente un llamado mediante `assigned_to`;
- cancelar un llamado mediante `status = cancelled`;
- crear, editar, mover, renumerar o inactivar zonas;
- crear, editar, mover, renumerar o inactivar mesas;
- unir o dividir mesas;
- trasladar una cuenta entre mesas;
- vincular o desvincular un pedido a una sesión desde el mapa.

La existencia de columnas o relaciones para estas capacidades no las convierte en acciones de la vista actual.

---

#### 44. Sesión de mesa y pedido permanecen separados

El esquema remoto confirma que `pos.pos_sessions` puede relacionarse con pedidos mediante identidades externas a la vista de salón, incluyendo `orders.session_id` y `pos.pos_session_orders`.

Esta tarea conserva:

```text
MESA
!=
SESIÓN
!=
PEDIDO
!=
CUENTA
```

La ruta `/salon` no implementa por sí sola el lifecycle comercial completo de servicio en mesa.

---

#### 45. Dispositivo de llamado como identidad referenciada

`pos.pos_table_service_calls.device_id` referencia una identidad de dispositivo de llamado asociada a mesa.

La ruta actual no consulta ni administra directamente el catálogo de esos dispositivos.

Por tanto:

```text
DEVICE_ID PRESENTE EN LLAMADO
!=
GESTIÓN DE DISPOSITIVO EN /salon
```

La integración con dispositivos permanece en su tarea propietaria.

---

#### 46. Realtime declarado en código

El cliente declara un canal:

```text
salon-live-${siteId}
```

Y dos suscripciones `postgres_changes`:

```text
schema = public
table = pos_table_service_calls
event = *

schema = public
table = pos_sessions
event = *
```

Ante un evento intenta recargar el snapshot completo de la sede.

---

#### 47. Alcance de las suscripciones declaradas

Los descriptores de suscripción no incluyen un filtro Realtime por `site_id`.

La recarga posterior sí vuelve a consultar los cuatro recursos filtrados por la sede actual.

Por tanto:

```text
REFRESH SNAPSHOT
→ scoped por site_id

TRIGGER DE REFRESH DECLARADO
→ sin filtro site_id en el descriptor
```

La existencia del nombre de canal con `siteId` no convierte por sí sola el stream de cambios en un filtro de filas.

---

#### 48. Cleanup de Realtime

La superficie registra cleanup explícito mediante:

```text
supabase.removeChannel(channel)
```

Esto satisface la existencia técnica de una ruta de limpieza del canal.

No demuestra que la suscripción haya recibido eventos correctamente.

---

#### 49. Configuración remota de Postgres Changes

La configuración remota inspeccionada contiene la publicación:

```text
supabase_realtime
puballtables = false
```

No se observaron como miembros de esa publicación las identidades de salón consultadas:

```text
pos_zones
pos_tables
pos_sessions
pos_table_service_calls
```

Además, el código escucha las vistas del esquema `public`, mientras las relaciones propietarias son tablas del esquema `pos`.

---

#### 50. Estado AS-IS de Realtime

Con la configuración remota verificada:

```text
REALTIME_CODE_PATH = PRESENT
REALTIME_CLEANUP = PRESENT
POSTGRES_CHANGES_PUBLICATION_MEMBERSHIP = ABSENT
REALTIME_OPERATIONAL_DELIVERY = NOT_DEMONSTRATED
```

Por tanto, la existencia de `.subscribe()` no se documenta como Realtime operativo certificado.

Esta tarea no modifica la publicación.

---

#### 51. Sonido y alerta local

La UI puede emitir un tono cuando, después de una recarga disparada por Realtime, aumenta el conteo de llamados activos y el sonido está habilitado.

El sonido es feedback local.

No constituye acuse, asignación ni evento empresarial autoritativo.

---

#### 52. Refresco manual

La superficie incluye una acción `Actualizar` que vuelve a consultar el snapshot por sede.

Ese mecanismo puede recuperar estado visible aun cuando Realtime no entregue eventos, pero:

```text
REFRESCO MANUAL
!=
REALTIME OPERATIVO
```

No se infiere SLA de frescura desde la existencia del botón.

---

#### 53. Matriz de acciones y autoridad observada

| Acción o capacidad | Recurso | Caller observado | Estado AS-IS | Autoridad final |
| --- | --- | --- | --- | --- |
| leer zonas | zona | Server Component + browser refresh | protegida por sede/permiso observado | pendiente de diseño atómico |
| leer mesas | mesa | Server Component + browser refresh | protegida por sede/permiso observado | pendiente de diseño atómico |
| leer sesiones abiertas | sesión | Server Component + browser refresh | protegida por sede/permiso observado | pendiente de diseño atómico |
| leer llamados activos | llamado | Server Component + browser refresh | RLS empleado + acceso a sede | pendiente de diseño atómico |
| crear llamado manual | llamado | browser | insert directo por vista pública | pendiente de diseño atómico y actor |
| reconocer llamado | llamado | browser | update directo por id | pendiente de transición y actor |
| resolver llamado | llamado | browser | update directo por id | pendiente de transición y actor |
| asignar responsable | llamado | no observada | `assigned_to` existe, sin acción actual | pendiente |
| cancelar llamado | llamado | no observada | estado existe, sin acción actual | pendiente |
| abrir/cerrar sesión | sesión | no observada | estructura existe, sin acción actual | pendiente |
| administrar zona/mesa | configuración | no observada en `/salon` | estructuras existentes | debe permanecer administrativa |

---

#### 54. Matriz de estados y significado

| Identidad | Estado / señal | Naturaleza | Persistencia |
| --- | --- | --- | --- |
| mesa | `is_active` | configuración física | persistida |
| sesión | `open` | lifecycle de sesión | persistida |
| llamado | `pending` | pendiente de atención | persistida |
| llamado | `acknowledged` | reconocido | persistida |
| llamado | `resolved` | resuelto | persistida |
| llamado | `cancelled` | cancelado | persistida |
| mesa UI | `available` | proyección | derivada |
| mesa UI | `occupied` | proyección | derivada |
| mesa UI | `attention_requested` | proyección | derivada |
| mesa UI | `bill_requested` | proyección | derivada |
| mesa UI | `ordering` | proyección | derivada |
| mesa UI | `blocked` | proyección | derivada |

Un estado derivado no debe escribirse como si fuera el estado canónico persistido de la mesa.

---

#### 55. Matriz de hallazgos y propietarios de salida

| Hallazgo | Efecto | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `pos.main` protege ruta y varias relaciones con granularidad amplia | lectura y configuración pueden compartir autoridad excesiva | `PULSO-AUTH-006..008`, `PULSO-AUTH-014` | permisos finales separados por acción y configuración |
| llamados usan RLS `empleado + acceso a sede` | mutación puede ser más amplia que el guard de `/salon` | `PULSO-AUTH-006..008`, contratos de servidor | mutación sensible revalidada con permiso exacto |
| llamado manual no atribuye obligatoriamente `created_by` | actor humano no queda garantizado | `PULSO-AUTH-013` | actor efectivo persistido y auditable |
| `Tomar` no modifica `assigned_to` | reconocimiento y asignación están fusionados visualmente pero no en datos | `PULSO-AUTH-013`, diseño posterior de salón | semántica de asignación explícita o etiqueta corregida |
| update de llamado usa `id` sin estado de origen | transición concurrente o stale no queda protegida por predicado explícito | contratos de acciones de servidor + `PULSO-AUTH-016` | transición server-side valida recurso, sede y estado actual |
| resolución puede ocurrir desde `pending` | lifecycle no exige acuse previo | diseño posterior de autorización/salón | matriz de transiciones aprobada y aplicada |
| cancelación existe en datos sin acción de UI | lifecycle incompleto en la superficie | diseño posterior de salón | acción o decisión explícita sobre cancelación |
| apertura/cierre de sesión no existe en `/salon` | mapa no cubre lifecycle completo de mesa | diseño posterior PULSO-UX / paquete propietario | lifecycle de sesión materializado y probado |
| configuración de zona/mesa no aparece en `/salon` | separación administrativa todavía depende de otras superficies | `PULSO-AUTH-014` | configuración administrativa separada |
| suscripciones Realtime no tienen filtro de sede | eventos declarados pueden disparar recargas innecesarias si se habilitan | `PULSO-AUTH-011`, `PULSO-AUTH-016` | stream territorial probado o contrato alternativo |
| relaciones de salón no están en `supabase_realtime` | código Realtime no queda respaldado por publicación remota actual | package propietario / `PULSO-AUTH-016` | configuración publicada y evidencia de evento E2E |
| `device_id` existe sin gestión en la vista | dispositivo no equivale a actor ni permiso | `PULSO-AUTH-012` | contrato de dispositivo compartido integrado |

No queda hallazgo material del inventario sin propietario o condición de salida.

---

#### 56. Frontera de configuración administrativa

`OPS-POS-001` define que mover, renumerar, inactivar o reconfigurar una mesa es una operación gobernada de configuración.

La superficie `/salon` actual no ofrece esas mutaciones.

La política RLS amplia observada sobre zonas y mesas no debe interpretarse como decisión de exponer esa configuración al operador ordinario.

---

#### 57. Frontera de sesión operativa

Una sesión abierta puede contener `server_id`, `pax`, apertura y cierre.

La vista únicamente la proyecta.

Por tanto:

```text
VER SESIÓN ABIERTA
!=
ABRIR SESIÓN
!=
REASIGNAR MESERO
!=
CERRAR SESIÓN
```

Cada operación posterior requiere autoridad y transición propias.

---

#### 58. Frontera de asignación de llamado

El modelo distingue:

```text
created_by
assigned_to
acknowledged_at
resolved_at
```

Esas identidades no deben colapsarse.

Un usuario que reconoce un llamado no queda demostrado como `assigned_to` por la implementación actual.

---

#### 59. Frontera de cancelación

Se distinguen dos conceptos:

```text
request_type = cancel

status = cancelled
```

El primero describe una solicitud de servicio; el segundo describe el lifecycle del llamado.

No son equivalentes.

---

#### 60. Frontera de mesa inactiva

Una mesa inactiva se proyecta como `blocked`.

`OPS-POS-001` exige además que la inactivación no borre historia ni oculte trabajo abierto.

La vista de salón no materializa la administración que garantice esas precondiciones.

---

#### 61. Frontera territorial

Las lecturas explícitas están filtradas por `site_id`.

Las políticas propietarias también evalúan sede mediante `has_permission` o `can_access_site` según recurso.

Sin embargo, la autoridad final debe seguir distinguiendo:

```text
site_id solicitado
site_id resuelto
sede laboral / operativa
actor efectivo
dispositivo
permiso exacto
```

La materialización definitiva pertenece a `PULSO-AUTH-011`.

---

#### 62. Frontera de dispositivo compartido

El llamado puede registrar `device_id`, pero la vista no demuestra por sí sola:

- actor humano detrás del dispositivo;
- sesión de actor compartido;
- firma de acción;
- vigencia del dispositivo;
- revocación;
- estación autorizada.

La integración corresponde a `PULSO-AUTH-012` y `PULSO-AUTH-013`.

---

#### 63. Frontera de proceso comercial

El mapa de salón no sustituye el proceso completo de servicio en mesa.

Continúan separadas:

```text
MESA
SESIÓN
PEDIDO
PREPARACIÓN
ENTREGA
CUENTA
PAGO
CIERRE
```

`VPROC-0038` solo se considera completo cuando esas identidades y handoffs estén materializados y probados según sus propietarias.

---

#### 64. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

La cobertura vigente ya protege aislamiento territorial, segregación de acciones, lifecycle de salón, autorización de vistas y consistencia entre infraestructura y proceso.

---

#### 65. Cobertura de prueba vigente reutilizada

Cobertura relevante, reutilizada sin modificación:

- `TREQ-PULSO-005` — separación de pedido, preparación, cumplimiento, mesa, cuenta y venta;
- `TREQ-PULSO-014` — acceso protegido a las rutas de negocio PULSO;
- `TREQ-PULSO-015` — `site_id` no puede ampliar el territorio del actor;
- `TREQ-PULSO-018` — `/salon` debe limitar zonas, mesas, sesiones y llamados a la sede autorizada y separar lectura, apertura, asignación, atención, resolución, cancelación y cierre según actor y estado;
- `TREQ-PULSO-019` — parámetros de consulta no crean pantallas ni autoridad adicional;
- `TREQ-PULSO-020` — componentes y helpers no son rutas;
- `TREQ-PULSO-021` — la evidencia debe quedar ligada al snapshot inspeccionado;
- `TREQ-PULSO-024` — infraestructura existente no demuestra autorización completa ni proceso completo;
- `TREQ-PULSO-026` — un permiso observado no se adopta por inferencia como permiso final suficiente.

La enumeración es trazabilidad; no actualiza el Registro 04A.

---

#### 66. Handoff a PULSO-AUTH-004

`PULSO-AUTH-004 — Inventariar escáner` recibe la continuidad documental después de cerrar este inventario.

No hereda recursos de salón como si fueran recursos del scanner.

La frontera queda:

```text
PULSO-AUTH-003
→ inventario cerrado de PULSO-ROUTE-005
→ PULSO-AUTH-004
→ inventario de PULSO-ROUTE-001 y PULSO-ROUTE-006
```

---

#### 67. Handoff a PULSO-AUTH-006..008

Las tareas de permisos reciben como insumos:

- `pulso.pos.main` es el permiso general observado de entrada y de varias relaciones `pos`;
- los llamados tienen una política RLS distinta basada en empleado + acceso a sede;
- reconocer, resolver, asignar y cancelar deben permanecer acciones distintas;
- administración de zona/mesa no debe heredarse del permiso general sin decisión explícita.

Esta tarea no crea claves de permiso.

---

#### 68. Handoff a PULSO-AUTH-011

`PULSO-AUTH-011 — Limitar operación a sede del turno` recibe:

```text
lecturas explícitamente filtradas por site_id
+
RLS territorial existente
+
suscripciones Realtime sin filtro de site_id
```

Debe demostrar territorialidad efectiva en lectura, mutación y actualización live.

---

#### 69. Handoff a PULSO-AUTH-012

`PULSO-AUTH-012 — Integrar dispositivos POS compartidos` recibe:

- existencia de `device_id` en llamados;
- separación dispositivo ≠ mesa ≠ actor;
- ausencia de gestión de dispositivo en `/salon`.

No se asigna autoridad al dispositivo por su presencia en el evento.

---

#### 70. Handoff a PULSO-AUTH-013

`PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación` recibe:

- `created_by` opcional en el llamado manual actual;
- `assigned_to` no actualizado por `Tomar`;
- mutaciones directas desde navegador;
- necesidad de distinguir creador, asignado y actor ejecutor.

La condición de salida es atribución humana auditable de cada acción sensible.

---

#### 71. Handoff a PULSO-AUTH-014

`PULSO-AUTH-014 — Mantener configuración administrativa separada` recibe:

- zonas y mesas como configuración física;
- políticas actuales `ALL` bajo `pulso.pos.main`;
- ausencia de acciones de configuración en `/salon`;
- contrato de `OPS-POS-001` que prohíbe confundir uso operativo con administración física.

---

#### 72. Handoff a PULSO-AUTH-015

`PULSO-AUTH-015 — Migrar a paquetes de vento-shell` recibe cualquier materialización futura necesaria para mover o endurecer contratos compartidos sin alterar el inventario AS-IS aprobado.

Toda modificación VENTO de Supabase deberá quedar versionada y gobernada desde `vento-shell`.

---

#### 73. Handoff a PULSO-AUTH-016

`PULSO-AUTH-016 — Ejecutar pruebas integrales` recibe como casos mínimos:

- aislamiento de sede en los cuatro recursos;
- creación manual de llamado;
- reconocimiento;
- resolución;
- asignación separada;
- cancelación;
- apertura y cierre de sesión cuando sean materializados;
- atribución de actor;
- concurrencia y estado stale;
- configuración administrativa separada;
- Realtime territorial;
- cleanup de canal;
- fallback de refresco;
- compatibilidad con zonas y mesas definidas por `OPS-POS-001`.

---

#### 74. Drift que invalida conclusiones afectadas

Obliga a revisar este inventario cualquier cambio material en:

- archivo de página de `/salon`;
- módulo principal de salón;
- tipos o derivación de estados;
- nombres o esquema de las cuatro relaciones;
- definición de las vistas públicas;
- `security_invoker`;
- updatability de vistas;
- RLS;
- grants;
- guard o permiso observado;
- modelo `site_id`;
- mutaciones de llamados;
- lifecycle de sesiones;
- Realtime;
- publicación de Postgres Changes;
- relación con dispositivos;
- contratos de `OPS-POS-001`.

Un cambio ajeno a estas fuentes no invalida automáticamente todo el inventario.

---

#### 75. Estado de materialización inventariado

La clasificación final de la superficie es:

```text
ROUTE = MATERIALIZED
READ_MODEL = MATERIALIZED_AS_IS
CALL_MUTATIONS = PARTIAL_AS_IS
SESSION_LIFECYCLE = PARTIAL / READ_ONLY_IN_THIS_SURFACE
TABLE_CONFIGURATION = NOT_EXPOSED_IN_THIS_SURFACE
ACTOR_ATTRIBUTION = INCOMPLETE
ACTION_AUTHORIZATION = NOT_FINAL
REALTIME_CODE_PATH = PRESENT
REALTIME_REMOTE_PUBLICATION_SUPPORT = ABSENT_IN_VERIFIED_SNAPSHOT
CANONICAL_SCREEN_COVERAGE = PARTIAL
PHYSICAL_IMPLEMENTATION_AUTHORIZED_BY_THIS_TASK = NO
```

---

#### 76. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; tarea documental sin cambios físicos |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico |
| REMOTA | PASS | se verificaron `vento-shell`, `vento-pulso` y el Supabase remoto vigente: fuentes, blobs, topología, 04A, vistas públicas, tablas `pos`, RLS, grants y membresía de publicación Realtime aplicable |
| OPERATIVA | NOT_EXECUTED | no se abrió una sesión real ni se creó, reconoció o resolvió un llamado real |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida el inventario documental del snapshot, no certifica el proceso E2E.

---

#### 77. Criterios de aceptación

- [ ] `PULSO-ROUTE-005` queda identificado de forma única como `/salon`.
- [ ] Se inventarían exactamente las cuatro familias directas: zonas, mesas, sesiones y llamados.
- [ ] Se distinguen vistas públicas de tablas propietarias `pos.*`.
- [ ] Se registra `security_invoker = true` en las cuatro vistas de compatibilidad.
- [ ] Se registra que las cuatro vistas son actualizables e insertables en el snapshot remoto.
- [ ] Se registran las políticas RLS observadas sin tratarlas como diseño final.
- [ ] Se distingue el guard `pulso.pos.main` de la política de llamados basada en empleado + acceso a sede.
- [ ] Se inventarían exactamente los cuatro estados persistidos de llamado.
- [ ] Se inventarían los cinco tipos persistidos de solicitud.
- [ ] Se inventarían los cuatro tipos persistidos de fuente.
- [ ] Se inventarían las tres prioridades persistidas.
- [ ] Se inventarían exactamente los seis estados derivados de mesa.
- [ ] Se documenta la precedencia de estado visual.
- [ ] Se documenta creación manual de llamado.
- [ ] Se documenta reconocimiento de llamado.
- [ ] Se documenta resolución de llamado.
- [ ] Se documenta que `Tomar` no persiste `assigned_to`.
- [ ] Se documenta que `created_by` puede quedar nulo en la creación manual actual.
- [ ] Se documenta que resolución puede ejecutarse desde `pending`.
- [ ] Se documentan las acciones de sesión, asignación, cancelación y configuración no presentes en `/salon`.
- [ ] Se conserva mesa ≠ sesión ≠ pedido ≠ cuenta.
- [ ] Se conserva dispositivo ≠ actor.
- [ ] Se documentan las dos suscripciones Realtime declaradas y su cleanup.
- [ ] Se documenta ausencia de filtro de sede en los descriptores Realtime.
- [ ] Se documenta ausencia de membresía de las relaciones de salón en `supabase_realtime` para el snapshot remoto inspeccionado.
- [ ] Todo hallazgo material tiene propietario y condición de salida.
- [ ] No se crean ni modifican TREQ.
- [ ] No se ejecutan cambios físicos.

---

#### 78. Límites

Esta tarea no:

- crea o modifica zonas;
- crea o modifica mesas;
- abre o cierra sesiones;
- crea datos de operación;
- modifica llamados reales;
- define el permiso final de cajero;
- define el permiso final de supervisor;
- define permisos de cierre o anulación;
- cambia RLS;
- cambia grants;
- cambia vistas públicas;
- cambia el esquema `pos`;
- habilita Realtime;
- modifica publicaciones PostgreSQL;
- crea Server Actions o RPC;
- diseña el ciclo completo de servicio en mesa;
- materializa asignación de mesero;
- materializa cancelación de llamado;
- materializa unión, división o traslado de mesas;
- implementa dispositivos compartidos;
- implementa actor efectivo;
- modifica Supabase remoto;
- ejecuta migraciones;
- implementa `PULSO-AUTH-004` ni tareas posteriores;
- modifica el Registro 04A.

---

#### 79. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-002 — Inventariar órdenes`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-003 — Inventariar salón`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-004 — Inventariar escáner`
### ✅ PULSO-AUTH-004 — Inventariar escáner

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-003 — Inventariar salón
**Tarea siguiente:** PULSO-AUTH-005 — Inventariar importaciones
**Tipo de tarea:** inventario documental cerrado de la superficie AS-IS de escáner e identificación expuesta por `PULSO-ROUTE-001` (`/`) y `PULSO-ROUTE-006` (`/scanner`), reconciliando identidad de cliente, redención, acumulación de puntos, proyección visible, acciones de servidor, territorialidad, dispositivo compartido, atribución de actor, idempotencia, ownership de PASS y código dormante, sin fusionar las dos rutas, definir permisos finales ni modificar código, datos o Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, `vento-pass`, rutas, componentes, Server Actions, RPC, tablas, RLS, funciones, migraciones, Supabase, permisos, datos, contratos generados, packages, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma exhaustiva, estable y verificable la superficie actual de escáner de PULSO para que las tareas posteriores de autorización y fidelización trabajen sobre un universo técnico único, sin convertir un componente existente, un permiso general, una proyección de cliente o una función de PASS en autoridad implícita.

La tarea debe dejar resuelto:

- qué rutas exponen la experiencia;
- qué componente principal comparten;
- qué capacidades runtime están realmente montadas;
- qué código relacionado existe pero está dormante;
- qué formatos de identificación se aceptan;
- qué datos de cliente se proyectan;
- qué acciones identifican, redimen y otorgan puntos;
- qué guard y permiso se observan en cada frontera;
- qué controles territoriales e idempotentes existen;
- cómo se comporta la firma de actor en dispositivo compartido;
- qué ownership permanece en PASS;
- qué gaps se transfieren a las tareas propietarias posteriores.

---

#### 2. Handoff recibido de PULSO-AUTH-003

`PULSO-AUTH-003` entrega la continuidad documental después de cerrar `PULSO-ROUTE-005`.

El handoff exacto es:

```text
PULSO-AUTH-003
→ inventario cerrado de PULSO-ROUTE-005
→ PULSO-AUTH-004
→ inventario de PULSO-ROUTE-001 y PULSO-ROUTE-006
```

No se heredan zonas, mesas, sesiones ni llamados como recursos del escáner.

---

#### 3. Handoff específico recibido de PULSO-AUTH-001

`PULSO-AUTH-001` entrega exactamente:

```text
PULSO-ROUTE-001
+
PULSO-ROUTE-006
→ POS_SCANNER
→ mismo ScannerPage
→ dos identidades de ruta
```

La tarea debe inventariar capacidades sin fusionar rutas y sin transferir ownership de fidelización desde PASS hacia PULSO.

---

#### 4. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el inventario se define una sola vez;
- no existe instancia física propia;
- no se cambia código;
- no se cambia Supabase;
- no se ejecutan acumulaciones ni redenciones;
- no se crea un permiso;
- no se habilita cámara;
- no se fusionan rutas;
- no se implementan tareas posteriores.

---

#### 5. Snapshot técnico verificado

Repositorio consumidor inspeccionado:

```text
repository = vento-group-sas/vento-pulso
branch = main
HEAD = 715b5683db05caa010d725679b5ada4705a6da6e
framework = Next.js App Router
```

El inventario se ancla a ese snapshot y a los blobs fuente explicitados en esta tarea.

---

#### 6. Cardinalidad de rutas del escáner

La superficie usa exactamente dos identidades de página:

| ID | Patrón | Archivo fuente | Componente principal |
| --- | --- | --- | --- |
| `PULSO-ROUTE-001` | `/` | `src/app/page.tsx` | `ScannerPage` |
| `PULSO-ROUTE-006` | `/scanner` | `src/app/scanner/page.tsx` | `ScannerPage` |

Conteo:

```text
SCANNER_PAGE_ROUTES = 2
UNIQUE_ROUTE_PATTERNS = 2
UNIQUE_PAGE_FILES = 2
SHARED_MAIN_COMPONENT = 1
```

---

#### 7. Dos rutas no equivalen a una sola identidad

La relación observada es:

```text
PULSO-ROUTE-001
+
PULSO-ROUTE-006
→ mismo ScannerPage
→ identidades URL distintas
```

Compartir componente no autoriza:

- retirar `/`;
- retirar `/scanner`;
- declarar alias;
- crear redirect;
- fusionar métricas;
- asumir que una es canónica y la otra legacy.

La clasificación de duplicidad o consolidación permanece fuera de esta tarea.

---

#### 8. Guard de ambas rutas

Las dos páginas ejecutan `requireAppAccess` con:

```text
appId = pulso
permissionCode = pos.main
requireAppAccessPermission = true
site_id = parámetro de consulta cuando existe
```

También transmiten al componente si la sesión operacional corresponde a dispositivo compartido.

La entrada protegida a la vista no demuestra autoridad final para cada acción interna.

---

#### 9. Contexto territorial de entrada

Cada ruta resuelve `site_id` mediante el guard y construye su propio `returnTo`.

La frontera obligatoria permanece:

```text
site_id solicitado
!=
autoridad territorial
```

El contexto efectivo debe permanecer subordinado a sesión, asignación operativa, sede permitida y controles server-side.

---

#### 10. Baseline técnico PULSO

El baseline vigente separa:

```text
PULSO-SURFACE-004
= escáner e identificación de cliente

PULSO-SURFACE-005
= loyalty, redención y acreditación
```

La existencia de ambas superficies relacionadas no fusiona responsabilidades empresariales.

---

#### 11. Archivos runtime principales

La cadena runtime observada utiliza:

```text
src/app/page.tsx
src/app/scanner/page.tsx
src/modules/pos/components/scanner-page.tsx
src/modules/pos/components/qr-scanner.tsx
src/modules/pos/actions/identify-client.action.ts
src/modules/pos/actions/validate-redemption.action.ts
src/modules/pos/actions/award-loyalty.action.ts
src/modules/pos/api/redemption.api.ts
src/modules/pos/api/loyalty-award.api.ts
src/lib/auth/shared-device-signature.ts
```

Cada elemento conserva su identidad técnica.

---

#### 12. Dos modos runtime

`QRScanner` expone exactamente dos modos:

```text
identification
redemption
```

Son modos de una misma superficie, no rutas adicionales.

---

#### 13. Entrada operativa actual

La interfaz runtime permite:

- pegar un código;
- recibir texto desde un lector USB que actúe como entrada de teclado;
- procesar con botón;
- procesar con `Enter`.

La UI actual no monta un flujo de cámara.

---

#### 14. `CameraQRScanner` existe pero está dormante

Existe:

```text
src/modules/pos/components/camera-qr-scanner.tsx
blob = 005cc7cd3aa78f2c79e9cf3deb027ce36862fe7d
```

Sin embargo, la búsqueda de consumidores del símbolo `CameraQRScanner` solo localiza su propio archivo.

Por tanto:

```text
CAMERA_COMPONENT_SOURCE = PRESENT
CAMERA_COMPONENT_RUNTIME = NOT_MOUNTED
```

No se declara cámara disponible en la superficie actual.

---

#### 15. `decodeQRCode` existe pero no participa en el flujo montado

Existe:

```text
src/modules/pos/api/qr-scanner.api.ts
blob = 46eb95e776efdea8056fce2f003581843f19b919
```

El helper `decodeQRCode` no tiene consumidores localizados fuera de su propio archivo.

Por tanto:

```text
QR_DECODE_HELPER_SOURCE = PRESENT
QR_DECODE_HELPER_RUNTIME = NOT_OBSERVED
```

La existencia de ese helper no agrega otra capacidad runtime.

---

#### 16. Formatos de identificación aceptados por la acción activa

`identifyClientAction` acepta actualmente:

```text
VENTO:<uuid>
UUID
JSON con user_id
JSON con id
```

Todos los candidatos se reducen a un UUID válido antes de consultar cliente.

La UI visible comunica `VENTO:<uuid> o UUID`, pero la acción de servidor acepta además JSON.

---

#### 17. Acción de identificación

La frontera activa es:

```text
QRScanner
→ identifyClientAction(rawCode, siteId)
```

La acción:

1. normaliza el identificador;
2. exige usuario autenticado;
3. evalúa `has_permission("pulso.pos.main", siteId, null)`;
4. consulta el usuario identificado;
5. devuelve una proyección limitada.

No muta puntos ni redenciones.

---

#### 18. Consulta de cliente y cliente administrativo

Después del control explícito `pulso.pos.main`, `identifyClientAction` utiliza un cliente administrativo cuando están disponibles las variables de servidor requeridas.

La consulta se limita a:

```text
id
full_name
email
loyalty_points
```

El uso de cliente administrativo no convierte esos campos en propiedad de PULSO ni elimina la necesidad de autorización previa.

---

#### 19. Proyección de cliente

La proyección runtime es:

```text
user_id
full_name
email
loyalty_points
```

`ScannerPage` y `QRScanner` pueden mostrar:

- nombre;
- correo;
- saldo de puntos.

Esta proyección es evidencia AS-IS, no aprobación automática de minimización final.

---

#### 20. Identificación no equivale a fidelización

La frontera es:

```text
IDENTIFICAR CLIENTE
!=
OTORGAR PUNTOS
!=
VALIDAR REDENCIÓN
```

Una identificación exitosa solo establece el cliente seleccionado para la operación local.

---

#### 21. Flujo de acumulación observado

El flujo activo es:

```text
cliente identificado
→ monto COP
→ estimación local de puntos
→ referencia externa generada
→ awardLoyaltyPointsAction
→ award_loyalty_points_external
→ grant_loyalty_points
```

La UI calcula:

```text
estimatedPoints = floor(amountCop / 1000)
```

La estimación visible no es el resultado autoritativo.

---

#### 22. Referencia externa generada por la UI

La referencia actual se construye con:

```text
siteId truncado
+
userId truncado
+
Date.now()
+
Math.random()
```

y produce un valor con prefijo `pulso-`.

Por tanto:

```text
CURRENT_EXTERNAL_REF = UI_GENERATED
CURRENT_EXTERNAL_REF = NOT_STABLE_FOR_RETRY_OF_SAME_BUSINESS_FACT
```

La tarea registra el hecho; no lo corrige.

---

#### 23. Idempotencia remota observada

`award_loyalty_points_external` inserta en `public.loyalty_external_sales`.

El snapshot remoto conserva un índice único sobre:

```text
site_id
+
lower(btrim(external_ref))
```

Una repetición con la misma referencia puede converger en `duplicate`.

Sin embargo, una nueva referencia generada por timestamp y aleatoriedad no representa por sí sola el mismo hecho empresarial.

---

#### 24. Autorización de acumulación

`awardLoyaltyPointsAction` vuelve a ejecutar `requireAppAccess` con:

```text
appId = pulso
siteId = input.siteId
permissionCode = pos.main
```

La RPC remota `award_loyalty_points_external` vuelve a exigir:

```text
is_active_staff()
has_permission('pulso.pos.main', p_site_id, null)
```

Esto demuestra controles AS-IS duplicados en aplicación y base de datos, pero no prueba que `pos.main` sea la granularidad final correcta.

---

#### 25. Atomicidad de ledger y saldo

La función remota termina invocando `pass.grant_loyalty_points`.

Ese contrato:

- bloquea la fila de usuario;
- inserta `pass.loyalty_transactions`;
- actualiza `public.users.loyalty_points`;
- devuelve transacción y nuevo saldo.

La operación ocurre dentro de una función PostgreSQL, por lo que ledger y proyección se ejecutan dentro de la misma transacción de base de datos.

---

#### 26. Ownership de acumulación

Aunque PULSO origina la intención operacional:

```text
PULSO
→ solicita acumulación

PASS
→ conserva semántica de fidelización
→ ledger
→ saldo proyectado
```

La existencia de botones y Server Actions en PULSO no transfiere ownership del ledger.

---

#### 27. Flujo de redención observado

El flujo activo es:

```text
QRScanner
→ processRedemptionAction
→ validateRedemption
→ requireAppAccess
→ firma de actor cuando aplica
→ markRedemptionAsUsed
→ attachSharedDeviceActionSignatureTarget cuando aplica
```

La UI actual invoca `processRedemptionAction` sin `orderId`.

---

#### 28. Orden de validación en redención

`processRedemptionAction` ejecuta primero:

```text
validateRedemption(qrCode)
```

y después:

```text
requireAppAccess(...)
```

Por tanto, el lookup preliminar de redención ocurre antes del guard PULSO de la acción.

Este orden es evidencia AS-IS y debe revisarse en la materialización propietaria; no se redefine desde el inventario.

---

#### 29. Validación preliminar de redención

`validateRedemption` consulta:

```text
pass.loyalty_redemptions
```

por `qr_code` y valida explícitamente:

```text
status = pending
```

Distingue al menos:

- no encontrado;
- ya validado;
- cancelado;
- no disponible;
- pendiente.

---

#### 30. Vigencia temporal de redención

El esquema remoto inspeccionado de `pass.loyalty_redemptions` contiene:

```text
id
user_id
order_id
reward_id
points_spent
qr_code
status
metadata
created_at
validated_at
site_id
```

No se observó una columna dedicada de expiración en esa relación.

El código actual de `validateRedemption` tampoco ejecuta una comprobación temporal explícita de expiración.

La tarea registra el estado; no redefine el contrato de vigencia.

---

#### 31. Asociación a pedido

`markRedemptionAsUsed` acepta `orderId` opcional y persiste:

```text
order_id = orderId || null
```

La superficie `QRScanner` actual llama la redención con `orderId = undefined`.

Por tanto:

```text
CURRENT_SCANNER_REDEMPTION_ORDER_LINK = OPTIONAL / NOT_SUPPLIED_BY_THIS_UI
```

---

#### 32. Transición de redención

La mutación ejecuta:

```text
status = validated
validated_at = now
```

con predicados:

```text
id = redemptionId
status = pending
```

y exige que una fila sea devuelta.

Esto aporta una barrera AS-IS contra validar dos veces la misma fila mediante la misma transición de estado.

---

#### 33. RLS territorial específica de redención

El snapshot remoto contiene políticas específicas de cajero para selección y validación que relacionan:

- trabajador activo;
- roles permitidos;
- recompensa;
- sede de la recompensa;
- sede base o asignación activa mediante `employee_sites`.

Esas políticas son evidencia territorial relevante.

---

#### 34. RLS general de staff coexistente

El mismo snapshot contiene además políticas permisivas:

```text
staff_select_all_redemptions
→ is_active_staff()

staff_validate_redemptions
→ is_active_staff() AND status = pending
```

y `is_active_staff()` resuelve actualmente a `is_employee()`.

Por coexistir como políticas `PERMISSIVE`, constituyen una vía adicional a las políticas territoriales específicas.

Por tanto no puede concluirse que la RLS actual de redención esté limitada exclusivamente por sede.

---

#### 35. `pos.main` no es permiso final suficiente

Se observa `pulso.pos.main` en:

- entrada a `/`;
- entrada a `/scanner`;
- identificación;
- acumulación;
- procesamiento de redención después de la validación preliminar.

La tarea conserva:

```text
PERMISO OBSERVADO
!=
PERMISO FINAL APROBADO POR ACCIÓN
```

---

#### 36. Dispositivo compartido en las rutas

Las dos rutas transmiten:

```text
requiresSharedDeviceActorSignature
= operationalSession.isSharedDevice
```

El campo PIN solo aparece cuando esa condición es verdadera.

---

#### 37. Acciones que solicitan firma de actor

Se observan dos action codes específicos:

```text
pos.loyalty.award_points
pos.loyalty.validate_redemption
```

Ambas operaciones llaman `requireSharedDeviceActorSignature` antes del efecto sensible cuando la sesión es compartida.

---

#### 38. Contrato de firma desde el consumidor

El helper de PULSO llama:

```text
sign_shared_device_action
```

con:

```text
p_actor_employee_id = null
p_actor_pin = PIN ingresado
p_app_code = pulso
p_action_code = acción específica
```

La intención es resolver al actor humano desde el PIN.

---

#### 39. Estado remoto de resolución de actor

La función remota `sign_shared_device_action` puede resolver internamente `v_actor` desde el PIN cuando `p_actor_employee_id` es nulo.

Sin embargo, después de resolverlo, el snapshot remoto utiliza nuevamente el parámetro original `p_actor_employee_id` al invocar:

```text
current_actor_shift_for_shared_device_v1(...)
shared_device_actor_is_allowed_v1(...)
```

en vez de utilizar explícitamente `v_actor.id`.

Como el consumidor envía `p_actor_employee_id = null`, la evidencia estática indica una ruta fail-closed en esas comprobaciones posteriores.

La tarea no corrige la función.

---

#### 40. Target de firma

Para acumulación, la firma se crea inicialmente sin target definitivo y, después de éxito, intenta adjuntarse al `transaction_id` de loyalty.

Para redención, la firma se crea apuntando desde el inicio a:

```text
pass.loyalty_redemptions
+
redemption.id
```

La atribución de actor debe permanecer correlacionada con el efecto confirmado.

---

#### 41. Estado del PIN en cliente

`sharedActorPin` vive en estado React del componente.

Se limpia después de una acumulación exitosa.

No se observó limpieza explícita del PIN en `handleModeChange`, ni después de una redención exitosa, ni en todos los caminos de error.

La tarea registra el gap de higiene de estado sin modificar la UI.

---

#### 42. Limpieza de estado al cambiar modo

`handleModeChange` limpia:

```text
qrInput
amountCop
message
error
```

y limpia el cliente cuando se cambia hacia un modo distinto de `identification`.

No limpia explícitamente `sharedActorPin`.

---

#### 43. Feedback runtime

La superficie distingue visualmente:

- procesamiento;
- éxito;
- error;
- duplicado en acumulación.

Los mensajes se derivan de resultados de las acciones.

El inventario no certifica todavía que todos los estados de conflicto, denegación, replay o resultado desconocido estén diferenciados.

---

#### 44. Matriz de capacidades runtime

| Capacidad | Runtime observado | Frontera principal |
| --- | --- | --- |
| abrir `/` | sí | `requireAppAccess` |
| abrir `/scanner` | sí | `requireAppAccess` |
| identificar cliente | sí | `identifyClientAction` |
| mostrar nombre/correo/puntos | sí | proyección local |
| estimar puntos | sí | cálculo de UI |
| otorgar puntos | sí | Server Action + RPC |
| validar redención | sí | Server Action + RLS |
| firmar actor compartido | código presente; defecto AS-IS observado | helper + RPC |
| cámara QR | no montada | código dormante |
| `decodeQRCode` auxiliar | no consumido | código dormante |

---

#### 45. Matriz de autoridad observada

| Acción | Guard de aplicación | Control remoto observado | Estado contractual |
| --- | --- | --- | --- |
| abrir rutas | `pulso` + `pos.main` + sede | sesión/contexto | observado, no final |
| identificar cliente | auth + `pulso.pos.main` por sede | consulta posterior | observado, no final |
| otorgar puntos | `requireAppAccess` + `pos.main` | `is_active_staff` + `has_permission` + idempotencia por referencia | observado, no final |
| validar redención | `requireAppAccess` después del lookup | RLS + estado `pending` | observado, no final |
| firma compartida | condición de dispositivo compartido | RPC de firma | implementación AS-IS con hallazgo |
| mostrar proyección | resultado de identificación | no es mutación | proyección pendiente de minimización final |

---

#### 46. Frontera PULSO ↔ PASS

Se conserva:

```text
PULSO
→ experiencia operativa
→ identificación y originación de intención

PASS
→ identidad comercial/fidelización
→ recompensas
→ redenciones
→ ledger de puntos
→ reglas de fidelización
```

PULSO no adquiere ownership de PASS por consumir sus contratos.

---

#### 47. Frontera de dispositivo

Se mantienen separadas:

```text
PRINCIPAL TÉCNICO
ACTOR HUMANO
DISPOSITIVO COMPARTIDO
SEDE
TURNO
PERMISO
CLIENTE
EFECTO DE LOYALTY
```

El PIN no sustituye ninguna de esas identidades.

---

#### 48. Frontera de identidad del cliente

La superficie opera con `user_id`, pero no autoriza inferir:

- que toda persona cliente tenga cuenta autenticada;
- que correo identifique inequívocamente a la persona;
- que saldo visible sea ledger;
- que una cuenta cliente sea actor laboral.

Esas identidades permanecen separadas.

---

#### 49. Frontera de saldo

La UI muestra `loyalty_points`.

Se conserva:

```text
SALDO PROYECTADO
!=
LEDGER
```

El ledger permanece en PASS y debe ser la fuente reconciliable del efecto.

---

#### 50. Frontera de cámara

La existencia del archivo de cámara no autoriza:

- solicitar permiso de cámara;
- declarar soporte físico;
- inventariar una tercera ruta;
- eliminar fallback manual;
- declarar lector de cámara certificado.

Toda activación futura requiere su propia materialización y prueba.

---

#### 51. Frontera de rutas

`/` y `/scanner` deben conservarse como identidades distintas mientras la propietaria transversal de clasificación no apruebe otra relación.

Esta tarea no decide:

```text
DUPLICATE
ALIAS
REDIRECT
PRIMARY
LEGACY
```

---

#### 52. Matriz de hallazgos y propietarios de salida

| Hallazgo AS-IS | Efecto | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `/` y `/scanner` comparten `ScannerPage` | relación no clasificada | `AUTH-UI-026..029` | decisión explícita de clasificación/transición |
| `pos.main` protege acciones distintas | granularidad final no demostrada | `PULSO-AUTH-006..010` | permisos exactos por acción |
| la acción de identificación acepta JSON además del formato visible Vento ID/UUID | superficie AS-IS más amplia que el formato canónico esperado | `PULSO-AUTH-015/016` + contratos `AUTH-SRV` | formato de identidad server-side reconciliado y probado |
| identificación usa cliente administrativo después del guard | bypass de RLS deliberado en lectura puntual | `PULSO-AUTH-015` + contratos `AUTH-SRV` | contrato compartido endurecido y probado |
| referencia externa usa timestamp/aleatoriedad | retry puede generar identidad distinta | `PULSO-AUTH-009` + `PASS-INT-001/005` | idempotencia empresarial estable |
| lookup de redención precede `requireAppAccess` | orden de autorización no ideal | `PULSO-AUTH-010` + contratos `AUTH-SRV` | autorización y validación ordenadas server-side |
| la relación de redención no expone expiración dedicada y el código no la valida | vigencia temporal no demostrada | `PULSO-AUTH-010` + owner PASS | contrato de vigencia y rechazo de expirados materializado |
| políticas `staff_*` amplían RLS de redención | sede no es la única vía RLS | `PULSO-AUTH-010` + owner PASS/Supabase | RLS y contrato de redención reconciliados |
| firma compartida usa después `p_actor_employee_id` nulo | firma aparece fail-closed | `PULSO-AUTH-012/013` | actor efectivo y firma ejecutables y probados |
| PIN no se limpia en todos los caminos | secreto efímero puede persistir en estado cliente | `PULSO-AUTH-012/013` | limpieza y manejo seguro demostrados |
| `CameraQRScanner` no está montado | código dormante | `AUTH-UI-026..029` + experiencia propietaria | montaje explícito + permisos + pruebas |
| `decodeQRCode` no tiene consumidor | helper dormante | `PULSO-AUTH-015` | reutilización gobernada o retiro explícito |

No queda hallazgo material sin propietario y condición de salida.

---

#### 53. Handoff a PULSO-AUTH-005

`PULSO-AUTH-005 — Inventariar importaciones` recibe la continuidad documental después de cerrar este inventario.

La frontera es:

```text
PULSO-AUTH-004
→ inventario cerrado de PULSO-ROUTE-001 y PULSO-ROUTE-006
→ PULSO-AUTH-005
→ inventario de PULSO-ROUTE-004
```

No transfiere capacidades de scanner como capacidades de importación.

---

#### 54. Handoff a PULSO-AUTH-006..008

Las tareas de permisos reciben:

- `pos.main` como permiso observado de entrada;
- identificación, acumulación y redención como acciones diferentes;
- necesidad de separar visibilidad, lectura y mutación;
- necesidad de preservar roles y excepciones sin inferir autoridad desde UI.

Esta tarea no crea claves de permiso.

---

#### 55. Handoff a PULSO-AUTH-009

`PULSO-AUTH-009 — Proteger acumulación de puntos` recibe:

- cálculo local de puntos como estimación;
- `awardLoyaltyPointsAction`;
- `award_loyalty_points_external`;
- ledger PASS;
- índice único por sede + referencia;
- referencia actual generada con timestamp/aleatoriedad;
- firma de actor compartido;
- vínculo de transacción posterior al efecto.

La condición de salida es acumulación autorizada, territorial, atómica, idempotente y atribuible.

---

#### 56. Handoff a PULSO-AUTH-010

`PULSO-AUTH-010 — Proteger redenciones` recibe:

- lookup de código;
- estado `pending`;
- transición a `validated`;
- `orderId` opcional y no enviado por la UI actual;
- guard PULSO posterior a la validación preliminar;
- políticas RLS territoriales específicas;
- políticas permisivas generales de staff coexistentes;
- firma de actor compartido.

La condición de salida es una redención fail-closed, territorial, atómica, idempotente y atribuible.

---

#### 57. Handoff a PULSO-AUTH-011

`PULSO-AUTH-011 — Limitar operación a sede del turno` recibe:

- `site_id` de ruta;
- `siteId` de identificación;
- `siteId` de acumulación;
- políticas de redención relacionadas con recompensa y sede;
- necesidad de impedir que parámetros o payload cliente amplíen territorio.

---

#### 58. Handoff a PULSO-AUTH-012

`PULSO-AUTH-012 — Integrar dispositivos POS compartidos` recibe:

- `operationalSession.isSharedDevice`;
- visibilidad condicional del PIN;
- helper de firma;
- RPC `sign_shared_device_action`;
- defecto AS-IS entre actor resuelto y parámetro nulo usado posteriormente;
- attachment posterior del target.

---

#### 59. Handoff a PULSO-AUTH-013

`PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación` recibe:

- `auth.uid()` como principal técnico;
- actor humano resuelto por PIN en dispositivo compartido;
- `awarded_by` del flujo de acumulación;
- metadata de actor/firma;
- necesidad de atribuir redención y acumulación al trabajador efectivo;
- defecto AS-IS de resolución posterior del actor.

---

#### 60. Handoff a PULSO-AUTH-015

`PULSO-AUTH-015 — Migrar a paquetes de vento-shell` recibe cualquier materialización futura necesaria para:

- permisos atómicos;
- wrappers compartidos;
- endurecimiento de RPC;
- RLS;
- idempotencia;
- firma de actor;
- retiro o adopción de helpers dormantes.

Toda modificación VENTO de Supabase deberá permanecer versionada y gobernada desde `vento-shell`.

---

#### 61. Handoff a PULSO-AUTH-016

`PULSO-AUTH-016 — Ejecutar pruebas integrales` recibe como casos mínimos:

- acceso directo a `/` y `/scanner`;
- aislamiento territorial por `site_id`;
- identificación válida e inválida;
- proyección mínima;
- retry de acumulación;
- duplicado con misma referencia;
- mismo hecho con referencia distinta;
- redención pendiente;
- redención ya validada;
- redención cancelada;
- redención de otra sede;
- concurrencia de redención;
- dispositivo compartido;
- PIN inválido;
- actor sin turno permitido;
- limpieza de PIN;
- ausencia de cámara runtime;
- preservación de dos identidades de ruta.

---

#### 62. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

La cobertura vigente ya protege identidad de rutas, autorización del scanner, proyección de cliente, idempotencia de acumulación, redención, firma de actor, secreto efímero, código de cámara dormante y fronteras PULSO/PASS.

---

#### 63. Cobertura de prueba vigente reutilizada

Cobertura relevante, reutilizada sin modificación:

- `TREQ-PULSO-003` — una pieza del prototipo no se adopta por su sola existencia;
- `TREQ-PULSO-008` — universo cerrado de rutas PULSO;
- `TREQ-PULSO-009` — identidad estable de ruta, patrón y archivo;
- `TREQ-PULSO-011` — `/` y `/scanner` permanecen distintas hasta decisión explícita;
- `TREQ-PULSO-014` — acceso protegido a las rutas de negocio;
- `TREQ-PULSO-015` — `site_id` no amplía territorio;
- `TREQ-PULSO-020` — componentes, acciones y helpers no son rutas;
- `TREQ-PULSO-021` — evidencia ligada al snapshot;
- `TREQ-PULSO-024` — infraestructura existente no demuestra autorización completa;
- `TREQ-PULSO-026` — permiso observado separado de suficiencia contractual;
- `TREQ-PULSO-027` — fronteras con PASS y otros dominios;
- `TREQ-PASS-008` — fidelización mediante contratos server-side autorizados, atómicos e idempotentes;
- `TREQ-PASS-022` — `/scanner` exige permisos exactos por acción;
- `TREQ-PASS-023` — identificación canónica y fail-closed;
- `TREQ-PASS-024` — proyección mínima de cliente;
- `TREQ-PASS-025` — acumulación autorizada, territorial, atómica e idempotente;
- `TREQ-PASS-026` — referencia estable no basada únicamente en tiempo/azar/UI;
- `TREQ-PASS-027` — redención territorial, atómica e idempotente;
- `TREQ-PASS-028` — identificación y redención como modos de una sola ruta;
- `TREQ-PASS-029` — firma de trabajador real en dispositivo compartido;
- `TREQ-PASS-030` — PIN efímero y protegido;
- `TREQ-PASS-031` — cámara dormante hasta montaje y certificación;
- `TREQ-PASS-032` — feedback ligado a resultado confirmado.

La enumeración es trazabilidad; no actualiza el Registro 04A.

---

#### 64. Huella fuente verificada

| Archivo | Git blob |
| --- | --- |
| `src/app/page.tsx` | `40431b2e8d160c9f1af81e870e0e41b401b87018` |
| `src/app/scanner/page.tsx` | `ace214820e9aaa93a4524731202924719d743ee6` |
| `src/modules/pos/components/scanner-page.tsx` | `539e0aa6bcfdcc2cd7e806f9ce25e61e9e5b9a96` |
| `src/modules/pos/components/qr-scanner.tsx` | `345b624ed26ccd7257f700c2faaa430223b5ff55` |
| `src/modules/pos/components/camera-qr-scanner.tsx` | `005cc7cd3aa78f2c79e9cf3deb027ce36862fe7d` |
| `src/modules/pos/actions/identify-client.action.ts` | `2ee9d3c8957cc78a802ac332a242d51ecfe2a158` |
| `src/modules/pos/actions/validate-redemption.action.ts` | `510f29d98747ff063876f3c5a14cd183f7faac9c` |
| `src/modules/pos/actions/award-loyalty.action.ts` | `77a968387359868fb71209c434fdf83146916b2a` |
| `src/modules/pos/api/qr-scanner.api.ts` | `46eb95e776efdea8056fce2f003581843f19b919` |
| `src/modules/pos/api/redemption.api.ts` | `d4ea3e444b680b14ec39afe4a803e9fa3141c07c` |
| `src/modules/pos/api/loyalty-award.api.ts` | `3e69797c355fa637135fefd0d0366825f019b82d` |
| `src/lib/auth/shared-device-signature.ts` | `89610936608eaa667a79c7739f72e968397d211c` |
| `scripts/quality/pulso-consumer-baseline-gate.mjs` | `b50fc12744bc1eb913aee3756a383df81475938b` |

---

#### 65. Drift que invalida conclusiones afectadas

Obliga a revisar este inventario cualquier cambio material en:

- `/` o `/scanner`;
- `ScannerPage`;
- `QRScanner`;
- montaje de cámara;
- consumidores de `decodeQRCode`;
- formatos de identificación;
- proyección de cliente;
- `pos.main`;
- `site_id`;
- Server Actions de identificación, puntos o redención;
- RPC de fidelización;
- RLS de `users` o `loyalty_redemptions`;
- esquema de redenciones;
- referencia externa;
- ledger;
- firma de dispositivo compartido;
- lógica de actor efectivo;
- ownership PULSO/PASS.

Un commit distinto no invalida automáticamente el inventario si esas fuentes permanecen materialmente iguales.

---

#### 66. Estado de materialización inventariado

La clasificación final es:

```text
ROOT_SCANNER_ROUTE = MATERIALIZED
SCANNER_ROUTE = MATERIALIZED
SHARED_SCANNER_COMPONENT = MATERIALIZED
IDENTIFICATION = MATERIALIZED_AS_IS
CLIENT_PROJECTION = MATERIALIZED_AS_IS
LOYALTY_AWARD = MATERIALIZED_AS_IS
REDEMPTION = MATERIALIZED_AS_IS
EXACT_ACTION_PERMISSIONS = NOT_FINAL
BUSINESS_IDEMPOTENCY_KEY = NOT_FINAL
SHARED_DEVICE_SIGNATURE = CODE_PRESENT_WITH_AS_IS_BLOCKER
CAMERA_RUNTIME = NOT_MOUNTED
QR_DECODE_HELPER_RUNTIME = NOT_OBSERVED
PASS_OWNERSHIP = PRESERVED
PHYSICAL_IMPLEMENTATION_AUTHORIZED_BY_THIS_TASK = NO
```

---

#### 67. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; tarea documental sin cambios físicos |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico |
| REMOTA | PASS | se verificaron `vento-shell`, `vento-pulso` y el Supabase remoto vigente: continuidad, topología, 04A, rutas, componentes, acciones, blobs, RLS, RPC, índices e identidad de dispositivo compartido aplicables |
| OPERATIVA | NOT_EXECUTED | no se identificó un cliente real, no se otorgaron puntos, no se validó una redención y no se probó hardware |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida el inventario documental del snapshot; no certifica el flujo E2E.

---

#### 68. Criterios de aceptación

- [ ] Se inventarían exactamente dos identidades de ruta para el escáner.
- [ ] `/` y `/scanner` permanecen distintas.
- [ ] Ambas rutas conservan `ScannerPage` como componente principal.
- [ ] Se registra `pos.main` únicamente como permiso observado.
- [ ] Se registran exactamente dos modos runtime: identificación y redención.
- [ ] Se inventaría la identificación por Vento ID/UUID y la aceptación adicional de JSON por la acción actual.
- [ ] Se inventaría la proyección `user_id/full_name/email/loyalty_points`.
- [ ] Se distingue identificación de acumulación y redención.
- [ ] Se documenta el cálculo local de puntos como estimación.
- [ ] Se documenta la referencia externa generada con timestamp y aleatoriedad.
- [ ] Se documenta el índice único remoto por sede + referencia.
- [ ] Se documenta el contrato server-side de acumulación.
- [ ] Se conserva ownership de ledger en PASS.
- [ ] Se documenta el orden actual lookup de redención → guard PULSO.
- [ ] Se documenta la transición `pending` → `validated`.
- [ ] Se documenta que la UI actual no suministra `orderId`.
- [ ] Se documenta que no existe columna dedicada de expiración en la redención inspeccionada.
- [ ] Se documentan las políticas RLS específicas y las políticas permisivas generales de staff.
- [ ] Se documenta la firma condicional por dispositivo compartido.
- [ ] Se documenta el uso de `p_actor_employee_id = null` desde el consumidor.
- [ ] Se documenta el uso posterior de ese parámetro en la función remota y su efecto fail-closed observado.
- [ ] Se documenta la limpieza incompleta de `sharedActorPin`.
- [ ] `CameraQRScanner` queda dormante y no se cuenta como capacidad runtime.
- [ ] `decodeQRCode` queda como helper sin consumidor observado.
- [ ] Todo hallazgo material queda asignado a propietario y condición de salida.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 69. Límites

Esta tarea no:

- fusiona `/` y `/scanner`;
- crea redirects;
- activa cámara;
- modifica `ScannerPage`;
- modifica `QRScanner`;
- modifica Server Actions;
- cambia `pos.main`;
- crea permisos nuevos;
- cambia la proyección de cliente;
- modifica RLS;
- modifica RPC;
- modifica funciones `SECURITY DEFINER`;
- corrige la firma de dispositivo compartido;
- cambia PIN;
- cambia reglas de puntos;
- cambia ledger;
- cambia saldo;
- cambia idempotencia;
- cambia redenciones;
- agrega expiración;
- vincula redenciones a pedidos;
- modifica PASS;
- modifica Supabase remoto;
- crea migraciones;
- ejecuta acumulaciones o canjes;
- modifica el Registro 04A;
- implementa tareas posteriores.

---

#### 70. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-003 — Inventariar salón`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-004 — Inventariar escáner`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-005 — Inventariar importaciones`
### [ ] PULSO-AUTH-005 — Inventariar importaciones
### [ ] PULSO-AUTH-006 — Definir permisos de cajero
### [ ] PULSO-AUTH-007 — Definir permisos de supervisor
### [ ] PULSO-AUTH-008 — Definir permisos de cierre y anulación
### [ ] PULSO-AUTH-009 — Proteger acumulación de puntos
### [ ] PULSO-AUTH-010 — Proteger redenciones
### [ ] PULSO-AUTH-011 — Limitar operación a sede del turno
### [ ] PULSO-AUTH-012 — Integrar dispositivos POS compartidos
### [ ] PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación
### [ ] PULSO-AUTH-014 — Mantener configuración administrativa separada
### [ ] PULSO-AUTH-015 — Migrar a paquetes de vento-shell
### [ ] PULSO-AUTH-016 — Ejecutar pruebas integrales
