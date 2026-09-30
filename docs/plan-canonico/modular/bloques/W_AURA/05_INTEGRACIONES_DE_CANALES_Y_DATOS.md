### MINI-BLOQUE — INTEGRACIONES DE CANALES Y DATOS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **integraciones de canales y datos** dentro de **W AURA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AURA-INT-001` a `AURA-INT-002` — 2 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `AURA-INT-001`: Definir adaptadores de canales, webhooks, límites, credenciales y reconciliación externa
- `AURA-INT-002`: Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AURA-INT -->
### Reconciliación topológica de AURA-INT-001 a AURA-INT-002

Estas tareas definen contratos de adaptadores, webhooks, credenciales, reconciliación, lectura y eventos. Los adaptadores físicos posteriores pertenecen a sus unidades y paquetes de implementación.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ AURA-INT-001 — Definir adaptadores de canales, webhooks, límites, credenciales y reconciliación externa

**Estado:** APROBADA
**Tarea anterior:** AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones
**Tarea siguiente:** AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO
**Tipo de tarea:** definición técnico-documental del contrato canónico de integración externa de AURA para adaptadores de canales, APIs, autenticación, credenciales referenciadas, webhooks, límites, reintentos, deduplicación, observabilidad y reconciliación con proveedores, especializando los contratos transversales INT-EXT sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — integraciones de canales y datos`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/05_INTEGRACIONES_DE_CANALES_Y_DATOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean adaptadores ejecutables, endpoints, webhooks, cuentas, OAuth apps, secretos, tokens, colas, jobs, workers, tablas, migraciones, RLS, RPC, Edge Functions, datos, conexiones remotas ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá integrar canales y proveedores externos sin confundir intención empresarial con efecto técnico, sin copiar maestros de otros dominios y sin convertir una respuesta externa, un webhook o un timeout en evidencia más fuerte que la realmente disponible.

La decisión raíz es:

```text
INTENCION AURA
!=
ADAPTADOR
!=
SOLICITUD EXTERNA
!=
RESPUESTA DEL PROVEEDOR
!=
EFECTO EXTERNO CONFIRMADO
```

Y además:

```text
CUENTA
!=
ENDPOINT
!=
PRINCIPAL TECNICO
!=
CREDENCIAL
!=
SECRETO
```

`AURA-INT-001` especializa para AURA los contratos transversales ya aprobados en `INT-EXT-001` a `INT-EXT-020`. No redefine autenticación, seguridad, idempotencia, retry, cuarentena, auditoría o retiro como mecanismos universales; fija cómo debe consumirlos AURA para sus canales y proveedores.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-DOM-005`, para cuentas, endpoints, publicación, programación, intentos, idempotencia, retiro y reconciliación por canal;
- `AURA-DOM-004`, para proveedores de IA, grounding, memoria, minimización y revisión humana;
- `AURA-DOM-006` a `AURA-DOM-010`, para campañas, oportunidades, métricas, reputación y recomendaciones sin trasladar sus decisiones a la integración;
- `AURA-AUTH-001` a `AURA-AUTH-004`, para autorización, segregación de funciones, clientes, exportaciones, secretos, proveedores, prompts, archivos y datos enviados a terceros;
- `AURA-UX-001` a `AURA-UX-008`, para estados y experiencias que la integración deberá poder soportar sin redefinir la interfaz;
- `OPS-CAN-001`, para familias de canal, endpoints, propiedad, continuidad y la regla de que un canal no es propietario del hecho empresarial;
- `VPROC-0056`, para el ciclo canónico de contenido y promociones;
- `INT-APP-001` a `INT-APP-010`, para autoridad independiente, productores, consumidoras, eventos y prohibición de escrituras cruzadas sin contrato;
- `INT-EXT-001` a `INT-EXT-020`, para inventario externo, principal técnico, credenciales, autenticación, scopes, ambientes, secretos, rotación, contratos versionados, webhook/polling, firma, replay, idempotencia, mapeo de identidades, payload original, rate limits, retries, circuit breaker, cuarentena, auditoría, conciliación, contingencia, retiro y prohibición de credenciales compartidas;
- `CAP-SCOPE-014` y los hallazgos `H-CAP-SCOPE-014-013` a `H-CAP-SCOPE-014-015`, para dependencia de credenciales personales, límites/cambios de plataforma y efectos duplicados por retries o webhooks;
- el registro canónico de requisitos de prueba vigente, incluida la cobertura AURA e integración ya asignada a esta tarea;
- la topología canónica que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE` para `AURA-INT-001` y `AURA-INT-002`.

Ninguna de estas fuentes cambia de propietaria por esta tarea.

---

#### 3. Naturaleza y topología

La tarea se desarrolla una sola vez como contrato documental reutilizable:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
physical_instance = NONE
```

Por tanto:

- no existe `AURA-INT-001::GLOBAL`;
- no existe instancia por package ni por implementation unit;
- no autoriza código de integración;
- no autoriza secretos ni cuentas reales;
- no autoriza migraciones ni cambios de Supabase;
- no autoriza publicación, mensajería, sincronización o reconciliación real;
- la futura materialización deberá ocurrir en las tareas, unidades y packages físicos que correspondan.

---

#### 4. Resultado canónico

AURA deberá disponer conceptualmente de un perfil de integración externa que permita demostrar, para cada canal o proveedor realmente vinculado:

1. qué sistema o plataforma externa se integra;
2. cuál es la finalidad empresarial autorizada;
3. qué objeto de AURA origina la interacción;
4. qué cuenta y endpoint externos se usan;
5. qué principal técnico actúa;
6. qué referencia de credencial se utiliza sin exponer el secreto;
7. qué mecanismo de autenticación aplica;
8. qué versión de API y contrato se consume;
9. qué capacidades están soportadas, condicionadas o no soportadas;
10. qué payload mínimo sale de VENTO;
11. qué identificador idempotente representa la intención;
12. qué límites y cuotas condicionan la operación;
13. qué estrategia de retry y backoff aplica;
14. qué mecanismo de webhook, polling o combinación se utiliza;
15. cómo se valida origen, firma, timestamp y replay;
16. cómo se deduplican entregas repetidas;
17. cómo se mapean identificadores internos y externos;
18. cómo se conserva evidencia del payload sin almacenar secretos innecesarios;
19. cómo se clasifica un error o resultado ambiguo;
20. cómo se concilia el estado externo con el estado esperado;
21. cómo se detecta drift por cambios manuales en el proveedor;
22. cómo se degrada la operación cuando la plataforma no está disponible;
23. cómo se rota o revoca una credencial;
24. cómo se retira definitivamente una integración;
25. qué auditoría y observabilidad permiten reconstruir el ciclo completo.

---

#### 5. Frontera entre contrato transversal y especialización AURA

Los mecanismos genéricos permanecen bajo `INT-EXT-*`.

| Materia | Contrato transversal | Especialización de `AURA-INT-001` |
| --- | --- | --- |
| identidad técnica | `INT-EXT-002` | vincular principal técnico con cuenta/endpoint AURA |
| origen de credencial | `INT-EXT-003` | distinguir referencia del proveedor y referencia VENTO en el perfil AURA |
| autenticación | `INT-EXT-004` | declarar mecanismo requerido por cada binding AURA verificado |
| mínimo privilegio | `INT-EXT-005` | limitar scopes a capacidades AURA realmente necesarias |
| separación de ambientes | `INT-EXT-006` | impedir reutilización de credenciales entre dev, staging y producción |
| almacenamiento de secretos | `INT-EXT-007` | AURA conserva únicamente referencias opacas |
| rotación/revocación | `INT-EXT-008` | bloquear alcance AURA afectado y reconciliar estado posterior |
| contratos versionados | `INT-EXT-009` | versionar payload, respuesta y compatibilidad del adaptador AURA |
| webhook/polling | `INT-EXT-010` | seleccionar por binding según capacidad real del proveedor |
| autenticidad/replay | `INT-EXT-011` | validar cada evento externo antes de aceptarlo |
| idempotencia | `INT-EXT-012` | preservar identidad de la intención AURA y deduplicar entregas |
| identificadores | `INT-EXT-013` | correlacionar objetos AURA con IDs externos sin sustituirlos |
| payload original | `INT-EXT-014` | conservar evidencia mínima y gobernada de entrada/salida |
| límites/retry/backoff | `INT-EXT-015` | aplicar políticas por endpoint, capacidad y ventana de vigencia |
| cuarentena/dead-letter | `INT-EXT-016` | aislar eventos no procesables sin perder correlación |
| auditoría/conciliación | `INT-EXT-017` | medir salud, drift y pendientes de AURA por canal/proveedor |
| indisponibilidad | `INT-EXT-018` | degradar AURA sin fabricar confirmaciones ni ampliar privilegios |
| retiro de integración | `INT-EXT-019` | revocar binding AURA preservando historia y evidencia |
| credenciales compartidas | `INT-EXT-020` | prohibir que dos integraciones AURA reutilicen el mismo secreto por comodidad |

La especialización nunca rebaja una restricción transversal.

---

#### 6. Universo de integración externa de AURA

`AURA-INT-001` opera sobre familias de canal o proveedores externos únicamente cuando exista una instancia o binding acreditado por las fuentes canónicas.

Familias relevantes:

- web corporativa y páginas de marca;
- redes y perfiles sociales;
- correo y alias funcionales;
- mensajería autorizada;
- marketplace;
- comercio electrónico;
- feedback, reseñas y reputación;
- proveedores de IA cuando una tarea AURA autorizada los utilice;
- otros sistemas externos expresamente inventariados por `INT-EXT-001` y habilitados por contrato.

Un nombre de plataforma en documentación no equivale a integración activa.

```text
PLATAFORMA DOCUMENTADA
!=
CUENTA VERIFICADA
!=
BINDING TECNICO
!=
OPERACION PRODUCTIVA
```

---

#### 7. Identidad del adaptador

Cada binding AURA deberá tener una identidad estable y versionada.

Contrato conceptual mínimo:

```text
adapter_binding_id
external_system_ref
provider_ref
channel_family
channel_account_ref
channel_endpoint_ref
business_purpose
principal_ref
credential_ref
api_contract_version
capability_profile_version
payload_contract_version
webhook_contract_version cuando aplique
rate_limit_policy_ref
retry_policy_ref
reconciliation_policy_ref
observability_policy_ref
valid_from
valid_until cuando aplique
status
owner_ref
technical_custodian_ref
```

`credential_ref` nunca contiene el secreto.

---

#### 8. Cuenta, endpoint, principal, credencial y secreto

Se preserva obligatoriamente:

```text
CUENTA EXTERNA
!=
ENDPOINT
!=
PRINCIPAL TECNICO
!=
CREDENCIAL
!=
SECRETO
```

Reglas:

1. la cuenta identifica el tenant, perfil, buzón, tienda, número o equivalente;
2. el endpoint identifica el destino concreto sobre el que existe una capacidad;
3. el principal identifica al actor técnico de la integración;
4. la credencial identifica el medio de autenticación emitido o administrado conforme a `INT-EXT-*`;
5. el secreto es material sensible y no forma parte del modelo editorial ni del artefacto documental de AURA;
6. una credencial técnicamente válida no concede autoridad empresarial;
7. una cuenta existente no implica endpoint apto ni capacidad disponible.

---

#### 9. Perfil de capacidades

Cada binding deberá declarar explícitamente qué capacidades soporta.

Como mínimo, cuando apliquen:

```text
CREATE_PUBLICATION
UPDATE_PUBLICATION
SCHEDULE_PUBLICATION
CANCEL_SCHEDULE
HIDE_PUBLICATION
DELETE_EXTERNAL_PUBLICATION
READ_PUBLICATION_STATUS
READ_PROVIDER_METRICS
RECEIVE_WEBHOOK
READ_REPUTATION_SIGNAL
SEND_MESSAGE
```

La declaración de capacidad debe distinguir:

```text
SOPORTADA
CONDICIONADA
NO_SOPORTADA
NO_CONFIRMADA
```

Estas etiquetas pertenecen al perfil AURA del binding y no sustituyen estados del proveedor ni del proceso empresarial.

Una capacidad `NO_CONFIRMADA` se trata como no ejecutable hasta obtener evidencia suficiente.

---

#### 10. Versionado y compatibilidad

El adaptador deberá versionar de forma independiente:

- API consumida;
- request;
- response;
- webhook;
- esquema de identificadores;
- capacidades;
- autenticación;
- límites relevantes;
- mapeos;
- política de reconciliación.

Un cambio del proveedor que rompa cualquiera de esas dimensiones deberá poder marcar el binding como incompatible o condicionado antes de producir efectos.

No se acepta:

```text
API CAMBIO
→ SEGUIR ENVIANDO
→ DESCUBRIR EL BREAKAGE EN PRODUCCION
```

cuando el cambio era detectable por contrato o versión.

---

#### 11. Payload de salida

Toda solicitud externa deberá derivarse de datos autorizados y minimizar el payload.

El payload debe:

- contener solo campos necesarios para la capacidad;
- mantener referencias a la fuente empresarial cuando no corresponda copiar el dato;
- excluir secretos, credenciales y contexto interno no necesario;
- preservar versión del contrato;
- preservar locale, timezone, vigencia y target cuando apliquen;
- conservar correlación e idempotencia;
- evitar datos personales cuando la finalidad no los requiera;
- aplicar restricciones de `AURA-AUTH-003` y `AURA-AUTH-004`.

El adaptador no puede enriquecer el payload inventando valores faltantes.

---

#### 12. Identidad idempotente de la intención

La misma intención empresarial debe poder reconocerse a través de retries, webhooks y consultas de estado.

Conceptualmente:

```text
AURA_IDEMPOTENCY_ID
=
BUSINESS_ACTION
+ OBJECT_ID
+ TARGET_ID
+ VERSION
+ ACTION_GENERATION
```

Reglas:

1. un retry de la misma intención conserva identidad;
2. una versión materialmente nueva obtiene nueva identidad;
3. publicar, actualizar, retirar y responder son acciones distintas;
4. un webhook repetido no crea una nueva intención;
5. un callback tardío debe correlacionarse con la intención original;
6. la idempotencia del proveedor no sustituye la idempotencia VENTO.

---

#### 13. Rate limits, cuotas y ventanas

Cada binding deberá registrar las restricciones conocidas o verificadas del proveedor sin inventar cifras.

La política deberá poder considerar:

- límite por cuenta;
- límite por endpoint;
- límite por principal o credencial;
- límite por tipo de operación;
- cuota diaria o mensual cuando exista;
- concurrencia;
- ventana de reset;
- costo o tier cuando sea material y esté acreditado;
- límites de tamaño, formato o cantidad;
- restricciones de revisión o moderación;
- ventanas de vigencia del contenido.

Cuando el límite exacto no esté acreditado, el contrato debe declararlo como desconocido y bloquear una promesa de capacidad que dependa de él.

---

#### 14. Retry, backoff y circuit breaker

`AURA-INT-001` consume `INT-EXT-015` y fija estas reglas de especialización:

1. ningún retry se decide solo por código HTTP;
2. primero se clasifica el resultado y su ambigüedad;
3. si existe posibilidad de efecto ya aplicado, se reconcilia antes de reenviar;
4. el retry conserva la identidad idempotente de la acción original;
5. el backoff respeta límites, vigencia y prioridad;
6. un circuit breaker puede pausar el binding afectado sin pausar canales independientes;
7. un retry no puede revivir contenido retirado, vencido o cuya aprobación perdió vigencia;
8. una credencial revocada no entra en ciclo de retry;
9. un error permanente no se trata como transitorio;
10. la política concreta se versiona por binding.

---

#### 15. Clasificación de resultados y fallos

Antes de decidir retry o reconciliación, el adaptador deberá distinguir al menos:

| Familia | Decisión mínima |
| --- | --- |
| autenticación/autorización | bloquear alcance afectado y escalar a custodia |
| rate limit/cuota | respetar ventana y backoff gobernado |
| transitorio técnico | retry solo cuando el efecto previo pueda descartarse o reconciliarse |
| validación de payload | corregir contrato o dato; no repetir ciegamente |
| política del proveedor | revisión humana o decisión empresarial; no evadir controles |
| destino inexistente | reconciliar identidad y binding |
| incompatibilidad contractual | bloquear hasta actualizar el adaptador |
| resultado ambiguo | reconciliar antes de reintentar |
| proveedor indisponible | activar contingencia gobernada |
| dato o evento no confiable | rechazar, aislar o cuarentenar según el contrato transversal |

---

#### 16. Timeout y resultado ambiguo

La ausencia de respuesta no demuestra fallo.

```text
REQUEST ENVIADO
+
TIMEOUT / DESCONEXION / RESPUESTA AMBIGUA
→
ESTADO INCIERTO
→
CONSULTA O RECONCILIACION
→
DECISION DE RETRY SOLO CON EVIDENCIA SUFICIENTE
```

Queda prohibido:

```text
TIMEOUT
→ RETRY CIEGO
→ POSIBLE DUPLICADO
```

Si el proveedor no ofrece consulta de estado, la incertidumbre permanece explícita y se aplica la contingencia del binding.

---

#### 17. Webhooks: recepción y correlación

Un webhook externo se trata como una entrega técnica no confiable hasta completar validaciones.

El receptor deberá poder correlacionar:

```text
provider_event_id cuando exista
provider_account_ref
endpoint_ref
occurred_at
received_at
signature_context
contract_version
external_object_ref
internal_correlation_ref cuando exista
```

El webhook no adquiere autoridad empresarial por llegar primero.

---

#### 18. Webhooks: autenticidad, replay y orden

Antes de aceptar un webhook se deberá verificar, según el mecanismo definido por `INT-EXT-011`:

- firma, secreto, certificado u origen aplicable;
- timestamp;
- ventana de replay;
- esquema y versión;
- cuenta o tenant esperado;
- identificador del evento cuando exista;
- tamaño y límites del payload;
- correlación permitida.

Reglas:

1. un webhook inválido no modifica estado empresarial;
2. un webhook repetido se deduplica;
3. un webhook tardío puede ser válido y debe conservar su timestamp de origen;
4. llegada fuera de orden no autoriza sobrescribir un estado más nuevo;
5. replay intencional debe quedar diferenciado de entrega original.

---

#### 19. Webhook, polling e integración híbrida

La estrategia se selecciona por binding y evidencia real:

```text
WEBHOOK
POLLING
HIBRIDA
```

- webhook es preferible cuando existe autenticidad y semántica suficientes;
- polling se usa cuando el proveedor no emite eventos adecuados o como verificación controlada;
- híbrida se usa cuando un webhook inicia la correlación pero una consulta confirma el efecto;
- polling no puede convertirse en loop agresivo para evadir rate limits;
- ausencia de webhook no implica ausencia de reconciliación.

---

#### 20. Deduplicación

La deduplicación deberá operar sobre identificadores y semántica, no solo sobre igualdad textual del payload.

Deberá considerar, cuando existan:

- event ID del proveedor;
- external object ID;
- action generation;
- endpoint;
- versión;
- timestamp de origen;
- idempotency ID interno;
- hash de payload como evidencia auxiliar, no como única identidad universal.

Dos eventos con el mismo contenido pueden representar hechos distintos. Dos payloads diferentes pueden representar la misma intención reenviada.

---

#### 21. Mapeo de identificadores externos

AURA deberá conservar un mapping explícito entre:

```text
IDENTIDAD INTERNA AURA
<->
IDENTIDAD EXTERNA DEL PROVEEDOR
```

El mapping debe conservar:

- tipo de objeto;
- proveedor;
- cuenta/endpoint;
- identificador interno;
- identificador externo;
- versión o generación cuando aplique;
- vigencia;
- origen del mapping;
- estado de reconciliación.

Un identificador externo no sustituye la identidad interna ni se reutiliza entre proveedores por coincidencia de texto.

---

#### 22. Conservación controlada del payload original

La evidencia de integración puede requerir conservar payload original o una representación verificable.

Reglas:

- conservar solo lo permitido por `INT-EXT-014` y por la clasificación de datos;
- preferir referencia, hash o extracto mínimo cuando el payload completo no sea necesario;
- no persistir secretos, tokens o material de autenticación como evidencia;
- aplicar retención y acceso acordes a la sensibilidad;
- distinguir payload recibido de interpretación normalizada;
- conservar versión del parser o contrato cuando sea necesaria para reproducibilidad.

---

#### 23. Colas, orden y trabajo asíncrono

Cuando una implementación futura use colas o workers, AURA deberá preservar:

- identidad de la intención;
- target;
- prioridad gobernada;
- vigencia;
- número de intento;
- resultado anterior;
- causa de reintento;
- dependencia del proveedor;
- estado de reconciliación.

La cola no se convierte en fuente de verdad de publicación ni reemplaza `VPROC-0056`.

La tecnología concreta de cola, worker, scheduler o dead-letter pertenece a la infraestructura transversal y a la instancia física correspondiente.

---

#### 24. Cuarentena y dead-letter

Un evento o trabajo que no pueda procesarse de forma segura deberá poder quedar aislado sin perder evidencia.

Causas típicas:

- firma inválida;
- contrato desconocido;
- payload incompatible;
- identidad no correlacionable;
- dato prohibido o excesivo;
- error permanente;
- retry agotado;
- contradicción de estado;
- dependencia no disponible.

La cuarentena no equivale a descarte ni a corrección automática.

---

#### 25. Reconciliación externa

La reconciliación compara estado esperado y estado observado.

```text
ESTADO ESPERADO AURA
+
EVIDENCIA EXTERNA
→
COMPARACION
→
COINCIDE / DIFIERE / DESCONOCIDO
→
DECISION TRAZABLE
```

La reconciliación deberá poder detectar:

- publicación interna sin confirmación externa;
- publicación externa sin correlación interna;
- versión externa distinta;
- target vencido todavía visible;
- retiro pendiente;
- objeto externo eliminado o recreado;
- métricas faltantes o fuera de ventana;
- cuenta o endpoint cambiado;
- webhook perdido o duplicado;
- job pendiente después de cancelación;
- drift por edición manual.

---

#### 26. Cambios manuales en el proveedor

Un cambio realizado directamente en una plataforma externa puede generar drift, pero no reescribe silenciosamente AURA.

La integración deberá:

1. detectar la diferencia cuando sea observable;
2. conservar estado interno previo;
3. registrar evidencia externa;
4. clasificar si el cambio es autorizado, accidental, desconocido o incompatible;
5. decidir si se adopta, revierte o mantiene como excepción;
6. preservar historial.

El proveedor no se vuelve maestro empresarial por aceptar edición manual.

---

#### 27. Credenciales y mínimo privilegio

`AURA-INT-001` no almacena secretos. Consume las decisiones de `AURA-AUTH-004` e `INT-EXT-003` a `INT-EXT-008`.

Cada binding deberá demostrar:

- principal técnico independiente cuando corresponda;
- credencial no compartida con integraciones ajenas;
- ambiente correcto;
- scopes mínimos;
- fecha o condición de expiración cuando exista;
- owner de rotación;
- procedimiento de revocación;
- referencia de almacenamiento seguro;
- ausencia de secreto en logs y payloads documentales.

Una integración que solo puede funcionar con credenciales personales permanentes queda condicionada o bloqueada hasta resolver custodia institucional.

---

#### 28. Rotación y revocación

La rotación debe permitir reemplazar una credencial sin perder correlación ni historia.

La revocación debe:

- bloquear nuevas operaciones del alcance afectado;
- no borrar evidencia histórica;
- no marcar como fallidos efectos externos ya confirmados;
- reconciliar trabajos en vuelo;
- evitar reintentos con la credencial retirada;
- exigir nueva validación antes de reanudar.

Rollback de código o configuración no restaura un secreto comprometido ni permite volver a utilizarlo.

---

#### 29. Operación degradada

Cuando un binding externo se degrade:

1. se limita el impacto al canal, cuenta o capacidad afectada cuando sea posible;
2. no se amplían scopes ni datos para recuperar velocidad;
3. no se cambia silenciosamente a otro proveedor;
4. no se declara éxito sin evidencia;
5. se preservan trabajos válidos pendientes respetando vigencia;
6. se bloquean trabajos cuya seguridad o resultado no puedan demostrarse;
7. la interfaz puede mostrar estado degradado, pendiente o reconciliación requerida;
8. un camino manual solo es válido si está autorizado y deja evidencia.

---

#### 30. Contingencia ante indisponibilidad del proveedor

La contingencia debe distinguir:

```text
PROVEEDOR CAIDO
!=
CREDENCIAL INVALIDA
!=
CUOTA AGOTADA
!=
ENDPOINT INEXISTENTE
!=
CONTRATO INCOMPATIBLE
```

El plan de contingencia podrá incluir espera, canal alterno autorizado, operación manual controlada o suspensión del efecto, pero nunca inventará failover ni proveedor alterno sin contrato aprobado.

---

#### 31. Retiro de integración

Retirar una integración exige como mínimo:

- detener nuevas operaciones;
- drenar o clasificar trabajos en vuelo;
- reconciliar efectos externos pendientes;
- revocar credenciales;
- retirar webhooks, callbacks o permisos cuando corresponda;
- conservar mappings e historial necesarios;
- conservar evidencia de la última reconciliación;
- actualizar capacidades del endpoint;
- impedir reactivación por jobs, configuración antigua o secretos olvidados.

Retirar el binding no elimina el contenido, campaña, publicación, caso o métrica empresarial histórica.

---

#### 32. Auditoría mínima

Cada interacción material deberá poder reconstruir:

- actor humano originador cuando exista;
- aprobación relacionada;
- principal técnico;
- cuenta y endpoint;
- binding y versión;
- capacidad;
- objeto AURA;
- correlación e idempotency ID;
- request o referencia verificable;
- respuesta o falta de respuesta;
- intentos;
- webhook o consulta relacionada;
- estado previo y posterior;
- reconciliación;
- motivo de cierre o escalamiento;
- timestamps relevantes.

---

#### 33. Observabilidad mínima

La futura implementación deberá poder medir, por binding y sin exponer secretos:

- solicitudes;
- éxitos confirmados;
- rechazos;
- timeouts;
- resultados ambiguos;
- retries;
- rate limits;
- circuit breaker abierto;
- backlog;
- cuarentena/dead-letter;
- webhooks recibidos;
- webhooks inválidos;
- duplicados;
- eventos tardíos;
- reconciliaciones pendientes;
- drift detectado;
- credenciales próximas a expirar cuando esa señal exista;
- indisponibilidad del proveedor.

Una métrica técnica no se presenta como resultado comercial.

---

#### 34. Seguridad y minimización

Toda integración deberá aplicar:

- mínimo privilegio;
- mínimo dato;
- finalidad explícita;
- separación por ambiente;
- segregación entre actor humano y principal técnico;
- no exposición de secretos;
- validación de entrada externa;
- controles contra replay;
- protección de logs y evidencia;
- retención proporcional;
- revocación efectiva;
- trazabilidad de cambios de configuración.

Una falla técnica no autoriza omitir autorización ni enviar más datos para facilitar diagnóstico.

---

#### 35. Frontera con `AURA-INT-002`

`AURA-INT-001` gobierna sistemas y proveedores externos.

`AURA-INT-002` queda reservada para contratos internos de lectura y eventos con:

- NEXO;
- PULSO;
- PASS;
- NUMERA;
- VISO;
- FOGO.

Por tanto, esta tarea no define:

- qué eventos internos produce cada aplicación;
- qué lecturas internas consume AURA;
- shapes de proyección interna;
- ownership de hechos NEXO/PULSO/PASS/NUMERA/VISO/FOGO;
- comandos internos ni escrituras cross-app.

Un canal externo puede originar una señal que después se correlacione con un dominio interno, pero esa segunda frontera pertenece a `AURA-INT-002` y a los contratos `INT-APP-*`.

---

#### 36. Frontera con Supabase

Esta tarea no crea ni modifica:

- tablas;
- vistas;
- funciones;
- RPC;
- triggers;
- RLS;
- Auth;
- Storage;
- Realtime;
- Edge Functions;
- cron;
- colas;
- secretos;
- configuración remota.

Si una futura materialización requiere Supabase, el cambio deberá crearse, versionarse, documentarse y ejecutarse desde `vento-group-sas/vento-shell` conforme a la tarea física propietaria.

---

#### 37. Frontera con infraestructura transversal

`AURA-INT-001` define requisitos de comportamiento del binding AURA, pero no selecciona ni materializa:

- broker;
- queue provider;
- scheduler;
- worker runtime;
- secret manager;
- tracing backend;
- monitoring backend;
- dead-letter implementation;
- circuit breaker library;
- gateway;
- proxy;
- deployment topology.

Las capacidades transversales se consumen mediante sus contratos aprobados y su lifecycle físico propio.

---

#### 38. Frontera con superficies actuales y transición CMS

La existencia de superficies actuales en VISO, Vento-Group u otros repositorios no autoriza migrarlas a AURA desde esta tarea.

`AURA-INT-001` deberá preservar:

- contratos de lectura y edición vigentes mientras sigan siendo propietarios;
- URLs y consumidores activos;
- compatibilidad entre productor y consumidor;
- identidad estable de contenido y media;
- reconciliación de diferencias;
- evidencia de drift;
- prohibición de doble maestro.

Una transferencia futura de CMS exige la decisión, ADR, migración, cutover y rollback aprobados por sus tareas propietarias.

---

#### 39. Matriz de decisión por binding

Antes de considerar un binding listo para materialización futura deberá existir una decisión explícita por identidad:

| Dimensión | Resultado requerido |
| --- | --- |
| sistema/proveedor | acreditado o explícitamente no acreditado |
| finalidad | definida |
| owner funcional | definido |
| custodio técnico | definido |
| cuenta/endpoint | verificado o declarado ausente |
| principal técnico | definido cuando aplique |
| credencial | referencia definida; secreto fuera del contrato |
| ambiente | definido |
| capacidades | clasificadas |
| contrato API | versionado |
| payload | minimizado y versionado |
| webhook/polling | estrategia definida |
| autenticidad | mecanismo definido |
| idempotencia | definida |
| límites | conocidos o declarados desconocidos |
| retry/backoff | política referenciada |
| cuarentena | salida definida cuando aplique |
| reconciliación | política definida |
| contingencia | definida |
| observabilidad | definida |
| retiro | definido |

Un campo desconocido puede conservarse como desconocido; no puede inventarse para declarar readiness.

---

#### 40. Handoff contractual a `AURA-INT-002`

`AURA-INT-002` deberá recibir de esta tarea:

- separación estricta entre integración externa e integración interna;
- identidad y correlación de objetos externos sin convertirlos en maestros internos;
- reglas de frescura, incertidumbre y reconciliación;
- resultado técnico externo como evidencia, no como hecho empresarial automáticamente aceptado;
- minimización y finalidad como condiciones de cualquier dato que entre a AURA;
- la obligación de preservar ownership de NEXO, PULSO, PASS, NUMERA, VISO y FOGO;
- la prohibición de usar credenciales o webhooks externos como bypass de autorización interna.

`AURA-INT-002` no deberá redefinir OAuth, webhooks, rate limits, backoff ni manejo de credenciales externas.

---

#### 41. Decisiones fijadas

Quedan fijadas las siguientes decisiones:

1. AURA especializa y no duplica `INT-EXT-001..020`;
2. cuenta, endpoint, principal, credencial y secreto son objetos distintos;
3. un binding documentado no equivale a integración activa;
4. las capacidades se declaran explícitamente y `NO_CONFIRMADA` no autoriza ejecución;
5. request, response, webhook y estado externo se versionan de forma trazable;
6. el payload se minimiza y no contiene secretos;
7. la misma intención conserva idempotencia a través de retries y callbacks;
8. timeout o respuesta ambigua exige reconciliación antes de retry;
9. rate limits y cuotas desconocidos no se inventan;
10. webhooks se validan antes de producir efectos;
11. replay, duplicados y entrega fuera de orden se manejan explícitamente;
12. polling no evade límites ni sustituye autenticidad;
13. IDs externos se mapean y no sustituyen identidades internas;
14. payload original se conserva solo de forma controlada;
15. fallos permanentes no entran en retry infinito;
16. cuarentena no equivale a descarte;
17. estado externo observado no se convierte automáticamente en fuente de verdad empresarial;
18. cambios manuales del proveedor generan drift y reconciliación;
19. rotación y revocación no borran historia;
20. rollback no reutiliza secretos comprometidos;
21. contingencia no amplía privilegios ni inventa proveedor alterno;
22. retirar una integración revoca el binding pero preserva evidencia;
23. la observabilidad técnica no se presenta como resultado comercial;
24. Supabase no se modifica desde esta tarea;
25. integraciones internas quedan reservadas a `AURA-INT-002`;
26. no se crean ni modifican requisitos de prueba;
27. no se crea ninguna instancia física;
28. la continuidad queda reservada exclusivamente a `AURA-INT-002`.

---

#### 42. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el registro vigente ya protege las obligaciones de AURA sobre publicación, credenciales, consumidores, contratos, idempotencia, webhooks, retries, conciliación, observabilidad, compatibilidad y retiro. Esta tarea materializa el contrato responsable sin introducir una regla protegida nueva ni alterar texto, relación, paquete, ambiente, evidencia u ownership de una fila existente.

---

#### 43. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-001` a `TREQ-AURA-003`, para gobierno de marketing, IA, campañas, resultados y fronteras de ownership;
- `TREQ-AURA-009`, para capacidades atómicas de mutación y publicación;
- `TREQ-AURA-011` a `TREQ-AURA-013`, para creación, actualización, referencias y retiro lógico;
- `TREQ-AURA-019` a `TREQ-AURA-027`, para ciclo editorial, consumidores, fallbacks, rutas, contrato editor-consumidor, compatibilidad, enlaces, observabilidad y continuidad de CMS;
- `TREQ-INTEGRATION-019`, para adaptadores, proveedores externos, contratos, credenciales, identificadores, payloads, idempotencia, webhooks, reintentos y reconciliación;
- `TREQ-INTEGRATION-021`, para datos y documentos que salen hacia terceros, revocación, retención y reconciliación;
- los requisitos de autorización y privacidad ya relacionados con AURA para mínimo privilegio, finalidad, clientes, archivos, prompts y datos enviados a terceros.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación del registro 04A.

---

#### 44. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | la incorporación y compilación documental requieren el checkout local de `vento-shell`; no se ejecutaron desde esta entrega |
| LOCAL | `NOT_EXECUTED` | el artefacto todavía no ha sido insertado, formateado ni validado por los scripts del repositorio en el checkout del usuario |
| REMOTA | `PASS` | se verificaron en `vento-shell/main` el archivo propietario, continuidad, topología, políticas documentales, `AURA-DOM-005`, `AURA-AUTH-*`, `AURA-UX-008`, contratos `INT-APP-*`, inventario y contratos `INT-EXT-*`, registro 04A AURA y scripts de validación aplicables |
| OPERATIVA | `NOT_EXECUTED` | no se conectaron proveedores, cuentas, APIs, OAuth, webhooks ni canales reales y no se ejecutaron publicaciones, mensajes o reconciliaciones |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; la tarea se agota en su contrato documental |

La evidencia remota valida coherencia documental de la propuesta. La validación real del repositorio corresponde a la incorporación controlada del artefacto y a la batería canónica.

---

#### 45. Criterios de aceptación

`AURA-INT-001` queda satisfecha cuando simultáneamente:

1. especializa `INT-EXT-001..020` sin duplicar sus responsabilidades universales;
2. separa cuenta, endpoint, principal, credencial y secreto;
3. define identidad estable y versionada del binding;
4. define perfil explícito de capacidades;
5. conserva API, request, response y webhook versionados;
6. minimiza payload y excluye secretos;
7. conserva idempotencia por intención;
8. modela límites y cuotas sin inventar valores no acreditados;
9. define retry y backoff con reconciliación previa cuando exista ambigüedad;
10. clasifica fallos antes de reintentar;
11. preserva incertidumbre ante timeout;
12. valida autenticidad de webhooks;
13. trata replay, duplicados y orden explícitamente;
14. permite webhook, polling o híbrido según capacidad real;
15. mapea IDs externos sin sustituir IDs internos;
16. conserva payload original solo bajo gobierno y minimización;
17. define cuarentena para entradas o trabajos no procesables de forma segura;
18. define reconciliación de estado esperado y observado;
19. detecta drift por cambios manuales;
20. preserva mínimo privilegio y separación de ambientes;
21. define rotación y revocación sin pérdida de historia;
22. define operación degradada sin ampliar privilegios;
23. define contingencia sin inventar failover;
24. define retiro completo del binding;
25. define auditoría y observabilidad suficientes;
26. mantiene Supabase fuera del alcance documental de esta tarea;
27. mantiene integraciones internas reservadas a `AURA-INT-002`;
28. no crea ni modifica requisitos de prueba;
29. no crea ninguna instancia física;
30. la siguiente tarea reservada es exactamente `AURA-INT-002`.

---

#### 46. Límites

Esta tarea no autoriza ni ejecuta:

- crear adaptadores o SDK wrappers;
- crear endpoints o webhooks;
- registrar OAuth apps;
- crear, leer, rotar o revocar secretos reales;
- crear cuentas de proveedor;
- modificar cuentas o perfiles existentes;
- validar remotamente credenciales;
- abrir scopes o permisos;
- crear colas, workers, jobs, cron, circuit breakers o dead-letter reales;
- crear tablas, vistas, migraciones, RLS, funciones, RPC, Storage, Realtime o Edge Functions;
- modificar VISO, Vento-Group, PASS, PULSO, NEXO, FOGO, NUMERA u otro runtime;
- migrar CMS hacia AURA;
- publicar, actualizar, retirar o responder contenido real;
- enviar correo, WhatsApp u otro mensaje real;
- consumir o alterar métricas reales;
- ejecutar polling contra proveedores;
- recibir webhooks reales;
- declarar productiva una plataforma documentada sin binding acreditado;
- inventar límites, SLA, tiers, costos, cuentas, números, dominios, IDs, tokens o proveedores;
- crear o modificar requisitos del registro 04A;
- adelantar `AURA-INT-002`.

---

#### 47. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-UX-008 — Diseñar tablero de resultados, atribución y copiloto de recomendaciones`

**TAREA ACTUAL APROBADA**
`AURA-INT-001 — Definir adaptadores de canales, webhooks, límites, credenciales y reconciliación externa`

**SIGUIENTE TAREA RESERVADA**
`AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO`
### ✅ AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO

**Estado:** APROBADA
**Tarea anterior:** AURA-INT-001 — Definir adaptadores de canales, webhooks, límites, credenciales y reconciliación externa
**Tarea siguiente:** AUTH-QA-001 — Propietario sin check-in entra a administración
**Tipo de tarea:** definición técnico-documental del contrato canónico de integración interna de AURA para lecturas autorizadas, proyecciones mínimas, eventos empresariales, frescura, correlación, idempotencia, reconciliación y manejo de incertidumbre con NEXO, PULSO, PASS, NUMERA, VISO y FOGO, preservando fuentes de verdad y sin crear una instancia física propia
**Bloque:** `BLOQUE W — AURA — integraciones de canales y datos`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/05_INTEGRACIONES_DE_CANALES_Y_DATOS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no se crean APIs, endpoints, eventos, topics, colas, workers, tablas, vistas, migraciones, RLS, RPC, funciones, triggers, Realtime, Edge Functions, credenciales, datos, escrituras cross-app ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 2026-09-30

---

#### 1. Propósito

Definir el contrato canónico con el que AURA deberá leer hechos empresariales y consumir eventos de NEXO, PULSO, PASS, NUMERA, VISO y FOGO sin copiar maestros, reconstruir ledgers, ampliar permisos ni convertir una proyección de consumo en fuente de verdad.

La decisión raíz es:

```text
FUENTE PROPIETARIA
!=
PROYECCION PARA AURA
!=
CACHE O SNAPSHOT
!=
HECHO PROPIO DE AURA
```

Y además:

```text
LECTURA
!=
EVENTO
!=
COMANDO
!=
ESCRITURA CROSS-APP
```

`AURA-INT-002` especializa para AURA los contratos internos ya aprobados en `INT-APP-001` a `INT-APP-010`. No crea un segundo bus de eventos, no redefine emisoras, consumidoras ni ownership y no autoriza escrituras directas en dominios ajenos.

---

#### 2. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-INT-001`, para separación entre integración externa e interna, identidad, correlación, frescura, incertidumbre, reconciliación y prohibición de usar canales externos como bypass de autorización interna;
- `AURA-DOM-006`, para campañas, promociones, experimentos y guardas de margen, stock y capacidad sin transferir autoridad a AURA;
- `AURA-DOM-007`, para oportunidades, leads, B2B, catering, eventos y handoff a operación;
- `AURA-DOM-008`, para métricas, atribución, confianza, incrementalidad y aprendizaje;
- `AURA-DOM-009`, para reputación, comentarios, respuestas y escalamiento;
- `AURA-DOM-010`, para radar de oportunidades y recomendaciones explicables;
- `AURA-AUTH-001` a `AURA-AUTH-004`, para alcance, segregación de funciones, datos sensibles, clientes, exportaciones, secretos y terceros;
- `AURA-UX-005` a `AURA-UX-008`, para campañas, oportunidades, reputación, resultados, atribución y recomendaciones;
- `INT-APP-001`, para catálogo de eventos empresariales;
- `INT-APP-002`, para aplicación emisora propietaria de cada evento;
- `INT-APP-003`, para consumidoras, finalidades, condiciones, sensibilidad, perfiles de proyección y estado de entrega;
- `INT-APP-004`, para idempotencia de entrega y efecto;
- `INT-APP-005`, para reintentos y backoff por consumidora;
- `INT-APP-006`, para compensaciones empresariales sin reversión improvisada;
- `INT-APP-007`, para auditoría transversal;
- `INT-APP-008`, para estados pendientes de sincronización, offline e incertidumbre;
- `INT-APP-009`, para errores parciales, cuarentena e intervención;
- `INT-APP-010`, para prohibición de escrituras cruzadas sin contrato propietario;
- `INT-MKT-001` a `INT-MKT-003`, para puerta de AURA, beneficios publicados en PASS y validación comercial desde PULSO;
- `CAP-SCOPE-006`, `CAP-SCOPE-008`, `CAP-SCOPE-009`, `CAP-SCOPE-010`, `CAP-SCOPE-012`, `CAP-SCOPE-014` y `CAP-SCOPE-017`, para inventario, producción, venta, cliente, economía, marketing y datos;
- el registro canónico de requisitos de prueba vigente;
- la topología que fija `DEFINE_ONCE` y `NO_PHYSICAL_INSTANCE` para `AURA-INT-002`.

Ninguna de estas fuentes cambia de propietaria por esta tarea.

---

#### 3. Naturaleza y topología

La tarea se desarrolla una sola vez como contrato documental reutilizable:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
physical_instance = NONE
```

Por tanto:

- no existe instancia global propia de esta tarea;
- no existe instancia por package;
- no existe instancia por implementation unit;
- no crea lecturas productivas;
- no crea suscripciones ni consumidores runtime;
- no crea comandos ni writers;
- no crea almacenamiento de proyecciones;
- no crea cambios de Supabase;
- toda futura materialización pertenece a las unidades y packages físicos que correspondan.

---

#### 4. Resultado canónico

AURA deberá poder consumir información interna mediante contratos que demuestren, para cada lectura o evento:

1. aplicación propietaria del hecho;
2. finalidad empresarial de consumo por AURA;
3. recurso, proceso o hecho origen;
4. perfil de proyección autorizado;
5. allowlist de campos mínima;
6. clasificación de sensibilidad;
7. requisito de autorización de la consumidora;
8. identidad y versión de la fuente;
9. tiempo de vigencia, observación o corte;
10. frescura y completitud disponibles;
11. correlación con campaña, publicación, oportunidad o análisis cuando aplique;
12. condición explícita cuando el consumo sea condicional;
13. semántica de ausencia, `null`, desconocido, no aplicable y dato vencido;
14. estado de entrega o disponibilidad del contrato;
15. resultado de consumo o pendiente correlacionado cuando aplique;
16. tratamiento de duplicados y entregas repetidas;
17. reconciliación cuando lectura, evento y fuente discrepen;
18. evidencia suficiente para reconstruir qué dato se consumió, por qué y bajo qué autoridad.

AURA nunca deberá necesitar acceso directo e irrestricto al almacenamiento propietario para satisfacer este contrato.

---

#### 5. Fronteras conceptuales obligatorias

Se preservan las siguientes diferencias:

```text
REFERENCIA
!=
COPIA MAESTRA
```

```text
SNAPSHOT
!=
ESTADO ACTUAL GARANTIZADO
```

```text
EVENTO RECIBIDO
!=
HECHO NUEVO DE AURA
```

```text
EVENTO REPETIDO
!=
SEGUNDO EFECTO
```

```text
LECTURA FALLIDA
!=
VALOR CERO
```

```text
DATO VENCIDO
!=
DATO FALSO
```

```text
AUSENTE
!=
NULL
!=
DESCONOCIDO
!=
NO APLICA
!=
DENEGADO
!=
FALLO TECNICO
```

```text
CORRELACION
!=
CAUSALIDAD
```

```text
SEÑAL DE VENTA
!=
CONVERSION ATRIBUIDA
!=
VENTA INCREMENTAL
```

---

#### 6. Universo cerrado de aplicaciones propietarias

Esta tarea cubre exactamente seis aplicaciones internas:

| Aplicación | Fuente de verdad que AURA debe respetar | Uso permitido desde AURA | Prohibición principal |
| --- | --- | --- | --- |
| `NEXO` | producto, inventario, disponibilidad física y hechos logísticos dentro de su ownership | contexto, referencia y guardas operativas autorizadas | AURA no modifica stock, movimientos, remisiones, activos ni disponibilidad |
| `PULSO` | oferta vendible, pedido, venta, pago, servicio y entrega comercial dentro de su ownership | señales comerciales, validación de efecto, conversiones correlacionables y analítica autorizada | AURA no crea pedidos, ventas, pagos, precios ni descuentos aplicados |
| `PASS` | identidad de cliente, preferencias, consentimiento, fidelización, beneficios, puntos y canjes dentro de su ownership | segmentación autorizada, elegibilidad o resultado mínimo, consentimiento y señal de fidelización | AURA no crea identidad, consentimiento, saldo, beneficio, punto o redención |
| `NUMERA` | presupuesto, costo, margen, rentabilidad, obligación y verdad económica dentro de su ownership | guardas económicas, conciliación y analítica autorizada | AURA no fija costo, reconoce ingreso, crea asiento ni recalcula verdad económica |
| `VISO` | procesos administrativos que le pertenezcan y superficies CMS transitorias mientras no exista transferencia aprobada | referencias, lifecycle, handoffs y contexto administrativo autorizado | AURA no absorbe CMS ni procesos VISO por conveniencia |
| `FOGO` | receta, plan, lote, ejecución, calidad y capacidad productiva dentro de su ownership | guardas de capacidad y restricciones productivas mediante lectura o proyección autorizada | AURA no modifica receta, plan, lote, calidad ni producción |

El conjunto es cerrado para esta tarea. ORIGO, ANIMA, SHELL y terceros no se agregan por inferencia.

---

#### 7. Contrato mínimo de lectura interna

Una lectura interna para AURA deberá declarar conceptualmente:

```text
source_application
source_owner_reference
consumer_application = aura
consumer_purpose_code
projection_profile
field_allowlist_ref
sensitivity_class
authorization_requirement
source_version_or_revision
observed_or_effective_at
freshness_state
completeness_state
correlation_reference cuando aplique
condition_ref cuando aplique
```

Estas identidades son contractuales y no obligan a crear una tabla, vista o endpoint con esos nombres.

La lectura debe poder responder:

- quién es propietario del dato;
- qué finalidad justifica el consumo;
- qué campos mínimos se exponen;
- qué versión o corte representa;
- cuándo deja de ser suficientemente fresco;
- qué hace AURA si la lectura está ausente, vencida, incompleta o denegada.

---

#### 8. Perfiles de proyección reutilizados

AURA reutiliza el vocabulario cerrado aprobado en `INT-APP-003`:

- `REFERENCE_PROJECTION`;
- `VERSIONED_REFERENCE_PROJECTION`;
- `LIFECYCLE_PROJECTION`;
- `HANDOFF_PROJECTION`;
- `IMMUTABLE_FACT_PROJECTION`;
- `EFFECT_CONFIRMATION_PROJECTION`;
- `EXECUTION_SIGNAL_PROJECTION`;
- `RECONCILIATION_PROJECTION`;
- `MARKETING_ANALYTICS_PROJECTION`;
- `ANALYTICS_PROJECTION`.

`AURA-INT-002` no crea un perfil undécimo.

Cada consumo deberá usar el perfil aprobado por el proceso o una evolución explícita del contrato propietario; nunca se escogerá un perfil más amplio solo porque resulte conveniente para marketing.

---

#### 9. Baseline canónico de AURA como consumidora de eventos

`INT-APP-003` materializa para AURA, como consumidora, el siguiente baseline:

```text
RELACIONES DE PROCESO DIRECTAS A AURA        19
RELACIONES DE PROCESO CONDICIONALES A AURA   8
RELACIONES DE PROCESO TOTALES A AURA        27

RELACIONES DE EVENTO DIRECTAS A AURA       106
RELACIONES DE EVENTO CONDICIONALES A AURA   47
RELACIONES DE EVENTO TOTALES A AURA        153
```

Estas 153 relaciones pertenecen exclusivamente a las seis aplicaciones nombradas por esta tarea.

Las 197 relaciones vinculadas con AURA que aparecen en el contrato transversal incluyen además otras direcciones o relaciones del ecosistema. `AURA-INT-002` no reinterpreta 197 como 153 ni viceversa.

---

#### 10. Distribución por aplicación emisora

| Emisora | Procesos con AURA consumidora | Eventos directos | Eventos condicionales | Total de eventos | Decisión de esta tarea |
| --- | ---: | ---: | ---: | ---: | --- |
| `NEXO` | 2 | 9 | 0 | 9 | preservar referencias canónicas directas |
| `PULSO` | 7 | 28 | 12 | 40 | preservar referencias, confirmaciones de efecto y analítica de marketing |
| `PASS` | 1 | 6 | 0 | 6 | preservar confirmación de efecto con mínimo dato |
| `NUMERA` | 5 | 18 | 12 | 30 | preservar conciliación y analítica económica autorizada |
| `VISO` | 12 | 45 | 23 | 68 | preservar referencias, lifecycle y handoffs según proceso |
| `FOGO` | 0 | 0 | 0 | 0 | no inventar suscripción; usar lectura/guarda autorizada mientras el catálogo de eventos no declare AURA consumidora |
| **TOTAL** | **27** | **106** | **47** | **153** | baseline congelado |

La fila FOGO no significa que AURA pueda ignorar capacidad productiva. Significa que el contrato actual no autoriza afirmar que FOGO emite hoy un evento consumido por AURA.

---

#### 11. Contrato NEXO → AURA

El baseline de eventos preservado es:

```text
VPROC-0015 -> 4 eventos -> DIRECT -> REFERENCE_PROJECTION
VPROC-0018 -> 5 eventos -> DIRECT -> REFERENCE_PROJECTION
```

Total:

```text
2 relaciones de proceso
9 relaciones de evento directas
0 condicionales
```

AURA podrá consumir referencias o proyecciones mínimas para:

- identificar producto o recurso empresarial autorizado;
- verificar contexto de disponibilidad o inventario cuando una campaña lo necesite como guarda;
- evitar prometer una condición física que la fuente propietaria no sostenga;
- correlacionar una campaña o recomendación con la referencia propietaria sin copiar el maestro.

AURA no podrá:

- actualizar existencias;
- reservar stock por inferencia;
- crear movimientos;
- modificar remisiones;
- decidir custodia o ubicación;
- convertir una lectura puntual en disponibilidad garantizada futura.

---

#### 12. Contrato PULSO → AURA

El baseline preservado cubre:

```text
VPROC-0017 -> 4 eventos  -> DIRECT      -> VERSIONED_REFERENCE_PROJECTION
VPROC-0040 -> 6 eventos  -> CONDITIONAL -> EFFECT_CONFIRMATION_PROJECTION
VPROC-0041 -> 6 eventos  -> DIRECT      -> EFFECT_CONFIRMATION_PROJECTION
VPROC-0046 -> 6 eventos  -> DIRECT      -> EFFECT_CONFIRMATION_PROJECTION
VPROC-0047 -> 6 eventos  -> DIRECT      -> EFFECT_CONFIRMATION_PROJECTION
VPROC-0050 -> 6 eventos  -> CONDITIONAL -> EFFECT_CONFIRMATION_PROJECTION
VPROC-0068 -> 6 eventos  -> DIRECT      -> MARKETING_ANALYTICS_PROJECTION
```

Total:

```text
7 relaciones de proceso
28 relaciones de evento directas
12 relaciones de evento condicionales
40 relaciones de evento totales
```

AURA podrá consumir, conforme a finalidad y allowlist:

- referencias de oferta o contexto comercial;
- confirmaciones de efectos comerciales cuando el proceso lo permita;
- señales de pedido, venta o resultado únicamente al nivel autorizado;
- métricas o agregados de marketing cuando el perfil lo establezca;
- correlaciones con campaña, promoción, publicación u oportunidad sin declarar causalidad automática.

AURA no podrá:

- crear o editar pedidos;
- modificar precios;
- aplicar descuentos;
- registrar pagos;
- alterar caja;
- completar una venta;
- convertir cualquier venta temporalmente cercana en conversión atribuida.

---

#### 13. Contrato PASS → AURA

El baseline preservado es:

```text
VPROC-0045 -> 6 eventos -> DIRECT -> EFFECT_CONFIRMATION_PROJECTION
```

Total:

```text
1 relación de proceso
6 relaciones de evento directas
0 condicionales
```

AURA podrá consumir únicamente la proyección mínima necesaria para:

- verificar consentimiento o preferencia cuando la finalidad lo requiera;
- usar segmentación gobernada sin copiar la identidad completa;
- conocer confirmaciones de beneficio, fidelización o efecto cuando el proceso lo autorice;
- correlacionar campañas con resultados de fidelización sin reconstruir el ledger.

AURA no podrá:

- inferir consentimiento por compra, visita, redención o interacción;
- crear clientes;
- editar preferencias por conveniencia de campaña;
- crear puntos;
- modificar saldo;
- crear, redimir o revertir beneficios;
- exportar PII fuera de la finalidad autorizada.

---

#### 14. Contrato NUMERA → AURA

El baseline preservado cubre:

```text
VPROC-0051 -> 6 eventos -> CONDITIONAL -> RECONCILIATION_PROJECTION
VPROC-0053 -> 6 eventos -> CONDITIONAL -> RECONCILIATION_PROJECTION
VPROC-0054 -> 6 eventos -> DIRECT      -> RECONCILIATION_PROJECTION
VPROC-0061 -> 6 eventos -> DIRECT      -> ANALYTICS_PROJECTION
VPROC-0069 -> 6 eventos -> DIRECT      -> ANALYTICS_PROJECTION
```

Total:

```text
5 relaciones de proceso
18 relaciones de evento directas
12 relaciones de evento condicionales
30 relaciones de evento totales
```

AURA podrá consumir:

- presupuesto autorizado o su proyección mínima;
- guardas de margen y costo;
- resultado económico conciliado;
- análisis o agregados permitidos;
- referencias necesarias para explicar rentabilidad sin recalcular la verdad económica.

AURA no podrá:

- fijar costos;
- reconocer ingreso;
- crear asientos;
- reconstruir contabilidad desde eventos de venta;
- tratar presupuesto como autorización automática de gasto;
- calcular margen propio y presentarlo como NUMERA.

---

#### 15. Contrato VISO → AURA

El baseline preservado cubre:

```text
VPROC-0001 -> 5 eventos -> CONDITIONAL -> LIFECYCLE_PROJECTION
VPROC-0002 -> 6 eventos -> DIRECT      -> REFERENCE_PROJECTION
VPROC-0003 -> 4 eventos -> DIRECT      -> REFERENCE_PROJECTION
VPROC-0004 -> 6 eventos -> CONDITIONAL -> LIFECYCLE_PROJECTION
VPROC-0006 -> 6 eventos -> CONDITIONAL -> HANDOFF_PROJECTION
VPROC-0011 -> 6 eventos -> DIRECT      -> HANDOFF_PROJECTION
VPROC-0058 -> 6 eventos -> DIRECT      -> LIFECYCLE_PROJECTION
VPROC-0059 -> 6 eventos -> DIRECT      -> HANDOFF_PROJECTION
VPROC-0060 -> 5 eventos -> DIRECT      -> LIFECYCLE_PROJECTION
VPROC-0062 -> 6 eventos -> DIRECT      -> LIFECYCLE_PROJECTION
VPROC-0063 -> 6 eventos -> DIRECT      -> LIFECYCLE_PROJECTION
VPROC-0064 -> 6 eventos -> CONDITIONAL -> LIFECYCLE_PROJECTION
```

Total:

```text
12 relaciones de proceso
45 relaciones de evento directas
23 relaciones de evento condicionales
68 relaciones de evento totales
```

AURA podrá consumir únicamente referencias, lifecycle y handoffs compatibles con el proceso propietario.

Mientras las superficies CMS actuales continúen bajo VISO:

- AURA no se convierte en propietaria por consumir referencias;
- una lectura de contenido no equivale a transferencia de CMS;
- un handoff no permite reescribir el origen;
- un evento VISO no concede acceso administrativo general;
- la transferencia futura sigue requiriendo decisión, ADR, migración, cutover y reconciliación aprobados.

---

#### 16. Contrato FOGO → AURA

FOGO conserva:

- receta;
- plan;
- lote;
- ejecución;
- calidad;
- capacidad productiva;
- restricciones técnicas de producción dentro de su ownership.

AURA necesita esa frontera para no diseñar campañas inviables, pero el baseline vigente de `INT-APP-003` contiene:

```text
RELACIONES DE PROCESO FOGO -> AURA = 0
RELACIONES DE EVENTO FOGO -> AURA = 0
```

Por tanto:

1. `AURA-INT-002` no crea una suscripción FOGO→AURA;
2. la guardia de capacidad se satisface mediante lectura o proyección autorizada definida por el contrato propietario aplicable;
3. AURA deberá tratar ausencia de una proyección fresca como guarda no satisfecha cuando la campaña dependa materialmente de capacidad;
4. AURA no podrá leer recetas o detalles productivos completos por conveniencia de marketing;
5. una futura relación de evento FOGO→AURA requerirá evolución explícita de `INT-APP-*`, versionado, compatibilidad, pruebas y autorización; no nace de esta tarea.

---

#### 17. Lectura de guardas antes de una acción de marketing

Cuando una campaña o recomendación dependa de condiciones empresariales, AURA deberá evaluar guardas mediante fuentes propietarias.

Ejemplos de guardas:

| Guarda | Fuente propietaria principal | Conducta de AURA si no puede demostrarse |
| --- | --- | --- |
| disponibilidad o stock | NEXO | bloquear promesa o exigir revisión |
| capacidad productiva | FOGO | bloquear promesa o exigir revisión |
| elegibilidad comercial | PULSO/PASS según regla propietaria | no asumir aplicabilidad |
| consentimiento | PASS | no contactar con finalidad de marketing |
| presupuesto o margen | NUMERA | no presentar la iniciativa como económicamente aprobada |
| estado administrativo o CMS transitorio | VISO cuando corresponda | no asumir transferencia o vigencia |

La ausencia de una guarda material no equivale a aprobación.

---

#### 18. Semántica de frescura

Toda lectura material deberá poder distinguir:

```text
FRESH
STALE
UNKNOWN
NOT_APPLICABLE
UNAVAILABLE
DENIED
```

Estas etiquetas son conceptuales y no crean un enum físico obligatorio.

Reglas:

1. `STALE` conserva el último valor observado, pero no autoriza afirmar que continúa vigente;
2. `UNKNOWN` no se transforma en `false`, `0` ni lista vacía;
3. `UNAVAILABLE` describe fallo de acceso o fuente, no ausencia del hecho;
4. `DENIED` describe falta de autoridad, no inexistencia del dato;
5. una campaña no puede convertir una lectura vieja de stock, margen, consentimiento o capacidad en promesa vigente;
6. una recomendación deberá declarar la frescura material de las fuentes que soportan su razón.

---

#### 19. Ausencia, `null` y cero

AURA deberá preservar:

```text
0
!=
NULL
!=
AUSENTE
!=
DESCONOCIDO
!=
NO APLICA
!=
DENEGADO
!=
FALLO
```

Ejemplos:

- margen desconocido no es margen cero;
- stock no consultable no es stock cero;
- ausencia de evento no demuestra que el hecho no ocurrió;
- consentimiento no disponible no equivale a opt-in;
- capacidad no calculada no equivale a capacidad disponible.

---

#### 20. Contrato de evento consumido por AURA

Toda relación de evento que llegue a AURA deberá preservar los campos contractuales aprobados por `INT-APP-003`:

```text
event_definition_id
process_id
producer_application
consumer_application
consumer_relation
condition_ref cuando aplique
consumer_purpose_code
projection_profile
sensitivity_class
field_allowlist_ref
authorization_requirement
delivery_status
consumer_result_ref
origin_task
```

La emisora conserva la definición del hecho.

AURA no renombra el evento para convertirlo en un hecho de marketing ni amplía el payload por conveniencia analítica.

---

#### 21. Relaciones directas y condicionales

Una relación `DIRECT` significa que la finalidad aprobada permite a AURA recibir esa proyección cuando se materialice el contrato.

Una relación `CONDITIONAL` exige además `condition_ref` y evaluación de la condición empresarial correspondiente.

Reglas:

- condicional no significa opcional sin regla;
- directa no significa acceso irrestricto;
- ambas conservan field allowlist, sensibilidad y autorización;
- una condición no satisfecha no se convierte en entrega parcial silenciosa;
- un cambio de condición exige versionado y compatibilidad.

---

#### 22. Estado diferido de AURA

Las relaciones internas aprobadas no equivalen a consumidores productivos activos.

Se preserva:

```text
CONTRATO DEFINIDO
+
AURA CONSUMIDORA DECLARADA
!=
SUSCRIPCION ACTIVA
!=
DATOS ENTREGADOS
!=
READINESS
```

Las relaciones vinculadas con AURA permanecen diferidas hasta que la materialización física aplicable satisfaga cobertura, autorización, readiness, dependencias y gates del paquete correspondiente.

Esta tarea no cambia ese estado.

---

#### 23. Idempotencia de consumo

`AURA-INT-002` consume la política de `INT-APP-004` sin redefinirla.

Reglas obligatorias:

1. una entrega repetida no crea un segundo efecto empresarial;
2. la misma identidad con la misma huella conserva el resultado original;
3. la misma identidad con contenido incompatible produce conflicto, no overwrite silencioso;
4. la idempotencia se evalúa por alcance y efecto, no por un ID universal improvisado;
5. una métrica tardía no crea otra conversión;
6. un evento comercial repetido no crea otro lead;
7. una confirmación repetida no duplica aprendizaje, guardas o resultados.

No se promete exactly-once de transporte.

---

#### 24. Orden, retraso y entrega fuera de secuencia

AURA no asumirá orden global entre aplicaciones.

Se preserva:

- orden por agregado o contrato cuando exista;
- posibilidad de eventos tardíos;
- posibilidad de entrega repetida;
- posibilidad de que una lectura posterior sea más fresca que un evento anterior;
- necesidad de reconciliación cuando el estado observado contradiga la secuencia recibida.

Un evento tardío no reabre automáticamente una campaña cerrada ni modifica retrospectivamente la historia.

---

#### 25. Retry y backoff

Los reintentos de entrega pertenecen a `INT-APP-005`.

AURA deberá:

- preservar identidad de la misma entrega;
- no convertir retry en evento nuevo;
- no ampliar payload durante retry;
- no saltar autorización para mejorar tasa de éxito;
- no reintentar indefinidamente un error permanente;
- conservar resultado desconocido cuando no exista evidencia suficiente;
- respetar vigencia y finalidad antes de aceptar un evento reintentado.

La implementación física de colas, scheduler, backoff o circuit breaker no pertenece a esta tarea.

---

#### 26. Error parcial e incertidumbre

AURA deberá distinguir:

```text
DELIVERED
!=
CONSUMED
!=
EFFECT_APPLIED
!=
RECONCILED
```

Y conservar estados pendientes cuando:

- parte de un lote fue procesada y otra parte no;
- una lectura falló después de recibir un evento;
- la fuente propietaria todavía no confirma el resultado;
- una correlación existe pero no está completa;
- un evento llega con referencia no resoluble;
- la autorización cambió durante el proceso.

Queda prohibido cerrar una parcialidad como éxito total para limpiar backlog.

---

#### 27. Reconciliación entre evento y lectura

Cuando AURA reciba un evento y posteriormente consulte la fuente propietaria:

```text
EVENTO
-> DISPARA O ACTUALIZA CONTEXTO
-> LECTURA AUTORIZADA PUEDE CONFIRMAR ESTADO
-> DISCREPANCIA GENERA RECONCILIACION
```

El evento no autoriza escribir de vuelta sobre la fuente.

Si la lectura y el evento difieren:

- se conserva la evidencia de ambos;
- se identifica versión y tiempo;
- se determina si el evento fue tardío, duplicado, corregido o superado;
- se evita presentar como vigente un valor no reconciliado;
- la propietaria del hecho decide la corrección.

---

#### 28. Replay y backfill

Replay y backfill no se ejecutan por defecto.

Se preservan las reglas de `INT-APP-*`:

1. una consumidora añadida posteriormente no recibe historia automáticamente;
2. replay conserva audiencia histórica o usa una migración explícita;
3. backfill no reinterpreta el hecho con reglas actuales sin decisión versionada;
4. un replay no repite efectos ya confirmados;
5. una campaña cerrada no se reabre solo porque llegue historia atrasada;
6. la corrección histórica se registra como nueva evidencia o revisión, no como borrado de la secuencia original.

---

#### 29. Correlación empresarial

AURA podrá conservar referencias que relacionen:

- campaña;
- experimento;
- publicación;
- promoción;
- oportunidad;
- interacción reputacional;
- pedido o venta cuando exista contrato;
- beneficio o redención cuando exista contrato;
- hecho económico cuando exista contrato;
- guarda de inventario o capacidad.

Pero:

```text
CORRELATION_ID
!=
OWNERSHIP
```

Y:

```text
CORRELACION TEMPORAL
!=
ATRIBUCION
!=
CAUSALIDAD
```

La interpretación de impacto permanece en `AURA-DOM-008` y `AURA-UX-008`.

---

#### 30. Minimización y sensibilidad

Cada lectura y evento deberá usar:

- finalidad explícita;
- field allowlist versionada;
- clasificación de sensibilidad;
- mínimo privilegio;
- mínimo dato;
- nivel de agregación compatible con la finalidad;
- retención proporcional;
- auditoría suficiente.

AURA no necesita una copia completa del cliente, pedido, ledger, inventario, receta, caso o asiento para decidir marketing.

La disponibilidad técnica de un campo no autoriza su consumo.

---

#### 31. Autorización de la consumidora

`authorization_requirement` permanece obligatorio cuando corresponda.

Reglas:

1. que la emisora pueda publicar un evento no autoriza a cualquier consumidor;
2. que AURA tenga acceso a una lectura no autoriza exportarla a un canal externo;
3. que un actor pueda ver un dashboard no autoriza drill-down a PII;
4. un service role no sustituye autorización empresarial;
5. un evento sensible deberá filtrarse antes de llegar a una experiencia no autorizada;
6. revocación, cambio de contexto o cambio de finalidad obligan a reautorizar acciones posteriores.

Una lectura interna autorizada no concede por sí sola permiso para enviar la misma información a un tercero.

---

#### 32. Prohibición de escritura cruzada

`AURA-INT-002` es contrato de lectura y eventos.

No autoriza:

```text
AURA -> UPDATE NEXO
AURA -> UPDATE PULSO
AURA -> UPDATE PASS
AURA -> UPDATE NUMERA
AURA -> UPDATE VISO
AURA -> UPDATE FOGO
```

Cuando una acción futura requiera efecto en otra aplicación:

- deberá usar el comando o contrato propietario aprobado;
- la aplicación propietaria reautoriza;
- la propietaria ejecuta el efecto;
- el resultado vuelve como confirmación o evento correlacionado;
- AURA no escribe directamente en tablas ajenas.

---

#### 33. Analítica sin nuevo maestro

AURA podrá construir análisis de marketing utilizando proyecciones autorizadas, pero no deberá crear un maestro competidor de:

- clientes;
- pedidos;
- ventas;
- pagos;
- beneficios;
- puntos;
- inventario;
- productos;
- capacidad;
- recetas;
- costos;
- margen;
- presupuesto;
- CMS vigente;
- casos administrativos.

Un agregado analítico de AURA es una vista de decisión de marketing, no una nueva fuente del hecho subyacente.

---

#### 34. Frontera con `AURA-INT-001`

`AURA-INT-001` gobierna sistemas y proveedores externos.

`AURA-INT-002` gobierna consumo interno de aplicaciones VENTO.

Por tanto, esta tarea no redefine:

- OAuth;
- API keys;
- HMAC externo;
- credenciales de proveedor;
- webhooks externos;
- rate limits externos;
- backoff de proveedores externos;
- conciliación de cuentas externas.

Si un dato llega desde un canal externo y luego se relaciona con PULSO, PASS, NUMERA, NEXO, VISO o FOGO, la frontera externa termina antes de que empiece el contrato interno propietario.

---

#### 35. Frontera con Supabase

Esta tarea no crea ni modifica:

- schemas;
- tablas;
- vistas;
- índices;
- constraints;
- funciones;
- RPC;
- triggers;
- grants;
- RLS;
- Auth;
- Storage;
- Realtime;
- Edge Functions;
- cron;
- colas;
- secretos;
- datos remotos.

Si una futura materialización requiere Supabase, toda modificación VENTO deberá crearse, versionarse, documentarse y ejecutarse desde `vento-group-sas/vento-shell` bajo la tarea física propietaria.

---

#### 36. Frontera con infraestructura transversal

El contrato interno no selecciona ni materializa:

- outbox;
- inbox;
- broker;
- topic;
- queue;
- subscription;
- worker;
- scheduler;
- dead-letter store;
- cache;
- transport protocol;
- tracing backend;
- observability backend.

Esas capacidades pertenecen a sus contratos transversales y lifecycles físicos.

---

#### 37. Cierre del mini-bloque AURA-INT

Con `AURA-INT-001` y `AURA-INT-002` quedan definidas documentalmente las dos fronteras de integración de AURA:

```text
AURA-INT-001
-> EXTERIOR DE VENTO
-> canales, proveedores, credenciales, webhooks, limites y conciliacion externa
```

```text
AURA-INT-002
-> INTERIOR DE VENTO
-> lecturas, proyecciones y eventos de aplicaciones propietarias
```

No queda una tercera categoría implícita entre ambas.

Una integración que cruce ambas fronteras deberá preservar los dos contratos y no usar una para evitar los controles de la otra.

---

#### 38. Handoff de cierre de AURA hacia `AUTH-QA-001`

Al incorporarse canónicamente esta tarea:

- el bloque W completa sus 37 tareas documentales;
- `AURA-INT-001` y `AURA-INT-002` cierran el mini-bloque de integraciones;
- la continuidad normal entrega el control a `AUTH-QA-001` en `PHASE-13-U-INTEGRAL-CERTIFICATION`;
- el handoff no crea una instancia física de AURA;
- el handoff no declara que AURA esté desplegada;
- el handoff no ejecuta pruebas integrales por sí mismo;
- `AUTH-QA-001` conserva su propia topología, criterios y gates.

La transición de bloque es documental y no constituye autorización física.

---

#### 39. Decisiones fijadas

Quedan fijadas las siguientes decisiones:

1. AURA consume fuentes propietarias; no las reemplaza;
2. lectura, evento, comando y escritura cruzada son contratos distintos;
3. el universo de esta tarea contiene exactamente NEXO, PULSO, PASS, NUMERA, VISO y FOGO;
4. se reutilizan los diez perfiles de proyección de `INT-APP-003` sin crear otro;
5. el baseline de AURA como consumidora es 27 relaciones de proceso y 153 relaciones de evento;
6. las 153 relaciones se dividen en 106 directas y 47 condicionales;
7. NEXO aporta 9 relaciones de evento directas;
8. PULSO aporta 40 relaciones, 28 directas y 12 condicionales;
9. PASS aporta 6 relaciones directas;
10. NUMERA aporta 30 relaciones, 18 directas y 12 condicionales;
11. VISO aporta 68 relaciones, 45 directas y 23 condicionales;
12. FOGO aporta cero relaciones FOGO→AURA en el baseline actual y no se inventa una suscripción;
13. FOGO sigue siendo fuente autorizada de capacidad y producción mediante lectura/proyección aplicable;
14. una relación directa no equivale a acceso irrestricto;
15. una relación condicional exige condición explícita;
16. ausencia, `null`, desconocido, no aplica, denegado y fallo permanecen distintos;
17. dato stale no se presenta como hecho vigente;
18. el evento conserva productor, proceso, finalidad, sensibilidad, allowlist y perfil;
19. la entrega repetida no crea segundo efecto;
20. no se promete exactly-once de transporte;
21. no existe orden global entre aplicaciones;
22. eventos tardíos y out-of-order conservan reconciliación;
23. replay y backfill no ocurren automáticamente;
24. correlación no equivale a atribución ni causalidad;
25. consentimiento permanece en PASS;
26. venta y pedido permanecen en PULSO;
27. costo, margen y resultado económico permanecen en NUMERA;
28. inventario y disponibilidad física permanecen en NEXO;
29. receta, producción, calidad y capacidad permanecen en FOGO;
30. procesos y superficies VISO conservan ownership mientras no exista transferencia aprobada;
31. una lectura interna no autoriza exportación externa;
32. AURA no ejecuta escrituras cross-app desde esta tarea;
33. Supabase no se modifica;
34. no se crean ni modifican requisitos de prueba;
35. no se crea ninguna instancia física;
36. el mini-bloque `AURA-INT-001` a `AURA-INT-002` queda documentalmente cerrado;
37. la siguiente tarea reservada es exactamente `AUTH-QA-001`.

---

#### 40. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: los requisitos vigentes ya protegen ownership, lecturas, contratos de integración, consumidoras, idempotencia, retries, errores parciales, autorización, fuentes de verdad, campañas, consentimientos, ventas, beneficios, guardas económicas, atribución y reconciliación. Esta tarea materializa el contrato responsable de consumo interno sin introducir una obligación verificable nueva ni alterar texto, relación, paquete, ambiente, evidencia u ownership de una fila existente.

---

#### 41. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación:

- `TREQ-AURA-001`, para fuentes autorizadas, identidad, estados y prohibición de crear maestros competidores;
- `TREQ-AURA-002`, para grounding, fuentes, frescura, minimización, privacidad y trazabilidad de IA;
- `TREQ-AURA-003`, para campañas, promociones, oportunidades, resultados, guardas y fronteras con PULSO, PASS y NUMERA;
- `TREQ-INTEGRATION-019`, para contratos internos, adaptadores externos, identificadores, payloads, idempotencia, eventos tardíos, conciliación y fuentes de verdad;
- `TREQ-PULSO-005` y `TREQ-PULSO-006`, para venta, promociones y efectos comerciales propietarios;
- `TREQ-PASS-010` y `TREQ-PASS-011`, para identidad, consentimiento, fidelización, beneficios y fronteras de consumo;
- `TREQ-NUMERA-004`, para verdad económica y conciliación;
- la cobertura vigente de NEXO, FOGO y VISO sobre sus hechos propietarios;
- `TREQ-INTEGRATION-080` a `TREQ-INTEGRATION-317`, ya creados por `INT-APP-003` a `INT-APP-010` para consumidoras, idempotencia, retry, compensación, auditoría, pendientes, parcialidad y escrituras cruzadas.

Esta enumeración es trazabilidad de cobertura vigente y no constituye creación ni modificación del registro 04A.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | la incorporación y compilación documental requieren el checkout local de `vento-shell`; no se ejecutaron desde esta entrega |
| LOCAL | `NOT_EXECUTED` | el artefacto todavía no ha sido insertado, formateado ni validado por los scripts del repositorio en el checkout del usuario |
| REMOTA | `PASS` | se verificaron en `vento-shell/main` el archivo propietario, continuidad, topología, políticas documentales, `AURA-DOM-*`, `AURA-AUTH-*`, `AURA-UX-*`, `INT-APP-001..010`, `INT-MKT-001..003`, registro 04A AURA y la matriz de consumidoras; se recalcularon 27 relaciones de proceso y 153 relaciones de evento hacia AURA desde las seis aplicaciones nombradas |
| OPERATIVA | `NOT_EXECUTED` | no se consultaron datos empresariales reales, no se publicaron eventos, no se ejecutaron lecturas internas y no se produjeron efectos cross-app |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; la tarea se agota en su contrato documental |

La evidencia remota valida coherencia documental de la propuesta. La validación real del repositorio corresponde a la incorporación controlada del artefacto y a la batería canónica.

---

#### 43. Criterios de aceptación

`AURA-INT-002` queda satisfecha cuando simultáneamente:

1. preserva exactamente seis aplicaciones propietarias;
2. separa lectura, evento, comando y escritura cruzada;
3. define contrato mínimo de lectura con finalidad, allowlist, sensibilidad, versión, frescura y autorización;
4. reutiliza los diez perfiles cerrados de proyección;
5. conserva 27 relaciones de proceso hacia AURA;
6. conserva 153 relaciones de evento hacia AURA;
7. conserva 106 relaciones directas y 47 condicionales;
8. conserva la distribución NEXO 9, PULSO 40, PASS 6, NUMERA 30, VISO 68 y FOGO 0;
9. no inventa eventos FOGO→AURA;
10. define la guarda de capacidad FOGO mediante lectura/proyección autorizada;
11. preserva ownership de NEXO sobre inventario y disponibilidad física;
12. preserva ownership de PULSO sobre pedido, venta, pago y efecto comercial;
13. preserva ownership de PASS sobre identidad, consentimiento, fidelización, beneficios y redenciones;
14. preserva ownership de NUMERA sobre costo, margen, presupuesto, rentabilidad y verdad económica;
15. preserva ownership de VISO sobre sus procesos y CMS transitorio mientras corresponda;
16. preserva ownership de FOGO sobre receta, producción, calidad y capacidad;
17. distingue fresco, stale, desconocido, no aplica, indisponible y denegado;
18. distingue cero, `null`, ausencia, desconocido y fallo;
19. conserva los campos contractuales de evento de `INT-APP-003`;
20. exige condición explícita para relaciones condicionales;
21. mantiene AURA diferida como consumidora física;
22. aplica idempotencia sin prometer exactly-once;
23. preserva orden por contrato sin inventar orden global;
24. trata eventos tardíos y duplicados de forma reconciliable;
25. prohíbe replay/backfill automático;
26. reconcilia evento y lectura sin escribir de vuelta;
27. preserva minimización y sensibilidad;
28. exige reautorización en la consumidora cuando corresponda;
29. prohíbe escritura directa AURA→NEXO/PULSO/PASS/NUMERA/VISO/FOGO;
30. evita crear un data master alterno dentro de AURA;
31. conserva integración externa bajo `AURA-INT-001`;
32. mantiene Supabase y runtime fuera del alcance;
33. no crea ni modifica requisitos de prueba;
34. no crea ninguna instancia física;
35. cierra documentalmente el mini-bloque AURA-INT;
36. entrega continuidad exactamente a `AUTH-QA-001`.

---

#### 44. Límites

Esta tarea no autoriza ni ejecuta:

- crear APIs o endpoints internos;
- crear consumers, subscriptions, topics, queues, workers, schedulers o brokers;
- crear outbox o inbox;
- crear tablas de proyección o caches físicos;
- crear eventos nuevos;
- cambiar emisoras o consumidoras de `INT-APP-003`;
- añadir FOGO como emisora hacia AURA sin evolución contractual explícita;
- publicar eventos reales;
- ejecutar replay o backfill;
- leer datos reales de NEXO, PULSO, PASS, NUMERA, VISO o FOGO;
- escribir en dominios ajenos;
- copiar maestros a AURA;
- crear data warehouse, data mart o ledger alterno;
- modificar inventario, stock, remisiones o activos;
- modificar pedidos, ventas, pagos, precios o descuentos;
- modificar clientes, consentimientos, puntos, beneficios o canjes;
- modificar costos, margen, presupuesto, rentabilidad, asientos u obligaciones;
- modificar recetas, producción, lotes, calidad o capacidad;
- migrar CMS desde VISO;
- crear o modificar tablas, vistas, funciones, RPC, triggers, RLS, Storage, Realtime o Edge Functions;
- crear migraciones Supabase;
- usar service role como sustituto de autorización;
- crear o modificar requisitos del registro 04A;
- iniciar `AUTH-QA-001` desde esta tarea.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-INT-001 — Definir adaptadores de canales, webhooks, límites, credenciales y reconciliación externa`

**TAREA ACTUAL APROBADA**
`AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-001 — Propietario sin check-in entra a administración`
