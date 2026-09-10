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


### ✅ AUTH-DEV-009 — Evitar heredar permisos administrativos

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-008 — Combinar límite del dispositivo y trabajador
**Tarea siguiente:** AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría
**Tipo de tarea:** documental; contrato canónico de no herencia de autoridad administrativa entre principal técnico, sesiones, trabajadores y estado residual en dispositivo compartido, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/02_IDENTIFICACION_DEL_TRABAJADOR_Y_AUDITORIA.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo un dispositivo compartido impide que un trabajador adquiera autoridad administrativa que no le pertenece por efecto del principal técnico autenticado, de una sesión administrativa previa, del trabajador anterior, de `navigation_role`, de una aplicación visible, de una plantilla, de un paquete del dispositivo o de estado residual conservado por cliente, servidor o infraestructura.

La tarea preserva la intersección restrictiva aprobada por `AUTH-DEV-008` y añade la barrera específica de no herencia administrativa. No elimina capacidades administrativas legítimas del trabajador actual: cuando el actor humano vigente posee una capacidad base válida y su contexto cumple todos los requisitos, esa capacidad puede participar en la decisión únicamente como autoridad propia del actor.

Regla principal:

```text
AUTORIDAD ADMINISTRATIVA DEL ACTOR ACTUAL
=
AUTORIDAD BASE RESUELTA PARA ESE ACTOR
INTERSECCION
TECHO EFECTIVO DEL DISPOSITIVO
INTERSECCION
APLICACION EFECTIVA
INTERSECCION
ALCANCE Y RECURSO VALIDOS
INTERSECCION
CONTROLES ADICIONALES APLICABLES
INTERSECCION
AUSENCIA DE DENEGACIONES
```

Nunca:

```text
AUTORIDAD ADMINISTRATIVA DEL ACTOR ACTUAL
=
AUTORIDAD DEL PRINCIPAL TECNICO
O
AUTORIDAD DE UN ADMINISTRADOR PREVIO
O
AUTORIDAD DEL TRABAJADOR ANTERIOR
O
NAVIGATION_ROLE
O
APLICACION VISIBLE
O
ESTADO RESIDUAL
```

---

#### 2. Handoff recibido de AUTH-DEV-008

`AUTH-DEV-008` entrega una decisión sin suma de privilegios:

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

`AUTH-DEV-009` profundiza exclusivamente la última garantía y la extiende a toda fuente residual o indirecta capaz de aparentar autoridad administrativa.

Se preservan sin modificación:

- la identidad humana y firma ligera definidas por `AUTH-DEV-007`;
- la intersección de autoridad del trabajador y techo del dispositivo definida por `AUTH-DEV-008`;
- la separación entre principal técnico, dispositivo empresarial y actor efectivo;
- la obligación de resolver identidad, autoridad, contexto y recurso en servidor;
- la regla según la cual el dispositivo restringe y nunca concede;
- la independencia entre carril base y carril operativo;
- la clasificación vigente de capacidades compatibles con dispositivo compartido;
- la obligación de reautenticación fuerte cuando corresponda;
- la prevalencia de denegaciones aplicables.

---

#### 3. Resultado canónico

La no herencia administrativa queda regida por estas decisiones:

1. el principal técnico del dispositivo no aporta permisos base ni cobertura administrativa al actor humano;
2. el trabajador actual solo puede utilizar autoridad administrativa que el servidor resuelva para ese mismo trabajador;
3. ninguna sesión personal o administrativa previa puede permanecer como fuente de autoridad después de cambiar al modo de dispositivo compartido o de cambiar el actor humano efectivo;
4. el trabajador anterior no presta rol, permisos, cobertura, alcance, reautenticación ni decisiones en caché al trabajador siguiente;
5. `navigation_role` puede orientar presentación o experiencia, pero no participa en autorización;
6. una aplicación permitida o visible es superficie disponible, no un `ALLOW` del actor;
7. una plantilla o paquete de capacidades fija un techo restrictivo y nunca crea autoridad humana;
8. la sede o área física del dispositivo no crea cobertura administrativa;
9. la autoridad administrativa no se infiere desde cookies, almacenamiento local, estado de interfaz, parámetros de ruta, cabeceras de cliente ni snapshots antiguos;
10. una credencial técnica privilegiada, `service_role` o cliente administrativo no convierte al proceso ni al actor humano en administrador empresarial;
11. toda decisión sensible se revalida contra actor, contexto, dispositivo, recurso y controles vigentes antes del efecto;
12. ante identidad, autoridad, frescura o separación ambiguas, la decisión falla cerrada;
13. cualquier dato residual puede conservar valor de auditoría o diagnóstico cuando corresponda, pero no autoridad;
14. el contrato aplica tanto a capacidades administrativas puras como al componente base de capacidades de doble condición;
15. el resultado deja a `AUTH-DEV-010` principal, dispositivo, actor y fuente de autoridad claramente separables para auditoría.

---

#### 4. Qué significa herencia administrativa

Existe herencia administrativa prohibida cuando una decisión del trabajador actual depende total o parcialmente de una autoridad que fue resuelta para otra identidad, otro contexto o una credencial técnica.

Casos prohibidos:

| Fuente heredada | Ejemplo conceptual | Resultado obligatorio |
| --- | --- | --- |
| principal técnico | el usuario Auth del kiosco posee o aparenta privilegios y el actor humano los recibe | ignorar esa autoridad empresarial y evaluar al actor humano |
| administrador configurador | una persona administró el terminal antes de dejarlo en operación | sus permisos no forman parte de la sesión operativa posterior |
| sesión personal previa | el navegador conserva una sesión administrativa anterior | no reutilizarla como fuente del actor o del carril base actual |
| trabajador anterior | el último actor tenía mayor cobertura | no conservar rol, permisos, alcance ni decisiones reutilizables |
| `navigation_role` | el dispositivo anuncia `bodeguero` o cualquier otro rol | usar solo para presentación permitida; nunca como autoridad |
| aplicación visible | VISO, NUMERA u otra app está disponible en el terminal | exigir permiso propio del actor y contexto correspondiente |
| plantilla o paquete | el terminal admite un conjunto amplio de capacidades | tratarlo como techo; nunca como concesión |
| sede o área del dispositivo | el terminal está físicamente en una sede administrativa | no crear cobertura del actor por ubicación |
| caché o snapshot | una evaluación anterior produjo `ALLOW` | invalidar su uso si actor, contexto o recurso ya no coinciden |
| cookie o estado local | una selección o override quedó persistido | no aceptarlo como fuente autoritativa |
| credencial de servicio | un backend usa privilegio técnico elevado | separar capacidad técnica de autoridad empresarial |

La mera persistencia técnica de una sesión o valor no autoriza su reutilización empresarial.

---

#### 5. Fuentes válidas de autoridad administrativa

Una capacidad administrativa desde dispositivo compartido solo puede proceder del actor humano actual y de contratos autoritativos asociados a ese actor.

Fuentes admisibles, según el permiso evaluado:

- identidad laboral vigente del trabajador;
- rol base canónico vigente;
- concesiones individuales base vigentes cuando estén permitidas;
- cobertura administrativa resuelta para el actor;
- alcance máximo de la capacidad;
- recurso real resuelto en servidor;
- denegaciones y restricciones vigentes;
- sensibilidad y reautenticación exigidas;
- estado y versión del recurso cuando sean relevantes;
- techo y aplicaciones efectivas del dispositivo únicamente como restricciones adicionales.

La existencia de una fuente admisible no produce por sí sola `ALLOW`. La decisión continúa sometida al contrato completo de autorización.

---

#### 6. Fuentes prohibidas como autoridad administrativa

No pueden crear, ampliar, sustituir o restaurar autoridad del actor:

- `auth_user_id` técnico del dispositivo;
- rol, metadata o claims no canónicos del usuario técnico;
- `navigation_role`;
- nombre o tipo del dispositivo;
- plantilla del dispositivo;
- paquete de capacidades;
- conjunto de aplicaciones permitidas;
- aplicación predeterminada;
- ruta o pantalla abierta;
- rol de navegación del trabajador anterior;
- rol base del trabajador anterior;
- rol operativo del trabajador anterior;
- cobertura administrativa del trabajador anterior;
- sede o área del dispositivo como sustituto de cobertura humana;
- turno o check-in de otra persona;
- una sesión personal anterior conservada por navegador;
- una simulación previa;
- una reautenticación emitida para otro actor, aplicación, acción o recurso;
- un resultado de permiso cacheado para otra identidad o snapshot;
- un parámetro enviado por cliente;
- `service_role`, `createAdminClient()` o equivalente técnico privilegiado;
- el hecho de que una operación técnica pueda ejecutarse con privilegios de infraestructura.

---

#### 7. Principal técnico y actor humano

En dispositivo compartido se conserva la separación:

```text
PRINCIPAL TECNICO
=
SUJETO QUE PRESENTA LA CREDENCIAL DEL DISPOSITIVO
```

```text
ACTOR HUMANO
=
TRABAJADOR RESUELTO POR LA SESION DE ACTOR VIGENTE
```

```text
AUTORIDAD EMPRESARIAL
=
AUTORIDAD RESUELTA PARA EL ACTOR HUMANO Y SU CONTEXTO
```

Por tanto:

```text
PRINCIPAL TECNICO VALIDO
!=
TRABAJADOR
!=
ROL
!=
PERMISO
!=
COBERTURA ADMINISTRATIVA
```

El dispositivo puede permanecer autenticado técnicamente durante múltiples cambios de trabajador sin que la continuidad de esa autenticación produzca continuidad de autoridad humana.

---

#### 8. Administrador que configuró o abrió el dispositivo

Que una persona con autoridad administrativa haya configurado, enrolado, iniciado, reparado o abierto un dispositivo no transfiere esa autoridad al siguiente actor.

Se prohíbe interpretar como permiso del trabajador:

- el actor que creó la instancia;
- el actor que instaló o configuró una aplicación;
- el actor que seleccionó una sede, área o plantilla;
- el actor que inició una sesión técnica persistente;
- el actor que ejecutó una operación de soporte;
- el actor que dejó una pantalla administrativa abierta;
- el actor que emitió una decisión o consulta anterior.

La administración técnica del terminal y la autoridad empresarial del trabajador son dominios separados.

---

#### 9. Sesión administrativa previa

Una sesión personal previa no puede mezclarse con una sesión de dispositivo compartido.

Cuando el contexto efectivo pasa a dispositivo compartido:

1. la fuente de principal pasa a representar el dispositivo técnico;
2. el actor empresarial debe resolverse por la sesión de actor correspondiente;
3. la autoridad base debe resolverse para ese actor;
4. cualquier autorización asociada al usuario personal anterior deja de ser reutilizable;
5. una cookie, token de interfaz, caché, estado de servidor o snapshot de la sesión anterior no puede complementar el nuevo actor;
6. si no puede demostrarse la separación, la acción se deniega.

No se permite una composición como:

```text
DISPOSITIVO TECNICO
+
ACTOR OPERATIVO A
+
PERMISOS ADMINISTRATIVOS DE SESION PERSONAL B
=
ALLOW
```

---

#### 10. Trabajador anterior

El cambio de actor no crea una cadena de autoridad acumulativa.

El trabajador nuevo no hereda del anterior:

- rol base;
- rol operativo;
- permisos;
- concesiones individuales;
- denegaciones interpretadas como allows;
- cobertura administrativa;
- turno;
- check-in;
- sede o área operativa;
- selecciones territoriales con efecto autoritativo;
- reautenticaciones;
- firmas de acción;
- decisiones de permiso;
- recursos sensibles abiertos;
- autorizaciones de procesos en curso que requieran el actor original.

`AUTH-DEV-009` define que ninguno de esos elementos puede utilizarse como autoridad del nuevo trabajador. La mecánica completa de cierre, limpieza y handoff del cambio de trabajador continúa reservada a `AUTH-DEV-013`.

---

#### 11. `navigation_role`

`navigation_role` no participa en:

- actor efectivo;
- rol base;
- rol operativo;
- permiso;
- cobertura administrativa;
- sede o área autorizada;
- modalidad de autorización;
- decisión final.

Puede utilizarse únicamente para presentación inicial, menú sugerido, perfil visual o experiencia controlada cuando el contrato de interfaz lo permita.

Queda prohibida cualquier equivalencia de autorización basada en:

```text
navigation_role
-> rol efectivo
```

```text
navigation_role
-> conjunto de permisos
```

```text
navigation_role
-> cobertura administrativa
```

Un valor históricamente presente puede conservarse como dato de compatibilidad o presentación, pero debe ser ignorado por el evaluador autoritativo.

---

#### 12. Aplicaciones, plantillas y paquetes

La disponibilidad de una aplicación significa únicamente que el dispositivo puede exponer esa superficie dentro de su configuración efectiva.

No significa que el trabajador actual tenga:

- acceso a la aplicación;
- capacidades internas de la aplicación;
- autoridad administrativa;
- alcance organizacional;
- acceso a información sensible;
- derecho a ejecutar una mutación.

Las plantillas y paquetes conservan la semántica de techo:

```text
DISPOSITIVO PERMITE
!=
ACTOR TIENE PERMISO
```

Una clave dentro del techo puede continuar siendo denegada al actor. Una clave fuera del techo se deniega aunque el actor la posea.

---

#### 13. Autoridad administrativa legítima del actor actual

La prohibición de herencia no implica prohibición universal de administración desde terminal compartida.

Cuando una plantilla admite una superficie administrativa, el trabajador actual podrá ejercer únicamente sus capacidades propias si todas las condiciones aplicables son válidas.

Ejemplo conceptual:

```text
ACTOR ACTUAL POSEE CAPACIDAD BASE
+
COBERTURA ADMINISTRATIVA DEL MISMO ACTOR
+
RECURSO DENTRO DEL ALCANCE
+
CAPACIDAD DENTRO DEL TECHO DEL DISPOSITIVO
+
APLICACION EFECTIVA
+
REAUTENTICACION FUERTE SI APLICA
+
SIN DENEGACION
=
CAPACIDAD ADMINISTRATIVA POSIBLE
```

La ubicación del terminal, su plantilla administrativa o el principal técnico no añaden cobertura ni capacidades.

---

#### 14. Separación entre carril base y carril operativo

El dispositivo no mezcla los carriles para fabricar autoridad.

Reglas:

1. una capacidad base conserva sus requisitos de rol base, concesiones, cobertura y recurso;
2. una capacidad operativa conserva turno, check-in cuando corresponda, rol operativo, sede, área y recurso;
3. una capacidad de doble condición exige ambos componentes cuando así lo declare su modalidad;
4. el hecho de que el actor cumpla el carril operativo no crea un carril base;
5. el hecho de que el actor posea autoridad base no crea turno, check-in ni rol operativo;
6. el dispositivo no presta un carril faltante;
7. una sesión residual de otro trabajador no completa el carril ausente;
8. un `navigation_role` o paquete no completa ninguno de los dos carriles.

---

#### 15. Reautenticación fuerte, PIN y firma

Las evidencias de autenticación no son transferibles entre actores ni usos incompatibles.

Reglas:

- el PIN o mecanismo ligero de `AUTH-DEV-007` identifica al humano o produce firma ligera, pero no crea autoridad administrativa;
- una firma de acción pertenece al trabajador y operación para los que fue emitida;
- una evidencia STRONG pertenece al actor, aplicación, acción, recurso y vigencia definidos por su contrato;
- cambiar de trabajador invalida el uso autoritativo de la evidencia emitida para el anterior;
- cambiar a un contexto incompatible impide reutilizar la evidencia;
- el dispositivo no puede presentar como propia una reautenticación humana anterior;
- una clave técnica privilegiada no satisface una exigencia de reautenticación humana.

---

#### 16. Estado residual del cliente y del servidor

La implementación posterior deberá tratar como no autoritativos los estados residuales que sobrevivan visual o técnicamente a un cambio de actor o contexto.

Incluye, según el consumidor:

- caché de permisos;
- caché de cobertura;
- snapshots de `AccessContext`;
- respuestas de server actions;
- estado React;
- stores de cliente;
- almacenamiento local o de sesión;
- cookies de navegación o selección;
- datos precargados;
- recursos abiertos por el actor anterior;
- formularios con decisiones sensibles calculadas previamente;
- resultados de una reautenticación anterior.

La persistencia de datos para experiencia o recuperación no implica persistencia de autoridad.

Antes de una acción protegida, el servidor debe revalidar el contexto materialmente necesario. Un resultado viejo solo puede reutilizarse cuando el contrato demuestre que actor, dispositivo, contexto, recurso, versión y vigencia siguen siendo compatibles.

---

#### 17. Credenciales técnicas privilegiadas y clientes administrativos

Una operación ejecutada por infraestructura privilegiada conserva dos planos:

```text
CAPACIDAD TECNICA DE EJECUCION
!=
AUTORIDAD EMPRESARIAL PARA ORDENAR EL EFECTO
```

`service_role`, clientes administrativos, funciones privilegiadas o procesos internos pueden ser necesarios para implementar una operación, pero no conceden al trabajador una capacidad empresarial.

Toda mutación atribuida a un trabajador desde dispositivo compartido debe conservar:

- actor humano efectivo;
- autoridad empresarial evaluada para ese actor;
- dispositivo y principal técnico como contexto técnico;
- recurso y alcance;
- controles adicionales;
- resultado de autorización.

Si solo existe privilegio técnico y no autoridad empresarial resoluble, la operación falla cerrada.

---

#### 18. Territorio y cobertura administrativa

La sede y el área del dispositivo son restricciones o atributos físicos; no son cobertura administrativa del trabajador.

Reglas:

1. una terminal ubicada en oficina no concede organización completa;
2. una terminal ubicada en una sede no concede administración de esa sede;
3. un área física administrativa no concede administración de esa área;
4. un actor con cobertura organizacional legítima no la obtiene del dispositivo, sino de su autoridad humana;
5. un actor con cobertura limitada no puede ampliarla porque el terminal esté en otra sede;
6. una sede o área seleccionada en interfaz no reemplaza la cobertura resuelta;
7. `null` o ausencia no significan todas las sedes o áreas;
8. el recurso real continúa controlando el territorio material de la acción.

---

#### 19. Terminales y modos especiales

##### 19.1 `procurement_reception`

La plantilla conserva modos administrativo y operativo mutuamente excluyentes.

Al cambiar de modo se debe reevaluar el carril aplicable. La autoridad calculada en un modo no se reutiliza en el otro.

El modo administrativo no hereda autoridad del turno operativo y el modo operativo no hereda permisos administrativos de una sesión previa.

##### 19.2 `operations_management_terminal`

La amplitud de aplicaciones y capacidades del terminal sigue siendo un techo operativo.

Coordinar, observar o administrar el flujo operativo no concede por sí mismo capacidades base administrativas ni facultades físicas de otros oficios.

##### 19.3 `management_terminal`

La plantilla administrativa permite una superficie restringida para `shell`, `numera` y `viso`, pero el terminal no crea rol base, cobertura administrativa ni bypass por jerarquía.

Cada capacidad administrativa pertenece al actor actual y conserva sensibilidad, alcance, recurso, reautenticación y denegaciones.

##### 19.4 Plantillas operativas

Las plantillas satélite, producción, bodega y logística no adquieren capacidades administrativas por el nombre de su dispositivo, ubicación, rol de navegación, aplicaciones instaladas ni por haber sido configuradas por un administrador.

---

#### 20. Revalidación e invalidación de autoridad

La reutilización de una decisión administrativa queda invalidada cuando un cambio material pueda alterar su resultado.

Como mínimo, deben considerarse cambios en:

- actor humano;
- sesión de actor;
- principal técnico o dispositivo;
- estado del dispositivo;
- rol base;
- concesiones individuales;
- cobertura administrativa;
- turno o rol operativo cuando la modalidad los requiera;
- sede o área aplicable;
- aplicación;
- techo del dispositivo;
- clasificación de compatibilidad;
- reautenticación;
- recurso;
- estado o versión del recurso;
- denegaciones.

El cambio material exige una decisión nueva o una revalidación equivalente antes del efecto. No se acepta un `ALLOW` histórico como autoridad autónoma.

---

#### 21. Matriz de no herencia sobre las 19 identidades

La política se proyecta sobre el mismo universo canónico de dispositivos y plantillas definido en `AUTH-DEV-001` a `AUTH-DEV-006`.

| Identidad canónica | Clase | Regla de no herencia administrativa | Autoridad humana utilizable | Estado heredado |
| --- | --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` | El usuario técnico, `navigation_role`, apps registrales y cualquier sesión previa no conceden autoridad al cajero o trabajador actual. | Solo la autoridad propia del actor actual dentro del techo candidato y contexto válido. | `REGISTERED_UNVERIFIED` |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` | `same_site_active_worker`, usuario técnico, `navigation_role` y la coincidencia de sede no crean permisos administrativos. | Solo la autoridad propia del actor exacto; el dispositivo permanece restrictivo. | `REGISTERED_UNVERIFIED` |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` | No se infiere administrador, actor, rol, permiso ni cobertura desde la observación física o cuenta conjunta. | Ninguna hasta que exista identidad y actor técnicamente reconciliados; después solo la del actor real. | `OBSERVED_ONLY` |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` | No se infiere autoridad desde dispositivo observado, tipo supuesto, cuenta conjunta ni uso histórico. | Ninguna por observación; una futura instancia deberá resolver al actor real. | `OBSERVED_ONLY` |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` | Caja satélite no hereda privilegios del configurador, principal técnico ni trabajador anterior. | Solo autoridad del actor actual dentro del techo y área exacta. | `POLICY_DEFINED` |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` | Barra no recibe capacidades administrativas por apps, plantilla o navegación. | Solo autoridad propia del actor actual cuando una capacidad aplicable exista. | `POLICY_DEFINED` |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` | Cocina satélite no reutiliza autoridad de caja, gerencia, otro trabajador o sesión previa. | Solo autoridad propia del actor actual y contexto compatible. | `POLICY_DEFINED` |
| `target_template:service_satellite` | `TARGET_TEMPLATE` | Servicio no convierte una cuenta compartida o una pantalla abierta en autoridad administrativa. | Solo autoridad del actor real después de identificación y evaluación. | `POLICY_DEFINED` |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` | Mostrador no hereda autoridad por proximidad con caja, servicio o administrador configurador. | Solo autoridad del actor actual dentro de su contexto. | `POLICY_DEFINED` |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` | Integrar funciones no suma roles, permisos ni autoridades de otros perfiles satélite. | Intersección de autoridad propia del actor con techo y contexto de la acción. | `POLICY_DEFINED` |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` | Producción de Cocina Caliente no hereda autoridad administrativa ni de otras áreas productivas. | Solo autoridad propia del actor; las capacidades operativas conservan el área exacta. | `POLICY_DEFINED` |
| `target_template:production_bakery` | `TARGET_TEMPLATE` | Galletería y Panadería no hereda autoridad administrativa ni de otras áreas productivas. | Solo autoridad propia del actor; las capacidades operativas conservan el área exacta. | `POLICY_DEFINED` |
| `target_template:production_pastry` | `TARGET_TEMPLATE` | Repostería no hereda autoridad administrativa ni de otras áreas productivas. | Solo autoridad propia del actor; las capacidades operativas conservan el área exacta. | `POLICY_DEFINED` |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` | Bodega no convierte `same_site_active_worker`, `navigation_role` o ubicación en rol, permiso o cobertura administrativa. | Solo autoridad propia del actor exacto dentro del techo y área de bodega. | `POLICY_DEFINED` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` | Vehículo, ruta, origen, destino y sedes visitadas no transfieren autoridad administrativa al conductor. | Solo autoridad propia del actor; el terminal conserva límites logísticos. | `POLICY_DEFINED` |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` | Los modos administrativo y operativo no comparten autoridad calculada ni estado autorizante. | En cada modo, solo la autoridad propia del actor y del carril correspondiente. | `POLICY_DEFINED` |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` | La coordinación operativa y la amplitud de superficie no se convierten en rol base ni cobertura administrativa. | Solo autoridad propia del actor para la capacidad exacta; coordinación no suma facultades. | `POLICY_DEFINED` |
| `target_template:management_terminal` | `TARGET_TEMPLATE` | La naturaleza administrativa del terminal, su ubicación y sus aplicaciones no conceden permisos ni cobertura. | Solo permisos base y cobertura administrativa del actor actual, dentro del techo y con STRONG cuando aplique. | `POLICY_DEFINED` |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` | La historia de la plantilla no puede reactivar ni trasladar privilegios a nuevas instancias o actores. | Ninguna autoridad nueva procede de la plantilla retirada. | `NO_APLICA` |

Cobertura materializada:

```text
2 instancias configuradas
+
2 observaciones fisicas
+
14 plantillas objetivo
+
1 plantilla legacy retirada
=
19 identidades con regla explicita de no herencia
```

No se añaden identidades ni se modifica su clasificación heredada.

---

#### 22. Brechas físicas observadas y propietarios

El contrato documental reconoce brechas de implementación ya observables sin autorizarlas ni corregirlas en esta tarea.

##### 22.1 Helpers locales de dispositivo compartido

Existen consumidores donde el modo de dispositivo compartido puede derivar comportamiento autoritativo desde `navigation_role` y donde la aplicación permitida puede tratarse como suficiente para el acceso de entrada.

Eso no satisface el contrato final.

Condición de salida:

- los consumidores deberán utilizar contexto y autorización centralizados;
- `navigation_role` deberá dejar de participar como fuente de permiso;
- la aplicación permitida deberá permanecer como restricción de superficie;
- el actor humano y su autoridad deberán resolverse de forma independiente;
- la compatibilidad con estructuras legacy deberá mantenerse sin conservar autoridad heredada.

Propietarios canónicos: `AUTH-CTX-027`, `AUTH-CTX-028` y las materializaciones físicas aplicables de `AUTH-DEV-009` dentro de los paquetes correspondientes.

##### 22.2 Estado residual entre trabajadores

El contrato prohíbe reutilizar autoridad del actor anterior. La mecánica completa de terminación, limpieza y transición segura entre trabajadores pertenece a `AUTH-DEV-013`.

Condición de salida de esta tarea: la política de no herencia queda definida de forma que `AUTH-DEV-013` pueda limpiar todo estado incompatible sin decidir nuevamente qué autoridad puede transferirse.

##### 22.3 Auditoría final

La tarea actual separa las fuentes y prohíbe su herencia, pero no diseña el registro completo de auditoría conjunta.

Propietario canónico: `AUTH-DEV-010`.

Condición de salida: entregar a esa tarea principal técnico, dispositivo, actor humano y fuente de autoridad como conceptos no intercambiables.

---

#### 23. Handoff exacto hacia AUTH-DEV-010

`AUTH-DEV-009` entrega a `AUTH-DEV-010` una decisión donde la autoridad de la acción puede atribuirse sin contaminación entre identidades:

```text
PRINCIPAL TECNICO IDENTIFICABLE
+
DISPOSITIVO IDENTIFICABLE
+
ACTOR HUMANO ACTUAL IDENTIFICABLE
+
AUTORIDAD RESUELTA SOLO PARA ESE ACTOR
+
FUENTES HEREDADAS EXCLUIDAS
+
CONTEXTO Y RECURSO CORRELACIONABLES
=
BASE LIMPIA PARA AUDITORIA CONJUNTA
```

`AUTH-DEV-010` será responsable de definir cómo registrar conjuntamente dispositivo y trabajador en la auditoría sin fusionar sus identidades.

Esta tarea no define el esquema final del evento, receipt, tabla, payload o almacenamiento de auditoría.

---

#### 24. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

Justificación: el registro vigente ya protege de forma explícita la intersección entre límites del dispositivo y permisos del trabajador, la prohibición de transferir privilegios administrativos al actor operativo, la invalidación de contexto ante cambios de identidad, el recálculo ante cambio de actor o aplicación y la separación entre techo de dispositivo y autoridad humana. Esta tarea desarrolla el contrato documental responsable sin introducir una obligación de prueba nueva ni alterar una obligación existente.

---

#### 25. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-AUTH-001` — una lista local de nombres de rol no concede autorización final;
- `TREQ-AUTH-011` — la autoridad desde dispositivo compartido es la intersección entre límites del dispositivo y permisos del trabajador identificado y el administrador autenticado no transfiere privilegios administrativos al actor operativo;
- `TREQ-AUTH-014` — cambios de trabajador, dispositivo, rol, territorio o contexto invalidan decisiones y autoridad derivada cuando afectan la resolución;
- `TREQ-AUTH-054` — cambio de aplicación o actor exige recálculo e invalida estado y reautenticaciones incompatibles;
- `TREQ-AUTH-056` — las terminales de recepción, gerencia operativa y gerencia administrativa conservan sus restricciones propias sin ampliar cobertura;
- `TREQ-AUTH-062` — toda acción desde dispositivo compartido intersecta autoridad del actor, techo del dispositivo, aplicación, modo, territorio, recurso, prerrequisitos y denegaciones;
- `TREQ-AUTH-063` — las capacidades estándar conservan actor y contexto, las fuertes exigen reautenticación personal y las no permitidas permanecen excluidas.

Estos requisitos se citan únicamente como trazabilidad de cobertura existente y no representan cambios al registro.

---

#### 26. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El contrato es documental y la compilación canónica corresponde al flujo de integración posterior a su inserción en el archivo propietario. |
| LOCAL | NOT_EXECUTED | La comprobación del checkout completo corresponde al flujo documental sobre la rama propia de la tarea. |
| REMOTA | NOT_EXECUTED | No se ha publicado ni fusionado este marcador documental como parte de esta definición. |
| OPERATIVA | NOT_APPLICABLE | La tarea no ejecuta operación empresarial ni modifica comportamiento productivo. |
| FÍSICA | NOT_APPLICABLE | El marcador define el contrato; ninguna instancia física se materializa durante esta tarea. |

---

#### 27. Criterios de aceptación

- [x] Se preserva la separación entre principal técnico, dispositivo y actor humano.
- [x] Se prohíbe que el principal técnico aporte permisos base o cobertura administrativa.
- [x] Se prohíbe heredar autoridad del administrador que configuró o abrió el dispositivo.
- [x] Se prohíbe mezclar una sesión administrativa previa con el actor actual del dispositivo.
- [x] Se prohíbe heredar rol, permisos, cobertura, reautenticación o decisiones del trabajador anterior.
- [x] `navigation_role` queda limitado a presentación y fuera de autorización.
- [x] Las aplicaciones visibles, plantillas y paquetes quedan definidos como límites y no concesiones.
- [x] La sede y área físicas del dispositivo no crean cobertura administrativa.
- [x] Se preservan los carriles base y operativo sin composición permisiva.
- [x] PIN, firma ligera y STRONG no se transfieren entre actores o usos incompatibles.
- [x] Cookies, cachés, snapshots y estado de interfaz no son fuentes autoritativas.
- [x] `service_role` y clientes administrativos no crean autoridad empresarial.
- [x] `procurement_reception` conserva modos excluyentes.
- [x] `operations_management_terminal` conserva naturaleza operativa restrictiva.
- [x] `management_terminal` admite únicamente la autoridad administrativa propia del actor actual.
- [x] Se proyecta una decisión explícita sobre las 19 identidades del universo heredado.
- [x] Se documentan las brechas físicas actuales sin ejecutar modificaciones.
- [x] Se preserva la responsabilidad de `AUTH-DEV-010` sobre la auditoría conjunta.
- [x] Se preserva la responsabilidad de `AUTH-DEV-013` sobre el handoff completo de cambio de trabajador.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el registro 04A.
- [x] No se autorizan cambios físicos.

---

#### 28. Límites

Esta tarea no:

- modifica código, configuración, datos, Supabase, migraciones, RLS, RPC, grants, secretos o aplicaciones;
- modifica el principal técnico ni la identidad de dispositivo aprobados anteriormente;
- redefine cómo se captura o valida PIN o firma ligera;
- redefine la intersección aprobada por `AUTH-DEV-008`;
- elimina capacidades administrativas legítimas del actor humano actual;
- crea un nuevo rol, permiso, paquete, plantilla, aplicación o dispositivo;
- cambia las 19 identidades heredadas ni sus estados documentales;
- cambia los paquetes o techos definidos por `AUTH-DEV-006`;
- cambia la clasificación de compatibilidad de capacidades con dispositivo compartido;
- redefine el carril base ni el carril operativo;
- define el registro final de auditoría de dispositivo y trabajador; pertenece a `AUTH-DEV-010`;
- define revocación de dispositivo o sesión; pertenece a `AUTH-DEV-011`;
- fija duración o expiración numérica de sesión; pertenece a `AUTH-DEV-012`;
- implementa la limpieza completa y transición de cambio de trabajador; pertenece a `AUTH-DEV-013`;
- ejecuta pruebas físicas de NEXO, PULSO o FOGO; pertenecen a `AUTH-DEV-014`, `AUTH-DEV-015` y `AUTH-DEV-016`;
- autoriza una instancia física durante este marcador documental;
- modifica requisitos de prueba existentes.

---

#### 29. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-008 — Combinar límite del dispositivo y trabajador`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-009 — Evitar heredar permisos administrativos`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría`


### ✅ AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría

**Estado:** APROBADA
**Tarea anterior:** AUTH-DEV-009 — Evitar heredar permisos administrativos
**Tarea siguiente:** AUTH-DEV-011 — Permitir revocar un dispositivo
**Tipo de tarea:** documental; contrato canónico de trazabilidad conjunta de dispositivo compartido y trabajador humano en auditoría, con materialización física posterior por `PER_IMPLEMENTATION_UNIT` y gate `POST_E5_PACKAGE`
**Bloque:** BLOQUE P — Dispositivos compartidos
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/P_DISPOSITIVOS_COMPARTIDOS/02_IDENTIFICACION_DEL_TRABAJADOR_Y_AUDITORIA.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo toda operación empresarial originada desde un dispositivo compartido conserva evidencia suficiente para distinguir y correlacionar, sin fusionarlos, al principal técnico, la identidad del dispositivo, el trabajador humano efectivo, la sesión de actor cuando exista, el contexto laboral utilizado, la decisión de autorización y el resultado real de la operación.

La tarea cierra el mini-bloque `AUTH-DEV-007` a `AUTH-DEV-010` mediante una regla de atribución verificable:

```text
DISPOSITIVO COMPARTIDO
+
PRINCIPAL TECNICO
+
TRABAJADOR HUMANO ACTUAL
+
CONTEXTO Y AUTORIDAD RESUELTOS
+
DECISION DE AUTORIZACION
+
RESULTADO DE EJECUCION
=
EVIDENCIA CORRELACIONABLE SIN FUSION DE IDENTIDADES
```

La auditoría no crea autoridad. Su función es demostrar quién o qué presentó la credencial técnica, qué dispositivo intervino, a qué humano se atribuyó la acción, bajo qué contexto fue evaluada y qué ocurrió realmente.

---

#### 2. Handoff recibido de AUTH-DEV-009

`AUTH-DEV-009` entrega cuatro conceptos separados y no intercambiables:

```text
PRINCIPAL TECNICO IDENTIFICABLE
+
DISPOSITIVO IDENTIFICABLE
+
ACTOR HUMANO ACTUAL IDENTIFICABLE
+
FUENTE DE AUTORIDAD PERTENECIENTE AL ACTOR ACTUAL
```

La separación anterior impide que la auditoría reconstruya al trabajador desde:

- el usuario técnico del dispositivo;
- el administrador que creó o configuró el dispositivo;
- el trabajador anterior;
- `navigation_role`;
- una aplicación visible;
- una plantilla;
- un paquete de capacidades;
- un estado residual de interfaz;
- una cookie, caché o decisión previa;
- una credencial técnica privilegiada.

`AUTH-DEV-010` consume esa separación y define cómo conservarla como evidencia.

---

#### 3. Resultado canónico

Toda acción protegida desde dispositivo compartido deberá poder responder de forma reproducible:

1. cuál fue el principal técnico autenticado;
2. cuál fue el `device_id` canónico involucrado;
3. cuál fue el trabajador humano efectivo, si pudo resolverse;
4. qué `actor_session_id` vinculó al trabajador con el dispositivo, cuando aplique;
5. qué aplicación y capacidad exactas fueron evaluadas;
6. qué sede y área efectivas participaron cuando el contrato las requiere;
7. qué rol base y rol operativo participaron cuando correspondan;
8. qué turno y check-in participaron cuando la modalidad los requiere;
9. qué recurso o destino empresarial fue evaluado;
10. qué decisión de autorización se produjo;
11. qué razones estructuradas explican la decisión;
12. qué versión contractual y fuentes versionadas sustentaron la resolución;
13. cuándo ocurrió el hecho y cuándo fue registrado;
14. qué correlación enlaza decisión, intento, ejecución y evidencia;
15. cuál fue el resultado real de ejecución o ausencia de efecto.

Una evidencia que solo conserve el dispositivo o solo conserve al trabajador es insuficiente para una acción empresarial originada desde dispositivo compartido.

---

#### 4. Planos de auditoría que deben permanecer separados

La trazabilidad de dispositivos compartidos conserva cuatro planos relacionados, pero no sustituibles entre sí:

| Plano | Pregunta que responde | Fuente contractual |
| --- | --- | --- |
| ciclo de vida del dispositivo | qué ocurrió con la identidad, configuración, sesión de actor o estado del dispositivo | fundación append-only de auditoría de dispositivo |
| decisión de autorización | por qué una acción fue permitida o denegada | decisión canónica de autorización |
| ejecución empresarial | qué efecto se intentó y qué resultado produjo | acción de servidor y auditoría del dominio propietario |
| correlación | cómo se demuestra que los hechos pertenecen a la misma operación lógica | `authorization_decision_id`, `correlation_id`, causación e idempotencia cuando apliquen |

No se utilizará una fila de ciclo de vida del dispositivo como sustituto de la auditoría empresarial de una venta, recepción, movimiento, producción, redención u otra operación de dominio.

Tampoco se duplicará indiscriminadamente el payload empresarial dentro de la auditoría del dispositivo.

---

#### 5. Contrato de identidad auditada

La evidencia conserva de forma independiente:

```text
principal tecnico
!=
dispositivo
!=
actor humano
!=
rol
!=
sesion de actor
!=
sesion Auth
!=
turno
!=
check-in
```

Para una operación ordinaria desde dispositivo compartido:

```text
principal_type = SHARED_DEVICE
actor_type = EMPLOYEE
attribution_source = DEVICE_ACTOR_SESSION
```

cuando exista una sesión de actor válida y la acción exija actor humano.

El identificador Auth del usuario técnico no se copiará como `employee_id` por conveniencia, aunque dos UUID pudieran coincidir accidentalmente en datos legacy.

---

#### 6. Principal técnico

El principal técnico identifica quién o qué presentó la credencial técnica aceptada para la solicitud.

En un dispositivo compartido deberá conservarse una referencia segura al principal técnico, pero nunca:

- access token;
- refresh token;
- JWT completo;
- contraseña;
- PIN del trabajador;
- secreto de firma;
- API key;
- service role key;
- credencial completa del endpoint.

La existencia de un principal técnico válido no demuestra actor humano, permiso ni decisión `ALLOW`.

---

#### 7. Identidad del dispositivo

La identidad de auditoría del dispositivo usa el `device_id` canónico resuelto en servidor.

Podrán conservarse otras referencias seguras para trazabilidad, como código de dispositivo, endpoint o vínculo de credencial, cuando el contrato físico las provea, pero ninguna sustituye al `device_id` ni adquiere semántica de actor humano.

La auditoría no inferirá sede, área, rol o permiso desde el texto de `device_code`.

Una observación física sin enrolamiento no recibe `device_id` únicamente para completar la auditoría.

---

#### 8. Trabajador humano efectivo

Cuando la acción exige humano, el trabajador auditado es exactamente el empleado resuelto como actor efectivo en servidor.

La fuente válida es la sesión de actor o el mecanismo canónico equivalente, no:

- el último trabajador conocido;
- el empleado que configuró el dispositivo;
- el usuario técnico;
- un `employee_id` enviado por el cliente;
- el nombre mostrado en interfaz;
- el rol operativo esperado;
- la sede del dispositivo;
- el turno de otra persona.

Si el actor no puede resolverse de forma única, no se inventa un trabajador para llenar la auditoría.

---

#### 9. Sesión de actor

Cuando exista sesión de actor válida, la evidencia deberá poder correlacionar:

```text
device_id
+
actor_employee_id
+
actor_session_id
```

La sesión utilizada debe pertenecer al mismo dispositivo, al mismo trabajador y al contexto vigente que participó en la decisión.

La sesión de actor no se convierte en:

- permiso;
- turno;
- check-in;
- reautenticación fuerte;
- bearer token para ejecutar otra acción.

La duración, expiración y renovación numéricas permanecen fuera de esta tarea.

---

#### 10. Administrador del dispositivo y trabajador operativo

Una modificación administrativa sobre el dispositivo y una acción empresarial ejecutada por un trabajador representan atribuciones distintas.

La auditoría física puede conservar, cuando corresponda:

```text
administrative_actor_id
actor_employee_id
technical_principal_id
```

Estos campos no son sinónimos.

`administrative_actor_id` identifica al actor humano que autorizó o realizó una gestión administrativa del dispositivo cuando existe esa decisión.

`actor_employee_id` identifica al trabajador humano al que se atribuye el uso operativo del dispositivo o la sesión de actor.

`technical_principal_id` identifica el principal técnico que presentó la credencial o ejecutó el carril técnico.

Una misma persona puede aparecer legítimamente en más de una dimensión en un caso concreto, pero la semántica no se fusiona por coincidencia de valor.

---

#### 11. Decisión de autorización y ejecución real

La auditoría deberá separar:

```text
AUTORIZACION
```

```text
EJECUCION
```

Una decisión `ALLOW` no demuestra que la operación fue ejecutada.

Una decisión `DENY` demuestra que no existía autorización para producir el efecto solicitado, pero debe conservar evidencia suficiente para investigar el intento cuando las identidades mínimas pudieron resolverse.

Una ejecución confirmada deberá enlazarse con la decisión que la autorizó o con la revalidación equivalente exigida por el contrato del dominio.

---

#### 12. Evidencia mínima de una acción empresarial protegida

Cuando una acción empresarial desde dispositivo compartido sea procesable, la evidencia correlacionable deberá incluir o poder resolver desde referencias inmutables:

- principal técnico y su clase;
- `device_id`;
- `actor_employee_id` o estado de actor no resuelto;
- `actor_session_id` cuando aplique;
- aplicación;
- permiso o capacidad exacta;
- modalidad y carril utilizados cuando sean materiales;
- rol base cuando participe;
- rol operativo cuando participe;
- turno cuando sea requerido;
- check-in cuando sea requerido;
- sede efectiva;
- área efectiva cuando aplique;
- recurso o descriptor de destino;
- decisión;
- razones;
- versión contractual;
- referencias de fuentes y fingerprints disponibles;
- timestamp del hecho;
- correlación con el intento lógico;
- resultado de ejecución o ausencia de efecto.

No se exige duplicar una misma dimensión en todas las tablas físicas si puede reconstruirse de forma inequívoca mediante referencias inmutables y correlacionadas.

---

#### 13. Uso de la fundación física AUTH-DB-014

La fundación física de auditoría de dispositivo ya existe y se consume como contrato, no se redefine.

La materialización posterior de `AUTH-DEV-010` deberá reutilizar la familia física existente de:

- raíz auditable del dispositivo;
- revisiones append-only;
- eventos append-only;
- intentos;
- vínculos de evidencia;
- correcciones auditadas.

La tarea no crea una tabla paralela de auditoría de dispositivos ni un segundo writer canónico.

La adopción progresiva de writers físicos permanece bajo su propietario de transición y las futuras unidades de implementación consumidoras deberán usar la superficie canónica correspondiente.

---

#### 14. Catálogo de eventos: reutilizar, no inventar

La auditoría física ya posee un catálogo de eventos de ciclo de vida y sesión de actor.

Para el ámbito de trabajador y dispositivo son relevantes, entre otros, los eventos existentes:

```text
ACTOR_SESSION_STARTED
ACTOR_SESSION_ENDED
ACTOR_SESSION_EXPIRED
ACTOR_SESSION_REVOKED
ACTOR_CHANGED
```

La tarea no crea un tipo de evento genérico adicional para representar cada acción empresarial dentro del catálogo de lifecycle del dispositivo.

Las acciones empresariales se auditan mediante la decisión de autorización, la evidencia de ejecución y el dominio propietario, enlazadas al dispositivo mediante referencias de identidad y correlación.

Si una operación empresarial coincide además con un cambio real de lifecycle del dispositivo o de su sesión de actor, ambos hechos se conservan como eventos distintos y correlacionables.

---

#### 15. Cambio de trabajador

El cambio de trabajador debe ser reconstruible históricamente sin reescribir la identidad anterior.

La auditoría deberá permitir demostrar:

```text
SESION ANTERIOR TERMINA O DEJA DE SER VIGENTE
+
CAMBIO DE ACTOR CORRELACIONADO
+
NUEVA SESION DEL NUEVO ACTOR
=
HISTORIA DE HANDOFF RECONSTRUIBLE
```

No es obligatorio representar los dos trabajadores en una sola fila si la secuencia de eventos y sus correlaciones permite reconstruir inequívocamente el antes y el después.

`AUTH-DEV-013` conserva la responsabilidad de definir la mecánica completa del cambio, limpieza de estado, invalidación y nuevo actor. Esta tarea únicamente exige que ese cambio sea auditable.

---

#### 16. Acción permitida

Una acción permitida desde dispositivo compartido requiere como mínimo:

1. principal técnico válido;
2. dispositivo válido;
3. actor humano válido cuando el contrato lo exige;
4. autoridad del actor resuelta sin herencia administrativa;
5. techo del dispositivo aplicado;
6. aplicación permitida;
7. contexto y territorio válidos;
8. permiso exacto;
9. ausencia de denegaciones aplicables;
10. decisión `ALLOW` válida;
11. ejecución empresarial realizada o resultado no ejecutado explícito;
12. evidencia correlacionable.

La auditoría no corrige una falla de autorización. Registra el resultado de la evaluación y de la ejecución.

---

#### 17. Acción denegada

Cuando el servidor puede resolver identidad mínima y producir una decisión válida, una denegación deberá conservar evidencia suficiente del intento.

Como mínimo, según disponibilidad autoritativa:

- principal;
- dispositivo;
- actor efectivo o `UNRESOLVED`;
- capacidad solicitada;
- recurso o intento de recurso;
- territorio resoluble;
- decisión `DENY`;
- razones estructuradas;
- timestamp;
- correlación.

Una denegación no fabrica un `after` ni un resultado empresarial exitoso.

---

#### 18. Dispositivo sin actor humano resoluble

Un dispositivo puede conservar eventos técnicos de lifecycle sin poseer actor humano.

Pero si una acción empresarial requiere actor y no existe una sesión de actor válida:

```text
principal tecnico = RESUELTO

device_id = RESUELTO

actor_type = UNRESOLVED

actor_employee_id = null

NO PRODUCE EFECTO EMPRESARIAL
```

La auditoría registra el estado no resuelto cuando exista una decisión o intento auditable; no reutiliza el último empleado para completar campos.

---

#### 19. Fallo técnico antes de una decisión válida

Un fallo técnico previo a la construcción de una decisión de autorización completa no se convierte artificialmente en `DENY` y no genera un `decision_id` ficticio.

La telemetría técnica y la auditoría empresarial permanecen separadas.

Cuando el fallo impide construir evidencia mínima coherente:

```text
NO DECISION FABRICADA
+
NO ACTOR INVENTADO
+
NO EFECTO EMPRESARIAL AFIRMADO
+
TELEMETRIA TECNICA SEPARADA
```

La política transversal de indisponibilidad técnica conserva su propietario canónico fuera de esta tarea.

---

#### 20. Sede y área

Para acciones empresariales, la auditoría utiliza la sede y el área efectivas que participaron realmente en la decisión.

No utiliza como sustituto:

- sede física del dispositivo cuando el contrato evalúa otra dimensión territorial;
- sede seleccionada por interfaz;
- área seleccionada;
- nombre de plantilla;
- ubicación inferida desde `device_code`;
- último contexto del trabajador anterior.

Cuando el dispositivo impone una restricción territorial adicional, la evidencia debe permitir distinguir la restricción del dispositivo del territorio resuelto para el trabajador y el recurso.

---

#### 21. Aplicación, permiso y recurso

La trazabilidad debe conservar la capacidad concreta que fue evaluada.

Una aplicación abierta no sustituye el permiso exacto.

Un permiso de entrada a aplicación no sustituye una capacidad interna.

El recurso o destino empresarial debe quedar correlacionado cuando el contrato de la operación lo requiera.

Los nombres visuales, rutas o etiquetas no se utilizan como identificadores autoritativos de permiso.

---

#### 22. Infraestructura privilegiada

Una operación puede necesitar infraestructura privilegiada para persistir un efecto.

Se mantiene:

```text
CAPACIDAD TECNICA DE EJECUCION
!=
AUTORIDAD EMPRESARIAL DEL ACTOR
```

`service_role`, admin clients, funciones privilegiadas o procesos internos no se registran como explicación suficiente de la autorización empresarial.

La auditoría debe conservar quién fue el actor empresarial y qué decisión autorizó el efecto, aunque la escritura física haya sido ejecutada por infraestructura técnica privilegiada.

---

#### 23. Firma o PIN del trabajador

El PIN o mecanismo ligero es un secreto efímero y nunca forma parte del contenido auditable persistente.

Cuando una acción exige firma individual, la auditoría puede conservar una referencia opaca de firma o evidencia de validación vinculada al actor y a la operación, pero nunca:

- el PIN;
- una copia reversible del secreto;
- el valor completo de una credencial;
- un hash reutilizable como credencial;
- el secreto dentro de `event_payload`;
- el secreto dentro de logs, métricas o receipts.

La referencia de firma tampoco concede autoridad por sí sola.

---

#### 24. Tiempo del hecho y tiempo de registro

La auditoría conserva separados conceptualmente:

```text
occurred_at
```

y:

```text
recorded_at
```

Un evento retrasado, sincronizado posteriormente o importado desde una fuente legacy no se presenta como ocurrido en el momento de ingestión.

La diferencia temporal tampoco permite ejecutar con una autorización histórica obsoleta. Las operaciones que se sincronizan después deben respetar sus contratos de reautorización, idempotencia y frescura.

---

#### 25. Correlación, causación e idempotencia

Una misma operación lógica debe poder enlazar, según aplique:

- intento;
- decisión;
- evento de dispositivo;
- cambio de sesión de actor;
- ejecución empresarial;
- retry;
- corrección;
- rollback o compensación.

`correlation_id` no concede permiso.

Una idempotency key no concede permiso.

Un reintento no reutiliza una decisión obsoleta como autoridad.

La duplicación técnica del mismo source operation no puede producir una historia contradictoria ni dos efectos empresariales cuando el contrato exige idempotencia.

---

#### 26. Inmutabilidad y correcciones

La evidencia histórica es append-only.

Una corrección posterior no reescribe silenciosamente:

- el actor original;
- el dispositivo original;
- el timestamp del hecho;
- la decisión original;
- el resultado original;
- la fuente original.

La corrección debe producir nueva evidencia enlazada al hecho corregido, conservando el histórico previo.

Un cambio de nombre, plantilla o configuración posterior del dispositivo no reinterpreta retroactivamente acciones antiguas.

---

#### 27. Importación de evidencia legacy

Los eventos legacy existentes pueden conservarse como evidencia histórica importada cuando la fundación física los clasifique como tales.

Una importación legacy no demuestra automáticamente:

- conformidad actual;
- identidad física verificada;
- sesión de actor válida;
- contexto completo;
- decisión canónica histórica si nunca existió;
- operación actual del dispositivo.

Queda prohibido fabricar campos faltantes para hacer parecer completa una fila histórica parcial.

---

#### 28. Estado físico observado

La fundación física append-only de auditoría de dispositivo se encuentra materializada y verificada en `vento-shell`.

Al mismo tiempo, la adopción por consumidores permanece incompleta:

- existe infraestructura legacy de `shared_operational_device_events`;
- la creación administrativa de dispositivos observada continúa escribiendo directamente en la superficie legacy;
- no se encontró adopción de aplicación del writer canónico de eventos de dispositivo en la revisión actual;
- los eventos legacy conservan valor histórico, pero no constituyen una segunda fuente canónica;
- no existen evidencias suficientes para declarar operación integral conforme de las estaciones compartidas.

Este estado observado no autoriza cambios de código, migraciones, RPC, RLS, datos ni configuración durante esta tarea documental.

---

#### 29. Cobertura de las 19 identidades heredadas

La tarea consume exactamente el universo de 19 identidades documentales aprobado por `AUTH-DEV-001` a `AUTH-DEV-006`.

| `inventory_key` | Clase | Decisión de auditoría | Estado documental |
| --- | --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` | Toda operación futura conforme debe correlacionar dispositivo y actor humano; la evidencia registral actual no certifica runtime ni actor. | `REGISTERED_UNVERIFIED` |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` | Toda operación futura conforme debe correlacionar dispositivo y actor humano; la evidencia registral actual no certifica runtime ni actor. | `REGISTERED_UNVERIFIED` |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` | No puede auditarse como dispositivo canónico hasta demostrar enrolamiento e identidad; conservar únicamente la observación de origen. | `OBSERVED_ONLY` |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` | No puede auditarse como dispositivo canónico hasta demostrar enrolamiento e identidad; conservar únicamente la observación de origen. | `OBSERVED_ONLY` |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá aplicar la trazabilidad dispositivo-trabajador; una plantilla por sí sola no emite eventos de runtime. | `POLICY_DEFINED` |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá aplicar la trazabilidad dispositivo-trabajador; una plantilla por sí sola no emite eventos de runtime. | `POLICY_DEFINED` |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá aplicar la trazabilidad dispositivo-trabajador; una plantilla por sí sola no emite eventos de runtime. | `POLICY_DEFINED` |
| `target_template:service_satellite` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá aplicar la trazabilidad dispositivo-trabajador; una plantilla por sí sola no emite eventos de runtime. | `POLICY_DEFINED` |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá aplicar la trazabilidad dispositivo-trabajador; una plantilla por sí sola no emite eventos de runtime. | `POLICY_DEFINED` |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá aplicar la trazabilidad dispositivo-trabajador; la integración funcional no fusiona actores ni auditorías. | `POLICY_DEFINED` |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá registrar actor, dispositivo y área efectiva exacta de la operación. | `POLICY_DEFINED` |
| `target_template:production_bakery` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá registrar actor, dispositivo y área efectiva exacta de la operación. | `POLICY_DEFINED` |
| `target_template:production_pastry` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá registrar actor, dispositivo y área efectiva exacta de la operación. | `POLICY_DEFINED` |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá registrar actor humano, dispositivo, territorio y capacidad exacta sin usar la política legacy como atribución suficiente. | `POLICY_DEFINED` |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` | Toda futura instancia derivada deberá correlacionar actor y dispositivo sin convertir ruta, vehículo u origen/destino en identidad humana. | `POLICY_DEFINED` |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` | La evidencia deberá distinguir el modo administrativo u operativo realmente evaluado y conservar el actor correspondiente sin mezclar carriles. | `POLICY_DEFINED` |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` | La evidencia deberá identificar al trabajador y capacidad exactos; la amplitud de superficies no convierte coordinación en ejecución de otros oficios. | `POLICY_DEFINED` |
| `target_template:management_terminal` | `TARGET_TEMPLATE` | Toda acción administrativa deberá atribuirse al humano actual y a su autoridad real; la terminal y el principal técnico no son el administrador empresarial. | `POLICY_DEFINED` |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` | Conserva únicamente historia; no admite nuevas instancias ni nuevos eventos de runtime como plantilla objetivo. | `NO_APLICA` |

Resultado de cobertura:

```text
19 identidades esperadas
=
2 CONFIGURED_INSTANCE
+
2 PHYSICAL_OBSERVATION
+
14 TARGET_TEMPLATE
+
1 RETIRED_LEGACY_TEMPLATE

19 decisiones materializadas documentalmente
0 faltantes
0 duplicados
```

---

#### 30. Casos especiales de terminal

##### 30.1 `procurement_reception`

Los modos administrativo y operativo permanecen mutuamente excluyentes.

La auditoría debe conservar cuál modo participó en la decisión y qué actor humano fue resuelto.

Un mismo dispositivo no permite fusionar en una sola autoridad el carril administrativo y el operativo.

##### 30.2 `operations_management_terminal`

La terminal puede exponer una superficie operativa amplia, pero cada acción auditada conserva la capacidad exacta, el actor real y el territorio efectivo.

No se registra el nombre de la terminal como sustituto del oficio ejecutado.

##### 30.3 `management_terminal`

Una acción administrativa desde esta terminal se atribuye al humano actual y a su carril base real.

La ubicación física, plantilla, app visible, principal técnico o uso previo por otro administrador no explican por sí solos la autorización.

---

#### 31. Relación con AUTH-SRV-014

`AUTH-SRV-014` conserva la atribución general de las acciones protegidas.

`AUTH-DEV-010` especializa esa obligación para dispositivos compartidos y exige que la evidencia pueda correlacionar simultáneamente:

```text
principal_type = SHARED_DEVICE
+
device_id
+
actor_type = EMPLOYEE o UNRESOLVED
+
actor_session_id cuando exista
+
contexto aplicable
+
decision_id cuando exista
+
resultado de ejecucion
```

No se crea un segundo `operational_actor_id` cuando el actor efectivo ya identifica al trabajador.

---

#### 32. Relación con AUTH-DB-014

`AUTH-DB-014` es la fundación física propietaria de la auditoría de dispositivos.

`AUTH-DEV-010` no cambia sus tablas, constraints, funciones, event catalog, ownership, ACL, fingerprints ni contrato físico.

Las futuras materializaciones consumidoras deberán respetar el contrato físico vigente en vez de escribir una interpretación paralela.

---

#### 33. Relación con AUTH-DB-020

La adopción progresiva de writers y objetos físicos permanece bajo `AUTH-DB-020` cuando corresponda a transición de base de datos.

Por tanto, esta tarea documental:

- identifica la necesidad de consumo del writer canónico;
- prohíbe crear una segunda fuente de auditoría;
- no migra por sí misma consumidores legacy;
- no retira por sí misma la superficie legacy;
- no modifica bases de datos.

Las unidades físicas posteriores deberán coordinar su consumo con la transición física aprobada, sin duplicar ownership.

---

#### 34. Privacidad y minimización

La auditoría debe conservar evidencia suficiente sin copiar datos que no son necesarios para demostrar la operación.

Queda prohibido persistir por conveniencia:

- secretos;
- PIN;
- tokens;
- credenciales completas;
- contraseñas temporales;
- payloads completos de formularios si contienen datos no necesarios;
- datos personales ajenos al propósito de auditoría;
- snapshots completos de recursos cuando bastan campos mínimos o referencias.

Los identificadores y fingerprints de evidencia no deben funcionar como credenciales reutilizables.

---

#### 35. Ausencia, nulidad e invalidez

La auditoría distingue:

```text
actor no requerido
```

```text
actor requerido pero no resuelto
```

```text
actor resuelto
```

```text
evidencia no disponible por fallo tecnico
```

`null` no significa automáticamente cualquiera de estos estados.

Cuando una dimensión es obligatoria y no puede resolverse, la acción falla cerrada conforme al contrato de autorización propietario.

La ausencia de un campo opcional no convierte una evidencia incompleta en una evidencia válida si el contrato exigía ese dato.

---

#### 36. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Requisitos creados: 0.

Requisitos modificados: 0.

Justificación: las obligaciones de atribución conjunta de dispositivo y trabajador, no transferencia de privilegios, auditoría de decisiones y acciones protegidas, e integridad de identidad de dispositivo ya están cubiertas por requisitos canónicos vigentes. Esta tarea cierra la responsabilidad documental y la enlaza con la fundación física ya existente sin introducir una regla de prueba nueva ni modificar el registro modular 04A.

---

#### 37. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro vigente:

- `TREQ-AUTH-011` — exige intersección de autoridad en dispositivo compartido, prohíbe transferencia administrativa y obliga a registrar dispositivo, principal, actor, sede, área y cambio de trabajador;
- `TREQ-AUTH-015` — exige evidencia correlacionable de principal, actor, roles, turno, check-in, territorio, dispositivo, permiso, recurso, decisión, razones, versión y timestamp, también en denegaciones, reintentos, rollback y operaciones administrativas;
- `TREQ-AUTH-019` — mantiene separadas las identidades de dispositivo, endpoint, activo, estación, principal técnico y actor humano;
- `TREQ-AUTH-021` — exige vínculo técnico único, explícito, versionado y server-side sin exposición de secretos;
- `TREQ-PASS-029` — exige que mutaciones PULSO-PASS desde dispositivo compartido vinculen principal técnico, actor humano, dispositivo, sede, permiso y resultado.

Estos identificadores se citan únicamente como trazabilidad de cobertura existente y no representan cambios al registro.

---

#### 38. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación canónica deberá ejecutarse después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores contra el checkout local del usuario durante la preparación documental. |
| REMOTA | `NOT_EXECUTED` | Se revisaron fuentes remotas como insumo documental, pero no se ejecutó una validación runtime o de repositorio remoto que autorice declarar PASS. |
| OPERATIVA | `NOT_APPLICABLE` | La tarea no autoriza operación real de dispositivos ni cambios de proceso. |
| FÍSICA | `NOT_APPLICABLE` | La tarea no autoriza cambios físicos, migraciones, RPC, RLS, datos, aplicaciones ni configuración. |

---

#### 39. Criterios de aceptación

- [x] El principal técnico y el trabajador humano permanecen separados.
- [x] El `device_id` y el actor humano quedan simultáneamente trazables cuando la acción exige humano.
- [x] La sesión de actor se correlaciona sin convertirse en permiso, turno o check-in.
- [x] El administrador del dispositivo y el trabajador operativo no se fusionan por conveniencia.
- [x] La autoridad de la acción sigue perteneciendo al actor humano y a su contexto, no a la auditoría.
- [x] La decisión de autorización y el resultado de ejecución permanecen separados.
- [x] Las denegaciones conservan atribución mínima cuando puede resolverse.
- [x] Un actor no resuelto no se completa usando el último trabajador.
- [x] Un fallo técnico no fabrica `DENY`, actor ni decisión.
- [x] El PIN y los secretos quedan fuera de la evidencia persistente.
- [x] `occurred_at` y `recorded_at` mantienen semánticas distintas.
- [x] Correlación e idempotencia no se convierten en autoridad.
- [x] La historia permanece append-only y las correcciones generan nueva evidencia.
- [x] Los eventos legacy se preservan sin fabricar conformidad histórica.
- [x] Se reutiliza la fundación física de `AUTH-DB-014` sin crear una auditoría paralela.
- [x] No se inventa un nuevo event type empresarial dentro del catálogo de lifecycle del dispositivo.
- [x] Se reconoce la adopción legacy todavía incompleta sin autorizar su corrección física aquí.
- [x] La matriz cubre exactamente 19 identidades heredadas.
- [x] La distribución permanece 2 + 2 + 14 + 1.
- [x] Las dos observaciones físicas no reciben `device_id` por inferencia.
- [x] Las plantillas objetivo no generan eventos de runtime por existir documentalmente.
- [x] `procurement_reception` conserva modos excluyentes.
- [x] `operations_management_terminal` no convierte coordinación en ejecución de otros oficios.
- [x] `management_terminal` atribuye administración al humano real y no al terminal.
- [x] Se conserva el ownership físico de `AUTH-DB-014`, `AUTH-DB-020` y `AUTH-SRV-014`.
- [x] No se absorbe la mecánica de revocación de `AUTH-DEV-011`.
- [x] No se absorbe expiración de `AUTH-DEV-012`.
- [x] No se absorbe cambio de trabajador de `AUTH-DEV-013`.
- [x] No se ejecutan las pruebas físicas de `AUTH-DEV-014` a `AUTH-DEV-016`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica 04A.
- [x] No se autorizan cambios físicos.

---

#### 40. Cierre del mini-bloque AUTH-DEV-007 a AUTH-DEV-010

El mini-bloque queda contractualmente compuesto por cuatro responsabilidades no solapadas:

```text
AUTH-DEV-007
-> identificar al trabajador real mediante prueba humana ligera

AUTH-DEV-008
-> combinar restrictivamente autoridad humana y techo del dispositivo

AUTH-DEV-009
-> impedir herencia administrativa del principal, actores previos o estado residual

AUTH-DEV-010
-> conservar dispositivo y trabajador como evidencia correlacionable de la accion
```

Resultado conjunto:

```text
IDENTIDAD HUMANA RESUELTA
+
AUTORIDAD RESTRINGIDA
+
NO HERENCIA ADMINISTRATIVA
+
AUDITORIA CONJUNTA
=
CONTRATO DOCUMENTAL COMPLETO DE IDENTIFICACION Y ATRIBUCION EN DISPOSITIVO COMPARTIDO
```

Este cierre documental no equivale a materialización física ni a certificación de los dispositivos observados.

---

#### 41. Handoff exacto hacia AUTH-DEV-011

`AUTH-DEV-010` entrega a `AUTH-DEV-011` una cadena auditable donde la identidad del dispositivo, el principal técnico y el actor humano no se confunden y los cambios de lifecycle pueden conservar evidencia append-only.

El handoff mínimo es:

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

`AUTH-DEV-011` conserva exclusivamente la responsabilidad de definir la revocación operativa del dispositivo y sus efectos de acceso. Esta tarea no desarrolla esa política.

---

#### 42. Límites

Esta tarea no:

- crea ni modifica tablas de auditoría;
- crea migraciones;
- modifica Supabase;
- modifica RLS, RPC, grants, funciones o triggers;
- cambia el catálogo físico de eventos;
- crea un nuevo writer de auditoría;
- retira la superficie legacy;
- migra consumidores físicos;
- cambia código de VISO, NEXO, FOGO, PULSO, ORIGO, SHELL u otras aplicaciones;
- define retención numérica de auditoría;
- define TTL de sesión o firma;
- define límites de intentos o lockout;
- define la mecánica de revocación de `AUTH-DEV-011`;
- define la expiración de `AUTH-DEV-012`;
- define la mecánica completa de cambio de trabajador de `AUTH-DEV-013`;
- ejecuta pruebas físicas de `AUTH-DEV-014`, `AUTH-DEV-015` o `AUTH-DEV-016`;
- modifica el modelo de identidad aprobado por `AUTH-DEV-002`;
- modifica sede, área, aplicaciones o techo del dispositivo;
- modifica la intersección aprobada por `AUTH-DEV-008`;
- reabre la no herencia administrativa de `AUTH-DEV-009`;
- modifica `AUTH-DB-014` ni su instancia física verificada;
- absorbe la adopción de writers propietaria de `AUTH-DB-020`;
- sustituye la atribución general de acciones protegidas definida por `AUTH-SRV-014`;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- asigna ni autoriza una instancia física durante este trabajo documental.

---

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-DEV-009 — Evitar heredar permisos administrativos`

**TAREA ACTUAL APROBADA**
`AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-011 — Permitir revocar un dispositivo`
