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
**Tipo de tarea:** auditoría técnico-documental de usuarios actuales; distingue usuario efectivo, elegibilidad canónica, materialización runtime de `aura.access` y drift de grants sin modificar autorización ni producto
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; se mantienen cero usuarios efectivos AURA y se corrige el snapshot de autorización runtime
**Cambios físicos autorizados:** ninguno; no modifica usuarios, roles, permisos, grants, overrides, sesiones, Supabase, navegación ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Confirmar quién usa actualmente AURA separando:

```text
EMPLEADO ACTIVO
!= USUARIO AURA

GRANT RUNTIME
!= PRODUCTO AURA DISPONIBLE

ROL CANÓNICAMENTE ELEGIBLE
!= GRANT CANÓNICAMENTE CORRECTO

PERMISO MATERIALIZADO
!= CAPACIDAD PRODUCTIVA HABILITADA
```

Resultado corregido:

```text
EMPLEADOS_REGISTRADOS = 63
EMPLEADOS_ACTIVOS = 39
USUARIOS_EFECTIVOS_AURA = 0
USUARIOS_PRODUCTIVOS_AURA = 0
AURA_ACCESS_RUNTIME = PRESENTE
GRANTS_RUNTIME_AURA_POR_ROL = 5
GRANTS_CON_ROL_CANÓNICO_CORRECTO = 3
GRANTS_CON_ROL_CANÓNICO_INCORRECTO = 2
GRANTS_CON_ALCANCE_RUNTIME_CANÓNICO = 0
OVERRIDES_RUNTIME_AURA_POR_EMPLEADO = 0
REFERENCIAS_LEGACY_AURA_EN_EMPLOYEES = 0
```

---

#### 2. Reconciliación topológica

```text
TASK = AURA-AUD-003
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
```

La tarea corrige evidencia documental. No crea ni retira grants y no habilita AURA.

---

#### 3. Modelo físico correcto de `aura.access`

El permiso canónico `aura.access` se representa físicamente mediante:

```text
public.apps.code = aura
+
public.app_permissions.code = access
```

Por tanto, consultar literalmente:

```text
public.app_permissions.code = aura.access
```

es incorrecto para el esquema físico vigente.

El snapshot remoto correcto demuestra:

```text
public.apps(code = aura) = 1
public.app_permissions(app = aura, code = access) = 1
permiso activo = SI
role_permissions = 5
employee_permissions = 0
legacy employee permissions con aura = 0
```

La fila de permiso existe desde `2026-01-18`.

---

#### 4. Definición de usuario efectivo

Una persona cuenta como usuario efectivo de AURA únicamente si coinciden:

1. actor laboral activo;
2. autorización aplicable;
3. producto AURA funcional y disponible.

La condición 3 continúa ausente.

```text
USUARIOS_EFECTIVOS_AURA = 0
```

Un grant runtime por sí solo no constituye uso efectivo.

---

#### 5. Universo laboral observado

El catálogo remoto contiene 15 roles activos. La población laboral contiene 63 filas, de las cuales 39 están activas.

| Rol | Total | Activos | Inactivos | Decisión canónica `aura.access` | Grant runtime |
| --- | ---: | ---: | ---: | --- | --- |
| `auxiliar_administrativa` | 2 | 2 | 0 | `NO ASIGNAR` | no |
| `barista` | 5 | 4 | 1 | `NO ASIGNAR` | no |
| `bodeguero` | 7 | 2 | 5 | `NO ASIGNAR` | no |
| `cajero` | 3 | 1 | 2 | `NO ASIGNAR` | no |
| `cocinero` | 13 | 9 | 4 | `NO ASIGNAR` | no |
| `conductor` | 1 | 1 | 0 | `NO ASIGNAR` | no |
| `contador` | 2 | 2 | 0 | `NO ASIGNAR` | sí |
| `gerente` | 0 | 0 | 0 | `NO ASIGNAR` | sí |
| `gerente_general` | 4 | 4 | 0 | `ASIGNAR` | sí |
| `marketing` | 1 | 0 | 1 | `ASIGNAR`, dormido | sí |
| `mesero` | 9 | 4 | 5 | `NO ASIGNAR` | no |
| `panadero` | 5 | 2 | 3 | `NO ASIGNAR` | no |
| `pastelero` | 1 | 1 | 0 | `NO ASIGNAR` | no |
| `propietario` | 4 | 4 | 0 | `ASIGNAR` | sí |
| `repostero` | 6 | 3 | 3 | `NO ASIGNAR` | no |
| **TOTAL** | **63** | **39** | **24** | — | **5 roles** |

---

#### 6. Reconciliación de grants

Grants runtime observados:

| Rol | Runtime | Alcance runtime | Decisión canónica | Resultado |
| --- | --- | --- | --- | --- |
| `propietario` | `ALLOW` | `global` | `ASIGNAR`, `NT-APP` | rol correcto; alcance en drift |
| `gerente_general` | `ALLOW` | `global` | `ASIGNAR`, `NT-APP` | rol correcto; alcance en drift |
| `marketing` | `ALLOW` | `site_type=admin` | `ASIGNAR`, `NT-APP-DORMANT` | rol correcto; alcance en drift |
| `contador` | `ALLOW` | `global` | `NO ASIGNAR` | drift de rol y alcance |
| `gerente` | `ALLOW` | `global` | `NO ASIGNAR` | drift de rol y alcance |

El catálogo de alcance de `aura.access` admite únicamente `NT-APP`; los alcances territoriales no aplican.

Por tanto:

```text
GRANTS_RUNTIME = 5
ROL_CANÓNICO_CORRECTO = 3
ROL_CANÓNICO_INCORRECTO = 2
ALCANCE_RUNTIME_CANÓNICO = 0
```

Esta tarea registra el drift y no lo corrige físicamente.

---

#### 7. Población relacionada

Roles canónicamente elegibles:

```text
propietario activos = 4
gerente_general activos = 4
marketing activos = 0
TOTAL ACTIVOS ELEGIBLES = 8
```

Roles con grant runtime:

```text
propietario activos = 4
gerente_general activos = 4
marketing activos = 0
contador activos = 2
gerente activos = 0
TOTAL ACTIVOS EN ROLES CON GRANT = 10
```

Ninguna cifra cambia la conclusión de cero usuarios efectivos.

---

#### 8. Handoff

`AURA-AUD-006` deberá tratar por separado:

```text
PERMISO_CANÓNICO
PERMISO_RUNTIME
GRANT_CANÓNICO
GRANT_RUNTIME
ALCANCE_CANÓNICO
ALCANCE_RUNTIME
USO_EFECTIVO
```

Deberá conservar como hallazgo abierto el drift de `contador`, `gerente` y de los cinco alcances runtime sin modificar Supabase desde el carril documental.

---

#### 9. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** esta corrección sustituye un snapshot runtime incorrecto por evidencia verificable. La detección de drift, indisponibilidad de AURA y protección contra inferencias de producto ya están cubiertas por requisitos AURA vigentes.

---

#### 10. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La corrección todavía debe incorporarse y compilarse en el checkout. |
| LOCAL | `PASS` | Artefacto UTF-8/LF, una sola tarea y cero whitespace final. |
| REMOTA | `PASS` | Supabase confirma 63 empleados, 39 activos, 15 roles de catálogo, un permiso físico `aura/access`, cinco grants de rol, cero overrides y cero referencias legacy. |
| OPERATIVA | `NOT_APPLICABLE` | No existe producto AURA utilizable que requiera prueba humana. |
| FÍSICA | `NOT_APPLICABLE` | No se ejecutan cambios de autorización ni datos. |

---

#### 11. Criterios de aceptación

- [x] Se corrige el modelo físico de `aura.access`.
- [x] Se confirma una fila runtime activa del permiso.
- [x] Se confirman cinco grants de rol.
- [x] Se distinguen tres roles canónicamente asignables y dos grants de rol indebidos.
- [x] Se confirma que los cinco alcances runtime difieren del `NT-APP` canónico.
- [x] Se conservan cero overrides individuales.
- [x] Se conservan cero usuarios efectivos y productivos AURA.
- [x] No se modifica Supabase.
- [x] No se modifica el Registro 04A.
- [x] No se crean requisitos de prueba.

---

#### 12. Límites

Esta tarea no modifica roles, grants, permisos, alcances, usuarios, navegación, Supabase, repositorios ni infraestructura. No activa AURA y no decide continuidad, relación con VISO/PASS/PULSO ni implementación futura.

---

#### 13. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-002 — Confirmar estado real del producto`

**TAREA ACTUAL APROBADA**
`AURA-AUD-003 — Confirmar usuarios actuales`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-004 — Inventariar rutas y pantallas`
### ✅ AURA-AUD-004 — Inventariar rutas y pantallas

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-003 — Confirmar usuarios actuales
**Tarea siguiente:** AURA-AUD-005 — Inventariar procesos de marketing
**Tipo de tarea:** auditoría técnico-documental de rutas, pantallas y superficies relacionadas con AURA; separa superficies propias inexistentes, referencias runtime diferidas y capacidades actuales de contenido alojadas en VISO y consumidas por Vento-Group, sin transferir ownership ni materializar producto
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda fijado el inventario actual de rutas y superficies vinculadas al dominio funcional de AURA sin crear rutas, pantallas, navegación ni aplicación runtime
**Cambios físicos autorizados:** ninguno; esta tarea no crea, mueve, renombra ni elimina rutas, pantallas, componentes, navegación, APIs, repositorios, datos, permisos, DNS, despliegues ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma completa y reproducible las rutas, pantallas y superficies que hoy pueden confundirse con AURA y separar cuatro capas que no son equivalentes:

```text
RUTA PROPIA DE AURA
!= REFERENCIA O PLACEHOLDER DE AURA

SUPERFICIE ADMINISTRATIVA RELACIONADA
!= OWNERSHIP DE AURA

CONSUMIDOR PUBLICO
!= APLICACION ADMINISTRATIVA

REGISTRO DE NAVEGACION
!= EXISTENCIA FISICA DE TODAS LAS RUTAS
```

La conclusión vigente es:

```text
REPOSITORIOS_STANDALONE_AURA = 0
RUTAS_PROPIAS_AURA = 0
PANTALLAS_PROPIAS_AURA = 0
NAVEGACION_RUNTIME_AURA = 0
PANTALLAS_REGISTRADAS_RUNTIME_AURA = 0

REFERENCIAS_RUNTIME_AURA = 7
REFERENCIAS_TEMPLATE_NO_RUNTIME = 1

RUTAS_ADMINISTRATIVAS_RELACIONADAS_EN_VISO = 7
SUPERFICIES_INTERACTIVAS_SUBORDINADAS_EN_VISO = 9
ROUTE_HANDLERS_RELACIONADOS_EN_VISO = 1

RUTAS_PUBLICAS_CONSUMIDORAS_EN_VENTO_GROUP = 7
RUTAS_PUBLICAS_QUE_RENDERIZAN_CONTENIDO = 6
RUTAS_PUBLICAS_DE_REDIRECCION = 1
```

Este inventario no transfiere propiedad y no convierte ninguna superficie existente en AURA.

---

#### 2. Reconciliación topológica

El mini-bloque `AURA-AUD-001..012` conserva:

```text
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
```

`AURA-AUD-004` produce un snapshot documental único del estado observado.

No crea instancia física, no modifica código, no materializa navegación y no habilita el roadmap de AURA.

La decisión sobre relación funcional y ownership con VISO permanece reservada a `AURA-AUD-007`; continuidad, reemplazo o retiro permanece reservada a `AURA-AUD-010`.

---

#### 3. Fuentes consumidas

La auditoría consume:

1. `AURA-AUD-001`, que confirmó ausencia de repositorio standalone AURA;
2. `AURA-AUD-002`, que confirmó ausencia de producto AURA funcional;
3. `AURA-AUD-003`, que confirmó cero usuarios efectivos de AURA;
4. `AUTH-UI-010`, que materializó `AURA-CURRENT-EXISTENCE-REGISTER-001` y los inventarios actuales de superficies;
5. el Registro 04A de AURA, especialmente la cobertura vigente del inventario y ownership de superficies;
6. los repositorios runtime actuales de VISO, NEXO, FOGO, ORIGO, PULSO y SHELL;
7. el repositorio público `Vento-Group`;
8. el estado remoto de `apps`, `app_navigation_items` y `app_screen_registry`.

---

#### 4. Contrato de inventario

Se fija:

```text
AURA_ROUTE_SURFACE_INVENTORY_CONTRACT = AURA-CURRENT-ROUTE-SURFACE-INVENTORY-001
```

Toda identidad inventariada conserva:

- ID estable;
- propietario actual;
- patrón de ruta cuando aplica;
- tipo estático, dinámico, redirección, componente o referencia;
- archivo fuente;
- estado observado;
- relación con AURA;
- frontera de ownership.

Una ruta o pantalla solo se clasifica como propia de AURA cuando exista evidencia runtime de ownership AURA. Relación funcional, branding, URL reservada o intención futura no bastan.

---

#### 5. Estado propio de AURA

`AURA-CURRENT-EXISTENCE-REGISTER-001` queda ratificado:

| Elemento | Resultado actual | Interpretación |
| --- | ---: | --- |
| repositorio standalone AURA | 0 | no existe aplicación propietaria independiente |
| rutas propias AURA | 0 | no existe App Router o equivalente AURA observado |
| pantallas propias AURA | 0 | no existe superficie runtime propia |
| filas `app_navigation_items` con `app_code = aura` | 0 | no existe navegación runtime AURA |
| filas activas de navegación AURA | 0 | no existe menú habilitado |
| filas `app_screen_registry` con `app_code = aura` | 0 | no existe pantalla registrada |
| pantallas disponibles registradas AURA | 0 | no existe superficie habilitada |
| fila `apps` con `code = aura` | 1 | existe identidad de aplicación, no producto funcional |

La fila del catálogo `apps` no contradice la ausencia de rutas y pantallas: representa identidad canónica, no materialización.

---

#### 6. Referencias runtime y template de AURA

Las referencias visibles se mantienen separadas de una implementación real:

| ID | Repositorio | Archivo fuente | Representación | Estado |
| --- | --- | --- | --- | --- |
| `AURA-PLACEHOLDER-001` | `vento-nexo` | `src/components/vento/standard/vento-shell.tsx` | AppSwitcher tile | `soon` |
| `AURA-PLACEHOLDER-002` | `vento-fogo` | `src/components/vento/standard/vento-shell.tsx` | AppSwitcher tile | `soon` |
| `AURA-PLACEHOLDER-003` | `vento-origo` | `src/components/vento/standard/vento-shell.tsx` | AppSwitcher tile | `soon` |
| `AURA-PLACEHOLDER-004` | `vento-pulso` | `src/components/vento/standard/vento-shell.tsx` | AppSwitcher tile | `soon` |
| `AURA-PLACEHOLDER-005` | `vento-viso` | `src/components/vento/standard/vento-shell.tsx` | AppSwitcher tile | `soon` |
| `AURA-PLACEHOLDER-006` | `vento-shell` | `src/app/login/page.tsx` | metadata de login AURA con host no disponible | referencia activa |
| `AURA-PLACEHOLDER-007` | `vento-shell` | `src/app/login/page.tsx` | chip visible AURA en aplicaciones conectadas | referencia activa |
| `AURA-TEMPLATE-001` | `vento-shell` | `templates/app-shell-standard/src/components/vento/standard/app-switcher.tsx` | entrada reutilizable de template | `soon`, no runtime |

Las siete referencias runtime y la referencia de template no se contabilizan como rutas o pantallas propias.

---

#### 7. Rutas administrativas relacionadas en VISO

Se ratifica `AURA-CURRENT-ADMIN-ROUTE-INVENTORY-001`:

| ID | Patrón | Tipo | Archivo fuente | Superficie | Owner actual |
| --- | --- | --- | --- | --- | --- |
| `AURA-CURRENT-ADMIN-ROUTE-001` | `/website-cms` | `STATIC` | `src/app/website-cms/page.tsx` | panel CMS, filtros, tarjetas y bloques | VISO |
| `AURA-CURRENT-ADMIN-ROUTE-002` | `/website-cms/venues` | `STATIC` | `src/app/website-cms/venues/page.tsx` | restaurantes, completitud e importación desde PASS | VISO |
| `AURA-CURRENT-ADMIN-ROUTE-003` | `/website-cms/items/new` | `STATIC` | `src/app/website-cms/items/new/page.tsx` | alta de restaurante, empleo, servicio, evento o app | VISO |
| `AURA-CURRENT-ADMIN-ROUTE-004` | `/website-cms/blocks/new` | `STATIC` | `src/app/website-cms/blocks/new/page.tsx` | alta de bloque editorial | VISO |
| `AURA-CURRENT-ADMIN-ROUTE-005` | `/website-cms/items/[id]` | `DYNAMIC` | `src/app/website-cms/items/[id]/page.tsx` | edición y eliminación de tarjeta | VISO |
| `AURA-CURRENT-ADMIN-ROUTE-006` | `/website-cms/blocks/[id]` | `DYNAMIC` | `src/app/website-cms/blocks/[id]/page.tsx` | edición de bloque editorial | VISO |
| `AURA-CURRENT-ADMIN-ROUTE-007` | `/website-cms/venues/[slug]` | `DYNAMIC` | `src/app/website-cms/venues/[slug]/page.tsx` | editor y previsualización de restaurante | VISO |

Distribución:

```text
TOTAL = 7
STATIC = 4
DYNAMIC = 3
OWNER = VISO
```

Ninguna se renombra ni se contabiliza como ruta AURA.

---

#### 8. Superficies interactivas subordinadas en VISO

Se ratifica `AURA-CURRENT-INTERNAL-SURFACE-INVENTORY-001`:

| ID | Tipo | Archivo fuente | Comportamiento |
| --- | --- | --- | --- |
| `AURA-CURRENT-SURFACE-001` | `DASHBOARD` | `src/app/website-cms/page.tsx` | panel, filtros, accesos rápidos y listados |
| `AURA-CURRENT-SURFACE-002` | `CREATE_FORM` | `src/app/website-cms/items/new/page.tsx` | creación de tarjetas de contenido |
| `AURA-CURRENT-SURFACE-003` | `EDIT_FORM` | `src/app/website-cms/items/[id]/page.tsx` | edición, completitud y publicación de tarjetas |
| `AURA-CURRENT-SURFACE-004` | `DELETE_CONTROL` | `src/app/website-cms/items/[id]/page.tsx` | eliminación física de tarjeta |
| `AURA-CURRENT-SURFACE-005` | `CREATE_FORM` | `src/app/website-cms/blocks/new/page.tsx` | creación de bloque editorial |
| `AURA-CURRENT-SURFACE-006` | `EDIT_FORM` | `src/app/website-cms/blocks/[id]/page.tsx` | edición y publicación de bloque |
| `AURA-CURRENT-SURFACE-007` | `IMPORT_AND_LIST` | `src/app/website-cms/venues/page.tsx` | importación y listado de restaurantes |
| `AURA-CURRENT-SURFACE-008` | `DETAIL_EDITOR_PREVIEW` | `src/app/website-cms/venues/[slug]/page.tsx` | tarjeta, hero, galería y vista pública |
| `AURA-CURRENT-SURFACE-009` | `MEDIA_UPLOAD` | `src/components/viso/website-media-upload-field.tsx` | carga de imagen o video y captura de URL pública |

Estas nueve unidades interactivas están contenidas dentro de las siete rutas administrativas y no incrementan el conteo de páginas.

---

#### 9. Frontera API relacionada

La superficie de carga de media consume una frontera no visual:

| ID | Patrón | Método | Archivo fuente | Owner |
| --- | --- | --- | --- | --- |
| `AURA-CURRENT-API-001` | `/api/viso/upload-website-media` | `POST` | `src/app/api/viso/upload-website-media/route.ts` | VISO |

El route handler se registra como dependencia técnica, no como pantalla.

---

#### 10. Rutas públicas consumidoras en Vento-Group

Se ratifica `AURA-CURRENT-PUBLIC-CONSUMER-INVENTORY-001`:

| ID | Patrón | Tipo | Comportamiento | Archivo fuente | Consumo |
| --- | --- | --- | --- | --- | --- |
| `AURA-CURRENT-PUBLIC-001` | `/` | `STATIC` | `RENDER` | `src/app/page.tsx` | home blocks; items restaurant, job, service y app |
| `AURA-CURRENT-PUBLIC-002` | `/restaurantes` | `STATIC` | `RENDER` | `src/app/restaurantes/page.tsx` | restaurant items y bloques de restaurantes |
| `AURA-CURRENT-PUBLIC-003` | `/restaurantes/[slug]` | `DYNAMIC` | `RENDER` | `src/app/restaurantes/[slug]/page.tsx` | restaurant item y detail blocks |
| `AURA-CURRENT-PUBLIC-004` | `/empleos` | `STATIC` | `RENDER` | `src/app/empleos/page.tsx` | job items |
| `AURA-CURRENT-PUBLIC-005` | `/servicios` | `STATIC` | `RENDER` | `src/app/servicios/page.tsx` | service items y bloques de servicios |
| `AURA-CURRENT-PUBLIC-006` | `/ecosistema` | `STATIC` | `RENDER` | `src/app/ecosistema/page.tsx` | app items |
| `AURA-CURRENT-PUBLIC-007` | `/eventos` | `STATIC` | `REDIRECT_TO_/restaurantes` | `src/app/eventos/page.tsx` | no consume eventos |

Distribución:

```text
TOTAL = 7
STATIC = 6
DYNAMIC = 1
RENDER = 6
REDIRECT = 1
OWNER = Vento-Group
```

Estas rutas son consumidoras públicas de contenido; no son pantallas de AURA.

---

#### 11. Navegación registrada y divergencias observadas

El snapshot remoto de navegación confirma:

| Registro | Cantidad | Interpretación |
| --- | ---: | --- |
| navegación AURA | 0 | no existe menú AURA |
| pantallas registradas AURA | 0 | no existe screen registry AURA |
| navegación VISO bajo `/website-cms` | 2 | solo dos accesos están materializados en navegación |
| screen registry VISO bajo `/website-cms` | 0 | la existencia física de las siete rutas no depende del registro de pantallas |

Las dos entradas VISO observadas son:

| Item | Ruta | Permiso registrado | Estado |
| --- | --- | --- | --- |
| `website_cms` | `/website-cms` | `viso.website_cms.read` | activo |
| `website_venues` | `/website-cms/venues` | `viso.access` | activo |

Este snapshot no redefine autorización. La revisión de datos y permisos corresponde a `AURA-AUD-006` y las decisiones de seguridad posteriores.

Se conservan además dos divergencias ya detectadas:

1. `/eventos` existe en el consumidor público pero redirige a `/restaurantes`; la categoría administrativa `event` no tiene superficie pública equivalente.
2. el editor VISO escribe claves `gallery_1..3` con tipo `gallery_media`, mientras el consumidor público de restaurante busca `galeria_` y `galeria_media`.

`AURA-AUD-004` registra estas divergencias como parte del inventario; no las corrige.

---

#### 12. Huella remota reproducible

Snapshot de archivos verificados en `main`:

| Identidad | Repositorio | Archivo | Blob SHA |
| --- | --- | --- | --- |
| `AURA-CURRENT-ADMIN-ROUTE-001` | `vento-group-sas/vento-viso` | `src/app/website-cms/page.tsx` | `f98e79114c59c1640d6f6451415ea12a3fbb36ca` |
| `AURA-CURRENT-ADMIN-ROUTE-002` | `vento-group-sas/vento-viso` | `src/app/website-cms/venues/page.tsx` | `1586e6170fadef42f4d908240e16880ccc0c1058` |
| `AURA-CURRENT-ADMIN-ROUTE-003` | `vento-group-sas/vento-viso` | `src/app/website-cms/items/new/page.tsx` | `8b2c4da4766aa96310ce35ec0d276f44afb8d766` |
| `AURA-CURRENT-ADMIN-ROUTE-004` | `vento-group-sas/vento-viso` | `src/app/website-cms/blocks/new/page.tsx` | `1538090edae4d75f46d1f6dcc40681a45444bad5` |
| `AURA-CURRENT-ADMIN-ROUTE-005` | `vento-group-sas/vento-viso` | `src/app/website-cms/items/[id]/page.tsx` | `34ba7046b6f42f366c3a13c00109d9d552800111` |
| `AURA-CURRENT-ADMIN-ROUTE-006` | `vento-group-sas/vento-viso` | `src/app/website-cms/blocks/[id]/page.tsx` | `c415fc1723d4fb84da0f9939ea59c847fac307b7` |
| `AURA-CURRENT-ADMIN-ROUTE-007` | `vento-group-sas/vento-viso` | `src/app/website-cms/venues/[slug]/page.tsx` | `707762d4cbf0e5beb2c66624de0563822e290176` |
| `AURA-CURRENT-SURFACE-009` | `vento-group-sas/vento-viso` | `src/components/viso/website-media-upload-field.tsx` | `778ba094e474c5427319f4c0c36cdfd47339743c` |
| `AURA-CURRENT-API-001` | `vento-group-sas/vento-viso` | `src/app/api/viso/upload-website-media/route.ts` | `e20962c8217820da1ff0ce3f7355cb68800add4b` |
| `AURA-CURRENT-PUBLIC-001` | `carlosibarraariza/Vento-Group` | `src/app/page.tsx` | `533aa53e9adcffc5b20020758c627030a93344ac` |
| `AURA-CURRENT-PUBLIC-002` | `carlosibarraariza/Vento-Group` | `src/app/restaurantes/page.tsx` | `09b14aabf7c5968f4165aec7587e8e15b1769c95` |
| `AURA-CURRENT-PUBLIC-003` | `carlosibarraariza/Vento-Group` | `src/app/restaurantes/[slug]/page.tsx` | `cefd15e877e1b8acf9077d6e164ba5c3b99be5d3` |
| `AURA-CURRENT-PUBLIC-004` | `carlosibarraariza/Vento-Group` | `src/app/empleos/page.tsx` | `40396a9baa9f831e7ce38afde86937c3a434d170` |
| `AURA-CURRENT-PUBLIC-005` | `carlosibarraariza/Vento-Group` | `src/app/servicios/page.tsx` | `fa0992f3e4b419b40b622cf6d64ece7dde4398eb` |
| `AURA-CURRENT-PUBLIC-006` | `carlosibarraariza/Vento-Group` | `src/app/ecosistema/page.tsx` | `a1e253dbe0d6ba62b7751217fc9baf6deff86582` |
| `AURA-CURRENT-PUBLIC-007` | `carlosibarraariza/Vento-Group` | `src/app/eventos/page.tsx` | `5a2684f889afbdd813eaba1ba0a898ccb914557e` |
| `AURA-PLACEHOLDER-001` | `vento-group-sas/vento-nexo` | `src/components/vento/standard/vento-shell.tsx` | `7af860236ae90b845e65dcbbc5aa1b7dcb752f8d` |
| `AURA-PLACEHOLDER-002` | `vento-group-sas/vento-fogo` | `src/components/vento/standard/vento-shell.tsx` | `0b5b22aad48c9f46b5d42331c5eb3f74c169175a` |
| `AURA-PLACEHOLDER-003` | `vento-group-sas/vento-origo` | `src/components/vento/standard/vento-shell.tsx` | `6efde9814c6b5db23674d9262d015a60043d0af9` |
| `AURA-PLACEHOLDER-004` | `vento-group-sas/vento-pulso` | `src/components/vento/standard/vento-shell.tsx` | `87371e3b29332073ac0ccc8cf1edc02ddb53376d` |
| `AURA-PLACEHOLDER-005` | `vento-group-sas/vento-viso` | `src/components/vento/standard/vento-shell.tsx` | `e5672888d53383898db30dc1e7004b361de4ffb8` |
| `AURA-PLACEHOLDER-006/007` | `vento-group-sas/vento-shell` | `src/app/login/page.tsx` | `5c0633050f78b3f663f14abf117b60f4a8c15411` |
| `AURA-TEMPLATE-001` | `vento-group-sas/vento-shell` | `templates/app-shell-standard/src/components/vento/standard/app-switcher.tsx` | `09b4663a282fa12e1d32a10e21f74b1f16cffdad` |

Esta huella sirve como línea base de comparación para cambios posteriores; no congela `main` ni sustituye el lifecycle de cada repositorio.

---

#### 13. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

La cobertura de inventario, ownership, drift y divergencias de superficies ya existe en el registro canónico vigente. Esta tarea consume y confirma esa cobertura sin crear ni modificar filas.

**Requisitos creados:** 0
**Requisitos modificados:** 0

---

#### 14. Cobertura de prueba vigente reutilizada

La trazabilidad reutilizada incluye:

- `TREQ-AURA-004`: cero repositorios, rutas y pantallas propias; separación de placeholders;
- `TREQ-AURA-005`: delta explícito y reproducible ante cambios del inventario;
- `TREQ-AURA-006`: referencias AURA permanecen no disponibles mientras continúe bloqueada;
- `TREQ-AURA-007`: siete rutas VISO y siete rutas públicas conservan su ownership actual;
- `TREQ-AURA-017`: compatibilidad entre editor de restaurante y consumidor público;
- `TREQ-AURA-022`: divergencia de la categoría `event` frente a `/eventos`;
- `TREQ-AURA-023`: contrato consistente de claves y tipos entre productor y consumidor.

Esta sección documenta cobertura existente y no actualiza el Registro 04A.

---

#### 15. Handoff

`AURA-AUD-005` recibe un inventario cerrado de superficies:

```text
AURA_PROPIA
- rutas = 0
- pantallas = 0
- navegacion = 0

REFERENCIAS_AURA
- runtime = 7
- template = 1

ADMINISTRACION_RELACIONADA
- owner = VISO
- rutas = 7
- superficies_interactivas = 9
- route_handlers = 1

CONSUMO_PUBLICO
- owner = Vento-Group
- rutas = 7
- render = 6
- redirect = 1
```

La siguiente tarea inventariará procesos de marketing sobre estas superficies y fronteras sin modificar su ownership.

---

#### 16. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La redacción anticipada no ejecuta la batería del checkout; el build canónico se ejecutará al incorporar la tarea. |
| LOCAL | PASS | El artefacto fue auditado estructuralmente: una tarea, metadata obligatoria completa, continuidad exacta, inventarios completos, cero placeholders y cero TREQ dentro de la sección de cero cambios. |
| REMOTA | PASS | Se verificaron en `main` las siete rutas administrativas VISO, las siete rutas públicas de Vento-Group, el componente de media, el route handler, cinco AppSwitchers, login y template; además, consultas de solo lectura confirmaron cero navegación y cero pantallas registradas para `aura`. |
| OPERATIVA | NOT_APPLICABLE | La tarea inventaría superficies y no prueba sesiones humanas, navegación productiva ni disponibilidad de un producto AURA. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se materializan rutas, pantallas, navegación, APIs ni despliegues. |

---

#### 17. Criterios de aceptación

- [x] AURA conserva cero rutas propias y cero pantallas propias.
- [x] Se distingue la identidad canónica de AURA de una aplicación runtime.
- [x] Se inventarían siete referencias runtime y una referencia template sin contarlas como producto.
- [x] Se inventarían exactamente siete rutas administrativas actuales en VISO.
- [x] La distribución VISO queda en cuatro rutas estáticas y tres dinámicas.
- [x] Se inventarían exactamente nueve superficies interactivas subordinadas.
- [x] El upload de media se registra como componente y route handler, no como página adicional.
- [x] Se inventarían exactamente siete rutas públicas consumidoras en Vento-Group.
- [x] Se distinguen seis rutas públicas de render y una redirección.
- [x] `/eventos` se registra como ruta real con redirección a `/restaurantes`.
- [x] La divergencia `gallery_` frente a `galeria_` queda registrada sin corregirse.
- [x] El snapshot de Supabase confirma cero navegación y cero pantallas registradas para `aura`.
- [x] Las dos entradas de navegación VISO relacionadas se separan de la existencia física de las siete rutas.
- [x] Cada ruta y referencia principal conserva owner, archivo fuente y huella remota.
- [x] No se transfiere ownership desde VISO o Vento-Group.
- [x] No se crean requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecutan cambios físicos.

---

#### 18. Límites

Esta tarea no:

- crea un repositorio AURA;
- crea rutas o pantallas AURA;
- registra pantallas o navegación AURA;
- renombra rutas de VISO;
- migra el CMS;
- mueve contenido a otro repositorio;
- corrige `/eventos`;
- corrige las claves `gallery_` y `galeria_`;
- modifica server actions o route handlers;
- redefine permisos o protección de servidor;
- inventaría procesos de marketing, reservados a `AURA-AUD-005`;
- inventaría exhaustivamente datos y permisos, reservados a `AURA-AUD-006`;
- decide la relación de ownership futura con VISO, reservada a `AURA-AUD-007`;
- decide continuidad, reemplazo o retiro, reservado a `AURA-AUD-010`;
- modifica Supabase;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-003 — Confirmar usuarios actuales`

**TAREA ACTUAL APROBADA**
`AURA-AUD-004 — Inventariar rutas y pantallas`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-005 — Inventariar procesos de marketing`
### ✅ AURA-AUD-005 — Inventariar procesos de marketing

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-004 — Inventariar rutas y pantallas
**Tarea siguiente:** AURA-AUD-006 — Identificar datos y permisos utilizados
**Tipo de tarea:** auditoría técnico-documental del proceso actual de comunicación, contenido, promociones, campañas y oportunidades comerciales; reconcilia procesos canónicos, capacidades CAP-14, superficies transitorias y evidencias runtime sin convertirlas en implementación AURA ni transferir ownership
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda fijado el inventario actual de procesos y capacidades de marketing relacionados con AURA sin crear campañas, automatizaciones, integraciones, permisos, datos ni producto runtime
**Cambios físicos autorizados:** ninguno; esta tarea no publica contenido, no contacta clientes, no activa promociones, no crea campañas, no modifica precios, no conecta canales y no altera repositorios, Supabase, permisos, datos, credenciales ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar el estado real de los procesos de marketing que el modelo objetivo asigna a AURA y separarlo de las capacidades transitorias que hoy existen en VISO, Vento-Group, PASS, PULSO y canales externos.

La regla raíz es:

```text
PROCESO CANÓNICO DEFINIDO
!= PROCESO AURA IMPLEMENTADO

CAPACIDAD PARCIAL EXISTENTE
!= OWNERSHIP AURA

CONTENIDO PUBLICADO
!= CAMPAÑA

COLECCIÓN TIPO CAMPAIGN
!= CAMPAÑA AURA

CONTACTO EXTERNO
!= OPORTUNIDAD DIGITAL TRAZABLE
```

La tarea debe responder cuatro preguntas:

1. qué procesos empresariales de marketing ya están definidos;
2. qué capacidades del alcance `CAP-14` existen, son parciales, manuales o siguen sin implementación;
3. qué superficies actuales participan realmente en esos procesos;
4. qué faltantes deberán conservarse para la decisión de continuidad y las tareas posteriores.

---

#### 2. Reconciliación topológica

La topología aplicable es:

```text
TASK = AURA-AUD-005
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-004
NEXT = AURA-AUD-006
```

Consecuencias:

- esta tarea se agota en una definición canónica verificable;
- no produce una instancia física por package;
- no habilita `AURA-DOM`, `AURA-AUTH`, `AURA-UX` ni `AURA-INT`;
- no altera la puerta de `AURA-AUD-010`;
- no crea un repositorio AURA;
- no ejecuta campañas ni pruebas con usuarios;
- no convierte procesos diferidos en procesos desplegados.

---

#### 3. Fuentes consumidas

La auditoría consume sin reabrir:

- `CAP-SCOPE-014`, que define el modelo objetivo de comunicación y promoción;
- `BKL-FUNC-014`, que consolida el estado técnico actual de `CAP-14`;
- `VPROC-0056`, para contenido y promociones;
- `VPROC-0057`, para consultas y oportunidades digitales;
- `PROC-CAT-005`, que asigna ownership funcional objetivo;
- `INT-MKT-001`, que mantiene cerrada la puerta de campañas AURA hasta la decisión formal;
- `AURA-AUD-001` a `AURA-AUD-004`, como evidencia previa de ausencia de producto, usuarios efectivos y superficies propias;
- `WEB-FRM-011`, para la interfaz de newsletter todavía no resuelta;
- `TREQ-AURA-001` a `TREQ-AURA-003`, para identidad, IA, campañas, oportunidades y fronteras empresariales;
- la cobertura AURA de CMS, publicación, integración y continuidad ya registrada;
- los repositorios runtime observados de VISO y Vento-Group;
- el snapshot de solo lectura del entorno `vento-os-dev`.

Ninguna fuente se modifica desde esta tarea.

---

#### 4. Contrato del inventario

Se define:

```text
AURA_MARKETING_PROCESS_AUDIT_CONTRACT = AURA-CURRENT-MARKETING-PROCESS-001
```

El inventario usa cuatro estados de implementación:

```text
BASELINE_VERIFICADA_EN_USO
PARCIAL
MANUAL_O_EXTERNA
SIN_IMPLEMENTACION
```

y dos estados adicionales de relación:

```text
DEFINIDO_DIFERIDO
TRANSITORIO_NO_PROPIETARIO
```

`DEFINIDO_DIFERIDO` significa que el proceso, estados o eventos existen como contrato canónico, pero su propietaria objetivo no dispone todavía de producto runtime capaz de ejecutarlos.

`TRANSITORIO_NO_PROPIETARIO` significa que una superficie actual participa en una parte del proceso sin adquirir ownership del proceso AURA.

---

#### 5. Universo funcional `CAP-14`

El inventario canónico de comunicación y promoción contiene once subcapacidades:

| Subcapacidad | Nombre | Estado actual consolidado | Lectura de esta auditoría |
| --- | --- | --- | --- |
| `CAP-14.01` | Definir identidad y mensajes | `PARCIAL` | existen contenido, marca y mensajes distribuidos; no existe memoria de marca AURA versionada y propietaria |
| `CAP-14.02` | Planear comunicación y promociones | `MANUAL_O_EXTERNA` | no existe planificador AURA de objetivos, audiencia, calendario, presupuesto y dependencias |
| `CAP-14.03` | Crear y aprobar contenido | `BASELINE_VERIFICADA_EN_USO` | VISO administra contenido web; la existencia del CRUD no demuestra el ciclo AURA completo de revisión y aprobación |
| `CAP-14.04` | Publicar y administrar medios | `BASELINE_VERIFICADA_EN_USO` | existe publicación de contenido web; no existe orquestación multicanal AURA |
| `CAP-14.05` | Gestionar campañas | `SIN_IMPLEMENTACION` | no existe sistema AURA de campaña, hipótesis, audiencia, piezas, guardas, resultados y cierre |
| `CAP-14.06` | Gestionar promociones y cupones | `PARCIAL` | existen superficies comerciales relacionadas, pero la intención AURA y la ejecución PULSO/PASS no forman todavía un flujo canónico integrado |
| `CAP-14.07` | Captar oportunidades de venta | `SIN_IMPLEMENTACION` | no existe bandeja AURA de leads u oportunidades con consentimiento, origen y seguimiento |
| `CAP-14.08` | Gestionar ventas a empresas | `MANUAL_O_EXTERNA` | no existe pipeline B2B AURA implementado |
| `CAP-14.09` | Gestionar catering y eventos comerciales | `MANUAL_O_EXTERNA` | no existe workflow AURA implementado para oportunidad, brief, propuesta y seguimiento |
| `CAP-14.10` | Medir resultados de comunicación y promoción | `SIN_IMPLEMENTACION` | no existe atribución AURA entre interacción, conversión, venta incremental, margen y aprendizaje |
| `CAP-14.11` | Gestionar reputación y comentarios públicos | `MANUAL_O_EXTERNA` | no existe bandeja AURA integrada de reseñas, menciones, clasificación y escalamiento |

Balance:

```text
TOTAL_CAP_14 = 11
PARCIAL = 2
MANUAL_O_EXTERNA = 4
SIN_IMPLEMENTACION = 3
BASELINE_VERIFICADA_EN_USO = 2
```

La suma es:

```text
2 + 4 + 3 + 2 = 11
```

---

#### 6. Procesos canónicos de marketing

La arquitectura de procesos reduce el dominio operativo inmediato a dos procesos empresariales canónicos:

| Proceso | Propósito | Owner objetivo | Estado de productor |
| --- | --- | --- | --- |
| `VPROC-0056` | Gestionar contenido y promociones desde solicitud y aprobación hasta publicación y retiro | `aura` | `DEFINED_DEFERRED` |
| `VPROC-0057` | Convertir consultas y oportunidades de canales digitales en casos comerciales trazables | `aura` | `DEFINED_DEFERRED` |

Ambos procesos:

- tienen identidad canónica estable;
- conservan owner funcional objetivo `aura`;
- tienen estados y eventos definidos;
- no tienen implementación AURA demostrada;
- no tienen binding de pantalla AURA operativo;
- no deben reasignarse a VISO, PASS, PULSO o un canal externo por conveniencia;
- permanecen condicionados por `AURA-AUD-010`.

No se crea un tercer proceso de marketing desde esta tarea.

---

#### 7. Proceso `VPROC-0056`

`VPROC-0056` conserva el ciclo objetivo:

```text
CONTENT_REQUESTED
→ BRIEF_UNDER_REVIEW
→ IN_CREATION
→ UNDER_REVIEW
→ PENDING_APPROVAL
→ APPROVED
→ SCHEDULED
→ PUBLISHED
→ PERFORMANCE_REVIEW
→ CONTENT_CYCLE_REVIEWED
```

El estado actual es mixto:

| Tramo | Estado actual | Evidencia |
| --- | --- | --- |
| solicitud estructurada | no implementado como proceso AURA | no existe intake AURA |
| brief versionado | no implementado como proceso AURA | no existe producto runtime AURA |
| creación de contenido web | parcial existente | VISO crea y edita `website_items` y `website_blocks` |
| revisión/aprobación segregada | no demostrada como ciclo AURA | `is_published` no equivale a workflow completo |
| programación multicanal | no implementada | no existe orquestador AURA |
| publicación web | existente de forma transitoria | VISO escribe contenido consumido por Vento-Group |
| publicación a canales externos | no integrada como AURA | enlaces sociales no son adaptadores de publicación |
| retiro versionado | no demostrado como ciclo AURA | la superficie actual no acredita el workflow objetivo |
| revisión de rendimiento | no implementada | no existe atribución AURA |
| cierre y aprendizaje | no implementado | no existe expediente AURA de campaña/contenido |

La existencia de publicación web no convierte todo el ciclo en operativo.

---

#### 8. Proceso `VPROC-0057`

`VPROC-0057` conserva el ciclo objetivo:

```text
DIGITAL_INQUIRY_RECEIVED
→ TRIAGED
→ QUALIFICATION_PENDING
→ QUALIFIED
→ ASSIGNED
→ RESPONSE_IN_PROGRESS
→ COMMERCIAL_HANDOFF_PENDING
→ FOLLOW_UP_IN_PROGRESS
→ DIGITAL_INQUIRY_RESOLVED
```

El estado actual observado es:

| Tramo | Estado actual | Evidencia |
| --- | --- | --- |
| captura correlacionable | no implementada como bandeja AURA | no existe producto AURA |
| triage | no implementado | no existe workflow runtime AURA |
| calificación | no implementada | no existe expediente AURA |
| asignación | no implementada | no existe bandeja propietaria |
| respuesta trazable | manual o externa | el sitio público usa contacto por correo y superficies externas |
| handoff comercial | manual o externa | no existe handoff AURA implementado |
| seguimiento | manual o externo | no existe timeline AURA |
| cierre con resultado | no implementado | no existe cierre correlacionable de oportunidad AURA |

Una interacción recibida por correo o canal externo no se considera automáticamente una instancia de `VPROC-0057`.

---

#### 9. CMS actual de VISO

La capacidad web existente participa principalmente en `CAP-14.03` y `CAP-14.04`.

VISO administra:

- `website_items`;
- `website_blocks`;
- categorías de contenido como restaurante, empleo, servicio, evento y app;
- campos editoriales;
- media;
- CTA;
- orden;
- estado `is_published`.

Esta superficie:

```text
ES una baseline actual de contenido web
NO ES AURA
NO ES un sistema de campañas
NO ES un planificador de promociones
NO ES una bandeja de oportunidades
NO ES una plataforma de atribución
```

El snapshot remoto observado contiene:

```text
website_items_total = 9
website_items_published = 9
website_blocks_total = 7
website_blocks_published = 7
```

Distribución de `website_items`:

```text
app = 3
event = 1
job = 1
restaurant = 3
service = 1
```

La existencia de contenido publicado confirma una baseline web en uso, no un sistema operativo de marketing AURA.

---

#### 10. Colecciones comerciales de VISO

VISO contiene una superficie `commercial_collections` que permite `kind = campaign`.

El snapshot observado es:

```text
commercial_collections_total = 9
kind_campaign_total = 2
kind_campaign_active = 1
kind_event_total = 0
kind_event_active = 0
```

Sin embargo:

```text
COMMERCIAL_COLLECTION(kind=campaign)
!= AURA_CAMPAIGN
```

La superficie observada administra colecciones comerciales asociadas a menú, sede, orden, imagen, vigencia y activación.

No demuestra por sí sola:

- objetivo de campaña;
- hipótesis;
- audiencia;
- consentimiento;
- presupuesto;
- piezas multicanal;
- aprobación de marketing;
- integración con canales;
- atribución;
- aprendizaje;
- cierre de campaña.

Por tanto se registra como capacidad comercial relacionada y no como implementación de `CAP-14.05`.

---

#### 11. Sitio público Vento-Group

Vento-Group actúa como consumidor público de contenido y como frontera de contacto, pero no como sistema operativo de marketing.

Se observa:

- consumo de `website_items` y `website_blocks`;
- páginas públicas de restaurantes, servicios, empleos y ecosistema;
- contacto mediante `mailto:hola@ventogroup.co`;
- enlaces sociales;
- una interfaz de newsletter en el footer;
- un botón `Suscribirse` sin submit, handler o integración observable en el componente revisado.

La newsletter permanece bajo:

```text
WEB-FRM-011
Implementar suscripción de newsletter o retirar la interfaz
```

Por tanto:

```text
CAMPO_EMAIL + BOTON_SUSCRIBIRSE
!= SUSCRIPCION FUNCIONAL
```

y:

```text
MAILTO
!= CRM
!= LEAD_AURA
!= OPORTUNIDAD_TRAZABLE
```

---

#### 12. Canales externos

Instagram, LinkedIn, YouTube, correo y otros canales pueden existir como medios reales de actividad comercial o comunicación.

Esta auditoría los clasifica como:

```text
CANAL_EXTERNO
→ puede transportar publicación, contacto o métricas
→ no se convierte en owner del proceso
→ no demuestra integración AURA
```

No se observó desde las superficies revisadas un adaptador AURA runtime que:

- publique;
- programe;
- reconcilie;
- retire;
- reciba leads;
- consuma comentarios;
- capture métricas;
- mantenga idempotencia;
- preserve credenciales bajo un contrato AURA.

La actividad manual o externa puede continuar según la autoridad vigente, sin ser reclasificada como implementación AURA.

---

#### 13. Frontera con PASS y PULSO

El inventario preserva:

```text
AURA
→ intención de marketing, campaña y atribución cuando sea autorizada

PASS
→ identidad, consentimiento, fidelización, beneficios y redención

PULSO
→ oferta vendible, pedido, venta, cobro y efecto transaccional
```

La auditoría de código realizada no aporta evidencia suficiente para promover PASS o PULSO a owner de campañas.

Una promoción o descuento ejecutado transaccionalmente no constituye por sí solo:

- campaña;
- audiencia;
- contenido;
- publicación;
- atribución;
- aprendizaje.

Las relaciones exactas permanecen reservadas a:

- `AURA-AUD-008 — Definir relación con PASS`;
- `AURA-AUD-009 — Definir relación con PULSO`.

---

#### 14. Eventos y pantallas diferidos

Los eventos empresariales de `VPROC-0056` y `VPROC-0057` están definidos documentalmente.

Para `VPROC-0056` se preservan eventos desde solicitud hasta ciclo evaluado.

Para `VPROC-0057` se preservan eventos desde consulta digital recibida hasta resolución.

Su estado de productor permanece diferido.

Además, el registro de bindings conserva:

```text
VPROC-0056 → 0 bindings de pantalla operativos
VPROC-0057 → 0 bindings de pantalla operativos
```

Esto confirma la diferencia entre contrato de proceso y producto disponible.

---

#### 15. Mapa de proceso actual

El estado reconciliado queda:

| Materia | Superficie actual | Estado | Owner actual o autoridad | Owner objetivo |
| --- | --- | --- | --- | --- |
| identidad y mensajes | archivos, contenido y práctica distribuida | parcial | distribuido | AURA |
| planificación de comunicación | práctica manual/externa | manual o externa | humana/canal | AURA + NUMERA |
| creación de contenido web | VISO `/website-cms` | baseline en uso | VISO | AURA, sujeto a decisión futura |
| publicación web | VISO → Vento-Group | baseline en uso | VISO + consumidor público | AURA + canales, sujeto a decisión futura |
| campaña integral | no existe como AURA | sin implementación | ninguno como sistema AURA | AURA |
| promociones/cupons | capacidades parciales fuera de AURA | parcial | PASS/PULSO según hecho | AURA + PASS + PULSO + NUMERA |
| captura de oportunidades | correo/canales sin bandeja AURA | sin implementación AURA | canal/humano | AURA |
| ventas B2B | manual o externa | manual o externa | operación comercial | AURA + PULSO + NUMERA |
| catering/eventos comerciales | manual o externa | manual o externa | operación comercial | AURA + PULSO + FOGO + NEXO |
| medición de marketing | no existe atribución AURA | sin implementación | fuentes dispersas | AURA + NUMERA |
| reputación pública | manual o externa | manual o externa | canal/humano | AURA + VISO/PASS |

Ninguna fila de owner objetivo autoriza una transferencia actual.

---

#### 16. Brechas operativas

La auditoría congela estas brechas:

1. AURA no dispone de producto runtime.
2. No existe bandeja AURA de campañas.
3. No existe workflow AURA de contenido end-to-end.
4. No existe planificador AURA.
5. No existe bandeja AURA de oportunidades.
6. No existe pipeline B2B AURA.
7. No existe workflow AURA de catering/eventos.
8. No existe atribución AURA.
9. No existe bandeja AURA de reputación.
10. No existe publicación multicanal AURA.
11. No existe conciliación AURA con canales externos.
12. No existe automatización de newsletter funcional en el sitio observado.
13. VISO conserva CMS y contenido web actuales.
14. Vento-Group conserva consumo público actual.
15. `commercial_collections.kind = campaign` no satisface `CAP-14.05`.
16. Los eventos `VPROC-0056` y `VPROC-0057` permanecen diferidos.
17. No se debe ampliar VISO, PASS o PULSO para llenar silenciosamente el vacío AURA.
18. La decisión de continuidad sigue perteneciendo a `AURA-AUD-010`.

---

#### 17. Handoff

`AURA-AUD-006` recibe un inventario estable de procesos y superficies.

Debe identificar los datos y permisos efectivamente utilizados por:

- CMS actual de VISO;
- publicación web;
- contenido y media;
- colecciones comerciales relacionadas;
- consumo público;
- newsletter incompleta;
- contacto por correo;
- procesos canónicos diferidos `VPROC-0056` y `VPROC-0057`;
- relaciones futuras con PASS, PULSO, NUMERA y canales.

La siguiente tarea no debe asumir que un dato o permiso existe únicamente porque el modelo objetivo lo necesita.

Debe separar:

```text
DATO_ACTUAL
DATO_OBJETIVO
PERMISO_ACTUAL
PERMISO_RESERVADO
PERMISO_FUTURO
```

---

#### 18. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

La cobertura vigente ya protege:

- identidad y versionado de campañas, contenido y publicación;
- separación entre campaña, pieza, publicación, promoción y regla transaccional;
- IA, privacidad, consentimiento y fuentes autorizadas;
- oportunidades, B2B, catering, reputación y atribución;
- ausencia de producto AURA;
- propiedad transitoria de CMS y consumidores públicos;
- autorización, publicación, integración y continuidad.

Esta tarea inventaría el estado actual y lo reconcilia con esas obligaciones sin crear una obligación verificable material nueva.

**Requisitos creados:** 0
**Requisitos modificados:** 0

---

#### 19. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, en especial:

- `TREQ-AURA-001`, para identidad, versionado, campañas, contenido, publicación y promoción;
- `TREQ-AURA-002`, para IA, grounding, privacidad, autorización y trazabilidad;
- `TREQ-AURA-003`, para campañas, promociones, oportunidades, B2B, catering, reputación, resultados y fronteras PULSO/PASS/NUMERA;
- `TREQ-AURA-004` a `TREQ-AURA-007`, para existencia, drift, disponibilidad y ownership actual;
- `TREQ-AURA-009`, para capacidades atómicas de mutación y publicación;
- `TREQ-AURA-019`, para separar borrador, revisión, aprobación, programación, publicación, retiro y archivo;
- `TREQ-AURA-025`, para integridad de CTA, enlaces y destinos;
- `TREQ-AURA-027`, para impedir una transferencia de CMS sin decisión, ADR, migración y reconciliación;
- `TREQ-INTEGRATION-019`, para contratos internos y canales externos cuando se materialicen.

Esta sección documenta cobertura existente y no actualiza el Registro 04A.

---

#### 20. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La redacción anticipada no ejecuta la batería del checkout; el build canónico se ejecutará al incorporar la tarea. |
| LOCAL | PASS | El artefacto fue auditado estructuralmente y normalizado para eliminar whitespace al final de todas las líneas; contiene una sola tarea, metadata completa, continuidad exacta y cero requisitos nuevos. |
| REMOTA | PASS | Se verificaron contratos de procesos, estados, ownership, eventos, backlog `CAP-14`, `INT-MKT-001`, superficies VISO/Vento-Group y un snapshot agregado de solo lectura de contenido y colecciones comerciales. |
| OPERATIVA | NOT_APPLICABLE | No se ejecutaron campañas, publicaciones externas, capturas de leads ni sesiones humanas; la tarea inventaría procesos y capacidades observables. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no se materializa producto, campaña, integración, dato, permiso, canal ni automatización. |

---

#### 21. Criterios de aceptación

- [x] Se inventarían exactamente once subcapacidades `CAP-14.01..11`.
- [x] La clasificación suma exactamente 11.
- [x] Se reconocen exactamente dos procesos canónicos inmediatos de marketing: `VPROC-0056` y `VPROC-0057`.
- [x] Ambos conservan owner objetivo `aura`.
- [x] Ambos conservan estado de productor diferido.
- [x] Se registra el ciclo completo de `VPROC-0056`.
- [x] Se registra el ciclo completo de `VPROC-0057`.
- [x] Se separa publicación web existente de campaña AURA.
- [x] Se separa `commercial_collections.kind = campaign` de `CAP-14.05`.
- [x] Se documenta la baseline actual de `website_items` y `website_blocks`.
- [x] Se documenta el snapshot actual de colecciones comerciales.
- [x] Se clasifica la newsletter como interfaz no funcional pendiente de `WEB-FRM-011`.
- [x] Se separa contacto por correo de oportunidad digital trazable.
- [x] Se preservan VISO y Vento-Group como owners actuales de sus superficies.
- [x] No se reasigna ownership a PASS o PULSO.
- [x] Se reserva la relación con PASS a `AURA-AUD-008`.
- [x] Se reserva la relación con PULSO a `AURA-AUD-009`.
- [x] Se conserva la decisión de continuidad en `AURA-AUD-010`.
- [x] Se entrega a `AURA-AUD-006` un inventario de procesos suficiente para auditar datos y permisos.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecutan cambios físicos.

---

#### 22. Límites

Esta tarea no:

- implementa AURA;
- crea un repositorio AURA;
- crea campañas;
- crea briefs;
- crea audiencias;
- publica contenido;
- programa publicaciones;
- conecta canales;
- configura redes sociales;
- registra leads;
- contacta clientes;
- implementa newsletter;
- modifica VISO;
- modifica Vento-Group;
- modifica PASS;
- modifica PULSO;
- modifica NUMERA;
- modifica datos o permisos;
- modifica Supabase;
- convierte colecciones comerciales en campañas AURA;
- redefine `VPROC-0056` o `VPROC-0057`;
- reasigna ownership;
- decide la relación final con VISO, reservada a `AURA-AUD-007`;
- decide la relación final con PASS, reservada a `AURA-AUD-008`;
- decide la relación final con PULSO, reservada a `AURA-AUD-009`;
- decide continuidad, reemplazo o retiro, reservado a `AURA-AUD-010`;
- desbloquea el roadmap objetivo;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 23. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-004 — Inventariar rutas y pantallas`

**TAREA ACTUAL APROBADA**
`AURA-AUD-005 — Inventariar procesos de marketing`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-006 — Identificar datos y permisos utilizados`
### ✅ AURA-AUD-006 — Identificar datos y permisos utilizados

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-005 — Inventariar procesos de marketing
**Tarea siguiente:** AURA-AUD-007 — Definir relación con VISO
**Tipo de tarea:** auditoría técnico-documental de datos, almacenamiento y autorización utilizados por las capacidades actuales relacionadas con AURA; separa datos actuales, datos objetivo, permisos actuales, permisos reservados y permisos futuros sin alterar runtime
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda congelado el mapa actual de datos y permisos que soporta CMS, publicación web, colecciones comerciales y reserva de acceso AURA
**Cambios físicos autorizados:** ninguno; no modifica tablas, políticas RLS, grants, permisos, Storage, datos, aplicaciones, repositorios, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Identificar qué datos y permisos se utilizan realmente hoy alrededor del dominio futuro de AURA y separarlos del modelo objetivo.

La regla raíz es:

```text
DATO EXISTENTE
!= DATO PROPIEDAD DE AURA

PERMISO EXISTENTE
!= PERMISO SUFICIENTE

SERVICE ROLE
!= AUTORIZACIÓN DEL ACTOR

GRANT RUNTIME
!= GRANT CANÓNICAMENTE CORRECTO

DATO OBJETIVO
!= DATO ACTUAL
```

La auditoría produce cinco clases:

```text
DATO_ACTUAL
DATO_OBJETIVO
PERMISO_ACTUAL
PERMISO_RESERVADO
PERMISO_FUTURO
```

---

#### 2. Reconciliación topológica

```text
TASK = AURA-AUD-006
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-005
NEXT = AURA-AUD-007
```

La tarea no ejecuta migraciones ni modifica autorización. Consume la corrección de `AURA-AUD-003` como evidencia válida de runtime.

---

#### 3. Contrato de auditoría

Se define:

```text
AURA_CURRENT_DATA_PERMISSION_AUDIT = AURA-CURRENT-DATA-PERMISSION-001
```

El contrato exige conservar tres fronteras:

```text
OWNER_ACTUAL
OWNER_OBJETIVO
CONSUMIDOR
```

Ningún dato cambia de propietario por aparecer en una superficie relacionada con marketing.

---

#### 4. Datos actuales de contenido web

El CMS actual de VISO usa `public.website_items` y `public.website_blocks`.

`public.website_items` contiene:

```text
id
category
slug
title
excerpt
body
location
schedule_text
start_at
end_at
image_url
video_url
action_label
action_url
sort_order
is_published
created_at
updated_at
```

Snapshot:

```text
website_items_total = 9
website_items_published = 9
```

`public.website_blocks` contiene:

```text
id
page_slug
block_key
block_type
title
subtitle
body
cta_label
cta_url
media_url
media_type
sort_order
is_published
created_at
updated_at
```

Snapshot:

```text
website_blocks_total = 7
website_blocks_published = 7
```

Vento-Group consume exclusivamente filas con `is_published = true` desde estas tablas.

---

#### 5. Datos actuales de sedes y restaurantes

La sincronización de restaurantes de VISO consume:

- `pass.pass_satellites`;
- `public.sites`;
- `public.website_items`.

Campos utilizados de `pass.pass_satellites` incluyen:

```text
id
code
name
subtitle
site_id
logo_url
address_override
sort_order
is_active
```

Snapshot:

```text
pass_satellites_total = 3
pass_satellites_active = 3
sites_total = 7
sites_active = 7
```

Estos datos continúan siendo propiedad de PASS/sedes y solo se consumen para proyección de contenido.

---

#### 6. Datos actuales de colecciones comerciales

La superficie `commercial-collections` de VISO consume principalmente:

- `pass.commercial_collections`;
- `pass.catalog_item_collections`;
- `pass.pass_satellites`;
- `public.sites`;
- tablas comerciales auxiliares del esquema `pass`.

`pass.commercial_collections` contiene:

```text
id
site_id
code
name
subtitle
description
kind
hero_image_url
starts_at
ends_at
sort_order
is_active
metadata
created_at
updated_at
```

Snapshot:

```text
commercial_collections_total = 9
commercial_collections_active = 7
kind_campaign_total = 2
kind_campaign_active = 1
```

`pass.catalog_item_collections` contiene:

```text
id
catalog_item_id
commercial_collection_id
sort_order
is_active
is_primary
metadata
created_at
updated_at
```

Snapshot:

```text
catalog_item_collections_total = 243
catalog_item_collections_active = 243
```

Estas tablas no se reclasifican como tablas AURA.

---

#### 7. Storage actual

El handler de media de VISO usa el bucket:

```text
website-media
```

El código actual:

- exige autenticación;
- permite solo roles locales `propietario` y `gerente_general`;
- acepta imágenes y videos;
- admite `image/svg+xml`;
- acepta un `scope` enviado por formulario y lo sanitiza para formar el path;
- usa el cliente de sesión y `storage.from(BUCKET).upload`;
- devuelve una URL pública.

El snapshot remoto observado contiene:

```text
website_media_objects = 0
```

La ausencia actual de objetos no elimina el contrato ni los riesgos del handler.

---

#### 8. Lectura administrativa del CMS

Las rutas de `website-cms` llaman actualmente:

```text
requireAppAccess({ appId: "viso", returnTo: ... })
```

sin `permissionCode` específico.

Después crean:

```text
createAdminClient()
```

para consultar y mutar contenido.

Consecuencia:

```text
GUARD DE RUTA ACTUAL = viso.access
PERMISO ESPECÍFICO CMS EN GUARD = AUSENTE
CLIENTE DE DATOS = service role / admin client
```

El catálogo runtime sí contiene:

```text
viso.access = activo
viso.website_cms.read = activo
```

pero `website_cms.read` no está exigido por las rutas inspeccionadas.

Este hallazgo ya está cubierto por `TREQ-AURA-008` y no se corrige desde esta tarea.

---

#### 9. Grants actuales de VISO relevantes

`viso.access` tiene grants runtime para:

```text
auxiliar_administrativa
gerente
contador
gerente_general
propietario
```

y un override individual registrado.

`viso.website_cms.read` tiene grants runtime para:

```text
gerente
gerente_general
propietario
```

sin overrides individuales observados.

La divergencia relevante es:

```text
CMS ROUTE GUARD
→ exige viso.access

CMS READ PERMISSION
→ existe
→ no se exige en la ruta observada
```

No se infiere que todas las mutaciones deban compartir `website_cms.read`; las capacidades atómicas futuras pertenecen al roadmap de autorización AURA/VISO.

---

#### 10. RLS y clientes privilegiados

Las tablas auditadas tienen RLS habilitado.

Para `public.website_items` y `public.website_blocks` se observa política de lectura `authenticated` limitada a:

```text
is_published = true
```

Las rutas administrativas de VISO usan `createAdminClient`, que técnicamente evita depender de esa política para el conjunto administrativo.

Por tanto:

```text
SERVICE_ROLE
!= AUTORIZACIÓN DEL ACTOR
```

El guard debe resolver al actor y la capacidad antes de usar el cliente privilegiado.

La exigencia ya está cubierta por `TREQ-AURA-010`.

---

#### 11. RLS comercial PASS

`pass.pass_satellites`, `pass.commercial_collections` y `pass.catalog_item_collections` tienen RLS habilitado.

Se observan políticas públicas o anónimas de lectura para datos activos y políticas administrativas basadas en `is_owner()` o `is_global_manager()` para mutaciones y lectura administrativa.

Esto confirma:

```text
DATOS PASS
→ siguen gobernados por PASS/RLS
→ pueden ser consumidos por VISO
→ no pasan a ser propiedad de AURA
```

La relación funcional futura se resolverá en `AURA-AUD-008` y `AURA-AUD-009`.

---

#### 12. Permiso reservado AURA

El permiso canónico:

```text
aura.access
```

es `BASE_ONLY` y admite únicamente `NT-APP`.

El runtime actual lo materializa como:

```text
apps.code = aura
app_permissions.code = access
```

con cinco grants:

| Rol | Alcance runtime | Decisión canónica | Estado |
| --- | --- | --- | --- |
| `propietario` | `global` | `ASIGNAR / NT-APP` | rol correcto; scope en drift |
| `gerente_general` | `global` | `ASIGNAR / NT-APP` | rol correcto; scope en drift |
| `marketing` | `site_type=admin` | `ASIGNAR / NT-APP-DORMANT` | rol correcto; scope en drift |
| `contador` | `global` | `NO ASIGNAR` | drift de rol y scope |
| `gerente` | `global` | `NO ASIGNAR` | drift de rol y scope |

También se observan:

```text
employee overrides aura.access = 0
AURA navigation rows = 0
AURA screen rows = 0
```

La existencia de estos grants no habilita AURA.

---

#### 13. Clasificación consolidada

##### 13.1 DATO_ACTUAL

- `public.website_items`;
- `public.website_blocks`;
- `public.sites` en los campos consumidos;
- `pass.pass_satellites` en los campos consumidos;
- `pass.commercial_collections`;
- `pass.catalog_item_collections`;
- media en `website-media` cuando exista;
- metadata de apps, permisos, role grants y overrides necesaria para autorización.

##### 13.2 DATO_OBJETIVO

No se materializa en esta tarea. Incluye únicamente conceptos requeridos por el modelo futuro, como campañas, piezas, publicaciones multicanal, oportunidades, consentimiento, atribución, reputación y aprendizaje, cuando las tareas `AURA-DOM` los definan después del gate de continuidad.

##### 13.3 PERMISO_ACTUAL

- `viso.access`;
- `viso.website_cms.read` como permiso runtime existente aunque no aplicado al guard inspeccionado;
- controles locales del handler de media basados en rol;
- políticas RLS vigentes;
- `aura.access` como reserva runtime existente.

##### 13.4 PERMISO_RESERVADO

`aura.access` permanece reservado y dormido mientras AURA siga sin producto funcional.

##### 13.5 PERMISO_FUTURO

Las capacidades atómicas de:

```text
read
create
update
publish
unpublish
delete
import
upload_media
manage_campaign
manage_audience
manage_opportunity
measure_attribution
```

no se consideran runtime existente salvo evidencia concreta posterior. Su definición corresponde a `AURA-AUTH-001..004` si `AURA-AUD-010` permite continuar.

---

#### 14. Hallazgos congelados

1. AURA no tiene tablas de dominio propias observadas.
2. AURA no tiene navegación ni pantallas runtime registradas.
3. `aura.access` sí está materializado.
4. Los cinco grants de `aura.access` presentan drift de alcance; dos también drift de rol.
5. El CMS actual pertenece a VISO.
6. El CMS usa `createAdminClient` después de un guard general de VISO.
7. Existe `viso.website_cms.read`, pero las rutas inspeccionadas no lo exigen.
8. Las tablas de contenido tienen RLS y lectura autenticada limitada a contenido publicado.
9. Vento-Group consume contenido publicado con su cliente público.
10. Las tablas comerciales siguen en el esquema PASS.
11. El bucket `website-media` existe contractualmente en código y no contiene objetos en el snapshot observado.
12. El upload actual usa control local por roles, no una capacidad atómica canónica.
13. No se debe corregir silenciosamente autorización durante la auditoría.
14. El cambio físico de matrices/grants pertenece a los datasets canónicos y migraciones versionadas del carril físico correspondiente.

---

#### 15. Handoff hacia AURA-AUD-007

`AURA-AUD-007 — Definir relación con VISO` recibe:

- VISO como owner actual del CMS;
- Vento-Group como consumidor público;
- tablas de contenido compartidas actualmente bajo `public`;
- tablas comerciales bajo `pass`;
- guard administrativo general de VISO;
- permiso CMS específico existente pero no exigido en las rutas observadas;
- uso de admin client para contenido;
- handler de media con control local por rol;
- reserva `aura.access` materializada pero dormida;
- drift de grants y scopes que no puede interpretarse como transferencia de ownership.

La siguiente tarea deberá decidir la relación arquitectónica entre AURA y VISO sin mover datos o rutas por inferencia.

---

#### 16. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** los hallazgos de lectura específica, acciones atómicas, service role, Storage, consumo público, contrato de datos, drift y transferencia futura ya están cubiertos por requisitos AURA vigentes. Esta tarea inventaría el estado real y no introduce una obligación verificable nueva.

---

#### 17. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AURA-005`, para drift de permisos y superficies;
- `TREQ-AURA-008`, para lectura específica del CMS;
- `TREQ-AURA-009`, para capacidades atómicas de mutación;
- `TREQ-AURA-010`, para fronteras de `createAdminClient` y service role;
- `TREQ-AURA-018`, para media y Storage;
- `TREQ-AURA-020`, para lectura pública y mínimo privilegio;
- `TREQ-AURA-024`, para contrato esquema/RLS/clientes;
- `TREQ-AURA-027`, para futura transferencia VISO→AURA.

---

#### 18. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La tarea todavía debe incorporarse al checkout y ejecutar la batería documental. |
| LOCAL | `PASS` | Artefacto UTF-8/LF, una sola tarea, metadata completa y cero whitespace final. |
| REMOTA | `PASS` | Se inspeccionaron VISO, Vento-Group y Supabase en modo lectura; se verificaron tablas, columnas, conteos, RLS, grants, permisos, navegación, pantallas y Storage. |
| OPERATIVA | `NOT_APPLICABLE` | No se ejecutan campañas, publicación real, carga de archivos ni sesiones humanas. |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no se modifica runtime. |

---

#### 19. Criterios de aceptación

- [x] Se separan datos actuales y datos objetivo.
- [x] Se inventarían las tablas actuales de contenido, sedes, satélites y colecciones.
- [x] Se registran conteos actuales relevantes.
- [x] Se identifica el bucket de media y su estado observado.
- [x] Se identifica el guard actual del CMS.
- [x] Se confirma la existencia de `viso.website_cms.read` y su ausencia en el guard inspeccionado.
- [x] Se identifica el uso de `createAdminClient`.
- [x] Se confirma RLS en tablas auditadas.
- [x] Se identifica la materialización física correcta de `aura.access`.
- [x] Se documentan cinco grants runtime AURA y su drift.
- [x] Se confirman cero navegación y cero pantallas AURA runtime.
- [x] Se preservan ownership actual de VISO, PASS y Vento-Group.
- [x] No se crean permisos futuros por inferencia.
- [x] No se modifica Supabase.
- [x] No se modifica 04A.
- [x] No se crean requisitos de prueba.

---

#### 20. Límites

Esta tarea no modifica schemas, columnas, filas, RLS, grants, permisos, Storage, secretos, rutas, navegación, repositorios, aplicaciones ni despliegues. No mueve CMS a AURA, no corrige físicamente drift, no define aún la relación final con VISO/PASS/PULSO y no desbloquea `AURA-DOM`, `AURA-AUTH`, `AURA-UX` o `AURA-INT`.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-005 — Inventariar procesos de marketing`

**TAREA ACTUAL APROBADA**
`AURA-AUD-006 — Identificar datos y permisos utilizados`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-007 — Definir relación con VISO`
### ✅ AURA-AUD-007 — Definir relación con VISO

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-006 — Identificar datos y permisos utilizados
**Tarea siguiente:** AURA-AUD-008 — Definir relación con PASS
**Tipo de tarea:** definición técnico-documental de la relación AURA–VISO; separa ownership funcional, aplicación primaria objetivo, runtime actual, consumo, handoffs y condiciones de transferencia sin mover rutas, datos, permisos ni producto
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda fijada la relación actual y condicionada entre AURA y VISO sin transferir CMS, rutas, procesos, datos, permisos ni despliegues
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-viso`, AURA, Vento-Group, Supabase, rutas, permisos, tablas, contratos runtime, DNS, despliegues ni repositorios
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la relación arquitectónica entre AURA y VISO usando simultáneamente el estado AS-IS y la propiedad funcional objetivo ya aprobada, sin convertir una ubicación técnica actual en ownership empresarial ni anticipar la decisión de continuidad de AURA.

La regla raíz es:

```text
RUNTIME_ACTUAL
!= APLICACION_PRIMARIA_OBJETIVO
!= PROPIETARIA_DEL_PROCESO
!= CONSUMIDORA
```

Para este caso:

```text
VISO = HOST Y OPERADOR ADMINISTRATIVO ACTUAL DEL CMS
AURA = PROPIETARIA FUNCIONAL OBJETIVO DE VPROC-0056 Y VPROC-0057
VENTO-GROUP = CONSUMIDOR PUBLICO ACTUAL DEL CONTENIDO PUBLICADO
```

Ninguna de esas tres afirmaciones autoriza una transferencia física.

---

#### 2. Reconciliación topológica

La tarea conserva:

```text
TASK = AURA-AUD-007
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-006
NEXT = AURA-AUD-008
```

Consecuencias:

- la tarea se agota en una definición canónica;
- no genera instancia física propia;
- no mueve código, datos o rutas;
- no activa AURA;
- no decide todavía continuidad, reemplazo o retiro;
- no reemplaza el ADR reservado a `AURA-AUD-011`;
- no desbloquea `AURA-DOM`, `AURA-AUTH`, `AURA-UX` ni `AURA-INT`.

---

#### 3. Entradas aprobadas

La relación consume:

- `AURA-AUD-001`, que confirma ausencia de repositorio standalone AURA;
- `AURA-AUD-002`, que confirma producto AURA no implementado y no disponible;
- `AURA-AUD-003`, con población y autorización AURA reconciliadas;
- `AURA-AUD-004`, con inventario de rutas y pantallas;
- `AURA-AUD-005`, con `VPROC-0056` y `VPROC-0057` como procesos AURA diferidos;
- `AURA-AUD-006`, con datos, permisos y fronteras actuales de VISO y Vento-Group;
- `AUTH-UI-013`, que separa aplicación primaria, propietaria del proceso y runtime actual;
- `AUTH-UI-014`, que separa propietaria y consumidora;
- `PROC-CAT-005`, como autoridad de ownership funcional;
- el contrato de handoffs vigente;
- el inventario actual de superficies y la cobertura de prueba AURA vigente.

---

#### 4. Contrato de relación

Se define:

```text
AURA_VISO_RELATION_CONTRACT = AURA-VISO-RELATION-001
```

La relación tiene cinco dimensiones obligatorias:

| Dimensión | Decisión |
| --- | --- |
| ownership de proceso | lo conserva `PROC-CAT-005` y no depende del repositorio donde vive una vista |
| aplicación primaria de superficie | la conserva `AUTH-UI-013` |
| runtime actual | identifica dónde existe físicamente hoy la superficie |
| consumo/handoff | lo gobierna el registro de handoffs y no el host técnico |
| transferencia futura | queda condicionada por `AURA-AUD-010`, `AURA-AUD-011`, `AURA-AUD-012` y el contrato de migración aplicable |

La relación actual se clasifica como:

```text
CURRENT_RELATION = TRANSITIONAL_RUNTIME_CUSTODY
TARGET_RELATION = DEFERRED_FUNCTIONAL_OWNERSHIP
TRANSFER_STATUS = NOT_AUTHORIZED
DUAL_MASTER_ALLOWED = NO
```

---

#### 5. Ownership funcional AURA

Los procesos empresariales de marketing mantienen:

| Proceso | Propietaria | Estado |
| --- | --- | --- |
| `VPROC-0056` | `aura` | `DEFINED_DEFERRED` |
| `VPROC-0057` | `aura` | `DEFINED_DEFERRED` |

`VPROC-0056` gobierna contenido y promociones desde solicitud y aprobación hasta publicación y retiro.

`VPROC-0057` gobierna la conversión de consultas y oportunidades digitales en casos comerciales trazables.

Por tanto:

```text
VISO_HOSTEA_CAPACIDAD_ACTUAL
!= VISO_PROPIETARIA_DE_VPROC-0056
!= VISO_PROPIETARIA_DE_VPROC-0057
```

VISO no adquiere propiedad funcional de marketing por contener hoy código editorial o rutas CMS.

---

#### 6. Runtime actual de VISO

VISO conserva actualmente la responsabilidad técnica y operativa de las superficies CMS observadas.

Las siete rutas administrativas de `website-cms` continúan atribuidas al runtime VISO:

1. `/website-cms`;
2. `/website-cms/blocks/new`;
3. `/website-cms/blocks/[id]`;
4. `/website-cms/items/new`;
5. `/website-cms/items/[id]`;
6. `/website-cms/venues`;
7. `/website-cms/venues/[slug]`.

También existen dos superficies VISO relacionadas con bloques de contenido:

8. `/content-blocks`;
9. `/content-blocks/[id]`.

Las nueve superficies anteriores existen físicamente en `vento-viso`.

Su existencia actual no autoriza:

- copiarlas a un repositorio AURA;
- duplicar las tablas de contenido;
- crear un segundo CMS;
- convertir VISO en propietaria funcional de `VPROC-0056`;
- declarar que AURA ya está implementada.

---

#### 7. Aplicación primaria objetivo de las nueve superficies

`AUTH-UI-013` ya clasificó las nueve superficies VISO anteriores con:

```text
PRIMARY_APPLICATION_ID = aura
PROCESS_OWNER_APPLICATION_ID = aura
APPLICATION_BINDING_MODE = DEFERRED_AURA_TARGET
APPLICATION_BINDING_STATUS = DEFERRED_APPLICATION_BOUND
RUNTIME_CONTAINER = viso
```

Esto significa:

```text
AURA = FRONTERA FUNCIONAL OBJETIVO
VISO = CONTENEDOR RUNTIME AS-IS
```

No significa:

```text
TRANSFERENCIA EJECUTADA
REPOSITORIO AURA EXISTENTE
RUTA AURA DISPONIBLE
VSCREEN AURA MATERIALIZADA
CUTOVER APROBADO
```

La separación entre `primary_application_id` y `runtime_container` es obligatoria hasta que una decisión posterior autorice o descarte una transferencia.

---

#### 8. Propiedad actual del dato editorial

Mientras no exista una transferencia aprobada:

- VISO conserva el acceso administrativo actual al CMS;
- `public.website_items` y `public.website_blocks` continúan siendo las fuentes runtime observadas para contenido web;
- Vento-Group continúa leyendo contenido publicado como consumidor público;
- el esquema, RLS y clientes actuales permanecen sin cambios;
- AURA no crea tablas paralelas ni un ledger editorial competidor.

La relación queda:

```text
EDITOR_ACTUAL = VISO
PUBLIC_CONSUMER = Vento-Group
TARGET_FUNCTIONAL_OWNER = AURA
DATA_MASTER_DUPLICATION = PROHIBIDA
```

La ubicación actual de tablas bajo `public` no se interpreta como propiedad empresarial de VISO o AURA por sí sola.

---

#### 9. Autorización durante la custodia transitoria

Mientras las superficies sigan en VISO:

- se aplican las fronteras de autorización de VISO y los requisitos AURA ya existentes sobre lectura y mutación CMS;
- `viso.access` no sustituye una capacidad específica de contenido;
- `createAdminClient` no sustituye autorización de actor, acción, recurso, alcance y estado;
- el permiso específico de CMS existente no debe confundirse con una transferencia a AURA;
- `aura.access` no concede acceso al CMS alojado en VISO por inferencia;
- los grants AURA observados no cambian ownership ni habilitan las rutas CMS.

La corrección de permisos y controles de servidor pertenece a las tareas y packages de autorización correspondientes, no a esta auditoría.

---

#### 10. AURA como participante de procesos VISO

La relación AURA–VISO también opera en sentido inverso: AURA puede participar en procesos cuyo owner sigue siendo VISO.

El contrato de handoffs contiene tres relaciones VISO → AURA:

| Proceso VISO | Relación AURA | Clase | Modalidad |
| --- | --- | --- | --- |
| `VPROC-0006` — Orquestar vinculación, expediente, incorporación, preparación y habilitación inicial de la persona | participante | `CONDICIONAL` | `SOLICITUD_HANDOFF_Y_EVENTO` |
| `VPROC-0011` — Orquestar retiro laboral, devolución, revocación de accesos y cierre documental | participante | `DIRECTA` | `SOLICITUD_HANDOFF_Y_EVENTO` |
| `VPROC-0059` — Gestionar el ciclo de acceso tecnológico desde solicitud hasta revocación y verificación | participante | `DIRECTA` | `SOLICITUD_HANDOFF_Y_EVENTO` |

Para las tres relaciones:

```text
INTEGRATION_PROFILE = HANDOFF_PROJECTION
EXCHANGE_FAMILY = HANDOFF_REQUEST
```

AURA no puede duplicar:

- expediente laboral;
- estado de vinculación;
- plan de retiro;
- ledger de accesos;
- decisiones de seguridad;
- revocación propietaria de VISO.

Debe consumir únicamente proyecciones, solicitudes y eventos conforme al contrato aplicable.

---

#### 11. VISO no es consumidora declarada de los procesos AURA por alojar el CMS

El registro de handoffs no convierte actualmente a VISO en consumidora empresarial de `VPROC-0056` o `VPROC-0057` por el hecho de contener las rutas AS-IS.

La relación actual es de custodia técnica transitoria de superficies, no de consumo funcional registrado.

Por tanto:

```text
VISO_RUNTIME_HOST
!= VISO_DIRECT_CONSUMER_OF_VPROC-0056
!= VISO_DIRECT_CONSUMER_OF_VPROC-0057
```

Si una futura arquitectura necesitara que VISO permanezca como consumidora después de materializar AURA, esa relación deberá declararse explícitamente en el contrato propietario; no se hereda del estado AS-IS.

---

#### 12. Frontera con Vento-Group

Vento-Group continúa como consumidor público del contenido publicado.

La relación AURA–VISO no modifica:

- URLs públicas existentes;
- slugs;
- canonical URLs;
- contratos de bloques;
- lectura pública;
- redirects;
- fallback controlado;
- SEO;
- consumo de media.

Una futura transferencia VISO → AURA deberá preservar el contrato de consumo público o versionarlo mediante un cutover explícito.

Vento-Group no se convierte en AURA ni en VISO por consumir el contenido.

---

#### 13. Condiciones de no transferencia

Mientras `AURA-AUD-010` no adopte una decisión formal, se conserva:

```text
CMS_RUNTIME_OWNER = VISO
AURA_RUNTIME = BLOCKED
AURA_ROUTES = 0
AURA_SCREENS = 0
TRANSFER_AUTHORIZED = NO
```

Quedan prohibidos por inferencia:

- mover rutas a AURA;
- copiar `website_items` o `website_blocks`;
- crear un repositorio `vento-aura`;
- cambiar consumidores públicos;
- cambiar permisos por namespace;
- eliminar o redirigir rutas VISO;
- activar launchers AURA;
- habilitar escritura dual;
- mantener dos maestros editoriales activos.

---

#### 14. Escenario si AURA continúa

Si `AURA-AUD-010` decide continuidad de AURA, esta tarea fija únicamente la frontera de transición requerida:

1. AURA conserva ownership funcional de `VPROC-0056` y `VPROC-0057`.
2. Debe existir ADR aprobado antes de transferencia.
3. Debe definirse repositorio propietario y runtime AURA.
4. Debe definirse contrato de datos y consumidores.
5. Deben migrarse rutas y permisos sin duplicar maestros.
6. Debe preservarse compatibilidad con Vento-Group.
7. Debe existir cutover verificable.
8. Debe existir rollback verificable.
9. VISO conserva el runtime anterior hasta demostrar reconciliación completa.
10. El retiro o redirect de superficies VISO ocurre únicamente después de cerrar la transferencia.

No se selecciona desde `AURA-AUD-007` ninguna arquitectura física para ejecutar esos pasos.

---

#### 15. Escenario si AURA se reemplaza o retira

Si `AURA-AUD-010` decide reemplazo o retiro:

- esta tarea no selecciona la aplicación sustituta;
- VISO no adquiere automáticamente ownership definitivo de marketing;
- la custodia actual puede continuar únicamente según la decisión y ADR posteriores;
- los procesos `VPROC-0056` y `VPROC-0057` deberán reconciliar su propietaria si AURA deja de ser una aplicación objetivo válida;
- ninguna reasignación puede hacerse silenciosamente desde el runtime actual.

La resolución pertenece a `AURA-AUD-010` y `AURA-AUD-011`.

---

#### 16. Contrato de transferencia futura

Cualquier transferencia VISO → AURA debe satisfacer simultáneamente:

```text
DECISION_FORMAL_APROBADA
+
ADR_APROBADO
+
REPOSITORIO_Y_RUNTIME_OBJETIVO_CONFIRMADOS
+
CONTRATO_DE_DATOS_VERSIONADO
+
PERMISOS_Y_GUARDS_RECONCILIADOS
+
CONSUMIDORES_PUBLICOS_RECONCILIADOS
+
URLS_Y_MEDIA_PRESERVADAS
+
CUTOVER_VALIDADO
+
ROLLBACK_VALIDADO
+
CERO_DUAL_MASTER
```

La ausencia de cualquiera de esas condiciones mantiene:

```text
VISO_CMS = CURRENT_RUNTIME
AURA_TRANSFER = BLOCKED
```

---

#### 17. Hallazgos y propietarios

| Hallazgo | Bloquea `AURA-AUD-007` | Propietario | Condición de salida |
| --- | --- | --- | --- |
| AURA no tiene repositorio/runtime | no; la relación puede definirse documentalmente | `AURA-AUD-010..012` | decisión y desbloqueo formales |
| nueve superficies AURA objetivo viven en VISO | no; es el estado AS-IS explícito | `AURA-AUD-007` + futura migración | decisión de transferencia o permanencia |
| guard CMS actual es más amplio que el permiso específico disponible | no para esta definición; sí para implementación segura | autorización AURA/VISO y packages propietarios | guard específico y pruebas aplicables |
| `createAdminClient` eleva técnicamente el acceso | no para esta definición; sí para implementación segura | autorización/DB | checks de actor, capacidad, recurso, alcance y estado |
| Vento-Group depende del contrato editorial actual | no; obliga compatibilidad | `AURA-INT-001` y migración futura | contrato versionado y pruebas cross-repo |
| no existe relación declarada VISO-consumidora para `VPROC-0056/0057` | no; el runtime actual no la requiere como relación empresarial | contrato de handoff si una arquitectura futura la necesita | relación explícita aprobada o confirmación de que no aplica |

No se dejan hallazgos sin propietario ni se inventan tareas nuevas.

---

#### 18. Handoff hacia AURA-AUD-008

`AURA-AUD-008 — Definir relación con PASS` recibe una frontera ya estable:

- AURA conserva ownership funcional de contenido, promociones y oportunidades digitales mientras permanezca como aplicación objetivo;
- VISO conserva hoy la custodia runtime del CMS sin convertirse en propietaria de esos procesos;
- AURA consume tres procesos VISO mediante handoff declarado;
- Vento-Group continúa como consumidor público;
- la relación VISO–AURA no autoriza transferencia física;
- datos, permisos y rutas actuales permanecen en sus owners y runtimes vigentes;
- cualquier cambio de ownership necesita decisión formal, ADR, cutover y rollback.

La siguiente tarea deberá definir exclusivamente la relación AURA–PASS sin reabrir esta frontera.

---

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la propiedad actual de las rutas VISO, la protección del CMS, la separación de owners y consumidores, el contrato de datos y la transferencia futura VISO → AURA ya están cubiertos por obligaciones AURA existentes. Esta tarea fija la relación arquitectónica y no introduce una obligación verificable material nueva.

---

#### 20. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-AURA-004`, para existencia real y ausencia de producto AURA standalone;
- `TREQ-AURA-005`, para detectar drift de repositorio, rutas, pantallas, navegación y permisos;
- `TREQ-AURA-006`, para mantener AURA no disponible mientras el gate siga bloqueado;
- `TREQ-AURA-007`, para conservar las rutas administrativas actuales en VISO y las públicas en Vento-Group hasta transferencia aprobada;
- `TREQ-AURA-008`, para lectura específica del CMS;
- `TREQ-AURA-009`, para capacidades atómicas de mutación;
- `TREQ-AURA-010`, para la frontera de `createAdminClient` y service role;
- `TREQ-AURA-022`, para coherencia de eventos y rutas públicas;
- `TREQ-AURA-024`, para contrato esquema/RLS/clientes;
- `TREQ-AURA-027`, para transferencia futura VISO → AURA con cutover y rollback;
- `TREQ-VISO-001`, para preservar la frontera administrativa de VISO;
- `TREQ-INTEGRATION-019`, para contratos explícitos entre aplicaciones.

Esta sección registra trazabilidad existente y no modifica el Registro 04A.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La tarea aún debe incorporarse al checkout y ejecutar la batería documental canónica. |
| LOCAL | `PASS` | El artefacto fue normalizado en UTF-8/LF, contiene una sola tarea, metadata completa, continuidad exacta y cero whitespace al final de línea. |
| REMOTA | `PASS` | Se verificaron ownership funcional, handoffs, nueve superficies VISO físicamente existentes, inventario AURA, cobertura 04A y contratos canónicos aplicables. |
| OPERATIVA | `NOT_APPLICABLE` | No se ejecutan publicaciones, campañas, migraciones, sesiones, handoffs reales ni cambios de usuario. |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no se mueve CMS, código, dato, permiso, ruta, host ni despliegue. |

---

#### 22. Criterios de aceptación

- [x] Se define una relación AURA–VISO sin confundir runtime y ownership funcional.
- [x] Se preserva a `aura` como propietaria de `VPROC-0056` y `VPROC-0057`.
- [x] Se preserva VISO como runtime actual de las superficies editoriales observadas.
- [x] Se materializan las siete rutas `website-cms` actuales.
- [x] Se materializan las dos rutas `content-blocks` actuales.
- [x] Se conservan las nueve superficies como `DEFERRED_AURA_TARGET` según `AUTH-UI-013`.
- [x] Se evita declarar transferencia ejecutada.
- [x] Se evita dual master editorial.
- [x] Se preserva Vento-Group como consumidor público actual.
- [x] Se conservan `public.website_items` y `public.website_blocks` sin duplicación.
- [x] Se preserva la frontera de autorización VISO durante la custodia transitoria.
- [x] Se evita interpretar `aura.access` como acceso al CMS actual.
- [x] Se identifican exactamente tres handoffs VISO → AURA.
- [x] `VPROC-0006` queda como participación condicional de AURA.
- [x] `VPROC-0011` queda como participación directa de AURA.
- [x] `VPROC-0059` queda como participación directa de AURA.
- [x] Los tres handoffs conservan `SOLICITUD_HANDOFF_Y_EVENTO`.
- [x] Se evita declarar a VISO consumidora de `VPROC-0056/0057` por inferencia del runtime.
- [x] Se definen condiciones mínimas de una eventual transferencia.
- [x] Se preserva la decisión final para `AURA-AUD-010`.
- [x] Se preserva el ADR para `AURA-AUD-011`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecutan cambios físicos.

---

#### 23. Límites

Esta tarea no:

- crea repositorio AURA;
- implementa AURA;
- mueve rutas desde VISO;
- crea rutas AURA;
- modifica `website_items` o `website_blocks`;
- modifica Storage;
- modifica RLS;
- modifica permisos VISO o AURA;
- corrige grants;
- cambia el catálogo de aplicaciones;
- cambia `PROC-CAT-005`;
- agrega relaciones al registro de handoffs;
- crea doble escritura;
- crea un segundo CMS;
- modifica Vento-Group;
- decide continuidad, reemplazo o retiro;
- registra el ADR final;
- ejecuta cutover o rollback;
- desbloquea los minibloques posteriores de AURA;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-006 — Identificar datos y permisos utilizados`

**TAREA ACTUAL APROBADA**
`AURA-AUD-007 — Definir relación con VISO`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-008 — Definir relación con PASS`
### ✅ AURA-AUD-008 — Definir relación con PASS

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-007 — Definir relación con VISO
**Tarea siguiente:** AURA-AUD-009 — Definir relación con PULSO
**Tipo de tarea:** definición técnico-documental de la relación AURA–PASS; separa identidad de cliente, consentimiento, fidelización, beneficios, campañas, oportunidades, proyecciones, consumidores y referencias cruzadas sin transferir ownership ni materializar integraciones
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda fijada la frontera bidireccional AURA–PASS, incluyendo ownership, consumo canónico, proyección de sedes/restaurantes, campañas y beneficios, sin activar AURA ni alterar PASS
**Cambios físicos autorizados:** ninguno; esta tarea no modifica PASS, AURA, VISO, PULSO, Supabase, tablas, RLS, permisos, datos, rutas, contratos runtime, migraciones, despliegues ni repositorios
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la relación arquitectónica y empresarial entre AURA y PASS sin confundir campaña con fidelización, identidad de cliente con audiencia, beneficio con promoción ni proyección editorial con fuente maestra.

La regla raíz es:

```text
AURA
!= PASS

CAMPAÑA
!= BENEFICIO

AUDIENCIA
!= IDENTIDAD DE CLIENTE

CONSENTIMIENTO
!= SEGMENTO

PROYECCIÓN
!= FUENTE DE VERDAD
```

La relación debe permitir referencias y consumo entre ambos dominios sin crear maestros competidores.

---

#### 2. Reconciliación topológica

La tarea conserva:

```text
TASK = AURA-AUD-008
MODE = DEFINE_ONCE
PHYSICAL_INSTANCE = NONE
PREVIOUS = AURA-AUD-007
NEXT = AURA-AUD-009
```

Consecuencias:

- la tarea se agota en una definición canónica;
- no genera implementación física propia;
- no activa AURA;
- no modifica PASS;
- no crea integración runtime;
- no decide todavía continuidad, reemplazo o retiro de AURA;
- no sustituye `AURA-AUD-009`, que define la relación con PULSO;
- no sustituye `AURA-AUD-010`, que decide continuidad, reemplazo o retiro.

---

#### 3. Entradas aprobadas

La relación consume:

- `AURA-AUD-001` a `AURA-AUD-006`, con existencia, producto, usuarios, superficies, procesos, datos y permisos actuales;
- `AURA-AUD-007`, con la separación entre runtime VISO y ownership funcional AURA;
- `VPROC-0045`, propiedad de PASS;
- `VPROC-0056` y `VPROC-0057`, propiedad funcional de AURA y estado diferido;
- `PROC-CAT-005`, para ownership de procesos;
- el registro canónico de consumidoras, para relaciones directas entre procesos y aplicaciones;
- `PASS-INT-001..005`, para límites de fidelización e identidad de cliente;
- `INT-MKT-001..003`, para separar campaña, beneficio y efecto comercial;
- las superficies actuales de VISO que consumen datos del esquema `pass`;
- la cobertura de prueba AURA y PASS vigente.

---

#### 4. Contrato de relación AURA–PASS

Se define:

```text
AURA_PASS_RELATION_CONTRACT = AURA-PASS-RELATION-001
```

La relación tiene seis dimensiones obligatorias:

| Dimensión | Autoridad |
| --- | --- |
| campaña, contenido promocional y atribución | `AURA`, cuando su continuidad sea autorizada |
| identidad de cliente, preferencias y consentimiento | `PASS` |
| beneficio, recompensa, fidelización y ledger | `PASS` |
| oportunidad e interacción digital | `AURA`, mediante `VPROC-0057` |
| efecto comercial sobre pedido o venta | `PULSO` |
| correlación entre dominios | referencias e integraciones explícitas; nunca escritura cruzada implícita |

La regla permanente es:

```text
REFERENCIAR
!= ADQUIRIR OWNERSHIP

CONSUMIR
!= DUPLICAR MAESTRO

PUBLICAR
!= EJECUTAR EFECTO TRANSACCIONAL
```

---

#### 5. Ownership funcional de PASS

PASS conserva como proceso propietario:

| Proceso | Propietaria | Función |
| --- | --- | --- |
| `VPROC-0045` | `pass` | identificar cliente y administrar fidelización mediante ledgers y consentimientos separados |

PASS conserva autoridad sobre:

- persona y cuenta de cliente;
- contactos y verificaciones;
- preferencias y consentimientos;
- relación de marca;
- beneficios y recompensas;
- reglas y versiones de fidelización;
- puntos, movimientos y saldo proyectado;
- redenciones;
- historial de fidelización;
- proyección visible al cliente de beneficios autorizados.

AURA no adquiere ninguna de estas autoridades por relacionar una campaña con un beneficio o un cliente.

---

#### 6. Ownership funcional de AURA

AURA conserva como procesos propietarios objetivo:

| Proceso | Propietaria | Estado |
| --- | --- | --- |
| `VPROC-0056` | `aura` | `DEFINED_DEFERRED` |
| `VPROC-0057` | `aura` | `DEFINED_DEFERRED` |

`VPROC-0056` gobierna contenido y promociones desde solicitud y aprobación hasta publicación y retiro.

`VPROC-0057` gobierna consultas y oportunidades digitales hasta su resolución o handoff comercial.

PASS no adquiere propiedad de estos procesos por:

- mostrar un beneficio relacionado;
- aportar identidad o consentimiento;
- recibir una proyección de campaña;
- conservar una referencia de correlación;
- participar en una experiencia cliente.

---

#### 7. Matriz bidireccional de consumo canónico

La relación AURA–PASS se materializa documentalmente en tres procesos:

| Proceso | Owner | Relación de la otra aplicación | Modalidad dominante | Frontera |
| --- | --- | --- | --- | --- |
| `VPROC-0045` | `pass` | `aura` consumidora directa | `SOLICITUD_EFECTO_Y_EVENTO` | AURA puede consumir una proyección autorizada de fidelización; no mantiene identidad, consentimiento ni ledger |
| `VPROC-0056` | `aura` | `pass` consumidora directa | `PROYECCION_EVENTO_Y_ANALISIS` | PASS puede consumir correlación de campaña/contenido para beneficios y proyección cliente; no se convierte en sistema de campañas |
| `VPROC-0057` | `aura` | `pass` consumidora directa | `PROYECCION_EVENTO_Y_ANALISIS` | PASS puede aportar o consumir identidad, consentimiento y contexto de cliente dentro de una relación autorizada; no gobierna la oportunidad comercial |

Resultado:

```text
RELACIONES_CANONICAS_AURA_PASS = 3
OWNERSHIP_COMPARTIDO = 0
MAESTROS_DUPLICADOS_PERMITIDOS = 0
```

Estas relaciones describen contrato funcional. No acreditan una integración AURA runtime ya desplegada.

---

#### 8. Relación física actual de sedes y restaurantes

La superficie VISO `/website-cms/venues` consume actualmente:

```text
pass.pass_satellites
public.sites
public.website_items
```

El flujo observado es:

```text
PASS SATELLITE ACTIVO
-> VISO LEE IDENTIDAD Y DATOS DE SEDE
-> NORMALIZA NOMBRE A SLUG
-> CREA website_items(category = restaurant)
-> VISO COMPLETA CURADURIA EDITORIAL
-> Vento-Group CONSUME PUBLICACION
```

PASS conserva la autoridad sobre la identidad operacional del satélite y su vínculo con la sede.

La proyección editorial no puede modificar por inferencia:

- `pass_satellites.id`;
- código del satélite;
- `site_id`;
- estado operacional;
- identidad de sede;
- datos de fidelización;
- identidad de cliente.

---

#### 9. Hallazgo de identidad de importación

El importador actual usa el nombre del satélite para derivar un slug y compara ese slug contra `website_items` existentes.

La inserción observada crea una proyección editorial con campos de restaurante, pero no conserva en esa fila una referencia explícita al `pass_satellites.id` origen.

Por tanto:

```text
SLUG_NORMALIZADO
!= IDENTIDAD ESTABLE PASS
```

La baseline actual puede seguir describiéndose como implementación existente, pero una reconciliación futura debe conservar una identidad de origen estable y separar:

```text
DATOS IMPORTADOS DESDE PASS
!= DATOS EDITORIALES CURADOS
```

Esta tarea no implementa la corrección.

---

#### 10. Colecciones comerciales y etiqueta `campaign`

La superficie VISO `commercial-collections` administra datos del esquema PASS, incluyendo:

```text
pass.commercial_collections
pass.catalog_item_collections
pass.pass_satellites
```

`pass.commercial_collections.kind` admite el valor:

```text
campaign
```

pero se preserva obligatoriamente:

```text
COMMERCIAL_COLLECTION(kind = campaign)
!= AURA_CAMPAIGN
```

Una colección PASS puede agrupar y presentar oferta o beneficios para consumo cliente sin convertirse en:

- brief de marketing;
- campaña AURA;
- audiencia;
- calendario multicanal;
- presupuesto;
- pieza aprobada;
- atribución;
- medición de campaña;
- cierre de campaña.

La palabra `campaign` en una clasificación comercial no transfiere ownership a AURA ni convierte PASS en sistema de campañas.

---

#### 11. Campaña AURA y beneficio PASS

Un beneficio PASS puede existir sin campaña.

Se permiten conceptualmente dos casos:

```text
BENEFICIO PASS
-> SIN CAMPAÑA AURA
```

```text
CAMPAÑA AURA
-> REFERENCIA AUTORIZADA A BENEFICIO PASS
```

No se admite:

```text
CAMPAÑA AURA
-> ESCRITURA DIRECTA DEL BENEFICIO PASS
```

ni:

```text
BENEFICIO PASS
-> CREACION AUTOMATICA DE CAMPAÑA AURA
```

La correlación no cambia la propietaria de ninguno de los dos objetos.

---

#### 12. Identidad, consentimiento y audiencia

PASS es la autoridad sobre identidad de cliente y consentimiento aplicable.

AURA puede necesitar segmentación, comunicación o atribución, pero no puede convertir esa necesidad en una copia completa del cliente PASS.

Se conserva:

```text
CUENTA PASS
!= AUDIENCIA AURA

CLIENTE PASS
!= LEAD AURA

CONSENTIMIENTO REGISTRADO
!= AUTORIZACION UNIVERSAL DE MARKETING

REDENCION
!= OPT-IN
```

Cuando AURA pueda operar, solo podrá consumir la proyección mínima autorizada para la finalidad, canal, vigencia y alcance correspondientes.

PASS no fabrica consentimiento para satisfacer una campaña y AURA no interpreta una compra, visita, acumulación o redención como consentimiento implícito.

---

#### 13. Oportunidades digitales y PASS

`VPROC-0057` pertenece a AURA y conserva la oportunidad, interacción, etapa, seguimiento y atribución comercial.

PASS puede participar cuando exista una identidad de cliente o consentimiento aplicable, pero:

```text
IDENTIDAD PASS
!= OPORTUNIDAD AURA
```

AURA no debe crear una segunda persona o cuenta de cliente para gestionar una oportunidad.

PASS no debe transformar toda interacción digital en cliente, oportunidad calificada o relación de fidelización.

Cuando una oportunidad se vincule con una persona PASS, la relación debe conservar identificadores y finalidades separadas.

---

#### 14. PASS no depende de AURA diferida

Mientras AURA continúe sin producto funcional:

- PASS conserva sus beneficios y fidelización;
- PASS puede publicar proyecciones de beneficios bajo sus contratos vigentes;
- PASS conserva identidad y consentimiento;
- PASS no necesita materializar AURA para operar sus procesos propios;
- `commercial_collections` no se reclasifica como campaña AURA;
- las relaciones documentales con `VPROC-0056` y `VPROC-0057` permanecen diferidas en cuanto a productor AURA;
- ninguna ausencia de AURA autoriza a PASS a absorber campañas, oportunidades o atribución.

---

#### 15. Escritura cruzada prohibida

La relación se basa en referencias, eventos, proyecciones y comandos propietarios.

Queda prohibido como regla de arquitectura:

```text
AURA -> INSERT/UPDATE DIRECTO SOBRE LEDGER PASS
AURA -> CAMBIO DIRECTO DE CONSENTIMIENTO PASS
AURA -> CAMBIO DIRECTO DE BENEFICIO PASS
PASS -> CAMBIO DIRECTO DE CAMPAÑA AURA
PASS -> CAMBIO DIRECTO DE OPORTUNIDAD AURA
```

La materialización futura deberá usar contratos propietarios, autorización exacta, idempotencia, evidencia y reconciliación.

---

#### 16. Relación con PULSO reservada

La relación AURA–PASS no decide el efecto de una promoción o beneficio sobre una venta.

Se conserva:

```text
AURA
-> INTENCION Y CORRELACION DE MARKETING

PASS
-> IDENTIDAD + CONSENTIMIENTO + FIDELIZACION

PULSO
-> VALIDACION Y EFECTO COMERCIAL
```

Las decisiones sobre:

- pedido;
- venta;
- precio;
- descuento;
- cupón aplicado;
- acumulación durante venta;
- redención en caja;
- efecto transaccional;

pertenecen a `AURA-AUD-009` y a los contratos propietarios de PULSO/PASS.

---

#### 17. Hallazgos diferidos con propietario

| Hallazgo | Estado | Propietario | Condición de salida |
| --- | --- | --- | --- |
| importación de restaurantes basada en slug sin vínculo estable al satélite origen | no bloquea esta definición; sí bloquea una migración robusta | `AURA-INT-001` / contrato de integración aplicable | existir identidad de origen estable, idempotencia y reconciliación sin sobrescribir curaduría |
| `commercial_collections.kind = campaign` puede confundirse con campaña AURA | no bloquea PASS actual; bloquea equivalencia semántica | `AURA-AUD-010` y roadmap AURA posterior | decisión formal y contrato que mantenga colección PASS separada de campaña AURA |
| integración runtime AURA↔PASS no demostrada | no bloquea auditoría; bloquea declarar integración operativa | `AURA-INT-002` | productor AURA autorizado, contrato implementado y evidencia de integración |
| audiencias AURA no materializadas | no bloquea PASS; bloquea automatización de marketing basada en clientes | roadmap AURA posterior | contrato de finalidad, consentimiento y proyección mínima implementado |

Ningún hallazgo autoriza crear una tarea administrativa nueva.

---

#### 18. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

La cobertura vigente ya protege la separación de ownership, la importación desde PASS, identidad y consentimiento, fidelización, beneficios, campañas, integraciones y ausencia de producto AURA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

---

#### 19. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otros:

- `TREQ-AURA-003`, para fronteras AURA con PASS, PULSO y NUMERA;
- `TREQ-AURA-007`, para ownership actual y prohibición de transferencias implícitas;
- `TREQ-AURA-016`, para importación idempotente de restaurantes desde PASS y vínculo estable con origen;
- `TREQ-AURA-019`, para separar ciclo editorial de publicación simple;
- `TREQ-AURA-027`, para impedir transferencias sin decisión, ADR, cutover y rollback;
- `TREQ-PASS-008`, para ledger y redención bajo contratos propietarios;
- `TREQ-PASS-010`, para identidad, preferencias, consentimientos y fidelización;
- `TREQ-INTEGRATION-019`, para integraciones de marketing, idempotencia, conciliación y fuentes de verdad.

Esta sección documenta trazabilidad y no actualiza el Registro 04A.

---

#### 20. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La tarea se prepara antes de su incorporación al checkout; la batería documental real se ejecutará al abrir e incorporar `AURA-AUD-008`. |
| LOCAL | `PASS` | El artefacto contiene una sola tarea, metadata completa, continuidad `007 -> 008 -> 009`, sección de cero requisitos sin identificadores de prueba y cero whitespace al final de línea. |
| REMOTA | `PASS` | Se verificaron ownership y consumidores de `VPROC-0045`, `VPROC-0056` y `VPROC-0057`, contratos PASS de fidelización, `INT-MKT-001..003`, el importador VISO de `pass_satellites` y las superficies `commercial_collections` del esquema PASS. |
| OPERATIVA | `NOT_APPLICABLE` | No se ejecutan campañas, fidelización, redenciones, segmentaciones ni comunicaciones; se define únicamente la frontera canónica entre dominios. |
| FÍSICA | `NOT_APPLICABLE` | La tarea es `DEFINE_ONCE` sin instancia física propia; no modifica datos, permisos, rutas, aplicaciones ni integraciones runtime. |

---

#### 21. Criterios de aceptación

- [x] PASS conserva ownership exclusivo de `VPROC-0045`.
- [x] AURA conserva ownership objetivo exclusivo de `VPROC-0056` y `VPROC-0057`.
- [x] Se documentan exactamente tres relaciones canónicas directas AURA–PASS a nivel de proceso.
- [x] Se mantienen cero procesos con ownership compartido.
- [x] Se separan campaña y beneficio.
- [x] Se separan identidad de cliente y audiencia.
- [x] Se separan consentimiento y segmentación.
- [x] Se separan beneficio visible, elegibilidad, redención y efecto comercial.
- [x] Se documenta la importación actual `pass_satellites -> website_items` sin transferir ownership.
- [x] Se identifica que el slug actual no sustituye una identidad PASS estable.
- [x] Se separa `commercial_collections.kind = campaign` de una campaña AURA.
- [x] Se impide que AURA escriba directamente beneficios, consentimientos o ledger PASS.
- [x] Se impide que PASS escriba directamente campañas u oportunidades AURA.
- [x] Se conserva PASS operativo independientemente de que AURA siga diferida.
- [x] Se reserva el efecto comercial exacto a `AURA-AUD-009` y a PULSO.
- [x] Cada hallazgo diferido tiene propietario y condición de salida.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecutan cambios físicos.

---

#### 22. Límites

Esta tarea no:

- activa AURA;
- modifica PASS;
- modifica VISO o PULSO;
- crea campañas;
- crea beneficios;
- crea audiencias;
- crea oportunidades;
- crea clientes;
- modifica consentimiento;
- modifica puntos, ledger o redenciones;
- crea tablas, columnas, RPC, funciones, triggers, jobs o colas;
- cambia RLS;
- crea permisos;
- modifica grants;
- migra `commercial_collections`;
- corrige físicamente el importador de restaurantes;
- implementa `AURA-INT-002`;
- decide el efecto comercial de PULSO;
- decide continuidad, reemplazo o retiro de AURA;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A.

---

#### 23. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-007 — Definir relación con VISO`

**TAREA ACTUAL APROBADA**
`AURA-AUD-008 — Definir relación con PASS`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-009 — Definir relación con PULSO`
### ✅ AURA-AUD-009 — Definir relación con PULSO

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-008 — Definir relación con PASS
**Tarea siguiente:** AURA-AUD-010 — Decidir continuidad, reemplazo o retiro
**Tipo de tarea:** definición técnico-documental de la relación AURA–PULSO; separa intención de marketing, publicación, oportunidad, oferta, pedido, venta, efecto comercial, validación transaccional, reclamo, reserva, entrega y experiencia del cliente sin transferir ownership ni materializar una integración runtime
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda fijada la frontera bidireccional AURA–PULSO, incluyendo ownership, consumo de procesos, validación comercial, handoff de oportunidades y proyecciones de resultado, sin activar AURA ni alterar PULSO
**Cambios físicos autorizados:** ninguno; esta tarea no modifica AURA, PULSO, PASS, VISO, NUMERA, NEXO, FOGO, Supabase, datos, RLS, permisos, rutas, campañas, pedidos, precios, ventas, integraciones, despliegues ni repositorios
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir la relación arquitectónica y empresarial entre AURA y PULSO sin confundir intención de marketing con autoridad comercial, oportunidad con pedido, campaña con descuento, publicación con oferta transaccional ni atribución con resultado de venta.

La regla raíz es:

```text
AURA
!= PULSO

CAMPAÑA
!= REGLA TRANSACCIONAL

OPORTUNIDAD
!= COTIZACIÓN
!= PEDIDO
!= VENTA

CORRELACIÓN DE CAMPAÑA
!= AUTORIDAD PARA CAMBIAR PRECIO

SEÑAL DE VENTA
!= ATRIBUCIÓN DEMOSTRADA
```

La relación debe permitir solicitudes, referencias, eventos, proyecciones y análisis entre ambos dominios sin crear maestros competidores ni escritura cruzada implícita.

---

#### 2. Reconciliación topológica

La tarea conserva:

```text
TASK = AURA-AUD-009
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-008
NEXT = AURA-AUD-010
```

Consecuencias:

- la tarea se agota en una definición canónica;
- no genera instancia física propia;
- no activa AURA;
- no modifica PULSO;
- no crea campañas, precios, descuentos, pedidos ni ventas;
- no materializa integración runtime AURA–PULSO;
- no decide continuidad, reemplazo o retiro de AURA;
- entrega a `AURA-AUD-010` la última frontera de aplicación necesaria para adoptar esa decisión.

---

#### 3. Entradas aprobadas

La relación consume:

- `AURA-AUD-001` a `AURA-AUD-006`, con existencia, producto, usuarios, superficies, procesos, datos y permisos actuales;
- `AURA-AUD-007`, con la relación AURA–VISO;
- `AURA-AUD-008`, con la relación AURA–PASS;
- `VPROC-0056` y `VPROC-0057`, propiedad funcional objetivo de AURA;
- `VPROC-0017`, `VPROC-0038` a `VPROC-0044`, `VPROC-0046`, `VPROC-0047`, `VPROC-0050` y `VPROC-0068`, dentro del dominio comercial gobernado por PULSO según `PROC-CAT-005`;
- el registro canónico de eventos y consumidoras entre aplicaciones;
- `INT-MKT-003`, que define la validación comercial desde PULSO;
- `OPS-B2B-001`, que fija la frontera AURA → PULSO para oportunidades B2B;
- `PASS-INT-001..005`, cuando el efecto comercial consume identidad o fidelización;
- la cobertura vigente AURA, PULSO e integración.

Ninguna entrada autoriza implementación física desde esta tarea.

---

#### 4. Contrato de relación AURA–PULSO

Se define:

```text
AURA_PULSO_RELATION_CONTRACT = AURA-PULSO-RELATION-001
```

La frontera permanente queda:

```text
AURA
-> intención de marketing
-> campaña y contenido
-> oportunidad digital
-> correlación y atribución

PULSO
-> oferta comercial aplicable
-> pedido y venta
-> cotización y compromiso B2B
-> validación del efecto comercial
-> precio y snapshot de venta
-> pago, caja y resultado transaccional
```

Y se preserva:

```text
REFERENCIAR
!= EJECUTAR

CONSUMIR EVENTO
!= ADQUIRIR OWNERSHIP

SOLICITAR EFECTO
!= ESCRIBIR EL MAESTRO AJENO
```

---

#### 5. Ownership funcional de PULSO

PULSO conserva ownership de los procesos comerciales aprobados por `PROC-CAT-005`, incluyendo:

| Proceso | Propósito relevante para esta relación |
| --- | --- |
| `VPROC-0017` | asegurar que la oferta publicada corresponda con definiciones vigentes y disponibilidad comprometible |
| `VPROC-0038` | servicio y venta en mesa |
| `VPROC-0039` | venta de mostrador o para llevar |
| `VPROC-0040` | incorporar pedidos de terceros sin duplicación ni pérdida de estados |
| `VPROC-0041` | cumplir catering o venta B2B con viabilidad y condiciones comerciales |
| `VPROC-0042` | modificar, sustituir, cancelar, anular o devolver compromisos comerciales de forma controlada |
| `VPROC-0043` | confirmar y respaldar pagos comerciales |
| `VPROC-0044` | conciliar jornada y caja |
| `VPROC-0046` | reclamos, devoluciones y compensaciones |
| `VPROC-0047` | reservas y eventos con capacidad y comunicación controladas |
| `VPROC-0050` | conciliación de entrega realizada por terceros |
| `VPROC-0068` | experiencia del cliente mediante mediciones interpretables |

AURA no adquiere ninguno de esos procesos por consumir sus resultados o aportar una referencia de campaña u oportunidad.

---

#### 6. Ownership funcional de AURA

AURA conserva como procesos propietarios objetivo:

| Proceso | Estado | Propósito |
| --- | --- | --- |
| `VPROC-0056` | `DEFINED_DEFERRED` | contenido y promociones desde solicitud y aprobación hasta publicación y retiro |
| `VPROC-0057` | `DEFINED_DEFERRED` | interacciones digitales con intención comercial hasta oportunidad, atención, descarte o conversión |

PULSO no adquiere propiedad sobre:

- campaña;
- brief;
- audiencia;
- pieza;
- calendario;
- publicación;
- oportunidad;
- etapa de marketing;
- atribución;
- aprendizaje de campaña.

El hecho de validar una venta o aplicar un efecto comercial no transforma PULSO en sistema de campañas.

---

#### 7. Matriz bidireccional canónica

El registro de eventos entre aplicaciones materializa nueve relaciones AURA–PULSO relevantes.

##### 7.1. Procesos AURA consumidos por PULSO

| Proceso | Owner | PULSO | Modalidad | Perfil | Estado |
| --- | --- | --- | --- | --- | --- |
| `VPROC-0056` | `aura` | consumidora directa | `PROYECCION_EVENTO_Y_ANALISIS` | `MARKETING_ANALYTICS_PROJECTION` | `DEFINED_DEFERRED_PRODUCER` |
| `VPROC-0057` | `aura` | consumidora directa | `PROYECCION_EVENTO_Y_ANALISIS` | `MARKETING_ANALYTICS_PROJECTION` | `DEFINED_DEFERRED_PRODUCER` |

##### 7.2. Procesos PULSO consumidos por AURA

| Proceso | Owner | AURA | Modalidad | Perfil | Estado |
| --- | --- | --- | --- | --- | --- |
| `VPROC-0017` | `pulso` | consumidora directa | `REFERENCIA_Y_EVENTO` | `VERSIONED_REFERENCE_PROJECTION` | `DEFINED` |
| `VPROC-0040` | `pulso` | consumidora condicional | `SOLICITUD_EFECTO_Y_EVENTO` | `EFFECT_CONFIRMATION_PROJECTION` | `DEFINED_WITH_CONDITIONS` |
| `VPROC-0041` | `pulso` | consumidora directa | `SOLICITUD_EFECTO_Y_EVENTO` | `EFFECT_CONFIRMATION_PROJECTION` | `DEFINED` |
| `VPROC-0046` | `pulso` | consumidora directa | `SOLICITUD_EFECTO_Y_EVENTO` | `EFFECT_CONFIRMATION_PROJECTION` | `DEFINED` |
| `VPROC-0047` | `pulso` | consumidora directa | `SOLICITUD_EFECTO_Y_EVENTO` | `EFFECT_CONFIRMATION_PROJECTION` | `DEFINED_WITH_CONDITIONS` |
| `VPROC-0050` | `pulso` | consumidora condicional | `SOLICITUD_EFECTO_Y_EVENTO` | `EFFECT_CONFIRMATION_PROJECTION` | `DEFINED_WITH_CONDITIONS` |
| `VPROC-0068` | `pulso` | consumidora directa | `PROYECCION_EVENTO_Y_ANALISIS` | `MARKETING_ANALYTICS_PROJECTION` | `DEFINED` |

Balance:

```text
RELACIONES_CANONICAS_AURA_PULSO = 9
AURA_OWNER_PULSO_CONSUMER = 2
PULSO_OWNER_AURA_CONSUMER = 7
RELACIONES_DIRECTAS = 7
RELACIONES_CONDICIONALES = 2
OWNERSHIP_COMPARTIDO = 0
```

---

#### 8. Validación comercial desde PULSO

`INT-MKT-003` fija la regla central:

```text
CAMPAÑA O INTENCIÓN AURA
!= REGLA TRANSACCIONAL
!= DESCUENTO O BENEFICIO APLICADO EN PULSO
```

PULSO es la autoridad para validar si una promoción, cupón, beneficio, recompensa o redención puede producir un efecto sobre un pedido o una venta concretos.

La validación comercial debe considerar, según corresponda:

- pedido, venta y líneas afectadas;
- regla y versión;
- sede;
- canal;
- modalidad;
- actor efectivo;
- permiso;
- producto u oferta;
- vigencia;
- compatibilidad con otros efectos;
- identidad o beneficio PASS cuando aplique;
- guardas económicas o físicas cuando sean obligatorias;
- estado transaccional actual;
- idempotencia y resultado previo.

AURA no puede saltarse esa validación mediante una campaña activa, un código, un CTA o una referencia de marketing.

---

#### 9. Campaña y efecto comercial

Se permiten conceptualmente:

```text
VENTA PULSO
-> SIN CAMPAÑA AURA
```

```text
CAMPAÑA AURA
-> REFERENCIA A REGLA COMERCIAL AUTORIZADA
-> PULSO VALIDA
-> PULSO APLICA O RECHAZA EFECTO
```

No se admite:

```text
CAMPAÑA AURA
-> UPDATE DIRECTO DE PRECIO
```

ni:

```text
CAMPAÑA AURA
-> DESCUENTO APLICADO SIN VALIDACIÓN PULSO
```

ni:

```text
PULSO
-> CREACIÓN AUTOMÁTICA DE CAMPAÑA AURA
```

La campaña conserva intención y correlación. PULSO conserva el resultado comercial realmente aplicado.

---

#### 10. Precio, snapshot y venta histórica

PULSO conserva la verdad operativa del pedido y la venta.

Cuando exista un efecto relacionado con marketing, el snapshot comercial debe poder reconstruir el efecto aplicado sin depender de que la campaña o regla cambien posteriormente.

Se conserva:

```text
PRECIO BASE
-> OFERTA VIGENTE
-> REGLA AUTORIZADA
-> VALIDACIÓN
-> EFECTO APLICADO
-> SNAPSHOT DE VENTA
```

Cambiar después:

- campaña;
- pieza;
- regla;
- beneficio;
- presupuesto;
- audiencia;

no reescribe una venta histórica.

---

#### 11. Oportunidad digital y handoff comercial

`VPROC-0057` conserva en AURA:

- interacción digital;
- origen;
- oportunidad;
- etapa;
- seguimiento;
- atribución de marketing.

Cuando una oportunidad requiera cotización, catering o venta B2B, la frontera aprobada es:

```text
AURA
-> CALIFICA OPORTUNIDAD
-> ENTREGA CONTEXTO NECESARIO

PULSO
-> CREA Y GOBIERNA CASO COMERCIAL
-> COTIZACIÓN
-> CONDICIONES
-> PEDIDO
-> COMPROMISO OPERATIVO
-> CAMBIOS Y CIERRE COMERCIAL
```

Esta frontera está materializada en la relación directa de AURA como consumidora de `VPROC-0041` y en `OPS-B2B-001`.

Por tanto:

```text
OPORTUNIDAD AURA
!= COTIZACIÓN PULSO
!= PEDIDO PULSO
```

---

#### 12. Oferta publicada

`VPROC-0017` pertenece a PULSO y AURA figura como consumidora directa mediante `REFERENCIA_Y_EVENTO / VERSIONED_REFERENCE_PROJECTION`.

AURA puede utilizar una referencia vigente de oferta para:

- evitar publicar promociones de productos u ofertas no comprometibles;
- asociar contenido con una oferta autorizada;
- retirar o ajustar comunicación cuando la referencia deje de ser válida.

AURA no puede editar por esa vía:

- precio;
- producto;
- disponibilidad;
- vigencia comercial;
- condiciones de venta.

La proyección versionada no transfiere ownership.

---

#### 13. Pedidos de terceros

`VPROC-0040` pertenece a PULSO y AURA es consumidora condicional.

La relación solo aplica cuando un pedido externo tenga una necesidad legítima de correlación con marketing, canal o atribución.

No se concluye que:

```text
TODO PEDIDO EXTERNO
-> EVENTO DE MARKETING AURA
```

AURA no administra:

- ingestión transaccional;
- deduplicación del pedido;
- estado comercial;
- cobro;
- conciliación del canal externo.

La participación AURA permanece condicional y de mínimo contexto.

---

#### 14. Reclamos, devoluciones y compensaciones

`VPROC-0046` pertenece a PULSO y AURA es consumidora directa de la proyección aplicable.

AURA puede consumir señales para:

- aprendizaje de comunicación;
- reputación;
- análisis de campañas;
- detección de mensajes o expectativas problemáticas.

Pero:

```text
RESPUESTA DE MARKETING
!= CIERRE DE RECLAMO
```

AURA no puede:

- aprobar devolución;
- anular venta;
- ordenar reembolso;
- registrar compensación transaccional;
- cerrar el caso PULSO.

El resultado comercial sigue perteneciendo a PULSO y las autoridades económicas permanecen separadas.

---

#### 15. Reservas y eventos

`VPROC-0047` pertenece a PULSO y AURA es consumidora directa; FOGO y NEXO permanecen consumidoras condicionales cuando capacidad o ejecución lo exijan.

AURA puede contribuir o consumir:

- origen de campaña;
- comunicación;
- mensaje;
- seguimiento permitido;
- correlación de oportunidad.

PULSO conserva:

- solicitud comercial;
- compromiso;
- condiciones;
- reserva comercial;
- cambios;
- cancelación;
- cierre frente al cliente.

Una pieza promocional no demuestra capacidad disponible ni reserva capacidad.

---

#### 16. Entrega de terceros

`VPROC-0050` pertenece a PULSO y AURA es consumidora condicional.

La participación de AURA se limita a casos donde el resultado de entrega sea material para:

- comunicación;
- experiencia;
- atribución;
- análisis de una campaña u oportunidad.

AURA no gobierna:

- proveedor de entrega;
- seguimiento operativo;
- prueba de entrega;
- cobro;
- comisión;
- conciliación;
- novedad logística.

Una entrega fallida no se convierte automáticamente en fallo de campaña.

---

#### 17. Experiencia del cliente

`VPROC-0068` pertenece a PULSO y AURA es consumidora directa mediante `PROYECCION_EVENTO_Y_ANALISIS / MARKETING_ANALYTICS_PROJECTION`.

Se conserva:

```text
MEDICIÓN DE EXPERIENCIA
!= INCENTIVO
!= RECLAMO
!= COMPENSACIÓN
!= ÉXITO DE CAMPAÑA
```

AURA puede consumir una proyección para análisis y aprendizaje de marketing.

No puede alterar:

- la medición original;
- el resultado del pedido;
- el reclamo;
- la compensación;
- la venta histórica.

---

#### 18. Ventas ordinarias no crean consumo AURA implícito

El registro actual no declara a AURA consumidora directa de `VPROC-0038` ni `VPROC-0039` únicamente por tratarse de ventas.

También mantiene fronteras específicas sobre otros procesos comerciales.

Por tanto:

```text
VENTA OCURRIDA
!= DATOS COMPLETOS DISPONIBLES A AURA
```

Una futura atribución de marketing deberá consumir únicamente proyecciones explícitamente autorizadas y necesarias.

No se autoriza lectura transversal de las tablas de PULSO para construir analítica AURA por conveniencia.

---

#### 19. Atribución y causalidad

AURA puede necesitar correlacionar campañas con resultados comerciales, pero se conserva:

```text
CORRELACIÓN
!= CAUSALIDAD
```

Una referencia de campaña presente en una venta permite rastrear origen o asociación; no demuestra por sí sola:

- venta incremental;
- margen incremental;
- causalidad;
- retorno de inversión;
- efectividad de la campaña.

La atribución deberá conservar método, fuentes, frescura, restricciones y confianza, y consumir la autoridad económica cuando corresponda.

---

#### 20. PASS y NUMERA permanecen separados

La relación AURA–PULSO no absorbe las fronteras definidas en `AURA-AUD-008`.

Se conserva:

```text
PASS
-> identidad
-> consentimiento
-> fidelización
-> beneficio
-> ledger
-> redención

PULSO
-> pedido
-> venta
-> validación comercial
-> efecto aplicado

AURA
-> campaña
-> oportunidad
-> correlación

NUMERA
-> costo
-> margen
-> presupuesto
-> resultado económico
```

PULSO no puede asumir autoridad PASS o NUMERA para satisfacer una campaña AURA.

---

#### 21. Escritura cruzada prohibida

La integración futura deberá preservar comandos propietarios, eventos, proyecciones, idempotencia y reconciliación.

Queda prohibido como regla de arquitectura:

```text
AURA -> UPDATE DIRECTO DE PEDIDO PULSO
AURA -> UPDATE DIRECTO DE PRECIO PULSO
AURA -> UPDATE DIRECTO DE VENTA PULSO
AURA -> INSERT DIRECTO DE PAGO O CAJA
PULSO -> UPDATE DIRECTO DE CAMPAÑA AURA
PULSO -> UPDATE DIRECTO DE OPORTUNIDAD AURA
PULSO -> MARCAR PUBLICACIÓN AURA COMO COMPLETADA
```

La lectura analítica tampoco autoriza escritura.

---

#### 22. Estado runtime actual

El repositorio actual `vento-pulso` conserva AURA únicamente como identidad diferida en el AppSwitcher:

```text
id = aura
href = vacío
status = soon
```

La inspección del runtime actual sí identifica superficies de fidelización/redención integradas con PASS, pero no demuestra una implementación de campaña AURA dentro de PULSO.

En la búsqueda del código vigente no se observó una superficie AURA operativa ni una implementación de campaña, promoción o cupón gobernada por AURA.

Por tanto:

```text
RELACION_CANONICA_AURA_PULSO = DEFINIDA
INTEGRACION_RUNTIME_AURA_PULSO = NO_DEMOSTRADA
AURA_EN_PULSO = DIFERIDA
```

Esta tarea no transforma el contrato documental en integración desplegada.

---

#### 23. AURA diferida no bloquea PULSO

Mientras AURA permanezca diferida:

- PULSO conserva su operación comercial;
- PASS y PULSO pueden ejecutar sus contratos vigentes de fidelización;
- una venta válida no requiere campaña AURA;
- una promoción comercial existente no se reclasifica como campaña AURA;
- PULSO no crea campañas ficticias para justificar descuentos;
- PULSO no amplía su dominio para sustituir oportunidades o atribución AURA;
- las relaciones con `VPROC-0056` y `VPROC-0057` permanecen diferidas respecto del productor AURA.

---

#### 24. Hallazgos diferidos con propietario

| Hallazgo | Estado | Propietario | Condición de salida |
| --- | --- | --- | --- |
| productor runtime de `VPROC-0056/0057` no existe | no bloquea PULSO actual; bloquea declarar integración AURA operativa | `AURA-AUD-010..012` y roadmap AURA posterior | decisión de continuidad, ADR y desbloqueo formal |
| PULSO consume AURA documentalmente pero no existe campaña runtime observada | no bloquea esta definición | `AURA-INT-002` | contrato implementado y evidencia de integración |
| handoff oportunidad AURA → PULSO requiere identidad y correlación estable | no bloquea el proceso PULSO actual; bloquea automatizar B2B desde AURA | `AURA-INT-002` / `OPS-B2B-001` | identificadores, idempotencia, estados y reconciliación implementados |
| atribución de campaña a venta no está materializada | no bloquea venta; bloquea métricas de impacto AURA | roadmap AURA + NUMERA | correlación autorizada, método de atribución y evidencia económica |
| AURA es consumidora condicional de pedidos externos y entregas de terceros | no bloquea esos procesos | contratos de integración aplicables | condiciones explícitas de consumo y proyección mínima implementadas |

No se inventan tareas nuevas para estos hallazgos.

---

#### 25. Handoff hacia AURA-AUD-010

`AURA-AUD-010 — Decidir continuidad, reemplazo o retiro` recibe las tres relaciones de aplicación ya definidas:

```text
AURA <-> VISO
AURA <-> PASS
AURA <-> PULSO
```

Y recibe de esta tarea:

1. AURA conserva ownership objetivo de `VPROC-0056` y `VPROC-0057`.
2. PULSO es consumidora directa de ambos procesos AURA diferidos.
3. AURA consume siete procesos propietarios de PULSO: cinco de forma directa y dos condicional.
4. Existen nueve relaciones canónicas AURA–PULSO en total.
5. PULSO conserva oferta, pedido, venta, cotización, efecto comercial y resultado transaccional.
6. AURA conserva campaña, oportunidad y atribución.
7. PULSO valida el efecto comercial; una campaña AURA no constituye autoridad de descuento.
8. La oportunidad B2B se transfiere desde AURA hacia un caso comercial gobernado por PULSO.
9. La integración runtime AURA–PULSO no está demostrada actualmente.
10. La ausencia de AURA no bloquea las operaciones PULSO vigentes.

`AURA-AUD-010` deberá usar estas fronteras para decidir continuidad sin reabrir ownership por conveniencia.

---

#### 26. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

La cobertura vigente ya protege ownership, pedidos, ventas, descuentos, fidelización, campañas, integraciones, idempotencia, autorización, correlación y ausencia de producto AURA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

---

#### 27. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación, entre otros:

- `TREQ-AURA-003`, para la frontera entre intención promocional, PASS, PULSO y NUMERA;
- `TREQ-AURA-005`, para detectar drift sobre aplicaciones, integraciones y superficies AURA;
- `TREQ-AURA-006`, para mantener AURA no disponible mientras continúe bloqueada;
- `TREQ-AURA-007`, para impedir transferencias implícitas de ownership;
- `TREQ-PULSO-004`, para mutaciones comerciales mediante acciones nombradas y autorizadas;
- `TREQ-PULSO-005`, para separar pedido, revisión, líneas, preparación, cumplimiento, venta y fidelización;
- `TREQ-PULSO-006`, para venta, cobro, descuento, anulación, devolución y cierre auditables;
- `TREQ-PASS-008` y `TREQ-PASS-010`, para ledger, redención, identidad y consentimiento;
- `TREQ-INTEGRATION-003`, para idempotencia y reconciliación;
- `TREQ-INTEGRATION-006`, `TREQ-INTEGRATION-014`, `TREQ-INTEGRATION-015` y `TREQ-INTEGRATION-019`, para fronteras e integraciones empresariales aplicables.

Esta sección documenta trazabilidad existente y no actualiza el Registro 04A.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La tarea se prepara antes de su incorporación al checkout; la batería documental real se ejecutará al abrir e incorporar `AURA-AUD-009`. |
| LOCAL | `PASS` | El artefacto contiene una sola tarea, metadata completa, continuidad `008 -> 009 -> 010`, matriz de nueve relaciones, sección de cero requisitos sin identificadores de prueba y cero whitespace al final de línea. |
| REMOTA | `PASS` | Se verificaron ownership de procesos, registro de eventos y consumidoras, `INT-MKT-003`, `OPS-B2B-001`, código actual de `vento-pulso` y la ausencia de una superficie AURA operativa en ese runtime. |
| OPERATIVA | `NOT_APPLICABLE` | No se ejecutan ventas, campañas, descuentos, pedidos, reservas, reclamos, entregas ni mediciones; se define únicamente la frontera canónica entre aplicaciones. |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no se modifica código, dato, permiso, precio, pedido, campaña, integración, despliegue ni infraestructura. |

---

#### 29. Criterios de aceptación

- [x] Se define una relación AURA–PULSO sin confundir marketing y transacción.
- [x] AURA conserva ownership de `VPROC-0056` y `VPROC-0057`.
- [x] PULSO permanece consumidora directa de ambos procesos AURA diferidos.
- [x] Se inventarían exactamente siete procesos PULSO consumidos por AURA.
- [x] Se distinguen cinco relaciones PULSO → AURA directas y dos condicionales.
- [x] Se contabilizan exactamente nueve relaciones canónicas AURA–PULSO.
- [x] Se mantienen cero procesos con ownership compartido.
- [x] Se preserva PULSO como propietaria de oferta, pedido, venta y efecto comercial.
- [x] Se preserva AURA como propietaria de campaña, oportunidad y atribución.
- [x] Se preserva `VPROC-0017` como referencia versionada de oferta.
- [x] Se mantiene `VPROC-0040` como consumo AURA condicional.
- [x] Se fija la frontera AURA → PULSO para `VPROC-0041` B2B.
- [x] Se limita el consumo AURA de `VPROC-0046` al aprendizaje y contexto permitido.
- [x] Se limita el consumo AURA de `VPROC-0047` sin transferir capacidad o reserva.
- [x] Se limita el consumo AURA de `VPROC-0050` a casos condicionales.
- [x] Se utiliza `VPROC-0068` como proyección de experiencia sin convertirla en éxito de campaña.
- [x] Se preserva la validación comercial definida por `INT-MKT-003`.
- [x] Una campaña AURA no autoriza precio ni descuento por sí sola.
- [x] PULSO no crea campaña u oportunidad AURA por inferencia.
- [x] Se prohíbe escritura cruzada directa.
- [x] Se confirma que el runtime PULSO actual no demuestra integración AURA operativa.
- [x] Se confirma que PULSO puede seguir operando mientras AURA permanece diferida.
- [x] Se entrega a `AURA-AUD-010` la frontera necesaria para decidir continuidad.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecutan cambios físicos.

---

#### 30. Límites

Esta tarea no:

- activa AURA;
- modifica PULSO;
- crea campañas;
- crea oportunidades;
- crea cotizaciones;
- crea pedidos;
- crea ventas;
- modifica precios;
- aplica descuentos;
- crea cupones;
- modifica beneficios PASS;
- modifica ledger o redenciones;
- modifica pagos o caja;
- modifica reservas o reclamos;
- crea endpoints, RPC, tablas, funciones, triggers, jobs, colas o webhooks;
- modifica RLS;
- modifica permisos;
- implementa correlación de campaña;
- implementa atribución;
- implementa `AURA-INT-002`;
- decide continuidad, reemplazo o retiro;
- registra el ADR final;
- crea ni modifica requisitos de prueba;
- modifica el Registro 04A;
- inicia una instancia física o package.

---

#### 31. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-008 — Definir relación con PASS`

**TAREA ACTUAL APROBADA**
`AURA-AUD-009 — Definir relación con PULSO`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-010 — Decidir continuidad, reemplazo o retiro`
### ✅ AURA-AUD-010 — Decidir continuidad, reemplazo o retiro

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-009 — Definir relación con PULSO
**Tarea siguiente:** AURA-AUD-011 — Documentar decisión mediante ADR si corresponde
**Tipo de tarea:** decisión arquitectónica y técnico-documental de continuidad de AURA; resuelve la puerta abierta por la auditoría AURA-AUD-001 a AURA-AUD-009, selecciona continuidad de la aplicación objetivo diferida, descarta reemplazo y retiro con la evidencia vigente y fija las condiciones que deben registrarse mediante ADR antes de reconciliar el roadmap, sin crear producto, repositorio, migración ni integración runtime
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; AURA queda aprobada para continuidad como aplicación objetivo diferida de marketing y desarrollo comercial, sin declarar producto operativo, sin transferir las superficies actuales de VISO y sin habilitar todavía el roadmap posterior
**Cambios físicos autorizados:** ninguno; esta tarea no crea repositorio AURA, aplicación, rutas, pantallas, datos, tablas, RLS, permisos, campañas, integraciones, canales, credenciales, migraciones, despliegues, DNS, transferencias de CMS ni cambios en VISO, PASS, PULSO, NUMERA, NEXO o FOGO
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Resolver la decisión formal pendiente después de auditar la existencia real de AURA, su producto, usuarios, superficies, procesos, datos, permisos y relaciones con VISO, PASS y PULSO.

La decisión debe distinguir explícitamente:

```text
CONTINUIDAD DE AURA COMO APLICACIÓN OBJETIVO
!=
PRODUCTO AURA YA EXISTENTE
```

```text
CONTINUIDAD
!=
ACTIVACIÓN
!=
IMPLEMENTACIÓN
!=
TRANSFERENCIA DE CMS
```

```text
NO EXISTE RUNTIME AURA ACTUAL
!=
EL DOMINIO FUNCIONAL AURA DEBE RETIRARSE
```

La tarea selecciona una opción entre continuidad, reemplazo y retiro a partir de evidencia vigente y deja a las tareas siguientes el gobierno arquitectónico y la reconciliación del roadmap.

---

#### 2. Reconciliación topológica

Se conserva:

```text
TASK = AURA-AUD-010
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-009
NEXT = AURA-AUD-011
```

Consecuencias:

- la decisión es documental y arquitectónica;
- no genera instancia física propia;
- no crea ni modifica una aplicación runtime;
- no habilita campañas reales;
- no autoriza migraciones;
- no modifica ownership físico existente;
- no adelanta `AURA-AUD-011` ni `AURA-AUD-012`;
- no sustituye los gates de packages, readiness, autorización o certificación posteriores.

---

#### 3. Base de decisión consumida

La decisión consume sin reabrir:

- `CAP-SCOPE-014`, que define AURA como sistema operativo objetivo de marketing y desarrollo comercial;
- `AURA-AUD-001`, que confirma ausencia de repositorio standalone AURA y ausencia de transferencia de ownership;
- `AURA-AUD-002`, que confirma identidad canónica existente y producto funcional AURA no implementado;
- `AURA-AUD-003`, que confirma cero usuarios efectivos y cero usuarios productivos AURA;
- `AURA-AUD-004`, que confirma cero rutas y pantallas propias y nueve superficies interactivas relacionadas alojadas en VISO;
- `AURA-AUD-005`, que confirma `VPROC-0056` y `VPROC-0057` como procesos propietarios objetivo de AURA y separa las superficies transitorias actuales;
- `AURA-AUD-006`, que separa datos actuales, datos objetivo, permisos actuales, permiso reservado y permisos futuros;
- `AURA-AUD-007`, que define a VISO como custodia runtime transitoria y a AURA como ownership funcional objetivo diferido;
- `AURA-AUD-008`, que preserva PASS como propietaria de identidad, consentimiento, fidelización, beneficio y ledger;
- `AURA-AUD-009`, que preserva PULSO como propietaria de oferta, pedido, venta y validación comercial y documenta nueve relaciones canónicas AURA–PULSO;
- `INT-MKT-001`, que mantiene campañas AURA bloqueadas hasta esta decisión y el gobierno posterior;
- `INT-MKT-002` e `INT-MKT-003`, que preservan respectivamente la frontera PASS y la validación comercial de PULSO;
- `OPS-B2B-001`, que mantiene AURA en lead y oportunidad y PULSO en cotización, pedido y compromiso comercial;
- el registro vigente de requisitos AURA, SHELL e integración aplicable.

---

#### 4. Decisión formal

Se adopta:

```text
AURA_CONTINUITY_DECISION = CONTINUE
AURA_TARGET_APPLICATION = PRESERVED
AURA_RUNTIME_STATE = DEFERRED
AURA_REPLACEMENT = NO
AURA_RETIREMENT = NO
AURA_CURRENT_PRODUCT_REUSE = NOT_APPLICABLE
AURA_CURRENT_RUNTIME_ACTIVATION = NOT_AUTHORIZED
ADR_REQUIRED = YES
ROADMAP_RELEASE_BY_THIS_TASK = NO
```

Interpretación normativa:

**AURA continúa como la aplicación objetivo especializada de marketing y desarrollo comercial de Vento OS, pero permanece diferida y deberá materializarse mediante su roadmap gobernado.**

La decisión no afirma que exista un producto AURA actual reutilizable. Lo que continúa es:

- la identidad canónica `aura`;
- el dominio empresarial definido por `CAP-SCOPE-014`;
- la propiedad objetivo de `VPROC-0056` y `VPROC-0057`;
- las fronteras aprobadas frente a VISO, PASS, PULSO, NUMERA, NEXO y FOGO;
- las tareas AURA posteriores que desarrollan dominio, autorización, experiencia e integraciones.

---

#### 5. Matriz de alternativas

| Alternativa | Decisión | Evidencia determinante | Consecuencia |
| --- | --- | --- | --- |
| Continuidad de AURA | `APROBADA` | existe dominio empresarial propio aprobado, procesos propietarios objetivo, fronteras claras y backlog especializado que no pertenece íntegramente a otra aplicación | conservar AURA como aplicación objetivo diferida y continuar únicamente mediante el gobierno posterior |
| Reemplazar AURA por VISO | `DESCARTADA` | VISO aloja actualmente CMS y superficies relacionadas, pero `AURA-AUD-007` las clasifica como custodia runtime transitoria y no le transfiere `VPROC-0056/0057` | VISO conserva su runtime actual hasta una transición futura autorizada |
| Reemplazar AURA por PASS | `DESCARTADA` | PASS gobierna identidad, consentimiento, fidelización, beneficios y ledger, no campañas ni oportunidades de marketing | PASS permanece consumidora o fuente propietaria según contrato, no sistema de campañas |
| Reemplazar AURA por PULSO | `DESCARTADA` | PULSO gobierna oferta, pedido, venta, precio aplicado y validación comercial, pero no campaña, brief, audiencia ni atribución | PULSO permanece autoridad transaccional y consumidora de proyecciones AURA |
| Reemplazar AURA por NUMERA | `DESCARTADA` | NUMERA conserva presupuesto, costo, margen y verdad económica, no creación, publicación u oportunidad de marketing | NUMERA permanece autoridad económica |
| Reemplazar AURA por canales externos | `DESCARTADA` | los canales publican, transportan o reportan métricas y no son propietarios del hecho empresarial | los canales continúan como fronteras externas |
| Retirar AURA y dejar las capacidades distribuidas | `DESCARTADA` | las capacidades actuales son parciales o transitorias y no cubren el dominio objetivo sin ampliar ownership por inferencia | se evita consolidar accidentalmente una arquitectura fragmentada como destino permanente |

---

#### 6. Razón de continuidad

La continuidad se aprueba por la combinación de cinco hechos:

1. **Existe una necesidad empresarial diferenciada.** `CAP-SCOPE-014` define once subcapacidades de marketing, campañas, contenido, oportunidades, reputación, B2B y aprendizaje que no pertenecen íntegramente a otro dominio.
2. **Existe ownership funcional objetivo explícito.** `VPROC-0056` y `VPROC-0057` permanecen asignados a AURA como `DEFINED_DEFERRED`.
3. **Las capacidades actuales no constituyen sustituto completo.** VISO cubre CMS transitorio; PASS cubre cliente y fidelización; PULSO cubre transacción; NUMERA cubre economía; ninguno cubre legítimamente el dominio completo de AURA.
4. **El roadmap posterior ya separa las responsabilidades que faltan.** `AURA-DOM-*`, `AURA-AUTH-*`, `AURA-UX-*` y `AURA-INT-*` describen el desarrollo especializado necesario sin transferir maestros de otros dominios.
5. **Retirar AURA dejaría ownership sin resolver.** El retiro exigiría reasignar formalmente `VPROC-0056/0057` y las capacidades de `CAP-SCOPE-014`; la auditoría no identificó una propietaria sustituta válida que conserve todas las fronteras aprobadas.

Por tanto, la ausencia de producto actual se trata como una condición de implementación pendiente y no como evidencia suficiente para retirar el dominio.

---

#### 7. Significado exacto de continuidad

Continuidad significa:

```text
PRESERVAR IDENTIDAD Y DOMINIO AURA
+
CONSTRUIR EL PRODUCTO BAJO LOS CONTRATOS APROBADOS
+
MANTENER RUNTIME ACTUAL EN SUS PROPIETARIAS HASTA CUTOVER AUTORIZADO
```

No significa:

```text
COPIAR VISO
```

ni:

```text
RENOMBRAR EL CMS ACTUAL COMO AURA
```

ni:

```text
ACTIVAR EL HOST RESERVADO
```

ni:

```text
CONSIDERAR AURA IMPLEMENTADA POR EXISTIR aura.access
```

ni:

```text
CREAR UN REPOSITORIO DESDE ESTA TAREA
```

La implementación futura debe partir del contrato objetivo, reutilizando o migrando únicamente aquello que una tarea posterior apruebe de forma explícita.

---

#### 8. Estado del producto después de la decisión

La decisión actualiza la interpretación arquitectónica, no la realidad física:

```text
AURA_CANONICAL_IDENTITY = PRESERVED
AURA_FUNCTIONAL_SCOPE = APPROVED_TARGET
AURA_STANDALONE_REPOSITORY = ABSENT
AURA_WEB_PRODUCT = NOT_IMPLEMENTED
AURA_RUNTIME_ENTRY = UNAVAILABLE
AURA_EFFECTIVE_USERS = 0
AURA_ROUTES = 0
AURA_SCREENS = 0
AURA_DEPLOYMENT = NOT_VERIFIED
AURA_FUNCTIONAL_STATE = DEFERRED
```

No se convierte ninguno de esos valores físicos a estado operativo por efecto de `AURA-AUD-010`.

---

#### 9. Relación con VISO después de la decisión

Se preserva el contrato de `AURA-AUD-007`:

```text
CURRENT_RELATION = TRANSITIONAL_RUNTIME_CUSTODY
TARGET_RELATION = DEFERRED_FUNCTIONAL_OWNERSHIP
TRANSFER_STATUS = NOT_AUTHORIZED
```

Por tanto:

- VISO conserva las superficies administrativas de CMS que hoy ejecuta;
- Vento-Group conserva las superficies públicas consumidoras actuales;
- AURA no reclama esas rutas por la sola decisión de continuidad;
- no se duplica el CMS;
- no se crean maestros paralelos;
- no se modifica ownership de datos por inferencia;
- cualquier transferencia futura debe cumplir la frontera definida en el registro vigente y quedar gobernada por decisión, ADR, migración, cutover, reconciliación y rollback.

La continuidad de AURA hace posible una transferencia futura; no la ejecuta ni la autoriza automáticamente.

---

#### 10. Relación con PASS después de la decisión

Se preserva `AURA-PASS-RELATION-001`.

AURA conserva:

- intención promocional;
- campaña;
- audiencia de marketing autorizada;
- oportunidad;
- correlación y atribución.

PASS conserva:

- identidad de cliente;
- relación de marca y perfil;
- consentimiento;
- beneficio y recompensa;
- acumulación y redención;
- ledger de fidelización.

La continuidad de AURA no crea un segundo maestro de clientes, consentimiento, beneficios o puntos.

---

#### 11. Relación con PULSO después de la decisión

Se preserva `AURA-PULSO-RELATION-001` y su matriz de nueve relaciones canónicas.

AURA conserva:

- campaña e intención;
- oportunidad digital;
- atribución y aprendizaje de marketing.

PULSO conserva:

- oferta comercial aplicable;
- cotización y compromiso B2B;
- pedido y venta;
- validación comercial;
- precio y efecto aplicado;
- snapshot transaccional.

La decisión mantiene:

```text
CAMPAÑA AURA
!=
REGLA TRANSACCIONAL
!=
EFECTO APLICADO EN PULSO
```

---

#### 12. Relación con NUMERA, NEXO y FOGO

La continuidad de AURA no altera las autoridades existentes:

| Dominio | Autoridad preservada | AURA consume |
| --- | --- | --- |
| `NUMERA` | presupuesto, costo, margen, obligación, resultado económico y rentabilidad | guardas y resultados económicos autorizados |
| `NEXO` | producto, atributos maestros, inventario, disponibilidad física y logística | referencias y proyecciones autorizadas |
| `FOGO` | receta, capacidad productiva, ejecución y hechos de producción | capacidad o restricciones operativas cuando correspondan |

AURA no copiará estos maestros como datos editables propios.

---

#### 13. Procesos propietarios preservados

La decisión confirma como ownership funcional objetivo de AURA:

| Proceso | Estado preservado | Decisión |
| --- | --- | --- |
| `VPROC-0056` | `DEFINED_DEFERRED` | permanece en AURA; deberá materializarse solo mediante tareas posteriores autorizadas |
| `VPROC-0057` | `DEFINED_DEFERRED` | permanece en AURA; la oportunidad se transfiere a PULSO cuando se convierte en compromiso comercial |

No se reasignan procesos en esta tarea.

---

#### 14. CMS y contenido existente

La decisión no adopta el CMS actual de VISO como producto AURA ya construido.

Se conserva:

```text
CMS VISO ACTUAL
=
RUNTIME TRANSITORIO VERIFICADO
```

```text
AURA FUTURA
=
PROPIETARIA FUNCIONAL OBJETIVO
```

La reutilización de componentes, datos, rutas, medios o contratos existentes deberá evaluarse por compatibilidad. No se presume migración uno a uno.

Una eventual transferencia deberá evitar:

- dos CMS activos para el mismo maestro;
- dos rutas propietarias equivalentes;
- duplicación de contenido;
- pérdida de URLs o SEO;
- pérdida de evidencia y versiones;
- permisos divergentes;
- publicación simultánea no conciliada;
- cutover irreversible sin rollback.

---

#### 15. Catálogo, launcher y disponibilidad

La decisión de continuidad no cambia la disponibilidad visible de AURA.

Mientras falten los gates físicos exigidos:

```text
AURA_CATALOG_STATUS = RESERVED_NOT_AVAILABLE
AURA_NAVIGATION = DISABLED
AURA_RUNTIME_URL = NOT_USABLE_AS_PRODUCT
```

Las representaciones de AURA en AppSwitcher, login o catálogos deberán seguir comunicando indisponibilidad hasta que existan, de forma demostrable:

- repositorio y ownership técnico confirmados;
- producto implementado;
- rutas y pantallas certificadas;
- autorización y capacidades suficientes;
- despliegue verificado;
- navegación segura;
- readiness y certificación aplicables.

---

#### 16. Tratamiento del roadmap posterior

`AURA-AUD-010` resuelve la opción arquitectónica, pero **no libera por sí sola el roadmap**.

Se conserva la secuencia:

```text
AURA-AUD-010
DECISIÓN = CONTINUIDAD
        ↓
AURA-AUD-011
REGISTRAR DECISIÓN MEDIANTE ADR
        ↓
AURA-AUD-012
RECONCILIAR BLOQUEO / LIBERACIÓN DEL ROADMAP
        ↓
WEB-FRM-011
        ↓
AURA-DOM-001..
```

Las tareas `AURA-DOM-*`, `AURA-AUTH-*`, `AURA-UX-*` y `AURA-INT-*` continúan bloqueadas hasta completar las tareas de gobierno inmediatas.

---

#### 17. ADR requerido

La decisión requiere que `AURA-AUD-011` registre el resultado mediante ADR porque fija una decisión arquitectónica material:

- AURA permanece como aplicación objetivo separada;
- VISO conserva custodia runtime transitoria de CMS;
- PASS y PULSO no absorben el dominio AURA;
- `VPROC-0056/0057` permanecen en AURA;
- cualquier futura transferencia de CMS debe ser explícita, reversible y reconciliada;
- el roadmap posterior continuará bajo una aplicación que todavía no tiene repositorio ni runtime propios.

Se fija:

```text
ADR_REQUIRED = YES
ADR_OWNER_TASK = AURA-AUD-011
ADR_NOT_CREATED_BY_AURA_AUD_010 = TRUE
```

`AURA-AUD-010` decide; `AURA-AUD-011` registra arquitectónicamente la decisión.

---

#### 18. Condiciones que la continuidad no satisface todavía

La continuidad no elimina los siguientes faltantes:

| Condición | Estado después de `AURA-AUD-010` | Propietaria de cierre |
| --- | --- | --- |
| ADR de la decisión | pendiente | `AURA-AUD-011` |
| estado coherente del roadmap | pendiente | `AURA-AUD-012` |
| repositorio standalone AURA | no confirmado | tarea física o package futuro autorizado |
| producto AURA implementado | no implementado | packages propietarios futuros |
| rutas y pantallas AURA | no materializadas | tareas y packages posteriores |
| permisos funcionales AURA | no materializados | `AURA-AUTH-*` y packages posteriores |
| canales externos | no conectados | `AURA-INT-001` y packages posteriores |
| contratos internos productivos | no materializados | `AURA-INT-002` y packages posteriores |
| transferencia CMS VISO → AURA | no autorizada | decisión/migración posterior bajo ADR y readiness |
| disponibilidad en launcher | bloqueada | gates de producto, auth, despliegue y certificación |

La continuidad es una decisión de dirección arquitectónica, no una declaración de readiness.

---

#### 19. Condiciones que descartan el reemplazo en esta decisión

No existe evidencia vigente de una alternativa que pueda reemplazar AURA sin absorber responsabilidades ajenas.

Un reemplazo solo habría sido admisible si una solución candidata demostrara simultáneamente:

- ownership claro de `VPROC-0056/0057`;
- campañas, contenido, oportunidades, reputación y atribución como dominio coherente;
- separación de PASS y PULSO;
- separación de NUMERA;
- contratos de producto, disponibilidad y capacidad sin copiar maestros;
- autorización y segregación suficientes;
- integración con canales y aplicaciones internas;
- migración y rollback de las superficies existentes;
- continuidad de identidades, URLs, evidencia y consumidores.

La auditoría no identificó esa solución sustituta.

---

#### 20. Condiciones que descartan el retiro en esta decisión

El retiro no se adopta porque las capacidades empresariales permanecen necesarias y tienen contratos ya aprobados.

Retirar AURA ahora exigiría, como mínimo:

- reasignar `VPROC-0056`;
- reasignar `VPROC-0057`;
- reasignar las once subcapacidades `CAP-14.01` a `CAP-14.11`;
- reconciliar todos los consumidores y eventos;
- redefinir ownership de campañas y oportunidades;
- reubicar tareas de dominio, autorización, UX e integración;
- preservar requisitos AURA vigentes sin propietario ambiguo.

No existe evidencia que justifique esa reasignación ni una propietaria sustituta aprobada.

---

#### 21. Continuidad operacional durante la etapa diferida

Mientras AURA continúe diferida:

- las actividades reales de marketing pueden seguir mediante procesos humanos, externos o superficies actualmente autorizadas;
- VISO conserva su CMS actual bajo su autoridad vigente;
- Vento-Group conserva el consumo público existente;
- PULSO continúa operando ventas y promociones transaccionales bajo sus contratos;
- PASS continúa identidad y fidelización;
- los canales externos conservan su operación nativa;
- ninguna práctica transitoria se reclasifica como implementación AURA;
- ninguna superficie transitoria amplía automáticamente su authority para cubrir el dominio futuro.

---

#### 22. Criterio de reapertura de la decisión

La decisión podrá requerir nueva revisión arquitectónica únicamente si aparece evidencia material nueva, por ejemplo:

- una solución sustituta aprobada con ownership equivalente;
- cambio formal de `CAP-SCOPE-014`;
- reasignación canónica de `VPROC-0056` o `VPROC-0057`;
- restricción jurídica, contractual o tecnológica que haga inviable el producto;
- consolidación empresarial aprobada que cambie las fronteras entre aplicaciones;
- evidencia de que el costo o riesgo de separar AURA supera una alternativa formalmente evaluada.

Un cambio de framework, proveedor, lenguaje, hosting o diseño visual por sí solo no equivale a reemplazo de la aplicación canónica.

---

#### 23. Prohibiciones

Queda prohibido interpretar esta decisión como autorización para:

1. crear automáticamente el repositorio AURA;
2. activar un host reservado;
3. habilitar navegación AURA;
4. convertir `aura.access` en producto funcional;
5. asignar usuarios productivos;
6. copiar el CMS de VISO;
7. mover rutas de VISO;
8. mover datos o media;
9. crear tablas AURA;
10. crear RLS, RPC, triggers, jobs o colas;
11. conectar Meta, Google, TikTok, WhatsApp, correo, reseñas o proveedores de IA;
12. importar audiencias, leads o métricas;
13. enviar datos reales a terceros;
14. crear o publicar campañas;
15. crear descuentos o modificar precios;
16. alterar beneficios o ledger PASS;
17. alterar pedidos, ventas o pagos PULSO;
18. alterar presupuesto o hechos NUMERA;
19. duplicar producto, inventario o capacidad de NEXO/FOGO;
20. liberar `AURA-DOM-*`, `AURA-AUTH-*`, `AURA-UX-*` o `AURA-INT-*` antes de completar `AURA-AUD-011` y `AURA-AUD-012`;
21. declarar AURA disponible en catálogos antes de sus gates físicos;
22. ejecutar una transferencia CMS sin ADR, cutover, reconciliación y rollback.

---

#### 24. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la decisión selecciona continuidad dentro de reglas ya protegidas por el registro vigente. Ya existe cobertura para la identidad y fronteras de AURA, la inexistencia de producto actual, la indisponibilidad del launcher mientras falten gates, la custodia actual de VISO, la futura transferencia condicionada a decisión y ADR, la separación de PASS/PULSO/NUMERA y la prohibición de declarar una aplicación disponible por la sola existencia de un registro o permiso. La tarea no introduce una obligación verificable material nueva que requiera otra identidad de prueba.

Balance:

- creados: **0**;
- modificados: **0**;
- diferidos: **0**;
- descartados: **0**;
- obsoletos: **0**.

---

#### 25. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar, en especial:

- `TREQ-AURA-001`, para identidad, versionado, ownership y separación de campaña, contenido, publicación y promoción;
- `TREQ-AURA-003`, para fronteras de campañas, oportunidades, PULSO, PASS, NUMERA y atribución;
- `TREQ-AURA-004`, para distinguir reserva de aplicación de producto implementado;
- `TREQ-AURA-005`, para detectar deltas futuros de repositorio, ruta, pantalla, launcher o permiso;
- `TREQ-AURA-006`, para mantener AURA no disponible mientras falten producto, despliegue, rutas, autorización y decisión formal;
- `TREQ-AURA-007`, para mantener las superficies actuales en VISO y Vento-Group mientras no exista transferencia aprobada;
- `TREQ-AURA-027`, para condicionar una eventual transferencia CMS a decisión formal, ADR, migración sin duplicados, cutover, reconciliación y rollback;
- `TREQ-SHELL-001`, para impedir considerar una aplicación operativa por la sola existencia de un registro o permiso;
- la cobertura vigente de integración, autorización, privacidad, auditoría, idempotencia y fuentes propietarias.

Ninguna fila cambia de identidad, texto, estado, relación, propietaria, evidencia ni secuencia por `AURA-AUD-010`.

---

#### 26. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `AURA-AUD-010` en la rama documental del usuario. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en el checkout del usuario ni sometido allí al formateador, quality, delivery check y batería global. |
| REMOTA | `PASS` | Se verificaron en `main` las tareas `AURA-AUD-001` a `AURA-AUD-008`, `CAP-SCOPE-014`, `INT-MKT-001`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, requisitos AURA/SHELL aplicables y continuidad de `PHASE-12-AURA`; `AURA-AUD-009` se consume como artefacto completo aprobado del trabajo adelantado mientras su incorporación termina. |
| OPERATIVA | `NOT_EXECUTED` | La decisión no modifica una operación real ni autoriza campañas, usuarios, canales o transferencias; la verificación operacional queda para materializaciones posteriores. |
| FÍSICA | `NOT_APPLICABLE` | `AURA-AUD-010` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea ni modifica producto, infraestructura, datos, repositorios o despliegues. |

---

#### 27. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva `AURA-AUD-009` como tarea anterior;
2. conserva `AURA-AUD-011` como única tarea siguiente;
3. selecciona explícitamente continuidad;
4. descarta reemplazo con la evidencia vigente;
5. descarta retiro con la evidencia vigente;
6. distingue continuidad de implementación y disponibilidad;
7. conserva AURA como aplicación objetivo especializada;
8. conserva AURA como estado runtime diferido;
9. conserva cero usuarios efectivos AURA;
10. conserva cero rutas y pantallas propias actuales;
11. no declara repositorio standalone existente;
12. preserva `VPROC-0056` y `VPROC-0057` en AURA;
13. preserva VISO como custodia runtime transitoria de CMS;
14. mantiene `TRANSFER_STATUS = NOT_AUTHORIZED` para CMS;
15. preserva PASS como autoridad de identidad, consentimiento y fidelización;
16. preserva PULSO como autoridad de oferta, pedido, venta y validación comercial;
17. preserva NUMERA como autoridad económica;
18. preserva NEXO y FOGO como fuentes de producto, inventario y capacidad según corresponda;
19. evita duplicar maestros;
20. mantiene AURA no disponible en launchers mientras falten gates físicos;
21. declara que `AURA-AUD-011` debe registrar la decisión mediante ADR;
22. declara que `AURA-AUD-012` debe reconciliar el bloqueo o liberación posterior del roadmap;
23. no libera directamente las tareas AURA posteriores;
24. no crea repositorio, host, rutas, datos, permisos ni integraciones;
25. no autoriza transferencia CMS;
26. genera cero requisitos de prueba nuevos;
27. modifica cero requisitos de prueba;
28. no genera una copia del registro canónico de requisitos;
29. crea cero objetos físicos;
30. modifica cero objetos físicos.

---

#### 28. Límites

Esta tarea no:

- diseña el ADR;
- modifica el estado físico del roadmap;
- crea el repositorio AURA;
- selecciona framework, hosting o tecnología;
- define nombres físicos de tablas, APIs, RPC, colas o eventos nuevos;
- implementa `AURA-DOM-*`;
- implementa `AURA-AUTH-*`;
- implementa `AURA-UX-*`;
- implementa `AURA-INT-*`;
- mueve el CMS de VISO;
- conecta canales;
- usa datos reales;
- modifica requisitos de prueba;
- ejecuta cambios físicos.

---

#### 29. Resultado de la decisión

La auditoría `AURA-AUD-001` a `AURA-AUD-009` concluye:

```text
AURA COMO PRODUCTO ACTUAL = NO IMPLEMENTADA
AURA COMO DOMINIO EMPRESARIAL = NECESARIA Y DEFINIDA
AURA COMO APLICACIÓN OBJETIVO = CONTINÚA
REEMPLAZO = DESCARTADO CON EVIDENCIA VIGENTE
RETIRO = DESCARTADO CON EVIDENCIA VIGENTE
```

La arquitectura objetivo queda:

```text
AURA
-> MARKETING / CAMPAÑAS / CONTENIDO / OPORTUNIDADES / ATRIBUCIÓN

VISO
-> CUSTODIA TRANSITORIA DEL CMS ACTUAL HASTA TRANSICIÓN AUTORIZADA

PASS
-> CLIENTE / CONSENTIMIENTO / FIDELIZACIÓN

PULSO
-> OFERTA / PEDIDO / VENTA / EFECTO COMERCIAL

NUMERA
-> VERDAD ECONÓMICA

NEXO / FOGO
-> PRODUCTO / INVENTARIO / CAPACIDAD SEGÚN CONTRATO
```

Y el siguiente gate queda:

```text
DECISIÓN DE CONTINUIDAD APROBADA
        ↓
ADR OBLIGATORIO EN AURA-AUD-011
        ↓
RECONCILIACIÓN DEL ROADMAP EN AURA-AUD-012
```

ÚLTIMA TAREA APROBADA

`AURA-AUD-009 — Definir relación con PULSO`

TAREA ACTUAL APROBADA

`AURA-AUD-010 — Decidir continuidad, reemplazo o retiro`

SIGUIENTE TAREA RESERVADA

`AURA-AUD-011 — Documentar decisión mediante ADR si corresponde`

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-009 — Definir relación con PULSO`

**TAREA ACTUAL APROBADA**
`AURA-AUD-010 — Decidir continuidad, reemplazo o retiro`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-011 — Documentar decisión mediante ADR si corresponde`
### ✅ AURA-AUD-011 — Documentar decisión mediante ADR si corresponde

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-010 — Decidir continuidad, reemplazo o retiro
**Tarea siguiente:** AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión
**Tipo de tarea:** decisión arquitectónica y técnico-documental; materializa mediante ADR la decisión de continuidad aprobada por AURA-AUD-010, preserva sus fronteras frente a VISO, PASS, PULSO, NUMERA, NEXO y FOGO, fija el tratamiento de CMS, runtime, disponibilidad y evolución futura, y entrega a AURA-AUD-012 una decisión arquitectónica estable sin liberar por sí misma el roadmap ni autorizar implementación física
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; queda registrado el ADR de continuidad de AURA como aplicación objetivo diferida, sin crear producto, repositorio, superficies, datos, integraciones ni despliegues
**Cambios físicos autorizados:** ninguno; esta tarea solo registra una decisión arquitectónica y no crea ni modifica código, repositorios, tablas, RLS, RPC, funciones, triggers, jobs, colas, rutas, pantallas, DNS, secretos, canales, campañas, datos ni infraestructura
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 29 de septiembre de 2026

---

#### 1. Propósito

Registrar de forma arquitectónica, estable y trazable la decisión adoptada por `AURA-AUD-010`:

```text
AURA_CONTINUITY_DECISION = CONTINUE
AURA_TARGET_APPLICATION = PRESERVED
AURA_RUNTIME_STATE = DEFERRED
AURA_REPLACEMENT = NO
AURA_RETIREMENT = NO
```

La tarea existe porque `AURA-AUD-010` determinó expresamente:

```text
ADR_REQUIRED = YES
```

El resultado de `AURA-AUD-011` no es volver a decidir entre continuidad, reemplazo o retiro. Su responsabilidad es conservar la decisión ya adoptada, explicar sus razones, fijar sus consecuencias y impedir reinterpretaciones futuras incompatibles con las fronteras aprobadas.

Se preserva la distinción:

```text
DECIDIR
!=
REGISTRAR LA DECISIÓN
!=
RECONCILIAR EL ROADMAP
!=
IMPLEMENTAR
```

`AURA-AUD-010` decide.

`AURA-AUD-011` registra arquitectónicamente.

`AURA-AUD-012` gobierna el estado posterior del roadmap.

---

#### 2. Reconciliación topológica

La tarea conserva:

```text
TASK = AURA-AUD-011
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-010
NEXT = AURA-AUD-012
```

Consecuencias:

- la tarea se define una sola vez;
- no crea instancia física propia;
- no abre package ni implementation unit;
- no modifica una aplicación runtime;
- no autoriza migraciones;
- no modifica Supabase;
- no autoriza despliegues;
- no habilita canales externos;
- no libera por sí misma tareas `AURA-DOM-*`, `AURA-AUTH-*`, `AURA-UX-*` o `AURA-INT-*`;
- no sustituye los gates de package, readiness, autorización, certificación, cutover o rollback posteriores.

---

#### 3. Condición de aplicabilidad del ADR

`AURA-AUD-010` resolvió que el ADR sí corresponde.

La condición queda cerrada como:

```text
ADR_APPLICABILITY = REQUIRED
ADR_REASON = MATERIAL_ARCHITECTURAL_DECISION
DECISION_SOURCE = AURA-AUD-010
DECISION_STATUS = APPROVED_FOR_RECORDING
```

La decisión es material porque determina simultáneamente:

1. que AURA continúa como aplicación objetivo separada;
2. que AURA todavía no existe como producto operativo standalone;
3. que VISO mantiene custodia runtime transitoria de las superficies CMS actuales;
4. que PASS no absorbe identidad de marketing, campaña, oportunidad ni atribución;
5. que PULSO no absorbe campaña, oportunidad ni atribución;
6. que NUMERA no absorbe creación ni operación de marketing;
7. que NEXO y FOGO conservan sus maestros y hechos operativos;
8. que `VPROC-0056` y `VPROC-0057` permanecen en el ownership funcional objetivo de AURA;
9. que una eventual transferencia CMS requiere decisión explícita, migración, cutover, reconciliación y rollback;
10. que la continuidad no equivale a disponibilidad, implementación ni liberación automática del roadmap.

---

#### 4. ADR de continuidad de AURA

##### ADR-AURA-001 — Continuidad de AURA como aplicación objetivo diferida de marketing y desarrollo comercial

##### Estado del ADR

✅ **ACCEPTED**

##### Estado de la tarea propietaria

✅ **AURA-AUD-011 aprobada**

##### Fuente de decisión

`AURA-AUD-010 — Decidir continuidad, reemplazo o retiro`

##### Decisión registrada

```text
ADR_ID = ADR-AURA-001
ADR_STATUS = ACCEPTED
AURA_CONTINUITY_DECISION = CONTINUE
AURA_TARGET_APPLICATION = PRESERVED
AURA_RUNTIME_STATE = DEFERRED
AURA_REPLACEMENT = NO
AURA_RETIREMENT = NO
AURA_CURRENT_PRODUCT_REUSE = NOT_APPLICABLE
AURA_CURRENT_RUNTIME_ACTIVATION = NOT_AUTHORIZED
CMS_TRANSFER_STATUS = NOT_AUTHORIZED
ROADMAP_RELEASE_BY_THIS_ADR = NO
```

##### Ámbito

La decisión aplica al dominio arquitectónico y funcional objetivo de AURA y a sus fronteras con:

```text
vento-shell
VISO
PASS
PULSO
NUMERA
NEXO
FOGO
Vento-Group
canales externos futuros
Supabase futuro de AURA cuando corresponda
```

También aplica a:

```text
marketing
campañas
contenido
promociones
leads y oportunidades
atribución
CMS
publicación
consumidores públicos
autorización futura
integraciones futuras
launcher y navegación futura
cutover y rollback futuros
```

##### Implementación

```text
ESTE ADR NO IMPLEMENTA CÓDIGO
ESTE ADR NO CREA REPOSITORIO
ESTE ADR NO CREA MIGRACIONES
ESTE ADR NO MODIFICA SUPABASE
ESTE ADR NO TRANSFIERE CMS
ESTE ADR NO ACTIVA AURA
ESTE ADR NO LIBERA EL ROADMAP POR SÍ SOLO
```

---

#### 5. Contexto arquitectónico

La auditoría `AURA-AUD-001` a `AURA-AUD-009` estableció un estado asimétrico:

```text
IDENTIDAD CANÓNICA AURA = EXISTE
DOMINIO EMPRESARIAL AURA = DEFINIDO
PROCESOS OBJETIVO AURA = DEFINIDOS
PRODUCTO AURA STANDALONE = NO IMPLEMENTADO
RUNTIME AURA = NO DISPONIBLE
USUARIOS EFECTIVOS AURA = 0
RUTAS PROPIAS AURA = 0
PANTALLAS PROPIAS AURA = 0
```

Al mismo tiempo existen capacidades y superficies relacionadas distribuidas actualmente entre otros propietarios:

- VISO conserva CMS y superficies administrativas transitorias;
- Vento-Group conserva consumidores públicos actuales;
- PASS conserva identidad de cliente, consentimiento y fidelización;
- PULSO conserva oferta, pedido, venta, precio aplicado y validación comercial;
- NUMERA conserva presupuesto, costo, margen y verdad económica;
- NEXO conserva producto, atributos, inventario y disponibilidad según contrato;
- FOGO conserva receta, capacidad y hechos de producción según contrato;
- canales externos conservan su autoridad nativa de publicación, mensajería o métricas cuando existan.

La decisión debía resolver si esa distribución actual se convertiría en arquitectura objetivo permanente o si AURA continuaría como aplicación especializada futura.

`AURA-AUD-010` seleccionó continuidad.

---

#### 6. Problema arquitectónico registrado

Sin un ADR, la decisión de continuidad podría degradarse con el tiempo en interpretaciones incompatibles, por ejemplo:

```text
AURA NO EXISTE HOY
→ ENTONCES DEBE RETIRARSE
```

O:

```text
VISO TIENE EL CMS
→ ENTONCES VISO ES EL DESTINO PERMANENTE DEL DOMINIO AURA
```

O:

```text
PULSO EJECUTA LA VENTA
→ ENTONCES PULSO DEBE ABSORBER CAMPAÑAS
```

O:

```text
PASS TIENE CLIENTES Y BENEFICIOS
→ ENTONCES PASS DEBE ABSORBER MARKETING
```

O:

```text
AURA CONTINÚA
→ ENTONCES YA PUEDE ACTIVARSE
```

Ninguna de esas inferencias está autorizada.

El problema arquitectónico real es conservar simultáneamente:

```text
DOMINIO AURA VÁLIDO
+
PRODUCTO AURA TODAVÍA AUSENTE
+
RUNTIME TRANSITORIO EN OTROS PROPIETARIOS
+
FRONTERAS DE OWNERSHIP ESTABLES
+
MIGRACIÓN FUTURA EXPLÍCITA Y REVERSIBLE
```

---

#### 7. Decisión arquitectónica

Vento OS conservará AURA como aplicación objetivo especializada de marketing y desarrollo comercial.

La decisión completa es:

```text
AURA CONTINÚA
COMO APLICACIÓN OBJETIVO DIFERIDA
```

No continúa como producto actual reutilizable, porque ese producto no existe.

Continúan:

- la identidad canónica `aura`;
- el dominio empresarial definido para AURA;
- `VPROC-0056 — Gestionar contenido y promociones`;
- `VPROC-0057 — Convertir interacciones digitales en oportunidades comerciales`;
- las fronteras documentadas frente a VISO, PASS, PULSO, NUMERA, NEXO y FOGO;
- el roadmap especializado AURA como destino documental sujeto a sus gates posteriores.

Permanece diferido:

- repositorio standalone AURA;
- producto web AURA;
- rutas y pantallas AURA;
- autorización funcional AURA;
- datos y contratos runtime AURA;
- canales externos AURA;
- integraciones internas AURA;
- disponibilidad en launcher;
- transferencia CMS;
- despliegue y operación productiva.

---

#### 8. Alternativas consideradas y descartadas

El ADR registra las mismas alternativas ya resueltas por `AURA-AUD-010`; no las reabre.

| Alternativa | Estado registrado | Razón arquitectónica preservada |
| --- | --- | --- |
| Continuidad de AURA | `ACCEPTED` | existe dominio propio, procesos objetivo, fronteras aprobadas y backlog especializado que no pertenece íntegramente a otra aplicación |
| Reemplazo por VISO | `REJECTED` | VISO conserva custodia runtime transitoria, no ownership objetivo integral de AURA |
| Reemplazo por PASS | `REJECTED` | PASS conserva cliente, consentimiento, fidelización, beneficios y ledger, no el dominio completo de campañas y oportunidades |
| Reemplazo por PULSO | `REJECTED` | PULSO conserva oferta, pedido, venta, precio aplicado y validación comercial, no el dominio completo de campaña y atribución |
| Reemplazo por NUMERA | `REJECTED` | NUMERA conserva verdad económica, no creación, publicación u oportunidad de marketing |
| Reemplazo por canales externos | `REJECTED` | los canales son fronteras de publicación o medición, no propietarios del hecho empresarial |
| Retiro de AURA | `REJECTED` | dejaría sin propietaria objetivo válida capacidades y procesos ya aprobados o exigiría una reasignación arquitectónica que no existe |

---

#### 9. Invariantes de la decisión

Mientras este ADR permanezca vigente:

1. AURA continúa como aplicación objetivo.
2. AURA permanece diferida hasta cumplir sus gates posteriores.
3. La identidad `aura` no demuestra producto operativo.
4. `aura.access` no demuestra disponibilidad de producto.
5. La existencia de una URL reservada no demuestra runtime válido.
6. VISO conserva la custodia runtime transitoria del CMS actual.
7. PASS conserva identidad de cliente, consentimiento y fidelización.
8. PULSO conserva oferta, pedido, venta y validación comercial.
9. NUMERA conserva autoridad económica.
10. NEXO y FOGO conservan sus maestros y hechos operativos.
11. AURA no duplica maestros ajenos.
12. AURA no absorbe autoridad ajena por continuidad documental.
13. `VPROC-0056` permanece en AURA como ownership funcional objetivo.
14. `VPROC-0057` permanece en AURA como ownership funcional objetivo.
15. La oportunidad deja de ser AURA cuando se convierte en compromiso comercial según la frontera aprobada con PULSO.
16. Campaña no equivale a regla transaccional.
17. Contenido no equivale a beneficio PASS.
18. Publicación no equivale a venta, redención o rentabilidad.
19. El CMS actual no se renombra como AURA por inferencia.
20. La continuidad no autoriza migración de datos.
21. La continuidad no autoriza transferencia de rutas.
22. La continuidad no autoriza creación de tablas.
23. La continuidad no autoriza conexión de canales.
24. La continuidad no autoriza campañas reales.
25. La continuidad no autoriza disponibilidad en launcher.
26. La continuidad no elimina los gates de autorización, despliegue, readiness, certificación, cutover y rollback.
27. El roadmap posterior solo cambia de estado mediante su tarea propietaria.

---

#### 10. Relación con VISO

Se conserva como decisión arquitectónica:

```text
CURRENT_RELATION = TRANSITIONAL_RUNTIME_CUSTODY
TARGET_RELATION = DEFERRED_FUNCTIONAL_OWNERSHIP
TRANSFER_STATUS = NOT_AUTHORIZED
```

VISO continúa ejecutando las superficies CMS actuales mientras no exista una transición posterior aprobada.

El ADR no convierte esa custodia en propiedad objetivo permanente.

Tampoco convierte la continuidad de AURA en autorización de transferencia inmediata.

Una futura transferencia deberá demostrar, como mínimo:

- alcance exacto;
- propietario destino;
- consumidores;
- contratos de datos;
- rutas;
- permisos;
- media;
- compatibilidad;
- preservación de URLs;
- preservación de SEO cuando aplique;
- preservación de evidencia;
- ausencia de maestros duplicados;
- cutover controlado;
- reconciliación;
- rollback probado;
- retiro o redirección posterior de superficies anteriores.

---

#### 11. Relación con PASS

Se preserva la frontera aprobada en la auditoría.

AURA conserva como dominio objetivo:

- campaña;
- intención promocional;
- audiencia de marketing autorizada;
- oportunidad;
- correlación;
- atribución;
- aprendizaje de marketing.

PASS conserva:

- identidad de cliente;
- perfil y relación de marca;
- consentimiento;
- beneficios;
- recompensas;
- acumulación;
- redención;
- ledger de fidelización.

El ADR prohíbe tratar una identidad de cliente PASS como ownership de campaña AURA y prohíbe duplicar en AURA los maestros que corresponden a PASS.

---

#### 12. Relación con PULSO

Se preserva la frontera aprobada en la auditoría.

AURA conserva:

- campaña;
- intención;
- oportunidad digital;
- atribución;
- aprendizaje de marketing.

PULSO conserva:

- oferta comercial aplicable;
- cotización;
- compromiso B2B;
- pedido;
- venta;
- precio aplicado;
- validación comercial;
- snapshot transaccional.

Se mantiene:

```text
CAMPAÑA AURA
!=
REGLA TRANSACCIONAL
!=
EFECTO APLICADO EN PULSO
```

El ADR no autoriza que una campaña modifique precio o descuento sin pasar por la autoridad transaccional correspondiente.

---

#### 13. Relación con NUMERA, NEXO y FOGO

La continuidad no altera autoridades existentes.

| Dominio | Autoridad preservada | Relación futura de AURA |
| --- | --- | --- |
| `NUMERA` | presupuesto, costo, margen, obligación, resultado económico y rentabilidad | consumir guardas y resultados económicos autorizados sin duplicar la verdad económica |
| `NEXO` | producto, atributos maestros, inventario, disponibilidad física y logística | consumir referencias y proyecciones autorizadas |
| `FOGO` | receta, capacidad productiva, ejecución y hechos de producción | consumir capacidad o restricciones operativas cuando el contrato correspondiente lo permita |

El ADR no convierte a AURA en maestra editable de producto, inventario, receta, capacidad, costo o margen.

---

#### 14. Procesos propietarios preservados

La decisión arquitectónica registra:

| Proceso | Ownership objetivo | Estado |
| --- | --- | --- |
| `VPROC-0056` | `AURA` | `DEFINED_DEFERRED` |
| `VPROC-0057` | `AURA` | `DEFINED_DEFERRED` |

No se reasigna ninguno de estos procesos.

No se declara materialización runtime por el hecho de conservar el ownership funcional objetivo.

---

#### 15. CMS y transición futura

La arquitectura distingue:

```text
CMS VISO ACTUAL
=
RUNTIME TRANSITORIO
```

Y:

```text
AURA FUTURA
=
PROPIETARIA FUNCIONAL OBJETIVO DEL DOMINIO APROBADO
```

La eventual convergencia de ambas realidades no es automática.

Se registra la regla:

```text
DECISIÓN FORMAL
+
ADR VIGENTE
+
PLAN DE MIGRACIÓN
+
CUTOVER
+
RECONCILIACIÓN
+
ROLLBACK
=
CONDICIONES MÍNIMAS PARA UNA TRANSFERENCIA FUTURA
```

Por tanto:

```text
CMS_TRANSFER_AUTHORIZED_BY_AURA_AUD_011 = NO
```

---

#### 16. Disponibilidad, launcher y navegación

El ADR no modifica la disponibilidad visible de AURA.

Mientras no existan los gates físicos posteriores:

```text
AURA_CATALOG_STATUS = RESERVED_NOT_AVAILABLE
AURA_NAVIGATION = DISABLED
AURA_RUNTIME_ENTRY = UNAVAILABLE
AURA_FUNCTIONAL_STATE = DEFERRED
```

No se podrá interpretar la continuidad como permiso para mostrar AURA como aplicación utilizable.

La disponibilidad futura deberá depender de evidencia real de producto, autorización, rutas, despliegue, navegación segura, readiness y certificación.

---

#### 17. Estado del roadmap después del ADR

El ADR satisface la obligación de registrar la decisión, pero no altera por sí mismo el estado del roadmap.

Se fija:

```text
ADR_COMPLETED = YES
ROADMAP_RELEASE_BY_AURA_AUD_011 = NO
ROADMAP_STATE_OWNER = AURA-AUD-012
```

Por tanto, después de `AURA-AUD-011`:

```text
AURA-AUD-010
DECISIÓN = CONTINUE
        ↓
AURA-AUD-011
ADR = ACCEPTED
        ↓
AURA-AUD-012
RESOLVER ESTADO CANÓNICO DEL BLOQUEO SEGÚN LA DECISIÓN YA REGISTRADA
```

Hasta que `AURA-AUD-012` complete su responsabilidad, ninguna tarea posterior obtiene autorización de ejecución por el solo hecho de existir este ADR.

---

#### 18. Consecuencias aceptadas

##### Consecuencia 1 — Se conserva una aplicación todavía no implementada

La arquitectura acepta explícitamente que una aplicación objetivo pueda continuar definida aunque su producto runtime aún no exista.

##### Consecuencia 2 — El runtime transitorio continúa fuera de AURA

Las superficies actuales permanecen en sus propietarias vigentes hasta una transición autorizada.

##### Consecuencia 3 — No existe migración automática desde VISO

La continuidad no prescribe copiar el CMS actual ni moverlo uno a uno.

##### Consecuencia 4 — El roadmap especializado conserva validez documental

Las tareas AURA posteriores conservan sentido como destino de desarrollo, pero continúan sujetas a su gobierno y gates.

##### Consecuencia 5 — Se evita absorción accidental por aplicaciones vecinas

PASS, PULSO, NUMERA, NEXO, FOGO y VISO conservan sus responsabilidades sin ampliar ownership por ausencia actual de producto AURA.

##### Consecuencia 6 — Se exige una nueva decisión si cambia la premisa material

Una futura evidencia que altere dominio, procesos, viabilidad o fronteras requerirá revisión arquitectónica explícita y no una reinterpretación silenciosa de este ADR.

---

#### 19. Condiciones de revisión, sustitución o retiro del ADR

`ADR-AURA-001` permanece vigente mientras no exista una decisión posterior aprobada que lo sustituya o enmiende.

La revisión arquitectónica se vuelve necesaria si ocurre al menos una de estas condiciones:

- `CAP-SCOPE-014` cambia materialmente;
- `VPROC-0056` o `VPROC-0057` se reasignan formalmente;
- una aplicación distinta recibe ownership integral aprobado del dominio;
- AURA se vuelve inviable por una restricción jurídica, contractual, tecnológica o empresarial material;
- una consolidación de aplicaciones aprobada cambia las fronteras;
- una decisión posterior aprueba retiro o reemplazo;
- una transferencia CMS requiere alterar las fronteras aquí registradas.

No requieren sustituir el ADR por sí solos:

- cambio de framework;
- cambio de lenguaje;
- cambio de proveedor cloud;
- cambio de hosting;
- cambio de diseño visual;
- cambio de librería;
- cambio de herramienta de analítica;
- cambio de proveedor de canal externo.

Esos cambios deberán gobernarse en sus tareas propietarias mientras respeten la decisión arquitectónica vigente.

---

#### 20. Reglas de no inferencia

Queda prohibido derivar de este ADR cualquiera de las siguientes conclusiones:

1. que AURA ya está implementada;
2. que existe un repositorio standalone AURA;
3. que existe una URL runtime funcional AURA;
4. que existen usuarios AURA efectivos;
5. que existen rutas o pantallas AURA propias;
6. que `aura.access` basta para operar;
7. que VISO debe transferir el CMS inmediatamente;
8. que PASS debe compartir o transferir su maestro de cliente;
9. que PULSO debe transferir reglas transaccionales;
10. que NUMERA debe transferir hechos económicos;
11. que NEXO debe transferir producto o inventario;
12. que FOGO debe transferir receta o capacidad;
13. que un canal externo se vuelve fuente de verdad de campaña;
14. que se puede usar service role para suplir autorización futura;
15. que se pueden crear tablas, RPC o RLS AURA antes de sus tareas y packages;
16. que se puede publicar una campaña real por existir el ADR;
17. que se puede habilitar AURA en launcher;
18. que se puede saltar `AURA-AUD-012`;
19. que se puede saltar `WEB-FRM-011` cuando la ruta canónica lo exija;
20. que las tareas posteriores quedan físicamente autorizadas.

---

#### 21. Handoff a AURA-AUD-012

`AURA-AUD-012` recibe una decisión ya cerrada y registrada.

Entrada obligatoria:

```text
DECISION = CONTINUE
ADR = ADR-AURA-001
ADR_STATUS = ACCEPTED
AURA_RUNTIME_STATE = DEFERRED
REPLACEMENT = NO
RETIREMENT = NO
CMS_TRANSFER_STATUS = NOT_AUTHORIZED
ROADMAP_RELEASE_BY_010 = NO
ROADMAP_RELEASE_BY_011 = NO
```

`AURA-AUD-012` no deberá volver a decidir si AURA continúa.

Su responsabilidad es mantener el estado del roadmap coherente con la decisión ya adoptada y con la frontera canónica que impide acoplamientos o ejecución anticipada.

La secuencia posterior permanece reservada por la ruta canónica.

---

#### 22. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `AURA-AUD-011` registra mediante ADR una decisión ya cubierta por obligaciones de prueba vigentes. No introduce una nueva conducta runtime, un nuevo objeto físico, una nueva frontera operacional ni una nueva obligación verificable distinta de las ya registradas para continuidad, disponibilidad, ownership, transferencia CMS, migración, cutover y rollback.

Balance:

- creados: **0**;
- modificados: **0**;
- diferidos: **0**;
- descartados: **0**;
- obsoletos: **0**.

---

#### 23. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar, en especial:

- `TREQ-AURA-004`, para distinguir reserva e identidad de producto realmente implementado;
- `TREQ-AURA-005`, para detectar deltas futuros de repositorio, dominio, ruta, pantalla, launcher o permiso;
- `TREQ-AURA-006`, para mantener AURA no disponible mientras falten producto, despliegue, rutas, autorización y decisión formal completa;
- `TREQ-AURA-007`, para conservar las superficies actuales en VISO y Vento-Group mientras no exista transferencia aprobada;
- `TREQ-AURA-027`, para exigir decisión formal y ADR antes de una futura transferencia CMS y para exigir migración sin duplicados, cutover, reconciliación y rollback;
- `TREQ-SHELL-001`, para impedir considerar una aplicación operativa por la sola existencia de un registro o permiso;
- la cobertura vigente de integración, autorización, privacidad, auditoría, continuidad y rollback aplicable.

Ningún requisito cambia de identidad, texto, estado, relación, propietaria, evidencia ni secuencia por `AURA-AUD-011`.

---

#### 24. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `AURA-AUD-011` en la rama documental del usuario. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en el checkout del usuario ni sometido allí al formateador, quality, delivery check y batería global. |
| REMOTA | `PASS` | Se verificaron en el repositorio canónico el propietario de AURA, la ruta `PHASE-12-AURA`, el modo `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, la sucesión `AURA-AUD-011` → `AURA-AUD-012`, el ADR existente `ADR-AUTH-001` como precedente estructural, la puerta `INT-MKT-001` y la cobertura vigente de `TREQ-AURA-027`; `AURA-AUD-010` se consume como artefacto completo aprobado por el usuario mientras termina su incorporación. |
| OPERATIVA | `NOT_EXECUTED` | El ADR no modifica operación real, campañas, usuarios, canales, CMS, ventas, fidelización, inventario, producción ni economía. |
| FÍSICA | `NOT_APPLICABLE` | `AURA-AUD-011` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea ni modifica producto, infraestructura, datos, repositorios o despliegues. |

---

#### 25. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva `AURA-AUD-010` como tarea anterior;
2. conserva `AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión` como única tarea siguiente;
3. registra que el ADR sí corresponde;
4. registra la decisión `CONTINUE` sin reabrir alternativas;
5. conserva `AURA_TARGET_APPLICATION = PRESERVED`;
6. conserva `AURA_RUNTIME_STATE = DEFERRED`;
7. conserva `AURA_REPLACEMENT = NO`;
8. conserva `AURA_RETIREMENT = NO`;
9. registra `ADR-AURA-001` como ADR de continuidad;
10. deja el ADR en `ACCEPTED` al aprobarse la tarea;
11. preserva cero usuarios efectivos AURA como estado actual;
12. preserva cero rutas y pantallas AURA propias como estado actual;
13. no declara repositorio standalone AURA existente;
14. preserva `VPROC-0056` en AURA como ownership funcional objetivo;
15. preserva `VPROC-0057` en AURA como ownership funcional objetivo;
16. preserva VISO como custodia runtime transitoria del CMS actual;
17. mantiene `CMS_TRANSFER_STATUS = NOT_AUTHORIZED`;
18. preserva PASS como autoridad de identidad, consentimiento y fidelización;
19. preserva PULSO como autoridad de oferta, pedido, venta y validación comercial;
20. preserva NUMERA como autoridad económica;
21. preserva NEXO y FOGO como fuentes propietarias según contrato;
22. prohíbe duplicar maestros;
23. mantiene AURA no disponible mientras falten gates físicos;
24. no libera directamente el roadmap;
25. asigna a `AURA-AUD-012` el estado posterior del roadmap;
26. no crea repositorio, host, rutas, datos, permisos ni integraciones;
27. no autoriza transferencia CMS;
28. no crea campañas;
29. no usa datos reales;
30. no crea requisitos de prueba;
31. no modifica requisitos de prueba;
32. no genera una copia del registro de requisitos;
33. crea cero objetos físicos;
34. modifica cero objetos físicos.

---

#### 26. Límites

Esta tarea no:

- vuelve a decidir continuidad, reemplazo o retiro;
- modifica `CAP-SCOPE-014`;
- reasigna `VPROC-0056`;
- reasigna `VPROC-0057`;
- crea el repositorio AURA;
- selecciona framework, hosting o lenguaje;
- crea aplicación web;
- crea rutas o pantallas;
- activa launcher o navegación;
- crea tablas, vistas, RLS, RPC, funciones, triggers, jobs o colas;
- crea migraciones;
- modifica Supabase;
- crea secretos o credenciales;
- conecta Meta, Google, TikTok, WhatsApp, correo, reseñas, analítica o IA;
- mueve el CMS de VISO;
- mueve contenido o media;
- copia clientes desde PASS;
- altera beneficios o ledger PASS;
- altera oferta, pedido, venta, precio o validación comercial PULSO;
- altera hechos económicos NUMERA;
- altera maestros NEXO;
- altera receta o capacidad FOGO;
- crea campañas o audiencias reales;
- importa leads o métricas;
- libera `AURA-DOM-*`;
- libera `AURA-AUTH-*`;
- libera `AURA-UX-*`;
- libera `AURA-INT-*`;
- sustituye `AURA-AUD-012`;
- inicia una instancia física o package;
- crea ni modifica requisitos de prueba.

---

#### 27. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-010 — Decidir continuidad, reemplazo o retiro`

**TAREA ACTUAL APROBADA**
`AURA-AUD-011 — Documentar decisión mediante ADR si corresponde`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión`
### ✅ AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión

**Estado:** APROBADA
**Tarea anterior:** AURA-AUD-011 — Documentar decisión mediante ADR si corresponde
**Tarea siguiente:** WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz
**Tipo de tarea:** cierre documental de la puerta de auditoría de AURA y reconciliación del estado del roadmap; confirma que la condición previa de decisión y ADR quedó satisfecha, permite continuar la ruta documental canónica y mantiene bloqueada toda materialización física de AURA mientras no exista repositorio, runtime, ambiente, autorización y gates técnicos aplicables
**Bloque:** BLOQUE W — AURA — AUDITORÍA Y DECISIÓN DE CONTINUIDAD
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/W_AURA/01_AUDITORIA_Y_DECISION_DE_CONTINUIDAD.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`; se cierra la puerta documental previa de decisión, pero AURA permanece `DEFERRED`, `ENV-AURA-BLOCKED` y con planificación física `BLOQUEADO_AURA_SIN_REPOSITORIO`
**Cambios físicos autorizados:** ninguno; esta tarea no crea repositorio, aplicación, rutas, pantallas, datos, integraciones, infraestructura, migraciones, Supabase, secretos, canales, campañas ni despliegues
**Requisitos de prueba creados o modificados:** 0
**Fecha de corte:** 29 de septiembre de 2026

---

#### 1. Propósito

Cerrar la puerta documental de auditoría y decisión de AURA sin confundir ese cierre con autorización de implementación.

`AURA-AUD-010` aprobó la continuidad de AURA como aplicación objetivo separada y mantuvo su runtime diferido.

`AURA-AUD-011` registró esa decisión mediante `ADR-AURA-001 — ACCEPTED`.

Por tanto, la condición previa que mantenía detenido el roadmap hasta contar con decisión y ADR ya está satisfecha. Esta tarea debe reconciliar ese hecho con el estado real del producto y separar dos carriles que no son equivalentes:

```text
CONTINUIDAD DOCUMENTAL DE LA RUTA
!=
LIBERACIÓN DE IMPLEMENTACIÓN FÍSICA
```

Resultado esperado:

```text
DECISIÓN DE CONTINUIDAD = CERRADA
ADR DE CONTINUIDAD = REGISTRADO
PUERTA DOCUMENTAL PREVIA = SATISFECHA
RUTA DOCUMENTAL = PUEDE CONTINUAR
AURA RUNTIME = DEFERRED
AMBIENTE AURA = ENV-AURA-BLOCKED
PLANIFICACIÓN FÍSICA AURA = BLOQUEADO_AURA_SIN_REPOSITORIO
```

---

#### 2. Reconciliación topológica

La tarea conserva:

```text
TASK = AURA-AUD-012
MODE = DEFINE_ONCE
EXECUTION_GATE = NO_PHYSICAL_INSTANCE
SEQUENCE = PHASE-12-AURA
PREVIOUS = AURA-AUD-011
NEXT = WEB-FRM-011
```

Consecuencias:

- se define una sola vez;
- no crea instancia física propia;
- no abre package ni implementation unit;
- no implementa AURA;
- no modifica Supabase;
- no altera aplicaciones existentes;
- no salta `WEB-FRM-011`, que permanece como siguiente tarea canónica de la ruta;
- no adelanta `AURA-DOM-001` antes de completar la etapa intermedia definida por la ruta.

---

#### 3. Base canónica consumida

Esta tarea consume sin reabrir:

- `AURA-AUD-001` a `AURA-AUD-009`, como auditoría de existencia, estado real, procesos y relaciones con VISO, PASS y PULSO;
- `AURA-AUD-010`, como decisión formal de continuidad;
- `AURA-AUD-011`, como registro arquitectónico de esa decisión;
- `ADR-AURA-001 — ACCEPTED`, como decisión arquitectónica vigente de continuidad;
- `CAP-SCOPE-014`, como definición del producto objetivo de marketing y desarrollo comercial;
- `INT-MKT-001`, como puerta que separa aprobación de AURA de materialización de campañas;
- el inventario de superficies y navegación que mantiene AURA diferida y no disponible;
- la cobertura `TREQ-AURA-*` vigente, en especial las reglas de existencia, disponibilidad, ownership y futura transferencia CMS;
- la ruta `PHASE-12-AURA`, que ubica `WEB-FRM-011` inmediatamente después de `AURA-AUD-012`.

Ninguna de estas decisiones se redefine en esta tarea.

---

#### 4. Estado recibido de AURA-AUD-010

La decisión formal recibida es:

```text
AURA_CONTINUITY_DECISION = CONTINUE
AURA_TARGET_APPLICATION = PRESERVED
AURA_RUNTIME_STATE = DEFERRED
AURA_REPLACEMENT = NO
AURA_RETIREMENT = NO
```

Esto significa:

1. AURA continúa como aplicación objetivo propia;
2. no se reemplaza por VISO, PASS, PULSO, NUMERA, NEXO, FOGO ni un proveedor externo;
3. no se retira del modelo objetivo de Vento OS;
4. no se declara implementada;
5. no se declara disponible;
6. no se crea repositorio por inferencia;
7. no se habilita runtime por inferencia;
8. no se transfiere CMS por inferencia;
9. no se activa ninguna campaña, canal, dato, credencial o integración.

---

#### 5. Estado recibido de AURA-AUD-011

`AURA-AUD-011` registró:

```text
ADR_ID = ADR-AURA-001
ADR_STATUS = ACCEPTED
AURA_CONTINUITY_DECISION = CONTINUE
AURA_TARGET_APPLICATION = PRESERVED
AURA_RUNTIME_STATE = DEFERRED
CMS_TRANSFER_STATUS = NOT_AUTHORIZED
ROADMAP_RELEASE_BY_THIS_ADR = NO
```

La función de `AURA-AUD-012` no es crear un segundo ADR ni reabrir la decisión. Su función es convertir el cierre de la puerta de decisión en un estado de roadmap coherente.

---

#### 6. Distinción obligatoria entre roadmap documental y roadmap físico

A partir de esta tarea se mantienen dos estados separados.

##### 6.1. Roadmap documental

La condición previa de auditoría queda satisfecha porque:

```text
AURA-AUD-010 = DECISIÓN COMPLETA
AURA-AUD-011 = ADR COMPLETO
```

Por tanto, la ruta documental puede continuar conforme a `continuity-route.json` y `execution-route.json`.

El siguiente paso no se elige por inferencia. Es exactamente:

```text
WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz
```

Solo después de esa tarea intermedia la ruta alcanza `AURA-DOM-001`.

##### 6.2. Roadmap físico

La implementación física de AURA continúa bloqueada porque siguen faltando condiciones materiales:

- repositorio standalone propietario confirmado;
- runtime AURA operativo;
- ambiente AURA habilitado;
- superficies propias certificadas;
- contratos físicos de datos y autorización materializados;
- packages e implementation units correspondientes;
- readiness y autorización de ejecución;
- evidencia de compatibilidad, migración, rollback y certificación cuando aplique.

Por tanto:

```text
CIERRE DE AUDITORÍA
!=
IMPLEMENTATION_READY
```

---

#### 7. Resultado del bloqueo previo

El bloqueo específico que existía por ausencia de decisión queda cerrado como condición documental previa.

Antes:

```text
AURA-AUD-010 PENDIENTE
+
AURA-AUD-011 PENDIENTE
=>
NO CONTINUAR ROADMAP AURA
```

Después de esta tarea:

```text
AURA-AUD-010 APROBADA
+
AURA-AUD-011 APROBADA
+
AURA-AUD-012 APROBADA
=>
PUERTA DOCUMENTAL DE AUDITORÍA CERRADA
=>
CONTINUAR RUTA CANÓNICA
```

Este cierre no elimina los bloqueos físicos derivados de inexistencia de producto runtime.

---

#### 8. Estado físico que permanece bloqueado

Se conserva el estado material observado:

```text
REPOSITORIO STANDALONE AURA = ABSENT / NO_CONFIRMADO
RUNTIME AURA = DEFERRED
ENTORNO AURA = ENV-AURA-BLOCKED
PLANIFICACIÓN FÍSICA AURA = BLOQUEADO_AURA_SIN_REPOSITORIO
DISPONIBILIDAD AURA = NO DISPONIBLE
USUARIOS EFECTIVOS AURA = 0
RUTAS PROPIAS AURA = 0
PANTALLAS PROPIAS AURA = 0
```

La continuidad documental no convierte ninguno de esos valores en estado implementado.

---

#### 9. Estado de launcher y navegación

AURA permanece diferida en cualquier representación de launcher, AppSwitcher o navegación.

La regla sigue siendo:

```text
IDENTIDAD RESERVADA DE APLICACIÓN
!=
APLICACIÓN NAVEGABLE
```

Mientras no exista implementación física autorizada y certificada:

- un código de aplicación no habilita navegación;
- `aura.access` no prueba disponibilidad;
- una URL reservada no prueba runtime;
- una tarjeta `soon`, `reserved` o equivalente no se convierte en acceso real;
- no se crea deep link a una aplicación inexistente;
- no se presenta un error de runtime como si fuera una denegación de autorización.

---

#### 10. Estado de VISO y CMS

La decisión de continuidad de AURA no transfiere el CMS actual.

Se mantiene:

```text
CMS RUNTIME ACTUAL = VISO
TRANSFERENCIA HACIA AURA = NOT_AUTHORIZED
```

VISO conserva:

- las superficies administrativas CMS existentes;
- la operación transitoria aprobada de esas superficies;
- su responsabilidad hasta que exista una transferencia formal.

Una futura transferencia deberá definir de forma explícita:

1. propietaria destino;
2. consumidores;
3. contrato de datos;
4. permisos y autorización;
5. migración de rutas;
6. migración de contenido y media;
7. compatibilidad pública;
8. cutover;
9. reconciliación;
10. rollback;
11. retiro o redirección de superficies anteriores.

`AURA-AUD-012` no autoriza esa transferencia.

---

#### 11. Frontera con PASS

PASS conserva:

- identidad de cliente;
- consentimiento y preferencias;
- fidelización;
- niveles;
- puntos;
- ledger;
- beneficios y redenciones según sus contratos.

AURA puede diseñarse posteriormente como consumidora de señales y contexto permitidos, pero esta tarea no crea integración ni copia maestros.

La continuidad de AURA no convierte PASS en motor de campañas ni convierte AURA en propietaria del ledger PASS.

---

#### 12. Frontera con PULSO

PULSO conserva:

- oferta transaccional;
- pedido;
- venta;
- precio aplicado;
- descuento aplicado;
- validación comercial;
- evidencia de transacción.

AURA conserva como objetivo futuro la intención de campaña, oportunidad y atribución que ya fueron separadas por la auditoría.

No se crea integración física entre AURA y PULSO en esta tarea.

---

#### 13. Frontera con NUMERA

NUMERA conserva la verdad económica aplicable:

- presupuesto;
- costo;
- margen;
- resultado económico;
- métricas financieras propietarias.

AURA podrá consumir resultados autorizados en etapas posteriores para análisis y aprendizaje, pero no reemplaza a NUMERA como fuente económica.

---

#### 14. Frontera con NEXO y FOGO

NEXO conserva los maestros y hechos logísticos que le corresponden.

FOGO conserva receta, producción, capacidad y hechos productivos que le corresponden.

La continuidad de AURA no crea copias locales de producto, inventario, receta, disponibilidad o capacidad.

---

#### 15. Campañas e integraciones externas

La puerta de auditoría cerrada no autoriza materializar campañas.

Se conserva:

```text
AURA APROBADA PARA CONTINUAR DOCUMENTALMENTE
!=
CAMPAÑA OPERATIVA
```

Por esta tarea no se autoriza:

- Meta;
- Instagram;
- Facebook;
- TikTok;
- Google Ads;
- Google Business Profile;
- WhatsApp;
- correo masivo;
- SMS;
- reseñas;
- analítica externa;
- proveedores de IA;
- automatización de publicación;
- contacto con clientes;
- importación de audiencias;
- gasto publicitario.

Cada integración futura conserva sus propias tareas, contratos y gates.

---

#### 16. IA y proveedores externos

La decisión de continuidad preserva la posibilidad futura de capacidades de IA dentro del producto objetivo AURA, pero no habilita ningún proveedor.

Antes de usar IA real deberán existir como mínimo:

- propósito aprobado;
- proveedor aprobado;
- contrato de datos;
- minimización de información;
- clasificación de información sensible;
- grounding;
- trazabilidad de fuentes y frescura;
- revisión humana;
- autorización de acciones;
- auditoría;
- manejo de errores;
- límites de autonomía;
- rollback o desactivación segura.

No se conectan secretos ni credenciales en esta tarea.

---

#### 17. Estado del roadmap AURA posterior a la auditoría

El roadmap se clasifica así:

| Superficie | Estado después de AURA-AUD-012 | Efecto |
| --- | --- | --- |
| auditoría y decisión `AURA-AUD-001..012` | `CERRADA` | la puerta documental previa queda satisfecha |
| ruta documental `PHASE-12-AURA` | `CONTINÚA` | avanza exclusivamente por la secuencia canónica |
| `WEB-FRM-011` | `SIGUIENTE` | debe resolverse antes de `AURA-DOM-001` |
| `AURA-DOM-*` | `DOCUMENTABLE CUANDO LA RUTA LOS ALCANCE` | no implica implementación |
| `AURA-AUTH-*` | `DOCUMENTABLE CUANDO LA RUTA LOS ALCANCE` | no implica implementación |
| `AURA-UX-*` | `DOCUMENTABLE CUANDO LA RUTA LOS ALCANCE` | no implica implementación |
| `AURA-INT-*` | `DOCUMENTABLE CUANDO LA RUTA LOS ALCANCE` | no implica implementación |
| repositorio AURA | `NO_CONFIRMADO` | no se crea por esta tarea |
| runtime AURA | `DEFERRED` | no se activa |
| entorno AURA | `ENV-AURA-BLOCKED` | no se habilita |
| planificación física AURA | `BLOQUEADO_AURA_SIN_REPOSITORIO` | no se autoriza implementación |
| transferencia CMS | `NOT_AUTHORIZED` | VISO conserva custodia runtime |

---

#### 18. Handoff hacia WEB-FRM-011

La ruta canónica coloca `WEB-FRM-011` inmediatamente después del cierre de la auditoría AURA.

El handoff exacto es:

```text
AURA-AUD-012
        ↓
WEB-FRM-011
        ↓
AURA-DOM-001
```

`AURA-AUD-012` no desarrolla, adelanta ni modifica `WEB-FRM-011`.

Solo fija que la puerta de decisión de AURA ya no bloquea la continuidad documental y que el siguiente trabajo debe respetar la secuencia vigente.

---

#### 19. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación:

- la tarea no introduce un comportamiento físico nuevo;
- no modifica runtime;
- no crea una nueva regla de negocio distinta de las ya aprobadas;
- no crea integraciones;
- no cambia autorización;
- no altera persistencia;
- no cambia contratos de datos;
- no autoriza transferencia CMS;
- no cambia la disponibilidad material de AURA;
- el cierre de decisión, la no disponibilidad actual, el ownership transitorio, el futuro cutover y la prohibición de asumir producto implementado ya están cubiertos por requisitos vigentes.

Requisitos creados: `0`.

Requisitos modificados: `0`.

Requisitos diferidos: `0`.

Requisitos obsoletos: `0`.

El Registro 04A no se modifica.

---

#### 20. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar, en especial:

- `TREQ-AURA-004`, para distinguir identidad/reserva de producto realmente implementado;
- `TREQ-AURA-005`, para detectar cualquier aparición futura de repositorio, dominio, ruta, pantalla, launcher o permiso relacionado con AURA;
- `TREQ-AURA-006`, para mantener AURA no disponible mientras falten producto, despliegue, rutas, autorización y demás condiciones materiales;
- `TREQ-AURA-007`, para conservar VISO y Vento-Group como propietarias de las superficies actuales mientras no exista transferencia aprobada;
- `TREQ-AURA-027`, para exigir decisión formal, ADR, migración, cutover, reconciliación y rollback antes de una futura transferencia CMS;
- la cobertura vigente de integración, autorización, privacidad, auditoría, continuidad y rollback aplicable.

Ningún requisito cambia de identidad, texto, estado, relación, propietaria, evidencia ni secuencia por `AURA-AUD-012`.

---

#### 21. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `AURA-AUD-012` en la rama documental del usuario. |
| LOCAL | `NOT_EXECUTED` | El artefacto aún no ha sido insertado en el checkout del usuario ni sometido allí al formateador, quality, delivery check y batería global. |
| REMOTA | `PASS` | Se verificaron en el repositorio canónico la identidad y título de `AURA-AUD-012`, su propietario, la secuencia `PHASE-12-AURA`, el modo `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, el siguiente trabajo `WEB-FRM-011`, las condiciones de continuidad de AURA, `INT-MKT-001`, el estado `BLOQUEADO_AURA_SIN_REPOSITORIO` y la cobertura AURA vigente; `AURA-AUD-011` se consume como artefacto completo aprobado por el usuario mientras termina su incorporación. |
| OPERATIVA | `NOT_EXECUTED` | La tarea no modifica operación real, campañas, CMS, clientes, ventas, fidelización, inventario, producción, economía, canales ni proveedores. |
| FÍSICA | `NOT_APPLICABLE` | `AURA-AUD-012` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea ni modifica producto, infraestructura, datos, repositorios o despliegues. |

---

#### 22. Criterios de aceptación

La tarea queda documentalmente completa cuando:

1. conserva `AURA-AUD-011` como tarea anterior;
2. conserva `WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz` como única tarea siguiente;
3. confirma que la decisión de continuidad ya existe;
4. confirma que el ADR de continuidad ya existe;
5. no reabre continuidad, reemplazo o retiro;
6. cierra la puerta documental previa de auditoría;
7. permite continuar exclusivamente por la ruta canónica;
8. no salta `WEB-FRM-011`;
9. no inicia `AURA-DOM-001` anticipadamente;
10. mantiene AURA como aplicación objetivo preservada;
11. mantiene AURA `DEFERRED` en runtime;
12. mantiene `ENV-AURA-BLOCKED`;
13. mantiene la planificación física `BLOQUEADO_AURA_SIN_REPOSITORIO`;
14. mantiene AURA no disponible para navegación real;
15. no declara repositorio standalone existente;
16. conserva cero usuarios efectivos AURA como estado actual;
17. conserva cero rutas propias AURA como estado actual;
18. conserva cero pantallas propias AURA como estado actual;
19. mantiene VISO como custodia runtime transitoria del CMS;
20. mantiene la transferencia CMS no autorizada;
21. conserva PASS como autoridad de identidad, consentimiento y fidelización;
22. conserva PULSO como autoridad transaccional y de validación comercial;
23. conserva NUMERA como autoridad económica;
24. conserva NEXO y FOGO como fuentes propietarias según contrato;
25. no crea campañas;
26. no conecta canales;
27. no habilita IA;
28. no usa datos reales de AURA;
29. no crea ni modifica Supabase;
30. no crea repositorio, host, DNS, rutas, pantallas ni secretos;
31. no crea requisitos de prueba;
32. no modifica requisitos de prueba;
33. no modifica el Registro 04A;
34. no crea instancia física ni package.

---

#### 23. Límites

Esta tarea no:

- cambia la decisión `CONTINUE`;
- sustituye `ADR-AURA-001`;
- implementa AURA;
- crea un repositorio AURA;
- elige stack tecnológico;
- crea hosting o DNS;
- crea rutas o pantallas;
- crea navegación real;
- modifica launcher runtime;
- crea usuarios AURA;
- crea permisos nuevos;
- modifica Supabase;
- crea tablas, vistas, funciones, RPC, RLS, triggers, jobs o colas;
- crea secretos;
- conecta canales externos;
- conecta proveedores de IA;
- crea campañas, audiencias, leads u oportunidades reales;
- mueve CMS desde VISO;
- migra contenido o media;
- copia maestros desde PASS, PULSO, NUMERA, NEXO o FOGO;
- ejecuta cutover;
- ejecuta rollback;
- abre `WEB-FRM-011` dentro de esta tarea;
- adelanta `AURA-DOM-001`;
- crea ni modifica requisitos de prueba;
- modifica 04A;
- inicia una instancia física o package.

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

---

#### 24. Continuidad

**ÚLTIMA TAREA APROBADA**
`AURA-AUD-011 — Documentar decisión mediante ADR si corresponde`

**TAREA ACTUAL APROBADA**
`AURA-AUD-012 — Mantener roadmap de implementación bloqueado hasta decisión`

**SIGUIENTE TAREA RESERVADA**
`WEB-FRM-011 — Implementar suscripción de newsletter o retirar la interfaz`
