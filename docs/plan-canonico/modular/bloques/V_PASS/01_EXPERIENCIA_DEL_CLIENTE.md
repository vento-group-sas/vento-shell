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
### ✅ PASS-UX-004 — Diseñar acumulación visible

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-003 — Diseñar QR personal
**Tarea siguiente:** PASS-UX-005 — Diseñar redención visible
**Tipo de tarea:** documental; diseño objetivo de visibilidad de acumulación confirmada, delta acreditado, saldo resultante y progreso de fidelización dentro de la experiencia cliente PASS, preservando la ejecución operativa de `VSCREEN-0085 — Identificación de cliente y acumulación` en PULSO; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, Wallet, PULSO, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo de acumulación visible de PASS para que el cliente pueda comprender cuándo una acumulación de puntos fue confirmada, cuánto valor de fidelización fue acreditado y cuál es el saldo resultante, sin convertir la interfaz cliente en ejecutora del otorgamiento ni anticipar un efecto que el servidor todavía no confirmó.

La tarea especializa la experiencia de `VSCREEN-0107 — Inicio del cliente y resumen de beneficios` después de un hecho de acumulación y la relaciona con `VSCREEN-0085 — Identificación de cliente y acumulación`, superficie PULSO que ejecuta la acumulación dentro de la operación comercial.

El resultado fija semántica, jerarquía visual, estados, frescura, idempotencia de presentación y handoffs. No implementa la acumulación, no define su tasa y no diseña la integración física PULSO → PASS.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-003`, que entrega:

- el QR personal como credencial de identificación y no como autorización de acumulación;
- resolución server-side de identidad por el consumidor;
- separación entre identificación, acumulación y redención;
- la obligación de que PULSO vuelva a validar sesión, sede, permiso y finalidad antes de ejecutar una acción;
- la regla de que copiar, fotografiar o volver a presentar el QR no produce efectos empresariales por sí solo.

Se conserva además la base de `PASS-UX-002`:

- `PUNTOS_DISPONIBLES` es saldo actualmente utilizable y una proyección reconciliable del ledger;
- `PUNTOS_GANADOS_HISTORICOS` es una métrica distinta usada para nivel y progreso;
- fallo, ausencia o timeout no equivalen a saldo cero confirmado;
- el home de fidelización resume estado personal sin ejecutar acumulación, redención ni operación PULSO.

La frontera de esta tarea es exclusivamente la presentación al cliente del resultado de acumulación. No absorbe el algoritmo o tasa de acumulación, la integración PULSO → PASS, el historial completo, la redención, el catálogo de recompensas, el copy final de errores ni la estrategia offline completa.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla PASS primaria | `VSCREEN-0107 — Inicio del cliente y resumen de beneficios` |
| Aplicación propietaria de la experiencia cliente | `pass` |
| Proceso | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Paso PASS relacionado | `VPROC-0045::STEP-ENTER_LOYALTY_HOME — Entrar a fidelización personal` |
| Pantalla ejecutora relacionada | `VSCREEN-0085 — Identificación de cliente y acumulación` |
| Aplicación ejecutora relacionada | `pulso` |
| Paso ejecutor relacionado | `VPROC-0045::STEP-IDENTIFY_CUSTOMER_AND_ACCRUE — Identificar cliente y acumular puntos` |
| Rol PASS | `OWNER_WORKSPACE` de presentación personal y saldo proyectado |
| Rol PULSO | `SUPERVISION_SURFACE` que ejecuta acumulación durante la venta sin mantener el ledger de PASS |
| Superficie AS-IS de referencia PASS | `PASS-CUSTOMER-SURFACE-003 — Home`, especialmente `MembershipCard` |
| Estado físico | sin instancia propia; contrato documental `DEFINE_ONCE` |

`PASS-UX-004` no crea una nueva identidad `VSCREEN-*`. La acumulación visible es una especialización del estado presentado por la experiencia PASS después de un efecto confirmado, mientras la ejecución transaccional permanece en PULSO.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot observado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `12d197d8ec058f393cbc7685f4a975601439c425` | plan, topología, catálogo de pantallas, `VPROC-0045`, 04A PASS, ownership y validadores |
| archivo propietario de PASS | blob `9be86bfbfa21f365a32c498fcc6444235b6712b9` | base remota con `PASS-UX-002` aprobada y marcador reservado de `PASS-UX-004` |
| `PASS-UX-003_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `caacd68cc0762c7635c4cad6304c152ecc445afbee3772564622972ee3c4b917` | base documental inmediata aprobada por el usuario |
| repositorio PASS accesible `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS verificable |
| `src/components/Home.tsx` | blob `ef6a3814dd54cb728b1473a0848a7cc4dd4e0df3` | separación AS-IS entre saldo disponible y total histórico ganado |
| `src/components/home/MembershipCard.tsx` | blob `82a2a7dd36acb3ed72b094f3268f3f466240a5e1` | presentación AS-IS de puntos, tier y progreso |
| `src/hooks/useUserData.ts` | blob `b37929f6d6f7a542fd3a37d995863265c3a38d5c` | lectura AS-IS de `loyalty_points` y fallback de error a cero |
| `src/hooks/useTotalEarnedPoints.ts` | blob `c578ff53d4b279e9481815fcd7d8776aa4bd5d57` | total histórico AS-IS y fallback de error a cero |
| `src/utils/tier.ts` | blob `71f4aa85747e9035547f29573392932191ba465d` | umbrales y cálculo de tier AS-IS que no se adoptan como regla empresarial por esta tarea |

La preparación usa la versión completa aprobada de `PASS-UX-003` como base inmediata aunque su publicación en `main` permanezca condicionada al cierre documental anterior.

---

#### 5. Semántica contractual de acumulación visible

La acumulación visible representa un resultado confirmado de fidelización y no una intención local de otorgar puntos.

```text
ACUMULACION VISIBLE PASS
=
PROYECCION DE UN EFECTO DE ACUMULACION YA CONFIRMADO
```

No significa:

```text
CALCULO AUTORITATIVO EN EL CLIENTE
ORDEN DE OTORGAR PUNTOS
CONFIRMACION ANTICIPADA
AUTORIZACION DERIVADA DEL QR
MUTACION DEL LEDGER
REINTENTO TRANSACCIONAL
REDENCION
AJUSTE MANUAL
```

La interfaz puede explicar el resultado; nunca lo fabrica.

---

#### 6. Unidad visible del resultado

Cuando exista evidencia confirmada y correlacionable de una acumulación, la experiencia puede presentar conjuntamente:

| Concepto visible | Significado | Regla |
| --- | --- | --- |
| puntos acreditados | delta positivo confirmado para un hecho de acumulación | se muestra únicamente desde un resultado confirmado; no se deriva localmente del monto de compra |
| saldo disponible resultante | proyección confirmada utilizable después del efecto | sustituye el saldo anterior únicamente cuando la fuente autorizada confirma el nuevo valor |
| nivel actual | categoría vigente derivada de la regla aplicable | no se recalcula desde una tasa inventada por la interfaz |
| progreso de nivel | avance derivado de la métrica histórica autorizada | no usa el saldo gastable como sustituto del acumulado histórico |
| referencia contextual | contexto mínimo que permita entender el origen cuando esté autorizado | no expone secretos, actor interno innecesario ni datos de otra venta |

Estas son identidades semánticas de presentación, no nombres de columnas, payloads, RPC, eventos ni contratos físicos.

---

#### 7. Jerarquía de presentación

Después de una acumulación confirmada, la jerarquía objetivo es:

1. **resultado** — comunicar que el efecto fue confirmado;
2. **delta** — destacar los puntos realmente acreditados cuando el resultado lo proporcione de forma correlacionable;
3. **saldo resultante** — mostrar la nueva proyección confirmada de puntos disponibles;
4. **progreso** — actualizar nivel y progreso solo desde fuentes válidas;
5. **detalle** — ofrecer acceso al historial cuando el cliente requiera trazabilidad adicional.

El feedback transitorio de delta no sustituye el saldo persistente. Si no existe una referencia estable que permita atribuir el delta a un hecho confirmado, PASS actualiza la proyección persistente sin inventar una animación o mensaje de puntos ganados.

---

#### 8. Frontera PULSO → PASS

La secuencia contractual de experiencia es:

```text
PULSO IDENTIFICA CLIENTE BAJO SU AUTORIDAD
        ↓
PULSO SOLICITA ACUMULACION MEDIANTE EL CONTRATO AUTORIZADO
        ↓
SERVIDOR VALIDA HECHO COMERCIAL + REGLA + ACTOR + SEDE + REFERENCIA
        ↓
SERVIDOR CONFIRMA EFECTO Y PROYECCION RESULTANTE
        ↓
PASS PUEDE MOSTRAR DELTA CONFIRMADO + SALDO RESULTANTE
        ↓
PASS CONSERVA ACCESO A HISTORIAL SIN REEJECUTAR EL EFECTO
```

La integración, correlación evento-cuenta-movimiento, idempotency key, reversión, compensación y conciliación detalladas pertenecen a `PASS-INT-001`. Esta tarea solo define qué puede afirmar la experiencia cliente cuando esos contratos entregan un resultado verificable.

---

#### 9. Regla de confirmación

PASS no presenta una acumulación como exitosa antes de la confirmación de servidor.

Reglas:

- una intención iniciada en PULSO no equivale a puntos acreditados;
- una respuesta de red perdida no autoriza asumir éxito ni fracaso definitivo;
- un cambio local de estado no modifica el saldo;
- una animación no precede al resultado confirmado;
- un resultado duplicado o `already applied` no vuelve a sumar el delta en la interfaz;
- una denegación, conflicto o error no conserva copy de éxito de una operación anterior;
- una actualización posterior del saldo debe reconciliarse con la fuente autorizada y no con aritmética acumulada en memoria del cliente.

---

#### 10. Estados funcionales de acumulación visible

La tarea reconoce los siguientes estados contractuales sin fijar todavía el copy final:

| Estado | Presentación permitida | Prohibición |
| --- | --- | --- |
| `NO_ACCRUAL_CONTEXT` | saldo normal de fidelización sin afirmar un evento reciente | inventar un delta |
| `ACCRUAL_PENDING_CONFIRMATION` | estado neutro de procesamiento cuando exista una operación correlacionada | mostrar “puntos ganados” o incrementar saldo por anticipado |
| `ACCRUAL_CONFIRMED` | delta confirmado, saldo resultante y progreso reconciliado cuando estén disponibles | recalcular el efecto desde datos de venta locales |
| `ACCRUAL_ALREADY_APPLIED` | resultado estable del mismo hecho sin segundo efecto visual acumulativo | volver a sumar o celebrar como una nueva acreditación |
| `ACCRUAL_REJECTED` | ausencia de acreditación y recuperación o salida correspondiente | conservar delta o saldo optimista |
| `ACCRUAL_CONFLICT` | estado no concluido que requiere reconciliación | elegir silenciosamente entre valores incompatibles |
| `CONFIRMED_NO_DELTA` | saldo confirmado sin presentar `+0` como una ganancia | tratar cero como éxito promocional |
| `BALANCE_STALE_AFTER_ACCRUAL` | último saldo confirmado con señal explícita de frescura degradada | mezclar un delta reciente con un saldo antiguo como si fueran una misma confirmación |

`PASS-UX-010` definirá el copy final y `PASS-UX-012` especializará carga, error, offline, retry y recuperación.

---

#### 11. Idempotencia de presentación

La idempotencia transaccional pertenece al servidor y a `PASS-INT-001`; la experiencia debe respetar su resultado.

Para la presentación:

1. el mismo resultado confirmado no genera múltiples incrementos visuales acumulativos;
2. reabrir el home no vuelve a acreditar visualmente un delta como si fuera un hecho nuevo;
3. pull-to-refresh no suma el último delta al saldo obtenido del servidor;
4. volver desde background no reproduce una acreditación sin evidencia de un nuevo hecho;
5. un replay del QR personal no activa feedback de acumulación;
6. si la correlación estable del hecho no está disponible, se omite el feedback transitorio y se conserva únicamente la proyección de saldo confirmada;
7. la clave o identidad física que permita correlacionar el hecho no se diseña en esta tarea.

---

#### 12. Saldo, acumulado histórico y progreso

La acumulación visible no colapsa tres magnitudes distintas:

```text
DELTA ACREDITADO DEL HECHO
!=
SALDO DISPONIBLE
!=
ACUMULADO HISTORICO PARA NIVEL
```

Consecuencias:

- el delta describe un único hecho confirmado;
- el saldo disponible es la proyección utilizable actual y puede disminuir por redenciones u otros movimientos válidos;
- el acumulado histórico puede conservarse aunque el saldo gastable disminuya;
- nivel y progreso no deben derivarse de sumar el delta al saldo visible;
- una reversión o ajuste posterior no se representa como nueva acumulación;
- la tarea no fija la tasa de acumulación ni los umbrales de nivel.

Los umbrales hardcodeados observados en `src/utils/tier.ts` quedan registrados como AS-IS y no se elevan a regla empresarial canónica por esta tarea. La implementación posterior deberá consumir la regla vigente y versionada definida por el dominio propietario.

---

#### 13. Frescura, cero y fallo de lectura

Se preserva el contrato de certeza de `PASS-UX-002`.

- `0` solo es saldo confirmado cuando una fuente válida confirma cero;
- un error de `useUserData` no puede convertirse en evidencia de saldo cero;
- un error de `useTotalEarnedPoints` no puede convertirse en evidencia de nivel inicial o progreso cero;
- un valor cacheado puede mostrarse únicamente con semántica de frescura adecuada;
- un delta confirmado no autoriza afirmar un saldo nuevo si la proyección resultante no pudo confirmarse;
- un saldo confirmado nuevo no autoriza inventar cuál fue el delta del último hecho;
- saldo, delta y acumulado histórico pueden tener frescuras diferentes y no deben fusionarse en una sola afirmación si sus evidencias no coinciden.

---

#### 14. Relación con historial y comprobación del movimiento

`PASS-UX-004` puede ofrecer un handoff hacia `VSCREEN-0111 — Historial de puntos y redenciones`, pero no replica el ledger completo.

El resumen de acumulación reciente puede exponer únicamente el contexto mínimo autorizado para comprender el efecto. El detalle de movimientos, ajustes, reversión, origen, fecha y trazabilidad corresponde a `PASS-UX-006` y a los contratos de integración aplicables.

Si una proyección visible y el historial posteriormente discrepan, la interfaz no resuelve la contradicción por suma local: debe entrar en estado de reconciliación o recuperación gobernado por las tareas propietarias.

---

#### 15. Relación con Wallet

Wallet puede proyectar saldo o nivel cuando exista un contrato autorizado, pero no se convierte en autoridad de acumulación.

Reglas:

- una actualización tardía de Wallet no revierte ni vuelve a ejecutar un efecto;
- el barcode del QR personal no contiene el delta ni concede acumulación;
- la app PASS y Wallet pueden tener distinta frescura temporal sin convertirse en dos ledgers;
- una notificación o cambio de pase no sustituye la confirmación transaccional del servidor;
- la experiencia cliente no debe sumar localmente un delta al valor mostrado por Wallet para producir un saldo supuesto.

---

#### 16. Accesibilidad y movimiento

El feedback visible de acumulación debe conservar:

- comprensión sin depender exclusivamente del color;
- contraste suficiente para delta, saldo y estado;
- lectura numérica clara y diferenciación entre saldo y progreso;
- soporte a preferencias de movimiento reducido;
- animaciones decorativas que no oculten ni retrasen la cifra confirmada;
- ausencia de confeti, pulse o incremento animado antes de confirmación;
- estabilidad del valor final aunque la animación se omita.

La animación es feedback; nunca evidencia del efecto.

---

#### 17. Hallazgos AS-IS y handoff

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `Home.tsx` usa `userData?.loyalty_points || 0` como saldo visible | ausencia o error puede colapsar a cero antes de distinguir certeza | `PASS-UX-012` + implementación posterior | cero confirmado, unavailable y stale quedan estados distintos |
| `useUserData` guarda `loyalty_points: 0` ante error o excepción | un fallo técnico puede presentarse como pérdida total del saldo | `PASS-UX-012` + consumidor de datos | el error preserva estado de incertidumbre y no se cachea como saldo confirmado |
| `useTotalEarnedPoints` guarda `0` ante error | tier y progreso pueden retroceder visualmente por fallo de lectura | `PASS-UX-012` + contrato de métrica histórica | error no se convierte en acumulado histórico confirmado de cero |
| `MembershipCard` presenta puntos, tier y progreso, pero no distingue un resultado de acumulación reciente | el cliente puede ver un saldo cambiado sin comprender el hecho o puede asociar una animación con una acreditación no confirmada | `PASS-UX-004` + implementación posterior | feedback de delta existe solo con resultado confirmado y saldo persistente permanece separado |
| `src/utils/tier.ts` contiene umbrales de tier hardcodeados | el cliente puede divergir de una regla empresarial futura o versionada | dominio de fidelización + implementación posterior | nivel y progreso consumen regla vigente gobernada; esta tarea no canoniza los umbrales AS-IS |
| PULSO `VSCREEN-0085` ejecuta identificación y acumulación | PASS podría duplicar lógica transaccional para explicar el resultado | `PASS-INT-001` + PULSO | ejecución permanece server-side y PASS consume una proyección confirmada |
| QR personal identifica pero no autoriza acumulación | un consumidor podría usar presencia o replay del QR como gatillo de feedback | `PASS-UX-003` + `PASS-UX-004` | presentar o repetir el QR nunca muestra acreditación sin efecto confirmado |

Ningún hallazgo autoriza modificación física desde esta tarea.

---

#### 18. Responsabilidad de tareas posteriores

| Responsabilidad | Tarea propietaria |
| --- | --- |
| redención visible y ticket o QR de canje | `PASS-UX-005` |
| historial completo de movimientos y redenciones | `PASS-UX-006` |
| catálogo de recompensas | `PASS-UX-007` |
| perfil, privacidad y consentimientos | `PASS-UX-008` |
| estados pendiente, usado y cancelado de redención | `PASS-UX-009` |
| copy final y mensajes comprensibles | `PASS-UX-010` |
| navegación y rutas canónicas | `PASS-UX-011` |
| carga, error, offline, retry y recuperación | `PASS-UX-012` |
| contrato detallado PULSO → PASS para acumulación, correlación, idempotencia, reversión y conciliación | `PASS-INT-001` |
| protección de acumulación en operación PULSO | `PULSO-AUTH-009` y contratos PULSO aplicables |
| prueba completa de acumulación | `PASS-QA-001` |

---

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la autoridad server-side de acumulación, ledger y saldo, la idempotencia, la separación entre identificación y efecto, la prohibición de mostrar éxito antes de confirmación y la consistencia de superficies PASS ya cuentan con cobertura vigente. Esta tarea materializa el diseño visible y sus estados sin introducir una obligación de prueba nueva ni alterar el Registro 04A.

---

#### 20. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-008` para exigir contratos de servidor autorizados, atómicos e idempotentes en acumulación, gasto, ajuste, reversión y redención;
- `TREQ-PASS-010` para ledger inmutable y reconciliable, saldo como proyección y conservación de evento origen, regla y versión;
- `TREQ-PASS-025` para confirmar juntos saldo y ledger al otorgar puntos y evitar duplicación ante reintentos o respuesta perdida;
- `TREQ-PASS-026` para exigir una referencia de idempotencia estable derivada del hecho empresarial;
- `TREQ-PASS-032` para impedir que la interfaz muestre puntos otorgados antes de confirmación de servidor y distinguir duplicado, conflicto, denegación y resultado ya aplicado;
- `TREQ-PASS-034` para mantener PULSO como operación propietaria sin duplicar sus mutaciones dentro de PASS;
- `TREQ-PASS-039` para impedir que el QR personal autorice acumulación;
- `TREQ-PASS-041` y `TREQ-PASS-042` para conservar la reconciliación entre superficies canónicas, runtime e inventario verificable.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará únicamente cuando `PASS-UX-003` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-004` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, el archivo propietario, topología `PASS-UX`, catálogo `VSCREEN-*`, `VPROC-0045`, 04A PASS, ownership PULSO-PASS, `vento-pass/main`, `Home`, `MembershipCard`, `useUserData`, `useTotalEarnedPoints` y `tier.ts`. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutó una venta, acumulación, actualización de saldo, animación, Wallet ni reconciliación en ambiente desplegado o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-004` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 22. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-004 — Diseñar acumulación visible`.
- [x] La acumulación visible se especializa sobre `VSCREEN-0107` sin inventar una nueva pantalla canónica.
- [x] `VSCREEN-0085` permanece como superficie PULSO que ejecuta acumulación durante la venta.
- [x] PASS solo afirma puntos acreditados después de confirmación de servidor.
- [x] Delta acreditado, saldo disponible y acumulado histórico permanecen conceptos distintos.
- [x] Nivel y progreso no se calculan a partir del saldo gastable.
- [x] La tarea no fija tasa de acumulación ni canoniza los umbrales hardcodeados AS-IS.
- [x] Reintento, refresh, regreso desde background o replay del QR no duplican feedback de acreditación.
- [x] Un resultado `already applied` no se presenta como una nueva acumulación.
- [x] Fallo o ausencia de lectura no se convierten en cero confirmado.
- [x] Si no existe correlación estable de un delta, se actualiza únicamente la proyección confirmada sin inventar un evento.
- [x] La animación permanece subordinada al valor confirmado y a preferencias de movimiento reducido.
- [x] El historial completo queda reservado a `PASS-UX-006`.
- [x] La redención visible queda reservada a `PASS-UX-005`.
- [x] La integración, idempotencia transaccional, reversión y conciliación detalladas quedan reservadas a `PASS-INT-001`.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, PULSO runtime, Supabase, Wallet, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-005` queda reservada y no se desarrolla en esta tarea.

---

#### 23. Límites

Esta tarea no:

- implementa componentes o hooks de PASS;
- modifica `Home.tsx`, `MembershipCard.tsx`, `useUserData.ts`, `useTotalEarnedPoints.ts` ni `tier.ts`;
- modifica PULSO ni `VSCREEN-0085`;
- define tasa, fórmula, redondeo o elegibilidad de acumulación;
- canoniza umbrales de tier hardcodeados del runtime actual;
- crea columnas, tablas, vistas, RPC, funciones, triggers, eventos, colas o contratos físicos;
- inserta, actualiza ni reconcilia el ledger;
- calcula autoritativamente puntos desde el cliente;
- crea una nueva pantalla `VSCREEN-*`;
- diseña el historial completo;
- crea ni valida redenciones;
- define copy final de éxito o error;
- define estrategia offline o retry completa;
- modifica Wallet o su barcode;
- modifica datos, RLS, políticas, secretos o Supabase;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- declara validación operativa realizada;
- desarrolla `PASS-UX-005` ni `PASS-INT-001`.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-003 — Diseñar QR personal`

**TAREA ACTUAL APROBADA**
`PASS-UX-004 — Diseñar acumulación visible`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-005 — Diseñar redención visible`
### ✅ PASS-UX-005 — Diseñar redención visible

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-004 — Diseñar acumulación visible
**Tarea siguiente:** PASS-UX-006 — Diseñar historial
**Tipo de tarea:** documental; diseño objetivo de creación, confirmación y presentación de la intención de redención de cliente en `VSCREEN-0110 — Ticket o QR de redención`, preservando la validación y consumo operativo de `VSCREEN-0086 — Redención de puntos o beneficios` en PULSO; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, PULSO, Wallet, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo de redención visible de PASS para que el cliente pueda seleccionar una recompensa elegible, revisar el efecto esperado, confirmar la creación de una intención de redención y recibir un ticket o QR de un solo uso con estado y vigencia visibles, sin confundir la creación del ticket con el consumo efectivo del beneficio.

La tarea diseña `VSCREEN-0110 — Ticket o QR de redención` como superficie de cliente asociada a `VPROC-0045::STEP-CREATE_REDEMPTION_INTENT — Crear ticket de redención` y la entrega a `VSCREEN-0086 — Redención de puntos o beneficios`, donde PULSO ejecuta la validación y consumo dentro de la operación comercial.

El resultado fija semántica, flujo, jerarquía de confirmación, credencial visible, vigencia, certeza, protección frente a reintentos, límites de presentación y handoffs. No implementa la redención, no define el contrato físico PULSO → PASS y no absorbe la taxonomía completa de estados de `PASS-UX-009`.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-004`, que entrega:

- la regla de que una interfaz PASS solo puede afirmar un efecto empresarial después de confirmación autoritativa;
- separación entre resultado confirmado, saldo proyectado y feedback de interfaz;
- prohibición de fabricar éxito desde cálculo local, caché, refresh, replay o reintento;
- obligación de reconciliar resultados ambiguos antes de presentar un efecto nuevo;
- preservación de PULSO como ejecutor de la operación comercial relacionada.

Se conserva además la base aprobada de `PASS-UX-003`:

- el QR personal identifica al cliente y no es un ticket de redención;
- presentar el Vento ID no autoriza canje, gasto de puntos ni efecto comercial;
- el consumidor debe resolver y validar identidad por servidor bajo su propio contexto.

La frontera de esta tarea es exclusivamente la experiencia visible de creación y presentación de la intención de redención. No diseña el catálogo completo de recompensas, el historial, la taxonomía completa pendiente/usado/cancelado, el copy final de errores, la navegación global, la estrategia offline completa ni la integración transaccional detallada.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla PASS primaria | `VSCREEN-0110 — Ticket o QR de redención` |
| Aplicación propietaria de la experiencia cliente | `pass` |
| Proceso | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Paso PASS primario | `VPROC-0045::STEP-CREATE_REDEMPTION_INTENT — Crear ticket de redención` |
| Rol PASS | `OWNER_WORKSPACE` que prepara y presenta una intención de redención |
| Pantalla PULSO relacionada | `VSCREEN-0086 — Redención de puntos o beneficios` |
| Paso PULSO relacionado | `VPROC-0045::STEP-REDEEM_LOYALTY_VALUE — Redimir puntos o beneficios` |
| Rol PULSO | `SUPERVISION_SURFACE` que valida y consume una redención autorizada dentro de la venta |
| Pantalla de origen relacionada | `VSCREEN-0109 — Catálogo de beneficios y recompensas` |
| Pantalla de auditoría posterior | `VSCREEN-0111 — Historial de puntos y redenciones` |
| Superficies AS-IS de referencia | `RedeemModal`, `SuccessModal`, `QrPendingCard`, `QrFullscreenModal` y `RedemptionCard` embebidos en experiencias de fidelización |
| Estado físico | sin instancia propia; contrato documental `DEFINE_ONCE` |

`PASS-UX-005` no crea una nueva identidad `VSCREEN-*` y no convierte PASS en la superficie operativa de consumo. PASS crea y presenta la intención; PULSO valida y aplica su resultado autorizado.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot observado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `ed3d9ae995b4bf429f5e998cca23d0e175f27e70` | plan, continuidad, topología, ownership, catálogo de pantallas, 04A PASS y validadores |
| archivo propietario de PASS | blob `5d5eeb4f67264af97876adf113e1c702e6c48395` | base remota con `PASS-UX-003` aprobada y marcadores reservados posteriores |
| `PASS-UX-004_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `2152a678457b0e09a1fd3d74dd1b19b80819b7dfda896a4540ca69187c6787b9` | base documental inmediata aprobada por el usuario y todavía pendiente de publicación |
| repositorio PASS accesible `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS verificable |
| `src/components/vento/RedeemModal.tsx` | blob `318e11f3d9fb532bb5c21e14b9e98c8a6cd930eb` | confirmación AS-IS y cálculo local de puntos restantes |
| `src/components/vento/SuccessModal.tsx` | blob `2dc0479632def321af51781217a8b5c7a3d9a2ce` | mensaje AS-IS de éxito y presentación inicial del QR |
| `src/components/vento/QrPendingCard.tsx` | blob `062e1b3497fe98a60eedb1439fbd95fab1935540` | presentación AS-IS de QR pendiente |
| `src/components/vento/QrFullscreenModal.tsx` | blob `d195cc848d5b64a57cdd0a5b2a8865ff90bb8f86` | presentación ampliada AS-IS del ticket |
| `src/components/vento/RedemptionCard.tsx` | blob `cdd598ce60cb293d474ae8d276e957a6b887f2ce` | labels AS-IS de pendiente, usado y cancelado |
| `src/hooks/useLoyaltyRedemptions.ts` | blob `8ed79b6ddb2070a870ab9cfd286cc1e120a647c6` | shape AS-IS de redenciones y actualización Realtime |
| `src/utils/redemption.ts` | blob `845e4b33ba442bef12c40b8846c3730cfbe71319` | flujo AS-IS no atómico, generación cliente del QR y composición de redención + ledger |
| Registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` | cobertura de prueba vigente reutilizada sin modificación |
| catálogo proceso-pantalla canónico | blob `742ead71e5fc5c4ae85a3cb6a00feb858ba8c2a0` | identidades de `VSCREEN-0110`, `VSCREEN-0086` y pasos de `VPROC-0045` |
| auditoría técnica y backlog de seguridad/resiliencia | blob `2234bc064cc91e766e4e550fc8c3801d669ec894` | evidencia AS-IS de redención no atómica y contrato objetivo server-side |
| integraciones de fidelización PASS | blob `8ce60e373f68a9db8f20be0b9d10ec45ddfc17c9` | reserva explícita de `PASS-INT-002` para la integración PULSO → PASS de redención |

La preparación usa la versión completa aprobada de `PASS-UX-004` como base inmediata aunque su incorporación a `main` permanezca condicionada al cierre documental anterior.

---

#### 5. Semántica contractual de redención visible

La redención visible distingue la creación de una intención de su consumo efectivo.

```text
REDENCION VISIBLE PASS
=
INTENCION DE REDENCION CONFIRMADA POR SERVIDOR
+
CREDENCIAL DE UN SOLO USO
+
ESTADO Y VIGENCIA PROYECTADOS
```

No significa:

```text
BENEFICIO YA CONSUMIDO
DESCUENTO YA APLICADO EN LA VENTA
VALIDACION PULSO COMPLETADA
RESULTADO TERMINAL DE USO
CALCULO AUTORITATIVO EN EL CLIENTE
QR PERSONAL DE IDENTIFICACION
```

Crear el ticket habilita el siguiente paso del proceso; no demuestra que PULSO ya haya consumido la redención.

---

#### 6. Flujo objetivo de cliente

El flujo visible se organiza así:

```text
VSCREEN-0109
seleccionar recompensa
        ↓
REVISAR INTENCION
recompensa + costo + saldo confirmado + efecto esperado
        ↓
CONFIRMAR CREACION
comando autoritativo de servidor
        ↓
VSCREEN-0110
redencion creada + ticket/QR + estado + vigencia
        ↓
VSCREEN-0086 / PULSO
validar codigo + contexto + estado + actor + sede
        ↓
RESULTADO AUTORITATIVO
consumida / rechazada / no aplicable segun contrato
        ↓
PASS
reconciliar proyeccion e historial
```

La interfaz PASS no salta directamente desde selección a “usado” y no convierte la generación visual de un QR en prueba de consumo.

---

#### 7. Revisión previa y confirmación explícita

Antes de crear la intención de redención, la interfaz presenta una revisión comprensible del efecto solicitado.

| Elemento | Regla |
| --- | --- |
| recompensa | identidad y nombre provenientes de la proyección vigente, no de un literal alterno |
| sede o contexto aplicable | visible cuando condicione disponibilidad o uso; no puede inferirse desde una tarjeta equivocada |
| costo en puntos | valor vigente consultado para la recompensa |
| saldo disponible | último valor confirmado; un fallo de lectura no se transforma en cero |
| saldo posterior estimado | puede mostrarse únicamente como previsualización no autoritativa antes de la respuesta del servidor |
| consecuencia | comunica que se solicitará una redención y que el resultado definitivo depende de confirmación de servidor |
| acción | requiere confirmación explícita del cliente antes de iniciar la mutación |

La comparación local `saldo >= costo` puede orientar la interfaz, pero no concede elegibilidad ni reemplaza la validación de servidor. Una recompensa que parecía alcanzable puede ser rechazada si cambió saldo, costo, vigencia, sede, regla o estado.

---

#### 8. Resultado de creación y certeza visible

La interfaz solo entra al estado de ticket creado cuando el servidor devuelve un resultado confirmado y reconciliable de la misma operación.

El resultado mínimo visible debe permitir distinguir:

| Verdad confirmada | Presentación |
| --- | --- |
| intención creada | existe una redención identificable y consultable |
| credencial emitida o reservada | existe un código utilizable bajo el contrato autorizado |
| recompensa | se muestra la recompensa exacta asociada a la intención |
| costo aplicado | se muestra el valor de puntos confirmado para esa intención |
| efecto sobre saldo | se refleja únicamente el efecto confirmado o reservado que indique el servidor; no se inventa desde la resta local |
| estado actual | se presenta la verdad vigente de la intención sin anticipar consumo |
| vigencia | se presenta la ventana o condición de vigencia provista por la fuente autoritativa |

Si la respuesta no permite saber si la operación se aplicó, PASS no crea una segunda intención por inferencia. El resultado queda sujeto a recuperación y reconciliación mediante el contrato propietario.

---

#### 9. Creación exitosa no equivale a uso exitoso

El diseño debe mantener explícitamente dos verdades distintas:

```text
TICKET CREADO
!=
REDENCION USADA
```

Por tanto:

- el mensaje inmediatamente posterior a crear una intención no puede afirmar que el beneficio ya fue consumido;
- un QR pendiente no puede etiquetarse como “usado” ni como resultado terminal;
- la fecha de creación no puede presentarse como fecha de uso o validación;
- el cliente puede recibir una credencial lista para presentar sin que PULSO la haya validado todavía;
- solo una transición confirmada por el contrato autorizado puede permitir que PASS represente el uso efectivo.

`PASS-UX-009` definirá la diferenciación completa de estados pendiente, usado y cancelado; esta tarea fija únicamente la frontera semántica que esa taxonomía no podrá contradecir.

---

#### 10. Contrato de la credencial de redención

El ticket o QR de redención es una credencial de operación distinta del QR personal de identificación.

Debe cumplir simultáneamente:

1. originarse en el resultado autoritativo de creación de la intención;
2. ser emitido o reservado por servidor, no fabricado por el cliente mediante tiempo, aleatoriedad local o estado visual;
3. identificar de forma inequívoca la intención que será validada;
4. admitir validación de un solo uso según el estado autoritativo;
5. conservar correlación con cliente, recompensa y contexto sin codificar innecesariamente datos personales visibles en el payload;
6. no incorporar access token, refresh token, PIN laboral ni secreto de sesión;
7. no sustituir las validaciones de usuario, recompensa, sede, estado, vigencia, actor y no utilización previa;
8. devolver el mismo resultado para el mismo hecho ante replay idempotente cuando el contrato lo permita;
9. fallar cerrado ante código desconocido, manipulado, usado, cancelado, vencido o territorialmente incompatible.

Esta tarea no fija formato físico, longitud, algoritmo, endpoint ni nombre de campo. Esos detalles pertenecen al contrato de integración y servidor propietario.

---

#### 11. Presentación del ticket o QR

`VSCREEN-0110` debe hacer comprensible qué representa la credencial sin obligar al cliente a interpretar detalles técnicos.

Contenido mínimo de la presentación:

| Elemento | Regla |
| --- | --- |
| recompensa | nombre e identidad coherentes con la intención creada |
| QR o código | representación legible de la credencial confirmada |
| estado | verdad actual visible; nunca se infiere solo porque el QR exista |
| vigencia | fecha, ventana o condición comunicable proveniente de la fuente autoritativa |
| puntos comprometidos o aplicados | valor confirmado para la intención, sin nueva resta local |
| contexto de uso | sede o marca cuando el contrato limite dónde puede utilizarse |
| instrucción | explica que debe presentarse para validación; no declara que ya fue usado |
| salida | permite cerrar la vista sin cancelar ni alterar la intención por efecto de navegación |

El QR debe conservar contraste, zona limpia y tamaño suficiente. Estado, vigencia y resultado no dependen exclusivamente de color, animación o iconografía.

---

#### 12. Vigencia y usabilidad

La pantalla canónica exige estado y vigencia visibles.

Reglas:

- una credencial sin vigencia autoritativa disponible no se presenta como válida indefinidamente;
- una vigencia vencida no puede conservar el mismo tratamiento de una credencial utilizable;
- la interfaz no calcula una nueva fecha de expiración por su cuenta;
- la hora del dispositivo no constituye autoridad para extender o reactivar una intención;
- refresh, Realtime o regreso desde background pueden actualizar la proyección, pero no crear una vigencia nueva;
- la política exacta de expiración, cancelación y transición pertenece a los contratos propietarios y a `PASS-UX-009` cuando corresponda a la experiencia de estados.

La ausencia actual de una vigencia visible en el runtime se considera brecha de presentación, no autorización para inventar un campo o una duración.

---

#### 13. Sede, marca y contexto comercial

La redención visible conserva el contexto empresarial real de la intención.

Por tanto:

- un componente reutilizado entre Vento Café, Saudo u otro satélite no puede hardcodear una marca diferente como lugar de uso;
- la sede presentada debe provenir de la redención o de su proyección autorizada;
- una recompensa global y una recompensa restringida por sede no se presentan con la misma promesa territorial si sus contratos difieren;
- cambiar de pantalla o de satélite no migra una intención ya creada a otra sede;
- PULSO vuelve a validar sede y contexto al consumir la redención.

La convergencia de experiencias no autoriza duplicar una misma intención entre rutas estáticas y dinámicas.

---

#### 14. Reintento, doble toque y resultado ambiguo

La interfaz debe tratar la confirmación como una sola intención empresarial.

Reglas visibles:

1. después del primer submit, el control de confirmación deja de permitir envíos concurrentes mientras la solicitud esté en curso;
2. un timeout o pérdida de respuesta no se interpreta como “no ocurrió”; primero se recupera o reconcilia la operación;
3. un retry del mismo hecho debe reutilizar la identidad estable definida por el contrato de servidor;
4. una respuesta de “ya aplicado” o equivalente se presenta como recuperación del mismo resultado, no como una nueva redención;
5. refresh y Realtime no vuelven a disparar la mutación;
6. el QR no se regenera localmente por volver a abrir la pantalla;
7. una credencial existente se vuelve a consultar o presentar según su estado; no se reemplaza silenciosamente por otra.

La idempotencia transaccional, la clave estable y la reconciliación física permanecen reservadas a `PASS-INT-002` y a su implementación posterior.

---

#### 15. Relación con saldo y ledger

La redención puede afectar puntos, pero PASS no construye ese efecto mediante una secuencia de escrituras cliente.

Se preserva:

```text
COSTO DE RECOMPENSA
!=
RESTA LOCAL AUTORITATIVA

INTENCION DE REDENCION
!=
MOVIMIENTO DE LEDGER AISLADO
```

La interfaz puede mostrar antes de confirmar una previsualización matemática. Después de confirmar, saldo, gasto o reserva solo se presentan desde el resultado reconciliable del servidor.

La política exacta de si los puntos quedan debitados, reservados o sujetos a otra semántica durante el estado previo al uso no se decide en esta tarea. `PASS-INT-002` deberá definir el contrato transaccional sin contradecir la exigencia de que PULSO valide posteriormente estado, vigencia y no utilización previa.

---

#### 16. Relación con historial

`VSCREEN-0110` presenta la intención vigente; no sustituye `VSCREEN-0111`.

La experiencia puede ofrecer una salida hacia el historial o mostrar la existencia de la intención actual, pero:

- no replica el ledger completo;
- no reconstruye movimientos históricos desde el QR;
- no atribuye fecha de creación como fecha de uso;
- no oculta una redención histórica porque su credencial ya no sea utilizable;
- no decide cómo agrupar movimientos, redenciones, ajustes o reversos.

La consulta integral de movimientos permanece reservada a `PASS-UX-006`.

---

#### 17. Relación con catálogo y elegibilidad

`VSCREEN-0109` conserva la consulta de beneficios y recompensas; `PASS-UX-007` conserva el diseño completo de ese catálogo.

`PASS-UX-005` consume una recompensa ya seleccionada y solo fija estas invariantes:

- conocer una recompensa no acredita elegibilidad;
- una tarjeta que muestra “Canjear” no autoriza el efecto por sí sola;
- saldo local suficiente no sustituye la revalidación de costo, regla, sede, vigencia y disponibilidad;
- si la regla cambió entre catálogo y confirmación, la interfaz presenta el resultado actual y no fuerza el valor anterior;
- el ticket se crea únicamente para una recompensa que el servidor acepte bajo la regla vigente.

---

#### 18. Online, caché y recuperación

La creación y consumo de redención requieren verdad autoritativa y no se confirman desde caché.

Esta tarea fija únicamente:

- una recompensa cacheada puede servir como referencia de lectura, nunca como autorización de canje;
- una intención no se declara creada mientras el servidor no confirme un resultado;
- una credencial cacheada puede volver a mostrarse solo si conserva una proyección identificable de su estado y la interfaz comunica cualquier degradación de frescura;
- la app no crea una nueva redención offline para sincronizarla después por inferencia;
- un fallo de red no convierte la intención en cancelada ni usada.

`PASS-UX-012` diseñará el tratamiento final de carga, error, offline y recuperación móvil. `PASS-UX-010` definirá el copy final correspondiente.

---

#### 19. Hallazgos AS-IS y handoff

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `RedeemModal` calcula `puntos restantes` como resta local entre saldo y costo | presentar como definitivo un valor que el servidor todavía no confirmó | `PASS-UX-005` + `PASS-INT-002` | la resta previa queda claramente como previsualización y el resultado posterior proviene de la operación autoritativa |
| `RedeemModal` afirma que la acción “no se puede deshacer” antes de que exista contrato final de cancelación/reversión | promesa irreversible no demostrada | `PASS-UX-009` + `PASS-UX-010` + `PASS-INT-002` | estado, reversibilidad y copy se alinean con el contrato final sin afirmar irreversibilidad por defecto |
| `processRedemption` lee saldo, genera QR e inserta redención y ledger desde el cliente en pasos separados | doble gasto, redención huérfana, carrera y resultado ambiguo | `PASS-INT-002` + `PASS-QA-002` | una operación server-side atómica e idempotente crea el efecto y emite o reserva el código |
| el QR AS-IS se genera con tiempo y aleatoriedad local | credencial no gobernada por la operación autoritativa y regenerable desde cliente | `PASS-INT-002` | el servidor emite o reserva una credencial estable asociada a la intención |
| `SuccessModal` muestra “Canje exitoso” inmediatamente después de crear una redención `pending` | confundir ticket creado con beneficio ya consumido | `PASS-UX-005` + `PASS-UX-010` | el resultado de creación comunica intención/ticket confirmado sin afirmar uso antes de PULSO |
| `SuccessModal` indica “Muéstralo en Vento Café” aunque el componente se usa en otras experiencias | uso en sede o marca incorrecta | `PASS-UX-005` + implementación posterior | el contexto visible proviene de la intención y nunca de un literal de otra marca |
| `QrPendingCard` muestra “Listo para usar” únicamente por estar en la lista pending | omitir vigencia, elegibilidad actual o degradación de estado | `PASS-UX-005` + `PASS-UX-009` | usabilidad visible depende de estado y vigencia autoritativos; la taxonomía final queda en la tarea de estados |
| `QrFullscreenModal` etiqueta `created_at` como “Canjeado el” | presentar creación como consumo | `PASS-UX-005` + `PASS-UX-009` + `PASS-UX-010` | fecha de creación y fecha de validación/uso permanecen semánticamente separadas |
| el shape móvil actual no expone una vigencia visible en el ticket | `VSCREEN-0110` no puede demostrar hasta cuándo puede usarse la credencial | `PASS-INT-002` + implementación de `PASS-UX-005` | la proyección autorizada entrega la vigencia necesaria y la interfaz la representa sin inventarla |

Ningún hallazgo autoriza modificación física desde esta tarea.

---

#### 20. Responsabilidad de tareas posteriores

| Responsabilidad | Tarea propietaria |
| --- | --- |
| movimientos, recibos e historial completo | `PASS-UX-006` |
| catálogo completo, condiciones y descubrimiento de recompensas | `PASS-UX-007` |
| perfil, privacidad y consentimientos | `PASS-UX-008` |
| taxonomía y presentación completa de pendiente, usado y cancelado | `PASS-UX-009` |
| copy final de confirmación, error y recuperación | `PASS-UX-010` |
| rutas y navegación canónicas | `PASS-UX-011` |
| carga, error, offline y recuperación móvil | `PASS-UX-012` |
| integración PULSO → PASS para redención, atomicidad, idempotencia, código, reversión y conciliación | `PASS-INT-002` |
| protección operativa de redención en PULSO | `PULSO-AUTH-010` y contratos posteriores aplicables |
| prueba completa de redención | `PASS-QA-002` |

`PASS-UX-005` no adelanta ni materializa esas responsabilidades.

---

#### 21. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la atomicidad e idempotencia de redención, la prohibición de mutar ledger desde cliente, la validación de código, usuario, recompensa, sede, estado, vigencia y no utilización previa, la separación entre QR personal y ticket de canje, la convergencia de superficies y la prohibición de mostrar una redención validada antes de confirmación de servidor ya cuentan con cobertura vigente. Esta tarea materializa el diseño visible, su frontera semántica y los handoffs sin introducir una obligación de prueba nueva ni alterar el Registro 04A.

---

#### 22. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-006` para convergencia de sede, recompensas e historial entre experiencias sin rutas divergentes;
- `TREQ-PASS-008` para exigir que gasto y redención se ejecuten mediante contratos de servidor autorizados, atómicos e idempotentes y no mediante inserciones cliente del ledger;
- `TREQ-PASS-010` para ledger inmutable y reconciliable, saldo como proyección y conservación de evento origen, regla y versión;
- `TREQ-PASS-027` para validar código, usuario, recompensa, sede, estado pendiente, vigencia, saldo debitado o reservado, actor y no utilización previa, con consumo atómico e idempotente;
- `TREQ-PASS-032` para impedir que la interfaz muestre un canje validado antes de confirmar el efecto y para distinguir resultados ambiguos o ya aplicados;
- `TREQ-PASS-034` para conservar propiedad y consumo entre PASS y PULSO sin duplicar mutaciones operativas;
- `TREQ-PASS-039` para mantener el QR personal separado de acumulación y redención operativa;
- `TREQ-PASS-041` y `TREQ-PASS-042` para conservar la reconciliación entre superficies canónicas, runtime e inventario verificable.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 23. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará únicamente cuando `PASS-UX-004` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-005` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, el archivo propietario, topología `PASS-UX`, catálogo y bindings `VSCREEN-*`, `VPROC-0045`, 04A PASS, ownership PULSO-PASS, hallazgos de redención no atómica, `vento-pass/main`, `RedeemModal`, `SuccessModal`, `QrPendingCard`, `QrFullscreenModal`, `RedemptionCard`, `useLoyaltyRedemptions` y `processRedemption`. |
| OPERATIVA | `NOT_EXECUTED` | No se creó, presentó, validó, consumió, canceló ni expiró una redención en ambiente desplegado, PULSO, POS o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-005` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 24. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-005 — Diseñar redención visible`.
- [x] El diseño queda anclado a `VSCREEN-0110` y `VPROC-0045::STEP-CREATE_REDEMPTION_INTENT`.
- [x] `VSCREEN-0086` y `STEP-REDEEM_LOYALTY_VALUE` permanecen como ejecución operativa PULSO.
- [x] Crear un ticket se diferencia explícitamente de consumir una redención.
- [x] La interfaz no afirma “usado” o equivalente terminal al crear una intención pendiente.
- [x] La fecha de creación no se presenta como fecha de uso.
- [x] El QR de redención permanece separado del QR personal de identificación.
- [x] La credencial de redención se emite o reserva desde el contrato autoritativo y no mediante `Date.now`, `Math.random` o estado cliente.
- [x] El ticket presenta recompensa, estado y vigencia sin inventar valores ausentes.
- [x] La elegibilidad local y la resta de puntos son previsualizaciones, no autoridad empresarial.
- [x] Saldo, gasto o reserva posterior se presentan solo desde un resultado confirmado y reconciliable.
- [x] Doble toque, timeout, retry, refresh y Realtime no crean una segunda intención por inferencia.
- [x] Un resultado ya aplicado se recupera como el mismo hecho y no como un nuevo canje.
- [x] El contexto de sede o marca no se hardcodea desde un componente reutilizado.
- [x] Un ticket vencido, cancelado, usado o incompatible no conserva tratamiento de credencial utilizable.
- [x] La taxonomía completa pendiente/usado/cancelado queda reservada a `PASS-UX-009`.
- [x] El historial completo queda reservado a `PASS-UX-006`.
- [x] El catálogo completo queda reservado a `PASS-UX-007`.
- [x] Atomicidad, idempotencia, formato del código, reversión y conciliación detalladas quedan reservadas a `PASS-INT-002`.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, PULSO runtime, Supabase, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-006` queda reservada y no se desarrolla en esta tarea.

---

#### 25. Límites

Esta tarea no:

- implementa `RedeemModal`, `SuccessModal`, `QrPendingCard`, `QrFullscreenModal`, `RedemptionCard` ni hooks;
- modifica `processRedemption`;
- crea endpoints, RPC, funciones, triggers, tablas, columnas, migraciones, RLS, políticas o secretos;
- define el algoritmo físico del código de redención;
- define la idempotency key física;
- ejecuta una redención o movimiento de puntos;
- valida códigos desde PULSO;
- cambia permisos de caja, sede o dispositivo compartido;
- define la política completa de cancelación, expiración, reversión o compensación;
- define la taxonomía completa de estados;
- diseña el historial completo;
- diseña el catálogo completo de recompensas;
- define copy final de éxito, advertencia o error;
- define navegación global;
- resuelve estrategia offline o recuperación completa;
- modifica Wallet;
- modifica datos o Supabase;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- declara validación operativa realizada;
- desarrolla `PASS-UX-006`, `PASS-UX-009` ni `PASS-INT-002`.

---

#### 26. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-004 — Diseñar acumulación visible`

**TAREA ACTUAL APROBADA**
`PASS-UX-005 — Diseñar redención visible`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-006 — Diseñar historial`
### ✅ PASS-UX-006 — Diseñar historial

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-005 — Diseñar redención visible
**Tarea siguiente:** PASS-UX-007 — Diseñar catálogo de recompensas
**Tipo de tarea:** documental; diseño objetivo de `VSCREEN-0111 — Historial de puntos y redenciones` como proyección personal reconciliable del ledger de fidelización y sus recibos de redención, preservando identidad de origen, atribución territorial, completitud explícita y separación entre movimiento contable y ciclo de redención; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, PULSO, Wallet, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo del historial de fidelización de PASS para que el cliente pueda consultar de forma completa, comprensible y reconciliable sus movimientos de puntos y sus redenciones, con referencia al hecho de origen, sin perder registros por filtros locales, sin duplicar un mismo canje como dos efectos independientes y sin convertir datos parciales o no atribuidos en una historia falsamente completa.

La tarea diseña `VSCREEN-0111 — Historial de puntos y redenciones` como workspace personal de `VPROC-0045::STEP-AUDIT_PERSONAL_LOYALTY_LEDGER — Consultar historial de puntos y redenciones`.

El resultado fija semántica, fuentes de verdad, composición de entradas, correlación ledger-redención, atribución de sede, cronología, completitud, filtros, detalle, reglas de no duplicación y handoffs. No implementa consultas, no cambia el esquema, no define la taxonomía completa de estados de redención de `PASS-UX-009` y no consolida todavía rutas o navegación de `PASS-UX-011`.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-005`, que entrega:

- separación entre creación de una intención de redención y consumo efectivo;
- obligación de conservar una identidad estable de redención;
- necesidad de correlacionar el gasto de puntos con la redención que lo originó;
- prohibición de presentar la fecha de creación como fecha de uso;
- prohibición de fabricar resultados terminales desde el cliente;
- preservación del ledger como verdad del movimiento de puntos;
- reserva de la taxonomía completa de estados a `PASS-UX-009`;
- reserva del contrato atómico e idempotente de redención a `PASS-INT-002`.

Se conserva además la base de `PASS-UX-004` y `PASS-UX-002`:

- `PUNTOS_DISPONIBLES` es una proyección reconciliable del ledger, no el ledger mismo;
- `PUNTOS_GANADOS_HISTORICOS` es una métrica distinta del saldo gastable;
- acumulación visible, saldo e historial no pueden reconciliarse mediante sumas locales inventadas;
- el home solo abre `VSCREEN-0111`; no replica el ledger completo;
- Club y su wallet monetaria permanecen separados del historial de fidelización PASS.

La frontera de esta tarea es exclusivamente la experiencia de consulta histórica de fidelización. No absorbe historial de pedidos, historial de Club, catálogo de recompensas, navegación global, estados finales de redención, copy final de errores ni estrategia offline completa.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla | `VSCREEN-0111 — Historial de puntos y redenciones` |
| Aplicación | `pass` |
| Proceso | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Paso | `VPROC-0045::STEP-AUDIT_PERSONAL_LOYALTY_LEDGER — Consultar historial de puntos y redenciones` |
| Patrón | `OWNER_WORKSPACE` |
| Autoridad del movimiento de puntos | ledger personal de fidelización confirmado |
| Autoridad del ciclo de redención | recibo/registro de redención confirmado |
| Evidencia AS-IS | `TransactionItem` y `RedemptionCard` embebidos en experiencias de fidelización |
| Topología | `DEFINE_ONCE` |
| Estado físico | `NO_PHYSICAL_INSTANCE` |

`VSCREEN-0111` no es historial de pedidos, timeline de entrega, historial financiero de Club ni historial laboral. Puede referenciar el hecho comercial que originó un movimiento, pero no absorbe el workspace propietario de ese hecho.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot observado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `1e8f4027c6b4a7de6c0050324530d0a9324861f7` | plan, continuidad, topología, ownership, catálogo de pantallas, 04A PASS y validadores |
| archivo propietario de PASS | blob `104c23ed19ee75e76af60689aa1212cd5e4bbb01` | base remota con `PASS-UX-004` aprobada y marcadores posteriores reservados |
| `PASS-UX-005_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `e8004a22f130c899c8659e2e654f774c6f6be82c678a55bd56538c7cb43ed256` | base documental inmediata aprobada por el usuario y todavía pendiente de publicación |
| repositorio PASS accesible `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS verificable |
| `src/hooks/useLoyaltyTransactions.ts` | blob `d96bfe5ea3251e643f109b73535b484a4a6c94c6` | shape AS-IS del ledger visible, orden descendente y límite de 100 filas |
| `src/components/vento/TransactionItem.tsx` | blob `8ae1c979eb79f39100da315d6303202d7c33b2d5` | presentación AS-IS de movimientos `earn`, `spend` y `adjust` |
| `src/components/vento/RedemptionCard.tsx` | blob `cdd598ce60cb293d474ae8d276e957a6b887f2ce` | presentación AS-IS de recibos de redención y etiquetas de estado |
| `src/components/Saudo.tsx` | blob `f63602bf604ff3c045256205bff09fbed0276dd2` | historial AS-IS basado en transacciones y exclusión de filas sin `metadata.site_id` |
| `src/components/VentoCafe.tsx` | blob `b7d592486b935f2f3415ddb4390390df9efa35f7` | historial AS-IS basado principalmente en redenciones |
| `src/components/SatelliteExperience.tsx` | blob `7d0cc7fd9be280844af2810b9c507dfad5764dc3` | historial dinámico AS-IS basado principalmente en redenciones |
| `src/utils/navigation.ts` | blob `0ea042e5fd30b2df98ebb98864b4c6a62a8f90eb` | acceso AS-IS `goToMovements` todavía expuesto como capacidad “Próximamente” |
| Registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` | cobertura vigente del historial, convergencia y ledger |
| catálogo proceso-pantalla canónico | blob `742ead71e5fc5c4ae85a3cb6a00feb858ba8c2a0` | identidad y propósito de `VSCREEN-0111` |
| auditoría de procesos parciales/legacy | blob `17da474928d7d0042170441ca79eb18dab412e72` | hallazgo de exclusión silenciosa de transacciones Saudo sin sede |
| auditoría técnica y backlog | blob `2234bc064cc91e766e4e550fc8c3801d669ec894` | backlog `BKL-PASS-002` de atribución histórica y convergencia PASS |

La preparación usa la versión completa aprobada de `PASS-UX-005` como base inmediata aunque su incorporación a `main` permanezca condicionada al cierre documental anterior.

---

#### 5. Semántica contractual del historial

El historial PASS representa hechos de fidelización confirmados y reconciliables.

```text
HISTORIAL PASS
=
MOVIMIENTOS DEL LEDGER
+
RECIBOS DE REDENCION
+
CORRELACION DE ORIGEN
+
ATRIBUCION EXPLICITA
+
CRONOLOGIA Y COMPLETITUD VISIBLES
```

No significa:

```text
SALDO RECONSTRUIDO POR EL CLIENTE
HISTORIAL DE PEDIDOS COMPLETO
LEDGER DE CLUB
LISTA DE REDENCIONES SIN MOVIMIENTOS
LISTA DE MOVIMIENTOS SIN RECIBOS
FILTRO DE SEDE QUE OCULTA DATOS LEGITIMOS
DUPLICACION DEL MISMO CANJE
```

El historial explica qué ocurrió con la fidelización del cliente y por qué, sin convertir una proyección de interfaz en nueva fuente de verdad.

---

#### 6. Unidad visible de historial

La unidad primaria es un `HECHO_DE_FIDELIZACION_VISIBLE`, construido desde una o más fuentes correlacionadas del mismo hecho empresarial.

Cada entrada debe poder expresar, cuando la fuente lo confirme:

| Campo visible o derivable | Regla |
| --- | --- |
| identidad estable | proviene del evento/ledger/recibo; no se genera desde índice visual |
| categoría | acumulación, redención, ajuste, reversión, compensación, expiración u otra categoría canónica disponible |
| delta de puntos | valor confirmado, con signo; puede ser no aplicable para un recibo sin movimiento de puntos |
| fecha principal | fecha autoritativa del hecho representado; no se sustituye por otra fecha de lifecycle |
| origen | compra, redención, reseña, ajuste autorizado u otra fuente confirmada |
| referencia de origen | referencia estable y segura cuando exista; no se infiere desde descripción libre |
| sede o contexto comercial | identidad canónica cuando exista atribución determinista |
| estado de atribución | atribuido, no atribuido o pendiente de reconciliación; nunca se oculta por ausencia de sede |
| detalle de redención | recompensa, costo confirmado y ciclo cuando el hecho incluya redención |
| información de soporte | identificador o referencia segura suficiente para investigación cuando corresponda, sin exponer secretos |

La interfaz puede resumir una entrada, pero no puede borrar la relación entre el movimiento y su hecho de origen.

---

#### 7. Ledger como autoridad de puntos

El ledger de fidelización es la autoridad del movimiento de puntos.

Reglas:

1. un `points_delta` visible debe provenir de un movimiento confirmado;
2. una redención visible no puede inventar un segundo débito adicional al ya representado por el ledger;
3. un recibo de redención puede aportar recompensa, estado, vigencia y referencias, pero no reemplaza el movimiento contable cuando existen puntos afectados;
4. el historial no recalcula `PUNTOS_DISPONIBLES` sumando las filas cargadas;
5. el historial no recalcula `PUNTOS_GANADOS_HISTORICOS` desde una ventana parcial de eventos;
6. un saldo o balance posterior solo se muestra cuando la fuente autoritativa lo entregue; no se reconstruye desde la lista local;
7. reordenar, filtrar o paginar la vista no cambia el saldo ni crea efectos.

El límite AS-IS de las últimas 100 transacciones impide tratar el conjunto local actual como un ledger completo.

---

#### 8. Recibo de redención como complemento del ledger

Una redención tiene dos dimensiones que no deben confundirse:

```text
MOVIMIENTO DE PUNTOS
=
EFECTO CONTABLE EN LEDGER

RECIBO DE REDENCION
=
INTENCION + RECOMPENSA + ESTADO + VIGENCIA + EVIDENCIA DE USO
```

Cuando una redención consume puntos, el historial usa el movimiento del ledger para el delta y el recibo para el ciclo de la redención.

Cuando una redención no afecte puntos, el recibo puede existir como entrada de historial sin inventar un delta.

`PASS-UX-009` seguirá siendo propietaria de la taxonomía completa de estados pendiente, usado y cancelado. `PASS-UX-006` reserva el espacio de presentación y consume el estado confirmado sin redefinir sus transiciones.

---

#### 9. Correlación ledger-redención y no duplicación

Un mismo canje no puede aparecer como dos efectos empresariales independientes cuando el ledger y el recibo describen el mismo hecho.

Regla objetivo:

```text
LEDGER SPEND
+ stable redemption_id / business reference
+ REDEMPTION RECEIPT
=
UNA ENTRADA COMPUESTA DE HISTORIAL
```

La correlación debe usar una referencia estable provista por el contrato o persistida en la fuente. No se permite fusionar registros por:

- misma fecha aproximada;
- mismo monto;
- mismo texto de descripción;
- mismo nombre de recompensa;
- cercanía temporal;
- posición en la lista.

Si falta correlación estable:

- no se descarta el movimiento del ledger;
- no se descarta el recibo de redención;
- no se inventa que son el mismo hecho;
- la vista los distingue como registros no correlacionados o pendientes de reconciliación;
- los resúmenes no cuentan ambos como dos débitos confirmados si solo uno es autoridad del efecto de puntos.

La reparación de correlación histórica o de datos pertenece a las tareas de integración/transición correspondientes, no a esta tarea documental.

---

#### 10. Categorías visibles y adaptación AS-IS

La experiencia debe poder representar las categorías semánticas aprobadas por el ledger aunque el runtime actual solo modele `earn`, `spend` y `adjust`.

| Categoría visible | Semántica |
| --- | --- |
| acumulación | incremento confirmado originado en una regla o hecho elegible |
| redención | uso o reserva de valor de fidelización correlacionado con su recibo |
| ajuste | corrección autorizada que no se presenta como acumulación comercial normal |
| reversión | deshace o compensa un efecto anterior conservando referencia al hecho original |
| compensación | movimiento correctivo con causa y referencia explícitas |
| expiración | reducción por regla de vigencia cuando exista contrato aprobado |

Esta matriz es semántica de presentación. No ordena crear nuevos valores de base de datos ni modifica el enum AS-IS.

El cliente no clasifica eventos leyendo palabras de `description`; la clasificación procede del contrato o de un adaptador gobernado.

---

#### 11. Hecho de origen y trazabilidad visible

Todo movimiento debe conservar o poder resolver el hecho que lo originó cuando exista.

Ejemplos válidos de origen incluyen:

- compra elegible;
- redención;
- reseña o actividad promocional autorizada;
- ajuste manual autorizado;
- reversión de un evento previo;
- compensación;
- expiración por regla versionada.

La vista puede presentar una etiqueta humana y un detalle contextual, pero la referencia técnica no se sustituye por texto libre.

Cuando el origen sea una compra o pedido, `VSCREEN-0111` puede ofrecer referencia o handoff hacia la experiencia propietaria; no replica el historial completo del pedido ni sus estados operativos.

Cuando el origen sea feedback, reseña, reclamo u otra interacción, el historial muestra únicamente el efecto de fidelización confirmado y su referencia; no convierte esa interacción en un nuevo tipo de caso dentro de PASS.

---

#### 12. Atribución de sede y estado sin atribución

La atribución territorial debe ser determinista o explícitamente desconocida.

Reglas:

1. `site_id` confirmado se resuelve contra la identidad canónica de sede;
2. marca, nombre, dirección o etiqueta comercial no se deducen desde literales divergentes;
3. una fila legítima sin `site_id` no se elimina del historial;
4. una fila sin atribución determinista se presenta como `SIN_ATRIBUCION` o equivalente comprensible, no como perteneciente a la sede abierta;
5. una vista contextual por sede no puede hacer desaparecer definitivamente eventos no atribuidos; el historial canónico conserva acceso a ellos;
6. backfill o reconciliación posterior puede completar atribución sin cambiar el hecho original;
7. la ausencia de sede no se corrige mediante heurística de descripción, fecha o recompensa.

El filtro AS-IS de Saudo que devuelve `false` cuando falta `metadata.site_id` se considera incompatible con este contrato porque oculta silenciosamente movimientos legítimos.

---

#### 13. Convergencia entre Vento Café, Saudo y satélites dinámicos

Todas las experiencias que proyecten `VSCREEN-0111` deben respetar la misma semántica de historial.

Estado AS-IS observado:

| Superficie | Historial visible actual | Brecha |
| --- | --- | --- |
| `VentoCafe` | redenciones agrupadas por fecha y estado | no representa conjuntamente el ledger de puntos |
| `Saudo` | movimientos de `loyalty_transactions` filtrados por `metadata.site_id` | no representa conjuntamente recibos de redención y omite filas sin sede |
| `SatelliteExperience` | redenciones agrupadas por fecha y estado | no representa conjuntamente el ledger de puntos |

Contrato objetivo:

- ninguna ruta puede definir una historia funcionalmente distinta para el mismo cliente;
- el mismo hecho correlacionado conserva identidad y significado entre experiencias;
- la selección de marca o sede puede cambiar contexto y filtros permitidos, no la verdad del ledger;
- experiencias estáticas y dinámicas deben converger antes de considerarse equivalentes;
- una implementación temporal puede reutilizar componentes distintos, pero su resultado semántico debe ser compatible.

La consolidación de rutas y aliases permanece reservada a `PASS-UX-011`.

---

#### 14. Cronología y fechas

El historial distingue fechas con semántica diferente.

| Fecha | Uso |
| --- | --- |
| fecha del movimiento | momento autoritativo del efecto en ledger |
| fecha de creación de redención | creación de la intención o recibo |
| fecha de validación/uso | consumo efectivo cuando exista |
| fecha de cancelación/reversión | transición correctiva cuando exista |
| fecha de origen comercial | referencia del hecho externo cuando el contrato la provea |

Reglas:

- `created_at` de una redención no se presenta como fecha de uso;
- el orden visual se basa en una cronología autoritativa identificada, no en el orden de llegada al cliente;
- si solo existe una fecha técnica, se presenta con su significado real sin renombrarla como otra;
- eventos tardíos no se reescriben como si hubieran ocurrido en el momento de sincronización;
- zona horaria y formateo visual no alteran el instante persistido.

La definición final de copy de fechas permanece sujeta a `PASS-UX-010` cuando corresponda.

---

#### 15. Completitud, ventana y paginación

Una lista parcial no puede presentarse como historial completo.

El contrato visible distingue al menos:

```text
HISTORIAL_COMPLETO_SEGUN_CONTRATO
HISTORIAL_PARCIAL_CON_MAS_DATOS
HISTORIAL_FILTRADO
HISTORIAL_SIN_ATRIBUCION_COMPLETA
LECTURA_NO_DISPONIBLE
```

Reglas:

1. un límite técnico de filas debe acompañarse de paginación, carga incremental o alcance visible;
2. `limit(100)` no autoriza afirmar que se muestran todos los movimientos históricos;
3. filtros no modifican el conjunto subyacente ni se interpretan como ausencia de eventos;
4. una página vacía tras un cursor no equivale a “nunca hubo movimientos” sin conocer el alcance consultado;
5. totales históricos no se derivan de la página cargada;
6. refresh conserva identidad de elementos y no duplica entradas ya recibidas;
7. carga incremental usa identidad estable, no índice de posición, para deduplicación.

`PASS-UX-012` definirá la experiencia completa de carga, error, offline, retry y recuperación. Esta tarea fija únicamente la verdad que esos estados deberán preservar.

---

#### 16. Orden, agrupación y filtros

La experiencia puede ofrecer agrupación y filtros para comprensión sin cambiar la verdad de origen.

Dimensiones permitidas de diseño:

- periodo o fecha;
- categoría de movimiento;
- presencia de redención;
- sede o marca cuando exista atribución determinista;
- estado de redención una vez consumido el contrato de `PASS-UX-009`.

Reglas:

- `Todos` significa todos los elementos dentro del alcance realmente cargado/consultado, no “todo el historial de la cuenta” si existe paginación pendiente;
- filtrar por sede nunca elimina del modelo los eventos `SIN_ATRIBUCION`;
- filtrar por estado de redención no oculta movimientos de puntos que no sean redenciones;
- una agrupación por fecha no cambia la fecha semántica de la entrada;
- no se crean filtros basados en texto libre como mecanismo de clasificación autoritativa.

La selección exacta de controles visuales puede evolucionar durante implementación siempre que conserve estas invariantes.

---

#### 17. Detalle de una entrada

Cada entrada puede abrir o expandir detalle sin ejecutar nuevas mutaciones.

El detalle puede incluir, cuando exista y sea seguro:

- categoría y descripción humana;
- delta de puntos;
- fecha y hora;
- sede o estado sin atribución;
- origen y referencia;
- recompensa asociada;
- costo confirmado de redención;
- estado confirmado de la redención;
- fecha de creación y, separadamente, fecha de validación/uso;
- referencia a pedido, compra o recibo propietario;
- motivo de ajuste, reversión o compensación cuando esté autorizado para el cliente.

No expone:

- secretos;
- tokens;
- PIN laborales;
- metadata interna sin contrato de presentación;
- datos personales de otros actores;
- detalles administrativos que excedan la finalidad del cliente.

---

#### 18. Historial y saldo actual

Historial y saldo se complementan, pero no se sustituyen.

```text
SALDO ACTUAL
=
PROYECCION CONFIRMADA DEL LEDGER

HISTORIAL
=
SECUENCIA CONSULTABLE DE HECHOS Y RECIBOS
```

Por tanto:

- una discrepancia entre saldo y filas visibles no se “corrige” sumando localmente;
- un historial parcial puede no explicar por sí solo el saldo total;
- una operación reciente puede aparecer con distinta frescura en saldo e historial;
- la interfaz debe reconciliar o refrescar desde fuentes autoritativas, no insertar una fila sintética para hacer cuadrar valores;
- una entrada duplicada visual no puede compensarse ocultando otro movimiento real.

Los contratos de integración son responsables de la consistencia material entre ledger, saldo, redención y eventos de origen.

---

#### 19. Historial PASS frente a otros historiales

`VSCREEN-0111` conserva una frontera explícita:

| Historial | Propietario | Relación con `VSCREEN-0111` |
| --- | --- | --- |
| puntos y redenciones | PASS | contenido propietario de esta pantalla |
| pedidos y detalle | experiencia comercial PASS/PULSO correspondiente | solo referencia/handoff desde el hecho de origen |
| seguimiento de preparación y entrega | proceso comercial propietario | no se replica |
| Club wallet monetaria | Club | no se mezcla con puntos |
| pagos y conciliación | proceso financiero/comercial propietario | no se replica |
| casos, reclamos o conversaciones | proceso de servicio propietario | solo se referencia si originan un movimiento de fidelización |
| contexto laboral | aplicaciones laborales | no altera identidad, sede atribuida ni movimientos del cliente |

La palabra “historial” usada por otra superficie no autoriza fusionar dominios distintos en una sola lista.

---

#### 20. Hallazgos AS-IS y handoff

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `useLoyaltyTransactions` limita a 100 filas sin paginación visible | historial puede parecer completo siendo parcial | `PASS-UX-006` para contrato UX; implementación en package PASS correspondiente | paginación/carga incremental o alcance parcial explícito sin falsos totales |
| `Saudo` excluye movimientos sin `metadata.site_id` | pérdida silenciosa de historia legítima | `PASS-UX-006`, `PASS-QA-001`, `PASS-QA-002`, transición de datos aplicable | atribución determinista o presentación explícita sin atribución; cero omisión silenciosa |
| `VentoCafe` muestra redenciones en historial pero no el ledger de puntos | experiencia incompleta frente a `VSCREEN-0111` | `PASS-UX-006` | proyección convergente de movimientos y recibos |
| `SatelliteExperience` muestra redenciones en historial pero no el ledger de puntos | experiencia dinámica incompleta | `PASS-UX-006` | misma proyección semántica que el resto de PASS |
| `Saudo` muestra movimientos pero no recibos de redención en el mismo historial | falta de composición completa | `PASS-UX-006` | ledger y recibos reconciliados bajo una única semántica |
| `TransactionItem` usa solo `earn/spend/adjust` y descripción libre | semántica visible más estrecha que el contrato objetivo | adaptación de implementación PASS correspondiente | adaptador gobernado que represente categorías canónicas sin inferencia textual |
| `RedemptionCard` usa `created_at` como fecha principal incluso para recibos usados | posible confusión entre creación y uso | `PASS-UX-005`, `PASS-UX-006`, `PASS-UX-009` | fechas diferenciadas según evento confirmado |
| `goToMovements` comunica “Próximamente” | acción de movimientos no abre capacidad real | `PASS-UX-011` para navegación; `PASS-UX-006` entrega el destino semántico | ruta canónica abre `VSCREEN-0111` o la acción no se expone |
| múltiples runtimes proyectan historias distintas | deriva entre experiencia estática y dinámica | `PASS-UX-006`, `PASS-UX-011`, paquetes de convergencia | paridad semántica y navegación convergente demostradas |

Ningún hallazgo autoriza cambios físicos dentro de esta tarea documental.

---

#### 21. Responsabilidad de tareas posteriores

| Responsabilidad | Tarea propietaria |
| --- | --- |
| catálogo completo de recompensas y condiciones visibles | `PASS-UX-007` |
| perfil, privacidad y consentimientos | `PASS-UX-008` |
| taxonomía y diferenciación completa pendiente/usado/cancelado | `PASS-UX-009` |
| copy final y mensajes comprensibles | `PASS-UX-010` |
| rutas, aliases y navegación canónica hacia historial | `PASS-UX-011` |
| carga, error, offline, retry y recuperación móvil | `PASS-UX-012` |
| validación con clientes reales | `PASS-UX-013` |
| contrato detallado PULSO → PASS para acumulación y correlación de origen | `PASS-INT-001` |
| contrato detallado PULSO → PASS para redención, idempotencia y recibo | `PASS-INT-002` |
| administración de datos de cliente y reconciliación cuando corresponda | `PASS-INT-004` |
| pruebas completas de acumulación | `PASS-QA-001` |
| pruebas completas de redención | `PASS-QA-002` |
| backfill, transición y saneamiento de atribución histórica | tareas `SUPA-TRANS-*` y packages ya propietarios según 04A/backlog |

---

#### 22. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** completitud del historial, atribución determinista o explícitamente desconocida, convergencia entre rutas, ledger reconciliable, referencia al hecho de origen y prohibición de ocultar movimientos ya cuentan con cobertura PASS vigente. Esta tarea materializa el diseño objetivo de `VSCREEN-0111` sin introducir una obligación de prueba nueva ni alterar el Registro 04A.

---

#### 23. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-001` para impedir que una acción visible de movimientos apunte a una capacidad ficticia;
- `TREQ-PASS-003` para atribuir transacciones Saudo determinísticamente o mostrarlas sin atribución, sin omitir registros legítimos;
- `TREQ-PASS-006` para convergencia de `site_id`, marca, recompensas e historial entre experiencias estáticas y dinámicas;
- `TREQ-PASS-010` para ledger inmutable/reconciliable y conservación de evento origen, regla y versión en acumulación, redención, expiración, ajuste, reversión y compensación;
- `TREQ-PASS-041` para no asumir equivalencia uno a uno entre superficies AS-IS e identidades `VSCREEN-*`;
- `TREQ-PASS-042` para detectar deriva entre inventario canónico y runtime PASS cuando exista checkout hermano.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 24. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará únicamente cuando `PASS-UX-005` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-006` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, archivo propietario, topología `PASS-UX`, `VSCREEN-0111`, `VPROC-0045`, Registro 04A PASS, auditorías de historial, `vento-pass/main`, `useLoyaltyTransactions`, `TransactionItem`, `RedemptionCard`, `Saudo`, `VentoCafe`, `SatelliteExperience` y `navigation.ts`. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutó consulta histórica, paginación, reconciliación ledger-redención, atribución de sede ni navegación en ambiente desplegado o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-006` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 25. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-006 — Diseñar historial`.
- [x] El objetivo queda anclado a `VSCREEN-0111` y `VPROC-0045::STEP-AUDIT_PERSONAL_LOYALTY_LEDGER`.
- [x] Ledger y recibos de redención se conservan como fuentes complementarias con responsabilidades distintas.
- [x] Un movimiento de puntos usa el ledger como autoridad del delta.
- [x] Un mismo canje correlacionado no se presenta dos veces como dos efectos empresariales.
- [x] La correlación exige referencia estable y no usa fecha, monto, descripción ni proximidad como heurística.
- [x] Un registro legítimo sin sede no se omite silenciosamente.
- [x] `SIN_ATRIBUCION` permanece una verdad visible y reconciliable, no una sede inferida.
- [x] Vento Café, Saudo y satélites dinámicos quedan sujetos al mismo contrato semántico de historial.
- [x] Una ventana de 100 filas no se presenta como historial completo.
- [x] El historial no reconstruye saldo ni acumulado histórico desde una página parcial.
- [x] Fechas de movimiento, creación de redención y uso/validación permanecen diferenciadas.
- [x] El historial de pedidos, Club, pagos y contexto laboral no se fusionan con `VSCREEN-0111`.
- [x] La taxonomía completa de estados de redención permanece reservada a `PASS-UX-009`.
- [x] La navegación global permanece reservada a `PASS-UX-011`.
- [x] Carga, error, offline y recuperación completa permanecen reservados a `PASS-UX-012`.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, Supabase, PULSO runtime, Wallet, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-007` queda reservada y no se desarrolla en esta tarea.

---

#### 26. Límites

Esta tarea no:

- implementa `VSCREEN-0111`;
- modifica `useLoyaltyTransactions.ts`, `TransactionItem.tsx`, `RedemptionCard.tsx`, `Saudo.tsx`, `VentoCafe.tsx`, `SatelliteExperience.tsx` ni `navigation.ts`;
- crea tablas, columnas, índices, vistas, RPC, funciones, triggers, RLS o migraciones;
- ejecuta backfill de `site_id` ni corrige datos históricos;
- redefine el ledger;
- crea nuevos enums persistidos de movimientos;
- decide esquema físico de paginación o cursor;
- fusiona registros por heurísticas;
- recalcula saldo desde movimientos locales;
- implementa integración PULSO → PASS;
- redefine creación o validación de redención;
- define por anticipado la taxonomía completa pendiente/usado/cancelado;
- define copy final de errores o estados;
- consolida rutas, deep links o aliases;
- define estrategia offline/retry completa;
- integra historial de pedidos, Club, pagos, reclamos o actividad laboral dentro del ledger PASS;
- modifica datos, Supabase, secretos o despliegues;
- autoriza packages, implementación física, CI022, piloto ni rollout;
- declara validación operativa realizada;
- desarrolla `PASS-UX-007`, `PASS-UX-009`, `PASS-UX-011`, `PASS-INT-001` ni `PASS-INT-002`.

---

#### 27. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-005 — Diseñar redención visible`

**TAREA ACTUAL APROBADA**
`PASS-UX-006 — Diseñar historial`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-007 — Diseñar catálogo de recompensas`
### ✅ PASS-UX-007 — Diseñar catálogo de recompensas

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-006 — Diseñar historial
**Tarea siguiente:** PASS-UX-008 — Diseñar perfil del cliente
**Tipo de tarea:** documental; diseño objetivo de `VSCREEN-0109 — Catálogo de beneficios y recompensas` como workspace personal de descubrimiento de beneficios publicados por PASS, con contexto de sede o marca, condiciones, costo, vigencia, alcance y estado visibles, preservando la separación entre visibilidad, elegibilidad, intención de redención y efecto comercial; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, PULSO, AURA, NUMERA, NEXO, Wallet, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo del catálogo de beneficios y recompensas de PASS para que el cliente pueda descubrir qué valor de fidelización está publicado para su contexto, comprender qué es, cuánto cuesta cuando aplique, bajo qué condiciones puede utilizarse, cuál es su vigencia y qué acción puede iniciar, sin confundir visibilidad con elegibilidad efectiva ni convertir una tarjeta, un favorito, una recomendación o un saldo local en autorización de canje.

La tarea diseña `VSCREEN-0109 — Catálogo de beneficios y recompensas` como workspace personal de `VPROC-0045::STEP-CONSULT_REWARDS_CATALOG — Consultar beneficios y recompensas`.

El resultado fija semántica, taxonomía visible, conjunto publicado, contexto territorial, condiciones mínimas, descubrimiento, orden, filtros, favoritos, recomendaciones, asequibilidad visible, handoff hacia redención y fronteras con marketing, comercio y administración. No implementa consultas, no define esquema físico, no administra productos de fidelización y no ejecuta redenciones.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-006`, que entrega:

- `VSCREEN-0111` como historial reconciliable de puntos y redenciones;
- conservación de regla, versión, referencia de origen y recibo cuando el hecho histórico lo requiera;
- separación entre saldo actual, ledger e historia visible;
- prohibición de ocultar hechos legítimos por filtros locales;
- convergencia semántica entre Vento Café, Saudo y satélites dinámicos.

Se conserva además la base de `PASS-UX-005`, `PASS-UX-004` y `PASS-UX-002`:

- seleccionar una recompensa en catálogo no crea todavía una redención;
- una tarjeta visible no acredita elegibilidad;
- saldo local suficiente no reemplaza revalidación de costo, sede, vigencia, regla y disponibilidad;
- una redención válida se crea mediante contrato autoritativo y no desde la UI;
- el home solo resume beneficios y entrega a `VSCREEN-0109`; no replica el catálogo completo;
- puntos, saldo gastable, acumulado histórico, nivel, Club membership y Club wallet permanecen conceptos separados.

Se consume asimismo `INT-MKT-002 — Definir beneficios publicados en PASS`, que fija que beneficio definido, beneficio publicado, elegibilidad confirmada, redención y efecto comercial son estados o responsabilidades distintas.

La frontera de esta tarea es exclusivamente la experiencia visible del catálogo de fidelización. No absorbe administración laboral de productos, campañas, catálogo comercial vendible, checkout, validación comercial PULSO, perfil/consentimientos, taxonomía completa de redención, copy final de errores ni estrategia offline completa.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla | `VSCREEN-0109 — Catálogo de beneficios y recompensas` |
| Aplicación | `pass` |
| Proceso | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Paso | `VPROC-0045::STEP-CONSULT_REWARDS_CATALOG — Consultar beneficios y recompensas` |
| Acción | `MONITOR` |
| Posición | `IN_PROGRESS` |
| Patrón | `OWNER_WORKSPACE` |
| Proceso relacionado | `VPROC-0017 — Publicar oferta y disponibilidad desde una definición gobernada hacia todos los canales` únicamente como relación de condiciones comerciales cuando corresponda |
| Fuente de fidelización | beneficio/recompensa + regla + versión gobernados por PASS |
| Salida de cliente | proyección publicada, contextual y comprensible |
| Handoff de redención | `VSCREEN-0110 — Ticket o QR de redención` mediante `PASS-UX-005` |
| Topología | `DEFINE_ONCE` |
| Estado físico | `NO_PHYSICAL_INSTANCE` |

`VSCREEN-0109` no es menú de venta, campaña, catálogo de inventario ni administración laboral. Proyecta valor de fidelización publicado por PASS sin apropiarse de las fuentes empresariales externas que puedan condicionar ese valor.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot observado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` | `2e89e287faee0804823dbd8fb805aa3878fe7905` | plan, continuidad, topología, ownership, catálogo de pantallas, 04A PASS y validadores |
| archivo propietario de PASS | blob `c09bfa2195d1cd46c892c34ca3c9a197e97ff277` | base remota con `PASS-UX-005` aprobada y marcadores `PASS-UX-006+` reservados |
| `PASS-UX-006_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `da0649c67086b45ea74bdcae69be45dd61555b725ac775fa9002fe5b856c0b76` | base documental inmediata aprobada por el usuario y pendiente de incorporación |
| catálogo proceso-pantalla canónico | blob `742ead71e5fc5c4ae85a3cb6a00feb858ba8c2a0` | identidad, propósito y paso de `VSCREEN-0109` |
| `INT-MKT-002` dentro del bloque de marketing/beneficios | blob `5b02ca2063c297c88a0ae10c9695289813a75bc1` | frontera beneficio publicado, elegibilidad, redención, campaña y efecto comercial |
| Registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` | cobertura vigente de convergencia, contratos autorizados, reglas versionadas y ledger |
| `carlosibarraariza/vento-pass` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS verificable |
| `src/hooks/useLoyaltyRewards.ts` | blob `59ea4a33ae6f4d4f8c145fad47f5ade4ce673966` | lectura AS-IS por `site_id`, `is_active`, costo ascendente y caché de 60 s |
| `src/components/vento/ProductCard.tsx` | blob `54b274d7733fc7f33629e2dde6073f238a675414` | tarjeta AS-IS, costo, asequibilidad local, favorito y CTA `Canjear` |
| `src/components/vento/CategoryFilters.tsx` | blob `09c67c69bf10f1c4c4134a0ae8995eb203ab3cdc` | filtros AS-IS por categoría |
| `src/hooks/useRecommendations.ts` | blob `aa24224f8ec9c0d2ee05da651469ff5d4dd1242a` | recomendaciones AS-IS basadas en redenciones previas y costo |
| `src/hooks/useFavorites.ts` | blob `48b6317395bee108d2be7872db4dddc4e6261f79` | persistencia AS-IS de favoritos por cliente |
| `src/components/VentoCafe.tsx` | blob `b7d592486b935f2f3415ddb4390390df9efa35f7` | catálogo estático AS-IS de Vento Café |
| `src/components/Saudo.tsx` | blob `f63602bf604ff3c045256205bff09fbed0276dd2` | catálogo estático AS-IS de Saudo |
| `src/components/SatelliteExperience.tsx` | blob `7d0cc7fd9be280844af2810b9c507dfad5764dc3` | catálogo dinámico AS-IS por satélite |
| `src/utils/redemption.ts` | blob `845e4b33ba442bef12c40b8846c3730cfbe71319` | revalidación AS-IS de reward, sede, costo y saldo antes del canje |

La preparación usa la versión completa aprobada de `PASS-UX-006` como base inmediata aunque su incorporación a `main` permanezca condicionada al cierre documental anterior.

---

#### 5. Semántica contractual del catálogo

El catálogo PASS representa beneficios y recompensas que pueden mostrarse al cliente bajo un contexto autorizado.

```text
BENEFICIO DEFINIDO EN PASS
→ REGLA + VERSION
→ BENEFICIO PUBLICADO
→ PROYECCION EN VSCREEN-0109
```

La proyección visible no significa:

```text
ELEGIBILIDAD CONFIRMADA
REDENCION CREADA
REDENCION USADA
DESCUENTO APLICADO
VENTA CONFIRMADA
CAMPANA ACTIVA
```

La regla raíz es:

```text
VISIBLE
≠
ELEGIBLE
≠
REDIMIDO
≠
APLICADO EN VENTA
```

El catálogo comunica posibilidades y condiciones de fidelización; el servidor y los contratos propietarios deciden si una operación concreta puede ejecutarse.

---

#### 6. Taxonomía visible de valor

La experiencia debe conservar identidades funcionales distintas.

| Concepto | Significado | No equivale a |
| --- | --- | --- |
| puntos | unidad del ledger y saldo de fidelización | recompensa |
| recompensa | objeto o valor obtenible bajo una regla | cupón o promoción por defecto |
| beneficio | valor de fidelización gobernado por PASS | campaña |
| cupón | instrumento o referencia aplicable bajo condiciones | saldo de puntos |
| nivel | condición de relación o progreso | recompensa consumida |
| membresía | relación o programa | saldo monetario Club |
| promoción | intención comercial con condiciones | beneficio PASS por defecto |
| cortesía | decisión distinta de fidelización ordinaria | recompensa de puntos por defecto |
| beneficio por campaña | beneficio PASS correlacionado con iniciativa autorizada | campaña almacenada en PASS |

La UI no colapsa estas identidades bajo una sola etiqueta genérica si ello cambia su autoridad, condición de uso o efecto.

---

#### 7. Unidad visible de catálogo

La unidad primaria es un `BENEFICIO_PUBLICADO_VISIBLE` o `RECOMPENSA_PUBLICADA_VISIBLE` derivado de una fuente PASS autorizada.

Cada tarjeta o detalle debe poder expresar, cuando aplique y exista fuente confirmada:

| Campo | Regla |
| --- | --- |
| identidad estable | no depende de índice visual, posición o nombre |
| nombre | procede de la versión publicada vigente |
| descripción | explica el valor sin sustituir condiciones |
| tipo | diferencia recompensa, beneficio, cupón u otra identidad aprobada |
| costo en puntos | solo cuando el valor utilice puntos; proviene de regla vigente |
| regla y versión | trazables aunque no necesariamente expuestas completas al cliente |
| vigencia | fecha/rango o condición temporal cuando aplique |
| condiciones | requisitos relevantes para comprender el uso |
| límites y exclusiones | restricciones necesarias antes de iniciar redención |
| alcance | marca, sede, canal o cliente cuando la regla lo establezca |
| estado publicable | impide mostrar como utilizable un valor retirado, vencido o no disponible |
| media | imagen o representación visual secundaria; nunca autoridad de identidad |
| acción disponible | handoff hacia revisión/redención, sin afirmar resultado antes del servidor |

La tarea no crea columnas físicas para estos campos. Si una fuente AS-IS no los representa, la implementación posterior deberá consumir o adaptar el contrato autorizado correspondiente.

---

#### 8. Publicación, vigencia y disponibilidad

`is_active = true` en el runtime actual es una señal AS-IS de publicación, pero no basta para representar por sí sola todas las condiciones canónicas.

El catálogo objetivo distingue:

```text
PUBLICADO
VIGENTE
VISIBLE EN CONTEXTO
POSIBLEMENTE ELEGIBLE
ELEGIBLE AL VALIDAR
```

Reglas:

1. un elemento retirado no se presenta como canjeable nuevo;
2. un elemento vencido no se mantiene utilizable por caché o favorito;
3. una regla futura o todavía no vigente no se presenta como actualmente utilizable;
4. un elemento publicado puede exigir condiciones adicionales de elegibilidad;
5. un cambio de costo, condición, límite o vigencia debe conservar versión;
6. una proyección desactualizada no conserva autoridad por haber sido mostrada antes;
7. retirar una proyección no borra historia ni recibos ya generados bajo otra versión.

La definición física de estados, vigencias y versionado pertenece a contratos/administración posteriores ya propietarios; esta tarea fija únicamente su semántica visible.

---

#### 9. Contexto de sede, marca y canal

El catálogo debe resolver el contexto de forma determinista.

Reglas:

- un reward o beneficio limitado por sede se muestra únicamente dentro de la sede autorizada;
- una experiencia no consulta rewards de otra sede para llenar un catálogo vacío;
- la ausencia de `site_id` o contexto no autoriza una consulta global implícita;
- un beneficio global futuro requiere alcance global explícito; no se infiere desde `null`;
- nombre de marca, sede, dirección o etiquetas comerciales proceden de fuentes canónicas, no de literales divergentes;
- cambiar de satélite cambia el contexto consultado, no reescribe la identidad del beneficio;
- Vento Café, Saudo y `SatelliteExperience` deben converger sobre la misma semántica aunque utilicen superficies distintas.

El comportamiento AS-IS de `useLoyaltyRewards` de no consultar sin un `site_id` válido preserva la frontera anti-fuga entre sedes y no se convierte por esta tarea en una regla para beneficios globales no definidos.

---

#### 10. Costo en puntos y asequibilidad visible

El catálogo puede ayudar al cliente a entender cuánto cuesta una recompensa y si su saldo confirmado parece suficiente para iniciar el flujo.

Se distinguen:

```text
COSTO PUBLICADO
SALDO CONFIRMADO
ASEQUIBILIDAD VISUAL
ELEGIBILIDAD TRANSACCIONAL
```

Reglas:

1. el costo visible procede de la regla/version vigente;
2. la UI puede mostrar progreso hacia el costo cuando dispone de saldo confirmado;
3. `saldo >= costo` permite únicamente presentar una capacidad de inicio, no confirmar elegibilidad;
4. `saldo < costo` puede explicar faltante cuando ambos valores estén confirmados;
5. saldo desconocido, error de lectura o dato stale no se convierten en cero confirmado ni en `No alcanza` definitivo;
6. el umbral AS-IS del 80 % usado para el estado “Faltan N pts” es una decisión visual actual, no una regla canónica de elegibilidad;
7. el servidor revalida costo, saldo, sede, vigencia y demás condiciones al iniciar la redención.

`PASS-UX-005` conserva la experiencia de revisión y creación de intención de redención.

---

#### 11. Descubrimiento por búsqueda y categoría

Búsqueda y categorías son ayudas de descubrimiento sobre el conjunto publicado permitido.

La búsqueda puede considerar campos visibles como:

- nombre;
- descripción;
- categoría cuando exista taxonomía autorizada.

Los filtros por categoría:

- no cambian elegibilidad;
- no hacen visible un elemento fuera del contexto autorizado;
- no convierten metadata libre en taxonomía canónica por inferencia;
- deben permitir volver al conjunto completo del alcance consultado;
- no ocultan permanentemente elementos por una categoría desconocida o ausente.

El uso AS-IS de `metadata.category` se registra como adaptación actual. Esta tarea no canoniza esos valores libres como taxonomía empresarial definitiva.

---

#### 12. Favoritos

Favorito significa preferencia de descubrimiento del cliente, no disponibilidad ni reserva.

Reglas:

1. marcar favorito no crea una recompensa;
2. no reserva stock, cupo, beneficio ni saldo;
3. no extiende vigencia;
4. no evita retiro o cambio de regla;
5. no convierte al cliente en elegible;
6. un favorito que deja de estar publicado no permanece como CTA utilizable;
7. si el sistema conserva la referencia histórica del favorito, debe diferenciar “ya no disponible” de “disponible para canje”;
8. la vista `Favoritos` sigue siendo un filtro del catálogo autorizado, no un catálogo paralelo.

`user_favorites` AS-IS es una preferencia del cliente y no una fuente de verdad de rewards.

---

#### 13. Recomendaciones

Las recomendaciones son una capa de orden o destaque sobre recompensas ya publicadas y permitidas.

Reglas:

- una recomendación no crea ni activa beneficios;
- no puede introducir rewards de otra sede o fuera de vigencia;
- no puede omitir del conjunto general una recompensa válida de forma que deje de ser descubrible;
- recomendar por historial de redención no cambia la autoridad del catálogo;
- la recomendación no acredita elegibilidad;
- el algoritmo puede evolucionar sin cambiar el contrato de `VSCREEN-0109`;
- cualquier uso de datos personales debe respetar finalidad, autorización y contratos de perfil/consentimiento aplicables;
- si no existe base suficiente para recomendar, el catálogo general sigue disponible.

El algoritmo AS-IS prioriza categorías previamente redimidas y costo ascendente. Esa estrategia no se canoniza como regla de negocio.

---

#### 14. Integridad del conjunto visible

Si la interfaz separa “Recomendados” y “Todos”, el conjunto debe conservar integridad.

```text
RECOMENDADOS
∪
LISTA PRINCIPAL
=
CATALOGO VISIBLE DEL CONTEXTO
```

con la condición de que una misma identidad no se duplique visualmente dentro de la misma vista salvo que exista una razón explícita de navegación.

Reglas:

- retirar recomendaciones de la lista principal es válido solo si siguen visibles en la sección recomendada;
- activar búsqueda, categoría o favoritos puede ocultar la sección recomendada sin cambiar el universo autorizado;
- “Todos” no significa todo VENTO si el contexto contractual es una sede concreta;
- un conjunto vacío debe distinguir “no hay elementos publicados para este contexto” de error, contexto no resuelto o filtro sin coincidencias.

La redacción final de vacíos y errores permanece reservada a `PASS-UX-010` y `PASS-UX-012`.

---

#### 15. Orden del catálogo

El orden visual es una decisión de presentación, no de autoridad.

Puede considerar, según implementación aprobada:

- costo en puntos;
- prioridad editorial de fidelización;
- categoría;
- recomendación personalizada;
- vigencia o proximidad de expiración cuando el contrato lo permita.

Invariantes:

- ordenar por costo ascendente no implica que el más barato sea el más recomendado;
- posición superior no significa elegibilidad confirmada;
- una promoción no puede comprar prioridad dentro de PASS sin un contrato autorizado;
- el orden no altera costo, regla, vigencia ni alcance;
- reordenar no crea identidades duplicadas.

El orden AS-IS por `points_cost` ascendente permanece evidencia de runtime, no norma permanente.

---

#### 16. Handoff hacia redención

El catálogo termina su responsabilidad cuando el cliente selecciona un valor para revisar o intentar redimirlo.

Flujo objetivo:

```text
VSCREEN-0109
beneficio/recompensa visible
        ↓
SELECCIONAR
        ↓
REVISAR CONDICIONES Y COSTO VIGENTES
        ↓
VSCREEN-0110 / PASS-UX-005
crear intención de redención por contrato autoritativo
        ↓
PULSO valida/consume cuando corresponda
```

La acción visible puede llamarse “Canjear” u otra etiqueta aprobada, pero su presencia significa `INICIAR FLUJO`, no `CANJE CONFIRMADO`.

Ante cambios entre catálogo y confirmación:

- costo nuevo prevalece si la regla vigente así lo determina;
- una recompensa retirada no se fuerza por haber sido seleccionada previamente;
- el saldo se vuelve a confirmar;
- la sede y vigencia se vuelven a validar;
- la UI presenta el resultado autoritativo y no conserva una promesa basada en el snapshot anterior.

---

#### 17. Frontera con catálogo comercial y producto

`VSCREEN-0109` no es `VSCREEN-0161 — Menú y catálogo comercial del cliente`.

Se conserva:

```text
CATALOGO DE RECOMPENSAS PASS
≠
MENU VENDIBLE
≠
INVENTARIO
≠
RECETA
≠
PRECIO COMERCIAL
```

Consecuencias:

- una recompensa puede referenciar un producto sin convertirse en maestro de producto;
- NEXO conserva atributos maestros de producto cuando correspondan;
- FOGO/NEXO conservan disponibilidad/capacidad operacional según el hecho;
- PULSO conserva oferta vendible y operación comercial;
- NUMERA conserva verdad económica;
- el catálogo PASS no calcula stock, margen o precio de venta por inferencia;
- si una regla de recompensa depende de disponibilidad externa, la dependencia se valida por su contrato propietario y no mediante copia manual dentro de la tarjeta.

---

#### 18. Frontera con marketing y campañas

PASS conserva fidelización; una campaña no se convierte en recompensa por ser visible.

Se mantiene:

```text
CAMPANA
≠
PROMOCION
≠
BENEFICIO PASS
≠
RECOMPENSA PASS
≠
REGLA TRANSACCIONAL PULSO
```

Reglas:

1. un beneficio PASS puede existir sin campaña;
2. una campaña autorizada puede correlacionar un beneficio sin apropiárselo;
3. mostrar una pieza promocional no crea una recompensa;
4. AURA no decide elegibilidad de fidelización;
5. PASS no se convierte en sistema de campañas por mostrar beneficios;
6. PULSO no mantiene un maestro paralelo de beneficios por validarlos en una venta;
7. una referencia de campaña solo aparece cuando existe correlación autorizada;
8. mientras AURA permanezca diferida, el catálogo PASS no depende de AURA para conservar beneficios propios.

---

#### 19. Frontera con nivel, membresía y Club

El catálogo no mezcla programas con naturalezas distintas.

- nivel PASS puede condicionar un beneficio, pero no es una recompensa consumida;
- membresía puede habilitar beneficios, pero no equivale a saldo de puntos;
- Club membership y Club wallet permanecen separados de puntos PASS;
- un beneficio de Club solo aparece en `VSCREEN-0109` si existe contrato explícito que lo proyecte como beneficio PASS o relacionado sin borrar su identidad;
- dinero, crédito o saldo monetario no se presenta como puntos;
- una ventaja de nivel no requiere inventar un `points_cost` cuando su regla no usa puntos.

---

#### 20. Caché, frescura y actualización

El runtime AS-IS conserva un caché de rewards de 60 segundos por sede. Ese caché es una optimización, no una fuente de autoridad.

La experiencia debe preservar:

- identidad del contexto cacheado;
- momento o condición de frescura cuando sea material;
- invalidación o revalidación antes de una acción sensible;
- ausencia de fuga entre sedes;
- capacidad de reemplazar una proyección stale por la versión vigente;
- no afirmar vigencia actual únicamente porque una tarjeta quedó en memoria.

`PASS-UX-012` definirá carga, offline, error, retry y recuperación. `PASS-UX-007` fija que ninguna estrategia de caché puede transformar datos stale en elegibilidad o canje autorizado.

---

#### 21. Hallazgos AS-IS y handoff

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `useLoyaltyRewards` selecciona `id`, `code`, `name`, `description`, `points_cost`, `is_active` y `metadata`, sin contrato visible de vigencia, límites, exclusiones, tipo y versión | catálogo actual no puede explicar todas las condiciones canónicas | `PASS-UX-007` para contrato visible; `PASS-INT-003` y package propietario para materialización administrativa/datos | la proyección autorizada expone condiciones necesarias sin inventar columnas ni metadata implícita |
| `metadata.category` funciona como categoría AS-IS | valores libres pueden convertirse accidentalmente en taxonomía canónica | implementación PASS + administración propietaria | categorías visibles provienen de taxonomía/contrato gobernado o permanecen claramente adaptativas |
| `ProductCard` decide `canAfford` con saldo local y costo local | puede confundirse capacidad visual con elegibilidad real | `PASS-UX-007` + `PASS-UX-005` | CTA significa iniciar revisión; servidor revalida costo, saldo, sede, vigencia y condiciones |
| `ProductCard` usa umbral local de 80 % para “Faltan N pts” | heurística visual puede parecer regla de programa | implementación PASS | el umbral queda solo como presentación o se retira; nunca gobierna elegibilidad |
| `userData?.loyalty_points || 0` puede colapsar dato ausente/error en cero | un fallo puede presentarse como insuficiencia de puntos | `PASS-UX-012` + implementación posterior | desconocido/error y cero confirmado permanecen estados distintos |
| recomendaciones AS-IS se derivan de redenciones previas y costo | algoritmo local puede percibirse como regla oficial | `PASS-UX-007` | recomendaciones quedan como orden/destaque sobre catálogo autorizado, sin cambiar elegibilidad |
| recomendados se excluyen de la lista principal mientras la sección esté visible | una implementación incorrecta puede omitir elementos del conjunto | `PASS-UX-007` | unión de recomendados + lista principal conserva todo el catálogo visible sin duplicidad |
| favoritos se guardan por `reward_id` | un favorito retirado podría conservar una referencia obsoleta | `PASS-UX-007` | preferencia no mantiene utilizable un reward retirado/vencido |
| `ProductCard` conserva `brandLabel = "Vento Café"` como default reutilizable | un caller incompleto puede mostrar contexto de marca incorrecto | `PASS-UX-007` + convergencia de superficies | contexto de marca/sede se resuelve desde fuente canónica, no desde default accidental |
| Vento Café, Saudo y satélites duplican lógica de filtros/recomendaciones | riesgo de deriva semántica entre experiencias | `PASS-UX-007`, `PASS-UX-011`, package de convergencia | misma semántica de catálogo y navegación demostrada en todas las rutas |
| `processRedemption` revalida reward, `site_id`, costo y saldo | confirma que la tarjeta no es autoridad de canje | `PASS-UX-005` / `PASS-INT-002` | creación de intención usa contrato autoritativo, atómico e idempotente |

Ningún hallazgo autoriza cambios físicos dentro de esta tarea documental.

---

#### 22. Responsabilidad de tareas posteriores

| Responsabilidad | Tarea propietaria |
| --- | --- |
| perfil, privacidad, preferencias y consentimientos | `PASS-UX-008` |
| taxonomía y diferenciación completa pendiente/usado/cancelado | `PASS-UX-009` |
| copy final de condiciones, avisos, vacíos y errores | `PASS-UX-010` |
| rutas, aliases y navegación canónicas hacia catálogo | `PASS-UX-011` |
| carga, error, offline, retry, caché y recuperación móvil | `PASS-UX-012` |
| validación con clientes reales | `PASS-UX-013` |
| creación y presentación de intención de redención | `PASS-UX-005` |
| historial de movimientos y redenciones | `PASS-UX-006` |
| integración de redención PULSO → PASS | `PASS-INT-002` |
| administración laboral de productos de fidelización | `PASS-INT-003` |
| administración de cliente y separación de identidades | `PASS-INT-004`, `PASS-INT-005` |
| validación comercial del efecto | `INT-MKT-003` |
| campañas/promociones y sus guardas | tareas AURA propietarias cuando su puerta permita continuidad |
| pruebas completas de redención | `PASS-QA-002` |

---

#### 23. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** convergencia de recompensas entre experiencias, contratos autorizados para gasto/redención, preservación de reglas/versiones y no duplicación de beneficios ya cuentan con cobertura vigente. Esta tarea materializa el diseño visible de `VSCREEN-0109` y consume la frontera ya aprobada de beneficios publicados en PASS sin introducir una obligación verificable nueva ni alterar el Registro 04A.

---

#### 24. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-006` para convergencia de `site_id`, marca, recompensas e historial entre experiencias estáticas y dinámicas;
- `TREQ-PASS-008` para que gasto, ajuste, reversión y redención se ejecuten mediante contratos autorizados, atómicos e idempotentes y no por mutación cliente del ledger;
- `TREQ-PASS-010` para reglas/versiones, ledger reconciliable, saldo como proyección y no duplicación de puntos o beneficios;
- `TREQ-PASS-041` para reconciliar superficies AS-IS con identidades canónicas sin asumir equivalencia uno a uno;
- `TREQ-PASS-042` para detectar deriva entre inventario canónico y runtime PASS cuando exista checkout hermano.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 25. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará únicamente cuando `PASS-UX-006` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-007` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, archivo propietario, topología `PASS-UX`, `VSCREEN-0109`, `VPROC-0045::STEP-CONSULT_REWARDS_CATALOG`, `INT-MKT-002`, Registro 04A PASS, `vento-pass/main`, `useLoyaltyRewards`, `ProductCard`, `CategoryFilters`, `useRecommendations`, `useFavorites`, `VentoCafe`, `Saudo`, `SatelliteExperience` y `redemption.ts`. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutó catálogo, búsqueda, favoritos, recomendaciones, caché, cambio de sede, elegibilidad ni redención en ambiente desplegado o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-007` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 26. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-007 — Diseñar catálogo de recompensas`.
- [x] El objetivo queda anclado a `VSCREEN-0109` y `VPROC-0045::STEP-CONSULT_REWARDS_CATALOG`.
- [x] Beneficio definido, beneficio publicado, elegibilidad, redención y efecto comercial permanecen distintos.
- [x] El catálogo conserva identidad, tipo, condiciones, costo cuando aplique, vigencia, límites, exclusiones y alcance cuando existan fuentes autorizadas.
- [x] `is_active` AS-IS no se convierte en sustituto universal de vigencia o elegibilidad.
- [x] El catálogo evita fuga de rewards entre sedes y no infiere un catálogo global desde contexto ausente.
- [x] Búsqueda, categoría, favoritos y recomendaciones operan únicamente sobre el conjunto autorizado.
- [x] Favorito no reserva, extiende vigencia ni acredita elegibilidad.
- [x] Recomendación no crea, activa ni vuelve elegible un beneficio.
- [x] Recomendados + lista principal preservan el conjunto visible sin omisiones ni duplicados funcionales.
- [x] El orden por costo AS-IS no se canoniza como regla de negocio.
- [x] Asequibilidad visual se distingue de elegibilidad transaccional.
- [x] Error o saldo desconocido no se convierten en cero confirmado ni insuficiencia definitiva.
- [x] El CTA del catálogo inicia revisión/redención; no confirma el canje.
- [x] El catálogo de recompensas permanece separado del menú comercial, inventario, precio de venta y campañas.
- [x] PASS conserva fidelización; PULSO conserva ejecución comercial; AURA no se apropia del beneficio por correlación de campaña.
- [x] Vento Café, Saudo y satélites dinámicos quedan sujetos a la misma semántica de catálogo.
- [x] La administración laboral de productos queda reservada a `PASS-INT-003`.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, Supabase, PULSO runtime, AURA, NUMERA, NEXO, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-008` queda reservada y no se desarrolla en esta tarea.

---

#### 27. Límites

Esta tarea no:

- implementa `VSCREEN-0109`;
- modifica `useLoyaltyRewards.ts`, `ProductCard.tsx`, `CategoryFilters.tsx`, `useRecommendations.ts`, `useFavorites.ts`, `VentoCafe.tsx`, `Saudo.tsx`, `SatelliteExperience.tsx` ni `redemption.ts`;
- crea tablas, columnas, índices, vistas, RPC, funciones, triggers, RLS, Edge Functions o migraciones;
- define nombres físicos para regla, versión, vigencia, límites o exclusiones;
- crea taxonomía persistida de categorías por inferencia desde `metadata.category`;
- administra altas, bajas o cambios de rewards;
- decide stock, disponibilidad productiva, margen, costo o precio comercial;
- convierte catálogo de fidelización en menú de venta;
- convierte campaña en beneficio ni beneficio en campaña;
- convierte favorito o recomendación en elegibilidad;
- confirma redención desde la tarjeta;
- define el algoritmo definitivo de recomendaciones;
- define copy final de vacíos, condiciones, advertencias o errores;
- consolida rutas, deep links o aliases;
- define estrategia offline/retry completa;
- modifica Wallet, Club wallet o balance monetario;
- modifica datos, Supabase, secretos o despliegues;
- autoriza packages, implementación física, CI022, piloto ni rollout;
- declara validación operativa realizada;
- desarrolla `PASS-UX-008`, `PASS-UX-009`, `PASS-UX-011`, `PASS-INT-002`, `PASS-INT-003` ni `INT-MKT-003`.

---

#### 28. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-006 — Diseñar historial`

**TAREA ACTUAL APROBADA**
`PASS-UX-007 — Diseñar catálogo de recompensas`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-008 — Diseñar perfil del cliente`
### ✅ PASS-UX-008 — Diseñar perfil del cliente

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-007 — Diseñar catálogo de recompensas
**Tarea siguiente:** PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado
**Tipo de tarea:** documental; diseño objetivo de `VSCREEN-0112 — Perfil, privacidad y consentimientos` como workspace personal de autoservicio para datos autogestionables, contactos, preferencias, consentimientos, derechos de privacidad y estado de cuenta del cliente, separando persona, cuenta autenticada, perfil, preferencias y evidencia de consentimiento; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, autenticación, datos, Supabase, migraciones, RLS, RPC, Edge Functions, retención, eliminación física, PULSO, AURA, Wallet, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato objetivo del perfil de cliente en PASS para que una persona autenticada pueda comprender y administrar, dentro de los límites autorizados, sus datos personales, contactos, preferencias, consentimientos y acciones de privacidad sin convertir una pantalla móvil en fuente autónoma de identidad, autorización, retención o cumplimiento.

La tarea diseña `VSCREEN-0112 — Perfil, privacidad y consentimientos` como workspace personal de `VPROC-0045::STEP-MAINTAIN_CUSTOMER_PROFILE_AND_CONSENT — Gestionar perfil, privacidad y consentimientos`.

El resultado fija:

- separación entre persona, cuenta autenticada, perfil, contacto, preferencia y consentimiento;
- relación entre onboarding inicial y mantenimiento posterior;
- clasificación visible de datos autogestionables y datos que requieren verificación o solicitud de corrección;
- contrato visible de consentimientos por finalidad, canal, versión, fuente, vigencia y retiro;
- ejercicio de acceso, actualización, rectificación, revocación, limpieza opcional y solicitud de supresión;
- manejo de cambios sensibles sin asumir que la UI puede sobrescribir identidad;
- relación con retención, historial, fidelización, cuenta y contexto laboral;
- handoff hacia las tareas canónicas propietarias de privacidad, integración, navegación, resiliencia y prueba.

No implementa formularios, no cambia políticas, no crea esquema físico y no ejecuta eliminación o anonimización.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-007`, que entrega:

- `VSCREEN-0109` como catálogo personal de beneficios y recompensas;
- separación entre visibilidad, elegibilidad, redención y efecto comercial;
- conservación de contexto, regla, versión, vigencia y condiciones sin convertir la UI en autoridad;
- separación entre fidelización, marketing, comercio y Club.

Se conserva además la base de `PASS-UX-002` a `PASS-UX-006`:

- el home entrega hacia perfil y privacidad sin replicar el workspace;
- la identidad cliente permanece separada del contexto laboral;
- el QR personal no sustituye perfil ni consentimiento;
- saldo, movimientos, redenciones y recompensas pertenecen a sus superficies propias;
- errores o ausencia de lectura no deben inventar un estado confirmado;
- la historia no se reescribe por cambios posteriores del perfil.

Se consumen las obligaciones ya aprobadas de privacidad y gobierno de información que exigen distinguir cuenta, identidad, titular y expediente; conservar evidencia de consentimiento; separar preferencias de autorizaciones; y reconciliar solicitudes de privacidad antes de declararlas completadas.

La frontera de esta tarea es exclusivamente la experiencia visible y semántica de `VSCREEN-0112`. No define la implementación material del caso de privacidad, la política de retención, el modelo físico de consentimientos, RLS, Edge Functions, autenticación, la integración de datos ni la navegación global.

---

#### 3. Identidad canónica diseñada

| Campo | Decisión |
| --- | --- |
| Pantalla | `VSCREEN-0112 — Perfil, privacidad y consentimientos` |
| Aplicación | `pass` |
| Proceso primario | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Proceso relacionado | `VPROC-0060` para gobierno documental, privacidad, evidencia y retención cuando corresponda |
| Paso | `VPROC-0045::STEP-MAINTAIN_CUSTOMER_PROFILE_AND_CONSENT — Gestionar perfil, privacidad y consentimientos` |
| Acción | `SELF_SERVICE` |
| Posición | `IN_PROGRESS` |
| Rol | `OWNER_WORKSPACE` |
| Superficie AS-IS inicial | `PASS-CUSTOMER-SURFACE-002 — CompleteProfile` |
| Superficie AS-IS autenticada | `PASS-CUSTOMER-SURFACE-008 — AccountSettings` |
| Estado físico | sin instancia propia; contrato documental `DEFINE_ONCE` |

`PASS-UX-008` no crea una pantalla canónica adicional. `CompleteProfile` y `AccountSettings` son dos manifestaciones AS-IS que deben converger semánticamente sobre la misma identidad `VSCREEN-0112`.

---

#### 4. Fuentes y snapshots verificados

La tarea se diseña contra los siguientes snapshots remotos observados:

| Fuente | Snapshot verificado |
| --- | --- |
| `vento-group-sas/vento-shell` `main` | `a7461cfe69c3ed93a45f3336c61bd14cbccdbd69` |
| archivo propietario | blob `a6ebb12184c054e8b35b5f81f131793c20e5533a` |
| catálogo canónico de pantallas/procesos | `VSCREEN-0112` → `VPROC-0045::STEP-MAINTAIN_CUSTOMER_PROFILE_AND_CONSENT` |
| registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` |
| `carlosibarraariza/vento-pass` `main` | `b5a4aec908ef12226f798078577ab089a29ccda2` |
| `App.js` | blob `162e686ff5ec363a0f6f991da58f6ce84816e8aa` |
| `CompleteProfile.tsx` | blob `aea4a6a509f347da3f87063b18b9b07cec86e5eb` |
| `ProfileForm.tsx` | blob `07bdc2c1cc7ef7f62fc4004234f8d0be87762f84` |
| `profile.ts` | blob `d4cc835593093886bdb829e3e9d8379263c1194d` |
| `AccountSettings.tsx` | blob `f9fc199ecdd1b7fbdd26e000bbdad4635bb7a308` |
| `DeleteAccountFlow.tsx` | blob `c6317fe52420920300462f60b9d9043eb708940d` |
| `DataCleanupFlow.tsx` | blob `e947a4967ff521ce87affdc9b8c596f279552dbd` |
| `useAccountDeletion.ts` | blob `16b103b45b529370fa77d3b235d42fd047d2a115` |
| `useUserData.ts` | blob `b37929f6d6f7a542fd3a37d995863265c3a38d5c` |

Estos snapshots sirven como evidencia AS-IS y no autorizan implementación.

---

#### 5. Modelo conceptual visible

`VSCREEN-0112` debe impedir que la interfaz trate como equivalentes conceptos distintos:

```text
PERSONA
≠
CUENTA AUTENTICADA
≠
PERFIL DE CLIENTE
≠
CONTACTO
≠
PREFERENCIA
≠
CONSENTIMIENTO
≠
PERFIL LABORAL
```

Consecuencias:

1. iniciar sesión identifica una cuenta, no demuestra que todos los datos de perfil estén completos o verificados;
2. un nombre, correo o teléfono coincidente no fusiona personas automáticamente;
3. un teléfono o correo de contacto no equivale por sí mismo a autorización de marketing;
4. una preferencia de interfaz no equivale a consentimiento;
5. retirar un consentimiento no elimina automáticamente la cuenta ni el historial que deba conservarse;
6. un perfil laboral asociado al mismo principal no se mezcla con el perfil personal de cliente.

---

#### 6. Arquitectura visible del workspace

`VSCREEN-0112` se organiza conceptualmente en cinco zonas:

| Zona | Contenido objetivo | Regla |
| --- | --- | --- |
| identidad y perfil | nombre visible y atributos personales autogestionables | solo campos autorizados; no exponer fila completa ni datos laborales |
| contactos y verificación | correo, teléfono y estado de verificación cuando aplique | contacto y verificación permanecen separados de consentimiento |
| preferencias y comunicaciones | preferencias personales y controles permitidos | una preferencia no concede finalidad nueva |
| privacidad y consentimientos | finalidades, canales, versión, vigencia, estado y retiro | toda autorización debe ser trazable y reversible cuando corresponda |
| cuenta y derechos | acceso a información, corrección, limpieza opcional, solicitudes de privacidad y eliminación de cuenta | las acciones de alto impacto conservan confirmación y proceso trazable |

Las cinco zonas forman un único workspace lógico; no implican cinco pantallas nuevas.

---

#### 7. Onboarding inicial versus mantenimiento posterior

La experiencia AS-IS contiene dos momentos distintos:

```text
CompleteProfile
→ alta/completitud inicial

AccountSettings
→ mantenimiento posterior de cuenta y privacidad
```

El diseño objetivo conserva la diferencia sin crear dos modelos de perfil:

- `CompleteProfile` puede seguir funcionando como puerta previa a navegación cuando falten datos mínimos requeridos;
- `AccountSettings` debe representar el workspace persistente para revisar y administrar el perfil ya creado;
- los dos consumen la misma fuente de identidad y las mismas reglas de editabilidad;
- un dato solicitado durante onboarding no queda permanentemente ineditable por haber sido capturado allí;
- un dato sensible tampoco se vuelve editable sin control solo porque el formulario inicial lo escribió directamente;
- la navegación exacta y aliases permanecen reservados a `PASS-UX-011`.

---

#### 8. Completitud de perfil

El gate de perfil no puede confundirse con consentimiento, elegibilidad comercial o verificación total de identidad.

La completitud objetivo debe responder únicamente si existen los atributos mínimos requeridos para continuar la experiencia personal según el contrato vigente.

Por tanto:

- `PROFILE_COMPLETE` no significa `CONSENTED_FOR_MARKETING`;
- `PROFILE_COMPLETE` no significa `IDENTITY_FULLY_VERIFIED`;
- `PROFILE_COMPLETE` no significa `ACCOUNT_ACTIVE_FOR_ALL_PURPOSES`;
- retirar un consentimiento opcional no convierte automáticamente el perfil en incompleto;
- una falla de lectura no equivale a perfil incompleto confirmado;
- los datos mínimos exigidos deben provenir de una regla versionada, no de una condición dispersa en UI.

---

#### 9. Clasificación de datos visibles y editabilidad

La UI debe resolver cada atributo por clase y autoridad, no por conveniencia del formulario.

| Atributo o clase | Tratamiento objetivo |
| --- | --- |
| nombre de perfil | visible y autogestionable cuando la regla vigente lo permita; actualización confirmada por servidor |
| correo de cuenta | referencia de autenticación/contacto; cualquier cambio requiere el flujo de verificación correspondiente y no una escritura libre de perfil |
| teléfono | contacto personal; el valor y su estado de verificación permanecen distinguibles |
| documento de identidad | atributo sensible de identidad; no se asume libremente editable; la corrección debe usar verificación o solicitud trazable cuando corresponda |
| fecha de nacimiento | atributo personal opcional salvo regla explícita; su finalidad debe ser visible y su uso no puede ampliarse silenciosamente |
| saldo, nivel y ledger | solo referencia contextual cuando sea necesaria; no forman parte de los campos editables de perfil |
| rol, sede o datos laborales | fuera del perfil personal; se mantienen separados |
| favoritos y personalización | preferencias; no equivalen a consentimiento ni identidad |

La tarea no fija nombres físicos de columnas ni reglas materiales de verificación.

---

#### 10. Contactos, autenticación y verificación

Correo y teléfono deben proyectarse con tres dimensiones separadas:

```text
VALOR
+
ESTADO DE VERIFICACIÓN
+
FINALIDADES AUTORIZADAS
```

Reglas:

- poseer un correo o teléfono no autoriza todos los canales de comunicación;
- la cuenta autenticada puede usar un correo distinto de otros contactos permitidos por el dominio, sin fusionarlos por inferencia;
- el cambio de un contacto verificado no se presenta como completado hasta que la autoridad aplicable confirme el nuevo estado;
- una verificación de autenticación no sustituye consentimiento de marketing;
- un opt-out de marketing no invalida mensajes estrictamente transaccionales que tengan fundamento y contrato propios.

---

#### 11. Contrato visible de consentimiento

Todo consentimiento administrable desde `VSCREEN-0112` debe poder explicar al cliente, cuando corresponda:

- finalidad concreta;
- canal o superficie a la que aplica;
- texto o política y versión aceptada;
- fuente de la aceptación;
- fecha de aceptación;
- vigencia o condición aplicable;
- estado actual;
- fecha y fuente de revocación cuando exista;
- efecto visible del retiro;
- cualquier limitación que impida retirar inmediatamente una obligación contractual o legal diferente.

Una casilla booleana aislada sin esta evidencia no constituye por sí sola el contrato completo de consentimiento.

---

#### 12. Política de privacidad y aceptación inicial

La aceptación necesaria para completar onboarding debe distinguir:

```text
POLÍTICA MOSTRADA
≠
ACEPTACIÓN REGISTRADA
≠
CONSENTIMIENTO PARA FINALIDAD ESPECÍFICA
```

El diseño objetivo exige que, cuando una aceptación sea jurídicamente o contractualmente necesaria:

1. el cliente pueda abrir el texto aplicable antes de aceptar;
2. la versión presentada sea identificable;
3. el acto de aceptación tenga evidencia durable;
4. la UI no muestre el perfil como compliant basándose únicamente en estado local;
5. las finalidades opcionales no se empaqueten dentro de una aceptación obligatoria;
6. una política actualizada no reescriba la evidencia histórica de versiones anteriores.

---

#### 13. Preferencias versus consentimientos

La experiencia debe mostrar una diferencia explícita entre:

| Tipo | Ejemplo conceptual | Efecto |
| --- | --- | --- |
| preferencia de experiencia | favorito, personalización o elección de interfaz | cambia experiencia permitida; no concede tratamiento nuevo |
| preferencia de comunicación | canal preferido cuando existe comunicación autorizada | ordena o prioriza canal; no crea fundamento por sí sola |
| consentimiento | autorización para finalidad que lo requiera | habilita únicamente la finalidad y alcance registrados |
| revocación | retiro de autorización revocable | detiene usos dependientes de esa autorización desde el momento aplicable |

No se reutiliza una preferencia como prueba de consentimiento.

---

#### 14. Actualización y rectificación

La interfaz debe distinguir al menos tres patrones de cambio:

1. **autoservicio directo autorizado:** cambio de dato no sensible que el contrato permite editar y que el servidor confirma;
2. **cambio sujeto a verificación:** nuevo contacto o atributo que necesita prueba antes de sustituir el vigente;
3. **solicitud de rectificación:** dato de identidad o dato gobernado cuya modificación requiere un caso o revisión trazable.

La UI no debe prometer que todos los campos son editables ni obligar al cliente a contactar soporte de forma opaca cuando ya existe una vía canónica de solicitud.

---

#### 15. Acceso e información sobre uso de datos

`VSCREEN-0112` debe ofrecer un handoff comprensible hacia los derechos de privacidad aplicables sin intentar resolverlos todos como escrituras locales.

La experiencia debe poder comunicar:

- qué información personal autogestionable se muestra;
- qué preferencias o consentimientos están activos;
- dónde consultar políticas vigentes;
- cómo iniciar una solicitud de acceso, corrección, revocación o supresión cuando requiera caso formal;
- que la recepción de una solicitud no equivale a su cierre;
- que el estado final depende de la reconciliación exigida por el dominio de privacidad.

El caso transversal de privacidad permanece gobernado por `INFO-UX-004 — Diseñar portal y caso de solicitudes de privacidad para trabajadores y clientes` y sus contratos relacionados.

---

#### 16. Limpieza de datos opcionales

Una acción de limpieza opcional debe declarar con claridad:

- qué categorías pretende eliminar o desvincular;
- qué categorías conserva;
- si afecta favoritos, personalización o marketing;
- si conserva cuenta, identidad, puntos, ledger y obligaciones aplicables;
- cuándo el resultado está confirmado;
- qué elementos pueden requerir procesamiento asíncrono o reconciliación.

La etiqueta “datos opcionales” no autoriza borrar indiscriminadamente información ni tratar todos los datos no esenciales como una sola categoría.

---

#### 17. Eliminación de cuenta versus supresión de datos

Se conserva obligatoriamente:

```text
REVOCAR ACCESO
≠
ELIMINAR CUENTA
≠
SUPRIMIR DATO
≠
ANONIMIZAR
≠
RETENER POR OBLIGACIÓN
≠
CERRAR CASO DE PRIVACIDAD
```

La experiencia de eliminación debe:

- explicar que la cuenta y las categorías de datos no necesariamente comparten el mismo destino;
- no prometer desaparición inmediata de información sujeta a retención válida;
- no borrar historia transaccional o de auditoría que deba preservarse;
- revocar el acceso cuando corresponda según el resultado autoritativo;
- conservar un estado trazable de la solicitud;
- declarar completado el proceso únicamente cuando el contrato de privacidad lo confirme, no por una animación o respuesta local aislada.

---

#### 18. Confirmación reforzada para acciones de alto impacto

Cambios con efecto material sobre cuenta, identidad, contactos verificados, consentimientos o eliminación requieren una confirmación proporcional al impacto.

Reglas:

- una frase escrita puede ser una fricción útil, pero no sustituye reautenticación o verificación exigida por el contrato;
- el cliente no puede autoafirmar desde el payload que una verificación ocurrió si la autoridad no la comprobó;
- una confirmación local no convierte una solicitud en resultado final;
- reintentos deben converger sobre la misma intención o solicitud cuando el servidor así lo defina;
- el copy final y tratamiento detallado de errores permanece reservado a `PASS-UX-010`.

---

#### 19. Separación entre perfil personal y contexto laboral

El perfil de cliente pertenece a la persona en su relación personal con PASS.

Por tanto:

- rol laboral, sede base, simulación, permisos o contexto operativo no aparecen como campos editables de perfil cliente;
- un trabajador que también es cliente conserva las dos identidades contextuales separadas;
- modificar nombre o contacto personal no eleva permisos laborales;
- modificar o perder perfil laboral no borra el perfil de cliente;
- una superficie de cliente no concede capacidad administrativa sobre otros clientes;
- los datos laborales mínimos usados por superficies embebidas permanecen gobernados por sus tareas AUTH/PASS correspondientes.

---

#### 20. Relación con fidelización e historial

Cambiar el perfil no reescribe hechos de fidelización anteriores.

Invariantes:

- puntos, saldo y ledger no son campos editables del perfil;
- un cambio de nombre no reescribe el actor histórico de una redención ni el recibo original;
- un cambio de contacto no duplica la cuenta ni el historial;
- una solicitud de supresión no elimina automáticamente evidencia financiera, antifraude, de seguridad o auditoría sujeta a obligación válida;
- el historial visible continúa gobernado por `PASS-UX-006`.

---

#### 21. Frescura, caché y errores

El workspace debe distinguir:

- valor confirmado;
- cambio pendiente;
- dato no verificado;
- lectura fallida;
- dato no disponible;
- permiso o finalidad no aplicable.

No se debe:

- convertir error de lectura en dato vacío confirmado;
- conservar perfil de otra sesión después de logout o cambio de principal;
- presentar un dato cacheado como actualizado cuando su frescura no pueda demostrarse;
- aplicar optimismo local a una revocación o eliminación sin resultado autoritativo.

La estrategia completa de carga, offline, retry y recuperación permanece en `PASS-UX-012`.

---

#### 22. Accesibilidad y comprensión

El diseño debe preservar:

- etiquetas comprensibles para datos personales y privacidad;
- estados que no dependan solo de color;
- lectura clara de qué se puede editar y qué requiere verificación;
- controles separados para acciones destructivas;
- confirmaciones que indiquen exactamente qué acción se solicita;
- enlaces legales accesibles sin ocultar el efecto de la acción principal;
- foco y navegación compatibles con móvil y tecnologías de asistencia;
- lenguaje que diferencie cuenta, perfil, preferencias, consentimiento y eliminación.

---

#### 23. Hallazgos AS-IS y handoff

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `CompleteProfile` exige `acceptedPrivacyPolicy` localmente, pero el `upsert` observado persiste `full_name`, `document_id`, `phone` y `birth_date` sin evidencia de aceptación | consentimiento no demostrable o imposible de versionar/revocar | `PASS-UX-008`, dominio de privacidad y transición física aplicable | aceptación y finalidades requeridas tienen evidencia durable, versionada y consultable |
| `ProfileForm` agrupa aceptación de política dentro del formulario inicial | una aceptación obligatoria puede confundirse con finalidades opcionales | `PASS-UX-008` + contratos de privacidad | política, consentimiento opcional y preferencias quedan separados |
| `App.js` define perfil completo por `full_name`, `document_id` y `phone`, sin integrar estado de consentimiento | completitud técnica puede presentarse como cumplimiento | `PASS-UX-008` + implementación posterior | completitud, verificación y consentimientos son estados distintos |
| `App.js` lee `users.select('*')` para verificar perfil | exposición mayor que la proyección mínima necesaria | fronteras AUTH/PASS ya existentes | lectura usa proyección mínima autorizada según finalidad |
| `AccountSettings` no expone edición normal de nombre, contacto, fecha de nacimiento o preferencias | onboarding y mantenimiento divergen | `PASS-UX-008` | workspace autenticado permite revisar y gestionar campos según autoridad |
| `AccountSettings` ofrece enlaces legales, limpieza y eliminación, pero no controles por finalidad/canal | consentimiento y revocación no son visibles ni autogestionables | `PASS-UX-008`, `INFO-UX-004` y contratos de privacidad | controles o handoffs muestran finalidad, canal, versión, estado y retiro |
| `DataCleanupFlow` comunica que elimina favoritos y preferencias de marketing/personalización | promesa visible requiere contrato verificable sobre categorías afectadas | dominio de privacidad e implementación posterior | resultado confirmado especifica categorías procesadas y conservadas |
| `DeleteAccountFlow` comunica “Cuenta eliminada” inmediatamente tras éxito del comando | puede confundirse aceptación de solicitud con reconciliación completa | `INFO-UX-004`, dominio de privacidad y `PASS-UX-010` para copy | UI distingue solicitud, acceso revocado, procesamiento y cierre confirmado |
| `useAccountDeletion` envía `otp_verified: true` desde cliente mientras la superficie inspeccionada no muestra una verificación OTP separada | el cliente puede afirmar una verificación de alto impacto | frontera AUTH/privacidad aplicable | servidor verifica la prueba requerida y no confía en afirmación cliente |
| `useUserData` convierte errores de lectura en `full_name: null` y `loyalty_points: 0` | error puede parecer dato real | `PASS-UX-012` + implementación posterior | error, ausencia y cero confirmado permanecen distinguibles |

Ningún hallazgo autoriza modificación física desde esta tarea.

---

#### 24. Responsabilidad de tareas y contratos posteriores

| Responsabilidad | Propietario canónico |
| --- | --- |
| estados completos pendiente/usado/cancelado de redención | `PASS-UX-009` |
| copy final, advertencias y mensajes de error | `PASS-UX-010` |
| navegación, rutas y aliases | `PASS-UX-011` |
| carga, error, offline y recuperación móvil | `PASS-UX-012` |
| validación con clientes reales | `PASS-UX-013` |
| portal y caso transversal de derechos de privacidad | `INFO-UX-004` |
| reglas de consentimiento, retención, supresión y gobierno de información | tareas `INFO-*` propietarias ya aprobadas |
| separación cliente-trabajador e integraciones de identidad | contratos `PASS-INT-*` y AUTH aplicables |
| cambios de esquema, políticas, Edge Functions o datos | transición física gobernada desde `vento-shell` |

`PASS-UX-008` entrega el contrato visible a esos propietarios sin materializar su backend.

---

#### 25. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea materializa una experiencia visible ya cubierta por obligaciones existentes sobre separación de persona/cuenta/perfil/contacto/preferencia/consentimiento, trazabilidad de aceptación y revocación, ejercicio de derechos, eliminación y retención, minimización de datos, separación cliente-trabajador y reconciliación de superficies PASS. No introduce una obligación verificable material nueva que requiera una fila adicional.

Balance:

- creados: **0**;
- modificados: **0**;
- diferidos: **0**;
- descartados: **0**;
- obsoletos: **0**.

---

#### 26. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-010`, para separar persona, cuenta autenticada, contactos, verificaciones, relación de marca, perfil, preferencias y consentimientos, con finalidad, canal, versión, fuente, vigencia y retiro;
- `TREQ-PASS-012`, para evidencia de autorizaciones y preferencias, revocación, derechos de acceso/actualización/rectificación/supresión, eliminación de cuenta, retención y reconciliación de dominios;
- `TREQ-PASS-015` a `TREQ-PASS-017`, para conservar la frontera cliente-trabajador y minimizar las proyecciones laborales dentro de PASS;
- `TREQ-PASS-033`, para aislar fallos de módulos laborales de la experiencia normal de cliente;
- `TREQ-PASS-041` y `TREQ-PASS-042`, para mantener reconciliadas las superficies AS-IS y las identidades canónicas de PASS;
- `TREQ-AUTH-006`, como cobertura transversal de minimización y protección de atributos sensibles cuando aplique.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 27. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | No se ejecutó build; la tarea es documental y la incorporación al checkout aún no se realizó. |
| LOCAL | `NOT_EXECUTED` | No se ejecutó la batería local del repositorio sobre la tarea todavía no incorporada. |
| REMOTA | `PASS` | Se inspeccionaron `main`, owner, topología, políticas, 04A, catálogo `VSCREEN/VPROC`, tareas de privacidad y snapshot runtime actual de `vento-pass`. |
| OPERATIVA | `NOT_EXECUTED` | No se realizó prueba con cliente, sesión real ni flujo de privacidad desplegado. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-008` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

La validación real del repositorio se ejecuta únicamente después de incorporar el artefacto en la rama documental autorizada.

---

#### 28. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-008 — Diseñar perfil del cliente`.
- [x] Se utiliza `VSCREEN-0112` sin crear una nueva identidad de pantalla.
- [x] `CompleteProfile` y `AccountSettings` convergen semánticamente sobre un único workspace de perfil/privacidad.
- [x] Persona, cuenta, perfil, contacto, preferencia, consentimiento y perfil laboral permanecen separados.
- [x] Completitud de perfil no equivale a consentimiento ni verificación total.
- [x] Correo y teléfono distinguen valor, verificación y finalidades autorizadas.
- [x] Documento de identidad no se declara libremente editable por inferencia.
- [x] Fecha de nacimiento conserva finalidad visible y no amplía su uso silenciosamente.
- [x] Consentimientos conservan finalidad, canal, versión, fuente, fecha, vigencia y retiro cuando aplique.
- [x] Política mostrada, aceptación registrada y consentimiento específico no se confunden.
- [x] Preferencias no se utilizan como evidencia de consentimiento.
- [x] Actualización directa, cambio verificado y solicitud de rectificación se distinguen.
- [x] Solicitud de privacidad no equivale a resolución final.
- [x] Limpieza opcional no equivale a eliminación de cuenta.
- [x] Revocar acceso, eliminar cuenta, suprimir, anonimizar y retener permanecen acciones distintas.
- [x] Acciones de alto impacto no confían únicamente en afirmaciones del cliente.
- [x] Perfil personal y contexto laboral permanecen separados.
- [x] Cambios de perfil no reescriben ledger ni historia de fidelización.
- [x] Error, ausencia, dato no verificado y valor confirmado son estados distintos.
- [x] Cada hallazgo AS-IS tiene propietario y condición de salida.
- [x] Se crean cero requisitos de prueba.
- [x] Se modifican cero requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, Supabase, Auth, datos, Edge Functions, package, CI022, piloto ni despliegue.
- [x] `PASS-UX-009` queda reservada y no se desarrolla en esta tarea.

---

#### 29. Límites

Esta tarea no:

- modifica `CompleteProfile.tsx`, `ProfileForm.tsx`, `AccountSettings.tsx`, hooks ni `App.js`;
- crea formularios, rutas o pantallas runtime nuevas;
- define esquema físico de perfil, consentimiento, preferencias o solicitudes;
- decide columnas, tablas, vistas, RPC, triggers, funciones o eventos;
- modifica Auth, RLS, Storage, Realtime, Edge Functions, secretos o Supabase;
- cambia políticas legales ni redacta textos jurídicos;
- define qué fundamento legal aplica a una finalidad concreta;
- ejecuta verificación de documento, teléfono, correo u OTP;
- convierte una casilla local en evidencia canónica;
- administra perfiles de terceros;
- fusiona personas por nombre, correo o teléfono;
- modifica saldo, puntos, ledger, nivel, recompensas o redenciones;
- elimina ni anonimiza datos;
- declara una solicitud de privacidad completada;
- define la política material de retención;
- define copy final de errores o confirmaciones;
- consolida rutas, aliases o deep links;
- define estrategia offline/retry completa;
- autoriza packages, implementación física, CI022, piloto ni rollout;
- declara validación operativa realizada;
- desarrolla `PASS-UX-009`, `PASS-UX-010`, `PASS-UX-011`, `PASS-UX-012`, `INFO-UX-004` ni tareas físicas relacionadas.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-007 — Diseñar catálogo de recompensas`

**TAREA ACTUAL APROBADA**
`PASS-UX-008 — Diseñar perfil del cliente`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado`
### ✅ PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-008 — Diseñar perfil del cliente
**Tarea siguiente:** PASS-UX-010 — Definir mensajes de error comprensibles
**Tipo de tarea:** documental; definición objetivo de la taxonomía visible y reglas de transición de una redención PASS entre pendiente, usada y cancelada, preservando vigencia/vencimiento como condición no utilizable distinta, separando creación de ticket, consumo PULSO, efecto de puntos e historial, y reconciliando la presentación de `VSCREEN-0110`, `VSCREEN-0111` y `VSCREEN-0086` sin crear un enum físico nuevo; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, PULSO, Wallet, secretos, despliegues, enums, constraints ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe comprender el cliente el ciclo de una redención desde que existe una intención confirmada hasta que la credencial es usada, cancelada o deja de ser utilizable por vencimiento, sin confundir el estado de presentación con el momento del débito de puntos ni con una inferencia local.

La tarea especializa la semántica ya entregada por `PASS-UX-005` y `PASS-UX-006`:

- `VSCREEN-0110 — Ticket o QR de redención` presenta la intención vigente, su credencial, estado y vigencia;
- `VSCREEN-0086 — Redención de puntos o beneficios` valida y consume operativamente una redención autorizada desde PULSO;
- `VSCREEN-0111 — Historial de puntos y redenciones` conserva el recibo y la evidencia histórica del ciclo;
- el ledger de puntos sigue siendo autoridad del movimiento contable y no se sustituye por una etiqueta de estado de redención.

El resultado fija taxonomía visible, transiciones permitidas, fechas, usabilidad del QR, filtros, estados desconocidos, relación con vencimiento, cancelación, reversión y handoffs posteriores. No crea estados de base de datos, no materializa la cancelación ni implementa el contrato PULSO → PASS.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-008`, aprobada por el usuario, que mantiene la separación entre identidad, cuenta, perfil, preferencias, consentimientos y contexto laboral y no altera el ciclo de fidelización.

Se consumen además estas decisiones aprobadas del mismo mini-bloque:

- `PASS-UX-005` separa `TICKET CREADO` de `REDENCIÓN USADA`, exige estado y vigencia visibles y prohíbe fabricar una credencial o un resultado terminal desde el cliente;
- `PASS-UX-006` separa recibo de redención y movimiento del ledger, exige fecha autoritativa por hecho y reserva a esta tarea la taxonomía completa de estados;
- `PASS-UX-007` separa recompensa visible, elegibilidad, redención y efecto comercial;
- PULSO conserva `VSCREEN-0086` como superficie operativa de validación y consumo.

La frontera de esta tarea es la semántica del lifecycle visible de la redención. La atomicidad, idempotencia, vigencia física, cancelación física, reserva o devolución de puntos, actor, permisos, sede, RPC y persistencia pertenecen a `PASS-INT-002`, contratos PULSO/AUTH y su materialización posterior.

---

#### 3. Identidades canónicas afectadas

| Campo | Decisión |
| --- | --- |
| Pantalla PASS de intención vigente | `VSCREEN-0110 — Ticket o QR de redención` |
| Pantalla PASS de auditoría histórica | `VSCREEN-0111 — Historial de puntos y redenciones` |
| Pantalla PULSO de consumo | `VSCREEN-0086 — Redención de puntos o beneficios` |
| Proceso | `VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` |
| Paso de creación | `VPROC-0045::STEP-CREATE_REDEMPTION_INTENT — Crear ticket de redención` |
| Paso de consumo | `VPROC-0045::STEP-REDEEM_LOYALTY_VALUE — Redimir puntos o beneficios` |
| Paso de auditoría | `VPROC-0045::STEP-AUDIT_PERSONAL_LOYALTY_LEDGER — Consultar historial de puntos y redenciones` |
| Topología | `DEFINE_ONCE` |
| Estado físico | `NO_PHYSICAL_INSTANCE` |

`PASS-UX-009` no crea una nueva identidad `VSCREEN-*`. Define un contrato común que las tres superficies consumen desde responsabilidades distintas.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot verificado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` `main` | `9e90f695ecc09e13d771441d8ac2a4910c471228` | continuidad, owner, topología, proceso, pantallas, 04A y backlog |
| archivo propietario | blob `b062b626ba7f9b95a7e5544ac9734be92fe0f939` | base remota con `PASS-UX-007` aprobada y marcador de `PASS-UX-009` reservado |
| `PASS-UX-008_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `174d0fee843dd107ddc2273d8793eb1019d4d812685f2353bf73a6bd082afd11` | base documental inmediata aprobada por el usuario y todavía pendiente de publicación |
| catálogo proceso-pantalla | blob `742ead71e5fc5c4ae85a3cb6a00feb858ba8c2a0` | `VSCREEN-0086`, `VSCREEN-0110`, `VSCREEN-0111` y sus pasos |
| Registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` | cobertura vigente de redención y presentación confirmada |
| auditoría de procesos parciales/legacy | blob `17da474928d7d0042170441ca79eb18dab412e72` | destino explícito hacia esta tarea y pruebas de redención |
| auditoría técnica y backlog | blob `2234bc064cc91e766e4e550fc8c3801d669ec894` | redención cliente no atómica y `BKL-PASS-005` |
| `carlosibarraariza/vento-pass` `main` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS |
| `useLoyaltyRedemptions.ts` | blob `8ed79b6ddb2070a870ab9cfd286cc1e120a647c6` | shape móvil `pending / validated / cancelled`, `created_at` y `validated_at` |
| `RedemptionCard.tsx` | blob `cdd598ce60cb293d474ae8d276e957a6b887f2ce` | etiquetas AS-IS `Pendiente`, `Usado`, `Cancelado` y fallback a pendiente |
| `QrPendingCard.tsx` | blob `062e1b3497fe98a60eedb1439fbd95fab1935540` | QR AS-IS rotulado `Listo para usar` por pertenecer a lista pending |
| `redemption.ts` | blob `845e4b33ba442bef12c40b8846c3730cfbe71319` | creación cliente AS-IS de redención `pending` y movimiento separado |
| `docs/SUPABASE-SCHEMA-ACTUAL.md` | blob `170d3af0c50516ef925023017502582408891862` | documento AS-IS que declara `pending / used / expired` y ausencia de `expires_at` |
| `vento-group-sas/vento-pulso` `main` | `715b5683db05caa010d725679b5ada4705a6da6e` | consumidor PULSO AS-IS |
| `redemption.api.ts` | blob `d4ea3e444b680b14ec39afe4a803e9fa3141c07c` | acepta solo `pending`, distingue `validated/cancelled` y escribe `validated_at` |
| `validate-redemption.action.ts` | blob `510f29d98747ff063876f3c5a14cd183f7faac9c` | orquestación de validación y consumo PULSO |
| `qr-scanner.tsx` | blob `345b624ed26ccd7257f700c2faaa430223b5ff55` | superficie que informa `Canje validado` después de respuesta del servidor |

Estos snapshots documentan el AS-IS; no autorizan adoptar sus nombres o vacíos como contrato físico definitivo.

---

#### 5. Modelo semántico raíz

La experiencia debe conservar estas diferencias:

```text
INTENCION CREADA
≠
CREDENCIAL UTILIZABLE
≠
REDENCION USADA
≠
REDENCION CANCELADA
≠
CREDENCIAL VENCIDA
≠
MOVIMIENTO DE PUNTOS
```

Consecuencias:

1. crear una redención no significa usarla;
2. disponer de QR no garantiza que siga utilizable;
3. `USADO` requiere confirmación autoritativa de consumo;
4. `CANCELADO` requiere una decisión autoritativa distinta del uso;
5. vencimiento y cancelación no son sinónimos;
6. el estado de redención no determina por sí solo cuándo se debitó, reservó, revirtió o compensó el saldo;
7. una etiqueta móvil nunca sustituye el estado confirmado de servidor.

---

#### 6. Taxonomía visible objetivo

La taxonomía principal solicitada por la tarea queda definida así:

| Estado visible | Significado mínimo | Usabilidad de credencial | Terminalidad visible |
| --- | --- | --- | --- |
| `PENDIENTE` | existe una intención confirmada que todavía no ha sido consumida ni cancelada y conserva las condiciones necesarias para intentar uso | puede presentarse únicamente cuando la vigencia y el estado autoritativos permitan intentar validación | no terminal |
| `USADO` | PULSO/servidor confirmó consumo de la misma redención exactamente una vez | no utilizable de nuevo | terminal para esa credencial |
| `CANCELADO` | una fuente autorizada confirmó que la intención fue cancelada antes de consumo o conforme al contrato aplicable | no utilizable | terminal para esa credencial |

El nombre físico AS-IS `validated` puede proyectarse al cliente como `USADO` porque el runtime actual lo utiliza para representar consumo confirmado. Esta tarea no renombra el valor persistido.

---

#### 7. Vencimiento como condición diferenciada

El contrato canónico operativo exige rechazar códigos usados, cancelados o vencidos. Por tanto, una credencial cuya vigencia autoritativa terminó no puede seguir presentándose simplemente como `PENDIENTE` utilizable.

Se fija:

```text
PENDIENTE Y VIGENTE
≠
VENCIDO
≠
CANCELADO
```

Reglas:

- `VENCIDO` representa imposibilidad de uso por fin de la vigencia autorizada;
- no implica que un actor haya cancelado la intención;
- no se transforma en `CANCELADO` para reutilizar una etiqueta existente;
- no se deriva de una duración inventada por el cliente;
- la fuente autoritativa debe entregar la vigencia o el resultado de no disponibilidad necesario para proyectarlo;
- esta tarea no exige que `VENCIDO` sea un cuarto valor físico de `status`; puede ser una proyección derivada de estado + vigencia autorizada;
- si la implementación futura decide persistirlo, esa decisión pertenece al contrato físico propietario y no a esta tarea documental.

Mientras no exista vigencia autoritativa suficiente, PASS no puede declarar una credencial indefinidamente válida ni vencida por inferencia.

---

#### 8. Estado desconocido, inconsistente o en conciliación

Un estado no reconocido, una combinación imposible o datos insuficientes no se degradan a `PENDIENTE`.

La UI debe representar una condición neutral no utilizable, por ejemplo conceptualmente:

```text
ESTADO_NO_CONFIRMADO
```

sin fijar todavía el copy final.

Casos que requieren este tratamiento incluyen:

- valor de estado desconocido para el adaptador vigente;
- `validated_at` presente con estado no usado;
- respuesta ambigua después de timeout;
- discrepancia entre recibo, ledger y respuesta de validación;
- credencial con vigencia ausente cuando el contrato exige conocerla para permitir uso;
- transición concurrente cuya respuesta final todavía no fue reconciliada.

`PASS-UX-010` definirá el mensaje humano y `PASS-UX-012` la recuperación visual/offline. Esta tarea solo prohíbe presentar esos casos como pendientes utilizables o terminales confirmados.

---

#### 9. Máquina de transición visible

Las transiciones de presentación permitidas son:

```text
PENDIENTE
  ├──> USADO
  ├──> CANCELADO
  └──> VENCIDO
```

Invariantes:

1. `PENDIENTE → USADO` solo después de consumo confirmado por contrato autorizado;
2. `PENDIENTE → CANCELADO` solo después de cancelación confirmada;
3. `PENDIENTE → VENCIDO` solo por vigencia autoritativa terminada;
4. `USADO` no vuelve a `PENDIENTE` por refresh, reinstalación, navegación, reloj local o replay;
5. `CANCELADO` no vuelve a `PENDIENTE` por volver a abrir el QR;
6. `VENCIDO` no se reactiva por cambiar la hora del dispositivo;
7. una reversión, compensación o corrección empresarial posterior conserva el hecho histórico original y se representa como efecto separado; no reescribe silenciosamente un uso ya confirmado.

La implementación física de estas transiciones pertenece al contrato de servidor e integración.

---

#### 10. Estado y efecto de puntos permanecen separados

La taxonomía de redención no decide por sí sola la semántica contable.

Se conserva:

```text
ESTADO DE REDENCION
≠
ESTADO DEL LEDGER
```

Por tanto:

- `PENDIENTE` no significa necesariamente que los puntos sigan disponibles;
- `USADO` no significa necesariamente que el débito de puntos ocurrió exactamente en ese instante;
- `CANCELADO` no promete devolución automática de puntos;
- `VENCIDO` no promete compensación automática;
- cualquier reserva, débito, reversión o compensación debe provenir de un movimiento autoritativo y reconciliable;
- `PASS-INT-002` define la relación transaccional definitiva entre intención, saldo y consumo sin contradecir esta separación.

---

#### 11. Presentación del estado pendiente

Una redención `PENDIENTE` debe comunicar que existe una intención todavía no consumida.

La presentación puede incluir:

- recompensa asociada;
- costo confirmado de la intención;
- fecha de creación correctamente rotulada como creación;
- sede o contexto de uso cuando aplique;
- vigencia autoritativa disponible;
- QR o código únicamente cuando la credencial esté disponible para intentar validación;
- acción de presentar/ver QR cuando siga siendo pertinente.

No puede afirmar:

- “usado”, “consumido” o equivalente;
- que el beneficio ya fue entregado;
- que una credencial sin vigencia conocida es válida indefinidamente;
- que saldo local suficiente garantiza consumo;
- que la presencia en una lista `pending` equivale por sí sola a `LISTO_PARA_USAR`.

---

#### 12. Presentación del estado usado

`USADO` representa consumo confirmado exactamente una vez.

Reglas:

- la fecha principal del uso debe provenir de la confirmación autoritativa correspondiente, actualmente `validated_at` en el shape AS-IS;
- `created_at` permanece fecha de creación y no se renombra como fecha de canje efectivo;
- el QR deja de presentarse como acción utilizable;
- un replay debe recuperar el mismo resultado o rechazarse sin crear un segundo uso;
- el historial conserva la redención aunque la credencial ya no sea utilizable;
- cualquier referencia a pedido o venta se presenta únicamente cuando exista correlación autorizada;
- el estado no depende de que una animación, notificación de rating o mensaje local haya ocurrido.

---

#### 13. Presentación del estado cancelado

`CANCELADO` representa una decisión terminal distinta del uso y del vencimiento.

Reglas:

- el QR no se ofrece como utilizable;
- no se muestra fecha de creación como fecha de cancelación;
- una fecha o motivo de cancelación solo se muestra si la fuente autorizada los entrega;
- la cancelación no implica automáticamente que el movimiento de puntos fue revertido;
- si existe devolución, reversión o compensación de puntos, el historial debe mostrar el efecto reconciliable correspondiente;
- el cliente no puede cancelar por mera navegación, cierre de modal o eliminación local de una tarjeta;
- esta tarea no crea un CTA de cancelación ni define quién puede ejecutar la cancelación física.

---

#### 14. Presentación del vencimiento

Cuando la fuente autoritativa demuestre que la vigencia terminó:

- el QR deja de exponerse como utilizable;
- la UI distingue vencimiento de cancelación;
- se conserva la fecha original de creación;
- la fecha o ventana de vigencia se presenta cuando exista;
- el historial conserva el recibo aunque ya no pueda utilizarse;
- el vencimiento no crea por sí mismo un nuevo débito, devolución o compensación;
- una credencial vencida permanece rechazada aunque el dispositivo cambie su reloj hacia atrás.

El runtime móvil AS-IS no expone `expires_at` en `useLoyaltyRedemptions` y su documento de esquema declara ese campo como faltante. La ausencia se registra como brecha física, no como permiso para inventar una duración.

---

#### 15. Fechas y hechos de lifecycle

Cada fecha debe conservar su significado:

| Hecho | Fecha visible objetivo |
| --- | --- |
| intención creada | `created_at` o equivalente autoritativo de creación |
| redención usada | `validated_at` o equivalente autoritativo de consumo |
| redención cancelada | timestamp de cancelación cuando exista en la fuente autorizada |
| vigencia termina | timestamp o condición de expiración autoritativa cuando exista |
| reversión/compensación de puntos | fecha propia del movimiento de ledger correspondiente |

Prohibiciones:

- etiquetar `created_at` como “Canjeado el” para una redención usada;
- usar la hora de apertura de pantalla como fecha de cambio de estado;
- copiar `validated_at` como fecha de cancelación;
- inventar una fecha de expiración desde `created_at` + duración local no autorizada.

---

#### 16. QR y acciones por estado

| Estado/condición | Mostrar QR como acción utilizable | Regla |
| --- | --- | --- |
| `PENDIENTE` vigente | sí, cuando la fuente autoritativa permita presentarlo | revalidación PULSO sigue siendo obligatoria |
| `USADO` | no | puede conservarse referencia histórica, nunca como credencial reejecutable |
| `CANCELADO` | no | cancelación terminal de la credencial |
| `VENCIDO` | no | vigencia terminada |
| estado no confirmado/conflicto | no | primero reconciliar |

Ocultar el QR utilizable no elimina la entrada histórica ni el recibo de redención.

---

#### 17. Filtros, agrupación e historial

Los filtros de historial son mecanismos de lectura, no fuentes de estado.

Se fija:

- “Todos” incluye todas las redenciones recuperadas dentro del alcance de consulta, incluidas vencidas y estados no confirmados;
- `validated` AS-IS se adapta a la categoría visible `USADO`;
- `cancelled` AS-IS se adapta a `CANCELADO`;
- una redención vencida no se oculta dentro de `CANCELADO`;
- un estado desconocido no cae al filtro `PENDIENTE` por defecto;
- agrupar por fecha no cambia la fecha autoritativa que corresponde al estado representado;
- la lista de QR pendientes solo contiene credenciales cuya proyección permita intentar uso; no basta con `status === "pending"` si la vigencia autoritativa indica lo contrario.

Esta tarea no fija nombres finales de tabs o chips; el copy final pertenece a `PASS-UX-010`.

---

#### 18. Convergencia entre experiencias PASS

Vento Café, Saudo y las experiencias satélite deben presentar la misma semántica para la misma redención.

Una misma identidad de redención no puede aparecer simultáneamente:

- `PENDIENTE` en una ruta y `USADO` en otra por caché no reconciliada;
- `USADO` en historial y todavía utilizable en la cuadrícula de QR;
- `CANCELADO` en una experiencia y omitido silenciosamente en otra;
- con `created_at` como fecha de uso en una ruta y `validated_at` en otra.

La implementación puede reutilizar componentes distintos, pero la proyección semántica debe converger. `PASS-UX-011` resolverá navegación y rutas, y `PASS-UX-012` frescura, retry y recuperación.

---

#### 19. Relación con PULSO y consumo operativo

PULSO conserva `VSCREEN-0086` y debe validar una redención bajo su contexto operativo.

La experiencia PASS consume únicamente el resultado autoritativo:

```text
PASS PENDIENTE
→ PULSO VALIDA
→ SERVIDOR TRANSICIONA EXACTAMENTE UNA VEZ
→ PASS RECONCILIA
→ USADO
```

Una respuesta PULSO fallida no se convierte automáticamente en `CANCELADO`. Debe distinguirse entre:

- código ya usado;
- código cancelado;
- código vencido;
- código de otra sede o contexto incompatible;
- denegación de actor/permisos;
- conflicto concurrente;
- error técnico recuperable;
- resultado ya aplicado.

`PASS-UX-010` definirá el mensaje final para cada familia y `PASS-INT-002` el contrato transaccional.

---

#### 20. Drift AS-IS detectado

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `useLoyaltyRedemptions` tipa `pending / validated / cancelled`, mientras `docs/SUPABASE-SCHEMA-ACTUAL.md` documenta `pending / used / expired` | dos taxonomías físicas aparentes para el mismo dominio | `PASS-INT-002`, transición Supabase/contrato aplicable | schema, tipos, adaptadores y servidor convergen sobre un contrato versionado sin romper historia |
| `RedemptionCard` convierte cualquier estado desconocido en `Pendiente` | un estado inválido o nuevo puede mostrarse como utilizable | implementación de `PASS-UX-009` + `PASS-UX-012` | fallback fail-closed y no utilizable con recuperación explícita |
| `RedemptionCard` siempre muestra `created_at` como fecha principal | una redención usada puede mostrar creación como si fuera uso | implementación de `PASS-UX-009` | fecha visible depende del hecho representado y conserva etiquetas correctas |
| `QrPendingCard` muestra `Listo para usar` solo por pertenecer a la lista pending | omite vigencia, cancelación concurrente o conflicto | implementación de `PASS-UX-009` + `PASS-INT-002` | usabilidad deriva de proyección autoritativa y vigencia confirmada |
| `useLoyaltyRedemptions` no expone `expires_at` | PASS no puede representar vencimiento autoritativo desde ese shape | `PASS-INT-002` + transición de datos/contrato | proyección entrega vigencia necesaria sin duración inventada |
| documento de esquema PASS declara que `expires_at` falta | contrato visible exige vigencia pero el runtime documentado no la materializa | `PASS-INT-002` + transición Supabase aplicable | vigencia materializada y consumida por PASS/PULSO con pruebas |
| `processRedemption` crea `pending` y movimiento de puntos desde cliente en pasos separados | estado y ledger pueden divergir | `PASS-INT-002`, `PASS-QA-002`, `BKL-PASS-005` | operación server-side atómica e idempotente gobierna intención y efecto |
| PULSO actual acepta cualquier `pending`, escribe `validated` y no verifica vigencia ni sede en `redemption.api.ts` | puede consumir un código vencido o territorialmente inválido | `PULSO-AUTH-010`, `PASS-INT-002`, packages propietarios | validación de código, usuario, recompensa, sede, estado, vigencia, actor y no uso previo queda implementada y probada |
| PULSO actual distingue `validated/cancelled` por mensaje, pero no existe rama explícita de vencimiento en ese API | vencimiento contractual no está materializado en el consumidor observado | `PASS-INT-002` + PULSO/Auth propietario | código vencido se rechaza sin efecto y la razón se conserva de forma verificable |
| filtros PASS usan `pending / validated / cancelled` | vencidos o estados nuevos pueden quedar fuera de la taxonomía visible | implementación de `PASS-UX-009` | filtros no omiten vencidos ni estados no confirmados |

Ningún hallazgo autoriza cambios físicos desde esta tarea documental.

---

#### 21. Reversión, compensación y corrección

Una corrección posterior no reescribe el hecho histórico de uso.

Ejemplo conceptual:

```text
REDENCION USADA
+
MOVIMIENTO DE REVERSIÓN O COMPENSACIÓN
```

no se representa como:

```text
REDENCION NUNCA USADA
```

Reglas:

- si un canje usado debe compensarse, el recibo conserva que fue usado;
- el movimiento correctivo conserva identidad y causa propias;
- una cancelación previa al uso puede tener efecto de puntos diferente de una compensación posterior al uso;
- la UI no asume devolución porque el estado cambie;
- `PASS-UX-006` conserva la historia y `PASS-INT-002` la semántica transaccional.

---

#### 22. Responsabilidad de tareas posteriores

| Responsabilidad | Tarea propietaria |
| --- | --- |
| copy final de estados, rechazos y errores | `PASS-UX-010` |
| navegación y rutas canónicas | `PASS-UX-011` |
| carga, error, offline, frescura, retry y recuperación | `PASS-UX-012` |
| validación con clientes reales | `PASS-UX-013` |
| atomicidad, idempotencia, código, vigencia, cancelación, consumo, reversión y conciliación PULSO → PASS | `PASS-INT-002` |
| administración laboral de productos de fidelización | `PASS-INT-003` |
| protección operativa de redenciones | `PULSO-AUTH-010` y contratos de autorización aplicables |
| prueba completa de redención | `PASS-QA-002` |
| saneamiento de esquema, datos o transición de estados | tareas `SUPA-*` y packages propietarios ya definidos por el plan |

`PASS-UX-009` no adelanta ni materializa esas responsabilidades.

---

#### 23. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el registro vigente ya exige que la redención sea autorizada, atómica e idempotente; que PULSO valide código, usuario, recompensa, sede, estado pendiente, vigencia, actor y no utilización previa; que códigos usados, cancelados o vencidos fallen sin efecto; que la interfaz no anticipe éxito y distinga resultados ambiguos o ya aplicados; y que las superficies PASS converjan sin inventar estado. Esta tarea convierte esas obligaciones en una taxonomía visible coherente y en reglas de presentación/transición sin introducir una obligación verificable material nueva.

---

#### 24. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-006`, para convergencia de recompensas e historial entre experiencias estáticas y dinámicas;
- `TREQ-PASS-008`, para contratos autorizados, atómicos e idempotentes de gasto y redención y para impedir mutación cliente del ledger;
- `TREQ-PASS-010`, para ledger reconciliable, evento origen, regla, versión, expiración, reversión y compensación;
- `TREQ-PASS-027`, para validar código, usuario, recompensa, sede, estado pendiente, vigencia, saldo debitado o reservado, actor efectivo y no utilización previa, y rechazar usados, cancelados o vencidos;
- `TREQ-PASS-032`, para que procesamiento, éxito y error correspondan al resultado confirmado de servidor y distingan duplicado, conflicto, denegación y resultado ya aplicado;
- `TREQ-PASS-034`, para conservar propiedad PASS/PULSO sin duplicar mutaciones operativas;
- `TREQ-PASS-041`, para no asumir equivalencia uno a uno entre superficie AS-IS e identidad canónica;
- `TREQ-PASS-042`, para detectar deriva entre inventario canónico y runtime cuando exista checkout hermano.

Esta sección es únicamente trazabilidad de cobertura existente.

---

#### 25. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La batería documental real se ejecutará únicamente después del cierre de `PASS-UX-008` con `NEXT_TASK_ALLOWED: SI` y de la incorporación de esta tarea en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-009` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, owner, topología `PASS-UX`, catálogo `VSCREEN-0086/0110/0111`, `VPROC-0045`, Registro 04A PASS, auditorías de redención, `vento-pass/main`, hooks/componentes de redención, documento de esquema PASS, `vento-pulso/main`, API/acción/scanner de redención y los contratos TREQ vigentes. |
| OPERATIVA | `NOT_EXECUTED` | No se creó, usó, canceló, venció, revirtió ni reconcilió una redención en ambiente desplegado, POS, Supabase remoto o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-009` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 26. Criterios de aceptación

- [x] Se desarrolla exactamente `PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado`.
- [x] No se crea una nueva identidad `VSCREEN-*`.
- [x] `VSCREEN-0110`, `VSCREEN-0111` y `VSCREEN-0086` consumen una semántica coherente desde responsabilidades distintas.
- [x] `PENDIENTE` se diferencia de creación local, uso y terminalidad.
- [x] `USADO` exige confirmación autoritativa y conserva fecha real de uso.
- [x] `CANCELADO` se diferencia de usado y vencido.
- [x] El vencimiento queda distinguido como condición no utilizable sin exigir un enum físico nuevo.
- [x] Un estado desconocido o inconsistente no se degrada a pendiente.
- [x] `created_at` no se presenta como fecha de uso, cancelación ni expiración.
- [x] El QR solo se presenta como utilizable cuando estado y vigencia lo permiten.
- [x] El estado de redención se mantiene separado del efecto de puntos.
- [x] Una reversión o compensación no reescribe el hecho histórico de uso.
- [x] Se documenta la deriva AS-IS `pending/validated/cancelled` frente a `pending/used/expired` sin adoptar silenciosamente ninguna como contrato físico nuevo.
- [x] Se documenta que PULSO AS-IS no verifica vigencia ni sede en el API observado y se asigna salida a sus propietarios canónicos.
- [x] Las experiencias PASS deben converger sobre la misma redención.
- [x] `PASS-UX-010` queda reservada para copy final y no se desarrolla en esta tarea.
- [x] Se crean cero requisitos de prueba y no se modifica 04A.
- [x] No se autoriza código, Supabase, PULSO runtime, package, CI022, piloto ni despliegue.

---

#### 27. Límites

Esta tarea no:

- implementa `RedemptionCard`, `QrPendingCard`, `QrFullscreenModal`, `useLoyaltyRedemptions` ni `processRedemption`;
- modifica `redemption.api.ts`, `validate-redemption.action.ts` ni `qr-scanner.tsx`;
- crea o renombra valores físicos de `status`;
- crea `expires_at`, `cancelled_at` ni otro campo;
- modifica constraints, tablas, RLS, RPC, Edge Functions, migraciones o datos;
- define una duración fija de redención;
- autoriza cancelación desde cliente;
- decide cuándo se debitan, reservan, devuelven o compensan puntos;
- define política económica de devolución;
- implementa validación territorial, de actor o dispositivo;
- define copy final de estados, errores o confirmaciones;
- diseña navegación global;
- resuelve estrategia offline, caché o retry completa;
- ejecuta pruebas E2E de redención;
- modifica Wallet;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- desarrolla `PASS-UX-010`, `PASS-INT-002` ni `PASS-QA-002`.

---

#### 28. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-008 — Diseñar perfil del cliente`

**TAREA ACTUAL APROBADA**
`PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-010 — Definir mensajes de error comprensibles`
### [ ] PASS-UX-010 — Definir mensajes de error comprensibles
### [ ] PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente
### [ ] PASS-UX-012 — Simplificar interfaz móvil, estados de carga, error, offline y recuperación
### [ ] PASS-UX-013 — Ejecutar pruebas con clientes reales
