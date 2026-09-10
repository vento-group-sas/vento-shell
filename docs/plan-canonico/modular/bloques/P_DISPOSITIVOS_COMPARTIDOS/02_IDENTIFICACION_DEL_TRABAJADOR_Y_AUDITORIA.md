### MINI-BLOQUE — IDENTIFICACION DEL TRABAJADOR Y AUDITORÍA

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **identificacion del trabajador y auditoría** dentro de **P DISPOSITIVOS COMPARTIDOS**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AUTH-DEV-007` a `AUTH-DEV-010` — 4 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `AUTH-DEV-007`: Exigir firma o PIN del trabajador
- `AUTH-DEV-008`: Combinar límite del dispositivo y trabajador
- `AUTH-DEV-009`: Evitar heredar permisos administrativos
- `AUTH-DEV-010`: Registrar dispositivo y trabajador en auditoría
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-DEV-007 — Exigir firma o PIN del trabajador

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-006 — Asignar permisos máximos del dispositivo
**Tarea siguiente:** AUTH-DEV-008 — Combinar límite del dispositivo y trabajador
**Tipo de tarea:** documental; contrato canónico de identificación humana y firma ligera en dispositivo compartido, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/02_IDENTIFICACION_DEL_TRABAJADOR_Y_AUDITORIA.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo un dispositivo compartido identifica al trabajador humano real mediante una firma, PIN o mecanismo ligero aprobado antes de atribuirle una sesión de actor o una acción que exija firma individual, sin convertir la credencial técnica del dispositivo, el secreto presentado, la interfaz ni la firma resultante en autoridad empresarial.

La tarea cierra exclusivamente el mecanismo operativo de identificación y firma humana. No combina todavía permisos del trabajador con el techo del dispositivo, no define duración de sesiones, no gobierna revocación o cambio de actor y no materializa almacenamiento, hashing, límites de intentos, bloqueo o rotación.

```text
DISPOSITIVO TECNICO AUTENTICADO
+
PRUEBA HUMANA LIGERA VALIDADA EN SERVIDOR
+
EMPLEADO HUMANO RESUELTO
+
EVIDENCIA DE SESION O FIRMA CORRELACIONABLE
=
ACTOR HUMANO IDENTIFICABLE
```

Pero:

```text
ACTOR HUMANO IDENTIFICABLE
!=
ACCION AUTORIZADA
```

---

#### 2. Decisiones y contratos preservados

`AUTH-DEV-007` conserva sin modificación las siguientes decisiones precedentes:

- el dispositivo compartido es un principal técnico y nunca un empleado ficticio;
- la identidad técnica del dispositivo no posee rol base, rol operativo ni permisos empresariales propios;
- el actor efectivo de una operación laboral desde dispositivo compartido es un empleado humano;
- la fuente autoritativa del actor de dispositivo es una sesión válida asociada al dispositivo y al empleado;
- una sesión de actor no es una sesión Auth personal, check-in, turno, rol, permiso, delegación ni simulación;
- solo puede existir un actor efectivo válido por dispositivo en un instante;
- la instancia efectiva del dispositivo solo puede restringir su plantilla y nunca ampliarla;
- las aplicaciones visibles y el paquete de capacidades del dispositivo son límites, no concesiones;
- el territorio del dispositivo restringe el territorio del actor mediante intersección y nunca mediante unión;
- un PIN, QR o mecanismo ligero puede localizar al trabajador, iniciar una sesión o confirmar presencia, pero no puede convertirse en permiso, rol, check-in ni reautenticación fuerte;
- un dispositivo activo sin actor humano válido permanece en modo técnico y no puede ejecutar acciones empresariales.

La tarea consume el techo aprobado por `AUTH-DEV-006`, pero no lo vuelve a calcular ni lo combina con la autoridad del trabajador. Esa combinación pertenece a `AUTH-DEV-008`.

---

#### 3. Resultado canónico

La identificación humana desde dispositivo compartido queda regida por estas reglas:

1. el principal autenticado continúa siendo el dispositivo técnico;
2. el trabajador nunca se infiere desde el usuario técnico, `navigation_role`, último actor, último PIN, sede, área, turno o estado de interfaz;
3. la prueba humana se valida en servidor;
4. el servidor resuelve el empleado real asociado con la prueba y no confía en un `employee_id` elegido por el cliente;
5. una prueba válida puede habilitar la creación de una sesión de actor cuando el contrato de sesión lo permita;
6. una acción que exija firma individual requiere una evidencia específica vinculada al trabajador y a la operación antes de ejecutar el comando protegido;
7. la prueba humana y la firma resultante no conceden permiso, no amplían el techo del dispositivo y no satisfacen reautenticación fuerte;
8. el secreto crudo no forma parte de `DeviceContext`, `AccessContext`, logs, métricas, mensajes, receipts ni evidencia persistente;
9. la evidencia persistible es una referencia opaca producida por servidor, nunca el PIN ni una copia reversible del secreto;
10. el resultado debe permitir a las tareas posteriores combinar actor, dispositivo, contexto y autoridad sin ambigüedad.

---

#### 4. Semántica de firma y PIN

Dentro de esta tarea se distinguen tres conceptos:

| Concepto | Significado | Efecto autorizado |
| --- | --- | --- |
| PIN o mecanismo ligero | secreto o prueba presentada por el trabajador para demostrar presencia e identidad frente al dispositivo | solicitar validación del humano real; no concede autoridad |
| sesión de actor | vínculo temporal autoritativo entre dispositivo y empleado humano | identificar al actor efectivo mientras la sesión permanezca válida; no concede por sí sola un permiso |
| firma de acción | evidencia opaca emitida por servidor después de validar al trabajador para una operación que exige firma individual | atribuir la operación al humano exacto y correlacionarla con la acción; no sustituye autorización |

La expresión **firma del trabajador** no significa firma manuscrita, imagen, trazo biométrico, texto libre ni un booleano enviado por cliente. Significa una evidencia de servidor que demuestra que el trabajador real fue validado para el uso concreto que exige el contrato.

Un PIN correcto puede producir identificación o firma ligera. Nunca produce por sí mismo:

- permiso;
- rol;
- turno;
- check-in;
- sede o área operativa;
- acceso a una aplicación;
- ampliación del paquete de capacidades;
- `ALLOW` final;
- evidencia de reautenticación fuerte.

---

#### 5. Dos usos válidos de la prueba humana

##### 5.1 Identificación para sesión de actor

Cuando el dispositivo no posee actor humano vigente, una prueba ligera aprobada puede utilizarse para solicitar el inicio de una sesión de actor.

El flujo conceptual es:

```text
PRINCIPAL = DISPOSITIVO COMPARTIDO
-> DISPOSITIVO RESUELTO Y ACTIVO
-> PRUEBA HUMANA PRESENTADA
-> VALIDACION EN SERVIDOR
-> EMPLEADO REAL RESUELTO
-> EMPLEADO ACTIVO Y ELEGIBLE
-> SESION DE ACTOR CREADA POR CONTRATO POSTERIOR
-> ACTOR EFECTIVO = EMPLEADO DE LA SESION
```

`AUTH-DEV-007` define la obligación de identificación humana y la ausencia de autoridad antes de su resolución. La duración, renovación, expiración y cierre de esa sesión permanecen en las tareas propietarias posteriores.

##### 5.2 Firma individual de una acción

Cuando un contrato consumidor exige firma individual antes de una mutación, una sesión de actor ya existente no elimina esa exigencia.

El flujo conceptual es:

```text
SESION DE ACTOR VALIDA
+
ACCION QUE EXIGE FIRMA INDIVIDUAL
+
PRUEBA HUMANA VALIDADA EN SERVIDOR
+
ACTOR DE LA PRUEBA = ACTOR DE LA SESION
+
REFERENCIA OPACA DE FIRMA
=
ACCION LISTA PARA CONTINUAR SU EVALUACION DE AUTORIZACION
```

La firma se obtiene antes del comando empresarial protegido. El comando continúa sujeto a permiso, modalidad, territorio, recurso, estado, contexto, techo del dispositivo, denegaciones e idempotencia.

La firma no convierte un `DENY` en `ALLOW`.

---

#### 6. Resolución obligatoria en servidor

La validación de la prueba humana y la emisión de evidencia deberán ocurrir en servidor.

El cliente puede transportar el secreto efímero, pero no puede declarar como autoritativos:

- `employee_id`;
- actor efectivo;
- `actor_session_id`;
- `signature_id`;
- rol base;
- rol operativo;
- turno;
- sede;
- área;
- permiso;
- resultado de autorización.

La resolución mínima deberá demostrar:

```text
principal tecnico valido
+
dispositivo exacto y activo
+
prueba humana valida
+
empleado exacto y activo
+
coherencia con la sesion de actor cuando exista
=
identidad humana verificable
```

Si el servidor no puede resolver un único trabajador real, la prueba falla cerrada.

---

#### 7. Reglas de la sesión de actor consumidas

Una sesión de actor que resulte utilizable después de la identificación deberá conservar, conforme a los contratos precedentes, al menos la relación conceptual con:

- dispositivo exacto;
- empleado exacto;
- inicio;
- expiración resoluble;
- estado abierto;
- contexto laboral resuelto cuando corresponda.

Para que una sesión sea candidata válida deberá:

1. pertenecer al mismo dispositivo;
2. vincular exactamente un empleado;
3. estar abierta;
4. estar vigente en el momento de resolución;
5. no estar reemplazada;
6. no estar revocada;
7. ser la única candidata válida;
8. coincidir con el actor efectivo.

Esta tarea no define la duración numérica de la sesión ni su política de expiración. Esa responsabilidad permanece reservada a `AUTH-DEV-012` y al diseño físico posterior.

---

#### 8. Una identidad humana por dispositivo

La resolución es cerrada:

```text
0 sesiones humanas validas
-> actor humano no resuelto
-> acciones empresariales bloqueadas
```

```text
1 sesion humana valida
-> actor efectivo = empleado exacto de la sesion
```

```text
2 o mas sesiones incompatibles
-> actor humano no resuelto
-> inconsistencia estructural
-> acciones empresariales bloqueadas
```

Queda prohibido resolver la ambigüedad eligiendo:

- la sesión más reciente;
- la primera fila;
- la sesión que coincide con la navegación;
- la sesión que coincide con el turno;
- el empleado del último PIN;
- el rol esperado;
- el trabajador de la sede;
- el último actor conocido por el cliente.

---

#### 9. Handoff exacto hacia AUTH-DEV-008

`AUTH-DEV-007` entrega a `AUTH-DEV-008` una identidad humana verificable, no una decisión de autorización.

El handoff mínimo es:

```text
DISPOSITIVO TECNICO RESUELTO
+
ACTOR HUMANO EXACTO RESUELTO
+
SESION DE ACTOR O FIRMA CORRELACIONABLE
+
CONTEXTO LABORAL DISPONIBLE SIN FABRICARLO DESDE EL DISPOSITIVO
```

`AUTH-DEV-008` será responsable de combinar:

```text
AUTORIDAD DEL TRABAJADOR
INTERSECCION
TECHO EFECTIVO DEL DISPOSITIVO
```

Por tanto, `AUTH-DEV-007` no:

- evalúa la intersección final de permisos;
- concede una capacidad por estar incluida en el paquete del dispositivo;
- concede una capacidad por tener PIN válido;
- transfiere permisos de la sesión técnica;
- convierte aplicaciones habilitadas en permisos;
- cambia modalidad, sensibilidad o prerrequisitos del permiso.

---

#### 10. Firma individual y correlación de acción

Cuando una acción requiera firma individual, la evidencia de servidor deberá poder correlacionarse con:

- dispositivo;
- principal técnico;
- actor humano;
- sesión de actor cuando aplique;
- aplicación o dominio de acción;
- operación protegida;
- recurso o destino cuando exista;
- sede y área efectivas cuando sean materialmente requeridas;
- momento de emisión;
- resultado o receipt empresarial posterior mediante referencia segura.

La evidencia no autoriza por sí sola la operación. Su propósito es demostrar atribución humana y evitar que una sesión técnica o una interfaz compartida produzcan acciones sin trabajador identificable.

Una firma emitida para una operación no se reutiliza como prueba universal para otra operación materialmente distinta.

---

#### 11. Secreto efímero y privacidad

La prueba humana cruda es un secreto efímero.

Debe cumplir como mínimo:

- no mostrarse en texto claro después de la captura;
- no serializarse en `DeviceContext` ni `AccessContext`;
- no persistirse como evidencia empresarial;
- no incluirse en logs, métricas, mensajes de error, receipts, eventos de dominio ni trazas de aplicación;
- no convertirse en metadata de la operación empresarial;
- no quedar disponible para el siguiente trabajador;
- no conservar autoridad una vez expirada o cerrada la sesión correspondiente;
- limpiarse del estado de cliente después del uso o cuando el flujo deje de ser válido.

Esta tarea no define algoritmo de hashing, esquema de almacenamiento, longitud del PIN, cantidad de intentos, tiempo de bloqueo, rotación, recuperación, TTL numérico de firma ni mecanismo físico de secreto. Esos controles permanecen en E3, E5, BLOQUE R y las tareas posteriores de dispositivo y certificación.

---

#### 12. Reautenticación fuerte

La prueba ligera definida aquí no satisface `STRONG_REAUTH_REQUIRED`.

```text
PIN LIGERO CORRECTO
-> puede identificar trabajador o producir firma ligera
-> NO satisface reautenticacion fuerte
```

Cuando una capacidad exige reautenticación fuerte, además de cualquier sesión o firma ligera deberán cumplirse los contratos específicos de reautenticación fuerte, actor, dispositivo, aplicación, paquete, contexto, recurso y ausencia de denegaciones.

`AUTH-DEV-007` no crea una equivalencia entre PIN operativo y MFA, contraseña personal, passkey, biometría u otra prueba fuerte.

---

#### 13. Turno, check-in, sede y área

Identificar al trabajador no fabrica contexto operativo.

El orden conceptual permanece:

```text
resolver dispositivo
-> resolver prueba y actor humano
-> resolver empleado
-> resolver turno y check-in por sus propias fuentes
-> evaluar territorio y autoridad en las tareas propietarias
```

Queda prohibido:

```text
PIN correcto
-> elegir turno compatible con el dispositivo
```

También queda prohibido:

```text
sede o area fija del dispositivo
-> completar sede o area faltante del trabajador
```

La sesión de actor puede existir sin check-in. En ese caso, solo podrán continuar las evaluaciones cuyo contrato no exija el prerrequisito ausente.

---

#### 14. Comportamiento ante fallos

| Condición | Resultado documental |
| --- | --- |
| falta prueba cuando el contrato la exige | no se crea evidencia de firma ni se ejecuta la acción protegida |
| prueba inválida | respuesta uniforme, sin revelar si existe otro trabajador o cómo falló el secreto |
| empleado inexistente o inactivo | no se crea actor laboral válido |
| dispositivo inactivo o inválido | no se inicia ni usa una sesión empresarial |
| sesión expirada | deja de producir actor efectivo; una nueva autoridad requiere el flujo correspondiente |
| actor de firma distinto del actor de sesión | inconsistencia; acción bloqueada |
| varias sesiones candidatas | actor no resuelto; acción bloqueada |
| falta turno o check-in requerido por la capacidad | la firma no compensa el prerrequisito faltante |
| capacidad fuera del techo del dispositivo | la firma no amplía el dispositivo |
| permiso ausente en el trabajador | la firma no concede el permiso |
| capacidad `STRONG_REAUTH_REQUIRED` sin evidencia fuerte | la firma ligera no satisface el requisito |
| secreto o evidencia no resoluble en servidor | fallo cerrado |

Los límites numéricos de intentos, lockout, expiración y recuperación no se deciden en esta tarea.

---

#### 15. Estado físico observado y relación con el contrato

El ecosistema ya contiene consumidores que solicitan una firma de actor en dispositivo compartido y una función de servidor que produce una referencia de firma asociada al trabajador.

Ese estado físico demuestra que existe una implementación parcial reutilizable, pero no altera la responsabilidad de esta tarea:

- el código observado no sustituye el contrato canónico;
- los valores técnicos actuales no se convierten automáticamente en política aprobada;
- la existencia de un helper no certifica todos los consumidores;
- la implementación posterior deberá reconciliarse con esta definición y con `AUTH-DEV-008` a `AUTH-DEV-016`;
- ninguna modificación física se autoriza desde este marcador documental.

---

#### 16. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La regla de atribución humana, firma/PIN y separación entre dispositivo y trabajador ya está protegida por requisitos canónicos vigentes. Esta tarea materializa el contrato documental responsable sin introducir una regla de prueba nueva ni modificar el registro modular 04A.

---

#### 17. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-AUTH-011` — en dispositivo compartido, la autoridad efectiva se restringe por los límites del dispositivo y los permisos del trabajador identificado; el PIN o mecanismo aprobado identifica al humano real y la acción conserva dispositivo, principal, actor y contexto;
- `TREQ-PASS-029` — las mutaciones de puntos y redención desde dispositivo compartido exigen firma del trabajador real antes del comando y no pueden transferir privilegios de la sesión técnica al cajero que firma;
- `TREQ-PASS-030` — la firma o PIN en PULSO es un secreto efímero y los controles físicos de intentos, bloqueo, rotación y limpieza permanecen como cobertura downstream, sin modificarse desde esta tarea.

La inclusión de estos requisitos en esta sección representa trazabilidad reutilizada, no una actualización del registro 04A.

---

#### 18. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El bloque todavía no ha sido insertado ni normalizado dentro del checkout documental de `AUTH-DEV-007`. |
| LOCAL | NOT_EXECUTED | Formato, calidad de tarea, entrega, topología y batería documental quedan pendientes hasta insertar el artefacto en su archivo propietario. |
| REMOTA | NOT_EXECUTED | No existe todavía cierre, PR ni merge de `AUTH-DEV-007`; la auditoría de fuentes remotas previa a la entrega no sustituye el lifecycle documental. |
| OPERATIVA | NOT_APPLICABLE | Esta tarea define el contrato documental de identificación y firma; no ejecuta una operación laboral real ni prueba un dispositivo físico. |
| FÍSICA | NOT_APPLICABLE | Esta tarea no modifica aplicaciones, Supabase, RPC, datos, dispositivos, infraestructura ni despliegues. |

---

#### 19. Criterios de aceptación

`AUTH-DEV-007` queda documentalmente aceptable cuando:

- [ ] el dispositivo continúa siendo principal técnico y el empleado continúa siendo actor humano;
- [ ] toda prueba humana se valida en servidor;
- [ ] el cliente no puede seleccionar autoritativamente el empleado que firma;
- [ ] una prueba válida produce identidad humana verificable sin conceder autoridad;
- [ ] el mecanismo diferencia sesión de actor y firma individual de acción;
- [ ] una acción que exija firma individual obtiene la evidencia antes del comando protegido;
- [ ] la firma queda correlacionable con dispositivo, actor y operación sin persistir el secreto crudo;
- [ ] el actor de la firma coincide con el actor de la sesión cuando ambos existan;
- [ ] cero sesiones válidas bloquean acciones empresariales;
- [ ] múltiples sesiones incompatibles fallan cerradas y no eligen una por heurística;
- [ ] PIN o mecanismo ligero no se convierten en permiso, rol, turno, check-in o reautenticación fuerte;
- [ ] identificar trabajador no completa sede, área, turno o check-in faltantes;
- [ ] la firma no amplía aplicaciones ni capacidades máximas del dispositivo;
- [ ] `AUTH-DEV-008` recibe un actor humano exacto y evidencia correlacionable, sin una decisión de autorización ya fabricada;
- [ ] duración de sesión, revocación, cambio de actor, auditoría y controles físicos de secreto permanecen en sus tareas propietarias;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos desde esta tarea documental.

---

#### 20. Límites

Esta tarea no:

- combina el techo del dispositivo con los permisos del trabajador; esa responsabilidad pertenece a `AUTH-DEV-008`;
- decide cómo impedir herencia de privilegios administrativos más allá de conservar la separación de principal y actor; esa profundización pertenece a `AUTH-DEV-009`;
- define el registro de auditoría final de dispositivo y trabajador; pertenece a `AUTH-DEV-010`;
- define revocación de dispositivo o sesión; pertenece a `AUTH-DEV-011`;
- fija duración o expiración numérica de sesión; pertenece a `AUTH-DEV-012`;
- define cambio de trabajador y limpieza completa de handoff; pertenece a `AUTH-DEV-013`;
- define límites numéricos de PIN, lockout, hashing, rotación, recuperación o certificación física; pertenecen a los contratos de E3, E5, BLOQUE R y a `AUTH-DEV-014` a `AUTH-DEV-016`;
- satisface `STRONG_REAUTH_REQUIRED`;
- crea un método biométrico, firma manuscrita o autenticación personal nueva;
- crea permisos, roles, aplicaciones, paquetes, sedes, áreas, turnos o check-ins;
- modifica `AccessContext`, `DeviceContext` ni otros shapes canónicos;
- modifica Supabase, migraciones, RLS, RPC, tablas, secretos, aplicaciones o dispositivos;
- modifica el registro 04A;
- autoriza ni ejecuta una instancia física derivada de `PER_IMPLEMENTATION_UNIT`;
- desarrolla `AUTH-DEV-008`.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-006 — Asignar permisos máximos del dispositivo`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-007 — Exigir firma o PIN del trabajador`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-008 — Combinar límite del dispositivo y trabajador`


### ✅ AUTH-DEV-008 — Combinar límite del dispositivo y trabajador

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-007 — Exigir firma o PIN del trabajador
**Tarea siguiente:** AUTH-DEV-009 — Evitar heredar permisos administrativos
**Tipo de tarea:** documental; contrato canónico de intersección restrictiva entre autoridad efectiva del trabajador y techo efectivo del dispositivo compartido, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/02_IDENTIFICACION_DEL_TRABAJADOR_Y_AUDITORIA.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la regla única con la que una acción empresarial solicitada desde un dispositivo compartido combina, sin sumas ni herencias implícitas, la autoridad que posee el trabajador humano identificado con el techo máximo que permite la instancia de dispositivo.

La decisión parte del handoff aprobado por `AUTH-DEV-007`: existe un dispositivo técnico resuelto, un actor humano exacto resuelto mediante sesión o firma correlacionable y un contexto laboral que debe provenir de sus propias fuentes autoritativas.

La combinación aprobada es restrictiva:

```text
AUTORIDAD DEL TRABAJADOR
INTERSECCION
TECHO EFECTIVO DEL DISPOSITIVO
=
CAPACIDAD CANDIDATA DESDE EL DISPOSITIVO
```

La capacidad candidata todavía debe satisfacer aplicación, modo de sesión, sede, área, recurso, prerrequisitos, sensibilidad, reautenticación fuerte cuando corresponda y ausencia de denegaciones antes de producir una acción posible.

La tarea no crea permisos para el dispositivo, no convierte al principal técnico en trabajador, no fusiona carriles administrativo y operativo y no materializa cambios en código, Supabase, migraciones, configuración, datos ni dispositivos.

---

#### 2. Alcance y límites

`AUTH-DEV-008` resuelve exclusivamente la combinación entre:

1. el actor humano efectivo identificado conforme a `AUTH-DEV-007`;
2. el permiso efectivo que ese actor posee conforme al modelo canónico de autorización;
3. el techo exacto del dispositivo aprobado por `AUTH-DEV-006`;
4. la aplicación efectiva de la instancia;
5. el modo de sesión compatible;
6. el territorio utilizable como intersección entre contexto humano y restricción del dispositivo;
7. el recurso y los prerrequisitos de la acción;
8. la clasificación de compatibilidad con dispositivo compartido;
9. la ausencia de denegaciones aplicables.

Quedan fuera de esta tarea:

- la captura y validación del PIN o firma ligera, cerrada por `AUTH-DEV-007`;
- la prohibición detallada de herencia de privilegios administrativos, reservada a `AUTH-DEV-009`;
- el contrato completo de auditoría conjunta dispositivo-trabajador, reservado a `AUTH-DEV-010`;
- la revocación del dispositivo, reservada a `AUTH-DEV-011`;
- la expiración de sesión, reservada a `AUTH-DEV-012`;
- el cambio de trabajador y la limpieza completa del handoff, reservados a `AUTH-DEV-013`;
- las pruebas físicas de NEXO, PULSO y FOGO, reservadas a `AUTH-DEV-014`, `AUTH-DEV-015` y `AUTH-DEV-016`;
- la creación de una instancia física en esta conversación documental.

---

#### 3. Fuentes contractuales consumidas

La combinación conserva sin modificación las decisiones aprobadas previamente:

- el dispositivo compartido es un principal técnico, no un actor empresarial;
- el trabajador humano de la sesión es el actor efectivo;
- el dispositivo solo puede restringir una capacidad que el actor ya posee, exigir condiciones adicionales o bloquearla;
- una aplicación permitida solo habilita superficie y nunca concede por sí misma `<app>.access` ni capacidades internas;
- `navigation_role` es navegación o presentación y no una fuente de autorización;
- la instancia puede reducir su plantilla, nunca ampliarla;
- el territorio del dispositivo se intersecta con el territorio del actor y nunca se une;
- una sesión de actor no crea turno, check-in, rol operativo, sede, área ni permiso;
- una prueba ligera no satisface `STRONG_REAUTH_REQUIRED`;
- una capacidad `NOT_ALLOWED` permanece excluida universalmente;
- una denegación aplicable prevalece sobre cualquier allow candidato.

La política legacy `same_site_active_worker` no es suficiente como política final porque una coincidencia de sede no demuestra permiso, área, rol operativo, recurso, prerrequisitos ni compatibilidad completa con el dispositivo.

---

#### 4. Resultado canónico

Para cada acción empresarial desde un dispositivo compartido se evaluará exactamente una combinación contextual y por permiso.

```text
PERMISO EFECTIVO DEL ACTOR
∩
TECHO EFECTIVO DEL DISPOSITIVO
∩
APLICACION EFECTIVA
∩
MODO DE SESION COMPATIBLE
∩
SEDE Y AREA COMPATIBLES
∩
RECURSO Y PRERREQUISITOS VALIDOS
∩
REAUTENTICACION FUERTE CUANDO APLIQUE
∩
AUSENCIA DE DENEGACIONES
=
ACCION POSIBLE
```

La fórmula es una intersección lógica de condiciones obligatorias. Ningún componente ausente puede ser sustituido por otro.

En particular:

```text
DISPOSITIVO PERMITE
!=
ACTOR TIENE PERMISO
```

```text
ACTOR TIENE PERMISO
!=
DISPOSITIVO PERMITE
```

```text
APP VISIBLE
!=
APP AUTORIZADA PARA EL ACTOR
```

```text
NAVIGATION_ROLE
!=
ROL EFECTIVO
```

```text
MISMA SEDE
!=
AUTORIDAD SUFICIENTE
```

```text
PIN O FIRMA VALIDA
!=
ALLOW
```

---

#### 5. Techo efectivo del dispositivo consumido

`AUTH-DEV-008` no redefine el techo aprobado por `AUTH-DEV-006`.

El techo efectivo se consume como un conjunto cerrado de claves canónicas exactas derivado de:

```text
PAQUETES EXACTOS DE LA VERSION DE PLANTILLA
∩
CLAVES NO RETIRADAS POR LA INSTANCIA
∩
CLAVES DE APLICACIONES EFECTIVAS
∩
CLAVES CANONICAS ACTIVAS COMPATIBLES CON DISPOSITIVO
```

Reglas de consumo:

1. una clave fuera del techo produce `DENY` aunque el trabajador la posea;
2. una clave dentro del techo no produce `ALLOW` si el trabajador no la posee;
3. una reducción de instancia solo puede retirar capacidades;
4. una clave nueva o desconocida no se incorpora por prefijo, alias, rol, aplicación, ruta o similitud semántica;
5. un techo ausente, conflictivo, no versionado o no resoluble no equivale a ilimitado;
6. el cliente no puede declarar ni ampliar el techo;
7. una aplicación efectiva sin su acceso contractual coherente constituye conflicto, no autorización implícita.

---

#### 6. Autoridad efectiva del trabajador

La autoridad del trabajador se resuelve independientemente del dispositivo.

La presencia de una sesión de actor válida demuestra quién actúa; no demuestra qué puede hacer.

La autoridad humana deberá derivarse de las fuentes canónicas del actor y del permiso solicitado, incluyendo según corresponda:

- identidad laboral activa;
- rol base y permisos base vigentes;
- concesiones individuales compatibles;
- turno publicado y vigente;
- rol operativo efectivo;
- check-in cuando el permiso lo exija;
- sede y área efectivas;
- alcance del permiso;
- recurso exacto;
- sensibilidad y controles reforzados;
- denegaciones estructurales, transversales, individuales o de carril.

El dispositivo no podrá completar ninguno de estos elementos faltantes.

---

#### 7. Combinación por modalidad de autorización

La modalidad del permiso continúa siendo autoritativa.

| Modalidad | Autoridad humana requerida | Efecto del dispositivo |
| --- | --- | --- |
| `BASE_ONLY` | componente base válido dentro de cobertura, alcance y recurso | restringe la clave, aplicación, territorio y condiciones; no exige turno por sí mismo |
| `BASE_OR_OPERATIONAL` | al menos uno de los carriles debe producir un allow humano válido por sus propias reglas | restringe el carril válido; no mezcla componentes de dos evaluaciones fallidas |
| `BASE_AND_OPERATIONAL` | componente base válido y componente operativo válido para el mismo actor y contexto compatible | restringe ambos; nunca aporta el componente faltante |
| `OPERATIONAL_ONLY` | turno, rol operativo, territorio y demás prerrequisitos operativos aplicables | restringe la ejecución; no crea un carril base alternativo |

Reglas:

1. el dispositivo no cambia la modalidad del permiso;
2. una capacidad base no se vuelve operativa por ejecutarse en una tablet;
3. una capacidad operativa no se vuelve base porque el trabajador tenga un rol administrativo;
4. `BASE_AND_OPERATIONAL` no se satisface tomando el componente base de una persona y el operativo de otra;
5. un resultado permitido en un carril no elimina una denegación que tenga precedencia canónica.

---

#### 8. Aplicación efectiva

La aplicación solicitada deberá pertenecer al conjunto efectivo del dispositivo y estar activa y disponible conforme al contrato de `AUTH-DEV-005`.

La pertenencia permite continuar la evaluación, pero no concede acceso.

Para una acción dentro de una aplicación deberán cumplirse separadamente:

```text
APP SOLICITADA EN CONJUNTO EFECTIVO
+
CLAVE DE ACCESO O CAPACIDAD EXACTA EN TECHO
+
ACTOR HUMANO CON ESA CLAVE EFECTIVA
+
CONTEXTO Y RECURSO VALIDOS
=
EVALUACION PUEDE CONTINUAR
```

Queda prohibido:

- devolver `ALLOW` para `<app>.access` solo porque la app esté permitida en el dispositivo;
- utilizar la presencia de una app para inferir todas sus capacidades internas;
- utilizar una ruta existente como prueba de permiso;
- utilizar una app instalada localmente como ampliación de la configuración efectiva.

---

#### 9. Modo de sesión y actor

La evaluación desde dispositivo compartido exige un actor humano resoluble para toda acción empresarial.

Casos:

```text
DISPOSITIVO ACTIVO
+
SIN SESION HUMANA VALIDA
->
SIN ACCIONES EMPRESARIALES
```

```text
DISPOSITIVO ACTIVO
+
UNA SESION HUMANA VALIDA
->
ACTOR = EMPLEADO EXACTO DE LA SESION
->
EVALUAR SU AUTORIDAD
```

```text
DOS O MAS SESIONES HUMANAS INCOMPATIBLES
->
ACTOR NO RESUELTO
->
DENY / BLOQUEO ESTRUCTURAL
```

No se utilizará como actor:

- el usuario técnico;
- `navigation_role`;
- el último empleado;
- el trabajador de la sede;
- el último PIN;
- una cookie de cliente;
- un `employee_id` enviado por la interfaz.

---

#### 10. Territorio como intersección

El territorio utilizable desde un dispositivo compartido se resuelve de forma restrictiva.

```text
TERRITORIO AUTORIZADO DEL ACTOR
∩
TERRITORIO PERMITIDO POR LA INSTANCIA
∩
TERRITORIO REAL DEL RECURSO
=
TERRITORIO UTILIZABLE
```

Nunca:

```text
TERRITORIO DEL ACTOR
∪
TERRITORIO DEL DISPOSITIVO
```

Reglas:

1. la sede fija del dispositivo no crea una sede activa para el trabajador;
2. el área fija o conjunto permitido no crea el área operativa del trabajador;
3. el turno sigue siendo la fuente del territorio operativo cuando aplique;
4. la cobertura administrativa sigue siendo una propiedad del actor, no del terminal;
5. el recurso deberá resolverse en servidor y coincidir con el territorio permitido;
6. una preferencia de interfaz no amplía territorio;
7. una coincidencia parcial de sede sin área requerida produce denegación;
8. una acción multiárea o multisede deberá satisfacer todas las dimensiones que su contrato exija.

---

#### 11. Área efectiva única por acción

Cuando la política del dispositivo admite un conjunto de áreas, cada acción concreta deberá resolverse contra una sola área efectiva o contra una semántica explícita de recurso multiárea ya definida por el permiso.

Un conjunto de áreas permitidas no significa que el trabajador opere simultáneamente en todas ellas.

```text
AREAS PERMITIDAS DEL DISPOSITIVO
=
CONJUNTO MAXIMO
```

```text
AREA EFECTIVA DE LA ACCION
=
AREA RESUELTA DEL ACTOR Y DEL RECURSO
DENTRO DEL CONJUNTO MAXIMO
```

No se seleccionará automáticamente un área para conseguir que una autorización pase.

---

#### 12. Compatibilidad de clasificación del permiso

La clasificación de compatibilidad de dispositivo sigue siendo una restricción adicional:

| Clasificación | Regla |
| --- | --- |
| `STANDARD_ACTOR_SESSION` | puede continuar únicamente con actor humano y contexto válidos, además del techo y demás controles |
| `STRONG_REAUTH_REQUIRED` | exige evidencia fuerte personal vigente y soporte real del dispositivo; el PIN ligero de `AUTH-DEV-007` no basta |
| `NOT_ALLOWED` | la capacidad queda fuera de toda instancia y toda acción se deniega |

Una clasificación faltante, desconocida o incompatible se resuelve de forma cerrada.

---

#### 13. Denegaciones y fail closed

La intersección produce `DENY` o bloqueo cuando ocurra al menos una de estas condiciones:

1. no existe actor humano válido;
2. el empleado está inactivo;
3. la clave solicitada no es canónica o está inactiva;
4. el actor no posee la clave efectiva requerida;
5. la clave no pertenece al techo efectivo del dispositivo;
6. la aplicación no pertenece al conjunto efectivo;
7. el modo de sesión es incompatible;
8. falta turno o check-in cuando el permiso los exige;
9. la sede o área no coincide;
10. el recurso está fuera del alcance;
11. la capacidad es `NOT_ALLOWED`;
12. falta reautenticación fuerte para una capacidad `STRONG_REAUTH_REQUIRED`;
13. existe una denegación con precedencia;
14. la plantilla, instancia, paquete, sesión o contexto están en conflicto;
15. el resultado depende de una fuente legacy no reconciliada;
16. existe más de un actor candidato válido;
17. no puede resolverse de forma única el territorio requerido.

La ausencia de evidencia no se transforma en allow.

---

#### 14. Prohibición de sumas

La evaluación no utiliza sumas de autoridad entre dispositivo y humano.

Queda prohibido interpretar:

```text
PERMISOS DEL TRABAJADOR
+
PERMISOS DEL DISPOSITIVO
```

porque el dispositivo no posee permisos empresariales propios.

También queda prohibido sumar:

- permisos del trabajador actual y del anterior;
- rol base del trabajador y `navigation_role` como si fueran dos grants;
- cobertura administrativa del actor y sede fija del dispositivo;
- áreas permitidas por la instancia y áreas no autorizadas del actor;
- aplicaciones de plantilla e instancia como unión expansiva;
- resultados parciales de carriles que no satisfacen por separado su contrato.

---

#### 15. Estado y recálculo

La decisión se calcula sobre un snapshot coherente y no puede sobrevivir a cambios que afecten sus entradas.

Deberá recalcularse cuando cambie materialmente alguno de estos elementos:

- actor humano;
- sesión de actor;
- estado del empleado;
- rol base;
- permisos o denegaciones del actor;
- turno, check-in, rol operativo, sede o área;
- aplicación solicitada;
- conjunto efectivo de aplicaciones;
- versión de plantilla;
- reducción de instancia;
- paquete o techo efectivo;
- clasificación de compatibilidad;
- recurso objetivo;
- requisito de reautenticación fuerte.

Esta tarea define la obligación de recalcular. La mecánica de invalidación, expiración, limpieza de estado y cambio de trabajador permanece en sus propietarios posteriores.

---

#### 16. Matriz completa de las 19 identidades

La tarea conserva el universo de 19 claves aprobado por `AUTH-DEV-001` a `AUTH-DEV-006` y asigna una decisión de combinación a cada identidad sin crear dispositivos por inferencia.

| Identidad | Clase / estado | Decisión de combinación | Restricción humana y territorial | Resultado documental |
| --- | --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` / `REGISTERED_UNVERIFIED` | usar únicamente el techo candidato reducido de su configuración `pos_satellite`; nunca conceder por app visible o `navigation_role` | actor humano exacto; permiso efectivo propio; VENTO_CAFE y Caja compatibles con actor y recurso | combinación definida; operación física no certificada |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` / `REGISTERED_UNVERIFIED` | conservar la reducción candidata a NEXO y reemplazar la suficiencia de `same_site_active_worker` por la intersección completa | actor humano exacto; permiso efectivo propio; CENTRO_PROD y Bodega compatibles con actor y recurso | combinación definida; política legacy sola queda insuficiente |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` / `OBSERVED_ONLY` | no calcular autoridad de dispositivo hasta existir identidad y enrolamiento autoritativos | ninguna observación física crea actor, sede, área, app o permiso | sin autoridad materializable por observación |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` / `OBSERVED_ONLY` | no calcular autoridad de dispositivo hasta existir identidad y enrolamiento autoritativos | ninguna cuenta conjunta o uso observado sustituye actor humano | sin autoridad materializable por observación |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor de caja con techo máximo de la plantilla y reducción de instancia | sede fija y área exacta de Caja; turno/check-in según permiso | política de combinación definida |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor de barra con techo máximo de la plantilla y reducción de instancia | sede fija y área exacta de Barra; turno/check-in según permiso | política de combinación definida |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor de cocina satélite con techo máximo de la plantilla y reducción de instancia | sede fija y área exacta de Cocina; turno/check-in según permiso | política de combinación definida |
| `target_template:service_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor de servicio con techo máximo de la plantilla y reducción de instancia | sede fija y área exacta de Servicio; turno/check-in según permiso | política de combinación definida |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor de mostrador con techo máximo de la plantilla y reducción de instancia | sede fija y área exacta de Mostrador; turno/check-in según permiso | política de combinación definida |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor con techo integrado sin sumar perfiles de otras plantillas | sede fija; área efectiva única dentro del conjunto permitido | política de combinación definida |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar autoridad del actor con techo de producción | sede de producción y área exacta de Cocina Caliente; rol operativo y prerrequisitos aplicables | política de combinación definida |
| `target_template:production_bakery` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar autoridad del actor con techo de producción | sede de producción y área exacta de Galletería y Panadería; rol operativo y prerrequisitos aplicables | política de combinación definida |
| `target_template:production_pastry` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar autoridad del actor con techo de producción | sede de producción y área exacta de Repostería; rol operativo y prerrequisitos aplicables | política de combinación definida |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar autoridad real del bodeguero u otro actor elegible con techo de bodega; nunca aceptar misma sede como prueba suficiente | sede y área de Bodega exactas; rol, turno, check-in y recurso según permiso | política objetivo sustituye suficiencia de `same_site_active_worker` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar actor logístico con techo de terminal y restricciones del recurso/vehículo | sede base o propietaria y contexto de ruta/recurso sin convertir destino u origen en autoridad | política de combinación definida |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | evaluar un único modo vigente; administrativo y operativo permanecen mutuamente excluyentes | cada carril conserva sus propios permisos, territorio y prerrequisitos | prohibida la unión de ambos modos |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar autoridad real del actor con el techo operativo de coordinación | coordinación no concede ejecución de oficios ajenos; territorio y recurso siguen obligatorios | política de combinación definida |
| `target_template:management_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | intersectar permisos base reales del actor con el techo administrativo del terminal | cobertura administrativa pertenece al actor; la terminal no crea cobertura global ni bypass por rol | política de combinación definida |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` / `NO_APLICA` | no admite nuevas instancias ni cálculo de autoridad para nueva operación | cualquier transición debe usar las plantillas productivas sustitutas aprobadas | bloqueada para nueva materialización |

Control de cardinalidad:

```text
TOTAL ESPERADO: 19
TOTAL MATERIALIZADO EN MATRIZ: 19
FALTANTES: 0
DUPLICADOS: 0
```

---

#### 17. Reglas específicas para las instancias configuradas

##### 17.1 `CAJA_VENTO_CAFE_01`

La configuración registral conserva como candidato el conjunto `shell`, `nexo`, `pulso` de `pos_satellite`.

La evaluación futura no podrá utilizar:

- `pulso` como permiso de entrada por sí mismo;
- `navigation_role` como rol efectivo;
- la sede/área registrales como contexto humano suficiente;
- la existencia de la fila como evidencia de operación física validada.

Una acción solo podrá continuar cuando el trabajador real posea la capacidad solicitada y las restantes condiciones de la intersección sean válidas.

##### 17.2 `KIOSCO_BODEGA_CP`

La configuración registral conserva como candidato únicamente `nexo` y no añade `shell` ni `origo` desde la plantilla.

La política legacy `same_site_active_worker` queda expresamente insuficiente como regla final.

```text
TRABAJADOR ACTIVO EN CENTRO_PROD
!=
TRABAJADOR AUTORIZADO PARA CUALQUIER ACCION DE BODEGA
```

La combinación objetivo exige permiso exacto, contexto operativo aplicable, área Bodega compatible, recurso válido, techo del dispositivo y ausencia de denegaciones.

---

#### 18. Terminales mixtas y administrativas

##### 18.1 `procurement_reception`

El terminal puede soportar superficies administrativas y operativas, pero no una sesión híbrida que sume los privilegios de ambos carriles.

Cada acción deberá declarar y resolver un único modo aplicable.

```text
MODO ADMINISTRATIVO
-> evaluar carril base del actor
-> aplicar techo del dispositivo
```

```text
MODO OPERATIVO
-> evaluar carril operativo del actor
-> aplicar techo del dispositivo
```

Un fallo en ambos modos no puede combinarse para producir un allow.

##### 18.2 `operations_management_terminal`

El terminal permite coordinación operativa dentro de su techo, pero el actor conserva su identidad, permisos, territorio y segregación de funciones.

La presencia de capacidades de varios dominios no convierte a gerencia operativa en bodeguero, productor, receptor, cajero o conductor.

##### 18.3 `management_terminal`

El terminal administrativo es únicamente una superficie restrictiva.

La cobertura organizacional, multisede o por área deberá pertenecer al actor humano y al permiso evaluado. El dispositivo no crea cobertura administrativa por estar instalado en oficina, por su nombre, por su plantilla ni por el usuario técnico autenticado.

La prohibición detallada de transferencia o herencia administrativa continúa en `AUTH-DEV-009`.

---

#### 19. Estado físico observado y brechas de materialización

La definición documental no declara conforme el comportamiento actual de los consumidores.

Se reconoce como brecha física que existen helpers consumidores donde, para sesiones de dispositivo compartido:

- una aplicación permitida puede ser tratada como suficiente para su clave de acceso;
- otras capacidades pueden evaluarse usando `navigation_role`;
- sede o área del dispositivo o de parámetros preferidos pueden participar antes de demostrar el contexto humano canónico completo.

Ese comportamiento no redefine esta tarea.

La materialización posterior deberá hacer que todos los consumidores aplicables evalúen la misma intersección canónica y será certificada por las tareas físicas de dispositivo correspondientes.

No se modifica ningún consumidor desde este marcador documental.

---

#### 20. Handoff exacto hacia AUTH-DEV-009

`AUTH-DEV-008` entrega a `AUTH-DEV-009` una regla de autorización sin suma de privilegios:

```text
ACTOR HUMANO EXACTO
+
AUTORIDAD HUMANA RESUELTA
+
TECHO DE DISPOSITIVO RESUELTO
+
INTERSECCION CONTEXTUAL EVALUADA
=
NINGUNA AUTORIDAD PROCEDE DEL PRINCIPAL TECNICO
```

`AUTH-DEV-009` deberá cerrar específicamente cualquier camino por el que privilegios administrativos del usuario técnico, una sesión administrativa previa, el trabajador anterior, `navigation_role`, una app visible o un estado residual puedan heredarse por otro trabajador.

Esta tarea no desarrolla esa política posterior.

---

#### 21. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

La cobertura vigente ya protege la intersección entre actor, dispositivo, aplicación, modo, territorio, recurso, sensibilidad y denegaciones, además de la limpieza ante cambios de actor o aplicación y las reglas específicas de las plantillas afectadas.

No se crea ni modifica el registro 04A en esta tarea.

---

#### 22. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificación:

- `TREQ-AUTH-011` — autoridad efectiva como intersección entre límites del dispositivo y permisos del trabajador identificado;
- `TREQ-AUTH-054` — recálculo y limpieza ante cambio de aplicación o actor;
- `TREQ-AUTH-056` — restricciones de terminales de recepción, gerencia operativa y gerencia administrativa;
- `TREQ-AUTH-059` — resolución exacta del techo efectivo del dispositivo;
- `TREQ-AUTH-060` — membresía exacta y versionada de paquetes;
- `TREQ-AUTH-061` — coherencia entre aplicaciones efectivas y claves del techo;
- `TREQ-AUTH-062` — intersección completa por acción desde dispositivo compartido;
- `TREQ-AUTH-063` — tratamiento de `STANDARD_ACTOR_SESSION`, `STRONG_REAUTH_REQUIRED` y `NOT_ALLOWED`;
- `TREQ-AUTH-067` — restricciones de plantillas mixtas, administrativas y productivas;
- `TREQ-AUTH-068` — integridad de la matriz completa de permisos máximos.

Estos identificadores se citan únicamente como trazabilidad de cobertura existente y no representan cambios al registro.

---

#### 23. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea es documental y no ejecuta build de aplicaciones durante su definición. |
| LOCAL | NOT_EXECUTED | La batería documental del checkout propietario se ejecuta después de insertar y normalizar el bloque. |
| REMOTA | NOT_EXECUTED | Se consultaron fuentes remotas como auditoría estática, pero no se ejecutó un gate remoto de esta tarea durante su definición. |
| OPERATIVA | NOT_APPLICABLE | La tarea no autoriza pruebas operativas ni interacción con estaciones reales. |
| FÍSICA | NOT_APPLICABLE | La materialización física pertenece a instancias posteriores gobernadas por `PER_IMPLEMENTATION_UNIT` y `POST_E5_PACKAGE`. |

---

#### 24. Criterios de aceptación

- [x] La combinación se define como intersección y nunca como unión o suma.
- [x] El dispositivo continúa siendo principal técnico y el empleado continúa siendo actor humano.
- [x] La sesión de actor identifica, pero no concede permisos.
- [x] El techo del dispositivo restringe y nunca concede una clave.
- [x] La autoridad humana se resuelve independientemente del dispositivo.
- [x] Se preservan las cuatro modalidades de autorización sin mezclarlas.
- [x] Una aplicación visible no concede `<app>.access` ni capacidades internas.
- [x] `navigation_role` no participa como fuente de autoridad.
- [x] La política `same_site_active_worker` queda explícitamente insuficiente como regla final.
- [x] Sede y área se resuelven por intersección entre actor, dispositivo y recurso.
- [x] Un conjunto permitido de áreas no crea múltiples áreas activas simultáneas.
- [x] `STANDARD_ACTOR_SESSION` conserva actor y contexto obligatorios.
- [x] `STRONG_REAUTH_REQUIRED` no se degrada a PIN ligero.
- [x] `NOT_ALLOWED` permanece excluido.
- [x] Las denegaciones conservan precedencia.
- [x] Se materializa una decisión para las 19 identidades del universo heredado.
- [x] La matriz contiene 19 filas, sin faltantes ni duplicados.
- [x] Las dos observaciones físicas no reciben autoridad por inferencia.
- [x] `procurement_reception` conserva modos mutuamente excluyentes.
- [x] `operations_management_terminal` no convierte coordinación en ejecución de otros oficios.
- [x] `management_terminal` no crea cobertura administrativa.
- [x] Se identifica la brecha física actual sin convertirla en una modificación autorizada.
- [x] Se conserva intacta la responsabilidad de `AUTH-DEV-009` a `AUTH-DEV-016`.
- [x] No se crean ni modifican TREQ.
- [x] No se modifica 04A.
- [x] No se autorizan cambios físicos.

---

#### 25. Límites

Esta tarea no:

- modifica código, Supabase, migraciones, RLS, RPC, configuración, datos, aplicaciones o dispositivos;
- crea un nuevo permiso, rol, aplicación, plantilla, paquete, sede, área o dispositivo;
- cambia las 19 identidades heredadas;
- cambia los nueve paquetes ni sus membresías;
- cambia la clasificación `STANDARD_ACTOR_SESSION`, `STRONG_REAUTH_REQUIRED` o `NOT_ALLOWED`;
- redefine el techo efectivo de `AUTH-DEV-006`;
- redefine la identificación humana de `AUTH-DEV-007`;
- desarrolla la prohibición específica de herencia administrativa de `AUTH-DEV-009`;
- desarrolla el contrato de auditoría de `AUTH-DEV-010`;
- define revocación, expiración o cambio de trabajador;
- ejecuta pruebas físicas de NEXO, PULSO o FOGO;
- asigna una instancia física propia durante este trabajo documental;
- modifica requisitos de prueba existentes.

---

#### 26. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-007 — Exigir firma o PIN del trabajador`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-008 — Combinar límite del dispositivo y trabajador`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-009 — Evitar heredar permisos administrativos`


### [ ] AUTH-DEV-009 — Evitar heredar permisos administrativos
### [ ] AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría
