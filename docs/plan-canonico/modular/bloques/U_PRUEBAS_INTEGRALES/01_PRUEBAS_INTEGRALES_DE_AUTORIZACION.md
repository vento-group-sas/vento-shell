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
### [ ] AUTH-QA-003 — Gerente de sede solo opera sus sedes
### [ ] AUTH-QA-004 — Trabajador sin turno queda bloqueado
### [ ] AUTH-QA-005 — Trabajador con turno sin check-in queda bloqueado
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
