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
### ✅ PASS-UX-002 — Diseñar inicio de puntos y beneficios

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-001 — Inventariar pantallas actuales de cliente
**Tarea siguiente:** PASS-UX-003 — Diseñar QR personal
**Tipo de tarea:** documental; diseño objetivo de arquitectura de información, jerarquía visual, estados y handoffs de `VSCREEN-0107 — Inicio del cliente y resumen de beneficios`; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Storage, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo del inicio de cliente de PASS para que una sola superficie permita comprender de inmediato la relación de fidelización sin mezclar saldo, acumulación histórica, recompensa, redención, promociones, compras, Club ni operación laboral.

La tarea diseña `VSCREEN-0107 — Inicio del cliente y resumen de beneficios` como `OWNER_WORKSPACE` de PASS y entrada de `VPROC-0045::STEP-ENTER_LOYALTY_HOME — Entrar a fidelización personal`.

El resultado fija qué debe mostrarse, en qué orden, con qué significado y a qué tarea o pantalla entrega cada acción. No implementa el diseño.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-001`, que entrega:

- quince `Stack.Screen` actuales;
- veintiuna superficies lógicas de cliente o transversales;
- `PASS-CUSTOMER-SURFACE-003` como identidad AS-IS de `Home`;
- la relación no uno a uno entre superficies AS-IS y `VSCREEN-*`;
- separación entre experiencia cliente PASS, superficies laborales PASS y operación PULSO;
- hallazgos de aliases y navegación reservados a `PASS-UX-011`;
- tres `VSCREEN-*` futuras sin superficie runtime dedicada, que no deben simularse desde el home.

La frontera de esta tarea es únicamente el home de fidelización. No absorbe el detalle de QR, acumulación, redención, historial, catálogo, perfil, estados de redención, errores, navegación global ni resiliencia móvil.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla | `VSCREEN-0107 — Inicio del cliente y resumen de beneficios` |
| Aplicación | `pass` |
| Proceso primario | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Proceso relacionado | `VPROC-0068 — Medir satisfacción del cliente` |
| Paso primario | `VPROC-0045::STEP-ENTER_LOYALTY_HOME — Entrar a fidelización personal` |
| Rol de la pantalla | `OWNER_WORKSPACE` |
| Superficie AS-IS de referencia | `PASS-CUSTOMER-SURFACE-003 — Home` |
| Modalidad | experiencia personal de cliente |
| Estado físico | sin instancia propia; contrato documental `DEFINE_ONCE` |

La relación con `VPROC-0068` no convierte el home en encuesta ni autoriza mezclar satisfacción con beneficios. Cualquier captura de satisfacción mantiene identidad y flujo propios.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot observado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `cd5c0d60aed6bc5302c8e9b3b69efe7aede62e82` | plan, topología, catálogo `VSCREEN-*`, procesos, 04A y validadores |
| `PASS-UX-001_APROBADA_PARA_REEMPLAZAR.md` | artefacto completo aprobado por el usuario y pendiente de publicación | base documental inmediata y handoff AS-IS |
| repositorio PASS accesible `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil verificable |
| `vento-pass/App.js` | blob `162e686ff5ec363a0f6f991da58f6ce84816e8aa` | navegación, gates, feature flags y montaje de `Home` |
| `src/components/Home.tsx` | vigente en `vento-pass/main` | composición AS-IS del home |
| `src/components/HomeOptimized.tsx` | vigente en `vento-pass/main` | wrapper efectivo de `Home` y aviso de pedido activo |
| `src/components/home/MembershipCard.tsx` | vigente en `vento-pass/main` | presentación AS-IS de nivel, puntos y QR |
| hooks de usuario, puntos, rewards y redemptions | vigentes en `vento-pass/main` | semántica AS-IS de datos y riesgos de representación |

La ausencia de publicación de `PASS-UX-001` en `main` no invalida esta preparación anticipada: se usa su versión completa aprobada como base y se mantiene `CIERRE_ANTERIOR: PENDIENTE` fuera del artefacto canónico.

---

#### 5. Semántica obligatoria de fidelización

El home debe conservar las siguientes identidades semánticas sin intercambiarlas:

| Concepto | Significado en el home | No significa |
| --- | --- | --- |
| `PUNTOS_DISPONIBLES` | saldo actualmente utilizable por el cliente, como proyección reconciliable del ledger | total histórico ganado, nivel o dinero |
| `PUNTOS_GANADOS_HISTORICOS` | acumulado histórico utilizado para calcular nivel y progreso | saldo gastable actual |
| `NIVEL` | categoría de fidelización derivada de la regla vigente y del acumulado histórico | beneficio concreto, membresía Club o autorización |
| `PROGRESO_DE_NIVEL` | avance hacia el siguiente nivel según regla vigente | promesa de saldo futuro |
| `BENEFICIO` | ventaja elegible o condición favorable vigente para el cliente | recompensa necesariamente canjeable con puntos |
| `RECOMPENSA` | elemento del catálogo con condiciones y, cuando aplique, costo en puntos | promoción genérica o saldo |
| `CANJE` | intención y resultado de redención con ciclo y estado propios | descuento automático en el home |
| `PROMOCION` | comunicación u oferta comercial con vigencia propia | beneficio de fidelización por defecto |
| `CLUB_MEMBERSHIP` | relación de membresía Club, cuando esté habilitada | nivel de fidelización |
| `CLUB_WALLET` | saldo monetario o ledger del Club, cuando exista | puntos PASS |

La separación anterior cierra para este diseño el hallazgo `H-CAP-SCOPE-010-012`: punto, beneficio, recompensa, cupón, membresía y promoción no se presentan como sinónimos.

---

#### 6. Arquitectura de información del home objetivo

El home se organiza en seis zonas funcionales, en este orden:

| Orden | Zona | Contenido obligatorio | Propósito |
| ---: | --- | --- | --- |
| 1 | Identidad y cuenta | saludo o identidad mínima, acceso a configuración del cliente | confirmar contexto personal sin exponer información laboral como contenido principal |
| 2 | Resumen de fidelización | nivel, puntos disponibles y progreso de nivel | responder inmediatamente “qué tengo” y “dónde estoy” |
| 3 | Acciones personales | acceso a QR personal y accesos resumidos a recompensas/historial/perfil cuando correspondan | entregar a capacidades propias sin duplicarlas dentro del home |
| 4 | Beneficios y recompensas | resumen contextual de beneficios o recompensas vigentes, sin ejecutar redención | permitir descubrir valor disponible y entrar al catálogo canónico |
| 5 | Comercio contextual | acceso a compra únicamente cuando `SHOW_PURCHASE_FEATURES` lo habilite | conservar la compra como capacidad separada de fidelización |
| 6 | Contexto operativo personal | aviso de pedido activo u otro estado personal vigente cuando exista | informar sin convertir el home en pantalla de operación interna |

El bloque laboral del menú, cuando exista para un cliente que también es trabajador, permanece separado de estas seis zonas y no modifica saldo, nivel, elegibilidad ni navegación de cliente.

---

#### 7. Resumen de fidelización

La zona principal debe presentar como máximo una verdad primaria por concepto:

1. **Nivel actual** — etiqueta humana del nivel vigente.
2. **Puntos disponibles** — dato principal de saldo utilizable confirmado.
3. **Progreso al siguiente nivel** — calculado con acumulación histórica, nunca con saldo disponible.
4. **Meta siguiente** — diferencia necesaria para el siguiente nivel, únicamente cuando exista otro nivel.
5. **Estado de nivel máximo** — reemplaza la meta cuando no exista nivel superior.

El saldo disponible y el acumulado histórico pueden cambiar de forma distinta. Gastar puntos puede reducir `PUNTOS_DISPONIBLES` sin reducir `PUNTOS_GANADOS_HISTORICOS` ni retroceder el nivel cuando la regla vigente defina el tier sobre lifetime earned.

---

#### 8. Contrato de certeza y frescura del saldo

El home no puede transformar un fallo de lectura en un saldo confirmado de cero.

Estados contractuales del dato:

| Estado | Presentación permitida | Prohibición |
| --- | --- | --- |
| `LOADING` | skeleton o placeholder sin cifra afirmada | mostrar `0` como saldo confirmado |
| `CONFIRMED` | valor confirmado y nivel/progreso derivados de fuentes válidas | mezclar con Club wallet o monto monetario |
| `CONFIRMED_ZERO` | `0` únicamente cuando la fuente válida confirme saldo cero | inferir cero por ausencia, timeout o error |
| `STALE_CONFIRMED` | último valor confirmado con señal explícita de desactualización | presentarlo como fresco |
| `UNAVAILABLE` | estado no disponible y acción de reintento | inventar saldo, tier o beneficio |

`PASS-UX-012` definirá el tratamiento visual final de carga, offline y recuperación; `PASS-UX-010` definirá copy final de error. Esta tarea fija solo la semántica que esas tareas no podrán contradecir.

---

#### 9. Acciones personales del home

Las acciones del home son puertas de entrada, no implementaciones duplicadas.

| Acción del home | Destino canónico | Propietario documental | Regla |
| --- | --- | --- | --- |
| mostrar identificación personal | `VSCREEN-0108` | `PASS-UX-003` | el home no escanea ni valida operación; presenta acceso a la credencial personal |
| consultar recompensas | `VSCREEN-0109` | `PASS-UX-007` | el home solo resume; el catálogo conserva condiciones y detalle |
| consultar historial | `VSCREEN-0111` | `PASS-UX-006` | el home no replica el ledger completo |
| abrir perfil y privacidad | `VSCREEN-0112` | `PASS-UX-008` | configuración, datos y consentimientos mantienen workspace propio |
| iniciar compra | `VSCREEN-0160` | tareas de experiencia comercial correspondientes | solo cuando la feature de compras esté habilitada |

La etiqueta del acceso a `VSCREEN-0108` debe comunicar presentación de la identificación propia, por ejemplo “Mi QR” o “Mostrar mi QR”. No debe describirse como escaneo ejecutado por el cliente.

---

#### 10. Resumen de beneficios y recompensas

El home puede mostrar una vista resumida del valor disponible, pero no sustituye `VSCREEN-0109`.

Reglas:

- solo se presentan beneficios o recompensas vigentes para el contexto permitido del cliente;
- cualquier dato dependiente de sede conserva filtro de sede y no mezcla rewards de sedes distintas;
- nombre, descripción, costo en puntos, vigencia o elegibilidad deben provenir de su fuente vigente, no de literales divergentes del home;
- una recompensa cuyo detalle no pueda confirmarse no se presenta como canjeable;
- un cliente con saldo insuficiente puede conocer una recompensa, pero la interfaz no debe presentarla como redención ejecutable si no cumple condiciones;
- el home no genera ticket, QR de redención ni transición de estado de canje;
- el CTA de detalle entrega al catálogo de recompensas;
- las tarjetas de marca o sede no implican por sí mismas que exista un beneficio elegible.

---

#### 11. Relación con comercio y marcas

La compra permanece separada de la fidelización:

```text
HOME DE FIDELIZACION
!=
PORTAL DE COMPRAS
```

Cuando `SHOW_PURCHASE_FEATURES = false`, el home de puntos y beneficios debe seguir siendo íntegro y utilizable.

Cuando `SHOW_PURCHASE_FEATURES = true`:

- `Pedir` puede existir como CTA secundario;
- su destino es la selección de contexto de compra, no el catálogo de recompensas;
- no cambia el saldo ni confirma acumulación por sí mismo;
- no mezcla estados de pedido con estados de redención;
- `ActiveOrderNotice` permanece como proyección personal de pedido y no como parte del ledger de fidelización.

La existencia de una marca o sede en `BrandCard` no autoriza mostrar puntos, canjes o beneficios no confirmados para esa sede.

---

#### 12. Relación con Club

Club y fidelización permanecen contractualmente separados.

El home puede ofrecer entrada a Club solo cuando la capacidad esté habilitada, pero:

- `club_active` no determina el nivel PASS;
- `plan_code` no sustituye el tier de fidelización;
- `CLUB_WALLET.available_minor` y `pending_minor` son importes monetarios y nunca se suman, comparan ni muestran como puntos;
- el ledger Club no se mezcla con el historial de `VSCREEN-0111`;
- una falla de Club no vuelve indisponible el resumen de fidelización PASS.

---

#### 13. Separación cliente versus contexto laboral

El home sigue siendo una pantalla de cliente aunque el principal autenticado también tenga perfil laboral.

Reglas:

1. nivel, saldo, QR, recompensas e historial corresponden siempre al cliente autenticado;
2. rol laboral, sede laboral o simulación no cambian la identidad del cliente ni el saldo mostrado;
3. un error en `useEmployeeProfile`, `useEmployeeSites` o un override laboral no puede convertir el saldo del cliente en error ni ocultar el home de fidelización;
4. controles laborales se mantienen en una zona secundaria explícita y no se cuentan como acciones de fidelización;
5. ninguna acción del home concede acumulación, redención, ajuste o permiso laboral.

---

#### 14. Estados funcionales del home

El diseño reconoce los siguientes estados sin definir todavía copy final ni animaciones finales:

| Estado | Comportamiento contractual |
| --- | --- |
| `LOADING_IDENTITY` | no se afirma información de fidelización hasta conocer el cliente válido |
| `LOADING_LOYALTY` | se conserva estructura del home sin afirmar cifras desconocidas |
| `READY_WITH_BALANCE` | se muestran saldo, nivel, progreso y accesos permitidos |
| `READY_ZERO_BALANCE` | se muestra cero confirmado sin tratarlo como error |
| `READY_NO_REWARDS` | se conserva fidelización y se indica ausencia de rewards para el contexto, sin ocultar saldo |
| `PARTIAL_REWARDS_UNAVAILABLE` | saldo confirmado permanece visible; el resumen de rewards se degrada de forma independiente |
| `STALE` | datos confirmados anteriores pueden mostrarse solo con señal de frescura degradada |
| `ERROR_RETRYABLE` | no se inventan puntos, beneficios ni tier; se ofrece recuperación |

`PASS-UX-012` especializará carga, error, offline y recuperación. `PASS-UX-010` especializará mensajes comprensibles.

---

#### 15. Responsabilidad de cada tarea posterior

| Responsabilidad | Tarea propietaria |
| --- | --- |
| credencial y QR personal | `PASS-UX-003` |
| visibilidad de acumulación | `PASS-UX-004` |
| redención visible | `PASS-UX-005` |
| movimientos e historial | `PASS-UX-006` |
| catálogo completo de recompensas | `PASS-UX-007` |
| perfil, datos y consentimientos | `PASS-UX-008` |
| estados pendiente, usado y cancelado | `PASS-UX-009` |
| copy y mensajes de error | `PASS-UX-010` |
| rutas y navegación canónicas | `PASS-UX-011` |
| carga, error, offline y recuperación móvil | `PASS-UX-012` |
| validación con clientes reales | `PASS-UX-013` |

Esta tarea entrega las invariantes de home a esas tareas sin resolver por anticipado su detalle propietario.

---

#### 16. Hallazgos AS-IS y handoff

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `useUserData` convierte error de lectura en `loyalty_points: 0` | un fallo puede presentarse como saldo real cero | `PASS-UX-012` + implementación posterior | error y cero confirmado quedan estados distinguibles sin perder recuperación |
| `MembershipCard` usa la etiqueta `Escanear ID` aunque la acción abre el QR propio | la interfaz puede sugerir función de scanner que el cliente no ejecuta | `PASS-UX-003` | la acción comunica presentación de identificación personal y mantiene frontera con PULSO |
| `Home` mezcla resumen de fidelización, compra y tarjetas de marca | el home puede perder jerarquía de fidelización o insinuar beneficios inexistentes | `PASS-UX-002` / `PASS-UX-007` / `PASS-UX-011` | fidelización queda primaria, comercio secundario y rewards entregan a catálogo canónico |
| `HomeOptimized` monta `ActiveOrderNotice` sobre el home | pedido activo puede competir visualmente con el resumen de fidelización | `PASS-UX-011` / `PASS-UX-012` | la navegación y prioridad visual conservan una sola jerarquía de cliente |
| `Header` contiene controles laborales condicionales | contexto laboral puede contaminar una experiencia de cliente | tareas AUTH/PASS de frontera laboral ya existentes | controles laborales permanecen secundarios y no alteran identidad ni datos de fidelización |
| Club dispone de membership y wallet propios | riesgo de mezclar membresía o dinero Club con puntos PASS | tarea Club propietaria + `PASS-UX-002` como frontera visual | balances y estados conservan labels, fuentes y navegación independientes |

Ningún hallazgo autoriza modificación física desde esta tarea.

---

#### 17. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la separación de identidades de fidelización, ledger y saldo como proyección, la convergencia de experiencias, la frontera cliente/laboral y los riesgos del home ya están cubiertos por requisitos PASS vigentes. Esta tarea materializa el diseño objetivo y los handoffs sin introducir una obligación de prueba nueva ni alterar el Registro 04A.

---

#### 18. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-006` para convergencia de experiencia comercial, sede, recompensas e historial sin rutas paralelas divergentes;
- `TREQ-PASS-010` para identidad cliente separada, ledger inmutable, saldo como proyección y no duplicación de puntos o beneficios;
- `TREQ-PASS-015` para mantener el home como experiencia de cliente aunque exista contexto laboral embebido;
- `TREQ-PASS-033` para impedir que fallos de módulos laborales afecten la experiencia normal del cliente;
- `TREQ-PASS-035` a `TREQ-PASS-042` para conservar el inventario PASS y su relación con superficies canónicas durante el rediseño.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 19. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará únicamente después de que `PASS-UX-001` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-002` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, fuentes de `VSCREEN-0107`, `VPROC-0045`, 04A PASS, backlog de convergencia y el snapshot runtime accesible de `vento-pass/main`. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutó el home en un ambiente desplegado ni se probaron puntos, rewards, Club, compras o estados offline con un cliente real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 20. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-002 — Diseñar inicio de puntos y beneficios`.
- [x] El objetivo queda anclado a `VSCREEN-0107` y `VPROC-0045::STEP-ENTER_LOYALTY_HOME`.
- [x] `PASS-CUSTOMER-SURFACE-003` se conserva como referencia AS-IS sin declarar implementación objetivo completada.
- [x] Se separan saldo disponible, acumulado histórico, nivel, beneficio, recompensa, canje, promoción, Club membership y Club wallet.
- [x] El saldo se trata como proyección reconciliable y no como ledger primario.
- [x] Error o ausencia de lectura no pueden convertirse en cero confirmado.
- [x] Nivel y progreso se calculan sobre la métrica histórica definida, no sobre saldo gastable.
- [x] El home resume recompensas pero no sustituye el catálogo.
- [x] El home abre el QR personal pero no escanea ni ejecuta operación PULSO.
- [x] El home no genera ticket ni estado de redención.
- [x] El historial conserva pantalla y tarea propias.
- [x] Perfil y consentimientos conservan pantalla y tarea propias.
- [x] Compra permanece secundaria y gobernada por su feature flag.
- [x] `FIDELIZATION_ONLY_MODE` puede retirar compra sin degradar el home de fidelización.
- [x] Club y puntos PASS permanecen separados.
- [x] Contexto laboral no altera identidad ni datos del cliente.
- [x] Cada hallazgo AS-IS tiene propietario y condición de salida.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, Supabase, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-003` queda reservada y no se desarrolla en esta tarea.

---

#### 21. Límites

Esta tarea no:

- implementa el home;
- cambia `Home.tsx`, `HomeOptimized.tsx`, `MembershipCard.tsx` ni hooks;
- define el diseño interno del QR personal;
- define algoritmo, regla o tasa de acumulación;
- crea ni valida una redención;
- diseña el historial completo;
- diseña el catálogo completo de recompensas;
- diseña el perfil del cliente;
- decide copy final de errores;
- decide navegación global o aliases;
- resuelve todavía offline, retry, skeletons o recuperación visual final;
- modifica feature flags;
- mezcla puntos PASS con Club wallet;
- modifica PULSO;
- modifica datos o Supabase;
- crea migraciones, RLS, RPC, funciones, triggers o secretos;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- declara PASS completo;
- desarrolla `PASS-UX-003`.

---

#### 22. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-001 — Inventariar pantallas actuales de cliente`

**TAREA ACTUAL APROBADA**
`PASS-UX-002 — Diseñar inicio de puntos y beneficios`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-003 — Diseñar QR personal`
### ✅ PASS-UX-003 — Diseñar QR personal

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-002 — Diseñar inicio de puntos y beneficios
**Tarea siguiente:** PASS-UX-004 — Diseñar acumulación visible
**Tipo de tarea:** documental; diseño objetivo de identidad QR personal, semántica del payload, presentación, estados y fronteras de consumo de `VSCREEN-0108 — QR personal de identificación`; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, Wallet, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo del QR personal de PASS para que el cliente pueda presentar una credencial de identificación inequívoca, legible y coherente entre la app y Wallet, sin convertir esa credencial en autorización de acumulación, redención, venta, acceso laboral o cualquier otra mutación.

La tarea diseña `VSCREEN-0108 — QR personal de identificación` como `OWNER_WORKSPACE` de PASS y materializa `VPROC-0045::STEP-PRESENT_CUSTOMER_ID — Presentar identificación personal`.

El resultado fija qué representa el QR, qué puede contener, qué no puede contener, cómo se presenta, cómo lo consume PULSO y qué estados y handoffs deben respetarse. No implementa el contrato.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-002`, que entrega:

- `VSCREEN-0107` como home de fidelización;
- acceso desde el home hacia el QR personal como acción secundaria;
- separación entre saldo disponible, acumulación histórica, nivel, beneficio, recompensa, canje, promoción y Club;
- la regla de que el home abre la identificación personal pero no escanea ni ejecuta operación PULSO;
- la etiqueta objetivo de acceso como presentación del QR propio, no como scanner del cliente;
- la frontera cliente versus contexto laboral.

La frontera de esta tarea es exclusivamente la credencial QR personal. No absorbe acumulación visible, redención, historial, catálogo de recompensas, perfil, copy general de errores, navegación global ni estados offline finales.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla | `VSCREEN-0108 — QR personal de identificación` |
| Aplicación | `pass` |
| Proceso primario | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Paso primario | `VPROC-0045::STEP-PRESENT_CUSTOMER_ID — Presentar identificación personal` |
| Rol de la pantalla | `OWNER_WORKSPACE` |
| Superficie AS-IS de referencia | `QrModal` / `PASS-CUSTOMER-SURFACE` de identificación personal |
| Modalidad | credencial personal de cliente |
| Estado físico | sin instancia propia; contrato documental `DEFINE_ONCE` |

El QR es una proyección de identidad de cliente. No es una orden, un ticket de redención, una sesión laboral, una firma, un permiso ni una confirmación de efecto.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot observado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `8ea90e71477f73ab6848a20eef270f6bcb85b852` | plan, topología, `VSCREEN-0108`, `VPROC-0045`, 04A, contratos PULSO-PASS y validadores |
| `PASS-UX-002_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `b3de3a8499359a916b46a81c90159dfde8922162569ac5e6e736be3738d5e9be` | base documental inmediata aprobada por el usuario |
| repositorio PASS accesible `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil verificable |
| `src/components/home/QrModal.tsx` | blob `70e699e813222116b42bd8a6ebff8d56df09d670` | QR AS-IS, copy, Wallet y payload actual |
| `src/contexts/QrModalContext.tsx` | blob `c29e36ae92c99e97e94816c171e00ac49f71b0b8` | montaje global y fuente de identidad autenticada |
| `src/components/Home.tsx` | vigente en `vento-pass/main` | entrada AS-IS desde el home |
| `src/components/home/MembershipCard.tsx` | vigente en `vento-pass/main` | CTA AS-IS de apertura del QR |
| `supabase/functions/wallet-pass/index.ts` | vigente en `vento-shell/main` | proyección Wallet y barcode AS-IS |

La preparación de esta tarea usa la versión completa aprobada de `PASS-UX-002` aunque su incorporación al repositorio permanezca condicionada por el lifecycle documental anterior.

---

#### 5. Semántica contractual del QR personal

La credencial tiene una única semántica primaria:

```text
QR PERSONAL PASS
=
IDENTIFICADOR PRESENTABLE DEL CLIENTE
```

No significa:

```text
AUTORIZACION DE ACUMULACION
AUTORIZACION DE REDENCION
CONFIRMACION DE VENTA
CONFIRMACION DE SALDO
PERMISO LABORAL
SESION PULSO
FIRMA DEL TRABAJADOR
TICKET DE CANJE
```

Presentar, copiar, guardar o volver a mostrar el QR solo puede identificar al mismo sujeto según el contrato de identidad. Cualquier efecto posterior pertenece al proceso y a la autoridad del consumidor.

---

#### 6. Contrato del payload

El payload del QR debe conservar un formato canónico de Vento ID y cumplir simultáneamente:

1. identificar una única referencia de cliente resoluble por servidor;
2. mantener namespace inequívoco para impedir interpretar el mismo valor con otra semántica;
3. ser estable para la finalidad de identificación mientras la identidad siga vigente;
4. no contener saldo, puntos, tier, recompensa, redención, sede, rol laboral, permiso, correo, teléfono, documento, access token, refresh token ni secreto;
5. no ser tratado como evidencia de autorización;
6. permitir rechazo fail-closed de formato desconocido, manipulado o con namespace incompatible;
7. admitir evolución versionada sin reutilizar silenciosamente un formato con significado distinto.

El formato AS-IS observado es:

```text
VENTO: + user.id
```

La app móvil, Apple Wallet y la proyección Wallet de `vento-shell` utilizan actualmente la misma semántica de barcode. Esta tarea no cambia el formato físico; lo clasifica como contrato de identificación y exige que cualquier evolución futura preserve compatibilidad explícita o tenga migración/versionado gobernado.

El identificador incluido en el barcode se considera dato identificador presentable, no secreto. Su posesión no concede ningún efecto empresarial.

---

#### 7. Contrato de presentación

La superficie objetivo presenta como mínimo:

| Elemento | Regla |
| --- | --- |
| identidad visual | Vento Pass claramente reconocible |
| título | comunica identidad propia, por ejemplo `Tu Vento ID` o `Mi QR` |
| nombre | nombre mínimo del cliente cuando esté disponible y permitido |
| QR | código principal legible, con contraste suficiente y sin elementos superpuestos que comprometan lectura |
| ayuda contextual | indica que se presenta para identificación en un punto autorizado |
| cierre | salida explícita sin mutar estado de fidelización |
| Wallet | acción secundaria independiente para guardar la misma identidad cuando la plataforma lo permita |

El CTA que abre esta superficie desde el home debe comunicar presentación, no escaneo. La etiqueta AS-IS `Escanear ID` se considera ambigua porque el teléfono del cliente no está escaneando; la intención correcta es `Mostrar mi QR`, `Mi QR` o equivalente aprobado por `PASS-UX-010` para copy final.

---

#### 8. App y Wallet conservan la misma identidad

La app y Wallet son dos presentaciones de la misma credencial personal, no dos identidades distintas.

Reglas:

- ambos canales representan el mismo cliente y namespace canónico;
- guardar en Wallet no crea una nueva cuenta ni un nuevo saldo;
- el token utilizado para autenticar la generación del Wallet pass nunca forma parte del barcode;
- Apple Wallet y Google Wallet no adquieren autoridad de acumulación o redención;
- una falla al generar o abrir Wallet no vuelve inválido el QR visible dentro de PASS;
- una credencial Wallet obsoleta o revocada deberá resolverse conforme al contrato de identidad vigente antes de cualquier operación;
- el ledger, saldo y tier pueden proyectarse visualmente en Wallet cuando exista contrato autorizado, pero nunca se convierten en autoridad transaccional del barcode.

---

#### 9. Frontera PASS → PULSO

PULSO consume la identificación; PASS no ejecuta la operación de caja.

Secuencia contractual:

```text
CLIENTE PRESENTA QR
        ↓
PULSO RECIBE FORMATO CANONICO
        ↓
PULSO VALIDA SESION + APP + SEDE + PERMISO DE IDENTIFICACION
        ↓
SERVIDOR RESUELVE IDENTIDAD
        ↓
SERVIDOR DEVUELVE PROYECCION MINIMA AUTORIZADA
        ↓
PULSO MUESTRA CLIENTE IDENTIFICADO
        ↓
CUALQUIER ACUMULACION O REDENCION EXIGE SU PROPIO COMANDO Y PERMISO
```

La identificación no hereda permisos de la acción posterior.

El consumidor debe respetar la cobertura ya establecida por `TREQ-PASS-022`, `TREQ-PASS-023` y `TREQ-PASS-024`: sesión válida, sede y permiso exactos, formato canónico, resolución server-side y proyección mínima.

---

#### 10. Separación entre QR personal y redención

`VSCREEN-0108` y `VSCREEN-0110` son identidades distintas.

| QR personal | Ticket o QR de redención |
| --- | --- |
| identifica cliente | representa intención o estado de redención |
| pertenece a `PASS-UX-003` | pertenece a `PASS-UX-005` |
| puede ser estable para identificación | conserva ciclo, vigencia y estado propios |
| no prueba saldo | depende de recompensa, saldo y reglas de redención |
| no se consume como canje | puede ser validado como canje por PULSO |
| repetirlo vuelve a identificar el mismo cliente | reutilizar un código de canje puede estar prohibido por estado |

PULSO debe conservar modos de identificación y redención separados aunque compartan el mismo contenedor `/scanner`.

---

#### 11. Copia, screenshot y replay

El QR personal no se diseña como secreto de un solo uso.

Una fotografía, screenshot o copia puede volver a presentar la misma identidad. Esa propiedad no puede transformarse en fraude por sí sola porque:

1. el QR no autoriza efectos;
2. el consumidor debe validar actor, sede, permiso y finalidad;
3. la resolución de identidad ocurre en servidor;
4. acumulación y redención tienen comandos, reglas e idempotencia propias;
5. un QR personal nunca sustituye firma del trabajador ni comprobación de operación.

Si una capacidad futura requiere prueba de posesión, desafío temporal o token de un solo uso, deberá modelarse como credencial distinta y no reinterpretar silenciosamente `VSCREEN-0108`.

---

#### 12. Privacidad y minimización

El QR y su resolución deben aplicar minimización de datos.

Prohibiciones:

- codificar correo, teléfono, documento o nombre en el QR;
- codificar saldo o tier como autoridad de negocio;
- codificar rol laboral, sede laboral o permisos;
- incluir tokens de sesión o secretos;
- devolver la fila completa de `public.users` al scanner como sustituto de una proyección mínima;
- mantener visible el perfil del cliente anterior después de limpiar, cambiar de cliente, cerrar sesión o expirar la operación.

La eliminación de la antigua policy amplia `users_select_cashier_for_qr` confirma que la resolución no debe depender de lectura directa completa de `public.users`.

---

#### 13. Estados funcionales de la superficie

La tarea reconoce estos estados sin definir todavía copy final ni estrategia offline completa:

| Estado | Contrato |
| --- | --- |
| `READY` | identidad autenticada disponible y QR presentable |
| `IDENTITY_LOADING` | no se afirma una credencial hasta resolver la identidad mínima necesaria |
| `IDENTITY_UNAVAILABLE` | no se muestra un QR vacío o inventado; se ofrece salida o recuperación |
| `WALLET_IDLE` | QR disponible; acción Wallet secundaria lista |
| `WALLET_ADDING` | generación/apertura Wallet en progreso sin bloquear el QR principal |
| `WALLET_ERROR` | Wallet falló pero la credencial PASS permanece disponible cuando `READY` |

`PASS-UX-010` definirá copy final de error y `PASS-UX-012` definirá carga, offline y recuperación. Esta tarea fija únicamente la semántica que esas tareas no podrán contradecir.

---

#### 14. Accesibilidad y legibilidad

El diseño debe conservar:

- tamaño de QR suficiente para lectura en condiciones normales de caja;
- zona limpia alrededor del código;
- contraste alto entre módulos y fondo;
- ausencia de overlays, shimmer o animaciones sobre los módulos del QR;
- nombre y contexto textual fuera del patrón QR;
- cierre accesible;
- respeto a preferencias de movimiento reducido para animaciones circundantes;
- orientación comprensible sin depender exclusivamente del color.

Estas reglas protegen la lectura sin convertir la tarea en certificación física de cámaras o POS.

---

#### 15. Hallazgos AS-IS y handoff

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `QrModal` codifica `VENTO:` seguido por `user.id` | el consumidor podría confundir identificador presentable con autorización o depender directamente del UUID interno | `PASS-UX-003` + `PASS-INT-004` / consumidor PULSO | formato clasificado como identificación, resolución server-side y ninguna mutación autorizada por posesión del código |
| `MembershipCard` etiqueta la acción `Escanear ID` | sugiere que el cliente ejecuta scanner en vez de mostrar su credencial | `PASS-UX-003` + `PASS-UX-010` | CTA final comunica presentación del QR propio |
| `QrModal` usa `userName` visible | una superficie presentada en público puede exponer más contexto del necesario | `PASS-UX-003` + revisión de privacidad posterior | nombre mínimo visible solo cuando esté permitido y sin datos adicionales en el barcode |
| `QrModal` usa `session.access_token` para generar Wallet | confundir transporte autenticado con contenido del barcode ampliaría exposición | implementación Wallet / integración correspondiente | token permanece solo en la solicitud autenticada y nunca entra en el QR |
| Android invoca actualmente endpoint Wallet remoto y Apple abre endpoint web | dos rutas de generación pueden divergir en identidad o barcode | integración Wallet propietaria | ambos canales conservan el mismo contrato de identidad y barcode canónico |
| la proyección Wallet de `vento-shell` también usa `VENTO:` seguido por `user.id` | compatibilidad actual depende del mismo formato | integración Wallet + consumidor PULSO | cualquier cambio de formato es versionado/migrado y no reinterpretado silenciosamente |
| PULSO comparte `/scanner` para identificación y redención | estado o semántica de un modo podría contaminar al otro | `TREQ-PASS-028` / PULSO | cambio de modo limpia estado incompatible y conserva contratos distintos |

Ningún hallazgo autoriza modificación física desde esta tarea.

---

#### 16. Responsabilidad de tareas posteriores

| Responsabilidad | Tarea propietaria |
| --- | --- |
| acumulación visible después de una operación confirmada | `PASS-UX-004` |
| redención visible y ticket/QR de canje | `PASS-UX-005` |
| historial de puntos y redenciones | `PASS-UX-006` |
| catálogo de recompensas | `PASS-UX-007` |
| perfil, privacidad y consentimientos | `PASS-UX-008` |
| estados de redención pendiente, usado y cancelado | `PASS-UX-009` |
| copy final y mensajes comprensibles | `PASS-UX-010` |
| rutas, aliases y navegación canónica | `PASS-UX-011` |
| carga, error, offline y recuperación | `PASS-UX-012` |
| pruebas con clientes reales | `PASS-UX-013` |
| resolución operativa de identidad y permisos de acciones en PULSO | `PASS-INT-004`, `PASS-INT-005` y contratos PULSO/AUTH aplicables |

---

#### 17. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la frontera entre QR personal e identificación operativa, la resolución server-side, la proyección mínima, la separación identificación/redención, la autorización PULSO y el inventario de `QrModal` ya cuentan con cobertura PASS vigente. Esta tarea materializa el diseño objetivo sin introducir una obligación de prueba nueva ni alterar el Registro 04A.

---

#### 18. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-022` para sesión, app, sede y permisos exactos de las acciones PULSO relacionadas con PASS;
- `TREQ-PASS-023` para formato canónico de Vento ID, resolución server-side y proyección mínima;
- `TREQ-PASS-024` para minimización y limpieza de datos personales en la tarjeta operativa;
- `TREQ-PASS-028` para mantener identificación y redención como modos separados del mismo scanner;
- `TREQ-PASS-034` para reconciliar PASS y PULSO sin duplicar ownership;
- `TREQ-PASS-038` para conservar `QrModal` como superficie lógica diferenciada;
- `TREQ-PASS-039` para impedir que el QR personal autorice acumulación, canje, venta o acceso laboral;
- `TREQ-PASS-040` para mantener la superficie fuera de operación interna de primera línea.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 19. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará únicamente cuando `PASS-UX-002` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-003` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, `VSCREEN-0108`, `VPROC-0045`, 04A PASS, contratos PULSO-PASS, `QrModal`, `QrModalContext` y proyecciones Wallet accesibles. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutó lectura física del QR, Wallet ni identificación PULSO en un ambiente desplegado o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-003` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 20. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-003 — Diseñar QR personal`.
- [x] El objetivo queda anclado a `VSCREEN-0108` y `VPROC-0045::STEP-PRESENT_CUSTOMER_ID`.
- [x] El QR queda definido como identificación personal y no como autorización.
- [x] La app y Wallet conservan una sola identidad semántica.
- [x] El payload no contiene saldo, tier, recompensa, redención, sede, rol, permiso, contacto ni secretos.
- [x] El formato AS-IS `VENTO:` seguido por `user.id` queda registrado sin declararlo autorización.
- [x] La resolución de identidad corresponde al servidor consumidor.
- [x] PULSO debe volver a validar sesión, sede y permiso de identificación.
- [x] Identificación y redención permanecen contratos distintos aunque compartan `/scanner`.
- [x] Copia o replay del QR no pueden producir por sí solos un efecto empresarial.
- [x] Wallet no incorpora tokens de sesión al barcode.
- [x] La falla de Wallet no bloquea la credencial principal cuando el QR está listo.
- [x] No se muestra un QR vacío como credencial válida.
- [x] La etiqueta AS-IS `Escanear ID` queda identificada como ambigua y entregada a copy final.
- [x] Cada hallazgo AS-IS tiene propietario y condición de salida.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, Supabase, Wallet runtime, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-004` queda reservada y no se desarrolla en esta tarea.

---

#### 21. Límites

Esta tarea no:

- implementa ni modifica `QrModal`;
- cambia el barcode actual;
- crea un token dinámico, challenge, OTP o credencial de un solo uso;
- modifica Wallet, Edge Functions o endpoints;
- modifica PULSO ni su `/scanner`;
- otorga puntos;
- crea o valida redenciones;
- diseña estados de canje;
- modifica políticas RLS, RPC, funciones, triggers, tablas o secretos;
- define copy final de todos los errores;
- define estrategia offline completa;
- certifica cámaras, lectores, POS o Wallet físicos;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- declara validación operativa realizada;
- desarrolla `PASS-UX-004`.

---

#### 22. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-002 — Diseñar inicio de puntos y beneficios`

**TAREA ACTUAL APROBADA**
`PASS-UX-003 — Diseñar QR personal`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-004 — Diseñar acumulación visible`
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
