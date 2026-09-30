### MINI-BLOQUE — PRUEBAS INTEGRALES DE AUTORIZACIÓN

<!-- PLAN-SECTION-META:START -->
**Cobertura canónica:** `AUTH-QA-001` a `AUTH-QA-030` — 30 tareas.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AUTH-QA -->
### Reconciliación topológica de AUTH-QA-001 a AUTH-QA-030

Cada paquete ejecuta el subconjunto integral aplicable y, después de todos los paquetes, se conserva una certificación global sin duplicar implementaciones.

| modalidad | `PER_PACKAGE_AND_GLOBAL_FINAL` |
| gate temporal | `POST_E5_PACKAGE` |

### ✅ AUTH-QA-001 — Propietario sin check-in entra a administración

**Estado:** APROBADA
**Tarea anterior:** AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO
**Tarea siguiente:** AUTH-QA-002 — Gerente general sin check-in entra a administración
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización reutilizable por paquete y certificable globalmente, para demostrar que un propietario activo puede usar capacidades administrativas autorizadas sin turno ni check-in sin obtener por ello permisos implícitos ni bypass operativo
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-001::<package_id>` y la certificación `AUTH-QA-001::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un actor laboral activo con rol base `propietario` puede ingresar al carril administrativo y ejecutar una capacidad administrativa explícitamente autorizada aunque no tenga turno vigente ni check-in activo, sin convertir el nombre del rol en un wildcard ni permitir que esa ausencia de contexto operativo habilite acciones operativas.

La condición central es:

```text
EMPLEADO ACTIVO
+
ROL BASE propietario
+
PERMISO ADMINISTRATIVO EXACTO Y VIGENTE
+
ALCANCE ADMINISTRATIVO COMPATIBLE
+
SIN TURNO
+
SIN CHECK-IN
→
ALLOW ADMINISTRATIVO
```

pero simultáneamente:

```text
ROL propietario
+
SIN PERMISO EXACTO
→
DENY
```

Y:

```text
ROL propietario
+
SIN CONTEXTO OPERATIVO REQUERIDO
+
ACCIÓN OPERATIVA
→
NO ALLOW OPERATIVO
```

La prueba certifica una frontera de autorización ya definida. No crea permisos, grants, roles, rutas ni bypasses.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con tres resultados obligatorios e inseparables:

1. **administración sin check-in permitida cuando corresponde:** la ausencia de turno y check-in no bloquea una capacidad administrativa cuyo contrato no los exige y cuyo permiso exacto está vigente;
2. **cero wildcard por propietario:** el rol `propietario` no autoriza una capacidad administrativa cuyo permiso exacto no esté concedido o esté inactivo;
3. **cero bypass operativo:** una acción operativa que requiera turno, check-in, rol operativo, sede, área u otro contexto no puede reutilizar el resultado administrativo como autorización.

La certificación falla si solo se demuestra el primer punto y no los dos controles negativos.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- el modelo de roles administrativos globales, donde `propietario` tiene alcance natural de organización pero no permisos implícitos ni bypass operativo;
- la regla `requires_shift_for_administration = false` para capacidades administrativas compatibles;
- la regla `requires_checkin_for_administration = false` para capacidades administrativas compatibles;
- la prohibición de usar `role = propietario`, `is_owner()` o equivalentes como autorización final;
- la separación entre carril administrativo y carril operativo;
- el contrato de `AccessContext`, donde turno y check-in solo participan cuando el permiso evaluado los exige;
- la política de SHELL donde la visibilidad procede de una decisión efectiva de `app.access`, no del nombre del rol;
- la obligación de que UI, SDK, servidor, RPC y RLS produzcan decisiones equivalentes para las mismas entradas;
- la auditoría correlacionable de actor, permiso, alcance, contexto, decisión y resultado;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` y el gate `POST_E5_PACKAGE` aplicables al BLOQUE U.

Esta tarea no modifica ninguno de esos contratos.

---

#### 4. Semántica exacta de “entra a administración”

“Entrar a administración” significa que el actor puede acceder al carril, aplicación o superficie administrativa que corresponda al paquete probado **únicamente cuando la autorización efectiva de entrada y de la capacidad concreta produzca `ALLOW`**.

No significa:

- acceso universal a todas las aplicaciones;
- acceso automático a VISO, NUMERA, NEXO, FOGO, ORIGO, PULSO, AURA o PASS;
- permiso para toda acción visible en una aplicación;
- permiso operativo;
- permiso financiero;
- permiso reservado de propietario no concedido;
- acceso por nombre de rol;
- creación automática de turno o check-in.

Una tarjeta visible, una ruta accesible o una experiencia administrativa seleccionada son presentación de una decisión previa; nunca su fuente.

---

#### 5. Unidad de prueba

Cada ejecución física posterior debe probar una **capacidad administrativa concreta** incluida en el `package_id` aplicable.

La unidad mínima queda compuesta por:

```text
ACTOR CONTROLADO
+
PERMISO ADMINISTRATIVO BAJO PRUEBA
+
RECURSO / ALCANCE BAJO PRUEBA
+
SUPERFICIE DE ENTRADA APLICABLE
+
EVALUADOR SERVER-SIDE APLICABLE
+
PERSISTENCIA / RPC / RLS APLICABLES
+
EVIDENCIA CORRELACIONADA
```

La tarea no selecciona un `package_id` ni una aplicación específica. Cada paquete ejecuta únicamente el subconjunto que realmente materialice esa capacidad.

---

#### 6. Fixture positivo obligatorio

La ejecución deberá construir un fixture controlado con estas propiedades mínimas:

| Dimensión | Valor requerido |
| --- | --- |
| tipo de actor | `EMPLOYEE` |
| identidad | autenticada, resoluble y no simulada |
| trabajador | activo |
| rol base | `propietario` |
| permiso bajo prueba | administrativo, exacto, activo y concedido |
| alcance | compatible con el contrato del permiso |
| turno aplicable | ausente cuando la capacidad administrativa no lo requiera |
| check-in aplicable | ausente cuando la capacidad administrativa no lo requiera |
| rol operativo | no utilizado como fuente del `ALLOW` administrativo |
| dispositivo | válido cuando el contrato de la superficie lo exija |
| recurso | existente, vigente y dentro del alcance autorizado |
| simulación | desactivada |

La ausencia de turno o check-in debe ser deliberada y demostrable, no una omisión desconocida del fixture.

---

#### 7. Oracle positivo

Con el fixture positivo, la prueba debe demostrar de forma conjunta:

1. el actor se resuelve como trabajador activo;
2. el rol base se resuelve como `propietario`;
3. el permiso exacto de la capacidad administrativa está concedido y vigente;
4. el alcance administrativo requerido se resuelve sin fabricar contexto operativo;
5. la ausencia de turno no produce denegación cuando el permiso no lo exige;
6. la ausencia de check-in no produce denegación cuando el permiso no lo exige;
7. la decisión final es `ALLOW` únicamente para la capacidad administrativa evaluada;
8. la superficie administrativa aplicable puede presentarse o ejecutarse según su contrato;
9. no se crea turno, check-in, rol operativo, sede operativa ni área operativa ficticios;
10. la evidencia conserva el permiso y el alcance que produjeron el resultado.

---

#### 8. Control negativo de permiso

La misma identidad `propietario`, con el mismo estado laboral y la misma ausencia de turno/check-in, debe probarse con el permiso exacto bajo prueba ausente, inactivo o explícitamente denegado según el caso aplicable.

Resultado obligatorio:

```text
ROL propietario
+
PERMISO EXACTO NO EFECTIVO
→
DENY
```

La prueba falla si el sistema concede por cualquiera de estas causas:

- nombre del rol;
- helper `is_owner()`;
- lista local de roles privilegiados;
- UI visible;
- sesión válida;
- alcance organizacional del rol;
- pertenencia al grupo de administradores;
- acceso previo cacheado.

---

#### 9. Control negativo operativo

Con la identidad positiva de propietario y sin turno/check-in, se seleccionará una capacidad del paquete cuyo contrato sea operativo y exija contexto operativo.

El resultado debe demostrar que el `ALLOW` administrativo anterior no se reutiliza.

Cuando el contrato operativo requiera alguno de estos elementos:

- turno vigente;
- check-in activo;
- rol operativo;
- sede operativa;
- área operativa;
- compatibilidad territorial;
- prerrequisito de dispositivo;

la ausencia correspondiente debe impedir el `ALLOW` operativo.

La prueba no exige una razón textual única si el contrato propietario define otra razón estructurada; sí exige que el resultado sea no ejecutable y que no exista efecto empresarial.

---

#### 10. Separación entre visibilidad y autoridad

El escenario debe distinguir:

```text
VISIBLE
≠
AUTHORIZED_FOR_ACTION
```

Y:

```text
ADMINISTRATIVE_ENTRY_ALLOWED
≠
ALL_ADMINISTRATIVE_ACTIONS_ALLOWED
```

La prueba deberá confirmar que:

- SHELL no inventa acceso por `propietario`;
- `app.access` se evalúa por su contrato propio;
- entrar a una aplicación no concede sus permisos internos;
- una acción protegida vuelve a autorizarse en servidor;
- una tarjeta oculta o visible no altera la decisión server-side.

---

#### 11. Paridad de evaluadores

Para la misma combinación de principal, actor, permiso, alcance, recurso y contexto, las capas aplicables dentro del paquete deben ser equivalentes.

Según las superficies realmente materializadas, la certificación deberá comparar como mínimo las disponibles entre:

- política de presentación / navegación;
- SDK o resolvedor compartido de autorización;
- Server Action o Route Handler;
- API interna;
- RPC;
- RLS / Data API;
- Edge Function;
- cliente nativo o dispositivo compartido cuando forme parte del paquete.

No se exige que todos los paquetes contengan todas las capas. Sí se exige que ninguna capa existente conceda por rol lo que otra deniega por permiso o contexto.

---

#### 12. Persistencia y ausencia de efectos indebidos

El control positivo podrá producir únicamente el efecto administrativo que el permiso probado autorice.

Los controles negativos deberán demostrar:

```text
DENY
→
0 EFECTOS EMPRESARIALES NO AUTORIZADOS
```

La evidencia deberá comprobar, según aplique al paquete:

- cero filas mutadas;
- cero eventos empresariales emitidos;
- cero jobs o tareas creadas;
- cero movimientos de inventario;
- cero pedidos, pagos, puntos o efectos financieros;
- cero cambios de roles, grants o asignaciones;
- cero creación artificial de turno o check-in.

---

#### 13. Auditoría obligatoria

La ejecución debe conservar evidencia correlacionable suficiente para reconstruir:

- identidad del principal;
- actor efectivo;
- condición de trabajador activo;
- rol base `propietario`;
- permiso exacto evaluado;
- alcance evaluado;
- recurso o destino;
- modalidad administrativa u operativa;
- estado de turno aplicable;
- estado de check-in aplicable;
- decisión;
- razones estructuradas cuando existan;
- canal o capa evaluada;
- resultado de efecto;
- correlación de la prueba;
- versión del contrato y del paquete probado.

La evidencia no deberá exponer secretos, tokens, PIN, credenciales ni datos personales innecesarios.

---

#### 14. Casos mínimos de certificación

Cada instancia aplicable deberá cubrir como mínimo estos tres casos:

| Caso | Rol | Permiso | Turno / check-in | Tipo de acción | Oracle |
| --- | --- | --- | --- | --- | --- |
| A | `propietario` | administrativo efectivo | ausentes | administrativa | `ALLOW` limitado al permiso |
| B | `propietario` | administrativo no efectivo | ausentes | administrativa | `DENY`, cero efecto |
| C | `propietario` | permiso administrativo efectivo | contexto operativo requerido ausente | operativa | no `ALLOW`, cero efecto |

Si el paquete expone más de una capa de autorización, los tres casos se ejecutan sobre las capas aplicables o mediante una matriz equivalente que demuestre paridad.

---

#### 15. Clasificación de fallos

La instancia queda `FAIL` cuando ocurra cualquiera de estas condiciones:

1. el caso A se deniega únicamente por ausencia de turno o check-in cuando el contrato administrativo no los exige;
2. el caso B concede acceso por el nombre `propietario` o cualquier bypass equivalente;
3. el caso C concede una acción operativa sin sus prerrequisitos;
4. UI y servidor discrepan en la decisión material;
5. RPC y RLS permiten un efecto que el servidor deniega;
6. una denegación produce efecto parcial;
7. la prueba fabrica turno, check-in o contexto para obtener `ALLOW`;
8. la evidencia no permite correlacionar actor, permiso, contexto y resultado;
9. se usan credenciales o datos productivos no autorizados;
10. la ejecución no puede demostrar qué versión del paquete y contratos fue probada.

Un fallo técnico que impida decidir no se clasifica como PASS funcional.

---

#### 16. Modelo de ejecución por paquete

La topología exige:

```text
AUTH-QA-001::<package_id>
```

para cada paquete donde esta prueba sea aplicable.

La instancia solo puede ejecutarse cuando:

```text
E5-GATE-008::<package_id> = PASS
```

Y el paquete ha materializado las superficies necesarias para ejecutar la prueba de forma trazable.

La definición documental de esta tarea:

- no crea la instancia;
- no selecciona package;
- no aprueba E5;
- no ejecuta fixtures;
- no toca staging;
- no autoriza producción.

---

#### 17. Certificación global final

Después de completar las instancias aplicables, la topología conserva:

```text
AUTH-QA-001::GLOBAL-FINAL
```

La certificación global no repite innecesariamente todas las ejecuciones. Debe agregar evidencia suficiente para demostrar:

- cobertura de todos los paquetes aplicables;
- ausencia de paquetes aplicables sin resultado;
- cero PASS con evidencia faltante;
- consistencia del oracle entre paquetes;
- ausencia de excepción local que convierta `propietario` en wildcard;
- ausencia de consumidor que vuelva a exigir check-in para una capacidad administrativa que no lo requiere;
- ausencia de consumidor que use la excepción administrativa como bypass operativo.

Si una instancia aplicable permanece `FAIL`, `UNKNOWN` o sin evidencia suficiente, `GLOBAL-FINAL` no puede declararse PASS.

---

#### 18. Handoff hacia AUTH-QA-002

`AUTH-QA-001` cubre exclusivamente el rol base `propietario`.

No demuestra por inferencia el comportamiento de `gerente_general`.

La siguiente tarea deberá repetir la frontera equivalente para `gerente_general`, preservando además que:

- `gerente_general` no hereda capacidades reservadas de propietario;
- sigue sin existir wildcard por nombre de rol;
- la administración compatible tampoco depende de check-in;
- el carril operativo conserva sus propios prerrequisitos.

---

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea convierte obligaciones ya registradas en un contrato de ejecución y certificación del BLOQUE U. No introduce una regla verificable material nueva que requiera crear o modificar filas del registro canónico.

---

#### 20. Cobertura de prueba vigente reutilizada

Sin modificar el registro canónico, la tarea reutiliza especialmente:

- `TREQ-AUTH-001`, para impedir autorización final basada en una lista local de roles;
- `TREQ-AUTH-004`, para exigir decisión y razones equivalentes entre evaluadores;
- `TREQ-AUTH-008`, que exige que capacidades administrativas compatibles operen sin turno/check-in y que capacidades operativas conserven sus prerrequisitos;
- `TREQ-AUTH-013`, para impedir bypass mediante URL, formulario, API o RPC y exigir validación server-side;
- la cobertura vigente de auditoría y trazabilidad de autorización;
- la cobertura vigente de SHELL sobre visibilidad por permiso efectivo y separación entre visibilidad y autoridad.

Estas referencias son trazabilidad reutilizada y no representan cambios 04A.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental y las futuras pruebas por paquete todavía no se ejecutaron sobre el checkout local de la rama de `AUTH-QA-001`. |
| LOCAL | NOT_EXECUTED | El bloque todavía no fue insertado, normalizado ni validado en la rama documental local. |
| REMOTA | PASS | Se verificaron en `vento-shell` el marcador y título canónicos, la transición desde AURA hacia BLOQUE U, la topología `PER_PACKAGE_AND_GLOBAL_FINAL`, el gate `POST_E5_PACKAGE`, el modelo de `propietario`, la ausencia de requisito de turno/check-in para administración compatible, la prohibición de wildcard por rol, la separación administrativa/operativa, la política de visibilidad de SHELL y la cobertura 04A ya existente. |
| OPERATIVA | NOT_EXECUTED | El contrato define fixtures y oracles, pero no se ejecutó ninguna prueba E2E o de autorización contra una aplicación o paquete materializado. |
| FÍSICA | NOT_EXECUTED | No se creó ni ejecutó ninguna instancia `AUTH-QA-001::<package_id>` ni `AUTH-QA-001::GLOBAL-FINAL`; no se modificaron Supabase, datos, aplicaciones ni infraestructura. |

---

#### 22. Criterios de aceptación

- [x] El actor positivo es `EMPLOYEE` activo y no una identidad inferida.
- [x] El rol base bajo prueba es exactamente `propietario`.
- [x] La prueba administrativa usa un permiso exacto y vigente.
- [x] La ausencia de turno queda explícita en el fixture.
- [x] La ausencia de check-in queda explícita en el fixture.
- [x] El oracle positivo permite administración sin fabricar contexto operativo.
- [x] El control negativo de permiso impide wildcard por rol.
- [x] El control negativo operativo impide bypass desde administración.
- [x] Visibilidad y autoridad permanecen separadas.
- [x] Entrada a aplicación y permisos internos permanecen separados.
- [x] La prueba exige paridad entre las capas realmente materializadas.
- [x] Los controles negativos exigen cero efectos empresariales indebidos.
- [x] La evidencia mínima conserva actor, permiso, alcance, contexto, decisión y resultado.
- [x] La prueba no exige una razón inventada cuando el contrato propietario define otra razón estructurada.
- [x] El fallo técnico no se presenta como PASS.
- [x] La tarea no selecciona paquetes.
- [x] La ejecución física queda condicionada a `E5-GATE-008::<package_id> = PASS`.
- [x] La topología conserva una instancia por paquete aplicable y una certificación global final.
- [x] `GLOBAL-FINAL` no puede pasar con instancias aplicables faltantes o no PASS.
- [x] `AUTH-QA-002` permanece reservada para `gerente_general`.
- [x] Se crean cero requisitos de prueba.
- [x] Se modifican cero requisitos de prueba.
- [x] No se ejecuta implementación física desde esta tarea documental.

---

#### 23. Límites

Esta tarea no:

- crea usuarios;
- crea trabajadores;
- crea sesiones;
- crea turnos;
- crea check-ins;
- crea roles;
- crea permisos;
- crea grants;
- crea denies;
- modifica matrices RBAC;
- modifica scopes;
- modifica `AccessContext`;
- modifica decisiones de autorización;
- crea helpers `is_owner()`;
- crea bypasses;
- modifica navegación;
- modifica SHELL;
- modifica VISO;
- modifica NEXO;
- modifica FOGO;
- modifica ORIGO;
- modifica PULSO;
- modifica NUMERA;
- modifica ANIMA;
- modifica PASS;
- modifica AURA;
- modifica Supabase;
- crea tablas;
- crea vistas;
- crea migraciones;
- crea RLS;
- crea RPC;
- crea funciones;
- crea triggers;
- crea Edge Functions;
- crea Storage;
- crea Realtime;
- crea colas o jobs;
- modifica datos;
- ejecuta fixtures reales;
- ejecuta pruebas físicas;
- selecciona `package_id`;
- aprueba `E5-GATE-008`;
- crea una instancia `AUTH-QA-001::<package_id>`;
- crea `AUTH-QA-001::GLOBAL-FINAL`;
- desarrolla `AUTH-QA-002`;
- crea requisitos de prueba;
- modifica requisitos de prueba.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-INT-002 — Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO`

**TAREA ACTUAL APROBADA**
`AUTH-QA-001 — Propietario sin check-in entra a administración`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-002 — Gerente general sin check-in entra a administración`
### ✅ AUTH-QA-002 — Gerente general sin check-in entra a administración

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-001 — Propietario sin check-in entra a administración
**Tarea siguiente:** AUTH-QA-003 — Gerente de sede solo opera sus sedes
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización reutilizable por paquete y certificable globalmente, para demostrar que un gerente general activo puede usar capacidades administrativas explícitamente autorizadas sin turno ni check-in, sin heredar gobierno propietario, permisos implícitos ni bypass operativo
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-002::<package_id>` y la certificación `AUTH-QA-002::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un actor laboral activo con rol base `gerente_general` puede ingresar al carril administrativo y ejecutar una capacidad administrativa explícitamente autorizada aunque no tenga turno vigente ni check-in activo, sin convertir el nombre del rol en un wildcard, sin heredar facultades reservadas de `propietario` y sin permitir que esa ausencia de contexto operativo habilite acciones operativas.

La condición central es:

```text
EMPLEADO ACTIVO
+
ROL BASE gerente_general
+
PERMISO ADMINISTRATIVO EXACTO Y VIGENTE
+
ALCANCE ADMINISTRATIVO COMPATIBLE
+
SIN TURNO
+
SIN CHECK-IN
→
ALLOW ADMINISTRATIVO
```

pero simultáneamente:

```text
ROL gerente_general
+
SIN PERMISO EXACTO
→
DENY
```

Y:

```text
ROL gerente_general
+
CAPACIDAD RESERVADA DE PROPIETARIO
→
NO HEREDAR / NO ASIGNAR / NO ALLOW POR EQUIVALENCIA
```

Y:

```text
ROL gerente_general
+
SIN CONTEXTO OPERATIVO REQUERIDO
+
ACCIÓN OPERATIVA
→
NO ALLOW OPERATIVO
```

La prueba certifica una frontera de autorización ya definida. No crea permisos, grants, roles, rutas, excepciones ni bypasses.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con cuatro resultados obligatorios e inseparables:

1. **administración sin check-in permitida cuando corresponde:** la ausencia de turno y check-in no bloquea una capacidad administrativa cuyo contrato no los exige y cuyo permiso exacto está vigente;
2. **cero wildcard por gerente general:** el rol `gerente_general` no autoriza una capacidad administrativa cuyo permiso exacto no esté concedido o esté inactivo;
3. **cero herencia de gobierno propietario:** una capacidad reservada de `propietario` no puede concederse a `gerente_general` por equivalencia, similitud, permiso amplio, compatibilidad legacy o nombre de rol;
4. **cero bypass operativo:** una acción operativa que requiera turno, check-in, rol operativo, sede, área u otro contexto no puede reutilizar el resultado administrativo como autorización.

La certificación falla si solo se demuestra el primer punto y no los controles negativos aplicables.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- el modelo de roles administrativos globales, donde `gerente_general` posee `authority_class = executive_management` y alcance natural de organización, pero no permisos implícitos ni bypass operativo;
- la regla `requires_shift_for_administration = false` para capacidades administrativas compatibles;
- la regla `requires_checkin_for_administration = false` para capacidades administrativas compatibles;
- la prohibición de usar `role = gerente_general`, helpers equivalentes o listas de roles privilegiados como autorización final;
- la matriz `AUTH-RBAC-002`, que evaluó 112 permisos canónicos, con 94 capacidades administrativas directas, cinco componentes base de doble condición y 13 capacidades exclusivamente operativas sin concesión base;
- la prohibición contractual de que `gerente_general` administre propietarios, obtenga equivalencia de propietario, altere recuperación de seguridad, desactive auditoría, gobierne `service_role`, reciba secretos o acceso técnico privilegiado, rompa aislamiento técnico o herede futuras capacidades reservadas de propietario;
- la separación entre carril administrativo y carril operativo;
- el contrato de `AccessContext`, donde turno y check-in solo participan cuando el permiso evaluado los exige;
- la política de SHELL donde la visibilidad procede de una decisión efectiva de `app.access`, no del nombre del rol;
- la obligación de que UI, SDK, servidor, RPC y RLS produzcan decisiones equivalentes para las mismas entradas;
- la auditoría correlacionable de actor, permiso, alcance, contexto, decisión y resultado;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` y el gate `POST_E5_PACKAGE` aplicables al BLOQUE U.

Esta tarea no modifica ninguno de esos contratos.

---

#### 4. Semántica exacta de “entra a administración”

“Entrar a administración” significa que el actor puede acceder al carril, aplicación o superficie administrativa que corresponda al paquete probado **únicamente cuando la autorización efectiva de entrada y de la capacidad concreta produzca `ALLOW`**.

No significa:

- acceso universal a todas las aplicaciones;
- acceso automático a VISO, NUMERA, NEXO, FOGO, ORIGO, PULSO, AURA o PASS;
- permiso para toda acción visible en una aplicación;
- permiso operativo;
- permiso financiero no concedido;
- permiso reservado de propietario;
- autoridad para administrar propietarios;
- autoridad técnica privilegiada;
- acceso a `service_role`, secretos o credenciales;
- acceso automático a APP-REVIEW, demo, pruebas o dominios aislados;
- acceso por nombre de rol;
- creación automática de turno o check-in.

Una tarjeta visible, una ruta accesible o una experiencia administrativa seleccionada son presentación de una decisión previa; nunca su fuente.

---

#### 5. Unidad de prueba

Cada ejecución física posterior debe probar una **capacidad administrativa concreta** incluida en el `package_id` aplicable.

La unidad mínima queda compuesta por:

```text
ACTOR CONTROLADO
+
PERMISO ADMINISTRATIVO BAJO PRUEBA
+
RECURSO / ALCANCE BAJO PRUEBA
+
SUPERFICIE DE ENTRADA APLICABLE
+
EVALUADOR SERVER-SIDE APLICABLE
+
PERSISTENCIA / RPC / RLS APLICABLES
+
EVIDENCIA CORRELACIONADA
```

Cuando el paquete materialice una capacidad o superficie reservada de propietario, la unidad incluye además el control negativo de no herencia para `gerente_general`.

La tarea no selecciona un `package_id` ni una aplicación específica. Cada paquete ejecuta únicamente el subconjunto que realmente materialice esa capacidad.

---

#### 6. Fixture positivo obligatorio

La ejecución deberá construir un fixture controlado con estas propiedades mínimas:

| Dimensión | Valor requerido |
| --- | --- |
| tipo de actor | `EMPLOYEE` |
| identidad | autenticada, resoluble y no simulada |
| trabajador | activo |
| rol base | `gerente_general` |
| clase de autoridad | `executive_management` |
| permiso bajo prueba | administrativo, exacto, activo y concedido |
| alcance | compatible con el contrato del permiso |
| turno aplicable | ausente cuando la capacidad administrativa no lo requiera |
| check-in aplicable | ausente cuando la capacidad administrativa no lo requiera |
| rol operativo | no utilizado como fuente del `ALLOW` administrativo |
| dispositivo | válido cuando el contrato de la superficie lo exija |
| recurso | existente, vigente y dentro del alcance autorizado |
| capacidad reservada de propietario | ausente del caso positivo ordinario |
| simulación | desactivada |

La ausencia de turno o check-in debe ser deliberada y demostrable, no una omisión desconocida del fixture.

---

#### 7. Oracle positivo

Con el fixture positivo, la prueba debe demostrar de forma conjunta:

1. el actor se resuelve como trabajador activo;
2. el rol base se resuelve como `gerente_general`;
3. el permiso exacto de la capacidad administrativa está concedido y vigente;
4. el alcance administrativo requerido se resuelve sin fabricar contexto operativo;
5. la ausencia de turno no produce denegación cuando el permiso no lo exige;
6. la ausencia de check-in no produce denegación cuando el permiso no lo exige;
7. la decisión final es `ALLOW` únicamente para la capacidad administrativa evaluada;
8. la superficie administrativa aplicable puede presentarse o ejecutarse según su contrato;
9. no se crea turno, check-in, rol operativo, sede operativa ni área operativa ficticios;
10. la evidencia conserva el permiso y el alcance que produjeron el resultado;
11. el resultado no se presenta como autoridad de propietario ni habilita facultades reservadas.

---

#### 8. Control negativo de permiso

La misma identidad `gerente_general`, con el mismo estado laboral y la misma ausencia de turno/check-in, debe probarse con el permiso exacto bajo prueba ausente, inactivo o explícitamente denegado según el caso aplicable.

Resultado obligatorio:

```text
ROL gerente_general
+
PERMISO EXACTO NO EFECTIVO
→
DENY
```

La prueba falla si el sistema concede por cualquiera de estas causas:

- nombre del rol;
- helper de gerente general;
- lista local de roles privilegiados;
- equivalencia implícita con `propietario`;
- UI visible;
- sesión válida;
- alcance organizacional del rol;
- pertenencia al grupo de administradores;
- acceso previo cacheado;
- permiso legacy amplio retirado o bloqueado.

---

#### 9. Control negativo de capacidad reservada de propietario

Cuando el paquete probado materialice una capacidad o superficie clasificada canónicamente como reservada de propietario, deberá ejecutarse un control específico con la misma identidad `gerente_general`.

Resultado obligatorio:

```text
GERENTE GENERAL
+
CAPACIDAD RESERVADA DE PROPIETARIO
→
NO ASIGNAR / DENY / CERO EFECTO
```

Queda expresamente prohibido obtener esa capacidad mediante:

- coincidencia cuantitativa entre matrices;
- herencia desde `AUTH-RBAC-001`;
- permiso genérico de administración;
- alcance organizacional;
- alias o fallback legacy;
- helper `is_global_manager()`;
- lista local de administradores;
- ruta antigua que todavía conserve un bypass;
- elevación a `service_role`;
- impersonación de propietario.

Si un paquete no materializa ninguna capacidad reservada de propietario, este subcaso se registra como no aplicable para esa instancia; no se inventa una capacidad inexistente para forzar la prueba.

---

#### 10. Control negativo operativo

Con la identidad positiva de gerente general y sin turno/check-in, se seleccionará una capacidad del paquete cuyo contrato sea operativo y exija contexto operativo.

El resultado debe demostrar que el `ALLOW` administrativo anterior no se reutiliza.

Cuando el contrato operativo requiera alguno de estos elementos:

- turno vigente;
- check-in activo;
- rol operativo;
- sede operativa;
- área operativa;
- compatibilidad territorial;
- prerrequisito de dispositivo;

la ausencia correspondiente debe impedir el `ALLOW` operativo.

La prueba no exige una razón textual única si el contrato propietario define otra razón estructurada; sí exige que el resultado sea no ejecutable y que no exista efecto empresarial.

---

#### 11. Separación entre visibilidad y autoridad

El escenario debe distinguir:

```text
VISIBLE
≠
AUTHORIZED_FOR_ACTION
```

Y:

```text
ADMINISTRATIVE_ENTRY_ALLOWED
≠
ALL_ADMINISTRATIVE_ACTIONS_ALLOWED
```

Y:

```text
GLOBAL_ADMINISTRATIVE_ROLE
≠
OWNER_AUTHORITY
```

La prueba deberá confirmar que:

- SHELL no inventa acceso por `gerente_general`;
- `app.access` se evalúa por su contrato propio;
- entrar a una aplicación no concede sus permisos internos;
- una acción protegida vuelve a autorizarse en servidor;
- una tarjeta oculta o visible no altera la decisión server-side;
- la presentación como gerente general no habilita capacidades reservadas de propietario.

---

#### 12. Paridad de evaluadores

Para la misma combinación de principal, actor, permiso, alcance, recurso y contexto, las capas aplicables dentro del paquete deben ser equivalentes.

Según las superficies realmente materializadas, la certificación deberá comparar como mínimo las disponibles entre:

- política de presentación / navegación;
- SDK o resolvedor compartido de autorización;
- Server Action o Route Handler;
- API interna;
- RPC;
- RLS / Data API;
- Edge Function;
- cliente nativo o dispositivo compartido cuando forme parte del paquete.

No se exige que todos los paquetes contengan todas las capas. Sí se exige que ninguna capa existente:

- conceda por rol lo que otra deniega por permiso o contexto;
- permita una capacidad reservada de propietario que otra capa bloquee;
- exija check-in para una capacidad administrativa que contractualmente no lo requiere;
- omita prerrequisitos operativos por tratarse de `gerente_general`.

---

#### 13. Persistencia y ausencia de efectos indebidos

El control positivo podrá producir únicamente el efecto administrativo que el permiso probado autorice.

Los controles negativos deberán demostrar:

```text
DENY
→
0 EFECTOS EMPRESARIALES NO AUTORIZADOS
```

La evidencia deberá comprobar, según aplique al paquete:

- cero filas mutadas;
- cero eventos empresariales emitidos;
- cero jobs o tareas creadas;
- cero movimientos de inventario;
- cero pedidos, pagos, puntos o efectos financieros;
- cero cambios de roles, grants o asignaciones;
- cero administración de propietarios;
- cero cambios de recuperación de seguridad;
- cero acceso técnico privilegiado o `service_role`;
- cero modificación de aislamiento técnico;
- cero creación artificial de turno o check-in.

---

#### 14. Auditoría obligatoria

La ejecución debe conservar evidencia correlacionable suficiente para reconstruir:

- identidad del principal;
- actor efectivo;
- condición de trabajador activo;
- rol base `gerente_general`;
- clase de autoridad ejecutiva;
- permiso exacto evaluado;
- clasificación reservada cuando aplique;
- alcance evaluado;
- recurso o destino;
- modalidad administrativa u operativa;
- estado de turno aplicable;
- estado de check-in aplicable;
- decisión;
- razones estructuradas cuando existan;
- canal o capa evaluada;
- resultado de efecto;
- correlación de la prueba;
- versión del contrato y del paquete probado.

La evidencia no deberá exponer secretos, tokens, PIN, credenciales ni datos personales innecesarios.

---

#### 15. Casos mínimos de certificación

Cada instancia aplicable deberá cubrir como mínimo estos casos:

| Caso | Rol | Permiso / capacidad | Turno / check-in | Tipo de acción | Oracle |
| --- | --- | --- | --- | --- | --- |
| A | `gerente_general` | administrativo efectivo | ausentes | administrativa | `ALLOW` limitado al permiso |
| B | `gerente_general` | administrativo no efectivo | ausentes | administrativa | `DENY`, cero efecto |
| C | `gerente_general` | capacidad reservada de propietario, cuando exista en el paquete | no determinante | reservada | `DENY` / no asignada, cero efecto |
| D | `gerente_general` | permiso administrativo efectivo | contexto operativo requerido ausente | operativa | no `ALLOW`, cero efecto |

Si el caso C no tiene una capacidad materializada aplicable en el paquete, debe registrarse como no aplicable con evidencia de esa ausencia; no puede contarse como PASS ejecutado.

Si el paquete expone más de una capa de autorización, los casos aplicables se ejecutan sobre las capas correspondientes o mediante una matriz equivalente que demuestre paridad.

---

#### 16. Clasificación de fallos

La instancia queda `FAIL` cuando ocurra cualquiera de estas condiciones:

1. el caso A se deniega únicamente por ausencia de turno o check-in cuando el contrato administrativo no los exige;
2. el caso B concede acceso por el nombre `gerente_general` o cualquier bypass equivalente;
3. el caso C concede o hereda una capacidad reservada de propietario cuando esa capacidad sea aplicable;
4. el caso D concede una acción operativa sin sus prerrequisitos;
5. UI y servidor discrepan en la decisión material;
6. RPC y RLS permiten un efecto que el servidor deniega;
7. una denegación produce efecto parcial;
8. la prueba fabrica turno, check-in, autoridad de propietario o contexto para obtener `ALLOW`;
9. una ruta legacy, helper o permiso amplio reconstruye una facultad reservada;
10. la evidencia no permite correlacionar actor, permiso, contexto y resultado;
11. se usan credenciales o datos productivos no autorizados;
12. la ejecución no puede demostrar qué versión del paquete y contratos fue probada.

Un fallo técnico que impida decidir no se clasifica como PASS funcional.

---

#### 17. Modelo de ejecución por paquete

La topología exige:

```text
AUTH-QA-002::<package_id>
```

para cada paquete donde esta prueba sea aplicable.

La instancia solo puede ejecutarse cuando:

```text
E5-GATE-008::<package_id> = PASS
```

Y el paquete ha materializado las superficies necesarias para ejecutar la prueba de forma trazable.

La definición documental de esta tarea:

- no crea la instancia;
- no selecciona package;
- no aprueba E5;
- no ejecuta fixtures;
- no toca staging;
- no autoriza producción.

---

#### 18. Certificación global final

Después de completar las instancias aplicables, la topología conserva:

```text
AUTH-QA-002::GLOBAL-FINAL
```

La certificación global no repite innecesariamente todas las ejecuciones. Debe agregar evidencia suficiente para demostrar:

- cobertura de todos los paquetes aplicables;
- ausencia de paquetes aplicables sin resultado;
- cero PASS con evidencia faltante;
- consistencia del oracle entre paquetes;
- ausencia de excepción local que convierta `gerente_general` en wildcard;
- ausencia de consumidor que vuelva a exigir check-in para una capacidad administrativa que no lo requiere;
- ausencia de consumidor que use la excepción administrativa como bypass operativo;
- ausencia de herencia desde la matriz de propietario;
- cobertura de toda capacidad reservada de propietario que haya sido materializada en los paquetes aplicables;
- ausencia de rutas legacy que concedan a `gerente_general` facultades reservadas.

Si una instancia aplicable permanece `FAIL`, `UNKNOWN` o sin evidencia suficiente, `GLOBAL-FINAL` no puede declararse PASS.

---

#### 19. Handoff hacia AUTH-QA-003

`AUTH-QA-002` cubre exclusivamente el rol base `gerente_general` y su administración ejecutiva global.

No demuestra por inferencia el comportamiento del rol base `gerente`.

La siguiente tarea deberá probar al `gerente` con cobertura territorial limitada a sus sedes, preservando que:

- no es administrador global por nombre;
- no recibe alcance organizacional completo;
- la sede seleccionada o primaria no sustituye asignaciones válidas;
- toda capacidad se limita al territorio autorizado;
- el carril operativo conserva sus propios prerrequisitos.

---

#### 20. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea convierte obligaciones ya registradas en un contrato de ejecución y certificación del BLOQUE U. No introduce una regla verificable material nueva que requiera crear o modificar filas del registro canónico.

---

#### 21. Cobertura de prueba vigente reutilizada

Sin modificar el registro canónico, la tarea reutiliza especialmente:

- `TREQ-AUTH-001`, para impedir autorización final basada en una lista local de roles;
- `TREQ-AUTH-004`, para exigir decisión y razones equivalentes entre evaluadores;
- `TREQ-AUTH-007`, para exigir capacidad administrativa explícita y alcance autorizado en la administración de seguridad y gobierno aplicable;
- `TREQ-AUTH-008`, que exige que capacidades administrativas compatibles operen sin turno/check-in y que capacidades operativas conserven sus prerrequisitos;
- `TREQ-AUTH-013`, para impedir bypass mediante URL, formulario, API o RPC y exigir validación server-side;
- la cobertura vigente de auditoría y trazabilidad de autorización;
- la cobertura vigente de SHELL sobre visibilidad por permiso efectivo y separación entre visibilidad y autoridad;
- la matriz canónica `AUTH-RBAC-002`, que mantiene separadas administración ejecutiva global y gobierno propietario.

Estas referencias son trazabilidad reutilizada y no representan cambios 04A.

---

#### 22. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental y las futuras pruebas por paquete todavía no se ejecutaron sobre el checkout local de la rama de `AUTH-QA-002`. |
| LOCAL | NOT_EXECUTED | El bloque todavía no fue insertado, normalizado ni validado en la rama documental local. |
| REMOTA | PASS | Se verificaron en `vento-shell` el marcador y título canónicos, la secuencia del BLOQUE U, la topología `PER_PACKAGE_AND_GLOBAL_FINAL`, el gate `POST_E5_PACKAGE`, el modelo de `gerente_general`, la ausencia de requisito de turno/check-in para administración compatible, la matriz `AUTH-RBAC-002`, la prohibición de wildcard y de herencia de capacidades reservadas de propietario, la separación administrativa/operativa, la política de visibilidad de SHELL y la cobertura 04A ya existente. |
| OPERATIVA | NOT_EXECUTED | El contrato define fixtures y oracles, pero no se ejecutó ninguna prueba E2E o de autorización contra una aplicación o paquete materializado. |
| FÍSICA | NOT_EXECUTED | No se creó ni ejecutó ninguna instancia `AUTH-QA-002::<package_id>` ni `AUTH-QA-002::GLOBAL-FINAL`; no se modificaron Supabase, datos, aplicaciones ni infraestructura. |

---

#### 23. Criterios de aceptación

- [x] El actor positivo es `EMPLOYEE` activo y no una identidad inferida.
- [x] El rol base bajo prueba es exactamente `gerente_general`.
- [x] La clase de autoridad se conserva como dirección ejecutiva y no gobierno propietario.
- [x] La prueba administrativa usa un permiso exacto y vigente.
- [x] La ausencia de turno queda explícita en el fixture.
- [x] La ausencia de check-in queda explícita en el fixture.
- [x] El oracle positivo permite administración sin fabricar contexto operativo.
- [x] El control negativo de permiso impide wildcard por rol.
- [x] La coincidencia cuantitativa con la matriz de propietario no se interpreta como herencia.
- [x] Las capacidades reservadas de propietario permanecen fuera del alcance de `gerente_general`.
- [x] El control reservado solo se ejecuta cuando la capacidad exista materialmente en el paquete.
- [x] La ausencia de una capacidad reservada no se falsifica como PASS ejecutado.
- [x] El control negativo operativo impide bypass desde administración.
- [x] Visibilidad y autoridad permanecen separadas.
- [x] Entrada a aplicación y permisos internos permanecen separados.
- [x] La prueba exige paridad entre las capas realmente materializadas.
- [x] Los controles negativos exigen cero efectos empresariales indebidos.
- [x] La evidencia mínima conserva actor, permiso, alcance, contexto, decisión y resultado.
- [x] La prueba no exige una razón inventada cuando el contrato propietario define otra razón estructurada.
- [x] El fallo técnico no se presenta como PASS.
- [x] La tarea no selecciona paquetes.
- [x] La ejecución física queda condicionada a `E5-GATE-008::<package_id> = PASS`.
- [x] La topología conserva una instancia por paquete aplicable y una certificación global final.
- [x] `GLOBAL-FINAL` no puede pasar con instancias aplicables faltantes o no PASS.
- [x] `AUTH-QA-003` permanece reservada para `gerente`.
- [x] Se crean cero requisitos de prueba.
- [x] Se modifican cero requisitos de prueba.
- [x] No se ejecuta implementación física desde esta tarea documental.

---

#### 24. Límites

Esta tarea no:

- crea usuarios;
- crea trabajadores;
- crea sesiones;
- crea turnos;
- crea check-ins;
- crea roles;
- crea permisos;
- crea grants;
- crea denies;
- modifica matrices RBAC;
- modifica `AUTH-RBAC-001`;
- modifica `AUTH-RBAC-002`;
- convierte `gerente_general` en `propietario`;
- crea capacidades reservadas de propietario;
- modifica scopes;
- modifica `AccessContext`;
- modifica decisiones de autorización;
- crea helpers de bypass;
- crea bypasses;
- modifica navegación;
- modifica SHELL;
- modifica VISO;
- modifica NEXO;
- modifica FOGO;
- modifica ORIGO;
- modifica PULSO;
- modifica NUMERA;
- modifica ANIMA;
- modifica PASS;
- modifica AURA;
- modifica Supabase;
- crea tablas;
- crea vistas;
- crea migraciones;
- crea RLS;
- crea RPC;
- crea funciones;
- crea triggers;
- crea Edge Functions;
- crea Storage;
- crea Realtime;
- crea colas o jobs;
- modifica datos;
- ejecuta fixtures reales;
- ejecuta pruebas físicas;
- selecciona `package_id`;
- aprueba `E5-GATE-008`;
- crea una instancia `AUTH-QA-002::<package_id>`;
- crea `AUTH-QA-002::GLOBAL-FINAL`;
- desarrolla `AUTH-QA-003`;
- crea requisitos de prueba;
- modifica requisitos de prueba.

---

#### 25. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-001 — Propietario sin check-in entra a administración`

**TAREA ACTUAL APROBADA**
`AUTH-QA-002 — Gerente general sin check-in entra a administración`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-003 — Gerente de sede solo opera sus sedes`
### ✅ AUTH-QA-003 — Gerente de sede solo opera sus sedes

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-002 — Gerente general sin check-in entra a administración
**Tarea siguiente:** AUTH-QA-004 — Trabajador sin turno queda bloqueado
**Tipo de tarea:** documental; definición canónica de una prueba integral territorial reutilizable por paquete y certificable globalmente, para demostrar que un gerente solo obtiene autoridad sobre sedes activamente asignadas, sin alcance global, sin autorización por sede primaria o seleccionada y sin bypass de los prerrequisitos del carril operativo
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-003::<package_id>` y la certificación `AUTH-QA-003::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un actor laboral activo con rol base `gerente` solo obtiene autoridad administrativa o capacidad territorial sobre las sedes y áreas que pertenecen a su cobertura canónica vigente, sin convertir el rol, la sede primaria, la sede seleccionada, un parámetro enviado por cliente o una relación parcial entre sedes en alcance global.

La condición territorial central es:

```text
EMPLEADO ACTIVO
+
ROL BASE gerente
+
PERMISO EXACTO Y VIGENTE
+
SEDE / ÁREA DENTRO DE COBERTURA ACTIVA
+
RECURSO COMPATIBLE
→
AUTORIZACIÓN TERRITORIAL POSIBLE
```

pero simultáneamente:

```text
MISMO ACTOR
+
MISMO PERMISO
+
SEDE FUERA DE COBERTURA
→
DENY
```

Y:

```text
SEDE PRIMARIA O SELECCIONADA
+
SIN ASIGNACIÓN TERRITORIAL ACTIVA
→
NO AUTORIZA
```

Y, cuando la capacidad sea operativa:

```text
ROL gerente
+
SEDE ASIGNADA
+
SIN TURNO / CHECK-IN / ROL OPERATIVO REQUERIDOS
→
NO ALLOW OPERATIVO
```

La prueba certifica una frontera ya definida. No crea sedes, asignaciones, permisos, roles, scopes, excepciones ni bypasses.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con seis resultados obligatorios:

1. **ALLOW dentro de cobertura:** una capacidad compatible puede resolverse dentro de una sede o área activamente asignada cuando el permiso y el resto de condiciones aplicables sean válidos;
2. **DENY fuera de cobertura:** la misma identidad y el mismo permiso no autorizan un recurso equivalente situado en una sede no asignada;
3. **cero alcance global por nombre de rol:** `gerente` no equivale a `gerente_general`, `propietario`, `G` ni “todas las sedes”;
4. **cero autorización por preferencia:** `employees.site_id`, sede primaria, sede seleccionada o un `site_id` recibido del cliente no sustituyen la cobertura canónica;
5. **cero bypass operativo:** una sede asignada no sustituye turno, check-in, rol operativo ni demás prerrequisitos cuando la modalidad de la capacidad los exige;
6. **cero escalación relacional:** la relación de un recurso con una sede autorizada no concede autoridad general sobre otro extremo no autorizado.

La certificación falla si solo demuestra acceso en una sede asignada y no ejecuta los controles negativos territoriales aplicables.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- la matriz `AUTH-RBAC-003`, donde `gerente` representa administración integral de sede y no administración organizacional global;
- el inventario de 112 permisos evaluados para `gerente`, con 80 capacidades administrativas directas, cinco componentes base de doble condición, 27 capacidades sin concesión base y 85 claves con concesión base;
- la prohibición de cualquier concesión con alcance global `G` para `gerente`;
- los perfiles territoriales `AS`, `AA`, `ORG-LOCAL`, `AS-REL` y `AS/AA ∩ CTX`;
- la regla de que `AS` se resuelve desde asignaciones activas de sede y nunca desde sede primaria o seleccionada;
- la regla `null ≠ todas las sedes`;
- la obligación de limitar una lectura transversal a la unión de territorios individualmente autorizados;
- la obligación de validar todos los extremos exigidos por el contrato antes de una mutación relacional;
- la separación entre carril administrativo y carril operativo;
- la obligación de mantener equivalencia entre UI, SDK, servidor, RPC y RLS para las mismas entradas;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` y el gate `POST_E5_PACKAGE` aplicables al BLOQUE U.

Esta tarea no modifica ninguno de esos contratos.

---

#### 4. Semántica exacta de “sus sedes”

Para esta prueba, “sus sedes” significa únicamente el conjunto de sedes laborales que la fuente canónica de cobertura resuelva como **activamente asignadas** al actor en el momento evaluado.

La cobertura puede contener una o varias sedes.

```text
AS = unión de sedes activamente asignadas
```

pero:

```text
AS ≠ organización completa
AS ≠ todas las sedes del mismo tipo
AS ≠ sede primaria
AS ≠ sede seleccionada
AS ≠ site_id recibido del cliente
```

Cuando el permiso trabaje a nivel de área, el área deberá pertenecer a una sede autorizada y satisfacer la asignación o regla territorial aplicable.

Una sede inactiva, no asignada o no resoluble no forma parte de `AS`.

---

#### 5. Semántica exacta de “opera”

El título no convierte el rol base `gerente` en un rol operativo.

La prueba distingue dos carriles:

**Carril administrativo local**

```text
gerente
+ permiso base explícito
+ AS / AA compatible
+ recurso válido
→ evaluación administrativa local
```

Cuando el contrato del permiso no exige turno ni check-in, su ausencia no bloquea este carril.

**Carril operativo**

```text
gerente
+ componente base aplicable
+ rol operativo efectivo
+ turno vigente
+ check-in activo
+ territorio compatible
+ recurso válido
→ evaluación operativa posible
```

Por tanto, “solo opera sus sedes” significa que ninguna acción territorial puede superar la cobertura autorizada y que una acción operativa conserva además todos sus prerrequisitos propios.

---

#### 6. Unidad de prueba

Cada ejecución física posterior deberá probar una capacidad concreta incluida en el `package_id` aplicable mediante:

```text
ACTOR CONTROLADO
+
PERMISO BAJO PRUEBA
+
COBERTURA TERRITORIAL CONTROLADA
+
RECURSO EN SEDE ASIGNADA
+
RECURSO EQUIVALENTE EN SEDE NO ASIGNADA
+
SUPERFICIE / SERVIDOR / RPC / RLS APLICABLES
+
EVIDENCIA CORRELACIONADA
```

Cuando el paquete materialice una capacidad operativa o de doble condición, la unidad incluye el contexto operativo requerido.

Cuando materialice un recurso multisede, la unidad incluye los extremos territoriales exigidos por ese contrato.

La tarea no selecciona un `package_id`, aplicación ni permiso concreto.

---

#### 7. Fixture territorial mínimo

La ejecución deberá construir un fixture controlado con estas propiedades mínimas:

| Dimensión | Valor requerido |
| --- | --- |
| tipo de actor | `EMPLOYEE` |
| identidad | autenticada, resoluble y no simulada |
| trabajador | activo |
| rol base | `gerente` |
| permiso bajo prueba | exacto, vigente y compatible con la matriz de gerente |
| sede `S1` | activa y canónicamente asignada al actor |
| sede `S2` | activa pero no asignada al actor |
| área `A1`, cuando aplique | perteneciente a `S1` y compatible con la cobertura |
| recurso positivo | vinculado a `S1` o `A1` según el contrato |
| recurso negativo | equivalente y vinculado a `S2` |
| sede primaria | no utilizada como fuente de autoridad |
| sede seleccionada | no utilizada como fuente de autoridad |
| simulación | desactivada |

La diferencia entre `S1` y `S2` debe ser deliberada y demostrable.

---

#### 8. Caso A — autoridad dentro de sede asignada

Con el fixture positivo, la prueba debe demostrar conjuntamente:

1. el actor se resuelve como trabajador activo;
2. el rol base se resuelve como `gerente`;
3. la cobertura contiene `S1` mediante una asignación canónica activa;
4. el permiso exacto está concedido y vigente;
5. el recurso pertenece territorialmente a `S1` o `A1` según su contrato;
6. el alcance se mantiene en `AS`, `AA`, `ORG-LOCAL`, `AS-REL` o la combinación permitida, nunca en `G`;
7. la decisión puede ser `ALLOW` únicamente si las demás condiciones del permiso también son válidas;
8. la evidencia conserva la identidad de la sede o área realmente evaluada.

Para una capacidad administrativa base compatible, la prueba no debe fabricar turno ni check-in.

---

#### 9. Caso B — misma capacidad en sede no asignada

La misma identidad `gerente`, con el mismo permiso exacto, deberá evaluarse contra un recurso equivalente de `S2`.

Resultado obligatorio:

```text
gerente
+ permiso válido
+ S2 no asignada
→ DENY TERRITORIAL
```

La prueba falla si `S2` se autoriza por:

- nombre del rol;
- pertenecer al mismo tipo de sede que `S1`;
- pertenecer a la misma unidad de negocio sin contrato `ORG-LOCAL` válido;
- una sede primaria histórica;
- una sede seleccionada en interfaz;
- un parámetro `site_id` enviado por cliente;
- un helper legacy que interprete `gerente` como administrador global;
- `null` interpretado como todas las sedes;
- una política RLS o RPC más amplia que la decisión canónica.

---

#### 10. Caso C — sede primaria o seleccionada no autoriza

La prueba deberá demostrar que cambiar o presentar una preferencia de sede no amplía autoridad.

Como mínimo, cuando `S2` no pertenezca a la cobertura activa:

```text
selected_site_id = S2
→ no agrega S2 a AS
```

Y:

```text
primary_site = S2
→ no agrega S2 a AS
```

La navegación puede utilizar una preferencia válida para presentación, pero toda capacidad protegida deberá reevaluar el territorio desde las fuentes canónicas de autorización.

---

#### 11. Caso D — carril operativo conserva prerrequisitos

Cuando el paquete materialice una capacidad `OPERATIONAL_ONLY` o una acción cuyo resultado final dependa de contexto operativo, la sede asignada por sí sola no basta.

Control negativo mínimo:

```text
gerente
+ S1 asignada
+ permiso / componente base aplicable
+ contexto operativo incompleto
→ NO ALLOW OPERATIVO
```

Si el paquete permite construir el caso positivo completo, este deberá demostrar:

```text
gerente
+ S1 asignada
+ rol operativo compatible
+ turno vigente
+ check-in activo
+ permiso efectivo
+ recurso en S1
→ ALLOW solo cuando el contrato completo lo autorice
```

La prueba no exige que toda capacidad del gerente sea operativa ni convierte una capacidad base en operativa.

---

#### 12. Caso E — recursos entre sedes

Cuando el recurso relacione varias sedes, el test deberá usar el contrato propietario del recurso.

Una relación con `S1` puede permitir una lectura limitada cuando el contrato `AS-REL` así lo defina, pero nunca concede autoridad general sobre un extremo `S2` no asignado.

Toda mutación que exija autoridad sobre ambos extremos deberá fallar si alguno queda fuera de cobertura.

Resultado prohibido:

```text
S1 autorizada
+ relación con S2
→ autoridad implícita sobre S2
```

La prueba deberá registrar qué extremo fue autorizado, cuál quedó fuera de cobertura y qué regla del recurso produjo el resultado.

---

#### 13. Cobertura multisede autorizada

Un gerente puede tener más de una sede activamente asignada.

La prueba deberá preservar:

```text
AS = {S1, S3, ...}
```

sin convertirlo en:

```text
AS = ALL_SITES
```

Cada sede debe conservar identidad y evidencia propias.

La presencia de múltiples asignaciones no habilita sedes futuras, inactivas, del mismo tipo o de otra unidad que no pertenezcan explícitamente a la cobertura resuelta.

---

#### 14. Paridad de evaluadores

Para una misma entrada efectiva, las capas materializadas en el paquete deberán producir una decisión territorial equivalente.

Se deberán comparar, según existan:

- navegación o loader;
- SDK o resolvedor compartido;
- Server Action;
- Route Handler o API;
- RPC / PostgREST;
- RLS / Data API;
- Edge Function;
- Realtime;
- cliente nativo o dispositivo compartido.

No es PASS si una capa bloquea `S2` pero otra devuelve datos, permite una mutación o conserva una suscripción sobre esa sede.

---

#### 15. Persistencia y efectos indebidos

Los controles negativos deberán demostrar cero efectos empresariales no autorizados.

Ante un intento fuera de cobertura no podrá producirse por consecuencia del intento:

- inserción;
- actualización;
- eliminación;
- cambio de estado;
- creación de movimiento;
- aprobación;
- confirmación;
- asignación territorial;
- elevación de scope;
- publicación de evento empresarial;
- suscripción residual que entregue datos de la sede no autorizada.

Un error de UI sin comprobación server-side no satisface este criterio.

---

#### 16. Auditoría obligatoria

La evidencia de cada caso deberá permitir reconstruir al menos:

- actor efectivo;
- rol base;
- permiso evaluado;
- modalidad;
- sedes y áreas resueltas;
- recurso objetivo;
- sede o área del recurso;
- origen de la cobertura territorial;
- contexto operativo cuando aplique;
- decisión final;
- razón estructurada;
- capa o evaluador;
- resultado de la operación;
- correlación entre capas.

No se registrarán secretos, credenciales completas ni datos personales innecesarios.

---

#### 17. Casos mínimos de certificación

| Caso | Entrada | Resultado obligatorio |
| --- | --- | --- |
| A | `gerente` + permiso válido + recurso en `S1` asignada | `ALLOW` solo si todas las condiciones aplicables son válidas |
| B | mismo actor y permiso + recurso equivalente en `S2` no asignada | `DENY` territorial |
| C | `S2` solo como sede primaria, seleccionada o enviada por cliente | `DENY`; no amplía cobertura |
| D1 | `S1` asignada + acción operativa + contexto operativo incompleto | `DENY` o no `ALLOW` operativo |
| D2 | cuando aplique: `S1` + contexto operativo completo y compatible | `ALLOW` únicamente bajo el contrato operativo completo |
| E | relación `S1`–`S2` con autoridad incompleta sobre los extremos | sin escalación; mutación bloqueada cuando el contrato exige ambos extremos |

Un paquete que no materialice un tipo de caso deberá declararlo `NOT_APPLICABLE`; no podrá presentarlo como PASS ejecutado.

---

#### 18. Clasificación de fallos

La prueba deberá distinguir al menos:

- permiso ausente o inactivo;
- sede no asignada;
- área no autorizada;
- recurso fuera de cobertura;
- contexto operativo incompleto;
- scope incompatible;
- relación multisede con autoridad insuficiente;
- denegación individual o estructural;
- recurso inexistente o inactivo;
- fallo técnico del evaluador o de la fuente territorial.

Un fallo técnico no se transforma en `ALLOW` ni se registra como una denegación territorial concluyente cuando no pudo resolverse la información necesaria.

---

#### 19. Modelo de ejecución por paquete

La definición documental es única.

La materialización posterior conserva:

```text
AUTH-QA-003::<package_id>
```

para cada paquete aplicable y:

```text
AUTH-QA-003::GLOBAL-FINAL
```

para la certificación agregada.

Cada instancia por paquete deberá:

1. identificar las capacidades territoriales realmente materializadas por ese paquete;
2. vincular el `E5-GATE-008::<package_id> = PASS` correspondiente antes de ejecutar físicamente;
3. declarar qué casos A–E son aplicables;
4. usar fixtures controlados;
5. ejecutar las capas realmente presentes;
6. conservar evidencia por commit, ambiente y paquete;
7. fallar cerrado ante cobertura territorial incompleta o evidencia insuficiente.

---

#### 20. Certificación global final

`AUTH-QA-003::GLOBAL-FINAL` deberá reconciliar todas las instancias aplicables y demostrar como mínimo:

- ausencia de paquetes que conviertan `gerente` en alcance global;
- ausencia de permisos con scope `G` concedidos por esta matriz;
- bloqueo consistente de recursos en sedes no asignadas;
- ausencia de autorización por sede primaria, seleccionada o enviada por cliente;
- paridad de decisión entre evaluadores;
- ausencia de RLS, RPC o endpoints con cobertura territorial más amplia;
- preservación de prerrequisitos operativos;
- tratamiento correcto de recursos multisede;
- cero instancias aplicables faltantes, `FAIL` o sin evidencia suficiente.

Si una instancia aplicable permanece `FAIL`, `UNKNOWN` o sin evidencia suficiente, `GLOBAL-FINAL` no puede declararse PASS.

---

#### 21. Handoff hacia AUTH-QA-004

`AUTH-QA-003` cubre exclusivamente la frontera territorial del rol base `gerente`.

No demuestra por inferencia el comportamiento del trabajador operativo sin turno.

La siguiente tarea deberá probar que un trabajador que dependa del carril operativo permanece bloqueado cuando no existe turno válido, preservando la diferencia entre:

- rol base;
- asignación territorial;
- turno;
- check-in;
- rol operativo efectivo;
- permiso final.

---

#### 22. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0

La tarea convierte obligaciones territoriales ya registradas en un contrato de ejecución y certificación del BLOQUE U. No introduce una regla verificable material nueva que requiera crear o modificar filas del registro canónico.

---

#### 23. Cobertura de prueba vigente reutilizada

Sin modificar el registro canónico, la tarea reutiliza especialmente:

- `TREQ-AUTH-001`, para impedir autorización final basada en nombres de rol;
- `TREQ-AUTH-004`, para exigir decisiones y razones equivalentes entre evaluadores;
- `TREQ-AUTH-007`, para impedir que `gerente` conceda administración global y limitar administración de seguridad al territorio autorizado;
- `TREQ-AUTH-008`, para preservar la separación entre capacidades administrativas y operativas y sus prerrequisitos;
- `TREQ-AUTH-009`, que exige explícitamente que un gerente solo opere sus sedes y que todo cruce territorial se deniegue en servidor, RPC y RLS;
- `TREQ-AUTH-013`, para impedir bypass por URL, formulario, API o RPC en mutaciones protegidas;
- la matriz canónica `AUTH-RBAC-003`, con 85 claves de concesión base, 80 capacidades directas, cinco de doble condición, 27 no concedidas y cero concesiones `G`;
- la cobertura vigente de auditoría, contexto territorial, SHELL, servidor, RPC y RLS.

Estas referencias son trazabilidad reutilizada y no representan cambios 04A.

---

#### 24. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La batería documental y las futuras pruebas por paquete todavía no se ejecutaron sobre el checkout local de la rama de `AUTH-QA-003`. |
| LOCAL | NOT_EXECUTED | El bloque todavía no fue insertado, normalizado ni validado en la rama documental local. |
| REMOTA | PASS | Se verificaron en `vento-shell` el marcador y título canónicos, la secuencia del BLOQUE U, la topología `PER_PACKAGE_AND_GLOBAL_FINAL`, el gate `POST_E5_PACKAGE`, la matriz `AUTH-RBAC-003`, los perfiles `AS`, `AA`, `ORG-LOCAL`, `AS-REL`, la prohibición de alcance `G`, la separación administrativo/operativa, la resolución territorial desde asignaciones activas y la cobertura 04A ya existente. La base inmediata `AUTH-QA-002` se toma de su artefacto completo aprobado en esta conversación conforme al modo de trabajo adelantado. |
| OPERATIVA | NOT_EXECUTED | El contrato define fixtures y oracles territoriales, pero no se ejecutó ninguna prueba E2E o de autorización contra una aplicación o paquete materializado. |
| FÍSICA | NOT_EXECUTED | No se creó ni ejecutó ninguna instancia `AUTH-QA-003::<package_id>` ni `AUTH-QA-003::GLOBAL-FINAL`; no se modificaron Supabase, datos, aplicaciones ni infraestructura. |

---

#### 25. Criterios de aceptación

- [x] El actor bajo prueba es `EMPLOYEE` activo.
- [x] El rol base bajo prueba es exactamente `gerente`.
- [x] La autoridad se limita a sedes o áreas de cobertura canónica activa.
- [x] La cobertura se deriva de asignaciones autorizadas y no de preferencias de interfaz.
- [x] La sede primaria no autoriza por sí sola.
- [x] La sede seleccionada no autoriza por sí sola.
- [x] Un `site_id` enviado por cliente no amplía autoridad.
- [x] `null` no se interpreta como todas las sedes.
- [x] La prueba conserva cero concesiones con alcance `G`.
- [x] El caso positivo usa una sede asignada controlada.
- [x] El caso negativo usa una sede no asignada equivalente.
- [x] La misma identidad y permiso producen `DENY` fuera de cobertura.
- [x] Múltiples sedes asignadas forman una unión explícita y no alcance global.
- [x] Los recursos `AS-REL` no convierten una relación parcial en autoridad sobre el extremo no autorizado.
- [x] Las mutaciones relacionales respetan la autoridad exigida sobre todos los extremos obligatorios.
- [x] El carril administrativo local permanece separado del carril operativo.
- [x] Una sede asignada no sustituye turno, check-in ni rol operativo cuando sean requeridos.
- [x] La prueba exige paridad entre las capas materializadas.
- [x] Los controles negativos exigen cero efectos empresariales indebidos.
- [x] La evidencia conserva actor, permiso, territorio, recurso, decisión y resultado.
- [x] Un fallo técnico no se presenta como PASS.
- [x] La tarea no selecciona paquetes.
- [x] La ejecución física queda condicionada a `E5-GATE-008::<package_id> = PASS`.
- [x] La topología conserva una instancia por paquete aplicable y una certificación global final.
- [x] `GLOBAL-FINAL` no puede pasar con instancias aplicables faltantes o no PASS.
- [x] `AUTH-QA-004` permanece reservada para el trabajador sin turno.
- [x] Se crean cero requisitos de prueba.
- [x] Se modifican cero requisitos de prueba.
- [x] No se ejecuta implementación física desde esta tarea documental.

---

#### 26. Límites

Esta tarea no:

- crea empleados;
- crea sedes;
- crea áreas;
- crea `employee_sites`;
- crea `employee_areas`;
- cambia sede primaria;
- cambia sede seleccionada;
- crea turnos;
- crea check-ins;
- crea roles;
- crea roles operativos;
- crea permisos;
- crea grants;
- crea denies;
- modifica `AUTH-RBAC-003`;
- concede alcance `G`;
- modifica scopes;
- convierte `gerente` en `gerente_general`;
- crea excepciones multisede;
- modifica `AccessContext`;
- modifica resolutores de territorio;
- crea helpers de bypass;
- modifica navegación;
- modifica SHELL;
- modifica VISO;
- modifica NEXO;
- modifica FOGO;
- modifica ORIGO;
- modifica PULSO;
- modifica NUMERA;
- modifica ANIMA;
- modifica PASS;
- modifica AURA;
- modifica Supabase;
- crea tablas;
- crea vistas;
- crea migraciones;
- crea RLS;
- crea RPC;
- crea funciones;
- crea triggers;
- crea Edge Functions;
- crea Storage;
- crea Realtime;
- modifica datos;
- ejecuta fixtures reales;
- ejecuta pruebas físicas;
- selecciona `package_id`;
- aprueba `E5-GATE-008`;
- crea una instancia `AUTH-QA-003::<package_id>`;
- crea `AUTH-QA-003::GLOBAL-FINAL`;
- desarrolla `AUTH-QA-004`;
- crea requisitos de prueba;
- modifica requisitos de prueba.

---

#### 27. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-002 — Gerente general sin check-in entra a administración`

**TAREA ACTUAL APROBADA**
`AUTH-QA-003 — Gerente de sede solo opera sus sedes`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-004 — Trabajador sin turno queda bloqueado`
### ✅ AUTH-QA-004 — Trabajador sin turno queda bloqueado

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-003 — Gerente de sede solo opera sus sedes
**Tarea siguiente:** AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado
**Tipo de tarea:** documental; definición canónica de una prueba integral de bloqueo operativo reutilizable por paquete y certificable globalmente, para demostrar que un trabajador sin turno laboral publicado y utilizable no obtiene autoridad operativa, sin bloquear capacidades base que no dependen de turno ni desplazar razones posteriores de temporalidad, check-in o rol operativo
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-004::<package_id>` y la certificación `AUTH-QA-004::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un actor laboral activo que intenta usar una capacidad cuyo carril operativo exige turno no puede obtener autorización operativa cuando la resolución autoritativa concluye que no existe un turno laboral publicado y utilizable aplicable al intento.

La condición raíz es:

```text
SESIÓN AUTENTICADA VÁLIDA
+
EMPLEADO ACTIVO
+
APLICACIÓN ACCESIBLE
+
CAPACIDAD CON CARRIL OPERATIVO QUE EXIGE TURNO
+
RESOLUCIÓN DE TURNO CONCLUYENTE
+
NINGÚN TURNO LABORAL PUBLICADO UTILIZABLE
→
DENY DEL CARRIL OPERATIVO
+
AUTH_PUBLISHED_SHIFT_REQUIRED
+
CERO EFECTOS
```

La tarea certifica que el turno es una precondición real del carril operativo y no un dato decorativo que pueda sustituirse con sede seleccionada, sede primaria, perfil predeterminado, dispositivo, último turno conocido, check-in residual o rol base.

No crea turnos, publicaciones, check-ins, roles, permisos, sesiones ni excepciones.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con siete resultados obligatorios:

1. **DENY operativo por ausencia limpia de turno publicado:** una capacidad operativa que exige turno queda bloqueada cuando no existe una publicación laboral utilizable;
2. **razón exacta:** el bloqueo limpio utiliza `AUTH_PUBLISHED_SHIFT_REQUIRED` y no una razón genérica o posterior;
3. **cero efectos:** la solicitud denegada no produce mutaciones, reservas, movimientos, transiciones, escrituras, emisiones, confirmaciones ni efectos empresariales parciales;
4. **sin turno inventado:** ninguna sede, preferencia, dispositivo, perfil o dato legacy puede fabricar `active_shift`, `operational_role` u `operational_site`;
5. **sin sobrebloqueo del carril base:** una capacidad base que no depende de turno continúa evaluándose por su propio contrato;
6. **precedencia estable:** turno fuera de ventana, check-in ausente, rol faltante, conflicto estructural e indisponibilidad técnica conservan sus razones propietarias y no se reescriben como “sin turno”;
7. **paridad entre evaluadores:** todas las superficies aplicables producen una decisión equivalente para el mismo actor, permiso, contexto y recurso.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- el modelo canónico de identidad y actor laboral;
- la separación entre carril base y carril operativo;
- la regla de que el rol operativo efectivo procede del turno publicado y vigente;
- la resolución determinista de sede y área operativas;
- la precedencia de denegaciones y errores de contexto;
- el contrato `AUTH-ERR-009 — Sin turno publicado`;
- los contratos posteriores de ventana temporal, check-in y rol operativo;
- la paridad exigida entre interfaz, SDK, servidor, RPC, RLS y demás consumidores materializados;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- el gate físico `POST_E5_PACKAGE`.

La tarea no redefine catálogos, matrices, errores ni contratos de autorización ya aprobados.

---

#### 4. Semántica exacta de “trabajador”

El fixture primario utiliza un actor humano laboral con:

```text
principal = HUMAN_USER
actor = EMPLOYEE
employee_status = ACTIVE
base_role = trabajador_operativo
```

El objetivo no es autorizar por el nombre `trabajador_operativo`. La prueba conserva expresamente:

```text
ROL BASE
≠
ROL OPERATIVO
```

Y:

```text
TRABAJADOR ACTIVO
≠
TRABAJADOR AUTORIZADO PARA OPERAR
```

La misma regla de precondición deberá mantenerse cuando otro rol base intente entrar a un carril operativo: el permiso, el carril y el contexto determinan la decisión; el nombre del rol base no sustituye el turno.

---

#### 5. Semántica exacta de “sin turno”

Para el caso principal de esta tarea, “sin turno” significa:

```text
REQUIRES_PUBLISHED_SHIFT = true
+
PUBLISHED_SHIFT_RESOLUTION = CONCLUSIVE
+
USABLE_PUBLISHED_LABOR_SHIFT_COUNT = 0
```

No significa automáticamente cualquier `active_shift = null`.

Deben distinguirse al menos estos estados:

| Estado observado | Propietario de la decisión |
| --- | --- |
| no existe publicación laboral utilizable | esta tarea / `AUTH-ERR-009` |
| existe publicación, pero todavía no inicia o ya terminó | `AUTH-ERR-010` |
| existe turno vigente, pero falta check-in requerido | `AUTH-QA-005` / `AUTH-ERR-011` |
| existe turno vigente y check-in aplicable, pero falta rol operativo | contrato de rol operativo / `AUTH-ERR-012` |
| existen varios turnos candidatos o una contradicción estructural | contrato de conflicto correspondiente |
| la fuente no puede resolverse de forma confiable | contrato de indisponibilidad técnica correspondiente |
| la capacidad no exige turno | continuar por el carril aplicable; no usar este bloqueo |

La prueba falla si un consumidor colapsa esas condiciones en una sola etiqueta genérica.

---

#### 6. Unidad de prueba

La unidad lógica mínima es:

```text
actor
+
permission_code
+
authorization_requirement
+
selected_lane
+
application
+
resource
+
assigned_sites / assigned_areas
+
published_shift_state
+
resolved_at
```

El oracle primario compara la misma identidad, permiso y recurso cambiando únicamente el estado del turno cuando corresponda.

No se certifica el caso cambiando simultáneamente rol, permiso, sede, recurso o aplicación de forma que la causa del resultado quede indeterminada.

---

#### 7. Fixture mínimo

El fixture lógico mínimo contiene:

| Identidad | Estado |
| --- | --- |
| sesión | válida y personal |
| empleado | activo |
| rol base | `trabajador_operativo` |
| aplicación | accesible |
| sede asignada | activa y compatible |
| área asignada | activa cuando el permiso la requiere |
| permiso | exacto y vigente |
| carril seleccionado | `OPERATIONAL` |
| requisito de turno | `true` |
| publicación laboral aplicable | ninguna |
| resolución de turno | concluyente |
| efectos previos | cero |

El fixture debe evitar otra denegación anterior que oculte la ausencia de turno.

---

#### 8. Caso A — operación sin turno publicado

Entrada:

```text
employee = ACTIVE
base_role = trabajador_operativo
permission = válido
selected_lane = OPERATIONAL
requires_shift = true
assigned_site = válida
published_shift_count = 0
shift_resolution = CONCLUSIVE
```

Oracle:

```text
lane_decision = DENY
reason_code = AUTH_PUBLISHED_SHIFT_REQUIRED
executable = false
side_effects = 0
```

Para una respuesta no navegacional, el contrato de bloqueo conserva `403 Forbidden`.

La sesión del usuario se conserva. No se fuerza logout, no se publica un turno automáticamente y no se reintenta la operación por cuenta del usuario.

---

#### 9. Caso B — la sede no fabrica turno

Se mantiene el mismo caso A y se añade cualquiera de estas señales:

```text
selected_site_id = sede_asignada
```

```text
primary_site_id = sede_asignada
```

```text
device_site_id = sede_asignada
```

Oracle:

```text
active_shift = null
operational_role = null
operational_site = null
lane_decision = DENY
reason_code = AUTH_PUBLISHED_SHIFT_REQUIRED
```

Una sede válida define territorio potencial; no crea jornada ni rol operativo.

---

#### 10. Caso C — perfil o rol predeterminado no fabrica turno

Entrada adicional:

```text
default_operational_role = rol_válido
```

pero:

```text
published_shift_count = 0
```

Oracle:

```text
effective_operational_role = null
lane_decision = DENY
reason_code = AUTH_PUBLISHED_SHIFT_REQUIRED
```

Un perfil predeterminado puede ayudar a planificar un turno futuro, pero no constituye autoridad runtime.

---

#### 11. Caso D — check-in residual no fabrica turno

Si existe una señal legacy o residual que parezca un check-in, pero no existe un turno publicado utilizable compatible, el sistema no puede invertir la dependencia:

```text
checkin_like_signal = present
published_shift_count = 0
→
NO active_shift derivado
NO operational_role derivado
NO ALLOW operativo
```

Si la señal residual crea además un conflicto estructural, la razón final seguirá la precedencia canónica correspondiente; nunca se usará el check-in como fuente para reconstruir el turno.

---

#### 12. Caso E — capacidad base sin dependencia de turno

Control negativo contra sobrebloqueo:

```text
employee = ACTIVE
base_permission = válido
authorization_requirement = N
active_shift = null
```

Resultado esperado:

```text
NO AUTH_PUBLISHED_SHIFT_REQUIRED
```

La decisión del carril base continúa evaluándose con permiso, cobertura, recurso, denegaciones y demás condiciones propias.

La prueba falla si la ausencia de turno bloquea indiscriminadamente navegación o administración que el contrato clasifica como independiente de jornada.

---

#### 13. Caso F — turno publicado fuera de ventana

Entrada:

```text
published_shift_count = 1
published_shift = autoritativo
resolved_at fuera de [starts_at, ends_at)
```

Resultado:

```text
NO AUTH_PUBLISHED_SHIFT_REQUIRED
```

La decisión pertenece al contrato de ventana temporal y debe conservar su razón específica.

Este caso prueba precedencia; no amplía el alcance de `AUTH-QA-004`.

---

#### 14. Caso G — turno vigente sin check-in

Entrada:

```text
published_shift = exactamente uno
shift_window = vigente
requires_checkin = true
active_checkin_session = null
```

Resultado:

```text
NO AUTH_PUBLISHED_SHIFT_REQUIRED
```

La evaluación avanza hasta el gate de check-in y queda en el ámbito de `AUTH-QA-005`.

Este control demuestra el handoff exacto entre ambas tareas.

---

#### 15. Caso H — turno vigente para carril T

Para una capacidad cuyo carril operativo exige turno pero no check-in:

```text
published_shift = exactamente uno
shift_window = vigente
requires_checkin = false
```

La ausencia de check-in no puede reintroducir el bloqueo de esta tarea.

La evaluación continúa hacia rol operativo, territorio, permiso, recurso y demás controles aplicables. Este control no obliga a un `ALLOW` final si otra condición válida deniega.

---

#### 16. Casos ambiguos e indisponibilidad

No se consideran “sin turno” limpio:

- dos o más publicaciones candidatas incompatibles;
- publicación corrupta o imposible de interpretar;
- catálogo o fuente de turnos no disponible;
- lectura técnica incompleta;
- turno con identidad laboral contradictoria;
- resultado de caché cuyo origen no puede revalidarse.

El sistema debe fallar cerrado usando la razón propietaria del conflicto o de indisponibilidad. No puede escoger el primer turno, usar el último turno conocido ni degradar un error técnico a ausencia limpia.

---

#### 17. Paridad de evaluadores

Para el mismo fixture, todos los evaluadores materializados aplicables deben conservar semántica equivalente:

| Superficie | Requisito |
| --- | --- |
| navegación / UI | no ofrecer una operación como ejecutable cuando el carril operativo está bloqueado |
| contrato compartido / SDK | conservar decisión y razón canónicas |
| Server Actions / Route Handlers | revalidar antes del efecto y denegar |
| RPC / PostgREST | no producir efecto mediante llamada directa |
| RLS / Data API | no permitir acceso o mutación que dependa del carril operativo incompleto |
| Edge Functions | resolver contexto y autorización sin bypass local |
| Realtime / colas / offline | no reproducir una autorización antigua; revalidar antes de aplicar efectos |
| clientes nativos o dispositivos compartidos | no derivar turno desde dispositivo, PIN o estado de navegación |

La UI no constituye el control de seguridad final.

---

#### 18. Efectos prohibidos

Un caso A certificado debe demostrar cero efectos observables en el dominio aplicable, incluyendo cuando corresponda:

- cero inserts o updates empresariales;
- cero movimientos de inventario;
- cero transiciones de remisión;
- cero lotes o consumos;
- cero ventas, entregas o confirmaciones;
- cero órdenes o recepciones;
- cero cambios de configuración;
- cero eventos de negocio que afirmen éxito;
- cero efectos diferidos en colas u offline;
- cero privilegios persistidos para reutilización posterior.

La evidencia de intento o auditoría de seguridad sí puede registrarse conforme a su contrato; no se considera efecto empresarial autorizado.

---

#### 19. Caché, cambio de contexto y frescura

Una decisión anterior no sobrevive a la pérdida o ausencia de turno.

La prueba debe rechazar como fuentes de autoridad:

```text
last_known_shift
last_known_operational_role
cached_can_operate
cached_active_site
selected_site
navigation_role
legacy_role_override
```

Toda operación protegida revalida el contexto necesario antes del efecto. Una corrección administrativa de la jornada requiere una solicitud nueva; no se reanuda automáticamente una operación previamente denegada.

---

#### 20. Auditoría obligatoria

La evidencia por caso debe permitir reconstruir, sin exponer secretos:

- principal y actor efectivos;
- aplicación y permiso evaluados;
- modalidad y carril seleccionados;
- requisito de turno;
- estado de resolución de publicación;
- cantidad de turnos utilizables encontrada;
- decisión del carril;
- reason code público;
- contexto territorial relevante minimizado;
- fingerprint o versión del contexto cuando el consumidor lo soporte;
- confirmación de cero efectos empresariales.

No se registran tokens, secretos ni payloads sensibles completos.

---

#### 21. Casos mínimos de certificación

Cada ejecución física aplicable debe cubrir como mínimo:

| Caso | Escenario | Oracle |
| --- | --- | --- |
| A | operativo, cero turnos publicados utilizables | `DENY` + `AUTH_PUBLISHED_SHIFT_REQUIRED` |
| B | misma ausencia + sede primaria/seleccionada/dispositivo | mismo `DENY`; sin turno inventado |
| C | misma ausencia + perfil operativo predeterminado | mismo `DENY`; sin rol runtime inventado |
| D | señal residual de check-in sin turno | no reconstruir turno |
| E | capacidad base `N` sin turno | no usar `AUTH_PUBLISHED_SHIFT_REQUIRED` |
| F | turno publicado fuera de ventana | razón temporal propietaria, no `AUTH-ERR-009` |
| G | turno vigente `T+C` sin check-in | avanzar a la razón de `AUTH-QA-005` |
| H | turno vigente `T` | superar exclusivamente el gate de turno y continuar evaluación |
| I | fuente de turno indisponible | fail closed técnico; no ausencia limpia |
| J | bypass directo por RPC/API | misma denegación efectiva y cero efectos |

No se permite marcar PASS con casos críticos omitidos o convertidos en `skip` por ausencia de fixture.

---

#### 22. Clasificación de fallos

La ejecución de `AUTH-QA-004` falla si ocurre cualquiera de estas condiciones:

1. una operación que exige turno resulta ejecutable sin publicación laboral utilizable;
2. se deriva turno desde sede, dispositivo, check-in, rol base, perfil o caché;
3. se usa un reason code distinto para una ausencia limpia concluyente;
4. una capacidad base independiente queda bloqueada únicamente por falta de turno;
5. un turno fuera de ventana se clasifica como ausencia de publicación;
6. un turno vigente sin check-in vuelve a clasificarse como ausencia de turno;
7. una superficie permite el efecto mientras otra lo deniega;
8. una llamada directa evita el control de contexto;
9. existen efectos empresariales parciales después del `DENY`;
10. una indisponibilidad técnica se degrada silenciosamente a ausencia limpia.

---

#### 23. Modelo de ejecución por paquete

`AUTH-QA-004` usa la topología del BLOQUE U:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Cada paquete que materialice una superficie relevante conserva una identidad física:

```text
AUTH-QA-004::<package_id>
```

Esa ejecución solo puede ocurrir cuando el paquete propietario haya satisfecho su gate `POST_E5_PACKAGE`, incluido el `E5-GATE-008::<package_id>` aplicable.

La tarea documental no selecciona paquetes, no autoriza instancias y no ejecuta pruebas físicas.

---

#### 24. Certificación global final

La certificación global:

```text
AUTH-QA-004::GLOBAL-FINAL
```

agrega evidencia de los paquetes aplicables y verifica como mínimo:

- ningún consumidor autoriza operación sin turno requerido;
- ninguna superficie fabrica contexto operativo;
- razón y precedencia permanecen coherentes;
- no hay divergencia entre UI, SDK, servidor, RPC y RLS aplicables;
- cero casos críticos fallidos;
- cero casos críticos omitidos por incompatibilidad de fixture;
- toda excepción futura está respaldada por contrato canónico explícito y no por bypass local.

La certificación global no sustituye las ejecuciones por paquete ni permite ejecutar antes de E5.

---

#### 25. Handoff hacia AUTH-QA-005

`AUTH-QA-005` recibe exactamente este estado:

```text
employee = ACTIVE
published_shift = exactamente uno
shift_window = vigente
requires_checkin = true
active_checkin_session = null
```

Su responsabilidad será demostrar que el turno válido por sí solo no completa una operación `T+C` cuando falta check-in.

`AUTH-QA-005` no reabre la ausencia de publicación definida aquí.

---

#### 26. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos obsoletos: 0
```

La cobertura requerida ya existe en el registro canónico vigente y esta tarea la convierte en un contrato integral certificable sin alterar el registro.

---

#### 27. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`, para impedir autorización final por nombre de rol o atajos locales;
- `TREQ-AUTH-004`, para exigir decisiones y razones equivalentes entre evaluadores;
- `TREQ-AUTH-008`, para mantener la separación entre carril administrativo/base y carril operativo con turno y check-in cuando correspondan;
- `TREQ-AUTH-009`, para resolver contexto territorial y operativo de forma determinista;
- `TREQ-AUTH-013`, para impedir bypass mediante URL, formulario, API o RPC y exigir revalidación server-side;
- `TREQ-AUTH-182`, para preservar la precedencia entre ausencia de turno, ventana temporal, check-in y conflictos de contexto;
- los contratos vigentes de `AUTH-ERR-009`, `AUTH-ERR-010`, `AUTH-ERR-011` y del rol operativo requerido.

Estas referencias son trazabilidad heredada, no cambios 04A.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no ejecuta builds de producto; la batería documental posterior valida el plan |
| LOCAL | NOT_EXECUTED | no se ha ejecutado todavía el fixture contra un paquete o checkout del usuario |
| REMOTA | PASS | fuentes canónicas, archivo propietario, topología, contratos de turno/error y registro 04A fueron inspeccionados en el repositorio vigente |
| OPERATIVA | NOT_EXECUTED | las instancias por paquete y la certificación global permanecen pendientes |
| FÍSICA | NOT_APPLICABLE | esta tarea documental no autoriza materialización física |

---

#### 29. Criterios de aceptación

`AUTH-QA-004` queda documentalmente completa cuando se acepta que:

1. la ausencia limpia de un turno publicado utilizable deniega el carril operativo cuando el permiso exige turno;
2. la razón exacta es `AUTH_PUBLISHED_SHIFT_REQUIRED`;
3. una sede, área, dispositivo, check-in residual, perfil, rol base o caché no pueden crear turno ni rol operativo;
4. la ausencia de turno no bloquea por sí sola un carril base que no depende de jornada;
5. turno fuera de ventana, check-in ausente, rol faltante, conflicto e indisponibilidad conservan razones propias;
6. las superficies aplicables producen una decisión equivalente;
7. la denegación produce cero efectos empresariales;
8. las llamadas directas no evitan el control;
9. el handoff hacia `AUTH-QA-005` comienza únicamente después de demostrar un turno publicado y vigente;
10. el modelo físico continúa siendo por paquete más certificación global final y permanece fuera del alcance de esta tarea documental;
11. no se crean ni modifican requisitos de prueba;
12. no se ejecuta ningún cambio físico.

---

#### 30. Límites

Esta tarea no:

- prueba el caso “turno vigente sin check-in” como resultado final; pertenece a `AUTH-QA-005`;
- prueba el caso positivo completo “turno y check-in válidos”; pertenece a `AUTH-QA-006`;
- redefine mensajes o códigos de `AUTH-ERR-009` a `AUTH-ERR-012`;
- convierte todo `active_shift = null` en ausencia de publicación;
- autoriza por rol base, sede seleccionada o dispositivo;
- crea turnos, publicaciones o check-ins;
- modifica permisos, matrices, RLS, RPC, Supabase, aplicaciones o datos;
- ejecuta instancias físicas `AUTH-QA-004::<package_id>`;
- ejecuta `AUTH-QA-004::GLOBAL-FINAL`;
- reemplaza las validaciones específicas de cada paquete;
- crea una excepción para legacy.

---

#### 31. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-003 — Gerente de sede solo opera sus sedes`

**TAREA ACTUAL APROBADA**
`AUTH-QA-004 — Trabajador sin turno queda bloqueado`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado`
### ✅ AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-004 — Trabajador sin turno queda bloqueado
**Tarea siguiente:** AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo
**Tipo de tarea:** documental; definición canónica de una prueba integral de bloqueo operativo reutilizable por paquete y certificable globalmente, para demostrar que un trabajador con turno laboral publicado y vigente no obtiene autoridad en un carril `T+C` cuando falta una sesión de check-in autoritativa y compatible, sin imponer check-in a carriles `T` ni a capacidades base
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-005::<package_id>` y la certificación `AUTH-QA-005::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, asistencia ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un actor laboral activo que ya posee exactamente un turno laboral publicado y vigente no puede obtener autorización para una capacidad cuyo carril operativo exige `T+C` cuando la resolución autoritativa del check-in concluye que no existe una sesión abierta y compatible con el actor, la sede y el turno vigentes.

La condición raíz es:

```text
SESIÓN AUTENTICADA VÁLIDA
+
EMPLEADO ACTIVO
+
APLICACIÓN ACCESIBLE
+
CAPACIDAD CON CARRIL OPERATIVO T+C
+
EXACTAMENTE UN TURNO LABORAL PUBLICADO Y VIGENTE
+
CHECKIN_RESOLUTION = CONCLUSIVE_ABSENT
→
DENY DEL CARRIL OPERATIVO
+
AUTH_CHECKIN_REQUIRED
+
403
+
CERO EFECTOS
```

La tarea certifica que un turno válido no equivale a presencia laboral confirmada cuando la capacidad exige check-in y que esa presencia no puede reconstruirse desde estado del cliente, cookies, eventos recientes, sede seleccionada, dispositivo, caché ni cualquier booleano sin identidad de sesión.

No crea check-ins, eventos de asistencia, turnos, roles, permisos, sesiones ni excepciones.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con ocho resultados obligatorios:

1. **DENY operativo por ausencia limpia de check-in:** un carril `T+C` queda bloqueado cuando el turno existe y está vigente, pero no existe una sesión de check-in autoritativa y compatible;
2. **razón exacta:** la ausencia limpia utiliza `AUTH_CHECKIN_REQUIRED` y no una razón genérica de asistencia, turno, rol o permiso;
3. **cero efectos:** la solicitud denegada no produce mutaciones, reservas, movimientos, transiciones, escrituras, eventos empresariales, colas ni efectos offline;
4. **sesión de autenticación conservada:** el bloqueo no implica cerrar sesión automáticamente;
5. **sin presencia inventada:** ninguna señal local, evento reciente, sede, dispositivo o caché puede fabricar `active_checkin_session`;
6. **sin sobrebloqueo:** los carriles `T` y las capacidades base que no exigen check-in continúan evaluándose por sus propios contratos;
7. **precedencia estable:** ausencia de turno, turno fuera de ventana, conflictos de asistencia, indisponibilidad técnica y rol operativo faltante conservan sus razones propietarias;
8. **paridad entre evaluadores:** las superficies aplicables producen una decisión equivalente para el mismo actor, permiso, turno, sede, recurso y estado de asistencia.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- el modelo canónico de identidad y actor laboral;
- la separación entre carril base y carril operativo;
- la clasificación de prerrequisitos `N`, `T` y `T+C`;
- la regla de que el turno publicado y vigente se resuelve antes del check-in;
- el contrato autoritativo de sesión activa basado en asistencia;
- la precedencia de denegaciones y errores de contexto;
- `AUTH-ERR-009 — Sin turno publicado`;
- `AUTH-ERR-010 — Fuera de turno`;
- `AUTH-ERR-011 — Check-in requerido`;
- los contratos posteriores de rol operativo, territorio, dispositivo y permiso;
- la paridad exigida entre interfaz, SDK, servidor, RPC, RLS y demás consumidores materializados;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- el gate físico `POST_E5_PACKAGE`.

La tarea no redefine catálogos, matrices, errores ni contratos de autorización ya aprobados.

---

#### 4. Semántica exacta de “trabajador con turno”

El fixture primario utiliza un actor humano laboral con:

```text
principal = HUMAN_USER
actor = EMPLOYEE
employee_status = ACTIVE
base_role = trabajador_operativo
published_shift_count = 1
active_shift = EXACTLY_ONE
shift_window = CURRENT
```

El turno debe ser:

- laboral;
- publicado mediante la fuente autoritativa vigente;
- aplicable al actor efectivo;
- temporalmente vigente en `resolved_at`;
- territorialmente resoluble para la sede operativa correspondiente;
- inequívoco, sin solapamientos ni múltiples candidatos.

La tarea no certifica un turno inexistente ni uno fuera de ventana. Esos estados pertenecen a las tareas anteriores de la cadena causal.

---

#### 5. Semántica exacta de “sin check-in”

Para el caso principal, “sin check-in” significa:

```text
REQUIRES_CHECKIN = true
+
ACTIVE_SHIFT = exactly_one
+
ACTIVE_CHECKIN_SESSION = null
+
CHECKIN_STATE = ABSENT
+
CHECKIN_RESOLUTION = CONCLUSIVE
```

También se considera ausencia limpia para una nueva operación `T+C` cuando una sesión anterior compatible quedó correctamente cerrada:

```text
CHECKIN_STATE = CLOSED
→
AUTH_CHECKIN_REQUIRED
```

No pertenecen a esta ausencia limpia:

| Estado observado | Propietario de la decisión |
| --- | --- |
| no existe turno publicado | `AUTH-QA-004` / `AUTH-ERR-009` |
| existe turno publicado fuera de ventana | `AUTH-ERR-010` |
| check-in de otro actor, sede o turno | conflicto estructural; no ausencia limpia |
| múltiples sesiones abiertas | conflicto; no seleccionar una arbitrariamente |
| sesión residual o check-out contradictorio | contrato de conflicto de asistencia |
| fuente de asistencia no verificable | contrato de indisponibilidad técnica |
| carril operativo `T` | continuar sin check-in si los demás controles se cumplen |
| capacidad sin carril operativo | no evaluar esta razón |
| falta rol operativo después de satisfacer check-in | `AUTH-ERR-012` |

`active_checkin_session = null` por sí solo no basta: primero debe estar demostrado que el permiso y el carril exigen check-in y que turno, temporalidad y fuentes anteriores fueron resueltos correctamente.

---

#### 6. Unidad de prueba

La unidad lógica mínima es:

```text
actor
+
permission_code
+
authorization_requirement
+
selected_lane
+
application
+
resource
+
active_shift
+
operational_site
+
checkin_requirement
+
checkin_state
+
resolved_at
```

El oracle compara la misma identidad, permiso, turno, sede y recurso cambiando únicamente el estado de check-in cuando corresponda.

No se certifica el caso cambiando simultáneamente rol, permiso, turno, sede o recurso de forma que la causa de la decisión quede indeterminada.

---

#### 7. Fixture mínimo

El fixture lógico mínimo contiene:

| Identidad | Estado |
| --- | --- |
| sesión | válida y personal |
| empleado | activo |
| rol base | `trabajador_operativo` |
| aplicación | accesible |
| sede operativa | derivada del turno vigente y compatible |
| turno publicado | exactamente uno |
| ventana temporal | vigente |
| permiso | exacto y vigente |
| carril seleccionado | `OPERATIONAL` |
| prerrequisito | `T+C` |
| sesión de check-in | ausente de forma concluyente |
| conflictos de asistencia | ninguno |
| disponibilidad de fuente | válida |
| efectos previos | cero |

El fixture debe evitar una denegación anterior que oculte la ausencia de check-in.

---

#### 8. Caso A — turno vigente y check-in ausente

Entrada:

```text
employee = ACTIVE
active_shift = EXACTLY_ONE
shift_window = CURRENT
permission = válido
selected_lane = OPERATIONAL
authorization_requirement = T+C
checkin_state = ABSENT
checkin_resolution = CONCLUSIVE
```

Oracle:

```text
lane_decision = DENY
reason_code = AUTH_CHECKIN_REQUIRED
http_status = 403
executable = false
side_effects = 0
```

La sesión de autenticación se conserva.

---

#### 9. Caso B — sesión anterior correctamente cerrada

Entrada:

```text
active_shift = EXACTLY_ONE
shift_window = CURRENT
authorization_requirement = T+C
previous_checkin_session = CLOSED
active_checkin_session = null
```

Oracle:

```text
DENY
AUTH_CHECKIN_REQUIRED
ZERO_EFFECTS
```

Una sesión cerrada no se reutiliza como presencia activa. La recuperación consiste en completar un nuevo check-in autorizado y emitir una solicitud nueva.

---

#### 10. Caso C — intención local no confirmada por servidor

Entrada:

```text
authorization_requirement = T+C
active_shift = válido
client_checkin_intent = present
server_confirmed_active_checkin = false
```

Oracle:

```text
DENY
AUTH_CHECKIN_REQUIRED
```

Una intención local, cola offline pendiente, estado visual, cookie o evento aún no confirmado no constituye presencia autoritativa.

---

#### 11. Caso D — carril operativo T sin check-in

Entrada:

```text
active_shift = válido
authorization_requirement = T
active_checkin_session = null
```

Oracle:

```text
NO AUTH_CHECKIN_REQUIRED
CONTINUAR EVALUACIÓN
```

La ausencia de check-in no puede degradar un carril `T` a `T+C`.

---

#### 12. Caso E — carril base independiente

Entrada:

```text
base_lane = aplicable
authorization_requirement = N o BASE_ONLY
active_checkin_session = null
```

Oracle:

```text
NO AUTH_CHECKIN_REQUIRED
EVALUAR CARRIL BASE SEGÚN SU PROPIO CONTRATO
```

El nombre de la aplicación o del rol no convierte una capacidad base en operación presencial.

---

#### 13. Caso F — turno ausente

Entrada:

```text
requires_shift = true
published_shift_count = 0
active_checkin_session = null
```

Oracle:

```text
AUTH_PUBLISHED_SHIFT_REQUIRED
```

No debe alcanzarse `AUTH_CHECKIN_REQUIRED`, porque la publicación de turno se resuelve antes.

---

#### 14. Caso G — turno fuera de ventana

Entrada:

```text
published_shift_count = 1
resolved_at outside [starts_at, ends_at)
active_checkin_session = null
```

Oracle:

```text
AUTH_OUTSIDE_SHIFT_WINDOW
```

La ausencia de check-in no desplaza la razón temporal anterior.

---

#### 15. Caso H — check-in incompatible

Entrada:

```text
active_shift = válido
requires_checkin = true
checkin_session = presente
checkin_actor != actor_effective
```

O:

```text
checkin_site != operational_site
```

O:

```text
checkin_shift != active_shift
```

Oracle:

```text
FAIL CLOSED
NO AUTH_CHECKIN_REQUIRED COMO AUSENCIA LIMPIA
```

El mismatch concluyente pertenece al contrato de conflicto correspondiente. No se descarta la sesión incompatible para fingir una ausencia simple.

---

#### 16. Caso I — múltiples sesiones activas

Entrada:

```text
matching_open_checkin_candidates > 1
```

Oracle:

```text
FAIL CLOSED
NO LIMIT 1
NO AUTH_CHECKIN_REQUIRED COMO AUSENCIA LIMPIA
```

No se selecciona la primera ni la más reciente para continuar.

---

#### 17. Caso J — fuente de asistencia no verificable

Entrada:

```text
checkin_source = UNAVAILABLE
```

Oracle:

```text
FAIL CLOSED TÉCNICO
NO AUTH_CHECKIN_REQUIRED COMO AUSENCIA LIMPIA
```

La indisponibilidad no se presenta como si el trabajador simplemente no hubiera marcado entrada.

---

#### 18. Caso K — check-in válido

Entrada:

```text
active_shift = EXACTLY_ONE
shift_window = CURRENT
authorization_requirement = T+C
active_checkin_session = ACTIVE
checkin_actor = actor_effective
checkin_site = operational_site
checkin_shift = active_shift
server_confirmed = true
session_unique = true
```

Oracle de esta tarea:

```text
CHECKIN_GATE = PASS
NO AUTH_CHECKIN_REQUIRED
CONTINUAR EVALUACIÓN
```

Este resultado no concede autorización final. El handoff positivo continúa en `AUTH-QA-006`, que debe comprobar la obtención del rol operativo efectivo y la continuación del árbol de autorización.

---

#### 19. Contrato de compatibilidad de la sesión activa

Una sesión de check-in solo satisface el gate cuando prueba simultáneamente:

```text
employee_id = actor_effective.employee_id
AND site_id = operational_site.site_id
AND shift_id = active_shift.shift_id
AND check_in_confirmed_by_server = true
AND session_is_open = true
AND session_is_unique = true
AND references_are_consistent = true
```

No basta con:

- cualquier evento reciente;
- el último check-in del empleado sin contexto;
- un booleano `checked_in_now` aislado;
- una solicitud offline todavía pendiente;
- el estado visual de una aplicación;
- una sede seleccionada;
- una sesión cerrada;
- un evento producido por otro dispositivo o actor.

---

#### 20. Clasificación por permiso y carril

La prueba conserva la distribución canónica vigente:

| Grupo | Cantidad | Regla de check-in |
| --- | ---: | --- |
| permisos sin carril operativo | 68 | no aplica este bloqueo |
| carriles operativos `T` | 19 | no requieren check-in |
| carriles operativos `T+C` | 53 | requieren check-in activo |
| total de permisos canónicos | 140 | decisión explícita por permiso y carril |

La unidad de autorización es el permiso y su carril. Una política global por aplicación no sustituye esta clasificación.

---

#### 21. Modalidades de autorización

| Modalidad | Resultado ante check-in ausente |
| --- | --- |
| `BASE_ONLY` | no evalúa esta razón |
| `OPERATIONAL_ONLY` con `T` | continúa sin check-in |
| `OPERATIONAL_ONLY` con `T+C` | deniega con `AUTH_CHECKIN_REQUIRED` |
| `BASE_OR_OPERATIONAL` | evalúa ambos carriles por separado; un carril base completo puede autorizar sin check-in |
| `BASE_AND_OPERATIONAL` | si el componente operativo exige `T+C`, la ausencia de check-in deniega la decisión final |

No se combinan fragmentos incompletos de distintos carriles para fabricar un `ALLOW`.

---

#### 22. Antipatrones prohibidos

La prueba debe fallar si cualquier consumidor utiliza como autoridad:

```text
checked_in_now enviado por cliente
last_checkin_event
selected_site
navigation_role
device_last_actor
cached_operational_context
cookie de presencia
estado visual de asistencia
última sesión conocida
```

También queda prohibido:

- escoger una sesión mediante `limit 1` cuando existen múltiples candidatas;
- aceptar una sesión de otro turno o sede;
- convertir un error de lectura en ausencia limpia;
- reanudar automáticamente una operación después de un check-in posterior;
- usar propietario, gerente general, gerente o cualquier nombre de rol como bypass implícito;
- exigir check-in a un permiso `T` únicamente por pertenecer a una aplicación que suele usar `T+C`.

---

#### 23. Paridad entre superficies

Para la misma identidad, turno, permiso, carril, sede, recurso y ausencia concluyente de check-in, las superficies materializadas deben producir una decisión equivalente.

| Superficie | Condición mínima |
| --- | --- |
| navegación / UI | no ofrecer la operación `T+C` como ejecutable sin presencia confirmada |
| contrato compartido / SDK | conservar `DENY` y `AUTH_CHECKIN_REQUIRED` |
| Server Actions / Route Handlers | revalidar asistencia antes del efecto |
| RPC / PostgREST | denegar llamadas directas con el mismo contexto |
| RLS / Data API | no permitir un efecto que dependa del carril `T+C` incompleto |
| Edge Functions | no mantener bypass local de presencia |
| Realtime / colas / offline | revalidar antes de entregar o aplicar un efecto protegido |
| clientes nativos o dispositivos compartidos | no prestar la presencia del dispositivo, administrador o actor anterior |

La UI no constituye el control de seguridad final.

---

#### 24. Efectos prohibidos

Un caso bloqueado certificado debe demostrar cero efectos observables en el dominio aplicable, incluyendo cuando corresponda:

- cero inserts o updates empresariales;
- cero movimientos de inventario;
- cero transiciones de remisión;
- cero lotes o consumos;
- cero ventas, cobros, entregas o confirmaciones;
- cero órdenes o recepciones;
- cero cambios de configuración;
- cero eventos de negocio que afirmen éxito;
- cero jobs o colas comprometidas;
- cero efectos offline reintentados automáticamente;
- cero privilegios persistidos para reutilización posterior.

La evidencia de intento o auditoría de seguridad sí puede registrarse conforme a su contrato; no se considera efecto empresarial autorizado.

---

#### 25. Recuperación, frescura y nueva solicitud

Un check-in realizado después del `DENY` no reanuda automáticamente la operación anterior.

La recuperación correcta es:

```text
DENY
→ usuario completa check-in autorizado
→ sesión queda confirmada por servidor
→ contexto anterior se invalida o deja de ser reutilizable
→ nueva solicitud
→ nueva resolución completa
```

Toda mutación protegida debe revalidar el contexto inmediatamente antes del primer efecto material. Una decisión positiva antigua no puede sobrevivir a check-out, cambio de turno, sede, actor o estado de sesión.

---

#### 26. Auditoría obligatoria

La evidencia por caso debe permitir reconstruir, sin exponer secretos:

- principal y actor efectivos;
- aplicación y permiso evaluados;
- modalidad y carril seleccionados;
- identidad del turno vigente minimizada;
- requisito de check-in;
- estado de resolución de la sesión;
- decisión del carril;
- reason code público;
- contexto territorial relevante minimizado;
- fingerprint o versión del contexto cuando el consumidor lo soporte;
- confirmación de cero efectos empresariales.

No se registran tokens, secretos, payloads completos ni información laboral innecesaria para la evidencia.

---

#### 27. Casos mínimos de certificación

Cada ejecución física aplicable debe cubrir como mínimo:

| Caso | Escenario | Oracle |
| --- | --- | --- |
| A | `T+C`, turno vigente, sin sesión | `DENY` + `AUTH_CHECKIN_REQUIRED` |
| B | `T+C`, sesión anterior cerrada | mismo `DENY`; exige nueva presencia |
| C | `T+C`, intención local no confirmada | mismo `DENY` |
| D | `T`, turno vigente, sin check-in | no usar `AUTH_CHECKIN_REQUIRED` |
| E | carril base independiente | no usar `AUTH_CHECKIN_REQUIRED` |
| F | sin turno publicado | razón de `AUTH-QA-004` |
| G | turno fuera de ventana | razón temporal propietaria |
| H | sesión de otro actor/sede/turno | conflicto; no ausencia limpia |
| I | múltiples sesiones | fail closed; no selección arbitraria |
| J | fuente de asistencia indisponible | fail closed técnico |
| K | `T+C` con sesión válida | superar este gate y continuar a `AUTH-QA-006` |
| L | llamada directa por RPC/API sin check-in | misma denegación efectiva y cero efectos |

No se permite marcar PASS con casos críticos omitidos o convertidos en `skip` por ausencia de fixture.

---

#### 28. Clasificación de fallos

La ejecución de `AUTH-QA-005` falla si ocurre cualquiera de estas condiciones:

1. una capacidad `T+C` resulta ejecutable sin sesión de check-in válida y compatible;
2. se acepta presencia desde estado del cliente, cookie, evento reciente, caché o dispositivo;
3. se usa un reason code distinto para una ausencia limpia concluyente;
4. un carril `T` queda bloqueado únicamente por falta de check-in;
5. una capacidad base independiente queda bloqueada únicamente por falta de check-in;
6. ausencia de turno o turno fuera de ventana se reclasifican como falta de check-in;
7. un mismatch, multiplicidad o sesión residual se degrada a ausencia limpia;
8. una indisponibilidad técnica se presenta como `AUTH_CHECKIN_REQUIRED`;
9. una superficie permite el efecto mientras otra lo deniega;
10. una llamada directa evita el control;
11. existen efectos empresariales parciales después del `DENY`;
12. una operación previamente denegada se reanuda automáticamente después de un check-in tardío.

---

#### 29. Modelo de ejecución por paquete

`AUTH-QA-005` usa la topología del BLOQUE U:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Cada paquete que materialice una superficie relevante conserva una identidad física:

```text
AUTH-QA-005::<package_id>
```

Esa ejecución solo puede ocurrir cuando el paquete propietario haya satisfecho su gate `POST_E5_PACKAGE`, incluido el `E5-GATE-008::<package_id>` aplicable.

La tarea documental no selecciona paquetes, no autoriza instancias y no ejecuta pruebas físicas.

---

#### 30. Certificación global final

La certificación global:

```text
AUTH-QA-005::GLOBAL-FINAL
```

agrega evidencia de los paquetes aplicables y verifica como mínimo:

- ningún consumidor autoriza un carril `T+C` sin check-in compatible;
- ningún consumidor exige check-in a un carril `T` o base por inferencia local;
- ausencia, conflicto e indisponibilidad conservan razones distintas;
- ninguna superficie fabrica presencia desde estado no autoritativo;
- no hay divergencia entre UI, SDK, servidor, RPC y RLS aplicables;
- cero casos críticos fallidos;
- cero casos críticos omitidos por incompatibilidad de fixture;
- toda excepción futura está respaldada por contrato canónico explícito y no por bypass local.

La certificación global no sustituye las ejecuciones por paquete ni permite ejecutar antes de E5.

---

#### 31. Handoff hacia AUTH-QA-006

`AUTH-QA-006` recibe exactamente este estado:

```text
employee = ACTIVE
published_shift = exactamente uno
shift_window = vigente
authorization_requirement = T+C
active_checkin_session = válida
checkin_actor = actor_effective
checkin_site = operational_site
checkin_shift = active_shift
server_confirmed = true
session_unique = true
```

Su responsabilidad será demostrar que, una vez satisfechos turno y check-in, el contexto obtiene el rol operativo efectivo desde la fuente canónica correspondiente y continúa el árbol de autorización sin convertir ese rol en permiso final automático.

`AUTH-QA-006` no reabre la ausencia de check-in definida aquí.

---

#### 32. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos obsoletos: 0
```

La cobertura requerida ya existe en el registro canónico vigente y esta tarea la convierte en un contrato integral certificable sin alterar el registro.

---

#### 33. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-001`, para impedir autorización final por nombre de rol o atajos locales;
- `TREQ-AUTH-004`, para exigir decisiones y razones equivalentes entre evaluadores;
- `TREQ-AUTH-008`, para mantener la separación entre carriles base, `T` y `T+C`;
- `TREQ-AUTH-009`, para resolver sede y contexto operativo de forma determinista;
- `TREQ-AUTH-013`, para impedir bypass mediante URL, formulario, API o RPC y exigir revalidación server-side;
- `TREQ-AUTH-014`, para invalidar contexto y autoridad derivada cuando cambia la sesión o la jornada;
- `TREQ-AUTH-182`, para preservar precedencia entre turno, temporalidad, check-in, conflicto e indisponibilidad;
- `TREQ-AUTH-229` a `TREQ-AUTH-236`, para identidad de `AUTH_CHECKIN_REQUIRED`, clasificación por carril, sesión compatible, precedencia, paridad entre canales, cobertura de aplicaciones y experiencia de recuperación;
- `TREQ-AUTH-330`, para mantener mutuamente excluyentes ausencia limpia, conflicto e indisponibilidad de asistencia;
- el contrato vigente `AUTH-ERR-011 — Check-in requerido`.

Estas referencias son trazabilidad heredada, no cambios 04A.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea no ejecuta builds de producto; la batería documental posterior valida el plan |
| LOCAL | NOT_EXECUTED | no se ha ejecutado todavía el fixture contra un paquete o checkout del usuario |
| REMOTA | PASS | fuentes canónicas, archivo propietario, topología, contrato de check-in y registro 04A fueron inspeccionados en el repositorio vigente |
| OPERATIVA | NOT_EXECUTED | las instancias por paquete y la certificación global permanecen pendientes |
| FÍSICA | NOT_APPLICABLE | esta tarea documental no autoriza materialización física |

---

#### 35. Criterios de aceptación

`AUTH-QA-005` queda documentalmente completa cuando se acepta que:

1. un carril `T+C` con turno publicado y vigente deniega cuando la resolución concluye ausencia de sesión compatible;
2. la razón exacta es `AUTH_CHECKIN_REQUIRED`;
3. la denegación conserva autenticación y produce cero efectos empresariales;
4. una sesión válida debe coincidir exactamente con actor, sede y turno y estar abierta, confirmada y ser única;
5. carriles `T` y capacidades base no heredan el requisito de check-in por aplicación o rol;
6. ausencia de turno, ventana temporal, mismatch, multiplicidad, sesión residual e indisponibilidad conservan razones propias;
7. ninguna señal local, cookie, dispositivo, evento reciente o caché fabrica presencia;
8. las superficies aplicables producen una decisión equivalente;
9. las llamadas directas no evitan el control;
10. realizar check-in después de un `DENY` exige una solicitud nueva;
11. el handoff hacia `AUTH-QA-006` comienza únicamente con una sesión activa autoritativa y compatible;
12. el modelo físico continúa siendo por paquete más certificación global final y permanece fuera del alcance de esta tarea documental;
13. no se crean ni modifican requisitos de prueba;
14. no se ejecuta ningún cambio físico.

---

#### 36. Límites

Esta tarea no:

- redefine la ausencia de turno publicada por `AUTH-QA-004`;
- redefine la ventana temporal del turno;
- prueba como resultado final la obtención del rol operativo; pertenece a `AUTH-QA-006`;
- convierte cualquier `active_checkin_session = null` en ausencia limpia sin verificar el carril y la fuente;
- exige check-in a carriles `T`, `BASE_ONLY` o a un carril base válido por inferencia local;
- selecciona sesiones ambiguas;
- convierte indisponibilidad técnica en ausencia;
- crea check-ins, eventos de asistencia o turnos;
- modifica permisos, matrices, RLS, RPC, Supabase, aplicaciones o datos;
- ejecuta instancias físicas `AUTH-QA-005::<package_id>`;
- ejecuta `AUTH-QA-005::GLOBAL-FINAL`;
- reemplaza las validaciones específicas de cada paquete;
- crea una excepción para legacy.

---

#### 37. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-004 — Trabajador sin turno queda bloqueado`

**TAREA ACTUAL APROBADA**
`AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo`
### ✅ AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado
**Tarea siguiente:** AUTH-QA-007 — Trabajador solo ve su sede
**Tipo de tarea:** documental; definición canónica de una prueba integral positiva de resolución de contexto operativo reutilizable por paquete y certificable globalmente, para demostrar que un trabajador con turno laboral publicado y vigente y check-in activo compatible obtiene exclusivamente el rol operativo declarado por su turno, sin convertir turno, check-in o rol en autorización final
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-006::<package_id>` y la certificación `AUTH-QA-006::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, asistencia, roles, permisos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un actor laboral activo que posee exactamente un turno laboral publicado y vigente, y que además satisface el check-in cuando el carril evaluado lo exige, obtiene un `operational_role` efectivo exclusivamente a partir del código de rol contenido en ese turno.

La condición raíz es:

```text
SESIÓN AUTENTICADA VÁLIDA
+
EMPLEADO ACTIVO
+
EXACTAMENTE UN TURNO LABORAL PUBLICADO Y VIGENTE
+
CHECK-IN ACTIVO Y COMPATIBLE CUANDO EL CARRIL EXIGE T+C
+
active_shift.operational_role_code PRESENTE Y CANÓNICO
+
ROL ACTIVO Y RESOLUBLE EN EL CATÁLOGO OPERATIVO
→
operational_role RESUELTO DESDE EL TURNO
+
operational readiness EVALUABLE
```

La tarea certifica la resolución positiva del rol operativo. No certifica por sí sola que una acción empresarial deba terminar en `ALLOW`.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con diez resultados obligatorios:

1. un turno publicado y vigente puede aportar un código de rol operativo efectivo;
2. el check-in compatible satisface únicamente la precondición de presencia cuando el carril exige `T+C`;
3. `operational_role.role_code` coincide exactamente con `active_shift.operational_role_code` después de validación canónica;
4. `operational_role.shift_id`, `site_id` y `area_id` proceden del mismo turno efectivo;
5. rol base, perfil predeterminado, último rol, dispositivo, cookie, selector, frontend, permiso solicitado o check-in no pueden crear ni sustituir el rol operativo;
6. un rol resuelto no concede permisos por su sola existencia;
7. permiso, modalidad, grant, deny, territorio, scope y recurso continúan evaluándose después de resolver el contexto;
8. las superficies aplicables obtienen el mismo rol efectivo y una decisión compatible para el mismo snapshot;
9. un cambio de turno, rol, check-in o contexto invalida la autoridad derivada anterior y exige una decisión nueva;
10. ninguna validación física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- el actor laboral efectivo y la separación entre identidad, rol base y rol operativo;
- la clasificación de carriles base, `T` y `T+C`;
- la regla de que el turno publicado y vigente precede a check-in y rol operativo;
- el contrato `AccessContext@1.x`;
- la resolución de `active_shift`;
- la resolución de `active_checkin_session`;
- la semántica de `operational_role`;
- `AUTH-ERR-009 — Sin turno publicado`;
- `AUTH-ERR-010 — Fuera de turno`;
- `AUTH-ERR-011 — Check-in requerido`;
- `AUTH-ERR-012 — Rol operativo faltante`;
- los contratos posteriores de habilitación de sede, compatibilidad de área, dispositivo, simulación, permiso, scope y recurso;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- el gate físico `POST_E5_PACKAGE`.

La tarea no redefine catálogos de roles, permisos, matrices, errores ni reglas territoriales.

---

#### 4. Fixture positivo primario

El fixture primario utiliza un actor humano laboral con:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
base_role = trabajador_operativo
published_shift_count = 1
active_shift = EXACTLY_ONE
shift_window = CURRENT
active_shift.operational_role_code = CANONICAL_ACTIVE_OPERATIONAL_ROLE
active_checkin_session = ACTIVE_COMPATIBLE
```

Cuando el permiso bajo prueba exige `T+C`, la sesión de check-in debe coincidir exactamente con:

```text
actor_effective.employee_id
+
active_shift.shift_id
+
active_shift.site_id
```

Si el carril bajo prueba exige únicamente `T`, la existencia de un check-in válido puede formar parte del fixture, pero no se convierte en un requisito adicional del permiso.

---

#### 5. Fuente exclusiva del rol operativo

La resolución autorizada es:

```text
active_shift.operational_role_code
→ catálogo operativo canónico
→ validación de actividad y vigencia
→ validación territorial estructural
→ operational_role
```

El código efectivo no procede de:

- `employees.role`;
- `base_role`;
- `employee_site_operational_profiles.default_operational_role`;
- último turno;
- último rol usado;
- historial laboral;
- `active_checkin_session`;
- sede seleccionada;
- área seleccionada;
- `navigation_role`;
- plantilla o sesión de dispositivo;
- cookie;
- caché no revalidada;
- permiso solicitado;
- aplicación abierta;
- pantalla visitada;
- nombre del cargo;
- alias informal;
- valor enviado por el cliente.

---

#### 6. Forma mínima esperada de `operational_role`

El nodo resuelto debe conservar la forma contractual vigente y, como mínimo, demostrar equivalencia causal con el turno efectivo:

```text
operational_role.role_code = active_shift.operational_role_code validado
operational_role.shift_id   = active_shift.shift_id
operational_role.site_id    = active_shift.site_id
operational_role.area_id    = active_shift.area_id
```

Además debe conservar los indicadores territoriales contractuales aplicables, incluidos `valid_for_site` y `valid_for_area`, sin convertir esos indicadores en permisos.

La tarea no agrega propiedades al contrato público vigente.

---

#### 7. Semántica exacta del check-in en esta prueba

El check-in no asigna rol y no concede permisos.

Para un carril `T+C`:

```text
ACTIVE_SHIFT válido
+
ACTIVE_CHECKIN_SESSION compatible
→ precondición de presencia satisfecha
```

Después de esa precondición, el rol continúa resolviéndose exclusivamente desde el turno.

Quedan prohibidas estas equivalencias:

```text
check-in válido → rol operativo
check-in válido → permiso
check-in válido → sede global
check-in válido → bypass de grant
check-in válido → bypass de recurso
```

---

#### 8. Oracle positivo de resolución

Para el fixture primario, la prueba debe demostrar simultáneamente:

```text
active_shift = válido
active_checkin_session = válido
operational_role != null
operational_role.role_code = active_shift.operational_role_code
operational_role.shift_id = active_shift.shift_id
operational_role.site_id = active_shift.site_id
operational_role.area_id = active_shift.area_id
```

Cuando sede, área y rol sean estructuralmente compatibles, el contexto puede alcanzar:

```text
operational readiness = READY
```

Ese estado habilita la evaluación del carril operativo; no es una decisión final de autorización.

---

#### 9. Control positivo con permiso permitido

Una instancia materializada debe incluir al menos un caso donde:

- el actor, turno, check-in y rol son válidos;
- el permiso exacto admite el carril operativo;
- el rol posee el grant aplicable;
- no existe deny prevalente;
- sede, área, scope y recurso son compatibles.

El resultado esperado es que el evaluador pueda producir `ALLOW` por el carril operativo únicamente después de completar todas esas condiciones.

El `ALLOW` demuestra la cadena completa, pero no convierte la presencia del rol en una concesión automática.

---

#### 10. Control de separación rol–permiso

La prueba debe incluir un caso donde:

```text
turno = válido
check-in = válido
operational_role = válido
permiso exacto = no concedido o explicit deny
```

Resultado:

```text
operational_role permanece resuelto
operational readiness permanece estructuralmente válido
final_decision = DENY
cero efectos
```

Este control demuestra que obtener el rol operativo no equivale a obtener todos los permisos del rol ni una autorización general de aplicación.

---

#### 11. Control de rol ausente

Con turno y check-in válidos, pero sin código de rol operativo utilizable en la revisión publicada:

```text
operational_role = null
→ AUTH_OPERATIONAL_ROLE_REQUIRED cuando corresponda
```

La prueba positiva no puede completar el rol desde el rol base, un perfil predeterminado, el dispositivo ni el último rol conocido.

---

#### 12. Control de rol inválido o no canónico

Si el turno contiene un código desconocido, inactivo, deprecado, ambiguo o perteneciente al namespace incorrecto:

```text
operational_role = null
```

La condición no se trata como caso positivo y conserva el propietario causal definido por los contratos vigentes.

No se usa coincidencia aproximada, alias no aprobado, `LIKE`, `ILIKE` ni normalización heurística para recuperar un rol.

---

#### 13. Control de namespace

Cuando el código proceda del campo operacional del turno, se resuelve únicamente contra el catálogo operativo:

```text
active_shift.operational_role_code
→ operational_roles
```

No se resuelve contra el catálogo de roles base aunque exista una cadena coincidente.

El actor puede conservar simultáneamente un rol base y un rol operativo; ambos mantienen responsabilidades separadas.

---

#### 14. Control territorial estructural

La resolución del rol debe conservar la sede y el área del mismo turno que produjo el rol.

Queda prohibido completar el contexto con:

- sede primaria del empleado;
- sede seleccionada en UI;
- sede del dispositivo;
- última sede usada;
- primera sede permitida;
- área seleccionada;
- área del último check-in;
- primera área compatible encontrada.

La autorización sobre qué recursos puede ver o usar el trabajador dentro de ese territorio pertenece a las tareas siguientes, comenzando por `AUTH-QA-007`.

---

#### 15. Control de check-in cruzado

Un check-in perteneciente a otro actor, turno o sede no satisface el fixture positivo.

No se selecciona arbitrariamente una sesión mediante orden temporal o `limit 1`.

Un mismatch concluyente conserva su razón propietaria y no puede transformarse en un rol operativo válido.

---

#### 16. Control de turnos múltiples o ambiguos

La prueba positiva exige exactamente un `active_shift` resoluble.

Dos turnos vigentes candidatos, una revisión ambigua o un turno incompatible con el actor impiden construir el fixture positivo.

No se elige el primer turno ni el más reciente para fabricar `operational_role`.

---

#### 17. Paridad entre evaluadores

Para un mismo snapshot de:

```text
principal
actor_effective
employee
active_shift
active_checkin_session
permission_key
resource
resolved_at
```

las superficies aplicables deben resolver el mismo `operational_role.role_code`, la misma identidad de turno y razones compatibles.

La paridad debe abarcar los evaluadores materializados por cada paquete, incluidos cuando correspondan:

- navegación;
- Server Actions;
- Route Handlers;
- fetch o RSC;
- SDK;
- RPC o PostgREST;
- RLS o Data API;
- Edge Functions;
- Realtime;
- clientes nativos;
- dispositivos compartidos.

---

#### 18. Cero autoridad desde el cliente

Ninguna de estas entradas puede alterar el rol operativo efectivo:

```text
request.body.role
query.role
cookie.role
localStorage.role
selectedRole
navigationRole
deviceRole
cachedRole
```

Si una superficie recibe alguno de esos valores para UX o navegación, debe tratarlos como no autoritativos y resolver el contexto real en servidor antes de cualquier efecto protegido.

---

#### 19. Frescura e invalidación

Un cambio de cualquiera de estas condiciones invalida la decisión derivada anterior:

- actor efectivo;
- publicación o revisión del turno;
- ventana temporal;
- código de rol del turno;
- estado del rol;
- habilitación territorial;
- área;
- check-in o check-out;
- dispositivo;
- simulación;
- grant o deny;
- scope;
- recurso protegido.

Después del cambio se requiere una solicitud y decisión nuevas. Caché, offline o replay no pueden conservar autoridad operativa obsoleta.

---

#### 20. Auditoría mínima

La evidencia de una instancia materializada debe permitir reconstruir, sin depender de estado de UI:

- actor efectivo;
- identidad del turno;
- revisión publicada consumida;
- código de rol observado en el turno;
- rol operativo resuelto;
- sede y área derivadas del turno;
- estado de check-in cuando era requerido;
- permiso y modalidad evaluados;
- decisión final;
- razones y denies aplicables;
- identificador o fingerprint de contexto;
- momento de resolución.

No se exige exponer esos datos completos al usuario final.

---

#### 21. Casos mínimos de certificación

Cada instancia `AUTH-QA-006::<package_id>` debe materializar, como mínimo, estos casos cuando sean aplicables al paquete:

| Caso | Turno | Check-in | Rol del turno | Permiso | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| A | publicado y vigente | activo y compatible | canónico y activo | concedido y compatible | rol resuelto; carril operativo puede terminar en `ALLOW` |
| B | publicado y vigente | activo y compatible | canónico y activo | no concedido o denegado | rol resuelto; decisión final `DENY` |
| C | publicado y vigente | activo y compatible | ausente | aplicable | rol no resuelto; bloqueo propietario de rol faltante |
| D | publicado y vigente | activo y compatible | inválido o no canónico | aplicable | rol no resuelto; fallo cerrado con razón propietaria |
| E | publicado y vigente | incompatible con actor, turno o sede | presente | aplicable | no certificar caso positivo; conservar razón de asistencia o contexto |
| F | ambiguo o múltiple | cualquiera | presente | aplicable | no certificar caso positivo; fail-closed |

Los casos A y B son obligatorios para demostrar que rol resuelto y autorización final son conceptos distintos.

---

#### 22. Modelo de ejecución por paquete

`AUTH-QA-006` conserva modalidad:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Cada paquete aplicable obtiene una identidad:

```text
AUTH-QA-006::<package_id>
```

La ejecución física requiere:

```text
E5-GATE-008::<package_id> = PASS
```

La tarea documental actual define el contrato y no selecciona ni ejecuta ningún `package_id`.

---

#### 23. Certificación global final

Después de completar las instancias aplicables, la identidad:

```text
AUTH-QA-006::GLOBAL-FINAL
```

debe reconciliar que:

1. los paquetes prueban la misma fuente exclusiva del rol;
2. no existe un consumidor que complete rol desde identidad base, cliente o dispositivo;
3. la semántica de check-in es consistente con `T` y `T+C`;
4. rol resuelto y autorización final permanecen separados;
5. las diferencias territoriales pertenecen a las tareas propietarias posteriores;
6. no existen contradicciones entre aplicaciones, SDK, RPC, RLS u otros canales materializados.

La certificación global final no se ejecuta en esta tarea documental.

---

#### 24. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos obsoletos: 0
```

La tarea reutiliza cobertura ya registrada y no modifica el registro 04A.

---

#### 25. Cobertura de prueba vigente reutilizada

Sin modificar el registro, esta tarea consume trazabilidad existente de:

- `TREQ-AUTH-001`;
- `TREQ-AUTH-004`;
- `TREQ-AUTH-008`;
- `TREQ-AUTH-009`;
- `TREQ-AUTH-013`;
- `TREQ-AUTH-014`;
- `TREQ-AUTH-229` a `TREQ-AUTH-233`;
- `TREQ-AUTH-239` a `TREQ-AUTH-248`.

En particular, la cobertura vigente ya exige que el rol real proceda exclusivamente de `active_shift.operational_role_code`, que turno y check-in se resuelvan antes del rol cuando corresponda, y que las demás decisiones de autorización continúen después de obtener el contexto.

---

#### 26. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea documental no ejecuta builds de producto ni materializaciones por paquete |
| LOCAL | NOT_EXECUTED | la incorporación y los validadores del checkout se ejecutan durante la batería documental del usuario |
| REMOTA | PASS | se inspeccionaron en `main` el archivo propietario, contratos de contexto, ADR, precedencia, topología, políticas documentales, 04A AUTH y scripts aplicables antes de redactar el artefacto |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron casos reales de turno, check-in, rol o autorización |
| FÍSICA | NOT_EXECUTED | no se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes ni ambientes |

---

#### 27. Criterios de aceptación

`AUTH-QA-006` queda documentalmente correcta cuando se demuestra que:

1. existe exactamente una definición de rol operativo efectivo;
2. el rol procede exclusivamente del código del turno publicado y vigente;
3. el check-in no crea ni selecciona rol;
4. el rol resuelto conserva identidad del mismo turno, sede y área;
5. un rol válido puede coexistir con una decisión final `DENY` por falta de permiso u otra razón posterior;
6. un permiso válido puede terminar en `ALLOW` solo después de completar todas sus precondiciones y controles;
7. turno, check-in y rol no actúan como bypass de territorio, scope, recurso, dispositivo, deny ni autorización final;
8. ausencia o invalidez del rol falla cerrado sin fallback desde identidad base o frontend;
9. los evaluadores aplicables conservan paridad;
10. cambios de contexto invalidan decisiones previas;
11. las instancias por paquete y `GLOBAL-FINAL` permanecen pendientes del gate físico correspondiente;
12. no se crean ni modifican requisitos de prueba;
13. no se ejecutan cambios físicos.

---

#### 28. Límites

Esta tarea no:

- redefine los bloqueos por ausencia de turno o check-in;
- convierte check-in en fuente de rol;
- concede todos los permisos del rol por resolverlo;
- define visibilidad territorial final del trabajador; comienza en `AUTH-QA-007`;
- define restricción de área final; pertenece a `AUTH-QA-008`;
- prueba rotación de permisos entre turnos; pertenece a `AUTH-QA-009`;
- redefine matrices específicas de bodeguero, producción, PULSO, conductor, compras o recepción;
- modifica catálogos de roles o permisos;
- crea turnos, check-ins, roles, grants, denies o datos;
- modifica RLS, RPC, migraciones, Edge Functions, aplicaciones o Supabase;
- ejecuta instancias `AUTH-QA-006::<package_id>`;
- ejecuta `AUTH-QA-006::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba `E5-GATE-008`;
- crea una excepción legacy.

---

#### 29. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado`

**TAREA ACTUAL APROBADA**
`AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-007 — Trabajador solo ve su sede`
### ✅ AUTH-QA-007 — Trabajador solo ve su sede

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo
**Tarea siguiente:** AUTH-QA-008 — Trabajador solo ve su área
**Tipo de tarea:** documental; definición canónica de una prueba integral de aislamiento territorial operativo reutilizable por paquete y certificable globalmente, para demostrar que un trabajador con contexto operativo válido queda limitado a la sede efectiva derivada de su turno y no obtiene visibilidad ni autoridad sobre recursos de otra sede por asignación múltiple, sede primaria, selección de interfaz, dispositivo, check-in o datos enviados por cliente
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-007::<package_id>` y la certificación `AUTH-QA-007::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, asignaciones, sedes, roles, permisos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un trabajador con identidad laboral activa, turno publicado y vigente, rol operativo resoluble y demás prerrequisitos satisfechos solo puede utilizar el carril operativo dentro de la sede efectiva declarada por ese mismo turno.

La condición territorial raíz es:

```text
active_shift.site_id
→ operational_site.site_id
→ única sede operativa efectiva del snapshot
```

La tarea certifica simultáneamente que:

```text
sede primaria
sede seleccionada
sede del dispositivo
punto de check-in
otra sede asignada
site_id enviado por cliente
≠
operational_site
```

No define todavía la restricción exacta por área, que pertenece a `AUTH-QA-008`.

---

#### 2. Resultado canónico

La tarea deja definido un único contrato de prueba con doce resultados obligatorios:

1. `operational_site.site_id` coincide exactamente con `active_shift.site_id`;
2. `operational_site.source_shift_id` coincide con el turno efectivo que originó el contexto;
3. la sede operativa es única por snapshot y no equivale a todas las sedes asignadas al trabajador;
4. la sede del turno debe ser resoluble, activa y compatible con la relación laboral aplicable;
5. la habilitación del rol operativo se verifica contra la sede exacta del turno;
6. un recurso perteneciente a otra sede no entra en el territorio operativo del trabajador por selección, parámetro o navegación;
7. una segunda sede laboralmente asignada no se convierte en territorio operativo simultáneo;
8. sede primaria, sede seleccionada, sede del dispositivo, check-in y cliente no sustituyen la sede del turno;
9. un fallo de compatibilidad rol–sede y un cruce de recurso entre sedes conservan causas distintas;
10. las capacidades base independientes del territorio operativo no se bloquean solo porque el trabajador no pueda operar en otra sede;
11. servidor, RPC, RLS y demás superficies aplicables conservan la misma frontera territorial;
12. ninguna prueba física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- identidad laboral efectiva;
- `AccessContext@1.x`;
- resolución de `active_shift`;
- resolución de `operational_role`;
- resolución de `operational_site`;
- asignaciones laborales de sede;
- estado activo de la sede;
- habilitación del par rol–sede;
- resolución del territorio real del recurso;
- modalidades `BASE_ONLY`, `OPERATIONAL_ONLY`, `BASE_OR_OPERATIONAL` y `BASE_AND_OPERATIONAL`;
- separación entre carril base y carril operativo;
- precedencia de turno, check-in, rol, sede, área, dispositivo, permiso, scope y recurso;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate físico `POST_E5_PACKAGE`.

La tarea no redefine catálogos, sedes, asignaciones, roles, matrices, grants, razones públicas ni reglas de área.

---

#### 4. Significado exacto de “su sede”

En esta prueba, “su sede” significa exclusivamente:

```text
operational_site.site_id
=
active_shift.site_id
```

No significa:

- primera sede asignada;
- sede primaria;
- todas las sedes asignadas;
- última sede usada;
- sede elegida en un selector;
- sede contenida en una cookie;
- sede del dispositivo;
- sede del punto físico de marcación;
- sede del recurso solicitado;
- sede enviada por query, body, RPC o cliente;
- sede inferida desde el rol.

La sede del turno es un hecho de contexto operativo; la autorización final continúa dependiendo del permiso, la modalidad, el scope y el recurso.

---

#### 5. Fixture positivo primario

El fixture positivo mínimo utiliza:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
active_shift = EXACTLY_ONE_PUBLISHED_CURRENT
active_shift.site_id = SITE_A
active_shift.operational_role_code = ROLE_R
operational_role.role_code = ROLE_R
operational_site.site_id = SITE_A
operational_site.source_shift_id = active_shift.shift_id
operational_site.site_active = true
operational_site.assignment_valid = true
operational_role.valid_for_site = true
resource_site_id = SITE_A
```

Cuando el permiso exige `T+C`, el check-in compatible también debe estar satisfecho antes de alcanzar esta fase territorial.

---

#### 6. Forma mínima esperada de `operational_site`

El nodo territorial consumido por la prueba conserva:

```text
site_id
source_shift_id
site_active
assignment_valid
```

Oracle estructural:

```text
site_id = active_shift.site_id
source_shift_id = active_shift.shift_id
site_active = true
assignment_valid = true
```

La prueba no añade campos ni usa el nodo como contenedor de permisos o decisión final.

---

#### 7. Fuente exclusiva de la sede operativa

La fuente de autoridad territorial operativa es el turno vigente:

```text
active_shift.site_id
→ operational_site.site_id
```

No se admite como sustituto:

```text
primary_site_id
selected_site_id
device_site_id
checkin_site_id
employees.site_id
assigned_sites[0]
last_site_id
request.site_id
```

Si la sede del turno es incorrecta, la solución es corregir la fuente correspondiente; nunca elegir una sede más conveniente durante la autorización.

---

#### 8. Oracle positivo en la sede del turno

Con contexto válido y recurso en `SITE_A`:

```text
operational_site.site_id = SITE_A
resource_site_id = SITE_A
```

la frontera territorial de sede queda satisfecha.

Esto únicamente permite continuar el árbol de decisión. No obliga a `ALLOW` si falta permiso, grant, scope, compatibilidad de área, dispositivo u otra condición posterior.

---

#### 9. Control negativo de recurso en otra sede

Con el mismo actor y snapshot:

```text
operational_site.site_id = SITE_A
resource_site_id = SITE_B
SITE_A != SITE_B
```

la solicitud no puede obtener autorización operativa por el solo hecho de que:

- `SITE_B` también esté asignada laboralmente al trabajador;
- `SITE_B` sea su sede primaria;
- el usuario la seleccione en interfaz;
- el dispositivo esté configurado para `SITE_B`;
- el cliente envíe `SITE_B`;
- el permiso exista para su rol en otra sede.

El cruce territorial debe fallar cerrado conforme al contrato del permiso y del recurso, sin mutaciones ni datos parciales de la sede ajena.

---

#### 10. Control de trabajador multisede

Fixture:

```text
assigned_sites = [SITE_A, SITE_B]
active_shift.site_id = SITE_B
```

Resultado esperado:

```text
operational_site.site_id = SITE_B
```

`SITE_A` permanece como asignación laboral disponible para otro contexto válido, pero no como territorio operativo simultáneo del snapshot actual.

La prueba debe demostrar que multisede no significa operación cross-site.

---

#### 11. Control de sede primaria

Fixture:

```text
primary_site_id = SITE_A
active_shift.site_id = SITE_B
```

Resultado:

```text
operational_site.site_id = SITE_B
```

La sede primaria no:

- sustituye al turno;
- restringe automáticamente una asignación multisede;
- corrige un turno;
- actúa como fallback;
- convierte un recurso de `SITE_A` en recurso permitido durante el turno de `SITE_B`.

---

#### 12. Control de sede seleccionada

Fixture:

```text
selected_site_id = SITE_A
active_shift.site_id = SITE_B
```

Resultado:

```text
operational_site.site_id = SITE_B
```

La selección puede filtrar una experiencia permitida cuando su contrato lo autorice, pero no modifica el territorio efectivo ni concede permiso.

---

#### 13. Control de check-in y dispositivo

El check-in y el dispositivo solo pueden confirmar o restringir compatibilidad.

Si existe check-in:

```text
active_checkin_session.site_id
=
operational_site.site_id
```

debe ser coherente cuando el carril lo exige.

Si no coincide, el check-in no traslada la sede del turno.

Asimismo:

```text
device_site_id
≠
fuente de operational_site
```

Un dispositivo puede restringir la sesión; nunca amplía el territorio del trabajador.

---

#### 14. Control de asignación laboral inválida

Puede observarse un turno cuyo `site_id` sea resoluble pero cuya relación laboral con esa sede no sea válida.

Resultado estructural:

```text
operational_site.site_id = active_shift.site_id
assignment_valid = false
```

La prueba debe fallar cerrado para el carril operativo y no insertar automáticamente la sede dentro de `assigned_sites`.

La ausencia de relación laboral, una asignación inactiva y una sede inactiva conservan causas distintas.

---

#### 15. Control de sede inactiva o no resoluble

Si la sede del turno es nula, inexistente, ambigua, inactiva o no resoluble, la prueba no debe fabricar una sede efectiva desde otra fuente.

Resultado esperado:

```text
operational_site = null
OR
operational_site.site_active = false
```

según el estado canónico aplicable, con fallo cerrado y sin elegir otra sede disponible.

---

#### 16. Control de rol no habilitado para la sede

Fixture:

```text
active_shift.site_id = SITE_A
operational_role.role_code = ROLE_R
operational_role.valid_for_site = false
```

Resultado esperado del carril operativo:

```text
DENY
AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE
403
CERO EFECTOS
```

La corrección no consiste en cambiar localmente a otra sede donde `ROLE_R` sí esté habilitado.

---

#### 17. Separación entre compatibilidad rol–sede y cruce de recurso

La prueba conserva dos controles diferentes:

```text
ROL NO HABILITADO EN operational_site
→ incompatibilidad rol–sede
```

```text
ROL HABILITADO EN operational_site
+
RECURSO EN OTRA SEDE
→ cruce territorial del recurso
```

El segundo caso no debe reclasificarse como si el rol no estuviera habilitado en la sede real del turno.

---

#### 18. Independencia del carril base

Una denegación territorial del carril operativo no elimina por sí sola capacidades base independientes que el actor posea válidamente.

Por tanto:

```text
operational lane = DENY
```

no implica automáticamente:

```text
base lane = DENY
```

La composición final depende de la modalidad del permiso exacto.

---

#### 19. Permiso y scope después de resolver sede

Una sede correcta tampoco concede autoridad por sí sola.

El orden lógico conserva:

```text
contexto operativo válido
→ sede efectiva resuelta
→ compatibilidad territorial aplicable
→ permiso exacto
→ grant / deny
→ scope
→ recurso
→ decisión final
```

La prueba debe incluir al menos un caso donde la sede es correcta pero el permiso o scope no permiten la acción, demostrando que territorio válido no equivale a `ALLOW`.

---

#### 20. Visibilidad y acceso directo

Cuando una superficie lista recursos operativos territoriales, el resultado visible debe respetar la frontera autorizada y no exponer filas de otra sede por defecto.

Esto no prohíbe que una superficie personal o administrativa expresamente autorizada muestre al trabajador sus propias asignaciones laborales activas, incluida más de una sede. Ver una asignación propia no convierte esa sede en `operational_site` ni concede autoridad operativa sobre sus recursos.

La ocultación o filtrado de interfaz no sustituye autorización.

Una referencia directa a un recurso de otra sede debe volver a evaluarse en la frontera autoritativa y no puede confiar en que el recurso estuviera oculto en la pantalla anterior.

---

#### 21. Paridad entre evaluadores

Para el mismo principal, actor efectivo, turno, rol, sede, permiso, recurso y versión de contexto, las superficies aplicables deben producir decisiones territorialmente equivalentes.

La cobertura incluye, cuando corresponda:

- navegación;
- Server Actions;
- Route Handlers;
- fetch o RSC;
- RPC o PostgREST;
- RLS o Data API;
- Edge Functions;
- Realtime;
- clientes nativos;
- dispositivos compartidos.

Ninguna capa puede convertir una sede solicitada por cliente en territorio efectivo.

---

#### 22. Cero autoridad desde el cliente

Quedan prohibidos como fuente de autorización:

```text
query.site_id
body.site_id
form.site_id
cookie.site_id
local_storage.site_id
selected_site_id
navigation_site
header_site
```

Estos valores pueden identificar el recurso o una preferencia de presentación cuando el contrato lo permite, pero nunca reemplazan la resolución server-side del territorio laboral.

---

#### 23. Frescura e invalidación

Un cambio en cualquiera de estos hechos invalida el snapshot aplicable:

- turno;
- sede del turno;
- estado de la sede;
- asignación laboral;
- rol operativo;
- habilitación rol–sede;
- actor;
- check-in cuando aplique;
- dispositivo;
- simulación;
- frontera temporal.

Después de un cambio, caché, offline, Realtime y replay no pueden conservar acceso territorial previo. La acción debe obtener una decisión nueva antes del efecto.

---

#### 24. Auditoría mínima

La evidencia de una ejecución futura deberá permitir correlacionar como mínimo:

```text
request_id
actor_effective
employee_id
shift_id
operational_role_code
operational_site_id
resource_site_id cuando aplique
permission_key
decision
reason_code cuando exista
context_version
```

La auditoría prueba la decisión; no amplía autoridad ni almacena datos innecesarios del trabajador.

---

#### 25. Casos mínimos de certificación

Cada instancia aplicable deberá cubrir como mínimo:

| Caso | Contexto | Resultado esperado |
| --- | --- | --- |
| A | turno en `SITE_A`, rol habilitado, recurso `SITE_A`, permiso y demás controles válidos | frontera de sede satisfecha; continuar hasta decisión final |
| B | turno en `SITE_A`, rol habilitado, recurso `SITE_B` | cruce territorial denegado; cero efectos |
| C | trabajador asignado a `SITE_A` y `SITE_B`, turno actual en `SITE_B` | solo `SITE_B` es territorio operativo del snapshot |
| D | sede primaria o seleccionada distinta a la sede del turno | no modifica `operational_site` |
| E | rol del turno no habilitado en la sede del turno | `AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE`; cero efectos |
| F | sede correcta, permiso o scope insuficiente | `DENY` por la causa propietaria posterior; no convertir en error de sede |
| G | asignación laboral de la sede inválida o retirada | carril operativo bloqueado; sin autoasignación |
| H | contexto territorial cambia después de una decisión previa | snapshot anterior inválido; nueva decisión obligatoria |

---

#### 26. Modelo de ejecución por paquete

La topología vigente es:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Cada paquete propietario aplicable materializará, después del gate correspondiente:

```text
AUTH-QA-007::<package_id>
```

La instancia deberá usar recursos, permisos y consumidores reales del paquete sin reinterpretar el contrato global ni invadir el alcance de otros paquetes.

---

#### 27. Certificación global final

Después de completar las instancias aplicables, la certificación:

```text
AUTH-QA-007::GLOBAL-FINAL
```

reconciliará cobertura, resultados, excepciones justificadas, paridad entre canales y ausencia de brechas territoriales no asignadas.

La certificación global no sustituye pruebas específicas de paquete ni autoriza correcciones productivas por sí misma.

---

#### 28. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Requisitos creados: 0

Requisitos modificados: 0

Requisitos diferidos: 0

Requisitos obsoletos: 0

La tarea reutiliza cobertura vigente y no modifica el registro canónico.

---

#### 29. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-009`, para resolución determinista de sede y área efectivas y denegación de cruces territoriales;
- `TREQ-AUTH-013`, para impedir bypass por URL, formulario, API o RPC en mutaciones protegidas;
- `TREQ-AUTH-014`, para invalidar contexto y decisiones ante cambios materiales;
- `TREQ-AUTH-170` a `TREQ-AUTH-179`, para relación laboral de sede, ausencia, estado, canales e invalidación;
- `TREQ-AUTH-249` a `TREQ-AUTH-258`, para habilitación exacta rol–sede, precedencia, paridad entre canales y regresión territorial;
- cobertura vigente de SHELL, VISO, PASS, servidor, RPC y RLS que referencia esta certificación.

Esta sección es trazabilidad de requisitos existentes y no representa una modificación del registro.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea documental no ejecuta builds de producto ni materializaciones por paquete |
| LOCAL | NOT_EXECUTED | la incorporación y los validadores del checkout se ejecutan durante la batería documental del usuario |
| REMOTA | PASS | se inspeccionaron en `main` el archivo propietario, contratos territoriales y de contexto, precedencia, topología, políticas documentales, 04A AUTH y scripts aplicables antes de redactar el artefacto |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron casos reales de turno, sede, recurso ni autorización |
| FÍSICA | NOT_EXECUTED | no se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes ni ambientes |

---

#### 31. Criterios de aceptación

La tarea queda documentalmente completa cuando se demuestre que:

1. la sede operativa procede exclusivamente del turno vigente;
2. el `source_shift_id` conserva la identidad del mismo turno;
3. un trabajador multisede conserva una sola sede operativa por snapshot;
4. la sede primaria no funciona como fallback;
5. la sede seleccionada no funciona como autoridad;
6. el check-in no cambia la sede del turno;
7. el dispositivo no amplía territorio;
8. una asignación laboral inválida no se autocorrige;
9. una sede inactiva o no resoluble falla cerrado;
10. el par rol–sede se valida de forma exacta;
11. un rol no habilitado en la sede produce su razón propietaria;
12. un recurso de otra sede no se autoriza por pertenecer a otra asignación del trabajador;
13. cruce de recurso y compatibilidad rol–sede permanecen causas distintas;
14. un carril base independiente no se bloquea automáticamente por una denegación operativa territorial;
15. sede válida no equivale a permiso válido;
16. una vista autorizada de asignaciones propias no amplía `operational_site`;
17. filtrado visual no sustituye autorización server-side;
18. servidor, RPC y RLS preservan la misma frontera territorial;
19. cambios de turno, sede, asignación o matriz invalidan decisiones previas;
20. la evidencia futura permite correlacionar actor, turno, sede, recurso, permiso y decisión;
21. no se crean ni modifican requisitos de prueba;
22. no se ejecuta ningún cambio físico durante esta tarea documental.

---

#### 32. Límites

Esta tarea no:

- desarrolla la restricción por área, reservada a `AUTH-QA-008`;
- desarrolla el cambio de permisos por rotación, reservado a `AUTH-QA-009`;
- redefine asignaciones laborales;
- redefine sede primaria;
- redefine contratos de selección de interfaz;
- redefine el catálogo de sedes;
- redefine habilitaciones rol–sede;
- redefine razones públicas;
- crea permisos, grants o denegaciones;
- modifica RLS, RPC, Supabase, aplicaciones, datos o migraciones;
- ejecuta instancias físicas `AUTH-QA-007::<package_id>`;
- ejecuta `AUTH-QA-007::GLOBAL-FINAL`;
- usa visibilidad de interfaz como sustituto de autorización;
- convierte una asignación multisede en operación simultánea cross-site;
- concede autoridad por parámetros enviados por cliente.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo`

**TAREA ACTUAL APROBADA**
`AUTH-QA-007 — Trabajador solo ve su sede`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-008 — Trabajador solo ve su área`
### ✅ AUTH-QA-008 — Trabajador solo ve su área

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-007 — Trabajador solo ve su sede
**Tarea siguiente:** AUTH-QA-009 — Trabajador rotado cambia de permisos por turno
**Tipo de tarea:** documental; definición canónica de una prueba integral de aislamiento territorial operativo por área reutilizable por paquete y certificable globalmente, para demostrar que un trabajador cuyo carril exige área queda limitado al área efectiva derivada de su turno, sin convertir áreas asignadas, primarias, seleccionadas, de dispositivo, check-in o recurso en autoridad, y sin bloquear los carriles site-wide o no aplicables que legítimamente no requieren área
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-008::<package_id>` y la certificación `AUTH-QA-008::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, áreas, sedes, roles, permisos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un trabajador con contexto operativo válido queda restringido al área efectiva de su turno cuando el permiso, rol o recurso exigen área, sin convertir esa restricción en un bloqueo indiscriminado para capacidades site-wide o sin dimensión de área.

La condición territorial raíz es:

```text
active_shift.area_id
→ operational_area.area_id
```

cuando el turno declara un área válida y el contrato de autorización la requiere.

La tarea certifica simultáneamente:

```text
área primaria
área seleccionada
employee_areas
employees.area_id
área del dispositivo
área de check-in aislado
área del recurso
area_id enviado por cliente
≠
operational_area
```

No redefine la sede operativa, que pertenece a `AUTH-QA-007`, ni la rotación de permisos, que pertenece a `AUTH-QA-009`.

---

#### 2. Resultado canónico

La tarea deja definido un contrato de prueba con catorce resultados obligatorios:

1. `operational_area.area_id` coincide exactamente con `active_shift.area_id` cuando el turno declara un área resoluble;
2. `operational_area.site_id` coincide con `operational_site.site_id` y con la sede propietaria real del área;
3. el área operativa procede del turno y no de afiliaciones, selectores, dispositivo, check-in aislado, recurso o cliente;
4. el check-in compatible puede confirmar el área del turno, pero nunca crearla ni reemplazarla;
5. `assigned_areas` no es prerrequisito general del área operativa;
6. un área inexistente, ambigua, de otra sede o inactiva no se convierte en contexto válido mediante fallback;
7. un rol habilitado site-wide puede conservar `operational_area = null` cuando el permiso admite `SITE_SUFFICIENT`;
8. un permiso `NOT_APPLICABLE` no fabrica ni exige área;
9. un permiso `REQUIRED` exige un área operativa activa y compatible;
10. un rol no habilitado para el área efectiva conserva la razón `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA`;
11. un recurso de otra área conserva una causa territorial distinta de la incompatibilidad rol–área;
12. `null` nunca significa wildcard sobre todas las áreas;
13. servidor, RPC, RLS y demás superficies aplicables preservan la misma frontera;
14. ninguna prueba física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- identidad laboral efectiva;
- `AccessContext@1.x`;
- `active_shift`;
- `active_checkin_session`;
- `operational_role`;
- `operational_site`;
- `operational_area`;
- catálogo canónico de áreas y relación área–sede;
- habilitación territorial del rol;
- `operational_area_requirement`;
- resolución del territorio real del recurso;
- separación entre carril base y carril operativo;
- precedencia de turno, check-in, rol, sede, área, dispositivo, permiso, scope y recurso;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL`;
- gate físico `POST_E5_PACKAGE`.

La tarea no redefine catálogos, áreas, sedes, turnos, roles, permisos, matrices, grants, razones públicas ni reglas de rotación.

---

#### 4. Significado exacto de “su área”

En esta prueba, “su área” significa exclusivamente el área operativa efectiva derivada del turno vigente cuando el contrato aplicable exige dimensión de área.

Cuando existe:

```text
operational_area.area_id
=
active_shift.area_id
```

y:

```text
operational_area.site_id
=
operational_site.site_id
```

No significa:

- primera área asignada;
- área primaria;
- todas las áreas asignadas;
- área seleccionada;
- área del dispositivo;
- área del punto de check-in;
- área del recurso solicitado;
- `employees.area_id`;
- `employee_areas[0]`;
- `area_kind` sin identidad exacta;
- área enviada por query, body, RPC o cliente;
- área inferida desde el nombre del rol.

“Solo ve su área” describe la frontera operativa aplicable, no la eliminación de información laboral personal legítimamente visible en superficies autorizadas.

---

#### 5. Clasificación exacta del requisito de área

Toda evaluación debe consumir el valor canónico de:

```text
operational_area_requirement
```

Solo se admiten:

```text
REQUIRED
SITE_SUFFICIENT
NOT_APPLICABLE
```

Reglas:

```text
REQUIRED
→ exige área operativa válida cuando el carril alcanza esta fase
```

```text
SITE_SUFFICIENT
→ una sede operativa válida puede ser suficiente
→ operational_area puede ser null
```

```text
NOT_APPLICABLE
→ la acción no fabrica ni exige área operativa
```

La aplicación no puede reclasificar el requisito por conveniencia local.

---

#### 6. Fixture positivo primario — área requerida

Fixture mínimo:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
active_shift = EXACTLY_ONE_PUBLISHED_CURRENT
active_shift.site_id = SITE_A
active_shift.area_id = AREA_A
active_shift.operational_role_code = ROLE_R
operational_site.site_id = SITE_A
operational_role.role_code = ROLE_R
operational_role.valid_for_site = true
operational_role.valid_for_area = true
operational_area.area_id = AREA_A
operational_area.site_id = SITE_A
operational_area.area_active = true
operational_area.compatible_with_role = true
operational_area_requirement = REQUIRED
resource_site_id = SITE_A
resource_area_id = AREA_A
```

Cuando el permiso exige `T+C`, el check-in válido también debe estar satisfecho antes de alcanzar esta fase territorial.

---

#### 7. Forma mínima esperada de `operational_area`

La prueba conserva la forma contractual:

```text
area_id
site_id
area_kind
source
area_active
compatible_with_role
```

Oracle estructural:

```text
area_id = active_shift.area_id
site_id = operational_site.site_id
area_active = true
compatible_with_role = true
```

`area_kind` procede del catálogo del área y no sustituye `area_id`.

---

#### 8. Fuente exclusiva del área operativa

La fuente de autoridad territorial operativa es el turno:

```text
active_shift.area_id
→ operational_area.area_id
```

No se admite como sustituto:

```text
assigned_areas
primary_area_id
selected_area_id
employees.area_id
device_area_id
checkin_area_id aislado
resource_area_id
request.area_id
area_kind
```

Si el área del turno es incorrecta, ausente cuando resulta obligatoria o pertenece a otra sede, debe corregirse la fuente propietaria; el evaluador no elige otra área para obtener autorización.

---

#### 9. Coherencia área–sede

Todo `operational_area` válido debe satisfacer:

```text
operational_area.site_id
=
operational_site.site_id
```

y:

```text
operational_area.area_id
→ área canónica
→ canonical_area.site_id
=
operational_site.site_id
```

Un área de otra sede no se reescribe para hacerla coincidir.

Resultado:

```text
área contradictoria con la sede
→ no constituye operational_area válida
→ fail closed conforme a la razón propietaria
```

---

#### 10. Check-in confirma; no crea área

Cuando el check-in declara exactamente el área del turno:

```text
active_checkin_session.area_id = active_shift.area_id
```

puede producir:

```text
source = CHECKIN_CONFIRMED_SHIFT
```

El significado es:

```text
turno define área
+
check-in confirma esa misma área
```

Nunca:

```text
check-in_area_id
→ reemplaza active_shift.area_id
```

Si el check-in no declara área, el área válida del turno puede conservar:

```text
source = SHIFT
```

---

#### 11. Check-in incompatible

Fixture:

```text
active_shift.area_id = AREA_A
active_checkin_session.area_id = AREA_B
AREA_A != AREA_B
```

Resultado:

- `AREA_B` no reemplaza `AREA_A`;
- el check-in incompatible no satisface por sí mismo el prerrequisito de presencia;
- la incompatibilidad conserva su clasificación estructural;
- no se autoriza mediante selección de una de las dos áreas.

La tarea no redefine el contrato de asistencia; únicamente certifica que el check-in no puede prestar territorio.

---

#### 12. `assigned_areas` no crea área operativa

Fixture:

```text
assigned_areas = [AREA_A, AREA_B]
active_shift.area_id = AREA_B
```

Resultado:

```text
operational_area.area_id = AREA_B
```

`AREA_A` permanece como afiliación laboral o administrativa cuando corresponda, pero no como territorio operativo simultáneo.

También es válido:

```text
assigned_areas = []
active_shift.area_id = AREA_B
```

si el área del turno es válida y el carril operativo no exige una afiliación administrativa independiente.

---

#### 13. Área primaria y área seleccionada

Fixture:

```text
primary_area_id = AREA_A
selected_area_id = AREA_A
active_shift.area_id = AREA_B
```

Resultado:

```text
operational_area.area_id = AREA_B
```

Ni el área primaria ni la selección visual corrigen, limitan o amplían el área del turno.

La selección puede participar en navegación o filtrado de una superficie autorizada, pero no modifica la autoridad.

---

#### 14. Oracle positivo para `REQUIRED`

Con:

```text
operational_area_requirement = REQUIRED
operational_area.area_id = AREA_A
area_active = true
compatible_with_role = true
resource_area_id = AREA_A
```

la frontera territorial de área queda satisfecha.

Esto permite continuar el árbol de decisión, pero no obliga a `ALLOW`: permiso, grant, deny, dispositivo, estado del recurso y demás gates posteriores continúan aplicando.

---

#### 15. Control negativo — área requerida ausente

Con:

```text
operational_area_requirement = REQUIRED
active_shift.area_id = null
```

no se inventa un área.

Resultado contractual:

```text
operational_area = null
reason_code = AUTH_ACTIVE_AREA_REQUIRED
```

cuando la resolución autoritativa concluye que la acción requiere un área activa y no existe una candidata válida y compatible. La ausencia de área no puede degradarse a permiso implícito.

No se utiliza como fallback:

- área primaria;
- área seleccionada;
- `employees.area_id`;
- `employee_areas`;
- check-in;
- dispositivo;
- recurso;
- primera área activa.

---

#### 16. Control negativo — área inactiva o no resoluble

Cuando `active_shift.area_id`:

- no existe;
- es ambiguo;
- apunta a un área inactiva;
- no puede resolverse de forma concluyente;

no se obtiene un área operativa autorizante.

La causa debe conservarse separada de:

- asignación administrativa de área ausente;
- turno ausente;
- rol no habilitado para el área;
- cruce de recurso;
- fallo técnico de evaluación.

---

#### 17. Control negativo — rol no habilitado para el área

Con:

```text
operational_area.area_id = AREA_A
operational_area.area_active = true
operational_role.valid_for_site = true
operational_role.valid_for_area = false
```

y un carril que exige compatibilidad por área:

```text
lane_decision = DENY
reason_code = AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA
business_effects = 0
```

El sistema no busca otra área donde el rol sí esté habilitado.

---

#### 18. Control negativo — recurso de otra área

Con el mismo contexto:

```text
operational_area.area_id = AREA_A
resource_area_id = AREA_B
AREA_A != AREA_B
```

la solicitud no puede obtener autoridad area-scoped por:

- pertenecer `AREA_B` a la misma sede;
- existir afiliación administrativa a `AREA_B`;
- seleccionar `AREA_B`;
- enviar `AREA_B` desde el cliente;
- existir el permiso en otra combinación territorial.

Este cruce de recurso conserva una causa territorial distinta de `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA`.

La certificación adversarial completa de cruces de área permanece reservada a `AUTH-QA-024`.

---

#### 19. Control `SITE_SUFFICIENT`

Fixture:

```text
operational_area_requirement = SITE_SUFFICIENT
operational_site.site_id = SITE_A
operational_role.valid_for_site = true
active_shift.area_id = null
operational_area = null
resource_scope = SITE_LEVEL
```

Resultado: la dimensión de área no bloquea por sí sola y la evaluación continúa usando la sede operativa y los demás gates del permiso y del recurso.

No se crea un área sintética “general”, “toda la sede”, “primera área” o “área primaria”.

El `null` significa ausencia legítima de dimensión de área para ese contrato, no wildcard.

---

#### 20. Control `NOT_APPLICABLE`

Fixture:

```text
operational_area_requirement = NOT_APPLICABLE
operational_area = null
```

La ausencia de área no bloquea la acción solo por esta dimensión.

La acción continúa su árbol de autorización conforme a su modalidad, scope, recurso y demás condiciones.

La aplicación no puede exigir área por su propio nombre o por pertenecer a un módulo operativo.

---

#### 21. `null` nunca es wildcard

Quedan prohibidas:

```text
operational_area = null
→ cualquier área
```

```text
resource_area_id = null
→ todas las áreas
```

```text
SITE_SUFFICIENT
→ permiso automático sobre cualquier acción area-scoped
```

La ausencia legítima de área conserva la semántica exacta del permiso y del recurso.

---

#### 22. Área visible versus autoridad

La interfaz puede mostrar información legítima que no constituye autoridad operativa, por ejemplo:

- afiliaciones laborales propias;
- área primaria;
- historial personal;
- información de programación;
- filtros permitidos.

La prueba no exige ocultar esos datos cuando otra capacidad los autoriza.

Sí exige que:

```text
visibilidad informativa
≠
operational_area
≠
autoridad sobre recursos del área
```

---

#### 23. Filtrado de lecturas

Cuando una lectura empresarial está limitada al área activa:

```text
resolved actor
+
operational_area
+
permission
+
resource scope
→ query autorizada y filtrada
```

No se acepta:

```text
cargar múltiples áreas
→ ocultar AREA_B solo en UI
```

Si el servidor o RLS debe limitar filas, las filas fuera del territorio autorizado no deben entregarse al consumidor.

---

#### 24. Mutaciones

Toda mutación area-scoped debe revalidar antes del primer efecto:

- principal y actor efectivos;
- permiso exacto;
- turno vigente;
- check-in cuando corresponda;
- rol operativo;
- sede operativa;
- área operativa cuando sea `REQUIRED`;
- compatibilidad rol–área;
- territorio real del recurso;
- scope;
- estado mutable relevante.

Un `area_id` recibido desde cliente nunca sustituye la resolución autoritativa.

---

#### 25. Recursos site-level

Un recurso legítimamente site-level puede carecer de `resource_area_id`.

En ese caso:

```text
resource_area_id = null
```

no significa todas las áreas.

El permiso y el recurso deben admitir explícitamente la semántica site-level.

Una capacidad area-scoped no se convierte en site-wide porque el recurso tenga `null`.

---

#### 26. Recursos multiárea

Cuando una operación afecta varias áreas, el conjunto completo debe resolverse antes del efecto.

Esta tarea únicamente fija la frontera:

```text
una coincidencia parcial
≠
autorización de toda la operación
```

La certificación adversarial completa del cruce multiárea pertenece a `AUTH-QA-024`.

---

#### 27. Invalidez, frescura y reautorización

Cambios en cualquiera de estos hechos invalidan la reutilización ciega de una decisión previa:

- turno;
- `area_id` del turno;
- sede propietaria del área;
- actividad del área;
- rol operativo;
- habilitación rol–área;
- permiso;
- scope;
- recurso;
- actor;
- dispositivo;
- check-in cuando corresponda.

Caché, Realtime, offline o replay deben exigir una decisión vigente antes de producir efectos protegidos.

---

#### 28. Paridad entre canales

Para un mismo snapshot relevante deben conservar decisión y causa equivalentes en las superficies aplicables:

- navegación protegida;
- Server Actions;
- Route Handlers;
- fetch/RSC;
- RPC/PostgREST;
- RLS/Data API;
- Edge Functions;
- Realtime;
- clientes nativos;
- dispositivos compartidos.

Ninguna superficie puede aceptar un `area_id` más permisivo que las demás.

---

#### 29. Modelo de ejecución por paquete

La topología vigente es:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Por cada paquete aplicable:

```text
AUTH-QA-008::<package_id>
```

La ejecución física solo puede ocurrir con:

```text
E5-GATE-008::<package_id> = PASS
```

La instancia deberá demostrar los casos aplicables sin modificar el contrato global.

---

#### 30. Certificación global final

La identidad:

```text
AUTH-QA-008::GLOBAL-FINAL
```

solo puede certificarse después de reconciliar las instancias por paquete aplicables.

La certificación global deberá demostrar, como mínimo:

- fuente única del área operativa;
- coherencia área–sede;
- separación de afiliación administrativa;
- tratamiento correcto de `REQUIRED`;
- tratamiento correcto de `SITE_SUFFICIENT`;
- tratamiento correcto de `NOT_APPLICABLE`;
- compatibilidad rol–área;
- ausencia de área sintética;
- paridad entre canales;
- ausencia de bypass por cliente;
- invalidación ante cambios territoriales.

---

#### 31. Handoff hacia AUTH-QA-009

`AUTH-QA-008` entrega a `AUTH-QA-009` un contexto territorial de área ya definido y certificable.

La siguiente tarea podrá variar el turno y demostrar que el cambio de:

```text
shift_id
site_id
area_id
operational_role_code
```

recalcula el contexto y los permisos efectivos sin conservar autoridad del turno anterior.

`AUTH-QA-008` no desarrolla todavía esa rotación.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Justificación:** la resolución del área operativa desde el turno, la separación entre afiliación administrativa y contexto operativo, los estados de área activa, la compatibilidad rol–área, el tratamiento de `REQUIRED`, `SITE_SUFFICIENT` y `NOT_APPLICABLE`, los cruces territoriales, la paridad multicanal y la invalidación ya disponen de requisitos vigentes. Esta tarea define su certificación integral y no introduce una obligación nueva.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 33. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-009`, para sede y área efectivas deterministas y denegación de cruces territoriales;
- `TREQ-AUTH-013`, para revalidación server-side de permiso, territorio, contexto, recurso y columnas;
- `TREQ-AUTH-014`, para invalidación de contexto, caché y decisiones ante cambios;
- `TREQ-AUTH-189` a `TREQ-AUTH-198`, para dependencia explícita de asignación administrativa de área sin contaminar el carril operativo;
- `TREQ-AUTH-199` a `TREQ-AUTH-208`, para área activa requerida, tratamiento de `SITE_SUFFICIENT`, fuente exclusiva del turno, precedencia y paridad entre canales;
- `TREQ-AUTH-259` a `TREQ-AUTH-268`, para habilitación exacta rol–área, compatibilidad por permiso y carril, razones, canales, invalidación y regresión;
- cobertura vigente de servidor, RPC, RLS y consumidores que referencia `AUTH-QA-008`.

Esta sección es trazabilidad de requisitos existentes y no representa una modificación del registro.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea documental no ejecuta builds de producto ni materializaciones por paquete |
| LOCAL | NOT_EXECUTED | la incorporación y los validadores del checkout se ejecutan durante la batería documental del usuario |
| REMOTA | PASS | se inspeccionaron en `main` el archivo propietario, contratos de contexto territorial, catálogo de requisito de área, razones, precedencia, topología, políticas documentales, 04A AUTH y scripts aplicables antes de redactar el artefacto |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron casos reales de turno, área, recurso ni autorización |
| FÍSICA | NOT_EXECUTED | no se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes ni ambientes |

---

#### 35. Criterios de aceptación

La tarea queda documentalmente completa cuando se demuestre que:

1. el área operativa procede exclusivamente del turno vigente;
2. el área pertenece a la sede operativa efectiva;
3. `area_id` y `area_kind` no se confunden;
4. check-in solo confirma el área del turno;
5. afiliaciones de área no crean `operational_area`;
6. área primaria y seleccionada no funcionan como autoridad;
7. `employees.area_id` no funciona como fallback;
8. un área de otra sede falla cerrado;
9. un área inactiva o no resoluble no autoriza;
10. `REQUIRED` exige área válida cuando alcanza esta fase;
11. `SITE_SUFFICIENT` admite ausencia legítima de área;
12. `NOT_APPLICABLE` no fabrica ni exige área;
13. `null` nunca funciona como wildcard;
14. un rol no habilitado para el área conserva `AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA`;
15. cruce de recurso y compatibilidad rol–área permanecen causas distintas;
16. una vista autorizada de afiliaciones propias no amplía el territorio operativo;
17. un recurso site-level no convierte permisos area-scoped en site-wide;
18. una operación multiárea no se autoriza por coincidencia parcial;
19. filtrado visual no sustituye filtrado autoritativo;
20. mutaciones revalidan territorio antes del efecto;
21. servidor, RPC y RLS preservan la misma frontera;
22. cambios territoriales invalidan decisiones previas;
23. el handoff a `AUTH-QA-009` conserva área, sede, rol y turno como hechos recalculables;
24. no se crean ni modifican requisitos de prueba;
25. no se ejecuta ningún cambio físico durante esta tarea documental.

---

#### 36. Límites

Esta tarea no:

- redefine la sede operativa certificada por `AUTH-QA-007`;
- desarrolla la rotación de permisos, reservada a `AUTH-QA-009`;
- ejecuta la certificación adversarial completa cross-area, reservada a `AUTH-QA-024`;
- redefine `employee_areas`;
- redefine áreas primarias o seleccionadas;
- redefine el catálogo de áreas;
- redefine `operational_area_requirement`;
- redefine habilitaciones rol–área;
- redefine razones públicas;
- crea permisos, grants o denegaciones;
- modifica RLS, RPC, Supabase, aplicaciones, datos o migraciones;
- ejecuta instancias físicas `AUTH-QA-008::<package_id>`;
- ejecuta `AUTH-QA-008::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba `E5-GATE-008`;
- convierte `null` en wildcard;
- concede autoridad por parámetros enviados por cliente.

---

#### 37. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-007 — Trabajador solo ve su sede`

**TAREA ACTUAL APROBADA**
`AUTH-QA-008 — Trabajador solo ve su área`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-009 — Trabajador rotado cambia de permisos por turno`
### ✅ AUTH-QA-009 — Trabajador rotado cambia de permisos por turno

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-008 — Trabajador solo ve su área
**Tarea siguiente:** AUTH-QA-010 — Bodeguero puede preparar pero no producir
**Tipo de tarea:** documental; definición canónica de una prueba integral de rotación de contexto y permisos operativos por turno reutilizable por paquete y certificable globalmente, para demostrar que el mismo trabajador pierde la autoridad derivada del turno anterior y obtiene únicamente la autoridad derivada del turno actualmente válido, sin unión de roles, permisos, sede, área, check-in, caché ni decisiones entre turnos
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-009::<package_id>` y la certificación `AUTH-QA-009::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, check-ins, roles, permisos, sedes, áreas, cachés, colas ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que una rotación laboral modifica el contexto operativo efectivo y, por tanto, recalcula los permisos operativos del trabajador desde el turno actualmente válido.

La regla raíz queda:

```text
TURN_A CURRENT
→ ROLE_A / SITE_A / AREA_A / CHECKIN_A
→ PERMISSIONS_A

TURN_A STALE
+
TURN_B CURRENT
→ ROLE_B / SITE_B / AREA_B / CHECKIN_B
→ PERMISSIONS_B
```

Nunca:

```text
PERMISSIONS_A
+
PERMISSIONS_B
→ UNION EFECTIVA
```

La tarea certifica la rotación del carril operativo. No redefine el rol base, las matrices específicas de cada rol ni las fronteras funcionales que pertenecen a `AUTH-QA-010` y siguientes.

---

#### 2. Resultado canónico

La tarea deja definidos diecisiete resultados obligatorios:

1. el turno efectivo se resuelve de nuevo después de la transición;
2. el nuevo turno no hereda `operational_role` del turno anterior;
3. `operational_role` procede exclusivamente del `operational_role_code` del turno actualmente válido;
4. sede y área operativas se vuelven a resolver desde el turno actualmente válido;
5. un check-in ligado al turno anterior no satisface un carril `T+C` del nuevo turno;
6. el rol base del trabajador no se modifica por la rotación operativa;
7. permisos base independientes del carril operativo no se eliminan por el solo cambio de turno;
8. permisos operativos exclusivos de `ROLE_A` dejan de autorizar después de la rotación a `ROLE_B`;
9. permisos operativos exclusivos de `ROLE_B` solo pueden autorizar después de resolver válidamente `TURN_B` y los demás gates aplicables;
10. un permiso compartido entre ambos roles se reevalúa y no se conserva por herencia;
11. no existe unión, acumulación, fallback ni “último rol conocido” entre turnos;
12. toda decisión derivada de `TURN_A` queda stale al cambiar la fuente efectiva;
13. caché, replay, offline, RSC, RPC, RLS y demás consumidores no pueden seguir autorizando con el snapshot anterior;
14. una superposición ambigua de turnos no permite seleccionar arbitrariamente el más permisivo;
15. la historia de auditoría del turno anterior no se reescribe al activarse el nuevo turno;
16. la misma transición produce una frontera equivalente en todas las superficies aplicables;
17. ninguna prueba física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- identidad laboral y actor efectivo;
- rol base;
- `AccessContext@1.x`;
- `active_shift`;
- revisión publicada del turno;
- `active_checkin_session`;
- `operational_role`;
- `operational_site`;
- `operational_area`;
- matrices canónicas rol–permiso y rol–territorio;
- modalidad `BASE_ONLY`, `OPERATIONAL_ONLY` y `BASE_OR_OPERATIONAL` cuando corresponda;
- carriles `T` y `T+C`;
- precedencia canónica de turno, check-in, rol, sede, área, dispositivo, simulación, permiso, scope y recurso;
- contratos de frescura, invalidación y reautorización;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL`;
- gate físico `POST_E5_PACKAGE`.

La tarea no redefine permisos concretos de bodeguero, producción, PULSO, conductor, compras o recepción.

---

#### 4. Definición exacta de rotación por turno

Para esta prueba existe rotación cuando el mismo actor laboral pasa de un turno efectivo `TURN_A` a otro turno efectivo `TURN_B` mediante una transición canónica y verificable.

La identidad humana permanece:

```text
effective_actor_A
=
effective_actor_B
```

pero cambia al menos una dimensión operativa del turno:

```text
shift_id
operational_role_code
site_id
area_id
```

La variante primaria exige cambio de rol:

```text
TURN_A.operational_role_code = ROLE_A
TURN_B.operational_role_code = ROLE_B
ROLE_A != ROLE_B
```

Puede cambiar además sede o área, pero ese cambio no es obligatorio para demostrar la rotación funcional.

---

#### 5. Invariante de no herencia

Cuando `TURN_B` se convierte en el turno actualmente válido:

```text
previous_effective_operational_role = STALE
previous_operational_site = STALE
previous_operational_area = STALE
previous_operational_decision = STALE
```

La resolución nueva parte de `TURN_B`.

Queda prohibido completar `TURN_B` desde:

- `ROLE_A`;
- último rol operativo exitoso;
- perfil predeterminado;
- rol base;
- cookie;
- dispositivo;
- navegación;
- sesión cliente;
- historial;
- caché;
- check-in del turno anterior;
- decisión previa.

---

#### 6. Selección de roles y permisos para la fixture

Cada instancia de prueba seleccionará dos roles operativos canónicos y activos:

```text
ROLE_A
ROLE_B
```

con una diferencia observable de autoridad.

Debe existir al menos:

```text
PERM_A_ONLY
→ permitido por ROLE_A en la combinación territorial de la fixture
→ no permitido por ROLE_B en esa misma condición contractual
```

Y:

```text
PERM_B_ONLY
→ permitido por ROLE_B en la combinación territorial de la fixture
→ no permitido por ROLE_A en esa misma condición contractual
```

Si existe un permiso común útil para el paquete puede añadirse:

```text
PERM_SHARED
```

La instancia no inventa roles ni permisos para satisfacer la matriz; debe usar identidades canónicas reales disponibles en su paquete o ambiente controlado.

---

#### 7. Fixture primaria — aislamiento del cambio de rol

Para aislar el efecto funcional, la fixture primaria conserva sede y área cuando el catálogo real permita una pareja compatible:

```text
actor = EMPLOYEE_E
base_role = BASE_ROLE_E

TURN_A.shift_id = SHIFT_A
TURN_A.site_id = SITE_X
TURN_A.area_id = AREA_X
TURN_A.operational_role_code = ROLE_A

TURN_B.shift_id = SHIFT_B
TURN_B.site_id = SITE_X
TURN_B.area_id = AREA_X
TURN_B.operational_role_code = ROLE_B

ROLE_A != ROLE_B
SHIFT_A != SHIFT_B
```

Si el paquete no dispone de dos roles válidos sobre exactamente el mismo territorio, la instancia puede usar un cambio territorial adicional, pero deberá distinguir qué denegaciones se deben al rol y cuáles al territorio.

---

#### 8. Estado A — antes de la rotación

En un instante donde `TURN_A` es exactamente el turno publicado y vigente aplicable:

```text
active_shift.shift_id = SHIFT_A
operational_role.role_code = ROLE_A
operational_site.site_id = TURN_A.site_id
operational_area.area_id = TURN_A.area_id cuando corresponda
```

Para `PERM_A_ONLY`, si todos los demás gates están satisfechos:

```text
operational_lane = ALLOW
```

Para `PERM_B_ONLY`:

```text
operational_lane = DENY
```

La denegación no puede corregirse localmente escogiendo `ROLE_B` antes de que `TURN_B` sea efectivo.

---

#### 9. Transición A → B

La transición de la fixture debe producir una frontera temporal clara:

```text
TURN_A deja de ser el turno actualmente válido
TURN_B pasa a ser el turno actualmente válido
```

La causa puede ser, según el contrato real del paquete:

- fin normal de `TURN_A` y comienzo de `TURN_B`;
- revisión publicada que sustituye el rol del turno vigente;
- transición canónica equivalente que cambie el turno efectivo.

La prueba no requiere mutar datos productivos; la ejecución física futura utilizará fixtures controladas.

---

#### 10. Invalidación inmediata del snapshot anterior

En la frontera A → B deben invalidarse como autoridad:

```text
context_id_A
effective_shift_id_A
operational_role_A
operational_site_A
operational_area_A
permission_decision_A
protected query result A
subscription authority A
offline authorization A
```

Una referencia histórica puede conservarse para auditoría o correlación.

No puede utilizarse para una nueva operación empresarial.

---

#### 11. Estado B — después de la rotación

Después de resolver `TURN_B`:

```text
active_shift.shift_id = SHIFT_B
operational_role.role_code = ROLE_B
operational_site.site_id = TURN_B.site_id
operational_area.area_id = TURN_B.area_id cuando corresponda
```

`ROLE_A` no permanece como rol operativo secundario ni fallback.

La autorización de cada acción se evalúa nuevamente con el contexto B.

---

#### 12. Oracle de pérdida de permiso anterior

Para `PERM_A_ONLY`, después de la rotación:

```text
TURN_B CURRENT
+
ROLE_B
+
PERM_A_ONLY no concedido en ROLE_B
→ DENY
```

La razón de autorización debe corresponder a la denegación operacional aplicable y no a un error ficticio de turno si `TURN_B` está correctamente resuelto.

Resultado mínimo:

```text
business_effects = 0
```

Queda prohibido autorizar por:

- el éxito previo de `PERM_A_ONLY`;
- caché;
- token derivado de `TURN_A`;
- decisión de UI;
- permiso del rol anterior;
- historial de asignación.

---

#### 13. Oracle de adquisición del permiso nuevo

Para `PERM_B_ONLY`, después de la rotación y con todos los demás gates satisfechos:

```text
TURN_B CURRENT
+
ROLE_B
+
PERM_B_ONLY válido para ROLE_B
→ el gate de rol/permiso puede continuar como ALLOW
```

Esto no elimina gates posteriores de:

- sede;
- área;
- check-in cuando sea `T+C`;
- dispositivo;
- simulación;
- scope;
- recurso;
- estado mutable;
- cross-site;
- cross-area.

La rotación no convierte un permiso del nuevo rol en autorización automática de la operación completa.

---

#### 14. Control de permiso compartido

Cuando `PERM_SHARED` existe en ambos roles:

```text
ALLOW en TURN_A
+
rotación
+
PERM_SHARED válido en ROLE_B
→ nueva evaluación puede producir ALLOW
```

La continuidad aparente del resultado no demuestra herencia.

Debe existir evidencia de que:

```text
decision_B
```

se calculó con `SHIFT_B` y `ROLE_B`, no reutilizando `decision_A`.

---

#### 15. Prohibición de unión de permisos

Queda prohibido producir:

```text
effective_permissions
=
permissions(ROLE_A) ∪ permissions(ROLE_B)
```

por el hecho de que ambos turnos pertenezcan al mismo trabajador.

También queda prohibido conservar temporalmente:

```text
old role grants
```

mientras se carga el nuevo contexto.

Durante una transición aún no resoluble:

```text
NO CONTEXTO OPERATIVO CONFIABLE
→ NO AUTORIDAD OPERATIVA NUEVA
```

---

#### 16. Rol base versus rol operativo

La rotación no cambia por sí sola:

```text
base_role
```

El actor puede conservar capacidades base que su contrato permita mientras cambia el rol operativo.

Por tanto:

```text
ROTACION OPERATIVA
≠
MUTACION DEL ROL BASE
```

Y:

```text
PERMISO BASE INDEPENDIENTE
```

no debe desaparecer únicamente porque `ROLE_A` cambió a `ROLE_B`.

La prueba distingue siempre carril base y carril operativo.

---

#### 17. Check-in al cambiar de turno

Para una capacidad `T+C`, la sesión de check-in debe ser compatible con el turno actualmente válido.

Si existe:

```text
checkin.shift_id = SHIFT_A
active_shift.shift_id = SHIFT_B
```

la sesión anterior no satisface el nuevo contexto.

No se permite:

```text
CHECKIN_A
→ reutilizar
→ TURN_B
```

La resolución conserva la precedencia y la razón aplicables a mismatch, ausencia limpia o indisponibilidad sin convertir el check-in en fuente del rol.

---

#### 18. Cambio simultáneo de territorio

Una variante puede rotar también:

```text
SITE_A / AREA_A
→
SITE_B / AREA_B
```

En ese caso la prueba exige que el nuevo contexto derive sede y área desde `TURN_B` y que ninguna autoridad territorial de `TURN_A` sobreviva.

Las causas deben permanecer separadas:

```text
permiso ausente en ROLE_B
≠
rol no habilitado en SITE_B
≠
rol no habilitado en AREA_B
≠
recurso cross-site
≠
recurso cross-area
```

La certificación adversarial completa de cruces territoriales sigue perteneciendo a `AUTH-QA-023` y `AUTH-QA-024`.

---

#### 19. Turnos solapados o ambiguos

Si la resolución produce más de un candidato simultáneamente válido sin una regla canónica única que seleccione uno:

```text
SHIFT AMBIGUITY
→ DENY / CONFLICT SEGUN CONTRATO VIGENTE
```

Nunca:

```text
elegir el turno con más permisos
usar el primero
usar el último
limit 1
fusionar roles
```

La prueba debe demostrar ausencia de selección permisiva arbitraria.

---

#### 20. Revisión del rol dentro del mismo turno

Si una transición canónica modifica el rol del turno vigente sin cambiar `shift_id`:

```text
ROLE_A
→ ROLE_B
```

la autoridad derivada de `ROLE_A` queda stale de la misma forma.

La identidad estable del turno no convierte el rol anterior en válido después de una revisión publicada efectiva.

La instancia deberá conservar evidencia suficiente para distinguir:

```text
same shift identity
+
new published role revision
```

sin mezclar ambas versiones.

---

#### 21. Caché y decisiones derivadas

Después de la rotación quedan obsoletos los artefactos cuya autoridad dependa del contexto A, incluyendo cuando aplique:

- contexto de acceso;
- decisión de permiso;
- listado filtrado;
- capability map;
- autorización de mutación;
- suscripción protegida;
- optimistic state;
- token o fingerprint derivado;
- proyección segura que se esté usando como referencia vigente.

La siguiente operación debe resolver o revalidar contra el contexto B.

---

#### 22. Navegación y cambio entre aplicaciones

Una navegación iniciada durante `TURN_A` no transporta autoridad hacia una aplicación abierta después de la rotación.

La aplicación destino debe resolver contexto fresco.

Si los valores visibles cambian:

```text
TURN_A → TURN_B
```

la experiencia puede actualizarse, bloquearse o redirigir conforme a su contrato, pero no conservar el snapshot A como autoridad para evitar fricción de UI.

---

#### 23. Operación offline y replay

Una intención capturada bajo `TURN_A` y sincronizada cuando `TURN_B` ya es efectivo debe reautorizarse conforme al contrato aplicable.

Queda prohibido:

```text
captured_allow_A
→ replay
→ effect under TURN_B
```

La cola puede conservar intención y trazabilidad, no autoridad vencida.

La certificación completa de la cola offline permanece reservada a `AUTH-QA-026`.

---

#### 24. Realtime y suscripciones

Si una suscripción o stream protegido dependía del contexto A, la rotación debe impedir que continúe entregando información fuera del nuevo alcance autorizado.

La implementación física futura deberá demostrar invalidación o revalidación conforme al contrato propietario.

No basta con ocultar filas nuevas en la UI si el canal sigue entregándolas al cliente.

---

#### 25. Mutaciones concurrentes

Una mutación iniciada bajo A pero todavía no comprometida cuando ocurre la rotación debe respetar la frontera de revalidación definida por su contrato.

Cuando la autorización deba ser fresca inmediatamente antes del efecto:

```text
context_A stale
→ revalidate
→ context_B
→ nueva decisión
```

No se admite commit basándose únicamente en una decisión A anterior a la rotación.

---

#### 26. Auditoría e historia

La rotación no reescribe el pasado.

Una operación realizada válidamente bajo A conserva en su evidencia:

```text
actor
SHIFT_A
ROLE_A
SITE_A
AREA_A cuando aplique
decision_A
timestamp_A
```

Una operación posterior usa:

```text
actor
SHIFT_B
ROLE_B
SITE_B
AREA_B cuando aplique
decision_B
timestamp_B
```

La auditoría no transforma operaciones históricas de A para que parezcan ejecutadas con B.

---

#### 27. Paridad entre superficies

La misma rotación debe producir una frontera equivalente en las superficies aplicables:

```text
navigation
Server Actions
Route Handlers
fetch / RSC
RPC / PostgREST
RLS / Data API
Edge Functions
Realtime
clientes nativos
dispositivos compartidos
```

Ninguna superficie puede conservar `ROLE_A` como fallback local después de que `TURN_B` sea la fuente efectiva.

---

#### 28. Casos mínimos de certificación

Cada instancia aplicable debe demostrar como mínimo:

**Caso A — antes de rotación**

```text
TURN_A + ROLE_A + PERM_A_ONLY
→ ALLOW del carril aplicable
```

**Caso B — antes de rotación, permiso del rol futuro**

```text
TURN_A + ROLE_A + PERM_B_ONLY
→ DENY
```

**Caso C — después de rotación, permiso anterior**

```text
TURN_B + ROLE_B + PERM_A_ONLY
→ DENY
→ cero efectos
```

**Caso D — después de rotación, permiso nuevo**

```text
TURN_B + ROLE_B + PERM_B_ONLY
→ gate de rol/permiso satisfecho
```

**Caso E — check-in anterior contra nuevo turno cuando aplique `T+C`**

```text
TURN_B + CHECKIN_A
→ no satisface presencia del nuevo turno
```

**Caso F — decisión stale o replay**

```text
decision_A / cached_A / offline_A
+
TURN_B CURRENT
→ no autoridad
```

**Caso G — ambigüedad de turnos**

```text
multiple current candidates
→ no selección permisiva
```

---

#### 29. Evidencia mínima por caso

Cada caso debe conservar, cuando aplique:

```text
principal_id o identidad pseudonimizada
effective_actor_id o equivalente seguro
base_role
resolved_at
active_shift_id
shift_revision_identity
operational_role_code
operational_site_id
operational_area_id
checkin_session_id o estado seguro
permission_key
authorization_mode
lane_result
reason_code
context_id o fingerprint seguro
resource identity minimizada
business_effect_count
```

La evidencia no necesita exponer secretos ni datos personales innecesarios.

---

#### 30. Prueba de ausencia de efectos

Toda solicitud denegada después de la rotación debe demostrar:

```text
business_effect_count = 0
```

Cuando aplique también deberá comprobar:

- cero filas mutadas;
- cero transición de estado;
- cero job empresarial nuevo;
- cero publicación;
- cero aprobación;
- cero movimiento de inventario;
- cero escritura protegida;
- cero exposición territorial adicional.

---

#### 31. Clasificación de fallos

La prueba debe distinguir como mínimo:

```text
OLD_ROLE_RETAINED
OLD_PERMISSION_RETAINED
ROLE_UNION_DETECTED
OLD_CHECKIN_REUSED
OLD_SITE_RETAINED
OLD_AREA_RETAINED
STALE_DECISION_ACCEPTED
STALE_QUERY_OR_SUBSCRIPTION_ACCEPTED
SHIFT_AMBIGUITY_FAIL_OPEN
BASE_ROLE_MUTATED_BY_ROTATION
CHANNEL_DIVERGENCE
AUDIT_LINEAGE_BROKEN
```

Un resultado funcionalmente denegado no se considera correcto si la razón o el lineage demuestran que el sistema evaluó el turno incorrecto.

---

#### 32. Modelo de ejecución por paquete

La topología vigente es:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Por cada paquete aplicable:

```text
AUTH-QA-009::<package_id>
```

La ejecución física solo puede ocurrir con:

```text
E5-GATE-008::<package_id> = PASS
```

La instancia debe seleccionar roles y permisos canónicos reales del paquete y demostrar la transición sin modificar el contrato global.

---

#### 33. Certificación global final

La identidad:

```text
AUTH-QA-009::GLOBAL-FINAL
```

solo puede certificarse después de reconciliar las instancias por paquete aplicables.

La certificación global deberá demostrar al menos:

- fuente exclusiva del rol desde el turno efectivo;
- ausencia de unión entre permisos de turnos sucesivos;
- pérdida de permisos exclusivos del rol anterior;
- adquisición condicionada de permisos exclusivos del rol nuevo;
- independencia del rol base;
- incompatibilidad del check-in anterior con un nuevo turno cuando aplique;
- invalidación de snapshots y decisiones obsoletas;
- reautorización offline/replay cuando corresponda;
- ausencia de selección permisiva ante ambigüedad;
- paridad multicanal;
- lineage de auditoría intacto.

---

#### 34. Handoff hacia AUTH-QA-010

`AUTH-QA-009` entrega a `AUTH-QA-010` una mecánica de rotación ya definida y certificable:

```text
turno efectivo
→ rol operativo efectivo
→ permisos operativos efectivos
```

sin herencia del turno anterior.

`AUTH-QA-010` podrá entonces seleccionar el rol canónico de bodeguero y demostrar su frontera funcional específica entre preparar y producir.

`AUTH-QA-009` no define todavía qué permisos exactos corresponden a bodeguero.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Justificación:** la recalculación territorial por rotación, la derivación exclusiva del rol desde el turno, la compatibilidad del check-in con el turno vigente, la invalidación de contexto y decisiones obsoletas, la reautorización de operaciones diferidas y la paridad entre superficies ya disponen de cobertura vigente. Esta tarea define la certificación integral de esas obligaciones y no introduce una obligación verificable nueva.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

---

#### 36. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el registro:

- `TREQ-AUTH-008`, para separación entre carriles administrativos y operativos y exigencia de turno/check-in/rol cuando corresponda;
- `TREQ-AUTH-009`, que exige explícitamente recalcular permisos ante rotación y resolver sede y área de forma determinista;
- `TREQ-AUTH-013`, para revalidación server-side de permiso exacto, contexto, territorio, recurso y efecto;
- `TREQ-AUTH-014`, para invalidación de contexto, caché y autoridad derivada ante cambio de turno, área, trabajador, dispositivo, rol o asignación;
- `TREQ-AUTH-187`, `TREQ-AUTH-197` y `TREQ-AUTH-207`, para invalidación de decisiones, cachés y suscripciones ante cambios territoriales o de turno;
- `TREQ-AUTH-229` a `TREQ-AUTH-238`, para compatibilidad exacta del check-in con actor, sede y turno y reautorización posterior;
- `TREQ-AUTH-239` a `TREQ-AUTH-248`, para fuente exclusiva del rol operativo desde el turno, precedencia, canales e invalidación del rol anterior;
- cobertura vigente de servidor, RPC, RLS, offline, Realtime y consumidores que referencia rotación, frescura y revalidación.

Esta sección es trazabilidad de requisitos existentes y no representa una modificación del registro.

---

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | la tarea documental no ejecuta builds de producto ni materializaciones por paquete |
| LOCAL | NOT_EXECUTED | la incorporación y los validadores del checkout se ejecutan durante la batería documental del usuario |
| REMOTA | PASS | se inspeccionaron en `main` el archivo propietario, contratos de turno y rol operativo, precedencia, matrices operativas, contratos de invalidación/frescura, topología, políticas documentales, 04A AUTH y scripts aplicables antes de redactar el artefacto |
| OPERATIVA | NOT_EXECUTED | no se ejecutaron rotaciones reales, check-ins, decisiones de permisos ni operaciones empresariales |
| FÍSICA | NOT_EXECUTED | no se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes, turnos, roles, permisos ni ambientes |

---

#### 38. Criterios de aceptación

La tarea queda documentalmente completa cuando se demuestre que:

1. el turno actualmente válido se vuelve a resolver después de la rotación;
2. el nuevo turno no hereda el rol operativo anterior;
3. el rol efectivo procede exclusivamente del turno actualmente válido;
4. sede y área operativas se recalculan desde ese turno;
5. el rol base no se muta por rotación;
6. permisos base independientes no desaparecen por el solo cambio de turno;
7. `PERM_A_ONLY` deja de autorizar después de pasar a `ROLE_B`;
8. `PERM_B_ONLY` no autoriza antes de `TURN_B`;
9. `PERM_B_ONLY` solo puede continuar después de resolver válidamente el contexto B;
10. un permiso común se reevalúa y no se hereda;
11. no existe unión de permisos entre A y B;
12. un check-in de `SHIFT_A` no satisface `SHIFT_B` en `T+C`;
13. una rotación territorial no conserva sede o área anteriores;
14. una revisión del rol dentro del mismo turno invalida la autoridad anterior;
15. cachés y decisiones dependientes de A dejan de ser autoridad;
16. navegación cross-app vuelve a resolver contexto;
17. offline/replay no conserva `ALLOW_A` como autoridad;
18. una suscripción protegida no continúa entregando alcance de A sin revalidación;
19. mutaciones sujetas a frescura revalidan antes del efecto;
20. una ambigüedad de turnos no elige el rol más permisivo;
21. auditoría histórica de A se conserva sin reescribirse como B;
22. todas las superficies aplicables mantienen frontera equivalente;
23. toda denegación demuestra cero efectos;
24. `AUTH-QA-010` recibe una mecánica de rol por turno sin matrices funcionales específicas redefinidas;
25. no se crean ni modifican requisitos de prueba;
26. no se ejecuta ningún cambio físico durante esta tarea documental.

---

#### 39. Límites

Esta tarea no:

- redefine la resolución de turno publicada por tareas propietarias anteriores;
- redefine el rol base;
- redefine el catálogo de roles operativos;
- redefine las matrices rol–permiso;
- define permisos específicos de bodeguero, reservado a `AUTH-QA-010`;
- define permisos específicos de producción, reservado a `AUTH-QA-011`;
- define permisos específicos de PULSO, reservado a `AUTH-QA-012`;
- certifica en detalle conductor, compras o recepción;
- redefine sede o área operativas ya tratadas por `AUTH-QA-007` y `AUTH-QA-008`;
- redefine reasons públicos;
- convierte el check-in en fuente de rol;
- permite unión temporal de roles;
- crea permisos, grants o denies;
- modifica RLS, RPC, Supabase, aplicaciones, datos o migraciones;
- ejecuta instancias físicas `AUTH-QA-009::<package_id>`;
- ejecuta `AUTH-QA-009::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba `E5-GATE-008`;
- ejecuta la certificación completa de cruces territoriales de `AUTH-QA-023`/`AUTH-QA-024`;
- ejecuta la certificación completa de cola offline de `AUTH-QA-026`.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-008 — Trabajador solo ve su área`

**TAREA ACTUAL APROBADA**
`AUTH-QA-009 — Trabajador rotado cambia de permisos por turno`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-010 — Bodeguero puede preparar pero no producir`
### ✅ AUTH-QA-010 — Bodeguero puede preparar pero no producir

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-009 — Trabajador rotado cambia de permisos por turno
**Tarea siguiente:** AUTH-QA-011 — Producción puede producir pero no ajustar inventario global
**Tipo de tarea:** documental; definición canónica de una prueba integral de segregación de funciones del rol operativo `bodeguero`, reutilizable por paquete y certificable globalmente, para demostrar que puede ejecutar la preparación de remisiones y demás capacidades explícitamente concedidas de bodega sin adquirir capacidades de producción FOGO por nombre de rol, aplicación visible, dispositivo, rol base legacy, contexto territorial o permisos ajenos
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-010::<package_id>` y la certificación `AUTH-QA-010::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, check-ins, roles, permisos, remisiones, lotes de producción, inventario ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que el rol operativo `bodeguero` conserva una frontera funcional estricta entre operación de bodega y producción.

La regla raíz queda:

```text
ROL OPERATIVO = bodeguero
+ CONTEXTO DE BODEGA VÁLIDO
+ PERMISO EXACTO nexo.inventory.remissions.prepare
+ REMISIÓN PREPARABLE DEL ORIGEN AUTORIZADO
→ PREPARACIÓN AUTORIZABLE
```

Y simultáneamente:

```text
ROL OPERATIVO = bodeguero
+ MISMO ACTOR
+ MISMO TURNO
+ MISMO CHECK-IN
+ MISMA SEDE
+ MISMA ÁREA
+ PERMISO FOGO DE PRODUCCIÓN
→ DENY
```

La tarea certifica segregación de funciones. No redefine la matriz de bodeguero ni la matriz de producción.

---

#### 2. Resultado canónico

La tarea deja definidos dieciocho resultados obligatorios:

1. `bodeguero` se resuelve como rol operativo desde el turno válido y no desde un nombre de rol base;
2. la capacidad positiva principal es `nexo.inventory.remissions.prepare`;
3. la preparación solo puede evaluarse dentro del carril operativo y del territorio de bodega aplicable;
4. preparar una remisión no equivale a despacharla, iniciar tránsito, aceptar custodia de conductor ni recibirla en nombre de otro extremo;
5. las seis PermissionKey activas de FOGO permanecen sin grant operativo para `bodeguero`;
6. `fogo.production.batches.create` produce `DENY` para el carril operativo de `bodeguero` aunque los demás componentes de contexto sean válidos;
7. la denegación productiva no se convierte en ausencia de turno, check-in, rol, sede o área cuando esos componentes sí están válidos;
8. la causa esperada ante ausencia ordinaria de grant operativo es `AUTH_OPERATIONAL_PERMISSION_DENIED`;
9. `nexo.access` no funciona como wildcard que habilite FOGO ni otras capacidades internas;
10. una aplicación visible no crea permiso;
11. un dispositivo `warehouse_kiosk` no amplía el conjunto de grants del trabajador;
12. la coincidencia textual histórica `BASE/bodeguero` y `OPERATIONAL/bodeguero` no mezcla namespaces ni grants;
13. ninguna concesión individual, override local o alias puede convertir al bodeguero en productor sin una regla canónica explícita distinta;
14. servidor, RPC, RLS y demás superficies aplicables deben conservar la misma decisión para el mismo permiso y contexto;
15. cualquier intento de mutación productiva denegada conserva cero efectos empresariales;
16. la evidencia distingue autorización de preparación y denegación de producción como decisiones independientes;
17. la certificación usa el dataset operacional vigente y no un conteo histórico obsoleto;
18. ninguna prueba física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- identidad efectiva del actor humano;
- rol base `trabajador_operativo` cuando corresponda al modelo final;
- `AccessContext@1.x`;
- turno publicado y vigente;
- check-in activo cuando el permiso lo exige;
- `operational_role.role_code = bodeguero`;
- sede operativa derivada del turno;
- área operativa de bodega derivada del turno;
- estado y relación laboral activos;
- catálogo vigente de PermissionKey;
- dataset `vento.authorization.operational-role-grants@1.0.0`;
- matriz histórica `AUTH-RBAC-017` únicamente como lineage documental;
- reconciliaciones posteriores `AUTH-CAT-022` a `AUTH-CAT-025`;
- separación de carriles base y operativo;
- precedencia de turno, check-in, rol, sede, área, dispositivo, grant, scope y recurso;
- contrato de default deny;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL`;
- gate físico `POST_E5_PACKAGE`.

La tarea no crea nuevos roles, permisos, grants, denies, aliases ni excepciones.

---

#### 4. Reconciliación contractual obligatoria

La matriz histórica `AUTH-RBAC-017` documentó un snapshot de 112 permisos y 35 concesiones operativas para `bodeguero`.

Ese conteo histórico no gobierna la autorización runtime vigente.

El contrato materializado actual conserva:

```text
PermissionKey activas = 140
operational_role = bodeguero
grants vigentes = 36
```

Distribución vigente del rol:

```text
NEXO  = 31 grants
ORIGO = 5 grants
FOGO  = 0 grants
```

La concesión adicional respecto del snapshot histórico es:

```text
origo.procurement.receipts.register
```

incorporada por la evolución contractual posterior del catálogo.

Esta reconciliación no altera la frontera de esta tarea:

```text
PREPARAR REMISIÓN = CONCESIÓN VIGENTE
PRODUCIR EN FOGO  = SIN GRANT PARA bodeguero
```

Toda instancia de `AUTH-QA-010` debe comparar contra el catálogo y el dataset vigentes del paquete evaluado; no debe fallar ni pasar únicamente por reproducir el conteo histórico de 35.

---

#### 5. Significado exacto de “preparar”

En esta tarea, “preparar” significa exclusivamente ejercer:

```text
nexo.inventory.remissions.prepare
```

sobre una remisión cuyo origen autorizado corresponda a la bodega operativa del actor y cuyo estado admita preparación.

La preparación puede comprender, según el recurso y contratos propietarios:

- reserva o selección física de existencias autorizadas;
- alistamiento;
- cantidades preparadas;
- registro de faltantes;
- sustituciones permitidas por el contrato de remisión;
- empaque;
- trazabilidad del actor;
- transición al estado listo para transporte cuando corresponda al permiso exacto.

No comprende por inferencia:

- solicitar la remisión en nombre de terceros;
- editar libremente el recurso;
- cancelar la remisión;
- aceptar custodia del conductor;
- iniciar tránsito;
- entregar físicamente;
- recibir en el destino;
- producir bienes;
- crear lotes productivos;
- administrar recetas.

---

#### 6. Significado exacto de “producir”

Para esta certificación, la frontera productiva se expresa mediante el catálogo FOGO activo.

Las seis PermissionKey activas son:

```text
fogo.access
fogo.production.batches.view
fogo.production.batches.create
fogo.production.orders.view
fogo.production.recipe_book.view
fogo.production.recipes.view
```

El dataset operativo vigente de `bodeguero` debe contener:

```text
0 grants FOGO
```

La acción negativa primaria será:

```text
fogo.production.batches.create
```

porque representa una mutación productiva inequívoca y su ausencia de grant no depende de interpretación narrativa del verbo “producir”.

---

#### 7. Fixture positiva primaria

La fixture positiva mínima usa:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
base_role = trabajador_operativo
active_shift = EXACTLY_ONE_PUBLISHED_CURRENT
active_shift.operational_role_code = bodeguero
active_shift.site_id = SITE_W
active_shift.area_id = AREA_W
operational_role.role_code = bodeguero
operational_site.site_id = SITE_W
operational_area.area_id = AREA_W
operational_area.kind = warehouse | bodega compatible
active_checkin_session = VALID_AND_MATCHING
permission = nexo.inventory.remissions.prepare
resource = REMISSION_R
resource.origin_site_id = SITE_W
resource.state = PREPARABLE
```

`nexo.inventory.remissions.prepare` usa prerrequisito `T+C`; por tanto, el check-in de esta fixture debe ser único, abierto y compatible con actor, turno y sede.

La fixture no utiliza:

- rol base legacy `bodeguero` como autoridad;
- `navigation_role`;
- `same_site_active_worker`;
- app visible;
- dispositivo como actor;
- cookie;
- override local;
- simulación como autoridad real.

---

#### 8. Oracle positivo de preparación

Con la fixture positiva completa, el evaluador debe producir una decisión autorizable para:

```text
nexo.inventory.remissions.prepare
```

únicamente si también pasan:

- permiso exacto;
- modalidad aplicable;
- rol operativo efectivo;
- turno vigente;
- check-in cuando corresponda;
- sede;
- área;
- habilitación rol–territorio;
- scope;
- estado del recurso;
- relación del actor con el recurso;
- restricciones de dispositivo cuando exista;
- deny explícito aplicable;
- reglas de concurrencia e idempotencia del recurso.

El resultado positivo no significa:

```text
bodeguero → allow global
```

Significa:

```text
bodeguero
+ nexo.inventory.remissions.prepare
+ contexto válido
+ recurso válido
→ ALLOW de esa capacidad exacta
```

---

#### 9. Control de frontera de la preparación

La misma fixture no debe convertir `prepare` en capacidades posteriores o laterales.

Como mínimo se debe demostrar que la autorización de preparación no concede por transitividad:

```text
nexo.inventory.remissions.update
nexo.inventory.remissions.cancel
```

ni cualquier clave vigente de custodia, tránsito o entrega que pertenezca al conductor o a otra etapa.

La prueba no redefine qué actor posee cada etapa; únicamente demuestra que el grant positivo no es wildcard.

---

#### 10. Fixture negativa productiva primaria

Se conserva el mismo actor y, cuando sea posible, exactamente el mismo snapshot válido:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
active_shift.operational_role_code = bodeguero
operational_role.role_code = bodeguero
operational_site = VALID
operational_area = VALID_WAREHOUSE
active_checkin_session = VALID_AND_MATCHING
```

Se cambia únicamente la capacidad objetivo:

```text
permission = fogo.production.batches.create
```

La fixture puede utilizar un recurso productivo sintético o controlado suficiente para alcanzar el gate de permiso sin ejecutar efecto alguno.

No se debe fabricar una incompatibilidad territorial para obtener la denegación: el objetivo es demostrar segregación por grant de rol.

---

#### 11. Oracle negativo productivo primario

Para `fogo.production.batches.create` y `operational_role = bodeguero`:

```text
matched_operational_grant = NONE
→ DENY
→ executable = false
→ business_effects = 0
```

Cuando la ausencia ordinaria de grant sea la causa decisiva, la respuesta debe conservar:

```text
AUTH_OPERATIONAL_PERMISSION_DENIED
```

o la identidad canónica equivalente que el contrato vigente del evaluador establezca para default deny operacional.

No debe degradarse a:

- falta de turno;
- falta de check-in;
- rol faltante;
- sede faltante;
- área faltante;
- fallo técnico;
- permiso inexistente;

si esos hechos no describen la fixture.

---

#### 12. Barrido negativo de FOGO

Además del caso primario, la instancia debe evaluar las seis PermissionKey FOGO activas contra `bodeguero`.

Resultado esperado de grants directos de `bodeguero`:

| PermissionKey | Grant operativo esperado |
| --- | --- |
| `fogo.access` | ninguno |
| `fogo.production.batches.view` | ninguno |
| `fogo.production.batches.create` | ninguno |
| `fogo.production.orders.view` | ninguno |
| `fogo.production.recipe_book.view` | ninguno |
| `fogo.production.recipes.view` | ninguno |

La prueba no exige que todas produzcan idéntica razón final si una capacidad adicionalmente depende de otro gate anterior. Sí exige que ninguna pueda alcanzar `ALLOW` por la matriz operativa de `bodeguero`.

---

#### 13. Namespace tipado de `bodeguero`

El código textual `bodeguero` tuvo presencia histórica en más de un catálogo.

La certificación debe conservar:

```text
BASE/bodeguero
≠
OPERATIONAL/bodeguero
```

La autoridad positiva de esta tarea procede únicamente de:

```text
active_shift.operational_role_code = bodeguero
→ OperationalRoleCode
→ operational-role-grants
```

No procede de:

```text
employees.role = bodeguero
```

ni de un alias, cast o fallback nominal.

Si una implementación todavía conserva el rol base legacy, su existencia no puede completar ni ampliar el carril operativo.

---

#### 14. Dispositivo compartido y navegación

Un dispositivo compatible con bodega puede restringir el entorno, pero no crear grants empresariales.

Por tanto:

```text
warehouse_kiosk
+ navigation_role = bodeguero
≠
autorización de producción
```

Y:

```text
FOGO visible
≠
fogo.production.batches.create permitido
```

La navegación nunca sustituye la evaluación server-side de la acción concreta.

---

#### 15. Recurso y estado en el caso positivo

La prueba positiva no se considera válida si solo demuestra que el rol tiene el grant.

Debe demostrar además que la remisión evaluada cumple el contexto mínimo propietario, incluyendo cuando corresponda:

- origen autorizado;
- estado preparable;
- líneas solicitadas válidas;
- cantidades y presentaciones válidas;
- stock o reserva compatible;
- faltantes y sustituciones dentro de la política;
- versión vigente del recurso;
- ausencia de cancelación o transición incompatible;
- idempotencia de la mutación.

Una remisión inválida puede ser `DENY` aunque el grant exista; ese resultado no contradice la matriz.

---

#### 16. Separación entre matriz y autorización final

La prueba distingue dos preguntas:

```text
¿EL ROL TIENE EL GRANT?
```

Y:

```text
¿LA SOLICITUD COMPLETA ESTÁ AUTORIZADA?
```

Para `remissions.prepare`:

```text
grant = PRESENT
final decision = depende del resto de gates
```

Para `fogo.production.batches.create`:

```text
grant = ABSENT
final decision = DENY
```

No se acepta una implementación que convierta el primer resultado en permiso global ni el segundo en permiso por pertenecer a Centro de Producción.

---

#### 17. Paridad entre evaluadores

Para la misma identidad de actor, permiso, turno, sede, área, dispositivo y recurso, los evaluadores aplicables deben conservar decisión y razones equivalentes.

La cobertura puede incluir, según el package:

- Server Actions;
- Route Handlers;
- fetch/RSC;
- SDK compartido;
- RPC/PostgREST;
- RLS/Data API;
- Edge Functions;
- Realtime;
- clientes nativos;
- dispositivo compartido.

No se exige que todos los packages materialicen todos los canales. Sí se exige que ningún canal disponible permita producción a `bodeguero` por una copia local más permisiva.

---

#### 18. Cero efectos en la denegación

Toda solicitud negativa productiva debe terminar sin efectos empresariales.

Como mínimo no puede:

- crear un lote;
- reservar identificadores de negocio como si el lote existiera;
- consumir inventario;
- registrar producción;
- alterar estado de una orden;
- generar movimientos de inventario;
- publicar eventos de éxito;
- confirmar una operación al cliente;
- dejar reintentos ambiguos que puedan aplicar el efecto después.

La auditoría de una denegación no cuenta como efecto empresarial.

---

#### 19. Casos mínimos obligatorios

| Caso | Contexto | PermissionKey | Resultado mínimo |
| --- | --- | --- | --- |
| A | `bodeguero`, bodega válida, turno válido, check-in válido cuando corresponda, remisión preparable | `nexo.inventory.remissions.prepare` | grant presente; `ALLOW` si pasan todos los gates restantes |
| B | mismo contexto válido | `fogo.production.batches.create` | `DENY`, cero efectos |
| C | mismo rol con cada una de las seis claves FOGO activas | familia FOGO | cero grants operativos de bodeguero; ningún `ALLOW` por esta matriz |
| D | `BASE/bodeguero` sin rol operativo derivado del turno | `nexo.inventory.remissions.prepare` | no autoriza por coincidencia nominal |
| E | `warehouse_kiosk` sin actor/rol efectivo válido | `nexo.inventory.remissions.prepare` | no autoriza por dispositivo |
| F | `bodeguero` con grant de preparación pero recurso no preparable | `nexo.inventory.remissions.prepare` | `DENY` por gate de recurso/estado correspondiente, no por ausencia del grant |
| G | `bodeguero` con `nexo.access` | una capacidad FOGO | `DENY`; acceso de aplicación no es wildcard |

---

#### 20. Clasificación de fallos

La instancia falla si observa cualquiera de estos estados:

```text
FAIL_GRANT_MISSING_FOR_REMISSION_PREPARE
FAIL_FOGO_GRANT_PRESENT_FOR_WAREHOUSE_ROLE
FAIL_PRODUCTION_ALLOWED_FOR_WAREHOUSE_ROLE
FAIL_BASE_ROLE_COLLISION_BYPASS
FAIL_DEVICE_ROLE_BYPASS
FAIL_APP_ACCESS_WILDCARD
FAIL_RESOURCE_GATE_SKIPPED
FAIL_ZERO_EFFECT_VIOLATION
FAIL_CHANNEL_DIVERGENCE
FAIL_STALE_OR_LEGACY_MATRIX_USED_AS_RUNTIME_AUTHORITY
```

Un fallo no se corrige ampliando la matriz de `bodeguero` dentro de esta tarea.

La corrección pertenece al owner contractual o de implementación que corresponda y debe conservar `TREQ-AUTH-010`.

---

#### 21. Modelo de ejecución por paquete

La topología vigente es:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Cada package aplicable materializa:

```text
AUTH-QA-010::<package_id>
```

únicamente después de:

```text
E5-GATE-008::<package_id> = PASS
```

porque el gate físico vigente es:

```text
POST_E5_PACKAGE
```

La tarea documental no selecciona package, no ejecuta E5 y no crea instancias físicas.

---

#### 22. Evidencia mínima por package

Cada futura instancia debe registrar como mínimo:

```text
package_id
repository
commit_or_release_under_test
catalog_version
operational_grants_dataset_version
actor_fixture
shift_fixture
checkin_fixture
operational_role_code
site_fixture
area_fixture
positive_permission_key
positive_resource_fixture
positive_decision
negative_permission_key
negative_decision
fogo_active_permission_set
matched_grants
reason_codes
business_effect_count
channels_tested
validation_commands
result
```

No se considera evidencia suficiente una captura de UI o una lista estática de menús sin decisión de autorización verificable.

---

#### 23. Certificación global final

`AUTH-QA-010::GLOBAL-FINAL` podrá certificarse únicamente después de reconciliar las instancias por package aplicables y demostrar que:

1. el catálogo activo usado por las pruebas es el canónico vigente;
2. el dataset operacional usado por las pruebas es el canónico vigente;
3. `bodeguero` conserva grants de preparación de bodega aplicables;
4. las seis claves FOGO activas continúan sin grant para `bodeguero`;
5. ningún consumidor conserva un bypass por rol legacy, dispositivo, app o helper local;
6. toda denegación productiva conserva cero efectos;
7. no existen packages aplicables pendientes sin resultado concluyente.

La certificación global no reabre ni modifica las matrices por sí misma.

---

#### 24. Handoff a `AUTH-QA-011`

`AUTH-QA-010` entrega a la tarea siguiente una frontera ya cerrada:

```text
BODEGUERO
→ puede preparar remisiones cuando el contexto completo lo autoriza
→ no recibe producción FOGO
```

`AUTH-QA-011` recibe exclusivamente la responsabilidad de probar la frontera inversa de producción:

```text
PRODUCCIÓN
→ puede producir
→ no puede ajustar inventario global
```

La tarea siguiente no debe reabrir los grants de bodeguero.

---

#### 25. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos obsoletos: 0
```

La tarea certifica reglas ya registradas y no cambia el Registro Canónico de Requisitos de Prueba.

---

#### 26. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar sus filas, la cobertura vigente de:

- `TREQ-AUTH-001`, para impedir autorización por listas locales de nombres de rol;
- `TREQ-AUTH-004`, para paridad entre evaluadores;
- `TREQ-AUTH-008`, para separación de carril base y operativo y exigencia del contexto laboral aplicable;
- `TREQ-AUTH-009`, para territorio operativo derivado de contexto;
- `TREQ-AUTH-010`, que exige expresamente que bodeguero prepare sin producir y preserva segregación de funciones;
- `TREQ-AUTH-013`, para validación server-side de toda mutación;
- `TREQ-AUTH-014`, para invalidación de decisiones obsoletas cuando cambia el contexto;
- cobertura contractual del catálogo operativo y del dataset materializado que mantiene separados roles, permisos y grants.

Esta sección es trazabilidad de cobertura existente y no representa una actualización de 04A.

---

#### 27. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado en la rama documental de `AUTH-QA-010` ni sometido al build canónico del plan. |
| LOCAL | NOT_EXECUTED | El checkout local todavía no ha ejecutado formateo, quality, delivery, topología, TREQ ni la batería global posterior a la inserción. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `AUTH-RBAC-017`, el catálogo activo de 140 PermissionKey, `vento.authorization.operational-role-grants@1.0.0`, 36 grants vigentes de `bodeguero` distribuidos en 31 NEXO y 5 ORIGO, cero grants FOGO para `bodeguero`, las seis claves FOGO activas y la cobertura existente de `TREQ-AUTH-010`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron casos reales de preparación, producción, turno, check-in, remisión, lote ni autorización. |
| FÍSICA | NOT_EXECUTED | No se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes, permisos, roles, datasets ni ambientes. |

---

#### 28. Criterios de aceptación

`AUTH-QA-010` queda documentalmente correcta cuando se demuestra que:

1. `bodeguero` se trata como rol operativo tipado y derivado del turno;
2. la vigencia contractual actual usa 140 PermissionKey y 36 grants de `bodeguero`, sin convertir el snapshot histórico de 35 en autoridad runtime;
3. `nexo.inventory.remissions.prepare` está presente como grant operativo de `bodeguero`;
4. el caso positivo exige contexto laboral, territorio, permiso exacto y recurso preparable;
5. preparar no concede editar, cancelar, transitar, entregar o recibir por inferencia;
6. las seis PermissionKey FOGO activas tienen cero grants para `bodeguero`;
7. `fogo.production.batches.create` produce denegación con cero efectos para `bodeguero`;
8. la denegación no se falsifica provocando artificialmente ausencia de turno, check-in, rol, sede o área;
9. el rol base legacy no puede ampliar el rol operativo por coincidencia textual;
10. dispositivo, navegación o app visible no pueden ampliar grants;
11. servidor y demás evaluadores aplicables conservan decisión equivalente;
12. la ausencia de grant productivo no se corrige dentro de esta tarea;
13. no se crean ni modifican requisitos de prueba;
14. no se ejecutan cambios físicos.

---

#### 29. Límites

Esta tarea no:

- redefine la matriz completa de `bodeguero`;
- redefine la matriz de producción;
- cambia los 36 grants vigentes de `bodeguero`;
- restaura el conteo histórico de 35 como autoridad runtime;
- crea o elimina PermissionKey;
- crea grants o denies;
- modifica `AUTH-CAT-022` a `AUTH-CAT-025`;
- define nuevos permisos de recepción, producción, inventario o logística;
- determina la matriz de `produccion_cocina`, `produccion_panaderia` o `produccion_reposteria`;
- certifica que producción no ajuste inventario global; pertenece a `AUTH-QA-011`;
- certifica PULSO; pertenece a `AUTH-QA-012`;
- certifica conductor; pertenece a `AUTH-QA-013`;
- modifica UI o navegación;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos o datasets;
- ejecuta `AUTH-QA-010::<package_id>`;
- ejecuta `AUTH-QA-010::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-009 — Trabajador rotado cambia de permisos por turno`

**TAREA ACTUAL APROBADA**
`AUTH-QA-010 — Bodeguero puede preparar pero no producir`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-011 — Producción puede producir pero no ajustar inventario global`
### ✅ AUTH-QA-011 — Producción puede producir pero no ajustar inventario global

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-010 — Bodeguero puede preparar pero no producir
**Tarea siguiente:** AUTH-QA-012 — Cajero puede operar PULSO pero no configurar
**Tipo de tarea:** documental; definición canónica de una prueba integral de segregación de funciones para los roles operativos `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`, reutilizable por paquete y certificable globalmente, para demostrar que pueden ejecutar producción y consumo trazable dentro de su área autorizada sin adquirir la capacidad combinada de ajuste genérico de inventario por rol, aplicación visible, dispositivo, coincidencia territorial, componente base aislado ni permisos ajenos
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-011::<package_id>` y la certificación `AUTH-QA-011::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, check-ins, roles, permisos, órdenes, lotes, retiros, ajustes de inventario ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que los roles operativos de producción conservan una frontera funcional estricta entre ejecución productiva y corrección general de inventario.

La regla positiva raíz queda:

```text
ROL OPERATIVO PRODUCTIVO VÁLIDO
+ CONTEXTO PRODUCTIVO VÁLIDO
+ PERMISO EXACTO fogo.production.batches.create
+ ORDEN / RECETA OPERATIVA / ÁREA COMPATIBLES
→ CREACIÓN DE LOTE AUTORIZABLE
```

Y simultáneamente:

```text
MISMO ACTOR
+ MISMO TURNO
+ MISMO CHECK-IN
+ MISMA SEDE
+ MISMA ÁREA PRODUCTIVA
+ PERMISO nexo.inventory.adjustments.register
→ DENY SI NO EXISTEN AMBOS COMPONENTES CANÓNICOS REQUERIDOS
```

La tarea certifica segregación de funciones. No redefine las matrices de producción, inventario ni gerencia.

---

#### 2. Resultado canónico

La tarea deja definidos veinte resultados obligatorios:

1. `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria` se resuelven como roles operativos desde el turno válido;
2. los tres roles conservan exactamente dieciséis grants operativos vigentes cada uno en el dataset materializado actual;
3. cada rol productivo conserva cinco grants FOGO y once grants NEXO;
4. la capacidad positiva principal es `fogo.production.batches.create`;
5. `fogo.production.batches.create` es `OPERATIONAL_ONLY` y requiere turno y check-in activos, rol, sede, área, orden, receta operativa, cantidades y estado compatibles;
6. cada rol productivo puede registrar consumo trazable mediante `nexo.inventory.withdrawals.register` únicamente contra una orden o lote de su área;
7. el retiro productivo no equivale a un ajuste genérico de inventario;
8. `nexo.inventory.adjustments.register` permanece sin grant para los tres roles productivos;
9. `nexo.inventory.adjustments.register` es `BASE_AND_OPERATIONAL` y no puede autorizarse con un solo carril;
10. un actor productivo con rol base `trabajador_operativo` no obtiene el componente base de `nexo.inventory.adjustments.register`;
11. incluso cuando un actor tenga un componente base válido por otra autoridad, un rol operativo productivo no aporta por sí mismo el componente operativo de `nexo.inventory.adjustments.register`;
12. la combinación incompleta produce `DENY` y cero efectos empresariales;
13. la denegación de ajuste no se simula retirando turno, check-in, rol, sede o área cuando la prueba pretende aislar segregación de funciones;
14. `nexo.access`, `fogo.access`, navegación, dispositivo o visibilidad de inventario no funcionan como wildcards;
15. producción puede consultar y consumir únicamente los recursos mínimos autorizados por su matriz sin obtener administración general de inventario;
16. la autorización de lote y la denegación de ajuste se evalúan como decisiones independientes sobre PermissionKey exactas;
17. servidor, RPC, RLS y demás superficies aplicables conservan la misma frontera para el mismo contexto y permiso;
18. un intento de ajuste denegado conserva cero mutaciones de stock, ajustes, movimientos, auditoría empresarial falsa o efectos derivados;
19. la certificación usa catálogo y datasets vigentes, no snapshots históricos como autoridad runtime;
20. ninguna prueba física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- identidad efectiva del actor humano;
- `AccessContext@1.x`;
- turno publicado y vigente;
- check-in activo cuando el permiso lo exige;
- roles operativos `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`;
- sede operativa derivada del turno;
- área operativa derivada del turno;
- estado y relación laboral activos;
- catálogo vigente de 140 PermissionKey;
- dataset `vento.authorization.operational-role-grants@1.0.0`;
- dataset vigente de grants base;
- matrices `AUTH-RBAC-014`, `AUTH-RBAC-015` y `AUTH-RBAC-016`;
- reconciliaciones contractuales posteriores del catálogo y datasets;
- modalidades `OPERATIONAL_ONLY`, `BASE_OR_OPERATIONAL` y `BASE_AND_OPERATIONAL`;
- separación de carriles base y operativo;
- precedencia de turno, check-in, rol, sede, área, dispositivo, grant, scope y recurso;
- contrato de default deny;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL`;
- gate físico `POST_E5_PACKAGE`.

La tarea no crea nuevos roles, permisos, grants, denies, aliases ni excepciones.

---

#### 4. Universo productivo certificado

La tarea cubre exactamente tres roles operativos productivos centrales:

| Rol operativo | Sede y área productiva canónica | Grants vigentes | FOGO | NEXO |
| --- | --- | ---: | ---: | ---: |
| `produccion_cocina` | Centro de Producción + Cocina Caliente | 16 | 5 | 11 |
| `produccion_panaderia` | Centro de Producción + Galletería y Panadería | 16 | 5 | 11 |
| `produccion_reposteria` | Centro de Producción + Repostería | 16 | 5 | 11 |

La coincidencia cuantitativa no implica herencia entre roles. Cada grant conserva su `operational_role_code`, PermissionKey, scope, condición y source task propios.

No forman parte de este universo:

- `cocinero_satelite`;
- `bodeguero`;
- `gerencia_operativa`;
- roles base administrativos;
- dispositivos de producción;
- perfiles de navegación.

---

#### 5. Significado exacto de “puede producir”

Para esta certificación, la mutación productiva positiva principal se expresa mediante la PermissionKey activa:

```text
fogo.production.batches.create
```

La capacidad representa creación trazable de un lote productivo para una orden válida del área exacta del rol.

No significa por inferencia:

- editar recetas maestras;
- operar un área productiva distinta;
- aprobar o cerrar cualquier estado futuro no representado por una PermissionKey vigente;
- administrar inventario general;
- registrar ajustes de stock;
- mover inventario entre sedes;
- operar bodega;
- ejecutar compras o recepción;
- ampliar autoridad por compartir el Centro de Producción.

Si el catálogo futuro descompone el ciclo productivo en nuevas PermissionKey, cada futura instancia deberá reconciliar el conjunto activo del package evaluado. Esta tarea no convierte `batches.create` en wildcard de producción.

---

#### 6. Significado exacto de “no ajustar inventario global”

En esta tarea, la frontera negativa principal se expresa mediante:

```text
nexo.inventory.adjustments.register
```

La PermissionKey representa un ajuste genérico o excepcional del inventario y su modalidad vigente es:

```text
BASE_AND_OPERATIONAL
```

Por tanto:

```text
BASE ALLOW
+
OPERATIONAL ALLOW
=
CONDICIÓN NECESARIA, NO SUFICIENTE POR SÍ SOLA
```

antes de aplicar territorio, recurso, estado, reautenticación, auditoría u otras restricciones.

La ausencia de cualquiera de los dos carriles obligatorios impide `ALLOW`.

“Global” no significa que toda ejecución tenga scope organizacional ilimitado. En esta prueba significa que la producción no recibe autoridad genérica de corrección de existencias por el mero hecho de producir o consumir insumos.

---

#### 7. Diferencia obligatoria entre consumo y ajuste

Los tres roles productivos sí conservan:

```text
nexo.inventory.withdrawals.register
```

como grant `OPERATIONAL_ONLY` para registrar consumo trazable de insumos desde ubicaciones autorizadas hacia una orden o lote de su área.

Ese permiso exige, entre otros controles:

- turno y check-in activos;
- stock disponible;
- producto, presentación y unidad válidos;
- lote y ubicación compatibles;
- cantidad válida;
- orden, receta o lote relacionado;
- idempotencia;
- concurrencia;
- prohibición de stock negativo.

La relación obligatoria es:

```text
CONSUMO PRODUCTIVO TRAZABLE
≠
AJUSTE GENÉRICO DE INVENTARIO
```

Una implementación no puede bloquear todo efecto de inventario de producción para hacer pasar esta tarea, ni puede reutilizar `withdrawals.register` como alias de `adjustments.register`.

---

#### 8. Fixture positiva — `produccion_cocina`

El fixture mínimo utiliza:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
active_shift = EXACTLY_ONE_PUBLISHED_CURRENT
active_shift.operational_role_code = produccion_cocina
site_fixture = CENTRO_PROD
area_fixture = COC-CAL
checkin = ACTIVE_COMPATIBLE
operational_role.role_code = produccion_cocina
permission = fogo.production.batches.create
resource = ORDER_AND_RECIPE_COMPATIBLE_WITH_COCINA_CALIENTE
```

El fixture debe mantener válidos todos los componentes ajenos a la segregación de funciones.

---

#### 9. Fixture positiva — `produccion_panaderia`

El fixture mínimo utiliza:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
active_shift = EXACTLY_ONE_PUBLISHED_CURRENT
active_shift.operational_role_code = produccion_panaderia
site_fixture = CENTRO_PROD
area_fixture = PAN-GALL
checkin = ACTIVE_COMPATIBLE
operational_role.role_code = produccion_panaderia
permission = fogo.production.batches.create
resource = ORDER_AND_RECIPE_COMPATIBLE_WITH_GALLETERIA_Y_PANADERIA
```

El fixture no reutiliza el área de otro rol productivo.

---

#### 10. Fixture positiva — `produccion_reposteria`

El fixture mínimo utiliza:

```text
principal = HUMAN_USER
actor_effective = EMPLOYEE
employee_status = ACTIVE
active_shift = EXACTLY_ONE_PUBLISHED_CURRENT
active_shift.operational_role_code = produccion_reposteria
site_fixture = CENTRO_PROD
area_fixture = REPOSTERIA
checkin = ACTIVE_COMPATIBLE
operational_role.role_code = produccion_reposteria
permission = fogo.production.batches.create
resource = ORDER_AND_RECIPE_COMPATIBLE_WITH_REPOSTERIA
```

El fixture no obtiene autoridad sobre Cocina Caliente ni Galletería y Panadería por compartir sede.

---

#### 11. Oracle positivo obligatorio

Para cada uno de los tres roles, la futura ejecución debe demostrar:

```text
permission_key = fogo.production.batches.create
grant_type = DIRECT_OPERATIONAL
authorization_mode = OPERATIONAL_ONLY
operational_role_code = rol exacto del fixture
final_decision = ALLOW
```

solo cuando todas las condiciones contractuales del rol, territorio, permiso y recurso estén satisfechas.

La evidencia debe conservar el grant exacto consumido y no solo un booleano de interfaz.

---

#### 12. Fixture negativa primaria — ajuste sin autoridad combinada

La fixture negativa principal reutiliza un contexto productivo válido y cambia únicamente la PermissionKey objetivo:

```text
permission = nexo.inventory.adjustments.register
```

Para el caso base ordinario:

```text
base_role = trabajador_operativo
operational_role = uno de los tres roles productivos
turno = válido
checkin = válido
sede = válida
área = válida
recurso = inventario territorialmente compatible
```

El dataset vigente no concede `nexo.inventory.adjustments.register` a `trabajador_operativo` en el carril base ni a ninguno de los tres roles productivos en el carril operativo.

---

#### 13. Oracle negativo primario

Para cada rol productivo, el resultado obligatorio es:

```text
permission_key = nexo.inventory.adjustments.register
authorization_mode = BASE_AND_OPERATIONAL
final_decision = DENY
business_effect_count = 0
```

La evidencia debe demostrar que el `DENY` procede de autoridad insuficiente para la PermissionKey exacta y no de un contexto artificialmente roto.

Cuando el evaluador exponga razones por carril, debe conservar las razones canónicas que correspondan a los componentes ausentes o denegados. La certificación no fuerza una única razón pública si el contrato vigente conserva evidencia separada de carril base y operativo.

---

#### 14. Control adversarial — componente base aislado no basta

La prueba debe incluir al menos un escenario donde el actor posea un componente base válido de:

```text
nexo.inventory.adjustments.register
```

por un rol base que realmente lo conceda y, simultáneamente, tenga un rol operativo productivo válido.

La condición a demostrar es:

```text
BASE_COMPONENT = ALLOW
OPERATIONAL_ROLE = produccion_cocina | produccion_panaderia | produccion_reposteria
OPERATIONAL_COMPONENT para adjustments.register = AUSENTE
→ COMBINATION = DENY
```

El componente base aislado no puede convertir a producción en autoridad de ajuste.

La prueba no otorga artificialmente `gerencia_operativa` ni otra concesión operativa compatible con el ajuste.

---

#### 15. Control positivo de consumo productivo

Para evitar una falsa implementación que bloquee toda mutación de inventario desde producción, cada package aplicable debe probar al menos un caso válido de:

```text
nexo.inventory.withdrawals.register
```

con consumo vinculado a orden o lote del área exacta.

Resultado esperado:

```text
final_decision = ALLOW
```

cuando se satisfacen sus condiciones.

Esto demuestra que la frontera certificada es específica:

```text
PRODUCCIÓN PUEDE CONSUMIR TRAZABLEMENTE
PERO NO PUEDE AJUSTAR INVENTARIO GENÉRICAMENTE
```

---

#### 16. Frontera de aplicación y dispositivo

Las superficies visibles no cambian la matriz.

No se admite:

```text
fogo.access → todas las acciones FOGO
nexo.access → todas las acciones NEXO
production_kitchen → autoridad empresarial propia
production_bakery → autoridad empresarial propia
production_pastry → autoridad empresarial propia
misma sede → acceso a todas las áreas
rol productivo → ajuste de inventario
```

El dispositivo compartido solo puede restringir el contexto disponible. Nunca crea el componente base ni el componente operativo de una PermissionKey.

---

#### 17. Separación territorial entre roles productivos

La tarea no reabre la certificación territorial de `AUTH-QA-007` y `AUTH-QA-008`, pero la usa como precondición.

Cada caso positivo debe conservar:

```text
produccion_cocina      → Cocina Caliente
produccion_panaderia   → Galletería y Panadería
produccion_reposteria  → Repostería
```

Un `ALLOW` obtenido mediante área incorrecta, selector de interfaz, dispositivo o recurso de otra área invalida la prueba aunque la PermissionKey sea correcta.

---

#### 18. Paridad entre evaluadores

Cuando una PermissionKey y su contexto sean equivalentes, las superficies autoritativas aplicables deben coincidir en:

- decisión final;
- modalidad de autorización;
- grants consumidos;
- reasons o evidencia de carril aplicable;
- territorio;
- recurso;
- cero efectos ante `DENY`.

No se admite que la UI niegue un ajuste pero una Server Action, API, RPC o política de datos lo ejecute, ni el caso inverso para la creación de lote autorizada.

---

#### 19. Persistencia y cero efectos indebidos

Un intento denegado de `nexo.inventory.adjustments.register` no puede producir:

- fila de ajuste válida;
- cambio de cantidad disponible;
- cambio de lote o LPN;
- movimiento compensatorio;
- entrada o retiro artificial;
- evento empresarial que declare ajuste aplicado;
- reintento que convierta el `DENY` en efecto;
- escritura parcial antes del fallo.

La evidencia técnica de intento denegado puede auditarse conforme al contrato, pero no puede confundirse con un ajuste ejecutado.

---

#### 20. Auditoría mínima

Cada caso futuro debe conservar evidencia suficiente para reconstruir:

```text
principal
actor_effective
base_role
operational_role
shift_id
checkin_id_or_state
site_id
area_id
device_id_or_null
permission_key
authorization_mode
resource_identity
matched_allows
matched_denies
lane_decisions
final_decision
reason_codes
business_effect_count
catalog_version
dataset_version
timestamp
correlation_id
```

La ausencia de una de estas dimensiones no se corrige inventándola desde el cliente.

---

#### 21. Casos mínimos obligatorios

La suite futura debe contener como mínimo:

| Caso | Rol | PermissionKey | Contexto | Resultado |
| --- | --- | --- | --- | --- |
| A | `produccion_cocina` | `fogo.production.batches.create` | Cocina Caliente válida | ALLOW |
| B | `produccion_panaderia` | `fogo.production.batches.create` | Galletería y Panadería válida | ALLOW |
| C | `produccion_reposteria` | `fogo.production.batches.create` | Repostería válida | ALLOW |
| D | `produccion_cocina` | `nexo.inventory.adjustments.register` | contexto productivo válido | DENY + cero efectos |
| E | `produccion_panaderia` | `nexo.inventory.adjustments.register` | contexto productivo válido | DENY + cero efectos |
| F | `produccion_reposteria` | `nexo.inventory.adjustments.register` | contexto productivo válido | DENY + cero efectos |
| G | uno de los tres roles productivos | `nexo.inventory.adjustments.register` | componente base válido + rol productivo válido | DENY por combinación incompleta |
| H | uno de los tres roles productivos | `nexo.inventory.withdrawals.register` | consumo válido de orden/lote propio | ALLOW |

Los casos D, E y F no pueden provocar el `DENY` eliminando turno, check-in, sede, área o rol.

---

#### 22. Clasificación de fallos

La futura ejecución deberá distinguir al menos:

```text
FAIL_PRODUCTION_GRANT_MISSING
FAIL_WRONG_PRODUCTION_ROLE
FAIL_WRONG_PRODUCTION_AREA
FAIL_PRODUCTION_RESOURCE_SCOPE
FAIL_ADJUSTMENT_GRANTED_TO_PRODUCTION
FAIL_BASE_AND_OPERATIONAL_COLLAPSED_TO_ONE_LANE
FAIL_WITHDRAWAL_BLOCKED_AS_IF_IT_WERE_ADJUSTMENT
FAIL_ADJUSTMENT_ALIASED_FROM_WITHDRAWAL
FAIL_ZERO_EFFECT_VIOLATION
FAIL_CHANNEL_DIVERGENCE
FAIL_STALE_MATRIX_USED_AS_RUNTIME_AUTHORITY
```

Un fallo no se corrige ampliando una matriz de producción dentro de esta tarea.

La corrección pertenece al owner contractual o de implementación correspondiente y debe preservar la segregación registrada por `TREQ-AUTH-010`.

---

#### 23. Modelo de ejecución por paquete

La topología vigente es:

```text
PER_PACKAGE_AND_GLOBAL_FINAL
```

Cada package aplicable materializa:

```text
AUTH-QA-011::<package_id>
```

únicamente después de:

```text
E5-GATE-008::<package_id> = PASS
```

porque el gate físico vigente es:

```text
POST_E5_PACKAGE
```

La tarea documental no selecciona package, no ejecuta E5 y no crea instancias físicas.

---

#### 24. Evidencia mínima por package

Cada futura instancia debe registrar como mínimo:

```text
package_id
repository
commit_or_release_under_test
catalog_version
base_grants_dataset_version
operational_grants_dataset_version
production_role_under_test
actor_fixture
shift_fixture
checkin_fixture
site_fixture
area_fixture
positive_production_permission
positive_production_resource
positive_production_decision
negative_adjustment_permission
negative_adjustment_decision
base_lane_outcome
operational_lane_outcome
consumption_control_permission
consumption_control_decision
matched_grants
reason_codes
business_effect_count
channels_tested
validation_commands
result
```

No se considera evidencia suficiente una captura de UI ni una lista estática de menús sin decisión de autorización verificable.

---

#### 25. Certificación global final

`AUTH-QA-011::GLOBAL-FINAL` podrá certificarse únicamente después de reconciliar las instancias por package aplicables y demostrar que:

1. los tres roles productivos continúan presentes en el catálogo operativo vigente;
2. cada uno conserva los grants productivos esperados del package evaluado;
3. `fogo.production.batches.create` continúa autorizable únicamente con contexto productivo compatible;
4. `nexo.inventory.adjustments.register` no se concede como capacidad completa a los roles productivos;
5. la semántica `BASE_AND_OPERATIONAL` conserva ambos carriles obligatorios;
6. la existencia de un componente base aislado no convierte a producción en autoridad de ajuste;
7. `nexo.inventory.withdrawals.register` conserva el consumo trazable permitido sin convertirse en alias de ajuste;
8. cada rol permanece dentro de su área productiva exacta;
9. ninguna superficie autoritativa conserva un bypass por rol, dispositivo, aplicación o helper local;
10. toda denegación de ajuste conserva cero efectos;
11. no existen packages aplicables pendientes sin resultado concluyente.

La certificación global no reabre ni modifica las matrices por sí misma.

---

#### 26. Handoff a `AUTH-QA-012`

`AUTH-QA-011` entrega a la tarea siguiente una frontera ya cerrada:

```text
PRODUCCIÓN
→ puede ejecutar producción autorizada
→ puede consumir insumos de forma trazable
→ no recibe ajuste genérico de inventario por rol productivo
```

`AUTH-QA-012` recibe exclusivamente la responsabilidad de probar la segregación de PULSO:

```text
CAJERO
→ puede operar PULSO
→ no puede configurar PULSO
```

La tarea siguiente no debe reabrir las matrices de producción ni inventario.

---

#### 27. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos obsoletos: 0
```

La tarea certifica reglas ya registradas y no cambia el Registro Canónico de Requisitos de Prueba.

---

#### 28. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar sus filas, la cobertura vigente de:

- `TREQ-AUTH-001`, para impedir autorización por listas locales de nombres de rol;
- `TREQ-AUTH-004`, para paridad entre evaluadores;
- `TREQ-AUTH-008`, para separación de carril base y operativo y exigencia del contexto laboral aplicable;
- `TREQ-AUTH-009`, para territorio operativo derivado de contexto;
- `TREQ-AUTH-010`, que exige expresamente que producción produzca sin ajustar inventario global y preserva segregación de funciones;
- `TREQ-AUTH-013`, para validación server-side de toda mutación;
- cobertura contractual del catálogo, modalidad `BASE_AND_OPERATIONAL` y datasets materializados que mantiene separados roles, permisos y grants.

Esta sección es trazabilidad de cobertura existente y no representa una actualización de 04A.

---

#### 29. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado en la rama documental de `AUTH-QA-011` ni sometido al build canónico del plan. |
| LOCAL | NOT_EXECUTED | El checkout local todavía no ha ejecutado formateo, quality, delivery, topología, TREQ ni la batería global posterior a la inserción. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, continuidad `AUTH-QA-010 → AUTH-QA-011 → AUTH-QA-012`, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, las matrices `AUTH-RBAC-014` a `AUTH-RBAC-016`, el catálogo activo de 140 PermissionKey, el dataset operacional vigente con 16 grants por cada rol productivo —5 FOGO y 11 NEXO—, `fogo.production.batches.create` y `nexo.inventory.withdrawals.register` concedidos a los tres roles, ausencia de `nexo.inventory.adjustments.register` en esos roles, modalidad `BASE_AND_OPERATIONAL` del ajuste, componentes base restringidos y cobertura existente de `TREQ-AUTH-010`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron casos reales de producción, consumo, ajuste, turno, check-in, lote ni autorización. |
| FÍSICA | NOT_EXECUTED | No se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes, permisos, roles, datasets ni ambientes. |

---

#### 30. Criterios de aceptación

`AUTH-QA-011` queda documentalmente correcta cuando se demuestra que:

1. el universo certificado contiene exactamente `produccion_cocina`, `produccion_panaderia` y `produccion_reposteria`;
2. cada rol se evalúa con su área productiva exacta;
3. cada rol conserva dieciséis grants vigentes en el dataset observado, distribuidos en cinco FOGO y once NEXO;
4. `fogo.production.batches.create` está concedido como `DIRECT_OPERATIONAL` y `OPERATIONAL_ONLY` a los tres roles;
5. el caso positivo exige turno, check-in, área, orden, receta y recurso compatibles;
6. `nexo.inventory.withdrawals.register` permanece autorizado únicamente como consumo trazable y acotado;
7. `nexo.inventory.adjustments.register` no aparece como grant de ninguno de los tres roles productivos;
8. el ajuste conserva modalidad `BASE_AND_OPERATIONAL` y no se reduce a un solo carril;
9. los casos negativos mantienen contexto productivo válido para aislar segregación de funciones;
10. un componente base aislado no permite el ajuste cuando el rol productivo carece del componente operativo;
11. la denegación de ajuste conserva cero efectos;
12. acceso a FOGO, NEXO, dispositivo o misma sede no amplía autoridad;
13. los evaluadores aplicables conservan paridad;
14. la certificación usa catálogo y datasets vigentes;
15. no se crean ni modifican requisitos de prueba;
16. no se ejecutan cambios físicos.

---

#### 31. Límites

Esta tarea no:

- redefine las matrices completas de `produccion_cocina`, `produccion_panaderia` o `produccion_reposteria`;
- cambia sus grants vigentes;
- redefine la matriz de `gerencia_operativa`;
- concede ajustes a producción;
- elimina consumo productivo legítimo;
- convierte `withdrawals.register` en ajuste;
- crea o elimina PermissionKey;
- crea grants o denies;
- redefine el catálogo de permisos;
- define permisos futuros de estados productivos no materializados;
- certifica PULSO; pertenece a `AUTH-QA-012`;
- certifica conductor; pertenece a `AUTH-QA-013` y `AUTH-QA-014`;
- certifica compras o recepción; pertenece a `AUTH-QA-015` y `AUTH-QA-016`;
- modifica UI o navegación;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos o datasets;
- ejecuta `AUTH-QA-011::<package_id>`;
- ejecuta `AUTH-QA-011::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`.

---

#### 32. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-010 — Bodeguero puede preparar pero no producir`

**TAREA ACTUAL APROBADA**
`AUTH-QA-011 — Producción puede producir pero no ajustar inventario global`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-012 — Cajero puede operar PULSO pero no configurar`
### ✅ AUTH-QA-012 — Cajero puede operar PULSO pero no configurar

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-011 — Producción puede producir pero no ajustar inventario global
**Tarea siguiente:** AUTH-QA-013 — Conductor puede transitar sin área productiva
**Tipo de tarea:** documental; definición canónica de una prueba integral de segregación de funciones para el rol operativo `cajero_satelite`, reutilizable por paquete y certificable globalmente, para demostrar que puede ejercer las capacidades PULSO explícitamente concedidas dentro de su turno, check-in, sede, área, recurso y modalidad aplicables sin adquirir autoridad administrativa de configuración por nombre de rol, aplicación visible, dispositivo, permiso broad legacy, acceso de aplicación, componente operativo aislado o visibilidad de una superficie administrativa
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-012::<package_id>` y la certificación `AUTH-QA-012::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, check-ins, roles, permisos, pedidos, pagos, sesiones de caja, zonas, mesas, mappings, reglas de consumo, importaciones ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que el rol operativo `cajero_satelite` puede operar PULSO únicamente mediante capacidades explícitas y contexto válido, sin convertir esa autoridad operativa en administración de PULSO.

La regla positiva raíz queda:

```text
ROL OPERATIVO = cajero_satelite
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN CUANDO CORRESPONDA
+ SEDE Y ÁREA cashier COMPATIBLES
+ PermissionKey PULSO EXPLÍCITA
+ RECURSO Y ESTADO COMPATIBLES
→ OPERACIÓN PULSO AUTORIZABLE
```

Y simultáneamente:

```text
MISMO ACTOR
+ MISMO TURNO
+ MISMO CHECK-IN
+ MISMA SEDE
+ MISMA ÁREA
+ SUPERFICIE O MUTACIÓN DE CONFIGURACIÓN PULSO
→ NO EXISTE AUTORIDAD ADMINISTRATIVA POR SER cajero_satelite
```

La tarea certifica segregación de funciones. No redefine el catálogo PULSO, la matriz de cajero ni el contrato de configuración administrativa.

---

#### 2. Resultado canónico

La tarea deja definidos veintidós resultados obligatorios:

1. `cajero_satelite` se resuelve como rol operativo desde el turno válido y no desde `employees.role`, navegación, dispositivo o texto local;
2. el catálogo activo observado contiene once PermissionKey PULSO;
3. el dataset operacional vigente materializa veinte grants totales para `cajero_satelite`, distribuidos en diez NEXO y diez PULSO;
4. de los diez grants PULSO, cinco son `DIRECT_OPERATIONAL` y cinco son `OPERATIONAL_COMPONENT` de capacidades `BASE_AND_OPERATIONAL`;
5. `pulso.delivery.deliveries.override` permanece fuera del dataset operacional ordinario de `cajero_satelite`;
6. una capacidad `DIRECT_OPERATIONAL` solo puede autorizarse con contexto, territorio, recurso, estado y ausencia de denegaciones compatibles;
7. `pulso.access` habilita entrada a la aplicación y no funciona como wildcard de capacidades internas;
8. `pulso.sales.orders.create` constituye el caso positivo primario de operación ordinaria;
9. `pulso.payments.transactions.collect` constituye un control positivo independiente de cobro ordinario;
10. `pulso.cash.sessions.start` y `pulso.cash.sessions.close` se evalúan como capacidades exactas independientes y no como autoridad administrativa de terminal o configuración;
11. los cinco `OPERATIONAL_COMPONENT` sensibles no producen `ALLOW` final para un cajero que carezca del componente base compatible;
12. la existencia de diez grants PULSO no significa diez autorizaciones finales incondicionales;
13. el catálogo PULSO activo no materializa actualmente una PermissionKey administrativa genérica de configuración;
14. la tarea no inventa una PermissionKey de configuración para simular esa frontera;
15. configuración de zonas, mesas, mappings, reglas de consumo, parámetros administrativos e importaciones sensibles conserva ownership en `PULSO-AUTH-014` y su materialización propietaria;
16. `pulso.pos.main` legacy, `pulso.access`, aplicación visible, ruta visible, botón visible, `pos_satellite`, PIN, área de caja o rol de cajero no conceden configuración;
17. una mutación administrativa materializada exige capability administrativa exacta, actor, territorio, recurso, estado y demás controles de su contrato propietario;
18. un package sin capability administrativa materializada no fabrica el caso: lo registra `NOT_APPLICABLE` con evidencia y conserva la comprobación de ausencia de bypass;
19. una mutación administrativa denegada conserva cero cambios de configuración y cero efectos derivados;
20. servidor, RPC, RLS y demás superficies autoritativas aplicables conservan la misma frontera entre operación y administración;
21. la certificación usa catálogo y datasets vigentes y no snapshots históricos como autoridad runtime;
22. ninguna prueba física ni modificación de producto se ejecuta durante esta tarea documental.

---

#### 3. Base canónica consumida

La prueba consume sin redefinir:

- identidad humana efectiva;
- `AccessContext@1.x`;
- turno publicado y vigente;
- check-in activo cuando la capacidad lo exige;
- `operational_role = cajero_satelite`;
- sede operativa efectiva;
- área operativa compatible de tipo `cashier`;
- catálogo activo de PermissionKey;
- dataset de grants operativos vigente;
- modalidad `OPERATIONAL_ONLY`;
- modalidad `BASE_AND_OPERATIONAL`;
- separación entre `DIRECT_OPERATIONAL` y `OPERATIONAL_COMPONENT`;
- precedencia de permiso, territorio, recurso, estado y denegaciones;
- frontera entre operación PULSO y configuración administrativa fijada por `PULSO-AUTH-014`;
- protección server-side de acciones sensibles;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate `POST_E5_PACKAGE`.

La tarea no reabre decisiones de catálogo ni crea nuevas identidades de permiso.

---

#### 4. Universo PULSO vigente certificado

El catálogo materializado observado contiene exactamente once PermissionKey PULSO activas:

```text
pulso.access
pulso.delivery.deliveries.override
pulso.sales.orders.create
pulso.payments.transactions.collect
pulso.payments.transactions.reverse
pulso.cash.sessions.start
pulso.cash.sessions.close
pulso.sales.orders.cancel
pulso.sales.returns.create
pulso.payments.transactions.refund
pulso.sales.discounts.apply
```

Este universo sustituye, para la certificación runtime, snapshots históricos anteriores que describían menos claves o una descomposición todavía no materializada.

La prueba debe leer el catálogo vigente del package evaluado y fallar si existen duplicados, claves desconocidas o una reconciliación no explicada.

---

#### 5. Universo vigente de `cajero_satelite`

El dataset operacional materializado observado contiene veinte grants para `cajero_satelite`:

```text
10 NEXO
10 PULSO
```

Los diez PULSO son:

```text
DIRECT_OPERATIONAL
- pulso.access
- pulso.cash.sessions.close
- pulso.cash.sessions.start
- pulso.payments.transactions.collect
- pulso.sales.orders.create

OPERATIONAL_COMPONENT / BASE_AND_OPERATIONAL
- pulso.payments.transactions.refund
- pulso.payments.transactions.reverse
- pulso.sales.discounts.apply
- pulso.sales.orders.cancel
- pulso.sales.returns.create
```

No se encuentra grant operacional ordinario de:

```text
pulso.delivery.deliveries.override
```

La cardinalidad es evidencia de integridad del dataset actual, no un reemplazo de las condiciones de autorización de cada capacidad.

---

#### 6. Significado exacto de “puede operar PULSO”

En esta tarea, operar PULSO significa únicamente que una acción ordinaria puede llegar a `ALLOW` cuando existe una PermissionKey exacta concedida al actor por la modalidad aplicable y se satisfacen todos sus prerrequisitos.

No significa:

```text
abrir PULSO
→ todas las acciones PULSO
```

ni:

```text
rol = cajero_satelite
→ wildcard PULSO
```

ni:

```text
10 grants PULSO
→ 10 ALLOW finales incondicionales
```

Cada decisión conserva permiso, modalidad, resource contract, territorio y estado propios.

---

#### 7. Significado exacto de “no configurar”

“Configurar” comprende únicamente mutaciones administrativas que alteran reglas o estructuras persistentes de PULSO, entre ellas cuando existan materialmente:

- zonas;
- mesas;
- layout o numeración;
- activación o inactivación de recursos configurables;
- mappings de importación;
- reglas de consumo;
- parámetros administrativos;
- configuración sensible de importaciones o integraciones.

No se confunde configuración con:

- crear una venta;
- cobrar;
- abrir o cerrar una sesión de caja cuando la PermissionKey exacta lo permite;
- ejecutar una acción empresarial PULSO concedida explícitamente.

La frontera administrativa consume `PULSO-AUTH-014` y sus propietarios físicos; esta tarea solo la certifica para `cajero_satelite`.

---

#### 8. La ausencia actual de PermissionKey administrativa no autoriza a inventarla

El catálogo activo observado no expone una PermissionKey PULSO genérica equivalente a:

```text
pulso.configure
pulso.settings.manage
pulso.admin.configure
```

Ninguna identidad semejante puede introducirse por esta tarea.

Si un package ya materializa una capability administrativa exacta derivada de `PULSO-AUTH-014`, la prueba consume esa identidad real.

Si no la materializa, el caso de mutación administrativa se registra como `NOT_APPLICABLE` para ese package y la prueba conserva como obligaciones verificables:

1. ausencia de grant administrativo implícito para `cajero_satelite`;
2. ausencia de fallback a `pulso.pos.main`;
3. ausencia de DML o mutación libre por mera sesión, rol, dispositivo o territorio operativo.

---

#### 9. Fixture positiva primaria — creación de pedido

La fixture positiva primaria usa:

```text
operational_role = cajero_satelite
permission = pulso.sales.orders.create
modalidad = OPERATIONAL_ONLY
grant_type = DIRECT_OPERATIONAL
```

Debe resolver de forma concluyente:

- actor efectivo;
- empleado activo;
- turno publicado y vigente;
- check-in cuando el contrato vigente de la capacidad lo exige;
- sede efectiva;
- área `cashier` compatible;
- recurso de pedido dentro del territorio;
- estado inicial válido;
- columnas o transición permitidas;
- ausencia de denegación superior.

La prueba no usa una omisión de contexto para producir un falso positivo o negativo de segregación.

---

#### 10. Oracle positivo primario

Con la fixture positiva válida:

```text
pulso.sales.orders.create
→ ALLOW
```

El resultado debe demostrar simultáneamente:

- actor humano efectivo correcto;
- PermissionKey exacta;
- rol operativo correcto;
- turno y check-in aplicables;
- sede y área correctas;
- recurso y estado compatibles;
- efecto empresarial único e idempotente cuando corresponda;
- evidencia correlacionable.

El `ALLOW` no concede ninguna capacidad administrativa adicional.

---

#### 11. Controles positivos ordinarios adicionales

Cuando el package materialice los recursos correspondientes, se prueban de forma independiente:

```text
pulso.payments.transactions.collect
pulso.cash.sessions.start
pulso.cash.sessions.close
```

Cada caso usa su recurso y estado reales.

Un PASS en una capacidad no permite inferir PASS en las otras.

La prueba debe detectar si una implementación reutiliza una autorización broad para varias acciones distintas.

---

#### 12. Control de entrada de aplicación

`pulso.access` se verifica como permiso de entrada y nunca como autorización de recursos internos.

Debe cumplirse:

```text
pulso.access = ALLOW
```

cuando su contexto es válido, sin que eso implique por sí solo:

```text
orders.create
payments.collect
cash.sessions.start
cash.sessions.close
refund
reverse
discount
cancel
return
configuración administrativa
```

Toda inferencia semejante constituye fallo.

---

#### 13. Control de componentes sensibles `BASE_AND_OPERATIONAL`

Los cinco grants siguientes del cajero son únicamente componentes operativos:

```text
pulso.payments.transactions.refund
pulso.payments.transactions.reverse
pulso.sales.discounts.apply
pulso.sales.orders.cancel
pulso.sales.returns.create
```

La fixture adversarial usa un actor con contexto operativo de cajero válido pero sin componente base compatible.

El oracle exige:

```text
OPERATIONAL_COMPONENT AISLADO
→ DENY
→ CERO EFECTOS
```

La tarea no cambia qué roles base pueden aportar el componente base.

---

#### 14. Fixture negativa administrativa primaria

La fixture administrativa debe seleccionar una mutación de configuración que exista materialmente en el package evaluado y pertenezca al contrato de `PULSO-AUTH-014`.

Orden de preferencia cuando exista más de una:

1. mutación de zona o mesa;
2. mutación de mapping de importación;
3. mutación de regla de consumo;
4. otra mutación administrativa PULSO con capability exacta y owner canónico demostrables.

La fixture mantiene válido el contexto operativo del cajero para aislar segregación de funciones.

No se provoca el `DENY` retirando turno, check-in, sede o rol si esos elementos no son la frontera que se pretende comprobar.

---

#### 15. Oracle negativo administrativo

Cuando la mutación administrativa y su capability exacta existan materialmente:

```text
cajero_satelite
+ contexto operativo válido
+ mutación administrativa PULSO
+ sin autoridad administrativa exacta
→ DENY
→ CERO CAMBIO DE CONFIGURACIÓN
```

La razón observada debe ser la razón canónica realmente materializada por el package para ausencia o insuficiencia de autoridad administrativa.

Esta tarea no inventa un reason code.

Si la capability no existe materialmente, el package registra:

```text
ADMIN_CONFIG_CASE = NOT_APPLICABLE
```

con evidencia de ausencia y sin fabricar una acción sustituta.

---

#### 16. `pulso.pos.main` legacy no es bypass

Toda presencia residual de:

```text
pulso.pos.main
```

se trata como evidencia legacy broad y nunca como permiso final suficiente de configuración.

La prueba falla si una capa autoritativa utiliza `pulso.pos.main` para permitir:

- editar zonas o mesas;
- editar mappings;
- editar reglas de consumo;
- publicar o configurar importaciones por mera equivalencia broad;
- ejecutar DML administrativo sin capability exacta.

Su existencia puede ser objeto de migración o compatibilidad, pero no amplía la matriz de `cajero_satelite`.

---

#### 17. Dispositivo, UI y navegación no conceden configuración

La presencia de un dispositivo `pos_satellite`, una pantalla PULSO o una pestaña administrativa puede restringir o exponer superficies, pero no concede permisos.

Debe cumplirse:

```text
ACTOR AUTHORITY
∩ DEVICE CEILING
∩ RESOURCE/STATE
```

Nunca:

```text
DEVICE OR UI VISIBILITY
→ ADMIN AUTHORITY
```

Ocultar un control tampoco sustituye la validación server-side.

---

#### 18. Separación entre operación y configuración

Una sesión ordinaria de caja puede producir efectos empresariales operativos cuando existe permiso exacto.

Una modificación administrativa cambia reglas, estructura o interpretación futura y requiere autoridad distinta.

La prueba debe conservar:

```text
OPERATIONAL EVENT
!=
CONFIG CHANGE
```

Una auditoría no puede registrar una mutación de configuración como si fuera una venta, cobro, pedido o sesión ordinaria para ocultar su naturaleza.

---

#### 19. Territorio y configuración

Un contexto operativo válido de caja no crea alcance administrativo sobre toda la sede.

Debe fallar toda construcción equivalente a:

```text
cajero_satelite
+ ACTIVE_OPERATIONAL_SITE
→ ADMINISTRAR CONFIGURACIÓN DE LA SEDE
```

El `site_id` solicitado, la sede del dispositivo o la sede del turno solo forman parte del contexto aplicable; no sustituyen permiso administrativo ni resource scope.

---

#### 20. Paridad entre evaluadores

Para una misma combinación de:

- principal;
- actor;
- rol base;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- dispositivo;
- PermissionKey o capability administrativa;
- recurso;
- estado;
- versión contractual;

todas las superficies autoritativas aplicables deben producir decisión compatible.

Se incluyen cuando existan:

- helper compartido;
- Server Action;
- API;
- RPC;
- RLS;
- servicio propietario;
- consumidor PULSO;
- simulador o evaluador de autorización.

Una discrepancia entre capas constituye fallo aunque una UI aparente comportarse correctamente.

---

#### 21. Persistencia y cero efectos indebidos

Todo caso negativo debe demostrar que no quedó mutación parcial.

Para configuración, según el recurso materializado, se verifica ausencia de cambios en:

- identidad del recurso;
- nombre;
- número;
- layout;
- estado activo/inactivo;
- mapping;
- regla de consumo;
- parámetros administrativos;
- versión de configuración;
- efectos posteriores que dependan de esa configuración.

Si la mutación usa transacción, RPC o Server Action, la evidencia debe probar que el `DENY` ocurrió antes del efecto o que el contrato físico produjo rollback completo.

---

#### 22. Auditoría mínima

Cada decisión ejecutada debe permitir correlacionar, según aplique:

```text
principal
actor_effective
base_role
operational_role
shift_id
checkin_id
site_id
area_id
device_id
permission_or_capability
resource_type
resource_id
decision
reasons
contract_version
correlation_id
timestamp
```

Para una mutación administrativa exitosa ejecutada por otro actor autorizado en un control separado, la auditoría debe conservar además target y cambio.

La tarea no obliga a inventar un schema nuevo de auditoría.

---

#### 23. Casos mínimos obligatorios

Cada instancia aplicable debe cubrir como mínimo:

| Caso | Escenario | Resultado obligatorio |
| --- | --- | --- |
| A | `cajero_satelite` + `pulso.sales.orders.create` + contexto válido | `ALLOW` |
| B | `cajero_satelite` + `pulso.payments.transactions.collect` + contexto válido | `ALLOW` cuando el recurso esté materializado |
| C | `cajero_satelite` + `pulso.cash.sessions.start` + contexto válido | `ALLOW` cuando el recurso esté materializado |
| D | `cajero_satelite` + componente PULSO `BASE_AND_OPERATIONAL` sin componente base | `DENY`, cero efectos |
| E | `cajero_satelite` + mutación administrativa materializada sin autoridad administrativa | `DENY`, cero cambios |
| F | package sin capability administrativa materializada | `NOT_APPLICABLE` documentado; cero bypass por broad permission |
| G | `pulso.access` válido usado como sustituto de acción interna | la acción interna no obtiene `ALLOW` por `pulso.access` |
| H | `pulso.pos.main` legacy usado como autoridad de configuración | `DENY` / bypass inexistente |

Los casos B, C y E solo se ejecutan donde el package materialice sus recursos y superficies. La no aplicabilidad requiere evidencia explícita.

---

#### 24. Clasificación de fallos

Una instancia falla si ocurre cualquiera de estas condiciones:

- `cajero_satelite` obtiene autoridad por nombre de rol sin PermissionKey/capability exacta;
- `pulso.access` funciona como wildcard;
- `pulso.pos.main` funciona como wildcard de configuración;
- un componente `BASE_AND_OPERATIONAL` aislado produce `ALLOW` final;
- una mutación administrativa ocurre con autoridad exclusivamente operativa;
- UI o dispositivo amplían autoridad;
- `site_id` o área de caja crean alcance administrativo;
- un `DENY` deja cambio parcial;
- se inventa una capability para convertir `NOT_APPLICABLE` en PASS;
- evaluadores autoritativos discrepan para el mismo contexto;
- se usa un snapshot histórico incompatible con catálogo/datasets vigentes sin reconciliación;
- la evidencia no permite identificar permiso/capability, recurso y decisión.

---

#### 25. Modelo de ejecución por package

La tarea utiliza:

```text
mode = PER_PACKAGE_AND_GLOBAL_FINAL
execution_gate = POST_E5_PACKAGE
```

Para cada package aplicable existe conceptualmente:

```text
AUTH-QA-012::<package_id>
```

La instancia solo puede ejecutarse cuando el package haya satisfecho el gate físico aplicable definido por la topología.

Esta tarea documental no selecciona ningún `package_id`, no autoriza `E5-GATE-008` y no ejecuta las instancias.

---

#### 26. Aplicabilidad por package

Un package es aplicable cuando materializa al menos una de estas superficies:

- autorización PULSO del rol `cajero_satelite`;
- `pulso.sales.orders.create`;
- `pulso.payments.transactions.collect`;
- sesiones de caja;
- componente PULSO `BASE_AND_OPERATIONAL` concedido al cajero;
- configuración administrativa PULSO;
- consumidores que puedan introducir bypass por `pulso.access`, `pulso.pos.main`, dispositivo, UI, RPC o RLS.

Una instancia no puede declarar PASS sobre una superficie ausente.

Las porciones no aplicables se registran individualmente sin invalidar los casos sí materializados en el mismo package.

---

#### 27. Evidencia mínima por package

Cada instancia ejecutada deberá conservar como mínimo:

- `package_id`;
- SHA o versión del package evaluado;
- versión de catálogo de permisos;
- versión del dataset operacional;
- actor y rol efectivo de fixture;
- turno/check-in/sede/área de fixture;
- PermissionKey o capability administrativa exacta evaluada;
- recurso y estado inicial;
- decisión y razones;
- efecto observado o prueba de cero efecto;
- superficie evaluadora;
- evidencia de no aplicabilidad cuando corresponda;
- timestamps y correlación suficiente para reproducir la decisión.

Una captura de UI aislada no satisface esta evidencia.

---

#### 28. Certificación global final

`AUTH-QA-012::GLOBAL-FINAL` podrá certificarse únicamente después de reconciliar todas las instancias por package aplicables y demostrar que:

1. el universo PULSO vigente está reconciliado contra el catálogo materializado;
2. los grants de `cajero_satelite` se leen del dataset vigente y no de un snapshot obsoleto;
3. las capacidades `DIRECT_OPERATIONAL` solo autorizan dentro de su contexto exacto;
4. los componentes `BASE_AND_OPERATIONAL` no autorizan por sí solos;
5. `pulso.delivery.deliveries.override` no se adquiere por rol ordinario de cajero;
6. `pulso.access` no funciona como wildcard;
7. `pulso.pos.main` no funciona como autoridad de configuración;
8. toda capability administrativa materializada queda fuera de la autoridad ordinaria de `cajero_satelite` salvo concesión canónica explícita distinta;
9. cada package sin capability administrativa materializada registra la no aplicabilidad sin inventar una;
10. zonas, mesas, mappings, reglas de consumo u otras configuraciones materializadas no admiten mutación por mera autoridad operativa;
11. las denegaciones conservan cero efectos;
12. no existen bypasses discrepantes entre servidor, RPC, RLS, UI o dispositivo;
13. no quedan packages aplicables sin resultado concluyente.

La certificación global no crea ni modifica permisos.

---

#### 29. Handoff a `AUTH-QA-013`

`AUTH-QA-012` entrega a la tarea siguiente una frontera cerrada:

```text
CAJERO
→ puede operar PULSO mediante grants exactos
→ componentes sensibles conservan su modalidad
→ no adquiere configuración administrativa por operar PULSO
```

`AUTH-QA-013` recibe exclusivamente la responsabilidad de probar la semántica territorial del conductor:

```text
CONDUCTOR
→ puede transitar
→ no requiere área productiva para el tránsito cuando el contrato así lo define
```

La tarea siguiente no debe reabrir la matriz PULSO de cajero.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
Requisitos diferidos: 0
Requisitos obsoletos: 0
```

La tarea certifica reglas ya registradas y no cambia el Registro Canónico de Requisitos de Prueba.

---

#### 31. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar sus filas, la cobertura vigente de:

- `TREQ-AUTH-001`, para impedir autorización final por nombre local de rol;
- `TREQ-AUTH-004`, para paridad entre evaluadores;
- `TREQ-AUTH-008`, para separar autoridad operativa de autoridad base/administrativa y exigir contexto cuando corresponda;
- `TREQ-AUTH-009`, para territorio efectivo de sede y área;
- `TREQ-AUTH-010`, que exige expresamente que el cajero opere PULSO sin configurar y preserva segregación de funciones;
- `TREQ-AUTH-013`, para impedir bypass por URL, formulario, API, RPC o servidor;
- `TREQ-AUTH-015`, para evidencia correlacionable de decisiones y acciones;
- `TREQ-PULSO-004`, para mutaciones nombradas con permiso, sede, estado y columnas permitidas;
- `TREQ-PULSO-006`, para separar y auditar venta, pago, caja, descuento, anulación, devolución, reembolso y cierre;
- `TREQ-PULSO-014`, para acceso protegido de rutas de negocio;
- `TREQ-PULSO-015`, para impedir ampliación territorial mediante `site_id`;
- `TREQ-PULSO-016`, para revalidar acciones y no conceder mutaciones por mera apertura de `/orders`;
- `TREQ-PULSO-024`, para no confundir infraestructura existente con autorización completa;
- `TREQ-PULSO-026`, para no adoptar `pulso.pos.main` como suficiencia contractual;
- `TREQ-PULSO-027`, para preservar ownership y fronteras entre aplicaciones.

Esta sección es trazabilidad de cobertura existente y no representa una actualización de 04A.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto todavía no ha sido insertado en la rama documental de `AUTH-QA-012` ni sometido al build canónico del plan. |
| LOCAL | NOT_EXECUTED | El checkout local todavía no ha ejecutado formateo, quality, delivery, topología, TREQ ni la batería global posterior a la inserción. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, continuidad `AUTH-QA-011 → AUTH-QA-012 → AUTH-QA-013`, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `AUTH-RBAC-008`, `PULSO-AUTH-006`, `PULSO-AUTH-014`, el catálogo PULSO activo con once PermissionKey, el dataset operacional vigente con veinte grants de `cajero_satelite` —diez NEXO y diez PULSO—, cinco grants PULSO `DIRECT_OPERATIONAL`, cinco componentes PULSO `BASE_AND_OPERATIONAL`, ausencia de grant ordinario de `pulso.delivery.deliveries.override` y cobertura existente de `TREQ-AUTH-010`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron ventas, cobros, sesiones de caja, cancelaciones, refunds, configuración, mappings, zonas, mesas, reglas de consumo ni autorización real. |
| FÍSICA | NOT_EXECUTED | No se modificó ni ejecutó Supabase, aplicaciones, datos, paquetes, permisos, roles, datasets ni ambientes. |

---

#### 33. Criterios de aceptación

`AUTH-QA-012` queda documentalmente correcta cuando se demuestra que:

1. el actor primario es `cajero_satelite` resuelto desde turno válido;
2. el universo activo observado contiene once PermissionKey PULSO;
3. el dataset actual contiene veinte grants de cajero, diez NEXO y diez PULSO;
4. los diez PULSO se distinguen entre cinco `DIRECT_OPERATIONAL` y cinco `OPERATIONAL_COMPONENT`;
5. `pulso.sales.orders.create` constituye el caso positivo primario;
6. `pulso.payments.transactions.collect` y sesiones de caja conservan decisiones independientes;
7. `pulso.access` no funciona como wildcard;
8. los componentes `BASE_AND_OPERATIONAL` aislados no producen `ALLOW` final;
9. `pulso.delivery.deliveries.override` permanece fuera del grant ordinario de cajero;
10. la ausencia de PermissionKey administrativa genérica no se corrige inventando una;
11. una capability administrativa materializada se deniega al cajero salvo concesión canónica explícita distinta;
12. packages sin capability administrativa materializada registran `NOT_APPLICABLE` con evidencia;
13. `pulso.pos.main` legacy no autoriza configuración;
14. UI, dispositivo, PIN, sede o área no amplían autoridad administrativa;
15. un caso negativo conserva cero cambios de configuración;
16. los evaluadores aplicables mantienen paridad;
17. la certificación usa catálogo y datasets vigentes;
18. no se crean ni modifican requisitos de prueba;
19. no se ejecutan cambios físicos.

---

#### 34. Límites

Esta tarea no:

- redefine `AUTH-RBAC-008`;
- redefine `PULSO-AUTH-006`;
- redefine `PULSO-AUTH-014`;
- crea PermissionKey administrativas PULSO;
- elimina PermissionKey vigentes;
- crea grants o denies;
- cambia los veinte grants observados de `cajero_satelite`;
- convierte componentes `BASE_AND_OPERATIONAL` en grants finales;
- concede `pulso.delivery.deliveries.override` al cajero;
- reintroduce `pulso.pos.main` como autoridad canónica broad;
- define la configuración física final de zonas, mesas, mappings, reglas de consumo o importaciones;
- modifica UI o navegación;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos o datasets;
- certifica conductor; pertenece a `AUTH-QA-013` y `AUTH-QA-014`;
- certifica compras o recepción; pertenece a `AUTH-QA-015` y `AUTH-QA-016`;
- ejecuta `AUTH-QA-012::<package_id>`;
- ejecuta `AUTH-QA-012::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-011 — Producción puede producir pero no ajustar inventario global`

**TAREA ACTUAL APROBADA**
`AUTH-QA-012 — Cajero puede operar PULSO pero no configurar`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-013 — Conductor puede transitar sin área productiva`
### ✅ AUTH-QA-013 — Conductor puede transitar sin área productiva

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-012 — Cajero puede operar PULSO pero no configurar
**Tarea siguiente:** AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización territorial y funcional para el rol operativo `conductor_logistica`, reutilizable por paquete y certificable globalmente, para demostrar que puede ejercer tránsito y custodia logística sobre recursos asignados sin exigir un área productiva interna, sin convertir la ausencia de área en alcance global y sin adquirir autoridad productiva, de inventario general o basada en PermissionKey legacy
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-013::<package_id>` y la certificación `AUTH-QA-013::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, check-ins, roles, permisos, rutas, vehículos, journeys, shipments, remisiones, custodia, tránsito, entregas, producción, inventario ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que `conductor_logistica` es un rol operativo de nivel sede, ruta, vehículo y recurso asignado, no un rol productivo dependiente de un área interna.

La regla positiva raíz queda:

```text
ACTOR HUMANO IDENTIFICADO
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN ACTIVO CUANDO APLIQUE
+ ROL OPERATIVO = conductor_logistica
+ SEDE OPERATIVA AUTORIZADA
+ active_area_id = AUSENTE
+ ASIGNACIÓN LOGÍSTICA VIGENTE
+ RUTA / VEHÍCULO / JOURNEY COMPATIBLES
+ REMISIÓN / SHIPMENT RELACIONADO
+ CUSTODIA PREVIA VIGENTE
+ PERMISO EXACTO nexo.inventory.remissions.start_transit
+ ESTADO Y VERSIÓN ADMISIBLES
→ TRANSIT_STARTED AUTORIZABLE
```

La ausencia de un área productiva interna no es una excepción ni un bypass. Es una forma válida de contexto para un rol logístico cuya autoridad se resuelve por sede, asignación y recurso.

---

#### 2. Resultado canónico

La tarea deja definidos veinticuatro resultados obligatorios:

1. `conductor_logistica` se resuelve como rol operativo desde el turno vigente y no desde el rol base legacy `conductor`;
2. el dataset materializado vigente contiene exactamente dieciséis grants para `conductor_logistica`;
3. los dieciséis grants vigentes pertenecen a NEXO;
4. `nexo.inventory.remissions.start_transit` es una PermissionKey activa y concedida al conductor;
5. `nexo.inventory.remissions.accept_custody` es una PermissionKey activa y concedida, pero aceptar custodia no inicia tránsito;
6. `nexo.inventory.remissions.deliver` es una PermissionKey activa y concedida, pero registrar el handoff físico no confirma recepción;
7. `nexo.inventory.remissions.view` conserva lectura acotada a remisiones relacionadas con el actor, ruta o vehículo;
8. las capacidades logísticas de lectura vigentes permanecen limitadas a trabajo asignado y no al tablero global;
9. `conductor_logistica` puede operar con `active_area_id` ausente cuando el permiso, rol y recurso admiten contexto logístico de nivel sede/ruta;
10. la ausencia de área no se interpreta como todas las áreas;
11. la ausencia de área no concede producción, bodega, inventario general, configuración ni autoridad administrativa;
12. no se fabrica un área productiva para satisfacer artificialmente la autorización del tránsito;
13. un `area_id` enviado por cliente no crea autoridad ni sustituye sede, asignación, ruta, vehículo, journey o custodia;
14. una ruta no asignada produce `DENY` aunque turno, check-in y PermissionKey sean válidos;
15. un recurso no relacionado con la custodia del actor produce `DENY`;
16. una custodia ausente o incompatible bloquea `start_transit`;
17. una versión o estado previo incompatible bloquea el inicio;
18. `nexo.access` no funciona como wildcard logístico;
19. vehículo, dispositivo, PIN, geolocalización o proximidad física no conceden PermissionKey;
20. `nexo.inventory.remissions.dispatch`, `nexo.inventory.remissions.transit` y `nexo.transit.view` no pertenecen al conjunto activo y no autorizan runtime;
21. tránsito no produce efectos nuevos de inventario, preparación o recepción en destino;
22. servidor, RPC, RLS y demás evaluadores aplicables conservan decisión equivalente para el mismo contexto;
23. no se crean ni modifican requisitos de prueba;
24. no se ejecuta ningún cambio físico durante esta tarea documental.

---

#### 3. Autoridad contractual vigente

La prueba consume como autoridad actual:

- catálogo activo congelado de 140 PermissionKey;
- dataset `vento.authorization.operational-role-grants@1.0.0`;
- reconciliación vinculante de `AUTH-RBAC-018` posterior a `AUTH-CAT-022` a `AUTH-CAT-025`;
- contrato de tránsito `NEXO-AUTH-009`;
- modelo de contexto y alcance vigente;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate `POST_E5_PACKAGE`.

El snapshot histórico de 112 permisos y catorce concesiones de `AUTH-RBAC-018` se conserva como lineage, pero no determina autorización runtime.

---

#### 4. Dataset vigente de conductor

El dataset materializado vigente contiene exactamente dieciséis grants para `conductor_logistica`:

```text
nexo.access
nexo.catalog.presentations.view
nexo.catalog.products.view
nexo.catalog.units.view
nexo.inventory.lpns.view
nexo.inventory.movements.view
nexo.inventory.remissions.accept_custody
nexo.inventory.remissions.deliver
nexo.inventory.remissions.start_transit
nexo.inventory.remissions.view
nexo.logistics.driver_operations.view
nexo.logistics.fulfillment.view
nexo.logistics.fulfillment_routes.view
nexo.logistics.operations.view
nexo.logistics.operations_board.view
nexo.logistics.supply_routes.view
```

La certificación usa esta lista vigente. No restaura las claves legacy retiradas.

---

#### 5. Frontera de área

La autoridad del conductor se resuelve mediante un contexto logístico de nivel sede y recurso.

La prueba debe demostrar:

```text
active_area_id = null
!=
contexto inválido por definición
```

para una acción logística compatible con `conductor_logistica`.

También debe demostrar simultáneamente:

```text
active_area_id = null
!=
todas las áreas
```

La ausencia de área significa que esa dimensión interna no es requerida para el rol y recurso de la prueba. No significa wildcard territorial.

---

#### 6. Área productiva no se fabrica

Un conductor no necesita ser adscrito artificialmente a Cocina, Panadería, Repostería, Bodega u otra área productiva para iniciar tránsito.

Queda prohibido resolver el caso positivo mediante:

```text
conductor_logistica
+ active_area_id = AREA_PRODUCTIVA_FICTICIA
→ ALLOW
```

La prueba positiva debe conservar `active_area_id` ausente y demostrar que la autoridad proviene de:

- rol operativo;
- turno y check-in aplicables;
- sede;
- asignación;
- ruta o journey;
- vehículo cuando aplique;
- shipment/remisión;
- custodia;
- PermissionKey exacta;
- estado y versión.

---

#### 7. PermissionKey positiva principal

La capacidad positiva principal de esta tarea es:

```text
nexo.inventory.remissions.start_transit
```

Su uso exige una remisión o shipment ya admitido por la frontera anterior de despacho/custodia.

El caso positivo no puede sustituirse por:

```text
nexo.inventory.remissions.dispatch
nexo.inventory.remissions.transit
nexo.transit.view
```

porque esas claves no pertenecen al conjunto activo vigente.

---

#### 8. Handoff de entrada obligatorio

Antes de `start_transit`, el fixture debe disponer de un handoff válido que demuestre, según el contrato materializado del package:

- shipment o remisión identificable;
- versión esperada;
- origen y destino;
- estado previo admisible;
- custodia aceptada;
- actor asignado;
- ruta o journey vigente;
- vehículo compatible cuando aplique;
- bultos, LPN o sellos requeridos por el recurso;
- ausencia de bloqueo incompatible.

La prueba no puede fabricar el handoff dentro del mismo paso para ocultar una frontera faltante.

---

#### 9. Oracle positivo de tránsito

Con fixture válido y `active_area_id` ausente, el oracle esperado es:

```text
DECISION = ALLOW
PERMISSION = nexo.inventory.remissions.start_transit
ROLE = conductor_logistica
ACTIVE_AREA = ABSENT
RESOURCE_RELATION = ASSIGNED
CUSTODY = VALID
```

El efecto permitido se limita al inicio idempotente y versionado del tránsito conforme al contrato del package.

La evidencia debe demostrar que el `ALLOW` no depende de un área productiva inyectada.

---

#### 10. Control positivo de lectura logística

La certificación debe incluir al menos una capacidad de lectura logística vigente compatible con contexto sin área interna, por ejemplo una ruta asignada mediante:

```text
nexo.logistics.fulfillment_routes.view
```

El resultado puede ser `ALLOW` únicamente sobre rutas relacionadas con la jornada y asignación del conductor.

No autoriza modificar secuencia, ventanas, destinos, conductor o vehículo.

---

#### 11. Control negativo de ruta no asignada

Con el mismo actor, turno, check-in, sede y PermissionKey, cambiar exclusivamente el recurso a una ruta o journey no asignado debe producir:

```text
DENY
```

La ausencia de área no puede ampliar la relación con recursos.

La prueba debe conservar cero efectos.

---

#### 12. Control negativo de custodia

Con actor y asignación válidos, intentar `start_transit` sin custodia previa válida debe producir:

```text
DENY
```

El caso debe distinguir:

```text
NO_AREA
```

de:

```text
NO_CUSTODY
```

para impedir que una causa logística se reporte falsamente como ausencia de área.

---

#### 13. Control negativo de estado o versión

Una remisión o shipment con:

- estado previo incompatible;
- versión obsoleta;
- handoff contradictorio;
- tránsito ya iniciado con otra versión;

debe producir `DENY` o conflicto fail-closed según el contrato exacto del comando.

Ningún caso puede forzar éxito agregando un área al contexto.

---

#### 14. Control negativo productivo

El mismo conductor, incluso dentro de una sede que contenga áreas productivas, no adquiere por ello autoridad FOGO.

Debe demostrarse al menos que una capacidad productiva exacta, cuando forme parte del package probado, no recibe `ALLOW` desde `conductor_logistica`.

La causa no puede maquillarse como ausencia de área. La frontera es de permiso/rol/recurso.

Esta tarea no redefine las matrices FOGO.

---

#### 15. Área enviada por cliente no autoriza

Un `area_id` enviado por URL, formulario, payload, estado local o dispositivo es una referencia no confiable.

La prueba debe demostrar que:

```text
CLIENT_AREA = PRODUCTIVE_AREA
```

no convierte al conductor en productor ni amplía la ruta autorizada.

El servidor debe resolver nuevamente el contexto y el recurso.

---

#### 16. `nexo.access` no es wildcard

`nexo.access` permite entrada a NEXO dentro de su contrato.

No significa:

```text
nexo.access
→ start_transit
→ deliver
→ receive
→ prepare
→ inventario general
```

Cada acción protegida usa su PermissionKey exacta y sus relaciones de recurso.

---

#### 17. Códigos legacy bloqueados

La certificación debe comprobar que los siguientes códigos no autorizan runtime:

```text
nexo.inventory.remissions.dispatch
nexo.inventory.remissions.transit
nexo.transit.view
```

No se acepta:

- alias uno-a-muchos;
- traducción silenciosa;
- fallback;
- coincidencia por sufijo;
- permiso por prefijo;
- uso como compatibilidad autorizante.

Si una superficie legacy todavía los consume, la prueba física correspondiente debe fallar hasta que el package propietario converja.

---

#### 18. Dispositivo y vehículo

Un `logistics_vehicle_terminal`, vehículo asignado, PIN, etiqueta, sesión técnica o geolocalización puede restringir o describir contexto, pero nunca añadir permisos.

La autoridad efectiva permanece:

```text
AUTORIDAD DEL ACTOR
∩
LÍMITES DEL DISPOSITIVO
∩
RELACIÓN CON RECURSO
```

Nunca la unión.

---

#### 19. Geolocalización no concede tránsito

Una coordenada, geocerca o proximidad al origen/destino es evidencia auxiliar.

No puede por sí sola:

- iniciar tránsito;
- aceptar custodia;
- transferir custodia;
- registrar entrega;
- ampliar sede;
- crear un área;
- confirmar recepción.

---

#### 20. Cero efectos de inventario

`TRANSIT_STARTED` no puede volver a:

- descontar stock;
- modificar cantidades preparadas;
- crear una entrada en destino;
- registrar recepción;
- rehacer preparación;
- consumir producción;
- ajustar diferencias.

La prueba debe comprobar ausencia de esos efectos cuando el package materialice persistencia relacionada.

---

#### 21. Frontera con `AUTH-QA-014`

Esta tarea certifica principalmente que el conductor puede transitar sin área productiva y que esa ausencia no amplía autoridad.

`AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general` conserva la certificación específica y exhaustiva de:

- preparación;
- recepción;
- inventario general;
- límites adicionales del conductor frente a extremos de la remisión.

`AUTH-QA-013` puede verificar que `start_transit` no auto-recibe ni auto-prepara como invariante del comando, pero no absorbe la matriz negativa completa de `AUTH-QA-014`.

---

#### 22. Paridad de evaluadores

Para los mismos:

- principal;
- actor efectivo;
- rol operativo;
- turno;
- check-in;
- sede;
- área ausente;
- PermissionKey;
- ruta/journey;
- vehículo;
- shipment/remisión;
- custodia;
- estado;
- versión;

todos los evaluadores aplicables deben producir la misma decisión y razones equivalentes.

No se admite que UI permita, servidor deniegue o RLS expanda el recurso por interpretar `area_id = null` de manera diferente.

---

#### 23. Auditoría

La evidencia de cada caso debe permitir reconstruir como mínimo:

- package e identidad de ejecución;
- principal;
- actor efectivo;
- rol base y operativo cuando estén disponibles;
- turno;
- check-in;
- sede;
- área ausente o valor observado;
- dispositivo cuando aplique;
- PermissionKey;
- ruta/journey;
- vehículo;
- shipment/remisión;
- custodia;
- estado y versión;
- decisión;
- razones;
- efecto o cero efecto;
- versión contractual;
- timestamp.

La auditoría no sustituye la autorización previa.

---

#### 24. Casos mínimos obligatorios por package

| Caso | Área | Condición diferencial | Resultado esperado |
| --- | --- | --- | --- |
| `AUTH-QA-013-A` | ausente | `start_transit`, ruta asignada, custodia válida | `ALLOW` |
| `AUTH-QA-013-B` | ausente | ruta/journey no asignado | `DENY`, cero efecto |
| `AUTH-QA-013-C` | ausente | custodia ausente/incompatible | `DENY`, cero efecto |
| `AUTH-QA-013-D` | ausente | estado o versión incompatible | `DENY` o conflicto fail-closed, cero efecto |
| `AUTH-QA-013-E` | ausente | lectura de ruta asignada | `ALLOW` limitado al recurso |
| `AUTH-QA-013-F` | ausente | PermissionKey legacy `dispatch`, `transit` o `transit.view` | `DENY`, cero efecto |
| `AUTH-QA-013-G` | productiva enviada por cliente | intenta ampliar autoridad del conductor | `DENY` para la ampliación, cero efecto |
| `AUTH-QA-013-H` | ausente | capacidad productiva cuando esté materialmente presente en el package | `DENY`, cero efecto |

Si una capacidad necesaria para un caso condicional no existe materialmente en el package, se registra `NOT_APPLICABLE` con evidencia. No se inventa una superficie para forzar ejecución.

---

#### 25. Clasificación de fallos

Un fallo de `AUTH-QA-013` se clasifica por la frontera rota:

- `AREA_REQUIRED_INCORRECTLY` — tránsito legítimo bloqueado solo por ausencia de área;
- `NULL_AREA_EXPANDS_SCOPE` — ausencia de área interpretada como global;
- `RESOURCE_RELATION_BYPASS` — ruta/journey/remisión ajena autorizada;
- `CUSTODY_BYPASS` — tránsito iniciado sin custodia válida;
- `STATE_VERSION_BYPASS` — estado o versión incompatible aceptados;
- `LEGACY_PERMISSION_BYPASS` — clave retirada autoriza runtime;
- `PRODUCTIVE_SCOPE_ESCALATION` — área o sede productiva convierte al conductor en productor;
- `DEVICE_OR_VEHICLE_GRANT` — dispositivo o vehículo añade permisos;
- `INVENTORY_SIDE_EFFECT` — tránsito produce efecto de inventario impropio;
- `EVALUATOR_DIVERGENCE` — capas aplicables producen decisiones incompatibles;
- `AUDIT_GAP` — no puede reconstruirse la decisión o el efecto.

La clasificación no crea nuevos reason codes públicos ni modifica contratos de error.

---

#### 26. Modelo de ejecución por paquete

Cada package que materialice superficies afectadas ejecutará:

```text
AUTH-QA-013::<package_id>
```

únicamente después de que:

- el package aplicable exista;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias físicas aplicables estén disponibles;
- la instancia se encuentre autorizada conforme al lifecycle físico correspondiente.

Esta tarea documental no selecciona package ni abre una instancia física.

---

#### 27. Certificación global final

La certificación:

```text
AUTH-QA-013::GLOBAL-FINAL
```

consolida evidencia de packages aplicables y demuestra que la semántica de área ausente para el conductor es uniforme entre consumidores.

Debe fallar si existe al menos un consumidor aplicable donde:

- se exija área productiva indebidamente para tránsito válido;
- `null` amplíe autoridad;
- una PermissionKey legacy autorice runtime;
- una ruta ajena resulte visible o mutable;
- tránsito produzca efectos de inventario reservados a otra etapa.

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por requisitos existentes y no introduce una obligación verificable nueva.

---

#### 29. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AUTH-001` — autorización final por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-004` — paridad entre evaluadores;
- `TREQ-AUTH-008` — separación de carril administrativo y operacional;
- `TREQ-AUTH-009` — resolución territorial determinista;
- `TREQ-AUTH-010` — segregación de funciones, incluyendo conductor que transita sin facultades productivas o de recepción general;
- `TREQ-AUTH-013` — imposibilidad de bypass por cliente, API o RPC;
- `TREQ-AUTH-015` — evidencia correlacionable de decisión y acción;
- `TREQ-NEXO-009` — jerarquía única y reutilizable para capacidades de remisiones;
- `TREQ-NEXO-016` — separación logística de ruta, viaje, conductor, carga, custodia, entrega y recepción;
- `TREQ-NEXO-121` a `TREQ-NEXO-132` — contrato de tránsito, revalidación, handoff, journey, idempotencia, custodia, incidentes, retorno, entrega y convergencia física ya registrados por `NEXO-AUTH-009`.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no fue incorporado todavía al checkout del usuario; la batería global se ejecutará después del reemplazo. |
| LOCAL | NOT_EXECUTED | No se ejecutaron formateo, quality, delivery, topología, TREQ ni `git diff --check` sobre el owner modificado. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `AUTH-RBAC-018` reconciliada, catálogo activo de 140 PermissionKey, dieciséis grants vigentes de `conductor_logistica`, las claves activas `accept_custody`, `start_transit` y `deliver`, exclusión runtime de `dispatch`, `transit` y `transit.view`, el contrato vigente `NEXO-AUTH-009` y cobertura existente del Registro 04A. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron casos reales de ruta, custodia, tránsito, journey, shipment, vehículo, área, producción, entrega ni autorización. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-013::<package_id>` ni `AUTH-QA-013::GLOBAL-FINAL`; ambas identidades permanecen sujetas a su lifecycle y gate físico. |

---

#### 31. Criterios de aceptación

- [ ] `conductor_logistica` consume exactamente dieciséis grants vigentes del dataset actual.
- [ ] La prueba no usa como autoridad el snapshot histórico de catorce grants.
- [ ] `nexo.inventory.remissions.start_transit` es la PermissionKey positiva principal.
- [ ] `active_area_id` ausente no bloquea por sí solo el tránsito válido del conductor.
- [ ] `active_area_id` ausente nunca significa todas las áreas.
- [ ] La prueba positiva no fabrica un área productiva.
- [ ] La autoridad se limita a sede, asignación, ruta/journey, vehículo, recurso y custodia compatibles.
- [ ] Una ruta no asignada produce `DENY`.
- [ ] Custodia ausente produce `DENY`.
- [ ] Estado o versión incompatibles fallan cerrado.
- [ ] `nexo.access` no amplía autoridad interna.
- [ ] `dispatch`, `transit` y `transit.view` no autorizan runtime.
- [ ] Un área productiva enviada por cliente no convierte al conductor en productor.
- [ ] Dispositivo, vehículo, PIN y geolocalización no conceden permisos.
- [ ] Tránsito no reproduce efectos de inventario, preparación o recepción.
- [ ] `AUTH-QA-014` conserva la certificación específica de preparación, recepción e inventario general.
- [ ] Los evaluadores aplicables conservan decisión equivalente.
- [ ] Toda denegación demuestra cero efectos.
- [ ] La evidencia conserva actor, contexto, recurso, PermissionKey, decisión, versión y resultado.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 32. Límites

Esta tarea no:

- redefine `AUTH-RBAC-018`;
- cambia los dieciséis grants vigentes del conductor;
- restaura los códigos legacy retirados;
- crea PermissionKey;
- crea grants, denies, aliases o fallbacks;
- redefine el modelo global de áreas;
- convierte `active_area_id = null` en regla universal para otros roles;
- redefine áreas productivas;
- redefine producción FOGO;
- redefine preparación o recepción de remisiones;
- certifica exhaustivamente que el conductor no prepara ni recibe inventario general, reservado a `AUTH-QA-014`;
- implementa journeys, shipments, rutas, vehículos, custodia o geolocalización;
- modifica UI o navegación;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos o datasets;
- ejecuta `NEXO-AUTH-009::<implementation_unit_id>`;
- ejecuta `AUTH-QA-013::<package_id>`;
- ejecuta `AUTH-QA-013::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- modifica el Registro 04A.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-012 — Cajero puede operar PULSO pero no configurar`

**TAREA ACTUAL APROBADA**
`AUTH-QA-013 — Conductor puede transitar sin área productiva`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general`
### ✅ AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-013 — Conductor puede transitar sin área productiva
**Tarea siguiente:** AUTH-QA-015 — Compras puede crear órdenes según alcance
**Tipo de tarea:** documental; definición canónica de una prueba integral de segregación de funciones para el rol operativo `conductor_logistica`, reutilizable por paquete y certificable globalmente, para demostrar que las capacidades logísticas de custodia, tránsito, lectura acotada y entrega física no conceden preparación de remisiones, recepción por el destino ni autoridad sobre inventario general, incluso con turno, check-in, sede, ruta, vehículo, remisión y custodia válidos
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-014::<package_id>` y la certificación `AUTH-QA-014::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra paquetes, aplicaciones, Supabase, datos, turnos, check-ins, roles, permisos, rutas, vehículos, journeys, shipments, remisiones, custodia, inventario, preparación, recepción, diferencias, conteos, movimientos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que `conductor_logistica` conserva una frontera estricta entre transporte/custodia y las responsabilidades de preparación, recepción e inventario general.

La regla negativa raíz queda:

```text
ACTOR HUMANO IDENTIFICADO
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN ACTIVO CUANDO APLIQUE
+ ROL OPERATIVO = conductor_logistica
+ SEDE OPERATIVA AUTORIZADA
+ ASIGNACIÓN LOGÍSTICA VIGENTE
+ RUTA / VEHÍCULO / JOURNEY COMPATIBLES
+ REMISIÓN / SHIPMENT RELACIONADO
+ CUSTODIA VÁLIDA CUANDO APLIQUE
+ INTENTO DE PREPARAR, RECIBIR O ADMINISTRAR INVENTARIO GENERAL
→ DENY / NO EXPOSURE
→ CERO EFECTOS
```

La existencia de contexto logístico válido no amplía el conjunto de capacidades del conductor.

---

#### 2. Resultado canónico

La tarea deja definidos veintiocho resultados obligatorios:

1. `conductor_logistica` se resuelve como rol operativo vigente y no desde el rol base legacy `conductor`;
2. el dataset materializado vigente contiene exactamente dieciséis grants para `conductor_logistica`;
3. los dieciséis grants vigentes pertenecen a NEXO;
4. `nexo.inventory.remissions.accept_custody`, `nexo.inventory.remissions.start_transit` y `nexo.inventory.remissions.deliver` son las mutaciones atómicas de remisión concedidas al conductor;
5. `nexo.inventory.remissions.prepare` no pertenece al conjunto de grants del conductor;
6. `nexo.inventory.remissions.receive` no pertenece al conjunto de grants del conductor;
7. aceptar custodia no concede preparación ni edición de cantidades;
8. iniciar tránsito no concede preparación, recepción, ajuste ni entrada de inventario;
9. registrar entrega física no ejecuta recepción por el destino;
10. entregar físicamente no crea por sí solo inventario en destino;
11. la visibilidad de una remisión no concede capacidad para preparar, recibir, cancelar ni editar libremente la remisión;
12. la visibilidad de LPN se limita a bultos o contenedores relacionados con la carga autorizada;
13. la visibilidad de movimientos se limita a eventos relacionados con la cadena de custodia autorizada;
14. una PermissionKey de lectura logística concedida no se transforma en autoridad de inventario general;
15. stock general, ubicaciones internas, entradas, traslados, conteos, ajustes y operaciones de bodega requieren sus capacidades y relaciones propietarias;
16. un recurso ajeno a la asignación del conductor nunca queda expuesto por pertenecer a la misma sede, ruta o fecha;
17. `active_area_id` ausente no concede inventario general ni autoridad de bodega;
18. un `area_id` enviado por cliente no convierte al conductor en bodeguero o receptor;
19. `nexo.access` no funciona como wildcard de inventario;
20. vehículo, dispositivo, PIN, geolocalización, check-in o proximidad física no añaden PermissionKey;
21. una entrega con diferencias no autoriza al conductor a corregir cantidades ni resolver la diferencia;
22. una incidencia no autoriza ajustes, cancelaciones, recepciones ni movimientos generales de inventario;
23. todo intento prohibido conserva cero efectos empresariales;
24. servidor, RPC, RLS y demás evaluadores aplicables conservan una decisión equivalente para el mismo contexto;
25. `AUTH-QA-013` conserva la certificación positiva de tránsito sin área productiva y esta tarea no la duplica;
26. la certificación por package prueba las fronteras solo sobre superficies materialmente presentes;
27. no se crean ni modifican requisitos de prueba;
28. no se ejecuta ningún cambio físico durante esta tarea documental.

---

#### 3. Autoridad contractual vigente

La prueba consume como autoridad actual:

- catálogo activo congelado de 140 PermissionKey;
- dataset `vento.authorization.operational-role-grants@1.0.0`;
- reconciliación vinculante de `AUTH-RBAC-018` posterior a `AUTH-CAT-022` a `AUTH-CAT-025`;
- contrato de autorización de remisiones y logística vigente;
- modelo de contexto, recurso y alcance vigente;
- separación entre preparación, custodia, tránsito, entrega física y recepción;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate `POST_E5_PACKAGE`.

El snapshot histórico de 112 permisos y catorce concesiones de `AUTH-RBAC-018` se conserva como lineage, pero no determina autorización runtime.

---

#### 4. Dataset vigente de conductor

El dataset materializado vigente contiene exactamente dieciséis grants para `conductor_logistica`:

```text
nexo.access
nexo.catalog.presentations.view
nexo.catalog.products.view
nexo.catalog.units.view
nexo.inventory.lpns.view
nexo.inventory.movements.view
nexo.inventory.remissions.accept_custody
nexo.inventory.remissions.deliver
nexo.inventory.remissions.start_transit
nexo.inventory.remissions.view
nexo.logistics.driver_operations.view
nexo.logistics.fulfillment.view
nexo.logistics.fulfillment_routes.view
nexo.logistics.operations.view
nexo.logistics.operations_board.view
nexo.logistics.supply_routes.view
```

La prueba usa esta lista como universo positivo del rol. Toda capacidad no concedida permanece denegada salvo que otro carril de autoridad válido y explícito la conceda de acuerdo con su contrato; esta tarea no crea ese carril.

---

#### 5. Frontera de segregación de funciones

El conductor transporta y conserva custodia logística. No sustituye al actor de origen que prepara ni al actor de destino que recibe.

La frontera queda:

```text
PREPARACIÓN
→ actor de origen autorizado

CUSTODIA / TRÁNSITO / ENTREGA FÍSICA
→ conductor_logistica dentro de su asignación

RECEPCIÓN
→ actor autorizado del destino
```

Compartir la misma remisión no fusiona responsabilidades.

---

#### 6. Preparación permanece bloqueada

`conductor_logistica` no recibe autoridad para:

- reservar cantidades;
- alistar líneas;
- sustituir productos;
- modificar cantidades preparadas;
- registrar faltantes como decisión del origen;
- definir empaque;
- declarar una remisión lista para transporte;
- reabrir o rehacer preparación.

La capacidad contractual exacta es:

```text
nexo.inventory.remissions.prepare
```

No está incluida entre los dieciséis grants del conductor.

Con un conductor plenamente válido y una remisión asignada, intentar esa capacidad debe producir `DENY` y cero efectos.

---

#### 7. Aceptar custodia no equivale a preparar

La capacidad:

```text
nexo.inventory.remissions.accept_custody
```

permite al conductor aceptar custodia de una carga ya preparada y compatible con el manifiesto.

No permite:

- modificar líneas;
- recalcular cantidades;
- sustituir productos;
- completar faltantes;
- cambiar la preparación;
- corregir diferencias del origen.

Si el manifiesto no coincide, la aceptación de custodia debe bloquearse o registrarse conforme al contrato de excepción aplicable. Nunca debe corregirse la carga mediante autoridad del conductor.

---

#### 8. Recepción permanece bloqueada

`conductor_logistica` no recibe autoridad para confirmar por el destino:

- cantidades recibidas;
- producto recibido;
- condición final;
- faltantes o sobrantes como resolución;
- diferencias de recepción;
- aceptación final de la remisión;
- entrada resultante al inventario del destino.

La capacidad contractual exacta es:

```text
nexo.inventory.remissions.receive
```

Permanece separada y pertenece al actor receptor autorizado del destino.

---

#### 9. Entrega física no equivale a recepción

La capacidad:

```text
nexo.inventory.remissions.deliver
```

registra el handoff físico del conductor al receptor previsto.

El oracle obligatorio es:

```text
DELIVER = ALLOW
RECEIVE = NOT_EXECUTED_BY_DRIVER
DESTINATION_INVENTORY_EFFECT = NONE_FROM_DELIVER_ALONE
```

Firma, fotografía, código, geolocalización u otra evidencia de entrega no sustituye la autorización de recepción.

---

#### 10. Inicio de tránsito no concede inventario

La capacidad:

```text
nexo.inventory.remissions.start_transit
```

solo inicia la fase de tránsito después de custodia válida.

No autoriza:

- reservar o preparar stock;
- registrar entradas;
- crear traslados internos;
- confirmar recepción;
- cerrar diferencias;
- realizar conteos;
- aprobar ajustes;
- cambiar cantidades del manifiesto.

---

#### 11. Inventario general permanece fuera del rol

La certificación debe demostrar que el conductor no adquiere por contexto logístico acceso general a:

- stock de la sede;
- ubicaciones internas de bodega;
- asignaciones de ubicación;
- entradas de inventario;
- traslados internos;
- conteos y diferencias;
- ajustes;
- operaciones generales de bodega;
- recursos de otras remisiones o custodias.

Cuando una superficie o PermissionKey correspondiente exista materialmente en el package, la ausencia de autoridad del conductor debe observarse como `DENY`, exclusión de la proyección autorizada o `NOT_APPLICABLE` cuando la superficie no esté materializada.

---

#### 12. Lectura de LPN no es lectura global

`nexo.inventory.lpns.view` está concedida al conductor, pero su alcance queda restringido a LPN, bultos o contenedores relacionados con la carga asignada y la custodia vigente.

Debe demostrarse:

```text
LPN RELACIONADO
→ VISIBLE DENTRO DE LA PROYECCIÓN AUTORIZADA

LPN AJENO
→ NO EXPOSURE
```

La PermissionKey de lectura no concede mutación de contenido, ubicación, cantidad o estado.

---

#### 13. Lectura de movimientos no es inventario general

`nexo.inventory.movements.view` está concedida al conductor únicamente para eventos vinculados a la cadena de custodia de sus operaciones.

No permite consultar el historial general de inventario ni usar esa lectura para inferir o ejecutar:

- ajustes;
- entradas;
- traslados;
- conteos;
- movimientos de otras sedes o actores.

---

#### 14. Recurso relacionado sigue siendo obligatorio

Incluso con PermissionKey concedida, turno y contexto válidos, el conductor solo puede operar recursos relacionados con:

- su asignación;
- su ruta o journey;
- su vehículo cuando aplique;
- su remisión/shipment;
- su custodia vigente.

Misma sede, misma fecha, mismo origen o mismo destino no bastan para relacionar un recurso.

---

#### 15. Ausencia de área no amplía inventario

La semántica positiva de `AUTH-QA-013` permanece:

```text
active_area_id = null
```

puede ser válida para una acción logística compatible.

Pero esta tarea exige demostrar simultáneamente:

```text
active_area_id = null
!=
warehouse_scope

active_area_id = null
!=
all_inventory

active_area_id = null
!=
permission_bypass
```

La ausencia de área productiva no convierte al conductor en actor de bodega.

---

#### 16. Área enviada por cliente no concede autoridad

Un `area_id`, `site_id`, filtro, URL, payload, estado local o selector de interfaz no puede crear el carril de preparación o recepción.

La prueba debe demostrar que cambiar solo un valor controlado por cliente no modifica la autoridad efectiva del conductor.

---

#### 17. `nexo.access` no es wildcard

`nexo.access` permite entrada a NEXO dentro de su contrato.

No significa:

```text
nexo.access
→ prepare
→ receive
→ stock general
→ entries
→ transfers
→ counts
→ adjustments
```

Cada capacidad protegida conserva su PermissionKey, contexto, recurso y estado propios.

---

#### 18. Dispositivo, vehículo y geolocalización no conceden permisos

Un terminal del vehículo, dispositivo móvil, PIN, etiqueta, sesión técnica, GPS, geocerca o proximidad física puede restringir o describir contexto.

La autoridad efectiva permanece:

```text
AUTORIDAD DEL ACTOR
∩
LÍMITES DEL DISPOSITIVO
∩
RELACIÓN CON RECURSO
```

Nunca la unión.

---

#### 19. Diferencias no convierten al conductor en receptor

Si durante carga, tránsito o entrega se observa:

- faltante;
- sobrante;
- producto incorrecto;
- daño;
- sello incompatible;
- rechazo;
- entrega fallida;
- retorno;

el conductor puede aportar evidencia o bloquear continuidad cuando el contrato lo permita.

No puede resolver la diferencia mediante:

- modificación de cantidades preparadas;
- recepción por el destino;
- ajuste de inventario;
- creación de entrada;
- sustitución de producto;
- cierre unilateral de la excepción.

---

#### 20. Cero efectos obligatorios

Todo caso negativo debe comprobar cero efectos sobre, según aplique:

- cantidades solicitadas;
- cantidades preparadas;
- cantidades recibidas;
- stock disponible;
- entradas;
- traslados;
- conteos;
- ajustes;
- ubicaciones;
- asignaciones;
- estado de recepción;
- resolución de diferencias;
- custodia ajena;
- versión del recurso.

Una respuesta `DENY` con una mutación parcial es fallo de certificación.

---

#### 21. Frontera con `AUTH-QA-013`

`AUTH-QA-013 — Conductor puede transitar sin área productiva` certifica la capacidad positiva de tránsito y la semántica de área ausente.

Esta tarea consume ese resultado como control positivo, pero no lo reabre.

`AUTH-QA-014` certifica específicamente que esa autoridad logística no se extiende a:

- preparación;
- recepción;
- inventario general;
- resolución de diferencias.

---

#### 22. Frontera con bodeguero y receptor

El actor de origen autorizado conserva la responsabilidad de preparación.

El actor del destino autorizado conserva la responsabilidad de recepción.

El conductor puede participar en el handoff físico sin adquirir la PermissionKey ni la responsabilidad de ninguno de los extremos.

La certificación no redefine las matrices de bodeguero ni del actor receptor.

---

#### 23. Paridad de evaluadores

Para los mismos:

- principal;
- actor efectivo;
- rol operativo;
- turno;
- check-in;
- sede;
- área ausente o contexto aplicable;
- PermissionKey;
- ruta/journey;
- vehículo;
- shipment/remisión;
- custodia;
- estado;
- versión;
- recurso objetivo;

todos los evaluadores aplicables deben conservar la misma frontera de segregación.

No se admite que UI o cliente oculten una acción mientras servidor, RPC o RLS la permitan por otra ruta.

---

#### 24. Auditoría

La evidencia de cada caso debe permitir reconstruir como mínimo:

- package e identidad de ejecución;
- principal;
- actor efectivo;
- rol base y operativo cuando estén disponibles;
- turno;
- check-in;
- sede;
- área observada;
- dispositivo cuando aplique;
- PermissionKey solicitada;
- ruta/journey;
- vehículo;
- shipment/remisión;
- custodia;
- estado y versión;
- recurso objetivo;
- decisión;
- razones;
- efecto o cero efecto;
- versión contractual;
- timestamp.

La auditoría no sustituye la autorización previa.

---

#### 25. Casos mínimos obligatorios por package

| Caso | Acción o superficie | Condición diferencial | Resultado esperado |
| --- | --- | --- | --- |
| `AUTH-QA-014-A` | `remissions.prepare` | conductor válido sobre remisión asignada | `DENY`, cero efecto |
| `AUTH-QA-014-B` | `remissions.receive` | conductor válido entrega en destino | `DENY`, cero efecto |
| `AUTH-QA-014-C` | `remissions.deliver` | handoff válido | `ALLOW` solo para entrega física; recepción no ejecutada |
| `AUTH-QA-014-D` | lectura LPN | LPN relacionado con carga asignada | visible solo dentro de proyección autorizada |
| `AUTH-QA-014-E` | lectura LPN | LPN ajeno | `NO EXPOSURE` |
| `AUTH-QA-014-F` | lectura de movimientos | evento relacionado con custodia | visible dentro del alcance autorizado |
| `AUTH-QA-014-G` | lectura o mutación de inventario general | recurso no relacionado o capability no concedida | `DENY` o `NO EXPOSURE`, cero efecto |
| `AUTH-QA-014-H` | preparación o recepción | `area_id` manipulado por cliente | `DENY`, cero efecto |
| `AUTH-QA-014-I` | diferencia de entrega | conductor intenta resolver cantidades/inventario | `DENY`, cero efecto |
| `AUTH-QA-014-J` | acción prohibida | dispositivo, vehículo o geolocalización válidos | autoridad sin ampliación |

Si una superficie necesaria para un caso condicional no existe materialmente en el package, se registra `NOT_APPLICABLE` con evidencia. No se inventa una superficie para forzar ejecución.

---

#### 26. Clasificación de fallos

Un fallo de `AUTH-QA-014` se clasifica por la frontera rota:

- `DRIVER_PREPARE_BYPASS` — conductor prepara o modifica cantidades;
- `DRIVER_RECEIVE_BYPASS` — conductor ejecuta recepción por el destino;
- `DELIVER_AUTO_RECEIVE` — entrega física produce recepción automática;
- `GENERAL_INVENTORY_EXPOSURE` — conductor obtiene lectura general de inventario sin relación válida;
- `GENERAL_INVENTORY_MUTATION` — conductor ejecuta entrada, traslado, conteo, ajuste u otra mutación no concedida;
- `RESOURCE_SCOPE_BYPASS` — LPN, movimiento o remisión ajenos quedan expuestos o mutables;
- `CLIENT_CONTEXT_ESCALATION` — `area_id`, `site_id`, URL o payload amplían autoridad;
- `DEVICE_OR_VEHICLE_GRANT` — dispositivo, vehículo o geolocalización añaden permisos;
- `DIFFERENCE_RESOLUTION_BYPASS` — conductor resuelve unilateralmente una diferencia;
- `PARTIAL_EFFECT_ON_DENY` — una denegación conserva efectos parciales;
- `EVALUATOR_DIVERGENCE` — capas aplicables producen decisiones incompatibles;
- `AUDIT_GAP` — no puede reconstruirse la decisión o el efecto.

La clasificación no crea nuevos reason codes públicos ni modifica contratos de error.

---

#### 27. Modelo de ejecución por paquete

Cada package que materialice superficies afectadas ejecutará:

```text
AUTH-QA-014::<package_id>
```

únicamente después de que:

- el package aplicable exista;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias físicas aplicables estén disponibles;
- la instancia se encuentre autorizada conforme al lifecycle físico correspondiente.

Esta tarea documental no selecciona package ni abre una instancia física.

---

#### 28. Certificación global final

La certificación:

```text
AUTH-QA-014::GLOBAL-FINAL
```

consolida evidencia de packages aplicables y demuestra que la segregación del conductor es uniforme entre consumidores.

Debe fallar si existe al menos un consumidor aplicable donde:

- el conductor pueda preparar;
- el conductor pueda recibir por el destino;
- `deliver` auto-ejecute recepción;
- lectura logística se convierta en inventario general;
- un recurso ajeno quede expuesto;
- un contexto controlado por cliente amplíe autoridad;
- una diferencia pueda resolverse sin autoridad propietaria;
- una denegación produzca efectos parciales.

---

#### 29. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por requisitos existentes y no introduce una obligación verificable nueva.

---

#### 30. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AUTH-001` — autorización final por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-004` — paridad entre evaluadores y superficies autoritativas;
- `TREQ-AUTH-010` — segregación de funciones, incluyendo conductor sin facultades productivas o de recepción general;
- `TREQ-AUTH-013` — imposibilidad de bypass por cliente, API o RPC;
- `TREQ-AUTH-015` — evidencia correlacionable de decisión y acción;
- `TREQ-NEXO-006` — efectos de remisión sin doble contabilización;
- `TREQ-NEXO-007` — fallbacks legacy sin ampliación silenciosa de alcance;
- `TREQ-NEXO-009` — jerarquía única y reutilizable para capacidades de remisiones;
- `TREQ-NEXO-016` — separación de preparación, custodia, tránsito, entrega y recepción;
- `TREQ-NEXO-269` — diferencias de remisión sin cierre o recepción implícitos;
- `TREQ-NEXO-291` — guion de conductor que debe demostrar que no puede preparar, recibir ni resolver diferencias.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 31. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no fue incorporado todavía al checkout del usuario; la batería global se ejecutará después del reemplazo. |
| LOCAL | NOT_EXECUTED | No se ejecutaron todavía las validaciones locales de formato, calidad, entrega, topología, requisitos de prueba ni consistencia de diferencias sobre el owner modificado. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, la reconciliación vigente de `AUTH-RBAC-018`, las dieciséis concesiones del conductor, la separación entre `accept_custody`, `start_transit`, `deliver`, `prepare` y `receive`, y cobertura existente del Registro 04A, incluido el requisito específico que obliga a demostrar que el conductor no puede preparar, recibir ni resolver diferencias. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron casos reales de preparación, recepción, inventario, custodia, tránsito, entrega, diferencias ni autorización. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-014::<package_id>` ni `AUTH-QA-014::GLOBAL-FINAL`; ambas identidades permanecen sujetas a su lifecycle y gate físico. |

---

#### 32. Criterios de aceptación

- [ ] `conductor_logistica` consume exactamente dieciséis grants vigentes del dataset actual.
- [ ] La prueba no usa como autoridad el snapshot histórico de catorce grants.
- [ ] `accept_custody`, `start_transit` y `deliver` conservan sus fronteras atómicas.
- [ ] `nexo.inventory.remissions.prepare` no autoriza al conductor.
- [ ] `nexo.inventory.remissions.receive` no autoriza al conductor.
- [ ] Aceptar custodia no permite modificar cantidades preparadas.
- [ ] Iniciar tránsito no crea autoridad de inventario.
- [ ] Entrega física no ejecuta recepción por el destino.
- [ ] Entrega física no crea inventario en destino por sí sola.
- [ ] Lectura LPN queda limitada a carga relacionada.
- [ ] Lectura de movimientos queda limitada a la cadena de custodia relacionada.
- [ ] Recursos ajenos no quedan expuestos por compartir sede, ruta o fecha.
- [ ] Área ausente no equivale a inventario general.
- [ ] Un `area_id` o `site_id` enviado por cliente no amplía autoridad.
- [ ] `nexo.access` no funciona como wildcard.
- [ ] Dispositivo, vehículo, PIN y geolocalización no conceden PermissionKey.
- [ ] Una diferencia no puede resolverse unilateralmente por el conductor.
- [ ] Toda denegación demuestra cero efectos.
- [ ] Los evaluadores aplicables conservan una decisión equivalente.
- [ ] `AUTH-QA-013` conserva la certificación positiva de tránsito y no se duplica.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 33. Límites

Esta tarea no:

- redefine `AUTH-RBAC-018`;
- cambia los dieciséis grants vigentes del conductor;
- crea PermissionKey;
- crea grants, denies, aliases o fallbacks;
- redefine preparación de remisiones;
- redefine recepción de remisiones;
- redefine el modelo global de inventario;
- redefine bodeguero ni actor receptor;
- convierte `active_area_id = null` en regla universal para otros roles;
- implementa journeys, shipments, rutas, vehículos, custodia o geolocalización;
- modifica UI o navegación;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos o datasets;
- ejecuta `AUTH-QA-013::<package_id>`;
- ejecuta `AUTH-QA-014::<package_id>`;
- ejecuta `AUTH-QA-014::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- modifica el Registro 04A.

---

#### 34. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-013 — Conductor puede transitar sin área productiva`

**TAREA ACTUAL APROBADA**
`AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-015 — Compras puede crear órdenes según alcance`
### ✅ AUTH-QA-015 — Compras puede crear órdenes según alcance

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general
**Tarea siguiente:** AUTH-QA-016 — Recepción puede recibir pero no aprobar compras
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización, alcance territorial y segregación de funciones para la creación administrativa de órdenes de compra ORIGO, reutilizable por paquete y certificable globalmente, para demostrar que un actor base autorizado puede crear una `PURCHASE_ORDER` únicamente dentro de su cobertura administrativa y sobre destinos, proveedor, relaciones y centro de costo válidos, sin convertir creación en aprobación, emisión, recepción, inventario, pago ni autoridad global por nombre de rol, sede seleccionada o datos enviados por cliente
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-015::<package_id>` y la certificación `AUTH-QA-015::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; el caso positivo de creación solo es ejecutable en packages donde la identidad objetivo `origo.procurement.purchase_orders.create` ya esté materializada y adoptada de forma gobernada
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra packages, aplicaciones, Supabase, datos, órdenes, proveedores, centros de costo, sedes, aprobaciones, recepciones, inventario, pagos, documentos externos, RLS, RPC, Server Actions ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que la responsabilidad empresarial de compras puede preparar y crear una orden únicamente mediante autoridad base explícita y alcance válido, sin concentrar en el mismo acto las decisiones de aprobación, emisión al proveedor, recepción física, afectación de inventario o pago.

La regla positiva raíz queda:

```text
PRINCIPAL Y ACTOR EFECTIVO VÁLIDOS
+ ACTOR LABORAL ACTIVO
+ ACCESO ORIGO CUANDO APLIQUE
+ PERMISSIONKEY EXACTA origo.procurement.purchase_orders.create
+ CARRIL BASE VÁLIDO
+ RECURSO PURCHASE_ORDER
+ PROVEEDOR Y RELACIONES ADMISIBLES
+ TODOS LOS DESTINOS PROPUESTOS AUTORIZADOS
+ CENTRO DE COSTO VÁLIDO Y AUTORIZABLE CUANDO APLIQUE
+ ESTADO / INPUT / COLUMNAS COMPATIBLES
→ CREATE AUTORIZABLE
→ ORDEN NO APROBADA Y NO EMITIDA
```

Y simultáneamente:

```text
CREATE = ALLOW
!= APPROVE = ALLOW
!= RECEIVE = ALLOW
!= INVENTORY EFFECT = ALLOW
!= PAYMENT = ALLOW
```

La tarea certifica autorización y segregación de funciones. No redefine el proceso de compras ni materializa permisos ausentes.

---

#### 2. Resultado canónico

La tarea deja definidos treinta y dos resultados obligatorios:

1. la creación de órdenes se protege mediante la identidad exacta `origo.procurement.purchase_orders.create`;
2. el recurso protegido es `PURCHASE_ORDER`;
3. la modalidad contractual de `purchase_orders.create` es `BASE_ONLY`;
4. `VPROC-0021` no admite un rol operativo directo que cree órdenes por turno o check-in;
5. la responsabilidad de proceso `RESPONSABLE_DE_COMPRAS` identifica participación empresarial y no constituye por sí sola una PermissionKey ni un grant;
6. la política objetivo de creación asigna capacidad base a `propietario`, `gerente_general`, `gerente` y `auxiliar_administrativa` dentro de sus condiciones y cobertura;
7. `contador` no recibe creación por defecto;
8. un `trabajador_operativo` o un rol operativo no recibe creación por turno;
9. `gerente` queda limitado a sedes, relaciones y territorio de su cobertura administrativa;
10. `auxiliar_administrativa` puede preparar y crear dentro de su función de soporte, pero no adquiere aprobación final por esa capacidad;
11. crear una orden produce únicamente un recurso no aprobado y no emitido;
12. `purchase_orders.create` no puede saltar directamente a `APPROVED` ni `ORDER_ISSUED`;
13. crear no concede `origo.procurement.purchase_orders.approve`;
14. crear no concede recepción ni sustituye `origo.procurement.receipts.register`;
15. crear no produce entrada de inventario, stock, movimientos, recepción económica ni pago;
16. el alcance territorial de una orden usa `PO_DESTINATIONS`;
17. todos los destinos propuestos de una creación deben estar autorizados antes del primer efecto;
18. una orden multidestino no admite creación parcial silenciosa: un destino obligatorio fuera de alcance bloquea la mutación completa;
19. `site_id` enviado por formulario, `selected_site_id`, `employee.site_id`, query, prefill o filtro no crean autoridad;
20. cuando aplique, `cost_center_ref` es una dimensión adicional de política y atribución, distinta de sede y área;
21. un helper que resuelva un centro de costo no concede autorización;
22. proveedor, producto, presentación y relaciones requeridas deben existir y ser admisibles antes de crear la orden;
23. la creación no fabrica relación producto–proveedor ni autoridad sobre proveedor;
24. un actor con grant pero territorio incompatible recibe `DENY` y cero writes;
25. un actor con territorio válido pero sin PermissionKey exacta recibe `DENY` y cero writes;
26. un actor con creación válida pero sin aprobación conserva la orden en estado previo a aprobación;
27. servidor, RPC, RLS y demás evaluadores autoritativos aplicables deben preservar una decisión equivalente para el mismo actor, recurso y alcance;
28. los fallos de autorización no se reparan mediante lista local de roles, botón visible, ruta visible, acceso a ORIGO o valores del cliente;
29. la evidencia conserva actor, permiso, recurso, destinos, centro de costo cuando aplique, decisión, razones y resultado;
30. el caso positivo no se ejecuta físicamente mientras `purchase_orders.create` siga ausente del package compartido consumible por la unidad;
31. no se crean ni modifican requisitos de prueba;
32. no se ejecuta ningún cambio físico durante esta tarea documental.

---

#### 3. Autoridad contractual vigente

La prueba consume sin redefinir:

- `ORIGO-AUTH-005` para identidad, recurso, modalidad y política objetivo de creación;
- `ORIGO-AUTH-006` para separar creación de aprobación y conservar segregación de funciones;
- `ORIGO-AUTH-009` para `PO_DESTINATIONS`, tratamiento multidestino y centro de costo;
- `ORIGO-AUTH-010` para proyección y protección de información sensible;
- `ORIGO-AUTH-013` para preservar el carril administrativo base sin turno/check-in artificial;
- `ORIGO-AUTH-014` para el estado real de materialización/adopción de packages y capacidades;
- `VPROC-0021` para la responsabilidad empresarial de aprobar y emitir compras;
- requisitos ORIGO y AUTH vigentes del Registro 04A;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate `POST_E5_PACKAGE`.

La prueba no convierte las decisiones documentales anteriores en evidencia de implementación física.

---

#### 4. Estado físico actual de la capacidad positiva

El contrato objetivo de ORIGO contempla quince identidades.

El package compartido observado por `ORIGO-AUTH-014` materializa actualmente seis identidades ORIGO:

```text
origo.access
origo.procurement.purchase_orders.view
origo.procurement.receipts.view
origo.procurement.receipts.register
origo.procurement.suppliers.view
origo.catalog.product_reviews.view
```

`origo.procurement.purchase_orders.create` forma parte de las nueve identidades objetivo todavía no materializadas en ese baseline físico.

Por tanto:

```text
CONTRATO DE CREATE = DEFINIDO
IDENTIDAD OBJETIVO = APROBADA DOCUMENTALMENTE
MATERIALIZACIÓN FÍSICA ACTUAL EN PACKAGE = AUSENTE
```

La certificación por package no puede fabricar una PermissionKey local, un alias, un mock autorizante ni un grant temporal para forzar el caso positivo.

---

#### 5. Identidad exacta de creación

La única identidad positiva de creación de orden cubierta por esta tarea es:

```text
origo.procurement.purchase_orders.create
```

Recurso:

```text
PURCHASE_ORDER
```

Efecto máximo:

```text
CREAR ORDEN NO APROBADA / NO EMITIDA
DENTRO DEL ALCANCE AUTORIZADO
```

No se acepta como sustituto:

```text
origo.access
origo.procurement.purchase_orders.view
origo.procurement.purchase_orders.approve
permiso legacy amplio
lista local de roles
botón visible
ruta visible
service_role sin actor/autoridad empresarial
```

---

#### 6. Modalidad `BASE_ONLY`

`purchase_orders.create` conserva modalidad:

```text
BASE_ONLY
```

La autorización positiva no depende de:

- turno operativo;
- check-in;
- rol operativo;
- área activa de jornada;
- dispositivo de recepción;
- geolocalización;
- presencia física en una sede.

La ausencia de turno o check-in no debe bloquear una creación administrativa válida cuando todos los controles base, de recurso y alcance sean correctos.

La ausencia de turno tampoco concede autoridad que no exista.

---

#### 7. Responsabilidad de Compras no es un grant

`RESPONSABLE_DE_COMPRAS` identifica una responsabilidad dentro de `VPROC-0021`.

No significa:

```text
RESPONSABLE_DE_COMPRAS
→ purchase_orders.create = ALLOW
```

La decisión se obtiene desde:

```text
ACTOR BASE EFECTIVO
∩ PERMISSIONKEY EXACTA
∩ COBERTURA ADMINISTRATIVA
∩ RECURSO / DESTINOS
∩ POLÍTICA / ESTADO
```

La etiqueta del proceso ayuda a atribuir responsabilidad, pero no sustituye la autorización.

---

#### 8. Política objetivo de actores base para creación

La certificación consume la política objetivo de `ORIGO-AUTH-005` y `ORIGO-AUTH-013`:

| Rol base | Decisión objetivo | Frontera |
| --- | --- | --- |
| `propietario` | `ALLOW` si posee la capacidad y el recurso es admisible | la creación no concede aprobación automática |
| `gerente_general` | `ALLOW` si posee la capacidad y el recurso es admisible | la creación no concede aprobación automática |
| `gerente` | `ALLOW` solo dentro de su cobertura administrativa | no obtiene alcance organizacional completo |
| `auxiliar_administrativa` | `ALLOW` dentro de su función de soporte y cobertura | puede preparar/crear; no aprobar por esa capacidad |
| `contador` | `DENY` por ausencia de grant objetivo de creación | consulta/conciliación no crean órdenes |
| `trabajador_operativo` | `DENY` por ausencia de grant objetivo de creación | un turno no crea autoridad administrativa |

La prueba no infiere grants únicamente desde estos nombres. La unidad física deberá usar el dataset/materialización canónica vigente de su versión.

---

#### 9. Cobertura administrativa del `gerente`

El `gerente` no adquiere autoridad global por su nombre de rol.

El caso positivo exige que todos los destinos de la nueva orden pertenezcan a relaciones autorizadas para el actor.

Ejemplo:

```text
GERENTE CON COBERTURA = SEDE_A
+ purchase_orders.create
+ DESTINOS = [SEDE_A]
→ AUTORIZABLE
```

Control negativo:

```text
GERENTE CON COBERTURA = SEDE_A
+ purchase_orders.create
+ DESTINOS = [SEDE_B]
→ DENY
→ CERO WRITES
```

---

#### 10. Frontera de `auxiliar_administrativa`

Una `auxiliar_administrativa` con grant y cobertura válidos puede preparar y crear la orden dentro del carril base.

Eso no significa:

```text
CREATE
→ APPROVE
→ ORDER_ISSUED
```

La prueba debe distinguir de forma expresa:

```text
purchase_orders.create = ALLOW
purchase_orders.approve = DENY / NO AUTHORITY
```

cuando el fixture use una auxiliar sin autoridad aprobadora independiente.

---

#### 11. Resultado permitido de `create`

La creación produce un objeto de trabajo previo a aprobación y emisión.

Oracle positivo:

```text
CREATE_RESULT = PURCHASE_ORDER_CREATED
APPROVAL_RESULT = NOT_PERFORMED
ISSUE_RESULT = NOT_PERFORMED
RECEIPT_RESULT = NOT_PERFORMED
INVENTORY_EFFECT = NONE
PAYMENT_EFFECT = NONE
```

El literal técnico concreto del estado persistido se valida contra la implementación materializada del package y no se inventa desde esta tarea.

La propiedad contractual obligatoria es que `create` no cruce por sí solo el punto de aprobación ni emisión.

---

#### 12. Creación no equivale a aprobación

`origo.procurement.purchase_orders.approve` permanece como autoridad separada.

La prueba debe demostrar que un actor con `create` puede dejar una orden preparada sin que exista aprobación implícita.

No se acepta:

```text
purchase_orders.create
→ APPROVED
```

ni:

```text
purchase_orders.create
→ ORDER_ISSUED
```

Una transición de aprobación posterior debe revalidar su PermissionKey, actor funcional, segregación, estado, política y alcance propios.

---

#### 13. Segregación con actor aprobador

La creación no elimina la regla de que iniciador/preparador y actor aprobador deben respetar la política de segregación aplicable.

La certificación debe incluir un caso donde:

- el creador posee `purchase_orders.create`;
- el creador no posee autoridad aprobadora válida para ese caso;
- la orden se crea correctamente;
- cualquier intento inmediato de aprobar mediante el mismo contexto no autorizado produce `DENY` y cero transición.

La tarea no impide que un mismo humano posea capacidades distintas cuando una política aprobada lo permita; impide inferir la segunda desde la primera.

---

#### 14. `PO_DESTINATIONS` gobierna la creación

El alcance territorial de `PURCHASE_ORDER` usa:

```text
PO_DESTINATIONS
```

Para `create`:

```text
TODOS LOS DESTINOS PROPUESTOS AUTORIZADOS
```

es condición previa al primer write.

No existe una semántica de creación parcial invisible sobre una misma orden.

---

#### 15. Orden multidestino

Una orden puede relacionar varios destinos.

Caso positivo:

```text
DESTINOS PROPUESTOS = [SEDE_A, SEDE_B]
ACTOR AUTORIZADO = [SEDE_A, SEDE_B]
→ CONTINÚA EVALUACIÓN
```

Caso negativo:

```text
DESTINOS PROPUESTOS = [SEDE_A, SEDE_B]
ACTOR AUTORIZADO = [SEDE_A]
→ DENY
→ CERO WRITES
```

La presencia de al menos un destino válido no autoriza crear una orden que también afecte un destino fuera de cobertura.

---

#### 16. `site_id` del cliente no crea autoridad

Los siguientes valores son inputs o hints, no fuentes de autoridad:

```text
form.site_id
query.site_id
selected_site_id
prefill.site_id
employee.site_id
```

Antes de crear la orden, el servidor debe resolver los destinos reales y contrastarlos con la cobertura administrativa efectiva.

Modificar el cliente para enviar una sede diferente nunca amplía scope.

---

#### 17. Fuente territorial administrativa

Cuando el scope administrativo dependa de sedes asignadas, la fuente canónica aprobada se resuelve desde relaciones autorizadas del actor y no desde el selector visual.

La prueba debe distinguir:

```text
SELECTED_SITE
```

de:

```text
AUTHORIZED_SITE_SET
```

Un selector puede reducir presentación, pero nunca fabricar autoridad.

---

#### 18. Centro de costo

Cuando la política de la compra exija centro de costo, se evalúa una referencia canónica:

```text
cost_center_ref
```

Debe demostrarse que:

- existe;
- está vigente;
- pertenece al ámbito organizacional compatible;
- es compatible con la sede/estructura aplicable;
- está dentro de la cobertura autorizada del actor para la acción;
- queda correlacionado con la versión de la orden cuando corresponda.

Se conserva:

```text
site_id != cost_center_ref
area_id != cost_center_ref
```

---

#### 19. Helper de centro de costo no concede permiso

Un helper o RPC que obtenga una referencia de centro de costo puede resolver datos.

No puede transformar:

```text
ACTOR SIN SCOPE
+ COST_CENTER_RESUELTO
```

en:

```text
ALLOW
```

El caso debe producir `DENY` si la referencia no es autorizable para el actor o si la política aplicable no queda satisfecha.

---

#### 20. Proveedor y relaciones admisibles

Crear una orden consume proveedores y relaciones ya válidas.

La capacidad de crear orden no concede:

- alta de proveedor;
- activación de proveedor;
- modificación de condiciones sensibles;
- creación de relación producto–proveedor;
- modificación de catálogo;
- ampliación de territorio a partir del proveedor.

Un proveedor inexistente, inactivo o no admisible según el contrato aplicable bloquea la creación.

---

#### 21. Producto y presentación

Las líneas de la orden deben referenciar identidades de producto/presentación válidas para el contrato materializado.

La prueba no acepta que `create` fabrique:

- producto;
- presentación;
- unidad;
- equivalencia;
- condición comercial inexistente.

Una referencia inválida debe fallar cerrada y conservar cero writes de la orden.

---

#### 22. `origo.access` no es wildcard

`origo.access` permite entrada a ORIGO dentro de su contrato.

No significa:

```text
origo.access
→ purchase_orders.create
→ purchase_orders.approve
→ receipts.register
→ suppliers.create
```

Cada efecto protegido requiere su PermissionKey y demás condiciones propietarias.

---

#### 23. Rol operativo, turno y check-in no conceden creación

`VPROC-0021` no admite rol operativo directo para crear órdenes.

Por tanto:

```text
ROL OPERATIVO VÁLIDO
+ TURNO VIGENTE
+ CHECK-IN VÁLIDO
+ SIN GRANT BASE purchase_orders.create
→ DENY
```

La prueba no reutiliza `bodeguero`, `gerencia_operativa` u otro rol operativo como sustituto de la capacidad administrativa.

---

#### 24. Creación no concede recepción

`AUTH-QA-016` conserva la certificación específica del actor receptor y de la frontera frente a aprobación de compras.

`AUTH-QA-015` debe comprobar únicamente que una creación exitosa no ejecuta por implicación:

```text
origo.procurement.receipts.register
```

ni produce aceptación física, documental o económica de una entrega inexistente.

La matriz exhaustiva de recepción pertenece a `AUTH-QA-016`.

---

#### 25. Creación no produce inventario ni pago

Una orden creada no puede por ese hecho:

- registrar entrada de inventario;
- aumentar stock;
- crear movimiento NEXO;
- registrar recepción;
- generar pago;
- marcar obligación pagada;
- reconciliar cantidades recibidas;
- cerrar diferencias.

Las integraciones posteriores conservan sus contratos y autoridades independientes.

---

#### 26. Protección de datos sensibles

La capacidad de crear una orden no concede lectura o mutación irrestricta de:

- precios sensibles;
- costos internos;
- condiciones comerciales;
- datos tributarios o bancarios de proveedor;
- notas internas;
- documentos internos;
- campos excluidos por field mask.

La prueba debe utilizar la proyección materializada permitida por el package y no interpretar `create` como autorización de todas las columnas.

---

#### 27. Bypass por cliente y superficie

No autorizan creación por sí solos:

- URL conocida;
- página de nueva orden visible;
- botón habilitado por UI;
- `site_id` manipulado;
- proveedor precargado;
- query parameter;
- cookie;
- lista local de roles;
- nombre de responsabilidad;
- helper legacy;
- llamada directa a Server Action, API o RPC.

El primer efecto debe ocurrir solo después de una decisión autoritativa server-side.

---

#### 28. Paridad de evaluadores

Para los mismos:

- principal;
- actor efectivo;
- rol base;
- PermissionKey;
- recurso;
- destinos;
- centro de costo cuando aplique;
- proveedor;
- estado/input;
- package/versión contractual;

los evaluadores autoritativos aplicables deben producir decisión y razones equivalentes.

No se admite que UI deniegue mientras una Server Action crea, ni que UI permita mientras el servidor cree fuera de alcance.

---

#### 29. Auditoría

La evidencia de cada caso debe permitir reconstruir como mínimo:

- package e identidad de ejecución;
- principal;
- actor efectivo;
- rol base;
- responsabilidad de proceso cuando esté disponible;
- PermissionKey evaluada;
- recurso `PURCHASE_ORDER` o intención de creación;
- destinos propuestos;
- destinos autorizados;
- `cost_center_ref` cuando aplique;
- proveedor y referencias materiales necesarias;
- decisión;
- razones;
- cero efecto o recurso creado;
- estado resultante;
- versión contractual;
- timestamp.

La auditoría no sustituye la autorización previa.

---

#### 30. Casos mínimos obligatorios por package

| Caso | Actor / condición diferencial | Resultado esperado |
| --- | --- | --- |
| `AUTH-QA-015-A` | actor base con `purchase_orders.create`, todos los destinos autorizados y referencias válidas | `ALLOW`; orden creada no aprobada/no emitida |
| `AUTH-QA-015-B` | `gerente` con destino fuera de su cobertura | `DENY`, cero writes |
| `AUTH-QA-015-C` | `auxiliar_administrativa` crea y luego intenta aprobar sin autoridad aprobadora | creación `ALLOW`; aprobación `DENY`, orden no aprobada |
| `AUTH-QA-015-D` | `contador` sin grant de creación | `DENY`, cero writes |
| `AUTH-QA-015-E` | rol operativo con turno/check-in válidos pero sin grant base | `DENY`, cero writes |
| `AUTH-QA-015-F` | orden multidestino con un destino no autorizado | `DENY`, cero writes |
| `AUTH-QA-015-G` | `site_id` de cliente manipulado fuera de cobertura | `DENY`, cero writes |
| `AUTH-QA-015-H` | centro de costo requerido pero no vigente/incompatible/no autorizado | `DENY`, cero writes |
| `AUTH-QA-015-I` | proveedor o relación requerida inválida | `DENY`, cero writes |
| `AUTH-QA-015-J` | creación válida inspeccionada por efectos posteriores | cero aprobación, recepción, inventario y pago implícitos |
| `AUTH-QA-015-K` | acceso a ORIGO o permiso `.view` sin `purchase_orders.create` | `DENY`, cero writes |
| `AUTH-QA-015-L` | package todavía no materializa la PermissionKey objetivo | `NOT_APPLICABLE`, sin mocks autorizantes ni alias locales |

Un caso se clasifica `NOT_APPLICABLE` únicamente por ausencia material demostrada de la superficie/capacidad necesaria en ese package, nunca para ocultar un `DENY`, un fallo o una implementación incompleta que sí debía estar presente.

---

#### 31. Clasificación de fallos

Un fallo de `AUTH-QA-015` se clasifica por la frontera rota:

- `CREATE_PERMISSION_BYPASS` — creación ejecutada sin PermissionKey exacta;
- `BASE_ROLE_POLICY_BYPASS` — rol no autorizado crea por nombre o fallback;
- `OPERATIONAL_ROLE_ESCALATION` — turno/rol operativo concede creación administrativa;
- `DESTINATION_SCOPE_BYPASS` — destino fuera de cobertura aceptado;
- `MULTI_DESTINATION_PARTIAL_WRITE` — orden parcialmente creada pese a destino obligatorio no autorizado;
- `CLIENT_SITE_AUTHORITY_BYPASS` — valor de cliente crea o amplía territorio;
- `COST_CENTER_SCOPE_BYPASS` — referencia económica inválida o fuera de alcance aceptada;
- `SUPPLIER_RELATION_BYPASS` — proveedor o relación inadmisible aceptados;
- `CREATE_APPROVE_COLLAPSE` — creación produce aprobación o usa autoridad aprobadora por inferencia;
- `CREATE_RECEIVE_COLLAPSE` — creación produce recepción;
- `CREATE_INVENTORY_SIDE_EFFECT` — creación modifica inventario;
- `CREATE_PAYMENT_SIDE_EFFECT` — creación produce efecto financiero/pago impropio;
- `FIELD_MASK_BYPASS` — creación expone o muta campos sensibles no autorizados;
- `EVALUATOR_DIVERGENCE` — capas autoritativas producen decisiones incompatibles;
- `AUDIT_GAP` — no puede reconstruirse actor, alcance, decisión o efecto;
- `PHYSICAL_CAPABILITY_ABSENT_MISREPORTED` — capacidad no materializada se presenta falsamente como PASS.

La clasificación no crea nuevos reason codes públicos ni modifica el contrato de errores.

---

#### 32. Modelo de ejecución por paquete

Cada package que materialice una superficie aplicable ejecutará:

```text
AUTH-QA-015::<package_id>
```

únicamente después de que:

- exista el package propietario aplicable;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias físicas requeridas estén disponibles;
- la instancia esté autorizada conforme al lifecycle físico;
- la capacidad objetivo necesaria para el caso haya sido materializada/adoptada de forma gobernada.

La ausencia actual de `purchase_orders.create` en el baseline compartido no autoriza a esta tarea documental a crearla.

---

#### 33. Certificación global final

La certificación:

```text
AUTH-QA-015::GLOBAL-FINAL
```

consolida evidencia de los packages aplicables y demuestra que la creación de órdenes converge en una sola semántica de permiso, alcance y segregación.

Debe fallar si existe al menos un consumidor aplicable donde:

- se pueda crear sin `purchase_orders.create`;
- un rol operativo cree por turno/check-in;
- un `gerente` cree fuera de su cobertura;
- un destino no autorizado sea aceptado;
- un valor de cliente fabrique autoridad;
- crear apruebe, reciba, afecte inventario o pague por implicación;
- la misma intención produzca decisiones distintas entre capas autoritativas.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por obligaciones existentes de autorización, segregación, alcance y compras y no introduce una obligación verificable nueva.

---

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AUTH-001` — autorización final mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-008` — separación entre autoridad administrativa base y contexto operativo cuando el contrato lo permite;
- `TREQ-AUTH-010` — segregación de funciones entre compras, aprobación y recepción;
- `TREQ-AUTH-013` — revalidación server-side de permiso, actor, territorio, contexto, estado y campos;
- `TREQ-AUTH-015` — evidencia correlacionable de decisiones y acciones protegidas;
- `TREQ-ORIGO-002` — órdenes limitadas por permiso, sede o centro de costo, estado y columnas;
- `TREQ-ORIGO-004` — separación de necesidad, selección, aprobación, orden y recepción, con políticas por empresa, sede, centro de costo, categoría, importe, riesgo y urgencia;
- `TREQ-ORIGO-005` — gobierno de proveedor, condiciones comerciales y datos sensibles.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no fue incorporado todavía al checkout del usuario; la batería global corresponde a la incorporación posterior. |
| LOCAL | NOT_EXECUTED | No se ejecutaron formateo, quality, delivery, topología, TREQ ni diff del owner modificado en el checkout local del usuario. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, continuidad hacia `AUTH-QA-015`, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `ORIGO-AUTH-005`, `ORIGO-AUTH-006`, `ORIGO-AUTH-009`, `ORIGO-AUTH-013`, `ORIGO-AUTH-014`, el estado físico 6/15 de identidades ORIGO compartidas, la ausencia material actual de `purchase_orders.create` en ese baseline, la política de actores base, `PO_DESTINATIONS`, centro de costo y cobertura existente del Registro 04A. |
| OPERATIVA | NOT_EXECUTED | No se crearon órdenes, no se evaluaron actores reales ni se ejecutaron casos de sede, multidestino, proveedor, centro de costo, aprobación, recepción o inventario. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-015::<package_id>` ni `AUTH-QA-015::GLOBAL-FINAL`; ambas identidades permanecen sujetas a su lifecycle, materialización de capacidades y gate físico. |

---

#### 37. Criterios de aceptación

- [ ] La capacidad positiva exacta es `origo.procurement.purchase_orders.create`.
- [ ] El recurso protegido es `PURCHASE_ORDER`.
- [ ] La modalidad permanece `BASE_ONLY`.
- [ ] La responsabilidad `RESPONSABLE_DE_COMPRAS` no se usa como grant implícito.
- [ ] La política de actores conserva creación para `propietario`, `gerente_general`, `gerente` y `auxiliar_administrativa` únicamente según grants y cobertura materializados.
- [ ] `contador` y roles operativos no reciben creación por defecto.
- [ ] Un turno o check-in no concede creación administrativa.
- [ ] `gerente` queda limitado a su cobertura administrativa.
- [ ] Todos los destinos propuestos son autorizables antes del primer write.
- [ ] Una orden multidestino con un destino obligatorio fuera de alcance falla completa.
- [ ] `site_id`, `selected_site_id`, query, prefill o `employee.site_id` no crean autoridad.
- [ ] El centro de costo se valida como dimensión independiente cuando aplique.
- [ ] Un helper de centro de costo no concede scope.
- [ ] Proveedor y relaciones requeridas son admisibles antes de crear.
- [ ] Crear produce una orden no aprobada y no emitida.
- [ ] Crear no concede `purchase_orders.approve`.
- [ ] Crear no registra recepción.
- [ ] Crear no afecta inventario ni pago.
- [ ] La proyección sensible conserva field masks y finalidad.
- [ ] Toda denegación conserva cero writes.
- [ ] Los evaluadores autoritativos aplicables conservan decisión equivalente.
- [ ] La evidencia conserva actor, permiso, destinos, centro de costo cuando aplique, decisión y resultado.
- [ ] Un package sin `purchase_orders.create` materializado registra el caso positivo como `NOT_APPLICABLE` y no fabrica un mock autorizante.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 38. Límites

Esta tarea no:

- materializa `origo.procurement.purchase_orders.create`;
- modifica el catálogo compartido de permisos;
- crea grants base;
- modifica roles base u operativos;
- redefine `RESPONSABLE_DE_COMPRAS`;
- redefine `VPROC-0021`;
- redefine `PO_DESTINATIONS`;
- crea o modifica centros de costo;
- redefine proveedores, productos, presentaciones o relaciones de catálogo;
- modifica políticas de aprobación;
- aprueba compras;
- emite órdenes a proveedores;
- registra recepciones;
- modifica inventario;
- genera pagos o hechos financieros;
- modifica field masks ni contratos de datos sensibles;
- modifica UI, Server Actions, RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos físicos;
- ejecuta `ORIGO-AUTH-014::<implementation_unit_id>`;
- ejecuta `ORIGO-AUTH-015::<implementation_unit_id>`;
- ejecuta `AUTH-QA-015::<package_id>`;
- ejecuta `AUTH-QA-015::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- desarrolla la matriz exhaustiva de recepción reservada a `AUTH-QA-016`;
- modifica el Registro 04A.

---

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general`

**TAREA ACTUAL APROBADA**
`AUTH-QA-015 — Compras puede crear órdenes según alcance`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-016 — Recepción puede recibir pero no aprobar compras`
### ✅ AUTH-QA-016 — Recepción puede recibir pero no aprobar compras

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-015 — Compras puede crear órdenes según alcance
**Tarea siguiente:** AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización, contexto operativo, atribución y segregación de funciones para la recepción de compras ORIGO, reutilizable por paquete y certificable globalmente, para demostrar que un receptor operativo autorizado puede registrar una recepción mediante `origo.procurement.receipts.register` únicamente con actor efectivo, turno, check-in, territorio y recurso válidos, sin adquirir por esa recepción autoridad administrativa para `origo.procurement.purchase_orders.approve`, resolver diferencias, reversar recepciones, administrar proveedores, afectar inventario fuera del handoff propietario ni ampliar alcance por rol base, dispositivo, sede seleccionada o datos enviados por cliente
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-016::<package_id>` y la certificación `AUTH-QA-016::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; un package que conserve `receipts.register` con modalidad o grants incompatibles con `OPERATIONAL_ONLY` y `T+C` no es certificable como PASS
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra packages, aplicaciones, Supabase, datos, órdenes, recepciones, inventario, proveedores, turnos, check-ins, actores, firmas, dispositivos compartidos, RLS, RPC, Server Actions ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que la responsabilidad de recepción puede registrar un hecho de recepción de compra únicamente por el carril operativo aprobado, sin convertir esa autoridad en aprobación de compras ni en una autorización administrativa general de ORIGO.

La regla positiva raíz queda:

```text
PRINCIPAL Y ACTOR EFECTIVO VÁLIDOS
+ ACTOR RECEPTOR RESUELTO
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN ACTIVO Y COMPATIBLE
+ ROL OPERATIVO CON GRANT EXPLÍCITO
+ SEDE / ÁREA EFECTIVAS COMPATIBLES
+ origo.procurement.receipts.register
+ PURCHASE_RECEIPT / OBJETIVO DE RECEPCIÓN VÁLIDO
+ ORDEN O CAUSA CONTROLADA ELEGIBLE
→ RECEPCIÓN NUEVA AUTORIZABLE
```

Y simultáneamente:

```text
MISMO ACTOR O MISMA ESTACIÓN
+ MISMO TURNO / CHECK-IN / SEDE
+ INTENTO DE APROBAR LA COMPRA
+ SIN AUTORIDAD BASE INDEPENDIENTE PARA purchase_orders.approve
→ DENY
→ CERO EFECTOS DE APROBACIÓN
```

Recibir una compra no concede aprobarla.

---

#### 2. Resultado canónico

La tarea deja definidos treinta y dos resultados obligatorios:

1. `RECEPCION_EN_SEDE` se trata como responsabilidad funcional de proceso y no como PermissionKey, rol base ni rol operativo autónomo;
2. `origo.procurement.receipts.register` es la capacidad exacta para registrar una recepción nueva;
3. `receipts.register` protege `PURCHASE_RECEIPT` y el objetivo de recepción suficientemente determinado antes del primer efecto;
4. la modalidad contractual de `receipts.register` es `OPERATIONAL_ONLY`;
5. su prerrequisito operativo es `T+C`;
6. `bodeguero` y `gerencia_operativa` son los roles operativos objetivo que pueden recibir el grant conforme a sus restricciones aprobadas;
7. ningún rol base administrativo recibe `receipts.register` por sí solo;
8. un rol base administrativo solo puede registrar recepción si además resuelve un carril operativo válido con grant, `T+C`, territorio y recurso compatibles;
9. `origo.procurement.purchase_orders.approve` es una capacidad administrativa distinta y `BASE_ONLY`;
10. turno, check-in, rol operativo, dispositivo de recepción o presencia física no conceden `purchase_orders.approve`;
11. `bodeguero` y `gerencia_operativa` no reciben aprobación de compras por el carril operativo;
12. el actor receptor no se infiere del comprador, aprobador, creador de la orden, principal técnico del dispositivo ni último actor observado;
13. una recepción autorizada exige actor humano efectivo atribuible;
14. en dispositivo compartido, el principal técnico y el actor receptor permanecen separados;
15. cuando la acción exige firma humana, el actor que autoriza, firma y recibe debe permanecer correlacionable con el efecto;
16. una firma o PIN identifica o confirma al humano, pero no crea permiso, turno, check-in, territorio ni autoridad de aprobación;
17. una cola, formulario, orden visible o `origo.access` no conceden `receipts.register`;
18. un `site_id`, `area_id`, `selected_site_id`, query, payload o prefill controlado por cliente no crea contexto efectivo;
19. la sede y área efectivas del carril operativo deben resolverse de forma autoritativa y ser compatibles con el recurso;
20. una recepción ordinaria contra orden exige una orden elegible y relacionada con la sede receptora;
21. una recepción directa o de emergencia sigue exigiendo `receipts.register`, `T+C`, actor efectivo, territorio y causa controlada;
22. `record_only` sigue siendo una recepción empresarial y mantiene los mismos controles de autorización aunque no mueva inventario;
23. el modo inventariable no convierte `receipts.register` en autoridad general sobre stock, LOC, posiciones o costos fuera del handoff propietario;
24. `receipts.register` no autoriza reversión ni corrección de una recepción previa;
25. `receipts.register` no autoriza resolver unilateralmente diferencias;
26. registrar recepción no aprueba, edita ni emite la orden de compra;
27. un humano que posea autoridad administrativa independiente para aprobar debe resolver esa autoridad por su carril base, política y segregación; la recepción nunca es fuente de ese allow;
28. el package compartido observado materializa `receipts.register`, pero conserva un drift de modalidad/grants incompatible con el contrato objetivo y por tanto no puede certificarse PASS mientras ese drift persista;
29. una denegación de recepción o aprobación conserva cero efectos parciales;
30. evaluadores y canales aplicables deben conservar decisiones equivalentes para el mismo principal, actor, contexto, permiso, recurso y estado;
31. la certificación por package solo prueba superficies materialmente presentes y compatibles con el contrato objetivo;
32. no se crean ni modifican requisitos de prueba y no se ejecutan cambios físicos desde esta tarea documental.

---

#### 3. Autoridad contractual vigente

La certificación consume sin reinterpretación:

- `ORIGO-AUTH-006 — Definir permisos de aprobación`;
- `ORIGO-AUTH-007 — Definir permisos de recepción`;
- `ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo`;
- `ORIGO-AUTH-011 — Registrar actor de recepción`;
- `ORIGO-AUTH-012 — Integrar contexto operativo donde aplique`;
- `ORIGO-AUTH-013 — Mantener administración sin check-in`;
- `ORIGO-AUTH-014 — Migrar a paquetes de vento-shell`;
- modelo transversal de principal, actor efectivo, modalidad, contexto, recurso, territorio y evidencia;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate `POST_E5_PACKAGE`.

La tarea no redefine esas decisiones. Las convierte en un contrato de certificación transversal específico para la frontera recepción versus aprobación.

---

#### 4. Identidad exacta de recepción

La capacidad positiva de esta tarea es:

```text
origo.procurement.receipts.register
```

Recurso protegido:

```text
PURCHASE_RECEIPT
```

Efecto máximo autorizado:

```text
REGISTRAR UNA RECEPCIÓN NUEVA
DENTRO DEL CONTEXTO OPERATIVO AUTORIZADO
```

No concede por sí sola:

- consulta global de ORIGO;
- aprobación de compra;
- actualización administrativa de la orden;
- cancelación de la orden;
- reversión de recepción;
- resolución de diferencias;
- administración de proveedores;
- acceso irrestricto a datos sensibles;
- autoridad financiera;
- inventario general fuera del handoff propietario.

---

#### 5. Modalidad `OPERATIONAL_ONLY`

El contrato objetivo de `receipts.register` queda:

```text
authorization_requirement = OPERATIONAL_ONLY
operational_prerequisite = T+C
base_prerequisite = N/A
```

Por tanto:

```text
ROL BASE ADMINISTRATIVO VÁLIDO
+ SIN CARRIL OPERATIVO AUTORIZADO
→ NO AUTORIZA receipts.register
```

Y:

```text
GRANT OPERATIVO VÁLIDO
+ SIN TURNO VIGENTE O SIN CHECK-IN COMPATIBLE
→ DENY
```

No se permite construir un allow híbrido con rol base, sede primaria, app visible, contexto incompleto o permiso legacy amplio.

---

#### 6. `T+C` es obligatorio

`T+C` significa simultáneamente:

- turno publicado;
- turno vigente;
- turno perteneciente al actor efectivo;
- rol operativo efectivo compatible;
- check-in activo;
- check-in perteneciente al mismo actor;
- check-in perteneciente al mismo turno;
- sede compatible;
- área compatible cuando aplique;
- frescura suficiente al momento de la mutación.

La pérdida del check-in invalida el carril `T+C`.

El fin del turno invalida el carril operativo.

Una autorización calculada antes de un cambio material de actor, turno, check-in, sede, área, dispositivo, grant o recurso debe revalidarse antes del efecto.

---

#### 7. Roles operativos objetivo

La política objetivo de `ORIGO-AUTH-007` concede `receipts.register` únicamente por carril operativo a:

| Rol operativo | Decisión objetivo | Frontera |
| --- | --- | --- |
| `bodeguero` | `ASIGNAR_OPERATIVO` | recepción dentro de sede, bodega o área autorizadas, con `T+C`, recurso y actor resueltos |
| `gerencia_operativa` | `ASIGNAR_OPERATIVO` | coordinación o recepción en sede activa con `T+C`, territorio y recurso coincidentes; sin alcance global |

La etiqueta del rol no es suficiente. La autorización final exige grant, contexto, territorio, recurso y ausencia de denegaciones aplicables.

---

#### 8. `RECEPCION_EN_SEDE` no es un grant

`RECEPCION_EN_SEDE` identifica la responsabilidad funcional principal de `VPROC-0022`.

No debe transformarse en:

- nombre de PermissionKey;
- rol operativo adicional inventado;
- rol base;
- bypass de autorización;
- permiso de aprobación;
- wildcard de ORIGO.

La certificación debe mapear la responsabilidad empresarial al actor real y a las capacidades atómicas materializadas.

---

#### 9. Identidad exacta de aprobación

La capacidad administrativa separada es:

```text
origo.procurement.purchase_orders.approve
```

Su modalidad contractual es:

```text
BASE_ONLY
```

La aprobación no puede derivarse de:

- `receipts.register`;
- turno;
- check-in;
- rol operativo;
- sede activa;
- área receptora;
- firma de recepción;
- dispositivo de recepción;
- orden visible;
- recepción registrada;
- `origo.access`.

---

#### 10. Recepción no equivale a aprobación

El oracle principal de segregación queda:

```text
RECEIPT_REGISTER = ALLOW
PURCHASE_APPROVE = DENY
```

cuando el actor solo posee autoridad operativa de recepción y no posee una autoridad administrativa independiente de aprobación.

La prueba debe demostrar que registrar una recepción no:

- mueve la orden a un estado de aprobación;
- crea un evento de aprobación;
- registra al receptor como aprobador;
- reutiliza firma/PIN como aprobación;
- ejecuta una Server Action de aprobación;
- cambia un flag o columna equivalente a aprobación;
- fabrica una aprobación por haber recibido físicamente la mercancía.

---

#### 11. Un mismo humano puede tener autoridades independientes

Esta tarea certifica la fuente de autoridad, no impone una prohibición universal a una identidad humana que legítimamente posea varias responsabilidades.

Si el mismo humano posee además una autoridad base independiente para:

```text
origo.procurement.purchase_orders.approve
```

la aprobación debe volver a resolver de manera separada:

- grant base exacto;
- actor funcional autorizante;
- cobertura administrativa;
- recurso;
- estado;
- política de aprobación;
- segregación del caso concreto;
- versión;
- evidencia.

La existencia de una recepción previa del mismo actor no satisface ninguno de esos requisitos.

Cuando la política de segregación prohíba autoaprobación o acumulación para el caso concreto, el resultado debe ser `DENY` aunque el humano posea otras capacidades.

---

#### 12. Actor receptor obligatorio

Toda recepción nueva debe quedar atribuida a un actor humano efectivo cuando el contrato exija actor humano.

La relación mínima queda:

```text
PRINCIPAL AUTENTICADO
→ ACTOR EFECTIVO
→ ACTOR RECEPTOR
→ receipts.register
→ PURCHASE_RECEIPT
```

El actor receptor no se infiere de:

- comprador;
- aprobador;
- creador de la orden;
- proveedor;
- dispositivo;
- `shared_device_id`;
- `employee.site_id`;
- `selected_site_id`;
- último actor del dispositivo.

Actor ausente, ambiguo, inactivo, stale o no correlacionable falla cerrado.

---

#### 13. Dispositivo compartido

En un dispositivo compartido deben permanecer separadas:

```text
PRINCIPAL TÉCNICO DEL DISPOSITIVO
ACTOR HUMANO EFECTIVO
ACTOR RECEPTOR
```

La autorización efectiva es la intersección de:

- límites del dispositivo;
- actor humano;
- turno;
- check-in;
- rol operativo;
- permiso exacto;
- territorio;
- recurso;
- estado.

El dispositivo solo puede restringir. No puede ampliar la autoridad del actor.

---

#### 14. Firma o PIN no crean autoridad

Cuando exista firma, PIN u otro mecanismo de atribución:

```text
FIRMA VÁLIDA
→ IDENTIFICA / CONFIRMA ACTOR
```

pero nunca:

```text
FIRMA VÁLIDA
→ CREA PERMISO
→ CREA TURNO
→ CREA CHECK-IN
→ CREA SCOPE
→ APRUEBA COMPRA
```

La evidencia de firma debe permanecer correlacionada con el actor y el efecto empresarial correspondiente.

---

#### 15. Orden de resolución en recepción nueva

Antes del primer efecto de `receipts.register`, el sistema debe resolver como mínimo:

```text
PRINCIPAL
→ ACTOR EFECTIVO
→ SESIÓN / FIRMA CUANDO APLIQUE
→ TURNO
→ CHECK-IN
→ ROL OPERATIVO
→ GRANT
→ SEDE / ÁREA EFECTIVAS
→ OBJETIVO DE RECEPCIÓN
→ ORDEN O CAUSA CONTROLADA
→ MODALIDAD DE RECEPCIÓN
→ DECISIÓN
→ EFECTO
```

No se admite decidir el permiso para un principal técnico y atribuir después la recepción a un humano distinto.

---

#### 16. Territorio de recepción

La recepción física está ligada a una sede efectiva y, cuando corresponda, a un área efectiva.

La sede o área deben ser compatibles con:

- actor;
- turno;
- check-in;
- rol operativo;
- dispositivo cuando aplique;
- recurso de recepción;
- orden relacionada;
- reglas territoriales aplicables.

La certificación debe demostrar que:

```text
form.site_id
query.site_id
selected_site_id
preferredSiteId
preferredAreaId
employee.site_id
```

no son autoridad por sí mismos.

---

#### 17. Cola y formulario no conceden recepción

`VSCREEN-0076 — Cola de recepciones` y `VSCREEN-0077 — Recepción total o parcial` pueden presentar trabajo.

La visibilidad de la cola o del formulario no demuestra permiso.

Antes de registrar, el servidor debe volver a resolver:

- permiso exacto;
- actor;
- contexto `T+C`;
- territorio;
- recurso;
- elegibilidad de la orden o causa;
- estado.

UI oculta, visible o manipulada nunca es la fuente final de autoridad.

---

#### 18. Recepción ordinaria contra orden

Una recepción ordinaria solo puede registrarse contra una orden elegible y relacionada con la sede receptora.

Debe comprobarse al menos:

- identidad de orden válida;
- relación con la recepción;
- sede receptora autorizada;
- actor receptor atribuido;
- cantidades y líneas compatibles con el contrato aplicable;
- estado empresarial compatible;
- modalidad de recepción explícita.

Recibir la orden no cambia su historial de aprobación ni convierte al receptor en aprobador.

---

#### 19. Recepción directa o de emergencia

La ausencia de una orden ordinaria no elimina autorización.

Una recepción directa o de emergencia sigue requiriendo:

```text
receipts.register
+ T+C
+ ACTOR EFECTIVO
+ SEDE / ÁREA AUTORIZADAS
+ CAUSA CONTROLADA
+ EVIDENCIA
```

La regularización comercial, presupuestal o de aprobación permanece bajo su política propietaria.

La emergencia no autoriza autoaprobación por el receptor.

---

#### 20. Modo inventariable

Una recepción inventariable puede activar un handoff hacia los owners de inventario aplicables.

`receipts.register` no concede por sí sola autoridad general para:

- editar stock arbitrariamente;
- crear ubicaciones;
- reasignar LOC;
- mover inventario no relacionado;
- modificar posiciones;
- alterar costos fuera del contrato de recepción;
- ejecutar ajustes generales;
- modificar recursos ajenos.

El efecto físico debe permanecer correlacionado con la recepción autorizada y con el owner correspondiente.

---

#### 21. Modo `record_only`

`record_only` no mueve inventario, pero sí afirma un hecho empresarial de recepción.

Por tanto mantiene:

- permiso `receipts.register`;
- actor receptor;
- `T+C`;
- sede/área autorizadas;
- recurso válido;
- evidencia;
- idempotencia;
- auditoría.

La ausencia de movimiento físico no convierte el registro en una acción administrativa libre.

---

#### 22. Consulta y registro permanecen separados

`origo.procurement.receipts.view` y `origo.procurement.receipts.register` no son intercambiables.

Una lectura válida no concede mutación.

Un permiso de registro no debe convertirse en lectura global de recepciones.

La certificación debe usar el permiso exacto de cada operación.

---

#### 23. Reversión y corrección permanecen separadas

`receipts.register` autoriza una recepción nueva.

No autoriza:

- reversar una recepción existente;
- sustituir una recepción histórica;
- corregir silenciosamente una recepción confirmada;
- reutilizar una recepción nueva como bypass de reversión.

La reversión y el flujo correctivo conservan sus capacidades y contratos propietarios.

---

#### 24. Diferencias permanecen fuera de la recepción ordinaria

La recepción puede detectar:

- faltantes;
- sobrantes;
- producto distinto;
- condición incompatible;
- documento faltante;
- discrepancia de precio o cantidad;
- rechazo o aceptación condicionada.

Registrar esa observación no concede autoridad para resolverla.

La resolución de diferencias debe conservar actor, política y segregación propios.

---

#### 25. Efectos sobre la orden no son aprobación

Una recepción puede producir efectos derivados autorizados sobre cantidades recibidas o seguimiento de la orden.

Esos efectos no equivalen a:

- aprobar la compra;
- reaprobarla;
- editar destructivamente la orden aprobada;
- emitirla al proveedor;
- cancelar la orden;
- cambiar al receptor en aprobador.

Toda mutación derivada debe estar limitada por el contrato de recepción y no por una PermissionKey de aprobación implícita.

---

#### 26. Estado físico actual de `receipts.register`

El baseline compartido observado materializa seis identidades ORIGO activas e incluye:

```text
origo.procurement.receipts.register
```

Sin embargo, `ORIGO-AUTH-014` documenta un drift materializado:

```text
AS-IS:
receipts.register = BASE_OR_OPERATIONAL
+ grants base administrativos

TARGET APROBADO:
receipts.register = OPERATIONAL_ONLY
+ T+C
+ cero grants base
+ grants operativos aprobados
```

Consecuencia para esta certificación:

```text
PACKAGE QUE CONSERVE EL DRIFT
→ AUTH-QA-016 NO PUEDE DECLARAR PASS
```

La existencia física de la PermissionKey no basta; la modalidad, grants, contexto y semántica consumidos deben coincidir con el contrato objetivo.

---

#### 27. Estado físico actual de `purchase_orders.approve`

El mismo baseline observado todavía incluye `origo.procurement.purchase_orders.approve` entre las identidades objetivo no materializadas del package compartido.

Por tanto:

- no se inventa una superficie física de aprobación para forzar un test;
- cuando una ejecución por package no contenga materialmente la capacidad/superficie, el caso físico correspondiente se registra `NOT_APPLICABLE` con evidencia;
- cuando la capacidad quede materializada y adoptada, el receptor operativo sin autoridad base independiente deberá obtener `DENY`;
- `GLOBAL-FINAL` no puede certificar segregación completa hasta consolidar evidencia de todos los consumidores aplicables donde ambas fronteras sean verificables.

---

#### 28. Bypass por rol base prohibido

La certificación debe probar que los roles base administrativos no obtienen `receipts.register` únicamente por ser:

- `propietario`;
- `gerente_general`;
- `gerente`;
- `auxiliar_administrativa`;
- `contador`;
- otra identidad administrativa.

Si un humano con uno de esos roles también posee rol operativo autorizado, la recepción se justifica por el carril operativo completo, nunca por el rol base.

---

#### 29. Bypass por contexto cliente prohibido

Debe probarse que modificar únicamente:

- URL;
- query;
- `site_id`;
- `area_id`;
- `selected_site_id`;
- `preferredSiteId`;
- `preferredAreaId`;
- payload;
- formulario;
- estado local;
- cookie no autoritativa;

no cambia un `DENY` en `ALLOW`.

Todo valor cliente se trata como hint, selección o dato a validar, nunca como autoridad final.

---

#### 30. `origo.access` no es wildcard

`origo.access` permite entrada a la aplicación dentro de su contrato.

No equivale a:

```text
receipts.register
purchase_orders.approve
receipts.reverse
suppliers.update
stock global
```

Cada capacidad mantiene permiso, modalidad, contexto, recurso y alcance propios.

---

#### 31. Paridad de evaluadores

Para los mismos:

- principal;
- actor efectivo;
- actor receptor;
- rol base;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- dispositivo;
- PermissionKey;
- recurso;
- orden o causa de recepción;
- modalidad;
- estado;
- versión;

todos los evaluadores y canales aplicables deben preservar la misma decisión y razones equivalentes.

No se admite que UI o cliente bloqueen mientras Server Action, API, RPC o RLS permitan una ruta alternativa incompatible.

---

#### 32. Cero efectos en denegaciones

Todo caso `DENY` debe demostrar cero efectos sobre, según corresponda:

- recepción creada;
- líneas recibidas;
- cantidades recibidas;
- stock;
- movimientos;
- costos;
- estado de orden;
- aprobación;
- actor aprobador;
- firma;
- diferencia;
- reversión;
- estado empresarial protegido distinto de la evidencia de denegación.

La denegación sí debe conservar auditoría suficiente; cero efectos no significa cero evidencia.

Una respuesta de error después de un write parcial es fallo de certificación.

---

#### 33. Auditoría

La evidencia de cada caso debe permitir reconstruir como mínimo:

- package e identidad de ejecución;
- principal;
- actor efectivo;
- actor receptor;
- rol base;
- rol operativo;
- turno;
- check-in;
- sede;
- área;
- dispositivo;
- firma o referencia cuando aplique;
- PermissionKey solicitada;
- recurso;
- orden o causa controlada;
- modalidad de recepción;
- estado y versión;
- decisión;
- razones;
- efectos o cero efectos;
- versión contractual;
- timestamp.

La auditoría no sustituye la autorización previa.

---

#### 34. Casos mínimos obligatorios por package

| Caso | Acción o superficie | Condición diferencial | Resultado esperado |
| --- | --- | --- | --- |
| `AUTH-QA-016-A` | `receipts.register` | `bodeguero` con grant, actor, `T+C`, territorio y recurso válidos | `ALLOW` cuando el package materializado sea compatible con el contrato objetivo |
| `AUTH-QA-016-B` | `receipts.register` | `gerencia_operativa` con grant, actor, `T+C`, territorio y recurso válidos | `ALLOW` dentro de sede/recurso autorizados; nunca global |
| `AUTH-QA-016-C` | `receipts.register` | mismo actor sin check-in compatible | `DENY`, cero efecto |
| `AUTH-QA-016-D` | `receipts.register` | rol base administrativo sin carril operativo | `DENY`, cero efecto |
| `AUTH-QA-016-E` | `purchase_orders.approve` | receptor operativo sin autoridad base independiente | `DENY` cuando la capacidad esté materializada; `NOT_APPLICABLE` si no existe en el package |
| `AUTH-QA-016-F` | recepción + aprobación | mismo humano con dos autoridades independientes | aprobación se reevalúa por carril base, política y segregación; recepción no constituye fuente del allow |
| `AUTH-QA-016-G` | `receipts.register` | `site_id` o `area_id` manipulado por cliente | `DENY` o contexto resuelto sin ampliación; cero efecto indebido |
| `AUTH-QA-016-H` | recepción compartida | principal dispositivo válido pero actor humano ausente/ambiguo | `DENY`, cero efecto |
| `AUTH-QA-016-I` | `record_only` | actor válido con `T+C` | exige la misma autorización de recepción aunque no mueva inventario |
| `AUTH-QA-016-J` | diferencia | receptor intenta resolverla solo por `receipts.register` | `DENY` para la decisión reservada; recepción no amplía autoridad |
| `AUTH-QA-016-K` | reversión/corrección | receptor intenta usar `receipts.register` sobre recepción previa | `DENY`, cero efecto correctivo |
| `AUTH-QA-016-L` | baseline con drift | `receipts.register` conserva grants base o modalidad distinta de `OPERATIONAL_ONLY` | certificación `FAIL`; no se acepta como paridad objetivo |

Si una superficie necesaria para un caso condicional no existe materialmente en el package, se registra `NOT_APPLICABLE` con evidencia. No se inventa una superficie para forzar ejecución.

---

#### 35. Clasificación de fallos

Un fallo de `AUTH-QA-016` se clasifica por la frontera rota:

- `RECEIPT_REGISTER_BASE_BYPASS` — rol base autoriza recepción sin carril operativo;
- `RECEIPT_REGISTER_CONTEXT_BYPASS` — recepción sin `T+C` válido;
- `RECEIPT_REGISTER_ROLE_BYPASS` — rol operativo no autorizado recibe grant o efecto;
- `RECEIPT_ACTOR_MISMATCH` — permiso, firma y efecto se atribuyen a actores distintos;
- `SHARED_DEVICE_PRINCIPAL_AS_ACTOR` — principal técnico sustituye al humano;
- `CLIENT_CONTEXT_ESCALATION` — datos cliente amplían sede, área o autoridad;
- `RECEIVER_APPROVAL_ESCALATION` — recepción concede aprobación de compra;
- `APPROVAL_SOURCE_MIXUP` — una aprobación usa recepción, turno o rol operativo como fuente de autoridad;
- `RECEIPT_REVERSE_BYPASS` — `receipts.register` se usa para reversión/corrección;
- `DIFFERENCE_RESOLUTION_BYPASS` — receptor resuelve una diferencia sin autoridad propietaria;
- `GENERAL_INVENTORY_ESCALATION` — recepción concede inventario general fuera del handoff;
- `MATERIALIZED_CONTRACT_DRIFT` — package consume modalidad o grants distintos del contrato objetivo;
- `PARTIAL_EFFECT_ON_DENY` — una denegación conserva writes parciales;
- `EVALUATOR_DIVERGENCE` — canales aplicables producen decisiones incompatibles;
- `AUDIT_GAP` — no puede reconstruirse actor, contexto, decisión o efecto.

La clasificación no crea nuevos reason codes públicos ni modifica contratos de error.

---

#### 36. Modelo de ejecución por paquete

Cada package que materialice superficies afectadas ejecutará:

```text
AUTH-QA-016::<package_id>
```

únicamente después de que:

- el package aplicable exista;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias físicas aplicables estén disponibles;
- la instancia se encuentre autorizada conforme al lifecycle físico correspondiente;
- el contrato materializado sea identificable y comparable con el target aprobado.

Esta tarea documental no selecciona package ni abre una instancia física.

---

#### 37. Certificación global final

La certificación:

```text
AUTH-QA-016::GLOBAL-FINAL
```

consolida evidencia de packages aplicables y demuestra que la frontera recepción versus aprobación es uniforme entre consumidores.

Debe fallar si existe al menos un consumidor aplicable donde:

- `receipts.register` pueda autorizarse por rol base sin carril operativo;
- se omita `T+C` donde es obligatorio;
- un principal técnico sustituya al receptor humano;
- `site_id` o `area_id` cliente creen autoridad;
- una recepción conceda o ejecute aprobación;
- `purchase_orders.approve` use turno, check-in o rol operativo como fuente de autoridad;
- `receipts.register` permita reversión, corrección o resolución de diferencias reservadas;
- la modalidad materializada difiera del contrato objetivo;
- una denegación produzca efectos parciales;
- no exista evidencia suficiente para reconstruir la decisión.

---

#### 38. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por requisitos canónicos vigentes y no introduce una obligación verificable nueva.

---

#### 39. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AUTH-001` — autorización final por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-008` — separación entre capacidades administrativas y operativas, con turno/check-in cuando el contrato lo exige;
- `TREQ-AUTH-010` — segregación de funciones, incluyendo expresamente que compras crea según alcance y recepción recibe sin aprobar;
- `TREQ-AUTH-013` — cada mutación revalida server-side permiso, principal, actor, territorio, contexto, estado y columnas/efectos;
- `TREQ-AUTH-015` — evidencia correlacionable de principal, actor, rol, turno, check-in, territorio, dispositivo, permiso, recurso, decisión y razones;
- `TREQ-ORIGO-001` — modalidad de recepción visible/auditable y protección contra duplicación de efectos;
- `TREQ-ORIGO-002` — órdenes limitadas por permiso, territorio, estado y columnas;
- `TREQ-ORIGO-003` — recepción atómica, idempotente, correlacionable y reconciliable;
- `TREQ-ORIGO-004` — separación de necesidad, solicitud, selección, aprobación, orden, comprador, aprobador y receptor.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 40. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no fue incorporado todavía al checkout del usuario; build, typecheck, lint y suites físicas corresponden a la incorporación y a las instancias posteriores. |
| LOCAL | NOT_EXECUTED | No se ejecutaron todavía formato, quality, delivery, topología, batería global, TREQ ni lifecycle documental sobre el owner modificado. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, continuidad hacia `AUTH-QA-016`, topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `ORIGO-AUTH-006`, `ORIGO-AUTH-007`, `ORIGO-AUTH-011`, `ORIGO-AUTH-012`, `ORIGO-AUTH-013`, `ORIGO-AUTH-014`, la modalidad objetivo `OPERATIONAL_ONLY` + `T+C`, los grants operativos objetivo de `bodeguero` y `gerencia_operativa`, la separación con `purchase_orders.approve`, el drift físico actual de `receipts.register` y la cobertura existente del Registro 04A. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recepciones, aprobaciones, firmas, diferencias, reversiones, movimientos de inventario, turnos, check-ins ni casos de dispositivo compartido. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-016::<package_id>` ni `AUTH-QA-016::GLOBAL-FINAL`; ambas identidades permanecen sujetas al lifecycle físico y al gate aplicable. |

---

#### 41. Criterios de aceptación

- [ ] `RECEPCION_EN_SEDE` permanece responsabilidad funcional y no se convierte en grant.
- [ ] `origo.procurement.receipts.register` es la PermissionKey exacta de recepción nueva.
- [ ] `receipts.register` protege `PURCHASE_RECEIPT` o su objetivo suficientemente determinado.
- [ ] La modalidad objetivo de `receipts.register` es `OPERATIONAL_ONLY`.
- [ ] El prerrequisito operativo es `T+C`.
- [ ] `bodeguero` conserva el grant operativo objetivo dentro de su territorio y recurso.
- [ ] `gerencia_operativa` conserva el grant operativo objetivo sin alcance global.
- [ ] Ningún rol base recibe `receipts.register` por sí solo.
- [ ] Un actor administrativo solo recibe cuando además resuelve un carril operativo completo válido.
- [ ] `purchase_orders.approve` permanece `BASE_ONLY` y separado.
- [ ] Turno, check-in, dispositivo o rol operativo no conceden aprobación.
- [ ] El actor receptor se resuelve y atribuye de forma explícita.
- [ ] En shared device, principal técnico y actor humano permanecen separados.
- [ ] Firma/PIN no crean permiso, contexto ni aprobación.
- [ ] Cola y formulario no sustituyen el check server-side.
- [ ] `site_id`, `area_id`, selected/preferred site o payload cliente no crean autoridad.
- [ ] Recepción ordinaria exige orden/caso elegible y territorio compatible.
- [ ] Recepción directa/emergencia conserva permiso, `T+C`, actor y causa controlada.
- [ ] `record_only` mantiene autorización completa aunque no mueva inventario.
- [ ] Modo inventariable no concede inventario general.
- [ ] `receipts.register` no autoriza reversión, corrección ni resolución de diferencias.
- [ ] Registrar recepción no aprueba ni emite la orden.
- [ ] Autoridad administrativa independiente, cuando exista, se reevalúa aparte y respeta segregación.
- [ ] El drift físico actual de `receipts.register` se trata como incompatibilidad que impide PASS, no como contrato vigente.
- [ ] La ausencia física de `purchase_orders.approve` se registra `NOT_APPLICABLE` por package cuando corresponda, sin inventar superficie.
- [ ] Toda denegación conserva cero efectos parciales.
- [ ] Los evaluadores aplicables conservan decisiones equivalentes.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 42. Límites

Esta tarea no:

- redefine `ORIGO-AUTH-006` ni `ORIGO-AUTH-007`;
- crea o modifica PermissionKey;
- corrige físicamente el drift de `receipts.register`;
- modifica grants base u operativos;
- materializa `purchase_orders.approve`;
- inventa un rol operativo `recepcion`;
- convierte `RECEPCION_EN_SEDE` en permiso;
- redefine política de aprobación;
- define umbrales económicos;
- autoriza autoaprobación;
- redefine reversión o corrección;
- redefine resolución de diferencias;
- redefine el ledger físico de inventario;
- implementa firma o PIN;
- modifica UI o navegación;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos o datasets;
- ejecuta `AUTH-QA-015::<package_id>`;
- ejecuta `AUTH-QA-016::<package_id>`;
- ejecuta `AUTH-QA-016::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- modifica el Registro 04A.

---

#### 43. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-015 — Compras puede crear órdenes según alcance`

**TAREA ACTUAL APROBADA**
`AUTH-QA-016 — Recepción puede recibir pero no aprobar compras`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado`
### ✅ AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-016 — Recepción puede recibir pero no aprobar compras
**Tarea siguiente:** AUTH-QA-018 — PIN identifica al trabajador real
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización para dispositivos compartidos, reutilizable por paquete y certificable globalmente, para demostrar que el principal técnico, el administrador que configuró o abrió el terminal, una sesión administrativa previa, el trabajador anterior, `navigation_role`, las aplicaciones visibles y cualquier estado residual no transfieren autoridad al actor humano actual, y que incluso un administrador humano vigente con autoridad base legítima solo puede actuar dentro de la intersección entre su propia autoridad y el techo efectivo del dispositivo
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-017::<package_id>` y la certificación `AUTH-QA-017::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; ninguna identidad de dispositivo observada, configurada o futura se declara certificada por esta definición documental
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra packages, aplicaciones, dispositivos, sesiones, actores, permisos, Supabase, datos, RLS, RPC, Server Actions, terminales, PIN, reautenticación, auditoría ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un dispositivo compartido actúa únicamente como restricción adicional de la autoridad humana y nunca como origen, suma, persistencia o transferencia de privilegios administrativos.

La regla raíz queda:

```text
ACTOR HUMANO ACTUAL RESUELTO
+ AUTORIDAD PROPIA DEL ACTOR
+ TECHO EFECTIVO DEL DISPOSITIVO
+ APLICACIÓN EFECTIVA
+ MODO DE SESIÓN COMPATIBLE
+ TERRITORIO COMPATIBLE
+ RECURSO Y ESTADO COMPATIBLES
+ PRERREQUISITOS Y CONTROLES REQUERIDOS
+ CERO DENEGACIONES APLICABLES
→ CAPACIDAD CANDIDATA AUTORIZABLE
```

Y simultáneamente:

```text
PRINCIPAL TÉCNICO
O ADMINISTRADOR CONFIGURADOR
O SESIÓN ADMINISTRATIVA PREVIA
O TRABAJADOR ANTERIOR
O navigation_role
O APP VISIBLE
O PLANTILLA / PAQUETE
O ESTADO RESIDUAL
→ NO APORTA AUTORIDAD EMPRESARIAL AL ACTOR ACTUAL
```

La prueba debe demostrar tanto la ausencia de herencia como el carácter restrictivo del dispositivo sobre la autoridad legítima del actor actual.

---

#### 2. Resultado canónico

La tarea deja definidos treinta resultados obligatorios:

1. el dispositivo compartido es un principal técnico y no un actor empresarial;
2. toda acción empresarial desde dispositivo compartido exige un actor humano resoluble cuando el contrato lo requiera;
3. la autoridad del actor humano se resuelve independientemente del dispositivo;
4. el dispositivo solo puede restringir una capacidad que el actor ya posee;
5. una clave incluida en el techo del dispositivo no crea `ALLOW` si el actor no posee la autoridad correspondiente;
6. una clave fuera del techo produce `DENY` aunque el actor humano posea legítimamente la capacidad;
7. el administrador que creó, enroló, abrió, configuró, reparó o soportó el dispositivo no presta privilegios al actor siguiente;
8. una sesión administrativa personal previa no complementa la autoridad del actor actual;
9. el trabajador anterior no presta rol, permiso, cobertura, alcance, reautenticación, firma ni decisión cacheada al trabajador siguiente;
10. `navigation_role` permanece fuera de autorización;
11. una aplicación visible o permitida no concede `<app>.access` ni capacidades internas;
12. una plantilla o paquete del dispositivo es techo restrictivo y no grant;
13. sede y área físicas del dispositivo restringen territorio y nunca crean cobertura administrativa humana;
14. cookies, almacenamiento local, parámetros, cabeceras, cachés, snapshots o estado de interfaz no restauran autoridad administrativa;
15. una credencial técnica privilegiada, `service_role` o cliente administrativo no crea autoridad empresarial;
16. el actor administrativo actual puede ejercer únicamente su propia capacidad base válida dentro del techo del dispositivo;
17. `management_terminal` no concede administración por ser terminal administrativa;
18. `procurement_reception` conserva modos administrativo y operativo excluyentes y no fusiona carriles;
19. una capacidad `BASE_ONLY` no se vuelve operativa por ejecutarse en un dispositivo compartido;
20. una capacidad operativa no adquiere carril base porque el actor tenga rol administrativo;
21. una capacidad `STANDARD_ACTOR_SESSION` conserva actor y contexto válidos;
22. una capacidad `STRONG_REAUTH_REQUIRED` exige reautenticación fuerte personal y soporte real del dispositivo;
23. un PIN o firma ligera no satisface reautenticación fuerte ni crea autoridad administrativa;
24. una capacidad `NOT_ALLOWED` permanece excluida aunque el actor la posea fuera de ese dispositivo;
25. una denegación aplicable prevalece sobre cualquier allow candidato;
26. cambios de actor, sesión, permiso, cobertura, aplicación, dispositivo, territorio, recurso o techo invalidan decisiones incompatibles o stale;
27. toda denegación conserva cero efectos empresariales y sí conserva evidencia de auditoría cuando corresponda;
28. la certificación por package solo evalúa superficies e identidades materialmente presentes;
29. no se crean ni modifican requisitos de prueba;
30. no se ejecuta ningún cambio físico desde esta tarea documental.

---

#### 3. Autoridad contractual vigente

La prueba consume como autoridad vigente:

- separación entre principal técnico, dispositivo y actor humano;
- identificación humana y sesión/firma definidas por el BLOQUE P;
- intersección restrictiva definida por `AUTH-DEV-008`;
- prohibición de herencia administrativa definida por `AUTH-DEV-009`;
- trazabilidad conjunta definida por `AUTH-DEV-010`;
- matriz restrictiva de plantillas e instancias de `AUTH-RBAC-023`;
- modelo canónico de roles base, roles operativos, permisos, coberturas y denegaciones;
- contrato de dispositivo compartido del contexto efectivo;
- topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- gate `POST_E5_PACKAGE`.

La prueba no utiliza como autoridad listas locales de roles, identidad visual del terminal, `navigation_role`, rutas, nombres de aplicaciones ni privilegios técnicos de infraestructura.

---

#### 4. Semántica exacta de “administrador autenticado”

El título no significa que el dispositivo posea un administrador empresarial propio.

La certificación distingue tres situaciones:

```text
A. PRINCIPAL TÉCNICO DEL DISPOSITIVO
→ identidad técnica
→ no aporta permisos empresariales

B. ADMINISTRADOR QUE CONFIGURÓ / ABRIÓ / SOPORTÓ EL TERMINAL
→ actor histórico distinto del trabajador actual
→ no transfiere autoridad

C. ADMINISTRADOR HUMANO ACTUAL
→ puede poseer autoridad base legítima propia
→ esa autoridad sigue limitada por techo, aplicación, territorio, recurso y controles del dispositivo
```

La prueba falla si cualquiera de esas tres identidades se fusiona o si la autoridad de una se usa como sustituto de otra.

---

#### 5. Principal técnico no es actor empresarial

En dispositivo compartido:

```text
principal_type = SHARED_DEVICE
```

identifica la credencial o principal técnico que autentica al terminal.

No implica:

- rol base;
- rol operativo;
- turno;
- check-in;
- permiso;
- cobertura administrativa;
- autoridad de firma humana;
- actor empresarial final.

Una operación técnicamente ejecutable por el principal no es por ese hecho una operación empresarial autorizada.

---

#### 6. Autoridad del actor y techo del dispositivo

La regla de autorización candidata es una intersección, no una unión:

```text
AUTORIDAD EFECTIVA DEL ACTOR
∩
TECHO EFECTIVO DEL DISPOSITIVO
∩
APLICACIÓN EFECTIVA
∩
MODO DE SESIÓN
∩
TERRITORIO
∩
RECURSO
∩
PRERREQUISITOS
∩
CONTROLES DE SENSIBILIDAD
∩
AUSENCIA DE DENEGACIONES
```

Debe demostrarse:

```text
ACTOR TIENE CAPACIDAD + DISPOSITIVO NO LA ADMITE
→ DENY

DISPOSITIVO ADMITE CAPACIDAD + ACTOR NO LA TIENE
→ DENY

ACTOR TIENE CAPACIDAD + DISPOSITIVO LA ADMITE + RESTO DE CONDICIONES VÁLIDAS
→ ALLOW POSIBLE
```

El dispositivo nunca completa una condición humana ausente.

---

#### 7. Administrador configurador no transfiere privilegios

La prueba debe demostrar que el actor que:

- creó la instancia;
- enroló el dispositivo;
- instaló o configuró una aplicación;
- seleccionó sede, área o plantilla;
- abrió una sesión técnica persistente;
- ejecutó soporte o reparación;
- dejó una superficie administrativa abierta;
- emitió una consulta o decisión anterior;

no se convierte en fuente de autoridad del trabajador humano actual.

La administración técnica del terminal y la autoridad empresarial del actor son dominios separados.

---

#### 8. Sesión administrativa previa no complementa al actor actual

Una sesión personal o administrativa previa no puede aportar al actor actual:

- rol base;
- permisos;
- cobertura;
- alcance;
- reautenticación;
- firma;
- decisiones cacheadas;
- actor efectivo;
- recurso autorizado.

Al operar como dispositivo compartido, el principal técnico y el actor humano se resuelven conforme al contrato de dispositivo. El estado de una sesión personal anterior no se suma al nuevo contexto.

---

#### 9. Trabajador anterior no presta autoridad

Cuando cambia el actor humano, el nuevo trabajador no hereda del anterior:

- rol base;
- rol operativo;
- permisos;
- cobertura administrativa;
- turno;
- check-in;
- sede o área operativa;
- excepciones;
- reautenticaciones;
- firmas;
- decisiones de permiso;
- autorizaciones de procesos que requieran al actor original.

La limpieza y transición completa de sesión pertenece a su contrato propietario, pero `AUTH-QA-017` certifica que ninguna autoridad anterior sea utilizable como fuente del nuevo actor.

---

#### 10. Administrador humano actual también queda limitado

La prohibición de herencia no bloquea administración legítima desde un dispositivo compartido.

Un administrador humano actual puede ejecutar una capacidad administrativa solo cuando:

```text
ACTOR HUMANO ACTUAL
+ CAPACIDAD BASE PROPIA
+ COBERTURA ADMINISTRATIVA DEL MISMO ACTOR
+ RECURSO Y ESTADO COMPATIBLES
+ CAPACIDAD DENTRO DEL TECHO DEL DISPOSITIVO
+ APLICACIÓN PERMITIDA
+ TERRITORIO COMPATIBLE
+ REAUTENTICACIÓN FUERTE CUANDO APLIQUE
+ CERO DENEGACIONES
→ ALLOW POSIBLE
```

Si el actor posee una capacidad administrativa fuera del techo del terminal, la decisión es `DENY` para ese dispositivo.

Esta es la prueba directa de que el dispositivo limita incluso al administrador autenticado.

---

#### 11. `management_terminal`

La plantilla administrativa `management_terminal` conserva una superficie limitada y no constituye un bypass.

La certificación debe comprobar que:

- solo las aplicaciones admitidas por la política efectiva del terminal pueden participar;
- la autoridad procede del actor humano actual;
- el actor necesita el permiso base exacto;
- la cobertura administrativa procede del actor, no de la ubicación física;
- la plantilla no concede un rol global;
- una capacidad fuera del techo se deniega aunque el actor la posea en otro contexto;
- una capacidad sensible exige sus controles reforzados;
- el principal técnico del terminal nunca aparece como administrador empresarial final.

---

#### 12. `procurement_reception` mantiene modos excluyentes

La plantilla `procurement_reception` puede exponer un modo administrativo y un modo operativo, pero no puede fusionarlos.

La certificación exige:

```text
MODO ADMINISTRATIVO
→ autoridad base propia del actor
→ sin fabricar turno o rol operativo

MODO OPERATIVO
→ autoridad operativa propia del actor
→ turno / check-in / rol / territorio según contrato

PROHIBIDO
→ mezclar piezas de ambos carriles para fabricar ALLOW
```

Una decisión administrativa previa no completa un carril operativo incompleto, y una operación válida no crea autoridad administrativa.

---

#### 13. Terminales operativas no adquieren administración

Las terminales operativas o mixtas no reciben autoridad administrativa por:

- tipo o nombre de terminal;
- ubicación;
- aplicación instalada;
- actor que las configuró;
- `navigation_role`;
- amplitud del paquete;
- haber sido utilizadas antes por un administrador.

Esto aplica, entre otras, a superficies satélite, producción, bodega, logística y coordinación operativa.

---

#### 14. Aplicación visible no equivale a permiso

Una aplicación visible o permitida solo habilita la posibilidad de exponer una superficie dentro del dispositivo.

No implica:

```text
APP VISIBLE
→ <app>.access
→ capacidades internas
→ cobertura administrativa
```

Cada capacidad mantiene su PermissionKey, modalidad, actor, cobertura, recurso, territorio, sensibilidad y denegaciones.

---

#### 15. `navigation_role` no participa en autorización

`navigation_role` puede orientar presentación o navegación.

No puede determinar:

- actor efectivo;
- rol base;
- rol operativo;
- permiso;
- cobertura administrativa;
- sede o área autorizada;
- capacidad ejecutable;
- decisión final.

Cambiar únicamente `navigation_role` sin cambiar las fuentes autoritativas no puede transformar un `DENY` en `ALLOW`.

---

#### 16. Territorio del dispositivo solo restringe

Sede, área o conjunto territorial asociado al dispositivo funcionan como restricciones adicionales.

La certificación debe demostrar:

```text
TERRITORIO DEL ACTOR
∩
TERRITORIO DEL DISPOSITIVO
∩
TERRITORIO DEL RECURSO
→ TERRITORIO UTILIZABLE
```

El sitio físico del dispositivo no crea cobertura administrativa del actor y un área permitida por la instancia no crea el área operativa del trabajador.

---

#### 17. Estado residual del cliente no restaura autoridad

No pueden utilizarse como fuente de autoridad:

- cookies de una sesión anterior;
- local/session storage;
- estado React u otro estado de interfaz;
- parámetros de ruta o query;
- cabeceras controladas por cliente;
- snapshots antiguos;
- filtros seleccionados;
- último actor;
- último PIN;
- última sede o área;
- decisiones cacheadas para otro actor, aplicación o recurso.

El estado persistente puede orientar experiencia cuando el contrato lo permita, pero nunca restaurar privilegios empresariales.

---

#### 18. Infraestructura privilegiada no crea autoridad empresarial

`service_role`, admin clients, funciones privilegiadas o procesos internos pueden poseer capacidad técnica de ejecución.

Eso no sustituye:

- actor humano efectivo;
- permiso empresarial;
- cobertura;
- recurso;
- contexto;
- segregación;
- auditoría.

La certificación falla si la existencia de privilegio técnico se usa como explicación suficiente de una mutación empresarial.

---

#### 19. PIN, firma ligera y reautenticación fuerte

Un PIN o firma ligera puede identificar al humano real o producir evidencia de atribución conforme a su contrato.

No puede:

- conceder permisos;
- crear cobertura administrativa;
- crear turno;
- crear check-in;
- ampliar el techo del dispositivo;
- sustituir una reautenticación fuerte.

Cuando una capacidad sea `STRONG_REAUTH_REQUIRED`, debe existir evidencia fuerte personal válida para el mismo actor y uso compatible.

Una capacidad `NOT_ALLOWED` permanece denegada universalmente desde ese dispositivo.

---

#### 20. Denegaciones prevalecen

Ninguna de estas condiciones puede vencer un deny aplicable:

- actor con rol administrativo amplio;
- terminal administrativa;
- aplicación permitida;
- permiso presente en otra sede;
- principal técnico privilegiado;
- PIN válido;
- reautenticación de otro actor o recurso;
- decisión cacheada previa.

La precedencia conserva:

```text
DENY APLICABLE
→ DENY
```

sin suma posterior de autoridad.

---

#### 21. Universo canónico de 19 identidades de dispositivo

La certificación conserva el universo heredado de diecinueve identidades y no inventa dispositivos adicionales:

| Identidad | Clase / estado documental | Regla de certificación de `AUTH-QA-017` |
| --- | --- | --- |
| `configured_device:CAJA_VENTO_CAFE_01` | `CONFIGURED_INSTANCE` / `REGISTERED_UNVERIFIED` | el usuario técnico, navegación, apps y sesiones previas no conceden autoridad; actor y techo se resuelven independientemente |
| `configured_device:KIOSCO_BODEGA_CP` | `CONFIGURED_INSTANCE` / `REGISTERED_UNVERIFIED` | misma sede y política legacy no crean autoridad administrativa; solo actor actual dentro del techo |
| `physical_observation:VENTO_CAFE/SERVICIO/tablet_compartida` | `PHYSICAL_OBSERVATION` / `OBSERVED_ONLY` | no se infiere administrador, actor, rol ni permiso hasta existir identidad canónica materializada |
| `physical_observation:SAUDO/SERVICIO/dispositivo_compartido` | `PHYSICAL_OBSERVATION` / `OBSERVED_ONLY` | el uso histórico o cuenta compartida no constituye autoridad |
| `target_template:pos_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | no hereda privilegios del configurador ni de actores previos |
| `target_template:bar_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | apps, plantilla y navegación no crean administración |
| `target_template:kitchen_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | no reutiliza autoridad de caja, gerencia u otro trabajador |
| `target_template:service_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | cuenta compartida o pantalla abierta no equivalen a autoridad |
| `target_template:counter_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | proximidad con caja, servicio o administrador no concede privilegios |
| `target_template:integrated_satellite` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | integrar funciones no suma roles o permisos de otros perfiles |
| `target_template:production_kitchen` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | producción no hereda administración ni autoridad de otras áreas |
| `target_template:production_bakery` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | solo autoridad propia del actor y área exacta |
| `target_template:production_pastry` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | solo autoridad propia del actor y área exacta |
| `target_template:warehouse_kiosk` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | ubicación, `navigation_role` y política legacy no crean administración |
| `target_template:logistics_vehicle_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | vehículo, ruta y sedes visitadas no transfieren autoridad administrativa |
| `target_template:procurement_reception` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | modos administrativo y operativo permanecen excluyentes |
| `target_template:operations_management_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | amplitud de superficie no crea rol base ni cobertura administrativa |
| `target_template:management_terminal` | `TARGET_TEMPLATE` / `POLICY_DEFINED` | solo permisos base y cobertura del actor actual dentro del techo |
| `retired_legacy_template:production_center` | `RETIRED_LEGACY_TEMPLATE` / `NO_APLICA` | su historia no puede reactivar ni trasladar privilegios |

La clasificación heredada se conserva; esta tarea solo define cómo certificar la frontera de autoridad.

---

#### 22. Configuraciones y observaciones no equivalen a certificación

Las dos identidades `configured_device:*` permanecen registradas pero no verificadas integralmente.

Las dos `physical_observation:*` son observaciones físicas y no identidades canónicas operables por inferencia.

Por tanto:

- la existencia de una fila o configuración no produce `PASS` de runtime;
- una observación física no se promociona a dispositivo canónico;
- una plantilla objetivo no ejecuta acciones por sí sola;
- un caso físico se marca `NOT_APPLICABLE` cuando la superficie necesaria no está materializada en el package evaluado.

---

#### 23. Cambio de actor y decisiones stale

Cuando cambia cualquiera de estos elementos:

- actor humano;
- sesión de actor;
- principal técnico;
- dispositivo;
- estado del dispositivo;
- permiso o deny;
- cobertura administrativa;
- turno o rol operativo cuando apliquen;
- aplicación;
- sede o área;
- recurso;
- techo o versión de política;
- reautenticación;

la decisión previa no puede reutilizarse si el cambio puede alterar su resultado.

Un `ALLOW` histórico nunca funciona como autoridad autónoma.

---

#### 24. Recurso, estado y acción exactos permanecen obligatorios

La autoridad administrativa o operativa se evalúa sobre una acción y recurso concretos.

El dispositivo no permite convertir:

- acceso a aplicación en wildcard;
- visibilidad en mutación;
- cobertura de sede en cobertura global;
- una decisión sobre recurso A en autoridad sobre recurso B;
- un permiso sobre estado A en transición sobre estado B.

Toda acción protegida debe revalidar las dimensiones que su contrato exige antes del efecto.

---

#### 25. Cero efectos empresariales y auditoría obligatoria

Todo caso negativo debe demostrar cero efectos empresariales sobre el recurso objetivo.

Cuando el contrato de auditoría lo exija, la denegación conserva evidencia correlacionable de:

- package e identidad de ejecución;
- principal técnico;
- dispositivo;
- actor humano o estado `UNRESOLVED`;
- sesión de actor cuando aplique;
- rol base y operativo relevantes;
- turno y check-in cuando correspondan;
- sede y área;
- aplicación;
- PermissionKey;
- techo o política efectiva;
- recurso y estado;
- decisión;
- razones;
- cero efecto;
- versión contractual;
- timestamp.

Registrar la denegación no constituye un efecto empresarial sobre el recurso protegido.

---

#### 26. Casos mínimos obligatorios por package

| Caso | Condición diferencial | Resultado esperado |
| --- | --- | --- |
| `AUTH-QA-017-A` | actor administrativo actual posee capacidad y la capacidad está dentro del techo, cobertura y contexto válidos | `ALLOW` posible solo por autoridad propia del actor |
| `AUTH-QA-017-B` | mismo actor posee capacidad pero está fuera del techo del dispositivo | `DENY`, cero efecto |
| `AUTH-QA-017-C` | trabajador operativo usa terminal configurada o abierta por administrador | no hereda autoridad administrativa |
| `AUTH-QA-017-D` | permanece sesión administrativa previa | la sesión previa no complementa al actor actual |
| `AUTH-QA-017-E` | trabajador anterior poseía mayor autoridad | actor nuevo no hereda rol, permisos, cobertura ni decisiones |
| `AUTH-QA-017-F` | `navigation_role` anuncia rol privilegiado | sin cambio de autoridad efectiva |
| `AUTH-QA-017-G` | aplicación administrativa visible | no concede acceso ni capacidades sin permiso del actor |
| `AUTH-QA-017-H` | sede/área del dispositivo más amplia que cobertura del actor | la intersección conserva el territorio menor; fuera de él `DENY` |
| `AUTH-QA-017-I` | principal técnico o backend usa credencial privilegiada | privilegio técnico no crea autoridad empresarial |
| `AUTH-QA-017-J` | capacidad exige `STRONG_REAUTH_REQUIRED` y solo existe PIN/firma ligera | `DENY`, cero efecto |
| `AUTH-QA-017-K` | capacidad clasificada `NOT_ALLOWED` | `DENY` aunque el actor la posea en otro contexto |
| `AUTH-QA-017-L` | cambio de actor después de una decisión candidata | decisión stale no reutilizable; reevaluación obligatoria |
| `AUTH-QA-017-M` | dispositivo activo sin actor humano requerido | ninguna acción empresarial ejecutable |
| `AUTH-QA-017-N` | `management_terminal` con actor sin permiso base exacto | `DENY`, sin bypass por tipo de terminal |
| `AUTH-QA-017-O` | `procurement_reception` mezcla piezas de modo administrativo y operativo | `DENY`, sin autoridad híbrida |

Si la superficie necesaria para un caso no existe materialmente en el package, el caso se registra `NOT_APPLICABLE` con evidencia. No se inventa una superficie ni un grant para forzar ejecución.

---

#### 27. Clasificación de fallos

Un fallo de `AUTH-QA-017` se clasifica por la frontera rota:

- `TECHNICAL_PRINCIPAL_PRIVILEGE_TRANSFER` — el principal técnico aporta autoridad empresarial;
- `ADMIN_CONFIGURATOR_PRIVILEGE_TRANSFER` — el administrador configurador presta privilegios al actor actual;
- `PRIOR_ADMIN_SESSION_REUSE` — una sesión administrativa previa complementa al actor actual;
- `PREVIOUS_ACTOR_AUTHORITY_REUSE` — el nuevo trabajador hereda autoridad del anterior;
- `DEVICE_CEILING_BYPASS` — el actor ejecuta una capacidad fuera del techo;
- `DEVICE_GRANT_CREATION` — plantilla, paquete o dispositivo se tratan como grant;
- `NAVIGATION_ROLE_AUTHORITY` — `navigation_role` participa en autorización;
- `VISIBLE_APP_AUTHORITY` — una app visible o permitida concede capacidad;
- `DEVICE_TERRITORY_ESCALATION` — sede o área del dispositivo amplían cobertura humana;
- `PRIVILEGED_INFRA_AUTHORITY` — `service_role` o admin client sustituyen autoridad empresarial;
- `LIGHT_PIN_STRONG_BYPASS` — PIN/firma ligera satisfacen indebidamente STRONG;
- `NOT_ALLOWED_BYPASS` — una capacidad excluida resulta ejecutable;
- `LANE_MIXING` — se mezclan carriles administrativo y operativo para fabricar allow;
- `STALE_AUTHORITY_REUSE` — se reutiliza una decisión después de un cambio material;
- `PARTIAL_EFFECT_ON_DENY` — una denegación produce efecto empresarial parcial;
- `AUDIT_ATTRIBUTION_GAP` — no puede distinguirse principal, dispositivo, actor o fuente de autoridad.

La clasificación es diagnóstica y no crea nuevos reason codes públicos.

---

#### 28. Modelo de ejecución por paquete

Cada package que materialice superficies afectadas ejecutará:

```text
AUTH-QA-017::<package_id>
```

únicamente cuando:

- el package aplicable exista;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias físicas aplicables estén disponibles;
- las superficies necesarias estén materializadas;
- la instancia se encuentre autorizada conforme al lifecycle físico correspondiente.

Esta tarea documental no selecciona package, no abre una instancia física y no altera el estado de readiness.

---

#### 29. Certificación global final

La certificación:

```text
AUTH-QA-017::GLOBAL-FINAL
```

consolida evidencia de todos los packages aplicables y debe demostrar que la política de dispositivo compartido es restrictiva de forma uniforme entre consumidores.

Debe fallar si existe al menos un consumidor aplicable donde:

- el principal técnico actúe como administrador empresarial;
- el administrador configurador transfiera autoridad;
- el actor actual reutilice una sesión administrativa previa;
- el trabajador nuevo herede autoridad del anterior;
- una capacidad fuera del techo pueda ejecutarse;
- una app, plantilla o `navigation_role` concedan autoridad;
- el territorio del dispositivo amplíe cobertura;
- STRONG se degrade a PIN ligero;
- `NOT_ALLOWED` sea ejecutable;
- carriles administrativo y operativo se mezclen;
- una decisión stale conserve autoridad;
- una denegación produzca efecto empresarial.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por cobertura existente y no introduce una obligación verificable nueva.

---

#### 31. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AUTH-001` — toda capacidad protegida se resuelve por permisos, contexto y alcance canónicos;
- `TREQ-AUTH-011` — autoridad efectiva como intersección entre límites del dispositivo y permisos del trabajador identificado, sin transferencia de privilegios administrativos;
- `TREQ-AUTH-014` — cambios de identidad, dispositivo, rol, territorio o contexto invalidan autoridad derivada cuando corresponde;
- `TREQ-AUTH-015` — evidencia correlacionable de principal, actor, dispositivo, permiso, recurso, decisión y razones;
- `TREQ-AUTH-019` — dispositivo, endpoint, activo, estación, principal técnico y actor humano permanecen separados;
- `TREQ-AUTH-021` — vínculo técnico de principal, endpoint y dispositivo es único, explícito, versionado y server-side;
- `TREQ-AUTH-054` — cambio de aplicación o actor recalcula acceso e invalida estado incompatible;
- `TREQ-AUTH-056` — terminales de recepción, gerencia operativa y gerencia administrativa conservan sus restricciones propias sin ampliar cobertura;
- `TREQ-AUTH-062` — toda acción desde dispositivo compartido intersecta actor, techo, aplicación, modo, territorio, recurso, prerrequisitos y denegaciones;
- `TREQ-AUTH-063` — STANDARD conserva actor/contexto, STRONG exige reautenticación fuerte y NOT_ALLOWED permanece excluido;
- `TREQ-PASS-029` — mutaciones PULSO-PASS desde dispositivo compartido no transfieren privilegios de la sesión administrativa al trabajador que firma.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no ha sido incorporado todavía al checkout del usuario; build y suites de consumidores corresponden a la incorporación posterior y a las ejecuciones físicas propietarias. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, batería global y lifecycle documental permanecen pendientes del checkout local del usuario. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, la topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `AUTH-DEV-007..010`, la matriz restrictiva de `AUTH-RBAC-023`, el universo heredado de 19 identidades, la separación principal/dispositivo/actor, la intersección de autoridad, la no herencia administrativa y la cobertura vigente del Registro 04A que referencia expresamente `AUTH-QA-017`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron cambios de actor, sesiones administrativas, PIN, reautenticación, acciones administrativas, dispositivos reales ni intentos de bypass. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-017::<package_id>` ni `AUTH-QA-017::GLOBAL-FINAL`; las identidades físicas permanecen sujetas a su lifecycle y gate. |

---

#### 33. Criterios de aceptación

- [ ] El principal técnico y el actor humano permanecen separados.
- [ ] El dispositivo no aporta permisos base ni cobertura administrativa.
- [ ] La autoridad efectiva es una intersección y nunca una suma.
- [ ] Una capacidad fuera del techo se deniega aunque el actor la posea.
- [ ] Una capacidad dentro del techo no se concede si el actor no la posee.
- [ ] El administrador configurador no transfiere privilegios al actor actual.
- [ ] Una sesión administrativa previa no complementa al trabajador actual.
- [ ] El trabajador anterior no presta autoridad al siguiente.
- [ ] `navigation_role` no participa en autorización.
- [ ] Las aplicaciones visibles o permitidas no conceden capacidades.
- [ ] Plantillas y paquetes se comportan únicamente como techos restrictivos.
- [ ] Sede y área del dispositivo no crean cobertura administrativa.
- [ ] `service_role` y clientes privilegiados no crean autoridad empresarial.
- [ ] Un administrador humano actual solo usa su propia autoridad dentro del techo del dispositivo.
- [ ] `management_terminal` no constituye bypass administrativo.
- [ ] `procurement_reception` conserva modos administrativo y operativo excluyentes.
- [ ] `STANDARD_ACTOR_SESSION` conserva actor y contexto válidos.
- [ ] STRONG exige reautenticación fuerte personal compatible.
- [ ] PIN y firma ligera no sustituyen STRONG.
- [ ] `NOT_ALLOWED` permanece excluido.
- [ ] Denegaciones prevalecen sobre allows candidatos.
- [ ] Cambios materiales invalidan decisiones incompatibles o stale.
- [ ] Toda denegación conserva cero efectos empresariales.
- [ ] La evidencia distingue principal, dispositivo, actor y fuente de autoridad.
- [ ] Se conserva el universo exacto de 19 identidades sin inventar dispositivos.
- [ ] Las observaciones físicas no se promocionan a identidades canónicas por inferencia.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 34. Límites

Esta tarea no:

- redefine la identidad técnica del dispositivo;
- redefine el mecanismo de PIN o firma humana de `AUTH-DEV-007`;
- redefine la intersección contractual de `AUTH-DEV-008`;
- reabre la no herencia administrativa de `AUTH-DEV-009`;
- redefine la auditoría propietaria de `AUTH-DEV-010`;
- define la revocación o expiración de dispositivos y sesiones;
- implementa la limpieza completa de cambio de trabajador;
- crea roles, PermissionKey, grants, denies, paquetes, plantillas, aplicaciones o dispositivos;
- cambia el universo de 19 identidades heredadas;
- promueve observaciones físicas a dispositivos canónicos;
- cambia los techos de `AUTH-RBAC-023`;
- redefine la clasificación STANDARD, STRONG o NOT_ALLOWED;
- crea bypass administrativo para `management_terminal`;
- fusiona los modos de `procurement_reception`;
- modifica UI, navegación o estado de cliente;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos, datasets o configuración de dispositivos;
- ejecuta `AUTH-QA-016::<package_id>`;
- ejecuta `AUTH-QA-017::<package_id>`;
- ejecuta `AUTH-QA-017::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- modifica el Registro 04A.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-016 — Recepción puede recibir pero no aprobar compras`

**TAREA ACTUAL APROBADA**
`AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-018 — PIN identifica al trabajador real`
### ✅ AUTH-QA-018 — PIN identifica al trabajador real

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado
**Tarea siguiente:** AUTH-QA-019 — Rol simulado no hereda permisos reales
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización para dispositivos compartidos, reutilizable por paquete y certificable globalmente, que demuestra que un PIN, firma o mecanismo ligero aprobado identifica server-side al trabajador humano real y puede producir una sesión de actor o evidencia de firma correlacionable sin convertirse en permiso, rol, turno, check-in, cobertura, reautenticación fuerte ni fuente de autoridad empresarial
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-018::<package_id>` y la certificación `AUTH-QA-018::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; la infraestructura y consumidores parciales observados no constituyen certificación integral de identificación humana, lifecycle, secreto efímero ni controles adversariales
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra packages, aplicaciones, dispositivos, PIN reales, sesiones de actor, firmas, empleados, datos, Supabase, RLS, RPC, Server Actions, rate limiting, lockout, secretos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que un PIN, firma o mecanismo ligero aprobado en un dispositivo compartido identifica al trabajador humano real mediante resolución autoritativa de servidor, sin permitir que el cliente elija al actor ni que la prueba humana se convierta en una fuente de autoridad empresarial.

La regla raíz queda:

```text
PRINCIPAL TÉCNICO DEL DISPOSITIVO
+
PRUEBA HUMANA LIGERA PRESENTADA
+
RESOLUCIÓN SERVER-SIDE ÚNICA DEL EMPLEADO
→ IDENTIDAD HUMANA VERIFICABLE
→ SESIÓN DE ACTOR O FIRMA CORRELACIONABLE CUANDO APLIQUE
```

Y simultáneamente:

```text
PIN / FIRMA LIGERA / QR / MECANISMO APROBADO
≠ PERMISO
≠ ROL
≠ TURNO
≠ CHECK-IN
≠ COBERTURA
≠ ALLOW FINAL
≠ REAUTENTICACIÓN FUERTE
```

La tarea certifica identidad y atribución humana; la autorización empresarial continúa resolviéndose por sus contratos propietarios.

---

#### 2. Resultado canónico

La tarea deja definidos treinta y seis resultados obligatorios:

1. el dispositivo compartido continúa siendo un principal técnico y no un empleado ficticio;
2. el actor efectivo de una operación laboral es un empleado humano real cuando la superficie exige actor humano;
3. el PIN, firma o mecanismo ligero se presenta como prueba humana y no como identidad autoritativa elegida por cliente;
4. el servidor resuelve el empleado asociado con la prueba;
5. un `employee_id` enviado por cliente no puede sustituir la resolución server-side;
6. la prueba solo es válida cuando resuelve un único trabajador compatible;
7. cero trabajadores resolubles produce fallo cerrado;
8. múltiples trabajadores resolubles o una identidad ambigua producen fallo cerrado;
9. una prueba inválida no crea sesión de actor, firma válida ni autoridad;
10. la respuesta de prueba inválida no revela si otro trabajador existe ni detalles del secreto;
11. una prueba válida puede identificar al trabajador y, cuando el contrato lo permita, iniciar una sesión de actor;
12. una sesión de actor vincula dispositivo y empleado humano sin conceder por sí sola un permiso;
13. solo puede existir un actor efectivo utilizable por dispositivo en un instante conforme al contrato vigente;
14. cuando una acción exige firma individual, la evidencia se obtiene antes del comando protegido;
15. la firma de acción se vincula al humano exacto y a la operación concreta;
16. una firma emitida para una operación no se reutiliza como prueba universal para otra operación materialmente distinta;
17. el actor de la firma debe coincidir con el actor de la sesión cuando ambos existan;
18. el PIN correcto no crea `ALLOW` final;
19. el PIN correcto no crea rol base ni operativo;
20. el PIN correcto no crea turno ni check-in;
21. el PIN correcto no crea sede, área ni cobertura administrativa;
22. el PIN correcto no amplía el techo del dispositivo ni habilita una aplicación ausente;
23. el PIN correcto no satisface `STRONG_REAUTH_REQUIRED`;
24. la autorización posterior sigue exigiendo permiso, modalidad, territorio, recurso, estado, prerrequisitos, techo del dispositivo y ausencia de denegaciones;
25. un actor identificado sin permiso continúa denegado para la capacidad correspondiente;
26. un actor identificado con permiso pero fuera del techo del dispositivo continúa denegado;
27. un actor identificado sin turno o check-in requeridos continúa denegado;
28. una prueba humana no compensa territorio o recurso incompatibles;
29. el secreto crudo es efímero y no se conserva en contexto, auditoría, logs, métricas, mensajes ni receipts;
30. la evidencia persistible usa una referencia opaca de servidor, no el PIN ni una copia reversible del secreto;
31. éxito, error, cambio de cliente, cambio de modo, expiración o cambio de actor deben impedir reutilización indebida del secreto o evidencia incompatible conforme a los contratos físicos propietarios;
32. límites de intentos, bloqueo, rotación y respuesta uniforme permanecen obligatorios donde los requisitos existentes los exigen y deben certificarse físicamente antes del PASS correspondiente;
33. la existencia de inputs, tablas legacy, helpers parciales o una referencia de firma no demuestra por sí sola identificación integral conforme;
34. toda denegación conserva cero efectos empresariales y sí conserva evidencia de auditoría cuando corresponda;
35. no se crean ni modifican requisitos de prueba;
36. no se ejecuta ningún cambio físico desde esta tarea documental.

---

#### 3. Autoridad contractual vigente

La prueba consume como autoridad vigente:

- la separación entre principal técnico, dispositivo y actor humano;
- `AUTH-DEV-007` como contrato propietario de identificación humana y firma ligera;
- `AUTH-DEV-008` para la intersección posterior entre autoridad humana y techo del dispositivo;
- `AUTH-DEV-009` para no herencia de autoridad administrativa;
- `AUTH-DEV-010` para trazabilidad conjunta de dispositivo y trabajador;
- `AUTH-SRV-010` para el gate de dispositivo compartido, actor session, clasificación STANDARD/STRONG/NOT_ALLOWED y restricciones server-side;
- la política de lifecycle de sesión y cambio de actor del BLOQUE P;
- los contratos de secreto efímero y controles adversariales ya registrados para PULSO;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- el gate `POST_E5_PACKAGE`.

La prueba no utiliza como autoridad `employee_id` de cliente, `navigation_role`, último trabajador, último PIN, sede del dispositivo, área del dispositivo, estado de interfaz, cookie, ruta ni etiqueta visual.

---

#### 4. Semántica exacta de PIN, sesión y firma

La certificación distingue tres objetos:

| Objeto | Significado | Autoridad empresarial |
| --- | --- | --- |
| PIN o mecanismo ligero | secreto o prueba presentada por el trabajador para demostrar presencia e identidad | ninguna por sí sola |
| sesión de actor | vínculo temporal autoritativo entre dispositivo y empleado humano | identifica actor; no concede permiso por sí sola |
| firma de acción | referencia opaca emitida por servidor después de validar al humano para una operación concreta | atribuye la operación; no sustituye autorización |

La palabra **firma** no significa imagen, trazo, booleano del cliente ni texto libre. Es evidencia server-side correlacionable con el humano y la operación.

---

#### 5. Resolución server-side del trabajador

El cliente puede transportar la prueba efímera, pero no puede declarar autoritativamente:

- `employee_id`;
- actor efectivo;
- `actor_session_id`;
- rol;
- turno;
- check-in;
- sede;
- área;
- permiso;
- resultado de autorización.

La resolución válida debe demostrar:

```text
PRUEBA HUMANA
→ VALIDACIÓN EN SERVIDOR
→ EMPLEADO ÚNICO RESUELTO
→ EMPLEADO VIGENTE Y ELEGIBLE PARA EL FLUJO
→ IDENTIDAD HUMANA VERIFICABLE
```

Si esa cadena no puede demostrarse, el resultado es fail-closed.

---

#### 6. Cliente no selecciona al actor

Deben existir casos adversariales donde el cliente intente:

- enviar un `employee_id` distinto del asociado con el PIN;
- reutilizar el trabajador del intento anterior;
- seleccionar un empleado desde una lista;
- forzar un `actor_session_id` ajeno;
- utilizar `navigation_role` como actor;
- usar el usuario técnico del dispositivo como empleado;
- usar sede o área del dispositivo para inferir persona;
- atribuir la firma a un empleado distinto del resuelto.

Ninguno puede alterar la identidad resuelta por servidor.

---

#### 7. Cero coincidencias y ambigüedad

Los siguientes estados no son equivalentes a un PIN válido:

```text
0 EMPLEADOS RESUELTOS
→ FAIL CLOSED

>1 EMPLEADOS COMPATIBLES / RESULTADO AMBIGUO
→ FAIL CLOSED

PRUEBA NO RESOLUBLE
→ FAIL CLOSED
```

No se selecciona automáticamente:

- el empleado más reciente;
- el empleado de la sede;
- el empleado del último PIN;
- el actor de la última sesión;
- el actor cuyo rol haga pasar la autorización.

---

#### 8. Sesión de actor

Cuando el contrato permita iniciar una sesión de actor después de identificar al trabajador, la prueba deberá demostrar que la sesión:

- pertenece al mismo dispositivo;
- referencia al empleado resuelto por servidor;
- se encuentra vigente;
- no está revocada ni expirada;
- no reutiliza un actor anterior;
- no se deriva de `navigation_role`;
- no concede permiso por sí sola;
- no crea turno ni check-in;
- no completa contexto faltante;
- no fusiona dos actores simultáneos.

Una sesión inválida deja de producir actor efectivo.

---

#### 9. Firma individual de acción

Cuando una capacidad exija firma individual:

```text
ACTOR HUMANO RESUELTO
+
OPERACIÓN CONCRETA QUE EXIGE FIRMA
+
VALIDACIÓN HUMANA VIGENTE
→ REFERENCIA OPACA DE FIRMA
→ COMANDO PROTEGIDO CONTINÚA A AUTORIZACIÓN
```

La firma deberá poder correlacionarse, según aplique, con:

- dispositivo;
- principal técnico;
- actor humano;
- sesión de actor;
- aplicación;
- operación o comando;
- permiso;
- recurso;
- correlación temporal.

La firma no constituye un `ALLOW` autónomo.

---

#### 10. Coincidencia entre actor de sesión y actor de firma

Cuando una sesión de actor y una firma individual participen en la misma operación:

```text
ACTOR_SESSION.employee_id = FIRMA.employee_id
```

es una condición obligatoria.

Un mismatch produce bloqueo de la acción y cero efectos empresariales.

No se corrige silenciosamente el actor tomando el de la firma, el de la sesión o el de la interfaz según cuál permita continuar.

---

#### 11. PIN identifica; no autoriza

Después de una identificación positiva, la acción empresarial continúa su evaluación independiente.

Debe demostrarse al menos:

```text
PIN VÁLIDO + ACTOR SIN PERMISO
→ DENY

PIN VÁLIDO + PERMISO + CAPACIDAD FUERA DEL TECHO DEL DISPOSITIVO
→ DENY

PIN VÁLIDO + PERMISO + FALTA TURNO/CHECK-IN REQUERIDO
→ DENY

PIN VÁLIDO + PERMISO + TERRITORIO INCOMPATIBLE
→ DENY
```

Un PIN correcto solo resuelve identidad o firma ligera según el flujo aprobado.

---

#### 12. PIN no crea contexto laboral

Identificar al trabajador no fabrica:

- turno;
- check-in;
- rol operativo;
- sede operativa;
- área operativa;
- cobertura administrativa;
- asignación a recurso;
- relación con vehículo, ubicación o estación.

Cada dimensión se resuelve desde su propia fuente autoritativa cuando el permiso la exige.

---

#### 13. PIN no amplía el dispositivo

La prueba humana no altera:

- aplicaciones efectivas;
- techo máximo de capacidades;
- reducción vigente de instancia;
- territorio del dispositivo;
- clasificación `STANDARD_ACTOR_SESSION`;
- clasificación `STRONG_REAUTH_REQUIRED`;
- clasificación `NOT_ALLOWED`.

Un PIN válido no convierte una capacidad bloqueada por dispositivo en ejecutable.

---

#### 14. PIN ligero no es STRONG

La certificación debe demostrar explícitamente:

```text
LIGHTWEIGHT_PIN
→ IDENTIDAD / FIRMA LIGERA POSIBLE
→ NO STRONG_REAUTH
```

Una capacidad `STRONG_REAUTH_REQUIRED` continúa exigiendo reautenticación personal fuerte, vigente, para el mismo actor, aplicación, acción y recurso conforme al contrato aplicable.

No se degrada STRONG a PIN por limitaciones del terminal.

---

#### 15. `NOT_ALLOWED` permanece bloqueado

Si una capacidad está clasificada como `NOT_ALLOWED` en dispositivo compartido:

```text
PIN VÁLIDO
+ ACTOR PRIVILEGIADO
+ PERMISO FUERA DEL DEVICE
+ FIRMA LIGERA
→ DENY
```

Ni la identidad correcta ni la autoridad del actor fuera de ese terminal eliminan la prohibición.

---

#### 16. Secreto efímero

El PIN o prueba humana cruda es un secreto efímero.

No debe persistirse en:

- `DeviceContext`;
- `AccessContext`;
- logs;
- métricas;
- mensajes;
- receipts;
- auditoría empresarial;
- analytics;
- snapshots;
- cachés reutilizables;
- payloads de evidencia.

La evidencia durable conserva referencias opacas y metadatos suficientes para atribución, nunca el secreto crudo.

---

#### 17. No exposición y respuesta uniforme

Una prueba inválida debe responder sin revelar información que permita enumerar trabajadores o inferir el estado del secreto.

La certificación debe cubrir:

- PIN incorrecto;
- trabajador inexistente;
- trabajador inactivo cuando el contrato lo invalide;
- prueba expirada o no resoluble;
- actor incompatible;
- sesión incompatible;
- intento repetido sujeto a controles físicos aplicables.

La interfaz y la frontera de servidor no deben diferenciar de forma insegura estados secretos que faciliten enumeración o ataque.

---

#### 18. Intentos, bloqueo y rotación

Los requisitos vigentes exigen controles contra replay y fuerza bruta para los flujos que usan PIN/firma en PULSO.

La certificación física aplicable deberá demostrar, conforme al owner físico correspondiente:

- límites de intentos;
- lockout o bloqueo;
- rotación cuando corresponda;
- expiración;
- limpieza de secreto;
- respuesta uniforme;
- ausencia de reutilización después del cambio de actor o modo.

`AUTH-QA-018` no inventa valores numéricos de intentos, tiempos de bloqueo, longitud del PIN, algoritmo de hashing ni cadencia de rotación. Esos valores deben provenir del contrato físico propietario antes de certificar el escenario que los requiera.

---

#### 19. Limpieza del secreto y estado incompatible

La prueba debe demostrar que el secreto o evidencia incompatible no sobrevive indebidamente después de:

- éxito;
- error;
- cancelación;
- cambio de cliente;
- cambio de modo;
- cambio de aplicación cuando invalide la evidencia;
- cambio de actor;
- expiración de sesión;
- revocación;
- nueva operación materialmente distinta.

Una firma emitida para A no puede autorizar B y una prueba del trabajador A no puede quedar disponible al trabajador B.

---

#### 20. Cambio de trabajador

En transición A → B:

```text
ACTOR A IDENTIFICADO
→ FIN / INVALIDACIÓN SEGÚN LIFECYCLE
→ LIMPIEZA DE ESTADO INCOMPATIBLE
→ PRUEBA HUMANA DE B
→ ACTOR B RESUELTO SERVER-SIDE
```

El nuevo trabajador no puede obtener como prueba válida:

- el último PIN de A;
- la firma de A;
- la sesión de actor de A;
- una reautenticación de A;
- una decisión de autorización cacheada para A.

---

#### 21. Dispositivo sin actor

Un dispositivo técnico válido puede estar disponible sin actor humano.

Mientras no exista identificación o sesión humana válida donde el contrato la exige:

```text
PRINCIPAL TÉCNICO VÁLIDO
+ DISPOSITIVO ACTIVO
+ ACTOR HUMANO AUSENTE
→ CERO ACCIÓN EMPRESARIAL PROTEGIDA
```

La ausencia de actor no se completa con el último trabajador, `navigation_role`, sede, área, plantilla o app visible.

---

#### 22. Auditoría y privacidad

La evidencia de prueba debe permitir reconstruir, según corresponda:

- principal técnico;
- dispositivo;
- actor humano resuelto;
- `actor_session_id`;
- referencia opaca de firma;
- aplicación;
- permiso;
- recurso;
- decisión;
- razones;
- resultado;
- timestamp y correlación.

Nunca debe registrar el PIN crudo ni una forma reversible del secreto.

La auditoría demuestra atribución; no crea autoridad.

---

#### 23. Protección de datos sensibles

La identidad correcta del trabajador no amplía por sí sola acceso a datos sensibles.

Cuando el flujo proteja información SST, médica, de cliente u otra información restringida, después de identificar al humano se conservan íntegramente:

- permiso exacto;
- finalidad;
- vínculo vigente;
- sede;
- área;
- recurso;
- sensibilidad;
- estado;
- controles adicionales del dominio.

PIN válido no equivale a acceso válido al dato.

---

#### 24. Baseline físico observado

Las fuentes canónicas registran bases parciales útiles, pero insuficientes para PASS integral:

- existen consumidores que solicitan firma de actor en dispositivo compartido;
- existe evidencia de una función de servidor que produce una referencia de firma asociada al trabajador;
- existe infraestructura legacy relacionada con firmas de actor de dispositivo;
- PULSO tiene un input de tipo secreto/password observado en el flujo relevante;
- se ha observado limpieza tras éxito en parte del flujo;
- el registro 04A conserva pendientes los controles integrales de intentos, bloqueo, rotación, respuesta uniforme, limpieza y certificación E2E.

Estas bases no demuestran por sí solas:

- resolución server-side única del humano en todos los consumidores;
- actor session completa y vigente;
- protección uniforme contra manipulación de `employee_id`;
- no reutilización entre actores;
- rate limiting y lockout completos;
- rotación;
- limpieza en todos los estados;
- ausencia de fuga en logs y métricas;
- paridad entre superficies;
- evidencia física por package.

Por tanto, la tarea no declara el escenario físicamente certificado.

---

#### 25. Matriz mínima de escenarios positivos

Cada package aplicable materializa únicamente los escenarios que su superficie real soporte.

Como mínimo, cuando sean materialmente aplicables:

| Escenario | Resultado esperado |
| --- | --- |
| PIN válido asociado inequívocamente con trabajador A | servidor resuelve A; ninguna autoridad adicional se concede |
| identificación válida que inicia actor session | sesión pertenece al mismo dispositivo y a A |
| acción que exige firma individual | referencia opaca emitida para A y esa operación antes del comando |
| actor A con permiso y resto de condiciones válidas | la operación puede continuar a la decisión de autorización normal |
| cambio controlado A → B | B requiere su propia prueba y no hereda evidencia de A |

Un caso positivo solo demuestra la parte materialmente ejecutada; no autoriza extrapolar a consumidores ausentes.

---

#### 26. Matriz mínima de escenarios negativos

Cuando sean aplicables, deben cubrirse:

| Escenario adversarial | Resultado obligatorio |
| --- | --- |
| PIN incorrecto | fallo cerrado; cero actor nuevo; cero efecto empresarial |
| `employee_id` cliente ≠ empleado resuelto | identidad cliente ignorada o intento rechazado; no se suplanta actor |
| `actor_session_id` ajeno | bloqueo |
| prueba no resoluble | fallo cerrado |
| identidad ambigua | fallo cerrado |
| actor de firma ≠ actor de sesión | bloqueo |
| PIN válido pero sin permiso | DENY |
| PIN válido pero sin turno/check-in exigido | DENY |
| PIN válido pero territorio incompatible | DENY |
| PIN válido pero capacidad fuera del techo | DENY |
| PIN válido ante `STRONG_REAUTH_REQUIRED` sin STRONG | DENY |
| PIN válido ante `NOT_ALLOWED` | DENY |
| reutilización de firma en otra operación | bloqueo |
| reutilización de A después de cambio a B | bloqueo |
| secreto presente en log/evidencia persistente | FAIL de certificación |
| controles obligatorios de intentos/bloqueo no demostrados | FAIL o evidencia insuficiente para el escenario correspondiente |

---

#### 27. Paridad entre fronteras

Una certificación no es válida si el PIN identifica correctamente al humano en una interfaz pero otra frontera acepta actor suministrado por cliente o elude la validación.

Las superficies aplicables deben mantener semántica equivalente entre:

- UI;
- Server Action;
- API;
- RPC;
- funciones de servidor;
- reintentos;
- integraciones que produzcan el mismo efecto empresarial.

Ningún canal alternativo puede degradar identificación, secreto o autorización.

---

#### 28. Cero efectos empresariales en deny

Todo caso negativo de `AUTH-QA-018` debe conservar:

```text
EFECTO EMPRESARIAL = 0
```

Esto incluye, según el flujo:

- cero mutación de datos;
- cero puntos;
- cero redención;
- cero movimiento de inventario;
- cero cambio de estado;
- cero acción administrativa;
- cero nueva autoridad;
- cero sesión atribuida al trabajador incorrecto.

La obligación de auditoría permanece independiente y no se interpreta como efecto empresarial autorizado.

---

#### 29. Ejecución por package

La topología de `AUTH-QA-018` es `PER_PACKAGE_AND_GLOBAL_FINAL`.

Para un package aplicable, la instancia conceptual es:

```text
AUTH-QA-018::<package_id>
```

Solo puede ejecutarse cuando:

- el package propietario haya superado su gate E5 aplicable;
- las superficies reales del package estén identificadas;
- el mecanismo de identificación/firma que corresponda esté materializado;
- los actores, dispositivos y fixtures sean controlados y trazables;
- los contratos que el escenario consume estén disponibles;
- la evidencia pueda distinguir resultado de identificación, decisión de autorización y efecto empresarial.

Esta tarea documental no selecciona package ni abre una instancia física.

---

#### 30. Regla de aplicabilidad física

Para cada package o superficie:

```text
MECANISMO PIN/FIRMA MATERIALMENTE PRESENTE Y GOBERNADO
→ ESCENARIOS APLICABLES DEBEN EJECUTARSE

MECANISMO NO MATERIALIZADO / SUPERFICIE AUSENTE
→ NOT_APPLICABLE PARA ESE ESCENARIO
```

`NOT_APPLICABLE` requiere evidencia de ausencia material y no puede utilizarse para ocultar una implementación incompleta que sí pretende operar con PIN o firma.

Una implementación parcial que expone el flujo pero carece de controles obligatorios no obtiene `NOT_APPLICABLE`; permanece sin PASS.

---

#### 31. Certificación global final

La certificación:

```text
AUTH-QA-018::GLOBAL-FINAL
```

consolida la evidencia de todos los packages aplicables y debe demostrar que la identificación del humano real, la separación PIN/autoridad y la protección del secreto son uniformes entre consumidores.

Debe fallar si existe al menos un consumidor aplicable donde:

- el cliente pueda elegir autoritativamente `employee_id`;
- un PIN resuelva ambiguamente más de un actor;
- se reutilice el último trabajador;
- el principal técnico se convierta en actor humano;
- una prueba válida conceda permisos por sí sola;
- PIN ligero satisfaga STRONG;
- una firma pueda reutilizarse para otra operación;
- A transfiera evidencia a B;
- el secreto crudo se persista o registre;
- una denegación produzca efecto empresarial;
- controles obligatorios de secreto no tengan evidencia suficiente;
- otra frontera eluda la identidad server-side.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por cobertura existente y no introduce una obligación verificable nueva.

---

#### 33. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AUTH-011` — en dispositivo compartido, la autoridad efectiva se restringe por límites del dispositivo y permisos del trabajador identificado; PIN o mecanismo aprobado identifica al humano real;
- `TREQ-AUTH-014` — cambios de trabajador, dispositivo, rol, territorio o contexto invalidan autoridad derivada incompatible;
- `TREQ-AUTH-015` — toda decisión y acción protegida conserva evidencia correlacionable de principal, actor, contexto, dispositivo, permiso, recurso, decisión y razones;
- `TREQ-AUTH-017` — información SST y sensible conserva autorización por identidad real y no puede ampliar alcance mediante dispositivo compartido;
- `TREQ-AUTH-054` — cambio de aplicación o actor recalcula acceso, limpia estado incompatible e invalida reautenticaciones incompatibles;
- `TREQ-AUTH-063` — capacidades STRONG exigen reautenticación fuerte personal y no pueden degradarse a PIN ligero;
- `TREQ-PASS-029` — mutaciones PULSO-PASS desde dispositivo compartido exigen firma del trabajador real y no transfieren privilegios de la sesión técnica;
- `TREQ-PASS-030` — PIN/firma se tratan como secreto efímero y exigen controles de intentos, bloqueo, rotación, respuesta uniforme y limpieza.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no ha sido incorporado todavía al checkout del usuario; build y suites de consumidores corresponden a la incorporación posterior y a las ejecuciones físicas propietarias. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, batería global y lifecycle documental permanecen pendientes del checkout local del usuario. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, la topología `PER_PACKAGE_AND_GLOBAL_FINAL` con gate `POST_E5_PACKAGE`, `AUTH-DEV-007`, la intersección y no herencia de `AUTH-DEV-008..010`, el gate server-side de `AUTH-SRV-010`, el estado parcial observado de consumidores/firma, la cobertura AUTH/PASS y los requisitos que referencian expresamente `AUTH-QA-018`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron PIN, firmas, actor sessions, cambios de trabajador, intentos adversariales, acciones PULSO-PASS ni accesos sensibles reales. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-018::<package_id>` ni `AUTH-QA-018::GLOBAL-FINAL`; los controles físicos y E2E permanecen sujetos a sus packages, unidades y gates. |

---

#### 35. Criterios de aceptación

- [ ] El principal técnico y el trabajador humano permanecen separados.
- [ ] El PIN o mecanismo ligero es tratado como prueba humana y no como grant.
- [ ] El servidor resuelve al empleado real asociado con la prueba.
- [ ] `employee_id` suministrado por cliente no selecciona al actor autoritativo.
- [ ] Cero coincidencias produce fallo cerrado.
- [ ] Ambigüedad de identidad produce fallo cerrado.
- [ ] Una prueba inválida no crea actor session ni firma válida.
- [ ] La respuesta inválida no facilita enumeración insegura de trabajadores o secretos.
- [ ] Una prueba válida puede producir identidad humana verificable sin conceder autoridad.
- [ ] Una actor session pertenece al dispositivo y al empleado exactos.
- [ ] La actor session no es permiso, turno ni check-in.
- [ ] La firma individual se obtiene antes del comando protegido cuando es obligatoria.
- [ ] La firma queda correlacionada con el actor y la operación concreta.
- [ ] La firma no se reutiliza universalmente entre operaciones.
- [ ] Actor de sesión y actor de firma coinciden cuando ambos participan.
- [ ] PIN válido sin permiso continúa en DENY.
- [ ] PIN válido sin contexto requerido continúa en DENY.
- [ ] PIN válido fuera del techo del dispositivo continúa en DENY.
- [ ] PIN válido no crea cobertura administrativa ni territorio.
- [ ] PIN ligero no satisface STRONG.
- [ ] `NOT_ALLOWED` permanece bloqueado.
- [ ] El secreto crudo no se persiste ni aparece en evidencia durable.
- [ ] La evidencia durable usa referencia opaca de servidor.
- [ ] Cambio de actor invalida evidencia incompatible del actor anterior.
- [ ] Éxito, error, cambio de modo y expiración no dejan secreto reutilizable cuando el flujo físico aplica.
- [ ] Los controles de intentos, bloqueo, rotación y respuesta uniforme se exigen donde corresponda sin inventar valores numéricos en esta tarea.
- [ ] Las bases parciales observadas no se presentan como certificación integral.
- [ ] Las fronteras equivalentes no permiten bypass de identidad server-side.
- [ ] Toda denegación conserva cero efectos empresariales.
- [ ] La auditoría no persiste PIN y conserva atribución suficiente.
- [ ] La identidad correcta no amplía acceso a datos sensibles.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 36. Límites

Esta tarea no:

- redefine el algoritmo de autenticación del trabajador;
- fija longitud de PIN;
- fija cantidad numérica de intentos;
- fija duración numérica de lockout;
- selecciona algoritmo de hashing;
- fija cadencia numérica de rotación;
- crea biometría, passkey, contraseña personal o MFA nueva;
- convierte PIN ligero en reautenticación fuerte;
- redefine el lifecycle de actor session;
- redefine revocación de dispositivo;
- redefine limpieza integral de cambio de trabajador;
- redefine la intersección actor–dispositivo de `AUTH-DEV-008`;
- redefine la no herencia administrativa de `AUTH-DEV-009`;
- redefine la auditoría propietaria de `AUTH-DEV-010`;
- crea roles, PermissionKey, grants, denies, paquetes, plantillas, aplicaciones o dispositivos;
- cambia el universo canónico de dispositivos;
- promueve infraestructura legacy a cumplimiento;
- modifica UI, navegación o estado de cliente;
- modifica RLS, RPC, migraciones, Edge Functions o Supabase;
- modifica datos productivos o configuración de dispositivos;
- ejecuta `AUTH-QA-017::<package_id>`;
- ejecuta `AUTH-QA-018::<package_id>`;
- ejecuta `AUTH-QA-018::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- modifica el Registro 04A.

---

#### 37. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado`

**TAREA ACTUAL APROBADA**
`AUTH-QA-018 — PIN identifica al trabajador real`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-019 — Rol simulado no hereda permisos reales`
### ✅ AUTH-QA-019 — Rol simulado no hereda permisos reales

**Estado:** APROBADA
**Tarea anterior:** AUTH-QA-018 — PIN identifica al trabajador real
**Tarea siguiente:** AUTH-QA-020 — Acceso directo por URL queda bloqueado
**Tipo de tarea:** documental; definición canónica de una prueba integral de autorización para simulación, reutilizable por paquete y certificable globalmente, que demuestra la separación bidireccional entre autoridad real y evaluación hipotética: el rol, sede, área, turno, check-in, permiso o sujeto simulados nunca conceden autoridad real, y los permisos, territorio, turno, check-in o grants reales del simulador nunca completan silenciosamente un escenario simulado incompleto ni alteran su resultado hipotético
**Bloque:** U — Pruebas integrales y certificación transversal
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/U_PRUEBAS_INTEGRALES/01_PRUEBAS_INTEGRALES_DE_AUTORIZACION.md`
**Estado físico resultante:** contrato de certificación definido; las ejecuciones `AUTH-QA-019::<package_id>` y la certificación `AUTH-QA-019::GLOBAL-FINAL` permanecen pendientes y sujetas al gate `POST_E5_PACKAGE`; existen componentes canónicos de auditoría y presentación de simulación, pero continúan superficies legacy y overrides cliente que requieren transición y evidencia física antes de certificar separación integral entre autoridad real y contexto simulado
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan pruebas contra packages, aplicaciones, usuarios, roles, simulaciones activas, cookies, AsyncStorage, datos, Supabase, RLS, RPC, Server Actions, Route Handlers, Edge Functions, colas, integraciones, dispositivos ni ambientes reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato integral con el que Vento OS demostrará que la simulación permanece estrictamente separada de la autoridad ejecutable.

La regla raíz queda:

```text
AUTORIDAD REAL
≠
EVALUACIÓN SIMULADA
```

Y debe cumplirse en ambos sentidos:

```text
ROL / SEDE / ÁREA / TURNO / CHECK-IN / PERMISO SIMULADOS
→ NO CONCEDEN AUTORIDAD REAL
```

```text
ROL / SEDE / ÁREA / TURNO / CHECK-IN / PERMISOS REALES DEL SIMULADOR
→ NO COMPLETAN NI ALTERAN SILENCIOSAMENTE EL ESCENARIO SIMULADO
```

La prueba debe demostrar que una persona puede inspeccionar un escenario hipotético sin convertirse en el sujeto simulado, sin recibir sus permisos y sin contaminar la evaluación hipotética con autoridad real propia.

---

#### 2. Resultado canónico

La tarea deja definidos treinta y dos resultados obligatorios:

1. el actor real y el sujeto simulado permanecen identidades distintas;
2. la sesión real y la sesión o referencia de simulación permanecen separadas;
3. el rol base real no se reemplaza por el rol base simulado;
4. el rol operativo real no se reemplaza por el rol operativo simulado;
5. el rol real no completa un rol simulado ausente o inválido;
6. la sede real no completa una sede simulada ausente o inválida;
7. el área real no completa un área simulada ausente o inválida;
8. el turno real no satisface un prerrequisito de turno simulado;
9. el check-in real no satisface un prerrequisito de check-in simulado;
10. un permiso real del simulador no se agrega al conjunto hipotético;
11. un permiso simulado no se agrega al conjunto real;
12. `WOULD_ALLOW` nunca equivale a `ALLOW`;
13. `WOULD_DENY` nunca retira por sí mismo una autoridad real legítima fuera de la simulación;
14. `INDETERMINATE` nunca produce fallback hacia el plano real;
15. la lectura de datos reales permanece limitada por permiso, alcance y RLS reales del simulador;
16. una simulación puede explicar acceso hipotético sin revelar datos reales fuera de la autoridad del simulador;
17. RLS, RPC, Server Actions, Edge Functions, jobs, webhooks e integraciones no consumen autoridad simulada;
18. una mutación empresarial originada en simulación se bloquea antes del primer efecto real;
19. una lectura protegida no puede usar el rol simulado para ampliar filas o detalle;
20. las operaciones propias del lifecycle de simulación usan autoridad real del simulador y no la del rol simulado;
21. cookies, AsyncStorage, localStorage, query, headers, estado React o labels no crean autoridad;
22. `simulation_id` es correlación y nunca credencial;
23. una simulación no emite tokens, claims o sesiones Auth con permisos hipotéticos;
24. cache real y cache simulado permanecen separados;
25. salir de simulación descarta estado hipotético y exige contexto real fresco antes de una acción real;
26. una simulación no puede iniciar otra simulación usando autoridad simulada;
27. aliases, labels o catálogos locales de roles no sustituyen el catálogo canónico;
28. toda denegación conserva cero efectos empresariales y evidencia de auditoría cuando corresponda;
29. las superficies legacy observadas no se presentan como certificación canónica por existir;
30. la ejecución física conserva `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`;
31. no se crean ni modifican requisitos de prueba;
32. no se ejecuta ningún cambio físico desde esta tarea documental.

---

#### 3. Autoridad contractual vigente

La certificación consume como autoridad vigente:

- `AUTH-SIM-001` a `AUTH-SIM-005` para solicitante, rol, sede, área, turno y check-in simulados;
- `AUTH-SIM-006` para separación estricta entre autoridad real, evaluación simulada, presentación y auditoría;
- `AUTH-SIM-007` a `AUTH-SIM-011` para aviso, lifecycle, bloqueo de acciones críticas y modo read-only;
- `AUTH-SIM-012` para navegación simulada sin recuperación de autoridad real;
- `AUTH-SIM-013` para Server Actions y bloqueo previo al efecto;
- `AUTH-SIM-014` para cobertura transversal entre aplicaciones;
- `AUTH-SRV-015` para separación server-side de simulación y autoridad ejecutable;
- `AUTH-DB-013` para auditoría canónica append-only de simulación y resultados no ejecutables;
- los contratos vigentes de actor, sesión, permiso, territorio, recurso, contexto, denegaciones, auditoría y frescura;
- la topología `PER_PACKAGE_AND_GLOBAL_FINAL` del BLOQUE U;
- el gate `POST_E5_PACKAGE`.

La certificación no usa como autoridad un nombre de rol visible, una cookie de override, una entrada de AsyncStorage, una selección de sede, una pantalla de preview, un `simulation_id` recibido del cliente ni un booleano de permiso.

---

#### 4. Cuatro planos obligatorios

La certificación conserva cuatro planos separados:

| Plano | Fuente | Función | Puede producir autoridad real |
| --- | --- | --- | --- |
| `REAL_AUTHORITY_PLANE` | actor, sesión, permisos, alcances, denegaciones y contexto reales | controlar entrada, datos y ejecución | Sí |
| `SIMULATED_EVALUATION_PLANE` | escenario hipotético validado y versionado | producir `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE` | No |
| `SIMULATION_PRESENTATION_PLANE` | resultado hipotético ya calculado | representar navegación, controles y razones | No |
| `SIMULATION_AUDIT_PLANE` | actor real + solicitud + escenario + resultados | trazabilidad y reproducción | No |

La prueba falla si un mismo valor ambiguo funciona simultáneamente como autoridad real y resultado simulado.

---

#### 5. Semántica exacta de “no hereda permisos reales”

El título exige demostrar una separación bidireccional.

Primera dirección:

```text
ROL SIMULADO
+ PERMISOS HIPOTÉTICOS
→ NO SE INCORPORAN AL ACTOR REAL
```

Segunda dirección:

```text
ACTOR REAL
+ PERMISOS REALES ADICIONALES
→ NO SE INCORPORAN AL ROL SIMULADO
```

La segunda dirección es obligatoria porque una simulación contaminada por los grants del simulador produciría una explicación falsa de lo que realmente podría hacer el rol hipotético.

---

#### 6. Actor real y sujeto simulado

Deben conservarse como identidades distintas:

```text
real_actor_id
≠
simulated_subject_reference
```

El sujeto simulado:

- no autentica;
- no reautentica;
- no sustituye al actor real;
- no firma acciones reales;
- no hereda una sesión Auth;
- no recibe tokens del actor real;
- no puede ser utilizado como actor de una mutación empresarial.

El actor real conserva la responsabilidad de solicitar y consultar la simulación dentro de su propia autoridad.

---

#### 7. Rol real y rol simulado

La certificación exige mantener separados:

```text
real_base_role_code
real_operational_role_code
simulated_base_role_code
simulated_operational_role_code
```

El rol simulado no reemplaza el rol real en:

- autorización de servidor;
- RLS;
- RPC;
- Server Actions;
- cobertura territorial;
- auditoría del actor;
- decisiones ejecutables.

El rol real tampoco se agrega a la evaluación hipotética cuando el escenario no lo incluye.

---

#### 8. El permiso real no completa la simulación

Si el actor real posee un permiso que el rol simulado no tendría:

```text
REAL ACTOR = HAS_PERMISSION
SIMULATED ROLE = NO_PERMISSION
→ SIMULATION = WOULD_DENY O INDETERMINATE SEGÚN EL CONTRATO
```

Queda prohibido producir `WOULD_ALLOW` solo porque el simulador tenga el permiso en su contexto real.

La misma regla aplica a grants individuales, roles amplios, coberturas administrativas, permisos operativos y excepciones reales.

---

#### 9. El permiso simulado no completa la autoridad real

Si el rol simulado tendría una capacidad que el actor real no posee:

```text
SIMULATION = WOULD_ALLOW
REAL AUTHORITY = DENY
```

El resultado hipotético puede explicar la diferencia, pero no puede:

- abrir datos reales;
- habilitar una mutación;
- firmar una operación;
- crear una sesión real;
- ampliar RLS;
- convertir un control de preview en un control ejecutable.

---

#### 10. `WOULD_ALLOW` no es `ALLOW`

La certificación exige vocabularios separados:

```text
REAL: ALLOW | DENY
SIMULADO: WOULD_ALLOW | WOULD_DENY | INDETERMINATE
```

Un resultado simulado debe conservar semántica no ejecutable.

No puede exponerse como:

- `ALLOW`;
- `true` ambiguo;
- `canOperate=true` reutilizable;
- permiso efectivo;
- claim;
- token;
- grant persistente;
- decisión cacheada consumible por un writer real.

---

#### 11. `WOULD_DENY` tampoco modifica autoridad real

Una simulación puede concluir que el sujeto hipotético sería denegado.

Eso no significa que el actor real pierda una autoridad legítima que posea fuera de la simulación.

La separación debe permitir simultáneamente:

```text
REAL_ALLOW
+
WOULD_DENY
```

sin mezclar los dos resultados.

---

#### 12. `INDETERMINATE` falla cerrado dentro del plano simulado

Si faltan datos hipotéticos obligatorios, la simulación no puede completar el escenario con el contexto real del usuario.

Ejemplos prohibidos:

- falta sede simulada → usar sede real;
- falta área simulada → usar área real;
- falta turno simulado → usar turno real;
- falta check-in simulado → usar check-in real;
- falta rol simulado → usar rol real;
- falta permiso objetivo resoluble → usar permiso real más cercano.

La salida conserva `INDETERMINATE` o el resultado de denegación contractual aplicable.

---

#### 13. Territorio real no completa territorio simulado

Las dimensiones deben permanecer separadas:

```text
real_site_ids        != simulated_site_id
real_area_ids        != simulated_area_id
```

La sede o área real del simulador limita qué información real puede consultar durante la preview, pero no completa automáticamente el escenario hipotético.

Una simulación sobre otra sede puede explicar un resultado sin otorgar al simulador acceso a datos reales de esa sede.

---

#### 14. Turno y check-in real no completan prerrequisitos simulados

Para permisos `T` y `T+C`:

| Prerrequisito | Plano real | Plano simulado |
| --- | --- | --- |
| `N` | no exige turno real | no exige turno simulado |
| `T` | exige turno real válido | exige turno simulado válido |
| `T+C` | exige turno y check-in reales | exige turno y check-in hipotéticos compatibles |

Un turno o check-in real no puede satisfacer el requisito hipotético faltante.

Un turno o check-in simulado tampoco satisface el requisito de una acción real.

---

#### 15. Lectura de datos reales

Durante una simulación, los datos empresariales reales permanecen gobernados por:

```text
PERMISO REAL DEL SIMULADOR
+ ALCANCE REAL DEL SIMULADOR
+ RLS REAL
+ RECURSO REAL
```

El permiso simulado puede determinar cómo se representa un escenario, pero no qué filas reales se consultan.

Debe ser posible mostrar:

```text
EL ROL SIMULADO TENDRÍA ACCESO
```

sin revelar el contenido protegido cuando el actor real no pueda consultarlo.

---

#### 16. RLS no consume simulación como autoridad

RLS no puede ampliar acceso usando:

- `simulation_id`;
- rol simulado;
- sede simulada;
- área simulada;
- turno simulado;
- check-in simulado;
- permiso simulado;
- `WOULD_ALLOW`;
- cookies o headers de preview;
- claims generados por simulación.

Las políticas reales continúan resolviendo actor, sesión, permisos, alcance y recurso reales.

---

#### 17. Server Actions y mutaciones empresariales

Una Server Action empresarial alcanzada con procedencia simulada debe bloquear el efecto real antes de la primera mutación.

La regla queda:

```text
SIMULATED ORIGIN
+
REAL BUSINESS ACTION
→ DENY BEFORE EFFECT
```

El rol simulado nunca es fuente de permiso para una Server Action.

La ausencia de un `simulation_id` enviado por cliente tampoco convierte automáticamente la intención en real cuando el servidor puede demostrar procedencia simulada por una fuente autoritativa.

---

#### 18. Lecturas protegidas mediante Server Action

Una lectura protegida no queda autorizada por ser read-only en términos de persistencia.

Si el actor real no puede leer el recurso, un `WOULD_ALLOW` del rol simulado no puede devolver:

- filas reales;
- archivos;
- costos;
- documentos;
- detalles sensibles;
- proyecciones ampliadas.

Cuando la preview necesite datos reales que el actor sí puede consultar, la lectura usa autoridad real independiente.

---

#### 19. Operaciones propias de simulación

Las operaciones propietarias de simulación pueden modificar exclusivamente su propio lifecycle, evaluación, revisión, auditoría o evidencia cuando el contrato las autorice.

Pueden incluir, según owner:

- iniciar una simulación;
- registrar una revisión;
- producir una evaluación hipotética;
- registrar evidencia;
- finalizar, expirar, revocar o invalidar la simulación.

Esas operaciones usan autoridad real del simulador y no la autoridad del rol simulado.

---

#### 20. Cliente no es fuente de autoridad

No pueden funcionar como fuente autoritativa de rol o territorio real:

- cookie de `roleOverride`;
- cookie de sede seleccionada;
- `AsyncStorage`;
- `localStorage`;
- `sessionStorage`;
- estado React;
- query params;
- hidden inputs;
- headers controlados por cliente;
- labels o textos visibles;
- `simulation_id` unilateral;
- un `WOULD_ALLOW` recibido del cliente.

Todos esos valores requieren resolución y validación server-side cuando participen en una preview.

---

#### 21. Baseline SHELL de override cliente

El template actual de ProfileMenu conserva superficies cliente de override de rol y sede.

La certificación trata esas superficies como baseline a controlar, no como autoridad.

Debe demostrarse que:

```text
CAMBIAR ROLE_OVERRIDE_COOKIE
O APP_SITE_OVERRIDE_ID
→ NO CAMBIA PERMISOS REALES
→ NO CAMBIA COBERTURA REAL
→ NO CAMBIA ACTOR REAL
```

La presentación puede variar cuando el contrato de simulación lo permita; la decisión ejecutable no.

---

#### 22. Baseline PASS de override local

La cobertura vigente registra persistencia de rol y sede simulados en cliente bajo `vento.roleOverride`.

La certificación exige que:

- AsyncStorage no conceda permiso;
- un rol textual no cambie contexto server-side;
- una sede local no amplíe territorio;
- el cambio de usuario no reutilice una simulación anterior;
- una recuperación de caché no reactive autoridad simulada;
- la limpieza y expiración respeten el lifecycle propietario.

La existencia de override local es evidencia de superficie a certificar, no evidencia de cumplimiento.

---

#### 23. `SimulatedRoleNotice` es presentación, no autoridad

El componente compartido de aviso de rol simulado se trata como una superficie de presentación.

Su contrato de certificación exige que no resuelva por sí mismo:

- permisos;
- actor;
- sesión;
- alcance;
- lifecycle;
- `WOULD_ALLOW`;
- `ALLOW`;
- persistencia de simulación.

Un aviso visible correcto no sustituye la validación del owner que decide si la simulación está activa.

---

#### 24. Navegación simulada no recupera autoridad real

Una preview puede representar navegación hipotética, pero la transición permanece en el plano simulado mientras la simulación siga vigente.

Debe demostrarse:

```text
REAL ACTOR MAY ACCESS DESTINATION
+
CURRENT ORIGIN IS SIMULATED
→ CURRENT TRANSITION REMAINS SIMULATED
```

Y también:

```text
SIMULATED ROLE WOULD ACCESS DESTINATION
+
REAL ACTOR CANNOT ACCESS DESTINATION
→ NO REAL ACCESS
```

La prueba específica de bypass por acceso directo a URL pertenece a `AUTH-QA-020` y no se absorbe en esta tarea.

---

#### 25. Simulación no crea tokens, claims ni sesiones Auth

Una simulación no puede:

- emitir un access token con permisos simulados;
- persistir rol, sede, área o permiso simulados en cookies de autenticación;
- crear una sesión Auth para el sujeto simulado;
- almacenar `WOULD_ALLOW` como claim;
- convertir `simulation_id` en credencial.

Si existe un token técnico de preview, debe estar restringido a la finalidad de simulación y ser inaceptable para RLS y endpoints empresariales como autoridad ejecutable.

---

#### 26. Cache real y simulado permanecen separados

La certificación prohíbe una clave de cache compartida que pueda mezclar ambos planos.

Debe impedirse:

- usar una respuesta real cacheada para completar el escenario hipotético;
- usar un resultado simulado para una mutación real posterior;
- restaurar automáticamente una simulación como contexto efectivo;
- conservar autoridad después de expiración, revocación, cambio de actor o salida.

Un cache miss obliga a reevaluar; no habilita fallback al otro plano.

---

#### 27. Salida de simulación y regreso a contexto real

Para ejecutar una acción real después de una simulación debe existir una transición explícita:

```text
TERMINAR / ABANDONAR SIMULACIÓN
→ DESCARTAR CONTEXTO, CACHE Y RESULTADO SIMULADOS
→ RESTAURAR REPRESENTACIÓN REAL
→ RESOLVER ACTOR, SESIÓN, PERMISO, ALCANCE Y RECURSO REALES
→ NUEVA DECISIÓN REAL
```

Un `WOULD_ALLOW` anterior no se reutiliza en la nueva decisión.

---

#### 28. Simulación anidada no hereda autoridad

Una simulación vigente no puede iniciar otra simulación utilizando:

- rol simulado;
- permisos hipotéticos;
- alcance simulado;
- `WOULD_ALLOW`;
- sujeto simulado.

Para iniciar otra simulación debe recuperarse contexto real válido y volver a resolver la elegibilidad del simulador.

---

#### 29. Catálogos y aliases locales no autorizan

Roles locales, aliases ingleses, labels humanos, roles legacy u opciones de UI no constituyen claves definitivas de autorización.

La certificación debe demostrar que un override que use un nombre local no puede:

- crear un rol canónico inexistente;
- mapearse silenciosamente a un rol más privilegiado;
- omitir restricciones de sede, área o modalidad;
- conceder grants fuera del catálogo canónico.

La reconciliación del catálogo es una dependencia contractual; la UI no puede resolverla por conveniencia.

---

#### 30. Baseline físico observado

El estado físico actual contiene piezas útiles pero no equivale a certificación completa:

1. `AUTH-DB-013` materializa auditoría canónica append-only de simulación;
2. las evaluaciones persistidas aceptan únicamente `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE`;
3. las evaluaciones canónicas conservan `executable = false`;
4. la migración mantiene superficies legacy de simulación para transición y las declara no adoptadas como persistencia canónica;
5. continúan presentes `get_effective_context_v1`, `has_effective_permission_v1`, `start_context_simulation_v1` y `stop_context_simulation_v1` como superficies legacy preservadas;
6. `packages/os-context` todavía expone un `EffectiveContext` único con `source`, roles efectivos y `simulation_id`;
7. `packages/os-context` todavía expone `hasEffectivePermission` sobre `has_effective_permission_v1`;
8. el template AppShell conserva overrides cliente de rol y sede;
9. existe un componente compartido `SimulatedRoleNotice` diseñado como presentación sin autoridad propia;
10. la cobertura PASS registra persistencia cliente de rol y sede simulados.

Este baseline permite diseñar y localizar pruebas, pero no autoriza declarar que todos los consumidores ya cumplen la separación real/simulada.

---

#### 31. Casos mínimos obligatorios por package

| Caso | Condición diferencial | Resultado esperado |
| --- | --- | --- |
| `AUTH-QA-019-A` | actor real sin permiso; rol simulado sí tendría el permiso | `WOULD_ALLOW` posible, pero autoridad real permanece `DENY` y no hay efecto |
| `AUTH-QA-019-B` | actor real sí posee permiso; rol simulado no lo tendría | simulación conserva `WOULD_DENY` o resultado contractual equivalente; no hereda el permiso real |
| `AUTH-QA-019-C` | falta sede simulada pero el actor real tiene sede válida | no se completa con sede real; escenario falla cerrado o queda indeterminado |
| `AUTH-QA-019-D` | falta turno/check-in simulado pero el actor real los posee | no se usan para satisfacer `T` o `T+C` hipotéticos |
| `AUTH-QA-019-E` | cookie o estado local cambia rol a uno privilegiado | la autoridad real no cambia |
| `AUTH-QA-019-F` | sede local o query cambia a territorio más amplio | la cobertura real no cambia |
| `AUTH-QA-019-G` | preview requiere datos que el actor real no puede leer | no se revelan datos; puede mostrarse explicación mínima |
| `AUTH-QA-019-H` | Server Action empresarial recibe procedencia simulada | `DENY` antes del primer efecto empresarial |
| `AUTH-QA-019-I` | `simulation_id` se presenta como credencial | no concede autoridad; se valida solo como referencia de escenario |
| `AUTH-QA-019-J` | cliente omite referencia de simulación pero el servidor prueba origen simulado | la procedencia sigue siendo simulada; efecto real bloqueado |
| `AUTH-QA-019-K` | usuario sale de simulación e intenta acción real | contexto simulado descartado y autorización real recalculada desde cero |
| `AUTH-QA-019-L` | intento de iniciar otra simulación desde contexto simulado | `DENY` hasta recuperar contexto real y reevaluar elegibilidad |
| `AUTH-QA-019-M` | rol local/legacy no coincide con catálogo canónico | no se convierte en autoridad ni en escenario válido por inferencia |
| `AUTH-QA-019-N` | `WOULD_ALLOW` llega por cache o input cliente | no se consume como `ALLOW` ni como permiso efectivo |
| `AUTH-QA-019-O` | `WOULD_DENY` en simulación y actor real sí tiene permiso | no retira la autoridad real fuera de la simulación; planos permanecen separados |

Si una superficie necesaria para un caso no existe materialmente en el package, el caso se registra `NOT_APPLICABLE` con evidencia. No se fabrica una superficie para forzar ejecución.

---

#### 32. Clasificación de fallos

Un fallo de `AUTH-QA-019` se clasifica por la frontera rota:

- `SIMULATED_TO_REAL_PRIVILEGE_LEAK` — el rol o permiso simulado amplía autoridad real;
- `REAL_TO_SIMULATED_PRIVILEGE_CONTAMINATION` — permiso real del simulador altera la evaluación hipotética;
- `SIMULATED_TERRITORY_REAL_ESCALATION` — sede o área simuladas amplían cobertura real;
- `REAL_TERRITORY_SIMULATION_FALLBACK` — territorio real completa un escenario hipotético incompleto;
- `REAL_SHIFT_SIMULATION_FALLBACK` — turno o check-in reales satisfacen prerrequisitos simulados;
- `SIMULATED_CONTEXT_REAL_PREREQUISITE` — turno/check-in simulados satisfacen una acción real;
- `WOULD_ALLOW_EXECUTION_ALIAS` — `WOULD_ALLOW` se trata como `ALLOW` o permiso ejecutable;
- `AMBIGUOUS_PERMISSION_BOOLEAN` — un booleano mezcla autoridad real y resultado simulado;
- `SIMULATION_DATA_EXPOSURE` — datos reales quedan expuestos por autoridad simulada;
- `CLIENT_OVERRIDE_AUTHORITY` — cookie, storage, query, header o estado UI concede autoridad;
- `SIMULATION_ID_CREDENTIALIZATION` — `simulation_id` funciona como credencial;
- `SIMULATION_TOKEN_AUTHORITY` — token o claim de preview es aceptado por una frontera real;
- `SIMULATION_CACHE_CROSS_CONTAMINATION` — cache real y simulado se mezclan;
- `SIMULATION_EXIT_STALE_AUTHORITY` — autoridad simulada sobrevive a la salida;
- `NESTED_SIMULATION_AUTHORITY` — una simulación inicia otra con autoridad hipotética;
- `LOCAL_ROLE_CATALOG_ESCALATION` — alias o rol local crea autoridad canónica inexistente;
- `PARTIAL_EFFECT_ON_SIMULATION_DENY` — una denegación por simulación produce efecto empresarial parcial;
- `AUDIT_PLANE_AMBIGUITY` — la evidencia no permite distinguir actor real, escenario y resultado simulado.

La clasificación es diagnóstica y no crea nuevos reason codes públicos.

---

#### 33. Modelo de ejecución por paquete

Cada package que materialice superficies afectadas ejecutará:

```text
AUTH-QA-019::<package_id>
```

únicamente cuando:

- el package aplicable exista;
- `E5-GATE-008::<package_id>` haya pasado;
- las dependencias físicas aplicables estén disponibles;
- las superficies de simulación y autorización necesarias estén materializadas;
- la instancia se encuentre autorizada conforme al lifecycle físico correspondiente.

La ejecución por package debe cubrir únicamente superficies realmente presentes y conservar `NOT_APPLICABLE` para casos materialmente ausentes.

---

#### 34. Certificación global final

La certificación:

```text
AUTH-QA-019::GLOBAL-FINAL
```

consolida evidencia de todos los packages aplicables y debe demostrar uniformidad entre consumidores.

Debe fallar si existe al menos un consumidor donde:

- un rol simulado conceda autoridad real;
- un permiso real contamine el resultado hipotético;
- territorio real y simulado se fusionen;
- turno o check-in crucen de un plano al otro;
- `WOULD_ALLOW` resulte ejecutable;
- datos reales se amplíen por simulación;
- un override cliente conceda autoridad;
- una Server Action empresarial ejecute desde procedencia simulada;
- `simulation_id` opere como credencial;
- cache o tokens mezclen planos;
- una simulación terminal conserve autoridad;
- un rol local o legacy permita escalamiento;
- una denegación produzca un efecto empresarial.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

```text
Requisitos creados: 0
Requisitos modificados: 0
```

La tarea materializa una certificación ya exigida por cobertura existente y no introduce una obligación verificable nueva.

---

#### 36. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación el Registro 04A:

- `TREQ-AUTH-012` — la simulación permanece separada de la autoridad real, no mezcla permisos reales y simulados, bloquea acciones críticas y conserva auditoría;
- `TREQ-AUTH-015` — decisiones y acciones protegidas conservan evidencia correlacionable de actor, simulación, rol, contexto, permiso, recurso, decisión y razones;
- `TREQ-SHELL-031` — simulación de rol y selección de sede del ProfileMenu permanecen separadas de autoridad real y cookies o escrituras cliente no conceden rol, sede ni permiso efectivo;
- `TREQ-PASS-019` — rol y sede almacenados en PASS son exclusivamente simulación visible y no conceden permisos ni modifican contexto server-side;
- `TREQ-PASS-020` — simulación laboral en PASS exige actor autorizado, aviso, lifecycle, expiración, limpieza y bloqueo de mutaciones críticas;
- `TREQ-PASS-021` — roles locales de PASS se reconcilian con el catálogo canónico y no funcionan como claves definitivas de autorización.

Estas referencias son trazabilidad de cobertura existente y no una actualización del Registro 04A.

---

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental no ha sido incorporado todavía al checkout del usuario; build y suites de consumidores corresponden a la incorporación posterior y a las ejecuciones físicas propietarias. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, batería global y lifecycle documental permanecen pendientes del checkout local del usuario. |
| REMOTA | PASS | Se verificaron en `main` el owner del BLOQUE U, la topología `PER_PACKAGE_AND_GLOBAL_FINAL`, los contratos `AUTH-SIM-001..014`, la separación real/simulada de `AUTH-SIM-006`, la validación de navegación y Server Actions, `AUTH-DB-013`, el baseline actual de `packages/os-context`, el override cliente del template AppShell, el componente `SimulatedRoleNotice` y la cobertura vigente 04A que referencia expresamente `AUTH-QA-019`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron simulaciones reales, cambios de rol, cambios de sede, lecturas protegidas, Server Actions, mutaciones, salidas de simulación ni intentos de contaminación entre planos. |
| FÍSICA | NOT_EXECUTED | No se ejecutó `AUTH-QA-019::<package_id>` ni `AUTH-QA-019::GLOBAL-FINAL`; las superficies y consumidores permanecen sujetos a su lifecycle y gate físicos. |

---

#### 38. Criterios de aceptación

- [ ] Actor real y sujeto simulado permanecen separados.
- [ ] Sesión real y referencia de simulación permanecen separadas.
- [ ] Rol real y rol simulado permanecen separados.
- [ ] Permisos reales no completan el escenario simulado.
- [ ] Permisos simulados no amplían autoridad real.
- [ ] `WOULD_ALLOW` nunca equivale a `ALLOW`.
- [ ] `WOULD_DENY` no retira por sí solo autoridad real legítima.
- [ ] `INDETERMINATE` no cae en fallback al contexto real.
- [ ] Sede y área reales no completan territorio simulado.
- [ ] Sede y área simuladas no amplían territorio real.
- [ ] Turno y check-in reales no satisfacen prerrequisitos simulados.
- [ ] Turno y check-in simulados no satisfacen prerrequisitos reales.
- [ ] Los datos reales visibles permanecen bajo autoridad real del simulador.
- [ ] RLS no consume rol, sede, área, permiso ni resultado simulados como autoridad.
- [ ] Server Actions empresariales bloquean procedencia simulada antes del efecto.
- [ ] Lecturas protegidas no amplían datos por autoridad simulada.
- [ ] Lifecycle de simulación usa autoridad real del simulador.
- [ ] Cookies, AsyncStorage, localStorage, query, headers y estado UI no conceden autoridad.
- [ ] `simulation_id` no funciona como credencial.
- [ ] Simulación no crea tokens o claims ejecutables.
- [ ] Cache real y simulado permanecen separados.
- [ ] Salir de simulación exige contexto real fresco.
- [ ] Una simulación no inicia otra con autoridad simulada.
- [ ] Roles locales y aliases no sustituyen el catálogo canónico.
- [ ] El baseline legacy no se presenta como certificación integral.
- [ ] Toda denegación conserva cero efectos empresariales.
- [ ] La evidencia permite distinguir plano real, plano simulado, presentación y auditoría.
- [ ] La ejecución física sigue `PER_PACKAGE_AND_GLOBAL_FINAL` y `POST_E5_PACKAGE`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos desde esta tarea documental.

---

#### 39. Límites

Esta tarea no:

- redefine quién puede iniciar una simulación;
- redefine qué roles son simulables;
- redefine sede, área, turno o check-in simulados;
- redefine el lifecycle de simulación;
- redefine el aviso persistente;
- redefine el modo read-only;
- redefine la matriz `FULL_PREVIEW`, `DECISION_ONLY` o `NOT_ALLOWED`;
- reabre los contratos `AUTH-SIM-001..014`;
- convierte `packages/os-context` en contrato canónico nuevo;
- retira superficies legacy de simulación;
- modifica `get_effective_context_v1` ni `has_effective_permission_v1`;
- modifica el template AppShell ni sus cookies;
- modifica PASS ni `vento.roleOverride`;
- modifica `SimulatedRoleNotice`;
- modifica código, RLS, RPC, migraciones, Edge Functions, Supabase, datos o configuración;
- certifica bypass por acceso directo a URL, reservado a `AUTH-QA-020`;
- certifica manipulación de formularios, reservada a `AUTH-QA-021`;
- certifica manipulación directa de RPC, reservada a `AUTH-QA-022`;
- certifica cruce de sede, reservado a `AUTH-QA-023`;
- certifica cruce de área, reservado a `AUTH-QA-024`;
- ejecuta `AUTH-QA-018::<package_id>`;
- ejecuta `AUTH-QA-019::<package_id>`;
- ejecuta `AUTH-QA-019::GLOBAL-FINAL`;
- selecciona un package físico;
- aprueba ni ejecuta `E5-GATE-008`;
- modifica el Registro 04A.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-QA-018 — PIN identifica al trabajador real`

**TAREA ACTUAL APROBADA**
`AUTH-QA-019 — Rol simulado no hereda permisos reales`

**SIGUIENTE TAREA RESERVADA**
`AUTH-QA-020 — Acceso directo por URL queda bloqueado`
### [ ] AUTH-QA-020 — Acceso directo por URL queda bloqueado
### [ ] AUTH-QA-021 — Formulario manipulado queda bloqueado en servidor
### [ ] AUTH-QA-022 — RPC manipulada queda bloqueada
### [ ] AUTH-QA-023 — Cruce de sede queda bloqueado
### [ ] AUTH-QA-024 — Cruce de área queda bloqueado
### [ ] AUTH-QA-025 — Check-out retira permisos operativos
### [ ] AUTH-QA-026 — Cola offline de ANIMA se revalida
### [ ] AUTH-QA-027 — Actualización de paquete no rompe otros repositorios
### [ ] AUTH-QA-028 — Rollback funciona por aplicación
### [ ] AUTH-QA-029 — Auditoría conserva actor, turno, sede y área
### [ ] AUTH-QA-030 — Ejecutar prueba de regresión completa

### Subconjunto VISO mensual

`003`, `017`, `019`, `020`, `021`, `023`, `024`, `027`, `028`, `029` y `030` son obligatorias para el package.
