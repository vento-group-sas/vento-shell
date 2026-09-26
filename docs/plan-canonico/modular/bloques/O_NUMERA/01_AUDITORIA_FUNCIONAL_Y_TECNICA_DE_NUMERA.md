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
