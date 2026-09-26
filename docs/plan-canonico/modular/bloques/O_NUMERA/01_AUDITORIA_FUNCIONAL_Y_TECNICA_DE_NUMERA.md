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
### ✅ NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-001 — Inventariar rutas, pantallas, componentes y formularios actuales
**Tarea siguiente:** NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente
**Tipo de tarea:** inventario técnico-documental cerrado de fronteras de ejecución y acceso AS-IS de NUMERA, incluyendo Server Actions, API HTTP, RPC, consultas Supabase/PostgREST, operaciones Auth y automatizaciones/jobs observados, sin clasificar todavía autoridad de tablas, vistas, eventos o sistemas fuente ni ejecutar cambios físicos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, Server Actions, API routes, RPC, consultas, jobs, navegación, permisos, Supabase, cron, datos, migraciones, funciones, RLS, Edge Functions ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma exhaustiva y reproducible las fronteras técnicas actualmente utilizadas por NUMERA para ejecutar lógica de servidor, consultar o mutar datos, resolver autenticación/autorización y ejecutar automatizaciones asociadas al repositorio.

La tarea debe dejar resuelto, para el snapshot observado:

- qué Server Actions existen y qué efectos realizan;
- qué API routes o route handlers existen;
- qué RPC literales consume NUMERA y desde dónde;
- qué consultas y mutaciones PostgREST/Supabase están presentes;
- qué operaciones de Supabase Auth se utilizan;
- qué mutaciones existen fuera de Server Actions;
- qué automatizaciones de build, prebuild y CI utiliza el repositorio;
- si existen jobs `pg_cron` que referencien NUMERA;
- qué fronteras quedan obligatoriamente reservadas a `NUMERA-AUD-003` y tareas posteriores.

Este inventario describe existencia, consumidores y efectos observables. No certifica suficiencia de autorización, RLS, trazabilidad, conciliación, completitud funcional ni corrección financiera.

---

#### 2. Handoff recibido de NUMERA-AUD-001

La tarea anterior entrega como universo de entrada:

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

Y congela además:

```text
ACTION_EXPECTS_FIELD = notes
FORM_EXPOSES_FIELD = NO
```

La 002 consume ese handoff sin rediseñar formularios ni reclasificar módulos.

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
- no invoca acciones de negocio;
- no ejecuta RPC mutantes;
- no ejecuta sincronización de navegación;
- no ejecuta cron;
- no modifica código ni Supabase;
- no cambia `active-sequence.json` manualmente;
- sus resultados quedan como evidencia documental para las auditorías posteriores.

---

#### 4. Fuentes verificadas

La tarea se reconcilia contra:

- `NUMERA-AUD-001` aprobado por el usuario como base inmediata todavía pendiente de publicación al iniciar esta preparación;
- `01_PROTOCOLO.md` vigente;
- `delivery-contract.json`;
- `manifest.json`;
- `continuity-route.json`;
- `execution-route.json`;
- `active-sequence.json`;
- `task-work-topology.json`;
- `task-format-policy.json`;
- `task-development-policy.json`;
- archivo propietario de `NUMERA-AUD-*`;
- `04A_13_NUMERA.md`;
- `package.json` de `vento-shell`;
- `package.json` actual de `vento-numera`;
- árbol Git completo de `vento-numera/main`;
- `middleware.ts`;
- siete archivos `page.tsx`;
- `src/components/vento/standard/**` relevantes para contexto y navegación;
- `src/lib/auth/**`;
- `src/lib/supabase/**`;
- `scripts/sync-navigation.mjs`;
- `scripts/quality/numera-consumer-baseline-gate.mjs` y su prueba;
- `.github/workflows/vento-required-gate.yml`;
- proyecto Supabase activo `vento-os-dev` mediante consultas remotas de solo lectura para existencia de RPC y `pg_cron`.

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

El snapshot coincide con el consumido por `NUMERA-AUD-001`; no se observó cambio remoto intermedio durante la preparación de esta tarea.

---

#### 6. Proyecto Supabase observado

La verificación remota de solo lectura utilizó:

```text
project = vento-os-dev
project_ref = clzdpinthhtknkmefsxx
status = ACTIVE_HEALTHY
postgres = 17.6.1.054
```

Esta identidad se utiliza únicamente para comprobar existencia de RPC y jobs programados. `NUMERA-AUD-002` no define aquí autoridad de sistema fuente ni ownership de datos.

---

#### 7. Contrato de inventario

1. Una Server Action se identifica por `source_path + action_name + directiva use server`.
2. Una Server Action inline no se convierte en API route.
3. Un archivo `route.ts|tsx|js|jsx` bajo App Router se registra como API/route handler, separado de páginas.
4. Una llamada `.rpc("nombre")` con nombre literal se registra como consumidor RPC.
5. Dos callsites del mismo RPC son dos consumidores observados, aunque compartan nombre remoto.
6. Una llamada `.from("recurso")` se registra como acceso PostgREST/Supabase y conserva operación observada.
7. Un `select` se separa de `insert`, `update`, `upsert` o `delete`.
8. Operaciones `auth.*` se inventarían separadas de consultas de datos.
9. Una mutación cliente directa no se convierte en Server Action por semejanza funcional.
10. Un script npm o job CI se separa de un job de producto programado.
11. Un hook `prebuild` es automatización de lifecycle, no cron.
12. Un job `pg_cron` solo se atribuye a NUMERA cuando su comando referencia materialmente NUMERA.
13. La existencia de un RPC remoto no certifica autorización, exposición o resultado correcto.
14. El nombre de un recurso consultado no decide si es tabla, vista o sistema fuente; eso pertenece a `NUMERA-AUD-003`.

---

#### 8. Frontera de identidades

Se conserva obligatoriamente:

```text
SERVER ACTION
!= API ROUTE
!= RPC
!= POSTGREST QUERY
!= AUTH OPERATION
!= EDGE FUNCTION
!= BUILD SCRIPT
!= CI JOB
!= PG_CRON JOB
!= TABLA
!= VISTA
!= SISTEMA FUENTE
```

Y además:

```text
RECURSO CONSULTADO
!= AUTORIDAD DEL DATO
```

---

#### 9. Cardinalidad general observada

| Métrica | Resultado |
| --- | ---: |
| Server Actions | **2** |
| archivos con Server Actions | **2** |
| API routes / route handlers App Router | **0** |
| métodos HTTP declarados por route handlers | **0** |
| invocaciones directas de Edge Functions desde runtime | **0** |
| accesos directos a Supabase Storage desde runtime | **0** |
| RPC literales únicos consumidos | **5** |
| callsites RPC | **8** |
| RPC únicos encontrados remotamente | **5/5** |
| callsites PostgREST/Supabase `.from(...)` | **30** |
| recursos literales únicos en `.from(...)` | **18** |
| callsites `select` | **25** |
| callsites PostgREST mutantes | **5** |
| callsites Supabase Auth | **5** |
| métodos Auth únicos | **2** |
| archivos runtime/script con acceso a datos o Auth | **13** |
| jobs `pg_cron` activos del proyecto | **7** |
| jobs `pg_cron` que referencian NUMERA | **0** |
| scripts npm declarados en `vento-numera` | **12** |
| jobs declarados en workflow Required Gate | **4** |
| triggers `schedule` en el workflow de `vento-numera` | **0** |

---

#### 10. Inventario de Server Actions

Se localizaron exactamente dos Server Actions actuales, ambas inline dentro de páginas:

| Archivo | Acción | Estilo | Consumidor visible |
| --- | --- | --- | --- |
| `src/app/cost-centers/page.tsx` | `upsertBudget` | `INLINE_FUNCTION_DIRECTIVE` | formulario de metas económicas |
| `src/app/expenses/page.tsx` | `createExpense` | `INLINE_FUNCTION_DIRECTIVE` | formulario de gastos |

No se localizaron módulos `actions.ts` adicionales ni directivas de módulo que expongan otras Server Actions.

---

#### 11. Server Action `upsertBudget`

Entrada observada:

```text
FormData
period_id
cost_center_id
budget_amount
expected_revenue
target_gross_margin_pct
notes
```

Validaciones y autoridad observadas:

- crea cliente Supabase de servidor;
- exige `numera.cost_centers.manage` mediante `requireAppAccess`;
- exige `period_id` y `cost_center_id`;
- valida montos no negativos;
- valida margen entre 0 y 100;
- ante entrada inválida redirige con error.

Efecto observado:

```text
UPSERT numera_cost_center_budgets
ON CONFLICT period_id,cost_center_id
```

Después de la mutación:

```text
revalidate /
revalidate /cost-centers
revalidate /break-even
revalidate /profitability
redirect /cost-centers?ok=budget
```

---

#### 12. Reconciliación `upsertBudget` con NUMERA-AUD-001

Se conserva el hallazgo de la tarea anterior:

```text
ACTION_EXPECTS_FIELD = notes
FORM_EXPOSES_FIELD = NO
```

La acción convierte ausencia de `notes` en `null`.

`NUMERA-AUD-002` registra el contrato real de la acción, pero no decide todavía si la ausencia del control visible es diseño deliberado o módulo parcial. Esa clasificación continúa en `NUMERA-AUD-004`.

---

#### 13. Server Action `createExpense`

Entrada observada:

```text
FormData
period_id
category_id
cost_center_id
expense_date
description
amount
```

Validaciones y autoridad observadas:

- crea cliente Supabase de servidor;
- exige `numera.expenses.manage` mediante `requireAppAccess`;
- exige periodo, categoría, centro, fecha y descripción;
- valida monto no negativo;
- ante entrada inválida redirige con error.

Efecto observado:

```text
INSERT numera_expenses
currency = COP
source_app = numera
```

Después de la mutación:

```text
revalidate /
revalidate /expenses
revalidate /cost-centers
redirect /expenses?ok=created
```

---

#### 14. Reconciliación `createExpense` con el formulario

El formulario visible aporta seis campos, mientras la acción establece en servidor dos valores adicionales:

```text
currency = COP
source_app = numera
```

Por tanto:

```text
FORM_INPUT
!= COMPLETE_PERSISTED_PAYLOAD
```

La validez semántica de moneda, origen y duplicidad pertenece a `NUMERA-AUD-005`, `NUMERA-AUD-007` y tareas de dominio posteriores; esta tarea solo congela el comportamiento observado.

---

#### 15. API HTTP App Router

El árbol actual contiene:

```text
route.ts = 0
route.tsx = 0
route.js = 0
route.jsx = 0
```

Resultado:

```text
NEXT_APP_ROUTER_API_ROUTES = 0
HTTP_METHOD_HANDLERS = 0
```

Las dos Server Actions no se contabilizan como API routes.

---

#### 16. Consumo HTTP y Edge Functions desde runtime

No se localizaron en el runtime actual de NUMERA:

- invocaciones directas `supabase.functions.invoke(...)`;
- acceso directo `supabase.storage.from(...)`;
- un cliente HTTP propio para consumir APIs de negocio desde las páginas inventariadas.

Los enlaces de navegación, SSO y Hub son navegación web y no se contabilizan como API de negocio.

---

#### 17. Inventario de RPC literales

Los cinco nombres RPC únicos consumidos son:

| RPC | Consumidor principal | Naturaleza observada |
| --- | --- | --- |
| `numera_current_period_summary` | `src/app/page.tsx` | lectura de resumen económico |
| `has_permission` | guard, sesión operativa y helper de permisos | autorización contextual |
| `has_operational_role_permission` | sesión operativa | autorización por rol operativo |
| `current_shared_operational_device_v1` | `vento-shell.tsx` | contexto de dispositivo compartido |
| `upsert_app_screen_registry` | `scripts/sync-navigation.mjs` | sincronización/mutación de registro de pantalla |

---

#### 18. Cardinalidad de callsites RPC

Los ocho callsites se distribuyen así:

```text
numera_current_period_summary = 1
has_permission = 4
has_operational_role_permission = 1
current_shared_operational_device_v1 = 1
upsert_app_screen_registry = 1
TOTAL = 8
```

Un mismo RPC puede aparecer en más de un helper porque los consumidores y contextos de autorización son distintos.

---

#### 19. Verificación remota de RPC

La consulta remota de solo lectura confirmó que los cinco nombres existen en `public`.

| RPC | Firma remota observada | `SECURITY DEFINER` |
| --- | --- | --- |
| `current_shared_operational_device_v1` | sin argumentos | sí |
| `has_operational_role_permission` | `p_role_code text, p_permission_code text, p_site_id uuid, p_area_id uuid, p_app_code text` | sí |
| `has_permission` | `p_permission_code text, p_site_id uuid, p_area_id uuid` | sí |
| `numera_current_period_summary` | sin argumentos | no |
| `upsert_app_screen_registry` | contrato parametrizado de registro/navegación de pantalla | sí |

Resultado:

```text
RPC_LITERAL_UNIQUE = 5
RPC_REMOTE_FOUND = 5
RPC_REMOTE_MISSING = 0
```

`SECURITY DEFINER` se registra como propiedad técnica observada, no como vulnerabilidad confirmada ni como aprobación de seguridad.

---

#### 20. RPC `numera_current_period_summary`

Consumidor:

```text
src/app/page.tsx
```

Uso:

- se ejecuta después de `requireAppAccess`;
- no recibe argumentos;
- el primer elemento resultante alimenta el panel inicial;
- expone, entre otros, periodo, centros de costo, presupuesto, ingreso esperado, gastos y punto de equilibrio.

La tarea no clasifica todavía de qué tablas o vistas proviene internamente ese resumen.

---

#### 21. RPC `has_permission`

Se localizan cuatro callsites:

- acceso general a aplicación en `guard.ts`;
- permisos específicos en `guard.ts`;
- fallback de sesión personal en `operational-session.ts`;
- helper `checkPermission` en `permissions.ts`.

Contexto observado:

```text
p_permission_code
p_site_id
p_area_id
```

La tarea registra el consumo; no certifica que todos los callers tengan política suficiente ni reabre las decisiones de `NUMERA-AUTH-*`.

---

#### 22. RPC `has_operational_role_permission`

Consumidor:

```text
src/lib/auth/operational-session.ts
```

Contexto observado:

```text
p_role_code
p_permission_code
p_site_id
p_area_id
p_app_code
```

Se utiliza para evaluar permisos en modo de dispositivo compartido/rol operativo.

---

#### 23. RPC `current_shared_operational_device_v1`

Consumidor:

```text
src/components/vento/standard/vento-shell.tsx
```

Uso observado:

- resolver dispositivo operacional compartido actual;
- obtener contexto suficiente para derivar apps permitidas, sede, área y rol de navegación;
- no materializa por sí solo una mutación de negocio.

---

#### 24. RPC `upsert_app_screen_registry`

Consumidor:

```text
scripts/sync-navigation.mjs
```

Uso observado:

- sincroniza identidad de aplicación y ruta;
- envía etiqueta, descripción, icono, agrupación, orden y permiso requerido;
- conserva `source_path`, `sync_source` y `sync_hash`;
- forma parte de un flujo que posteriormente actualiza clasificación de pantalla y navegación.

Esta RPC pertenece a automatización de navegación, no al render normal de una página NUMERA.

---

#### 25. Transporte de acceso a datos

El runtime y scripts utilizan tres familias observables:

```text
Supabase SSR/server client
Supabase browser client
Supabase service-role client en sync-navigation cuando existe configuración autorizada
```

Además, middleware utiliza `createServerClient` de `@supabase/ssr` para validar usuario y refrescar cookies.

La existencia de cada cliente no cambia la propiedad del dato consultado.

---

#### 26. Inventario consolidado PostgREST/Supabase

Se localizaron:

```text
POSTGREST_CALLSITES = 30
SELECT_CALLSITES = 25
MUTATION_CALLSITES = 5
UNIQUE_FROM_RESOURCES = 18
```

Las cinco mutaciones directas `.from(...)` son:

- `numera_cost_center_budgets` — `upsert`;
- `numera_expenses` — `insert`;
- `employee_settings` — `upsert` desde cliente;
- `app_screen_registry` — `update` desde sincronización;
- `app_navigation_items` — `upsert` desde sincronización.

---

#### 27. Recursos literales únicos accedidos mediante `.from(...)`

El snapshot actual referencia exactamente estos dieciocho nombres literales:

```text
app_navigation_items
app_screen_registry
areas
attendance_logs
cost_centers
employee_settings
employee_shifts
employee_sites
employees
numera_cost_center_budgets
numera_cost_center_monthly_summary
numera_expense_categories
numera_expenses
numera_periods
role_permissions
shared_operational_device_apps
shared_operational_devices
sites
```

Esta lista es identidad de consumo técnico. No afirma todavía si cada nombre corresponde a tabla, vista u otra proyección PostgREST.

---

#### 28. Consulta del panel inicial

`src/app/page.tsx` no usa `.from(...)` directamente.

Su consulta de negocio se concentra en:

```text
RPC numera_current_period_summary
```

Por tanto, el panel raíz es consumidor de una frontera RPC y no consumidor directo de los recursos subyacentes del resumen.

---

#### 29. Consultas y mutación de `/cost-centers`

Callsites observados:

| Recurso | Operación | Propósito observado |
| --- | --- | --- |
| `numera_cost_center_budgets` | `upsert` | persistir metas por periodo y centro |
| `numera_periods` | `select` | resolver periodo más reciente |
| `numera_cost_center_monthly_summary` | `select` | leer resumen económico por centro |

La mutación está encapsulada en `upsertBudget`; las dos lecturas ocurren durante render de servidor.

---

#### 30. Consultas y mutación de `/expenses`

Callsites observados:

| Recurso | Operación | Propósito observado |
| --- | --- | --- |
| `numera_expenses` | `insert` | registrar gasto |
| `numera_periods` | `select` | cargar periodos disponibles |
| `numera_expense_categories` | `select` | cargar categorías activas |
| `cost_centers` | `select` | cargar centros activos |
| `numera_expenses` | `select` | listar gastos recientes con relaciones visibles |

La página ejecuta las cuatro lecturas de render en paralelo mediante `Promise.all`.

---

#### 31. Consulta de `/break-even`

La página ejecuta una lectura directa:

```text
numera_cost_center_monthly_summary
```

Campos observados incluyen centro, gasto fijo, gasto variable, margen objetivo y `break_even_revenue`.

No existe mutación ni Server Action en esa ruta.

---

#### 32. Consulta de `/profitability`

La página ejecuta una lectura directa:

```text
numera_cost_center_monthly_summary
```

Campos observados incluyen centro, ingreso esperado, gasto real, presupuesto y variación.

No existe mutación ni Server Action en esa ruta.

---

#### 33. Mutación cliente de `employee_settings`

`profile-menu.tsx` utiliza cliente Supabase de navegador.

Cuando cambia la sede seleccionada:

- obtiene el usuario mediante `auth.getUser()`;
- ejecuta `upsert` sobre `employee_settings` con `employee_id` y `selected_site_id`;
- actualiza query string/cookie de contexto y refresca la navegación del cliente.

Resultado:

```text
CLIENT_SIDE_DATA_MUTATION = 1
```

Esta mutación no es Server Action y no debe desaparecer del inventario por contar únicamente las dos acciones de formulario.

---

#### 34. Operaciones Supabase Auth

Se observaron cinco callsites Auth:

```text
getUser = 4
signOut = 1
TOTAL = 5
```

`getUser` aparece en:

- `middleware.ts`;
- `profile-menu.tsx`;
- `vento-shell.tsx`;
- `guard.ts`.

`signOut` aparece en `profile-menu.tsx`.

---

#### 35. Consultas del chrome y navegación operativa

`vento-shell.tsx` consulta:

- `app_navigation_items` para navegación personal;
- `app_navigation_items` para navegación de dispositivo compartido;
- `attendance_logs` para último check-in/check-out relevante;
- `employee_shifts` para completar contexto de turno;
- `sites` para sede compartida;
- `employees` para perfil operativo;
- `employee_sites` para sedes asignadas;
- `employee_settings` para sede seleccionada;
- `sites` para catálogo de sedes asignadas;
- `areas` para validar pertenencia del área activa.

También consume `current_shared_operational_device_v1`.

Los dos callsites de `app_navigation_items` y los dos de `sites` se conservan separados porque corresponden a contextos diferentes.

---

#### 36. Consultas de sesión operacional

`operational-session.ts` consulta:

- `employee_sites` para resolver sede personal;
- `shared_operational_devices` para detectar dispositivo compartido activo;
- `shared_operational_device_apps` para apps permitidas;
- `employees` para contexto del trabajador.

Y consume:

```text
has_operational_role_permission
has_permission
```

El helper distingue sesión personal de dispositivo compartido sin convertir ese contexto en propiedad financiera de NUMERA.

---

#### 37. Consultas de role override

`role-override.ts` consulta:

- `role_permissions` con relación a permisos y apps;
- `sites` para `site_type` cuando el scope lo requiere;
- `areas` para `kind` cuando el scope lo requiere.

Si no existe override autorizado, `checkPermissionWithRoleOverride` delega a `checkPermission` y por tanto a `has_permission`.

---

#### 38. Consultas de autorización del guard

`guard.ts`:

- obtiene usuario autenticado;
- resuelve sesión operacional;
- valida `numera.access` con `has_permission` para sesión personal;
- valida permisos específicos con `has_permission` para sesión personal;
- delega a la ruta de autorización operacional cuando existe dispositivo compartido.

Los dos callsites `has_permission` del guard tienen propósitos distintos y se conservan separados.

---

#### 39. Mutaciones técnicas fuera de las dos Server Actions

Además de las dos mutaciones de negocio, existen tres superficies técnicas mutantes:

1. `profile-menu.tsx` — `employee_settings.upsert` desde navegador;
2. `sync-navigation.mjs` — `app_screen_registry.update`;
3. `sync-navigation.mjs` — `app_navigation_items.upsert`.

El mismo script de navegación también invoca la RPC mutante `upsert_app_screen_registry`.

Por tanto:

```text
SERVER_ACTION_MUTATIONS = 2
OTHER_POSTGREST_MUTATIONS = 3
SYNC_NAVIGATION_MUTATING_RPC = 1
```

---

#### 40. Frontera con NUMERA-AUD-003

Los dieciocho nombres `.from(...)` y los cinco RPC identifican dependencias técnicas, pero esta tarea no concluye:

- tipo físico de cada recurso;
- esquema propietario;
- si un nombre es tabla, vista o proyección;
- relaciones entre recursos;
- sistema fuente de cada dato;
- autoridad de escritura;
- eventos emitidos o consumidos;
- lineage entre dominios.

Todo ello queda reservado a `NUMERA-AUD-003`.

---

#### 41. Jobs y automatizaciones — taxonomía

Se distinguen tres clases:

```text
PRODUCT_BACKGROUND_JOB
REPOSITORY_LIFECYCLE_AUTOMATION
CI_GOVERNANCE_JOB
```

No se mezclan en una sola cardinalidad porque su activación, autoridad y efectos son diferentes.

---

#### 42. `pg_cron` remoto

La consulta remota de solo lectura encontró siete jobs activos en el proyecto Supabase observado. El inventario se conserva en forma sanitizada para no incorporar comandos ni material sensible al artefacto documental:

| `jobid` | Calendario | Clasificación de target | Referencia NUMERA |
| ---: | --- | --- | --- |
| `1` | `0 14 * * *` | alertas documentales | no |
| `2` | `59 4 * * *` | cierre diario de asistencia | no |
| `3` | `*/5 * * * *` | procesador runtime de turnos | no |
| `5` | `17 * * * *` | limpieza de cotizaciones de entrega PASS | no |
| `6` | `5 0 * * *` | cierre diario de asistencia | no |
| `9` | `10 5 * * *` | cierre de turnos de asistencia obsoletos | no |
| `10` | `*/5 * * * *` | reconciliación de checkouts de pago | no |

Ninguno de los siete jobs contiene una referencia material a NUMERA.

Resultado:

```text
PG_CRON_ACTIVE_PROJECT = 7
PG_CRON_REFERENCES_NUMERA = 0
NUMERA_PRODUCT_BACKGROUND_JOBS_CONFIRMED = 0
```

La ausencia de job NUMERA no significa que el dominio objetivo no vaya a requerir automatización futura; solo describe el estado actual.

---

#### 43. Scripts npm del repositorio

`vento-numera/package.json` declara doce scripts:

| Script | Clase observada |
| --- | --- |
| `dev` | desarrollo local |
| `build` | build ordinario con lifecycle `prebuild` |
| `start` | runtime de producción compilada |
| `lint` | calidad estática |
| `audit:i18n` | auditoría de internacionalización |
| `sync:navigation` | sincronización explícita de navegación |
| `prebuild` | lifecycle automático de sincronización |
| `build:ci012` | build gobernado con precheck CI012 |
| `typecheck` | comprobación TypeScript |
| `test` | fachada de pruebas del repositorio |
| `test:ci012` | suite contractual CI012 |
| `ci012:baseline` | generación/evaluación de baseline CI012 |

Estos scripts son automatizaciones de repositorio y no se cuentan como doce jobs de producto.

---

#### 44. Automatización `sync:navigation`

`sync:navigation` ejecuta:

```text
node scripts/sync-navigation.mjs
```

El script:

- carga configuración local disponible;
- calcula huella de cada ruta declarativa;
- si falta configuración de service role opera en modo preview;
- si existe configuración suficiente crea cliente privilegiado para sincronización;
- invoca `upsert_app_screen_registry`;
- actualiza clasificación en `app_screen_registry`;
- hace `upsert` de `app_navigation_items`.

Esta automatización tiene efectos remotos cuando dispone de credencial privilegiada; la tarea no la ejecuta.

---

#### 45. Hook `prebuild`

El lifecycle npm declara:

```text
prebuild = node scripts/sync-navigation.mjs
build = next build
```

Por semántica npm, el script `build` ejecutado mediante npm lifecycle dispara `prebuild` antes de `build`.

Resultado documental:

```text
ORDINARY_NPM_BUILD
-> SYNC_NAVIGATION_PREBUILD
-> NEXT_BUILD
```

Esto se conserva como efecto técnico observado; no se ejecuta durante esta tarea.

---

#### 46. Build gobernado `build:ci012`

El repositorio declara:

```text
build:ci012 = node scripts/quality/numera-consumer-baseline-gate.mjs --prebuild-check --json && next build
```

Al invocar `next build` directamente en el script `build:ci012`, esta ruta evita el lifecycle `prebuild` asociado al script `build`.

El baseline gate actual exige precisamente que:

```text
legacy_prebuild_declared = true
ci_build_bypasses_legacy_prebuild = true
service_role_absent = true
remote_mutation = false
```

La existencia del contrato no se presenta como ejecución de `build:ci012` durante esta tarea.

---

#### 47. Otros scripts de calidad

Se conservan como automatización de repositorio:

- `lint`;
- `audit:i18n`;
- `typecheck`;
- `test`;
- `test:ci012`;
- `ci012:baseline`.

`NUMERA-AUD-011` mantiene la autoridad para ejecutar build, lint, tipos y pruebas existentes como auditoría formal del mini-bloque.

---

#### 48. Workflow GitHub actual

`.github/workflows/vento-required-gate.yml` declara cuatro jobs:

```text
tests
treq
merge_gate
deploy_gate
```

Triggers observados:

```text
pull_request = SI
workflow_dispatch = SI
schedule = NO
```

Son jobs de gobernanza CI/CD; no son jobs financieros de NUMERA.

---

#### 49. Job CI `tests`

El job instala dependencias bloqueadas y ejecuta la fachada pública de pruebas del repositorio.

Su existencia sirve como evidencia de automatización disponible, pero `NUMERA-AUD-002` no declara sus pruebas como ejecutadas.

---

#### 50. Job CI `treq`

El job obtiene la autoridad TREQ desde `vento-shell` cuando corresponde y valida la declaración de requisitos afectados.

No crea ni modifica requisitos por sí mismo.

---

#### 51. Jobs CI `merge_gate` y `deploy_gate`

Ambos consumen la gobernanza central de `vento-shell` para materializar decisión y evidencia de Required Gate.

Se registran como infraestructura de entrega, no como capacidad económica de NUMERA.

---

#### 52. Flujo técnico consolidado de lectura

El flujo actual puede resumirse como:

```text
PAGE / CHROME / AUTH HELPER
-> requireAppAccess / contexto operacional
-> RPC de autorizacion y contexto
-> PostgREST o RPC de lectura
-> render
```

La raíz financiera difiere porque su lectura de negocio pasa por `numera_current_period_summary` en vez de `.from(...)` directo.

---

#### 53. Flujo técnico consolidado de mutación de negocio

Las dos mutaciones de negocio visibles siguen:

```text
FORM
-> SERVER ACTION INLINE
-> requireAppAccess con permiso manage
-> validacion de payload
-> PostgREST mutation
-> revalidatePath
-> redirect
```

No existe API route intermedia en el snapshot actual.

---

#### 54. Flujo técnico consolidado de sincronización de navegación

La automatización técnica sigue:

```text
sync-navigation.mjs
-> service-role client cuando existe configuracion
-> upsert_app_screen_registry RPC
-> app_screen_registry update
-> app_navigation_items upsert
```

Este flujo es independiente de las dos Server Actions de negocio.

---

#### 55. Hallazgos nuevos o ampliados

| Hallazgo | Bloquea este inventario | Propietario | Condición de salida |
| --- | --- | --- | --- |
| existe una mutación cliente directa de `employee_settings` fuera de Server Actions | no | `NUMERA-AUD-003` + `NUMERA-AUTH-*` aplicable | clasificar recurso/autoridad y demostrar protección real sin confundir UI con autorización |
| el script `build` puede ejecutar sincronización remota de navegación mediante `prebuild` si existe configuración privilegiada | no | gobernanza CI existente + auditorías posteriores aplicables | conservar build gobernado no mutante para CI y decidir lifecycle objetivo sin ejecutar aquí |
| cuatro de los cinco RPC consumidos observados son `SECURITY DEFINER` | no | `NUMERA-AUTH-*` / auditoría server posterior | revisar grants, checks internos, contexto y RLS sin asumir vulnerabilidad por la propiedad aislada |
| no existe job `pg_cron` que referencie NUMERA | no | `NUMERA-AUD-004` y diseño posterior | clasificar si automatización financiera requerida está ausente o no aplica |
| `upsertBudget` sigue leyendo `notes` sin control visible en formulario | no | `NUMERA-AUD-004` | reconciliar contrato de acción y completitud funcional |

No se crea una tarea administrativa nueva.

---

#### 56. Trabajo reservado a NUMERA-AUD-003

La siguiente tarea deberá tomar exactamente este universo técnico y determinar, por cada recurso o dependencia aplicable:

- tabla, vista u otro tipo;
- esquema;
- sistema fuente;
- autoridad de lectura/escritura;
- eventos relacionados;
- relaciones de datos;
- consumidores y productores relevantes;
- duplicidades o fuentes paralelas.

`NUMERA-AUD-002` no adelanta esas decisiones.

---

#### 57. Trabajo reservado a NUMERA-AUD-004

`NUMERA-AUD-004` decidirá si las capacidades observadas están:

- completas;
- parciales;
- en prototipo;
- ausentes.

La ausencia actual de API routes o cron NUMERA no se transforma aquí automáticamente en módulo ausente.

---

#### 58. Trabajo reservado a NUMERA-AUD-005 a NUMERA-AUD-010

No se absorben anticipadamente:

- hardcodes y lógica provisional;
- reportes sin conciliación;
- registros manuales duplicados;
- validez de cálculos de costo, margen, rentabilidad y equilibrio;
- semántica completa de gastos, centros, cierres y aprobaciones;
- exportaciones, información sensible y trazabilidad.

Los valores `COP`, `source_app=numera`, agregados y query shapes se transfieren como evidencia, no como aprobación.

---

#### 59. Trabajo reservado a NUMERA-AUD-011 y NUMERA-AUD-012

`NUMERA-AUD-011` conserva la ejecución formal de:

- build;
- lint;
- typecheck;
- tests existentes.

`NUMERA-AUD-012` conserva la matriz final:

```text
CAPACIDAD FINANCIERA
x
IMPLEMENTACION ACTUAL
```

Esta tarea no declara completitud ni readiness productivo.

---

#### 60. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea inventaría superficies técnicas existentes y reconcilia identidades/consumidores ya cubiertos por requisitos vigentes. No introduce una regla funcional nueva, algoritmo financiero nuevo, autorización nueva, integración nueva ni transición de datos nueva.

---

#### 61. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-NUMERA-001` a `TREQ-NUMERA-004` para integridad económica, hechos y cálculos;
- `TREQ-NUMERA-005` a `TREQ-NUMERA-009` para inventario, identidad y separación de superficies técnicas;
- `TREQ-NUMERA-012` a `TREQ-NUMERA-014` para middleware, superficie protegida y acceso general;
- `TREQ-NUMERA-015` y `TREQ-NUMERA-016` para lectura y mutación de centros de costo;
- `TREQ-NUMERA-017` y `TREQ-NUMERA-018` para lectura y creación de gastos;
- `TREQ-NUMERA-019` y `TREQ-NUMERA-020` para equilibrio y rentabilidad;
- `TREQ-NUMERA-021` y `TREQ-NUMERA-022` para sincronización de navegación;
- `TREQ-NUMERA-023` para impedir inferencias de autoridad desde existencia técnica;
- `TREQ-NUMERA-024` para control de drift de la línea base.

Esta trazabilidad no actualiza el registro.

---

#### 62. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecutó build del checkout del usuario durante la preparación documental; la ejecución formal permanece en el ciclo de incorporación y en `NUMERA-AUD-011`. |
| LOCAL | NOT_EXECUTED | No se invocaron Server Actions, scripts npm, CI jobs ni runtime local del usuario. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, continuidad/topología, archivo propietario, 04A NUMERA, `vento-numera/main`, árbol completo, código runtime, Server Actions, RPC, queries, package scripts, workflow y proyecto Supabase activo mediante consultas de solo lectura para RPC y `pg_cron`. |
| OPERATIVA | NOT_EXECUTED | No se registraron gastos, presupuestos, cambios de sede, sincronizaciones de navegación ni hechos económicos reales. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-AUD-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea implementación física propia. |

---

#### 63. Decisiones congeladas

1. el snapshot actual de `vento-numera` permanece en `c4d50282e30e46d0abb3d871f9604cf913ebbabd`;
2. existen exactamente dos Server Actions actuales: `upsertBudget` y `createExpense`;
3. ambas son acciones inline dentro de páginas;
4. existen cero API routes App Router;
5. existen cero métodos HTTP de route handler;
6. existen cinco RPC literales únicos y ocho callsites;
7. los cinco RPC fueron encontrados remotamente;
8. cuatro de los cinco RPC observados son `SECURITY DEFINER` y uno no;
9. existen treinta callsites `.from(...)`;
10. esos callsites referencian dieciocho nombres literales únicos;
11. existen veinticinco lecturas `select` y cinco mutaciones PostgREST;
12. existe una mutación cliente directa de `employee_settings` fuera de Server Actions;
13. `sync-navigation` realiza dos mutaciones PostgREST y una RPC mutante cuando dispone de configuración privilegiada;
14. existen cinco callsites Supabase Auth: cuatro `getUser` y un `signOut`;
15. no se observaron invocaciones directas de Edge Functions desde runtime NUMERA;
16. no se observaron accesos directos a Supabase Storage desde runtime NUMERA;
17. el proyecto Supabase observado tiene siete jobs `pg_cron` activos;
18. ninguno de esos jobs referencia NUMERA;
19. `package.json` declara doce scripts;
20. `prebuild` ejecuta `sync-navigation.mjs`;
21. `build:ci012` ejecuta el baseline check y luego `next build` directamente, evitando el lifecycle `prebuild` del script `build`;
22. el workflow Required Gate declara cuatro jobs y cero trigger `schedule`;
23. los nombres de recursos consumidos no se clasifican como tabla/vista/sistema fuente en esta tarea;
24. no se crea ni modifica requisito de prueba;
25. no se ejecuta trabajo físico;
26. la siguiente tarea es `NUMERA-AUD-003`.

---

#### 64. Criterios de aceptación

- [ ] identifica exactamente dos Server Actions;
- [ ] documenta entrada, autoridad observada, efecto, revalidación y redirect de ambas;
- [ ] conserva el hallazgo `notes` sin corregirlo por inferencia;
- [ ] confirma cero API routes App Router;
- [ ] confirma cero métodos HTTP de route handler;
- [ ] inventaría cinco RPC literales únicos y ocho callsites;
- [ ] confirma remotamente los cinco RPC;
- [ ] registra `SECURITY DEFINER` como propiedad observada sin emitir veredicto de seguridad;
- [ ] inventaría treinta callsites `.from(...)`;
- [ ] conserva dieciocho nombres literales únicos de recursos;
- [ ] distingue veinticinco lecturas y cinco mutaciones PostgREST;
- [ ] registra la mutación cliente de `employee_settings`;
- [ ] registra las mutaciones de sincronización de navegación;
- [ ] inventaría cinco callsites Auth;
- [ ] confirma cero invocaciones directas de Edge Functions desde runtime;
- [ ] confirma cero accesos directos a Storage desde runtime;
- [ ] distingue job de producto, automatización de lifecycle y job CI;
- [ ] registra siete jobs `pg_cron` activos del proyecto sin exponer credenciales ni payloads sensibles;
- [ ] confirma cero referencias NUMERA en esos jobs;
- [ ] inventaría los doce scripts npm;
- [ ] explica la diferencia entre `build` y `build:ci012` sin ejecutarlos;
- [ ] inventaría los cuatro jobs del Required Gate y confirma ausencia de `schedule`;
- [ ] no clasifica recursos como tablas/vistas/fuentes antes de `NUMERA-AUD-003`;
- [ ] no modifica 04A;
- [ ] no crea cambios físicos;
- [ ] la continuidad reserva `NUMERA-AUD-003`.

---

#### 65. Límites

Esta tarea no:

- modifica `vento-numera`;
- ejecuta Server Actions;
- ejecuta `sync-navigation`;
- ejecuta el script `build`;
- ejecuta `build:ci012`;
- ejecuta jobs GitHub;
- ejecuta cron;
- crea API routes;
- crea RPC;
- cambia funciones PostgreSQL;
- cambia `SECURITY DEFINER`;
- cambia grants;
- cambia RLS;
- cambia Auth;
- cambia tablas o vistas;
- decide sistemas fuente;
- decide autoridad de datos;
- crea Edge Functions;
- modifica Storage;
- modifica datos;
- clasifica módulos completos/parciales;
- corrige hardcodes;
- audita cálculos financieros;
- audita cierres o aprobaciones;
- ejecuta build, lint, typecheck o tests de producto;
- modifica el Registro 04A;
- crea instancia física propia;
- desarrolla `NUMERA-AUD-003`.

---

#### 66. Handoff inmediato a NUMERA-AUD-003

`NUMERA-AUD-003` recibe como universo técnico mínimo:

```text
18 NOMBRES LITERALES EN .from(...)
5 RPC LITERALES UNICOS
2 SERVER ACTIONS
5 MUTACIONES POSTGREST
25 LECTURAS POSTGREST
1 MUTACION CLIENTE DE PREFERENCIA
1 FLUJO DE SINCRONIZACION DE NAVEGACION
0 API ROUTES
0 CRON NUMERA CONFIRMADO
```

Y deberá resolver, sin perder identidades ni consumidores:

```text
TABLAS
VISTAS
EVENTOS
SISTEMAS FUENTE
AUTORIDAD
RELACIONES
LINEAGE
```

---

#### 67. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-001 — Inventariar rutas, pantallas, componentes y formularios actuales`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente`
### ✅ NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados
**Tarea siguiente:** NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes
**Tipo de tarea:** inventario técnico-documental cerrado del estado AS-IS de persistencia, vistas derivadas, relaciones transitivas consumidas por RPC, eventos técnicos y sistemas fuente observados de NUMERA, diferenciando origen, autoridad actual y contratos objetivo sin clasificar todavía completitud funcional; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, tablas, vistas, RPC, triggers, Realtime, RLS, grants, migraciones, datos, eventos, integraciones, jobs ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma reproducible las relaciones físicas y derivadas que NUMERA consume hoy, los recursos transitivos alcanzados por sus RPC, los eventos técnicos asociados y los sistemas que actúan como fuente actual o fuente canónica declarada.

El resultado debe separar:

- persistencia propia de NUMERA;
- datos maestros compartidos;
- contexto operativo y de autorización;
- vistas y agregados derivados;
- eventos de base de datos;
- publicación o consumo Realtime;
- sistemas fuente actualmente conectados;
- sistemas fuente declarados por contratos canónicos pero todavía no consumidos físicamente;
- relaciones económicas existentes fuera del consumo actual de `vento-numera`.

Este inventario describe identidad, dependencia y procedencia. No decide todavía si un módulo está completo, parcial, en prototipo o ausente.

---

#### 2. Handoff recibido de NUMERA-AUD-002

La tarea anterior entrega como universo técnico mínimo:

```text
18 NOMBRES LITERALES EN .from(...)
5 RPC LITERALES UNICOS
2 SERVER ACTIONS
5 MUTACIONES POSTGREST
25 LECTURAS POSTGREST
1 MUTACION CLIENTE DE PREFERENCIA
1 FLUJO DE SINCRONIZACION DE NAVEGACION
0 API ROUTES
0 CRON NUMERA CONFIRMADO
```

Y reserva para esta tarea:

```text
TABLAS
VISTAS
EVENTOS
SISTEMAS FUENTE
AUTORIDAD
RELACIONES
LINEAGE
```

Por tanto, `NUMERA-AUD-003` no vuelve a contar superficies web, formularios, Server Actions o callsites salvo cuando son necesarios para demostrar procedencia y autoridad de datos.

---

#### 3. Naturaleza y topología

La topología vigente para `NUMERA-AUD-001..012` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el inventario se define una sola vez;
- no crea instancia física propia;
- no modifica código ni datos;
- no ejecuta RPC de negocio;
- no dispara triggers deliberadamente;
- no publica relaciones en Realtime;
- no cambia contratos de fuente;
- no define todavía el modelo financiero objetivo.

---

#### 4. Fuentes verificadas

La tarea se reconcilia contra:

- `NUMERA-AUD-001` aprobado y publicado;
- `NUMERA-AUD-002` aprobado por el usuario como base inmediata todavía pendiente de publicación al preparar esta sucesora;
- archivo propietario de `NUMERA-AUD-*`;
- `04A_13_NUMERA.md`;
- `01_PROTOCOLO.md`;
- `manifest.json`;
- `continuity-route.json`;
- `execution-route.json`;
- `active-sequence.json`;
- `task-work-topology.json`;
- `task-format-policy.json`;
- `task-development-policy.json`;
- `package.json` de `vento-shell`;
- snapshot actual de `vento-numera/main`;
- consultas y RPC inventariados en `NUMERA-AUD-002`;
- metadatos remotos de PostgreSQL/Supabase del proyecto VENTO observado;
- definición remota de la vista `numera_cost_center_monthly_summary`;
- definición remota de `numera_current_period_summary` y RPC de autorización, contexto y navegación consumidos;
- foreign keys de las relaciones directas;
- triggers habilitados sobre las relaciones directas;
- publicación `supabase_realtime`;
- contratos canónicos de integración y dominio que declaran fuentes operativas para NUMERA;
- auditorías técnicas previas utilizadas únicamente como evidencia histórica contrastada nuevamente contra remoto.

---

#### 5. Snapshot actual de `vento-numera`

El inventario de aplicación se fija en:

```text
repository = vento-group-sas/vento-numera
commit = c4d50282e30e46d0abb3d871f9604cf913ebbabd
```

No se observó cambio del código de producto respecto del snapshot consumido por `NUMERA-AUD-001` y `NUMERA-AUD-002`.

---

#### 6. Proyecto Supabase observado

La evidencia remota corresponde al proyecto VENTO actualmente accesible y saludable usado por las auditorías canónicas.

Las consultas ejecutadas para esta tarea fueron de solo lectura de metadatos y agregados.

No se ejecutó DDL, DML, RPC de negocio, Edge Function, job, trigger manual ni modificación de configuración.

---

#### 7. Contrato del inventario

Se distinguen cuatro niveles:

```text
DIRECT_RELATION
TRANSITIVE_RPC_RELATION
DERIVED_RELATION
DECLARED_SOURCE_SYSTEM
```

Definiciones:

- `DIRECT_RELATION`: nombre literal usado por `.from(...)` en `vento-numera`;
- `TRANSITIVE_RPC_RELATION`: relación leída o escrita dentro de una RPC consumida por NUMERA o por helpers inmediatos de autorización/contexto;
- `DERIVED_RELATION`: vista o función que agrega datos y no constituye el hecho fuente original;
- `DECLARED_SOURCE_SYSTEM`: aplicación o dominio reconocido canónicamente como emisor de hechos que NUMERA debe consumir, aunque el consumidor físico todavía no exista.

---

#### 8. Frontera de certeza

La tarea diferencia expresamente:

```text
EXISTE RELACION
!=
ES FUENTE DE VERDAD
```

```text
ES LEIDA POR NUMERA
!=
NUMERA ES SU PROPIETARIO FUNCIONAL
```

```text
EXISTE TRIGGER
!=
EXISTE EVENTO EMPRESARIAL CONSUMIDO POR NUMERA
```

```text
SISTEMA FUENTE DECLARADO
!=
INTEGRACION FISICA ACTUAL
```

Las decisiones de propiedad funcional futura que pertenecen a `NUMERA-DOM-*` no se anticipan.

---

#### 9. Universo directo heredado

`NUMERA-AUD-002` identifica exactamente dieciocho relaciones literales consumidas mediante `.from(...)`:

```text
app_navigation_items
app_screen_registry
areas
attendance_logs
cost_centers
employee_settings
employee_shifts
employee_sites
employees
numera_cost_center_budgets
numera_cost_center_monthly_summary
numera_expense_categories
numera_expenses
numera_periods
role_permissions
shared_operational_device_apps
shared_operational_devices
sites
```

Cardinalidad congelada:

```text
DIRECT_FROM_RELATIONS = 18
```

---

#### 10. Tipo físico de las dieciocho relaciones directas

El contraste remoto determina:

```text
DIRECT_TABLES = 17
DIRECT_VIEWS = 1
DIRECT_MATERIALIZED_VIEWS = 0
DIRECT_FOREIGN_TABLES = 0
DIRECT_SCHEMA_PUBLIC = 18
```

La única vista directa es:

```text
public.numera_cost_center_monthly_summary
```

Las otras diecisiete identidades son tablas físicas de `public`.

---

#### 11. Relaciones transitivas descubiertas dentro de RPC

Al expandir las cinco RPC consumidas y sus helpers inmediatos se observan seis tablas compartidas adicionales que no aparecían como `.from(...)` literal del repositorio:

```text
apps
app_permissions
employee_permissions
site_operational_roles
operational_role_permissions
employee_areas
```

Todas existen como tablas `public` con RLS habilitada.

Estas relaciones pertenecen a navegación, permisos, asignación territorial y contexto operativo; no son hechos económicos NUMERA.

---

#### 12. Cardinalidad física expandida

El universo físico único alcanzado por consumo directo más dependencia RPC queda:

```text
DIRECT_RELATIONS = 18
TRANSITIVE_RPC_ADDITIONAL_RELATIONS = 6
EXPANDED_UNIQUE_RELATIONS = 24
EXPANDED_TABLES = 23
EXPANDED_VIEWS = 1
```

No se cuentan funciones como relaciones físicas.

---

#### 13. Matriz de relaciones directas

| Relación | Tipo | Clase de fuente observada | Uso desde NUMERA |
| --- | --- | --- | --- |
| `app_navigation_items` | TABLE | navegación compartida | lectura runtime y sincronización |
| `app_screen_registry` | TABLE | registro compartido de superficies | sincronización |
| `areas` | TABLE | maestro organizacional compartido | contexto territorial |
| `attendance_logs` | TABLE | evento operativo de asistencia | contexto de jornada |
| `cost_centers` | TABLE | maestro económico compartido | dimensión financiera |
| `employee_settings` | TABLE | preferencia/contexto de trabajador | sede seleccionada |
| `employee_shifts` | TABLE | programación laboral | contexto de jornada |
| `employee_sites` | TABLE | asignación trabajador-sede | contexto territorial |
| `employees` | TABLE | maestro de trabajador | identidad y rol |
| `numera_cost_center_budgets` | TABLE | persistencia económica NUMERA | presupuesto/meta |
| `numera_cost_center_monthly_summary` | VIEW | proyección derivada NUMERA | analítica agregada |
| `numera_expense_categories` | TABLE | catálogo económico NUMERA | clasificación de gasto |
| `numera_expenses` | TABLE | persistencia económica NUMERA | gasto/hecho capturado |
| `numera_periods` | TABLE | periodo económico NUMERA | dimensión temporal |
| `role_permissions` | TABLE | autorización compartida | simulación/permiso base |
| `shared_operational_device_apps` | TABLE | contexto de dispositivo compartido | apps habilitadas |
| `shared_operational_devices` | TABLE | contexto de dispositivo compartido | sesión operativa |
| `sites` | TABLE | maestro organizacional compartido | sede |

---

#### 14. Núcleo económico físico observado

Las relaciones que hoy forman el núcleo económico directamente consumido por las pantallas NUMERA son:

```text
public.cost_centers
public.numera_periods
public.numera_expense_categories
public.numera_expenses
public.numera_cost_center_budgets
public.numera_cost_center_monthly_summary
```

Esto corresponde a cinco tablas base y una vista derivada.

La función `numera_current_period_summary` añade una segunda capa derivada sobre la vista.

---

#### 15. Maestro económico compartido

`public.cost_centers` es una tabla física compartida vinculada opcionalmente a `sites`.

El comentario remoto la describe como centros de costo internos utilizados para asociar sedes, producción, satélites, logística o administración con responsabilidad económica.

Esta tarea la clasifica como:

```text
SHARED_ECONOMIC_MASTER_CURRENT
```

No fija propiedad funcional definitiva porque `NUMERA-DOM-006` conserva la definición canónica de propiedad del catálogo de centros de costo.

---

#### 16. Contexto organizacional compartido

Las relaciones:

```text
sites
areas
```

son maestros organizacionales compartidos.

NUMERA los usa como contexto y dimensión, no como ledger financiero propio.

`areas.site_id` referencia `sites.id`.

---

#### 17. Contexto laboral y operativo compartido

Las relaciones:

```text
employees
employee_sites
employee_settings
employee_shifts
attendance_logs
employee_areas
```

aportan identidad, asignación territorial, preferencia de sede, turno activo y contexto de jornada.

NUMERA consume este contexto para autorización y experiencia operativa; no convierte esos registros en hechos financieros.

---

#### 18. Autorización, navegación y dispositivo compartidos

Las relaciones:

```text
apps
app_permissions
role_permissions
employee_permissions
site_operational_roles
operational_role_permissions
app_navigation_items
app_screen_registry
shared_operational_devices
shared_operational_device_apps
```

pertenecen a plataforma, autorización, navegación o dispositivo compartido.

Su presencia en el lineage técnico de NUMERA no les asigna propiedad económica.

---

#### 19. Vista `numera_cost_center_monthly_summary`

La vista remota se deriva de exactamente estas cinco relaciones base:

```text
numera_periods
cost_centers
numera_cost_center_budgets
numera_expenses
numera_expense_categories
```

La vista:

- cruza cada periodo con centros de costo activos;
- incorpora presupuesto, ingreso esperado y margen objetivo;
- agrega gastos reales;
- separa gastos `fixed`, `variable` y `one_time`;
- calcula variación presupuestal;
- calcula punto de equilibrio cuando existe margen objetivo válido.

Por tanto:

```text
numera_cost_center_monthly_summary = DERIVED_READ_MODEL
```

No es fuente primaria editable.

---

#### 20. RPC `numera_current_period_summary`

La función:

```text
public.numera_current_period_summary()
```

lee:

```text
public.numera_periods
public.numera_cost_center_monthly_summary
```

selecciona el periodo del mes actual y agrega centros, presupuesto, ingreso esperado, gastos y equilibrio.

Se clasifica como:

```text
DERIVED_AGGREGATE_RPC
```

No crea un hecho económico nuevo.

---

#### 21. Tabla `numera_periods`

`numera_periods` conserva:

- identidad del periodo;
- mes;
- etiqueta;
- estado;
- timestamps.

En el snapshot remoto existen:

```text
NUMERA_PERIOD_ROWS = 1
NUMERA_PERIOD_OPEN_ROWS = 1
```

No se localizó en el repositorio actual de NUMERA una superficie de administración equivalente a un ledger de cierre completo; esa clasificación pertenece a tareas posteriores.

---

#### 22. Tabla `numera_expense_categories`

El catálogo físico contiene siete filas:

```text
NUMERA_EXPENSE_CATEGORY_ROWS = 7
FIXED = 3
VARIABLE = 3
ONE_TIME = 1
```

La categoría participa directamente en la clasificación de agregados de la vista mensual.

---

#### 23. Tabla `numera_expenses`

La tabla conserva:

- periodo;
- centro de costo opcional;
- sede opcional;
- categoría;
- fecha;
- descripción;
- importe;
- moneda;
- `source_app`;
- `source_table`;
- `source_id`;
- `metadata`;
- actor creador;
- timestamps.

En el snapshot remoto:

```text
NUMERA_EXPENSE_ROWS = 0
```

Por tanto no existe una población actual que permita demostrar un sistema externo efectivamente materializado mediante `source_app/source_table/source_id`.

---

#### 24. Tabla `numera_cost_center_budgets`

La tabla relaciona:

```text
period_id -> numera_periods.id
cost_center_id -> cost_centers.id
```

Y conserva:

- presupuesto;
- ingreso esperado;
- margen bruto objetivo;
- notas;
- actor creador;
- timestamps.

En el snapshot remoto:

```text
NUMERA_BUDGET_ROWS = 0
```

---

#### 25. Tabla `cost_centers`

`cost_centers` conserva seis filas en el snapshot remoto:

```text
COST_CENTER_ROWS = 6
```

Su FK territorial es:

```text
cost_centers.site_id -> sites.id
```

La tabla participa como dimensión de presupuesto, gasto y analítica.

La auditoría histórica verificó además una semilla idempotente desde sedes, pero esta tarea no convierte ese antecedente en propiedad funcional futura.

---

#### 26. Lineage de la vista mensual

El lineage observable es:

```text
numera_periods
        +
cost_centers
        +
numera_cost_center_budgets
        +
numera_expenses
        +
numera_expense_categories
        ↓
numera_cost_center_monthly_summary
        ↓
numera_current_period_summary
```

Las dos últimas superficies son derivadas y no deben editarse como fuente.

---

#### 27. Snapshot cuantitativo de las dieciocho relaciones directas

| Relación | Filas observadas |
| --- | ---: |
| `app_navigation_items` | 71 |
| `app_screen_registry` | 81 |
| `areas` | 22 |
| `attendance_logs` | 6757 |
| `cost_centers` | 6 |
| `employee_settings` | 63 |
| `employee_shifts` | 4308 |
| `employee_sites` | 93 |
| `employees` | 63 |
| `numera_cost_center_budgets` | 0 |
| `numera_cost_center_monthly_summary` | 6 |
| `numera_expense_categories` | 7 |
| `numera_expenses` | 0 |
| `numera_periods` | 1 |
| `role_permissions` | 613 |
| `shared_operational_device_apps` | 4 |
| `shared_operational_devices` | 2 |
| `sites` | 7 |

Los conteos son evidencia de corte, no requisitos de cardinalidad permanente.

---

#### 28. Estado de la fundación económica

El estado remoto observado combina:

```text
6 centros de costo
1 periodo abierto
7 categorias de gasto
0 gastos
0 presupuestos
6 filas derivadas de resumen
```

La existencia de filas derivadas con cero gastos y presupuestos es explicable por el `CROSS JOIN` de periodos y centros de costo de la vista.

No demuestra actividad económica registrada.

---

#### 29. Campos de origen de gastos

`numera_expenses` dispone de:

```text
source_app
source_table
source_id
metadata
```

Estos campos habilitan lineage técnico potencial.

Como la tabla contiene cero filas, no existe evidencia remota actual que permita enumerar valores efectivos de `source_app` o `source_table`.

---

#### 30. Productor actual de captura manual

La Server Action `createExpense` observada en `NUMERA-AUD-002` escribe:

```text
currency = COP
source_app = numera
```

Por tanto, para el flujo manual implementado:

```text
CURRENT_MANUAL_EXPENSE_PRODUCER = NUMERA
```

Esto no sustituye un evento económico canónico recibido desde otro dominio.

---

#### 31. Productor actual de presupuesto

La Server Action `upsertBudget` escribe directamente `numera_cost_center_budgets`.

Por tanto:

```text
CURRENT_BUDGET_PRODUCER = NUMERA
```

La tabla presupuestal es persistencia propia del flujo actual, mientras `cost_centers` sigue siendo dimensión compartida.

---

#### 32. Sistemas fuente actuales conectados

Para las métricas visibles del repositorio actual, las fuentes físicas efectivamente conectadas son:

1. persistencia económica propia `numera_*`;
2. maestro compartido `cost_centers`;
3. maestros organizacionales `sites` y `areas`;
4. contexto laboral/operativo compartido;
5. autorización, navegación y dispositivo compartidos.

No se observa un consumidor de hechos económicos provenientes directamente de otro repositorio VENTO.

---

#### 33. Sistemas fuente canónicos declarados

La continuidad canónica posterior declara explícitamente que NUMERA deberá consumir eventos de:

```text
PULSO
ORIGO
FOGO
NEXO
```

Cardinalidad:

```text
DECLARED_OPERATIONAL_SOURCE_SYSTEMS = 4
```

Esta tarea conserva esa declaración sin presentarla como integración actual.

---

#### 34. PULSO como fuente declarada

PULSO conserva los hechos comerciales de venta y debe emitir contratos o eventos correlacionados hacia consumidores financieros.

Frontera heredada:

```text
PULSO CONSERVA HECHOS COMERCIALES
NUMERA CONSERVA HECHOS ECONOMICOS Y CONCILIACION
NUMERA NO RECONSTRUYE LA VENTA COMO SEGUNDA FUENTE
```

En el snapshot actual de `vento-numera` no existe consumidor físico identificado de eventos PULSO.

---

#### 35. ORIGO como fuente declarada

Los contratos de integración vigentes reservan a ORIGO la recepción comercial/documental y a NUMERA el reconocimiento económico correlacionado.

La recepción comercial no es propiedad de NUMERA.

En el snapshot actual no se observa una superficie NUMERA que consuma de extremo a extremo el evento económico derivado de recepción.

---

#### 36. FOGO como fuente declarada

Las tareas de dominio NUMERA reservan hechos económicos provenientes de producción.

FOGO es fuente operativa declarada para producción; NUMERA no debe reescribir lotes o producción como si fueran hechos propios.

No se observa un consumidor FOGO específico en el repositorio NUMERA actual.

---

#### 37. NEXO como fuente declarada

NEXO conserva inventario, custodia y efectos físicos asociados a movimientos y variaciones.

Los contratos vigentes separan:

```text
EFECTO FISICO NEXO
!=
HECHO ECONOMICO NUMERA
```

No se observa un consumidor NEXO específico en el repositorio NUMERA actual.

---

#### 38. Fuentes externas directas

No se observan en `vento-numera`:

- clientes HTTP de sistemas financieros externos;
- webhooks propios;
- API routes de ingestión;
- Edge Functions invocadas;
- suscripciones Realtime;
- importadores Excel;
- consumidores Makos, Shopify, Rappi o ManyChat.

Por tanto:

```text
DIRECT_EXTERNAL_SOURCE_SYSTEMS_OBSERVED = 0
```

Una fuente externa mediada por otra aplicación no se convierte en integración directa de NUMERA.

---

#### 39. Relaciones económicas remotas adyacentes no consumidas por NUMERA actual

El proyecto remoto contiene además relaciones económicas relevantes que no forman parte de las dieciocho relaciones directas ni son consumidas por el código NUMERA actual:

```text
public.inventory_cost_policies
public.product_cost_events
public.internal_price_lists
public.internal_price_list_items
public.internal_pos_documents
public.internal_pos_document_lines
payments.transactions
club.wallet_accounts
club.wallet_ledger
```

Estas identidades se registran como:

```text
ADJACENT_ECONOMIC_SOURCES_NOT_CURRENTLY_CONSUMED
```

No se incorporan artificialmente al lineage actual de las pantallas NUMERA.

---

#### 40. Estado remoto de fuentes económicas adyacentes

Conteos observados:

```text
inventory_cost_policies = 5
product_cost_events = 4
internal_price_lists = 3
internal_price_list_items = 1
internal_pos_documents = 0
internal_pos_document_lines = 0
payments.transactions = 7
club.wallet_accounts = 0
club.wallet_ledger = 0
```

Estos conteos demuestran existencia y población parcial de fuentes económicas adyacentes, no consumo por NUMERA.

---

#### 41. Taxonomía de eventos

Se distinguen:

```text
DATABASE_TRIGGER_EVENT
REALTIME_PUBLICATION_EVENT
APPLICATION_EVENT_CONSUMPTION
DOMAIN_ECONOMIC_EVENT
```

Un trigger de `updated_at` pertenece a `DATABASE_TRIGGER_EVENT` y no se eleva por inferencia a `DOMAIN_ECONOMIC_EVENT`.

---

#### 42. Triggers sobre las relaciones directas

El contraste remoto identifica:

```text
ENABLED_TRIGGERS_ON_DIRECT_RELATIONS = 20
DIRECT_RELATIONS_WITH_ENABLED_TRIGGERS = 12
```

Las familias observadas cubren:

- actualización automática de timestamps;
- validación y resolución de asistencia;
- sincronización trabajador-sede;
- validación de rol/sede;
- límites de publicación de turnos;
- validación de dispositivo compartido.

---

#### 43. Triggers propios de tablas `numera_*`

Las cuatro tablas mutables NUMERA observadas tienen triggers de actualización temporal:

```text
numera_periods -> trg_numera_periods_updated_at
numera_expense_categories -> trg_numera_expense_categories_updated_at
numera_expenses -> trg_numera_expenses_updated_at
numera_cost_center_budgets -> trg_numera_budgets_updated_at
```

Todos ejecutan `set_numera_updated_at` antes de `UPDATE`.

No se observó en estas cuatro tablas un trigger que emita por sí mismo un evento empresarial de integración.

---

#### 44. Triggers de contexto compartido

Entre los triggers no económicos usados indirectamente por NUMERA se observan familias para:

- geocerca y secuencia de `attendance_logs`;
- resolución de turno;
- sincronización `employees` ↔ `employee_sites`;
- restricción de asignación a sedes ocultas;
- control de publicación de turnos;
- consistencia sede-área de dispositivo compartido;
- timestamps de navegación y maestros.

Estos eventos mantienen contexto operativo, no reconocimiento financiero.

---

#### 45. Interpretación de triggers

La evidencia permite afirmar:

```text
DATABASE_TRIGGER_COVERAGE_PRESENT = YES
NUMERA_DOMAIN_EVENT_EMISSION_CONFIRMED_BY_LOCAL_TRIGGERS = NO
```

La primera afirmación describe automatización interna de base.

La segunda evita confundir timestamps o validadores con contratos económicos interaplicación.

---

#### 46. Publicación Realtime

Ninguna de las diecisiete tablas directas consumidas por NUMERA pertenece actualmente a la publicación `supabase_realtime`.

```text
DIRECT_TABLES_IN_SUPABASE_REALTIME = 0
DIRECT_TABLES_TOTAL = 17
```

La vista derivada no se trata como tabla publicable para Postgres Changes.

---

#### 47. Consumo Realtime en `vento-numera`

La búsqueda del snapshot actual no encuentra:

```text
postgres_changes
.channel(...)
```

Resultado:

```text
NUMERA_REALTIME_SUBSCRIPTIONS_OBSERVED = 0
```

---

#### 48. Otros canales de ingestión de eventos

Combinando esta tarea con `NUMERA-AUD-002`:

```text
APP_ROUTER_API_ROUTES = 0
DIRECT_EDGE_FUNCTION_INVOCATIONS = 0
NUMERA_PG_CRON_JOBS = 0
REALTIME_SUBSCRIPTIONS = 0
```

Por tanto no existe evidencia de un canal técnico alternativo que hoy materialice ingestión automática de eventos económicos en NUMERA.

---

#### 49. Cadena actual de gasto manual

La cadena implementada observada es:

```text
USUARIO AUTORIZADO
        ↓
FORMULARIO /expenses
        ↓
createExpense
        ↓
public.numera_expenses
        ↓
public.numera_cost_center_monthly_summary
        ↓
PANTALLAS DE GASTO / EQUILIBRIO / RENTABILIDAD
```

Este flujo es captura propia de NUMERA.

No equivale a recepción de un evento canónico externo.

---

#### 50. Cadena objetivo declarada de hechos económicos

Los contratos canónicos posteriores preservan el patrón:

```text
DOMINIO OPERATIVO FUENTE
        ↓
EVENTO / CONTRATO CORRELACIONADO
        ↓
NUMERA RECIBE SIN REESCRIBIR EL HECHO OPERATIVO
        ↓
CLASIFICA / RECONOCE / CONCILIA
        ↓
EFECTO ECONOMICO TRAZABLE
```

Los emisores declarados comprenden PULSO, ORIGO, FOGO y NEXO.

Esta tarea no materializa el patrón.

---

#### 51. Foreign keys del núcleo económico

Las relaciones explícitas son:

```text
numera_cost_center_budgets.period_id -> numera_periods.id
numera_cost_center_budgets.cost_center_id -> cost_centers.id
numera_expenses.period_id -> numera_periods.id
numera_expenses.category_id -> numera_expense_categories.id
numera_expenses.cost_center_id -> cost_centers.id
numera_expenses.site_id -> sites.id
cost_centers.site_id -> sites.id
```

Esto demuestra dependencia estructural entre periodo, categoría, centro, sede y hechos capturados.

---

#### 52. Relaciones de autorización y contexto

El lineage técnico de autorización incorpora adicionalmente:

```text
has_permission
-> employees
-> apps
-> app_permissions
-> employee_permissions
-> role_permissions
-> employee_settings / employee_sites / employee_areas / sites / areas mediante helpers de alcance
```

Y el carril operativo incorpora:

```text
has_operational_role_permission
-> areas
-> site_operational_roles
-> operational_role_permissions
```

Estas relaciones explican autoridad de acceso, no autoridad económica del dato.

---

#### 53. Autoridad observada por clase

Se adoptan las siguientes etiquetas descriptivas:

| Clase | Relaciones principales | Autoridad observada |
| --- | --- | --- |
| `NUMERA_DIRECT_WRITE` | `numera_expenses`, `numera_cost_center_budgets` | NUMERA escribe mediante sus Server Actions actuales |
| `NUMERA_CONFIG_OR_PERIOD` | `numera_periods`, `numera_expense_categories` | persistencia NUMERA; no se localizó mutador UI equivalente en snapshot |
| `DERIVED_NUMERA_READ_MODEL` | `numera_cost_center_monthly_summary`, `numera_current_period_summary` | derivada; nunca fuente primaria |
| `SHARED_ECONOMIC_MASTER` | `cost_centers` | dimensión compartida; propiedad futura reservada |
| `SHARED_ORG_MASTER` | `sites`, `areas` | contexto organizacional compartido |
| `SHARED_WORKFORCE_CONTEXT` | `employees`, `employee_sites`, `employee_settings`, `employee_shifts`, `attendance_logs`, `employee_areas` | contexto laboral y operativo |
| `SHARED_AUTH_NAV_DEVICE` | relaciones de apps, permisos, navegación y dispositivo | autoridad de acceso/contexto |

---

#### 54. Agregados no editables como fuente

Se congela la regla:

```text
numera_cost_center_monthly_summary
numera_current_period_summary
```

son proyecciones derivadas.

No deben transformarse en origen editable de:

- gastos;
- presupuesto;
- periodo;
- centro de costo;
- clasificación económica.

---

#### 55. Fuente y autoridad en `numera_expenses`

La tabla permite referenciar un origen externo mediante campos de lineage, pero hoy la única escritura de aplicación localizada fija `source_app = numera`.

Como existen cero filas remotas:

```text
CURRENT_EXTERNAL_EXPENSE_SOURCE_ROWS = 0
```

La tarea no asigna semántica final a `source_app/source_table/source_id`; esa reconciliación pertenece a contratos de dominio e integración posteriores.

---

#### 56. Riesgo estructural de doble fuente

Existe una tensión documental observable entre:

```text
CAPTURA MANUAL ACTUAL
```

y el contrato posterior de:

```text
HECHO ECONOMICO RECIBIDO DESDE FUENTE OPERATIVA CANONICA
```

Esta tarea solo registra la coexistencia potencial.

La detección de registros manuales duplicados frente a otros dominios pertenece a `NUMERA-AUD-007`.

---

#### 57. Cadena de fuente actual resumida

Para el código actualmente ejecutable:

```text
NUMERA MANUAL / CONFIG
        +
MAESTROS COMPARTIDOS
        +
CONTEXTO DE AUTORIZACION Y OPERACION
        ↓
TABLAS NUMERA
        ↓
VISTA MENSUAL
        ↓
RPC DE RESUMEN
        ↓
UI NUMERA
```

No existe un paso físico de ingestión desde PULSO, ORIGO, FOGO o NEXO en este snapshot.

---

#### 58. Cadena de fuente objetivo preservada

Sin desarrollar tareas futuras, se conserva la frontera canónica:

```text
PULSO -> hechos comerciales
ORIGO -> compras / recepción comercial
FOGO -> producción
NEXO -> inventario / efectos físicos
        ↓
EVENTOS O CONTRATOS CORRELACIONADOS
        ↓
NUMERA -> hechos económicos y conciliación
```

La forma exacta de los contratos se mantiene en sus owners canónicos y no se redefine aquí.

---

#### 59. Hallazgos nuevos o ampliados

| Hallazgo | Bloquea este inventario | Propietario | Condición de salida |
| --- | --- | --- | --- |
| las 18 relaciones directas son 17 tablas y 1 vista, todas en `public` | no | `NUMERA-AUD-004` | usar inventario como base de clasificación funcional |
| las RPC agregan 6 tablas compartidas al lineage técnico | no | `NUMERA-AUTH-*` aplicable | conservar dependencias de autorización/contexto sin tratarlas como hechos económicos |
| `numera_expenses` y `numera_cost_center_budgets` tienen cero filas | no | `NUMERA-AUD-004`, `NUMERA-AUD-005`, `NUMERA-AUD-009` | clasificar cobertura, datos y flujo sin inventar actividad |
| existen 20 triggers habilitados sobre 12 relaciones directas, pero los cuatro triggers `numera_*` observados solo mantienen `updated_at` | no | `NUMERA-AUD-004`, dominio/integración posterior | distinguir automatización DB de evento empresarial |
| ninguna tabla directa NUMERA está en `supabase_realtime` y el código no declara suscripciones | no | `NUMERA-AUD-004` + integración posterior | decidir necesidad real sin publicar tablas por inferencia |
| PULSO, ORIGO, FOGO y NEXO están declarados como fuentes operativas objetivo, pero no hay consumidor físico actual localizado | no | `NUMERA-AUD-004`, `NUMERA-DOM-*`, `NUMERA-UX-014`, integración propietaria | clasificar brecha y luego materializar contrato propietario |
| existen nueve relaciones económicas adyacentes con datos parciales fuera del consumo actual NUMERA | no | `NUMERA-AUD-004`, `NUMERA-AUD-006` a `NUMERA-AUD-009` | decidir relevancia, conciliación y fuente de verdad sin conectarlas por inferencia |
| la captura manual actual puede coexistir con fuentes canónicas futuras | no | `NUMERA-AUD-007` | detectar y evitar doble registro contra otros dominios |

No se crea una tarea administrativa nueva.

---

#### 60. Trabajo reservado a NUMERA-AUD-004

`NUMERA-AUD-004` consumirá este inventario para clasificar capacidades como:

```text
COMPLETA
PARCIAL
PROTOTIPO
AUSENTE
```

Esta tarea no aplica esas etiquetas a módulos o capacidades.

En particular, no convierte automáticamente en “ausencia”:

- cero gastos;
- cero presupuestos;
- cero API routes;
- cero cron NUMERA;
- cero Realtime;
- falta de consumidor de los cuatro sistemas fuente declarados.

---

#### 61. Trabajo reservado a NUMERA-AUD-005 a NUMERA-AUD-010

Se conservan propietarios posteriores:

- `NUMERA-AUD-005`: datos simulados, hardcodes, TODO y lógica provisional;
- `NUMERA-AUD-006`: reportes sin conciliación o sin fuente de verdad aprobada;
- `NUMERA-AUD-007`: registros manuales duplicados frente a otros dominios;
- `NUMERA-AUD-008`: cálculos de costos, margen, rentabilidad y equilibrio;
- `NUMERA-AUD-009`: gastos, centros de costo, cierres y aprobaciones;
- `NUMERA-AUD-010`: exportaciones, información sensible y trazabilidad.

La presente tarea entrega evidencia; no absorbe esas decisiones.

---

#### 62. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea inventaría y clasifica técnicamente relaciones, vistas, triggers y fuentes ya existentes. No introduce una regla funcional nueva, un contrato de evento nuevo, una autorización nueva, un algoritmo financiero nuevo ni una mutación de datos.

---

#### 63. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-NUMERA-001` para reconciliación con PULSO, ORIGO, FOGO y NEXO y prohibición de doble registro manual;
- `TREQ-NUMERA-002` para identidad de hecho económico, fuente, correlación, documento, periodos y no edición de agregados como fuente;
- `TREQ-NUMERA-004` para fuente, método y entradas de costos, presupuestos, equilibrio y rentabilidad;
- `TREQ-NUMERA-018` para origen explícito en creación de gastos;
- `TREQ-NUMERA-019` y `TREQ-NUMERA-020` para equilibrio y rentabilidad sin convertir valores derivados en hechos confirmados;
- `TREQ-NUMERA-022` para reconciliación idempotente de registro y navegación;
- `TREQ-NUMERA-024` para delta explícito frente a la línea base aprobada.

Esta sección es trazabilidad de cobertura vigente, no una actualización del registro.

---

#### 64. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea no ejecuta build del producto; esa responsabilidad permanece en `NUMERA-AUD-011`. |
| LOCAL | NOT_EXECUTED | La validación estructural contra el checkout del usuario queda pendiente hasta incorporar el artefacto en su rama documental. |
| REMOTA | PASS | Se verificaron `main`, continuidad, snapshot de `vento-numera`, tipos de relación, RLS descriptiva, view/function definitions, foreign keys, triggers, publicación Realtime, conteos agregados y fuentes económicas adyacentes mediante consultas de solo lectura. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó un flujo financiero, evento económico, Server Action, RPC de negocio, trigger deliberado ni integración de aplicación. |
| FÍSICA | NOT_APPLICABLE | `NUMERA-AUD-003` es `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no autoriza materialización física. |

---

#### 65. Decisiones congeladas

Quedan adoptadas para las tareas siguientes:

1. el universo directo contiene 18 relaciones literales;
2. esas relaciones son 17 tablas y una vista;
3. todas las relaciones directas pertenecen al esquema `public`;
4. los RPC consumidos incorporan seis tablas compartidas adicionales al lineage técnico;
5. el universo expandido contiene 24 relaciones físicas únicas: 23 tablas y una vista;
6. `numera_cost_center_monthly_summary` es una vista derivada de cinco relaciones base;
7. `numera_current_period_summary` es un agregado derivado sobre periodo y vista mensual;
8. las escrituras de negocio actuales recaen en `numera_expenses` y `numera_cost_center_budgets`;
9. la captura manual observada fija `source_app = numera`;
10. el snapshot remoto contiene cero gastos y cero presupuestos;
11. `cost_centers` se conserva como maestro económico compartido sin resolver aquí su propiedad funcional futura;
12. los maestros de sede, área, personal, autorización, navegación y dispositivo son contexto compartido, no hechos económicos NUMERA;
13. existen 20 triggers habilitados sobre 12 relaciones directas;
14. los cuatro triggers propios de tablas `numera_*` observados mantienen `updated_at` y no demuestran emisión de evento empresarial;
15. ninguna tabla directa pertenece a `supabase_realtime`;
16. `vento-numera` no declara suscripciones Realtime;
17. no existe canal API, Edge, cron o Realtime observado que materialice ingestión automática de hechos económicos;
18. PULSO, ORIGO, FOGO y NEXO se conservan como cuatro sistemas fuente operativos declarados por contratos posteriores;
19. no existe consumidor físico actual localizado para esos cuatro emisores;
20. nueve relaciones económicas adyacentes existen remotamente pero no se incorporan al lineage actual por inferencia;
21. la coexistencia entre captura manual y fuentes operativas canónicas se entrega a `NUMERA-AUD-007` para control de duplicación;
22. ninguna clasificación de completitud se adelanta antes de `NUMERA-AUD-004`.

---

#### 66. Criterios de aceptación

`NUMERA-AUD-003` queda documentalmente completa cuando:

- conserva exactamente el handoff de `NUMERA-AUD-002`;
- distingue tablas de vistas;
- identifica las 18 relaciones directas;
- identifica las 6 relaciones transitivas adicionales descubiertas por RPC;
- mantiene 24 relaciones físicas únicas en el universo expandido;
- clasifica la vista y RPC financiera como derivadas;
- reconstruye el lineage del resumen mensual;
- documenta foreign keys principales del núcleo económico;
- separa maestros compartidos de persistencia económica NUMERA;
- registra conteos remotos sin convertirlos en cardinalidad contractual;
- registra que gastos y presupuestos tienen cero filas en el corte;
- documenta los campos de origen de gastos sin inventar valores inexistentes;
- identifica NUMERA como productor del flujo manual actual;
- identifica PULSO, ORIGO, FOGO y NEXO como fuentes canónicas declaradas, no como integraciones físicas actuales;
- distingue triggers de base de eventos empresariales;
- inventaría los 20 triggers habilitados y los cuatro triggers `numera_*` relevantes;
- comprueba que las tablas directas no están en la publicación Realtime;
- comprueba que el código actual no declara suscripciones Realtime;
- conserva las fuentes económicas adyacentes fuera del lineage actual cuando no hay consumidor;
- no clasifica módulos como completos, parciales, prototipos o ausentes;
- no crea ni modifica requisitos;
- no modifica 04A;
- no ejecuta cambios físicos;
- entrega un handoff cerrado a `NUMERA-AUD-004`.

---

#### 67. Límites

Esta tarea no:

- modifica tablas o vistas;
- crea migraciones;
- cambia RLS o grants;
- publica relaciones en Realtime;
- crea triggers;
- modifica triggers;
- crea outbox, inbox, cola o worker;
- crea consumidores de PULSO, ORIGO, FOGO o NEXO;
- conecta fuentes económicas adyacentes;
- registra gastos o presupuestos;
- ejecuta cierres;
- cambia centros de costo;
- redefine propiedad del catálogo de centros de costo;
- redefine contratos de eventos ya aprobados;
- convierte triggers de `updated_at` en eventos de dominio;
- declara contabilidad formal;
- valida completitud funcional;
- detecta todavía datos simulados o hardcodes;
- decide fuente de verdad de reportes;
- resuelve duplicación manual;
- audita fórmulas financieras;
- audita sensibilidad/exportación;
- ejecuta build, lint, tipos o pruebas de producto;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica 04A;
- desarrolla `NUMERA-AUD-004`.

---

#### 68. Handoff inmediato a NUMERA-AUD-004

La siguiente tarea recibe como base cerrada:

```text
DIRECT_FROM_RELATIONS = 18
DIRECT_TABLES = 17
DIRECT_VIEWS = 1
TRANSITIVE_RPC_ADDITIONAL_RELATIONS = 6
EXPANDED_UNIQUE_RELATIONS = 24
EXPANDED_TABLES = 23
EXPANDED_VIEWS = 1
NUMERA_EXPENSE_ROWS = 0
NUMERA_BUDGET_ROWS = 0
ENABLED_TRIGGERS_ON_DIRECT_RELATIONS = 20
DIRECT_RELATIONS_WITH_ENABLED_TRIGGERS = 12
DIRECT_TABLES_IN_SUPABASE_REALTIME = 0
NUMERA_REALTIME_SUBSCRIPTIONS_OBSERVED = 0
DECLARED_OPERATIONAL_SOURCE_SYSTEMS = 4
DIRECT_EXTERNAL_SOURCE_SYSTEMS_OBSERVED = 0
```

Y deberá decidir, sin alterar estas identidades:

```text
MODULO COMPLETO
MODULO PARCIAL
PROTOTIPO
AUSENTE
```

---

#### 69. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-002 — Inventariar Server Actions, API, RPC, consultas y jobs utilizados`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes`
### ✅ NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente
**Tarea siguiente:** NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional
**Tipo de tarea:** clasificación técnico-funcional cerrada del estado AS-IS de los módulos financieros de NUMERA contra el alcance canónico `CAP-12.01..CAP-12.15`, distinguiendo implementación completa, parcial, prototipo y ausencia sin adelantar auditorías de datos simulados, conciliación, duplicación, cálculos, cierres, seguridad o pruebas reservadas a tareas posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, rutas, componentes, Server Actions, tablas, vistas, RPC, triggers, Realtime, RLS, grants, migraciones, datos, eventos, integraciones, jobs, despliegues ni configuración financiera
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Clasificar el estado funcional actual de NUMERA con una regla única y verificable que permita distinguir:

```text
COMPLETO
PARCIAL
PROTOTIPO
AUSENTE
```

La clasificación se aplica al universo financiero canónico aprobado para NUMERA y no a la mera existencia de archivos, tablas, permisos o pantallas.

El resultado debe permitir responder, sin inferencia:

- qué capacidades financieras tienen hoy un flujo real utilizable aunque incompleto;
- cuáles poseen únicamente una aproximación técnica o analítica;
- cuáles no tienen implementación suficiente dentro de NUMERA;
- si existe algún módulo financiero que ya satisfaga integralmente el alcance objetivo vigente;
- qué superficies actuales materializan cada clasificación;
- qué tarea posterior es propietaria de cada brecha sin crear nuevos IDs.

---

#### 2. Handoff recibido de NUMERA-AUD-003

`NUMERA-AUD-003` entrega como base cerrada:

```text
DIRECT_FROM_RELATIONS = 18
DIRECT_TABLES = 17
DIRECT_VIEWS = 1
TRANSITIVE_RPC_ADDITIONAL_RELATIONS = 6
EXPANDED_UNIQUE_RELATIONS = 24
EXPANDED_TABLES = 23
EXPANDED_VIEWS = 1
NUMERA_EXPENSE_ROWS = 0
NUMERA_BUDGET_ROWS = 0
ENABLED_TRIGGERS_ON_DIRECT_RELATIONS = 20
DIRECT_RELATIONS_WITH_ENABLED_TRIGGERS = 12
DIRECT_TABLES_IN_SUPABASE_REALTIME = 0
NUMERA_REALTIME_SUBSCRIPTIONS_OBSERVED = 0
DECLARED_OPERATIONAL_SOURCE_SYSTEMS = 4
DIRECT_EXTERNAL_SOURCE_SYSTEMS_OBSERVED = 0
```

Y reserva para esta tarea exclusivamente la decisión:

```text
MODULO COMPLETO
MODULO PARCIAL
PROTOTIPO
AUSENTE
```

---

#### 3. Naturaleza y topología

La topología vigente para `NUMERA-AUD-001..012` permanece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

- la clasificación se define documentalmente una sola vez;
- no crea una instancia física;
- no implementa los módulos ausentes;
- no rellena tablas vacías;
- no ejecuta movimientos económicos;
- no publica eventos;
- no modifica el alcance financiero aprobado;
- no altera `active-sequence.json` manualmente.

---

#### 4. Fuentes verificadas

La clasificación se reconcilia contra:

- `NUMERA-AUD-001` publicado;
- `NUMERA-AUD-002` publicado;
- `NUMERA-AUD-003` aprobado por el usuario como base inmediata;
- `CAP-SCOPE-012 — Evaluar costos, gastos, presupuestos, tesorería, contabilidad e impuestos`;
- `CODE-AUD-019 — Vincular cada capacidad con su implementación actual verificable`;
- `04A_13_NUMERA.md`;
- archivo propietario de `NUMERA-AUD-*`;
- `01_PROTOCOLO.md`;
- `manifest.json`;
- `continuity-route.json`;
- `execution-route.json`;
- `active-sequence.json`;
- `task-work-topology.json`;
- `task-format-policy.json`;
- `task-development-policy.json`;
- `package.json` de `vento-shell`;
- snapshot actual de `vento-numera/main`;
- siete archivos `page.tsx`;
- acciones `createExpense` y `upsertBudget`;
- vista `numera_cost_center_monthly_summary`;
- RPC `numera_current_period_summary`;
- metadatos remotos de solo lectura del proyecto Supabase observado;
- inventario de fuentes y dependencias producido por `NUMERA-AUD-003`.

---

#### 5. Snapshot de aplicación clasificado

La clasificación se fija contra:

```text
repository = vento-group-sas/vento-numera
commit = c4d50282e30e46d0abb3d871f9604cf913ebbabd
```

Las siete páginas físicas observadas siguen siendo:

```text
/
 /cost-centers
 /expenses
 /break-even
 /profitability
 /login
 /no-access
```

`/login` y `/no-access` son superficies de acceso/control y no crean por sí solas un módulo financiero.

---

#### 6. Universo canónico de módulos

Para evitar inventar una taxonomía paralela, la clasificación usa exactamente las quince subcapacidades financieras aprobadas de `CAP-12`:

```text
CAP-12.01 Registrar hechos económicos
CAP-12.02 Gestionar caja
CAP-12.03 Gestionar bancos y pagos
CAP-12.04 Gestionar cuentas por cobrar
CAP-12.05 Gestionar cuentas por pagar
CAP-12.06 Facturar y controlar documentos
CAP-12.07 Conciliar ventas, pagos y entregas
CAP-12.08 Conciliar compras y recepciones
CAP-12.09 Calcular costos
CAP-12.10 Distribuir costos compartidos
CAP-12.11 Gestionar presupuestos
CAP-12.12 Gestionar tesorería
CAP-12.13 Gestionar impuestos y obligaciones
CAP-12.14 Cerrar períodos y emitir reportes
CAP-12.15 Analizar rentabilidad
```

Cardinalidad:

```text
CANONICAL_FINANCIAL_MODULES = 15
```

---

#### 7. Regla de clasificación

Las etiquetas significan:

| Estado | Regla |
| --- | --- |
| `COMPLETO` | el resultado objetivo vigente tiene flujo de extremo a extremo, superficies o contratos suficientes, persistencia o evidencia correspondiente, fuentes requeridas y ausencia de una brecha material conocida que impida satisfacer el módulo |
| `PARCIAL` | existe un flujo real utilizable que produce o modifica el resultado del módulo, pero faltan etapas, dimensiones, fuentes, gobierno, aprobación, conciliación o cobertura material del alcance objetivo |
| `PROTOTIPO` | existe una representación técnica, estructura, cálculo o pantalla que aproxima el resultado, pero no materializa todavía un flujo objetivo utilizable de extremo a extremo o utiliza simplificaciones incompatibles con la definición final |
| `AUSENTE` | NUMERA no posee hoy una implementación suficiente del resultado; datos o procesos existentes en otra aplicación, proveedor, tabla no consumida o fuente adyacente no convierten el módulo en presente |

---

#### 8. Regla de suficiencia de evidencia

No basta con localizar:

- una tabla;
- una vista;
- un permiso;
- una ruta;
- una tarjeta de dashboard;
- una RPC;
- un trigger;
- una fuente en otro dominio;
- una relación económica adyacente;
- un estado de periodo;
- una pantalla de solo lectura.

La clasificación exige demostrar qué resultado del módulo produce el conjunto actual.

---

#### 9. Regla de frontera empresarial

La tarea clasifica:

```text
IMPLEMENTACION ACTUAL DENTRO DE NUMERA
```

No clasifica:

```text
EXISTENCIA DEL PROCESO EN TODO VENTO GROUP
```

Por tanto:

```text
MODULO NUMERA AUSENTE
```

puede coexistir con:

```text
FUENTE OPERATIVA EXISTENTE EN PULSO / ORIGO / FOGO / NEXO / PASS / TERCERO
```

sin contradicción.

---

#### 10. Resultado cuantitativo general

La matriz de las quince capacidades queda:

| Clasificación | Módulos |
| --- | ---: |
| `COMPLETO` | **0** |
| `PARCIAL` | **2** |
| `PROTOTIPO` | **3** |
| `AUSENTE` | **10** |
| **TOTAL** | **15** |

Invariantes:

```text
COMPLETE_MODULES = 0
PARTIAL_MODULES = 2
PROTOTYPE_MODULES = 3
ABSENT_MODULES = 10
CANONICAL_FINANCIAL_MODULES = 15
```

---

#### 11. Matriz completa CAP-12 × estado actual

| Capacidad | Resultado objetivo | Evidencia NUMERA actual | Estado |
| --- | --- | --- | --- |
| `CAP-12.01` | Registrar hechos económicos | captura manual de gastos en `numera_expenses`; periodos, categorías y lineage opcional; sin ingestión de hechos externos | `PARCIAL` |
| `CAP-12.02` | Gestionar caja | no existe módulo NUMERA que consuma y concilie sesiones o movimientos de caja de PULSO | `AUSENTE` |
| `CAP-12.03` | Gestionar bancos y pagos | no existen cuentas bancarias, extractos, matching, transferencias ni conciliación bancaria en NUMERA | `AUSENTE` |
| `CAP-12.04` | Gestionar cuentas por cobrar | no existe cartera, deudor, cuota, vencimiento, recaudo, aplicación, aging ni cobro en NUMERA | `AUSENTE` |
| `CAP-12.05` | Gestionar cuentas por pagar | no existe obligación, vencimiento, aprobación, programación, pago o disputa de proveedor en NUMERA | `AUSENTE` |
| `CAP-12.06` | Facturar y controlar documentos | no existe módulo NUMERA de referencia, estado y conciliación documental/fiscal | `AUSENTE` |
| `CAP-12.07` | Conciliar ventas, pagos y entregas | no existe consumidor físico PULSO/PASS/pagos ni expediente de diferencias | `AUSENTE` |
| `CAP-12.08` | Conciliar compras y recepciones | no existe consumidor físico ORIGO/NEXO ni expediente de conciliación | `AUSENTE` |
| `CAP-12.09` | Calcular costos | existe aproximación mediante gastos fijos/variables, margen objetivo y equilibrio; no existe motor de costo estándar/real/landed ni fuentes operativas | `PROTOTIPO` |
| `CAP-12.10` | Distribuir costos compartidos | no existen pools, drivers, versiones, destinos, aprobación ni reversión | `AUSENTE` |
| `CAP-12.11` | Gestionar presupuestos | `upsertBudget` persiste presupuesto, ingreso esperado y margen objetivo por periodo/centro; faltan versiones, aprobación, forecast y escenarios | `PARCIAL` |
| `CAP-12.12` | Gestionar tesorería | no existe posición, liquidez, compromisos, programación ni autorización de tesorería | `AUSENTE` |
| `CAP-12.13` | Gestionar impuestos y obligaciones | no existe calendario, componentes, soportes, estados ni integración fiscal dentro de NUMERA | `AUSENTE` |
| `CAP-12.14` | Cerrar períodos y emitir reportes | existen periodos con estados y proyecciones de lectura; no existe workflow de cierre, checklist, aprobación, bloqueo gobernado ni reapertura | `PROTOTIPO` |
| `CAP-12.15` | Analizar rentabilidad | existe `/profitability` con ingreso esperado, gasto, presupuesto y variación; no usa ingreso realizado ni costo completo trazable | `PROTOTIPO` |

---

#### 12. Módulos clasificados como COMPLETO

Resultado:

```text
COMPLETE_MODULES = 0
```

No se identifica ningún módulo financiero que satisfaga integralmente el alcance objetivo vigente.

Esto no significa que NUMERA no tenga funcionalidad real. Significa que cada módulo actualmente representado conserva una brecha material ya documentada frente a su definición aprobada.

---

#### 13. Módulos clasificados como PARCIAL

Se clasifican exactamente:

```text
CAP-12.01 Registrar hechos económicos
CAP-12.11 Gestionar presupuestos
```

Ambos poseen escritura real desde Server Actions actuales y persistencia propia.

La parcialidad se debe a que el alcance canónico es mayor que la captura implementada.

---

#### 14. Módulos clasificados como PROTOTIPO

Se clasifican exactamente:

```text
CAP-12.09 Calcular costos
CAP-12.14 Cerrar períodos y emitir reportes
CAP-12.15 Analizar rentabilidad
```

En los tres casos existe estructura o representación visible, pero falta una parte esencial del resultado objetivo.

---

#### 15. Módulos clasificados como AUSENTE

Se clasifican exactamente:

```text
CAP-12.02 Gestionar caja
CAP-12.03 Gestionar bancos y pagos
CAP-12.04 Gestionar cuentas por cobrar
CAP-12.05 Gestionar cuentas por pagar
CAP-12.06 Facturar y controlar documentos
CAP-12.07 Conciliar ventas, pagos y entregas
CAP-12.08 Conciliar compras y recepciones
CAP-12.10 Distribuir costos compartidos
CAP-12.12 Gestionar tesorería
CAP-12.13 Gestionar impuestos y obligaciones
```

La existencia de fuentes externas o estructuras en otros dominios no cambia esta clasificación dentro de NUMERA.

---

#### 16. CAP-12.01 — Registrar hechos económicos

Estado:

```text
PARCIAL
```

Evidencia implementada:

```text
/expenses
-> createExpense
-> numera_expenses
```

La acción valida campos básicos, persiste monto, fecha, categoría, centro, moneda y `source_app = numera`.

Brechas materiales:

- solo captura gasto manual;
- no recibe hechos económicos canónicos desde PULSO, ORIGO, FOGO o NEXO;
- no demuestra idempotencia de ingestión;
- no materializa identidad económica completa;
- no demuestra corrección compensatoria;
- los campos de lineage externo no tienen filas observadas.

---

#### 17. CAP-12.02 — Gestionar caja

Estado:

```text
AUSENTE
```

PULSO conserva la operación de caja como fuente objetivo, pero NUMERA no consume actualmente:

- sesiones;
- efectivo esperado;
- conteos;
- diferencias;
- depósitos;
- cierres;
- aprobaciones.

No existe ruta, Server Action, RPC o consumidor de caja en `vento-numera`.

---

#### 18. CAP-12.03 — Gestionar bancos y pagos

Estado:

```text
AUSENTE
```

No se localizan en NUMERA:

- maestro de cuentas bancarias;
- titulares;
- extractos;
- movimientos bancarios;
- matching;
- conciliación;
- transferencias;
- beneficiarios;
- pagos programados.

`payments.transactions` existe como fuente adyacente pero no es consumida por el repositorio actual.

---

#### 19. CAP-12.04 — Gestionar cuentas por cobrar

Estado:

```text
AUSENTE
```

No existe en NUMERA una implementación de:

- deudor;
- cuenta por cobrar;
- cuota;
- vencimiento;
- saldo;
- recaudo;
- aplicación;
- anticipo;
- saldo a favor;
- aging;
- acuerdo;
- promesa;
- disputa;
- cobranza;
- castigo.

La capacidad es obligatoria en el alcance aprobado, pero no está materializada en el snapshot actual.

---

#### 20. CAP-12.05 — Gestionar cuentas por pagar

Estado:

```text
AUSENTE
```

No existe módulo NUMERA para:

- obligación;
- documento asociado;
- aceptación;
- vencimiento;
- aprobación;
- programación;
- pago;
- retención;
- disputa;
- cierre.

Las compras y recepciones existentes en ORIGO no equivalen al subdominio financiero de obligaciones.

---

#### 21. CAP-12.06 — Facturar y controlar documentos

Estado:

```text
AUSENTE
```

El alcance objetivo permite proveedor fiscal o sistema externo, pero NUMERA debe conservar referencia, estado, tercero, moneda, impuestos y conciliación.

No se observa actualmente esa superficie de control dentro de `vento-numera`.

---

#### 22. CAP-12.07 — Conciliar ventas, pagos y entregas

Estado:

```text
AUSENTE
```

No existe un consumidor físico que una:

```text
VENTA
PAGO
CAJA
DOCUMENTO
ENTREGA
DEVOLUCION
REEMBOLSO
DEPOSITO
```

ni un expediente de diferencia con responsable, estado y evidencia.

---

#### 23. CAP-12.08 — Conciliar compras y recepciones

Estado:

```text
AUSENTE
```

No existe un flujo NUMERA que concilie:

```text
SOLICITUD
ORDEN
RECEPCION
DOCUMENTO
DIFERENCIA
OBLIGACION
DEVOLUCION
PAGO
```

La ausencia de consumidor ORIGO/NEXO observada en `NUMERA-AUD-003` confirma la clasificación.

---

#### 24. CAP-12.09 — Calcular costos

Estado:

```text
PROTOTIPO
```

La evidencia actual incluye:

- gasto fijo;
- gasto variable;
- margen objetivo;
- punto de equilibrio;
- relaciones económicas adyacentes como `inventory_cost_policies` y `product_cost_events`.

Sin embargo, NUMERA no consume esas fuentes adyacentes y no implementa un contrato de:

- costo de adquisición;
- landed;
- estándar;
- real;
- promedio;
- último;
- productivo;
- logístico;
- merma;
- vigencia y versión de método.

La pantalla de equilibrio constituye una aproximación analítica, no un motor de costos completo.

---

#### 25. CAP-12.10 — Distribuir costos compartidos

Estado:

```text
AUSENTE
```

No se localizan:

- pools;
- drivers;
- bases de asignación;
- centros origen;
- destinos;
- reglas versionadas;
- aprobación;
- reversión;
- explicación reproducible de distribución.

---

#### 26. CAP-12.11 — Gestionar presupuestos

Estado:

```text
PARCIAL
```

La ruta `/cost-centers` y `upsertBudget` permiten persistir por periodo y centro:

```text
budget_amount
expected_revenue
target_gross_margin_pct
notes
```

Brechas materiales del contrato objetivo:

- no existe versionado;
- no existe aprobación;
- no existe forecast separado;
- no existen escenarios;
- no existe workflow de modificación;
- no existe publicación diferenciada;
- no se observaron filas actuales en `numera_cost_center_budgets`.

La ausencia de filas no convierte el módulo en ausente porque el flujo de escritura existe.

---

#### 27. CAP-12.12 — Gestionar tesorería

Estado:

```text
AUSENTE
```

No existe módulo para:

- posición consolidada;
- flujo de caja;
- compromisos;
- vencimientos;
- liquidez;
- programación;
- autorización;
- alertas de tesorería.

---

#### 28. CAP-12.13 — Gestionar impuestos y obligaciones

Estado:

```text
AUSENTE
```

No se observa dentro de NUMERA:

- calendario;
- componentes tributarios;
- estimaciones;
- soportes;
- estados;
- referencias oficiales;
- integración con proveedor fiscal o contabilidad para esta capacidad.

La fiscalidad oficial permanece una frontera externa hasta decisión posterior.

---

#### 29. CAP-12.14 — Cerrar períodos y emitir reportes

Estado:

```text
PROTOTIPO
```

Existe:

```text
numera_periods.status
open / closed / locked
```

y existen proyecciones de lectura para panel, centros, equilibrio y rentabilidad.

No existe:

- acción de cierre;
- checklist;
- conciliación previa;
- aprobación;
- bloqueo gobernado;
- tratamiento de evento tardío;
- reapertura;
- ajuste;
- paquete de evidencia;
- exportación oficial.

La estructura de estados y reportes es base técnica, no workflow integral de cierre.

---

#### 30. CAP-12.15 — Analizar rentabilidad

Estado:

```text
PROTOTIPO
```

La ruta `/profitability` se presenta explícitamente como lectura inicial y usa:

```text
expected_revenue
actual_expenses
budget_amount
budget_variance
```

No usa:

- ingreso realizado;
- costo completo trazable;
- entidad legal;
- marca;
- canal;
- producto;
- pedido;
- cliente;
- metodología y vigencia de costo.

Por tanto no cumple el contrato de rentabilidad aprobado.

---

#### 31. Clasificación de la raíz `/`

La página raíz consume `numera_current_period_summary` y presenta:

- gasto operativo;
- presupuesto;
- ingreso esperado;
- punto de equilibrio;
- accesos a cuatro módulos.

Se clasifica como:

```text
SUPERFICIE RESUMEN = PROTOTIPO
```

No crea una décimo sexta capacidad financiera y no se confunde con el visor económico objetivo de `NUMERA-UX-028`.

---

#### 32. Clasificación de `/cost-centers`

La ruta combina:

- dimensión compartida de centro de costo;
- presupuesto;
- ingreso esperado;
- margen objetivo;
- gasto agregado;
- variación;
- equilibrio.

La ruta materializa principalmente:

```text
CAP-12.11 = PARCIAL
```

y expone proyecciones prototipo relacionadas con `CAP-12.09` y `CAP-12.15`.

No convierte `cost_centers` en propiedad financiera exclusiva de NUMERA.

---

#### 33. Clasificación de `/expenses`

La ruta materializa:

```text
CAP-12.01 = PARCIAL
```

porque permite registrar un tipo concreto de hecho económico manual y leer gastos recientes.

No materializa por sí sola ledger económico general, conciliación, soporte completo, aprobación, corrección o ingestión de fuentes.

---

#### 34. Clasificación de `/break-even`

La ruta se clasifica como:

```text
CAP-12.09 = PROTOTIPO
```

porque calcula una proyección a partir de:

```text
fixed_expenses
variable_expenses
target_gross_margin_pct
```

sin un motor canónico de costos ni fuentes de ventas/costos realizadas.

---

#### 35. Clasificación de `/profitability`

La ruta se clasifica como:

```text
CAP-12.15 = PROTOTIPO
```

porque compara ingreso esperado, gasto, presupuesto y variación, pero no calcula rentabilidad real conforme al contrato aprobado.

---

#### 36. Superficies `/login` y `/no-access`

Estas dos páginas son superficies públicas controladas de autenticación y denegación.

Se clasifican como:

```text
SOPORTE TRANSVERSAL
FUERA DE LA MATRIZ CAP-12
```

No deben contarse como módulos financieros completos para inflar la cobertura de NUMERA.

---

#### 37. Navegación y chrome compartido

`VentoShell`, navegación, perfil, contexto de sede/área y dispositivo compartido son infraestructura transversal consumida por NUMERA.

Se conserva la regla:

```text
INFRAESTRUCTURA DE ACCESO
!=
MODULO FINANCIERO
```

Su auditoría propietaria permanece en tareas de autorización, SHELL y navegación.

---

#### 38. Periodos como estructura técnica

`numera_periods` existe y contiene un periodo abierto.

Esto prueba:

```text
STRUCTURE_PRESENT = YES
```

pero no:

```text
PERIOD_CLOSE_MODULE_COMPLETE = YES
```

La tabla es evidencia de prototipo para `CAP-12.14`.

---

#### 39. Categorías de gasto como estructura técnica

`numera_expense_categories` contiene siete categorías observadas.

La categoría habilita la captura manual actual, pero no constituye un módulo financiero independiente dentro de la matriz CAP-12.

Forma parte de la evidencia parcial de `CAP-12.01`.

---

#### 40. Snapshot remoto de adopción

El contraste de solo lectura observado durante esta clasificación confirma:

```text
cost_centers = 6
numera_periods = 1
numera_expense_categories = 7
numera_expenses = 0
numera_cost_center_budgets = 0
numera_cost_center_monthly_summary = 6
period_status_open = 1
```

Los conteos se usan únicamente como evidencia de adopción y estructura.

---

#### 41. Interpretación de tablas con cero filas

Se congela:

```text
ZERO_ROWS
!=
AUSENTE
```

y:

```text
ZERO_ROWS
!=
MODULO COMPLETO
```

`numera_expenses` y `numera_cost_center_budgets` conservan flujos de escritura reales, por lo que sus capacidades se clasifican como parciales y no ausentes.

La falta de uso observado sí impide usar datos remotos como prueba de adopción operativa.

---

#### 42. Interpretación de fuentes adyacentes

Las relaciones:

```text
inventory_cost_policies
product_cost_events
internal_price_lists
internal_price_list_items
internal_pos_documents
internal_pos_document_lines
payments.transactions
club.wallet_accounts
club.wallet_ledger
```

no elevan por sí solas ningún módulo NUMERA de `AUSENTE` a `PARCIAL`.

Para modificar la clasificación deberá existir un consumidor o contrato NUMERA materializado y verificable.

---

#### 43. Interpretación de los cuatro sistemas fuente declarados

PULSO, ORIGO, FOGO y NEXO son fuentes canónicas objetivo para hechos operativos.

Como `NUMERA-AUD-003` confirmó:

```text
DECLARED_OPERATIONAL_SOURCE_SYSTEMS = 4
DIRECT_EXTERNAL_SOURCE_SYSTEMS_OBSERVED = 0
```

la declaración de fuente no equivale a integración física actual.

---

#### 44. Eventos e integración

El snapshot actual conserva:

```text
APP_ROUTER_API_ROUTES = 0
DIRECT_EDGE_FUNCTION_INVOCATIONS = 0
NUMERA_PG_CRON_JOBS = 0
NUMERA_REALTIME_SUBSCRIPTIONS_OBSERVED = 0
```

Esto sustenta la ausencia actual de los módulos de conciliación y recepción automática de hechos.

No implica que NUMERA deba usar necesariamente API, cron o Realtime en el diseño final.

---

#### 45. Triggers `numera_*`

Los triggers observados en las cuatro tablas mutables `numera_*` mantienen `updated_at`.

Se congela:

```text
TIMESTAMP_TRIGGER
!=
DOMAIN_EVENT_IMPLEMENTATION
```

Por tanto no elevan `CAP-12.01`, `CAP-12.07` ni `CAP-12.08` a una clasificación superior.

---

#### 46. Diferencia entre PARCIAL y PROTOTIPO

La frontera adoptada es:

```text
PARCIAL
= existe una acción funcional que produce o modifica el resultado empresarial,
  aunque el ciclo objetivo esté incompleto

PROTOTIPO
= existe estructura o visualización aproximada,
  pero falta el flujo funcional esencial del resultado objetivo
```

Aplicación:

- gastos y presupuestos tienen Server Actions reales → `PARCIAL`;
- costos, cierre/reportes y rentabilidad tienen estructuras/proyecciones insuficientes → `PROTOTIPO`.

---

#### 47. Diferencia entre PROTOTIPO y AUSENTE

Una capacidad no pasa a `PROTOTIPO` por tener únicamente datos disponibles en otro dominio.

Debe existir una representación NUMERA identificable relacionada con la capacidad.

Por eso:

- punto de equilibrio permite `CAP-12.09 = PROTOTIPO`;
- `payments.transactions` sin consumidor no permite `CAP-12.03 = PROTOTIPO`;
- datos de caja en PULSO sin consumidor NUMERA no permiten `CAP-12.02 = PROTOTIPO`.

---

#### 48. Por qué no existen módulos completos

Las dos capacidades con escritura real tienen brechas estructurales:

```text
CAP-12.01
-> captura manual != ledger económico integral

CAP-12.11
-> presupuesto simple != presupuesto versionado + forecast + escenarios + aprobación
```

Las tres superficies analíticas no satisfacen sus contratos objetivo.

Los diez módulos restantes carecen de implementación NUMERA suficiente.

Resultado:

```text
COMPLETE_MODULES = 0
```

---

#### 49. Relación con NUMERA-AUD-005

`NUMERA-AUD-005` deberá auditar dentro de módulos `PARCIAL` y `PROTOTIPO`:

- hardcodes;
- datos simulados;
- TODO;
- lógica provisional;
- defaults;
- filtros demo;
- supuestos incrustados;
- valores fijos.

La clasificación actual no decide todavía si esas piezas deben conservarse, corregirse o retirarse.

---

#### 50. Relación con NUMERA-AUD-006

`NUMERA-AUD-006` conserva la auditoría de:

- reportes;
- indicadores;
- agregados;
- conciliación;
- fuente de verdad.

Que `/break-even`, `/profitability` o `/` sean `PROTOTIPO` no sustituye esa auditoría.

---

#### 51. Relación con NUMERA-AUD-007

`NUMERA-AUD-007` conserva la detección de registros manuales duplicados frente a otros dominios.

En particular:

```text
createExpense
source_app = numera
```

se registra como evidencia de captura manual, no como duplicación confirmada.

---

#### 52. Relación con NUMERA-AUD-008

`NUMERA-AUD-008` conserva la auditoría matemática y de fuentes de:

- costos;
- margen;
- rentabilidad;
- punto de equilibrio.

La etiqueta `PROTOTIPO` de `CAP-12.09` y `CAP-12.15` no valida ni invalida todavía sus fórmulas.

---

#### 53. Relación con NUMERA-AUD-009

`NUMERA-AUD-009` conserva la auditoría de:

- gastos;
- centros de costo;
- cierres;
- aprobaciones.

La clasificación `PARCIAL` o `PROTOTIPO` no constituye aprobación del workflow vigente.

---

#### 54. Relación con NUMERA-AUD-010

`NUMERA-AUD-010` conserva:

- exportaciones;
- información sensible;
- trazabilidad.

La ausencia actual de exportación financiera observada no se resuelve en esta tarea.

---

#### 55. Relación con NUMERA-AUD-011

`NUMERA-AUD-011` conserva la ejecución de:

- build;
- lint;
- tipos;
- pruebas existentes.

La clasificación funcional no declara PASS de calidad de código.

---

#### 56. Relación con NUMERA-AUD-012

`NUMERA-AUD-012` conservará la matriz final:

```text
CAPACIDAD FINANCIERA
×
IMPLEMENTACION ACTUAL
```

`NUMERA-AUD-004` entrega una clasificación intermedia verificable, pero no sustituye la matriz final después de las auditorías 005–011.

---

#### 57. Hallazgos nuevos o ampliados

| Hallazgo | Bloquea esta clasificación | Propietario | Condición de salida |
| --- | --- | --- | --- |
| ninguna de las 15 capacidades financieras alcanza `COMPLETO` | no | `NUMERA-AUD-012` + dominios/UX propietarios | matriz final confirma cobertura después de 005–011 y diseño posterior |
| `CAP-12.01` es parcial por captura manual sin ingestión canónica | no | `NUMERA-AUD-007`, `NUMERA-DOM-002..005`, integración propietaria | fuente, identidad, idempotencia y no duplicación reconciliadas |
| `CAP-12.11` es parcial pese a cero presupuestos observados porque existe flujo real de escritura | no | `NUMERA-AUD-005`, `NUMERA-AUD-009`, `NUMERA-DOM-006`, `NUMERA-DOM-011` | versiones, aprobación, forecast y escenarios definidos |
| equilibrio y rentabilidad son prototipos, no módulos completos de costos/rentabilidad | no | `NUMERA-AUD-008`, `NUMERA-DOM-007`, `NUMERA-DOM-008`, `NUMERA-UX-022` | fórmulas, fuentes y dimensiones trazables aprobadas |
| estructura de periodos no materializa cierre integral | no | `NUMERA-AUD-009`, `NUMERA-DOM-011`, `NUMERA-UX-011`, `NUMERA-UX-023` | cierre, bloqueo, evento tardío, reapertura y evidencia definidos |
| diez capacidades objetivo no tienen módulo NUMERA suficiente | no | tareas `NUMERA-DOM-*`, `NUMERA-AUTH-*`, `NUMERA-UX-*` propietarias | cada capacidad recibe diseño e implementación posterior sin inventar cobertura actual |
| acceso, navegación y contexto compartidos no deben contarse como módulos financieros completos | no | tareas de autorización/SHELL/navegación | conservar frontera transversal |
| fuentes económicas adyacentes no consumidas no elevan la cobertura de NUMERA | no | `NUMERA-AUD-006..009` + integración propietaria | consumidor y contrato trazable existentes |

---

#### 58. Destino de los diez módulos ausentes

| Capacidad | Propietarios canónicos principales |
| --- | --- |
| `CAP-12.02` | `NUMERA-DOM-009`, `NUMERA-UX-017`, `NUMERA-UX-021` |
| `CAP-12.03` | `NUMERA-DOM-009`, `NUMERA-AUTH-002`, `NUMERA-AUTH-008`, `NUMERA-AUTH-014`, integraciones externas aplicables |
| `CAP-12.04` | `NUMERA-DOM-016`, `NUMERA-UX-026`, autorización aplicable |
| `CAP-12.05` | `NUMERA-DOM-010`, `NUMERA-UX-020`, `NUMERA-AUTH-005` |
| `CAP-12.06` | `NUMERA-DOM-013`, `NUMERA-UX-027`, integración fiscal aplicable |
| `CAP-12.07` | `NUMERA-DOM-002`, `NUMERA-UX-017`, integraciones POS/ventas aplicables |
| `CAP-12.08` | `NUMERA-DOM-003`, `NUMERA-UX-018`, integración ORIGO/NEXO aplicable |
| `CAP-12.10` | `OPS-CST-001`, `NUMERA-DOM-007`, `NUMERA-UX-022` |
| `CAP-12.12` | `NUMERA-DOM-009`, `NUMERA-DOM-010`, `NUMERA-UX-020`, `NUMERA-UX-021` |
| `CAP-12.13` | `NUMERA-DOM-013`, `NUMERA-UX-027`, integración fiscal/contable aplicable |

No se crean tareas nuevas.

---

#### 59. Resultado material de la clasificación

La aplicación actual se resume como:

```text
CAPTURA MANUAL DE GASTO
        = PARCIAL

PRESUPUESTO SIMPLE POR CENTRO/PERIODO
        = PARCIAL

EQUILIBRIO / COSTO APROXIMADO
        = PROTOTIPO

PERIODOS + REPORTES SIN CIERRE
        = PROTOTIPO

RENTABILIDAD CON INGRESO ESPERADO
        = PROTOTIPO

RESTANTES DIEZ CAPACIDADES CAP-12
        = AUSENTES EN NUMERA
```

---

#### 60. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea clasifica evidencia AS-IS contra capacidades y requisitos ya aprobados. No introduce comportamiento ejecutable, regla de negocio, transición, cálculo, autorización, contrato de integración o expectativa de prueba nueva.

---

#### 61. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificar:

- `TREQ-NUMERA-001` a `TREQ-NUMERA-004` para hechos económicos, cartera/obligaciones, costos, presupuestos y rentabilidad objetivo;
- `TREQ-NUMERA-005` a `TREQ-NUMERA-024` para inventario de rutas, acceso, Server Actions, navegación y drift;
- requisitos de integración, autorización y Supabase ya vinculados por el Registro 04A vigente.

Esta sección es trazabilidad y no constituye actualización del registro.

---

#### 62. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | la ejecución de build está reservada a `NUMERA-AUD-011` |
| LOCAL | `NOT_EXECUTED` | no se ejecutó el checkout local del usuario durante esta clasificación documental |
| REMOTA | `PASS` | repositorio `vento-numera/main`, fuentes canónicas GitHub y consultas Supabase de solo lectura contrastadas |
| OPERATIVA | `NOT_EXECUTED` | no se registraron gastos, presupuestos, cierres, pagos, conciliaciones ni movimientos reales |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE` |

---

#### 63. Decisiones congeladas

1. El universo de clasificación contiene exactamente 15 capacidades `CAP-12.01..CAP-12.15`.
2. Las superficies de acceso no crean módulos financieros adicionales.
3. Una tabla, permiso, vista o RPC aislados no prueban módulo completo.
4. Una fuente en otra aplicación no prueba módulo NUMERA presente.
5. `COMPLETE_MODULES = 0`.
6. `PARTIAL_MODULES = 2`.
7. `PROTOTYPE_MODULES = 3`.
8. `ABSENT_MODULES = 10`.
9. `CAP-12.01` y `CAP-12.11` son parciales.
10. `CAP-12.09`, `CAP-12.14` y `CAP-12.15` son prototipos.
11. Las diez capacidades restantes son ausentes dentro de NUMERA.
12. `/` es una superficie resumen prototipo y no una capacidad nueva.
13. `/cost-centers` materializa principalmente presupuesto parcial.
14. `/expenses` materializa registro económico parcial.
15. `/break-even` es aproximación prototipo de costos/equilibrio.
16. `/profitability` es aproximación prototipo de rentabilidad.
17. cero filas no equivale a ausencia.
18. estructura sin flujo no equivale a parcialidad.
19. triggers de timestamp no equivalen a eventos económicos.
20. esta tarea no adelanta auditorías 005–012.
21. no se crean requisitos de prueba ni tareas.
22. no se modifica Supabase ni código.

---

#### 64. Criterios de aceptación

`NUMERA-AUD-004` queda documentalmente completa cuando:

- las quince capacidades `CAP-12` aparecen exactamente una vez en la matriz;
- la suma de completos, parciales, prototipos y ausentes es exactamente quince;
- ninguna capacidad se clasifica completa por una tabla, pantalla o permiso aislado;
- los dos módulos parciales conservan flujo de escritura verificable;
- los tres prototipos conservan evidencia técnica concreta;
- los diez ausentes se limitan a ausencia dentro de NUMERA, sin negar fuentes existentes en otros dominios;
- `/login` y `/no-access` permanecen fuera de la matriz financiera;
- las fuentes adyacentes no consumidas no inflan cobertura;
- la clasificación no valida fórmulas reservadas a `NUMERA-AUD-008`;
- la clasificación no valida cierres/aprobaciones reservados a `NUMERA-AUD-009`;
- ningún hallazgo queda sin propietario y condición de salida;
- no se crean ni modifican requisitos de prueba;
- no se realizan cambios físicos;
- `NUMERA-AUD-005` permanece como única continuidad inmediata.

---

#### 65. Límites

Esta tarea no:

- decide si un hardcode es aceptable;
- inventaría todos los TODO;
- determina si existen datos simulados;
- valida fórmulas financieras;
- valida conciliación;
- confirma duplicación manual;
- audita aprobación o segregación;
- valida datos sensibles;
- ejecuta builds o pruebas;
- determina adopción cotidiana;
- declara un módulo listo para producción;
- selecciona proveedor contable, fiscal o bancario;
- define la implementación TO-BE;
- implementa capacidades ausentes;
- rellena tablas vacías;
- publica fuentes o eventos;
- desarrolla `NUMERA-AUD-005`.

---

#### 66. Handoff inmediato a NUMERA-AUD-005

La siguiente tarea recibe como base cerrada:

```text
CANONICAL_FINANCIAL_MODULES = 15
COMPLETE_MODULES = 0
PARTIAL_MODULES = 2
PROTOTYPE_MODULES = 3
ABSENT_MODULES = 10

PARTIAL:
CAP-12.01
CAP-12.11

PROTOTYPE:
CAP-12.09
CAP-12.14
CAP-12.15

ABSENT:
CAP-12.02
CAP-12.03
CAP-12.04
CAP-12.05
CAP-12.06
CAP-12.07
CAP-12.08
CAP-12.10
CAP-12.12
CAP-12.13
```

`NUMERA-AUD-005` deberá auditar datos simulados, hardcodes, TODO y lógica provisional dentro de las superficies actuales sin reabrir esta clasificación salvo evidencia material nueva.

---

#### 67. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-003 — Inventariar tablas, vistas, eventos y sistemas fuente`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional`
### ✅ NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes
**Tarea siguiente:** NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada
**Tipo de tarea:** auditoría documental AS-IS de datos simulados, valores hardcoded, marcadores de deuda explícita y lógica provisional o incompleta en NUMERA, con clasificación y propietario de salida sin corregir código ni absorber las auditorías de conciliación, duplicidad, cálculos, cierres, seguridad o pruebas posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, Supabase, datos, migraciones, tablas, vistas, RPC, permisos, rutas, componentes, cálculos, integraciones, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Cerrar un inventario verificable de cuatro clases de deuda o provisionalidad del NUMERA actual:

```text
DATOS_SIMULADOS_O_DEMOSTRACION
HARDCODES_FUNCIONALES
MARCADORES_TODO_FIXME_HACK
LOGICA_PROVISIONAL_O_INCOMPLETA
```

La tarea distingue hallazgo real de constante legítima, placeholder visual, fallback de configuración o comportamiento reservado a otra auditoría.

---

#### 2. Handoff recibido de NUMERA-AUD-004

La tarea anterior clasificó el universo financiero `CAP-12.01..CAP-12.15` con el resultado:

```text
CANONICAL_FINANCIAL_MODULES = 15
COMPLETE_MODULES = 0
PARTIAL_MODULES = 2
PROTOTYPE_MODULES = 3
ABSENT_MODULES = 10
```

Esta tarea no modifica esa clasificación. Solo explica qué datos, literales o mecanismos provisionales existen dentro del estado AS-IS que sustenta esas categorías.

---

#### 3. Naturaleza y topología

La topología vigente permanece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

No se crea instancia física, no se corrige código, no se eliminan datos demo y no se modifica Supabase.

---

#### 4. Fuentes verificadas

La auditoría consume:

- `NUMERA-AUD-001` a `NUMERA-AUD-003` publicados;
- `NUMERA-AUD-004` aprobado por el usuario como base inmediata;
- archivo propietario `O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`;
- `CAP-SCOPE-012`;
- `CODE-AUD-019`;
- contratos vigentes de autorización, simulación e integración;
- `04A_13_NUMERA.md` sin modificar;
- `vento-numera/main` en commit `c4d50282e30e46d0abb3d871f9604cf913ebbabd`;
- código de páginas, componentes, helpers de autorización, scripts de calidad y navegación;
- estado remoto de solo lectura de Supabase `vento-os-dev` (`clzdpinthhtknkmefsxx`).

---

#### 5. Taxonomía de hallazgos

| Clase | Definición de esta tarea |
| --- | --- |
| `DATA_DEMO` | fila o identidad persistida explícitamente como demo, review o demostración y no como operación ordinaria |
| `HARDCODE_FUNCIONAL` | valor funcional fijado en código que participa en persistencia, identidad, moneda, fuente o decisión y que no proviene de una configuración o contrato dinámico |
| `TODO_MARKER` | marcador explícito `TODO`, `FIXME`, `HACK` o equivalente localizado en código ejecutable o scripts de la aplicación |
| `LOGICA_PROVISIONAL` | mecanismo temporal, simplificado, textual, incompleto o legacy que produce una aproximación y posee un contrato posterior que exige sustitución, endurecimiento o finalización |
| `NO_HALLAZGO` | constante, copy, placeholder, fallback o dato que no cumple las reglas anteriores con la evidencia disponible |

---

#### 6. Resultado cuantitativo

El corte confirmado queda:

```text
DATA_DEMO_IDENTITIES = 1
HARDCODE_FUNCTIONAL_FINDINGS = 3
TODO_FIXME_HACK_MARKERS = 0
PROVISIONAL_LOGIC_FINDINGS = 5
TOTAL_CONFIRMED_FINDINGS = 9
```

Los conteos agrupan hallazgos funcionales; múltiples ocurrencias del mismo literal o patrón no se cuentan como hallazgos independientes si comparten causa y propietario.

---

#### 7. Matriz maestra de hallazgos

| ID | Clase | Superficie | Evidencia | Riesgo / límite | Propietario de salida |
| --- | --- | --- | --- | --- | --- |
| `H-NUMERA-005-001` | `DATA_DEMO` | `public.cost_centers` | fila activa `ADM-APP-REVIEW` / `App Review (Demo)` | una identidad demo existe dentro del maestro compartido y puede contaminar lecturas si un consumidor no la excluye | `CODE-AUD-020`, gobierno de datos y paquete propietario de APP-REVIEW |
| `H-NUMERA-005-002` | `LOGICA_PROVISIONAL` | `/cost-centers` | `isDemoRow()` excluye por texto que contiene `app review` o `demo` | aislamiento dependiente de nombre/código, no de clasificación canónica | autoridad/simulación compartida y migración propietaria |
| `H-NUMERA-005-003` | `LOGICA_PROVISIONAL` | AppShell | exclusión adicional de `app review (demo)` por nombre normalizado | misma identidad demo requiere lógica local duplicada para no aparecer | fundación compartida / catálogo canónico de aplicaciones y contexto |
| `H-NUMERA-005-004` | `HARDCODE_FUNCIONAL` | `createExpense` | `currency: "COP"` | moneda de la escritura manual queda fijada en código | `NUMERA-DOM-*`, `NUMERA-AUD-009` y diseño financiero posterior |
| `H-NUMERA-005-005` | `HARDCODE_FUNCIONAL` | `createExpense` | `source_app: "numera"` | origen se fija como literal para captura manual y no se deriva de contrato de evento | `NUMERA-AUD-007` + integración propietaria |
| `H-NUMERA-005-006` | `HARDCODE_FUNCIONAL` | formatters financieros | `Intl.NumberFormat(... currency: "COP")` en panel, centros, gastos, equilibrio y rentabilidad | presentación monetaria supone COP aun cuando el modelo objetivo exige dimensión de moneda | dominio/UX NUMERA posterior |
| `H-NUMERA-005-007` | `LOGICA_PROVISIONAL` | `upsertBudget` | la action lee `formData.get("notes")`, pero la UI actual no expone un control `name="notes"` | rama de persistencia existente sin entrada alcanzable desde la pantalla observada | `NUMERA-AUD-009` + UX de presupuestos |
| `H-NUMERA-005-008` | `LOGICA_PROVISIONAL` | rentabilidad / equilibrio / panel | superficies dependen de `expected_revenue`, gasto y agregados fundacionales simplificados | la representación está declarada como inicial y no equivale todavía a ingreso realizado ni costo completo | `NUMERA-AUD-008` |
| `H-NUMERA-005-009` | `LOGICA_PROVISIONAL` | role override local | cookie `numera_role_override`, allowlist local de roles privilegiados y lista local de roles simulables | el contrato transversal exige separar simulación de autoridad efectiva y retirar role override legacy | tareas SHELL/AUTH/SIM propietarias, sin corrección dentro de esta auditoría |

---

#### 8. Dato demo confirmado

Supabase contiene una fila activa:

```text
code = ADM-APP-REVIEW
name = App Review (Demo)
type = admin
is_active = true
monthly_budget = 0
current_month_spend = 0
```

La fila se clasifica como `DATA_DEMO` porque su identidad declara explícitamente `Demo` y los contratos canónicos existentes tratan `APP-REVIEW` como dominio aislado de prueba/review.

---

#### 9. Aislamiento actual de APP-REVIEW en centros de costo

`src/app/cost-centers/page.tsx` contiene:

```text
isDemoRow(row)
→ concatena nombre + código
→ lower-case
→ excluye si contiene "app review" o "demo"
```

Esta regla se clasifica como `LOGICA_PROVISIONAL` porque depende de contenido textual mutable para decidir aislamiento.

---

#### 10. Aislamiento duplicado en AppShell

`src/components/vento/standard/vento-shell.tsx` excluye por nombre normalizado:

```text
name !== "app review (demo)"
```

La presencia de dos filtros nominales distintos demuestra que el aislamiento no está expresado mediante una identidad o atributo canónico único dentro de NUMERA.

---

#### 11. Moneda persistida hardcoded

`createExpense` persiste:

```text
currency: "COP"
```

La tarea no concluye que COP sea incorrecto para la operación actual. El hallazgo es que la dimensión de moneda de la escritura está fijada en código y no proviene del registro, entidad legal, configuración financiera o contrato de origen.

---

#### 12. Moneda de presentación hardcoded

Los formatters de `/`, `/cost-centers`, `/expenses`, `/break-even` y `/profitability` usan COP explícito.

Se conserva como un único hallazgo porque comparte causa:

```text
DISPLAY_CURRENCY_SOURCE = CODE_LITERAL
```

La decisión sobre multidivisa, moneda base o conversión queda fuera de esta tarea.

---

#### 13. Origen hardcoded de gasto manual

La action actual persiste:

```text
source_app: "numera"
```

Esto describe correctamente al productor manual observado, pero continúa siendo un literal funcional. La futura recepción de hechos económicos externos no puede reutilizarlo como sustituto de un contrato de origen, correlación e idempotencia.

---

#### 14. Campo `notes` no alcanzable desde la UI observada

`upsertBudget` lee y persiste potencialmente `notes`, pero el formulario visible inspeccionado no contiene un campo `name="notes"`.

Resultado:

```text
SERVER_ACTION_SUPPORTS_NOTES = YES
CURRENT_FORM_EXPOSES_NOTES = NO
```

Se clasifica como lógica incompleta, no como bug probado de negocio.

---

#### 15. Rentabilidad declarada como lectura inicial

La pantalla `/profitability` se describe a sí misma como:

```text
Lectura inicial de ingreso esperado, gasto real y variacion por centro de costo.
```

El valor `expected_revenue` se presenta junto con gasto y presupuesto. La auditoría anterior y `CAP-SCOPE-012` ya establecen que esto no equivale a rentabilidad real completa.

Por tanto se clasifica como `LOGICA_PROVISIONAL` y se transfiere íntegramente a `NUMERA-AUD-008` para auditar fórmula, fuentes y semántica.

---

#### 16. Punto de equilibrio como cálculo provisional

`/break-even` consume `fixed_expenses`, `variable_expenses`, `target_gross_margin_pct` y `break_even_revenue` desde la vista mensual.

Esta tarea solo registra que el cálculo pertenece a la fundación inicial y depende de entradas todavía parciales. No valida ni invalida su fórmula.

Propietario exclusivo de la revisión matemática:

```text
NUMERA-AUD-008
```

---

#### 17. Panel principal como proyección provisional

El panel `/` resume:

- gasto operativo;
- presupuesto;
- ingreso esperado;
- punto de equilibrio.

Su condición provisional deriva de que consolida el modelo económico inicial, no de un error visual. La validez de fuente y conciliación de cada reporte pertenece a `NUMERA-AUD-006`; los cálculos pertenecen a `NUMERA-AUD-008`.

---

#### 18. Role override local

El repositorio mantiene:

```text
ROLE_OVERRIDE_COOKIE = "numera_role_override"
PRIVILEGED_ROLE_OVERRIDES = { propietario, gerente_general }
ROLE_OPTIONS = lista local de roles
```

Y el helper puede evaluar permisos bajo el rol override cuando el rol efectivo pertenece a la allowlist privilegiada.

Se clasifica como `LOGICA_PROVISIONAL` porque el contrato transversal vigente exige reemplazar el role override por simulación separada de la autoridad efectiva.

---

#### 19. El role override no se corrige aquí

Esta auditoría no decide permisos, no cambia cookies, no altera simulación y no implementa una frontera nueva.

El hallazgo se transfiere a las tareas propietarias de:

- fundación compartida;
- autorización;
- simulación;
- migración de consumidores.

NUMERA-AUD-005 solo conserva la evidencia AS-IS.

---

#### 20. Barrido de marcadores TODO / FIXME / HACK

En los archivos de aplicación y scripts inspeccionados no se localizaron marcadores ejecutables:

```text
TODO = 0
FIXME = 0
HACK = 0
```

Esto no demuestra ausencia histórica en commits anteriores ni en artefactos no versionados. Describe exclusivamente el snapshot inspeccionado.

---

#### 21. Términos que no se elevan automáticamente a hallazgo

No se clasifican por sí solos como deuda:

- `placeholder` de inputs;
- fallback visual de iconos;
- fallback de variables de entorno;
- mensajes de error;
- textos de ayuda;
- constantes de nombres de permisos;
- valores de `sort_order` remotos;
- labels de categorías de gasto;
- constantes de unidades no consumidas por la lógica financiera inspeccionada.

La tarea exige efecto funcional verificable antes de registrar un hardcode.

---

#### 22. Fallback de login y host

El helper SSO posee fallback a:

```text
https://os.ventogroup.co/login
numera.ventogroup.co
https
```

No se registra como hallazgo de esta tarea porque funciona como fallback de configuración de entorno y no existe evidencia canónica suficiente para declararlo provisional o incorrecto.

---

#### 23. Categorías de gasto remotas

Supabase contiene siete categorías activas:

```text
rent
payroll
utilities
maintenance
marketing
supplies
other
```

La tarea no las clasifica como simuladas ni hardcoded: son datos persistidos en `numera_expense_categories` y no literales de la UI financiera inspeccionada.

---

#### 24. Periodo remoto observado

El snapshot contiene:

```text
label = 2026-06
status = open
period_month = 2026-06-01
```

La tarea no declara este registro simulado ni inválido. La semántica de periodos, cierre y reapertura pertenece a `NUMERA-AUD-009`.

---

#### 25. Selección del periodo más reciente

Las superficies actuales ordenan `numera_periods` por `period_month` descendente y seleccionan el más reciente en distintos flujos.

Esta tarea registra el patrón como dependencia de la lógica actual, pero no lo clasifica como hallazgo definitivo porque la auditoría de estados, cierres y periodo efectivo pertenece a `NUMERA-AUD-009`.

---

#### 26. `expected_revenue` no es dato simulado por definición

`expected_revenue` es una entrada persistible del presupuesto actual.

No se clasifica como dato simulado únicamente por ser esperado. Su uso para reportes y cálculos sí queda bajo:

```text
NUMERA-AUD-006
NUMERA-AUD-008
```

---

#### 27. Ceros derivados no son datos demo

La vista mensual produce seis filas aunque existan:

```text
numera_expenses = 0
numera_cost_center_budgets = 0
```

Los ceros derivados por `CROSS JOIN` y agregados no se clasifican como datos simulados. Son resultados matemáticos del snapshot vacío.

---

#### 28. Relaciones económicas adyacentes no son fixtures

Las relaciones económicas remotas identificadas por `NUMERA-AUD-003` fuera del consumo actual no se etiquetan como mock, fixture o demo por su sola desconexión.

Su autoridad y conciliación pertenecen a tareas posteriores.

---

#### 29. Separación con NUMERA-AUD-006

`NUMERA-AUD-006` conserva exclusivamente la decisión sobre:

- reportes sin conciliación;
- fuente de verdad aprobada;
- agregados que presentan información sin reconciliación;
- autoridad de cada métrica.

Esta tarea no declara ningún reporte verdadero o falso.

---

#### 30. Separación con NUMERA-AUD-007

`NUMERA-AUD-007` conserva:

- coexistencia de captura manual y fuentes operativas;
- riesgo de duplicar un hecho recibido desde otro dominio;
- reconciliación entre registro manual y productor canónico.

`source_app = numera` se entrega como evidencia, no como decisión de duplicidad.

---

#### 31. Separación con NUMERA-AUD-008

`NUMERA-AUD-008` conserva la revisión matemática de:

- costos;
- margen;
- rentabilidad;
- presupuesto y variación cuando intervienen en esos cálculos;
- punto de equilibrio.

Esta tarea solo etiqueta la implementación actual como provisional cuando el propio alcance canónico exige completar sus entradas o semántica.

---

#### 32. Separación con NUMERA-AUD-009

`NUMERA-AUD-009` conserva:

- gastos;
- centros de costo;
- periodos;
- cierres;
- aprobaciones;
- vigencia y reglas de modificación.

Los hallazgos de moneda y `notes` se transfieren como evidencia, no como resolución de ese dominio.

---

#### 33. Separación con NUMERA-AUD-010

`NUMERA-AUD-010` conserva:

- exportaciones;
- información sensible;
- trazabilidad;
- exposición de datos.

Esta tarea no amplía esa auditoría por la existencia de `source_app`, cookies o contexto de autorización.

---

#### 34. Matriz de destino de hallazgos

| Hallazgo | Bloquea esta auditoría | Destino | Condición de salida |
| --- | --- | --- | --- |
| `H-NUMERA-005-001` | no | gobierno de datos / APP-REVIEW | demo aislado por atributo/identidad canónica o retirado mediante package propietario |
| `H-NUMERA-005-002` | no | contexto/autorización compartida | NUMERA deja de inferir aislamiento por substring de nombre/código |
| `H-NUMERA-005-003` | no | AppShell compartido | catálogo/contexto determina visibilidad sin filtro nominal local |
| `H-NUMERA-005-004` | no | dominio financiero / AUD-009 | moneda de persistencia proviene de dimensión o contrato aprobado |
| `H-NUMERA-005-005` | no | AUD-007 / integración | lineage de origen proviene del contrato del productor y correlación |
| `H-NUMERA-005-006` | no | dominio/UX financiero | moneda mostrada proviene del contexto financiero aprobado |
| `H-NUMERA-005-007` | no | AUD-009 / UX | campo `notes` se expone deliberadamente o se elimina del contrato de action |
| `H-NUMERA-005-008` | no | AUD-008 | cálculo y semántica se validan con entradas canónicas y evidencia de prueba |
| `H-NUMERA-005-009` | no | SHELL/AUTH/SIM | simulación separada reemplaza autoridad local por role override |

No se crea una tarea nueva para ninguno de los hallazgos.

---

#### 35. Resultado de cobertura

La auditoría cubre las cuatro clases solicitadas:

```text
DATOS_SIMULADOS = CONFIRMADOS
HARDCODES = CONFIRMADOS
TODO_FIXME_HACK = NO_LOCALIZADOS_EN_SNAPSHOT
LOGICA_PROVISIONAL = CONFIRMADA
```

Y cada hallazgo confirmado posee superficie, evidencia, límite y propietario de salida.

---

#### 36. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la tarea clasifica deuda y provisionalidad ya existente. No introduce comportamiento, autorización, fórmula, contrato de integración, transición de estado ni mutación nueva.

---

#### 37. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-NUMERA-001` para integración económica y prohibición de doble registro;
- `TREQ-NUMERA-002` para identidad y trazabilidad del hecho económico;
- `TREQ-NUMERA-004` para costos, presupuestos, equilibrio y rentabilidad reproducibles;
- `TREQ-NUMERA-018` para origen explícito en creación de gastos;
- `TREQ-NUMERA-019` y `TREQ-NUMERA-020` para equilibrio y rentabilidad;
- `TREQ-SHELL-086` para autoridad local, role override y bypasses;
- requisitos vigentes de simulación y aislamiento de APP-REVIEW aplicables.

Esta sección es trazabilidad heredada y no modifica 04A.

---

#### 38. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea no ejecuta build del producto; el build integral continúa reservado a `NUMERA-AUD-011`. |
| LOCAL | NOT_EXECUTED | La incorporación y validación estructural contra el checkout del usuario se ejecutarán mediante la batería documental al publicar la tarea. |
| REMOTA | PASS | Se verificaron `main`, continuidad, `vento-numera/main`, código de superficies y helpers, y datos remotos de solo lectura para APP-REVIEW, periodos y categorías. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron gastos, presupuestos, simulación, role override, cálculos ni flujos financieros. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no existen cambios físicos autorizados. |

---

#### 39. Validaciones documentales de coherencia

Se comprueba que:

1. `NUMERA-AUD-004` permanece como predecesora inmediata;
2. `NUMERA-AUD-006` permanece como sucesora inmediata;
3. no se altera la distribución `0 completo / 2 parcial / 3 prototipo / 10 ausente`;
4. los cálculos no se auditan antes de `NUMERA-AUD-008`;
5. los cierres no se auditan antes de `NUMERA-AUD-009`;
6. la conciliación no se audita antes de `NUMERA-AUD-006`;
7. la duplicidad manual no se resuelve antes de `NUMERA-AUD-007`;
8. el role override se reporta como deuda transversal y no se corrige localmente;
9. 04A permanece sin cambios.

---

#### 40. Criterios de aceptación

`NUMERA-AUD-005` queda aceptable cuando:

- las cuatro clases solicitadas tienen resultado explícito;
- todo dato demo confirmado tiene identidad exacta;
- los hardcodes distinguen persistencia, origen y presentación;
- los marcadores TODO/FIXME/HACK tienen conteo explícito;
- la lógica provisional tiene superficie y causa verificable;
- no se confunden placeholders o fallbacks legítimos con deuda funcional;
- cada hallazgo posee propietario y condición de salida;
- no se corrige código ni datos;
- no se adelantan decisiones de `NUMERA-AUD-006..010`;
- no se crean ni modifican requisitos de prueba;
- `NUMERA-AUD-006` permanece como única continuidad inmediata.

---

#### 41. Límites

Esta tarea no demuestra:

- que APP-REVIEW sea el único dato demo histórico del proyecto completo;
- que un literal sea necesariamente incorrecto para producción;
- que COP deba sustituirse por otra moneda;
- que un role override haya sido explotado o usado de forma indebida;
- que la fórmula de equilibrio o rentabilidad sea correcta o incorrecta;
- que un reporte esté conciliado;
- que un registro manual duplique un evento de otro dominio;
- que un periodo abierto deba estar cerrado;
- que la ausencia de `TODO` implique ausencia de deuda técnica.

La auditoría clasifica evidencia observada, no reemplaza las tareas propietarias posteriores.

---

#### 42. Decisiones congeladas

Quedan congeladas para continuidad:

1. `ADM-APP-REVIEW / App Review (Demo)` es dato demo persistido y activo en el snapshot observado;
2. el aislamiento actual de ese dato usa filtros nominales locales y se considera provisional;
3. la captura manual fija `currency = COP` y `source_app = numera`;
4. la presentación monetaria actual fija COP en las principales superficies financieras;
5. `upsertBudget` soporta `notes` sin control visible equivalente en el formulario observado;
6. rentabilidad y equilibrio se mantienen como lógica provisional hasta `NUMERA-AUD-008`;
7. el role override local es deuda legacy transversal, no autoridad canónica futura;
8. no se localizaron `TODO`, `FIXME` o `HACK` en los archivos de aplicación y scripts inspeccionados;
9. no se modifica 04A;
10. la siguiente auditoría debe analizar reportes y fuente de verdad, no reabrir esta taxonomía.

---

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-004 — Identificar módulos completos, parciales, prototipos y ausentes`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada`
### ✅ NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional
**Tarea siguiente:** NUMERA-AUD-007 — Detectar registros manuales duplicados frente a otros dominios
**Tipo de tarea:** auditoría documental AS-IS de reportes, proyecciones y métricas visibles de NUMERA frente a su lineage, periodo, conciliación y fuente de verdad aprobada, sin corregir código ni absorber las auditorías posteriores de duplicidad manual, fórmulas financieras, cierres, exportaciones o pruebas; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, Supabase, datos, periodos, vistas, RPC, fórmulas, integraciones, navegación, permisos, reportes ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Determinar qué superficies actuales de NUMERA presentan información financiera o analítica sin conciliación suficiente o sin una fuente de verdad empresarial completa y aprobada.

La tarea conserva cuatro preguntas separadas:

```text
QUE MUESTRA EL REPORTE
DE DONDE SALE CADA VALOR
QUE HECHO EMPRESARIAL LO RESPALDA
SI EXISTE CONCILIACION QUE CIERRE LA DIFERENCIA
```

---

#### 2. Handoff recibido de NUMERA-AUD-005

La predecesora dejó congelado que:

- `ADM-APP-REVIEW / App Review (Demo)` es un dato demo persistido y activo;
- `currency = "COP"` y `source_app = "numera"` están fijados en la captura manual actual;
- equilibrio y rentabilidad permanecen provisionales hasta `NUMERA-AUD-008`;
- la captura manual no equivale a un hecho operativo externo conciliado;
- no se localizaron marcadores `TODO`, `FIXME` o `HACK` en el snapshot auditado.

Esta tarea no reabre esas decisiones; evalúa su impacto sobre reportes y proyecciones.

---

#### 3. Naturaleza y topología

La topología vigente para `NUMERA-AUD-001..012` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

No se crea instancia física ni se modifica el estado remoto.

---

#### 4. Fuentes verificadas

Se contrastaron:

- `NUMERA-AUD-001` a `NUMERA-AUD-004` publicados;
- `NUMERA-AUD-005` aprobado por el usuario como base inmediata;
- `CAP-SCOPE-012` y sus reglas de propiedad, conciliación y proyección;
- `04A_13_NUMERA.md` sin modificación;
- `vento-numera/main` en commit `c4d50282e30e46d0abb3d871f9604cf913ebbabd`;
- `/`, `/cost-centers`, `/expenses`, `/break-even` y `/profitability`;
- `public.numera_cost_center_monthly_summary`;
- `public.numera_current_period_summary()`;
- snapshot remoto de solo lectura de Supabase `vento-os-dev` (`clzdpinthhtknkmefsxx`) con fecha de base `2026-09-26`.

---

#### 5. Regla canónica de lectura

Se conserva la regla aprobada:

```text
UN REPORTE ES UNA PROYECCION
UN REPORTE NO ES FUENTE DE VERDAD
UN AGREGADO NO SE CORRIGE COMO SI FUERA EL HECHO ORIGEN
```

La fuente operativa conserva el hecho y NUMERA debe consumirlo, reconocer su efecto económico y conciliarlo sin recrear el objeto operacional.

---

#### 6. Definiciones de esta auditoría

| Estado | Definición |
| --- | --- |
| `RECONCILIADO` | el valor puede navegar a hechos fuente, diferencias y resolución suficientes para sostener el significado mostrado |
| `NO_RECONCILIADO` | existe proyección o agregado, pero no un cierre demostrado contra las fuentes empresariales requeridas |
| `FUENTE_COMPLETA_APROBADA` | el significado mostrado descansa sobre fuentes propietarias aprobadas y cobertura suficiente |
| `FUENTE_INTERNA_PARCIAL` | existe persistencia NUMERA válida para el dato capturado, pero no demuestra la totalidad del hecho empresarial |
| `SIN_FUENTE_COMPLETA_APROBADA` | la proyección carece de cobertura suficiente para presentarse como verdad empresarial completa |
| `AUSENCIA_CONVERTIDA_EN_CERO` | no existe dato o periodo aplicable, pero la UI presenta cero mediante fallback |
| `ALCANCE_TEMPORAL_NO_ACOTADO` | la consulta puede mezclar periodos porque no restringe explícitamente el periodo mostrado |

---

#### 7. Universo de superficies de reporte

Se materializa el siguiente universo:

```text
REPORT_SURFACES = 4
```

1. `RPT-NUMERA-001` — `/` — panel de inteligencia económica operativa;
2. `RPT-NUMERA-002` — `/cost-centers` — modelo económico por centro de costo;
3. `RPT-NUMERA-003` — `/break-even` — punto de equilibrio;
4. `RPT-NUMERA-004` — `/profitability` — lectura de rentabilidad.

---

#### 8. Superficies excluidas del conteo de reportes

`/expenses` se conserva como lista transaccional y superficie de captura manual. Es una fuente de entrada para reportes, no un reporte financiero completo por sí misma.

`/login` y `/no-access` son superficies técnicas de acceso.

---

#### 9. Resultado ejecutivo

El corte produce:

```text
REPORT_SURFACES = 4
FULLY_RECONCILED_REPORTS = 0
REPORTS_WITH_COMPLETE_APPROVED_SOURCE_OF_TRUTH = 0
REPORTS_WITH_PARTIAL_INTERNAL_SOURCE = 4
REPORTS_WITH_PERIOD_SCOPE_FINDING = 4
REPORTS_EXPOSED_TO_DEMO_DATA = 3
CURRENT_ROOT_ZERO_FALLBACK = YES
```

`REPORTS_EXPOSED_TO_DEMO_DATA = 3` incluye el panel raíz por lineage potencial de su RPC y las dos tablas que hoy no excluyen el centro demo. El panel raíz no materializa actualmente esa fila porque no existe periodo del mes corriente.

---

#### 10. Matriz canónica de reportes

| ID | Superficie | Fuente técnica inmediata | Conciliación actual | Fuente empresarial completa | Estado |
| --- | --- | --- | --- | --- | --- |
| `RPT-NUMERA-001` | `/` | `numera_current_period_summary()` | no demostrada | no | `NO_RECONCILIADO / SIN_FUENTE_COMPLETA_APROBADA` |
| `RPT-NUMERA-002` | `/cost-centers` | `numera_cost_center_monthly_summary` | no demostrada | no | `NO_RECONCILIADO / FUENTE_INTERNA_PARCIAL` |
| `RPT-NUMERA-003` | `/break-even` | `numera_cost_center_monthly_summary` | no demostrada | no | `NO_RECONCILIADO / SIN_FUENTE_COMPLETA_APROBADA` |
| `RPT-NUMERA-004` | `/profitability` | `numera_cost_center_monthly_summary` | no demostrada | no | `NO_RECONCILIADO / SIN_FUENTE_COMPLETA_APROBADA` |

---

#### 11. Lineage del panel raíz

La cadena observada es:

```text
/
-> numera_current_period_summary()
-> numera_cost_center_monthly_summary
-> numera_periods
-> cost_centers
-> numera_cost_center_budgets
-> numera_expenses
-> numera_expense_categories
```

El panel muestra `Gasto operativo`, `Presupuesto`, `Ingreso esperado` y `Punto de equilibrio`.

---

#### 12. Ausencia de periodo convertida en cero

El estado remoto verificado es:

```text
DB_CURRENT_DATE = 2026-09-26
CURRENT_MONTH = 2026-09-01
NUMERA_PERIOD_ROWS = 1
CURRENT_MONTH_PERIOD_ROWS = 0
CURRENT_SUMMARY_ROWS = 0
```

El único periodo observado es `2026-06`.

La página raíz toma la primera fila del RPC o `null`; sus formatters convierten `null` o ausencia en `0`. Por tanto, en el corte actual la ausencia de un periodo de septiembre puede presentarse visualmente como cero para gasto, presupuesto, ingreso esperado y equilibrio.

Clasificación:

```text
RPT-NUMERA-001 = AUSENCIA_CONVERTIDA_EN_CERO
```

Cero económico y ausencia de periodo no son equivalentes.

---

#### 13. Semántica temporal divergente del panel raíz

`numera_current_period_summary()` exige que `period_month` sea exactamente el mes calendario de `current_date`.

Las otras superficies no utilizan esa misma regla. Por tanto, NUMERA no conserva hoy una única semántica temporal compartida para “periodo actual”.

---

#### 14. Lineage de `/cost-centers`

La superficie consulta:

- el último registro de `numera_periods` por `period_month` para `currentPeriod`;
- toda la vista `numera_cost_center_monthly_summary` sin filtro de periodo.

La UI denomina al registro seleccionado `Periodo activo`, pero los rows y agregados no están restringidos a ese `currentPeriod`.

---

#### 15. Alcance temporal no acotado en `/cost-centers`

La consulta a la vista no aplica `.eq(period_id, currentPeriod.id)` ni una condición equivalente.

Con un solo periodo remoto el defecto no mezcla filas todavía. Con más de un periodo, `totalBudget`, `totalExpectedRevenue`, `totalBreakEven`, `actual_expenses` y `budget_variance` podrían agregar varias ventanas temporales mientras la cabecera muestra un único `Periodo activo`.

Clasificación:

```text
RPT-NUMERA-002 = ALCANCE_TEMPORAL_NO_ACOTADO
```

---

#### 16. Lineage de `/break-even`

La superficie lee directamente:

```text
numera_cost_center_monthly_summary
-> fixed_expenses
-> variable_expenses
-> target_gross_margin_pct
-> break_even_revenue
```

No existe filtro de periodo en la consulta de la página.

---

#### 17. Fuente de verdad de punto de equilibrio

La vista calcula `break_even_revenue` desde gasto fijo agregado y margen objetivo almacenado en presupuesto.

Esta tarea no juzga la fórmula; esa responsabilidad queda en `NUMERA-AUD-008`.

Sí se concluye que los inputs actuales no están conciliados con PULSO, ORIGO, FOGO y NEXO y que el margen objetivo no constituye ingreso realizado ni costo completo.

Clasificación:

```text
RPT-NUMERA-003 = NO_RECONCILIADO
RPT-NUMERA-003 = SIN_FUENTE_COMPLETA_APROBADA
RPT-NUMERA-003 = ALCANCE_TEMPORAL_NO_ACOTADO
```

---

#### 18. Lineage de `/profitability`

La superficie lee:

```text
expected_revenue
actual_expenses
budget_amount
budget_variance
```

desde `numera_cost_center_monthly_summary` y no aplica filtro de periodo.

---

#### 19. Semántica actual de rentabilidad

La UI denomina la superficie `Rentabilidad`, pero el contenido visible se limita a ingreso esperado, gasto registrado, presupuesto y variación por centro de costo.

No consume ingreso realizado, costo completo trazable, producto, línea, cliente, pedido o canal.

La decisión canónica ya establece que la rentabilidad real deberá utilizar ingreso realizado y costo trazable.

Clasificación:

```text
RPT-NUMERA-004 = NO_RECONCILIADO
RPT-NUMERA-004 = SIN_FUENTE_COMPLETA_APROBADA
RPT-NUMERA-004 = ALCANCE_TEMPORAL_NO_ACOTADO
```

---

#### 20. Sobrepromesa de cobertura en el acceso a rentabilidad

El panel raíz describe `/profitability` como:

```text
Margen por producto, linea, sede y canal.
```

La implementación observada de `/profitability` solo presenta filas por centro de costo con ingreso esperado, gasto, presupuesto y variación.

No existe evidencia en esa superficie de margen por producto, línea o canal.

---

#### 21. `/expenses` como fuente interna parcial

La lista de gastos consume `numera_expenses` y la Server Action actual escribe manualmente en esa tabla.

Esto permite afirmar:

```text
SOURCE_FOR_RECORDED_MANUAL_EXPENSE_ROWS = numera_expenses
```

No permite afirmar:

```text
numera_expenses = COMPLETE_ENTERPRISE_EXPENSE_TRUTH
```

La conciliación de gastos con compras, inventario, producción, caja, bancos u otros dominios no está materializada en el repositorio actual.

---

#### 22. Fuente interna de presupuestos

`numera_cost_center_budgets` es la persistencia actual de presupuesto, ingreso esperado y margen objetivo del modelo manual.

La fuente es técnicamente definida para esos registros, pero el contrato aprobado exige versiones, escenarios, aprobación y forecast separados. La persistencia actual no demuestra ese workflow completo.

---

#### 23. La vista mensual es una proyección

`numera_cost_center_monthly_summary`:

- cruza periodos con centros de costo activos;
- incorpora presupuesto cuando existe;
- suma gastos capturados;
- clasifica gastos por categoría;
- calcula variación;
- deriva equilibrio.

Por diseño es una proyección derivada y no debe elevarse a fuente de verdad primaria.

---

#### 24. El RPC de periodo actual es una segunda proyección

`numera_current_period_summary()` agrega la vista mensual para el mes calendario actual.

La cadena es:

```text
HECHOS / OBJETIVOS CAPTURADOS
-> VISTA MENSUAL
-> RPC AGREGADO
-> DASHBOARD
```

Cada nivel posterior conserva dependencia de la calidad y cobertura de las entradas anteriores.

---

#### 25. Estado remoto de las entradas

El snapshot remoto confirma:

```text
PERIODS = 1
EXPENSES = 0
BUDGETS = 0
MONTHLY_SUMMARY_ROWS = 6
```

Las seis filas de resumen existen por el cruce estructural entre el periodo `2026-06` y los seis centros de costo activos; no prueban actividad financiera.

---

#### 26. Cero derivado no equivale a hecho confirmado

En las seis filas remotas observadas:

```text
budget_amount = 0
expected_revenue = 0
actual_expenses = 0
fixed_expenses = 0
variable_expenses = 0
one_time_expenses = 0
budget_variance = 0
break_even_revenue = null
```

Esos valores describen ausencia de entradas registradas en la fundación actual. No certifican que el negocio haya tenido cero presupuesto, cero ventas, cero gastos o equilibrio cero.

---

#### 27. Inconsistencia de aislamiento del dato demo

`/cost-centers` filtra filas cuyo nombre o código contenga `app review` o `demo`.

`/break-even` y `/profitability` no aplican ese filtro y consumen directamente la vista completa.

El snapshot de la vista contiene:

```text
ADM-APP-REVIEW / App Review (Demo)
```

Por tanto las dos tablas analíticas pueden presentar una fila demo que la superficie de centros de costo oculta.

---

#### 28. Exposición potencial del dato demo en el panel raíz

`numera_current_period_summary()` agrega todos los centros activos de la vista y no excluye `ADM-APP-REVIEW`.

En el corte actual no existe fila del mes corriente, por lo que el panel raíz no materializa la contaminación. Si se crea un periodo corriente manteniendo ese centro activo, el agregado incluiría el centro demo salvo otra regla no observada.

Clasificación:

```text
ROOT_DEMO_EXPOSURE = POTENTIAL_BY_CURRENT_LINEAGE
```

---

#### 29. Fuentes empresariales aprobadas por dominio

La propiedad objetivo vigente separa:

```text
PULSO -> venta, pago y caja
ORIGO -> compra y recepción empresarial
NEXO -> inventario, logística y efectos físicos
FOGO -> producción, consumo, rendimiento y merma
ANIMA -> hechos laborales autorizados
PASS -> cliente, pedidos, fidelización y pagos de canal
NUMERA -> hecho económico, conciliación, costo, cartera, cierre y analítica financiera
```

NUMERA consume sin recrear los objetos operativos propietarios.

---

#### 30. Conciliación actual con fuentes operativas

`NUMERA-AUD-003` ya confirmó que el snapshot de `vento-numera` no contiene consumidor físico identificado de PULSO, ORIGO, FOGO o NEXO.

Por tanto:

```text
PULSO_RECONCILIATION = NOT_IMPLEMENTED_IN_CURRENT_NUMERA
ORIGO_RECONCILIATION = NOT_IMPLEMENTED_IN_CURRENT_NUMERA
FOGO_RECONCILIATION = NOT_IMPLEMENTED_IN_CURRENT_NUMERA
NEXO_RECONCILIATION = NOT_IMPLEMENTED_IN_CURRENT_NUMERA
```

Los cuatro reportes permanecen fuera de una conciliación empresarial de extremo a extremo demostrada.

---

#### 31. Relaciones económicas adyacentes

El proyecto remoto contiene relaciones económicas adicionales como políticas/eventos de costo, listas internas de precio, documentos POS, transacciones y ledgers de wallet.

Su existencia no las convierte automáticamente en fuente aprobada de los reportes actuales porque `vento-numera` no las consume y el contrato de ownership no autoriza enlazarlas por inferencia.

---

#### 32. Matriz de métricas visibles y fuente actual

| Métrica | Fuente actual | Tipo de dato | Fuente completa aprobada hoy |
| --- | --- | --- | --- |
| gasto operativo / gasto real | `numera_expenses` agregado | captura manual interna | no |
| presupuesto | `numera_cost_center_budgets` | objetivo manual interno | no como workflow completo |
| ingreso esperado | `numera_cost_center_budgets` | expectativa manual | no es ingreso realizado |
| variación | presupuesto menos gasto agregado | derivado | no |
| gasto fijo / variable / one-time | gastos + categoría | derivado de captura manual | no |
| punto de equilibrio | gasto fijo + margen objetivo | derivado | no |
| rentabilidad mostrada | ingreso esperado + gasto + presupuesto | proyección simplificada | no |

---

#### 33. Hallazgos confirmados

| ID | Hallazgo | Severidad documental | Propietario de salida |
| --- | --- | --- | --- |
| `H-NUMERA-006-001` | el panel raíz convierte ausencia de periodo corriente en valores cero | crítica | `NUMERA-UX-014`, `NUMERA-UX-024`, `NUMERA-DOM-011` |
| `H-NUMERA-006-002` | las superficies no comparten una semántica temporal única de periodo actual | alta | `NUMERA-DOM-011`, `NUMERA-UX-023`, `NUMERA-UX-024` |
| `H-NUMERA-006-003` | `/cost-centers` etiqueta un periodo como activo pero consulta la vista sin acotar rows a ese periodo | crítica | `NUMERA-UX-010`, `NUMERA-DOM-006`, `NUMERA-DOM-011` |
| `H-NUMERA-006-004` | `/break-even` consulta todos los periodos sin dimensión temporal visible | crítica | `NUMERA-AUD-008`, `NUMERA-UX-019`, `NUMERA-DOM-007` |
| `H-NUMERA-006-005` | `/profitability` consulta todos los periodos sin dimensión temporal visible | crítica | `NUMERA-AUD-008`, `NUMERA-UX-022`, `NUMERA-DOM-008` |
| `H-NUMERA-006-006` | ningún reporte actual demuestra conciliación con PULSO, ORIGO, FOGO y NEXO | crítica | `NUMERA-DOM-002..004`, `NUMERA-UX-014`, integraciones propietarias |
| `H-NUMERA-006-007` | `expected_revenue` es entrada manual y se usa en superficies analíticas sin ser ingreso realizado | alta | `NUMERA-AUD-008`, `NUMERA-DOM-008`, `NUMERA-UX-022` |
| `H-NUMERA-006-008` | `actual_expenses` representa gastos capturados en NUMERA, no gasto empresarial completo reconciliado | crítica | `NUMERA-AUD-007`, `NUMERA-AUD-009`, `NUMERA-DOM-005` |
| `H-NUMERA-006-009` | la tarjeta de rentabilidad promete producto, línea, sede y canal, pero la página observada solo trabaja por centro de costo | alta | `NUMERA-DOM-008`, `NUMERA-UX-022`, `NUMERA-UX-028` |
| `H-NUMERA-006-010` | `/break-even` y `/profitability` exponen el centro demo que `/cost-centers` filtra | alta | `NUMERA-UX-019`, `NUMERA-UX-022`, gobierno de APP-REVIEW |
| `H-NUMERA-006-011` | el RPC raíz incorporaría el centro demo al agregado de un periodo corriente mientras siga activo | alta | `NUMERA-UX-014`, `NUMERA-DOM-006`, gobierno de APP-REVIEW |
| `H-NUMERA-006-012` | la UI de centros de costo anuncia remisiones valorizadas NEXO como fuente futura aunque no existe consumidor físico actual | media | integración NEXO→NUMERA y `NUMERA-DOM-007` |

---

#### 34. Condiciones de salida de los hallazgos

Un hallazgo de esta tarea solo podrá cerrarse cuando su tarea propietaria demuestre, según corresponda:

- periodo explícito y consistente;
- diferencia entre `sin dato` y `0`;
- fuente propietaria identificable;
- ingestión idempotente;
- conciliación y resolución de diferencias;
- exclusión canónica de datos demo;
- métricas con significado igual al mostrado;
- navegación desde agregado hasta entradas y hechos fuente.

---

#### 35. Límite con NUMERA-AUD-007

Esta tarea detecta que `actual_expenses` proviene de captura manual y no constituye verdad económica completa.

No decide todavía si una fila manual duplica una compra, recepción, producción, pago, venta u otro hecho. Esa decisión pertenece exclusivamente a `NUMERA-AUD-007`.

---

#### 36. Límite con NUMERA-AUD-008

Esta tarea registra el lineage de `break_even_revenue`, variación y rentabilidad para juzgar sus fuentes.

No certifica ni refuta la fórmula matemática, método de costo, margen, drivers o punto de equilibrio. Ese análisis pertenece a `NUMERA-AUD-008`.

---

#### 37. Límite con NUMERA-AUD-009

Esta tarea identifica que periodos, gastos y presupuestos alimentan reportes sin cierre integral demostrado.

No audita workflows de aprobación, cierre, reapertura, anulación o soporte. Esa responsabilidad pertenece a `NUMERA-AUD-009`.

---

#### 38. Límite con NUMERA-AUD-010

Esta tarea no evalúa exportaciones, minimización, sensibilidad, custodia o trazabilidad de archivos/reportes fuera de la aplicación. Ese alcance permanece en `NUMERA-AUD-010`.

---

#### 39. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: los hallazgos están cubiertos por obligaciones de prueba vigentes sobre conciliación, lineage, reportes, equilibrio, rentabilidad y periodos. Esta auditoría materializa evidencia AS-IS y no crea comportamiento nuevo.

---

#### 40. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-NUMERA-001` para reconciliación de indicador, costo, margen, gasto, cierre, saldo o reporte con hechos y documentos fuente;
- `TREQ-NUMERA-002` para identidad, fuente, correlación y prohibición de tratar agregados como fuente;
- `TREQ-NUMERA-004` para fuente, entradas y trazabilidad de costo, presupuesto, equilibrio y rentabilidad;
- `TREQ-NUMERA-019` para evitar presentar ausencia de margen o cálculo como valor económico confirmado;
- `TREQ-NUMERA-020` para conservar separados ingreso esperado, gasto real, presupuesto y variación;
- `TREQ-NUMERA-024` para delta explícito frente al baseline técnico aprobado.

Esta sección es trazabilidad heredada y no actualiza 04A.

---

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build del producto permanece reservado a `NUMERA-AUD-011`. |
| LOCAL | NOT_EXECUTED | La incorporación y la batería estructural contra el checkout del usuario se ejecutarán al publicar la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, `vento-numera/main`, las cuatro superficies de reporte, la vista, el RPC y el snapshot Supabase de solo lectura. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron cierres, gastos, presupuestos, ventas, compras, conciliaciones ni flujos financieros. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no hay materialización física autorizada. |

---

#### 42. Validaciones documentales de coherencia

Se comprueba que:

1. `NUMERA-AUD-005` permanece como predecesora inmediata;
2. `NUMERA-AUD-007` permanece como sucesora inmediata;
3. el universo de reportes queda fijado en cuatro superficies;
4. `/expenses` se conserva como fuente/lista transaccional, no se infla como reporte independiente;
5. conciliación y fuente de verdad se analizan sin resolver duplicidad manual;
6. las fórmulas se transfieren intactas a `NUMERA-AUD-008`;
7. cierres y aprobaciones permanecen en `NUMERA-AUD-009`;
8. exportaciones y sensibilidad permanecen en `NUMERA-AUD-010`;
9. no se crean ni modifican requisitos de prueba.

---

#### 43. Criterios de aceptación

`NUMERA-AUD-006` queda aceptable cuando:

- todas las superficies actuales de reporte tienen identidad estable;
- cada superficie tiene lineage técnico inmediato;
- conciliación y fuente completa se clasifican por separado;
- ausencia de periodo y valor cero no se confunden;
- el alcance temporal de cada consulta queda documentado;
- el dato demo tiene impacto explícito por reporte;
- `expected_revenue`, `actual_expenses`, presupuesto, variación, equilibrio y rentabilidad tienen fuente actual declarada;
- la propiedad de PULSO, ORIGO, NEXO, FOGO, ANIMA, PASS y NUMERA no se altera;
- cada hallazgo tiene propietario y condición de salida;
- no se corrigen fórmulas, código, datos ni integraciones;
- no se crean ni modifican requisitos de prueba;
- `NUMERA-AUD-007` queda como única continuidad inmediata.

---

#### 44. Límites

Esta tarea no demuestra:

- que un valor mostrado sea contablemente correcto;
- que toda venta, compra, inventario, producción o nómina deba entrar en un mismo reporte;
- que una fuente adyacente sea automáticamente la fuente canónica futura;
- que `0` sea incorrecto cuando exista un hecho confirmado con valor cero;
- que la fórmula de equilibrio sea correcta o incorrecta;
- que la rentabilidad deba usar una fórmula específica distinta de la definida posteriormente;
- que exista una duplicidad manual concreta;
- que un periodo de junio deba cerrarse o eliminarse;
- que APP-REVIEW deba borrarse físicamente;
- que un reporte deba exportarse.

---

#### 45. Decisiones congeladas

Quedan congeladas para continuidad:

1. existen cuatro superficies actuales de reporte/proyección financiera en NUMERA;
2. ninguna demuestra conciliación integral con los cuatro dominios operativos objetivo;
3. ninguna constituye por sí sola fuente de verdad empresarial completa;
4. el panel raíz convierte ausencia de periodo corriente en ceros visibles;
5. la semántica temporal del panel raíz difiere de las otras superficies;
6. `/cost-centers`, `/break-even` y `/profitability` consultan la vista sin filtro de periodo;
7. `/break-even` y `/profitability` incluyen actualmente la fila `App Review (Demo)`;
8. el RPC raíz también incluiría ese centro activo cuando exista periodo corriente;
9. `actual_expenses` es verdad técnica de las filas manuales capturadas, no verdad económica empresarial completa;
10. `expected_revenue` es expectativa manual, no ingreso realizado;
11. rentabilidad y equilibrio conservan sus fórmulas sin juicio hasta `NUMERA-AUD-008`;
12. 04A permanece sin cambios.

---

#### 46. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-005 — Detectar datos simulados, hardcodes, TODO y lógica provisional`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-007 — Detectar registros manuales duplicados frente a otros dominios`
### ✅ NUMERA-AUD-007 — Detectar registros manuales duplicados frente a otros dominios

**Estado:** APROBADA
**Tarea anterior:** NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada
**Tarea siguiente:** NUMERA-AUD-008 — Auditar cálculos de costos, margen, rentabilidad y punto de equilibrio
**Tipo de tarea:** auditoría documental AS-IS de la captura manual de NUMERA frente a hechos, eventos y soportes cuyo origen pertenece a otros dominios o autoridades, distinguiendo duplicidad confirmada, riesgo estructural de duplicidad, captura manual legítima y datos de planificación, sin corregir código ni absorber las auditorías posteriores de fórmulas, cierres, aprobaciones, exportaciones o trazabilidad; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE O — NUMERA
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/O_NUMERA/01_AUDITORIA_FUNCIONAL_Y_TECNICA_DE_NUMERA.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-numera`, Supabase, datos, gastos, compras, inventario, pagos, producción, asistencia, presupuestos, integraciones, permisos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Determinar si la captura manual vigente de NUMERA puede representar nuevamente hechos cuyo origen pertenece a PULSO, ORIGO, NEXO, FOGO, ANIMA u otra autoridad, y distinguir ese riesgo de las capturas que sí pueden permanecer manuales mientras no exista otra fuente canónica disponible.

La tarea separa cuatro estados:

```text
DUPLICADO_CONFIRMADO
RIESGO_DE_DUPLICIDAD_ABIERTO
CAPTURA_MANUAL_LEGITIMA
DATO_DE_PLANIFICACION_NO_TRANSACCIONAL
```

---

#### 2. Handoff recibido de NUMERA-AUD-006

La predecesora dejó congelado que:

- `actual_expenses` proviene de `numera_expenses` y representa únicamente las filas capturadas en NUMERA;
- esa captura no constituye verdad económica empresarial completa;
- PULSO, ORIGO, FOGO y NEXO no tienen hoy un consumidor económico físico identificado dentro de `vento-numera`;
- los reportes actuales no demuestran conciliación integral con los dominios operativos;
- la decisión sobre si una fila manual duplica un hecho externo quedó reservada expresamente a esta tarea.

Esta tarea consume ese handoff sin reabrir la auditoría de reportes.

---

#### 3. Naturaleza y topología

La topología vigente para `NUMERA-AUD-001..012` conserva:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

No existe instancia física propia ni autorización para modificar datos o consumidores.

---

#### 4. Fuentes verificadas

Se contrastaron:

- `NUMERA-AUD-001` a `NUMERA-AUD-005` publicados;
- `NUMERA-AUD-006` aprobado por el usuario como base inmediata;
- `CAP-SCOPE-012` y su asignación de propiedad económica y operativa;
- `INT-PROC-004 — Definir contrato para que NUMERA reciba el evento económico`;
- `04A_13_NUMERA.md` sin modificación;
- `vento-numera/main` en commit `c4d50282e30e46d0abb3d871f9604cf913ebbabd`;
- la Server Action `createExpense` de `/expenses`;
- la Server Action `upsertBudget` de `/cost-centers`;
- la estructura remota de `public.numera_expenses`;
- fuentes remotas de compra, inventario, pagos, producción y asistencia mediante consultas Supabase de solo lectura.

---

#### 5. Regla canónica de propiedad

La propiedad objetivo vigente conserva:

```text
PULSO -> venta, pago, caja y reversión operativa
ORIGO -> compra, proveedor, orden, recepción empresarial y disputa
NEXO -> movimiento físico, valoración de inventario, activos y logística
FOGO -> consumo, producción, rendimiento y merma
ANIMA -> hechos laborales y fuentes autorizadas para costo laboral
NUMERA -> hechos económicos, conciliación, costos, obligaciones, cierres y analítica
```

NUMERA reconoce el efecto económico sin reconstruir ni duplicar el hecho operativo propietario.

---

#### 6. Regla cardinal contra duplicidad

El contrato de integración de compra ya fija expresamente:

```text
RECEPCION COMERCIAL EN ORIGO
+ HECHO FISICO CORRELACIONADO EN NEXO
-> EVENTO ECONOMICO CORRELACIONABLE
-> NUMERA
```

Y prohíbe:

```text
RECEPCION CREADA
-> GASTO CREADO MANUALMENTE SIN FUENTE
```

La misma identidad causal no puede competir entre una captura manual y un evento canónico ya recibido.

---

#### 7. Universo de escrituras manuales NUMERA

En el snapshot actual existen dos Server Actions de escritura de negocio:

```text
MANUAL_WRITE_ACTIONS = 2
MANUAL_ECONOMIC_FACT_ACTIONS = 1
MANUAL_PLANNING_ACTIONS = 1
```

- `createExpense` crea una fila económica manual en `numera_expenses`;
- `upsertBudget` actualiza presupuesto, ingreso esperado y margen objetivo como datos de planificación.

Solo `createExpense` entra al universo principal de duplicidad de hechos.

---

#### 8. Captura manual observada de gastos

`createExpense` recibe desde la UI:

```text
period_id
category_id
cost_center_id
expense_date
description
amount
```

Y agrega de forma fija:

```text
currency = COP
source_app = numera
```

No recibe del formulario una identidad del hecho operativo externo que pueda haber originado el gasto.

---

#### 9. Campos de origen disponibles en persistencia

`public.numera_expenses` dispone de:

```text
source_app
source_table
source_id
metadata
```

La tabla puede representar procedencia técnica parcial, pero la Server Action actual solo escribe `source_app = numera`.

---

#### 10. Campos de correlación no escritos por el flujo manual

El flujo actual no escribe explícitamente:

```text
source_table
source_id
```

Tampoco construye en `metadata` una referencia canónica obligatoria a evento, documento o correlación empresarial.

Resultado:

```text
MANUAL_SOURCE_APP_WRITTEN = 1
MANUAL_SOURCE_CORRELATION_FIELDS_WRITTEN = 0
```

---

#### 11. Ausencia de restricción única de origen

La tabla `numera_expenses` no presenta una restricción `UNIQUE` que impida dos filas con la misma identidad de fuente.

Las restricciones observadas cubren:

- monto no negativo;
- descripción no vacía;
- moneda no vacía;
- existencia de centro de costo o sede;
- foreign keys de periodo, categoría, centro y sede.

No existe una clave única `(source_app, source_table, source_id)` ni equivalente.

---

#### 12. Ausencia de matching en `vento-numera`

El snapshot actual de `vento-numera` no contiene consumidores o consultas directas a:

```text
purchase_orders
inventory_entries
payments.transactions
production_batches
attendance_logs
```

Tampoco se localizaron referencias a `source_table`, `source_id`, idempotencia o detección de duplicados en el código de aplicación auditado.

---

#### 13. Estado remoto de la captura manual

El corte remoto confirma:

```text
NUMERA_EXPENSE_ROWS = 0
ROWS_WITH_SOURCE_TABLE = 0
ROWS_WITH_SOURCE_ID = 0
ROWS_WITH_NON_NUMERA_SOURCE_APP = 0
```

Por tanto no existe una fila manual actual que pueda compararse contra otra fuente para demostrar una duplicidad materializada.

---

#### 14. Resultado ejecutivo

El resultado de esta auditoría queda:

```text
CONFIRMED_DUPLICATE_MANUAL_ROWS = 0
MANUAL_FACT_CREATION_PATHS = 1
MANUAL_PLANNING_PATHS = 1
CROSS_DOMAIN_DUPLICATION_RISK_DOMAINS = 5
SOURCE_DOMAINS_WITH_CURRENT_REMOTE_FACTS = 4
UNIQUE_SOURCE_DEDUP_CONSTRAINTS = 0
CROSS_DOMAIN_MATCHING_CONSUMERS_IN_VENTO_NUMERA = 0
```

La ausencia de filas duplicadas actuales no elimina el riesgo estructural de crear una duplicidad en el primer registro manual que represente un hecho ya existente fuera de NUMERA.

---

#### 15. Definición de duplicidad confirmada

Una fila se clasificaría como `DUPLICADO_CONFIRMADO` únicamente si pudiera demostrarse que:

1. existe una fila `numera_expenses`;
2. existe un hecho externo identificable;
3. ambos representan el mismo efecto económico;
4. la fila manual no es una corrección, reclasificación o ajuste gobernado independiente;
5. la identidad, documento, monto, periodo y causa permiten sostener la equivalencia.

Con cero filas en `numera_expenses`, ese umbral no se alcanza actualmente.

---

#### 16. Definición de riesgo de duplicidad abierto

Existe `RIESGO_DE_DUPLICIDAD_ABIERTO` cuando:

- el dominio fuente ya posee o podrá poseer el hecho propietario;
- NUMERA permite registrar manualmente un efecto equivalente;
- el flujo manual no exige referencia a la fuente;
- no existe deduplicación por identidad o correlación;
- el sistema no bloquea que ambos caminos convivan.

Esta condición sí está demostrada.

---

#### 17. ORIGO — compra y recepción empresarial

ORIGO conserva la propiedad de compra, orden y recepción empresarial.

El estado remoto observado contiene:

```text
PURCHASE_ORDERS = 3
PURCHASE_ORDER_ITEMS = 9
PURCHASE_ORDER_STATUSES = received | sent
```

Los tres purchase orders observados contienen `total_amount`.

Una fila manual de gasto que represente el mismo compromiso, recepción o documento de compra abre riesgo de doble reconocimiento económico si posteriormente NUMERA consume el evento canónico de ORIGO.

Clasificación:

```text
ORIGO_MANUAL_DUPLICATION_RISK = OPEN
CURRENT_CONFIRMED_DUPLICATE_ROW = NO
```

---

#### 18. NEXO — entrada, movimiento y valoración física

NEXO conserva entrada física, movimientos, inventario, valoración física, activos y logística.

El snapshot remoto contiene:

```text
INVENTORY_ENTRIES = 4
INVENTORY_MOVEMENTS = 803
INVENTORY_ENTRIES_WITH_SOURCE_APP_ORIGO = PRESENT
```

Una de las entradas observadas está vinculada a `purchase_order_id` y las entradas identifican `source_app = origo` cuando corresponde.

Estos hechos no crean automáticamente el gasto legal, pero sí forman parte del lineage que debe impedir que NUMERA registre manualmente un segundo efecto económico sin correlación.

---

#### 19. Cadena ORIGO → NEXO → NUMERA

La cadena canónica de compra con inventario queda:

```text
ORIGO = HECHO COMERCIAL
NEXO = HECHO FISICO CORRELACIONADO
NUMERA = HECHO ECONOMICO
```

Por tanto, una captura manual NUMERA solo puede coexistir con esa cadena si representa un hecho distinto, una excepción gobernada o un ajuste correlacionado.

No puede utilizarse para volver a registrar la misma recepción por descripción y monto libres.

---

#### 20. PULSO — venta, pago, caja y reversión

PULSO conserva la operación comercial y los efectos de pago y caja.

El snapshot remoto contiene:

```text
PAYMENTS_TRANSACTIONS = 7
PAYMENT_STATUSES = approved | cancelled
POS_PAYMENTS = 0
POS_CASH_MOVEMENTS = 0
```

La existencia de transacciones de pago no significa que cada pago sea un gasto NUMERA.

El riesgo aparece únicamente cuando una captura manual pretende representar nuevamente una comisión, devolución, diferencia de caja, reverso u otro efecto económico que ya tenga un hecho comercial o de pago identificable.

Clasificación:

```text
PULSO_MANUAL_DUPLICATION_RISK = CONDITIONAL_OPEN
CURRENT_CONFIRMED_DUPLICATE_ROW = NO
```

---

#### 21. FOGO — producción, consumo, rendimiento y merma

FOGO conserva los hechos de producción, consumo, rendimiento y merma que pueden originar efectos de costo en NUMERA.

El corte remoto seleccionado contiene:

```text
PRODUCTION_BATCHES = 0
PRODUCTION_BATCH_CONSUMPTIONS = 0
```

No existe un hecho productivo actual de esas tablas contra el cual comparar una fila NUMERA.

Sin embargo, el canal manual permanece abierto y podría competir con futuros costos productivos cuando esos hechos se materialicen.

Clasificación:

```text
FOGO_MANUAL_DUPLICATION_RISK = STRUCTURAL_FUTURE
CURRENT_CONFIRMED_DUPLICATE_ROW = NO
```

---

#### 22. ANIMA — hechos laborales y costo laboral

ANIMA conserva hechos laborales y fuentes autorizadas para costo laboral, mientras el sistema interno no se declara motor de nómina.

El snapshot remoto contiene:

```text
ATTENDANCE_LOGS = 6759
ATTENDANCE_ACTIONS = check_in | check_out
```

La categoría manual `Nomina` existe en NUMERA.

Una marcación de asistencia no es por sí misma un gasto de nómina y no se clasifica como duplicado monetario. El riesgo surge cuando NUMERA registre manualmente un monto de nómina que posteriormente vuelva a recibirse desde el paquete laboral o proveedor autorizado.

Clasificación:

```text
ANIMA_PAYROLL_MANUAL_CAPTURE = TEMPORARY_BRIDGE_CANDIDATE
CURRENT_CONFIRMED_DUPLICATE_ROW = NO
```

---

#### 23. PASS no se convierte en owner económico por inferencia

PASS conserva identidad de cliente, experiencia, fidelización y objetos propios de cliente.

Esta tarea no crea una sexta familia de duplicidad directa para PASS.

Cuando exista un efecto económico asociado a pedido o pago de cliente, la deduplicación deberá seguir el contrato propietario de venta/pago y el hecho económico correlacionado, no una copia manual basada en datos de PASS.

---

#### 24. Autoridades externas fuera del conteo de cinco dominios

Proveedor fiscal, sistema contable externo, bancos, procesadores de pago y proveedor de nómina pueden ser fuentes o soportes autorizados.

Se excluyen del conteo `CROSS_DOMAIN_DUPLICATION_RISK_DOMAINS = 5` porque no son aplicaciones propietarias del conjunto PULSO/ORIGO/NEXO/FOGO/ANIMA.

Su tratamiento sigue exigiendo identidad, documento, correlación y conciliación; esta tarea no diseña esos adaptadores.

---

#### 25. Universo actual de categorías manuales de gasto

El snapshot remoto conserva siete categorías activas:

```text
rent -> Arriendo -> fixed
payroll -> Nomina -> fixed
utilities -> Servicios publicos -> fixed
maintenance -> Mantenimiento -> variable
marketing -> Mercadeo -> variable
supplies -> Insumos no inventariables -> variable
other -> Otros gastos -> one_time
```

La categoría clasifica el gasto; no identifica su fuente empresarial.

---

#### 26. Matriz de categorías y riesgo de duplicidad

| Categoría | Fuente manual posible | Solapamiento con otro dominio | Decisión AS-IS |
| --- | --- | --- | --- |
| `rent` | factura, contrato o soporte externo | no obligatorio en otro dominio VENTO observado | `CAPTURA_MANUAL_LEGITIMA_CON_SOPORTE` |
| `payroll` | paquete laboral o proveedor autorizado | ANIMA / autoridad externa | `PUENTE_MANUAL_CON_RIESGO_FUTURO` |
| `utilities` | factura o soporte externo | no obligatorio en otro dominio VENTO observado | `CAPTURA_MANUAL_LEGITIMA_CON_SOPORTE` |
| `maintenance` | servicio externo o compra | ORIGO/NEXO cuando exista orden, recepción, activo o movimiento correlacionado | `RIESGO_CONDICIONAL` |
| `marketing` | servicio externo o compra | ORIGO cuando exista procurement correlacionado | `RIESGO_CONDICIONAL` |
| `supplies` | compra no inventariable | ORIGO y eventualmente NEXO según el objeto recibido | `RIESGO_ALTO_DE_COMPETENCIA` |
| `other` | cualquier causa | cualquiera de los cinco dominios | `RIESGO_NO_ACOTADO` |

---

#### 27. La categoría `Nomina` no convierte asistencia en gasto

El sistema no puede derivar por inferencia:

```text
ATTENDANCE_LOG
-> PAYROLL_EXPENSE
```

El gasto de nómina deberá provenir de un resultado laboral/económico autorizado y reconciliable.

La captura manual puede actuar como puente temporal, pero deberá retirarse o vincularse cuando exista el hecho canónico correspondiente.

---

#### 28. La categoría `Insumos no inventariables` no omite procurement

Que un insumo no aumente inventario no elimina la compra o aceptación comercial.

Cuando el gasto provenga de una compra gestionada por ORIGO, la identidad de esa compra o recepción deberá preservarse aunque NEXO no produzca una existencia física equivalente.

La categoría no autoriza duplicar el documento o la obligación mediante una fila manual libre.

---

#### 29. `Otros gastos` es el mayor punto de ambigüedad

`other / Otros gastos` no restringe semánticamente el origen.

Puede recibir una descripción que corresponda a:

- compra;
- diferencia de caja;
- comisión de pago;
- merma o efecto productivo;
- ajuste logístico;
- nómina;
- servicio externo.

Sin referencia de fuente, esa categoría deja abierto el mayor espacio para duplicidad transversal.

---

#### 30. Las categorías no sustituyen el lineage

Ningún valor de `category_id` demuestra:

- owner del hecho;
- documento fuente;
- evento fuente;
- correlación;
- idempotency key;
- si el registro ya fue recibido por otro canal;
- si la fila es gasto original, ajuste o reclasificación.

Por tanto la deduplicación no puede basarse únicamente en categoría, fecha, descripción y monto.

---

#### 31. `upsertBudget` queda fuera del universo de duplicidad transaccional

`upsertBudget` escribe:

- presupuesto;
- ingreso esperado;
- margen bruto objetivo.

Esos valores son planificación y no hechos operativos realizados.

No se clasifican como duplicados de ventas PULSO, compras ORIGO o movimientos NEXO por compartir una cifra o dimensión temporal.

---

#### 32. Ingreso esperado no es venta duplicada

`expected_revenue` permanece como objetivo o expectativa manual.

Una venta realizada por PULSO y un ingreso esperado en presupuesto son objetos distintos:

```text
EXPECTED_REVENUE != REALIZED_SALE
```

La tarea no convierte una similitud de monto en duplicidad.

---

#### 33. Duplicados confirmados en el corte actual

Resultado:

```text
CONFIRMED_DUPLICATE_MANUAL_ROWS = 0
```

Razón verificable:

```text
NUMERA_EXPENSE_ROWS = 0
```

No se infiere un duplicado inexistente a partir de compras, pagos, movimientos o asistencia presentes en otros dominios.

---

#### 34. Riesgo estructural confirmado

Aunque no existen duplicados materializados, sí queda confirmado:

```text
MANUAL_FORM_CAN_CREATE_UNCORRELATED_ECONOMIC_FACT = YES
CROSS_DOMAIN_SOURCE_MATCHING_BEFORE_INSERT = NO
SOURCE_ID_REQUIRED_BY_MANUAL_FORM = NO
UNIQUE_SOURCE_DEDUP_CONSTRAINT = NO
```

Ese es el hallazgo principal de `NUMERA-AUD-007`.

---

#### 35. Matriz de dominios y decisión

| Dominio | Hecho propietario relevante | Evidencia remota seleccionada | Duplicado actual probado | Riesgo manual |
| --- | --- | ---: | --- | --- |
| ORIGO | compra, orden, recepción empresarial | 3 órdenes / 9 líneas | no | `OPEN` |
| NEXO | entrada, movimiento, valoración física | 4 entradas / 803 movimientos | no | `OPEN` |
| PULSO | venta, pago, caja, reversión | 7 transacciones de pago | no | `CONDITIONAL_OPEN` |
| FOGO | producción, consumo, rendimiento, merma | 0 batches / 0 consumos seleccionados | no | `STRUCTURAL_FUTURE` |
| ANIMA | hechos laborales para costo laboral | 6759 marcaciones | no | `TEMPORARY_BRIDGE_RISK` |

---

#### 36. Hallazgos confirmados

| ID | Hallazgo | Severidad documental | Propietario de salida |
| --- | --- | --- | --- |
| `H-NUMERA-007-001` | `createExpense` permite crear un hecho económico manual sin `source_table` ni `source_id` | crítica | `NUMERA-DOM-002`, `NUMERA-DOM-005`, `NUMERA-UX-009` |
| `H-NUMERA-007-002` | `numera_expenses` no posee restricción única de identidad de fuente | crítica | `NUMERA-DOM-002`, `INT-APP-*`, `INT-DB-*` |
| `H-NUMERA-007-003` | `vento-numera` no hace matching previo contra fuentes de otros dominios | crítica | `NUMERA-UX-014`, integraciones propietarias |
| `H-NUMERA-007-004` | una compra/recepción ORIGO puede competir con un gasto manual si se registra por descripción y monto | crítica | `NUMERA-DOM-003`, `NUMERA-DOM-005`, `INT-PROC-004` |
| `H-NUMERA-007-005` | los efectos de inventario NEXO pueden quedar económicamente duplicados si se crea un gasto manual no correlacionado | crítica | `NUMERA-DOM-004`, `NUMERA-DOM-007`, integración NEXO→NUMERA |
| `H-NUMERA-007-006` | efectos económicos ligados a pago/caja PULSO pueden competir con captura manual cuando representen la misma causa | crítica | `NUMERA-DOM-002`, `NUMERA-UX-017`, integración PULSO→NUMERA |
| `H-NUMERA-007-007` | el canal manual permanece abierto para costos productivos FOGO futuros | alta | `NUMERA-DOM-004`, `NUMERA-DOM-007`, integración FOGO→NUMERA |
| `H-NUMERA-007-008` | `Nomina` puede actuar como puente manual, pero debe evitar doble reconocimiento cuando exista paquete laboral autorizado | alta | `NUMERA-DOM-005`, `ANIMA`, integración laboral/económica |
| `H-NUMERA-007-009` | `Otros gastos` permite representar cualquier causa sin owner o fuente obligatoria | crítica | `NUMERA-DOM-005`, `NUMERA-UX-009` |
| `H-NUMERA-007-010` | la categoría de gasto no demuestra owner, documento, evento ni correlación | crítica | `NUMERA-DOM-002`, `NUMERA-DOM-005` |
| `H-NUMERA-007-011` | el corte actual contiene cero gastos NUMERA y por ello cero duplicados manuales materializados demostrables | informativa | cerrado por evidencia AS-IS |
| `H-NUMERA-007-012` | presupuesto, ingreso esperado y margen objetivo son datos de planificación y no deben marcarse como duplicados transaccionales | informativa | `NUMERA-DOM-006`, `NUMERA-AUD-008` |

---

#### 37. Condición de salida para la captura manual

La captura manual podrá conservarse cuando se demuestre al menos una de estas condiciones:

1. no existe otro sistema o dominio con el hecho propietario;
2. la fuente es un soporte externo que todavía no dispone de integración;
3. el registro es un ajuste o reclasificación gobernado y no una segunda copia del hecho;
4. existe referencia explícita a la fuente y control de idempotencia;
5. la tarea propietaria ha definido una excepción manual documentada y auditable.

Si ya existe un evento canónico de la misma causa, la captura manual competidora deberá bloquearse o transformarse en una acción correlacionada.

---

#### 38. Límite con NUMERA-AUD-008

Esta tarea no valida métodos de costo, margen, rentabilidad, variación ni punto de equilibrio.

Los costos detectados en ORIGO, NEXO o FOGO se usan únicamente para identificar posible doble reconocimiento de una misma causa.

La corrección matemática permanece en `NUMERA-AUD-008`.

---

#### 39. Límite con NUMERA-AUD-009

Esta tarea no decide soporte obligatorio, aprobación, anulación, cierre, reapertura o segregación del registro manual.

Esas reglas permanecen en `NUMERA-AUD-009` y tareas de dominio posteriores.

---

#### 40. Límite con NUMERA-AUD-010

Esta tarea no evalúa exportaciones, clasificación de información sensible, custodia de archivos ni trazabilidad fuera de la aplicación.

Ese alcance permanece en `NUMERA-AUD-010`.

---

#### 41. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la prohibición de duplicar manualmente un hecho ya está protegida por requisitos vigentes de conciliación, identidad, fuente, correlación e idempotencia. Esta auditoría materializa el estado AS-IS y no introduce una conducta nueva.

---

#### 42. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-NUMERA-001` para reconciliar indicadores, costos, gastos, saldos y reportes con fuentes propietarias y prohibir la duplicación mediante registro manual;
- `TREQ-NUMERA-002` para identidad estable, fuente, correlación, documento, monto y evidencia del hecho económico;
- `TREQ-NUMERA-003` para objetos financieros independientes y matching gobernado de pagos, obligaciones y tesorería;
- `TREQ-NUMERA-018` para revalidación y origen explícito en creación de gastos;
- requisitos de integración vigentes para idempotencia, correlación y escrituras entre dominios.

Esta sección es trazabilidad heredada y no actualiza 04A.

---

#### 43. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build del producto permanece reservado a `NUMERA-AUD-011`. |
| LOCAL | NOT_EXECUTED | La incorporación y batería estructural contra el checkout del usuario se ejecutarán al publicar la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, `vento-numera/main`, Server Actions, esquema y constraints de `numera_expenses`, categorías y conteos agregados de fuentes remotas mediante solo lectura. |
| OPERATIVA | NOT_EXECUTED | No se creó gasto, compra, recepción, movimiento, pago, producción ni ajuste para probar duplicidad mediante mutaciones. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; no hay materialización física autorizada. |

---

#### 44. Validaciones documentales de coherencia

Se comprueba que:

1. `NUMERA-AUD-006` permanece como predecesora inmediata;
2. `NUMERA-AUD-008` permanece como sucesora inmediata;
3. cero filas `numera_expenses` impiden declarar duplicados materiales actuales;
4. el riesgo estructural se documenta sin inventar filas;
5. ORIGO, NEXO, PULSO, FOGO y ANIMA conservan su ownership;
6. PASS no se convierte en owner económico por inferencia;
7. presupuesto e ingreso esperado no se confunden con hechos realizados;
8. la captura manual legítima no se prohíbe de forma absoluta;
9. fórmulas permanecen en `NUMERA-AUD-008`;
10. gastos, cierres y aprobaciones permanecen en `NUMERA-AUD-009`;
11. exportaciones y sensibilidad permanecen en `NUMERA-AUD-010`;
12. no se crean ni modifican requisitos de prueba.

---

#### 45. Criterios de aceptación

`NUMERA-AUD-007` queda aceptable cuando:

- se identifica el único flujo actual de creación manual de hecho económico;
- se distingue ese flujo del presupuesto y demás datos de planificación;
- se documentan los campos de origen disponibles y los realmente escritos;
- se verifica si existe una clave única de deduplicación;
- se informa el conteo real de filas manuales;
- no se declara un duplicado sin equivalencia material demostrable;
- cada dominio propietario relevante tiene una decisión explícita;
- las siete categorías manuales tienen tratamiento AS-IS;
- la captura manual legítima conserva una vía válida;
- el contrato ORIGO→NEXO→NUMERA se respeta;
- cada hallazgo diferido conserva owner y condición de salida;
- no se modifica código, datos ni Supabase;
- no se crean ni modifican requisitos de prueba;
- `NUMERA-AUD-008` queda como única continuidad inmediata.

---

#### 46. Límites

Esta tarea no demuestra:

- que una orden de compra deba reconocerse siempre como gasto;
- que un movimiento de inventario sea automáticamente una obligación financiera;
- que una transacción de pago sea un gasto;
- que una marcación de asistencia equivalga a nómina;
- que un batch productivo cree por sí solo un asiento o gasto;
- que todo gasto manual sea incorrecto;
- que toda coincidencia de fecha y monto sea duplicidad;
- que una categoría determine el owner del hecho;
- que la ausencia de filas actuales elimine el riesgo futuro;
- que las fórmulas financieras actuales sean correctas o incorrectas;
- que un hallazgo autorice eliminar datos o bloquear físicamente formularios.

---

#### 47. Decisiones congeladas

Quedan congeladas para continuidad:

1. existe una sola Server Action actual que crea hechos económicos manuales: `createExpense`;
2. `upsertBudget` es planificación y queda fuera del conteo de duplicidad transaccional;
3. `numera_expenses` contiene cero filas en el corte remoto;
4. por tanto existen cero duplicados manuales materializados demostrables;
5. el formulario manual no escribe `source_table` ni `source_id`;
6. la tabla no posee una restricción única de identidad de fuente;
7. `vento-numera` no hace matching actual contra fuentes propietarias de otros dominios;
8. existen cinco dominios relevantes de riesgo: PULSO, ORIGO, NEXO, FOGO y ANIMA;
9. ORIGO, NEXO, PULSO y ANIMA poseen hechos remotos actuales seleccionados; FOGO conserva riesgo estructural futuro en el corte observado;
10. una recepción ORIGO no debe convertirse en gasto manual sin fuente;
11. una captura manual puede permanecer cuando sea fuente primaria legítima, soporte externo sin integración o ajuste gobernado;
12. las siete categorías actuales clasifican gasto pero no sustituyen source lineage;
13. `Otros gastos` es la categoría con mayor ambigüedad transversal;
14. 04A permanece sin cambios.

---

#### 48. Continuidad

**ÚLTIMA TAREA APROBADA**
`NUMERA-AUD-006 — Detectar reportes sin conciliación o sin fuente de verdad aprobada`

**TAREA ACTUAL APROBADA**
`NUMERA-AUD-007 — Detectar registros manuales duplicados frente a otros dominios`

**SIGUIENTE TAREA RESERVADA**
`NUMERA-AUD-008 — Auditar cálculos de costos, margen, rentabilidad y punto de equilibrio`
### [ ] NUMERA-AUD-008 — Auditar cálculos de costos, margen, rentabilidad y punto de equilibrio
### [ ] NUMERA-AUD-009 — Auditar gastos, centros de costo, cierres y aprobaciones
### [ ] NUMERA-AUD-010 — Auditar exportaciones, información sensible y trazabilidad
### [ ] NUMERA-AUD-011 — Ejecutar build, lint, tipos y pruebas existentes
### [ ] NUMERA-AUD-012 — Crear matriz capacidad financiera × implementación actual
