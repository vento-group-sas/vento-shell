### MINI-BLOQUE — AUDITORÍA Y DECISIÓN DE CONTINUIDAD

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **auditoría y decisión de continuidad** dentro de **W AURA**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AURA-AUD-001` a `AURA-AUD-012` — 12 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Confirmar repositorio propietario” y concluye con “Mantener roadmap de implementación bloqueado hasta decisión”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:AURA-AUD -->
### Reconciliación topológica de AURA-AUD-001 a AURA-AUD-012

El mini-bloque es auditoría y decisión: confirma repositorio, producto, usuarios, superficies, datos, relaciones y la continuidad de AURA. No materializa el producto.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

`AURA-DOM`, `AURA-AUTH`, `AURA-UX` y `AURA-INT` conservan además el bloqueo explícito hasta resolver `AURA-AUD-010` y `AURA-AUD-011`.

### ✅ AURA-AUD-001 — Confirmar repositorio propietario

**Estado:** APROBADA
**Tarea anterior:** PASS-QA-002 — Probar flujo completo de redención
**Tarea siguiente:** AURA-AUD-002 — Confirmar estado real del producto
**Tipo de tarea:** auditoría técnico-documental de ownership de repositorio; confirma la existencia o ausencia de un repositorio standalone para AURA, separa identidad de aplicación, repositorio técnico, código relacionado y consumidor público, y conserva `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE` sin crear ni asignar infraestructura
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; AURA queda confirmada sin repositorio standalone propietario en el inventario canónico vigente y sin transferencia de ownership desde repositorios existentes
**Cambios físicos autorizados:** ninguno; esta tarea no crea repositorios, no mueve código, no cambia remotos, no modifica DNS, Supabase, permisos, rutas, pantallas, launchers, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Confirmar de forma inequívoca qué repositorio implementa actualmente AURA y cerrar la ambigüedad entre:

- la identidad canónica de aplicación `aura`;
- el permiso reservado `aura.access`;
- referencias de AURA en launchers y login;
- capacidades actuales de contenido web;
- repositorios técnicos existentes;
- una aplicación AURA standalone.

La respuesta canónica de esta tarea es:

```text
AURA COMO IDENTIDAD DE APLICACION = EXISTE
REPOSITORIO STANDALONE DE AURA = ABSENT
REPOSITORIO PROPIETARIO DE AURA RUNTIME = NO_CONFIRMADO
TRANSFERENCIA DE OWNERSHIP DESDE OTRO REPOSITORIO = NO
```

La ausencia de repositorio no elimina el código de aplicación `aura`, no reutiliza su identidad y no decide todavía continuidad, reemplazo o retiro del producto.

---

#### 2. Reconciliación topológica

El mini-bloque `AURA-AUD-001..012` conserva:

```text
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
```

Por tanto, `AURA-AUD-001` produce una decisión documental única sobre el estado de ownership técnico observado.

No crea una instancia física, no selecciona package, no habilita implementación y no modifica ningún repositorio de producto.

`AURA-DOM`, `AURA-AUTH`, `AURA-UX` y `AURA-INT` permanecen bloqueadas hasta las decisiones posteriores de `AURA-AUD-010` y `AURA-AUD-011`.

---

#### 3. Fuentes canónicas consumidas

La auditoría consume como evidencia principal:

1. el roadmap maestro, que reconoce repositorios técnicos para las demás aplicaciones y declara que AURA no tiene repositorio ni implementación funcional confirmada;
2. la auditoría técnica `TEC-01`, que concluyó que no existe repositorio AURA;
3. `AUTH-UI-010`, que fijó `AURA-CURRENT-EXISTENCE-REGISTER-001` con `Repositorio AURA = ABSENT`;
4. el Registro 04A vigente de AURA, que exige detectar cero repositorios standalone;
5. el catálogo canónico de aplicaciones, donde `aura` es una aplicación administrativa diferida y se distingue expresamente una aplicación de un repositorio;
6. el bloque W, que impide implementar o ampliar AURA antes de completar la auditoría y decisión de continuidad;
7. la inspección remota actual de los repositorios y referencias AURA disponibles.

Ninguna de estas fuentes autoriza inferir un repositorio propietario a partir del nombre de la aplicación.

---

#### 4. Regla de identidad que gobierna la decisión

El catálogo canónico establece:

```text
APLICACION
!=
REPOSITORIO
```

El código `aura` es una identidad funcional estable y reservada.

Por tanto:

- `aura` en el catálogo no demuestra que exista un repositorio;
- `aura.access` no demuestra que exista un producto implementado;
- un logo de AURA no demuestra que exista aplicación runtime;
- una entrada `soon` no demuestra que exista repositorio;
- metadata de login no demuestra ownership técnico;
- una URL reservada no demuestra despliegue;
- código de marketing o contenido alojado en otra aplicación no convierte automáticamente ese repositorio en repositorio AURA.

---

#### 5. Resultado de ownership de repositorio

| Elemento auditado | Resultado | Decisión |
| --- | --- | --- |
| identidad canónica `aura` | existe | se conserva |
| permiso base `aura.access` | existe como reserva canónica | no demuestra implementación |
| repositorio standalone de AURA | `ABSENT` | no existe repositorio propietario AURA confirmado |
| repositorio runtime propietario de AURA | `NO_CONFIRMADO` | no se asigna uno por inferencia |
| entorno de ejecución AURA | `ENV-AURA-BLOCKED` | no existe entorno habilitado por esta tarea |
| planificación ejecutable AURA | `BLOQUEADO_AURA_SIN_REPOSITORIO` | permanece bloqueada |
| decisión continuidad/reemplazo/retiro | no corresponde a esta tarea | pertenece a `AURA-AUD-010` |
| ADR de la decisión | no corresponde a esta tarea | pertenece a `AURA-AUD-011` |

La ausencia de repositorio es un resultado positivo de auditoría: confirma el estado real; no es un permiso para crear uno.

---

#### 6. Repositorios relacionados que no adquieren ownership de AURA

| Repositorio | Rol actual relacionado | Regla |
| --- | --- | --- |
| `vento-shell` | gobierno documental, contratos compartidos, catálogo, login y referencias de AURA | no se convierte en aplicación AURA |
| `vento-viso` | contiene las capacidades administrativas actuales de website CMS observadas | conserva ownership actual hasta una decisión posterior |
| `Vento-Group` | consume públicamente contenido administrado por el CMS actual | sigue siendo consumidor público, no repositorio AURA |
| `vento-nexo` | contiene referencia de AURA en AppSwitcher | la referencia `soon` no concede ownership |
| `vento-fogo` | contiene referencia de AURA en AppSwitcher | la referencia `soon` no concede ownership |
| `vento-origo` | contiene referencia de AURA en AppSwitcher | la referencia `soon` no concede ownership |
| `vento-pulso` | contiene referencia de AURA en AppSwitcher | la referencia `soon` no concede ownership |

El código existente conserva su propietario observado hasta que una tarea posterior con autoridad explícita apruebe una transferencia.

---

#### 7. Confirmación remota vigente

La inspección remota actual demuestra simultáneamente:

- repositorios VENTO activos como `vento-viso`, `vento-nexo`, `vento-fogo`, `vento-origo` y `vento-pulso` sí son resolubles;
- no se resolvió un repositorio standalone de AURA;
- las referencias actuales de AURA en SHELL y aplicaciones operativas continúan declarando estado diferido o `soon`;
- el login central presenta AURA como identidad diferida y producto web no disponible;
- VISO mantiene código real de `website-cms`;
- `Vento-Group` mantiene el consumidor público actual.

Esta evidencia es coherente con `AUTH-UI-010`, el roadmap maestro y `TEC-01`.

---

#### 8. Frontera entre ausencia y futura decisión

`AURA-AUD-001` confirma únicamente el estado actual:

```text
HOY:
NO HAY REPOSITORIO STANDALONE AURA CONFIRMADO
```

No decide:

- si AURA debe continuar como producto;
- si debe reemplazarse por capacidades de VISO u otra aplicación;
- si debe retirarse;
- si un futuro AURA deberá usar repositorio separado;
- cuál sería el nombre o ubicación de un futuro repositorio;
- si las capacidades CMS actuales deberán migrarse.

Esas decisiones permanecen reservadas a `AURA-AUD-007..011`, especialmente `AURA-AUD-010` y `AURA-AUD-011`.

---

#### 9. Efecto sobre el roadmap bloqueado

La confirmación de ausencia no libera el roadmap.

Permanece vigente:

```text
AURA-DOM = BLOQUEADO
AURA-AUTH = BLOQUEADO
AURA-UX = BLOQUEADO
AURA-INT = BLOQUEADO
```

La salida de `AURA-AUD-001` sirve de entrada para continuar la auditoría, no como autorización de implementación.

El bloqueo solo puede reevaluarse después de completar la puerta de decisión definida en el bloque W.

---

#### 10. Handoff hacia AURA-AUD-002

`AURA-AUD-002 — Confirmar estado real del producto` recibe como entrada aprobada:

1. `aura` existe como identidad canónica;
2. `aura.access` es una reserva de acceso y no prueba capacidades;
3. el repositorio standalone de AURA está `ABSENT`;
4. no existe repositorio runtime propietario confirmado;
5. las capacidades actuales relacionadas permanecen en sus repositorios propietarios observados;
6. las referencias `soon` o de login no cuentan como producto AURA;
7. AURA permanece diferida y bloqueada.

`AURA-AUD-002` deberá determinar qué producto o capacidad real existe, si existe alguna, sin reinterpretar la ausencia de repositorio como ausencia automática de toda capacidad relacionada en el ecosistema.

---

#### 11. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la ausencia de repositorio standalone, la separación entre placeholders y producto implementado, y el deber de registrar cualquier alta, retiro o cambio de repositorio ya están protegidos por cobertura AURA vigente. Esta tarea confirma el estado actual contra esas obligaciones sin crear una regla verificable nueva.

---

#### 12. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-AURA-004`, que exige detectar cero repositorios standalone, cero rutas propias y cero pantallas propias de AURA;
- `TREQ-AURA-005`, que exige delta explícito ante cualquier alta, retiro o cambio de repositorio relacionado con AURA;
- `TREQ-AURA-006`, que mantiene AURA como no disponible mientras no existan repositorio, despliegue, rutas certificadas, autorización y decisión formal de continuidad;
- `TREQ-AURA-007`, que conserva las capacidades actuales de contenido web atribuidas a sus propietarios existentes hasta una transferencia aprobada.

Esta sección documenta cobertura existente y no actualiza el Registro 04A.

---

#### 13. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `AURA-AUD-001` en su rama propia mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en el checkout del usuario ni sometido allí al formateador, quality, delivery check y batería documental. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` el roadmap maestro, bloque W, owner de la tarea, `AUTH-UI-010`, Registro 04A AURA, catálogo de aplicaciones y referencias actuales; la consulta remota confirma repositorios VENTO resolubles y no identifica un repositorio standalone AURA, en coherencia con el estado canónico `ABSENT`. |
| OPERATIVA | `NOT_APPLICABLE` | Confirmar ownership de repositorio es una auditoría documental; no requiere ejecutar campañas, publicaciones, canales, clientes ni procesos de marketing. |
| FÍSICA | `NOT_APPLICABLE` | `AURA-AUD-001` pertenece a `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea ni modifica infraestructura o repositorios. |

---

#### 14. Criterios de aceptación

- [x] Se distingue aplicación AURA de repositorio técnico.
- [x] Se confirma que `aura` y `aura.access` son identidades canónicas existentes, no evidencia de implementación.
- [x] Se confirma `Repositorio AURA = ABSENT`.
- [x] Se conserva `NO_CONFIRMADO` para el repositorio runtime propietario de AURA.
- [x] No se atribuye AURA a `vento-shell`.
- [x] No se atribuye AURA a `vento-viso`.
- [x] No se atribuye AURA a `Vento-Group`.
- [x] Las referencias `soon`, login y logos no se contabilizan como repositorio o producto.
- [x] Las capacidades actuales de website CMS permanecen en `vento-viso`.
- [x] El consumidor público permanece en `Vento-Group`.
- [x] La ausencia de repositorio no autoriza crear uno.
- [x] El roadmap AURA permanece bloqueado.
- [x] Se entrega a `AURA-AUD-002` una entrada inequívoca para auditar el estado real del producto.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se ejecuta ninguna materialización física.

---

#### 15. Límites

Esta tarea no:

- crea un repositorio de AURA;
- propone un nombre para un futuro repositorio;
- mueve código desde VISO;
- mueve contenido desde `Vento-Group`;
- modifica launchers o login;
- habilita `aura.access`;
- crea rutas, pantallas o navegación AURA;
- modifica DNS o dominios;
- crea despliegues;
- modifica Supabase;
- conecta redes sociales, correo, mensajería, reseñas, analítica o IA;
- define usuarios de AURA;
- decide continuidad, reemplazo o retiro;
- crea ADR;
- desbloquea `AURA-DOM`, `AURA-AUTH`, `AURA-UX` o `AURA-INT`;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 16. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-QA-002 — Probar flujo completo de redención`

**TAREA ACTUAL APROBADA**
`AURA-AUD-001 — Confirmar repositorio propietario`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-002 — Confirmar estado real del producto`
### ✅ AURA-AUD-002 — Confirmar estado real del producto

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-001 — Confirmar repositorio propietario
**Tarea siguiente:** AURA-AUD-003 — Confirmar usuarios actuales
**Tipo de tarea:** auditoría técnico-documental del estado real de producto; distingue identidad canónica, referencias de interfaz, capacidades relacionadas y producto AURA funcional, sin implementar, habilitar ni transferir capacidades
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; AURA queda confirmada como identidad canónica diferida sin producto standalone funcional, navegable o desplegado en el estado vigente
**Cambios físicos autorizados:** ninguno; esta tarea no crea producto, repositorio, rutas, pantallas, navegación, datos, permisos, canales, despliegues, DNS, Supabase ni integraciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Confirmar el estado real de AURA como producto y separar de forma verificable cuatro conceptos que no son equivalentes:

1. identidad canónica de aplicación;
2. referencias visuales o de catálogo;
3. capacidades relacionadas existentes en otros productos;
4. producto AURA funcional.

La conclusión canónica de esta tarea es:

```text
AURA_CANONICAL_IDENTITY = EXISTS
AURA_STANDALONE_REPOSITORY = ABSENT
AURA_WEB_PRODUCT = NOT_IMPLEMENTED
AURA_WEB_AVAILABILITY = FALSE
AURA_RUNTIME_ENTRY = UNAVAILABLE
AURA_FUNCTIONAL_PRODUCT_STATE = DEFERRED
AURA_CONTINUITY_DECISION = PENDING_AURA_AUD_010
```

AURA existe como identidad administrativa reservada dentro del ecosistema, pero esa identidad no corresponde hoy a un producto standalone utilizable.

---

#### 2. Reconciliación topológica

El mini-bloque `AURA-AUD-001..012` conserva:

```text
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
```

`AURA-AUD-002` produce una única determinación documental del estado actual de producto.

No genera instancia física, no selecciona package, no crea infraestructura y no autoriza implementación.

`AURA-DOM`, `AURA-AUTH`, `AURA-UX` y `AURA-INT` permanecen bloqueadas hasta completar la decisión posterior de `AURA-AUD-010` y su registro mediante `AURA-AUD-011` cuando corresponda.

---

#### 3. Entradas aprobadas

La tarea consume como base:

- `AURA-AUD-001`, que confirma `Repositorio standalone de AURA = ABSENT` y prohíbe atribuir ownership a otro repositorio por inferencia;
- el roadmap maestro, que clasifica AURA como aplicación administrativa diferida;
- la auditoría técnica `TEC-01..03`, que distingue registro de aplicación, reserva de permiso y producto funcional;
- `AUTH-UI-010`, que confirmó cero repositorios standalone, cero rutas propias y cero pantallas propias de AURA en su línea base;
- el bloque W, que prohíbe implementar o ampliar AURA antes de cerrar la auditoría y decisión de continuidad;
- el Registro 04A vigente de AURA;
- el código remoto actual de SHELL y los AppSwitchers de las aplicaciones inspeccionadas.

Estas entradas permiten confirmar el estado real del producto sin decidir todavía su futuro.

---

#### 4. Contrato de realidad de producto

Se define:

```text
AURA_PRODUCT_REALITY_CONTRACT = AURA-CURRENT-PRODUCT-STATE-001
```

El contrato usa las siguientes reglas:

```text
IDENTIDAD_CANONICA
!= PRODUCTO_FUNCIONAL

PERMISO_RESERVADO
!= CAPACIDAD_IMPLEMENTADA

REFERENCIA_VISUAL
!= SUPERFICIE_NAVEGABLE

CAPACIDAD_RELACIONADA_EN_OTRO_PRODUCTO
!= PRODUCTO_AURA

ROADMAP_OBJETIVO
!= ESTADO_RUNTIME_ACTUAL
```

Una señal documental o visual solo cuenta como producto real cuando existe una cadena técnica y funcional atribuible a AURA que pueda ser identificada como producto propio. Esa cadena no está presente en el estado vigente.

---

#### 5. Matriz del estado real

| Dimensión | Evidencia vigente | Estado de AURA | Decisión |
| --- | --- | --- | --- |
| identidad de aplicación | código canónico `aura` | `EXISTS` | se conserva |
| clasificación | aplicación administrativa | `DEFERRED` | no equivale a disponibilidad |
| permiso base | `aura.access` | `RESERVED` | no prueba capacidad funcional |
| repositorio standalone | auditoría y consulta remota | `ABSENT` | no existe producto técnico propio |
| repositorio runtime propietario | no confirmado | `NO_CONFIRMADO` | no se asigna por inferencia |
| entrada desde SHELL | AURA usa `href` vacío y estado `soon` | `UNAVAILABLE` | no hay navegación a producto |
| metadata de login | `host: null` y `webAvailable: false` | `UNAVAILABLE` | no existe destino web habilitado |
| AppSwitchers inspeccionados | AURA permanece `soon` con destino vacío | `PLACEHOLDER_ONLY` | no cuentan como producto |
| rutas propias | línea base auditada | `0` | no existe navegación interna AURA confirmada |
| pantallas propias | línea base auditada | `0` | no existe UI propia AURA confirmada |
| navegación registrada propia | línea base auditada | `0` | no existe menú funcional AURA confirmado |
| producto web standalone | no existe cadena repo + navegación + superficie propia | `NOT_IMPLEMENTED` | AURA no está disponible como producto |
| capacidades actuales de website CMS | existen en VISO | `EXTERNAL_TO_AURA` | no se atribuyen a AURA |
| consumidor web público actual | existe en `Vento-Group` | `EXTERNAL_TO_AURA` | no se atribuye a AURA |
| capacidades objetivo del roadmap | documentadas para AURA | `TARGET_ONLY` | no demuestran implementación actual |
| decisión continuidad/reemplazo/retiro | reservada | `PENDING` | pertenece a `AURA-AUD-010` |

La combinación de identidad reservada y referencias visuales no cambia el resultado `NOT_IMPLEMENTED` del producto standalone.

---

#### 6. Evidencia runtime actual

El estado remoto vigente presenta AURA de forma deliberadamente no navegable:

- SHELL declara AURA como identidad canónica reservada, con producto web no disponible, `href` vacío y estado `soon`;
- el login central declara `host: null` y `webAvailable: false` para AURA;
- VISO, NEXO, FOGO, ORIGO y PULSO conservan AURA como entrada `soon` con destino vacío en sus AppSwitchers inspeccionados;
- no existe repositorio standalone AURA confirmado;
- no existe una cadena propia AURA de repositorio, entrada runtime y superficie funcional.

Estas señales son consistentes entre sí: el sistema reconoce la identidad, pero evita presentarla como producto disponible.

---

#### 7. Capacidades relacionadas que no forman un producto AURA

Existen capacidades empresariales y técnicas relacionadas con el dominio objetivo de marketing y contenido, pero su existencia no cambia la clasificación del producto AURA.

| Capacidad relacionada | Propietario observado | Tratamiento en esta tarea |
| --- | --- | --- |
| administración actual de contenido web | VISO | permanece atribuida a VISO |
| publicación y consumo público de contenido | `Vento-Group` | permanece en el consumidor público actual |
| catálogo e identidad `aura` | gobierno transversal de VENTO | reserva canónica, no producto runtime |
| permiso `aura.access` | catálogo de autorización | reserva de acceso, no funcionalidad implementada |
| referencias AURA en SHELL y AppSwitchers | repositorios que presentan el ecosistema | placeholders o metadata de producto diferido |
| capacidades objetivo de marketing | roadmap y contratos AURA | diseño futuro condicionado a decisión |

No se duplica ownership y no se declara que VISO, SHELL o `Vento-Group` sean AURA.

---

#### 8. Estado funcional consolidado

La clasificación vigente queda:

```text
PRODUCTO_AURA_STANDALONE = NO_IMPLEMENTADO
DISPONIBILIDAD_WEB_AURA = NO
NAVEGACION_AURA = NO_DISPONIBLE
CAPACIDADES_AURA_PROPIAS_CONFIRMADAS = 0
CAPACIDADES_RELACIONADAS_EN_OTROS_PRODUCTOS = EXISTEN
ROADMAP_AURA = DIFERIDO
IMPLEMENTACION_AURA = NO_AUTORIZADA
```

`CAPACIDADES_AURA_PROPIAS_CONFIRMADAS = 0` significa que no se ha confirmado una capacidad funcional ejecutada por un producto AURA propio. No significa que el ecosistema carezca de capacidades de marketing, contenido o publicación.

---

#### 9. Diferencia entre producto inexistente y producto retirado

El estado `NOT_IMPLEMENTED` no equivale a producto retirado.

AURA conserva:

- código canónico estable;
- clasificación funcional;
- permiso reservado;
- roadmap condicionado;
- contratos objetivo;
- cobertura de prueba vigente;
- una puerta formal para decidir continuidad, reemplazo o retiro.

Por tanto, esta tarea no cambia AURA a `RETIRED`, no libera su código y no autoriza reutilizar su identidad.

---

#### 10. Estado del bloqueo

Permanece vigente:

```text
AURA_PRODUCT_RUNTIME = BLOCKED
AURA_DOM = BLOCKED
AURA_AUTH = BLOCKED
AURA_UX = BLOCKED
AURA_INT = BLOCKED
```

El motivo no es únicamente la ausencia de repositorio. La puerta completa exige auditar producto, usuarios, superficies, procesos, datos, relaciones con otras aplicaciones y decidir formalmente continuidad.

El estado real confirmado por esta tarea permite seguir auditando; no permite implementar.

---

#### 11. Handoff hacia AURA-AUD-003

`AURA-AUD-003 — Confirmar usuarios actuales` recibe como entrada:

1. AURA existe como identidad canónica diferida;
2. no existe producto standalone funcional disponible;
3. no existe entrada web habilitada;
4. `aura.access` existe como reserva y no demuestra uso efectivo;
5. referencias `soon` y metadata de login no constituyen uso de producto;
6. capacidades relacionadas permanecen en otros productos;
7. no se ha determinado todavía quiénes son usuarios actuales, potenciales, asignados o efectivos de AURA.

`AURA-AUD-003` deberá resolver esa última dimensión sin reinterpretar una asignación de permiso como evidencia automática de uso real del producto.

---

#### 12. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el deber de distinguir referencias reservadas de producto implementado, detectar cero repositorios, rutas y pantallas propias, mantener AURA no disponible y conservar ownership de las capacidades actuales ya está protegido por la cobertura AURA vigente. Esta tarea fija el estado actual de producto contra esas reglas sin introducir una obligación verificable nueva.

---

#### 13. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-AURA-004`, que exige separar cero repositorios, rutas y pantallas propias de AURA de las referencias reservadas y prohíbe contar placeholders como producto implementado;
- `TREQ-AURA-005`, que exige detectar cualquier delta futuro sobre repositorio, dominio, rutas, pantallas, launchers o navegación;
- `TREQ-AURA-006`, que exige presentar AURA como no disponible mientras no exista repositorio, despliegue, rutas certificadas, autorización y decisión formal;
- `TREQ-AURA-007`, que conserva las capacidades actuales de contenido web atribuidas a sus propietarios observados hasta una transferencia aprobada.

Esta sección registra trazabilidad existente y no actualiza el Registro 04A.

---

#### 14. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `AURA-AUD-002` en su rama propia mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto aún no ha sido incorporado al checkout del usuario ni sometido allí al formateador, quality, delivery check y batería documental. |
| REMOTA | `PASS` | En el remoto vigente se confirmó ausencia de repositorio standalone AURA; SHELL declara AURA con `href` vacío y `status: soon`; el login central usa `host: null` y `webAvailable: false`; y los AppSwitchers inspeccionados de VISO, NEXO, FOGO, ORIGO y PULSO mantienen AURA como identidad diferida sin destino navegable. |
| OPERATIVA | `NOT_APPLICABLE` | La tarea determina estado de producto; no requiere campañas, publicaciones, interacción con clientes ni ejecución de procesos de marketing. |
| FÍSICA | `NOT_APPLICABLE` | `AURA-AUD-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea ni modifica producto, infraestructura o datos. |

---

#### 15. Criterios de aceptación

- [x] Se distingue identidad canónica de producto funcional.
- [x] Se conserva la salida aprobada de `AURA-AUD-001` sobre ausencia de repositorio standalone.
- [x] Se confirma que el producto web AURA no está implementado ni disponible.
- [x] Se confirma que SHELL no ofrece un destino web AURA.
- [x] Se confirma que el login central mantiene AURA sin host y sin disponibilidad web.
- [x] Se confirma que las referencias `soon` de las aplicaciones inspeccionadas no constituyen producto.
- [x] Se conservan cero rutas y pantallas propias según la línea base aprobada.
- [x] Se evita atribuir a AURA las capacidades actuales de VISO.
- [x] Se evita atribuir a AURA el consumidor público `Vento-Group`.
- [x] Se distingue capacidad objetivo documentada de capacidad implementada.
- [x] Se mantiene AURA como aplicación diferida, no como aplicación retirada.
- [x] Se mantiene bloqueada toda implementación AURA.
- [x] Se reserva el inventario de usuarios a `AURA-AUD-003`.
- [x] Se reserva el inventario exhaustivo de rutas y pantallas a `AURA-AUD-004`.
- [x] Se reserva el inventario de procesos de marketing a `AURA-AUD-005`.
- [x] Se reserva continuidad, reemplazo o retiro a `AURA-AUD-010`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecuta materialización física.

---

#### 16. Límites

Esta tarea no:

- crea o propone un repositorio AURA;
- implementa una aplicación AURA;
- crea rutas, pantallas, navegación o destinos web;
- habilita `aura.access` como capacidad funcional;
- determina usuarios actuales o futuros;
- inventaría exhaustivamente rutas y pantallas;
- inventaría procesos de marketing;
- inventaría datos o permisos;
- transfiere capacidades desde VISO;
- transfiere consumidores desde `Vento-Group`;
- conecta canales externos;
- habilita IA;
- modifica Supabase;
- modifica DNS;
- despliega infraestructura;
- decide continuidad, reemplazo o retiro;
- registra un ADR;
- desbloquea tareas de dominio, autorización, UX o integración;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 17. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-001 — Confirmar repositorio propietario`

**TAREA ACTUAL APROBADA**
`AURA-AUD-002 — Confirmar estado real del producto`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-003 — Confirmar usuarios actuales`
### ✅ AURA-AUD-003 — Confirmar usuarios actuales

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-002 — Confirmar estado real del producto
**Tarea siguiente:** AURA-AUD-004 — Inventariar rutas y pantallas
**Tipo de tarea:** auditoría técnico-documental de usuarios actuales; distingue usuarios efectivos de AURA, titulares potenciales de acceso dormido, población laboral vigente y roles sin asignación, sin crear permisos, usuarios, sesiones ni superficies
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; se confirma que el producto AURA tiene cero usuarios efectivos observados en el estado vigente y que las elegibilidades documentales futuras permanecen dormidas
**Cambios físicos autorizados:** ninguno; esta tarea no crea ni modifica usuarios, roles, permisos, grants, overrides, sesiones, navegación, repositorios, datos, Supabase, DNS, despliegues ni configuración runtime
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Confirmar quién usa actualmente AURA y evitar cuatro equivalencias incorrectas:

```text
EMPLEADO ACTIVO
!= USUARIO DE AURA

ROL CANONICAMENTE ELEGIBLE
!= GRANT RUNTIME EFECTIVO

PERMISO DOCUMENTADO COMO DORMIDO
!= ACCESO PRODUCTIVO

CAPACIDAD DE MARKETING EN OTRO PRODUCTO
!= USO DE AURA
```

La conclusión vigente de esta tarea es:

```text
EMPLEADOS_REGISTRADOS = 63
EMPLEADOS_ACTIVOS = 39
USUARIOS_EFECTIVOS_AURA = 0
GRANTS_RUNTIME_AURA_POR_ROL = 0
OVERRIDES_RUNTIME_AURA_POR_EMPLEADO = 0
REFERENCIAS_LEGACY_AURA_EN_EMPLOYEES = 0
CANDIDATOS_ACTIVOS_EN_ROLES_CON_ACCESO_DORMIDO = 8
USUARIOS_PRODUCTIVOS_AURA = 0
```

Los ocho candidatos activos corresponden únicamente a personas cuyo rol actual pertenece a una clase que la matriz canónica prevé para un futuro `aura.access` dormido. No son usuarios actuales de AURA.

---

#### 2. Reconciliación topológica

El mini-bloque `AURA-AUD-001..012` conserva:

```text
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
```

`AURA-AUD-003` produce una única determinación documental sobre la población actual relacionada con AURA.

No crea una instancia física, no materializa permisos, no modifica usuarios y no habilita el producto.

La ausencia de usuarios efectivos es coherente con `AURA-AUD-001` y `AURA-AUD-002`: no existe repositorio standalone propietario confirmado ni producto AURA funcional y navegable.

---

#### 3. Entradas aprobadas

La auditoría consume:

- `AURA-AUD-001`, que confirma ausencia de repositorio standalone AURA;
- `AURA-AUD-002`, que confirma `AURA_WEB_PRODUCT = NOT_IMPLEMENTED`, `AURA_WEB_AVAILABILITY = FALSE` y `AURA_RUNTIME_ENTRY = UNAVAILABLE`;
- el catálogo canónico, donde `aura` conserva identidad administrativa diferida;
- las matrices canónicas de roles, que tratan `aura.access` como capacidad `BASE_ONLY` y dormida;
- el Registro 04A vigente de AURA;
- el proyecto remoto `vento-os-dev`, consultado únicamente mediante agregados sin exponer datos personales;
- las tablas de autorización y personal necesarias para distinguir población, elegibilidad documental y grant materializado.

La tarea no usa nombres, documentos, correos, identificadores personales ni secretos para resolver la clasificación.

---

#### 4. Definición de usuario actual de AURA

Para esta auditoría, una persona solo cuenta como `USUARIO_EFECTIVO_AURA` cuando existe evidencia simultánea de:

1. una persona laboral activa;
2. una autorización efectiva atribuible a AURA;
3. una superficie o entrada de producto AURA disponible para usar esa autorización.

En el estado vigente no se cumplen las condiciones 2 y 3.

Por tanto:

```text
USUARIO_EFECTIVO_AURA = 0
```

No se cuentan como usuarios actuales:

- personas cuyo rol podría recibir acceso en una materialización futura;
- personas que usan VISO para administrar contenido web;
- personas que participan en marketing fuera de AURA;
- referencias de AURA en launchers;
- miembros de un rol con asignación canónica dormida;
- trabajadores inactivos;
- una aplicación registrada sin superficie funcional.

---

#### 5. Universo laboral remoto observado

El catálogo remoto de roles contiene 15 códigos activos y la población laboral observada contiene 63 filas, de las cuales 39 están activas.

| Rol | Total observado | Activos | Inactivos | Decisión canónica para `aura.access` |
| --- | ---: | ---: | ---: | --- |
| `auxiliar_administrativa` | 2 | 2 | 0 | `NO ASIGNAR` |
| `barista` | 5 | 4 | 1 | `NO ASIGNAR` |
| `bodeguero` | 7 | 2 | 5 | `NO ASIGNAR` |
| `cajero` | 3 | 1 | 2 | `NO ASIGNAR` |
| `cocinero` | 13 | 9 | 4 | `NO ASIGNAR` |
| `conductor` | 1 | 1 | 0 | `NO ASIGNAR` |
| `contador` | 2 | 2 | 0 | `NO ASIGNAR` |
| `gerente` | 0 | 0 | 0 | `NO ASIGNAR` |
| `gerente_general` | 4 | 4 | 0 | `ASIGNAR`, dormido mientras AURA siga diferida |
| `marketing` | 1 | 0 | 1 | `ASIGNAR`, dormido mientras AURA siga diferida |
| `mesero` | 9 | 4 | 5 | `NO ASIGNAR` |
| `panadero` | 5 | 2 | 3 | `NO ASIGNAR` |
| `pastelero` | 1 | 1 | 0 | `NO ASIGNAR` |
| `propietario` | 4 | 4 | 0 | `ASIGNAR`, dormido mientras AURA siga diferida |
| `repostero` | 6 | 3 | 3 | `NO ASIGNAR` |
| **TOTAL** | **63** | **39** | **24** | — |

La matriz presenta el universo de roles observado; no convierte la asignación canónica futura en un grant actual.

---

#### 6. Titulares potenciales de acceso dormido

Las matrices canónicas vigentes reservan `aura.access` para tres roles base:

| Rol | Activos observados | Estado documental | Clasificación en esta auditoría |
| --- | ---: | --- | --- |
| `propietario` | 4 | `ASIGNAR` con acceso dormido | candidato futuro; no usuario actual |
| `gerente_general` | 4 | `ASIGNAR` con acceso dormido | candidato futuro; no usuario actual |
| `marketing` | 0 | `ASIGNAR` con acceso dormido | sin titular activo actual |
| **TOTAL ACTIVO** | **8** | — | **0 usuarios efectivos** |

Existe además una fila laboral inactiva con rol `marketing`; por definición no forma parte de la población actual activa ni de los ocho candidatos activos.

La expresión `acceso dormido` significa que la matriz documental reconoce correspondencia funcional futura, pero la concesión no puede utilizarse productivamente mientras AURA permanezca diferida y no disponible.

---

#### 7. Estado runtime de autorización observado

La consulta remota de `vento-os-dev` arroja:

```text
public.apps(code = aura) = 1
public.app_permissions(code = aura.access) = 0
role_permissions para aura.access = 0
employee_permissions para aura.access = 0
employees.permissions con referencia legacy a aura = 0
```

El catálogo runtime conserva la aplicación `aura`, pero el permiso `aura.access` no está materializado actualmente en `public.app_permissions`.

Como consecuencia observable:

- no existe un grant materializado por rol para AURA;
- no existe un override individual materializado para AURA;
- no existe una referencia legacy AURA en el campo de permisos de empleados;
- no puede derivarse ningún usuario efectivo de AURA desde la autorización runtime actual.

Esta ausencia runtime no elimina la definición canónica futura de `aura.access`; registra una diferencia entre modelo documental y materialización física actual.

---

#### 8. Tratamiento de la divergencia documental-runtime

La matriz canónica define `aura.access` como permiso de entrada `BASE_ONLY` y lo reserva de forma dormida para `propietario`, `gerente_general` y `marketing`.

El remoto actual no contiene la fila `aura.access` en `public.app_permissions`.

La interpretación aprobada es:

```text
MODELO_CANONICO_DE_ACCESO = DEFINIDO_Y_DORMIDO
MATERIALIZACION_RUNTIME_DEL_PERMISO = AUSENTE
USO_EFECTIVO = 0
```

No se corrige esta diferencia desde `AURA-AUD-003`.

El inventario y reconciliación detallada de datos y permisos pertenece a `AURA-AUD-006 — Identificar datos y permisos utilizados`.

Condición de salida para ese hallazgo: `AURA-AUD-006` deberá declarar si la ausencia runtime de `aura.access` se conserva mientras AURA esté diferida o si una decisión posterior exige materializarlo, sin activar acceso productivo por inferencia.

---

#### 9. Usuarios de capacidades relacionadas

Esta tarea no redefine como usuarios AURA a las personas que hoy puedan trabajar con capacidades relacionadas alojadas en otros productos.

En particular:

- administrar contenido web en VISO no convierte al actor en usuario AURA;
- consumir contenido público en `Vento-Group` no convierte al actor en usuario AURA;
- participar en campañas, marca o contenido mediante procesos manuales no demuestra uso de AURA;
- poseer un rol `propietario`, `gerente_general` o `marketing` no demuestra acceso efectivo al producto;
- una referencia `soon` no constituye una sesión o uso.

El inventario de procesos reales de marketing pertenece a `AURA-AUD-005` y la relación funcional con VISO pertenece a `AURA-AUD-007`.

---

#### 10. Clasificación consolidada de población

| Clase | Cantidad vigente | Tratamiento |
| --- | ---: | --- |
| empleados registrados | 63 | universo laboral observado |
| empleados activos | 39 | población laboral actual |
| empleados activos en roles con acceso canónico dormido | 8 | candidatos futuros, no usuarios AURA |
| empleados activos con rol `marketing` | 0 | sin usuario activo de marketing por rol |
| grants runtime AURA por rol | 0 | no materializados |
| overrides runtime AURA por empleado | 0 | no materializados |
| referencias legacy AURA en permisos de empleados | 0 | no observadas |
| usuarios efectivos AURA | 0 | conclusión de la tarea |
| usuarios productivos AURA | 0 | producto no disponible |

Ninguna de estas cantidades autoriza crear permisos ni activar AURA.

---

#### 11. Handoff hacia AURA-AUD-004

`AURA-AUD-004 — Inventariar rutas y pantallas` recibe como entradas:

1. el producto standalone AURA no está implementado;
2. la entrada runtime AURA no está disponible;
3. existen cero usuarios efectivos observados;
4. existen cero grants runtime AURA materializados;
5. ocho empleados activos pertenecen a roles con elegibilidad canónica dormida, pero no son usuarios actuales;
6. la ausencia runtime de `aura.access` queda registrada para reconciliación posterior en `AURA-AUD-006`;
7. ninguna superficie de VISO, SHELL o `Vento-Group` debe atribuirse a AURA por inferencia.

`AURA-AUD-004` deberá inventariar las superficies reales sin fabricar rutas AURA para justificar el catálogo o la población potencial.

---

#### 12. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la obligación de no tratar referencias reservadas como producto implementado, mantener AURA no disponible, detectar cambios de repositorio, rutas, launchers, navegación o permisos y conservar ownership vigente ya está cubierta por requisitos AURA existentes. Esta tarea agrega evidencia de población y autorización actual sin introducir una obligación verificable nueva.

---

#### 13. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-AURA-004`, que impide contabilizar referencias o placeholders como producto AURA implementado;
- `TREQ-AURA-005`, que exige detectar deltas sobre repositorio, rutas, pantallas, launchers, navegación y permiso reservado;
- `TREQ-AURA-006`, que exige mantener AURA no disponible mientras falten repositorio, despliegue, rutas certificadas, autorización y decisión formal;
- `TREQ-AURA-007`, que evita transferir silenciosamente a AURA capacidades actuales de otros propietarios.

Esta trazabilidad no modifica el Registro 04A.

---

#### 14. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `AURA-AUD-003` en su rama propia mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido incorporado al checkout del usuario ni sometido allí a formateo, quality, delivery check y batería documental. |
| REMOTA | `PASS` | En `vento-os-dev` se observaron 63 empleados, 39 activos, 15 roles activos, una fila de aplicación `aura`, cero filas `aura.access` en `app_permissions`, cero grants de rol, cero overrides individuales y cero referencias legacy AURA en permisos de empleados; la consulta se realizó mediante agregados sin exponer datos personales. |
| OPERATIVA | `NOT_APPLICABLE` | La tarea clasifica usuarios y elegibilidad documental; no requiere operar campañas, contenido, clientes ni una superficie AURA inexistente. |
| FÍSICA | `NOT_APPLICABLE` | `AURA-AUD-003` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea usuarios, permisos, sesiones ni infraestructura. |

---

#### 15. Criterios de aceptación

- [x] Se define qué significa usuario efectivo de AURA.
- [x] Se conserva la conclusión de `AURA-AUD-002` sobre producto no implementado y no disponible.
- [x] Se inventaría el universo remoto por rol sin exponer datos personales.
- [x] Se registran 63 empleados totales y 39 activos.
- [x] Se materializan las 15 identidades de rol observadas sin faltantes ni duplicados en la matriz de esta tarea.
- [x] Se separan roles con acceso canónico dormido de usuarios efectivos.
- [x] Se identifican 8 empleados activos en roles con elegibilidad canónica dormida.
- [x] Se confirma que el rol `marketing` no tiene empleados activos observados.
- [x] Se confirma que `aura.access` no está materializado en `app_permissions` del remoto observado.
- [x] Se confirman cero grants por rol y cero overrides individuales AURA.
- [x] Se confirman cero referencias legacy AURA en permisos de empleados.
- [x] Se concluyen cero usuarios efectivos y cero usuarios productivos AURA.
- [x] Se documenta la divergencia entre modelo canónico dormido y runtime sin corregirla desde esta tarea.
- [x] Se asigna la reconciliación de permisos a `AURA-AUD-006`.
- [x] Se reserva el inventario de rutas y pantallas a `AURA-AUD-004`.
- [x] Se reserva el inventario de procesos de marketing a `AURA-AUD-005`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecutan cambios físicos.

---

#### 16. Límites

Esta tarea no:

- identifica personas por nombre, correo, documento o UUID;
- crea o desactiva trabajadores;
- modifica roles;
- materializa `aura.access`;
- crea grants o overrides;
- migra la matriz canónica a Supabase;
- decide quién deberá usar AURA en el futuro fuera de las elegibilidades ya aprobadas;
- interpreta a usuarios de VISO como usuarios AURA;
- inventaría exhaustivamente rutas y pantallas;
- inventaría procesos de marketing;
- inventaría datos o permisos más allá del snapshot necesario para esta clasificación;
- modifica Supabase;
- crea repositorios o infraestructura;
- habilita navegación;
- decide continuidad, reemplazo o retiro;
- desbloquea `AURA-DOM`, `AURA-AUTH`, `AURA-UX` o `AURA-INT`;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 17. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-002 — Confirmar estado real del producto`

**TAREA ACTUAL APROBADA**
`AURA-AUD-003 — Confirmar usuarios actuales`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-004 — Inventariar rutas y pantallas`
### [ ] AURA-AUD-004 — Inventariar rutas y pantallas
### [ ] AURA-AUD-005 — Inventariar procesos de marketing
### [ ] AURA-AUD-006 — Identificar datos y permisos utilizados
### [ ] AURA-AUD-007 — Definir relación con VISO
### [ ] AURA-AUD-008 — Definir relación con PASS
### [ ] AURA-AUD-009 — Definir relación con PULSO
### [ ] AURA-AUD-010 — Decidir continuidad, reemplazo o retiro
### [ ] AURA-AUD-011 — Documentar decisión mediante ADR si corresponde
### [ ] AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión

---

## ROADMAP OBJETIVO DE AURA

> Todas las tareas `AURA-DOM`, `AURA-AUTH`, `AURA-UX` y `AURA-INT`
> permanecen **BLOQUEADAS** hasta que:
>
> 1. `AURA-AUD-010` apruebe formalmente la continuidad o el reemplazo de AURA; y
> 2. `AURA-AUD-011` registre la decisión mediante ADR cuando corresponda.
>
> La existencia de estas tareas no autoriza implementación, conexión de canales,
> uso de datos reales, publicación, contacto con clientes ni contratación de
> proveedores de inteligencia artificial.
