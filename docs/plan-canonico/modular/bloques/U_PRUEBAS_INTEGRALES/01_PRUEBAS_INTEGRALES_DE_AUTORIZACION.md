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
### [ ] AUTH-QA-006 — Trabajador con turno y check-in obtiene su rol operativo
### [ ] AUTH-QA-007 — Trabajador solo ve su sede
### [ ] AUTH-QA-008 — Trabajador solo ve su área
### [ ] AUTH-QA-009 — Trabajador rotado cambia de permisos por turno
### [ ] AUTH-QA-010 — Bodeguero puede preparar pero no producir
### [ ] AUTH-QA-011 — Producción puede producir pero no ajustar inventario global
### [ ] AUTH-QA-012 — Cajero puede operar PULSO pero no configurar
### [ ] AUTH-QA-013 — Conductor puede transitar sin área productiva
### [ ] AUTH-QA-014 — Conductor no puede preparar ni recibir inventario general
### [ ] AUTH-QA-015 — Compras puede crear órdenes según alcance
### [ ] AUTH-QA-016 — Recepción puede recibir pero no aprobar compras
### [ ] AUTH-QA-017 — Dispositivo compartido limita al administrador autenticado
### [ ] AUTH-QA-018 — PIN identifica al trabajador real
### [ ] AUTH-QA-019 — Rol simulado no hereda permisos reales
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
