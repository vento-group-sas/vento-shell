### MINI-BLOQUE — CONTEXTO Y TRABAJO PENDIENTE

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **contexto y trabajo pendiente** dentro de **H2 SHELL APP**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `SHELL-APP-004` a `SHELL-APP-008` — 5 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `SHELL-APP-004`: Mostrar turno activo
- `SHELL-APP-005`: Mostrar sede activa
- `SHELL-APP-006`: Mostrar área activa
- `SHELL-APP-007`: Mostrar rol operativo activo
- `SHELL-APP-008`: Mostrar tareas pendientes transversales
<!-- PLAN-SECTION-META:END -->

### ✅ SHELL-APP-004 — Mostrar turno activo

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-003 — Definir aplicaciones visibles por contexto
**Tarea siguiente:** SHELL-APP-005 — Mostrar sede activa
**Tipo de tarea:** definición técnico-documental de la presentación del turno vigente y del estado de turno activo dentro del Hub SHELL; el marcador canónico define una sola vez el contrato y su futura materialización conserva topología `PER_IMPLEMENTATION_UNIT`, sin crear ni autorizar una instancia física en esta tarea
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/02_CONTEXTO_Y_TRABAJO_PENDIENTE.md`
**Estado físico resultante:** contrato de presentación del turno definido y reconciliado con `AccessContext`, turno vigente y check-in activo, sin modificación del runtime de SHELL
**Cambios físicos autorizados:** ninguno; no se modifican código, navegación, contexto, turnos, check-ins, Supabase, datos, contratos compartidos, permisos, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo SHELL presenta al trabajador su situación de turno en el Hub sin convertir una proyección visual en autoridad.

La tarea distingue de forma inequívoca:

- turno vigente;
- turno activo;
- turno vigente sin check-in;
- ausencia legítima de turno vigente;
- contexto de turno no disponible por invalidez o ambigüedad.

No redefine autorización, no crea turnos, no registra check-in y no decide todavía sede, área ni rol operativo visibles.

---

#### 2. Handoff recibido de SHELL-APP-003

Se conserva sin reapertura:

1. `app.access` operativo usa turno vigente y no exige check-in;
2. `T` exige turno vigente;
3. `T+C` exige turno vigente y check-in activo;
4. un turno futuro no habilita visibilidad contextual;
5. un turno cancelado, retirado o expirado deja de habilitarla;
6. la ambigüedad de turno bloquea la derivación operativa;
7. el carril base permanece independiente;
8. sede, área y rol operativo proceden del contexto resuelto y no de la interfaz.

---

#### 3. Reconciliación terminológica

El contrato técnico `AccessContext` contiene:

```text
active_shift
active_checkin_session
```

`active_shift` representa el turno vigente resuelto para el actor y puede existir aunque:

```text
active_checkin_session = null
```

Por tanto, el nombre técnico `active_shift` no obliga a mostrar siempre la etiqueta humana `Turno activo`.

La presentación queda:

```text
TURNO VIGENTE
=
active_shift válido

TURNO ACTIVO
=
active_shift válido
+
active_checkin_session activo y compatible
```

---

#### 4. Fuente de verdad

SHELL consume un contexto resuelto en servidor.

No deriva el turno desde:

- consulta directa cliente a `employee_shifts`;
- `localStorage`;
- cookies de UI;
- último turno conocido;
- rol visible;
- sede o área seleccionadas;
- dispositivo;
- hora local del navegador;
- query parameters;
- simulación.

La UI no reconstruye autoridad.

---

#### 5. Estados humanos de presentación

| Condición | Etiqueta principal | Complemento |
| --- | --- | --- |
| turno vigente + check-in activo compatible | `Turno activo` | intervalo horario |
| turno vigente + sin check-in activo compatible | `Turno vigente` | `Entrada pendiente` + intervalo horario |
| ausencia legítima de turno vigente | `Sin turno activo` | sin horario |
| contexto inválido, ambiguo o no resoluble | `Turno no disponible` | sin detalle interno |

Estos estados son de presentación y no crean estados nuevos de autorización.

---

#### 6. Turno activo

Se muestra `Turno activo` únicamente cuando existe turno vigente, check-in activo compatible y contexto válido.

La interfaz no deduce compatibilidad; la recibe de la resolución canónica.

La etiqueta no significa que todas las capacidades operativas estén autorizadas.

---

#### 7. Turno vigente sin check-in

Cuando existe turno vigente y la ausencia de check-in es legítima, SHELL muestra:

```text
Turno vigente
Entrada pendiente
```

No muestra `Turno activo`.

Este estado es compatible con aplicaciones cuyo `app.access` utiliza prerrequisito `T`.

---

#### 8. Sin turno vigente

Cuando `active_shift = null` representa ausencia legítima y no una inconsistencia, SHELL muestra:

```text
Sin turno activo
```

No sustituye el turno ausente con turno siguiente, último turno, turno futuro, sede habitual o rol habitual.

---

#### 9. Turno no disponible

Cuando el turno no puede resolverse de forma confiable por solapamiento, múltiples turnos elegibles, inconsistencia, contrato inválido, backend no disponible o respuesta incompatible, SHELL muestra:

```text
Turno no disponible
```

No usa `Sin turno activo`, porque esa frase afirmaría una ausencia no demostrada.

La razón pública detallada pertenece a los contratos propietarios de mensajes.

---

#### 10. Turnos futuros y finalizados

Un turno futuro no se presenta como turno actual ni como “próximo” desde esta tarea.

Un turno expirado, cancelado o retirado deja de presentarse como vigente o activo.

No se conserva por caché, estado cliente, historial o check-in histórico.

---

#### 11. Ambigüedad

SHELL nunca elige un turno ambiguo por heurística.

Queda prohibido seleccionar el primero, el último, el más cercano, el de la sede seleccionada, el que tenga check-in o el que habilite más aplicaciones.

Mientras la ambigüedad exista, el estado público es `Turno no disponible`.

---

#### 12. Información visible

Esta tarea autoriza mostrar únicamente:

- descriptor `Turno`;
- estado humano;
- hora local de inicio;
- hora local de fin;
- fecha local cuando sea necesaria para evitar ambigüedad;
- `Entrada pendiente` cuando corresponda.

No muestra:

- `shift_id`;
- `employee_id`;
- sede;
- área;
- rol operativo;
- identificadores de revisión;
- códigos internos;
- structural issues;
- fingerprints;
- matched grants o denies.

---

#### 13. Tiempo y zona horaria

La fuente temporal conserva `starts_at` y `ends_at` como instantes autoritativos.

La presentación utiliza la zona horaria autoritativa de la sede o de la organización según el contrato de programación.

El timezone del navegador, sistema operativo, GPS o IP no puede cambiar el significado temporal del turno.

---

#### 14. Formato horario

Cuando inicio y fin caen en la misma fecha local se presenta un intervalo compacto:

```text
HH:mm – HH:mm
```

Cuando el turno cruza medianoche se incluye fecha suficiente para evitar interpretar el fin como anterior al inicio.

El cruce de medianoche no divide el turno en dos identidades visuales.

---

#### 15. Reloj del cliente

Un contador o reloj cliente no puede:

- activar el turno;
- finalizar el turno;
- habilitar aplicaciones;
- cerrar check-in;
- sustituir una nueva resolución server-side.

Esta tarea no exige contador en vivo.

---

#### 16. Región `Contexto laboral`

SHELL reserva una región compacta `Contexto laboral` entre la identidad/sesión del trabajador y el launcher de aplicaciones.

`SHELL-APP-004` aporta únicamente el segmento `Turno`.

Las tareas siguientes podrán agregar `Sede`, `Área` y `Rol operativo` sin reabrir esta semántica.

---

#### 17. Composición del segmento

El segmento contiene como máximo:

1. descriptor `Turno`;
2. estado humano;
3. intervalo horario cuando existe turno vigente;
4. `Entrada pendiente` cuando corresponda.

No incluye formularios, selectores ni controles de mutación.

---

#### 18. Sin CTA de asistencia

Esta tarea no crea botón de entrada, salida, PIN, geolocalización, reautenticación ni edición de turno.

`Entrada pendiente` es información, no una acción.

ANIMA y los contratos de asistencia conservan sus responsabilidades.

---

#### 19. Sin enlace obligatorio a ANIMA

El segmento de turno no se convierte automáticamente en enlace a ANIMA.

Mostrar estado no crea una nueva transición entre aplicaciones.

---

#### 20. Separación con SHELL-APP-005 a SHELL-APP-008

Aunque el turno contenga técnicamente `site_id`, `area_id` y `operational_role_code`, esta tarea no los muestra.

Quedan reservados:

```text
SHELL-APP-005 → Sede
SHELL-APP-006 → Área
SHELL-APP-007 → Rol operativo
SHELL-APP-008 → Tareas pendientes transversales
```

---

#### 21. Actor administrativo sin turno

Un empleado con autoridad base puede utilizar SHELL sin turno operativo cuando su autorización no depende de ese carril.

En ese caso se muestra `Sin turno activo` sin bloquear por inferencia las aplicaciones autorizadas por base.

---

#### 22. Actor operativo antes del check-in

Un trabajador con turno vigente pero sin check-in puede tener aplicaciones contextuales visibles cuando `app.access` use `T`.

SHELL muestra `Turno vigente` y `Entrada pendiente` y conserva la visibilidad calculada por `SHELL-APP-003`.

No simula un requisito `T+C` que el permiso de entrada no posee.

---

#### 23. Check-in incompatible

Un check-in incompatible no se presenta como turno activo.

SHELL no intenta reconciliar localmente actor, turno, sede, área o sesión.

Hasta una nueva resolución válida, el segmento muestra `Turno no disponible` cuando la incompatibilidad invalida el contexto del turno.

---

#### 24. Contexto obsoleto

Un snapshot obsoleto no conserva autoridad ni estado visual como si continuara vigente.

Pueden volverlo obsoleto cambios de turno, check-in, checkout, actor, sesión o contrato.

La estrategia física de cache, suscripción o invalidación no se define en esta tarea.

---

#### 25. Render inicial y cliente

El render inicial parte de resolución server-side.

El cliente puede recibir una proyección de presentación reducida, pero no el contexto completo como requisito de UI.

La proyección de presentación no funciona como capability token ni sustituye el guard de las aplicaciones destino.

---

#### 26. Frontera con SafeContextProjectionV1

`SafeContextProjectionV1@1.0.0` conserva su contrato actual.

Esta tarea no añade silenciosamente campos de turno a sus doce campos aprobados.

La futura materialización podrá renderizar desde servidor o construir un view model local reducido a partir de una fuente server-side autorizada.

---

#### 27. View model local permitido

Si se usa un view model dedicado de presentación, su forma conceptual mínima es:

```text
state
starts_at
ends_at
timezone
```

Los campos temporales son nulos cuando el estado no permite exponer un turno confiable.

El view model no contiene identificadores internos, sede, área, rol, empleado, grants, denies ni errores crudos.

---

#### 28. Estado público y errores internos

SHELL no muestra directamente códigos como `SHIFT_OVERLAP`, `NO_ACTIVE_SHIFT`, `CONTRACT_INVALID` o `BACKEND_RESPONSE_INVALID`.

La UI mantiene las cuatro etiquetas humanas definidas por esta tarea y delega cualquier razón pública adicional al catálogo propietario de mensajes.

---

#### 29. Accesibilidad

El estado no depende únicamente de color, opacidad, icono o animación.

Debe existir texto legible que distinga:

```text
Turno activo
Turno vigente
Sin turno activo
Turno no disponible
```

---

#### 30. Revalidación

Cuando SHELL obtiene un nuevo snapshot válido:

1. reemplaza el estado anterior;
2. no mezcla campos de contextos distintos;
3. no conserva horas del turno anterior;
4. elimina `Entrada pendiente` cuando aparece un check-in compatible;
5. elimina `Turno activo` cuando el check-in termina o el turno deja de ser vigente.

---

#### 31. Fail closed de datos mostrados

Si inicio, fin o zona horaria no pueden interpretarse con seguridad, SHELL no inventa un horario parcial.

El segmento pasa a `Turno no disponible` hasta que exista una proyección válida.

---

#### 32. Privacidad

El segmento no expone UUID, datos de otros trabajadores, GPS, sesiones, auditoría interna, fingerprints, stack traces, SQLSTATE ni nombres de tablas.

Solo muestra la información temporal necesaria para que el actor comprenda su propio estado.

---

#### 33. Dispositivo compartido

Si cambia el actor efectivo, SHELL no conserva el turno visual del actor anterior.

La identidad del dispositivo no reemplaza al actor humano ni asigna un turno.

---

#### 34. Simulación

Un turno simulado no se muestra como turno real.

```text
SimulationContext
≠
AccessContext
```

La simulación no modifica etiqueta, intervalo, check-in o visibilidad real del Hub.

---

#### 35. Decisión documental

```text
active_shift válido + check-in compatible
→ Turno activo

active_shift válido + sin check-in
→ Turno vigente / Entrada pendiente

ausencia legítima de active_shift
→ Sin turno activo

invalidez, ambigüedad o fallo de resolución
→ Turno no disponible

Sede visible
→ SHELL-APP-005

Área visible
→ SHELL-APP-006

Rol operativo visible
→ SHELL-APP-007
```

---

#### 36. Handoff a SHELL-APP-005

`SHELL-APP-005` recibe:

1. la región `Contexto laboral`;
2. el segmento `Turno` ya definido;
3. la separación entre ausencia e indisponibilidad;
4. la obligación de usar hechos resueltos en servidor;
5. la prohibición de mostrar `site_id` desde esta tarea;
6. la necesidad de diferenciar sede operativa y sede administrativa.

La siguiente tarea añade el segmento `Sede` sin reabrir la semántica temporal.

---

#### 37. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea especializa la presentación de hechos ya gobernados por los contratos vigentes de contexto, turno, check-in, proyección segura y autorización.

No modifica `AccessContext`, `SafeContextProjectionV1`, permisos, prerrequisitos ni fronteras de seguridad.

---

#### 38. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-SHELL-030` — visibilidad derivada de permisos y contexto sin sustituir autorización;
- `TREQ-SHELL-063` — frontera server/client de contexto y autorización;
- `TREQ-SHELL-067` — resolución de `AccessContext` validada y fail closed;
- `TREQ-SHELL-069` — solo decisiones válidas permiten continuar donde corresponda;
- `TREQ-SHELL-070` — proyección segura de contexto sin ampliar silenciosamente su allowlist;
- `TREQ-SHELL-072` — cliente sin RPC internas ni autoridad propia;
- `TREQ-SHELL-073` — separación de deny, contrato inválido y fallos técnicos;
- `TREQ-SHELL-085` — consumidores cliente sin autoridad legacy;
- `TREQ-SHELL-086` — prohibición de autoridad local por rol, turno, check-in o booleanos legacy.

La semántica de turno y check-in permanece gobernada además por sus contratos AUTH propietarios.

Esta sección es trazabilidad heredada y no actualiza 04A.

---

#### 39. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado ni sometido a la batería documental del checkout local de `SHELL-APP-004`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía format, quality, delivery, package readiness ni batería global sobre la rama local de la tarea. |
| REMOTA | PASS | Se verificaron `main` posterior al cierre de `SHELL-APP-003`, continuidad, topología `PER_IMPLEMENTATION_UNIT`, protocolo, contrato de entrega, políticas documentales, owner H2, `AccessContext`, `ActiveShiftContext`, check-in, prerrequisitos `T`/`T+C`, zona horaria y cobertura 04A SHELL vigente. |
| OPERATIVA | NOT_APPLICABLE | La tarea define presentación documental y no prueba turnos, check-ins o usuarios reales ni la experiencia desplegada. |
| FÍSICA | NOT_APPLICABLE | La tarea documental no crea ni autoriza `SHELL-APP-004::implementation_unit_id` y no modifica runtime, infraestructura, datos ni despliegues. |

---

#### 40. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-004 — Mostrar turno activo`.
- [ ] `SHELL-APP-003` permanece como tarea anterior.
- [ ] `SHELL-APP-005` permanece como siguiente tarea.
- [ ] La tarea permanece exclusivamente documental.
- [ ] Se conserva `PER_IMPLEMENTATION_UNIT` como topología futura sin crear instancia física.
- [ ] `AccessContext` continúa como fuente conceptual server-side.
- [ ] `active_shift` puede existir sin `active_checkin_session`.
- [ ] `Turno activo` exige turno vigente y check-in activo compatible.
- [ ] Un turno vigente sin check-in se muestra como `Turno vigente` y `Entrada pendiente`.
- [ ] La ausencia legítima se muestra como `Sin turno activo`.
- [ ] Invalidez o ambigüedad se muestran como `Turno no disponible`.
- [ ] Ausencia e indisponibilidad no se confunden.
- [ ] Un turno futuro no se muestra como actual.
- [ ] Un turno finalizado no permanece por caché.
- [ ] Un turno ambiguo no se resuelve por heurística.
- [ ] Solo se muestran estado e información temporal autorizada.
- [ ] No se muestran sede, área ni rol operativo.
- [ ] La zona horaria procede de una fuente autoritativa.
- [ ] El reloj cliente no crea autoridad.
- [ ] El cruce de medianoche no divide el turno.
- [ ] Existe un único segmento transversal `Turno`.
- [ ] No se crea CTA de check-in o checkout.
- [ ] No se crea enlace obligatorio a ANIMA.
- [ ] Un actor administrativo sin turno conserva autoridad base independiente.
- [ ] La visibilidad antes del check-in permanece coherente con `SHELL-APP-003`.
- [ ] Un check-in incompatible no se presenta como turno activo.
- [ ] Un contexto obsoleto no conserva autoridad.
- [ ] El render inicial utiliza resolución server-side.
- [ ] `SafeContextProjectionV1` no se modifica silenciosamente.
- [ ] El view model de presentación no funciona como capability token.
- [ ] El estado tiene texto accesible y no depende solo de color.
- [ ] Datos temporales inválidos no producen horario inventado.
- [ ] Un actor nuevo no hereda el turno visual del actor anterior.
- [ ] La simulación no se presenta como contexto real.
- [ ] No se desarrollan sede, área, rol operativo ni pendientes.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se modifica código ni Supabase.
- [ ] No se autoriza implementación física.

---

#### 41. Límites

Esta tarea no:

- modifica `AccessContextV1`, `ActiveShiftContext`, `ActiveCheckinContext` o `SafeContextProjectionV1`;
- crea contratos compartidos, permisos, grants, denies o prerrequisitos;
- crea, edita, publica, cancela o retira turnos;
- crea, cierra o corrige check-ins;
- selecciona sede o área;
- cambia rol operativo;
- modifica dispositivos o simulaciones;
- define sede, área, rol operativo o tareas pendientes visibles;
- crea navegación, CTA de asistencia o enlace obligatorio a ANIMA;
- define layout responsive final, colores, iconos o animaciones;
- define TTL, cache, Realtime o estrategia de invalidación;
- modifica middleware, Server Actions, RLS, RPC, Auth o datos;
- crea migraciones o despliega;
- crea `implementation_unit_id`;
- autoriza una instancia física;
- crea o modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba;
- desarrolla `SHELL-APP-005`.

---

#### 42. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-003 — Definir aplicaciones visibles por contexto`

**TAREA ACTUAL APROBADA**
`SHELL-APP-004 — Mostrar turno activo`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-005 — Mostrar sede activa`


### ✅ SHELL-APP-005 — Mostrar sede activa

**Estado:** APROBADA
**Tarea anterior:** SHELL-APP-004 — Mostrar turno activo
**Tarea siguiente:** SHELL-APP-006 — Mostrar área activa
**Tipo de tarea:** definición técnico-documental de la presentación de sede dentro del contexto laboral de SHELL, separando sede administrativa y sede operativa sin crear una sede actual genérica ni convertir preferencias de navegación en autoridad; el contrato se define una sola vez y su futura materialización conserva topología `PER_IMPLEMENTATION_UNIT`
**Bloque:** BLOQUE H2 — SHELL como aplicación
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H2_SHELL_APP/02_CONTEXTO_Y_TRABAJO_PENDIENTE.md`
**Estado físico resultante:** contrato de presentación de sede definido documentalmente y no materializado; no existe instancia física creada o autorizada por esta tarea
**Cambios físicos autorizados:** ninguno.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo SHELL muestra la sede relevante dentro de la región `Contexto laboral` sin introducir una propiedad genérica llamada `sede actual`.

La presentación debe conservar la separación canónica entre:

- sede administrativa;
- sede operativa;
- cobertura administrativa;
- sede seleccionada como preferencia;
- sede primaria como referencia;
- sede del recurso como territorio de autorización.

La tarea no modifica cómo se resuelven esas identidades.

Únicamente define cómo se proyectan de forma comprensible y segura en el Hub.

---

#### 2. Handoff recibido de `SHELL-APP-004`

Se conserva sin reapertura:

1. existe una región transversal `Contexto laboral`;
2. el segmento `Turno` ya está definido;
3. ausencia e indisponibilidad son estados diferentes;
4. los hechos visibles deben proceder de resolución server-side;
5. `SHELL-APP-004` no muestra `site_id`;
6. la sede operativa y la sede administrativa deben permanecer diferenciadas;
7. un turno vigente puede existir antes del check-in;
8. el cliente no reconstruye autoridad desde estado local;
9. `SafeContextProjectionV1` no se amplía silenciosamente.

`SHELL-APP-005` agrega únicamente el segmento `Sede`.

---

#### 3. Modelo territorial consumido

La tarea consume la separación aprobada por `AUTH-MOD-007`:

```text
SEDE ASIGNADA
≠
SEDE PRIMARIA
≠
SEDE SELECCIONADA
≠
SEDE ADMINISTRATIVA
≠
SEDE OPERATIVA
≠
SEDE DEL RECURSO
```

La UI no fusiona estas identidades para simplificar el modelo.

---

#### 4. Propiedad de cada concepto

| Concepto | Fuente o función canónica | Uso en `SHELL-APP-005` |
| --- | --- | --- |
| sede asignada | relación laboral validada en `employee_sites` | cobertura y elegibilidad; no se muestra como sede activa por existir |
| sede primaria | `employee_sites.is_primary` | referencia administrativa; nunca autoridad operativa |
| sede seleccionada | preferencia de interfaz validable | entrada posible a la resolución administrativa; nunca autoridad |
| sede administrativa | contexto de navegación administrativa resuelto | puede mostrarse como sede administrativa específica |
| sede operativa | `operational_site` derivada del turno válido | se muestra como sede operativa |
| sede del recurso | territorio real del recurso | no pertenece al segmento de contexto del Hub |

---

#### 5. Regla principal de presentación

SHELL no muestra una etiqueta ambigua:

```text
Sede actual
```

La presentación utiliza etiquetas semánticas:

```text
Sede operativa
Sede administrativa
```

cuando ambos canales deban distinguirse.

La interfaz puede compactar visualmente la información, pero no eliminar la diferencia conceptual.

---

#### 6. Fuente de la sede operativa

La sede operativa visible procede de:

```text
AccessContext.operational_site
```

y esa sede procede del turno válido.

Cadena:

```text
turno publicado y vigente
→ active_shift
→ operational_site
→ sede operativa visible
```

La UI no consulta directamente `employee_shifts` para reconstruirla.

---

#### 7. Forma contractual consumida para sede operativa

La tarea consume la forma vigente:

```text
OperationalSiteContext
site_id
source_shift_id
site_active
assignment_valid
```

El `site_id` identifica el hecho territorial.

No es el texto que debe mostrarse al trabajador.

---

#### 8. Sede operativa antes del check-in

La sede operativa puede existir con:

```text
active_shift != null
active_checkin_session = null
```

porque el turno vigente ya determina su sede.

Por tanto:

```text
Turno vigente
+
sin check-in
+
operational_site válido
→ mostrar Sede operativa
```

El check-in no crea la sede.

---

#### 9. Check-in como evidencia

Un check-in compatible puede confirmar el turno.

No puede:

- cambiar la sede del turno;
- reemplazar `operational_site`;
- convertir otra sede en operativa;
- autorizar un fallback territorial.

La sede del check-in no se presenta como fuente independiente.

---

#### 10. Sin turno válido

Sin turno válido:

```text
operational_site = null
```

y no existe sede operativa.

El segmento no utiliza como reemplazo:

- sede seleccionada;
- sede primaria;
- primera sede asignada;
- última sede operativa;
- sede del check-in histórico;
- sede del dispositivo.

Estado humano:

```text
Sin sede operativa
```

cuando la ausencia sea legítima.

---

#### 11. Sede operativa no disponible

Cuando el contexto operativo es inválido, ambiguo o no resoluble, SHELL no afirma una ausencia legítima.

Estado humano:

```text
Sede operativa no disponible
```

Aplica, entre otros, cuando la resolución canónica no puede confiar en la sede por:

- turno ambiguo;
- sede inactiva;
- asignación inválida cuando sea obligatoria;
- incompatibilidad estructural;
- contrato inválido;
- respuesta backend no válida;
- contexto obsoleto pendiente de nueva resolución.

La UI no elige otra sede por conveniencia.

---

#### 12. Fuente de la sede administrativa

La sede administrativa visible procede de una resolución server-side compatible con `AdministrativeSiteContext`.

La precedencia aprobada es:

```text
requested_site
→ validar
→ selected_site
→ primary_site
→ sin sede específica
```

Cada candidato debe ser validado antes de convertirse en contexto administrativo.

---

#### 13. Sede seleccionada

`selected_site_id` es una preferencia de interfaz.

Puede participar en la resolución administrativa solo después de demostrar que la sede:

- existe;
- está activa;
- es navegable;
- pertenece a la cobertura permitida;
- no es un punto físico de check-in o checkout;
- no es un entorno aislado;
- es compatible con la superficie solicitada.

Una selección inválida se ignora o corrige según el contrato propietario.

Nunca cambia `operational_site`.

---

#### 14. Sede primaria

La sede primaria puede servir como fallback de presentación administrativa cuando la resolución administrativa lo permita.

No sirve como:

- fallback operativo;
- autorización;
- sustituto del turno;
- sustituto de la sede del recurso.

Si existe turno válido en otra sede:

```text
sede primaria ≠ sede operativa
```

es un estado legítimo.

---

#### 15. Cobertura administrativa no equivale a sede activa

`AccessContext.administrative_coverage` describe cobertura.

No identifica por sí sola una sede administrativa específica.

Queda prohibido:

```text
administrative_coverage.site_ids[0]
→ asumir sede administrativa activa
```

Una lista de sedes es cobertura.

No es selección.

---

#### 16. Modos de cobertura administrativa

La cobertura canónica puede declarar:

```text
NONE
ASSIGNED_SITES
SPECIFIC_SITE
ASSIGNED_AREAS
SPECIFIC_AREA
ORGANIZATION
```

`SHELL-APP-005` no transforma un modo amplio en una sede inventada.

Cuando no existe una sede administrativa específica resuelta, la presentación expresa el alcance sin fabricar un nombre de sede.

---

#### 17. Presentación administrativa específica

Cuando el contexto administrativo resuelve una sede concreta y válida, el segmento muestra:

```text
Sede administrativa
<nombre humano de la sede>
```

La etiqueta no implica que esa sede sea operativa.

---

#### 18. Cobertura de varias sedes sin sede específica

Cuando el actor tiene cobertura válida sobre varias sedes pero ninguna sede administrativa específica está activa, la interfaz no escoge una por orden de lista.

Presentación:

```text
Sede administrativa
Sin sede específica
Cobertura: varias sedes
```

La línea de cobertura es informativa.

No concede alcance adicional.

---

#### 19. Cobertura organizacional

Cuando la cobertura administrativa canónica es `ORGANIZATION` y no existe una sede administrativa específica, la interfaz muestra:

```text
Sede administrativa
Sin sede específica
Cobertura: organización
```

No utiliza:

```text
Todas las sedes
```

como sustituto de una sede activa.

La cobertura organizacional procede de autoridad explícita y no de `null`.

---

#### 20. Sin cobertura administrativa

Cuando el contexto administrativo válido no contiene cobertura territorial laboral:

```text
administrative_coverage.mode = NONE
```

y no existe sede específica, el segmento puede mostrar:

```text
Sin sede administrativa
```

Esto no implica automáticamente ausencia de sede operativa.

Los carriles permanecen separados.

---

#### 21. Sede administrativa no disponible

Si el contexto administrativo debería ser resoluble pero presenta una inconsistencia o fallo técnico, la UI muestra:

```text
Sede administrativa no disponible
```

No utiliza la sede operativa para ocultar el fallo administrativo.

Tampoco usa una sede primaria o seleccionada sin validar.

---

#### 22. Contexto híbrido

Es canónicamente válido:

```text
AdministrativeActiveSite
≠
OperationalActiveSite
```

Por tanto, SHELL debe poder mostrar simultáneamente:

```text
Sede operativa
Vento Café

Sede administrativa
Centro de Producción
```

sin declarar conflicto por el simple hecho de ser diferentes.

---

#### 23. Ambas sedes iguales

Cuando ambos canales resuelven la misma identidad de sede, la UI puede evitar repetir visualmente el mismo nombre.

Ejemplo conceptual:

```text
Sede
Vento Café
Operativa · Administrativa
```

La compactación visual no fusiona los contratos.

Internamente siguen existiendo dos procedencias semánticas.

---

#### 24. Solo sede operativa

Puede existir:

```text
operational_site válido
+
sin sede administrativa específica
```

SHELL muestra la sede operativa y, cuando sea útil para comprender el contexto, el estado administrativo separado.

No crea una sede administrativa a partir del turno.

---

#### 25. Solo sede administrativa

Puede existir:

```text
sede administrativa válida
+
sin turno vigente
+
sin operational_site
```

SHELL muestra la sede administrativa.

La ausencia de turno no elimina el carril base ni su contexto de navegación.

---

#### 26. Ninguna sede específica

Cuando no existe sede operativa ni sede administrativa específica y ambos estados son legítimos, el segmento no inventa una sede.

Puede presentar:

```text
Sin sede operativa
Sin sede administrativa
```

o una variante visual compacta que conserve ambas conclusiones.

`null` nunca significa todas las sedes.

---

#### 27. Catálogo humano de sedes

La identidad visual de una sede debe resolverse contra el catálogo canónico `public.sites`.

La presentación usa un nombre humano validado por servidor.

No muestra como etiqueta primaria:

- UUID;
- `site_id`;
- claves internas;
- referencias de turno;
- identificadores de asignación.

El código de sede puede utilizarse técnicamente en la proyección, pero no sustituye un nombre humano cuando la interfaz dispone del descriptor canónico.

---

#### 28. Tipos de sede no laborales

No todo registro de `public.sites` representa una sede laboral navegable.

Un:

- punto de check-in;
- punto de checkout;
- espacio técnico;
- entorno aislado;

no se presenta como sede administrativa laboral por el solo hecho de existir en el catálogo.

La resolución server-side debe entregar una identidad compatible con el uso mostrado.

---

#### 29. Prohibición de `employees.site_id`

`employees.site_id` permanece como campo legacy para este modelo.

SHELL no lo usa para:

- sede administrativa;
- sede operativa;
- fallback;
- nombre visible;
- autorización.

La UI no recupera semántica antigua desde ese campo.

---

#### 30. Multisede

Varias sedes asignadas significan cobertura laboral múltiple.

No significan:

- sede activa múltiple;
- autoridad global;
- selección automática;
- permiso sobre todos los recursos.

El segmento no enumera todas las sedes asignadas como reemplazo de la sede activa.

---

#### 31. Relación con el segmento `Turno`

El segmento `Turno` definido en `SHELL-APP-004` y el segmento `Sede` deben ser coherentes.

Cuando:

```text
Turno vigente
```

la sede operativa derivada del mismo snapshot puede mostrarse incluso antes del check-in.

Cuando:

```text
Sin turno activo
```

no debe existir una sede operativa residual proveniente de un turno anterior.

Cuando:

```text
Turno no disponible
```

SHELL no inventa una sede operativa para compensar la indisponibilidad.

---

#### 32. Snapshot único

Turno, sede operativa y demás hechos operativos visibles deben proceder del mismo `AccessContext` o de una proyección derivada del mismo snapshot.

Queda prohibido mezclar:

```text
turno del contexto A
+
sede operativa del contexto B
```

La interfaz sustituye el conjunto cuando recibe una resolución nueva.

---

#### 33. Actor administrativo sin turno

Un actor laboral con carril base válido puede tener:

```text
sede administrativa válida
+
operational_site = null
```

El Hub puede seguir mostrando su sede administrativa y las aplicaciones autorizadas por base.

La ausencia de sede operativa no bloquea por inferencia la navegación administrativa.

---

#### 34. Trabajador operativo antes del check-in

Un trabajador con turno vigente puede tener:

```text
Turno vigente
Entrada pendiente
Sede operativa válida
```

El segmento `Sede` no oculta la sede hasta que ocurra check-in.

Esto conserva la semántica de los permisos de entrada con prerrequisito `T`.

---

#### 35. Cambio de turno

Cuando cambia el turno resuelto, cambia también la autoridad de la sede operativa.

SHELL no conserva la sede anterior por:

- estado React;
- caché local;
- pestaña abierta;
- último payload;
- navegación previa.

Una nueva realidad requiere una nueva resolución.

---

#### 36. Cambio de sede administrativa

Un cambio de preferencia administrativa no modifica:

- turno;
- sede operativa;
- check-in;
- rol operativo;
- área operativa;
- permiso ya evaluado sobre otro recurso.

El servidor valida la nueva intención administrativa antes de proyectarla.

---

#### 37. Sin selector dentro de esta tarea

`SHELL-APP-005` no crea:

- selector de sede;
- dropdown;
- búsqueda;
- CTA `Cambiar sede`;
- persistencia de preferencia;
- mutación de `selected_site_id`.

La tarea define qué mostrar.

No define cómo cambiar el contexto administrativo.

---

#### 38. Sin navegación implícita

El nombre de la sede no se convierte automáticamente en enlace o botón.

Mostrar una sede no crea una transición de navegación.

Una futura interacción deberá respetar su superficie propietaria y autorización correspondiente.

---

#### 39. Separación frente a `SHELL-APP-006`

Aunque el contexto incluya `operational_area`, `SHELL-APP-005` no muestra:

- área operativa;
- área administrativa;
- área primaria;
- tipo de área.

El siguiente segmento pertenece a:

```text
SHELL-APP-006 — Mostrar área activa
```

---

#### 40. Separación frente a `SHELL-APP-007`

Aunque `active_shift` y `operational_role` estén relacionados con la sede, esta tarea no muestra el rol operativo.

Esa responsabilidad pertenece a:

```text
SHELL-APP-007 — Mostrar rol operativo activo
```

---

#### 41. Frontera server/client

La decisión sobre qué identidad territorial es válida se resuelve en servidor.

El cliente puede recibir un view model reducido para presentar:

- canal;
- estado;
- nombre humano;
- alcance administrativo resumido cuando corresponda.

El cliente no evalúa asignaciones, turnos, cobertura ni permisos.

---

#### 42. Frontera con `SafeContextProjectionV1`

`SafeContextProjectionV1@1.0.0` conserva su allowlist vigente.

Esta tarea no agrega silenciosamente:

- nombre de sede;
- listas completas de sedes;
- asignaciones;
- selected site;
- primary site;
- metadatos territoriales.

La futura materialización puede producir un view model de presentación desde servidor sin cambiar el contrato compartido.

---

#### 43. View model de presentación

Una materialización futura puede usar una forma local equivalente a:

```text
operational
  state
  display_name

administrative
  state
  display_name
  coverage_label

relationship
```

`relationship` sirve solo para compactación visual y puede expresar conceptualmente:

```text
SAME
DIFFERENT
SINGLE_CHANNEL
NONE
```

No es un estado de autorización ni se incorpora al contrato compartido.

---

#### 44. Estados de presentación operativa

El canal operativo distingue al menos:

| Hecho resuelto | Presentación |
| --- | --- |
| `operational_site` válido | nombre humano de `Sede operativa` |
| ausencia legítima por falta de turno válido | `Sin sede operativa` |
| invalidez, ambigüedad o fallo de resolución | `Sede operativa no disponible` |

La ausencia no se confunde con error.

---

#### 45. Estados de presentación administrativa

El canal administrativo distingue al menos:

| Hecho resuelto | Presentación |
| --- | --- |
| sede administrativa específica válida | nombre humano de `Sede administrativa` |
| cobertura multisede sin sede específica | `Sin sede específica` + `Cobertura: varias sedes` |
| cobertura organizacional sin sede específica | `Sin sede específica` + `Cobertura: organización` |
| ausencia legítima de contexto administrativo | `Sin sede administrativa` |
| invalidez o fallo de resolución | `Sede administrativa no disponible` |

Estas frases son estados humanos de presentación.

No crean nuevos códigos de autorización.

---

#### 46. Fail closed de presentación

Si el servidor no puede asociar de manera confiable el identificador de sede con un descriptor canónico compatible, SHELL no muestra un nombre posiblemente incorrecto.

Resultado:

```text
Sede operativa no disponible
```

o:

```text
Sede administrativa no disponible
```

según el canal afectado.

No se reutiliza el último nombre conocido como autoridad.

---

#### 47. Privacidad y minimización

El segmento no expone:

- `site_id`;
- `source_shift_id`;
- listas completas de `site_ids`;
- IDs de asignación;
- identidad de otros trabajadores;
- structural issues completos;
- metadata de resolución;
- fingerprints;
- SQLSTATE;
- errores crudos.

Solo muestra el descriptor territorial y el estado necesarios para comprender el contexto.

---

#### 48. Accesibilidad

La diferencia entre sede operativa y administrativa no depende únicamente de:

- color;
- posición;
- icono;
- tipografía.

Debe existir texto o semántica accesible que permita distinguir ambos canales.

Cuando se compacten porque coinciden, la interfaz conserva la indicación de que la misma sede cumple ambos papeles.

---

#### 49. Dispositivo compartido

Cuando cambia el actor efectivo:

- se descarta la sede visible del actor anterior;
- no se hereda selected site del actor anterior como autoridad;
- no se conserva operational site de la sesión anterior;
- el dispositivo no aporta una sede empresarial propia al trabajador.

La nueva presentación requiere contexto del actor nuevo.

---

#### 50. Simulación

Una sede simulada no se muestra como sede real del Hub.

```text
SimulationContext
≠
AccessContext
```

La simulación no cambia:

- sede administrativa real;
- sede operativa real;
- selected site real;
- cobertura real.

---

#### 51. Decisión documental consolidada

```text
SEDE OPERATIVA
→ AccessContext.operational_site
→ deriva del turno válido

SEDE ADMINISTRATIVA
→ AdministrativeSiteContext resuelto en servidor
→ requested validado / selected validada / primaria / sin sede específica

ADMINISTRATIVE COVERAGE
→ cobertura
→ no equivale a sede específica

SEDE SELECCIONADA
→ preferencia
→ no autoridad

SEDE PRIMARIA
→ referencia administrativa
→ no fallback operativo

CHECK-IN
→ evidencia
→ no fuente de sede

AMBOS CANALES DIFERENTES
→ mostrar ambos claramente

AMBOS CANALES IGUALES
→ puede compactarse el nombre
→ conservar significado doble
```

---

#### 52. Handoff a `SHELL-APP-006`

La siguiente tarea recibe:

1. la región `Contexto laboral`;
2. el segmento `Turno` aprobado;
3. el segmento `Sede` con canales administrativo y operativo separados;
4. la regla de que la sede operativa procede del turno;
5. la regla de que la sede seleccionada no crea autoridad;
6. la regla de no inferir una sede específica desde cobertura multisede;
7. la obligación de usar el mismo snapshot para hechos operativos;
8. la prohibición de mostrar identificadores internos;
9. la necesidad de mantener área administrativa y área operativa conceptualmente separadas.

`SHELL-APP-006` añadirá el segmento `Área` sin reabrir la semántica territorial de sede.

---

#### 53. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea especializa la presentación de hechos territoriales ya gobernados por los contratos vigentes de contexto, cobertura administrativa, turno, sede operativa, proyección segura y autorización.

No modifica `AccessContext`, `OperationalSiteContext`, `AdministrativeCoverageContext`, `SafeContextProjectionV1`, permisos, prerrequisitos ni fronteras de seguridad.

---

#### 54. Cobertura de prueba vigente reutilizada

Sin modificar el Registro Canónico de Requisitos de Prueba, esta tarea reutiliza:

- `TREQ-SHELL-030` — visibilidad derivada de permisos y contexto sin sustituir autorización;
- `TREQ-SHELL-063` — frontera server/client de contexto y autorización;
- `TREQ-SHELL-067` — resolución de `AccessContext` validada y fail closed;
- `TREQ-SHELL-069` — solo decisiones válidas permiten continuar donde corresponda;
- `TREQ-SHELL-070` — proyección segura de contexto sin ampliar silenciosamente su allowlist;
- `TREQ-SHELL-072` — cliente sin RPC internas ni autoridad propia;
- `TREQ-SHELL-073` — separación entre denegación, contrato inválido y fallos técnicos;
- `TREQ-SHELL-085` — consumidores cliente sin autoridad legacy;
- `TREQ-SHELL-086` — prohibición de autoridad local basada en rol, sede, turno, check-in o booleanos legacy.

La semántica territorial permanece gobernada además por `AUTH-MOD-007` y los contratos AUTH-CTX propietarios.

Esta sección es trazabilidad heredada y no actualiza 04A.

---

#### 55. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado ni sometido a la batería documental del checkout local de `SHELL-APP-005`. |
| LOCAL | NOT_EXECUTED | No se han ejecutado todavía format, quality, delivery, package readiness ni la batería global sobre la rama local de la tarea. |
| REMOTA | PASS | Se verificaron `main` posterior al cierre de `SHELL-APP-004`, continuidad H2, owner vigente, topología `PER_IMPLEMENTATION_UNIT`, protocolo, contrato de entrega, políticas documentales, `AUTH-MOD-007`, `AccessContextV1`, `AdministrativeCoverageContext`, `OperationalSiteContext`, `SafeContextProjectionV1`, familia 04A SHELL y scripts documentales vigentes. |
| OPERATIVA | NOT_APPLICABLE | La tarea define presentación documental y no prueba sedes, turnos, preferencias o usuarios reales ni una experiencia desplegada. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea ni autoriza una instancia física de `SHELL-APP-005` y no modifica runtime, infraestructura, datos ni despliegues. |

---

#### 56. Criterios de aceptación

- [ ] El título es exactamente `SHELL-APP-005 — Mostrar sede activa`.
- [ ] `SHELL-APP-004` permanece como tarea anterior.
- [ ] `SHELL-APP-006` permanece como siguiente tarea.
- [ ] La tarea permanece exclusivamente documental.
- [ ] La topología futura permanece `PER_IMPLEMENTATION_UNIT` sin crear instancia física.
- [ ] No existe una propiedad visual ambigua llamada `sede actual` como autoridad.
- [ ] Se distinguen sede administrativa y sede operativa.
- [ ] La sede operativa procede de `AccessContext.operational_site`.
- [ ] La sede operativa deriva del turno válido.
- [ ] La sede operativa puede mostrarse antes del check-in.
- [ ] Check-in no cambia ni crea la sede operativa.
- [ ] Sin turno válido no existe fallback operativo.
- [ ] Sede seleccionada no se usa como autoridad operativa.
- [ ] Sede primaria no se usa como autoridad operativa.
- [ ] Primera sede asignada no se usa como autoridad operativa.
- [ ] `employees.site_id` no se usa como fuente.
- [ ] La sede administrativa procede de resolución server-side.
- [ ] `selected_site` solo participa después de validación.
- [ ] La primaria puede servir de referencia administrativa según el contrato aprobado.
- [ ] Cobertura administrativa no se interpreta como sede específica.
- [ ] Una lista de sedes no se reduce al primer elemento.
- [ ] `ORGANIZATION` no se obtiene de `null`.
- [ ] Un contexto multisede sin sede específica no fabrica un nombre de sede.
- [ ] Sede administrativa y operativa diferentes pueden coexistir.
- [ ] Cuando coinciden pueden compactarse sin fusionar significados.
- [ ] Un actor administrativo sin turno puede conservar contexto administrativo.
- [ ] Un trabajador con turno vigente sin check-in puede mostrar sede operativa.
- [ ] El segmento `Turno` y la sede operativa proceden de snapshot coherente.
- [ ] Un contexto operativo no disponible no se rellena con sede administrativa.
- [ ] Un contexto administrativo no disponible no se rellena con sede operativa.
- [ ] El descriptor humano se resuelve contra el catálogo canónico de sedes.
- [ ] No se muestra `site_id` como etiqueta al trabajador.
- [ ] Puntos técnicos, de check-in, checkout o entornos aislados no se presentan como sede laboral por existencia.
- [ ] El segmento no crea selector ni CTA para cambiar sede.
- [ ] Mostrar sede no crea navegación implícita.
- [ ] No se desarrolla el área visible.
- [ ] No se desarrolla el rol operativo visible.
- [ ] El cliente no evalúa cobertura, turno o asignaciones.
- [ ] `SafeContextProjectionV1` no se amplía silenciosamente.
- [ ] El view model de presentación no funciona como capability token.
- [ ] Ausencia e indisponibilidad se distinguen por canal.
- [ ] Un contexto obsoleto no conserva la sede anterior como autoridad.
- [ ] Un actor nuevo no hereda la sede visual del actor anterior.
- [ ] Una simulación no se presenta como sede real.
- [ ] No se crean requisitos de prueba.
- [ ] No se modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se modifica código ni Supabase.
- [ ] No se autoriza implementación física.

---

#### 57. Límites

Esta tarea no:

- modifica `AccessContextV1`;
- modifica `AdministrativeCoverageContext`;
- modifica `OperationalSiteContext`;
- modifica `SafeContextProjectionV1`;
- crea un nuevo contrato compartido;
- modifica `public.sites`;
- modifica `employee_sites`;
- modifica `employee_settings`;
- modifica `employee_shifts`;
- modifica selected site;
- modifica sede primaria;
- modifica asignaciones;
- modifica cobertura administrativa;
- modifica turnos;
- modifica check-ins;
- modifica permisos;
- modifica grants o denies;
- modifica prerrequisitos;
- cambia la sede del recurso;
- crea selector de sede;
- crea CTA para cambiar sede;
- persiste preferencias;
- crea navegación;
- muestra áreas;
- muestra roles operativos;
- muestra tareas pendientes;
- define layout responsive final;
- define colores;
- define iconos;
- define animaciones;
- define estrategia de cache;
- define TTL;
- implementa Realtime;
- modifica middleware;
- modifica Server Actions;
- modifica RLS;
- modifica RPC;
- modifica Auth;
- modifica datos;
- crea migraciones;
- despliega;
- crea o autoriza una instancia física;
- crea requisitos de prueba;
- modifica requisitos de prueba;
- modifica el Registro Canónico de Requisitos de Prueba;
- desarrolla `SHELL-APP-006`.

---

#### 58. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-APP-004 — Mostrar turno activo`

**TAREA ACTUAL APROBADA**
`SHELL-APP-005 — Mostrar sede activa`

**SIGUIENTE TAREA RESERVADA**
`SHELL-APP-006 — Mostrar área activa`


### [ ] SHELL-APP-006 — Mostrar área activa
### [ ] SHELL-APP-007 — Mostrar rol operativo activo
### [ ] SHELL-APP-008 — Mostrar tareas pendientes transversales
