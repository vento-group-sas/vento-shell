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


### [ ] AUTH-UI-051 — Estandarizar errores recuperables
<!-- EXECUTION-GATE-RECONCILIATION:B601-800:AUTH-UI-052-060 -->
### Reconciliación topológica de AUTH-UI-052 a AUTH-UI-060

Estas tareas diseñan, prototipan, prueban y aprueban el contrato de experiencia antes de implementación. Se agotan como definición canónica y no generan una unidad física independiente.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### [ ] AUTH-UI-052 — Diseñar página inicial según actor

**Estado:** NO INICIADA; evidencia parcial NEXO conservada
**Tarea anterior:** `AUTH-UI-051 — Estandarizar errores recuperables` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-053 — Diseñar navegación según tareas frecuentes` — NO INICIADA
**Tipo de tarea:** documental global; diseño funcional de la entrada de cada aplicación según actor efectivo, función activa, contexto territorial, trabajo autorizado y modalidad de dispositivo
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Evidencia parcial inspeccionada:** `vento-nexo`, `NEXO-ROUTE-001` — `/`
**Ruta vigente:** flujo canónico integral; el carril `NEXO-REMISSIONS-001` queda únicamente como procedencia histórica de la evidencia NEXO
**Cambios físicos autorizados:** ninguno; no modifica código, rutas, permisos, roles, procesos, datos, Supabase, migraciones, RLS, configuración ni despliegues

---

#### 1. Propósito

Diseñar la página inicial de NEXO como una proyección de trabajo resuelta según
el actor efectivo, la función activa y el contexto autorizado, sin convertir el
nombre de un rol, la URL, el dispositivo o la presencia de una tarjeta en una
fuente de autoridad.

La regla canónica es:

```text
PRINCIPAL AUTENTICADO
+
ACTOR EFECTIVO ATRIBUIBLE
+
FUNCIÓN ACTIVA
+
CONTEXTO TERRITORIAL Y LABORAL VIGENTE
+
DISPOSITIVO Y SESIÓN COMPATIBLES
+
PERMISOS, RECURSOS, ETAPAS Y RELACIONES RESUELTOS EN SERVIDOR
+
PRIORIDAD DE TRABAJO AUTORITATIVA
→
UNA SOLA PROYECCIÓN INICIAL COHERENTE
```

La página inicial organiza y presenta trabajo autorizado. No concede permisos,
no mezcla funciones, no crea procesos y no sustituye las comprobaciones de
servidor aplicables a cada lectura o mutación.

---

#### 2. Resultado material

Se aprueban ocho artefactos documentales consumibles:

1. `NEXO-ACTOR-HOME-PAGE-CONTRACT-001`, que define la identidad, autoridad,
   límites y comportamiento común de la página inicial;
2. `NEXO-ACTOR-HOME-RESOLUTION-MATRIX-001`, que materializa una decisión para
   los ocho contextos de actor, función y dispositivo aprobados;
3. `NEXO-ACTOR-HOME-COMPOSITION-MATRIX-001`, que vincula cada contexto con su
   contrato de inicio, entradas prioritarias, contenido secundario y
   ocultamientos obligatorios;
4. `NEXO-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`, que define ocho zonas de
   composición sin alterar el orden interno de cada proyección aprobada;
5. `NEXO-ACTOR-HOME-PRIORITY-CONTRACT-001`, que define selección de proyección,
   acción primaria y siguiente trabajo sin prioridad calculada por el cliente;
6. `NEXO-ACTOR-HOME-STATE-CONTRACT-001`, que materializa diez resultados de
   presentación y sus reglas de recuperación;
7. `NEXO-ACTOR-HOME-RESPONSIVE-ACCESSIBILITY-CONTRACT-001`, que define
   comportamiento en móvil, tablet, escritorio y estación compartida;
8. `NEXO-ACTOR-HOME-HANDOFF-001`, que entrega el diseño a la navegación por
   tareas frecuentes sin iniciar la tarea siguiente.

Cobertura materializada:

| Elemento                                      | Total esperado | Total materializado | Faltantes | Duplicados |
| --------------------------------------------- | -------------: | ------------------: | --------: | ---------: |
| Superficies iniciales existentes reutilizadas |              1 |                   1 |         0 |          0 |
| Contextos canónicos resueltos                 |              8 |                   8 |         0 |          0 |
| Proyecciones funcionales principales          |              6 |                   6 |         0 |          0 |
| Casos especiales de composición               |              2 |                   2 |         0 |          0 |
| Zonas de composición                          |              8 |                   8 |         0 |          0 |
| Resultados de presentación                    |             10 |                  10 |         0 |          0 |
| Rutas nuevas                                  |              0 |                   0 |         0 |          0 |
| Roles o funciones nuevas                      |              0 |                   0 |         0 |          0 |
| Permisos nuevos                               |              0 |                   0 |         0 |          0 |
| Requisitos de prueba nuevos o modificados     |              0 |                   0 |         0 |          0 |

El resultado queda `ESPECIFICADO`. No se declara `IMPLEMENTADO`, `VALIDADO` ni
disponible en producción.

---

#### 3. Decisiones y contratos consumidos

La tarea consume sin modificar:

- `NEXO-REQUESTER-HOME-CONTRACT-001` y su arquitectura de información;
- `NEXO-WAREHOUSE-HOME-CONTRACT-001` y sus colas operativas;
- `NEXO-DRIVER-HOME-CONTRACT-001` y su composición de custodia;
- `NEXO-RECEIVER-HOME-CONTRACT-001` y su composición de recepción;
- `NEXO-SUPERVISOR-HOME-CONTRACT-001` y sus colas de control;
- `NEXO-TASK-NAVIGATION-CONTRACT-001`;
- `NEXO-NAVIGATION-TASK-CATALOG-001`;
- `NEXO-ACTOR-TASK-COMPOSITION-MATRIX-001`;
- `NEXO-ROUTE-TO-TASK-REGISTRY-001`;
- `NEXO-NAVIGATION-ENTRY-RETURN-CONTRACT-001`;
- contratos aprobados de lectura, acciones, turno, check-in, sede, área,
  dispositivo compartido, simulación, sensibilidad y masking;
- contratos vigentes de razones de autorización y estados interactivos
  auxiliares;
- requisitos `TREQ-*` vigentes asociados a los contratos anteriores.

No se renombra ninguna identidad consumida ni se altera la distribución de
familias, tareas, rutas, procesos, etapas o responsabilidades aprobadas.

---

#### 4. Alcance y límites

##### 4.1. Incluido

- resolución de una proyección inicial según actor efectivo y función activa;
- contexto visible de actor, sede, área, turno, check-in y dispositivo cuando
  resulten aplicables;
- una acción primaria coherente con la proyección activa;
- siguiente trabajo y colas autorizadas resueltos por el servidor;
- contenido secundario limitado a referencias necesarias para la tarea;
- separación explícita entre operación, supervisión y configuración;
- composición segura para una persona con varias funciones;
- comportamiento de estación compartida con actor humano activo;
- carga, vacío, parcialidad, denegación, fallo técnico, revocación y estados
  interactivos auxiliares;
- reglas responsive, accesibilidad, privacidad y minimización.

##### 4.2. Excluido

- diseñar el menú y la navegación completa por frecuencia;
- reducir opciones irrelevantes fuera de la página inicial;
- crear prototipos visuales;
- validar con usuarios;
- implementar componentes, consultas, guards, resolutores o telemetría;
- crear una ruta adicional por actor;
- inferir permisos desde nombres de rol;
- mezclar acciones de solicitante, bodega, conductor, receptor, supervisor o
  configuración en una única vista operativa;
- mostrar métricas de productividad individual;
- ejecutar cambios físicos o desplegados.

---

#### 5. `NEXO-ACTOR-HOME-PAGE-CONTRACT-001`

##### 5.1. Identidad de la superficie

La página inicial reutiliza exclusivamente `NEXO-ROUTE-001` con patrón `/`.
No se crean rutas como `/home-bodeguero`, `/home-conductor` o equivalentes.
La misma superficie obtiene una respuesta distinta porque cambia el contexto
autoritativo, no porque el cliente elija una URL o envíe un rol.

##### 5.2. Autoridad

La proyección se calcula con la intersección de:

- principal autenticado;
- actor efectivo;
- función activa;
- rol base y rol operativo cuando apliquen;
- turno y check-in cuando sean obligatorios;
- sede, área, LOC, origen, destino o territorio aplicables;
- dispositivo, paquete y sesión de actor cuando apliquen;
- permisos de lectura y acción exactos;
- asignación, participación, custodia, handoff o responsabilidad válida;
- estado, etapa, versión y frescura del recurso.

Una ausencia, conflicto o revocación de un componente requerido falla cerrado.
La página nunca obtiene un universo global para ocultarlo después en el
cliente.

##### 5.3. Proyección única

En cada render existe una sola proyección activa. El actor puede tener varias
funciones autorizadas, pero sus controles no se fusionan. Cambiar de función
provoca una resolución completa nueva antes de presentar información o
acciones.

##### 5.4. No autoridad de presentación

No conceden autoridad:

- una tarjeta visible;
- un conteo;
- un elemento de navegación;
- una ruta directa;
- un nombre de cargo;
- `navigation_role`;
- el tipo de dispositivo;
- haber participado en otra etapa;
- pertenecer a la misma sede;
- conocer un identificador;
- haber tenido acceso en una sesión anterior.

---

#### 6. `NEXO-ACTOR-HOME-RESOLUTION-MATRIX-001`

| Caso           | Contexto canónico                       | Proyección activa                             | Entrada prioritaria                                                                                               | Acción primaria                                        | Regla de resolución                                                                            | Estado         |
| -------------- | --------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | -------------- |
| `HOME-CTX-001` | solicitante autorizado                  | `NEXO-REQUESTER-HOME-CONTRACT-001`            | `NEXO-TASK-003` y solicitudes propias continuables                                                                | `NUEVA SOLICITUD` cuando la autorización permita crear | actor, participación propia, territorio y permiso exacto resueltos en servidor                 | `ESPECIFICADO` |
| `HOME-CTX-002` | bodeguero o preparador autorizado       | `NEXO-WAREHOUSE-HOME-CONTRACT-001`            | `NEXO-TASK-004`, `NEXO-TASK-007` a `NEXO-TASK-011` según trabajo vigente                                          | `CONTINUAR_SIGUIENTE_TAREA`                            | función de bodega, turno, área warehouse, asignación, recurso y prioridad autoritativa         | `ESPECIFICADO` |
| `HOME-CTX-003` | conductor o custodio autorizado         | `NEXO-DRIVER-HOME-CONTRACT-001`               | `NEXO-TASK-005`                                                                                                   | `CONTINUAR_SIGUIENTE_TAREA`                            | jornada, asignación, ruta, vehículo, custodia, etapa y permiso compatibles                     | `ESPECIFICADO` |
| `HOME-CTX-004` | receptor autorizado                     | `NEXO-RECEIVER-HOME-CONTRACT-001`             | `NEXO-TASK-006` y `NEXO-TASK-007` cuando el origen empresarial lo permita                                         | `CONTINUAR_SIGUIENTE_TAREA`                            | función receptora, destino, handoff, custodia, segregación y permiso exacto                    | `ESPECIFICADO` |
| `HOME-CTX-005` | supervisor con cobertura territorial    | `NEXO-SUPERVISOR-HOME-CONTRACT-001`           | `NEXO-TASK-012`; referencias `NEXO-TASK-013` a `NEXO-TASK-017` y `NEXO-TASK-026` según permiso                    | `CONTINUAR_SIGUIENTE_TAREA`                            | cobertura, responsabilidad, conflicto, evidencia, autorización atómica y segregación           | `ESPECIFICADO` |
| `HOME-CTX-006` | configurador autorizado                 | `NEXO-TASK-NAVIGATION-CONTRACT-001`           | `NEXO-TASK-021`; referencias `NEXO-TASK-020`, `NEXO-TASK-022` a `NEXO-TASK-025` y `NEXO-TASK-027` según capacidad | abrir la tarea de configuración prioritaria autorizada | capacidad administrativa exacta y territorio, sin ejecución física ni supervisión implícita    | `ESPECIFICADO` |
| `HOME-CTX-007` | persona con varias funciones            | proyección de la función activa               | siguiente tarea autoritativa de la función activa                                                                 | la definida por la proyección activa                   | las otras funciones aparecen únicamente como cambio de contexto separado y sin datos mezclados | `ESPECIFICADO` |
| `HOME-CTX-008` | dispositivo compartido con actor activo | proyección compatible con actor y dispositivo | tareas compatibles con dispositivo, actor, turno y contexto                                                       | la definida por la proyección activa                   | la identidad del dispositivo limita; nunca sustituye actor, permiso, turno o territorio        | `ESPECIFICADO` |

Reconciliación:

```text
EXPECTED_CONTEXTS = 8
MATERIALIZED_CONTEXTS = 8
UNIQUE_CONTEXT_IDS = 8
MISSING_CONTEXTS = 0
DUPLICATE_CONTEXTS = 0
```

---

#### 7. `NEXO-ACTOR-HOME-COMPOSITION-MATRIX-001`

| Proyección             | Contenido principal                                                                                    | Contenido secundario permitido                                                 | Ocultamiento obligatorio                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| solicitante            | creación autorizada, solicitudes propias, siguiente paso y estado                                      | referencia mínima de solicitud y resultado propio                              | preparación, conducción, recepción, supervisión, configuración, stock global y costos                    |
| bodega                 | siguiente tarea, recepción, ubicación, preparación, handoff, movimientos, conteos y reportes asignados | stock, LOC, movimientos, lote, LPN, impresión y escaneo vinculados a una tarea | creación de solicitudes ajenas, tránsito, decisiones supervisoras, configuración y métricas individuales |
| conductor              | recogida, custodia, tránsito, parada, entrega, incidente, retorno y bloqueo asignados                  | manifiesto, carga, sello, evidencia y referencias de ruta necesarias           | solicitud, picking, recepción, ajustes, configuración y trabajo ajeno                                    |
| receptor               | arribos, handoff, verificación, recepción parcial o completa, diferencias y evidencia                  | existencia, ubicación y documento necesarios para recibir                      | conducción, preparación, decisiones supervisoras, configuración y datos de otros destinos                |
| supervisor             | bloqueos, vencimientos, excepciones, diferencias, autorizaciones, cumplimiento, cierre y continuidad   | referencias territoriales y evidencia necesarias para decidir                  | mutaciones operativas, configuración no concedida y métricas individuales fuera de propósito             |
| configuración          | tarea administrativa exacta y capacidades publicadas                                                   | referencias de catálogo o política indispensables                              | ejecución física, supervisión, colas operativas y autoridad derivada del cargo                           |
| multifunción           | una sola proyección activa                                                                             | selector de función autorizada sin datos previos de la otra proyección         | controles mezclados, autoaprobación, herencia de autoridad y acciones cruzadas                           |
| dispositivo compartido | proyección mínima compatible con la estación y el actor activo                                         | utilidades contextuales requeridas por la tarea                                | datos sensibles no necesarios, administración y toda acción sin actor atribuible                         |

Las secciones vacías no se sustituyen por contenido de otra función ni por
accesos técnicos.

---

#### 8. `NEXO-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`

La página utiliza ocho zonas de composición. Cada proyección conserva el orden,
las secciones y el lenguaje de su contrato aprobado; estas zonas son el
contenedor común y no renombran su contenido interno.

| Orden | Zona común                  | Regla                                                                                                                               |
| ----: | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
|     1 | Contexto activo             | muestra actor, función, sede, área, turno, dispositivo y frescura aplicables; no expone permisos ni detalles internos               |
|     2 | Acción primaria             | presenta una sola acción primaria válida para la proyección activa; se oculta cuando falta autorización                             |
|     3 | Siguiente trabajo           | muestra una tarea autoritativa o un vacío válido; no calcula prioridad en el cliente                                                |
|     4 | Trabajo en curso            | agrupa únicamente instancias propias, asignadas, participadas o bajo custodia válida                                                |
|     5 | Entradas y handoffs         | presenta arribos, entregas o continuaciones que requieren participación del actor activo                                            |
|     6 | Bloqueos y excepciones      | explica causa, efecto, propietario y recuperación segura sin sugerir bypass                                                         |
|     7 | Referencias contextuales    | ofrece datos y utilidades necesarios para la tarea sin convertirlos en navegación global                                            |
|     8 | Cambio de contexto y sesión | permite resolver otra función autorizada o cerrar/cambiar actor de forma controlada; nunca conserva datos de la proyección anterior |

Reglas de jerarquía:

1. contexto y acción primaria preceden a listas y referencias;
2. el siguiente trabajo precede a accesos secundarios;
3. bloqueos críticos preceden a contenido informativo;
4. una referencia nunca compite visualmente con la acción primaria;
5. la configuración no ocupa espacio en proyecciones operativas;
6. los conteos describen trabajo, no desempeño individual;
7. toda sección conserva una salida accesible de carga, vacío, parcialidad o
   fallo;
8. el cambio de función es explícito y provoca una nueva resolución.

---

#### 9. `NEXO-ACTOR-HOME-PRIORITY-CONTRACT-001`

##### 9.1. Selección de proyección

La selección ocurre antes de consultar datos de la página. El resolutor no
utiliza una precedencia fija de cargos; evalúa funciones vigentes y exige una
función activa cuando exista más de una posibilidad compatible.

##### 9.2. Acción primaria

- solicitante: `NUEVA SOLICITUD`, solo cuando la creación esté autorizada;
- bodeguero, conductor, receptor y supervisor:
  `CONTINUAR_SIGUIENTE_TAREA`;
- configurador: abrir únicamente la tarea administrativa prioritaria ya
  autorizada;
- multifunción y dispositivo compartido: heredan la acción de la proyección
  activa, sin añadir una acción paralela.

No aparece una acción primaria si el resultado autoritativo no incluye acción,
recurso, etapa, territorio, versión y condición de ejecución compatibles.

##### 9.3. Prioridad de trabajo

La prioridad se entrega resuelta por el servidor y conserva las reglas del
contrato propietario de cada proyección. El cliente puede ordenar
presentación secundaria, pero no puede aumentar prioridad, cambiar propietario,
reclasificar severidad ni convertir una referencia en tarea ejecutable.

##### 9.4. Reanudación

Una tarea reanudada conserva identidad, instancia, actor, función, contexto,
etapa y versión. Una URL directa revalida el mismo conjunto antes de mostrar
datos o acciones.

---

#### 10. Binding de superficie y navegación

1. `NEXO-ROUTE-001` es la única entrada inicial.
2. La página consume tareas humanas y bindings aprobados; no organiza el inicio
   por segmentos de URL.
3. Las rutas de escáner, kiosco, código, alias y utilidades se abren desde una
   tarea y regresan a la tarea invocante.
4. Breadcrumb, retorno y reanudación conservan tarea e instancia, no una ruta
   técnica como identidad empresarial.
5. La navegación secundaria completa pertenece a `AUTH-UI-053` y permanece
   reservada.
6. Un acceso directo nunca crea una entrada visible ni concede autoridad.

---

#### 11. `NEXO-ACTOR-HOME-STATE-CONTRACT-001`

| Resultado                          | Condición                                                                                   | Presentación obligatoria                                          | Acción permitida                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| `RESOLVIENDO_CONTEXTO`             | todavía no existe actor, función y contexto concluyentes                                    | estructura mínima sin conteos, colas ni datos empresariales       | esperar o cancelar resolución                                   |
| `ACTOR_IDENTIFICATION_REQUIRED`    | dispositivo compartido válido sin actor humano activo                                       | flujo de identificación separado, sin presentarlo como denegación | identificar actor mediante mecanismo autorizado                 |
| `STRONG_REAUTHENTICATION_REQUIRED` | la acción o sensibilidad exige soporte fuerte vigente                                       | solicitud de reautenticación separada y propósito visible         | iniciar una solicitud nueva de soporte fuerte                   |
| `CARGANDO_PROYECCION`              | contexto resuelto y datos todavía en carga                                                  | contexto visible, controles deshabilitados y esqueleto coherente  | cancelar navegación o esperar                                   |
| `PROYECCION_LISTA`                 | contexto, autorización y datos elegibles completos                                          | arquitectura de la proyección activa y una acción primaria        | ejecutar solo comandos incluidos en la respuesta autoritativa   |
| `VACIO_VALIDO`                     | no existe trabajo elegible y la consulta fue concluyente                                    | mensaje de ausencia real sin fabricar conteos ni accesos alternos | acción primaria propia si continúa autorizada                   |
| `DATOS_PARCIALES`                  | una sección falló o perdió frescura mientras otras siguen confirmadas                       | identificar sección afectada y último dato confirmado             | lectura segura y reintento de consulta; no mutación dependiente |
| `AUTORIZACION_DENEGADA`            | evaluación concluyente de denegación                                                        | mensaje canónico minimizado, sesión preservada y cero efectos     | recuperación segura derivada del perfil, sin bypass             |
| `FALLO_TECNICO`                    | no existe una decisión estable por indisponibilidad o error                                 | mensaje técnico recuperable sin presentarlo como política         | reintentar consulta cuando sea seguro                           |
| `CONTEXTO_CAMBIADO_O_REVOCADO`     | actor, función, turno, territorio, dispositivo, asignación o versión dejaron de ser válidos | retirar datos y acciones de la proyección anterior                | resolver nuevamente el contexto                                 |

Reglas transversales:

- los dos estados interactivos auxiliares no se presentan como `403`;
- una denegación no se presenta como fallo técnico;
- un fallo técnico no se degrada a vacío;
- datos parciales no se completan con cero o valores estimados;
- una acción revocada desaparece antes de permitir otra mutación;
- un resultado desconocido de una escritura no se presenta como éxito ni se
  reintenta automáticamente desde la página inicial.

---

#### 12. Multifunción y dispositivo compartido

##### 12.1. Persona con varias funciones

- el selector muestra únicamente funciones autorizadas y vigentes;
- la función activa es visible y no se infiere desde la última ruta visitada;
- cambiar de función invalida datos, conteos, acciones y caché de la proyección
  anterior;
- cada acción conserva segregación y no permite autoaprobar, autopreparar,
  autotransportar o autorecibir cuando el contrato lo prohíba;
- las otras funciones no aparecen como tarjetas accionables dentro del mismo
  home.

##### 12.2. Estación compartida

- el dispositivo se identifica antes de habilitar la aplicación;
- el actor humano se identifica antes de mostrar trabajo atribuible;
- actor, dispositivo y contexto se conservan juntos en cada acción;
- cambiar o cerrar actor retira información sensible y acciones;
- la estación limita aplicaciones y capacidades máximas, pero no aporta rol,
  permiso, turno, check-in ni territorio;
- las tareas incompatibles con la estación no se muestran como bloqueadas: no
  forman parte de la proyección.

---

#### 13. `NEXO-ACTOR-HOME-RESPONSIVE-ACCESSIBILITY-CONTRACT-001`

##### 13.1. Móvil

- contexto compacto y acción primaria visibles antes del primer desplazamiento
  largo;
- una columna;
- siguiente trabajo antes de referencias;
- tablas convertidas en estructuras semánticas sin perder etiquetas;
- ninguna acción crítica depende de hover o gesto oculto.

##### 13.2. Tablet

- contexto, siguiente trabajo y primera cola visibles sin convertir la página
  en tablero supervisor;
- objetivos táctiles compatibles con operación física;
- escaneo e impresión aparecen únicamente cuando la tarea los requiere;
- orientación y tamaño no cambian autoridad ni prioridad.

##### 13.3. Escritorio

- máximo dos columnas para contenido operativo;
- el espacio adicional no habilita configuración, métricas ni trabajo ajeno;
- detalle resumido y lista conservan orden de lectura y foco.

##### 13.4. Accesibilidad

- orden de foco equivalente a las ocho zonas;
- nombre y propósito estables para la acción primaria;
- estados, severidad y bloqueo no dependen solo del color;
- cambios importantes se anuncian de forma accesible;
- errores se asocian con la zona afectada;
- conteos tienen etiqueta, unidad y contexto;
- el cambio de función y actor es explícito y confirmable;
- la información sensible no se expone en atributos, URLs, títulos o mensajes.

---

#### 14. Seguridad, privacidad y minimización

1. La autorización filtra datos antes de construir la proyección.
2. La página no consulta datos globales para filtrarlos en el navegador.
3. Cada acción vuelve a validar actor, función, permiso, territorio, recurso,
   etapa y versión.
4. La página aplica los contratos de sensibilidad y masking vigentes.
5. No expone claves de permiso, reglas RLS, reason codes internos, nombres de
   tablas, trazas ni actores elegibles.
6. Simulación, cuando sea admisible, permanece visualmente diferenciada y no
   produce acciones reales.
7. Los datos personales de terceros se minimizan a la función o identificación
   estrictamente necesaria.
8. Los costos, saldos, existencias sensibles, notas de control y evidencia no
   aparecen fuera de la necesidad de la tarea.
9. Un conteo agregado no permite inferir trabajo, datos o recursos fuera del
   territorio autorizado.
10. Cerrar sesión, cambiar actor o revocar contexto elimina la proyección y sus
    datos temporales.

---

#### 15. Estado técnico y brecha de implementación

| Elemento                                                                      | Estado documental        | Evidencia permitida                        | Condición de salida                                        |
| ----------------------------------------------------------------------------- | ------------------------ | ------------------------------------------ | ---------------------------------------------------------- |
| contratos de inicio por solicitante, bodega, conductor, receptor y supervisor | `ESPECIFICADO`           | tareas `NEXO-UX-003` a `NEXO-UX-007`       | consumo íntegro en prototipo e implementación              |
| navegación por tareas y composición de ocho contextos                         | `ESPECIFICADO`           | `NEXO-UX-008`                              | binding físico y pruebas posteriores                       |
| flujo funcional de remisiones y estados de experiencia                        | `ESPECIFICADO`           | `NEXO-UX-009` a `NEXO-UX-025`              | prototipo, implementación y evidencia                      |
| superficie raíz existente                                                     | `IMPLEMENTADO_PARCIAL`   | `NEXO-ROUTE-001` en `vento-nexo`           | sustituir composición agregada por resolución autoritativa |
| página inicial según actor                                                    | `ESPECIFICADO`           | esta tarea                                 | `AUTH-UI-055`, implementación NEXO y pruebas               |
| prototipo visual por función                                                  | `NO_IMPLEMENTADO`        | no existe evidencia aprobada en esta tarea | `AUTH-UI-055`                                              |
| validación de usabilidad                                                      | `PENDIENTE_DE_EVIDENCIA` | no ejecutada                               | `AUTH-UI-056` a `AUTH-UI-060`                              |

La existencia de la ruta raíz no demuestra que el diseño aquí definido esté
implementado o validado.

---

#### 16. Criterios de aceptación

La tarea se considera documentalmente completa cuando se confirme que:

- existe exactamente una superficie inicial, `NEXO-ROUTE-001` — `/`;
- los ocho contextos canónicos tienen una decisión explícita;
- las seis proyecciones principales conservan sus contratos propietarios;
- multifunción y dispositivo compartido no crean proyecciones adicionales;
- la resolución depende de actor efectivo, función, contexto, permiso, recurso
  y etapa, no de un nombre de rol enviado por cliente;
- existe una sola proyección y una sola acción primaria por render;
- solicitante, bodega, conductor, receptor, supervisor y configuración no
  mezclan controles;
- el selector multifunción provoca una nueva resolución y retira datos previos;
- el dispositivo compartido no sustituye al actor humano;
- las ocho zonas comunes no alteran el orden interno de cada home aprobado;
- prioridad y siguiente trabajo se resuelven en servidor;
- rutas, deep links, kioscos y escáner no conceden autoridad;
- los diez resultados de presentación distinguen interacción, denegación,
  fallo técnico, vacío, parcialidad y revocación;
- móvil, tablet, escritorio y estación compartida tienen reglas explícitas;
- la página conserva accesibilidad, minimización, sensibilidad y masking;
- no se crean rutas, roles, funciones, procesos, permisos ni requisitos nuevos;
- todas las brechas tienen propietario y condición de salida;
- `AUTH-UI-053` permanece únicamente reservada.

---

#### 17. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: esta tarea no introduce un comportamiento autorizativo,
operativo, de navegación o de seguridad nuevo. Materializa la composición de la
superficie inicial usando exclusivamente contratos, matrices, estados y
requisitos vigentes ya aprobados para los inicios por función y la navegación
por tareas. No modifica, difiere, descarta ni declara obsoleto ningún requisito
histórico, por lo que el Registro Canónico de Requisitos de Prueba no cambia.

---

#### 18. `NEXO-ACTOR-HOME-HANDOFF-001`

| Destino                        | Handoff aprobado                                                                                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH-UI-053`                  | diseñar la navegación según tareas frecuentes consumiendo la proyección activa, las entradas prioritarias y los ocultamientos definidos aquí, sin cambiar la resolución por actor |
| `AUTH-UI-054`                  | reducir opciones irrelevantes sin eliminar trabajo autorizado ni usar frecuencia como fuente de permiso                                                                           |
| `AUTH-UI-055`                  | crear prototipos separados por proyección y por casos multifunción y dispositivo compartido                                                                                       |
| `AUTH-UI-056`                  | validar el prototipo sin presentar inspección documental como prueba con usuarios                                                                                                 |
| `AUTH-UI-057` a `AUTH-UI-060`  | definir criterios, probar, registrar problemas y aprobar pantallas con evidencia real                                                                                             |
| paquete de implementación NEXO | construir resolutor, componentes, consultas, guards, estados, pruebas y telemetría cuando la continuidad lo autorice                                                              |

Ningún destino anterior se inicia mediante esta tarea.

---

#### 19. Traza histórica del carril NEXO

> Esta fotografía dejó de ser continuidad vigente. Se conserva únicamente como evidencia de la ejecución parcial que originó los artefactos NEXO.

**ÚLTIMA TAREA APROBADA**

`NEXO-UX-025 — Definir métricas de tiempo, error y capacitación para el piloto operativo`

**TAREA ACTUAL APROBADA**

`AUTH-UI-052 — Diseñar página inicial según actor`

**SIGUIENTE TAREA RESERVADA**

`AUTH-UI-053 — Diseñar navegación según tareas frecuentes`


### [ ] AUTH-UI-053 — Diseñar navegación según tareas frecuentes

**Estado:** NO INICIADA; evidencia parcial NEXO conservada
**Tarea anterior:** `AUTH-UI-052 — Diseñar página inicial según actor` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-054 — Reducir opciones irrelevantes` — NO INICIADA
**Tipo de tarea:** documental global; navegación de cada aplicación según tareas frecuentes, elegibilidad autoritativa, función activa, trabajo vigente, recurrencia verificable, continuidad reciente y modalidad de dispositivo
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Evidencia parcial inspeccionada:** `vento-nexo`, `NEXO-ROUTE-001` — `/`
**Ruta vigente:** flujo canónico integral; el carril `NEXO-REMISSIONS-001` queda únicamente como procedencia histórica de la evidencia NEXO
**Cambios físicos autorizados:** ninguno; no modifica código, rutas, permisos, roles, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues

---

#### 1. Propósito

Diseñar la navegación de NEXO para que cada actor encuentre primero el trabajo
que realmente puede y suele ejecutar dentro de su función activa, sin convertir
historial de clics, frecuencia, orden visual, una URL o un nombre de rol en
fuente de autoridad.

La regla canónica es:

```text
ACTOR EFECTIVO Y FUNCIÓN ACTIVA
+
CONTEXTO, TERRITORIO Y DISPOSITIVO VIGENTES
+
CONJUNTO DE TAREAS AUTORIZADAS RESUELTO EN SERVIDOR
+
TRABAJO ACTIVO, CUSTODIA, HANDOFF, VENCIMIENTO Y BLOQUEO
+
CONTINUACIONES RECIENTES TODAVÍA VÁLIDAS
+
RECURRENCIA VERIFICABLE DE TAREAS ELEGIBLES
→
NAVEGACIÓN CORTA, ESTABLE Y ORIENTADA A TAREAS FRECUENTES
```

La frecuencia únicamente ordena opciones que ya son elegibles. Nunca crea
permisos, amplía territorio, cambia la función activa, convierte una referencia
en mutación ni permite omitir la revalidación de servidor.

---

#### 2. Resultado material

Se materializan siete artefactos documentales consumibles:

1. `NEXO-FREQUENT-TASK-NAVIGATION-CONTRACT-001`, que define identidad,
   jerarquía, límites, cantidades máximas y reglas de exposición;
2. `NEXO-FREQUENCY-SIGNAL-CONTRACT-001`, que define señales permitidas,
   precedencia, evidencia, desempate y prohibiciones;
3. `NEXO-ACTOR-FREQUENT-TASK-MATRIX-001`, que decide la navegación para los
   ocho contextos aprobados;
4. `NEXO-TASK-PLACEMENT-REGISTER-001`, que asigna una disposición explícita a
   las veintinueve tareas del catálogo canónico;
5. `NEXO-RECENT-CONTINUATION-CONTRACT-001`, que define reanudación segura,
   invalidez y retiro de accesos recientes;
6. `NEXO-FREQUENT-TASK-STATE-CONTRACT-001`, que materializa diez estados de
   interfaz y recuperación;
7. `NEXO-FREQUENT-TASK-HANDOFF-001`, que entrega las decisiones a la reducción
   de opciones y al prototipo sin iniciar dichas tareas.

Cobertura materializada:

| Elemento                                  | Total esperado | Total materializado | Faltantes | Duplicados |
| ----------------------------------------- | -------------: | ------------------: | --------: | ---------: |
| Familias de tareas canónicas              |              8 |                   8 |         0 |          0 |
| Tareas humanas o resolutores              |             29 |                  29 |         0 |          0 |
| Contextos de actor, función y dispositivo |              8 |                   8 |         0 |          0 |
| Grupos de navegación conservados          |              4 |                   4 |         0 |          0 |
| Zonas de navegación                       |              8 |                   8 |         0 |          0 |
| Clases de disposición                     |              6 |                   6 |         0 |          0 |
| Estados de interfaz                       |             10 |                  10 |         0 |          0 |
| Rutas, roles, funciones o permisos nuevos |              0 |                   0 |         0 |          0 |
| Requisitos de prueba nuevos o modificados |              0 |                   0 |         0 |          0 |

El resultado queda `ESPECIFICADO`. No se declara `IMPLEMENTADO`, `VALIDADO` ni
disponible en producción.

---

#### 3. Decisiones y contratos consumidos

La tarea consume sin modificar:

- `NEXO-ACTOR-HOME-PAGE-CONTRACT-001`;
- `NEXO-ACTOR-HOME-RESOLUTION-MATRIX-001`;
- `NEXO-ACTOR-HOME-COMPOSITION-MATRIX-001`;
- `NEXO-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`;
- `NEXO-ACTOR-HOME-PRIORITY-CONTRACT-001`;
- `NEXO-TASK-NAVIGATION-CONTRACT-001`;
- `NEXO-NAVIGATION-TASK-CATALOG-001`;
- `NEXO-ACTOR-TASK-COMPOSITION-MATRIX-001`;
- `NEXO-ROUTE-TO-TASK-REGISTRY-001`;
- `NEXO-NAVIGATION-ENTRY-RETURN-CONTRACT-001`;
- `NEXO-CONTEXTUAL-UTILITY-CONTRACT-001`;
- `NEXO-NAVIGATION-STATE-CONTRACT-001`;
- los contratos de inicio de solicitante, bodega, conductor, receptor y
  supervisor;
- los contratos vigentes de autorización, contexto, sensibilidad, masking,
  dispositivo compartido y estados interactivos auxiliares;
- los requisitos de prueba vigentes asociados a los contratos anteriores.

No se cambia la identidad, etiqueta, familia, carril, grupo, audiencia,
responsable o regla de exposición de ninguna tarea consumida.

---

#### 4. Alcance y límites

##### 4.1. Incluido

- navegación inicial y secundaria según función activa;
- una acción primaria y una siguiente tarea resueltas autoritativamente;
- hasta cuatro tareas frecuentes visibles en la superficie general;
- hasta tres continuaciones recientes todavía válidas;
- acceso secundario a todas las tareas autorizadas, agrupadas por familia;
- orden por trabajo activo, riesgo, vencimiento, continuidad y recurrencia;
- decisión explícita para las veintinueve identidades de tarea;
- tratamiento de multifunción y dispositivo compartido;
- estados de carga, vacío, parcialidad, revocación, conflicto y fallo técnico;
- reglas responsive, accesibilidad, seguridad, privacidad y minimización.

##### 4.2. Excluido

- eliminar opciones del catálogo o retirar rutas;
- convertir frecuencia en permiso, asignación o autoridad;
- diseñar el prototipo visual final;
- validar con usuarios;
- implementar resolutores, consultas, cachés, eventos o telemetría;
- usar historial local del navegador como fuente autoritativa;
- publicar métricas de productividad individual;
- mezclar funciones activas en un único menú;
- ejecutar cambios de código, datos, Supabase o despliegue.

---

#### 5. `NEXO-FREQUENT-TASK-NAVIGATION-CONTRACT-001`

##### 5.1. Unidad de navegación

La unidad visible es una tarea humana del catálogo canónico, no una ruta,
archivo, módulo, tabla, componente, permiso o estado técnico.

Cada entrada visible conserva:

- `task_id` canónico;
- etiqueta humana aprobada;
- familia y grupo aprobados;
- función activa;
- instancia cuando exista trabajo concreto;
- recurso, etapa, territorio y versión aplicables;
- acción permitida o condición de solo lectura;
- bloqueo estructurado cuando no pueda continuar;
- origen de la prioridad y frescura suficiente para revalidar.

##### 5.2. Jerarquía obligatoria

La navegación utiliza ocho zonas en este orden:

| Orden | Zona                            | Regla                                                                                                                     |
| ----: | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
|     1 | Contexto activo                 | Actor, función, sede, área, turno y dispositivo aplicables; sin claves de permiso ni detalles internos.                   |
|     2 | Acción primaria                 | Una sola acción válida para la proyección activa.                                                                         |
|     3 | Siguiente tarea                 | Una tarea o instancia prioritaria resuelta en servidor; nunca calculada por el cliente.                                   |
|     4 | Tareas frecuentes               | Máximo cuatro entradas elegibles, sin duplicar la acción primaria ni la siguiente tarea.                                  |
|     5 | Continuar trabajo reciente      | Máximo tres instancias revalidadas; una entrada obsoleta se retira y no se presenta como error del usuario.               |
|     6 | Bloqueos y vencimientos         | Trabajo que requiere atención, con causa, efecto, responsable y recuperación segura.                                      |
|     7 | Todas las tareas disponibles    | Entradas restantes agrupadas por familia humana, sin rutas técnicas ni utilidades globales.                               |
|     8 | Utilidades y cambio de contexto | Herramientas contextuales, cambio de función y sesión; se muestran únicamente cuando la tarea o el dispositivo las exige. |

##### 5.3. Cantidades y estabilidad

- la acción primaria no cuenta dentro del máximo de cuatro tareas frecuentes;
- la siguiente tarea no se duplica en `Tareas frecuentes` ni en `Continuar
  trabajo reciente`;
- una misma identidad puede tener varias instancias, pero la lista frecuente
  muestra una entrada agregada y la continuación reciente muestra instancias
  concretas;
- el orden no cambia durante el mismo render por eventos locales o animaciones;
- una actualización autoritativa puede reordenar la lista y debe anunciar el
  cambio de forma accesible;
- el espacio adicional de escritorio no aumenta los máximos;
- las tareas restantes permanecen accesibles en su familia cuando continúan
  autorizadas.

##### 5.4. Clases de disposición

| Clase                        | Significado                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `HOME_ONLY`                  | Identidad de inicio o retorno; no aparece como opción dentro de la misma página.                     |
| `PRIMARY_FIXED`              | Acción principal estable de una proyección cuando la autorización la habilita.                       |
| `PRIMARY_RESOLVED_CANDIDATE` | Puede ser la siguiente tarea o acción primaria cuando existe trabajo autoritativo compatible.        |
| `FREQUENT_CANDIDATE`         | Puede ocupar la lista frecuente después de superar elegibilidad y señales de orden.                  |
| `SECONDARY_DISCOVERABLE`     | Permanece en la familia correspondiente y no compite por el primer nivel sin una condición material. |
| `CONTEXTUAL_ONLY`            | Resolutor o utilidad oculta que solo se invoca desde una tarea y retorna a la instancia invocante.   |

---

#### 6. `NEXO-FREQUENCY-SIGNAL-CONTRACT-001`

##### 6.1. Elegibilidad previa

Antes de ordenar, el servidor elimina toda tarea que no satisfaga la
intersección de:

```text
ACTOR EFECTIVO
+
FUNCIÓN ACTIVA
+
PERMISO EXACTO
+
TERRITORIO Y RECURSO
+
ETAPA Y ESTADO
+
ASIGNACIÓN, PARTICIPACIÓN, CUSTODIA O RESPONSABILIDAD
+
DISPOSITIVO Y SESIÓN COMPATIBLES
+
FRESCURA Y VERSIÓN
```

La frecuencia se evalúa únicamente sobre el conjunto resultante.

##### 6.2. Precedencia determinista

Las entradas se ordenan en esta secuencia:

1. instancia ya iniciada o reclamada por el mismo actor y todavía vigente;
2. custodia, handoff o condición física con riesgo autorizado de seguridad,
   inocuidad, pérdida o interrupción;
3. tarea asignada con fecha, ventana o vencimiento autoritativo más próximo;
4. bloqueo que requiere una acción permitida del actor actual;
5. continuación reciente cuya instancia, etapa, territorio y versión continúan
   válidos;
6. tarea recurrente con al menos tres finalizaciones o continuaciones elegibles
   durante los últimos treinta días calendario para el mismo actor, función y
   contexto territorial;
7. entrada canónica predeterminada de la función activa;
8. desempate por fecha requerida, actualización autoritativa y `task_id`
   ascendente.

Una señal de menor nivel nunca desplaza trabajo activo, custodia, riesgo,
vencimiento o bloqueo de mayor nivel.

##### 6.3. Evidencia permitida

| Señal                     | Fuente permitida                                                           | Uso permitido                                      |
| ------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| trabajo activo            | instancia y asignación autoritativas                                       | seleccionar siguiente tarea                        |
| custodia o handoff        | estado de dominio, receipt y relación vigente                              | elevar prioridad operativa                         |
| vencimiento               | fecha o ventana persistida y aplicable                                     | ordenar trabajo elegible                           |
| bloqueo accionable        | causa estructurada y acción autorizada                                     | presentar en bloqueos y, cuando corresponda, subir |
| continuación reciente     | registro server-side de instancia visitada o mutada con identidad completa | reanudar tras revalidación                         |
| recurrencia               | eventos server-side elegibles del mismo actor, función y territorio        | ordenar candidatos frecuentes                      |
| predeterminado de función | matriz canónica de composición                                             | fallback estable sin inventar frecuencia           |

##### 6.4. Fuentes prohibidas

No se utilizan como señal autoritativa:

- clics almacenados solo en el navegador;
- una ruta visitada;
- orden manual enviado por el cliente;
- nombre de cargo o `navigation_role`;
- acceso anterior ya revocado;
- actividad de otro actor;
- volumen global de la sede;
- popularidad entre usuarios;
- métricas de desempeño;
- una tarjeta visible o un conteo parcial;
- un resultado de escritura todavía desconocido.

Los datos de recurrencia no se presentan como productividad, comparación,
ranking o evaluación individual.

---

#### 7. `NEXO-ACTOR-FREQUENT-TASK-MATRIX-001`

| Caso           | Contexto activo                         | Acción primaria                            | Candidatos de primer nivel                                                                   | Secundarias permitidas                                       | Ocultamiento obligatorio                                                                    | Estado         |
| -------------- | --------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | -------------- |
| `FREQ-CTX-001` | solicitante autorizado                  | `NEXO-TASK-003` cuando puede crear         | solicitudes propias continuables y `NEXO-TASK-002` cuando exista etapa propia vigente        | `NEXO-TASK-013` con lectura autorizada                       | preparación, transporte, recepción, supervisión, configuración y trabajo ajeno              | `ESPECIFICADO` |
| `FREQ-CTX-002` | bodeguero o preparador autorizado       | siguiente instancia elegible               | `NEXO-TASK-004`; `NEXO-TASK-007` a `NEXO-TASK-011` según trabajo y recurrencia               | `NEXO-TASK-013` a `NEXO-TASK-015` cuando apoyen la tarea     | conducción, recepción ajena, decisión supervisora y configuración                           | `ESPECIFICADO` |
| `FREQ-CTX-003` | conductor o custodio autorizado         | siguiente instancia de `NEXO-TASK-005`     | `NEXO-TASK-005` y sus continuaciones de custodia, tránsito, entrega, incidente o retorno     | referencias mínimas de carga, ruta y evidencia               | solicitud, picking, recepción, ajustes, configuración y trabajo sin custodia                | `ESPECIFICADO` |
| `FREQ-CTX-004` | receptor autorizado                     | siguiente instancia de `NEXO-TASK-006`     | `NEXO-TASK-006`; `NEXO-TASK-007` cuando el origen y la autorización lo permitan              | `NEXO-TASK-013`; `NEXO-TASK-015` como referencias necesarias | conducción, preparación, decisiones supervisoras, configuración y otros destinos            | `ESPECIFICADO` |
| `FREQ-CTX-005` | supervisor con cobertura territorial    | siguiente caso elegible de `NEXO-TASK-012` | `NEXO-TASK-012`; `NEXO-TASK-013` a `NEXO-TASK-017`; `NEXO-TASK-026` según señales válidas    | consultas y evidencia dentro de cobertura                    | mutaciones operativas, configuración no concedida y métricas individuales                   | `ESPECIFICADO` |
| `FREQ-CTX-006` | configurador autorizado                 | capacidad prioritaria de `NEXO-TASK-021`   | `NEXO-TASK-020`; `NEXO-TASK-022` a `NEXO-TASK-025`; `NEXO-TASK-027` según capacidad          | referencias indispensables para evaluar impacto              | ejecución física, supervisión y capacidades administrativas no concedidas                   | `ESPECIFICADO` |
| `FREQ-CTX-007` | persona con varias funciones            | la definida por una única función activa   | exclusivamente candidatos de la función activa                                               | cambio explícito a otra función autorizada                   | mezcla de listas, acciones cruzadas, autoaprobación y frecuencia compartida entre funciones | `ESPECIFICADO` |
| `FREQ-CTX-008` | dispositivo compartido con actor activo | la definida por la proyección compatible   | tareas compatibles con actor, función, turno, contexto y capacidades máximas del dispositivo | utilidades contextuales requeridas por la tarea              | administración, datos sensibles y toda acción sin actor humano atribuible                   | `ESPECIFICADO` |

Reconciliación:

```text
EXPECTED_CONTEXTS = 8
MATERIALIZED_CONTEXTS = 8
UNIQUE_CONTEXT_IDS = 8
MISSING_CONTEXTS = 0
DUPLICATE_CONTEXTS = 0
```

---

#### 8. `NEXO-TASK-PLACEMENT-REGISTER-001`

Cada identidad conserva su etiqueta y familia aprobadas. La disposición indica
su posición base; la exposición final todavía exige el contrato de frecuencia,
la función activa y la elegibilidad autoritativa.

| Tarea           | Etiqueta humana                   | Familia                | Disposición base             | Condición de primer nivel                                                     | Resultado materializado                                                                                     |
| --------------- | --------------------------------- | ---------------------- | ---------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NEXO-TASK-001` | Ir al inicio                      | `NEXO-TASK-FAMILY-001` | `HOME_ONLY`                  | ninguna; representa la superficie vigente                                     | no se repite como opción dentro del inicio; se usa para retorno y resolución de proyección                  |
| `NEXO-TASK-002` | Gestionar abastecimiento interno  | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | actor participante con una etapa propia o una continuación vigente            | resuelve función, etapa e instancia antes de abrir; nunca mezcla solicitar, preparar, transportar y recibir |
| `NEXO-TASK-003` | Solicitar abastecimiento          | `NEXO-TASK-FAMILY-002` | `PRIMARY_FIXED`              | solicitante autorizado para crear o continuar solicitudes propias             | acción principal del solicitante; los borradores válidos también pueden aparecer como continuaciones        |
| `NEXO-TASK-004` | Preparar abastecimiento           | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | preparación, picking, faltante o handoff atribuido a la bodega activa         | puede ser siguiente tarea y frecuente; no concede despacho ni tránsito                                      |
| `NEXO-TASK-005` | Transportar abastecimiento        | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | asignación, custodia o ruta vigente                                           | única entrada operativa principal del conductor; conserva carga, etapa y custodia                           |
| `NEXO-TASK-006` | Recibir abastecimiento            | `NEXO-TASK-FAMILY-002` | `PRIMARY_RESOLVED_CANDIDATE` | entrega, handoff o recepción atribuida al destino autorizado                  | puede ser siguiente tarea y frecuente; no concede decisión supervisora                                      |
| `NEXO-TASK-007` | Registrar una entrada             | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | fuente empresarial o excepción expresamente autorizada                        | aparece para receptor o bodega elegible; conserva la fuente y no se convierte en formulario libre           |
| `NEXO-TASK-008` | Ubicar existencias                | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | existencia recibida con ubicación pendiente y destino compatible              | prioriza putaway pendiente sin exponer configuración de ubicaciones                                         |
| `NEXO-TASK-009` | Mover existencias                 | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | traslado autorizado dentro del territorio                                     | aparece por trabajo o recurrencia elegible; no sustituye remisiones entre sedes                             |
| `NEXO-TASK-010` | Registrar un retiro               | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | retiro autorizado con origen, destino, unidad y motivo                        | aparece por trabajo o recurrencia elegible; nunca muestra stock global                                      |
| `NEXO-TASK-011` | Contar inventario                 | `NEXO-TASK-FAMILY-003` | `PRIMARY_RESOLVED_CANDIDATE` | sesión asignada y etapa compatible con captura o control                      | el resolutor separa captura operativa de control supervisor                                                 |
| `NEXO-TASK-012` | Controlar la operación            | `NEXO-TASK-FAMILY-004` | `PRIMARY_RESOLVED_CANDIDATE` | supervisor con caso, bloqueo, vencimiento o responsabilidad territorial       | acción principal de supervisión; no concede mutaciones operativas                                           |
| `NEXO-TASK-013` | Consultar existencias             | `NEXO-TASK-FAMILY-004` | `FREQUENT_CANDIDATE`         | lectura autorizada y uso recurrente o necesidad contextual                    | puede subir a frecuente; de otro modo permanece en consulta, control y trazabilidad                         |
| `NEXO-TASK-014` | Investigar movimientos            | `NEXO-TASK-FAMILY-004` | `FREQUENT_CANDIDATE`         | investigación autorizada, caso vigente o recurrencia verificable              | conserva trazabilidad y no habilita escritura                                                               |
| `NEXO-TASK-015` | Consultar ubicaciones             | `NEXO-TASK-FAMILY-004` | `FREQUENT_CANDIDATE`         | lectura territorial autorizada y necesidad contextual o recurrencia           | puede subir a frecuente sin exponer edición de estructura                                                   |
| `NEXO-TASK-016` | Consultar contenedores logísticos | `NEXO-TASK-FAMILY-004` | `SECONDARY_DISCOVERABLE`     | permiso de lectura y contexto LPN compatible                                  | permanece en su familia hasta que el subdominio materialice sus señales propias                             |
| `NEXO-TASK-017` | Gestionar activos                 | `NEXO-TASK-FAMILY-005` | `FREQUENT_CANDIDATE`         | permiso, territorio, trabajo o recurrencia de activos                         | puede subir a frecuente para actores de activos; no anticipa acciones de configuración                      |
| `NEXO-TASK-018` | Capturar activos                  | `NEXO-TASK-FAMILY-005` | `PRIMARY_RESOLVED_CANDIDATE` | actor de campo autorizado y captura pendiente                                 | puede ser siguiente tarea en la función activa; no aparece en remisiones                                    |
| `NEXO-TASK-019` | Contar activos                    | `NEXO-TASK-FAMILY-005` | `PRIMARY_RESOLVED_CANDIDATE` | sesión y etapa de conteo de activos compatibles                               | separa captura y cierre según función                                                                       |
| `NEXO-TASK-020` | Configurar activos                | `NEXO-TASK-FAMILY-005` | `SECONDARY_DISCOVERABLE`     | capacidad exacta de configuración de activos                                  | se presenta únicamente en configuración; nunca en navegación operativa                                      |
| `NEXO-TASK-021` | Administrar NEXO                  | `NEXO-TASK-FAMILY-006` | `PRIMARY_RESOLVED_CANDIDATE` | actor con al menos una capacidad administrativa exacta                        | resuelve la capacidad prioritaria sin convertir el cargo en acceso global                                   |
| `NEXO-TASK-022` | Administrar productos y unidades  | `NEXO-TASK-FAMILY-006` | `FREQUENT_CANDIDATE`         | capacidad de catálogo y recurrencia administrativa verificable                | puede subir dentro de configuración; queda excluida de funciones operativas                                 |
| `NEXO-TASK-023` | Administrar ubicaciones           | `NEXO-TASK-FAMILY-006` | `FREQUENT_CANDIDATE`         | capacidad de ubicación y recurrencia administrativa verificable               | puede subir dentro de configuración; no se confunde con ubicar existencias                                  |
| `NEXO-TASK-024` | Configurar abastecimiento         | `NEXO-TASK-FAMILY-006` | `FREQUENT_CANDIDATE`         | capacidad logística y recurrencia administrativa verificable                  | puede subir dentro de configuración; no expone solicitudes concretas salvo referencia necesaria             |
| `NEXO-TASK-025` | Configurar referencias internas   | `NEXO-TASK-FAMILY-006` | `SECONDARY_DISCOVERABLE`     | permiso financiero o de referencia exacto                                     | permanece en administración y no se promueve mediante actividad operativa                                   |
| `NEXO-TASK-026` | Controlar impresión               | `NEXO-TASK-FAMILY-007` | `PRIMARY_RESOLVED_CANDIDATE` | trabajos de impresión bloqueados, fallidos o pendientes dentro del territorio | puede ser siguiente tarea de supervisor o soporte; no abre monitor global sin cobertura                     |
| `NEXO-TASK-027` | Configurar impresión              | `NEXO-TASK-FAMILY-007` | `SECONDARY_DISCOVERABLE`     | capacidad exacta de configuración de impresión                                | se presenta únicamente en administración y no por existencia de trabajos                                    |
| `NEXO-TASK-028` | Resolver un destino contextual    | `NEXO-TASK-FAMILY-008` | `CONTEXTUAL_ONLY`            | tarea invocante, actor, dispositivo y destino compatibles                     | permanece oculto; resuelve código, ubicación, kiosco o escáner y retorna a la tarea                         |
| `NEXO-TASK-029` | Resolver acceso                   | `NEXO-TASK-FAMILY-008` | `CONTEXTUAL_ONLY`            | entrada técnica, autenticación o denegación segura                            | permanece fuera de la navegación empresarial y nunca se clasifica como frecuente                            |

Reconciliación:

```text
EXPECTED_TASK_IDS = 29
MATERIALIZED_TASK_IDS = 29
UNIQUE_TASK_IDS = 29
MISSING_TASK_IDS = 0
DUPLICATE_TASK_IDS = 0
```

Distribución de disposición:

| Disposición                  | Cantidad |
| ---------------------------- | -------: |
| `HOME_ONLY`                  |        1 |
| `PRIMARY_FIXED`              |        1 |
| `PRIMARY_RESOLVED_CANDIDATE` |       14 |
| `FREQUENT_CANDIDATE`         |        7 |
| `SECONDARY_DISCOVERABLE`     |        4 |
| `CONTEXTUAL_ONLY`            |        2 |
| **Total**                    |   **29** |

---

#### 9. `NEXO-RECENT-CONTINUATION-CONTRACT-001`

##### 9.1. Identidad mínima

Cada continuación reciente conserva conjuntamente:

```text
TASK_ID
+
INSTANCE_ID
+
ACTOR_ID
+
FUNCIÓN_ACTIVA
+
TERRITORIO
+
RECURSO
+
ETAPA
+
VERSIÓN
+
ÚLTIMA_CONFIRMACION_AUTORITATIVA
```

No se crea una continuación desde una URL sin identidad de tarea e instancia.

##### 9.2. Revalidación

Antes de mostrar o abrir una continuación, el servidor confirma:

- sesión y actor vigentes;
- misma función activa;
- permiso exacto;
- territorio y recurso todavía cubiertos;
- asignación, participación, custodia o responsabilidad todavía válidas;
- estado y etapa compatibles;
- versión no obsoleta;
- dispositivo y soporte fuerte compatibles cuando apliquen;
- ausencia de resultado desconocido pendiente de conciliación.

##### 9.3. Causas de retiro

| Causa                              | Tratamiento                                                             | Destino documental                         |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| instancia cerrada                  | retirar de recientes; conservar acceso histórico solo si existe permiso | contrato del proceso propietario           |
| reasignación o pérdida de custodia | retirar acción y actualizar propietario                                 | contrato de asignación o custodia          |
| territorio fuera de cobertura      | retirar datos y acción                                                  | contratos de contexto y autorización       |
| permiso o función revocados        | invalidar la proyección y resolver nuevamente                           | contrato de página inicial y autorización  |
| etapa incompatible                 | sustituir por la siguiente tarea válida si existe                       | contrato del flujo propietario             |
| conflicto de versión               | bloquear mutación, recargar y presentar el estado específico            | paquete de implementación NEXO             |
| dispositivo incompatible           | retirar la entrada sin sugerir bypass                                   | contrato de dispositivo compartido         |
| resultado de escritura desconocido | conciliar por identidad o idempotencia antes de permitir otro intento   | contrato del flujo e implementación        |
| evidencia técnica indisponible     | no inferir denegación ni cierre; presentar indisponibilidad recuperable | paquete de implementación y observabilidad |

Las causas anteriores no quedan como pendientes narrativos: cada una conserva
contrato propietario y condición de salida verificable.

---

#### 10. Comportamiento responsive y accesible

##### 10.1. Móvil

- acción primaria y siguiente tarea antes del primer desplazamiento largo;
- máximo tres tareas frecuentes visibles antes de `Ver todas las tareas`;
- continuaciones recientes después del trabajo frecuente y antes de familias;
- una columna y objetivos táctiles aptos para operación física;
- ninguna acción crítica depende de hover o gesto oculto.

##### 10.2. Tablet

- contexto, siguiente tarea y hasta cuatro tareas frecuentes visibles sin
  convertir la pantalla en tablero supervisor;
- escaneo e impresión únicamente desde la tarea que los requiere;
- orientación y tamaño no cambian prioridad, autorización ni cantidad máxima.

##### 10.3. Escritorio

- máximo dos columnas;
- el espacio adicional no muestra más tareas frecuentes, configuración ni
  trabajo ajeno;
- `Todas las tareas disponibles` conserva agrupación por familia y orden de
  lectura equivalente.

##### 10.4. Accesibilidad

- el foco sigue el orden de las ocho zonas;
- la acción primaria y la siguiente tarea tienen nombre y propósito estables;
- la razón de prioridad no depende solo de color o posición;
- un cambio de orden autoritativo se anuncia sin mover el foco;
- cada conteo tiene etiqueta, unidad y contexto;
- `Ver todas las tareas` es operable por teclado y conserva el grupo activo;
- los estados vacíos y fallos mantienen encabezado y recuperación accesibles;
- las utilidades contextuales retornan al mismo elemento de la tarea invocante.

---

#### 11. `NEXO-FREQUENT-TASK-STATE-CONTRACT-001`

| Estado                              | Condición                                                           | Presentación obligatoria                                                       | Acción permitida                                              |
| ----------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `RESOLVIENDO_CONTEXTO`              | actor, función o contexto todavía no concluyentes                   | estructura mínima sin tareas, conteos ni datos empresariales                   | esperar, cancelar o completar interacción autorizada          |
| `CARGANDO_NAVEGACION`               | contexto resuelto y conjunto elegible todavía en carga              | contexto visible, jerarquía estable y controles deshabilitados                 | esperar o cancelar navegación                                 |
| `NAVEGACION_LISTA`                  | conjunto elegible, orden y frescura completos                       | acción primaria, siguiente tarea, frecuentes, recientes y familias autorizadas | ejecutar solo comandos incluidos en la respuesta autoritativa |
| `SIN_TAREAS_FRECUENTES_ELEGIBLES`   | consulta concluyente sin candidatos frecuentes                      | vacío válido; conservar acción primaria y tareas secundarias autorizadas       | abrir una tarea secundaria o acción primaria válida           |
| `DATOS_PARCIALES`                   | una zona falló o perdió frescura mientras otras siguen confirmadas  | identificar zona afectada y último dato confirmado                             | lectura segura y reintento de consulta                        |
| `CONTINUACION_RECIENTE_OBSOLETA`    | una instancia reciente dejó de ser válida                           | retirarla, explicar actualización sin revelar causa sensible                   | abrir la siguiente tarea válida o refrescar                   |
| `AUTORIZACION_REVOCADA`             | permiso, función, territorio, sesión o actor dejaron de ser válidos | retirar tareas, datos y acciones de la proyección anterior                     | resolver contexto o recuperación canónica                     |
| `CONFLICTO_DE_VERSION`              | tarea o recurso cambió respecto de la versión presentada            | bloquear mutación y mostrar que el trabajo fue actualizado                     | recargar fuente autoritativa                                  |
| `INDISPONIBILIDAD_TECNICA`          | no existe decisión estable por error o dependencia indisponible     | mensaje técnico recuperable, sin convertirlo en denegación o vacío             | reintentar consulta cuando sea seguro                         |
| `RESULTADO_DE_MUTACION_DESCONOCIDO` | una escritura no tiene receipt concluyente                          | mantener identidad, impedir repetición automática y explicar conciliación      | consultar resultado por identidad o idempotencia              |

Reglas transversales:

- ausencia de tareas frecuentes no equivale a ausencia de autorización;
- una denegación no se presenta como indisponibilidad técnica;
- una indisponibilidad no se degrada a una lista vacía;
- datos parciales no se completan con cero o valores estimados;
- una continuación obsoleta no permanece accionable;
- un resultado desconocido nunca se presenta como éxito ni se reintenta a
  ciegas;
- la lista completa conserva solo tareas todavía autorizadas.

---

#### 12. Seguridad, privacidad y minimización

1. La navegación recibe un conjunto ya filtrado por autorización; no solicita
   opciones globales para ocultarlas en el navegador.
2. La frecuencia no se usa para conceder permisos ni saltar comprobaciones.
3. Cada apertura y acción revalida actor, función, permiso, territorio,
   recurso, etapa y versión.
4. El historial de recurrencia se limita al actor, función y territorio
   aplicables y no se expone como métrica de desempeño.
5. No se muestran claves de permiso, reason codes internos, nombres de tabla,
   trazas ni rutas técnicas como etiquetas.
6. La simulación, cuando sea admisible, permanece separada y no produce efectos
   reales.
7. Cambiar función, actor o dispositivo invalida orden, recientes y caché de la
   proyección anterior.
8. Las tareas contextuales no aparecen en menús, búsquedas globales ni listas
   frecuentes.
9. Sensibilidad y masking se aplican antes de construir etiquetas, subtítulos,
   conteos o previews.
10. Una tarea sin datos suficientes se omite o muestra estado seguro; nunca se
    completa con información de otro territorio o actor.

---

#### 13. Estado técnico y brecha de implementación

| Elemento                                  | Estado documental        | Evidencia permitida                                     | Condición de salida                                 |
| ----------------------------------------- | ------------------------ | ------------------------------------------------------- | --------------------------------------------------- |
| catálogo de 29 tareas y 8 familias        | `ESPECIFICADO`           | `NEXO-NAVIGATION-TASK-CATALOG-001`                      | conservar identidades en prototipo e implementación |
| composición de 8 contextos                | `ESPECIFICADO`           | `NEXO-ACTOR-TASK-COMPOSITION-MATRIX-001`; `AUTH-UI-052` | consumo íntegro por el resolutor                    |
| disposición de las 29 tareas              | `ESPECIFICADO`           | esta tarea                                              | `AUTH-UI-054`, prototipo e implementación           |
| precedencia y señales de frecuencia       | `ESPECIFICADO`           | esta tarea                                              | implementación server-side y pruebas                |
| eventos de recurrencia y continuidad      | `NO_IMPLEMENTADO`        | no existe evidencia aprobada de instrumentación         | paquete de implementación NEXO                      |
| navegación física según tareas frecuentes | `NO_IMPLEMENTADO`        | no existe evidencia aprobada en esta tarea              | paquete de implementación NEXO                      |
| prototipo de navegación                   | `NO_IMPLEMENTADO`        | no existe evidencia aprobada en esta tarea              | `AUTH-UI-055`                                       |
| validación con usuarios                   | `PENDIENTE_DE_EVIDENCIA` | no ejecutada                                            | `AUTH-UI-056` a `AUTH-UI-060`                       |

La existencia de rutas y pantallas actuales no demuestra que la jerarquía,
orden, frecuencia, reanudación o estados aquí definidos estén implementados.

---

#### 14. Criterios de aceptación

La tarea se considera documentalmente completa cuando se confirme que:

- las ocho familias y las veintinueve tareas conservan identidad y etiqueta;
- las veintinueve tareas tienen una disposición base explícita;
- los ocho contextos tienen acción primaria, candidatos, secundarios y
  ocultamientos explícitos;
- la frecuencia solo ordena tareas previamente autorizadas;
- trabajo activo, custodia, riesgo, vencimiento y bloqueo preceden a la
  recurrencia;
- la recurrencia utiliza evidencia server-side del mismo actor, función y
  territorio;
- la acción primaria, la siguiente tarea, frecuentes y recientes no se
  duplican;
- se muestran máximo cuatro tareas frecuentes y máximo tres continuaciones
  recientes;
- las tareas restantes permanecen accesibles por familia cuando siguen
  autorizadas;
- multifunción usa una única función activa y no mezcla señales;
- el dispositivo compartido exige actor humano y limita tareas compatibles;
- resolutores, acceso, escáner, kioscos, códigos y aliases permanecen
  contextuales y fuera del menú;
- diez estados distinguen carga, vacío, parcialidad, obsolescencia, revocación,
  conflicto, indisponibilidad y resultado desconocido;
- móvil, tablet y escritorio conservan la misma autoridad y jerarquía;
- no se crean rutas, roles, funciones, procesos, permisos ni requisitos de
  prueba;
- toda brecha conserva propietario y condición de salida;
- `AUTH-UI-054` permanece únicamente reservada.

---

#### 15. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: esta tarea materializa la presentación y el orden de las ocho
familias, las veintinueve tareas, los ocho contextos, los cuatro grupos, la
reanudación y los estados ya protegidos por los contratos y requisitos vigentes
de navegación, página inicial, autorización y dispositivo compartido. No crea
una capacidad, ruta, permiso, transición, dato o efecto nuevo; tampoco modifica,
difiere, descarta ni declara obsoleto ningún requisito histórico. El Registro
Canónico de Requisitos de Prueba no cambia.

---

#### 16. `NEXO-FREQUENT-TASK-HANDOFF-001`

| Destino                        | Handoff aprobado                                                                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH-UI-054`                  | reducir opciones irrelevantes consumiendo la disposición de las 29 tareas, los máximos, los ocultamientos y las señales definidas aquí, sin eliminar autoridad |
| `AUTH-UI-055`                  | crear prototipos que materialicen las ocho zonas, ocho contextos, jerarquía responsive y estados sin inventar resultados de uso                                |
| `AUTH-UI-056`                  | validar el prototipo sin presentar inspección documental o telemetría inexistente como prueba con usuarios                                                     |
| `AUTH-UI-057` a `AUTH-UI-060`  | definir criterios, probar, registrar problemas y aprobar pantallas con evidencia real                                                                          |
| paquete de implementación NEXO | construir resolutor, consultas, eventos, almacenamiento de recientes, orden, componentes, pruebas y observabilidad cuando la continuidad lo autorice           |

Ningún destino anterior se inicia mediante esta tarea.

---

#### 17. Traza histórica del carril NEXO

> Esta fotografía dejó de ser continuidad vigente. Se conserva únicamente como evidencia de la ejecución parcial que originó los artefactos NEXO.

**ÚLTIMA TAREA APROBADA**

`AUTH-UI-052 — Diseñar página inicial según actor`

**TAREA ACTUAL APROBADA**

`AUTH-UI-053 — Diseñar navegación según tareas frecuentes`

**SIGUIENTE TAREA RESERVADA**

`AUTH-UI-054 — Reducir opciones irrelevantes`


### [ ] AUTH-UI-054 — Reducir opciones irrelevantes

**Estado:** NO INICIADA; evidencia parcial NEXO conservada
**Tarea anterior:** `AUTH-UI-053 — Diseñar navegación según tareas frecuentes` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-055 — Crear prototipo por rol` — NO INICIADA
**Tipo de tarea:** documental global; reducción de opciones de cada aplicación según relevancia autoritativa, función activa, trabajo vigente, disposición canónica, recurrencia válida, modalidad de dispositivo y necesidad de descubrimiento secundario
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Evidencia parcial inspeccionada:** `vento-nexo`, `NEXO-ROUTE-001` — `/`
**Ruta vigente:** flujo canónico integral; el carril `NEXO-REMISSIONS-001` queda únicamente como procedencia histórica de la evidencia NEXO
**Cambios físicos autorizados:** ninguno; no modifica código, rutas, permisos, roles, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues

---

#### 1. Propósito

Reducir las opciones visibles de NEXO hasta conservar únicamente aquellas que
son relevantes para el actor efectivo, la función activa, el contexto vigente,
el trabajo disponible y la superficie utilizada, sin eliminar tareas
canónicas, ocultar trabajo autorizado ni convertir la presentación en una
fuente de autoridad.

La regla canónica es:

```text
CONJUNTO DE TAREAS AUTORIZADAS
+
FUNCIÓN ACTIVA Y CONTEXTO VIGENTE
+
TRABAJO, RESPONSABILIDAD, CUSTODIA, HANDOFF Y BLOQUEOS REALES
+
DISPOSICIÓN CANÓNICA Y RELEVANCIA PARA LA SUPERFICIE
+
DEDUCCIÓN DE DUPLICADOS Y AGRUPACIÓN POR INTENCIÓN HUMANA
→
SOLO LAS OPCIONES NECESARIAS EN EL NIVEL ADECUADO
```

Reducir no significa revocar. Una tarea autorizada puede salir del primer
nivel, permanecer dentro de su familia o mostrarse únicamente dentro de otra
tarea. La ausencia visual nunca modifica permisos, asignaciones, territorio,
responsabilidad, custodia, estado empresarial ni capacidad de acceso directo
cuando este último continúe autorizado y sea revalidado por el servidor.

---

#### 2. Resultado material

Se materializan siete artefactos documentales consumibles:

1. `NEXO-OPTION-RELEVANCE-CONTRACT-001`, que define relevancia, exclusión,
   descenso de nivel, conservación y autoridad;
2. `NEXO-OPTION-REDUCTION-LAYER-CATALOG-001`, que define cinco niveles de
   presentación y una salida fuera de la proyección;
3. `NEXO-ACTOR-OPTION-REDUCTION-MATRIX-001`, que decide el tratamiento para los
   ocho contextos aprobados;
4. `NEXO-TASK-REDUCTION-REGISTER-001`, que materializa una decisión explícita
   para las veintinueve tareas canónicas;
5. `NEXO-OPTION-DEDUPE-AND-COLLAPSE-CONTRACT-001`, que elimina duplicación entre
   acción primaria, siguiente tarea, frecuentes, recientes, familias y pasos;
6. `NEXO-OPTION-REDUCTION-STATE-CONTRACT-001`, que define diez estados de
   presentación y recuperación;
7. `NEXO-OPTION-REDUCTION-HANDOFF-001`, que entrega las decisiones al prototipo
   y a la implementación posterior sin iniciar dichas tareas.

Cobertura materializada:

| Elemento                                  | Total esperado | Total materializado | Faltantes | Duplicados |
| ----------------------------------------- | -------------: | ------------------: | --------: | ---------: |
| Familias de tareas canónicas              |              8 |                   8 |         0 |          0 |
| Tareas humanas o resolutores              |             29 |                  29 |         0 |          0 |
| Contextos de actor, función y dispositivo |              8 |                   8 |         0 |          0 |
| Grupos humanos conservados                |              4 |                   4 |         0 |          0 |
| Niveles de presentación                   |              5 |                   5 |         0 |          0 |
| Salidas fuera de la proyección            |              1 |                   1 |         0 |          0 |
| Estados de presentación                   |             10 |                  10 |         0 |          0 |
| Rutas, roles, funciones o permisos nuevos |              0 |                   0 |         0 |          0 |
| Requisitos de prueba nuevos o modificados |              0 |                   0 |         0 |          0 |

El resultado queda `ESPECIFICADO`. No se declara `IMPLEMENTADO`, `VALIDADO` ni
disponible en producción.

---

#### 3. Decisiones y contratos consumidos

La tarea consume sin modificar:

- `NEXO-ACTOR-HOME-PAGE-CONTRACT-001`;
- `NEXO-ACTOR-HOME-RESOLUTION-MATRIX-001`;
- `NEXO-ACTOR-HOME-COMPOSITION-MATRIX-001`;
- `NEXO-ACTOR-HOME-INFORMATION-ARCHITECTURE-001`;
- `NEXO-ACTOR-HOME-PRIORITY-CONTRACT-001`;
- `NEXO-FREQUENT-TASK-NAVIGATION-CONTRACT-001`;
- `NEXO-FREQUENCY-SIGNAL-CONTRACT-001`;
- `NEXO-ACTOR-FREQUENT-TASK-MATRIX-001`;
- `NEXO-TASK-PLACEMENT-REGISTER-001`;
- `NEXO-RECENT-CONTINUATION-CONTRACT-001`;
- `NEXO-FREQUENT-TASK-STATE-CONTRACT-001`;
- `NEXO-TASK-NAVIGATION-CONTRACT-001`;
- `NEXO-NAVIGATION-TASK-CATALOG-001`;
- `NEXO-ACTOR-TASK-COMPOSITION-MATRIX-001`;
- `NEXO-ROUTE-TO-TASK-REGISTRY-001`;
- `NEXO-NAVIGATION-ENTRY-RETURN-CONTRACT-001`;
- `NEXO-CONTEXTUAL-UTILITY-CONTRACT-001`;
- `NEXO-NAVIGATION-STATE-CONTRACT-001`;
- los contratos de inicio de solicitante, bodega, conductor, receptor y
  supervisor;
- los contratos vigentes de autorización, contexto, sensibilidad, masking,
  dispositivo compartido y estados interactivos auxiliares;
- los requisitos `TREQ-NEXO-050` a `TREQ-NEXO-090` y requisitos relacionados
  vigentes.

No se cambia la identidad, etiqueta, familia, carril, grupo, audiencia,
responsable, disposición base o regla de exposición de ninguna tarea
consumida.

---

#### 4. Alcance y límites

##### 4.1. Incluido

- eliminación de opciones no autorizadas antes de construir la presentación;
- retiro de opciones incompatibles con la función, territorio, recurso, etapa,
  trabajo o dispositivo vigentes;
- descenso de tareas autorizadas pero no prioritarias a su familia humana;
- conservación de una acción primaria y una siguiente tarea sin duplicación;
- máximo cuatro tareas frecuentes y tres continuaciones recientes;
- ocultamiento de resolutores, utilidades y pasos que no son tareas humanas;
- colapso de rutas, instancias y accesos que representan la misma intención;
- decisión explícita para las veintinueve identidades canónicas;
- tratamiento de los ocho contextos aprobados;
- comportamiento de familias vacías, datos parciales, revocación y cambio de
  función;
- reglas responsive, accesibilidad, seguridad, privacidad y minimización.

##### 4.2. Excluido

- eliminar tareas del catálogo canónico;
- retirar rutas físicas o bindings aprobados;
- revocar permisos, asignaciones, capacidades o territorios;
- diseñar el prototipo visual final;
- validar con usuarios;
- modificar el selector de aplicaciones del ecosistema;
- implementar resolutores, consultas, eventos, cachés, componentes o
  telemetría;
- cambiar el modelo de autorización o usar la navegación como guard final;
- publicar métricas de productividad individual;
- ejecutar cambios de código, datos, Supabase o despliegue.

---

#### 5. `NEXO-OPTION-RELEVANCE-CONTRACT-001`

##### 5.1. Definición de relevancia

Una opción es relevante para una proyección cuando cumple simultáneamente:

```text
TAREA CANÓNICA VIGENTE
+
ACTOR EFECTIVO Y FUNCIÓN ACTIVA
+
PERMISO EXACTO
+
TERRITORIO, RECURSO, ETAPA Y ESTADO COMPATIBLES
+
RELACIÓN OPERATIVA, ASIGNACIÓN, CUSTODIA O RESPONSABILIDAD CUANDO APLIQUE
+
DISPOSITIVO Y SESIÓN COMPATIBLES
+
DISPOSICIÓN BASE ADMISIBLE EN LA SUPERFICIE
+
NECESIDAD ACTUAL, CONTINUIDAD VÁLIDA O DESCUBRIMIENTO SECUNDARIO JUSTIFICADO
```

La tarea se excluye de la proyección cuando falla cualquiera de los componentes
obligatorios. La exclusión ocurre antes de enviar etiquetas, conteos, datos o
acciones al cliente.

##### 5.2. Resultados posibles

Cada tarea autorizada recibe exactamente uno de estos resultados por render:

| Resultado                  | Significado                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `DESTACAR`                 | ocupa acción primaria o siguiente tarea por una decisión autoritativa vigente                                      |
| `MOSTRAR_FRECUENTE`        | aparece dentro del máximo de cuatro tareas frecuentes después de elegibilidad y deduplicación                      |
| `MOSTRAR_RECIENTE`         | representa una instancia reanudable dentro del máximo de tres continuaciones recientes                             |
| `CONSERVAR_EN_FAMILIA`     | permanece disponible en el grupo y familia humanos sin competir en el primer nivel                                 |
| `INVOCAR_SOLO_EN_CONTEXTO` | se abre desde una tarea invocante y permanece fuera de listas globales                                             |
| `EXCLUIR_DE_PROYECCION`    | no forma parte de la proyección por falta de autoridad, función, contexto, trabajo, compatibilidad o aplicabilidad |

`EXCLUIR_DE_PROYECCION` no se representa mediante una tarjeta deshabilitada,
un candado, un conteo cero o una etiqueta “sin acceso”. La opción simplemente no
forma parte de esa proyección. Los estados de denegación se reservan para una
solicitud explícita o acceso directo ya realizado.

##### 5.3. Reglas de conservación

- una tarea autorizada sin prioridad ni recurrencia se conserva en su familia;
- una tarea de configuración nunca se conserva en una función operativa por el
  solo hecho de que el actor posea otra función administrativa;
- una referencia contextual se muestra dentro de la tarea que la necesita, no
  como acceso global;
- una tarea sin trabajo actual puede conservarse si permite iniciar una acción
  autorizada o si su descubrimiento secundario está aprobado;
- una tarea que requiere una instancia, asignación o custodia no se muestra
  cuando no existe una relación vigente;
- una opción visible no prueba que una mutación continúe autorizada; cada
  comando revalida el contrato completo.

##### 5.4. Señales que no justifican relevancia

No justifican mostrar una opción:

- que exista una página o un `href`;
- que la pantalla esté registrada o activa;
- que el usuario la haya visitado anteriormente;
- que otro actor de la sede la utilice;
- que el rol tenga un nombre parecido a la tarea;
- que la aplicación pueda renderizar el componente;
- que exista un conteo parcial o desconocido;
- que la tarea sea popular globalmente;
- que el dispositivo haya usado esa función antes;
- que una lista local del cliente la considere disponible.

---

#### 6. `NEXO-OPTION-REDUCTION-LAYER-CATALOG-001`

La presentación utiliza cinco niveles y una salida fuera de la proyección:

| Nivel | Identidad              | Capacidad máxima | Contenido                                                                                     | Regla de reducción                                                                                         |
| ----: | ---------------------- | ---------------: | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
|     0 | Acción primaria        |                1 | comando o entrada principal de la proyección activa                                           | se oculta cuando no existe acción autorizada; nunca se sustituye con una opción de otra función            |
|     1 | Siguiente tarea        |                1 | tarea o instancia prioritaria resuelta autoritativamente                                      | no se duplica en frecuentes, recientes o familias destacadas                                               |
|     2 | Frecuentes y recientes |            4 + 3 | tareas recurrentes elegibles e instancias recientes revalidadas                               | se llenan solo después de retirar duplicados, obsoletas, incompatibles y opciones sin evidencia suficiente |
|     3 | Familias disponibles   |         variable | tareas restantes autorizadas bajo Mi trabajo, Consultar y controlar o Administrar             | se ocultan familias vacías y se conservan etiquetas humanas                                                |
|     4 | Contexto de la tarea   |         variable | referencias, utilidades, pasos, impresión, escaneo o acciones auxiliares necesarias           | solo aparece dentro de la tarea invocante y conserva retorno                                               |
| fuera | Fuera de la proyección |                0 | tareas no autorizadas, incompatibles, no aplicables, revocadas o técnicas sin tarea invocante | no se envían como opciones ni se convierten en elementos deshabilitados                                    |

Reglas adicionales:

1. el nivel inferior no repite una identidad ya materializada en un nivel
   superior;
2. el espacio adicional del escritorio no aumenta los máximos;
3. una familia vacía no se muestra con cero elementos;
4. “Todas las tareas disponibles” contiene únicamente tareas autorizadas y no
   rutas técnicas;
5. el acceso a un paso o detalle ocurre desde su tarea, no desde una opción
   adicional;
6. una opción retirada por revocación desaparece antes de permitir otra acción;
7. cambiar actor, función, sede, área, turno o dispositivo recalcula todos los
   niveles desde cero.

---

#### 7. `NEXO-ACTOR-OPTION-REDUCTION-MATRIX-001`

| Caso          | Contexto activo                         | Primer nivel permitido                                                                                           | Descubrimiento secundario permitido                                      | Exclusiones obligatorias                                                                                      | Resultado      |
| ------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | -------------- |
| `RED-CTX-001` | solicitante autorizado                  | `NEXO-TASK-003`; `NEXO-TASK-002` o continuaciones propias cuando exista trabajo vigente                          | `NEXO-TASK-013` únicamente con lectura necesaria y autorizada            | preparación, transporte, recepción, supervisión, configuración, trabajo ajeno y utilidades globales           | `ESPECIFICADO` |
| `RED-CTX-002` | bodeguero o preparador autorizado       | `NEXO-TASK-004`; `NEXO-TASK-007` a `NEXO-TASK-011` según trabajo, prioridad y recurrencia                        | `NEXO-TASK-013` a `NEXO-TASK-016` cuando apoyen una tarea o lectura      | conducción, recepción ajena, decisión supervisora, administración y opciones de otra sede o área              | `ESPECIFICADO` |
| `RED-CTX-003` | conductor o custodio autorizado         | `NEXO-TASK-005` y continuaciones válidas de custodia, tránsito, entrega, incidencia o retorno                    | referencias mínimas de carga, ruta, sello y evidencia dentro de la tarea | solicitud, picking, recepción, ajustes, configuración, trabajo sin asignación y consultas globales            | `ESPECIFICADO` |
| `RED-CTX-004` | receptor autorizado                     | `NEXO-TASK-006`; `NEXO-TASK-007` cuando el origen empresarial y la autorización lo permitan                      | `NEXO-TASK-013` y `NEXO-TASK-015` como referencias necesarias            | conducción, preparación, decisiones supervisoras, configuración, otras sedes o destinos y utilidades globales | `ESPECIFICADO` |
| `RED-CTX-005` | supervisor con cobertura territorial    | `NEXO-TASK-012`; tareas `NEXO-TASK-013` a `NEXO-TASK-017` y `NEXO-TASK-026` cuando exista caso o señal admisible | referencias y evidencia dentro de cobertura                              | mutaciones operativas, configuración no concedida, datos fuera de cobertura y métricas individuales           | `ESPECIFICADO` |
| `RED-CTX-006` | configurador autorizado                 | `NEXO-TASK-021`; `NEXO-TASK-020`, `NEXO-TASK-022` a `NEXO-TASK-025` y `NEXO-TASK-027` según capacidad exacta     | referencias indispensables para evaluar impacto                          | ejecución física, supervisión, colas operativas, trabajo concreto ajeno y capacidades no concedidas           | `ESPECIFICADO` |
| `RED-CTX-007` | persona con varias funciones            | únicamente opciones de una función activa                                                                        | selector de funciones autorizadas, sin datos de las otras proyecciones   | mezcla de tareas, frecuencia compartida, herencia de autoridad, acciones cruzadas y autoaprobación            | `ESPECIFICADO` |
| `RED-CTX-008` | dispositivo compartido con actor activo | tareas compatibles con actor, función, turno, contexto y capacidades máximas del dispositivo                     | utilidades requeridas por la tarea vigente                               | administración, información sensible no necesaria, funciones incompatibles y toda acción sin actor atribuible | `ESPECIFICADO` |

Reconciliación:

```text
EXPECTED_CONTEXTS = 8
MATERIALIZED_CONTEXTS = 8
UNIQUE_CONTEXT_IDS = 8
MISSING_CONTEXTS = 0
DUPLICATE_CONTEXTS = 0
```

---

#### 8. `NEXO-TASK-REDUCTION-REGISTER-001`

Cada identidad conserva su etiqueta, familia y disposición base aprobadas. La
columna de reducción materializa qué debe ocurrir cuando la tarea no ocupa su
posición máxima dentro de la proyección activa.

| Tarea           | Etiqueta humana                   | Disposición base             | Conservación máxima               | Reducción obligatoria cuando no aplica el máximo                                                                               | Resultado      |
| --------------- | --------------------------------- | ---------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `NEXO-TASK-001` | Ir al inicio                      | `HOME_ONLY`                  | retorno o resolución de inicio    | no se presenta como opción dentro de la propia superficie inicial                                                              | `ESPECIFICADO` |
| `NEXO-TASK-002` | Gestionar abastecimiento interno  | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | se conserva en Mi trabajo solo si el actor participa; sin etapa propia se excluye                                              | `ESPECIFICADO` |
| `NEXO-TASK-003` | Solicitar abastecimiento          | `PRIMARY_FIXED`              | acción primaria o continuación    | sin autorización de creación ni solicitud propia continuable se excluye; nunca baja a otro actor                               | `ESPECIFICADO` |
| `NEXO-TASK-004` | Preparar abastecimiento           | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin preparación, picking, faltante o handoff atribuible se conserva solo si puede iniciarse autorizadamente; si no, se excluye | `ESPECIFICADO` |
| `NEXO-TASK-005` | Transportar abastecimiento        | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin asignación, custodia, ruta o trabajo iniciable autorizado se excluye                                                       | `ESPECIFICADO` |
| `NEXO-TASK-006` | Recibir abastecimiento            | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin entrega, handoff, recepción atribuible o capacidad de inicio autorizada se excluye                                         | `ESPECIFICADO` |
| `NEXO-TASK-007` | Registrar una entrada             | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin fuente empresarial o excepción autorizada se conserva en Mi trabajo solo si puede iniciarse; en otro caso se excluye       | `ESPECIFICADO` |
| `NEXO-TASK-008` | Ubicar existencias                | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin existencia pendiente ni capacidad de inicio autorizada se conserva en Mi trabajo o se excluye según la función             | `ESPECIFICADO` |
| `NEXO-TASK-009` | Mover existencias                 | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin traslado vigente se conserva en Mi trabajo únicamente cuando puede iniciarse en el territorio                              | `ESPECIFICADO` |
| `NEXO-TASK-010` | Registrar un retiro               | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin retiro vigente se conserva en Mi trabajo únicamente cuando existe capacidad de inicio                                      | `ESPECIFICADO` |
| `NEXO-TASK-011` | Contar inventario                 | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin sesión o campaña asignada se conserva solo si puede iniciarse autorizadamente; captura y control no se mezclan             | `ESPECIFICADO` |
| `NEXO-TASK-012` | Controlar la operación            | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin caso, bloqueo, vencimiento o responsabilidad se conserva en Consultar y controlar si la lectura continúa autorizada        | `ESPECIFICADO` |
| `NEXO-TASK-013` | Consultar existencias             | `FREQUENT_CANDIDATE`         | frecuente                         | sin señal suficiente permanece en Consultar y controlar; fuera del territorio se excluye                                       | `ESPECIFICADO` |
| `NEXO-TASK-014` | Investigar movimientos            | `FREQUENT_CANDIDATE`         | frecuente                         | sin caso ni recurrencia permanece en Consultar y controlar; sin lectura autorizada se excluye                                  | `ESPECIFICADO` |
| `NEXO-TASK-015` | Consultar ubicaciones             | `FREQUENT_CANDIDATE`         | frecuente                         | sin necesidad ni recurrencia permanece en Consultar y controlar; edición no se añade                                           | `ESPECIFICADO` |
| `NEXO-TASK-016` | Consultar contenedores logísticos | `SECONDARY_DISCOVERABLE`     | familia secundaria                | se mantiene en Consultar y controlar únicamente con permiso y contexto LPN; nunca sube sin señal propietaria                   | `ESPECIFICADO` |
| `NEXO-TASK-017` | Gestionar activos                 | `FREQUENT_CANDIDATE`         | frecuente                         | sin trabajo ni recurrencia permanece en su familia; fuera de la función o territorio se excluye                                | `ESPECIFICADO` |
| `NEXO-TASK-018` | Capturar activos                  | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin captura pendiente ni capacidad de inicio autorizada se conserva en Mi trabajo o se excluye                                 | `ESPECIFICADO` |
| `NEXO-TASK-019` | Contar activos                    | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin sesión compatible se conserva solo si puede iniciarse; captura y cierre permanecen separados                               | `ESPECIFICADO` |
| `NEXO-TASK-020` | Configurar activos                | `SECONDARY_DISCOVERABLE`     | familia de configuración          | se conserva únicamente en Administrar con capacidad exacta; en toda función operativa se excluye                               | `ESPECIFICADO` |
| `NEXO-TASK-021` | Administrar NEXO                  | `PRIMARY_RESOLVED_CANDIDATE` | acción o siguiente administrativa | sin capacidad administrativa se excluye; con una sola capacidad resuelve directamente y no añade un menú intermedio            | `ESPECIFICADO` |
| `NEXO-TASK-022` | Administrar productos y unidades  | `FREQUENT_CANDIDATE`         | frecuente administrativa          | sin recurrencia permanece en Administrar; en funciones operativas se excluye                                                   | `ESPECIFICADO` |
| `NEXO-TASK-023` | Administrar ubicaciones           | `FREQUENT_CANDIDATE`         | frecuente administrativa          | sin recurrencia permanece en Administrar; no se confunde con ubicar existencias                                                | `ESPECIFICADO` |
| `NEXO-TASK-024` | Configurar abastecimiento         | `FREQUENT_CANDIDATE`         | frecuente administrativa          | sin recurrencia permanece en Administrar; no muestra solicitudes concretas como opciones                                       | `ESPECIFICADO` |
| `NEXO-TASK-025` | Configurar referencias internas   | `SECONDARY_DISCOVERABLE`     | familia de configuración          | se conserva solo con permiso financiero o de referencia exacto; no sube por actividad operativa                                | `ESPECIFICADO` |
| `NEXO-TASK-026` | Controlar impresión               | `PRIMARY_RESOLVED_CANDIDATE` | siguiente tarea o frecuente       | sin trabajo fallido, bloqueado o pendiente se conserva en Consultar y controlar solo con cobertura autorizada                  | `ESPECIFICADO` |
| `NEXO-TASK-027` | Configurar impresión              | `SECONDARY_DISCOVERABLE`     | familia de configuración          | se conserva únicamente en Administrar con capacidad exacta; nunca aparece por existencia de trabajos                           | `ESPECIFICADO` |
| `NEXO-TASK-028` | Resolver un destino contextual    | `CONTEXTUAL_ONLY`            | contexto de tarea                 | permanece fuera de listas; sin tarea invocante compatible se excluye                                                           | `ESPECIFICADO` |
| `NEXO-TASK-029` | Resolver acceso                   | `CONTEXTUAL_ONLY`            | sistema de acceso                 | permanece fuera de la navegación empresarial; autenticación o denegación se resuelven como estado                              | `ESPECIFICADO` |

Reconciliación:

```text
EXPECTED_TASK_IDS = 29
MATERIALIZED_TASK_IDS = 29
UNIQUE_TASK_IDS = 29
MISSING_TASK_IDS = 0
DUPLICATE_TASK_IDS = 0
```

Distribución heredada y conservada:

| Disposición base             | Cantidad esperada | Cantidad materializada | Diferencia |
| ---------------------------- | ----------------: | ---------------------: | ---------: |
| `HOME_ONLY`                  |                 1 |                      1 |          0 |
| `PRIMARY_FIXED`              |                 1 |                      1 |          0 |
| `PRIMARY_RESOLVED_CANDIDATE` |                14 |                     14 |          0 |
| `FREQUENT_CANDIDATE`         |                 7 |                      7 |          0 |
| `SECONDARY_DISCOVERABLE`     |                 4 |                      4 |          0 |
| `CONTEXTUAL_ONLY`            |                 2 |                      2 |          0 |
| **Total**                    |            **29** |                 **29** |      **0** |

---

#### 9. `NEXO-OPTION-DEDUPE-AND-COLLAPSE-CONTRACT-001`

##### 9.1. Clave de deduplicación

La deduplicación utiliza `task_id` y, cuando existe trabajo concreto,
`instance_id`, función, territorio, etapa y versión. No utiliza únicamente
`href`, etiqueta o componente.

##### 9.2. Precedencia entre zonas

Cuando la misma identidad sea elegible en varias zonas se conserva en la
primera aplicable:

1. acción primaria;
2. siguiente tarea;
3. continuación reciente de una instancia concreta;
4. tarea frecuente agregada;
5. familia secundaria;
6. contexto interno de la tarea.

Una identidad retirada de una zona inferior no pierde sus instancias ni su
capacidad. Solo evita repetir la misma intención.

##### 9.3. Colapso obligatorio

- solicitar, preparar, transportar y recibir permanecen tareas separadas; el
  resolutor de abastecimiento no las duplica como cuatro accesos adicionales;
- una tarea frecuente muestra una entrada agregada; sus instancias concretas
  aparecen únicamente como continuaciones válidas;
- detalle, edición, impresión, escaneo, referencia, configuración subordinada y
  pasos de flujo se abren desde la tarea propietaria;
- una misma ruta vinculada a varias etapas no crea varias opciones si conserva
  una sola intención humana;
- rutas alias, kioscos, códigos y resolutores no aparecen en familias;
- una acción primaria que lleva a la misma tarea que la siguiente tarea se
  presenta una sola vez y conserva el contexto más específico;
- familias con una sola tarea pueden abrir esa tarea directamente sin mostrar
  un nivel intermedio vacío;
- familias sin tareas relevantes se retiran por completo de la proyección.

##### 9.4. Prohibiciones

Queda prohibido:

- mostrar una opción deshabilitada para informar que no existe permiso;
- repetir una tarea con etiquetas distintas por tener varias rutas;
- mostrar una opción genérica y otra específica que resuelven la misma
  instancia;
- completar máximos con tareas irrelevantes;
- mantener una opción reciente después de revocación, cambio de actor, función,
  territorio, etapa, asignación o versión;
- utilizar ocultamiento visual como sustituto de autorización de servidor.

---

#### 10. Familias, descubrimiento y opciones vacías

##### 10.1. Grupos humanos conservados

Los cuatro grupos permanecen en este orden cuando contienen tareas relevantes:

1. Inicio;
2. Mi trabajo;
3. Consultar y controlar;
4. Administrar.

`Inicio` representa retorno y contexto, no una lista adicional. `Administrar`
se excluye de proyecciones operativas salvo que la función activa sea de
configuración. Una persona multifunción cambia explícitamente de función antes
de obtener otro grupo.

##### 10.2. Familias vacías

- una familia con cero tareas relevantes no se renderiza;
- no se muestra un encabezado vacío, un contador cero ni una explicación de
  permisos ausentes;
- si la consulta es parcial, no se declara que la familia está vacía;
- si la familia falla de manera independiente, se identifica la parcialidad y
  se ofrece reintento seguro sin fabricar opciones;
- si todas las familias quedan vacías y la decisión es concluyente, se presenta
  un vacío válido coherente con la función activa.

##### 10.3. Descubrimiento seguro

- las tareas autorizadas pero no destacadas permanecen localizables por su
  familia;
- la búsqueda, cuando exista en implementación posterior, opera únicamente
  sobre el conjunto autorizado y ya minimizado;
- las etiquetas conservan verbo e intención empresarial;
- no se muestran nombres de tablas, permisos, rutas, carpetas o componentes;
- una búsqueda sin resultados no revela la existencia de tareas no autorizadas;
- una tarea infrecuente conserva propósito y contexto suficiente para reingreso
  sin depender de memoria del usuario.

---

#### 11. `NEXO-OPTION-REDUCTION-STATE-CONTRACT-001`

| Estado                           | Condición                                                                                   | Presentación obligatoria                                                        | Opciones permitidas                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `RESOLVIENDO_RELEVANCIA`         | actor, función, contexto o conjunto autorizado todavía no son concluyentes                  | estructura mínima sin opciones, conteos ni familias                             | cancelar o esperar                                     |
| `OPCIONES_LISTAS`                | la decisión es completa y existen tareas relevantes                                         | niveles ordenados, sin duplicados y con contexto visible                        | solo opciones incluidas en la respuesta autoritativa   |
| `ACCION_PRIMARIA_AUSENTE`        | la proyección es válida pero no existe comando principal autorizado                         | contexto y trabajo disponible sin fabricar una acción                           | navegación secundaria autorizada                       |
| `VACIO_VALIDO`                   | la decisión es concluyente y no existe trabajo ni tarea iniciable relevante                 | mensaje de ausencia real, sin accesos alternos ni conteos cero                  | cambio de contexto autorizado o salida segura          |
| `SOLO_DESCUBRIMIENTO_SECUNDARIO` | no existe trabajo destacado, pero permanecen tareas autorizadas dentro de familias          | familias disponibles sin promoverlas artificialmente                            | abrir una tarea secundaria autorizada                  |
| `DATOS_PARCIALES`                | una fuente de trabajo, frecuencia, recientes o familias perdió frescura o falló             | último conjunto confirmado, sección afectada y advertencia de incompletitud     | lectura segura y reintento; no completar con supuestos |
| `CONTEXTO_CAMBIADO_O_REVOCADO`   | actor, función, turno, territorio, dispositivo, asignación o permiso dejaron de ser válidos | retirar inmediatamente opciones y datos previos                                 | resolver nuevamente el contexto                        |
| `OPCION_CAMBIADA_O_RETIRADA`     | tarea o instancia visible dejó de ser relevante antes de abrirse o continuar                | explicar cambio sin presentar culpa ni conservar un control obsoleto            | volver al conjunto recalculado                         |
| `ACCESO_DIRECTO_DENEGADO`        | se solicitó explícitamente una tarea o ruta que no supera la revalidación                   | denegación canónica minimizada, sin revelar opciones elegibles de otros actores | recuperación segura derivada del perfil                |
| `FALLO_TECNICO`                  | no existe una decisión estable por indisponibilidad o error                                 | mensaje recuperable diferenciado de vacío, denegación y revocación              | reintentar consulta cuando sea seguro                  |

Reglas transversales:

- un fallo técnico no se degrada a vacío;
- datos parciales no se completan con cero ni con opciones de una respuesta
  anterior incompatible;
- una denegación explícita no provoca que la opción aparezca deshabilitada en
  renders posteriores;
- una opción retirada invalida su acción antes de presentar el nuevo conjunto;
- un cambio de función elimina frecuencia, recientes y caché de la función
  anterior;
- un resultado desconocido de escritura no se convierte en reciente ni se
  utiliza como señal de frecuencia hasta reconciliarse.

---

#### 12. Responsive y accesibilidad

##### 12.1. Móvil

- acción primaria y siguiente tarea preceden a toda lista;
- frecuentes y recientes mantienen sus máximos y no se expanden por scroll
  horizontal;
- familias secundarias permanecen colapsables con nombre y cantidad accesible;
- utilidades contextuales aparecen dentro de la tarea, no en una barra global;
- ninguna opción depende de hover, gesto oculto o reconocimiento por color.

##### 12.2. Tablet y estación compartida

- la primera vista muestra contexto, siguiente tarea y bloqueo prioritario;
- los objetivos táctiles son compatibles con operación física;
- escaneo, impresión y periféricos aparecen únicamente cuando la tarea los
  requiere;
- cambiar actor retira inmediatamente opciones y datos del actor anterior;
- el dispositivo limita el conjunto máximo, pero no aporta autoridad humana.

##### 12.3. Escritorio

- el espacio adicional permite mejor lectura, no más opciones de primer nivel;
- el sidebar no reproduce todas las rutas autorizadas sin aplicar reducción;
- las familias secundarias no compiten visualmente con la acción primaria;
- configuración y supervisión permanecen fuera de funciones operativas.

##### 12.4. Accesibilidad

- el orden de foco sigue los niveles de presentación;
- la acción primaria tiene nombre y propósito estables;
- cambios de conjunto, opción retirada y revocación se anuncian de forma
  accesible;
- una familia colapsada informa su nombre y estado expandido;
- etiquetas y descripciones no dependen de iconos;
- el vacío, la parcialidad, la denegación y el fallo técnico son distinguibles;
- el cambio de función exige confirmación comprensible y nuevo contexto visible.

---

#### 13. Seguridad, privacidad y minimización

1. El servidor filtra tareas y datos antes de construir la proyección.
2. El cliente no recibe un catálogo global para ocultarlo después.
3. Frecuencia y recientes se calculan únicamente sobre eventos del actor,
   función y territorio aplicables.
4. La lista no revela tareas, conteos, recursos, sedes, actores ni capacidades
   fuera de alcance.
5. Cada acceso y cada comando revalidan actor, función, permiso, territorio,
   recurso, etapa, estado y versión.
6. El ocultamiento no se utiliza como control de seguridad final.
7. La simulación, cuando sea admisible, permanece diferenciada y no produce
   autoridad ni eventos reales de frecuencia.
8. Un dispositivo compartido no conserva opciones, recientes o señales del
   actor anterior.
9. La reducción no expone claves de permiso, reason codes internos, reglas RLS,
   nombres de tablas ni rutas técnicas.
10. Los eventos de navegación no se usan para comparar productividad,
    desempeño o ranking individual.
11. Cerrar sesión o revocar contexto elimina proyección, caché y referencias
    temporales.
12. Un acceso directo no reintroduce una opción excluida ni concede permiso.

---

#### 14. Estado técnico y brecha de implementación

| Elemento                                                      | Estado documental        | Evidencia actual permitida                                                                   | Condición de salida                                                          |
| ------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| catálogo de 29 tareas y 8 familias                            | `ESPECIFICADO`           | `NEXO-NAVIGATION-TASK-CATALOG-001` y `NEXO-TASK-PLACEMENT-REGISTER-001`                      | consumo íntegro en prototipo e implementación                                |
| reducción para 8 contextos                                    | `ESPECIFICADO`           | `NEXO-ACTOR-OPTION-REDUCTION-MATRIX-001`                                                     | prototipo diferenciado y pruebas posteriores                                 |
| decisión individual para 29 tareas                            | `ESPECIFICADO`           | `NEXO-TASK-REDUCTION-REGISTER-001`                                                           | binding físico sin faltantes ni duplicados                                   |
| filtro actual por permiso en shell                            | `IMPLEMENTADO_PARCIAL`   | `vento-nexo` consulta `app_navigation_items` activas y filtra permisos                       | añadir identidad de tarea, relevancia, disposición, prioridad y reducción    |
| agrupación y render actual del sidebar                        | `IMPLEMENTADO_PARCIAL`   | `vento-nexo` agrupa por `group_label` y renderiza todos los elementos recibidos              | consumir una proyección reducida y no una lista de pantallas permitidas      |
| acciones actuales de la superficie inicial                    | `IMPLEMENTADO_PARCIAL`   | `vento-nexo` mantiene una lista local de acciones y reglas de enfoque por rol y tipo de sede | sustituirla por actor, función, tarea y contexto autoritativos               |
| sincronización técnica de pantallas                           | `IMPLEMENTADO_PARCIAL`   | el sincronizador clasifica páginas y candidatos de menú a partir de rutas y registros        | separar inventario técnico de navegación humana y enlazar `task_id` canónico |
| prototipo visual de reducción                                 | `NO_IMPLEMENTADO`        | no existe evidencia aprobada en esta tarea                                                   | `AUTH-UI-055`                                                                |
| validación con usuarios                                       | `PENDIENTE_DE_EVIDENCIA` | no ejecutada                                                                                 | `AUTH-UI-056` a `AUTH-UI-060`                                                |
| implementación de resolutor, consultas, componentes y pruebas | `NO_IMPLEMENTADO`        | fuera de la fase documental actual                                                           | paquete de implementación NEXO autorizado por la continuidad                 |

La existencia de filtros de permiso, grupos de navegación o reglas locales de
foco no demuestra que la reducción aquí definida esté implementada o validada.

---

#### 15. Criterios de aceptación

La tarea se considera documentalmente completa cuando se confirme que:

- las ocho familias y veintinueve tareas conservan sus identidades canónicas;
- los ocho contextos tienen una decisión explícita de reducción;
- cada tarea tiene exactamente una fila y un resultado de conservación o
  exclusión;
- se materializan veintinueve identidades únicas, sin faltantes ni duplicados;
- la distribución heredada de disposiciones suma veintinueve y no cambia;
- la acción primaria y la siguiente tarea no se duplican;
- frecuentes no superan cuatro tareas y recientes no superan tres instancias;
- las tareas autorizadas pero secundarias permanecen accesibles por familia;
- una familia vacía no produce encabezado, conteo cero ni opción deshabilitada;
- tareas no autorizadas o incompatibles no se envían al cliente;
- resolutores, acceso, alias, kioscos, códigos y utilidades permanecen fuera del
  menú empresarial;
- rutas, detalles, edición, referencias y pasos no se convierten en tareas
  adicionales;
- una persona multifunción conserva una sola función activa por proyección;
- el dispositivo compartido no conserva opciones del actor anterior;
- cambiar actor, función o contexto recalcula la proyección completa;
- frecuencia, orden y visibilidad no conceden autoridad;
- acceso directo y comandos revalidan el contrato autoritativo;
- los diez estados distinguen vacío, parcialidad, revocación, retiro,
  denegación y fallo técnico;
- las reglas responsive y de accesibilidad no aumentan opciones ni autoridad;
- no se crean rutas, roles, funciones, permisos, procesos ni requisitos nuevos;
- las brechas técnicas tienen propietario y condición de salida;
- `AUTH-UI-055` permanece únicamente reservada.

---

#### 16. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

Justificación: esta tarea no introduce un comportamiento autorizativo,
operativo, de navegación o de seguridad nuevo. Materializa la reducción y
presentación de las veintinueve tareas ya protegidas por los requisitos
vigentes asociados a los contratos consumidos, en particular las reglas sobre
familias, tareas, contextos, ocultamiento, rutas, utilidades, estados y
separación entre inventario técnico y navegación humana. No modifica, difiere,
descarta ni declara obsoleto ningún requisito histórico, por lo que el Registro
Canónico de Requisitos de Prueba no cambia.

---

#### 17. `NEXO-OPTION-REDUCTION-HANDOFF-001`

| Destino                        | Handoff aprobado                                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH-UI-055`                  | crear prototipos separados por proyección que materialicen los cinco niveles, máximos, familias, ocultamientos, estados y deduplicación aprobados aquí                    |
| `AUTH-UI-056`                  | validar el prototipo sin presentar inspección documental o ejecución técnica como prueba con usuarios                                                                     |
| `AUTH-UI-057`                  | definir criterios de usabilidad por pantalla para relevancia, tiempo de localización, carga cognitiva, recuperación y comprensión                                         |
| `AUTH-UI-058`                  | probar con usuarios reales las proyecciones de solicitante, bodega, conductor, receptor, supervisor, configuración, multifunción y dispositivo compartido                 |
| `AUTH-UI-059`                  | registrar problemas sin cambiar silenciosamente tareas, identidades, permisos, disposiciones o continuidad                                                                |
| `AUTH-UI-060`                  | aprobar cada pantalla únicamente con evidencia real y criterios satisfechos                                                                                               |
| paquete de implementación NEXO | implementar resolutor, bindings, consultas, componentes, estados, caché, eventos, migraciones desde `vento-shell`, pruebas y telemetría cuando la continuidad lo autorice |

Ningún destino anterior se inicia mediante esta tarea.

---

#### 18. Traza histórica del carril NEXO

> Esta fotografía dejó de ser continuidad vigente. Se conserva únicamente como evidencia de la ejecución parcial que originó los artefactos NEXO.

**ÚLTIMA TAREA APROBADA**

`AUTH-UI-053 — Diseñar navegación según tareas frecuentes`

**TAREA ACTUAL APROBADA**

`AUTH-UI-054 — Reducir opciones irrelevantes`

**SIGUIENTE TAREA RESERVADA**

`AUTH-UI-055 — Crear prototipo por rol`


### [ ] AUTH-UI-055 — Crear prototipo por rol

**Estado:** NO INICIADA; evidencia parcial NEXO conservada
**Tarea anterior:** `AUTH-UI-054 — Reducir opciones irrelevantes` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-056 — Validar prototipo antes de implementar` — NO INICIADA
**Tipo de tarea:** documental global; creación de prototipos visuales testeables por aplicación, rol, función, dispositivo y estado crítico
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Evidencia parcial inspeccionada:** `vento-nexo`, `NEXO-ROUTE-001` — `/`
**Ruta vigente:** flujo canónico integral; el carril `NEXO-REMISSIONS-001` queda únicamente como procedencia histórica de la evidencia NEXO
**Cambios físicos autorizados:** ninguno; no modifica código productivo, componentes de aplicación, rutas, permisos, roles, funciones, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues
**Artefacto visual asociado:** `NEXO_PROTOTIPO_TEST_USUARIOS_AUTH_UI_055_057.pptx`
**Instrumento asociado:** cuestionario único `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001`

---

#### 1. Propósito

Crear un prototipo visual no productivo que permita probar con personas reales
las decisiones aprobadas de página inicial, navegación por tareas frecuentes y
reducción de opciones, sin esperar a implementar la aplicación ni conectar
Supabase.

El título canónico conserva “por rol”, pero el prototipo se resuelve por actor
efectivo, función activa, contexto autorizado, trabajo vigente y dispositivo. El
rol visible no concede autoridad.

La regla canónica de esta corrección es:

```text
CONTRATOS APROBADOS AUTH-UI-052 A AUTH-UI-054
+
OCHO CONTEXTOS DE PROYECCIÓN
+
DOS VARIANTES TESTEABLES POR CONTEXTO
+
UN CUESTIONARIO ÚNICO DE OBSERVACIÓN Y PREGUNTAS
→
PROTOTIPO VISUAL SUFICIENTE PARA EJECUTAR AUTH-UI-058
```

No se declara implementación, dato real, despliegue, telemetría, autorización
server-side ni resultado de uso.

---

#### 2. Resultado material

Se materializan nueve artefactos documentales consumibles:

1. `NEXO-TESTABLE-PROTOTYPE-CONTRACT-001`, que define alcance, fidelidad y límites del prototipo;
2. `NEXO-TESTABLE-SCREEN-CATALOG-001`, que materializa dieciséis pantallas testeables;
3. `NEXO-TESTABLE-SCREEN-COMPOSITION-RULES-001`, que fija zonas, contenido y prohibiciones visuales;
4. `NEXO-TESTABLE-SCREEN-FLOW-001`, que define navegación simulada entre pantalla normal, estado de recuperación y formulario;
5. `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001`, que define un único instrumento para todas las pruebas;
6. `NEXO-USABILITY-TASK-PROMPT-REGISTER-001`, que vincula cada pantalla con una tarea breve para el participante;
7. `NEXO-USABILITY-EVIDENCE-MINIMUM-001`, que define la evidencia mínima sin datos sensibles;
8. `NEXO-PROTOTYPE-PACKAGE-HANDOFF-001`, que entrega el paquete a validación interna;
9. `NEXO_PROTOTIPO_TEST_USUARIOS_AUTH_UI_055_057.pptx`, que representa las dieciséis pantallas y el formulario único como material visual navegable.

Cobertura materializada:

| Elemento                                  | Esperado | Materializado | Faltantes | Duplicados |
| ----------------------------------------- | -------: | ------------: | --------: | ---------: |
| Contextos canónicos                       |        8 |             8 |         0 |          0 |
| Pantallas testeables                      |       16 |            16 |         0 |          0 |
| Variantes normales                        |        8 |             8 |         0 |          0 |
| Variantes de recuperación                 |        8 |             8 |         0 |          0 |
| Cuestionarios únicos                      |        1 |             1 |         0 |          0 |
| Prototipos con pregunta asociada          |       16 |            16 |         0 |          0 |
| Rutas productivas nuevas                  |        0 |             0 |         0 |          0 |
| Código, datos o Supabase                  |        0 |             0 |         0 |          0 |
| Requisitos de prueba nuevos o modificados |        0 |             0 |         0 |          0 |

El resultado queda `ESPECIFICADO` y `PROTOTIPO_VISUAL_TESTEABLE_PREPARADO`.

---

#### 3. Decisiones y contratos consumidos

La tarea consume sin modificar:

- `AUTH-UI-052 — Diseñar página inicial según actor`;
- `AUTH-UI-053 — Diseñar navegación según tareas frecuentes`;
- `AUTH-UI-054 — Reducir opciones irrelevantes`;
- las ocho proyecciones de actor, función y dispositivo;
- el catálogo de veintinueve tareas `NEXO-TASK-*`;
- los diez estados de presentación y recuperación;
- los contratos de contexto, autorización, dispositivo compartido, accesibilidad, tacto, seguridad, privacidad, sensibilidad y masking vigentes.

Se preservan las decisiones aprobadas: una sola ruta `/`, una sola proyección
activa, una sola acción primaria, máximos de cuatro frecuentes y tres recientes,
ocultamiento de opciones irrelevantes y separación entre funciones.

---

#### 4. Alcance y límites

##### 4.1. Incluido

- dieciséis pantallas visuales de prueba;
- datos ficticios y no sensibles;
- un formulario único para observar y preguntar;
- navegación simulada suficiente para que la persona intente localizar una acción;
- estados normales y de recuperación;
- material apto para prueba presencial o remota guiada;
- vínculos conceptuales hacia `AUTH-UI-056`, `AUTH-UI-057`, `AUTH-UI-058` y `AUTH-UI-059`.

##### 4.2. Excluido

- implementar la aplicación;
- crear componentes productivos;
- guardar datos en Supabase;
- ejecutar migraciones;
- recolectar telemetría;
- usar datos reales de trabajadores, proveedores, sedes o remisiones;
- validar con usuarios;
- declarar que las pantallas son usables, accesibles o aprobadas;
- iniciar `AUTH-UI-056`, `AUTH-UI-057`, `AUTH-UI-058`, `AUTH-UI-059` o `AUTH-UI-060`.

---

#### 5. `NEXO-TESTABLE-PROTOTYPE-CONTRACT-001`

El prototipo es un artefacto visual de fidelidad media. Debe permitir que una
persona:

1. vea una pantalla suficientemente parecida al producto objetivo;
2. identifique su contexto, función y trabajo esperado;
3. intente encontrar una acción o salida;
4. responda preguntas sobre lo que entendió;
5. muestre confusión, error, duda, tiempo, ayuda o recuperación.

No debe permitir:

- ejecutar mutaciones reales;
- representar datos productivos;
- simular permisos como si fueran autorización real;
- registrar resultados automáticamente;
- sustituir el criterio del evaluador;
- ocultar que es una maqueta.

Cada pantalla mantiene la etiqueta visible `PROTOTIPO DE PRUEBA — SIN EFECTOS REALES`.

---

#### 6. `NEXO-TESTABLE-SCREEN-CATALOG-001`

| Pantalla         | Prototipo        | Variante     | Contexto probado        | Acción que debe encontrar             | Estado o problema simulado           | Pregunta principal al participante                                    |
| ---------------- | ---------------- | ------------ | ----------------------- | ------------------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `SCREEN-055-001` | `PROTO-NEXO-001` | normal       | solicitante autorizado  | crear o continuar solicitud propia    | opciones listas                      | ¿Qué debes hacer primero si necesitas pedir abastecimiento?           |
| `SCREEN-055-002` | `PROTO-NEXO-001` | recuperación | solicitante autorizado  | recuperar solicitud propia            | solicitud propia cambiada o retirada | ¿Qué harías si la solicitud que ibas a continuar cambió?              |
| `SCREEN-055-003` | `PROTO-NEXO-002` | normal       | bodega o preparación    | continuar tarea prioritaria de bodega | preparación asignada                 | ¿Cuál es la siguiente tarea de bodega y por qué?                      |
| `SCREEN-055-004` | `PROTO-NEXO-002` | recuperación | bodega o preparación    | detener o recuperar tarea             | datos parciales o tarea revocada     | ¿Qué harías antes de preparar si falta información o cambió la tarea? |
| `SCREEN-055-005` | `PROTO-NEXO-003` | normal       | conductor o custodio    | abrir transporte asignado             | carga bajo custodia                  | ¿Qué carga está bajo tu responsabilidad y cuál es el siguiente paso?  |
| `SCREEN-055-006` | `PROTO-NEXO-003` | recuperación | conductor o custodio    | recuperar ante pérdida de asignación  | asignación retirada o fallo técnico  | ¿Qué harías si la ruta o asignación desaparece?                       |
| `SCREEN-055-007` | `PROTO-NEXO-004` | normal       | receptor autorizado     | iniciar recepción válida              | entrega atribuida                    | ¿Qué debes verificar antes de recibir?                                |
| `SCREEN-055-008` | `PROTO-NEXO-004` | recuperación | receptor autorizado     | manejar recepción parcial             | diferencia o cantidad incompleta     | ¿Cómo registrarías que no llegó todo?                                 |
| `SCREEN-055-009` | `PROTO-NEXO-005` | normal       | supervisor territorial  | abrir caso prioritario                | bloqueo o vencimiento                | ¿Qué caso atenderías primero y qué información revisarías?            |
| `SCREEN-055-010` | `PROTO-NEXO-005` | recuperación | supervisor territorial  | bloquear decisión insegura            | evidencia insuficiente o conflicto   | ¿Qué harías si no tienes evidencia suficiente para decidir?           |
| `SCREEN-055-011` | `PROTO-NEXO-006` | normal       | configurador autorizado | abrir capacidad administrativa        | configuración prioritaria            | ¿Qué opción administrativa abrirías y qué impacto esperas revisar?    |
| `SCREEN-055-012` | `PROTO-NEXO-006` | recuperación | configurador autorizado | cancelar cambio no confirmado         | cambio pendiente o fallo técnico     | ¿Cómo sales sin afectar operación?                                    |
| `SCREEN-055-013` | `PROTO-NEXO-007` | normal       | persona multifunción    | reconocer función activa              | función activa visible               | ¿Con qué función estás trabajando ahora?                              |
| `SCREEN-055-014` | `PROTO-NEXO-007` | recuperación | persona multifunción    | cambiar función de forma segura       | cambio de función                    | ¿Qué debe desaparecer antes de cambiar de función?                    |
| `SCREEN-055-015` | `PROTO-NEXO-008` | normal       | dispositivo compartido  | continuar tarea compatible            | actor humano activo                  | ¿Quién está usando la estación y qué trabajo puede hacer?             |
| `SCREEN-055-016` | `PROTO-NEXO-008` | recuperación | dispositivo compartido  | cambiar actor sin filtrar datos       | cambio de actor                      | ¿Qué debe limpiarse antes de que entre otra persona?                  |

Reconciliación:

```text
EXPECTED_TESTABLE_SCREENS = 16
MATERIALIZED_TESTABLE_SCREENS = 16
NORMAL_VARIANTS = 8
RECOVERY_VARIANTS = 8
MISSING_SCREENS = 0
DUPLICATE_SCREENS = 0
```

---

#### 7. `NEXO-TESTABLE-SCREEN-COMPOSITION-RULES-001`

Cada pantalla usa ocho zonas máximas:

| Orden | Zona                      | Regla de prueba                                                                     |
| ----: | ------------------------- | ----------------------------------------------------------------------------------- |
|     1 | contexto activo           | debe permitir reconocer función, sede o área, jornada y dispositivo cuando apliquen |
|     2 | acción primaria           | debe existir como máximo una acción principal                                       |
|     3 | siguiente tarea           | debe explicar qué trabajo sigue y por qué                                           |
|     4 | frecuentes                | máximo cuatro opciones, sin duplicar la acción principal                            |
|     5 | recientes                 | máximo tres continuaciones válidas                                                  |
|     6 | bloqueo o problema        | visible solo en variantes de recuperación o cuando aplique                          |
|     7 | familias secundarias      | solo tareas autorizadas y relevantes                                                |
|     8 | cambio de función o actor | visible en multifunción y dispositivo compartido                                    |

Las pantallas no muestran datos de otro actor, rutas técnicas, permisos internos,
SQL, tablas, reason codes ni información productiva.

---

#### 8. `NEXO-TESTABLE-SCREEN-FLOW-001`

El flujo de prueba es único:

```text
MENÚ DEL PROTOTIPO
→
PANTALLA DEL ROL O CONTEXTO
→
TAREA CORTA DEL MODERADOR
→
OBSERVACIÓN DE LA PRIMERA ACCIÓN
→
PREGUNTAS DE COMPRENSIÓN
→
REGISTRO EN CUESTIONARIO ÚNICO
→
CLASIFICACIÓN PRELIMINAR PARA AUTH-UI-059 SI HAY PROBLEMA
```

La persona no debe recibir explicación previa sobre cuál botón es correcto. El
moderador puede repetir la consigna, pero si explica la solución, la ejecución
queda marcada como ayuda del moderador.

---

#### 9. `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001`

El cuestionario único se usa para cualquier pantalla. No existen dieciséis
formularios distintos.

| Campo                    | Tipo                                  | Uso durante la prueba                                                                                      |
| ------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `participant_code`       | código no sensible                    | identificar la sesión sin datos personales innecesarios                                                    |
| `function_tested`        | selección                             | solicitante, bodega, conductor, receptor, supervisor, configuración, multifunción o dispositivo compartido |
| `screen_id`              | selección                             | una de las dieciséis pantallas testeables                                                                  |
| `device_mode`            | selección                             | móvil, tablet, escritorio o estación compartida simulada                                                   |
| `task_prompt`            | texto controlado                      | instrucción leída al participante                                                                          |
| `first_action_chosen`    | texto breve                           | primera opción tocada, señalada o verbalizada                                                              |
| `found_correct_action`   | sí/no                                 | evidencia de localización de la acción esperada                                                            |
| `time_to_action_seconds` | número                                | tiempo aproximado hasta identificar o iniciar la acción                                                    |
| `wrong_openings`         | número                                | aperturas, tarjetas u opciones incorrectas antes del objetivo                                              |
| `moderator_help`         | sí/no + motivo                        | si necesitó explicación para avanzar                                                                       |
| `context_understanding`  | correcto/parcial/incorrecto           | si entiende actor, función, sede, área o dispositivo                                                       |
| `effect_understanding`   | correcto/parcial/incorrecto           | si entiende qué ocurre al ejecutar la acción                                                               |
| `recovery_behavior`      | correcto/parcial/incorrecto/no aplica | qué hace ante cambio, dato parcial, retiro o fallo                                                         |
| `critical_error`         | sí/no + clase                         | mezcla de función, acción prohibida, dato ajeno, falso éxito, doble efecto o bloqueo de accesibilidad      |
| `difficulty_1_to_7`      | escala                                | dificultad percibida, donde 1 es muy fácil y 7 muy difícil                                                 |
| `participant_comment`    | texto libre                           | comentario del usuario sobre lo que confundió o faltó                                                      |
| `observer_notes`         | texto libre                           | observaciones del evaluador                                                                                |
| `proposed_issue_id`      | texto opcional                        | vínculo posterior con `AUTH-UI-059` si aparece problema                                                    |

La unidad de registro será:

```text
participant_code + screen_id + device_mode + task_prompt
```

El formulario debe permitir filtrar luego por prototipo, rol, variante normal o
recuperación, dispositivo, error crítico y dificultad.

---

#### 10. `NEXO-USABILITY-TASK-PROMPT-REGISTER-001`

Cada pantalla tiene una consigna breve, leída de forma neutral. La consigna no
incluye el nombre exacto del botón esperado si eso revela la solución.

| Pantalla         | Consigna breve                                                                       |
| ---------------- | ------------------------------------------------------------------------------------ |
| `SCREEN-055-001` | Necesitas pedir abastecimiento. Muéstrame qué harías primero.                        |
| `SCREEN-055-002` | Ibas a continuar una solicitud, pero algo cambió. Muéstrame qué harías.              |
| `SCREEN-055-003` | Eres bodega al inicio de turno. Muéstrame qué trabajo atenderías.                    |
| `SCREEN-055-004` | La tarea de bodega tiene datos incompletos o cambió. Muéstrame cómo reaccionas.      |
| `SCREEN-055-005` | Tienes una carga asignada. Muéstrame cómo continúas.                                 |
| `SCREEN-055-006` | La asignación o conexión cambió. Muéstrame qué harías antes de seguir.               |
| `SCREEN-055-007` | Llegó una entrega a tu sede. Muéstrame cómo iniciarías la recepción.                 |
| `SCREEN-055-008` | La entrega llegó parcial. Muéstrame cómo evitarías marcarla completa.                |
| `SCREEN-055-009` | Eres supervisor y hay casos abiertos. Muéstrame cuál atenderías.                     |
| `SCREEN-055-010` | Falta evidencia para decidir. Muéstrame qué harías.                                  |
| `SCREEN-055-011` | Debes revisar una configuración autorizada. Muéstrame dónde entrarías.               |
| `SCREEN-055-012` | Hay un cambio no confirmado. Muéstrame cómo salir sin afectar operación.             |
| `SCREEN-055-013` | Tienes varias funciones. Muéstrame cuál está activa.                                 |
| `SCREEN-055-014` | Necesitas cambiar de función. Muéstrame cómo lo harías sin mezclar datos.            |
| `SCREEN-055-015` | Usas una estación compartida. Muéstrame quién está activo y qué trabajo puede hacer. |
| `SCREEN-055-016` | Otra persona va a usar la estación. Muéstrame qué debe pasar antes del cambio.       |

---

#### 11. `NEXO-USABILITY-EVIDENCE-MINIMUM-001`

La evidencia mínima de una sesión es:

- participante codificado;
- función evaluada;
- pantalla evaluada;
- dispositivo o modalidad;
- primera acción elegida;
- tiempo aproximado hasta la primera acción;
- ayuda del moderador;
- comprensión de contexto;
- comprensión del efecto;
- recuperación cuando aplique;
- errores críticos;
- dificultad percibida;
- observaciones del participante y evaluador.

No se exige grabación. Si se graba, debe existir autorización externa al plan y
no se guardarán secretos, credenciales, datos reales innecesarios ni información
personal sensible.

---

#### 12. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** esta corrección no introduce una regla nueva de negocio,
autorización, cálculo, integración, seguridad o navegación. Convierte el
prototipo documental ya aprobado en un material visual testeable y unifica el
instrumento de recolección para poder ejecutar los criterios existentes en la
siguiente prueba. No modifica, difiere, descarta ni declara obsoleto ningún
requisito histórico; el Registro Canónico de Requisitos de Prueba no cambia.

---

#### 13. Criterios de aceptación

La tarea se considera completa cuando se confirme que:

- existen dieciséis pantallas testeables;
- cada uno de los ocho contextos tiene una variante normal y una variante de recuperación;
- cada pantalla tiene una consigna asociada;
- existe un único cuestionario aplicable a todas las pantallas;
- el cuestionario registra observación y preguntas de comprensión;
- el prototipo no requiere conexión productiva ni datos reales;
- las pantallas no ejecutan mutaciones;
- no se declaran resultados con usuarios;
- no se crean rutas, roles, permisos, funciones, procesos, migraciones ni datos;
- los problemas observados quedan destinados a `AUTH-UI-059`;
- la aprobación final permanece destinada a `AUTH-UI-060`;
- `AUTH-UI-056` permanece únicamente reservada.

---

#### 14. `NEXO-PROTOTYPE-PACKAGE-HANDOFF-001`

| Destino       | Handoff aprobado                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `AUTH-UI-056` | validar internamente que las dieciséis pantallas y el cuestionario son coherentes, completos y aptos para prueba |
| `AUTH-UI-057` | ajustar criterios y umbrales para que se midan con el cuestionario único y no con formularios dispersos          |
| `AUTH-UI-058` | ejecutar la prueba real con usuarios usando el prototipo visual y el cuestionario único                          |
| `AUTH-UI-059` | registrar problemas detectados por pantalla, criterio, severidad, evidencia y propietario                        |
| `AUTH-UI-060` | aprobar o bloquear pantallas únicamente con evidencia válida y problemas críticos cerrados                       |

Ningún destino anterior se inicia mediante esta tarea.

---

#### 15. Traza histórica del carril NEXO

> Esta fotografía dejó de ser continuidad vigente. Se conserva únicamente como evidencia de la ejecución parcial que originó los artefactos NEXO.

**ÚLTIMA TAREA APROBADA**

`AUTH-UI-054 — Reducir opciones irrelevantes`

**TAREA ACTUAL APROBADA**

`AUTH-UI-055 — Crear prototipo por rol`

**SIGUIENTE TAREA RESERVADA**

`AUTH-UI-056 — Validar prototipo antes de implementar`

### [ ] AUTH-UI-056 — Validar prototipo antes de implementar

**Estado:** NO INICIADA; evidencia parcial NEXO conservada
**Tarea anterior:** `AUTH-UI-055 — Crear prototipo por rol` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-057 — Definir criterio de usabilidad por pantalla` — NO INICIADA
**Tipo de tarea:** documental global; validación interna de integridad, coherencia, accesibilidad y aptitud de prueba de todos los prototipos aplicables, sin ejecución con usuarios
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Evidencia parcial inspeccionada:** `vento-nexo`, `NEXO-ROUTE-001` — `/`
**Ruta vigente:** flujo canónico integral; el carril `NEXO-REMISSIONS-001` queda únicamente como procedencia histórica de la evidencia NEXO
**Cambios físicos autorizados:** ninguno; no modifica código productivo, componentes de aplicación, rutas, permisos, roles, funciones, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues
**Artefacto evaluado:** `NEXO_PROTOTIPO_TEST_USUARIOS_AUTH_UI_055_057.pptx`
**Instrumento evaluado:** `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001`
**Decisión del gate:** `APTO_PARA_PRUEBA_CON_USUARIOS_CON_VALIDACION_PREVIA_INTERNA`

---

#### 1. Propósito

Validar que el paquete corregido de `AUTH-UI-055` sí contiene material mínimo
para ser probado con personas reales: pantallas visibles, consignas breves,
variantes normales y de recuperación, y un cuestionario único que registre
observación y comprensión.

La validación no evalúa si las pantallas son buenas para usuarios. Solo confirma
que existe algo testeable y que la prueba no depende de implementar la
aplicación.

---

#### 2. Resultado material

Se materializan siete artefactos documentales:

1. `NEXO-TESTABLE-PROTOTYPE-VALIDATION-CONTRACT-001`;
2. `NEXO-TESTABLE-SCREEN-VALIDATION-MATRIX-001`;
3. `NEXO-SINGLE-QUESTIONNAIRE-VALIDATION-MATRIX-001`;
4. `NEXO-SESSION-READINESS-CHECKLIST-001`;
5. `NEXO-EVIDENCE-READINESS-GATE-001`;
6. `NEXO-PRETEST-FINDING-REGISTER-001`;
7. `NEXO-TESTABLE-PROTOTYPE-VALIDATION-HANDOFF-001`.

Cobertura validada:

| Elemento                        | Esperado | Conforme | No conforme | Pendiente de ejecución real |
| ------------------------------- | -------: | -------: | ----------: | --------------------------: |
| Pantallas visuales testeables   |       16 |       16 |           0 |                           0 |
| Contextos cubiertos             |        8 |        8 |           0 |                           0 |
| Variantes normales              |        8 |        8 |           0 |                           0 |
| Variantes de recuperación       |        8 |        8 |           0 |                           0 |
| Consignas breves                |       16 |       16 |           0 |                           0 |
| Cuestionario único              |        1 |        1 |           0 |                           0 |
| Campos mínimos del cuestionario |       18 |       18 |           0 |                           0 |
| Sesiones con usuarios           |        0 |        0 |           0 |                           1 |
| Requisitos nuevos o modificados |        0 |        0 |           0 |                           0 |

---

#### 3. Entradas evaluadas

La validación consume:

- `AUTH-UI-052`;
- `AUTH-UI-053`;
- `AUTH-UI-054`;
- `AUTH-UI-055` corregida;
- el catálogo de dieciséis pantallas `SCREEN-055-001` a `SCREEN-055-016`;
- el cuestionario único `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001`;
- los criterios definidos para usabilidad, seguridad, tacto, comprensión y recuperación;
- la restricción de no implementar código ni Supabase en esta fase.

---

#### 4. Alcance y límites

##### 4.1. Incluido

- validar existencia de pantallas testeables;
- validar que cada pantalla tiene consigna;
- validar que el cuestionario puede recoger evidencia mínima;
- validar que los campos permiten clasificar problemas en `AUTH-UI-059`;
- validar que las pantallas no usan datos reales ni prometen efectos productivos;
- validar que el paquete puede usarse antes de implementar la aplicación.

##### 4.2. Excluido

- ejecutar sesiones con usuarios;
- medir tiempos reales;
- medir accesibilidad ejecutada;
- afirmar satisfacción, comprensión o éxito;
- modificar código, datos, rutas o Supabase;
- aprobar pantallas finales;
- iniciar `AUTH-UI-057`, `AUTH-UI-058`, `AUTH-UI-059` o `AUTH-UI-060`.

---

#### 5. `NEXO-TESTABLE-SCREEN-VALIDATION-MATRIX-001`

| Grupo                  | Pantallas | Validación interna                                   | Resultado  |
| ---------------------- | --------: | ---------------------------------------------------- | ---------- |
| solicitante            |         2 | normal y recuperación presentes, sin operación ajena | `CONFORME` |
| bodega                 |         2 | tarea prioritaria y datos parciales presentes        | `CONFORME` |
| conductor              |         2 | custodia y pérdida de asignación presentes           | `CONFORME` |
| receptor               |         2 | recepción normal y parcialidad presentes             | `CONFORME` |
| supervisor             |         2 | caso prioritario y evidencia insuficiente presentes  | `CONFORME` |
| configuración          |         2 | capacidad prioritaria y cancelación segura presentes | `CONFORME` |
| multifunción           |         2 | función activa y cambio seguro presentes             | `CONFORME` |
| dispositivo compartido |         2 | actor activo y cambio de actor presentes             | `CONFORME` |

Reconciliación:

```text
EXPECTED_SCREEN_GROUPS = 8
VALIDATED_SCREEN_GROUPS = 8
EXPECTED_SCREENS = 16
VALIDATED_SCREENS = 16
SUBSTANTIVE_BLOCKERS = 0
```

---

#### 6. `NEXO-SINGLE-QUESTIONNAIRE-VALIDATION-MATRIX-001`

| Dimensión                  | Campos que la cubren                                     | Resultado  |
| -------------------------- | -------------------------------------------------------- | ---------- |
| identificación no sensible | participante, función, pantalla, dispositivo             | `CONFORME` |
| localización               | primera acción, tiempo, aperturas incorrectas            | `CONFORME` |
| comprensión                | contexto y efecto                                        | `CONFORME` |
| recuperación               | comportamiento ante cambio, retiro, dato parcial o fallo | `CONFORME` |
| ayuda                      | ayuda del moderador y motivo                             | `CONFORME` |
| seguridad                  | error crítico y clase                                    | `CONFORME` |
| carga cognitiva            | dificultad de 1 a 7 y comentario                         | `CONFORME` |
| trazabilidad de problema   | observaciones e ID propuesto para `AUTH-UI-059`          | `CONFORME` |

El cuestionario único es suficiente para ejecutar `AUTH-UI-058` sin crear
formularios separados por rol.

---

#### 7. `NEXO-SESSION-READINESS-CHECKLIST-001`

Antes de ejecutar una sesión real, el evaluador debe confirmar:

| Control                              | Condición de salida                                      | Estado inicial         |
| ------------------------------------ | -------------------------------------------------------- | ---------------------- |
| pantalla seleccionada                | una de las dieciséis `SCREEN-055-*`                      | `READY_FOR_SESSION`    |
| consigna preparada                   | texto breve sin revelar la solución                      | `READY_FOR_SESSION`    |
| participante adecuado                | representa o conoce la función probada                   | `PENDING_AT_EXECUTION` |
| dispositivo definido                 | móvil, tablet, escritorio o estación compartida simulada | `PENDING_AT_EXECUTION` |
| cuestionario abierto                 | formulario único disponible                              | `READY_FOR_SESSION`    |
| datos ficticios                      | no hay datos reales ni credenciales                      | `READY_FOR_SESSION`    |
| registro de consentimiento si aplica | gestionado fuera del plan canónico                       | `PENDING_AT_EXECUTION` |
| responsable de observación           | persona que registra evidencia                           | `PENDING_AT_EXECUTION` |

Los controles `PENDING_AT_EXECUTION` pertenecen a `AUTH-UI-058`; no bloquean la
aprobación documental de esta validación interna.

---

#### 8. `NEXO-EVIDENCE-READINESS-GATE-001`

El paquete queda apto para prueba cuando:

```text
16 pantallas testeables completas
+
1 cuestionario único completo
+
consignas neutrales
+
datos ficticios
+
cero mutaciones reales
+
cero contradicciones sustantivas
→
LISTO PARA PRUEBA GUIADA CON USUARIOS
```

No queda apto para implementación ni aprobación final.

---

#### 9. `NEXO-PRETEST-FINDING-REGISTER-001`

| Hallazgo                   | Clase                | Descripción                                     | Propietario   | Condición de salida                                               | Estado                   |
| -------------------------- | -------------------- | ----------------------------------------------- | ------------- | ----------------------------------------------------------------- | ------------------------ |
| `NEXO-PRETEST-FINDING-001` | evidencia humana     | aún no existen sesiones ejecutadas con usuarios | `AUTH-UI-058` | ejecutar sesiones y registrar resultados en el cuestionario único | `PENDIENTE_DE_EVIDENCIA` |
| `NEXO-PRETEST-FINDING-002` | problemas observados | aún no existen problemas reales clasificados    | `AUTH-UI-059` | registrar severidad, evidencia, propietario y cierre              | `PENDIENTE_DE_EVIDENCIA` |
| `NEXO-PRETEST-FINDING-003` | aprobación final     | ninguna pantalla puede aprobarse sin evidencia  | `AUTH-UI-060` | decidir por pantalla después de pruebas y correcciones            | `BLOQUEADO`              |

No quedan pendientes sin tarea responsable.

---

#### 10. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** esta tarea valida la aptitud interna del material visual y el
cuestionario único. No modifica comportamiento ejecutable, autorización,
navegación, reglas de negocio, seguridad, privacidad, accesibilidad ni datos. No
crea, modifica, difiere, descarta ni declara obsoleto ningún requisito histórico;
el Registro Canónico de Requisitos de Prueba no cambia.

---

#### 11. Criterios de aceptación

La tarea se considera completa cuando se confirme que:

- las dieciséis pantallas existen y están asociadas a los ocho contextos;
- hay ocho variantes normales y ocho de recuperación;
- cada pantalla tiene consigna neutral;
- existe un cuestionario único;
- el cuestionario registra observación, comprensión, recuperación, ayuda, error crítico y comentario;
- el paquete no depende de implementación ni Supabase;
- no se declaran resultados reales;
- no se aprueban pantallas finales;
- los problemas reales quedan destinados a `AUTH-UI-059`;
- la aprobación final queda destinada a `AUTH-UI-060`;
- `AUTH-UI-057` permanece únicamente reservada.

---

#### 12. `NEXO-TESTABLE-PROTOTYPE-VALIDATION-HANDOFF-001`

| Destino       | Handoff aprobado                                                         |
| ------------- | ------------------------------------------------------------------------ |
| `AUTH-UI-057` | ajustar criterios de usabilidad al prototipo visual y cuestionario único |
| `AUTH-UI-058` | ejecutar sesiones reales usando el paquete validado                      |
| `AUTH-UI-059` | registrar problemas observados con evidencia del cuestionario            |
| `AUTH-UI-060` | decidir aprobación final únicamente con evidencia suficiente             |

Ningún destino anterior se inicia mediante esta tarea.

---

#### 13. Traza histórica del carril NEXO

> Esta fotografía dejó de ser continuidad vigente. Se conserva únicamente como evidencia de la ejecución parcial que originó los artefactos NEXO.

**ÚLTIMA TAREA APROBADA**

`AUTH-UI-055 — Crear prototipo por rol`

**TAREA ACTUAL APROBADA**

`AUTH-UI-056 — Validar prototipo antes de implementar`

**SIGUIENTE TAREA RESERVADA**

`AUTH-UI-057 — Definir criterio de usabilidad por pantalla`

### [ ] AUTH-UI-057 — Definir criterio de usabilidad por pantalla

**Estado:** NO INICIADA; evidencia parcial NEXO conservada
**Tarea anterior:** `AUTH-UI-056 — Validar prototipo antes de implementar` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-058 — Probar con usuarios reales` — NO INICIADA
**Tipo de tarea:** documental global; definición de criterios, umbrales y reglas de decisión por cada superficie aplicable del inventario canónico
**Repositorio propietario:** `vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md`
**Evidencia parcial inspeccionada:** `vento-nexo`, `NEXO-ROUTE-001` — `/`
**Ruta vigente:** flujo canónico integral; el carril `NEXO-REMISSIONS-001` queda únicamente como procedencia histórica de la evidencia NEXO
**Cambios físicos autorizados:** ninguno; no modifica código productivo, componentes de aplicación, rutas, permisos, roles, funciones, procesos, datos, Supabase, migraciones, RLS, configuración, telemetría ni despliegues
**Artefacto evaluable:** `NEXO_PROTOTIPO_TEST_USUARIOS_AUTH_UI_055_057.pptx`
**Instrumento de recolección:** `NEXO-USABILITY-SINGLE-QUESTIONNAIRE-001`

---

#### 1. Propósito

Definir criterios de usabilidad medibles para las dieciséis pantallas testeables
sin exigir dieciséis formularios separados. La prueba se ejecutará con un único
cuestionario y permitirá decidir por pantalla, prototipo, contexto y tipo de
problema.

La regla de evaluación es:

```text
PANTALLA TESTEABLE
+
CONSIGNA BREVE
+
OBSERVACIÓN DE PRIMERA ACCIÓN
+
PREGUNTAS DE COMPRENSIÓN Y RECUPERACIÓN
+
CRITERIOS CRÍTICOS DE SEGURIDAD, CUSTODIA, PRIVACIDAD Y ACCESIBILIDAD
→
DECISIÓN POR PANTALLA PARA AUTH-UI-059 Y AUTH-UI-060
```

La tarea define cómo medir. No ejecuta usuarios ni inventa resultados.

---

#### 2. Resultado material

Se materializan siete artefactos documentales:

1. `NEXO-SINGLE-FORM-USABILITY-CRITERIA-CONTRACT-001`;
2. `NEXO-SCREEN-DECISION-CRITERIA-MATRIX-001`;
3. `NEXO-QUESTIONNAIRE-SCORING-MAP-001`;
4. `NEXO-CRITICAL-ERROR-CATALOG-001`;
5. `NEXO-PROBLEM-ROUTING-RULES-001`;
6. `NEXO-SESSION-RESULT-SUMMARY-SCHEMA-001`;
7. `NEXO-USABILITY-CRITERIA-HANDOFF-001`.

Cobertura materializada:

| Elemento                                  | Esperado | Materializado | Faltantes | Duplicados |
| ----------------------------------------- | -------: | ------------: | --------: | ---------: |
| Pantallas testeables cubiertas            |       16 |            16 |         0 |          0 |
| Contextos cubiertos                       |        8 |             8 |         0 |          0 |
| Cuestionarios únicos                      |        1 |             1 |         0 |          0 |
| Dimensiones evaluadas                     |        8 |             8 |         0 |          0 |
| Errores críticos catalogados              |        8 |             8 |         0 |          0 |
| Estados de decisión por pantalla          |        4 |             4 |         0 |          0 |
| Requisitos de prueba nuevos o modificados |        0 |             0 |         0 |          0 |

---

#### 3. Entradas y decisiones preservadas

La tarea consume:

- las dieciséis pantallas `SCREEN-055-001` a `SCREEN-055-016`;
- las ocho proyecciones `PROTO-NEXO-001` a `PROTO-NEXO-008`;
- el cuestionario único de `AUTH-UI-055`;
- la validación interna de `AUTH-UI-056`;
- los contratos de navegación, reducción, contexto, dispositivo compartido,
  seguridad, privacidad, accesibilidad y recuperación.

No modifica pantallas, tareas, roles, permisos, rutas, datos ni implementación.

---

#### 4. Alcance y límites

##### 4.1. Incluido

- criterios por pantalla y por dimensión;
- umbrales de éxito, comprensión, recuperación, ayuda, error crítico y dificultad;
- mapeo entre campos del cuestionario y decisión;
- reglas para pasar problemas a `AUTH-UI-059`;
- reglas para bloquear aprobación en `AUTH-UI-060`.

##### 4.2. Excluido

- ejecutar sesiones;
- reclutar usuarios;
- modificar pantallas;
- crear prototipos adicionales;
- programar la aplicación;
- conectar Supabase;
- declarar pantallas aprobadas;
- iniciar `AUTH-UI-058`, `AUTH-UI-059` o `AUTH-UI-060`.

---

#### 5. `NEXO-SINGLE-FORM-USABILITY-CRITERIA-CONTRACT-001`

Todas las pantallas se evalúan con el mismo formulario. La pantalla evaluada se
identifica con `screen_id`, no con un formulario distinto.

Dimensiones mínimas:

| ID             | Dimensión                        | Evidencia del cuestionario                                     | Umbral general                                          |
| -------------- | -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| `USAB-FORM-01` | localización                     | primera acción, tiempo y aperturas incorrectas                 | acción correcta sin más de una apertura incorrecta      |
| `USAB-FORM-02` | comprensión de contexto          | respuesta sobre función, sede, área, actor o dispositivo       | correcto o parcial sin confusión crítica                |
| `USAB-FORM-03` | comprensión de efecto            | respuesta sobre qué pasará al actuar                           | correcto para acciones sensibles                        |
| `USAB-FORM-04` | recuperación                     | respuesta y conducta ante cambio, retiro, dato parcial o fallo | sin pérdida, duplicación ni falso éxito                 |
| `USAB-FORM-05` | ayuda                            | ayuda del moderador y motivo                                   | no debe ser necesaria para contexto básico              |
| `USAB-FORM-06` | carga cognitiva                  | dificultad de 1 a 7 y comentario                               | mediana objetivo igual o menor a 3 tras varias sesiones |
| `USAB-FORM-07` | seguridad y privacidad           | error crítico y clase                                          | tolerancia cero                                         |
| `USAB-FORM-08` | tacto y accesibilidad observable | observación de toque, foco, lectura o bloqueo                  | cero bloqueo del camino crítico                         |

---

#### 6. `NEXO-SCREEN-DECISION-CRITERIA-MATRIX-001`

| Decisión                 | Condición                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CONFORME_PARA_CIERRE`   | acción correcta, comprensión suficiente, cero error crítico, recuperación correcta cuando aplica y dificultad dentro del umbral                  |
| `REQUIERE_AJUSTE`        | existe confusión o fricción no crítica que puede corregirse sin rehacer el contrato                                                              |
| `BLOQUEADA`              | existe error crítico, mezcla de función, dato ajeno, acción indebida, falso éxito, doble efecto, pérdida de custodia o bloqueo accesible crítico |
| `PENDIENTE_DE_EVIDENCIA` | la pantalla no fue probada o la evidencia es incompleta                                                                                          |

Una pantalla bloqueada no puede aprobarse por promedio agregado.

---

#### 7. `NEXO-QUESTIONNAIRE-SCORING-MAP-001`

| Campo del formulario     | Uso en decisión                  | Regla                                                                        |
| ------------------------ | -------------------------------- | ---------------------------------------------------------------------------- |
| `found_correct_action`   | localización y éxito             | `no` genera ajuste o bloqueo según severidad                                 |
| `time_to_action_seconds` | esfuerzo                         | tiempos altos generan ajuste, no bloqueo automático                          |
| `wrong_openings`         | carga cognitiva                  | más de una apertura incorrecta genera ajuste                                 |
| `moderator_help`         | autonomía                        | ayuda para contexto básico genera ajuste o bloqueo                           |
| `context_understanding`  | comprensión                      | incorrecto en actor, función o dispositivo puede bloquear                    |
| `effect_understanding`   | seguridad                        | incorrecto en acción sensible bloquea                                        |
| `recovery_behavior`      | recuperación                     | pérdida, duplicación o falso éxito bloquea                                   |
| `critical_error`         | seguridad, privacidad y custodia | cualquier `sí` bloquea                                                       |
| `difficulty_1_to_7`      | carga subjetiva                  | valor alto alimenta problema no crítico salvo que coincida con error crítico |
| `participant_comment`    | diagnóstico                      | no decide solo, pero orienta problema                                        |
| `observer_notes`         | diagnóstico                      | soporta clasificación en `AUTH-UI-059`                                       |
| `proposed_issue_id`      | trazabilidad                     | vínculo posterior con registro de problemas                                  |

---

#### 8. `NEXO-CRITICAL-ERROR-CATALOG-001`

| Error crítico                          | Ejemplo                                                         | Efecto      |
| -------------------------------------- | --------------------------------------------------------------- | ----------- |
| mezcla de función                      | bodega intenta conducción o configuración                       | `BLOQUEADA` |
| dato de otro actor                     | ve trabajo o referencia no propia                               | `BLOQUEADA` |
| acción prohibida                       | intenta aprobar, ajustar o recibir sin autoridad                | `BLOQUEADA` |
| falso éxito                            | cree que una acción quedó confirmada cuando no hay confirmación | `BLOQUEADA` |
| doble efecto                           | intenta repetir una acción por resultado desconocido            | `BLOQUEADA` |
| pérdida de custodia                    | no identifica quién conserva responsabilidad                    | `BLOQUEADA` |
| bloqueo accesible crítico              | no puede llegar al control principal con el medio usado         | `BLOQUEADA` |
| persistencia en dispositivo compartido | quedan datos del actor anterior                                 | `BLOQUEADA` |

---

#### 9. `NEXO-PROBLEM-ROUTING-RULES-001`

Todo problema detectado en `AUTH-UI-058` se enruta a `AUTH-UI-059` con:

```text
screen_id
prototype_id
function_tested
device_mode
criterion_failed
severity
evidence_reference
owner
required_correction
retest_condition
```

No se permite corregir silenciosamente una pantalla sin registrar el problema.

---

#### 10. `NEXO-SESSION-RESULT-SUMMARY-SCHEMA-001`

La salida mínima de `AUTH-UI-058` será:

| Campo                           | Descripción                                          |
| ------------------------------- | ---------------------------------------------------- |
| `tested_screens`                | cantidad de pantallas ejecutadas                     |
| `participants_count`            | cantidad de participantes codificados                |
| `sessions_count`                | cantidad de registros válidos                        |
| `screens_conformant`            | pantallas sin problema bloqueante                    |
| `screens_requiring_adjustment`  | pantallas con problema no crítico                    |
| `screens_blocked`               | pantallas con error crítico o evidencia insuficiente |
| `issues_to_register`            | problemas que deben pasar a `AUTH-UI-059`            |
| `screens_ready_for_auth_ui_060` | pantallas candidatas a aprobación final              |

---

#### 11. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** esta tarea ajusta criterios y umbrales para medir, mediante
un cuestionario único, pantallas y comportamientos ya definidos. No introduce
una regla ejecutable nueva ni modifica reglas de autorización, seguridad,
navegación, privacidad, cálculo, integración o datos. No crea, modifica,
difiere, descarta ni declara obsoleto ningún requisito histórico; el Registro
Canónico de Requisitos de Prueba no cambia.

---

#### 12. Criterios de aceptación

La tarea se considera completa cuando se confirme que:

- las dieciséis pantallas tienen criterio aplicable;
- el cuestionario único cubre localización, comprensión, recuperación, ayuda,
  dificultad, error crítico y observación;
- existen reglas de decisión por pantalla;
- los errores críticos bloquean sin depender de promedios;
- los problemas quedan destinados a `AUTH-UI-059`;
- la aprobación final queda destinada a `AUTH-UI-060`;
- no se declaran sesiones ejecutadas;
- no se implementa código ni Supabase;
- no se crean ni modifican requisitos `TREQ-*`;
- `AUTH-UI-058` permanece únicamente reservada.

---

#### 13. `NEXO-USABILITY-CRITERIA-HANDOFF-001`

| Destino       | Handoff aprobado                                                                    |
| ------------- | ----------------------------------------------------------------------------------- |
| `AUTH-UI-058` | ejecutar sesiones reales con el prototipo visual y el cuestionario único            |
| `AUTH-UI-059` | registrar problemas derivados de los campos y criterios fallidos                    |
| `AUTH-UI-060` | decidir aprobación final por pantalla con evidencia, criterios y problemas cerrados |

Ningún destino anterior se inicia mediante esta tarea.

---

#### 14. Traza histórica del carril NEXO

> Esta fotografía dejó de ser continuidad vigente. Se conserva únicamente como evidencia de la ejecución parcial que originó los artefactos NEXO.

**ÚLTIMA TAREA APROBADA**

`AUTH-UI-056 — Validar prototipo antes de implementar`

**TAREA ACTUAL APROBADA**

`AUTH-UI-057 — Definir criterio de usabilidad por pantalla`

**SIGUIENTE TAREA RESERVADA**

`AUTH-UI-058 — Probar con usuarios reales`

### [ ] AUTH-UI-058 — Probar con usuarios reales

**Estado:** NO INICIADA
**Tarea anterior:** `AUTH-UI-057 — Definir criterio de usabilidad por pantalla` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-059 — Registrar problemas encontrados` — NO INICIADA
**Tipo de tarea:** validación operativa integral; ejecución de sesiones con usuarios reales sobre las aplicaciones, actores, dispositivos, superficies y escenarios aplicables
**Cambios físicos autorizados:** ninguno; la tarea observa y registra, pero no corrige código, datos, configuración ni infraestructura durante una sesión

#### Alcance y entregables obligatorios

1. Consumir el inventario íntegro de superficies y la matriz aprobada en
   `AUTH-UI-057`; queda prohibido limitar la muestra a NEXO o Remisiones.
2. Definir participantes por actor efectivo, función y aplicación, sin usar el
   cargo como sustituto de permisos o trabajo real.
3. Cubrir escritorio, móvil, tableta, quiosco o dispositivo compartido cuando
   la superficie los declare aplicables.
4. Ejecutar los estados normal, vacío, carga, denegación, error recuperable,
   expiración, revocación y recuperación que correspondan.
5. Registrar por sesión: aplicación, superficie, escenario, actor, dispositivo,
   versión del prototipo, duración, resultado, ayuda, error crítico,
   observaciones y referencia de evidencia saneada.
6. No crear datos operativos o productivos para completar una prueba sin
   autorización explícita; utilizar fixtures, entornos o datos autorizados y
   declarar cualquier escenario no ejecutado.
7. Conservar cada resultado real sin convertir inspección documental, build,
   typecheck o simulación interna en evidencia de usuario.

#### Condición de cierre

La tarea solo podrá aprobarse cuando toda superficie aplicable tenga evidencia
de sesión suficiente o una justificación `NO_APLICA` revisable; toda ausencia,
bloqueo o imposibilidad queda registrada y enrutada, nunca omitida.

### [ ] AUTH-UI-059 — Registrar problemas encontrados

**Estado:** NO INICIADA
**Tarea anterior:** `AUTH-UI-058 — Probar con usuarios reales` — NO INICIADA
**Tarea siguiente:** `AUTH-UI-060 — Aprobar la pantalla antes de retirarla del roadmap` — NO INICIADA
**Tipo de tarea:** documental y de enrutamiento integral; consolidación de todos los hallazgos reales de usabilidad sin corregirlos silenciosamente
**Cambios físicos autorizados:** ninguno; cada corrección se asigna a su tarea o paquete propietario

#### Registro obligatorio por hallazgo

Cada problema deberá conservar un identificador estable, aplicación,
superficie, actor, dispositivo, escenario, criterio fallido, severidad,
evidencia, riesgo, pasos de reproducción, propietario, tarea o paquete destino,
criterio de corrección, prueba de regresión, estado y evidencia de retest.

El registro deberá reconciliarse contra todas las sesiones de `AUTH-UI-058` y
demostrar explícitamente:

- cero observaciones sin decisión;
- cero hallazgos sin propietario y destino canónico;
- cero problemas críticos cerrados solo por aceptación verbal;
- cero cambios de permisos, procesos o contratos ocultos dentro de una
  corrección visual;
- separación entre defecto, deuda, solicitud de cambio, bloqueo de datos,
  bloqueo físico y resultado `NO_APLICA`.

#### Condición de cierre

La tarea termina cuando el universo de observaciones está reconciliado y cada
hallazgo tiene resolución demostrada, diferimiento explícito que bloquee la
aprobación correspondiente o destino posterior completo.

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
