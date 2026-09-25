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
### ✅ PASS-UX-010 — Definir mensajes de error comprensibles

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado
**Tarea siguiente:** PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente
**Tipo de tarea:** documental; definición del contrato visible de mensajes humanos, seguros y accionables para bloqueos, validaciones, esperas, conflictos, fallos técnicos, resultados inciertos, advertencias y estados informativos de las diecinueve pantallas canónicas PASS y sus superficies globales de acceso/recuperación, consumiendo la gramática transversal de `UX-BASE-006` y los contratos de `PROC-SCREEN-018..021` sin redefinir lógica de dominio, recuperación, retry u offline; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación runtime, datos, Supabase, migraciones, RLS, RPC, Edge Functions, PULSO, Wallet, secretos, despliegues, componentes, traducciones, reason codes, estados de dominio ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo PASS comunica al cliente una condición que impide, limita, retrasa, rechaza o deja incierto un resultado sin obligarlo a interpretar excepciones técnicas, códigos internos o estados ambiguos.

El contrato visible debe permitir responder, según corresponda:

```text
¿QUÉ OCURRIÓ?
¿QUÉ ACCIÓN O DATO QUEDÓ AFECTADO?
¿QUÉ INFORMACIÓN SIGUE CONFIRMADA O GUARDADA?
¿QUÉ PUEDO HACER AHORA?
¿ES SEGURO REINTENTAR?
¿DEBO ESPERAR, CORREGIR, ACTUALIZAR O PEDIR AYUDA?
¿QUÉ REFERENCIA PUEDO USAR SI NECESITO SOPORTE?
```

La tarea no convierte copy en lógica. La causa, categoría, estado, autorización, retry y resultado empresarial deben provenir de contratos propietarios; PASS únicamente los traduce a una explicación comprensible y segura.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-009`, aprobada por el usuario, que entrega una taxonomía visible de redención donde pendiente, usado, cancelado y vencido/no utilizable permanecen semánticamente diferenciados y donde un estado desconocido no puede degradarse a pendiente.

Se conservan además estas decisiones aprobadas:

- `PASS-UX-002` define la arquitectura del home y prohíbe fabricar valores o capacidades desde la presentación;
- `PASS-UX-003` separa identificación personal de autorización, acumulación y redención;
- `PASS-UX-004` distingue confirmación, rechazo, conflicto y resultado todavía no conciliado para acumulación;
- `PASS-UX-005` distingue ticket creado de redención usada y prohíbe afirmar consumo antes de confirmación;
- `PASS-UX-006` distingue ausencia de historial de error, parcialidad o atribución desconocida;
- `PASS-UX-007` separa visibilidad, elegibilidad, intención de redención y efecto comercial;
- `PASS-UX-008` separa perfil, cuenta, datos, preferencias, consentimientos y solicitudes de privacidad;
- `PASS-UX-009` fija la semántica de estado de redención que esta tarea deberá expresar sin alterarla.

Se consumen como contratos transversales vigentes:

- `UX-BASE-006 — Explicar bloqueos con lenguaje humano`;
- `PROC-SCREEN-018 — Definir estados vacíos`;
- `PROC-SCREEN-019 — Definir estados de carga`;
- `PROC-SCREEN-020 — Definir estados de bloqueo`;
- `PROC-SCREEN-021 — Definir recuperación ante errores`.

La frontera de `PASS-UX-010` es exclusivamente el **contenido visible, estructura, seguridad, tono, acción comunicada y consistencia semántica** de los mensajes PASS. La mecánica de recuperación, reintento, conectividad, caché, reanudación y offline permanece en `PASS-UX-012` y en los contratos transversales propietarios.

---

#### 3. Universo canónico cubierto

La tarea aplica a las diecinueve pantallas canónicas PASS ya registradas:

| Grupo | Identidades |
| --- | --- |
| fidelización personal | `VSCREEN-0107` a `VSCREEN-0112` |
| compra, pedido y servicio | `VSCREEN-0160` a `VSCREEN-0172` |

También gobierna el copy de las superficies runtime globales ya inventariadas cuando representan estados de cliente:

| Superficie | Uso dentro de esta tarea |
| --- | --- |
| `PASS-CUSTOMER-SURFACE-001 — Auth` | acceso, recuperación y errores sin enumeración de cuenta |
| `PASS-CUSTOMER-SURFACE-002 — CompleteProfile` | validación y persistencia del perfil |
| `PASS-CUSTOMER-SURFACE-018 — QrModal` | identificación y Wallet sin filtrar detalles técnicos |
| `PASS-CUSTOMER-SURFACE-019 — AppUpdateGate` | actualización requerida u opcional como bloqueo/aviso, no como error genérico |
| `PASS-CUSTOMER-SURFACE-020 — App runtime gates` | carga/configuración/perfil separados de error |
| `PASS-CUSTOMER-SURFACE-021 — AppErrorBoundary` | fallo inesperado global con copy seguro y recuperación acotada |

`PASS-UX-010` no crea nuevas `VSCREEN-*`, rutas ni superficies lógicas.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot verificado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` `main` | `5a82fc516a0b040c852e7c9df1ad8d7f68ecf231` | continuidad, owner, topología, catálogo de pantallas y contratos transversales |
| archivo propietario PASS | blob `689cf2c9d1b98da8a6923f711768af825ef29697` | base remota con `PASS-UX-008` aprobada y marcadores posteriores reservados |
| `PASS-UX-009_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `f119cb5f9bcfefcbd33a509da203134f55f721b303b7d64c02c34b5010cf28c0` | base documental inmediata aprobada por el usuario y todavía pendiente de publicación |
| contrato de mensajes transversal | blob `f83ad4a91fbaf6fe6644ff77ee85786a8cfc2e98` | gramática de explicación humana, categorías y límites de seguridad |
| contrato transversal de recuperación | blob `fa96a630fa12cf6e0618cd7c2bda33abfd955626` | error ≠ vacío/bloqueo/carga, resultado unknown, preservación y políticas de retry |
| Registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` | cobertura vigente PASS |
| Registro 04A UX | blob `3a571f6e15147d6c26199fcbe671a66c9bbe0ff9` | cobertura transversal vigente de mensajes y recuperación |
| `carlosibarraariza/vento-pass` `main` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS verificable |
| `EmptyState.tsx` | blob `c027713de25d6d4cb676f4759dedb87bce976836` | componente AS-IS de título/mensaje vacío sin semántica de error propia |
| `RedeemModal.tsx` | blob `318e11f3d9fb532bb5c21e14b9e98c8a6cd930eb` | warning AS-IS de irreversibilidad no demostrado |
| `SuccessModal.tsx` | blob `2dc0479632def321af51781217a8b5c7a3d9a2ce` | copy AS-IS que afirma “Canje exitoso” antes del consumo PULSO |
| `QrFullscreenModal.tsx` | blob `d195cc848d5b64a57cdd0a5b2a8865ff90bb8f86` | “QR no disponible”, fecha de creación rotulada como canje y contexto hardcoded |
| `CompleteProfile.tsx` | blob `aea4a6a509f347da3f87063b18b9b07cec86e5eb` | exposición AS-IS de `error.message` y mensajes genéricos de sesión |
| `AccountSettings.tsx` | blob `f9fc199ecdd1b7fbdd26e000bbdad4635bb7a308` | error genérico de apertura de enlaces |
| `DeleteAccountFlow.tsx` | blob `c6317fe52420920300462f60b9d9043eb708940d` | copy AS-IS que puede equiparar comando exitoso con eliminación completamente reconciliada |
| `DataCleanupFlow.tsx` | blob `e947a4967ff521ce87affdc9b8c596f279552dbd` | copy AS-IS de limpieza de datos opcionales |
| `AppUpdateGate.js` | blob `0fee8cdcc04720eca8f79314ca8f5441490c70b8` | actualización requerida/opcional y estado de enlace de tienda |
| `AppErrorBoundary.js` | blob `3b4510be910d69504614623eceb1cf98a786889c` | render AS-IS de `error.message` técnico directamente al cliente |
| `clubErrors.ts` | blob `654f8e5ef86d0b2903d1aeea161029873daf3fbb` | precedente AS-IS de traducción de error técnico a mensaje amigable |
| `useSatelliteExperiences.ts` | blob `eb216e02932e9e814aae6d7ef16e3a933384f621` | ausencia, not-found y fallo de carga diferenciados parcialmente |
| `OrderMenu.tsx` | blob `6ee4619c1504dce17ac84c4715ce7e6e48be6295` | validaciones locales, fallo de catálogo y vacío AS-IS |
| `OrderCheckout.tsx` | blob `ad5895ae98c6f1c2e58de327c340aa0d47fb539c` | validación contextual de modalidad/programación |
| `OrderPlacedScreen.tsx` | blob `e6c06e3f571c3a50914277c352b0853e247d4cae` | espera, pago confirmado/fallido, error de lectura y parcialidad de detalle |
| `OrderTrackingScreen.tsx` | blob `b006f4443f39b443f38cd71ad4142d777ff66c91` | estados de PIN, espera, vencimiento/cancelación y fallo silencioso de RPC |
| `OrderChatScreen.tsx` | blob `647a279b2dbec8077c8ad044e064f51639bb2ed0` | carga, realtime offline, error de apertura y fallo de envío con preservación de borrador |
| `DeliveryAddressesScreen.tsx` | blob `d0793580c30b8a712ea6e61e8d2de720bb6f9a32` | fallo de lectura silencioso y error de eliminación |

La revisión es documental y remota; no demuestra comportamiento operativo desplegado.

---

#### 5. Regla raíz: mensaje visible no es autoridad

```text
MENSAJE HUMANO
!=
REASON CODE
!=
ESTADO DE DOMINIO
!=
DECISION DE AUTORIZACION
!=
EXCEPCION TECNICA
!=
POLITICA DE RETRY
```

El mensaje se deriva de una razón o estado gobernado y nunca se utiliza para decidir qué ocurrió.

Prohibiciones:

1. comparar strings visibles para inferir estado;
2. usar `error.message` como contrato de negocio;
3. convertir un texto local en autorización o elegibilidad;
4. transformar un copy de éxito en evidencia de persistencia;
5. elegir retry, cancelación o navegación a partir de palabras mostradas al cliente.

El mismo hecho empresarial debe conservar significado aunque cambie su redacción humana.

---

#### 6. Clasificación visible obligatoria

PASS adopta la clasificación transversal ya aprobada sin crear un vocabulario competidor:

| Clase | Significado en PASS | Presentación esperada |
| --- | --- | --- |
| `VALIDATION_REQUIRED` | el cliente puede corregir un dato o selección | señalar exactamente qué debe corregir y conservar el resto |
| `BLOCKED` | la acción puede ser válida después, pero falta una condición | explicar condición y siguiente paso seguro |
| `DENIED` | la acción no está permitida para ese actor, cuenta, alcance o recurso | explicar el límite sin revelar controles internos ni bypass |
| `WAITING` | se espera normalmente confirmación, tiempo, proveedor o actor | comunicar qué se espera y qué no debe repetirse |
| `CONFLICT` | cambió recurso, versión, precio, disponibilidad o estado | detener, actualizar y comparar sin sobrescribir silenciosamente |
| `TECHNICAL_FAILURE` | falló o no respondió una dependencia técnica | informar alcance conocido, estado preservado y acción segura |
| `WARNING` | puede continuarse, pero existe una consecuencia relevante | explicar consecuencia sin presentar fallo |
| `INFO` | condición o resultado relevante sin acción urgente | informar sin competir con la tarea principal |

Un resultado distinto de éxito no se convierte automáticamente en `TECHNICAL_FAILURE`.

---

#### 7. Estados que no son errores

PASS debe mantener separadas estas condiciones:

```text
VACIO CONFIRMADO
CARGA EN CURSO
ESPERA NORMAL
BLOQUEO CONOCIDO
FALLO O RESULTADO INCIERTO
CONTENIDO PARCIAL
RESULTADO CONFIRMADO
```

Reglas:

- cero filas después de una consulta completa, fresca y autorizada puede ser vacío;
- cero filas producido por error, timeout, caché ausente o respuesta parcial no es vacío;
- `Pendiente`, `Esperando pago`, `Esperando confirmación` o una redención pendiente no son errores por sí mismos;
- una actualización requerida de aplicación es un bloqueo de compatibilidad; una actualización opcional es aviso/información;
- un recurso inexistente dentro del alcance propio y confirmado puede ser vacío/not-found; un fallo al consultarlo no permite afirmar inexistencia;
- realtime desconectado no implica que el último dato confirmado sea falso ni que un mensaje ya enviado haya fallado.

---

#### 8. Anatomía mínima del mensaje PASS

Cuando la situación lo requiera, el mensaje se compone de estas piezas semánticas:

| Pieza | Contrato |
| --- | --- |
| título humano | describe el impedimento o situación, no el subsistema técnico |
| causa segura | explica la condición conocida sin secretos ni detalles internos |
| efecto | indica qué acción o información queda afectada |
| estado preservado | aclara qué datos, selección, borrador o resultado confirmado se conservan |
| acción siguiente | ofrece una acción real y segura para el cliente actual |
| condición de reintento | indica si puede reintentar ahora, después, o si primero debe verificarse estado |
| soporte o propietario | identifica ayuda útil cuando el cliente no puede resolverlo |
| referencia segura | permite correlacionar soporte sin mostrar tokens, SQL, UUID sensibles completos ni trazas |

La interfaz puede condensar piezas cuando el contexto ya sea evidente, pero nunca puede eliminar información necesaria para evitar duplicidad, pérdida o una interpretación falsa del resultado.

---

#### 9. Reglas de redacción

Todo copy PASS de bloqueo/error deberá:

1. empezar por la consecuencia comprensible para el cliente;
2. utilizar verbos concretos y evitar jerga técnica;
3. diferenciar lo que se sabe de lo que todavía no se confirmó;
4. indicar una acción solo cuando exista realmente;
5. conservar tono neutral y no culpar al cliente por fallos del sistema;
6. no prometer tiempos, devolución, saldo, disponibilidad o resolución que la fuente no confirme;
7. no llamar “error” a una espera normal;
8. no llamar “éxito” a una aceptación aún pendiente de reconciliación;
9. no usar únicamente color, emoji o icono para comunicar severidad;
10. evitar dobles negaciones, códigos internos y frases como “algo salió mal” sin contexto adicional.

##### Catálogo mínimo de patrones humanos

Los siguientes patrones fijan una base semántica común. El detalle se especializa con la causa segura y el contexto real, sin convertir estos literales en códigos de lógica.

| Situación | Título base | Explicación mínima | Acción comunicable |
| --- | --- | --- | --- |
| validación corregible | `Revisa la información` | existe un dato o selección que debe corregirse antes de continuar | corregir el dato señalado |
| bloqueo conocido | `Todavía no puedes continuar` | falta una condición necesaria y conocida | completar la condición o esperar su resolución |
| denegación | `Esta acción no está disponible` | el alcance actual no permite realizarla | volver o usar una alternativa autorizada ya existente |
| espera normal | `Estamos esperando confirmación` | la operación sigue abierta y todavía no tiene resultado terminal | consultar/actualizar cuando el contrato lo permita; no repetir la mutación |
| conflicto | `La información cambió` | el recurso ya no coincide con la versión revisada | actualizar y revisar diferencias |
| fallo técnico de lectura | `No pudimos actualizar esta información` | la fuente no entregó un resultado confiable; se conserva lo último confirmado cuando exista | reintentar lectura segura o continuar con dato marcado como anterior si está permitido |
| resultado unknown de mutación | `Todavía no pudimos confirmar el resultado` | la operación pudo haber sido aceptada y requiere consulta/reconciliación | no repetir; consultar el mismo intento |
| duplicado o already-applied confirmado | `Esta operación ya fue registrada` | el mismo hecho ya tiene un resultado estable | mostrar el resultado existente sin generar otro efecto |
| resultado parcial | `Falta parte de la información` | solo una porción quedó confirmada | revisar lo disponible y actualizar la parte incompleta |
| recuperación global de pantalla | `Tuvimos un problema al abrir esta pantalla` | la vista no pudo continuar de forma segura | reiniciar/reintentar la vista sin inferir el estado de mutaciones previas |

Estos patrones no autorizan una CTA nueva ni sustituyen `PASS-UX-011` para navegación o `PASS-UX-012` para recuperación.

---

#### 10. Información técnica prohibida en copy de cliente

No se muestra directamente:

- `error.message` crudo proveniente de Supabase, PostgREST, proveedor, RPC, JavaScript o sistema operativo;
- códigos SQL, HTTP internos o PostgREST como `42501`, `PGRST*` o equivalentes salvo que exista una referencia pública expresamente diseñada para el cliente;
- nombres de tablas, schemas, policies, RPC, funciones, buckets o columnas;
- stack traces, archivos, líneas, nombres de clases internas o mensajes de excepción;
- access tokens, refresh tokens, PIN, OTP, session IDs, firmas, secretos o idempotency keys completas;
- existencia de recursos de terceros, permisos de otras personas o reglas antifraude;
- identificadores completos que no sean necesarios para soporte seguro.

Los detalles técnicos permanecen en observabilidad restringida y se correlacionan mediante una referencia segura.

---

#### 11. Validación corregible

Para `VALIDATION_REQUIRED`:

- el mensaje se ubica junto al dato afectado cuando exista campo concreto;
- si hay varios errores, se conserva además un resumen accesible;
- solo se muestran errores de campos que el cliente puede ver y corregir;
- el valor ingresado permanece salvo que su conservación sea insegura;
- corregir un campo no reinicia toda la captura;
- no se usa “Error” como único título cuando puede decirse exactamente qué falta o qué formato es inválido.

Ejemplos de intención válidos:

```text
Revisa tu número de teléfono.
Selecciona una franja disponible para esta modalidad.
Elige al menos una opción para este producto.
Confirma la política requerida para continuar con la activación.
```

La redacción final puede variar; la semántica no.

---

#### 12. Bloqueo, denegación y no elegibilidad

Estas condiciones permanecen diferentes:

```text
BLOCKED
-> falta una condición que puede llegar a satisfacerse

DENIED
-> la acción no está permitida bajo el alcance actual

NO ELEGIBLE
-> una regla de producto o fidelización no se cumple
```

Reglas PASS:

- saldo insuficiente no se presenta como error técnico;
- recompensa vencida o no disponible no se presenta como fallo de red;
- falta de sesión confirmada puede requerir autenticación; fallo al consultar sesión no autoriza afirmar que la sesión expiró;
- una actualización obligatoria puede bloquear uso hasta instalar versión compatible;
- una denegación no ofrece cambiar permisos, usar otra cuenta o buscar un bypass;
- la causa visible solo incluye la información que el cliente necesita y está autorizado a conocer.

---

#### 13. Espera normal y confirmaciones pendientes

`WAITING` se utiliza cuando el sistema conoce que el proceso sigue abierto y espera una confirmación legítima.

Ejemplos PASS:

- pago iniciado y todavía no confirmado;
- redención creada y todavía no usada;
- pedido aceptado pero aún no preparado;
- código de entrega que todavía no debe emitirse;
- solicitud de privacidad o eliminación aceptada pero aún no reconciliada completamente;
- mensaje o caso recibido y pendiente de respuesta.

Un estado `WAITING` debe indicar:

- qué confirmación falta;
- qué último estado está confirmado;
- si el cliente puede cerrar la vista y volver después;
- si existe una acción de actualización segura;
- qué acción no debe repetirse mientras el resultado siga pendiente.

---

#### 14. Conflictos y datos que cambiaron

Cuando precio, disponibilidad, recompensa, dirección, franja, pedido, perfil o versión cambien durante la interacción:

- no se sobrescribe silenciosamente;
- el mensaje indica qué parte debe revisarse;
- se preservan selecciones seguras cuando sea posible;
- la fuente vigente prevalece sobre el snapshot antiguo;
- la acción propuesta es actualizar/revisar, no forzar el valor anterior;
- una diferencia de precio o disponibilidad no se presenta como error genérico de servidor.

Patrón humano objetivo:

```text
La información cambió mientras la revisabas.
Conservamos tus selecciones compatibles.
Actualiza y revisa los cambios antes de continuar.
```

---

#### 15. Fallos técnicos de lectura

Ante fallo de una consulta segura e idempotente:

- se identifica qué contenido no pudo actualizarse;
- si existe un último snapshot confirmado y permitido, se diferencia de información fresca;
- un fallo parcial no elimina datos confirmados no afectados;
- la acción `Actualizar` o `Reintentar` solo aparece cuando el contrato de recuperación la permite;
- no se transforma el error en lista vacía ni valor `0` confirmado;
- no se muestran mensajes técnicos crudos.

Ejemplo semántico:

```text
No pudimos actualizar tus recompensas.
Lo que ves corresponde al último estado confirmado disponible.
Puedes intentar actualizar nuevamente.
```

La implementación de caché, backoff, retry y offline pertenece a `PASS-UX-012` y contratos propietarios.

---

#### 16. Resultado desconocido después de una mutación

Cuando una acción pudo haber sido aceptada pero PASS perdió su confirmación:

```text
TIMEOUT
!=
NO OCURRIO
```

El mensaje debe:

1. declarar que todavía no puede confirmarse el resultado;
2. conservar el identificador/correlación segura de la operación;
3. indicar que no debe repetirse a ciegas;
4. ofrecer consultar o reconciliar el estado cuando exista esa capacidad;
5. evitar mostrar éxito o fallo terminal hasta obtener evidencia.

Patrón objetivo:

```text
Todavía no pudimos confirmar el resultado.
No repitas la acción por ahora.
Estamos verificando el estado de la misma operación.
```

La mecánica de consulta por idempotency key, referencia o estado pertenece al contrato de integración correspondiente.

---

#### 17. Duplicado y resultado ya aplicado

Un replay idempotente, una operación duplicada detectada o un resultado ya aplicado no se presenta automáticamente como error.

Si el servidor demuestra que el mismo hecho ya quedó aplicado:

- se muestra el resultado estable confirmado;
- no se celebra como un segundo éxito;
- no se crea un segundo recibo visual como si fuera otro evento;
- no se ofrecen acciones que repitan el efecto;
- el historial conserva una sola identidad empresarial.

Si no puede demostrarse equivalencia, se trata como conflicto o resultado desconocido, no como `ya aplicado` por inferencia.

---

#### 18. Fidelización, saldo y catálogo

Mensajes de fidelización deben respetar:

| Situación | Semántica visible |
| --- | --- |
| saldo no disponible por fallo | no mostrar `0 pts`; informar que el saldo no pudo actualizarse |
| saldo insuficiente confirmado | condición de elegibilidad/capacidad, no error técnico |
| reward sin coincidencias por filtro | vacío filtrado, no fallo |
| catálogo no cargado | fallo de lectura, no “no hay recompensas” |
| reward retirado/vencido | no disponible bajo regla vigente, no error de red |
| contexto de sede no resuelto | no completar con rewards de otra sede; explicar que no puede confirmarse disponibilidad |
| recomendación ausente | no es error si el catálogo autorizado sigue disponible |
| favorito retirado | preferencia conservada o limpiada según contrato, pero nunca vuelve utilizable la recompensa |

El copy no redefine costo, elegibilidad, tier, saldo o regla de recompensa.

---

#### 19. Redención y QR

Los mensajes de redención consumen `PASS-UX-005` y `PASS-UX-009`:

| Hecho | Mensaje permitido |
| --- | --- |
| intención creada y pendiente | ticket/QR creado y pendiente de uso; no “canje exitoso” como consumo |
| redención usada confirmada | informar uso confirmado y fecha de uso autoritativa |
| redención cancelada confirmada | informar cancelación sin prometer devolución automática |
| credencial vencida/no utilizable | informar que ya no puede presentarse; no inferir cancelación |
| código ya usado | resultado terminal existente; no permitir volver a presentar como pendiente |
| código desconocido/manipulado | rechazo seguro sin revelar si otra cuenta o reward existe |
| creación con resultado unknown | no generar un segundo QR por reintento ciego |
| QR ausente por fallo de proyección | no decir simplemente `QR no disponible` si puede aclararse que la redención existe pero la credencial no pudo cargarse |

`RedeemModal` no puede afirmar irreversibilidad hasta que el contrato propietario la demuestre. `SuccessModal` no puede equiparar creación `pending` con beneficio ya consumido.

---

#### 20. Perfil, privacidad y cuenta

El copy de `VSCREEN-0112` y sus superficies AS-IS debe separar:

- error de validación del formulario;
- fallo al guardar;
- resultado desconocido de una actualización;
- dato no autogestionable;
- consentimiento obligatorio para una finalidad concreta;
- preferencia opcional;
- solicitud de privacidad;
- revocación de acceso;
- eliminación o anonimización todavía en proceso;
- cierre confirmado.

Reglas:

1. no mostrar el `error.message` de base de datos directamente;
2. no afirmar “Cuenta eliminada” si solo se aceptó una solicitud y falta reconciliación;
3. no afirmar que datos sujetos a retención fueron borrados cuando no corresponda;
4. indicar qué acceso o dato se vio afectado sin exponer políticas internas;
5. separar una sesión inválida confirmada de un fallo técnico al consultar sesión.

`INFO-UX-004` conserva propiedad del caso transversal de privacidad; esta tarea solo define cómo PASS explica el estado visible.

---

#### 21. Compra, checkout y pago

PASS debe diferenciar como mínimo:

```text
VALIDACION DE CARRITO
OFERTA O PRECIO CAMBIADO
CAPACIDAD O FRANJA NO DISPONIBLE
PEDIDO NO CREADO
PEDIDO CREADO
PAGO PENDIENTE
PAGO CONFIRMADO
PAGO RECHAZADO
RESULTADO DE PAGO DESCONOCIDO
PEDIDO CANCELADO CONFIRMADO
```

Reglas:

- `Esperando pago` o `Esperando confirmación` no usan tono de error;
- una ventana de pago cerrada no se presenta como rechazo bancario si la fuente no lo afirma;
- fallo al cargar detalle de productos puede ser parcialidad: el pedido principal puede seguir confirmado;
- un error técnico del proveedor no se muestra con su mensaje crudo;
- ante resultado de pago desconocido se consulta estado antes de iniciar otro intento equivalente;
- cambiar modalidad/programación produce validación comprensible y conserva las selecciones compatibles;
- un carrito vacío permanece vacío, no “error de checkout”.

---

#### 22. Pedido, entrega y chat

Para seguimiento y servicio:

- “pedido no encontrado” solo se usa cuando la consulta propia autorizada confirma ausencia; un fallo de lectura no prueba inexistencia;
- un PIN de entrega todavía no emitido es espera normal;
- PIN vencido y entrega cancelada son estados distintos;
- fallo al leer el PIN no se oculta indefinidamente ni se convierte en “todavía no disponible” si la causa es técnica;
- realtime del chat desconectado no marca mensajes confirmados como fallidos;
- si enviar un mensaje falla antes de aceptación, el borrador se conserva;
- si el resultado de envío es desconocido, PASS debe consultar estado antes de reenviar automáticamente;
- el mensaje de soporte debe mantener relación con pedido/caso sin exponer participantes ajenos.

La estrategia detallada de reconexión y recuperación permanece en `PASS-UX-012`.

---

#### 23. Reclamos, reservas, satisfacción y comunicaciones

Las `VSCREEN-0169..0172` deben heredar la misma gramática aunque algunas no tengan todavía superficie runtime dedicada verificada.

| Pantalla | Frontera de mensaje |
| --- | --- |
| `VSCREEN-0169` | error de registro/consulta de caso no equivale a reclamo rechazado; recepción pendiente se comunica como espera |
| `VSCREEN-0170` | capacidad no disponible, reserva rechazada, conflicto de versión y error técnico permanecen diferenciados |
| `VSCREEN-0171` | calificación enviada, duplicada, inválida o con resultado unknown no se confunden; una calificación negativa no se convierte en reclamo |
| `VSCREEN-0172` | ausencia de mensajes, fallo de carga, realtime desconectado, preferencia/consentimiento y entrega fallida son estados distintos |

El copy no materializa estas capacidades si su runtime aún no existe.

---

#### 24. Matriz de intención de mensajes por las diecinueve VSCREEN PASS

| Pantalla | Familias visibles que debe distinguir | No puede afirmar por copy |
| --- | --- | --- |
| `VSCREEN-0107` | carga de resumen, parcialidad, saldo/beneficio no actualizado, vacío autorizado | saldo `0` por fallo o beneficio confirmado desde caché incierta |
| `VSCREEN-0108` | identidad presentable, credencial no cargada, Wallet no generado, sesión/contexto inválido | que presentar QR autoriza puntos, canje o compra |
| `VSCREEN-0109` | vacío filtrado, catálogo no cargado, reward no disponible, elegibilidad no confirmada | que `Canjear` prueba elegibilidad |
| `VSCREEN-0110` | validación, creación pending, usado, cancelado, vencido/no utilizable, unknown | que ticket creado equivale a uso exitoso |
| `VSCREEN-0111` | sin historial, lectura fallida, parcialidad, atribución desconocida | que cero filas por error significa cero movimientos |
| `VSCREEN-0112` | validación de perfil, guardado, consentimiento, solicitud pendiente, cierre confirmado | que éxito de comando prueba eliminación total o consentimiento válido para otra finalidad |
| `VSCREEN-0160` | sin oferta autorizada, fallo de carga, selección inválida | existencia de sedes/oferta no confirmadas |
| `VSCREEN-0161` | catálogo vacío, no-match por filtro, fallo de carga, oferta retirada | disponibilidad/precio confirmado desde snapshot obsoleto |
| `VSCREEN-0162` | carrito vacío, selección inválida, configuración incompatible, conflicto de oferta | pedido creado solo por tener carrito local |
| `VSCREEN-0163` | validación de dirección, modalidad/franja no disponible, conflicto de capacidad | reserva logística antes de confirmación |
| `VSCREEN-0164` | validación, precio/cargos cambiados, inicio de pago, resultado unknown | pago o pedido confirmado por abrir checkout |
| `VSCREEN-0165` | pago pendiente, confirmado, rechazado/fallido, cancelación confirmada, error de consulta | que timeout significa pago fallido |
| `VSCREEN-0166` | sin pedidos propios, lectura fallida, detalle parcial, estado confirmado | inexistencia de pedido por fallo de consulta |
| `VSCREEN-0167` | espera, snapshot stale, realtime interrumpido, PIN pendiente/vencido/cancelado | estado operativo nuevo por inferencia cliente |
| `VSCREEN-0168` | apertura fallida, envío fallido, envío unknown, realtime offline | mensaje entregado solo por cola/local state |
| `VSCREEN-0169` | validación, caso recibido, espera, conflicto, resultado unknown | resolución o compensación antes de decisión propietaria |
| `VSCREEN-0170` | validación, capacidad no disponible, confirmación pendiente, cancelación/conflicto | reserva confirmada sin receipt |
| `VSCREEN-0171` | validación, enviado, duplicado, unknown | reclamo automático o incentivo confirmado |
| `VSCREEN-0172` | sin mensajes, fallo de lectura, entrega/realtime degradados, restricción por consentimiento | recepción/lectura de mensaje no confirmada |

La matriz define semántica de copy, no estados físicos nuevos.

---

#### 25. Superficies globales y pre-navegación

##### Auth

- error de credenciales, canal no disponible, rate limit y fallo técnico no se expresan con mensajes que permitan enumerar si una cuenta existe;
- secretos y códigos de un solo uso nunca se repiten en el mensaje;
- recuperación debe identificar una acción válida sin revelar estado de otras cuentas.

##### CompleteProfile

- validación corregible se muestra cerca del campo;
- error técnico de persistencia se traduce a copy seguro;
- resultado unknown no se convierte en nuevo submit automático;
- éxito exige confirmación de persistencia suficiente para continuar.

##### AppUpdateGate

- `required` se presenta como compatibilidad requerida para continuar;
- `optional` como actualización disponible;
- ausencia temporal de enlace de tienda no se presenta como fallo del producto completo.

##### AppErrorBoundary

- no renderiza la excepción cruda al cliente;
- comunica que la pantalla no pudo abrirse;
- ofrece reinicio/reintento únicamente como acción de recuperación de UI, sin afirmar que mutaciones previas fallaron;
- cerrar sesión solo se ofrece cuando sea una salida válida y no como remedio universal.

---

#### 26. EmptyState no es componente universal de error

`EmptyState.tsx` puede representar ausencia confirmada cuando el caller ya resolvió la semántica correspondiente.

No se utiliza para ocultar:

- error de consulta;
- timeout;
- bloqueo;
- denegación;
- resultado parcial;
- falta de conectividad sin snapshot confirmado;
- resultado unknown;
- carga todavía en curso.

La reutilización visual no cambia la categoría semántica: si se reutiliza layout, accesibilidad y copy deben seguir indicando que se trata de error/recuperación y no de vacío.

---

#### 27. Acción siguiente y frontera con navegación

La acción mencionada en un mensaje debe existir como acción autorizada o intención ya aprobada.

`PASS-UX-010` define **qué tipo de acción debe comunicarse**, pero no crea la ruta que la ejecuta.

Ejemplos de intención permitida:

- corregir un campo;
- actualizar una lectura;
- revisar cambios;
- consultar estado de la operación;
- volver a una superficie anterior segura;
- abrir soporte/caso cuando exista la capacidad;
- autenticarse de nuevo cuando la pérdida de sesión esté confirmada.

`PASS-UX-011` conserva propiedad de rutas, aliases, deep links y destinos exactos. Si una acción todavía no tiene ruta canónica, el copy no puede inventarla.

---

#### 28. Frontera con recuperación, offline y retry

`PASS-UX-010` no decide:

- número de reintentos;
- backoff;
- retry-after;
- TTL de caché;
- persistencia offline;
- reconciliación de cola;
- cursor realtime;
- background sync;
- estrategia de snapshot stale;
- cuándo una mutación puede repetirse físicamente.

Esas reglas pertenecen a `PASS-UX-012` y contratos transversales propietarios.

Esta tarea solo exige que el mensaje visible sea compatible con la política real y no invite a una acción que dicha política prohíba.

---

#### 29. Accesibilidad, tono y consistencia

Todo mensaje importante deberá:

- tener título y cuerpo comprensibles sin depender de color;
- mantener contraste y lectura compatibles con accesibilidad;
- usar una acción primaria clara cuando exista;
- evitar bloques extensos de texto en móvil;
- preservar la misma semántica entre Vento Café, Saudo y satélites;
- mantener vocabulario coherente entre historial, ticket, pedido y chat;
- no usar mayúsculas sostenidas como único mecanismo de urgencia;
- no depender de emoji para indicar éxito o fallo;
- soportar traducción futura mediante claves estables sin convertir el literal español en reason code.

---

#### 30. Referencia de soporte y observabilidad

Cuando un fallo requiera soporte, PASS puede presentar una referencia segura y corta derivada de una correlación gobernada.

La referencia visible:

- no contiene secreto;
- no expone PII innecesaria;
- no sustituye logs ni trazas;
- permite al equipo autorizado localizar el incidente;
- permanece asociada al mismo intento cuando el resultado sea unknown;
- no cambia el estado empresarial.

No se exige referencia para validaciones ordinarias, vacíos o condiciones que el cliente puede resolver inmediatamente.

---

#### 31. Hallazgos AS-IS y handoff

| Hallazgo observado | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| `AppErrorBoundary` renderiza `error?.message` directamente | exposición de excepción técnica y copy no gobernado | `PASS-UX-012` + paquete E5 propietario de la superficie PASS afectada | el cliente recibe copy seguro y la excepción completa queda solo en observabilidad restringida |
| `CompleteProfile` usa `error.message` como mensaje visible | códigos/mensajes de persistencia pueden filtrarse y no ser accionables | paquete E5 propietario de `VSCREEN-0112` | reason/error técnico se traduce a categoría y copy seguro; validación de campo permanece diferenciada |
| `VentoCafe`/experiencias muestran `result.error` o fallback genérico de canje | semántica puede variar según texto retornado por implementación | `PASS-INT-002` + paquete E5 propietario de `VSCREEN-0110` | resultado estructurado distingue validación, conflicto, denegación, duplicado, already-applied y unknown antes del copy |
| `SuccessModal` afirma `Canje exitoso` inmediatamente después de crear `pending` | éxito falso antes del consumo PULSO | `PASS-UX-009` + paquete E5 propietario de `VSCREEN-0110` | copy distingue ticket creado de redención usada |
| `RedeemModal` afirma irreversibilidad | política de cancelación/reversión no demostrada | `PASS-INT-002` + paquete E5 propietario de `VSCREEN-0110` | warning deriva de la regla vigente y no promete irreversibilidad sin contrato |
| `QrFullscreenModal` usa `QR no disponible` sin distinguir causa | error, ausencia de credencial y estado no utilizable quedan colapsados | paquete E5 propietario de `VSCREEN-0110` | causa segura se clasifica antes de elegir copy |
| `DeleteAccountFlow` afirma `Cuenta eliminada` tras éxito del comando | aceptación de solicitud puede confundirse con cierre reconciliado | `INFO-UX-004` + paquete E5 propietario de `VSCREEN-0112` | mensaje distingue acceso revocado, procesamiento y cierre confirmado según evidencia |
| `useSatelliteExperiences` puede devolver lista vacía más `error` tras fallo sin caché | caller puede mostrar vacío donde hubo fallo | `PASS-UX-012` + paquete E5 propietario de las superficies `VSCREEN-0160`/`VSCREEN-0161` afectadas | precedencia error/recuperación ocurre antes que vacío |
| `OrderMenu` y `OrderPlacedScreen` muestran strings de error provenientes de hooks/backend | detalles técnicos o mensajes inconsistentes pueden llegar a UI | paquete E5 propietario de `VSCREEN-0161`/`VSCREEN-0165` | capa de presentación usa categoría estructurada y safe detail, no string técnico crudo |
| `OrderPlacedScreen` trata fallo de detalle de items como mensaje parcial separado | patrón positivo pero no sistemático | `PASS-UX-012` + paquete E5 propietario de `VSCREEN-0165` | parcialidad se conserva explícita sin degradar pedido confirmado |
| `OrderTrackingScreen` ignora visualmente el error del RPC de PIN | fallo técnico puede parecer espera normal | `PASS-UX-012` + paquete E5 propietario de `VSCREEN-0167` | fallo de lectura se distingue de PIN todavía no emitido |
| `OrderChatScreen` restaura draft cuando falla envío | patrón positivo de preservación | `PASS-UX-012` + paquete E5 propietario de `VSCREEN-0168` | preservación se conserva y resultado unknown se diferencia de fallo previo a aceptación |
| `clubErrors.ts` ya traduce ciertos errores técnicos a copy amigable | mapeo local puede divergir de otras superficies | paquete E5 propietario de los componentes compartidos de experiencia cliente PASS | una semántica común de categorías y claves evita mappers contradictorios |

Ningún hallazgo autoriza cambios físicos dentro de esta tarea documental.

---

#### 32. Responsabilidad de tareas posteriores

| Responsabilidad | Propietario |
| --- | --- |
| rutas, aliases, deep links y destino exacto de acciones de recuperación | `PASS-UX-011` |
| carga, error, offline, caché, retry, reconciliación y recuperación móvil | `PASS-UX-012` |
| comprensión, terminología y efectividad de mensajes con clientes reales | `PASS-UX-013` |
| integración autoritativa de acumulación | `PASS-INT-001` |
| integración autoritativa de redención, idempotencia y resultados estructurados | `PASS-INT-002` |
| perfil/cliente y administración de datos | `PASS-INT-004` y `PASS-INT-005` según alcance canónico |
| caso transversal de privacidad | `INFO-UX-004` |
| comportamiento de pantallas ante recuperación | contratos `PROC-SCREEN-018..021` ya aprobados |
| gramática transversal de bloqueo humano | `UX-BASE-006` ya aprobada |
| implementación física del copy y mappers en apps | paquetes de materialización gobernados por E5; esta tarea no crea ni selecciona un package |

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el registro vigente ya exige explicación humana de errores/bloqueos, preservación del trabajo, recuperación sin duplicidad, diferenciación entre error recuperable, duplicado, conflicto, denegación y resultado ya aplicado, y trazabilidad de casos/comunicaciones. `PASS-UX-010` especializa esa cobertura para la experiencia cliente PASS y materializa el contrato de copy sin introducir una obligación de prueba nueva ni cambiar una regla protegida existente.

---

#### 34. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-UX-002` — todo error, bloqueo o fallo parcial comunica en lenguaje humano qué ocurrió, por qué, qué se conservó y cómo continuar sin duplicar efectos;
- `TREQ-UX-006` — pérdida de red/sesión/dispositivo/proveedor diferencia pendiente, confirmado, fallido, conflicto y requiere intervención;
- `TREQ-PASS-006` — convergencia semántica de experiencias y rutas PASS;
- `TREQ-PASS-008` — redención y movimientos mediante contratos autorizados, atómicos e idempotentes;
- `TREQ-PASS-009` — ambigüedad de pagos permanece pendiente de conciliación y no regresa estados terminales;
- `TREQ-PASS-010` — saldo como proyección reconciliable y reintentos sin duplicar puntos/beneficios;
- `TREQ-PASS-011` — casos, comunicaciones, entrega, error y fallback permanecen trazables y separados;
- `TREQ-PASS-032` — estados de procesamiento, éxito y error corresponden al resultado confirmado y distinguen recuperable, duplicado, conflicto, denegación y ya aplicado;
- `TREQ-PASS-033` — fallos de soporte laboral no degradan ni bloquean indebidamente la experiencia normal de cliente;
- `TREQ-PASS-038`, `TREQ-PASS-041` y `TREQ-PASS-042` — superficies lógicas, identidades `VSCREEN-*` y runtime permanecen reconciliables y verificables.

Esta sección es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 35. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | No se ejecutó compilación documental para esta preparación anticipada; la validación de build corresponde a su incorporación canónica posterior. |
| LOCAL | `NOT_EXECUTED` | No existe evidencia de validación local ejecutada para esta preparación anticipada. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, owner PASS, continuidad, topología `DEFINE_ONCE`, catálogo de diecinueve `VSCREEN-*`, `UX-BASE-006`, `PROC-SCREEN-018..021`, 04A PASS/UX, `vento-pass/main` y superficies runtime representativas de fidelización, perfil, cuenta, actualización, error boundary, compra, pedido, entrega y chat. |
| OPERATIVA | `NOT_EXECUTED` | No se provocaron errores, bloqueos, timeouts, conflictos, resultados unknown, fallos de pago, redención, perfil, chat u offline en staging o dispositivo real. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-010` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 36. Criterios de aceptación

- [x] Se diseña exactamente `PASS-UX-010 — Definir mensajes de error comprensibles`.
- [x] Se preservan las diecinueve identidades `VSCREEN-*` PASS sin crear pantallas nuevas.
- [x] Se adopta la gramática transversal de `UX-BASE-006` sin vocabulario competidor.
- [x] Se preserva la precedencia error ≠ vacío ≠ carga ≠ bloqueo de `PROC-SCREEN-018..021`.
- [x] Se define anatomía mínima de título, causa segura, efecto, estado preservado, siguiente acción, condición de retry, soporte y referencia.
- [x] Se prohíbe exponer `error.message`, SQL, PostgREST, tablas, policies, stack traces, secretos y detalles antifraude al cliente.
- [x] Validación, bloqueo, denegación, espera, conflicto, fallo técnico, warning e info permanecen diferenciados.
- [x] Resultado unknown de una mutación no permite retry ciego ni copy terminal.
- [x] Duplicado/already-applied no se presenta automáticamente como un nuevo error o segundo éxito.
- [x] Se definen fronteras de mensajes para fidelización, redención, perfil, privacidad, compras, pagos, pedidos, entrega, chat, reclamos, reservas, satisfacción y comunicaciones.
- [x] Se cubren Auth, CompleteProfile, AppUpdateGate y AppErrorBoundary sin crear nuevas superficies canónicas.
- [x] EmptyState no absorbe error, bloqueo, timeout, partial o unknown.
- [x] Las acciones comunicadas no inventan rutas; `PASS-UX-011` conserva ownership de navegación.
- [x] Retry/offline/caché/recuperación física permanecen reservados a `PASS-UX-012` y contratos propietarios.
- [x] La prueba con clientes reales permanece reservada a `PASS-UX-013`.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, datos, Supabase, PULSO, Wallet, packages, implementación física, CI022, piloto ni despliegue.
- [x] `PASS-UX-011` queda reservada y no se desarrolla en esta tarea.

---

#### 37. Límites

Esta tarea no:

- implementa componentes, hooks, mappers ni catálogos de strings;
- modifica `EmptyState`, `AppErrorBoundary`, `CompleteProfile`, `RedeemModal`, `SuccessModal`, `QrFullscreenModal`, `AccountSettings`, flujos de eliminación/limpieza, pantallas de pedido, entrega o chat;
- crea `reason_code`, enum, estado de dominio, excepción, RPC o respuesta API;
- modifica lógica de autorización, elegibilidad, saldo, puntos, pagos, pedidos, reservas o privacidad;
- define rutas, aliases, deep links ni navegación;
- decide backoff, retry count, TTL, cache, realtime, offline, queue o sincronización;
- crea un sistema de traducción físico;
- redefine `UX-BASE-006` ni `PROC-SCREEN-018..021`;
- crea requisitos de prueba;
- modifica 04A;
- modifica datos, tablas, RLS, policies, Storage, Edge Functions, migraciones, secretos o configuración remota;
- ejecuta pruebas operativas o con clientes reales;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- desarrolla `PASS-UX-011`, `PASS-UX-012` ni `PASS-UX-013`.

---

#### 38. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-009 — Diferenciar estado pendiente, usado y cancelado`

**TAREA ACTUAL APROBADA**
`PASS-UX-010 — Definir mensajes de error comprensibles`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente`
### ✅ PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-010 — Definir mensajes de error comprensibles
**Tarea siguiente:** PASS-UX-012 — Simplificar interfaz móvil, estados de carga, error, offline y recuperación
**Tipo de tarea:** documental; consolidación del contrato objetivo de navegación de cliente PASS sobre las diecinueve identidades canónicas `VSCREEN-*`, las quince identidades actuales de `Stack.Screen`, las seis superficies globales/pre-navegación, los deep links vigentes y la resolución de módulos de runtime, definiendo destinos directos, embebidos, compuestos, compartidos, de compatibilidad y todavía no materializados sin crear rutas físicas ni adelantar recuperación móvil; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — EXPERIENCIA DEL CLIENTE
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/01_EXPERIENCIA_DEL_CLIENTE.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pass`, navegación runtime, nombres de `Stack.Screen`, aliases Babel/TypeScript, deep links, feature flags, componentes, datos, Supabase, migraciones, RLS, RPC, Edge Functions, PULSO, Wallet, secretos, despliegues ni aplicaciones consumidoras
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Consolidar una arquitectura de navegación única y verificable para la experiencia cliente de PASS, de forma que una acción visible conduzca a una identidad funcional conocida sin depender de rutas paralelas, nombres técnicos, aliases de tooling contradictorios, placeholders o interpretaciones distintas de una misma pantalla canónica.

El contrato debe poder responder, para cada capacidad de cliente:

```text
¿CUÁL ES LA IDENTIDAD CANÓNICA VSCREEN?
¿EXISTE HOY UNA RUTA RUNTIME DEDICADA?
¿ES UNA SUPERFICIE GLOBAL O EMBEBIDA?
¿COMPARTE RUTA CON OTRA IDENTIDAD?
¿REQUIERE CONTEXTO PREVIO?
¿TIENE DEEP LINK?
¿ESTÁ DETRÁS DE FEATURE FLAG?
¿QUÉ IMPLEMENTACIÓN EJECUTA REALMENTE EL RUNTIME?
¿QUÉ ENTRYPOINTS SON SOLO COMPATIBILIDAD?
¿QUÉ DESTINOS AÚN NO DEBEN MOSTRARSE COMO IMPLEMENTADOS?
```

La navegación no se convierte en fuente de autoridad. Abrir una ruta no concede elegibilidad, permiso, saldo, estado, ownership, sede, pago, redención ni derecho sobre un recurso.

---

#### 2. Base aprobada y frontera documental

La base inmediata es `PASS-UX-010`, aprobada por el usuario, que entrega el contrato de mensajes humanos y reserva expresamente a esta tarea las rutas, aliases, deep links y destinos de las acciones visibles.

Se conservan además estas decisiones ya aprobadas:

- `PASS-UX-001` congela quince `Stack.Screen`, veintiuna superficies lógicas de cliente/transversales y diecinueve `VSCREEN-*` PASS, sin relación uno a uno obligatoria;
- `PASS-UX-002` define el home como puerta de entrada a QR, recompensas, historial, perfil y compra, sin duplicar esos workspaces;
- `PASS-UX-003` mantiene `QrModal` como presentación del identificador personal y no como scanner operativo;
- `PASS-UX-005` y `PASS-UX-009` mantienen ticket/QR de redención y lifecycle de canje separados de la navegación que los presenta;
- `PASS-UX-006` define `VSCREEN-0111` como historial global reconciliable y prohíbe que una vista por sede o una ventana parcial se haga pasar por historial completo;
- `PASS-UX-007` define `VSCREEN-0109` como catálogo PASS y exige convergencia semántica entre Vento Café, Saudo y satélites dinámicos;
- `PASS-UX-008` define `VSCREEN-0112` como un solo workspace semántico aunque onboarding y mantenimiento tengan superficies distintas;
- `PASS-UX-009` exige que una misma redención no presente estados incompatibles por ruta;
- `PASS-UX-010` prohíbe inventar destinos desde el copy y entrega la selección de rutas a esta tarea.

La frontera de `PASS-UX-011` es el **contrato de identidad de navegación, destino, entrada, compatibilidad, composición y resolución de módulo**. Carga, error, offline, retry, caché, Realtime, restauración de estado y recuperación móvil permanecen en `PASS-UX-012` y en los contratos transversales propietarios.

---

#### 3. Modelo de identidad de navegación

PASS conserva separadas cinco identidades que no pueden intercambiarse:

```text
VSCREEN CANÓNICA
≠
NOMBRE DE STACK
≠
RUTA EXTERNA / DEEP LINK
≠
ARCHIVO IMPORTADO
≠
ARCHIVO EFECTIVAMENTE RESUELTO POR EL BUNDLER
```

Reglas:

1. `VSCREEN-*` expresa la identidad funcional canónica.
2. `Stack.Screen` expresa una identidad de navegación runtime de React Navigation.
3. un deep link expresa un entrypoint externo hacia una identidad runtime y nunca crea otra pantalla canónica;
4. un alias de módulo cambia qué archivo implementa una identidad, pero no crea una ruta nueva;
5. un componente embebido puede materializar una `VSCREEN-*` sin `Stack.Screen` independiente;
6. una misma ruta puede representar más de una `VSCREEN-*` cuando la composición esté aprobada y sus estados permanezcan distinguibles;
7. la presencia de una `VSCREEN-*` en catálogo no demuestra que exista una ruta runtime;
8. la presencia de una ruta runtime no demuestra que la capacidad esté completa o autorizada.

---

#### 4. Fuentes y snapshots verificados

| Fuente | Snapshot verificado | Uso |
| --- | --- | --- |
| `vento-group-sas/vento-shell` `main` | `21348b12cfed8046b7a666496cf47d76c39aa573` | continuidad, owner, topología, políticas, catálogo, 04A y validadores |
| archivo propietario PASS | blob `741f245b06a61eaf50e30ae51dd9b6c869b57af1` | `PASS-UX-009` incorporada y marcadores `PASS-UX-010+` vigentes |
| `PASS-UX-010_APROBADA_PARA_REEMPLAZAR.md` | SHA-256 `060e337c3a24ed460bf934e3c6d3cad2a490bbb19d5c9c8d1e625ab18a970f96` | base documental inmediata aprobada por el usuario y pendiente de publicación |
| catálogo proceso-pantalla | blob `742ead71e5fc5c4ae85a3cb6a00feb858ba8c2a0` | diecinueve `VSCREEN-*` PASS, procesos, pasos y roles |
| inventario integral BLOQUE I | blob `b9d32ceac40db584b3e39c0c975acb978d2a79cd` | superficies PASS, fronteras cliente/laboral y reglas de reconciliación |
| depuración de vistas/rutas BLOQUE I | blob `d59f178cbd8a7de02d0d7eff638e0111cc6543b9` | semántica de alias, redirect, duplicidad, compatibilidad y retiro |
| Registro 04A PASS | blob `855cc2869e570995e6736d016ca571309154d3b7` | cobertura vigente de inventario, convergencia, rutas y deriva |
| validador de matrices BLOQUE I | blob `be6c89303484fa417d6e22bf60d6cb30cb71b0f3` | comparación de stack PASS y matrices canónicas |
| `carlosibarraariza/vento-pass` `main` | `b5a4aec908ef12226f798078577ab089a29ccda2` | runtime móvil AS-IS |
| `vento-pass/App.js` | blob `162e686ff5ec363a0f6f991da58f6ce84816e8aa` | quince rutas de stack, tres deep links y feature gates |
| `vento-pass/babel.config.js` | blob `27efaeb7cc7e0ddbdd0970cef153e7524bde8d27` | resolución efectiva de aliases en runtime |
| `vento-pass/tsconfig.json` | blob `19458728f23d32e7e3951e789116b4aa147fa1a5` | resolución de tooling TypeScript y divergencias observadas |
| `OrderTrackingScreen.tsx` | blob `b006f4443f39b443f38cd71ad4142d777ff66c91` | composición actual de receipt/pago y seguimiento bajo `OrderPlaced` |
| `src/utils/navigation.ts` | blob `0ea042e5fd30b2df98ebb98864b4c6a62a8f90eb` | helpers AS-IS y placeholder de historial |
| `SatelliteExperience.tsx` | blob `7d0cc7fd9be280844af2810b9c507dfad5764dc3` | host dinámico actual de catálogo, historial y QR pendientes por sede |

---

#### 5. Universo de navegación que debe conservarse trazable

La tarea no modifica las cardinalidades congeladas:

| Universo | Cardinalidad |
| --- | ---: |
| `Stack.Screen` declaradas en `App.js` | 15 |
| superficies lógicas cliente/transversales PASS | 21 |
| pantallas canónicas PASS | 19 |
| superficies canónicas con evidencia runtime dedicada, compartida o embebida | 16 |
| pantallas canónicas sin superficie runtime dedicada demostrada | 3 |

Las quince identidades actuales de stack permanecen inventariadas aunque esta tarea clasifique algunas como entrypoints de compatibilidad o partes de un flujo compuesto. Ninguna se retira físicamente desde `PASS-UX-011`.

---

#### 6. Clases canónicas de destino

| Clase | Significado |
| --- | --- |
| `DIRECT_ROUTE` | una identidad `Stack.Screen` es el destino runtime principal de la `VSCREEN-*` |
| `GLOBAL_SURFACE` | modal, gate o superficie global materializa la capacidad sin ruta de stack propia |
| `EMBEDDED_DESTINATION` | la capacidad vive dentro de un host y no necesita ruta independiente |
| `COMPOSITE_ROUTE_CHAIN` | varias rutas representan etapas necesarias de una misma identidad canónica sin ser duplicados |
| `SHARED_CANONICAL_ROUTE` | una ruta sirve dos identidades canónicas relacionadas mediante composición explícita y estado distinguible |
| `CONTEXTUAL_HOST_ROUTE` | el destino depende de una identidad de sede/marca/contexto ya resuelta |
| `COMPATIBILITY_ENTRYPOINT` | ruta existente conservada temporalmente por compatibilidad; no se convierte en segunda fuente canónica |
| `ADJACENT_ROUTE` | ruta real de una capacidad relacionada que no debe apropiarse de la `VSCREEN-*` evaluada |
| `UNMATERIALIZED_DESTINATION` | identidad canónica sin ruta/superficie suficiente; no se muestra como capacidad implementada |

Una clasificación documental no borra ni crea rutas. El cutover físico de cualquier entrypoint exige paridad, consumidores conocidos, rollback y evidencia de cero navegación huérfana.

---

#### 7. Matriz canónica de las diecinueve `VSCREEN-*` PASS

| VSCREEN | Función | Representación objetivo de navegación | Runtime AS-IS relacionado | Decisión |
| --- | --- | --- | --- | --- |
| `VSCREEN-0107` | inicio y resumen de beneficios | `DIRECT_ROUTE` | `Home` | `Home` continúa como entrada principal autenticada de cliente |
| `VSCREEN-0108` | QR personal | `GLOBAL_SURFACE` | `QrModal` | se abre como credencial global; no se crea `Stack.Screen` ni se confunde con scanner PULSO |
| `VSCREEN-0109` | catálogo de beneficios/recompensas | `CONTEXTUAL_HOST_ROUTE` | `SatellitePass` y proyecciones legacy `VentoCafe`/`Saudo` | el destino canónico resuelve contexto de sede/marca y usa un host de fidelización; rutas estáticas quedan como compatibilidad hasta convergencia |
| `VSCREEN-0110` | ticket/QR de redención | `EMBEDDED_DESTINATION` | modales/tarjetas dentro del host de fidelización | no requiere ruta nueva; se abre desde el catálogo y conserva estado de redención propio |
| `VSCREEN-0111` | historial de puntos/redenciones | `UNMATERIALIZED_DESTINATION` para navegación global; proyecciones embebidas de compatibilidad por sede | tabs `historial` de `VentoCafe`, `Saudo`, `SatellitePass`; `goToMovements` placeholder | ninguna pestaña limitada por sede se canoniza como historial global; el acceso global permanece no materializado hasta existir un host que cumpla `PASS-UX-006` |
| `VSCREEN-0112` | perfil, privacidad y consentimientos | `DIRECT_ROUTE` + gate inicial | `AccountSettings` + `CompleteProfile` | `AccountSettings` es mantenimiento autenticado; `CompleteProfile` es gate de completitud inicial, no segunda ruta competidora |
| `VSCREEN-0160` | inicio/selección del portal de compras | `COMPOSITE_ROUTE_CHAIN` | `ChooseSatellite` → `OrderHome` | selección de contexto y entrada contextual son etapas de una misma identidad, no duplicados |
| `VSCREEN-0161` | menú/catalogo comercial | `DIRECT_ROUTE` | `OrderMenu` | una sola identidad runtime; no se duplica por variantes de módulo |
| `VSCREEN-0162` | carrito/configuración de pedido | `EMBEDDED_DESTINATION` | `OrderMenu` | carrito sigue embebido y no crea ruta paralela |
| `VSCREEN-0163` | dirección/modalidad/programación | `COMPOSITE_ROUTE_CHAIN` | `DeliveryAddresses` + controles de modalidad/programación del flujo de compra | direcciones administrables y selección del pedido cooperan sin convertirse en dos fuentes de verdad |
| `VSCREEN-0164` | revisión/checkout/inicio de pago | `DIRECT_ROUTE` | `OrderCheckout` | destino único de revisión antes de iniciar pago |
| `VSCREEN-0165` | confirmación y retorno de pago | `SHARED_CANONICAL_ROUTE` | `OrderPlaced` | conserva el entrypoint externo `payment-return` y la presentación de receipt/pago dentro del host compartido |
| `VSCREEN-0166` | mis pedidos y detalle | `DIRECT_ROUTE` | `MyOrders` | destino canónico de consulta de pedidos propios |
| `VSCREEN-0167` | seguimiento de preparación/entrega | `SHARED_CANONICAL_ROUTE` | `OrderPlaced` resuelto a `OrderTrackingScreen.tsx` | comparte host con `VSCREEN-0165` porque el runtime efectivo compone receipt/pago y seguimiento; ambos contratos permanecen distinguibles |
| `VSCREEN-0168` | chat del pedido | `DIRECT_ROUTE` | `OrderChat` | requiere `orderId` propio y no se convierte en reclamo por navegar al chat |
| `VSCREEN-0169` | reclamos/casos de servicio | `UNMATERIALIZED_DESTINATION` | sin superficie dedicada verificada | no se crea alias a `OrderChat`; no se presenta como implementada hasta existir workspace trazable |
| `VSCREEN-0170` | reservas/eventos | `UNMATERIALIZED_DESTINATION` | sin superficie dedicada verificada | no se inventa ruta, modal ni enlace “próximamente” como sustituto |
| `VSCREEN-0171` | calificación/satisfacción | `EMBEDDED_DESTINATION` | `RatingModal` y `FeedbackModal` | permanece disparada desde contexto elegible; no necesita `Stack.Screen` solo para igualar el catálogo |
| `VSCREEN-0172` | comunicaciones/notificaciones | `UNMATERIALIZED_DESTINATION` | sin superficie dedicada verificada | una push notification puede navegar al recurso propietario, pero no prueba que exista el workspace de comunicaciones |

Resultado: **19/19 identidades reciben una decisión de navegación**, sin inventar rutas runtime para cerrar diferencias documentales.

---

#### 8. Clasificación de las quince identidades actuales de stack

| `Stack.Screen` | Estado objetivo | Papel dentro de la navegación consolidada |
| --- | --- | --- |
| `Home` | `CANONICAL_DIRECT` | entrada principal de cliente y handoffs a capacidades propias |
| `Club` | `ADJACENT_ROUTE` | membresía/Club separado de puntos PASS; no sustituye automáticamente `VSCREEN-0109` |
| `MyOrders` | `CANONICAL_DIRECT` | pedidos propios y entrada a detalle/chat/reorden aplicable |
| `ChooseSatellite` | `CANONICAL_COMPOSITE_STAGE` | selección de contexto para compra |
| `DeliveryAddresses` | `CANONICAL_COMPOSITE_STAGE` | mantenimiento/selección de dirección dentro del flujo de entrega |
| `AccountSettings` | `CANONICAL_DIRECT` | mantenimiento de perfil, privacidad y cuenta autenticada |
| `VentoCafe` | `COMPATIBILITY_ENTRYPOINT` | experiencia estática que debe converger al host contextual sin conservar semántica propia divergente |
| `Saudo` | `COMPATIBILITY_ENTRYPOINT` | experiencia estática que debe converger al host contextual sin conservar semántica propia divergente |
| `SatelliteExperience` | `CANONICAL_CONTEXT_HUB` | hub dinámico de una sede/marca y puente hacia experiencia de fidelización/compra |
| `SatellitePass` | `CANONICAL_CONTEXTUAL_HOST` | host dinámico actual de fidelización por sede/marca |
| `OrderHome` | `CANONICAL_COMPOSITE_STAGE` | entrada contextual de compra tras resolver sede/marca |
| `OrderMenu` | `CANONICAL_DIRECT` | menú comercial y host del carrito |
| `OrderCheckout` | `CANONICAL_DIRECT` | revisión e inicio de pago |
| `OrderPlaced` | `CANONICAL_SHARED` | receipt/retorno de pago + seguimiento de pedido bajo composición efectiva |
| `OrderChat` | `CANONICAL_DIRECT` | conversación asociada a un pedido propio |

Esta tabla no renombra ni elimina ninguna ruta actual. Define qué identidades son objetivo, compatibilidad o adyacentes para evitar que todas se traten como fuentes canónicas equivalentes.

---

#### 9. Superficies globales y previas a navegación

Las seis superficies no-stack conservan su naturaleza:

| Superficie | Decisión de navegación |
| --- | --- |
| `Auth` | gate previo; resuelve identidad/sesión y luego entrega al destino permitido |
| `CompleteProfile` | gate previo de completitud; no aparece como destino ordinario de menú |
| `QrModal` | superficie global invocada desde contexto autenticado; no crea ruta |
| `AppUpdateGate` | gate global de compatibilidad; no sustituye el destino solicitado |
| `App runtime gates` | resuelven carga/configuración/perfil antes del stack |
| `AppErrorBoundary` | superficie global de recuperación; no crea navegación empresarial |

Un gate puede interrumpir o diferir una navegación, pero no reescribe por sí mismo la identidad funcional solicitada.

---

#### 10. Navegación del home de cliente

`Home` mantiene una función de distribución, no de duplicación.

| Acción conceptual | Destino canónico | Regla |
| --- | --- | --- |
| mostrar QR personal | `VSCREEN-0108` / `QrModal` | abre credencial propia; no navega a scanner |
| consultar recompensas | `VSCREEN-0109` / host contextual de fidelización | exige contexto de sede/marca cuando la fuente lo requiera |
| consultar historial global | `VSCREEN-0111` | no usa una pestaña de sede como sustituto; si el destino global no existe, la acción no se presenta como implementada |
| abrir perfil/privacidad | `VSCREEN-0112` / `AccountSettings` | mantenimiento autenticado |
| iniciar compra | `VSCREEN-0160` / `ChooseSatellite` o contexto ya resuelto | respeta `SHOW_PURCHASE_FEATURES` |
| abrir pedido activo | `VSCREEN-0165/0167` / `OrderPlaced` | usa `orderId` propio y estado autoritativo |
| consultar pedidos | `VSCREEN-0166` / `MyOrders` | solo pedidos propios |
| abrir Club | `Club` | capacidad adyacente; no altera nivel, saldo ni catálogo PASS por navegación |

Ninguna CTA del home apunta a una ruta inexistente con un placeholder como sustituto de producto.

---

#### 11. Catálogo, redención e historial dentro del host de fidelización

El runtime actual de `SatellitePass`/`SatelliteExperience.tsx` contiene tabs `canjear`, `historial` y `qr-pendientes`.

La consolidación los interpreta así:

- `canjear` es una proyección contextual de `VSCREEN-0109`;
- `qr-pendientes` presenta `VSCREEN-0110` de forma embebida;
- `historial` es una proyección contextual/compatibilidad de `VSCREEN-0111`, pero no sustituye el workspace global definido por `PASS-UX-006` mientras su consulta esté limitada a una sede o no combine ledger + recibos de forma completa;
- cambiar de tab no crea una nueva ruta ni otra identidad de negocio;
- el host debe conservar el mismo `site_id`/contexto durante la sesión de sede y no reinterpretar un canje existente al cambiar de tab;
- la navegación global hacia historial no puede elegir arbitrariamente la última sede para hacer parecer completo un conjunto parcial.

---

#### 12. Decisión sobre `goToMovements`

`src/utils/navigation.ts` conserva actualmente una acción `goToMovements` que responde con “Próximamente” en lugar de abrir un historial real.

Decisión objetivo:

```text
ACCIÓN VISIBLE “HISTORIAL”
→ DESTINO REAL QUE CUMPLE VSCREEN-0111
O
→ ACCIÓN NO EXPUESTA COMO IMPLEMENTADA
```

Por tanto:

1. `goToMovements` no constituye una implementación de `VSCREEN-0111`;
2. un `Alert` de “Próximamente” no es destino canónico;
3. no se redirige el historial global a una pestaña de sede que pueda ocultar hechos no atribuidos o de otras sedes;
4. cuando exista un host global compatible con `PASS-UX-006`, el helper podrá adaptarse a ese destino o retirarse en favor de navegación directa gobernada;
5. la eliminación física del placeholder pertenece al package/implementación posterior, no a esta tarea.

---

#### 13. Convergencia de Vento Café, Saudo y satélites dinámicos

La semántica de fidelización no puede depender de tres familias de rutas competidoras.

Estado actual:

```text
VentoCafe
Saudo
SatellitePass / SatelliteExperience
```

Decisión objetivo:

```text
UNA IDENTIDAD DE SEDE/MARCA
+
UN CONTRATO DE HOST CONTEXTUAL
+
PROYECCIONES SEMÁNTICAMENTE EQUIVALENTES
```

Reglas:

- `SatelliteExperience`/`SatellitePass` constituyen el camino dinámico objetivo por identidad estable de satélite/sede;
- `VentoCafe` y `Saudo` permanecen `COMPATIBILITY_ENTRYPOINT` mientras existan consumidores o paridad no demostrada;
- los entrypoints estáticos no mantienen reglas propias de rewards, historial, QR, favoritos, recomendaciones o estado que contradigan el host dinámico;
- helpers como `goToMenuVento` y `goToMenuSaudo` no definen la arquitectura canónica por el hecho de hardcodear un nombre de pantalla;
- una migración futura deberá resolver el `site_id`/satellite estable y preservar deep links, back behavior, estado pendiente y rollback antes de retirar un entrypoint;
- ninguna ruta reemplazada permanece accesible indefinidamente sin una decisión explícita de compatibilidad.

---

#### 14. Club permanece separado de fidelización PASS

`Club` es una ruta real, pero no se convierte por navegación en propietario del catálogo PASS.

Reglas:

- `Club` conserva membresía y wallet monetaria con identidad propia;
- `VSCREEN-0109` conserva beneficios/recompensas PASS;
- un beneficio Club solo se proyecta en PASS cuando exista contrato explícito que preserve su identidad;
- abrir `Club` no cambia el saldo de puntos ni el contexto de `SatellitePass`;
- ocultar o mostrar `Club` con `SHOW_CLUB_FEATURES` no elimina `VSCREEN-0109` ni el home PASS.

---

#### 15. Cadena canónica de compra

El flujo objetivo de compra queda:

```text
Home
→ ChooseSatellite
→ OrderHome
→ OrderMenu
→ OrderCheckout
→ OrderPlaced
→ MyOrders / OrderChat según necesidad posterior
```

Con ramas permitidas:

- `DeliveryAddresses` se abre desde selección/checkout y retorna al caller autorizado;
- un contexto de satélite ya resuelto puede entrar a `OrderHome` sin repetir selección cuando el contrato lo permita;
- reordenar desde `MyOrders` puede volver a `OrderCheckout` con un draft validado;
- `OrderChat` exige un `orderId` propio;
- `OrderPlaced` puede volver a `Home`, `MyOrders`, `OrderMenu` o `OrderChat` según el resultado y acciones disponibles;
- ninguna ruta crea por navegación un pedido, una reserva o un pago.

`ChooseSatellite` y `OrderHome` no se consideran duplicados: representan selección de contexto y entrada contextual del mismo `VSCREEN-0160`.

---

#### 16. Decisión explícita sobre `OrderPlaced`

El alias Babel actual resuelve:

```text
@/components/OrderPlacedScreen
→ src/components/OrderTrackingScreen.tsx
```

`OrderTrackingScreen.tsx` monta `OrderPlacedScreenLive` y añade seguimiento/entrega, de modo que el runtime efectivo compone actualmente:

```text
VSCREEN-0165 — CONFIRMACIÓN / RETORNO DE PAGO
+
VSCREEN-0167 — SEGUIMIENTO DE PREPARACIÓN / ENTREGA
→ UNA RUTA RUNTIME `OrderPlaced`
```

Esta composición queda documentalmente aceptada como `SHARED_CANONICAL_ROUTE` bajo estas condiciones:

1. receipt/pago y seguimiento siguen siendo contratos distinguibles;
2. `transactionId`/`checkoutOpened` no son requisitos para consultar seguimiento de un pedido ya existente;
3. `orderId` identifica el recurso propio y se vuelve a validar contra sesión/ownership;
4. la ruta no declara pago aprobado solo por haber sido abierta;
5. el seguimiento no oculta el resultado de pago ni el receipt;
6. un cambio futuro de nombre o separación en dos rutas deberá preservar `payment-return`, enlaces internos, pedidos activos, historial y rollback;
7. el nombre técnico `OrderPlaced` no obliga al copy visible a llamar “pedido creado” a estados que todavía no lo son.

No se crea una segunda ruta `OrderTracking` en esta tarea.

---

#### 17. Deep links canónicos vigentes

Se preservan exactamente los entrypoints externos observados:

| Destino runtime | Path externo | Función |
| --- | --- | --- |
| `Home` | raíz | entrada principal de PASS |
| `MyOrders` | `orders` | pedidos propios |
| `OrderPlaced` | `payment-return` | retorno de pago y recuperación del contexto del pedido |

Prefijos observados:

```text
vento-pass://
vento-pass-dev://
https://pass.ventogroup.co
```

Reglas:

- la ausencia de deep link no elimina una pantalla;
- un deep link no crea una `VSCREEN-*` adicional;
- el path `payment-return` entra por `VSCREEN-0165` aunque la ruta compartida también materialice seguimiento;
- parámetros se parsean como entrada y después se revalidan contra sesión, ownership y fuente autoritativa;
- no se inventan deep links para reclamos, reservas, comunicaciones, catálogo, perfil o historial desde esta tarea;
- cualquier alias o path nuevo requiere decisión de compatibilidad y no puede abrir una superficie protegida por inferencia.

---

#### 18. Entradas externas, sesión y continuidad segura

Toda navegación externa debe respetar los gates de aplicación.

```text
DEEPLINK / URL
→ RESOLVER APP
→ RESOLVER SESIÓN / PERFIL
→ REVALIDAR RECURSO PROPIO Y FEATURE DISPONIBLE
→ ABRIR DESTINO
```

Reglas:

1. abrir un enlace no omite `Auth`, `CompleteProfile`, `AppUpdateGate` ni los gates runtime aplicables;
2. un `orderId` recibido por URL no prueba ownership;
3. parámetros desconocidos no amplían la pantalla ni conceden contexto;
4. un retorno de pago no se redirige silenciosamente a un pedido distinto;
5. una sesión ausente puede diferir la navegación, pero el destino restaurado debe volver a validarse;
6. al cerrar sesión no se conserva navegación privada del usuario anterior;
7. un recurso no encontrado, denegado o fuera de ownership usa los contratos de mensaje/recuperación, no un fallback hacia otro recurso.

La persistencia concreta del destino durante recuperación de sesión pertenece a la implementación y a `PASS-UX-012` cuando implique restauración de estado.

---

#### 19. Feature flags y rutas existentes

Los feature flags gobiernan disponibilidad runtime, no existencia documental.

| Flag | Superficies observadas | Regla |
| --- | --- | --- |
| `SHOW_CLUB_FEATURES` | `Club` | puede ocultar la ruta Club; no afecta la existencia del home o catálogo PASS |
| `SHOW_PURCHASE_FEATURES` | `MyOrders`, `ChooseSatellite`, `DeliveryAddresses`, `VentoCafe`, `Saudo`, `OrderHome`, `OrderMenu`, `OrderCheckout`, `OrderPlaced`, `OrderChat` | deshabilita entrada ordinaria de compra, pero no borra el inventario ni convierte rutas en inexistentes |

Reglas adicionales:

- una CTA no se muestra como activa si su destino no está montado;
- desactivar compra no invalida retrospectivamente pedidos o pagos ya existentes;
- un retorno `payment-return` de una operación previamente iniciada debe tener una salida segura aunque la creación de nuevas compras esté temporalmente deshabilitada;
- un flag no autoriza a declarar un pedido inexistente, borrar estado ni redirigir a una ruta semánticamente distinta;
- el contrato detallado de recuperación cuando una ruta no esté disponible se resuelve en `PASS-UX-012` y la implementación propietaria.

---

#### 20. Resolución de módulos y aliases

Los aliases de implementación no son aliases de navegación.

El runtime Babel observado resuelve cinco identidades inventariadas hacia implementaciones distintas:

| Import lógico | Fuente runtime efectiva observada | Identidad de navegación conservada |
| --- | --- | --- |
| `@/components/Home` | `HomeOptimized.tsx` | `Home` |
| `@/components/ChooseSatelliteScreen` | `ChooseSatelliteScreenOptimized.tsx` | `ChooseSatellite` |
| `@/components/DeliveryAddressesScreen` | `DeliveryAddressesScreenV2.tsx` | `DeliveryAddresses` |
| `@/components/MyOrdersScreen` | `MyOrdersScreenV2.tsx` | `MyOrders` |
| `@/components/OrderPlacedScreen` | `OrderTrackingScreen.tsx` | `OrderPlaced` |

Regla canónica:

```text
ALIAS DE MÓDULO
≠
SEGUNDA RUTA
≠
SEGUNDA VSCREEN
```

La identidad de navegación se mantiene estable hasta que una migración explícita cambie el contrato y sus consumidores.

---

#### 21. Divergencia Babel / TypeScript

`tsconfig.json` declara además:

```text
@/components/OrderMenu → OrderMenuAvailability.tsx
@/components/OrderCheckout → BaseOrderCheckout.tsx
```

mientras Babel no conserva aliases equivalentes y el runtime observado resuelve los imports lógicos hacia `OrderMenu.tsx` y `OrderCheckout.tsx`.

Decisión:

1. la fuente ejecutable actual se determina por la resolución efectiva del bundler, no por la asistencia del editor;
2. TypeScript no puede certificar como runtime una variante que Babel/Metro no adopta;
3. la materialización deberá hacer converger tooling y runtime sobre una resolución explícita por import lógico;
4. elegir una variante nueva exige demostrar paridad y no se hace por esta tarea documental;
5. mientras exista divergencia, revisiones de código y pruebas deben identificar si inspeccionan fuente lógica, fuente runtime o variante de tooling;
6. una política futura de alias único debe evitar que dos archivos parezcan implementar simultáneamente la misma ruta.

---

#### 22. Contexto y parámetros de navegación

Los parámetros transportan contexto; no crean autoridad.

| Parámetro o familia | Uso permitido | Límite |
| --- | --- | --- |
| `satelliteId` / satélite | resolver sede/marca y host contextual | debe corresponder a identidad activa/autorizada; no se inventa por label |
| `orderId` | consultar pedido propio, seguimiento o chat | debe revalidarse por servidor/ownership |
| `transactionId` | correlacionar retorno de pago cuando aplique | no confirma pago por existencia |
| `checkoutOpened` | contexto de presentación del retorno | no sustituye estado de pago |
| `returnTo` interno de direcciones | regresar al caller aprobado | no acepta destino arbitrario como autoridad |
| `orderContext` | transportar intención de compra entre etapas | fuente propietaria vuelve a validar precio, disponibilidad, entrega y pago |

Una pantalla no adopta parámetros de otra ruta solo para reutilizar componentes.

---

#### 23. Navegación hacia atrás, reset y cierre de superficies

El contrato distingue navegación de efectos empresariales.

```text
GO BACK
RESET NAVIGATION
CERRAR MODAL
CAMBIAR TAB
≠
CANCELAR PEDIDO
≠
CANCELAR REDENCIÓN
≠
REVOCAR PAGO
≠
ELIMINAR CUENTA
```

Reglas:

- `goBack` retorna en la historia de navegación y no revierte mutaciones confirmadas;
- `reset` se usa para limpiar historia de navegación cuando el flujo lo requiera, sin fabricar estado empresarial;
- cerrar `QrModal`, `RedeemModal` o un host de sede no cancela la identidad o intención ya persistida;
- cambiar de tab en fidelización no dispara una nueva redención;
- después de eliminación/cierre de sesión, los gates de autenticación determinan el siguiente estado; un reset visual hacia `Home` no prueba que la sesión siga siendo válida.

---

#### 24. Pantallas canónicas todavía no materializadas

Se preservan explícitamente tres identidades sin superficie runtime dedicada suficiente:

| VSCREEN | Decisión |
| --- | --- |
| `VSCREEN-0169 — Mis reclamos y casos de servicio` | `UNMATERIALIZED_DESTINATION`; `OrderChat` no se usa como alias de caso |
| `VSCREEN-0170 — Mis reservas y eventos` | `UNMATERIALIZED_DESTINATION`; no se crea ruta ficticia |
| `VSCREEN-0172 — Comunicaciones y notificaciones del cliente` | `UNMATERIALIZED_DESTINATION`; recibir una notificación no equivale a disponer de inbox/workspace |

Mientras no exista materialización verificable:

- no aparecen como destino navegable “implementado”;
- no usan una alerta “Próximamente” como prueba de cobertura;
- no heredan arbitrariamente otra ruta de cliente;
- no se crean aliases documentales para reducir el conteo de brechas;
- su owner funcional, proceso y `VSCREEN-*` permanecen reservados para implementación posterior.

---

#### 25. Satisfacción permanece embebida

`VSCREEN-0171 — Calificación y satisfacción` dispone de evidencia runtime en `RatingModal` y `FeedbackModal` embebidos.

Decisión:

- no se crea una `Stack.Screen` solo para obtener correspondencia uno a uno;
- el trigger debe provenir de un hecho elegible y contexto propio;
- cerrar la modal no crea un reclamo;
- una calificación negativa no redirige automáticamente a `VSCREEN-0169` sin contrato de caso;
- la representación embebida continúa siendo canónica mientras preserve consentimiento, contexto, no duplicación y trazabilidad definidos por su propietario.

---

#### 26. Placeholders y capacidades no disponibles

La navegación consolidada prohíbe usar placeholders como sustituto de una capacidad real.

No constituyen destino canónico:

```text
Alert “Próximamente”
Toast sin navegación
botón que abre la misma pantalla sin función
ruta vacía usada solo para reservar nombre
alias hacia un workspace semánticamente distinto
```

Una capacidad no materializada se oculta, se marca como no disponible cuando exista razón de producto para mostrarla, o se entrega a un owner real; no se cuenta como implementada por tener un CTA.

---

#### 27. Compatibilidad y retiro de rutas

Una ruta existente solo puede dejar de ser entrypoint cuando exista evidencia de transición segura.

Contrato mínimo de retiro/convergencia:

1. identificar origen, destino canónico y consumidores;
2. probar paridad funcional aplicable;
3. preservar deep links y enlaces internos todavía soportados;
4. migrar navegación de componentes/helpers;
5. preservar parámetros y contexto válidos;
6. resolver borradores, pagos, pedidos, redenciones y estado pendiente;
7. impedir doble analítica o doble efecto por origen/destino;
8. definir rollback;
9. observar uso residual y enlaces huérfanos;
10. retirar el origen únicamente cuando la puerta propietaria lo permita.

Por tanto, `VentoCafe` y `Saudo` no se eliminan por esta tarea aunque queden clasificados como compatibilidad frente al host dinámico.

---

#### 28. Reglas de destino para helpers y componentes

Los helpers de navegación deben expresar intención, no nombres históricos como contrato empresarial.

Reglas objetivo:

- un helper hacia Vento Café o Saudo resuelve primero la identidad de sede/marca antes de elegir un entrypoint compatible;
- un helper de historial no muestra un placeholder ni elige una sede implícita;
- un componente que abre pedidos usa `MyOrders` o `OrderPlaced` según intención, no por conveniencia de archivo;
- un componente que abre chat transporta únicamente el pedido necesario y deja la autorización al destino;
- un caller de `DeliveryAddresses` solo recibe retorno hacia destinos internos conocidos por el flujo;
- un wrapper optimizado o V2 conserva exactamente la misma identidad de navegación que el import lógico al que sustituye.

---

#### 29. Nombres técnicos y copy visible

El nombre de una ruta es una clave técnica y no obliga a utilizar ese literal en UI.

Ejemplos:

- `OrderPlaced` puede alojar estados pendientes o tracking sin mostrar “Pedido confirmado” antes de evidencia;
- `SatellitePass` no obliga a llamar “Pass” al catálogo si el copy aprobado usa beneficios/recompensas;
- `VentoCafe` y `Saudo` pueden convertirse en entrypoints de compatibilidad aunque el cliente vea el nombre de la marca;
- `AccountSettings` representa el mantenimiento de `VSCREEN-0112` sin limitar el workspace visible a “configuración” si incluye privacidad/consentimientos;
- los labels visibles deben seguir `PASS-UX-010` y no expondrán nombres internos de ruta o archivo.

---

#### 30. Frontera cliente frente a operación PULSO y contexto laboral

La navegación cliente no absorbe rutas operativas.

```text
PASS CUSTOMER NAVIGATION
≠
PULSO /scanner
≠
PASS LABOR SUPPORT SURFACES
```

Reglas:

- el QR personal abre `QrModal`, no `/scanner`;
- redimir desde PASS crea/presenta intención y PULSO conserva validación/consumo operativo;
- una ruta cliente no recibe `pos.main` ni permisos laborales por compartir proceso;
- contexto laboral embebido en `Home` no cambia el mapa de rutas del cliente;
- simulación laboral no altera el `site_id` de una experiencia de cliente ni la propiedad del pedido;
- ninguna ruta de cliente se duplica en PULSO para “facilitar” una operación de caja.

---

#### 31. Handoffs posteriores

| Responsabilidad pendiente | Propietario |
| --- | --- |
| estados de carga, error, offline, retry, caché, Realtime y recuperación móvil | `PASS-UX-012` |
| prueba de arquitectura, labels y comprensión con clientes reales | `PASS-UX-013` |
| integración PULSO → PASS de acumulación/redención | `PASS-INT-001`, `PASS-INT-002` |
| administración de productos de fidelización | `PASS-INT-003` |
| identidad cliente-trabajador e integración operativa | `PASS-INT-004`, `PASS-INT-005` y contratos AUTH/PULSO aplicables |
| materialización de aliases, rutas, deep links, helpers y convergencia de componentes | package de implementación propietario posterior |
| retiro físico de `VentoCafe`/`Saudo` u otro entrypoint | transición con paridad, consumidores, rollback y evidencia runtime |
| materialización de reclamos, reservas y comunicaciones | tareas propietarias de esas capacidades y packages posteriores |

`PASS-UX-011` entrega el contrato de navegación; no ejecuta ninguno de estos handoffs.

---

#### 32. Hallazgos AS-IS y condición de salida

| Hallazgo | Riesgo | Decisión de esta tarea | Condición de salida física posterior |
| --- | --- | --- | --- |
| cinco imports lógicos de stack resuelven a variantes Babel | inspección o cambio sobre archivo no ejecutado | identidad de ruta se separa de archivo efectivo | tooling, runtime y pruebas reconocen una resolución única por import lógico |
| `OrderMenu` y `OrderCheckout` tienen aliases TypeScript sin equivalente Babel | editor/test y app pueden razonar sobre fuentes distintas | runtime efectivo no se redefine desde TypeScript | Babel/Metro y TypeScript convergen sobre la misma fuente o migración explícita |
| `OrderPlaced` resuelve a `OrderTrackingScreen.tsx` | retorno de pago y seguimiento podían parecer conflicto | se aprueba `SHARED_CANONICAL_ROUTE` con contratos separados | pruebas demuestran receipt, pago, seguimiento, deep link y ownership sin regresión |
| `goToMovements` muestra “Próximamente” | capacidad visible ficticia | placeholder no cuenta como `VSCREEN-0111` | existe destino global compatible o la acción deja de mostrarse como disponible |
| Vento Café, Saudo y satélite dinámico duplican navegación/semántica | deriva de rewards e historial | estáticos quedan compatibilidad; host dinámico es objetivo contextual | paridad, consumidores y rollback permiten convergencia física |
| tres `VSCREEN-*` carecen de superficie dedicada | falsa cobertura si se crean aliases narrativos | permanecen `UNMATERIALIZED_DESTINATION` | package propietario aporta runtime verificable y navegación real |
| satisfacción es modal embebida | presión por inventar ruta solo para 1:1 | `EMBEDDED_DESTINATION` aprobado | no requiere ruta mientras cumpla contrato funcional |
| `payment-return` entra a ruta detrás de purchase flag | retorno previo puede quedar huérfano ante rollout | creación de compra y recuperación de resultado se separan | implementación ofrece salida segura para operaciones ya iniciadas |

Ningún hallazgo autoriza una mutación física desde esta tarea.

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el inventario exacto de rutas/superficies, la convergencia entre experiencias, la unicidad del retorno de pago/seguimiento, la persistencia de superficies detrás de feature flags, la reconciliación `VSCREEN-*` ↔ runtime y la detección de deriva ya están cubiertos por requisitos PASS vigentes. Esta tarea especializa la arquitectura objetivo y decide compatibilidad/representación sin introducir una obligación verificable nueva.

---

#### 34. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza como cobertura principal:

- `TREQ-PASS-006` para convergencia de `site_id`, marca, enlaces, recompensas e historial entre rutas estáticas y dinámicas, y para impedir rutas reemplazadas sin decisión de compatibilidad;
- `TREQ-PASS-007` para una única experiencia canónica de retorno de pago y seguimiento, con integración o retiro explícito de alternativas;
- `TREQ-PASS-034` para impedir navegación duplicada entre superficies cliente/laborales PASS y la operación PULSO relacionada;
- `TREQ-PASS-035` para conservar el inventario de quince pantallas de stack y veintiuna superficies cliente/transversales;
- `TREQ-PASS-036` para conservar los quince nombres reales de `Stack.Screen` y exigir reconciliación ante altas, retiros o renombres;
- `TREQ-PASS-037` para mantener inventariadas las superficies de compra aunque `SHOW_PURCHASE_FEATURES` esté deshabilitado;
- `TREQ-PASS-038` para mantener Auth, CompleteProfile, QrModal, AppUpdateGate, runtime gates y AppErrorBoundary separados de las quince rutas de stack;
- `TREQ-PASS-039` para mantener `QrModal` como identificación personal separada de scanner/acumulación/redención operativa;
- `TREQ-PASS-040` para impedir que la navegación cliente adopte contexto o permisos laborales;
- `TREQ-PASS-041` para permitir relaciones no uno a uno entre superficies AS-IS y `VSCREEN-*` sin declarar futuras capacidades como implementadas;
- `TREQ-PASS-042` para comparar el runtime PASS con el inventario congelado y fallar ante deriva cuando exista checkout hermano.

Esta sección documenta trazabilidad existente; no modifica ni amplía el Registro 04A.

---

#### 35. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real se ejecutará únicamente después de que `PASS-UX-010` cierre con `NEXT_TASK_ALLOWED: SI` y esta tarea pueda incorporarse en su rama propia. |
| LOCAL | `NOT_EXECUTED` | No se ha abierto `task/pass-ux-011` ni se ha reemplazado el marcador en el checkout del usuario. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, owner, topología `PASS-UX`, catálogo de 19 `VSCREEN-*`, inventario BLOQUE I, reglas de aliases/redirects, Registro 04A PASS, validador de matrices, `vento-pass/main`, `App.js`, Babel, TypeScript, helpers de navegación, Home, satélites, fidelización, compra, pedidos, retorno de pago, tracking, chat y direcciones. |
| OPERATIVA | `NOT_EXECUTED` | No se navegó una build desplegada, deep link real, pago, pedido, chat, catálogo, historial, perfil, feature flag ni dispositivo móvil. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-UX-011` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 36. Criterios de aceptación

- [x] Se desarrolla exactamente `PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente`.
- [x] Se preservan las diecinueve `VSCREEN-*`, quince identidades de stack y veintiuna superficies cliente/transversales sin inflar conteos.
- [x] `VSCREEN`, nombre de stack, deep link, import lógico y módulo runtime quedan diferenciados.
- [x] Cada una de las diecinueve `VSCREEN-*` recibe una decisión explícita de navegación.
- [x] No se inventan rutas para reclamos, reservas ni comunicaciones todavía no materializadas.
- [x] `VSCREEN-0171` permanece embebida sin exigir `Stack.Screen` artificial.
- [x] `VSCREEN-0111` no se degrada a una pestaña limitada por sede ni a `goToMovements` “Próximamente”.
- [x] Vento Café y Saudo quedan clasificados como entrypoints de compatibilidad frente al host dinámico objetivo, sin retiro físico anticipado.
- [x] Club permanece separado de puntos/recompensas PASS salvo proyección explícita.
- [x] `ChooseSatellite` y `OrderHome` se reconocen como etapas compuestas de `VSCREEN-0160`, no duplicados.
- [x] `OrderPlaced` queda aprobado documentalmente como ruta compartida de `VSCREEN-0165` y `VSCREEN-0167` bajo composición verificable.
- [x] Se preservan raíz, `orders` y `payment-return` como únicos deep links observados; no se inventan otros.
- [x] Feature flags no borran inventario ni convierten una ruta en inexistente.
- [x] Las cinco resoluciones Babel no crean rutas adicionales.
- [x] La divergencia TypeScript/Babel de `OrderMenu` y `OrderCheckout` queda identificada y con política de convergencia.
- [x] Back/reset/cierre de modal/tab no se confunden con cancelación o reversión empresarial.
- [x] Navegación cliente permanece separada de `/scanner` PULSO y de contexto laboral PASS.
- [x] Los retiros futuros exigen paridad, consumidores, compatibilidad, rollback y evidencia de uso residual.
- [x] `PASS-UX-012` conserva ownership de carga, error, offline, retry y recuperación.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, datos, Supabase, packages, CI022, piloto ni despliegue.

---

#### 37. Límites

Esta tarea no:

- modifica `App.js`, `babel.config.js`, `tsconfig.json`, helpers, componentes ni navegación runtime;
- agrega, retira o renombra `Stack.Screen`;
- crea rutas `OrderTracking`, `History`, `Claims`, `Reservations`, `Notifications` ni equivalentes;
- crea deep links, prefixes, universal links ni redirects;
- ejecuta la convergencia física de `VentoCafe`, `Saudo`, `SatelliteExperience` o `SatellitePass`;
- decide qué implementación variante debe reemplazar físicamente `OrderMenu` u `OrderCheckout`;
- retira aliases de módulo ni cambia configuración del bundler;
- implementa un historial global nuevo;
- implementa reclamos, reservas, comunicaciones o satisfacción como rutas;
- crea permisos ni usa nombres de ruta como autorización;
- modifica feature flags;
- modifica pedidos, pagos, redenciones, ledger, perfil, consentimientos o reglas de negocio;
- decide persistencia física de parámetros, navegación restaurada o estado offline;
- define backoff, retry, caché, Realtime, colas o reconciliación móvil;
- modifica datos, tablas, RLS, RPC, Storage, Edge Functions, migraciones, secretos o configuración remota;
- ejecuta pruebas de navegación en dispositivo, deep links reales o rollout;
- crea requisitos de prueba ni modifica 04A;
- autoriza packages, implementación física, CI022, piloto o despliegue;
- desarrolla `PASS-UX-012` ni `PASS-UX-013`.

---

#### 38. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-010 — Definir mensajes de error comprensibles`

**TAREA ACTUAL APROBADA**
`PASS-UX-011 — Consolidar navegación y rutas canónicas de la experiencia cliente`

**SIGUIENTE TAREA RESERVADA**
`PASS-UX-012 — Simplificar interfaz móvil, estados de carga, error, offline y recuperación`
### [ ] PASS-UX-012 — Simplificar interfaz móvil, estados de carga, error, offline y recuperación
### [ ] PASS-UX-013 — Ejecutar pruebas con clientes reales
