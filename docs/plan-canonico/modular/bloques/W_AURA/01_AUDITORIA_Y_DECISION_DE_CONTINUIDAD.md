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
### [ ] AURA-AUD-002 — Confirmar estado real del producto
### [ ] AURA-AUD-003 — Confirmar usuarios actuales
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
