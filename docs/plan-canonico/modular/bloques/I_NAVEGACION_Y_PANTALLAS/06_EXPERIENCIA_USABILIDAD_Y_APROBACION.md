### MINI-BLOQUE — EXPERIENCIA USABILIDAD Y APROBACIÓN

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia usabilidad y aprobación** dentro de **I NAVEGACIÓN Y PANTALLAS**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `AUTH-UI-046` a `AUTH-UI-060` — 15 tareas.

## Rectificación integral de `AUTH-UI-052..060`

La evidencia producida para NEXO durante el carril histórico
`NEXO-REMISSIONS-001` se conserva, pero no constituye aprobación global de las
tareas `AUTH-UI-052` a `AUTH-UI-057`. Desde esta rectificación, esas seis tareas
vuelven a `NO INICIADA` y deberán extender sus entregables a todas las
aplicaciones canónicas: ANIMA, FOGO, NEXO, NUMERA, ORIGO, PASS, PULSO, TALENTO,
VISO y VITAL.

El trabajo NEXO contenido debajo de cada marcador es una subsección ya
materializada que podrá reutilizarse. El cierre integral exige además:

| Tarea | Cobertura global pendiente | Condición mínima de cierre |
| --- | --- | --- |
| `AUTH-UI-052` | entrada o página inicial de cada aplicación según actor, función, contexto y dispositivo | matriz de las diez aplicaciones, con `NO_APLICA` justificado cuando no exista inicio interactivo |
| `AUTH-UI-053` | navegación por tareas frecuentes de cada aplicación | disposición por actor y tarea, sin convertir frecuencia o visibilidad en autoridad |
| `AUTH-UI-054` | reducción de opciones irrelevantes en todas las superficies aplicables | decisión por superficie del inventario canónico, sin faltantes ni ocultamiento de trabajo autorizado |
| `AUTH-UI-055` | prototipos testeables por rol, aplicación y estado crítico | catálogo de prototipos vinculado a las superficies aplicables y cobertura explícita de normalidad y recuperación |
| `AUTH-UI-056` | validación interna previa de todos los prototipos | matriz de integridad, coherencia, accesibilidad y aptitud de prueba; no sustituye pruebas con usuarios |
| `AUTH-UI-057` | criterio medible de usabilidad por cada superficie aplicable | relación completa con el inventario de 177 superficies y justificación expresa de cada `NO_APLICA` |
| `AUTH-UI-058` | sesiones con usuarios reales sobre el universo aplicable | evidencia por aplicación, actor, dispositivo, superficie y escenario, sin datos productivos creados para la prueba |
| `AUTH-UI-059` | registro y resolución de todos los problemas observados | severidad, evidencia, propietario, destino canónico, retest y estado por hallazgo |
| `AUTH-UI-060` | decisión final por superficie | ninguna aprobación sin evidencia válida, criterios satisfechos y bloqueadores cerrados |

Ninguna aplicación podrá declararse cubierta por asociación con NEXO. Ninguna
tarea global podrá aprobarse mediante una sola instancia o paquete. Los cambios
físicos posteriores se planificarán mediante `DELIV-PKG-001..025::<package_id>`
y se ejecutarán únicamente después de la puerta aplicable del paquete.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Mostrar contexto activo en cada aplicación” y concluye con “Aprobar la pantalla antes de retirarla del roadmap”.
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-UI-046 — Mostrar contexto activo en cada aplicación

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-045 — Unificar navegación y autorización
**Tarea siguiente:** AUTH-UI-047 — Mostrar rol simulado claramente
**Tipo de tarea:** definición documental transversal de presentación visible del contexto activo por aplicación; materialización física posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT`
**Bloque:** `BLOQUE I — Protección y estados de interfaz`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, rutas, componentes, Supabase, RLS, RPC, permisos, datos, despliegues ni configuración de aplicaciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Aplicar a las aplicaciones canónicas de Vento OS el contrato transversal de contexto activo definido por `UX-ACTIVE-CONTEXT-VISIBILITY-CONTRACT-001`, de modo que una persona pueda reconocer bajo qué actor, carril, territorio, jornada, rol, dispositivo, simulación, alcance y estado de frescura está consultando o actuando antes de ejecutar una operación material.

La presentación visible del contexto no crea autoridad y no sustituye la decisión de autorización. Esta tarea convierte el contrato UX ya aprobado en una regla de proyección por aplicación sin inferir sede, área, turno, rol o permiso a partir del nombre de la aplicación, la ruta, el menú o el estado local del cliente.

```text
CONTEXTO AUTORITATIVO RESUELTO
        ↓
PROYECCION CONTEXTUAL DE LA APLICACION
        ↓
RESUMEN HUMANO PERSISTENTE
        ↓
SUPERFICIE / ACCION

PROYECCION VISIBLE != AUTORIZACION
APLICACION != CONTEXTO
RUTA != CONTEXTO
FILTRO != TERRITORIO OPERATIVO ACTIVO
```

---

#### 2. Fuentes y handoff consumidos

La tarea consume, sin redefinir:

- `UX-BASE-005` y `UX-ACTIVE-CONTEXT-VISIBILITY-CONTRACT-001`, que fijan la semántica de actor, sede, área, turno, check-in, rol, dispositivo, simulación, alcance y frescura visibles;
- `AUTH-UI-015..025`, que ya clasifican las superficies, su contexto de uso, frecuencia y acciones sin convertir el nombre de la aplicación en criterio funcional;
- `AUTH-UI-032..039`, que separan requisitos de turno, check-in, sede, área, dispositivo compartido, simulación, sensibilidad y masking;
- `AUTH-UI-040..045`, que cierran navegación, acceso directo, protección de acciones, autorización de servidor, prohibición de permisos nominales e integración de navegación con autorización;
- el catálogo de diez aplicaciones canónicas: `shell`, `anima`, `viso`, `nexo`, `fogo`, `origo`, `pulso`, `numera`, `aura` y `pass`;
- `SCREEN-CANONICAL-CATALOG-001`, que contiene 177 pantallas canónicas `VSCREEN-*` asignadas a nueve aplicaciones y ninguna pantalla admitida todavía para `aura`;
- los contratos de contexto, autorización, dispositivos, integración, resiliencia y experiencia ya aprobados que determinan si cada dimensión aplica a una superficie concreta.

El handoff de `AUTH-UI-045` permanece vigente: navegación puede descubrir o conducir a una superficie, pero la aplicación destino reconstruye su contexto efectivo y revalida autoridad. Ningún dato transportado por navegación se vuelve contexto autoritativo por aparecer en la interfaz.

---

#### 3. Resultado material

Se define `APPLICATION-ACTIVE-CONTEXT-PRESENTATION-REGISTER-001` como registro documental vinculante para proyectar contexto activo en las diez aplicaciones canónicas.

Cada fila del registro conserva como mínimo:

| Campo | Regla |
| --- | --- |
| `application_code` | código canónico exacto de la aplicación |
| `screen_coverage` | conjunto de `VSCREEN-*` ya asignado por `PROC-SCREEN-002`; no reasigna pantallas |
| `canonical_screen_count` | cantidad heredada del catálogo de pantallas |
| `context_projection_profile` | dimensiones humanas que la aplicación debe poder presentar cuando resulten materiales |
| `context_source` | resolución autoritativa de servidor y contratos de contexto; nunca la ruta o el cliente |
| `experience_lane_source` | clasificación heredada de la superficie o acción; nunca el nombre de la aplicación |
| `territorial_distinction` | separación entre contexto operativo, cobertura administrativa, filtro y territorio del recurso |
| `role_distinction` | separación entre rol base, rol operativo, delegación y simulación cuando apliquen |
| `freshness_state` | uno de los estados cerrados de contexto aprobados |
| `cross_app_rule` | revalidación en destino; el handoff transporta referencias seguras, no autoridad |
| `physical_materialization` | diferida a la instancia física correspondiente por `implementation_unit_id` |

La aplicación no puede eliminar una dimensión obligatoria para una superficie concreta alegando que no forma parte de su perfil ordinario. El perfil de aplicación define la gramática visible; la obligación efectiva procede del contexto y de la clasificación contractual de la superficie o acción.

---

#### 4. Invariantes de contexto visible

Se fijan las siguientes equivalencias prohibidas:

```text
CONTEXTO MOSTRADO != CONTEXTO DECLARADO POR EL CLIENTE
CONTEXTO MOSTRADO != PERMISO
CONTEXTO MOSTRADO != DECISION DE AUTORIZACION
SEDE ASIGNADA != SEDE OPERATIVA ACTIVA
AREA ASIGNADA != AREA OPERATIVA ACTIVA
FILTRO ADMINISTRATIVO != CONTEXTO OPERATIVO
TURNO PROGRAMADO != CHECK-IN ACTIVO
CHECK-IN ACTIVO != AUTORIZACION SUFICIENTE
ROL BASE != ROL OPERATIVO
ROL DE NAVEGACION != ROL EFECTIVO
SIMULACION != AUTORIDAD REAL
DISPOSITIVO TECNICO != ACTOR HUMANO
RUTA / QUERY PARAM / COOKIE / LOCALSTORAGE != FUENTE AUTORITATIVA
```

Reglas:

1. El contexto visible describe el contexto efectivo resuelto; no lo fabrica.
2. La aplicación puede presentar etiquetas humanas, pero no reinterpretar el valor contractual subyacente.
3. Una selección visual puede solicitar un cambio; no se mostrará como activa antes de resolución autoritativa.
4. Una dimensión no aplicable se omite o se presenta como no aplicable; no se rellena con un valor aproximado.
5. Una dimensión obligatoria no resuelta produce un estado explícito y bloquea las mutaciones que dependan de ella.
6. La navegación y el layout pueden compactar la presentación, pero no esconder el contexto material únicamente dentro de un menú de perfil.
7. La proyección visible se invalida cuando cambia actor, rol, sede, área, turno, check-in, dispositivo, delegación, simulación, permiso, custodia o frescura de forma material.

---

#### 5. Unidad mínima de presentación

La proyección contextual disponible para una superficie deberá poder representar, cuando aplique:

- actor efectivo mediante etiqueta humana minimizada;
- carril o naturaleza de experiencia relevante;
- sede operativa activa o cobertura administrativa, distinguidas explícitamente;
- área operativa activa cuando la operación dependa de ella;
- turno y estado de check-in cuando sean prerrequisitos del trabajo;
- rol efectivo y, cuando sea necesario para evitar ambigüedad, rol base;
- dispositivo o estación cuando modifiquen la interpretación del contexto;
- indicador de simulación o delegación cuando exista, sin definir todavía el tratamiento visual detallado reservado a `AUTH-UI-047`;
- territorio del recurso cuando difiera del contexto activo o cuando el proceso sea multiterritorio;
- periodo, entidad, campaña, negocio u otro alcance de dominio cuando la aplicación no opere mediante territorio laboral ordinario;
- estado de frescura y última resolución relevante cuando el contexto pueda estar vencido, degradado o en transición;
- referencia segura para diagnóstico o soporte cuando exista inconsistencia.

Los identificadores técnicos, UUID, claves de permisos, nombres de tablas, `navigation_role`, `effective_role`, `checkin_id`, `territory_scope` y equivalentes no son contenido humano principal.

---

#### 6. Estados cerrados de contexto

`APPLICATION-ACTIVE-CONTEXT-PRESENTATION-REGISTER-001` conserva exactamente los estados aprobados por `UX-BASE-005`:

| Estado | Semántica visible | Regla de acción |
| --- | --- | --- |
| `RESOLVING` | el contexto está siendo reconstruido o verificado | no afirmar contexto activo; bloquear mutaciones dependientes |
| `ACTIVE` | el contexto requerido está resuelto y vigente | la acción puede continuar solo si su autorización específica también permite |
| `CHANGING` | existe una transición de contexto solicitada aún no consolidada | conservar visible el contexto anterior y el cambio pendiente; no anticipar autoridad |
| `STALE` | la proyección perdió frescura suficiente | permitir únicamente comportamiento compatible con la política de frescura; revalidar antes de mutar |
| `INVALID` | el contexto es incompatible, expiró o quedó revocado | bloquear acciones dependientes y no aplicar fallback |
| `UNAVAILABLE` | no puede obtenerse una dimensión necesaria o su fuente | declarar indisponibilidad y bloquear las acciones que la requieren |

Ningún estado de frescura sustituye el estado empresarial del proceso, recurso, pedido, lote, turno, movimiento o caso mostrado por la aplicación.

---

#### 7. Matriz por aplicación

| Aplicación | Pantallas canónicas heredadas | Cantidad | Proyección contextual mínima por aplicación | Distinción obligatoria |
| --- | --- | ---: | --- | --- |
| `shell` | `VSCREEN-0001..0006`; `VSCREEN-0175` | 7 | actor; carril; aplicación activa; sede operativa o alcance administrativo cuando aplique; rol efectivo; estado y frescura; dispositivo o simulación cuando sean materiales | SHELL coordina entrada y navegación transversal, pero no fabrica contexto empresarial ni hereda autoridad al destino |
| `anima` | `VSCREEN-0027..0032`; `VSCREEN-0124..0131` | 14 | trabajador; jornada; sede y área cuando exista contexto operativo; rol operativo cuando aplique; turno/check-in; estado y frescura | experiencia personal laboral no equivale a administración de trabajadores; las superficies personales no inventan contexto operativo si no lo requieren |
| `viso` | `VSCREEN-0007..0026`; `VSCREEN-0113..0123` | 31 | actor; rol base o efectivo; cobertura administrativa; filtros seleccionados; delegación o simulación cuando apliquen; estado y frescura | cobertura y filtros administrativos nunca se presentan como sede o área operativa activa |
| `nexo` | `VSCREEN-0033..0054`; `VSCREEN-0132..0144`; `VSCREEN-0176..0177` | 37 | actor; sede; área o estación; rol; turno/check-in cuando apliquen; territorio del recurso; estado y frescura | ubicación, sede activa, destino logístico y territorio del recurso permanecen separados; procesos multiterritorio muestran extremos relevantes |
| `fogo` | `VSCREEN-0055..0067`; `VSCREEN-0173..0174` | 15 | actor; sede; área productiva o estación; rol; turno/check-in cuando apliquen; lote, orden o recurso productivo material; estado y frescura | área productiva activa no se deduce del equipo ni del recetario; cambiar área revalida contexto antes de mutar |
| `origo` | `VSCREEN-0068..0079`; `VSCREEN-0145..0146` | 14 | actor; carril; sede receptora cuando la etapa sea operativa o cobertura administrativa cuando sea de compra; rol; recurso de compra; estado y frescura | recepción física y trabajo administrativo de compra no comparten por defecto el mismo territorio ni la misma jornada |
| `pulso` | `VSCREEN-0080..0093`; `VSCREEN-0147..0152` | 20 | actor; sede comercial; punto o estación cuando aplique; rol; jornada/check-in cuando la acción sea operativa; recurso comercial; estado y frescura | sede, punto de operación, sesión técnica y actor humano permanecen separados |
| `numera` | `VSCREEN-0094..0106`; `VSCREEN-0153..0159` | 20 | actor; entidad; periodo; alcance financiero; rol; filtros; estado y frescura | no se inventan sede, área, turno o check-in operativos para una superficie financiera administrativa que no los requiera |
| `pass` | `VSCREEN-0107..0112`; `VSCREEN-0160..0172` | 19 | cliente; negocio, pedido, compra o servicio consultado cuando aplique; estado de sesión y frescura necesarios para la experiencia | PASS conserva identidad cliente; no muestra contexto laboral, rol operativo, turno o check-in como si el cliente fuera trabajador |
| `aura` | ninguna pantalla `VSCREEN-*` admitida | 0 | marca o campaña, alcance y rol autorizado cuando exista una superficie canónica futura | la aplicación permanece canónica pero diferida; no se fabrican pantallas, rutas ni contexto físico para aparentar materialización |
| **Total** | `VSCREEN-0001..0177` según asignación canónica, con rangos no semánticos | **177** | **177 pantallas ya admitidas quedan cubiertas por la regla de su aplicación propietaria; `aura` conserva cobertura explícita con 0 pantallas** | **0 pantallas reasignadas; 0 aplicaciones omitidas** |

Los rangos anteriores documentan el lote heredado; no reservan futuros IDs por aplicación y no convierten el identificador `VSCREEN-*` en semántica de contexto.

---

#### 8. Vinculación determinista con superficies

Para cada `VSCREEN-*` existente:

```text
VSCREEN
  -> APPLICATION_CODE heredado de SCREEN-CANONICAL-CATALOG-001
  -> CONTEXT_PROJECTION_PROFILE(application_code)
  -> CLASIFICACION / ACCION / PRERREQUISITOS heredados
  -> DIMENSIONES CONTEXTUALES MATERIALMENTE APLICABLES
  -> PRESENTACION HUMANA
```

Reglas:

1. Las 177 pantallas ya canónicas conservan exactamente su `application_code`.
2. La tarea no crea una segunda identidad de pantalla y no usa la ruta como join.
3. El perfil de aplicación no concede permiso y no reemplaza la clasificación funcional de la pantalla.
4. Una pantalla administrativa dentro de una aplicación operativa conserva semántica administrativa y no recibe por herencia un turno o área operativa ficticios.
5. Una pantalla operativa exige las dimensiones contextuales que su acción y contratos requieran, aunque otra pantalla de la misma aplicación no las necesite.
6. Las superficies cross-app revalidan el contexto en la aplicación destino.
7. `aura` conserva una fila de aplicación con cero pantallas hasta que una tarea propietaria admita una identidad canónica real.

Reconciliación:

| Control | Resultado |
| --- | ---: |
| Aplicaciones canónicas esperadas | **10** |
| Aplicaciones materializadas en el registro | **10** |
| Aplicaciones con `VSCREEN-*` admitidas | **9** |
| Aplicaciones canónicas diferidas sin pantalla | **1** |
| Pantallas canónicas esperadas | **177** |
| Pantallas cubiertas por vínculo de aplicación | **177** |
| Pantallas reasignadas por esta tarea | **0** |
| Aplicaciones omitidas | **0** |
| Nuevas identidades de pantalla | **0** |
| Nuevas fuentes de autoridad | **0** |

---

#### 9. Presentación persistente y adaptación por dispositivo

La persistencia expresa disponibilidad perceptible del contexto material, no una geometría única para todas las aplicaciones.

| Superficie | Regla documental |
| --- | --- |
| escritorio | contexto material en encabezado, barra o región persistentemente accesible durante la acción; detalle ampliable sin ocultar el resumen |
| tablet | resumen persistente con actor, territorio y rol suficientes para evitar atribución ambigua; detalle inmediato cuando existan más dimensiones |
| móvil | versión compacta recurrente en la parte superior o región equivalente y acceso de una acción al detalle; no relegar todo al perfil |
| kiosco / estación compartida | estación o dispositivo, territorio, actor humano y rol operativo visibles y separados cuando apliquen; ausencia de actor no se presenta como sesión laboral válida |

El diseño físico de componentes, tamaños, tokens, breakpoints, iconografía y copy final permanece fuera del alcance documental de esta tarea y se materializa posteriormente en las unidades físicas correspondientes.

---

#### 10. Cambios de contexto

Cambiar una dimensión material seguirá la secuencia vinculante:

```text
SOLICITUD DE CAMBIO
  -> VALIDAR ELEGIBILIDAD
  -> REVISAR TRABAJO, BORRADORES, CLAIMS Y CUSTODIA INCOMPATIBLES
  -> CONFIRMAR EFECTO CUANDO CORRESPONDA
  -> RESOLVER NUEVO CONTEXTO EN FUENTE AUTORITATIVA
  -> INVALIDAR PROYECCIONES DEL CONTEXTO ANTERIOR
  -> PUBLICAR NUEVA PROYECCION VISIBLE
  -> REVALIDAR LA ACCION / REANUDAR / REDIRIGIR
```

Durante `CHANGING` no se sustituye anticipadamente el contexto vigente por el solicitado. Si la transición falla, la interfaz conserva el último contexto autoritativamente válido o pasa a `INVALID`/`UNAVAILABLE`; no fabrica un contexto intermedio.

Un cambio material invalida controles, acciones y confirmaciones que dependan del contexto anterior. Un borrador conservable mantiene referencia a su contexto de origen y deberá revalidarse o migrarse explícitamente antes de confirmarse.

---

#### 11. Handoff entre aplicaciones

Los saltos desde SHELL, notificaciones, deep links o una aplicación propietaria hacia otra aplicación transportan únicamente referencias seguras suficientes para localizar el destino.

La aplicación destino deberá reconstruir y revalidar, según corresponda:

- actor;
- rol efectivo;
- sede y área;
- turno y check-in;
- dispositivo o estación;
- delegación o simulación;
- territorio del recurso;
- frescura;
- permiso y autorización específicos de la operación.

Queda prohibido transportar como autoridad mediante URL, query param, estado local o payload de navegación:

- un rol efectivo impuesto;
- una sede o área declaradas como activas;
- un permiso concedido;
- una decisión de autorización;
- un estado objetivo de negocio;
- un actor autoritativo.

El retorno conserva referencias de continuidad, no una autorización congelada.

---

#### 12. Dispositivos compartidos, administración y simulación

##### 12.1. Dispositivo compartido

Se mantienen separados:

```text
TERMINAL TECNICO
ESTACION / TERRITORIO
ACTOR HUMANO
ROL OPERATIVO
TURNO
CHECK-IN
CONTEXTO DE TAREA
```

Sin actor humano válido puede mostrarse contexto mínimo de estación, pero las mutaciones personales o atribuibles permanecen bloqueadas. Cambiar actor invalida datos, búsquedas, borradores, claims y proyecciones incompatibles del actor previo conforme a los contratos propietarios.

##### 12.2. Superficie administrativa

Empresa, cobertura, población, periodo y filtros pueden formar parte de la proyección administrativa. Ninguno se presenta como contexto operativo activo si no existe una resolución operativa independiente.

##### 12.3. Simulación y delegación

Esta tarea exige que su existencia sea una dimensión disponible para la proyección cuando modifique la interpretación del contexto. `AUTH-UI-047` conserva la responsabilidad exclusiva de definir cómo el rol simulado debe mostrarse claramente y diferenciarse del rol real; `AUTH-UI-046` no absorbe ese diseño.

---

#### 13. Seguridad, privacidad y accesibilidad

1. El contexto visible usa etiquetas humanas y minimización; no expone documentos, correo, teléfono, UUID, tokens, permisos internos ni datos del actor previo como identificadores ordinarios.
2. La presencia de una dimensión en la interfaz no concede lectura ni mutación sobre esa dimensión.
3. La presentación no depende exclusivamente de color, icono, hover, sonido o vibración.
4. Un cambio material de contexto debe poder anunciarse de forma perceptible sin generar ruido continuo.
5. Los bloqueos críticos de contexto conservan una ruta accesible hacia la explicación o recuperación definida por las tareas posteriores.
6. La aplicación no descarga datos sensibles solo para decidir después ocultarlos mediante presentación.
7. La falta de contexto no se transforma en pantalla vacía que afirme ausencia de trabajo.
8. Un estado `STALE`, `INVALID` o `UNAVAILABLE` no se oculta para mantener continuidad visual aparente.

---

#### 14. Fronteras con tareas posteriores

Esta tarea no absorbe:

- `AUTH-UI-047`: semántica y tratamiento visible específico del rol simulado;
- `AUTH-UI-048..051`: mensajes, bloqueo, recuperación y estados de error de interfaz más allá de la clasificación mínima de frescura contextual;
- `AUTH-UI-052..054`: simplificación de flujos frecuentes, navegación y priorización posterior;
- `AUTH-UI-055..060`: componentes reutilizables, accesibilidad final, prototipos, pruebas con usuarios y aprobación UX;
- tareas de `AUTH-CTX-*`, `AUTH-SRV-*`, `AUTH-DB-*`, `AUTH-DEV-*` o `AUTH-SIM-*`: resolución física o técnica de contexto, autorización, dispositivos o simulación;
- tareas propietarias de cada aplicación: implementación concreta del header, barra, selector, store, hook, endpoint, cache, listener o componente equivalente;
- publicación de nuevas pantallas de `aura`;
- cambios al catálogo de permisos, al catálogo de pantallas o a la propiedad de una pantalla existente.

La materialización física posterior debe consumir este contrato sin convertirlo en una implementación global única: la topología vigente exige instancias por `implementation_unit_id`.

---

#### 15. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Requisitos creados: `0`
Requisitos modificados: `0`

Justificación: el comportamiento de contexto activo, su fuente autoritativa, dimensiones, cambios, estados, cross-app, dispositivos, privacidad, accesibilidad, frescura y migración ya está protegido por requisitos de UX aprobados. Esta tarea materializa la decisión por aplicación y no cambia el comportamiento protegido ni introduce una obligación adicional que requiera una nueva fila del registro.

---

#### 16. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificación del registro, la cobertura aprobada de `TREQ-UX-077` a `TREQ-UX-096`, que protege el contrato completo de contexto activo definido por `UX-BASE-005` y asigna explícitamente responsabilidades a `AUTH-UI-046` en fuente autoritativa, distinciones territoriales, unidad mínima, turno/check-in, múltiples asignaciones, handoff cross-app y persistencia responsive.

Como trazabilidad complementaria ya existente, `TREQ-UX-216` protege actor y contexto en tablet/kiosco compartido y `TREQ-UX-308` protege etiquetas humanas diferenciadas para rol, sede, área, turno, check-in, simulación y delegación. Estas referencias no constituyen creación ni modificación de requisitos.

---

#### 17. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | la tarea es documental; compilación y batería del checkout deben ejecutarse después de insertar y formatear el artefacto |
| LOCAL | `NOT_EXECUTED` | no se ejecutaron validadores contra el worktree local del usuario |
| REMOTA | `NOT_EXECUTED` | se auditó el repositorio canónico vigente para diseñar la tarea, pero no se ejecutó una validación remota del resultado materializado |
| OPERATIVA | `NOT_APPLICABLE` | esta tarea no ejecuta piloto ni uso real; esa evidencia pertenece a materialización y validación UX posteriores |
| FÍSICA | `NOT_APPLICABLE` | no se modifican dispositivos, aplicaciones desplegadas, Supabase, infraestructura ni estaciones |

La auditoría documental previa verificó coherencia entre continuidad, topología, catálogo de aplicaciones, catálogo de pantallas, contrato UX activo y registro de requisitos existente. Esa auditoría no se declara como ejecución de los gates del repositorio.

---

#### 18. Criterios de aceptación

- [ ] existen exactamente diez filas de aplicación: `shell`, `anima`, `viso`, `nexo`, `fogo`, `origo`, `pulso`, `numera`, `aura` y `pass`;
- [ ] las nueve aplicaciones con pantallas conservan exactamente 177 `VSCREEN-*` ya admitidas y ninguna pantalla cambia de aplicación;
- [ ] `aura` queda explícitamente representada con cero pantallas canónicas sin inventar una superficie;
- [ ] toda superficie material puede proyectar contexto efectivo desde fuente autoritativa;
- [ ] aplicación, ruta, menú, query param, cookie, localStorage o último valor usado no fabrican contexto;
- [ ] sede asignada, sede activa, filtro administrativo y territorio del recurso permanecen diferenciados;
- [ ] área asignada, área activa y estación permanecen diferenciadas cuando corresponda;
- [ ] turno programado, turno vigente y check-in permanecen diferenciados;
- [ ] rol base, rol operativo, delegación y simulación no se colapsan en una única etiqueta ambigua;
- [ ] PASS no hereda contexto laboral y NUMERA no inventa contexto operativo inexistente;
- [ ] las superficies administrativas no transforman filtros en autoridad operativa;
- [ ] los estados `RESOLVING`, `ACTIVE`, `CHANGING`, `STALE`, `INVALID` y `UNAVAILABLE` conservan su semántica;
- [ ] un cambio material invalida acciones y proyecciones incompatibles antes de reanudar;
- [ ] los handoffs cross-app transportan referencias y revalidan contexto en destino;
- [ ] la presentación permanece perceptible en escritorio, tablet, móvil y kiosco según el dispositivo aplicable;
- [ ] dispositivo técnico y actor humano permanecen separados en estaciones compartidas;
- [ ] no se crean permisos, pantallas, rutas, contextos o requisitos de prueba por inferencia;
- [ ] la responsabilidad visual específica del rol simulado permanece reservada a `AUTH-UI-047`;
- [ ] la materialización física permanece diferida a instancias `PER_IMPLEMENTATION_UNIT`;
- [ ] el registro 04A permanece sin cambios.

---

#### 19. Límites

`AUTH-UI-046` define qué contexto debe poder reconocerse en cada aplicación y cómo se conserva la semántica transversal al proyectarlo. No define un componente universal, no impone una arquitectura frontend única, no publica cambios físicos y no reemplaza los contratos propietarios de contexto o autorización.

Una implementación posterior podrá variar layout, componente, framework o mecanismo de transporte siempre que preserve:

- fuente autoritativa;
- identidad del actor;
- distinciones territoriales y administrativas;
- semántica de turno/check-in;
- rol efectivo;
- dispositivo y simulación cuando apliquen;
- frescura;
- fail-closed;
- revalidación cross-app;
- privacidad y accesibilidad;
- trazabilidad del cambio de contexto.

No se permite reducir el contrato para hacer coincidir una implementación legacy. Una discrepancia física deberá corregirse en la instancia propietaria correspondiente, no redefiniendo el significado de contexto en esta tarea.

---

#### 20. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-045 — Unificar navegación y autorización`

**TAREA ACTUAL APROBADA**
`AUTH-UI-046 — Mostrar contexto activo en cada aplicación`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-047 — Mostrar rol simulado claramente`


### ✅ AUTH-UI-047 — Mostrar rol simulado claramente

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-046 — Mostrar contexto activo en cada aplicación
**Tarea siguiente:** AUTH-UI-048 — Estandarizar estados sin acceso
**Tipo de tarea:** definición documental transversal de semántica visible del rol simulado y separación inequívoca respecto del actor, rol y autoridad reales; materialización física posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT`
**Bloque:** `BLOQUE I — Protección y estados de interfaz`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, componentes, rutas, Supabase, RLS, RPC, permisos, sesiones, cookies, claims, datos, catálogos, despliegues ni configuración de aplicaciones
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir una presentación inequívoca del rol simulado en cualquier superficie afectada por una simulación de autorización, de modo que la persona pueda reconocer simultáneamente:

- que se encuentra en un escenario hipotético;
- qué rol exacto está siendo representado;
- si el rol objetivo pertenece al catálogo `BASE` o `OPERATIONAL`;
- que el actor humano, la sesión y la autoridad reales continúan siendo los del solicitante;
- que un resultado hipotético no concede acceso, no ejecuta acciones y no reemplaza el contexto real;
- qué dimensiones adicionales del escenario siguen siendo necesarias para interpretar el rol operativo simulado.

La tarea desarrolla únicamente la semántica y la obligación de presentación del rol. No crea una identidad de usuario simulada, no realiza impersonación y no convierte la vista previa en una sesión empresarial ejecutable.

```text
ACTOR REAL
+
ROL REAL
+
ROL OBJETIVO SIMULADO TIPADO
+
CONTEXTO HIPOTETICO
+
RESULTADO HIPOTETICO
=
PRESENTACION EXPLICATIVA DE SIMULACION

PRESENTACION EXPLICATIVA
!=
AUTORIDAD REAL
```

---

#### 2. Fuentes y handoff consumidos

La tarea consume sin redefinir:

- `AUTH-UI-046` y `APPLICATION-ACTIVE-CONTEXT-PRESENTATION-REGISTER-001`, que exigen que la simulación sea una dimensión disponible del contexto visible y reservan a esta tarea su tratamiento visual específico;
- `UX-BASE-005` y `UX-ACTIVE-CONTEXT-VISIBILITY-CONTRACT-001`, que separan rol base, rol operativo, delegación, simulación y rol de navegación, y exigen que la simulación permanezca perceptible en las superficies afectadas;
- `AUTH-SIM-001`, que separa solicitante humano real, sesión real, objetivo simulado y autoridad ejecutable;
- `AUTH-SIM-002`, `SIMULATABLE-ROLE-CONTRACT-001` y `SIMULATABLE-ROLE-REGISTER-001`, que definen referencias de rol tipadas, ocho roles base canónicos, doce roles operativos canónicos y estados cerrados de disponibilidad del objetivo;
- `AUTH-SIM-003..005`, que completan sede, área, turno y check-in hipotéticos cuando una evaluación operacional los exige;
- `AUTH-SIM-006`, que mantiene separados los planos real y simulado y limita el resultado hipotético a `WOULD_ALLOW`, `WOULD_DENY` o `INDETERMINATE` con `executable = false`;
- `AUTH-UI-037`, que ya prohíbe usar simulación como bypass de autoridad;
- el catálogo de aplicaciones y pantallas consumido por `AUTH-UI-046`.

Handoff principal:

```text
AUTH-UI-046
CONTEXTO ACTIVO VISIBLE
        ↓
AUTH-UI-047
ROL SIMULADO INEQUIVOCO
        ↓
AUTH-UI-048..051
ESTADOS DE BLOQUEO, CARGA, VACIO Y RECUPERACION
```

La existencia del rol simulado no reemplaza ninguna dimensión resuelta por `AUTH-UI-046`; únicamente añade la representación explícita del escenario hipotético cuando corresponde.

---

#### 3. Resultado material

Se definen dos artefactos documentales vinculantes:

1. `SIMULATED-ROLE-VISIBILITY-CONTRACT-001`, que fija separación de identidades, gramática visible, reglas por tipo de rol, comportamiento ante estados inválidos, accesibilidad, minimización y fronteras con simulación física;
2. `SIMULATED-ROLE-PRESENTATION-REGISTER-001`, que materializa una decisión de presentación para las veinte identidades de rol canónicamente simulables definidas por `AUTH-SIM-002`.

El contrato no replica el catálogo de roles. Cada fila conserva la referencia tipada propietaria y consume sus decisiones de versión, sensibilidad, disponibilidad y completitud.

Campos mínimos del registro:

| Campo | Regla |
| --- | --- |
| `simulated_role_reference` | referencia exacta y tipada `BASE/<role_code>` u `OPERATIONAL/<role_code>` |
| `role_kind` | `BASE` u `OPERATIONAL`; nunca se infiere desde el texto |
| `canonical_role_status` | consume la decisión del contrato de simulación; esta tarea no la redefine |
| `runtime_role_status` | consume el estado vigente del objetivo; solo un objetivo disponible puede presentarse como simulación activa |
| `human_role_label` | etiqueta humana de la identidad exacta; el código técnico no es contenido principal |
| `simulation_marker_required` | siempre verdadero cuando una simulación aceptada afecta la superficie |
| `real_identity_context_required` | siempre verdadero; la simulación no oculta la existencia del actor real |
| `operational_context_required` | verdadero cuando la acción simulada necesita sede, área, turno, check-in u otra dimensión operacional |
| `hypothetical_result_label` | separa `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE` de cualquier decisión real |
| `execution_affordance` | siempre no ejecutable dentro de la vista previa simulada |
| `source_contract` | `AUTH-SIM-002` y contratos de contexto aplicables |
| `physical_materialization` | diferida a la instancia física propietaria por `implementation_unit_id` |

---

#### 4. Separación obligatoria de identidades

La presentación deberá conservar simultáneamente los siguientes planos cuando existan:

| Plano | Identidad | Regla visible |
| --- | --- | --- |
| actor real | persona humana autenticada que solicita la simulación | permanece atribuible y no es reemplazada por el sujeto o rol simulado |
| rol base real | rol base efectivo del actor real | no se renombra como el rol objetivo |
| rol operativo real | rol operativo vigente del actor real cuando exista | no se presta al escenario hipotético |
| rol base simulado | referencia `BASE/...` seleccionada y aceptada | se etiqueta expresamente como rol simulado |
| rol operativo simulado | referencia `OPERATIONAL/...` seleccionada y aceptada | se etiqueta expresamente como rol operativo simulado y exige contexto hipotético suficiente |
| rol de navegación | recorte técnico o legacy de interfaz | no se presenta como rol laboral real ni simulado |
| sujeto simulado | sujeto hipotético o tercero explícito, cuando aplique | nunca sustituye visualmente al actor real |

Invariantes:

```text
ROL SIMULADO != ROL REAL
ROL SIMULADO != ACTOR REAL
ROL SIMULADO != ROL DE NAVEGACION
ROL SIMULADO != PERMISO
ROL SIMULADO != SESION
ROL SIMULADO != IMPERSONACION
WOULD_ALLOW != ALLOW
WOULD_DENY != DENY REAL
INDETERMINATE != PERMITIDO
```

Una interfaz que muestre únicamente el nombre del rol objetivo sin declarar que es simulado incumple esta tarea.

---

#### 5. Gramática visible mínima

Cuando una simulación aceptada afecte la superficie, la interfaz deberá exponer de forma perceptible, sin depender solo de color o iconografía:

1. un indicador explícito de que existe simulación;
2. la etiqueta humana del rol objetivo;
3. el tipo del rol cuando sea necesario para evitar ambigüedad entre `BASE` y `OPERATIONAL`;
4. la separación respecto de la identidad o contexto real del solicitante;
5. las dimensiones hipotéticas requeridas por el escenario, sin presentarlas como contexto real;
6. el resultado hipotético, cuando exista, identificado como vista previa no ejecutable.

`UX-BASE-005` ya fija como referencia humana mínima la estructura:

```text
SIMULACIÓN ACTIVA
Viendo como: Supervisor de Vento Café
No estás actuando con el contexto real de tu cuenta
```

La materialización física podrá adaptar longitud y composición al dispositivo, pero deberá conservar esas tres ideas semánticas: **modo simulado**, **rol objetivo** y **separación de la cuenta/contexto real**.

Queda prohibido usar como contenido principal:

- `role_code`;
- `navigation_role`;
- UUID;
- claves de permisos;
- nombres de tablas;
- claims;
- nombres de funciones, RPC o helpers;
- un badge sin texto equivalente;
- una diferencia únicamente cromática.

---

#### 6. Estados del objetivo y regla de presentación

Los estados definidos por `AUTH-SIM-002` gobiernan si el rol puede mostrarse como objetivo activo:

| Estado del objetivo | Presentación permitida |
| --- | --- |
| `SIMULABLE + AVAILABLE` | puede presentarse como rol simulado activo únicamente dentro de una simulación aceptada y vigente |
| `SIMULABLE + BLOCKED_NOT_MATERIALIZED` | no se presenta como simulación activa; conserva el bloqueo de materialización |
| `NOT_SIMULABLE + BLOCKED_LEGACY` | no se normaliza, renombra ni presenta como equivalente canónico |
| `NOT_SIMULABLE + BLOCKED_DEPRECATED` | no se presenta como objetivo vigente |
| `NOT_SIMULABLE + BLOCKED_INACTIVE` | no se presenta como rol activo |
| `NOT_SIMULABLE + BLOCKED_AMBIGUOUS` | no se elige un tipo o catálogo por inferencia |
| `NOT_SIMULABLE + BLOCKED_UNKNOWN` | no se fabrica etiqueta ni autoridad para el código desconocido |
| `BLOCKED_VERSION_MISMATCH` | no se presenta una versión como si fuera compatible; requiere reconstrucción del escenario |

Esta tarea no define el mensaje completo de recuperación para cada bloqueo. Esa presentación deberá reutilizar las tareas de estados y errores correspondientes sin convertir un objetivo inválido en simulación activa.

---

#### 7. Matriz completa de roles base simulables

Las ocho identidades base canónicas mantienen una decisión de presentación explícita:

| Rol objetivo | Tipo visible | Tratamiento del rol simulado | Separación obligatoria |
| --- | --- | --- | --- |
| `BASE/propietario` | rol base simulado | mostrar como objetivo privilegiado únicamente cuando el contrato de simulación lo acepte | no confundir con el rol real del solicitante ni con autoridad de propietario |
| `BASE/gerente_general` | rol base simulado | mostrar la identidad exacta y su condición hipotética | no presentar alcance global por nombre del rol |
| `BASE/gerente` | rol base simulado | mostrar rol y cobertura hipotética por separado | cobertura administrativa simulada no es sede operativa real |
| `BASE/supervisor` | rol base simulado | mostrar solo cuando su estado de runtime permita construir la simulación | no sustituir un objetivo no materializado por otro rol |
| `BASE/auxiliar_administrativa` | rol base simulado | mostrar identidad funcional exacta | no derivar autoridad gerencial u operativa |
| `BASE/contador` | rol base simulado | mostrar identidad funcional sensible con minimización aplicable | no revelar datos por autoridad simulada |
| `BASE/marketing` | rol base simulado | mostrar identidad funcional exacta | no convertir capacidad de contenido en administración global |
| `BASE/trabajador_operativo` | rol base simulado | mostrar solo cuando su estado de runtime permita construir la simulación | no tratarlo como rol operativo ni inferir oficio |

La clase de sensibilidad, disponibilidad física y necesidad de reautenticación permanecen gobernadas por `AUTH-SIM-002`; esta tarea únicamente define su representación visible.

---

#### 8. Matriz completa de roles operativos simulables

Las doce identidades operativas canónicas mantienen una decisión de presentación explícita:

| Rol objetivo | Familia | Tratamiento visible | Contexto hipotético asociado |
| --- | --- | --- | --- |
| `OPERATIONAL/cajero_satelite` | Satélite | rol operativo simulado | sede, área, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/barista_satelite` | Satélite | rol operativo simulado | sede, área, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/cocinero_satelite` | Satélite | rol operativo simulado | sede, área, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/servicio_salon` | Satélite | rol operativo simulado | sede, área, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/mostrador_satelite` | Satélite | rol operativo simulado | sede, área, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/operador_integral_satelite` | Satélite | rol operativo simulado | sede, área compatible, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/produccion_cocina` | Producción | rol operativo simulado | sede, área de producción, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/produccion_panaderia` | Producción | rol operativo simulado | sede, área de producción, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/produccion_reposteria` | Producción | rol operativo simulado | sede, área de producción, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/bodeguero` | Logística | rol operativo simulado | sede, área logística, turno, permiso, recurso y check-in cuando aplique |
| `OPERATIONAL/conductor_logistica` | Logística | rol operativo simulado | sede base, itinerario o custodia, turno, permiso, recurso y check-in exigido por política |
| `OPERATIONAL/gerencia_operativa` | Coordinación operativa | rol operativo simulado | sede, área compatible, turno, permiso, recurso y check-in cuando aplique |

Un rol operativo simulado sin el contexto hipotético requerido no se presenta como capacidad ejecutable. Cuando falte una dimensión necesaria, el resultado permanece `INDETERMINATE` o el estado de bloqueo que corresponda según los contratos propietarios.

---

#### 9. Colisiones, legacy y roles híbridos

##### 9.1. Identidades bare prohibidas

La interfaz no podrá presentar una cadena bare como identidad suficiente.

```text
BASE/bodeguero
!=
OPERATIONAL/bodeguero
```

El texto visible podrá coincidir parcialmente, pero la semántica y el tipo deberán permanecer diferenciados.

##### 9.2. Legacy y deprecados

Los códigos legacy o deprecados no se transforman por semejanza textual. Una referencia bloqueada conserva su diagnóstico y no se muestra como rol simulado canónico activo.

##### 9.3. Escenarios con rol base y operativo

Cuando el escenario contenga ambos carriles, se presentan como dos referencias independientes:

```text
ROL BASE SIMULADO
+
ROL OPERATIVO SIMULADO
```

No se crea un tercer rol híbrido, no se concatenan permisos y no se muestra una etiqueta única que oculte qué carril aporta cada parte del escenario.

---

#### 10. Resultado hipotético y no ejecutabilidad

Cuando la simulación produzca una decisión explicativa, la interfaz conservará exactamente el dominio hipotético:

| Resultado | Interpretación visible |
| --- | --- |
| `WOULD_ALLOW` | el escenario hipotético permitiría la capacidad si todas sus premisas fueran reales; no autoriza ejecutar |
| `WOULD_DENY` | el escenario hipotético denegaría la capacidad; no modifica permisos reales fuera de la vista previa |
| `INDETERMINATE` | faltan datos, versiones o contexto para resolver el escenario; nunca se trata como permitido |

Reglas:

1. ningún resultado hipotético usa la palabra o estado `ALLOW` ejecutable;
2. ningún CTA de negocio se habilita por `WOULD_ALLOW`;
3. datos reales visibles continúan limitados por el actor y permisos reales;
4. salir de la vista previa obliga a una autorización real fresca antes de cualquier operación;
5. un resultado cacheado, expirado o incompatible no mantiene el rol simulado como vigente.

---

#### 11. Proyección por aplicación

`AUTH-UI-047` reutiliza las diez filas de aplicación materializadas por `AUTH-UI-046`; no reasigna pantallas ni crea una matriz de autorización paralela.

| Aplicación | Regla cuando una simulación afecta la superficie |
| --- | --- |
| `shell` | puede transportar la referencia de vista previa y mostrar el estado simulado, pero el destino reconstruye contexto y nunca hereda autoridad |
| `anima` | el rol simulado no sustituye al trabajador real, jornada, asistencia ni check-in reales |
| `viso` | puede presentar herramientas de simulación y comparación; actor real, rol objetivo y resultado hipotético permanecen separados |
| `nexo` | un rol operativo simulado muestra por separado sede, área/estación y territorio hipotéticos; inventario real sigue limitado por autoridad real |
| `fogo` | un rol productivo simulado no crea turno, check-in, área productiva, lote ni autorización de producción reales |
| `origo` | un rol simulado no concede recepción, aprobación o alcance de proveedores fuera de la autoridad real |
| `pulso` | un rol simulado no crea sesión de caja, punto, sede comercial, custodia ni capacidad de venta real |
| `numera` | un rol simulado no amplía entidad, periodo, información financiera ni capacidad de mutación real |
| `aura` | conserva cero pantallas canónicas admitidas en el catálogo consumido; esta tarea no fabrica una superficie de simulación |
| `pass` | una simulación laboral no convierte al rol simulado en identidad cliente ni amplía datos o acciones del cliente |

La presencia del indicador de simulación en una aplicación no demuestra que esa aplicación sea propietaria de la simulación ni que deba implementar una superficie propia para iniciarla.

---

#### 12. Accesibilidad, privacidad y minimización

La presentación deberá cumplir:

1. la condición simulada es comprensible sin depender de color, opacidad, icono, hover, sonido o vibración;
2. el rol objetivo y la separación del contexto real permanecen accesibles por teclado y lector de pantalla cuando la superficie sea interactiva;
3. un cambio de rol simulado produce una actualización perceptible sin repetir anuncios de forma disruptiva;
4. el rol simulado no se oculta únicamente en el menú de perfil;
5. el actor real se representa con minimización suficiente para conservar atribución sin exponer documento, correo, teléfono u otros datos innecesarios;
6. un sujeto simulado de tercero no revela identidad o información adicional si el solicitante no tiene derecho real a conocerla;
7. los datos sensibles continúan sujetos a masking y alcance reales;
8. el texto visible no se usa como fuente de autorización ni como identificador técnico.

---

#### 13. Fronteras con tareas posteriores y con BLOQUE Q

Esta tarea no absorbe:

- `AUTH-UI-048`: taxonomía y presentación transversal de estados sin acceso;
- `AUTH-UI-049`: estados de carga;
- `AUTH-UI-050`: estados vacíos;
- `AUTH-UI-051`: errores recuperables;
- `AUTH-SIM-007`: diseño y lifecycle del aviso persistente transversal de simulación;
- `AUTH-SIM-008..009`: auditoría de inicio y salida de simulación;
- `AUTH-SIM-010`: bloqueo físico de acciones críticas durante simulación;
- `AUTH-SIM-011`: modo físico solo lectura;
- `AUTH-SIM-012..014` y `AUTH-QA-019`: validación integral y pruebas de simulación;
- tareas propietarias de cada aplicación: componentes, stores, hooks, layouts, rutas, server actions o bindings concretos;
- cambios físicos en catálogos, base de datos, sesiones o contratos compartidos.

La obligación de que el rol simulado sea inequívoco es inmediata en el contrato documental. El componente concreto, su ubicación, persistencia técnica, lifecycle y pruebas pertenecen a las instancias físicas y tareas propietarias posteriores.

---

#### 14. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la obligación de separar rol real, rol operativo, delegación, simulación, actor y contexto ya está protegida por requisitos canónicos vigentes provenientes de los contratos UX y de simulación. Esta tarea materializa la presentación documental de esa cobertura sin cambiar una regla protegida, prioridad, modalidad, propietario, paquete, estado, evidencia o relación del registro 04A.

---

#### 15. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro 04A, la cobertura existente que protege:

- visibilidad persistente y diferenciada de rol base, rol operativo, delegación y simulación;
- separación entre actor real, rol objetivo simulado y autoridad ejecutable;
- identidad tipada del rol objetivo y rechazo de roles legacy, deprecados, desconocidos o ambiguos;
- no ejecutabilidad de navegación y controles simulados;
- separación de contexto real y simulado en sesión, permisos, datos, caché y endpoints;
- visibilidad de actor, rol y contexto en dispositivos compartidos;
- etiquetas humanas diferenciadas para rol base, rol operativo, simulación y delegación.

Trazabilidad vigente reutilizada: `TREQ-UX-080`, `TREQ-UX-216`, `TREQ-UX-308`, `TREQ-AUTH-073`, `TREQ-AUTH-076`, `TREQ-AUTH-119..127`.

---

#### 16. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| `BUILD` | `NOT_EXECUTED` | la tarea no ha sido insertada ni compilada todavía en el checkout del usuario |
| `LOCAL` | `NOT_EXECUTED` | no se han ejecutado formateo, quality, delivery check ni batería local sobre el archivo propietario modificado |
| `REMOTA` | `NOT_EXECUTED` | no existe cierre documental, PR ni validación remota de `AUTH-UI-047` |
| `OPERATIVA` | `NOT_APPLICABLE` | la tarea define semántica documental y no ejecuta una sesión real de simulación |
| `FÍSICA` | `NOT_APPLICABLE` | no se modifica código, infraestructura, Supabase, dispositivo, UI desplegada ni datos |

---

#### 17. Criterios de aceptación

- [ ] Se distingue inequívocamente rol simulado, rol real, actor real y rol de navegación.
- [ ] Se conserva `BASE` frente a `OPERATIONAL` sin inferencia por texto.
- [ ] Las veinte identidades de rol simulables de `AUTH-SIM-002` tienen decisión de presentación.
- [ ] Los ocho roles base canónicos están cubiertos sin faltantes ni duplicados.
- [ ] Los doce roles operativos canónicos están cubiertos sin faltantes ni duplicados.
- [ ] Un objetivo bloqueado, legacy, deprecado, inactivo, ambiguo, desconocido o con versión incompatible no se presenta como simulación activa.
- [ ] `BASE/bodeguero` y `OPERATIONAL/bodeguero` permanecen diferenciados.
- [ ] Un escenario base + operativo no crea un rol híbrido ni une permisos indiscriminadamente.
- [ ] `WOULD_ALLOW`, `WOULD_DENY` e `INDETERMINATE` permanecen resultados hipotéticos no ejecutables.
- [ ] El actor y la autoridad reales permanecen identificables y no son sustituidos por el sujeto simulado.
- [ ] Las diez aplicaciones consumidas por `AUTH-UI-046` conservan una regla explícita de proyección cuando la simulación las afecta.
- [ ] `aura` conserva cero pantallas canónicas admitidas y no recibe una superficie inventada.
- [ ] `pass` conserva identidad cliente separada de cualquier simulación laboral.
- [ ] La presentación es accesible y no depende únicamente de color o iconografía.
- [ ] La tarea no absorbe el aviso persistente y lifecycle de `AUTH-SIM-007`.
- [ ] La tarea no absorbe los estados sin acceso de `AUTH-UI-048`.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se modifica 04A.
- [ ] No se autoriza materialización física.

---

#### 18. Límites

`AUTH-UI-047` no:

- inicia una simulación;
- decide quién puede simular;
- modifica los veinte roles simulables;
- materializa roles ausentes;
- crea aliases para roles legacy;
- decide sede, área, turno o check-in simulados;
- mezcla permisos reales y simulados;
- crea una sesión o identidad de impersonación;
- cambia JWT, cookies, claims o `localStorage`;
- habilita navegación o acciones empresariales reales mediante `WOULD_ALLOW`;
- crea componentes, banners, headers, badges, layouts o stores físicos;
- define la implementación completa del aviso persistente de `AUTH-SIM-007`;
- define mensajes de no acceso, carga, vacío o recuperación reservados a `AUTH-UI-048..051`;
- modifica Supabase, RLS, RPC, datos, catálogos, rutas o despliegues;
- modifica requisitos existentes del registro 04A;
- inicia ni autoriza una instancia física.

La materialización posterior conserva la topología `PER_IMPLEMENTATION_UNIT` de la etapa documental vigente.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-046 — Mostrar contexto activo en cada aplicación`

**TAREA ACTUAL APROBADA**
`AUTH-UI-047 — Mostrar rol simulado claramente`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-048 — Estandarizar estados sin acceso`


### ✅ AUTH-UI-048 — Estandarizar estados sin acceso

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-047 — Mostrar rol simulado claramente
**Tarea siguiente:** AUTH-UI-049 — Estandarizar estados de carga
**Tipo de tarea:** definición documental transversal de presentación de estados sin acceso; materialización física posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT`
**Bloque:** `BLOQUE I — Protección y estados de interfaz`
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, componentes, rutas, Supabase, RLS, RPC, permisos, datos, mensajes desplegados, aplicaciones ni configuración
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Estandarizar cómo Vento OS presenta una condición de **sin acceso** cuando una superficie o acción protegida no puede continuar por una decisión autoritativa de autenticación, autorización o contexto, sin convertir la interfaz en fuente de autoridad y sin mezclar una denegación con carga, ausencia de datos o fallo técnico.

La regla transversal queda:

```text
DECISION AUTORITATIVA DE ACCESO
        ↓
CAUSA ESTRUCTURADA Y SEGURA
        ↓
CLASIFICACION BLOCKED O DENIED CUANDO CORRESPONDA
        ↓
PRESENTACION HUMANA ESTANDAR
        ↓
ACCION SIGUIENTE SEGURA O ESCALAMIENTO

PRESENTACION UI != DECISION DE AUTORIZACION
MENSAJE != PERMISO
OCULTAR != DENEGAR
DESHABILITAR != PROTEGER
```

Esta tarea no crea nuevos motivos de denegación. Consume las causas canónicas ya definidas y estandariza su proyección visual.

---

#### 2. Fuentes y handoff consumidos

La tarea consume, sin redefinir:

- `AUTH-UI-040..045`, que separan navegación, acceso directo, acciones visibles y autorización autoritativa;
- `AUTH-UI-046`, que exige mantener visible el contexto activo y distinguir estados de resolución o invalidez;
- `AUTH-UI-047`, que fija la separación perceptible entre rol real y rol simulado;
- `UX-BASE-003`, que separa texto humano, estado interno, ruta y permiso;
- `UX-BASE-004`, que distingue autorización, relevancia, visibilidad, habilitación y estados vacíos;
- `UX-BASE-005`, que define contexto autoritativo, ausencia de fallbacks y tratamiento de contexto inválido o no resuelto;
- `UX-BASE-006`, que define la taxonomía transversal `BLOCKED`, `DENIED`, `WAITING`, `CONFLICT`, `TECHNICAL_FAILURE`, `VALIDATION_REQUIRED`, `WARNING` e `INFO`, junto con anatomía, recuperación, privacidad y accesibilidad del mensaje;
- `AUTH-ERR-001..020`, que ya poseen las causas y contratos canónicos de bloqueo, denegación, configuración y separación frente a errores técnicos;
- las diez aplicaciones canónicas ya reconciliadas por el mini-bloque: `shell`, `anima`, `viso`, `nexo`, `fogo`, `origo`, `pulso`, `numera`, `aura` y `pass`.

El handoff de `AUTH-UI-047` permanece intacto: cuando exista simulación, el estado de acceso deberá conservar actor y rol reales diferenciados del rol hipotético. Un escenario simulado no modifica la decisión real ni la semántica de una denegación real.

---

#### 3. Resultado material

Queda definido un estándar documental transversal de presentación de **sin acceso** aplicable a las superficies protegidas de las diez aplicaciones canónicas.

El estándar exige que cada estado de sin acceso conserve simultáneamente:

| Dimensión | Regla |
| --- | --- |
| fuente | decisión autoritativa o contrato canónico; nunca copy, ruta o estado local inventado |
| clasificación | conservar `BLOCKED` y `DENIED` como categorías distintas cuando así lo determine la causa |
| título humano | describir la situación sin código interno como contenido principal |
| causa segura | explicar únicamente la frontera que el actor necesita conocer |
| efecto | indicar qué superficie, acción o continuación queda bloqueada sin revelar recursos no autorizados |
| contexto conservado | mantener visibles las dimensiones materiales que siguen siendo válidas |
| acción siguiente | ofrecer solo una recuperación que el actor pueda ejecutar legítimamente |
| escalamiento | identificar clase de responsable o canal cuando el actor no pueda resolver la causa |
| referencia | permitir una referencia segura de soporte cuando sea necesaria, sin exponer secretos ni trazas técnicas |
| accesibilidad | mantener percepción, lectura y navegación sin depender únicamente de color, icono, hover, sonido o vibración |
| revalidación | toda recuperación o reapertura vuelve a consultar la fuente autoritativa |

No se crea un enum nuevo ni se renombran reason codes existentes. La semántica procede de los contratos propietarios y la UI solo la proyecta.

---

#### 4. Frontera cerrada entre estados

La experiencia deberá distinguir de forma determinista:

| Condición observada | Tratamiento | Regla |
| --- | --- | --- |
| la autoridad confirmó que el actor no puede acceder | `DENIED` | presentar sin acceso y no ofrecer bypass |
| falta una precondición o contexto resoluble que impide continuar | `BLOCKED` | presentar bloqueo y la condición segura de salida |
| la autorización o el contexto todavía se están resolviendo | no es sin acceso todavía | corresponde a `AUTH-UI-049`; no anticipar una denegación |
| el actor sí puede leer pero el conjunto autorizado contiene cero elementos | no es sin acceso | corresponde a `AUTH-UI-050` |
| existe fallo técnico, timeout, dependencia caída o resultado incierto | no es denegación | corresponde a `AUTH-UI-051` y al contrato técnico aplicable |
| existe espera empresarial o de handoff | `WAITING`, no denegación | conservar propietario, condición y siguiente revisión |
| existe conflicto concurrente | `CONFLICT`, no denegación por defecto | bloquear mutación y conservar recuperación propia |
| faltan datos corregibles del formulario | `VALIDATION_REQUIRED`, no denegación por defecto | señalar la corrección accionable sin fabricar falta de permiso |
| existe advertencia o información | `WARNING` o `INFO` | no convertirla en bloqueo si el contrato permite continuar |

Invariantes:

```text
NO_ACCESS != LOADING
NO_ACCESS != EMPTY
NO_ACCESS != TECHNICAL_FAILURE
NO_ACCESS != RESULT_UNKNOWN
NO_ACCESS != WAITING
NO_ACCESS != CONFLICT
DENIED != BLOCKED
```

Una pantalla no podrá utilizar “sin acceso” como fallback universal para cualquier resultado no exitoso.

---

#### 5. Gramática visible mínima

##### 5.1 Estado de superficie completa

Cuando la superficie completa no pueda abrirse, la presentación deberá contener, según aplique:

1. título humano inequívoco;
2. explicación segura de la causa o frontera;
3. efecto concreto sobre la superficie actual;
4. contexto que continúa vigente;
5. siguiente acción permitida;
6. escalamiento o referencia de soporte cuando no exista recuperación directa;
7. retorno seguro a una superficie autorizada cuando exista un destino contractual válido.

La superficie no debe mostrar contenido protegido detrás del mensaje ni mantenerlo accesible en DOM, caché visual, foco o regiones ocultas.

##### 5.2 Estado de acción bloqueada dentro de una superficie permitida

Cuando la lectura de la superficie sea válida pero una acción específica no lo sea:

- se preservará el contenido que el actor sí puede consultar;
- el bloqueo se asociará a la acción o región afectada;
- la explicación no convertirá un control deshabilitado en mecanismo de seguridad;
- el endpoint o comando seguirá revalidando autoridad independientemente del estado del botón;
- no se reemplazará toda la pantalla por un estado global si la restricción es exclusivamente de una acción.

##### 5.3 Entrada directa, deep link o retorno cross-app

Una entrada directa deberá revalidar en destino. Si la decisión es de sin acceso:

- el conocimiento de la URL no habilita la superficie;
- el origen no transporta autoridad;
- la pantalla no revelará título, recurso, conteo o identidad sensible que el actor no esté autorizado a conocer;
- el retorno propuesto deberá ser seguro y no depender de una URL arbitraria enviada por el cliente.

---

#### 6. Proyección de las causas canónicas

`AUTH-ERR-001..020` permanece como familia propietaria de causas y contratos de bloqueo. `AUTH-UI-048` no modifica sus reason codes, precedencia, HTTP, auditoría ni reglas de servidor.

La estandarización de UI agrupa su presentación únicamente por significado observable:

| Familia de causa | Presentación esperada | Prohibición |
| --- | --- | --- |
| autenticación o identidad no utilizable | indicar que se requiere recuperar o resolver identidad cuando el contrato lo permita | no presentarlo como permiso faltante inventado |
| acceso a aplicación o permiso denegado | indicar que esa capacidad no está disponible para el contexto actual | no revelar matrices, permisos de terceros ni forma de elevar privilegios |
| sede, área, turno, check-in o rol operativo incompatibles | identificar la dimensión que impide continuar y el contexto que sí permanece válido | no aplicar sede primaria, último rol, área del dispositivo ni otro fallback |
| dispositivo no autorizado | separar restricción del dispositivo de la identidad humana | no culpar al actor ni convertir el terminal en empleado |
| acción incompatible con simulación | mantener visible el plano real y el simulado y bloquear el efecto real | no convertir un resultado hipotético en autoridad |
| configuración o catálogo inconsistente | presentar indisponibilidad segura y ruta de escalamiento | no degradar el conflicto estructural a permiso faltante ni inventar configuración |
| permiso no registrado o identidad contractual no resoluble | fallar cerrado con mensaje minimizado | no sugerir un código alternativo, alias o permiso aproximado |
| error técnico frente a denegación | conservar planos separados | nunca mapear un fallo técnico a “no tienes acceso” por conveniencia de UI |
| distribución cross-app | conservar semántica equivalente y revalidar al abrir | no congelar una decisión antigua en notificación, correo o deep link |

Las aplicaciones podrán adaptar longitud, densidad o composición al dispositivo, pero no cambiar la categoría, causa, efecto o política de recuperación.

---

#### 7. Contexto, simulación y cambios materiales

Un estado de sin acceso deberá conservar las separaciones aprobadas en las tareas anteriores:

```text
ACTOR REAL
ROL REAL
ROL SIMULADO CUANDO EXISTA
SEDE / AREA / TURNO / CHECK-IN REALES
DISPOSITIVO
FRESCURA
DECISION REAL
```

Reglas:

1. si una simulación está activa, la denegación real permanece atribuida al actor real;
2. el rol simulado puede explicar un escenario, pero no corrige ni reemplaza una denegación real;
3. un cambio de actor, rol, sede, área, turno, check-in, dispositivo, delegación, simulación o permiso invalida mensajes incompatibles y obliga a revalidar;
4. un mensaje `STALE` o perteneciente al contexto anterior no podrá mantenerse como decisión vigente;
5. en dispositivos compartidos, cambiar actor limpia mensajes, referencias privadas y destinos del actor previo;
6. una ausencia de contexto no se rellenará silenciosamente con asignaciones históricas o preferencias locales.

---

#### 8. Seguridad, privacidad y antienumeración

La presentación de sin acceso deberá aplicar divulgación mínima.

No se mostrará como contenido ordinario:

- `permission_code`;
- reason codes internos cuando su exposición no sea necesaria para soporte;
- nombres de tablas, RPC, RLS, SQL, stack traces o payloads;
- UUID o identificadores internos como explicación principal;
- usuarios, roles o actores que sí poseen acceso;
- existencia, nombre, cantidad o detalle de recursos sensibles cuando la autorización no permita conocerlos;
- reglas antifraude, secretos, tokens, claims, políticas internas explotables o condiciones de bypass;
- instrucciones para elevar permisos, cambiar roles artificialmente, usar otra cuenta o reutilizar credenciales.

Cuando distinguir “no existe” de “no está autorizado” permita enumeración, la proyección visible deberá generalizar la respuesta conforme al contrato de seguridad propietario.

Una referencia de soporte podrá exponerse solo si es opaca, no secreta y suficiente para correlacionar evidencia sin revelar el detalle técnico.

---

#### 9. Recuperación y escalamiento

La acción siguiente depende de la causa autoritativa. No existe un CTA universal de reintento ni un CTA universal de “contactar administrador”.

Reglas:

1. autenticación requerida puede conducir a la recuperación de sesión definida por su contrato;
2. un contexto corregible puede ofrecer selección o resolución únicamente mediante el mecanismo autorizado;
3. una denegación estable no ofrecerá `Reintentar` como si fuera transitoria;
4. si el actor no puede resolver la causa, se mostrará la clase de responsable, condición de revisión o canal definido por el proceso;
5. no se solicitará al usuario que copie manualmente payloads, stacks, permisos o información técnica sensible;
6. una notificación o escalamiento no prueba que el problema quedó resuelto;
7. después de cualquier recuperación, la superficie o acción revalida desde cero antes de habilitarse.

---

#### 10. Accesibilidad y consistencia por dispositivo

El estándar aplica a web, móvil, tablet y kiosco cuando la superficie sea aplicable.

La presentación deberá:

- tener un nombre o encabezado comprensible;
- asociar el mensaje con la región o acción bloqueada;
- conservar orden de lectura lógico;
- ser navegable por teclado cuando exista teclado;
- ser anunciable por tecnologías de asistencia;
- no depender de color, icono, hover, sonido o vibración;
- evitar loops de foco o anuncios repetitivos;
- mantener objetivos táctiles y densidad compatibles con la estación;
- conservar la misma semántica de causa y recuperación aunque cambie la composición responsive.

La accesibilidad detallada y la validación con usuarios permanecen además bajo las tareas posteriores de prototipado, pruebas y aprobación del mini-bloque.

---

#### 11. Fronteras con tareas posteriores

Esta tarea no absorbe:

- `AUTH-UI-049`: estados de carga, resolución y espera de datos necesarios para saber si existe acceso o contenido;
- `AUTH-UI-050`: estados vacíos cuando la lectura fue autorizada y la ausencia de elementos es demostrable;
- `AUTH-UI-051`: errores recuperables, fallos técnicos, timeouts, resultado desconocido, retry e idempotencia;
- `AUTH-UI-052..060`: simplificación, navegación, componentes, prototipos, pruebas con usuarios y aprobación de pantallas;
- `AUTH-ERR-001..020`: propiedad de los reason codes, precedencia, contratos de bloqueo y separación técnica;
- `AUTH-SRV-*`, `AUTH-DB-*`, `AUTH-CTX-*` y tareas propietarias de cada aplicación: resolución y enforcement físicos;
- `AUTH-SIM-007..014`: lifecycle, persistencia, auditoría, restricciones y validación física de simulación.

La materialización de este estándar queda diferida a las instancias físicas propietarias por `implementation_unit_id`.

---

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

**Justificación:** la taxonomía de impedimentos, la anatomía de mensajes, la separación entre denegación y fallo técnico, el tratamiento de contexto, la antienumeración, la accesibilidad y la migración de mensajes ya poseen cobertura contractual registrada. Esta tarea concreta su proyección de interfaz sin alterar la regla protegida, prioridad, modalidad, responsable, estado ni relación de esos requisitos.

---

#### Cobertura de prueba vigente reutilizada

Se reutilizan, sin modificación del registro:

- `TREQ-UX-055`, para mensaje humano, efecto, siguiente paso y referencia segura;
- `TREQ-UX-072`, para no confundir falta de visibilidad, error de carga y ausencia real;
- `TREQ-UX-082`, para bloquear sin fallbacks cuando falta contexto obligatorio;
- `TREQ-UX-094`, para explicar contexto ausente, inválido o no resuelto sin afirmar ausencia de trabajo;
- `TREQ-UX-097`, para conservar separadas las categorías de impedimento;
- `TREQ-UX-098`, para derivar la explicación de causa estructurada y no del copy;
- `TREQ-UX-099`, para la anatomía mínima de la explicación humana;
- `TREQ-UX-100`, para acciones de recuperación seguras;
- `TREQ-UX-102`, para escalamiento con responsable y contexto;
- `TREQ-UX-103`, para denegaciones sin fuga de información ni bypass;
- `TREQ-UX-104`, para bloqueos de actor, territorio, jornada, rol, dispositivo, simulación o frescura;
- `TREQ-UX-110`, para divulgación segura y antienumeración;
- `TREQ-UX-111`, para mensajes seguros en dispositivos compartidos;
- `TREQ-UX-113`, para consistencia y revalidación cross-app;
- `TREQ-UX-114`, para accesibilidad de bloqueos y recuperación;
- `TREQ-UX-115`, para lenguaje directo, neutral y no punitivo;
- `TREQ-UX-116`, para vigencia, resolución y deduplicación de mensajes;
- `TREQ-UX-117`, para migración y retiro controlado de mensajes legacy;
- `TREQ-UX-309`, para distinguir denegación, bloqueo, espera, conflicto, fallo técnico y otros estados de recuperación.

Estas referencias son trazabilidad heredada y no constituyen cambios al registro.

---

#### Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| `BUILD` | `NOT_EXECUTED` | la tarea aún no ha sido insertada ni compilada en el checkout del usuario |
| `LOCAL` | `NOT_EXECUTED` | no se han ejecutado formateo, quality, delivery check, validadores de dominio ni batería global sobre el archivo propietario modificado |
| `REMOTA` | `NOT_EXECUTED` | no existe todavía cierre documental, PR ni validación remota de `AUTH-UI-048` |
| `OPERATIVA` | `NOT_APPLICABLE` | la tarea define un contrato documental de presentación y no ejecuta una sesión real ni una operación empresarial |
| `FÍSICA` | `NOT_APPLICABLE` | no se modifica código, infraestructura, Supabase, dispositivo, UI desplegada ni datos |

---

#### Criterios de aceptación

- [x] Se definió una presentación común de sin acceso sin crear una fuente nueva de autoridad.
- [x] Se conservaron `BLOCKED` y `DENIED` como categorías distintas.
- [x] Se separó sin acceso de carga, vacío, espera, conflicto, validación y fallo técnico.
- [x] Se prohibió presentar una resolución todavía pendiente como denegación.
- [x] Se prohibió presentar cero resultados autorizados como falta de acceso.
- [x] Se prohibió presentar un fallo técnico como falta de permiso.
- [x] Se definió anatomía mínima para superficie completa y acción bloqueada.
- [x] Se conservó revalidación en URL directa, deep link y handoff cross-app.
- [x] Se conservaron actor, contexto real y simulación como planos diferenciados.
- [x] Se aplicó antienumeración y minimización de datos en mensajes de denegación.
- [x] Se prohibieron rutas de recuperación que eleven permisos, cambien roles artificialmente o sugieran cuentas ajenas.
- [x] Se definió recuperación específica por causa y no un retry universal.
- [x] Se definió escalamiento cuando el actor no puede resolver el bloqueo.
- [x] Se definieron requisitos de accesibilidad y consistencia responsive.
- [x] Se preservó la propiedad de reason codes y enforcement en sus contratos propietarios.
- [x] Se mantuvieron `AUTH-UI-049`, `AUTH-UI-050` y `AUTH-UI-051` fuera del alcance de esta tarea.
- [x] Se mantuvo la materialización física diferida a `PER_IMPLEMENTATION_UNIT`.
- [x] No se crearon ni modificaron requisitos de prueba.
- [x] No se modificó el registro 04A.
- [x] No se modificó código, Supabase, configuración, permisos, datos ni despliegues.

---

#### Límites

`AUTH-UI-048` define exclusivamente la proyección documental de condiciones de sin acceso ya resueltas por contratos autoritativos.

No define:

- nuevos reason codes;
- nuevas decisiones de autorización;
- nuevos permisos;
- nuevas rutas;
- nuevos estados de carga, vacío o error recuperable;
- reglas de retry o idempotencia;
- componentes físicos compartidos;
- implementación por aplicación;
- migraciones de código o datos;
- cambios en Supabase, RLS, RPC o Auth;
- diseño final de prototipos;
- resultados de pruebas con usuarios;
- aprobación final de pantallas.

Cualquier implementación concreta deberá consumir este estándar sin ampliar autoridad ni cambiar la causa canónica que lo originó.

---

#### Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-047 — Mostrar rol simulado claramente`

**TAREA ACTUAL APROBADA**
`AUTH-UI-048 — Estandarizar estados sin acceso`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-049 — Estandarizar estados de carga`


### ✅ AUTH-UI-049 — Estandarizar estados de carga

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-048 — Estandarizar estados sin acceso
**Tarea siguiente:** AUTH-UI-050 — Estandarizar estados vacíos
**Tipo de tarea:** documental; estandarización transversal de estados de carga y acciones pendientes de interfaz sobre contratos canónicos existentes, con materialización física posterior por implementation_unit_id
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Estandarizar la representación de carga en las superficies canónicas de Vento OS para que una espera de datos, resolución de contexto, actualización, paginación, sincronización, acción pendiente, generación o reconciliación externa conserve una semántica única y verificable.

La tarea adopta como autoridad documental el contrato aprobado por `PROC-SCREEN-019 — Definir estados de carga` y materializa su consumo dentro del BLOQUE I. No redefine perfiles ni variantes, no cambia la identidad de las pantallas y no convierte la interfaz en fuente de autoridad empresarial.

La regla raíz queda:

```text
SUPERFICIE O ACCION CON RESULTADO AUN NO CONFIRMADO
+
FUENTE AUTORITATIVA O CORRELACION EN RESOLUCION
→
ESTADO DE CARGA O PENDIENTE CORRESPONDIENTE
+
PRESERVACION SEGURA DEL ESTADO YA CONFIRMADO
+
BLOQUEO MINIMO DE ACCIONES DEPENDIENTES
+
SALIDA SOLO POR EVIDENCIA TERMINAL DEL CONTRATO
```

Un estado de carga no significa por sí mismo:

- acceso denegado o contexto bloqueado;
- ausencia de registros;
- error técnico;
- resultado empresarial exitoso;
- aceptación de una mutación;
- entrega, pago, impresión, sincronización o publicación terminada;
- autorización para reintentar una operación con resultado incierto.

---

#### 2. Resultado canónico

`AUTH-UI-049` congela para BLOQUE I las siguientes decisiones ya aprobadas por `PROC-SCREEN-019`:

1. precedencia entre carga, contenido confirmado, vacío, bloqueo y recuperación;
2. vocabulario canónico de variantes de carga;
3. catálogo canónico de perfiles de carga;
4. catálogo de perfiles de acción pendiente;
5. reglas de presentación, preservación de datos, alcance interactivo y confirmación terminal;
6. reglas de reconciliación de efectos externos;
7. reglas de accesibilidad, foco y privacidad durante carga;
8. vinculación determinista de las 177 pantallas canónicas con su fila única en `SCREEN-LOAD-STATE-MATRIX-001`.

No se crea una segunda matriz de verdad. La materialización de esta tarea consiste en declarar que la capa de experiencia del BLOQUE I debe consumir sin reinterpretación los artefactos:

- `SCREEN-LOAD-STATE-CONTRACT-001`;
- `SCREEN-LOAD-PRECEDENCE-001`;
- `SCREEN-LOAD-VARIANT-VOCABULARY-001`;
- `SCREEN-LOAD-PROFILE-CATALOG-001`;
- `SCREEN-ACTION-PENDING-PROFILE-CATALOG-001`;
- `SCREEN-LOAD-PRESENTATION-CONTRACT-001`;
- `SCREEN-LOAD-DATA-CONSISTENCY-CONTRACT-001`;
- `SCREEN-LOAD-INTERACTION-SCOPE-CONTRACT-001`;
- `SCREEN-LOAD-EXTERNAL-RECONCILIATION-CONTRACT-001`;
- `SCREEN-LOAD-ACCESSIBILITY-CONTRACT-001`;
- `SCREEN-LOAD-STATE-MATRIX-001`;
- `SCREEN-LOAD-STATE-SUMMARY-001`;
- `SCREEN-LOAD-STATE-CHANGE-POLICY-001`;
- `SCREEN-LOAD-STATE-VALIDATION-GATE-001`;
- `SCREEN-LOAD-STATE-CARRYOVER-REGISTER-001`.

---

#### 3. Universo canónico de aplicación

La decisión cubre exactamente 177 `VSCREEN-*` admitidas por el catálogo de pantallas. Cada identidad conserva la aplicación, clase, entrada, salida, perfil vacío, perfil de carga, variantes, presentación, política de datos previos, perfil pendiente, alcance interactivo, confirmación terminal y frontera de carga aprobados en su fila de `SCREEN-LOAD-STATE-MATRIX-001`.

| Aplicación | Universo de pantallas | Cantidad | Distribución canónica de perfiles de carga |
| --- | --- | ---: | --- |
| `shell` | `VSCREEN-0001..0006`; `VSCREEN-0175` | 7 | `LOAD-IDENTITY-CONTEXT`: 4; `LOAD-REALTIME-COMMUNICATION`: 1; `LOAD-SELF-SERVICE`: 1; `LOAD-WORKSPACE-HUB`: 1 |
| `viso` | `VSCREEN-0007..0026`; `VSCREEN-0113..0123` | 31 | `LOAD-CASE-WORKSPACE`: 16; `LOAD-DOCUMENT-AND-EVIDENCE`: 1; `LOAD-QUEUE-AND-PRIORITY`: 10; `LOAD-VERSIONED-EDITOR`: 4 |
| `anima` | `VSCREEN-0027..0032`; `VSCREEN-0124..0131` | 14 | `LOAD-OPERATIONAL-TASK`: 1; `LOAD-SELF-SERVICE`: 13 |
| `nexo` | `VSCREEN-0033..0054`; `VSCREEN-0132..0144`; `VSCREEN-0176..0177` | 37 | `LOAD-ANALYTIC-SNAPSHOT`: 1; `LOAD-CASE-WORKSPACE`: 2; `LOAD-EXTERNAL-RECONCILIATION`: 3; `LOAD-OPERATIONAL-TASK`: 17; `LOAD-QUEUE-AND-PRIORITY`: 2; `LOAD-ROUTE-EXECUTION`: 5; `LOAD-VERSIONED-EDITOR`: 7 |
| `fogo` | `VSCREEN-0055..0067`; `VSCREEN-0173..0174` | 15 | `LOAD-ANALYTIC-SNAPSHOT`: 2; `LOAD-OPERATIONAL-TASK`: 9; `LOAD-QUEUE-AND-PRIORITY`: 2; `LOAD-VERSIONED-EDITOR`: 2 |
| `origo` | `VSCREEN-0068..0079`; `VSCREEN-0145..0146` | 14 | `LOAD-ANALYTIC-SNAPSHOT`: 1; `LOAD-CASE-WORKSPACE`: 5; `LOAD-OPERATIONAL-TASK`: 2; `LOAD-QUEUE-AND-PRIORITY`: 3; `LOAD-VERSIONED-EDITOR`: 3 |
| `pulso` | `VSCREEN-0080..0093`; `VSCREEN-0147..0152` | 20 | `LOAD-OPERATIONAL-TASK`: 5; `LOAD-POS-TRANSACTION`: 8; `LOAD-QUEUE-AND-PRIORITY`: 5; `LOAD-VERSIONED-EDITOR`: 2 |
| `numera` | `VSCREEN-0094..0106`; `VSCREEN-0153..0159` | 20 | `LOAD-ANALYTIC-SNAPSHOT`: 4; `LOAD-DOCUMENT-AND-EVIDENCE`: 2; `LOAD-FINANCIAL-WORKSPACE`: 14 |
| `pass` | `VSCREEN-0107..0112`; `VSCREEN-0160..0172` | 19 | `LOAD-CUSTOMER-FLOW`: 14; `LOAD-REALTIME-COMMUNICATION`: 2; `LOAD-REALTIME-TRACKING`: 3 |
| **Total** | **universo materializado** | **177** | **177 decisiones de carga** |

`aura` permanece como aplicación canónica sin `VSCREEN-*` admitidas en este universo. `AUTH-UI-049` no fabrica una pantalla, perfil o estado de carga inexistente para AURA.

Para cada identidad del universo anterior se exige cardinalidad exacta `1:1` contra `SCREEN-LOAD-STATE-MATRIX-001`: una fila por pantalla, cero faltantes, cero duplicados y cero reclasificaciones locales.

---

#### 4. Precedencia de estado

La experiencia aplica la siguiente precedencia conceptual:

```text
1. RESOLVER IDENTIDAD, CONTEXTO, AUTORIZACION Y FUENTE REQUERIDA
2. SI EXISTE BLOQUEO O DENEGACION CONCLUYENTE → AUTH-UI-048
3. SI LA FUENTE NECESARIA SIGUE RESOLVIENDOSE → AUTH-UI-049
4. SI LA CONSULTA AUTORIZADA TERMINA COMPLETA Y EL RESULTADO ES CERO → AUTH-UI-050
5. SI OCURRE FALLO, RESULTADO DESCONOCIDO, CONFLICTO O RECUPERACION → AUTH-UI-051
6. SI EXISTE RESULTADO CONFIRMADO → MOSTRAR CONTENIDO O ESTADO TERMINAL CORRESPONDIENTE
```

Reglas obligatorias:

- una superficie no puede mostrar vacío mientras la consulta necesaria esté incompleta;
- un bloqueo concluyente no puede mantenerse como spinner indefinido;
- un fallo técnico no puede ocultarse como carga indefinida;
- una respuesta parcial no permite afirmar cero, total completo o ausencia;
- un valor stale no se presenta como versión fresca sin marcador;
- una acción enviada no se presenta como éxito hasta cumplir su confirmación terminal;
- un resultado desconocido después de una posible aceptación no autoriza una segunda intención empresarial.

---

#### 5. Vocabulario canónico de variantes de carga

Se consumen exactamente nueve variantes:

| Variante | Activación | Presentación obligatoria | Salida válida |
| --- | --- | --- | --- |
| `INITIAL` | primera resolución autorizada de la superficie | skeleton o gate estructural sin valores inventados | contenido, vacío, bloqueo o recuperación |
| `SECTION` | una región independiente solicita datos | placeholder limitado a la región y estado ocupado local | sección actualizada o recuperación local |
| `BACKGROUND_REFRESH` | existe una versión confirmada y se consulta una más reciente | conservar datos con stale y progreso discreto | versión nueva, sin cambio o recuperación |
| `PAGINATION` | se solicita el siguiente cursor | conservar filas y reservar espacio al final | lote agregado, fin de colección o recuperación |
| `ACTION_PENDING` | una acción ya aprobada fue enviada | indicador en acción o recurso, bloqueo mínimo y referencia de solicitud | confirmación contractual, rechazo o recuperación |
| `EXTERNAL_RECONCILIATION` | existe intención interna y resultado externo pendiente | etapa y correlación; distinguir aceptado, procesando y terminal | éxito correlacionado, fallo o resultado desconocido recuperable |
| `REALTIME_RECONNECT` | el canal pierde continuidad | conservar snapshot con marcador y recuperar cursor | continuidad restablecida o snapshot reconciliado |
| `UPLOAD_OR_GENERATION` | se transfiere o genera archivo, evidencia o salida | progreso por bytes o fases solo cuando sean medibles y referencia segura | integridad y referencia confirmadas o recuperación |
| `OFFLINE_SYNC` | un hecho local identificado espera sincronización | estado local pendiente, correlación e identidad de intento | aceptación, deduplicación, conflicto o recuperación |

No existe una variante genérica de espera sin fuente, identidad de operación, condición de salida o política de recuperación.

---

#### 6. Catálogo canónico de perfiles de carga

Las 177 pantallas se distribuyen en 16 perfiles, sin perfiles adicionales:

| Perfil | Pantallas | Regla material que se conserva |
| --- | ---: | --- |
| `LOAD-ANALYTIC-SNAPSHOT` | 8 | conservar último snapshot confirmado con `as_of` y stale; no concluir cero, total o decisión desde snapshot incompleto |
| `LOAD-CASE-WORKSPACE` | 23 | conservar borrador y última versión confirmada; bloquear solo campos o acciones dependientes de la versión en resolución |
| `LOAD-CUSTOMER-FLOW` | 14 | conservar carrito, selecciones y última versión comercial confirmada; no inferir precio, disponibilidad, puntos, pago o propiedad |
| `LOAD-DOCUMENT-AND-EVIDENCE` | 3 | conservar metadata confirmada y borrador local permitido; no declarar validez, exportación o custodia desde progreso local |
| `LOAD-EXTERNAL-RECONCILIATION` | 3 | conservar intención interna, referencia y último estado externo confirmado; impedir despacho externo duplicado |
| `LOAD-FINANCIAL-WORKSPACE` | 14 | conservar periodo, versión y borrador confirmados; ocultar importes no confirmados y bloquear decisiones materiales dependientes |
| `LOAD-IDENTITY-CONTEXT` | 4 | limpiar datos del actor anterior antes de resolver; no aceptar identidad o contexto afirmados por cliente |
| `LOAD-OPERATIONAL-TASK` | 34 | conservar turno, área, recurso y hechos confirmados del actor; no ejecutar transición desde estado desconocido |
| `LOAD-POS-TRANSACTION` | 8 | conservar carrito, líneas y última versión de precio confirmada; ocultar totales no confirmados y no fabricar éxito de venta o pago |
| `LOAD-QUEUE-AND-PRIORITY` | 22 | conservar filas confirmadas con marcador stale; no declarar cola vacía o conteo cero antes de consulta fresca completa |
| `LOAD-REALTIME-COMMUNICATION` | 3 | conservar mensajes confirmados, cursor y borrador permitido; impedir envío duplicado y mezcla de actores |
| `LOAD-REALTIME-TRACKING` | 3 | conservar último estado confirmado, versión y marcador de reconexión; no inferir estado terminal desde hueco de stream |
| `LOAD-ROUTE-EXECUTION` | 5 | conservar ruta, parada, custodia, evidencia y último sync confirmados; no confirmar salida, entrega o retorno desde sync incierto |
| `LOAD-SELF-SERVICE` | 14 | conservar únicamente datos confirmados del sujeto actual y su borrador permitido; no enumerar otros sujetos |
| `LOAD-VERSIONED-EDITOR` | 18 | conservar borrador local separado de la versión base confirmada; no editar, aprobar, publicar o superseder sin base válida |
| `LOAD-WORKSPACE-HUB` | 1 | ocultar destinos del contexto anterior hasta resolver el contexto vigente; no inferir aplicaciones o tareas desde contexto stale |
| **Total** | **177** | **cobertura completa** |

La elección de perfil pertenece a la fila canónica de cada `VSCREEN-*`; ninguna aplicación puede escoger un perfil por conveniencia visual, nombre de ruta, componente o último estado usado.

---

#### 7. Perfiles de acción pendiente

Una carga de lectura y una acción ya enviada conservan semánticas diferentes. Cuando una acción está pendiente, la interfaz usa el perfil derivado del efecto aprobado y bloquea únicamente el alcance que podría duplicar, contradecir o anticipar ese efecto.

| Perfil pendiente | Pantallas | Alcance bloqueado | Evidencia terminal exigida |
| --- | ---: | --- | --- |
| `PENDING-NAVIGATION-REVALIDATION` | 18 | apertura del destino dependiente | revalidación del destino por el contrato de navegación |
| `PENDING-READ-SNAPSHOT` | 14 | vistas o exportaciones dependientes del snapshot | lectura confirmada por servidor |
| `PENDING-DOMAIN-COMMIT` | 72 | nueva mutación del mismo recurso o replay duplicado | mutación de dominio confirmada por servidor |
| `PENDING-DECISION-COMMIT` | 22 | decisión sobre el mismo alcance y acciones conflictivas | decisión confirmada por servidor |
| `PENDING-FINANCIAL-COMMIT` | 20 | alcance financiero y pagos duplicados o conflictivos | confirmación financiera autoritativa |
| `PENDING-VERSIONED-CONFIGURATION` | 15 | edición, aprobación o publicación dependiente de versión | versión de configuración confirmada por servidor |
| `PENDING-DRAFT-SAVE` | 5 | nuevo guardado conflictivo de la misma versión de borrador | persistencia del borrador confirmada por servidor |
| `PENDING-SESSION-COMMIT` | 4 | superficies dependientes de identidad o sesión | mutación de sesión confirmada por servidor |
| `PENDING-EXTERNAL-RECONCILIATION` | 3 | despacho externo duplicado; se conserva consulta y salida segura | conciliación de estados interno y externo |
| `PENDING-COMMUNICATION-SEND` | 3 | envío duplicado para la misma referencia de cliente | envío confirmado por servidor |
| `PENDING-EVIDENCE-GENERATION` | 1 | generación o exportación duplicada | evidencia o salida generada y confirmada por servidor |
| **Total** | **177** | **alcance dependiente mínimo** | **confirmación según efecto** |

`ACTION_PENDING` nunca autoriza una segunda venta, pago, redención, movimiento, decisión, mensaje, impresión, entrega, publicación o generación para resolver incertidumbre sobre la primera intención.

---

#### 8. Vinculación determinista por pantalla

Para toda pantalla `VSCREEN-*` del universo de la sección 3 se aplica el siguiente binding:

```text
screen_id
→ fila única en SCREEN-LOAD-STATE-MATRIX-001
→ load_profile
→ allowed_variants
→ initial_presentation
→ previous_data_policy
→ primary_pending_profile
→ interactive_scope
→ terminal_confirmation
→ load_boundary
```

Esta tarea no permite resolver ninguno de esos campos por heurística de frontend.

La consistencia exige simultáneamente:

- mismo `screen_id` que el catálogo canónico;
- mismo perfil vacío heredado, sin anticipar `AUTH-UI-050`;
- mismo perfil de carga aprobado;
- únicamente las variantes permitidas por la fila;
- misma política de datos previos;
- mismo perfil pendiente principal;
- mismo alcance interactivo;
- misma evidencia terminal;
- misma frontera contra inferencias, éxito falso, dato stale o duplicación.

La huella de las 177 identidades y su clasificación no puede cambiar silenciosamente al materializar componentes posteriores.

---

#### 9. Preservación de datos y alcance interactivo

Durante carga se conserva información ya confirmada solo cuando el perfil canónico lo permite y siempre con su condición de frescura visible.

Reglas transversales:

1. `BACKGROUND_REFRESH` conserva el último dato confirmado y lo marca como stale o en actualización; no vacía la superficie para aparentar una carga inicial nueva.
2. `INITIAL` no reutiliza datos, destinos, actor, sesión o contexto de una identidad anterior cuando el contrato exige una nueva resolución.
3. Los borradores locales permanecen separados del estado empresarial confirmado.
4. Los importes, balances, totales, disponibilidad, pagos y estados terminales no se completan con placeholders semánticos ni datos inventados.
5. Una respuesta parcial o página incompleta no habilita una conclusión de cobertura completa.
6. La paginación conserva las filas ya confirmadas y no duplica, pierde ni reordena silenciosamente elementos.
7. Un hueco de Realtime conserva el snapshot confirmado y exige recuperar cursor o snapshot completo antes de inferir continuidad.
8. Una cola offline no muestra completado antes de aceptación y conciliación del servidor.
9. Salir visualmente de una pantalla no cancela una operación del servidor, proveedor o periférico.
10. La cancelación de un trabajo exige capacidad contractual y confirmación propia.

El alcance interactivo durante carga es mínimo: permanecen disponibles solamente navegación, filtros, consultas, soporte o controles que el perfil declare seguros; se bloquean las acciones que dependan del dato o efecto todavía no confirmado.

---

#### 10. Presentación y accesibilidad

La presentación conserva el significado de la estructura sin fabricar contenido:

- un skeleton mantiene jerarquía y espacio, pero no replica nombres, saldos, conteos, estados, fotos, QR, códigos o importes reales;
- un spinner aislado se limita a controles o regiones pequeñas; una superficie estructurada utiliza skeleton o etapas comprensibles;
- un porcentaje se muestra únicamente cuando la fuente conoce un total o fases medibles;
- la carga extensa explica qué está ocurriendo, la referencia segura disponible y las salidas realmente permitidas;
- ninguna animación puede impedir lectura, escaneo, foco, toque o uso con movimiento reducido;
- la carga no desplaza bruscamente controles críticos ni mueve el objetivo táctil activo;
- cada región cargando expone estado ocupado y un nombre accesible sin anunciar continuamente la animación;
- los cambios relevantes se anuncian una sola vez mediante la región viva apropiada;
- el foco permanece en el control activador durante la carga y solo se mueve al resultado cuando el flujo lo exige;
- skeletons y placeholders respetan contraste, movimiento reducido y tamaño táctil;
- el cambio de actor elimina pantalla, caché visible, anuncios y borradores no transferibles antes de resolver el siguiente contexto.

Los indicadores de sincronización, pago, impresión, entrega o generación usan terminología del estado real y no un mensaje genérico de éxito.

---

#### 11. Reconciliación externa y resultado desconocido

Cuando interviene un proveedor, periférico, callback, cola o servicio externo se conservan por separado:

```text
INTENCION INTERNA
+
CORRELACION INTERNA
+
REFERENCIA EXTERNA
+
ESTADO INTERNO CONFIRMADO
+
ESTADO EXTERNO OBSERVADO
+
CONDICION TERMINAL DEL CONTRATO
```

No constituyen éxito terminal por sí mismos:

- una aceptación asíncrona;
- un callback aislado;
- un trabajo en cola;
- un evento observado sin continuidad probada;
- la respuesta local de un periférico;
- una notificación de cliente;
- abandonar la pantalla.

Si no puede determinarse si la operación fue aceptada o ejecutada, el estado abandona la carga ordinaria y pasa al tratamiento de resultado desconocido o recuperación de `AUTH-UI-051`. Reintentar exige primero consultar o reconciliar el intento original cuando exista posibilidad de efecto previo.

---

#### 12. Fronteras con AUTH-UI-048, AUTH-UI-050 y AUTH-UI-051

`AUTH-UI-049` queda acotada así:

| Condición | Propietario | Regla |
| --- | --- | --- |
| autorización, contexto o prerrequisito ya evaluado como no permitido o bloqueado | `AUTH-UI-048` | no mantener un spinner para ocultar una decisión concluyente |
| dato, contexto, versión, cursor o efecto requerido todavía en resolución | `AUTH-UI-049` | mostrar el perfil y variante de carga correspondientes |
| consulta autorizada, completa, fresca y con resultado cero o condición de inicio vacía | `AUTH-UI-050` | no anticipar vacío antes de demostrar la condición |
| fallo técnico, timeout, conflicto, resultado desconocido, integración degradada o recuperación | `AUTH-UI-051` | no convertir fallo en carga infinita ni ofrecer reintento ciego |

Una transición entre estas tareas cambia la categoría de experiencia, no la autoridad empresarial subyacente.

---

#### 13. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea consume contratos de carga y matrices de pantalla ya aprobados y no introduce una regla nueva que requiera alterar el registro modular de requisitos de prueba.

---

#### 14. Cobertura de prueba vigente reutilizada

Permanece vigente la cobertura ya derivada por los contratos canónicos de estados de interfaz y por `PROC-SCREEN-019`, incluida la verificación de:

- cobertura exacta de las 177 pantallas;
- ausencia de perfiles o variantes no canónicas;
- preservación de datos confirmados durante refresh, paginación, Realtime y offline;
- prohibición de vacío o cero desde consulta incompleta;
- prohibición de éxito antes de confirmación terminal;
- idempotencia y reconciliación ante resultado desconocido;
- accesibilidad, foco, movimiento reducido y privacidad durante carga;
- consistencia entre perfil de carga, perfil pendiente, efecto y evidencia terminal;
- detección de faltantes, duplicados o cambios silenciosos de huella.

Esta trazabilidad se reutiliza sin modificar identificadores ni filas del registro 04A.

---

#### 15. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La tarea permanece como artefacto documental prospectivo y todavía no ha sido insertada ni normalizada en el checkout de trabajo. |
| LOCAL | NOT_EXECUTED | Las validaciones de formato, calidad, entrega, BLOQUE I, topología y plan deben ejecutarse después de insertar el bloque en su archivo propietario. |
| REMOTA | NOT_EXECUTED | No existe todavía cierre documental, PR ni merge de `AUTH-UI-049`. |
| OPERATIVA | NOT_APPLICABLE | La tarea define el contrato documental de presentación y no ejecuta una sesión operativa real. |
| FÍSICA | NOT_APPLICABLE | La tarea no modifica código, Supabase, datos, infraestructura, dispositivos, aplicaciones desplegadas ni configuraciones runtime. |

---

#### 16. Criterios de aceptación

`AUTH-UI-049` queda documentalmente aceptable cuando se demuestre todo lo siguiente:

- [ ] existe exactamente una decisión de carga para cada una de las 177 `VSCREEN-*` admitidas;
- [ ] la distribución por aplicación suma 177 sin incluir pantallas ficticias de AURA;
- [ ] los 16 perfiles de carga suman 177 y conservan su significado canónico;
- [ ] las nueve variantes de carga permanecen diferenciadas y con salida definida;
- [ ] los perfiles de acción pendiente cubren las 177 pantallas y no fabrican éxito desde envío local;
- [ ] `INITIAL`, `SECTION`, refresh, paginación, Realtime, offline, upload y reconciliación no comparten una semántica genérica de espera;
- [ ] el dato previamente confirmado se preserva o limpia exactamente como indica el perfil;
- [ ] el alcance interactivo bloquea solo las acciones dependientes o con riesgo de duplicación;
- [ ] toda salida de carga exige la evidencia terminal prevista por su contrato;
- [ ] vacío se alcanza únicamente después de una consulta completa o condición de inicio demostrada;
- [ ] bloqueo o denegación concluyentes se entregan a `AUTH-UI-048`;
- [ ] estados vacíos se entregan a `AUTH-UI-050`;
- [ ] fallos, conflictos y resultados desconocidos se entregan a `AUTH-UI-051`;
- [ ] no existe reintento ciego de mutaciones o efectos externos con aceptación incierta;
- [ ] skeletons, indicadores, foco y anuncios cumplen la política de accesibilidad y privacidad;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos en esta tarea documental.

---

#### 17. Límites

Esta tarea no:

- define estados de sin acceso, ya cubiertos por `AUTH-UI-048`;
- define la semántica detallada de estados vacíos, reservada a `AUTH-UI-050`;
- define la recuperación de errores, conflictos o resultados desconocidos, reservada a `AUTH-UI-051`;
- cambia permisos, roles, contexto, RLS, RPC, Auth, contratos de servidor o catálogos de autorización;
- cambia las 177 identidades `VSCREEN-*` ni su pertenencia a aplicaciones;
- crea superficies para AURA;
- implementa componentes, skeletons, spinners, loaders, hooks, estados runtime o estilos;
- cambia datos, Supabase, colas, integraciones, proveedores, periféricos o despliegues;
- autoriza la instancia física posterior derivada de la topología `PER_IMPLEMENTATION_UNIT`;
- modifica el registro 04A.

La materialización física de este contrato pertenece a las instancias consumidoras autorizadas por la topología y sus gates correspondientes.

---

#### 18. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-048 — Estandarizar estados sin acceso`

**TAREA ACTUAL APROBADA**
`AUTH-UI-049 — Estandarizar estados de carga`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-050 — Estandarizar estados vacíos`


### ✅ AUTH-UI-050 — Estandarizar estados vacíos

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-049 — Estandarizar estados de carga
**Tarea siguiente:** AUTH-UI-051 — Estandarizar errores recuperables
**Tipo de tarea:** documental; estandarización transversal de estados vacíos de interfaz sobre contratos canónicos existentes, con materialización física posterior por implementation_unit_id
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Estandarizar para BLOQUE I la representación de una ausencia válida, autorizada y demostrable de contenido, trabajo, selección, historial, evidencia, oferta, configuración, endpoint o snapshot, sin confundir esa ausencia con carga, bloqueo, error, parcialidad, resultado desconocido o falta de autorización.

La condición canónica es:

```text
ENTRADA Y CONTEXTO VALIDOS
+
AUTORIZACION CONFIRMADA
+
FUENTE O CONSULTA COMPLETA Y SUFICIENTEMENTE FRESCA
+
PREDICADO DE AUSENCIA DEL PERFIL CUMPLIDO
+
NINGUNA FUENTE AUTORITATIVA AUN PENDIENTE
+
NINGUN FALLO, CONFLICTO O RESULTADO DESCONOCIDO
=
ESTADO VACIO LEGITIMO
```

Por tanto:

```text
VACIO != CARGA
VACIO != BLOQUEO
VACIO != ERROR
VACIO != CONSULTA PARCIAL
VACIO != OFFLINE SIN SNAPSHOT VERIFICABLE
VACIO != RECURSO NO AUTORIZADO
VACIO != RESULTADO DESCONOCIDO
```

Un estado vacío es una conclusión de experiencia sobre un alcance autorizado; nunca constituye una ampliación de permisos, una prueba de inexistencia global ni una autorización para fabricar trabajo, recursos o acciones.

---

#### 2. Resultado canónico

`AUTH-UI-050` congela para BLOQUE I las decisiones ya aprobadas por `PROC-SCREEN-018 — Definir estados vacíos` y las consume sin reinterpretación local.

Los artefactos canónicos consumidos son:

- `SCREEN-EMPTY-STATE-CONTRACT-001`;
- `SCREEN-EMPTY-PROFILE-CATALOG-001`;
- `SCREEN-EMPTY-VARIANT-VOCABULARY-001`;
- `SCREEN-EMPTY-ACTIVATION-ORDER-001`;
- `SCREEN-EMPTY-CONTENT-CONTRACT-001`;
- `SCREEN-EMPTY-ACTION-POLICY-001`;
- `SCREEN-EMPTY-STATE-MATRIX-001`;
- `SCREEN-EMPTY-STATE-SUMMARY-001`;
- `SCREEN-EMPTY-STATE-CHANGE-POLICY-001`;
- `SCREEN-EMPTY-STATE-VALIDATION-GATE-001`;
- `SCREEN-EMPTY-STATE-CARRYOVER-REGISTER-001`.

La proyección materializa contractualmente:

1. exactamente un perfil vacío base por cada `VSCREEN-*` admitida;
2. un vocabulario cerrado de catorce perfiles;
3. tres variantes controladas;
4. predicados de activación y fronteras de no inferencia;
5. política de contenido, privacidad y accesibilidad;
6. política de CTA y acciones alternativas heredadas;
7. reglas de refresco, caché y consistencia;
8. binding determinista con la matriz de 177 pantallas;
9. fronteras explícitas con estados sin acceso, carga y recuperación.

No se crea una segunda matriz de verdad ni una taxonomía de vacíos paralela.

---

#### 3. Universo canónico de aplicación

La decisión cubre exactamente 177 `VSCREEN-*` admitidas por el catálogo de pantallas.

| Aplicación | Universo de pantallas | Cantidad |
| --- | --- | ---: |
| `shell` | `VSCREEN-0001..0006`; `VSCREEN-0175` | 7 |
| `viso` | `VSCREEN-0007..0026`; `VSCREEN-0113..0123` | 31 |
| `anima` | `VSCREEN-0027..0032`; `VSCREEN-0124..0131` | 14 |
| `nexo` | `VSCREEN-0033..0054`; `VSCREEN-0132..0144`; `VSCREEN-0176..0177` | 37 |
| `fogo` | `VSCREEN-0055..0067`; `VSCREEN-0173..0174` | 15 |
| `origo` | `VSCREEN-0068..0079`; `VSCREEN-0145..0146` | 14 |
| `pulso` | `VSCREEN-0080..0093`; `VSCREEN-0147..0152` | 20 |
| `numera` | `VSCREEN-0094..0106`; `VSCREEN-0153..0159` | 20 |
| `pass` | `VSCREEN-0107..0112`; `VSCREEN-0160..0172` | 19 |
| **Total** | **universo materializado** | **177** |

`aura` permanece como aplicación canónica sin `VSCREEN-*` admitidas en este universo. Esta tarea no fabrica superficies, estados o perfiles vacíos para AURA.

Cada identidad conserva nombre, aplicación, clase, entrada y salida aprobados. La cardinalidad contra `SCREEN-EMPTY-STATE-MATRIX-001` es exactamente `1:1`: una fila por pantalla, cero faltantes, cero duplicados y cero reclasificaciones locales.

---

#### 4. Orden de activación y precedencia

La experiencia aplica esta precedencia:

```text
1. IDENTIDAD, AUTORIZACION O PRERREQUISITO NO SATISFECHO -> AUTH-UI-048
2. FUENTE, CONSULTA, VERSION, CURSOR O EFECTO AUN EN RESOLUCION -> AUTH-UI-049
3. FALLO, TIMEOUT, PARCIALIDAD, CONFLICTO O RESULTADO DESCONOCIDO -> AUTH-UI-051
4. DATOS CONFIRMADOS DISPONIBLES -> CONTENIDO NORMAL
5. RESULTADO AUTORIZADO, COMPLETO Y FRESCO CUMPLE PREDICADO DE AUSENCIA -> AUTH-UI-050
```

Reglas obligatorias:

1. el vacío solo se evalúa después de completar autenticación, autorización, contexto, recurso y consulta aplicables;
2. una respuesta parcial no activa vacío aunque la porción recibida tenga cero filas;
3. caché ausente, offline sin snapshot verificable, timeout, fallo de fuente o token inválido no son vacío;
4. una consulta desactualizada no puede presentar cero como conclusión fresca;
5. una fuente externa no conciliada no se representa como vacío;
6. un recurso no autorizado no se representa como inexistente;
7. una condición de bloqueo conocida no se convierte en vacío para simplificar la interfaz;
8. el render de un vacío no modifica estado empresarial ni ejecuta acciones.

---

#### 5. Catálogo canónico de perfiles vacíos

Se consumen exactamente catorce perfiles y sus 177 asignaciones.

| Perfil | Pantallas | Predicado canónico | Frontera material |
| --- | ---: | --- | --- |
| `EMPTY-AUTHORIZED-START` | 52 | `AUTHORIZED_SURFACE_READY_WITHOUT_STARTED_RESOURCE` | la superficie está autorizada y lista; no se usa cuando falta un prerrequisito, recurso obligatorio o autorización |
| `EMPTY-CART` | 2 | `AUTHORIZED_CART_EXISTS_AND_LINE_COUNT_ZERO` | no implica pedido, reserva, pago, checkout ni beneficio aplicado |
| `EMPTY-CLEAR-QUEUE` | 30 | `AUTHORIZED_QUEUE_COMPLETE_AND_PENDING_COUNT_ZERO` | exige consulta completa y fresca; parcialidad, stale, error u offline no conciliado no producen cola despejada |
| `EMPTY-CONFIGURATION-BOOTSTRAP` | 14 | `AUTHORIZED_CONFIGURATION_SCOPE_HAS_NO_ACTIVE_OR_DRAFT_VERSION` | no oculta una versión existente ni permite editar, aprobar o publicar sin el contrato de configuración |
| `EMPTY-FIRST-RECORD` | 10 | `AUTHORIZED_SCOPE_HAS_NO_CANONICAL_RECORDS` | significa ausencia en el alcance autorizado, no inexistencia global |
| `EMPTY-NO-ASSIGNED-WORK` | 25 | `AUTHORIZED_OPERATIONAL_ASSIGNMENTS_ZERO` | no permite autoasignación, creación de órdenes ni ampliación de sede, área, turno o ruta |
| `EMPTY-NO-ENDPOINT` | 1 | `AUTHORIZED_DEVICE_DISCOVERY_COMPLETE_AND_COMPATIBLE_ENDPOINT_COUNT_ZERO` | es configuración sin endpoint compatible; no oculta un bloqueo operativo de una operación que exige periférico |
| `EMPTY-NO-EVIDENCE` | 2 | `AUTHORIZED_AUDIT_QUERY_COMPLETE_AND_EVIDENCE_COUNT_ZERO` | no concluye que el hecho nunca ocurrió ni sustituye retención, integridad, permisos o fuentes pendientes |
| `EMPTY-NO-HISTORY` | 3 | `AUTHORIZED_OWN_HISTORY_COUNT_ZERO` | se limita al historial propio y al alcance consultado; no enumera terceros |
| `EMPTY-NO-MESSAGES` | 3 | `AUTHORIZED_CONVERSATION_OR_INBOX_COMPLETE_AND_MESSAGE_COUNT_ZERO` | no revela conversaciones, participantes o mensajes fuera del alcance |
| `EMPTY-NO-OFFERING` | 4 | `AUTHORIZED_OFFERING_QUERY_COMPLETE_AND_ELIGIBLE_COUNT_ZERO` | no fuerza disponibilidad ni oculta fallos de catálogo, precio, stock o integración |
| `EMPTY-NO-OWN-RESOURCE` | 7 | `AUTHORIZED_OWN_RESOURCE_LOOKUP_COMPLETE_AND_RESOURCE_ABSENT` | no confirma existencia de recursos de otras cuentas o personas |
| `EMPTY-NO-SELECTION` | 18 | `AUTHORIZED_MASTER_CONTEXT_READY_AND_SELECTION_NULL` | ausencia de selección no equivale a recurso inexistente, eliminado o no autorizado |
| `EMPTY-NO-SNAPSHOT` | 6 | `AUTHORIZED_READ_QUERY_COMPLETE_AND_SNAPSHOT_ROW_COUNT_ZERO` | snapshot sin filas no equivale a KPI, monto, saldo o medición igual a cero |
| **Total** | **177** | **cobertura completa** | **un perfil base por pantalla** |

Ninguna aplicación puede escoger un perfil por conveniencia visual, nombre de ruta, componente, último estado usado o heurística de frontend.

---

#### 6. Distribución por aplicación

La distribución de perfiles se conserva exactamente así:

| Aplicación | Pantallas | Distribución canónica |
| --- | ---: | --- |
| `shell` | 7 | `EMPTY-AUTHORIZED-START`: 5; `EMPTY-CLEAR-QUEUE`: 1; `EMPTY-NO-ASSIGNED-WORK`: 1 |
| `viso` | 31 | `EMPTY-AUTHORIZED-START`: 5; `EMPTY-CLEAR-QUEUE`: 10; `EMPTY-CONFIGURATION-BOOTSTRAP`: 4; `EMPTY-FIRST-RECORD`: 7; `EMPTY-NO-SELECTION`: 5 |
| `anima` | 14 | `EMPTY-AUTHORIZED-START`: 4; `EMPTY-NO-ASSIGNED-WORK`: 3; `EMPTY-NO-HISTORY`: 1; `EMPTY-NO-MESSAGES`: 1; `EMPTY-NO-OWN-RESOURCE`: 5 |
| `nexo` | 37 | `EMPTY-AUTHORIZED-START`: 16; `EMPTY-CLEAR-QUEUE`: 2; `EMPTY-CONFIGURATION-BOOTSTRAP`: 7; `EMPTY-NO-ASSIGNED-WORK`: 9; `EMPTY-NO-ENDPOINT`: 1; `EMPTY-NO-SELECTION`: 1; `EMPTY-NO-SNAPSHOT`: 1 |
| `fogo` | 15 | `EMPTY-AUTHORIZED-START`: 4; `EMPTY-CLEAR-QUEUE`: 2; `EMPTY-CONFIGURATION-BOOTSTRAP`: 2; `EMPTY-NO-ASSIGNED-WORK`: 5; `EMPTY-NO-SELECTION`: 1; `EMPTY-NO-SNAPSHOT`: 1 |
| `origo` | 14 | `EMPTY-AUTHORIZED-START`: 4; `EMPTY-CLEAR-QUEUE`: 3; `EMPTY-FIRST-RECORD`: 2; `EMPTY-NO-ASSIGNED-WORK`: 2; `EMPTY-NO-EVIDENCE`: 1; `EMPTY-NO-SELECTION`: 2 |
| `pulso` | 20 | `EMPTY-AUTHORIZED-START`: 5; `EMPTY-CLEAR-QUEUE`: 4; `EMPTY-CONFIGURATION-BOOTSTRAP`: 1; `EMPTY-NO-ASSIGNED-WORK`: 4; `EMPTY-NO-SELECTION`: 6 |
| `numera` | 20 | `EMPTY-AUTHORIZED-START`: 5; `EMPTY-CLEAR-QUEUE`: 8; `EMPTY-FIRST-RECORD`: 1; `EMPTY-NO-EVIDENCE`: 1; `EMPTY-NO-SELECTION`: 1; `EMPTY-NO-SNAPSHOT`: 4 |
| `pass` | 19 | `EMPTY-AUTHORIZED-START`: 4; `EMPTY-CART`: 2; `EMPTY-NO-ASSIGNED-WORK`: 1; `EMPTY-NO-HISTORY`: 2; `EMPTY-NO-MESSAGES`: 2; `EMPTY-NO-OFFERING`: 4; `EMPTY-NO-OWN-RESOURCE`: 2; `EMPTY-NO-SELECTION`: 2 |
| **Total** | **177** | **cobertura completa** |

La suma por aplicación y la suma por perfil deben reconciliar simultáneamente en 177.

---

#### 7. Variantes controladas

Las variantes no reemplazan el perfil base. Explican una causa temporal o contextual más específica.

| Variante | Pantallas | Predicado | Regla |
| --- | ---: | --- | --- |
| `VARIANT-FILTERED-NO-MATCH` | 30 | `ACTIVE_FILTERS_AND_RESULT_COUNT_ZERO` | conserva filtros, periodo y alcance visibles; permite únicamente la acción aprobada para ajustar o limpiar filtros |
| `VARIANT-NO-SELECTION` | 18 | `MASTER_CONTEXT_LOADED_AND_SELECTION_NULL` | no consulta ni muta detalle hasta existir selección autorizada |
| `VARIANT-POST-COMPLETION-CLEAR` | 55 | `CONFIRMED_EXIT_RECEIPT_AND_REMAINING_WORK_ZERO` | requiere receipt confirmado, invalidación y nueva consulta antes de declarar que todo quedó atendido |

Precedencias específicas:

- filtros activos con cero resultados usan `VARIANT-FILTERED-NO-MATCH`;
- maestro cargado sin selección usa `VARIANT-NO-SELECTION`;
- cola despejada tras completar una acción usa `VARIANT-POST-COMPLETION-CLEAR` únicamente después de confirmación y refresco;
- al cambiar filtro, selección o receipt, la variante se reevalúa contra el perfil base.

---

#### 8. Contrato de contenido

Todo estado vacío contiene, cuando aplique al canal:

1. título de intención que describe la causa sin culpar al actor;
2. explicación de qué falta y qué alcance sí fue consultado;
3. alcance visible relevante: sede, área, periodo, actor, ruta, pedido o filtros;
4. frescura mediante última consulta, versión o actualización sin detalle técnico innecesario;
5. CTA primaria únicamente cuando la matriz referencia una acción aprobada;
6. acción alternativa únicamente cuando ya existe como filtro, ayuda, selección, actualización o soporte aprobado;
7. estado accesible perceptible sin depender solo de icono o color;
8. telemetría mínima estructurada sin payloads sensibles.

Se prohíbe:

- afirmar inexistencia global cuando solo se conoce ausencia dentro del alcance autorizado;
- afirmar que todo está bien con una consulta parcial o desactualizada;
- presentar una denegación de permiso como vacío;
- mostrar números o identidades fuera del alcance del actor;
- ofrecer creación o configuración cuando la acción no existe o no está autorizada;
- mezclar no selección, no historial, no pendientes y error bajo un mensaje genérico.

---

#### 9. Política de acciones en vacío

La matriz aprobada contiene **79 pantallas con CTA primaria**, **98 sin CTA primaria empresarial**, **60 con acción alternativa** y **0 acciones nuevas creadas por el contrato de vacío**.

Reglas:

1. `empty_cta` y `empty_alternative` solo consumen una acción canónica ya existente o `NONE`;
2. etiqueta, efecto, disponibilidad, ubicación y confirmación pertenecen al contrato de acción y no se redefinen aquí;
3. una CTA se oculta o deshabilita cuando la acción original no está disponible sin revelar causas sensibles;
4. la acción vuelve a validar autorización, contexto, recurso y estado antes de ejecutarse;
5. renderizar el vacío nunca ejecuta automáticamente una mutación;
6. `EMPTY-NO-ASSIGNED-WORK` no permite autoasignación;
7. `EMPTY-CART` no habilita checkout ni pago;
8. `EMPTY-NO-ENDPOINT` puede conducir a descubrimiento permitido en configuración, pero no sustituye un bloqueo técnico de una operación activa;
9. acciones destructivas no se presentan como CTA principal del vacío;
10. cuando la matriz declara `NONE`, no se fabrica una acción empresarial implícita.

Cambiar una CTA o permitir una acción nueva exige modificar primero el contrato propietario de acciones; el copy del vacío no crea capacidades.

---

#### 10. Vinculación determinista por pantalla

Para cada `VSCREEN-*` del universo de la sección 3 se aplica este binding:

```text
screen_id
-> fila unica en SCREEN-EMPTY-STATE-MATRIX-001
-> empty_base_profile
-> allowed_variants
-> activation_predicate
-> empty_cta
-> empty_alternative
-> refresh_policy
-> boundary
```

La implementación posterior no puede resolver ninguno de esos campos mediante heurística local.

La consistencia exige simultáneamente:

- mismo `screen_id`, nombre, aplicación y clase;
- misma condición de entrada y de salida;
- exactamente un perfil vacío base;
- únicamente variantes permitidas por la fila;
- predicado correspondiente al perfil;
- CTA y alternativa existentes o `NONE`;
- política de refresco preservada;
- frontera de no inferencia preservada.

La huella contractual no puede cambiar silenciosamente al materializar componentes posteriores.

---

#### 11. Refresco, consistencia, privacidad y accesibilidad

Reglas transversales:

1. colas vacías usan actualización por evento o refresco manual controlado, no busy polling indiscriminado;
2. filtros permanecen hasta que el actor los cambie;
3. un vacío respaldado por caché declara frescura y se revalida cuando cambia la fuente;
4. el vacío no limpia borradores, adjuntos, capturas, evidencia o trabajo no confirmado;
5. un receipt confirmado invalida la proyección antes de mostrar una cola despejada;
6. una fuente externa no conciliada se entrega a recuperación, no a vacío;
7. cambiar actor en dispositivo compartido elimina primero el estado visible del actor anterior;
8. el vacío expresa únicamente ausencia dentro del alcance autorizado;
9. cliente y trabajador reciben estados limitados a sus propios recursos;
10. una URL directa a un recurso ajeno se resuelve mediante autorización y no enumeración, no mediante un vacío revelador;
11. filtros, conteos y telemetría no incluyen identificadores sensibles completos;
12. el significado del estado no depende exclusivamente de icono, color o animación;
13. el orden de foco y los anuncios accesibles conservan la intención y la acción disponible;
14. soporte y diagnóstico reciben referencias seguras, no payload empresarial completo.

---

#### 12. Fronteras críticas preservadas

La proyección mantiene, entre otras, estas fronteras materiales:

- `VSCREEN-0001` sin destinos no concede aplicaciones ni permisos;
- `VSCREEN-0004` no conserva el actor anterior en una estación compartida;
- `VSCREEN-0038` sin selección no crea una ubicación;
- `VSCREEN-0041` solo declara ausencia de diferencias después de conteo completo y fresco;
- `VSCREEN-0047..0050` sin remisiones no adelantan estados ni custodia;
- `VSCREEN-0057..0067` sin lote asignado no crean, inician ni cierran producción;
- `VSCREEN-0077` sin recepción elegible no genera entrada ni recepción parcial;
- `VSCREEN-0084` sin pedido seleccionado no inicia ni confirma pago;
- `VSCREEN-0089` y `VSCREEN-0090` no abren ni cierran caja al renderizar un vacío;
- `VSCREEN-0106` sin filas no genera un reporte oficial vacío como evidencia de inexistencia;
- `VSCREEN-0110` sin beneficio seleccionado no genera ticket ni consume puntos;
- `VSCREEN-0135` sin instancia no altera la definición del kit;
- `VSCREEN-0139` sin paradas no confirma entrega ni rechazo;
- `VSCREEN-0144` sin trabajos no configura impresoras ni reimprime automáticamente;
- `VSCREEN-0153` sin datos elegibles no ejecuta pago laboral;
- `VSCREEN-0162` y `VSCREEN-0164` con carrito vacío no crean pedido, reserva o pago;
- `VSCREEN-0165` sin resultado propio no revela pedido o pago ajeno;
- `VSCREEN-0173` sin evidencia no concluye que un lote o evento nunca existió;
- `VSCREEN-0177` sin endpoint conserva separadas configuración y cola productiva.

---

#### 13. Frontera con AUTH-UI-048, AUTH-UI-049 y AUTH-UI-051

| Condición | Propietario | Regla |
| --- | --- | --- |
| autorización, contexto o prerrequisito concluyentemente no permitido | `AUTH-UI-048` | no presentar denegación como ausencia de datos |
| dato, contexto, versión, cursor o efecto requerido todavía en resolución | `AUTH-UI-049` | no afirmar cero ni ausencia mientras la fuente está pendiente |
| consulta o inicialización autorizada, completa y fresca que cumple el predicado de ausencia | `AUTH-UI-050` | mostrar el perfil vacío y variante aprobados |
| fallo, timeout, rechazo, parcialidad, conflicto, dependencia degradada o resultado desconocido | `AUTH-UI-051` | no esconder una condición recuperable como vacío |

La clasificación del estado de interfaz no modifica autoridad, proceso, propiedad del recurso ni resultado empresarial.

---

#### 14. Gobierno de cambios y gate de consistencia

Cambiar un estado vacío exige declarar:

1. pantalla afectada;
2. perfil y variante anteriores y nuevos;
3. predicado de activación;
4. alcance y frescura;
5. contenido y terminología;
6. CTA primaria y acción alternativa;
7. impacto sobre entrada, salida, borrador, privacidad y telemetría;
8. pruebas, responsable, fecha y aprobación.

La validación debe fallar cuando ocurra cualquiera de estas condiciones:

- falta una de las 177 pantallas;
- cambia identidad, nombre, aplicación, clase, entrada o salida aprobados;
- una pantalla no tiene exactamente un perfil vacío base;
- se usa un perfil o variante fuera del vocabulario;
- el predicado no corresponde al perfil;
- una CTA o alternativa no pertenece al contrato de acciones o no es `NONE`;
- un vacío absorbe carga, bloqueo, error, parcialidad, asincronía o resultado desconocido;
- una cola despejada no exige consulta completa y fresca;
- un vacío filtrado no preserva filtros y alcance;
- ausencia de selección se trata como recurso inexistente;
- ausencia de historial o recurso propio enumera terceros;
- renderizar el vacío ejecuta una mutación o efecto externo;
- `EMPTY-CART` habilita checkout o pago;
- `EMPTY-NO-ENDPOINT` oculta un bloqueo operativo;
- `VARIANT-POST-COMPLETION-CLEAR` aparece sin receipt confirmado e invalidación/refresco;
- el vacío limpia borradores o evidencia no confirmados;
- los resúmenes por perfil o aplicación no reconcilian con 177;
- la huella contractual cambia silenciosamente.

---

#### 15. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea proyecta en BLOQUE I un contrato de estados vacíos ya aprobado y cubierto por requisitos existentes. No modifica el registro modular 04A.

---

#### 16. Cobertura de prueba vigente reutilizada

La cobertura existente derivada por `PROC-SCREEN-018` permanece vigente mediante `TREQ-UX-1007` a `TREQ-UX-1034`.

Esa cobertura protege, entre otros puntos:

- cardinalidad exacta de 177 pantallas y un perfil vacío base por pantalla;
- distinción entre vacío, carga, bloqueo, error, parcialidad y resultado desconocido;
- variantes filtrada, no selección y posterior a terminación;
- consulta completa y fresca antes de afirmar cola despejada;
- prohibición de autoasignación desde ausencia de trabajo;
- CTA limitadas a acciones ya aprobadas;
- no selección distinta de inexistencia o denegación;
- privacidad y no enumeración;
- carrito vacío sin checkout ni pago;
- colas sin busy polling indiscriminado;
- preservación de borradores y evidencia no confirmados;
- protección de remisiones, producción, POS, rutas, inventario e impresión frente a efectos materiales disparados por un vacío;
- gobierno versionado de cualquier cambio de disparador, perfil, variante, contenido o CTA.

Esta sección es trazabilidad de requisitos existentes y no representa creación ni modificación del registro.

---

#### 17. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El bloque todavía no ha sido insertado ni normalizado en el checkout de trabajo de la tarea. |
| LOCAL | NOT_EXECUTED | Las comprobaciones de formato, calidad, entrega, BLOQUE I, topología y plan corresponden al checkout después de insertar el bloque. |
| REMOTA | NOT_EXECUTED | La tarea todavía no tiene cierre documental, PR ni merge propios. |
| OPERATIVA | NOT_APPLICABLE | La tarea define un contrato documental de experiencia y no ejecuta una sesión operativa real. |
| FÍSICA | NOT_APPLICABLE | La tarea no modifica código, Supabase, datos, infraestructura, dispositivos, aplicaciones desplegadas ni configuración runtime. |

---

#### 18. Criterios de aceptación

`AUTH-UI-050` queda documentalmente aceptable cuando se demuestre todo lo siguiente:

- [ ] existen exactamente 177 decisiones de vacío, una por cada `VSCREEN-*` admitida;
- [ ] la distribución por aplicación suma 177 y no introduce superficies ficticias de AURA;
- [ ] los catorce perfiles suman 177 sin faltantes ni perfiles adicionales;
- [ ] las tres variantes conservan su predicado y regla de activación;
- [ ] cada vacío se activa únicamente después de una resolución autorizada, completa y suficientemente fresca;
- [ ] ninguna consulta parcial, stale, fallida, no autorizada o no conciliada produce vacío o cero confirmado;
- [ ] las 79 CTA primarias y 60 alternativas permanecen referenciadas desde acciones ya aprobadas y no se crean capacidades nuevas;
- [ ] renderizar vacío no ejecuta mutaciones ni efectos externos;
- [ ] `EMPTY-NO-ASSIGNED-WORK` no permite autoasignación;
- [ ] `EMPTY-CART` no permite checkout ni pago;
- [ ] `EMPTY-NO-ENDPOINT` no sustituye un bloqueo operativo;
- [ ] filtros, alcance, frescura, borradores, evidencia y privacidad se conservan según el contrato;
- [ ] no selección, no historial, no evidencia, no oferta, no recurso propio y no snapshot permanecen semánticamente diferenciados;
- [ ] `AUTH-UI-048`, `AUTH-UI-049` y `AUTH-UI-051` conservan sus fronteras sin absorción;
- [ ] la cobertura existente de prueba se reutiliza sin modificar el registro 04A;
- [ ] no se realizan cambios físicos en esta tarea documental.

---

#### 19. Límites

Esta tarea no:

- redefine estados sin acceso, cubiertos por `AUTH-UI-048`;
- redefine estados de carga o acciones pendientes, cubiertos por `AUTH-UI-049`;
- define la recuperación de errores, conflictos, parcialidad, timeout o resultados desconocidos, reservada a `AUTH-UI-051`;
- crea nuevos permisos, roles, acciones, procesos, rutas o superficies;
- cambia identidad, aplicación, entrada o salida de las 177 `VSCREEN-*`;
- crea una superficie para AURA;
- modifica contratos de servidor, Auth, RLS, RPC, migraciones o datos;
- implementa componentes, copy final, estilos, telemetría, hooks, loaders, empty states runtime ni pruebas de usuario;
- ejecuta acciones materiales por renderizar un vacío;
- cambia el registro 04A;
- autoriza la materialización física posterior derivada de `PER_IMPLEMENTATION_UNIT`.

La implementación, automatización y evidencia física permanecen sujetas a las instancias consumidoras, paquetes y gates que correspondan.

---

#### 20. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-049 — Estandarizar estados de carga`

**TAREA ACTUAL APROBADA**
`AUTH-UI-050 — Estandarizar estados vacíos`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-051 — Estandarizar errores recuperables`


### ✅ AUTH-UI-051 — Estandarizar errores recuperables

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-050 — Estandarizar estados vacíos
**Tarea siguiente:** AUTH-DEV-007 — Exigir firma o PIN del trabajador
**Tipo de tarea:** definición documental transversal de presentación y recuperación de errores recuperables sobre contratos canónicos existentes; materialización física posterior por `implementation_unit_id` conforme a `PER_IMPLEMENTATION_UNIT`
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** ninguno; no modifica código, componentes, rutas, Supabase, RLS, RPC, permisos, datos, integraciones, infraestructura, despliegues ni configuración runtime
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Estandarizar en BLOQUE I la presentación de errores recuperables sin crear una segunda fuente de verdad y sin convertir fallos, timeouts, rechazos, parcialidad, conflictos o resultados desconocidos en vacío, carga indefinida, denegación o éxito aparente.

La interfaz deberá conservar la semántica aprobada por `PROC-SCREEN-021` y presentar la recuperación como una transición controlada desde un defecto observado hacia una salida segura, reconciliada y verificable.

```text
FALLO O INCERTIDUMBRE OBSERVADA
+
ULTIMO ESTADO CONFIRMADO
+
TRABAJO LOCAL IDENTIFICADO
+
CORRELACION, VERSION, CURSOR O IDEMPOTENCY KEY
+
POLITICA DE REINTENTO DEL PERFIL
+
ACCION SEGURA Y ESCALAMIENTO
+
EVIDENCIA TERMINAL AUTORITATIVA
=
RECUPERACION SIN DUPLICIDAD, PERDIDA, FILTRACION NI EXITO FICTICIO
```

Invariantes:

```text
RECOVERY != EMPTY
RECOVERY != BLOCKED
RECOVERY != LOADING
TIMEOUT != OPERACION NO EJECUTADA
CALLBACK != RESULTADO TERMINAL
REINTENTO != REPETICION A CIEGAS
CERRAR LA VISTA != CANCELAR EL TRABAJO
```

---

#### 2. Fuentes y handoff consumidos

Esta tarea consume sin reinterpretación:

- `AUTH-UI-048`, que estandariza estados sin acceso cuando existe una decisión concluyente de denegación o bloqueo;
- `AUTH-UI-049`, que estandariza carga y acciones pendientes mientras una fuente o resultado continúan legítimamente en resolución;
- `AUTH-UI-050`, que estandariza estados vacíos únicamente después de una consulta autorizada, completa y fresca o de una condición de inicio demostrada;
- `PROC-SCREEN-021 — Definir recuperación ante errores`, propietario sustantivo del contrato de recuperación;
- la matriz `SCREEN-RECOVERY-STATE-MATRIX-001`, con una decisión única para cada una de las 177 pantallas canónicas;
- el registro modular 04A vigente, que ya contiene la cobertura de prueba derivada por `PROC-SCREEN-021`.

Los artefactos lógicos consumidos son:

- `SCREEN-RECOVERY-STATE-CONTRACT-001`;
- `SCREEN-RECOVERY-PRECEDENCE-001`;
- `SCREEN-RECOVERY-FAILURE-VOCABULARY-001`;
- `SCREEN-RECOVERY-PROFILE-CATALOG-001`;
- `SCREEN-RECOVERY-RETRY-POLICY-001`;
- `SCREEN-RECOVERY-UNKNOWN-RESULT-CONTRACT-001`;
- `SCREEN-RECOVERY-PRESERVATION-CONTRACT-001`;
- `SCREEN-RECOVERY-PARTIAL-RESULT-CONTRACT-001`;
- `SCREEN-RECOVERY-CONFLICT-CONTRACT-001`;
- `SCREEN-RECOVERY-EXTERNAL-CONTRACT-001`;
- `SCREEN-RECOVERY-OFFLINE-REALTIME-CONTRACT-001`;
- `SCREEN-RECOVERY-PRESENTATION-CONTRACT-001`;
- `SCREEN-RECOVERY-ACCESSIBILITY-PRIVACY-CONTRACT-001`;
- `SCREEN-RECOVERY-OBSERVABILITY-CONTRACT-001`;
- `SCREEN-RECOVERY-STATE-MATRIX-001`;
- `SCREEN-RECOVERY-STATE-SUMMARY-001`;
- `SCREEN-RECOVERY-STATE-CHANGE-POLICY-001`;
- `SCREEN-RECOVERY-STATE-VALIDATION-GATE-001`;
- `SCREEN-RECOVERY-STATE-CARRYOVER-REGISTER-001`.

No se crea una matriz competidora ni se modifica la autoridad de esos contratos.

---

#### 3. Resultado canónico

`AUTH-UI-051` congela para la capa de experiencia de BLOQUE I:

1. una precedencia única entre bloqueo, carga, recuperación, contenido y vacío;
2. dieciséis categorías canónicas de fallo;
3. dieciocho perfiles canónicos de recuperación;
4. siete políticas canónicas de reintento;
5. preservación explícita del último estado confirmado y del trabajo local permitido;
6. tratamiento separado del resultado desconocido después de posible aceptación;
7. reglas cerradas para validación, conflicto, parcialidad, Realtime, offline, archivos, dispositivos y reconciliación externa;
8. presentación humana, accesible y compatible con privacidad y no enumeración;
9. observabilidad con referencias seguras, sin payloads sensibles;
10. vinculación determinista `1:1` entre las 177 identidades `VSCREEN-*` y su fila en `SCREEN-RECOVERY-STATE-MATRIX-001`.

Resultado cuantitativo heredado y preservado:

| Dimensión | Resultado |
| --- | ---: |
| Pantallas con contrato de recuperación | 177 |
| Perfiles de recuperación | 18 |
| Categorías de fallo | 16 |
| Políticas de reintento | 7 |
| Contratos de preservación | 177 |
| Evidencias terminales | 177 |
| Rutas de escalamiento | 177 |
| Pantallas omitidas | 0 |
| Reintentos ciegos autorizados | 0 |
| Éxitos fabricados | 0 |
| Cargas, vacíos o bloqueos absorbidos como error | 0 |

---

#### 4. Precedencia de estado

La experiencia aplica esta precedencia conceptual:

```text
1. IDENTIDAD, AUTORIZACION O CONDICION CONOCIDA INCUMPLIDA
   -> AUTH-UI-048

2. OPERACION IDENTIFICADA TODAVIA EN CURSO DENTRO DE SU CONTRATO
   -> AUTH-UI-049

3. FALLO, TIMEOUT, RECHAZO, PARCIALIDAD, CONFLICTO O RESULTADO DESCONOCIDO
   -> AUTH-UI-051

4. RESULTADO AUTORIZADO, COMPLETO Y FRESCO CON DATOS
   -> CONTENIDO NORMAL

5. RESULTADO AUTORIZADO, COMPLETO Y FRESCO SIN DATOS
   -> AUTH-UI-050
```

Reglas obligatorias:

- una pérdida de sesión confirmada transfiere a estado sin acceso o bloqueo; un fallo al consultar la sesión permanece en recuperación hasta resolver la validez;
- una dependencia no configurada pertenece al bloqueo; una dependencia configurada pero indisponible pertenece a recuperación;
- un timeout no prueba que una mutación no haya sido aceptada;
- una consulta fallida, parcial, obsoleta o no autorizada nunca activa vacío ni confirma un conteo cero;
- una operación que continúa en servidor no permanece como spinner indefinido;
- un error local no invalida un éxito ya confirmado por la fuente;
- un éxito visual nunca sustituye confirmación autoritativa.

---

#### 5. Vocabulario canónico de fallo

Se consumen exactamente dieciséis categorías:

| Categoría | Semántica de experiencia |
| --- | --- |
| `NETWORK_UNAVAILABLE` | la fuente no pudo alcanzarse o se perdió conectividad sin resultado confiable |
| `REQUEST_TIMEOUT_BEFORE_ACCEPTANCE` | venció el plazo y existe evidencia de que la operación no fue aceptada |
| `RESULT_UNKNOWN_AFTER_POSSIBLE_ACCEPTANCE` | pudo existir aceptación de una mutación y falta la confirmación del resultado |
| `RATE_LIMITED` | la fuente rechazó temporalmente por frecuencia, cuota o protección antiabuso |
| `SERVER_REJECTION` | la fuente rechazó explícitamente la solicitud sin producir éxito |
| `VALIDATION_REJECTION` | la entrada incumple una regla de forma o negocio confirmada por la fuente |
| `VERSION_OR_CONCURRENCY_CONFLICT` | la base cambió, existe lock o una operación compite por el mismo recurso |
| `PARTIAL_RESULT` | solo una parte del conjunto, snapshot, lote o agregado quedó confirmada |
| `STALE_OR_OUT_OF_ORDER_RESPONSE` | una respuesta antigua o fuera de orden compite con una versión más reciente |
| `DEPENDENCY_UNAVAILABLE` | una dependencia configurada está indisponible o degradada |
| `REALTIME_GAP` | el cursor, secuencia o stream tiene un hueco, desconexión u orden incierto |
| `OFFLINE_SYNC_CONFLICT` | un hecho local no puede aceptarse, deduplicarse u ordenarse limpiamente al sincronizar |
| `EXTERNAL_RECONCILIATION_UNKNOWN` | un proveedor, pago, impresión, entrega o adaptador pudo producir efecto sin confirmación canónica |
| `FILE_OR_INTEGRITY_FAILURE` | archivo, evidencia, checksum, tamaño, formato o generación no pudo verificarse |
| `DEVICE_OR_PERIPHERAL_FAILURE` | cámara, escáner, impresora, geolocalización o dispositivo no produjo resultado verificable |
| `UNEXPECTED_INTERNAL_FAILURE` | ocurrió un defecto no clasificado sin resultado empresarial confiable |

Cada incidente visible usa una categoría primaria. Las causas secundarias pueden existir para diagnóstico interno, pero no se convierten en copy técnico, SQL, stack trace, secreto, política interna, clave, payload empresarial o enumeración de recursos.

---

#### 6. Políticas canónicas de reintento

Se consumen exactamente siete políticas:

| Política | Regla |
| --- | --- |
| `AUTO_READ_RETRY_WITH_BACKOFF` | solo lecturas idempotentes; máximo acotado, jitter y respeto de `retry-after` |
| `USER_INITIATED_READ_RETRY` | la persona repite una lectura segura sin duplicar mutaciones ni borrar el último snapshot |
| `REVALIDATE_CONTEXT_THEN_RETRY` | revalidar actor, alcance, recurso, versión y prerrequisitos antes de una nueva solicitud |
| `RESOLVE_VALIDATION_OR_CONFLICT_THEN_RETRY` | corregir entrada o resolver diferencia de versión antes de crear un nuevo intento |
| `STATUS_BEFORE_MUTATION_RETRY` | consultar estado por referencia o idempotency key antes de decidir si corresponde repetir |
| `RECONCILE_OFFLINE_OR_STREAM_THEN_CONTINUE` | recuperar cursor o conciliar hechos locales individualmente antes de continuar |
| `NO_BLIND_RETRY_ESCALATE` | no repetir automáticamente; reconciliar, abandonar de forma segura o escalar con correlación |

Reglas transversales:

1. solo las lecturas idempotentes admiten reintento automático;
2. todo reintento automático es acotado, cancelable, observable y respeta `retry-after` cuando exista;
3. toda mutación con aceptación incierta exige consultar el estado antes de repetir;
4. la misma referencia de cliente o idempotency key identifica la consulta y reconciliación del intento original;
5. un nuevo intento material solo nace cuando existe evidencia autoritativa de que el anterior no produjo efecto;
6. pago, caja, custodia, inventario, entrega, publicación, cierre, conciliación y efectos externos nunca se repiten a ciegas;
7. agotado el límite de intentos, la interfaz ofrece escalamiento o abandono seguro y no reinicia el ciclo indefinidamente.

---

#### 7. Catálogo de perfiles de recuperación

Las 177 pantallas se vinculan exactamente a estos dieciocho perfiles:

| Perfil | Pantallas | Política dominante |
| --- | ---: | --- |
| `RECOVERY-ANALYTIC-SNAPSHOT` | 8 | lectura idempotente acotada; preservar snapshot confirmado y `as_of` |
| `RECOVERY-AUTH-CHANNEL` | 1 | reintento iniciado por la persona sin enumeración de cuenta ni retención de secretos |
| `RECOVERY-CASE-WORKSPACE` | 23 | resolver validación o conflicto conservando caso, borrador, adjuntos y referencia |
| `RECOVERY-CUSTOMER-FLOW` | 14 | consultar estado antes de repetir mutaciones de recursos propios |
| `RECOVERY-DEVICE-BOOTSTRAP` | 1 | limpiar residuos del actor anterior y revalidar dispositivo y contexto |
| `RECOVERY-DOCUMENT-EVIDENCE` | 3 | preservar referencia local e integridad; revalidar antes de transferir o regenerar |
| `RECOVERY-EXTERNAL-RECONCILIATION` | 3 | reconciliar correlaciones interna y externa; cero reintento ciego |
| `RECOVERY-FINANCIAL-WORKSPACE` | 14 | consultar estado antes de postings, aprobaciones, conciliación, cierre o evidencia |
| `RECOVERY-IDENTITY-CONTEXT` | 2 | limpiar datos incompatibles y revalidar identidad, sesión y alcance |
| `RECOVERY-OPERATIONAL-TASK` | 34 | consultar estado antes de repetir transición, custodia, sincronización o captura |
| `RECOVERY-POS-TRANSACTION` | 8 | consultar transacción antes de repetir venta, pago, caja o receipt |
| `RECOVERY-QUEUE-SNAPSHOT` | 22 | lectura idempotente acotada; no producir vacío o cero desde consulta incompleta |
| `RECOVERY-REALTIME-COMMUNICATION` | 3 | reconciliar cursor y envío; reenviar solo con evidencia de no aceptación |
| `RECOVERY-REALTIME-TRACKING` | 3 | reconciliar stream y snapshot sin inferir estados terminales desde huecos |
| `RECOVERY-ROUTE-EXECUTION` | 5 | reconciliar ruta, parada, custodia, evidencia y último sync antes de continuar |
| `RECOVERY-SELF-SERVICE` | 14 | revalidar contexto y preservar únicamente datos propios confirmados y borrador permitido |
| `RECOVERY-VERSIONED-EDITOR` | 18 | resolver validación o conflicto sin sobrescritura silenciosa ni pérdida de borrador |
| `RECOVERY-WORKSPACE-HUB` | 1 | reintento de lectura iniciado por la persona sin destinos stale ni residuos cross-actor |
| **Total** | **177** | **cobertura completa** |

La asignación de perfil no se infiere por nombre de ruta, componente, aplicación o último mensaje mostrado. Se consume de la fila única de `SCREEN-RECOVERY-STATE-MATRIX-001`.

---

#### 8. Universo canónico de aplicación

La proyección cubre exactamente el universo `VSCREEN-*` ya aprobado:

| Aplicación | Universo | Pantallas |
| --- | --- | ---: |
| `shell` | `VSCREEN-0001..0006`; `VSCREEN-0175` | 7 |
| `viso` | `VSCREEN-0007..0026`; `VSCREEN-0113..0123` | 31 |
| `anima` | `VSCREEN-0027..0032`; `VSCREEN-0124..0131` | 14 |
| `nexo` | `VSCREEN-0033..0054`; `VSCREEN-0132..0144`; `VSCREEN-0176..0177` | 37 |
| `fogo` | `VSCREEN-0055..0067`; `VSCREEN-0173..0174` | 15 |
| `origo` | `VSCREEN-0068..0079`; `VSCREEN-0145..0146` | 14 |
| `pulso` | `VSCREEN-0080..0093`; `VSCREEN-0147..0152` | 20 |
| `numera` | `VSCREEN-0094..0106`; `VSCREEN-0153..0159` | 20 |
| `pass` | `VSCREEN-0107..0112`; `VSCREEN-0160..0172` | 19 |
| **Total** | **universo materializado** | **177** |

AURA permanece sin `VSCREEN-*` en este universo. Esta tarea no fabrica una pantalla, perfil o error recuperable inexistente para AURA.

---

#### 9. Vinculación determinista por pantalla

Para cada una de las 177 identidades se aplica esta resolución cerrada:

```text
screen_id
-> fila unica en SCREEN-RECOVERY-STATE-MATRIX-001
-> empty_profile heredado
-> load_profile heredado
-> block_profile heredado
-> recovery_profile
-> allowed_failure_categories
-> preservation_policy
-> recovery_actions
-> retry_policy
-> terminal_evidence
-> escalation_route
-> recovery_boundary
```

Condiciones de integridad:

- una fila por `screen_id`;
- cero faltantes;
- cero duplicados;
- mismo nombre, aplicación, clase y entrada aprobados;
- mismos perfiles vacío, carga y bloqueo heredados;
- exactamente un perfil de recuperación;
- solo categorías de fallo del vocabulario canónico;
- al menos una salida segura, evidencia terminal, escalamiento y frontera;
- ninguna reclasificación local por conveniencia visual;
- ninguna segunda matriz de autoridad dentro de BLOQUE I.

La decisión individual de cada pantalla es, por tanto, la fila identificada por su `screen_id` en la matriz canónica de `PROC-SCREEN-021`; esta proyección obliga a consumirla completa y sin reinterpretación.

---

#### 10. Resultado desconocido e idempotencia

Cuando una solicitud mutable pierde su confirmación:

```text
SOLICITUD MUTABLE EMITIDA
-> POSIBLE ACEPTACION
-> CONFIRMACION PERDIDA
-> NO ASUMIR EXITO NI FALLO
-> CONSULTAR ESTADO POR CORRELACION O IDEMPOTENCY KEY
-> RECONCILIAR UN UNICO RESULTADO CANONICO
-> SOLO ENTONCES CONFIRMAR, CORREGIR, REINTENTAR O ESCALAR
```

Reglas:

- un timeout posterior al envío se trata como resultado desconocido salvo evidencia autoritativa de no aceptación;
- no se genera una segunda venta, pago, redención, movimiento, decisión, mensaje, impresión, entrega o publicación para resolver incertidumbre;
- `202 Accepted`, callback, evento aislado, trabajo en cola o respuesta de periférico son intermedios cuando el contrato exige reconciliación adicional;
- salir de la pantalla no cancela la operación;
- cancelar exige capacidad contractual y confirmación propia;
- si la fuente no ofrece consulta de estado, se aplica `NO_BLIND_RETRY_ESCALATE` y se preserva la correlación para soporte.

---

#### 11. Preservación, parcialidad y conflicto

Durante recuperación:

1. se conserva el último dato confirmado con versión, cursor o `as_of` cuando pertenece al actor y alcance vigentes;
2. formularios, carritos, conteos, capturas, archivos, rutas y evidencias locales permanecen separados del estado empresarial confirmado;
3. el trabajo local no se limpia antes de receipt, descarte explícito o exportación segura;
4. cambiar actor, sesión, cuenta, sede o token elimina primero todo dato incompatible;
5. los datos parciales se identifican como incompletos y no participan en totales, cierres, aprobaciones o decisiones que exijan cobertura completa;
6. respuestas stale o fuera de orden se descartan por versión, cursor o secuencia;
7. los valores optimistas se revierten o quedan marcados y no sustituyen dinero, custodia, permisos, saldos ni estados terminales;
8. una validación rechazada conserva valores y enfoca el primer problema accionable;
9. un conflicto de versión conserva borrador y base confirmada y prohíbe sobrescritura silenciosa;
10. si el conflicto demuestra que la acción ya no está autorizada por contexto, estado o autoridad, el caso abandona recuperación y transfiere a estado sin acceso o bloqueo.

---

#### 12. Realtime, offline, archivos, dispositivos y externos

Reglas de continuidad:

- Realtime reanuda desde un cursor válido o solicita snapshot completo; no infiere estados terminales desde un hueco;
- la sincronización offline resuelve cada hecho como aceptado, duplicado, rechazado o en conflicto;
- recuperar conectividad no equivale a éxito global de la cola offline;
- pagos, impresión, entrega, mensajería, archivos y proveedores conservan correlaciones interna y externa;
- un adaptador indisponible se distingue de uno no configurado;
- un periférico distingue comando emitido, recibido, ejecutado y resultado físico verificado;
- un archivo distingue selección local, transferencia, recepción, validación de integridad y registro canónico;
- una fuente externa no conciliada permanece en recuperación y nunca produce vacío o éxito final por sí sola.

---

#### 13. Presentación, accesibilidad, privacidad y soporte

Todo estado recuperable explica, con lenguaje humano:

1. qué no pudo completarse;
2. qué información o trabajo se conservó;
3. si el resultado es conocido o desconocido;
4. qué acción segura está disponible;
5. cuándo corresponde reconciliar o esperar;
6. cuándo debe escalarse;
7. una referencia segura cuando soporte pueda utilizarla.

Prohibiciones:

- no usar éxito para ocultar incertidumbre;
- no usar vacío para ocultar fallo;
- no usar denegación para ocultar fallo técnico;
- no mostrar SQL, stack traces, tokens, payloads, políticas internas, identificadores sensibles o recursos ajenos;
- no revelar existencia de cuenta, pedido, saldo, expediente o recurso fuera del alcance;
- no mover de forma inesperada la acción principal durante un reintento.

Accesibilidad:

- el foco permanece en el contexto del error o se mueve de forma predecible al resumen de recuperación;
- una región parcial anuncia el fallo una sola vez y no interrumpe regiones independientes;
- reintento, corrección, reconciliación y escalamiento respetan contraste, movimiento reducido, tamaño táctil y lectura asistiva.

---

#### 14. Observabilidad y evidencia

Cuando corresponda, la observabilidad conserva:

- `screen_id`;
- perfil de recuperación;
- categoría primaria;
- actor y recurso mediante referencias opacas;
- operación, intento y correlación con tratamiento seguro;
- versión, cursor, fase y momento del fallo;
- política de reintento y número acotado de intento;
- señal de posible aceptación;
- reconciliación, abandono o escalamiento;
- resultado terminal y referencia de evidencia;
- transición desde carga, bloqueo o contenido y destino posterior.

No se registran secretos, datos completos de pago, códigos de un solo uso, documentos completos, mensajes sensibles, archivos ni payloads empresariales sin una política específica que lo autorice.

---

#### 15. Fronteras con tareas vecinas y autoridad

| Condición | Propietario de experiencia | Regla |
| --- | --- | --- |
| denegación, falta de autoridad o condición conocida incumplida | `AUTH-UI-048` | presentar límite concluyente sin atribuirlo a fallo técnico |
| fuente o resultado identificados todavía en curso | `AUTH-UI-049` | presentar carga acotada sin fabricar éxito |
| lectura autorizada, completa y fresca con ausencia demostrada | `AUTH-UI-050` | presentar vacío sin confundirlo con fallo |
| fallo, timeout, rechazo, parcialidad, conflicto o resultado desconocido observado | `AUTH-UI-051` | recuperar, reconciliar, corregir, escalar o abandonar con seguridad |

`AUTH-UI-051` no decide permisos, roles, RLS, RPC, autenticación, autoridad empresarial, idempotencia de servidor ni resultado de dominio. La interfaz consume esas decisiones y evidencias; no las reemplaza.

La familia de mensajes de bloqueo y error sigue siendo propietaria de sus reason codes. Esta tarea no crea ni renombra códigos de razón y no convierte el copy visible en lógica de autorización.

---

#### 16. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

La tarea proyecta sobre BLOQUE I un contrato de recuperación ya aprobado y cubierto por el registro modular vigente. No incorpora una regla nueva ni altera una fila de prueba existente.

---

#### 17. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro 04A, la cobertura derivada por `PROC-SCREEN-021`:

`TREQ-UX-1097..1130`

La cobertura vigente protege, entre otros aspectos:

- activación de recuperación únicamente ante fallos o incertidumbre observada;
- salida de carga cuando se supera el plazo contractual;
- distinción entre dependencia no configurada y dependencia indisponible;
- prohibición de vacío desde consulta fallida, parcial, stale o no autorizada;
- preservación de último dato confirmado y trabajo local;
- limpieza de datos incompatibles al cambiar actor o contexto;
- prohibición de fabricar resultados empresariales;
- reintento automático limitado a lecturas idempotentes;
- consulta de estado antes de repetir mutaciones con aceptación posible;
- reconciliación de pagos, caja, custodia, inventario, entrega, publicación y efectos externos;
- integridad de archivos, hardware, Realtime y offline;
- accesibilidad, privacidad, referencias seguras y observabilidad;
- escalamiento o abandono seguro después del límite de intentos;
- versionado contractual de cualquier cambio en perfil, categoría, preservación, acción, retry, evidencia, escalamiento o frontera.

Esta sección es trazabilidad reutilizada y no declara requisitos afectados por la entrega.

---

#### 18. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El artefacto documental todavía no ha sido insertado ni normalizado en el checkout de trabajo. |
| LOCAL | NOT_EXECUTED | El formateo, la calidad de tarea, la entrega, BLOQUE I, topología y la batería documental deben ejecutarse después de insertar el bloque en su archivo propietario. |
| REMOTA | NOT_EXECUTED | Todavía no existe PR ni merge de `AUTH-UI-051`; la proyección preentrega no sustituye el cierre documental del repositorio. |
| OPERATIVA | NOT_APPLICABLE | Esta tarea define semántica documental de recuperación y no ejecuta una sesión operativa real. |
| FÍSICA | NOT_APPLICABLE | Esta tarea no modifica código, Supabase, datos, infraestructura, dispositivos, aplicaciones desplegadas ni configuración runtime. |

---

#### 19. Criterios de aceptación

`AUTH-UI-051` queda documentalmente aceptable cuando:

- [ ] las 177 pantallas conservan identidad, nombre, aplicación, clase, entrada y contratos precedentes;
- [ ] cada pantalla consume exactamente una fila de `SCREEN-RECOVERY-STATE-MATRIX-001`;
- [ ] los 18 perfiles de recuperación suman 177;
- [ ] se usan exclusivamente las 16 categorías canónicas de fallo;
- [ ] se usan exclusivamente las 7 políticas canónicas de reintento;
- [ ] cada pantalla conserva preservación, acciones seguras, evidencia terminal, escalamiento y frontera;
- [ ] una condición conocida incumplida no se presenta como recuperación;
- [ ] una operación todavía en curso no se presenta como fallo;
- [ ] una consulta fallida, parcial, stale o no autorizada no produce vacío ni conteo cero;
- [ ] un timeout mutable no autoriza repetición ciega;
- [ ] resultado desconocido exige consulta o reconciliación antes de repetir;
- [ ] borradores, carritos, conteos, rutas, archivos y evidencias no se pierden por entrar en recuperación;
- [ ] parcialidad no se presenta como cobertura completa;
- [ ] conflicto no sobrescribe una versión silenciosamente;
- [ ] Realtime y offline recuperan continuidad mediante cursor, snapshot o conciliación por elemento;
- [ ] pago, caja, custodia, inventario, entrega, publicación, cierre, conciliación y efectos externos consultan estado antes de repetir;
- [ ] mensajes, accesibilidad, soporte y observabilidad no filtran información sensible;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se realizan cambios físicos en esta tarea documental.

---

#### 20. Límites

Esta tarea no:

- modifica el contrato de estados sin acceso de `AUTH-UI-048`;
- modifica el contrato de carga de `AUTH-UI-049`;
- modifica el contrato de vacío de `AUTH-UI-050`;
- crea o altera categorías, perfiles, retry policies o filas de `PROC-SCREEN-021`;
- modifica reason codes de la familia de mensajes de bloqueo y error;
- decide autenticación, permisos, roles, contexto, RLS, RPC, idempotencia de servidor o resultados de dominio;
- crea rutas, acciones, pantallas, procesos, datos, tablas, migraciones o integraciones;
- implementa componentes de error, hooks, toasts, modales, banners, retries, colas, adaptadores, telemetría o estilos;
- ejecuta cambios en Supabase, infraestructura, proveedores, periféricos o despliegues;
- autoriza ninguna instancia física derivada de `PER_IMPLEMENTATION_UNIT`;
- modifica el registro 04A;
- desarrolla `AUTH-DEV-007`;
- desarrolla ni adelanta `AUTH-UI-052..060`, que pertenecen a una etapa posterior de continuidad.

La materialización física posterior solo podrá ocurrir mediante la instancia correspondiente a cada `implementation_unit_id` y sus gates autorizados.

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:AUTH-UI-052-060 -->
### Reconciliación topológica de AUTH-UI-052 a AUTH-UI-060

Estas tareas diseñan, prototipan, prueban y aprueban el contrato de experiencia antes de implementación. Se agotan como definición canónica y no generan una unidad física independiente.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-050 — Estandarizar estados vacíos`

**TAREA ACTUAL APROBADA**
`AUTH-UI-051 — Estandarizar errores recuperables`

**SIGUIENTE TAREA RESERVADA**
`AUTH-DEV-007 — Exigir firma o PIN del trabajador`

### ✅ AUTH-UI-052 — Diseñar página inicial según actor

**Estado:** APROBADA
**Tarea anterior:** NEXO-UX-048 — Validar el prototipo con Operaciones, Producción, Limpieza, Mantenimiento, SST y responsables de sede
**Tarea siguiente:** AUTH-UI-053 — Diseñar navegación según tareas frecuentes
**Tipo de tarea:** documental global; diseño funcional de la entrada de cada aplicación según actor efectivo, función activa, contexto territorial, trabajo autorizado y modalidad de dispositivo
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar la página inicial o superficie de entrada equivalente de cada aplicación incluida en la rectificación vigente de `AUTH-UI-052..060`, de forma que el primer estado interactivo útil dependa del actor efectivo, la función activa, el carril de experiencia, el contexto territorial o personal, el dispositivo y el trabajo realmente autorizado.

La regla global es:

```text
ACTOR EFECTIVO
+
FUNCION ACTIVA O RELACION PERSONAL VIGENTE
+
CARRIL DE EXPERIENCIA
+
CONTEXTO Y TERRITORIO APLICABLES
+
DISPOSITIVO Y SESION COMPATIBLES
+
TRABAJO, OBLIGACIONES Y CAPACIDADES AUTORIZADAS
+
ESTADO, FRESCURA Y SENSIBILIDAD
=
UNA SOLA PROYECCION INICIAL COHERENTE
```

La página inicial organiza trabajo y contexto ya autorizados. No concede permisos, no amplía territorio, no fusiona funciones y no sustituye la revalidación de servidor de cada lectura o mutación.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- decisión explícita para las diez aplicaciones exigidas por la rectificación vigente;
- identificación de la superficie inicial existente cuando ya hay una entrada interactiva canónica o inventariada;
- `NO_APLICA` justificado cuando no existe una aplicación operativa o una superficie inicial gobernable dentro de Vento OS;
- resolución por actor, función, contexto, carril y dispositivo;
- una proyección activa por render;
- acción principal o foco inicial cuando exista trabajo ejecutable;
- obligaciones, bloqueos y handoffs secundarios sin competir con la acción principal;
- reutilización de estados y reglas ya aprobados para contexto, simulación, sin acceso, carga, vacío y errores recuperables;
- responsive, accesibilidad, minimización, sensibilidad y cambio de contexto;
- preservación de la evidencia NEXO ya materializada como perfil específico de aplicación.

##### 2.2. Excluido

- diseñar la navegación completa por tareas frecuentes, reservada a `AUTH-UI-053`;
- reducir opciones irrelevantes fuera de la entrada, reservado a `AUTH-UI-054`;
- crear prototipos visuales finales, reservado a `AUTH-UI-055`;
- declarar validación interna de prototipos, reservada a `AUTH-UI-056`;
- definir criterios de usabilidad por superficie, reservado a `AUTH-UI-057`;
- probar con usuarios reales, registrar hallazgos o aprobar pantallas, reservados a `AUTH-UI-058..060`;
- crear rutas, pantallas, procesos, permisos, roles, tablas, RLS, RPC, migraciones, datos, eventos o componentes;
- ejecutar cambios en aplicaciones o Supabase;
- convertir una home en backoffice universal;
- inventar una home para una aplicación futura, no desplegada o fuera de Vento OS.

---

#### 3. Resultado material

Se definen ocho artefactos documentales globales:

1. `APPLICATION-ACTOR-HOME-CONTRACT-001`, contrato común de la entrada según actor y contexto;
2. `APPLICATION-ACTOR-HOME-COVERAGE-MATRIX-001`, decisión exhaustiva para las diez aplicaciones requeridas;
3. `APPLICATION-ACTOR-HOME-RESOLUTION-CONTRACT-001`, resolución autoritativa de la proyección inicial;
4. `APPLICATION-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`, zonas comunes sin imponer un layout físico único;
5. `APPLICATION-ACTOR-HOME-PRIORITY-CONTRACT-001`, foco, acción principal y siguiente trabajo;
6. `APPLICATION-ACTOR-HOME-STATE-MAPPING-001`, composición de estados existentes sin crear una taxonomía paralela;
7. `APPLICATION-ACTOR-HOME-RESPONSIVE-ACCESSIBILITY-CONTRACT-001`, reglas por modalidad de dispositivo y accesibilidad;
8. `APPLICATION-ACTOR-HOME-HANDOFF-001`, entrega exacta a `AUTH-UI-053` sin iniciar la navegación frecuente.

Cobertura global:

| Elemento | Total esperado | Total materializado | Faltantes | Duplicados |
| --- | ---: | ---: | ---: | ---: |
| Aplicaciones exigidas por la rectificación | 10 | 10 | 0 | 0 |
| Aplicaciones con entrada interactiva aplicable | 8 | 8 | 0 | 0 |
| Aplicaciones con `NO_APLICA` justificado | 2 | 2 | 0 | 0 |
| Perfiles específicos preservados de NEXO | 1 | 1 | 0 | 0 |
| Contextos NEXO preservados | 8 | 8 | 0 | 0 |
| Rutas, pantallas o superficies nuevas | 0 | 0 | 0 | 0 |
| Roles, funciones o permisos nuevos | 0 | 0 | 0 | 0 |
| Requisitos de prueba nuevos o modificados | 0 | 0 | 0 | 0 |

El resultado queda `ESPECIFICADO`. No se declara `IMPLEMENTADO`, `VALIDADO_CON_USUARIOS` ni disponible en producción por efecto de esta tarea.

---

#### 4. Fuentes y precedencia consumidas

La tarea consume sin redefinir:

- la rectificación integral de `AUTH-UI-052..060`, que exige cobertura global de ANIMA, FOGO, NEXO, NUMERA, ORIGO, PASS, PULSO, TALENTO, VISO y VITAL;
- los inventarios de superficies de BLOQUE I;
- la arquitectura transversal de actor, tarea, navegación y contexto de E2;
- los contratos de relevancia contextual y contexto activo ya aprobados;
- las reglas de navegación y autorización de `AUTH-UI-030..045`;
- la presentación de contexto y simulación de `AUTH-UI-046..047`;
- los estados sin acceso, carga, vacío y recuperación de `AUTH-UI-048..051`;
- los contratos de aplicación, proceso, pantalla, actor, dispositivo y sensibilidad vigentes;
- la evidencia NEXO histórica producida en el carril `NEXO-REMISSIONS-001`, únicamente como insumo específico de NEXO y nunca como prueba de cobertura global.

Precedencia de interpretación:

```text
RECTIFICACION GLOBAL AUTH-UI-052..060
>
EVIDENCIA PARCIAL HISTORICA NEXO
```

Por tanto, el diseño NEXO se conserva, pero no limita ni define por analogía las otras nueve decisiones de cobertura.

---

#### 5. `APPLICATION-ACTOR-HOME-CONTRACT-001`

##### 5.1. Unidad de entrada

La unidad es la primera superficie interactiva útil que representa la relación real del actor con la aplicación después de resolver acceso, bootstrap y contexto.

No se consideran home empresarial por sí solos:

- login;
- splash;
- redirect bridge;
- no-access;
- error boundary;
- update gate;
- callback;
- route handler;
- layout;
- loader técnico;
- selector que todavía no resolvió actor o contexto.

Una aplicación móvil puede tener un bootstrap previo y una home posterior. Una aplicación web puede reutilizar `/` como home. La identidad física existente se conserva; esta tarea no crea otra ruta para cada rol.

##### 5.2. Proyección única

Cada render mantiene una sola proyección activa.

```text
MULTIPLES FUNCIONES AUTORIZADAS
!=
UNION DE TODAS LAS HOMES
```

Si una persona puede actuar en más de una función, se exige una función o relación activa inequívoca antes de componer controles, datos y acciones.

##### 5.3. No autoridad de la presentación

No conceden autoridad:

- estar en la ruta `/`;
- entrar desde un favorito o deep link;
- una tarjeta visible;
- un conteo;
- un nombre de rol;
- un `navigation_role`;
- el último contexto almacenado;
- una sede seleccionada como filtro;
- el tipo de dispositivo;
- haber ejecutado esa tarea antes;
- que otra función del mismo usuario tenga el permiso.

##### 5.4. Minimización

La home recibe la proyección mínima suficiente para orientar el trabajo. No obtiene un universo global para ocultarlo después en cliente.

---

#### 6. `APPLICATION-ACTOR-HOME-RESOLUTION-CONTRACT-001`

Antes de componer una entrada aplicable, el servidor o contrato propietario debe poder resolver, según corresponda:

```text
PRINCIPAL AUTENTICADO
+
ACTOR EFECTIVO O SUJETO PERSONAL
+
FUNCION ACTIVA
+
CARRIL DE EXPERIENCIA
+
EMPRESA / SEDE / AREA / TERRITORIO / PERIODO
+
TURNO Y CHECK-IN CUANDO APLIQUEN
+
DISPOSITIVO Y SESION
+
PERMISOS Y CAPACIDADES EXACTAS
+
ASIGNACION / PARTICIPACION / CUSTODIA / RESPONSABILIDAD
+
ESTADO / ETAPA / VERSION / FRESCURA
+
SENSIBILIDAD Y MASKING
```

Resultado posible:

1. proyección resoluble y lista;
2. contexto todavía en resolución;
3. carga de datos posteriores a una resolución válida;
4. vacío válido;
5. sin acceso concluyente;
6. reautenticación o identificación adicional requerida;
7. datos parciales;
8. contexto cambiado o revocado;
9. indisponibilidad o error recuperable;
10. resultado de mutación previo todavía desconocido y pendiente de conciliación.

La composición visible no redefine esos estados; los mapea a sus contratos propietarios.

---

#### 7. `APPLICATION-ACTOR-HOME-COVERAGE-MATRIX-001`

| Aplicación | Entrada existente o referencia gobernada | Aplicabilidad | Actor / carril dominante de entrada | Foco inicial aprobado | Decisión |
| --- | --- | --- | --- | --- | --- |
| ANIMA | `ANIMA-SCREEN-004` — `/home` después del bootstrap de `ANIMA-SCREEN-001..002` | `APLICA` | trabajador en experiencia personal y operación móvil ligera; supervisión puntual cuando exista capacidad | asistencia y jornada propias, acción vigente de check-in/check-out cuando aplique, turno actual, obligaciones personales y alertas necesarias | una home personal-operativa; no se convierte en planner administrativo denso ni mezcla controles de manager con los del trabajador |
| FOGO | `FOGO-ROUTE-001` — `/` | `APLICA` | producción, supervisión o administración de producción según función activa | trabajo productivo o cola autorizada; si el actor está en gobierno, plan/receta/versión correspondiente | ejecución productiva y gobierno de receta/plan permanecen separados; el mismo `/` resuelve una sola proyección por función |
| NEXO | `NEXO-ROUTE-001` — `/` | `APLICA` | solicitante, bodega/preparación, conducción/custodia, recepción, supervisión o configuración | acción o siguiente trabajo autoritativo del perfil NEXO preservado | se conserva el perfil NEXO específico de esta tarea y se integra como una fila del contrato global, no como patrón impuesto al resto |
| NUMERA | `NUMERA-ROUTE-001` — `/` | `APLICA` | trabajo administrativo, financiero, conciliación y auditoría | periodo/entidad/centro aplicables, obligaciones o cierres pendientes, excepciones y análisis autorizados | no ejecuta hechos físicos; una selección financiera o filtro no se transforma en contexto operativo |
| ORIGO | `ORIGO-ROUTE-001` — `/` | `APLICA` | compras y proveedores, aprobación, conciliación o recepción delimitada según función | solicitud/orden/aprobación/recepción prioritaria que corresponda al actor | recepción física no presta autoridad de comprador o aprobador; administración y recepción permanecen separadas |
| PASS | `PASS-CUSTOMER-SURFACE-003` — `Home — inicio del cliente` | `APLICA` | cliente sobre su propia relación | identidad personal, puntos/beneficios, pedidos propios y accesos personales habilitados | la home de cliente no incorpora soporte laboral ni operación PULSO; una identidad cliente no concede función interna |
| PULSO | `PULSO-ROUTE-001` — `/` | `APLICA` | venta/servicio operativo con sesión, sede y dispositivo; administración comercial separada | sesión operativa y acción de venta/servicio vigente o trabajo de caja compatible | el inicio operativo no mezcla configuración, importación administrativa, análisis o cierre si la función activa no los autoriza |
| TALENTO | producto futuro sin despliegue comprobado y sin `app_code` canónico vigente para pantallas | `NO_APLICA` | no existe carril interactivo productivo gobernable en este corte | ninguno | no se diseña ni se inventa una home; la fila queda explícita para no confundir código futuro con aplicación operativa |
| VISO | `VISO-ROUTE-001` — `/` | `APLICA` | administración, supervisión, configuración o auditoría según responsabilidad | casos, obligaciones, aprobaciones, bloqueos o vistas de control vinculadas al alcance del actor | no existe backoffice universal; supervisión, configuración, auditoría y administración mantienen capacidad y alcance propios |
| VITAL | proyecto separado y fuera de Vento OS en el corte canónico vigente | `NO_APLICA` | fuera del universo operativo de esta tarea | ninguno | no se asigna home, actor Vento OS, ruta o contrato de entrada; su existencia técnica no lo convierte en aplicación Vento OS |

Reconciliación:

```text
EXPECTED_APPLICATIONS = 10
MATERIALIZED_DECISIONS = 10
APPLIES = 8
NOT_APPLICABLE = 2
MISSING = 0
DUPLICATES = 0
```

---

#### 8. Perfil ANIMA

La entrada interactiva es `/home`; `/` y `/splash` son bootstrap y redirección, no homes empresariales independientes.

La proyección ordinaria prioriza:

1. actor trabajador identificado;
2. estado de jornada y asistencia;
3. sede/área/turno cuando sean relevantes y resolubles;
4. acción personal vigente de asistencia;
5. turno y obligación personal próxima;
6. incidencias o alertas propias que requieran atención;
7. accesos personales secundarios.

Una capacidad de manager no convierte la home del trabajador en una vista agregada de toda la sede. La supervisión puntual se muestra únicamente cuando la función activa y la capacidad exacta la hacen relevante.

---

#### 9. Perfil FOGO

La entrada `/` resuelve el carril antes de mostrar trabajo.

- ejecución productiva: siguiente lote, orden, etapa o evidencia atribuible;
- supervisión: bloqueos, vencimientos, cobertura y excepciones dentro del alcance;
- administración/configuración: receta, versión, plan o liberación únicamente cuando esa función esté activa.

No se presenta una receta editable, una liberación sensible o una configuración global como acción ordinaria de quien está ejecutando producción.

---

#### 10. Perfil NEXO preservado

La materialización histórica NEXO se conserva como `NEXO-ACTOR-HOME-PROFILE-001` dentro del contrato global.

Superficie:

```text
NEXO-ROUTE-001 = /
```

Contextos preservados:

| Caso | Contexto | Proyección | Foco principal |
| --- | --- | --- | --- |
| `HOME-CTX-001` | solicitante autorizado | solicitante | crear o continuar solicitudes propias autorizadas |
| `HOME-CTX-002` | bodeguero o preparador autorizado | bodega | siguiente preparación, entrada, ubicación, movimiento o conteo elegible |
| `HOME-CTX-003` | conductor o custodio autorizado | conducción/custodia | siguiente transporte, recogida, entrega, incidente o retorno bajo custodia válida |
| `HOME-CTX-004` | receptor autorizado | recepción | siguiente handoff, recepción o entrada permitida en destino |
| `HOME-CTX-005` | supervisor con cobertura territorial | supervisión | siguiente bloqueo, diferencia, vencimiento o caso que requiera decisión autorizada |
| `HOME-CTX-006` | configurador autorizado | configuración | capacidad administrativa exacta prioritaria, sin ejecución física implícita |
| `HOME-CTX-007` | persona con varias funciones | una sola función activa | foco de la función seleccionada después de resolver nuevamente contexto y autoridad |
| `HOME-CTX-008` | dispositivo compartido con actor activo | proyección compatible | tareas compatibles con actor, función, turno, contexto y capacidades máximas del dispositivo |

Se conservan además estas decisiones NEXO:

- una sola proyección y una sola acción primaria por render;
- ninguna ruta por rol nueva;
- cambio de función obliga a una resolución completa nueva;
- dispositivo compartido nunca sustituye al actor humano;
- configuración no aparece dentro de la proyección operativa por mera pertenencia de rol;
- solicitante, bodega, conducción, recepción y supervisión no mezclan mutaciones;
- bloqueos, carga, vacío, denegación, error y revocación usan los contratos transversales propietarios;
- el perfil específico de NEXO no demuestra cobertura de otra aplicación.

---

#### 11. Perfil NUMERA

La raíz `/` se trata como panel económico inicial gobernado.

La home debe resolver antes de presentar decisiones:

- actor y capacidad financiera/administrativa;
- entidad o alcance empresarial;
- centro, periodo y dimensión económica aplicables;
- versión o escenario cuando corresponda;
- obligaciones, cierres, excepciones y conciliaciones del actor;
- sensibilidad de costos, presupuestos, márgenes y datos de terceros.

La entrada no presenta un único total financiero como si fuera verdad universal y no confunde datos reales, presupuestados, simulados, propuestos o publicados.

---

#### 12. Perfil ORIGO

La raíz `/` conserva una sola proyección según la función activa.

Carriles posibles:

- recepción física delimitada;
- administración de proveedores y contratos;
- compras;
- aprobación;
- conciliación.

La home muestra trabajo de una sola función activa y referencias mínimas necesarias. Un receptor no recibe controles de aprobación comercial; un comprador no obtiene por defecto acciones físicas de recepción; una factura o recepción comercial no equivale a aceptación técnica de otro dominio.

---

#### 13. Perfil PASS

La entrada de cliente es `PASS-CUSTOMER-SURFACE-003` y permanece en el carril personal/cliente.

Prioriza:

- identidad de la relación cliente;
- puntos, beneficios y vigencia aplicables;
- pedidos propios y seguimiento;
- acciones personales de cuenta;
- acceso a compra únicamente cuando la capacidad/feature y contexto lo permitan.

Queda prohibido usar la home de PASS para:

- exponer módulos laborales internos;
- actuar como trabajador por coincidencia de identidad;
- ejecutar ventas o redenciones propietarias de PULSO;
- mostrar datos administrativos o de otros clientes.

---

#### 14. Perfil PULSO

La raíz `/` se conserva como entrada operativa de POS/scanner cuando la sesión y el dispositivo lo permiten.

La proyección debe resolver:

- actor atribuible;
- sede o satélite;
- sesión operativa/caja cuando aplique;
- dispositivo y capacidades;
- trabajo de venta/servicio vigente;
- estado de pedidos o handoffs necesarios para la acción actual.

Administración comercial, importaciones, configuración, cierres y análisis no se mezclan al mismo nivel con la ejecución ordinaria si la función activa no los exige.

---

#### 15. Perfil VISO

La raíz `/` se conserva como entrada agregada, pero la agregación no equivale a autoridad global.

La home selecciona una proyección entre:

- administración;
- supervisión;
- configuración;
- auditoría.

El foco puede ser caso, obligación, aprobación, bloqueo o revisión dentro del alcance del actor. Una persona con rol gerencial no recibe automáticamente todas las capacidades, sedes, datos sensibles o herramientas de configuración.

---

#### 16. `NO_APLICA` TALENTO y VITAL

##### 16.1. TALENTO

`NO_APLICA` en este corte porque el producto permanece futuro/no desplegado y las superficies futuras no poseen un `app_code` canónico utilizable para asignarles una home empresarial vigente.

Condición de salida:

```text
EXISTE APP_CODE CANONICO
+
EXISTE PRODUCTO OPERATIVO GOBERNADO
+
EXISTE SUPERFICIE DE ENTRADA INVENTARIADA
```

Hasta entonces, esta tarea no crea rutas, pantallas ni identidades de home TALENTO.

##### 16.2. VITAL

`NO_APLICA` porque la evidencia canónica vigente lo mantiene como proyecto separado y fuera de Vento OS.

Condición de salida:

```text
DECISION CANONICA EXPRESA DE INCORPORACION A VENTO OS
+
CATALOGO / OWNERSHIP / SUPERFICIE DE ENTRADA GOBERNADOS
```

La mera existencia de repositorio, controladores o pruebas no satisface esa condición.

---

#### 17. `APPLICATION-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`

Las aplicaciones aplicables usan hasta ocho zonas conceptuales, omitiendo únicamente las que realmente no tengan contenido:

| Orden | Zona | Regla |
| ---: | --- | --- |
| 1 | Contexto activo | actor, función/carril, territorio personal u operativo, periodo y dispositivo materiales; sin claves internas |
| 2 | Foco o acción principal | una sola acción o foco compatible con autoridad y estado actuales |
| 3 | Siguiente trabajo u obligación | una instancia prioritaria o un vacío concluyente; nunca una inferencia de cliente |
| 4 | Trabajo en curso | únicamente casos propios, asignados, participados o bajo responsabilidad válida |
| 5 | Handoffs / entradas | trabajo entrante que exige participación del actor actual |
| 6 | Bloqueos / excepciones | causa humana, efecto, propietario y recuperación segura |
| 7 | Referencias contextuales | información secundaria necesaria para decidir o ejecutar sin transformarla en navegación global |
| 8 | Cambio de contexto / sesión | cambio explícito de función, actor o alcance; limpia datos incompatibles antes de recomponer |

No todas las aplicaciones requieren las ocho zonas visibles simultáneamente. Omitir una zona sin contenido no autoriza sustituirla por datos de otra función.

---

#### 18. `APPLICATION-ACTOR-HOME-PRIORITY-CONTRACT-001`

La prioridad visible se resuelve con una política propietaria y explicable. Como regla transversal:

1. seguridad o riesgo accionable dentro de la responsabilidad actual;
2. trabajo ya iniciado, reclamado o bajo custodia válida;
3. obligación asignada con vencimiento o ventana autoritativa;
4. handoff pendiente que requiera aceptación o respuesta del actor;
5. siguiente trabajo ordinario compatible con proceso, etapa y contexto;
6. obligaciones personales vigentes;
7. acceso secundario autorizado cuando no exista trabajo prioritario.

No priorizan por sí solos:

- clics locales;
- última ruta visitada;
- popularidad global;
- valor económico sin contrato de prioridad;
- rol jerárquico;
- número de permiso;
- tarjeta fijada por frontend;
- una alerta sin propietario ni acción autorizada.

`AUTH-UI-053` podrá ordenar tareas frecuentes dentro del conjunto ya elegible, pero no podrá cambiar esta frontera de autoridad.

---

#### 19. Multifunción, cambio de actor y dispositivo compartido

##### 19.1. Multifunción

- existe una función activa inequívoca;
- las otras funciones pueden ser descubribles solo mediante cambio explícito de contexto;
- cambiar función retira controles, datos, caché, recientes y acciones incompatibles;
- no se fusionan permisos, colas ni acciones primarias;
- una persona no se autoaprueba ni completa etapas segregadas por disponer de varias funciones.

##### 19.2. Dispositivo compartido

- el dispositivo puede limitar capacidades máximas, pero nunca aporta actor, rol, turno, check-in o permiso;
- no se muestra trabajo atribuible hasta identificar al actor cuando la operación lo requiera;
- cambio o cierre de actor elimina datos sensibles y acciones del actor anterior;
- un dispositivo incompatible retira la capacidad de la proyección; no sugiere bypass.

---

#### 20. `APPLICATION-ACTOR-HOME-STATE-MAPPING-001`

La home no crea un enum transversal nuevo. Mapea sus resultados a contratos ya aprobados:

| Situación | Contrato propietario consumido | Regla de home |
| --- | --- | --- |
| contexto todavía no resuelto | contexto activo de `AUTH-UI-046` | no mostrar datos ni acciones como si el contexto fuese vigente |
| rol simulado | `AUTH-UI-047` | mantener simulación inequívoca y no ejecutable |
| sin acceso concluyente | `AUTH-UI-048` | retirar datos/acciones y presentar recuperación permitida sin confundir con error técnico |
| carga | `AUTH-UI-049` | preservar estructura y contexto ya confirmados sin mostrar valores falsos |
| vacío concluyente | `AUTH-UI-050` | presentar ausencia real sin inventar ceros ni reemplazarla por acceso alterno |
| error recuperable | `AUTH-UI-051` | mostrar reintento/recuperación compatible y distinguir resultado desconocido |
| contexto cambiado o revocado | contratos de contexto/autorización | invalidar inmediatamente la proyección anterior antes de otra mutación |
| reautenticación o identificación requerida | contratos de soporte fuerte/dispositivo | separar la interacción de recuperación de una denegación definitiva |

---

#### 21. `APPLICATION-ACTOR-HOME-RESPONSIVE-ACCESSIBILITY-CONTRACT-001`

##### 21.1. Móvil

- contexto esencial y foco principal aparecen antes del primer desplazamiento largo;
- una columna para trabajo ordinario;
- objetivos táctiles compatibles con la operación;
- no se exige hover, gesto oculto o densidad de escritorio para acciones críticas.

##### 21.2. Tablet / estación compartida

- contexto, actor y siguiente trabajo permanecen visibles;
- periféricos aparecen solo desde la tarea que los necesita;
- tamaño u orientación no amplían autoridad;
- en estación compartida, el actor sigue siendo explícito.

##### 21.3. Escritorio

- el espacio adicional permite contexto y comparación, no más autoridad;
- máximo visual razonable de columnas sin convertir la home en tablero universal;
- administración, auditoría y supervisión conservan jerarquía y alcance visibles.

##### 21.4. Accesibilidad

- orden de foco coherente con la arquitectura de información;
- acción principal y contexto tienen nombre y propósito estables;
- prioridad, bloqueo, severidad y estado no dependen solo del color;
- cambios de contexto importantes se anuncian sin robar foco de forma impredecible;
- errores y recuperación se asocian con la zona afectada;
- conteos tienen etiqueta, unidad y contexto.

---

#### 22. Seguridad, privacidad y resiliencia

1. La autorización filtra antes de componer la home.
2. La home no obtiene listas globales para filtrarlas en frontend.
3. Cada mutación revalida actor, función, permiso, territorio, recurso, etapa y versión.
4. Los conteos no revelan existencia de trabajo, recursos o personas fuera del alcance.
5. Datos sensibles se enmascaran antes de construir tarjetas, subtítulos o previews.
6. Una sesión offline no conserva capacidades revocadas indefinidamente.
7. Un resultado de escritura desconocido no se presenta como éxito ni se reintenta a ciegas.
8. Deep links reconstruyen contexto y autoridad en destino; no heredan una home anterior como prueba de permiso.
9. Cambiar actor, función, sitio, periodo o dispositivo invalida datos incompatibles.
10. La simulación nunca convierte una vista previa en autoridad real.

---

#### 23. Fronteras con tareas posteriores

`AUTH-UI-052` entrega únicamente composición inicial por actor.

- `AUTH-UI-053` decide navegación por tareas frecuentes dentro del conjunto autorizado;
- `AUTH-UI-054` decide reducción y relegación de opciones irrelevantes;
- `AUTH-UI-055` construye prototipos testeables;
- `AUTH-UI-056` ejecuta validación interna de prototipos;
- `AUTH-UI-057` fija criterios medibles por superficie;
- `AUTH-UI-058` ejecuta sesiones con usuarios reales;
- `AUTH-UI-059` registra y enruta problemas observados;
- `AUTH-UI-060` decide aprobación final por superficie.

Ninguna decisión de esta tarea autoriza implementación física de una home o navegación.

---

#### 24. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: la tarea completa la cobertura global del diseño de entrada usando inventarios, contratos de contexto, autorización, navegación, dispositivo, sensibilidad y estados ya vigentes. No crea una capacidad, transición, permiso, dato, ruta, pantalla o efecto nuevo; tampoco modifica, difiere, descarta ni declara obsoleto un requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 25. Cobertura de prueba vigente reutilizada

La validación posterior reutiliza la cobertura existente de:

- inventarios de superficies por aplicación;
- contexto activo y visibilidad;
- autorización y protección de servidor;
- simulación;
- estados sin acceso, carga, vacío y recuperación;
- dispositivos compartidos;
- privacidad, sensibilidad y masking;
- navegación, deep links y revalidación;
- contratos específicos de las aplicaciones aplicables.

Esta sección es trazabilidad heredada y no modifica el registro 04A.

---

#### 26. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout del usuario después del reemplazo. |
| LOCAL | NOT_EXECUTED | El artefacto fue revisado estáticamente fuera del checkout; formato, quality y delivery quedan para la batería local. |
| REMOTA | PASS | `main` observado en `6b1e9f99d7e051141c98b0390eb6671cb15292f0`; 048 está cerrada y las fuentes canónicas vigentes de 052, BLOQUE I, E2, topología y validadores fueron consultadas. |
| OPERATIVA | NOT_EXECUTED | Esta tarea no ejecuta sesiones con usuarios ni valida implementación runtime. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no existe materialización física propia de 052. |

---

#### 27. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] existe una decisión para las diez aplicaciones exigidas por la rectificación;
- [ ] exactamente ocho quedan `APLICA` y dos `NO_APLICA` con justificación y condición de salida;
- [ ] ANIMA diferencia bootstrap de `/home`;
- [ ] FOGO, NEXO, NUMERA, ORIGO, PULSO y VISO conservan sus raíces existentes sin crear rutas por rol;
- [ ] PASS conserva `Home — inicio del cliente` como experiencia personal y separa soporte laboral y operación PULSO;
- [ ] TALENTO no recibe una home inventada mientras sea futuro/no desplegado y sin `app_code` canónico aplicable;
- [ ] VITAL no recibe una home Vento OS mientras continúe fuera de Vento OS;
- [ ] NEXO conserva los ocho contextos históricos ya materializados;
- [ ] una sola función o relación activa gobierna cada render;
- [ ] una persona multifunción no obtiene una unión de capacidades;
- [ ] un dispositivo compartido no sustituye al actor humano;
- [ ] la home no usa ruta, rol, tarjeta, filtro o dispositivo como fuente de autoridad;
- [ ] contexto, simulación, sin acceso, carga, vacío y error reutilizan los contratos propietarios existentes;
- [ ] acción principal, siguiente trabajo y referencias secundarias permanecen separados;
- [ ] ninguna aplicación se declara cubierta por asociación con NEXO;
- [ ] no se crean rutas, pantallas, procesos, roles, permisos ni requisitos de prueba;
- [ ] no se ejecuta código, Supabase ni despliegue;
- [ ] `AUTH-UI-053` permanece reservada.

---

#### 28. `APPLICATION-ACTOR-HOME-HANDOFF-001`

`AUTH-UI-053` recibe:

```text
10 DECISIONES DE APLICACION
+
8 HOMES APLICABLES
+
2 NO_APLICA JUSTIFICADOS
+
ACTOR / FUNCION / CARRIL / CONTEXTO / DISPOSITIVO
+
FOCO Y ACCION PRINCIPAL AUTORIZADOS
+
TRABAJO / HANDOFF / BLOQUEO / REFERENCIAS
+
PERFIL NEXO PRESERVADO
+
ESTADOS TRANSVERSALES REUTILIZADOS
```

`AUTH-UI-053` podrá ordenar tareas frecuentes y continuaciones únicamente dentro del conjunto ya elegible. Frecuencia, historial o visibilidad nunca conceden autoridad ni modifican la decisión de `NO_APLICA` de TALENTO o VITAL.

---

#### 29. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-UX-048 — Validar el prototipo con Operaciones, Producción, Limpieza, Mantenimiento, SST y responsables de sede`

**TAREA ACTUAL APROBADA**
`AUTH-UI-052 — Diseñar página inicial según actor`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-053 — Diseñar navegación según tareas frecuentes`

### ✅ AUTH-UI-053 — Diseñar navegación según tareas frecuentes

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-052 — Diseñar página inicial según actor
**Tarea siguiente:** AUTH-UI-054 — Reducir opciones irrelevantes
**Tipo de tarea:** documental global; navegación de cada aplicación según tareas frecuentes, elegibilidad autoritativa, función activa, trabajo vigente, recurrencia verificable, continuidad reciente y modalidad de dispositivo
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar la navegación por tareas frecuentes de cada aplicación incluida en la rectificación vigente de `AUTH-UI-052..060`, de forma que cada actor encuentre primero el trabajo que realmente puede ejecutar o continuar dentro de su función, relación, contexto y dispositivo activos, sin convertir historial de uso, frecuencia, posición visual, ruta, nombre de rol o popularidad en una fuente de autoridad.

La regla global es:

```text
CONJUNTO YA ELEGIBLE SEGUN AUTH-UI-052
+
ACTOR EFECTIVO O SUJETO PERSONAL
+
FUNCION ACTIVA
+
CARRIL Y CONTEXTO VIGENTES
+
TRABAJO ACTIVO / CUSTODIA / HANDOFF / VENCIMIENTO / BLOQUEO
+
CONTINUACIONES RECIENTES TODAVIA VALIDAS
+
RECURRENCIA VERIFICABLE
+
DISPOSITIVO Y SESION COMPATIBLES
=
NAVEGACION CORTA, ESTABLE Y ORIENTADA A TAREAS
```

La frecuencia únicamente ordena opciones que ya son elegibles. Nunca crea permisos, amplía territorio, cambia la función activa, concede una capacidad, transforma una referencia en mutación ni evita la revalidación de servidor.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- decisión explícita de navegación para las diez aplicaciones exigidas por la rectificación;
- conservación de `NO_APLICA` para aplicaciones sin superficie interactiva gobernable en el corte vigente;
- una acción primaria y una siguiente tarea o intención prioritaria cuando exista trabajo ejecutable;
- hasta cuatro tareas frecuentes visibles después de elegibilidad, prioridad y deduplicación;
- hasta tres continuaciones recientes revalidadas;
- acceso secundario a tareas restantes autorizadas sin convertir rutas técnicas en navegación humana;
- precedencia determinista entre trabajo activo, custodia, riesgo, vencimiento, bloqueos, continuidad y recurrencia;
- reglas de frecuencia server-side y prohibición de señales locales como autoridad;
- reanudación por tarea, instancia, recurso, etapa, territorio, versión y actor;
- multifunción, cambio de actor, dispositivo compartido, responsive, accesibilidad, privacidad y minimización;
- reutilización de `UX-FREQUENT-TASK-FRICTION-REDUCTION-CONTRACT-001`;
- reutilización del contrato `APPLICATION-ACTOR-HOME-HANDOFF-001` aprobado en `AUTH-UI-052`;
- preservación completa de las veintinueve tareas y ocho contextos NEXO como perfil específico.

##### 2.2. Excluido

- reducir o relegar opciones irrelevantes más allá de la jerarquía definida aquí, reservado a `AUTH-UI-054`;
- crear el prototipo visual final, reservado a `AUTH-UI-055`;
- validar internamente prototipos, reservado a `AUTH-UI-056`;
- definir criterios de usabilidad por superficie, reservado a `AUTH-UI-057`;
- probar con usuarios reales, registrar hallazgos o aprobar pantallas, reservados a `AUTH-UI-058..060`;
- eliminar tareas de catálogos canónicos;
- retirar o crear rutas;
- crear roles, funciones, permisos, capacidades, procesos, pantallas, tablas, RPC, RLS, eventos, datos o migraciones;
- convertir frecuencia en permiso o asignación;
- usar clics locales, orden manual del frontend o popularidad global como señal autoritativa;
- ejecutar código, Supabase, despliegues o cambios físicos.

---

#### 3. Resultado material

Se definen ocho artefactos documentales globales:

1. `APPLICATION-FREQUENT-TASK-NAVIGATION-CONTRACT-001`, contrato común de navegación orientada a tareas;
2. `APPLICATION-FREQUENT-TASK-COVERAGE-MATRIX-001`, decisión exhaustiva para las diez aplicaciones requeridas;
3. `APPLICATION-FREQUENCY-SIGNAL-CONTRACT-001`, señales permitidas, precedencia, desempate y prohibiciones;
4. `APPLICATION-RECENT-CONTINUATION-CONTRACT-001`, identidad, revalidación y retiro de continuaciones recientes;
5. `APPLICATION-NAVIGATION-ZONE-CONTRACT-001`, jerarquía común de zonas sin imponer un layout físico único;
6. `APPLICATION-FREQUENT-TASK-STATE-MAPPING-001`, estados de navegación consumiendo contratos transversales existentes;
7. `NEXO-FREQUENT-TASK-PROFILE-001`, preservación del perfil NEXO de ocho contextos y veintinueve tareas;
8. `APPLICATION-FREQUENT-TASK-HANDOFF-001`, entrega exacta a `AUTH-UI-054` sin iniciar la reducción de opciones.

Cobertura global:

| Elemento | Total esperado | Total materializado | Faltantes | Duplicados |
| --- | ---: | ---: | ---: | ---: |
| Aplicaciones exigidas por la rectificación | 10 | 10 | 0 | 0 |
| Aplicaciones con navegación frecuente aplicable | 8 | 8 | 0 | 0 |
| Aplicaciones con `NO_APLICA` preservado | 2 | 2 | 0 | 0 |
| Perfiles específicos preservados de NEXO | 1 | 1 | 0 | 0 |
| Contextos NEXO preservados | 8 | 8 | 0 | 0 |
| Tareas NEXO preservadas | 29 | 29 | 0 | 0 |
| Zonas globales de navegación | 8 | 8 | 0 | 0 |
| Clases globales de disposición | 6 | 6 | 0 | 0 |
| Rutas, pantallas, roles, funciones o permisos nuevos | 0 | 0 | 0 | 0 |
| Requisitos de prueba nuevos o modificados | 0 | 0 | 0 | 0 |

El resultado queda `ESPECIFICADO`. No se declara `IMPLEMENTADO`, `VALIDADO_CON_USUARIOS` ni disponible en producción por efecto de esta tarea.

---

#### 4. Fuentes y precedencia consumidas

La tarea consume sin redefinir:

- `APPLICATION-ACTOR-HOME-CONTRACT-001`;
- `APPLICATION-ACTOR-HOME-COVERAGE-MATRIX-001`;
- `APPLICATION-ACTOR-HOME-RESOLUTION-CONTRACT-001`;
- `APPLICATION-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`;
- `APPLICATION-ACTOR-HOME-PRIORITY-CONTRACT-001`;
- `APPLICATION-ACTOR-HOME-STATE-MAPPING-001`;
- `APPLICATION-ACTOR-HOME-RESPONSIVE-ACCESSIBILITY-CONTRACT-001`;
- `APPLICATION-ACTOR-HOME-HANDOFF-001`;
- `UX-FREQUENT-TASK-FRICTION-REDUCTION-CONTRACT-001`;
- los contratos de actor, tarea, navegación y contexto de E2;
- las reglas de navegación y autorización de `AUTH-UI-030..045`;
- los estados de contexto, simulación, sin acceso, carga, vacío y recuperación de `AUTH-UI-046..051`;
- el inventario de superficies y rutas de BLOQUE I;
- el contrato físico reutilizable `TaskNavigation` como evidencia de una superficie de presentación server-safe que no resuelve autoridad, prioridad ni router;
- la evidencia NEXO histórica, únicamente como perfil específico de una aplicación.

Precedencia de interpretación:

```text
ELEGIBILIDAD Y AUTORIDAD
>
TRABAJO ACTIVO Y RESPONSABILIDAD
>
CONTINUIDAD REVALIDADA
>
RECURRENCIA
>
PREFERENCIA DE PRESENTACION
```

Ninguna señal situada a la derecha puede ampliar una decisión situada a la izquierda.

---

#### 5. `APPLICATION-FREQUENT-TASK-NAVIGATION-CONTRACT-001`

##### 5.1. Unidad de navegación

La unidad visible es una **tarea humana o intención empresarial autorizada**, no una ruta, archivo, componente, tabla, permiso, feature flag, endpoint o estado técnico.

Una entrada puede referir a una tarea agregada o a una instancia concreta cuando existe trabajo reanudable. La navegación conserva la identidad suficiente para reconstruir contexto y autoridad en destino.

Cada entrada visible deberá poder asociarse, cuando aplique, con:

- identidad de tarea o intención;
- etiqueta humana;
- función activa;
- instancia o recurso;
- etapa;
- territorio;
- versión;
- estado de trabajo;
- condición de solo lectura o acción permitida;
- bloqueo estructurado cuando exista;
- origen de prioridad o frecuencia;
- frescura suficiente para revalidar.

##### 5.2. Una sola proyección por función

```text
PERSONA MULTIFUNCION
!=
UNION DE TODAS SUS NAVEGACIONES
```

La navegación se construye para una sola función o relación activa. Cambiar de función obliga a resolver de nuevo elegibilidad, recientes, frecuencia, grupos y acciones.

##### 5.3. Frecuencia no equivale a autoridad

No producen autoridad:

- número de clics;
- ruta visitada;
- favorito;
- posición manual;
- historial local;
- última pantalla abierta;
- popularidad global;
- actividad de otro actor;
- cargo nominal;
- `navigation_role`;
- tamaño del dispositivo;
- presencia de una tarjeta;
- disponibilidad técnica del componente.

---

#### 6. `APPLICATION-NAVIGATION-ZONE-CONTRACT-001`

La navegación utiliza ocho zonas conceptuales en este orden. Una aplicación puede omitir una zona cuando no tiene contenido aplicable, pero no alterar la precedencia semántica:

| Orden | Zona | Regla global |
| ---: | --- | --- |
| 1 | Contexto activo | actor o sujeto, función/relación, territorio o alcance, dispositivo y estado material necesario para interpretar el trabajo |
| 2 | Acción primaria | una sola acción válida cuando la proyección de entrada de `AUTH-UI-052` la define |
| 3 | Siguiente tarea | una tarea o instancia prioritaria resuelta autoritativamente; nunca calculada solo por el cliente |
| 4 | Tareas frecuentes | máximo cuatro intenciones elegibles, sin duplicar acción primaria ni siguiente tarea |
| 5 | Continuar trabajo reciente | máximo tres instancias revalidadas y todavía accionables |
| 6 | Bloqueos, vencimientos y handoffs | obligaciones que requieren atención y poseen responsable o recuperación |
| 7 | Todas las tareas disponibles | resto del conjunto autorizado, agrupado por familia o intención humana |
| 8 | Utilidades y cambio de contexto | herramientas contextuales, salida, cambio de función/relación y ayudas que no compiten con trabajo empresarial |

Reglas:

1. una identidad materializada en una zona superior no se duplica en una inferior;
2. una instancia concreta puede aparecer en recientes mientras su tarea agregada permanece en una familia, siempre que no compitan por el mismo nivel;
3. una familia vacía puede omitirse sin declarar falta de permiso;
4. una ruta técnica no se transforma en tarea por aparecer en un menú actual;
5. una utilidad contextual se invoca desde la tarea que la necesita;
6. el espacio adicional de escritorio no aumenta máximos de frecuentes o recientes;
7. un bloqueo no se convierte en opción frecuente por repetirse;
8. `AUTH-UI-054` podrá reducir opciones secundarias, pero no reordenar por encima de esta precedencia sin una causa canónica.

---

#### 7. `APPLICATION-FREQUENCY-SIGNAL-CONTRACT-001`

##### 7.1. Elegibilidad previa obligatoria

Antes de medir frecuencia u ordenar, el conjunto debe estar filtrado por las decisiones de `AUTH-UI-052` y los contratos propietarios:

```text
ACTOR O SUJETO VALIDO
+
FUNCION O RELACION ACTIVA
+
PERMISO / CAPACIDAD / DERECHO APLICABLE
+
TERRITORIO O ALCANCE
+
RECURSO / ETAPA / ESTADO
+
ASIGNACION / PARTICIPACION / CUSTODIA / RESPONSABILIDAD
+
DISPOSITIVO Y SESION
+
FRESCURA Y VERSION
```

La frecuencia se calcula únicamente sobre el conjunto resultante.

##### 7.2. Precedencia determinista

Dentro del conjunto elegible, la precedencia es:

1. trabajo ya iniciado, reclamado o bajo custodia del mismo actor y todavía vigente;
2. condición de seguridad, inocuidad, pérdida, custodia o interrupción que exija respuesta autorizada;
3. tarea asignada con vencimiento o ventana autoritativa más próxima;
4. handoff o bloqueo accionable que requiera atención del actor;
5. continuación reciente todavía válida;
6. tarea recurrente con evidencia server-side suficiente para el mismo actor, función/relación y contexto;
7. entrada canónica predeterminada de la función o relación activa;
8. desempate estable por fecha requerida, actualización autoritativa e identidad canónica.

La recurrencia nunca desplaza trabajo activo, riesgo, vencimiento, custodia o bloqueo.

##### 7.3. Señales permitidas

| Señal | Fuente permitida | Uso permitido |
| --- | --- | --- |
| trabajo activo | instancia y asignación autoritativas | seleccionar siguiente tarea |
| custodia o handoff | estado de dominio y relación vigente | elevar prioridad |
| vencimiento | fecha o ventana persistida | ordenar trabajo elegible |
| bloqueo accionable | causa y acción autorizada | presentar obligación |
| continuación reciente | registro server-side con identidad completa | reanudar tras revalidación |
| recurrencia | eventos server-side del mismo actor, función/relación y contexto | ordenar candidatos frecuentes |
| predeterminado | matriz canónica de composición | fallback estable |

##### 7.4. Señales prohibidas

No se utilizan como autoridad ni como prueba suficiente de frecuencia:

- clics almacenados solo en navegador o dispositivo;
- una URL visitada;
- orden manual enviado por frontend;
- nombre de cargo;
- acceso anterior ya revocado;
- actividad de otro actor;
- volumen global de la sede;
- popularidad entre usuarios;
- métricas de desempeño;
- una tarjeta visible;
- un conteo parcial;
- un resultado de escritura todavía desconocido.

Los datos de recurrencia no se presentan como productividad, ranking, evaluación individual ni comparación entre personas.

---

#### 8. Clasificación de frecuencia y fricción

Se reutilizan las categorías de `UX-FREQUENT-TASK-FRICTION-REDUCTION-CONTRACT-001`:

```text
HIGH_FREQUENCY
REPEATED_IN_SESSION
PEAK_CRITICAL
LOW_FREQUENCY_HIGH_FRICTION
EXCEPTIONAL
UNKNOWN
```

Reglas:

- `HIGH_FREQUENCY` y `REPEATED_IN_SESSION` pueden competir por una posición frecuente si siguen siendo elegibles;
- `PEAK_CRITICAL` puede elevar visibilidad dentro de una ventana real sin crear permiso;
- `LOW_FREQUENCY_HIGH_FRICTION` puede requerir optimización, pero no se presenta falsamente como frecuente;
- `EXCEPTIONAL` permanece fuera del camino ordinario y se rige por los contratos de excepción;
- `UNKNOWN` no recibe promoción automática;
- ninguna categoría elimina controles necesarios de identidad, segregación, custodia, evidencia, confirmación o step-up.

---

#### 9. `APPLICATION-RECENT-CONTINUATION-CONTRACT-001`

##### 9.1. Identidad mínima

Una continuación reciente debe conservar conjuntamente, cuando existan en el dominio:

```text
TASK_OR_INTENT_ID
+
INSTANCE_ID
+
ACTOR_OR_SUBJECT_ID
+
FUNCION_O_RELACION_ACTIVA
+
TERRITORIO_O_ALCANCE
+
RECURSO
+
ETAPA
+
VERSION
+
ULTIMA_CONFIRMACION_AUTORITATIVA
```

No se crea una continuación únicamente desde una URL.

##### 9.2. Revalidación previa

Antes de mostrar o abrir una continuación, el contrato propietario confirma:

- sesión y actor/sujeto vigentes;
- misma función o relación activa;
- permiso/capacidad todavía válida;
- territorio o alcance todavía cubierto;
- asignación, participación, custodia o responsabilidad todavía vigente;
- estado y etapa compatibles;
- versión no obsoleta;
- dispositivo compatible cuando aplique;
- ausencia de una mutación con resultado desconocido que exija conciliación.

##### 9.3. Causas de retiro

| Causa | Tratamiento |
| --- | --- |
| instancia cerrada | retirar de recientes; conservar historial solo si sigue autorizado |
| reasignación o pérdida de custodia | retirar acción y actualizar responsabilidad |
| territorio o alcance fuera de cobertura | retirar datos y acción |
| permiso, función o relación revocados | invalidar la proyección y resolver nuevamente |
| etapa incompatible | sustituir por la siguiente tarea válida si existe |
| conflicto de versión | bloquear mutación y recargar |
| dispositivo incompatible | retirar entrada sin sugerir bypass |
| resultado de escritura desconocido | conciliar antes de ofrecer otro intento |
| dependencia técnica indisponible | presentar indisponibilidad, no cierre ni denegación inventados |

---

#### 10. `APPLICATION-FREQUENT-TASK-COVERAGE-MATRIX-001`

| Aplicación | Base de entrada recibida de 052 | Aplicabilidad | Navegación frecuente aprobada | Continuación reciente | Límites específicos | Resultado |
| --- | --- | --- | --- | --- | --- | --- |
| ANIMA | `ANIMA-SCREEN-004` — `/home` | `APLICA` | asistencia/jornada propia, turnos, historial, documentos y obligaciones personales que sigan siendo elegibles; capacidades de manager solo bajo función activa explícita | incidencia, turno, documento o flujo personal reanudable con identidad vigente | no convertir la home del trabajador en planner denso ni mezclar navegación de manager con navegación personal | `ESPECIFICADO` |
| FOGO | `FOGO-ROUTE-001` — `/` | `APLICA` | trabajo productivo, cola/etapa atribuible y referencias necesarias; gobierno de receta/plan solo bajo función administrativa o de supervisión compatible | lote, orden, etapa o revisión todavía vigente | ejecución, supervisión y gobierno permanecen separados; frecuencia no concede liberación ni edición sensible | `ESPECIFICADO` |
| NEXO | `NEXO-ROUTE-001` — `/` | `APLICA` | se conserva íntegramente `NEXO-FREQUENT-TASK-PROFILE-001` con 29 tareas y 8 contextos | instancia logística, conteo, activo, impresión o configuración reanudable según identidad exacta | frecuencia no mezcla solicitante, bodega, conducción, recepción, supervisión y configuración | `ESPECIFICADO` |
| NUMERA | `NUMERA-ROUTE-001` — `/` | `APLICA` | obligaciones financieras/administrativas, conciliaciones, cierres, excepciones, análisis y tareas de auditoría dentro del alcance activo | conciliación, cierre, caso, periodo o revisión todavía vigente | no transformar filtros o vistas económicas en contexto operativo; no priorizar por valor económico sin contrato | `ESPECIFICADO` |
| ORIGO | `ORIGO-ROUTE-001` — `/` | `APLICA` | solicitudes, compras, proveedores, aprobaciones, recepción delimitada y conciliaciones únicamente en la función activa | solicitud, orden, recepción, aprobación o conciliación reanudable | recepción física no concede autoridad de compra/aprobación; compras no concede mutación física | `ESPECIFICADO` |
| PASS | `PASS-CUSTOMER-SURFACE-003` — `Home` | `APLICA` | beneficios, pedidos propios, compra habilitada, cuenta y otras acciones personales elegibles del cliente | pedido propio, compra o flujo personal reanudable | no exponer soporte laboral, datos de otros clientes ni operación propietaria de PULSO | `ESPECIFICADO` |
| PULSO | `PULSO-ROUTE-001` — `/` | `APLICA` | venta, servicio, pedidos, caja/sesión y acciones operativas compatibles con sede y dispositivo; administración comercial solo en función separada | venta, pedido, mesa/servicio, cierre o caso reanudable según contrato | no mezclar configuración, importación, análisis o cierres sensibles con operación ordinaria por frecuencia | `ESPECIFICADO` |
| TALENTO | sin aplicación operativa canónica gobernable en el corte vigente | `NO_APLICA` | ninguna | ninguna | no inventar tareas frecuentes, señales, recientes ni navegación para un producto futuro sin superficie aplicable | `ESPECIFICADO` |
| VISO | `VISO-ROUTE-001` — `/` | `APLICA` | casos, aprobaciones, supervisión, configuración, auditoría y vistas de control según responsabilidad activa | caso, revisión, aprobación o investigación reanudable dentro del alcance | no crear un backoffice universal ni elevar opciones por jerarquía nominal | `ESPECIFICADO` |
| VITAL | proyecto separado y fuera de Vento OS en el corte vigente | `NO_APLICA` | ninguna | ninguna | no asignar navegación Vento OS, actor, frecuencia o continuaciones mientras permanezca fuera del universo de esta rectificación | `ESPECIFICADO` |

Reconciliación:

```text
EXPECTED_APPLICATIONS = 10
MATERIALIZED_DECISIONS = 10
APPLIES = 8
NOT_APPLICABLE = 2
MISSING = 0
DUPLICATES = 0
```

Las decisiones `NO_APLICA` de TALENTO y VITAL provienen de `AUTH-UI-052` y no se reabren por esta tarea.

---

#### 11. Perfil ANIMA

La navegación de ANIMA se orienta a la relación laboral personal y a la operación móvil ligera.

Orden inicial aplicable:

1. acción de asistencia/jornada que corresponda al estado real;
2. turno u obligación personal próxima;
3. incidencias propias que requieran atención;
4. tareas personales recurrentes como consulta de historial o documentos;
5. capacidades de supervisión puntuales únicamente después de activar una función compatible.

`ANIMA-SCREEN-005` a `ANIMA-SCREEN-008` pueden actuar como referencias de superficie existentes, pero su mera existencia no las convierte en frecuentes. La promoción exige elegibilidad y señales válidas.

---

#### 12. Perfil FOGO

FOGO prioriza trabajo de producción ya disponible o en curso sobre navegación de catálogo.

- una etapa productiva activa precede a una receta consultiva;
- un lote u orden bajo responsabilidad precede a recurrencia histórica;
- bloqueos de inocuidad, calidad o continuidad operacional preceden a frecuencia;
- gobierno de recetas, versiones, planes o liberaciones solo aparece en funciones compatibles;
- una tarea repetida no elimina evidencia ni controles productivos.

---

#### 13. `NEXO-FREQUENT-TASK-PROFILE-001`

##### 13.1. Contextos preservados

| Caso | Contexto activo | Acción primaria | Candidatos de primer nivel | Secundarias permitidas | Exclusiones obligatorias | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| `FREQ-CTX-001` | solicitante autorizado | `NEXO-TASK-003` cuando puede crear | solicitudes propias continuables y `NEXO-TASK-002` cuando exista etapa propia vigente | `NEXO-TASK-013` con lectura autorizada | preparación, transporte, recepción, supervisión, configuración y trabajo ajeno | `ESPECIFICADO` |
| `FREQ-CTX-002` | bodeguero o preparador autorizado | siguiente instancia elegible | `NEXO-TASK-004`; `NEXO-TASK-007` a `NEXO-TASK-011` según trabajo y recurrencia | `NEXO-TASK-013` a `NEXO-TASK-015` cuando apoyen la tarea | conducción, recepción ajena, decisión supervisora y configuración | `ESPECIFICADO` |
| `FREQ-CTX-003` | conductor o custodio autorizado | siguiente instancia de `NEXO-TASK-005` | `NEXO-TASK-005` y continuaciones de custodia, tránsito, entrega, incidente o retorno | referencias mínimas de carga, ruta y evidencia | solicitud, picking, recepción, ajustes, configuración y trabajo sin custodia | `ESPECIFICADO` |
| `FREQ-CTX-004` | receptor autorizado | siguiente instancia de `NEXO-TASK-006` | `NEXO-TASK-006`; `NEXO-TASK-007` cuando origen y autorización lo permitan | `NEXO-TASK-013`; `NEXO-TASK-015` como referencias necesarias | conducción, preparación, decisiones supervisoras, configuración y otros destinos | `ESPECIFICADO` |
| `FREQ-CTX-005` | supervisor con cobertura territorial | siguiente caso elegible de `NEXO-TASK-012` | `NEXO-TASK-012`; `NEXO-TASK-013` a `NEXO-TASK-017`; `NEXO-TASK-026` según señales válidas | consultas y evidencia dentro de cobertura | mutaciones operativas, configuración no concedida y métricas individuales | `ESPECIFICADO` |
| `FREQ-CTX-006` | configurador autorizado | capacidad prioritaria de `NEXO-TASK-021` | `NEXO-TASK-020`; `NEXO-TASK-022` a `NEXO-TASK-025`; `NEXO-TASK-027` según capacidad | referencias indispensables para evaluar impacto | ejecución física, supervisión y capacidades administrativas no concedidas | `ESPECIFICADO` |
| `FREQ-CTX-007` | persona con varias funciones | la definida por una única función activa | exclusivamente candidatos de la función activa | cambio explícito a otra función autorizada | mezcla de listas, acciones cruzadas, autoaprobación y frecuencia compartida | `ESPECIFICADO` |
| `FREQ-CTX-008` | dispositivo compartido con actor activo | la definida por la proyección compatible | tareas compatibles con actor, función, turno, contexto y capacidades máximas del dispositivo | utilidades contextuales requeridas por la tarea | administración, datos sensibles y toda acción sin actor humano atribuible | `ESPECIFICADO` |

Reconciliación:

```text
EXPECTED_CONTEXTS = 8
MATERIALIZED_CONTEXTS = 8
UNIQUE_CONTEXT_IDS = 8
MISSING_CONTEXTS = 0
DUPLICATE_CONTEXTS = 0
```

##### 13.2. Registro preservado de 29 tareas

| Tarea | Etiqueta humana | Familia | Disposición base | Condición de primer nivel | Resultado materializado |
| --- | --- | --- | --- | --- | --- |
| `NEXO-TASK-001` | Ir al inicio | `NEXO-TASK-FAMILY-001` | `HOME_ONLY` | ninguna; representa la superficie vigente | no se repite como opción dentro del inicio; se usa para retorno y resolución de proyección |
| `NEXO-TASK-002` | Gestionar abastecimiento interno | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | actor participante con una etapa propia o continuación vigente | resuelve función, etapa e instancia antes de abrir; nunca mezcla solicitar, preparar, transportar y recibir |
| `NEXO-TASK-003` | Solicitar abastecimiento | `NEXO-TASK-FAMILY-002` | `PRIMARY_FIXED` | solicitante autorizado para crear o continuar solicitudes propias | acción principal del solicitante; borradores válidos pueden aparecer como continuaciones |
| `NEXO-TASK-004` | Preparar abastecimiento | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | preparación, picking, faltante o handoff atribuido a la bodega activa | puede ser siguiente tarea y frecuente; no concede despacho ni tránsito |
| `NEXO-TASK-005` | Transportar abastecimiento | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | asignación, custodia o ruta vigente | entrada operativa principal del conductor; conserva carga, etapa y custodia |
| `NEXO-TASK-006` | Recibir abastecimiento | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | entrega, handoff o recepción atribuida al destino autorizado | puede ser siguiente tarea y frecuente; no concede decisión supervisora |
| `NEXO-TASK-007` | Registrar una entrada | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | fuente empresarial o excepción expresamente autorizada | aparece para receptor o bodega elegible; conserva la fuente y no se convierte en formulario libre |
| `NEXO-TASK-008` | Ubicar existencias | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | existencia recibida con ubicación pendiente y destino compatible | prioriza putaway pendiente sin exponer configuración de ubicaciones |
| `NEXO-TASK-009` | Mover existencias | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | traslado autorizado dentro del territorio | aparece por trabajo o recurrencia elegible; no sustituye remisiones entre sedes |
| `NEXO-TASK-010` | Registrar un retiro | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | retiro autorizado con origen, destino, unidad y motivo | aparece por trabajo o recurrencia elegible; nunca muestra stock global |
| `NEXO-TASK-011` | Contar inventario | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | sesión asignada y etapa compatible con captura o control | el resolutor separa captura operativa de control supervisor |
| `NEXO-TASK-012` | Controlar la operación | `NEXO-TASK-FAMILY-004` | `PRIMARY_RESOLVED_CANDIDATE` | supervisor con caso, bloqueo, vencimiento o responsabilidad territorial | acción principal de supervisión; no concede mutaciones operativas |
| `NEXO-TASK-013` | Consultar existencias | `NEXO-TASK-FAMILY-004` | `FREQUENT_CANDIDATE` | lectura autorizada y uso recurrente o necesidad contextual | puede subir a frecuente; de otro modo permanece en consulta, control y trazabilidad |
| `NEXO-TASK-014` | Investigar movimientos | `NEXO-TASK-FAMILY-004` | `FREQUENT_CANDIDATE` | investigación autorizada, caso vigente o recurrencia verificable | conserva trazabilidad y no habilita escritura |
| `NEXO-TASK-015` | Consultar ubicaciones | `NEXO-TASK-FAMILY-004` | `FREQUENT_CANDIDATE` | lectura territorial autorizada y necesidad contextual o recurrencia | puede subir a frecuente sin exponer edición de estructura |
| `NEXO-TASK-016` | Consultar contenedores logísticos | `NEXO-TASK-FAMILY-004` | `SECONDARY_DISCOVERABLE` | permiso de lectura y contexto LPN compatible | permanece en su familia hasta que el subdominio materialice sus señales propias |
| `NEXO-TASK-017` | Gestionar activos | `NEXO-TASK-FAMILY-005` | `FREQUENT_CANDIDATE` | permiso, territorio, trabajo o recurrencia de activos | puede subir a frecuente para actores de activos; no anticipa acciones de configuración |
| `NEXO-TASK-018` | Capturar activos | `NEXO-TASK-FAMILY-005` | `PRIMARY_RESOLVED_CANDIDATE` | actor de campo autorizado y captura pendiente | puede ser siguiente tarea en la función activa; no aparece en remisiones |
| `NEXO-TASK-019` | Contar activos | `NEXO-TASK-FAMILY-005` | `PRIMARY_RESOLVED_CANDIDATE` | sesión y etapa de conteo de activos compatibles | separa captura y cierre según función |
| `NEXO-TASK-020` | Configurar activos | `NEXO-TASK-FAMILY-005` | `SECONDARY_DISCOVERABLE` | capacidad exacta de configuración de activos | se presenta únicamente en configuración; nunca en navegación operativa |
| `NEXO-TASK-021` | Administrar NEXO | `NEXO-TASK-FAMILY-006` | `PRIMARY_RESOLVED_CANDIDATE` | actor con al menos una capacidad administrativa exacta | resuelve la capacidad prioritaria sin convertir el cargo en acceso global |
| `NEXO-TASK-022` | Administrar productos y unidades | `NEXO-TASK-FAMILY-006` | `FREQUENT_CANDIDATE` | capacidad de catálogo y recurrencia administrativa verificable | puede subir dentro de configuración; queda excluida de funciones operativas |
| `NEXO-TASK-023` | Administrar ubicaciones | `NEXO-TASK-FAMILY-006` | `FREQUENT_CANDIDATE` | capacidad de ubicación y recurrencia administrativa verificable | puede subir dentro de configuración; no se confunde con ubicar existencias |
| `NEXO-TASK-024` | Configurar abastecimiento | `NEXO-TASK-FAMILY-006` | `FREQUENT_CANDIDATE` | capacidad logística y recurrencia administrativa verificable | puede subir dentro de configuración; no expone solicitudes concretas salvo referencia necesaria |
| `NEXO-TASK-025` | Configurar referencias internas | `NEXO-TASK-FAMILY-006` | `SECONDARY_DISCOVERABLE` | permiso financiero o de referencia exacto | permanece en administración y no se promueve mediante actividad operativa |
| `NEXO-TASK-026` | Controlar impresión | `NEXO-TASK-FAMILY-007` | `PRIMARY_RESOLVED_CANDIDATE` | trabajos de impresión bloqueados, fallidos o pendientes dentro del territorio | puede ser siguiente tarea de supervisor o soporte; no abre monitor global sin cobertura |
| `NEXO-TASK-027` | Configurar impresión | `NEXO-TASK-FAMILY-007` | `SECONDARY_DISCOVERABLE` | capacidad exacta de configuración de impresión | se presenta únicamente en administración y no por existencia de trabajos |
| `NEXO-TASK-028` | Resolver un destino contextual | `NEXO-TASK-FAMILY-008` | `CONTEXTUAL_ONLY` | tarea invocante, actor, dispositivo y destino compatibles | permanece oculto; resuelve código, ubicación, kiosco o escáner y retorna a la tarea |
| `NEXO-TASK-029` | Resolver acceso | `NEXO-TASK-FAMILY-008` | `CONTEXTUAL_ONLY` | entrada técnica, autenticación o denegación segura | permanece fuera de la navegación empresarial y nunca se clasifica como frecuente |

Reconciliación:

```text
EXPECTED_TASK_IDS = 29
MATERIALIZED_TASK_IDS = 29
UNIQUE_TASK_IDS = 29
MISSING_TASK_IDS = 0
DUPLICATE_TASK_IDS = 0
```

Distribución preservada:

| Disposición | Cantidad |
| --- | ---: |
| `HOME_ONLY` | 1 |
| `PRIMARY_FIXED` | 1 |
| `PRIMARY_RESOLVED_CANDIDATE` | 14 |
| `FREQUENT_CANDIDATE` | 7 |
| `SECONDARY_DISCOVERABLE` | 4 |
| `CONTEXTUAL_ONLY` | 2 |
| **Total** | **29** |

---

#### 14. Perfil NUMERA

NUMERA prioriza obligaciones económicas y de control que ya pertenecen al actor y al alcance financiero activo.

- cierres o conciliaciones en curso preceden a consultas frecuentes;
- excepciones, vencimientos y discrepancias accionables preceden a recurrencia;
- una vista de análisis frecuente no adquiere permiso de ajuste o aprobación;
- periodo, entidad, centro o dimensión económica deben permanecer visibles;
- continuar una revisión exige revalidar periodo, versión, alcance y estado.

No se usa valor monetario alto como prioridad por sí mismo si el contrato propietario no lo define.

---

#### 15. Perfil ORIGO

ORIGO separa navegación de compra, aprobación, proveedor, conciliación y recepción física.

- trabajo asignado o en curso precede a tareas administrativas frecuentes;
- aprobaciones se muestran solo a la función que realmente puede decidir;
- recepción reanudable conserva orden, proveedor, entrega, destino y etapa;
- frecuencia de recepción no concede autoridad de compra;
- frecuencia de compra no concede aceptación física;
- diferencias y conciliaciones aparecen como obligaciones con dueño, no como atajos universales.

---

#### 16. Perfil PASS

PASS conserva navegación personal/cliente.

Frecuentes potenciales únicamente después de elegibilidad:

- consultar beneficios y puntos propios;
- continuar pedido propio;
- iniciar o continuar compra cuando la capacidad esté habilitada;
- revisar cuenta y preferencias;
- retomar un flujo personal pendiente.

No se usa actividad laboral del mismo principal autenticado para ordenar la navegación del cliente. Operación de venta, redención y soporte interno conservan sus aplicaciones y propietarios.

---

#### 17. Perfil PULSO

PULSO prioriza el trabajo de venta y servicio asociado a sesión, sede, dispositivo y contexto operativo.

- operación en curso y pedido/servicio activo preceden a acciones recurrentes;
- trabajo de caja o cierre aparece únicamente cuando corresponde al actor y estado;
- administración comercial, configuración, importación o análisis no se mezclan con operación ordinaria por frecuencia;
- un dispositivo de caja puede limitar el conjunto, pero no conceder función;
- continuar una operación exige identidad de sesión, recurso, estado y versión.

---

#### 18. Perfil VISO

VISO organiza trabajo administrativo, supervisión, configuración y auditoría sin convertirse en panel universal.

- caso, aprobación, bloqueo o investigación asignados preceden a accesos frecuentes;
- una responsabilidad de supervisión no concede configuración;
- una función de auditoría no concede corrección de fuente;
- frecuencia de uso de una vista no amplía territorio ni sensibilidad;
- recientes revalidan caso, periodo, territorio, versión y capacidad.

---

#### 19. Multifunción, cambio de actor y dispositivo compartido

##### 19.1. Multifunción

- una sola función activa gobierna la navegación;
- las otras funciones se ofrecen únicamente mediante cambio explícito;
- frecuencia y recientes se calculan por función, no por persona agregada;
- cambiar función invalida listas, caché y acciones incompatibles;
- no existe autoaprobación ni mezcla de etapas segregadas por disponer de varias funciones.

##### 19.2. Cambio de actor o relación

- un nuevo actor reconstruye elegibilidad, frecuencia y recientes;
- no se heredan tareas del actor anterior;
- en experiencias personales, cambiar de identidad o relación elimina datos y continuaciones incompatibles;
- ninguna preferencia local conserva autoridad después del cambio.

##### 19.3. Dispositivo compartido

- el dispositivo define capacidades máximas, no autoridad humana;
- no se muestra trabajo atribuible hasta resolver al actor cuando sea obligatorio;
- al cambiar actor se eliminan tareas, recientes, datos sensibles y acciones anteriores;
- una tarea incompatible con dispositivo se retira o deriva a recuperación autorizada; no se sugiere bypass.

---

#### 20. Responsive y accesibilidad

##### 20.1. Móvil

- contexto, acción primaria y siguiente tarea antes del primer desplazamiento largo;
- máximo tres frecuentes visibles antes de una entrada secundaria al resto;
- continuaciones recientes después del trabajo prioritario y antes de familias secundarias;
- una columna;
- ninguna acción crítica depende de hover o gesto oculto.

##### 20.2. Tablet / estación compartida

- contexto, siguiente tarea y hasta cuatro frecuentes pueden coexistir sin convertir la superficie en tablero supervisor;
- objetivos táctiles compatibles con operación;
- periféricos aparecen solo cuando la tarea los requiere;
- orientación y tamaño no cambian prioridad ni autoridad;
- cambio de actor retira de inmediato el conjunto anterior.

##### 20.3. Escritorio

- máximo dos columnas para lectura ordinaria;
- el espacio adicional no aumenta el máximo de frecuentes ni recientes;
- grupos secundarios no compiten con acción primaria;
- navegación administrativa densa permanece dentro de funciones compatibles.

##### 20.4. Accesibilidad

- orden de foco coincide con las ocho zonas;
- prioridad no depende solo de color o posición;
- reordenamientos autoritativos se anuncian sin mover foco de forma impredecible;
- cada entrada tiene nombre e intención comprensibles;
- bloqueos, vacío, parcialidad, revocación y fallo son distinguibles;
- la entrada al resto de tareas es operable por teclado y conserva contexto.

---

#### 21. `APPLICATION-FREQUENT-TASK-STATE-MAPPING-001`

Esta tarea no crea una autoridad de estado paralela. Consume los contratos existentes y añade únicamente semántica de navegación:

| Situación | Contrato propietario / fuente | Regla de navegación |
| --- | --- | --- |
| contexto todavía no resuelto | `AUTH-UI-046` y contratos de contexto | no materializar tareas ni frecuencia |
| simulación | `AUTH-UI-047` | no usar eventos de simulación como recurrencia real |
| sin acceso concluyente | `AUTH-UI-048` | retirar tareas y datos; no mostrar frecuentes deshabilitadas |
| carga | `AUTH-UI-049` | preservar estructura confirmada sin fabricar conteos |
| vacío concluyente | `AUTH-UI-050` | no inventar tareas frecuentes para llenar espacio |
| error recuperable | `AUTH-UI-051` | conservar identidad y recuperación segura |
| continuación obsoleta | `APPLICATION-RECENT-CONTINUATION-CONTRACT-001` | retirar la instancia y resolver la siguiente opción válida |
| contexto cambiado o revocado | contratos de autorización/contexto | invalidar navegación anterior antes de otra mutación |
| conflicto de versión | contrato del dominio propietario | bloquear mutación y recargar |
| resultado desconocido | contratos de idempotencia/conciliación | no presentar éxito ni repetir automáticamente |

---

#### 22. Seguridad, privacidad y minimización

1. La navegación recibe un conjunto ya filtrado por autoridad.
2. El cliente no recibe un catálogo global para ocultarlo después.
3. Cada apertura y cada comando revalidan actor/sujeto, función/relación, permiso, territorio/alcance, recurso, etapa, estado y versión.
4. Frecuencia y recientes se calculan sobre identidades y eventos autorizados; no sobre clics locales.
5. Cambiar actor, función, relación, territorio o dispositivo invalida señales incompatibles.
6. Los conteos no revelan trabajo, recursos, clientes, empleados o casos fuera de alcance.
7. Sensibilidad y masking se aplican antes de etiquetas, subtítulos, conteos y previews.
8. Una simulación no produce frecuencia real.
9. Una navegación frecuente no elimina step-up, segregación, custodia, confirmación o evidencia obligatoria.
10. Un acceso directo no adquiere prioridad ni autoridad por evitar la navegación.
11. Un resultado desconocido no se convierte en reciente ni en señal de frecuencia hasta conciliación.
12. Las métricas de uso no se publican como ranking o productividad individual.

---

#### 23. Estado técnico y brecha de implementación

| Elemento | Estado documental | Evidencia actual permitida | Condición de salida |
| --- | --- | --- | --- |
| contrato global por 10 aplicaciones | `ESPECIFICADO` | esta tarea y handoff de `AUTH-UI-052` | consumo íntegro por prototipos e implementación |
| navegación aplicable en 8 aplicaciones | `ESPECIFICADO` | matriz global de esta tarea | implementación por aplicación sin pérdida de decisiones |
| `NO_APLICA` TALENTO/VITAL | `ESPECIFICADO` | `AUTH-UI-052` y esta tarea | reabrir solo si cambia el universo canónico |
| jerarquía de 8 zonas | `ESPECIFICADO` | esta tarea | binding en superficies aplicables |
| señales y precedencia | `ESPECIFICADO` | esta tarea + `UX-BASE-008` | resolución server-side y pruebas posteriores |
| continuaciones recientes | `ESPECIFICADO` | esta tarea | almacenamiento/consulta autoritativos cuando corresponda |
| perfil NEXO 29 tareas / 8 contextos | `ESPECIFICADO` | materialización NEXO preservada | consumo íntegro por prototipo e implementación NEXO |
| `TaskNavigation` compartido | `IMPLEMENTADO_PARCIAL` | componente server-safe sin autoridad ni router | adopción por consumidores autorizados en paquetes posteriores |
| prototipo visual | `NO_IMPLEMENTADO` | no existe evidencia aprobada en esta tarea | `AUTH-UI-055` |
| validación interna | `PENDIENTE_DE_EVIDENCIA` | no ejecutada | `AUTH-UI-056` |
| pruebas con usuarios | `PENDIENTE_DE_EVIDENCIA` | no ejecutadas | `AUTH-UI-058` |
| implementación por aplicación | `NO_IMPLEMENTADO` | fuera de esta fase documental | paquetes físicos autorizados posteriores |

---

#### 24. Fronteras con tareas posteriores

`AUTH-UI-053` entrega jerarquía, frecuencia y continuación.

- `AUTH-UI-054` decide qué opciones elegibles deben relegarse, agruparse, mostrarse solo en contexto o excluirse de una proyección concreta sin cambiar autoridad;
- `AUTH-UI-055` materializa prototipos testeables por aplicación, actor, función y estado;
- `AUTH-UI-056` ejecuta validación interna del prototipo;
- `AUTH-UI-057` define criterios medibles de usabilidad;
- `AUTH-UI-058` ejecuta sesiones con usuarios reales;
- `AUTH-UI-059` registra y enruta hallazgos;
- `AUTH-UI-060` decide aprobación final por superficie.

`AUTH-UI-054` no puede eliminar una tarea autorizada del catálogo, alterar la prioridad autoritativa definida aquí ni convertir ocultamiento en control de seguridad.

---

#### 25. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: esta tarea organiza y prioriza presentación dentro de conjuntos ya protegidos por contratos vigentes de autorización, contexto, navegación, dispositivo, estados y experiencia. No crea una capacidad, ruta, permiso, transición, dato, proceso, pantalla o efecto nuevo; tampoco modifica, difiere, descarta ni declara obsoleto un requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 26. Cobertura de prueba vigente reutilizada

La validación posterior reutiliza la cobertura existente de:

- autorización por vista y acción;
- contexto activo;
- actor, función, relación y dispositivo;
- navegación y deep links;
- tareas frecuentes y reducción segura de fricción;
- continuidad y recuperación;
- privacidad, sensibilidad y masking;
- estados de simulación, sin acceso, carga, vacío y errores recuperables;
- contratos específicos de las ocho aplicaciones aplicables;
- perfil NEXO de tareas y contextos.

Esta sección es trazabilidad heredada y no modifica el registro 04A.

---

#### 27. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout del usuario después del cierre de `AUTH-UI-052`, apertura de 053 y reemplazo de este artefacto. |
| LOCAL | NOT_EXECUTED | El artefacto fue revisado estáticamente fuera del checkout; formato, quality, delivery y validadores de dominio quedan para la batería local. |
| REMOTA | PASS | Se consultó `main` vigente con el fix transversal `8c7149a3949bb808e7de38845e6ef00545bec5f9`, las fuentes obligatorias de continuidad/topología/políticas, el bloque propietario, `UX-BASE-008`, `TaskNavigation` y `package.json`; el merge documental de 052 aún no aparece en remoto, por lo que esta preparación permanece anticipada. |
| OPERATIVA | NOT_EXECUTED | Esta tarea no ejecuta pruebas con usuarios, telemetría runtime ni validación operacional. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`; no existe materialización física propia de `AUTH-UI-053`. |

---

#### 28. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] existe una decisión para las diez aplicaciones exigidas por la rectificación;
- [ ] exactamente ocho quedan `APLICA` y dos conservan `NO_APLICA`;
- [ ] TALENTO y VITAL no reciben navegación inventada;
- [ ] cada aplicación aplicable conserva una sola función o relación activa por proyección;
- [ ] frecuencia se calcula únicamente después de elegibilidad y autorización;
- [ ] trabajo activo, custodia, riesgo, vencimiento, handoff y bloqueo preceden a recurrencia;
- [ ] la navegación global contiene ocho zonas conceptuales con precedencia estable;
- [ ] existen como máximo cuatro tareas frecuentes y tres continuaciones recientes;
- [ ] acción primaria y siguiente tarea no se duplican en frecuentes o recientes;
- [ ] continuaciones recientes conservan identidad suficiente para revalidar actor, contexto, recurso, etapa y versión;
- [ ] clics locales, rutas visitadas, popularidad, cargo nominal y actividad ajena no se usan como autoridad;
- [ ] una persona multifunción no mezcla señales entre funciones;
- [ ] un dispositivo compartido no hereda navegación del actor anterior;
- [ ] ANIMA preserva experiencia personal y separa supervisión puntual;
- [ ] FOGO separa ejecución productiva de gobierno y liberación;
- [ ] NEXO conserva los 8 contextos y 29 tareas sin faltantes ni duplicados;
- [ ] NUMERA conserva alcance financiero y no convierte filtros en contexto operativo;
- [ ] ORIGO separa compra, aprobación, recepción y conciliación;
- [ ] PASS conserva navegación de cliente y no incorpora operación PULSO ni soporte laboral;
- [ ] PULSO conserva sesión/sede/dispositivo y separa operación de administración comercial;
- [ ] VISO no se convierte en backoffice universal;
- [ ] los estados reutilizan contratos propietarios y no confunden vacío, denegación, fallo, revocación o resultado desconocido;
- [ ] responsive y accesibilidad no aumentan autoridad ni máximos de navegación;
- [ ] no se crean rutas, procesos, roles, funciones, permisos ni requisitos de prueba;
- [ ] no se ejecuta código, Supabase ni despliegue;
- [ ] `AUTH-UI-054` permanece reservada.

---

#### 29. `APPLICATION-FREQUENT-TASK-HANDOFF-001`

`AUTH-UI-054` recibe:

```text
10 DECISIONES DE APLICACION
+
8 NAVEGACIONES APLICABLES
+
2 NO_APLICA PRESERVADOS
+
8 ZONAS DE NAVEGACION
+
PRECEDENCIA AUTORITATIVA
+
MAXIMO 4 FRECUENTES
+
MAXIMO 3 CONTINUACIONES RECIENTES
+
SENALES SERVER-SIDE PERMITIDAS
+
SENALES PROHIBIDAS
+
REVALIDACION DE CONTINUACIONES
+
PERFIL NEXO DE 29 TAREAS / 8 CONTEXTOS
```

`AUTH-UI-054` podrá reducir, relegar, agrupar o mover a contexto opciones ya elegibles, pero no podrá:

- crear autoridad;
- eliminar tareas del catálogo;
- promover señales locales;
- mezclar funciones;
- violar la precedencia de trabajo activo y responsabilidad;
- cambiar `NO_APLICA` sin una modificación canónica del universo de aplicaciones.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-052 — Diseñar página inicial según actor`

**TAREA ACTUAL APROBADA**
`AUTH-UI-053 — Diseñar navegación según tareas frecuentes`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-054 — Reducir opciones irrelevantes`

### ✅ AUTH-UI-054 — Reducir opciones irrelevantes

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-053 — Diseñar navegación según tareas frecuentes
**Tarea siguiente:** AUTH-UI-055 — Crear prototipo por rol
**Tipo de tarea:** documental global; reducción de opciones por aplicación y por cada superficie canónica mediante relevancia autoritativa, función activa, trabajo vigente, disposición, recurrencia, estado, dispositivo y necesidad de descubrimiento secundario
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Reducir las opciones visibles de cada proyección de Vento OS hasta conservar únicamente las que resulten relevantes para el actor efectivo, la función o relación activa, el contexto, el trabajo vigente y la superficie utilizada, sin eliminar identidades canónicas, ocultar trabajo todavía autorizado ni convertir presentación, frecuencia o posición visual en autoridad.

La regla global queda fijada así:

```text
CONJUNTO YA ELEGIBLE SEGUN AUTH-UI-052 Y AUTH-UI-053
+
ACTOR / FUNCION / RELACION ACTIVA
+
TRABAJO, RESPONSABILIDAD, CUSTODIA, HANDOFF, VENCIMIENTO Y BLOQUEOS
+
SUPERFICIE CANONICA Y CONTEXTO DE USO
+
RECURRENCIA Y CONTINUACION REVALIDADAS
+
DEDUCCION DE DUPLICADOS Y AGRUPACION POR INTENCION HUMANA
=
SOLO LAS OPCIONES NECESARIAS EN EL NIVEL ADECUADO
```

Reducir no significa revocar. Una opción autorizada puede dejar el primer nivel y permanecer descubrible en su familia; una opción contextual puede desaparecer del menú global y seguir disponible desde su tarea propietaria. La ausencia visual nunca modifica permiso, asignación, territorio, responsabilidad, custodia, estado empresarial ni acceso directo cuando este último continúe autorizado y sea revalidado por servidor.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- las diez decisiones de cobertura exigidas por la rectificación `AUTH-UI-052..060`;
- las ocho aplicaciones aplicables y los dos `NO_APLICA` ya heredados de `AUTH-UI-052..053`;
- decisión explícita de reducción para las 177 superficies `VSCREEN-0001..0177` del inventario canónico;
- conservación de los `app_code` propietarios existentes sin reasignar pantallas;
- reducción por actor, función, relación, territorio, recurso, etapa, estado, trabajo y dispositivo;
- deduplicación entre entrada, acción primaria, siguiente tarea, frecuentes, recientes, familia y contexto;
- preservación de trabajo autorizado mediante familia o descubrimiento secundario cuando no compita en primer nivel;
- exclusión de opciones no autorizadas, incompatibles, obsoletas, revocadas o no aplicables antes de construir la presentación;
- tratamiento explícito de opciones condicionales, contextuales, administrativas, personales y de excepción;
- preservación del perfil NEXO histórico de 29 tareas y 8 contextos como especialización específica;
- reglas de vacío, parcialidad, revocación, acceso directo, fallo técnico, responsive, accesibilidad, privacidad y minimización.

##### 2.2. Excluido

- eliminar pantallas, tareas, procesos, acciones, rutas o bindings canónicos;
- reasignar `VSCREEN-*` entre aplicaciones;
- convertir TALENTO en `app_code` o asignarle pantallas por inferencia;
- incorporar VITAL a Vento OS;
- materializar nuevas superficies para AURA, que conserva cero pantallas en el catálogo vigente;
- cambiar el alcance de SHELL, aunque sus siete superficies se cubren porque pertenecen al inventario de 177;
- revocar permisos, capacidades, asignaciones o territorios;
- diseñar el prototipo visual final, reservado a `AUTH-UI-055`;
- declarar validación interna o con usuarios, reservada a `AUTH-UI-056..060`;
- implementar resolutores, componentes, consultas, cachés, telemetría, código, datos, Supabase, migraciones, RLS o despliegues.

---

#### 3. Fuentes y precedencia consumidas

La tarea consume sin redefinir:

- `APPLICATION-ACTOR-HOME-CONTRACT-001` y la cobertura global de `AUTH-UI-052`;
- `APPLICATION-FREQUENT-TASK-NAVIGATION-CONTRACT-001`, la matriz de diez decisiones y el handoff de `AUTH-UI-053`;
- la rectificación integral `AUTH-UI-052..060`;
- `SCREEN-CANONICAL-CATALOG-001`, con 177 superficies y su `app_code` propietario ya aprobado;
- los contratos de autorización por vista y acción, contexto activo, simulación, sensibilidad, masking, dispositivo compartido, acceso directo y estados interactivos;
- `UX-FREQUENT-TASK-FRICTION-REDUCTION-CONTRACT-001`, que exige reducir fricción sin eliminar controles materiales;
- el perfil NEXO preexistente de relevancia, niveles, deduplicación, estados, 29 tareas y 8 contextos.

Precedencia material de esta tarea:

```text
AUTORIDAD Y ELEGIBILIDAD
>
TRABAJO ACTIVO / CUSTODIA / RIESGO / VENCIMIENTO / BLOQUEO
>
CONTINUACION REVALIDADA
>
RECURRENCIA
>
REDUCCION Y PRESENTACION
```

La reducción opera únicamente después de resolver autoridad. Ninguna regla de esta tarea puede ampliar el conjunto elegible recibido.

---

#### 4. Resultado material

Se materializan ocho artefactos documentales consumibles:

1. `APPLICATION-OPTION-RELEVANCE-CONTRACT-001`, regla común de relevancia y exclusión;
2. `APPLICATION-OPTION-REDUCTION-SCOPE-001`, las diez decisiones exigidas por la rectificación;
3. `SURFACE-OPTION-REDUCTION-REGISTER-001`, decisión explícita para las 177 superficies canónicas;
4. `OPTION-REDUCTION-LAYER-CATALOG-001`, niveles de presentación y reducción;
5. `OPTION-DEDUPE-AND-COLLAPSE-CONTRACT-001`, deduplicación por intención y contexto;
6. `OPTION-REDUCTION-STATE-CONTRACT-001`, estados de resolución y recuperación;
7. `NEXO-OPTION-REDUCTION-PROFILE-001`, preservación del perfil NEXO histórico de 29 tareas y 8 contextos;
8. `APPLICATION-OPTION-REDUCTION-HANDOFF-001`, entrega a `AUTH-UI-055` sin iniciar prototipos.

Cobertura materializada:

| Elemento | Esperado | Materializado | Faltantes | Duplicados |
| --- | ---: | ---: | ---: | ---: |
| Decisiones exigidas por la rectificación | 10 | 10 | 0 | 0 |
| Aplicaciones `APLICA` | 8 | 8 | 0 | 0 |
| Decisiones `NO_APLICA` | 2 | 2 | 0 | 0 |
| Superficies canónicas `VSCREEN-*` | 177 | 177 | 0 | 0 |
| `app_code` propietarios presentes en las 177 superficies | 9 | 9 | 0 | 0 |
| Superficies AURA admitidas | 0 | 0 | 0 | 0 |
| Contextos NEXO preservados | 8 | 8 | 0 | 0 |
| Tareas NEXO preservadas | 29 | 29 | 0 | 0 |
| Rutas, pantallas, permisos o procesos nuevos | 0 | 0 | 0 | 0 |
| Requisitos de prueba nuevos o modificados | 0 | 0 | 0 | 0 |

El resultado queda `ESPECIFICADO`. No se declara `IMPLEMENTADO`, `VALIDADO_CON_USUARIOS` ni disponible en producción por efecto de esta tarea.

---

#### 5. Reconciliación de cobertura de aplicaciones y superficies

La rectificación `AUTH-UI-052..060` exige diez decisiones de cobertura de experiencia. Ese conjunto no se utiliza para reescribir el catálogo técnico de `app_code` ni el catálogo de pantallas.

El inventario de superficies conserva simultáneamente:

- 177 pantallas asignadas a nueve `app_code`: `shell`, `viso`, `anima`, `nexo`, `fogo`, `origo`, `pulso`, `numera` y `pass`;
- AURA como aplicación canónica diferida con cero pantallas en `SCREEN-CANONICAL-CATALOG-001`;
- TALENTO como producto/canal futuro sin `app_code` canónico aplicable a pantallas;
- VITAL fuera de Vento OS.

Por tanto, `SURFACE-OPTION-REDUCTION-REGISTER-001` cubre las 177 superficies exactamente como están asignadas; `APPLICATION-OPTION-REDUCTION-SCOPE-001` conserva las diez decisiones heredadas de la rectificación. Esta reconciliación no crea ni elimina aplicaciones.

Distribución heredada de las 177 superficies:

| `app_code` | Superficies |
| --- | ---: |
| `shell` | 7 |
| `viso` | 31 |
| `anima` | 14 |
| `nexo` | 37 |
| `fogo` | 15 |
| `origo` | 14 |
| `pulso` | 20 |
| `numera` | 20 |
| `pass` | 19 |
| **Total** | **177** |

---

#### 6. `APPLICATION-OPTION-RELEVANCE-CONTRACT-001`

Una opción puede permanecer en una proyección únicamente si supera, cuando aplique:

```text
IDENTIDAD CANONICA VIGENTE
+
ACTOR / SUJETO Y FUNCION O RELACION ACTIVA
+
PERMISO Y CAPACIDAD EXACTOS
+
TERRITORIO / RECURSO / ETAPA / ESTADO / VERSION
+
ASIGNACION / PARTICIPACION / CUSTODIA / RESPONSABILIDAD
+
DISPOSITIVO / SESION / FRESCURA
+
TRABAJO ACTUAL, CONTINUIDAD O DESCUBRIMIENTO SECUNDARIO JUSTIFICADO
```

Resultados dinámicos permitidos después de la evaluación:

| Resultado | Uso |
| --- | --- |
| `DESTACAR` | acción primaria o siguiente tarea por decisión autoritativa actual |
| `MOSTRAR_FRECUENTE` | tarea elegible dentro del máximo de cuatro frecuentes |
| `MOSTRAR_RECIENTE` | instancia concreta reanudable dentro del máximo de tres continuaciones |
| `CONSERVAR_EN_FAMILIA` | tarea autorizada secundaria que debe seguir descubrible |
| `INVOCAR_SOLO_EN_CONTEXTO` | resolutor, utilidad o superficie subordinada accesible desde su tarea propietaria |
| `EXCLUIR_DE_PROYECCION` | opción no autorizada, incompatible, no aplicable, obsoleta o revocada |

`EXCLUIR_DE_PROYECCION` significa que la opción no se envía a esa proyección. No se sustituye por una tarjeta bloqueada para revelar que existe una capacidad fuera de alcance.

---

#### 7. `OPTION-REDUCTION-LAYER-CATALOG-001`

Cada superficie recibe una clase estática de reducción que limita su tratamiento normal, sin fijar la autoridad de un render concreto:

| Clase | Significado | Tratamiento normal |
| --- | --- | --- |
| `ENTRY_RETURN` | entrada, home o retorno de aplicación | no duplicar como opción dentro de la propia entrada; conservar como destino de retorno |
| `WORK_ELIGIBLE` | trabajo humano directo o iniciable | puede destacar, aparecer como frecuente/reciente o conservarse en familia según evidencia vigente |
| `SECONDARY_DISCOVERABLE` | catálogo, administración, análisis, configuración o consulta secundaria | conservar en familia; promover solo con trabajo o recurrencia válida y función compatible |
| `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, diferencia o condición material | excluir mientras no exista condición o capacidad de inicio autorizada |
| `CONTEXTUAL_ONLY` | resolución técnica/personal subordinada a otra tarea | invocar solo desde contexto; nunca competir en navegación global |

La clase es una regla de presentación. No concede permiso y no reemplaza los estados, procesos o tareas propietarios.

---

#### 8. `APPLICATION-OPTION-REDUCTION-SCOPE-001`

| Cobertura exigida | Aplicabilidad | Superficies canónicas asociadas en este corte | Decisión de reducción |
| --- | --- | ---: | --- |
| ANIMA | `APLICA` | 14 | conservar experiencia personal; tareas propias pueden destacar o ser frecuentes; supervisión/administración no se mezcla por asociación |
| FOGO | `APLICA` | 15 | separar producción en curso de planeación, gobierno, calidad, trazabilidad y excepciones; cada función recibe una sola proyección |
| NEXO | `APLICA` | 37 | aplicar el perfil específico preservado de 29 tareas y 8 contextos y reconciliarlo con las 37 superficies propietarias |
| NUMERA | `APLICA` | 20 | separar trabajo financiero actual de reportes, configuración, análisis y cierres excepcionales; filtros no conceden contexto operativo |
| ORIGO | `APLICA` | 14 | separar solicitud, compra, aprobación, recepción, proveedor y conciliación; una etapa no presta autoridad a otra |
| PASS | `APLICA` | 19 | conservar navegación del cliente sobre su propia relación; operación PULSO y soporte laboral permanecen fuera |
| PULSO | `APLICA` | 20 | priorizar venta/servicio/caja vigente; administración comercial, análisis y excepciones se muestran solo cuando corresponden |
| TALENTO | `NO_APLICA` | 0 | no inventar superficies ni `app_code`; conservar alcance futuro fuera de la proyección actual |
| VISO | `APLICA` | 31 | separar administración, supervisión, configuración, auditoría y casos por capacidad; no crear backoffice universal |
| VITAL | `NO_APLICA` | 0 | permanece fuera de Vento OS; no recibe opciones, pantallas ni navegación |

Las siete superficies SHELL no alteran las diez decisiones anteriores: se incluyen en el registro de 177 porque existen en el inventario canónico y se reducen conforme a su función transversal.

---

#### 9. `SURFACE-OPTION-REDUCTION-REGISTER-001`

Cada `VSCREEN-*` aparece exactamente una vez. `Clase` define su comportamiento base; la columna `Condición para mantener visible` todavía exige autorización y contexto efectivos.

| Screen ID | Aplicación | Nombre vigente | Clase | Condición para mantener visible | Reducción cuando no es relevante |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0001` | `shell` | Hub Vento OS | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0002` | `shell` | Inicio de sesión y recuperación | `CONTEXTUAL_ONLY` | invocación desde la tarea o resolución propietaria y contexto todavía válido | invocar solo en contexto; no incluir en listas globales, frecuentes ni familias empresariales |
| `VSCREEN-0003` | `shell` | Resolución de contexto y acceso | `CONTEXTUAL_ONLY` | invocación desde la tarea o resolución propietaria y contexto todavía válido | invocar solo en contexto; no incluir en listas globales, frecuentes ni familias empresariales |
| `VSCREEN-0004` | `shell` | Activación de dispositivo compartido | `CONTEXTUAL_ONLY` | invocación desde la tarea o resolución propietaria y contexto todavía válido | invocar solo en contexto; no incluir en listas globales, frecuentes ni familias empresariales |
| `VSCREEN-0005` | `shell` | Bandeja transversal de tareas y notificaciones | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0006` | `shell` | Centro de soporte y diagnóstico | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0007` | `viso` | Inicio ejecutivo y gerencial | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0008` | `viso` | Estructura organizativa | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0009` | `viso` | Políticas, delegaciones y límites | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0010` | `viso` | Compromisos y transferencias internas | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0011` | `viso` | Embudo de candidatos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0012` | `viso` | Caso de selección | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0013` | `viso` | Vinculación e incorporación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0014` | `viso` | Directorio y expediente laboral | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0015` | `viso` | Programación laboral | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0016` | `viso` | Revisión de asistencia | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0017` | `viso` | Novedades, ausencias y reemplazos | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0018` | `viso` | Retiro y revocación coordinada | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0019` | `viso` | Catálogo de roles y permisos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0020` | `viso` | Perfil de acceso del trabajador | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0021` | `viso` | Simulación de permisos y conflictos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0022` | `viso` | Gobierno de dispositivos compartidos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0023` | `viso` | Riesgos de seguridad y salud | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0024` | `viso` | Incidentes y emergencias | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0025` | `viso` | Controles de higiene y cumplimiento | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0026` | `viso` | Bandeja de casos administrativos transversales | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0027` | `anima` | Inicio personal del trabajador | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0028` | `anima` | Registro de entrada, pausa y salida | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0029` | `anima` | Mi programación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0030` | `anima` | Mi asistencia y solicitud de corrección | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0031` | `anima` | Mis novedades, permisos y ausencias | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0032` | `anima` | Mi perfil laboral | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0033` | `nexo` | Resumen de inventario y abastecimiento interno | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0034` | `nexo` | Catálogo de productos físicos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0035` | `nexo` | Editor de producto, unidad y presentación | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0036` | `nexo` | Especificaciones y criterios de calidad | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0037` | `nexo` | Catálogo de ubicaciones | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0038` | `nexo` | Identificación y detalle de ubicación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0039` | `nexo` | Consulta de existencias | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0040` | `nexo` | Conteo de inventario | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0041` | `nexo` | Revisión de conteo y diferencias | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0042` | `nexo` | Caso de ajuste de inventario | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0043` | `nexo` | Confirmación de entrada a inventario | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0044` | `nexo` | Retiro y consumo de existencias | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0045` | `nexo` | Traslado interno de existencias | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0046` | `nexo` | Solicitud de remisión | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0047` | `nexo` | Preparación de remisión | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0048` | `nexo` | Carga y despacho de remisión | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0049` | `nexo` | Seguimiento de remisión en tránsito | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0050` | `nexo` | Recepción de remisión | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0051` | `nexo` | Vencimiento, cuarentena, daño y merma | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0052` | `nexo` | LPN, contenedores y reutilizables | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0053` | `nexo` | Activos y custodia | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0054` | `nexo` | Etiquetas e impresión logística | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0055` | `fogo` | Inicio y cola de producción | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0056` | `fogo` | Planeación de producción | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0057` | `fogo` | Preparación e inicio de lote | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0058` | `fogo` | Ejecución de lote | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0059` | `fogo` | Registro parcial de producción | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0060` | `fogo` | Finalización y cierre de lote | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0061` | `fogo` | Receta operativa | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0062` | `fogo` | Catálogo y editor de recetas | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0063` | `fogo` | Revisión, aprobación y publicación de receta | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0064` | `fogo` | Prueba de receta y rendimiento | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0065` | `fogo` | Control de calidad y liberación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0066` | `fogo` | Empaque, etiquetado y almacenamiento de terminado | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0067` | `fogo` | Reproceso, aprovechamiento, merma y cierre productivo | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0068` | `origo` | Bandeja de necesidades de compra | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0069` | `origo` | Solicitud de compra | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0070` | `origo` | Catálogo de proveedores | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0071` | `origo` | Alta y expediente de proveedor | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0072` | `origo` | Comparación de cotizaciones | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0073` | `origo` | Editor de orden de compra | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0074` | `origo` | Bandeja de aprobaciones de compra | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0075` | `origo` | Detalle y seguimiento de orden | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0076` | `origo` | Cola de recepciones | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0077` | `origo` | Recepción total o parcial | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0078` | `origo` | Resolución de diferencias de recepción | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0079` | `origo` | Historial y auditoría de abastecimiento | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0080` | `pulso` | Inicio POS | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0081` | `pulso` | Creación de venta o pedido | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0082` | `pulso` | Mapa de salón y mesas | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0083` | `pulso` | Detalle y modificación de pedido | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0084` | `pulso` | Cobro y medios de pago | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0085` | `pulso` | Identificación de cliente y acumulación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0086` | `pulso` | Redención de puntos o beneficios | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0087` | `pulso` | Bandeja de pedidos de canales externos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0088` | `pulso` | Seguimiento de preparación y entrega | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0089` | `pulso` | Apertura de caja | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0090` | `pulso` | Cierre de caja | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0091` | `pulso` | Anulación, devolución y reembolso | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0092` | `pulso` | Oferta, menú, precio comercial y disponibilidad | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0093` | `pulso` | Revisión de ventas, caja y terminales | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0094` | `numera` | Inicio financiero y ejecutivo | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0095` | `numera` | Bandeja de hechos económicos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0096` | `numera` | Registro de gasto y soporte | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0097` | `numera` | Bandeja de aprobaciones financieras | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0098` | `numera` | Cuentas por pagar y obligaciones | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0099` | `numera` | Cuentas por cobrar y cartera | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0100` | `numera` | Caja, bancos y movimientos financieros | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0101` | `numera` | Conciliación de ventas y pagos | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0102` | `numera` | Conciliación de compras y recepciones | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0103` | `numera` | Conciliación de inventario, producción y variaciones | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0104` | `numera` | Costos, rentabilidad y escenarios | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0105` | `numera` | Cierre, reapertura y corrección de periodo | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0106` | `numera` | Reportes y exportaciones financieras | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0107` | `pass` | Inicio del cliente y resumen de beneficios | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0108` | `pass` | QR personal de identificación | `CONTEXTUAL_ONLY` | invocación desde la tarea o resolución propietaria y contexto todavía válido | invocar solo en contexto; no incluir en listas globales, frecuentes ni familias empresariales |
| `VSCREEN-0109` | `pass` | Catálogo de beneficios y recompensas | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0110` | `pass` | Ticket o QR de redención | `CONTEXTUAL_ONLY` | invocación desde la tarea o resolución propietaria y contexto todavía válido | invocar solo en contexto; no incluir en listas globales, frecuentes ni familias empresariales |
| `VSCREEN-0111` | `pass` | Historial de puntos y redenciones | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0112` | `pass` | Perfil, privacidad y consentimientos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0113` | `viso` | Registro y seguimiento de decisiones empresariales | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0114` | `viso` | Solicitudes y certificaciones de acceso | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0115` | `viso` | Gobierno de documentos y evidencia | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0116` | `viso` | Registro de riesgos empresariales | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0117` | `viso` | Requerimientos de asesores y autoridades | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0118` | `viso` | Gestión de desempeño y desarrollo | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0119` | `viso` | Asignación y control de elementos de protección | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0120` | `viso` | Mesa de servicio tecnológico | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0121` | `viso` | Continuidad, contingencia y recuperación | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0122` | `viso` | Privacidad, cumplimiento y conservación | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0123` | `viso` | Gestión de comunicaciones internas | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0124` | `anima` | Mis comunicados laborales | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0125` | `anima` | Mi carnet laboral | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0126` | `anima` | Mis documentos laborales | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0127` | `anima` | Mi capacitación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0128` | `anima` | Mis objetivos y retroalimentación | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0129` | `anima` | Mis solicitudes de soporte | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0130` | `anima` | Mis reportes de seguridad y salud | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0131` | `anima` | Mis elementos de protección | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0132` | `nexo` | Reservas de inventario | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0133` | `nexo` | Planes y órdenes de mantenimiento de activos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0134` | `nexo` | Garantías, seguros y reclamaciones de activos | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0135` | `nexo` | Instancias y operación de kits | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0136` | `nexo` | Flota y vehículos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0137` | `nexo` | Kilometraje y combustible | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0138` | `nexo` | Planeación de rutas y despachos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0139` | `nexo` | Ejecución de ruta y prueba de entrega | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0140` | `nexo` | Novedades, rechazos y retornos logísticos | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0141` | `nexo` | Instalaciones, servicios y mantenimiento locativo | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0142` | `nexo` | Configuración de políticas y rutas logísticas | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0143` | `nexo` | Diseñador de etiquetas logísticas | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0144` | `nexo` | Cola y trabajos de impresión logística | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0145` | `origo` | Contratos, precios y condiciones de proveedor | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0146` | `origo` | Desempeño y reclamaciones de proveedor | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0147` | `pulso` | Oportunidades y cotizaciones de catering o B2B | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0148` | `pulso` | Ejecución de catering o venta B2B | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0149` | `pulso` | Operación de reservas y eventos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0150` | `pulso` | Casos de reclamo y compensación | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0151` | `pulso` | Coordinación de entrega mediante tercero | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0152` | `pulso` | Análisis de satisfacción y servicio | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0153` | `numera` | Paquete laboral para pagos y beneficios | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0154` | `numera` | Facturas y documentos fiscales | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0155` | `numera` | Tesorería y programación de pagos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0156` | `numera` | Presupuestos, escenarios y forecast | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0157` | `numera` | Impuestos y obligaciones de cumplimiento | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0158` | `numera` | Distribución y asignación de costos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0159` | `numera` | Indicadores, análisis y planes de mejora | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0160` | `pass` | Inicio y selección del portal de compras | `ENTRY_RETURN` | acceso vigente a la aplicación y contexto resoluble | no duplicar dentro de la propia proyección; conservar únicamente como entrada o retorno |
| `VSCREEN-0161` | `pass` | Menú y catálogo comercial del cliente | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0162` | `pass` | Carrito y configuración del pedido | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0163` | `pass` | Dirección, modalidad y programación de entrega | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0164` | `pass` | Revisión, checkout e inicio de pago | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0165` | `pass` | Confirmación de pedido y retorno de pago | `CONTEXTUAL_ONLY` | invocación desde la tarea o resolución propietaria y contexto todavía válido | invocar solo en contexto; no incluir en listas globales, frecuentes ni familias empresariales |
| `VSCREEN-0166` | `pass` | Mis pedidos y detalle | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0167` | `pass` | Seguimiento de preparación y entrega del cliente | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0168` | `pass` | Chat y comunicación asociada al pedido | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0169` | `pass` | Mis reclamos y casos de servicio | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0170` | `pass` | Mis reservas y eventos | `WORK_ELIGIBLE` | tarea autorizada y trabajo vigente, capacidad de inicio o recurrencia válida | si sigue autorizada pero no prioritaria, conservar en familia; si deja de aplicar, excluir |
| `VSCREEN-0171` | `pass` | Calificación y satisfacción | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0172` | `pass` | Comunicaciones y notificaciones del cliente | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0173` | `fogo` | Trazabilidad e investigación de lote | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0174` | `fogo` | Controles operativos de inocuidad | `CONDITIONAL_WORK` | caso, excepción, revisión, bloqueo, vencimiento o condición material vigente, o capacidad explícita de iniciarlo | excluir mientras la condición no exista; no mostrar deshabilitada para revelar ausencia de permiso |
| `VSCREEN-0175` | `shell` | Seguridad de cuenta y sesiones | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0176` | `nexo` | Definición de kits y conjuntos | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |
| `VSCREEN-0177` | `nexo` | Configuración de impresoras logísticas | `SECONDARY_DISCOVERABLE` | capacidad exacta y función compatible; promoción solo con trabajo o recurrencia autoritativa | mantener en familia o descubrimiento secundario; excluir fuera de función o alcance |

Reconciliación del registro:

```text
EXPECTED_SURFACES = 177
MATERIALIZED_SURFACES = 177
UNIQUE_SURFACE_IDS = 177
MISSING_SURFACES = 0
DUPLICATE_SURFACES = 0
ENTRY_RETURN = 9
WORK_ELIGIBLE = 75
SECONDARY_DISCOVERABLE = 48
CONDITIONAL_WORK = 39
CONTEXTUAL_ONLY = 6
```

La clasificación no elimina ninguna superficie del catálogo. Una superficie secundaria o condicional continúa siendo accesible cuando la función, el trabajo y la autorización la hacen relevante.

---

#### 10. `OPTION-DEDUPE-AND-COLLAPSE-CONTRACT-001`

La deduplicación se realiza por intención canónica y, cuando existe trabajo concreto, por identidad de tarea/instancia, recurso, función, territorio, etapa y versión. No se deduplica únicamente por `href`, etiqueta, componente o pantalla.

Precedencia entre zonas:

1. acción primaria;
2. siguiente tarea;
3. continuación reciente concreta;
4. tarea frecuente agregada;
5. familia secundaria;
6. contexto interno de la tarea.

Reglas:

- una identidad materializada arriba no vuelve a aparecer abajo;
- detalle, edición, impresión, escaneo, confirmación, QR, resolución de acceso y utilidades subordinadas permanecen dentro de su tarea cuando corresponda;
- una misma intención no crea varias opciones por poseer varias rutas o superficies;
- una familia vacía no se muestra con contador cero;
- una opción retirada por revocación o cambio de contexto deja de ser accionable antes de recomponer la lista;
- no se completan máximos con opciones irrelevantes;
- ocultamiento nunca sustituye autorización server-side.

---

#### 11. `NEXO-OPTION-REDUCTION-PROFILE-001`

El perfil NEXO histórico se conserva como especialización de la regla global. No gobierna por analogía el resto de aplicaciones.

##### 11.1. Contextos preservados

| Caso | Contexto | Primer nivel permitido | Descubrimiento secundario | Exclusiones obligatorias |
| --- | --- | --- | --- | --- |
| `RED-CTX-001` | solicitante autorizado | NEXO-TASK-003; NEXO-TASK-002 o continuaciones propias | NEXO-TASK-013 con lectura autorizada | preparación, transporte, recepción, supervisión, configuración y trabajo ajeno |
| `RED-CTX-002` | bodeguero o preparador autorizado | NEXO-TASK-004; NEXO-TASK-007..011 según trabajo | NEXO-TASK-013..016 cuando apoyen la tarea | conducción, recepción ajena, decisión supervisora, administración y otras sedes |
| `RED-CTX-003` | conductor o custodio autorizado | NEXO-TASK-005 y continuaciones válidas de custodia/transporte | referencias mínimas de carga, ruta, sello y evidencia | solicitud, picking, recepción, ajustes, configuración y trabajo sin asignación |
| `RED-CTX-004` | receptor autorizado | NEXO-TASK-006; NEXO-TASK-007 cuando origen y autorización lo permitan | NEXO-TASK-013 y NEXO-TASK-015 como referencias | conducción, preparación, decisiones supervisoras, configuración y otros destinos |
| `RED-CTX-005` | supervisor con cobertura territorial | NEXO-TASK-012; NEXO-TASK-013..017 y NEXO-TASK-026 según señal | referencias y evidencia dentro de cobertura | mutaciones operativas, configuración no concedida, datos fuera de cobertura y métricas individuales |
| `RED-CTX-006` | configurador autorizado | NEXO-TASK-021; NEXO-TASK-020, 022..025 y 027 según capacidad | referencias indispensables para evaluar impacto | ejecución física, supervisión, colas operativas y capacidades no concedidas |
| `RED-CTX-007` | persona con varias funciones | solo opciones de una función activa | selector de funciones autorizadas sin datos cruzados | mezcla de tareas, frecuencia compartida, herencia de autoridad y acciones cruzadas |
| `RED-CTX-008` | dispositivo compartido con actor activo | tareas compatibles con actor, función, turno, contexto y dispositivo | utilidades requeridas por la tarea vigente | administración, datos sensibles no necesarios, funciones incompatibles y acciones sin actor atribuible |

Reconciliación: 8 contextos esperados, 8 materializados, 0 faltantes y 0 duplicados.

##### 11.2. Registro de 29 tareas preservadas

| Tarea | Etiqueta | Disposición base | Reducción preservada |
| --- | --- | --- | --- |
| `NEXO-TASK-001` | Ir al inicio | `HOME_ONLY` | retorno o resolución de inicio; no duplicar dentro del inicio |
| `NEXO-TASK-002` | Gestionar abastecimiento interno | `PRIMARY_RESOLVED_CANDIDATE` | destacar solo con etapa propia o continuación; de otro modo Mi trabajo o excluir |
| `NEXO-TASK-003` | Solicitar abastecimiento | `PRIMARY_FIXED` | acción primaria del solicitante; excluir sin autorización de creación o continuación propia |
| `NEXO-TASK-004` | Preparar abastecimiento | `PRIMARY_RESOLVED_CANDIDATE` | destacar con picking/faltante/handoff atribuible; de otro modo conservar solo si puede iniciarse |
| `NEXO-TASK-005` | Transportar abastecimiento | `PRIMARY_RESOLVED_CANDIDATE` | destacar con asignación/custodia/ruta; excluir sin relación vigente |
| `NEXO-TASK-006` | Recibir abastecimiento | `PRIMARY_RESOLVED_CANDIDATE` | destacar con entrega/handoff/recepción; excluir sin trabajo o capacidad de inicio |
| `NEXO-TASK-007` | Registrar una entrada | `PRIMARY_RESOLVED_CANDIDATE` | destacar solo con fuente empresarial o excepción autorizada; si no, familia o excluir |
| `NEXO-TASK-008` | Ubicar existencias | `PRIMARY_RESOLVED_CANDIDATE` | destacar con putaway pendiente; si no, familia únicamente cuando pueda iniciarse |
| `NEXO-TASK-009` | Mover existencias | `PRIMARY_RESOLVED_CANDIDATE` | destacar con traslado vigente; si no, familia cuando la función pueda iniciarlo |
| `NEXO-TASK-010` | Registrar un retiro | `PRIMARY_RESOLVED_CANDIDATE` | destacar con retiro vigente; si no, familia cuando exista capacidad de inicio |
| `NEXO-TASK-011` | Contar inventario | `PRIMARY_RESOLVED_CANDIDATE` | destacar con sesión/campaña; separar captura de control supervisor |
| `NEXO-TASK-012` | Controlar la operación | `PRIMARY_RESOLVED_CANDIDATE` | destacar con caso/bloqueo/vencimiento; si no, conservar en control cuando la lectura siga autorizada |
| `NEXO-TASK-013` | Consultar existencias | `FREQUENT_CANDIDATE` | frecuente con señal válida; si no, conservar en consulta y control |
| `NEXO-TASK-014` | Investigar movimientos | `FREQUENT_CANDIDATE` | frecuente con caso o recurrencia; si no, conservar en consulta; excluir sin lectura |
| `NEXO-TASK-015` | Consultar ubicaciones | `FREQUENT_CANDIDATE` | frecuente con necesidad o recurrencia; si no, conservar en consulta |
| `NEXO-TASK-016` | Consultar contenedores logísticos | `SECONDARY_DISCOVERABLE` | conservar en familia con permiso/contexto LPN; no promover sin señal propietaria |
| `NEXO-TASK-017` | Gestionar activos | `FREQUENT_CANDIDATE` | frecuente con trabajo o recurrencia; si no, conservar en familia |
| `NEXO-TASK-018` | Capturar activos | `PRIMARY_RESOLVED_CANDIDATE` | destacar con captura pendiente; si no, Mi trabajo o excluir |
| `NEXO-TASK-019` | Contar activos | `PRIMARY_RESOLVED_CANDIDATE` | destacar con sesión compatible; separar captura y cierre |
| `NEXO-TASK-020` | Configurar activos | `SECONDARY_DISCOVERABLE` | solo Administrar con capacidad exacta; excluir de funciones operativas |
| `NEXO-TASK-021` | Administrar NEXO | `PRIMARY_RESOLVED_CANDIDATE` | resolver capacidad administrativa prioritaria; excluir sin capacidad |
| `NEXO-TASK-022` | Administrar productos y unidades | `FREQUENT_CANDIDATE` | frecuente solo en configuración; si no, Administrar |
| `NEXO-TASK-023` | Administrar ubicaciones | `FREQUENT_CANDIDATE` | frecuente solo en configuración; no confundir con ubicar existencias |
| `NEXO-TASK-024` | Configurar abastecimiento | `FREQUENT_CANDIDATE` | frecuente solo en configuración; no exponer solicitudes concretas como opción |
| `NEXO-TASK-025` | Configurar referencias internas | `SECONDARY_DISCOVERABLE` | solo Administrar con permiso exacto; no promover por actividad operativa |
| `NEXO-TASK-026` | Controlar impresión | `PRIMARY_RESOLVED_CANDIDATE` | destacar con trabajo fallido/bloqueado/pendiente; si no, control con cobertura |
| `NEXO-TASK-027` | Configurar impresión | `SECONDARY_DISCOVERABLE` | solo Administrar con capacidad exacta; nunca por existencia de trabajos |
| `NEXO-TASK-028` | Resolver un destino contextual | `CONTEXTUAL_ONLY` | invocar desde tarea compatible; fuera de listas globales |
| `NEXO-TASK-029` | Resolver acceso | `CONTEXTUAL_ONLY` | resolver acceso/denegación como estado; fuera de navegación empresarial |

Distribución heredada: `HOME_ONLY=1`, `PRIMARY_FIXED=1`, `PRIMARY_RESOLVED_CANDIDATE=14`, `FREQUENT_CANDIDATE=7`, `SECONDARY_DISCOVERABLE=4`, `CONTEXTUAL_ONLY=2`; total 29, sin faltantes ni duplicados.

---

#### 12. `OPTION-REDUCTION-STATE-CONTRACT-001`

| Estado | Condición | Presentación obligatoria |
| --- | --- | --- |
| `RESOLVIENDO_RELEVANCIA` | actor, función, contexto o conjunto elegible todavía no son concluyentes | estructura mínima sin opciones ni conteos |
| `OPCIONES_LISTAS` | evaluación completa y existen opciones relevantes | niveles ordenados, sin duplicados y con contexto visible |
| `ACCION_PRIMARIA_AUSENTE` | proyección válida sin comando principal autorizado | conservar contexto y opciones secundarias válidas sin fabricar acción |
| `VACIO_VALIDO` | decisión concluyente y no existe trabajo ni tarea iniciable relevante | vacío real sin accesos alternos inventados |
| `SOLO_DESCUBRIMIENTO_SECUNDARIO` | no existe trabajo destacado pero quedan tareas autorizadas | familias disponibles sin promoción artificial |
| `DATOS_PARCIALES` | una fuente perdió frescura o falló | último conjunto confirmado y advertencia de incompletitud; no completar con supuestos |
| `CONTEXTO_CAMBIADO_O_REVOCADO` | actor, función, territorio, turno, dispositivo, asignación o permiso cambiaron | retirar inmediatamente opciones y datos previos y resolver de nuevo |
| `OPCION_CAMBIADA_O_RETIRADA` | una opción visible dejó de ser relevante | explicar actualización y volver al conjunto recalculado |
| `ACCESO_DIRECTO_DENEGADO` | solicitud explícita no supera revalidación | denegación minimizada sin revelar opciones ajenas |
| `FALLO_TECNICO` | no existe una decisión estable por indisponibilidad | fallo recuperable distinto de vacío o denegación |

Un resultado desconocido de escritura no se usa como señal de frecuencia ni continuación hasta reconciliarse.

---

#### 13. Responsive, accesibilidad y dispositivo

- móvil conserva acción/siguiente trabajo antes de listas y no aumenta máximos por scroll;
- tablet y estación compartida priorizan contexto, trabajo y bloqueo material y retiran información del actor anterior al cambiar sesión;
- escritorio usa el espacio adicional para lectura y agrupación, no para mostrar más opciones de primer nivel;
- ninguna opción depende de hover, gesto oculto, color o icono;
- el orden de foco sigue la jerarquía de presentación;
- cambios de conjunto, revocación y opción retirada se anuncian de forma accesible;
- el dispositivo limita compatibilidad, pero nunca aporta autoridad humana.

---

#### 14. Seguridad, privacidad y minimización

1. El servidor o contrato propietario filtra antes de construir la proyección.
2. El cliente no recibe un catálogo global para ocultarlo después.
3. La lista no revela tareas, recursos, sedes, actores ni capacidades fuera de alcance.
4. Cada acceso y comando revalida autoridad, contexto, recurso, etapa y versión.
5. Frecuencia, recientes y posición visual nunca conceden autoridad.
6. Un dispositivo compartido no conserva opciones del actor anterior.
7. Sensibilidad y masking se aplican antes de etiquetas, conteos o previews.
8. Resolutores y utilidades técnicas permanecen fuera de listas empresariales.
9. Acceso directo no reintroduce una opción excluida ni concede permiso.
10. Eventos de navegación no se convierten en métricas de productividad o ranking individual.

---

#### 15. Estado técnico, brechas y handoff

| Elemento | Estado documental | Condición de salida |
| --- | --- | --- |
| diez decisiones de rectificación | `ESPECIFICADO` | consumir sin alterar en prototipos |
| 177 decisiones por superficie | `ESPECIFICADO` | materializar bindings de presentación sin cambiar `VSCREEN` ni `app_code` |
| NEXO 29 tareas / 8 contextos | `ESPECIFICADO` | consumo íntegro por prototipo e implementación NEXO |
| reducción física por aplicación | `NO_IMPLEMENTADO` | paquete físico autorizado posterior |
| prototipo visual testeable | `NO_IMPLEMENTADO` | `AUTH-UI-055` |
| validación interna | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-056` |
| criterios medibles por superficie | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-057` |
| prueba con usuarios reales | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058` |
| registro/resolución de problemas | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-059` |
| aprobación final por superficie | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-060` |

`AUTH-UI-055` recibe el registro de 177 superficies, las clases de reducción, los estados y las diez decisiones de cobertura. Debe convertirlos en prototipos testeables sin reabrir autoridad ni inventar superficies.

---

#### 16. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: la tarea materializa decisiones de presentación y reducción dentro de identidades, autorización, navegación, contexto, dispositivo, estados y requisitos ya vigentes. No crea una capacidad, proceso, ruta, permiso, transición, dato, pantalla ni efecto nuevo; tampoco modifica, difiere, descarta ni declara obsoleto ningún requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 17. Cobertura de prueba vigente reutilizada

La cobertura posterior reutiliza los contratos existentes de autorización por vista y acción, navegación, contexto activo, dispositivo compartido, continuidad, sensibilidad, masking, estados de carga/vacío/error, reducción segura de fricción y los contratos específicos de cada aplicación. Esta sección es trazabilidad y no modifica el registro 04A.

---

#### 18. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout del usuario después de reemplazar `AUTH-UI-054`. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery y validadores de dominio quedan para la batería local del repositorio. |
| REMOTA | PASS | Se verificaron en `main` vigente la continuidad posterior al cierre de `AUTH-UI-053`, el propietario de `AUTH-UI-054`, la rectificación `AUTH-UI-052..060`, `SCREEN-CANONICAL-CATALOG-001` con 177 superficies, topología/políticas y los comandos de validación aplicables. |
| OPERATIVA | NOT_EXECUTED | Esta tarea no ejecuta telemetría runtime, validación operacional ni sesiones con usuarios. |
| FÍSICA | NOT_APPLICABLE | `NO_PHYSICAL_INSTANCE`; la tarea documental no materializa código, datos, Supabase ni despliegues. |

---

#### 19. Criterios de aceptación

La tarea queda documentalmente completa cuando se confirma que:

- [ ] existen exactamente diez decisiones de cobertura de la rectificación;
- [ ] ocho permanecen `APLICA` y TALENTO/VITAL conservan `NO_APLICA`;
- [ ] ninguna decisión crea `app_code` para TALENTO ni incorpora VITAL;
- [ ] AURA conserva cero superficies y no se inventa materialización;
- [ ] las siete superficies SHELL se cubren sin alterar la matriz de rectificación;
- [ ] `VSCREEN-0001..0177` aparecen exactamente una vez, sin faltantes ni duplicados;
- [ ] cada superficie conserva nombre y `app_code` propietario del catálogo vigente;
- [ ] cada superficie recibe exactamente una clase de reducción;
- [ ] una clase estática no sustituye elegibilidad o autorización dinámica;
- [ ] trabajo autorizado secundario permanece descubrible cuando no ocupa primer nivel;
- [ ] opciones no autorizadas o incompatibles no se envían al cliente;
- [ ] acción primaria, siguiente tarea, frecuentes, recientes y familia no duplican la misma identidad;
- [ ] no se llenan máximos con opciones irrelevantes;
- [ ] familia vacía no produce encabezado, conteo cero ni control deshabilitado;
- [ ] resolutores, acceso, QR técnicos y utilidades contextuales permanecen fuera de listas globales cuando corresponda;
- [ ] el perfil NEXO conserva 29 tareas y 8 contextos sin faltantes ni duplicados;
- [ ] frecuencia, visibilidad, historial y posición no conceden autoridad;
- [ ] responsive y accesibilidad no aumentan opciones ni permisos;
- [ ] no se crean rutas, pantallas, roles, funciones, permisos, procesos ni requisitos de prueba;
- [ ] no se ejecuta código, Supabase ni despliegue;
- [ ] `AUTH-UI-055` permanece únicamente reservada.

---

#### 20. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-053 — Diseñar navegación según tareas frecuentes`

**TAREA ACTUAL APROBADA**
`AUTH-UI-054 — Reducir opciones irrelevantes`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-055 — Crear prototipo por rol`

### ✅ AUTH-UI-055 — Crear prototipo por rol

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-054 — Reducir opciones irrelevantes
**Tarea siguiente:** AUTH-UI-056 — Validar prototipo antes de implementar
**Tipo de tarea:** documental global; materialización de prototipos testeables por aplicación, actor, función, contexto, dispositivo y estado crítico, vinculados al inventario canónico de superficies sin crear implementación productiva
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no modifica código productivo, rutas, componentes, roles, permisos, procesos, datos, Supabase, migraciones, RLS, telemetría, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Crear el paquete documental de prototipos testeables que consume las decisiones aprobadas de `AUTH-UI-052`, `AUTH-UI-053` y `AUTH-UI-054` y permite representar, sin efectos reales, cómo cambia la interfaz según aplicación, actor efectivo, función activa, contexto, dispositivo y estado crítico.

El título conserva “por rol”, pero la unidad real de prototipado es:

```text
APLICACION / SUPERFICIE CANONICA
+
ACTOR EFECTIVO O SUJETO PERSONAL
+
FUNCION ACTIVA
+
CONTEXTO Y DISPOSITIVO VIGENTES
+
TRABAJO Y OPCIONES YA ELEGIBLES
+
REDUCCION APROBADA
+
VARIANTE NORMAL O DE RECUPERACION
=
PROTOTIPO TESTEABLE SIN AUTORIDAD NI EFECTOS REALES
```

Un prototipo representa una decisión ya aprobada. No concede permisos, no crea una pantalla canónica nueva, no ejecuta una mutación y no demuestra usabilidad por sí mismo.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- decisión explícita para las diez aplicaciones exigidas por la rectificación `AUTH-UI-052..060`;
- vinculación del paquete de prototipos con las 177 superficies `VSCREEN-*` ya admitidas;
- suites de prototipo por cada `app_code` que posee superficies en el catálogo vigente;
- perfiles de actor, función o contexto suficientes para materializar diferencias relevantes de presentación;
- una variante normal y una variante de recuperación por cada perfil;
- composición visual de baja/media fidelidad apta para revisión y prueba guiada;
- contexto activo visible, acción primaria, siguiente tarea, frecuentes, recientes, familias secundarias, bloqueo/estado y recuperación cuando apliquen;
- datos ficticios, minimizados y no sensibles;
- preservación íntegra de los ocho contextos y dieciséis vistas históricas NEXO como especialización dentro del paquete global;
- reglas responsive, accesibilidad, privacidad, sensibilidad, masking y dispositivo compartido;
- handoff exacto a `AUTH-UI-056` para validación interna.

##### 2.2. Excluido

- implementar cualquiera de las aplicaciones;
- crear componentes productivos, rutas, bindings, resolutores, queries, eventos o telemetría;
- conectar el prototipo a Supabase o a datos reales;
- crear `app_code` para TALENTO;
- incorporar VITAL a Vento OS;
- inventar superficies para AURA mientras conserve cero `VSCREEN-*`;
- ejecutar sesiones con usuarios, reservado a `AUTH-UI-058`;
- definir umbrales finales de usabilidad por superficie, reservado a `AUTH-UI-057`;
- registrar problemas observados en sesiones reales, reservado a `AUTH-UI-059`;
- aprobar pantallas finales, reservado a `AUTH-UI-060`;
- declarar que un prototipo es accesible, usable, implementado o aprobado por existir documentalmente.

---

#### 3. Resultado material

Se materializan diez artefactos documentales consumibles:

1. `APPLICATION-TESTABLE-PROTOTYPE-CONTRACT-001`, contrato global de fidelidad, autoridad y testabilidad;
2. `APPLICATION-PROTOTYPE-RECTIFICATION-COVERAGE-001`, decisión para las diez aplicaciones de la rectificación;
3. `APPLICATION-PROTOTYPE-SURFACE-BINDING-001`, vínculo determinista con las 177 superficies canónicas existentes;
4. `APPLICATION-PROTOTYPE-SUITE-CATALOG-001`, nueve suites para los nueve `app_code` que poseen superficies;
5. `APPLICATION-PROTOTYPE-CONTEXT-CATALOG-001`, veintinueve perfiles de actor, función o contexto;
6. `APPLICATION-PROTOTYPE-NORMAL-RECOVERY-CATALOG-001`, cincuenta y ocho variantes: veintinueve normales y veintinueve de recuperación;
7. `APPLICATION-PROTOTYPE-COMPOSITION-RULES-001`, gramática visual común sin imponer una sola UI física;
8. `APPLICATION-PROTOTYPE-FIXTURE-CONTRACT-001`, datos ficticios y reglas de minimización;
9. `NEXO-TESTABLE-PROTOTYPE-PROFILE-001`, preservación de las dieciséis vistas y ocho contextos NEXO históricos;
10. `APPLICATION-PROTOTYPE-HANDOFF-001`, entrega íntegra a validación interna.

Cobertura materializada:

| Elemento | Esperado | Materializado | Faltantes | Duplicados |
| --- | ---: | ---: | ---: | ---: |
| decisiones de aplicaciones de la rectificación | 10 | 10 | 0 | 0 |
| aplicaciones de la rectificación con prototipo aplicable | 8 | 8 | 0 | 0 |
| aplicaciones de la rectificación con `NO_APLICA` | 2 | 2 | 0 | 0 |
| superficies canónicas vinculadas | 177 | 177 | 0 | 0 |
| suites para `app_code` con superficies | 9 | 9 | 0 | 0 |
| perfiles de actor/función/contexto | 29 | 29 | 0 | 0 |
| variantes normales | 29 | 29 | 0 | 0 |
| variantes de recuperación | 29 | 29 | 0 | 0 |
| vistas NEXO históricas preservadas | 16 | 16 | 0 | 0 |
| contextos NEXO preservados | 8 | 8 | 0 | 0 |
| rutas, pantallas o permisos nuevos | 0 | 0 | 0 | 0 |
| requisitos de prueba nuevos o modificados | 0 | 0 | 0 | 0 |

El resultado queda `ESPECIFICADO` y `PAQUETE_DE_PROTOTIPOS_TESTEABLES_DEFINIDO`. No se declara implementación ni validación humana.

---

#### 4. Fuentes y precedencia consumidas

La tarea consume sin reabrir:

- `AUTH-UI-052 — Diseñar página inicial según actor`;
- `AUTH-UI-053 — Diseñar navegación según tareas frecuentes`;
- `AUTH-UI-054 — Reducir opciones irrelevantes`;
- la rectificación integral de `AUTH-UI-052..060`;
- `SCREEN-CANONICAL-CATALOG-001` y sus 177 identidades `VSCREEN-*`;
- la matriz de diez decisiones de aplicación;
- las clases de reducción y decisiones individuales por superficie definidas en `AUTH-UI-054`;
- contratos de contexto activo, actor, función, territorio, dispositivo, navegación, autorización, sensibilidad, masking, accesibilidad, carga, vacío, denegación y recuperación;
- la evidencia histórica NEXO ya materializada, únicamente como perfil específico y no como prueba de cobertura global.

Precedencia:

```text
RECTIFICACION GLOBAL AUTH-UI-052..060
>
AUTH-UI-052 / AUTH-UI-053 / AUTH-UI-054 APROBADAS
>
CATALOGO CANONICO DE 177 SUPERFICIES
>
EVIDENCIA PARCIAL HISTORICA NEXO
```

---

#### 5. `APPLICATION-TESTABLE-PROTOTYPE-CONTRACT-001`

##### 5.1. Naturaleza

El prototipo es una representación documental de baja o media fidelidad. Debe permitir que una persona o revisor pueda:

1. reconocer aplicación, función o relación activa;
2. identificar el contexto material que afecta la decisión;
3. localizar una acción o tarea ya elegible;
4. distinguir trabajo prioritario de opciones secundarias;
5. reconocer un bloqueo, cambio, retiro o fallo;
6. encontrar una salida o recuperación segura;
7. detectar si existe mezcla indebida de función, actor, territorio o datos.

##### 5.2. No autoridad

El prototipo nunca se interpreta como:

- decisión real de autorización;
- evidencia de un permiso concedido;
- representación de datos productivos;
- simulación de una mutación real;
- prueba de que una ruta o componente ya existe;
- validación de que la UI es usable;
- aprobación final de una superficie.

Toda acción representada se rotula como ficticia o sin efectos reales cuando pueda confundirse con una mutación.

##### 5.3. Fidelidad mínima

Cada variante debe representar al menos:

- encabezado o resumen de contexto;
- título humano de la tarea o superficie;
- una acción primaria como máximo;
- siguiente tarea cuando exista;
- frecuentes y recientes dentro de los máximos ya aprobados;
- familia secundaria únicamente cuando contenga opciones pertinentes;
- estado crítico cuando aplique;
- recuperación o salida segura en la variante de recuperación;
- indicación visible de que se trata de un prototipo sin efectos reales.

---

#### 6. `APPLICATION-PROTOTYPE-RECTIFICATION-COVERAGE-001`

| Aplicación de la rectificación | Decisión | Proyección cubierta | Salida |
| --- | --- | --- | --- |
| ANIMA | APLICA | experiencia personal laboral y supervisión puntual autorizada | suite `PROTO-SUITE-ANIMA-001` |
| FOGO | APLICA | producción, supervisión, calidad y gobierno productivo según función activa | suite `PROTO-SUITE-FOGO-001` |
| NEXO | APLICA | solicitud, bodega, custodia, recepción, supervisión, configuración, multifunción y dispositivo compartido | suite `PROTO-SUITE-NEXO-001` |
| NUMERA | APLICA | trabajo financiero, aprobación, conciliación, análisis y auditoría | suite `PROTO-SUITE-NUMERA-001` |
| ORIGO | APLICA | solicitud/compra, aprobación y recepción/conciliación | suite `PROTO-SUITE-ORIGO-001` |
| PASS | APLICA | experiencia personal de cliente | suite `PROTO-SUITE-PASS-001` |
| PULSO | APLICA | caja, servicio/pedido y administración comercial según sesión y función | suite `PROTO-SUITE-PULSO-001` |
| TALENTO | NO_APLICA | producto futuro sin `app_code` canónico de pantallas | no se inventa prototipo Vento OS |
| VISO | APLICA | dirección, administración, aprobación, auditoría y soporte según responsabilidad | suite `PROTO-SUITE-VISO-001` |
| VITAL | NO_APLICA | producto separado y fuera de Vento OS | no recibe prototipo Vento OS |

Reglas:

1. `TALENTO` no recibe prototipo Vento OS mientras no exista `app_code` canónico de pantallas.
2. `VITAL` no recibe prototipo Vento OS mientras continúe fuera del sistema.
3. La cobertura SHELL se documenta únicamente para conservar las siete superficies reales heredadas por `AUTH-UI-054`; no altera la matriz de diez aplicaciones de la rectificación.
4. AURA conserva cero superficies en el catálogo vigente y por tanto no obtiene una suite visual inventada.
5. Ninguna aplicación se considera cubierta por asociación con NEXO.

---

#### 7. `APPLICATION-PROTOTYPE-SURFACE-BINDING-001`

Cada `VSCREEN-*` vigente queda vinculado exactamente una vez a una suite de prototipo mediante su `app_code` heredado. La tarea no reasigna identidades.

| Suite | `app_code` | Cobertura `VSCREEN-*` | Superficies | Perfiles | Variantes | Foco |
| --- | --- | --- | --- | --- | --- | --- |
| `PROTO-SUITE-SHELL-001` | `shell` | `VSCREEN-0001..0006`; `VSCREEN-0175` | 7 | 3 | 6 | soporte transversal del catálogo de superficies; no altera la matriz de diez aplicaciones |
| `PROTO-SUITE-VISO-001` | `viso` | `VSCREEN-0007..0026`; `VSCREEN-0113..0123` | 31 | 3 | 6 | dirección, administración/configuración y auditoría/soporte |
| `PROTO-SUITE-ANIMA-001` | `anima` | `VSCREEN-0027..0032`; `VSCREEN-0124..0131` | 14 | 2 | 4 | trabajador y supervisión puntual |
| `PROTO-SUITE-NEXO-001` | `nexo` | `VSCREEN-0033..0054`; `VSCREEN-0132..0144`; `VSCREEN-0176..0177` | 37 | 8 | 16 | ocho contextos NEXO preservados |
| `PROTO-SUITE-FOGO-001` | `fogo` | `VSCREEN-0055..0067`; `VSCREEN-0173..0174` | 15 | 3 | 6 | ejecución productiva, calidad/supervisión y gobierno/planeación |
| `PROTO-SUITE-ORIGO-001` | `origo` | `VSCREEN-0068..0079`; `VSCREEN-0145..0146` | 14 | 3 | 6 | compra, aprobación y recepción/conciliación |
| `PROTO-SUITE-PULSO-001` | `pulso` | `VSCREEN-0080..0093`; `VSCREEN-0147..0152` | 20 | 3 | 6 | caja, servicio/pedido y administración |
| `PROTO-SUITE-NUMERA-001` | `numera` | `VSCREEN-0094..0106`; `VSCREEN-0153..0159` | 20 | 3 | 6 | operación financiera, aprobación/tesorería y análisis/auditoría |
| `PROTO-SUITE-PASS-001` | `pass` | `VSCREEN-0107..0112`; `VSCREEN-0160..0172` | 19 | 1 | 2 | cliente sobre su propia relación |

Reconciliación:

```text
EXPECTED_VSCREEN = 177
BOUND_VSCREEN = 177
UNBOUND_VSCREEN = 0
DUPLICATE_BINDINGS = 0
PROTOTYPE_SUITES = 9
PROFILE_COUNT = 29
NORMAL_VARIANTS = 29
RECOVERY_VARIANTS = 29
TOTAL_VARIANTS = 58
AURA_VSCREEN = 0
TALENTO_APP_CODE_CREATED = 0
VITAL_VSCREEN = 0
```

El vínculo por suite no significa que todas las superficies se vean idénticas. La suite conserva la gramática y los perfiles; cada superficie mantiene nombre, propósito, `app_code`, clasificación y reducción propios.

---

#### 8. `APPLICATION-PROTOTYPE-CONTEXT-CATALOG-001`

Cada perfil representa una diferencia material de actor, función, relación, dispositivo o responsabilidad que debe poder observarse antes de las pruebas reales.

| Prototipo | Aplicación | Actor / función / contexto | Variante normal | Variante de recuperación |
| --- | --- | --- | --- | --- |
| `PROTO-SHELL-001` | SHELL | persona autenticada en hub | `NORMAL-01` — reconocer contexto y abrir una aplicación disponible | `RECOVERY-01` — aplicación o contexto retirado mientras se decide |
| `PROTO-SHELL-002` | SHELL | persona resolviendo acceso o sesión | `NORMAL-02` — recuperar acceso y comprender el siguiente paso seguro | `RECOVERY-02` — sesión expirada, factor faltante o acceso denegado |
| `PROTO-SHELL-003` | SHELL | actor en dispositivo compartido | `NORMAL-03` — confirmar actor activo y continuar solo trabajo compatible | `RECOVERY-03` — cambio de actor y limpieza de datos de la persona anterior |
| `PROTO-ANIMA-001` | ANIMA | trabajador en experiencia personal | `NORMAL-04` — reconocer jornada, tarea u obligación personal prioritaria | `RECOVERY-04` — turno/check-in/contexto quedó vencido o cambió |
| `PROTO-ANIMA-002` | ANIMA | supervisor puntual autorizado | `NORMAL-05` — abrir una responsabilidad de supervisión sin mezclar la vista personal | `RECOVERY-05` — cobertura o capacidad de supervisión retirada |
| `PROTO-VISO-001` | VISO | dirección o gerencia | `NORMAL-06` — identificar decisión, excepción u obligación prioritaria | `RECOVERY-06` — datos parciales o indicador sin evidencia suficiente |
| `PROTO-VISO-002` | VISO | administrador o configurador | `NORMAL-07` — abrir la capacidad administrativa exacta sin backoffice universal | `RECOVERY-07` — cambio en alcance, versión o autorización de configuración |
| `PROTO-VISO-003` | VISO | auditor, cumplimiento o soporte | `NORMAL-08` — consultar caso/evidencia dentro del alcance concedido | `RECOVERY-08` — evidencia indisponible, conflicto o cobertura revocada |
| `PROTO-NEXO-001` | NEXO | solicitante autorizado | `NORMAL-09` — crear o continuar solicitud propia | `RECOVERY-09` — solicitud propia cambió, fue retirada o dejó de ser continuable |
| `PROTO-NEXO-002` | NEXO | bodega o preparación | `NORMAL-10` — continuar tarea prioritaria de bodega | `RECOVERY-10` — datos parciales, preparación revocada o tarea cambiada |
| `PROTO-NEXO-003` | NEXO | conductor o custodio | `NORMAL-11` — abrir transporte/custodia asignados | `RECOVERY-11` — asignación retirada, ruta cambiada o fallo técnico |
| `PROTO-NEXO-004` | NEXO | receptor autorizado | `NORMAL-12` — iniciar recepción válida | `RECOVERY-12` — recepción parcial, diferencia o cantidad incompleta |
| `PROTO-NEXO-005` | NEXO | supervisor territorial | `NORMAL-13` — abrir caso/bloqueo prioritario | `RECOVERY-13` — evidencia insuficiente o conflicto que impide decidir |
| `PROTO-NEXO-006` | NEXO | configurador autorizado | `NORMAL-14` — abrir capacidad administrativa exacta | `RECOVERY-14` — cambio no confirmado, versión conflictiva o salida segura |
| `PROTO-NEXO-007` | NEXO | persona multifunción | `NORMAL-15` — reconocer una única función activa | `RECOVERY-15` — cambio de función y retiro de opciones/datos de la anterior |
| `PROTO-NEXO-008` | NEXO | dispositivo compartido con actor activo | `NORMAL-16` — continuar trabajo compatible con actor y dispositivo | `RECOVERY-16` — cambio de actor, limpieza de sesión y re-resolución de contexto |
| `PROTO-FOGO-001` | FOGO | operador de producción | `NORMAL-17` — continuar lote/tarea productiva prioritaria | `RECOVERY-17` — lote revocado, datos parciales o resultado desconocido |
| `PROTO-FOGO-002` | FOGO | supervisor o calidad | `NORMAL-18` — revisar excepción, control o liberación atribuible | `RECOVERY-18` — evidencia insuficiente, bloqueo o liberación no disponible |
| `PROTO-FOGO-003` | FOGO | planeación o gobierno de receta | `NORMAL-19` — abrir plan/receta/versión autorizados | `RECOVERY-19` — conflicto de versión, vigencia o publicación |
| `PROTO-ORIGO-001` | ORIGO | solicitante o comprador | `NORMAL-20` — continuar solicitud/compra prioritaria | `RECOVERY-20` — cotización, orden o condición de proveedor cambió |
| `PROTO-ORIGO-002` | ORIGO | aprobador | `NORMAL-21` — resolver aprobación atribuida dentro de alcance | `RECOVERY-21` — aprobación retirada, versión cambió o evidencia insuficiente |
| `PROTO-ORIGO-003` | ORIGO | recepción o conciliación | `NORMAL-22` — recibir/conciliar sin adquirir autoridad de comprador | `RECOVERY-22` — recepción parcial, diferencia o documento inconsistente |
| `PROTO-PULSO-001` | PULSO | caja o terminal operativo | `NORMAL-23` — continuar venta/caja compatible con sesión y dispositivo | `RECOVERY-23` — sesión, caja o terminal cambiaron o quedaron inválidos |
| `PROTO-PULSO-002` | PULSO | servicio o gestión de pedido | `NORMAL-24` — continuar pedido/servicio prioritario | `RECOVERY-24` — pedido cambió, canal quedó inconsistente o entrega no confirmada |
| `PROTO-PULSO-003` | PULSO | manager o administración comercial | `NORMAL-25` — abrir control/configuración autorizados | `RECOVERY-25` — alcance, sede o configuración cambió antes de confirmar |
| `PROTO-NUMERA-001` | NUMERA | operación financiera | `NORMAL-26` — continuar obligación, conciliación o cierre vigente | `RECOVERY-26` — periodo, entidad o conciliación quedó desactualizada |
| `PROTO-NUMERA-002` | NUMERA | aprobación o tesorería | `NORMAL-27` — resolver aprobación/pago atribuible | `RECOVERY-27` — aprobación revocada, lote cambió o ejecución externa quedó incierta |
| `PROTO-NUMERA-003` | NUMERA | análisis o auditoría | `NORMAL-28` — consultar excepción/análisis con fuentes identificables | `RECOVERY-28` — datos parciales, periodo no consolidado o evidencia indisponible |
| `PROTO-PASS-001` | PASS | cliente | `NORMAL-29` — continuar compra, pedido, beneficio o caso propio | `RECOVERY-29` — pago/pedido pendiente, estado cambió o servicio no está disponible |

Reglas de cardinalidad:

- cada perfil tiene exactamente dos variantes;
- la variante normal demuestra una composición coherente cuando el contexto es válido;
- la variante de recuperación demuestra al menos un cambio, retiro, parcialidad, conflicto, denegación o fallo material;
- una variante de recuperación no inventa autoridad alternativa para “desbloquear” el flujo;
- el cambio de función o actor vuelve a resolver el conjunto desde cero.

---

#### 9. `APPLICATION-PROTOTYPE-NORMAL-RECOVERY-CATALOG-001`

##### 9.1. Variante normal

Toda variante normal debe usar únicamente opciones ya permitidas por los contratos consumidos y mostrar:

```text
CONTEXTO RESUELTO
+
TRABAJO ELEGIBLE
+
REDUCCION APLICADA
+
UNA ACCION PRIMARIA COMO MAXIMO
+
SIGUIENTE TAREA CUANDO EXISTA
+
DESCUBRIMIENTO SECUNDARIO MINIMO
```

No es obligatorio que exista acción primaria. Un estado normal puede representar vacío válido o solo descubrimiento secundario cuando esa sea la decisión autoritativa.

##### 9.2. Variante de recuperación

Toda variante de recuperación debe representar al menos una de estas familias cerradas:

| Familia | Ejemplos admitidos | Regla visual |
| --- | --- | --- |
| `CONTEXTO_CAMBIADO` | actor, función, turno, sede, área, dispositivo o alcance cambió | retirar datos/opciones incompatibles y pedir nueva resolución |
| `TRABAJO_CAMBIADO_O_RETIRADO` | tarea, asignación, custodia, pedido, lote, aprobación o caso cambió | no conservar control obsoleto; explicar cambio y recalcular |
| `DATOS_PARCIALES_O_STALE` | fuente incompleta, periodo no consolidado, versión vencida | distinguir parcialidad de vacío; no completar con supuestos |
| `DENEGACION_EXPLICITA` | deep link o acción ya no autorizados | mostrar denegación minimizada sin revelar opciones de otros actores |
| `CONFLICTO_O_EVIDENCIA_INSUFICIENTE` | versión, aprobación, conciliación o prueba no permiten decidir | bloquear decisión insegura y conservar salida segura |
| `FALLO_TECNICO` | indisponibilidad sin decisión estable | diferenciar fallo de vacío y ofrecer reintento seguro |
| `RESULTADO_DESCONOCIDO` | pudo existir aceptación de una mutación previa | no repetir efecto; conciliar antes de volver a ejecutar |
| `CAMBIO_DE_ACTOR_EN_DISPOSITIVO` | estación compartida cambia de persona | limpiar datos, recientes y contexto antes de la nueva proyección |

##### 9.3. Equivalencias prohibidas

```text
RECUPERACION != BYPASS
RECUPERACION != PERMISO TEMPORAL
FALLO != VACIO
PARCIALIDAD != CERO
DENEGACION != OPCION DESHABILITADA EN EL MENU
ROL VISIBLE != AUTORIDAD
PROTOTIPO != IMPLEMENTACION
```

---

#### 10. `APPLICATION-PROTOTYPE-COMPOSITION-RULES-001`

La gramática visual común utiliza hasta nueve zonas conceptuales:

| Orden | Zona | Regla |
| ---: | --- | --- |
| 1 | aplicación y contexto | actor/relación, función, territorio o alcance, dispositivo y frescura cuando sean materiales |
| 2 | estado crítico | solo cuando exista cambio, parcialidad, bloqueo, denegación, conflicto o fallo |
| 3 | acción primaria | máximo una; puede estar ausente |
| 4 | siguiente tarea | máximo una; no duplica la acción primaria |
| 5 | frecuentes | máximo cuatro y solo después de elegibilidad |
| 6 | recientes | máximo tres instancias revalidadas |
| 7 | familias secundarias | únicamente con opciones relevantes |
| 8 | utilidades contextuales | solo dentro de la tarea que las necesita |
| 9 | cambio de función o actor | únicamente cuando exista más de una función válida o dispositivo compartido |

Plantilla de referencia:

```text
[ APLICACION / PROTOTIPO SIN EFECTOS REALES ]
[ ACTOR / FUNCION / CONTEXTO / DISPOSITIVO ]

[ ESTADO CRITICO SI APLICA ]

[ ACCION PRIMARIA ]
[ SIGUIENTE TAREA ]

[ FRECUENTES <= 4 ]
[ RECIENTES <= 3 ]

[ FAMILIAS SECUNDARIAS RELEVANTES ]

[ RECUPERACION / SALIDA SEGURA ]
```

La plantilla es una gramática, no un layout obligatorio. Móvil, tablet, estación compartida y escritorio pueden reorganizarla sin aumentar autoridad ni cardinalidad.

---

#### 11. `APPLICATION-PROTOTYPE-FIXTURE-CONTRACT-001`

Los prototipos usan exclusivamente datos ficticios y minimizados.

Reglas:

1. no usar nombres, correos, teléfonos, documentos, direcciones o identificadores reales;
2. no usar credenciales, secretos, tokens, claves, URLs privadas ni datos de producción;
3. los nombres de sedes, productos, pedidos, lotes, proveedores o personas se sustituyen por fixtures claramente ficticios;
4. los importes, conteos, fechas y estados se eligen únicamente para hacer observable la decisión visual;
5. una variante de recuperación puede representar ausencia, conflicto o parcialidad sin simular que el backend ya resolvió el caso;
6. los fixtures no se convierten en seeds, migraciones ni datos persistentes por efecto de esta tarea;
7. el prototipo no necesita conexión de red para ser válido documentalmente.

---

#### 12. `NEXO-TESTABLE-PROTOTYPE-PROFILE-001`

La evidencia histórica NEXO se preserva como especialización íntegra del catálogo global:

| Perfil global NEXO | Vista histórica normal | Vista histórica recuperación | Contexto preservado |
| --- | --- | --- | --- |
| `PROTO-NEXO-001` | `SCREEN-055-001` | `SCREEN-055-002` | solicitante autorizado |
| `PROTO-NEXO-002` | `SCREEN-055-003` | `SCREEN-055-004` | bodega o preparación |
| `PROTO-NEXO-003` | `SCREEN-055-005` | `SCREEN-055-006` | conductor o custodio |
| `PROTO-NEXO-004` | `SCREEN-055-007` | `SCREEN-055-008` | receptor autorizado |
| `PROTO-NEXO-005` | `SCREEN-055-009` | `SCREEN-055-010` | supervisor territorial |
| `PROTO-NEXO-006` | `SCREEN-055-011` | `SCREEN-055-012` | configurador autorizado |
| `PROTO-NEXO-007` | `SCREEN-055-013` | `SCREEN-055-014` | persona multifunción |
| `PROTO-NEXO-008` | `SCREEN-055-015` | `SCREEN-055-016` | dispositivo compartido |

Reconciliación:

```text
NEXO_CONTEXTS_EXPECTED = 8
NEXO_CONTEXTS_MATERIALIZED = 8
NEXO_HISTORICAL_VIEWS_EXPECTED = 16
NEXO_HISTORICAL_VIEWS_PRESERVED = 16
MISSING = 0
DUPLICATES = 0
```

El artefacto histórico `NEXO_PROTOTIPO_TEST_USUARIOS_AUTH_UI_055_057.pptx` y el instrumento `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001` permanecen como evidencia parcial del carril NEXO. No se promueven por sí solos a contrato global ni prueban cobertura de otras aplicaciones.

La definición global de criterios y medición continúa reservada a `AUTH-UI-057`; las sesiones reales continúan reservadas a `AUTH-UI-058`.

---

#### 13. Flujo de prototipo y navegación simulada

El flujo común de revisión o prueba guiada es:

```text
SELECCIONAR SUITE Y PERFIL
→
MOSTRAR VARIANTE NORMAL O RECUPERACION
→
PRESENTAR CONTEXTO Y TRABAJO SIN EXPLICAR LA RESPUESTA
→
PERMITIR IDENTIFICAR ACCION / SIGUIENTE TAREA / SALIDA
→
NAVEGAR SOLO ENTRE ESTADOS FICTICIOS DEL PROTOTIPO
→
RETORNAR AL PERFIL SIN EFECTO EMPRESARIAL
```

Las transiciones son conceptuales. No deben:

- llamar una API productiva;
- guardar cambios;
- producir eventos empresariales;
- cambiar permisos;
- actualizar estado real;
- persistir telemetría de usuario;
- afirmar éxito de una operación.

---

#### 14. Responsive, accesibilidad y dispositivo

##### 14.1. Móvil

- contexto y acción principal preceden a listas secundarias;
- no se depende de hover;
- frecuentes y recientes no exceden sus máximos;
- recuperación permanece visible sin forzar scroll horizontal;
- acciones táctiles se distinguen de texto informativo.

##### 14.2. Tablet y estación compartida

- actor humano activo y dispositivo quedan inequívocos;
- el cambio de actor elimina visualmente los datos de la persona anterior antes de mostrar la nueva proyección;
- periféricos se representan solo cuando la tarea los requiere;
- ninguna capacidad administrativa aparece por disponibilidad técnica del dispositivo.

##### 14.3. Escritorio

- el espacio adicional mejora lectura, no aumenta opciones de primer nivel;
- paneles secundarios no compiten con trabajo prioritario;
- filtros administrativos no se presentan como contexto operativo.

##### 14.4. Accesibilidad

- orden de lectura y foco siguen la precedencia contractual;
- acciones tienen nombre y propósito textual;
- estado crítico no depende solo de color;
- vacío, parcialidad, denegación, revocación y fallo son distinguibles;
- cambios dinámicos de contexto, actor o función deben poder anunciarse;
- el prototipo conserva tamaño y separación suficientes para revisar objetivos táctiles cuando corresponda.

---

#### 15. Seguridad, privacidad y minimización

1. El prototipo muestra solo el universo necesario para el perfil seleccionado.
2. No incluye opciones de otras funciones para luego deshabilitarlas.
3. No expone reason codes internos, nombres de tablas, reglas RLS, permisos técnicos ni estructuras de backend.
4. Deep links representados siguen sometidos a revalidación conceptual.
5. Un cambio de actor o función retira datos, recientes y opciones de la proyección anterior.
6. Datos sensibles se sustituyen por fixtures.
7. No se modela ranking de productividad individual.
8. Un bloqueo de seguridad no se convierte en un botón alternativo que permita continuar.
9. Un resultado desconocido no se representa como éxito.
10. La variante visual nunca sustituye los controles de servidor de una implementación futura.

---

#### 16. Estado técnico, brechas y `APPLICATION-PROTOTYPE-HANDOFF-001`

| Elemento | Estado documental | Condición de salida |
| --- | --- | --- |
| diez decisiones de rectificación | `ESPECIFICADO` | validación interna global en `AUTH-UI-056` |
| 177 vínculos de superficie a suite | `ESPECIFICADO` | comprobar integridad y aptitud de prueba en `AUTH-UI-056` |
| 29 perfiles | `ESPECIFICADO` | validación interna sin omisiones ni solapamientos |
| 58 variantes normal/recuperación | `ESPECIFICADO` | validación de coherencia, accesibilidad y testabilidad |
| NEXO 8 contextos / 16 vistas históricas | `PRESERVADO` | validar como subconjunto del paquete global |
| implementación física | `NO_IMPLEMENTADO` | paquetes físicos autorizados posteriores |
| validación interna | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-056` |
| criterios medibles por superficie | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-057` |
| sesiones con usuarios reales | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058` |
| problemas observados | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-059` |
| aprobación final | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-060` |

`AUTH-UI-056` recibe exactamente:

```text
10 DECISIONES DE RECTIFICACION
+
177 VINCULOS VSCREEN -> SUITE
+
9 SUITES
+
29 PERFILES
+
29 VARIANTES NORMALES
+
29 VARIANTES DE RECUPERACION
+
GRAMATICA VISUAL
+
FIXTURES FICTICIOS
+
PERFIL NEXO 8 CONTEXTOS / 16 VISTAS
```

`AUTH-UI-056` podrá declarar conformidad o hallazgos internos del paquete. No podrá sustituir las sesiones reales de `AUTH-UI-058`.

---

#### 17. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: esta tarea convierte decisiones documentales ya aprobadas de entrada, navegación, reducción, estados, contexto y seguridad en representaciones ficticias destinadas a validación posterior. No crea comportamiento ejecutable, ruta, permiso, proceso, dato, integración, transición, mutación, pantalla canónica ni efecto empresarial; tampoco modifica, difiere, descarta ni declara obsoleto ningún requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 18. Cobertura de prueba vigente reutilizada

La validación posterior reutiliza la cobertura existente de autorización por vista y acción, contexto activo, actor/función/territorio, navegación, dispositivo compartido, sensibilidad, masking, accesibilidad, estados de carga/vacío/error, continuidad, reducción segura de opciones y contratos específicos de cada aplicación.

Esta sección es trazabilidad heredada y no modifica el registro 04A.

---

#### 19. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout del usuario después del cierre de `AUTH-UI-054`, apertura de 055 y sustitución de este artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, BLOQUE I, topología y batería global quedan para el checkout local. |
| REMOTA | PASS | Se verificaron el `main` vigente posterior a `AUTH-UI-053`, la continuidad 054→055→056, la rectificación `AUTH-UI-052..060`, el propietario, topología `DEFINE_ONCE`, `NO_PHYSICAL_INSTANCE`, scripts de validación y condición mínima de cierre global de 055. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron sesiones, telemetría, observación humana ni pruebas de usabilidad; esas evidencias pertenecen a tareas posteriores. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea instancia física propia ni modifica código, datos, Supabase, componentes o despliegues. |

---

#### 20. Criterios de aceptación

La tarea queda documentalmente completa cuando se confirma que:

- [ ] existen exactamente diez decisiones de aplicación de la rectificación;
- [ ] ocho permanecen `APLICA` y TALENTO/VITAL conservan `NO_APLICA`;
- [ ] TALENTO no recibe `app_code` ni prototipo Vento OS inventado;
- [ ] VITAL permanece fuera de Vento OS;
- [ ] AURA conserva cero superficies y no recibe prototipo inventado;
- [ ] las siete superficies SHELL permanecen cubiertas como soporte transversal sin alterar la matriz de rectificación;
- [ ] las 177 superficies quedan vinculadas a exactamente una de nueve suites mediante su `app_code` heredado;
- [ ] ninguna superficie se renombra, reasigna o duplica;
- [ ] existen exactamente 29 perfiles de actor, función o contexto;
- [ ] cada perfil tiene exactamente una variante normal y una de recuperación;
- [ ] existen 29 variantes normales, 29 de recuperación y 58 variantes totales;
- [ ] cada variante normal usa únicamente opciones ya elegibles;
- [ ] cada variante de recuperación representa una salida segura sin bypass de autoridad;
- [ ] la gramática visual conserva máximo una acción primaria, una siguiente tarea, cuatro frecuentes y tres recientes;
- [ ] familias vacías y opciones incompatibles no se fabrican;
- [ ] contexto, actor, función y dispositivo permanecen distinguibles;
- [ ] datos del prototipo son ficticios y minimizados;
- [ ] los ocho contextos y dieciséis vistas NEXO históricas se preservan sin convertirse en prueba global;
- [ ] no se declaran resultados de usuarios ni criterios finales de usabilidad;
- [ ] no se crean rutas, pantallas canónicas, roles, funciones, permisos, procesos, datos ni requisitos de prueba;
- [ ] no se ejecuta código, Supabase ni despliegue;
- [ ] `AUTH-UI-056` permanece únicamente reservada.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-054 — Reducir opciones irrelevantes`

**TAREA ACTUAL APROBADA**
`AUTH-UI-055 — Crear prototipo por rol`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-056 — Validar prototipo antes de implementar`

### ✅ AUTH-UI-056 — Validar prototipo antes de implementar

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-055 — Crear prototipo por rol
**Tarea siguiente:** AUTH-UI-057 — Definir criterio de usabilidad por pantalla
**Tipo de tarea:** documental global; validación interna de integridad, coherencia, accesibilidad documental y aptitud de prueba del paquete completo de prototipos, sin ejecución con usuarios ni implementación física
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no modifica código productivo, componentes, rutas, roles, permisos, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Validar internamente que el paquete global aprobado en `AUTH-UI-055` es íntegro, coherente y suficientemente explícito para continuar al diseño de criterios medibles de `AUTH-UI-057`, sin confundir esta revisión documental con pruebas de accesibilidad ejecutadas, sesiones con usuarios o aprobación final.

La unidad validada es el paquete completo:

```text
10 DECISIONES DE RECTIFICACION
+
177 VINCULOS VSCREEN -> SUITE
+
9 SUITES
+
29 PERFILES DE ACTOR / FUNCION / CONTEXTO
+
29 VARIANTES NORMALES
+
29 VARIANTES DE RECUPERACION
+
GRAMATICA VISUAL
+
FIXTURES FICTICIOS
+
PERFIL NEXO HISTORICO PRESERVADO
=
PAQUETE DE PROTOTIPOS INTERNAMENTE VALIDABLE
```

La tarea no decide si una persona real entiende o usa correctamente una superficie. Ese resultado requiere criterios medibles en `AUTH-UI-057` y ejecución humana en `AUTH-UI-058`.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- validar que las diez decisiones de rectificación permanecen completas y sin sustituciones;
- validar que las 177 superficies siguen vinculadas a una suite sin duplicados ni reasignaciones;
- validar las nueve suites de prototipo existentes;
- validar los 29 perfiles y sus pares normal/recuperación;
- validar coherencia con actor, función, contexto, dispositivo, autoridad y reducción aprobados;
- revisar documentalmente accesibilidad, orden de lectura, estados críticos, tacto, responsive y dispositivo compartido;
- validar que las ocho familias de recuperación no introducen bypass, autoridad alternativa ni repetición insegura;
- comprobar que los fixtures son ficticios y minimizados;
- preservar como subconjunto los ocho contextos y dieciséis vistas históricas NEXO;
- registrar brechas esperadas y su tarea propietaria;
- decidir si el paquete puede continuar a `AUTH-UI-057`.

##### 2.2. Excluido

- ejecutar pruebas con personas;
- medir tiempo de tarea, éxito, dificultad, satisfacción o comprensión real;
- ejecutar auditoría automatizada de accesibilidad sobre una aplicación;
- afirmar conformidad WCAG ejecutada;
- producir o modificar una implementación;
- conectar datos reales o Supabase;
- crear nuevas superficies, rutas, roles, funciones, permisos o procesos;
- definir los criterios cuantitativos por cada una de las 177 superficies, reservado a `AUTH-UI-057`;
- ejecutar sesiones, reservado a `AUTH-UI-058`;
- registrar problemas observados en usuarios, reservado a `AUTH-UI-059`;
- aprobar pantallas finales, reservado a `AUTH-UI-060`.

---

#### 3. Entradas evaluadas

La validación consume como entrada principal la versión completa aprobada de `AUTH-UI-055`.

También consume sin redefinir:

- `AUTH-UI-052 — Diseñar página inicial según actor`;
- `AUTH-UI-053 — Diseñar navegación según tareas frecuentes`;
- `AUTH-UI-054 — Reducir opciones irrelevantes`;
- la rectificación integral `AUTH-UI-052..060`;
- `SCREEN-CANONICAL-CATALOG-001`;
- las decisiones de reducción por superficie heredadas de 054;
- los contratos de contexto activo, actor, función, territorio, autorización, privacidad, sensibilidad, masking, dispositivo compartido, loading, empty, error y recuperación;
- los artefactos históricos NEXO únicamente como evidencia parcial reutilizada.

La evidencia histórica `NEXO_PROTOTIPO_TEST_USUARIOS_AUTH_UI_055_057.pptx` y `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001` conserva valor para NEXO, pero no sustituye la validación global.

---

#### 4. Resultado material

Se materializan nueve artefactos documentales:

1. `APPLICATION-PROTOTYPE-VALIDATION-CONTRACT-001`;
2. `APPLICATION-PROTOTYPE-SUITE-VALIDATION-MATRIX-001`;
3. `APPLICATION-PROTOTYPE-PROFILE-VALIDATION-MATRIX-001`;
4. `APPLICATION-PROTOTYPE-RECOVERY-VALIDATION-MATRIX-001`;
5. `APPLICATION-PROTOTYPE-ACCESSIBILITY-REVIEW-MATRIX-001`;
6. `APPLICATION-PROTOTYPE-SESSION-READINESS-CHECKLIST-001`;
7. `APPLICATION-PROTOTYPE-PRETEST-FINDING-REGISTER-001`;
8. `NEXO-PROTOTYPE-VALIDATION-PROFILE-001`;
9. `APPLICATION-PROTOTYPE-VALIDATION-HANDOFF-001`.

Resultado agregado:

| Elemento | Esperado | Validado documentalmente | No conforme | Pendiente de ejecución posterior |
| --- | ---: | ---: | ---: | ---: |
| decisiones de rectificación | 10 | 10 | 0 | 0 |
| suites de prototipo | 9 | 9 | 0 | 0 |
| superficies vinculadas | 177 | 177 | 0 | 0 |
| perfiles | 29 | 29 | 0 | 0 |
| variantes normales | 29 | 29 | 0 | 0 |
| variantes de recuperación | 29 | 29 | 0 | 0 |
| familias de recuperación | 8 | 8 | 0 | 0 |
| dimensiones de accesibilidad documental | 8 | 8 | 0 | 0 |
| contextos NEXO históricos | 8 | 8 | 0 | 0 |
| vistas NEXO históricas | 16 | 16 | 0 | 0 |
| criterios medibles por superficie | 177 | 0 | 0 | 177 |
| sesiones reales con usuarios | 1 fase | 0 | 0 | 1 fase |
| requisitos nuevos o modificados | 0 | 0 | 0 | 0 |

**Decisión del gate:** `VALIDACION_INTERNA_CONFORME_PARA_CONTINUAR_A_AUTH_UI_057`.

Esta decisión no equivale a `LISTO_PARA_AUTH_UI_058`, `USABLE`, `ACCESIBLE_EJECUTADO`, `IMPLEMENTADO` ni `APROBADO_FINAL`.

---

#### 5. `APPLICATION-PROTOTYPE-VALIDATION-CONTRACT-001`

El paquete es internamente conforme únicamente cuando:

```text
INTEGRIDAD ESTRUCTURAL = CONFORME
AND
COHERENCIA CONTRACTUAL = CONFORME
AND
RECUPERACION SEGURA = CONFORME
AND
ACCESIBILIDAD DOCUMENTAL = CONFORME
AND
FIXTURES / PRIVACIDAD = CONFORME
AND
TESTABILIDAD CONCEPTUAL = CONFORME
AND
BLOQUEADORES INTERNOS DE 056 = 0
```

Definiciones:

- `CONFORME_DOCUMENTAL`: la especificación contiene la decisión, relación o restricción necesaria y no presenta contradicción interna observable;
- `PENDIENTE_DE_EJECUCION`: requiere evidencia humana, implementación o medición reservada a una tarea posterior;
- `NO_CONFORME`: existe omisión, contradicción o condición que impide entregar el paquete a 057;
- `NO_APLICA`: la dimensión no corresponde al elemento validado y existe justificación explícita.

Prohibiciones:

```text
CONFORME_DOCUMENTAL != PRUEBA EJECUTADA
CONFORME_DOCUMENTAL != EXITO CON USUARIOS
CONFORME_DOCUMENTAL != WCAG CERTIFICADO
CONFORME_DOCUMENTAL != IMPLEMENTACION
VALIDACION INTERNA != APROBACION FINAL
```

---

#### 6. `APPLICATION-PROTOTYPE-SUITE-VALIDATION-MATRIX-001`

| Suite | `app_code` | VSCREEN | Perfiles | Variantes | Integridad | Coherencia | Accesibilidad doc. | Aptitud de prueba |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `PROTO-SUITE-SHELL-001` | `shell` | 7 | 3 | 6 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-VISO-001` | `viso` | 31 | 3 | 6 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-ANIMA-001` | `anima` | 14 | 2 | 4 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-NEXO-001` | `nexo` | 37 | 8 | 16 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-FOGO-001` | `fogo` | 15 | 3 | 6 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-ORIGO-001` | `origo` | 14 | 3 | 6 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-PULSO-001` | `pulso` | 20 | 3 | 6 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-NUMERA-001` | `numera` | 20 | 3 | 6 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SUITE-PASS-001` | `pass` | 19 | 1 | 2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |

Reconciliación:

```text
EXPECTED_SUITES = 9
VALIDATED_SUITES = 9
EXPECTED_VSCREEN_BINDINGS = 177
VALIDATED_VSCREEN_BINDINGS = 177
EXPECTED_PROFILES = 29
VALIDATED_PROFILES = 29
EXPECTED_VARIANTS = 58
VALIDATED_VARIANTS = 58
SUITE_BLOCKERS = 0
```

TALENTO y VITAL conservan `NO_APLICA` en la matriz de rectificación. AURA conserva cero superficies. SHELL conserva sus siete superficies como soporte transversal del inventario real y no altera la matriz de diez aplicaciones.

---

#### 7. `APPLICATION-PROTOTYPE-PROFILE-VALIDATION-MATRIX-001`

Cada perfil debe conservar:

- actor, relación o sujeto distinguible;
- función activa cuando aplique;
- contexto y dispositivo materiales;
- universo ya elegible, sin autoridad creada por presentación;
- reducción compatible con 054;
- exactamente una variante normal y una de recuperación;
- datos ficticios;
- ausencia de efecto empresarial real.

| Perfil | Aplicación | Actor / función / contexto | Normal + recovery | Contexto/autoridad | Reducción | Testabilidad |
| --- | --- | --- | --- | --- | --- | --- |
| `PROTO-SHELL-001` | SHELL | persona autenticada en hub | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SHELL-002` | SHELL | persona resolviendo acceso o sesión | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-SHELL-003` | SHELL | actor en dispositivo compartido | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-ANIMA-001` | ANIMA | trabajador en experiencia personal | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-ANIMA-002` | ANIMA | supervisor puntual autorizado | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-VISO-001` | VISO | dirección o gerencia | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-VISO-002` | VISO | administrador o configurador | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-VISO-003` | VISO | auditor, cumplimiento o soporte | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-001` | NEXO | solicitante autorizado | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-002` | NEXO | bodega o preparación | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-003` | NEXO | conductor o custodio | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-004` | NEXO | receptor autorizado | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-005` | NEXO | supervisor territorial | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-006` | NEXO | configurador autorizado | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-007` | NEXO | persona multifunción | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NEXO-008` | NEXO | dispositivo compartido con actor activo | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-FOGO-001` | FOGO | operador de producción | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-FOGO-002` | FOGO | supervisor o calidad | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-FOGO-003` | FOGO | planeación o gobierno de receta | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-ORIGO-001` | ORIGO | solicitante o comprador | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-ORIGO-002` | ORIGO | aprobador | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-ORIGO-003` | ORIGO | recepción o conciliación | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-PULSO-001` | PULSO | caja o terminal operativo | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-PULSO-002` | PULSO | servicio o gestión de pedido | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-PULSO-003` | PULSO | manager o administración comercial | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NUMERA-001` | NUMERA | operación financiera | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NUMERA-002` | NUMERA | aprobación o tesorería | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-NUMERA-003` | NUMERA | análisis o auditoría | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |
| `PROTO-PASS-001` | PASS | cliente | 2/2 | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL | CONFORME_DOCUMENTAL |

Reconciliación:

```text
EXPECTED_PROFILES = 29
VALIDATED_PROFILES = 29
NORMAL_PAIRS = 29
RECOVERY_PAIRS = 29
MISSING_PROFILE = 0
DUPLICATE_PROFILE = 0
PROFILE_BLOCKERS = 0
```

---

#### 8. `APPLICATION-PROTOTYPE-RECOVERY-VALIDATION-MATRIX-001`

| Familia | Invariante validado | Resultado |
| --- | --- | --- |
| `CONTEXTO_CAMBIADO` | retira datos/opciones incompatibles y exige nueva resolución | CONFORME_DOCUMENTAL |
| `TRABAJO_CAMBIADO_O_RETIRADO` | retira control obsoleto, explica el cambio y recalcula la proyección | CONFORME_DOCUMENTAL |
| `DATOS_PARCIALES_O_STALE` | distingue parcialidad de vacío y prohíbe completar con supuestos | CONFORME_DOCUMENTAL |
| `DENEGACION_EXPLICITA` | muestra denegación minimizada sin revelar opciones de otros actores | CONFORME_DOCUMENTAL |
| `CONFLICTO_O_EVIDENCIA_INSUFICIENTE` | bloquea decisión insegura y conserva salida segura | CONFORME_DOCUMENTAL |
| `FALLO_TECNICO` | distingue fallo de vacío y admite reintento seguro | CONFORME_DOCUMENTAL |
| `RESULTADO_DESCONOCIDO` | prohíbe repetir efecto y exige conciliación previa | CONFORME_DOCUMENTAL |
| `CAMBIO_DE_ACTOR_EN_DISPOSITIVO` | limpia datos, recientes y contexto antes de la nueva proyección | CONFORME_DOCUMENTAL |

Reglas transversales confirmadas:

1. recuperación no crea una segunda ruta de autorización;
2. una denegación no se convierte en una opción deshabilitada que revele trabajo ajeno;
3. un resultado desconocido no permite reintentar una mutación ficticia como si fuera seguro;
4. parcialidad no se representa como vacío;
5. un cambio de actor limpia la proyección anterior;
6. un cambio de función obliga a recomponer el conjunto;
7. un fallo técnico no se presenta como decisión empresarial;
8. un conflicto o evidencia insuficiente conserva salida segura sin resolver por inferencia.

---

#### 9. `APPLICATION-PROTOTYPE-ACCESSIBILITY-REVIEW-MATRIX-001`

La accesibilidad en 056 es una **revisión documental de la especificación**, no una medición ejecutada sobre producto o navegador.

| Dimensión | Comprobación documental | Resultado |
| --- | --- | --- |
| orden de lectura y foco | la precedencia sigue contexto → estado → acción → siguiente tarea → secundarios | CONFORME_DOCUMENTAL |
| nombre y propósito de acciones | cada acción debe ser comprensible sin depender de iconografía aislada | CONFORME_DOCUMENTAL |
| estado crítico no solo por color | vacío, parcialidad, denegación, revocación y fallo se distinguen semánticamente | CONFORME_DOCUMENTAL |
| cambios dinámicos | actor, función o contexto deben poder anunciarse en una implementación futura | CONFORME_DOCUMENTAL |
| tacto y espaciado | la gramática permite revisar objetivos táctiles en superficies correspondientes | CONFORME_DOCUMENTAL |
| responsive | móvil, tablet, estación y escritorio preservan prioridad sin aumentar opciones | CONFORME_DOCUMENTAL |
| dispositivo compartido | actor activo y limpieza entre personas permanecen explícitos | CONFORME_DOCUMENTAL |
| datos sensibles | fixtures ficticios y minimizados; no se requiere información real | CONFORME_DOCUMENTAL |

Resultado:

```text
ACCESSIBILITY_DOCUMENTARY_DIMENSIONS = 8
CONFORMING = 8
NON_CONFORMING = 0
EXECUTED_ACCESSIBILITY_AUDIT = NO
USER_ACCESSIBILITY_EVIDENCE = NO
```

La evidencia ejecutada solo podrá afirmarse cuando exista un soporte real que pueda probarse en la tarea propietaria correspondiente.

---

#### 10. `APPLICATION-PROTOTYPE-SESSION-READINESS-CHECKLIST-001`

| Control | Estado después de 056 | Propietario siguiente |
| --- | --- | --- |
| cobertura 10 decisiones de rectificación | `READY` | ninguno |
| cobertura 177 superficies → suite | `READY` | ninguno |
| nueve suites | `READY` | ninguno |
| 29 perfiles | `READY` | ninguno |
| 58 variantes normal/recuperación | `READY` | ninguno |
| fixtures ficticios y minimizados | `READY` | ninguno |
| recuperación sin bypass | `READY` | ninguno |
| revisión documental de accesibilidad | `READY` | ninguno |
| criterios medibles por cada superficie | `PENDING` | `AUTH-UI-057` |
| instrumento/registro alineado con esos criterios | `PENDING` | `AUTH-UI-057` |
| participantes y modalidad real | `PENDING` | `AUTH-UI-058` |
| evidencia humana | `PENDING` | `AUTH-UI-058` |
| problemas observados y severidad | `PENDING` | `AUTH-UI-059` |
| decisión final por superficie | `PENDING` | `AUTH-UI-060` |

Por tanto:

```text
READY_FOR_AUTH_UI_057 = YES
READY_FOR_AUTH_UI_058 = NO
READY_FOR_IMPLEMENTATION = NO
READY_FOR_FINAL_APPROVAL = NO
```

---

#### 11. `APPLICATION-PROTOTYPE-PRETEST-FINDING-REGISTER-001`

| Hallazgo | Qué falta | Bloquea 056 | Propietario | Condición exacta de salida |
| --- | --- | --- | --- | --- |
| `PRETEST-056-001` | criterios medibles por cada superficie aplicable | no | `AUTH-UI-057` | las 177 superficies quedan relacionadas con criterio, umbral y justificación de `NO_APLICA` cuando corresponda |
| `PRETEST-056-002` | instrumento o mapeo de registro global alineado con los criterios | no | `AUTH-UI-057` | cada criterio de 057 puede registrarse de forma inequívoca durante las sesiones |
| `PRETEST-056-003` | sesiones ejecutadas con personas reales | no | `AUTH-UI-058` | existe evidencia por aplicación, actor, dispositivo, superficie y escenario aplicable |
| `PRETEST-056-004` | problemas reales clasificados y resueltos | no | `AUTH-UI-059` | hallazgos de sesiones tienen severidad, evidencia, owner, destino, retest y estado |
| `PRETEST-056-005` | decisión final por superficie | no | `AUTH-UI-060` | cada superficie tiene evidencia suficiente y bloqueadores cerrados antes de aprobarse |

No existe hallazgo sin propietario. Ninguna brecha anterior se resuelve dentro de 056.

---

#### 12. `NEXO-PROTOTYPE-VALIDATION-PROFILE-001`

La evidencia NEXO se conserva como perfil específico:

| Elemento NEXO | Esperado | Validado | Resultado |
| --- | ---: | ---: | --- |
| contextos históricos | 8 | 8 | `CONFORME_DOCUMENTAL` |
| vistas históricas | 16 | 16 | `CONFORME_DOCUMENTAL` |
| perfiles `PROTO-NEXO-*` | 8 | 8 | `CONFORME_DOCUMENTAL` |
| variantes normales | 8 | 8 | `CONFORME_DOCUMENTAL` |
| variantes recuperación | 8 | 8 | `CONFORME_DOCUMENTAL` |
| cuestionario histórico | 1 | 1 | `PRESERVADO_COMO_EVIDENCIA_PARCIAL` |

El cuestionario NEXO no se proyecta automáticamente como instrumento global para las demás aplicaciones. `AUTH-UI-057` deberá definir criterios medibles globales sin depender de esa extrapolación.

---

#### 13. Integridad, coherencia y no solapamiento

Se valida documentalmente que:

1. 056 no redefine las decisiones de 052, 053, 054 o 055;
2. 056 no crea pantallas ni cambia `app_code`;
3. 056 no reabre las 177 decisiones de reducción;
4. 056 no convierte frecuencia o presencia visual en autoridad;
5. 056 no define umbrales cuantitativos por superficie, reservados a 057;
6. 056 no ejecuta usuarios, reservado a 058;
7. 056 no registra problemas observados, reservado a 059;
8. 056 no aprueba pantallas, reservado a 060;
9. las brechas posteriores están asignadas a owner y condición de salida;
10. el paquete NEXO es subconjunto, no sustituto del alcance global.

---

#### 14. `APPLICATION-PROTOTYPE-VALIDATION-HANDOFF-001`

`AUTH-UI-057` recibe exactamente:

```text
PAQUETE AUTH-UI-055
+
GATE 056 = VALIDACION_INTERNA_CONFORME
+
10 DECISIONES DE RECTIFICACION
+
177 VINCULOS DE SUPERFICIE
+
9 SUITES
+
29 PERFILES
+
58 VARIANTES
+
8 FAMILIAS DE RECUPERACION
+
8 DIMENSIONES DE ACCESIBILIDAD DOCUMENTAL
+
5 BRECHAS POSTERIORES CON OWNER
```

Handoff por destino:

| Destino | Responsabilidad reservada |
| --- | --- |
| `AUTH-UI-057` | definir criterio medible y regla de decisión por cada superficie aplicable |
| `AUTH-UI-058` | ejecutar sesiones con usuarios reales |
| `AUTH-UI-059` | registrar, asignar, corregir y retestar problemas observados |
| `AUTH-UI-060` | aprobar o bloquear cada superficie usando evidencia suficiente |

---

#### 15. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: la tarea valida documentalmente la integridad y aptitud del paquete de prototipos definido en 055. No modifica comportamiento ejecutable, autorización, navegación, reglas de negocio, seguridad, privacidad, accesibilidad ejecutada, datos, procesos, integraciones, pantallas canónicas ni efectos empresariales; tampoco crea, modifica, difiere, descarta o declara obsoleto ningún requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 16. Cobertura de prueba vigente reutilizada

La validación reutiliza la cobertura existente de contexto activo, autorización por superficie y acción, reducción de opciones, dispositivo compartido, sensibilidad, masking, accesibilidad, loading, vacío, recuperación, continuidad y contratos específicos por aplicación.

Esta sección es trazabilidad heredada. No actualiza el registro 04A.

---

#### 17. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación real corresponde al checkout después del cierre de 055 y de la sustitución de este artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de BLOQUE I, catálogo de pantallas, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron la tarea canónica 056, su propietario, la rectificación `AUTH-UI-052..060`, la condición mínima de cierre, la topología `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`, las políticas y los validadores aplicables; 055 se usa desde su versión completa aprobada mientras su publicación remota permanece pendiente. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron personas, sesiones, tiempos, comprensión, errores reales ni métricas de uso. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea instancia física propia ni modifica código, datos, Supabase o despliegues. |

---

#### 18. Criterios de aceptación

La tarea queda documentalmente completa cuando se confirma que:

- [ ] las diez decisiones de rectificación permanecen reconciliadas;
- [ ] las nueve suites están presentes y vinculadas al inventario heredado;
- [ ] las 177 superficies permanecen cubiertas sin faltantes ni duplicados;
- [ ] los 29 perfiles están presentes;
- [ ] existen 29 variantes normales y 29 de recuperación;
- [ ] cada perfil conserva exactamente un par normal/recuperación;
- [ ] las ocho familias de recuperación cumplen las invariantes de seguridad;
- [ ] la accesibilidad está revisada como contrato documental sin fingir auditoría ejecutada;
- [ ] los datos de prototipo siguen siendo ficticios y minimizados;
- [ ] NEXO conserva 8 contextos, 16 vistas y su evidencia histórica como subconjunto;
- [ ] TALENTO, VITAL y AURA no reciben materialización inventada;
- [ ] los cinco pendientes posteriores tienen owner y condición de salida;
- [ ] no existen bloqueadores internos atribuibles a 056;
- [ ] el gate queda `VALIDACION_INTERNA_CONFORME_PARA_CONTINUAR_A_AUTH_UI_057`;
- [ ] 056 no declara resultados de usuarios, implementación ni aprobación final;
- [ ] no se crean o modifican requisitos de prueba;
- [ ] `AUTH-UI-057` permanece únicamente reservada.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-055 — Crear prototipo por rol`

**TAREA ACTUAL APROBADA**
`AUTH-UI-056 — Validar prototipo antes de implementar`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-057 — Definir criterio de usabilidad por pantalla`

### ✅ AUTH-UI-057 — Definir criterio de usabilidad por pantalla

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-056 — Validar prototipo antes de implementar
**Tarea siguiente:** AUTH-UI-058 — Probar con usuarios reales
**Tipo de tarea:** documental global; definición de criterios, umbrales, registro de evidencia y reglas de decisión para cada superficie aplicable del inventario canónico
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; no modifica código productivo, componentes, rutas, roles, permisos, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo se medirá y decidirá la usabilidad de cada una de las 177 superficies `VSCREEN-*` ya vinculadas y validadas internamente por `AUTH-UI-055` y `AUTH-UI-056`, sin ejecutar todavía sesiones con usuarios ni inventar resultados.

La regla general es:

```text
VSCREEN CANONICA
+
CLASE DE REDUCCION HEREDADA DE AUTH-UI-054
+
PERFIL DE CRITERIO
+
ESCENARIO NORMAL O DE RECUPERACION
+
EVIDENCIA DEL FORMULARIO GLOBAL
+
GATE DE ERROR CRITICO
=
DECISION POR PANTALLA
```

Cada superficie conserva su identidad, `app_code` y clase aprobada. Esta tarea define el criterio; `AUTH-UI-058` produce la evidencia, `AUTH-UI-059` gestiona hallazgos y `AUTH-UI-060` toma la decisión final.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- una decisión de aplicabilidad para las diez aplicaciones de la rectificación;
- cobertura explícita de las 177 superficies `VSCREEN-0001..0177`;
- cinco perfiles de criterio derivados de las cinco clases de reducción aprobadas en 054;
- ocho dimensiones globales de medición;
- umbrales observables para localización, comprensión, recuperación, ayuda, carga cognitiva, seguridad/privacidad y accesibilidad;
- catálogo cerrado de ocho errores críticos;
- cuatro estados de decisión por superficie;
- un esquema global único de registro de evidencia, sin formularios separados por rol;
- mapeo de campos a reglas de decisión;
- esquema de problemas para `AUTH-UI-059`;
- esquema agregado de resultados para `AUTH-UI-058`;
- preservación del instrumento NEXO como antecedente específico, no como única fuente global.

##### 2.2. Excluido

- ejecutar sesiones o reclutar participantes;
- registrar tiempos, éxitos, dificultades o errores como observados si no fueron ejecutados;
- modificar prototipos, pantallas, rutas, roles, permisos, procesos o datos;
- conectar Supabase;
- definir un tamaño de muestra no aprobado por otra fuente;
- usar el tiempo bruto como gate sin un umbral específico aprobado;
- corregir problemas reales, reservado a `AUTH-UI-059`;
- aprobar pantallas finales, reservado a `AUTH-UI-060`;
- crear superficies para TALENTO, VITAL o AURA;
- crear requisitos de prueba nuevos.

---

#### 3. Entradas preservadas

La tarea consume sin reabrir:

- `AUTH-UI-052 — Diseñar página inicial según actor`;
- `AUTH-UI-053 — Diseñar navegación según tareas frecuentes`;
- `AUTH-UI-054 — Reducir opciones irrelevantes`;
- `AUTH-UI-055 — Crear prototipo por rol`;
- `AUTH-UI-056 — Validar prototipo antes de implementar`;
- `SCREEN-CANONICAL-CATALOG-001`;
- las 177 decisiones de reducción de 054;
- las nueve suites, 29 perfiles y 58 variantes del paquete 055;
- el gate interno conforme de 056;
- las ocho dimensiones y reglas de medición heredadas de la evidencia NEXO cuando son generalizables.

No se extrapolan resultados humanos NEXO a otras aplicaciones.

---

#### 4. Resultado material

Se materializan ocho artefactos documentales:

1. `APPLICATION-SINGLE-FORM-USABILITY-CRITERIA-CONTRACT-001`;
2. `APPLICATION-USABILITY-DIMENSION-CATALOG-001`;
3. `APPLICATION-USABILITY-CRITERION-PROFILES-001`;
4. `APPLICATION-SCREEN-CRITERIA-CATALOG-001`;
5. `APPLICATION-SCREEN-DECISION-RULES-001`;
6. `APPLICATION-CRITICAL-ERROR-CATALOG-001`;
7. `APPLICATION-PROBLEM-ROUTING-AND-SESSION-SCHEMA-001`;
8. `APPLICATION-USABILITY-CRITERIA-HANDOFF-001`.

Cobertura:

| Elemento | Esperado | Materializado | Faltantes | Duplicados |
| --- | ---: | ---: | ---: | ---: |
| decisiones de rectificación | 10 | 10 | 0 | 0 |
| superficies con criterio | 177 | 177 | 0 | 0 |
| clases heredadas de reducción | 5 | 5 | 0 | 0 |
| perfiles de criterio | 5 | 5 | 0 | 0 |
| dimensiones globales | 8 | 8 | 0 | 0 |
| errores críticos | 8 | 8 | 0 | 0 |
| estados de decisión | 4 | 4 | 0 | 0 |
| campos del registro global | 24 | 24 | 0 | 0 |
| requisitos de prueba nuevos o modificados | 0 | 0 | 0 | 0 |

---

#### 5. Cobertura de aplicaciones

| Aplicación de rectificación | Decisión | Superficies | Cobertura |
| --- | --- | --- | --- |
| ANIMA | APLICA | 14 | `VSCREEN-0027..0032`; `VSCREEN-0124..0131` |
| FOGO | APLICA | 15 | `VSCREEN-0055..0067`; `VSCREEN-0173..0174` |
| NEXO | APLICA | 37 | `VSCREEN-0033..0054`; `VSCREEN-0132..0144`; `VSCREEN-0176..0177` |
| NUMERA | APLICA | 20 | `VSCREEN-0094..0106`; `VSCREEN-0153..0159` |
| ORIGO | APLICA | 14 | `VSCREEN-0068..0079`; `VSCREEN-0145..0146` |
| PASS | APLICA | 19 | `VSCREEN-0107..0112`; `VSCREEN-0160..0172` |
| PULSO | APLICA | 20 | `VSCREEN-0080..0093`; `VSCREEN-0147..0152` |
| TALENTO | NO_APLICA | 0 | sin `app_code` canónico de pantallas |
| VISO | APLICA | 31 | `VSCREEN-0007..0026`; `VSCREEN-0113..0123` |
| VITAL | NO_APLICA | 0 | fuera de Vento OS |

Cobertura adicional del inventario real:

| Soporte transversal | Estado | Superficies | Regla |
| --- | --- | ---: | --- |
| SHELL | `APLICA_COMO_SOPORTE` | 7 | conserva criterios para `VSCREEN-0001..0006` y `VSCREEN-0175` sin convertirse en una undécima aplicación de la rectificación |
| AURA | `NO_APLICA` | 0 | no se inventan superficies ni criterios sin `VSCREEN-*` |

Reconciliación:

```text
RECTIFICATION_APPLICABLE_VSCREEN = 170
SHELL_SUPPORT_VSCREEN = 7
TOTAL_CRITERIA_VSCREEN = 177
MISSING = 0
DUPLICATES = 0
```

---

#### 6. `APPLICATION-USABILITY-DIMENSION-CATALOG-001`

| ID | Dimensión | Evidencia | Umbral |
| --- | --- | --- | --- |
| `USAB-DIM-01` | localización | primera acción, tiempo y aperturas incorrectas | acción o navegación correcta; máximo una apertura incorrecta |
| `USAB-DIM-02` | comprensión de contexto | actor, función, sede/área, dispositivo o relación aplicable | correcto o parcial sin confusión crítica |
| `USAB-DIM-03` | comprensión de efecto | respuesta sobre qué ocurriría al actuar | correcta para toda acción sensible |
| `USAB-DIM-04` | recuperación | conducta ante cambio, retiro, parcialidad, conflicto o fallo | sin pérdida, duplicación, bypass ni falso éxito |
| `USAB-DIM-05` | ayuda | ayuda del moderador y motivo | no necesaria para reconocer contexto básico o acción principal |
| `USAB-DIM-06` | carga cognitiva | dificultad de 1 a 7 y observación | mediana objetivo <= 3 cuando exista pluralidad de sesiones válidas |
| `USAB-DIM-07` | seguridad y privacidad | error crítico y clase | tolerancia cero |
| `USAB-DIM-08` | tacto y accesibilidad observable | foco, lectura, toque, medio de entrada y bloqueos | cero bloqueo del camino crítico |

El umbral de dificultad se interpreta únicamente cuando exista más de una sesión válida para una misma unidad de decisión. Una sola observación no se presenta como mediana representativa.

El tiempo hasta la acción se registra para comparación y diagnóstico. Esta tarea no inventa un umbral temporal universal porque las superficies tienen complejidades distintas y no existe una decisión canónica que autorice un único límite en segundos.

---

#### 7. `APPLICATION-USABILITY-CRITERION-PROFILES-001`

| Perfil | Clase heredada 054 | Criterio principal | Umbral general | Recuperación | Gate crítico |
| --- | --- | --- | --- | --- | --- |
| `USAB-PROFILE-ENTRY-001` | `ENTRY_RETURN` | identificar la entrada o retorno correcto y reconocer el contexto activo sin duplicar la superficie dentro de la proyección | acción o retorno correcto; máximo una apertura incorrecta; contexto correcto o parcial sin confusión crítica; dificultad mediana objetivo <= 3 cuando exista pluralidad de sesiones | si el contexto deja de ser válido, retirar el destino incompatible y volver a resolución segura | 0 errores críticos aplicables |
| `USAB-PROFILE-CONTEXTUAL-001` | `CONTEXTUAL_ONLY` | usar la superficie únicamente desde el disparador o tarea propietaria y comprender su efecto contextual | acceso solo desde contexto válido; cero descubrimiento global indebido; efecto comprendido cuando sea sensible; dificultad mediana objetivo <= 3 cuando exista pluralidad de sesiones | ante pérdida de contexto, regresar al origen seguro sin conservar una acción ya inválida | 0 errores críticos aplicables |
| `USAB-PROFILE-WORK-001` | `WORK_ELIGIBLE` | localizar y ejecutar conceptualmente la tarea elegible correcta sin confundir función, actor, estado o efecto | acción correcta; máximo una apertura incorrecta; sin ayuda para contexto básico; efecto correcto en acciones sensibles; dificultad mediana objetivo <= 3 cuando exista pluralidad de sesiones | si trabajo, asignación o estado cambian, retirar el control obsoleto y recalcular la proyección sin repetir efectos | 0 errores críticos aplicables |
| `USAB-PROFILE-CONDITIONAL-001` | `CONDITIONAL_WORK` | reconocer la condición que habilita la superficie y actuar solo cuando el caso, excepción, revisión o bloqueo existe | condición comprendida; cero acción cuando la condición no aplica; máximo una apertura incorrecta cuando sí aplica; dificultad mediana objetivo <= 3 cuando exista pluralidad de sesiones | si la condición desaparece o la evidencia queda insuficiente, bloquear la decisión y conservar salida segura | 0 errores críticos aplicables |
| `USAB-PROFILE-SECONDARY-001` | `SECONDARY_DISCOVERABLE` | encontrar la capacidad dentro de una familia o descubrimiento secundario sin convertirla en opción primaria irrelevante | localización correcta dentro de la familia; máximo una apertura incorrecta; sin ayuda para contexto básico; dificultad mediana objetivo <= 3 cuando exista pluralidad de sesiones | si función o alcance dejan de aplicar, excluir la opción en vez de revelarla deshabilitada | 0 errores críticos aplicables |

Reglas comunes a los cinco perfiles:

1. cualquier error crítico aplicable prevalece sobre promedios o medianas;
2. una pantalla sin evidencia suficiente permanece `PENDIENTE_DE_EVIDENCIA`;
3. el criterio se evalúa sobre la tarea o comportamiento esperado, no sobre preferencia estética;
4. el formulario global identifica `screen_id`; no se crea un formulario por superficie;
5. una recuperación solo se evalúa cuando el escenario correspondiente exista en el prototipo o sesión;
6. la ausencia de una capacidad no autorizada no cuenta como fracaso de localización;
7. una opción correctamente excluida por 054 no debe reaparecer para “facilitar” la prueba.

---

#### 8. `APPLICATION-SCREEN-CRITERIA-CATALOG-001`

Cada superficie aparece exactamente una vez. La columna `Estado inicial` representa el estado previo a `AUTH-UI-058`, no un resultado de usabilidad.

| Pantalla | `app_code` | Clase 054 | Perfil de criterio | Gate crítico | Estado inicial |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0001` | `shell` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0002` | `shell` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0003` | `shell` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0004` | `shell` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0005` | `shell` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0006` | `shell` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0007` | `viso` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0008` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0009` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0010` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0011` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0012` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0013` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0014` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0015` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0016` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0017` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0018` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0019` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0020` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0021` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0022` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0023` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0024` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0025` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0026` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0027` | `anima` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0028` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0029` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0030` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0031` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0032` | `anima` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0033` | `nexo` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0034` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0035` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0036` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0037` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0038` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0039` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0040` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0041` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0042` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0043` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0044` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0045` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0046` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0047` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0048` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0049` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0050` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0051` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0052` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0053` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0054` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0055` | `fogo` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0056` | `fogo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0057` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0058` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0059` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0060` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0061` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0062` | `fogo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0063` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0064` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0065` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0066` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0067` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0068` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0069` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0070` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0071` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0072` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0073` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0074` | `origo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0075` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0076` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0077` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0078` | `origo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0079` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0080` | `pulso` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0081` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0082` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0083` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0084` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0085` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0086` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0087` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0088` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0089` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0090` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0091` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0092` | `pulso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0093` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0094` | `numera` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0095` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0096` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0097` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0098` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0099` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0100` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0101` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0102` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0103` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0104` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0105` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0106` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0107` | `pass` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0108` | `pass` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0109` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0110` | `pass` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0111` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0112` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0113` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0114` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0115` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0116` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0117` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0118` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0119` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0120` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0121` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0122` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0123` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0124` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0125` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0126` | `anima` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0127` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0128` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0129` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0130` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0131` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0132` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0133` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0134` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0135` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0136` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0137` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0138` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0139` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0140` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0141` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0142` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0143` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0144` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0145` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0146` | `origo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0147` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0148` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0149` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0150` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0151` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0152` | `pulso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0153` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0154` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0155` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0156` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0157` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0158` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0159` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0160` | `pass` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0161` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0162` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0163` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0164` | `pass` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0165` | `pass` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0166` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0167` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0168` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0169` | `pass` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0170` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0171` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0172` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0173` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0174` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0175` | `shell` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0176` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |
| `VSCREEN-0177` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | 0 errores críticos aplicables | `PENDIENTE_DE_EVIDENCIA` |

Reconciliación por clase:

| Clase | Esperado | Materializado |
| --- | ---: | ---: |
| `WORK_ELIGIBLE` | 75 | 75 |
| `SECONDARY_DISCOVERABLE` | 48 | 48 |
| `CONDITIONAL_WORK` | 39 | 39 |
| `ENTRY_RETURN` | 9 | 9 |
| `CONTEXTUAL_ONLY` | 6 | 6 |
| **Total** | **177** | **177** |

---

#### 9. `APPLICATION-SINGLE-FORM-USABILITY-CRITERIA-CONTRACT-001`

Todas las superficies usan un único shape lógico de recolección. El formulario o instrumento físico puede cambiar de soporte, pero los campos de evidencia no se fragmentan por rol o aplicación.

| Campo | Uso |
| --- | --- |
| `session_id` | identidad técnica de sesión, sin dato personal directo |
| `participant_code` | código pseudónimo del participante |
| `app_code` | aplicación o soporte transversal evaluado |
| `screen_id` | `VSCREEN-*` evaluada |
| `prototype_id` | perfil/prototipo usado |
| `function_tested` | función, relación o contexto probado |
| `device_mode` | móvil, tablet, escritorio o estación compartida simulada |
| `scenario_variant` | normal o recuperación |
| `reduction_class` | clase heredada de 054 |
| `criterion_profile_id` | perfil de criterio aplicable |
| `found_correct_action` | si localizó la acción, retorno o capacidad esperada |
| `time_to_action_seconds` | tiempo observado hasta la acción o decisión objetivo |
| `wrong_openings` | aperturas incorrectas previas |
| `moderator_help` | si necesitó ayuda y motivo |
| `context_understanding` | comprensión de actor, función, alcance, dispositivo o relación |
| `effect_understanding` | comprensión del efecto de una acción sensible |
| `recovery_behavior` | conducta frente a cambio, retiro, parcialidad, conflicto o fallo |
| `critical_error` | sí/no |
| `critical_error_class` | `USAB-CRIT-*` cuando aplique |
| `difficulty_1_to_7` | dificultad subjetiva |
| `accessibility_blocker` | bloqueo observable del camino crítico |
| `participant_comment` | comentario del participante |
| `observer_notes` | evidencia cualitativa del observador |
| `proposed_issue_id` | vínculo propuesto con `AUTH-UI-059` |

Reglas de datos:

- `participant_code` no contiene nombre, documento, correo ni teléfono;
- los prototipos y sesiones usan datos ficticios o minimizados;
- `screen_id`, `app_code`, `criterion_profile_id` y variante deben quedar presentes en cada registro válido;
- `critical_error_class` se usa solo cuando existe error crítico;
- `proposed_issue_id` es trazabilidad hacia 059 y no crea por sí mismo un problema aprobado.

---

#### 10. Mapeo de scoring y decisión

| Campo | Dimensión | Regla |
| --- | --- | --- |
| `found_correct_action` | localización/éxito | `no` => `REQUIERE_AJUSTE` o `BLOQUEADA` según la causa |
| `wrong_openings` | fricción | más de una => `REQUIERE_AJUSTE`, salvo que revele error crítico |
| `moderator_help` | autonomía | ayuda para contexto básico o acción principal => `REQUIERE_AJUSTE` o `BLOQUEADA` si encubre error crítico |
| `context_understanding` | contexto/autoridad | confusión crítica de actor, función, alcance o dispositivo => `BLOQUEADA` |
| `effect_understanding` | seguridad | comprensión incorrecta en acción sensible => `BLOQUEADA` |
| `recovery_behavior` | recuperación | pérdida, duplicación, bypass o falso éxito => `BLOQUEADA` |
| `critical_error` | seguridad/privacidad/custodia | cualquier `sí` => `BLOQUEADA` |
| `difficulty_1_to_7` | carga cognitiva | mediana > 3 cuando exista pluralidad de sesiones => `REQUIERE_AJUSTE` |
| `accessibility_blocker` | accesibilidad observable | bloqueo del camino crítico => `BLOQUEADA` |
| `time_to_action_seconds` | esfuerzo | se registra para comparación/diagnóstico; no bloquea por sí solo sin umbral específico aprobado |
| `participant_comment` | diagnóstico | no decide por sí solo |
| `observer_notes` | diagnóstico | sustenta clasificación en `AUTH-UI-059` |

No se usa un promedio agregado para neutralizar una violación crítica. Una superficie con un solo error crítico aplicable permanece bloqueada hasta corrección y retest suficiente.

---

#### 11. `APPLICATION-CRITICAL-ERROR-CATALOG-001`

| ID | Error crítico | Definición | Efecto |
| --- | --- | --- | --- |
| `USAB-CRIT-01` | mezcla de función o autoridad | la persona intenta o interpreta trabajo reservado a otra función/autoridad | `BLOQUEADA` |
| `USAB-CRIT-02` | dato de otro actor o alcance | se revela o interpreta como propio trabajo/dato fuera del actor, relación, sede, área o alcance | `BLOQUEADA` |
| `USAB-CRIT-03` | acción prohibida | la interfaz induce aprobación, ajuste, recepción, pago, configuración u otra acción sin autoridad | `BLOQUEADA` |
| `USAB-CRIT-04` | falso éxito | la persona cree que un efecto quedó confirmado sin confirmación suficiente | `BLOQUEADA` |
| `USAB-CRIT-05` | doble efecto | la recuperación induce repetir una acción cuyo resultado previo es desconocido | `BLOQUEADA` |
| `USAB-CRIT-06` | pérdida de custodia o responsabilidad | la superficie impide identificar quién conserva responsabilidad material u operacional | `BLOQUEADA` |
| `USAB-CRIT-07` | bloqueo accesible crítico | el medio usado no permite llegar, comprender o activar el control crítico aplicable | `BLOQUEADA` |
| `USAB-CRIT-08` | persistencia entre actores | un dispositivo compartido conserva datos, recientes u opciones del actor anterior | `BLOQUEADA` |

Regla de tolerancia:

```text
CRITICAL_ERROR_COUNT > 0
→
BLOQUEADA
```

La severidad exacta y el tratamiento del hallazgo se registran en `AUTH-UI-059`. La existencia del error ya impide considerar la superficie conforme.

---

#### 12. `APPLICATION-SCREEN-DECISION-RULES-001`

| Decisión | Condición |
| --- | --- |
| `CONFORME_PARA_CIERRE` | evidencia suficiente; criterio principal satisfecho; recuperación correcta cuando aplique; cero error crítico; dificultad dentro del umbral aplicable |
| `REQUIERE_AJUSTE` | fricción, confusión o dificultad no crítica que exige corrección y retest antes de cierre |
| `BLOQUEADA` | al menos un error crítico aplicable o un incumplimiento que impide uso seguro |
| `PENDIENTE_DE_EVIDENCIA` | la superficie no fue probada, la muestra no permite evaluar el criterio aplicable o falta evidencia de una variante requerida |

Orden de precedencia:

```text
ERROR CRITICO
>
EVIDENCIA SUFICIENTE
>
CRITERIO PRINCIPAL DEL PERFIL
>
RECUPERACION CUANDO APLICA
>
AYUDA / APERTURAS INCORRECTAS
>
DIFICULTAD
>
TIEMPO COMO DIAGNOSTICO
```

Una pantalla no puede pasar de `PENDIENTE_DE_EVIDENCIA` a `CONFORME_PARA_CIERRE` por inferencia documental.

---

#### 13. `APPLICATION-PROBLEM-ROUTING-AND-SESSION-SCHEMA-001`

Todo problema que surja en 058 y requiera corrección se enruta a 059 con:

| Campo obligatorio de problema | Propósito |
| --- | --- |
| `issue_id` | identidad estable del hallazgo |
| `screen_id` | superficie afectada |
| `app_code` | aplicación |
| `prototype_id` | perfil usado |
| `function_tested` | función/contexto |
| `device_mode` | medio de interacción |
| `scenario_variant` | normal/recuperación |
| `criterion_failed` | dimensión o perfil incumplido |
| `critical_error_class` | clase crítica cuando aplique |
| `severity` | severidad a registrar en 059 |
| `evidence_reference` | sesión/registro que demuestra el hallazgo |
| `owner` | responsable de corrección |
| `required_correction` | resultado esperado de la corrección |
| `retest_condition` | evidencia necesaria para cerrar |

Resumen agregado mínimo de 058:

| Campo agregado | Descripción |
| --- | --- |
| `tested_screens` | superficies ejecutadas con evidencia válida |
| `participants_count` | participantes codificados |
| `sessions_count` | registros válidos |
| `screens_conformant` | superficies que cumplen criterios con evidencia suficiente |
| `screens_requiring_adjustment` | superficies con fricción no crítica |
| `screens_blocked` | superficies con error crítico o bloqueo |
| `screens_pending_evidence` | superficies todavía no evaluables |
| `issues_to_register` | problemas que pasan a `AUTH-UI-059` |
| `screens_ready_for_auth_ui_060` | candidatas a decisión final |

La salida agregada nunca sustituye la evidencia por pantalla. `AUTH-UI-060` decide con trazabilidad hacia registros válidos y problemas cerrados.

---

#### 14. Preservación del perfil histórico NEXO

Las dieciséis vistas históricas, ocho contextos y el cuestionario `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001` permanecen como antecedente específico.

Mapeo:

```text
NEXO SCREEN-055-* / PROTO-NEXO-*
→
VSCREEN NEXO Y PERFIL GLOBAL APLICABLE
→
MISMAS 8 DIMENSIONES GLOBALIZADAS
→
MISMO GATE DE ERROR CRITICO
```

No se asume que una pantalla NEXO probada represente otra aplicación. No se crean formularios separados para NEXO salvo que una tarea posterior documente una necesidad específica.

---

#### 15. Hallazgos y pendientes transferidos

| Hallazgo | Qué falta | Bloquea 057 | Propietario | Condición exacta de salida |
| --- | --- | --- | --- | --- |
| `PRETEST-057-001` | evidencia humana por pantalla y escenario aplicable | no | `AUTH-UI-058` | ejecutar sesiones y producir registros válidos con `screen_id`, criterio y variante |
| `PRETEST-057-002` | problemas reales derivados de criterios fallidos | no | `AUTH-UI-059` | cada hallazgo tenga severidad, evidencia, owner, corrección y retest |
| `PRETEST-057-003` | decisión final por superficie | no | `AUTH-UI-060` | evidencia suficiente, cero error crítico abierto y problemas requeridos cerrados |

No quedan pendientes narrativos sin propietario.

---

#### 16. `APPLICATION-USABILITY-CRITERIA-HANDOFF-001`

`AUTH-UI-058` recibe exactamente:

```text
177 SCREEN_ID
+
5 PERFILES DE CRITERIO
+
8 DIMENSIONES
+
24 CAMPOS DE REGISTRO
+
8 ERRORES CRITICOS
+
4 ESTADOS DE DECISION
+
REGLAS DE SCORING
+
29 PERFILES / 58 VARIANTES DE PROTOTIPO
```

Handoff:

| Destino | Responsabilidad |
| --- | --- |
| `AUTH-UI-058` | ejecutar sesiones reales y poblar evidencia sin inventar resultados |
| `AUTH-UI-059` | registrar, asignar, corregir y retestar problemas |
| `AUTH-UI-060` | decidir aprobación final por pantalla con evidencia suficiente |

---

#### 17. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: la tarea define la metodología documental de medición y decisión para superficies ya existentes. No introduce comportamiento ejecutable, autorización, regla de negocio, integración, dato persistente, ruta, pantalla canónica ni efecto empresarial nuevo; tampoco crea, modifica, difiere, descarta o declara obsoleto ningún requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 18. Cobertura de prueba vigente reutilizada

Se reutilizan sin modificación los requisitos existentes que cubren autorización, actor/función/contexto, navegación, reducción de opciones, dispositivo compartido, privacidad, masking, recuperación, accesibilidad, estados críticos y contratos específicos de cada aplicación.

Esta sección es trazabilidad heredada y no altera 04A.

---

#### 19. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout después del cierre de 056 y la incorporación de este artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, BLOQUE I, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron la identidad y alcance canónicos de 057, el bloque propietario, la rectificación 052..060, la topología `DEFINE_ONCE`, `NO_PHYSICAL_INSTANCE`, `package.json`, preflight, formatter, quality, delivery, lifecycle y validadores aplicables; la base 056 proviene de su versión completa aprobada mientras su publicación remota permanece pendiente. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron sesiones, tiempos, observaciones, participantes ni resultados de usabilidad. |
| FÍSICA | NOT_APPLICABLE | La tarea no crea instancia física propia ni modifica código, datos, Supabase o despliegues. |

---

#### 20. Criterios de aceptación

La tarea queda documentalmente completa cuando se confirma que:

- [ ] existen exactamente diez decisiones de la rectificación, con ocho `APLICA` y dos `NO_APLICA`;
- [ ] SHELL conserva siete superficies de soporte sin alterar la matriz de diez aplicaciones;
- [ ] AURA conserva cero superficies;
- [ ] las 177 `VSCREEN-*` aparecen exactamente una vez;
- [ ] cada superficie conserva `app_code` y clase heredados;
- [ ] existen cinco perfiles de criterio, uno por clase de reducción;
- [ ] la distribución es 75/48/39/9/6 y suma 177;
- [ ] existen ocho dimensiones globales;
- [ ] existen veinticuatro campos de registro global;
- [ ] existen ocho errores críticos y todos tienen tolerancia cero;
- [ ] existen cuatro estados de decisión por pantalla;
- [ ] cada superficie inicia `PENDIENTE_DE_EVIDENCIA`;
- [ ] el tiempo no recibe un umbral universal inventado;
- [ ] la dificultad usa mediana objetivo solo cuando exista pluralidad de sesiones válidas;
- [ ] ninguna media o mediana puede neutralizar un error crítico;
- [ ] NEXO queda preservado como perfil específico y no como sustituto global;
- [ ] los problemas se enrutan a 059 con evidencia, owner y retest;
- [ ] la aprobación final permanece en 060;
- [ ] no se ejecutan usuarios ni se inventan resultados;
- [ ] no se crean o modifican requisitos de prueba;
- [ ] `AUTH-UI-058` permanece únicamente reservada.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-056 — Validar prototipo antes de implementar`

**TAREA ACTUAL APROBADA**
`AUTH-UI-057 — Definir criterio de usabilidad por pantalla`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-058 — Probar con usuarios reales`

### ✅ AUTH-UI-058 — Probar con usuarios reales

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-057 — Definir criterio de usabilidad por pantalla
**Tarea siguiente:** AUTH-UI-059 — Registrar problemas encontrados
**Tipo de tarea:** documental-operativa; definición del método canónico de prueba con usuarios reales y del gate operativo posterior basado exclusivamente en evidencia real
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; documentar el método no modifica código, rutas, componentes, roles, permisos, procesos, datos, Supabase, migraciones, RLS, telemetría, configuración ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el método canónico mediante el cual Vento OS ejecutará posteriormente pruebas con usuarios reales sobre las 177 superficies gobernadas por `AUTH-UI-057`, y crear un gate operativo que solo podrá resolverse después de que existan sesiones reales y evidencia reconciliada.

```text
CIERRE DOCUMENTAL DE AUTH-UI-058
=
METODO + MATRIZ + FORMULARIO + GATE DEFINIDOS

EJECUCION POSTERIOR
=
SESIONES REALES

AUTH-UI-058-USER-TEST-GATE-001
=
DECISION BASADA EXCLUSIVAMENTE EN EVIDENCIA REAL
```

Por tanto:

```text
AUTH-UI-058 DOCUMENTAL APROBADA != PRUEBAS EJECUTADAS
GATE PENDING_EVIDENCE != GATE PASS
BUILD / INSPECCION / PROTOTIPO != SESION DE USUARIO
```

El cierre documental aprueba el método. No inventa participantes, tiempos, resultados ni problemas.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- universo explícito de 177 superficies;
- cinco packs de prueba derivados de 057;
- 29 perfiles de participación;
- protocolo único de sesión;
- reglas de representación por actor, función y aplicación;
- reglas por dispositivo y escenario;
- formulario lógico único de 27 campos;
- política de moderación;
- privacidad, saneamiento y evidencia;
- contrato `AUTH-UI-058-USER-TEST-GATE-001`;
- condiciones de PASS, FAIL y `PENDING_EVIDENCE`;
- handoff de hallazgos hacia `AUTH-UI-059`.

##### 2.2. Excluido

- afirmar que una sesión ya ocurrió;
- inventar participantes, tiempos o tasas de éxito;
- completar una superficie por asociación con otra;
- usar build, revisión heurística o validación interna como evidencia humana;
- cambiar prototipos durante una sesión sin registrar versión;
- corregir silenciosamente un problema encontrado;
- implementar código o Supabase;
- cerrar hallazgos de 059;
- aprobar finalmente una superficie, reservado a 060.

---

#### 3. Entrada canónica consumida

La tarea consume íntegramente `AUTH-UI-057`, incluida su matriz de 177 superficies, cinco perfiles de criterio, ocho dimensiones, ocho errores críticos y cuatro estados de decisión.

```text
AUTH_UI_057_SHA256 = fd430416790ac17631227207bab48fa7abe09aed9f96d443e58b71b28998c36b
VSCREEN_COUNT = 177
```

No se reabre la clasificación de 057.

---

#### 4. Resultado material

Se materializan siete contratos documentales:

1. `APPLICATION-REAL-USER-TEST-METHOD-001`;
2. `APPLICATION-REAL-USER-PARTICIPANT-COVERAGE-001`;
3. `APPLICATION-REAL-USER-SCENARIO-PACKS-001`;
4. `APPLICATION-REAL-USER-SESSION-RECORD-001`;
5. `APPLICATION-REAL-USER-SCREEN-EXECUTION-REGISTER-001`;
6. `AUTH-UI-058-USER-TEST-GATE-001`;
7. `APPLICATION-REAL-USER-TEST-HANDOFF-001`.

Estado al aprobar el documento:

```text
METHOD_STATUS = APPROVED
SESSION_EXECUTION_STATUS = NOT_EXECUTED
USER_TEST_GATE_STATUS = PENDING_EVIDENCE
AUTH_UI_059_OPERATIONAL_CONSUMPTION = BLOCKED_UNTIL_GATE_PASS
```

---

#### 5. `APPLICATION-REAL-USER-TEST-METHOD-001`

##### 5.1. Unidad de evidencia

```text
screen_id
+
participant_profile_id
+
criterion_profile_id
+
scenario_state
+
device_mode
+
prototype_version
+
session_id
```

No se mezclan observaciones de superficies, funciones o versiones distintas para fabricar suficiencia.

##### 5.2. Orden de sesión

1. confirmar perfil y contexto;
2. asignar `participant_code` pseudónimo;
3. seleccionar versión exacta;
4. preparar solo fixtures, entorno o datos autorizados;
5. presentar consigna breve orientada al objetivo, no a los pasos;
6. observar primera acción sin dirigir;
7. registrar aperturas incorrectas y ayuda;
8. comprobar comprensión de contexto;
9. comprobar comprensión del efecto cuando corresponda;
10. ejecutar estados adicionales aplicables;
11. ejecutar recuperación cuando corresponda;
12. registrar error crítico si aparece;
13. registrar dificultad;
14. registrar observaciones y comentario;
15. sanear y vincular evidencia;
16. proponer vínculo a 059 si existe hallazgo.

##### 5.3. Moderación

El moderador:

- no revela el control antes de la primera acción;
- no corrige sin registrar ayuda;
- no convierte explicación en éxito;
- detiene cualquier efecto real no autorizado;
- distingue fricción de ausencia legítima de autoridad;
- registra cambios de versión o contexto;
- no recolecta datos personales innecesarios.

---

#### 6. Cobertura de participantes

| Perfil | Aplicación | Actor / función / contexto |
| --- | --- | --- |
| `PART-SHELL-001` | SHELL | persona autenticada en hub |
| `PART-SHELL-002` | SHELL | persona resolviendo acceso o sesión |
| `PART-SHELL-003` | SHELL | actor en dispositivo compartido |
| `PART-ANIMA-001` | ANIMA | trabajador en experiencia personal |
| `PART-ANIMA-002` | ANIMA | supervisor puntual autorizado |
| `PART-VISO-001` | VISO | dirección o gerencia |
| `PART-VISO-002` | VISO | administrador o configurador |
| `PART-VISO-003` | VISO | auditor, cumplimiento o soporte |
| `PART-NEXO-001` | NEXO | solicitante autorizado |
| `PART-NEXO-002` | NEXO | bodega o preparación |
| `PART-NEXO-003` | NEXO | conductor o custodio |
| `PART-NEXO-004` | NEXO | receptor autorizado |
| `PART-NEXO-005` | NEXO | supervisor territorial |
| `PART-NEXO-006` | NEXO | configurador autorizado |
| `PART-NEXO-007` | NEXO | persona multifunción |
| `PART-NEXO-008` | NEXO | dispositivo compartido con actor activo |
| `PART-FOGO-001` | FOGO | operador de producción |
| `PART-FOGO-002` | FOGO | supervisor o calidad |
| `PART-FOGO-003` | FOGO | planeación o gobierno de receta |
| `PART-ORIGO-001` | ORIGO | solicitante o comprador |
| `PART-ORIGO-002` | ORIGO | aprobador |
| `PART-ORIGO-003` | ORIGO | recepción o conciliación |
| `PART-PULSO-001` | PULSO | caja o terminal operativo |
| `PART-PULSO-002` | PULSO | servicio o gestión de pedido |
| `PART-PULSO-003` | PULSO | manager o administración comercial |
| `PART-NUMERA-001` | NUMERA | operación financiera |
| `PART-NUMERA-002` | NUMERA | aprobación o tesorería |
| `PART-NUMERA-003` | NUMERA | análisis o auditoría |
| `PART-PASS-001` | PASS | cliente |

Reglas:

1. una persona puede cubrir más de un perfil solo si realmente puede asumir cada función/contexto y cada observación queda separada;
2. persona multifunción no equivale a unión simultánea de permisos;
3. dispositivo compartido exige cambio de actor cuando corresponda;
4. cliente PASS no se sustituye por operador interno;
5. no se inventa un número universal de participantes;
6. cada superficie aplicable debe obtener evidencia suficiente para sus criterios.

---

#### 7. Packs de escenarios

| Pack | Clase 057 | Estados/escenarios cuando apliquen | Objetivo |
| --- | --- | --- | --- |
| `USERTEST-PACK-ENTRY-001` | `ENTRY_RETURN` | NORMAL; LOADING cuando aplique; EMPTY cuando no exista destino elegible; DENIED; EXPIRATION; REVOCATION; RECOVERY | reconocer entrada/retorno válido y contexto activo sin usar destino obsoleto o no autorizado |
| `USERTEST-PACK-CONTEXTUAL-001` | `CONTEXTUAL_ONLY` | NORMAL; LOADING cuando aplique; EMPTY/CONTEXT_ABSENT; DENIED; RECOVERABLE_ERROR; EXPIRATION; REVOCATION; RECOVERY | usar la superficie solo desde su contexto propietario y recuperar de forma segura cuando desaparece |
| `USERTEST-PACK-WORK-001` | `WORK_ELIGIBLE` | NORMAL; EMPTY; LOADING; DENIED; RECOVERABLE_ERROR; EXPIRATION; REVOCATION; RECOVERY | localizar y comprender el trabajo elegible, ejecutar conceptualmente la tarea y recuperar sin efecto duplicado |
| `USERTEST-PACK-CONDITIONAL-001` | `CONDITIONAL_WORK` | NORMAL; CONDITION_ABSENT; LOADING; DENIED; RECOVERABLE_ERROR; EXPIRATION; REVOCATION; RECOVERY | reconocer la condición habilitante y evitar actuar cuando ya no aplica |
| `USERTEST-PACK-SECONDARY-001` | `SECONDARY_DISCOVERABLE` | NORMAL; FAMILY_ABSENT/EMPTY; DENIED ante acceso directo; RECOVERABLE_ERROR cuando aplique; REVOCATION; RECOVERY | encontrar la capacidad por descubrimiento secundario sin promover trabajo irrelevante o no autorizado |

Los estados se ejecutan cuando sean aplicables. Un estado no aplicable se registra como `NO_APLICA_REVIEWED` con justificación.

---

#### 8. Dispositivos

Modos posibles:

```text
DESKTOP
MOBILE
TABLET
KIOSK
SHARED_DEVICE
```

Solo se prueban cuando correspondan al contrato real de la superficie.

Reglas:

- no se inventa compatibilidad;
- el modo se resuelve desde la superficie/aplicación/prototipo;
- modos materialmente distintos requieren evidencia separada cuando cambien navegación, contexto, tacto, privacidad o recuperación;
- dispositivo compartido prueba limpieza entre actores cuando aplique.

---

#### 9. `APPLICATION-REAL-USER-SESSION-RECORD-001`

| Campo | Regla de captura |
| --- | --- |
| `session_id` | identidad técnica de sesión |
| `participant_code` | código pseudónimo; no nombre/documento/correo/teléfono |
| `participant_profile_id` | perfil PART-* cubierto |
| `app_code` | aplicación o soporte transversal |
| `screen_id` | VSCREEN evaluada |
| `criterion_profile_id` | perfil de criterio de 057 |
| `scenario_pack_id` | pack aplicable |
| `scenario_state` | normal, vacío, carga, denegación, error, expiración, revocación o recuperación según aplique |
| `device_mode` | escritorio, móvil, tableta, quiosco o compartido cuando corresponda |
| `prototype_version` | versión exacta usada |
| `started_at` | inicio de sesión |
| `duration_seconds` | duración observada |
| `result` | resultado del escenario |
| `found_correct_action` | localización correcta |
| `wrong_openings` | aperturas incorrectas |
| `moderator_help` | ayuda requerida y motivo |
| `context_understanding` | comprensión de actor/función/alcance/dispositivo |
| `effect_understanding` | comprensión del efecto cuando la acción es sensible |
| `recovery_behavior` | respuesta ante cambio/fallo/retirada/parcialidad |
| `critical_error` | sí/no |
| `critical_error_class` | clase crítica de 057 cuando aplique |
| `difficulty_1_to_7` | dificultad reportada |
| `accessibility_blocker` | bloqueo observable del camino crítico |
| `participant_comment` | comentario del participante |
| `observer_notes` | observación del moderador |
| `evidence_reference` | referencia saneada a evidencia |
| `proposed_issue_id` | vínculo propuesto con 059 |

Un registro incompleto no satisface el gate.

---

#### 10. Evidencia y saneamiento

Evidencia admitida:

- notas estructuradas;
- captura o grabación saneada cuando exista autorización;
- referencia de sesión;
- respuestas del participante;
- métricas observadas;
- evidencia del estado mostrado.

No se incluyen secretos, tokens, PIN reales, documentos personales ni datos innecesarios.

---

#### 11. `APPLICATION-REAL-USER-SCREEN-EXECUTION-REGISTER-001`

Cada superficie inicia `PENDING_EVIDENCE`.

| Pantalla | `app_code` | Clase 057 | Perfil criterio | Pack | Actor/dispositivo | Estado inicial | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `VSCREEN-0001` | `shell` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0002` | `shell` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | `USERTEST-PACK-CONTEXTUAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0003` | `shell` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | `USERTEST-PACK-CONTEXTUAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0004` | `shell` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | `USERTEST-PACK-CONTEXTUAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0005` | `shell` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0006` | `shell` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0007` | `viso` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0008` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0009` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0010` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0011` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0012` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0013` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0014` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0015` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0016` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0017` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0018` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0019` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0020` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0021` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0022` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0023` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0024` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0025` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0026` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0027` | `anima` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0028` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0029` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0030` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0031` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0032` | `anima` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0033` | `nexo` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0034` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0035` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0036` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0037` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0038` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0039` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0040` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0041` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0042` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0043` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0044` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0045` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0046` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0047` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0048` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0049` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0050` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0051` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0052` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0053` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0054` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0055` | `fogo` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0056` | `fogo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0057` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0058` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0059` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0060` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0061` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0062` | `fogo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0063` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0064` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0065` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0066` | `fogo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0067` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0068` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0069` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0070` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0071` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0072` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0073` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0074` | `origo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0075` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0076` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0077` | `origo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0078` | `origo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0079` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0080` | `pulso` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0081` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0082` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0083` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0084` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0085` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0086` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0087` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0088` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0089` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0090` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0091` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0092` | `pulso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0093` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0094` | `numera` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0095` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0096` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0097` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0098` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0099` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0100` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0101` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0102` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0103` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0104` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0105` | `numera` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0106` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0107` | `pass` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0108` | `pass` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | `USERTEST-PACK-CONTEXTUAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0109` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0110` | `pass` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | `USERTEST-PACK-CONTEXTUAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0111` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0112` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0113` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0114` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0115` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0116` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0117` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0118` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0119` | `viso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0120` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0121` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0122` | `viso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0123` | `viso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0124` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0125` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0126` | `anima` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0127` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0128` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0129` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0130` | `anima` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0131` | `anima` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0132` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0133` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0134` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0135` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0136` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0137` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0138` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0139` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0140` | `nexo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0141` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0142` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0143` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0144` | `nexo` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0145` | `origo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0146` | `origo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0147` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0148` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0149` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0150` | `pulso` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0151` | `pulso` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0152` | `pulso` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0153` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0154` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0155` | `numera` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0156` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0157` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0158` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0159` | `numera` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0160` | `pass` | `ENTRY_RETURN` | `USAB-PROFILE-ENTRY-001` | `USERTEST-PACK-ENTRY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0161` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0162` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0163` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0164` | `pass` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0165` | `pass` | `CONTEXTUAL_ONLY` | `USAB-PROFILE-CONTEXTUAL-001` | `USERTEST-PACK-CONTEXTUAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0166` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0167` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0168` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0169` | `pass` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0170` | `pass` | `WORK_ELIGIBLE` | `USAB-PROFILE-WORK-001` | `USERTEST-PACK-WORK-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0171` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0172` | `pass` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0173` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0174` | `fogo` | `CONDITIONAL_WORK` | `USAB-PROFILE-CONDITIONAL-001` | `USERTEST-PACK-CONDITIONAL-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0175` | `shell` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0176` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |
| `VSCREEN-0177` | `nexo` | `SECONDARY_DISCOVERABLE` | `USAB-PROFILE-SECONDARY-001` | `USERTEST-PACK-SECONDARY-001` | `RESOLVE_FROM_CANONICAL_SURFACE_CONTEXT` | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` |

Reconciliación:

```text
EXPECTED_VSCREEN = 177
PLANNED_VSCREEN = 177
MISSING = 0
DUPLICATES = 0
WORK_ELIGIBLE = 75
SECONDARY_DISCOVERABLE = 48
CONDITIONAL_WORK = 39
ENTRY_RETURN = 9
CONTEXTUAL_ONLY = 6
```

---

#### 12. `AUTH-UI-058-USER-TEST-GATE-001`

##### 12.1. Naturaleza

Este gate se evalúa después de ejecutar las pruebas.

```text
GATE_ID = AUTH-UI-058-USER-TEST-GATE-001
STATUS = PENDING_EVIDENCE
EVALUATION_TIME = AFTER_REAL_USER_TEST_EXECUTION
CONSUMER = AUTH-UI-059
```

##### 12.2. Condiciones

| Condición | Materia | Regla |
| --- | --- | --- |
| `GATE-C01` | 177 identidades reconciliadas | cada VSCREEN queda `EVIDENCE_SUFFICIENT` o `NO_APLICA_REVIEWED`; ninguna desaparece |
| `GATE-C02` | sesiones reales | todo registro usado proviene de interacción humana real; build, inspección o simulación interna no cuentan |
| `GATE-C03` | escenarios aplicables | normal y estados de recuperación/denegación/error/expiración/revocación quedan ejecutados o con `NO_APLICA` revisable |
| `GATE-C04` | actores y funciones | los perfiles PART-* aplicables tienen evidencia suficiente; cargo nominal no sustituye función probada |
| `GATE-C05` | dispositivos | cada modo materialmente aplicable queda probado |
| `GATE-C06` | evidencia completa | cada registro contiene los campos obligatorios y `evidence_reference` |
| `GATE-C07` | hallazgos enrutable | todo error/fricción/bloqueo tiene `proposed_issue_id` o justificación de no-problema |
| `GATE-C08` | privacidad | evidencia saneada; sin secretos ni datos personales innecesarios |
| `GATE-C09` | sin falsos PASS | evidencia insuficiente permanece pendiente; agregados no sustituyen evidencia por pantalla |
| `GATE-C10` | salida determinista | produce `PASS_TO_AUTH_UI_059`, `FAIL` o `PENDING_EVIDENCE` con faltantes exactos |

##### 12.3. Resultado

Resultados permitidos:

```text
PASS_TO_AUTH_UI_059
FAIL
PENDING_EVIDENCE
```

`PASS_TO_AUTH_UI_059` no significa que todas las superficies sean usables. Significa que existe evidencia suficiente y trazable para que 059 registre y gestione los problemas reales.

Un error crítico observado y bien documentado no fuerza por sí solo `FAIL` del gate; sí bloquea la aprobación de la superficie correspondiente hasta corrección y retest.

Sí impiden PASS:

```text
ERROR CRITICO OCULTADO
EVIDENCIA FALTANTE
SUPERFICIE OMITIDA
NO_APLICA SIN JUSTIFICACION
SESION NO HUMANA PRESENTADA COMO REAL
```

---

#### 13. Suficiencia por superficie

Una `VSCREEN-*` puede abandonar `PENDING_EVIDENCE` únicamente cuando:

1. existe sesión humana válida para el camino principal aplicable;
2. estados adicionales requeridos fueron ejecutados o `NO_APLICA_REVIEWED`;
3. dispositivo aplicable quedó resuelto;
4. existe evidencia saneada;
5. hallazgos están propuestos para 059;
6. no existe contradicción sin reconciliar.

Cuando 057 utilice mediana, solo se calcula con múltiples observaciones válidas. Con una sola observación esa dimensión no se declara concluyente por mediana.

---

#### 14. Handoff a `AUTH-UI-059`

059 recibe, después del gate:

```text
SESSION_RECORDS
+
SCREEN_EXECUTION_STATUS
+
CRITICAL_ERRORS
+
NON_CRITICAL_FRICTION
+
PROPOSED_ISSUE_IDS
+
EVIDENCE_REFERENCES
+
NO_APLICA_REVIEWED
```

No recibe pantallas omitidas, problemas corregidos sin registro, evidencia sensible sin sanear ni agregados sin `screen_id`.

---

#### 15. Estado actual y pendientes

| Elemento | Estado actual | Propietario | Condición de salida |
| --- | --- | --- | --- |
| método de prueba | `ESPECIFICADO` | `AUTH-UI-058` | aprobación documental |
| 177 asignaciones a pack | `ESPECIFICADO` | `AUTH-UI-058` | aprobación documental |
| perfiles de participantes | `ESPECIFICADO` | `AUTH-UI-058` | aprobación documental |
| registros de sesión | `PENDIENTE_DE_EVIDENCIA` | ejecución posterior de 058 | sesiones reales |
| gate post-pruebas | `PENDING_EVIDENCE` | `AUTH-UI-058-USER-TEST-GATE-001` | condiciones C01..C10 satisfechas |
| problemas reales | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-059` | gate 058 en `PASS_TO_AUTH_UI_059` |
| aprobación final | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-060` | problemas requeridos cerrados y evidencia suficiente |

---

#### 16. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: esta tarea define el método y el gate de evidencia para ejecutar posteriormente pruebas humanas sobre superficies y criterios ya existentes. No crea comportamiento de producto, autorización, navegación, dato persistente, integración, ruta, pantalla o efecto empresarial nuevo; tampoco modifica, difiere, descarta o declara obsoleto ningún requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 17. Cobertura de prueba vigente reutilizada

Se reutiliza la cobertura vigente de `AUTH-UI-057`, incluidos perfiles de criterio, errores críticos, decisiones por superficie, privacidad, recuperación, accesibilidad, dispositivo compartido, navegación y autorización.

Esta sección es trazabilidad heredada y no modifica 04A.

---

#### 18. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout local después del reemplazo. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, BLOQUE I, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron sucesora, propietario, alcance histórico de prueba real, continuidad, topología, rutas y validadores aplicables; la instrucción explícita vigente define el método documental y un gate operativo posterior sin inventar resultados. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron sesiones reales; el gate queda `PENDING_EVIDENCE`. |
| FÍSICA | NOT_APPLICABLE | Documentar método y gate no crea instancia física propia ni modifica producto o infraestructura. |

---

#### 19. Criterios de aceptación

La tarea documental queda completa cuando:

- [ ] existe un método único y explícito;
- [ ] las 177 superficies aparecen exactamente una vez;
- [ ] cada superficie queda vinculada a un pack;
- [ ] existen 29 perfiles de participación;
- [ ] se preserva distribución 75/48/39/9/6;
- [ ] existe formulario lógico único de 27 campos;
- [ ] se distinguen método aprobado y pruebas ejecutadas;
- [ ] ninguna sesión se presenta como ejecutada;
- [ ] el gate queda `PENDING_EVIDENCE`;
- [ ] PASS exige reconciliar las 177 identidades;
- [ ] `NO_APLICA` exige justificación revisable;
- [ ] ausencia de evidencia nunca equivale a PASS;
- [ ] errores críticos se registran y enrutan;
- [ ] el gate no exige cero problemas, sino evidencia completa y trazable;
- [ ] 060 conserva aprobación final;
- [ ] no se modifica 04A;
- [ ] no se ejecuta código, Supabase ni despliegue.

---

#### 20. Límites

Este contrato no ejecuta personas, no programa sesiones, no crea participantes, no produce métricas reales y no certifica usabilidad. Su salida vigente es el método aprobado y el gate operativo preparado en `PENDING_EVIDENCE`.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-057 — Definir criterio de usabilidad por pantalla`

**TAREA ACTUAL APROBADA**
`AUTH-UI-058 — Probar con usuarios reales`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-059 — Registrar problemas encontrados`

### ✅ AUTH-UI-059 — Registrar problemas encontrados

**Estado:** APROBADA
**Tarea anterior:** AUTH-UI-058 — Probar con usuarios reales
**Tarea siguiente:** AUTH-UI-060 — Aprobar la pantalla antes de retirarla del roadmap
**Tipo de tarea:** documental y de enrutamiento integral; definición y reconciliación del registro de observaciones y hallazgos reales de usabilidad, sin corregirlos silenciosamente
**Bloque:** BLOQUE I — Protección y estados de interfaz
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; cada corrección se asigna a su tarea o package propietario y esta tarea no modifica código, datos, permisos, procesos, Supabase, infraestructura ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir y materializar el registro canónico que consumirá todas las observaciones reales de `AUTH-UI-058`, transformará cada observación en una decisión explícita y enrutará cada hallazgo hacia una resolución demostrada, un diferimiento que bloquee la aprobación correspondiente o un destino posterior completo.

La tarea separa el contrato documental del registro y su población operativa posterior:

```text
REGISTRO Y REGLAS DE ENRUTAMIENTO
=
APROBABLES DOCUMENTALMENTE

OBSERVACIONES Y HALLAZGOS REALES
=
SOLO DESPUES DE AUTH-UI-058-USER-TEST-GATE-001

AUSENCIA DE HALLAZGOS REALES
!=
CERO PROBLEMAS

PENDIENTE_DE_EVIDENCIA
!=
RESUELTO
```

No se inventan hallazgos para completar el registro.

---

#### 2. Alcance y límites

##### 2.1. Incluido

- reconciliación prospectiva de las 177 superficies;
- esquema obligatorio por hallazgo;
- decisión explícita por observación;
- clasificación separada entre defecto, deuda, solicitud de cambio, bloqueo de datos, bloqueo físico y `NO_APLICA`;
- severidad reutilizando `INFO`, `LOW`, `MEDIUM`, `HIGH` y `CRITICAL`;
- reglas de owner y destino;
- criterio de corrección;
- prueba de regresión y retest;
- impacto de cada hallazgo sobre la aprobación de 060;
- condición de cierre de la reconciliación;
- handoff íntegro hacia `AUTH-UI-060`.

##### 2.2. Excluido

- inventar sesiones, observaciones o problemas;
- corregir código, datos, permisos, procesos o contratos desde 059;
- convertir una solicitud de cambio en defecto para evitar gobernanza;
- cerrar un hallazgo crítico por aceptación verbal;
- ocultar un cambio de autorización dentro de una corrección visual;
- declarar resuelto un hallazgo sin evidencia cuando corresponda retest;
- aprobar finalmente una pantalla, reservado a 060.

---

#### 3. Dependencia operativa de 058

La población real del registro comienza únicamente después de:

```text
AUTH-UI-058-USER-TEST-GATE-001
=
PASS_TO_AUTH_UI_059
```

Mientras ese gate permanezca `PENDING_EVIDENCE`, las 177 superficies conservan estado `PENDIENTE_DE_EVIDENCIA` dentro de 059.

El archivo documental de 059 puede definir el registro antes de esa ejecución; no convierte el gate 058 en PASS ni crea resultados.

---

#### 4. Universo de reconciliación

Se preservan exactamente las 177 identidades de superficie heredadas de 057/058.

Distribución:

```text
WORK_ELIGIBLE = 75
SECONDARY_DISCOVERABLE = 48
CONDITIONAL_WORK = 39
ENTRY_RETURN = 9
CONTEXTUAL_ONLY = 6
TOTAL = 177
```

Cada identidad debe terminar con:

1. todas sus observaciones decididas;
2. cada hallazgo registrado cuando exista;
3. owner y destino cuando aplique;
4. efecto de aprobación explícito;
5. estado final transferible a 060.

---

#### 5. Registro de reconciliación por superficie

| Pantalla | `app_code` | Criterio 057 | Observaciones reales | Hallazgos registrados | Decisión 059 | Dependencia | Condición de salida |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `VSCREEN-0001` | `shell` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0002` | `shell` | `USAB-PROFILE-CONTEXTUAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0003` | `shell` | `USAB-PROFILE-CONTEXTUAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0004` | `shell` | `USAB-PROFILE-CONTEXTUAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0005` | `shell` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0006` | `shell` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0007` | `viso` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0008` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0009` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0010` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0011` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0012` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0013` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0014` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0015` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0016` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0017` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0018` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0019` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0020` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0021` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0022` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0023` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0024` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0025` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0026` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0027` | `anima` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0028` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0029` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0030` | `anima` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0031` | `anima` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0032` | `anima` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0033` | `nexo` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0034` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0035` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0036` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0037` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0038` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0039` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0040` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0041` | `nexo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0042` | `nexo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0043` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0044` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0045` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0046` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0047` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0048` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0049` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0050` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0051` | `nexo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0052` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0053` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0054` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0055` | `fogo` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0056` | `fogo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0057` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0058` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0059` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0060` | `fogo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0061` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0062` | `fogo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0063` | `fogo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0064` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0065` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0066` | `fogo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0067` | `fogo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0068` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0069` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0070` | `origo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0071` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0072` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0073` | `origo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0074` | `origo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0075` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0076` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0077` | `origo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0078` | `origo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0079` | `origo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0080` | `pulso` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0081` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0082` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0083` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0084` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0085` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0086` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0087` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0088` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0089` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0090` | `pulso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0091` | `pulso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0092` | `pulso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0093` | `pulso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0094` | `numera` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0095` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0096` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0097` | `numera` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0098` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0099` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0100` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0101` | `numera` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0102` | `numera` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0103` | `numera` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0104` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0105` | `numera` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0106` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0107` | `pass` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0108` | `pass` | `USAB-PROFILE-CONTEXTUAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0109` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0110` | `pass` | `USAB-PROFILE-CONTEXTUAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0111` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0112` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0113` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0114` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0115` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0116` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0117` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0118` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0119` | `viso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0120` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0121` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0122` | `viso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0123` | `viso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0124` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0125` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0126` | `anima` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0127` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0128` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0129` | `anima` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0130` | `anima` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0131` | `anima` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0132` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0133` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0134` | `nexo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0135` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0136` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0137` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0138` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0139` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0140` | `nexo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0141` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0142` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0143` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0144` | `nexo` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0145` | `origo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0146` | `origo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0147` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0148` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0149` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0150` | `pulso` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0151` | `pulso` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0152` | `pulso` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0153` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0154` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0155` | `numera` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0156` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0157` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0158` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0159` | `numera` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0160` | `pass` | `USAB-PROFILE-ENTRY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0161` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0162` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0163` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0164` | `pass` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0165` | `pass` | `USAB-PROFILE-CONTEXTUAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0166` | `pass` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0167` | `pass` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0168` | `pass` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0169` | `pass` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0170` | `pass` | `USAB-PROFILE-WORK-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0171` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0172` | `pass` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0173` | `fogo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0174` | `fogo` | `USAB-PROFILE-CONDITIONAL-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0175` | `shell` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0176` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |
| `VSCREEN-0177` | `nexo` | `USAB-PROFILE-SECONDARY-001` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | Consumir evidencia real de sesión y reconciliar toda observación asociada. |

El estado `PENDIENTE_DE_EVIDENCIA` de esta tabla es real: todavía no representa hallazgos ni resultados ejecutados.

---

#### 6. Decisión obligatoria por observación

| Decisión por observación | Regla |
| --- | --- |
| `HALLAZGO` | la observación demuestra un problema y debe generar un registro completo |
| `NO_PROBLEMA_JUSTIFICADO` | la observación no evidencia incumplimiento y queda cerrada con justificación/evidencia |
| `NO_APLICA` | el caso no aplica y conserva justificación revisable |
| `PENDIENTE_DE_EVIDENCIA` | la evidencia no alcanza para decidir y no puede transformarse en cierre |

Reglas:

- ninguna observación puede desaparecer por no convertirse en hallazgo;
- `NO_PROBLEMA_JUSTIFICADO` exige referencia a evidencia;
- `NO_APLICA` exige justificación revisable;
- `PENDIENTE_DE_EVIDENCIA` conserva owner y condición de salida;
- una misma observación no puede clasificarse simultáneamente como problema y `NO_APLICA`.

---

#### 7. Registro obligatorio por hallazgo

| Campo obligatorio | Regla |
| --- | --- |
| `finding_id` | identificador estable asignado solo cuando una observación real se convierte en hallazgo; no se preasignan IDs vacíos |
| `session_id` | sesión real de 058 que origina el hallazgo |
| `screen_id` | superficie `VSCREEN-*` afectada |
| `app_code` | aplicación propietaria |
| `actor_function_context` | actor, función o contexto realmente probado |
| `device_mode` | dispositivo o modalidad observada |
| `scenario_state` | escenario normal, vacío, carga, denegación, error, expiración, revocación o recuperación |
| `criterion_failed` | criterio de 057 incumplido o fricción observada |
| `classification` | defecto, deuda, solicitud de cambio, bloqueo de datos, bloqueo físico o `NO_APLICA` |
| `severity` | `INFO`, `LOW`, `MEDIUM`, `HIGH` o `CRITICAL` |
| `critical_error_class` | clase crítica de 057 cuando exista |
| `evidence_reference` | referencia saneada y trazable |
| `risk` | riesgo concreto de mantener el hallazgo |
| `reproduction_steps` | pasos mínimos para reproducir sin inventar contexto |
| `owner` | propietario responsable de resolver o enrutar |
| `destination` | tarea o package canónico propietario cuando la corrección exceda 059 |
| `correction_criterion` | condición verificable que debe cumplir la corrección |
| `regression_test` | prueba o retest requerido para impedir reaparición |
| `status` | estado vigente del hallazgo |
| `retest_evidence` | evidencia real del retest cuando exista |
| `approval_impact` | impacto sobre la posibilidad de aprobar la superficie en 060 |

`finding_id` se asigna únicamente cuando existe un hallazgo real. No se precrean identificadores vacíos ni se inventan contadores para superficies sin problemas.

---

#### 8. Clasificación de hallazgos

| Clasificación | Uso |
| --- | --- |
| `DEFECTO` | la superficie incumple el comportamiento, criterio o estado ya especificado |
| `DEUDA` | la solución funciona pero conserva una limitación explícita que requiere trabajo posterior |
| `SOLICITUD_DE_CAMBIO` | la observación pide alterar un contrato o comportamiento, no corregir el vigente |
| `BLOQUEO_DE_DATOS` | la prueba o corrección no puede concluir por ausencia, inconsistencia o indisponibilidad de datos autorizados |
| `BLOQUEO_FISICO` | hardware, dispositivo, periférico, red local u otra condición física impide completar la evaluación |
| `NO_APLICA` | la observación queda fuera del alcance real de la superficie y conserva justificación revisable |

Separaciones obligatorias:

```text
DEFECTO != SOLICITUD_DE_CAMBIO
DEUDA != DEFECTO
BLOQUEO_DE_DATOS != BLOQUEO_FISICO
NO_APLICA != RESUELTO
```

Una corrección visual no puede absorber silenciosamente una modificación de permisos, procesos, contratos o datos.

---

#### 9. Severidad

| Severidad | Criterio |
| --- | --- |
| `INFO` | observación informativa sin degradación demostrable ni bloqueo |
| `LOW` | fricción menor sin pérdida de tarea, autoridad, datos o recuperación |
| `MEDIUM` | dificultad repetible o desviación que afecta eficiencia/comprensión y exige ajuste antes del cierre recomendado |
| `HIGH` | degradación importante, bloqueo funcional no crítico o riesgo operacional significativo |
| `CRITICAL` | error crítico de 057, exposición/autoridad indebida, falso éxito, duplicación de efecto, pérdida de custodia, persistencia entre actores o bloqueo accesible crítico |

Reglas:

- cualquier error crítico de 057 se clasifica `CRITICAL`;
- severidad no decide por sí sola el owner;
- una severidad baja no autoriza cerrar sin evidencia cuando existe criterio de retest;
- una solicitud de cambio puede tener alto impacto sin convertirse por ello en defecto.

---

#### 10. Owner, destino y corrección

Todo hallazgo debe conservar:

```text
OWNER
+
DESTINO CANONICO CUANDO CORRESPONDA
+
CRITERIO DE CORRECCION
+
PRUEBA DE REGRESION
+
CONDICION DE SALIDA
```

Si la corrección pertenece a una tarea o package existente, 059 referencia ese propietario y no crea una tarea administrativa nueva.

Si el destino todavía no puede resolverse con evidencia suficiente, el hallazgo permanece abierto y bloquea el cierre correspondiente; no se inventa un destino.

---

#### 11. Salidas válidas de cada hallazgo

| Salida válida del hallazgo | Condición |
| --- | --- |
| `RESOLUCION_DEMOSTRADA` | la corrección está disponible y existe evidencia suficiente de retest/regresión |
| `DIFERIMIENTO_EXPLICITO_BLOQUEANTE` | la corrección se pospone de forma explícita y la superficie correspondiente no puede aprobarse en 060 |
| `DESTINO_POSTERIOR_COMPLETO` | el hallazgo queda asignado a tarea/package canónico con owner, alcance, criterio de corrección, regresión y condición de salida completos |

Estas tres salidas implementan literalmente la condición de cierre de 059: resolución demostrada, diferimiento explícito bloqueante o destino posterior completo.

---

#### 12. Retest y regresión

Un hallazgo que declare corrección materializada solo puede usar `RESOLUCION_DEMOSTRADA` cuando:

1. existe evidencia de la corrección;
2. se ejecutó el retest aplicable;
3. la evidencia referencia la misma superficie, escenario y criterio fallido;
4. no se introdujo un error crítico nuevo;
5. la regresión requerida quedó ejecutada o tiene evidencia propietaria válida.

Si falta cualquiera de estas condiciones, el hallazgo no se considera resuelto.

---

#### 13. Gate de cierre de AUTH-UI-059

El gate se evalúa después del gate 058 y de la reconciliación de observaciones.

Estado documental inicial:

```text
STATUS = PENDIENTE_DE_EVIDENCIA
CONSUMER = AUTH-UI-060
```

Condiciones:

| Condición | Regla de cierre |
| --- | --- |
| C01 | `AUTH-UI-058-USER-TEST-GATE-001 = PASS_TO_AUTH_UI_059` |
| C02 | las 177 identidades `VSCREEN-*` están reconciliadas contra la evidencia real de 058 |
| C03 | cero observaciones sin una decisión explícita |
| C04 | cero hallazgos sin owner y destino canónico cuando corresponda |
| C05 | cero hallazgos críticos cerrados solo por aceptación verbal |
| C06 | cero correcciones visuales que oculten cambios de permisos, procesos o contratos |
| C07 | cada hallazgo tiene clasificación y severidad |
| C08 | cada hallazgo termina en resolución demostrada, diferimiento bloqueante o destino posterior completo |
| C09 | toda resolución que declare corregido un hallazgo conserva evidencia de retest/regresión |
| C10 | la salida hacia 060 conserva por superficie los hallazgos abiertos, diferidos y resueltos; ningún agregado sustituye la trazabilidad individual |

Resultados permitidos:

```text
PASS_TO_AUTH_UI_060
FAIL
PENDIENTE_DE_EVIDENCIA
```

`PASS_TO_AUTH_UI_060` no significa que todas las superficies estén aprobadas. Significa que el universo de observaciones y hallazgos está completamente reconciliado y 060 puede decidir cada pantalla con evidencia suficiente.

---

#### 14. Handoff a AUTH-UI-060

060 recibe por superficie:

```text
SCREEN_ID
+
DECISIONES DE OBSERVACION
+
HALLAZGOS
+
SEVERIDAD
+
ERRORES CRITICOS
+
ESTADO DE RESOLUCION
+
EVIDENCIA DE RETEST
+
DIFERIMIENTOS BLOQUEANTES
+
DESTINOS POSTERIORES
+
IMPACTO DE APROBACION
```

Ninguna pantalla puede llegar a 060 como aprobable por ausencia de registros.

---

#### 15. Estado actual y pendientes

| Materia | Estado | Propietario | Condición de salida |
| --- | --- | --- | --- |
| contrato del registro 059 | `ESPECIFICADO` | `AUTH-UI-059` | aprobación documental |
| 177 identidades a reconciliar | `ESPECIFICADO` | `AUTH-UI-059` | consumir evidencia real por superficie |
| evidencia de sesiones | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-058-USER-TEST-GATE-001` | `PASS_TO_AUTH_UI_059` |
| observaciones reales | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-059` después del gate 058 | reconciliación completa |
| hallazgos reales | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-059` después del gate 058 | registro completo por hallazgo |
| retest/corrección | `PENDIENTE_DE_EVIDENCIA` | owner/destino del hallazgo | salida válida demostrada |
| gate de cierre 059 | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-059` | condiciones C01..C10 satisfechas |
| aprobación final | `PENDIENTE_DE_EVIDENCIA` | `AUTH-UI-060` | gate 059 en `PASS_TO_AUTH_UI_060` |

---

#### 16. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: la tarea define el registro, clasificación, enrutamiento, retest y cierre documental de hallazgos de usabilidad derivados de criterios y pruebas ya existentes. No crea comportamiento de producto, autorización, navegación, dato persistente, integración, ruta, pantalla o efecto empresarial nuevo; tampoco modifica, difiere, descarta o declara obsoleto ningún requisito histórico. El registro canónico de requisitos de prueba no cambia.

---

#### 17. Cobertura de prueba vigente reutilizada

Se reutiliza la cobertura vigente de 057 y el contrato de ejecución/evidencia de 058. Las correcciones futuras consumen las pruebas propietarias de la tarea o package destino y no se duplican dentro de 059.

Esta sección es trazabilidad heredada y no modifica 04A.

---

#### 18. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout local después de incorporar 058 y reemplazar este artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, BLOQUE I, topología y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron el owner, título, tipo, condición histórica de cierre de 059, continuidad, topología, `package.json`, preflight y validadores aplicables; 058 se consume desde su versión completa aprobada mientras su incorporación permanece pendiente. |
| OPERATIVA | NOT_EXECUTED | No existen observaciones o hallazgos reales declarados en esta entrega; dependen del gate operativo de 058. |
| FÍSICA | NOT_APPLICABLE | 059 no crea instancia física propia ni modifica código, datos, permisos, Supabase o infraestructura. |

---

#### 19. Criterios de aceptación

La tarea documental queda completa cuando:

- [ ] las 177 superficies aparecen exactamente una vez en el registro de reconciliación;
- [ ] ninguna superficie recibe hallazgos inventados;
- [ ] toda observación futura deberá tener una decisión explícita;
- [ ] el registro por hallazgo contiene todos los campos obligatorios;
- [ ] clasificación distingue defecto, deuda, solicitud de cambio, bloqueo de datos, bloqueo físico y `NO_APLICA`;
- [ ] severidad usa `INFO`, `LOW`, `MEDIUM`, `HIGH` o `CRITICAL`;
- [ ] errores críticos de 057 se conservan como `CRITICAL`;
- [ ] cero hallazgos pueden cerrarse solo por aceptación verbal;
- [ ] correcciones visuales no ocultan cambios de permisos, procesos o contratos;
- [ ] cada hallazgo conserva owner y destino cuando corresponda;
- [ ] un hallazgo resuelto exige evidencia de retest/regresión aplicable;
- [ ] las únicas salidas finales son resolución demostrada, diferimiento bloqueante o destino posterior completo;
- [ ] el gate 059 inicia `PENDIENTE_DE_EVIDENCIA`;
- [ ] 060 solo consume resultados reales después de `PASS_TO_AUTH_UI_060`;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 20. Límites

Este contrato no afirma que ya existan problemas, no corrige ninguno y no aprueba pantallas. La población operativa del registro depende de evidencia real proveniente de 058.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`AUTH-UI-058 — Probar con usuarios reales`

**TAREA ACTUAL APROBADA**
`AUTH-UI-059 — Registrar problemas encontrados`

**SIGUIENTE TAREA RESERVADA**
`AUTH-UI-060 — Aprobar la pantalla antes de retirarla del roadmap`

### [ ] AUTH-UI-060 — Aprobar la pantalla antes de retirarla del roadmap

**Estado:** NO INICIADA
**Tarea anterior:** `AUTH-UI-059 — Registrar problemas encontrados` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-061 — Confirmar que todas las pantallas tienen responsable funcional y técnico` — NO INICIADA
**Tipo de tarea:** puerta documental integral; decisión individual de aprobación, bloqueo o no aplicabilidad por superficie canónica
**Cambios físicos autorizados:** ninguno

#### Matriz final obligatoria

La decisión deberá cubrir las 177 superficies canónicas y registrar, como
mínimo: aplicación, identidad de superficie, propietario funcional, propietario
técnico, actores probados, dispositivos probados, criterios consumidos,
sesiones de evidencia, problemas vinculados, bloqueadores abiertos, resultado,
revisor y fecha.

Los únicos resultados admisibles son `APROBADA`, `BLOQUEADA` y `NO_APLICA`
justificado. Una superficie no puede aprobarse si carece de evidencia real,
mantiene problemas críticos o altos sin resolución aceptada, incumple
autorización/accesibilidad/recuperación, o depende de una implementación que
continúa pendiente.

#### Condición de cierre

`AUTH-UI-060` solo podrá aprobarse globalmente cuando las 177 identidades estén
reconciliadas exactamente una vez, sin faltantes ni duplicados, y toda pantalla
bloqueada conserve una tarea o paquete posterior que impida retirarla del
roadmap. La aprobación de NEXO, una aplicación o un paquete no aprueba las
demás.
