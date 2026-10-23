# VENTO OS - Plan operativo consolidado de implementación global

> **TABLERO OPERATIVO VIVO (consultar al iniciar y reanudar trabajo):** [GitHub Issue #1020 — Estado, pendientes, evidencia y continuidad](https://github.com/vento-group-sas/vento-shell/issues/1020). El issue contiene el estado ejecutivo mutable por fase y su historial mediante comentarios; este plan conserva el alcance integral y la autoridad canónica. Reconciliar ambos con la rama, CI y MCP actuales; actualizar el issue en checkpoints de fase, no por microtarea.

> **ENTRADA OBLIGATORIA PARA TRABAJO EN VENTO SHELL:** Leer este plan en primer lugar al iniciar o reanudar cualquier inspección, auditoría, implementación, corrección o publicación del repositorio. Después leer el protocolo, las políticas y las tareas canónicas exactas que correspondan, recalcular el estado real y respetar su jerarquía de autoridad. Esta prioridad es **de consulta**, no de aprobación, ejecución ni modificación del orden canónico.

**Corte de verificación:** 2026-10-14  
**Naturaleza:** plan de ejecución detallado y trazable solicitado por el responsable. No reemplaza automáticamente documentos, tareas, registros 04A, gates ni políticas canónicas.  
**Estado del presente instrumento:** guía operativa versionable para consulta y seguimiento; no equivale a `APROBADO`, `VERIFIED` ni autorización física o de despliegue.  
**Trabajo físico vigente:** `GAP-PKG-004` en `MATURATION_DRAFT`; no se avanza a otro paquete por este documento.

## Gobierno de ejecución por fases (actualización 2026-10-21)

La aprobación humana del `package gate` determina el alcance de una fase de implementación. En las etapas `SHELL-CI-020..024`, cuando el package, el alcance y el contrato siguen vigentes, una nueva instancia física reutiliza esa aprobación mediante `--from-phase-approval`; no requiere otro `APROBADO` por cada paso rutinario.

Dentro de una fase aprobada se agrupan análisis, edición dentro del alcance declarado, build, pruebas, correcciones, commit local, push a la rama aprobada y preparación de PR. Los controladores conservan validaciones programáticas, pero no deben convertir cada transición interna en un punto de aprobación humana. Los checkpoints de decisión humana se concentran en entrada de fase, ampliación de alcance, cambios de credenciales, merge, despliegue, publicación npm, cambios de datos remotos y cierre cuando haya efectos operativos.

La política vigente de ejecución prevalece operativamente sobre prohibiciones históricas de preimplementación en registros cerrados, sin alterar registros `VERIFIED` ni permisos de plataformas externas. Siguen vigentes los controles de secretos, aislamiento de cambios ajenos, resource locks, SQL forward-only, revisión de seguridad, evidencia fresca y protección de `main`. Este documento es una guía de ejecución y no concede permisos por sí solo.

## 1. Objetivo, alcance y límites

El resultado buscado es implementar y certificar el alcance integral de VENTO OS **sin perder ninguno de los compromisos aprobados**, no cerrar una cantidad arbitraria de GAP. La fuente de verdad de tareas permanece en el plan modular; las instancias de implementación quedan en sus expedientes y ledgers, y las migraciones SQL pertenecen a VENTO Shell.

### 1.1. Regla fundamental de tres capas

1. **Definición documental:** una tarea y sus reglas pueden estar aprobadas sin que exista código, datos o despliegue.
2. **Materialización física:** una instancia global o por paquete modifica exclusivamente las superficies autorizadas, produce código o infraestructura y pasa las pruebas de su candidato.
3. **Certificación operativa:** la instancia y sus consumidores demuestran permisos, datos, UX, integraciones, piloto, recuperación y cierre con evidencia vigente y atribuible.

No sustituir una capa por otra. `APROBADA` documental no implica `IMPLEMENTED`; `PASS` de unit tests no implica QA HTTP autenticado; `main` actualizado no implica migración aplicada en STAGING; deploy no implica cierre operativo.

### 1.2. Alcance empresarial

El plan considera SHELL (hub), ANIMA, VISO, NEXO, FOGO, ORIGO, PULSO, NUMERA y PASS; TALENTO depende de su puerta de continuidad y AURA de una decision expresa de continuar, reemplazar o retirar. PASS conserva separacion del dominio de clientes frente a la identidad/roles laborales. Las experiencias web y Expo/React Native utilizan adapters y primitives compatibles, nunca una biblioteca DOM universal. `vento-group-web` no se incorpora al conteo VENTO OS por inferencia.

### 1.3. Restricciones no negociables

- Nunca inventar ID, instancia, ruta, task, package, TREQ, autorización, versión o archivo de repositorio.
- Ninguna tarea nueva sin `APROBADO` explicito; ninguna instancia física sin autoridad humana y sus gates.
- Ninguna mutacion remota de Supabase, migración empresarial, grant, push, merge o deploy por inferencia.
- Conservar historial documental, las 14 columnas y relaciones del 04A, y los TREQ históricos.
- Preservar changes ajenos de worktrees; no duplicados, backups administrativos o scripts temporales innecesarios.
- Nunca ejecutar `supabase db reset` sobre la base de trabajo que contenga datos valiosos. Reconstruccion completa solamente en entorno local descartable, aislado y expresamente habilitado.
- Rechazar permisos amplios, alias de compatibilidad expansivos, service_role en cliente, exposición de datos personales de sedes ajenas y retrocesos silenciosos de seguridad.
- Mantener separadas autorización, contexto, propiedad del dominio, UI, datos y certificación.
- Una modificacion después del commit o de la evidencia invalida las validaciones y aprobaciones que dependen de esa identidad.

## 2. Fuentes de autoridad y criterio de precedencia

| Pregunta | Fuente existente verificada | Uso operativo |
| --- | --- | --- |
| Qué tareas existen y cuál es su orden general | `docs/plan-canonico/modular/90_ORDEN_DE_IMPLEMENTACION.md` | Secuencia empresarial, dependencias, gates, correcciones posteriores |
| Como se autoriza la documentación y la física | `docs/plan-canonico/modular/01_PROTOCOLO.md` y `task-work-topology.json` | Identidad global / por paquete y gate temporal |
| Cual es la ruta documental | `execution-route.json`, `active-sequence.json`, `continuity-route.json` | Continuidad de DOCUMENTACION, independiente de la frontera física |
| Qué paquete se puede trabajar | `package-execution-policy.json`, `DELIV-PKG-015` y control `docs:package:execution:status` | Frontera elegible determinista: dependencias, capa, ID, locks |
| Qué cambios exactos estan aprobados | Expediente `package-gate-instances/<package_id>.json` y E5 | Physical discovery, targets, hallazgos, pruebas, rollback |
| Como se habilita el lifecycle | `implementation-control.json`, `SHELL-CI-020..024` | Instancias, HUMAN_GATE, avance y cierre VERIFIED |
| Fuente SQL canónicamente ejecutable | `supabase/migrations/`, `supabase/MIGRATION_MANIFEST.md` | Versionado y auditoría, NO estado aplicado de cada entorno |
| Test coverage | 04A modular, `TREQ-*`, Bloque U | Vincular regla, riesgo, test, owner, paquete y evidencia |
| Fundaciones reutilizables | Bloques H y R0/R1 | Componentes y contrato compartidos antes de consumidor |
| Adopción web | `SHELL-MIG-001..008` | Oleadas por repositorio, compatibilidad, paridad y rollback |
| Retiro global | R3 `AUTH-DB-030..031` | Solo después de cero uso residual, adopción y restauracion probada |

**Precedencia ante texto antiguo:** aplicar las correcciones posteriores `CORR-012`, `CORR-017` y `CORR-018` de la parte final de `90_ORDEN_DE_IMPLEMENTACION.md`, junto con las políticas ejecutables vigentes. Una fila histórica que afirma que un package bloqueado paraliza toda la línea no sustituye la *governed eligible frontier* posterior. Una ruta documental prioritaria concluida puede volver a flujo normal por su `return_policy`, sin alterar la frontera física de paquetes.

## 3. Estado inicial HISTÓRICO verificado y límites de ese inventario

- VENTO Shell local: rama `infra/package-gate-gap-pkg-004`, HEAD `180db76808acf9b71480f1c73fa23180f164572c`, 19 archivos con cambios existentes. VISO local: `main`, HEAD `df3f28654188e4c8a4dd64e057c1f01ef602a2ba`, 6 archivos con cambios. No asumir que todo esto este publicado en `origin/main`.
- `GAP-PKG-004`: `MATURATION_DRAFT`, autorización del gate `PENDING`, physical discovery `PENDING`, una unidad SQL forward candidata. No es un package cerrado ni autorizado para producción.
- Ultima evidencia disponible del control Shell: GAP-PKG-004 como primary de frontera, posicion 4/189, pero este denominador es **snapshot** y debe recalcularse con el control cuando corresponda; no es un porcentaje de implementación.
- Manifiesto SQL verificado: 23 migraciones versionadas, sin afirmar que esten todas aplicadas en todos los ambientes.
- Registro TREQ: 7.066 entradas segun última bateria Shell; validar integridad y estado por requisito, no considerarlas 7.066 pruebas ya implementadas.
- VENTO Shell tiene `packages/contracts`, `packages/os-context`, `packages/supabase`, `packages/data-normalization` y `packages/ui-web` (no equivalentes a releases publicadas).
- `@vento/ui-web` contiene componentes internos `Alert`, `Button`, `Card`, `AppShell`, `TaskNavigation`, `SiteSelector`, `AreaSelector`, `CrossAppHandoff`, etc.; el README indica `0/7` consumidores web migrados. El package declara `private: true`, por lo que existencia de archivos no demuestra distribución pública versionada.
- GAP-PKG-004: última prueba real VISO `44/44 PASS`, typecheck PASS, lint PASS (0 errores, 35 advertencias), build PASS; pruebas Shell contrato `7/7`, seguridad `6/6`, integración `6/6`, pgTAP candidata `50/50`, E2E `32 PASS, 1 SKIP`; 5 controles documentales/manifest PASS. El SKIP corresponde al permiso no registrado de manera persistente. Estos resultados no acreditan HTTP autenticado positivo SITE/GLOBAL ni rollout.

**Corte local 2026-10-21 - GAP-PKG-004 (evidencia de maduración, no VERIFIED):** 44/44 identidades físicas documentadas tras la conciliacion; 59 búsquedas con trazabilidad estructural y 9 unresolved aun abiertos. physical_discovery.status=PENDING, status=MATURATION_DRAFT, autorización de gate PENDING. El Shell local conserva HEAD 8b397b31 con 25 archivos preparados y el plan queda como cambio local separado, sin preparar, para evitar mezclar documental operativo y SQL en un commit. ANIMA tiene prueba local MCP 81/81 PASS y TypeScript PASS tras separar GPS preciso foreground de seguimiento optativo background; la QA física Android/iOS sigue PENDING. VISO/Supabase y el typecheck de tests globales conservan pendientes distintos, sin despliegue ni migración remota.

Este plan exige una *fotografia nueva* antes de cualquier nueva fase; nunca reutilizar un snapshot de estado como prueba fresca.

## 4. Definición verificable de 100 %

El 100 % no significa que todas las tareas históricas esten en Markdown, que existan todos los componentes o que todas las tablas se hayan creado. Se declara solamente cuando **todos** los siguientes ejes estan completos simultaneamente:

| Eje | Condicion de aceptación final |
| --- | --- |
| Plan | Todo task del alcance vigente: aprobado y materializado cuando aplique, o exclusiones/cancelaciones/diferimientos resueltos mediante decisiones canónicas, sin pendientes ocultos |
| Paquetes | Todos los `package_id` ejecutables/aplicables de la frontera terminan `CLOSED` con `SHELL-CI-024 VERIFIED`; los excluidos no cuentan como ejecución |
| Requisitos | Cada `TREQ-*` aplicable tiene owner, prueba ejecutable, ejecución `VERIFICADO` vigente; los `DIFERIDO` requieren decision final de aceptación/resolución, nunca equivalen automáticamente a PASS |
| Seguridad | Cero vulnerabilidades bloqueantes no aceptadas; privilegios, RLS, RPC, Storage, Auth, session, shared devices, simulacion y evidencia de negativas/positivas certificados |
| Datos | Fuentes de verdad, integridad, reconciliación, normalización, backfills, event log, migraciones y drift entre ambientes certificados; reconstrucción limpia aislada reproducible |
| Fundaciones | APIs versionadas/compatibles para todos los packages aplicables; builds, peer deps, CSS, imports, SSR/React Native y rollback demostrados |
| Consumidores | Todos los consumidores objetivo han adoptado las APIs aprobadas o conservan `KEEP LOCAL` con justificacion; cero copias legacy indebidas; paridad y observación certificadas |
| Apps | Todos los procesos aprobados de cada app funcionan extremo a extremo segun actor, sede, área, dispositivo y contexto; pilotos y cierre funcional aprobados |
| Integraciones | Contratos y flujos entre apps, POS externo cuando aplique, impresiones, notificaciones, colas, idempotencia, reintentos, deduplicacion y conciliacion certificados |
| Operacion | Monitorizacion, incidentes, soporte, seguridad, backups, restore, continuidad, runbooks, readiness, piloto, hypercare y handoff verificables |
| Entornos | LOCAL, STAGING y PRODUCCION auditados segun sus roles; ningun drift injustificado, secreto expuesto, salida de QA sin limpiar o deploy ajeno a un paquete |
| Cierre global | `AUTH-DB-030::GLOBAL-FINAL` y `AUTH-DB-031` aprobados fisicamente cuando corresponda; Bloque U y cierre operativo integrales, sin uso residual indebido |

### 4.1. Reglas de medición

- No sumar `DOCUMENTED`, `MATERIALIZED`, `READY_FOR_APPROVAL` y `VERIFIED` como el mismo estado.
- Cada denominador se extrae de registros actuales, no de cifras recordadas. Recalcular al entrar nueva tarea, nuevo paquete o cambio de alcance.
- Medir progreso por: packages CI024 VERIFIED / packages aplicables, TREQ VERIFICADO / TREQ aplicables, consumidores certificados / consumidores aprobados, migraciones aplicadas y validadas / migraciones objetivo del entorno, procesos E2E aprobados / procesos del alcance vigente.
- `N/A` solo por causa y gate documentados; `SKIP`, `UNKNOWN`, `STALE`, hallazgo pendiente y QA sin ejecutar no son PASS.
- Guardar evidencia con repositorio, target, versión, ambiente, commit, migración, fecha, actor de prueba, resultado, pruebas positivas/negativas, aprobación y rollback asociado.

## 5. Algoritmo de selección del siguiente trabajo

1. Consultar la ruta documental solo para tareas documentales. No usar `active-sequence.json` para decidir automáticamente el próximo package físico.
2. Ejecutar/consultar el control canónico `docs:package:execution:status` y comprobar dependencia explicita, capa, `package_id`, locks y estado real.
3. Construir la *dependency-eligible frontier* conforme a `DELIV-PKG-015`, no una lista manual de GAP que parezcan urgentes.
4. Consumir primero toda instancia `PRE_E5_FOUNDATION` que sea prerequisito real del paquete elegible. Una fundación global se implementa una sola vez, pero requiere aprobación física propia.
5. `WAITING` bloquea solo al paquete afectado; `ACTIVE_PHYSICAL` preserva sus locks exactos, sin monopolizar la frontera global. La política puede exponer otra raiz independiente eligible, pero **nunca** autoriza automáticamente sus cambios.
6. Ante dos roots elegibles, aplicar el orden determinista de dependencias, capa e identificador; jamas seleccionar `GAP-PKG-005` por preferencia humana o por un número.
7. Cualquier cambio del expediente posterior a la aprobación exige `remature`, reconciliación de alcance, nuevo gate y aprobación; no ampliar silenciosamente un CI020 vivo.
8. Verificar cero conflictos de archivos, migrations/schema, configuración Supabase, helpers Edge, manifest de dependencias y workflows mediante locks persistentes/exclusivos que pertenezcan al control.
9. Para paquetes multi-repo, un checkout independiente por repositorio con `base_commit`, `candidate_commit`, PR y `merge_commit` propios; commits/merges serializados y reconciliados con el `main` más reciente. Nunca fabricar un SHA global.
10. Emitir solamente la accion exacta autorizada; repetir el control después de cada cierre VERIFIED. Un `GAP` cerrado no equivale al cierre de su app ni de VENTO OS.

## 6. Secuencia operativa de implementación

La secuencia es una **red de dependencias**, no una única cola de centenares de pasos. Las fundaciones globales y las unidades por paquete conservan puertas distintas; un paquete completo atraviesa CI020..CI024 mientras otros elegibles pueden estar en auditoría, siempre que la política permita coexistencia.

### Etapa A - Baseline, alcance y gobierno inicial

**Tareas/fuentes:** E1..E5, `DELIV-PKG-001..025`, `DELIV-PKG-015`, 04A, Bloque T, `01_PROTOCOLO.md`.

- [ ] Leer estado canónicamente vigente, ruta documental, política de package y topologia física.
- [ ] Inventariar los 11 nombres de aplicación canónicos y las decisiones sobre TALENTO/AURA sin declarar implementación para lo diferido.
- [ ] Inventariar repositorios, rama, `main`, `origin`, worktree dirty/staged, cambios ajenos y commits de referencia.
- [ ] Enumerar packages, capas, dependencias explicitas, unidades, gates, locks y targets exactos.
- [ ] Conciliar cada brecha GAP con proceso/capacidad, source E1, riesgos y tareas propietarias sin duplicaciones.
- [ ] Conciliar decisiones aprobadas E2/E3/E4/X, requisitos NFR, UI, datasets y criterios de prueba con su paquete E5.
- [ ] Verificar el 04A completo: 14 columnas, IDs, relaciones, secuencias, integridad y TREQ enlazados a tarea, riesgo, paquete y evidencia.
- [ ] Clasificar `NO_EJECUTABLE`, bloqueado, dependencia no resuelta, diferido y excluido, con motivo canónicamente verificable.
- [ ] Distinguir proyecto local contra GitHub remoto; ninguna rama dirty se considera publicada.
- [ ] Distinguir estado de código, migración SQL, historia aplicada LOCAL/STAGING/PROD, pruebas y despliegues.
- [ ] Registrar hallazgos P0 seguridad/integridad para tratamiento en su paquete propietario, sin alterar el orden de paquetes.
- [ ] Confirmar acceso de prueba seguro a entornos permitidos y quien autoriza cada cambio de esquema, usuario, dispositivo, archivo o despliegue.
- [ ] Elegir salida cuantificable: inventario de cobertura con estado real y próxima accion devuelta por el coordinador, no un porcentaje estimado.

**Salida:** baseline fechado y sin rutas ficticias; decision explicita de fundaciones faltantes para la primera raiz elegible.

### Etapa B - Fundación de calidad, CI, pruebas y recuperación

**Tareas:** `SHELL-CI-001..019`, `AUTH-DB-015`, `AUTH-DB-027..029`, `AUTH-DB-001..005`, Bloque T, Bloque Z y Bloque AC segun alcance.

- [ ] Asegurar ejecutores reproducibles para tests, typecheck, lint, build/export, auditoría de secretos y matrices TREQ.
- [ ] Validar origen y cierre de PR, hashes de artefactos, ramas, quality gates, conflictos de worktrees, pipelines y evidencia por commit.
- [ ] Crear o verificar inventario único `supabase/migrations/` y manifiesto, sin confundir declaracion con aplicación.
- [ ] Construir el harness `AUTH-DB-027` para esquema, integridad, RLS, RPC y migraciones; exigir conteos reales y oraculos negativos/positivos.
- [ ] Implementar baseline y drift `AUTH-DB-028` para cada ambiente, permisos, vistas, policies, funciones, datos/objetos pertinentes.
- [ ] Validar respaldo, restauracion y rollback `AUTH-DB-029`; ejecutar ejercicio de restauracion sobre entorno aislado y medir resultado.
- [ ] Crear una base de prueba **descartable** independiente de LOCAL de trabajo y reconstruirla desde cero con migraciones exactas y seeds de QA aprobados.
- [ ] Medir 0 fallos de migración, faltantes, duplicados, diferencias no justificadas, SQL roto, grants peligrosos y fixtures residuales.
- [ ] Evaluar RLS de toda tabla expuesta, roles SQL/Data API, SECURITY DEFINER, EXECUTE default PUBLIC y vistas invoker segun versión.
- [ ] Asegurar que service_role nunca llegue a navegador, frontend, logs, mensajes de usuario o artifacts publicos.
- [ ] Validar la contencion inicial de grants `anon` y policy baseline sin afectar la operación existente.
- [ ] Certificar STAGING solo cuando el entorno tenga datos sintéticos o autorizados, aislamiento, secretos y acceso apropiados.
- [ ] Probar que un fail de test, revisión, Build, drift, security o recovery bloquea el avance sin perder worktree.
- [ ] Verificar que backup no equivale a restore y que una migración forward necesita estrategia de recuperación, no un `down` improvisado.
- [ ] Publicar evidencia independiente de fondacion global, lista para ser consumida por paquetes sin reimplementar el mismo harness.

**Salida:** R0/CI base verificable; reconstrucción limpia aislada y recuperación probada. Sin modificar producción.

### Etapa C - Fundaciones compartidas VENTO Shell

**Tareas:** `SHELL-AUD-*`, `SHELL-PKG-001..008`, `SHELL-CON-001..024`, `SHELL-NORM-*`, `SHELL-DB-001..005`, `SHELL-UI-001..020`, `SHELL-NATIVE-001..003`, `SHELL-AUTH-001..005`, `SHELL-CTX-001..006`, segun topologia.

- [ ] Conciliar familias existentes y propietarios: contratos, contexto/auth, normalización, factories, RPC, UI, tokens.
- [ ] Asegurar que los paquetes compartidos son la única autoridad sobre APIs transversales, sin absorber reglas locales de un dominio.
- [ ] Definir y verificar distribución, SemVer, versiones compatibles, integrity/provenance, peers, lockfiles, release y rollback de `SHELL-PKG-*`.
- [ ] Asegurar exports y tipos publicos aprobados de `@vento/contracts`; prohibir nombres inventados, dependencias circulares y contratos duplicados.
- [ ] Consolidar `@vento/os-context` para sesión, actor efectivo, roles, contexto, sede, área, turno, dispositivo, simulacion y adapters, sin aceptar cambios de autoridad por UI.
- [ ] Implementar evaluacion de permisos y denegaciones con evidencia de origen, frescura e invalidacion cuando corresponda; impedir nuevos consumos de formas legacy.
- [ ] Consolidar `@vento/supabase`: factories separadas browser, SSR, privileged y native; tipos, errores, RPC wrappers, límites de service_role y gestion de contexto.
- [ ] Implementar normalización compartida con reglas, diccionarios, claves, deduplicacion y excepciones segun `SHELL-NORM-*`, sin alterar hechos empresariales sin plan.
- [ ] Validar `@vento/ui-web` realmente ya implementado internamente antes de crear componentes duplicados: UI, AppShell, acciones, errores, estados, layouts, accessibility.
- [ ] Preparar distribución real de `@vento/ui-web`: exports, CSS entrypoint, peers React/Next/Tailwind, SSR/hidratacion y versión de release; existencia de `src/*.tsx` no basta.
- [ ] Definir límites: UI recibe contexto ya autorizado; no consulta RLS, Auth ni Supabase para resolver quien puede actuar.
- [ ] Mantener local el layout, theme, middleware, extensiones y rutas que son propiedad del consumidor, aunque usen componentes compartidos.
- [ ] Separar tokens neutrales y adapters nativos de ANIMA; no importar componentes DOM desde Expo por inferencia.
- [ ] Ejecutar pruebas de compatibilidad de package, API, JS/TS, React/Next, accesibilidad, mobile, snapshot y rollback.
- [ ] Obtener aprobación y evidencia de cada fundación `GLOBAL_ENABLE_ONCE` o de otra modalidad aplicable; no marcar todas completadas por existir la carpeta.

**Salida:** releases/artefactos consumibles y versionados de las fundaciones aplicables. La adopción de cada app sigue siendo trabajo distinto y posterior al gate de su package.

### Etapa D - R1: fundación física de Supabase y autorización

**Tareas:** `AUTH-DB-016`, `AUTH-DB-018`, `AUTH-DB-017`, `AUTH-DB-019`, `AUTH-DB-033`, `AUTH-DB-036`, `AUTH-DB-035`, `AUTH-DB-034`, `AUTH-DB-032`, `AUTH-DB-012..014`, conforme a precedencia validada en Bloque R.

- [ ] Verificar R0 aplicable; resolver previamente arquitectura E3, decisiones canónicamente aprobadas y versión SQL actual.
- [ ] Crear/verificar solo los esquemas compartidos aprobados (`AUTH-DB-016`), sin mover tablas de dominio o ampliar grants por inferencia.
- [ ] Distinguir rutas API expuestas de helpers internos y vistas; probar SECURITY INVOKER/DEFINER, search_path, ACL y ownership.
- [ ] Materializar núcleo canónicamente aprobado de identidad, contexto, evaluador y authorization con sus dependencias estrictas.
- [ ] Preservar el orden obligatorio del resolver y cache/frescura: `AUTH-DB-019 -> AUTH-DB-033 -> AUTH-DB-036 -> AUTH-DB-035 -> AUTH-DB-034 -> AUTH-DB-032` segun orden estructurado vigente.
- [ ] Certificar generación transaccional, expiracion/invalidation, outbox, idempotencia y auditoría cuando corresponda.
- [ ] Asegurar no ampliar contextos a GLOBAL por `NULL`, sesión JWT simulada, pertenencia inactiva, dispositivo compartido o rol sin procedencia.
- [ ] Validar permisos por organizacion, sede, área, empleado y contexto contra sujetos y recursos reales autorizados.
- [ ] Ejecutar pgTAP y negativos anon/authenticated, consulta fuera de sede, actor falso, RPC invocacion directa, Storage ajeno y errores al negar.
- [ ] Probar compatibilidad con clientes legacy sin convertir un helper temporal en autoridad secundaria.
- [ ] Registrar cada mutacion en migración forward, manifiesto y historial aplicado de ambiente, con defensa ante drift y recuperación.
- [ ] Certificar fundación `GLOBAL_ENABLE_ONCE` antes de permitir que un paquete R2 dependa de ella.

**Salida:** infraestructura comun de datos/autorización probada; los datos empresariales y las migraciones de dominio aun se ejecutan por paquete R2.

### Etapa E - Descubrimiento, maduración y aprobación de cada package

**Tareas:** E5 `DELIV-PKG-001..025`, `READY-GATE-001..015`, `CUTOVER-OPS-001..010`, `HYPERCARE-OPS-001..010`, `E5-GATE-001..008`, `CORR-017`.

- [ ] Seleccionar exclusivamente el `package_id` de la frontera canónica elegible, no por conveniencia.
- [ ] Confirmar owner empresarial/técnico/seguridad, dependencias aplicables y fundaciones verificadas.
- [ ] Ejecutar physical discovery sobre repositorios y commits actuales; inspeccionar rutas, consumidores y endpoints reales.
- [ ] Conciliar **uno a uno** `physical_identity.targets` contra `physical_discovery.findings`; no dejar hallazgos ambiguos o fuera de alcance.
- [ ] Reducir `unresolved_findings` a cero antes de `READY_FOR_APPROVAL`, resolver `UNKNOWN` y justificar diferimientos sin ocultarlos.
- [ ] Mantener las 22 brechas / 14 TREQ originales de GAP-PKG-004 o cifras exactas de otros paquetes segun su propio expediente; no copiar esas cantidades a otros.
- [ ] Identificar cada `implementation_unit_id`: mantener unidad única donde se ordene; no fragmentar ni duplicar migraciones.
- [ ] Identificar rutas y simbolos exactos de código, datos, grants, RPC, views, endpoints, UI, dispositivos, workers, CI, scripts e integraciones.
- [ ] Declarar lo incluido, excluido y diferido con dependencia, owner, criterio de vuelta y riesgo.
- [ ] Declarar test plan: unit, contract, integration, E2E, db/pgTAP, RLS, autorización, experiencia, performance, mobile, accesibilidad, seguridad, concurrencia, datos y regresion.
- [ ] Vincular cada TREQ existente al package y determinar sus positivos, negativos y evidencia esperada; no crear TREQ duplicados.
- [ ] Clasificar secretos, datos personales, trazas, logging, masking, retention, regulacion, PCI/finanzas cuando aplique.
- [ ] Diseñar `expand -> migrate/backfill -> reconcile -> cutover -> retire` cuando el paquete cambia datos o contratos.
- [ ] Determinar impacto por entorno: LOCAL, STAGING, PRODUCCION, usuarios, clientes, datos históricos, servicios externos, permisos, caches y colas.
- [ ] Definir plan de rollback y restauracion: que si se revierte, que no es reversible, condicion de STOP y conciliacion posterior.
- [ ] Preservar compatibilidad con NEXO/FOGO/ORIGO/VISO/PULSO/NUMERA/ANIMA/PASS segun grafo real de consumidores.
- [ ] Planificar readiness operacional, cutover, piloto, observabilidad, SLA y hypercare mediante E5; no ejecutar el plan en su etapa documental.
- [ ] Verificar quality gates canónicamente declarados, fuentes, integridad y TREQ; cero `STALE` bloqueantes.
- [ ] Declarar `physical_discovery.status=COMPLETE` y mover a `READY_FOR_APPROVAL` solo con todos los criterios reales satisfechos.
- [ ] Obtener `E5-GATE-008::<package_id>` y `HUMAN_APPROVAL` explicitos. `APROBADO` conversacional de una investigacion no sustituye la aprobación formal del gate.
- [ ] Completar `PACKAGE_FINISH` y autorizar independientemente `SHELL-CI-020::<package_id>` conforme al coordinador.

**Salida:** un paquete entero realmente ejecutable, con fronteras fijas, calidad medible, gobierno y autorización; ningun deploy previo al gate.

### Etapa F - `SHELL-CI-020`: implementación física del paquete

**Tareas:** `SHELL-CI-020::<package_id>`, implementaciones aplicables de Bloques H, J, R2, P/Q/S/X, dominios y servicios de E4.

- [ ] Confirmar `IMPLEMENTATION_AUTHORIZE` y estado `AUTHORIZED`, repository origin y permisos de modificacion; nunca activar por scanner.
- [ ] Abrir checkout independiente por repo autorizado y preservar cambios Git preexistentes; registrar HEAD/base y candidate por cada uno.
- [ ] Congelar target paths y unidades del package gate; un delta de alcance reabre maduración antes de mutar.
- [ ] Implementar contratos/tipos/versiones y pruebas primero cuando varias aplicaciones los requieren.
- [ ] Implementar cambios de base R2 dentro de VENTO Shell: solo dominio y objetos autorizados; no reescribir baseline histórico.
- [ ] Introducir ampliaciones compatibles de schema, constraints, policies, views, RPC, Storage, Realtime, queues, triggers e indices que pertenezcan al paquete.
- [ ] Preparar migraciones de datos con dry-run, colisiones, backfills idempotentes, registros fuente, reconciliación y límites de volumen.
- [ ] Resolver permisos y RLS por principal/recurso/contexto; cubrir positiva y negativa site/área/global/owner/shared device.
- [ ] Adaptar operaciones server/Edge/Route Actions para no eludir permiso mediante `service_role`, JWT editable o `SECURITY DEFINER` expuesto.
- [ ] Implementar lógica de dominio, estados y transiciones, errores, compensación, concurrencia y atomicidad real.
- [ ] Implementar integraciones con contratos versionados, idempotency keys, reintentos acotados, dead-letter/conciliacion y ausencia de doble efecto.
- [ ] Implementar UI real segun mockup/UX aprobado; accesibilidad, focus, responsive, estados de loading/error/no-access y semantica por actor.
- [ ] Consumir APIs compartidas cuando esten certificadas y el lote adoptante forme parte del package; no mezclar retiro de copias legacy sin gate.
- [ ] Cubrir ANIMA native por sus interfaces/adapters y build nativo; no sustituir con `npm run build` de Next.js.
- [ ] Escribir y ejecutar pruebas con código: unit, integration, pgTAP, contract, HTTP, E2E autenticado, escenarios hostiles, simulacion cuando corresponda.
- [ ] Probar migración aislada desde cero y camino forward seguro desde baseline soportado; no usar BD LOCAL de trabajo para reset.
- [ ] Verificar lints, typecheck, build, secretos, permisos, migración manifiesto, TREQ, gate, locks y diagnosticos de repositorios afectados.
- [ ] Registrar fallos iniciales y correcciones posteriores; solo la última bateria sobre SHA final puede considerarse evidencia vigente.
- [ ] Obtener aprobación de transición y realizar cambios remotos/despliegues solamente donde y cuando el gate autorice; separar STAGING y PRODUCCION.
- [ ] Para multi-repo, publicar los repos externos aprobados de forma serial, comprobar PR merge/checks, luego cerrar el orquestador Shell; sin SHA inventado.

**Salida:** implementación candidata, pruebas técnicas reales y despliegue controlado segun gates; no es aun un package CLOSED.

### Etapa G - `SHELL-CI-021`: readiness real

- [ ] Verificar builds y migraciones por SHA aplicado y entorno exacto.
- [ ] Asegurar inventario de usuarios de piloto, sedes, dispositivos, permisos, roles, cuentas de prueba y credenciales técnicas autorizadas.
- [ ] Probar backups restaurables, RPO/RTO que aplique, plan de compensación y runbook de incidente.
- [ ] Confirmar infraestructura y dependencias externas: red, impresion, email, SSO, sensores, jobs, colas, observabilidad.
- [ ] Confirmar monitoreo, alertas, ownership de incidencias, auditoría y logging sin secretos/PII indebida.
- [ ] Ejecutar validaciones de performance, concurrencia, escalado, integridad e idempotencia relevantes al paquete.
- [ ] Ejecutar smoke de STAGING con cuentas reales de prueba permitidas; pruebas de acceso positivas y negativas, no solo HTTP 200.
- [ ] Confirmar procesos de operación degradada/contingencia cuando aplique.
- [ ] Registrar límites del piloto, dataset, sedes, ventana autorizada, criterios GO/NO-GO y responsable de aprobar el inicio.
- [ ] Si cualquier gate o dependencia falla, conservar `WAITING`/`BLOCKED` del paquete sin declarar readiness.

**Salida:** `SHELL-CI-021` validado en el entorno/aplicación autorizados, con decision de cutover basada en evidencia.

### Etapa H - `SHELL-CI-022`: cutover y piloto controlado

- [ ] Congelar snapshot y versiones previas; confirmar procedimientos de vuelta y comunicacion.
- [ ] Abrir piloto limitado por actor/sede/dispositivo/feature flag y permisos, nunca global por defecto.
- [ ] Ejecutar escenarios E2E reales de punta a punta con operaciones positivas y negativas.
- [ ] Comprobar secuencias de proceso, auditoría, trazabilidad, tiempos, errores de concurrencia, duplicados y reintentos.
- [ ] Reconciliar origen/destino, conteos, identidades, existencias, montos y eventos segun capacidad.
- [ ] Medir uso, latencia, tasa de error, conversion, disponibilidad, datos sensibles y quejas operativas sin inventar umbrales.
- [ ] Detectar consumo legacy residual y compatibilidad de consumidores externos.
- [ ] Tratar incidentes con STOP/ROLLBACK aprobados, sin revocar permisos amplios o borrar datos arbitrariamente.
- [ ] Conservar evidencia firmada de usuarios piloto, fecha, release, diferencias y decision.

**Salida:** piloto efectivamente ejecutado y conciliado; no cerrar defectos abiertos por exito parcial.

### Etapa I - `SHELL-CI-023`: hypercare y estabilización

- [ ] Investigar defectos por causa comprobada y reproducible; diferenciar ambiente, permiso, código, datos e integración.
- [ ] Incorporar cada defecto corregido a su prueba de regresion y ejecutar la bateria completa posterior.
- [ ] Corregir inconsistencias y reintentos con compensación; nunca ocultar registros perdidos o duplicados.
- [ ] Confirmar que no aparece drift por operaciones manuales o cambios externos.
- [ ] Vigilar durante la ventana definida en E5 la estabilidad, observabilidad, tiempos, errores y soporte.
- [ ] Revalidar backups y proceso de recuperación después de cambios significativos.
- [ ] Verificar documentación operativa, capacitacion y transferencia a responsables.
- [ ] Declarar cierre de hypercare solamente con criterios y evidencia real, no por cantidad de dias o ausencia de reportes.

**Salida:** package estabilizado, observación y defectos conciliados.

### Etapa J - `SHELL-CI-024`: certificación y cierre del paquete

- [ ] Confirmar que el alcance aprobado fue implementado por completo: nada pendiente sin disposición aprobada.
- [ ] Verificar `CI020`, `CI021`, `CI022` y `CI023` con evidencia vigente y dependencia satisfecha.
- [ ] Reconciliar todos los repos, ramas, base/candidate/merge, despliegues, SQL aplicado, migraciones, locks y environment digest.
- [ ] Comprobar tests de `TREQ-*` del paquete: requerido `VERIFICADO` o disposición valida y auditable.
- [ ] Confirmar aceptación de owners negocio, técnica y seguridad; auditabilidad y soporte.
- [ ] Certificar rollback practicable, contratos compatibles y cero regresion P0/P1 sin resolución.
- [ ] Publicar handoff: capacidades, reglas, riesgos residuales autorizados, versión, soporte, documentación y medición.
- [ ] Marcar el package `CLOSED` solo tras `SHELL-CI-024 VERIFIED` real y evidencia; liberar locks mediante lifecycle canónico.
- [ ] Actualizar proyeccion agregada de cada aplicación sin convertir una app parcialmente cerrada en `100 %`.
- [ ] Volver a consultar la frontera elegible para siguiente paquete; no hacer selección manual.

**Salida:** package CLOSED y trazabilidad completa hasta la matriz de requisitos.

### Etapa K - Adopción real de packages compartidos por consumidores

**Tareas:** `SHELL-MIG-001..008`, `SHELL-AUTH-005`, `SHELL-PKG-001..008`, `SHELL-NATIVE-*`; siempre instancias por paquete cuando corresponda.

#### K.1. Preparar cada oleada sin duplicar trabajo

- [ ] Tomar el inventario `SHELL-MIG-001` como punto de partida, pero revalidar cada consumidor sobre commits reales actuales, no sobre el corte histórico.
- [ ] Clasificar STATIC, DYNAMIC, FRAMEWORK, CI, SCRIPT, MANUAL y NO_CONSUMER_CONFIRMED.
- [ ] Asignar cada ocurrencia concreta a `MIGRATE`, `KEEP LOCAL` o `RETIRE`, preservando la disposición de su familia canónica.
- [ ] No retirar layouts, middleware, CSS de dominio, extensiones empresariales o entrypoints de framework simplemente porque no tengan imports.
- [ ] Revisar versiones públicas, exports, entradas CSS, peers React/Next/Tailwind, SSR y lockfiles del package compartido.
- [ ] Identificar la instancia aprobada `SHELL-MIG-003..008::<package_id>` o el propietario `SHELL-AUTH-005` de cada tipo de adopción. No abrir una segunda unidad de trabajo para el mismo cambio.
- [ ] Garantizar que el consumidor no adopta un package interno `private` como si ya fuera una release distribuida y autorizada.
- [ ] Guardar snapshot de consumidor anterior, compatibilidad y procedimiento de rollback independiente de otros repositorios.
- [ ] Verificar impacto de despliegue, cambios de cache, CSS, iconos, datos, permisos, rutas y configuración.
- [ ] Exigir matriz TREQ, pruebas de regresion funcional y visual, control de accesibilidad, builds en el framework correspondiente.

#### K.2. Orden de oleadas fijado por `SHELL-MIG-002`

Este orden se aplica **cuando una misma tarea propietaria afecta a varios repositorios**. No reemplaza el orden de la frontera determinista de paquetes:

| Orden | Repositorio consumidor | Principio de adopción |
| ---: | --- | --- |
| 1 | `vento-shell` | Validar distribución y consumo en el propio productor, sin duplicar el runtime |
| 2 | `vento-numera` | Primer piloto externo compatible cuando el lote le aplique |
| 3 | `vento-fogo` | Conservar extensiones y excluir candidatos inertes del lote funcional |
| 4 | `vento-origo` | Mantener componentes/contratos propios del dominio de compras |
| 5 | `vento-viso` | Preservar UI administrativa, permisos y composicion de dominio |
| 6 | `vento-pulso` | No mezclar UI con cliente Supabase alternativo o cambio del guard heredado |
| 7 | `vento-nexo` | Preservar contexto operativo local y tratar CI/scripts en su lote propietario |

- [ ] No iniciar dos despliegues de adopción en paralelo para una misma oleada compartida.
- [ ] No continuar al siguiente consumidor si el anterior tiene regresion, observación o rollback pendiente.
- [ ] En UI, aplicar `SHELL-MIG-005` con `SHELL-MIG-006` (accesibilidad/responsive) y `SHELL-MIG-007` (paridad contractual/operativa).
- [ ] Retirar copias legacy solamente en su unidad `SHELL-MIG-008` después del cierre y paridad exigidos.
- [ ] Mantener `SHELL-AUTH-005` propietario de migraciones de autorización, contexto y acceso compartido; no duplicar esas filas en adopción UI.
- [ ] Adaptar flujos de CI y scripts NEXO que recrean formas legacy antes de reemplazar componentes que ellos manipulan.
- [ ] Conservar bootstrap/scaffold bajo su tarea: no volver a copiar componentes runtime como sustituto de dependencias versionadas.
- [ ] ANIMA utiliza `SHELL-NATIVE-001..003` y adapters nativos; no entra automáticamente al numerador de 7 consumidores web de `@vento/ui-web`.

#### K.3. Prueba de paridad de cada consumidor

1. Compare imports publicos, bundle, types, semver y lockfile.
2. Verifique que las rutas, textos, CTA, errores, tema, logos, responsive, focus, SSR/hidratacion y accesibilidad mantienen la experiencia aprobada.
3. Verifique sesión, SSO, contexto, rol, pertenencia de sede, permisos, simulacion y dispositivos sin ampliacion de autoridad.
4. Ejecute builds, test de regresion y QA visual en dispositivos aplicables; compare antes/después con evidencia.
5. Pruebe feature off/rollback, despliegue reversible y monitorizacion de consumidores legacy.
6. Declare la adopción certificada solo sobre SHA y versión exactos. Actualice README/matriz de adopción sin afirmar `7/7` hasta que los siete consumidores aplicables realmente hayan sido certificados.

**Salida:** reduccion progresiva y probada de duplicación; cada consumidor conserva su propio owner, commit, evidencia y rollback.

### Etapa L - Implementación de dominios y aplicaciones hasta cobertura integral

Cada aplicación se implementa por **paquetes aprobados y elegibles**, no en un único cambio final ni por el orden narrativo de esta tabla cuando la frontera de dependencias determine otra cosa. Todos los dominios usan E5 -> CI020..024, R2 y sus tareas funcionales aplicables.

| Aplicacion / frente | Trabajo que debe quedar operativo | Dependencias y protecciones decisivas | Evidencia de cierre |
| --- | --- | --- | --- |
| **SHELL (Hub H2)** | Entrada contextual, aplicaciones disponibles, navegacion, sesiones, recuperación y experiencia cross-app | Contratos, auth/context, permisos, UI compartida cuando aplique; no autoridad adicional desde menu | Actor ve solo apps autorizadas, rutas protegidas, estado y continuidad reales en desktop/tablet |
| **ANIMA** | Vinculo trabajador, turnos, asistencia, marcacion, identidad y contexto operativo | Supabase central, autorización laboral, Edge/invitaciones, adapters nativos; evitar duplicación de origen de turnos | Flujo laboral real/negativo en movil, offline/recuperación segun alcance, datos y sesión reconciliados |
| **VISO** | Administracion de personal, roles, sedes, áreas, permisos, planificación, auditoría y experiencia administrativa | Contrato de permisos canónicamente exacto, protección SSR/server, operaciones multisitio, privacidad | Actor administrativo SITE/GLOBAL/OWN, positivos y negativos autenticados, piloto por rol, cero lectura ajena |
| **NEXO** | Catalogo, inventario, ubicaciones, LOC/LPN, activos, custodia, remisiones y movimientos; SUBBLOQUE K2 | Identidades de producto/stock, contratos de movimientos y source-of-truth; `NEXO-DOM-019..038`, `NEXO-AUTH-021..032`, `NEXO-UX-026..048` cuando sean aplicables | Cantidades y custodias conciliadas, transiciones auditadas, flujos de remision completos y pilotos |
| **FOGO** | Recetas, planificación y ejecución productiva, trazabilidad, rendimientos y consumos | `OPS-REC-001`, `OPS-PRD-001`, `OPS-TRZ-001`; NEXO productos, presentaciones, existencias y movimientos estables | Produccion, insumos/salidas, excepciones y conciliacion con NEXO verificadas |
| **ORIGO** | Proveedores, solicitudes, aprobaciones, compras, recepcion y abastecimiento | INT-PROC, contratos de recepcion/stock con NEXO, efectos contables NUMERA sin duplicados | Flujo ORIGO -> NEXO -> NUMERA idempotente y conciliado |
| **PULSO** | POS, ventas, caja, pagos, mesas, comandas, entrega, salon y operaciones por sede | `OPS-POS-001`, SUBBLOQUE N2, INT-SALES, integración con stock/producción/NUMERA/PASS; sustitucion controlada del POS externo | Piloto en sedes autorizadas, conciliacion de ventas/caja/pagos y ausencia de doble efecto |
| **NUMERA** | Información financiera, contabilidad/analítica, reportes y reconciliación | `NUMERA-AUD-001..012`, `OPS-CST-001`, `NUMERA-DOM-001..015`, SUBBLOQUE O2, fuentes oficiales NEXO/ORIGO/FOGO/ventas | Indicadores con definición oficial, reconciliación con origen y aprobación contable/gerencial |
| **PASS** | Identidad cliente, acumulacion, saldo, redencion, beneficios y fidelizacion | BLOQUE V, identidad cliente separada del RBAC laboral, fuente comercial vigente, idempotencia y conciliacion | Piloto sin saldos duplicados, canjes autorizados, eventos reconciliados y seguridad cliente |
| **TALENTO** | Vacantes, candidatos, selección y traspaso autorizado a VISO/ANIMA | `CAP-TAL-001..006`, puerta de `CAP-TAL-006`, BLOQUE Y y E5; no conceder permisos laborales antes de vinculo | SOLO si se aprueba continuidad: alta laboral trazable y QA de no preactivacion |
| **AURA** | Decision de continuidad, reemplazo o retiro; posible implementación posterior | BLOQUE W; no inventar repo, permisos ni funciones sin decision | Resolucion expresa; si continua, roadmap y E5 propios, luego piloto/cierre |

#### L.1. Integraciones transversales que no se pueden omitir

- [ ] BLOQUE X: mapa de sistemas, propietarios, contratos, versionado, emisor/receptor, tenancy, cifrado y autenticacion de integración.
- [ ] NEXO <-> FOGO: productos, recetas, consumos, trabajo en proceso, retorno/mermas, inventario y trazabilidad.
- [ ] ORIGO -> NEXO -> NUMERA: compras, aprobaciones, entradas, obligaciones, conciliacion y eventos.
- [ ] PULSO -> inventario/NUMERA/PASS: venta única, devolucion, reverso, recompensa, saldo y reconciliación.
- [ ] ANIMA <-> VISO: calendario/turnos, empleados, invitaciones, cumplimiento y contexto compartido sin fuentes rivales.
- [ ] TALENTO -> VISO -> ANIMA solo tras autorización de vinculacion.
- [ ] Bloque E4: imprimir, almacenar evidencia, notificar, encolar/reintentar y recuperar solo cuando el paquete lo incluye.
- [ ] Bloque Z: dispositivos, kioscos, scanners, redes, impresion, soporte, telemetria y actualizaciones seguras cuando sean relevantes.
- [ ] Bloque AA: privacidad, archivo, minimizacion, derechos de acceso, retencion y disposición autorizada.
- [ ] Bloque AB: datos maestros, calidad, definición oficial de indicadores, reconciliación y analítica.
- [ ] Bloque AC: continuidad, contingencia, soporte de fallas, RPO/RTO/MTPD/MBCO aprobados y restauracion probada.
- [ ] Integration gate: ninguna accion inter-app se declara completa solo porque un endpoint responda; probar idempotencia, orden, duplicación, retry, compensación, fallo parcial y auditoría.

**Salida:** capacidades de negocio reales y conectadas; apps con alcances parciales no se declaran globalmente completadas.

### Etapa M - R3, Bloque U y cierre global

**Tareas:** Bloque U, `AUTH-DB-030::GLOBAL-FINAL`, `AUTH-DB-031::GLOBAL-FINAL`, Bloque X, T, Z, AA, AB y AC aplicables.

- [ ] Ejecutar snapshot actualizado completo de tasks, `package_id`, relaciones de dependencia y estados de las instancias físicas.
- [ ] Verificar 0 paquetes aplicables sin `CI024 VERIFIED`; 0 tareas físicas pendientes indebidamente omitidas.
- [ ] Volver a evaluar las aplicaciones con el *snapshot completo vigente*; un cierre parcial anterior no elimina trabajo posterior.
- [ ] Ejecutar suites cross-app integrales: autenticar, autorizar, operar, transferir, conciliar, restaurar, compensar y auditar, en todo contexto/dispositivo aplicable.
- [ ] Certificar pruebas no funcionales: seguridad, volumen, disponibilidad, latencia, accesibilidad, hardware, integraciones externas y recuperación.
- [ ] Auditar cambios reales de Supabase contra contratos en Shell, historia de migraciones, manifests, grants, RLS, RPC, Storage, datos y consumo de aplicaciones.
- [ ] Probar reconstrucción aislada completa desde migraciones versionadas aplicables y normalización, con comparacion de schema, tests, datos sintéticos y drift esperado.
- [ ] Revalidar respaldos y restauraciones con datos de prueba, cadena de sucesos, RPO/RTO autorizados y plan de continuidad.
- [ ] Detectar **cero uso residual probado** de objetos legacy elegibles para retiro; verificar cinco clases de consumidor y procedimientos de respaldo.
- [ ] Preparar manifiesto exacto de retiro `AUTH-DB-030` solo para objetos con elegibilidad probada, política de retencion y aprobación; no borrar históricos por apariencia de inutilidad.
- [ ] Aplicar retiros con gates y migraciones forward gobernadas, restauracion, pruebas y medición de efectos.
- [ ] Certificar `AUTH-DB-031`: paridad real documento -> Shell -> Supabase -> aplicaciones, para schemas, datos, permisos, procesos, auditoría y consumidores.
- [ ] Auditar reintentos, idempotencia y conciliacion global ORIGO/FOGO/NEXO/PULSO/NUMERA/PASS.
- [ ] Verificar cuentas y secretos externos, rotacion, expiracion, revocacion, vault y ausencia de secretos en frontend/repos/logs.
- [ ] Decidir formalmente estado final del POS externo: sigue vigente, es sustituido o se retira, sin duplicación de autoridad.
- [ ] Verificar que TALENTO y AURA tengan decision terminal ejecutada sin disfrazar pendientes como completados.
- [ ] Validar cero drift no autorizado entre LOCAL, STAGING y PRODUCCION; registrar excepciones aprobadas y horizonte de resolución.
- [ ] Aprobar resultados del Bloque U y cierre empresarial, técnico, seguridad, operación y soporte de todo VENTO OS.
- [ ] Registrar fecha, autor de aprobación, commit de cada repo, versiones, snapshot de TREQ, migraciones aplicadas y evidencia de cierre para 100 %.

**Salida:** cierre global aprobado. Sin este conjunto, cualquier `100 %` solo puede describir un alcance parcial y fechado.

## 7. Procedimiento completo de migración de base de datos por paquete

Este procedimiento se aplica cada vez que una instancia R2 modifica SQL/datos. No reemplaza la secuencia contractual `AUTH-DB-*`.

1. **Descubrir:** identificar schema/tables/views/functions/RLS/grants/triggers/buckets/realtime/indices existentes, consumidores vivos, entorno, volumen y versión de migraciones.
2. **Decidir ownership:** owner exacto del dominio, source of truth de cada fila, key empresarial, tenants/sedes/áreas y condicion de acceso; prohibir dos fuentes maestras sin decision.
3. **Versionar:** escribir exclusivamente en migración gobernada de VENTO Shell y manifest; nunca editar un archivo histórico aplicado en producción.
4. **Preflight:** comprobar constraints, ausencia de drift peligroso, backups, conexiones, locks, privilegios y dependencia con otros paquetes.
5. **Expandir:** crear objetos destino compatibles, sin retirar los legados usados; mantener autorización restrictiva desde el principio.
6. **Migrar/normalizar:** ensayo en datos sintéticos/anonimizados, resolver colisiones, aplicar backfill idempotente y trazable sin duplicar efectos.
7. **Autorizar:** probar RLS/roles/grants/RPC y origen del permiso con actor real, `anon`, `authenticated`, `service_role` solo donde corresponda, SITE/GLOBAL, área, OWNER, dispositivo compartido y negativa fuera de alcance.
8. **Adaptar consumidores:** SSR, API, Edge, native, jobs y servicios externos usan contrato nuevo o compatibilidad temporal aprobada; se mide consumo legacy.
9. **Probar:**  pgTAP SCHEMA/INTEGRITY/RLS/RPC/MIGRATIONS, E2E negocio, concurrencia, volcado exacto y reconciliación.
10. **Reconstruir aislado:** ejecutar todo el historial aplicable sobre BD local **descartable** nueva, nunca destruir la base personal de trabajo por comodidad.
11. **Roll forward gobernado:** solo en STAGING autorizado, comprobar migration history/versión/configuration, smoke real y rollback no destructivo.
12. **Piloto:** liberar por sede/actor/capacidad aprobada, monitorizar queries/rendimiento, bloquear exposición inesperada y conciliar datos.
13. **Contraer más tarde:** retirar objeto/columna/policy vieja únicamente cuando todos los consumidores hayan migrado y R3/gate propietario permita el retiro.
14. **Cerrar:** certificar historial/versión exacta por ambiente, sin pendientes de integridad, privacidad o restauracion.

La reconstrucción total aislada es prueba de **reproducibilidad técnica**; la transformacion de la base en uso es **migración progresiva de datos/objetos**. No confundir ambas.

## 8. Instrumento de seguimiento permanente

No inventar una segunda base de datos de estados. Extraer indicadores de archivos/controles canónicos existentes y mantener la trazabilidad en sus propietarios.

| Indicador | Numerador | Denominador | Regla de interpretacion |
| --- | --- | --- | --- |
| Packages cerrados | `CLOSED` con `CI024 VERIFIED` y evidencia vigente | packages aplicables en frontera/registro vigente | `MATURATION_DRAFT`, readiness o CI020 no cuentan |
| Fundaciones físicas | instancias globales `VERIFIED` | instancias globales aplicables | carpeta existente no cuenta como release certificada |
| Requisitos verificables | TREQ `VERIFICADO` con evidencia vigente | TREQ aplicables y no obsoletos formalmente | `SKIP`, `PLANNED`, `STALE` no cuentan |
| Migraciones replicables | SQL aplicable con replay limpio aislado PASS | SQL aplicables de snapshot de migraciones | manifiesto sin replay no basta |
| Ambientes alineados | entornos autorizados sin drift injustificado | ambientes aplicables | baseline y fingerprint por entorno |
| Consumidores web UI | consumers `@vento/ui-web` certificados | consumers elegibles aprobados (baseline 7) | 0/7 inicial; no se suma ANIMA automáticamente |
| SDK auth/context | consumidores migrados, auditados y sin nuevas formas legacy | consumidores auth/context aplicables | separar del KPI UI |
| Apps completas | aplicaciones con su alcance actual E2E/piloto aprobado | aplicaciones aplicables | AURA/TALENTO segun gate real |
| Reconciliaciones | contratos/dominios con conteo y trazas conciliadas | flujos inter-app aplicables | no confundir endpoint 200 con flujo correcto |
| Riesgos bloqueantes | hallazgos P0/P1 sin resolver | todos los hallazgos bloqueantes | requisito de cierre: 0 sin decision permitida |
| Runbooks/restore | pruebas de recuperación PASS | escenarios críticos aplicables | backup sin restauracion prueba 0 |
| Legacy residual | objetos usados sin fuente canónicamente autorizada | inventario actual | objetivo cierre = 0 casos indebidos |

### 8.1. Estados que cada turno debe reportar

- Identidad de la tarea/instancia vigente, package, capa, branch y HEAD exactos.
- Estado del gate, descubrimiento físico, pendientes, autorización y locks.
- Archivos modificados por la intervencion actual y archivos dirty que se preservan.
- Pruebas ejecutadas y no ejecutadas, con conteos y causas; distinguir evidencia de doble/simulacion frente a HTTP/DB real.
- Progreso de TREQ y de base sin inflar el porcentaje global.
- Proxima accion permitida por policy, aprobación humana que falta y STOP condition si la hay.
- No declarar tareas siguientes iniciadas hasta nueva palabra expresa `APROBADO` o regla de aprobación valida aplicable.

### 8.2. Regla de bloqueo

STOP de mutaciones cuando aparezca: fuente canónica contradictoria no reconciliada; `UNKNOWN` en alcance físico; diff fuera de targets; falta consent; drift no autorizado; fuga de datos ajenos; secretos; pruebas rojas; compilación con errores; migración no recuperable; fixture sobre datos reales; target/commit cambiado tras QA; dependencia activa sin locks; regresion del consumidor anterior; 04A/TREQ roto; falta de backup o rollback para operación de riesgo. Un bloqueo local de paquete no concede permiso para intervenir otro; se consulta la frontera determinista y sus locks.

## 9. Continuidad exacta del paquete actual: GAP-PKG-004

**Decision recomendada:** NO dejarlo abandonado en maduración indefinida. Continuar su **maduración dentro del mismo GAP** hasta `READY_FOR_APPROVAL`, pero no forzar `APPROVED_FOR_IMPLEMENTATION` ni `SHELL-CI-020` antes de cumplir todos los requisitos. No seleccionar manualmente otro package.

### 9.1. Estado probado

- [x] Fuentes AUTH-CAT revisadas: `viso.staff.read` corresponde al rename hacia `viso.workforce.employees.view`, no a grant adicional.
- [x] Candidato SQL forward único existente modificado con preflight que falla cerrado, sin alias ni role/employee grants implicitos.
- [x] VISO `/staff` y `/staff/[id]` consumen código canónico; guards SITE/GLOBAL incorporados.
- [x] Escenarios de QA del expediente reconocidos por catálogo local: same_site, cross_site_global, cross_site_site_only.
- [x] VISO 44/44, typecheck, lint, build y controles Shell PASS en la última bateria ejecutada.
- [x] SQL candidato con 50/50 pgTAP en `BEGIN/ROLLBACK`; sin persistencia del permiso.
- [x] **Estado histórico 24/24 SUPERADO**: 44 targets y 44 findings fisicos registrados en la fase local actual; 56 tareas y 14 TREQ historicos preservados. Los 9 unresolved siguen abiertos y la cobertura por si sola no es implementacion certificada.
- [ ] `physical_discovery.status=COMPLETE` (actualmente `PENDING`: 9 asuntos pendientes pese a cobertura 44/44).
- [ ] `authorization.decision=APPROVED` formal por gate (actualmente `PENDING`).

### 9.2. Pasos siguientes exactos sin adelantar gates

1. Releer expediente completo y verificar **44/44 targets/findings** y 9 unresolved del corte 2026-10-21, contra commits, archivos y estados reales; no reutilizar como evidencia de cierre.
2. Reconciliar TODOS los unresolved findings históricos del package; cada uno con prueba, decision o carryover valido, sin descartar amenazas por haber obtenido PASS de sintaxis.
3. Preparar backend LOCAL descartable compatible con el historial de 23 migraciones aplicables, con versión de Node/Supabase/Postgres y migration history auditados. No ejecutar reset sobre LOCAL de trabajo.
4. Ejecutar replay limpio seguro del SQL candidato, pgTAP completos y prueba de permiso **persistente solo dentro del entorno de prueba gobernado**, sin grants a empleados ni roles reales.
5. Probar el backend con cuentas y sedes sintéticas controladas, limpiar fixtures de forma exacta y verificar cero residuo/secretos.
6. Ejecutar HTTP SSR **autenticado real** para `same_site` (acceso autorizado), `cross_site_global` (solo procedencia GLOBAL real) y `cross_site_site_only` (denegacion exacta). Probar tanto `/staff` listado como `/staff/[id]` detalles, consultas server-side y ausencia de datos externos.
7. Probar seguridad STRONG y privacidad de `viso.workforce.employees.view` conforme al contrato, contexto de dispositivo y minimizacion de datos; rechazar toda via basada en `staff.manage` como sustituto.
8. Demostrar no exposición de service_role en cliente, no fuga via joins/admin, consistencia de membresia activa y guard de POST/acciones del detalle.
9. Obtener sin SKIP el escenario que antes tenia 1 SKIP por el catálogo de permiso faltante; no exigir que una prueba de smoke autentique falsamente usuarios de producción.
10. Repetir tras todo cambio: VISO test/typecheck/lint/build, Shell contract/integration/security/E2E/pgTAP, migration manifest, package scope, TREQ, gate y execution status.
11. Certificar consumidores afectados ANIMA/VISO/ORIGO/Storage/RPC y STAGING mediante autorización separada; no afectar PRODUCCION sin gate.
12. Conciliar hallazgos, riesgos, rollback, privacidad, targets, TREQ, evidencia y commit SHA hasta `READY_FOR_APPROVAL` real.
13. Solicitar aprobación humana `APROBADO` del `E5-GATE-008::GAP-PKG-004` cuando corresponda. Solo después completar `PACKAGE_FINISH` y autorización física CI020 distinta.
14. Implementar/publicar y recorrer CI020..024 con sus respectivos gates; solo entonces cerrar GAP-PKG-004.
15. Consultar nuevamente la frontera elegible para la siguiente instancia; no asumir `GAP-PKG-005` ni otro ID.

**Criterio de salida inmediato:** GAP-PKG-004 puede salir de `MATURATION_DRAFT` solo cuando `physical_discovery=COMPLETE`, `unresolved_findings=0`, pruebas completas atribuibles a SHAs finales, 04A/TREQ intactos, migración/restauracion y QA autentica certificadas y el gate confirme su elegibilidad. La palabra `APROBADO` de un paso de maduración anterior no cambia por si sola su autorización formal.

## 10. Rutina por sesión de implementación

1. Leer tareas y fuentes vigentes y los últimos cambios **directamente** desde repo, no por memoria de conversacion.
2. Consultar `package_execution_status`, gate, locks, active implementation instance y Git de todos los repos necesarios.
3. Confirmar alcance exacto y gates; no rehacer analisis fuera del paquete ni pedir seleccionar manualmente un package.
4. Revisar código y BD de solo lectura para confirmar baseline y cambios locales preservables.
5. Preparar lista corta de cambios aprobados, pruebas y riesgos; registrar inmediatamente nuevos hallazgos en expediente propietario.
6. Implementar un conjunto cohesivo, sin generar copias/ramas/archivos de prueba adicionales fuera de contrato.
7. Ejecutar pruebas incrementales, luego bateria completa sobre estado guardado, corregir y repetir.
8. Comparar SHA/HEAD con candidato, revisar diffs, asegurar tests y entorno coincidentes.
9. Solo aprobar/publicar/merge/deploy segun HUMAN_GATE e instancias canónicamente autorizadas.
10. Registrar estado y siguiente accion. Si hubo FAIL, dejar el paquete reanudable y worktree intacto, no pasar como PASS.

## 11. Qué no debemos hacer

- Cerrar 189 GAP primero por número mientras las fundaciones reutilizables quedan sin adopción.
- Crear todos los componentes y posponer indefinidamente sus consumidores; la métrica debe medir adopción certificada, no archivos `.tsx`.
- Reconstruir con `db reset` una BD con datos valiosos o suponer que el SQL versionado es todo el modelo canónicamente previsto.
- Reescribir una migración histórica aplicada o desplegar SQL candidato sin pruebas de identidad, seguridad y recovery.
- Refactorizar UI, permisos y bases de datos de siete aplicaciones de manera simultanea sin rollback por lote.
- Hacer commits, merges o releases de varios repositorios en un único SHA o desalineados con sus checks.
- Fijar porcentajes de avance por kilometros narrativos; los denominadores cambian con las tareas y el alcance.
- Certificar una aplicación porque compile, despliegue, tenga tablas, permisos o pantallas; el contrato exige procesos completos y piloto.
- Dar por terminada AURA o TALENTO por estar diferidos sin documentar decision, riesgos y alcance que corresponda.
- Agregar un nuevo GAP, marcador, TREQ o mapeo solo para reflejar un cambio ya cubierto por una identidad aprobada.

## 12. Decisiones solicitadas al responsable y próximo handoff

1. **Revisar y aprobar este instrumento como guia operativa**, sin fingir que sustituye el `90_ORDEN_DE_IMPLEMENTACION.md` ni que esta integrado a una tarea canónicamente reservada. Incorporarlo al repo solamente mediante aprobación y owner existentes que autoricen ese cambio documental; no crear una tarea ad hoc.
2. **Seguir madurando GAP-PKG-004** hasta cumplir el gate; no dejarlo en estado draft permanente ni saltar a un package arbitrario.
3. **Crear/verificar una base local descartable aislada** para replay SQL cuando exista autorización física especifica; nunca sobre la base local principal sin respaldo y decision apropiados.
4. **Resolver QA autentica y seguridad antes de deploy**. Positivos/negativos SITE/GLOBAL, privacidad, idempotencia de permisos y consumidores son condicion de cierre.
5. **Aplicar la frontera dinamica del coordinador** después de cada cierre; las fundaciones preceden a sus consumidores, y los roots independientes solo avanzan con autorización separada.
6. **No declarar 100 % hasta completar la matriz de la seccion 4** con evidencia verificable de código, datos, integraciones, UI, usuarios, QA, ambientes, recuperación, CI024, Bloque U y R3.

## 13. Fuentes canónicas verificadas para elaborar este instrumento

- `docs/plan-canonico/modular/01_PROTOCOLO.md`.
- `docs/plan-canonico/modular/02_ROADMAP_MAESTRO.md`.
- `docs/plan-canonico/modular/90_ORDEN_DE_IMPLEMENTACION.md` (en particular ciclo CI, Fases 3-13, `CORR-012`, `CORR-017`, `CORR-018`).
- `docs/plan-canonico/modular/package-execution-policy.json` y `package-gate-policy.json`.
- `docs/plan-canonico/modular/implementation-control.json`, `execution-route.json`, `active-sequence.json`.
- `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/00_INTRO.md` y contratos `DELIV-PKG-*`.
- `docs/plan-canonico/modular/bloques/R_SUPABASE/01_R0_PREPARACION_PRUEBAS_Y_CONTENCION_DE_RIESGOS.md`.
- `docs/plan-canonico/modular/bloques/R_SUPABASE/02_R1_FUNDACION_FISICA_CANONICA.md`.
- `docs/plan-canonico/modular/bloques/R_SUPABASE/03_R2_MIGRACION_PROGRESIVA_POR_DOMINIO.md`.
- `docs/plan-canonico/modular/bloques/R_SUPABASE/06_R3_RETIRO_Y_CERTIFICACION_FINAL.md`.
- `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`.
- `packages/ui-web/README.md`, `packages/ui-web/src/`, packages `contracts`, `os-context`, `supabase` y `data-normalization`.
- `docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_00_CABECERA_Y_GOBIERNO_DEL_REGISTRO.md` y validador TREQ.
- `docs/plan-canonico/modular/package-gate-instances/GAP-PKG-004.json` y evidencias registradas el 2026-10-14.

**Nota de alcance:** Este documento ordena y operacionaliza decisiones ya existentes y agrega checklists de control, no reemplaza las definiciones canónicamente aprobadas ni inventa nuevos IDs. Ante discrepancia real debe detenerse la ejecución y reconciliarla con el owner de la fuente. La fuente ejecutable de la próxima accion física sigue siendo el coordinador canónico, no este anexo.