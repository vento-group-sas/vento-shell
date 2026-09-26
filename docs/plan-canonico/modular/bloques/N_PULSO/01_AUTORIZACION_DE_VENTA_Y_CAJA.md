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
### [ ] PULSO-AUTH-002 — Inventariar órdenes
### [ ] PULSO-AUTH-003 — Inventariar salón
### [ ] PULSO-AUTH-004 — Inventariar escáner
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
