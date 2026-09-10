### MINI-BLOQUE — SESION REVOCACION Y PRUEBAS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **sesion revocacion y pruebas** dentro de **P DISPOSITIVOS COMPARTIDOS**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AUTH-DEV-011` a `AUTH-DEV-016` — 6 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `AUTH-DEV-011`: Permitir revocar un dispositivo
- `AUTH-DEV-012`: Manejar sesión expirada
- `AUTH-DEV-013`: Manejar cambio de trabajador
- `AUTH-DEV-014`: Probar tablets de NEXO
- `AUTH-DEV-015`: Probar terminales de PULSO
- `AUTH-DEV-016`: Probar pantallas de FOGO
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-DEV-011 — Permitir revocar un dispositivo

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría
**Tarea siguiente:** AUTH-DEV-012 — Manejar sesión expirada
**Tipo de tarea:** documental; contrato canónico de revocación operativa de dispositivo compartido y corte fail-closed de su acceso, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/03_SESION_REVOCACION_Y_PRUEBAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo una instancia canónica de dispositivo compartido puede ser revocada y qué efectos obligatorios produce esa revocación sobre autorización, sesiones de actor, contexto derivado, solicitudes en curso, colas offline, credenciales técnicas, auditoría e identidad histórica.

La regla principal queda:

```text
REVOCACION AUTORIZADA DEL DISPOSITIVO
+
ESTADO REVOKED PERSISTIDO Y AUDITABLE
+
INVALIDACION DE AUTORIDAD DERIVADA
+
BLOQUEO SERVER-SIDE EN TODOS LOS CANALES
=
CERO NUEVOS EFECTOS EMPRESARIALES DESDE ESE DISPOSITIVO
```

La revocación no elimina el dispositivo de la historia ni convierte una ausencia de conectividad en revocación. Es una decisión administrativa explícita, atribuible y auditable sobre una identidad canónica de dispositivo.

---

#### 2. Handoff recibido de AUTH-DEV-010

`AUTH-DEV-010` entrega a esta tarea:

```text
DEVICE_ID CANONICO RESOLUBLE
+
PRINCIPAL TECNICO SEPARADO
+
ACTOR HUMANO O ESTADO UNRESOLVED
+
ACTOR_SESSION_ID CUANDO EXISTA
+
DECISION Y RESULTADO CORRELACIONABLES
+
HISTORIA APPEND-ONLY DISPONIBLE
```

`AUTH-DEV-011` consume ese handoff y añade exclusivamente la semántica de revocación del dispositivo.

Se preservan sin modificación:

- la identidad técnica definida por `AUTH-DEV-002`;
- la sede, área, aplicaciones y techo definidos por `AUTH-DEV-003` a `AUTH-DEV-006`;
- la identificación humana de `AUTH-DEV-007`;
- la intersección restrictiva de `AUTH-DEV-008`;
- la no herencia administrativa de `AUTH-DEV-009`;
- la atribución y auditoría conjunta de `AUTH-DEV-010`.

La revocación no reabre ninguna de esas decisiones.

---

#### 3. Definición canónica de revocación

Una revocación de dispositivo es una transición administrativa explícita que declara que una identidad canónica de dispositivo ya no puede utilizarse para producir nuevos efectos empresariales.

La transición contractual es:

```text
DISPOSITIVO CANONICO ELEGIBLE
->
DECISION DE REVOCACION AUTORIZADA
->
ESTADO REVOKED
->
DISPOSITIVO NO ELEGIBLE PARA AUTORIZACION EMPRESARIAL
```

Propiedades obligatorias:

1. se aplica a un `device_id` canónico único;
2. se autoriza en servidor;
3. se evalúa contra el estado vigente del dispositivo;
4. conserva actor administrativo o fuente autorizada de la decisión;
5. conserva motivo o razón estructurada cuando el contrato aplicable la exija;
6. produce historia append-only;
7. invalida la autoridad derivada del dispositivo;
8. no borra la identidad;
9. no libera el código para reutilización;
10. no depende de que una interfaz concreta permanezca abierta;
11. no depende de que el token técnico haya expirado;
12. no puede revertirse por un simple cambio visual o una escritura local.

---

#### 4. Revocación no equivale a suspensión, retiro ni fallo técnico

Los estados y operaciones permanecen separados:

| Concepto | Semántica | ¿Puede producir nuevos efectos empresariales? | Recuperación |
| --- | --- | ---: | --- |
| `ACTIVE` | dispositivo elegible sujeto al resto de controles | solo si toda la autorización produce `ALLOW` | no aplica |
| `SUSPENDED` | bloqueo temporal o preventivo | no | requiere reanudación autorizada según su contrato |
| `REVOKED` | autoridad de uso del dispositivo retirada explícitamente | no | solo mediante recuperación explícita y auditable si el contrato físico la admite |
| `RETIRED` | identidad retirada del servicio y conservada históricamente | no | no se trata como simple reanudación |
| `CONFLICTED` | identidad o configuración incompatible | no | exige reconciliación |
| indisponibilidad técnica | el dispositivo o una dependencia no responde | no demuestra revocación | recuperación técnica no cambia por sí sola el estado canónico |

Queda prohibido:

```text
SUSPENDED = REVOKED
```

```text
REVOKED = RETIRED
```

```text
OFFLINE = REVOKED
```

```text
TOKEN EXPIRADO = DISPOSITIVO REVOCADO
```

La revocación es una decisión de lifecycle. La suspensión, el retiro, la expiración de sesión y la indisponibilidad conservan propietarios y semánticas independientes.

---

#### 5. Identidad objetivo de la revocación

La revocación se dirige al `device_id` canónico resuelto en servidor.

No se revoca una instancia canónica por inferencia desde:

- `device_code` recibido sin resolución;
- etiqueta visible;
- IP;
- MAC;
- serial;
- user agent;
- fingerprint de navegador;
- `navigation_role`;
- aplicación abierta;
- sede o área seleccionada;
- observación física sin enrolamiento;
- email técnico aislado;
- identificador de trabajador;
- nombre de plantilla.

Estas señales pueden ayudar a localizar o diagnosticar, pero la transición autoritativa debe resolver un único dispositivo canónico.

Una identidad ambigua, duplicada, conflictiva o no resoluble bloquea la operación de revocación hasta reconciliación; no se elige el primer candidato.

---

#### 6. Autoridad para revocar

La revocación es una acción administrativa protegida.

Debe cumplirse:

```text
PRINCIPAL REAL
+
ACTOR EFECTIVO O DELEGACION VALIDA
+
CAPACIDAD ADMINISTRATIVA EXACTA
+
COBERTURA Y ALCANCE VALIDOS
+
DEVICE_ID RESUELTO
+
ESTADO ACTUAL VALIDO
+
AUSENCIA DE DENEGACIONES
=
SOLICITUD DE REVOCACION AUTORIZABLE
```

Esta tarea no crea una clave de permiso nueva ni fija una clave textual por conveniencia.

La capacidad aplicable debe provenir del catálogo y de la operación server-side propietaria vigente.

No constituyen autoridad para revocar:

- el nombre del rol;
- `navigation_role`;
- ser el trabajador que usa actualmente el dispositivo;
- conocer el PIN de un trabajador;
- poseer el dispositivo físicamente;
- estar en la misma sede;
- haber creado originalmente la cuenta técnica;
- utilizar `service_role`;
- tener una sesión técnica del propio dispositivo;
- enviar `is_active=false` o `activation_status=revoked` desde el cliente.

---

#### 7. Resolución obligatoria en servidor

La solicitud del cliente solo expresa intención.

Antes de persistir una revocación, el servidor debe resolver como mínimo:

- identidad del caller;
- actor efectivo o delegación válida;
- capacidad requerida;
- alcance administrativo;
- `device_id` objetivo;
- identidad técnica vinculada;
- estado vigente;
- revisión o versión vigente cuando corresponda;
- conflictos activos;
- sesiones de actor asociadas;
- referencias de contexto que deban invalidarse;
- decisión de autorización;
- correlación e idempotencia aplicables.

Queda prohibido aceptar del cliente como hechos autoritativos:

- estado actual;
- actor administrativo;
- trabajador activo;
- revisión actual;
- motivo privilegiado no validado;
- timestamps de autoridad;
- flags de autorización;
- confirmación de cierre de sesiones;
- confirmación de revocación de credenciales.

---

#### 8. Estado resultante

Una revocación exitosa produce semánticamente:

```text
device lifecycle state = REVOKED
business eligibility = DENIED
new business effects = 0
historical identity = PRESERVED
audit history = APPEND_ONLY
```

El dispositivo deja de ser una fuente elegible de contexto autorizativo para nuevas operaciones.

Cualquier resolutor de dispositivo deberá tratar `REVOKED` como estado bloqueante.

La existencia de una sesión Auth técnica todavía válida, un refresh token pendiente de expirar, una app abierta, una ruta cargada, una conexión Realtime, un estado de UI anterior, una cola offline o una respuesta en caché no neutraliza el estado `REVOKED`.

---

#### 9. Efecto sobre el principal técnico

Revocar el dispositivo no convierte al principal técnico en un usuario humano ni borra automáticamente su historia.

El principal técnico asociado queda inutilizable como base de autorización empresarial para ese `device_id`.

La implementación física deberá asegurar que una credencial técnica todavía aceptada por la capa de autenticación no pueda producir efectos empresariales después de la revocación.

Por tanto:

```text
AUTH TECNICA AUN VIGENTE
+
DEVICE_STATE = REVOKED
=
DENY EMPRESARIAL
```

El bloqueo empresarial no puede depender exclusivamente de esperar a que caduque el token técnico.

La revocación o rotación física de credenciales puede producir evidencia específica adicional, pero no sustituye la verificación server-side del estado del dispositivo.

---

#### 10. Efecto sobre sesiones de actor

Toda sesión de actor vinculada al dispositivo revocado deja de ser utilizable para autorización empresarial desde la frontera efectiva de revocación.

La regla es:

```text
DEVICE REVOKED
->
TODAS LAS ACTOR SESSIONS DEL DEVICE DEJAN DE SER ELEGIBLES
```

Cuando existan sesiones abiertas, la materialización deberá cerrarlas o marcarlas como revocadas de forma correlacionable con la revocación del dispositivo.

La historia de esas sesiones se conserva.

No se permite:

- mantener al trabajador activo sobre un dispositivo revocado;
- transferir la sesión a otro dispositivo;
- reutilizar `actor_session_id` después de la revocación;
- reabrir una sesión anterior al recuperar el dispositivo;
- conservar una firma o reautenticación como autoridad portable.

`AUTH-DEV-012` conserva la expiración temporal de sesiones.

`AUTH-DEV-013` conserva el cambio ordinario de trabajador.

El cierre de sesiones provocado por revocación del dispositivo no absorbe esas responsabilidades.

---

#### 11. Efecto sobre contexto, caché y autoridad derivada

La revocación invalida cualquier contexto o resultado cuya validez dependa del dispositivo.

Debe dejar de ser utilizable como autoridad:

- `DeviceContext` previo;
- `AccessContext` que incluya el dispositivo revocado;
- decisiones de autorización cacheadas;
- techo de permisos cacheado;
- conjunto de aplicaciones cacheado;
- sede o área derivadas dentro de ese snapshot;
- firma ligera vinculada a una operación pendiente;
- evidencia STRONG vinculada al dispositivo o sesión revocados;
- recursos sensibles abiertos bajo autoridad anterior;
- formularios con autorización precalculada;
- tokens derivados de contexto cuando existan;
- resultados de preflight autorizativo obsoletos.

La invalidación no significa borrar historia. Significa impedir su reutilización autoritativa.

---

#### 12. Todos los canales deben fallar cerrado

La revocación debe observarse en toda frontera capaz de producir o exponer un efecto protegido.

Incluye, según corresponda:

- launcher;
- navegación protegida;
- React Server Components;
- Server Actions;
- Route Handlers;
- API;
- RPC/PostgREST;
- RLS/Data API;
- Edge Functions;
- Realtime;
- clientes nativos;
- colas offline;
- jobs;
- workers;
- webhooks;
- integraciones;
- impresión o notificación con efecto sensible.

Una UI que oculta botones no satisface el contrato.

Una ruta directa o llamada RPC no puede continuar operando porque la pantalla de administración ya haya mostrado el dispositivo como revocado.

---

#### 13. Solicitudes offline y sincronización

Una operación capturada antes de la revocación y sincronizada después no conserva automáticamente la autoridad anterior.

Al sincronizar debe existir una evaluación fresca.

Regla:

```text
REQUEST CAPTURADA ANTES
+
DEVICE REVOKED ANTES DE SINCRONIZAR
=
REAUTORIZAR
->
DENY POR ESTADO DEL DISPOSITIVO
```

No se permite replay automático con una decisión anterior, reutilizar un token de contexto viejo, tratar la hora de captura como permiso para ejecutar después ni ejecutar una cola porque el dispositivo estaba activo cuando quedó offline.

La idempotencia puede identificar el mismo intento lógico, pero no restaura autoridad vencida.

---

#### 14. Concurrencia y operaciones en curso

La revocación debe tener una frontera de efecto reproducible.

Una operación que todavía no ha producido su efecto empresarial debe revalidar el estado autoritativo del dispositivo en la frontera aplicable antes del commit o efecto externo.

Si la revocación ya es efectiva:

```text
NO NUEVO EFECTO EMPRESARIAL
```

Si una operación empresarial ya fue confirmada antes de la revocación:

- su historia permanece válida;
- la revocación no reescribe ese evento;
- no se afirma rollback automático;
- cualquier compensación pertenece al contrato del dominio que produjo el efecto.

Las carreras entre revocación y otras mutaciones deben utilizar estado/revisión vigente, correlación e idempotencia según los contratos físicos aplicables y nunca elegir silenciosamente el resultado más permisivo.

---

#### 15. Auditoría de la revocación

La fundación append-only de auditoría de dispositivos ya contempla la semántica de revocación.

La materialización deberá correlacionar, cuando aplique:

```text
revision_kind = REVOCATION
lifecycle_state = REVOKED
event_type = DEVICE_REVOKED
```

La evidencia de revocación debe permitir reconstruir:

- `device_id`;
- revisión previa y resultante;
- actor administrativo o fuente autorizada;
- decisión de autorización;
- timestamp del hecho;
- correlación;
- causación cuando exista;
- motivo o razón estructurada;
- estado resultante;
- sesiones de actor afectadas;
- credenciales o endpoints afectados cuando correspondan;
- resultado de la operación.

Cuando la revocación provoque además hechos distintos, se conservan como eventos correlacionables separados, por ejemplo revocación de sesión de actor, credencial o endpoint.

No se inventa un único evento compuesto que borre esas fronteras.

---

#### 16. Revocación e inmutabilidad histórica

La revocación no elimina:

- `device_id`;
- `device_code`;
- vínculo histórico con plantillas;
- revisiones anteriores;
- eventos anteriores;
- sesiones de actor históricas;
- decisiones de autorización históricas;
- evidencia de operaciones ya ejecutadas;
- referencias de activo o endpoint históricas;
- observaciones y correcciones auditables.

La historia conserva el estado que era válido en cada momento.

Una consulta histórica no debe reinterpretar una acción antigua como si el dispositivo hubiese estado revocado desde siempre.

---

#### 17. No reutilización de identidad

Un dispositivo revocado no libera su identidad para que otro equipo adopte el mismo `device_id` o `device_code`.

Queda prohibido:

```text
DEVICE A REVOKED
->
REUTILIZAR SU IDENTIDAD PARA DEVICE B
```

Una reinstalación o reemplazo de hardware que pretenda conservar la misma identidad lógica deberá pasar por el flujo autorizado correspondiente, con endpoint y vínculo técnico nuevos cuando aplique.

La revocación no es un atajo para renombrar, reciclar o clonar una identidad.

---

#### 18. Recuperación después de revocación

`REVOKED` no se trata como una suspensión temporal que pueda deshacerse mediante un simple `resume`, toggle de interfaz o cambio local.

Si el contrato físico admite recuperación del mismo dispositivo lógico, deberá ser explícita, autorizada, auditada, versionada y compatible con la identidad original; además deberá revalidar bindings, configuración y credenciales aplicables, resolver contexto fresco y no reactivar sesiones ni decisiones anteriores.

La fundación de lifecycle distingue eventos de recuperación de los de suspensión y revocación.

Esta tarea no define un procedimiento físico de recovery ni autoriza ejecutarlo.

---

#### 19. Revocación de dispositivo frente a revocación de endpoint o credencial

Las siguientes operaciones no son equivalentes:

```text
DEVICE_REVOKED
CREDENTIAL_REVOKED
ENDPOINT_REVOKED
```

Revocar una credencial comprometida no implica por sí solo retirar para siempre la identidad lógica del dispositivo.

Revocar un endpoint por reinstalación o reemplazo tampoco implica por sí solo revocar el dispositivo lógico.

Revocar el dispositivo sí bloquea toda nueva autoridad empresarial proveniente de esa identidad, aunque todavía deba completarse técnicamente la revocación de credenciales o endpoints asociados.

La implementación deberá conservar la correlación entre estos hechos cuando ocurran juntos.

---

#### 20. Revocación frente a retiro

`REVOKED` y `RETIRED` conservan significados distintos.

La revocación retira la capacidad de uso del dispositivo.

El retiro representa la salida del dispositivo del servicio y su conservación como identidad histórica retirada.

No se exige retirar automáticamente todo dispositivo revocado.

Tampoco puede un dispositivo retirado volver a operar mediante una simple reversión de la revocación.

La política completa de retiro permanece en el lifecycle físico y en los propietarios que correspondan; esta tarea fija únicamente que ninguna de las dos condiciones concede acceso.

---

#### 21. Revocación por offboarding de una persona

La finalización o suspensión laboral de una persona puede provocar revocaciones coordinadas cuando esa persona tenga dispositivos o credenciales aplicables.

Sin embargo:

```text
EMPLEADO INACTIVO
!=
DISPOSITIVO AUTOMATICAMENTE REVOKED
```

Un trabajador inactivo deja de ser actor elegible, pero el dispositivo compartido puede continuar siendo una estación válida para otro trabajador si su propio lifecycle sigue activo.

La revocación del dispositivo debe producirse cuando exista una decisión administrativa aplicable sobre esa identidad de dispositivo, no por inferencia desde la inactividad de cualquier actor que lo utilizó.

El offboarding integral conserva su propietario transversal y no es redefinido aquí.

---

#### 22. Cambio de sede, área, aplicaciones o paquete

Cambiar una dimensión material del dispositivo puede exigir suspender, conflictuar, invalidar o revisar su contexto según los contratos ya aprobados.

No todo cambio implica revocación definitiva.

Queda prohibido usar `REVOKED` como cajón genérico para sede inválida, área inválida, aplicación ausente, paquete inconsistente, plantilla incompatible, falta de sesión de actor, expiración, indisponibilidad o conflicto de identidad.

Cada causa conserva su estado y propietario.

Cuando una política específica exige revocación, la transición debe quedar explícita y auditable; no se deriva solo de que otra validación haya fallado.

---

#### 23. Estado del actor después de revocar

Tras la revocación del dispositivo:

```text
DEVICE = REVOKED
ACTOR SESSION ON DEVICE = NOT ELIGIBLE
BUSINESS AUTHORITY THROUGH DEVICE = NONE
```

Esto no modifica por sí solo la identidad laboral del trabajador, su rol base, asignaciones, turno fuera de este dispositivo, permisos propios, capacidad de usar otro dispositivo autorizado o una sesión personal independiente.

La revocación corta el carril del dispositivo, no desactiva a la persona.

---

#### 24. Presentación y experiencia

La experiencia puede mostrar que el dispositivo ya no está disponible para operación, pero la presentación no es la fuente de verdad.

Debe evitar:

- sugerir que cambiar de trabajador desbloquea un dispositivo revocado;
- pedir un PIN como mecanismo para superar la revocación;
- ofrecer reintentos automáticos de acciones mutantes;
- exponer credenciales, políticas internas o actores elegibles;
- convertir un error técnico en revocación;
- borrar evidencia local antes de confirmar el estado de servidor cuando sea necesaria para soporte.

Los códigos públicos y mensajes específicos permanecen gobernados por los contratos transversales de bloqueo y no se redefinen en esta tarea.

---

#### 25. Estado físico observado

La revisión documental reconoce:

1. la fundación append-only de auditoría de dispositivos está materializada y verificada;
2. el catálogo físico de lifecycle contempla estado `REVOKED`, revisión `REVOCATION` y evento `DEVICE_REVOKED`;
3. la validación server-side aprobada ya exige que un dispositivo revocado no produzca efectos empresariales;
4. existen dos instancias configuradas registralmente, pero siguen sin certificación física u operativa integral;
5. las fuentes de aplicación consultadas no demuestran una operación administrativa de revocación completa adoptada por los consumidores;
6. la presentación administrativa observada reconoce el estado revocado, pero mostrar un estado no demuestra enforcement;
7. la adopción progresiva de writers y objetos físicos continúa bajo los propietarios ya definidos.

Por tanto:

```text
CONTRATO DE REVOCACION = ESPECIFICADO
FUNDACION DE AUDITORIA = MATERIALIZADA
ADOPCION OPERATIVA INTEGRAL = NO DEMOSTRADA
CERTIFICACION FISICA = NO REALIZADA
```

No se autoriza ninguna corrección física durante este marcador documental.

---

#### 26. Matriz de revocación sobre las 19 identidades heredadas

La tarea consume exactamente el universo documental de 19 identidades aprobado por `AUTH-DEV-001` a `AUTH-DEV-006`.

| `inventory_key` | Clase / estado heredado | Decisión de revocación | Resultado documental |
| --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` / `REGISTERED_UNVERIFIED` | Puede ser objetivo de revocación únicamente mediante su `device_id` canónico resuelto y una decisión administrativa autorizada; la fila registral no demuestra que el equipo físico observado sea el mismo. | Contrato definido; revocación física no ejecutada. |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` / `REGISTERED_UNVERIFIED` | Puede ser objetivo de revocación únicamente mediante identidad canónica resuelta; `same_site_active_worker`, `navigation_role` y coincidencia de sede no autorizan ni revierten la revocación. | Contrato definido; revocación física no ejecutada. |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` / `OBSERVED_ONLY` | No puede recibir una revocación canónica de `device_id` mientras no exista identidad y enrolamiento reconciliados; la observación puede motivar contención operativa, pero no se fabrica identidad. | No revocable como instancia canónica todavía. |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` / `OBSERVED_ONLY` | No puede recibir una revocación canónica de `device_id` mientras no exista identidad y enrolamiento reconciliados. | No revocable como instancia canónica todavía. |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla no se revoca como si fuera un dispositivo; cada futura instancia tiene lifecycle propio y puede ser revocada individualmente. | Política de instancia definida; plantilla preservada. |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla no se revoca mediante `DEVICE_REVOKED`; futuras instancias sí quedan sujetas al contrato. | Política de instancia definida. |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla no se revoca mediante `DEVICE_REVOKED`; futuras instancias sí quedan sujetas al contrato. | Política de instancia definida. |
| `target_template:service_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla no se revoca mediante `DEVICE_REVOKED`; futuras instancias sí quedan sujetas al contrato. | Política de instancia definida. |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla no se revoca mediante `DEVICE_REVOKED`; futuras instancias sí quedan sujetas al contrato. | Política de instancia definida. |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla no se revoca mediante `DEVICE_REVOKED`; cada endpoint lógico materializado conserva revocación individual. | Política de instancia definida. |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla conserva su definición; una instancia concreta de Cocina Caliente puede revocarse sin revocar otras instancias productivas. | Revocación individual por instancia. |
| `target_template:production_bakery` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla conserva su definición; una instancia concreta de Galletería y Panadería puede revocarse sin revocar otras instancias productivas. | Revocación individual por instancia. |
| `target_template:production_pastry` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla conserva su definición; una instancia concreta de Repostería puede revocarse sin revocar otras instancias productivas. | Revocación individual por instancia. |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla permanece; una instancia concreta de kiosco puede revocarse y debe cortar actor sessions y autoridad sin trasladarlas a otro kiosco. | Revocación individual por instancia. |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La plantilla permanece; la ruta, vehículo, origen o destino no identifican la instancia a revocar. | Revocación individual exige `device_id` resuelto. |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | Revocar la instancia corta tanto su modo administrativo como operativo; no se permite mantener un modo activo después de revocar la identidad del dispositivo. | Ambos modos bloqueados para la instancia revocada. |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | La amplitud funcional de la plantilla no cambia la semántica: revocar una instancia corta toda su elegibilidad empresarial. | Revocación individual por instancia. |
| `target_template:management_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | Revocar una instancia corta toda operación administrativa desde esa identidad aunque el humano posea permisos legítimos por otro canal. | Autoridad del humano no rescata al dispositivo revocado. |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` / `NO_APLICA` | No es una instancia revocable y no admite nuevas instancias; su historia permanece retirada. | `NO_APLICA` como objetivo de revocación de dispositivo. |

Control de cardinalidad:

```text
TOTAL ESPERADO: 19
TOTAL MATERIALIZADO EN MATRIZ: 19

CONFIGURED_INSTANCE: 2
PHYSICAL_OBSERVATION: 2
TARGET_TEMPLATE: 14
RETIRED_LEGACY_TEMPLATE: 1

FALTANTES: 0
DUPLICADOS: 0
```

La matriz no crea nuevos dispositivos ni convierte plantillas u observaciones en instancias.

---

#### 27. Casos especiales

##### 27.1 `procurement_reception`

La instancia puede operar bajo modos excluyentes, pero la revocación se aplica a la identidad completa del dispositivo.

No existe:

```text
DEVICE REVOKED EN MODO OPERATIVO
+
DEVICE ACTIVO EN MODO ADMINISTRATIVO
```

ni la relación inversa.

La revocación del dispositivo tiene precedencia sobre el modo.

##### 27.2 `operations_management_terminal`

Revocar la instancia bloquea toda su superficie empresarial.

No se permite que una app todavía abierta o una operación de coordinación en curso continúe por la amplitud funcional de la plantilla.

##### 27.3 `management_terminal`

Los permisos administrativos legítimos pertenecen al actor humano.

Si el dispositivo está revocado, esos permisos podrán seguir existiendo para el humano en otros canales autorizados, pero no pueden ejecutarse a través de la identidad revocada.

##### 27.4 Plantillas productivas

Revocar una instancia de un área productiva no revoca automáticamente otras instancias, plantillas ni trabajadores del área.

La revocación es por identidad de dispositivo, salvo que otra operación administrativa explícita tenga un alcance mayor definido por su propio contrato.

---

#### 28. Fallos y decisiones fail-closed

La operación de revocación no debe producir un estado parcialmente permisivo.

Casos que bloquean o exigen reconciliación:

1. `device_id` inexistente;
2. más de un dispositivo candidato;
3. conflicto de identidad;
4. revisión o estado esperado obsoleto;
5. actor administrativo no resoluble;
6. falta de capacidad administrativa;
7. alcance insuficiente;
8. fuente autoritativa no disponible;
9. intento de usar una observación física como `device_id`;
10. intento de revocar una plantilla mediante el lifecycle de instancia;
11. transición incompatible con el estado actual;
12. fallo al persistir la evidencia obligatoria cuando el contrato la exige antes del efecto.

Un fallo técnico no se degrada a éxito ni a revocación asumida.

Cuando no puede saberse si el estado cambió después de iniciar una operación no atómica, se requiere reconciliación; no se afirma falsamente que el dispositivo quedó revocado ni que quedó activo.

---

#### 29. Idempotencia

Repetir la misma solicitud lógica de revocación no debe crear historias contradictorias ni reactivar el dispositivo.

La idempotencia debe distinguir:

```text
MISMA OPERACION LOGICA YA CONFIRMADA
->
MISMO RESULTADO OBSERVABLE / NO-OP CONFIRMADO
```

de:

```text
NUEVA SOLICITUD CON ESTADO O INTENCION DISTINTOS
->
NUEVA EVALUACION
```

Una idempotency key no concede permiso, no reemplaza la revalidación de estado, no permite saltar una denegación, no autoriza recovery y no reutiliza una decisión antigua después de cambios materiales.

---

#### 30. Relación con AUTH-SRV-010

`AUTH-SRV-010` exige que una escritura protegida desde dispositivo compartido valide que el dispositivo es utilizable y no está revocado.

`AUTH-DEV-011` especializa el origen de ese estado y sus consecuencias:

```text
AUTH-DEV-011
-> define como se retira la elegibilidad del dispositivo

AUTH-SRV-010
-> exige observar ese estado antes del efecto empresarial
```

Ninguno sustituye al otro.

La materialización por unidad deberá demostrar que un dispositivo `REVOKED` falla cerrado aunque la sesión técnica continúe autenticada.

---

#### 31. Relación con AUTH-DB-014

La fundación de auditoría de dispositivo permanece propietaria de la persistencia append-only de lifecycle.

`AUTH-DEV-011` consume, sin redefinir:

- revisiones de dispositivo;
- estado `REVOKED`;
- revisión `REVOCATION`;
- evento `DEVICE_REVOKED`;
- correlación;
- eventos de sesión, credencial o endpoint cuando realmente ocurran;
- correcciones append-only.

No crea una tabla nueva ni un writer alternativo.

---

#### 32. Relación con AUTH-DB-035

La revocación es un cambio material de dispositivo y debe invalidar la frescura del contexto que dependa de él.

`AUTH-DB-035` conserva la fundación física de generaciones e invalidación de contexto.

`AUTH-DEV-011` no redefine esa infraestructura.

Su obligación es que, una vez efectiva la revocación, ningún snapshot, caché, respuesta tardía o derivación anterior pueda seguir autorizando a través del dispositivo revocado.

---

#### 33. Relación con AUTH-DB-020

La adopción progresiva de writers, superficies y compatibilidad física continúa bajo `AUTH-DB-020` cuando corresponda.

Esta tarea no migra consumidores legacy.

La coexistencia temporal de superficies no permite dos fuentes de autoridad para el estado de revocación.

Cualquier adapter legacy deberá converger al mismo estado canónico y no podrá mantener activa una ruta antigua después de que el dispositivo esté revocado.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

Requisitos creados: 0.

Requisitos modificados: 0.

La tarea desarrolla una obligación ya registrada para el ciclo auditable y la revocación de dispositivos compartidos y no altera el registro modular de requisitos de prueba.

---

#### 35. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificación:

- `TREQ-AUTH-003` — ciclo auditable completo de dispositivo compartido, incluida revocación, sin conservar acceso después de quedar inactivo;
- `TREQ-AUTH-011` — separación e intersección entre dispositivo, principal y trabajador identificado;
- `TREQ-AUTH-014` — invalidación comprobable de contexto, caché y tokens derivados ante cambios materiales, con reautorización de colas offline;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas;
- `TREQ-AUTH-016` — revocación coordinada de accesos aplicables durante offboarding sin borrar historia;
- `TREQ-AUTH-020` — `device_id` y `device_code` estables y no reutilizables;
- `TREQ-AUTH-025` — reinstalación con endpoint y vínculo nuevos mediante recuperación autorizada;
- `TREQ-AUTH-026` — reemplazo de hardware explícito con preservación de cadena histórica;
- `TREQ-AUTH-027` — conflictos de identidad bloquean acciones hasta reconciliación;
- `TREQ-AUTH-034` — cambio de sede invalida sesiones, contexto y cachés y conserva historia;
- `TREQ-AUTH-044` — cambio de política de área termina sesiones incompatibles e invalida autoridad derivada;
- `TREQ-AUTH-055` — cambio del conjunto de aplicaciones invalida contexto y reautenticaciones;
- `TREQ-AUTH-065` — cambio de paquete o reducción invalida sesiones y autoridad afectada;
- `TREQ-AUTH-269` — una restricción concluyente de dispositivo compartido produce cero efectos empresariales;
- `TREQ-AUTH-271` — la instancia debe resolver estado y revocación de forma única y fail-closed;
- `TREQ-AUTH-273` — la sesión de actor y el estado de dispositivo participan en la decisión sin transferir autoridad;
- `TREQ-AUTH-277` — bloqueo, invalidación y auditoría mínima ante restricciones de dispositivo.

Estos identificadores se citan únicamente como trazabilidad de cobertura existente y no representan cambios al registro.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación canónica deberá ejecutarse después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores contra el checkout local del usuario durante la preparación documental. |
| REMOTA | `NOT_EXECUTED` | Se consultaron fuentes remotas vigentes como auditoría estática, pero no se ejecutó un gate remoto de esta tarea. |
| OPERATIVA | `NOT_APPLICABLE` | La tarea no revoca dispositivos reales ni modifica operación empresarial durante su definición documental. |
| FÍSICA | `NOT_APPLICABLE` | La materialización pertenece a una futura instancia `PER_IMPLEMENTATION_UNIT` gobernada por `POST_E5_PACKAGE`. |

---

#### 37. Criterios de aceptación

- [x] La revocación se define sobre un `device_id` canónico único.
- [x] La revocación exige una decisión administrativa server-side.
- [x] No se crea un permiso nuevo por conveniencia.
- [x] `REVOKED` bloquea nuevos efectos empresariales.
- [x] Una sesión técnica todavía válida no neutraliza `REVOKED`.
- [x] Las sesiones de actor del dispositivo dejan de ser elegibles tras la revocación.
- [x] La revocación no desactiva por inferencia al trabajador humano.
- [x] La revocación invalida contexto y autoridad derivados del dispositivo.
- [x] Las colas offline reautorizan y no ejecutan con autoridad previa.
- [x] Las solicitudes en curso revalidan el estado en la frontera autoritativa aplicable.
- [x] Los efectos ya confirmados antes de la revocación no se reescriben.
- [x] Suspensión, revocación, retiro e indisponibilidad conservan semánticas distintas.
- [x] Revocación de dispositivo, credencial y endpoint conservan eventos y fronteras distintas.
- [x] La identidad e historia del dispositivo se preservan.
- [x] `device_id` y `device_code` no se reutilizan por revocar.
- [x] Un recovery eventual debe ser explícito y auditable.
- [x] Un simple `resume`, toggle o login no reactiva un dispositivo revocado.
- [x] Se consume `DEVICE_REVOKED` sin inventar un evento nuevo.
- [x] Se mantiene la fundación append-only de `AUTH-DB-014`.
- [x] Se mantiene la invalidación física propietaria de `AUTH-DB-035`.
- [x] Se mantiene la adopción de writers propietaria de `AUTH-DB-020`.
- [x] Se mantiene la validación server-side propietaria de `AUTH-SRV-010`.
- [x] Se cubren exactamente las 19 identidades heredadas.
- [x] La matriz conserva distribución 2 + 2 + 14 + 1.
- [x] Las observaciones físicas no reciben `device_id` por inferencia.
- [x] Las plantillas no se revocan como instancias.
- [x] `procurement_reception` queda completamente bloqueado en ambos modos cuando la instancia está revocada.
- [x] `management_terminal` no puede usar permisos humanos legítimos a través de una identidad revocada.
- [x] No se absorbe la expiración temporal de `AUTH-DEV-012`.
- [x] No se absorbe el cambio ordinario de trabajador de `AUTH-DEV-013`.
- [x] No se ejecutan pruebas físicas de `AUTH-DEV-014` a `AUTH-DEV-016`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autorizan cambios físicos.

---

#### 38. Handoff exacto hacia AUTH-DEV-012

`AUTH-DEV-011` entrega a `AUTH-DEV-012` una frontera de lifecycle donde el estado del dispositivo tiene precedencia sobre la validez temporal de una sesión de actor.

Handoff:

```text
DEVICE_ID CANONICO RESUELTO
+
DEVICE LIFECYCLE STATE RESUELTO
+
REVOKED => CERO AUTORIDAD EMPRESARIAL
+
ACTOR SESSIONS DEL DEVICE REVOKED NO ELEGIBLES
+
HISTORIA Y TIMESTAMPS AUDITABLES
+
CONTEXTO STALE NO REUTILIZABLE
```

`AUTH-DEV-012` podrá definir cuándo una sesión de actor todavía asociada a un dispositivo elegible se considera expirada y qué respuesta produce.

La expiración no podrá reactivar un dispositivo revocado ni reinterpretar su historia.

Esta tarea no fija duración numérica, TTL, ventana de gracia ni renovación de sesión.

---

#### 39. Límites

Esta tarea no:

- modifica código;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica RPC;
- modifica grants;
- modifica Auth;
- revoca usuarios técnicos reales;
- invalida tokens reales;
- modifica dispositivos reales;
- cambia configuración de VISO, NEXO, FOGO, PULSO u otras aplicaciones;
- crea un nuevo permiso de administración de dispositivos;
- redefine los códigos públicos de error;
- redefine la identidad del dispositivo;
- cambia sede, área, aplicaciones o techo;
- redefine la firma o PIN del trabajador;
- redefine la intersección de autoridad;
- redefine la no herencia administrativa;
- redefine la auditoría general de acciones protegidas;
- crea tablas o eventos nuevos de auditoría;
- migra writers legacy;
- ejecuta recovery;
- define el procedimiento final de retiro;
- fija TTL, duración, gracia o expiración numérica de sesiones;
- define el cambio ordinario de trabajador;
- ejecuta pruebas físicas de tablets, terminales POS o pantallas;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- asigna ni autoriza una instancia física durante este trabajo documental.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-011 — Permitir revocar un dispositivo`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-012 — Manejar sesión expirada`


### ✅ AUTH-DEV-012 — Manejar sesión expirada

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-011 — Permitir revocar un dispositivo
**Tarea siguiente:** AUTH-DEV-013 — Manejar cambio de trabajador
**Tipo de tarea:** documental; contrato canónico de vigencia, expiración e inactividad de sesiones de actor en dispositivos compartidos, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/03_SESION_REVOCACION_Y_PRUEBAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cuándo una sesión de actor de dispositivo compartido permanece vigente, cuándo queda expirada, qué límites temporales corresponden a cada perfil de dispositivo, cómo se trata la inactividad y qué efectos obligatorios produce la pérdida de vigencia sobre actor efectivo, autorización, contexto, caché, operaciones pendientes y recuperación.

La regla principal queda:

```text
SESION DE ACTOR
+
TIEMPO DE SERVIDOR CONFIABLE
+
POLITICA TEMPORAL DEL PERFIL
+
CONTEXTO TODAVIA VIGENTE
=
ACTOR CANDIDATO MIENTRAS resolved_at < expires_at
```

y:

```text
resolved_at >= expires_at
->
SESION EXPIRADA
->
ACTOR NO RESUELTO EN EL CONTEXTO EFECTIVO
->
CERO NUEVOS EFECTOS EMPRESARIALES HASTA NUEVA IDENTIFICACION
```

La expiración temporal no revoca el dispositivo, no desactiva al trabajador y no convierte el principal técnico en actor humano.

---

#### 2. Handoff recibido de AUTH-DEV-011

`AUTH-DEV-011` entrega:

```text
DEVICE_ID CANONICO RESUELTO
+
DEVICE LIFECYCLE STATE RESUELTO
+
REVOKED => CERO AUTORIDAD EMPRESARIAL
+
ACTOR SESSIONS DEL DEVICE REVOKED NO ELEGIBLES
+
HISTORIA Y TIMESTAMPS AUDITABLES
+
CONTEXTO STALE NO REUTILIZABLE
```

`AUTH-DEV-012` consume ese handoff y añade exclusivamente la política temporal de una sesión de actor cuando el dispositivo todavía es elegible.

Se preservan sin modificación:

- identidad técnica y lifecycle del dispositivo;
- separación entre principal técnico y actor humano;
- identificación ligera del trabajador;
- intersección entre autoridad humana y techo del dispositivo;
- prohibición de herencia administrativa;
- auditoría conjunta de dispositivo y trabajador;
- precedencia del estado `REVOKED`;
- bloqueo fail-closed de un dispositivo inválido, suspendido, revocado o conflictuado.

---

#### 3. Unidad temporal autoritativa

La sesión de actor conserva conceptualmente, como mínimo:

```text
device_id
employee_id
shift_id
site_id
area_id
operational_role
started_at
expires_at
ended_at
```

La vigencia temporal se evalúa con tiempo confiable de servidor.

Queda prohibido usar como autoridad temporal:

- reloj del navegador;
- reloj del teléfono o tablet;
- timestamp enviado por cliente;
- tiempo desde el último render;
- contador JavaScript;
- estado React;
- cookie no firmada;
- valor de Local Storage;
- hora del último heartbeat como sustituto de `expires_at`;
- hora mostrada en pantalla.

El cliente puede mostrar una cuenta regresiva aproximada, pero la decisión efectiva se resuelve con `resolved_at` server-side.

---

#### 4. Frontera exacta de expiración

La frontera temporal es inclusiva:

```text
resolved_at < expires_at
->
SESION TEMPORALMENTE VIGENTE
```

```text
resolved_at >= expires_at
->
SESION EXPIRADA
```

No existe una ventana implícita de gracia después de `expires_at`.

Una comparación por fecha truncada, minuto redondeado, zona horaria visual o reloj local no puede extender la sesión.

El timestamp deberá compararse como instante absoluto.

---

#### 5. Regla de `actor_session_id` y `actor_session_expires_at`

El contexto efectivo conserva las invariantes:

```text
actor_session_id = null
->
actor_session_expires_at = null
```

```text
actor_session_id != null
+
actor_session_expires_at = null
->
SESION INVALIDA
->
ACTOR NO RESUELTO
```

```text
resolved_at >= actor_session_expires_at
->
actor_session_id = null EN EL CONTEXTO EFECTIVO
+
actor_session_expires_at = null EN EL CONTEXTO EFECTIVO
+
actor_effective = UNRESOLVED PARA ACCIONES EMPRESARIALES
```

La fila histórica de sesión puede conservar su identidad y timestamps. El contrato de contexto elimina su uso autoritativo, no su evidencia.

---

#### 6. Duración máxima no deslizante

Cada sesión recibe al crearse un `expires_at` fijo:

```text
expires_at
=
started_at
+
hard_ttl_del_perfil
```

El límite duro es **no deslizante**.

No lo extienden:

- actividad continua;
- cambio de pantalla;
- navegación;
- cambio de aplicación;
- heartbeat;
- consulta de configuración;
- refresh del frontend;
- nuevo fetch;
- presencia física;
- toque de pantalla;
- lectura de código;
- check-in todavía vigente;
- turno todavía vigente;
- permiso todavía vigente;
- firma ligera;
- reautenticación fuerte de una acción.

Una sesión que llega a su límite duro termina para autorización aunque el mismo trabajador continúe presente.

---

#### 7. Taxonomía temporal por riesgo

Se aprueban cuatro clases temporales para las plantillas vigentes:

| Clase | Riesgo y entorno | `hard_ttl` | `idle_lock` | Regla |
| --- | --- | ---: | ---: | --- |
| `CRITICAL_ADMIN_SHARED` | terminal compartida con capacidad administrativa sensible y alta concentración de acciones STRONG | 15 min | 3 min | máxima reducción de permanencia de actor; STRONG continúa independiente |
| `HIGH_SHARED_INTERACTION` | caja, servicio, mostrador, barra, operación integrada, recepción mixta o coordinación amplia | 30 min | 5 min | alta exposición, rotación o impacto; reidentificación frecuente sin exigir login personal completo |
| `CONTROLLED_OPERATIONAL` | operación interna o móvil controlada con actor individual y menor exposición pública directa | 60 min | 10 min | equilibrio entre continuidad operacional y abandono de estación |
| `CONTINUOUS_PRODUCTION` | estación interna de producción con interacción sostenida, manos ocupadas y baja rotación esperada | 120 min | 15 min | reduce interrupción en producción sin permitir sesión de turno completo |

Los valores son máximos autorizativos, no mínimos de permanencia.

Una instancia puede utilizar un `hard_ttl` o `idle_lock` menor por una política más restrictiva, pero nunca uno mayor que el máximo de su plantilla.

---

#### 8. Matriz temporal de las 14 plantillas objetivo

| Plantilla | Clase temporal | `hard_ttl` | `idle_lock` | Justificación operativa |
| --- | --- | ---: | ---: | --- |
| `pos_satellite` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | caja compartida, operación transaccional y superficie PULSO; actor debe revalidarse con frecuencia |
| `bar_satellite` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | estación compartida de alta rotación y posible consumo de PULSO/NEXO |
| `kitchen_satellite` | `CONTROLLED_OPERATIONAL` | 60 min | 10 min | cocina de sede, back-of-house y operación continua dentro de área exacta |
| `service_satellite` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | uso compartido de servicio con exposición pública y cambios frecuentes de trabajador |
| `counter_satellite` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | mostrador compartido, atención pública y riesgo de abandono breve |
| `integrated_satellite` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | estación multifunción de formato pequeño con mayor amplitud de acciones |
| `production_kitchen` | `CONTINUOUS_PRODUCTION` | 120 min | 15 min | operación interna prolongada en Cocina Caliente con manos ocupadas y contexto estable |
| `production_bakery` | `CONTINUOUS_PRODUCTION` | 120 min | 15 min | producción interna prolongada en Galletería y Panadería |
| `production_pastry` | `CONTINUOUS_PRODUCTION` | 120 min | 15 min | producción interna prolongada en Repostería |
| `warehouse_kiosk` | `CONTROLLED_OPERATIONAL` | 60 min | 10 min | estación fija interna de bodega con operación repetitiva y actor individual |
| `logistics_vehicle_terminal` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | terminal móvil, exposición por desplazamiento y mayor riesgo de pérdida o relevo |
| `procurement_reception` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | modos operativo y administrativo excluyentes; recepción y decisiones de mayor impacto |
| `operations_management_terminal` | `HIGH_SHARED_INTERACTION` | 30 min | 5 min | coordinación amplia sobre cinco aplicaciones y acciones de impacto transversal |
| `management_terminal` | `CRITICAL_ADMIN_SHARED` | 15 min | 3 min | terminal administrativa con concentración de capacidades STRONG; el actor nunca permanece indefinidamente |

Control:

```text
PLANTILLAS ESPERADAS: 14
PLANTILLAS MATERIALIZADAS: 14
FALTANTES: 0
DUPLICADOS: 0
```

---

#### 9. Herencia restrictiva de la política temporal

La plantilla fija el máximo.

La instancia puede reducir:

```text
hard_ttl_instancia <= hard_ttl_plantilla
idle_lock_instancia <= idle_lock_plantilla
```

No puede ampliar:

```text
hard_ttl_instancia > hard_ttl_plantilla
->
CONFIGURACION INVALIDA
```

```text
idle_lock_instancia > idle_lock_plantilla
->
CONFIGURACION INVALIDA
```

Una reducción debe ser explícita, versionada y auditable.

No se acepta como reducción:

- configuración local no gobernada;
- variable del navegador;
- query string;
- bandera de UI;
- preferencia del trabajador;
- valor almacenado en el dispositivo sin fuente server-side;
- copia legacy no reconciliada.

---

#### 10. Política de las dos instancias configuradas

Las dos instancias registrales conservan su estado `REGISTERED_UNVERIFIED`.

##### 10.1 `CAJA_VENTO_CAFE_01`

La instancia conserva como plantilla candidata `pos_satellite`.

Mientras esa equivalencia no esté físicamente certificada, la política temporal aplicable a la futura materialización no se considera demostrada en el equipo observado.

Cuando el vínculo de plantilla quede resuelto y no exista una reducción más estricta:

```text
hard_ttl_max = 30 min
idle_lock_max = 5 min
```

No se infiere cumplimiento porque la fila esté activa.

##### 10.2 `KIOSCO_BODEGA_CP`

La instancia conserva como plantilla candidata `warehouse_kiosk`.

Cuando el vínculo de plantilla quede resuelto y no exista una reducción más estricta:

```text
hard_ttl_max = 60 min
idle_lock_max = 10 min
```

La política actual `same_site_active_worker` no sustituye identificación humana ni vigencia temporal de la sesión.

---

#### 11. Observaciones físicas sin identidad

Las observaciones:

```text
physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida
physical_observation:SAUDO/SERVICIO/dispositivo_compartido
```

no reciben un TTL autoritativo por inferencia.

La observación puede sugerir una familia funcional, pero no demuestra:

- `device_id`;
- plantilla exacta;
- clase temporal;
- política de instancia;
- actor session;
- vínculo técnico;
- cumplimiento de timeout.

Hasta enrolamiento y reconciliación:

```text
POLITICA TEMPORAL DE INSTANCIA = NO RESUELTA
```

---

#### 12. Plantilla retirada

`production_center` permanece retirada.

No recibe una política temporal para nuevas instancias.

Las instancias legacy que todavía requieran transición conservan historia y deberán migrarse explícitamente a una plantilla vigente antes de considerar conforme una nueva sesión de actor.

No se permite usar el valor de 120 minutos de las plantillas productivas especializadas como fallback automático para `production_center`.

---

#### 13. Inactividad y bloqueo

`idle_lock` es una frontera diferente del vencimiento duro.

La regla conceptual es:

```text
last_activity_at + idle_lock <= resolved_at
->
SUPERFICIE BLOQUEADA PARA NUEVAS MUTACIONES
```

El bloqueo por inactividad:

- no extiende `expires_at`;
- no convierte la actividad física en identidad;
- no puede resolverse por un toque anónimo;
- no puede resolverse por heartbeat;
- no puede resolverse solo porque el turno continúe vigente;
- no puede resolverse con el último actor supuesto.

Antes de `expires_at`, una política de reentrada aprobada puede volver a comprobar al mismo trabajador y reactivar la superficie sin ampliar el límite duro original.

Si durante el bloqueo se alcanza `expires_at`, la sesión ya no puede reanudarse y se requiere una sesión nueva.

---

#### 14. `last_activity_at` no es autoridad suficiente

La actividad puede indicar uso reciente, pero no demuestra quién usó el dispositivo.

Solo se consideran señales de actividad para control de inactividad aquellas producidas por una interacción admitida del flujo actual.

No se considerarán actividad válida por sí solas:

- heartbeat automático;
- polling;
- refresh en background;
- recepción de Realtime;
- timer;
- animación;
- telemetría periódica;
- notificación push;
- servicio técnico;
- proceso de sincronización sin actor;
- simple movimiento del equipo.

El objetivo es evitar que procesos automáticos mantengan una estación desbloqueada indefinidamente.

---

#### 15. Expiración no depende de un job de limpieza

La autoridad termina por comparación temporal aun si la fila persistida todavía conserva:

```text
ended_at = null
```

Por tanto:

```text
resolved_at >= expires_at
```

es suficiente para excluir la sesión del contexto efectivo.

Un proceso posterior puede materializar el cierre persistente y la auditoría correspondiente, pero un retraso en ese proceso no prolonga autoridad.

Queda prohibido:

```text
NO CORRIO EL JOB DE EXPIRACION
->
SESION SIGUE AUTORIZANDO
```

---

#### 16. Efecto sobre el actor efectivo

Cuando la sesión expira:

```text
actor_effective = UNRESOLVED
```

para cualquier acción empresarial originada desde ese dispositivo.

El trabajador anterior:

- no se conserva como fallback;
- no se reconstruye desde la UI;
- no se reconstruye desde el turno;
- no se reconstruye desde el check-in;
- no se reconstruye desde el último evento;
- no se reconstruye desde una firma anterior;
- no se reconstruye desde `navigation_role`.

La identidad laboral del trabajador no se elimina. Solo termina su relación temporal autoritativa con ese dispositivo.

---

#### 17. Efecto sobre la identidad técnica del dispositivo

Un dispositivo todavía elegible puede permanecer técnicamente autenticado después de que expire su actor session.

El estado resultante es:

```text
DEVICE PRINCIPAL = DISPONIBLE SEGUN SU LIFECYCLE
ACTOR HUMANO = NO RESUELTO
ACCIONES TECNICAS EXPRESAMENTE ADMITIDAS = POSIBLES
ACCIONES EMPRESARIALES QUE EXIGEN HUMANO = NO EJECUTABLES
```

La expiración del actor no obliga por sí sola a:

- revocar el dispositivo;
- cerrar el usuario Auth técnico;
- retirar el endpoint;
- rotar credenciales;
- cambiar sede;
- cambiar área;
- cambiar aplicaciones;
- cambiar paquete.

---

#### 18. Estado interactivo después de expirar

Cuando:

```text
DEVICE = ELEGIBLE
+
ACTOR SESSION = EXPIRADA
+
ACCION REQUIERE ACTOR HUMANO
```

el resultado de interacción es:

```text
ACTOR_IDENTIFICATION_REQUIRED
```

Ese estado:

- es auxiliar e interactivo;
- no es un `AuthorizationReasonCode`;
- no utiliza por sí mismo `403`;
- no se mapea a un bloqueo del dispositivo;
- no reanuda automáticamente la mutación;
- exige una intención nueva después de identificar al actor.

El mensaje no debe presentar la expiración normal como si el dispositivo estuviera revocado o el trabajador careciera de permisos.

---

#### 19. Precedencia frente a dispositivo revocado o inválido

La expiración no oculta un bloqueo de dispositivo más fuerte.

Si el dispositivo es:

- revocado;
- suspendido;
- retirado;
- conflictuado;
- no resoluble;
- estructuralmente inválido;

no se ofrece la identificación del actor como mecanismo para superar ese estado.

La precedencia es:

```text
DISPOSITIVO NO ELEGIBLE
->
BLOQUEO DEL DISPOSITIVO
```

y no:

```text
DISPOSITIVO NO ELEGIBLE
+
SESION EXPIRADA
->
PEDIR PIN Y CONTINUAR
```

`AUTH-DEV-011` conserva la propiedad del lifecycle de revocación.

---

#### 20. Relación con turno y check-in

La sesión de actor no sustituye el contexto laboral.

Una sesión puede expirar antes del turno o check-in.

También puede perder elegibilidad antes de su `expires_at` si el contexto requerido deja de ser válido.

Regla:

```text
expires_at
=
MAXIMO TEMPORAL DE LA SESION
```

No significa:

```text
SESION GARANTIZADA HASTA expires_at
```

Un cambio o cierre de:

- turno;
- check-in;
- rol operativo;
- sede;
- área;
- asignación;
- estado laboral;
- permiso material;

puede invalidar la autoridad antes de `expires_at`.

La expiración temporal es una de varias fronteras de vigencia.

---

#### 21. Relación con reautenticación fuerte

La sesión de actor y la reautenticación fuerte permanecen separadas.

```text
ACTOR SESSION VIGENTE
!=
STRONG REAUTH VIGENTE
```

```text
STRONG REAUTH EXITOSA
!=
EXTENSION DE ACTOR SESSION
```

Una acción `STRONG_REAUTH_REQUIRED` continúa exigiendo prueba fuerte personal conforme a su contrato aunque falten segundos para el vencimiento de la actor session.

La evidencia STRONG:

- no cambia `started_at`;
- no cambia `expires_at`;
- no evita `idle_lock`;
- no puede sobrevivir a una expiración cuando esté vinculada a esa sesión o contexto;
- no sustituye la nueva identificación posterior al vencimiento.

---

#### 22. Renovación prohibida en sitio

Una sesión expirada no se renueva modificando su `expires_at`.

Queda prohibido:

```text
SESSION_A EXPIRED
->
UPDATE SESSION_A.expires_at
->
SESSION_A ACTIVE OTRA VEZ
```

La continuidad segura es:

```text
SESSION_A EXPIRA
->
ACTOR NO RESUELTO
->
NUEVA PRUEBA HUMANA
->
CONTEXTO RECONSTRUIDO
->
SESSION_B NUEVA
->
NUEVO started_at
+
NUEVO expires_at
```

La nueva sesión debe tener un identificador distinto y no heredar autoridad stale de la anterior.

---

#### 23. Reentrada antes del vencimiento

Un bloqueo por inactividad antes del límite duro puede admitir reentrada rápida cuando la clase de identificación aprobada lo permita.

La reentrada debe:

1. comprobar al humano real;
2. comprobar que la sesión original no haya expirado;
3. comprobar que el dispositivo siga elegible;
4. revalidar contexto material;
5. limpiar estados incompatibles;
6. conservar el `expires_at` original;
7. no elevar el nivel de garantía;
8. no reutilizar una STRONG reauth caducada o de otra acción.

Si cualquiera de esas condiciones falla, se inicia el flujo de nueva sesión o el bloqueo propietario correspondiente.

---

#### 24. Cambio de aplicación

Cambiar de aplicación no renueva la sesión.

Todas las aplicaciones efectivas del mismo dispositivo observan el mismo límite temporal del actor session.

```text
SESSION started_at = T0
expires_at = T1
APP A -> APP B
```

conserva:

```text
expires_at = T1
```

El cambio de aplicación puede además invalidar recursos, estado o reautenticaciones específicas según contratos anteriores.

---

#### 25. Varias pestañas, ventanas o clientes

Una misma actor session no adquiere una vida independiente por cada pestaña, ventana, WebView o aplicación.

Al llegar a `expires_at`, todas las superficies que dependan de esa sesión dejan de poder utilizarla.

Una superficie desactualizada no puede continuar porque aún muestre:

- nombre del actor;
- rol;
- sede;
- área;
- controles habilitados;
- información cacheada.

La siguiente acción protegida debe observar la vigencia real.

---

#### 26. Offline, colas y sincronización

Una acción capturada mientras la sesión estaba vigente no conserva automáticamente esa autoridad para ejecución posterior.

Caso:

```text
CAPTURA: resolved_at < expires_at
SINCRONIZACION: resolved_at >= expires_at
```

Resultado:

```text
REAUTORIZAR
->
SESION ANTERIOR NO ELEGIBLE
->
NO EJECUTAR CON AUTORIDAD HISTORICA
```

La operación puede conservar como evidencia quién la preparó, pero la ejecución posterior deberá cumplir el contrato de sincronización y autorización aplicable.

No se permite:

- usar la hora de captura como bypass;
- reusar un token de contexto previo;
- reusar un `ALLOW` almacenado;
- reanudar automáticamente después de identificar a otra persona;
- atribuir al actor nuevo una mutación preparada por el anterior.

---

#### 27. Operaciones en curso y frontera de efecto

Una operación ya confirmada antes de `expires_at` conserva su actor histórico.

Una operación todavía no comprometida al alcanzar la frontera debe revalidar.

```text
EFECTO EMPRESARIAL CONFIRMADO ANTES DE expires_at
->
CONSERVAR RESULTADO Y ATRIBUCION ORIGINAL
```

```text
EFECTO TODAVIA NO CONFIRMADO
+
resolved_at >= expires_at
->
NO PRODUCIR NUEVO EFECTO BAJO LA SESION EXPIRADA
```

La expiración no fabrica rollback retroactivo.

Si existe resultado incierto, el flujo de idempotencia y reconciliación del dominio decide el estado real; nunca se repite la mutación solo porque el actor vuelva a identificarse.

---

#### 28. Concurrencia

Para una estación secuencial se conserva una sola sesión de actor elegible por instante.

Casos:

```text
0 sesiones elegibles
->
ACTOR_IDENTIFICATION_REQUIRED CUANDO EL DEVICE SEA ELEGIBLE
```

```text
1 sesion elegible
->
CANDIDATA PARA ACTOR EFECTIVO
```

```text
2 o mas sesiones incompatibles
->
INCONSISTENCIA
->
NO ELEGIR LA MAS RECIENTE
->
NO PRODUCIR EFECTO EMPRESARIAL
```

La expiración de una de varias filas no autoriza elegir silenciosamente otra si la integridad del conjunto no puede resolverse de forma inequívoca.

---

#### 29. Ausencia, invalidez y fallo técnico

Se distinguen:

| Estado | Significado | Tratamiento |
| --- | --- | --- |
| sesión ausente | no existe actor session candidata | solicitar identificación si el dispositivo es elegible |
| sesión expirada | existe historia, pero `resolved_at >= expires_at` | excluir del contexto efectivo y solicitar nueva identificación |
| expiración ausente con sesión | forma temporal inválida | fail closed; no asumir sesión infinita |
| sesión cerrada | ya no es candidata | no reabrir por inferencia |
| sesión revocada | ya no es candidata | no reabrir |
| sesiones múltiples incompatibles | identidad ambigua | inconsistencia; no elegir una |
| fuente temporal no disponible | no puede saberse el estado vigente | fallo técnico; no presentar como expiración confirmada |
| reloj confiable no disponible | no puede establecerse la frontera | fallo técnico; no usar reloj cliente |

Un fallo técnico no se convierte en `ACTOR_IDENTIFICATION_REQUIRED` si la ausencia de actor no pudo demostrarse concluyentemente.

---

#### 30. Versionado de la política temporal

Los valores temporales pertenecen a una política gobernada.

Todo cambio futuro debe:

- ser explícito;
- conservar versión;
- justificar riesgo y operación;
- mantener trazabilidad por plantilla;
- revalidar instancias;
- invalidar sesiones que dependan de una política incompatible;
- conservar historia.

Una nueva política más larga no extiende sesiones ya creadas.

Una nueva política más corta no se aplica mediante edición silenciosa del `expires_at` existente; la transición física deberá invalidar las sesiones afectadas y exigir una nueva sesión bajo la política vigente.

---

#### 31. Auditoría de expiración

La expiración debe poder reconstruirse sin almacenar secretos.

La evidencia mínima correlacionable incluye, cuando aplique:

- `device_id`;
- `actor_session_id`;
- actor histórico de la sesión;
- `started_at`;
- `expires_at`;
- instante de detección o cierre;
- razón de cierre;
- política temporal o versión aplicable;
- contexto relevante;
- correlación;
- efectos pendientes conocidos;
- resultado del intento posterior a expiración.

La auditoría no convierte la sesión expirada en autoridad.

No se registra PIN, secreto, token completo ni material de reautenticación reutilizable.

---

#### 32. Estado físico observado

La revisión documental reconoce:

1. el contrato compartido ya expone `actor_session_id` y `actor_session_expires_at`;
2. el contexto canónico ya define que `resolved_at >= actor_session_expires_at` elimina al actor session del contexto efectivo;
3. la fundación física de contexto utiliza `actor_session_expires_at` como frontera temporal;
4. la estructura documental de actor session contempla `started_at`, `expires_at` y `ended_at`;
5. los helpers actuales observados en NEXO, PULSO y FOGO no exponen `actor_session_id` ni `actor_session_expires_at` dentro de su `OperationalSession`;
6. esos helpers observados continúan resolviendo el dispositivo compartido sin demostrar consumo de una actor session vigente;
7. las pruebas físicas específicas permanecen reservadas a `AUTH-DEV-014`, `AUTH-DEV-015` y `AUTH-DEV-016`.

Resultado:

```text
CONTRATO TEMPORAL DE CONTEXTO = EXISTENTE
POLITICA NUMERICA POR PERFIL = DEFINIDA POR ESTA TAREA
ADOPCION INTEGRAL EN CONSUMIDORES = NO DEMOSTRADA
CERTIFICACION FISICA = NO REALIZADA
```

Esta tarea no modifica esos consumidores.

---

#### 33. Matriz de cobertura sobre las 19 identidades heredadas

| `inventory_key` | Clase | Política temporal | Estado documental |
| --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` | candidato `pos_satellite`: 30 min hard / 5 min idle, sujeto a vínculo de plantilla y reducción explícita | `REGISTERED_UNVERIFIED`; cumplimiento físico no demostrado |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` | candidato `warehouse_kiosk`: 60 min hard / 10 min idle, sujeto a vínculo de plantilla y reducción explícita | `REGISTERED_UNVERIFIED`; cumplimiento físico no demostrado |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` | no asignar TTL por inferencia | `OBSERVED_ONLY` |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` | no asignar TTL por inferencia | `OBSERVED_ONLY` |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` | 60 min hard / 10 min idle | `POLICY_DEFINED` |
| `target_template:service_satellite` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` | 120 min hard / 15 min idle | `POLICY_DEFINED` |
| `target_template:production_bakery` | `TARGET_TEMPLATE` | 120 min hard / 15 min idle | `POLICY_DEFINED` |
| `target_template:production_pastry` | `TARGET_TEMPLATE` | 120 min hard / 15 min idle | `POLICY_DEFINED` |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` | 60 min hard / 10 min idle | `POLICY_DEFINED` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` | 30 min hard / 5 min idle | `POLICY_DEFINED` |
| `target_template:management_terminal` | `TARGET_TEMPLATE` | 15 min hard / 3 min idle | `POLICY_DEFINED` |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` | no recibe política para nuevas instancias | `NO_APLICA` |

Control:

```text
TOTAL ESPERADO: 19
TOTAL MATERIALIZADO: 19

CONFIGURED_INSTANCE: 2
PHYSICAL_OBSERVATION: 2
TARGET_TEMPLATE: 14
RETIRED_LEGACY_TEMPLATE: 1

FALTANTES: 0
DUPLICADOS: 0
```

---

#### 34. Casos especiales por plantilla

##### 34.1 `management_terminal`

Su sesión de actor tiene máximo de 15 minutos y bloqueo por inactividad a los 3 minutos.

Las acciones STRONG siguen exigiendo reautenticación independiente.

El terminal no obtiene cobertura administrativa por mantener una sesión viva.

##### 34.2 `operations_management_terminal`

Su sesión máxima es 30 minutos y su amplitud de aplicaciones no permite prolongarla.

La coordinación de varias áreas o aplicaciones no suma tiempo ni autoridad.

##### 34.3 `procurement_reception`

Los modos operativo y administrativo son excluyentes, pero ambos comparten la misma frontera temporal de actor de 30 minutos y 5 minutos de inactividad.

Cambiar de modo no renueva la sesión.

##### 34.4 `logistics_vehicle_terminal`

Ruta, desplazamiento, GPS, origen o destino no reinician ni extienden la sesión.

La movilidad justifica el perfil de 30 minutos y bloqueo de 5 minutos.

##### 34.5 Plantillas productivas

Las tres plantillas productivas especializadas usan 120 minutos de máximo duro y 15 minutos de inactividad por su operación interna continua.

Ese máximo no equivale a una sesión de turno completo y no elimina controles de check-in, contexto o STRONG.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

La política temporal desarrolla obligaciones de prueba ya registradas para expiración, invalidación de contexto, reautorización, interacción de identificación y dispositivos compartidos. No altera el registro modular vigente.

---

#### 36. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificación:

- `TREQ-AUTH-003` — incluye expiración dentro del ciclo auditable del dispositivo compartido;
- `TREQ-AUTH-011` — exige actor humano real e intersección de autoridad en dispositivo compartido;
- `TREQ-AUTH-014` — asigna expresamente a `AUTH-DEV-012` la invalidación por expiración de sesión, incluyendo contexto, caché, tokens derivados y reautorización offline;
- `TREQ-AUTH-015` — exige evidencia correlacionable de decisiones y acciones protegidas;
- `TREQ-AUTH-016` — exige cierre coordinado de sesiones y autoridad durante offboarding cuando corresponda;
- `TREQ-AUTH-054` — cambio de aplicación o actor limpia estado incompatible y reautenticaciones;
- `TREQ-AUTH-063` — mantiene separadas sesión STANDARD, reautenticación STRONG y capacidades no admitidas;
- `TREQ-AUTH-145` — invalida contexto, caché, decisiones y sesión de actor ante inactividad de identidad aplicable;
- `TREQ-AUTH-267` — cambios materiales invalidan snapshots y prohíben autoridad stale en caché, offline, Realtime y replay;
- `TREQ-AUTH-269` — protege la frontera de dispositivo compartido sin convertir identidad técnica en autoridad;
- `TREQ-AUTH-271` — exige resolución determinista del estado del dispositivo;
- `TREQ-AUTH-273` — exige sesión única y vigente del actor cuando corresponda;
- `TREQ-AUTH-277` — exige invalidación, recuperación segura y auditoría mínima en dispositivos compartidos;
- `TREQ-AUTH-331` — mantiene `ACTOR_IDENTIFICATION_REQUIRED` y `STRONG_REAUTHENTICATION_REQUIRED` como estados interactivos auxiliares fuera de `AuthorizationReasonCode`.

Estas referencias son trazabilidad de cobertura existente y no representan cambios al registro.

---

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores contra el checkout local durante la preparación del artefacto. |
| REMOTA | `NOT_EXECUTED` | Se inspeccionaron fuentes remotas vigentes, pero no se ejecutó un gate remoto de esta tarea. |
| OPERATIVA | `NOT_APPLICABLE` | La tarea no cambia sesiones reales, trabajadores ni operación de estaciones durante su definición documental. |
| FÍSICA | `NOT_APPLICABLE` | La materialización futura pertenece a unidades `PER_IMPLEMENTATION_UNIT` después del gate `POST_E5_PACKAGE`. |

---

#### 38. Criterios de aceptación

- [x] La vigencia se decide con tiempo server-side.
- [x] La frontera es `resolved_at < expires_at`.
- [x] En `resolved_at >= expires_at` la sesión queda expirada.
- [x] Una sesión con expiración ausente no se interpreta como infinita.
- [x] `actor_session_id` expirada desaparece del contexto efectivo.
- [x] El trabajador anterior no se usa como fallback.
- [x] El dispositivo técnico puede permanecer autenticado sin actor humano.
- [x] Expiración de actor no equivale a revocación del dispositivo.
- [x] Se define un límite duro no deslizante.
- [x] Actividad, heartbeat y cambio de aplicación no extienden el límite duro.
- [x] Se definen cuatro clases temporales por perfil y riesgo.
- [x] Las 14 plantillas reciben una decisión numérica exacta.
- [x] Una instancia solo puede reducir los máximos de su plantilla.
- [x] `idle_lock` permanece separado de `expires_at`.
- [x] Procesos automáticos no cuentan como presencia humana.
- [x] Una sesión expirada no se renueva editando `expires_at`.
- [x] Continuar después de expiración exige una sesión nueva.
- [x] STRONG reauth no extiende actor session.
- [x] Cambiar de app o modo no extiende actor session.
- [x] La expiración no depende de un job de limpieza.
- [x] Operaciones offline se reautorizan al sincronizar.
- [x] Operaciones no confirmadas revalidan antes del efecto.
- [x] Operaciones confirmadas antes del vencimiento conservan su autoría.
- [x] Fallo técnico no se presenta como expiración confirmada.
- [x] Dos sesiones incompatibles no se resuelven eligiendo la más reciente.
- [x] `ACTOR_IDENTIFICATION_REQUIRED` se conserva como estado interactivo, no como `403`.
- [x] Dispositivo revocado tiene precedencia sobre reidentificación.
- [x] Las dos instancias configuradas conservan estado `REGISTERED_UNVERIFIED`.
- [x] Las dos observaciones físicas no reciben TTL por inferencia.
- [x] `production_center` permanece retirada.
- [x] La matriz cubre exactamente las 19 identidades heredadas.
- [x] Se conserva la distribución 2 + 2 + 14 + 1.
- [x] No se absorbe el cambio ordinario de trabajador de `AUTH-DEV-013`.
- [x] No se ejecutan las pruebas físicas de `AUTH-DEV-014` a `AUTH-DEV-016`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autorizan cambios físicos.

---

#### 39. Handoff exacto hacia AUTH-DEV-013

`AUTH-DEV-012` entrega a `AUTH-DEV-013` una sesión temporal inequívoca:

```text
DEVICE ELEGIBLE
+
ACTOR_SESSION_ID UNICO
+
started_at SERVER-SIDE
+
expires_at FIJO SEGUN PERFIL
+
resolved_at < expires_at
=
ACTOR SESSION TEMPORALMENTE ELEGIBLE
```

y:

```text
resolved_at >= expires_at
->
ACTOR SESSION NO ELEGIBLE
->
ACTOR EFFECTIVE UNRESOLVED
->
NUEVA IDENTIFICACION REQUERIDA
```

`AUTH-DEV-013` conserva exclusivamente la responsabilidad de definir el cambio ordinario de un trabajador A a un trabajador B sobre un dispositivo todavía elegible, incluyendo cierre, limpieza, no herencia y establecimiento de la nueva sesión.

La expiración de A no autoriza atribuir trabajo pendiente a B.

---

#### 40. Límites

Esta tarea no:

- modifica código;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica RPC;
- modifica grants;
- modifica Auth;
- crea jobs;
- modifica datos reales;
- cierra sesiones reales;
- crea actor sessions reales;
- revoca dispositivos;
- rota credenciales;
- modifica endpoints;
- modifica trabajadores;
- modifica turnos;
- modifica check-ins;
- cambia roles;
- cambia permisos;
- cambia sede o área;
- cambia aplicaciones o paquetes del dispositivo;
- redefine la identidad del dispositivo;
- redefine la identificación por PIN o firma ligera;
- convierte PIN ligero en STRONG;
- redefine la revocación aprobada por `AUTH-DEV-011`;
- define el cambio ordinario de trabajador de `AUTH-DEV-013`;
- ejecuta pruebas físicas de `AUTH-DEV-014`, `AUTH-DEV-015` o `AUTH-DEV-016`;
- modifica NEXO, PULSO, FOGO u otra aplicación consumidora;
- modifica el contrato público de errores;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- asigna identidad a observaciones físicas;
- certifica ninguna de las dos instancias registradas.

---

#### 41. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-011 — Permitir revocar un dispositivo`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-012 — Manejar sesión expirada`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-013 — Manejar cambio de trabajador`


### ✅ AUTH-DEV-013 — Manejar cambio de trabajador

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-012 — Manejar sesión expirada
**Tarea siguiente:** AUTH-DEV-014 — Probar tablets de NEXO
**Tipo de tarea:** documental; contrato canónico de cambio secuencial de trabajador, cierre e invalidación del actor anterior, limpieza de estado sensible y establecimiento independiente del nuevo actor en dispositivo compartido, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/03_SESION_REVOCACION_Y_PRUEBAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo un dispositivo compartido todavía elegible cambia del trabajador A al trabajador B sin mantener simultáneamente dos actores mutantes, sin editar la identidad humana de una sesión existente, sin transferir autoridad, contexto, reautenticaciones o estado sensible del actor anterior y sin perder la atribución del trabajo empresarial ya confirmado o pendiente.

La regla principal queda:

```text
DEVICE ELEGIBLE
+
SESSION_A VIGENTE
+
SOLICITUD EXPLICITA DE CAMBIO
->
BLOQUEAR NUEVAS MUTACIONES DE A
->
CLASIFICAR TRABAJO PENDIENTE
->
CERRAR SESSION_A
->
INVALIDAR AUTORIDAD Y ESTADO DE A
->
LIMPIAR ESTADO PERSONAL Y SENSIBLE
->
SIN ACTOR EFECTIVO
->
IDENTIFICAR B INDEPENDIENTEMENTE
->
RESOLVER CONTEXTO B DESDE FUENTES VIGENTES
->
CREAR SESSION_B NUEVA
->
RECOMPONER SUPERFICIE
->
B COMO UNICO ACTOR EFECTIVO
```

El cambio de trabajador es una transición de identidad humana sobre un principal técnico estable. No es una revocación del dispositivo, una renovación de la sesión anterior ni una reasignación automática del trabajo empresarial.

---

#### 2. Handoff recibido de AUTH-DEV-012

`AUTH-DEV-012` entrega una sesión temporal inequívoca:

```text
DEVICE ELEGIBLE
+
ACTOR_SESSION_ID UNICO
+
started_at SERVER-SIDE
+
expires_at FIJO SEGUN PERFIL
+
resolved_at < expires_at
=
ACTOR SESSION TEMPORALMENTE ELEGIBLE
```

y:

```text
resolved_at >= expires_at
->
ACTOR SESSION NO ELEGIBLE
->
ACTOR EFFECTIVE UNRESOLVED
->
NUEVA IDENTIFICACION REQUERIDA
```

`AUTH-DEV-013` consume esa semántica y añade exclusivamente el cambio ordinario entre trabajadores mientras el dispositivo permanezca elegible.

Se preservan sin modificación:

- identidad técnica y lifecycle del dispositivo;
- separación entre principal técnico y actor humano;
- identificación ligera y firma de acción;
- intersección restrictiva entre autoridad humana y techo del dispositivo;
- prohibición de herencia administrativa;
- auditoría conjunta de dispositivo y trabajador;
- revocación de `AUTH-DEV-011`;
- expiración y política temporal de `AUTH-DEV-012`.

---

#### 3. Resultado canónico

El cambio de trabajador queda regido por estas invariantes:

1. una estación secuencial tendrá como máximo un actor humano elegible para nuevas mutaciones;
2. el cambio debe ser explícito y no puede inferirse desde presencia, último PIN, navegación, turno, sede, área o actividad reciente;
3. la sesión del trabajador A deja de ser elegible antes de habilitar nuevas mutaciones del trabajador B;
4. la sesión A no se transforma en la sesión B;
5. B debe identificarse de forma independiente;
6. el contexto de B debe resolverse de nuevo desde fuentes server-side vigentes;
7. B recibe una sesión nueva con identidad y temporalidad propias;
8. ningún permiso, rol, cobertura, turno, check-in, reautenticación, firma o decisión de A se hereda;
9. todo estado personal o sensible de A se limpia o se neutraliza antes de exponerlo a B;
10. el trabajo empresarial confirmado conserva la autoría original;
11. el trabajo pendiente no se reenvía ni se atribuye a B por el solo hecho del cambio;
12. cualquier transferencia empresarial entre A y B requiere un handoff explícito cuando el proceso lo permita;
13. un fallo durante la transición no restaura silenciosamente a A;
14. una revocación o invalidez del dispositivo tiene precedencia y bloquea la creación de B.

---

#### 4. Cambio de trabajador no es mutación de una sesión existente

Queda prohibido modelar el cambio así:

```text
SESSION_A.employee_id = B
```

o mediante cualquier equivalente que conserve la misma identidad de sesión y sustituya al humano.

La transición correcta es:

```text
SESSION_A
device_id = D
employee_id = A
estado = NO ELEGIBLE DESPUES DEL CIERRE
```

seguida por:

```text
SESSION_B
device_id = D
employee_id = B
nuevo actor_session_id
nuevo started_at
nuevo expires_at
nuevo contexto resuelto
```

La historia de A permanece asociada a A.

La nueva sesión no reutiliza como autoridad:

- `actor_session_id` de A;
- `started_at` de A;
- `expires_at` de A;
- contexto laboral u operativo de A;
- evidencia de firma de A;
- evidencia STRONG de A;
- decisiones cacheadas de A.

---

#### 5. Principal técnico durante el cambio

El principal autenticado del dispositivo puede permanecer estable durante el cambio:

```text
PRINCIPAL TECNICO = DEVICE D
ACTOR A = TERMINA
ACTOR B = SE RESUELVE DESPUES
```

El dispositivo no se convierte en A ni en B.

Durante la ventana sin actor humano:

```text
DEVICE PRINCIPAL = ELEGIBLE SEGUN LIFECYCLE
ACTOR HUMANO = UNRESOLVED
ACCIONES TECNICAS EXPRESAMENTE ADMITIDAS = POSIBLES
NUEVAS ACCIONES EMPRESARIALES QUE EXIGEN HUMANO = BLOQUEADAS
```

El principal técnico no rellena el vacío entre actores.

---

#### 6. Máquina de estados reutilizada

El cambio ordinario utiliza los estados canónicos ya aprobados:

```text
ACTIVE
->
LOCKED
->
CLOSING
->
CLOSED / NO_ACTOR
->
IDENTIFYING
->
CONTEXT_RESOLVING
->
ACTIVE
```

`TRANSFER_PENDING` se utiliza únicamente cuando existe un traspaso empresarial explícito que deba ser aceptado.

`RECOVERY_REQUIRED` se utiliza cuando el estado de cierre, limpieza, pendiente o transición no puede resolverse con certeza.

No se crea un estado nuevo específico de “switch”.

---

#### 7. Inicio explícito del cambio

El cambio comienza por una intención explícita de cerrar o cambiar al actor actual.

No constituyen solicitud de cambio por sí solos:

- actividad de otra persona frente al dispositivo;
- presentación accidental de otra credencial;
- cambio de aplicación;
- cambio de ruta;
- cambio de sede o área visual;
- cambio de modo de una pantalla;
- cierre de un modal;
- inactividad;
- heartbeat;
- suspensión del navegador;
- pérdida de red;
- cambio de turno detectado;
- expiración temporal.

Cuando la sesión A ya expiró, aplica la semántica de `AUTH-DEV-012`: A ya no es actor elegible y la identificación de B comienza desde ausencia de actor, no desde una transferencia implícita de A.

---

#### 8. Bloqueo de nuevas mutaciones de A

Una vez aceptado el inicio efectivo del cambio, la estación debe impedir que A origine nuevas mutaciones empresariales bajo la sesión que se está cerrando.

El bloqueo cubre todas las aplicaciones y superficies que compartan esa misma actor session.

No basta con deshabilitar un botón en la vista actual.

El estado de cambio debe impedir que:

- otra pestaña use la autoridad de A;
- otra aplicación continúe usando un contexto de A;
- un Server Action consuma un snapshot viejo;
- una llamada directa reutilice una decisión previa;
- una cola local interprete a A como todavía activo;
- Realtime reactive controles de A;
- un refresh visual restaure el actor anterior.

Las operaciones ya enviadas se clasifican según su estado real antes de decidir cualquier recuperación.

---

#### 9. Cierre de la sesión A

La sesión A debe quedar no elegible para nuevas acciones antes de habilitar la sesión B.

El cierre conserva historia suficiente para demostrar:

- dispositivo;
- trabajador A;
- inicio;
- expiración original;
- instante de cierre;
- motivo de cierre;
- contexto relevante;
- correlación con la transición.

La sesión A no se elimina para ocultar la transición.

Una vez cerrada como parte del cambio, no se reactiva mediante un simple cancel, refresh o reidentificación parcial.

Si A necesita volver a operar posteriormente, deberá obtener una nueva sesión conforme al mismo contrato aplicable a cualquier otro trabajador.

---

#### 10. Punto seguro sin actor

Entre A y B existe una frontera autoritativa real:

```text
SESSION_A NO ELEGIBLE
+
SESSION_B AUN NO CREADA
=
NO ACTOR EFECTIVO
```

Ese estado no es un error si el cierre de A fue correcto.

La superficie puede mostrar la experiencia de identificación permitida, pero no puede presentar como activa la autoridad de A ni anticipar la autoridad de B.

Si B abandona el proceso, falla la identificación o no posee contexto suficiente, la estación permanece sin actor elegible o en el estado de recuperación aplicable.

---

#### 11. Identificación independiente de B

B debe demostrar su identidad mediante un mecanismo aprobado.

No se acepta como identificación de B:

- selección de nombre;
- trabajador esperado por horario;
- trabajador asignado al área;
- último trabajador de la lista;
- PIN de A;
- sesión de A;
- credencial administrativa previa;
- `navigation_role`;
- dispositivo físico;
- turno que pertenecía a A;
- check-in de A;
- actor almacenado en cliente.

La prueba de B se valida en servidor y debe resolver un único empleado humano elegible.

---

#### 12. Resolución fresca del contexto de B

Identificar a B no autoriza todavía una acción.

Antes de crear una sesión de actor utilizable deben resolverse las fuentes aplicables de B, entre ellas:

- identidad laboral vigente;
- rol base cuando corresponda;
- asignaciones;
- cobertura administrativa;
- turno vigente cuando corresponda;
- check-in vigente cuando corresponda;
- rol operativo;
- sede;
- área;
- política del dispositivo;
- aplicaciones efectivas;
- techo del dispositivo;
- compatibilidad territorial;
- requisitos del permiso.

Nada de ese contexto se copia desde A.

---

#### 13. Creación de la sesión B

La sesión B debe ser una nueva identidad temporal.

Como mínimo debe quedar vinculada conceptualmente a:

```text
device_id
employee_id
shift_id
site_id
area_id
operational_role
started_at
expires_at
ended_at
```

`started_at` y `expires_at` se calculan conforme a `AUTH-DEV-012`.

La creación de B no extiende, reabre ni reescribe A.

El cambio queda completado únicamente cuando exista exactamente una sesión elegible y esa sesión corresponda inequívocamente a B.

---

#### 14. No herencia de autoridad

B no recibe desde A:

- rol base;
- rol operativo;
- grants;
- denegaciones individuales;
- cobertura administrativa;
- asignaciones;
- turno;
- check-in;
- sede operativa;
- área operativa;
- permiso efectivo;
- resultado `ALLOW`;
- decisión de autorización cacheada;
- excepción;
- elevación;
- reautenticación fuerte;
- firma de acción;
- segundo actor;
- aprobación temporal;
- token derivado de contexto.

La autoridad de B se calcula desde B.

---

#### 15. Limpieza transversal de aplicaciones

El cambio de actor obliga a limpiar el estado sensible de **todas las aplicaciones** que dependan de la actor session del dispositivo.

La limpieza no se limita a la app visible al iniciar el cambio.

Debe considerar:

- estado React o equivalente;
- cachés cliente identificables;
- Local Storage y Session Storage cuando contengan estado ligado al actor;
- datos precargados del actor;
- formularios;
- borradores personales;
- filtros y búsquedas;
- recursos recientes;
- archivos;
- fotografías;
- cámara;
- escáner;
- portapapeles;
- descargas;
- datos sensibles visibles;
- credenciales y autocompletado;
- notificaciones personales;
- rutas de retorno;
- estado de navegador o WebView;
- handles o referencias a recursos sensibles.

Solo puede conservarse aquello que el contrato del proceso declare explícitamente como estado de estación no personal o como evidencia empresarial persistida.

---

#### 16. Reautenticación fuerte y aprobaciones

Toda evidencia STRONG vinculada a A queda no utilizable por B.

B debe obtener su propia reautenticación cuando una acción la exija.

Queda prohibido:

```text
A COMPLETO STRONG
->
CAMBIO A B
->
B USA STRONG DE A
```

También quedan no transferibles por defecto:

- aprobaciones temporales;
- elevaciones;
- segundo factor contextual;
- confirmaciones personales;
- excepciones ligadas al actor.

El cambio de trabajador no crea una excepción a la clasificación de seguridad del permiso.

---

#### 17. Firmas de acción

Una firma de acción emitida para A conserva su atribución histórica a A.

No puede transformarse en una firma de B ni utilizarse para demostrar presencia de B.

Cuando una operación pendiente requiera una nueva firma para continuar, B debe producir su propia evidencia conforme al contrato de la acción.

La firma de A puede conservarse como evidencia del paso que A realizó, no como autoridad del paso que B realizará.

---

#### 18. Trabajo empresarial durante el cambio

El trabajo se clasifica antes de limpiar o continuar.

| Estado del trabajo | Tratamiento obligatorio |
| --- | --- |
| dato no confirmado | descartar, convertir en borrador neutral permitido o transferir únicamente mediante política explícita |
| comando enviado y pendiente | conservar actor, contexto, idempotencia y receipt originales; no reenviar automáticamente |
| resultado confirmado | mantener autoría original; B puede continuar un paso posterior solo tras autorización propia |
| conflicto | enviar a recuperación; no atribuir a B |
| resultado incierto | reconciliar antes de repetir; el cambio de actor no autoriza reintento |
| archivo o captura temporal | limpiar o transferir mediante finalidad y aceptación explícitas |
| aprobación o elevación temporal | invalidar para B |
| filtros, búsqueda o selección personal | limpiar |
| contexto declarado de estación no personal | puede conservarse solo si su contrato lo permite |

El cambio de actor no decide por sí mismo el ownership empresarial de una entidad.

---

#### 19. Diferencia entre cambio simple y handoff empresarial

Cambiar de trabajador y transferir trabajo son operaciones distintas.

Cambio simple:

```text
A DEJA DE SER ACTOR
->
ESTADO PERSONAL DE A SE LIMPIA
->
B SE IDENTIFICA
->
B COMIENZA SU PROPIO TRABAJO O CONTINUA SOLO LO QUE EL PROCESO PERMITA
```

Handoff empresarial:

```text
A DELIMITA UN WORK ITEM
+
B SE IDENTIFICA INDEPENDIENTEMENTE
+
B ACEPTA
+
SE CONSERVA EVIDENCIA DE ORIGEN Y DESTINO
=
TRANSFERENCIA EXPLICITA DEL TRABAJO
```

El handoff transfiere responsabilidad sobre un work item cuando el proceso lo permite. Nunca transfiere sesión, rol, permiso, cobertura, firma, STRONG ni decisión de autorización.

---

#### 20. Contrato de handoff reutilizado

Cuando exista traspaso explícito, debe poder conservarse la información funcional ya aprobada para:

```text
transfer_receipt_id
source_actor_id
target_actor_id
process_id
step_id
work_item_id
resource_version
source_station_id
target_station_id
initiated_at
accepted_at
handoff_reason
state_at_transfer
pending_effects[]
evidence_reference
```

Reglas:

1. A inicia y delimita el objeto transferido;
2. B se identifica independientemente;
3. B acepta el recurso y el estado recibido;
4. los efectos confirmados conservan su autor original;
5. los pendientes no se duplican ni se reenvían automáticamente;
6. la responsabilidad cambia solo después de aceptación o regla explícita de abandono;
7. un handoff rechazado, vencido o incierto permanece recuperable.

Esta tarea no obliga a que todo cambio de trabajador cree un handoff.

---

#### 21. Borradores

Un borrador personal de A no puede aparecer ante B como si fuera propio.

Cada dominio debe distinguir entre:

- borrador personal;
- borrador de estación expresamente neutral;
- work item empresarial persistido;
- resultado confirmado.

Sin una clasificación autoritativa suficiente, el estado no confirmado se limpia o se bloquea para recuperación.

No se convierte silenciosamente un borrador personal en borrador compartido.

---

#### 22. Operaciones confirmadas

Una operación confirmada antes del cambio conserva:

- actor original;
- contexto original registrable;
- timestamps;
- receipt;
- correlación;
- estado empresarial resultante.

El cambio no reescribe auditoría histórica.

B puede continuar el proceso únicamente desde el estado empresarial confirmado y con su propia autorización.

---

#### 23. Operaciones enviadas y pendientes

Una operación enviada por A y todavía pendiente mantiene la identidad de A.

Si el resultado llega después de que B ya esté activo:

- se atribuye a A;
- no se convierte en operación de B;
- no amplía la autoridad de B;
- no restaura la sesión A;
- no debe sobrescribir silenciosamente estado personal de B.

La interfaz debe reconciliar el resultado como evento del trabajo original.

---

#### 24. Resultado incierto e idempotencia

Si no puede saberse si una mutación de A produjo efecto, el cambio de trabajador no autoriza repetirla.

La secuencia segura es:

```text
RESULTADO INCIERTO DE A
->
RECONCILIAR POR CONTRATO DEL DOMINIO
->
DETERMINAR ESTADO REAL
->
SOLO ENTONCES PERMITIR UNA INTENCION NUEVA
```

Una reidentificación o una nueva sesión B no cambia la identidad lógica del intento anterior.

La correlación e idempotencia deben impedir duplicados durante reintentos o fallos de red.

---

#### 25. Offline y sincronización

Una cola offline preparada por A conserva la atribución histórica de A, pero no conserva automáticamente autoridad ejecutable.

Si se sincroniza después del cambio:

```text
COLA PREPARADA POR A
+
SESSION_A NO ELEGIBLE
->
REAUTORIZAR SEGUN CONTRATO DE SINCRONIZACION
```

No se permite:

- ejecutar con un `ALLOW` de A almacenado;
- atribuir la cola a B;
- usar la sesión B para hacer parecer que B creó la intención;
- reenviar automáticamente la mutación después de identificar a B.

Los datos recuperables deben mantener lineage suficiente para distinguir preparación, autorización y efecto.

---

#### 26. Varias pestañas, ventanas y aplicaciones

El cambio de actor es transversal al dispositivo y a la actor session.

No puede existir:

```text
APP A -> ACTOR B
APP B -> ACTOR A
```

si ambas superficies dependen de la misma sesión secuencial.

Cuando A deja de ser elegible, todas las superficies deben dejar de consumir su autoridad.

Una pestaña stale que todavía muestre a A no puede producir una mutación bajo A.

---

#### 27. Cambio de aplicación durante la transición

Cambiar de aplicación no completa ni cancela el cambio de trabajador.

Durante `LOCKED`, `CLOSING`, `NO_ACTOR`, `IDENTIFYING` o `CONTEXT_RESOLVING`, otra aplicación del dispositivo debe observar un estado compatible.

Una app no puede mantener a A mientras otra identifica a B.

La sesión B, una vez creada, conserva la política temporal que le corresponda y no recibe una extensión por cambiar de app.

---

#### 28. Dispositivo revocado durante el cambio

Si el dispositivo deja de ser elegible durante la transición, la precedencia es:

```text
DEVICE NO ELEGIBLE
->
NO CREAR SESSION_B
->
BLOQUEAR EFECTOS EMPRESARIALES
```

No se continúa con la identificación de B para “terminar” el cambio.

`AUTH-DEV-011` conserva la semántica propietaria del lifecycle y revocación.

---

#### 29. Sesión A expirada durante el cambio

Si A expira antes de completar el cierre:

```text
SESSION_A = NO ELEGIBLE
```

La transición no puede reabrirla.

La limpieza y recuperación deben continuar hasta alcanzar un estado seguro.

La creación de B sigue exigiendo identificación independiente y nueva sesión.

`AUTH-DEV-012` conserva la frontera temporal y sus TTL.

---

#### 30. Contexto de B inválido o insuficiente

B puede identificarse correctamente y aun así no ser elegible para operar.

Ejemplos:

- empleado inactivo;
- turno requerido ausente;
- check-in requerido ausente;
- rol operativo ausente;
- sede incompatible;
- área incompatible;
- permiso insuficiente;
- política de actor no satisfecha;
- dispositivo incompatible con la acción;
- reautenticación fuerte requerida.

En esos casos no se restaura A ni se fabrica contexto para B.

La estación permanece sin capacidad empresarial para esa acción y conserva la razón propietaria aplicable.

---

#### 31. Fallo de limpieza

Si no puede confirmarse que el estado sensible de A fue limpiado o aislado, B no debe recibir una superficie que pueda exponerlo o utilizarlo.

El estado aplicable es de recuperación controlada.

```text
LIMPIEZA INCIERTA
->
RECOVERY_REQUIRED
->
NO NUEVAS MUTACIONES HASTA RESOLUCION
```

El objetivo no es borrar evidencia empresarial, sino impedir exposición o reutilización de estado personal y autoritativo.

---

#### 32. Concurrencia y cardinalidad

Para una estación `SHARED-SEQUENTIAL`:

```text
0 sesiones elegibles
->
NO_ACTOR / IDENTIFICACION
```

```text
1 sesion elegible
->
UNICO ACTOR CANDIDATO
```

```text
2 O MAS SESIONES ELEGIBLES INCOMPATIBLES
->
INCONSISTENCIA
->
NO ELEGIR LA MAS RECIENTE
->
NO PRODUCIR NUEVO EFECTO EMPRESARIAL
```

La creación de B debe fallar cerrado si deja dos sesiones elegibles incompatibles.

---

#### 33. Auditoría de la transición

La transición A→B debe poder reconstruirse a partir de la historia canónica y sus correlaciones.

Debe ser posible determinar, cuando aplique:

- dispositivo;
- sesión A;
- trabajador A;
- motivo e instante de cierre;
- estado de pendientes;
- resultado de limpieza;
- transición sin actor;
- método de identificación de B sin guardar el secreto;
- sesión B;
- trabajador B;
- nuevo contexto;
- decisiones y resultados posteriores.

No es obligatorio almacenar A y B en una sola fila si la secuencia de eventos conserva una relación inequívoca.

La auditoría describe lo ocurrido; no concede autoridad.

---

#### 34. Privacidad y secretos

El cambio de trabajador no debe persistir ni exponer:

- PIN;
- contraseña;
- token completo;
- dato biométrico crudo;
- secreto de reautenticación;
- contenido sensible innecesario del actor anterior.

La limpieza visible y de cliente debe minimizar la exposición a B y a terceros.

La evidencia de transición utiliza referencias opacas y metadatos estrictamente necesarios.

---

#### 35. Matriz de cobertura sobre las 19 identidades heredadas

| `inventory_key` | Clase | Decisión de cambio de trabajador | Estado documental |
| --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` | debe aplicar A→sin actor→B y limpieza transversal cuando su identidad física y plantilla queden certificadas | `REGISTERED_UNVERIFIED` |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` | debe aplicar A→sin actor→B y limpieza transversal cuando su identidad física y plantilla queden certificadas | `REGISTERED_UNVERIFIED` |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` | no materializar transición ni actor session por inferencia antes de enrolamiento | `OBSERVED_ONLY` |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` | no materializar transición ni actor session por inferencia antes de enrolamiento | `OBSERVED_ONLY` |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` | cambio secuencial; limpiar actor y estado sensible de todas sus apps antes de B | `POLICY_DEFINED` |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` | cambio secuencial; no transferir autoridad ni acción preparada por A | `POLICY_DEFINED` |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` | cambio secuencial; conservar solo trabajo empresarial persistido y atribuible | `POLICY_DEFINED` |
| `target_template:service_satellite` | `TARGET_TEMPLATE` | cambio secuencial de alta rotación; no usar último trabajador como fallback | `POLICY_DEFINED` |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` | cambio secuencial; limpiar borradores personales, filtros y estado sensible | `POLICY_DEFINED` |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` | cambio secuencial transversal a funciones; no sumar autoridad entre perfiles | `POLICY_DEFINED` |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` | cambio secuencial; resultados confirmados conservan autor original y pendientes se reconcilian | `POLICY_DEFINED` |
| `target_template:production_bakery` | `TARGET_TEMPLATE` | cambio secuencial; resultados confirmados conservan autor original y pendientes se reconcilian | `POLICY_DEFINED` |
| `target_template:production_pastry` | `TARGET_TEMPLATE` | cambio secuencial; resultados confirmados conservan autor original y pendientes se reconcilian | `POLICY_DEFINED` |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` | cambio secuencial; no transferir sesión, turno, check-in ni permisos de bodega | `POLICY_DEFINED` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` | cambio secuencial; ruta o vehículo pueden persistir como recurso empresarial, nunca como autoridad de A | `POLICY_DEFINED` |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` | cambio de actor independiente del cambio de modo; B resuelve de nuevo modo, contexto y permisos | `POLICY_DEFINED` |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` | cambio secuencial transversal a sus apps; coordinación previa no transfiere autoridad | `POLICY_DEFINED` |
| `target_template:management_terminal` | `TARGET_TEMPLATE` | cambio secuencial con invalidación total de STRONG, elevaciones y estado administrativo de A | `POLICY_DEFINED` |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` | no recibe nueva política de cambio ni nuevas sesiones | `NO_APLICA` |

Control:

```text
TOTAL ESPERADO: 19
TOTAL MATERIALIZADO: 19

CONFIGURED_INSTANCE: 2
PHYSICAL_OBSERVATION: 2
TARGET_TEMPLATE: 14
RETIRED_LEGACY_TEMPLATE: 1

FALTANTES: 0
DUPLICADOS: 0
```

---

#### 36. Casos especiales por plantilla

##### 36.1 `management_terminal`

El cambio invalida cualquier evidencia STRONG, elevación o aprobación temporal de A.

B puede ejecutar administración solo con su propia autoridad base, cobertura real y reautenticación cuando corresponda.

La terminal no transfiere privilegios administrativos.

##### 36.2 `operations_management_terminal`

La amplitud de aplicaciones no permite conservar contextos parciales de A en una app distinta.

El cambio se aplica a la actor session transversal y obliga a recomponer la superficie desde B.

##### 36.3 `procurement_reception`

Cambio de trabajador y cambio de modo son dimensiones independientes.

Si ambos ocurren:

```text
CERRAR A
->
IDENTIFICAR B
->
RESOLVER CONTEXTO Y MODO DE B
```

No se copia a B el carril administrativo u operativo utilizado por A.

##### 36.4 `logistics_vehicle_terminal`

Vehículo, ruta, origen o destino pueden ser estado empresarial del proceso si su contrato lo define.

Ese estado no representa al trabajador y no permite reconstruir a B desde A.

##### 36.5 Plantillas productivas

Un batch, orden o resultado ya confirmado conserva su actor histórico.

Un borrador personal, firma, STRONG o selección temporal de A no se vuelve estado de B.

---

#### 37. Estado físico observado

La revisión del estado físico disponible reconoce:

1. existen estructuras canónicas destinadas a `shared_operational_device_actor_sessions`;
2. el modelo documental exige que el actor de dispositivo provenga de una sesión activa, única y vigente;
3. NEXO, PULSO y FOGO observados ya poseen helpers de firma por acción desde dispositivo compartido;
4. esos helpers pueden resolver `actor_employee_id` y `actor_shift_id` mediante una firma/PIN de la acción;
5. no se observó en esos consumidores uso de `actor_session_id` ni consumo directo de `shared_operational_device_actor_sessions`;
6. por tanto, la firma de acción existente no demuestra materialización del ciclo persistente A→cierre→B;
7. la adopción y certificación física permanecen para las unidades posteriores del bloque.

Resultado:

```text
IDENTIFICACION POR ACCION = OBSERVADA EN CONSUMIDORES
ACTOR SESSION PERSISTENTE CONSUMIDA = NO DEMOSTRADA
CAMBIO TRANSVERSAL A -> B = NO DEMOSTRADO
LIMPIEZA MULTIAPP = NO DEMOSTRADA
CERTIFICACION FISICA = NO REALIZADA
```

Esta tarea no modifica consumidores.

---

#### 38. Frontera con AUTH-DEV-014 a AUTH-DEV-016

`AUTH-DEV-013` define la semántica común de cambio de trabajador.

Las tareas siguientes conservan la comprobación física por superficie:

- `AUTH-DEV-014`: tablets de NEXO;
- `AUTH-DEV-015`: terminales de PULSO;
- `AUTH-DEV-016`: pantallas de FOGO.

Esas pruebas deberán observar el contrato aprobado, no redefinirlo.

No se ejecuta ninguna de ellas en este marcador documental.

---

#### 39. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

El cambio de trabajador desarrolla obligaciones de seguridad, sesión, invalidación, limpieza, atribución y recuperación ya protegidas por el registro vigente. No altera el registro modular.

---

#### 40. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificación:

- `TREQ-AUTH-003` — incluye cambio de actor dentro del lifecycle auditable del dispositivo compartido;
- `TREQ-AUTH-011` — exige actor humano real, intersección de autoridad y registro del cambio de trabajador;
- `TREQ-AUTH-014` — exige invalidación de contexto, caché y tokens derivados ante cambio de trabajador;
- `TREQ-AUTH-015` — exige evidencia correlacionable de actor, dispositivo, contexto, decisión y resultado;
- `TREQ-AUTH-054` — exige limpiar todas las aplicaciones al cambiar actor y prohíbe transferir estado sensible;
- `TREQ-AUTH-273` — exige sesión única y vigente del actor, política satisfecha y contexto propio;
- `TREQ-AUTH-277` — exige invalidación, recuperación segura, cero reintentos automáticos y auditoría;
- `TREQ-AUTH-278` — reserva la reconciliación física de sesiones de actor, invalidación y consumidores;
- `TREQ-AUTH-331` — conserva identificación de actor y reautenticación fuerte como estados interactivos separados de una denegación del dispositivo.

Estas referencias constituyen trazabilidad de cobertura existente y no representan requisitos afectados por esta tarea.

---

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en el archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores contra el checkout local durante la preparación del artefacto. |
| REMOTA | `NOT_EXECUTED` | Se inspeccionaron fuentes remotas vigentes y consumidores observables, pero no se ejecutó un gate remoto de esta tarea. |
| OPERATIVA | `NOT_APPLICABLE` | La tarea no cambia trabajadores, sesiones reales ni operación de estaciones durante su definición documental. |
| FÍSICA | `NOT_APPLICABLE` | La materialización futura pertenece a unidades `PER_IMPLEMENTATION_UNIT` después del gate `POST_E5_PACKAGE`. |

---

#### 42. Criterios de aceptación

- [x] El cambio de trabajador es explícito.
- [x] El dispositivo técnico permanece separado del actor humano.
- [x] A deja de ser elegible antes de habilitar mutaciones de B.
- [x] Existe una frontera real sin actor entre A y B.
- [x] La sesión A no se convierte en sesión B.
- [x] B obtiene un nuevo `actor_session_id`.
- [x] B obtiene `started_at` y `expires_at` propios.
- [x] B se identifica de forma independiente.
- [x] El contexto de B se reconstruye desde fuentes vigentes.
- [x] Rol, grants, cobertura, turno, check-in, sede, área y permisos de A no se heredan.
- [x] STRONG, firmas, elevaciones y aprobaciones de A no se transfieren.
- [x] La limpieza aplica transversalmente a todas las aplicaciones del dispositivo.
- [x] Estado React, cachés, almacenamiento cliente y recursos sensibles de A no pueden reactivar autoridad.
- [x] Los borradores personales de A no aparecen como propios de B.
- [x] Los resultados confirmados conservan la autoría de A.
- [x] Los comandos pendientes conservan actor, contexto, idempotencia y receipt originales.
- [x] Los resultados inciertos se reconcilian antes de cualquier reintento.
- [x] Las colas offline no heredan autoridad de A ni se atribuyen a B.
- [x] Cambio simple y handoff empresarial permanecen separados.
- [x] El handoff transfiere work item, no autoridad.
- [x] Dos sesiones incompatibles bloquean en vez de elegir la más reciente.
- [x] El fallo de identificación de B no restaura silenciosamente A.
- [x] El fallo de limpieza produce recuperación controlada.
- [x] Una revocación del dispositivo bloquea la creación de B.
- [x] La expiración de A conserva la semántica de `AUTH-DEV-012`.
- [x] Se cubren exactamente las 19 identidades heredadas.
- [x] Se conserva la distribución 2 + 2 + 14 + 1.
- [x] Las dos instancias configuradas siguen `REGISTERED_UNVERIFIED`.
- [x] Las observaciones físicas no reciben actor session por inferencia.
- [x] La plantilla `production_center` permanece retirada.
- [x] Se documenta la brecha física de actor session sin modificar consumidores.
- [x] `AUTH-DEV-014`, `AUTH-DEV-015` y `AUTH-DEV-016` conservan sus pruebas físicas.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autorizan cambios físicos.

---

#### 43. Handoff exacto hacia AUTH-DEV-014

`AUTH-DEV-013` entrega a `AUTH-DEV-014` el siguiente contrato observable para una tablet de NEXO:

```text
UN DISPOSITIVO ELEGIBLE
+
UN SOLO ACTOR EFECTIVO
+
CAMBIO A -> B EXPLICITO
+
SESSION_A NO ELEGIBLE
+
ESTADO SENSIBLE DE A LIMPIO O AISLADO
+
B IDENTIFICADO INDEPENDIENTEMENTE
+
SESSION_B NUEVA
+
CONTEXTO B RESUELTO
=
CAMBIO DE TRABAJADOR CONFORME
```

La comprobación física posterior deberá demostrar, sin redefinir esta tarea:

- que A no puede producir nuevas mutaciones después del cambio;
- que B no hereda autoridad ni estado sensible de A;
- que B necesita su propia identidad y sesión;
- que pendientes y resultados conservan atribución correcta;
- que las superficies NEXO del dispositivo observan un estado de actor coherente;
- que no sobreviven firmas o reautenticaciones de A;
- que un fallo de transición queda bloqueado o recuperable sin fallback permisivo.

---

#### 44. Límites

Esta tarea no:

- modifica código;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica RPC;
- modifica grants;
- modifica Auth;
- crea jobs;
- modifica datos reales;
- crea o cierra sesiones reales;
- cambia trabajadores reales;
- modifica turnos;
- modifica check-ins;
- cambia roles;
- cambia permisos;
- cambia sedes o áreas;
- cambia aplicaciones o paquetes del dispositivo;
- redefine PIN o firma ligera;
- convierte PIN ligero en STRONG;
- redefine la no herencia de `AUTH-DEV-009`;
- redefine la auditoría de `AUTH-DEV-010`;
- redefine la revocación de `AUTH-DEV-011`;
- redefine TTL, expiración o inactividad de `AUTH-DEV-012`;
- diseña ownership empresarial específico de cada dominio;
- ejecuta pruebas físicas de `AUTH-DEV-014`, `AUTH-DEV-015` o `AUTH-DEV-016`;
- modifica NEXO, PULSO, FOGO u otra aplicación consumidora;
- asigna identidad a observaciones físicas;
- certifica las instancias registradas;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- inicia materialización física.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-012 — Manejar sesión expirada`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-013 — Manejar cambio de trabajador`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-014 — Probar tablets de NEXO`


### ✅ AUTH-DEV-014 — Probar tablets de NEXO

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-013 — Manejar cambio de trabajador
**Tarea siguiente:** AUTH-DEV-015 — Probar terminales de PULSO
**Tipo de tarea:** documental; contrato canónico de prueba y certificación por unidad de implementación para dispositivos compartidos que exponen NEXO, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/03_SESION_REVOCACION_Y_PRUEBAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada, reproducible y auditable cómo se deberá probar una unidad física de dispositivo compartido que exponga NEXO antes de declararla conforme con los contratos `AUTH-DEV-001` a `AUTH-DEV-013`.

La tarea convierte el título “Probar tablets de NEXO” en un contrato verificable por `implementation_unit_id`.

La certificación futura deberá demostrar simultáneamente:

```text
IDENTIDAD FISICA Y TECNICA RESUELTAS
+
DEVICE ELEGIBLE
+
NEXO EN EL CONJUNTO EFECTIVO DE APLICACIONES
+
ACTOR HUMANO UNICO Y VIGENTE
+
AUTORIDAD = TRABAJADOR INTERSECCION TECHO DEL DEVICE
+
TERRITORIO Y RECURSO COMPATIBLES
+
DENEGACIONES FAIL CLOSED
+
LIFECYCLE DE SESION Y DEVICE
+
AUDITORIA CORRELACIONABLE
+
LIMPIEZA ENTRE ACTORES
+
COMPORTAMIENTO NEXO REAL
=
UNIDAD NEXO COMPARTIDA CERTIFICABLE
```

Una prueba de navegador, un build, una suite sintética, una fila activa de dispositivo o una captura visual aislada no equivalen por sí solos a certificación física.

---

#### 2. Naturaleza del marcador y materialización posterior

El marcador canónico se desarrolla una sola vez como contrato reutilizable.

La topología física aplicable es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto:

1. esta tarea documental no crea ni ejecuta una instancia física;
2. cada unidad física aplicable tendrá como máximo una materialización propia de este contrato;
3. una misma unidad podrá conservar lineage hacia los paquetes que la consuman;
4. la ejecución física exige el paquete propietario aplicable y su gate E5 correspondiente;
5. el resultado documental no autoriza cambios en dispositivo, código, Supabase o ambientes;
6. la certificación futura se decide sobre evidencia real de la unidad exacta, no sobre semejanza con otra tablet o kiosco.

---

#### 3. Handoff recibido de AUTH-DEV-013

`AUTH-DEV-013` entrega el siguiente comportamiento observable:

```text
UN DISPOSITIVO ELEGIBLE
+
UN SOLO ACTOR EFECTIVO
+
CAMBIO A -> B EXPLICITO
+
SESSION_A NO ELEGIBLE
+
ESTADO SENSIBLE DE A LIMPIO O AISLADO
+
B IDENTIFICADO INDEPENDIENTEMENTE
+
SESSION_B NUEVA
+
CONTEXTO B RESUELTO
=
CAMBIO DE TRABAJADOR CONFORME
```

`AUTH-DEV-014` no redefine esa transición.

La prueba futura deberá demostrar, como mínimo:

- que A no puede producir nuevas mutaciones después del cambio;
- que B no hereda autoridad ni estado sensible de A;
- que B necesita su propia identificación y sesión;
- que pendientes y resultados conservan atribución correcta;
- que todas las superficies NEXO de la unidad observan el mismo actor efectivo;
- que una firma o reautenticación de A no sobrevive para B;
- que un fallo de transición queda bloqueado o recuperable sin fallback permisivo.

---

#### 4. Contratos precedentes que la prueba debe observar

La prueba no vuelve a decidir el modelo de dispositivo.

Debe verificar la materialización de estas responsabilidades ya aprobadas:

| Contrato | Obligación que debe observarse físicamente en NEXO |
| --- | --- |
| `AUTH-DEV-001` | la unidad probada corresponde a una identidad reconciliada y no a una observación inferida |
| `AUTH-DEV-002` | dispositivo, endpoint, principal técnico y activo físico permanecen separados y correlacionables |
| `AUTH-DEV-003` | la sede del dispositivo limita y no concede autoridad |
| `AUTH-DEV-004` | el área fija o conjunto permitido limita y no sustituye el área del actor o recurso |
| `AUTH-DEV-005` | NEXO solo está disponible si pertenece al conjunto efectivo de aplicaciones |
| `AUTH-DEV-006` | el paquete máximo del dispositivo restringe capacidades y nunca las concede por sí solo |
| `AUTH-DEV-007` | un humano real se identifica mediante prueba aprobada; seleccionar un nombre no basta |
| `AUTH-DEV-008` | la autoridad efectiva resulta de la intersección entre trabajador y dispositivo |
| `AUTH-DEV-009` | no existe herencia de privilegio administrativo, rol de navegación ni estado residual |
| `AUTH-DEV-010` | dispositivo, principal técnico, trabajador, sesión, decisión y resultado quedan correlacionados |
| `AUTH-DEV-011` | un dispositivo revocado deja de producir nuevos efectos empresariales |
| `AUTH-DEV-012` | una sesión expirada deja de ser autoridad aunque el dispositivo continúe autenticado |
| `AUTH-DEV-013` | el cambio A→B cierra A, limpia estado y establece B mediante una sesión nueva |

Ninguna prueba puede relajar uno de esos contratos para facilitar el escenario.

---

#### 5. Unidad exacta de certificación

La certificación pertenece a una `implementation_unit_id` concreta.

Antes de ejecutar escenarios físicos deberá quedar resuelta y registrada, sin ambigüedad, la relación entre:

- `implementation_unit_id`;
- activo físico;
- endpoint;
- `device_id`;
- `device_code`;
- principal técnico;
- plantilla y versión;
- vínculo de sede;
- política de área;
- asociaciones efectivas de aplicaciones;
- aplicación predeterminada;
- paquete máximo de capacidades;
- versión desplegada de NEXO;
- versiones de contratos compartidos consumidos;
- ambiente de prueba;
- evidencia de autorización física aplicable.

La prueba de una unidad no certifica otra unidad aunque use la misma plantilla, modelo de hardware, aplicación o sede.

---

#### 6. Condiciones previas obligatorias

Una ejecución física de esta prueba solo puede comenzar cuando la unidad cumpla las precondiciones de su lifecycle.

Debe demostrarse:

1. identidad física y técnica reconciliada;
2. `device_id` único;
3. principal técnico vinculado de forma inequívoca;
4. estado del dispositivo resoluble;
5. plantilla y versión resolubles;
6. sede resoluble;
7. política de área resoluble;
8. NEXO dentro del conjunto efectivo cuando el escenario lo requiera;
9. paquete máximo versionado y resoluble;
10. código y build de NEXO identificables;
11. contratos compartidos identificables;
12. datos de prueba controlados;
13. actores de prueba válidos;
14. recursos de prueba identificables;
15. ausencia de conflictos de identidad pendientes;
16. autorización física del paquete aplicable.

Una observación física sin enrolamiento no satisface estas precondiciones.

---

#### 7. Evidencia mínima por ejecución física

Cada ejecución futura deberá conservar evidencia suficiente para reproducir qué se probó.

Como mínimo:

- unidad de implementación;
- `device_id`;
- referencia del activo y endpoint;
- principal técnico;
- plantilla y versión;
- sede y área gobernadas;
- conjunto efectivo de aplicaciones;
- paquete máximo y versión;
- commit o build exacto de NEXO;
- versiones de contratos compartidos;
- ambiente;
- momento de inicio y finalización;
- actor humano del escenario cuando aplique;
- `actor_session_id` cuando aplique;
- permiso exacto;
- recurso exacto;
- estado esperado;
- estado observado;
- decisión de autorización;
- razones estructuradas cuando existan;
- correlación;
- receipt o evidencia del efecto cuando exista;
- evidencia del estado anterior y posterior cuando el escenario muta datos;
- resultado del escenario;
- defecto asociado cuando el resultado no sea conforme.

La evidencia no debe incluir secretos reutilizables.

---

#### 8. Regla de PASS físico

La unidad solo podrá declararse conforme cuando todos los escenarios obligatorios aplicables hayan sido ejecutados y no exista un fallo pendiente que afecte el contrato.

Debe cumplirse:

```text
ESCENARIOS OBLIGATORIOS EJECUTADOS
+
DENY PATHS DEMOSTRADOS
+
CERO FALLOS CONTRACTUALES ABIERTOS
+
CERO ESCENARIOS OMITIDOS SIN JUSTIFICACION CANONICA
+
EVIDENCIA IDENTIFICABLE Y NO STALE
=
PASS FISICO POSIBLE
```

Un escenario fuera del paquete efectivo de la unidad no se elimina del protocolo: se verifica como indisponibilidad o denegación cuando esa sea la expectativa contractual.

No se acepta transformar una capacidad ausente en un “skip” silencioso.

---

#### 9. Invalidez de evidencia stale

La evidencia física deja de ser suficiente cuando cambia materialmente alguno de los elementos de los que depende.

Incluye, según corresponda:

- unidad física;
- endpoint;
- `device_id`;
- principal técnico;
- plantilla o versión;
- sede;
- política de área;
- conjunto de aplicaciones;
- aplicación predeterminada;
- paquete máximo;
- commit o build de NEXO;
- versión de contratos compartidos;
- política de actor;
- política temporal;
- configuración de autorización;
- ambiente;
- fixture o recurso usado por el escenario.

Una evidencia stale se conserva históricamente, pero no certifica el estado nuevo.

---

#### 10. Línea base técnica de NEXO a observar

El repositorio NEXO dispone de una línea base automatizada con doce superficies de consumidor.

La certificación física reutilizará esa taxonomía como cobertura técnica, sin confundirla con evidencia de hardware.

| Superficie | Cobertura |
| --- | --- |
| `NEXO-SURFACE-001` | identidad, sesión y permisos |
| `NEXO-SURFACE-002` | contexto operativo |
| `NEXO-SURFACE-003` | catálogo, categorías, unidad y presentación |
| `NEXO-SURFACE-004` | stock por sede y LOC |
| `NEXO-SURFACE-005` | entradas, conteos, ajustes, retiros y traslados |
| `NEXO-SURFACE-006` | LOC, board, kiosco y posiciones |
| `NEXO-SURFACE-007` | remisiones |
| `NEXO-SURFACE-008` | división y recepción parcial |
| `NEXO-SURFACE-009` | activos físicos y conteos |
| `NEXO-SURFACE-010` | configuración, accesos y políticas operativas |
| `NEXO-SURFACE-011` | integración y fronteras de dominio |
| `NEXO-SURFACE-012` | UI, SSR, interacción, accesibilidad e impresión |

La suite sintética de consumidor es prerrequisito técnico útil, pero no demuestra por sí sola actor real, dispositivo real, lifecycle, limpieza entre trabajadores, ergonomía física ni efecto empresarial observado en la unidad.

---

#### 11. Matriz de cobertura por superficie NEXO

Para cada unidad física probada se deberá materializar una decisión sobre las doce superficies.

| Superficie | Comprobación mínima en una unidad compartida |
| --- | --- |
| `NEXO-SURFACE-001` | principal técnico separado; actor session válida; permiso exacto; denegación sin actor o sin permiso |
| `NEXO-SURFACE-002` | sede, área, rol operativo, turno y check-in se resuelven desde fuentes vigentes y no desde selección de cliente |
| `NEXO-SURFACE-003` | lectura de catálogo respeta autoridad, contexto y representación canónica de unidades |
| `NEXO-SURFACE-004` | stock visible pertenece al territorio y LOC permitidos |
| `NEXO-SURFACE-005` | toda mutación exige actor, permiso, contexto, recurso e idempotencia aplicables |
| `NEXO-SURFACE-006` | acceso de kiosco/LOC no convierte dispositivo o código en autoridad y bloquea targets no permitidos |
| `NEXO-SURFACE-007` | remisiones conservan actor, transición legal, sede, recurso y autorización por cada comando |
| `NEXO-SURFACE-008` | división y recepción parcial conservan actor original, cantidades, pendientes y autorización |
| `NEXO-SURFACE-009` | activo serializado o conteo conserva identidad, ubicación y actor |
| `NEXO-SURFACE-010` | configuración y políticas permanecen bloqueadas salvo capacidad exacta del humano actual |
| `NEXO-SURFACE-011` | API, RPC y otras fronteras producen decisión equivalente y no eluden el actor compartido |
| `NEXO-SURFACE-012` | la experiencia táctil refleja actor, bloqueo, errores, accesibilidad y estados reales sin convertirse en fuente de autorización |

La cobertura física no requiere que una unidad posea todas las capacidades NEXO. Exige demostrar que aquello fuera de su techo no puede ejecutarse.

---

#### 12. Escenario de principal técnico sin actor

Debe probarse el dispositivo autenticado y elegible sin una actor session humana válida.

Resultado requerido:

```text
PRINCIPAL TECNICO VALIDO
+
DEVICE ELEGIBLE
+
NEXO PERMITIDO
+
ACTOR HUMANO AUSENTE
=
NO MUTACION EMPRESARIAL QUE EXIJA HUMANO
```

La interfaz podrá ofrecer identificación.

No podrá:

- inferir último trabajador;
- usar `navigation_role` como actor;
- usar un trabajador seleccionado de una lista;
- usar sede o área del dispositivo como sustituto de actor;
- ejecutar una mutación con la identidad técnica;
- degradar la ausencia limpia de actor a un permiso implícito.

---

#### 13. Estado interactivo de identificación

Cuando el dispositivo es elegible y falta el actor, la experiencia debe distinguir la necesidad de identificar al trabajador de una denegación estable del dispositivo.

La prueba debe comprobar:

- mensaje reconocible;
- ausencia de efecto empresarial;
- posibilidad de iniciar identificación segura;
- ausencia de exposición de candidatos privilegiados;
- ausencia de reintento automático de la mutación;
- preservación de la intención solo cuando su contrato lo permita.

El estado interactivo no autoriza la operación pendiente.

---

#### 14. Identificación del trabajador

La prueba deberá demostrar que el humano real se resuelve mediante un mecanismo aprobado y validado en servidor.

No es evidencia suficiente:

- elegir un nombre;
- seleccionar un `employee_id`;
- enviar el trabajador desde un formulario;
- escoger al trabajador de una lista;
- usar el último trabajador;
- confiar en la persona programada para el turno;
- usar el `navigation_role`;
- usar la cuenta técnica del dispositivo;
- usar una etiqueta física.

El resultado debe vincular inequívocamente el humano real con la sesión o firma que corresponda.

---

#### 15. Sesión única del actor

Debe probarse la cardinalidad:

```text
0 SESIONES ELEGIBLES
->
SIN ACTOR EFECTIVO
```

```text
1 SESION ELEGIBLE
->
ACTOR CANDIDATO UNICO
```

```text
2 O MAS SESIONES INCOMPATIBLES
->
INCONSISTENCIA
->
CERO NUEVOS EFECTOS EMPRESARIALES
```

No se elige la sesión más reciente, la primera fila ni la que coincida con la navegación.

---

#### 16. Aplicación NEXO permitida

La prueba positiva de NEXO exige que `nexo` pertenezca al conjunto efectivo de aplicaciones de la instancia.

Debe demostrarse:

```text
NEXO EN PLANTILLA
+
NEXO EN REDUCCION VIGENTE DE INSTANCIA
+
CLIENTE COMPATIBLE
+
VINCULO ACTIVO Y SIN CONFLICTO
=
SUPERFICIE NEXO ELEGIBLE PARA CONTINUAR EVALUACION
```

Eso todavía no concede `nexo.access` ni permisos internos.

---

#### 17. NEXO fuera del conjunto efectivo

Debe existir una prueba negativa para una unidad donde NEXO haya sido retirado, suspendido o no pertenezca al conjunto efectivo.

Resultado requerido:

- no se ofrece como aplicación disponible;
- un acceso directo no produce superficie empresarial utilizable;
- una llamada protegida no evita el control;
- una app instalada localmente no reintroduce autoridad;
- una respuesta cacheada no reabre NEXO;
- no se producen efectos empresariales.

La existencia del cliente no es autorización.

---

#### 18. Acceso a NEXO no equivale a permiso interno

Debe demostrarse:

```text
NEXO PERMITIDO EN DEVICE
!=
nexo.access CONCEDIDO
```

y:

```text
nexo.access CONCEDIDO
!=
PERMISO INTERNO NEXO CONCEDIDO
```

Cada capacidad protegida continúa exigiendo la evaluación exacta aplicable al actor, contexto y recurso.

Una prueba física falla si el simple hecho de que NEXO esté permitido en el dispositivo convierte automáticamente `nexo.access` en `ALLOW`.

---

#### 19. Rol de navegación

La prueba debe demostrar que `navigation_role` solo afecta presentación o navegación autorizada.

Queda prohibido como fuente de:

- actor humano;
- rol base;
- rol operativo;
- permiso;
- paquete;
- sede;
- área;
- capacidad NEXO;
- bypass.

Una mutación que solo funcione porque el dispositivo tiene un `navigation_role` compatible no es conforme.

---

#### 20. Intersección trabajador–dispositivo

Para una capacidad NEXO:

```text
AUTORIDAD HUMANA VIGENTE
INTERSECCION
TECHO EFECTIVO DEL DISPOSITIVO
INTERSECCION
APLICACION NEXO EFECTIVA
INTERSECCION
TERRITORIO
INTERSECCION
RECURSO
=
CAPACIDAD EVALUABLE
```

La prueba debe incluir:

1. actor con permiso y dispositivo que lo admite;
2. actor con permiso pero dispositivo que no lo admite;
3. dispositivo que admite la capacidad pero actor sin permiso;
4. actor y dispositivo compatibles pero territorio incompatible;
5. actor y dispositivo compatibles pero recurso incompatible.

Solo el primer escenario puede continuar hacia `ALLOW`, sujeto a las demás restricciones.

---

#### 21. Sede del dispositivo

Debe probarse que la sede registrada del dispositivo es un límite adicional.

La prueba debe incluir:

- actor compatible con la sede;
- actor de otra sede;
- recurso de otra sede;
- selección de sede desde cliente;
- estado cacheado de una sede anterior.

Una sede enviada por la interfaz no puede ampliar la sede resuelta server-side.

---

#### 22. Área del dispositivo

Debe probarse la política de área aplicable a la unidad.

Según la plantilla o instancia:

- área fija exacta;
- conjunto explícito de áreas;
- área base de custodia;
- modo mixto;
- área exclusivamente física.

La prueba debe demostrar que:

- el dispositivo no fabrica el área del actor;
- un área solicitada desde cliente no amplía la política;
- el recurso debe ser compatible;
- una política ausente o ambigua falla cerrado;
- cambiar de área o miembro invalida contexto dependiente.

---

#### 23. Turno y check-in

Cuando la capacidad sea operacional y los requiera, debe probarse:

- turno publicado y vigente;
- check-in vigente;
- coincidencia con el trabajador;
- sede y área compatibles;
- rol operativo exacto.

Debe existir prueba negativa para:

- turno ausente;
- turno vencido;
- turno de otro trabajador;
- check-in ausente;
- check-in residual;
- área de asistencia incompatible.

El dispositivo no aporta turno ni check-in.

---

#### 24. Capacidad STANDARD

Para una capacidad clasificada como utilizable con sesión estándar de actor, debe probarse:

- sesión humana única y vigente;
- dispositivo elegible;
- aplicación efectiva;
- permiso exacto;
- contexto;
- territorio;
- recurso;
- ausencia de denegaciones.

El PIN o mecanismo de identificación no reemplaza ninguna de esas condiciones.

---

#### 25. Capacidad STRONG

Para una capacidad que exige reautenticación fuerte:

```text
ACTOR SESSION VIGENTE
+
PERMISO Y CONTEXTO VALIDOS
+
STRONG DEL MISMO ACTOR PARA LA ACCION Y RECURSO
=
PUEDE CONTINUAR LA EVALUACION
```

Debe probarse que:

- una identificación ligera no cuenta como STRONG;
- STRONG de A no funciona para B;
- STRONG de otra aplicación o recurso no se reutiliza;
- STRONG vencida no se extiende por actividad;
- cambiar de actor la invalida.

---

#### 26. Capacidad no admitida por dispositivo compartido

Debe existir prueba negativa de una capacidad clasificada como no permitida desde dispositivo compartido.

Resultado:

```text
DEVICE COMPARTIDO
+
CAPACIDAD NO ADMITIDA
=
CERO EFECTO EMPRESARIAL
```

Ni actor privilegiado, ni rol administrativo, ni STRONG, ni presencia física convierten esa capacidad en permitida.

---

#### 27. Kiosco y acceso por LOC

La superficie de kiosco debe probar:

- target declarado;
- LOC activo;
- territorio compatible;
- aplicación NEXO permitida;
- permiso exacto;
- actor vigente cuando la acción empresarial lo requiera;
- acceso directo con target desconocido;
- LOC fuera de alcance;
- manipulación de parámetros;
- estado stale después de un cambio de actor o dispositivo.

El identificador de LOC no es autorización.

---

#### 28. Retiro desde kiosco

El retiro de inventario desde un kiosco NEXO es un escenario obligatorio cuando la unidad exponga esa función.

Antes del efecto debe demostrarse:

- dispositivo elegible;
- actor humano real;
- sesión o prueba humana conforme;
- permiso de retiro aplicable;
- permiso de traslado cuando aplique;
- origen permitido;
- trabajador y destino resueltos por fuentes confiables;
- stock suficiente;
- unidad y presentación válidas;
- idempotencia o control equivalente contra duplicado;
- auditoría del actor real.

Elegir un trabajador visible en la pantalla no sustituye su identificación.

---

#### 29. Retiro con destino

Cuando el trabajador tenga un destino válido y el flujo produzca traslado, debe verificarse:

- origen y destino distintos;
- ambos LOC válidos;
- misma política territorial aplicable;
- cantidad exacta;
- movimiento y proyecciones consistentes;
- actor humano conservado;
- principal técnico conservado por separado;
- receipt correlacionable;
- ausencia de doble contabilización.

La identidad del actor no se obtiene del LOC destino.

---

#### 30. Retiro sin destino

Cuando el contrato de dominio permita un retiro sin LOC destino, debe verificarse:

- razón operacional válida;
- actor humano real;
- cantidad exacta;
- movimiento de consumo o tipo propietario correcto;
- proyección de stock consistente;
- ausencia de saldo negativo indebido;
- auditoría del resultado;
- ausencia de atribución al usuario técnico como trabajador.

La ausencia de destino no relaja identificación ni autorización.

---

#### 31. Remisiones

Las superficies de remisiones deben probar comandos representativos de sus estados aplicables.

La cobertura debe incluir, cuando corresponda:

- solicitud;
- preparación;
- despacho;
- tránsito;
- recepción;
- recepción parcial;
- continuación después de recepción parcial;
- cierre.

Cada comando se reevalúa con actor, dispositivo, permiso, sede, área, recurso y estado vigentes.

Una firma de una acción no crea una actor session universal.

---

#### 32. Pendientes de remisión y cambio de actor

Debe probarse un comando de A cuyo resultado permanezca pendiente mientras ocurre cambio A→B.

Resultado requerido:

- la intención mantiene atribución a A;
- B no recibe la intención como propia;
- un resultado tardío se reconcilia con A;
- B continúa solo mediante una nueva intención autorizada cuando corresponda;
- no se duplica el comando.

---

#### 33. Inventario, movimientos y traslados

Para una capacidad incluida en el techo de la unidad se deberá probar, según corresponda:

- lectura;
- creación de movimiento;
- retiro;
- traslado;
- ajuste;
- conteo;
- entrada.

Para cada mutación se verifica:

- actor;
- permiso;
- contexto;
- territorio;
- recurso;
- cantidad;
- estado previo;
- estado posterior;
- correlación;
- idempotencia o control de repetición.

Una proyección de stock no puede cambiar sin un efecto empresarial atribuible.

---

#### 34. Catálogo y configuración

Debe probarse que las superficies administrativas o de configuración permanecen restringidas.

Una tablet operacional no recibe autoridad para modificar configuración por:

- aplicación visible;
- `navigation_role`;
- cuenta técnica;
- ubicación;
- actor con otro permiso;
- acceso directo.

Si el actor actual sí posee capacidad administrativa compatible y la plantilla admite ese carril, la evaluación utiliza exclusivamente la autoridad real del actor y no la del terminal.

---

#### 35. Activos físicos y conteos

Cuando la unidad exponga esas funciones, la prueba deberá preservar:

- identidad serializada del activo cuando corresponda;
- ubicación;
- actor;
- dispositivo;
- recurso;
- estado anterior;
- estado posterior;
- evidencia de conteo separada de un ajuste.

Observar una diferencia no concede permiso para corregir inventario.

---

#### 36. Cambio de trabajador A→B

La prueba física debe ejecutar un cambio real de actor sobre la unidad.

Debe observarse:

1. A está activo;
2. se inicia cambio explícito;
3. nuevas mutaciones de A quedan bloqueadas;
4. pendientes se clasifican;
5. A deja de ser elegible;
6. se limpia o aísla estado sensible de A;
7. existe una frontera sin actor;
8. B se identifica de forma independiente;
9. se resuelve contexto de B;
10. se crea una sesión nueva para B;
11. B se convierte en único actor efectivo;
12. todas las superficies NEXO observan B.

No se edita la identidad de la sesión A para convertirla en B.

---

#### 37. Limpieza entre actores

Después del cambio A→B se debe comprobar que B no recibe estado personal o autoritativo de A.

Debe revisarse, según exista en la superficie:

- formularios;
- borradores personales;
- filtros personales;
- búsquedas;
- recursos recientes;
- archivos locales;
- imágenes temporales;
- cámara;
- escáner;
- portapapeles;
- datos sensibles visibles;
- caché identificable;
- credenciales;
- autocompletado;
- elevaciones;
- aprobaciones;
- mensajes personales;
- retorno a recursos sensibles;
- estado de navegador o WebView.

La evidencia empresarial confirmada no se borra.

---

#### 38. Sesión expirada

Debe probarse el límite temporal de la plantilla o instancia.

Resultado:

```text
resolved_at >= expires_at
->
SESSION NO ELEGIBLE
->
ACTOR EFECTIVO NO RESUELTO
->
CERO NUEVA MUTACION HUMANA
```

El dispositivo puede seguir técnicamente autenticado.

La UI no puede restaurar autoridad mediante refresh, heartbeat, navegación o actividad.

---

#### 39. Inactividad

Cuando la política de la unidad incluya bloqueo por inactividad, debe probarse:

- frontera de inactividad;
- bloqueo de mutaciones;
- preservación segura del trabajo permitido;
- recuperación mediante identificación suficiente;
- no extensión del `hard_ttl`;
- no uso del movimiento o toque como prueba de identidad.

La política de inactividad no sustituye `expires_at`.

---

#### 40. Revocación del dispositivo

Debe probarse que un dispositivo revocado deja de producir nuevos efectos empresariales incluso si:

- la sesión Auth técnica continúa viva;
- NEXO permanece abierto;
- una pestaña mantiene datos;
- existe una actor session anterior;
- existe una firma previa;
- existe una decisión previa;
- existe trabajo local pendiente.

El estado del dispositivo tiene precedencia sobre reidentificación de actor.

---

#### 41. Suspensión y conflicto

Deben distinguirse de la revocación:

- suspensión;
- identidad conflictiva;
- configuración conflictiva;
- aplicación conflictiva;
- indisponibilidad técnica.

Todos bloquean los efectos que su contrato declare, pero no se registran falsamente como revocación.

Un fallo técnico no se presenta como una denegación contractual confirmada si no pudo resolverse la causa.

---

#### 42. Cambio de aplicaciones

Debe probarse que retirar NEXO o cambiar el conjunto efectivo:

- invalida contexto dependiente;
- bloquea nuevos accesos empresariales;
- limpia superficie incompatible;
- invalida decisiones y reautenticaciones relacionadas;
- conserva historia;
- no se revierte por cliente instalado, caché o acceso directo.

Añadir NEXO no concede permisos internos al actor.

---

#### 43. Aplicación predeterminada

Cuando NEXO sea aplicación predeterminada de una instancia, debe verificarse:

- exactamente un default;
- default dentro del conjunto efectivo;
- ausencia de divergencia entre fuentes de configuración;
- launcher coherente;
- comportamiento fail closed ante conflicto.

Ser default no concede `nexo.access`.

---

#### 44. Varias pestañas y ventanas

La prueba debe usar al menos dos superficies concurrentes cuando la plataforma lo permita.

Debe demostrarse:

- un único actor efectivo;
- cambio A→B propagado;
- expiración propagada;
- revocación propagada;
- ausencia de mutación desde pestaña stale;
- ausencia de restauración de A por navegación hacia atrás;
- consistencia del contexto.

Una segunda pestaña no constituye una segunda sesión humana independiente por defecto.

---

#### 45. Offline y reconexión

Debe existir escenario de desconexión o equivalente controlado cuando la unidad admita operación degradada.

Al reconectar se verifica:

- frescura de device;
- frescura de actor session;
- contexto;
- permiso;
- recurso;
- idempotencia;
- decisión actual.

Una intención capturada antes de expiración, cambio de actor o revocación no conserva automáticamente autoridad para ejecutarse después.

---

#### 46. Reintento y resultado incierto

Debe probarse una interrupción donde el cliente no pueda saber si la mutación produjo efecto.

La recuperación deberá:

1. reconciliar estado real;
2. conservar la identidad del intento;
3. evitar duplicado;
4. conservar actor original;
5. exigir nueva autorización si se crea una intención nueva.

Cambiar de actor o reabrir NEXO no autoriza repetir.

---

#### 47. Auditoría

Para una mutación positiva desde dispositivo compartido deberá poder reconstruirse, cuando aplique:

- principal técnico;
- `device_id`;
- trabajador;
- `actor_session_id`;
- aplicación;
- permiso;
- contexto;
- sede;
- área;
- recurso;
- decisión;
- razones;
- resultado empresarial;
- timestamps;
- correlación.

La auditoría no puede depender únicamente de texto libre con el nombre del trabajador.

---

#### 48. Denegaciones auditables

Las pruebas negativas deberán conservar evidencia suficiente para demostrar:

- qué identidad técnica intentó;
- qué dispositivo se resolvió;
- qué actor pudo resolverse;
- qué permiso y recurso se evaluaron;
- qué restricción concluyente bloqueó;
- que el efecto empresarial fue cero.

No se fabrica un actor cuando no pudo resolverse.

---

#### 49. Privacidad

La prueba debe confirmar que no quedan expuestos o persistidos indebidamente:

- PIN;
- contraseña;
- access token;
- refresh token;
- JWT completo;
- secreto administrativo;
- material STRONG reutilizable;
- dato biométrico crudo;
- información personal innecesaria del actor anterior.

Logs, métricas, auditoría, receipts y mensajes deben preservar minimización.

---

#### 50. Experiencia táctil

La certificación física debe observar la interacción real de la unidad.

Debe comprobar:

- controles utilizables mediante toque;
- actor visible de forma inequívoca;
- acción clara de bloquear, cambiar o cerrar actor;
- estados de carga y bloqueo entendibles;
- errores recuperables;
- ausencia de acciones sensibles ocultas detrás de gestos ambiguos;
- contenido utilizable en la orientación y viewport soportados por la unidad;
- foco y navegación accesibles cuando aplique;
- no dependencia exclusiva de color;
- ausencia de clipping que impida ejecutar o comprender una acción necesaria.

No se fija aquí un tamaño físico universal de tablet.

---

#### 51. Periféricos NEXO

Cuando la unidad use cámara, escáner, lector, impresora u otro periférico, la prueba deberá distinguir:

```text
COMANDO ENVIADO AL PERIFERICO
!=
RESULTADO FISICO CONFIRMADO
```

Debe verificarse:

- periférico correcto;
- asociación con la unidad;
- autorización de la acción;
- resultado;
- error;
- recuperación;
- no duplicación;
- limpieza de estado sensible entre actores.

La existencia del periférico no concede autoridad.

---

#### 52. Impresión

Cuando la unidad permita impresión, una prueba deberá conservar diferencia entre:

- vista previa;
- trabajo en cola;
- envío;
- aceptación por dispositivo;
- salida física observada.

La vista previa o el envío no sustituyen confirmación física cuando el criterio exija salida tangible.

Actor, dispositivo y trabajo deben permanecer correlacionables.

---

#### 53. Resultado de negocio

Toda prueba de mutación deberá verificar el estado real del dominio.

No basta con:

- mensaje de éxito;
- `200`;
- redirect;
- toast;
- cambio local de pantalla;
- respuesta de RPC sin reconciliación cuando exista riesgo de resultado incierto.

La evidencia debe comprobar el efecto o no efecto empresarial que el escenario espera.

---

#### 54. Cero efectos en deny

Para cada denegación obligatoria se verificará:

```text
DECISION NO AUTORIZADA
->
CERO NUEVO EFECTO EMPRESARIAL
```

Debe comprobarse el dominio afectado, no solo la respuesta visual.

No puede existir:

- movimiento parcial;
- stock parcialmente cambiado;
- remisión parcialmente alterada;
- auditoría que afirme éxito;
- trabajo de periférico disparado indebidamente.

---

#### 55. Matriz del universo heredado

La tarea conserva las 19 identidades documentales y define su relación con la prueba NEXO sin convertir plantillas u observaciones en unidades físicas.

| `inventory_key` | Clase | Relación con AUTH-DEV-014 | Estado conservado |
| --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` | NEXO pertenece a su conjunto registral candidato; una eventual prueba NEXO solo certifica esa superficie y no sustituye la certificación PULSO de `AUTH-DEV-015` | `REGISTERED_UNVERIFIED` |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` | objetivo registral directo de la prueba NEXO cuando identidad, endpoint, plantilla y unidad física queden reconciliados | `REGISTERED_UNVERIFIED` |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` | candidata a prueba solo después de identidad, enrolamiento y asociación autoritativa; no se infiere NEXO por observación | `OBSERVED_ONLY` |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` | candidata a prueba solo después de identidad, enrolamiento y asociación autoritativa; no se infiere NEXO por observación | `OBSERVED_ONLY` |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de aplicaciones; cada unidad real se prueba según su reducción efectiva | `POLICY_DEFINED` |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de aplicaciones; no concede inventario por la plantilla | `POLICY_DEFINED` |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de aplicaciones; la prueba conserva área y actor de cocina satélite | `POLICY_DEFINED` |
| `target_template:service_satellite` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de aplicaciones; observaciones de servicio no materializan una instancia | `POLICY_DEFINED` |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de aplicaciones; la proximidad con caja o servicio no amplía capacidades | `POLICY_DEFINED` |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de aplicaciones; integración de funciones no suma autoridad | `POLICY_DEFINED` |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` | NEXO pertenece al máximo junto con SHELL y FOGO; área productiva sigue siendo exacta | `POLICY_DEFINED` |
| `target_template:production_bakery` | `TARGET_TEMPLATE` | NEXO pertenece al máximo junto con SHELL y FOGO; panadería no hereda otras áreas | `POLICY_DEFINED` |
| `target_template:production_pastry` | `TARGET_TEMPLATE` | NEXO pertenece al máximo junto con SHELL y FOGO; repostería no hereda otras áreas | `POLICY_DEFINED` |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` | NEXO pertenece al máximo junto con SHELL y ORIGO; la unidad puede reducir a NEXO sin ampliar plantilla | `POLICY_DEFINED` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` | NEXO pertenece al máximo junto con SHELL; movilidad no cambia autoridad ni área base | `POLICY_DEFINED` |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` | NEXO pertenece al máximo junto con SHELL y ORIGO; modos administrativo y operativo siguen separados | `POLICY_DEFINED` |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` | NEXO pertenece al máximo de cinco apps; amplitud de superficie no concede ejecución de otros oficios | `POLICY_DEFINED` |
| `target_template:management_terminal` | `TARGET_TEMPLATE` | NEXO no pertenece al máximo de aplicaciones; una unidad conforme debe bloquear NEXO | `POLICY_DEFINED` |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` | no recibe nuevas unidades ni nueva certificación NEXO | `NO_APLICA` |

Control:

```text
TOTAL ESPERADO: 19
TOTAL MATERIALIZADO: 19

CONFIGURED_INSTANCE: 2
PHYSICAL_OBSERVATION: 2
TARGET_TEMPLATE: 14
RETIRED_LEGACY_TEMPLATE: 1

TARGET_TEMPLATE CON NEXO EN MAXIMO: 13
TARGET_TEMPLATE SIN NEXO EN MAXIMO: 1

FALTANTES: 0
DUPLICADOS: 0
```

---

#### 56. `KIOSCO_BODEGA_CP`

`configured_device:KIOSCO_BODEGA_CP` conserva:

```text
clase = CONFIGURED_INSTANCE
estado documental = REGISTERED_UNVERIFIED
conjunto registral candidato = nexo
default registral candidato = nexo
plantilla candidata = warehouse_kiosk
```

La prueba futura deberá demostrar antes de cambiar ese estado:

- correspondencia con activo físico;
- endpoint;
- principal técnico;
- `device_id`;
- plantilla y versión;
- sede;
- área;
- reducción efectiva de aplicaciones;
- build real de NEXO;
- actor session;
- permisos;
- lifecycle;
- auditoría;
- operación de kiosco real.

La fila técnica por sí sola no constituye certificación.

---

#### 57. Observación de tablet de servicio de Vento Café

La referencia `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` permanece separada de las instancias configuradas.

AUTH-DEV-014 no declara:

- que sea `CAJA_VENTO_CAFE_01`;
- que ejecute NEXO;
- que corresponda a `service_satellite`;
- que posea un `device_id`;
- que use una cuenta técnica conforme;
- que constituya una sola unidad física.

Solo podrá entrar a una ejecución física después de reconciliación y enrolamiento.

---

#### 58. Observación de dispositivo compartido de Saudo

La referencia `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` también permanece `OBSERVED_ONLY`.

El tipo exacto de equipo, cantidad, endpoint, identidad técnica, plantilla y aplicaciones no se infieren.

No se crea una prueba positiva de NEXO sobre esa observación hasta resolver la unidad física.

---

#### 59. Línea base estática observada en NEXO

La inspección del consumidor NEXO actual permite registrar hechos técnicos que deberán cerrarse antes de un PASS físico.

Se observan:

1. `OperationalSession` representa modo `shared_device`, identidad técnica, sede, área, `navigationRole` y apps permitidas;
2. ese shape no expone `actor_session_id` ni `actor_session_expires_at`;
3. el resolutor actual de dispositivo consulta una fila activa y sus aplicaciones;
4. la lógica actual conserva `navigationRole` como `role` de la sesión;
5. la evaluación de permiso de dispositivo usa ese `navigationRole` para `has_operational_role_permission`;
6. la evaluación actual trata el permiso de acceso a aplicación como permitido cuando la aplicación pertenece al conjunto del dispositivo;
7. los argumentos preferidos de sede y área pueden participar en la sesión operacional;
8. existe un helper de firma de actor por acción para dispositivo compartido;
9. ese helper produce una firma, `actor_employee_id` y `actor_shift_id`, pero no demuestra una actor session persistente;
10. el consumidor contiene además flujos NEXO que no usan ese helper.

Estos hechos no constituyen una certificación física.

---

#### 60. Bloqueo estático: actor session no materializada en `OperationalSession`

La forma observada actualmente no contiene:

- `actor_session_id`;
- `actor_session_expires_at`;
- identidad humana efectiva persistida en la sesión operacional.

Por tanto, esa forma por sí sola no puede demostrar:

```text
PRINCIPAL TECNICO
+
DEVICE
+
ACTOR SESSION UNICA Y VIGENTE
+
ACTOR HUMANO
```

Condición de salida para una futura certificación: la unidad y el consumidor deben demostrar consumo de la sesión humana canónica aplicable, o una materialización equivalente que preserve exactamente las mismas invariantes.

---

#### 61. Bloqueo estático: `navigationRole` usado como autoridad

El consumidor observado utiliza `navigationRole` dentro de la evaluación de permisos operativos de dispositivo compartido.

Eso no satisface el contrato aprobado donde:

```text
navigation_role
!=
actor
!=
rol operativo efectivo
!=
permiso
```

Una futura ejecución física debe demostrar que el permiso se resuelve desde el actor humano y su contexto vigente, restringido por el dispositivo.

---

#### 62. Bloqueo estático: acceso de aplicación implícito

La lógica observada retorna autorización para el permiso de acceso de aplicación cuando la app está permitida por el dispositivo.

La prueba de conformidad debe demostrar lo contrario:

```text
APP NEXO EN DEVICE
->
SUPERFICIE ELEGIBLE
->
AUN DEBE RESOLVERSE ACTOR Y AUTORIDAD DE ACCESO
```

El conjunto de aplicaciones no es un grant.

---

#### 63. Bloqueo estático: territorio preferido desde consumidor

La forma observada acepta referencias preferidas de sede y área al resolver `OperationalSession`.

La prueba física debe demostrar que ningún valor solicitado por UI, cookie, query, body o estado de cliente puede ampliar el territorio server-side.

La selección puede orientar una solicitud de contexto, pero no convertirse en autoridad.

---

#### 64. Bloqueo estático: selección de trabajador en retiro de kiosco

La superficie observada de retiro de kiosco presenta una lista de trabajadores y admite un `employee_id` seleccionado.

La interfaz observada incluso describe la confirmación como selección de trabajador sin PIN personal.

Eso no demuestra la identificación humana exigida por `AUTH-DEV-007`.

Una futura prueba no puede aceptar:

```text
SELECCION DE EMPLOYEE_ID
=
ACTOR HUMANO IDENTIFICADO
```

La identificación deberá demostrar presencia e identidad mediante el mecanismo aprobado.

---

#### 65. Bloqueo estático: mutación de kiosco sin firma de actor observada

La acción observada de retiro de kiosco recibe el trabajador desde `FormData`, consulta su asignación y ejecuta mutaciones de inventario.

No se observó en esa acción una llamada al helper de firma de dispositivo compartido ni una actor session humana persistente.

Además, varias escrituras conservan `user.id` como `created_by`; en un dispositivo compartido ese usuario corresponde al principal autenticado técnico, no demuestra por sí solo el trabajador humano.

La futura certificación deberá demostrar atribución separada y correlacionable del principal técnico y del actor humano.

---

#### 66. Firma por acción observada en remisiones

NEXO sí contiene un helper de firma para dispositivo compartido que llama `sign_shared_device_action`.

Ese helper:

- requiere un PIN para la acción cuando la sesión es de dispositivo compartido;
- recibe aplicación, acción y recurso;
- retorna un identificador de firma;
- retorna el empleado resuelto;
- retorna turno cuando existe.

Esta capacidad constituye una base parcial útil.

No demuestra por sí sola:

- una actor session persistente;
- cambio A→B;
- expiración de actor session;
- revocación de todas las superficies;
- limpieza transversal;
- cobertura de kiosco;
- cobertura de todas las mutaciones NEXO.

---

#### 67. Baseline CI de NEXO

NEXO posee una suite automatizada de consumidor.

La evidencia de baseline exige, entre otros controles:

- commit exacto del consumidor;
- identidades de manifest y lockfile;
- contrato y suite identificables;
- ambiente no productivo;
- pruebas ejecutadas;
- cero fallos;
- cero omitidas;
- deny paths demostrados;
- ausencia de secretos.

La suite debe pasar antes de una certificación física cuando forme parte de la unidad.

Sin embargo:

```text
BASELINE CI PASS
!=
TABLET FISICA CERTIFICADA
```

La suite usa escenarios sintéticos y no sustituye hardware, actor real, lifecycle, red ni efectos observados de la unidad.

---

#### 68. Defectos reales y cierre

Todo defecto detectado durante la ejecución física futura debe quedar ligado a:

- escenario;
- unidad;
- build;
- evidencia;
- severidad material;
- contrato incumplido;
- propietario canónico existente;
- condición exacta de salida;
- reejecución requerida.

No se inventa una tarea administrativa para cada defecto.

Si la causa pertenece a un contrato `AUTH-DEV-007` a `AUTH-DEV-013`, su materialización aplicable debe corregirse antes de reejecutar la certificación de la misma unidad.

Si pertenece a NEXO, contexto, servidor, base de datos o UI, se utiliza el propietario canónico existente correspondiente.

Un defecto que permita efecto empresarial sin actor, sin permiso o después de revocación bloquea la certificación.

---

#### 69. Reejecución después de corrección

Una corrección invalida únicamente la evidencia que dependa materialmente del cambio, pero la certificación final debe volver a demostrar todos los escenarios afectados y sus dependencias.

No se conserva un PASS anterior cuando cambió:

- autorización;
- actor session;
- lifecycle;
- territorio;
- paquete;
- app binding;
- código del flujo;
- contrato compartido;
- idempotencia;
- auditoría;
- UI que participa en el escenario.

El historial anterior permanece como evidencia histórica.

---

#### 70. Cobertura positiva y negativa

Una certificación completa no puede contener solo “happy path”.

Como mínimo debe incluir por familia:

- caso permitido;
- actor ausente;
- actor incorrecto o no elegible;
- permiso ausente;
- device fuera de política;
- app fuera de conjunto;
- territorio incompatible;
- recurso incompatible;
- sesión expirada;
- cambio de actor;
- device revocado;
- estado stale;
- resultado incierto;
- reintento;
- concurrencia cuando aplique.

La ausencia de deny paths demostrados impide certificar autorización.

---

#### 71. Separación entre capas

Cada escenario debe poder distinguir si el control fue observado en:

- UI;
- RSC o render server-side;
- Server Action;
- Route Handler o API;
- RPC/PostgREST;
- RLS/Data API;
- procesamiento asíncrono;
- cliente offline;
- Realtime;
- periférico.

No todas las capas participan en todos los escenarios.

Cuando una capa sí pueda producir el mismo efecto protegido, deberá producir una decisión equivalente.

---

#### 72. No confianza en la UI

La prueba debe intentar el mismo efecto sin depender del control visual cuando el canal técnico exista.

Ejemplos contractuales:

- acceso directo;
- request manual controlada;
- RPC protegida;
- reintento desde estado stale.

Ocultar un botón no constituye una denegación server-side.

---

#### 73. Recurso y cantidad

En inventario y remisiones, una prueba de autorización no se limita al código de permiso.

Debe validar también:

- recurso;
- producto;
- LOC;
- documento;
- cantidad;
- estado;
- sede;
- área;
- transición.

Un permiso correcto sobre el recurso equivocado debe fallar.

---

#### 74. Idempotencia

Para toda mutación que admita reintento, el protocolo debe provocar un reintento controlado.

Se comprobará:

- mismo intento lógico no duplica efecto;
- actor original se conserva;
- correlation no concede autoridad;
- una nueva sesión no convierte el reintento en intención de B;
- un `ALLOW` previo no se reutiliza después de un cambio material.

---

#### 75. Auditoría de cambio de actor

El caso A→B debe permitir reconstruir:

- sesión A;
- trabajador A;
- cierre de A;
- estado de pendientes;
- limpieza;
- frontera sin actor;
- identificación de B;
- sesión B;
- trabajador B;
- acciones posteriores de B.

No es obligatorio registrar A y B en una sola fila.

Sí es obligatorio que la historia sea inequívoca.

---

#### 76. Seguridad del secreto humano

Cuando se use PIN u otra prueba humana:

- se captura solo para el propósito permitido;
- se valida en servidor;
- no se conserva en contexto;
- no se incluye en auditoría;
- no se muestra al siguiente actor;
- no se usa como permiso;
- no se usa como STRONG salvo contrato independiente que lo establezca;
- no se reutiliza como credencial universal.

La evidencia de la prueba conserva referencia opaca, no el secreto.

---

#### 77. Respuesta ante fallo técnico

La prueba debe distinguir:

```text
DENY CONTRACTUAL
!=
FALLO TECNICO
```

Si no puede resolverse dispositivo, actor, reloj, contexto, política o recurso por indisponibilidad:

- no se fabrica un `ALLOW`;
- no se fabrica una causa concluyente que no fue observada;
- no se produce el efecto protegido;
- la interfaz ofrece recuperación segura;
- la auditoría conserva el fallo técnico suficiente.

---

#### 78. Recuperación

Después de un fallo, la recuperación no puede:

- usar una cuenta genérica;
- restaurar al último actor;
- escoger una sesión arbitraria;
- desactivar permisos;
- ejecutar con service role como bypass;
- omitir el control de sede o área;
- reenviar automáticamente una mutación incierta;
- reactivar un dispositivo revocado.

La recuperación vuelve a una frontera autorizativa válida.

---

#### 79. Estado de la unidad después de la prueba

El resultado físico futuro debe conservar por separado:

- estado técnico del dispositivo;
- suficiencia de evidencia física;
- resultado de los escenarios;
- defectos abiertos;
- validez temporal de la evidencia.

Un dispositivo técnicamente activo puede seguir sin certificación.

Una unidad con un defecto crítico no se presenta como parcialmente autorizada para el mismo efecto protegido.

---

#### 80. Criterio sobre las dos instancias registradas

Las dos instancias actuales continúan `REGISTERED_UNVERIFIED`.

`AUTH-DEV-014` no cambia ese estado documental por inspección de código.

Para `KIOSCO_BODEGA_CP`, esta tarea define el protocolo que permitirá aportar la evidencia NEXO necesaria cuando exista una unidad física reconciliada y autorizada.

Para `CAJA_VENTO_CAFE_01`, la dimensión NEXO puede probarse dentro de una unidad que efectivamente la exponga, pero la certificación del comportamiento terminal PULSO permanece reservada a `AUTH-DEV-015`.

---

#### 81. Resultado documental de esta tarea

La tarea deja definidos:

1. unidad exacta de certificación;
2. precondiciones;
3. evidencia mínima;
4. criterio de PASS;
5. invalidación de evidencia stale;
6. doce superficies NEXO;
7. pruebas positivas y negativas;
8. identificación humana;
9. actor session;
10. permiso y techo;
11. sede, área y recurso;
12. STRONG;
13. kiosco;
14. retiros;
15. remisiones;
16. inventario;
17. lifecycle;
18. cambio de actor;
19. offline, concurrencia e idempotencia;
20. auditoría;
21. privacidad;
22. experiencia táctil;
23. periféricos;
24. universo de 19 identidades;
25. bloqueos estáticos actuales;
26. criterio para defectos y reejecución.

La evidencia física permanece pendiente de la futura materialización autorizada.

---

#### 82. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

El protocolo desarrolla y hace ejecutables obligaciones de prueba ya presentes en el registro canónico. No modifica el registro modular.

---

#### 83. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificación:

- `TREQ-AUTH-003` — lifecycle auditable de dispositivo compartido, incluido cambio de actor, expiración, suspensión y revocación;
- `TREQ-AUTH-011` — actor humano real e intersección entre límites del dispositivo y permisos del trabajador;
- `TREQ-AUTH-014` — invalidación de contexto, caché y autoridad derivada ante cambios relevantes;
- `TREQ-AUTH-015` — evidencia correlacionable de principal, actor, dispositivo, contexto, decisión y resultado;
- `TREQ-AUTH-052` — aplicación fuera del conjunto efectivo bloqueada también por acceso directo y capas server-side;
- `TREQ-AUTH-053` — aplicación predeterminada única y conflicto fail closed;
- `TREQ-AUTH-054` — cambio de aplicación o actor limpia estado incompatible y reautenticaciones;
- `TREQ-AUTH-058` — cobertura exacta del universo de 19 identidades y asociaciones máximas de aplicaciones;
- `TREQ-AUTH-269` — bloqueo de solicitudes empresariales desde dispositivo compartido no autorizable;
- `TREQ-AUTH-271` — resolución determinista del estado y configuración del dispositivo;
- `TREQ-AUTH-272` — clasificación de capacidades compatibles con dispositivo compartido;
- `TREQ-AUTH-273` — sesión única y vigente del actor, política humana, territorio, recurso y STRONG cuando corresponda;
- `TREQ-AUTH-275` — paridad de decisión entre canales;
- `TREQ-AUTH-277` — recuperación segura, invalidación, privacidad y auditoría en bloqueos;
- `TREQ-AUTH-278` — reconciliación física de sesiones, paquetes, invalidación y consumidores compartidos;
- `TREQ-AUTH-331` — separación de estados interactivos de identificación y STRONG respecto de denegaciones de dispositivo;
- `TREQ-NEXO-006` — remisiones sin doble contabilización y con efecto real verificable;
- `TREQ-NEXO-009` — jerarquía única para capacidades de remisión con paridad entre interfaz y servidor;
- `TREQ-NEXO-011` — movimientos y proyecciones reconciliables, atomicidad, idempotencia y operación offline;
- `TREQ-NEXO-028` — acceso por LOC normalizado y destino local seguro;
- `TREQ-NEXO-029` — kiosco restringido a targets declarados;
- `TREQ-NEXO-030` — cobertura del middleware sobre las superficies aplicables.

Estas referencias son trazabilidad de cobertura existente y no representan cambios al registro.

---

#### 84. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | El build documental y el build del consumidor se ejecutarán en sus etapas correspondientes después de incorporar el contrato. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores sobre el checkout local del usuario durante la preparación documental. |
| REMOTA | `NOT_EXECUTED` | Se inspeccionó el estado vigente de repositorios y contratos como fuente, pero no se ejecutó un gate remoto de AUTH-DEV-014. |
| OPERATIVA | `NOT_EXECUTED` | Los escenarios operativos definidos por esta tarea requieren una unidad autorizada y todavía no fueron ejecutados. |
| FÍSICA | `NOT_EXECUTED` | No se ejecutó una tablet, kiosco o unidad física; la evidencia deberá provenir de la futura instancia `PER_IMPLEMENTATION_UNIT`. |

---

#### 85. Criterios de aceptación

- [x] La tarea define un protocolo reutilizable por `implementation_unit_id`.
- [x] La materialización permanece detrás de `POST_E5_PACKAGE`.
- [x] No se declara una certificación física sin ejecución.
- [x] Se recibe exactamente el handoff de `AUTH-DEV-013`.
- [x] Se verifican las obligaciones de `AUTH-DEV-001` a `AUTH-DEV-013` sin reabrirlas.
- [x] Se define identidad mínima de la unidad física.
- [x] Se define evidencia mínima reproducible.
- [x] Se define criterio de PASS físico.
- [x] La evidencia stale no certifica un estado nuevo.
- [x] Se cubren las doce superficies de baseline NEXO.
- [x] Se distingue CI sintético de certificación física.
- [x] Se exige prueba con principal técnico y sin actor.
- [x] Se exige identificación humana real.
- [x] Seleccionar un trabajador no sustituye identificación.
- [x] Se exige una sola actor session elegible.
- [x] NEXO permitido en el device no concede `nexo.access`.
- [x] `nexo.access` no concede permisos internos.
- [x] `navigation_role` no concede autoridad.
- [x] Se exige intersección trabajador–dispositivo.
- [x] Se prueba sede.
- [x] Se prueba área.
- [x] Se prueban turno y check-in cuando correspondan.
- [x] Se prueban capacidades STANDARD.
- [x] Se prueban capacidades STRONG.
- [x] Se prueban capacidades no admitidas en dispositivo compartido.
- [x] Se prueba kiosco y acceso por LOC.
- [x] Se prueba retiro con y sin destino cuando aplique.
- [x] Se prueban remisiones representativas.
- [x] Se prueba inventario y movimientos según techo de la unidad.
- [x] Se prueba que configuración permanezca restringida.
- [x] Se prueba cambio A→B.
- [x] Se prueba limpieza de estado de A.
- [x] Se prueba expiración.
- [x] Se prueba inactividad cuando aplique.
- [x] Se prueba revocación.
- [x] Se prueban suspensión y conflicto sin confundirlos con revocación.
- [x] Se prueba cambio de aplicaciones.
- [x] Se prueba default de aplicación.
- [x] Se prueba consistencia entre varias superficies concurrentes.
- [x] Se prueba offline cuando la unidad lo admita.
- [x] Se prueba resultado incierto.
- [x] Se prueba reintento e idempotencia.
- [x] Se exige auditoría conjunta.
- [x] Se exige cero efectos en deny.
- [x] Se exige minimización de secretos y datos personales.
- [x] Se incluye experiencia táctil.
- [x] Se incluyen periféricos cuando existan.
- [x] Se distingue envío a periférico de resultado físico.
- [x] Se exige comprobar el efecto empresarial real.
- [x] Se preservan las 19 identidades.
- [x] Se preserva la distribución 2 + 2 + 14 + 1.
- [x] Se preservan 13 plantillas con NEXO y 1 sin NEXO.
- [x] `KIOSCO_BODEGA_CP` permanece `REGISTERED_UNVERIFIED`.
- [x] `CAJA_VENTO_CAFE_01` permanece `REGISTERED_UNVERIFIED`.
- [x] Las dos observaciones permanecen `OBSERVED_ONLY`.
- [x] `management_terminal` no recibe NEXO.
- [x] `production_center` permanece retirada.
- [x] Se registran los bloqueos estáticos observados del consumidor sin declararlos prueba física.
- [x] Se reconoce el helper de firma por acción como base parcial, no como actor session completa.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autoriza ningún cambio físico.
- [x] `AUTH-DEV-015` conserva íntegra la certificación específica de terminales PULSO.

---

#### 86. Handoff exacto hacia AUTH-DEV-015

`AUTH-DEV-014` entrega a `AUTH-DEV-015`:

```text
PROTOCOLO DE CERTIFICACION POR IMPLEMENTATION_UNIT DEFINIDO
+
IDENTIDAD Y EVIDENCIA MINIMAS DEFINIDAS
+
DENY PATHS OBLIGATORIOS
+
ACTOR SESSION Y LIFECYCLE OBSERVABLES
+
CAMBIO A -> B Y LIMPIEZA OBSERVABLES
+
PARIDAD ENTRE CANALES EXIGIDA
+
CERO EFECTOS EN DENY
+
UNIVERSO DE 19 IDENTIDADES PRESERVADO
+
FRONTERA NEXO CERRADA DOCUMENTALMENTE
```

`AUTH-DEV-015` podrá reutilizar las invariantes transversales de dispositivo compartido, pero deberá definir y comprobar de forma independiente las particularidades de las terminales PULSO.

AUTH-DEV-014 no desarrolla pagos, caja, venta, salón, canje ni otras operaciones específicas de PULSO.

---

#### 87. Límites

Esta tarea no:

- ejecuta una tablet;
- ejecuta un kiosco;
- ejecuta una prueba física;
- modifica dispositivos;
- enrola endpoints;
- asocia activos;
- cambia plantillas;
- cambia aplicaciones;
- cambia paquetes de permisos;
- cambia sede o área;
- crea actor sessions reales;
- cambia trabajadores reales;
- modifica turnos;
- modifica check-ins;
- revoca dispositivos;
- cambia sesiones Auth;
- rota credenciales;
- modifica código NEXO;
- modifica código SHELL;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica RPC;
- modifica grants;
- modifica datos reales;
- modifica configuración;
- despliega;
- certifica `KIOSCO_BODEGA_CP`;
- certifica `CAJA_VENTO_CAFE_01`;
- identifica técnicamente las dos observaciones físicas;
- convierte una plantilla en unidad desplegada;
- declara que una suite CI sustituye una prueba física;
- corrige los bloqueos estáticos observados;
- redefine autorización NEXO;
- desarrolla `NEXO-AUTH-016`;
- desarrolla `NEXO-AUTH-020`;
- desarrolla `AUTH-DEV-015`;
- desarrolla `AUTH-DEV-016`;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A.

---

#### 88. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-013 — Manejar cambio de trabajador`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-014 — Probar tablets de NEXO`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-015 — Probar terminales de PULSO`


### ✅ AUTH-DEV-015 — Probar terminales de PULSO

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-014 — Probar tablets de NEXO
**Tarea siguiente:** AUTH-DEV-016 — Probar pantallas de FOGO
**Tipo de tarea:** documental; contrato canónico de prueba y certificación por unidad de implementación para terminales compartidos que exponen PULSO, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/03_SESION_REVOCACION_Y_PRUEBAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada, reproducible y auditable cómo se deberá probar una unidad física de terminal compartido que exponga PULSO antes de declararla conforme con los contratos de dispositivo compartido, autorización, venta, caja, pedidos, salón, fidelización y experiencia aplicables.

La tarea convierte el título “Probar terminales de PULSO” en un contrato verificable por `implementation_unit_id`.

La certificación futura deberá demostrar simultáneamente:

```text
IDENTIDAD FISICA Y TECNICA RESUELTAS
+
DEVICE ELEGIBLE
+
PULSO EN EL CONJUNTO EFECTIVO DE APLICACIONES
+
ACTOR HUMANO UNICO Y VIGENTE
+
AUTORIDAD HUMANA INTERSECTADA CON EL TECHO DEL DEVICE
+
SEDE, AREA, RECURSO Y ESTADO COMPATIBLES
+
ACCION PULSO EXACTA AUTORIZADA
+
DENEGACIONES FAIL CLOSED
+
LIFECYCLE DE ACTOR Y DEVICE
+
AUDITORIA CORRELACIONABLE
+
LIMPIEZA ENTRE ACTORES
+
ATOMICIDAD, IDEMPOTENCIA Y RECUPERACION
+
RESULTADO COMERCIAL REAL VERIFICABLE
=
UNIDAD PULSO COMPARTIDA CERTIFICABLE
```

Una prueba de navegador, un build, una suite sintética, una fila activa de dispositivo, una firma aislada o una captura visual no equivalen por sí solos a certificación física.

---

#### 2. Naturaleza del marcador y materialización posterior

El marcador canónico se desarrolla una sola vez como contrato reutilizable.

La topología física aplicable es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Por tanto:

1. esta tarea documental no crea ni ejecuta una instancia física;
2. cada unidad física aplicable tendrá como máximo una materialización propia del contrato;
3. una misma unidad podrá conservar lineage hacia los paquetes que la consuman;
4. la ejecución física exige el package propietario aplicable y su gate E5 correspondiente;
5. la certificación de PULSO no se ejecuta anticipadamente por existir código actual;
6. la prueba de una terminal no certifica otra terminal;
7. la evidencia de una plantilla no certifica una instancia;
8. la evidencia de una instancia registral no certifica su correspondencia física.

---

#### 3. Handoff recibido de AUTH-DEV-014

`AUTH-DEV-014` entrega a esta tarea:

```text
PROTOCOLO DE CERTIFICACION POR IMPLEMENTATION_UNIT DEFINIDO
+
IDENTIDAD Y EVIDENCIA MINIMAS DEFINIDAS
+
DENY PATHS OBLIGATORIOS
+
ACTOR SESSION Y LIFECYCLE OBSERVABLES
+
CAMBIO A -> B Y LIMPIEZA OBSERVABLES
+
PARIDAD ENTRE CANALES EXIGIDA
+
CERO EFECTOS EN DENY
+
UNIVERSO DE 19 IDENTIDADES PRESERVADO
+
FRONTERA NEXO CERRADA DOCUMENTALMENTE
```

`AUTH-DEV-015` reutiliza esas invariantes transversales y añade únicamente las particularidades de una terminal PULSO.

No redefine:

- identidad del dispositivo;
- actor session;
- cambio de trabajador;
- expiración;
- revocación;
- aplicación permitida;
- paquete máximo;
- precedencia de autorización;
- semántica de NEXO.

---

#### 4. Frontera con el BLOQUE N PULSO

Esta tarea no implementa ni sustituye las tareas propietarias de PULSO.

La certificación futura consume, cuando estén materializadas, los resultados de:

- `PULSO-AUTH-001` a `PULSO-AUTH-008`, que inventarían superficies y definen permisos;
- `PULSO-AUTH-009`, que protege acumulación de puntos;
- `PULSO-AUTH-010`, que protege redenciones;
- `PULSO-AUTH-011`, que limita operación a sede del turno;
- `PULSO-AUTH-012`, que integra dispositivos POS compartidos;
- `PULSO-AUTH-013`, que registra al trabajador que ejecuta la operación;
- `PULSO-AUTH-014`, que mantiene configuración administrativa separada;
- `PULSO-AUTH-015`, que migra a paquetes de `vento-shell`;
- `PULSO-AUTH-016`, que ejecuta pruebas integrales;
- `PULSO-UX-001` a `PULSO-UX-021`, que definen la experiencia POS objetivo.

El contrato de esta tarea especifica qué deberá demostrar físicamente una terminal cuando esos propietarios hayan entregado sus capacidades.

No inventa las claves atómicas que `PULSO-AUTH` todavía debe fijar.

---

#### 5. Unidad exacta de certificación

La certificación pertenece a una `implementation_unit_id` concreta.

Antes de ejecutar escenarios físicos deberá quedar resuelta y registrada, sin ambigüedad, la relación entre:

- `implementation_unit_id`;
- activo físico;
- endpoint;
- `device_id`;
- `device_code`;
- principal técnico;
- plantilla y versión;
- vínculo de sede;
- política de área;
- asociaciones efectivas de aplicaciones;
- aplicación predeterminada;
- paquete máximo de capacidades;
- versión desplegada de PULSO;
- versiones de contratos compartidos consumidos;
- ambiente de prueba;
- estación o puesto físico aplicable;
- periféricos relevantes;
- evidencia de autorización física aplicable.

La certificación de una unidad no se hereda por modelo de hardware, nombre del puesto, sede, plantilla o versión de aplicación.

---

#### 6. Condiciones previas obligatorias

Una ejecución física solo puede comenzar cuando la unidad cumpla las precondiciones de su lifecycle.

Debe demostrarse:

1. identidad física y técnica reconciliada;
2. `device_id` único;
3. principal técnico vinculado de forma inequívoca;
4. estado del dispositivo resoluble;
5. plantilla y versión resolubles;
6. sede resoluble;
7. política de área resoluble;
8. PULSO dentro del conjunto efectivo cuando el escenario lo requiera;
9. paquete máximo versionado y resoluble;
10. build de PULSO identificable;
11. contratos compartidos identificables;
12. datos de prueba controlados;
13. actores de prueba válidos;
14. recursos comerciales de prueba identificables;
15. ausencia de conflictos de identidad pendientes;
16. owner de cada capacidad PULSO materializado cuando el escenario dependa de ella;
17. autorización física del package aplicable.

Una observación física sin enrolamiento no satisface estas precondiciones.

---

#### 7. Evidencia mínima por ejecución física

Cada ejecución futura deberá conservar evidencia suficiente para reproducir qué se probó.

Como mínimo:

- unidad de implementación;
- `device_id`;
- referencia del activo y endpoint;
- principal técnico;
- plantilla y versión;
- sede y área gobernadas;
- conjunto efectivo de aplicaciones;
- paquete máximo y versión;
- commit o build exacto de PULSO;
- versiones de contratos compartidos;
- ambiente;
- momento de inicio y finalización;
- actor humano del escenario cuando aplique;
- `actor_session_id` cuando aplique;
- permiso o capacidad exactos;
- recurso exacto;
- estado comercial previo;
- estado esperado;
- estado observado;
- decisión de autorización;
- razones estructuradas cuando existan;
- correlación;
- idempotency key o referencia estable cuando aplique;
- receipt o evidencia del efecto;
- estado empresarial posterior;
- resultado del escenario;
- defecto asociado cuando el resultado no sea conforme.

La evidencia no debe incluir PIN, token, secreto, credencial reutilizable ni payload sensible innecesario.

---

#### 8. Regla de PASS físico

La unidad solo podrá declararse conforme cuando todos los escenarios obligatorios aplicables hayan sido ejecutados y no exista un fallo pendiente que afecte el contrato.

Debe cumplirse:

```text
ESCENARIOS OBLIGATORIOS EJECUTADOS
+
DENY PATHS DEMOSTRADOS
+
CAPACIDADES PULSO PROPIETARIAS MATERIALIZADAS
+
CERO FALLOS CONTRACTUALES ABIERTOS
+
CERO ESCENARIOS OMITIDOS SIN JUSTIFICACION CANONICA
+
EVIDENCIA IDENTIFICABLE Y NO STALE
=
PASS FISICO POSIBLE
```

Una capacidad PULSO todavía no implementada no se convierte en PASS.

Si la unidad no debe poseer una capacidad, el escenario correspondiente demuestra indisponibilidad o denegación conforme.

---

#### 9. Evidencia stale

La evidencia deja de certificar el estado actual cuando cambia materialmente alguno de los elementos de los que depende.

Incluye, según corresponda:

- unidad física;
- endpoint;
- `device_id`;
- principal técnico;
- plantilla o versión;
- sede;
- política de área;
- conjunto de aplicaciones;
- aplicación predeterminada;
- paquete máximo;
- commit o build de PULSO;
- versión de contratos compartidos;
- definición de permisos PULSO;
- política de actor;
- política temporal;
- configuración de autorización;
- integración PULSO–PASS;
- integración PULSO–NEXO;
- proveedor de pagos;
- ambiente;
- fixture o recurso usado por el escenario.

Una evidencia stale se conserva históricamente, pero no certifica el estado nuevo.

---

#### 10. Línea base técnica de PULSO

La línea base automatizada actual de PULSO define doce superficies de consumidor.

| Superficie | Cobertura |
| --- | --- |
| `PULSO-SURFACE-001` | identidad, sesión, SSO y acceso PULSO |
| `PULSO-SURFACE-002` | contexto operativo, sede, actor y dispositivo |
| `PULSO-SURFACE-003` | inventario de rutas y navegación |
| `PULSO-SURFACE-004` | escáner e identificación de cliente |
| `PULSO-SURFACE-005` | loyalty, redención y acreditación |
| `PULSO-SURFACE-006` | pedidos, líneas, estado, pago y fulfillment |
| `PULSO-SURFACE-007` | despacho, chat, facturación e historial |
| `PULSO-SURFACE-008` | salón, mesas, sesiones, llamados y Realtime |
| `PULSO-SURFACE-009` | importación de ventas, mapeos, lotes y publicación |
| `PULSO-SURFACE-010` | atomicidad, idempotencia, concurrencia y recuperación |
| `PULSO-SURFACE-011` | integración y fronteras de dominio |
| `PULSO-SURFACE-012` | UI, SSR, interacción, accesibilidad y Realtime |

La suite de baseline exige exactamente 42 pruebas contractuales, cero fallos, cero omitidas y al menos 16 deny paths.

Ese baseline es prerrequisito técnico útil.

No constituye por sí solo evidencia física de una terminal.

---

#### 11. Inventario de rutas observado

La línea base vigente reconoce seis archivos de página y cinco rutas de negocio más una ruta de denegación.

Las superficies observadas incluyen:

- raíz;
- scanner;
- orders;
- sales-imports;
- salon;
- no-access.

La certificación física debe mantener esa identidad de snapshot y detectar cualquier delta material antes de reutilizar evidencia.

Una página existente no demuestra que su proceso empresarial completo esté implementado.

---

#### 12. Matriz de cobertura por superficie PULSO

Para cada unidad física probada se deberá materializar una decisión sobre las doce superficies.

| Superficie | Comprobación mínima en terminal compartido |
| --- | --- |
| `PULSO-SURFACE-001` | principal técnico separado, actor session vigente, acceso PULSO legítimo, retorno SSO seguro y deny sin actor o autoridad |
| `PULSO-SURFACE-002` | sede, área, rol operativo, turno, check-in, actor y device se resuelven desde fuentes vigentes |
| `PULSO-SURFACE-003` | rutas directas no eluden sesión, aplicación, actor, territorio ni permiso |
| `PULSO-SURFACE-004` | escáner identifica cliente sin convertir identidad de cliente en identidad laboral ni usar sede de cliente como autoridad |
| `PULSO-SURFACE-005` | puntos y redención exigen actor real, comando autorizado, sede, idempotencia, auditoría y resultado PASS correlacionado |
| `PULSO-SURFACE-006` | pedido, línea, transición, pago y fulfillment permanecen separados y protegidos por acción |
| `PULSO-SURFACE-007` | despacho, chat, facturación e historial conservan permisos y estados independientes |
| `PULSO-SURFACE-008` | salón, mesas, sesiones y llamados quedan limitados por sede, actor y transición real |
| `PULSO-SURFACE-009` | importación, mapeo y publicación usan autorización, archivo validado, idempotencia y auditoría |
| `PULSO-SURFACE-010` | reintentos, concurrencia, timeouts y respuestas perdidas no duplican efectos |
| `PULSO-SURFACE-011` | PASS, NEXO, NUMERA, SHELL y proveedores permanecen como dominios separados con contratos explícitos |
| `PULSO-SURFACE-012` | UI táctil, SSR, interacción y Realtime reflejan estado real sin convertirse en fuente de autoridad |

La cobertura no exige que una unidad posea todas las capacidades comerciales.

Exige demostrar que lo que está fuera de su alcance no puede ejecutarse.

---

#### 13. Principal técnico sin actor humano

Debe probarse el terminal autenticado y elegible sin actor humano vigente.

Resultado requerido:

```text
PRINCIPAL TECNICO VALIDO
+
DEVICE ELEGIBLE
+
PULSO DISPONIBLE
+
ACTOR HUMANO AUSENTE
=
CERO MUTACION EMPRESARIAL QUE EXIJA HUMANO
```

La UI puede ofrecer identificación.

No puede:

- inferir último cajero;
- inferir último mesero;
- usar `navigation_role` como actor;
- usar el principal técnico como trabajador;
- reutilizar una firma anterior;
- degradar ausencia de actor a autorización.

---

#### 14. Identificación del trabajador

La prueba debe demostrar que el humano real se identifica por un mecanismo aprobado y validado server-side.

No es suficiente:

- seleccionar un nombre;
- enviar un `employee_id`;
- usar el trabajador programado;
- usar la cuenta técnica;
- usar el rol de navegación;
- usar la sede del terminal;
- recordar al último actor;
- confiar en un valor del frontend.

La identidad humana debe quedar separada de cliente, dispositivo, cuenta Auth técnica, mesa y orden.

---

#### 15. Actor session única

Debe probarse:

```text
0 SESIONES ELEGIBLES
->
SIN ACTOR EFECTIVO
```

```text
1 SESION ELEGIBLE
->
ACTOR CANDIDATO UNICO
```

```text
2 O MAS SESIONES INCOMPATIBLES
->
INCONSISTENCIA
->
CERO NUEVO EFECTO EMPRESARIAL
```

No se elige la sesión más nueva, la primera fila ni la que coincida con la pantalla abierta.

---

#### 16. Aplicación PULSO permitida

La prueba positiva exige que `pulso` pertenezca al conjunto efectivo de aplicaciones de la instancia.

Debe demostrarse:

```text
PULSO EN PLANTILLA
+
PULSO EN INSTANCIA VIGENTE
+
CLIENTE COMPATIBLE
+
VINCULO ACTIVO Y SIN CONFLICTO
=
SUPERFICIE PULSO ELEGIBLE PARA CONTINUAR EVALUACION
```

Esto no concede automáticamente ninguna operación comercial.

---

#### 17. PULSO fuera del conjunto efectivo

Debe existir una prueba negativa donde PULSO no pertenezca al conjunto efectivo o haya sido retirado, suspendido o conflictuado.

Resultado requerido:

- no se ofrece como superficie empresarial disponible;
- acceso directo no crea autoridad;
- una instalación local no reintroduce acceso;
- caché o pestaña antigua no reabre PULSO;
- Server Actions y otros canales no eluden el estado;
- no se producen efectos empresariales.

---

#### 18. `pulso.access` no concede operación comercial

La prueba debe demostrar:

```text
PULSO PERMITIDO EN DEVICE
!=
pulso.access HUMANO
!=
CAPACIDAD COMERCIAL ESPECIFICA
```

La presencia de `pulso.access` en el techo del dispositivo solo permite continuar la evaluación que corresponda.

No concede por sí sola:

- venta;
- pedido;
- línea;
- precio;
- pago;
- caja;
- anulación;
- reembolso;
- despacho;
- fidelización;
- redención;
- salón;
- configuración;
- importación.

---

#### 19. `pulso.pos.main` como superficie legacy amplia

El consumidor vigente usa `pulso.pos.main` como guard amplio de sus cinco rutas de negocio.

El catálogo canónico conserva esa clave como `DECOMPOSE_REQUIRED`.

Por tanto, la prueba física final no puede aceptar:

```text
pulso.pos.main = TODA AUTORIDAD PULSO
```

La suficiencia del permiso debe demostrarse con las capacidades exactas que definan los propietarios `PULSO-AUTH`.

`AUTH-DEV-015` no inventa esas claves antes de que existan.

---

#### 20. Techo actual de `CAJA_VENTO_CAFE_01`

La instancia registral candidata conserva:

```text
template = pos_satellite
apps = shell + nexo + pulso
default_app_candidate = pulso
device_package_candidate =
  DEVICE-SHELL-CORE-v1
  +
  DEVICE-SATELLITE-REQUESTER-v1
```

Ese techo candidato tiene 12 claves: 11 `STANDARD` y 1 `STRONG`.

Dentro de `DEVICE-SATELLITE-REQUESTER-v1`, la clave PULSO observada es `pulso.access`; la clave fuerte observada pertenece a NEXO.

Consecuencia:

la existencia del paquete candidato actual no demuestra todavía un techo final para las operaciones atómicas de PULSO.

La reconciliación pertenece a la integración y migración PULSO posteriores; la certificación no ampliará el package por inferencia.

---

#### 21. Intersección trabajador–dispositivo

Para toda operación PULSO protegida:

```text
AUTORIDAD HUMANA VIGENTE
INTERSECCION
TECHO EFECTIVO DEL DISPOSITIVO
INTERSECCION
APLICACION PULSO EFECTIVA
INTERSECCION
TERRITORIO
INTERSECCION
RECURSO
INTERSECCION
ESTADO DE NEGOCIO
=
CAPACIDAD EVALUABLE
```

La prueba debe incluir:

1. actor autorizado y device compatible;
2. actor autorizado y device incompatible;
3. device compatible y actor sin capacidad;
4. actor/device compatibles con sede incompatible;
5. actor/device compatibles con recurso incompatible;
6. actor/device compatibles con transición de estado inválida.

Solo el primer caso puede continuar hacia `ALLOW`, sujeto a los demás controles.

---

#### 22. Rol de navegación

`navigation_role` se prueba únicamente como dato de navegación o presentación.

No puede ser fuente de:

- actor;
- rol base;
- rol operativo;
- permiso;
- sede;
- área;
- capacidad PULSO;
- acceso a caja;
- acceso a pedidos;
- bypass.

Una operación que funcione porque `navigation_role` coincide con un rol operativo no es conforme.

---

#### 23. Sede del terminal

La sede del terminal es un límite adicional.

Debe probarse:

- actor compatible con la sede;
- actor de otra sede;
- recurso de otra sede;
- pedido de otra sede;
- mesa de otra sede;
- `site_id` manipulado;
- cache de una sede anterior;
- cambio autorizado de sede cuando exista contrato para ello.

Un parámetro `site_id` del cliente nunca amplía territorio.

---

#### 24. Área del terminal

Debe probarse la política de área aplicable a la plantilla e instancia.

En perfiles satélite ordinarios la política esperada es de área operacional exacta.

La prueba debe demostrar que:

- el device no crea el área del actor;
- el actor no hereda el área de la pantalla;
- un recurso de otra área no se autoriza por estar visible;
- una selección de cliente no amplía área;
- cambiar de área invalida contexto dependiente;
- una política ausente, múltiple o contradictoria falla cerrado.

---

#### 25. Turno y check-in

Cuando la operación sea laboral-operativa, debe probarse:

- turno publicado y vigente;
- check-in activo;
- coincidencia con trabajador;
- sede compatible;
- área compatible;
- rol operativo aplicable.

Debe existir prueba negativa para:

- turno ausente;
- turno vencido;
- turno de otro trabajador;
- check-in ausente;
- check-in residual;
- sede o área incompatibles.

El terminal no aporta turno ni check-in.

---

#### 26. Capacidad STANDARD

Una capacidad clasificada como `STANDARD_ACTOR_SESSION` deberá exigir:

- actor session única y vigente;
- device elegible;
- aplicación efectiva;
- permiso exacto;
- contexto;
- territorio;
- recurso;
- estado comercial;
- ausencia de denegaciones.

Una firma de una operación anterior no reemplaza la actor session.

---

#### 27. Capacidad STRONG

Una capacidad `STRONG_REAUTH_REQUIRED` deberá demostrar:

```text
ACTOR SESSION VIGENTE
+
PERMISO Y CONTEXTO VALIDOS
+
STRONG DEL MISMO ACTOR
+
ACCION Y RECURSO COMPATIBLES
=
PUEDE CONTINUAR EVALUACION
```

Debe probarse que:

- un PIN ligero no cuenta como STRONG por sí solo;
- STRONG de A no sirve para B;
- STRONG de otro recurso no se reutiliza;
- STRONG vencida no se revive por actividad;
- cambio de actor la invalida.

---

#### 28. Capacidad NOT_ALLOWED

Cuando una capacidad esté clasificada `NOT_ALLOWED` para dispositivo compartido:

```text
DEVICE COMPARTIDO
+
CAPACIDAD NOT_ALLOWED
=
CERO EFECTO EMPRESARIAL
```

Ni supervisor, administrador, PIN, STRONG, URL directa ni presencia física convierten esa capacidad en permitida.

---

#### 29. Acceso directo por ruta

La certificación debe intentar las rutas de negocio mediante acceso directo.

Debe demostrar:

- sesión válida;
- PULSO efectivo;
- actor conforme;
- territorio;
- guard aplicable;
- permiso o capacidad de la superficie;
- retorno seguro;
- no-access real ante denegación.

Ocultar un link no constituye control.

---

#### 30. Ruta `/no-access`

La superficie de denegación debe probarse como estado inerte.

No puede:

- conceder permiso;
- ejecutar la acción original;
- mostrar datos protegidos;
- reintentar automáticamente;
- revelar causas internas sensibles;
- convertir un fallo técnico en permiso.

La sesión independiente que siga siendo válida no debe destruirse sin necesidad.

---

#### 31. Scanner e identidad de cliente

La prueba del scanner debe separar:

```text
TRABAJADOR
!=
CLIENTE
!=
PRINCIPAL TECNICO
!=
DEVICE
```

Identificar un cliente no cambia el actor laboral efectivo.

Debe probarse:

- formato válido;
- formato inválido;
- cliente inexistente;
- cliente de contexto incompatible;
- proyección mínima;
- limpieza del cliente;
- cambio de trabajador con cliente seleccionado;
- intento desde device sin actor cuando la acción posterior requiera actor.

---

#### 32. Proyección de cliente

La tarjeta operativa debe exponer únicamente los datos necesarios para la acción autorizada.

La prueba revisará:

- finalidad;
- masking;
- retención;
- limpieza al cambiar cliente;
- limpieza al cambiar actor;
- limpieza al expirar operación;
- ausencia de búsqueda lateral;
- ausencia de persistencia innecesaria.

La presencia actual de nombre, correo y puntos es una superficie que debe demostrar minimización final antes de certificarse.

---

#### 33. Fidelización — acumulación

Otorgar puntos desde PULSO debe probar:

- cliente resuelto;
- compra elegible;
- monto;
- moneda;
- regla vigente;
- sede;
- actor;
- device;
- capacidad exacta;
- referencia externa estable;
- atomicidad;
- idempotencia;
- ledger;
- saldo;
- auditoría;
- resultado.

Una respuesta perdida no puede otorgar puntos dos veces.

---

#### 34. Fidelización — redención

Validar o consumir una redención debe probar:

- código;
- cliente;
- recompensa;
- sede;
- vigencia;
- estado pendiente;
- saldo o reserva aplicable;
- actor;
- device;
- permiso;
- transición atómica;
- idempotencia;
- resultado.

Un código usado, cancelado, vencido o territorialmente incompatible falla sin efecto.

---

#### 35. Firma de trabajador para lealtad

PULSO ya contiene una base parcial que exige firma de trabajador para acumulación y redención cuando la sesión técnica se reconoce como dispositivo compartido.

La prueba debe demostrar que esa firma:

- corresponde al humano real;
- precede al efecto;
- se vincula a la acción;
- se vincula al recurso;
- no eleva permisos;
- no sustituye actor session;
- no se reutiliza fuera de su propósito;
- no se convierte en STRONG automáticamente;
- queda correlacionada con el resultado.

---

#### 36. Firma por acción no equivale a actor session

La existencia de una firma válida para una mutación no puede generalizarse.

```text
FIRMA DE ACCION
!=
ACTOR SESSION PERSISTENTE
!=
PERMISO
!=
STRONG
```

Una firma válida para puntos no autoriza pedidos, caja, salón, importación ni otra acción.

---

#### 37. Secreto del trabajador

Cuando se use PIN u otra prueba humana:

- se captura como secreto efímero;
- se presenta como input protegido;
- se valida en servidor;
- no se persiste en contexto o storage del cliente;
- no se registra en logs;
- no se reutiliza;
- se limpia después de éxito;
- se limpia después de error;
- se limpia al cambiar modo;
- se limpia al cambiar cliente;
- se limpia al cambiar actor;
- se limpia al expirar;
- aplica controles de intentos y bloqueo según contrato.

Una referencia opaca a la prueba sí puede conservarse en auditoría.

---

#### 38. Generación de referencia externa de puntos

La prueba deberá demostrar que la idempotency key o referencia externa para puntos proviene del hecho empresarial o de un identificador estable emitido y validado por servidor.

No se admite como fuente suficiente:

- `Date.now`;
- `Math.random`;
- identificadores truncados;
- estado de interfaz.

Ante un reintento del mismo hecho, la referencia estable debe reutilizarse.

---

#### 39. Pedidos

Cuando la capacidad esté materializada, la terminal deberá probar:

- creación;
- líneas;
- revisión;
- confirmación;
- transición;
- cancelación según autoridad;
- fulfillment;
- estado final.

Cada comando reevalúa:

- actor;
- device;
- sede;
- área;
- permiso;
- recurso;
- estado de origen;
- transición;
- columnas permitidas.

Abrir `/orders` no autoriza mutaciones.

---

#### 40. Estado de pedidos

Debe provocarse al menos una transición válida y una inválida.

La válida conserva:

- estado anterior;
- comando;
- actor;
- estado nuevo;
- timestamp;
- correlación.

La inválida produce:

```text
CERO CAMBIO DE ESTADO
+
CERO EFECTO COLATERAL
+
EVIDENCIA DE DENEGACION O CONFLICTO
```

---

#### 41. Pago y fulfillment

Pedido, pago y fulfillment permanecen hechos separados.

La prueba no puede inferir:

- pago por estado de pedido;
- entrega por pago;
- preparación por cobro;
- facturación por cierre visual.

Cuando esas capacidades existan, se prueban como transiciones independientes y correlacionadas.

---

#### 42. Caja

La certificación de una terminal POS completa no puede declarar operativo el ciclo de caja hasta demostrar, cuando el package incluya esas capacidades:

- apertura;
- fondo;
- movimientos;
- venta;
- cobro;
- efectivo esperado;
- conteo;
- diferencia;
- cierre;
- aprobación cuando corresponda;
- conciliación;
- reversos y pendientes.

La línea base actual declara ese cierre formal todavía pendiente.

`AUTH-DEV-015` no lo implementa.

---

#### 43. Venta

La prueba de una venta completa deberá diferenciar:

- pedido;
- venta;
- pago;
- inventario;
- fidelización;
- hecho económico;
- documento fiscal.

Un toast o cambio de pantalla no prueba que esos hechos hayan ocurrido correctamente.

---

#### 44. Anulación, devolución y reembolso

Cuando estén materializados, deben probarse como semánticas separadas.

No se acepta:

```text
ANULAR = BORRAR
DEVOLVER = ANULAR
REEMBOLSAR = DEVOLVER
```

Cada uno requiere:

- actor;
- capacidad;
- recurso;
- motivo;
- estado de origen;
- compensaciones;
- auditoría;
- resultado.

La prueba no diseña esas semánticas; verifica las definidas por sus owners PULSO.

---

#### 45. Descuentos y cambios sensibles

Una acción sensible de precio, descuento, propina, anulación, devolución, reembolso o reapertura debe probar:

- capacidad exacta;
- actor real;
- contexto;
- recurso;
- confirmación cuando corresponda;
- STRONG cuando el catálogo lo exija;
- historial;
- no herencia desde un administrador anterior.

---

#### 46. Salón

La superficie `/salon` debe probar, cuando la capacidad esté materializada:

- zonas;
- mesas;
- sesión de mesa;
- llamados;
- asignación;
- atención;
- resolución;
- cancelación;
- cierre;
- Realtime.

Cada recurso queda limitado por la sede autorizada.

---

#### 47. Mesa no es actor

La prueba mantiene:

```text
MESA
!=
SESION DE MESA
!=
TRABAJADOR
!=
ACTOR SESSION
!=
CLIENTE
```

Cambiar de mesa no cambia al trabajador.

Cambiar de trabajador no reasigna silenciosamente la responsabilidad histórica de una mesa o llamado.

---

#### 48. Realtime

Un evento Realtime puede actualizar presentación, pero no conceder autoridad.

Debe probarse:

- suscripción;
- filtrado territorial;
- limpieza al desmontar;
- cambio de actor;
- cambio de sede;
- revocación;
- mensaje stale;
- payload de recurso fuera de alcance.

La recepción de un evento no autoriza una mutación posterior.

---

#### 49. Despacho, chat, facturación e historial

La visibilidad del tablero no concede las operaciones asociadas.

La prueba debe separar, cuando existan:

- lectura;
- despacho;
- chat;
- solicitud o referencia de facturación;
- historial;
- archivo;
- entrega.

Cada mutación exige su autoridad y estado exactos.

---

#### 50. Importación de ventas

La superficie de importación debe probar:

- archivo admitido;
- archivo inválido;
- mapeo;
- lote;
- hash o identidad;
- autorización;
- publicación;
- reintento;
- lote duplicado;
- auditoría;
- estado posterior.

Abrir la pantalla no concede publicar.

---

#### 51. Efecto de inventario

PULSO no debe inventar una fuente paralela de inventario.

Cuando una venta o importación produzca efecto de inventario, la prueba deberá demostrar:

- contrato con NEXO/SHELL;
- operación exacta;
- cantidad;
- unidad;
- producto;
- sede;
- idempotencia;
- correlación con venta o lote;
- ausencia de doble contabilización;
- estado reconciliado.

La línea base actual declara que el descuento de inventario no debe resolverse localmente en PULSO antes del contrato correspondiente.

---

#### 52. Integración con PASS

PULSO conserva la operación de caja y PASS conserva la propiedad de cliente y fidelización según los contratos aprobados.

La prueba debe demostrar que:

- identificar cliente no crea una copia propietaria de identidad;
- puntos usan el ledger propietario;
- redención usa el estado propietario;
- PULSO conserva referencia y resultado;
- una caída no duplica el efecto;
- actor laboral y cliente permanecen separados;
- device y sede permanecen correlacionados.

---

#### 53. Integración con NUMERA

Cuando la venta publique hechos económicos hacia NUMERA, la certificación deberá verificar:

- evento o contrato propietario;
- identidad de venta;
- importes;
- estado;
- actor;
- reverso o compensación;
- idempotencia.

PULSO no se declara contabilidad canónica por producir el hecho comercial.

---

#### 54. Integración con proveedores externos

Cuando exista proveedor de pago, fiscal, mensajería o entrega:

- secretos permanecen server-side;
- estados externos se mapean sin inventar éxito;
- timeout no se asume fallo definitivo;
- webhook repetido no duplica efecto;
- evento tardío no retrocede un estado terminal válido;
- referencia externa se conserva;
- conciliación queda disponible.

---

#### 55. Resultado incierto

Debe probarse al menos una interrupción donde el cliente no pueda saber si la mutación produjo efecto.

La recuperación debe:

1. conservar identidad del intento;
2. consultar o reconciliar estado real;
3. evitar un segundo efecto;
4. conservar actor original;
5. clasificar el resultado;
6. exigir nueva autorización únicamente si nace una intención nueva.

Un timeout no se transforma automáticamente en `FAIL` empresarial.

---

#### 56. Idempotencia

Para cada mutación reintentable se debe provocar un reintento controlado.

Se comprobará:

- mismo hecho no duplica efecto;
- misma referencia estable converge;
- actor original se conserva;
- correlation no concede autoridad;
- cambio A→B no cambia la autoría del intento;
- una decisión antigua no se reutiliza tras cambio material.

---

#### 57. Concurrencia

Según la superficie, deben probarse solicitudes concurrentes que compitan por:

- misma redención;
- misma referencia de puntos;
- misma transición de pedido;
- mismo pago;
- mismo lote;
- misma mesa o llamado.

El resultado debe converger conforme al contrato propietario sin duplicación ni transición imposible.

---

#### 58. Cambio de trabajador A→B

La terminal debe ejecutar un cambio real de actor.

Debe observarse:

1. A activo;
2. cambio explícito;
3. nuevas mutaciones de A bloqueadas;
4. pendientes clasificados;
5. A deja de ser elegible;
6. estado sensible de A limpiado o aislado;
7. frontera sin actor;
8. B se identifica de forma independiente;
9. contexto de B se resuelve;
10. sesión B es nueva;
11. B queda como único actor efectivo;
12. superficies PULSO observan B.

La sesión A no se edita para convertirla en B.

---

#### 59. Limpieza entre actores

Después de A→B se comprueba que B no recibe:

- cliente seleccionado de A cuando no corresponda;
- PIN de A;
- monto de A;
- código QR de A;
- borrador personal;
- filtros personales;
- mesa personal;
- búsqueda;
- datos sensibles;
- autocompletado;
- aprobaciones;
- elevaciones;
- estado de navegador que permita actuar como A;
- pending action sin owner.

La evidencia empresarial confirmada se conserva con su actor histórico.

---

#### 60. Sesión expirada

Debe probarse:

```text
resolved_at >= actor_session_expires_at
->
SESSION NO ELEGIBLE
->
ACTOR EFECTIVO NO RESUELTO
->
CERO NUEVA MUTACION HUMANA
```

El principal técnico puede seguir autenticado.

Actividad de caja, scanner, Realtime o navegación no revive la actor session.

---

#### 61. Inactividad

Cuando la política de la unidad tenga bloqueo por inactividad:

- nuevas mutaciones se detienen;
- estado permitido se preserva con seguridad;
- secreto humano no persiste;
- recuperación exige identificación suficiente;
- `hard_ttl` no se extiende;
- toque, scanner o Realtime no cuentan como identidad.

---

#### 62. Revocación del dispositivo

Debe probarse que un device revocado deja de producir nuevos efectos aunque:

- PULSO continúe abierto;
- Auth técnica continúe viva;
- exista actor session previa;
- exista PIN previamente usado;
- exista una decisión previa;
- exista una pestaña stale;
- exista un evento Realtime pendiente;
- exista una intención local.

La revocación del device precede a la reidentificación del trabajador.

---

#### 63. Suspensión y conflicto

Suspensión, conflicto e indisponibilidad técnica permanecen separados de revocación.

La prueba debe verificar que ninguno se presenta falsamente como otro.

Todos bloquean aquello que sus contratos invaliden y conservan evidencia suficiente para recuperación.

---

#### 64. Cambio de aplicaciones

Si PULSO es retirado del conjunto efectivo:

- se bloquean nuevos accesos;
- se invalidan contextos relacionados;
- se limpian superficies incompatibles;
- se invalidan decisiones y elevaciones;
- se conserva historial;
- una pestaña abierta no reintroduce PULSO.

Añadir PULSO no concede permisos del trabajador.

---

#### 65. Aplicación predeterminada

Cuando PULSO sea aplicación predeterminada debe comprobarse:

- exactamente un default;
- default dentro del conjunto efectivo;
- launcher coherente;
- versión identificable;
- ausencia de divergencia entre fuentes;
- fail closed ante conflicto.

Ser default no concede autoridad empresarial.

---

#### 66. Varias pestañas y superficies

Cuando el runtime lo permita, deben coexistir al menos dos superficies.

La prueba debe demostrar:

- actor único;
- cambio A→B propagado;
- expiración propagada;
- revocación propagada;
- no mutación desde pestaña stale;
- consistencia de sede;
- limpieza de cliente y estado sensible según superficie.

---

#### 67. Offline y reconexión

Cuando la unidad admita operación degradada o retenga intenciones localmente, debe probarse reconexión.

Antes de ejecutar la intención se revalida:

- device;
- actor session;
- aplicación;
- permiso;
- territorio;
- recurso;
- estado comercial;
- idempotencia.

Una intención capturada antes de revocación, cambio de actor o expiración no conserva autoridad automáticamente.

---

#### 68. Auditoría

Para una mutación positiva deben poder reconstruirse, cuando aplique:

- principal técnico;
- `device_id`;
- trabajador;
- actor session;
- aplicación;
- capacidad;
- sede;
- área;
- recurso;
- estado anterior;
- decisión;
- razones;
- operación;
- resultado;
- estado posterior;
- timestamps;
- correlación.

La auditoría no puede atribuir la operación únicamente a la cuenta técnica.

---

#### 69. Denegaciones auditables

Las pruebas negativas deberán conservar evidencia suficiente para demostrar:

- principal técnico;
- device;
- actor cuando se pudo resolver;
- acción;
- recurso;
- territorio;
- causa concluyente;
- cero efecto.

No se fabrica actor, permiso ni decisión si la resolución técnica no llegó a ese punto.

---

#### 70. Cero efectos en deny

Para cada denegación obligatoria:

```text
DECISION NO AUTORIZADA
->
CERO NUEVO EFECTO EMPRESARIAL
```

Se verifica el dominio real, no solo el mensaje.

No puede existir:

- pedido parcialmente mutado;
- puntos aplicados;
- redención consumida;
- pago creado;
- caja modificada;
- lote publicado;
- mesa alterada;
- auditoría de éxito falsa;
- evento externo disparado indebidamente.

---

#### 71. Fallo técnico

Debe distinguirse:

```text
DENY CONTRACTUAL
!=
FALLO TECNICO
```

Si no puede resolverse una fuente necesaria:

- no se fabrica `ALLOW`;
- no se fabrica causa concluyente inexistente;
- no se produce efecto protegido;
- se ofrece recuperación segura;
- se conserva diagnóstico suficiente sin exponer secretos.

---

#### 72. Recuperación

La recuperación no puede:

- usar una cuenta genérica;
- restaurar al último actor;
- seleccionar sesión arbitraria;
- omitir permisos;
- usar service role como bypass de autorización empresarial;
- ampliar sede;
- reenviar automáticamente una mutación incierta;
- reactivar device revocado;
- reutilizar PIN previo.

Debe volver a una frontera de autorización válida.

---

#### 73. Privacidad

La terminal no debe exponer o persistir indebidamente:

- PIN;
- contraseña;
- access token;
- refresh token;
- JWT completo;
- service-role key;
- secreto administrativo;
- material STRONG reutilizable;
- datos del trabajador anterior;
- datos del cliente sin finalidad;
- datos de otra sede.

Logs, métricas, receipts y auditoría deben preservar minimización.

---

#### 74. Experiencia táctil POS

La certificación física debe observar la interacción real de la terminal.

Debe comprobar:

- controles táctiles utilizables;
- actor visible de forma inequívoca;
- mecanismo claro para cambio o bloqueo de actor;
- acciones sensibles identificables;
- confirmaciones cuando corresponda;
- estados de carga;
- errores recuperables;
- no dependencia exclusiva de color;
- viewport soportado;
- ausencia de clipping funcional;
- interacción compatible con operación de caja y servicio.

La definición final de experiencia pertenece a `PULSO-UX-015`.

Esta tarea verifica su materialización, no la diseña.

---

#### 75. Scanner físico

Cuando exista lector USB, cámara u otro scanner:

```text
LECTURA DEL DISPOSITIVO
!=
IDENTIDAD VALIDADA
!=
AUTORIDAD
```

Debe verificarse:

- periférico correcto;
- permiso de uso;
- formato;
- resultado;
- error;
- cancelación;
- privacidad;
- limpieza entre actores;
- fallback permitido;
- no duplicación de lectura.

Un componente de cámara no montado no se declara superficie física activa.

---

#### 76. Impresión y periféricos adicionales

Si la unidad PULSO incorpora impresora, cajón, datáfono, lector u otro periférico:

```text
COMANDO EMITIDO
!=
RESULTADO FISICO CONFIRMADO
```

Se conserva:

- device;
- periférico;
- actor;
- operación;
- comando;
- resultado;
- error;
- reintento;
- correlación.

La existencia física del periférico no concede autoridad.

---

#### 77. Corte entre PULSO y PASS

Un scanner de cliente o canje no fusiona los dominios.

Debe quedar inequívoco:

```text
PULSO
=
OPERACION COMERCIAL Y TERMINAL

PASS
=
CLIENTE, LEALTAD Y ESTADO PROPIETARIO
```

Las referencias cruzadas son contratos de integración, no copias de autoridad.

---

#### 78. Corte entre PULSO y NEXO

Una venta o publicación que afecte inventario debe usar el contrato propietario correspondiente.

PULSO no:

- redefine stock;
- inventa LOC;
- modifica proyecciones fuera del contrato;
- duplica movimientos;
- usa una respuesta visual como confirmación de inventario.

NEXO tampoco se convierte en owner de la venta.

---

#### 79. Estado actual del POS integral

La línea base técnica vigente tiene implementados Auth/SSO, salón, orders, scanner y acciones de fidelización.

Continúan pendientes en la propia fuente PULSO:

- cierre formal de caja;
- pagos;
- sesiones POS;
- integración única de fidelización;
- consolidación de llamados Realtime cuando corresponda;
- estados compartidos con cocina/bar/delivery;
- reporting operacional.

La existencia de superficies parciales no permite declarar el POS integral conforme.

---

#### 80. Bloqueo estático: actor session no materializada en `OperationalSession`

La forma observada de `OperationalSession` en PULSO no expone:

- `actor_session_id`;
- `actor_session_expires_at`;
- actor humano efectivo.

Por sí sola no demuestra:

```text
PRINCIPAL TECNICO
+
DEVICE
+
ACTOR SESSION UNICA Y VIGENTE
+
TRABAJADOR
```

La salida pertenece a la materialización de los contratos de actor compartido y a `PULSO-AUTH-012`, `PULSO-AUTH-013` y propietarios relacionados.

---

#### 81. Bloqueo estático: `navigationRole` como fuente de permiso

La implementación observada asigna `navigationRole` como `role` de la sesión compartida y lo utiliza para consultar `has_operational_role_permission`.

Esto no satisface el contrato aprobado:

```text
navigation_role
!=
actor
!=
rol operativo efectivo
!=
permiso
```

La futura certificación debe demostrar que la autoridad proviene del trabajador humano y su contexto, limitada por el device.

---

#### 82. Bloqueo estático: acceso implícito por aplicación

La lógica observada considera satisfecho el permiso de acceso de la aplicación cuando la app pertenece al conjunto permitido del device.

Eso no demuestra la separación requerida:

```text
APP PULSO PERMITIDA
->
PUEDE CONTINUAR EVALUACION
->
NO ES UN GRANT HUMANO
```

La reconciliación física debe retirar ese allow implícito antes del PASS final.

---

#### 83. Bloqueo estático: territorio preferido

El resolutor observado acepta `preferredSiteId` y `preferredAreaId`.

La ruta scanner recibe `site_id` desde query y lo utiliza al solicitar acceso.

Además, el cliente conserva ese `site_id` como sede para acciones posteriores.

La certificación debe demostrar que ningún valor de URL, body, cookie o estado de interfaz amplía el territorio server-side.

---

#### 84. Bloqueo estático: `identifyClientAction`

La acción observada de identificación de cliente:

- obtiene al usuario Auth;
- consulta `has_permission`;
- recibe `siteId` desde el consumidor;
- no demuestra consumo de una actor session de dispositivo compartido;
- no utiliza el helper de firma de trabajador.

Por tanto, esa acción no constituye evidencia suficiente de atribución humana en terminal compartida.

La salida pertenece a la autorización PULSO, al contrato de identificación de cliente y a la adopción compartida correspondiente.

---

#### 85. Bloqueo estático: cobertura de firma limitada

La búsqueda del consumidor vigente muestra uso del helper de firma compartida en:

- acumulación de puntos;
- redención.

No se observó esa misma integración como prueba de actor en:

- identificación de cliente;
- pedidos;
- salón;
- importación de ventas.

La certificación no puede extrapolar la cobertura de dos acciones al resto de PULSO.

---

#### 86. Bloqueo estático: `pulso.pos.main` amplio

Las cinco rutas de negocio observadas usan `pulso.pos.main` como permiso amplio de entrada.

El registro canónico exige que esa evidencia no se interprete como suficiencia para todas las acciones.

El inventario final de capacidades y permisos atómicos pertenece a `PULSO-AUTH-001` a `PULSO-AUTH-008`, y su aplicación server-side a las tareas posteriores del mismo bloque.

---

#### 87. Bloqueo estático: referencia externa no estable

El componente observado de scanner construye una referencia para otorgar puntos combinando, entre otros valores:

- fragmentos de sede;
- fragmentos de usuario;
- `Date.now`;
- `Math.random`.

El contrato vigente de idempotencia prohíbe depender únicamente de ese tipo de valores.

La certificación de acumulación de puntos deberá esperar una referencia ligada al hecho empresarial o emitida y validada de forma estable por servidor.

El propietario de la corrección permanece en la integración PASS y sus contratos de idempotencia existentes.

---

#### 88. Bloqueo estático: limpieza incompleta del PIN

El componente observado conserva `sharedActorPin` en estado local.

Se observa limpieza explícita después de una acumulación de puntos exitosa.

No se observa limpieza equivalente demostrada en todas las fronteras exigidas, incluidas:

- error;
- cambio de modo;
- cambio de cliente;
- redención exitosa;
- expiración.

La certificación debe demostrar limpieza completa conforme al contrato de secreto efímero.

---

#### 89. Base parcial positiva: firma de lealtad

La implementación vigente ya aporta una base parcial útil:

- input protegido de firma del trabajador cuando el dispositivo es compartido;
- RPC `sign_shared_device_action`;
- resolución de `actor_employee_id`;
- resolución de `actor_shift_id` cuando existe;
- `signature_id`;
- vinculación posterior con la transacción o redención.

Esto es evidencia estática de capacidad parcial.

No es un PASS físico ni sustituye actor session, permisos atómicos, lifecycle o pruebas E2E.

---

#### 90. Base parcial positiva: baseline CI010

PULSO dispone de un baseline específico del consumidor con:

- 12 superficies;
- 42 pruebas contractuales;
- inventario de rutas;
- contratos fuente;
- perfiles de cuatro paquetes compartidos;
- deny paths;
- control de secretos;
- evidencia identificable;
- invalidación por cambios materiales.

El baseline debe permanecer verde como prerrequisito técnico de la unidad aplicable.

No sustituye la prueba física.

---

#### 91. Universo canónico de 19 identidades

La tarea conserva las 19 identidades documentales y define su relación exacta con PULSO.

| `inventory_key` | Clase | Relación con AUTH-DEV-015 | Estado conservado |
| --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` | objetivo registral principal de esta prueba; PULSO pertenece al conjunto candidato y es default candidato | `REGISTERED_UNVERIFIED` |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` | PULSO no pertenece a la reducción registral candidata; debe permanecer bloqueado | `REGISTERED_UNVERIFIED` |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` | candidata solo después de reconciliar identidad y demostrar si realmente expone PULSO | `OBSERVED_ONLY` |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` | candidata solo después de reconciliar identidad y demostrar si realmente expone PULSO | `OBSERVED_ONLY` |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` | PULSO admitido; perfil POS satélite | `POLICY_DEFINED` |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` | PULSO admitido; no crea autoridad de caja por proximidad funcional | `POLICY_DEFINED` |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` | PULSO admitido; no crea autoridad de caja o servicio | `POLICY_DEFINED` |
| `target_template:service_satellite` | `TARGET_TEMPLATE` | PULSO admitido; actor y área de servicio permanecen propios | `POLICY_DEFINED` |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` | PULSO admitido; mostrador no hereda caja o salón | `POLICY_DEFINED` |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` | PULSO admitido; integración no suma todas las autoridades | `POLICY_DEFINED` |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` | PULSO fuera del máximo; acceso debe fallar cerrado | `POLICY_DEFINED` |
| `target_template:production_bakery` | `TARGET_TEMPLATE` | PULSO fuera del máximo; acceso debe fallar cerrado | `POLICY_DEFINED` |
| `target_template:production_pastry` | `TARGET_TEMPLATE` | PULSO fuera del máximo; acceso debe fallar cerrado | `POLICY_DEFINED` |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` | PULSO fuera del máximo; acceso debe fallar cerrado | `POLICY_DEFINED` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` | PULSO fuera del máximo; movilidad no habilita PULSO | `POLICY_DEFINED` |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` | PULSO fuera del máximo; recepción no habilita caja | `POLICY_DEFINED` |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` | PULSO admitido dentro de un techo operativo amplio; no crea autoridad administrativa | `POLICY_DEFINED` |
| `target_template:management_terminal` | `TARGET_TEMPLATE` | PULSO fuera del máximo; terminal administrativa no se convierte en POS | `POLICY_DEFINED` |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` | no recibe nueva unidad ni certificación PULSO | `NO_APLICA` |

Control:

```text
TOTAL ESPERADO: 19
TOTAL MATERIALIZADO: 19

CONFIGURED_INSTANCE: 2
PHYSICAL_OBSERVATION: 2
TARGET_TEMPLATE: 14
RETIRED_LEGACY_TEMPLATE: 1

TARGET_TEMPLATE CON PULSO EN MAXIMO: 7
TARGET_TEMPLATE SIN PULSO EN MAXIMO: 7

FALTANTES: 0
DUPLICADOS: 0
```

---

#### 92. `CAJA_VENTO_CAFE_01`

La instancia conserva:

```text
inventory_key = configured_device:CAJA_VENTO_CAFE_01
template_candidate = pos_satellite
apps_candidate = shell + nexo + pulso
default_app_candidate = pulso
state = REGISTERED_UNVERIFIED
```

Para cambiar de estado deberá demostrarse:

- correspondencia con equipo físico;
- endpoint;
- principal técnico;
- `device_id`;
- plantilla y versión;
- sede;
- área;
- app bindings;
- launcher;
- build PULSO;
- actor session;
- worker actual;
- permisos PULSO finales;
- lifecycle;
- auditoría;
- operación POS real.

La fila registral no constituye certificación.

---

#### 93. `KIOSCO_BODEGA_CP` como control negativo

La reducción registral candidata del kiosco contiene únicamente NEXO.

PULSO no pertenece a su conjunto efectivo candidato.

AUTH-DEV-015 debe usar esta clase de unidad como escenario conceptual de control negativo:

```text
PULSO FUERA DE INSTANCIA
->
PULSO NO AUTORIZABLE
```

No se añade PULSO al kiosco para poder probarlo.

---

#### 94. Observaciones físicas de servicio

Las observaciones de Vento Café y Saudo permanecen `OBSERVED_ONLY`.

No se declara:

- cuántos equipos físicos existen;
- si ejecutan PULSO;
- si corresponden a una instancia configurada;
- si usan `service_satellite`;
- si tienen principal técnico conforme;
- si son dispositivos administrados.

Solo entran en una ejecución física después de reconciliación.

---

#### 95. Plantillas con PULSO

PULSO pertenece al máximo de exactamente siete plantillas:

```text
pos_satellite
bar_satellite
kitchen_satellite
service_satellite
counter_satellite
integrated_satellite
operations_management_terminal
```

La presencia de PULSO no homogeneiza sus funciones.

Cada plantilla conserva área, rol, package y recursos propios.

---

#### 96. Plantillas sin PULSO

PULSO queda fuera del máximo de exactamente siete plantillas:

```text
production_kitchen
production_bakery
production_pastry
warehouse_kiosk
logistics_vehicle_terminal
procurement_reception
management_terminal
```

Una ejecución conforme debe demostrar que instalación local, URL, caché o actor privilegiado no amplían este máximo.

---

#### 97. Prueba de cajero

Cuando los contratos propietarios estén materializados, el perfil de cajero debe demostrar:

- actor real;
- sede satélite;
- área de caja;
- permiso de acceso;
- capacidades de venta/cobro exactas;
- segregación respecto de configuración;
- auditoría;
- cambio de actor;
- cierre de sesión humana.

Ser cajero no concede administración.

---

#### 98. Prueba de servicio de salón

Cuando una terminal de servicio exponga PULSO, debe demostrar:

- actor de servicio;
- sede;
- área;
- mesas permitidas;
- llamados permitidos;
- pedidos permitidos;
- ausencia de caja o configuración no autorizada;
- cambio A→B;
- limpieza del cliente y mesa según contrato.

---

#### 99. Prueba de barra, cocina y mostrador

La disponibilidad de PULSO en una plantilla satélite no convierte esos perfiles en cajero.

Debe probarse que:

- barra conserva su oficio;
- cocina conserva su oficio;
- mostrador conserva su oficio;
- acciones de venta o cobro solo aparecen y funcionan si el actor posee la capacidad exacta;
- ningún perfil hereda permisos de otro por compartir terminal o app.

---

#### 100. Terminal de operación integrada

`integrated_satellite` puede concentrar más funciones, pero la prueba debe demostrar que cada acción continúa evaluándose individualmente.

No se permite:

```text
TERMINAL INTEGRADA
=
UNION DE TODOS LOS PERMISOS
```

La integración física solo reduce cambios de dispositivo; no elimina segregación.

---

#### 101. Terminal de gestión de operaciones

`operations_management_terminal` admite PULSO dentro de un package operativo más amplio.

La prueba debe distinguir:

- visibilidad;
- coordinación;
- operación propia;
- capacidad STRONG;
- acciones de otros oficios;
- administración.

La amplitud del terminal no convierte al actor en owner, administrador, cajero o repartidor global.

---

#### 102. Administración separada

La terminal PULSO no hereda privilegios administrativos desde:

- cuenta técnica;
- provisioning;
- sesión de administrador anterior;
- VISO;
- rol de navegación;
- modo mantenimiento.

La configuración administrativa se prueba por separado y solo desde capacidad humana explícita.

---

#### 103. Cambio de operador durante una venta

Debe probarse una intención comercial iniciada por A que aún no haya alcanzado commit point cuando se solicita cambio A→B.

La política propietaria deberá clasificar si:

- se cancela;
- queda draft atribuible a A;
- requiere reautorización;
- se completa por A ya comprometida;
- se transfiere mediante un comando explícito permitido.

Nunca se cambia silenciosamente el actor histórico a B.

---

#### 104. Resultado tardío después de cambio A→B

Si una operación de A responde después del cambio:

- conserva actor A;
- conserva correlation;
- no crea una nueva intención de B;
- no duplica efecto;
- actualiza la UI de B solo como estado empresarial cuando corresponda;
- no restaura autoridad de A.

---

#### 105. Cambio de cliente

Cambiar cliente no cambia trabajador.

La prueba debe limpiar el estado del cliente anterior y conservar la actor session del trabajador mientras siga vigente.

Debe diferenciar:

```text
CAMBIO DE CLIENTE
!=
CAMBIO DE TRABAJADOR
```

---

#### 106. Cambio de mesa

Cambiar mesa no cambia trabajador ni cliente automáticamente.

La sesión de mesa y sus pedidos conservan identidad propia.

La prueba debe evitar que un cambio de vista reasigne autoría histórica.

---

#### 107. Confirmaciones sensibles

Cuando el contrato PULSO defina confirmación adicional:

- la confirmación no sustituye permiso;
- la confirmación no sustituye STRONG;
- el actor que confirma debe seguir vigente;
- un cambio de actor invalida confirmación personal incompatible;
- el recurso y monto mostrados deben corresponder a la operación real.

---

#### 108. Estado del terminal después de una denegación

Después de un deny:

- el device puede seguir técnicamente operativo si la causa no invalida el device;
- PULSO puede seguir abierto si la app sigue permitida;
- el actor puede conservar otras capacidades;
- la operación denegada no deja efecto;
- el estado sensible no se filtra;
- no hay reintento automático.

El deny no se traduce automáticamente en logout global.

---

#### 109. Defectos reales y ownership

Todo defecto futuro queda ligado a:

- unidad;
- escenario;
- build;
- evidencia;
- contrato incumplido;
- severidad;
- owner canónico;
- condición de salida;
- reejecución requerida.

Owners existentes relevantes incluyen:

- `PULSO-AUTH-012` para integración del POS compartido;
- `PULSO-AUTH-013` para trabajador ejecutor;
- `PULSO-AUTH-015` para adopción de paquetes;
- `PULSO-AUTH-016` para pruebas integrales;
- `PULSO-UX-014` para experiencia de actor real;
- `PULSO-UX-015` para experiencia táctil;
- contratos PASS para fidelización;
- contratos NEXO/SHELL para inventario;
- contratos de autorización transversal para actor, territorio, lifecycle y auditoría.

No se crea una tarea paralela si ya existe owner.

---

#### 110. Reejecución después de corrección

Una corrección invalida la evidencia que dependa materialmente del cambio.

La certificación final vuelve a ejecutar los escenarios afectados y sus dependencias cuando cambie:

- guard;
- permiso;
- actor session;
- device policy;
- territorio;
- app binding;
- código de acción;
- integración PASS;
- integración NEXO;
- payment adapter;
- idempotencia;
- auditoría;
- UI que participa en el escenario.

El historial previo no se borra.

---

#### 111. Cobertura positiva y negativa

Una certificación completa no contiene solo happy path.

Como mínimo incluye:

- caso permitido;
- actor ausente;
- actor incorrecto;
- actor expirado;
- permiso ausente;
- app fuera del device;
- device fuera de política;
- sede incompatible;
- área incompatible;
- recurso incompatible;
- estado de negocio inválido;
- cambio A→B;
- device revocado;
- estado stale;
- referencia duplicada;
- timeout;
- reintento;
- concurrencia;
- fallo técnico.

---

#### 112. Paridad entre canales

Cada efecto protegido debe identificar todos los canales capaces de producirlo.

Según la operación:

- launcher;
- RSC;
- Server Action;
- Route Handler;
- RPC/PostgREST;
- RLS/Data API;
- Edge Function;
- Realtime;
- cliente offline;
- proceso asíncrono;
- webhook.

Cuando dos canales pueden producir el mismo efecto, deben respetar decisión equivalente.

---

#### 113. No confianza en UI

La prueba debe intentar el efecto sin depender del control visual cuando exista un canal técnico.

Ocultar un botón no basta.

Un acceso directo, request controlada o replay no puede eludir actor, permiso, territorio, recurso o estado.

---

#### 114. Estado empresarial real

Toda mutación exitosa deberá verificarse en la fuente de verdad propietaria.

No bastan:

- toast;
- redirect;
- HTTP exitoso;
- respuesta de RPC aislada;
- estado React;
- mensaje Realtime;
- botón deshabilitado;
- recibo no reconciliado.

La prueba confirma el efecto o el no efecto real.

---

#### 115. Criterio especial para pagos

Un resultado de pago debe distinguir:

- intento;
- autorización;
- confirmación;
- captura cuando aplique;
- fallo;
- timeout;
- reverso;
- reembolso;
- conciliación.

Una ausencia de respuesta no se interpreta como dinero no movido.

---

#### 116. Criterio especial para fidelización

Una operación de lealtad positiva debe confirmar conjuntamente:

- evento origen;
- transacción;
- puntos;
- ledger;
- saldo proyectado;
- actor;
- device;
- sede;
- referencia;
- idempotencia.

La UI no fija el saldo.

---

#### 117. Criterio especial para importaciones

La publicación de un lote debe poder demostrarse como operación única.

El mismo archivo o hecho no puede producir dos publicaciones por reintento.

El hash del archivo puede contribuir a identidad, pero no sustituye actor, autorización, mapping, package ni semántica del lote.

---

#### 118. Criterio especial para Realtime

Realtime demuestra propagación de estado, no commit point por sí solo.

La prueba verifica que un evento duplicado, atrasado o fuera de territorio no produce mutación local autoritativa ni habilita una acción prohibida.

---

#### 119. Resultado documental de esta tarea

La tarea deja definidos:

1. contrato por unidad física;
2. precondiciones;
3. evidencia mínima;
4. criterio de PASS;
5. frescura;
6. doce superficies PULSO;
7. rutas y acceso directo;
8. actor humano;
9. actor session;
10. aplicación y device;
11. `pulso.access`;
12. tratamiento de `pulso.pos.main`;
13. sede y área;
14. STANDARD, STRONG y NOT_ALLOWED;
15. scanner;
16. cliente;
17. acumulación;
18. redención;
19. secreto humano;
20. pedidos;
21. pago;
22. caja;
23. venta;
24. salón;
25. importación;
26. integración PASS;
27. integración NEXO;
28. integración NUMERA y externos;
29. idempotencia;
30. concurrencia;
31. cambio A→B;
32. expiración;
33. revocación;
34. privacidad;
35. experiencia táctil;
36. periféricos;
37. auditoría;
38. cero efectos en deny;
39. universo de 19 identidades;
40. bloqueos estáticos actuales;
41. owners de salida;
42. reejecución.

La evidencia física permanece pendiente de la futura materialización autorizada.

---

#### 120. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea desarrolla y vuelve ejecutables obligaciones ya registradas en los dominios de autorización, PULSO y PASS. El registro modular permanece sin cambios.

---

#### 121. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación la cobertura existente sobre:

- lifecycle completo de dispositivo compartido;
- intersección entre device y trabajador;
- segregación de funciones;
- actor session única y vigente;
- clasificación STANDARD, STRONG y NOT_ALLOWED;
- paridad entre canales;
- reconciliación física de device, aplicaciones y paquetes;
- inventario de seis páginas PULSO;
- acceso directo;
- `site_id` no autoritativo;
- `pulso.pos.main` como evidencia amplia pendiente de descomposición;
- pedidos y transiciones protegidas por acción;
- importaciones protegidas;
- salón territorial;
- POS integral E2E;
- caja, pago, venta, reversión y cierre;
- integración PULSO–PASS;
- identificación de cliente;
- proyección mínima;
- acumulación y redención;
- referencia externa estable;
- firma humana en dispositivo compartido;
- secreto humano efímero;
- scanner y hardware cuando corresponda.

Estas referencias son trazabilidad de cobertura existente y no representan una actualización del registro.

---

#### 122. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | El build documental y el build del consumidor se ejecutarán en sus etapas correspondientes después de incorporar el contrato. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores sobre el checkout local del usuario durante la preparación documental. |
| REMOTA | `NOT_EXECUTED` | Se inspeccionaron repositorios, contratos y código vigentes como fuentes; no se ejecutó un gate remoto de AUTH-DEV-015. |
| OPERATIVA | `NOT_EXECUTED` | Los escenarios comerciales definidos requieren una unidad y capacidades autorizadas y todavía no fueron ejecutados. |
| FÍSICA | `NOT_EXECUTED` | No se ejecutó una terminal POS física; la evidencia deberá provenir de la futura instancia `PER_IMPLEMENTATION_UNIT`. |

---

#### 123. Criterios de aceptación

- [x] La tarea define un protocolo reutilizable por `implementation_unit_id`.
- [x] La materialización permanece detrás de `POST_E5_PACKAGE`.
- [x] No se declara certificación física sin ejecución.
- [x] Se consume el handoff de `AUTH-DEV-014`.
- [x] Se preservan las invariantes de `AUTH-DEV-001` a `AUTH-DEV-013`.
- [x] No se reabre NEXO.
- [x] No se desarrollan anticipadamente tareas PULSO-AUTH.
- [x] No se desarrollan anticipadamente tareas PULSO-UX.
- [x] Se define identidad mínima de la unidad.
- [x] Se define evidencia mínima reproducible.
- [x] Se define criterio de PASS.
- [x] Evidencia stale no certifica el estado nuevo.
- [x] Se cubren las doce superficies PULSO.
- [x] Se conserva la línea base de seis páginas.
- [x] Se distingue baseline CI de certificación física.
- [x] Se exige actor humano real.
- [x] Se exige actor session única y vigente.
- [x] Se distingue firma por acción de actor session.
- [x] Se exige limpieza del secreto humano.
- [x] Se exige cambio A→B.
- [x] Se exige expiración.
- [x] Se exige revocación.
- [x] Se exige intersección trabajador–device.
- [x] PULSO permitido no equivale a autoridad comercial.
- [x] `pulso.access` no concede operaciones.
- [x] `pulso.pos.main` amplio no se acepta como autorización atómica final.
- [x] `navigation_role` no concede autoridad.
- [x] Se prueba `site_id` adversarial.
- [x] Se prueba área.
- [x] Se prueban turno y check-in cuando correspondan.
- [x] Se prueban STANDARD, STRONG y NOT_ALLOWED.
- [x] Se prueba scanner.
- [x] Se separan trabajador y cliente.
- [x] Se prueba minimización de cliente.
- [x] Se prueba acumulación de puntos.
- [x] Se prueba redención.
- [x] Se exige referencia externa estable.
- [x] Se prueba secreto del trabajador.
- [x] Se prueban pedidos.
- [x] Se prueban transiciones válidas e inválidas.
- [x] Se separan pedido, pago y fulfillment.
- [x] Se define criterio para caja sin declararla actualmente completa.
- [x] Se define criterio de venta integral.
- [x] Se separan anulación, devolución y reembolso.
- [x] Se prueban acciones sensibles.
- [x] Se prueba salón y Realtime.
- [x] Se prueba importación de ventas.
- [x] Se conserva frontera PULSO–PASS.
- [x] Se conserva frontera PULSO–NEXO.
- [x] Se conserva frontera PULSO–NUMERA.
- [x] Se prueban timeouts y resultados inciertos.
- [x] Se prueban reintentos e idempotencia.
- [x] Se prueba concurrencia.
- [x] Se exige auditoría conjunta de principal, device y trabajador.
- [x] Se exige cero efectos en deny.
- [x] Se distingue fallo técnico de deny.
- [x] Se exige recuperación segura.
- [x] Se exige privacidad.
- [x] Se incluye experiencia táctil.
- [x] Se incluyen periféricos cuando existan.
- [x] Se distingue comando de resultado físico.
- [x] Se preservan las 19 identidades.
- [x] Se preserva la distribución 2 + 2 + 14 + 1.
- [x] Se preservan exactamente 7 plantillas con PULSO y 7 sin PULSO.
- [x] `CAJA_VENTO_CAFE_01` permanece `REGISTERED_UNVERIFIED`.
- [x] `KIOSCO_BODEGA_CP` permanece sin PULSO en su reducción candidata.
- [x] Las observaciones permanecen `OBSERVED_ONLY`.
- [x] `production_center` permanece retirada.
- [x] Se registran bloqueos estáticos sin presentarlos como validación ejecutada.
- [x] Se reconocen bases parciales positivas sin fabricar PASS.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autoriza ningún cambio físico.
- [x] `AUTH-DEV-016` conserva íntegra la certificación específica de pantallas FOGO.

---

#### 124. Handoff exacto hacia AUTH-DEV-016

`AUTH-DEV-015` entrega a `AUTH-DEV-016`:

```text
PROTOCOLO TRANSVERSAL POR IMPLEMENTATION_UNIT REUTILIZADO
+
CERTIFICACION PULSO ESPECIALIZADA
+
ACTOR, DEVICE Y TERRITORIO EXIGIDOS
+
STANDARD, STRONG Y NOT_ALLOWED OBSERVABLES
+
CAMBIO A -> B Y LIMPIEZA OBSERVABLES
+
IDEMPOTENCIA Y RESULTADO INCIERTO PROBABLES
+
CERO EFECTOS EN DENY
+
AUDITORIA CONJUNTA EXIGIDA
+
UNIVERSO DE 19 IDENTIDADES PRESERVADO
+
FRONTERA PULSO CERRADA DOCUMENTALMENTE
```

`AUTH-DEV-016` podrá reutilizar las invariantes transversales de dispositivo compartido, pero deberá definir y comprobar de forma independiente las particularidades de las pantallas FOGO.

AUTH-DEV-015 no desarrolla producción, recetas, ejecución de estación, pantallas de cocina o interacción específica de FOGO.

---

#### 125. Límites

Esta tarea no:

- ejecuta una terminal PULSO;
- ejecuta pruebas físicas;
- modifica dispositivos;
- enrola endpoints;
- cambia activos;
- cambia plantillas;
- cambia aplicaciones;
- amplía paquetes;
- inventa permisos PULSO;
- cambia sede o área;
- crea actor sessions reales;
- cambia trabajadores reales;
- modifica turnos;
- modifica check-ins;
- revoca dispositivos;
- cambia Auth;
- rota credenciales;
- modifica PULSO;
- modifica PASS;
- modifica NEXO;
- modifica NUMERA;
- modifica SHELL;
- modifica Supabase;
- crea migraciones;
- modifica RLS;
- modifica RPC;
- modifica grants;
- modifica datos reales;
- modifica proveedores externos;
- modifica pagos;
- modifica caja;
- modifica inventario;
- despliega;
- certifica `CAJA_VENTO_CAFE_01`;
- certifica `KIOSCO_BODEGA_CP`;
- identifica técnicamente las observaciones físicas;
- convierte una plantilla en unidad desplegada;
- declara un baseline CI como prueba física;
- corrige los bloqueos estáticos observados;
- desarrolla `PULSO-AUTH-001` a `PULSO-AUTH-016`;
- desarrolla `PULSO-UX-001` a `PULSO-UX-021`;
- desarrolla `AUTH-DEV-016`;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A.

---

#### 126. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-014 — Probar tablets de NEXO`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-015 — Probar terminales de PULSO`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-016 — Probar pantallas de FOGO`


### [ ] AUTH-DEV-016 — Probar pantallas de FOGO
