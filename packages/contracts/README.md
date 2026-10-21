# @vento/contracts

> **Estado operativo de distribución — 2026-10-21 (PR #1021, candidato privado).**
> La compilación ESM y las declaraciones TypeScript se materializan desde los archivos generados sin editarlos. Los exports de `package.json` exponen únicamente familias y versiones canónicas mediante `dist/`; `npm run build --workspace @vento/contracts` y `npm run validate --workspace @vento/contracts` verifican el tarball. **No hay publicación ni adopción en consumidores.** Los apartados de tareas `SHELL-CON-*` describen el alcance histórico de cada materialización, no la certificación de una release actual.


Raíz contractual compartida de Vento OS.

## Estado

Esta materialización corresponde a `SHELL-CON-001::GLOBAL` y establece únicamente la raíz física reutilizable de `@vento/contracts`.

Es una fundación `PRE_E5_FOUNDATION`.

No constituye una release publicada, un tag, una publicación en registry ni una adopción por consumidores.

La versión `1.0.0-alpha.1` es metadata de prerelease para autoría local y no constituye la primera versión estable.

## Responsabilidad

`@vento/contracts` es la autoridad técnica estática para contratos compartidos versionados de Vento OS.

Puede alojar, cuando sus tareas propietarias sean materializadas:

- catálogos;
- schemas;
- códigos e identificadores;
- tipos derivados;
- manifiestos;
- hashes;
- metadata contractual;
- diagnósticos estáticos.

No ejecuta:

- autorización runtime;
- acceso a Supabase;
- red;
- sesiones;
- cookies;
- SSO;
- redirects;
- lógica empresarial;
- UI;
- secretos;
- migraciones;
- RLS;
- RPC;
- persistencia.

## Alcance de SHELL-CON-001

Esta instancia crea únicamente:

- la identidad física `@vento/contracts`;
- el workspace `packages/contracts`;
- la reserva física del módulo `authorization`.

No materializa las responsabilidades reservadas a `SHELL-CON-002` a `SHELL-CON-016`.

No publica exports públicos adicionales antes de que su tarea propietaria los materialice.

## Módulo de procesos

`SHELL-CON-009::GLOBAL` materializa internamente `packages/contracts/processes` como proyección estática de identidad de procesos para el subpath lógico `@vento/contracts/processes`.

La materialización contiene exactamente 69 identidades derivadas de `PROC-CANONICAL-ID-REGISTRY-001`, desde `VPROC-0001` hasta `VPROC-0069`, junto con validación de formato y pertenencia.

`SHELL-CON-010::GLOBAL` amplía el mismo módulo con exactamente 592 estados principales normales derivados de los registros `PROC-CAT-009`, `PROC-CAT-010` y `PROC-CAT-011`, reconciliados por `PROC-CAT-012`: 69 `INITIAL`, 454 `INTERMEDIATE` y 69 `FINAL_NORMAL`.

Los estados se materializan internamente bajo `packages/contracts/processes/generated/states/`; las 590 transiciones normales y las acciones excepcionales permanecen fuera de `ProcessStateId`.

El módulo de procesos no absorbe identificadores de pantallas. La identidad de pantalla se materializa en el módulo hermano `packages/contracts/screens`.

Esta materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts`, no publica el subpath, no adopta consumidores y no toca Supabase. La continuidad histórica mantiene `SHELL-CON-011` como la responsabilidad separada de identidad de pantallas, materializada en `packages/contracts/screens`.

## Módulo de pantallas

`SHELL-CON-011::GLOBAL` materializa internamente `packages/contracts/screens` como proyección estática de identidad de pantallas para el subpath lógico `@vento/contracts/screens`.

La materialización contiene exactamente 177 identidades derivadas de `SCREEN-CANONICAL-CATALOG-001`, desde `VSCREEN-0001` hasta `VSCREEN-0177`, junto con validación de sintaxis y pertenencia.

`VSCREEN-0178` permanece fuera de `SCREEN_IDS` como siguiente identidad no asignada en este corte. La aplicación, los procesos, los pasos, las rutas, los componentes y los permisos no forman parte de `ScreenId`.

La materialización reconcilia que `PROC-SCREEN-003` y `PROC-SCREEN-004` conservan las mismas 177 identidades, pero no incorpora sus vínculos a la superficie de identidad compartida.

Esta materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts`, no publica el subpath, no adopta consumidores, no toca Supabase y no materializa acciones funcionales reservadas a `SHELL-CON-012`.

## Módulo de acciones funcionales

`SHELL-CON-012::GLOBAL` materializa internamente `packages/contracts/actions` como proyección estática de identidad de acciones funcionales para el subpath lógico `@vento/contracts/actions`.

La materialización contiene exactamente 885 identidades funcionales derivadas de `PROC-SCREEN-014` y `PROC-SCREEN-015`: 177 principales y 708 secundarias sobre las 177 pantallas vigentes.

Cada `ScreenId` aporta una identidad `::PRIMARY` y cuatro identidades `::SECONDARY:01..04` en el corte actual. `FunctionalActionId` distingue sintaxis de pertenencia y conserva la referencia determinista a su pantalla, clase, fuente documental y ordinal secundario cuando aplica.

Familias, efectos, clases secundarias, relaciones, disponibilidad, ubicación y confirmación continúan gobernados por E2; no se convierten en una segunda autoridad dentro del módulo de identidad.

Esta materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts`, no publica el subpath, no adopta consumidores, no concede autorización y no toca Supabase. `SHELL-CON-013` conserva la responsabilidad separada de identidad de eventos empresariales, materializada en el módulo hermano `packages/contracts/events`.

## Módulo de eventos empresariales

`SHELL-CON-013::GLOBAL` materializa internamente `packages/contracts/events` como proyección estática de identidad de eventos empresariales para el subpath lógico `@vento/contracts/events`.

La materialización contiene exactamente 395 definiciones normales derivadas de `PROC-CAT-017` sobre los 69 `ProcessId` vigentes. Conserva `BusinessEventId`, el `event_type` semántico versionado, la clase y la sensibilidad aprobadas, sin copiar el hecho fuente ni la descripción del hecho confirmado como nueva autoridad.

Las ocho familias condicionales se proyectan por separado como plantillas canónicas y permanecen fuera del inventario normal de 395. Sintaxis y pertenencia de `BusinessEventId` se validan de manera separada.

Esta materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts`, no publica el subpath, no adopta productores o consumidores, no implementa infraestructura runtime de eventos y no toca Supabase. `SHELL-CON-014` materializa separadamente los traspasos entre aplicaciones en el módulo hermano `packages/contracts/handoffs`.

## Módulo de traspasos entre aplicaciones

`SHELL-CON-014::GLOBAL` materializa internamente `packages/contracts/handoffs` como proyección estática de las relaciones admitidas para el subpath lógico `@vento/contracts/handoffs`.

El corte vigente contiene exactamente 49 relaciones únicas por la tupla `ProcessId + owner_application + participant_application`: 27 directas y 22 condicionales, distribuidas sobre 8 procesos con modalidad `SOLICITUD_HANDOFF_Y_EVENTO`, con `viso` como única propietaria en este corte y 9 aplicaciones participantes.

Cada relación conserva `DIRECTA` o `CONDICIONAL`, `HANDOFF_PROJECTION` y `HANDOFF_REQUEST`. La existencia de una relación no concede autorización, no transfiere la propiedad del proceso y no obliga a ejecutar el handoff en toda instancia.

La materialización reutiliza `AppCode` y `ProcessId`; no crea un identificador serializado paralelo, no implementa el payload runtime de continuidad, no crea rutas o deep links, no implementa inbox/outbox, productores, consumidores ni escritura cruzada.

Esta materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts` y no toca Supabase. `SHELL-CON-015` materializa separadamente el contrato estático de ítems de trabajo en el módulo hermano `packages/contracts/work-items`.

## Módulo de ítems de trabajo

`SHELL-CON-015::GLOBAL` materializa internamente `packages/contracts/work-items` como proyección estática del contrato lógico `@vento/contracts/work-items`.

La superficie contiene exactamente 29 campos contractuales, 8 clases de ítem de trabajo, 16 estados conceptuales, 7 estados de readiness y 6 niveles de prioridad. No contiene instancias runtime ni un catálogo de obligaciones actuales.

`work_item_id` permanece como referencia opaca: esta materialización no define sintaxis, patrón, longitud, serialización ni pertenencia estática. La identidad de proceso, estado, acción, evento y handoff continúa en sus autoridades compartidas existentes.

La materialización reutiliza `AppCode`, `ProcessId`, `ProcessStateId`, `FunctionalActionId`, `BusinessEventId` y `ApplicationHandoffRelation` cuando corresponda, sin copiar sus catálogos ni transportar autoridad.

Esta materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts`, no implementa claims, leases, prioridad runtime, scheduler, workflow engine, persistencia, colas, APIs, navegación, UI, autorización ni Supabase. `SHELL-CON-016` materializa separadamente la proyección estática de propiedad funcional en el módulo hermano `packages/contracts/ownership`.


## Módulo de propiedad funcional

`SHELL-CON-016::GLOBAL` materializa internamente `packages/contracts/ownership` como proyección estática del contrato lógico `@vento/contracts/ownership`.

La superficie adopta exactamente 69 asignaciones de propietaria de proceso desde `PROC-CAT-005`, conserva el universo de 10 `AppCode` y distingue que 9 `AppCode` están efectivamente usados como propietaria de proceso en el corte vigente porque `shell` tiene 0 asignaciones.

Las 217 decisiones de fuente objetivo de `CAP-MAP-008` se conservan mediante su modelo canónico familia más excepción. El corte comprende 18 familias; el módulo materializa 18 proyecciones base de familia y los 5 estados de fuente objetivo, pero no fabrica una segunda tabla editable con 217 filas ni crea un `ownership_id`.

La propiedad funcional permanece separada de autorización, actor, participación, consumo, repositorio, Supabase, pantalla, navegación, evento, handoff e ítem de trabajo. Las representaciones `REFERENCE`, `PROJECTION`, `CONTROLLED_CACHE`, `DERIVED_RESULT` y `EVIDENCE_COPY` no adquieren autoridad sobre el original por su sola existencia.

El caso `public.employee_shifts` se conserva como deuda AS-IS preexistente documentada por `CAP-MAP-013`: VISO y ANIMA pueden editar actualmente, mientras la frontera objetivo mantiene a VISO como propietaria de publicación/corrección y a ANIMA como consumidora. Esta instancia no remedia ese conflicto.

La materialización no añade `exports` públicos, no modifica la versión de `@vento/contracts`, no reasigna propiedad, no implementa escritura cross-app, persistencia, autorización, consumidores, APIs, UI, Supabase, RLS, migraciones ni datos. `SHELL-CON-017` materializa separadamente el contrato de principal técnico de integración en el módulo hermano `packages/contracts/integrations`.

## Módulo de integraciones externas

`SHELL-CON-017::GLOBAL` materializa internamente `packages/contracts/integrations` para la semántica lógica `@vento/contracts/integrations` con `IntegrationPrincipalId`, `IntegrationPrincipal` e `IntegrationPrincipalRef`. Conserva 21 decisiones `ESPECIFICADO`, 11 `PENDIENTE_DE_EVIDENCIA`, 10 `NO_APLICA` y 0 valores físicos de `IntegrationPrincipalId`.

`SHELL-CON-018::GLOBAL` amplía el módulo con `ExternalCredentialId` y `ExternalCredentialRef`. Conserva 9 `PENDIENTE_DE_EVIDENCIA`, 2 `NO_APLICA` y 10 `NO_APLICA_ACTUAL`, con 0 valores físicos de `ExternalCredentialId`, 0 referencias persistidas y 0 secretos. `INT-EXT-003..008` e `INT-DB-002` conservan su autoridad.

`SHELL-CON-019::GLOBAL` materializa `ExternalReceivedEvent<TNormalizedAssertion>`. La cobertura conserva 21 decisiones, incluidas 2 `APLICA_EVENTO_INBOUND_ACREDITADO` para Wompi y RevenueCat y 19 sin evento externo recibido acreditado. La recepción externa no es un hecho empresarial ni transporta por defecto el payload sensible. El símbolo contractual `ExternalReceivedEvent` permanece como identidad de tipo interno de esa forma genérica.

`SHELL-CON-020::GLOBAL` materializa `CanonicalSaleId` y `CanonicalSale<TSaleLine>` como representación estática de una venta individual. La forma mantiene 22 campos de nivel superior y 6 componentes monetarios, exige una colección no vacía de `TSaleLine` y conserva la semántica de `INT-POS-005` e `INT-SALES-001`. Una venta histórica Makos conserva Makos como fuente; PULSO solo es fuente bajo autoridad aprobada. `source_system`, `source_sale_id`, `source_revision`, `occurred_at` y `recorded_at` permanecen separados. Esta etapa conserva 0 ventas operativas y 0 cambios Supabase.

`SHELL-CON-021::GLOBAL` materializa `CanonicalSaleLineId` y `CanonicalSaleLine` y concreta la composición `CanonicalSale<CanonicalSaleLine>` sin redefinir el encabezado de venta. La semántica propietaria permanece en `INT-POS-005..013` e `INT-SALES-001`.

`CanonicalSaleLine` contiene 20 campos de nivel superior y 7 componentes monetarios. Conserva identidad estable de línea, pertenencia por `sale_id`, identidad/secuencia/revisión de origen cuando existan, `sold_item_ref`, referencias separadas a producto/presentación/receta/mapping, cantidad/unidad, snapshot histórico, estado acreditable, temporalidad condicional, procedencia y correlación.

`CanonicalSaleLineId` es estable, opaco y no secreto. `ACTIVE` y `CANCELLED` solo se materializan con equivalencia semántica acreditada. `MAPPED`, `NOT_PROVIDED` y `UNRESOLVED` conservan la semántica aprobada. Mapping, cuarentena, liberación, retry, replay, sincronización tardía y revisiones válidas no cambian su identidad. `source_line_id` no se fabrica; la posición o número de fila no es identidad universal.

El flujo agregado `makos_excel` no se eleva a línea individual sin granularidad e identidad suficientes. Una fila agregada, número de fila, producto + fecha + sede o hash de archivo no sustituyen `CanonicalSaleLineId`.

La materialización crea 0 valores físicos de `CanonicalSaleLineId`, 0 líneas operativas, 0 persistencia, 0 mappings runtime, 0 consumidores migrados, 0 efectos downstream, 0 secretos y 0 cambios Supabase. No modifica `packages/contracts/package.json`, no añade `exports`, no extiende `generated/index.ts` y no publica el subpath.

Para trazabilidad histórica, `SHELL-CON-020` identifica la venta canónica ya materializada, `SHELL-CON-021` identifica la línea canónica ya materializada y `SHELL-CON-022` identifica el mapping compartido materializado en esta instancia.

`SHELL-CON-022::GLOBAL` materializa la tarea `SHELL-CON-022` y amplía el mismo módulo con `ExternalIdentifierMappingId`, `ExternalIdentifierRef`, `ExternalIdentifierMapping` y `ExternalIdentifierMappingRef` como forma estática compartida de mapping bajo la autoridad semántica de `INT-EXT-013`, con especializaciones preservadas de `INT-POS-010`, `INT-POS-011` e `INT-POS-013`.

`ExternalIdentifierRef` conserva exactamente 7 dimensiones contractuales: sistema externo, ambiente, superficie, namespace externo, clase, kind y valor. `ExternalIdentifierMapping` conserva exactamente 14 campos de nivel superior y `ExternalIdentifierMappingRef` exactamente 2 campos: `mapping_id` y `contract_version`.

El contrato conserva exactamente 10 clases de identificador, 7 relaciones y 8 estados compartidos. La misma cadena no implica la misma identidad fuera de su namespace; coincidencia de UUID, email, teléfono, nombre, dirección, coordenadas, producto, `source_row_number`, hash o timestamp no acredita mapping exacto.

`ExternalReceivedEvent.mapping_refs[]` y `CanonicalSaleLine.mapping_refs[]` permanecen físicamente sin migrar en esta instancia; `ExternalIdentifierMappingRef` queda como referencia tipada objetivo para una adopción posterior autorizada. Un mapping `RESOLVED` no concede autorización, autenticidad no sustituye mapping y mapping no sustituye idempotencia.

La cobertura estática preserva `EXT-SYS-001..021` con adopción 21/21, faltantes 0 y duplicados 0. Wompi separa transaction ID, reference, canonical ID propagado y event ID; RevenueCat separa `app_user_id`, producto, original transaction y aliases; Expo Push Service conserva push token como routing ref; Google `place_id` no se convierte en `site_id`; PassKit mantiene separados serial, pass type, device library ID, push token y owner; Zebra requiere vínculo acreditado; `makos_excel` no obtiene granularidad individual; telefonía/voz conserva bloqueo hasta `TI-INT-003`.

`INT-DB-004` conserva en exclusiva la persistencia física posterior. Esta materialización crea 0 valores físicos de `ExternalIdentifierMappingId`, 0 mappings operativos, 0 tablas, 0 índices, 0 RPC, 0 migraciones, 0 consumidores migrados y 0 cambios Supabase.

Las seis instancias `SHELL-CON-017::GLOBAL` a `SHELL-CON-022::GLOBAL` quedaron materializadas como fundaciones estáticas `PRE_E5_FOUNDATION` antes de esta instancia.

`SHELL-CON-023::GLOBAL` materializa la tarea `SHELL-CON-023` y amplía el módulo con `IntegrationIdempotencyScope`, `IntegrationIdempotencyRef`, `IntegrationIdempotencyRecord`, `ExternalIntegrationClaimState`, `IntegrationIdempotencyOutcome`, `IntegrationReconciliationRef`, `IntegrationReconciliationCase` e `IntegrationReconciliationClosureOutcome`.

El contrato conserva exactamente 7 alcances idempotentes, 7 estados de claim, 8 outcomes idempotentes y 8 cierres de conciliación. `IntegrationIdempotencyRef` conserva 6 campos, `IntegrationIdempotencyRecord` 21 campos de nivel superior e `IntegrationReconciliationCase` 23 campos de nivel superior.

No existe una clave global de Vento OS ni de una venta. Retry y redelivery conservan la identidad; misma identidad con huella compatible recupera resultado previo, mientras una huella incompatible produce `CONFLICTING_REUSE`. `OUTCOME_UNKNOWN` y `RESULT_UNKNOWN` permanecen conceptos distintos y la incertidumbre exige consulta o conciliación antes de repetir un efecto.

`IntegrationReconciliationRef` permanece separado de idempotency key, event ID, receipt ID, mapping ID, sale ID y effect ID. La conciliación compara fuentes autoritativas, no las sustituye, no ejecuta escrituras cruzadas y no reaplica efectos confirmados. No existe un cierre `UNKNOWN`.

`ExternalReceivedEvent.idempotency_ref` permanece físicamente sin migrar; `IntegrationIdempotencyRef` queda como tipo objetivo posterior. Mapping, idempotencia, correlación y conciliación siguen separados. `CanonicalSaleId` y `CanonicalSaleLineId` no son claves universales de efectos.

La cobertura preserva `EXT-SYS-001..021` con adopción 21/21, faltantes 0, duplicados 0 y distribución `1 + 6 + 2 + 2 + 1 + 1 + 7 + 1 = 21`. `makos_excel` no acredita idempotencia individual; telefonía/voz conserva bloqueo hasta `TI-INT-003`.

`INT-DB-005`, `INT-DB-008` e `INT-DB-007` conservan respectivamente persistencia física de idempotencia, conciliación y auditoría. Esta instancia crea 0 registros idempotentes operativos, 0 casos de conciliación operativos, 0 claims runtime, 0 retries runtime, 0 tablas, 0 índices, 0 RPC, 0 migraciones, 0 consumidores migrados y 0 cambios Supabase.

`SHELL-CON-024::GLOBAL` materializa el contrato estático compartido de disposición para cuarentena, dead-letter, rechazo seguro, intervención y referencia de compensación sin ejecutar tratamiento runtime.

La superficie añade `IntegrationDispositionCaseId`, `IntegrationDispositionCaseRef`, `IntegrationDispositionCase`, `IntegrationFailureScope`, `IntegrationPartialityClass`, `IntegrationDisposition`, `IntegrationQuarantineReason`, `IntegrationQuarantineRef`, `IntegrationDeadLetterGate`, `IntegrationDeadLetterRef`, `IntegrationManualInterventionAction` e `IntegrationCompensationPlanRef`.

Se preservan exactamente 8 alcances de fallo, 9 clases de parcialidad, 12 disposiciones, 8 razones de cuarentena, 7 puertas de dead-letter y 10 acciones manuales autorizables. Los 8 cierres de conciliación de `SHELL-CON-023` se reutilizan mediante `IntegrationReconciliationClosureOutcome` y no se duplican.

`IntegrationDispositionCaseRef` conserva 2 campos, `IntegrationCompensationPlanRef` 8 campos e `IntegrationDispositionCase` 39 campos de nivel superior. `IntegrationDispositionCaseId` es estable, opaco y no secreto, y permanece separado de operación, evento, receipt, intento, mapping, venta, correlación, idempotencia, conciliación y compensación.

Cuarentena no es dead-letter; dead-letter no es rechazo empresarial; resultado desconocido no se cierra por cuarentena, dead-letter o rechazo. Retry agotado no completa dead-letter ni produce rechazo terminal automáticamente. El reproceso de la misma intención conserva identidad e idempotencia; un cambio material crea corrección o sucesor.

La compensación exige un efecto original confirmado, tiene identidad e idempotencia propias, conserva el original y se ejecuta únicamente dentro de la propietaria del efecto. No existe rollback global entre PULSO, NEXO, NUMERA, PASS y proveedor.

La matriz conserva `EXT-SYS-001..021` 21/21, faltantes 0, duplicados 0 y la clasificación heredada de 023. `EXT-SYS-013` conserva `EXTERNAL-SALE-LINE-QUARANTINE-001` como especialización POS; `EXT-SYS-020` permanece bloqueado sin binding acreditado.

`INT-DB-006`, `INT-DB-007` e `INT-DB-008` conservan materialización física posterior; las responsabilidades de cola y recuperación permanecen en `QUEUE-ARC-008`, `QUEUE-ARC-009`, `QUEUE-ARC-011` y `QUEUE-ARC-012`. Esta instancia crea 0 casos de disposición operativos, 0 compensaciones reales, 0 persistencia, 0 colas/workers, 0 consumidores migrados y 0 cambios Supabase.

Las ocho instancias `SHELL-CON-017::GLOBAL` a `SHELL-CON-024::GLOBAL` son fundaciones estáticas `PRE_E5_FOUNDATION`. `SHELL-NORM-001` queda como siguiente tarea reservada y abre la familia `@vento/data-normalization` sin ser desarrollada por esta instancia.
