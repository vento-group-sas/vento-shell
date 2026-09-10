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

### [ ] AUTH-SIM-008 — Registrar inicio de simulación
### [ ] AUTH-SIM-009 — Registrar salida de simulación
### [ ] AUTH-SIM-010 — Bloquear acciones críticas durante simulación
### [ ] AUTH-SIM-011 — Definir modo solo lectura
