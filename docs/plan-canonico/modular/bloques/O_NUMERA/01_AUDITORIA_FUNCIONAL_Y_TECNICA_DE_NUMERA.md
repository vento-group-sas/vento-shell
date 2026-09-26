### AUDITORÍA FUNCIONAL Y TÉCNICA DE NUMERA

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:NUMERA-AUD -->
### Reconciliación topológica de NUMERA-AUD-001 a NUMERA-AUD-012

El mini-bloque es auditoría funcional y técnica: inventaría, detecta, ejecuta verificaciones existentes y produce una matriz. No crea una unidad física de producto.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ NUMERA-AUD-001 — Inventariar rutas, pantallas, componentes y formularios actuales

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-021 — Diseñar la arquitectura funcional y técnica del POS integral objetivo sin heredar como contrato el prototipo histórico
**Tarea siguiente:** NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados
**Tipo de tarea:** inventario técnico-documental cerrado del estado AS-IS de rutas, superficies de pantalla, componentes React y formularios de NUMERA, con reconciliación contra la línea base aprobada de navegación y contra el catálogo canónico de pantallas sin inferir equivalencia uno a uno ni completar auditorías reservadas a tareas posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, rutas, componentes, formularios, permisos, navegación, server actions, tablas, vistas, RPC, RLS, migraciones, Supabase, datos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma completa y reproducible la superficie web actual de NUMERA antes de auditar acciones, datos, completitud funcional o lógica financiera.

La tarea debe dejar resuelto, para el snapshot observado:

- qué rutas de página existen físicamente;
- cuáles son vistas protegidas y cuáles son superficies públicas controladas;
- qué pantallas AS-IS renderiza cada ruta;
- qué componentes React forman la composición actual;
- qué componentes compartidos están montados y cuáles no tienen consumidor localizado;
- qué formularios de negocio existen;
- qué controles contiene cada formulario;
- qué formularios están condicionados por capacidad de administración;
- qué diferencias existen entre páginas físicas, navegación declarativa y pantallas canónicas objetivo;
- qué hallazgos pertenecen obligatoriamente a las tareas `NUMERA-AUD-002` a `NUMERA-AUD-012` sin resolverlos anticipadamente.

Este inventario describe existencia y composición. No certifica que una superficie sea completa, correcta, conciliada, segura o lista para producción.

---

#### 2. Handoff recibido de PULSO-UX-021

La tarea anterior entrega estas fronteras:

```text
PULSO CONSERVA HECHOS COMERCIALES
NUMERA CONSERVA HECHOS ECONOMICOS Y CONCILIACION
VENTA != PAGO != CAJA != DOCUMENTO FISCAL != HECHO ECONOMICO != ASIENTO
PULSO EMITE CONTRATOS / EVENTOS CORRELACIONADOS
NUMERA NO RECONSTRUYE LA VENTA COMO SEGUNDA FUENTE
ARQUITECTURA PULSO NO PRESUPONE RUTAS O COMPONENTES NUMERA
```

Consecuencia:

```text
INVENTARIO NUMERA
!=
EXTENSION DE LA ARQUITECTURA PULSO
```

NUMERA se audita desde su propio repositorio y sus contratos.

---

#### 3. Naturaleza y topología

La topología vigente para `NUMERA-AUD-001..012` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- el inventario se define una sola vez;
- no crea instancia física propia;
- no modifica código;
- no modifica Supabase;
- no cambia la navegación runtime;
- no materializa pantallas objetivo;
- no ejecuta acciones financieras;
- no altera `active-sequence.json` manualmente;
- los resultados quedan como contrato documental consumible por las tareas posteriores.

---

#### 4. Fuentes verificadas

La tarea se reconcilia contra:

- `PULSO-UX-021` aprobado por el usuario como base inmediata todavía pendiente de publicación al iniciar esta preparación;
- `AUTH-UI-006 — Inventariar todas las rutas de NUMERA`;
- `NUMERA-ROUTE-INVENTORY-001`;
- catálogo canónico `VSCREEN-*` de NUMERA;
- `04A_13_NUMERA.md`;
- `task-work-topology.json`;
- `continuity-route.json`;
- `execution-route.json`;
- `active-sequence.json`;
- `task-format-policy.json`;
- `task-development-policy.json`;
- archivo propietario de `NUMERA-AUD-*`;
- `package.json` de `vento-shell`;
- `package.json` actual de `vento-numera`;
- árbol Git completo de `vento-numera/main`;
- siete archivos `page.tsx` actuales;
- `src/app/layout.tsx`;
- `middleware.ts`;
- `scripts/sync-navigation.mjs`;
- siete módulos bajo `src/components/vento/standard`;
- `scripts/quality/numera-consumer-baseline-gate.mjs`;
- `scripts/quality/numera-consumer-baseline-gate.test.mjs`;
- comparación Git entre la línea base de `AUTH-UI-006` y el `main` actual de `vento-numera`.

---

#### 5. Snapshot remoto actual de vento-numera

Repositorio inspeccionado:

```text
repository = vento-group-sas/vento-numera
branch = main
commit = c4d50282e30e46d0abb3d871f9604cf913ebbabd
tree = 5cd9222ea4022514041e856983e10da0c8d12316
framework = Next.js App Router
```

El `package.json` actual declara:

```text
next = ^16.2.1
react = 19.2.3
react-dom = 19.2.3
```

La evidencia histórica de `AUTH-UI-006` conserva el nombre de repositorio que tenía en ese documento. Esta tarea no reescribe referencias históricas; registra además la identidad remota actual efectivamente inspeccionada.

---

#### 6. Reconciliación con el snapshot aprobado de AUTH-UI-006

La línea base aprobada por `AUTH-UI-006` utilizó:

```text
commit = 1b48a5da425d92e19ed89cf175b1dccc4cd960e1
```

La comparación contra el snapshot actual produce:

```text
status = ahead
commits = 4
```

Archivos cambiados desde aquella línea base:

| Archivo | Cambio |
| --- | --- |
| `.github/workflows/vento-required-gate.yml` | agregado |
| `package.json` | modificado |
| `scripts/quality/numera-consumer-baseline-gate.mjs` | agregado |
| `scripts/quality/numera-consumer-baseline-gate.test.mjs` | agregado |

No aparece ningún cambio en:

- `src/app/**`;
- `src/components/**`;
- `middleware.ts`;
- `scripts/sync-navigation.mjs`.

Conclusión:

```text
RUTAS AS-IS = SIN DRIFT DE FUENTE
PANTALLAS AS-IS = SIN DRIFT DE FUENTE
COMPONENTES SRC = SIN DRIFT DE FUENTE
FORMULARIOS SRC = SIN DRIFT DE FUENTE
```

Los IDs `NUMERA-ROUTE-001..007` se conservan; no se renombran ni reasignan.

---

#### 7. Contrato de inventario

1. Un archivo `page.tsx` materializa una ruta de página App Router.
2. Query parameters no crean rutas adicionales.
3. Un layout no se cuenta como ruta de página.
4. Un componente React no se cuenta como ruta.
5. Un formulario embebido no se cuenta como pantalla independiente por su sola existencia.
6. Una server action no se cuenta como formulario ni como route handler.
7. Un route handler se registra separado de página, componente y server action.
8. Un componente definido sin consumidor localizado se conserva como código disponible, no como superficie runtime demostrada.
9. Una ruta física no implica fila runtime ni elemento de menú.
10. Una ruta o componente no implica por sí solo identidad `VSCREEN-*`.
11. Una identidad `VSCREEN-*` canónica no implica que exista hoy una ruta física equivalente.
12. La existencia de un formulario no demuestra que el proceso empresarial completo esté implementado.
13. La existencia de un permiso observado no constituye auditoría completa de autorización.
14. La existencia de una fuente de datos observada no constituye auditoría completa de esquema o conciliación.

---

#### 8. Frontera de identidades

Se conserva obligatoriamente:

```text
RUTA
!= PANTALLA CANONICA
!= COMPONENTE
!= FORMULARIO
!= SERVER ACTION
!= ROUTE HANDLER
!= PERMISO
!= PROCESS_ID
!= TABLA
!= CAPACIDAD COMPLETA
```

Y también:

```text
ARCHIVO PRESENTE
!= COMPONENTE MONTADO
!= SUPERFICIE VISIBLE
!= FLUJO COMPLETO
```

---

#### 9. Cardinalidad general observada

| Métrica | Resultado |
| --- | ---: |
| archivos de página | **7** |
| rutas estáticas | **7** |
| rutas dinámicas | **0** |
| vistas protegidas | **5** |
| superficies públicas controladas | **2** |
| route handlers App Router | **0** |
| entradas de navegación declarativa | **4** |
| rutas no declaradas en `sync-navigation` | **3** |
| archivos de componentes compartidos bajo `src/components/vento/standard` | **7** |
| funciones React de componente detectadas en esos siete módulos | **26** |
| componentes de página | **7** |
| componente raíz de layout | **1** |
| funciones React de componente inventariadas en `src/app` + `src/components/vento/standard` | **34** |
| declaraciones `<form>` de negocio | **2** |
| controles de formulario declarados | **11** |
| controles ocultos | **3** |
| controles editables | **8** |
| `textarea` | **0** |
| formularios conectados a server action embebida | **2** |

La cardinalidad de formularios es de declaración fuente. El formulario de centros de costo se materializa repetidamente por centro cuando el actor puede administrar.

---

#### 10. Inventario canónico de rutas AS-IS

| ID | Ruta | Archivo fuente | Tipo | Superficie actual | Acceso observado | Navegación declarativa |
| --- | --- | --- | --- | --- | --- | --- |
| `NUMERA-ROUTE-001` | `/` | `src/app/page.tsx` | estática | panel económico inicial | `numera.access`; sin permiso de lectura específico | no |
| `NUMERA-ROUTE-002` | `/login` | `src/app/login/page.tsx` | estática | puente SSO hacia SHELL | pública controlada | no |
| `NUMERA-ROUTE-003` | `/no-access` | `src/app/no-access/page.tsx` | estática | estado de denegación | pública controlada | no |
| `NUMERA-ROUTE-004` | `/cost-centers` | `src/app/cost-centers/page.tsx` | estática | centros de costo y metas económicas | `numera.cost_centers.view`; administración separada | sí |
| `NUMERA-ROUTE-005` | `/expenses` | `src/app/expenses/page.tsx` | estática | lectura y captura de gastos | `numera.expenses.view`; administración separada | sí |
| `NUMERA-ROUTE-006` | `/break-even` | `src/app/break-even/page.tsx` | estática | punto de equilibrio por centro | `numera.break_even.view` | sí |
| `NUMERA-ROUTE-007` | `/profitability` | `src/app/profitability/page.tsx` | estática | rentabilidad inicial por centro | `numera.profitability.view` | sí |

Total esperado y materializado:

```text
ROUTES_EXPECTED = 7
ROUTES_MATERIALIZED = 7
MISSING = 0
UNEXPECTED = 0
DYNAMIC = 0
HANDLERS = 0
```

---

#### 11. NUMERA-ROUTE-001 — `/`

La raíz actual materializa `NumeraPanelPage`.

Superficie observada:

- encabezado `NUMERA`;
- título `Inteligencia economica operativa`;
- tres métricas de resumen;
- enlaces a cuatro módulos físicos;
- lectura de resumen económico del periodo actual;
- cero formularios;
- cero tablas HTML;
- cero controles de mutación visibles.

Las cuatro salidas de navegación embebidas son:

```text
/cost-centers
/expenses
/break-even
/profitability
```

La ausencia de un `permissionCode` específico continúa siendo evidencia AS-IS y no permiso definitivo sobre todos los indicadores mostrados.

---

#### 12. NUMERA-ROUTE-002 — `/login`

`/login` continúa siendo un puente cliente hacia el login central de SHELL.

Propiedades observadas:

- componente `LoginPage`;
- `use client`;
- normalización de `returnTo`;
- construcción de URL hacia SHELL;
- `window.location.replace`;
- enlace manual de fallback;
- retorno al panel NUMERA;
- cero formularios locales de credenciales.

Por tanto:

```text
/login
!=
AUTENTICACION PROPIA DE NUMERA
```

---

#### 13. NUMERA-ROUTE-003 — `/no-access`

La superficie de denegación conserva:

- ruta solicitada cuando existe;
- permiso requerido cuando existe;
- aviso específico para `role_override`;
- enlace al Hub;
- enlace al inicio de NUMERA;
- cero formularios;
- cero acciones de negocio.

La ruta no concede, repara ni simula autoridad.

---

#### 14. NUMERA-ROUTE-004 — `/cost-centers`

Superficie actual:

- periodo activo;
- resumen de qué se edita y qué calcula NUMERA;
- cuatro tarjetas de indicadores agregados;
- guía de uso en tres pasos;
- agrupación de centros por tipo;
- tarjetas por centro;
- presupuesto;
- ingreso esperado;
- gasto real;
- variación;
- equilibrio;
- margen objetivo;
- formulario de metas económicas cuando `canManage` es verdadero.

Esta ruta mezcla lectura analítica y edición acotada de metas económicas dentro de una misma página física.

---

#### 15. NUMERA-ROUTE-005 — `/expenses`

Superficie actual:

- encabezado de gastos;
- mensajes de éxito/error por query parameter;
- formulario de registro cuando `canManage` es verdadero;
- tabla de gastos;
- columnas fecha, detalle, clase, centro y monto;
- estado vacío cuando no existen registros visibles.

La ruta conserva separación observada entre permiso de lectura y capacidad de administración.

---

#### 16. NUMERA-ROUTE-006 — `/break-even`

Superficie actual:

- encabezado de punto de equilibrio;
- tabla de cinco columnas;
- centro;
- gasto fijo;
- gasto variable;
- margen objetivo;
- venta de equilibrio;
- estado vacío.

Distingue explícitamente:

```text
Sin margen
!=
Sin calculo
```

No contiene formulario ni mutación visible.

---

#### 17. NUMERA-ROUTE-007 — `/profitability`

Superficie actual:

- encabezado de rentabilidad;
- tabla de cinco columnas;
- centro;
- ingreso esperado;
- gasto real;
- presupuesto;
- variación;
- estado vacío.

No contiene formulario ni mutación visible.

La pantalla se presenta como `Lectura inicial`; no se interpreta como implementación completa del dominio de rentabilidad.

---

#### 18. Navegación declarativa actual

`scripts/sync-navigation.mjs` declara exactamente cuatro entradas:

| Ruta | `item_key` | Grupo | Permiso declarado |
| --- | --- | --- | --- |
| `/cost-centers` | `cost_centers` | `estructura` | `numera.cost_centers.view` |
| `/expenses` | `expenses` | `gastos` | `numera.expenses.view` |
| `/break-even` | `break_even` | `analisis` | `numera.break_even.view` |
| `/profitability` | `profitability` | `analisis` | `numera.profitability.view` |

Se conserva:

```text
7 PAGINAS FISICAS
!=
4 ENTRADAS DECLARATIVAS DE NAVEGACION
```

La raíz, login y no-access no pertenecen al arreglo declarativo.

---

#### 19. Middleware y frontera de acceso

El middleware actual excluye del matcher:

- `_next`;
- `login`;
- `no-access`;
- `favicon.ico`;
- `logos`;
- `images`;
- `fonts`;
- `api`.

Las cinco rutas restantes quedan dentro del flujo de sesión.

La auditoría exhaustiva de permisos y server enforcement no pertenece a esta tarea; aquí únicamente se conserva la clasificación física de superficies.

---

#### 20. Relación con las veinte pantallas canónicas NUMERA

El catálogo objetivo vigente contiene veinte identidades de pantalla NUMERA:

```text
VSCREEN-0094..VSCREEN-0106 = 13
VSCREEN-0153..VSCREEN-0159 = 7
TOTAL = 20
```

La existencia de cinco páginas protegidas de negocio no permite concluir que existan cinco de esas veinte pantallas, ni que falten exactamente quince.

Regla:

```text
CARDINALIDAD DE RUTAS AS-IS
NO ES COMPARABLE 1:1
CON CARDINALIDAD DE VSCREEN OBJETIVO
```

---

#### 21. Catálogo de pantallas objetivo que sirve como control

| ID | Pantalla canónica |
| --- | --- |
| `VSCREEN-0094` | Inicio financiero y ejecutivo |
| `VSCREEN-0095` | Bandeja de hechos económicos |
| `VSCREEN-0096` | Registro de gasto y soporte |
| `VSCREEN-0097` | Bandeja de aprobaciones financieras |
| `VSCREEN-0098` | Cuentas por pagar y obligaciones |
| `VSCREEN-0099` | Cuentas por cobrar y cartera |
| `VSCREEN-0100` | Caja, bancos y movimientos financieros |
| `VSCREEN-0101` | Conciliación de ventas y pagos |
| `VSCREEN-0102` | Conciliación de compras y recepciones |
| `VSCREEN-0103` | Conciliación de inventario, producción y variaciones |
| `VSCREEN-0104` | Costos, rentabilidad y escenarios |
| `VSCREEN-0105` | Cierre, reapertura y corrección de periodo |
| `VSCREEN-0106` | Reportes y exportaciones financieras |
| `VSCREEN-0153` | Paquete laboral para pagos y beneficios |
| `VSCREEN-0154` | Facturas y documentos fiscales |
| `VSCREEN-0155` | Tesorería y programación de pagos |
| `VSCREEN-0156` | Presupuestos, escenarios y forecast |
| `VSCREEN-0157` | Impuestos y obligaciones de cumplimiento |
| `VSCREEN-0158` | Distribución y asignación de costos |
| `VSCREEN-0159` | Indicadores, análisis y planes de mejora |

Esta tabla funciona como control de no sobredeclaración. `NUMERA-AUD-001` no asigna rutas actuales a IDs `VSCREEN-*` por semejanza textual.

---

#### 22. Estado de implementación inferible y no inferible

Sí puede afirmarse desde la superficie actual:

- existe un panel inicial;
- existen centros de costo/metas;
- existe captura y listado de gastos;
- existe lectura de equilibrio;
- existe lectura inicial de rentabilidad.

No puede afirmarse desde este inventario que estén implementados de extremo a extremo:

- bandeja canónica de hechos económicos;
- aprobaciones financieras;
- cuentas por pagar;
- cuentas por cobrar;
- bancos y tesorería;
- conciliación de ventas;
- conciliación de compras;
- conciliación de inventario/producción;
- cierre y reapertura de periodo;
- reportes/exportaciones financieras;
- paquete laboral;
- documentos fiscales;
- presupuestos/forecast completos;
- impuestos;
- distribución de costos;
- planes de mejora.

La clasificación de módulos completos, parciales, prototipos y ausentes pertenece a `NUMERA-AUD-004`.

---

#### 23. Universo físico de componentes

Bajo `src/components/vento/standard` existen exactamente siete módulos TSX:

```text
app-switcher.tsx
profile-menu.tsx
table.tsx
ui.tsx
vento-chrome.tsx
vento-logo.tsx
vento-shell.tsx
```

No existe en el árbol actual un directorio adicional de componentes de negocio NUMERA separado de las páginas.

La UI de negocio específica de NUMERA permanece mayoritariamente embebida en los archivos `page.tsx`.

---

#### 24. Componentes de página y layout

| Archivo | Componente exportado | Rol observado |
| --- | --- | --- |
| `src/app/layout.tsx` | `RootLayout` | composición raíz y montaje de `VentoShell` |
| `src/app/page.tsx` | `NumeraPanelPage` | panel inicial |
| `src/app/login/page.tsx` | `LoginPage` | puente SSO |
| `src/app/no-access/page.tsx` | `NoAccessPage` | estado de denegación |
| `src/app/cost-centers/page.tsx` | `Page` | centros de costo y metas |
| `src/app/expenses/page.tsx` | `Page` | gastos |
| `src/app/break-even/page.tsx` | `Page` | equilibrio |
| `src/app/profitability/page.tsx` | `Page` | rentabilidad |

Total:

```text
APP_LEVEL_COMPONENT_FUNCTIONS = 8
```

---

#### 25. Inventario de componentes compartidos

| Módulo | Componentes React detectados | Cantidad |
| --- | --- | ---: |
| `app-switcher.tsx` | `DotsIcon`, `AppLogosPreloader`, `StatusPill`, `AppTile`, `AppSwitcher` | 5 |
| `profile-menu.tsx` | `ProfileMenu` | 1 |
| `table.tsx` | `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell` | 6 |
| `ui.tsx` | `Button`, `Card`, `Input`, `Select`, `Badge` | 5 |
| `vento-chrome.tsx` | `Icon`, `SidebarToggleIcon`, `SidebarContextCard`, `SidebarLink`, `OperatingGateBlock`, `VentoChrome` | 6 |
| `vento-logo.tsx` | `VentoIcon`, `VentoLogo` | 2 |
| `vento-shell.tsx` | `VentoShell` | 1 |
| **TOTAL** |  | **26** |

Con los ocho componentes de nivel `src/app`, el universo inventariado es:

```text
REACT_COMPONENT_FUNCTIONS = 34
```

---

#### 26. Cadena de composición montada

La cadena de composición observada es:

```text
RootLayout
→ VentoShell
→ VentoChrome
→ AppSwitcher
→ ProfileMenu
→ VentoLogo
→ children de la ruta actual
```

`AppSwitcher` y `VentoChrome` utilizan además sus componentes internos declarados en los mismos archivos.

Esta cadena corresponde al chrome transversal de Vento OS; no convierte esos componentes en pantallas financieras NUMERA.

---

#### 27. Primitivas definidas sin consumidor de página localizado

En el árbol fuente actual no se localiza consumo desde las páginas de negocio ni desde la cadena montada para:

```text
src/components/vento/standard/table.tsx
src/components/vento/standard/ui.tsx
```

Los módulos continúan existiendo como definiciones compartidas:

- seis wrappers de tabla;
- cinco primitivas `Button/Card/Input/Select/Badge`.

Clasificación de inventario:

```text
DEFINIDAS
+
SIN CONSUMIDOR LOCALIZADO EN LA COMPOSICION NUMERA ACTUAL
```

No se ordena su retiro. La decisión de completitud, reutilización o deuda pertenece a tareas posteriores.

---

#### 28. Componentización de negocio actual

Las cuatro páginas funcionales principales usan JSX y clases directamente en el archivo de ruta.

No se localizaron módulos de componente de negocio separados para:

- centros de costo;
- gastos;
- equilibrio;
- rentabilidad.

Esto se registra como característica AS-IS:

```text
BUSINESS_UI_COMPONENTIZATION = PAGE_LOCAL
```

No se clasifica todavía como error, deuda o arquitectura objetivo.

---

#### 29. Universo de formularios

Se localizaron exactamente dos declaraciones `<form>` de negocio:

| Ruta | Acción enlazada | Visibilidad | Declaraciones fuente |
| --- | --- | --- | ---: |
| `/cost-centers` | `upsertBudget` | solo cuando `canManage` | 1 |
| `/expenses` | `createExpense` | solo cuando `canManage` | 1 |

Total:

```text
FORM_DECLARATIONS = 2
SERVER_ACTION_BOUND_FORMS = 2
TEXTAREAS = 0
```

No se localizaron formularios de credenciales en `/login` ni formularios en `/`, `/no-access`, `/break-even` o `/profitability`.

---

#### 30. Formulario actual de centros de costo

El formulario está declarado dentro del render por centro y puede producir múltiples instancias runtime.

Campos presentes:

| Campo | Tipo | Naturaleza |
| --- | --- | --- |
| `period_id` | hidden | contexto |
| `cost_center_id` | hidden | identidad de centro |
| `budget_amount` | number | editable |
| `expected_revenue` | number | editable |
| `target_gross_margin_pct` | number | editable |

Controles fuente:

```text
INPUTS = 5
HIDDEN = 2
EDITABLE = 3
SELECTS = 0
TEXTAREAS = 0
SUBMIT_BUTTONS = 1
```

El botón de envío se deshabilita cuando no existe periodo actual.

---

#### 31. Formulario actual de gastos

Campos presentes:

| Campo | Tipo | Naturaleza |
| --- | --- | --- |
| `period_id` | hidden | contexto |
| `description` | input | editable y requerido |
| `expense_date` | date | editable y requerido |
| `category_id` | select | editable y requerido |
| `amount` | number | editable y requerido |
| `cost_center_id` | select | editable y requerido |

Controles fuente:

```text
INPUTS = 4
SELECTS = 2
HIDDEN = 1
EDITABLE = 5
TEXTAREAS = 0
SUBMIT_BUTTONS = 1
```

El botón de envío se deshabilita cuando no existe periodo actual.

---

#### 32. Cardinalidad consolidada de controles

```text
COST_CENTER_FORM_CONTROLS = 5
EXPENSE_FORM_CONTROLS = 6
TOTAL_FORM_CONTROLS = 11
HIDDEN_CONTROLS = 3
EDITABLE_CONTROLS = 8
```

Esta cifra no incluye:

- selectores del chrome transversal;
- enlaces;
- botones de navegación;
- primitivas `Input`/`Select` definidas pero no consumidas;
- query parameters;
- filtros que no existan como control de formulario.

---

#### 33. Condición de exposición de formularios

Ambos formularios están condicionados por `canManage`.

La observación de UI es:

```text
PERMISO DE LECTURA
!=
FORMULARIO DE MUTACION VISIBLE
```

La seguridad efectiva de las acciones no se certifica aquí; `NUMERA-AUD-002` inventariará las server actions y `NUMERA-AUTH-*` conserva la autorización contractual correspondiente.

---

#### 34. Diferencia observable entre formulario y acción de centros de costo

La acción `upsertBudget` lee:

```text
formData.get("notes")
```

El formulario visible actual no declara un control con:

```text
name="notes"
```

Resultado de inventario:

```text
ACTION_EXPECTS_FIELD = notes
FORM_EXPOSES_FIELD = NO
```

Esta observación no bloquea `NUMERA-AUD-001`.

Propietarios de resolución:

- `NUMERA-AUD-002` para inventariar el contrato real de la acción;
- `NUMERA-AUD-004` para decidir si representa módulo parcial, intención deliberada o brecha.

Condición de salida: acción, formulario y clasificación funcional reconciliados sin inventar un campo de UI por inferencia.

---

#### 35. Valores no expuestos como controles en el formulario de gastos

La acción enlazada al formulario de gastos establece en servidor valores que no son controles editables del formulario, entre ellos:

```text
currency
source_app
```

Esta tarea registra únicamente que no forman parte de la entrada visible.

Su semántica, origen y corrección pertenecen a `NUMERA-AUD-002`, `NUMERA-AUD-003` y `NUMERA-AUD-005` según corresponda.

---

#### 36. Tablas de lectura actuales

Se observan tablas HTML de negocio en:

| Ruta | Tabla | Columnas visibles |
| --- | --- | --- |
| `/expenses` | gastos recientes | fecha, detalle, clase, centro, monto |
| `/break-even` | equilibrio por centro | centro, gasto fijo, gasto variable, margen objetivo, venta equilibrio |
| `/profitability` | rentabilidad por centro | centro, ingreso esperado, gasto real, presupuesto, variación |

`/cost-centers` utiliza composición de tarjetas por grupo y centro, no tabla HTML.

La existencia de `table.tsx` como módulo compartido no significa que estas tres tablas lo consuman.

---

#### 37. Estados de feedback de formulario

`/cost-centers` y `/expenses` consumen query parameters para feedback:

```text
ok
error
```

Estos parámetros:

- no crean rutas nuevas;
- no son evidencia autoritativa de que una mutación haya ocurrido por sí solos;
- no se cuentan como pantallas;
- no se convierten en estados financieros.

---

#### 38. Comportamiento global de inputs numéricos

`RootLayout` inyecta un script global que, ante rueda del ratón sobre un `input[type="number"]` enfocado:

- quita foco;
- evita el cambio accidental por wheel.

Esto afecta los controles numéricos actuales de centros de costo y gastos.

Se registra como comportamiento transversal de UI, no como formulario adicional.

---

#### 39. Route handlers y endpoints de interfaz

En el árbol actual no existen archivos App Router:

```text
route.ts
route.tsx
route.js
route.jsx
```

Resultado:

```text
APP_ROUTER_ROUTE_HANDLERS = 0
```

Las server actions embebidas en páginas no alteran este conteo.

---

#### 40. Línea base CI actual como evidencia adicional

El repositorio actual incorpora `numera-consumer-baseline-gate.mjs`.

Ese contrato declara explícitamente:

```text
EXPECTED_PAGE_COUNT = 7
EXPECTED_STATIC_PAGE_COUNT = 7
EXPECTED_DYNAMIC_PAGE_COUNT = 0
EXPECTED_PROTECTED_PAGE_COUNT = 5
EXPECTED_PUBLIC_CONTROLLED_COUNT = 2
EXPECTED_HANDLER_COUNT = 0
EXPECTED_TECHNICAL_PATTERN_COUNT = 7
EXPECTED_NAVIGATION_COUNT = 4
```

También declara una superficie de UI que cubre:

- SSR;
- client render;
- hidratación;
- interacción;
- formularios;
- tablas;
- accesibilidad;
- estados loading/error;
- denegación;
- semántica de estados financieros.

La existencia del contrato no equivale a ejecución de esa certificación durante esta tarea.

---

#### 41. Huellas actuales de páginas

| Ruta | SHA Git blob actual |
| --- | --- |
| `/` | `628787a78aaa13d8c81096c0451f6785c02eb659` |
| `/login` | `2c82363af8990bd77f6544e488f0b5ff64597558` |
| `/no-access` | `6a42b629c3f094ac5d377c62beafabcaafa64a3c` |
| `/cost-centers` | `a9a5744d7a9a4baee6e78779e8c9002c80a83807` |
| `/expenses` | `505a0d68831f2eaa91025754168ceedcc7f256dd` |
| `/break-even` | `6e892bc9952adb1fa66eff82eed6ca6419e54e65` |
| `/profitability` | `6c4df4b911eb52ed2b56c6474e260f34d3289b9f` |

Estas huellas identifican el snapshot remoto observado y no sustituyen hashes de contenido SHA-256.

---

#### 42. Huellas actuales de composición compartida

| Archivo | SHA Git blob actual |
| --- | --- |
| `src/app/layout.tsx` | `e0e015ebd8b1342fd495d67c7cb550fcefce73d2` |
| `app-switcher.tsx` | `ee23b7a3e2cceb8f61e6b86faf80f3ece19f3d87` |
| `profile-menu.tsx` | `bf0d1c7c34aedbd3b410807e1a9d20ec71c4f277` |
| `table.tsx` | `3cdf3dd9e1df9c364f4e8b549a660038d6b4a15e` |
| `ui.tsx` | `4e66b1768075114ac23c05c941b83e0ba78f6887` |
| `vento-chrome.tsx` | `f83fb0f8d9ee168b9b3eaa666aef19c063267590` |
| `vento-logo.tsx` | `83e22703ad5a28a5498a1232aaf6bafe3eaaf12c` |
| `vento-shell.tsx` | `1344d13b6487616fb6ee2ec06a81f61fc92b44c0` |

---

#### 43. Persistencia de carryovers de AUTH-UI-006

Como `src/app`, `middleware.ts` y `sync-navigation.mjs` no cambiaron frente al snapshot aprobado, permanecen materialmente vigentes los carryovers previos relacionados con:

- diferencia entre siete páginas y cuatro entradas de navegación;
- ausencia de permiso de lectura específico en `/`;
- ejecución declarada de sincronización desde `prebuild` cuando se usa el build ordinario;
- tratamiento del retorno SSO de la raíz;
- prohibición de inferir proceso, permiso definitivo o completitud desde una ruta.

`NUMERA-AUD-001` no reabre las decisiones propietarias de autorización o navegación que ya tienen owner canónico.

---

#### 44. Hallazgos nuevos o ampliados de esta tarea

| Hallazgo | Bloquea este inventario | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `upsertBudget` lee `notes` pero el formulario no expone ese campo | no | `NUMERA-AUD-002` + `NUMERA-AUD-004` | contrato de acción y completitud del módulo reconciliados |
| las primitivas de `table.tsx` y `ui.tsx` no tienen consumidor localizado en la composición actual | no | `NUMERA-AUD-004` | clasificar como reutilizable, parcial, prototipo o ausente de uso sin retirar por inferencia |
| UI de negocio permanece embebida principalmente en páginas | no | `NUMERA-AUD-004` y tareas `NUMERA-UX-*` posteriores | clasificación funcional y diseño posterior deciden componentización sin alterar este inventario |
| formularios actuales cubren únicamente metas económicas y gastos | no | `NUMERA-AUD-004` | matriz de completitud decide cobertura real frente a capacidades canónicas |

No se crea una tarea administrativa nueva.

---

#### 45. Trabajo reservado a NUMERA-AUD-002

La siguiente tarea deberá inventariar de forma exhaustiva:

- server actions;
- API si existe;
- RPC;
- consultas;
- jobs;
- protecciones y consumidores técnicos asociados.

Por tanto, `NUMERA-AUD-001` solo registra la existencia de `upsertBudget` y `createExpense` porque son destinos de los dos formularios visibles; no audita todavía su contrato completo.

---

#### 46. Trabajo reservado a NUMERA-AUD-003

Queda fuera de esta tarea inventariar exhaustivamente:

- tablas;
- vistas;
- eventos;
- sistemas fuente;
- relaciones de datos;
- autoridad de cada fuente.

Las referencias a datos observadas en las páginas solo sirven para describir la superficie visual actual.

---

#### 47. Trabajo reservado a NUMERA-AUD-004

`NUMERA-AUD-004` decidirá qué módulos están:

- completos;
- parciales;
- en prototipo;
- ausentes.

Esta tarea no utiliza esos estados para clasificar los componentes o pantallas actuales.

---

#### 48. Trabajo reservado a NUMERA-AUD-005 a NUMERA-AUD-010

No se absorben anticipadamente:

- simulados, hardcodes, TODO y lógica provisional;
- reportes sin conciliación;
- duplicidad manual entre dominios;
- cálculos de costo, margen, rentabilidad y equilibrio;
- gastos, centros de costo, cierres y aprobaciones;
- exportaciones, información sensible y trazabilidad.

Las observaciones de `currency`, `source_app`, cálculos y agregados solo se transfieren a sus owners.

---

#### 49. Trabajo reservado a NUMERA-AUD-011 y NUMERA-AUD-012

`NUMERA-AUD-011` conserva la ejecución de:

- build;
- lint;
- tipos;
- pruebas existentes.

`NUMERA-AUD-012` conserva la matriz final:

```text
CAPACIDAD FINANCIERA
×
IMPLEMENTACION ACTUAL
```

`NUMERA-AUD-001` no declara PASS de build ni completa la matriz de capacidad.

---

#### 50. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el inventario actualiza evidencia descriptiva contra una línea base ya protegida por requisitos vigentes de NUMERA y conserva sin alterar las reglas de identidad, conteo, acceso, navegación y drift existentes. No introduce un comportamiento objetivo nuevo.

---

#### 51. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-NUMERA-001` a `TREQ-NUMERA-004` para integridad económica, hechos y cálculos;
- `TREQ-NUMERA-005` para cardinalidad de páginas;
- `TREQ-NUMERA-006` para identidades `NUMERA-ROUTE-001..007`;
- `TREQ-NUMERA-007` para siete rutas estáticas y cero dinámicas;
- `TREQ-NUMERA-008` para conservar `/` en el inventario;
- `TREQ-NUMERA-009` para separar páginas, handlers, layouts, componentes, server actions y scripts;
- `TREQ-NUMERA-010` y `TREQ-NUMERA-011` para login y no-access;
- `TREQ-NUMERA-012` y `TREQ-NUMERA-013` para middleware y clasificación protegida/pública;
- `TREQ-NUMERA-014` a `TREQ-NUMERA-020` para las cinco superficies de negocio actuales;
- `TREQ-NUMERA-021` y `TREQ-NUMERA-022` para navegación declarativa;
- `TREQ-NUMERA-023` para impedir inferencias de proceso, actor, permiso o completitud;
- `TREQ-NUMERA-024` para control de drift respecto de la línea base aprobada.

Esta trazabilidad no actualiza el registro.

---

#### 52. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecutó build del checkout del usuario durante la preparación documental; esa ejecución permanece en el ciclo de incorporación y en `NUMERA-AUD-011`. |
| LOCAL | NOT_EXECUTED | No se ejecutaron lint, typecheck, tests ni runtime local del usuario. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, continuidad, topología, archivo propietario, 04A NUMERA, catálogo de pantallas, `vento-numera/main`, árbol Git completo, siete páginas, componentes, formularios, navegación, middleware, baseline gate y comparación contra el snapshot de `AUTH-UI-006`. |
| OPERATIVA | NOT_EXECUTED | No se registraron gastos, presupuestos, cierres, pagos, conciliaciones ni otros hechos económicos reales. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-AUD-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia. |

---

#### 53. Decisiones congeladas

1. el snapshot actual de `vento-numera` es `c4d50282e30e46d0abb3d871f9604cf913ebbabd`;
2. existen exactamente siete páginas físicas;
3. las siete rutas son estáticas;
4. existen cinco vistas protegidas y dos superficies públicas controladas;
5. existen cero route handlers App Router;
6. `NUMERA-ROUTE-001..007` permanecen vigentes;
7. existen cuatro entradas declarativas de navegación;
8. `src/app/**` no cambió frente al snapshot aprobado de `AUTH-UI-006`;
9. `src/components/**` no cambió frente a ese snapshot;
10. existen siete módulos compartidos bajo `src/components/vento/standard`;
11. se inventarían 26 funciones React de componente en esos módulos;
12. se inventarían 34 funciones React de componente al incluir páginas y layout;
13. existen dos declaraciones de formulario de negocio;
14. los dos formularios usan server actions embebidas;
15. existen once controles de formulario, tres ocultos y ocho editables;
16. `upsertBudget` espera `notes` pero el formulario actual no expone ese control;
17. `table.tsx` y `ui.tsx` existen sin consumidor localizado en la composición actual;
18. la UI financiera específica permanece principalmente embebida en páginas;
19. las veinte pantallas canónicas NUMERA no se mapean uno a uno contra las siete rutas AS-IS;
20. no se crea ni modifica requisito de prueba;
21. no se ejecuta trabajo físico;
22. la siguiente tarea es `NUMERA-AUD-002`.

---

#### 54. Criterios de aceptación

- [ ] el inventario conserva exactamente siete rutas físicas;
- [ ] conserva `NUMERA-ROUTE-001..007` sin renombrar;
- [ ] distingue cinco vistas protegidas y dos superficies públicas controladas;
- [ ] conserva siete rutas estáticas y cero dinámicas;
- [ ] registra cero route handlers;
- [ ] distingue siete páginas de cuatro entradas declarativas de navegación;
- [ ] identifica el snapshot remoto actual y su relación con la línea base anterior;
- [ ] demuestra que `src/app/**` y `src/components/**` no cambiaron frente a `AUTH-UI-006`;
- [ ] inventaría los siete módulos compartidos de componentes;
- [ ] inventaría las 26 funciones React detectadas en esos módulos;
- [ ] inventaría los ocho componentes de nivel aplicación/layout;
- [ ] conserva total de 34 funciones React inventariadas;
- [ ] inventaría exactamente dos formularios de negocio;
- [ ] inventaría once controles, tres ocultos y ocho editables;
- [ ] distingue declaraciones fuente de cardinalidad runtime del formulario repetido;
- [ ] registra la diferencia del campo `notes` sin corregirla por inferencia;
- [ ] separa rutas, pantallas canónicas, componentes, formularios, acciones y handlers;
- [ ] no declara implementadas por inferencia las veinte pantallas objetivo;
- [ ] no absorbe las auditorías reservadas a `NUMERA-AUD-002..012`;
- [ ] no modifica 04A;
- [ ] no crea cambios físicos;
- [ ] la continuidad reserva `NUMERA-AUD-002`.

---

#### 55. Límites

Esta tarea no:

- modifica `vento-numera`;
- crea o elimina rutas;
- crea o elimina componentes;
- crea o elimina formularios;
- cambia permisos;
- cambia middleware;
- cambia navegación;
- ejecuta `sync-navigation`;
- inventaría exhaustivamente server actions, API, RPC, consultas o jobs;
- inventaría exhaustivamente tablas, vistas, eventos o fuentes;
- clasifica módulos como completos o parciales;
- corrige hardcodes o TODO;
- audita cálculos financieros;
- audita cierres o aprobaciones;
- audita exportaciones sensibles;
- ejecuta build, lint, typecheck o pruebas de producto;
- ejecuta migraciones;
- modifica Supabase;
- modifica datos;
- crea `VSCREEN-*`;
- reasigna `process_id`;
- modifica el Registro 04A;
- crea instancia física propia;
- desarrolla `NUMERA-AUD-002`.

---

#### 56. Handoff inmediato a NUMERA-AUD-002

`NUMERA-AUD-002` recibe como universo de entrada:

```text
7 PAGINAS
5 VISTAS PROTEGIDAS
2 SUPERFICIES PUBLICAS CONTROLADAS
0 ROUTE HANDLERS
4 ENTRADAS DE NAVEGACION
2 FORMULARIOS
2 SERVER ACTIONS VISIBLES DESDE FORMULARIO
34 FUNCIONES REACT INVENTARIADAS
```

Y deberá resolver de forma exhaustiva:

```text
SERVER ACTIONS
API
RPC
CONSULTAS
JOBS
CONSUMIDORES TECNICOS
```

sin convertir automáticamente tablas, vistas o sistemas fuente en propiedad funcional; esa frontera continúa en `NUMERA-AUD-003`.

---

#### 57. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-021 — Diseñar la arquitectura funcional y técnica del POS integral objetivo sin heredar como contrato el prototipo histórico`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-001 — Inventariar rutas, pantallas, componentes y formularios actuales`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados`
### [ ] NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados
### [ ] NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente
### [ ] NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes
### [ ] NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional
### [ ] NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada
### [ ] NUMERA-AUD-007 — Detectar registros manuales duplicados frente a otros dominios
### [ ] NUMERA-AUD-008 — Auditar cálculos de costos, margen, rentabilidad y punto de equilibrio
### [ ] NUMERA-AUD-009 — Auditar gastos, centros de costo, cierres y aprobaciones
### [ ] NUMERA-AUD-010 — Auditar exportaciones, información sensible y trazabilidad
### [ ] NUMERA-AUD-011 — Ejecutar build, lint, tipos y pruebas existentes
### [ ] NUMERA-AUD-012 — Crear matriz capacidad financiera × implementación actual
