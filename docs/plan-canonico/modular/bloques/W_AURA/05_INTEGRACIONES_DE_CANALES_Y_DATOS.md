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
### [ ] AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO
