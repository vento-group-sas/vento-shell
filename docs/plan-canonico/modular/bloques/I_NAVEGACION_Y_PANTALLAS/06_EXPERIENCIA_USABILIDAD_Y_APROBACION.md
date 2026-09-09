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


### [ ] AUTH-UI-047 — Mostrar rol simulado claramente
### [ ] AUTH-UI-048 — Estandarizar estados sin acceso
### [ ] AUTH-UI-049 — Estandarizar estados de carga
### [ ] AUTH-UI-050 — Estandarizar estados vacíos
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
