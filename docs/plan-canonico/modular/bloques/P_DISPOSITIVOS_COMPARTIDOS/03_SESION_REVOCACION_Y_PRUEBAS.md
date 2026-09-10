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


### [ ] AUTH-DEV-012 — Manejar sesión expirada
### [ ] AUTH-DEV-013 — Manejar cambio de trabajador
### [ ] AUTH-DEV-014 — Probar tablets de NEXO
### [ ] AUTH-DEV-015 — Probar terminales de PULSO
### [ ] AUTH-DEV-016 — Probar pantallas de FOGO
