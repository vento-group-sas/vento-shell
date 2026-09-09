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


### [ ] AUTH-DEV-008 — Combinar límite del dispositivo y trabajador
### [ ] AUTH-DEV-009 — Evitar heredar permisos administrativos
### [ ] AUTH-DEV-010 — Registrar dispositivo y trabajador en auditoría
