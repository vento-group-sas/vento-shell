### MINI-BLOQUE — EXPERIENCIA DEL CLIENTE

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia del cliente** dentro de **V PASS**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `PASS-UX-001` a `PASS-UX-013` — 13 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar pantallas actuales de cliente” y concluye con “Ejecutar pruebas con clientes reales”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:PASS-UX -->
### Reconciliación topológica de PASS-UX-001 a PASS-UX-013

El mini-bloque define la experiencia objetivo del cliente, navegación, estados y pruebas de diseño. No constituye por sí mismo una implementación física independiente.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ PASS-UX-001 — Inventariar pantallas actuales de cliente

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-010 — Proteger precios y datos sensibles
**Tarea siguiente:** PASS-UX-002 — Diseñar inicio de puntos y beneficios
**Tipo de tarea:** documental; inventario y reconciliación AS-IS de las superficies actuales de cliente de PASS contra el runtime verificable, el inventario aprobado del BLOQUE I y el catálogo canónico de pantallas; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, feature flags, datos, Supabase, migraciones, RLS, RPC, Storage, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar y reconciliar de forma cerrada las pantallas y superficies actuales de cliente de PASS antes de rediseñar la experiencia del mini-bloque `PASS-UX-001..013`.

La tarea congela el estado AS-IS verificable y separa cuatro conceptos que no pueden tratarse como equivalentes:

```text
STACK SCREEN DECLARADA
!=
SUPERFICIE LÓGICA AS-IS
!=
COMPONENTE EMBEBIDO
!=
PANTALLA CANÓNICA VSCREEN
```

El inventario debe permitir que las tareas posteriores diseñen sobre una base única y trazable, sin perder superficies ocultas por feature flag, sin duplicar modales o gates como rutas y sin presentar como implementadas pantallas canónicas que todavía no tienen superficie runtime dedicada.

---

#### 2. Frontera de la priority lane

La tarea pertenece a la priority lane documental `PASS-LOYALTY-001` y es la primera unidad de `PASS_CUSTOMER_EXPERIENCE`.

La frontera vigente queda:

```text
PASS-LOYALTY-001
→ DOCUMENTATION_PRIORITY
→ PASS-UX-001
→ inventario AS-IS
→ PASS-UX-002
→ diseño de inicio de puntos y beneficios
```

La ruta normal de Vento OS permanece preservada y no se considera cerrada, sustituida ni completada por esta prioridad.

Esta tarea tampoco autoriza package gates, implementación física, CI022, piloto ni materialización de PASS.

---

#### 3. Naturaleza y topología

La topología vigente del mini-bloque establece:

```text
PASS-UX-001..013
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `PASS-UX-001` se agota en su contrato documental;
2. no existe una instancia física propia de `PASS-UX-001` por package ni por implementation unit;
3. el runtime se inspecciona como evidencia, pero no se modifica;
4. los hallazgos deben conservar owner documental y condición de salida;
5. la materialización futura se resolverá mediante dependency closure, packages E5 y sus instancias físicas aplicables;
6. la aprobación de esta tarea no declara PASS completo.

---

#### 4. Fuentes y snapshots verificados

La reconciliación se ancla a los siguientes estados observados:

| Fuente | Snapshot | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `cd5c0d60aed6bc5302c8e9b3b69efe7aede62e82` | plan canónico, priority lane, topología, catálogo de pantallas, inventario aprobado y requisitos vigentes |
| repositorio PASS accesible `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil actual verificable |
| `vento-pass/App.js` | blob `162e686ff5ec363a0f6f991da58f6ce84816e8aa` | stack, gates previos, feature flags, deep links y composición global |
| inventario aprobado `AUTH-UI-009` | vigente en `vento-shell/main` | 21 superficies lógicas PASS y separación cliente/laboral |
| catálogo `VSCREEN-*` | vigente en `vento-shell/main` | 19 pantallas objetivo de PASS y relaciones de proceso |
| Registro 04A dominio PASS | vigente en `vento-shell/main` | cobertura existente del inventario y control de deriva |
| `vento-pass/babel.config.js` y `tsconfig.json` | vigentes en `vento-pass/main` | resolución efectiva y divergencias de aliases de componentes |

La identidad histórica de repositorio usada por contratos anteriores no se reescribe por la ruta del conector disponible. Esta tarea registra únicamente el snapshot runtime observado y no cambia ownership canónico.

---

#### 5. Definición de unidad inventariable

Para `PASS-UX-001` una superficie de cliente es una unidad visible o interactiva que cumple al menos una de estas condiciones:

- es una `Stack.Screen` declarada por la navegación principal;
- es un gate previo a navegación con experiencia propia;
- es un modal global con función de cliente propia;
- es una superficie global de estado o recuperación que cambia lo que el cliente puede hacer;
- es una superficie embebida con semántica funcional canónica que no merece una ruta independiente.

No se crean superficies nuevas por:

- hooks;
- providers sin interacción propia;
- utilidades;
- estados internos sin presentación diferenciada;
- componentes puramente decorativos;
- acciones de servidor;
- APIs;
- código dormante sin montaje;
- variantes de implementación que conservan la misma identidad de navegación.

---

#### 6. Resultado cuantitativo reconciliado

| Métrica | Resultado |
| --- | ---: |
| `Stack.Screen` declaradas en `App.js` | **15** |
| nombres de stack coincidentes con el inventario aprobado | **15/15** |
| superficies lógicas de cliente o transversales congeladas | **21/21** |
| superficies congeladas faltantes | **0** |
| identificadores de superficie duplicados | **0** |
| nombres de stack duplicados | **0** |
| pantallas canónicas PASS `VSCREEN-*` | **19** |
| pantallas canónicas con evidencia runtime dedicada, compartida o embebida | **16/19** |
| pantallas canónicas sin superficie runtime dedicada demostrada | **3/19** |
| aliases Babel que cambian la implementación efectiva de una identidad inventariada de stack | **5** |
| alias Babel auxiliar de programación de entrega | **1** |
| divergencias adicionales declaradas solo por TypeScript para `OrderMenu` y `OrderCheckout` | **2** |
| rutas exclusivamente laborales dentro del stack PASS | **0** |

La cardinalidad `21` no sustituye la cardinalidad `19` del catálogo canónico: una superficie AS-IS puede cubrir parte de más de una pantalla canónica y una pantalla canónica puede requerir varias superficies AS-IS.

---

#### 7. Stack principal actual de PASS

El stack principal conserva exactamente los siguientes nombres, en este orden de declaración:

| Orden | `Stack.Screen` | Exposición observada | Superficie congelada |
| ---: | --- | --- | --- |
| 1 | `Home` | siempre después de autenticación y perfil válido | `PASS-CUSTOMER-SURFACE-003` |
| 2 | `Club` | `SHOW_CLUB_FEATURES` | `PASS-CUSTOMER-SURFACE-004` |
| 3 | `MyOrders` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-005` |
| 4 | `ChooseSatellite` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-006` |
| 5 | `DeliveryAddresses` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-007` |
| 6 | `AccountSettings` | siempre dentro del stack autenticado | `PASS-CUSTOMER-SURFACE-008` |
| 7 | `VentoCafe` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-009` |
| 8 | `Saudo` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-010` |
| 9 | `SatelliteExperience` | siempre dentro del stack autenticado | `PASS-CUSTOMER-SURFACE-011` |
| 10 | `SatellitePass` | siempre dentro del stack autenticado | `PASS-CUSTOMER-SURFACE-012` |
| 11 | `OrderHome` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-013` |
| 12 | `OrderMenu` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-014` |
| 13 | `OrderCheckout` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-015` |
| 14 | `OrderPlaced` | `SHOW_PURCHASE_FEATURES` + deep link | `PASS-CUSTOMER-SURFACE-016` |
| 15 | `OrderChat` | `SHOW_PURCHASE_FEATURES` | `PASS-CUSTOMER-SURFACE-017` |

El feature flag modifica disponibilidad runtime, no existencia documental. Una pantalla declarada detrás de un flag permanece en el inventario.

---

#### 8. Superficies previas, globales y de recuperación

Además del stack existen seis superficies lógicas que completan el universo de 21:

| ID | Categoría | Identidad | Fuente lógica | Estado reconciliado |
| --- | --- | --- | --- | --- |
| `PASS-CUSTOMER-SURFACE-001` | `PRE_NAVIGATION_GATE` | Auth — acceso del cliente | `src/components/Auth.tsx` | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-002` | `PRE_NAVIGATION_GATE` | CompleteProfile — completar perfil | `src/components/CompleteProfile.tsx` | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-018` | `GLOBAL_MODAL` | QrModal — identificación personal | `src/components/home/QrModal.tsx` | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-019` | `GLOBAL_RECOVERY_SURFACE` | AppUpdateGate — compatibilidad de versión | `src/components/AppUpdateGate.js` | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-020` | `GLOBAL_STATE_SURFACE` | App runtime gates — carga, configuración y perfil | `App.js` | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-021` | `GLOBAL_RECOVERY_SURFACE` | AppErrorBoundary — recuperación de error | `src/components/AppErrorBoundary.js` | `CURRENT_CONFIRMED` |

Los seis archivos o unidades fuente continúan presentes en el snapshot runtime inspeccionado.

---

#### 9. Inventario integral de 21 superficies AS-IS

| ID | Tipo | Identidad visible | Fuente lógica congelada | Resolución runtime observada | Resultado |
| --- | --- | --- | --- | --- | --- |
| `PASS-CUSTOMER-SURFACE-001` | `PRE_NAVIGATION_GATE` | Auth | `src/components/Auth.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-002` | `PRE_NAVIGATION_GATE` | CompleteProfile | `src/components/CompleteProfile.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-003` | `STACK_SCREEN` | Home | `src/components/Home.tsx` | `src/components/HomeOptimized.tsx` mediante alias Babel | `CURRENT_CONFIRMED_ALIASED` |
| `PASS-CUSTOMER-SURFACE-004` | `STACK_SCREEN_FEATURE_FLAG` | Club | `src/components/ClubScreen.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-005` | `STACK_SCREEN_FEATURE_FLAG` | MyOrders | `src/components/MyOrdersScreen.tsx` | `src/components/MyOrdersScreenV2.tsx` mediante alias Babel | `CURRENT_CONFIRMED_ALIASED` |
| `PASS-CUSTOMER-SURFACE-006` | `STACK_SCREEN_FEATURE_FLAG` | ChooseSatellite | `src/components/ChooseSatelliteScreen.tsx` | `src/components/ChooseSatelliteScreenOptimized.tsx` mediante alias Babel | `CURRENT_CONFIRMED_ALIASED` |
| `PASS-CUSTOMER-SURFACE-007` | `STACK_SCREEN_FEATURE_FLAG` | DeliveryAddresses | `src/components/DeliveryAddressesScreen.tsx` | `src/components/DeliveryAddressesScreenV2.tsx` mediante alias Babel | `CURRENT_CONFIRMED_ALIASED` |
| `PASS-CUSTOMER-SURFACE-008` | `STACK_SCREEN` | AccountSettings | `src/components/settings/AccountSettings.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-009` | `STACK_SCREEN_FEATURE_FLAG` | VentoCafe | `src/components/VentoCafe.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-010` | `STACK_SCREEN_FEATURE_FLAG` | Saudo | `src/components/Saudo.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-011` | `STACK_SCREEN` | SatelliteExperience | `src/components/SatelliteHub.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-012` | `STACK_SCREEN` | SatellitePass | `src/components/SatelliteExperience.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-013` | `STACK_SCREEN_FEATURE_FLAG` | OrderHome | `src/components/OrderHome.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-014` | `STACK_SCREEN_FEATURE_FLAG` | OrderMenu | `src/components/OrderMenu.tsx` | Babel conserva la fuente lógica; TypeScript declara variante `OrderMenuAvailability.tsx` | `CURRENT_CONFIRMED_TOOLING_DELTA` |
| `PASS-CUSTOMER-SURFACE-015` | `STACK_SCREEN_FEATURE_FLAG` | OrderCheckout | `src/components/OrderCheckout.tsx` | Babel conserva la fuente lógica; TypeScript declara variante `BaseOrderCheckout.tsx` | `CURRENT_CONFIRMED_TOOLING_DELTA` |
| `PASS-CUSTOMER-SURFACE-016` | `STACK_SCREEN_FEATURE_FLAG_DEEP_LINK` | OrderPlaced | `src/components/OrderPlacedScreen.tsx` | `src/components/OrderTrackingScreen.tsx` mediante alias Babel | `CURRENT_CONFIRMED_ALIASED` |
| `PASS-CUSTOMER-SURFACE-017` | `STACK_SCREEN_FEATURE_FLAG` | OrderChat | `src/components/OrderChatScreen.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-018` | `GLOBAL_MODAL` | QrModal | `src/components/home/QrModal.tsx` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-019` | `GLOBAL_RECOVERY_SURFACE` | AppUpdateGate | `src/components/AppUpdateGate.js` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-020` | `GLOBAL_STATE_SURFACE` | App runtime gates | `App.js` | misma fuente | `CURRENT_CONFIRMED` |
| `PASS-CUSTOMER-SURFACE-021` | `GLOBAL_RECOVERY_SURFACE` | AppErrorBoundary | `src/components/AppErrorBoundary.js` | misma fuente | `CURRENT_CONFIRMED` |

La columna de resolución runtime no crea identidades nuevas. Conserva la identidad funcional de la superficie y documenta qué archivo termina ejecutándose cuando existe un alias explícito.

---

#### 10. Deep links actuales

El contrato de linking observado registra únicamente:

| Identidad de navegación | Ruta externa | Interpretación |
| --- | --- | --- |
| `Home` | raíz | entrada principal de PASS |
| `MyOrders` | `orders` | entrada directa a pedidos propios |
| `OrderPlaced` | `payment-return` | retorno de pago y recuperación del contexto de pedido |

Los prefijos observados son `vento-pass://`, `vento-pass-dev://` y `https://pass.ventogroup.co`.

La ausencia de deep link para otra pantalla no significa que la pantalla no exista; solo significa que no se observó un patrón externo declarado para esa identidad en `App.js`.

---

#### 11. Reconciliación de aliases de implementación

El resolver Babel altera actualmente cinco identidades de stack y una dependencia auxiliar:

| Import lógico | Implementación efectiva declarada por Babel | Efecto documental |
| --- | --- | --- |
| `@/components/Home` | `HomeOptimized.tsx` | misma identidad `Home`, fuente efectiva distinta |
| `@/components/ChooseSatelliteScreen` | `ChooseSatelliteScreenOptimized.tsx` | misma identidad de selección, fuente efectiva distinta |
| `@/components/DeliveryAddressesScreen` | `DeliveryAddressesScreenV2.tsx` | misma identidad de direcciones, fuente efectiva distinta |
| `@/components/MyOrdersScreen` | `MyOrdersScreenV2.tsx` | misma identidad de pedidos, fuente efectiva distinta |
| `@/components/OrderPlacedScreen` | `OrderTrackingScreen.tsx` | `OrderPlaced` comparte implementación efectiva con seguimiento |
| `@/components/OrderScheduleSelector` | `OrderScheduleSelectorFixed.tsx` | componente auxiliar efectivo de programación de entrega |

`tsconfig.json` declara además aliases de `OrderMenu` y `OrderCheckout` hacia variantes que Babel no declara de forma equivalente.

Regla resultante:

```text
IDENTIDAD DE NAVEGACIÓN
SE CONSERVA

RESOLUCIÓN DE MÓDULO
SE DOCUMENTA COMO IMPLEMENTACIÓN EFECTIVA

DIVERGENCIA BABEL / TYPESCRIPT
NO CREA UNA SEGUNDA PANTALLA
```

La consolidación de rutas, aliases e identidades queda reservada a `PASS-UX-011` antes de cualquier materialización física que dependa de una única resolución de fuente.

---

#### 12. Reconciliación contra el catálogo canónico de PASS

El catálogo vigente contiene 19 pantallas canónicas PASS. La siguiente matriz registra cobertura AS-IS sin asumir equivalencia uno a uno:

| Pantalla canónica | Objetivo | Evidencia AS-IS actual | Clasificación |
| --- | --- | --- | --- |
| `VSCREEN-0107` | Inicio del cliente y resumen de beneficios | `PASS-CUSTOMER-SURFACE-003` Home | `DIRECT_RUNTIME` |
| `VSCREEN-0108` | QR personal de identificación | `PASS-CUSTOMER-SURFACE-018` QrModal | `DIRECT_RUNTIME_GLOBAL_MODAL` |
| `VSCREEN-0109` | Catálogo de beneficios y recompensas | `PASS-CUSTOMER-SURFACE-004` Club y experiencias de marca/sede | `MULTI_SURFACE_RUNTIME` |
| `VSCREEN-0110` | Ticket o QR de redención | `RedeemModal`, `QrPendingCard` y `QrFullscreenModal` embebidos en experiencias de fidelización | `EMBEDDED_RUNTIME` |
| `VSCREEN-0111` | Historial de puntos y redenciones | `TransactionItem` y `RedemptionCard` embebidos en experiencias de fidelización | `EMBEDDED_RUNTIME` |
| `VSCREEN-0112` | Perfil, privacidad y consentimientos | `PASS-CUSTOMER-SURFACE-002` + `PASS-CUSTOMER-SURFACE-008` | `MULTI_SURFACE_RUNTIME` |
| `VSCREEN-0160` | Inicio y selección del portal de compras | `PASS-CUSTOMER-SURFACE-006` + `PASS-CUSTOMER-SURFACE-013` | `MULTI_SURFACE_RUNTIME` |
| `VSCREEN-0161` | Menú y catálogo comercial del cliente | `PASS-CUSTOMER-SURFACE-014` y experiencias de marca/sede | `MULTI_SURFACE_RUNTIME` |
| `VSCREEN-0162` | Carrito y configuración del pedido | `PASS-CUSTOMER-SURFACE-014` | `EMBEDDED_IN_ORDER_MENU` |
| `VSCREEN-0163` | Dirección, modalidad y programación de entrega | `PASS-CUSTOMER-SURFACE-007` + selector de programación usado por checkout | `MULTI_SURFACE_RUNTIME` |
| `VSCREEN-0164` | Revisión, checkout e inicio de pago | `PASS-CUSTOMER-SURFACE-015` | `DIRECT_RUNTIME` |
| `VSCREEN-0165` | Confirmación de pedido y retorno de pago | `PASS-CUSTOMER-SURFACE-016` | `SHARED_RUNTIME_IDENTITY` |
| `VSCREEN-0166` | Mis pedidos y detalle | `PASS-CUSTOMER-SURFACE-005` | `DIRECT_RUNTIME` |
| `VSCREEN-0167` | Seguimiento de preparación y entrega del cliente | `PASS-CUSTOMER-SURFACE-016`, cuya implementación Babel actual resuelve a `OrderTrackingScreen.tsx` | `SHARED_RUNTIME_IDENTITY` |
| `VSCREEN-0168` | Chat y comunicación asociada al pedido | `PASS-CUSTOMER-SURFACE-017` | `DIRECT_RUNTIME` |
| `VSCREEN-0169` | Mis reclamos y casos de servicio | no se verificó una superficie runtime dedicada | `NO_DEDICATED_RUNTIME_VERIFIED` |
| `VSCREEN-0170` | Mis reservas y eventos | no se verificó una superficie runtime dedicada | `NO_DEDICATED_RUNTIME_VERIFIED` |
| `VSCREEN-0171` | Calificación y satisfacción | `RatingModal` y `FeedbackModal` embebidos en experiencias de marca/sede | `EMBEDDED_RUNTIME` |
| `VSCREEN-0172` | Comunicaciones y notificaciones del cliente | no se verificó una superficie runtime dedicada | `NO_DEDICATED_RUNTIME_VERIFIED` |

`DIRECT_RUNTIME`, `EMBEDDED_RUNTIME`, `MULTI_SURFACE_RUNTIME` y `SHARED_RUNTIME_IDENTITY` describen únicamente relación de cobertura observada. No certifican completitud funcional, accesibilidad, autorización, UX objetivo ni producción.

---

#### 13. Diferencias entre AS-IS y catálogo objetivo

La reconciliación produce tres grupos:

```text
16 VSCREEN
→ tienen evidencia runtime dedicada, compartida o embebida

3 VSCREEN
→ no tienen superficie runtime dedicada demostrada

0 VSCREEN
→ se declaran implementadas solo por existir en el catálogo
```

Las identidades sin superficie dedicada demostrada son:

- `VSCREEN-0169 — Mis reclamos y casos de servicio`;
- `VSCREEN-0170 — Mis reservas y eventos`;
- `VSCREEN-0172 — Comunicaciones y notificaciones del cliente`.

No se crean pantallas nuevas en esta tarea para cerrar esas brechas.

---

#### 14. Hallazgos y propietarios

| Hallazgo | Efecto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| cinco identidades de stack resuelven a archivos distintos mediante alias Babel | una revisión basada solo en el path lógico puede inspeccionar una implementación equivocada | `PASS-UX-011` | navegación y resolución de módulos quedan reconciliadas con una fuente efectiva única y verificable |
| `OrderMenu` y `OrderCheckout` tienen aliases TypeScript que no coinciden con la resolución Babel observada | tooling, editor y runtime pueden razonar sobre variantes distintas | `PASS-UX-011` | Babel, TypeScript y runtime convergen o documentan una política única de resolución |
| `OrderPlaced` resuelve actualmente a `OrderTrackingScreen.tsx` | confirmación de pedido y seguimiento comparten una identidad de navegación AS-IS | `PASS-UX-011` | se aprueba explícitamente compartir identidad o se separan rutas sin perder deep link ni continuidad |
| `VSCREEN-0169`, `VSCREEN-0170` y `VSCREEN-0172` no tienen superficie runtime dedicada verificada | el catálogo objetivo excede la superficie dedicada existente | `PASS-UX-011` | la navegación objetivo decide ruta dedicada, integración embebida o diferimiento explícito antes del dependency closure |
| satisfacción existe como modales embebidos, no como `Stack.Screen` propia | el catálogo canónico no puede interpretarse automáticamente como una ruta | `PASS-UX-011` | el contrato de navegación fija explícitamente la representación de `VSCREEN-0171` |
| compra y fidelización conservan varias responsabilidades dentro de superficies de marca/sede | una sola vista AS-IS puede corresponder a varias `VSCREEN-*` | `PASS-UX-002` a `PASS-UX-011` según responsabilidad | cada tarea posterior define su experiencia sin duplicar identidad ni crear otra fuente de verdad |

Ningún hallazgo autoriza una corrección física desde `PASS-UX-001`.

---

#### 15. Fronteras cliente versus operación interna

El inventario conserva como regla:

```text
EXPERIENCIA CLIENTE PASS
!=
SUPERFICIE LABORAL PASS
!=
OPERACIÓN PULSO RELACIONADA CON PASS
```

Las 21 superficies de esta tarea pertenecen a experiencia de cliente o fronteras transversales de la aplicación. Las superficies laborales embebidas ya inventariadas por el BLOQUE I y la ruta PULSO `/scanner` permanecen fuera del conteo de 21 y no se duplican aquí.

Por tanto:

- la presencia de perfil laboral o simulación dentro de `Home` no convierte `Home` en pantalla laboral;
- presentar el QR personal no autoriza otorgar puntos ni validar una redención;
- la acumulación y redención operativa en caja continúan siendo integración con PULSO;
- el diseño posterior debe preservar separación de identidad cliente y trabajador.

---

#### 16. Entrega a las tareas siguientes

`PASS-UX-001` entrega un universo estable para el resto del mini-bloque:

```text
PASS-UX-002
→ diseña inicio de puntos y beneficios sobre el inventario confirmado

PASS-UX-003
→ diseña QR personal sin duplicar QrModal ni operación PULSO

PASS-UX-004..010
→ especializan acumulación, redención, historial, catálogo, perfil, estados y errores

PASS-UX-011
→ reconcilia navegación, rutas, aliases y pantallas objetivo faltantes

PASS-UX-012
→ normaliza carga, error, offline y recuperación

PASS-UX-013
→ prueba con clientes el contrato ya diseñado
```

La tarea no desarrolla ninguna de esas decisiones por anticipado.

---

#### 17. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el inventario, su cardinalidad, el control de deriva de `App.js`, la separación entre stack y superficies globales, la preservación de feature flags y la regla de no asumir equivalencia uno a uno ya están cubiertos por requisitos vigentes. Esta tarea reconcilia el snapshot actual y entrega trazabilidad a las tareas PASS posteriores sin introducir una obligación normativa nueva.

---

#### 18. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, la tarea reutiliza como cobertura principal:

- `TREQ-PASS-035` para cardinalidad de quince pantallas declaradas y veintiuna superficies lógicas;
- `TREQ-PASS-036` para coincidencia de nombres `Stack.Screen`;
- `TREQ-PASS-037` para preservar superficies de compra detrás de feature flags;
- `TREQ-PASS-038` para separar gates, modales y superficies globales del stack;
- `TREQ-PASS-039` para separar QR personal de operación PULSO;
- `TREQ-PASS-040` para mantener las superficies de cliente fuera de operación interna de primera línea;
- `TREQ-PASS-041` para impedir equivalencias uno a uno inventadas con `VSCREEN-*`;
- `TREQ-PASS-042` para detectar deriva entre `App.js` y el inventario cuando el repositorio PASS esté disponible.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 19. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron todavía los validadores del checkout local del usuario para este artefacto. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, la priority lane vigente, el inventario aprobado de PASS, el catálogo `VSCREEN-*`, el Registro 04A PASS, `vento-pass/main`, `App.js`, aliases Babel/TypeScript y componentes runtime materiales. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron login, compras, acumulación, redención, pedido, pago, tracking, chat, reclamo, reserva ni notificaciones en un ambiente desplegado. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 20. Criterios de aceptación

- [x] La tarea mantiene exactamente `PASS-UX-001 — Inventariar pantallas actuales de cliente`.
- [x] La tarea permanece en `PASS-LOYALTY-001 / DOCUMENTATION_PRIORITY`.
- [x] La topología queda `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se verificó el snapshot actual de `vento-shell` y el runtime PASS accesible.
- [x] Se reconciliaron exactamente quince nombres de `Stack.Screen`.
- [x] Los quince nombres coinciden con el inventario aprobado.
- [x] Se preservaron exactamente veintiuna superficies lógicas de cliente o transversales.
- [x] No existen identificadores duplicados dentro del universo de 21.
- [x] Se separaron stack, gates previos, modal global, estados globales y recuperación.
- [x] Se preservaron las superficies de compra detrás de feature flags.
- [x] Se registraron los tres deep links observados sin convertir ausencia de deep link en ausencia de pantalla.
- [x] Se documentaron cinco aliases Babel de identidades de stack y un alias auxiliar.
- [x] Se registró la divergencia TypeScript/Babel de `OrderMenu` y `OrderCheckout` sin inventar superficies adicionales.
- [x] Se reconciliaron las 19 pantallas canónicas PASS sin asumir relación uno a uno.
- [x] Se identificaron 16 pantallas canónicas con evidencia dedicada, compartida o embebida.
- [x] Se preservaron `VSCREEN-0169`, `VSCREEN-0170` y `VSCREEN-0172` como objetivos sin superficie runtime dedicada demostrada.
- [x] Se registró que `VSCREEN-0171` tiene evidencia embebida mediante rating/feedback y no una ruta dedicada.
- [x] Se registró que `OrderPlaced` comparte implementación efectiva con tracking en el snapshot actual.
- [x] Cada hallazgo tiene propietario y condición de salida.
- [x] Se conserva separación cliente, laboral y operación PULSO.
- [x] No se crea ni modifica ningún requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza cambio físico, Supabase, migración, package gate, CI022, piloto ni despliegue.
- [x] `PASS-UX-002` queda reservada y no se desarrolla en esta tarea.

---

#### 21. Límites

Esta tarea no:

- rediseña el home de puntos y beneficios;
- decide la UX final del QR personal;
- define todavía acumulación o redención visible;
- rediseña historial o catálogo de recompensas;
- define estados pendiente/usado/cancelado;
- define mensajes de error finales;
- crea rutas para reclamos, reservas o notificaciones;
- decide si satisfacción debe ser ruta o modal;
- modifica aliases Babel o TypeScript;
- cambia feature flags;
- renombra `Stack.Screen`;
- modifica componentes PASS;
- modifica PULSO;
- modifica datos o Supabase;
- crea migraciones, RLS, RPC, funciones, triggers o secretos;
- implementa `VSCREEN-*` faltantes;
- autoriza packages ni implementación física;
- declara PASS completo;
- desarrolla `PASS-UX-002`.

---

#### 22. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-010 — Proteger precios y datos sensibles`

**TAREA ACTUAL APROBADA**
`PASS-UX-001 — Inventariar pantallas actuales de cliente`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-002 — Diseñar inicio de puntos y beneficios`
### [ ] PASS-UX-002 — Diseñar inicio de puntos y beneficios
### [ ] PASS-UX-003 — Diseñar QR personal
### [ ] PASS-UX-004 — Diseñar acumulación visible
### [ ] PASS-UX-005 — Diseñar redención visible
### [ ] PASS-UX-006 — Diseñar historial
### [ ] PASS-UX-007 — Diseñar catálogo de recompensas
### [ ] PASS-UX-008 — Diseñar perfil del cliente
### [ ] PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado
### [ ] PASS-UX-010 — Definir mensajes de error comprensibles
### [ ] PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente
### [ ] PASS-UX-012 — Simplificar interfaz móvil, estados de carga, error, offline y recuperación
### [ ] PASS-UX-013 — Ejecutar pruebas con clientes reales
