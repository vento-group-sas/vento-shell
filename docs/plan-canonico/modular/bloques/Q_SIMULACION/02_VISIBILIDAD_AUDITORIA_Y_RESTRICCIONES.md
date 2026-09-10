### MINI-BLOQUE — VISIBILIDAD AUDITORÍA Y RESTRICCIONES

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **visibilidad auditoría y restricciones** dentro de **Q SIMULACIÓN**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AUTH-SIM-007` a `AUTH-SIM-011` — 5 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `AUTH-SIM-007`: Mostrar aviso persistente
- `AUTH-SIM-008`: Registrar inicio de simulación
- `AUTH-SIM-009`: Registrar salida de simulación
- `AUTH-SIM-010`: Bloquear acciones críticas durante simulación
- `AUTH-SIM-011`: Definir modo solo lectura
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-SIM-007 — Mostrar aviso persistente

**Estado:** APROBADA
**Tarea anterior:** AUTH-SIM-006 — No mezclar permisos reales y simulados
**Tarea siguiente:** AUTH-SIM-008 — Registrar inicio de simulación
**Tipo de tarea:** documental; contrato canónico de política, copy y lifecycle visible del aviso persistente de simulación, con materialización posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE Q — Simulación
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/Q_SIMULACION/02_VISIBILIDAD_AUDITORIA_Y_RESTRICCIONES.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica componentes, exports, consumidores, rutas, cookies, sesiones, permisos, Supabase, RLS, RPC, datos, auditoría, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cuándo y cómo una superficie debe mantener visible que representa una simulación de autorización, de manera que ninguna persona pueda confundir una vista hipotética con su contexto o autoridad reales.

La regla raíz es:

```text
CONTENIDO AFECTADO POR SIMULACION
+
PROYECCION AUTORITATIVA VIGENTE
=
AVISO PERCEPTIBLE, PERSISTENTE Y NO DESCARTABLE
```

```text
AVISO VISIBLE
!=
AUTORIDAD
```

El aviso explica el modo actual. No inicia la simulación, no la termina, no selecciona roles, no decide permisos y no sustituye los controles técnicos que impiden efectos reales.

---

#### 2. Fuentes y handoffs consumidos

La tarea consume sin redefinir:

- `AUTH-SIM-001..005`, que fijan actor real, rol, sede, área, turno y check-in hipotéticos;
- `AUTH-SIM-006` y `REAL-SIMULATED-AUTHORITY-SEPARATION-CONTRACT-001`, que separan autoridad, evaluación, presentación y auditoría y limitan el resultado simulado a `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE` con `executable = false`;
- `AUTH-UI-046` y `UX-ACTIVE-CONTEXT-VISIBILITY-CONTRACT-001`, que exigen una proyección persistente del contexto material por aplicación;
- `AUTH-UI-047`, `SIMULATED-ROLE-VISIBILITY-CONTRACT-001` y `SIMULATED-ROLE-PRESENTATION-REGISTER-001`, que fijan la semántica visible del rol simulado y su separación del actor y rol reales;
- `SHELL-UI-009`, que define la primitiva compartida `SimulatedRoleNotice` como presentación estática, no descartable y sin autoridad;
- `SHELL-UI-010`, que deja un slot de avisos dentro del `AppShell` sin resolver la causa ni el lifecycle empresarial;
- `AUTH-DEV-016`, que exige mantener separados dispositivo, principal técnico, actor humano, contexto operativo y simulación en superficies compartidas;
- los registros canónicos de aplicaciones, pantallas, roles y requisitos de prueba vigentes.

Handoff recibido:

```text
SIMULACION Y AUTORIDAD YA SEPARADAS
+
ROL SIMULADO CON SEMANTICA VISIBLE
+
PRIMITIVA COMPARTIDA DISPONIBLE INTERNAMENTE
=
POLITICA AUTORITATIVA DEL AVISO PENDIENTE
```

---

#### 3. Resultado material

Se definen tres artefactos documentales vinculantes:

1. `SIMULATION-PERSISTENT-NOTICE-POLICY-001`, que determina obligatoriedad, contenido, copy, persistencia, accesibilidad, privacidad y fronteras de autoridad;
2. `SIMULATION-NOTICE-LIFECYCLE-MATRIX-001`, que define el comportamiento visible durante resolución, vigencia, cambio, pérdida de frescura, invalidez y salida pendiente;
3. `SIMULATION-NOTICE-APPLICATION-PROJECTION-REGISTER-001`, que materializa una decisión para las diez aplicaciones canónicas sin fabricar pantallas ni consumidores.

Resumen:

| Resultado | Cantidad |
| --- | ---: |
| Estados visibles cerrados | 5 |
| Variantes de copy canónico | 5 |
| Aplicaciones con decisión explícita | 10 |
| Clases de dispositivo cubiertas | 4 |
| Brechas físicas registradas | 6 |
| Acciones de cierre dentro del aviso | 0 |
| Nuevas fuentes de autoridad | 0 |
| Requisitos de prueba nuevos o modificados | 0 |

---

#### 4. Decisiones raíz

1. La capa propietaria resuelve el estado de simulación antes de renderizar el aviso.
2. Toda superficie que muestre contenido afectado por simulación debe mostrar simultáneamente el aviso.
3. El aviso permanece perceptible mientras el contenido simulado siga presente o la salida no haya sido confirmada autoritativamente.
4. La persona no puede descartarlo, ocultarlo, posponerlo ni convertirlo en un toast temporal.
5. Un cambio de ruta, layout, viewport, tab, refresh o aplicación no transforma la simulación en contexto real.
6. Si no puede demostrarse la vigencia de la simulación, la preview deja de presentarse como activa y falla cerrada.
7. La ausencia o fallo visual del aviso no relaja el enforcement; además impide continuar mostrando contenido simulado como si fuera real.
8. Montar o desmontar el aviso no registra inicio ni salida.
9. El copy visible no es fuente de verdad y no se interpreta como permiso.
10. La implementación física ocurre por `implementation_unit_id` después del gate E5 aplicable.

---

#### 5. Fuente autoritativa y condición de renderizado

La condición de renderizado se deriva de una proyección ya resuelta por el propietario:

```text
SIMULATION SESSION / SCENARIO AUTORITATIVO
        ↓
VALIDACION DE ACTOR REAL, VIGENCIA Y VERSIONES
        ↓
PROYECCION SEGURA DE PRESENTACION
        ↓
ESTADO VISIBLE DEL AVISO
```

No son fuentes autoritativas:

- existencia de una cookie de role override;
- query params, pathname, hash o referrer;
- `localStorage`, `sessionStorage` o IndexedDB;
- un nombre de rol en pantalla;
- `navigation_role`;
- estado React conservado por un componente;
- un resultado `WOULD_ALLOW` cacheado;
- el hecho de que el aviso ya estuviera montado;
- un selector legacy denominado `Modo prueba`.

Reglas de renderizado:

| Condición | Resultado |
| --- | --- |
| no existe simulación ni contenido simulado | no renderizar el aviso |
| existe proyección simulada vigente que afecta la superficie | renderizar estado `ACTIVE` |
| existe una simulación conocida, pero su proyección se está reconstruyendo | renderizar estado `RESOLVING`; no presentar preview como confirmada |
| la proyección perdió frescura | renderizar estado `STALE`; pausar el contenido simulado |
| la simulación es inválida, expiró o fue revocada | renderizar estado `INVALID` durante la limpieza; retirar la preview |
| la salida fue solicitada y aún no está confirmada | renderizar estado `EXIT_PENDING`; no anticipar el contexto real |

---

#### 6. Estados visibles cerrados

`SIMULATION-NOTICE-LIFECYCLE-MATRIX-001` admite exactamente:

| Estado | Semántica | Contenido simulado | Acción real |
| --- | --- | --- | --- |
| `RESOLVING` | existe una intención o sesión conocida, pero falta confirmar su proyección vigente | oculto, suspendido o marcado como no confirmado | bloqueada según autoridad real y contratos propietarios |
| `ACTIVE` | la simulación fue confirmada y su escenario es vigente | visible únicamente como preview no ejecutable | nunca habilitada por la simulación |
| `STALE` | la proyección dejó de ser suficientemente fresca | pausado; no se reutiliza como vigente | requiere nueva resolución real y simulada |
| `INVALID` | expiración, revocación, incompatibilidad o contaminación invalidaron el escenario | retirado o sustituido por estado seguro | no se ejecuta ni aplica fallback |
| `EXIT_PENDING` | se solicitó salir, pero el cierre no fue confirmado | conserva semántica simulada hasta confirmación | no se presenta todavía contexto real restaurado |

No existe un estado `DISMISSED`. La ausencia de simulación no es un sexto estado del aviso: implica que el componente no se renderiza.

---

#### 7. Transiciones del lifecycle visible

| Evento | Estado anterior | Estado visible | Regla |
| --- | --- | --- | --- |
| solicitud de inicio | sin aviso | `RESOLVING` solo si la capa propietaria ya confirma que existe una transición de simulación | el aviso no crea la sesión ni audita el inicio |
| inicio autoritativo confirmado | `RESOLVING` | `ACTIVE` | se muestra la proyección exacta vigente |
| cambio de rol, sede, área, turno, check-in, permiso, recurso o versión | `ACTIVE` | `RESOLVING` | el aviso anterior no conserva vigencia por estado local |
| nueva proyección confirmada | `RESOLVING` | `ACTIVE` | se reemplaza todo dato del escenario previo de forma atómica |
| respuesta tardía de un escenario anterior | cualquiera | sin cambio | se descarta por correlación o versión |
| pérdida de frescura o conectividad material | `ACTIVE` | `STALE` | no se prolonga la simulación por caché |
| expiración, revocación, actor real inválido o incompatibilidad de versión | cualquiera | `INVALID` | se retira la preview y se reconstruye contexto real |
| solicitud de salida | `ACTIVE` o `STALE` | `EXIT_PENDING` | el click no equivale a cierre confirmado |
| salida confirmada | `EXIT_PENDING` o `INVALID` | sin aviso | primero se retira contenido simulado y luego se publica contexto real fresco |
| salida fallida | `EXIT_PENDING` | `ACTIVE`, `STALE` o `INVALID` según nueva resolución | nunca se oculta el aviso suponiendo éxito |
| fallo de renderizado del aviso | cualquiera | preview bloqueada | el enforcement autoritativo permanece independiente |

`AUTH-SIM-008` y `AUTH-SIM-009` conservan la auditoría y semántica funcional de inicio y salida. Esta matriz solo fija qué debe percibir la persona durante esas transiciones.

---

#### 8. Contenido mínimo obligatorio

En estado `ACTIVE`, el aviso debe conservar simultáneamente:

1. título explícito de simulación;
2. etiqueta humana del rol objetivo;
3. tipo `BASE` u `OPERATIONAL` cuando sea necesario para evitar colisión;
4. separación inequívoca respecto de la cuenta, sesión, contexto y permisos reales;
5. dimensiones hipotéticas materiales del escenario, cuando apliquen;
6. naturaleza no ejecutable de la vista;
7. resultado hipotético, cuando ya exista, sin renombrarlo como decisión real;
8. estado de vigencia cuando no sea `ACTIVE`.

Nunca se utiliza como contenido humano principal:

- UUID, `simulation_id` o `session_id`;
- email, documento, teléfono o identificador sensible del actor;
- claves de permiso, grants, scopes o claims;
- nombres de cookies, tablas, schemas, RPC o funciones;
- reason codes internos;
- fingerprints completos, tokens o secretos;
- `can_operate`, `allowed = true` o booleanos ambiguos.

---

#### 9. Copy empresarial canónico

La composición propietaria utilizará estas ideas y textos base; podrá adaptar género, longitud o contexto sin cambiar su significado:

| Estado | Título | Identidad | Descripción | Etiqueta no ejecutable |
| --- | --- | --- | --- | --- |
| `ACTIVE` | `SIMULACIÓN ACTIVA` | `Viendo como: {rol humano}` | `Estás viendo un escenario hipotético. Tu cuenta, contexto y permisos reales no cambian.` | `Esta vista no autoriza acciones reales.` |
| `RESOLVING` | `SIMULACIÓN EN VERIFICACIÓN` | `Rol simulado: {rol humano o por confirmar}` | `Estamos confirmando el escenario antes de mostrar la vista previa.` | `No ejecutes acciones basándote en esta vista.` |
| `STALE` | `SIMULACIÓN NO VIGENTE` | `Último rol simulado: {rol humano}` | `La vista previa perdió vigencia y está pausada mientras se vuelve a validar.` | `El resultado anterior no autoriza acciones reales.` |
| `INVALID` | `SIMULACIÓN DETENIDA` | `Escenario simulado no disponible` | `La simulación expiró, fue revocada o ya no es compatible. La vista previa se está retirando.` | `No se conservará autoridad ni contenido simulado.` |
| `EXIT_PENDING` | `SALIENDO DE SIMULACIÓN` | `Viendo como: {rol humano}` | `La salida todavía no ha sido confirmada. El contexto real aún no debe darse por restaurado.` | `Esta vista continúa sin autorizar acciones reales.` |

Reglas:

- `Modo prueba`, `Rol activo` y `Usar rol real` no son sustitutos del copy canónico;
- un rol operativo incluye contexto hipotético suficiente para evitar una identidad laboral incompleta;
- `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE` se traducen de forma explicativa, pero conservan su nombre o equivalencia inequívoca;
- el aviso no promete que una acción real quedará disponible al salir;
- el copy no revela por qué un actor carece de acceso a datos que no puede consultar realmente.

---

#### 10. Rol y contexto hipotéticos

La presentación mantiene separados:

```text
ACTOR REAL
+
ROL REAL
+
ROL SIMULADO TIPADO
+
CONTEXTO HIPOTETICO
```

Para roles `BASE`, la etiqueta de rol puede ser suficiente cuando la evaluación no exige territorio operativo.

Para roles `OPERATIONAL`, el resumen incluye las dimensiones necesarias para interpretar el escenario, como sede, área, turno o check-in hipotéticos. Una dimensión ausente no se toma del actor real y produce `RESOLVING`, `INDETERMINATE` o invalidez según el contrato propietario.

Las etiquetas visibles no alteran los tipos canónicos ni convierten una referencia bare en identidad válida.

---

#### 11. Persistencia dentro de una aplicación

Persistente significa que el aviso permanece perceptible durante todo el periodo en que la superficie presenta contenido afectado por simulación.

Requisitos:

1. no desaparece por timeout;
2. no puede cerrarse, minimizarse indefinidamente ni marcarse como leído;
3. no queda únicamente dentro del menú de perfil;
4. no se pierde al cambiar entre rutas que conservan la misma simulación;
5. no se oculta por scroll sin mantener una representación equivalente y perceptible;
6. no se degrada a icono o color sin texto;
7. no desaparece durante `CHANGING`, revalidación o salida pendiente;
8. no conserva internamente un rol anterior cuando recibe una proyección nueva;
9. no reutiliza una representación cacheada después de expirar;
10. se retira únicamente después de retirar la preview y confirmar el regreso a contexto real.

La posición física puede variar entre header, región bajo el header, slot `notices`, barra persistente o chrome específico, siempre que la persona pueda reconocer el modo antes de interpretar o intentar una acción material.

---

#### 12. Navegación, refresh, tabs y handoff entre aplicaciones

| Escenario | Regla |
| --- | --- |
| navegación interna | la composición vuelve a proyectar el aviso antes o junto con el contenido simulado de la ruta destino |
| refresh | reconstruye la simulación desde fuente autoritativa; no confía en estado React, cookie o URL por sí solos |
| nueva pestaña | resuelve de nuevo actor real, sesión y escenario; no clona autoridad desde la pestaña origen |
| back/forward cache | revalida antes de presentar la preview como `ACTIVE` |
| deep link | la referencia solo localiza; no activa simulación ni concede acceso |
| cambio de aplicación | el destino reconstruye la proyección y autoridad reales; no hereda un `ALLOW` ni un estado visual del origen |
| retorno al origen | vuelve a resolver vigencia; no restaura silenciosamente la preview anterior |

Durante un handoff, SHELL puede mostrar una transición de simulación, pero la aplicación destino es responsable de confirmar si esa simulación afecta su superficie. La ausencia de soporte en destino no autoriza mostrar contenido hipotético sin aviso.

---

#### 13. Invalidez, pérdida del indicador y fallo cerrado

Se consideran invalidaciones materiales:

- sesión real expirada, revocada o sustituida;
- actor real cambiado;
- simulación cerrada, expirada o revocada;
- objetivo de rol retirado, bloqueado o incompatible;
- cambio de versión de catálogos, política o escenario;
- pérdida de correlación entre contenido y aviso;
- respuesta tardía que pertenece a otro escenario;
- datos hipotéticos incompletos;
- contaminación entre contexto real y simulado;
- imposibilidad de reconstruir la fuente autoritativa;
- aviso ausente mientras continúa contenido simulado.

Resultado obligatorio:

```text
NO SE PUEDE DEMOSTRAR AVISO + ESCENARIO VIGENTES
        ↓
NO MOSTRAR PREVIEW COMO ACTIVA
        ↓
PAUSAR O RETIRAR CONTENIDO SIMULADO
        ↓
RECONSTRUIR CONTEXTO REAL Y REAUTORIZAR
```

Nunca se oculta el aviso primero dejando temporalmente una pantalla simulada con apariencia real.

---

#### 14. Adaptación por dispositivo

| Superficie | Persistencia exigida |
| --- | --- |
| escritorio | resumen visible en chrome o región estable; el detalle puede expandirse sin ocultar condición, rol y no ejecutabilidad |
| tablet | barra o tarjeta persistente con texto legible, sin tapar información operativa crítica ni quedar solo bajo scroll |
| móvil | versión compacta recurrente con condición y rol visibles; detalle disponible en una acción, sin reducir todo a un icono |
| kiosco o estación compartida | aviso, dispositivo/estación, actor humano y rol operativo permanecen separados y perceptibles; cambio de actor invalida la proyección previa |

No se fija altura universal. El contenido admite reflow, zoom y texto largo sin clipping, scroll horizontal obligatorio ni elipsis que elimine el significado.

---

#### 15. Accesibilidad

1. La condición no depende exclusivamente de color, borde, icono, animación, sonido o vibración.
2. Título, rol simulado y naturaleza no ejecutable forman parte del contenido accesible.
3. El aviso ordinario no roba foco y no crea tab stops innecesarios.
4. No se impone `role="alert"` ni una región assertiva en cada render.
5. La transición a simulación o a estado inválido puede anunciarse una vez mediante una región `polite` propietaria, sin repetir el anuncio por navegación ordinaria.
6. Un cambio de rol o escenario produce una actualización perceptible y correlacionada.
7. La información esencial no depende de hover ni de tooltip.
8. Si existe una acción adyacente de salida en una fase posterior, mantiene foco visible, nombre accesible y resultado anunciado por su propietario.
9. Zoom, contraste, viewport estrecho, teclado y lector de pantalla se certifican por unidad física.

---

#### 16. Privacidad y minimización

El aviso muestra solo lo necesario para interpretar la preview:

- etiqueta humana segura del rol;
- contexto hipotético material y minimizado;
- separación de la cuenta real;
- vigencia y naturaleza no ejecutable.

No muestra identidad completa del actor real, recursos fuera de su alcance, datos sensibles del sujeto simulado ni diagnósticos internos. Un simulador puede conocer que el escenario hipotético permitiría una capacidad sin obtener el contenido real protegido por esa capacidad.

Logs y analytics no capturan automáticamente el copy completo si contiene etiquetas contextuales. La auditoría estructurada permanece separada y pertenece a sus tareas propietarias.

---

#### 17. Registro por aplicación

`SIMULATION-NOTICE-APPLICATION-PROJECTION-REGISTER-001`:

| Aplicación | Decisión cuando una simulación afecta la superficie | Distinción obligatoria |
| --- | --- | --- |
| `shell` | mantiene el aviso durante navegación o preview transversal y exige revalidación en destino | transporte no es autoridad; aplicación destino confirma el escenario |
| `anima` | muestra el aviso solo en una preview laboral autorizada | rol y turno simulados no alteran trabajador, jornada, asistencia o check-in reales |
| `viso` | presenta la política completa en herramientas de simulación y comparación | actor real, rol objetivo, contexto hipotético y resultado permanecen separados |
| `nexo` | mantiene aviso en previews de inventario, logística o contexto operativo | sede, área, estación y rol simulados no habilitan movimientos reales |
| `fogo` | mantiene aviso en previews productivas | rol o área simulados no crean turno, lote, receta ejecutable ni consumo de inventario |
| `origo` | mantiene aviso en previews de compra o recepción | cobertura simulada no concede aprobación, recepción ni datos adicionales de proveedor |
| `pulso` | mantiene aviso en previews comerciales | rol simulado no crea sesión de caja, custodia, venta, pago, cierre ni reembolso |
| `numera` | mantiene aviso en previews financieras con minimización reforzada | simulación no amplía entidad, periodo, saldos, costos ni mutaciones contables |
| `pass` | no mezcla simulación laboral con identidad cliente; si una preview administrativa autorizada representa PASS, conserva el aviso fuera de la sesión cliente | cliente real y rol laboral simulado nunca se fusionan |
| `aura` | conserva cero pantallas canónicas admitidas; no se fabrica un aviso ni una superficie para aparentar adopción | cualquier futura superficie deberá ingresar primero al catálogo y a su unidad propietaria |

Reconciliación:

```text
aplicaciones esperadas = 10
aplicaciones materializadas = 10
aplicaciones omitidas = 0
pantallas nuevas = 0
consumidores declarados como migrados = 0
```

---

#### 18. Dispositivos compartidos

En una estación compartida coexisten sin fusión:

```text
DISPOSITIVO / ESTACION
+
PRINCIPAL TECNICO
+
ACTOR HUMANO REAL
+
ROL OPERATIVO REAL
+
ROL Y CONTEXTO SIMULADOS
+
AVISO PERSISTENTE
```

El aviso no sustituye la identificación del actor, el techo del dispositivo ni el estado del turno/check-in real. Un cambio de trabajador, expiración de actor session, revocación del dispositivo o cambio material de sede/área invalida la proyección simulada anterior.

El dispositivo no hereda simulación de otro actor y la simulación no sobrevive como autoridad para el siguiente trabajador.

---

#### 19. Presentación no es enforcement

La seguridad debe mantenerse aunque el aviso:

- no cargue;
- sea ocultado por CSS defectuoso;
- falle durante hidratación;
- no exista en un consumidor legacy;
- muestre copy desactualizado;
- sea manipulado desde DevTools.

`AUTH-SIM-010` conserva el bloqueo material de acciones críticas y `AUTH-SIM-011` el modo solo lectura. Esta tarea añade una condición de integridad visual: si la preview no puede mantener el aviso, esa preview no debe mostrarse como utilizable.

No se admite:

```text
banner visible => seguridad activa
banner ausente => operación normal
```

La autoridad real se evalúa siempre en su plano y canal propietarios.

---

#### 20. Relación con `SimulatedRoleNotice`

La implementación interna actual de `@vento/ui-web` aporta:

- `SimulatedRoleNotice` y `SimulatedRoleNoticeProps`;
- props `title`, `simulatedRoleLabel`, `description` y `nonExecutableLabel`;
- presentación estática compatible con servidor;
- ausencia de estado interno, dismiss, timers, red, cookies, Supabase, RPC y autoridad;
- estilos con reflow y sin altura fija;
- un validador físico de cincuenta escenarios.

Esta tarea no recrea ni modifica esa primitiva. Cada unidad propietaria debe:

1. resolver autoritativamente el estado visible;
2. construir el copy seguro de esta política;
3. componer la primitiva o una implementación contractualmente equivalente;
4. mantenerla en el chrome o región estable aplicable;
5. coordinar preview, revalidación e invalidación sin agregar autoridad al componente.

La primitiva no se convierte en dependencia obligatoria hasta que el package, exports, compatibilidad y adopción estén habilitados por sus propietarios.

---

#### 21. Estado físico observado

`SIMULATION-NOTICE-PHYSICAL-GAP-REGISTER-001`:

| ID | Evidencia observada | Estado frente al contrato | Propietario de salida | Condición de salida |
| --- | --- | --- | --- | --- |
| `SIM-NOTICE-GAP-001` | `packages/ui-web/src/SimulatedRoleNotice.tsx` y su validador existen internamente | `BASE_SHARED_PRIMITIVE_AVAILABLE` | gobierno y release de `@vento/ui-web` | export público versionado y compatibilidad aprobada cuando corresponda |
| `SIM-NOTICE-GAP-002` | el README de `@vento/ui-web` declara `Consumidores migrados: 0` | `NOT_ADOPTED` | `SHELL-MIG-001..007` y unidades consumidoras | inventario, adopción por lote, paridad y rollback demostrados |
| `SIM-NOTICE-GAP-003` | VISO posee una vista `Simular turno` basada en filtros y muestra `Rol aplicado`, pero no materializa la política persistente completa | `LEGACY_PREVIEW_NOT_CANONICAL` | unidad VISO propietaria | fuente autoritativa, copy, lifecycle, cero efectos y aviso persistente certificados |
| `SIM-NOTICE-GAP-004` | NEXO usa cookie y helpers de role override que pueden influir permisos y contexto operativo | `AUTHORITY_MIXING_BLOCKED` | `AUTH-DB-013`, `AUTH-SRV-015`, migración NEXO y QA | retirar mezcla, separar APIs/tipos y adoptar preview no ejecutable |
| `SIM-NOTICE-GAP-005` | FOGO, ORIGO, PULSO y VISO conservan profile menus o helpers `Modo prueba`/role override | `LEGACY_MULTI_CONSUMER` | migraciones coordinadas por repositorio | clasificar, reemplazar y retirar únicamente con ausencia de uso residual |
| `SIM-NOTICE-GAP-006` | `@vento/os-context` todavía expone `source = simulation`, `is_simulation`, `can_operate` y helpers efectivos dentro de tipos compartidos | `CONTRACT_SEPARATION_PENDING` | `AUTH-DB-013`, `AUTH-SRV-015`, contratos compartidos y `AUTH-QA-019` | separar autoridad real y evaluación simulada antes de adopción productiva |

La inspección es estática. No demuestra consumidores desplegados, sesiones activas, operación segura ni cierre físico de ninguna brecha.

---

#### 22. Concurrencia, respuestas tardías y múltiples ventanas

1. Cada proyección visible conserva correlación con un único escenario vigente.
2. Un cambio de escenario invalida la presentación anterior antes de publicar la nueva.
3. Respuestas tardías no restauran rol, contexto ni resultado obsoletos.
4. Dos tabs no se consideran sincronizadas por compartir cookie o storage.
5. Una tab que confirma salida no autoriza a otra a ocultar el aviso hasta recibir invalidación autoritativa.
6. Un refresh durante `EXIT_PENDING` vuelve a resolver el estado; no supone salida ni reentrada.
7. La composición no mezcla campos provenientes de respuestas con versiones diferentes.
8. `STALE` nunca se degrada a `ACTIVE` por conectividad recuperada sin una evaluación nueva.

---

#### 23. Conectividad y modo offline

No se inicia ni prolonga una simulación offline.

Si la conectividad impide confirmar vigencia:

- el aviso pasa a `STALE` o `INVALID` según el contrato propietario;
- el contenido simulado deja de presentarse como vigente;
- no se usan cookies, cache o snapshots como autoridad;
- no se encolan acciones empresariales;
- reconectar exige nueva resolución;
- el aviso permanece hasta retirar la preview o confirmar un estado vigente.

Una visualización puramente explicativa basada en datos sintéticos puede permanecer disponible solo si se etiqueta como no vigente y no se confunde con una simulación activa.

---

#### 24. Auditoría y observabilidad

Renderizar, actualizar o desmontar el aviso no equivale a registrar un evento empresarial.

`AUTH-SIM-008` conserva el inicio, `AUTH-SIM-009` la salida y los contratos de auditoría la evidencia estructurada. La telemetría técnica del componente puede medir fallos de render o adopción sin almacenar secretos, datos sensibles ni asumir que una impresión visual demuestra una transición autoritativa.

Se prohíbe derivar:

```text
component mounted = simulation started
component unmounted = simulation ended
```

---

#### 25. Handoffs propietarios

| Propietario | Responsabilidad posterior |
| --- | --- |
| `AUTH-SIM-008` | registrar y correlacionar el inicio de simulación |
| `AUTH-SIM-009` | registrar salida, expiración y retorno confirmado al contexto real |
| `AUTH-SIM-010` | bloquear acciones críticas en todos los canales |
| `AUTH-SIM-011` | definir y materializar el modo solo lectura |
| `AUTH-SIM-012` | validar navegación simulada y persistencia del aviso |
| `AUTH-SIM-013` | validar Server Actions sin autoridad simulada |
| `AUTH-SIM-014` | probar el contrato en todas las aplicaciones aplicables |
| `AUTH-DB-013` | separar persistencia y funciones físicas de simulación |
| `AUTH-SRV-015` | exponer servicios y tipos disjuntos de autoridad real y evaluación hipotética |
| `SHELL-MIG-001..008` | inventariar, adoptar, verificar y retirar implementaciones legacy por lotes reversibles |
| `AUTH-QA-019` | certificar separación, cero efectos y regresión transversal |

Ningún handoff queda autorizado físicamente por esta aprobación documental.

---

#### 26. Contrato de materialización física posterior

Topología verificada:

```text
mode = PER_IMPLEMENTATION_UNIT
instance = AUTH-SIM-007::<implementation_unit_id>
execution_gate = POST_E5_PACKAGE
```

Cada unidad deberá demostrar como mínimo:

1. package y `implementation_unit_id` propietarios;
2. gate E5 aplicable en `PASS`;
3. fuente autoritativa de simulación separada de cookies y URL;
4. composición persistente en todas las superficies afectadas de la unidad;
5. copy y estados equivalentes a esta política;
6. preview no ejecutable y enforcement independiente;
7. navegación, refresh, tabs, stale, invalidación y salida pendiente;
8. accesibilidad y responsive del dispositivo objetivo;
9. minimización y ausencia de datos sensibles;
10. prueba negativa de que ocultar o manipular el aviso no habilita acciones;
11. paridad de consumidor y rollback por lote;
12. evidencia local, CI, staging y operativa proporcional.

Una materialización compartida ya existente puede reutilizarse, pero no reemplaza la adopción y certificación de cada unidad.

---

#### 27. Invariantes

1. Simulación activa y aviso persistente son inseparables en presentación.
2. El aviso no es autoridad.
3. Solo la autoridad real produce `ALLOW` ejecutable.
4. El resultado simulado mantiene `executable = false`.
5. El aviso no inicia ni termina simulaciones.
6. El aviso no selecciona roles, sedes, áreas, turnos o check-ins.
7. No existe dismiss, snooze ni autocierre.
8. El estado visible proviene de una proyección autoritativa.
9. Cookies, URL y storage no son fuentes de simulación.
10. Cambiar ruta no oculta la condición simulada.
11. Cambiar aplicación obliga a revalidar en destino.
12. Refresh y nuevas tabs no clonan autoridad.
13. Una respuesta tardía no restaura escenarios obsoletos.
14. `STALE` e `INVALID` no se presentan como `ACTIVE`.
15. La salida solicitada no equivale a salida confirmada.
16. El aviso se retira después de retirar la preview, no antes.
17. La ausencia del aviso bloquea la presentación simulada; no habilita operación normal.
18. El enforcement permanece seguro aunque la UI falle.
19. El rol simulado nunca sustituye al actor o rol reales.
20. El contexto hipotético nunca completa el real ni viceversa.
21. El copy no expone IDs, tokens, permisos ni diagnósticos internos.
22. La condición no depende solo de color o iconografía.
23. El aviso no roba foco ni anuncia assertivamente cada render.
24. El contenido admite zoom, reflow y viewport estrecho.
25. El dispositivo compartido no hereda simulación entre actores.
26. `aura` conserva cero pantallas sin materialización inventada.
27. `pass` conserva identidad cliente separada.
28. La primitiva compartida existente no se recrea.
29. Cero consumidores migrados no se presenta como adopción.
30. Las seis brechas físicas conservan propietario y condición de salida.
31. No se modifica 04A.
32. No se inicia `AUTH-SIM-008`.

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: aviso persistente, separación entre simulación y autoridad, preview no ejecutable, estados de vigencia, accesibilidad, cero efectos, multicanalidad, auditoría y reconciliación legacy ya están protegidos por requisitos canónicos vigentes. Esta tarea especializa su política visible sin cambiar regla protegida, prioridad, modalidad, propietario, paquete, estado, evidencia o relación del registro.

---

#### 29. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura que protege:

- aviso persistente, no mezcla y registro del lifecycle de simulación;
- separación de los cuatro planos y exclusividad del `ALLOW` real;
- resultado hipotético tipado y no ejecutable;
- preview y controles sin handlers reales;
- sesiones, cookies, tokens, storage y cache separados;
- navegación visible, accesible y diferenciada;
- actor y contexto visibles en tablet o kiosco compartido;
- indicador persistente, copy no ejecutable, minimización y cero efectos;
- adopción coordinada y retiro seguro de patrones legacy.

Trazabilidad vigente reutilizada: `TREQ-AUTH-012`, `TREQ-AUTH-119..127`, `TREQ-AUTH-165`, `TREQ-AUTH-279..288`, `TREQ-UX-080`, `TREQ-UX-216`, `TREQ-UX-308`, `TREQ-SHELL-002`, `TREQ-SHELL-029`, `TREQ-SHELL-031`, `TREQ-SHELL-032` y `TREQ-SHELL-036..039`.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `PASS` | el plan modular fue regenerado después de insertar el contrato y su proyección quedó sincronizada |
| LOCAL | `PASS` | formateo canónico, calidad de tarea, entrega, topología, paquete compartido, plan, TREQ y diff fueron validados en la rama documental |
| REMOTA | `NOT_EXECUTED` | todavía no existe cierre, PR ni validación remota de `AUTH-SIM-007` |
| OPERATIVA | `NOT_EXECUTED` | no se inició una simulación ni se probaron navegación, refresh, expiración, salida o consumidores desplegados |
| FÍSICA | `NOT_EXECUTED` | no se modificaron ni adoptaron componentes, exports, aplicaciones, Supabase, sesiones, cookies, RPC, RLS o datos |

La lectura de código y contratos constituye auditoría estática local, no evidencia de comportamiento desplegado.

---

#### 31. Criterios de aceptación

- [x] Se definió una condición autoritativa de renderizado.
- [x] Se definieron cinco estados visibles cerrados.
- [x] Se fijó copy empresarial para cada estado.
- [x] Se definió el contenido mínimo del aviso activo.
- [x] Se prohibieron dismiss, snooze y autocierre.
- [x] Se preservó el aviso durante cambio, stale, invalidez y salida pendiente.
- [x] Se definió fail-closed ante pérdida del indicador.
- [x] Se cubrieron navegación, refresh, tabs, deep links y handoff cross-app.
- [x] Se cubrieron escritorio, tablet, móvil y estación compartida.
- [x] Se definieron accesibilidad, foco, anuncio, zoom y reflow.
- [x] Se definió minimización de identidad, contexto y diagnóstico.
- [x] Las diez aplicaciones canónicas tienen decisión explícita.
- [x] `aura` conserva cero pantallas y `pass` conserva identidad cliente separada.
- [x] Se conservó separación entre dispositivo, actor, rol real y rol simulado.
- [x] Se separó presentación de enforcement.
- [x] Se reconoció la primitiva `SimulatedRoleNotice` ya materializada internamente.
- [x] No se declaró export público ni consumidor migrado inexistentes.
- [x] Se registraron seis brechas físicas con propietario y condición de salida.
- [x] Se fijó `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE`.
- [x] Se conservaron owners de inicio, salida, bloqueo, solo lectura y pruebas.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autoriza ni ejecuta materialización física.
- [x] No se inicia `AUTH-SIM-008`.

---

#### 32. Límites

`AUTH-SIM-007` no:

- crea o modifica `SimulatedRoleNotice`;
- publica exports o versiones de `@vento/ui-web`;
- migra consumidores;
- modifica `@vento/os-context`;
- corrige cookies o helpers de role override;
- inicia, persiste, expira, revoca o termina una simulación;
- registra eventos de inicio o salida;
- decide quién puede simular;
- selecciona roles, sedes, áreas, turnos o check-ins;
- calcula permisos ni resultados hipotéticos;
- bloquea físicamente acciones críticas;
- implementa el modo solo lectura;
- cambia rutas, layouts o aplicaciones;
- crea migraciones;
- modifica Supabase, Auth, RLS, RPC, grants, Edge Functions, datos o configuración;
- despliega ni certifica una unidad física;
- crea o modifica requisitos de prueba;
- modifica el registro 04A;
- inicia la tarea siguiente.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-SIM-006 — No mezclar permisos reales y simulados`

**TAREA ACTUAL APROBADA**
`AUTH-SIM-007 — Mostrar aviso persistente`

**SIGUIENTE TAREA RESERVADA**
`AUTH-SIM-008 — Registrar inicio de simulación`

### ✅ AUTH-SIM-008 — Registrar inicio de simulación

**Estado:** APROBADA
**Tarea anterior:** AUTH-SIM-007 — Mostrar aviso persistente
**Tarea siguiente:** AUTH-SIM-009 — Registrar salida de simulación
**Tipo de tarea:** documental; contrato canónico de inicio autoritativo, persistencia y auditoría correlacionable de simulación, con materialización posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE Q — Simulación
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/Q_SIMULACION/02_VISIBILIDAD_AUDITORIA_Y_RESTRICCIONES.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, Supabase, migraciones, RLS, RPC, contratos compartidos, consumidores, sesiones, auditoría persistida, datos, permisos, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cuándo una simulación se considera realmente iniciada, qué evidencia autoritativa debe existir para demostrarlo y cómo correlacionar el intento, la autorización real del simulador, el escenario hipotético, la sesión de simulación y su activación sin convertir ningún dato simulado en autoridad ejecutable.

La regla raíz queda:

```text
SOLICITUD DE SIMULACION
+
ACTOR REAL ELEGIBLE
+
AUTORIDAD REAL VALIDADA
+
ESCENARIO HIPOTETICO COMPLETO Y VERSIONADO
+
ROOT DE SIMULACION PERSISTIDO
+
REVISION INICIAL PERSISTIDA
+
ACTIVACION AUTORITATIVA CONFIRMADA
+
CORRELACION Y EVIDENCIA INMUTABLES
=
SIMULACION INICIADA
```

Y siempre:

```text
SOLICITUD RECIBIDA
!=
SIMULACION INICIADA
```

```text
SIMULATION_CREATED
!=
SIMULATION_ACTIVATED
```

```text
SIMULACION ACTIVA
!=
AUTORIDAD REAL
```

#### 2. Pregunta contractual propietaria

Esta tarea responde exclusivamente:

```text
¿CUANDO COMENZO AUTORITATIVAMENTE UNA SIMULACION?
```

```text
¿QUIEN LA SOLICITO DESDE SU CONTEXTO REAL?
```

```text
¿QUE ESCENARIO EXACTO QUEDO ACTIVADO?
```

```text
¿BAJO QUE VERSIONES, FINGERPRINTS Y CORRELACION QUEDO REGISTRADO EL INICIO?
```

No responde todavía cómo termina, expira o vuelve al contexto real; esa responsabilidad permanece en `AUTH-SIM-009`.

#### 3. Handoff recibido de AUTH-SIM-007

`AUTH-SIM-007` deja definidas cinco condiciones visibles:

```text
RESOLVING
ACTIVE
STALE
INVALID
EXIT_PENDING
```

Y fija dos reglas obligatorias para esta tarea:

```text
component mounted != simulation started
component unmounted != simulation ended
```

El aviso puede reflejar un estado resuelto, pero nunca crea el lifecycle empresarial.

`AUTH-SIM-008` debe aportar la evidencia que permite pasar de una transición conocida a una simulación autoritativamente `ACTIVE`.

#### 4. Contratos consumidos

La tarea consume sin redefinir:

- `AUTH-SIM-001`, que decide quién puede solicitar una simulación desde autoridad real;
- `AUTH-SIM-002`, que tipa roles y sujetos simulables;
- `AUTH-SIM-003`, que define sede simulada;
- `AUTH-SIM-004`, que define área simulada;
- `AUTH-SIM-005`, que define turno y check-in simulados;
- `AUTH-SIM-006`, que separa autoridad real, evaluación simulada, preview y auditoría;
- `AUTH-SIM-007`, que hace visible el lifecycle sin originarlo;
- `AUTH-SRV-014`, que conserva principal técnico y actor efectivo reales;
- `AUTH-SRV-015`, que conserva rol, sujeto, contexto y resultado simulados como plano independiente;
- `AUTH-DB-013`, que aporta la persistencia append-only de simulación;
- los contratos vigentes de autorización, contexto, auditoría, dispositivo compartido, sesiones y versiones.

#### 5. Topología y materialización posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
instance = AUTH-SIM-008::<implementation_unit_id>
execution_gate = POST_E5_PACKAGE
```

El marcador actual define una sola vez el contrato reutilizable.

Cada unidad física futura deberá materializar el inicio en su `implementation_unit_id` sin reabrir este marcador y sin inferir una unidad desde una aplicación, repositorio, pantalla o dispositivo.

#### 6. Inicio no equivale a apertura de superficie

No constituyen inicio de simulación:

- abrir la pantalla del simulador;
- montar `SimulatedRoleNotice`;
- seleccionar un rol;
- seleccionar una sede;
- seleccionar un área;
- seleccionar un turno;
- modificar filtros;
- mostrar una preview local;
- crear estado React;
- escribir una cookie;
- escribir `localStorage` o `sessionStorage`;
- recibir un `simulation_id` legacy sin estado autoritativo;
- construir un objeto hipotético en memoria.

El inicio existe únicamente cuando la transición autoritativa completa ha quedado confirmada.

#### 7. Tres momentos distintos

El lifecycle de inicio distingue obligatoriamente:

| Momento | Semántica | Estado de simulación |
| --- | --- | --- |
| `REQUESTED` conceptual | existe una intención de solicitar simulación | ninguna sesión activa por ese hecho |
| `CREATED` persistido | existe root y revisión inicial auditables | `DRAFT` |
| `ACTIVATED` persistido | la activación autoritativa fue registrada sobre el draft válido | `ACTIVE` |

Los nombres `REQUESTED`, `CREATED` y `ACTIVATED` describen la semántica contractual; no obligan a crear una columna física con esos nombres.

#### 8. Commit point del inicio

El commit point canónico de `AUTH-SIM-008` es:

```text
SIMULATION_ACTIVATED
```

Solo después de que la persistencia autoritativa derive:

```text
status = ACTIVE
```

puede declararse:

```text
SIMULATION_STARTED = TRUE
```

La existencia exclusiva de `SIMULATION_CREATED` deja el lifecycle en `DRAFT` y no satisface esta tarea.

#### 9. Estado DRAFT

Un draft representa una simulación creada pero todavía no activada.

Puede contener:

- `simulation_id`;
- revisión inicial;
- escenario normalizado;
- actor real;
- sesión real;
- decisión que autorizó solicitar la simulación;
- timestamps;
- versiones;
- fingerprints;
- correlación.

No puede presentarse como una simulación activa ni habilitar preview confirmado.

#### 10. Transición DRAFT a ACTIVE

La única transición de inicio conforme es:

```text
DRAFT
->
SIMULATION_ACTIVATED
->
ACTIVE
```

La activación exige que el draft siga siendo elegible en el momento de la transición.

Un draft ya completado, revocado, invalidado o expirado no puede activarse.

#### 11. Actor real obligatorio

Toda simulación interactiva conserva un actor humano real.

El actor real debe provenir de una sesión personal y una resolución autoritativa anterior al escenario hipotético.

No puede derivarse de:

- sujeto simulado;
- rol simulado;
- principal técnico;
- dispositivo compartido;
- `navigation_role`;
- empleado objetivo enviado por cliente;
- último simulador;
- usuario mostrado en la preview.

#### 12. Sesión real obligatoria

El inicio conserva referencia de la sesión real que permitió solicitar la simulación.

La sesión de simulación nunca sustituye:

```text
real_session_id
```

Una sesión real expirada, revocada, cambiada o no reconstruible impide confirmar el inicio.

#### 13. Permiso real del simulador

Antes de crear o activar el escenario, la autoridad real debe demostrar al menos:

```text
viso.access
+
viso.authorization.context_simulations.view
```

junto con el resto de contratos de alcance, justificación, reautenticación y denegaciones aplicables.

El rol simulado nunca aporta estos permisos.

#### 14. Decisión de autorización del solicitante

El inicio debe enlazarse con una decisión real de autorización del solicitante.

La decisión debe conservar:

- actor real;
- principal real;
- permiso exacto;
- aplicación;
- contexto real;
- resultado real;
- razones;
- correlación;
- versión.

Solo una decisión real autorizada puede sostener creación y activación.

#### 15. Alcance real como techo

El escenario solicitado debe permanecer dentro del alcance real que el simulador puede inspeccionar.

Debe cumplirse:

```text
SIMULATED_SCOPE
subset_of
REAL_INSPECTION_SCOPE
```

La simulación no amplía lectura de sujetos, sedes, áreas, permisos, recursos ni información protegida.

#### 16. Justificación

Cuando el contrato exija justificación, el inicio conserva una referencia normalizada y auditable.

No se utiliza texto libre como sustituto de autorización.

No se incluyen secretos, credenciales ni datos personales innecesarios.

#### 17. Reautenticación fuerte

Cuando el objetivo o sensibilidad lo exija, la reautenticación fuerte se verifica sobre el actor real antes de activar.

La evidencia fuerte:

- pertenece al mismo actor;
- es vigente;
- corresponde al propósito aplicable;
- no se transfiere al sujeto simulado;
- no convierte un `WOULD_ALLOW` en `ALLOW`;
- no se reutiliza como secreto de una acción real posterior.

#### 18. Identidad de solicitud

Toda intención lógica de inicio conserva una identidad de solicitud:

```text
simulation_request_id
```

La identidad sirve para correlacionar el intento de inicio.

No funciona como:

- permiso;
- token;
- sesión;
- bearer credential;
- idempotency key de una mutación empresarial real.

La implementación física puede mapear esta identidad a campos o referencias distintos si mantiene su unicidad y trazabilidad.

#### 19. Identidad de simulación

Después de crear el root existe:

```text
simulation_id
```

`simulation_id` identifica el lifecycle de simulación.

No identifica:

- actor;
- sesión real;
- rol;
- autorización;
- recurso real;
- permiso ejecutable.

#### 20. Revisión inicial

Todo root válido conserva una primera revisión del escenario.

La revisión inicial debe poder demostrar exactamente qué se pretendía simular en el momento de creación.

No se reconstruye después desde los filtros actuales del frontend.

#### 21. Escenario tipado

La revisión inicial conserva, cuando apliquen:

- `scenario_kind`;
- sujeto simulado;
- rol simulado tipado;
- sede simulada;
- área simulada;
- turno simulado;
- check-in simulado;
- recurso simulado;
- instante hipotético resuelto;
- snapshot de política;
- versiones y fingerprints.

Una dimensión obligatoria ausente no se completa desde el contexto real.

#### 22. Rol simulado

Cuando exista rol simulado se conserva al menos:

```text
role_kind
role_code
role_catalog_version
role_matrix_version
```

`BASE` y `OPERATIONAL` permanecen namespaces distintos.

Un `role_code` aislado no basta.

#### 23. Sede simulada

La sede hipotética debe ser explícita y compatible con el escenario.

No se toma por fallback de:

- sede real;
- sede primaria;
- sede del dispositivo;
- filtro visual;
- primera sede disponible.

#### 24. Área simulada

El área hipotética conserva su identidad y relación con la sede simulada.

No se usa:

- `GENERAL` como wildcard;
- primera área;
- área real del actor;
- área del dispositivo;
- selección local sin validación.

#### 25. Turno y check-in simulados

Cuando el escenario requiera temporalidad laboral se conserva el modo exacto de turno y el estado hipotético de check-in.

Ni turno ni check-in simulados producen presencia real.

Ni turno ni check-in reales completan silenciosamente un escenario hipotético incompleto.

#### 26. Recurso simulado

Cuando la simulación evalúe una acción o recurso concreto, el inicio conserva la referencia y modo de recurso permitidos por el contrato.

La existencia de la simulación no autoriza a leer el recurso real fuera del alcance real del simulador.

#### 27. Tiempo de creación

El root conserva un instante de creación autoritativo.

Ese instante no se deriva del reloj del navegador.

Se utiliza para reconstruir la historia de creación, no para probar por sí solo la activación.

#### 28. Tiempo de expiración

Toda simulación conserva un `expires_at` válido posterior a la creación.

La expiración:

- no se infiere desde un timer visual;
- no se extiende por actividad de UI;
- no se extiende por refresh;
- no se extiende por reintento;
- impide activar un draft que ya expiró.

El registro y semántica terminal de expiración permanecen bajo `AUTH-SIM-009`.

#### 29. Correlación

El inicio conserva un `correlation_id` capaz de relacionar:

- solicitud;
- decisión real del solicitante;
- root;
- revisión inicial;
- evento de creación;
- evento de activación;
- intentos fallidos cuando corresponda;
- evaluaciones posteriores.

La correlación no concede autoridad.

#### 30. Causación

Cuando exista una causa anterior identificable se conserva `causation_id` o referencia semánticamente equivalente.

La causación permite reconstruir por qué nació la transición sin convertir el identificador en permiso o token.

#### 31. Fingerprint del contexto real

El contexto real utilizado para autorizar al simulador conserva fingerprint estable.

Si la decisión real y el contexto no coinciden, el inicio falla cerrado.

Un fingerprint no sustituye el contenido autoritativo ni concede acceso.

#### 32. Fingerprint del escenario

La revisión inicial conserva un fingerprint del escenario hipotético.

Dos escenarios materialmente distintos no deben resultar indistinguibles por compartir etiqueta visible.

El fingerprint permite detectar replay o reutilización incompatible.

#### 33. Versiones fuente

La evidencia de inicio conserva las versiones necesarias para reproducir la decisión y el escenario.

No se aceptan como identidad suficiente valores ambiguos como:

```text
latest
current
unknown
```

cuando la fuente requiere una versión exacta.

#### 34. Fingerprints fuente

Las fuentes materiales de la simulación conservan fingerprints cuando el contrato físico los proporcione.

El inicio no se certifica si las identidades de fuente necesarias son ambiguas o no reproducibles.

#### 35. Idempotencia de creación

Reintentar la misma intención lógica con la misma clave de idempotencia y el mismo request fingerprint debe converger en el mismo root.

Resultado esperado:

```text
MISMO ACTOR REAL
+
MISMA SESION REAL
+
MISMA CLAVE DE IDEMPOTENCIA
+
MISMO REQUEST FINGERPRINT
=
MISMO SIMULATION_ID
```

No se crea un segundo root.

#### 36. Conflicto de idempotencia

Si la misma clave de creación se reutiliza con una solicitud materialmente distinta:

```text
IDEMPOTENCY KEY REUSED
+
REQUEST FINGERPRINT DIFFERENT
=
CONFLICT
```

No se sobrescribe el root anterior y no se activa silenciosamente el escenario nuevo.

#### 37. Idempotencia de activación

La transición de activación conserva una identidad de operación propia.

Repetir la misma operación con el mismo fingerprint debe devolver el mismo resultado lógico.

Reutilizar la misma identidad de operación con otro contenido produce conflicto.

#### 38. Activación única

Una simulación solo puede pasar una vez de `DRAFT` a `ACTIVE` dentro del mismo lifecycle.

No se admite:

```text
ACTIVE -> SIMULATION_ACTIVATED
```

ni reactivación posterior a un estado terminal.

#### 39. Compatibilidad actor-root en activación

La decisión utilizada para confirmar la activación debe pertenecer al mismo lifecycle real que creó el draft.

Deben ser compatibles:

- actor real;
- sesión real;
- autorización del simulador;
- contexto real;
- correlación;
- revisión activa.

Una decisión válida de otra persona o sesión no puede activar un draft ajeno.

#### 40. Frescura antes de activar

Entre creación y activación pueden cambiar fuentes materiales.

Antes del commit point deben mantenerse válidos o revalidarse según contrato:

- actor real;
- sesión;
- permiso de simulación;
- alcance;
- reautenticación;
- política;
- versiones;
- objetivo;
- contexto real.

Si un cambio afecta la decisión, el draft no se activa con evidencia stale.

#### 41. Simulación anidada

Una simulación activa no puede autorizar una segunda simulación.

El inicio se evalúa desde contexto real no simulado.

No se admite:

```text
SIMULATION A
-> simulated authority
-> START SIMULATION B
```

La existencia de un preview activo debe bloquear o cerrar explícitamente la intención según los contratos propietarios, sin reemplazo silencioso.

#### 42. Concurrencia de inicios

Dos intentos concurrentes para la misma sesión real no pueden producir dos simulaciones activas incompatibles sin una decisión explícita del modelo.

La implementación deberá converger mediante idempotencia, serialización o conflicto seguro.

Nunca se selecciona después la simulación más nueva para ocultar la carrera.

#### 43. Solicitud denegada

Si el actor real no puede solicitar la simulación:

```text
REAL AUTHORITY = DENY
->
NO ACTIVE SIMULATION
```

Puede conservarse un intento de auditoría mínimo cuando el contrato de persistencia lo permita.

No se fabrica una revisión completa de un escenario al que la persona no estaba autorizada a acceder.

#### 44. Escenario inválido

Si el actor real es elegible pero el escenario solicitado es inválido, ambiguo o incompleto:

```text
REQUESTER ELIGIBLE
+
SCENARIO INVALID
=
NO ACTIVE SIMULATION
```

La autoridad para usar el simulador y la validez del escenario son decisiones distintas.

#### 45. Fallo técnico antes de creación

Si una falla impide producir un root coherente:

- no se emite `SIMULATION_CREATED` falso;
- no se emite `SIMULATION_ACTIVATED`;
- no se presenta `ACTIVE`;
- la telemetría técnica permanece separada de la auditoría empresarial;
- el reintento posterior conserva una identidad lógica controlada.

#### 46. Fallo después de creación y antes de activación

Si el root y la revisión quedaron persistidos pero la activación no se confirmó:

```text
ROOT EXISTS
+
SIMULATION_CREATED
+
NO SIMULATION_ACTIVATED
=
DRAFT, NO ACTIVE
```

La UI no puede interpretar el root como éxito de inicio.

La resolución posterior debe consultar estado autoritativo antes de reintentar.

#### 47. Respuesta perdida después de activar

Si el servidor activó y la respuesta al cliente se perdió:

- no se crea otra simulación por reflejo;
- el cliente vuelve a resolver el estado por identidad y correlación;
- una operación idempotente debe converger;
- `ACTIVE` se presenta solo después de confirmación autoritativa;
- no se convierte el timeout en certeza de fallo empresarial.

#### 48. Resultado del comando de inicio

La respuesta segura del servicio debe permitir distinguir al menos:

```text
ACTIVE
DRAFT
DENIED
INVALID
CONFLICT
TECHNICAL_FAILURE
```

Los nombres físicos pueden variar si conservan estas semánticas y no confunden un error técnico con una decisión de autorización.

#### 49. Receipt de inicio confirmado

Un receipt de inicio confirmado debe permitir correlacionar, sin exponer secretos:

- identidad de simulación;
- revisión activa;
- estado `ACTIVE`;
- actor real o referencia segura según consumidor;
- timestamps relevantes;
- expiración;
- correlation;
- fingerprints o referencias necesarias;
- `executable = false` para el plano simulado.

El cliente no necesita recibir la evidencia interna completa.

#### 50. Evento `SIMULATION_CREATED`

`SIMULATION_CREATED` demuestra que existe un root append-only y una revisión inicial coherentes.

No prueba activación.

No debe disparar por sí solo:

- acciones reales;
- permisos;
- RLS ampliada;
- cambio de sesión autenticada;
- cambio de actor efectivo;
- presentación `ACTIVE` sin confirmación.

#### 51. Evento `SIMULATION_ACTIVATED`

`SIMULATION_ACTIVATED` representa la transición autoritativa de inicio.

Debe conservar como mínimo:

- `simulation_id`;
- revisión aplicable;
- identidad de operación;
- decisión real autorizada;
- actor real;
- principal técnico;
- razón estructurada;
- correlación;
- causación cuando exista;
- timestamp;
- fingerprint del evento.

#### 52. Vocabulary cerrado

El lifecycle persistido conserva el vocabulario canónico vigente de eventos.

`AUTH-SIM-008` usa únicamente los eventos de inicio ya existentes:

```text
SIMULATION_CREATED
SIMULATION_ACTIVATED
```

No introduce alias como:

```text
SIMULATION_STARTED
STARTED
OPENED
PREVIEW_OPENED
ROLE_SWITCHED
```

como nuevos eventos persistidos canónicos.

#### 53. Intentos sin éxito

La persistencia actual admite intentos no exitosos separados del event stream exitoso.

Para inicio son relevantes las operaciones:

```text
CREATE_SIMULATION
ACTIVATE_SIMULATION
```

con resultados no exitosos tipados como:

```text
DENIED
INVALID
CONFLICT
TECHNICAL_FAILURE
NO_CHANGE
ROLLED_BACK
```

Un intento fallido no se presenta como evento de lifecycle exitoso.

#### 54. Auditoría append-only

La evidencia de inicio es histórica e inmutable.

No se corrige mediante `UPDATE` o `DELETE` de un evento anterior.

Una corrección autorizada usa el mecanismo de corrección propietario y conserva la evidencia original.

#### 55. Enlaces de evidencia

La persistencia puede correlacionar explícitamente, entre otros:

- decisión de autorización del solicitante;
- contexto real de acceso;
- sesión real;
- device context cuando aplique;
- evidencia adicional.

Un link no concede autoridad ni reemplaza la fuente enlazada.

#### 56. Dispositivo compartido

Una simulación interactiva no puede iniciarse únicamente porque exista un dispositivo compartido autenticado.

Debe conservarse:

```text
technical principal
!=
real human simulator
```

Si una superficie compartida participa, debe resolver al humano real conforme al contrato y mantener separado el device.

#### 57. Cambio de actor en dispositivo compartido

Si cambia el actor humano antes de activar:

- el draft anterior no se activa como el actor nuevo;
- la elegibilidad se reevalúa;
- la sesión real y actor deben corresponder;
- estado sensible del solicitante anterior se limpia;
- no se transfiere reautenticación.

#### 58. Preview RESOLVING

`AUTH-SIM-007` puede mostrar `RESOLVING` únicamente cuando la capa propietaria confirma que existe una transición de simulación conocida.

`RESOLVING` no equivale a `DRAFT` en todos los detalles físicos y no concede autoridad.

La UI no inventa ese estado desde un click local.

#### 59. Preview ACTIVE

La transición visible a `ACTIVE` requiere una resolución autoritativa que confirme:

```text
simulation status = ACTIVE
```

El aviso entonces refleja el escenario activo.

No se adelanta visualmente por optimismo del cliente.

#### 60. Respuesta tardía de un inicio anterior

Una respuesta de un intento anterior no puede reemplazar un escenario más reciente que ya haya sido resuelto autoritativamente.

La UI compara identidades, revisión y correlación antes de publicar el resultado.

#### 61. Varias tabs

Varias ventanas no crean sesiones independientes por compartir storage.

Cada tab debe revalidar el lifecycle autoritativo.

Una tab no puede activar otra simulación por montar componentes ni ocultar el aviso de otra por estado local.

#### 62. Refresh durante inicio

Un refresh durante `RESOLVING` no se interpreta como cancelación ni éxito.

Después del refresh se vuelve a resolver:

- sesión real;
- simulación asociada;
- estado derivado;
- revisión vigente;
- expiración.

#### 63. Offline

No se inicia una simulación offline.

Una solicitud capturada sin confirmación no se encola como autoridad para ejecutarse automáticamente al reconectar.

La reconexión exige revalidar el contexto real y la intención.

#### 64. Cache

Ni una respuesta cacheada ni un snapshot local pueden convertir un `DRAFT`, `STALE` o estado desconocido en `ACTIVE`.

La cache de preview permanece separada de la fuente de lifecycle.

#### 65. Cookies y storage

Cookies, `localStorage`, `sessionStorage` e IndexedDB pueden ser mecanismos técnicos no autoritativos cuando un owner los necesite, pero no prueban inicio.

La fuente de verdad del lifecycle debe ser server-side y correlacionable.

#### 66. No modificación de autoridad real

Al activarse una simulación no se modifica:

- sesión autenticada real;
- actor real;
- rol base real;
- rol operativo real;
- turno real;
- check-in real;
- grants reales;
- denies reales;
- claims reales;
- RLS real;
- cobertura real.

#### 67. Resultado simulado no ejecutable

El inicio prepara una sesión para evaluaciones hipotéticas.

No produce por sí solo:

```text
ALLOW
```

Toda evaluación posterior conserva:

```text
WOULD_ALLOW
WOULD_DENY
INDETERMINATE
```

con:

```text
executable = false
```

#### 68. Inicio no preautoriza acciones

Una simulación `ACTIVE` no es una preautorización de la acción que se está examinando.

Una acción real posterior exige salir del plano simulado y producir una decisión real nueva conforme a los contratos propietarios.

#### 69. Start y evaluación son hechos distintos

Se conserva:

```text
SIMULATION_ACTIVATED
!=
SIMULATION_EVALUATED
```

El inicio puede existir antes de que se evalúe una acción concreta.

Cada evaluación conserva su propia identidad, permiso, recurso, resultado y fingerprint.

#### 70. Start y salida son hechos distintos

Se conserva:

```text
SIMULATION_ACTIVATED
!=
SIMULATION_COMPLETED
```

`AUTH-SIM-008` no registra:

- salida;
- completion;
- expiración terminal;
- revocación terminal;
- retorno confirmado al contexto real.

Eso pertenece a `AUTH-SIM-009`.

#### 71. Start y bloqueo crítico son hechos distintos

Registrar una simulación activa no demuestra que todas las acciones críticas estén bloqueadas.

`AUTH-SIM-010` mantiene la responsabilidad de enforcement multicanal.

La ausencia de esa materialización impide usar el registro de inicio como garantía de seguridad operacional.

#### 72. Start y solo lectura son hechos distintos

Una sesión `ACTIVE` no implica por sí sola que la interfaz completa sea read-only.

`AUTH-SIM-011` mantiene la política y materialización de solo lectura.

#### 73. Start y navegación simulada son hechos distintos

`AUTH-SIM-012` probará navegación, persistencia visual y transición entre superficies.

El registro de inicio no certifica esas superficies por sí solo.

#### 74. Start y Server Actions son hechos distintos

`AUTH-SIM-013` comprobará que Server Actions no consuman autoridad simulada.

`AUTH-SIM-008` registra el lifecycle; no reemplaza esa certificación de ejecución.

#### 75. Start y prueba integral son hechos distintos

`AUTH-SIM-014` probará el contrato en todas las aplicaciones aplicables.

Un inicio correcto en una unidad no certifica todas las aplicaciones.

#### 76. Estado físico actual de persistencia

La infraestructura actual contiene una fundación append-only para simulación con:

- root de simulación;
- revisiones;
- evaluaciones;
- eventos;
- intentos;
- enlaces;
- correcciones;
- fingerprints;
- idempotencia;
- lifecycle derivado.

Esta evidencia demuestra una base física disponible, no una adopción completa por los consumidores.

#### 77. Estado derivado vigente

La persistencia vigente deriva el lifecycle con precedencia terminal y reconoce:

```text
DRAFT
ACTIVE
EXPIRED
COMPLETED
REVOKED
INVALID
```

Para esta tarea son propietarios de inicio:

```text
DRAFT
ACTIVE
```

Los estados terminales se consumen como límites, pero su transición funcional pertenece a `AUTH-SIM-009` y otros owners aplicables.

#### 78. Base física positiva: creación append-only

La operación privada de creación vigente:

- valida el envelope;
- rechaza secretos y campos no permitidos;
- exige una decisión real autorizada para `viso.authorization.context_simulations.view`;
- verifica contexto real y fingerprint;
- exige correlación;
- valida escenario y fuentes;
- aplica idempotencia;
- crea root y revisión inicial;
- emite `SIMULATION_CREATED`;
- devuelve `status = DRAFT`.

Es una base física coherente con la separación entre creación e inicio confirmado.

#### 79. Base física positiva: activación explícita

La operación privada de eventos vigente acepta `SIMULATION_ACTIVATED` únicamente desde `DRAFT`.

Después del evento, el estado derivado pasa a `ACTIVE`.

La activación conserva identidad de operación e idempotencia propia.

#### 80. Base física positiva: intentos fallidos separados

La persistencia vigente conserva una tabla específica de intentos y vocabulario de resultados no exitosos.

Esto permite registrar fallos de creación o activación sin inventar eventos exitosos.

La futura capa de servicio debe usar esta distinción de forma consistente.

#### 81. Bloqueo estático: writer público legacy deshabilitado

La función pública legacy:

```text
start_context_simulation_v1
```

está deliberadamente deshabilitada y falla con:

```text
AUTH_DB_013_LEGACY_SIMULATION_START_DISABLED
```

Por tanto, la existencia del nombre legacy no demuestra un camino de inicio operativo vigente.

#### 82. Bloqueo estático: cliente compartido todavía invoca el writer legacy

`@vento/os-context` conserva actualmente un helper `startContextSimulation` que invoca `start_context_simulation_v1`.

Ese helper no constituye el servicio canónico de inicio bajo el estado físico vigente.

La salida pertenece a la adopción contractual y al servicio autoritativo de simulación; esta tarea no modifica el paquete.

#### 83. Bloqueo estático: input legacy insuficiente

El `ContextSimulationInput` actual de `@vento/os-context` contiene principalmente:

- sede;
- área;
- rol operativo;
- rol administrativo;
- duración;
- metadata.

No representa por sí solo el contrato completo de:

- actor real;
- decisión real;
- sujeto tipado;
- rol tipado;
- turno y check-in simulados;
- recurso;
- versiones;
- fingerprints;
- idempotencia;
- correlación.

No puede declararse contrato final de inicio.

#### 84. Bloqueo estático: simulación mezclada en EffectiveContext

`@vento/os-context` todavía conserva `source = simulation`, `simulation_id`, `is_simulation` y `can_operate` dentro de un `EffectiveContext` compartido con autoridad real.

Eso permanece sujeto al contrato de separación de `AUTH-SIM-006` y `AUTH-SRV-015`.

`AUTH-SIM-008` no adopta esa forma como fuente de autoridad.

#### 85. Bloqueo estático: servicio autoritativo no adoptado por consumidores

La fundación privada de auditoría no es invocable directamente por clientes ordinarios y el writer legacy público está neutralizado.

La inspección vigente no demuestra un flujo consumidor completo que:

```text
REQUEST
->
AUTHORIZE REAL ACTOR
->
CREATE DRAFT
->
ACTIVATE
->
RETURN ACTIVE RECEIPT
```

La materialización pertenece a los owners de servicio, package y consumidor.

#### 86. No reapertura de AUTH-DB-013

Esta tarea no modifica la migración ya materializada.

Los campos y nombres SQL actuales son evidencia de una implementación existente; no obligan a que todas las capas consumidoras expongan la misma forma.

Cualquier corrección física futura conserva su lifecycle y owner correspondiente.

#### 87. No reapertura de AUTH-SRV-015

`AUTH-SRV-015` ya fija el envelope de auditoría simulada y la separación de planos.

`AUTH-SIM-008` especializa el momento de inicio y su correlación.

No redefine:

- tipos de actor;
- catálogo de rol;
- resultado simulado;
- política de permisos;
- servicio físico.

#### 88. Evidencia mínima de una futura unidad

Cada materialización `AUTH-SIM-008::<implementation_unit_id>` deberá demostrar, como mínimo:

1. package propietario y gate E5 aplicable;
2. servicio de inicio real identificado;
3. actor real y sesión real resueltos;
4. permiso de simulación evaluado desde autoridad real;
5. alcance y justificación válidos;
6. reautenticación cuando corresponda;
7. escenario completo y tipado;
8. versiones y fingerprints reproducibles;
9. creación idempotente del root;
10. revisión inicial exacta;
11. `SIMULATION_CREATED` con estado `DRAFT`;
12. activación explícita;
13. `SIMULATION_ACTIVATED` con estado `ACTIVE`;
14. idempotencia de activación;
15. no activación de draft expirado o terminal;
16. correlación entre solicitud, decisión, root, revisión y activación;
17. intento denegado sin active simulation;
18. escenario inválido sin active simulation;
19. conflicto de idempotencia sin overwrite;
20. respuesta perdida sin duplicación;
21. refresh sin suposición;
22. tabs sin autoridad local;
23. offline sin start automático;
24. aviso `ACTIVE` únicamente después de confirmación;
25. resultado simulado siempre no ejecutable;
26. ausencia de efectos empresariales reales;
27. minimización de datos;
28. rollback sin borrar evidencia histórica.

#### 89. Matriz mínima de casos de inicio

| Caso | Creación | Activación | Estado esperado |
| --- | --- | --- | --- |
| actor real elegible + escenario válido | sí | sí | `ACTIVE` |
| permiso real ausente | no activa | no | sin simulación activa |
| actor real no resoluble | no activa | no | sin simulación activa |
| sesión real inválida | no activa | no | sin simulación activa |
| escenario incompleto | no activa | no | sin simulación activa |
| draft válido sin evento de activación | sí | no | `DRAFT` |
| draft expirado antes de activar | sí | no | `EXPIRED` |
| activación repetida idempotente | ya existe | converge | `ACTIVE` sin duplicación |
| misma idempotency key con payload distinto | conflicto | no | sin nueva simulación activa |
| respuesta de activación perdida | ya existe | resolver | `ACTIVE` solo si servidor lo confirma |
| solicitud offline | no | no | sin simulación activa |
| solicitud desde contexto ya simulado | bloqueada | no | sin simulación anidada |

#### 90. Cero efectos reales durante inicio

Crear y activar una simulación no puede ejecutar la acción hipotética ni modificar el dominio simulado.

Debe mantenerse:

```text
START SIMULATION
->
AUDIT / PREVIEW STATE ONLY
->
ZERO BUSINESS MUTATION
```

Cualquier efecto real causado por la autoridad simulada convierte la materialización en FAIL.

#### 91. Datos prohibidos en evidencia de inicio

No se almacenan por defecto:

- JWT completos;
- access tokens;
- refresh tokens;
- cookies;
- contraseñas;
- OTP;
- PIN;
- service-role keys;
- API keys;
- credenciales privadas;
- headers completos;
- payloads personales innecesarios.

La auditoría utiliza referencias y fingerprints mínimos.

#### 92. Auditabilidad histórica

Una vez iniciada, la historia debe permitir reconstruir:

```text
REAL ACTOR
->
REAL AUTHORIZATION
->
SIMULATION REQUEST
->
INITIAL SCENARIO
->
SIMULATION CREATED
->
SIMULATION ACTIVATED
```

sin depender de logs libres o del estado actual de catálogos.

#### 93. Correcciones históricas

Si una evidencia de inicio fue registrada incorrectamente, no se reescribe.

La corrección debe:

- referenciar el objeto afectado;
- indicar razón;
- conservar actor corrector;
- conservar autorización;
- mantener correlación;
- preservar evidencia original.

#### 94. Rollback de una futura unidad

El rollback técnico no puede:

- borrar roots históricos;
- borrar eventos válidos;
- convertir `DRAFT` en `ACTIVE` por fallback;
- reactivar writer legacy permisivo;
- restaurar mezcla de autoridad real y simulada;
- reutilizar cookies como fuente de lifecycle;
- borrar intentos fallidos necesarios para trazabilidad;
- modificar un escenario histórico para hacerlo coincidir con código anterior.

#### 95. Resultado documental

La tarea deja cerrado documentalmente:

1. diferencia request/create/activate;
2. commit point de inicio;
3. actor real;
4. sesión real;
5. permiso del simulador;
6. decisión real;
7. alcance;
8. justificación;
9. strong cuando aplique;
10. identidad de solicitud;
11. `simulation_id`;
12. revisión inicial;
13. escenario tipado;
14. timestamps y expiración;
15. correlación y causación;
16. versiones y fingerprints;
17. idempotencia de creación;
18. idempotencia de activación;
19. concurrencia;
20. fallos de creación y activación;
21. receipt de inicio;
22. semántica de `SIMULATION_CREATED`;
23. semántica de `SIMULATION_ACTIVATED`;
24. relación con el aviso persistente;
25. tabs, refresh, cache y offline;
26. separación de autoridad real;
27. cero efectos;
28. bases y bloqueos físicos actuales;
29. evidencia mínima por unidad;
30. handoff exacto hacia salida.

#### 96. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: elegibilidad del simulador, identidad tipada del escenario, separación de autoridad real y simulada, lifecycle, auditoría reproducible, idempotencia, cero efectos, mutaciones bloqueadas, visibilidad y certificación multicanal ya están protegidos por requisitos canónicos vigentes. Esta tarea materializa el contrato específico del inicio sin cambiar regla protegida, prioridad, modalidad, owner, paquete, estado o relación del registro.

#### 97. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- simulación auditable y no ejecutable;
- elegibilidad del solicitante real;
- identidad tipada de roles y sujetos simulados;
- sede y área simuladas;
- turno y check-in simulados;
- separación de los cuatro planos;
- resultados `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE`;
- actor real y sesión real en auditoría;
- versiones y fingerprints reproducibles;
- lifecycle de simulación;
- bloqueo de autoridad simulada en mutaciones;
- cero efectos empresariales;
- paridad de consumidores y canales.

Trazabilidad vigente reutilizada: `TREQ-AUTH-012`, `TREQ-AUTH-079..128`, `TREQ-AUTH-165`, `TREQ-AUTH-279..288` y la cobertura transversal de auditoría, UI y contratos compartidos ya registrada.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `AUTH-SIM-008`.

#### 98. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto todavía no fue incorporado al archivo propietario ni pasó por el build documental del checkout del usuario |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron formateador, quality, delivery, topology, TREQ ni batería global contra la rama local de `AUTH-SIM-008` |
| REMOTA | `PASS` | se verificaron en solo lectura `main`, continuidad, topología, políticas documentales, owner, 04A AUTH, package.json, contratos de `AUTH-SIM-001..007`, `AUTH-SRV-014..015`, la migración física `AUTH-DB-013` y `@vento/os-context` vigentes |
| OPERATIVA | `NOT_EXECUTED` | no se solicitó, creó, activó, evaluó ni terminó una simulación real durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron servicios, migraciones, RPC, clientes, sesiones, eventos, aplicaciones, dispositivos ni datos desplegados |

#### 99. Criterios de aceptación

- [x] Se distingue solicitud, creación y activación.
- [x] `SIMULATION_CREATED` no se interpreta como inicio confirmado.
- [x] `SIMULATION_ACTIVATED` es el commit point del inicio.
- [x] La creación queda en `DRAFT`.
- [x] La activación válida produce `ACTIVE`.
- [x] Se conserva el actor humano real.
- [x] Se conserva la sesión real.
- [x] Se exige autoridad real para solicitar simulación.
- [x] El rol simulado no autoautoriza el inicio.
- [x] El alcance simulado permanece bajo el techo real de inspección.
- [x] Se conserva justificación cuando aplica.
- [x] Se conserva STRONG cuando aplica sin transferirlo al escenario.
- [x] Se distingue `simulation_request_id` de `simulation_id`.
- [x] Se exige revisión inicial reproducible.
- [x] Se conserva escenario tipado.
- [x] Se conservan sede, área, turno, check-in y recurso simulados cuando aplican.
- [x] Se conservan versiones y fingerprints.
- [x] Se conservan `created_at` y `expires_at` sin confiar en reloj cliente.
- [x] Se conserva correlación.
- [x] Se conserva causación cuando existe.
- [x] Se define idempotencia de creación.
- [x] Se define conflicto de idempotencia.
- [x] Se define idempotencia de activación.
- [x] Se impide reactivación fuera de `DRAFT`.
- [x] Se exige compatibilidad entre actor, sesión, decisión, root y activación.
- [x] Se exige frescura antes del commit point.
- [x] Se prohíbe simulación anidada.
- [x] Se define concurrencia segura de inicios.
- [x] Un `DENY` real no produce simulación activa.
- [x] Un escenario inválido no produce simulación activa.
- [x] Un fallo antes de creación no fabrica eventos exitosos.
- [x] Un fallo entre creación y activación deja `DRAFT`, no `ACTIVE`.
- [x] Una respuesta perdida se recupera sin duplicación.
- [x] Se define receipt seguro de inicio.
- [x] Se conserva vocabulario canónico de eventos.
- [x] Los intentos fallidos permanecen separados de eventos exitosos.
- [x] La evidencia es append-only.
- [x] Se preservan links de contexto, sesión y decisión.
- [x] Un dispositivo técnico no sustituye al simulador humano.
- [x] El cambio de actor invalida una activación stale.
- [x] `RESOLVING` no se deriva de un click local.
- [x] `ACTIVE` visible espera confirmación autoritativa.
- [x] Tabs, refresh, cache y storage no originan lifecycle.
- [x] No se inicia offline.
- [x] La autoridad real no se modifica al activar simulación.
- [x] Toda evaluación simulada continúa `executable = false`.
- [x] El inicio no preautoriza acciones reales.
- [x] Inicio y evaluación permanecen separados.
- [x] Inicio y salida permanecen separados.
- [x] Inicio y bloqueo crítico permanecen separados.
- [x] Inicio y solo lectura permanecen separados.
- [x] Inicio y pruebas posteriores permanecen separados.
- [x] Se reconoce la fundación append-only actual sin presentarla como adopción completa.
- [x] Se reconoce `start_context_simulation_v1` como writer legacy deshabilitado.
- [x] Se reconoce que `@vento/os-context` todavía invoca el writer legacy.
- [x] El input legacy no se adopta como contrato final.
- [x] `EffectiveContext` legacy no se adopta como mezcla autorizada.
- [x] No se reabre `AUTH-DB-013`.
- [x] No se reabre `AUTH-SRV-015`.
- [x] Se define evidencia mínima por futura unidad.
- [x] Se exige cero efectos empresariales durante el inicio.
- [x] Se excluyen secretos y PII innecesaria de la evidencia.
- [x] Se preserva auditabilidad histórica.
- [x] El rollback no borra ni reinterpreta evidencia válida.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se ejecutan cambios físicos.
- [x] `AUTH-SIM-009` permanece reservada.

#### 100. Límites

Esta tarea no:

- ejecuta una simulación;
- crea un root real;
- activa una sesión real de simulación;
- registra eventos reales;
- modifica `audit.authorization_simulations`;
- modifica `audit.authorization_simulation_revisions`;
- modifica `audit.authorization_simulation_events`;
- modifica `audit.authorization_simulation_attempts`;
- modifica `context_simulation_sessions`;
- modifica Supabase;
- crea migraciones;
- cambia RLS;
- cambia grants;
- cambia funciones;
- habilita `start_context_simulation_v1`;
- implementa el servicio autoritativo;
- modifica `@vento/os-context`;
- modifica VISO;
- modifica NEXO;
- modifica FOGO;
- modifica ORIGO;
- modifica PULSO;
- modifica dispositivos;
- cambia roles;
- cambia permisos;
- cambia turnos;
- cambia check-ins;
- crea strong reauth;
- implementa bloqueo de acciones críticas;
- implementa modo solo lectura;
- implementa salida de simulación;
- registra expiración o retorno real;
- ejecuta pruebas multicanal finales;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `AUTH-SIM-009`.

#### 101. Handoff exacto hacia AUTH-SIM-009

`AUTH-SIM-008` entrega a `AUTH-SIM-009` una sesión que, cuando exista físicamente y esté activa, debe poder identificarse mediante:

```text
simulation_id
+
revision vigente
+
real actor
+
real session
+
requester authorization decision
+
initial scenario fingerprint
+
created_at
+
activated event
+
expires_at
+
correlation
+
source versions/fingerprints
```

`AUTH-SIM-009` deberá conservar esa historia al registrar:

- salida solicitada;
- salida confirmada;
- expiración;
- revocación o invalidez cuando apliquen;
- retorno confirmado al contexto real.

La salida no puede editar ni borrar el inicio y no puede inferirse desde el desmontaje del aviso.

#### 102. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-SIM-007 — Mostrar aviso persistente`

**TAREA ACTUAL APROBADA**
`AUTH-SIM-008 — Registrar inicio de simulación`

**SIGUIENTE TAREA RESERVADA**
`AUTH-SIM-009 — Registrar salida de simulación`


### ✅ AUTH-SIM-009 — Registrar salida de simulación

**Estado:** APROBADA
**Tarea anterior:** AUTH-SIM-008 — Registrar inicio de simulación
**Tarea siguiente:** AUTH-SIM-010 — Bloquear acciones críticas durante simulación
**Tipo de tarea:** documental; contrato canónico de salida autoritativa, cierre terminal, expiración, revocación, invalidez y retorno confirmado al contexto real, con materialización posterior por implementation_unit_id conforme a PER_IMPLEMENTATION_UNIT y gate POST_E5_PACKAGE
**Bloque:** BLOQUE Q — Simulación
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/Q_SIMULACION/02_VISIBILIDAD_AUDITORIA_Y_RESTRICCIONES.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, Supabase, migraciones, RLS, RPC, contratos compartidos, clientes, sesiones, eventos persistidos, aplicaciones, datos, permisos, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cuándo una simulación deja de estar autoritativamente activa, qué hecho terminal demuestra su cierre, cómo se preserva la historia del inicio y de las evaluaciones ya registradas y bajo qué condiciones puede presentarse nuevamente un contexto real fresco sin confundir solicitud de salida, cierre terminal y restauración visual.

La regla raíz queda:

```text
SIMULACION ACTIVA O DRAFT TERMINABLE
+
CAUSA TERMINAL VALIDA
+
TRANSICION AUTORITATIVA PERSISTIDA CUANDO CORRESPONDA
+
ESTADO TERMINAL DERIVADO
+
INVALIDACION DE PREVIEW SIMULADA
+
NUEVA RESOLUCION DEL CONTEXTO REAL
=
SALIDA DE SIMULACION CONFIRMADA
```

Y siempre:

```text
SOLICITAR SALIDA
!=
SALIDA CONFIRMADA
```

```text
OCULTAR AVISO
!=
SALIDA CONFIRMADA
```

```text
SIMULATION_COMPLETED
!=
AUTORIDAD REAL RESTAURADA POR CACHE
```

#### 2. Pregunta contractual propietaria

Esta tarea responde exclusivamente:

```text
¿CUANDO DEJA DE ESTAR VIGENTE UNA SIMULACION?
```

```text
¿QUE CAUSA TERMINAL QUEDO REGISTRADA?
```

```text
¿COMO SE DEMUESTRA QUE EL CONTEXTO SIMULADO YA NO PUEDE SEGUIR UTILIZANDOSE?
```

```text
¿CUANDO PUEDE LA SUPERFICIE VOLVER A PRESENTAR CONTEXTO REAL?
```

No define todavía el bloqueo multicanal de acciones críticas durante una simulación; esa responsabilidad permanece en `AUTH-SIM-010`.

#### 3. Handoff recibido de AUTH-SIM-008

`AUTH-SIM-008` entrega un lifecycle identificable por:

- `simulation_id`;
- revisión vigente;
- actor real;
- sesión real;
- decisión real del solicitante;
- fingerprint del escenario inicial;
- `created_at`;
- evento `SIMULATION_ACTIVATED` cuando el inicio fue confirmado;
- `expires_at`;
- correlación;
- versiones y fingerprints fuente.

La salida conserva toda esa historia y nunca corrige el inicio mediante mutación destructiva.

#### 4. Handoff recibido de AUTH-SIM-007

La presentación ya distingue:

```text
RESOLVING
ACTIVE
STALE
INVALID
EXIT_PENDING
```

Para esta tarea son vinculantes dos reglas:

```text
component unmounted != simulation ended
```

```text
exit requested != real context restored
```

`EXIT_PENDING` representa una transición visible pendiente; no es un estado persistido adicional del lifecycle ni un evento empresarial nuevo.

#### 5. Contratos consumidos

La tarea consume sin redefinir:

- `AUTH-SIM-001..005`, para elegibilidad y escenario hipotético;
- `AUTH-SIM-006`, para separación entre autoridad real, evaluación simulada, presentación y auditoría;
- `AUTH-SIM-007`, para lifecycle visible y `EXIT_PENDING`;
- `AUTH-SIM-008`, para creación, activación, correlación e historia de inicio;
- `AUTH-SRV-014`, para principal técnico y actor real;
- `AUTH-SRV-015`, para separación del plano simulado y del plano real;
- `AUTH-DB-013`, para persistencia append-only, eventos terminales, intentos, fingerprints, idempotencia y estado derivado;
- los contratos vigentes de autorización, contexto, sesión, dispositivo compartido, auditoría y versiones.

#### 6. Topología y materialización posterior

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

El marcador actual define una sola vez el contrato reutilizable.

Cada materialización física futura pertenece a un `implementation_unit_id` concreto y conserva su propia evidencia sin reabrir esta definición documental.

#### 7. Salida no equivale a navegación

No constituyen salida de simulación:

- cerrar un modal;
- abandonar una pantalla;
- navegar a otra ruta;
- cambiar de aplicación;
- desmontar `SimulatedRoleNotice`;
- borrar estado React;
- limpiar una cookie;
- limpiar `localStorage`, `sessionStorage` o IndexedDB;
- recargar la página;
- cerrar una tab;
- recibir un booleano local;
- pulsar un control visual de salida;
- perder conectividad;
- ocultar la preview por error de renderizado.

La salida existe únicamente cuando el lifecycle autoritativo deja de ser utilizable como `ACTIVE` y esa condición es confirmada por su fuente propietaria.

#### 8. Causas terminales canónicas

El vocabulario físico vigente reconoce exactamente estas causas terminales de simulación:

```text
SIMULATION_COMPLETED
SIMULATION_EXPIRED
SIMULATION_REVOKED
SIMULATION_INVALIDATED
```

Esta tarea no introduce alias persistidos como:

```text
SIMULATION_EXITED
SIMULATION_STOPPED
SIMULATION_CLOSED
SIMULATION_ENDED
EXIT_CONFIRMED
REAL_CONTEXT_RESTORED
```

como nuevos eventos canónicos.

#### 9. Salida normal solicitada por la persona

La salida voluntaria ordinaria de una simulación `ACTIVE` culmina en:

```text
SIMULATION_COMPLETED
```

La acción visual de solicitar salida solo inicia el intento. Hasta que el servidor confirme el estado terminal, la superficie conserva semántica de simulación y no presenta el contexto real como restaurado.

#### 10. Commit point de salida normal

El commit point canónico de la salida voluntaria es:

```text
SIMULATION_COMPLETED
```

persistido sobre el mismo `simulation_id` y correlacionado con el lifecycle existente.

Solo después de que el estado derivado confirme:

```text
status = COMPLETED
```

puede declararse que la simulación dejó de estar activa por finalización normal.

#### 11. Solicitud de salida sin evento nuevo

La intención de salir no crea un nuevo tipo de evento persistido.

Mientras la operación está pendiente:

- la UI puede reflejar `EXIT_PENDING` conforme a `AUTH-SIM-007`;
- la simulación no se presenta como cerrada;
- no se publica contexto real optimistamente;
- no se ejecuta una acción real con datos derivados de la simulación;
- el intento conserva correlación y evidencia técnica o de intento cuando corresponda.

#### 12. Estado terminal COMPLETED

`COMPLETED` significa que la simulación fue finalizada de manera autoritativa desde `ACTIVE`.

Implica:

- no aceptar nuevas revisiones de escenario;
- no aceptar nuevas evaluaciones simuladas;
- no reactivar el mismo lifecycle;
- retirar la preview simulada;
- impedir reutilización de receipts, respuestas o cache de ese lifecycle como si siguiera activo;
- conservar íntegra la evidencia histórica.

#### 13. Expiración

La expiración ocurre cuando `expires_at` deja de ser futuro.

La fundación física vigente puede derivar `EXPIRED` por tiempo aun antes de que exista el evento explícito de expiración.

Por tanto se distinguen:

```text
ESTADO DE SEGURIDAD DERIVADO = EXPIRED
```

```text
EVIDENCIA HISTORICA DE EXPIRACION = SIMULATION_EXPIRED
```

Una materialización completa no utiliza la ausencia del evento como permiso para prolongar la simulación.

#### 14. Commit point de expiración auditable

Para certificar históricamente la expiración, el lifecycle debe poder conservar:

```text
SIMULATION_EXPIRED
```

sin alterar `expires_at` ni extenderlo retroactivamente.

El evento de expiración solo es válido cuando el vencimiento ya ocurrió según tiempo autoritativo.

#### 15. Expiración no depende de la UI

La expiración no depende de:

- timer del navegador;
- foco de ventana;
- actividad reciente;
- navegación;
- refresh;
- visibilidad del aviso;
- reconexión;
- heartbeat exclusivamente cliente;
- cierre o reapertura de la aplicación.

El reloj cliente puede mostrar información, pero no decide el estado terminal.

#### 16. Revocación

`SIMULATION_REVOKED` representa la terminación deliberada de un lifecycle todavía `DRAFT` o `ACTIVE` por una decisión autorizada distinta de la finalización ordinaria del simulador.

La revocación no se disfraza como `SIMULATION_COMPLETED` cuando la causa material es administrativa, de seguridad o de gobierno.

#### 17. Invalidez

`SIMULATION_INVALIDATED` representa la terminación porque el lifecycle ya no puede considerarse semántica o contractualmente válido.

Entre las causas que pueden exigir evaluación propietaria se encuentran:

- pérdida de compatibilidad entre actor, sesión y simulación;
- contaminación entre contexto real y simulado;
- cambio material que invalide la revisión vigente;
- incompatibilidad de versiones o fingerprints;
- evidencia de replay incompatible;
- incapacidad de demostrar la integridad necesaria del escenario.

La causa exacta se registra mediante el reason code permitido por el owner; esta tarea no crea un catálogo nuevo de reasons.

#### 18. Precedencia terminal observada

La función física vigente de estado derivado aplica precedencia de seguridad:

```text
INVALID
>
REVOKED
>
COMPLETED
>
EXPIRED
>
ACTIVE
>
DRAFT
```

Además, la persistencia vigente restringe el lifecycle a un único evento terminal entre `SIMULATION_COMPLETED`, `SIMULATION_EXPIRED`, `SIMULATION_REVOKED` y `SIMULATION_INVALIDATED`.

Esta tarea conserva esa unicidad y no define terminales concurrentes válidos.

#### 19. Transiciones permitidas

La semántica propietaria queda:

| Estado previo | Causa | Resultado terminal |
| --- | --- | --- |
| `ACTIVE` | finalización voluntaria válida | `COMPLETED` |
| `DRAFT` o `ACTIVE` | revocación autorizada | `REVOKED` |
| `DRAFT` o `ACTIVE` | invalidez confirmada | `INVALID` |
| `DRAFT`, `ACTIVE` o expiración ya derivada | vencimiento autoritativo | `EXPIRED` |

No se habilita una transición terminal desde un lifecycle inexistente.

#### 20. Unicidad de terminal

Una simulación no puede terminar dos veces con causas diferentes.

No es conforme:

```text
SIMULATION_COMPLETED
->
SIMULATION_REVOKED
```

ni:

```text
SIMULATION_EXPIRED
->
SIMULATION_COMPLETED
```

ni cualquier combinación de dos terminales exitosos para el mismo `simulation_id`.

#### 21. Idempotencia de salida normal

La transición terminal conserva `operation_id` y fingerprint de operación.

Repetir la misma operación lógica con:

```text
MISMO simulation_id
+
MISMO operation_id
+
MISMO fingerprint
```

debe converger en el mismo resultado lógico sin crear un segundo evento.

#### 22. Conflicto de idempotencia

Reutilizar el mismo `operation_id` con contenido materialmente diferente produce conflicto.

No se sobrescribe el evento previo y no se cambia la causa terminal para acomodar el reintento.

#### 23. Doble click y reintento de cliente

Un doble click, retry de red o reenvío automático no puede producir dos cierres.

La capa propietaria debe:

1. conservar identidad de operación estable para el mismo intento lógico;
2. volver a consultar estado autoritativo ante respuesta incierta;
3. converger si el cierre ya ocurrió;
4. tratar el payload incompatible como conflicto;
5. no crear un lifecycle nuevo para simular idempotencia.

#### 24. Respuesta perdida después de completar

Si `SIMULATION_COMPLETED` quedó persistido pero la respuesta al cliente se pierde:

- el cliente no repite una mutación ciega con identidad distinta;
- vuelve a resolver el lifecycle;
- reconoce `COMPLETED` si el servidor ya lo confirmó;
- retira la preview únicamente después de esa confirmación;
- reconstruye el contexto real desde su fuente autoritativa.

#### 25. Fallo antes del terminal

Si el cierre no alcanza el commit point:

```text
NO TERMINAL EVENT
=
NO SALIDA CONFIRMADA POR ESA OPERACION
```

La UI no transforma un timeout, error de transporte o error local en éxito empresarial.

#### 26. Intentos no exitosos

La persistencia vigente separa los intentos fallidos del stream de eventos exitosos.

Para esta tarea son relevantes las operaciones ya existentes:

```text
COMPLETE_SIMULATION
EXPIRE_SIMULATION
REVOKE_SIMULATION
INVALIDATE_SIMULATION
```

con resultados no exitosos ya tipados como:

```text
DENIED
INVALID
CONFLICT
TECHNICAL_FAILURE
NO_CHANGE
ROLLED_BACK
```

Un intento fallido no se presenta como evento terminal exitoso.

#### 27. Autorización de completion

Una finalización normal que requiere una decisión real debe evaluarse desde el plano real.

La decisión utilizada para sostener el terminal:

- no procede del rol simulado;
- no procede del resultado `WOULD_ALLOW`;
- no procede del contenido de la preview;
- no procede de una cookie de simulación;
- debe ser una decisión real `ALLOW` válida para el owner de la operación.

Esta tarea no redefine la clave de permiso propietaria del servicio físico.

#### 28. Actor real y cierre

La salida ordinaria debe mantener identidad inequívoca del actor humano real que solicita la finalización.

Una materialización no puede tratar como solicitante a:

- sujeto simulado;
- rol simulado;
- principal técnico por sí solo;
- dispositivo compartido;
- actor mostrado en la preview;
- último actor conocido por cache.

#### 29. Compatibilidad entre actor, sesión y root

Una finalización voluntaria debe demostrar compatibilidad entre el lifecycle que se cierra y el actor/sesión reales autorizados para cerrarlo.

Si existe un cierre administrativo por otra autoridad, su semántica debe expresarse mediante la causa terminal propietaria correspondiente y no mediante suplantación del actor original.

La infraestructura actual observada aporta el event writer genérico, pero la inspección estática no demuestra por sí sola una capa consumidora completa que imponga esta política en todas las unidades.

#### 30. Pérdida de sesión real

Si la sesión real expira, se revoca o deja de poder reconstruirse mientras existe una simulación:

- la simulación no se convierte en sesión autónoma;
- el actor simulado no autentica;
- la preview no puede seguir presentándose como activa por cache;
- la salida voluntaria que requiera identidad real no se inventa localmente;
- la capa propietaria debe resolver de forma segura el estado terminal o inválido aplicable;
- cualquier retorno operativo exige una nueva sesión real válida.

#### 31. Cambio de actor en dispositivo compartido

Si cambia el actor humano en una estación compartida:

- la simulación anterior no se transfiere al nuevo actor;
- el nuevo actor no puede completar el lifecycle fingiendo ser el anterior;
- la preview del actor anterior se retira;
- el owner vuelve a resolver lifecycle, sesión y contexto;
- cualquier terminación pendiente conserva su correlación original.

#### 32. Salida y contexto real son dos confirmaciones distintas

La salida canónica distingue:

```text
A. LIFECYCLE SIMULADO TERMINAL
```

```text
B. CONTEXTO REAL FRESCO RESUELTO
```

A no debe confundirse con B.

`COMPLETED`, `EXPIRED`, `REVOKED` o `INVALID` demuestran que la simulación ya no es activa. El contexto real que se presenta después debe resolverse nuevamente desde las fuentes reales propietarias.

#### 33. Prohibición de restauración desde snapshot simulado

Al terminar una simulación no se reconstruye el contexto real mediante:

- valores guardados antes de entrar en simulación;
- actor o rol copiados en estado cliente;
- cookies de role override;
- `localStorage`;
- `sessionStorage`;
- último `EffectiveContext` cacheado;
- datos del sujeto simulado;
- invertir manualmente campos del escenario hipotético.

La restauración es una nueva resolución real.

#### 34. Contexto real fresco

Antes de permitir que la superficie se presente nuevamente como operativa en contexto real, debe resolverse al menos lo material que corresponda a su owner:

- sesión real vigente;
- actor real;
- principal técnico cuando aplique;
- rol real;
- contexto laboral real;
- sede y área reales;
- turno y check-in reales cuando sean necesarios;
- estado de dispositivo compartido;
- permisos y denegaciones vigentes;
- versiones y fingerprints aplicables.

La salida no garantiza que la persona tenga acceso real a la misma superficie que estaba simulando.

#### 35. Cero herencia de permiso simulado

Después de un terminal debe mantenerse:

```text
SIMULATED WOULD_ALLOW
!=
REAL ALLOW
```

La próxima acción real requiere una decisión real nueva o vigente conforme a su contrato propietario.

No se reutiliza una evaluación simulada como preautorización.

#### 36. Cero mutación empresarial durante salida

La transición de salida modifica exclusivamente lifecycle, auditoría y estado técnico necesario para abandonar la simulación.

No puede ejecutar por efecto colateral la acción hipotética que estaba siendo simulada.

Debe mantenerse:

```text
EXIT SIMULATION
->
LIFECYCLE / AUDIT ONLY
->
ZERO SIMULATED BUSINESS EFFECT
```

#### 37. Salida y AUTH-SIM-010

Un cierre correcto no demuestra que durante la simulación anterior todas las acciones críticas estuvieron bloqueadas.

`AUTH-SIM-010` conserva la responsabilidad de enforcement crítico en todos los canales.

Esta tarea no usa el evento terminal como sustituto de ese bloqueo.

#### 38. Salida y modo solo lectura

Terminar una simulación no define si la preview fue correctamente read-only mientras estuvo activa.

`AUTH-SIM-011` mantiene esa política.

La salida únicamente impide prolongar la simulación después del terminal.

#### 39. Salida y navegación simulada

`AUTH-SIM-012` conserva las pruebas de navegación y persistencia visible.

Esta tarea fija una regla específica:

```text
NAVIGATE AWAY
!=
EXIT SIMULATION
```

Una navegación posterior al terminal debe resolver contexto desde cero en la superficie destino.

#### 40. Salida y Server Actions

`AUTH-SIM-013` conserva la certificación de Server Actions.

Un Server Action real no puede concluir que ya es seguro ejecutarse únicamente porque el cliente afirme haber salido de simulación.

Debe resolver autoridad real en servidor.

#### 41. Salida y prueba integral

`AUTH-SIM-014` conserva la certificación transversal en aplicaciones aplicables.

Un cierre correcto en una unidad no demuestra que todas las aplicaciones invaliden correctamente preview, cache y acciones derivadas.

#### 42. Lifecycle visible durante salida voluntaria

La secuencia visible esperada es:

```text
ACTIVE
->
EXIT_PENDING
->
terminal confirmado
->
preview simulada retirada
->
contexto real vuelto a resolver
```

`EXIT_PENDING` no publica contexto real ni oculta prematuramente la condición simulada.

#### 43. Salida fallida

Si el intento de completion falla antes de confirmación:

- `EXIT_PENDING` no se interpreta como terminal;
- la UI vuelve a resolver lifecycle;
- puede volver a `ACTIVE`, `STALE` o `INVALID` según la fuente propietaria;
- no conserva una copia optimista del contexto real;
- el intento fallido permanece separado del event stream exitoso.

#### 44. Expiración durante uso

Si `expires_at` vence mientras la preview está abierta:

- la preview deja de considerarse vigente aunque el usuario no interactúe;
- no se espera a que la persona pulse salir;
- no se extiende la vida por actividad;
- la presentación pasa a un estado seguro y retira contenido simulado;
- la capa propietaria registra o reconcilia la evidencia terminal correspondiente;
- el contexto real se vuelve a resolver antes de continuar.

#### 45. Revocación remota

Si otro actor o proceso autorizado revoca una simulación:

- una tab abierta no conserva `ACTIVE` por cache;
- el cliente no puede revertir la revocación mediante refresh;
- la simulación no se reactiva al recuperar conectividad;
- el actor original debe recibir el estado terminal cuando vuelva a resolver;
- cualquier trabajo real posterior se autoriza desde contexto real.

#### 46. Invalidación remota

Una invalidación confirmada obliga a retirar la preview aunque visualmente el escenario todavía parezca coherente.

La UI no decide que puede continuar porque sus filtros, etiquetas o datos locales no cambiaron.

#### 47. Varias tabs

Todas las tabs asociadas al mismo lifecycle deben converger en el estado autoritativo.

Reglas:

1. una tab que solicita salida no cierra localmente a las demás;
2. una tab que confirma `COMPLETED` obliga a las demás a dejar de tratar la simulación como `ACTIVE` cuando revaliden;
3. una respuesta tardía `ACTIVE` anterior al terminal no puede resucitar la simulación;
4. una tab no restaura contexto real de otra mediante storage compartido;
5. cada superficie vuelve a resolver lo que necesite.

#### 48. Respuestas tardías

Después de un terminal, una respuesta tardía de:

- activación;
- revisión;
- evaluación;
- navegación;
- fetch de preview;

no puede volver a publicar el escenario como vigente.

La capa consumidora compara identidad, revisión, correlación y estado antes de aceptar resultados.

#### 49. Refresh durante EXIT_PENDING

Un refresh durante `EXIT_PENDING` no se interpreta como cancelación ni como éxito.

Al reconstruirse la aplicación debe consultar nuevamente:

- lifecycle de simulación;
- estado derivado;
- expiración;
- sesión real;
- actor real;
- contexto real solo después de resolver el terminal.

#### 50. Cierre de tab

Cerrar la tab no constituye un terminal.

Si la simulación sigue `ACTIVE` en servidor, una futura reapertura debe detectarla según el contrato propietario y no asumir que el cierre de ventana la terminó.

#### 51. Offline

No se confirma una salida voluntaria offline.

Una intención capturada sin confirmación:

- no se presenta como `COMPLETED`;
- no habilita operación real;
- no se encola ciegamente como autoridad para ejecutarse al reconectar;
- exige nueva resolución de sesión, lifecycle e intención al recuperar conectividad.

Si el tiempo autoritativo implica expiración durante la desconexión, la preview local tampoco puede prolongarse como `ACTIVE`.

#### 52. Cache

Ningún cache puede convertir un estado terminal en `ACTIVE`.

Después de `COMPLETED`, `EXPIRED`, `REVOKED` o `INVALID`:

- se invalidan proyecciones simuladas reutilizables;
- se descartan resultados hipotéticos stale;
- se impide que un cache de navegación restaure el aviso como activo;
- se resuelve nuevamente el contexto real antes de presentar operación.

#### 53. Cookies y storage

Eliminar una cookie o storage puede formar parte de una limpieza técnica de una unidad, pero no constituye evidencia canónica de salida.

Asimismo, conservar una cookie residual no puede reactivar una simulación cuyo lifecycle ya es terminal.

#### 54. Receipt de salida

La respuesta segura de una futura capa de servicio debe permitir al consumidor distinguir inequívocamente:

- `simulation_id` al que corresponde el resultado;
- estado terminal resultante;
- identidad o correlación suficiente de la operación;
- si la respuesta provino de una operación idempotente ya existente;
- información temporal mínima necesaria para evitar respuestas stale.

El consumidor no necesita recibir el registro interno completo ni secretos.

Los nombres físicos del receipt pertenecen al owner del servicio; esta tarea fija la semántica, no un DTO nuevo.

#### 55. Resultado seguro de salida

La capa consumidora debe poder distinguir entre:

```text
COMPLETED
EXPIRED
REVOKED
INVALID
```

como estados terminales y entre resultados de intento no exitoso ya vigentes como:

```text
DENIED
INVALID
CONFLICT
TECHNICAL_FAILURE
NO_CHANGE
ROLLED_BACK
```

No se confunde un error técnico con una decisión de autorización ni con un terminal confirmado.

#### 56. Auditoría append-only

La salida agrega evidencia; no reescribe la historia.

No se permite:

- `UPDATE` del evento de activación para marcarlo cerrado;
- `DELETE` de revisiones previas;
- borrar evaluaciones simuladas al salir;
- cambiar fingerprints para hacer coincidir el estado actual;
- modificar `created_at` o `expires_at` históricos para simplificar el cierre;
- reemplazar el evento terminal por un booleano mutable.

#### 57. Correlación

El terminal conserva la correlación del lifecycle y debe poder enlazarse con:

- root;
- revisión vigente o aplicable;
- actor real cuando corresponda;
- decisión real cuando corresponda;
- causa terminal;
- operación terminal;
- intentos fallidos relacionados;
- contexto y sesión reales mediante las referencias propietarias ya existentes.

La correlación no concede autoridad.

#### 58. Causación

Cuando exista una causa identificable se conserva `causation_id` o semántica equivalente ya soportada.

La causación puede relacionar el terminal con una decisión, evento de seguridad, expiración o comando previo sin convertir ese identificador en token o permiso.

#### 59. Fingerprint de operación

Toda transición terminal persistida conserva fingerprint de operación.

El fingerprint permite detectar reutilización incompatible del mismo `operation_id` y no se usa como credencial.

#### 60. Fingerprint de evento

El evento terminal conserva fingerprint propio.

La evidencia no se valida comparando únicamente copy visible, URL, cookie o timestamp del cliente.

#### 61. Tiempo terminal

`occurred_at` y `recorded_at` proceden del plano autoritativo.

El navegador no elige el momento que vuelve terminal al lifecycle.

En expiración, `expires_at` sigue siendo el límite de vigencia; el evento histórico no extiende ni retrocede ese límite.

#### 62. Correcciones históricas

Si la evidencia de salida fue registrada incorrectamente, no se modifica destructivamente.

La fundación vigente dispone de correcciones append-only y del evento `SIMULATION_CORRECTION_LINKED`.

Una corrección:

- referencia el objeto afectado;
- conserva la evidencia original;
- conserva actor y autorización de corrección;
- mantiene correlación;
- no cambia autoridad mediante campos prohibidos;
- no crea un segundo terminal para reescribir el primero.

#### 63. Privacidad y minimización

La evidencia de salida no almacena por defecto:

- JWT completos;
- access tokens;
- refresh tokens;
- cookies;
- contraseñas;
- OTP;
- PIN;
- service-role keys;
- API keys;
- credenciales privadas;
- headers completos;
- payloads personales innecesarios.

Se utilizan referencias, reasons estructurados y fingerprints mínimos.

#### 64. Estado físico positivo observado

La infraestructura vigente ya contiene:

- `audit.authorization_simulations`;
- revisiones append-only;
- evaluaciones simuladas;
- eventos append-only;
- intentos fallidos;
- enlaces de evidencia;
- correcciones;
- fingerprints;
- `operation_id` idempotente por simulación;
- eventos `SIMULATION_COMPLETED`, `SIMULATION_EXPIRED`, `SIMULATION_REVOKED` y `SIMULATION_INVALIDATED`;
- estado derivado `COMPLETED`, `EXPIRED`, `REVOKED` e `INVALID`.

Esta base física es reutilizable, pero no demuestra por sí sola una salida consumidora completa.

#### 65. Estado físico positivo: terminal único

La persistencia actual contiene una restricción que impide más de un evento terminal entre:

```text
SIMULATION_COMPLETED
SIMULATION_EXPIRED
SIMULATION_REVOKED
SIMULATION_INVALIDATED
```

para el mismo `simulation_id`.

Esta tarea conserva esa propiedad.

#### 66. Estado físico positivo: completion desde ACTIVE

El writer privado vigente acepta `SIMULATION_COMPLETED` únicamente cuando el estado derivado previo es `ACTIVE`.

Por tanto:

```text
DRAFT
->
SIMULATION_COMPLETED
```

no es una transición válida de finalización ordinaria.

#### 67. Estado físico positivo: revocación e invalidez

El writer privado vigente acepta `SIMULATION_REVOKED` y `SIMULATION_INVALIDATED` únicamente cuando el estado previo es `DRAFT` o `ACTIVE`.

Un lifecycle ya terminal no se vuelve a revocar ni invalidar mediante un segundo evento terminal.

#### 68. Estado físico positivo: expiración

El writer privado vigente permite registrar `SIMULATION_EXPIRED` cuando el vencimiento ya ocurrió y el estado es compatible.

La función de estado también puede derivar `EXPIRED` directamente desde `expires_at`.

La futura capa de servicio debe reconciliar ambas dimensiones sin prolongar el lifecycle ni perder la evidencia histórica exigida.

#### 69. Bloqueo físico: stop legacy neutralizado

La función pública legacy:

```text
stop_context_simulation_v1
```

permanece presente por compatibilidad, pero su implementación vigente devuelve `false`.

Por tanto, su existencia no demuestra una salida canónica operativa.

#### 70. Bloqueo físico: cliente compartido todavía usa stop legacy

`@vento/os-context` conserva un helper `stopContextSimulation` que invoca `stop_context_simulation_v1`.

Bajo el estado físico vigente, ese helper no constituye el servicio canónico de salida definido por esta tarea.

Su sustitución pertenece a los owners físicos, packages y consumidores correspondientes.

#### 71. Bloqueo físico: servicio consumidor no demostrado

La inspección vigente no demuestra un flujo consumidor completo que ejecute de extremo a extremo:

```text
ACTIVE SIMULATION
->
REAL ACTOR REQUESTS EXIT
->
REAL AUTHORIZATION RESOLVED
->
SIMULATION_COMPLETED
->
TERMINAL RECEIPT
->
SIMULATED PREVIEW INVALIDATED
->
REAL CONTEXT RE-RESOLVED
```

La existencia del event writer privado es fundación, no adopción completa.

#### 72. Bloqueo físico: compatibilidad actor-root por consumidor

El writer genérico exige una decisión real `ALLOW` para terminales distintos de expiración, pero esta inspección estática no certifica por sí sola que cada futura unidad valide correctamente la relación entre:

- actor que opera;
- sesión real;
- root de simulación;
- lifecycle original;
- causa terminal seleccionada.

Esa compatibilidad debe demostrarse en cada materialización propietaria.

#### 73. No reapertura de AUTH-DB-013

Esta tarea no modifica la migración ni sus tablas, funciones, constraints, índices o grants.

Los nombres SQL actuales se consumen como evidencia física existente.

Cualquier corrección física futura seguirá el lifecycle propietario correspondiente.

#### 74. No reapertura de AUTH-SRV-015

`AUTH-SRV-015` conserva la separación entre plano real y plano simulado.

Esta tarea especializa el momento de salida y retorno al plano real sin redefinir:

- actor;
- rol;
- permiso;
- resultado simulado;
- catálogo;
- envelope de auditoría;
- servicio físico.

#### 75. Evidencia mínima de una futura unidad

Cada materialización de `AUTH-SIM-009` para un `implementation_unit_id` deberá demostrar, como mínimo:

1. package y unidad propietaria identificados;
2. gate E5 aplicable en PASS;
3. servicio terminal propietario identificado;
4. `simulation_id` resuelto desde fuente autoritativa;
5. estado previo compatible;
6. actor real y sesión real cuando la causa lo requiera;
7. decisión real aplicable cuando corresponda;
8. `operation_id` e idempotencia;
9. fingerprint estable de operación;
10. completion desde `ACTIVE` únicamente;
11. expiración sin prolongación local;
12. revocación e invalidez con causa propietaria;
13. único terminal por lifecycle;
14. reintento idempotente sin duplicación;
15. conflicto de idempotencia sin overwrite;
16. respuesta perdida recuperada por resolución autoritativa;
17. intento fallido separado del event stream exitoso;
18. preview retirada después del terminal, no antes;
19. `EXIT_PENDING` sin falsa restauración;
20. contexto real vuelto a resolver desde fuentes reales;
21. ausencia de herencia de permisos simulados;
22. tabs y respuestas tardías sin resurrección del lifecycle;
23. refresh sin suposición de éxito;
24. offline sin completion local;
25. cache y storage invalidados de forma segura;
26. cambio de actor en dispositivo compartido sin transferencia;
27. pérdida de sesión sin simulación autónoma;
28. cero mutaciones empresariales derivadas de la preview;
29. minimización de datos y secretos;
30. rollback sin borrar evidencia histórica.

#### 76. Matriz mínima de casos de salida

| Caso | Terminal esperado | Contexto real |
| --- | --- | --- |
| actor autorizado finaliza simulación `ACTIVE` | `COMPLETED` | re-resolver después del terminal |
| doble click de la misma operación | mismo `COMPLETED` idempotente | una sola reconstrucción lógica |
| mismo `operation_id` con payload distinto | conflicto | no asumir salida nueva |
| timeout después de persistir completion | resolver `COMPLETED` | re-resolver solo tras confirmación |
| fallo antes de persistir completion | sin terminal por esa operación | no presentar restauración |
| simulación vence por `expires_at` | `EXPIRED` | retirar preview y re-resolver |
| revocación autorizada de lifecycle vigente | `REVOKED` | retirar preview y re-resolver |
| incompatibilidad confirmada del lifecycle | `INVALID` | retirar preview y re-resolver |
| tab secundaria conserva respuesta `ACTIVE` tardía | terminal vigente prevalece | no resucitar preview |
| refresh durante `EXIT_PENDING` | volver a resolver | no inferir éxito |
| cierre de tab | ningún terminal por ese hecho | no inferir salida |
| salida offline no confirmada | ningún completion confirmado | no habilitar operación real |
| sesión real perdida | no usar simulación como sesión | exigir resolución/reauth propietaria |
| actor cambia en dispositivo compartido | lifecycle anterior no se transfiere | resolver nuevo actor y contexto |

#### 77. Rollback de una futura unidad

El rollback técnico no puede:

- borrar eventos terminales válidos;
- borrar roots, revisiones o evaluaciones históricas;
- convertir `COMPLETED`, `EXPIRED`, `REVOKED` o `INVALID` en `ACTIVE`;
- reactivar `stop_context_simulation_v1` como writer permisivo sin contrato;
- restaurar cookies como fuente de lifecycle;
- reutilizar `EffectiveContext` legacy como mezcla de autoridad;
- borrar intentos fallidos necesarios para trazabilidad;
- alterar `expires_at` histórico;
- reactivar una simulación terminal para recuperar compatibilidad con código anterior.

#### 78. Invariantes

1. Solicitar salida no equivale a salida confirmada.
2. `EXIT_PENDING` es presentación, no evento empresarial nuevo.
3. `SIMULATION_COMPLETED` es el terminal de salida voluntaria normal.
4. `SIMULATION_EXPIRED` conserva expiración auditable.
5. `SIMULATION_REVOKED` conserva revocación autorizada.
6. `SIMULATION_INVALIDATED` conserva invalidez confirmada.
7. No se introducen aliases terminales persistidos.
8. Un lifecycle tiene como máximo un evento terminal exitoso.
9. Completion solo parte de `ACTIVE`.
10. Revocación e invalidez solo parten de estados no terminales permitidos.
11. Expiración no depende del reloj cliente.
12. Expiración derivada bloquea uso aunque el evento histórico aún deba reconciliarse.
13. La UI no termina simulaciones desmontando componentes.
14. Navegar no termina simulaciones.
15. Cerrar una tab no termina simulaciones.
16. Limpiar storage no termina simulaciones.
17. Una respuesta perdida no produce duplicación.
18. Idempotencia conserva el mismo resultado lógico.
19. Reutilización incompatible de operation ID produce conflicto.
20. Un terminal no borra el inicio.
21. Un terminal no borra evaluaciones previas.
22. Las correcciones son append-only.
23. El resultado simulado nunca se convierte en autoridad real.
24. El contexto real se vuelve a resolver después del terminal.
25. Un snapshot previo no restaura autoridad real.
26. El rol simulado no autoriza completion.
27. El principal técnico no sustituye al actor humano cuando este es requerido.
28. El cambio de actor no transfiere el lifecycle.
29. La pérdida de sesión no deja una simulación autónoma.
30. Tabs y respuestas tardías no resucitan estados terminales.
31. Offline no confirma completion.
32. Cero efectos empresariales se ejecutan como consecuencia de salir.
33. `stop_context_simulation_v1` legacy no se adopta como implementación canónica.
34. `stopContextSimulation` actual no se presenta como servicio final.
35. La base `AUTH-DB-013` no se reabre.
36. `AUTH-SRV-015` no se redefine.
37. No se modifica 04A.
38. No se inicia `AUTH-SIM-010`.

#### 79. Resultado documental

La tarea deja cerrado documentalmente:

1. diferencia entre solicitud y confirmación de salida;
2. commit point de completion;
3. terminales canónicos existentes;
4. completion normal;
5. expiración;
6. revocación;
7. invalidez;
8. unicidad terminal;
9. idempotencia;
10. conflicto de idempotencia;
11. intentos fallidos;
12. actor y sesión reales;
13. separación entre terminal y restauración real;
14. re-resolución de contexto real;
15. cero herencia de autoridad simulada;
16. tabs y respuestas tardías;
17. refresh;
18. offline;
19. cache y storage;
20. auditoría append-only;
21. correlación, causación y fingerprints;
22. privacidad;
23. estado físico positivo actual;
24. bloqueos físicos legacy actuales;
25. evidencia mínima por unidad;
26. rollback;
27. handoff exacto hacia bloqueo crítico.

#### 80. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: lifecycle de simulación, separación de autoridad real y simulada, auditoría append-only, expiración, revocación, invalidez, cero efectos, idempotencia, bloqueo de autoridad simulada, visibilidad, contexto real y certificación multicanal ya disponen de cobertura canónica vigente. Esta tarea especializa la semántica de salida utilizando el vocabulario terminal y la persistencia ya definidos, sin crear una obligación verificable nueva ni cambiar owner, prioridad, modalidad, paquete, estado o relación del registro.

#### 81. Cobertura de prueba vigente reutilizada

Sin modificar 04A, se reutiliza la cobertura vigente asociada a:

- simulación auditable y no ejecutable;
- actor y sesión reales;
- identidad tipada del escenario;
- separación entre autoridad real y simulada;
- lifecycle y expiración;
- versiones y fingerprints reproducibles;
- auditoría de intentos y eventos;
- mutaciones bloqueadas desde simulación;
- cero efectos empresariales;
- invalidación de contexto y cache;
- paridad de consumidores y canales.

Trazabilidad vigente reutilizada: `TREQ-AUTH-012`, `TREQ-AUTH-079..128`, `TREQ-AUTH-165`, `TREQ-AUTH-279..288` y la cobertura transversal de auditoría, UI y contratos compartidos ya registrada.

Estas referencias son trazabilidad heredada y no representan requisitos creados o modificados por `AUTH-SIM-009`.

#### 82. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | el artefacto de tarea se preparó de forma independiente y todavía no fue incorporado al archivo propietario ni sometido al build documental del checkout del usuario |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron formateador, task quality, delivery check, topología, TREQ ni batería global dentro de un checkout local de `vento-shell` |
| REMOTA | `PASS` | se verificaron en solo lectura la continuidad vigente, owner de `AUTH-SIM-009`, topología `PER_IMPLEMENTATION_UNIT`, gate `POST_E5_PACKAGE`, políticas de formato y desarrollo, contrato de entrega, `AUTH-SIM-007`, `AUTH-SIM-008`, persistencia `AUTH-DB-013`, vocabulario terminal, transiciones e implementación legacy de `@vento/os-context` |
| OPERATIVA | `NOT_EXECUTED` | no se inició, completó, expiró, revocó ni invalidó una simulación real durante esta tarea documental |
| FÍSICA | `NOT_EXECUTED` | no se modificaron servicios, funciones, migraciones, tablas, clientes, aplicaciones, dispositivos, datos ni entornos desplegados |

#### 83. Criterios de aceptación

- [x] Se distingue solicitar salida de confirmar salida.
- [x] Se conserva `EXIT_PENDING` como estado visible, no como evento persistido nuevo.
- [x] `SIMULATION_COMPLETED` queda como commit point de salida voluntaria normal.
- [x] Completion solo se acepta conceptualmente desde `ACTIVE`.
- [x] Se conserva `SIMULATION_EXPIRED` para expiración auditable.
- [x] Se reconoce expiración derivada por `expires_at` sin prolongación local.
- [x] Se conserva `SIMULATION_REVOKED` para revocación.
- [x] Se conserva `SIMULATION_INVALIDATED` para invalidez.
- [x] No se crean aliases terminales nuevos.
- [x] Se conserva un único terminal exitoso por lifecycle.
- [x] Se define idempotencia mediante identidad y fingerprint de operación.
- [x] Se define conflicto ante reutilización incompatible de la operación.
- [x] Doble click y retry no duplican el cierre.
- [x] Una respuesta perdida exige nueva resolución autoritativa.
- [x] Un fallo antes del commit point no se presenta como salida confirmada.
- [x] Intentos fallidos permanecen separados de eventos exitosos.
- [x] Se conserva actor real para salida cuando corresponda.
- [x] Se conserva sesión real cuando corresponda.
- [x] El rol simulado no autoriza la salida.
- [x] El principal técnico no sustituye al actor humano.
- [x] Se distingue terminal de simulación de restauración de contexto real.
- [x] El contexto real se vuelve a resolver desde fuentes reales.
- [x] No se restaura contexto real desde snapshots o storage.
- [x] Ningún `WOULD_ALLOW` se convierte en `ALLOW` al salir.
- [x] La salida no ejecuta la acción simulada.
- [x] Navegación no equivale a salida.
- [x] Cierre de tab no equivale a salida.
- [x] Refresh durante `EXIT_PENDING` vuelve a resolver el lifecycle.
- [x] Offline no confirma completion.
- [x] Cache no resucita terminales.
- [x] Cookies y storage no son evidencia de salida.
- [x] Varias tabs convergen en el estado terminal autoritativo.
- [x] Respuestas tardías no reactivan la simulación.
- [x] Cambio de actor en dispositivo compartido no transfiere la simulación.
- [x] Pérdida de sesión real no crea una sesión simulada autónoma.
- [x] Auditoría permanece append-only.
- [x] Correlación y causación se preservan.
- [x] Fingerprints no se utilizan como credenciales.
- [x] Se minimizan secretos y datos sensibles.
- [x] Se reconoce la fundación física positiva de `AUTH-DB-013`.
- [x] Se reconoce `stop_context_simulation_v1` como compatibilidad legacy neutralizada.
- [x] Se reconoce que `stopContextSimulation` todavía invoca el stop legacy.
- [x] No se presenta la fundación privada como adopción consumidora completa.
- [x] No se reabre `AUTH-DB-013`.
- [x] No se reabre `AUTH-SRV-015`.
- [x] Se define evidencia mínima por futura unidad.
- [x] Se define rollback sin pérdida histórica.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se ejecutan cambios físicos.
- [x] `AUTH-SIM-010` permanece reservada.

#### 84. Límites

Esta tarea no:

- ejecuta una salida real de simulación;
- completa una simulación desplegada;
- expira una simulación desplegada;
- revoca una simulación desplegada;
- invalida una simulación desplegada;
- registra eventos reales;
- modifica `audit.authorization_simulations`;
- modifica `audit.authorization_simulation_revisions`;
- modifica `audit.authorization_simulation_events`;
- modifica `audit.authorization_simulation_attempts`;
- modifica `context_simulation_sessions`;
- modifica Supabase;
- crea migraciones;
- cambia RLS;
- cambia grants;
- cambia funciones;
- habilita o redefine `stop_context_simulation_v1`;
- implementa el servicio autoritativo de salida;
- modifica `@vento/os-context`;
- modifica VISO;
- modifica NEXO;
- modifica FOGO;
- modifica ORIGO;
- modifica PULSO;
- modifica dispositivos;
- cambia roles;
- cambia permisos;
- cambia turnos;
- cambia check-ins;
- implementa bloqueo de acciones críticas;
- implementa modo solo lectura;
- ejecuta pruebas multicanal finales;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `AUTH-SIM-010`.

#### 85. Handoff exacto hacia AUTH-SIM-010

`AUTH-SIM-009` entrega a `AUTH-SIM-010` una frontera de lifecycle inequívoca:

```text
DRAFT / ACTIVE
=
SIMULACION NO TERMINAL
```

```text
COMPLETED / EXPIRED / REVOKED / INVALID
=
SIMULACION TERMINAL
```

`AUTH-SIM-010` deberá impedir que acciones críticas produzcan efectos reales mientras una simulación permanezca en un estado no terminal aplicable o mientras el canal todavía no haya revalidado de forma segura el retorno al contexto real.

El terminal no sustituye la autorización real de la siguiente acción.

---

#### 86. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-SIM-008 — Registrar inicio de simulación`

**TAREA ACTUAL APROBADA**
`AUTH-SIM-009 — Registrar salida de simulación`

**SIGUIENTE TAREA RESERVADA**
`AUTH-SIM-010 — Bloquear acciones críticas durante simulación`


### [ ] AUTH-SIM-010 — Bloquear acciones críticas durante simulación
### [ ] AUTH-SIM-011 — Definir modo solo lectura
