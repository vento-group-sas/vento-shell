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


### [ ] AUTH-SIM-009 — Registrar salida de simulación
### [ ] AUTH-SIM-010 — Bloquear acciones críticas durante simulación
### [ ] AUTH-SIM-011 — Definir modo solo lectura
