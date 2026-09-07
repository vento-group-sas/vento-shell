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


### [ ] SHELL-APP-005 — Mostrar sede activa
### [ ] SHELL-APP-006 — Mostrar área activa
### [ ] SHELL-APP-007 — Mostrar rol operativo activo
### [ ] SHELL-APP-008 — Mostrar tareas pendientes transversales
