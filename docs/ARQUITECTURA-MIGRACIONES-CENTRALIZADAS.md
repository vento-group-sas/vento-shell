# Arquitectura de Migraciones Centralizadas

## Autoridad canónica

VENTO mantiene una única autoridad versionada de migraciones Supabase:

```text
vento-shell/
  supabase/
    migrations/          -> fuente SQL canónica
    MIGRATION_MANIFEST.md -> inventario verificable del historial físico
```

Los repositorios consumidores no crean, copian ni mantienen una autoridad paralela de migraciones. Cuando una aplicación necesita un cambio de base de datos, la migración se crea, versiona y documenta en `vento-shell`.

`supabase/MIGRATION_MANIFEST.md` no sustituye los archivos SQL. Su función es demostrar, para el mismo checkout, qué archivos existen y cuál es su identidad física.

## Fuente SQL e inventario

`supabase/migrations/` es el universo canónico de migraciones VENTO. Cada archivo regular contenido bajo ese directorio debe aparecer exactamente una vez en `supabase/MIGRATION_MANIFEST.md`.

El manifiesto conserva estas columnas:

| Campo | Regla |
| --- | --- |
| `version` | Prefijo de versión del nombre físico, o `UNVERSIONED` para una excepción histórica sin prefijo reconocible. |
| `filename` | Nombre o ruta relativa exacta dentro de `supabase/migrations/`. |
| `sha256` | SHA-256 del contenido versionado canonico; CRLF introducido por checkout se normaliza a LF antes del calculo. |
| `bytes` | Tamano exacto en bytes del contenido versionado canonico despues de neutralizar solo CRLF de checkout. |
| `kind` | `BASELINE`, `STANDARD`, `MANUAL_LEGACY` o `FIXED_LEGACY`. |
| `findings` | Hallazgos verificables separados por coma; vacío cuando no existen. |
| `lineage` | Relaciones demostrables por contenido, familia lógica o versión compartida. |
| `notes` | Disposición documental del hallazgo. |

Los hallazgos reconocidos inicialmente son:

```text
EMPTY_FILE
CONTENT_DUPLICATE
SAME_LOGICAL_FAMILY
LEGACY_NAMING
```

Las disposiciones documentales usadas por el inventario son:

```text
SIN_HALLAZGO
HISTÓRICO_PRESERVADO
RELACIÓN_DOCUMENTADA
REQUIERE_TAREA_PROPIETARIA
```

Un hallazgo no autoriza a borrar, renombrar, reescribir ni declarar supersedida una migración histórica.

## Generación y validación

El manifiesto se deriva mecánicamente del árbol físico; su cardinalidad no se mantiene a mano.

```text
npm run supabase:migrations:manifest:build
npm run supabase:migrations:manifest:check
```

`build` recalcula filas, SHA-256, bytes, clasificación y relaciones verificables.

`check` falla cerrado cuando ocurre cualquiera de estos casos:

- archivo físico sin fila;
- fila que ya no coincide con el archivo físico;
- hash, bytes, clasificación, hallazgos o lineage obsoletos;
- orden o cardinalidad inconsistentes;
- manifiesto ausente;
- una migración nueva incumple la convención de nombre;
- el manifiesto intenta representar estado aplicado por entorno.

El Required Gate ejecuta `supabase:migrations:manifest:check`, por lo que una migración nueva y su manifiesto forman una unidad de cambio.

## Versionado de migraciones nuevas

Las migraciones nuevas usan exclusivamente:

```text
^[0-9]{14}_[a-z0-9][a-z0-9_]*\.sql$
```

Reglas:

1. `00000000000000_baseline.sql` permanece reservado como baseline.
2. El prefijo de catorce dígitos es la identidad ordenable de versión.
3. El slug utiliza minúsculas, números y `_`.
4. No se crean nuevos sufijos `.manual.sql` ni `.fixed.sql`.
5. Los nombres históricos que no cumplen la convención actual se preservan y se clasifican; no se renombran retrospectivamente.
6. Una coincidencia de nombre no demuestra por sí sola qué objetos SQL cambia ni si fue aplicada en un entorno.

## Inmutabilidad del historial

La regla predeterminada de corrección es:

```text
historial existente
-> se preserva
-> corrección mediante nueva migración forward
-> relación documentada cuando exista evidencia verificable
```

Los archivos vacíos, los duplicados de contenido y las excepciones legacy permanecen dentro del universo canónico hasta que una decisión propietaria explícita autorice otra disposición.

## Excepción propietaria de rebaseline Supabase — 2026-08-27

Esta sección tiene precedencia únicamente para el corte de época migratoria aprobado explícitamente por VENTO_OWNER el 2026-08-27 durante AUTH-DB-005. No modifica la regla normal aplicable a futuras migraciones.

**Fuente temporal AS-IS autorizada:** `vento-os-dev / clzdpinthhtknkmefsxx`.

**Motivo del corte:** el historial legacy anterior a AUTH-DB-001 dejó de constituir un replay autoritativo debido a cambios históricos directos fuera de la cadena de migraciones y a incompatibilidades reproducibles demostradas durante la implementación de AUTH-DB-005.

Para este corte único se autoriza expresamente:

1. reemplazar `00000000000000_baseline.sql` por un baseline capturado desde el estado remoto AS-IS aceptado;
2. retirar de la cadena ejecutable vigente las migraciones legacy anteriores a AUTH-DB-001;
3. preservar ese historial anterior mediante Git history, sin exigir que continúe físicamente dentro de `supabase/migrations/` ni del manifiesto vigente;
4. conservar sobre el nuevo baseline AUTH-DB-001, AUTH-DB-002, AUTH-DB-003 y AUTH-DB-004 en el candidato de `main`, y AUTH-DB-005 posteriormente sobre su rama rebasada;
5. incorporar explícitamente al baseline las personalizaciones VENTO que el dump normal no reconstruye por sí solo, incluyendo Auth, Storage, buckets, Realtime y datos estáticos de autorización necesarios para reproducibilidad;
6. reconciliar posteriormente el ledger remoto de migraciones únicamente como metadata de historial, sin usar esa reconciliación para ejecutar DDL o DML;
7. mantener prohibido `db reset --linked` y cualquier reset destructivo de schema o datos remotos;
8. mantener cron como superficie runtime separada y no versionar comandos, cabeceras, credenciales ni secretos;
9. no modificar datos empresariales remotos como consecuencia del corte.

El remoto es autoridad únicamente para la captura AS-IS de este corte. Una vez certificado y publicado el nuevo baseline, `vento-shell` vuelve a ser la autoridad EXPECTED y todo entorno remoto vuelve a ser OBSERVED conforme a AUTH-DB-028.

La autorización de este corte proviene de la decisión propietaria explícita y no de un resultado de drift. Detectar drift continúa sin autorizar reparaciones por inferencia.

Desde la nueva época migratoria vuelve a regir la política normal:

```text
baseline versionado vigente
-> migraciones forward nuevas
-> historial de la nueva época inmutable por defecto
-> remoto observado, no autoridad de diseño
```

## Separación de estado por entorno

El repositorio demuestra qué migraciones están versionadas. No demuestra, por sí solo, qué migraciones están aplicadas en local, staging o producción.

Por tanto, `supabase/MIGRATION_MANIFEST.md` no utiliza estados como:

```text
applied_remote
applied_staging
applied_production
pending_production
```

La medición de baseline y drift entre entornos pertenece a `AUTH-DB-028`.

## Baseline y control de drift

`AUTH-DB-028::GLOBAL` materializa el controlador reusable de baseline y drift sin crear una segunda fuente de verdad de schema ni de historial migratorio.

Las entradas estables son:

```text
npm run supabase:drift:test
npm run supabase:drift:expected
npm run supabase:drift:local
npm run supabase:drift:remote -- --environment-role staging --project-ref <ref> --owner <owner>
npm run supabase:drift:remote -- --environment-role production --project-ref <ref> --owner <owner>
```

Los parámetros `<ref>` y `<owner>` anteriores representan valores reales exigidos en cada ejecución; no son valores por defecto ni autorización para inferir una identidad ambiental.

La referencia siempre se construye así:

```text
EXPECTED(candidate versionado en vento-shell)
vs.
OBSERVED(environment identificado)
```

El estado esperado conserva el commit candidato, el árbol Git, el manifiesto y SHA-256 de migraciones, `supabase/config.toml`, versión de herramientas, Edge Functions versionadas, `verify_jwt` y nombres de secretos referenciados sin valores.

La observación local reutiliza el harness de `AUTH-DB-027` y fingerprints deterministas de PostgreSQL. La observación hosted utiliza exclusivamente lecturas soportadas: Management API GET y el endpoint SQL `database/query/read-only`. El controlador rechaza por allowlist interna métodos o endpoints de mutación.

La comparación cubre, según aplicabilidad:

- historial migratorio;
- relaciones, columnas, constraints, índices y vistas;
- funciones/RPC, triggers, grants y RLS;
- extensiones, publications y tipos;
- Data API;
- Auth contractual no secreto;
- Storage y buckets;
- Realtime;
- Edge Functions y `verify_jwt`;
- cron cuando `pg_cron` sea aplicable;
- nombres de secretos requeridos, nunca sus valores.

`vital` se excluye explícitamente de `governed_schemas`. Su existencia puede demostrarse como frontera, pero sus objetos no participan en fingerprints gobernados por Vento OS.

Un ambiente remoto solo puede usar rol `staging` o `production` y requiere `project_ref` y owner explícitos. Un nombre visible como `dev`, `staging` o `prod` no sustituye su identidad técnica.

Los resultados de drift son:

```text
EXPECTED_OVERLAY
TEMPORARY_EXCEPTION
UNAUTHORIZED_DRIFT
INSUFFICIENT_EVIDENCE
```

La allowlist solo admite coincidencia exacta por `drift_id`, superficie, identidad y ambiente. No admite comodines. `TEMPORARY_EXCEPTION` exige expiración futura, owner, aprobador, riesgo, evidencia y tratamiento.

`UNAUTHORIZED_DRIFT` e `INSUFFICIENT_EVIDENCE` bloquean certificación. Una superficie requerida que no pueda leerse no se convierte en PASS implícito.

La evidencia opcional solo puede escribirse bajo `.delivery/`. El controlador no persiste valores de secretos ni connection strings completas.

Detectar drift no autoriza ninguna de estas operaciones:

```text
db pull
migration repair
db push
db reset --linked
DDL
DML
cambios de Auth
cambios de RLS o grants
cambios de Storage
redeploy de Edge Functions
```

Toda reparación pertenece a su tarea o paquete propietario y debe volver a producir baseline y comparación después de la corrección.

<!-- CORR-011-HOSTED-PARITY:START -->
## Paridad hosted pre-E5 — MRP015-040

La fundación pre-E5 de Supabase no puede certificar paridad únicamente construyendo el estado EXPECTED local. `MRP015-040 / RESOURCE_MANIFEST_PASS` exige conjuntamente:

1. `MIGRATION_MANIFEST`;
2. `EXPECTED_RESOURCE_MANIFEST`;
3. `STAGING_HOSTED_RESOURCE_PARITY` contra el STAGING identificado por `rcrxixmqhrndcervbllp`, con scope `full` y comportamiento fail-closed.

El contrato hosted pre-E5 se versiona dentro del contrato de package-readiness. Representa el baseline operativo AS-IS que debe existir antes de que los paquetes E5 comiencen a transformarlo.

Para cron se versionan exclusivamente:

- identidad `jobname`;
- `schedule`;
- estado `active`.

No se versionan comandos cron, hashes de comandos, headers, tokens ni credenciales.

Para `internal_job_secrets` se versionan exclusivamente las claves que deben estar configuradas. El valor secreto nunca forma parte de EXPECTED, evidencia, diff ni logs.

PRODUCTION continúa siendo OBSERVED y no se convierte por inferencia en plantilla de STAGING. Una disposición futura como `FUSIONAR`, `MOVER` o `RETIRAR` no modifica anticipadamente el baseline pre-E5: esa transformación corresponde al paquete propietario que la materialice.

La observación hosted permanece read-only. Detectar ausencia de cron, secreto, bucket, configuración, Edge Function u otra superficie no autoriza su creación automática. El resultado debe bloquear la entrada a implementación hasta que exista una reparación gobernada y posteriormente se regenere la evidencia de la fundación.

La falta de credencial del Management API, una superficie requerida ilegible o una autoridad EXPECTED ausente producen `INSUFFICIENT_EVIDENCE`; nunca PASS implícito.

### Aceptación del detector y certificación del ambiente

La aceptación técnica de `DELIV-PKG-015::CORR-011` verifica el detector, sus consumidores y la preservación de los bloqueos. No exige reparar recursos hosted fuera de sus cambios autorizados.

Se distinguen tres resultados independientes:

| Resultado | Significado | No significa |
| --- | --- | --- |
| `OBSERVATION_STATUS: PASS` | La comparación dispone de evidencia suficiente para el scope informado, aunque detecte diferencias. | Ambiente certificado o despliegue autorizado. |
| `ENVIRONMENT_CERTIFIED: YES` | La evaluación del ambiente no conserva diferencias bloqueantes; para remoto requiere scope `full`. | Permiso de despliegue, cutover o promoción. |
| Pruebas de aceptación del detector en PASS | Casos sintéticos positivos y negativos comprueban el comportamiento esperado y sus códigos de salida. | Certificación de STAGING o ejecución real del paquete. |

`ESTADO` continúa expresando el resultado del comando bajo su modo de ejecución. `CERTIFICATION` conserva su clasificación ambiental original. Una observación completa con `UNAUTHORIZED_DRIFT` mantiene `ENVIRONMENT_CERTIFIED: NO` y termina con código 1 cuando se usa `--strict`. La ausencia de credencial, una superficie ilegible o una salida incoherente no cuentan como una observación completa válida.

Las comprobaciones `environment` e `history` conservan su alcance limitado: el campo `ENVIRONMENT_CERTIFIED` informa `NOT_APPLICABLE`, nunca una certificación remota `full`. Construir EXPECTED tampoco equivale a observar un ambiente.

El resultado negativo esperado se prueba mediante fixtures sintéticos y aserciones explícitas; no mediante aceptar cualquier error, capturar indiscriminadamente exit 1 o suprimir `--strict`. La validación de consistencia `docs:package:readiness:check` puede terminar correctamente y seguir informando `IMPLEMENTATION_READY: NO`.

Esta regularización no cambia el scope, la autoridad EXPECTED, las diferencias detectadas, los controles de autorización, la evidencia requerida de `MRP015-040` ni el orden de ejecución. Una evidencia de prueba del detector no se transforma en `RESOURCE_MANIFEST_PASS`. El cierre de la corrección del detector y la reparación ambiental tienen resultados separados; la preparación física seguirá bloqueada mientras falte la evidencia ambiental requerida.

<!-- CORR-011-HOSTED-PARITY:END -->

## Fronteras de responsabilidad

| Tarea | Responsabilidad |
| --- | --- |
| `AUTH-DB-015` | Inventario y versionado verificable del historial físico de migraciones. |
| `AUTH-DB-027` | Harness de pruebas de esquema, integridad, RLS, RPC y migraciones. |
| `AUTH-DB-028` | Baseline y drift entre local, staging y producción mediante observación read-only. |
| `AUTH-DB-029` | Respaldo, restauración y rollback. |

`AUTH-DB-015` y `AUTH-DB-027` no representan estado remoto. Como regla general, `AUTH-DB-028` observa entornos remotos únicamente en modo read-only y no los convierte en fuente canónica. La única excepción vigente es el corte propietario de rebaseline Supabase del 2026-08-27 definido en este documento, durante cuya captura el remoto identificado fue autoridad AS-IS temporal. Finalizada esa captura, el candidato versionado vuelve a ser EXPECTED y el remoto vuelve a ser OBSERVED. Ninguna de estas tareas aplica migraciones o repara drift por inferencia.

## Flujo para una migración nueva

1. Crear el archivo exclusivamente en `vento-shell/supabase/migrations/` con el nombre canónico.
2. Implementar el SQL correspondiente según la tarea propietaria del cambio.
3. Ejecutar `npm run supabase:migrations:manifest:build` en el mismo cambio.
4. Ejecutar `npm run supabase:migrations:manifest:check`.
5. Someter el cambio al Required Gate del repositorio.
6. Tratar despliegue, drift y recuperación únicamente en sus carriles propietarios.

No se copia el archivo a repositorios consumidores para crear una segunda historia de migraciones.

## Historial legacy

El inventario conserva y clasifica las excepciones existentes, incluidas migraciones con sufijos `.manual.sql` o `.fixed.sql`, archivos vacíos, contenido idéntico bajo identidades distintas y familias lógicas repetidas.

La clasificación es descriptiva. No equivale a error de base de datos, estado de despliegue, rollback ni permiso de eliminación.

## Referencias

- `docs/plan-canonico/modular/bloques/R_SUPABASE/01_R0_PREPARACION_PRUEBAS_Y_CONTENCION_DE_RIESGOS.md`
- `supabase/migrations/`
- `supabase/MIGRATION_MANIFEST.md`
- `scripts/supabase/migration-manifest.mjs`
- `scripts/quality/supabase-db-harness.mjs`
- `scripts/supabase/environment-drift.mjs`

<!-- AUTH-DB-029-PHYSICAL-FOUNDATION -->

## Fundación física de recuperación — AUTH-DB-029

`AUTH-DB-029::GLOBAL` materializa una infraestructura reusable y fail-closed para demostrar recovery antes de los paquetes que puedan modificar Supabase.

La infraestructura conserva la separación canónica:

- backup no demuestra restore;
- restore no demuestra operabilidad;
- rollback no reescribe historial migratorio;
- después del PONR puede corresponder forward recovery, compensación o reconciliación.

El recovery envelope se ancla al candidato y baseline producidos por `AUTH-DB-028`, al migration manifest de `AUTH-DB-015` y al harness de `AUTH-DB-027`. Conserva recovery point identificable, PONR, RPO/RTO de la unidad aplicable, reconciliación y evidencia append-only.

La autocertificación global utiliza exclusivamente un esquema sintético local `vento_recovery_drill`. Demuestra rollback transaccional pre-PONR, crea un dump lógico del fixture, alcanza un PONR mediante destrucción controlada del fixture, restaura el recovery point, reconcilia el rowset exacto, elimina el fixture y vuelve a ejecutar el harness y el control de drift.

Los artefactos runtime se conservan exclusivamente bajo `.delivery/supabase-recovery/` y no se versionan.

La autocertificación local no usa staging ni producción y rechaza flags que seleccionen targets remotos. No ejecuta `db reset --linked`, `db push`, `migration repair`, restore hosted, PITR ni otra mutación remota.

La capacidad hosted se evalúa nuevamente al ejecutar porque depende del plan, configuración y versión vigentes. Un backup PostgreSQL no autoriza a declarar recuperados objetos de Storage, configuración Auth, secretos, Edge Functions, integraciones ni consumidores externos. Cada superficie conserva su mecanismo propietario de recuperación.

Los RPO/RTO usados por el fixture local certifican únicamente la mecánica de la fundación. Los paquetes y ambientes reales deben aportar objetivos propios y una autorización física específica antes de cualquier drill o recovery destructivo.
