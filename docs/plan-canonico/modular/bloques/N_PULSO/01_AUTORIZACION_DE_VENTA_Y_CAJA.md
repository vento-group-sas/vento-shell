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
### ✅ PULSO-AUTH-005 — Inventariar importaciones

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-004 — Inventariar escáner
**Tarea siguiente:** PULSO-AUTH-006 — Definir permisos de cajero
**Tipo de tarea:** inventario documental cerrado de la superficie AS-IS de importación de ventas expuesta por `PULSO-ROUTE-004` (`/sales-imports`), reconciliando carga XLSX, parser Makos, mapeos externos, hash de archivo, lotes, filas, validación, publicación, reglas de consumo, efectos sobre inventario, territorialidad, autorización, atribución de actor, idempotencia, concurrencia, recuperación y fronteras PULSO↔NEXO sin definir permisos finales ni modificar código, datos o Supabase; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, rutas, componentes, Server Actions, RPC, tablas, vistas, RLS, funciones, triggers, migraciones, Supabase, permisos, reglas de consumo, inventario, datos, packages, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma exhaustiva, estable y verificable la superficie actual de importación de ventas de PULSO para que las tareas posteriores de autorización, integración y pruebas trabajen sobre un único contrato AS-IS y no conviertan la mera visibilidad de `/sales-imports` en autoridad implícita para cargar archivos, alterar mapeos o publicar efectos de inventario.

La tarea deja resuelto:

- qué ruta y archivo contienen la superficie;
- qué acciones server-side existen;
- qué formato de archivo se admite y cómo se interpreta;
- cómo se calcula y conserva la huella del archivo;
- cómo se resuelven los mapeos externos;
- cómo se crean lotes y filas;
- qué estados y restricciones existen;
- qué condición habilita publicación;
- qué RPC produce el efecto físico de inventario;
- qué controles de idempotencia y concurrencia existen;
- qué controles faltan o no están demostrados;
- qué ownership permanece en NEXO y qué responsabilidad permanece en PULSO;
- qué hallazgos se transfieren a tareas propietarias posteriores.

---

#### 2. Handoff recibido de PULSO-AUTH-004

`PULSO-AUTH-004` cierra el inventario de `PULSO-ROUTE-001` y `PULSO-ROUTE-006` y entrega la continuidad documental hacia `PULSO-AUTH-005`.

La transición es:

```text
PULSO-AUTH-004
→ inventario cerrado de scanner / identificación
→ PULSO-AUTH-005
→ inventario de PULSO-ROUTE-004
```

No se heredan identidad de cliente, acumulación o redención como capacidades propias de importación.

---

#### 3. Handoff específico recibido de PULSO-AUTH-001

`PULSO-AUTH-001` entrega exactamente:

```text
PULSO-ROUTE-004
→ /sales-imports
→ IMPORTACION_VENTAS
→ carga / mapeo / lote / publicación
```

La obligación central recibida es separar cada acción sensible de la mera visibilidad de la vista.

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
- no se cargan archivos reales;
- no se crean mapeos;
- no se publican lotes;
- no se descuenta inventario;
- no se crean permisos;
- no se modifica Supabase;
- no se corrigen los gaps detectados dentro de esta tarea.

---

#### 5. Snapshot técnico verificado

Repositorio consumidor inspeccionado:

```text
repository = vento-group-sas/vento-pulso
branch = main
HEAD = 715b5683db05caa010d725679b5ada4705a6da6e
framework = Next.js App Router
```

Archivo fuente principal:

```text
src/app/sales-imports/page.tsx
blob = cdc69eeab9229e4e23069969e4192395291b364b
```

Baseline técnico inspeccionado:

```text
scripts/quality/pulso-consumer-baseline-gate.mjs
blob = b50fc12744bc1eb913aee3756a383df81475938b
```

---

#### 6. Identidad de la ruta

La superficie conserva una sola identidad de página:

| ID | Patrón | Archivo fuente | Clasificación |
| --- | --- | --- | --- |
| `PULSO-ROUTE-004` | `/sales-imports` | `src/app/sales-imports/page.tsx` | vista administrativa y de integración |

No se crean rutas adicionales por formulario, acción, lote, mapping, fila o estado.

---

#### 7. Superficie técnica propietaria

El baseline vigente define:

```text
PULSO-SURFACE-009
= importación de ventas, mapeos, lotes y publicación
```

Su única ruta fuente requerida es:

```text
src/app/sales-imports/page.tsx
```

La tarea inventaría esa superficie sin confundirla con una venta POS nativa ni con un canal live.

La misma página participa también en `PULSO-SURFACE-010 — atomicidad, idempotencia, concurrencia y recuperación`, sin fusionar ambas identidades técnicas.

---

#### 8. Contrato fuente técnico

El baseline vigente define:

```text
PULSO-SOURCE-006
```

con evidencia mínima de:

- `crypto.createHash("sha256")`;
- `pulso_external_sales_item_mappings`;
- `pulso_daily_sales_import_batches`;
- `pulso_daily_sales_import_rows`;
- `pulso_post_daily_sales_import`.

Esas identidades se conservarán sin renombrarlas.

---

#### 9. Cardinalidad de acciones mutantes

La página contiene exactamente tres Server Actions mutantes nombradas:

```text
saveMakosMapping
importDailySales
postDailySalesImport
```

Además existe la lectura SSR de `SalesImportsPage`.

Conteo:

```text
MUTATING_SERVER_ACTIONS = 3
PAGE_READ_ENTRYPOINTS = 1
```

---

#### 10. Matriz de acciones AS-IS

| Acción | Intención | Efecto principal |
| --- | --- | --- |
| `saveMakosMapping` | asociar MID externo con ítem vendible | alta/actualización/desactivación de mapping |
| `importDailySales` | ingerir reporte de ventas | crear lote y filas staging |
| `postDailySalesImport` | publicar lote validado | invocar RPC con efectos de inventario |

Abrir la página no equivale a ejecutar ninguna de estas acciones.

---

#### 11. Guard observado en la vista

La página ejecuta `requireAppAccess` con:

```text
appId = pulso
permissionCode = pos.main
requireAppAccessPermission = true
site_id = parámetro de consulta cuando existe
```

La existencia del guard prueba una barrera técnica observada, no suficiencia contractual de `pos.main` para las tres mutaciones.

---

#### 12. Guard observado en las acciones

Las tres acciones mutantes vuelven a ejecutar `requireAppAccess` con `pos.main` y sede.

Se conserva:

```text
VIEW_ACCESS
!=
MAPPING_AUTHORITY
!=
IMPORT_AUTHORITY
!=
PUBLISH_AUTHORITY
```

La separación final de permisos pertenece a tareas posteriores.

---

#### 13. Contexto territorial

La superficie utiliza `site_id` como contexto de página y payload de formularios.

Cada acción vuelve a pasar la sede solicitada al guard.

Regla obligatoria:

```text
site_id recibido del navegador
!=
autoridad territorial
```

La sede efectiva debe permanecer limitada por sesión, asignación, dispositivo y permiso server-side.

---

#### 14. Formato de entrada visible

La UI de importación solicita:

```text
sales_date
sales_file
```

El input del navegador declara:

```text
accept = .xlsx
```

Esto es una restricción de interfaz, no una validación server-side suficiente.

---

#### 15. Validación server-side del archivo

`importDailySales` comprueba actualmente:

- sede presente;
- fecha presente;
- objeto `File` existente;
- tamaño mayor que cero;
- que el parser produzca al menos una fila válida.

No se observó validación server-side explícita de:

- extensión real;
- MIME;
- firma de archivo;
- tamaño máximo;
- número máximo de filas antes de parsear.

La tarea registra el estado AS-IS sin ejecutar archivos adversariales.

---

#### 16. Parser Makos

El parser utiliza `XLSX.read` y procesa la primera hoja disponible del workbook.

Busca una fila de cabecera que contenga, después de normalización:

```text
ID
PRODUCTO
CANTIDAD
```

Además exige columnas utilizables de:

```text
PRODUCTO
CANTIDAD
SUBTOTAL
```

---

#### 17. Campos opcionales de importación

Cuando existen, el parser consume también:

```text
Categoría
IMPUESTOS
DESCUENTOS
DEVOLUCIONES
```

Su ausencia se degrada a cero o texto vacío según el campo.

---

#### 18. Normalización numérica

`parseNumber` aplica una normalización orientada al formato esperado:

- elimina espacios;
- elimina puntos;
- convierte coma decimal a punto;
- devuelve cero cuando el resultado no es finito.

La tarea no declara este parser válido para formatos regionales distintos del contrato esperado.

---

#### 19. Reglas de descarte de filas

El parser omite:

- fila sin nombre y sin identificador externo;
- fila cuyo nombre normalizado es `TOTAL`;
- fila con cantidad menor o igual a cero.

La fila fuente conserva `sourceRowNumber` para trazabilidad posterior.

---

#### 20. Discrepancia de hoja declarada

El lote registra en metadata:

```text
parser = makos_sales_by_item_v1
sheet = Reporte
```

Sin embargo, el parser inspeccionado selecciona:

```text
workbook.SheetNames[0]
```

No se observó validación de que la primera hoja se llame `Reporte`.

Por tanto:

```text
METADATA_SHEET = Reporte
!=
SHEET_NAME_VALIDATED
```

---

#### 21. Hash de archivo

Antes de crear el lote se calcula:

```text
SHA-256(bytes del archivo)
```

La huella se persiste como `source_file_hash`.

La identidad del lote conserva además sede, fecha y fuente.

---

#### 22. Dedupe de lote

La base contiene la restricción única:

```text
UNIQUE(site_id, sales_date, source, source_file_hash)
```

Esto bloquea dos lotes con la misma huella, fuente, fecha y sede.

La restricción es evidencia de deduplicación del lote, no prueba por sí sola de recuperación ante un fallo parcial posterior.

---

#### 23. Universo de catálogo consultado

Para cada importación se consultan ítems activos de catálogo filtrados por sede.

El código inspeccionado aplica:

```text
limit = 2000
```

La tarea registra ese límite como parte del contrato AS-IS; no infiere cobertura total de una sede con cardinalidad superior.

---

#### 24. Universo de mapeos consultado

Se consultan mapeos activos con:

```text
site_id = sede activa
source = makos
is_active = true
limit = 2000
```

La existencia de un límite fijo no demuestra que todos los mapeos posibles queden cubiertos cuando el universo supere ese valor.

---

#### 25. Precedencia de matching

La coincidencia de una fila sigue este orden:

```text
1. mapping MID activo
2. code de catalog_item
3. nombre normalizado de catalog_item
4. unmatched
```

Los estados producidos son:

```text
matched_mid
matched_code
matched_name
unmatched
```

---

#### 26. Línea no identificada

Una fila `unmatched` queda:

```text
catalog_item_id = null
product_id = null
row_status = draft
```

Además incrementa `warning_count` del lote.

La línea no mapeada no queda habilitada para publicación normal.

---

#### 27. Acción de mapeo

`saveMakosMapping` recibe:

```text
site_id
catalog_item_id
external_item_id
external_item_name
external_category
```

Exige sede e ítem de catálogo antes de mutar.

---

#### 28. Alta y actualización de mapping

Cuando existe `external_item_id`, la acción ejecuta `upsert` sobre:

```text
pulso_external_sales_item_mappings
```

con:

```text
source = makos
is_active = true
created_by = user.id
updated_by = user.id
```

El conflicto declarado por el consumidor es:

```text
site_id, source, catalog_item_id
```

---

#### 29. Desactivación de mapping

Cuando `external_item_id` llega vacío, la acción no elimina la fila.

Ejecuta:

```text
is_active = false
updated_by = user.id
```

para la combinación sede, fuente Makos e ítem de catálogo.

La historia física de la fila se conserva.

---

#### 30. Restricciones de unicidad del mapping

La base protege simultáneamente:

```text
UNIQUE(site_id, source, catalog_item_id)
UNIQUE(site_id, source, external_item_id)
```

Un MID activo no puede representar silenciosamente dos ítems diferentes dentro de la misma sede y fuente.

---

#### 31. Sincronización de `product_id`

La tabla de mapeo tiene un trigger antes de insert/update que ejecuta:

```text
pulso_sync_external_sales_item_mapping_product_id
```

La sincronización relaciona el mapping con su producto canónico a partir del ítem de catálogo.

El formulario no adquiere autoridad para elegir libremente `product_id`.

---

#### 32. Campos descriptivos enviados por navegador

`external_item_name` y `external_category` llegan como campos de formulario.

Se conservan como metadata descriptiva del mapping observado.

No se interpretan como autoridad para seleccionar producto, sede o permiso.

---

#### 33. Creación del lote

`importDailySales` crea una fila en:

```text
pulso_daily_sales_import_batches
```

con, entre otros:

- sede;
- fecha de ventas;
- nombre de archivo;
- hash;
- estado;
- conteo de filas;
- conteo de coincidencias;
- warnings;
- cantidades;
- subtotal;
- impuestos;
- descuentos;
- devoluciones;
- venta neta;
- `imported_by`;
- metadata del parser.

---

#### 34. Estado inicial del lote

El código asigna:

```text
warnings = 0      → validated
warnings > 0      → draft
```

La tabla permite los estados:

```text
draft
validated
posted
cancelled
```

La tarea registra la máquina AS-IS sin aprobar transiciones adicionales.

---

#### 35. Cálculos del lote

El consumidor calcula:

```text
total_quantity
subtotal_amount
tax_amount
discount_amount
return_amount
net_sales_amount = subtotal - descuentos - devoluciones
```

La base exige no negatividad para los agregados controlados por constraints.

La tarea no certifica conciliación financiera integral de esas cifras.

---

#### 36. Creación de filas staging

Después de crear el lote, el consumidor construye e inserta filas en:

```text
pulso_daily_sales_import_rows
```

Cada fila conserva:

- `batch_id`;
- sede;
- fecha;
- número de fila fuente;
- identidad y descripción externa;
- cantidades e importes;
- ítem de catálogo;
- producto;
- estado de matching;
- razón de matching;
- estado de fila;
- metadata de origen.

---

#### 37. Identidad de fila

La base protege:

```text
UNIQUE(batch_id, source_row_number)
```

Esto impide duplicar el mismo número de fila dentro del mismo lote.

No convierte dos lotes diferentes en un mismo evento empresarial.

---

#### 38. Ingestión lote → filas no atómica en el consumidor

El código inspeccionado realiza dos operaciones Supabase separadas:

```text
1. INSERT batch
2. INSERT rows
```

No se observó una única RPC o transacción de base que abarque ambas operaciones.

Por tanto, la atomicidad completa de ingestión no está demostrada.

Un fallo del segundo paso puede dejar el lote ya creado mientras las filas no se materializan.

---

#### 39. Recuperación después de fallo parcial de ingestión

La restricción única del lote por hash puede impedir recrear con la misma identidad un lote previamente insertado si falló la inserción posterior de filas.

El consumidor inspeccionado no muestra un comando explícito de reanudación o reparación de ese caso.

La tarea registra la deuda de recuperación; no elimina el lote ni relaja la unicidad.

---

#### 40. Lecturas de la página

La vista SSR consulta para la sede activa:

- la sede;
- hasta 12 lotes recientes;
- hasta 2000 ítems de catálogo activos;
- hasta 2000 mapeos activos Makos;
- hasta 2000 filas con incidencias de consumo mediante vista derivada.

Estas cardinalidades son límites AS-IS, no garantías de cobertura ilimitada.

---

#### 41. Vista de consumo pendiente

La vista:

```text
pulso_sales_import_rows_pending_consumption
```

está materializada como `VIEW` con `security_invoker=true`.

Evalúa filas en estado `draft` o `validated` y puede emitir:

```text
missing_catalog_item
missing_consumption_rule
```

---

#### 42. Precedencia de regla de consumo

La vista y la RPC seleccionan una regla activa con esta prioridad funcional:

```text
1. catalog_item_id
2. product_id
3. category_label
```

Después aplican prioridad y fecha de creación de la regla.

La existencia de una regla no transfiere ownership del inventario a PULSO.

---

#### 43. Gate visual de publicación

La UI habilita el botón `Publicar` únicamente cuando:

```text
batch.status = validated
warning_count = 0
pendingConsumptionCount = 0
```

Ese gate visual reduce acciones inválidas, pero no sustituye la revalidación server-side.

---

#### 44. Acción de publicación

`postDailySalesImport` vuelve a validar acceso PULSO y sede y luego invoca:

```text
pulso_post_daily_sales_import(p_batch_id)
```

La acción no ejecuta directamente escrituras de inventario desde TypeScript.

---

#### 45. Contrato remoto de publicación

La RPC vigente es:

```text
public.pulso_post_daily_sales_import(p_batch_id uuid)
SECURITY DEFINER
search_path = public, pass, pg_temp
```

La función vuelve a verificar:

```text
has_permission('pulso.pos.main', batch.site_id)
```

El permiso observado sigue siendo general y no se declara suficiente como diseño final.

---

#### 46. Bloqueo del lote

La RPC recupera el lote con:

```text
FOR UPDATE
```

Esto serializa la publicación concurrente del mismo lote.

No equivale a bloquear el stock compartido frente a lotes distintos.

---

#### 47. Idempotencia terminal del mismo lote

Si el lote ya está en estado `posted`, la RPC devuelve éxito estable sin volver a publicar líneas:

```text
status = posted
postedLines = 0
skippedLines = 0
```

Además, solo un lote `validated` puede iniciar publicación normal.

---

#### 48. Modos de consumo

Las reglas vigentes admiten:

```text
stored_finished_good
made_to_order_recipe
direct_ingredient
no_inventory
```

Cada modo conserva constraints propios de payload.

---

#### 49. `no_inventory`

Cuando la regla es `no_inventory`, la RPC:

- no crea movimiento físico;
- marca la fila `posted`;
- registra en metadata `inventoryPosting = no_inventory`;
- incrementa el conteo de líneas omitidas de inventario.

La omisión es explícita y no debe confundirse con un fallo silencioso.

---

#### 50. Componentes de consumo físico

Para modos con inventario, la RPC deriva componentes según:

- producto terminado almacenado;
- ingrediente directo;
- receta activa y rendimiento para preparación a pedido.

Un componente nulo o con cantidad no positiva se registra como error de publicación.

---

#### 51. Validación de stock observada

Antes de crear un movimiento, la RPC consulta:

```text
inventory_stock_by_location.current_qty
```

para ubicación y producto.

Si el stock observado es menor que la cantidad requerida, registra `insufficient_stock`.

---

#### 52. Concurrencia de stock entre lotes

En la definición remota inspeccionada no se observó `FOR UPDATE` sobre la fila de stock antes de comparar `current_qty`.

El `FOR UPDATE` del lote solo protege la identidad de ese lote.

Por tanto, la tarea no certifica que dos lotes distintos concurrentes no puedan superar simultáneamente la misma comprobación de stock antes de aplicar decrementos.

La protección de concurrencia física permanece pendiente de materialización y prueba propietaria.

---

#### 53. Movimiento de inventario producido

Cuando una línea es publicable, la RPC crea un movimiento:

```text
inventory_movements.movement_type = sale_out
```

con sede, producto, cantidad, nota de correlación y `created_by = auth.uid()`.

Después actualiza stock por sede y por ubicación.

---

#### 54. Registro de posting

Cada efecto físico se registra en:

```text
pulso_sales_inventory_postings
```

con relación a:

- lote;
- fila;
- regla;
- sede;
- fecha;
- ítem de catálogo;
- ubicación fuente;
- área;
- producto;
- cantidad;
- movimiento;
- tipo de posting.

---

#### 55. Dedupe de posting

La base protege:

```text
UNIQUE(row_id, product_id, source_loc_id, posting_kind)
```

La RPC también comprueba existencia antes de insertar.

Esto protege la repetición del mismo componente de una fila; no sustituye la correlación empresarial global entre fuentes distintas.

---

#### 56. Atomicidad de la RPC de publicación

La publicación y sus escrituras se ejecutan dentro de una única llamada PostgreSQL.

La función acumula errores y lanza excepción cuando alguno permanece.

La observación del contrato SQL permite tratar el conjunto de efectos de esa llamada como una unidad transaccional de base; esta tarea no ejecutó una prueba de rollback físico.

---

#### 57. Estado final de publicación

Cuando la publicación completa sin errores, el lote cambia a:

```text
status = posted
posted_at = now()
```

y agrega metadata con:

- timestamp de posting;
- `auth.uid()` que publicó;
- líneas con inventario;
- líneas omitidas por `no_inventory`.

---

#### 58. RLS de tablas de importación

Las políticas vigentes de:

```text
pulso_external_sales_item_mappings
pulso_daily_sales_import_batches
pulso_daily_sales_import_rows
pulso_sales_consumption_rules
```

usan `has_permission('pulso.pos.main', site_id)` para las operaciones observadas de lectura y mutación.

La granularidad final por acción no está resuelta.

---

#### 59. Atribución de actor

El flujo registra referencias técnicas como:

```text
created_by
updated_by
imported_by
inventoryPostedBy
```

basadas en el usuario autenticado.

No se observó en esta superficie una llamada a `requireSharedDeviceActorSignature` para mapping, importación o publicación.

Por tanto, en dispositivo compartido la atribución del trabajador humano para estas mutaciones no queda demostrada por esta superficie.

---

#### 60. Dispositivo compartido

`requireAppAccess` puede resolver una sesión operacional compartida y controlar aplicación/permiso.

Eso no equivale a firmar individualmente una mutación sensible.

Se conserva la separación:

```text
PRINCIPAL TÉCNICO
!=
ACTOR HUMANO
!=
DISPOSITIVO
```

---

#### 61. Fuente externa observada

La implementación actual está especializada en Makos:

```text
mapping source = makos
row metadata source = makos_excel
parser = makos_sales_by_item_v1
```

La tarea no generaliza esta implementación a cualquier POS externo.

---

#### 62. Importación batch no equivale a venta nativa

Se conserva:

```text
IMPORTACIÓN BATCH
!=
VENTA POS NATIVA
!=
PEDIDO EXTERNO LIVE
```

El archivo importado representa un adaptador de transición y no una sustitución del contrato canónico futuro de venta.

---

#### 63. Frontera PULSO ↔ NEXO

PULSO origina y administra la importación comercial observada.

El efecto físico posterior toca inventario, cuya propiedad empresarial permanece en NEXO.

```text
PULSO → hecho comercial/importado
NEXO → stock, ubicación y movimiento físico
```

La existencia de tablas `public.inventory_*` consumidas por la RPC no transfiere ownership a PULSO.

---

#### 64. Fronteras PASS y NUMERA

La importación consulta catálogo vendible relacionado con PASS, pero no adquiere ownership del catálogo por hacerlo.

No se observó en la ruta inspeccionada un efecto directo de fidelización PASS ni una contabilización NUMERA completa durante `postDailySalesImport`.

La ausencia observada no autoriza concluir que esos dominios sean innecesarios para el contrato comercial final.

---

#### 65. Datos remotos de desarrollo observados

En el proyecto remoto de desarrollo inspeccionado, al momento de esta auditoría se observaron:

```text
active_mappings = 0
batch_count = 0
row_count = 0
active_consumption_rules = 0
posting_count = 0
```

Por tanto, la inspección remota valida estructura y contrato, no una ejecución operativa real del flujo.

---

#### 66. Matriz de estados AS-IS

| Entidad | Estados observados |
| --- | --- |
| lote | `draft`, `validated`, `posted`, `cancelled` |
| fila | `draft`, `validated`, `posted`, `cancelled` |
| matching | `matched_mid`, `matched_code`, `matched_name`, `unmatched` |
| consumo | `stored_finished_good`, `made_to_order_recipe`, `direct_ingredient`, `no_inventory` |

Los estados no se fusionan entre capas.

---

#### 67. Matriz de autorización observada

| Operación | Guard/permiso observado | Estado contractual |
| --- | --- | --- |
| abrir `/sales-imports` | `requireAppAccess` + `pos.main` + sede | observado, no final |
| guardar mapping | `requireAppAccess` + RLS `pos.main` | observado, no final |
| importar archivo | `requireAppAccess` + RLS `pos.main` | observado, no final |
| publicar lote | `requireAppAccess` + RPC `has_permission(pos.main, sede)` | observado, no final |
| leer reglas/postings | RLS `pos.main` | observado, no final |

La matriz no convierte `pos.main` en permiso final aprobado.

---

#### 68. Matriz de idempotencia y recuperación

| Frontera | Protección observada | Gap no resuelto |
| --- | --- | --- |
| archivo→lote | unique por sede/fecha/fuente/hash | recuperación de lote huérfano si fallan filas |
| lote→fila | unique por lote+número fuente | batch y rows se insertan en llamadas separadas |
| lote publicado | batch `FOR UPDATE` + estado `posted` terminal | no cubre lotes distintos sobre mismo stock |
| fila→posting | unique por fila/producto/ubicación/tipo | no sustituye correlación cross-source |
| stock | comprobación previa + decremento | no se observó lock explícito de fila de stock |

---

#### 69. Matriz de hallazgos y propietarios de salida

| Hallazgo AS-IS | Efecto | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `pos.main` protege lectura, mapping, ingestión y publicación | granularidad insuficiente como diseño final | `PULSO-AUTH-006..008` + contratos transversales AUTH | permisos exactos por acción |
| validación server-side de archivo no cubre MIME/firma/tamaño máximo | archivo adversarial o carga excesiva no descartados por contrato observado | `PULSO-AUTH-016` + package propietario | pruebas y límites explícitos |
| metadata declara hoja `Reporte` pero parser usa primera hoja | evidencia descriptiva puede divergir del archivo real | `PULSO-AUTH-016` + package propietario | parser/metadata reconciliados y probados |
| catálogos y mapeos se limitan a 2000 | cobertura total no demostrada para cardinalidad superior | `PULSO-AUTH-016` + package propietario | estrategia de paginación/cobertura probada |
| lote y filas se insertan en llamadas separadas | lote huérfano y retry bloqueado por hash son posibles | `PULSO-AUTH-016` + contratos de integración | ingestión atómica o recuperación idempotente |
| acciones no firman actor humano en dispositivo compartido | atribución humana no demostrada | `PULSO-AUTH-012/013` | actor efectivo firmado y correlacionado |
| RLS usa `pos.main` para tablas administrativas | autorización atómica no demostrada | `PULSO-AUTH-006..008` + owner Supabase | permisos y RLS reconciliados |
| publicación produce inventario desde contrato PULSO | frontera PULSO↔NEXO requiere gobierno de integración | `INT-POS-011..020`; `INT-SALES-001..011` | efecto físico exactamente una vez y ownership preservado |
| stock se valida sin lock explícito de fila observado | concurrencia entre lotes distintos no certificada | contratos NEXO/integración + `PULSO-AUTH-016` | prueba concurrente y control físico aprobado |
| adaptador está especializado en Makos | no representa cualquier canal externo | `INT-POS-011..020` / `INT-SALES-001..011` | adapter/cutover explícito por fuente |
| remoto dev contiene cero datos de esta superficie | estructura verificada sin evidencia operativa | `PULSO-AUTH-016` | ejecución integral en ambiente controlado |

No queda hallazgo material sin propietario o condición de salida.

---

#### 70. Handoff a PULSO-AUTH-006..008

Las tareas de permisos reciben como restricciones:

- visibilidad de `/sales-imports` separada de mutación;
- mapping, importación y publicación como acciones distintas;
- `pos.main` únicamente como permiso observado AS-IS;
- publicación como acción con efecto físico mayor que lectura o staging;
- necesidad de separar operación ordinaria de autoridad administrativa.

Esta tarea no crea nuevas claves de permiso.

---

#### 71. Handoff a PULSO-AUTH-011

`PULSO-AUTH-011 — Limitar operación a sede del turno` recibe:

- `site_id` de ruta;
- `site_id` oculto de formularios;
- RLS por sede;
- lote, filas y mappings con `site_id`;
- reglas de consumo y publicación ligadas a sede.

La condición de salida es impedir que el payload cliente amplíe territorio.

---

#### 72. Handoff a PULSO-AUTH-012 y PULSO-AUTH-013

Estas tareas reciben la ausencia de firma humana específica en:

```text
saveMakosMapping
importDailySales
postDailySalesImport
```

La condición de salida es correlacionar principal técnico, dispositivo compartido, trabajador efectivo, sede y mutación sensible.

---

#### 73. Handoff a PULSO-AUTH-015

`PULSO-AUTH-015 — Migrar a paquetes de vento-shell` recibe:

- contratos de importación hoy concentrados en una page de consumidor;
- límites PULSO↔NEXO;
- RPC y modelos de datos compartidos;
- necesidad de no migrar código AS-IS sin reconciliar autorización, atomicidad y ownership.

---

#### 74. Handoff a PULSO-AUTH-016

`PULSO-AUTH-016 — Ejecutar pruebas integrales` recibe como mínimo:

- validación adversarial de archivo;
- archivo repetido;
- fallo entre creación de lote y filas;
- mapeos incompletos;
- más de 2000 ítems/mapeos cuando aplique;
- lote con warnings;
- consumo pendiente;
- doble publicación del mismo lote;
- publicación concurrente de lotes distintos sobre mismo stock;
- falta de stock;
- modos de consumo;
- dispositivo compartido;
- aislamiento entre sedes;
- recuperación y conciliación.

La tarea actual no ejecuta esas pruebas.

---

#### 75. Drift que invalida conclusiones afectadas

Obligan a revisar este inventario:

- cambio de blob de `src/app/sales-imports/page.tsx` que altere comportamiento material;
- alta o retiro de Server Actions de importación;
- cambio del parser;
- cambio de fuente externa;
- cambio de algoritmo de hash;
- cambio de precedencia de matching;
- cambio de tablas o vistas consumidas;
- cambio de estados;
- cambio de RLS;
- cambio de permiso observado;
- cambio de RPC de publicación;
- cambio de reglas de consumo;
- cambio de constraints de idempotencia;
- cambio de ownership o efectos sobre inventario.

Un commit distinto sin cambio material de estas fuentes no invalida por sí solo todas las conclusiones.

---

#### 76. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

La conducta verificable necesaria para la superficie de importaciones ya está cubierta por obligaciones canónicas vigentes de PULSO e integración.

---

#### 77. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-PULSO-003` — piezas AS-IS requieren seguridad, atomicidad, idempotencia, concurrencia, recuperación, auditoría e integración antes de adopción final;
- `TREQ-PULSO-005` — hechos comerciales conservan canal, identidad externa, sede, estados y actores;
- `TREQ-PULSO-006` — acciones sensibles deben ser nombradas, autorizadas y auditables;
- `TREQ-PULSO-015` — `site_id` no puede ampliar territorio;
- `TREQ-PULSO-017` — abrir `/sales-imports` no autoriza carga, mapping ni publicación y cada operación exige autorización, validación, idempotencia y auditoría;
- `TREQ-PULSO-023` — drift material exige delta explícito;
- `TREQ-PULSO-024` — infraestructura existente no demuestra autorización completa;
- `TREQ-PULSO-026` — `pos.main` observado no demuestra suficiencia contractual;
- `TREQ-PULSO-027` — fronteras entre aplicaciones permanecen separadas;
- `TREQ-INTEGRATION-006` — fuentes competidoras y conciliación deben resolverse sin sobrescribir historia;
- `TREQ-INTEGRATION-009` — identificadores externos se mapean explícitamente y líneas sin mapping quedan en cuarentena sin efecto automático;
- `TREQ-INTEGRATION-011` — todo efecto externo de inventario debe correlacionarse e idempotentarse hacia NEXO exactamente una vez;
- `TREQ-INTEGRATION-014` — POS externo entra por adapter, staging, payload/hash/mapping/cuarentena/idempotencia y no puede duplicar efectos durante transición.

La mención es trazabilidad; no constituye actualización del Registro 04A.

---

#### 78. Huella fuente verificada

| Fuente | Identidad verificada |
| --- | --- |
| `vento-pulso/main` | `715b5683db05caa010d725679b5ada4705a6da6e` |
| `src/app/sales-imports/page.tsx` | `cdc69eeab9229e4e23069969e4192395291b364b` |
| `scripts/quality/pulso-consumer-baseline-gate.mjs` | `b50fc12744bc1eb913aee3756a383df81475938b` |
| `src/lib/auth/guard.ts` | `ae708911c06e0bae35dead2343879d69ec23ee5b` |

La evidencia Supabase remota fue consultada en modo de solo lectura.

---

#### 79. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; no existe cambio físico en el consumidor |
| LOCAL | NOT_EXECUTED | no se modificó checkout local de `vento-shell` ni de `vento-pulso` durante la redacción |
| REMOTA | PASS | se verificaron fuentes canónicas de `vento-shell`, snapshot y blobs de `vento-pulso`, baseline PULSO y metadatos de solo lectura del proyecto Supabase de desarrollo para tablas, vistas, RLS, constraints, triggers y RPC relevantes |
| OPERATIVA | NOT_EXECUTED | no se cargó XLSX, no se creó mapping, lote o fila y no se publicó inventario; el ambiente remoto inspeccionado tenía cero registros de importación, reglas activas y postings en las superficies consultadas |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; la tarea no materializa una instancia propia |

La evidencia remota valida el inventario documental AS-IS; no certifica el flujo E2E.

---

#### 80. Criterios de aceptación

- [ ] Se inventaría exactamente `PULSO-ROUTE-004` para `/sales-imports`.
- [ ] Se conserva el blob fuente verificado.
- [ ] Se registran exactamente tres Server Actions mutantes.
- [ ] Se separan mapping, importación y publicación.
- [ ] Se registra `pos.main` únicamente como permiso observado.
- [ ] Se registra la restricción visible `.xlsx` separada de validación server-side.
- [ ] Se documenta el parser Makos y su selección de primera hoja.
- [ ] Se documenta la discrepancia entre `sheet = Reporte` y la ausencia de validación del nombre de hoja.
- [ ] Se conserva SHA-256 del archivo como huella de lote.
- [ ] Se registra la restricción única de lote por sede, fecha, fuente y hash.
- [ ] Se conserva la precedencia mapping MID → código → nombre → unmatched.
- [ ] Una línea `unmatched` permanece fuera de publicación normal.
- [ ] Se registran límites de consulta de 2000 como límites AS-IS.
- [ ] Se separa creación de batch de creación de rows y se registra la falta de atomicidad integral observada.
- [ ] Se registra la vista de consumo pendiente y sus `issue_code`.
- [ ] Se separa gate visual de validación server-side.
- [ ] Se inventaría `pulso_post_daily_sales_import` y su `FOR UPDATE` de lote.
- [ ] Se registra idempotencia terminal de lote ya publicado.
- [ ] Se inventarían los cuatro modos de consumo.
- [ ] Se registra la frontera `no_inventory` sin movimiento físico.
- [ ] Se registra el efecto `sale_out` y el posting correlacionado.
- [ ] Se registra dedupe por fila/producto/ubicación/tipo.
- [ ] Se registra que no se observó lock explícito de stock entre lotes distintos.
- [ ] Se registra la ausencia de firma humana específica en dispositivo compartido.
- [ ] Se preserva ownership de inventario en NEXO.
- [ ] La importación batch no se presenta como venta nativa ni canal live.
- [ ] Todo hallazgo queda asignado a propietario y condición de salida.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 81. Límites

Esta tarea no:

- define permisos finales de cajero;
- define permisos de supervisor;
- define permisos de cierre o anulación;
- crea claves de permiso;
- cambia `pos.main`;
- modifica `/sales-imports`;
- cambia el parser;
- cambia el workbook esperado;
- agrega validación MIME, firma o tamaño;
- elimina límites de 2000;
- crea o elimina mappings;
- importa un archivo;
- crea lotes o filas;
- repara lotes huérfanos;
- cambia RLS;
- cambia constraints;
- cambia triggers;
- cambia `pulso_post_daily_sales_import`;
- cambia reglas de consumo;
- modifica `inventory_movements`;
- modifica stock por sede o ubicación;
- mueve ownership de inventario desde NEXO;
- implementa firma de actor compartido;
- ejecuta concurrencia;
- ejecuta rollback;
- migra código a packages;
- modifica Supabase;
- crea migraciones;
- modifica datos remotos;
- modifica el Registro 04A;
- ejecuta implementación física.

---

#### 82. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-004 — Inventariar escáner`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-005 — Inventariar importaciones`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-006 — Definir permisos de cajero`
### ✅ PULSO-AUTH-006 — Definir permisos de cajero

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-005 — Inventariar importaciones
**Tarea siguiente:** PULSO-AUTH-007 — Definir permisos de supervisor
**Tipo de tarea:** definición documental del contrato de autorización ordinaria del rol operativo `cajero_satelite`, cerrando la descomposición de `pulso.pos.main` necesaria para caja sobre capacidades atómicas de pedidos, cobro, apertura de caja e identificación/fidelización, con denegación por defecto, alcance territorial operativo, prerrequisitos de turno/check-in y separación explícita de cancelación, reembolso, cierre, override, importaciones y demás capacidades reservadas; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, catálogo runtime de permisos, matrices runtime, roles, RLS, RPC, funciones, Server Actions, páginas, datos, Supabase, migraciones, packages, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada qué capacidades PULSO puede ejercer ordinariamente un actor cuyo rol operativo efectivo sea `cajero_satelite`, sin reutilizar `pulso.pos.main` como autoridad total y sin convertir el nombre del rol, la entrada a la aplicación, el dispositivo o la sede seleccionada en permisos implícitos.

La tarea resuelve:

- qué permiso mantiene la entrada a PULSO;
- qué capacidades atómicas sustituyen la parte ordinaria de caja hoy absorbida por `pulso.pos.main`;
- cuáles de esas capacidades recibe `cajero_satelite`;
- cuáles permanecen expresamente fuera del rol;
- qué modalidad, prerrequisito y alcance mínimo exige cada concesión ordinaria;
- qué límites de recurso y estado acompañan a cada permiso;
- cómo se preservan ownership y fronteras con PASS, NEXO, NUMERA y otros actores PULSO;
- cómo se trata la convivencia temporal con permisos legacy sin ampliar autoridad;
- qué tareas reciben las capacidades sensibles o excepcionales restantes.

---

#### 2. Handoff recibido de PULSO-AUTH-005

`PULSO-AUTH-005` entrega a esta tarea las siguientes restricciones:

```text
VISIBILIDAD DE /sales-imports
!=
AUTORIDAD PARA MAPEAR
!=
AUTORIDAD PARA IMPORTAR
!=
AUTORIDAD PARA PUBLICAR
```

También entrega:

- `pos.main` como permiso observado AS-IS, no como diseño final;
- publicación de importaciones como efecto de mayor impacto que lectura o staging;
- necesidad de separar autoridad operativa ordinaria de autoridad administrativa;
- prohibición de inferir permisos de cajero desde la existencia de la página.

Por tanto, ninguna capacidad de importación se incorpora al contrato ordinario de `cajero_satelite`.

---

#### 3. Handoffs acumulados de PULSO-AUTH-002..004

Los inventarios aprobados anteriores establecen:

- pedidos, líneas, estados, pago, fulfillment, despacho, chat, facturación e historial son responsabilidades distintas;
- `/salon` separa lectura, sesiones y llamados de servicio;
- scanner, identificación, acumulación y redención son acciones diferentes;
- `pulso.delivery.deliveries.override` ya demuestra que una excepción requiere permiso específico;
- abrir una página no autoriza sus mutaciones;
- ninguna operación de loyalty transfiere ownership del ledger desde PASS a PULSO.

Esta tarea consume esos handoffs sin fusionar sus acciones bajo un permiso genérico.

---

#### 4. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el contrato se define una sola vez;
- no existe instancia física propia;
- no se siembran permisos;
- no se modifican matrices;
- no se retira `pulso.pos.main` en runtime;
- no se altera el rol legacy `cajero`;
- no se altera `cajero_satelite` en Supabase;
- no se implementan guards, RPC o RLS;
- no se ejecutan ventas, cobros, puntos ni aperturas de caja.

---

#### 5. Actor contractual

El actor ordinario de esta tarea es:

```text
operational_role = cajero_satelite
```

Su autoridad requiere, según la capacidad:

```text
ACTOR HUMANO IDENTIFICADO
+ EMPLEADO ACTIVO
+ TURNO PUBLICADO Y VIGENTE
+ ROL OPERATIVO EFECTIVO cajero_satelite
+ SEDE AUTORIZADA
+ ÁREA OPERATIVA COMPATIBLE DE TIPO cashier
+ CHECK-IN CUANDO CORRESPONDE
+ PERMISO ATÓMICO EXPLÍCITO
+ RECURSO Y ESTADO COMPATIBLES
+ AUSENCIA DE DENEGACIÓN SUPERIOR
= DECISIÓN DE AUTORIZACIÓN
```

---

#### 6. Lo que no concede autoridad

Queda prohibido interpretar cualquiera de estas condiciones como autorización suficiente:

```text
employees.role = cajero
pulso.access
pulso.pos.main legacy
nombre del rol
sede seleccionada
site_id enviado por cliente
dispositivo de caja
PIN de dispositivo
pantalla visible
botón visible
página accesible
rol simulado
```

Cada una puede aportar contexto o compatibilidad, pero no sustituye la decisión completa.

---

#### 7. Relación con AUTH-RBAC-008

`AUTH-RBAC-008 — Crear matriz de cajero_satelite` dejó explícitamente pendiente el detalle interno de PULSO:

```text
TURNO DE CAJA VÁLIDO
→ pulso.access
→ FUNCIONES POS ATÓMICAS PENDIENTES DE CATÁLOGO
```

Esta tarea cierra esa deuda únicamente para las capacidades ordinarias de cajero y para las identidades mínimas necesarias que separan las capacidades sensibles reservadas.

No reabre las once concesiones ya aprobadas de la matriz transversal ni modifica sus decisiones NEXO.

El perfil de entrada PULSO heredado se conserva como:

```text
CTX-CASHIER-POS
```

y continúa significando únicamente entrada operativa a la superficie POS durante un turno válido; no sustituye los scopes de recurso definidos en esta tarea.

---

#### 8. Regla raíz de `pulso.access`

Se conserva:

```text
pulso.access
```

con significado exclusivo:

```text
ENTRAR A PULSO
```

No significa:

- consultar cualquier pedido;
- crear o modificar pedidos;
- cobrar;
- abrir o cerrar caja;
- cancelar;
- reembolsar;
- identificar clientes;
- acumular o redimir puntos;
- importar ventas;
- administrar salón;
- despachar;
- aplicar overrides.

---

#### 9. Tratamiento definitivo de `pulso.pos.main`

El permiso actual:

```text
pulso.pos.main
```

se clasifica para este frente como:

```text
LEGACY_BROAD_PERMISSION
DECOMPOSE_REQUIRED
NO_DIRECT_CANONICAL_ALIAS
NO_AUTOMATIC_GRANT_EXPANSION
```

Regla obligatoria:

```text
pulso.pos.main
!=
SUMA AUTOMÁTICA DE PERMISOS ATÓMICOS
```

La existencia de una concesión histórica de `pulso.pos.main` al rol base `cajero`, al rol operativo `cajero_satelite` o a cualquier otro actor no concede automáticamente ninguno de los permisos nuevos definidos aquí.

---

#### 10. Convención de códigos aplicada

Los permisos funcionales definidos por esta tarea cumplen:

```text
app.module.resource.action
```

No se crean permisos derivados de patrones URL, pantallas, componentes, nombres de rol, scopes o estados.

Los módulos PULSO utilizados son:

```text
sales
payments
cash
loyalty
```

---

#### 11. Acción nueva `identify`

La acción `identify` se incorpora al vocabulario PULSO mediante esta decisión explícita. Su registro contractual queda definido así:

| Campo | Decisión |
| --- | --- |
| Acción | `identify` |
| Definición | resolver una identidad de cliente a partir de un identificador presentado y devolver únicamente la proyección mínima autorizada para la operación actual |
| Diferencia frente a `view` | `view` consulta un recurso ya conocido o una colección autorizada; `identify` resuelve qué cliente corresponde al identificador presentado sin habilitar navegación general de clientes |
| Tipo de operación | lectura dirigida / resolución de identidad comercial |
| Riesgo | exposición o asociación incorrecta de identidad, datos personales o saldo proyectado |
| Modifica estado empresarial | NO |
| Ejemplo válido | escanear o ingresar un identificador admitido durante una venta para vincular al cliente antes de loyalty |

No equivale a:

- listar clientes;
- consultar perfiles arbitrarios;
- administrar clientes;
- editar identidad;
- consultar el ledger completo de PASS.

Su código canónico es:

```text
pulso.loyalty.customers.identify
```

---

#### 12. Universo atómico derivado de `pulso.pos.main`

La descomposición necesaria para el contrato ordinario de caja queda cerrada en once capacidades:

```text
pulso.sales.orders.view
pulso.sales.orders.create
pulso.sales.orders.update
pulso.sales.orders.cancel
pulso.payments.transactions.collect
pulso.payments.transactions.refund
pulso.cash.sessions.start
pulso.cash.sessions.close
pulso.loyalty.customers.identify
pulso.loyalty.points.accumulate
pulso.loyalty.points.redeem
```

Las diez familias estructurales ya anticipadas por el catálogo de autorización se conservan y se agrega exclusivamente `pulso.loyalty.customers.identify` porque el inventario real de scanner demostró una acción independiente de identificación.

---

#### 13. Permiso existente fuera de la descomposición

Se conserva como capacidad independiente ya normalizada:

```text
pulso.delivery.deliveries.override
```

No forma parte de `pulso.pos.main` ni del conjunto ordinario de cajero.

Su modalidad canónica ya aprobada permanece:

```text
BASE_AND_OPERATIONAL
```

---

#### 14. Cardinalidad del contrato PULSO evaluado para cajero

La tarea evalúa trece identidades de permiso PULSO:

```text
1 acceso de aplicación
11 capacidades atómicas derivadas del frente POS
1 excepción de entrega ya existente
```

Resultado:

```text
PULSO_PERMISSIONS_EVALUATED = 13
CASHIER_GRANTED = 9
CASHIER_NOT_GRANTED = 4
DUPLICATES = 0
UNRESOLVED_DECISIONS = 0
```

---

#### 15. Matriz canónica de cajero

| Permiso | Capacidad | Decisión `cajero_satelite` | Modalidad / prerrequisito | Alcance máximo de esta matriz |
| --- | --- | --- | --- | --- |
| `pulso.access` | entrar a PULSO | ASIGNAR | `OPERATIONAL_ONLY` / `T` | entrada de aplicación dentro del turno; no concede recursos internos |
| `pulso.sales.orders.view` | consultar pedidos necesarios para operar caja | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | pedidos de la sede operativa efectiva y proyección mínima compatible |
| `pulso.sales.orders.create` | crear pedido/venta ordinaria | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | sede operativa efectiva, canal/modalidad admitidos y oferta vigente |
| `pulso.sales.orders.update` | modificar campos ordinarios permitidos del pedido | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | pedido de la sede efectiva, estado editable y columnas permitidas |
| `pulso.sales.orders.cancel` | cancelar pedido | NO ASIGNAR | reservada a `PULSO-AUTH-008` | ninguna concesión desde esta tarea |
| `pulso.payments.transactions.collect` | registrar/cobrar un pago ordinario | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | transacción exacta de un pedido cobrable de la sede y terminal efectivas |
| `pulso.payments.transactions.refund` | reembolsar un pago | NO ASIGNAR | reservada a `PULSO-AUTH-008` | ninguna concesión desde esta tarea |
| `pulso.cash.sessions.start` | iniciar sesión de caja | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | terminal/punto de caja compatible en sede y área operativas efectivas |
| `pulso.cash.sessions.close` | cerrar sesión de caja | NO ASIGNAR | reservada a `PULSO-AUTH-008` | ninguna concesión desde esta tarea |
| `pulso.loyalty.customers.identify` | identificar cliente para la operación actual | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | una identidad presentada dentro del flujo activo y proyección mínima |
| `pulso.loyalty.points.accumulate` | solicitar acumulación por venta elegible | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | venta confirmada, cliente identificado, sede y referencia idempotente |
| `pulso.loyalty.points.redeem` | validar/aplicar redención elegible | ASIGNAR | `OPERATIONAL_ONLY` / `T+C` | redención vigente del cliente, venta/sede compatibles y efecto único |
| `pulso.delivery.deliveries.override` | confirmar entrega excepcionalmente | NO ASIGNAR | `BASE_AND_OPERATIONAL` / `N + T+C` | ninguna concesión ordinaria de cajero |

---

#### 16. Regla de entrada antes del check-in

Únicamente `pulso.access` puede utilizar el prerrequisito operativo:

```text
T
```

Esto permite abrir PULSO durante un turno vigente y mostrar el requisito de marcación o contexto faltante.

Ninguna capacidad interna mutadora o de estado vivo definida aquí funciona solo con `T`.

---

#### 17. Regla de operación ordinaria

Todas las capacidades internas asignadas al cajero requieren:

```text
T+C
```

Es decir:

```text
turno vigente
+
check-in activo
+
rol cajero_satelite
+
sede y área coincidentes
```

El cierre del check-in revoca inmediatamente esas capacidades, aunque el turno continúe vigente.

---

#### 18. Alcance territorial del cajero

Ninguna capacidad interna del cajero obtiene alcance global operativo.

La regla común es:

```text
EFFECTIVE_SCOPE
=
INTERSECCIÓN(
  turno,
  check-in,
  rol operativo,
  sede,
  área cashier,
  dispositivo cuando aplique,
  recurso real,
  concesión,
  denegaciones
)
```

Un `site_id` de URL, formulario o payload solo puede reducir o seleccionar dentro de autoridad ya existente; nunca ampliarla.

---

#### 19. `pulso.sales.orders.view`

Autoriza consulta operativa de pedidos necesarios para caja dentro de la sede efectiva.

Debe limitar:

- sede;
- proyección de cliente;
- datos de entrega;
- datos de pago;
- conversación y facturación a lo estrictamente necesario para la función ordinaria.

No autoriza por sí mismo:

- chat;
- archivo de conversaciones;
- despacho;
- billing mutations;
- transición de estado;
- cancelación;
- refund;
- override.

---

#### 20. `pulso.sales.orders.create`

Autoriza originar una venta o pedido ordinario desde PULSO cuando:

- la oferta esté vigente para sede/canal/modalidad;
- la sede derive del contexto efectivo;
- el cliente pueda ser opcional cuando el proceso lo permita;
- líneas, cantidades, precio y snapshot sean válidos;
- exista identidad idempotente de la operación;
- no se invoque una capacidad reservada.

Crear un pedido no autoriza cobrarlo ni cancelarlo.

---

#### 21. `pulso.sales.orders.update`

Autoriza únicamente modificaciones ordinarias permitidas por el estado del recurso y el contrato de columnas.

Puede cubrir, cuando el proceso lo permita:

- cantidades o notas todavía editables;
- datos ordinarios de la orden antes de efectos incompatibles;
- correcciones no sensibles que no constituyan otra acción empresarial.

No incluye:

```text
cancel
refund
close
assign_dispatch
mark_preparing
mark_ready
mark_in_transit
mark_delivered
delivery override
chat send/archive
billing mutation
manual price override
administrative import
```

Cada capacidad excluida requiere su permiso y propietario correspondiente.

---

#### 22. `pulso.sales.orders.cancel`

La identidad canónica se conserva porque cancelación es una acción empresarial distinta.

Esta tarea decide:

```text
cajero_satelite = NO ASIGNAR
```

Su autoridad, modalidad definitiva, confirmación y segregación pertenecen a:

```text
PULSO-AUTH-008 — Definir permisos de cierre y anulación
```

No se permite emular cancelación mediante `orders.update`.

---

#### 23. `pulso.payments.transactions.collect`

Autoriza cobrar o registrar un pago ordinario sobre una obligación válida del pedido actual.

Debe validar, como mínimo:

- pedido y total cobrable;
- sede y terminal;
- actor efectivo;
- medio de pago soportado;
- monto y moneda;
- estado previo;
- referencia o idempotency key;
- respuesta desconocida antes de cualquier retry.

No autoriza:

- editar una transacción confirmada;
- refund;
- corregir pagos históricos;
- alterar conciliación del proveedor;
- cerrar caja.

---

#### 24. `pulso.payments.transactions.refund`

La devolución de dinero es una capacidad separada de cobro.

Esta tarea decide:

```text
cajero_satelite = NO ASIGNAR
```

La autoridad final pertenece a `PULSO-AUTH-008` y debe conservar motivo, actor, pago original, monto, estado, compensaciones y evidencia.

---

#### 25. `pulso.cash.sessions.start`

Autoriza iniciar una sesión de caja ordinaria sobre un punto/terminal compatible con la sede y área efectivas.

Debe fallar cerrado si existe, entre otros:

- terminal no autorizada;
- sede distinta;
- sesión incompatible ya abierta;
- actor sin check-in;
- rol operativo distinto;
- condición de apertura no cumplida.

Abrir caja no autoriza cerrarla, reabrirla ni corregirla.

---

#### 26. `pulso.cash.sessions.close`

El cierre de caja permanece separado de la apertura.

Esta tarea decide:

```text
cajero_satelite = NO ASIGNAR
```

El cierre, arqueo, diferencias, aprobación, reapertura y correcciones pertenecen a `PULSO-AUTH-008`.

No se permite derivar `close` desde `start` ni desde la propiedad de la sesión.

---

#### 27. `pulso.loyalty.customers.identify`

Autoriza resolver la identidad comercial de un cliente presentado en el flujo actual y recibir una proyección mínima.

Debe conservar:

```text
PULSO = experiencia operativa
PASS = identidad comercial y fidelización
```

No autoriza:

- listar clientes;
- buscar arbitrariamente por datos personales no necesarios;
- editar cliente;
- consultar ledger completo;
- modificar puntos.

---

#### 28. `pulso.loyalty.points.accumulate`

Autoriza solicitar la acumulación de puntos de una venta elegible.

El permiso no cambia ownership:

```text
PULSO solicita
PASS decide y registra ledger
```

La operación debe permanecer:

- server-side;
- territorial;
- atribuible;
- atómica o reconciliable;
- idempotente por referencia empresarial estable.

La materialización de esas garantías pertenece a `PULSO-AUTH-009`.

---

#### 29. `pulso.loyalty.points.redeem`

Autoriza validar y aplicar una redención elegible dentro del flujo de caja.

Debe comprobar:

- cliente;
- recompensa/redención;
- estado vigente;
- sede;
- pedido cuando corresponda;
- actor efectivo;
- idempotencia;
- ausencia de efecto previo incompatible.

La materialización fail-closed pertenece a `PULSO-AUTH-010`.

---

#### 30. Override de entrega

Se conserva:

```text
pulso.delivery.deliveries.override
```

como capacidad excepcional distinta de las operaciones de caja.

`cajero_satelite` no la recibe.

La mera participación del cajero en una venta o entrega no crea autoridad de override.

---

#### 31. Importaciones de ventas

El cajero ordinario no recibe autoridad para:

- abrir una superficie administrativa por inferencia;
- guardar mappings externos;
- cargar/importar XLSX;
- publicar lotes;
- producir efectos de inventario desde importaciones.

`PULSO-AUTH-005` demostró que esas operaciones son separadas y de mayor alcance.

La definición de sus permisos administrativos o de supervisión continúa fuera de esta tarea.

---

#### 32. Salón

`cajero_satelite` no recibe por esta tarea permisos para:

- abrir/cerrar sesiones de mesa;
- asignar mesa o responsable;
- reconocer/resolver/cancelar llamados;
- administrar zonas o mesas.

Un pedido asociado a mesa puede ser visible para cobro cuando el recurso y proceso lo permitan, pero esa visibilidad no convierte al cajero en operador de salón.

---

#### 33. Preparación, fulfillment y despacho

Esta matriz no asigna autoridad para:

- `mark_preparing`;
- `mark_ready`;
- `assign_dispatch`;
- `mark_in_transit`;
- `mark_delivered`;
- generar autoridad de courier;
- ejecutar override de entrega.

Esas acciones representan preparación, logística o excepción y no se absorben dentro de `orders.update`.

---

#### 34. Chat, archivo y facturación

La mera concesión de `orders.view` o `orders.update` no autoriza:

- enviar mensajes al cliente;
- archivar/restaurar conversaciones;
- ejecutar archivo masivo;
- crear o alterar solicitudes de facturación;
- consultar información fuera de la proyección necesaria.

Sus permisos exactos permanecen fuera del conjunto ordinario definido aquí y deberán ser resueltos por la tarea propietaria que los asigne.

---

#### 35. Regalos y checklist operativa

Las operaciones observadas sobre regalo o empaque no se incorporan implícitamente a `orders.update`.

Las acciones:

```text
mark_card_prepared
mark_card_included
mark_price_free_packaging_confirmed
```

permanecen fuera de la matriz ordinaria del cajero hasta que su rol propietario y permiso exacto queden definidos.

---

#### 36. Descuentos y cambio manual de precio

`cajero_satelite` no recibe por inferencia autoridad para:

- descuento manual no preautorizado;
- override de precio;
- cortesía;
- compensación;
- edición retroactiva de importes.

La oferta, promoción o beneficio ya autorizado por contrato puede aplicarse dentro de la creación/cobro ordinarios sin convertirse en un permiso de override.

Las excepciones pertenecen a supervisor o a la tarea sensible correspondiente.

---

#### 37. Regla de denegación por defecto

Para cualquier capacidad PULSO no incluida como `ASIGNAR` en la matriz de esta tarea:

```text
RESULTADO PARA cajero_satelite = DENY
```

No se crean filas `deny` redundantes por cada ausencia de grant.

Una denegación explícita individual, de rol, dispositivo o recurso puede restringir todavía más una concesión positiva.

---

#### 38. Legacy base role `cajero`

La existencia del rol base legacy:

```text
roles.code = cajero
```

y de asignaciones históricas como `pos.main` no puede autorizar operación ordinaria después de la descomposición.

Regla:

```text
LEGACY BASE ROLE
!=
ACTIVE CASHIER OPERATIONAL LANE
```

La operación requiere `cajero_satelite` como rol operativo efectivo o la futura matriz equivalente aprobada.

---

#### 39. Runtime remoto observado

El entorno remoto de desarrollo inspeccionado conserva actualmente para `cajero_satelite` permisos runtime entre los que aparecen:

```text
pulso.access
pulso.pos.main
```

También conserva asignaciones legacy de `pos.main` para el rol base `cajero`.

Este estado es evidencia AS-IS, no el estado objetivo de esta tarea.

No se modifica desde aquí.

---

#### 40. Delta objetivo frente al runtime

La reconciliación futura deberá producir, como mínimo:

```text
pulso.pos.main
→ deja de ser autoridad final

cajero_satelite
→ conserva pulso.access
→ recibe únicamente permisos atómicos ASIGNAR aprobados
→ no recibe cancel/refund/close/delivery.override
→ no recibe importaciones por inferencia

legacy cajero
→ no conserva autoridad operativa por asignaciones amplias históricas
```

No se ejecuta esa reconciliación en esta tarea.

---

#### 41. Coherencia entre capas

Cada permiso atómico materializado deberá conservar la misma identidad en:

```text
navegación
UI/guard
Server Action
servicio de dominio
RPC
RLS cuando corresponda
auditoría
simulación
dispositivo compartido
```

No se permiten strings alternos por capa ni un fallback silencioso a `pulso.pos.main`.

---

#### 42. Actor real y terminal compartida

Una terminal compartida no modifica la matriz de permisos.

La decisión deberá conservar separadas:

```text
principal técnico
actor humano
rol operativo
turno
check-in
sede
área
dispositivo
permiso
recurso
```

Cuando una acción requiera firma humana, la firma debe demostrar al actor sin ampliar sus permisos.

La materialización pertenece a `PULSO-AUTH-012` y `PULSO-AUTH-013`.

---

#### 43. Simulación

Una simulación puede mostrar si `cajero_satelite` tendría una capacidad, pero no puede:

- crear el turno real;
- crear check-in;
- firmar como trabajador;
- ejecutar venta;
- cobrar;
- abrir caja;
- acumular o redimir puntos;
- alterar asignaciones.

La decisión simulada nunca se transforma en autoridad real.

---

#### 44. Frontera PULSO ↔ PASS

Se conserva:

```text
PULSO
→ identifica dentro de la operación
→ solicita acumulación/redención

PASS
→ conserva identidad comercial
→ conserva ledger
→ conserva reglas y estado de fidelización
```

Los permisos `pulso.loyalty.*` protegen la capacidad laboral de PULSO para solicitar la operación, no transfieren ownership del dominio PASS.

---

#### 45. Frontera PULSO ↔ NEXO

Crear o cobrar una venta no concede al cajero permisos generales de inventario.

Los efectos físicos derivados deben ejecutarse mediante el contrato propietario y exactamente una vez.

La matriz NEXO de `cajero_satelite` permanece gobernada por `AUTH-RBAC-008`; esta tarea no la amplía.

---

#### 46. Frontera PULSO ↔ NUMERA

Cobrar o abrir caja en PULSO no concede al cajero autoridad de NUMERA.

```text
HECHO OPERATIVO PULSO
!=
AUTORIDAD FINANCIERA NUMERA
```

NUMERA consume hechos aprobados mediante sus propios contratos y permisos.

---

#### 47. Frontera con proveedor fiscal y pagos

El permiso de cobro no concede:

- acceso a secretos del proveedor;
- administración de credenciales;
- conciliación bancaria;
- numeración fiscal;
- emisión arbitraria fuera del contrato aprobado.

PULSO conserva referencias y estado; proveedores y dominios propietarios conservan sus responsabilidades.

---

#### 48. Idempotencia y resultado desconocido

Toda mutación asignada al cajero deberá distinguir:

```text
SOLICITUD NUEVA
RETRY
REPLAY
CONFLICTO
RESULTADO DESCONOCIDO
```

Regla:

```text
RESULTADO DESCONOCIDO
→ CONSULTAR / RECONCILIAR
→ NO REPETIR CIEGAMENTE
```

El permiso autoriza una intención empresarial; no autoriza duplicar su efecto.

---

#### 49. Auditoría mínima

Toda acción mutadora autorizada al cajero deberá registrar o poder reconstruir:

- actor efectivo;
- principal técnico;
- permiso evaluado;
- rol operativo;
- turno y check-in;
- sede y área;
- terminal/dispositivo cuando aplique;
- recurso;
- estado previo;
- acción solicitada;
- estado o resultado confirmado;
- referencia idempotente;
- error, retry o reconciliación;
- timestamp.

---

#### 50. Matriz de capabilities AS-IS → permiso objetivo

| Evidencia inventariada | Permiso objetivo o decisión |
| --- | --- |
| abrir PULSO | `pulso.access` |
| leer pedidos | `pulso.sales.orders.view` |
| originar pedido/venta ordinaria | `pulso.sales.orders.create` |
| editar campos ordinarios permitidos | `pulso.sales.orders.update` |
| cancelar pedido | `pulso.sales.orders.cancel` — NO ASIGNAR al cajero |
| cobrar pago ordinario | `pulso.payments.transactions.collect` |
| refund | `pulso.payments.transactions.refund` — NO ASIGNAR al cajero |
| abrir sesión de caja | `pulso.cash.sessions.start` |
| cerrar sesión de caja | `pulso.cash.sessions.close` — NO ASIGNAR al cajero |
| identificar cliente | `pulso.loyalty.customers.identify` |
| acumular puntos | `pulso.loyalty.points.accumulate` |
| redimir puntos | `pulso.loyalty.points.redeem` |
| override de entrega | `pulso.delivery.deliveries.override` — NO ASIGNAR |
| mapear/importar/publicar ventas externas | fuera del contrato de cajero |
| operar salón | fuera del contrato de cajero |
| preparación/despacho/entrega | fuera del contrato de cajero |
| chat/archivo/facturación administrativa | fuera del contrato de cajero |

---

#### 51. Propietarios de capacidades no asignadas

| Capacidad | Propietario documental siguiente | Condición de salida |
| --- | --- | --- |
| supervisor y excepciones operativas adicionales | `PULSO-AUTH-007` | matriz explícita de supervisor sin herencia implícita |
| cancelación de pedido | `PULSO-AUTH-008` | permiso, estado, motivo, confirmación y auditoría definidos |
| refund | `PULSO-AUTH-008` | autoridad y compensación vinculadas al pago original |
| cierre/reapertura/corrección de caja | `PULSO-AUTH-008` | cierre segregado, arqueo y aprobación definidos |
| acumulación robusta | `PULSO-AUTH-009` | server-side, territorial, atómica/idempotente y atribuible |
| redención robusta | `PULSO-AUTH-010` | fail-closed, territorial, atómica/idempotente y atribuible |
| límite territorial | `PULSO-AUTH-011` | parámetros cliente incapaces de ampliar sede/área |
| terminal compartida | `PULSO-AUTH-012` | dispositivo integrado sin ampliar autoridad |
| actor ejecutor | `PULSO-AUTH-013` | trabajador real registrado en mutaciones sensibles |
| configuración administrativa | `PULSO-AUTH-014` | configuración separada de operación ordinaria |
| migración del modelo | `PULSO-AUTH-015` | permisos atómicos consumidos por runtime y `pos.main` retirado como autoridad final |
| prueba integral | `PULSO-AUTH-016` | allow/deny, scopes, estado, concurrencia e integración certificados |

No queda capacidad sensible detectada sin propietario de continuidad.

---

#### 52. Hallazgos y propietarios de salida

| Hallazgo | Efecto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `pulso.pos.main` continúa en runtime | autoridad demasiado amplia durante transición | `PULSO-AUTH-015` | consumidores migrados a permisos atómicos y cero fallback final |
| `cajero_satelite` conserva `pulso.pos.main` en desarrollo | matriz runtime no coincide todavía con contrato objetivo | `PULSO-AUTH-015` + materialización RBAC | concesiones atómicas explícitas y retiro controlado del broad grant |
| rol base `cajero` conserva asignaciones legacy | posible bypass permanente si se evalúa carril incorrecto | fundación AUTH + `PULSO-AUTH-015/016` | carril operativo obligatorio y tests de deny sin turno |
| `/sales-imports` usa `pos.main` | cajero broad podría alcanzar administración AS-IS | `PULSO-AUTH-007/014/015` | permisos propios de importación y acceso fail-closed para cajero |
| `/orders` concentra acciones heterogéneas | `orders.view/update` no puede absorber todo | `PULSO-AUTH-007/008/015` | acciones sensibles con permisos propios y guards server-side |
| scanner separa identify/accumulate/redeem | tres decisiones de autoridad distintas | `PULSO-AUTH-009/010/015` | consumidores usan claves exactas y pruebas específicas |
| cash sessions no están materializadas como ciclo completo | permiso `start` es contrato objetivo, no evidencia de implementación | `PULSO-UX-010` + E5 propietario | apertura/cierre implementados y certificados |
| override de entrega ya es granular | confirma patrón de excepción específica | contrato AUTH + `PULSO-AUTH-016` | no asignado al cajero y probado fail-closed |

---

#### 53. Estado del catálogo y del runtime

Esta tarea distingue tres capas:

```text
CATÁLOGO DOCUMENTAL OBJETIVO
→ definido aquí para cajero

RUNTIME DE DESARROLLO ACTUAL
→ conserva broad grants legacy

MATERIALIZACIÓN FUTURA
→ PULSO-AUTH-015 + owners AUTH/E5
```

No se declara que los once permisos nuevos existan todavía físicamente en `app_permissions`.

---

#### 54. Regla de migración segura

La migración de `pulso.pos.main` deberá ser explícita por asignación.

Queda prohibido:

```text
actor tiene pulso.pos.main
→ conceder automáticamente los 11 permisos nuevos
```

Cada rol, excepción o consumidor debe compararse contra su intención real.

Para `cajero_satelite`, la única lista autorizada por esta tarea es la columna `ASIGNAR` de la matriz canónica.

---

#### 55. Regla de compatibilidad temporal

Mientras `pulso.pos.main` continúe físicamente activo por compatibilidad:

- no se considerará prueba de diseño correcto;
- no se usará para ampliar el contrato del cajero;
- no se creará un alias 1→N;
- cualquier compatibilidad deberá ser transitoria, observable y retirada por la tarea propietaria;
- los nuevos consumidores no deberán depender de él cuando exista la capacidad atómica aprobada.

---

#### 56. Pruebas mínimas que hereda la materialización

La implementación posterior deberá demostrar al menos:

- cajero con turno pero sin check-in: puede `pulso.access`, no puede las ocho capacidades internas asignadas;
- cajero con turno y check-in válidos: solo obtiene las nueve concesiones totales aprobadas contando `pulso.access`;
- cajero sin turno: no opera PULSO por rol legacy;
- cajero con `site_id` manipulado: no amplía sede;
- cajero no puede cancelar;
- cajero no puede refund;
- cajero no puede cerrar caja;
- cajero no puede `delivery.override`;
- cajero no puede mapear/importar/publicar ventas externas;
- cajero no obtiene salón, preparación, despacho, chat administrativo o facturación por `orders.update`;
- cliente identificado no expone información fuera de la proyección mínima;
- retry de cobro, acumulación y redención no duplica efecto;
- UI, Server Action, RPC/RLS y simulación producen decisiones compatibles.

---

#### 57. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

Las obligaciones verificables de autorización atómica, contexto operativo, territorio, acciones server-side, pedidos, caja, pagos, importaciones y PULSO ya se encuentran cubiertas por requisitos vigentes.

---

#### 58. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-AUTH-001` — toda capacidad protegida se resuelve por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-002` — todo permiso consumido debe existir en catálogo y respetar convención;
- `TREQ-AUTH-004` — todos los evaluadores deben producir decisiones equivalentes;
- `TREQ-AUTH-008` — capacidades operativas exigen contexto laboral operativo válido;
- `TREQ-AUTH-013` — toda mutación valida permiso exacto, actor, territorio, estado y columnas server-side;
- `TREQ-PULSO-005` — ciclo comercial con identidades y estados separados;
- `TREQ-PULSO-006` — venta, pago, caja, descuento, cancelación, refund y cierre usan acciones nombradas, autorizadas y auditables;
- `TREQ-PULSO-014` — acceso directo a superficies PULSO falla cerrado;
- `TREQ-PULSO-015` — `site_id` no amplía territorio;
- `TREQ-PULSO-016` — abrir `/orders` no concede mutaciones;
- `TREQ-PULSO-017` — abrir `/sales-imports` no concede mapear/importar/publicar;
- `TREQ-PULSO-018` — salón separa lectura y acciones por actor/estado;
- `TREQ-PULSO-024` — infraestructura existente no prueba autorización completa;
- `TREQ-PULSO-026` — permiso observado se mantiene separado de suficiencia contractual.

La enumeración es trazabilidad y no actualiza el Registro 04A.

---

#### 59. Fuentes canónicas principales consumidas

La decisión se apoya en:

- inventarios aprobados `PULSO-AUTH-002..005`;
- `AUTH-CAT-002/003` para convención y descomposición de `pulso.pos.main`;
- `AUTH-CAT-006..012` para modalidad, clasificación, alcance y prerrequisitos;
- `AUTH-RBAC-008` para la matriz vigente de `cajero_satelite`;
- `CAP-SCOPE-009` para separación de pedido, venta, pago, caja y acciones sensibles;
- `PULSO-UX-001` para universo funcional y pantallas canónicas;
- Registro 04A vigente para AUTH y PULSO;
- runtime remoto de desarrollo únicamente como evidencia AS-IS.

---

#### 60. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; no existen cambios físicos de consumidor |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico |
| REMOTA | PASS | se verificaron fuentes canónicas en `vento-shell`, contratos de catálogo/RBAC, inventarios PULSO, 04A, código PULSO relevante y estado read-only de permisos en Supabase dev |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron ventas, cobros, aperturas, puntos, cancelaciones, refunds ni acciones reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida coherencia documental y estado AS-IS; no certifica que el runtime ya consuma la matriz objetivo.

---

#### 61. Criterios de aceptación

- [ ] `pulso.access` permanece separado de cualquier capacidad interna.
- [ ] `pulso.pos.main` queda declarado `DECOMPOSE_REQUIRED` sin alias directo.
- [ ] Se definen exactamente once capacidades atómicas derivadas del frente POS.
- [ ] `pulso.loyalty.customers.identify` queda separado de acumulación y redención.
- [ ] Se evalúan exactamente trece permisos PULSO para `cajero_satelite` contando acceso y override existente.
- [ ] Exactamente nueve permisos quedan `ASIGNAR` al cajero contando `pulso.access`.
- [ ] Exactamente cuatro permisos quedan `NO ASIGNAR`.
- [ ] `pulso.access` usa `T`.
- [ ] Toda capacidad interna asignada usa `T+C`.
- [ ] No existe alcance operativo global.
- [ ] `orders.update` no absorbe cancelación, preparación, despacho, entrega, chat, facturación ni override.
- [ ] `payments.collect` no absorbe refund ni corrección histórica.
- [ ] `cash.sessions.start` no absorbe close/reopen.
- [ ] cancelación, refund y cierre quedan reservados a `PULSO-AUTH-008`.
- [ ] `pulso.delivery.deliveries.override` permanece fuera del rol.
- [ ] importaciones permanecen fuera del contrato ordinario de cajero.
- [ ] salón permanece fuera del contrato ordinario de cajero.
- [ ] preparación, fulfillment y despacho no se conceden por inferencia.
- [ ] chat, archivo y facturación administrativa no se conceden por inferencia.
- [ ] legacy `cajero` no autoriza el carril operativo.
- [ ] la asignación runtime actual de `pulso.pos.main` no se trata como estado objetivo.
- [ ] no se crean ni modifican requisitos de prueba.
- [ ] no se ejecutan cambios físicos.

---

#### 62. Límites

Esta tarea no:

- modifica el catálogo runtime de permisos;
- inserta los once permisos en Supabase;
- modifica `operational_role_permissions`;
- retira `pulso.pos.main`;
- elimina asignaciones del rol base `cajero`;
- cambia RLS;
- cambia RPC;
- modifica Server Actions;
- cambia guards;
- modifica navegación;
- implementa caja;
- implementa pagos;
- implementa apertura o cierre de caja;
- implementa cancelaciones;
- implementa refunds;
- modifica órdenes;
- modifica scanner;
- modifica loyalty;
- modifica PASS;
- modifica NEXO;
- modifica NUMERA;
- define permisos de supervisor;
- define la autoridad final de cierre/anulación;
- define permisos administrativos de importación;
- define permisos de salón;
- define permisos de preparación, despacho o chat;
- crea migraciones;
- modifica Supabase remoto;
- modifica el Registro 04A;
- crea instancia física;
- ejecuta E5.

---

#### 63. Handoff a PULSO-AUTH-007

`PULSO-AUTH-007 — Definir permisos de supervisor` recibe:

- el conjunto ordinario de cajero ya cerrado;
- la prohibición de heredar supervisor como “cajero + todo” por inferencia;
- importaciones sin autoridad de cajero;
- despacho/chat/facturación y otras capacidades observadas aún sin grant ordinario;
- necesidad de definir únicamente elevaciones explícitas de supervisor;
- continuidad de denegación por defecto.

El supervisor deberá declarar sus permisos de forma independiente y no mediante wildcard o `pos.main`.

---

#### 64. Handoff a PULSO-AUTH-008

`PULSO-AUTH-008 — Definir permisos de cierre y anulación` recibe explícitamente:

```text
pulso.sales.orders.cancel
pulso.payments.transactions.refund
pulso.cash.sessions.close
```

junto con:

- separación semántica entre cancelación, anulación, devolución, refund y cierre;
- necesidad de confirmación/motivo cuando corresponda;
- autoridad para arqueo, diferencias, reapertura o corrección todavía no definida;
- prohibición de derivar esas capacidades desde `orders.update`, `collect` o `start`.

---

#### 65. Handoff a PULSO-AUTH-009..016

Las tareas posteriores reciben:

```text
009 → materializar acumulación protegida
010 → materializar redención protegida
011 → hacer vinculante el límite territorial del turno
012 → integrar terminal compartida sin ampliar autoridad
013 → registrar al trabajador efectivo
014 → mantener configuración administrativa separada
015 → migrar consumidores/runtime a permisos atómicos y retirar broad authority
016 → certificar allow/deny, scope, actor, estado, concurrencia e integración
```

Ninguna de estas materializaciones se ejecuta aquí.

---

#### 66. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-005 — Inventariar importaciones`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-006 — Definir permisos de cajero`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-007 — Definir permisos de supervisor`
### ✅ PULSO-AUTH-007 — Definir permisos de supervisor

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-006 — Definir permisos de cajero
**Tarea siguiente:** PULSO-AUTH-008 — Definir permisos de cierre y anulación
**Tipo de tarea:** definición documental del contrato de autorización del perfil supervisor de PULSO, reconciliando el rol base `supervisor` con el carril operativo `gerencia_operativa`, definiendo capacidades atómicas de consulta y coordinación sobre pedidos, caja, pagos, salón, conversaciones, facturación visible, entregas e importaciones, sin heredar autoridad de `cajero_satelite`, sin reutilizar `pulso.pos.main`, sin convertir supervisión en ejecución física ni absorber cierre, cancelación, refund, loyalty, configuración administrativa o materialización; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, catálogo runtime de permisos, roles, matrices runtime, RLS, RPC, funciones, Server Actions, páginas, datos, Supabase, migraciones, packages, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada qué capacidades PULSO corresponden al perfil supervisor durante la coordinación operativa de una sede, sin convertir el rol base `supervisor`, el rol operativo `gerencia_operativa`, la jerarquía administrativa, `pulso.access` o la visibilidad de una pantalla en autorización implícita para vender, cobrar, cerrar caja, cancelar, reembolsar, ejecutar loyalty, mutar importaciones o sustituir a los actores físicos responsables.

La tarea resuelve:

- qué identidad contractual representa supervisión dentro de PULSO;
- cómo se separan el rol base `supervisor` y el rol operativo `gerencia_operativa`;
- qué permisos PULSO recibe el carril operativo de supervisión;
- qué capacidades son únicamente lectura o coordinación;
- qué capacidades ordinarias de cajero no se heredan;
- qué acciones observadas en pedidos, salón, chat, delivery e importaciones permanecen denegadas;
- qué parte de `pulso.delivery.deliveries.override` puede aportar `gerencia_operativa` sin autorizar el override final;
- qué territorio, recurso y estado limitan cada concesión;
- qué hallazgos se entregan a `PULSO-AUTH-008..016`.

---

#### 2. Handoff recibido de PULSO-AUTH-006

`PULSO-AUTH-006` entrega a esta tarea:

- un conjunto ordinario de cajero cerrado;
- `pulso.pos.main` declarado `DECOMPOSE_REQUIRED`, sin alias directo ni expansión automática;
- once capacidades atómicas del frente POS más `pulso.access` y el override de entrega existente;
- nueve concesiones ordinarias para `cajero_satelite` contando `pulso.access`;
- cancelación, refund y cierre reservados a `PULSO-AUTH-008`;
- importaciones, salón, preparación, despacho, chat administrativo y facturación fuera del contrato ordinario de cajero;
- la prohibición de construir supervisor como `cajero_satelite + todo`.

Regla heredada:

```text
SUPERVISOR
!=
CAJERO + WILDCARD
```

---

#### 3. Handoffs acumulados de PULSO-AUTH-002..005

Los inventarios aprobados entregan las siguientes fronteras:

- `/orders` contiene lectura, transiciones, despacho, conversaciones, facturación visible e historial como capacidades diferentes;
- `/salon` contiene zonas, mesas, sesiones y llamados con lecturas y mutaciones distintas;
- scanner, identificación, acumulación y redención son decisiones de autoridad independientes;
- `/sales-imports` separa visibilidad, mappings, ingestión y publicación;
- `site_id` es contexto y nunca autoridad;
- `pos.main` es evidencia AS-IS y no diseño final;
- toda mutación sensible necesita permiso exacto, actor, territorio, recurso, estado y contrato server-side.

Esta tarea consume esas fronteras sin fusionarlas bajo un permiso supervisor genérico.

---

#### 4. Naturaleza y topología

La topología vigente es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el contrato se define una sola vez;
- no existe instancia física propia;
- no se siembran permisos;
- no se crea el rol base `supervisor` en runtime;
- no se modifica `gerencia_operativa` en Supabase;
- no se cambia `operational_role_permissions`;
- no se cambia `role_permissions`;
- no se retira `pulso.pos.main` físicamente;
- no se alteran guards, RPC, RLS ni Server Actions;
- no se ejecutan acciones reales de PULSO.

---

#### 5. Dos identidades que deben permanecer separadas

La palabra supervisor aparece en dos planos diferentes:

```text
ROL BASE
supervisor

ROL OPERATIVO DE COORDINACIÓN
gerencia_operativa
```

No son equivalentes.

```text
supervisor
!=
gerencia_operativa
```

El rol base representa autoridad administrativa local limitada y permanente mientras sus asignaciones sean válidas.

`gerencia_operativa` representa coordinación temporal de la jornada dentro de un turno y territorio operativos válidos.

---

#### 6. Regla del rol base `supervisor`

La matriz aprobada `AUTH-RBAC-004` establece que el rol base `supervisor`:

- no recibe `pulso.access`;
- no recibe por defecto el componente base de `pulso.delivery.deliveries.override`;
- no obtiene capacidades `OPERATIONAL_ONLY`;
- puede recibir únicamente capacidades administrativas compatibles con su matriz y alcance territorial.

Esta tarea no modifica esa decisión.

Por tanto:

```text
employees.role = supervisor
!=
AUTORIZACIÓN OPERATIVA PULSO
```

---

#### 7. Regla del rol operativo `gerencia_operativa`

La matriz aprobada `AUTH-RBAC-019` establece que `gerencia_operativa`:

- coordina temporalmente la operación;
- recibe `pulso.access` en el carril operativo;
- aporta el componente operativo de `pulso.delivery.deliveries.override`;
- no recibe por inferencia ventas, cobros, caja, pedidos ni cierres;
- requiere permisos atómicos nuevos para supervisar PULSO.

Esta tarea cierra esa brecha para el perfil supervisor PULSO.

---

#### 8. Perfil contractual `PULSO_SUPERVISOR`

Para esta tarea, el perfil supervisor PULSO se materializa conceptualmente así:

```text
ACTOR HUMANO IDENTIFICADO
+ EMPLEADO ACTIVO
+ TURNO PUBLICADO Y VIGENTE
+ ROL OPERATIVO EFECTIVO gerencia_operativa
+ SEDE ACTIVA AUTORIZADA
+ ÁREA GENERAL O ÁREA COMPATIBLE
+ CHECK-IN CUANDO EL PERMISO LO EXIJA
+ PERMISO ATÓMICO EXPLÍCITO
+ RECURSO RELACIONADO CON LA JORNADA
+ AUSENCIA DE DENEGACIÓN SUPERIOR
= SUPERVISIÓN PULSO POSIBLE
```

El rol base del trabajador puede ser `supervisor`, `gerente`, `gerente_general`, `propietario` u otro rol compatible con la asignación de `gerencia_operativa`; ese rol base no sustituye el carril operativo.

---

#### 9. No existe herencia entre carriles

Queda prohibido:

```text
supervisor base
→ hereda gerencia_operativa
```

También queda prohibido:

```text
gerencia_operativa
→ hereda todos los permisos base de supervisor
```

Cada carril conserva:

- concesiones;
- modalidad;
- alcance;
- vigencia;
- denegaciones;
- evidencia;
- auditoría.

---

#### 10. No existe herencia desde cajero

`gerencia_operativa` no recibe automáticamente las capacidades ordinarias concedidas a `cajero_satelite`.

Por tanto:

```text
cajero_satelite puede cobrar
!=
gerencia_operativa puede cobrar
```

```text
cajero_satelite puede abrir caja
!=
gerencia_operativa puede abrir caja
```

```text
cajero_satelite puede ejecutar loyalty
!=
gerencia_operativa puede ejecutar loyalty
```

La matriz de esta tarea enumera cada decisión explícitamente.

---

#### 11. `pulso.access` continúa siendo entrada, no autoridad interna

Se conserva:

```text
pulso.access
```

como capacidad para entrar a PULSO durante un turno válido.

No concede:

- lectura de pedidos;
- lectura de caja;
- lectura de pagos;
- salón;
- conversaciones;
- facturación;
- delivery;
- importaciones;
- venta;
- cobro;
- cierre;
- cancelación;
- refund;
- loyalty.

---

#### 12. `pulso.pos.main` continúa retirado del diseño objetivo

Esta tarea conserva la decisión:

```text
pulso.pos.main
=
LEGACY_BROAD_PERMISSION
DECOMPOSE_REQUIRED
NO_DIRECT_CANONICAL_ALIAS
NO_AUTOMATIC_GRANT_EXPANSION
```

No se crea un `pulso.supervisor.main` ni otro permiso broad equivalente.

---

#### 13. Convención de permisos aplicada

Toda capacidad funcional nueva utiliza:

```text
app.module.resource.action
```

Módulos utilizados:

```text
sales
payments
cash
delivery
```

Acciones utilizadas:

```text
view
assign
```

No se introduce una acción nueva en el vocabulario contractual.

---

#### 14. Permisos heredados de PULSO-AUTH-006

Se reutilizan las trece identidades ya evaluadas en la tarea anterior:

```text
pulso.access
pulso.sales.orders.view
pulso.sales.orders.create
pulso.sales.orders.update
pulso.sales.orders.cancel
pulso.payments.transactions.collect
pulso.payments.transactions.refund
pulso.cash.sessions.start
pulso.cash.sessions.close
pulso.loyalty.customers.identify
pulso.loyalty.points.accumulate
pulso.loyalty.points.redeem
pulso.delivery.deliveries.override
```

Esta tarea no renombra ni cambia su significado.

---

#### 15. Capacidades nuevas de supervisión

Se definen once identidades adicionales para separar lectura y coordinación supervisoras:

```text
pulso.cash.sessions.view
pulso.payments.transactions.view
pulso.sales.table_sessions.view
pulso.sales.service_calls.view
pulso.sales.service_calls.assign
pulso.sales.conversations.view
pulso.sales.billing_requests.view
pulso.delivery.deliveries.view
pulso.delivery.deliveries.assign
pulso.sales.import_batches.view
pulso.sales.import_mappings.view
```

Estas claves no existen todavía como afirmación de runtime. Son contrato documental objetivo.

---

#### 16. Cardinalidad del contrato evaluado

El universo evaluado para el perfil supervisor es:

```text
13 permisos heredados de PULSO-AUTH-006
+ 11 capacidades nuevas de supervisión
= 24 identidades
```

Resultado:

```text
PULSO_SUPERVISOR_PERMISSIONS_EVALUATED = 24
SUPERVISOR_DIRECT_GRANTED = 13
SUPERVISOR_OPERATIONAL_COMPONENT_ONLY = 1
SUPERVISOR_NOT_GRANTED = 10
DUPLICATES = 0
UNRESOLVED_SUPERVISOR_DECISIONS = 0
```

---

#### 17. Matriz canónica de supervisor PULSO

| Permiso | Capacidad | Decisión `gerencia_operativa` | Modalidad / prerrequisito | Alcance máximo de esta matriz |
| --- | --- | --- | --- | --- |
| `pulso.access` | entrar a PULSO | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T` | entrada a PULSO dentro del turno; no concede recursos internos |
| `pulso.sales.orders.view` | consultar pedidos de la sede coordinada | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | pedidos de la sede/jornada efectiva con proyección supervisora mínima |
| `pulso.sales.orders.create` | crear pedido/venta | NO ASIGNAR | contrato de cajero/especialista | ninguna concesión por supervisión |
| `pulso.sales.orders.update` | modificar pedido | NO ASIGNAR | contrato de cajero/especialista | ninguna concesión por supervisión |
| `pulso.sales.orders.cancel` | cancelar pedido | NO ASIGNAR | reservada a `PULSO-AUTH-008` | ninguna concesión desde esta tarea |
| `pulso.payments.transactions.collect` | cobrar pago | NO ASIGNAR | contrato de cajero | ninguna concesión por supervisión |
| `pulso.payments.transactions.refund` | reembolsar pago | NO ASIGNAR | reservada a `PULSO-AUTH-008` | ninguna concesión desde esta tarea |
| `pulso.cash.sessions.start` | abrir caja | NO ASIGNAR | contrato de cajero | ninguna concesión por supervisión |
| `pulso.cash.sessions.close` | cerrar caja | NO ASIGNAR | reservada a `PULSO-AUTH-008` | ninguna concesión desde esta tarea |
| `pulso.loyalty.customers.identify` | identificar cliente | NO ASIGNAR | contrato de cajero/flujo de cliente | ninguna concesión por supervisión |
| `pulso.loyalty.points.accumulate` | acumular puntos | NO ASIGNAR | contrato de cajero + PASS | ninguna concesión por supervisión |
| `pulso.loyalty.points.redeem` | redimir puntos | NO ASIGNAR | contrato de cajero + PASS | ninguna concesión por supervisión |
| `pulso.delivery.deliveries.override` | confirmar entrega excepcionalmente | ASIGNAR SOLO COMPONENTE OPERATIVO | `BASE_AND_OPERATIONAL` / `N + T+C` | entrega exacta de la sede activa; sin componente base no existe autorización final |
| `pulso.cash.sessions.view` | consultar estado de sesiones de caja | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | sesiones de caja de la sede/jornada efectivas, sin mutación |
| `pulso.payments.transactions.view` | consultar pagos relacionados con operación local | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | transacciones de pedidos/sesiones de la sede con proyección mínima y referencias enmascaradas |
| `pulso.sales.table_sessions.view` | consultar zonas, mesas y sesiones operativas | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | salón de la sede efectiva; configuración administrativa excluida |
| `pulso.sales.service_calls.view` | consultar llamados de servicio | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | llamados de la sede efectiva y estado operativo visible |
| `pulso.sales.service_calls.assign` | asignar responsable inicial de un llamado | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | llamado activo no resuelto de la sede efectiva; actor destino elegible |
| `pulso.sales.conversations.view` | consultar conversaciones de pedidos | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | conversaciones de pedidos visibles de la sede; datos mínimos |
| `pulso.sales.billing_requests.view` | consultar estado de solicitudes de facturación | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | solicitudes vinculadas a pedidos de la sede; sin emitir ni corregir documento fiscal |
| `pulso.delivery.deliveries.view` | consultar cumplimiento y entregas | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | entregas relacionadas con pedidos de la sede y proyección mínima de cliente/tercero |
| `pulso.delivery.deliveries.assign` | realizar asignación inicial de despacho/entrega | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | entrega no asignada y todavía no bajo custodia/tránsito; sin reasignación de emergencia |
| `pulso.sales.import_batches.view` | consultar lotes de importación y su estado | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | lotes de la sede, métricas, errores y estado; sin publicar efecto |
| `pulso.sales.import_mappings.view` | consultar mappings externos vigentes | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | mappings aplicables a la sede para diagnóstico; sin modificación |

---

#### 18. Regla de entrada antes del check-in

`pulso.access` conserva el prerrequisito:

```text
T
```

Esto permite abrir PULSO durante un turno vigente y mostrar el estado del contexto.

Las capacidades internas de supervisión definidas aquí requieren:

```text
T+C
```

cuando el contrato operativo aplicable exige presencia activa.

---

#### 19. Alcance territorial del supervisor operativo

Ninguna capacidad de esta matriz recibe alcance global.

Regla común:

```text
EFFECTIVE_SCOPE
=
INTERSECCIÓN(
  turno,
  check-in aplicable,
  gerencia_operativa,
  sede activa,
  área compatible,
  recurso real,
  concesión,
  denegaciones
)
```

La cobertura base multisede de una persona no amplía el territorio operativo del turno actual.

---

#### 20. `pulso.sales.orders.view`

Autoriza al supervisor operativo a consultar pedidos necesarios para coordinar la jornada.

Puede incluir:

- identidad de pedido;
- canal y modalidad;
- líneas y estado;
- preparación y fulfillment visibles;
- estado de pago resumido;
- despacho visible;
- historial necesario para diagnóstico;
- cliente mínimo cuando sea necesario.

No autoriza ninguna mutación.

---

#### 21. `pulso.cash.sessions.view`

Autoriza lectura del estado de caja necesario para supervisión local.

Puede incluir:

- sesión;
- terminal;
- actor de apertura;
- estado;
- fondo inicial cuando la política lo permita;
- totales operativos necesarios;
- pendientes;
- diferencia visible cuando el contrato de cierre lo permita.

No autoriza:

- abrir;
- cerrar;
- reabrir;
- aprobar diferencia;
- corregir movimientos.

---

#### 22. `pulso.payments.transactions.view`

Autoriza lectura de pagos relacionados con pedidos o sesiones dentro de la jornada supervisada.

La proyección debe limitarse a:

- monto;
- moneda;
- medio;
- estado;
- proveedor;
- referencia enmascarada;
- timestamps;
- relación con pedido/sesión.

No expone secretos, credenciales, tokens, datos completos de tarjeta ni información financiera ajena a la sede.

---

#### 23. `pulso.sales.table_sessions.view`

Autoriza lectura operativa de:

- zonas visibles;
- mesas;
- sesiones abiertas;
- ocupación derivada;
- relación mínima con pedidos/cuentas.

No autoriza configuración de zona o mesa.

Regla:

```text
SALON_VIEW
!=
SALON_CONFIGURATION
```

---

#### 24. `pulso.sales.service_calls.view`

Autoriza consultar llamados activos y su estado dentro de la sede operativa efectiva.

La lectura puede incluir:

- mesa;
- sesión;
- tipo;
- prioridad;
- estado;
- actor creador cuando corresponda;
- actor asignado cuando exista;
- timestamps.

No cambia el estado del llamado.

---

#### 25. `pulso.sales.service_calls.assign`

Autoriza una acción de coordinación específica:

```text
ASIGNAR RESPONSABLE
```

Debe exigir:

- llamado activo;
- sede coincidente;
- actor destino elegible y presente cuando corresponda;
- control de versión/estado;
- atribución del supervisor;
- timestamp de servidor;
- auditoría.

No implica:

- reconocer en nombre del actor;
- resolver;
- cancelar;
- crear un llamado;
- cambiar la mesa o sesión.

---

#### 26. Llamado: asignación, reconocimiento y resolución no son equivalentes

Se conserva:

```text
assign
!=
acknowledge
!=
resolve
!=
cancel
```

Esta tarea concede únicamente `assign` al supervisor.

Reconocimiento, resolución y cancelación permanecen denegados por defecto para `gerencia_operativa` mientras no exista una matriz explícita posterior que los asigne.

---

#### 27. `pulso.sales.conversations.view`

Autoriza consultar conversaciones de pedidos visibles dentro de la sede supervisada.

La lectura debe minimizar:

- datos personales;
- histórico innecesario;
- tokens;
- metadatos técnicos;
- conversaciones de otras sedes.

No autoriza:

- enviar mensajes;
- archivar;
- restaurar;
- archivar masivamente;
- notificar.

---

#### 28. Mutaciones de conversación permanecen fuera

Las operaciones observadas de:

- persistir mensajes;
- marcar lectura;
- archivar/restaurar;
- archivar masivamente;
- invocar notificación;

no se conceden desde esta tarea.

La coexistencia actual de callers cliente/servidor debe reconciliarse antes de introducir una concesión supervisor de escritura.

---

#### 29. `pulso.sales.billing_requests.view`

Autoriza consultar el estado visible de solicitudes de facturación vinculadas a pedidos de la sede.

Puede exponer únicamente los campos necesarios para seguimiento operativo.

No autoriza:

- emitir factura;
- cambiar número fiscal;
- cambiar tercero;
- corregir impuestos;
- anular documento;
- alterar proveedor fiscal.

---

#### 30. `pulso.delivery.deliveries.view`

Autoriza supervisar el cumplimiento de pedidos de cliente y el estado de entregas de la sede.

Puede incluir:

- pedido;
- modalidad;
- asignación;
- estado;
- timestamps;
- prueba mínima;
- incidencia;
- datos de destinatario estrictamente necesarios.

No convierte al supervisor en conductor, domiciliario o receptor.

---

#### 31. `pulso.delivery.deliveries.assign`

Autoriza únicamente la asignación inicial de una entrega todavía no bajo custodia o tránsito.

Debe validar:

- pedido y entrega elegibles;
- sede;
- estado previo;
- actor/tercero destino elegible;
- disponibilidad cuando exista contrato;
- versión;
- idempotencia;
- auditoría.

No autoriza reasignación de emergencia después de aceptar custodia, iniciar tránsito o registrar prueba de entrega.

---

#### 32. Reasignación de emergencia permanece denegada

`AUTH-RBAC-019` registró expresamente que la reasignación operativa de emergencia no tiene todavía una capacidad atómica aprobada.

Esta tarea no la inventa como parte de `deliveries.assign`.

Regla:

```text
INITIAL_ASSIGNMENT
!=
EMERGENCY_REASSIGNMENT
```

La reasignación posterior requiere contrato propio de proceso, autoridad, vigencia y auditoría.

---

#### 33. Transiciones físicas de entrega permanecen fuera

La supervisión no concede por inferencia:

- iniciar tránsito;
- marcar llegada;
- registrar entrega;
- aceptar recepción;
- devolver;
- cerrar entrega.

Esas acciones pertenecen a actores operativos o excepciones específicas.

---

#### 34. `pulso.sales.import_batches.view`

Autoriza consultar lotes de importación de la sede y su estado de reconciliación.

Puede incluir:

- identidad del lote;
- hash de archivo;
- estado;
- conteos;
- errores;
- warnings;
- actor importador;
- timestamps;
- estado de publicación;
- resultado resumido.

No autoriza ingestión ni publicación.

---

#### 35. `pulso.sales.import_mappings.view`

Autoriza consultar mappings externos vigentes necesarios para diagnosticar un lote de la sede.

No autoriza:

- crear mapping;
- cambiar mapping;
- desactivar mapping;
- alterar catálogo;
- cambiar site_id;
- mapear un ítem para publicar un efecto.

La modificación de mappings pertenece a configuración administrativa y continúa en `PULSO-AUTH-014`.

---

#### 36. Mutaciones de importación permanecen fuera

El supervisor no recibe por esta tarea autoridad para:

```text
saveMakosMapping
importDailySales
postDailySalesImport
```

Regla:

```text
IMPORT_STATUS_VIEW
!=
MAPPING_AUTHORITY
!=
IMPORT_AUTHORITY
!=
PUBLISH_AUTHORITY
```

La separación contractual continúa hacia `PULSO-AUTH-014/015/016` y los contratos de integración propietarios.

---

#### 37. `pulso.sales.orders.create` no se concede

Crear pedidos o ventas corresponde al rol operativo de caja u otro actor especializado.

`gerencia_operativa` no recibe `orders.create` por jerarquía, ausencia de cajero ni contingencia ordinaria.

Si una persona supervisora debe cubrir caja, deberá asumir `cajero_satelite` o una excepción individual válida; no se expande esta matriz.

---

#### 38. `pulso.sales.orders.update` no se concede

La capacidad ordinaria de actualización de pedido no se concede a supervisor porque mezcla campos y estados propios de la ejecución de venta.

La supervisión puede observar y coordinar, pero una corrección específica debe tener una capacidad empresarial exacta.

Regla:

```text
SUPERVISE
!=
MUTATE_ORDER_GENERICALLY
```

---

#### 39. `pulso.sales.orders.cancel` no se concede

Cancelación permanece reservada a:

```text
PULSO-AUTH-008
```

La jerarquía de supervisor no sustituye permiso, estado, motivo, confirmación, segregación ni auditoría.

---

#### 40. `pulso.payments.transactions.collect` no se concede

Cobrar es ejecución operativa de caja.

La supervisión puede consultar la transacción mediante `pulso.payments.transactions.view`, pero no cobrar en nombre del cajero.

---

#### 41. `pulso.payments.transactions.refund` no se concede

Refund permanece reservado a `PULSO-AUTH-008`.

No se deriva desde la capacidad de visualizar pagos ni desde responsabilidad administrativa local.

---

#### 42. `pulso.cash.sessions.start` no se concede

Abrir caja pertenece al actor de caja responsable.

El supervisor puede consultar el estado mediante `pulso.cash.sessions.view`.

No puede abrir una sesión por ausencia del cajero sin asumir el rol operativo apropiado o una excepción válida.

---

#### 43. `pulso.cash.sessions.close` no se concede

Cierre, arqueo, diferencia, aprobación, reapertura y corrección permanecen en `PULSO-AUTH-008`.

La lectura supervisor de caja no autoriza el cierre.

---

#### 44. Loyalty operativo no se concede

No se asignan a `gerencia_operativa`:

```text
pulso.loyalty.customers.identify
pulso.loyalty.points.accumulate
pulso.loyalty.points.redeem
```

Son capacidades del flujo de venta/cliente y no funciones generales de supervisión.

El supervisor puede revisar efectos confirmados únicamente cuando otra proyección autorizada los exponga como parte del recurso supervisado, sin adquirir ownership de PASS.

---

#### 45. `pulso.delivery.deliveries.override`

Se conserva la decisión aprobada de `AUTH-RBAC-019`:

```text
gerencia_operativa
→ ASIGNAR COMPONENTE OPERATIVO
```

Pero:

```text
COMPONENTE OPERATIVO
!=
AUTORIZACIÓN FINAL
```

La autorización final exige además:

- componente base compatible;
- reautenticación;
- motivo;
- evidencia de entrega;
- prevención de autoaprobación;
- territorio coincidente;
- auditoría reforzada.

---

#### 46. El rol base `supervisor` no completa el override por defecto

`AUTH-RBAC-004` no concede el componente base de `pulso.delivery.deliveries.override` al rol base `supervisor`.

Por tanto, una persona con:

```text
employees.role = supervisor
+
operational_role = gerencia_operativa
```

continúa sin poder ejecutar el override final por defecto.

Se requeriría una concesión base adicional válida o una excepción individual aprobada.

---

#### 47. Configuración administrativa permanece separada

La supervisión no incluye modificar:

- zonas;
- mesas;
- layout;
- mappings de importación;
- reglas de consumo;
- catálogo;
- canales;
- dispositivos;
- terminales;
- permisos;
- matrices;
- RLS;
- parámetros globales.

Estas responsabilidades continúan en `PULSO-AUTH-014` y propietarios transversales.

---

#### 48. No existe alcance global operativo

Aunque una persona tenga rol base `gerente_general` o `propietario`, el carril `gerencia_operativa` continúa limitado a su contexto operativo efectivo.

Queda prohibido:

```text
BASE_GLOBAL
+
gerencia_operativa
→ PULSO_GLOBAL
```

La unión no amplía la sede del turno.

---

#### 49. Cobertura administrativa multisede no amplía la jornada

Una persona con varias sedes administrativas asignadas puede supervisar administrativamente esas sedes conforme a sus permisos base.

Pero dentro de PULSO operativo:

```text
ACTIVE_OPERATIONAL_SITE = 1 contexto resuelto
```

salvo un contrato posterior explícito de coordinación multisede.

Esta tarea no crea supervisión operativa simultánea de varias sedes.

---

#### 50. Actor efectivo

Toda acción de coordinación mutadora autorizada debe quedar atribuida al trabajador humano efectivo.

En terminal compartida:

```text
PRINCIPAL TÉCNICO
!=
ACTOR HUMANO
```

`PULSO-AUTH-012` y `PULSO-AUTH-013` deben materializar esa separación.

---

#### 51. Dispositivo compartido no amplía autoridad

Un dispositivo configurado como POS, terminal de gerencia o estación compartida puede restringir capacidades, pero nunca concederlas.

```text
ACTOR PERMISSION
∩ DEVICE CAPABILITIES
```

Nunca:

```text
DEVICE CAPABILITY
→ ACTOR PERMISSION
```

---

#### 52. Server-side obligatorio

Ocultar un botón o una ruta no satisface la autorización.

Toda mutación futura de esta matriz debe verificar server-side:

- permiso exacto;
- actor efectivo;
- rol operativo;
- turno/check-in;
- sede;
- recurso;
- estado actual;
- columnas permitidas;
- versión;
- idempotencia;
- denegaciones.

---

#### 53. RLS no sustituye permiso empresarial

Una política RLS que permita por empleado, sede o `pos.main` no demuestra que la acción empresarial esté autorizada.

La materialización posterior debe alinear:

```text
UI
GUARD
SERVER ACTION
RPC
RLS
AUDITORÍA
```

con la misma PermissionKey.

---

#### 54. Estado runtime observado de `supervisor`

En Supabase dev, el catálogo base observado no contiene actualmente:

```text
roles.code = supervisor
```

Sí existen:

```text
gerente
gerente_general
```

La ausencia runtime del rol base `supervisor` no invalida la matriz documental `AUTH-RBAC-004`, pero confirma que esta tarea no puede tratarlo como actor físicamente materializado.

---

#### 55. Estado runtime observado de `gerencia_operativa`

Supabase dev sí contiene:

```text
operational_roles.code = gerencia_operativa
```

activo.

El dataset observado conserva permisos NEXO legacy y no demuestra todavía los permisos PULSO objetivo definidos por esta tarea.

Por tanto:

```text
ROLE_EXISTS
!=
PULSO_SUPERVISOR_MATRIX_MATERIALIZED
```

---

#### 56. Estado runtime observado de permisos PULSO

El catálogo remoto de desarrollo conserva únicamente como claves PULSO físicas observadas:

```text
pulso.access
pulso.delivery.override
pulso.pos.main
```

Las capacidades atómicas documentadas en `PULSO-AUTH-006/007` no se declaran materializadas por su sola definición.

La materialización pertenece a `PULSO-AUTH-015` y a las fundaciones AUTH propietarias.

---

#### 57. Regla de migración segura

Queda prohibido migrar una asignación broad mediante:

```text
pulso.pos.main
→ copiar todos los permisos de cajero
→ copiar todos los permisos de supervisor
```

Cada grant nuevo debe provenir de una decisión explícita de matriz.

En particular:

```text
cajero_satelite
!=
gerencia_operativa
```

Los dos datasets deben construirse por separado.

---

#### 58. Matriz AS-IS → capacidad supervisor objetivo

| Evidencia AS-IS | Decisión objetivo |
| --- | --- |
| abrir PULSO | `pulso.access` |
| leer pedidos | `pulso.sales.orders.view` |
| observar estado de caja | `pulso.cash.sessions.view` |
| observar pagos | `pulso.payments.transactions.view` |
| observar salón/sesiones | `pulso.sales.table_sessions.view` |
| observar llamados | `pulso.sales.service_calls.view` |
| asignar responsable de llamado | `pulso.sales.service_calls.assign` |
| observar conversaciones | `pulso.sales.conversations.view` |
| observar solicitud de facturación | `pulso.sales.billing_requests.view` |
| observar delivery | `pulso.delivery.deliveries.view` |
| asignar delivery inicial | `pulso.delivery.deliveries.assign` |
| observar lotes de importación | `pulso.sales.import_batches.view` |
| observar mappings | `pulso.sales.import_mappings.view` |
| crear/editar pedido | NO ASIGNAR por supervisión |
| cobrar | NO ASIGNAR por supervisión |
| abrir/cerrar caja | NO ASIGNAR por supervisión |
| ejecutar loyalty | NO ASIGNAR por supervisión |
| cancelar/refund/cierre | `PULSO-AUTH-008` |
| override de entrega | solo componente operativo; requiere componente base adicional |
| mapping/importación/publicación | NO ASIGNAR; configuración/integración propietaria |
| reconocer/resolver/cancelar llamado | NO ASIGNAR desde esta matriz |
| enviar/archivar chat | NO ASIGNAR desde esta matriz |
| iniciar tránsito/registrar entrega | NO ASIGNAR desde esta matriz |

---

#### 59. Capacidades no concedidas y propietario de salida

| Capacidad o brecha | Propietario | Condición de salida |
| --- | --- | --- |
| cancelación de pedido | `PULSO-AUTH-008` | permiso, estado, motivo, confirmación y auditoría definidos |
| refund | `PULSO-AUTH-008` | autoridad y compensación vinculadas al pago original |
| cierre/reapertura/corrección de caja | `PULSO-AUTH-008` | cierre segregado, arqueo y aprobación definidos |
| acumulación robusta | `PULSO-AUTH-009` | contrato server-side territorial, atómico e idempotente |
| redención robusta | `PULSO-AUTH-010` | autorización fail-closed y efecto idempotente |
| territorio del turno | `PULSO-AUTH-011` | parámetros cliente no amplían sede/área |
| dispositivo compartido | `PULSO-AUTH-012` | dispositivo restringe y actor real queda resuelto |
| atribución humana | `PULSO-AUTH-013` | trabajador efectivo persistido/auditado |
| mappings/configuración/importación administrativa | `PULSO-AUTH-014` | configuración separada de operación y permisos exactos |
| migración a permisos atómicos | `PULSO-AUTH-015` | broad grants retirados y consumidores migrados |
| prueba integral | `PULSO-AUTH-016` | allow/deny, scopes, estado, concurrencia e integración certificados |
| reasignación logística de emergencia | `OPS-LOG-001` + diseño PULSO propietario | autoridad, vigencia y auditoría explícitas |
| escritura/archivo de chat | diseño PULSO propietario + `PULSO-AUTH-015/016` | contrato de persistencia único y autorización reconciliada |
| reconocer/resolver/cancelar llamados | diseño PULSO de salón + `PULSO-AUTH-015/016` | lifecycle y PermissionKeys exactas materializadas |
| iniciar tránsito/entrega | contrato de delivery/logística propietario | actor físico, custodia y transición exactos |

---

#### 60. Hallazgos y propietarios

| Hallazgo | Efecto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `supervisor` base no está materializado en runtime dev | la UI no puede inferirlo desde datos actuales | fundación AUTH / materialización RBAC | rol creado/validado y matriz base proyectada |
| `gerencia_operativa` existe sin grants PULSO atómicos observados | supervisor operativo objetivo todavía no está materializado | `PULSO-AUTH-015` + AUTH-RBAC | dataset atómico reproducible |
| `pulso.pos.main` sigue broad | puede exponer superficies incompatibles | `PULSO-AUTH-015` | cero fallback final a broad permission |
| `/orders` mezcla acciones | una lectura supervisora no puede mutar | `PULSO-AUTH-015/016` | guards y RPC usan PermissionKey exacta |
| `/salon` usa permisos/RLS amplios y acciones directas | assignment y demás transiciones requieren autoridad propia | `PULSO-AUTH-013/015/016` | actor, estado y permiso exactos |
| chat tiene múltiples callers | escritura no debe concederse hasta reconciliar trust boundary | `PULSO-AUTH-015/016` | persistencia unificada o equivalencia demostrada |
| `/sales-imports` concentra mapping/import/publish | lectura supervisora no puede mutar | `PULSO-AUTH-014/015/016` | permisos y RLS separados |
| `delivery.override` ya es granular pero BAO | componente operativo de gerencia no basta | fundación AUTH + `PULSO-AUTH-016` | doble condición demostrada |
| reasignación de delivery no tiene contrato de emergencia | `assign` no puede convertirse en override | `OPS-LOG-001` + diseño propietario | permiso/flujo de reasignación explícito |

No queda hallazgo material sin propietario y condición de salida.

---

#### 61. Reglas mínimas de seguridad

1. Denegación por defecto.
2. Ningún wildcard.
3. Ningún bypass por nombre de rol.
4. Ninguna sede seleccionada amplía autoridad.
5. Ningún rol base crea contexto operativo.
6. Ningún rol operativo crea autoridad base.
7. Toda lectura se limita al recurso necesario.
8. Toda mutación exige PermissionKey exacta.
9. Toda asignación usa estado de origen y control de concurrencia.
10. Todo dato de cliente se minimiza.
11. Todo permiso supervisor cesa al perder su contexto operativo aplicable.
12. Las acciones BAO exigen ambos carriles completos.
13. El dispositivo restringe; nunca amplía.
14. La simulación no ejecuta efectos reales.
15. APP-REVIEW y ambientes aislados no reciben acceso implícito.

---

#### 62. Pruebas mínimas que hereda la materialización

La implementación posterior deberá demostrar al menos:

- rol base `supervisor` sin rol operativo: no entra a PULSO por sí solo;
- `gerencia_operativa` con turno válido: puede `pulso.access` según contrato;
- contexto operativo incompleto: no obtiene las capacidades internas T+C;
- supervisor operativo puede leer pedidos pero no crearlos ni actualizarlos;
- puede leer caja pero no abrirla ni cerrarla;
- puede leer pagos pero no cobrar ni refund;
- puede leer salón y asignar responsable de llamado, pero no resolver/cancelar por inferencia;
- puede leer conversaciones pero no enviar ni archivar;
- puede leer billing requests pero no emitir ni corregir facturación;
- puede leer delivery y realizar asignación inicial permitida, pero no tránsito/entrega/reasignación de emergencia;
- puede leer lotes/mappings de importación, pero no mapear/importar/publicar;
- no ejecuta loyalty;
- no cancela pedidos;
- no completa `delivery.override` sin componente base compatible;
- `site_id` manipulado no amplía territorio;
- lectura de otra sede falla cerrado;
- UI, Server Action, RPC/RLS y simulación producen decisiones compatibles.

---

#### 63. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

Las obligaciones verificables de permisos atómicos, contexto operativo, pedidos, pagos, caja, delivery, salón, importaciones, territorio y validación server-side ya están cubiertas por requisitos vigentes.

---

#### 64. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-AUTH-001` — toda capacidad protegida se resuelve por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-002` — todo permiso consumido debe existir en catálogo y respetar convención;
- `TREQ-AUTH-004` — los evaluadores de autorización producen decisiones equivalentes;
- `TREQ-AUTH-008` — capacidades operativas exigen contexto laboral válido;
- `TREQ-AUTH-013` — toda mutación valida permiso exacto, actor, territorio, estado y columnas server-side;
- `TREQ-PULSO-004` — mutaciones de pedidos y líneas usan acciones nombradas y estado/columnas permitidos;
- `TREQ-PULSO-005` — ciclo comercial con identidades y estados separados;
- `TREQ-PULSO-006` — venta, pago, caja, anulación, refund y cierre usan acciones nombradas y auditables;
- `TREQ-PULSO-007` — delivery, PIN, tracking y override permanecen controlados y separados;
- `TREQ-PULSO-014` — acceso directo a superficies PULSO falla cerrado;
- `TREQ-PULSO-015` — `site_id` no amplía territorio;
- `TREQ-PULSO-016` — abrir `/orders` no concede mutaciones;
- `TREQ-PULSO-017` — abrir `/sales-imports` no concede carga, mapping ni publicación;
- `TREQ-PULSO-018` — salón separa lectura y acciones por actor/estado;
- `TREQ-PULSO-024` — infraestructura existente no demuestra autorización completa;
- `TREQ-PULSO-026` — permiso observado se mantiene separado de suficiencia contractual.

La enumeración es trazabilidad y no actualiza el Registro 04A.

---

#### 65. Fuentes canónicas principales consumidas

La decisión se apoya en:

- `PULSO-AUTH-002..006` aprobadas como base inmediata;
- `AUTH-RBAC-004 — Crear matriz de supervisor`;
- `AUTH-RBAC-019 — Crear matriz de gerencia_operativa`;
- `AUTH-CAT-002/003` para convención y descomposición de permisos;
- `AUTH-CAT-006..012` para modalidad, alcance y prerrequisitos;
- `CAP-SCOPE-009` y `CAP-SCOPE-011` para venta, caja, pagos y delivery;
- `PULSO-UX-001` para universo funcional y pantallas PULSO;
- matriz E2 de roles base por proceso;
- Registro 04A vigente para AUTH y PULSO;
- runtime remoto de desarrollo como evidencia AS-IS, no como contrato objetivo.

---

#### 66. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; no existen cambios físicos de consumidor |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico |
| REMOTA | PASS | se verificaron fuentes canónicas en `vento-shell`, `PULSO-AUTH-006` aprobada localmente, matrices `AUTH-RBAC-004/019`, 04A, código/inventarios PULSO y estado read-only de roles/permisos en Supabase dev |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron ventas, pagos, caja, asignaciones, llamados, importaciones, deliveries ni overrides reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida coherencia documental y estado AS-IS; no certifica que el runtime ya consuma la matriz objetivo.

---

#### 67. Criterios de aceptación

- [ ] Se separa rol base `supervisor` de rol operativo `gerencia_operativa`.
- [ ] El rol base `supervisor` no obtiene operación PULSO por sí solo.
- [ ] `gerencia_operativa` no se interpreta como supervisor administrativo permanente.
- [ ] No existe herencia automática desde `cajero_satelite`.
- [ ] `pulso.access` permanece como entrada únicamente.
- [ ] `pulso.pos.main` permanece `DECOMPOSE_REQUIRED` sin alias directo.
- [ ] Se evalúan exactamente 24 identidades PULSO.
- [ ] Exactamente 13 quedan como concesiones operativas directas del perfil supervisor.
- [ ] Exactamente una queda como componente operativo de doble condición.
- [ ] Exactamente diez permanecen sin concesión supervisor.
- [ ] Se definen once capacidades nuevas de supervisión.
- [ ] Todas las capacidades internas concedidas exigen contexto operativo completo aplicable.
- [ ] No existe alcance operativo global.
- [ ] El supervisor puede leer pedidos pero no crearlos/actualizarlos por inferencia.
- [ ] Puede leer caja pero no abrir/cerrar.
- [ ] Puede leer pagos pero no collect/refund.
- [ ] Puede consultar salón y asignar responsable inicial de llamado.
- [ ] `assign` de llamado no equivale a acknowledge/resolve/cancel.
- [ ] Puede leer conversaciones pero no escribir/archivar.
- [ ] Puede leer billing requests sin autoridad fiscal de emisión/corrección.
- [ ] Puede leer delivery y realizar únicamente asignación inicial permitida.
- [ ] `deliveries.assign` no incluye reasignación de emergencia.
- [ ] Puede leer lotes/mappings de importación pero no mutarlos/publicarlos.
- [ ] No ejecuta loyalty por inferencia.
- [ ] `delivery.override` no queda autorizado por `gerencia_operativa` sola.
- [ ] El rol base `supervisor` no completa el override por defecto.
- [ ] Configuración administrativa permanece separada.
- [ ] Todo hallazgo tiene propietario y condición de salida.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 68. Límites

Esta tarea no:

- crea el rol base `supervisor` en Supabase;
- modifica `gerencia_operativa` físicamente;
- modifica catálogo runtime de permisos;
- modifica `operational_role_permissions`;
- modifica `role_permissions`;
- retira `pulso.pos.main`;
- asigna permisos a personas;
- crea excepciones individuales;
- implementa venta;
- implementa cobro;
- implementa caja;
- implementa cierre;
- implementa cancelación;
- implementa refund;
- implementa loyalty;
- implementa salón;
- implementa chat;
- implementa facturación;
- implementa delivery;
- implementa importaciones;
- implementa reasignación de emergencia;
- cambia RLS;
- cambia RPC;
- modifica Server Actions;
- cambia guards;
- modifica Realtime;
- modifica Edge Functions;
- modifica PASS;
- modifica NEXO;
- modifica FOGO;
- modifica NUMERA;
- crea migraciones;
- modifica Supabase remoto;
- modifica el Registro 04A;
- crea instancia física;
- ejecuta E5.

---

#### 69. Handoff a PULSO-AUTH-008

`PULSO-AUTH-008 — Definir permisos de cierre y anulación` recibe explícitamente:

```text
pulso.sales.orders.cancel
pulso.payments.transactions.refund
pulso.cash.sessions.close
```

junto con:

- el supervisor no recibe esas capacidades por jerarquía;
- `cash.sessions.view` no concede `close`;
- `payments.transactions.view` no concede `refund`;
- `orders.view` no concede `cancel`;
- cierre, arqueo, diferencia, aprobación, reapertura y corrección siguen sin autoridad final;
- cancelación, anulación, devolución y refund siguen siendo semánticas distintas;
- cualquier autoridad supervisor sobre estas acciones debe definirse explícitamente en `PULSO-AUTH-008`.

---

#### 70. Handoff a PULSO-AUTH-009..016

Las tareas posteriores reciben:

```text
009 → materializar acumulación protegida
010 → materializar redención protegida
011 → hacer vinculante el límite territorial del turno
012 → integrar terminal compartida sin ampliar autoridad
013 → registrar al trabajador efectivo
014 → separar y proteger configuración/mappings/importación administrativa
015 → materializar PermissionKeys y migrar consumidores fuera de pos.main
016 → certificar allow/deny, scopes, actor, estado, concurrencia e integración
```

La matriz supervisor de esta tarea debe consumirse sin reinterpretar sus concesiones como wildcard.

---

#### 71. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-006 — Definir permisos de cajero`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-007 — Definir permisos de supervisor`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-008 — Definir permisos de cierre y anulación`
### ✅ PULSO-AUTH-008 — Definir permisos de cierre y anulación

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-007 — Definir permisos de supervisor
**Tarea siguiente:** PULSO-AUTH-009 — Proteger acumulación de puntos
**Tipo de tarea:** definición documental del contrato de autorización de acciones sensibles de cancelación, anulación, reembolso y cierre de caja en PULSO, separando autoridad ordinaria de cajero, coordinación supervisora y autoridad excepcional de doble condición, sin reutilizar `pulso.pos.main`, sin fusionar cancelación con refund, sin convertir `orders.update` o `payments.collect` en permisos de excepción, y sin materializar runtime; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, permisos runtime, roles, matrices runtime, RLS, RPC, funciones, Server Actions, tablas, datos, Supabase, migraciones, packages, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada quién puede cancelar pedidos, anular una venta consolidada, reembolsar pagos, cerrar una caja y reabrir una caja cerrada, preservando separación de funciones, territorio, actor real, estado actual, idempotencia, motivo y trazabilidad.

La tarea evita que acciones sensibles se deriven de permisos amplios o de visibilidad de pantalla.

---

#### 2. Handoff recibido de PULSO-AUTH-006

`PULSO-AUTH-006` reserva explícitamente para esta tarea:

```text
pulso.sales.orders.cancel
pulso.payments.transactions.refund
pulso.cash.sessions.close
```

También entrega estas restricciones:

- `orders.update` no concede cancelación;
- `payments.collect` no concede refund;
- `cash.sessions.start` no concede cierre;
- `pulso.pos.main` no es permiso final suficiente;
- cierre, arqueo, diferencias, reapertura y corrección requieren autoridad explícita.

---

#### 3. Handoff recibido de PULSO-AUTH-007

`PULSO-AUTH-007` confirma que:

- supervisor no equivale a `cajero_satelite + wildcard`;
- `orders.view` no concede `cancel`;
- `payments.transactions.view` no concede `refund`;
- `cash.sessions.view` no concede `close`;
- el rol base `supervisor` y `gerencia_operativa` permanecen separados;
- cualquier autoridad supervisora sobre cancelación, refund o cierre debe definirse aquí de forma explícita.

---

#### 4. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- esta tarea define contrato, no implementación;
- no existe instancia física propia;
- no crea migraciones;
- no inserta PermissionKeys en Supabase;
- no modifica RLS ni RPC;
- no cambia Server Actions;
- no reescribe datos históricos;
- no ejecuta refund, cancelación o cierre real.

---

#### 5. Principio rector

Las acciones sensibles se autorizan por capacidad exacta.

```text
VIEW
!=
UPDATE
!=
CANCEL
!=
VOID
!=
REFUND
!=
CLOSE
!=
REOPEN
```

Ninguna de estas capacidades se hereda de otra.

---

#### 6. `pulso.pos.main` permanece fuera del diseño final

`pulso.pos.main` conserva clasificación:

```text
DECOMPOSE_REQUIRED
NO_DIRECT_CANONICAL_ALIAS
```

No autoriza por sí solo:

- cancelar pedidos;
- anular ventas;
- reembolsar pagos;
- cerrar caja;
- reabrir caja.

---

#### 7. Universo sensible evaluado

Esta tarea evalúa exactamente cinco identidades de permiso objetivo:

```text
pulso.sales.orders.cancel
pulso.sales.orders.void
pulso.payments.transactions.refund
pulso.cash.sessions.close
pulso.cash.sessions.reopen
```

Cardinalidad:

```text
PULSO_SENSITIVE_PERMISSIONS_EVALUATED = 5
EXISTING_STRUCTURAL_IDENTITIES = 3
NEW_TARGET_IDENTITIES = 2
DUPLICATES = 0
UNRESOLVED_SENSITIVE_DECISIONS = 0
```

---

#### 8. Identidades estructurales existentes

Ya existen como contrato estructural previo:

```text
pulso.sales.orders.cancel
pulso.payments.transactions.refund
pulso.cash.sessions.close
```

Esta tarea cierra su significado de autorización.

---

#### 9. Nuevas identidades objetivo

Se definen dos identidades adicionales porque cancelación y cierre ordinario no cubren sus efectos:

```text
pulso.sales.orders.void
pulso.cash.sessions.reopen
```

No representan existencia runtime actual.

Son claves objetivo para materialización posterior.

---

#### 10. Cancelación y anulación son distintas

```text
CANCEL
=
interrumpir un pedido antes de su consolidación final
```

```text
VOID
=
anular una venta o pedido ya consolidado sin borrar historia
```

La anulación no elimina el registro original.

---

#### 11. Anulación y eliminación son distintas

`pulso.sales.orders.void` no equivale a:

```text
pulso.sales.orders.delete
```

Regla:

```text
VOID
!=
DELETE
```

La historia comercial y los efectos correlacionados deben conservarse.

---

#### 12. Refund y anulación son distintas

```text
ORDER_VOID
!=
PAYMENT_REFUND
```

Una anulación no puede marcar automáticamente un pago como reembolsado sin ejecutar el contrato de refund.

---

#### 13. Devolución permanece separada

La devolución física o comercial de bienes no se modela como alias de cancelación, void o refund.

```text
RETURN
!=
CANCEL
!=
VOID
!=
REFUND
```

La devolución integral permanece en el contrato funcional propietario posterior y en las integraciones con inventario, fiscalidad y fidelización.

---

#### 14. Cierre y reapertura son distintas

```text
CLOSE
!=
REOPEN
```

Cerrar consolida una sesión de caja.

Reabrir modifica una sesión ya cerrada y por tanto exige autoridad superior.

---

#### 15. Matriz de autoridad principal

| Permiso | `cajero_satelite` | `gerencia_operativa` | Modalidad objetivo | Decisión |
| --- | --- | --- | --- | --- |
| `pulso.sales.orders.cancel` | NO ASIGNAR | ASIGNAR OPERATIVO | `OPERATIONAL_ONLY` / `T+C` | cancelación sensible supervisora dentro de estado cancelable |
| `pulso.sales.orders.void` | NO ASIGNAR | ASIGNAR SOLO COMPONENTE OPERATIVO | `BASE_AND_OPERATIONAL` / `N + T+C` | anulación consolidada exige autoridad base adicional |
| `pulso.payments.transactions.refund` | NO ASIGNAR | ASIGNAR SOLO COMPONENTE OPERATIVO | `BASE_AND_OPERATIONAL` / `N + T+C` | refund exige autoridad base adicional y transacción original |
| `pulso.cash.sessions.close` | ASIGNAR OPERATIVO | NO ASIGNAR COMO CIERRE ORDINARIO | `OPERATIONAL_ONLY` / `T+C` | cajero cierra únicamente su propia sesión válida |
| `pulso.cash.sessions.reopen` | NO ASIGNAR | ASIGNAR SOLO COMPONENTE OPERATIVO | `BASE_AND_OPERATIONAL` / `N + T+C` | reapertura excepcional exige autoridad base adicional |

---

#### 16. Resultado cuantitativo por carril

```text
CASHIER_DIRECT_GRANTED = 1
SUPERVISOR_DIRECT_GRANTED = 1
SUPERVISOR_OPERATIONAL_COMPONENT_ONLY = 3
CASHIER_NOT_GRANTED = 4
```

La suma por carril no convierte estas cinco identidades en un wildcard.

---

#### 17. Regla para `pulso.sales.orders.cancel`

`pulso.sales.orders.cancel` autoriza una cancelación explícita del pedido actual cuando el estado sea cancelable.

Requiere como mínimo:

- actor humano identificado;
- turno vigente;
- check-in cuando aplique;
- sede del recurso resuelta en servidor;
- permiso exacto;
- pedido existente;
- estado actual permitido;
- motivo no vacío;
- operación idempotente;
- auditoría de estado anterior y nuevo.

---

#### 18. Estados no cancelables

Como mínimo, `orders.cancel` debe denegar:

```text
delivered
voided
```

También debe denegar cualquier pedido cuyo contrato ya exija una compensación previa no resuelta.

---

#### 19. Pago confirmado bloquea cancelación simple

Si existe pago confirmado o liquidado, la cancelación simple no puede completar silenciosamente la operación.

```text
PAID ORDER
+
CANCEL REQUEST
→
REQUIERE RESOLVER EFECTO DE PAGO
```

La resolución económica usa `pulso.payments.transactions.refund` cuando corresponda.

---

#### 20. Cancelación no revierte efectos por inferencia

`orders.cancel` no concede por sí sola autoridad para:

- refund;
- reverso fiscal;
- devolución física;
- devolución de inventario;
- reversión de puntos;
- compensación al cliente;
- eliminación de evidencia.

Cada efecto debe conservar su contrato propietario.

---

#### 21. Estado AS-IS de cancelación

El runtime actual de `/orders` expone `mark_cancelled` dentro de `update_order_operational_state`.

La función observada protege la operación con `pulso.pos.main` y permite cancelación para pedidos no entregados.

Ese comportamiento es evidencia AS-IS, no autoridad objetivo suficiente.

---

#### 22. Brecha AS-IS de cancelación

La implementación observada actualmente:

- no utiliza `pulso.sales.orders.cancel`;
- no exige un motivo empresarial explícito en la firma observada;
- comparte RPC con otras transiciones operativas;
- depende de `pulso.pos.main`;
- no separa autoridad de cancelación de otras operaciones del tablero.

La brecha se materializa posteriormente; esta tarea no modifica el RPC.

---

#### 23. Regla para `pulso.sales.orders.void`

`pulso.sales.orders.void` representa anulación de una venta o pedido consolidado conservando historia y referencias.

No se utiliza para cancelación ordinaria.

---

#### 24. Evidencia física de anulación

El esquema remoto observado contiene campos en `public.orders` como:

```text
voided_at
voided_by
void_reason
```

La existencia de esos campos demuestra capacidad de representación, no un flujo autorizado completo.

---

#### 25. Modalidad de anulación

`pulso.sales.orders.void` se define como:

```text
BASE_AND_OPERATIONAL
```

Requiere simultáneamente:

- autoridad base compatible;
- contexto operativo válido;
- territorio compatible;
- permiso exacto;
- motivo;
- reautenticación cuando aplique;
- ausencia de denegación superior.

---

#### 26. Supervisor base no obtiene `void`

El rol base `supervisor` no recibe por defecto el componente base de `orders.void`.

Por tanto:

```text
employees.role = supervisor
+
gerencia_operativa
!=
VOID AUTORIZADO
```

sin componente base compatible.

---

#### 27. Anulación preserva efectos emitidos

La anulación no puede borrar efectos previamente confirmados.

Debe conservar referencias a:

- pago;
- documento fiscal;
- inventario;
- loyalty;
- preparación/fulfillment;
- actor;
- motivo;
- evidencia de compensaciones posteriores.

---

#### 28. Regla para `pulso.payments.transactions.refund`

Refund siempre opera sobre una transacción de pago original identificada.

No opera sobre el total visible del pedido como único dato.

---

#### 29. Condiciones mínimas de refund

El contrato debe validar como mínimo:

- transacción original existente;
- sede y pedido correlacionados;
- estado reembolsable;
- monto solicitado positivo;
- monto acumulado reembolsado no mayor al monto original;
- proveedor y referencia original cuando existan;
- motivo;
- actor;
- idempotency key estable;
- resultado confirmado o reconciliable.

---

#### 30. Refund parcial

La misma PermissionKey cubre refund total o parcial.

La diferencia se expresa en el recurso y el monto, no creando permisos por monto.

---

#### 31. Timeout de refund

Un timeout del proveedor no se interpreta como refund fallido.

```text
RESULTADO DESCONOCIDO
→
CONSULTAR / RECONCILIAR
→
NO REPETIR CIEGAMENTE
```

---

#### 32. Modalidad de refund

`pulso.payments.transactions.refund` se define como:

```text
BASE_AND_OPERATIONAL
```

`gerencia_operativa` aporta únicamente el componente operativo.

La autoridad final requiere componente base compatible.

---

#### 33. Cajero no ejecuta refund

`cajero_satelite` no recibe `pulso.payments.transactions.refund`.

El cajero puede registrar o escalar una incidencia según contratos posteriores, pero no convertirla en refund por inferencia.

---

#### 34. Refund no implica devolución

```text
REFUND
!=
RETURN
```

Un refund no demuestra que el producto haya regresado físicamente ni que inventario, fiscalidad o loyalty hayan sido compensados.

---

#### 35. Regla para `pulso.cash.sessions.close`

El cierre ordinario corresponde al cajero responsable de su propia sesión de caja.

```text
ACTOR EFECTIVO
=
OWNER DE LA SESIÓN
```

es una condición obligatoria del cierre ordinario.

---

#### 36. Condiciones mínimas de cierre

`cash.sessions.close` debe validar:

- sesión existente;
- estado `open` o equivalente vigente;
- sede compatible;
- actor efectivo propietario;
- turno y contexto válidos;
- movimientos asociados;
- pagos pendientes de reconciliación;
- efectivo esperado calculado en servidor;
- efectivo contado capturado;
- diferencia calculada en servidor;
- idempotencia;
- timestamp de servidor;
- auditoría.

---

#### 37. Diferencia de caja

La diferencia no puede editarse manualmente como resultado final.

```text
DIFFERENCE
=
COUNTED_AMOUNT - EXPECTED_AMOUNT
```

según el contrato numérico aprobado para la implementación.

El servidor debe calcularla desde datos autoritativos.

---

#### 38. Diferencia no crea ajuste automático

Una diferencia de caja no puede crear por inferencia:

- movimiento compensatorio;
- asiento contable;
- descuento laboral;
- ingreso extraordinario;
- salida de efectivo;
- corrección destructiva.

La diferencia se registra como hecho a resolver por el proceso propietario.

---

#### 39. Supervisor no cierra la caja ordinaria de otro actor

`gerencia_operativa` no recibe `cash.sessions.close` como facultad ordinaria sobre sesiones de terceros.

La ausencia del cajero no convierte al supervisor en owner de la sesión.

---

#### 40. Cierre forzado permanece separado

Un cierre forzado por indisponibilidad, abandono o contingencia no se trata como alias de `cash.sessions.close`.

Mientras no exista una capacidad atómica específica de cierre forzado:

```text
FORCED_CLOSE
→
DEFAULT_DENY
```

---

#### 41. Regla para `pulso.cash.sessions.reopen`

`cash.sessions.reopen` representa una excepción sobre una sesión ya cerrada.

No forma parte del ciclo ordinario del cajero.

---

#### 42. Modalidad de reapertura

`pulso.cash.sessions.reopen` se define como:

```text
BASE_AND_OPERATIONAL
```

`gerencia_operativa` aporta solo el componente operativo.

La autoridad final exige componente base compatible.

---

#### 43. Reapertura no borra cierre anterior

La reapertura debe conservar:

- cierre original;
- actor que cerró;
- importes originales;
- diferencia original;
- actor que reabre;
- motivo;
- timestamp;
- versión;
- nueva secuencia de eventos.

---

#### 44. Reapertura no permite edición destructiva

Reabrir una caja no autoriza a sobrescribir movimientos, pagos o conteos anteriores.

Las correcciones deben ser hechos nuevos y auditables.

---

#### 45. Autoridad base para doble condición

Esta tarea no convierte el rol base `supervisor` en autoridad financiera permanente.

Los permisos:

```text
pulso.sales.orders.void
pulso.payments.transactions.refund
pulso.cash.sessions.reopen
```

requieren un componente base compatible definido por matrices canónicas o por una excepción individual válida.

---

#### 46. `gerencia_operativa` no es suficiente por sí sola

Para las tres capacidades de doble condición:

```text
gerencia_operativa
+
T+C
!=
ALLOW
```

sin componente base compatible.

---

#### 47. Reautenticación

Void, refund y reopen son acciones sensibles.

El contrato de materialización debe exigir reautenticación o confirmación reforzada conforme al mecanismo canónico vigente cuando se ejecute la acción.

Esta tarea no define credenciales nuevas.

---

#### 48. Motivo obligatorio

Las siguientes acciones exigen motivo empresarial no vacío:

```text
orders.cancel
orders.void
payments.transactions.refund
cash.sessions.reopen
```

El cierre ordinario puede aceptar notas, pero no depende de una justificación excepcional si el cierre es normal.

---

#### 49. Actor efectivo

Toda acción sensible debe registrar al trabajador humano efectivo.

La sesión técnica del dispositivo no sustituye el actor.

La materialización de actor real continúa en `PULSO-AUTH-013`.

---

#### 50. Dispositivo compartido

En terminal compartida, PIN o firma de actor no concede permisos adicionales.

```text
ACTOR SIGNATURE
!=
AUTHORITY GRANT
```

La integración técnica continúa en `PULSO-AUTH-012`.

---

#### 51. Territorio

Toda acción se limita al recurso y sede autorizados.

`site_id` recibido desde UI no concede autoridad.

La resolución territorial vinculante continúa en `PULSO-AUTH-011`.

---

#### 52. Estado actual

El servidor debe leer el estado vigente dentro de la operación autorizada.

No se confía en un estado enviado por el cliente.

---

#### 53. Concurrencia

Cancel, void, refund, close y reopen deben resistir dos solicitudes concurrentes.

El resultado válido debe ser exactamente uno de:

```text
APLICADO UNA VEZ
YA APLICADO
CONFLICTO DE ESTADO
RESULTADO DESCONOCIDO RECONCILIABLE
```

Nunca dos efectos equivalentes independientes.

---

#### 54. Idempotencia

Las acciones con efecto económico o de cierre deben usar una identidad estable del intento empresarial.

Un nuevo `Date.now()`, UUID aleatorio o referencia regenerada en UI no demuestra idempotencia del mismo hecho.

---

#### 55. Auditoría mínima

Cada acción debe registrar al menos:

- permiso evaluado;
- actor efectivo;
- principal técnico;
- sede;
- recurso;
- estado anterior;
- estado nuevo;
- motivo cuando aplique;
- importe cuando aplique;
- referencia/idempotency key;
- timestamp de servidor;
- resultado.

---

#### 56. Estado runtime de caja

El remoto observado contiene tablas:

```text
public.pos_cash_shifts
public.pos_cash_movements
public.pos_payments
```

`pos_cash_shifts` incluye actualmente, entre otros:

```text
status
opened_at
closed_at
opening_amount
expected_amount
counted_amount
difference
```

La existencia de estas columnas no certifica el flujo de cierre objetivo.

---

#### 57. Estado runtime de pagos

`public.pos_payments` contiene evidencia de pagos ligados a pedido, sesión y turno.

La existencia de un `status` o de una referencia no demuestra un contrato de refund completo.

---

#### 58. RLS AS-IS no sustituye permiso atómico

La política observada de `public.orders` permite UPDATE a empleados con acceso a la sede.

Ese alcance es demasiado amplio para representar por sí solo cancelación o anulación.

La implementación objetivo debe validar la acción exacta además del territorio.

---

#### 59. Fronteras con UX

`PULSO-UX-009` debe diseñar experiencia y semántica visibles para:

```text
cancelación
anulación
devolución
refund
```

`PULSO-UX-010` debe diseñar apertura, cierre, arqueo, diferencias y reapertura de caja.

Esta tarea fija autoridad; no diseña la pantalla final.

---

#### 60. Fronteras con dominios propietarios

La ejecución de estas acciones puede requerir efectos en otros dominios:

```text
NEXO → inventario y devolución física
NUMERA → registro económico y conciliación
PASS → puntos y beneficios
proveedor fiscal → documento fiscal
proveedor de pagos → refund/reversal
```

PULSO no absorbe esos ownerships.

---

#### 61. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0

La cobertura vigente ya exige separación semántica, autorización exacta, estado, idempotencia, conciliación y auditoría para estas operaciones.

---

#### 62. Cobertura de prueba vigente reutilizada

Cobertura relevante, sin modificación del Registro 04A:

- `TREQ-AUTH-001`
- `TREQ-AUTH-002`
- `TREQ-AUTH-004`
- `TREQ-AUTH-008`
- `TREQ-AUTH-013`
- `TREQ-PULSO-004`
- `TREQ-PULSO-005`
- `TREQ-PULSO-006`
- `TREQ-PULSO-007`
- `TREQ-PULSO-014`
- `TREQ-PULSO-015`
- `TREQ-PULSO-016`
- `TREQ-PULSO-017`
- `TREQ-PULSO-018`
- `TREQ-PULSO-024`
- `TREQ-PULSO-026`

La mención es únicamente trazabilidad.

---

#### 63. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de producto; tarea documental sin cambios físicos |
| LOCAL | PASS | se validó el artefacto descargable en entorno de trabajo sin modificar el repositorio del usuario |
| REMOTA | PASS | se verificaron `vento-shell`, `vento-pulso`, catálogo, matrices, 04A, RPC `update_order_operational_state`, esquema y políticas Supabase relevantes |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron cancelaciones, refunds, cierres o reaperturas reales |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin instancia física propia |

---

#### 64. Criterios de aceptación

- [ ] Se evalúan exactamente cinco identidades sensibles.
- [ ] Tres identidades estructurales previas conservan nombre exacto.
- [ ] Se definen `pulso.sales.orders.void` y `pulso.cash.sessions.reopen` como identidades objetivo nuevas.
- [ ] Cancel, void, refund, close y reopen permanecen semánticamente separados.
- [ ] `orders.update` no concede cancel o void.
- [ ] `payments.collect` no concede refund.
- [ ] `cash.sessions.start` no concede close.
- [ ] `cash.sessions.close` no concede reopen.
- [ ] `cajero_satelite` solo recibe cierre ordinario de su propia caja entre estas cinco capacidades.
- [ ] `gerencia_operativa` recibe cancelación directa y solo componentes operativos de void, refund y reopen.
- [ ] Supervisor base no recibe automáticamente autoridad financiera sensible.
- [ ] Cancelación simple no revierte pago, fiscalidad, inventario o loyalty por inferencia.
- [ ] Refund exige transacción original e idempotencia.
- [ ] Cierre calcula expected/count/difference desde contrato server-side.
- [ ] Diferencia no crea ajuste automático.
- [ ] Reapertura preserva cierre previo y crea nueva evidencia.
- [ ] Cierre forzado permanece `DEFAULT_DENY` sin PermissionKey específica.
- [ ] Se conserva separación de actor técnico y actor humano.
- [ ] Se conserva territorio server-side.
- [ ] Se reutiliza cobertura TREQ sin modificar 04A.
- [ ] No se ejecutan cambios físicos.

---

#### 65. Límites

Esta tarea no:

- inserta PermissionKeys;
- modifica matrices runtime;
- cambia `pulso.pos.main` físicamente;
- modifica `update_order_operational_state`;
- implementa refund;
- implementa cierre de caja;
- implementa reapertura;
- implementa devolución;
- implementa compensaciones;
- implementa integración fiscal;
- implementa integración con proveedor de pagos;
- implementa reversión de inventario;
- implementa reversión de loyalty;
- crea permisos de cierre forzado;
- define UI final;
- crea migraciones;
- modifica Supabase remoto;
- modifica el Registro 04A;
- crea instancia física;
- ejecuta E5.

---

#### 66. Handoff a PULSO-AUTH-009

`PULSO-AUTH-009 — Proteger acumulación de puntos` recibe:

- cancelación, void y refund separados de loyalty;
- prohibición de revertir puntos por inferencia desde una acción PULSO;
- necesidad de correlacionar cualquier compensación loyalty con el hecho comercial original;
- actor, sede, recurso e idempotencia como requisitos transversales.

---

#### 67. Handoff a PULSO-AUTH-010

`PULSO-AUTH-010 — Proteger redenciones` recibe la misma separación de efectos:

```text
REFUND / VOID / CANCEL
!=
AUTOMATIC LOYALTY RESTORE
```

La restitución de puntos debe ocurrir mediante contrato PASS autorizado, correlacionado e idempotente.

---

#### 68. Handoff a PULSO-AUTH-011..016

Las tareas posteriores reciben:

```text
011 → hacer vinculante territorio de turno y recurso
012 → integrar terminal compartida sin ampliar permisos
013 → registrar actor humano efectivo
014 → conservar configuración administrativa separada
015 → materializar PermissionKeys, contratos server-side y migración desde broad authority
016 → certificar allow/deny, estado, concurrencia, idempotencia e integraciones
```

---

#### 69. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-007 — Definir permisos de supervisor`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-008 — Definir permisos de cierre y anulación`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-009 — Proteger acumulación de puntos`
### ✅ PULSO-AUTH-009 — Proteger acumulación de puntos

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-008 — Definir permisos de cierre y anulación
**Tarea siguiente:** PULSO-AUTH-010 — Proteger redenciones
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — protección server-side de la acumulación de puntos solicitada desde PULSO hacia PASS mediante permiso atómico `pulso.loyalty.points.accumulate`, hecho comercial elegible, actor y territorio efectivos, referencia empresarial estable, cálculo gobernado por regla/version PASS, atomicidad, idempotencia, recuperación de resultado y cierre de bypass directos al ledger o saldo
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; toda materialización futura ocurre únicamente mediante `PULSO-AUTH-009::<implementation_unit_id>` después de que el paquete propietario aplicable satisfaga `E5-GATE-008::<package_id> = PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la frontera completa de autorización, integridad e idempotencia para otorgar puntos desde PULSO sin permitir que una pantalla visible, `pulso.pos.main`, un monto capturado por navegador, una referencia aleatoria, una sesión técnica o una RPC invocable directamente puedan fabricar o duplicar fidelización.

La regla raíz queda:

```text
VENTA / TRANSACCION ELEGIBLE Y ESTABLE
+
CLIENTE IDENTIFICADO
+
ACTOR Y CONTEXTO OPERATIVO VALIDOS
+
SEDE EFECTIVA
+
PERMISO pulso.loyalty.points.accumulate
+
REGLA PASS VIGENTE Y VERSIONADA
+
IDENTIDAD IDEMPOTENTE DEL HECHO EMPRESARIAL
+
COMANDO SERVIDOR AUTORITATIVO
=
ACUMULACION AUTORIZABLE
```

Ningún elemento aislado sustituye el conjunto completo.

---

#### 2. Handoff recibido de PULSO-AUTH-008

`PULSO-AUTH-008` entrega a esta tarea cuatro restricciones transversales:

- cancelación, void y refund permanecen separados de loyalty;
- una acción PULSO no revierte ni compensa puntos por inferencia;
- cualquier efecto de fidelización debe correlacionarse con el hecho comercial original;
- actor, sede, recurso e idempotencia forman parte obligatoria de la decisión.

Regla heredada:

```text
REFUND / VOID / CANCEL
!=
AUTOMATIC LOYALTY EFFECT
```

---

#### 3. Handoffs acumulados de PULSO-AUTH-006 y PULSO-AUTH-007

`PULSO-AUTH-006` ya definió:

```text
pulso.loyalty.points.accumulate
```

como capacidad ordinaria de `cajero_satelite`, con modalidad:

```text
OPERATIONAL_ONLY / T+C
```

y alcance máximo de venta confirmada y elegible, cliente identificado, sede efectiva y referencia idempotente.

`PULSO-AUTH-007` confirmó que `gerencia_operativa` no recibe `pulso.loyalty.points.accumulate` por supervisión.

Por tanto:

```text
CAJERO_SATELITE + CONTEXTO VALIDO + PERMISO EXACTO
→ actor ordinario autorizable

GERENCIA_OPERATIVA
→ NO GRANT DE ACUMULACION POR INFERENCIA
```

---

#### 4. Contrato PASS consumido

Esta tarea consume `PASS-INT-001 — Definir integración PULSO → PASS para acumulación` sin redefinir ownership.

La frontera permanece:

```text
PULSO
→ captura intención operativa y solicita el efecto

PASS
→ valida regla de fidelización y conserva ledger/saldo
```

PULSO no es propietario del saldo ni del ledger de fidelización.

---

#### 5. Naturaleza y topología

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define una sola vez el contrato global.

Cada materialización futura utiliza:

```text
PULSO-AUTH-009::<implementation_unit_id>
```

No existe una identidad de unidad física autorizada por este documento.

---

#### 6. Gate físico posterior

Una unidad física de `PULSO-AUTH-009` solo puede comenzar cuando concurran:

```text
PAQUETE PROPIETARIO APLICABLE
+
E5-GATE-008::<package_id> = PASS
+
IMPLEMENTATION_UNIT_ID CANONICO
+
AUTORIZACION FISICA EXPLICITA
```

La aprobación del marcador global no satisface ninguna de esas condiciones por sí sola.

---

#### 7. Superficie protegida

La capacidad empresarial protegida es:

| Dimensión | Contrato |
| --- | --- |
| Aplicación | `pulso` |
| Módulo | `loyalty` |
| Recurso | `points` |
| Acción | `accumulate` |
| PermissionKey | `pulso.loyalty.points.accumulate` |
| Modalidad | `OPERATIONAL_ONLY` |
| Prerrequisito | `T+C` |
| Actor ordinario | `cajero_satelite` |
| Owner de ledger/saldo | PASS |
| Owner de experiencia de venta | PULSO |

La existencia de scanner, formulario o acción técnica no cambia esta identidad.

---

#### 8. Autoridad efectiva

La decisión autorizante debe resolverse con la intersección de:

```text
PRINCIPAL TECNICO
ACTOR HUMANO EFECTIVO
EMPLEADO ACTIVO
TURNO PUBLICADO Y VIGENTE
CHECK-IN ACTIVO
ROL OPERATIVO EFECTIVO cajero_satelite
SEDE EFECTIVA
AREA COMPATIBLE
PERMISO pulso.loyalty.points.accumulate
DISPOSITIVO CUANDO APLIQUE
CLIENTE
HECHO COMERCIAL
ESTADO DEL HECHO
DENEGACIONES PREVALENTES
```

La ausencia o contradicción de un dato requerido produce denegación cerrada.

---

#### 9. Lo que no concede autoridad

No son autoridad suficiente:

```text
pulso.access
pulso.pos.main
pantalla /scanner visible
cliente identificado
monto escrito en UI
PIN de trabajador
sesion tecnica del dispositivo
rol base cajero
gerencia_operativa
site_id enviado por navegador
saldo actual visible
formula local de puntos
```

Cada uno puede aportar contexto, nunca sustituir el permiso exacto y el hecho empresarial.

---

#### 10. Hecho empresarial origen obligatorio

Toda acumulación debe derivar de una compra, venta o transacción comercial identificable y elegible.

El servidor debe poder resolver, como mínimo:

- identidad estable del hecho origen;
- cliente asociado;
- sede efectiva;
- monto elegible autoritativo;
- moneda;
- estado empresarial que habilita acumulación;
- regla PASS aplicable;
- versión de la regla;
- actor y dispositivo cuando correspondan;
- identidad de correlación e idempotencia.

Un monto aislado no constituye un hecho comercial.

---

#### 11. Venta no confirmada o incompatible

No puede producir acumulación definitiva una venta:

- inexistente;
- no confirmada según el contrato propietario;
- cancelada;
- anulada;
- ya compensada de forma incompatible;
- de otra sede;
- atribuida a otro cliente;
- no elegible por regla vigente.

La UI no puede convertir por sí misma ninguno de esos estados en una acumulación válida.

---

#### 12. Identidad del cliente

El cliente debe resolverse server-side contra una identidad vigente y apta para fidelización.

La identificación previa en scanner es una entrada de contexto, no prueba suficiente del efecto.

Reglas:

```text
CLIENTE IDENTIFICADO
!=
CLIENTE ELEGIBLE PARA CUALQUIER ACUMULACION
```

El servidor debe volver a comprobar la relación entre cliente, venta y efecto antes de persistir puntos.

---

#### 13. PermissionKey exacta

La mutación final debe evaluar:

```text
pulso.loyalty.points.accumulate
```

`pulso.pos.main` queda únicamente como evidencia AS-IS durante la transición.

Regla objetivo:

```text
pulso.pos.main
!=
pulso.loyalty.points.accumulate
```

No existe expansión automática del permiso broad hacia esta capacidad.

---

#### 14. Revalidación en el punto de efecto

La autorización debe comprobarse inmediatamente antes de la mutación autoritativa.

No basta con:

```text
CHECK AL CARGAR PAGINA
CHECK EN COMPONENTE CLIENTE
CHECK DE BOTON
CHECK DE IDENTIFICACION DE CLIENTE
FIRMA DE ACTOR
=
AUTORIZACION FINAL
```

Toda Server Action, RPC o función capaz de producir el efecto debe impedir llamada directa que salte permiso, territorio, actor, origen, estado, regla o idempotencia.

---

#### 15. Estado AS-IS de la Server Action

En `vento-pulso`, `src/modules/pos/actions/award-loyalty.action.ts` conserva actualmente:

```text
APP_ID = pulso
POS_PERMISSION = pos.main
```

La acción:

- usa `requireAppAccess`;
- solicita firma de actor en dispositivo compartido cuando corresponde;
- invoca el adaptador de acumulación;
- intenta asociar después la firma con la transacción loyalty creada.

Es adopción parcial útil, no cumplimiento del contrato objetivo.

---

#### 16. Estado AS-IS del adaptador

`src/modules/pos/api/loyalty-award.api.ts` invoca:

```text
public.award_loyalty_points_external
```

con:

```text
user_id
site_id
amount_cop
external_ref
description
metadata
```

No transporta de forma tipada una identidad canónica obligatoria de venta, pedido o transacción origen.

Por tanto, la llamada observada no demuestra correlación empresarial suficiente.

---

#### 17. Estado AS-IS de la interfaz

`src/modules/pos/components/qr-scanner.tsx` calcula una estimación local mediante:

```text
floor(amount / 1000)
```

y genera la referencia externa combinando:

```text
site truncado
user truncado
Date.now()
Math.random()
```

La interfaz también toma `amountCop` desde captura manual.

Estas decisiones describen el AS-IS y no constituyen el contrato objetivo.

---

#### 18. Referencia aleatoria no es idempotencia empresarial

Queda prohibido tratar como identidad idempotente final una referencia que dependa únicamente de:

```text
Date.now
Math.random
identificadores truncados
estado temporal de UI
nuevo valor generado en cada intento
```

Un retry del mismo hecho debe conservar la misma identidad estable.

---

#### 19. Identidad idempotente estable

La identidad debe derivarse del hecho empresarial o ser emitida y validada por servidor antes del primer efecto.

Contrato:

```text
MISMO HECHO EMPRESARIAL
→ MISMA IDENTIDAD IDEMPOTENTE
```

La caída del navegador, timeout, reinicio del dispositivo o retry no generan una identidad nueva para el mismo hecho.

---

#### 20. Replay equivalente

Para una identidad ya confirmada:

```text
MISMA CLAVE
+
MISMA HUELLA EMPRESARIAL
=
RESULTADO ORIGINAL O NO-OP IDEMPOTENTE
```

No se crea otra venta externa, otro movimiento de ledger ni otro incremento de saldo.

La respuesta debe permitir recuperar el resultado durable ya aplicado.

---

#### 21. Conflicto por payload incompatible

Para una identidad reutilizada con contenido empresarial materialmente distinto:

```text
MISMA CLAVE
+
HUELLA EMPRESARIAL DISTINTA
=
CONFLICTO DETERMINISTA
```

El segundo contenido no aplica efectos parciales ni crea una nueva acumulación.

---

#### 22. Índice de referencia observado

Supabase dev conserva un índice único sobre:

```text
(site_id, lower(btrim(external_ref)))
```

en `public.loyalty_external_sales`.

Ese índice aporta deduplicación estructural de la misma referencia en una sede, pero no resuelve por sí solo:

- referencia regenerada por retry;
- recuperación del resultado original;
- conflicto por misma clave y payload distinto;
- identidad estable del hecho comercial.

Por tanto se conserva como defensa parcial, no como contrato completo.

---

#### 23. Resultado desconocido

Una pérdida de respuesta después de iniciar la mutación produce:

```text
UNKNOWN_OUTCOME
```

No autoriza a asumir fallo.

Antes de cualquier repetición debe consultarse o reconciliarse el resultado usando la misma identidad empresarial.

Mientras no se conozca el resultado:

```text
NO NUEVA CLAVE
NO SEGUNDO EFECTO
NO SALDO FABRICADO EN UI
NO MENSAJE DE EXITO SIN CONFIRMACION
```

---

#### 24. Cálculo de puntos

La tasa, regla, multiplicador, redondeo, promoción, vigencia y elegibilidad pertenecen al contrato de fidelización PASS.

La fórmula AS-IS:

```text
floor(amount_cop / 1000)
```

no se adopta aquí como regla canónica universal.

La materialización debe resolver y conservar la regla/version realmente aplicable al hecho origen.

---

#### 25. Monto y moneda

El navegador puede capturar o mostrar un monto, pero el servidor debe reconciliarlo contra el hecho comercial autoritativo.

Reglas:

- el monto no se confía por venir del formulario;
- la moneda debe ser explícita o derivable de un contrato inequívoco;
- el monto elegible puede diferir del total bruto según regla PASS;
- una divergencia material produce rechazo o conflicto, no acumulación silenciosa.

---

#### 26. Ledger y saldo pertenecen a PASS

La acumulación confirmada exige coherencia entre:

```text
HECHO ORIGEN
MOVIMIENTO DE LEDGER PASS
PROYECCION / SALDO COHERENTE
```

El saldo no es la única evidencia del movimiento.

PULSO no inserta directamente el ledger ni fija el saldo como fuente de verdad.

---

#### 27. Atomicidad del comando gobernado

El comando autoritativo debe garantizar que una confirmación exitosa no deje combinaciones como:

```text
venta externa sin movimiento de ledger definitivo
movimiento de ledger sin correlacion al origen
saldo actualizado sin movimiento durable
resultado de exito sin transaccion recuperable
```

La implementación puede usar una transacción SQL única o una garantía equivalente aprobada, siempre que preserve la misma invariante observable.

---

#### 28. Atomicidad parcial observada en el RPC actual

`public.award_loyalty_points_external` actualmente concentra en una función SQL:

- inserción de `loyalty_external_sales`;
- cálculo de puntos;
- llamada a `grant_loyalty_points`;
- vínculo con `loyalty_transaction_id`;
- retorno de nuevo saldo y transacción.

`pass.grant_loyalty_points` bloquea la fila del usuario con `FOR UPDATE` antes de insertar ledger y actualizar saldo.

Esto es evidencia estructural favorable para atomicidad, pero no certifica por sí solo idempotencia empresarial, autorización exacta ni rollback E2E ante todas las fallas.

---

#### 29. Bypass directo por helpers de grant

Supabase dev conserva `EXECUTE` para `authenticated` sobre:

```text
public.grant_loyalty_points
pass.grant_loyalty_points
```

El helper PASS observado exige `is_active_staff()` pero no exige por sí mismo:

- `pulso.loyalty.points.accumulate`;
- sede efectiva;
- hecho comercial origen;
- identidad idempotente estable.

Una materialización de `PULSO-AUTH-009` no queda completa mientras exista una ruta invocable equivalente que permita otorgar puntos saltando el contrato exacto.

---

#### 30. Bypass directo de ledger o saldo

El estado DB observado conserva:

- `INSERT` de `authenticated` sobre columnas de `pass.loyalty_transactions`;
- política de self-insert del ledger por `auth.uid() = user_id`;
- `UPDATE` de `authenticated` sobre `public.users.loyalty_points`;
- política `users_update_self` limitada por fila, no por columna.

Estas reglas no demuestran el contrato objetivo que prohíbe a un cliente fijar saldo o insertar un movimiento de acumulación por fuera del comando gobernado.

La unidad física propietaria debe cerrar o encapsular esos caminos según la arquitectura canónica vigente y demostrar que no existe bypass alcanzable con autoridad menor.

---

#### 31. Seguridad de `SECURITY DEFINER`

Las funciones de acumulación observadas usan `SECURITY DEFINER`.

Por tanto, el cuerpo de la función y sus ACL forman parte de la frontera de autorización.

Regla:

```text
SECURITY DEFINER
!=
AUTORIZACION IMPLICITA
```

Una función privilegiada debe validar su contrato exacto o permanecer inaccesible a consumidores que no lo hayan satisfecho.

---

#### 32. RLS actual de ventas loyalty externas

`public.loyalty_external_sales` conserva RLS que exige `is_active_staff()` y `pulso.pos.main` para inserción/lectura staff.

Esto es coherente con el AS-IS legacy, pero no demuestra adopción de:

```text
pulso.loyalty.points.accumulate
```

La materialización deberá alinear la frontera de datos con el permiso atómico o con una capa autoritativa equivalente que no permita bypass.

---

#### 33. Dispositivo compartido

Cuando la operación se ejecuta desde un dispositivo compartido, la firma del trabajador real es obligatoria conforme al contrato transversal aplicable.

La firma:

- identifica al actor humano;
- no concede `pulso.loyalty.points.accumulate`;
- no sustituye turno/check-in;
- no amplía sede;
- no valida por sí sola la venta;
- no sustituye idempotencia.

---

#### 34. Asociación tardía de la firma observada

El AS-IS actual intenta vincular la firma del dispositivo con la transacción loyalty **después** de que el award devuelve éxito.

Si esa asociación falla, el código observado registra el error pero no demuestra compensación del efecto ya aplicado.

Por tanto, el contrato objetivo exige que la evidencia actor → resultado final sea durable, recuperable y no pueda quedar opcionalmente desprendida del efecto.

La integración transversal de dispositivo/actor continúa en `PULSO-AUTH-012` y `PULSO-AUTH-013`.

---

#### 35. Territorio

`site_id` es un localizador que debe resolverse contra la sede operativa efectiva.

Regla:

```text
site_id DEL CLIENTE
!=
AUTORIDAD TERRITORIAL
```

La acumulación debe fallar si venta, actor, cliente operativo y sede efectiva no forman una combinación autorizada.

`PULSO-AUTH-011` conserva la materialización transversal del límite territorial.

---

#### 36. Actor humano

El resultado debe distinguir y correlacionar:

```text
PRINCIPAL TECNICO
ACTOR HUMANO EFECTIVO
DISPOSITIVO
SEDE
PERMISO
HECHO ORIGEN
TRANSACCION LOYALTY
```

`auth.uid()` por sí solo no demuestra el actor humano en una terminal compartida.

`PULSO-AUTH-013` conserva la materialización transversal de atribución laboral.

---

#### 37. Compensaciones posteriores

Esta tarea protege acumulación positiva originada por un hecho elegible.

No autoriza automáticamente:

- reversión de puntos por refund;
- restitución por void;
- ajuste manual;
- compensación;
- corrección de saldo;
- expiración;
- redención.

Cada efecto debe conservar su propia semántica, permiso y correlación.

---

#### 38. Offline y degradación

PULSO no confirma puntos localmente cuando el servidor autoritativo no está disponible.

Si una arquitectura futura usa cola/outbox, debe preservar:

- misma identidad idempotente;
- hecho origen;
- actor;
- sede;
- permiso revalidado al ejecutar;
- política de expiración y reconciliación.

Esta tarea no selecciona ni crea esa arquitectura.

---

#### 39. Clases semánticas mínimas de resultado

La implementación debe distinguir al menos:

| Clase | Semántica |
| --- | --- |
| `APPLIED` | efecto confirmado exactamente una vez |
| `ALREADY_APPLIED` | mismo hecho ya aplicado; retorna resultado durable sin repetir |
| `DENIED` | autoridad, actor, sede o contexto insuficientes; cero efecto |
| `BUSINESS_REJECTED` | cliente, venta, monto, moneda, regla o elegibilidad inválidos; cero efecto |
| `IDEMPOTENCY_CONFLICT` | misma identidad con contenido incompatible; cero segundo efecto |
| `UNKNOWN_OUTCOME` | resultado aún no demostrable; exige reconciliación |
| `TECHNICAL_FAILURE_NO_EFFECT_PROVEN` | fallo técnico sin éxito confirmado |

Los nombres físicos pueden variar; las semánticas no pueden colapsarse en un único error genérico si eso induce un retry inseguro.

---

#### 40. Auditoría mínima

Una acumulación debe poder reconstruir, sin secretos:

- principal técnico;
- actor humano;
- turno/check-in cuando apliquen;
- dispositivo;
- sede;
- PermissionKey evaluada;
- cliente;
- hecho comercial origen;
- monto y moneda;
- regla/version PASS;
- identidad idempotente;
- huella empresarial relevante;
- decisión de autorización;
- resultado semántico;
- transacción de ledger;
- saldo/proyección resultante;
- correlación temporal y técnica.

No se registran PIN en claro, tokens de sesión ni datos personales innecesarios.

---

#### 41. Invariantes de autorización e integridad

| Escenario | Resultado obligatorio |
| --- | --- |
| `pulso.access` sin permiso de acumulación | `DENY` |
| `pulso.pos.main` legacy sin permiso atómico objetivo | no demuestra conformidad final |
| `gerencia_operativa` por supervisión | `DENY` |
| cajero sin turno/check-in vigente | `DENY` |
| sede enviada distinta a sede efectiva | `DENY` |
| cliente sin hecho elegible correlacionado | `DENY` |
| monto UI distinto al monto autoritativo | rechazo o conflicto |
| venta cancelada/anulada/no elegible | `DENY` |
| retry equivalente con misma identidad | mismo resultado, sin segundo efecto |
| misma identidad con huella incompatible | conflicto, cero segundo efecto |
| timeout después de enviar | reconciliar antes de repetir |
| firma compartida válida pero actor sin permiso | `DENY` |
| acceso directo a helper de grant con autoridad menor | debe quedar bloqueado o exigir contrato equivalente |
| acceso directo a ledger/saldo con autoridad menor | debe quedar bloqueado |
| éxito sin correlación durable actor/origen/ledger | resultado no certificable como conformidad |

---

#### 42. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| Server Action y RPC usan `pulso.pos.main` en vez de `pulso.loyalty.points.accumulate`. | bloquea autorización atómica final | `PULSO-AUTH-009::<implementation_unit_id>` + `PULSO-AUTH-015` | la mutación y su frontera DB evalúan la PermissionKey exacta sin broad-authority equivalente |
| La UI genera `external_ref` con `Date.now`, `Math.random` e IDs truncados. | retry del mismo hecho puede obtener otra identidad y duplicar puntos | `PULSO-AUTH-009::<implementation_unit_id>` | identidad estable del hecho, persistida/reutilizada desde antes del primer efecto |
| El input tipado de award no exige `order_id` ni otra identidad empresarial origen. | monto/ref no demuestran una compra elegible | `PULSO-AUTH-009::<implementation_unit_id>` | comando correlaciona de forma obligatoria el efecto con un hecho comercial estable y autoritativo |
| UI y RPC reproducen `floor(amount/1000)` como lógica local/legacy. | puede divergir de reglas PASS versionadas | `PULSO-AUTH-009::<implementation_unit_id>` + integración PASS propietaria | cálculo autoritativo usa regla/version PASS y la evidencia conserva esa versión |
| El índice único solo deduplica la misma referencia dentro de sede. | no cubre referencia regenerada, recuperación ni conflicto semántico | `PULSO-AUTH-009::<implementation_unit_id>` | replay equivalente recupera resultado; payload distinto genera conflicto determinista |
| `public.grant_loyalty_points` y `pass.grant_loyalty_points` mantienen EXECUTE para `authenticated` y no exigen el contrato completo de PULSO. | existe una frontera DB con autoridad más débil que la mutación objetivo | unidad física propietaria + contratos AUTH/DB aplicables | helpers quedan internos/restringidos o revalidan permiso, territorio, origen e idempotencia equivalentes |
| `pass.loyalty_transactions` permite self-insert y `public.users.loyalty_points` conserva UPDATE autenticado por fila. | la política observada no demuestra que ledger/saldo solo muten mediante comando gobernado | unidad física propietaria + contratos AUTH/DB/PASS aplicables | pruebas demuestran cero bypass de ledger/saldo para clientes y staff sin autoridad específica |
| La firma compartida se asocia al `transaction_id` después del award y un fallo de asociación solo se registra. | puede existir efecto sin vínculo durable al actor efectivo | `PULSO-AUTH-009::<implementation_unit_id>` + `PULSO-AUTH-012` + `PULSO-AUTH-013` | actor/dispositivo/resultado quedan correlacionados de forma durable o reconciliable antes de certificar éxito |
| Supabase dev no contiene filas en `loyalty_external_sales` ni `pass.loyalty_transactions`. | no existe evidencia operativa E2E sobre casos reales | `PULSO-AUTH-016` | pruebas controladas demuestran allow/deny, retry, concurrencia, actor y reconciliación |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 43. Frontera con tareas posteriores

| Tarea | Responsabilidad reservada |
| --- | --- |
| `PULSO-AUTH-010` | proteger redenciones sin reutilizar autoridad de acumulación |
| `PULSO-AUTH-011` | hacer vinculante el límite territorial del turno y recurso |
| `PULSO-AUTH-012` | integrar terminal compartida sin transferir privilegios |
| `PULSO-AUTH-013` | registrar al trabajador efectivo como actor durable |
| `PULSO-AUTH-014` | mantener configuración y administración separadas de operación |
| `PULSO-AUTH-015` | materializar PermissionKeys, migrar consumers y retirar broad authority |
| `PULSO-AUTH-016` | certificar allow/deny, idempotencia, concurrencia, recuperación e integración |

La autoridad de acumular no se reutiliza como autoridad de ninguna de esas acciones.

---

#### 44. Materialización física posterior

La futura unidad `PULSO-AUTH-009::<implementation_unit_id>` deberá materializar únicamente el alcance que su `implementation_unit_id`, package lineage y autorización física declaren.

Puede requerir, según la unidad propietaria aprobada:

- migración de permisos;
- Server Action o adaptador;
- RPC/función SQL;
- ACL/grants;
- RLS;
- esquema o constraint de idempotencia;
- contratos/tipos compartidos;
- pruebas de integración y seguridad;
- migración de consumidores.

Cualquier cambio Supabase de VENTO deberá crearse, versionarse, documentarse y ejecutarse desde `vento-shell`.

Este marcador global no ejecuta esos cambios.

---

#### 45. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: autorización exacta, contexto operativo, territorio, ledger/saldo, acumulación server-side, compra elegible, regla versionada, actor, dispositivo, idempotencia, concurrencia, resultado desconocido, recuperación y prohibición de bypass ya poseen cobertura verificable vigente. Esta tarea especializa esa cobertura en el contrato físico de acumulación PULSO → PASS sin crear una obligación material nueva.

---

#### 46. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente de:

- `TREQ-PASS-008` para servidor autorizado, atomicidad, idempotencia y prohibición de escritura directa del ledger/saldo por cliente;
- `TREQ-PASS-010` para ledger inmutable/reconciliable, reglas/versiones y reintentos sin duplicación;
- `TREQ-PASS-025` para cliente, compra elegible, monto, moneda, regla vigente, actor, dispositivo, referencia estable y coherencia ledger/saldo;
- `TREQ-PASS-026` para prohibir referencias basadas únicamente en `Date.now`, `Math.random`, IDs truncados o estado de UI;
- `TREQ-PASS-029` para firma del trabajador real en dispositivo compartido;
- `TREQ-PASS-030` para secreto efímero y controles del PIN;
- `TREQ-PASS-032` para que la interfaz refleje solo resultados confirmados y distinga duplicado, conflicto, denegación y ya aplicado;
- `TREQ-PULSO-014` y `TREQ-PULSO-015` para acceso protegido y territorio no ampliable por `site_id`;
- `TREQ-PULSO-026` para separar permiso observado de suficiencia contractual;
- `TREQ-AUTH-001`, `TREQ-AUTH-004`, `TREQ-AUTH-006`, `TREQ-AUTH-008`, `TREQ-AUTH-009`, `TREQ-AUTH-011` y `TREQ-AUTH-013` para autorización canónica, equivalencia de evaluadores, protección del saldo, contexto operativo, territorio, actor compartido y no bypass de mutaciones;
- `TREQ-INTEGRATION-003`, `TREQ-INTEGRATION-111`, `TREQ-INTEGRATION-112`, `TREQ-INTEGRATION-113`, `TREQ-INTEGRATION-120`, `TREQ-INTEGRATION-121` y `TREQ-INTEGRATION-142` para identidad estable, replay, conflicto, concurrencia y recuperación de resultado desconocido.

Esta enumeración es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 47. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout local después de incorporar el artefacto; no se ejecutó build de producto. |
| LOCAL | NOT_EXECUTED | El marcador no fue insertado en un checkout del usuario ni sometido allí a formateador, quality, delivery, topología y batería global. |
| REMOTA | PASS | Se verificaron `vento-shell` canónico, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, contratos PULSO/PASS, `vento-pulso/main@715b5683db05caa010d725679b5ada4705a6da6e`, blobs de award/scanner y estado read-only de RPC, grants, RLS, índices, ledger y saldo en Supabase dev. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron ventas, acumulaciones, retries, timeouts, concurrencia, dispositivos compartidos ni reconciliaciones reales; las tablas observadas de acumulación estaban sin filas de evidencia operativa. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `PULSO-AUTH-009::<implementation_unit_id>` ni ejecuta cambios POST_E5. |

---

#### 48. Criterios de aceptación

- [ ] La PermissionKey protegida es exactamente `pulso.loyalty.points.accumulate`.
- [ ] `cajero_satelite` permanece actor ordinario autorizable únicamente con `T+C` y territorio compatible.
- [ ] `gerencia_operativa` no recibe acumulación por supervisión.
- [ ] `pulso.pos.main` no se acepta como autoridad final.
- [ ] El hecho origen es una venta/compra/transacción estable y elegible.
- [ ] El cliente se revalida contra el hecho origen.
- [ ] Monto y moneda se resuelven desde fuente autoritativa, no solo desde UI.
- [ ] La regla de puntos y su versión pertenecen a PASS y quedan correlacionadas al resultado.
- [ ] La fórmula AS-IS `floor(amount/1000)` no se convierte por inferencia en regla universal.
- [ ] La identidad idempotente existe antes del primer efecto y sobrevive retries/reinicio/pérdida de red.
- [ ] `Date.now`, `Math.random` e IDs truncados no bastan como identidad empresarial.
- [ ] Mismo key + misma huella devuelve resultado original/no-op sin duplicar.
- [ ] Mismo key + huella incompatible produce conflicto sin segundo efecto.
- [ ] Un timeout o respuesta perdida se reconcilia antes de repetir.
- [ ] El índice único observado se conserva como defensa parcial, no como única idempotencia.
- [ ] Ledger, saldo y hecho origen permanecen coherentes o la operación no se certifica como aplicada.
- [ ] PASS conserva ownership del ledger y saldo.
- [ ] La Server Action, RPC y capa DB no permiten bypass con autoridad menor.
- [ ] Los helpers `grant_loyalty_points` no quedan como camino equivalente con validación más débil.
- [ ] El cliente no puede crear ledger ni fijar `loyalty_points` por una ruta de autoridad inferior.
- [ ] `SECURITY DEFINER` conserva checks explícitos o una frontera de ejecución restringida.
- [ ] RLS/ACL se alinean con el permiso atómico o con una frontera autoritativa equivalente.
- [ ] La firma de dispositivo identifica al humano pero no concede autoridad.
- [ ] La correlación actor/dispositivo/resultado es durable o reconciliable.
- [ ] `site_id` del navegador no amplía territorio.
- [ ] Refund, void, cancel y ajustes no generan efectos loyalty automáticos.
- [ ] No existe confirmación local definitiva de puntos cuando el servidor no confirma.
- [ ] Las clases de resultado distinguen aplicado, ya aplicado, denegado, rechazo empresarial, conflicto y resultado desconocido.
- [ ] Todo hallazgo tiene propietario y condición de salida.
- [ ] La topología es `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde este marcador global.

---

#### 49. Límites

Esta tarea no:

- modifica `vento-pulso`;
- cambia la UI del scanner;
- cambia `awardLoyaltyPointsAction`;
- cambia `award_loyalty_points_external`;
- cambia `grant_loyalty_points`;
- crea o revoca grants;
- cambia RLS;
- modifica `public.users`;
- modifica `pass.loyalty_transactions`;
- cambia reglas comerciales de puntos;
- crea una nueva tasa de acumulación;
- crea una cola/outbox;
- ejecuta una venta;
- otorga puntos reales;
- corrige saldos;
- revierte puntos;
- protege redenciones;
- implementa territorio de turno;
- implementa dispositivo compartido;
- implementa actor humano;
- migra físicamente `pulso.pos.main`;
- crea migraciones;
- modifica Supabase remoto;
- modifica datos;
- modifica el Registro 04A;
- crea o autoriza una instancia física;
- ejecuta E5.

---

#### 50. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-008 — Definir permisos de cierre y anulación`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-009 — Proteger acumulación de puntos`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-010 — Proteger redenciones`
### ✅ PULSO-AUTH-010 — Proteger redenciones

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-009 — Proteger acumulación de puntos
**Tarea siguiente:** PULSO-AUTH-011 — Limitar operación a sede del turno
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — protección server-side de la validación y consumo de redenciones PASS desde PULSO mediante permiso atómico `pulso.loyalty.points.redeem`, intención preexistente, estado consumible, actor y territorio efectivos, elegibilidad y vigencia, coherencia con ledger, uso único, atomicidad, idempotencia, concurrencia, recuperación de resultado y cierre de bypass directos por Data API o autorización legacy
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/01_AUTORIZACION_DE_VENTA_Y_CAJA.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; toda materialización futura ocurre únicamente mediante `PULSO-AUTH-010::<implementation_unit_id>` después de que el paquete propietario aplicable satisfaga `E5-GATE-008::<package_id> = PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la frontera completa de autorización, integridad y uso único para validar y consumir desde PULSO una intención de redención creada por PASS, sin permitir que la posesión de un código, un estado `pending`, `pulso.pos.main`, una lista legacy de roles, una policy amplia, una firma de dispositivo o una llamada directa a la tabla puedan convertir por sí solas el ticket en un canje válido.

La regla raíz queda:

```text
INTENCION PASS EXISTENTE Y RESOLUBLE
+
CLIENTE Y RECOMPENSA CORRECTOS
+
ESTADO CONSUMIBLE Y VIGENCIA VALIDA
+
ACTOR Y CONTEXTO OPERATIVO VALIDOS
+
SEDE EFECTIVA COMPATIBLE
+
PERMISO pulso.loyalty.points.redeem
+
EFECTO DE PUNTOS / LEDGER COHERENTE
+
IDENTIDAD ESTABLE DEL CONSUMO
+
COMANDO SERVIDOR AUTORITATIVO
=
REDENCION AUTORIZABLE
```

Ningún elemento aislado sustituye el conjunto completo.

---

#### 2. Handoff recibido de PULSO-AUTH-009

`PULSO-AUTH-009` entrega a esta tarea las siguientes reglas reutilizables:

- `pulso.pos.main` es evidencia AS-IS y no autoridad final;
- toda mutación de fidelización exige PermissionKey exacta;
- PULSO solicita el efecto y PASS conserva ownership del ledger y saldo;
- actor, territorio, recurso e identidad idempotente se revalidan en el punto de efecto;
- un retry equivalente no puede producir un segundo efecto;
- un resultado desconocido se reconcilia antes de repetir;
- una capa inferior no puede conservar una autoridad más débil que la acción protegida.

La autoridad de acumulación no se reutiliza para redención:

```text
pulso.loyalty.points.accumulate
!=
pulso.loyalty.points.redeem
```

---

#### 3. Handoff recibido de PULSO-AUTH-008

`PULSO-AUTH-008` conserva separados cancelación, void, refund y fidelización.

Regla heredada:

```text
REFUND / VOID / CANCEL
!=
AUTOMATIC LOYALTY RESTORE
```

Una restitución posterior de puntos, cuando proceda, debe ser un hecho PASS autorizado, correlacionado, idempotente y auditable. Esta tarea no convierte el consumo de una redención en owner de compensaciones posteriores.

---

#### 4. Handoffs de PULSO-AUTH-006 y PULSO-AUTH-007

`PULSO-AUTH-006` definió:

```text
pulso.loyalty.points.redeem
```

como capacidad ordinaria de `cajero_satelite`, con:

```text
OPERATIONAL_ONLY / T+C
```

y alcance máximo de redención vigente del cliente, sede compatible y efecto único.

`PULSO-AUTH-007` confirmó que `gerencia_operativa` no recibe redención por supervisión.

Por tanto:

```text
cajero_satelite + T+C + permiso exacto + recurso compatible
→ actor ordinario autorizable

gerencia_operativa
→ NO GRANT DE REDENCION POR INFERENCIA
```

---

#### 5. Contrato PASS consumido

Esta tarea consume `PASS-INT-002 — Definir integración PULSO → PASS para redención` sin redefinir ownership.

La frontera permanece:

```text
PASS
→ crea y gobierna la intención, recompensa, regla, ledger y semántica de fidelización

PULSO
→ resuelve la intención presentada y solicita validarla/consumirla dentro de contexto autorizado
```

Crear un ticket no equivale a usarlo y mostrar un QR no equivale a confirmar un canje.

---

#### 6. Naturaleza y topología

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Este marcador define una sola vez el contrato global.

Cada materialización futura utiliza:

```text
PULSO-AUTH-010::<implementation_unit_id>
```

No existe una identidad de unidad física autorizada por este documento.

---

#### 7. Gate físico posterior

Una unidad física de `PULSO-AUTH-010` solo puede comenzar cuando concurran:

```text
PAQUETE PROPIETARIO APLICABLE
+
E5-GATE-008::<package_id> = PASS
+
implementation_unit_id RESUELTO POR EL CARRIL FISICO
+
AUTORIZACION FISICA EXPLICITA
```

El marcador global no ejecuta cambios de producto, base de datos, permisos, RLS, grants, funciones ni datos.

---

#### 8. Superficie protegida

La evidencia AS-IS relevante comprende:

```text
/scanner
modo redemption
processRedemptionAction
validateRedemption
markRedemptionAsUsed
pass.loyalty_redemptions
pass.loyalty_rewards
pass.loyalty_transactions
```

Estas identidades describen la implementación observada. No sustituyen la PermissionKey ni convierten una función auxiliar o una tabla en contrato de autoridad.

---

#### 9. Autoridad efectiva

La autorización de consumo se calcula como intersección de:

```text
principal autenticado
∩ actor humano efectivo
∩ trabajador activo
∩ turno vigente
∩ check-in activo
∩ cajero_satelite
∩ sede y area operativas efectivas
∩ dispositivo permitido cuando aplique
∩ pulso.loyalty.points.redeem
∩ redencion real
∩ estado consumible
∩ reglas PASS vigentes
∩ ausencia de deny prevalente
```

La ausencia, ambigüedad o incompatibilidad de cualquier componente requerido produce denegación cerrada.

---

#### 10. Lo que no concede autoridad

No constituyen autorización suficiente:

```text
poseer el QR o codigo
status = pending
pulso.access
pulso.pos.main
employees.role = cajero
employees.role = gerente
is_active_staff()
pertenecer a una sede en employee_sites
pantalla visible
boton visible
sesion tecnica del dispositivo
PIN o firma correcta
order_id enviado por cliente
policy RLS permisiva
UPDATE directo sobre la tabla
```

Cada elemento puede aportar contexto o una defensa parcial, pero no sustituye la decisión empresarial completa.

---

#### 11. Intención y consumo permanecen separados

La redención conserva dos hechos distintos:

```text
PASS CREA INTENCION
!=
PULSO CONSUME INTENCION
```

PULSO no crea un ticket alternativo cuando el presentado falla, no cambia el cliente, no sustituye la recompensa y no reconstruye una intención ausente desde datos de interfaz.

---

#### 12. Identidad estable de la redención

El servidor debe resolver una identidad durable del ticket y demostrar, como mínimo:

- redención exacta;
- cliente exacto;
- recompensa exacta;
- regla/version aplicable;
- costo o efecto de puntos;
- sede o ámbito permitido;
- estado actual;
- vigencia;
- correlación con ledger o efecto de puntos;
- identidad estable del consumo o mecanismo equivalente de replay seguro.

El texto del QR es un localizador; no es la autoridad empresarial.

---

#### 13. PermissionKey exacta

La mutación objetivo exige:

```text
pulso.loyalty.points.redeem
```

No son equivalentes:

```text
pulso.access
pulso.pos.main
pos.loyalty.validate_redemption
nombre del rol
policy de tabla
```

Un action code de auditoría puede conservar identidad propia, pero no sustituye la PermissionKey evaluada para autorizar la mutación.

---

#### 14. Revalidación en el punto de efecto

Inmediatamente antes de cambiar la redención a usada/validada, la frontera autoritativa debe recalcular:

- sesión y principal;
- actor humano;
- turno y check-in;
- rol operativo;
- permiso exacto;
- sede y área efectivas;
- redención;
- cliente y recompensa;
- regla/vigencia;
- estado de puntos/ledger;
- estado actual de la redención;
- orden o hecho comercial cuando corresponda;
- identidad idempotente y estado previo de esa identidad.

Una autorización obtenida antes de resolver el ticket no se reutiliza ciegamente después de cambios concurrentes.

---

#### 15. Secuencia AS-IS de `processRedemptionAction`

La acción observada ejecuta actualmente, en este orden:

```text
validateRedemption(qrCode)
→ requireAppAccess(... pos.main ...)
→ requireSharedDeviceActorSignature(...)
→ markRedemptionAsUsed(...)
→ attachSharedDeviceActionSignatureTarget(...)
```

La lectura/resolución de la redención ocurre antes del guard PULSO.

Eso constituye adopción parcial, no cumplimiento del contrato objetivo.

---

#### 16. Guard AS-IS

El guard observado de `processRedemptionAction` usa:

```text
permissionCode = pos.main
```

sin proporcionar en esa llamada un `siteId` derivado de la redención.

Por tanto, esa capa no demuestra todavía:

```text
pulso.loyalty.points.redeem
+
territorio efectivo de la redencion
```

La materialización debe resolver ambos antes de autorizar el efecto.

---

#### 17. Validación AS-IS del ticket

`validateRedemption` consulta `pass.loyalty_redemptions` por `qr_code` y verifica principalmente:

- existencia de una fila resoluble;
- `status = pending`;
- nombre de recompensa para presentación.

La fuente observada no demuestra en esa función:

- PermissionKey exacta;
- turno/check-in;
- sede efectiva;
- vigencia/expiración;
- `is_active` de la recompensa;
- coherencia entre `site_id` de redención y recompensa;
- estado del ledger o débito/reserva de puntos;
- compatibilidad con pedido cuando corresponda.

---

#### 18. Mutación AS-IS

`markRedemptionAsUsed` realiza actualmente:

```text
auth.getUser()
→ UPDATE pass.loyalty_redemptions
   SET status = validated,
       validated_at = timestamp,
       order_id = valor opcional
   WHERE id = redemptionId
     AND status = pending
```

La función comprueba autenticación y una transición `pending -> validated`, pero no revalida por sí sola el contrato completo de `pulso.loyalty.points.redeem`.

---

#### 19. Compare-and-set como defensa parcial

El filtro:

```text
WHERE id = redemptionId
AND status = pending
```

es una defensa útil contra dos updates secuenciales o concurrentes sobre la misma fila.

Sin embargo:

```text
COMPARE-AND-SET DE ESTADO
!=
IDEMPOTENCIA EMPRESARIAL COMPLETA
```

Un segundo intento actualmente puede recibir “ya utilizado o no disponible”, pero no existe por esta evidencia una identidad de operación que permita recuperar el resultado durable original y distinguir replay equivalente de conflicto semántico.

---

#### 20. Uso único e idempotencia

La materialización debe garantizar:

```text
MISMA REDENCION
+
MISMA IDENTIDAD DE CONSUMO
+
MISMA HUELLA LOGICA
=
MISMO RESULTADO EMPRESARIAL
```

Y:

```text
MISMA IDENTIDAD DE CONSUMO
+
HUELLA INCOMPATIBLE
=
CONFLICTO
```

Un retry no genera un segundo consumo, un segundo débito, otra intención ni un resultado contradictorio.

---

#### 21. Concurrencia

Dos cajas, pestañas, dispositivos o requests que intenten consumir la misma redención deben converger en:

```text
UN GANADOR EMPRESARIAL
+
CERO SEGUNDO EFECTO
```

Los demás intentos deben recuperar el resultado durable o recibir un conflicto/estado no consumible inequívoco.

La lectura previa `pending` no es control suficiente de concurrencia.

---

#### 22. Resultado desconocido

Una pérdida de respuesta después de iniciar la mutación no autoriza a asumir fallo.

Ante timeout, desconexión o respuesta perdida:

```text
NO CREAR OTRO TICKET
NO RESTAURAR pending DESDE CLIENTE
NO REPETIR CON IDENTIDAD NUEVA
NO VOLVER A DEBITAR PUNTOS
NO MOSTRAR CANJE CONFIRMADO SIN EVIDENCIA
RECONCILIAR RESULTADO DURABLE
```

Si el resultado no puede determinarse con seguridad, queda `RECONCILIATION_REQUIRED`.

---

#### 23. Clases semánticas mínimas de resultado

La frontera de consumo debe distinguir al menos:

| Clase | Significado |
| --- | --- |
| `APPLIED` | la redención fue consumida exactamente una vez |
| `ALREADY_APPLIED` | el mismo efecto ya existe y se recupera sin repetirlo |
| `AUTH_DENIED` | falta autoridad, contexto o permiso exacto |
| `TERRITORY_DENIED` | la sede efectiva no puede consumir el ticket |
| `STATE_REJECTED` | el ticket no está consumible |
| `ELIGIBILITY_REJECTED` | cliente, recompensa, vigencia o ledger no satisfacen el contrato |
| `IDEMPOTENCY_CONFLICT` | la misma identidad representa contenido incompatible |
| `UNKNOWN_OUTCOME` | no puede demostrarse éxito ni fallo sin conciliación |
| `TECHNICAL_FAILURE` | error técnico sin efecto confirmado |

Los nombres son semánticos y no obligan un enum físico concreto.

---

#### 24. Territorio de la redención

La sede efectiva se resuelve desde el contexto autorizado y la redención/recompensa, no desde un valor libre del navegador.

El esquema observado contiene `site_id` en:

```text
pass.loyalty_redemptions
pass.loyalty_rewards
```

La materialización debe definir y comprobar la relación válida entre ambos conforme al contrato PASS aplicable.

`PULSO-AUTH-011` conserva la materialización transversal del límite territorial del turno y recurso.

---

#### 25. Estado canónico de RLS esperado por AUTH-DB-002

La migración canónica `AUTH-DB-002` elimina las policies amplias:

```text
staff_select_all_redemptions
staff_validate_redemptions
```

y conserva como dependencias positivas transitorias:

```text
loyalty_redemptions_select_cashier
loyalty_redemptions_validate_cashier
loyalty_redemptions_select_own
```

Por tanto, las policies `staff_*` no forman parte del estado endurecido objetivo ya aprobado.

---

#### 26. Estado remoto de desarrollo observado

En Supabase dev se observaron todavía:

```text
staff_select_all_redemptions
staff_validate_redemptions
```

junto con las policies `loyalty_redemptions_*_cashier`.

Además, `supabase_migrations.schema_migrations` contiene únicamente el baseline observado y no demuestra que `AUTH-DB-002` haya sido aplicado en ese ambiente.

Esta divergencia se clasifica como estado de materialización pendiente; no redefine el contrato canónico.

---

#### 27. Policies cashier siguen siendo transitorias

Aunque `AUTH-DB-002` conserva `loyalty_redemptions_select_cashier` y `loyalty_redemptions_validate_cashier`, esas policies se basan en:

- empleado activo;
- lista de roles base;
- sede principal o `employee_sites`;
- `status = pending` para update.

No demuestran por sí solas:

```text
cajero_satelite
+
T+C
+
pulso.loyalty.points.redeem
+
actor compartido
+
regla PASS completa
```

La materialización final debe alinear la capa DB con la misma autoridad empresarial.

---

#### 28. Frontera de columnas

Las policies AS-IS de UPDATE controlan condición de fila y estado resultante, pero no constituyen por sí mismas un contrato de columnas inmutables.

La tabla observada conserva grants amplios de UPDATE para `authenticated` y columnas empresariales como:

```text
user_id
reward_id
points_spent
site_id
order_id
metadata
status
validated_at
```

La solución objetivo debe impedir que una llamada directa modifique campos distintos de los autorizados para el consumo o debe encapsular la mutación detrás de un comando propietario equivalente.

---

#### 29. ACL y Data API no sustituyen autorización empresarial

Los grants observados permiten a roles de Data API alcanzar las relaciones, mientras RLS decide filas.

La regla objetivo permanece:

```text
GRANT
+
RLS
!=
PERMISO EMPRESARIAL COMPLETO
```

El consumo de redención debe quedar disponible únicamente por una frontera que revalide `pulso.loyalty.points.redeem` y el resto del contrato, sin un bypass de menor autoridad.

---

#### 30. Modelo de estado observado

El constraint remoto observado admite:

```text
pending
validated
cancelled
```

La semántica contractual distingue además condiciones como vencida, inválida, fuera de territorio o no elegible aunque no deban convertirse necesariamente en nuevos valores persistidos.

No se inventa un enum físico adicional desde esta tarea.

---

#### 31. Vigencia y expiración

La tabla observada no expone una columna dedicada `expires_at` para `pass.loyalty_redemptions`.

Eso no autoriza a omitir vigencia.

La materialización deberá obtener la vigencia desde la fuente canónica que el contrato PASS defina y fallar cerrado cuando no pueda demostrarla.

No se crea aquí una nueva política de expiración.

---

#### 32. Recompensa y aplicabilidad

Antes del consumo deben revalidarse como mínimo:

- `reward_id` correcto;
- recompensa existente;
- estado activo cuando corresponda;
- sede/ámbito aplicable;
- costo o efecto de puntos coherente;
- regla/version vigente;
- ausencia de sustitución de recompensa por payload cliente.

El AS-IS de `validateRedemption` obtiene el nombre de la recompensa, pero esa lectura no demuestra toda la elegibilidad anterior.

---

#### 33. Identidad del cliente

La redención permanece vinculada a su `user_id` canónico.

PULSO no puede:

- sustituir el cliente durante el consumo;
- inferir otro cliente por nombre, correo o teléfono;
- aplicar el ticket al cliente seleccionado previamente en otro modo del scanner;
- usar el actor trabajador como identidad cliente.

La identidad del trabajador y la identidad del cliente permanecen separadas.

---

#### 34. Ledger y efecto de puntos

El consumo no debe aplicar nuevamente el costo de puntos si la creación de intención ya produjo un débito o reserva.

Antes de confirmar debe poder demostrarse:

```text
REDENCION
↔
EFECTO DE PUNTOS ESPERADO
↔
LEDGER / PROYECCION COHERENTE
```

Si esa relación no es demostrable, el ticket no se consume a ciegas y pasa a rechazo o conciliación según el estado real.

---

#### 35. Pedido o hecho comercial asociado

`markRedemptionAsUsed` acepta `orderId` opcional y la UI observada invoca `processRedemptionAction` sin proporcionar uno.

Por tanto, el runtime actual no demuestra correlación obligatoria con pedido.

La regla objetivo queda:

- cuando la recompensa o proceso requiera pedido/venta, la relación debe resolverse y validarse server-side antes del consumo;
- cuando el contrato PASS permita un beneficio sin pedido, esa ausencia debe estar explícitamente autorizada por la regla aplicable;
- un `orderId` enviado por cliente nunca amplía elegibilidad.

---

#### 36. Ambigüedad de código

En el esquema observado no existe un índice único sobre `pass.loyalty_redemptions.qr_code`.

La consulta AS-IS usa resolución de una sola fila, por lo que una ambigüedad no debe convertirse en selección arbitraria.

Regla objetivo:

```text
CODIGO AMBIGUO
→ DENY / CONFLICT
```

La garantía de identidad única de la intención pertenece al contrato PASS y a su materialización propietaria; PULSO solo consume una identidad inequívoca.

---

#### 37. Dispositivo compartido

La acción observada solicita firma de trabajador antes de la mutación cuando la sesión es compartida y utiliza como target la redención ya resuelta.

Esto es una defensa parcial útil.

Sin embargo:

```text
FIRMA VALIDA
!=
PERMISO pulso.loyalty.points.redeem
```

`PULSO-AUTH-012` conserva la integración del dispositivo y `PULSO-AUTH-013` la atribución durable del trabajador efectivo.

---

#### 38. Secreto efímero del trabajador

Cuando exista PIN/firma:

- no forma parte del ticket;
- no se persiste en ledger;
- no se registra en logs o metadata empresarial;
- no se reutiliza para otro canje;
- no amplía autoridad;
- se limpia conforme al contrato de dispositivo compartido.

Esta tarea no crea credenciales nuevas.

---

#### 39. Reversión o restitución posterior

Consumir una redención no concede autoridad para restaurar puntos, cancelar el ticket retroactivamente o borrar evidencia.

Si un hecho posterior exige restitución:

```text
NUEVO HECHO PASS AUTORIZADO
+
REFERENCIA AL HECHO ORIGINAL
+
IDEMPOTENCIA
+
AUDITORIA
```

No se modifica destructivamente el historial del canje.

---

#### 40. Offline y degradación

Sin autoridad servidor disponible no existe canje definitivo local.

La interfaz puede conservar estado suficiente para informar al operador, pero no puede:

- marcar localmente el ticket como usado;
- asumir éxito;
- crear otro ticket;
- ejecutar una compensación local;
- reintentar con identidad nueva.

Una futura cola gobernada deberá satisfacer las mismas invariantes y no se crea aquí.

---

#### 41. Auditoría mínima

Cada consumo debe permitir reconstruir:

```text
REDENCION / TICKET
CLIENTE
RECOMPENSA
REGLA / VERSION
EFECTO DE PUNTOS
ESTADO ANTERIOR
ESTADO RESULTANTE
SEDE
ACTOR HUMANO
PRINCIPAL TECNICO
DISPOSITIVO CUANDO APLIQUE
PERMISO EVALUADO
PEDIDO / HECHO COMERCIAL CUANDO APLIQUE
IDENTIDAD IDEMPOTENTE
RESULTADO DURABLE
TIMESTAMP
CORRELACION
```

No se almacenan PIN, secretos, tokens ni datos personales innecesarios.

---

#### 42. Invariantes de autorización e integridad

| Escenario | Resultado obligatorio |
| --- | --- |
| código válido pero sin `pulso.loyalty.points.redeem` | `DENY` |
| `pulso.pos.main` legacy sin permiso atómico objetivo | no demuestra conformidad final |
| `gerencia_operativa` por supervisión | `DENY` |
| cajero sin turno/check-in vigente | `DENY` |
| lectura del ticket antes de autorización completa | no puede convertirse en mutación autorizada |
| redención `validated` | cero segundo consumo |
| redención `cancelled` | `DENY` |
| redención vencida/no vigente | `DENY` |
| sede efectiva incompatible | `DENY` |
| recompensa inactiva/no aplicable | `DENY` |
| ledger/efecto de puntos incoherente | rechazo o conciliación, nunca consumo ciego |
| mismo consumo concurrente | un ganador empresarial |
| retry equivalente | mismo resultado durable, cero segundo efecto |
| misma identidad con huella incompatible | `IDEMPOTENCY_CONFLICT` |
| timeout después de enviar | reconciliar antes de repetir |
| firma compartida válida pero actor sin permiso | `DENY` |
| UPDATE directo con autoridad menor | debe quedar bloqueado o exigir contrato equivalente |
| código ambiguo | `DENY` o conflicto, nunca selección arbitraria |
| refund/void/cancel posterior | no restaura loyalty por inferencia |

---

#### 43. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `validateRedemption` se ejecuta antes de `requireAppAccess`. | la resolución del ticket no parte del guard PULSO objetivo | `PULSO-AUTH-010::<implementation_unit_id>` | la frontera autoritativa ordena autenticación/contexto/permiso y resolución de recurso sin exponer ni mutar por una autoridad inferior |
| `processRedemptionAction` usa `pos.main` y no pasa `siteId` al guard observado. | falta demostrar PermissionKey y territorio exactos | `PULSO-AUTH-010::<implementation_unit_id>` + `PULSO-AUTH-015` | `pulso.loyalty.points.redeem` y territorio efectivo se revalidan en la mutación |
| `validateRedemption` comprueba esencialmente existencia y `pending`, sin demostrar vigencia, recompensa activa, territorio, ledger ni regla completa. | un ticket formalmente pendiente puede no ser elegible | `PULSO-AUTH-010::<implementation_unit_id>` + contrato PASS aplicable | todas las condiciones de elegibilidad se resuelven desde fuentes autoritativas antes del efecto |
| `markRedemptionAsUsed` revalida autenticación y `pending`, pero no el contrato completo de autorización. | helper inferior con autoridad insuficiente puede convertirse en bypass | `PULSO-AUTH-010::<implementation_unit_id>` | la capa de efecto exige contrato completo o deja de ser invocable por consumidores de menor autoridad |
| El compare-and-set `pending -> validated` evita parte del doble uso, pero no conserva identidad de consumo ni replay de resultado. | retry o respuesta perdida no tienen recuperación idempotente completa | `PULSO-AUTH-010::<implementation_unit_id>` | misma identidad/huella recupera el resultado durable; huella incompatible produce conflicto |
| Supabase dev conserva `staff_select_all_redemptions` y `staff_validate_redemptions`, aunque `AUTH-DB-002` las elimina. | ambiente observado no refleja el hardening canónico | materialización DB aplicable desde `vento-shell` + `PULSO-AUTH-010::<implementation_unit_id>` | ambiente objetivo demuestra ausencia de policies broad y pruebas negativas correspondientes |
| Las policies cashier conservadas por `AUTH-DB-002` usan rol base/sede y no PermissionKey/T+C. | hardening histórico no equivale a autorización PULSO final | `PULSO-AUTH-010::<implementation_unit_id>` + `PULSO-AUTH-015` | DB evalúa permiso/territorio/contexto equivalentes al contrato objetivo |
| Los grants y la policy de UPDATE no demuestran restricción de columnas al efecto mínimo de consumo. | una llamada directa podría intentar modificar atributos ajenos al canje | unidad física propietaria + contratos AUTH/DB aplicables | pruebas demuestran que columnas no autorizadas no son mutables por la frontera PULSO |
| No existe `expires_at` dedicado en la redención observada. | vigencia no puede inferirse por presencia de la fila | contrato PASS aplicable + unidad física propietaria | la fuente autoritativa de vigencia queda definida, consultada y probada fail-closed |
| El esquema observado no impone unicidad de `qr_code`. | identidad de ticket puede no estar estructuralmente garantizada | materialización PASS propietaria + `PULSO-AUTH-010::<implementation_unit_id>` | códigos ambiguos son imposibles o fallan cerrados con identidad durable inequívoca |
| La UI observada llama redención sin `orderId`. | no se demuestra vínculo con pedido cuando el beneficio lo requiere | `PULSO-AUTH-010::<implementation_unit_id>` | el proceso valida pedido/hecho comercial cuando la regla lo exige o demuestra explícitamente que no aplica |
| Supabase dev no contiene redenciones ni movimientos de loyalty de evidencia operativa. | no existe prueba E2E real de allow/deny, concurrencia o retry | `PULSO-AUTH-016` | pruebas controladas materializadas demuestran consumo único, territorio, actor, ledger y recuperación |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 44. Frontera con tareas posteriores

| Tarea | Responsabilidad reservada |
| --- | --- |
| `PULSO-AUTH-011` | hacer vinculante el límite territorial del turno y recurso |
| `PULSO-AUTH-012` | integrar terminal compartida sin transferir privilegios |
| `PULSO-AUTH-013` | registrar al trabajador efectivo como actor durable |
| `PULSO-AUTH-014` | mantener configuración y administración separadas de operación |
| `PULSO-AUTH-015` | materializar PermissionKeys, migrar consumidores y retirar broad authority |
| `PULSO-AUTH-016` | certificar allow/deny, uso único, concurrencia, recuperación e integración |

La autoridad de redimir no se reutiliza como autoridad de ninguna de esas acciones.

---

#### 45. Materialización física posterior

La futura unidad `PULSO-AUTH-010::<implementation_unit_id>` materializa únicamente el alcance declarado por su lineage y autorización física.

Puede requerir, según la unidad propietaria aprobada:

- guard server-side;
- comando/RPC propietario;
- ajustes de RLS y ACL;
- restricciones de columnas;
- contrato de idempotencia/replay;
- correlación con PASS y ledger;
- tipos/contratos compartidos;
- migración de consumidores;
- pruebas de seguridad, concurrencia y recuperación.

Cualquier modificación Supabase de VENTO deberá crearse, versionarse, documentarse y ejecutarse desde `vento-shell`.

Este marcador global no ejecuta esos cambios.

---

#### 46. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: servidor autorizado, PermissionKey exacta, territorio, ticket consumible, vigencia, recompensa, ledger, actor, dispositivo, uso único, atomicidad, idempotencia, concurrencia, resultado desconocido, recuperación y prohibición de bypass ya poseen cobertura verificable vigente. Esta tarea especializa esa cobertura sobre la materialización PULSO → PASS de redención sin crear una obligación material nueva.

---

#### 47. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente de:

- `TREQ-PASS-008` para mutaciones de puntos/redención solo mediante contratos servidor autorizados, atómicos e idempotentes;
- `TREQ-PASS-010` para ledger inmutable/reconciliable y reintentos sin duplicación;
- `TREQ-PASS-022` para sesión, acceso PULSO, sede efectiva y permisos exactos por acción;
- `TREQ-PASS-027` para código, cliente, recompensa, sede, estado, vigencia, efecto de puntos, actor, uso único y transición atómica/idempotente;
- `TREQ-PASS-028` para separación de modos del scanner y limpieza de estado incompatible;
- `TREQ-PASS-029` para actor humano en dispositivo compartido;
- `TREQ-PASS-030` para secreto efímero y seguro del PIN/firma;
- `TREQ-PASS-032` para éxito solo después de resultado confirmado y diferenciación de duplicado, conflicto, denegación y ya aplicado;
- `TREQ-PULSO-014`, `TREQ-PULSO-015`, `TREQ-PULSO-016` y `TREQ-PULSO-026` para acceso protegido, territorio, separación entre vista/mutación y suficiencia contractual del permiso;
- `TREQ-AUTH-001`, `TREQ-AUTH-004`, `TREQ-AUTH-008`, `TREQ-AUTH-009`, `TREQ-AUTH-011`, `TREQ-AUTH-013`, `TREQ-AUTH-014` y `TREQ-AUTH-015` para autorización canónica, contexto, territorio, actor compartido, no bypass, invalidación stale y evidencia;
- `TREQ-INTEGRATION-003`, `TREQ-INTEGRATION-111`, `TREQ-INTEGRATION-112`, `TREQ-INTEGRATION-113`, `TREQ-INTEGRATION-120`, `TREQ-INTEGRATION-121` y `TREQ-INTEGRATION-142` para identidad estable, replay, conflicto, concurrencia y reconciliación de resultado desconocido.

Esta enumeración es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 48. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout local después de incorporar el artefacto; no se ejecutó build de producto. |
| LOCAL | NOT_EXECUTED | El marcador no fue insertado en un checkout del usuario ni sometido allí a formateador, quality, delivery, topología y batería global. |
| REMOTA | PASS | Se verificaron `vento-shell` canónico, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, base aprobada `PULSO-AUTH-009`, `PASS-INT-002`, `vento-pulso/main`, Server Action/API del scanner y estado read-only de tablas, policies, constraints, índices, grants, catálogo de permisos y datos de fidelización en Supabase dev. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron canjes, redenciones, retries, timeouts, concurrencia, dispositivos compartidos, restores ni pruebas E2E reales; las redenciones y transacciones observadas estaban sin filas de evidencia operativa. |
| FÍSICA | NOT_APPLICABLE | Este marcador global no crea ni autoriza ninguna instancia `PULSO-AUTH-010::<implementation_unit_id>` ni ejecuta cambios POST_E5. |

---

#### 49. Criterios de aceptación

- [ ] La PermissionKey protegida es exactamente `pulso.loyalty.points.redeem`.
- [ ] `cajero_satelite` permanece actor ordinario autorizable únicamente con `T+C` y territorio compatible.
- [ ] `gerencia_operativa` no recibe redención por supervisión.
- [ ] `pulso.pos.main` no se acepta como autoridad final.
- [ ] Acumulación y redención mantienen permisos distintos.
- [ ] Crear intención PASS y consumirla desde PULSO permanecen como hechos distintos.
- [ ] La posesión del QR/código no concede autoridad.
- [ ] La redención se resuelve de forma inequívoca.
- [ ] Cliente, recompensa, regla, sede, estado y vigencia se revalidan antes del efecto.
- [ ] El guard final evalúa `pulso.loyalty.points.redeem` y territorio efectivo.
- [ ] La lectura previa del ticket no se convierte en autorización de mutación.
- [ ] `pending -> validated` se conserva como compare-and-set o garantía equivalente, sin tratarla como idempotencia completa.
- [ ] Existe identidad/replay suficiente para devolver el resultado durable del mismo consumo.
- [ ] Misma identidad con huella incompatible produce conflicto.
- [ ] Dos consumos concurrentes producen un único ganador empresarial.
- [ ] Un timeout se reconcilia antes de repetir.
- [ ] Un ticket validado/cancelado/vencido/no elegible no produce otro efecto.
- [ ] La recompensa se revalida y no se sustituye desde cliente.
- [ ] El consumo no debita dos veces puntos ya debitados/reservados.
- [ ] Ledger y redención permanecen reconciliables.
- [ ] Pedido/hecho comercial se valida cuando la regla lo exige.
- [ ] Un `orderId` cliente no amplía elegibilidad.
- [ ] Código ambiguo falla cerrado.
- [ ] Policies broad `staff_*` no forman parte del estado objetivo.
- [ ] Las policies cashier transitorias no se tratan como contrato final de PermissionKey/T+C.
- [ ] La capa DB no permite UPDATE directo con autoridad menor ni mutación de columnas no autorizadas.
- [ ] La firma compartida identifica al humano pero no concede permiso.
- [ ] El PIN permanece efímero y fuera de la evidencia empresarial.
- [ ] Refund, void o cancel no restauran puntos automáticamente.
- [ ] Las clases de resultado distinguen aplicado, ya aplicado, denegado, rechazo, conflicto y resultado desconocido.
- [ ] Todo hallazgo tiene propietario y condición de salida.
- [ ] La topología es `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde este marcador global.

---

#### 50. Límites

Esta tarea no:

- modifica `vento-pulso`;
- cambia `/scanner`;
- cambia `processRedemptionAction`;
- cambia `validateRedemption`;
- cambia `markRedemptionAsUsed`;
- crea una nueva pantalla de redención;
- crea tickets o recompensas;
- define nuevas reglas comerciales de canje;
- inventa vigencias o costos;
- cambia `pass.loyalty_redemptions`;
- cambia `pass.loyalty_rewards`;
- cambia `pass.loyalty_transactions`;
- crea o revoca grants;
- cambia RLS;
- aplica `AUTH-DB-002`;
- modifica Supabase remoto;
- modifica datos;
- restaura puntos;
- ejecuta refund o void;
- crea una cola offline;
- implementa territorio de turno;
- implementa dispositivo compartido;
- implementa actor humano;
- migra físicamente `pulso.pos.main`;
- crea migraciones;
- modifica el Registro 04A;
- crea o autoriza una instancia física;
- ejecuta E5.

---

#### 51. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-009 — Proteger acumulación de puntos`

**TAREA ACTUAL APROBADA**
`PULSO-AUTH-010 — Proteger redenciones`

**SIGUIENTE TAREA RESERVADA**
`PULSO-AUTH-011 — Limitar operación a sede del turno`
### [ ] PULSO-AUTH-011 — Limitar operación a sede del turno
### [ ] PULSO-AUTH-012 — Integrar dispositivos POS compartidos
### [ ] PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación
### [ ] PULSO-AUTH-014 — Mantener configuración administrativa separada
### [ ] PULSO-AUTH-015 — Migrar a paquetes de vento-shell
### [ ] PULSO-AUTH-016 — Ejecutar pruebas integrales
