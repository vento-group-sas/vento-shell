### MINI-BLOQUE — MIGRACIÓN COORDINADA DE CONSUMIDORES WEB

<!-- PLAN-SECTION-META:START -->
Esta sección organiza la adopción progresiva de contratos, componentes y paquetes compartidos por los consumidores web. No autoriza una migración masiva ni simultánea: cada aplicación conserva su lote, evidencia, compatibilidad y rollback.

**Cobertura canónica:** `SHELL-MIG-001` a `SHELL-MIG-008` — 8 tareas.

**Resultado esperado:** los consumidores web abandonan copias legacy mediante lotes reversibles, conservan extensiones locales válidas y demuestran paridad antes de retirar artefactos anteriores.

**Puerta de entrada del mini-bloque:** contratos, paquetes y componentes involucrados aprobados; inventario de consumidores vigente; paquete de cambio identificado.

**Puerta de salida documental del mini-bloque:** los ocho marcadores globales `SHELL-MIG-001..008` quedan aprobados como contratos canónicos; `SHELL-MIG-003..008` quedan definidos como plantillas `TEMPLATE_PER_PACKAGE`; la continuidad puede avanzar sin afirmar migraciones, pruebas, adopciones o retiros físicos ejecutados.

**Puerta de salida operativa por paquete:** cada `package_id` que alcance materialización deberá cerrar las instancias aplicables `SHELL-MIG-003::<package_id>` a `SHELL-MIG-007::<package_id>` articuladas con su ciclo `SHELL-CI-020..024::<package_id>` y, cuando existan retiros, la certificación terminal `SHELL-MIG-008::<package_id>` después de `SHELL-CI-024::<package_id>`; todo con consumidores y commits exactos, evidencia vigente, paridad, rollback y retiro únicamente de identidades autorizadas.

**Cierre operativo integral del mini-bloque:** solo existe cuando todos los `package_id` aplicables han cerrado sus instancias sin consumidores legacy no autorizados ni retiros residuales pendientes; la aprobación documental de los marcadores globales no equivale a ese cierre físico.
<!-- PLAN-SECTION-META:END -->

### ✅ SHELL-MIG-001 — Consolidar inventario ejecutable de consumidores

**Estado:** APROBADA
**Tarea anterior:** SHELL-UI-020 — Compartir patrón de traspaso entre aplicaciones
**Tarea siguiente:** SHELL-MIG-002 — Definir lotes reversibles por repositorio
**Tipo de tarea:** documental; consolidación ejecutable y trazable de consumidores web, extensiones, entrypoints, scripts y CI que deberán migrarse, conservarse o retirarse mediante paquetes de cambio reversibles, sin ejecutar migraciones físicas
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** INVENTARIO EJECUTABLE CONSOLIDADO; CERO MIGRACIONES RUNTIME EJECUTADAS; CERO PAQUETES COMPARTIDOS ADOPTADOS POR CONSUMIDORES EN ESTA TAREA
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-001` transforma la auditoría cerrada en `SHELL-AUD-001..011` y la decisión de distribución de `SHELL-PKG-001` en una matriz ejecutable por repositorio, identidad física, clase de consumidor, disposición, propietario, paquete de cambio, lote base, evidencia esperada y rollback.

La tarea no ejecuta migraciones ni decide el orden reversible entre repositorios. `SHELL-MIG-002` permanece propietario de la definición final de lotes y orden. Para no dejar destinos genéricos, cada fila de esta tarea usa como **lote base** la combinación exacta `repositorio / tarea propietaria de ejecución`; esa dirección se convertirá en lote reversible y ordenado en `SHELL-MIG-002`.

La modalidad canónica de `SHELL-MIG-001` es `DEFINE_ONCE`: el inventario se desarrolla y aprueba una sola vez como contrato de clasificación y no crea una instancia posterior propia.

La clave `repositorio / tarea propietaria` es un **localizador documental de lote**, no la identidad de una ejecución física posterior. Para `SHELL-MIG-003..008`, la topología canónica exige una sola definición global y ejecuciones posteriores por paquete mediante `SHELL-MIG-003::<package_id>` a `SHELL-MIG-008::<package_id>`. Una instancia de paquete puede reunir uno o varios lotes de repositorio que pertenezcan al alcance aprobado del mismo `package_id`, sin reabrir ni volver a aprobar el marcador global.

Regla raíz:

```text
CONSUMIDOR O EXTENSIÓN FÍSICA
→ REPOSITORIO Y COMMIT
→ IDENTIDAD FAM / CONTRATO / ARCHIVO
→ CLASE DE CONSUMO
→ KEEP LOCAL / MIGRATE / RETIRE
→ PAQUETE O REPOSITORIO PROPIETARIO
→ LOTE BASE REPOSITORIO / TAREA
→ EVIDENCIA ESPERADA
→ ROLLBACK
→ SHELL-MIG-002
```

---

#### 2. Resultado material

| Métrica                                                                 | Resultado |
| ----------------------------------------------------------------------- | --------: |
| repositorios runtime reconciliados                                      |     **7** |
| ocurrencias runtime de familias `FAM-*`                                 |   **128** |
| ocurrencias runtime con consumo, entrypoint o conservación vigente      |   **117** |
| archivos sin consumidor confirmado ya autorizados para retiro bajo gate |    **11** |
| consumidores directos de permisos fuera de familias auth                |    **11** |
| consumidores `CI` de legacy compartido materializados                   |     **1** |
| consumidores `SCRIPT` adicionales materializados                        |     **2** |
| filas ejecutables totales del inventario                                |   **142** |
| consumidores dinámicos confirmados                                      |     **0** |
| dependencias runtime `@vento/*` ya adoptadas por los siete repositorios |     **0** |
| cambios físicos realizados                                              |     **0** |
| cambios `TREQ-*`                                                        |     **0** |

Las 142 filas no significan 142 archivos únicos: las 128 ocurrencias de familia modelan nodos físicos de migración y las filas adicionales modelan aristas de consumo directo, CI o script que requieren una disposición propia. Esta separación evita ocultar consumidores que sobreviven aunque una familia sea sustituida.

---

#### 3. Fuentes canónicas y corte físico vigente

| Fuente                                       | Decisión usada                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `SHELL-AUD-001..011`                         | universo de familias, ocurrencias, consumidores, candidatos sin consumidor y gates de retiro     |
| `SHELL-PKG-001..008`                         | cuatro unidades de paquete, SemVer independiente, compatibilidad, rollback y adopción controlada |
| `SHELL-CON-001..016`                         | contratos y artefactos generados propietarios                                                    |
| `SHELL-DB-001..005`                          | `@vento/supabase`, `Database`, RPC y factories browser/server/privileged                         |
| `SHELL-UI-001..020`                          | `@vento/ui-web`, componentes, AppShell, estados y patrones web                                   |
| `SHELL-AUTH-001..005` / `SHELL-CTX-001..006` | SDK, adapters, autorización, contexto y migración de legacy auth/context                         |
| `04A_04_SHELL.md`                            | requisitos vigentes de clasificación, paquete de cambio, compatibilidad, rollback y evidencia    |

| Superficie | Commit vigente verificado                  | Relación con el corte de auditoría                                                                        |
| ---------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| SHELL      | `c0bd10325a9942fd8fca4f272d2ed1842891a59b` | HEAD documental/tooling posterior; `src/` y `middleware.ts` sin delta runtime respecto de `SHELL-AUD-011` |
| VISO       | `47322403f3c64e83ae0c4a2f68c05d47093e5bb4` | idéntico al commit runtime auditado                                                                       |
| NEXO       | `142c4d696221e3ce3fda4ed3b62f3d1fe5b58799` | idéntico al commit runtime auditado                                                                       |
| FOGO       | `b6b9ed00e5267cabaac1a5a1090d93d5f60e86f2` | idéntico al commit runtime auditado                                                                       |
| ORIGO      | `b7a8303fa078ef087f522b6c99059ababfc27472` | idéntico al commit runtime auditado                                                                       |
| PULSO      | `71e0184486b5fe11e0a42435baf4024807a80efd` | idéntico al commit runtime auditado                                                                       |
| NUMERA     | `1b48a5da425d92e19ed89cf175b1dccc4cd960e1` | idéntico al commit runtime auditado                                                                       |

La revisión física adicional materializa una arista no separada previamente como fila ejecutable: el workflow temporal de NEXO y su script de patch dependen de la forma legacy de `operationalSession` y de evaluadores de permisos. Es evidencia nueva de clasificación, no un cambio de código posterior al corte: el commit de NEXO permanece idéntico al auditado.

---

#### 4. Clases de consumidor aplicadas

| Clase                   | Criterio en este inventario                                                                         | Disposición mínima                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `STATIC`                | importación, llamada o dependencia de módulo confirmada o heredada por la topología auditada        | migrar o conservar explícitamente                                           |
| `DYNAMIC`               | `import()`, registry o resolución dinámica confirmada                                               | ninguna confirmada en el corte; cualquier hallazgo posterior reabre el lote |
| `FRAMEWORK`             | `layout.tsx`, `middleware.ts`, `page.tsx` o `route.ts` ejecutado por convención                     | nunca retirar por ausencia de import                                        |
| `CI`                    | workflow que modifica o valida código dependiente de una forma legacy                               | adaptar o bloquear antes de cambiar esa forma                               |
| `SCRIPT`                | script que copia, parchea o genera consumidores                                                     | migrar o conservar con dependencia exacta                                   |
| `MANUAL`                | herramienta operativa ejecutada por un operador                                                     | conservar hasta sustitución reproducible                                    |
| `NO_CONSUMER_CONFIRMED` | archivo cuya ausencia de consumidores fue auditada y cuyo retiro posterior fue autorizado bajo gate | retirar solo tras revalidar cero consumidores                               |

No se localizó un consumidor `DYNAMIC` confirmado en `SHELL-AUD-001..011`; los seis repositorios externos permanecen en los mismos commits, por lo que esa conclusión no cambia. La ausencia de consumidor dinámico no permite omitir su búsqueda antes de un retiro físico.

---

#### 5. Fronteras de paquete y propiedad

| Frontera                | Responsabilidad de migración                                                       | Estado de adopción al corte                                     |
| ----------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `@vento/contracts`      | catálogos, códigos, tipos generados, contratos y manifiestos                       | ningún runtime consumidor confirmado                            |
| `@vento/os-context`     | guards, permisos, contexto, role override, SSO, firma y adapters compartidos       | package parcial existente; ningún runtime consumidor confirmado |
| `@vento/supabase`       | factories browser/server/privileged y frontera técnica Supabase                    | package no adoptado por runtimes                                |
| `@vento/ui-web`         | primitivas, Chrome, AppSwitcher, ProfileMenu, PageHeader, VentoLogo y contrato CSS | package no materializado/adoptado por runtimes                  |
| repositorio propietario | layouts, middleware, compositor server, tema y extensiones empresariales           | permanecen locales                                              |

Una fila `KEEP LOCAL` no autoriza duplicar una fuente de verdad. Significa que el entrypoint o la extensión permanece en el repositorio y debe consumir contratos, paquetes o adapters compartidos cuando estos estén disponibles.

---

#### 6. Disposición canónica de las 26 familias heredadas

La disposición arquitectónica preserva `SHELL-AUD-010`; la acción de `MIG-001` describe qué debe ocurrir con la ocurrencia consumidora. `COMPARTIR` o `GENERAR` no significa que el consumidor ya use el destino: por eso su acción actual es `MIGRATE`. Las cuarentenas `FAM-017` y `FAM-026` mantienen la disposición histórica `MANTENER_LOCAL`, pero `SHELL-AUD-011` ya autorizó su retiro físico posterior bajo gate.

| Familia   | Identidad                                        | Disposición `SHELL-AUD-010` | Acción `SHELL-MIG-001` | Frontera objetivo                                            | Propietario                      |
| --------- | ------------------------------------------------ | --------------------------- | ---------------------- | ------------------------------------------------------------ | -------------------------------- |
| `FAM-001` | `src/app/layout.tsx`                             | `MANTENER_LOCAL`            | `KEEP LOCAL`           | LOCAL + @vento/ui-web                                        | `SHELL-UI-010`                   |
| `FAM-002` | `src/app/globals.css`                            | `MANTENER_LOCAL`            | `KEEP LOCAL`           | LOCAL + @vento/ui-web                                        | `SHELL-UI-001`                   |
| `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `MANTENER_LOCAL`            | `KEEP LOCAL`           | LOCAL + @vento/ui-web + @vento/contracts + @vento/os-context | `SHELL-UI-010`                   |
| `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web                                                | `SHELL-UI-010`                   |
| `FAM-005` | `src/components/vento/standard/ui.tsx`           | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web                                                | `SHELL-UI-001`                   |
| `FAM-006` | `src/components/vento/standard/table.tsx`        | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web                                                | `SHELL-UI-001`                   |
| `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web + @vento/contracts                             | `SHELL-UI-007`                   |
| `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web + @vento/os-context                            | `SHELL-UI-010`                   |
| `FAM-009` | `src/lib/auth/guard.ts`                          | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context + @vento/contracts                         | `SHELL-AUTH-002`                 |
| `FAM-010` | `src/lib/auth/permissions.ts`                    | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context + @vento/contracts                         | `SHELL-AUTH-002`                 |
| `FAM-011` | `src/lib/auth/operational-session.ts`            | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context + @vento/contracts                         | `SHELL-CTX-001`                  |
| `FAM-012` | `src/lib/auth/role-override.ts`                  | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context + @vento/contracts                         | `SHELL-AUTH-001`                 |
| `FAM-013` | `src/lib/auth/role-override-config.ts`           | `GENERAR`                   | `MIGRATE`              | @vento/contracts                                             | `SHELL-CON-004 / SHELL-CON-005`  |
| `FAM-014` | `src/lib/supabase/client.ts`                     | `COMPARTIR`                 | `MIGRATE`              | @vento/supabase                                              | `SHELL-DB-001`                   |
| `FAM-015` | `src/lib/supabase/server.ts`                     | `COMPARTIR`                 | `MIGRATE`              | @vento/supabase                                              | `SHELL-DB-001`                   |
| `FAM-016` | `middleware.ts`                                  | `MANTENER_LOCAL`            | `KEEP LOCAL`           | LOCAL + @vento/os-context + @vento/supabase                  | `SHELL-AUTH-002`                 |
| `FAM-017` | `src/lib/supabase/proxy.ts`                      | `MANTENER_LOCAL`            | `RETIRE`               | LOCAL; retiro bajo `SHELL-AUD-011`                           | `SHELL-AUD-011 / SHELL-MIG-008`  |
| `FAM-018` | `src/lib/auth/operational-context.ts`            | `MANTENER_LOCAL`            | `KEEP LOCAL`           | devVentoGroup/vento-nexo + @vento/os-context                 | `SHELL-CTX-001`                  |
| `FAM-019` | `src/components/vento/standard/page-header.tsx`  | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web                                                | `SHELL-UI-001`                   |
| `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `COMPARTIR`                 | `MIGRATE`              | @vento/ui-web + @vento/contracts                             | `SHELL-UI-001`                   |
| `FAM-021` | `src/lib/auth/request-host.ts`                   | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context                                            | `SHELL-AUTH-002`                 |
| `FAM-022` | `src/lib/auth/shared-device-signature.ts`        | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context + @vento/contracts                         | `SHELL-AUTH-002`                 |
| `FAM-023` | `src/lib/auth/sso.ts`                            | `COMPARTIR`                 | `MIGRATE`              | @vento/os-context + @vento/contracts                         | `SHELL-AUTH-002`                 |
| `FAM-024` | `src/lib/supabase/admin.ts`                      | `COMPARTIR`                 | `MIGRATE`              | @vento/supabase                                              | `SHELL-DB-001`                   |
| `FAM-025` | `src/lib/supabase/employee-sites.ts`             | `COMPARTIR`                 | `MIGRATE`              | @vento/contracts + @vento/os-context                         | `SHELL-CON-007 / SHELL-AUTH-002` |
| `FAM-026` | `src/utils/supabase/client.ts`                   | `MANTENER_LOCAL`            | `RETIRE`               | devVentoGroup/vento-pulso; retiro bajo `SHELL-AUD-011`       | `SHELL-AUD-011 / SHELL-MIG-008`  |

**Conciliación arquitectónica:** 18 `COMPARTIR`, 1 `GENERAR` y 7 `MANTENER_LOCAL`, exactamente como `SHELL-AUD-010`. **Conciliación de acción:** las ocurrencias concretas se refinan en la matriz siguiente según consumo; `PageHeader` NEXO, `sso.ts` sin consumidor y `employee-sites` FOGO/NUMERA pasan a `RETIRE` por la decisión posterior de `SHELL-AUD-011`, mientras sus equivalentes consumidos permanecen `MIGRATE`.

---

#### 7. Matriz ejecutable de 128 ocurrencias runtime

| Repositorio                  | Familia   | Archivo                                          | Clase                   | Disposición  | Frontera objetivo                                                                 | Propietario                       | Lote base                                     | Evidencia esperada                                                                                                                       | Rollback                                                                                                     |
| ---------------------------- | --------- | ------------------------------------------------ | ----------------------- | ------------ | --------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `devVentoGroup/vento-shell`  | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-shell + @vento/ui-web                                         | `SHELL-UI-010`                    | `devVentoGroup/vento-shell / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-shell`  | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-shell + @vento/ui-web                                         | `SHELL-UI-001`                    | `devVentoGroup/vento-shell / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-shell`  | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-shell / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-shell`  | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-shell / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-shell`  | `FAM-016` | `middleware.ts`                                  | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-shell + @vento/os-context + @vento/supabase                   | `SHELL-AUTH-002`                  | `devVentoGroup/vento-shell / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-viso`   | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-viso + @vento/ui-web                                          | `SHELL-UI-010`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-viso`   | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-viso + @vento/ui-web                                          | `SHELL-UI-001`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-viso`   | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-viso + @vento/ui-web + @vento/contracts + @vento/os-context   | `SHELL-UI-010`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-viso`   | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-010`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-006` | `src/components/vento/standard/table.tsx`        | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-007`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/os-context                                                 | `SHELL-UI-010`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-009` | `src/lib/auth/guard.ts`                          | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-viso`   | `FAM-010` | `src/lib/auth/permissions.ts`                    | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-viso`   | `FAM-011` | `src/lib/auth/operational-session.ts`            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-CTX-001`                   | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-viso`   | `FAM-012` | `src/lib/auth/role-override.ts`                  | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-001`                  | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-viso`   | `FAM-013` | `src/lib/auth/role-override-config.ts`           | `STATIC`                | `MIGRATE`    | @vento/contracts                                                                  | `SHELL-CON-004 / SHELL-CON-005`   | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA; tipos/artefactos generados reproducibles y consumidor sin strings o casts legacy no autorizados.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-viso`   | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-viso`   | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-viso`   | `FAM-016` | `middleware.ts`                                  | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-viso + @vento/os-context + @vento/supabase                    | `SHELL-AUTH-002`                  | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-viso`   | `FAM-017` | `src/lib/supabase/proxy.ts`                      | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-viso                                                          | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-viso / SHELL-MIG-008`    | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-viso`   | `FAM-019` | `src/components/vento/standard/page-header.tsx`  | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-001`                    | `devVentoGroup/vento-viso / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-viso`   | `FAM-023` | `src/lib/auth/sso.ts`                            | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-viso                                                          | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-viso / SHELL-MIG-008`    | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-viso`   | `FAM-024` | `src/lib/supabase/admin.ts`                      | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-nexo`   | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/ui-web                                          | `SHELL-UI-010`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-nexo`   | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/ui-web                                          | `SHELL-UI-001`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-nexo`   | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/ui-web + @vento/contracts + @vento/os-context   | `SHELL-UI-010`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-nexo`   | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-010`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-nexo`   | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-nexo`   | `FAM-006` | `src/components/vento/standard/table.tsx`        | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-nexo`   | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-007`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-nexo`   | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/os-context                                                 | `SHELL-UI-010`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-nexo`   | `FAM-009` | `src/lib/auth/guard.ts`                          | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-010` | `src/lib/auth/permissions.ts`                    | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-011` | `src/lib/auth/operational-session.ts`            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-CTX-001`                   | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-012` | `src/lib/auth/role-override.ts`                  | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-001`                  | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-013` | `src/lib/auth/role-override-config.ts`           | `STATIC`                | `MIGRATE`    | @vento/contracts                                                                  | `SHELL-CON-004 / SHELL-CON-005`   | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA; tipos/artefactos generados reproducibles y consumidor sin strings o casts legacy no autorizados.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-nexo`   | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-nexo`   | `FAM-016` | `middleware.ts`                                  | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/os-context + @vento/supabase                    | `SHELL-AUTH-002`                  | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-nexo`   | `FAM-017` | `src/lib/supabase/proxy.ts`                      | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-nexo                                                          | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-nexo / SHELL-MIG-008`    | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-nexo`   | `FAM-018` | `src/lib/auth/operational-context.ts`            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/os-context                                      | `SHELL-CTX-001`                   | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-nexo`   | `FAM-019` | `src/components/vento/standard/page-header.tsx`  | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-nexo                                                          | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-nexo / SHELL-MIG-008`    | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-nexo`   | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-001`                    | `devVentoGroup/vento-nexo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-nexo`   | `FAM-021` | `src/lib/auth/request-host.ts`                   | `STATIC`                | `MIGRATE`    | @vento/os-context                                                                 | `SHELL-AUTH-002`                  | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-022` | `src/lib/auth/shared-device-signature.ts`        | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-nexo`   | `FAM-023` | `src/lib/auth/sso.ts`                            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-fogo + @vento/ui-web                                          | `SHELL-UI-010`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-fogo`   | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-fogo + @vento/ui-web                                          | `SHELL-UI-001`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-fogo`   | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-fogo + @vento/ui-web + @vento/contracts + @vento/os-context   | `SHELL-UI-010`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-fogo`   | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-010`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-fogo`   | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-fogo`   | `FAM-006` | `src/components/vento/standard/table.tsx`        | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-fogo`   | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-007`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-fogo`   | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/os-context                                                 | `SHELL-UI-010`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-fogo`   | `FAM-009` | `src/lib/auth/guard.ts`                          | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-010` | `src/lib/auth/permissions.ts`                    | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-011` | `src/lib/auth/operational-session.ts`            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-CTX-001`                   | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-012` | `src/lib/auth/role-override.ts`                  | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-001`                  | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-013` | `src/lib/auth/role-override-config.ts`           | `STATIC`                | `MIGRATE`    | @vento/contracts                                                                  | `SHELL-CON-004 / SHELL-CON-005`   | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA; tipos/artefactos generados reproducibles y consumidor sin strings o casts legacy no autorizados.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-fogo`   | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-fogo`   | `FAM-016` | `middleware.ts`                                  | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-fogo + @vento/os-context + @vento/supabase                    | `SHELL-AUTH-002`                  | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-fogo`   | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-001`                    | `devVentoGroup/vento-fogo / SHELL-MIG-005`    | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-fogo`   | `FAM-022` | `src/lib/auth/shared-device-signature.ts`        | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-fogo`   | `FAM-023` | `src/lib/auth/sso.ts`                            | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-fogo                                                          | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-fogo / SHELL-MIG-008`    | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-fogo`   | `FAM-025` | `src/lib/supabase/employee-sites.ts`             | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-fogo                                                          | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-fogo / SHELL-MIG-008`    | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-origo`  | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-origo + @vento/ui-web                                         | `SHELL-UI-010`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-origo`  | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-origo + @vento/ui-web                                         | `SHELL-UI-001`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-origo`  | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-origo + @vento/ui-web + @vento/contracts + @vento/os-context  | `SHELL-UI-010`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-origo`  | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-010`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-origo`  | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-origo`  | `FAM-006` | `src/components/vento/standard/table.tsx`        | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-origo`  | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-007`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-origo`  | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/os-context                                                 | `SHELL-UI-010`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-origo`  | `FAM-009` | `src/lib/auth/guard.ts`                          | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-origo`  | `FAM-010` | `src/lib/auth/permissions.ts`                    | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-origo`  | `FAM-011` | `src/lib/auth/operational-session.ts`            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-CTX-001`                   | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-origo`  | `FAM-012` | `src/lib/auth/role-override.ts`                  | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-001`                  | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-origo`  | `FAM-013` | `src/lib/auth/role-override-config.ts`           | `STATIC`                | `MIGRATE`    | @vento/contracts                                                                  | `SHELL-CON-004 / SHELL-CON-005`   | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA; tipos/artefactos generados reproducibles y consumidor sin strings o casts legacy no autorizados.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-origo`  | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-origo`  | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-origo`  | `FAM-016` | `middleware.ts`                                  | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-origo + @vento/os-context + @vento/supabase                   | `SHELL-AUTH-002`                  | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-origo`  | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-001`                    | `devVentoGroup/vento-origo / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-origo`  | `FAM-022` | `src/lib/auth/shared-device-signature.ts`        | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-origo`  | `FAM-023` | `src/lib/auth/sso.ts`                            | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-origo                                                         | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-origo / SHELL-MIG-008`   | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-origo`  | `FAM-025` | `src/lib/supabase/employee-sites.ts`             | `STATIC`                | `MIGRATE`    | @vento/contracts + @vento/os-context                                              | `SHELL-CON-007 / SHELL-AUTH-002`  | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-pulso + @vento/ui-web                                         | `SHELL-UI-010`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-pulso`  | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-pulso + @vento/ui-web                                         | `SHELL-UI-001`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-pulso`  | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-pulso + @vento/ui-web + @vento/contracts + @vento/os-context  | `SHELL-UI-010`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-pulso`  | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-010`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-pulso`  | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-pulso`  | `FAM-006` | `src/components/vento/standard/table.tsx`        | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-pulso`  | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-007`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-pulso`  | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/os-context                                                 | `SHELL-UI-010`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-pulso`  | `FAM-009` | `src/lib/auth/guard.ts`                          | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-010` | `src/lib/auth/permissions.ts`                    | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-011` | `src/lib/auth/operational-session.ts`            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-CTX-001`                   | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-012` | `src/lib/auth/role-override.ts`                  | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-001`                  | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-013` | `src/lib/auth/role-override-config.ts`           | `STATIC`                | `MIGRATE`    | @vento/contracts                                                                  | `SHELL-CON-004 / SHELL-CON-005`   | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA; tipos/artefactos generados reproducibles y consumidor sin strings o casts legacy no autorizados.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-pulso`  | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-pulso`  | `FAM-017` | `src/lib/supabase/proxy.ts`                      | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-pulso                                                         | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-pulso / SHELL-MIG-008`   | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-pulso`  | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-001`                    | `devVentoGroup/vento-pulso / SHELL-MIG-005`   | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-pulso`  | `FAM-022` | `src/lib/auth/shared-device-signature.ts`        | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-023` | `src/lib/auth/sso.ts`                            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-pulso`  | `FAM-026` | `src/utils/supabase/client.ts`                   | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-pulso                                                         | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-pulso / SHELL-MIG-008`   | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-numera` | `FAM-001` | `src/app/layout.tsx`                             | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-numera + @vento/ui-web                                        | `SHELL-UI-010`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-numera` | `FAM-002` | `src/app/globals.css`                            | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-numera + @vento/ui-web                                        | `SHELL-UI-001`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-numera` | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `STATIC`                | `KEEP LOCAL` | devVentoGroup/vento-numera + @vento/ui-web + @vento/contracts + @vento/os-context | `SHELL-UI-010`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-numera` | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-010`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-numera` | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-numera` | `FAM-006` | `src/components/vento/standard/table.tsx`        | `STATIC`                | `MIGRATE`    | @vento/ui-web                                                                     | `SHELL-UI-001`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-numera` | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-007`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-numera` | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/os-context                                                 | `SHELL-UI-010`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-numera` | `FAM-009` | `src/lib/auth/guard.ts`                          | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-numera` | `FAM-010` | `src/lib/auth/permissions.ts`                    | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-002`                  | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-numera` | `FAM-011` | `src/lib/auth/operational-session.ts`            | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-CTX-001`                   | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-numera` | `FAM-012` | `src/lib/auth/role-override.ts`                  | `STATIC`                | `MIGRATE`    | @vento/os-context + @vento/contracts                                              | `SHELL-AUTH-001`                  | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; decisión, razones, contexto, SSO o firma mantienen paridad y protección en servidor.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-numera` | `FAM-013` | `src/lib/auth/role-override-config.ts`           | `STATIC`                | `MIGRATE`    | @vento/contracts                                                                  | `SHELL-CON-004 / SHELL-CON-005`   | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA; tipos/artefactos generados reproducibles y consumidor sin strings o casts legacy no autorizados.                 | Restaurar helper/contrato local anterior y los pins previos compatibles de contratos/SDK.                    |
| `devVentoGroup/vento-numera` | `FAM-014` | `src/lib/supabase/client.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-numera` | `FAM-015` | `src/lib/supabase/server.ts`                     | `STATIC`                | `MIGRATE`    | @vento/supabase                                                                   | `SHELL-DB-001`                    | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar factory local anterior, política de cookies/configuración y pin previo de @vento/supabase.         |
| `devVentoGroup/vento-numera` | `FAM-016` | `middleware.ts`                                  | `FRAMEWORK`             | `KEEP LOCAL` | devVentoGroup/vento-numera + @vento/os-context + @vento/supabase                  | `SHELL-AUTH-002`                  | `devVentoGroup/vento-numera / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; sesión, cookies, host, errores y frontera privilegiada equivalentes según aplique.                   | Restaurar archivo local anterior y la versión/configuración compartida previa compatible.                    |
| `devVentoGroup/vento-numera` | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `STATIC`                | `MIGRATE`    | @vento/ui-web + @vento/contracts                                                  | `SHELL-UI-001`                    | `devVentoGroup/vento-numera / SHELL-MIG-005`  | BUILD + LOCAL + REMOTA; API, CSS, tema, responsive, navegación y accesibilidad equivalentes en el consumidor.                            | Restaurar componente/CSS local anterior y el pin previo de @vento/ui-web.                                    |
| `devVentoGroup/vento-numera` | `FAM-023` | `src/lib/auth/sso.ts`                            | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-numera                                                        | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-numera / SHELL-MIG-008`  | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |
| `devVentoGroup/vento-numera` | `FAM-025` | `src/lib/supabase/employee-sites.ts`             | `NO_CONSUMER_CONFIRMED` | `RETIRE`     | devVentoGroup/vento-numera                                                        | `SHELL-AUD-011 / SHELL-MIG-008`   | `devVentoGroup/vento-numera / SHELL-MIG-008`  | LOCAL + BUILD; cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; exports y aliases sin referencias; rollback restaurable. | Restaurar último blob/export conocido del artefacto y revertir el cambio de retiro; repetir build y pruebas. |

**Conciliación:** 128 ocurrencias esperadas, 128 materializadas; 11 quedan como `RETIRE` bajo gate de cero consumidores y 117 como nodos consumidos, entrypoints o compatibilidad vigente.

---

#### 8. Consumidores directos de autorización fuera de las familias auth

`SHELL-AUD-003` materializó once archivos de negocio o launcher con llamadas directas a permisos fuera de `guard.ts`, `permissions.ts`, `operational-session.ts` y `role-override.ts`. Todos deben migrar a la frontera compartida; ocultarlos detrás de la migración de los helpers dejaría bypasses o evaluadores paralelos.

| Repositorio                 | Archivo                                                  | Clase       | Disposición | Frontera objetivo                    | Propietario                       | Lote base                                    | Evidencia esperada                                                                                                         | Rollback                                                                    |
| --------------------------- | -------------------------------------------------------- | ----------- | ----------- | ------------------------------------ | --------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `devVentoGroup/vento-shell` | `src/app/page.tsx`                                       | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-shell / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-viso`  | `src/app/api/viso/upload-product-image/route.ts`         | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-viso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-viso`  | `src/app/api/viso/upload-commercial-menu-image/route.ts` | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-viso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-viso`  | `src/app/api/viso/attendance-report/route.ts`            | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-viso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-viso`  | `src/app/staff/[id]/page.tsx`                            | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-viso / SHELL-AUTH-005`  | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-origo` | `src/lib/suppliers.ts`                                   | `STATIC`    | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-origo / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-origo` | `src/app/receipts/new/page.tsx`                          | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-origo / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-origo` | `src/app/product-master-review/page.tsx`                 | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-origo / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-origo` | `src/app/purchase-orders/[id]/pdf/route.ts`              | `FRAMEWORK` | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-origo / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-pulso` | `src/modules/pos/actions/identify-client.action.ts`      | `STATIC`    | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-pulso / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |
| `devVentoGroup/vento-pulso` | `src/app/orders/delivery-override-bridge.tsx`            | `STATIC`    | `MIGRATE`   | @vento/contracts + @vento/os-context | `SHELL-AUTH-002 / SHELL-AUTH-005` | `devVentoGroup/vento-pulso / SHELL-AUTH-005` | BUILD + LOCAL + REMOTA + OPERATIVA; misma decisión y razones para el mismo actor/contexto; rutas server siguen protegidas. | Restaurar llamada/evaluador local anterior y pins previos de contratos/SDK. |

**Conciliación:** 11 archivos, 11 filas, 0 destinos genéricos.

---

#### 9. Consumidores CI, script y manual

| Repositorio                 | Archivo                                                   | Clase             | Disposición  | Frontera objetivo                                                      | Propietario     | Lote base                                   | Evidencia esperada                                                                                                      | Rollback                                                                                           |
| --------------------------- | --------------------------------------------------------- | ----------------- | ------------ | ---------------------------------------------------------------------- | --------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `devVentoGroup/vento-nexo`  | `.github/workflows/tmp-apply-privileged-request-area.yml` | `CI`              | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/os-context + @vento/contracts        | `SHELL-MIG-003` | `devVentoGroup/vento-nexo / SHELL-MIG-003`  | Workflow no parchea una forma legacy incompatible; build de preview y targets del patch verificados.                    | Revertir el cambio del workflow y restaurar el script/targets previos en NEXO.                     |
| `devVentoGroup/vento-nexo`  | `scripts/tmp-apply-privileged-request-area.mjs`           | `SCRIPT`          | `KEEP LOCAL` | devVentoGroup/vento-nexo + @vento/os-context + @vento/contracts        | `SHELL-MIG-003` | `devVentoGroup/vento-nexo / SHELL-MIG-003`  | Patch reproducible contra los archivos exactos; no introduce nuevo consumo legacy tras el gate.                         | Restaurar script y archivos objetivo al commit previo del parche.                                  |
| `devVentoGroup/vento-shell` | `tools/bootstrap-app-shell.ps1`                           | `SCRIPT / MANUAL` | `MIGRATE`    | @vento/ui-web + @vento/contracts + @vento/os-context + @vento/supabase | `SHELL-MIG-004` | `devVentoGroup/vento-shell / SHELL-MIG-004` | Scaffold sustituto reproduce configuración sin copiar implementación runtime; versiones fijadas y rollback comprobable. | Restaurar bootstrap/template legacy controlados hasta que el scaffold sustituto quede certificado. |

Reconciliación de CI actual:

| Repositorio                  | Estado CI relevante para fundación compartida                                                                                             | Resultado                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `devVentoGroup/vento-shell`  | `.github/workflows/validate-canonical-plan.yml` valida documentación y derivados canónicos                                                | no es consumidor runtime de los paquetes compartidos |
| `devVentoGroup/vento-viso`   | `apply-guided-product-form.yml` modifica `src/components/viso/menu-item-form.tsx`                                                         | fuera del inventario de fundación compartida         |
| `devVentoGroup/vento-nexo`   | `tmp-apply-privileged-request-area.yml` parchea remisiones y depende de `operationalSession`/evaluadores legacy                           | consumidor `CI` incluido                             |
| `devVentoGroup/vento-fogo`   | no existe `.github/workflows` en el corte consultado                                                                                      | sin consumidor CI confirmado                         |
| `devVentoGroup/vento-origo`  | no existe `.github/workflows` en el corte consultado                                                                                      | sin consumidor CI confirmado                         |
| `devVentoGroup/vento-pulso`  | `apply-electronic-billing-ui.yml` está deshabilitado y solo remite a `predev/prebuild`; el `package.json` vigente no declara esos scripts | sin consumidor de fundación compartida confirmado    |
| `devVentoGroup/vento-numera` | no existe `.github/workflows` en el corte consultado                                                                                      | sin consumidor CI confirmado                         |

El workflow/script temporal de NEXO no recibe autorización de retiro en esta tarea. Se conserva local y debe quedar bloqueado contra nuevas dependencias legacy en `SHELL-MIG-003`; `SHELL-MIG-002` decidirá si su lote lo adapta o lo elimina después de comprobar que su propósito temporal ya terminó.

---

#### 10. Candidatos sin consumidor confirmado y legacy consumido

La separación es vinculante: un archivo sin consumidor confirmado no exige sustituto funcional; un legacy consumido sí exige reemplazo, migración, paridad y rollback antes del retiro.

| Identidad                                       | Repositorio                  | Estado de consumo         | Disposición | Lote base                                    | Condición de salida                                                                                          |
| ----------------------------------------------- | ---------------------------- | ------------------------- | ----------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/lib/supabase/proxy.ts`                     | `devVentoGroup/vento-viso`   | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-viso / SHELL-MIG-008`   | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/auth/sso.ts`                           | `devVentoGroup/vento-viso`   | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-viso / SHELL-MIG-008`   | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/supabase/proxy.ts`                     | `devVentoGroup/vento-nexo`   | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-nexo / SHELL-MIG-008`   | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/components/vento/standard/page-header.tsx` | `devVentoGroup/vento-nexo`   | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-nexo / SHELL-MIG-008`   | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/auth/sso.ts`                           | `devVentoGroup/vento-fogo`   | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-fogo / SHELL-MIG-008`   | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/supabase/employee-sites.ts`            | `devVentoGroup/vento-fogo`   | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-fogo / SHELL-MIG-008`   | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/auth/sso.ts`                           | `devVentoGroup/vento-origo`  | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-origo / SHELL-MIG-008`  | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/supabase/proxy.ts`                     | `devVentoGroup/vento-pulso`  | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-pulso / SHELL-MIG-008`  | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/utils/supabase/client.ts`                  | `devVentoGroup/vento-pulso`  | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-pulso / SHELL-MIG-008`  | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/auth/sso.ts`                           | `devVentoGroup/vento-numera` | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-numera / SHELL-MIG-008` | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/supabase/employee-sites.ts`            | `devVentoGroup/vento-numera` | sin consumidor confirmado | `RETIRE`    | `devVentoGroup/vento-numera / SHELL-MIG-008` | cero consumidores STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT revalidado; build y rollback aprobados                  |
| `src/lib/auth/sso.ts`                           | `devVentoGroup/vento-nexo`   | consumidor confirmado     | `MIGRATE`   | `devVentoGroup/vento-nexo / SHELL-AUTH-005`  | reemplazo disponible, consumidores migrados, paridad demostrada y rollback probado antes de retirar la copia |
| `src/lib/auth/sso.ts`                           | `devVentoGroup/vento-pulso`  | consumidor confirmado     | `MIGRATE`   | `devVentoGroup/vento-pulso / SHELL-AUTH-005` | reemplazo disponible, consumidores migrados, paridad demostrada y rollback probado antes de retirar la copia |
| `src/lib/supabase/employee-sites.ts`            | `devVentoGroup/vento-origo`  | consumidor confirmado     | `MIGRATE`   | `devVentoGroup/vento-origo / SHELL-AUTH-005` | reemplazo disponible, consumidores migrados, paridad demostrada y rollback probado antes de retirar la copia |
| `src/components/vento/standard/page-header.tsx` | `devVentoGroup/vento-viso`   | consumidor confirmado     | `MIGRATE`   | `devVentoGroup/vento-viso / SHELL-MIG-005`   | reemplazo disponible, consumidores migrados, paridad demostrada y rollback probado antes de retirar la copia |

**Conciliación:** 11 archivos sin consumidor confirmado quedan separados de 4 ejemplos críticos de legacy consumido que no puede retirarse anticipadamente.

---

#### 11. Miembros internos y placeholders heredados de `SHELL-AUD-011`

| Identidad                                                  | Disposición                                                                         | Propietario                    | Lote base                                                                                                                                                                                    | Evidencia esperada                                                          | Rollback                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `GuardOptions.requireAppAccessPermission = false` en PULSO | `RETIRE` o sustituir por política discriminada                                      | `SHELL-AUTH-005`               | `devVentoGroup/vento-pulso / SHELL-MIG-008`                                                                                                                                                  | cero consumidores del valor `false`; typecheck, pruebas de guard y rollback | restaurar la rama previa si aparece una regresión                    |
| `AppSwitcherItem.brandColor`                               | `RETIRE` como miembro local inerte; color futuro se deriva de presentación canónica | `SHELL-CON-002 / SHELL-UI-001` | `devVentoGroup/vento-viso`; `devVentoGroup/vento-nexo`; `devVentoGroup/vento-fogo`; `devVentoGroup/vento-origo`; `devVentoGroup/vento-pulso`; `devVentoGroup/vento-numera` / `SHELL-MIG-008` | cero lecturas legacy; typecheck y render equivalentes                       | restaurar miembro y proyección anterior                              |
| `AppSwitcherProps.sites`                                   | `RETIRE`                                                                            | `SHELL-CTX-003 / SHELL-UI-007` | `devVentoGroup/vento-viso`; `devVentoGroup/vento-nexo`; `devVentoGroup/vento-fogo`; `devVentoGroup/vento-origo`; `devVentoGroup/vento-pulso`; `devVentoGroup/vento-numera` / `SHELL-MIG-008` | cero consumidores; selector de sede propietario preservado                  | restaurar prop y caller anterior                                     |
| `AppSwitcherProps.activeSiteId`                            | `RETIRE`                                                                            | `SHELL-CTX-003 / SHELL-UI-007` | `devVentoGroup/vento-viso`; `devVentoGroup/vento-nexo`; `devVentoGroup/vento-fogo`; `devVentoGroup/vento-origo`; `devVentoGroup/vento-pulso`; `devVentoGroup/vento-numera` / `SHELL-MIG-008` | cero consumidores; contexto activo preservado fuera del componente          | restaurar prop y caller anterior                                     |
| acceso SHELL `Mi perfil` → `/`                             | `RETIRE`                                                                            | `SHELL-UI-010 / SHELL-APP-021` | `devVentoGroup/vento-shell / SHELL-APP-021`                                                                                                                                                  | acción ausente y navegación del Hub verificada                              | restaurar entrada únicamente si existe capacidad aprobada compatible |
| acceso SHELL `Configuración` → `/`                         | `RETIRE`                                                                            | `SHELL-UI-010 / SHELL-APP-021` | `devVentoGroup/vento-shell / SHELL-APP-021`                                                                                                                                                  | acción ausente y navegación del Hub verificada                              | restaurar entrada únicamente si existe capacidad aprobada compatible |

Estos elementos no se cuentan dentro de las 142 filas de archivos/consumidores porque son miembros contractuales o entradas de navegación, no archivos físicos adicionales.

---

#### 12. Inventario por repositorio

| Repositorio                  | Ocurrencias `FAM-*` | Candidatos sin consumidor | Consumidores directos adicionales | CI/script/manual relevante | Resultado de preparación                                                              |
| ---------------------------- | ------------------: | ------------------------: | --------------------------------: | -------------------------: | ------------------------------------------------------------------------------------- |
| `devVentoGroup/vento-shell`  |               **5** |                     **0** |                             **1** |                      **1** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |
| `devVentoGroup/vento-viso`   |              **21** |                     **2** |                             **4** |                      **0** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |
| `devVentoGroup/vento-nexo`   |              **23** |                     **2** |                             **0** |                      **2** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |
| `devVentoGroup/vento-fogo`   |              **20** |                     **2** |                             **0** |                      **0** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |
| `devVentoGroup/vento-origo`  |              **20** |                     **1** |                             **4** |                      **0** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |
| `devVentoGroup/vento-pulso`  |              **20** |                     **2** |                             **2** |                      **0** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |
| `devVentoGroup/vento-numera` |              **19** |                     **2** |                             **0** |                      **0** | inventario direccionado; orden reversible pendiente exclusivamente de `SHELL-MIG-002` |

**Conciliación:** 128 ocurrencias + 11 consumidores directos + 3 consumidores CI/script/manual = 142 filas ejecutables.

---

#### 13. Dependencias internas antes de cada lote

Sin fijar todavía el orden entre repositorios, cada lote reversible definido por `SHELL-MIG-002` deberá respetar esta precedencia interna:

1. contratos o artefactos generados requeridos disponibles y versionados;
2. paquete compartido propietario disponible y compatible;
3. consumidor local modificado para importar/adaptar la frontera compartida;
4. extensiones locales preservadas mediante configuración, slot, adapter o entrypoint;
5. pruebas de paridad y observabilidad;
6. retiro de la copia legacy únicamente si su consumo es cero o todos sus consumidores ya migraron;
7. rollback probado antes de cerrar el lote.

No se fija aquí qué repositorio migra primero. Esa decisión pertenece exclusivamente a `SHELL-MIG-002`.

---

#### 14. Evidencia mínima que deberá producir cada lote posterior

| Clase     | Evidencia mínima                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------- |
| BUILD     | build/typecheck/lint del repositorio propietario cuando existan scripts aplicables                       |
| LOCAL     | imports, exports, aliases, paquete fijado, archivos cambiados y cero referencias legacy no autorizadas   |
| REMOTA    | commit base, commit resultante, versión de paquete y estado del repositorio remoto                       |
| OPERATIVA | paridad de autorización, sesión, contexto, rutas, navegación o interacción según la familia              |
| FÍSICA    | archivo/entrypoint/package realmente presente o retirado conforme a la disposición y al commit declarado |

Para `RETIRE`, además se exige la búsqueda de consumidores `STATIC`, `DYNAMIC`, `FRAMEWORK`, `CI` y `SCRIPT` en el commit exacto que se modificará. Para legacy consumido se exige reemplazo y migración antes del retiro.

---

#### 15. Rollback mínimo por tipo de cambio

| Tipo                                                 | Rollback obligatorio                                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| adopción de `@vento/ui-web`                          | restaurar componente/CSS local y pin compatible anterior                               |
| adopción de `@vento/os-context` / `@vento/contracts` | restaurar helper, tipo o evaluador local y pins anteriores                             |
| adopción de `@vento/supabase`                        | restaurar factory, cookies/configuración y pin anterior                                |
| entrypoint `KEEP LOCAL`                              | restaurar archivo local anterior y composición previa                                  |
| artefacto `RETIRE`                                   | restaurar último blob/export conocido y repetir build/pruebas                          |
| CI/script                                            | restaurar workflow/script y archivos objetivo al commit previo                         |
| bootstrap/scaffold                                   | conservar bootstrap/template legacy controlados hasta certificar el scaffold sustituto |

El rollback es por repositorio; ninguna aplicación queda obligada a revertir junto con otra.

---

#### 16. Delta y compatibilidad desde `SHELL-AUD-011`

1. VISO, NEXO, FOGO, ORIGO, PULSO y NUMERA permanecen exactamente en los commits auditados.
2. `vento-shell` avanzó en documentación, políticas, validadores y CI del plan; no se detectó delta runtime en `src/` ni `middleware.ts` respecto del corte de `SHELL-AUD-011`.
3. La arista workflow/script temporal de NEXO se materializa ahora como consumidor `CI/SCRIPT`; no es un cambio físico posterior al audit, sino una dependencia que debía quedar explícita para cumplir la puerta de `MIG-001`.
4. El workflow PULSO que menciona `predev/prebuild` está deshabilitado y el `package.json` actual no declara esos scripts; no se inventa un consumidor inexistente.
5. No se confirmó adopción runtime de `@vento/contracts`, `@vento/os-context`, `@vento/supabase` o `@vento/ui-web` en ninguno de los siete repositorios.
6. Cualquier cambio de HEAD antes de ejecutar un lote obliga a regenerar la fila afectada antes de modificar código.

---

#### 17. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `SHELL-MIG-001` materializa el inventario exigido por requisitos vigentes de clasificación, paquete de cambio, compatibilidad, rollback y evidencia —incluidos `TREQ-SHELL-002`, `TREQ-SHELL-004`, `TREQ-SHELL-005`, `TREQ-SHELL-006`, `TREQ-SHELL-007`, `TREQ-SHELL-008`, `TREQ-SHELL-009`, `TREQ-SHELL-029` y `TREQ-SHELL-032`— sin introducir comportamiento ejecutable ni una obligación verificable nueva independiente.

| Operación sobre `TREQ-*` | Cantidad |
| ------------------------ | -------: |
| creados                  |    **0** |
| modificados              |    **0** |
| diferidos                |    **0** |
| descartados              |    **0** |
| obsoletos                |    **0** |

---

#### 18. Evidencia de validación

| Clase     | Estado           | Evidencia                                                                                                                                                                             |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | `NOT_EXECUTED`   | tarea documental; no se modificó código ni se ejecutó build de consumidores                                                                                                           |
| LOCAL     | `PASS`           | matriz generada y conciliada por conteo; 128 ocurrencias, 11 directos, 3 CI/script/manual y 11 candidatos de retiro sin duplicar la semántica de sus filas                            |
| REMOTA    | `PASS`           | fuentes canónicas, HEAD de los siete repositorios, workflow de NEXO, workflow de VISO, workflow de PULSO y bootstrap SHELL verificados mediante GitHub                                |
| OPERATIVA | `NOT_APPLICABLE` | no se ejecutaron autenticación, rutas, migraciones, despliegues ni procesos de negocio                                                                                                |
| FÍSICA    | `PASS`           | seis consumidores externos conservan el commit auditado; SHELL no presenta delta runtime desde `SHELL-AUD-011`; los artefactos CI/script clasificados existen en los paths declarados |

---

#### 19. Criterios de aceptación

`SHELL-MIG-001` queda materialmente completa porque:

- los siete repositorios tienen commit vigente y resultado de conciliación;
- las 128 ocurrencias runtime heredadas tienen disposición, frontera objetivo, propietario, lote base, evidencia y rollback;
- los once consumidores directos de permisos fuera de familias auth están separados y direccionados;
- el workflow y script temporales de NEXO quedan inventariados como consumidores `CI/SCRIPT` del legacy contextual;
- el bootstrap SHELL queda inventariado como consumidor `SCRIPT/MANUAL` de la plantilla histórica;
- los once archivos sin consumidor confirmado están separados del legacy consumido y solo pueden retirarse bajo el gate de `SHELL-AUD-011`;
- `PageHeader` VISO, SSO NEXO/PULSO y `employee-sites` ORIGO permanecen protegidos como legacy consumido;
- los miembros internos y placeholders heredados tienen propietario y lote base exactos;
- no se confirmó ningún consumidor dinámico y la búsqueda dinámica permanece obligatoria antes de cualquier retiro;
- CI de los siete repositorios fue reconciliado sin convertir workflows ajenos en consumidores ficticios;
- ninguna fila usa un destino genérico como “migrar después” o “equipo correspondiente”;
- no se inventa un orden entre repositorios ni lotes numéricos antes de `SHELL-MIG-002`;
- el inventario queda explícitamente clasificado como `DEFINE_ONCE` y distingue el localizador `repositorio / tarea` de las futuras instancias por `package_id`;
- no se modifica código, packages, CI, Supabase, despliegues ni continuidad;
- se declaran cero cambios `TREQ-*`;
- `SHELL-MIG-002` permanece como única continuidad inmediata reservada.

---

#### 20. Límites y fuera de alcance

Esta tarea no:

- define el orden reversible entre repositorios;
- crea lotes numerados o una secuencia de despliegue;
- instala paquetes `@vento/*`;
- crea o modifica `package.json` de consumidores;
- modifica imports, exports, aliases, CSS, guards, middleware, scripts o workflows;
- retira artefactos;
- crea el scaffold sustituto;
- ejecuta builds, pruebas operativas o despliegues;
- modifica Supabase, SQL, RLS, RPC, datos o secretos;
- cambia requisitos `TREQ-*`;
- adelanta `SHELL-MIG-002..008`, `SHELL-AUTH-*` o `SHELL-CTX-*`.

---

#### 21. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-UI-020 — Compartir patrón de traspaso entre aplicaciones`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-001 — Consolidar inventario ejecutable de consumidores`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-002 — Definir lotes reversibles por repositorio`


### ✅ SHELL-MIG-002 — Definir lotes reversibles por repositorio

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-001 — Consolidar inventario ejecutable de consumidores
**Tarea siguiente:** SHELL-MIG-003 — Preparar compatibilidad y bloqueo de nuevos consumidores legacy
**Tipo de tarea:** documental; definición vinculante de lotes reversibles por repositorio, orden de adopción, precondiciones, cambios, consumidores, pruebas, observabilidad, rollback y criterios de suspensión, sin ejecutar migraciones ni modificar consumidores
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** ESPECIFICADO; 22 lotes base reversibles definidos; 0 migraciones ejecutadas; 0 adopciones de packages ejecutadas; 0 retiros ejecutados
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-002` transforma los `Lote base` ya asignados por `SHELL-MIG-001` en unidades de cambio reversibles y ordenadas por repositorio.

La tarea no vuelve a clasificar consumidores ni mueve identidades entre propietarios. Su función es fijar, para cada lote ya identificado:

- precondiciones de entrada;
- alcance exacto del cambio;
- consumidores alcanzados;
- pruebas obligatorias;
- observabilidad mínima;
- snapshot de rollback;
- criterio de suspensión;
- relación con las tareas propietarias que materializarán el cambio.

La regla raíz queda:

```text
una identidad de SHELL-MIG-001
→ conserva su Lote base
→ entra en un solo cambio atribuible
→ se valida sobre un commit consumidor exacto
→ se observa de forma independiente
→ puede revertirse sin desplegar simultáneamente los otros consumidores
```

No existe una oleada que obligue a actualizar conjuntamente SHELL, VISO, NEXO, FOGO, ORIGO, PULSO y NUMERA.

---

#### 2. Resultado material

Quedan definidos **22 lotes base reversibles**:

| Propietario de ejecución | Lotes por repositorio                         | Cantidad |
| ------------------------ | --------------------------------------------- | -------: |
| `SHELL-MIG-003`          | NEXO                                          |    **1** |
| `SHELL-MIG-004`          | SHELL                                         |    **1** |
| `SHELL-MIG-005`          | SHELL, NUMERA, FOGO, ORIGO, VISO, PULSO, NEXO |    **7** |
| `SHELL-MIG-008`          | NUMERA, FOGO, ORIGO, VISO, PULSO, NEXO        |    **6** |
| `SHELL-AUTH-005`         | SHELL, NUMERA, FOGO, ORIGO, VISO, PULSO, NEXO |    **7** |
| **Total**                |                                               |   **22** |

La distribución no crea un identificador paralelo para los **lotes base de repositorio**. Su localizador documental sigue siendo exactamente la clave:

```text
repositorio consumidor / tarea propietaria
```

Esa clave no sustituye la identidad canónica de las ejecuciones posteriores. `SHELL-MIG-001` y `SHELL-MIG-002` son `DEFINE_ONCE`; en cambio, `SHELL-MIG-003..008` son `TEMPLATE_PER_PACKAGE`. Por ello, cuando llegue la fase física, cada `package_id` utilizará la instancia `SHELL-MIG-003::<package_id>` a `SHELL-MIG-008::<package_id>` que corresponda, y cada instancia seleccionará los lotes base y consumidores incluidos en el alcance aprobado de ese mismo paquete.

Las **142 filas ejecutables** de `SHELL-MIG-001` conservan sin cambios su `Lote base`. Esta tarea añade el contrato de ejecución a las 22 claves distintas resultantes; las instancias `::<package_id>` no se cuentan dentro de esas 22 claves porque se crean posteriormente a partir del paquete aprobado.

Los elementos internos de AppSwitcher y `GuardOptions.requireAppAccessPermission = false` conservan los lotes `SHELL-MIG-008` ya asignados. Las dos entradas de navegación SHELL cuyo propietario es `SHELL-APP-021` permanecen fuera de estos 22 lotes porque no pertenecen a una fila física del inventario ejecutable ni al mini-bloque de migración compartida.

---

#### 3. Fuentes, dependencias y corte verificable

##### 3.1. Dependencias vinculantes

| Fuente           | Decisión heredada                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `SHELL-MIG-001`  | 142 filas ejecutables, `Lote base` exacto por consumidor, 11 candidatos físicos sin consumidor y separación entre legacy consumido e inerte |
| `SHELL-PKG-004`  | compatibilidad atribuible a package, versión, consumidor, commit, manifest, lockfile, toolchain, ambiente y evidencia exactos               |
| `SHELL-PKG-006`  | rollback por snapshot de aplicación, independiente de los demás consumidores y sin inferir rollback de datos o Supabase                     |
| `SHELL-PKG-008`  | dieciséis gates fail-closed, evidencia vigente por commit y prohibición de auto-merge, auto-deploy y bypass                                 |
| `TREQ-SHELL-004` | retiro únicamente con búsqueda reproducible de consumidores y validaciones aplicables                                                       |
| `TREQ-SHELL-005` | comandos reproducibles para instalación, lint, typecheck, build o export y pruebas                                                          |
| `TREQ-SHELL-006` | pruebas propias y compatibilidad por consumidor sin despliegue simultáneo obligatorio                                                       |
| `TREQ-SHELL-007` | rollback independiente probado antes de release o cutover                                                                                   |
| `TREQ-SHELL-008` | declaración de requisitos y resultados reproducibles por package y cambio                                                                   |
| `TREQ-SHELL-009` | identidad verificable de repositorio, commit, ambiente y superficie                                                                         |
| `TREQ-SHELL-038` | migración y deprecación con inventario y evidencia atribuible                                                                               |
| `TREQ-SHELL-039` | retiro bloqueado hasta resolver consumidores, pruebas, compatibilidad y rollback                                                            |

##### 3.2. Corte remoto de los consumidores

| Repositorio                  | Commit de `main` verificado para esta tarea | Relación con el corte de `SHELL-MIG-001`                                                                                     |
| ---------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `devVentoGroup/vento-shell`  | `c5d53c7b6c643ed655bf4dfa6946794150a965d7`  | avanzó únicamente para incorporar documentalmente `SHELL-MIG-001`; el parent es el corte inspeccionado por la tarea anterior |
| `devVentoGroup/vento-viso`   | `47322403f3c64e83ae0c4a2f68c05d47093e5bb4`  | sin cambio                                                                                                                   |
| `devVentoGroup/vento-nexo`   | `142c4d696221e3ce3fda4ed3b62f3d1fe5b58799`  | sin cambio                                                                                                                   |
| `devVentoGroup/vento-fogo`   | `b6b9ed00e5267cabaac1a5a1090d93d5f60e86f2`  | sin cambio                                                                                                                   |
| `devVentoGroup/vento-origo`  | `b7a8303fa078ef087f522b6c99059ababfc27472`  | sin cambio                                                                                                                   |
| `devVentoGroup/vento-pulso`  | `71e0184486b5fe11e0a42435baf4024807a80efd`  | sin cambio                                                                                                                   |
| `devVentoGroup/vento-numera` | `1b48a5da425d92e19ed89cf175b1dccc4cd960e1`  | sin cambio                                                                                                                   |

No existe un delta de consumidor que obligue a invalidar el inventario aprobado.

##### 3.3. Estado técnico que bloquea ejecución física

En el corte actual:

- no existe una release estable adoptada de `@vento/contracts`, `@vento/os-context`, `@vento/supabase` o `@vento/ui-web`;
- las 28 relaciones package–consumidor de `SHELL-PKG-004` permanecen pendientes de evidencia;
- no existe un snapshot anterior de package compartido certificado que permita declarar una adopción `ROLLBACK_READY`;
- los siete `package.json` inspeccionados declaran `build` y `lint`, pero ninguno declara un script `typecheck` ni un script `test`;
- la fase canónica vigente es exclusivamente documental y prohíbe migraciones, cambios de código y modificaciones de Supabase.

Por tanto, los 22 lotes quedan **ESPECIFICADOS** y **NO EJECUTABLES EN ESTE CORTE**. Esto no impide cerrar documentalmente `SHELL-MIG-002`; impide presentar una definición como migración ya realizada.

---

#### 4. Invariantes de un lote reversible

Todo lote materializado por esta tarea conserva estas reglas:

1. Un lote afecta un solo repositorio consumidor.
2. Un lote no obliga a desplegar ningún otro consumidor.
3. Todo cambio de package usa versión exacta y conserva manifest y lockfile como unidad.
4. El commit base y el commit de propuesta forman parte de la evidencia.
5. Un cambio posterior al commit evaluado invalida pruebas y aprobaciones técnicas aplicables.
6. Todo package compartido aplicable debe tener release identificable, integridad y compatibilidad para el consumidor exacto.
7. Todo lote conserva un snapshot previo certificado antes de cualquier cutover.
8. El rollback se ejecuta por historia auditable del consumidor y no modificando manualmente dependencias instaladas.
9. Un rollback de package no revierte por inferencia datos, schema, migraciones, configuración remota, cachés ni secretos.
10. Todo impacto Supabase que requiera materialización se resuelve exclusivamente desde `vento-shell` y mediante su tarea propietaria.
11. Los candidatos inertes no se mezclan en el mismo cambio con una migración funcional.
12. Un archivo consumido no puede pasar al lote de retiro porque su sustituto esté planificado.
13. La aparición de un consumidor nuevo invalida la elegibilidad de retiro.
14. Una regresión de autorización, contexto, sesión o denegación cerrada detiene la expansión de la oleada.
15. Un lote fallido no produce despliegue compensatorio automático en los otros repositorios.
16. Cualquier dependencia simultánea entre dos consumidores que no haya sido demostrada como compatible bloquea el lote y exige resolver la dependencia antes de continuar.

---

#### 5. Orden canónico entre tareas y oleadas

##### 5.1. Secuencia documental de los marcadores globales

La continuidad documental entre propietarios no se altera:

```text
SHELL-MIG-003
→ SHELL-MIG-004
→ SHELL-MIG-005
→ SHELL-MIG-006
→ SHELL-MIG-007
→ SHELL-MIG-008
→ continuidad posterior del BLOQUE H
→ SHELL-AUTH-005 cuando alcance su turno canónico
```

Esta cadena desarrolla y aprueba **una sola vez** los contratos globales. Aprobar los marcadores no ejecuta sus instancias físicas.

##### 5.2. Ejecución posterior por `package_id`

Para `SHELL-MIG-003..008`, la modalidad canónica es `TEMPLATE_PER_PACKAGE`.

Una ejecución física futura solo puede ocurrir:

1. después de los habilitadores `SHELL-CI-001..019`;
2. después del `DELIV-PKG` correspondiente al paquete;
3. después de `E5-GATE-008::<package_id>`;
4. articulada con el ciclo `SHELL-CI-020..024::<package_id>`;
5. mediante una única instancia de cada plantilla aplicable, sin reabrir el marcador global; `SHELL-MIG-003::<package_id>` a `SHELL-MIG-007::<package_id>` producen evidencia durante el ciclo y `SHELL-MIG-008::<package_id>` certifica los retiros después de `SHELL-CI-024::<package_id>`.

Cada instancia selecciona la intersección entre el alcance aprobado del `package_id` y los lotes base de repositorio definidos en esta tarea. Si un mismo paquete alcanza varios repositorios, la instancia agrega esos sublotes pero conserva commit, pruebas, evidencia y rollback separados por consumidor. Si la intersección de una plantilla es vacía, la no aplicabilidad debe quedar demostrada; nunca se usa `NOT_APPLICABLE` para omitir un consumidor realmente afectado.

`SHELL-MIG-006` y `SHELL-MIG-007` no crean lotes base de cambio nuevos: son puertas de accesibilidad, paridad y evidencia para los consumidores alcanzados por la instancia de `SHELL-MIG-005::<package_id>` u otras superficies UI incluidas expresamente en el mismo paquete.

`SHELL-AUTH-005` ya es propietario de las filas de autorización, contexto y acceso compartido que `SHELL-MIG-001` le asignó. `SHELL-MIG-002` define esos siete lotes ahora, pero no adelanta ni desarrolla `SHELL-AUTH-005`.

---

#### 6. Orden serial de repositorios

Cuando una tarea propietaria deba materializar el mismo tipo de adopción en más de un repositorio, se utiliza esta secuencia:

**Secuencia:** SHELL → NUMERA → FOGO → ORIGO → VISO → PULSO → NEXO.

| Orden | Repositorio                  | Base verificable del orden                                                                                                          |
| ----: | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **1** | `devVentoGroup/vento-shell`  | repositorio productor de la fundación y menor superficie runtime del inventario: 5 familias, 1 consumidor directo y 1 script/manual |
| **2** | `devVentoGroup/vento-numera` | menor superficie externa: 19 familias, 0 consumidores directos de autorización y 0 consumidores CI/script                           |
| **3** | `devVentoGroup/vento-fogo`   | 20 familias, 0 consumidores directos de autorización y 0 consumidores CI/script                                                     |
| **4** | `devVentoGroup/vento-origo`  | 20 familias y 4 consumidores directos de autorización                                                                               |
| **5** | `devVentoGroup/vento-viso`   | 21 familias y 4 consumidores directos de autorización                                                                               |
| **6** | `devVentoGroup/vento-pulso`  | 20 familias, 2 consumidores directos y excepciones heredadas de cliente Supabase alterno y rama de guard                            |
| **7** | `devVentoGroup/vento-nexo`   | 23 familias, 2 consumidores CI/script y excepción local de contexto operativo                                                       |

Reglas de aplicación:

- el orden solo se usa entre repositorios alcanzados por la misma tarea propietaria;
- un repositorio no aplicable se omite sin alterar la identidad de los demás lotes;
- no se inician dos despliegues de consumidor en paralelo;
- el siguiente consumidor no avanza mientras el anterior permanezca en observación, rollback o investigación de un gate;
- SHELL sirve como verificación del productor y su superficie local; NUMERA es el primer piloto externo completo cuando el lote aplique;
- NEXO queda al final de las oleadas multi-repositorio por sus consumidores CI/script y su extensión local adicional, no por una prioridad empresarial.

---

#### 7. Contrato común de entrada y cierre

Cada una de las 22 instancias de lote hereda obligatoriamente estas precondiciones antes de cualquier cambio físico:

1. tarea propietaria del lote aprobada y en fase autorizada para materialización;
2. commit base del consumidor revalidado contra el inventario de `SHELL-MIG-001`;
3. cero delta no clasificado en los archivos consumidores del lote;
4. release exacta del package objetivo disponible cuando el lote migra a package compartido;
5. identidad, integridad y procedencia de la release verificadas;
6. relación package–consumidor evaluable en la matriz de compatibilidad;
7. manifest y lockfile base conservados;
8. instalación reproducible disponible;
9. lint, typecheck, build o export y pruebas automatizadas aplicables ejecutables;
10. perfil especializado de `SHELL-PKG-008` aplicable definido;
11. requisitos `TREQ-*` afectados declarados;
12. snapshot previo certificado y restaurable;
13. impacto de datos, configuración, caché y Supabase explícitamente clasificado;
14. revisores y autoridad de despliegue del consumidor identificados;
15. cero cambios ajenos mezclados en el mismo lote.

Un lote solo puede considerarse cerrado cuando:

- todos los gates universales aplicables están en `PASS`;
- el gate de riesgo está en `PASS` o en no aplicabilidad justificada;
- la evidencia corresponde al commit, manifest, lockfile y versiones exactas;
- las pruebas específicas del lote son correctas;
- la observación posterior al despliegue no presenta regresión bloqueante;
- el rollback sigue siendo reproducible;
- no existe un consumidor legacy nuevo o no clasificado;
- el resultado queda atribuible al repositorio y lote exactos.

---

#### 8. Lote de compatibilidad CI/script de NEXO

| Campo                                  | Decisión materializada                                                                                                                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lote base**                          | `devVentoGroup/vento-nexo / SHELL-MIG-003`                                                                                                                                                                |
| **Consumidores**                       | `.github/workflows/tmp-apply-privileged-request-area.yml`; `scripts/tmp-apply-privileged-request-area.mjs`                                                                                                |
| **Precondiciones específicas**         | commit NEXO revalidado; forma contractual objetivo de autorización/contexto aprobada; targets del patch identificados; gate contra nuevo consumo legacy disponible                                        |
| **Cambios permitidos**                 | adaptar o retirar únicamente la dependencia del workflow/script respecto de la forma legacy; impedir que vuelva a crear consumidores legacy; conservar el comportamiento empresarial de los targets       |
| **Pruebas**                            | gates `PKG-GATE-003..014` aplicables; ejecución reproducible del patch; build y validación de targets; evidencia de que el script no introduce una forma legacy nueva                                     |
| **Observabilidad**                     | resultado del workflow, identidad del commit, archivos objetivo modificados, errores del patch y build atribuibles al mismo intento                                                                       |
| **Rollback**                           | restaurar workflow, script y targets al snapshot NEXO previo certificado; no tocar otros consumidores                                                                                                     |
| **Suspensión**                         | target no coincide, patch deja de ser determinista, build falla, aparece ampliación de autoridad, el workflow intenta modificar una forma contractual no aprobada o el snapshot previo deja de ser seguro |
| **Estado al corte de `SHELL-MIG-002`** | ESPECIFICADO; BLOQUEADO PARA EJECUCIÓN por fase documental y por no estar desarrollada/aprobada `SHELL-MIG-003`                                                                                           |

---

#### 9. Lote de scaffold de SHELL

| Campo                                  | Decisión materializada                                                                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lote base**                          | `devVentoGroup/vento-shell / SHELL-MIG-004`                                                                                                                                                                   |
| **Consumidor**                         | `tools/bootstrap-app-shell.ps1` y la plantilla histórica `templates/app-shell-standard` como fuente de scaffold                                                                                               |
| **Precondiciones específicas**         | contratos, packages y AppShell requeridos aprobados; versiones exactas disponibles; procedencia del scaffold definida; bootstrap legacy conservado como recuperación controlada hasta certificar el sustituto |
| **Cambios permitidos**                 | reemplazar la copia de implementación runtime por un scaffold versionado que instale o genere únicamente dependencias y configuración aprobadas                                                               |
| **Pruebas**                            | generación reproducible; identidad de versiones; ausencia de fuente runtime duplicada; build de un consumidor de prueba autorizado; comparación de configuración y archivos generados                         |
| **Observabilidad**                     | versión del scaffold, versions de packages resueltas, commit fuente, conjunto de archivos generados y diferencias respecto del baseline                                                                       |
| **Rollback**                           | restaurar bootstrap y plantilla legacy controlados al snapshot previo certificado sin presentar esa restauración como distribución canónica                                                                   |
| **Suspensión**                         | el scaffold vuelve a copiar implementación runtime, usa versiones no fijadas, genera archivos fuera del contrato, no reproduce configuración o requiere package sin release/evidencia compatible              |
| **Estado al corte de `SHELL-MIG-002`** | ESPECIFICADO; BLOQUEADO PARA EJECUCIÓN por fase documental y por precondiciones de package/scaffold aún no materializadas                                                                                     |

---

#### 10. Lotes de adopción UI — `SHELL-MIG-005`

La membresía de cada fila es exacta: pertenecen al lote todas y solo las filas de `SHELL-MIG-001` cuyo `Lote base` coincide con la clave indicada.

| Orden de oleada | Lote base                                    | Consumidores                                       | Precondiciones específicas                                                                                                                            | Cambios permitidos                                                                                 | Pruebas y observabilidad                                                                                                    | Rollback                                                | Suspensión específica                                                                       |
| --------------: | -------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
|               1 | `devVentoGroup/vento-shell / SHELL-MIG-005`  | todas las filas UI de SHELL asignadas a esta clave | release canónica de `@vento/ui-web`; combinación compatible; snapshot SHELL previo certificado; `layout.tsx` y `globals.css` confirmados como locales | adoptar superficies aprobadas conservando composición y estilos locales propietarios               | perfil `GATE-PROFILE-UI-WEB`; render, navegación, CSS, accesibilidad e hidratación cuando aplique; commit y versión exactos | restaurar archivos locales y pin/configuración previa   | pérdida de layout, navegación, identidad visual, accesibilidad o dependencia no pública     |
|               2 | `devVentoGroup/vento-numera / SHELL-MIG-005` | todas las filas NUMERA asignadas a esta clave      | release UI elegible; combinación NUMERA compatible; extensiones locales inventariadas; snapshot previo certificado                                    | sustituir copias UI consumidas por APIs públicas aprobadas; conservar extensiones locales          | perfil UI, build, render, navegación, CSS, accesibilidad y regresión visual aplicable                                       | restaurar copias locales consumidas y versiones previas | cualquier diferencia funcional o visual no aprobada                                         |
|               3 | `devVentoGroup/vento-fogo / SHELL-MIG-005`   | todas las filas FOGO asignadas a esta clave        | release UI elegible; combinación FOGO compatible; candidatos inertes excluidos del cambio; snapshot previo certificado                                | adoptar UI compartida sin retirar candidatos inertes                                               | perfil UI y evidencia por commit FOGO                                                                                       | restaurar snapshot FOGO previo                          | consumidor oculto, paridad incompleta o gate no `PASS`                                      |
|               4 | `devVentoGroup/vento-origo / SHELL-MIG-005`  | todas las filas ORIGO asignadas a esta clave       | release UI elegible; combinación ORIGO compatible; extensiones empresariales identificadas; snapshot previo certificado                               | adopción UI conservando extensiones empresariales ORIGO locales                                    | perfil UI; navegación, render, CSS, accesibilidad y regresión aplicables                                                    | restaurar snapshot ORIGO previo                         | ruptura de extensión local o del contrato público                                           |
|               5 | `devVentoGroup/vento-viso / SHELL-MIG-005`   | todas las filas VISO asignadas a esta clave        | release UI elegible; combinación VISO compatible; composición de dominio identificada; snapshot previo certificado                                    | adopción UI preservando componentes y composición de dominio VISO                                  | perfil UI; build, render, rutas, CSS, accesibilidad y evidencia visual aplicable                                            | restaurar snapshot VISO previo                          | regresión visual/funcional, import interno o estilo global no declarado                     |
|               6 | `devVentoGroup/vento-pulso / SHELL-MIG-005`  | todas las filas PULSO asignadas a esta clave       | release UI elegible; combinación PULSO compatible; variante Supabase y rama de guard excluidas del lote; snapshot previo certificado                  | adopción UI sin mezclar retiro del cliente Supabase alterno ni cambios de autorización             | perfil UI; navegación, hidratación, CSS, accesibilidad y regresión                                                          | restaurar snapshot PULSO previo                         | mezcla de cambios de datos/auth, regresión UI o dependencia en artefacto reservado a retiro |
|               7 | `devVentoGroup/vento-nexo / SHELL-MIG-005`   | todas las filas NEXO asignadas a esta clave        | release UI elegible; combinación NEXO compatible; extensión local de contexto identificada; lote CI/script no mezclado; snapshot previo certificado   | adopción UI preservando composición empresarial y extensión local de contexto fuera del package UI | perfil UI; build, render, navegación, CSS, accesibilidad, regresión y trazabilidad de extensiones locales                   | restaurar snapshot NEXO previo                          | acoplamiento del package a NEXO, pérdida de extensión local o regresión de navegación       |

Para los siete lotes:

- `SHELL-MIG-006` debe demostrar accesibilidad, tema, movimiento reducido, densidad y responsive aplicables;
- `SHELL-MIG-007` debe demostrar paridad contractual y operativa atribuible;
- ningún retiro de copia consumida ocurre dentro de `SHELL-MIG-005` si la paridad y el rollback no están certificados.

---

#### 11. Lotes de retiro inerte — `SHELL-MIG-008`

Estos lotes están deliberadamente separados de la adopción funcional. La ausencia de sustituto solo es válida cuando se confirma **cero consumo**.

| Orden de oleada | Lote base                                    | Identidades candidatas                                                                                                                          | Precondiciones específicas                                                                                                | Pruebas y observabilidad                                                                             | Rollback                                                | Suspensión específica                                                                                |
| --------------: | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
|               1 | `devVentoGroup/vento-numera / SHELL-MIG-008` | `src/lib/auth/sso.ts`; `src/lib/supabase/employee-sites.ts`; miembros inertes de AppSwitcher ya clasificados                                    | revalidar cero consumo STATIC, DYNAMIC, FRAMEWORK, CI y SCRIPT; paridad UI previa cuando afecte miembros AppSwitcher      | búsquedas reproducibles, typecheck, lint, build, pruebas aplicables y ausencia de import/uso runtime | restaurar blobs y miembros desde snapshot NUMERA previo | aparece cualquier consumidor, falla build o el miembro conserva función observable                   |
|               2 | `devVentoGroup/vento-fogo / SHELL-MIG-008`   | `src/lib/auth/sso.ts`; `src/lib/supabase/employee-sites.ts`; miembros inertes de AppSwitcher                                                    | mismas precondiciones de cero consumo                                                                                     | mismas clases de evidencia sobre commit FOGO                                                         | restaurar snapshot FOGO previo                          | nuevo consumidor o regresión atribuible                                                              |
|               3 | `devVentoGroup/vento-origo / SHELL-MIG-008`  | `src/lib/auth/sso.ts`; miembros inertes de AppSwitcher                                                                                          | cero consumo y conservación del `employee-sites` consumido fuera del lote                                                 | búsqueda de consumo, build y pruebas; verificación explícita de que `employee-sites` no se retira    | restaurar snapshot ORIGO previo                         | el cambio toca `employee-sites` consumido o aparece consumidor del SSO                               |
|               4 | `devVentoGroup/vento-viso / SHELL-MIG-008`   | `src/lib/supabase/proxy.ts`; `src/lib/auth/sso.ts`; miembros inertes de AppSwitcher                                                             | cero consumo en cinco clases y UI migrada cuando el retiro interno dependa de ella                                        | búsqueda, build, typecheck, lint, pruebas y render aplicable                                         | restaurar snapshot VISO previo                          | consumo indirecto, fallo de build o regresión de AppSwitcher                                         |
|               5 | `devVentoGroup/vento-pulso / SHELL-MIG-008`  | `src/lib/supabase/proxy.ts`; `src/utils/supabase/client.ts`; `GuardOptions.requireAppAccessPermission = false`; miembros inertes de AppSwitcher | cero consumo de archivos y rama `false`; si la rama sigue consumida, no se retira y conserva propietario `SHELL-AUTH-005` | búsqueda de consumo, pruebas de guard, build, typecheck, lint y comportamiento de AppSwitcher        | restaurar archivos, rama y miembros previos             | cualquier consumo real, cambio de autoridad, dependencia de la variante Supabase o falta de rollback |
|               6 | `devVentoGroup/vento-nexo / SHELL-MIG-008`   | `src/lib/supabase/proxy.ts`; `src/components/vento/standard/page-header.tsx`; miembros inertes de AppSwitcher                                   | cero consumo en cinco clases; cierre previo de la migración/paridad UI aplicable                                          | búsquedas, build, typecheck, lint, pruebas, render y navegación aplicables                           | restaurar snapshot NEXO previo                          | aparece consumidor, la cabecera sigue siendo necesaria o se cruza con el patch CI/script pendiente   |

**Candidatos físicos conciliados:** 11 archivos.
**Archivos consumidos autorizados para retiro por simple pertenencia a este lote:** 0.

Un candidato que deje de cumplir cero consumo sale del conjunto ejecutable de retiro y vuelve a estado bloqueado; no se elimina para preservar el conteo.

---

#### 12. Lotes de autorización, contexto y acceso compartido — `SHELL-AUTH-005`

Estos siete lotes quedan definidos por `SHELL-MIG-002`, pero su materialización permanece reservada a `SHELL-AUTH-005` cuando alcance su turno canónico.

La membresía es exacta: pertenecen a cada lote todas y solo las filas de `SHELL-MIG-001` cuyo `Lote base` coincide con la clave indicada, incluidos los once consumidores directos de autorización.

| Orden de oleada | Lote base                                     | Consumidores                                                                             | Precondiciones específicas                                                                                                                                       | Cambio permitido                                                                                                     | Pruebas y observabilidad                                                                                                 | Rollback                                                       | Suspensión específica                                                                                                        |
| --------------: | --------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|               1 | `devVentoGroup/vento-shell / SHELL-AUTH-005`  | todas las filas SHELL de esta clave, incluido 1 consumidor directo del launcher          | `SHELL-AUTH-005` habilitada por continuidad; releases exactas elegibles; compatibilidad SHELL; snapshot previo certificado                                       | migrar factories Supabase y consumidor directo del launcher a contratos/SDK aprobados, preservando fronteras locales | perfiles `OS-CONTEXT`, `SUPABASE` y `CONTRACTS`; sesión, cookies, decisiones, razones y errores                          | restaurar helpers/factories/evaluadores locales y pins previos | ampliación de autoridad, error de sesión/cookies, incompatibilidad de schema o snapshot inseguro                             |
|               2 | `devVentoGroup/vento-numera / SHELL-AUTH-005` | todas las filas NUMERA de esta clave; 0 consumidores directos adicionales                | releases elegibles; compatibilidad NUMERA; middleware local preservado; snapshot previo certificado                                                              | migrar legacy consumido de autorización/contexto/datos; conservar middleware local                                   | perfiles aplicables, decisiones permitidas/denegadas, SSR, Supabase, build y evidencia                                   | snapshot NUMERA previo completo                                | diferencia de decisión, redirect, contexto o acceso a datos                                                                  |
|               3 | `devVentoGroup/vento-fogo / SHELL-AUTH-005`   | todas las filas FOGO de esta clave; 0 consumidores directos adicionales                  | releases elegibles; compatibilidad FOGO; retiros inertes previos no reintroducidos; snapshot previo certificado                                                  | migrar legacy consumido sin restaurar archivos retirados por cero consumo                                            | perfiles aplicables y paridad de autorización/datos                                                                      | snapshot FOGO previo                                           | fallback que amplíe autoridad o dependencia en legacy retirado                                                               |
|               4 | `devVentoGroup/vento-origo / SHELL-AUTH-005`  | todas las filas ORIGO de esta clave, incluidos 4 consumidores directos                   | releases elegibles; compatibilidad ORIGO; cuatro consumidores directos identificados; extensión empresarial local preservada; snapshot previo certificado        | migrar legacy y los cuatro consumidores directos; mantener extensión empresarial local                               | perfiles aplicables, cuatro consumidores directos, sesión/contexto/Supabase                                              | snapshot ORIGO previo                                          | cualquier consumidor directo queda fuera, decisión diverge o extensión local se pierde                                       |
|               5 | `devVentoGroup/vento-viso / SHELL-AUTH-005`   | todas las filas VISO de esta clave, incluidos 4 consumidores directos en rutas framework | releases elegibles; compatibilidad VISO; cuatro rutas/consumidores directos revalidados; snapshot previo certificado                                             | migrar legacy y cuatro consumidores directos de autorización, incluidas rutas framework                              | perfiles aplicables; rutas server protegidas; misma decisión y razones por actor/contexto                                | snapshot VISO previo                                           | ruta pierde autorización de servidor, aparece bypass o consumidor directo no migrado                                         |
|               6 | `devVentoGroup/vento-pulso / SHELL-AUTH-005`  | todas las filas PULSO de esta clave, incluidos 2 consumidores directos                   | releases elegibles; compatibilidad PULSO; excepciones de guard y cliente alterno clasificadas; snapshot previo certificado                                       | migrar legacy consumido y dos consumidores directos; resolver solo excepciones autorizadas por su propietario        | perfiles aplicables; guard, contexto, datos, dos consumidores directos y ausencia de cliente alterno no autorizado       | snapshot PULSO previo                                          | rama de guard amplía acceso, reaparece cliente alterno o se requiere cambio Supabase no materializado                        |
|               7 | `devVentoGroup/vento-nexo / SHELL-AUTH-005`   | todas las filas NEXO de esta clave; 0 consumidores directos adicionales                  | releases elegibles; compatibilidad NEXO; `operational-context` preservado como extensión local; lote CI/script cerrado o compatible; snapshot previo certificado | migrar legacy consumido preservando `operational-context` como extensión local explícita                             | perfiles aplicables; sesión/contexto, autorización, Supabase y compatibilidad con extensión local; CI/script conciliados | snapshot NEXO previo                                           | la extensión local queda absorbida indebidamente, el patch CI/script vuelve a depender de legacy o cambia autoridad efectiva |

Reglas adicionales:

- `middleware.ts` permanece local cuando así lo clasificó `SHELL-MIG-001`;
- `operational-context` de NEXO permanece local y consume la fundación en vez de convertirse automáticamente en API compartida;
- una actualización de `@vento/supabase` no autoriza cambios de schema, datos, RLS, RPC, Realtime, Storage, Edge Functions, secretos o configuración;
- cualquier cambio Supabase físico se materializa únicamente desde `vento-shell` mediante su tarea propietaria.

---

#### 13. Separación entre legacy consumido e inerte

La división es vinculante:

| Clase                                           | Tratamiento                                                                                                    |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `legacy consumido`                              | permanece hasta que su lote de migración tenga sustituto aprobado, compatibilidad, paridad, pruebas y rollback |
| `KEEP LOCAL`                                    | permanece en el repositorio y se adapta a la fundación compartida sin perder propiedad local                   |
| `GENERAR`                                       | se sustituye únicamente por artefacto determinista aprobado; no por copia manual                               |
| `sin consumidor confirmado`                     | puede entrar en `SHELL-MIG-008` únicamente después de revalidar cero consumo                                   |
| miembro interno inerte                          | puede retirarse solo si cero lecturas/consumidores y comportamiento equivalente están demostrados              |
| navegación SHELL propietaria de `SHELL-APP-021` | queda fuera de `SHELL-MIG-002`; conserva su propietario exacto                                                 |

No se permite convertir un `MIGRATE` en `RETIRE` para simplificar un lote.

---

#### 14. Pruebas obligatorias por clase de lote

Todos los lotes usan los gates de `SHELL-PKG-008` que correspondan. La siguiente tabla especializa la evidencia sin crear un sistema paralelo:

| Clase de lote            | Pruebas mínimas                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| compatibilidad CI/script | identidad del target, ejecución reproducible, no creación de nuevo legacy, build y validación de archivos objetivo                                                                    |
| scaffold                 | procedencia, versiones exactas, generación reproducible, ausencia de fuente runtime copiada, build del resultado autorizado                                                           |
| UI                       | package tests, lint/análisis estático, typecheck, build, pruebas automatizadas, compatibilidad, render, hidratación, navegación, CSS, accesibilidad y regresión visual cuando aplique |
| autorización/contexto    | package tests, lint, typecheck, build, integración, casos allow/deny, SSR/cookies/redirects, razones estructuradas y denegación cerrada                                               |
| Supabase SDK             | factories, tipos, wrappers, parámetros/resultados/errores, compatibilidad con schema/tipos y ausencia de bypass de RLS o privilegio                                                   |
| retiro                   | búsqueda STATIC/DYNAMIC/FRAMEWORK/CI/SCRIPT, typecheck, lint, build, pruebas aplicables y comprobación de cero comportamiento perdido                                                 |

Un resultado omitido, cancelado, vencido, intermitente, ligado a otro commit o no ejecutado no cierra el lote.

---

#### 15. Observabilidad obligatoria

La observabilidad de cada lote registra, como mínimo:

- repositorio y commit base;
- commit de propuesta o cambio;
- package y versión exacta cuando aplique;
- hash/identidad del manifest y lockfile;
- conjunto de packages resuelto;
- resultado individual de gates;
- evidencia de compatibilidad;
- eventos o errores de build/runtime relevantes al lote;
- resultado de smoke o prueba operativa aplicable;
- estado de rollback;
- inicio y final de la ventana de observación definida por el paquete de implementación propietario;
- causa y propietario de cualquier suspensión.

Por clase:

- UI observa render, navegación, hidratación, CSS, foco/accesibilidad y errores del cliente/servidor aplicables;
- autorización/contexto observa decisiones, razones, redirects, sesión y denegaciones sin registrar secretos ni datos sensibles;
- Supabase observa errores normalizados, contratos de cliente/RPC y compatibilidad de schema, sin convertir telemetría en autorización;
- retiro observa ausencia sostenida de referencias y fallos atribuibles a la eliminación;
- CI/script observa ejecución, targets y resultado completo del patch;
- scaffold observa procedencia, versiones y diff del resultado generado.

No se inventan umbrales numéricos globales. Los umbrales operativos pertenecen al paquete E5 o al proceso de despliegue propietario.

---

#### 16. Rollback de los lotes

Todo lote adopta el snapshot de aplicación definido por `SHELL-PKG-006`:

```text
commit consumidor
+ manifest
+ lockfile
+ versiones exactas de packages
+ configuración compatible identificada
+ artefacto desplegado
+ evidencia de compatibilidad
```

Reglas:

1. El snapshot previo debe existir y estar certificado antes del cutover.
2. El rollback restaura código, manifest y lockfile coherentes.
3. Los packages publicados no se mutan ni se sobrescriben.
4. Si varias familias `@vento/*` forman un conjunto cerrado de dependencias, retroceden juntas dentro del mismo consumidor.
5. Otro consumidor no se despliega ni retrocede por inferencia.
6. Datos y migraciones usan un plan propietario separado.
7. Si el schema, servicio o contrato vigente ya no acepta el snapshot previo, el rollback queda bloqueado y se exige corrección hacia adelante o transición coordinada.
8. Una versión previa con vulnerabilidad o bypass conocido no es objetivo válido.
9. Después de restaurar se repiten las validaciones aplicables antes de declarar el rollback cerrado.
10. Un fallo previo al despliegue se aborta o revierte; no se registra como rollback productivo.

---

#### 17. Criterios de suspensión y detención de expansión

Cualquier lote se suspende cuando ocurra al menos una de estas condiciones:

- un gate universal no está en `PASS`;
- evidencia `STALE`, incompleta, contradictoria o intermitente;
- cambia el commit base, manifest, lockfile, package, versión o matriz después de probar;
- aparece un consumidor no inventariado;
- se detecta import interno, copia manual o dependencia legacy nueva;
- una decisión de autorización se amplía o diverge;
- la denegación cerrada deja de cumplirse;
- una ruta, sesión, cookie, redirect, contrato, RPC, UI o comportamiento de dominio pierde paridad;
- un cambio requiere schema, datos o configuración Supabase no materializados desde `vento-shell`;
- el snapshot previo no es reproducible o seguro;
- el rollback falla;
- el lote mezcla cambios ajenos que impiden atribuir riesgo y evidencia;
- se descubre necesidad de despliegue simultáneo de dos consumidores no cubierta por compatibilidad aprobada;
- el consumidor anterior de la oleada sigue bajo observación o incidente.

Al suspender:

1. no avanza el siguiente repositorio de la misma oleada;
2. los consumidores no afectados permanecen en su snapshot actual;
3. se conserva toda evidencia fallida;
4. se ejecuta rollback solo si el snapshot previo sigue siendo seguro;
5. si el rollback no es viable, el lote queda bloqueado para corrección hacia adelante bajo su propietario exacto.

---

#### 18. Estado de preparación de los 22 lotes

| Condición                                                            | Estado actual                                       | Propietario de salida                                       |
| -------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| fase física autorizada                                               | no                                                  | continuidad canónica posterior; tarea propietaria aplicable |
| releases estables compartidas adoptables                             | no confirmadas                                      | `SHELL-CI-001..003` y propietarios de packages              |
| matriz ejecutada de compatibilidad                                   | 28 relaciones pendientes de evidencia               | `SHELL-CI-002`; `SHELL-CI-005`                              |
| gates ejecutables de actualización                                   | política definida; implementación posterior         | `SHELL-CI-001..006`                                         |
| scripts reproducibles `typecheck` y `test` declarados por consumidor | no declarados en los siete manifests inspeccionados | `SHELL-CI-016`; `SHELL-CI-018`; `SHELL-CI-019`              |
| snapshot previo de package compartido certificado                    | no existe adopción estable previa                   | `SHELL-CI-014`; `SHELL-CI-015`                              |
| bloqueo de nuevos consumidores legacy                                | reservado                                           | `SHELL-MIG-003`                                             |
| retiro de candidatos inertes                                         | no ejecutado                                        | `SHELL-MIG-008`                                             |
| adopción auth/context/data                                           | no ejecutada                                        | `SHELL-AUTH-005`                                            |

Todos los bloqueos tienen propietario y condición de salida. Ninguno modifica la definición documental de los lotes.

---

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Justificación:** `SHELL-MIG-002` no introduce una obligación verificable nueva. Materializa, por repositorio y lote, obligaciones vigentes ya registradas para retiro seguro, comandos reproducibles, compatibilidad por consumidor, rollback independiente, evidencia atribuible, deprecación y retiro. No altera su contenido, alcance, responsable, estado, relación ni evidencia.

| Operación sobre el registro de pruebas | Cantidad |
| -------------------------------------- | -------: |
| creados                                |    **0** |
| modificados                            |    **0** |
| diferidos                              |    **0** |
| descartados                            |    **0** |
| obsoletos                              |    **0** |

No se modifica ningún fragmento del registro canónico de requisitos de prueba.

---

#### 20. Evidencia de validación

| Clase       | Estado           | Evidencia de esta tarea                                                                                                                                                         |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BUILD`     | `NOT_EXECUTED`   | no se ejecutó build del repositorio ni de consumidores; la tarea es documental y no existe checkout integrado autorizado en esta entrega                                        |
| `LOCAL`     | `PASS`           | artefacto de tarea comprobado estructuralmente contra metadata, secciones obligatorias, continuidad, cardinalidad de 22 lotes y ausencia de instrucciones operativas de entrega |
| `REMOTA`    | `PASS`           | continuidad, propietario, dependencias, 04A, políticas, manifests y commits `main` de los siete repositorios fueron inspeccionados en GitHub                                    |
| `OPERATIVA` | `NOT_APPLICABLE` | no se ejecuta migración, despliegue, smoke productivo ni rollback durante la fase documental                                                                                    |
| `FÍSICA`    | `NOT_APPLICABLE` | la tarea es exclusivamente documental y no requiere validación de hardware, dispositivo ni intervención física                                                                  |

---

#### 21. Criterios de aceptación

`SHELL-MIG-002` queda materialmente completa cuando se cumple todo lo siguiente:

- conserva las 142 filas de `SHELL-MIG-001` y sus `Lote base`;
- define exactamente 22 claves de lote base distintas dentro del alcance compartido;
- distingue las 22 claves `repositorio / tarea` de las futuras instancias `SHELL-MIG-003::<package_id>` a `SHELL-MIG-008::<package_id>`;
- define que una instancia por paquete puede agregar varios sublotes de repositorio sin perder commit, evidencia ni rollback por consumidor;
- define un solo repositorio por lote;
- define orden de repositorios para toda tarea multi-consumidor;
- conserva `SHELL-MIG-003`, `004`, `005`, `008` y `SHELL-AUTH-005` como propietarios ya asignados;
- no adelanta el desarrollo de esos propietarios;
- separa los 11 archivos sin consumidor confirmado del legacy consumido;
- conserva fuera del catálogo MIG las dos entradas de navegación propietarias de `SHELL-APP-021`;
- declara precondiciones, cambios, consumidores, pruebas, observabilidad, rollback y suspensión para cada lote;
- exige manifest y lockfile coherentes;
- exige compatibilidad por combinación exacta;
- exige gates fail-closed;
- exige snapshot previo certificado;
- impide despliegue simultáneo obligatorio de consumidores;
- detiene expansión cuando un lote falla o sigue en observación;
- impide retirar un artefacto consumido por tratarlo como inerte;
- preserva extensiones locales válidas;
- separa `@vento/supabase` del estado físico de Supabase;
- identifica los bloqueos actuales y su tarea de salida;
- declara cero cambios `TREQ-*`;
- no ejecuta código, migraciones, despliegues, retiros, publicación de packages ni cambios Supabase.

---

#### 22. Límites y fuera de alcance

`SHELL-MIG-002` no:

- implementa adapters ni gates de nuevo legacy;
- sustituye físicamente la plantilla;
- modifica componentes, imports, manifests o lockfiles;
- publica packages, tags o releases;
- abre pull requests de consumidor;
- ejecuta pruebas de compatibilidad;
- ejecuta despliegues;
- retira archivos o miembros;
- modifica código de autorización, contexto o Supabase;
- crea migraciones o modifica datos;
- configura CI, secretos o protección de ramas;
- desarrolla `SHELL-MIG-003` ni ninguna tarea posterior;
- modifica `active-sequence.json`;
- modifica el registro `04A`.

Los umbrales operativos, ambientes concretos de despliegue y ventanas temporales pertenecen a los paquetes E5 y tareas de implementación propietarias; no se inventan en esta definición.

---

#### 23. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-001 — Consolidar inventario ejecutable de consumidores`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-002 — Definir lotes reversibles por repositorio`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-003 — Preparar compatibilidad y bloqueo de nuevos consumidores legacy`


### ✅ SHELL-MIG-003 — Preparar compatibilidad y bloqueo de nuevos consumidores legacy

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-002 — Definir lotes reversibles por repositorio
**Tarea siguiente:** SHELL-MIG-004 — Sustituir la plantilla histórica por scaffold versionado
**Tipo de tarea:** documental; definición global única de compatibilidad temporal, observabilidad de deprecación y gate fail-closed contra nuevos consumidores legacy, con ejecución posterior por paquete mediante `SHELL-MIG-003::<package_id>`, sin implementar adapters, packages, workflows ni migraciones físicas durante el marcador global
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** CONTRATO_GLOBAL_COMPATIBILIDAD_LEGACY_ESPECIFICADO; 1 lote base NEXO delimitado; 2 artefactos legacy reales congelados como baseline; 0 instancias `SHELL-MIG-003::<package_id>` ejecutadas; 0 adapters físicos; 0 gates físicos; 0 migraciones ejecutadas
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-003` convierte la compatibilidad temporal de legacy en una excepción controlada y no en una licencia para seguir copiando implementaciones antiguas.

La tarea toma el inventario ejecutable de `SHELL-MIG-001` y el lote reversible ya cerrado por `SHELL-MIG-002` y fija tres resultados inseparables:

1. compatibilidad temporal únicamente para consumidores legacy reales, inventariados y con propietario;
2. observabilidad de la deprecación o transición sin convertir archivos privados en superficies públicas ficticias;
3. un gate automático fail-closed que impida crear, ampliar o regenerar nuevos consumidores legacy.

La regla raíz es:

```text
legacy ya inventariado
→ puede conservarse temporalmente bajo frontera exacta
→ queda ligado a consumidor, commit, contrato objetivo, evidencia y rollback
→ no puede crecer
→ no puede convertirse en fuente de verdad
→ no puede crear nuevos consumidores
→ debe desaparecer cuando su lote propietario cierre la migración
```

La compatibilidad temporal no cambia autoridad, no introduce aliases implícitos y no habilita fallbacks permisivos.

La modalidad canónica de trabajo es `TEMPLATE_PER_PACKAGE`: este marcador define el contrato una sola vez. La ejecución posterior se realiza mediante `SHELL-MIG-003::<package_id>` dentro del ciclo del mismo paquete y nunca vuelve a aprobar ni reabrir esta tarea global.

---

#### 2. Resultado material

El único **lote base de repositorio** asignado a `SHELL-MIG-003` por `SHELL-MIG-002` es:

```text
devVentoGroup/vento-nexo / SHELL-MIG-003
```

Ese lote base no es una instancia física. La identidad de ejecución posterior será `SHELL-MIG-003::<package_id>` y seleccionará este lote únicamente cuando el alcance aprobado del paquete intersecte el workflow, el script, sus targets vigilados o la frontera legacy que esos artefactos pueden recrear.

El lote base contiene exactamente dos consumidores legacy confirmados:

| Repositorio                | Artefacto                                                 | Clase    | Estado heredado | Decisión de `SHELL-MIG-003`                                                                                                                     |
| -------------------------- | --------------------------------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `devVentoGroup/vento-nexo` | `.github/workflows/tmp-apply-privileged-request-area.yml` | `CI`     | `LEGACY_ACTIVO` | conservar únicamente como baseline transitorio exacto; cualquier expansión o recreación legacy bloquea                                          |
| `devVentoGroup/vento-nexo` | `scripts/tmp-apply-privileged-request-area.mjs`           | `SCRIPT` | `LEGACY_ACTIVO` | conservar únicamente como baseline transitorio exacto; adaptar o retirar solo cuando exista frontera canónica consumible y rollback certificado |

Conciliación:

| Métrica                                                       | Resultado |
| ------------------------------------------------------------- | --------: |
| repositorios con lote base `SHELL-MIG-003`                    |     **1** |
| instancias `SHELL-MIG-003::<package_id>` ejecutadas           |     **0** |
| consumidores legacy CI/script del lote                        |     **2** |
| consumidores legacy adicionales autorizados por esta tarea    |     **0** |
| adapters especulativos autorizados                            |     **0** |
| nuevas copias legacy permitidas                               |     **0** |
| releases estables de compatibilidad declaradas por esta tarea |     **0** |
| deprecaciones públicas iniciadas por esta tarea               |     **0** |
| cambios físicos ejecutados                                    |     **0** |

Los targets actuales `src/app/inventory/remissions/page.tsx` y `src/app/inventory/remissions/actions.ts` no se convierten en un lote nuevo de `SHELL-MIG-003`. Permanecen como superficies consumidoras vigiladas y su migración de autorización/contexto conserva la propiedad ya asignada a `SHELL-AUTH-005` y tareas propietarias relacionadas.

##### 2.1. Contrato de la instancia `SHELL-MIG-003::<package_id>`

Cada paquete que entre al ciclo de materialización evalúa esta plantilla con el mismo `package_id` aprobado por E5.

La instancia deberá registrar:

- `package_id` y referencia al `DELIV-PKG` aplicable;
- repositorio y commit base de cada consumidor alcanzado;
- commit candidato o conjunto exacto de archivos evaluados;
- intersección entre el alcance del paquete y el lote base NEXO;
- baseline legacy grandfathered aplicable;
- resultado del gate contra crecimiento legacy;
- evidencia de compatibilidad y de no ampliación de autoridad;
- snapshot y rollback del consumidor;
- vínculo con el ciclo `SHELL-CI-020..024::<package_id>`.

Reglas de agregación:

1. existe una sola instancia `SHELL-MIG-003::<package_id>` por paquete;
2. si la intersección con el lote NEXO es vacía, la instancia solo puede cerrar como `NOT_APPLICABLE` con evidencia reproducible de esa intersección vacía;
3. si el paquete toca cualquiera de los dos artefactos, sus targets o la frontera legacy que pueden regenerar, `NOT_APPLICABLE` queda prohibido;
4. un fallo del workflow, script, target o gate bloquea la instancia completa del paquete;
5. la evidencia de otro `package_id`, commit o baseline es `STALE`;
6. la instancia no crea otro adapter, lote por repositorio ni marcador global.

La instancia solo puede ejecutarse después de `SHELL-CI-001..019`, del `DELIV-PKG` del paquete y de `E5-GATE-008::<package_id>`, dentro del ciclo `SHELL-CI-020..024::<package_id>`.

---

#### 3. Fuentes, dependencias y corte verificable

##### 3.1. Dependencias vinculantes

| Fuente            | Decisión heredada                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `SHELL-MIG-001`   | inventario de 142 filas, clasificación de CI/script y lote base exacto para los dos artefactos NEXO                                   |
| `SHELL-MIG-002`   | 22 lotes reversibles, un único lote `SHELL-MIG-003`, suspensión y rollback por snapshot consumidor                                    |
| `SHELL-PKG-003`   | identidad inmutable de package, versión, tag, release, commit, artefacto y canal                                                      |
| `SHELL-PKG-005`   | deprecación separada de retiro, señales observables, ventana y prohibición de nuevas adopciones de líneas deprecadas                  |
| `SHELL-CON-003`   | `PermissionKey` canónica; aliases y permisos legacy fuera del conjunto activo; no nuevas asignaciones legacy                          |
| `SHELL-CON-004`   | ocho `BaseRoleCode`; oficios base legacy y conversiones silenciosas prohibidos                                                        |
| `SHELL-CON-005`   | doce `OperationalRoleCode`; `propietario_admin`, roles base y aliases/fallbacks fuera del catálogo operativo                          |
| `SHELL-CON-006`   | scopes contractuales separados de rol, permiso y contexto; entradas desconocidas fallan cerrado                                       |
| `SHELL-CON-007`   | tipos de contexto compartidos y separación de contexto, simulación y decisión                                                         |
| `SHELL-AUTH-001`  | `@vento/os-context` como único SDK compartido de contexto/autorización                                                                |
| `SHELL-AUTH-002`  | adapters canónicos de servidor, cliente y proyecciones seguras                                                                        |
| `SHELL-AUTH-004`  | implementación futura de lint, métricas y gates contra consumidores legacy                                                            |
| `SHELL-AUTH-005`  | migración posterior de consumidores de autorización en todos los repositorios                                                         |
| `04A_04_SHELL.md` | cobertura vigente de copias compartidas, CI reproducible, compatibilidad, rollback, releases, deprecación y contratos de autorización |

##### 3.2. Corte físico inspeccionado

| Superficie                  | Identidad verificada                                      | Resultado relevante                                                                             |
| --------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `devVentoGroup/vento-shell` | `2750dd5fc30cb951e51d0dab0405d72396584f91`                | continuidad documental ya actualizada hasta `SHELL-MIG-002`; `SHELL-MIG-003` es la tarea actual |
| `devVentoGroup/vento-nexo`  | `142c4d696221e3ce3fda4ed3b62f3d1fe5b58799`                | mismo corte runtime usado por `SHELL-MIG-001`; los dos artefactos CI/script siguen presentes    |
| workflow NEXO               | `.github/workflows/tmp-apply-privileged-request-area.yml` | parchea script y targets, ejecuta instalación/build y puede escribir sobre `preview`            |
| script NEXO                 | `scripts/tmp-apply-privileged-request-area.mjs`           | parchea `page.tsx` y `actions.ts` usando formas locales de rol, permiso, sesión y contexto      |
| target NEXO                 | `src/app/inventory/remissions/page.tsx`                   | consume helpers locales de guard, role override y sesión operacional                            |
| target NEXO                 | `src/app/inventory/remissions/actions.ts`                 | consume helpers locales de role override, operational session/context y cliente Supabase server |

La inspección confirma consumo real. Por ello el lote NEXO cumple la condición de entrada para compatibilidad temporal. No existe base para crear adapters equivalentes en otro repositorio desde esta tarea.

---

#### 4. Clasificación vinculante de consumo legacy

Para esta migración, una dependencia se trata como legacy cuando existe una decisión canónica propietaria que exige converger a una frontera compartida, generada o local explícitamente clasificada y el consumidor todavía depende de una forma anterior.

El gate deberá cubrir como mínimo estas clases ya aprobadas por `SHELL-MIG-001`:

| Clase       | Forma de consumo que debe detectar                                                                |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `STATIC`    | import, llamada, tipo, constante o referencia directa a una copia o helper legacy                 |
| `DYNAMIC`   | importación dinámica, registry, lookup o resolución indirecta que introduzca una forma legacy     |
| `FRAMEWORK` | layout, middleware, page o route que use una forma legacy aunque no tenga importadores explícitos |
| `CI`        | workflow que copie, modifique, regenere o valide código dependiente de una forma legacy           |
| `SCRIPT`    | script que copie, parchee, genere o reintroduzca una forma legacy                                 |
| `MANUAL`    | herramienta operativa que materialice código o configuración legacy                               |

También se considera nuevo consumo legacy:

- un archivo nuevo que introduce una identidad legacy;
- una nueva arista desde un archivo existente hacia una identidad legacy;
- una nueva referencia dentro de un consumidor grandfathered que amplía su superficie legacy;
- un generador, patch o workflow que escriba una nueva forma legacy en otro archivo;
- un alias, cast, fallback, concatenación o parser que convierta una identidad no canónica en autoridad actual;
- una copia de implementación que evita el package, contrato o adapter propietario ya aprobado;
- una forma no clasificable cuya seguridad o propiedad no pueda demostrarse.

Modificar un consumidor grandfathered no renueva su excepción. Solo puede mantenerla sin crecimiento, reducirla o sustituirla por una frontera canónica compatible.

---

#### 5. Contrato de compatibilidad temporal versionada

La compatibilidad temporal solo es admisible cuando todas estas condiciones se cumplen simultáneamente:

1. el consumidor existe en el inventario aprobado;
2. el repositorio y commit consumidor son verificables;
3. la identidad legacy exacta está clasificada y tiene propietario canónico;
4. el reemplazo contractual está identificado;
5. la compatibilidad no amplía permisos, roles, scopes, sedes, áreas, sesiones ni autoridad efectiva;
6. entradas desconocidas, deprecadas o fuera de catálogo fallan cerrado;
7. no se crea una segunda fuente editable de contratos;
8. la compatibilidad puede eliminarse sin obligar a migrar simultáneamente los demás repositorios;
9. existe rollback hacia un snapshot previo certificado;
10. la evidencia está ligada al commit, manifest, lockfile y versiones aplicables cuando existan packages publicados.

La identidad contractual aplicable al lote NEXO queda fijada así:

| Materia              | Versión o identidad contractual                     | Regla de compatibilidad                                                                                     |
| -------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| catálogo de permisos | `vento.authorization@1.0.0`                         | solo claves activas se convierten en `PermissionKey`; legacy/retiradas no adquieren autoridad actual        |
| roles base           | `vento.authorization.base-role-grants@1.1.0`        | ocho `BaseRoleCode`; oficios legacy no reciben alias automático                                             |
| roles operativos     | `vento.authorization.operational-role-grants@1.0.0` | doce `OperationalRoleCode`; `propietario_admin` y roles base no se convierten por fallback                  |
| SDK runtime objetivo | `@vento/os-context`                                 | no existe release estable confirmada; no puede declararse compatibilidad estable ni adopción física todavía |
| consumidor NEXO      | commit `142c4d696221e3ce3fda4ed3b62f3d1fe5b58799`   | baseline exacto para la excepción transitoria de los dos artefactos CI/script                               |

`@vento/os-context@0.1.0` no se eleva a release estable por esta tarea. Una futura compatibilidad distribuible deberá usar una versión publicada e inmutable conforme a `SHELL-PKG-003` y superar la matriz de compatibilidad antes de adopción.

---

#### 6. Aplicabilidad por repositorio

`SHELL-MIG-002` asignó un solo lote a esta tarea. La decisión por repositorio queda explícita:

| Repositorio                  | Lote base propio `SHELL-MIG-003` | Excepción temporal materializada | Decisión                                                                                                |
| ---------------------------- | -------------------------------- | -------------------------------: | ------------------------------------------------------------------------------------------------------- |
| `devVentoGroup/vento-shell`  | no                               |                                0 | no crear adapter desde esta tarea; cualquier legacy se conserva bajo su lote propietario                |
| `devVentoGroup/vento-numera` | no                               |                                0 | no crear adapter desde esta tarea; cualquier legacy se conserva bajo su lote propietario                |
| `devVentoGroup/vento-fogo`   | no                               |                                0 | no crear adapter desde esta tarea; cualquier legacy se conserva bajo su lote propietario                |
| `devVentoGroup/vento-origo`  | no                               |                                0 | no crear adapter desde esta tarea; cualquier legacy se conserva bajo su lote propietario                |
| `devVentoGroup/vento-viso`   | no                               |                                0 | no crear adapter desde esta tarea; cualquier legacy se conserva bajo su lote propietario                |
| `devVentoGroup/vento-pulso`  | no                               |                                0 | no crear adapter desde esta tarea; cualquier legacy se conserva bajo su lote propietario                |
| `devVentoGroup/vento-nexo`   | sí                               |                                2 | permitir exclusivamente la excepción transitoria inventariada del workflow y script; bloquear expansión |

Esta tabla no afirma ausencia de legacy runtime en los otros repositorios. Solo materializa la propiedad exacta de `SHELL-MIG-003`; los demás consumidores conservan los lotes ya asignados por `SHELL-MIG-002`.

---

#### 7. Delimitación del lote NEXO

##### 7.1. Workflow temporal

`.github/workflows/tmp-apply-privileged-request-area.yml` permanece clasificado como consumidor `CI` porque modifica el script, ejecuta el patch, valida instalación/build y puede escribir el resultado sobre `preview`.

Su compatibilidad temporal no autoriza:

- introducir otra ruta, helper, rol, permiso o fallback legacy;
- modificar el catálogo canónico mediante patch;
- convertir strings locales en contratos compartidos;
- aceptar una forma legacy desconocida para evitar un error del patch;
- extender sus targets más allá del alcance aprobado sin reclasificación;
- considerar un build exitoso como prueba de paridad de autorización.

##### 7.2. Script temporal

`scripts/tmp-apply-privileged-request-area.mjs` permanece clasificado como consumidor `SCRIPT` porque modifica directamente `page.tsx` y `actions.ts`.

Las formas que el gate deberá reconocer en su baseline incluyen las dependencias locales actualmente usadas por el patch, entre ellas:

- role override local;
- operational session local;
- operational context local;
- evaluadores de permisos locales;
- consulta directa del rol de empleado usada por el patch;
- códigos textuales de rol base usados para decidir comportamiento;
- resolución local de área operacional asociada al flujo de remisiones.

La enumeración anterior describe el baseline que debe congelarse; no lo convierte en API permitida para nuevos consumidores.

##### 7.3. Targets vigilados

`src/app/inventory/remissions/page.tsx` y `src/app/inventory/remissions/actions.ts` se incluyen en el análisis de salida del gate porque el workflow/script puede modificarlos.

La tarea propietaria de su migración de autorización/contexto sigue siendo `SHELL-AUTH-005`. `SHELL-MIG-003` únicamente impide que el mecanismo temporal aumente la deuda legacy mientras esa migración no ha ocurrido.

---

#### 8. Deprecación y observabilidad

La observabilidad distingue dos objetos:

##### 8.1. Superficie pública estable

Si una compatibilidad temporal se incorpora posteriormente a una superficie pública estable de `@vento/contracts`, `@vento/os-context`, `@vento/supabase` o `@vento/ui-web`, deberá seguir `SHELL-PKG-005`:

- expediente `DEP-*` cuando exista deprecación real de una superficie estable;
- señal `@deprecated` cuando aplique;
- documentación pública;
- changelog;
- release notes;
- guía de migración;
- matriz de consumidores;
- evidencia de compatibilidad y rollback;
- ventana y retiro gobernados por la política de deprecación.

##### 8.2. Artefacto privado de migración

El workflow y el script NEXO son artefactos privados de migración, no APIs públicas estables. Por tanto:

- no se inventa un expediente `DEP-*` para ellos;
- su observabilidad proviene del inventario `SHELL-MIG-001`, el lote `SHELL-MIG-002`, la identidad de commit, el resultado del gate y la evidencia del patch/build;
- su estado legacy debe seguir visible hasta que se adapten o retiren;
- su retiro exige revalidar consumidores y rollback conforme a `SHELL-MIG-008`.

Un warning de runtime no es obligatorio ni suficiente. Si una tarea propietaria lo adopta posteriormente, deberá ser deduplicado, seguro, no sensible, atribuible y no modificar el control de autorización.

---

#### 9. Gate automático contra nuevos consumidores legacy

El gate queda especificado como una comparación fail-closed entre el baseline aprobado y el estado propuesto del consumidor.

##### 9.1. Entradas mínimas

El gate deberá recibir o resolver:

1. repositorio consumidor;
2. commit base;
3. commit de propuesta;
4. inventario legacy aprobado de `SHELL-MIG-001` y lotes de `SHELL-MIG-002`;
5. archivos cambiados;
6. contenido completo de los archivos legacy grandfathered afectados;
7. targets que un workflow, script o generador pueda escribir;
8. catálogo de identidades canónicas y legacy de las tareas propietarias;
9. manifest y lockfile cuando el cambio involucre packages;
10. versiones de contratos o packages objetivo;
11. declaración de requisitos `TREQ-*` afectados;
12. referencia de rollback.

##### 9.2. Regla de comparación

El resultado solo puede ser favorable cuando se cumplen simultáneamente:

```text
nuevas aristas legacy = 0
crecimiento del baseline grandfathered = 0
nuevos archivos legacy = 0
nuevos generators o patches legacy = 0
identidades sin clasificar = 0
fallbacks o aliases no autorizados = 0
bypasses de autoridad = 0
```

Además, cualquier modificación de una entrada material invalida la evidencia anterior y exige reejecución.

##### 9.3. Condiciones de fallo

El gate debe bloquear al menos cuando:

- aparece una referencia legacy fuera del baseline exacto;
- un consumidor grandfathered añade otra identidad legacy;
- un workflow o script empieza a parchear un target nuevo con una forma legacy;
- una copia local se presenta como sustituto de una frontera compartida aprobada;
- se agrega un alias o fallback no aprobado;
- se acepta un rol, permiso, scope, app code o razón desconocidos por cast o semejanza;
- se restaura una identidad retirada o deprecada como autoridad actual;
- la clasificación del hallazgo no es determinista;
- el baseline, commit o versión usados por la evidencia ya no coinciden con la propuesta;
- falta el propietario, condición de salida o rollback de una excepción temporal.

##### 9.4. Estados de resultado

El gate reutiliza la semántica fail-closed ya aprobada por `SHELL-PKG-008`:

| Estado           | Aplicación en `SHELL-MIG-003`                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`           | cero crecimiento legacy y todas las excepciones observadas coinciden con el baseline autorizado                                     |
| `FAIL`           | se detectó una nueva arista, copia, patch, alias, fallback o uso legacy no autorizado                                               |
| `BLOCKED`        | la clasificación o evidencia necesaria no puede resolverse de forma segura                                                          |
| `STALE`          | evidencia ligada a otro commit, baseline, manifest, lockfile o versión                                                              |
| `NOT_APPLICABLE` | solo para una comprobación condicional cuya no aplicabilidad esté demostrada; nunca sustituye la búsqueda universal de nuevo legacy |

Ausencia de resultado, omisión, cancelación o análisis parcial no equivalen a `PASS`.

---

#### 10. Propiedad de implementación del gate

La tarea actual define el contrato del gate; no lo implementa físicamente.

La materialización queda distribuida sin crear tareas nuevas:

| Materia                                                           | Propietario existente                               |
| ----------------------------------------------------------------- | --------------------------------------------------- |
| lint, métricas y gate contra legacy de autorización/contexto      | `SHELL-AUTH-004`                                    |
| adapters canónicos requeridos para sustituir legacy               | `SHELL-AUTH-002` y módulos `SHELL-CTX-*` aplicables |
| migración de consumidores auth/context                            | `SHELL-AUTH-005`                                    |
| gate universal de packages y evidencia de actualización           | `SHELL-PKG-008` y tareas CI propietarias aplicables |
| compatibilidad de datos/factories si un hallazgo futuro la activa | `SHELL-DB-*` correspondiente                        |
| compatibilidad UI si un hallazgo futuro la activa                 | `SHELL-UI-*` correspondiente                        |
| retiro final de copias legacy                                     | `SHELL-MIG-008`                                     |

En el lote NEXO actual no se autoriza una modificación de factories Supabase ni de contratos de UI compartida; por ello `SHELL-DB-*` y `SHELL-UI-*` no reciben un lote o cambio físico adicional desde esta tarea.

---

#### 11. Reglas de adapter y frontera temporal

Cuando una tarea propietaria materialice un adapter temporal, deberá cumplir:

1. estar ligado a consumidores reales enumerados;
2. existir en la frontera propietaria, no replicado por cada aplicación;
3. aceptar solo las formas legacy expresamente clasificadas;
4. traducir a una única identidad canónica cuando esa relación exista;
5. rechazar relaciones uno-a-muchos que requieran decisión de negocio no declarada;
6. no inferir permisos por rol, prefijo, ruta o similitud textual;
7. no convertir `propietario_admin` ni oficios legacy en roles canónicos por fallback;
8. no ampliar scope, territorio, sesión, dispositivo o contexto;
9. no usar el cliente como autoridad para rol, sede, área o permiso efectivo;
10. conservar razón estructurada de rechazo cuando el contrato propietario la defina;
11. conservar una condición de salida medible;
12. ser eliminable sin modificar el significado del contrato canónico.

La existencia del adapter no vuelve soportada la forma legacy para consumidores nuevos.

---

#### 12. Rollback y suspensión

El lote `devVentoGroup/vento-nexo / SHELL-MIG-003` conserva el rollback aprobado por `SHELL-MIG-002`:

```text
restaurar workflow, script y targets
→ al snapshot previo certificado de NEXO
→ sin reescribir historia
→ sin ampliar la superficie legacy
```

La adaptación o retiro debe suspenderse si ocurre cualquiera de estas condiciones:

- el target esperado no coincide con el commit inspeccionado;
- el patch deja de ser determinista;
- instalación, typecheck, pruebas o build aplicables fallan;
- la compatibilidad amplía autoridad;
- aparece una identidad legacy no clasificada;
- el cambio toca una forma contractual fuera del propietario aprobado;
- no existe snapshot previo seguro;
- el gate contra nuevo legacy no produce evidencia vigente;
- el rollback requeriría restaurar un bypass o una identidad expresamente retirada.

Una suspensión conserva abierto el lote; no autoriza a deshabilitar el gate.

---

#### 13. Decisiones vinculantes

1. `SHELL-MIG-003` conserva un único lote material: `devVentoGroup/vento-nexo / SHELL-MIG-003`.
2. El lote contiene exactamente dos consumidores legacy CI/script inventariados.
3. Ningún otro repositorio recibe un adapter por inferencia.
4. Compatibilidad temporal exige consumo real e inventariado.
5. Un consumidor grandfathered no puede crecer en superficie legacy.
6. Una nueva referencia legacy fuera del baseline queda bloqueada.
7. CI, scripts, generators, patches y entrypoints framework cuentan como consumidores.
8. Un mecanismo que escribe legacy en otro archivo cuenta como nueva arista aunque el archivo generador ya existiera.
9. Toda forma no clasificable falla cerrado.
10. `PermissionKey`, `BaseRoleCode`, `OperationalRoleCode`, scopes y contexto conservan sus fuentes contractuales propietarias.
11. Aliases y fallbacks no crean autoridad ni compatibilidad implícita.
12. La compatibilidad no amplía rol, permiso, territorio, sesión, dispositivo ni contexto.
13. El catálogo `vento.authorization@1.0.0` es la identidad de permisos aplicable al baseline NEXO.
14. `base-role-grants@1.1.0` y `operational-role-grants@1.0.0` son las identidades contractuales de rol aplicables.
15. `@vento/os-context@0.1.0` no se declara release estable ni objetivo de adopción certificada.
16. Una futura compatibilidad distribuible deberá tener versión publicada inmutable y matriz de compatibilidad.
17. Los dos artefactos NEXO privados no reciben expedientes `DEP-*` ficticios.
18. Una deprecación pública futura sí deberá cumplir íntegramente `SHELL-PKG-005`.
19. El gate automático reutiliza semántica fail-closed y no permite omisión como éxito.
20. `SHELL-AUTH-004` permanece propietario de materializar lint, métricas y gates auth/context.
21. `SHELL-AUTH-005` permanece propietario de migrar los targets consumidores.
22. `SHELL-MIG-008` permanece propietario del retiro final.
23. La tarea actual no modifica workflow, script, target, package, lockfile, CI, datos ni Supabase.
24. La tarea actual no publica tags, releases ni deprecaciones.
25. La tarea actual crea cero requisitos de prueba por cobertura canónica existente.
26. `SHELL-MIG-004` permanece como única tarea siguiente reservada.

---

#### 14. Hallazgos y destinos exactos

| Hallazgo                                                                                     | Estado                          | Destino o condición de salida                                                               |
| -------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| workflow NEXO puede modificar script y targets que usan formas auth/context legacy           | `LEGACY_ACTIVO`                 | gate especificado aquí; materialización en `SHELL-AUTH-004`; migración en `SHELL-AUTH-005`  |
| script NEXO parchea roles, permisos, sesión y contexto locales                               | `LEGACY_ACTIVO`                 | adapter o sustitución solo tras frontera canónica consumible; migración en `SHELL-AUTH-005` |
| targets NEXO siguen usando helpers locales de auth/context                                   | `LEGACY_ACTIVO`                 | lote `devVentoGroup/vento-nexo / SHELL-AUTH-005` ya definido por `SHELL-MIG-002`            |
| `@vento/os-context` no tiene release estable confirmada                                      | `NO_RELEASE_ESTABLE_CONFIRMADA` | publicación y compatibilidad según tareas propietarias antes de adopción física             |
| no existe gate físico confirmado que bloquee nuevos consumidores legacy                      | `PENDIENTE_DE_IMPLEMENTACION`   | `SHELL-AUTH-004` para auth/context y gates de package/CI aplicables                         |
| no existen deprecaciones públicas estables activas de los packages compartidos en este corte | `NO_APLICA_EN_LINEA_BASE`       | primer expediente real futuro bajo `SHELL-PKG-005`                                          |
| el lote base actual no requiere modificar factories Supabase                                 | `NO_APLICA`                     | conservar propiedad `SHELL-DB-*`; reabrir solo ante hallazgo material futuro                |
| el lote base actual no requiere modificar contrato UI compartido                             | `NO_APLICA`                     | conservar propiedad `SHELL-UI-*`; reabrir solo ante hallazgo material futuro                |

No queda un pendiente narrativo sin propietario o condición de salida.

---

#### 15. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `SHELL-MIG-003` materializa el mecanismo de enforcement de obligaciones ya registradas y no crea una regla de negocio o seguridad independiente. El fragmento canónico `04A_04_SHELL.md` ya protege la prohibición de copias compartidas divergentes, la clasificación y retiro seguro de consumidores, los comandos y gates reproducibles con bloqueo de merge, la compatibilidad por consumidor, el rollback independiente, la evidencia por package y PR, la identidad inmutable de release, el ciclo observable de deprecación, el bloqueo de retiro con consumo residual y los contratos específicos de roles, scopes y contexto. Esta tarea especializa esas obligaciones para el lote NEXO sin alterar su contenido ni estado.

| Operación sobre `TREQ-*` | Cantidad |
| ------------------------ | -------: |
| creados                  |    **0** |
| modificados              |    **0** |
| diferidos                |    **0** |
| descartados              |    **0** |
| obsoletos                |    **0** |

No corresponde modificar el registro 04A.

---

#### 16. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | La tarea es documental y no existe un checkout local completo de `vento-shell` en este entorno para ejecutar el build canónico del plan.                                                                 |
| LOCAL     | PASS           | El artefacto independiente fue comprobado estructuralmente contra cabecera obligatoria, secciones requeridas, continuidad, cinco clases de evidencia, conteo TREQ cero y ausencia de placeholders.       |
| REMOTA    | PASS           | Se verificaron en GitHub la continuidad actual, `SHELL-MIG-002`, `SHELL-PKG-003`, `SHELL-PKG-005`, contratos propietarios, 04A, commit NEXO y contenido actual del workflow, script y targets vigilados. |
| OPERATIVA | NOT_APPLICABLE | No se ejecuta el workflow, patch, migración ni prueba operativa durante la fase documental.                                                                                                              |
| FÍSICA    | NOT_APPLICABLE | No se materializa adapter, package, gate, cambio de consumidor, Supabase ni despliegue en esta tarea.                                                                                                    |

---

#### 17. Criterios de aceptación

`SHELL-MIG-003` queda materialmente completa porque:

- conserva exactamente el único lote base que `SHELL-MIG-002` asignó a esta tarea;
- distingue ese lote base de la futura identidad `SHELL-MIG-003::<package_id>`;
- define selección, no aplicabilidad, lineage, agregación, evidencia y rollback por `package_id` sin reabrir el marcador global;
- materializa exactamente dos consumidores CI/script NEXO y cero consumidores adicionales;
- distingue los artefactos del lote de los targets cuya migración pertenece a `SHELL-AUTH-005`;
- impide crear adapters por inferencia en repositorios sin lote base propio `SHELL-MIG-003`;
- fija las condiciones acumulativas que hacen admisible una compatibilidad temporal;
- liga la compatibilidad NEXO a contratos versionados y al commit consumidor exacto;
- impide declarar `@vento/os-context@0.1.0` como release estable;
- define qué constituye una nueva arista legacy en consumo estático, dinámico, framework, CI, script y manual;
- congela el baseline grandfathered y prohíbe su crecimiento;
- trata generators y patches que escriben legacy como consumidores efectivos;
- especifica entradas, comparación, condiciones de fallo y estados del gate automático;
- conserva comportamiento fail-closed ante formas no clasificables;
- separa deprecación pública estable de artefactos privados de migración;
- mantiene observables el workflow y script mediante inventario, commit, gate y evidencia sin inventar expedientes `DEP-*`;
- preserva rollback por snapshot de NEXO y criterios explícitos de suspensión;
- asigna la implementación física del gate a `SHELL-AUTH-004` sin adelantarla;
- conserva la migración de consumidores en `SHELL-AUTH-005` y el retiro en `SHELL-MIG-008`;
- declara cero cambios `TREQ-*` con cobertura existente explícita;
- no modifica código, workflows, scripts, packages, CI, datos, Supabase ni continuidad;
- deja `SHELL-MIG-004` únicamente reservada.

---

#### 18. Límites

Esta tarea no:

- crea adapters físicos;
- materializa `@vento/contracts`, `@vento/os-context`, `@vento/supabase` o `@vento/ui-web`;
- publica versions, tags, releases o artefactos npm;
- inicia una ventana real de deprecación;
- crea expedientes `DEP-*` para archivos privados;
- modifica el workflow o script temporal de NEXO;
- modifica `page.tsx`, `actions.ts` ni helpers de autorización/contexto;
- implementa el lint o gate físico reservado a `SHELL-AUTH-004`;
- migra consumidores reservados a `SHELL-AUTH-005`;
- retira copias legacy reservadas a `SHELL-MIG-008`;
- ejecuta workflows, patches, builds de consumidor, despliegues o validaciones operativas;
- cambia tablas, datos, RLS, RPC, funciones, triggers, Storage, Realtime, Edge Functions, tipos generados, secretos o configuración de Supabase;
- ejecuta una instancia `SHELL-MIG-003::<package_id>` durante el marcador global;
- cambia `active-sequence.json` ni desarrolla `SHELL-MIG-004`.

---

#### 19. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-002 — Definir lotes reversibles por repositorio`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-003 — Preparar compatibilidad y bloqueo de nuevos consumidores legacy`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-004 — Sustituir la plantilla histórica por scaffold versionado`


### ✅ SHELL-MIG-004 — Sustituir la plantilla histórica por scaffold versionado

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-003 — Preparar compatibilidad y bloqueo de nuevos consumidores legacy
**Tarea siguiente:** SHELL-MIG-005 — Migrar componentes, Chrome y estilos por aplicación
**Tipo de tarea:** documental; definición global única del scaffold versionado que sustituirá el mecanismo histórico de copia de AppShell, con ejecución posterior por paquete mediante `SHELL-MIG-004::<package_id>`, contrato de entradas, salidas, versiones exactas, configuración explícita, procedencia, reproducibilidad, rollback y gate de ejecución, sin crear todavía el scaffold físico ni modificar consumidores durante el marcador global
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** CONTRATO_GLOBAL_SCAFFOLD_ESPECIFICADO; 1 lote base productor reconciliado; 8 artefactos legacy reconciliados; 3 salidas locales permitidas; 5 copias runtime compartidas prohibidas; 0 instancias `SHELL-MIG-004::<package_id>` ejecutadas; 0 scaffold físico creado; 0 consumidores migrados
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-004` sustituye documentalmente el modelo histórico de distribución del AppShell basado en copiar archivos por un scaffold versionado, reproducible y trazable.

La tarea materializa el contrato completo que deberá cumplir el sustituto físico antes de poder usarse sobre un repositorio consumidor.

La regla raíz queda:

```text
FUENTE CANÓNICA VERSIONADA
+
RELEASES EXACTAS Y COMPATIBLES
+
CONFIGURACIÓN EXPLÍCITA DEL CONSUMIDOR
+
SCAFFOLD IDENTIFICABLE E INMUTABLE
→ DEPENDENCIAS INSTALADAS
→ ENTRYPOINTS Y COMPOSICIÓN LOCAL MÍNIMA
→ MANIFEST DE RESULTADO Y PROCEDENCIA
```

Y queda descartado como mecanismo futuro:

```text
TEMPLATE HISTÓRICO
→ COPIAR IMPLEMENTACIÓN RUNTIME
→ CAMBIAR TEXTO, RUTAS, PERMISOS O COLORES POR SUSTITUCIÓN
→ CREAR OTRA COPIA INDEPENDIENTE
```

El objetivo no es ocultar la plantilla histórica detrás de otro script. El objetivo es eliminar la duplicación como mecanismo de distribución.

La modalidad canónica es `TEMPLATE_PER_PACKAGE`: este marcador aprueba una sola vez el contrato del scaffold. La herramienta física, cuando exista y quede certificada, se reutiliza; cada paquete registra su uso o no aplicabilidad mediante `SHELL-MIG-004::<package_id>` sin crear forks del scaffold ni reabrir la definición global.

---

#### 2. Resultado material

Queda cerrado un único **lote base productor** heredado de `SHELL-MIG-002`:

```text
devVentoGroup/vento-shell / SHELL-MIG-004
```

Ese lote identifica la procedencia y sustitución del mecanismo histórico en el repositorio productor. No constituye una instancia por paquete.

Su resultado documental se materializa así:

| Dimensión                                                                     | Resultado |
| ----------------------------------------------------------------------------- | --------: |
| lotes base productores de `SHELL-MIG-004`                                     |     **1** |
| instancias `SHELL-MIG-004::<package_id>` ejecutadas                           |     **0** |
| mecanismos legacy directos gobernados                                         |     **2** |
| archivo bootstrap histórico                                                   |     **1** |
| árbol de plantilla histórica                                                  |     **1** |
| archivos físicos administrados por el bootstrap actual                        |     **8** |
| módulos TypeScript/TSX de la plantilla                                        |     **7** |
| hojas de estilo adicionales                                                   |     **1** |
| archivos locales que el scaffold podrá generar o actualizar                   |     **3** |
| archivos de implementación compartida que el scaffold tendrá prohibido copiar |     **5** |
| packages compartidos de frontera reconocidos                                  |     **4** |
| versiones concretas de packages inventadas por esta tarea                     |     **0** |
| scaffold físico creado                                                        |     **0** |
| consumidores migrados                                                         |     **0** |
| cambios Supabase                                                              |     **0** |
| cambios `TREQ-*`                                                              |     **0** |

##### 2.1. Contrato de la instancia `SHELL-MIG-004::<package_id>`

La futura instancia por paquete evalúa si el alcance aprobado necesita crear o actualizar composición local mediante el scaffold certificado.

Debe registrar, como mínimo:

- mismo `package_id` usado por `E5-GATE-008` y `SHELL-CI-020..024`;
- consumidores web incluidos en el paquete que requieren scaffold;
- commit base y commit candidato de cada consumidor;
- versión, commit fuente y huella del scaffold;
- versiones exactas e integridades de packages resueltos;
- archivos locales generados o actualizados y sus baselines;
- manifest de resultado y procedencia por consumidor;
- pruebas de reproducibilidad, idempotencia y ausencia de fuente runtime copiada;
- rollback independiente por consumidor.

Si un paquete afecta varios consumidores, existe **una sola** instancia `SHELL-MIG-004::<package_id>` que agrega ejecuciones de scaffold por consumidor. Cada subejecución conserva evidencia y rollback propios, y un fallo en cualquiera impide cerrar la instancia del paquete.

Si el paquete no crea ni actualiza ninguna superficie gobernada por el scaffold, la instancia puede ser `NOT_APPLICABLE` únicamente con evidencia de intersección vacía. La no aplicabilidad nunca autoriza a copiar manualmente el template histórico.

La implementación física del scaffold es una capacidad reutilizable del productor; no se recompone ni se versiona de nuevo por cada `package_id`.

La **primera materialización física** del scaffold solo puede ocurrir dentro de una `SHELL-MIG-004::<package_id>` cuyo `DELIV-PKG` incluya expresamente esa implementación en `devVentoGroup/vento-shell`. Esa misma instancia deberá registrar commit productor, identidad inmutable del scaffold, artefacto, pruebas y rollback. Las instancias posteriores reutilizan una versión ya certificada, salvo que su propio `DELIV-PKG` incluya un cambio explícito del scaffold; en ese caso se exige una versión inmutable nueva y se conserva la anterior para rollback. Ningún paquete puede crear una copia o fork alternativo del scaffold.

La instancia solo puede ejecutarse después de `SHELL-CI-001..019`, del `DELIV-PKG` del paquete y de `E5-GATE-008::<package_id>`, dentro del ciclo `SHELL-CI-020..024::<package_id>`.

Los dos mecanismos legacy gobernados son:

1. `tools/bootstrap-app-shell.ps1`;
2. `templates/app-shell-standard`.

Los ocho archivos físicos administrados actualmente son:

1. `src/app/globals.css`;
2. `src/app/layout.tsx`;
3. `src/components/vento/standard/vento-shell.tsx`;
4. `src/components/vento/standard/vento-chrome.tsx`;
5. `src/components/vento/standard/ui.tsx`;
6. `src/components/vento/standard/table.tsx`;
7. `src/components/vento/standard/app-switcher.tsx`;
8. `src/components/vento/standard/profile-menu.tsx`.

La diferencia entre ocho archivos físicos y siete módulos del registro de pruebas es coherente: `globals.css` es la hoja de estilo adicional; los otros siete son módulos TSX.

---

#### 3. Fuentes, dependencias y corte verificable

##### 3.1. Dependencias vinculantes

| Fuente                | Decisión heredada                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `SHELL-MIG-003`       | bloquear crecimiento de legacy y fallar cerrado ante nuevas aristas o copias no inventariadas                              |
| `SHELL-PKG-001`       | registry npm privado, versiones exactas, lockfile, `npm ci`, procedencia y prohibición de distribución por copia           |
| `SHELL-PKG-003`       | releases y artefactos inmutables; una identidad publicada no se corrige en sitio                                           |
| `SHELL-PKG-004`       | compatibilidad atribuible a package, versión, consumidor, commit, lockfile, toolchain y evidencia exactos                  |
| `SHELL-UI-010`        | `AppShell` es composición presentacional; datos, permisos, contexto, Supabase y navegación empresarial permanecen fuera    |
| `SHELL-MIG-002`       | lote exacto de scaffold, pruebas, observabilidad, rollback y criterio de suspensión                                        |
| `TREQ-SHELL-002`      | una responsabilidad compartida no se propaga mediante copias manuales sin paridad contractual                              |
| `TREQ-SHELL-006`      | packages compartidos requieren pruebas y compatibilidad por consumidor                                                     |
| `TREQ-SHELL-007`      | rollback independiente antes de release o cutover                                                                          |
| `TREQ-SHELL-029`      | la plantilla histórica es fuente y no runtime por su sola existencia                                                       |
| `TREQ-SHELL-030..032` | navegación, autorización, simulación, componentes y copias del template deben reconciliarse sin autoridad local divergente |
| `TREQ-SHELL-035`      | textos y estados de template no pueden propagar codificación o significado defectuosos                                     |
| `TREQ-SHELL-036..039` | identidad de release, compatibilidad, deprecación y retiro controlado                                                      |

##### 3.2. Estado remoto observado

La línea base remota consultada mantiene:

- `packages/*` como workspace de autoría;
- únicamente `packages/os-context` materializado bajo `packages/`;
- `@vento/os-context@0.1.0` con `private: true` y exports directos a `src/index.ts`, por lo que no constituye una release estable de distribución;
- `@vento/contracts`, `@vento/supabase` y `@vento/ui-web` sin package físico publicado confirmado;
- cero evidencia de releases estables adoptables de las cuatro familias para ejecutar el scaffold;
- `tools/bootstrap-app-shell.ps1` como único archivo bajo `tools/`;
- `templates/app-shell-standard` como plantilla histórica vigente.

Por tanto, el scaffold queda **ESPECIFICADO** pero **BLOQUEADO PARA EJECUCIÓN FÍSICA** hasta que existan releases exactas, compatibles y autorizadas de las dependencias que cada ejecución requiera.

---

#### 4. Línea base física del mecanismo histórico

El bootstrap actual recibe configuración de aplicación y luego copia recursivamente la implementación de `templates/app-shell-standard` al repositorio destino.

Después de copiar:

- reescribe variables CSS mediante una tabla de paletas embebida;
- reescribe metadata de `layout.tsx`;
- sustituye `NEXO` y prefijos de permisos dentro de `vento-chrome.tsx`;
- modifica texto de `profile-menu.tsx`;
- puede alterar el estado local del AppSwitcher;
- permite sobrescribir los ocho archivos administrados mediante una opción de fuerza.

El README histórico amplía el riesgo: si faltan helpers de Supabase o autenticación, indica copiarlos desde NEXO o adaptar imports.

Ese modelo viola la arquitectura objetivo porque distribuye fuente mutable por duplicación en lugar de consumir una identidad versionada.

La plantilla también conserva evidencia de defectos que no deben propagarse, incluidos textos con codificación corrupta y listas locales de aplicaciones, navegación y permisos.

---

#### 5. Decisión principal

Se aprueba el siguiente modelo de sustitución:

```text
SCAFFOLD VERSIONADO
→ NO CONTIENE UNA COPIA CANÓNICA DE LA IMPLEMENTACIÓN RUNTIME COMPARTIDA
→ INSTALA DEPENDENCIAS APROBADAS MEDIANTE VERSIONES EXACTAS
→ GENERA SOLO COMPOSICIÓN Y CONFIGURACIÓN LOCAL PROPIETARIA
→ REGISTRA PROCEDENCIA Y RESULTADO
→ FALLA SI NO PUEDE DEMOSTRAR COMPATIBILIDAD O REPRODUCIBILIDAD
```

El scaffold no será un segundo package de UI ni una segunda fuente de contratos.

No podrá convertirse en propietario semántico de:

- catálogos de aplicaciones;
- permisos;
- roles;
- scopes;
- contexto operativo;
- clientes Supabase;
- navegación empresarial;
- AppSwitcher;
- ProfileMenu;
- componentes visuales compartidos;
- contratos CSS compartidos.

Es una herramienta de materialización controlada de un consumidor, no una fuente alternativa de verdad.

---

#### 6. Fronteras de package

El scaffold reconoce exactamente las cuatro familias compartidas ya aprobadas:

| Package             | Responsabilidad que puede consumir el scaffold                                  | Regla                                                            |
| ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `@vento/contracts`  | identidades, catálogos, tipos y contratos estáticos                             | nunca generar una copia local editable del contrato              |
| `@vento/os-context` | adapters y runtime compartido de contexto/autorización                          | nunca copiar helpers auth desde NEXO u otra aplicación           |
| `@vento/supabase`   | factories y frontera técnica de acceso a Supabase                               | nunca copiar factories browser/server desde otra aplicación      |
| `@vento/ui-web`     | AppShell, Chrome presentacional, primitivas y componentes compartidos aprobados | nunca copiar la implementación de esos componentes al consumidor |

Una ejecución concreta instala únicamente packages que realmente formen parte del grafo aprobado de esa composición, pero toda dependencia instalada deberá tener versión exacta y compatibilidad demostrada.

La omisión de una familia es válida solo cuando el resultado no importa ni duplica su responsabilidad y la matriz aplicable la clasifica como no requerida para esa composición. El scaffold no instala packages sin uso para aparentar cumplimiento.

---

#### 7. Identidad y versionado del scaffold

Toda implementación física futura del scaffold deberá poseer una identidad de versión inmutable y verificable.

Su procedencia mínima queda definida por esta tupla:

```text
versión del scaffold
+
repositorio fuente
+
commit fuente
+
huella del artefacto ejecutado
+
contrato de entradas
+
versiones exactas de packages requeridos
```

Reglas:

1. una misma versión del scaffold no podrá cambiar de lógica o bytes sin crear una versión nueva;
2. la versión deberá quedar registrada en cada ejecución y en su manifest de resultado;
3. un cambio que modifique archivos generados, semántica de configuración, dependencias requeridas o reglas de validación exige una nueva versión del scaffold;
4. una corrección no podrá sustituir silenciosamente el artefacto de una versión ya utilizada;
5. el commit fuente y la huella del ejecutable son evidencia obligatoria aun cuando exista una versión humana;
6. esta tarea no asigna un número inicial, tag ni ruta de publicación porque todavía no existe el artefacto físico autorizado;
7. la primera identidad física solo podrá declararse cuando el scaffold real supere sus gates de implementación y evidencia.

No se reutilizan los tags `pkg/...` de `SHELL-PKG-003` para fingir que el scaffold es uno de los cuatro packages.

---

#### 8. Contrato de entrada obligatorio

Una ejecución válida deberá resolver explícitamente, como mínimo:

| Entrada                         | Obligación                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| repositorio consumidor          | identidad exacta del repositorio objetivo                                                                 |
| commit base                     | commit exacto sobre el que se calcula la salida                                                           |
| aplicación                      | `AppCode` canónico validado; no derivado del nombre visible                                               |
| nombre visible                  | copy de presentación explícito                                                                            |
| metadata web                    | valores aprobados de título, descripción y origen cuando apliquen                                         |
| configuración visual            | tokens o configuración de tema admitidos por el contrato UI vigente                                       |
| dependencias compartidas        | nombre y versión exacta de cada package requerido                                                         |
| integridad de dependencias      | resolución verificable mediante lockfile/registry                                                         |
| compatibilidad                  | relación aprobada para package, versión y consumidor aplicables                                           |
| composición AppShell            | contenido preparado para `brand`, `navigation`, `context`, `notices` y `headerActions` cuando corresponda |
| política de archivos existentes | baseline y procedencia de cada archivo local administrado                                                 |
| rollback                        | snapshot previo restituible del consumidor                                                                |

Queda prohibido inferir `AppCode` desde `AppName`, nombre de carpeta, nombre de repositorio o dominio.

---

#### 9. Versiones fijadas y lockfile

La regla de dependencias es estricta:

```text
package requerido
→ release canónica existente
→ versión exacta
→ integridad resoluble
→ combinación compatible con el consumidor
→ package.json
→ package-lock.json
→ npm ci reproducible
```

Queda prohibido para una ejecución certificable:

- `latest`;
- `*`;
- rangos flotantes;
- `file:`;
- `link:`;
- dependencia Git por branch o commit como canal ordinario;
- workspace local como evidencia de release externa;
- regeneración silenciosa del lockfile;
- override permanente para ocultar incompatibilidad;
- uso de `@vento/os-context@0.1.0` privado como si fuera release estable.

Si una dependencia requerida no tiene una release exacta y compatible, el scaffold **no ejecuta** la materialización certificable.

---

#### 10. Contrato de salida

El scaffold podrá producir únicamente estas clases de resultado:

1. actualización controlada de `package.json` para dependencias compartidas exactas;
2. actualización reproducible de `package-lock.json`;
3. composición local de aplicación;
4. configuración local explícita;
5. metadata y tema propios del consumidor;
6. manifest de resultado y procedencia de la ejecución;
7. evidencia necesaria para comparar la salida con su baseline.

No podrá generar una copia local de la implementación fuente de un package compartido.

La salida deberá poder clasificarse completamente como:

```text
DEPENDENCIA VERSIONADA
+
COMPOSICIÓN LOCAL
+
CONFIGURACIÓN LOCAL
```

Nunca como:

```text
FORK LOCAL DEL PACKAGE
```

---

#### 11. Reconciliación exacta de los ocho archivos históricos

| Archivo histórico                                | Disposición del scaffold     | Motivo                                                                                                                |
| ------------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `src/app/layout.tsx`                             | `GENERAR_O_ACTUALIZAR_LOCAL` | entrypoint de aplicación; metadata, fuentes y composición raíz permanecen locales                                     |
| `src/app/globals.css`                            | `GENERAR_O_ACTUALIZAR_LOCAL` | entrypoint CSS local; tema y overrides de aplicación permanecen locales                                               |
| `src/components/vento/standard/vento-shell.tsx`  | `GENERAR_O_ACTUALIZAR_LOCAL` | compositor server de la aplicación; ensambla dependencias sin convertirse en fuente compartida                        |
| `src/components/vento/standard/vento-chrome.tsx` | `NO_COPIAR`                  | estructura compartible pertenece a `@vento/ui-web`; navegación, permisos y Supabase históricos deben salir del chrome |
| `src/components/vento/standard/ui.tsx`           | `NO_COPIAR`                  | primitivas compartidas deben consumirse desde `@vento/ui-web`                                                         |
| `src/components/vento/standard/table.tsx`        | `NO_COPIAR`                  | los seis wrappers semánticos pertenecen a la superficie UI compartida aprobada                                        |
| `src/components/vento/standard/app-switcher.tsx` | `NO_COPIAR`                  | metadata viene de contratos; acceso se resuelve fuera de UI; el componente visual no mantiene catálogo local          |
| `src/components/vento/standard/profile-menu.tsx` | `NO_COPIAR`                  | estructura visual puede compartirse, pero sesión, simulación, sede y autoridad permanecen fuera del componente        |

Conciliación:

```text
8 archivos históricos
= 3 locales permitidos
+ 5 copias compartidas prohibidas
```

No hay archivo sin disposición.

---

#### 12. Contrato de `src/app/layout.tsx`

El scaffold podrá crear o actualizar el layout local únicamente para:

- metadata de aplicación;
- configuración de fuentes aprobada;
- import del entrypoint CSS local;
- composición raíz hacia el compositor local o superficie compartida aprobada;
- atributos estructurales del documento que sigan siendo responsabilidad del consumidor.

No podrá insertar en el layout:

- catálogos locales de permisos;
- datos de sesión como fuente de autoridad;
- listas copiadas de aplicaciones;
- lógica de Supabase de dominio;
- rutas específicas heredadas de NEXO como estándar transversal.

La metadata deberá usar identidad y configuración explícitas; no se obtendrá por sustitución textual sobre un archivo NEXO.

---

#### 13. Contrato de `src/app/globals.css`

`globals.css` permanece local porque cada consumidor conserva su entrypoint CSS y configuración visual propia.

El scaffold podrá generar o actualizar:

- importaciones públicas requeridas por el contrato CSS compartido cuando esas superficies existan;
- tokens u overrides explícitamente permitidos;
- configuración local de fondo, tipografía o marca que pertenezca al consumidor.

Queda prohibido:

- copiar íntegramente el CSS histórico como implementación base compartida;
- mantener una segunda definición local de tokens cuyo propietario sea `@vento/ui-web`;
- inventar variables públicas no aprobadas;
- derivar paleta desde el nombre de la aplicación;
- propagar texto o bytes corruptos desde el template histórico.

---

#### 14. Contrato de `src/components/vento/standard/vento-shell.tsx`

El compositor local permanece porque `SHELL-UI-010` separa la composición de aplicación de la implementación visual compartida.

Su responsabilidad máxima será:

```text
RESOLVER MEDIANTE FRONTERAS APROBADAS
→ identidad de aplicación
→ sesión/contexto que realmente corresponda
→ navegación ya preparada
→ contexto presentacional
→ avisos
→ utilidades de header

COMPONER
→ AppShell compartido
→ children de la aplicación
```

No podrá reimplementar dentro del archivo:

- factories Supabase compartidas;
- algoritmo de autorización compartido;
- catálogos de roles o permisos;
- AppShell visual completo;
- primitivas UI compartidas;
- AppSwitcher compartido;
- ProfileMenu compartido.

La existencia del compositor local no equivale a mantener una copia del package.

---

#### 15. Superficies que dejan de generarse como fuente runtime

El scaffold prohíbe materializar como copia los cinco archivos compartibles siguientes:

```text
vento-chrome.tsx
ui.tsx
table.tsx
app-switcher.tsx
profile-menu.tsx
```

Su sustitución será mediante imports públicos de releases exactas cuando las superficies físicas correspondientes existan y estén aprobadas.

Si una API pública necesaria todavía no existe, el scaffold se bloquea. No reconstruye esa API copiando el template histórico.

Un wrapper local legítimo solo podrá existir cuando tenga responsabilidad de aplicación propia, nombre y alcance explícitos y no reproduzca la implementación compartida. El scaffold no crea wrappers vacíos para conservar rutas legacy.

---

#### 16. Reconciliación de los parámetros del bootstrap histórico

| Entrada histórica | Decisión del scaffold versionado                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `TargetPath`      | se conserva únicamente como destino operacional de una ejecución; no define identidad semántica                                |
| `AppName`         | se conserva como copy explícito de presentación; no genera `AppCode`                                                           |
| `AppCode`         | pasa a ser obligatorio y debe validar contra el contrato canónico aplicable                                                    |
| `Palette`         | se elimina como tabla hardcodeada del generador; se sustituye por configuración visual explícita compatible con el contrato UI |
| `Domain`          | se conserva como metadata explícita solo cuando el consumidor tenga un origen aprobado                                         |
| `Description`     | se conserva como copy local explícito                                                                                          |
| `Tagline`         | se conserva como copy local explícito si la composición lo utiliza                                                             |
| `SetActiveApp`    | se elimina; el scaffold no cambia ciclo de vida, disponibilidad ni estado de una aplicación                                    |
| `Force`           | se elimina como sobrescritura ciega; un cambio sobre archivos existentes exige baseline reconocible y diff controlado          |

No se mantiene compatibilidad por nombre con parámetros cuya semántica sea insegura.

---

#### 17. Configuración explícita

La configuración de una ejecución deberá ser declarativa, resoluble y suficiente para regenerar el mismo resultado bajo el mismo estado de entrada.

Como mínimo deberá registrar:

- aplicación canónica;
- consumidor exacto;
- commit base;
- metadata de aplicación utilizada;
- tema/tokens configurados;
- packages requeridos y versiones exactas;
- referencias de compatibilidad aplicables;
- decisiones de composición por slot de AppShell;
- archivos locales administrados;
- política de conflicto;
- snapshot de rollback.

La representación física de esa configuración no se asigna en esta fase para no inventar una ruta o formato que todavía no existe en el repositorio.

La futura implementación podrá elegir una serialización concreta únicamente si conserva todos estos campos e invariantes.

---

#### 18. Relación con el catálogo de aplicaciones

El scaffold no mantiene una lista propia de aplicaciones.

Reglas:

1. `AppCode` se valida contra el contrato compartido aplicable.
2. nombre, destino y ciclo de vida no se reconstruyen desde arrays embebidos.
3. `hub` no se convierte por inferencia en un `AppCode` alternativo.
4. el scaffold no marca una aplicación como activa o próxima.
5. la disponibilidad para un actor no se determina en generación.
6. URLs y dominios solo se usan como configuración explícita gobernada.

Esto elimina el comportamiento actual de AppSwitcher que transporta una lista local como fuente propia.

---

#### 19. Relación con `AppShell` de `SHELL-UI-010`

El scaffold deberá preparar el consumidor para la composición conceptual aprobada:

```text
AppShell
├─ brand
├─ navigation
├─ context
├─ notices
├─ headerActions
└─ children
```

El scaffold no resuelve el contenido autoritativo de esos slots.

| Slot            | Propiedad del scaffold                                                     |
| --------------- | -------------------------------------------------------------------------- |
| `brand`         | cablear identidad visual explícita del consumidor                          |
| `navigation`    | aceptar navegación ya preparada por la aplicación; no calcular permisos    |
| `context`       | aceptar proyección visual ya resuelta; no decidir sede, área, turno o rol  |
| `notices`       | aceptar avisos preparados; no iniciar ni terminar simulación               |
| `headerActions` | componer utilidades aprobadas; no resolver sesión o catálogo por su cuenta |
| `children`      | preservar la superficie empresarial local                                  |

No se introducen props alternativas para conservar acoplamientos del `VentoChrome` histórico.

---

#### 20. Frontera con autorización y contexto

El scaffold no genera:

- matrices de permisos;
- `NAV_GROUPS` con permisos hardcodeados;
- role overrides cliente;
- cookies de autoridad;
- resolución de sede desde query parameters;
- `canOperate` local;
- `OperatingGate` como autoridad del AppShell;
- casts de strings legacy a contratos canónicos.

Cuando la composición necesite contexto o autorización compartidos, se consumirá la release exacta de `@vento/os-context` y los contratos exactos aplicables.

La aplicación conserva sus adapters y composición locales cuando su responsabilidad así lo exige, pero no reimplementa el SDK compartido.

---

#### 21. Frontera con Supabase

El scaffold no copia:

```text
src/lib/supabase/client
src/lib/supabase/server
```

ni otros helpers desde NEXO.

La frontera futura utiliza `@vento/supabase` cuando la composición requiera capacidades compartidas de acceso técnico.

`@vento/ui-web` y `AppShell` no reciben dependencia directa de Supabase.

Cualquier cambio de esquema, RPC, RLS, datos, Storage, Realtime, Edge Functions, configuración o secretos permanece fuera de `SHELL-MIG-004` y, si pertenece a VENTO, se materializa exclusivamente desde `vento-shell` mediante su tarea propietaria.

---

#### 22. Frontera con navegación

La navegación del template histórico no se usa como seed de nuevos consumidores.

El scaffold no genera:

- rutas NEXO;
- grupos NEXO;
- permisos NEXO;
- descripciones NEXO;
- lógica `required` / `anyOf` heredada;
- acceso calculado desde RPC dentro del chrome.

La futura composición consume la superficie de navegación aprobada por su tarea propietaria y recibe únicamente la proyección que la aplicación esté autorizada a presentar.

---

#### 23. Política de archivos existentes

La sustitución elimina el comportamiento de sobrescritura ciega.

Reglas:

1. un archivo existente no se modifica si el scaffold no puede demostrar su baseline;
2. una salida creada por una versión anterior del scaffold debe poder vincularse a esa versión y a su configuración;
3. una actualización calcula diferencias antes de modificar;
4. un archivo con cambios locales no atribuibles al scaffold bloquea la actualización automática;
5. la ejecución no borra extensiones locales para forzar convergencia;
6. un conflicto produce estado bloqueado y no una sobrescritura parcial;
7. un resultado parcial no se considera scaffold válido;
8. el scaffold no utiliza una opción equivalente a `Force` para saltar estas reglas.

---

#### 24. Reproducibilidad e idempotencia

Bajo las mismas entradas exactas:

```text
mismo scaffold
+
mismo commit base
+
misma configuración
+
mismas versiones e integridades de packages
→ mismo conjunto lógico de salidas
→ mismas dependencias
→ mismos archivos generados
→ mismas huellas de archivos generados
```

Una segunda ejecución sobre una salida intacta deberá producir diff vacío o una confirmación equivalente de convergencia.

Se considera fallo de reproducibilidad si:

- cambia una salida sin cambiar entrada o versión del scaffold;
- resuelve otra versión de package;
- depende de hora, red no versionada o contenido flotante;
- el orden de ejecución altera el resultado;
- genera archivos adicionales no declarados;
- muta datos externos como efecto lateral.

---

#### 25. Manifest de resultado y procedencia

Cada ejecución física futura deberá emitir evidencia resoluble con, como mínimo:

| Campo lógico         | Evidencia requerida                                         |
| -------------------- | ----------------------------------------------------------- |
| versión del scaffold | identidad exacta utilizada                                  |
| repositorio fuente   | `devVentoGroup/vento-shell`                                 |
| commit fuente        | commit exacto del scaffold                                  |
| huella del scaffold  | integridad del artefacto ejecutado                          |
| consumidor           | repositorio objetivo                                        |
| commit base          | baseline previo del consumidor                              |
| aplicación           | `AppCode` validado                                          |
| packages             | nombres y versiones exactas utilizadas                      |
| integridades         | valores resueltos por registry/lockfile                     |
| compatibilidad       | referencias de matriz aplicables                            |
| configuración        | huella de la configuración efectiva                         |
| archivos generados   | conjunto exacto de paths afectados                          |
| huellas de salida    | integridad de archivos generados o actualizados             |
| manifest/lockfile    | huellas resultantes de `package.json` y `package-lock.json` |
| rollback             | snapshot previo restituible                                 |

Esta tarea define el contenido mínimo, no inventa el nombre o ubicación física de ese manifest.

---

#### 26. Gates previos a una ejecución certificable

El scaffold solo podrá materializar un consumidor cuando se cumplan acumulativamente:

1. scaffold físico autorizado y versionado;
2. artefacto de scaffold inmutable e identificable;
3. commit base exacto del consumidor;
4. `AppCode` válido;
5. configuración completa;
6. APIs públicas requeridas materializadas;
7. releases exactas de packages disponibles;
8. integridad de esas releases verificable;
9. matriz de compatibilidad aplicable sin estado pendiente o incompatible;
10. snapshot de rollback disponible;
11. ausencia de archivos legacy nuevos fuera del inventario;
12. posibilidad de producir la salida sin copiar implementación runtime compartida;
13. `package.json` y lockfile reconciliables;
14. validaciones del consumidor definidas;
15. ningún conflicto local no resuelto en archivos administrados.

Fallar una condición bloquea la ejecución; no activa un modo degradado de copia.

---

#### 27. Observabilidad del lote

La ejecución deberá permitir reconstruir:

- versión y commit del scaffold;
- repositorio y commit base del consumidor;
- packages y versiones efectivas;
- integridades de resolución;
- configuración efectiva;
- archivos creados, modificados u omitidos;
- razones de omisión o bloqueo;
- diff respecto al baseline;
- resultado de instalación y validaciones aplicables;
- snapshot de rollback;
- resultado de una segunda ejecución de idempotencia.

No se utilizará telemetría sensible para demostrar estas propiedades. La evidencia puede basarse en manifests, lockfile, hashes, logs técnicos seguros y resultados de CI.

---

#### 28. Estado y ciclo de vida del bootstrap/template legacy

La clasificación queda:

| Elemento                                     | Estado documental después de `SHELL-MIG-004` | Regla                                                               |
| -------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| `tools/bootstrap-app-shell.ps1`              | `LEGACY_FROZEN`                              | no evoluciona como mecanismo ordinario de distribución              |
| `templates/app-shell-standard`               | `LEGACY_FROZEN`                              | fuente histórica y rollback controlado; no canon runtime            |
| README de copia                              | `LEGACY_FROZEN`                              | sus instrucciones de copiar fuente no gobiernan nuevos consumidores |
| futuras copias creadas desde esos artefactos | `PROHIBIDAS_COMO_NUEVA_ADOPCION`             | un nuevo consumidor debe usar el scaffold certificado cuando exista |
| scaffold sustituto                           | `ESPECIFICADO_NO_MATERIALIZADO`              | no puede declararse operativo hasta superar los gates de esta tarea |

Mientras el scaffold no exista físicamente, conservar los artefactos legacy en Git no constituye aprobación para crear nuevos consumidores con ellos.

Su conservación permite evidencia histórica y rollback del lote hasta que el sustituto esté certificado.

---

#### 29. Rollback

El rollback se define en dos momentos.

##### 29.1. Antes de certificar el scaffold sustituto

Si la materialización física del scaffold falla durante su desarrollo, se restaura el snapshot previo del repositorio productor que contiene el bootstrap y la plantilla históricos.

Esa restauración:

- recupera la capacidad previa para diagnóstico;
- no convierte la copia histórica en canal canónico;
- no autoriza nuevos consumidores;
- conserva la evidencia de la falla.

##### 29.2. Después de una adopción certificada por consumidor

El rollback de un consumidor restaura conjuntamente:

```text
commit previo del consumidor
+
package.json previo
+
package-lock.json previo
+
configuración local previa
+
entrypoints locales previos
```

No se reconstruye el estado copiando archivos desde el template histórico.

No se mueve una versión publicada ni se edita `node_modules`.

---

#### 30. Criterios de suspensión

El lote se suspende inmediatamente cuando ocurra cualquiera de estos casos:

1. el scaffold copia `vento-chrome.tsx`, `ui.tsx`, `table.tsx`, `app-switcher.tsx` o `profile-menu.tsx` como implementación runtime;
2. copia helpers auth o Supabase desde NEXO u otro consumidor;
3. resuelve un package con rango flotante o identidad no estable;
4. usa un package privado/transitorio como si fuera release estable;
5. genera una ruta, permiso, app list, role override o sede autoritativa desde el template;
6. necesita una API pública que todavía no existe;
7. no existe compatibilidad verificable con el consumidor exacto;
8. cambia archivos no declarados;
9. sobrescribe un archivo local con cambios no atribuibles al scaffold;
10. una segunda ejecución cambia la salida sin cambio de entradas;
11. el build o las pruebas aplicables del consumidor fallan por el cambio;
12. el rollback no puede restaurar el snapshot anterior;
13. aparece una nueva fuente runtime duplicada;
14. la configuración efectiva no puede reconstruirse desde evidencia;
15. se requiere una modificación Supabase no materializada por su tarea propietaria.

No existe bypass documental para estas condiciones.

---

#### 31. Handoff hacia adopción de UI

`SHELL-MIG-004` prepara el mecanismo, pero no migra las siete aplicaciones.

`SHELL-MIG-005` conserva la responsabilidad de adoptar las superficies UI compartidas por aplicación.

Antes de esa adopción, el scaffold deberá permitir que cada consumidor:

- conserve `layout.tsx` y `globals.css` como entrypoints locales;
- conserve un compositor local cuando corresponda;
- instale `@vento/ui-web` y demás packages requeridos mediante versiones exactas;
- componga AppShell sin copiar su implementación;
- mantenga navegación, contexto, avisos y acciones empresariales en sus propietarios;
- conserve rollback por repositorio.

La existencia documental de este contrato no adelanta `SHELL-MIG-005`.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Justificación:** el scaffold especializa obligaciones ya cubiertas: evitar copias manuales y deriva (`TREQ-SHELL-002`), exigir instalación y validación reproducibles (`TREQ-SHELL-005`), compatibilidad por consumidor (`TREQ-SHELL-006`), rollback independiente (`TREQ-SHELL-007`), preservar la plantilla como fuente y no runtime (`TREQ-SHELL-029`), impedir que navegación, autorización y componentes legacy se conviertan en estándar (`TREQ-SHELL-030..032`), evitar propagación de contenido defectuoso (`TREQ-SHELL-035`) y conservar identidad, deprecación y retiro controlados (`TREQ-SHELL-036..039`). No aparece una regla de comportamiento nueva que carezca de cobertura canónica.

---

#### 33. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                         |
| --------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | La tarea no materializa scaffold ni consumidor; no existe cambio físico sobre el que ejecutar un build atribuible.                                                                                                |
| LOCAL     | PASS           | La especificación reconcilia 8 de 8 archivos históricos, 3 salidas locales permitidas y 5 copias compartidas prohibidas, sin faltantes ni duplicados.                                                             |
| REMOTA    | PASS           | Se verificaron en `main` el bootstrap, el árbol completo de la plantilla, su README, `package.json`, el único workspace físico `packages/os-context`, las dependencias canónicas y el registro `04A_04_SHELL.md`. |
| OPERATIVA | NOT_APPLICABLE | No existe scaffold físico autorizado ni ejecución sobre un consumidor en esta fase documental.                                                                                                                    |
| FÍSICA    | NOT_APPLICABLE | No se crean, modifican o retiran archivos runtime, packages, consumidores, despliegues ni objetos Supabase.                                                                                                       |

---

#### 34. Criterios de aceptación

`SHELL-MIG-004` queda documentalmente completa porque:

- [x] conserva exactamente el lote base productor `devVentoGroup/vento-shell / SHELL-MIG-004`;
- [x] distingue el lote productor de las futuras instancias `SHELL-MIG-004::<package_id>`;
- [x] define selección, agregación multi-consumidor, lineage, no aplicabilidad y rollback por `package_id`;
- [x] reconcilia `tools/bootstrap-app-shell.ps1` y `templates/app-shell-standard` como el mecanismo legacy gobernado;
- [x] reconcilia los ocho archivos físicos actuales sin faltantes;
- [x] aclara la relación entre ocho archivos y siete módulos TSX más una hoja de estilo;
- [x] sustituye el modelo de copia por dependencias versionadas y composición local;
- [x] fija versión e identidad inmutables para el scaffold sin inventar una release física inexistente;
- [x] exige versiones exactas e integridad de cada package requerido;
- [x] exige compatibilidad del consumidor antes de una ejecución certificable;
- [x] prohíbe ranges flotantes, Git, `file:`, `link:` y workspace como canal de release del consumidor;
- [x] mantiene `layout.tsx`, `globals.css` y `vento-shell.tsx` como salidas locales propietarias;
- [x] prohíbe copiar `vento-chrome.tsx`, `ui.tsx`, `table.tsx`, `app-switcher.tsx` y `profile-menu.tsx`;
- [x] prohíbe copiar helpers auth y Supabase desde NEXO;
- [x] elimina la derivación automática de `AppCode` desde nombre de aplicación;
- [x] elimina la tabla de paletas como fuente del generador;
- [x] elimina `SetActiveApp` como operación del scaffold;
- [x] elimina la sobrescritura ciega equivalente a `Force`;
- [x] define configuración explícita sin inventar un path físico para ella;
- [x] define manifest de resultado y procedencia sin inventar nombre de archivo;
- [x] define reproducibilidad e idempotencia;
- [x] define gate fail-closed antes de materialización;
- [x] define observabilidad suficiente para reconstruir cada ejecución;
- [x] congela bootstrap/template legacy como recuperación controlada y no como distribución canónica;
- [x] define rollback antes y después de adopción;
- [x] define criterios concretos de suspensión;
- [x] no ejecuta migraciones ni adelanta `SHELL-MIG-005`;
- [x] no crea ni modifica `TREQ-*`;
- [x] no modifica Supabase ni ningún repositorio consumidor.

---

#### 35. Límites y fuera de alcance

Esta tarea no:

- crea físicamente el scaffold;
- asigna una ruta nueva al scaffold;
- asigna un nombre de archivo nuevo al scaffold;
- asigna su primera versión concreta o tag;
- materializa `@vento/contracts`, `@vento/supabase` o `@vento/ui-web`;
- convierte `@vento/os-context@0.1.0` en release estable;
- publica packages;
- modifica `package.json` o `package-lock.json` de consumidores;
- genera los tres entrypoints locales;
- elimina el bootstrap o la plantilla históricos;
- modifica las seis copias runtime existentes;
- migra SHELL, VISO, NEXO, FOGO, ORIGO, PULSO o NUMERA;
- define la API física de exports de los packages;
- define rutas o navegación empresarial de una aplicación;
- modifica autenticación, autorización, simulación, contexto o sesiones;
- modifica SQL, migraciones, RLS, RPC, Realtime, Storage, Edge Functions, datos, configuración o secretos de Supabase;
- ejecuta builds, despliegues o pruebas operativas de un scaffold inexistente;
- crea nuevos requisitos de prueba;
- ejecuta una instancia `SHELL-MIG-004::<package_id>` durante el marcador global;
- inicia `SHELL-MIG-005`.

---

#### 36. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-003 — Preparar compatibilidad y bloqueo de nuevos consumidores legacy`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-004 — Sustituir la plantilla histórica por scaffold versionado`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-005 — Migrar componentes, Chrome y estilos por aplicación`


### ✅ SHELL-MIG-005 — Migrar componentes, Chrome y estilos por aplicación

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-004 — Sustituir la plantilla histórica por scaffold versionado
**Tarea siguiente:** SHELL-MIG-006 — Verificar accesibilidad, tema y movimiento reducido
**Tipo de tarea:** documental; definición global única de la migración de componentes, Chrome, navegación presentacional y estilos, reutilizable mediante instancias `SHELL-MIG-005::<package_id>`, preservando composición, tema, extensiones empresariales legítimas y rollback independiente, sin ejecutar adopción física de packages ni modificar código consumidor durante el marcador global
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** CONTRATO_GLOBAL_MIGRACION_UI_ESPECIFICADO; 7 lotes base UI definidos; 57 ocurrencias UI reconciliadas; 20 ocurrencias conservadas locales; 37 ocurrencias destinadas a APIs compartidas aprobadas; 0 instancias `SHELL-MIG-005::<package_id>` ejecutadas; 0 adopciones físicas; 0 retiros ejecutados
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-005` define, por aplicación y por identidad heredada de `SHELL-MIG-001`, la plantilla global de migración futura desde copias UI locales hacia las superficies compartidas aprobadas de Vento OS.

La modalidad canónica es `TEMPLATE_PER_PACKAGE`: los siete lotes de repositorio son sublotes base de selección, mientras la identidad de ejecución física será `SHELL-MIG-005::<package_id>`.

La tarea conserva simultáneamente cuatro objetivos:

1. converger Chrome y componentes transversales hacia `@vento/ui-web`;
2. mantener locales los entrypoints, estilos de integración y compositores cuya responsabilidad continúa perteneciendo a cada aplicación;
3. preservar navegación, tema, responsividad y extensiones empresariales legítimas sin introducir forks de la API compartida;
4. mantener cada consumidor reversible de forma independiente.

La regla raíz queda:

```text
ORQUESTACIÓN, AUTORIDAD Y DOMINIO DEL CONSUMIDOR
→ permanecen en el consumidor
→ producen composición y props ya resueltas
→ consumen APIs compartidas aprobadas
→ conservan extensión local explícita
→ demuestran paridad y rollback antes de retirar legacy consumido
```

Nunca:

```text
migrar UI
→ copiar otra implementación local como nuevo estándar
→ trasladar Supabase, permisos o contexto autoritativo al package visual
→ retirar un consumidor legacy antes de paridad y rollback
→ mezclar el lote UI con AUTH, Supabase o candidatos inertes
```

---

#### 2. Resultado material

Quedan definidos **7 lotes base de migración UI**, uno por repositorio consumidor, y reconciliadas **57 ocurrencias** pertenecientes exactamente a `SHELL-MIG-005`. Estos siete lotes no son siete instancias físicas: una futura instancia `SHELL-MIG-005::<package_id>` selecciona los sublotes y filas que pertenezcan al alcance aprobado del mismo paquete.

| Resultado                                           | Cantidad |
| --------------------------------------------------- | -------: |
| repositorios consumidores                           |    **7** |
| lotes base `SHELL-MIG-005`                          |    **7** |
| instancias `SHELL-MIG-005::<package_id>` ejecutadas |    **0** |
| ocurrencias UI heredadas de `SHELL-MIG-001`         |   **57** |
| ocurrencias `KEEP LOCAL`                            |   **20** |
| ocurrencias `MIGRATE` hacia superficie compartida   |   **37** |
| ocurrencias omitidas o duplicadas                   |    **0** |
| adopciones físicas ejecutadas                       |    **0** |
| retiros legacy ejecutados                           |    **0** |

Distribución exacta:

| Repositorio                  | Ocurrencias | `KEEP LOCAL` | `MIGRATE` | Estado documental del lote      |
| ---------------------------- | ----------: | -----------: | --------: | ------------------------------- |
| `devVentoGroup/vento-shell`  |       **2** |        **2** |     **0** | `ESPECIFICADO_NO_MATERIALIZADO` |
| `devVentoGroup/vento-numera` |       **9** |        **3** |     **6** | `ESPECIFICADO_NO_MATERIALIZADO` |
| `devVentoGroup/vento-fogo`   |       **9** |        **3** |     **6** | `ESPECIFICADO_NO_MATERIALIZADO` |
| `devVentoGroup/vento-origo`  |       **9** |        **3** |     **6** | `ESPECIFICADO_NO_MATERIALIZADO` |
| `devVentoGroup/vento-viso`   |      **10** |        **3** |     **7** | `ESPECIFICADO_NO_MATERIALIZADO` |
| `devVentoGroup/vento-pulso`  |       **9** |        **3** |     **6** | `ESPECIFICADO_NO_MATERIALIZADO` |
| `devVentoGroup/vento-nexo`   |       **9** |        **3** |     **6** | `ESPECIFICADO_NO_MATERIALIZADO` |
| **Total**                    |      **57** |       **20** |    **37** |                                 |

El localizador documental de cada lote base continúa siendo la clave aprobada:

```text
repositorio consumidor / SHELL-MIG-005
```

La identidad de ejecución canónica es distinta y se crea únicamente en fase física:

```text
SHELL-MIG-005::<package_id>
```

No se crean alias, instancias paralelas por repositorio ni una segunda numeración.

##### 2.1. Selección y agregación por `package_id`

Cada futura instancia `SHELL-MIG-005::<package_id>` se forma exclusivamente con la intersección entre:

1. el alcance aprobado del `package_id`;
2. los consumidores y unidades incluidos en su `DELIV-PKG`;
3. las filas de las 57 identidades cuyo `Lote base` es `repositorio / SHELL-MIG-005`;
4. los commits reales que entran al ciclo `SHELL-CI-020..024::<package_id>`.

Reglas:

- existe una sola instancia `SHELL-MIG-005::<package_id>`;
- si el paquete afecta un solo repositorio, la instancia contiene un solo sublote;
- si afecta varios, agrega sus sublotes en el orden serial SHELL → NUMERA → FOGO → ORIGO → VISO → PULSO → NEXO;
- cada sublote conserva commit, manifest, lockfile, pruebas, observabilidad y rollback propios;
- la instancia no puede cerrar mientras un sublote aplicable esté fallido, bloqueado, stale o sin evidencia;
- si el paquete no afecta ninguna de las 57 identidades ni otra superficie UI explícitamente gobernada por esta tarea, `NOT_APPLICABLE` requiere evidencia reproducible de selección vacía;
- una fila seleccionada no puede omitirse usando `NOT_APPLICABLE`;
- la misma identidad `package_id` continúa hacia `SHELL-MIG-006::<package_id>` y `SHELL-MIG-007::<package_id>` cuando esas puertas sean aplicables.

La instancia solo puede ejecutarse después de `SHELL-CI-001..019`, del `DELIV-PKG` del paquete y de `E5-GATE-008::<package_id>`, y queda integrada al ciclo `SHELL-CI-020..024::<package_id>`.

---

#### 3. Dependencias y corte verificable

##### 3.1. Dependencias vinculantes

| Fuente          | Decisión heredada aplicada                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SHELL-MIG-001` | inventario ejecutable, disposición por familia y lote base exacto por consumidor                                                                 |
| `SHELL-MIG-002` | siete lotes base UI, orden serial, precondiciones, pruebas, observabilidad, rollback y suspensión                                                |
| `SHELL-MIG-003` | el lote CI/script de NEXO permanece separado y no puede recrear legacy sin detección                                                             |
| `SHELL-MIG-004` | `layout.tsx`, `globals.css` y el compositor de aplicación permanecen locales; el scaffold futuro deja de copiar implementaciones UI compartibles |
| `SHELL-UI-001`  | frontera de `@vento/ui-web`, separación respecto de autorización, datos y lógica empresarial, y disposición de familias UI                       |
| `SHELL-UI-010`  | `AppShell` es composición presentacional; recibe `brand`, navegación, contexto, avisos, acciones y contenido ya preparados                       |
| `SHELL-UI-011`  | `TaskNavigation` presenta navegación ya resuelta y no recibe permisos, roles ni contexto autoritativo                                            |
| `SHELL-PKG-004` | compatibilidad se demuestra por package, versión, consumidor, commit, manifest, lockfile, toolchain y evidencia                                  |
| `SHELL-PKG-006` | rollback se ejecuta por snapshot de aplicación y no obliga a revertir otros consumidores                                                         |
| `SHELL-PKG-008` | actualización fail-closed; ausencia de evidencia aplicable impide adopción                                                                       |

##### 3.2. Corte remoto de repositorios

| Repositorio                  | Commit `main` verificado                   |
| ---------------------------- | ------------------------------------------ |
| `devVentoGroup/vento-shell`  | `c84cdace5dd4ec1014bb7f8f3324f26056718014` |
| `devVentoGroup/vento-numera` | `1b48a5da425d92e19ed89cf175b1dccc4cd960e1` |
| `devVentoGroup/vento-fogo`   | `b6b9ed00e5267cabaac1a5a1090d93d5f60e86f2` |
| `devVentoGroup/vento-origo`  | `b7a8303fa078ef087f522b6c99059ababfc27472` |
| `devVentoGroup/vento-viso`   | `47322403f3c64e83ae0c4a2f68c05d47093e5bb4` |
| `devVentoGroup/vento-pulso`  | `71e0184486b5fe11e0a42435baf4024807a80efd` |
| `devVentoGroup/vento-nexo`   | `142c4d696221e3ce3fda4ed3b62f3d1fe5b58799` |

Los seis repositorios externos permanecen en los mismos commits usados por el inventario aprobado de consumidores. El avance observado de `vento-shell` corresponde a documentación y tooling de continuidad; no se observó modificación bajo `src/` en el commit de incorporación de `SHELL-MIG-004`.

##### 3.3. Estado de adopción física

En los siete manifests actuales:

- ninguno declara dependencia en `@vento/ui-web`;
- todos declaran `build` y `lint`;
- ninguno declara un script `typecheck`;
- ninguno declara un script `test`;
- no existe evidencia de una adopción física de `AppShell` o `TaskNavigation` desde un release compartido.

Por tanto:

```text
mapeo de migración = COMPLETO DOCUMENTALMENTE
adopción package = NO EJECUTADA
paridad de consumidor = NO EJECUTADA
retiro legacy consumido = NO AUTORIZADO EN ESTE CORTE
```

---

#### 4. Invariantes de migración UI

Cada uno de los siete lotes base conserva estas reglas:

1. El cambio afecta un solo repositorio consumidor por vez.
2. El orden serial heredado es SHELL → NUMERA → FOGO → ORIGO → VISO → PULSO → NEXO.
3. `layout.tsx` permanece propietario del entrypoint, metadata, fuentes, providers y composición raíz propia de cada aplicación.
4. `globals.css` permanece propietario de integración global, tokens locales aprobados y adaptación del tema del consumidor.
5. `vento-shell.tsx` permanece local en las seis aplicaciones que lo poseen como compositor de servidor/orquestación.
6. `AppShell` sustituye intención estructural de Chrome, no la resolución de sesión, permisos, contexto, datos o negocio.
7. `TaskNavigation` recibe únicamente navegación ya preparada por el consumidor.
8. La resolución de visibilidad y autorización ocurre antes de construir la navegación presentacional.
9. `permissionCode`, roles, matrices de permisos y objetos autoritativos no forman parte de la forma compartida de navegación.
10. El router y el cálculo de la ruta actual permanecen en un adapter local cuando sean necesarios.
11. Los estilos compartidos no sustituyen ciegamente `globals.css` ni fuerzan una paleta única entre aplicaciones.
12. Una extensión de dominio permanece local si expresa proceso, navegación empresarial, composición, integración o contenido exclusivo del consumidor.
13. Una extensión local no puede redefinir un componente compartido con la misma responsabilidad y contrato.
14. Los cambios de autorización, contexto, Supabase, sesión, middleware o datos no forman parte de estos lotes.
15. Los candidatos sin consumidor confirmado no se retiran dentro de `SHELL-MIG-005`.
16. La aparición de una diferencia funcional, visual, semántica o accesible no aprobada detiene el lote.
17. Cada rollback restaura el snapshot del repositorio consumidor, su manifest, lockfile, configuración y combinación de UI previa compatibles.
18. La siguiente aplicación no inicia adopción mientras la anterior esté en investigación, observación o rollback.

---

#### 5. Mapa de convergencia de familias compartibles

Las **37 ocurrencias `MIGRATE`** convergen por familia, sin inventar subpaths físicos de exportación todavía no materializados:

| Familia                      | Ocurrencias | Destino conceptual aprobado                                      | Regla de migración                                                                                                                |
| ---------------------------- | ----------: | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `FAM-004 — vento-chrome.tsx` |       **6** | `AppShell` / `@vento/ui-web`                                     | reemplazar estructura duplicada de header, sidebar, main y disclosure por composición; extraer toda autoridad y lógica de dominio |
| `FAM-005 — ui.tsx`           |       **6** | primitivas aprobadas de `@vento/ui-web`                          | sustituir wrappers duplicados por las primitivas públicas propietarias; no copiar implementación local                            |
| `FAM-006 — table.tsx`        |       **6** | wrappers semánticos de tabla aprobados de `@vento/ui-web`        | conservar semántica de tabla; no transformar el wrapper en data grid o lógica de dominio                                          |
| `FAM-007 — app-switcher.tsx` |       **6** | superficie visual compartida + contratos canónicos de aplicación | catálogo, disponibilidad y autoridad se resuelven fuera de UI; la pieza visual no mantiene una lista local autoritativa           |
| `FAM-008 — profile-menu.tsx` |       **6** | superficie visual compartida compuesta en `headerActions`        | sesión, logout, contexto, simulación y autoridad permanecen en propietarios externos                                              |
| `FAM-019 — page-header.tsx`  |       **1** | API reconciliada de PageHeader en `@vento/ui-web`                | VISO migra el único consumidor confirmado preservando responsividad y acento                                                      |
| `FAM-020 — vento-logo.tsx`   |       **6** | superficie de marca compartida + metadata canónica               | marca visual se comparte sin crear un segundo catálogo de aplicaciones                                                            |
| **Total**                    |      **37** |                                                                  |                                                                                                                                   |

Las **20 ocurrencias `KEEP LOCAL`** quedan explícitamente preservadas:

| Familia                         | Ocurrencias | Decisión     |
| ------------------------------- | ----------: | ------------ |
| `FAM-001 — src/app/layout.tsx`  |       **7** | `KEEP LOCAL` |
| `FAM-002 — src/app/globals.css` |       **7** | `KEEP LOCAL` |
| `FAM-003 — vento-shell.tsx`     |       **6** | `KEEP LOCAL` |
| **Total**                       |      **20** |              |

Conciliación:

```text
37 MIGRATE + 20 KEEP LOCAL = 57/57 ocurrencias
```

---

#### 6. Matriz materializada de 57 identidades

Cada fila conserva la identidad de familia, archivo, disposición y lote heredados. `Destino MIG-005` expresa la decisión documental de esta tarea.

|    # | Repositorio    | Familia   | Archivo                                          | Disposición  | Destino MIG-005                                                                                                   |
| ---: | -------------- | --------- | ------------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------- |
|    1 | `vento-shell`  | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz local; elegible para componer `AppShell` sin obligación de sidebar                  |
|    2 | `vento-shell`  | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema y estilos globales local; consume contrato visual compartido cuando exista release compatible |
|    3 | `vento-numera` | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz NUMERA                                                                              |
|    4 | `vento-numera` | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema NUMERA                                                                                        |
|    5 | `vento-numera` | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `KEEP LOCAL` | compositor local; prepara identidad, navegación, contexto y extensiones antes de UI compartida                    |
|    6 | `vento-numera` | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `MIGRATE`    | `AppShell` compuesto con slots ya resueltos                                                                       |
|    7 | `vento-numera` | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `MIGRATE`    | primitivas públicas aprobadas de `@vento/ui-web`                                                                  |
|    8 | `vento-numera` | `FAM-006` | `src/components/vento/standard/table.tsx`        | `MIGRATE`    | wrappers semánticos compartidos aprobados                                                                         |
|    9 | `vento-numera` | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `MIGRATE`    | superficie visual compartida con catálogo/autoridad externos                                                      |
|   10 | `vento-numera` | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `MIGRATE`    | superficie visual compartida con sesión/contexto externos                                                         |
|   11 | `vento-numera` | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `MIGRATE`    | superficie de marca compartida con metadata canónica                                                              |
|   12 | `vento-fogo`   | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz FOGO                                                                                |
|   13 | `vento-fogo`   | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema FOGO                                                                                          |
|   14 | `vento-fogo`   | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `KEEP LOCAL` | compositor local; conserva orquestación de producción y contexto fuera del package visual                         |
|   15 | `vento-fogo`   | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `MIGRATE`    | `AppShell` compuesto con slots ya resueltos                                                                       |
|   16 | `vento-fogo`   | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `MIGRATE`    | primitivas públicas aprobadas de `@vento/ui-web`                                                                  |
|   17 | `vento-fogo`   | `FAM-006` | `src/components/vento/standard/table.tsx`        | `MIGRATE`    | wrappers semánticos compartidos aprobados                                                                         |
|   18 | `vento-fogo`   | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `MIGRATE`    | superficie visual compartida con catálogo/autoridad externos                                                      |
|   19 | `vento-fogo`   | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `MIGRATE`    | superficie visual compartida con sesión/contexto externos                                                         |
|   20 | `vento-fogo`   | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `MIGRATE`    | superficie de marca compartida con metadata canónica                                                              |
|   21 | `vento-origo`  | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz ORIGO                                                                               |
|   22 | `vento-origo`  | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema ORIGO                                                                                         |
|   23 | `vento-origo`  | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `KEEP LOCAL` | compositor local; conserva extensiones empresariales de compras/proveedores                                       |
|   24 | `vento-origo`  | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `MIGRATE`    | `AppShell` compuesto con slots ya resueltos                                                                       |
|   25 | `vento-origo`  | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `MIGRATE`    | primitivas públicas aprobadas de `@vento/ui-web`                                                                  |
|   26 | `vento-origo`  | `FAM-006` | `src/components/vento/standard/table.tsx`        | `MIGRATE`    | wrappers semánticos compartidos aprobados                                                                         |
|   27 | `vento-origo`  | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `MIGRATE`    | superficie visual compartida con catálogo/autoridad externos                                                      |
|   28 | `vento-origo`  | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `MIGRATE`    | superficie visual compartida con sesión/contexto externos                                                         |
|   29 | `vento-origo`  | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `MIGRATE`    | superficie de marca compartida con metadata canónica                                                              |
|   30 | `vento-viso`   | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz VISO                                                                                |
|   31 | `vento-viso`   | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema VISO                                                                                          |
|   32 | `vento-viso`   | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `KEEP LOCAL` | compositor local; mantiene sesión operativa, contexto, dispositivos, navegación resuelta y gates fuera de UI      |
|   33 | `vento-viso`   | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `MIGRATE`    | `AppShell` compuesto con slots ya resueltos                                                                       |
|   34 | `vento-viso`   | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `MIGRATE`    | primitivas públicas aprobadas de `@vento/ui-web`                                                                  |
|   35 | `vento-viso`   | `FAM-006` | `src/components/vento/standard/table.tsx`        | `MIGRATE`    | wrappers semánticos compartidos aprobados                                                                         |
|   36 | `vento-viso`   | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `MIGRATE`    | superficie visual compartida con catálogo/autoridad externos                                                      |
|   37 | `vento-viso`   | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `MIGRATE`    | superficie visual compartida con sesión/contexto externos                                                         |
|   38 | `vento-viso`   | `FAM-019` | `src/components/vento/standard/page-header.tsx`  | `MIGRATE`    | PageHeader compartido reconciliado; preservar responsividad, semántica y acento requeridos                        |
|   39 | `vento-viso`   | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `MIGRATE`    | superficie de marca compartida con metadata canónica                                                              |
|   40 | `vento-pulso`  | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz PULSO                                                                               |
|   41 | `vento-pulso`  | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema PULSO                                                                                         |
|   42 | `vento-pulso`  | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `KEEP LOCAL` | compositor local; preserva composición POS/ventas sin absorber excepciones de datos o guard                       |
|   43 | `vento-pulso`  | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `MIGRATE`    | `AppShell` compuesto con slots ya resueltos                                                                       |
|   44 | `vento-pulso`  | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `MIGRATE`    | primitivas públicas aprobadas de `@vento/ui-web`                                                                  |
|   45 | `vento-pulso`  | `FAM-006` | `src/components/vento/standard/table.tsx`        | `MIGRATE`    | wrappers semánticos compartidos aprobados                                                                         |
|   46 | `vento-pulso`  | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `MIGRATE`    | superficie visual compartida con catálogo/autoridad externos                                                      |
|   47 | `vento-pulso`  | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `MIGRATE`    | superficie visual compartida con sesión/contexto externos                                                         |
|   48 | `vento-pulso`  | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `MIGRATE`    | superficie de marca compartida con metadata canónica                                                              |
|   49 | `vento-nexo`   | `FAM-001` | `src/app/layout.tsx`                             | `KEEP LOCAL` | entrypoint y composición raíz NEXO                                                                                |
|   50 | `vento-nexo`   | `FAM-002` | `src/app/globals.css`                            | `KEEP LOCAL` | integración de tema NEXO                                                                                          |
|   51 | `vento-nexo`   | `FAM-003` | `src/components/vento/standard/vento-shell.tsx`  | `KEEP LOCAL` | compositor local; preserva extensión `operational-context` y composición empresarial fuera de UI                  |
|   52 | `vento-nexo`   | `FAM-004` | `src/components/vento/standard/vento-chrome.tsx` | `MIGRATE`    | `AppShell` compuesto con slots ya resueltos                                                                       |
|   53 | `vento-nexo`   | `FAM-005` | `src/components/vento/standard/ui.tsx`           | `MIGRATE`    | primitivas públicas aprobadas de `@vento/ui-web`                                                                  |
|   54 | `vento-nexo`   | `FAM-006` | `src/components/vento/standard/table.tsx`        | `MIGRATE`    | wrappers semánticos compartidos aprobados                                                                         |
|   55 | `vento-nexo`   | `FAM-007` | `src/components/vento/standard/app-switcher.tsx` | `MIGRATE`    | superficie visual compartida con catálogo/autoridad externos                                                      |
|   56 | `vento-nexo`   | `FAM-008` | `src/components/vento/standard/profile-menu.tsx` | `MIGRATE`    | superficie visual compartida con sesión/contexto externos                                                         |
|   57 | `vento-nexo`   | `FAM-020` | `src/components/vento/standard/vento-logo.tsx`   | `MIGRATE`    | superficie de marca compartida con metadata canónica                                                              |

Comprobaciones de identidad:

```text
identidades esperadas = 57
identidades materializadas = 57
IDs de fila duplicados = 0
identidades sin decisión = 0
KEEP LOCAL = 20
MIGRATE = 37
```

---

#### 7. Contrato de composición compartida

##### 7.1. AppShell

Las seis copias runtime de Chrome migrarán hacia la intención estructural aprobada de `AppShell`.

La composición objetivo es:

```text
compositor local
→ resuelve sesión, permisos, contexto, navegación y dominio
→ prepara brand
→ prepara navigation
→ prepara context
→ prepara notices
→ prepara headerActions
→ entrega children
→ AppShell compone únicamente la estructura visual
```

La superficie compartida no resuelve:

- permisos;
- sesión;
- contexto efectivo;
- Supabase;
- RPC;
- navegación permitida;
- reglas de operación;
- side effects empresariales;
- rutas específicas de un dominio.

SHELL queda elegible para usar el mismo marco por composición, pero su launcher no recibe una navegación lateral artificial solo para imitar a las seis aplicaciones.

##### 7.2. TaskNavigation

La navegación local de cada consumidor se transforma antes de llegar a la superficie compartida:

```text
fuente propietaria de navegación
→ autorización y relevancia ya resueltas
→ adapter local
→ navigationId + intentCode + copy + href + estado presentacional
→ TaskNavigation
→ slot navigation de AppShell
```

El adapter local puede:

- mapear el router a `currentNavigationId`;
- mapear iconos;
- localizar labels y descripciones;
- excluir destinos clasificados como ocultos;
- preparar estados visuales admitidos.

El adapter local no puede:

- crear una taxonomía paralela de navegación;
- convertir `permissionCode` en copy;
- resolver autorización dentro del componente compartido;
- mantener una segunda lista canónica de aplicaciones;
- fabricar contexto desde URL, storage o parámetros visuales.

##### 7.3. Otras superficies compartidas

`AppSwitcher`, `ProfileMenu`, `VentoLogo`, primitivas, wrappers de tabla y PageHeader se adoptan únicamente desde APIs públicas aprobadas cuando existan releases compatibles. Su composición puede recibir datos y callbacks del consumidor, pero no absorber la autoridad de esos datos o acciones.

---

#### 8. Contrato de estilos, tema y responsividad

`globals.css` permanece local en los siete consumidores. La convergencia visual no significa reemplazarlo por una copia común.

Reglas:

1. cada aplicación conserva su integración de fuentes, reset, tema y CSS global requerido por su runtime;
2. los componentes compartidos consumen el contrato visual aprobado mediante tokens y estilos compatibles;
3. una aplicación puede definir valores de marca compatibles sin bifurcar la lógica del componente;
4. no se copian clases específicas de una aplicación al package como estándar transversal;
5. una variante visual solo se incorpora al contrato compartido si representa una necesidad transversal, no un detalle accidental de un consumidor;
6. `AppShell` es responsable del reflow estructural compartido; la aplicación conserva el layout interno de sus pantallas y procesos;
7. navegación móvil, disclosure y foco pertenecen al comportamiento presentacional compartido cuando formen parte de AppShell;
8. `TaskNavigation` no duplica el mecanismo responsive del shell;
9. la migración no puede introducir scroll horizontal estructural, pérdida de contenido esencial ni ocultamiento de contexto material;
10. la evidencia definitiva de accesibilidad, tema, movimiento reducido, densidad y responsive permanece en la puerta inmediatamente posterior.

---

#### 9. Extensiones locales legítimas

Una extensión permanece local cuando su responsabilidad pertenece al consumidor y no sustituye una API compartida.

| Clase de extensión                                                         | Tratamiento                                     |
| -------------------------------------------------------------------------- | ----------------------------------------------- |
| composición de pantallas y procesos de dominio                             | local                                           |
| formularios, tablas de negocio y paneles específicos                       | local                                           |
| resolución de sesión, permisos y contexto                                  | fuera del lote UI; propietarios AUTH/CTX        |
| consultas, RPC, mutaciones y acceso a datos                                | fuera del lote UI; propietarios DB/Supabase     |
| adapter de navegación entre modelo propietario y `TaskNavigation`          | local                                           |
| adapter de router/current route                                            | local                                           |
| mapping de iconografía o copy específico aprobado                          | local, mientras no redefina identidad semántica |
| metadata, fuentes, providers y layout raíz                                 | local                                           |
| tokens o valores de tema del consumidor compatibles con el contrato visual | local                                           |
| estructura duplicada de header/sidebar/main                                | no extensión; migra a `AppShell`                |
| primitivas duplicadas que reproducen el contrato compartido                | no extensión; migran                            |
| catálogo local autoritativo de aplicaciones                                | no extensión; no permanece como autoridad UI    |

La condición de legitimidad es doble:

```text
responsabilidad empresarial o de integración propia
+
no competir con una responsabilidad compartida aprobada
```

---

#### 10. Decisión por aplicación

##### 10.1. SHELL — lote 1

**Lote:** `devVentoGroup/vento-shell / SHELL-MIG-005`

**Membresía:** 2 ocurrencias; 2 `KEEP LOCAL`, 0 `MIGRATE` en el inventario heredado.

Decisiones:

- `layout.tsx` permanece local;
- `globals.css` permanece local;
- el launcher actual se conserva como composición empresarial propia;
- la elegibilidad de `AppShell` es por composición y no obliga a crear sidebar;
- el catálogo, acceso y sesión del launcher no se trasladan a `@vento/ui-web` por esta tarea;
- futuras superficies compartidas se consumen únicamente mediante release exacta compatible.

**Rollback:** restaurar snapshot SHELL previo, manifest, lockfile, configuración y combinación UI anterior certificada.

**Suspensión:** pérdida de identidad del launcher, modificación de autoridad por UI, navegación artificial, incompatibilidad de tema o dependencia no pública.

##### 10.2. NUMERA — lote 2

**Lote:** `devVentoGroup/vento-numera / SHELL-MIG-005`

**Membresía:** 9 ocurrencias; 3 `KEEP LOCAL`, 6 `MIGRATE`.

Decisiones:

- mantener `layout.tsx`, `globals.css` y `vento-shell.tsx`;
- migrar Chrome a `AppShell`;
- migrar kit UI, tabla, AppSwitcher, ProfileMenu y VentoLogo a superficies aprobadas;
- conservar en NUMERA composición financiera, analítica y administrativa propia;
- navegación se prepara en adapter local y llega a `TaskNavigation` sin payload de autorización.

**Rollback:** snapshot NUMERA previo completo, incluidos archivos locales consumidos y pins/configuración de package anteriores.

**Suspensión:** divergencia funcional o visual no aprobada, pérdida de navegación, estilos globales inesperados, import interno o dependencia de autoridad dentro de UI.

##### 10.3. FOGO — lote 3

**Lote:** `devVentoGroup/vento-fogo / SHELL-MIG-005`

**Membresía:** 9 ocurrencias; 3 `KEEP LOCAL`, 6 `MIGRATE`.

Decisiones:

- mantener entrypoint, CSS global y compositor local;
- migrar Chrome y las seis superficies UI inventariadas hacia contratos compartidos;
- conservar local la composición empresarial de recetas, producción y trazabilidad;
- excluir de este lote los candidatos inertes ya reservados para retiro por cero consumo;
- ninguna migración UI reactiva SSO o helpers retirables.

**Rollback:** snapshot FOGO anterior con archivos locales, manifest, lockfile y combinación UI previa.

**Suspensión:** aparece consumidor oculto de candidato inerte, paridad incompleta, regresión de producción/navegación o gate aplicable distinto de `PASS`.

##### 10.4. ORIGO — lote 4

**Lote:** `devVentoGroup/vento-origo / SHELL-MIG-005`

**Membresía:** 9 ocurrencias; 3 `KEEP LOCAL`, 6 `MIGRATE`.

Decisiones:

- mantener layout, CSS global y compositor local;
- migrar Chrome, primitivas, tabla, AppSwitcher, ProfileMenu y VentoLogo;
- conservar composición empresarial de compras, proveedores, recepción y abastecimiento;
- el helper consumido de sedes de empleados permanece fuera del lote UI y conserva su propietario de autorización/contexto;
- UI no modifica decisiones de territorio ni acceso.

**Rollback:** snapshot ORIGO anterior y combinación de package/configuración previa.

**Suspensión:** pérdida de extensión empresarial, cambio de alcance territorial, dependencia en helper AUTH desde UI compartida o ruptura de contrato público.

##### 10.5. VISO — lote 5

**Lote:** `devVentoGroup/vento-viso / SHELL-MIG-005`

**Membresía:** 10 ocurrencias; 3 `KEEP LOCAL`, 7 `MIGRATE`.

Decisiones:

- mantener layout, CSS global y `vento-shell.tsx` como compositor;
- preservar fuera de UI la resolución actual de sesión operativa, contexto, dispositivos compartidos, navegación y gates;
- migrar Chrome, kit UI, tabla, AppSwitcher, ProfileMenu y VentoLogo;
- migrar además el único `PageHeader` consumido confirmado de este universo;
- PageHeader debe conservar la semántica, responsividad y acento reconciliados por su contrato compartido;
- composición administrativa, calendario, personal y auditoría de VISO permanece local.

**Rollback:** snapshot VISO previo con archivos, manifest, lockfile y pin/configuración UI anterior.

**Suspensión:** pérdida de composición de dominio, cambio de gates, regresión de navegación, PageHeader no equivalente, import interno o estilo global no declarado.

##### 10.6. PULSO — lote 6

**Lote:** `devVentoGroup/vento-pulso / SHELL-MIG-005`

**Membresía:** 9 ocurrencias; 3 `KEEP LOCAL`, 6 `MIGRATE`.

Decisiones:

- mantener layout, CSS global y compositor local;
- migrar las seis superficies UI compartibles;
- conservar local la composición POS, pedidos, ventas, salón y demás dominio PULSO;
- excluir expresamente del lote cualquier variante Supabase alterna o rama de guard reservada a sus propietarios;
- la migración no modifica autorización, datos ni lógica de chat/pedidos.

**Rollback:** snapshot PULSO previo y combinación de package/configuración previa.

**Suspensión:** mezcla con AUTH o Supabase, ampliación de acceso, dependencia en variante reservada a retiro o regresión de UI/navegación.

##### 10.7. NEXO — lote 7

**Lote:** `devVentoGroup/vento-nexo / SHELL-MIG-005`

**Membresía:** 9 ocurrencias; 3 `KEEP LOCAL`, 6 `MIGRATE`.

Decisiones:

- mantener layout, CSS global y compositor local;
- preservar `operational-context` como extensión local explícita fuera del package visual;
- migrar Chrome, kit UI, tabla, AppSwitcher, ProfileMenu y VentoLogo;
- mantener separado el lote CI/script ya reconciliado por `SHELL-MIG-003`;
- el `page-header.tsx` sin consumidor confirmado no pertenece a este lote y permanece reservado al gate de retiro;
- la navegación NEXO se transforma en un adapter local hacia `TaskNavigation`, sin resolver permisos dentro de UI compartida.

**Rollback:** snapshot NEXO previo con composición local, manifest, lockfile, pins y configuración compatibles.

**Suspensión:** acoplamiento del package a NEXO, pérdida de `operational-context`, reintroducción de legacy por CI/script, retiro accidental de candidato inerte o regresión de navegación.

---

#### 11. Separación de otros lotes

`SHELL-MIG-005` no absorbe responsabilidades vecinas.

| Conjunto                                                                                | Tratamiento                                                        |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| autorización, guards, permisos, role override, contexto y factories Supabase consumidos | permanecen en lotes `SHELL-AUTH-005` y tareas propietarias         |
| NEXO workflow/script temporal de compatibilidad                                         | permanece bajo `SHELL-MIG-003`                                     |
| 11 archivos sin consumidor confirmado                                                   | permanecen bajo `SHELL-MIG-008`                                    |
| `page-header.tsx` NEXO sin consumidor confirmado                                        | permanece bajo `SHELL-MIG-008`                                     |
| `page-header.tsx` VISO consumido                                                        | pertenece a `SHELL-MIG-005`                                        |
| variante Supabase alterna de PULSO                                                      | permanece fuera del lote UI                                        |
| `operational-context` NEXO                                                              | permanece local y fuera del package UI                             |
| pruebas de accesibilidad/tema/movimiento reducido                                       | puerta `SHELL-MIG-006`                                             |
| pruebas de paridad completa por consumidor                                              | puerta `SHELL-MIG-007`                                             |
| retiro de copias consumidas                                                             | no ocurre antes de paridad, compatibilidad y rollback certificados |

---

#### 12. Precondiciones de materialización física

Un lote solo puede pasar de especificación documental a adopción física cuando cumpla, como mínimo:

1. release exacta de `@vento/ui-web` disponible e inmutable;
2. APIs públicas requeridas materializadas;
3. artefacto e integridad identificables;
4. compatibilidad aprobada para repositorio y commit exactos;
5. manifest y lockfile coherentes;
6. instalación bloqueada reproducible;
7. comandos aplicables de lint, typecheck, build y pruebas disponibles y ejecutables;
8. perfil de gates UI aplicable en `PASS`;
9. snapshot anterior certificado y restaurable;
10. extensiones locales inventariadas y delimitadas;
11. navegación propietaria preparada sin autoridad dentro del componente compartido;
12. impacto de CSS y tema clasificado;
13. ausencia de mezcla con cambios AUTH, datos, Supabase o retiro inerte;
14. observación y criterio de suspensión definidos para el repositorio exacto.

En el corte actual estas precondiciones no están completas. En particular, no existe adopción declarada de `@vento/ui-web` en los manifests revisados y faltan scripts declarados `typecheck` y `test` en los siete repositorios.

---

#### 13. Pruebas y observabilidad de los lotes

La materialización futura de cada repositorio deberá registrar:

- repositorio y commit base;
- commit de propuesta;
- versión exacta de `@vento/ui-web`;
- integridad y release de origen;
- manifest y lockfile;
- conjunto exacto de ocurrencias migradas;
- conjunto exacto de extensiones conservadas locales;
- resultado de instalación reproducible;
- lint;
- typecheck;
- build;
- pruebas automatizadas aplicables;
- render e hidratación cuando correspondan;
- navegación y estado activo;
- tema, CSS y responsive;
- accesibilidad aplicable;
- diferencias visuales justificadas;
- prueba de rollback;
- periodo de observación;
- cualquier consumidor legacy residual.

Una evidencia de otro commit, otra versión, otro manifest o un resultado omitido no cierra el lote.

`SHELL-MIG-006` conserva la validación especializada de accesibilidad, tema, movimiento reducido, densidad y responsive. `SHELL-MIG-007` conserva la paridad completa de consumidor. La presente tarea define qué debe migrarse y qué debe permanecer local; no anticipa resultados de esas puertas.

---

#### 14. Rollback por repositorio

El rollback es independiente y conserva la aplicación como unidad.

| Repositorio | Snapshot mínimo de rollback                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| SHELL       | commit consumidor previo + layout/globals + manifest + lockfile + configuración + combinación UI anterior                  |
| NUMERA      | commit previo + copias UI consumidas + compositor/extensiones locales + manifest + lockfile + pins anteriores              |
| FOGO        | commit previo + copias UI consumidas + compositor/extensiones locales + manifest + lockfile + pins anteriores              |
| ORIGO       | commit previo + copias UI consumidas + compositor/extensiones locales + manifest + lockfile + pins anteriores              |
| VISO        | commit previo + copias UI y PageHeader consumidos + compositor/extensiones locales + manifest + lockfile + pins anteriores |
| PULSO       | commit previo + copias UI consumidas + compositor/extensiones locales + manifest + lockfile + pins anteriores              |
| NEXO        | commit previo + copias UI consumidas + compositor + `operational-context` + manifest + lockfile + pins anteriores          |

Reglas:

- no se edita `node_modules` para revertir;
- no se cambia una versión publicada;
- manifest y lockfile se restauran juntos;
- rollback de UI no revierte por inferencia datos, migraciones, Supabase o configuración remota;
- no se restaura un bypass o comportamiento de autoridad prohibido;
- si el snapshot previo deja de ser compatible con el entorno actual, el lote queda bloqueado y requiere corrección hacia adelante o transición coordinada autorizada.

---

#### 15. Cobertura de requisitos existente

La tarea no introduce una obligación transversal nueva. La migración queda cubierta por requisitos vigentes que ya protegen:

- procedencia compartida, clasificación local y paridad de copias (`TREQ-SHELL-002`);
- catálogo único de aplicaciones (`TREQ-SHELL-003`);
- retiro seguro de consumidores (`TREQ-SHELL-004`);
- comandos reproducibles de validación (`TREQ-SHELL-005`);
- compatibilidad por versión y consumidor (`TREQ-SHELL-006`);
- rollback independiente (`TREQ-SHELL-007`);
- evidencia y trazabilidad de cambios (`TREQ-SHELL-008` y `TREQ-SHELL-009`);
- template, Chrome, autorización y reconciliación UI (`TREQ-SHELL-029` a `TREQ-SHELL-032`);
- integridad textual y visual del template (`TREQ-SHELL-035`);
- identidad, release, deprecación y retiro (`TREQ-SHELL-036` a `TREQ-SHELL-039`);
- separación entre identidad de navegación, ruta, copy y permiso (`TREQ-UX-041` a `TREQ-UX-050`);
- localización, accesibilidad y migración de navegación legacy (`TREQ-UX-056` y `TREQ-UX-058`);
- separación de autorización, relevancia y presentación (`TREQ-UX-059` y `TREQ-UX-062`);
- exclusión de elementos ocultos del árbol accesible y tab order (`TREQ-UX-074`).

Estas obligaciones ya abarcan la adopción, la preservación de extensiones, la navegación, la compatibilidad, la accesibilidad y el rollback que esta tarea asigna a identidades concretas.

---

#### 16. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Justificación:** la tarea materializa sobre las 57 identidades UI existentes las obligaciones de adopción compartida, preservación local, navegación, compatibilidad, validación y rollback que ya están registradas. No crea una regla adicional de autorización, datos, integridad, negocio, transición o experiencia que requiera una identidad de prueba nueva.

---

#### 17. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                                                                          |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BUILD     | NOT_EXECUTED   | La fase vigente es documental y no se materializó código ni una release consumible de `@vento/ui-web`; no se declara build de adopción.                                                                                                                            |
| LOCAL     | PASS           | El artefacto fue verificado estructuralmente: una sola tarea, metadata requerida, continuidad única, 57 identidades, conciliación 20 + 37, siete lotes base y ausencia de contenido reservado de entrega.                                                          |
| REMOTA    | PASS           | Se verificaron continuidad canónica, owner, dependencias, manifests y commits `main` de los siete repositorios; los seis consumidores externos conservan el corte inventariado y SHELL no presenta delta `src/` en el commit documental de incorporación anterior. |
| OPERATIVA | NOT_APPLICABLE | No existe adopción runtime autorizada en esta fase documental; no se atribuye evidencia operativa a una especificación.                                                                                                                                            |
| FÍSICA    | NOT_APPLICABLE | La tarea no modifica dispositivos, despliegues, repositorios consumidores, packages instalados ni Supabase.                                                                                                                                                        |

---

#### 18. Criterios de aceptación

`SHELL-MIG-005` queda documentalmente completa cuando:

- [x] se definen exactamente siete lotes base UI, uno por repositorio;
- [x] la ejecución futura usa una sola instancia `SHELL-MIG-005::<package_id>` por paquete, con selección y agregación explícitas de sus sublotes;
- [x] un paquete multi-repositorio conserva evidencia y rollback por consumidor y no puede ocultar un sublote fallido;
- [x] se preserva el orden serial heredado;
- [x] se reconcilian 57/57 ocurrencias UI;
- [x] 20 ocurrencias quedan explícitamente `KEEP LOCAL`;
- [x] 37 ocurrencias quedan explícitamente `MIGRATE`;
- [x] cada una de las 57 identidades tiene una decisión concreta;
- [x] no existen filas omitidas ni duplicadas;
- [x] Chrome converge conceptualmente a `AppShell` sin absorber autoridad ni datos;
- [x] navegación converge a `TaskNavigation` mediante adapter local y sin `permissionCode` como contrato visual;
- [x] `layout.tsx`, `globals.css` y los seis compositores `vento-shell.tsx` permanecen locales;
- [x] se preservan extensiones empresariales legítimas por aplicación;
- [x] VISO conserva el tratamiento explícito de su `PageHeader` consumido;
- [x] NEXO conserva `operational-context` local y separa su lote CI/script;
- [x] PULSO separa variantes de Supabase y guard del lote UI;
- [x] los candidatos inertes permanecen fuera de esta tarea;
- [x] cada repositorio conserva un rollback independiente;
- [x] se declaran las precondiciones que bloquean ejecución física actual;
- [x] la evidencia futura queda atribuible a commit, versión, manifest y lockfile;
- [x] no se ejecutan adopciones físicas, retiros, cambios AUTH, cambios Supabase ni despliegues;
- [x] se declaran cero cambios de requisitos de prueba.

---

#### 19. Límites

Esta tarea no:

- crea físicamente `@vento/ui-web`;
- publica un package o release;
- inventa subpaths de exports no materializados;
- modifica `package.json` o lockfiles consumidores;
- modifica imports, componentes o CSS runtime;
- modifica `layout.tsx`, `globals.css` o compositores consumidores;
- cambia autorización, guards, role override, contexto, sesión o middleware;
- modifica Supabase, SQL, RLS, RPC, Storage, Realtime, Edge Functions, datos, secretos o tipos generados;
- retira archivos sin consumidor confirmado;
- retira copias UI consumidas;
- ejecuta pruebas operativas, despliegues o validación física;
- adelanta la validación especializada reservada a `SHELL-MIG-006`;
- adelanta la paridad reservada a `SHELL-MIG-007`;
- ejecuta una instancia `SHELL-MIG-005::<package_id>` durante el marcador global;
- desarrolla ni modifica la tarea siguiente.

---

#### 20. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-004 — Sustituir la plantilla histórica por scaffold versionado`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-005 — Migrar componentes, Chrome y estilos por aplicación`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-006 — Verificar accesibilidad, tema y movimiento reducido`


### ✅ SHELL-MIG-006 — Verificar accesibilidad, tema y movimiento reducido

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-005 — Migrar componentes, Chrome y estilos por aplicación
**Tarea siguiente:** SHELL-MIG-007 — Definir contrato de paridad ejecutable por paquete
**Tipo de tarea:** documental; definición global única de la matriz de accesibilidad y paridad visual, reutilizable mediante instancias `SHELL-MIG-006::<package_id>`, con gate fail-closed y sin ejecución física durante el marcador global
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** CONTRATO_GLOBAL_ACCESIBILIDAD_UI_ESPECIFICADO; 1 matriz reutilizable; 7 subgates base de aplicación; 57 identidades UI reconciliadas; 0 instancias `SHELL-MIG-006::<package_id>` ejecutadas; 0 aplicaciones certificadas físicamente por esta tarea
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Establecer y aprobar la matriz documental que deberá demostrar, por cada aplicación incluida en la migración coordinada de interfaz web, que la adopción de las superficies compartidas conserva los contratos visuales y de accesibilidad aplicables en tokens y tema, contraste, foco, teclado, reducción de movimiento, densidad y comportamiento responsive.

La modalidad canónica es `TEMPLATE_PER_PACKAGE`: esta tarea aprueba una sola vez la matriz y sus oráculos; la ejecución futura ocurre mediante `SHELL-MIG-006::<package_id>` sobre los consumidores realmente alcanzados por el mismo paquete.

La tarea no declara que exista una migración física validada. La adopción de `@vento/ui-web` todavía no está materializada en los consumidores y la fase vigente continúa siendo exclusivamente documental. Por tanto, esta tarea cierra mediante una matriz completa, trazable y fail-closed que fija exactamente qué deberá probarse y qué condición convierte cada consumidor seleccionado en apto para la verificación posterior.

---

#### 2. Resultado canónico

Queda aprobada una única matriz global de accesibilidad y paridad visual para los siete lotes base heredados de `SHELL-MIG-005`. La matriz funciona como plantilla; no crea siete instancias físicas de esta tarea.

El resultado material de esta tarea es:

1. **7/7 aplicaciones** con una decisión explícita de gate de accesibilidad y paridad visual.
2. **57/57 ocurrencias UI heredadas** reconciliadas contra la migración precedente, sin identidades faltantes ni duplicadas.
3. **20/57 ocurrencias `KEEP LOCAL`** preservadas como fronteras propietarias del consumidor.
4. **37/57 ocurrencias `MIGRATE`** obligadas a converger únicamente a superficies públicas aprobadas de la UI compartida.
5. **7/7 subgates base de aplicación en `BLOQUEADO` para evidencia física**, porque todavía no existe adopción material de `@vento/ui-web` que permita ejecutar una comparación válida post-migración.
6. **0 instancias `SHELL-MIG-006::<package_id>` ejecutadas**.
7. **0 gates declarados `PASS` por inferencia documental**.
8. **0 dependencias CSS legacy no declaradas permitidas** en una futura evidencia válida.
9. **0 cambios físicos** sobre repositorios consumidores, paquetes, CSS, configuración, navegación, código o Supabase.

La aprobación de esta tarea aprueba la **matriz y sus reglas de decisión**; no certifica todavía accesibilidad ni paridad visual de una migración inexistente.

##### 2.1. Contrato de la instancia `SHELL-MIG-006::<package_id>`

La instancia utiliza el mismo `package_id` del ciclo de implementación y selecciona exclusivamente los consumidores UI afectados por `SHELL-MIG-005::<package_id>` o por otra modificación UI expresamente incluida en el mismo paquete.

Debe conservar:

- `package_id`, unidad de implementación y `DELIV-PKG` aplicables;
- lista exacta de repositorios y commits candidatos;
- filas UI seleccionadas y disposición `KEEP LOCAL` o `MIGRATE`;
- baseline visual y accesible por consumidor;
- evidencia por dimensión obligatoria;
- resultado de cada subgate de aplicación;
- evidencia agregada del paquete;
- rollback o referencia al snapshot previo de cada consumidor;
- lineage hacia `SHELL-MIG-005::<package_id>`, `SHELL-MIG-007::<package_id>` y `SHELL-CI-020..024::<package_id>`.

Reglas de agregación:

1. existe una sola instancia `SHELL-MIG-006::<package_id>`;
2. un paquete multi-repositorio conserva un subgate por consumidor, pero no crea una instancia distinta por aplicación;
3. la instancia solo es `PASS` cuando todos los subgates aplicables están en `PASS`;
4. cualquier `FAIL`, evidencia `STALE`, falta de baseline o dimensión obligatoria no ejecutada bloquea la instancia completa;
5. si el paquete no afecta ninguna superficie UI gobernada, `NOT_APPLICABLE` exige evidencia de selección vacía;
6. si `SHELL-MIG-005::<package_id>` seleccionó una identidad UI, `SHELL-MIG-006::<package_id>` no puede declararse no aplicable;
7. evidencia de otro paquete, commit o consumidor no se transfiere por semejanza.

La instancia física solo puede ejecutarse después de `SHELL-CI-001..019`, del `DELIV-PKG` del paquete y de `E5-GATE-008::<package_id>`, dentro del ciclo `SHELL-CI-020..024::<package_id>`.

---

#### 3. Baseline heredada y corte verificable

La unidad de reconciliación continúa siendo la ocurrencia UI definida por repositorio, familia y archivo en la migración precedente.

|     Orden | Aplicación / repositorio              | Commit base verificable                    | Ocurrencias UI | `KEEP LOCAL` | `MIGRATE` | Estado de adopción compartida al corte |
| --------: | ------------------------------------- | ------------------------------------------ | -------------: | -----------: | --------: | -------------------------------------- |
|         1 | SHELL — `devVentoGroup/vento-shell`   | `c84cdace5dd4ec1014bb7f8f3324f26056718014` |              2 |            2 |         0 | No materializada                       |
|         2 | NUMERA — `devVentoGroup/vento-numera` | `1b48a5da425d92e19ed89cf175b1dccc4cd960e1` |              9 |            3 |         6 | No materializada                       |
|         3 | FOGO — `devVentoGroup/vento-fogo`     | `b6b9ed00e5267cabaac1a5a1090d93d5f60e86f2` |              9 |            3 |         6 | No materializada                       |
|         4 | ORIGO — `devVentoGroup/vento-origo`   | `b7a8303fa078ef087f522b6c99059ababfc27472` |              9 |            3 |         6 | No materializada                       |
|         5 | VISO — `devVentoGroup/vento-viso`     | `47322403f3c64e83ae0c4a2f68c05d47093e5bb4` |             10 |            3 |         7 | No materializada                       |
|         6 | PULSO — `devVentoGroup/vento-pulso`   | `71e0184486b5fe11e0a42435baf4024807a80efd` |              9 |            3 |         6 | No materializada                       |
|         7 | NEXO — `devVentoGroup/vento-nexo`     | `142c4d696221e3ce3fda4ed3b62f3d1fe5b58799` |              9 |            3 |         6 | No materializada                       |
| **Total** | **7 aplicaciones**                    | —                                          |         **57** |       **20** |    **37** | **0 adopciones físicas certificadas**  |

La evidencia futura solo será atribuible si identifica el commit consumidor realmente probado. Si cualquiera de estos commits deja de ser el corte de ejecución, la matriz deberá registrar el nuevo commit exacto; la evidencia del commit anterior no podrá trasladarse por equivalencia supuesta.

---

#### 4. Reconciliación exacta de las 57 identidades UI

Convenciones de la matriz:

- `K`: `KEEP LOCAL` — la identidad permanece como responsabilidad local explícita y deberá probar que su composición o estilo propietario sigue siendo compatible con las superficies compartidas que consuma.
- `M`: `MIGRATE` — la identidad deberá sustituir su copia local consumida por una superficie pública aprobada de la UI compartida.
- `—`: la familia no forma parte del lote UI de esa aplicación.

| Familia / archivo canónico de inventario                     | SHELL | NUMERA | FOGO  | ORIGO | VISO   | PULSO | NEXO  |  Total |
| ------------------------------------------------------------ | ----- | ------ | ----- | ----- | ------ | ----- | ----- | -----: |
| `FAM-001` · `src/app/layout.tsx`                             | K     | K      | K     | K     | K      | K     | K     |      7 |
| `FAM-002` · `src/app/globals.css`                            | K     | K      | K     | K     | K      | K     | K     |      7 |
| `FAM-003` · `src/components/vento/standard/vento-shell.tsx`  | —     | K      | K     | K     | K      | K     | K     |      6 |
| `FAM-004` · `src/components/vento/standard/vento-chrome.tsx` | —     | M      | M     | M     | M      | M     | M     |      6 |
| `FAM-005` · `src/components/vento/standard/ui.tsx`           | —     | M      | M     | M     | M      | M     | M     |      6 |
| `FAM-006` · `src/components/vento/standard/table.tsx`        | —     | M      | M     | M     | M      | M     | M     |      6 |
| `FAM-007` · `src/components/vento/standard/app-switcher.tsx` | —     | M      | M     | M     | M      | M     | M     |      6 |
| `FAM-008` · `src/components/vento/standard/profile-menu.tsx` | —     | M      | M     | M     | M      | M     | M     |      6 |
| `FAM-019` · `src/components/vento/standard/page-header.tsx`  | —     | —      | —     | —     | M      | —     | —     |      1 |
| `FAM-020` · `src/components/vento/standard/vento-logo.tsx`   | —     | M      | M     | M     | M      | M     | M     |      6 |
| **Total por aplicación**                                     | **2** | **9**  | **9** | **9** | **10** | **9** | **9** | **57** |

Conciliación obligatoria: `20 K + 37 M = 57`. Ninguna identidad de autorización, contexto, Supabase, middleware, script, CI, retiro o lógica empresarial se incorpora a este gate UI por proximidad física o por compartir archivo consumidor.

---

#### 5. Dimensiones obligatorias de accesibilidad y paridad visual

Toda aplicación deberá producir evidencia independiente para las siguientes dimensiones. Una dimensión no ejecutada, incompleta, no atribuible o apoyada en una dependencia no declarada impide el `PASS` global.

| Dimensión                               | Contrato que debe conservarse                                                                                                                                                                   | Evidencia mínima admisible                                                                                                       | Condición de bloqueo                                                                                                              |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Tokens y tema                           | La superficie renderizada utiliza tokens públicos aprobados y extensiones locales explícitas; el tema no depende de valores legacy ocultos ni de orden accidental de CSS.                       | Inventario de tokens efectivos, origen de cada override material y comparación de estilos computados en estados representativos. | Token sin origen, override no inventariado, divergencia visual material no aprobada o dependencia de CSS legacy no declarada.     |
| Contraste                               | Texto, iconografía significativa, controles, foco, estados y superficies conservan el contraste exigido por el contrato de accesibilidad aplicable.                                             | Medición reproducible sobre combinaciones relevantes y estado de aprobación por caso; no basta inspección visual.                | Caso obligatorio sin medición, resultado inferior al criterio aplicable o color usado como única señal.                           |
| Foco                                    | El foco es perceptible, coherente y no queda oculto por overlays, shells, menús, scroll o estados responsive.                                                                                   | Recorrido reproducible de foco, captura o registro del elemento enfocado y verificación de foco visible en estados interactivos. | Foco invisible, perdido, atrapado, desplazado a elemento irrelevante o dependiente de estilo legacy no declarado.                 |
| Teclado                                 | La tarea y navegación aplicables pueden recorrerse y operarse por teclado sin crear atajos que fabriquen autoridad ni omitan controles necesarios.                                              | Secuencia de tabulación, activación, cierre, retorno de foco y ausencia de trampas en componentes afectados.                     | Trap de teclado, orden incoherente, control inaccesible, retorno de foco roto o acción solo disponible por puntero.               |
| Movimiento reducido                     | La preferencia de reducción de movimiento se respeta en transiciones, animaciones, desplazamientos y feedback; ningún movimiento decorativo es requisito para comprender o completar una tarea. | Ejecución explícita con preferencia de movimiento reducido y comparación de estados antes/después.                               | Animación no reducida cuando debe reducirse, pérdida de información al reducirla o interacción dependiente de movimiento.         |
| Densidad                                | La densidad aplicable conserva legibilidad, jerarquía, objetivos interactivos, datos necesarios y separación entre operación ordinaria y controles secundarios.                                 | Comparación por variantes de densidad realmente soportadas, con overflow, truncamiento y targets interactivos registrados.       | Contenido esencial truncado, objetivos impracticables, solapamiento, pérdida de jerarquía o aparición de controles irrelevantes.  |
| Responsive                              | La composición conserva navegación, contenido, acciones, modales, tablas y estados aplicables en los tamaños declarados por el consumidor y por el contrato compartido.                         | Matriz reproducible de viewports soportados por la superficie, con comportamiento observado y diferencias justificadas.          | Overflow destructivo, acción inaccesible, navegación perdida, contenido oculto sin alternativa o viewport obligatorio no probado. |
| Hidratación y frontera cliente/servidor | La adopción compartida no introduce divergencias visuales, pérdida de estado ni reordenamiento que invalide foco o navegación durante hidratación.                                              | Build aplicable, observación de hidratación y ausencia de errores atribuibles a la superficie migrada.                           | Error de hidratación, contenido interactivo inconsistente o dependencia no pública entre servidor y cliente.                      |

---

#### 6. Matriz aprobada por aplicación

`ESPECIFICADO/BLOQUEADO` significa que el criterio documental queda aprobado, pero todavía no existe evidencia física post-migración suficiente para certificarlo.

| Aplicación | Tokens / tema          | Contraste              | Foco / teclado         | Movimiento reducido    | Densidad               | Responsive             | CSS declarada          | Gate de aplicación |
| ---------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- | ------------------ |
| SHELL      | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |
| NUMERA     | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |
| FOGO       | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |
| ORIGO      | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |
| VISO       | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |
| PULSO      | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |
| NEXO       | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | ESPECIFICADO/BLOQUEADO | **BLOQUEADO**      |

No existe excepción por similitud entre repositorios. Una aplicación solo podrá cambiar su gate a `PASS` con evidencia propia atribuible a su commit, sus extensiones locales, sus viewports aplicables y la versión exacta del paquete compartido consumido.

---

#### 7. Regla canónica para CSS y extensiones visuales locales

Toda regla CSS, token, clase global, theme override, stylesheet, utility, variable o adaptación visual que afecte una superficie incluida en el gate deberá quedar clasificada en una de estas dos categorías antes de producir evidencia válida:

1. **`SHARED_PUBLIC`**: superficie o estilo público del paquete compartido, consumido mediante una API o mecanismo documentado y versionado.
2. **`LOCAL_OWNER_EXTENSION`**: extensión que permanece en el repositorio consumidor porque expresa composición, branding, layout, contexto o comportamiento visual legítimamente propietario de esa aplicación.

Una extensión `LOCAL_OWNER_EXTENSION` deberá declarar como mínimo:

- repositorio propietario;
- archivo que la contiene;
- superficie afectada;
- propósito;
- dependencia pública compartida sobre la que se apoya, cuando exista;
- tokens o variables que sobrescribe;
- alcance responsive o de densidad;
- impacto sobre foco, teclado o movimiento cuando aplique;
- mecanismo de rollback.

Quedan expresamente bloqueados:

- CSS sin propietario o sin archivo identificado;
- selectores legacy conservados solo porque “la pantalla se ve igual”;
- dependencia en orden accidental de imports;
- duplicación local de tokens o estilos públicos sin clasificación;
- override global que altere otra aplicación o superficie sin contrato;
- reglas que oculten problemas de foco, contraste, overflow o hidratación;
- estilos no declarados utilizados para justificar un resultado de paridad.

La ausencia de una regla en esta clasificación no demuestra que sea inocua: si participa en el render evaluado y no puede atribuirse, el gate queda `BLOQUEADO`.

---

#### 8. Contrato de evidencia por aplicación

Cada ejecución futura del gate deberá quedar unida como una unidad indivisible a:

- aplicación y repositorio;
- commit exacto del consumidor;
- versión exacta de `@vento/ui-web` y de cualquier dependencia compartida relevante;
- lockfile efectivo;
- inventario de las identidades UI del lote;
- inventario de CSS y extensiones locales que intervienen en el render;
- configuración de tema y densidad aplicable;
- navegador o runtime usado cuando sea material para el resultado;
- viewport o conjunto de viewports realmente ejecutados;
- preferencia de movimiento usada;
- comando, herramienta o procedimiento reproducible;
- resultado por dimensión;
- evidencia de rollback disponible.

Una evidencia visual aislada, una captura de pantalla, un build exitoso o una inspección manual sin estos vínculos no certifican por sí solos la matriz.

---

#### 9. Estados del gate y regla fail-closed

Los estados operativos de la evidencia conservan la semántica del gate de paquetes compartidos:

- `PASS`: todas las dimensiones obligatorias aplicables se ejecutaron, son atribuibles y cumplen el contrato.
- `FAIL`: al menos una dimensión ejecutada incumple el contrato.
- `BLOCKED`: falta una precondición necesaria para ejecutar o atribuir la evidencia.
- `STALE`: la evidencia fue válida para otro commit, versión, CSS efectivo, configuración o combinación de consumidor y paquete.
- `NOT_APPLICABLE`: la dimensión fue descartada de forma explícita y justificable para esa superficie concreta.

Reglas vinculantes:

1. `FAIL`, `BLOCKED` o `STALE` en una dimensión obligatoria impide el `PASS` global de la aplicación.
2. Evidencia omitida, parcial, no reproducible o no atribuible no equivale a `PASS`.
3. Un cambio material en paquete, commit consumidor, lockfile, tokens, CSS efectivo, configuración de tema, densidad o frontera de hidratación invalida la evidencia afectada y la devuelve a `STALE` hasta nueva ejecución.
4. La aprobación documental de esta matriz no convierte ningún gate físico actual en `PASS`.
5. Ningún repositorio puede heredar el resultado de otro aunque ambos compartan las mismas APIs públicas.

---

#### 10. Reglas específicas por aplicación

| Aplicación | Condición local que debe preservarse además del contrato compartido                                                                       | Mezcla expresamente prohibida en este gate                                                                  | Condición mínima de salida de `BLOQUEADO`                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| SHELL      | `layout.tsx` y `globals.css` permanecen propietarios y cualquier consumo compartido debe respetar su composición raíz y tokens efectivos. | Convertir el gate en migración de autenticación, contexto, Supabase o lógica del Hub.                       | Adopción material elegible, CSS clasificada y evidencia completa del perfil UI para el commit probado.  |
| NUMERA     | Conservar extensiones locales inventariadas y la semántica visual propia de sus superficies administrativas.                              | Eliminar extensiones locales por similitud visual o mezclar cambios de autorización.                        | Versión compatible adoptada, extensiones declaradas y matriz completa ejecutada.                        |
| FOGO       | Mantener separados los candidatos inertes reservados para retiro y probar solo identidades UI consumidas del lote.                        | Retirar candidatos sin consumidor o incorporar ese retiro a la comparación visual.                          | Adopción UI material, inventario de CSS efectivo y evidencia por commit FOGO.                           |
| ORIGO      | Preservar extensiones empresariales locales y su composición sin trasladarlas al paquete compartido por conveniencia.                     | Convertir reglas de negocio, contexto o autorización en props de presentación para lograr paridad.          | Superficies compartidas adoptadas, extensiones clasificadas y dimensiones completas ejecutadas.         |
| VISO       | Preservar composición de dominio y tratar su `page-header.tsx` consumido como parte explícita del lote migrable.                          | Confundir el PageHeader consumido con artefactos inertes reservados para retiro.                            | Las 10 identidades reconciliadas, CSS declarada y evidencia completa atribuible al commit VISO.         |
| PULSO      | Preservar la composición UI sin mezclar la variante Supabase ni las ramas de guard/autorización ajenas a este lote.                       | Usar cambios de datos, auth o retiro para conseguir una aparente paridad visual.                            | Adopción UI aislada, extensiones declaradas y gate UI completo sin cambios ajenos.                      |
| NEXO       | Preservar la extensión local de contexto fuera del paquete UI y mantener separado el lote temporal CI/script.                             | Acoplar `@vento/ui-web` a contexto empresarial NEXO o mezclar el mecanismo temporal de patch con este gate. | Adopción UI aislada, extensión de contexto intacta, CSS declarada y evidencia completa por commit NEXO. |

---

#### 11. Secuencia de verificación futura

Cuando la fase de implementación autorice la adopción física, cada aplicación deberá seguir esta secuencia sin saltos:

1. fijar commit base y snapshot de rollback;
2. fijar versión exacta de las superficies compartidas;
3. confirmar las identidades UI del lote aplicable;
4. clasificar todo CSS efectivo como `SHARED_PUBLIC` o `LOCAL_OWNER_EXTENSION`;
5. ejecutar instalación reproducible y validaciones técnicas disponibles;
6. ejecutar tokens/tema y contraste;
7. ejecutar foco y teclado;
8. ejecutar movimiento reducido;
9. ejecutar densidad y responsive;
10. verificar hidratación cuando aplique;
11. registrar resultado y evidencia por dimensión;
12. verificar rollback independiente;
13. emitir el estado agregado del gate.

La secuencia no autoriza la implementación desde esta tarea. Define únicamente el orden mínimo para que la evidencia futura sea válida y no mezcle cambios de otras familias.

---

#### 12. Rollback y caducidad de evidencia

El rollback de una aplicación deberá poder restaurar su snapshot previo, el pin o configuración compartida anterior y las extensiones locales legítimas anteriores sin:

- restaurar CSS legacy no declarado como dependencia oculta;
- introducir copias locales nuevas de superficies públicas;
- mezclar cambios de autorización, contexto, Supabase o datos;
- invalidar el rollback independiente de las otras aplicaciones.

El rollback no convierte automáticamente la evidencia anterior en vigente. Una combinación restaurada deberá demostrar que coincide exactamente con el commit, versión, configuración y CSS a los que pertenecía la evidencia recuperada; de lo contrario su estado será `STALE`.

---

#### 13. Decisiones vinculantes

1. La unidad de aprobación de esta tarea es la matriz documental de siete aplicaciones, no una certificación runtime.
2. Las 57 ocurrencias UI heredadas quedan completamente reconciliadas: 20 `KEEP LOCAL` y 37 `MIGRATE`.
3. No se crean lotes nuevos; se conservan los siete lotes base de migración definidos previamente.
4. El resultado de una aplicación no se hereda a otra.
5. Ningún gate físico actual es `PASS` porque la adopción compartida aún no está materializada.
6. `@vento/ui-web` solo puede certificarse mediante superficies públicas, versionadas y compatibles con el consumidor exacto.
7. `layout.tsx`, `globals.css` y las composiciones locales clasificadas `KEEP LOCAL` no son deuda por definición; son fronteras propietarias que también deben superar la matriz.
8. Una copia local clasificada `MIGRATE` no puede conservarse silenciosamente para obtener paridad visual.
9. Todo CSS que participe en el resultado deberá ser público compartido o extensión local declarada.
10. Capturas visuales aisladas no sustituyen mediciones, recorridos de teclado, verificación de foco, reduced-motion ni evidencia responsive.
11. Contraste y accesibilidad no pueden inferirse únicamente de que el diseño “se vea igual”.
12. El gate es fail-closed ante evidencia faltante, parcial, desactualizada o no atribuible.
13. Cualquier cambio material en commit, paquete, lockfile, tokens, CSS o configuración puede convertir evidencia previa en `STALE`.
14. La verificación de accesibilidad no modifica decisiones de autorización ni convierte visibilidad en permiso.
15. Las extensiones NEXO, PULSO, ORIGO, VISO, FOGO y NUMERA permanecen bajo sus propietarios y no se trasladan al paquete UI sin una tarea que lo autorice.
16. Los candidatos de retiro permanecen fuera de este gate.
17. La evidencia de paridad completa posterior debe conservar rollback independiente por aplicación.
18. La tarea siguiente permanece reservada y no se ejecuta desde este documento.

---

#### 14. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Creados:** 0.

**Modificados:** 0.

La obligación de validar componentes compartidos, compatibilidad por consumidor, rollback, accesibilidad, foco, teclado, movimiento, navegación y protección frente a dependencias visuales no declaradas ya está cubierta por el registro canónico vigente. Esta tarea materializa la matriz de aplicación de esas obligaciones sobre los siete consumidores sin introducir una regla verificable independiente que requiera una nueva identidad de prueba.

---

#### 15. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                                                   |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | La fase documental no autoriza adopción física ni existe una combinación post-migración sobre la que un build pueda demostrar paridad de esta tarea.                                                                                        |
| LOCAL     | PASS           | El artefacto materializa 7/7 aplicaciones y reconcilia 57/57 identidades UI como 20 `KEEP LOCAL` y 37 `MIGRATE`; la estructura, cardinalidad, continuidad y reglas fail-closed fueron verificadas sobre el archivo entregado.               |
| REMOTA    | PASS           | La continuidad, el archivo propietario, las dependencias de migración/compatibilidad/gates, los commits consumidores y las fuentes canónicas necesarias fueron contrastados contra el estado remoto vigente de los repositorios accesibles. |
| OPERATIVA | NOT_APPLICABLE | No existe todavía una adopción UI post-migración autorizada que pueda someterse a recorrido operativo sin inventar evidencia.                                                                                                               |
| FÍSICA    | NOT_APPLICABLE | No se autoriza en esta fase ejecución física en navegador, dispositivo, tecnología de asistencia o estación real.                                                                                                                           |

---

#### 16. Criterios de aceptación

La tarea queda documentalmente aceptada cuando se cumplen simultáneamente estas condiciones:

1. existen exactamente 7 filas de aplicación en la matriz de paridad como subgates base reutilizables;
2. las 57 identidades heredadas están reconciliadas sin faltantes ni duplicados;
3. la distribución conserva exactamente 20 `KEEP LOCAL` y 37 `MIGRATE`;
4. cada aplicación tiene decisión explícita para tokens/tema, contraste, foco/teclado, movimiento reducido, densidad, responsive y CSS declarada;
5. ningún gate físico se declara `PASS` sin adopción y evidencia reales;
6. el contrato de evidencia vincula versión de paquete, commit consumidor, CSS efectivo y configuración aplicable;
7. toda dependencia visual queda clasificada como compartida pública o extensión local propietaria;
8. cualquier CSS legacy no declarado bloquea la certificación;
9. la evidencia faltante, parcial o desactualizada falla de forma cerrada;
10. las responsabilidades de autorización, contexto, datos y lógica empresarial permanecen fuera del paquete UI;
11. el rollback independiente está definido por aplicación;
12. no se crean ni modifican requisitos de prueba;
13. no se realizan cambios físicos durante esta tarea;
14. existe una sola instancia `SHELL-MIG-006::<package_id>` por paquete y los subgates de consumidores afectados se agregan sin perder evidencia ni rollback por repositorio;
15. `NOT_APPLICABLE` exige selección vacía demostrable y no puede ocultar una identidad UI seleccionada por `SHELL-MIG-005::<package_id>`;
16. la evidencia no se transfiere entre `package_id`, commits o consumidores;
17. la continuidad conserva `SHELL-MIG-007` exclusivamente como siguiente tarea reservada.

---

#### 17. Límites

Esta tarea no:

- instala ni publica `@vento/ui-web`;
- cambia dependencias ni lockfiles de consumidores;
- modifica `layout.tsx`, `globals.css` o componentes locales;
- migra Chrome, kits, tablas, AppSwitcher, ProfileMenu, VentoLogo o PageHeader;
- ejecuta navegadores, lectores de pantalla, dispositivos o estaciones físicas;
- ejecuta pruebas de paridad post-migración;
- modifica autenticación, permisos, contexto, SSO, middleware o lógica empresarial;
- modifica Supabase, esquemas, migraciones, datos, RLS, funciones o tipos generados;
- retira candidatos legacy o artefactos sin consumidor;
- crea un lote adicional de migración;
- declara compatible una versión compartida todavía no probada contra un consumidor exacto;
- convierte una evidencia visual en prueba de accesibilidad completa;
- ejecuta una instancia `SHELL-MIG-006::<package_id>` durante el marcador global;
- desarrolla ni ejecuta la tarea siguiente.

---

#### 18. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-005 — Migrar componentes, Chrome y estilos por aplicación`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-006 — Verificar accesibilidad, tema y movimiento reducido`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-007 — Definir contrato de paridad ejecutable por paquete`


### ✅ SHELL-MIG-007 — Definir contrato de paridad ejecutable por paquete

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-006 — Verificar accesibilidad, tema y movimiento reducido
**Tarea siguiente:** SHELL-MIG-008 — Definir gate de retiro legacy y certificación por paquete
**Tipo de tarea:** documental; definición global única de un contrato de paridad reutilizable con ejecución posterior por paquete mediante instancias `SHELL-MIG-007::<package_id>`; no ejecuta pruebas físicas ni reabre el marcador global durante cada paquete
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** CONTRATO_GLOBAL_DE_PARIDAD_ESPECIFICADO; 1 plantilla reutilizable; 7 dimensiones de paridad; 8 familias de fixtures; 8 oráculos; 7 clases de evidencia de instancia; 0 instancias ejecutadas; 0 consumidores certificados por esta tarea
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-007` define una sola vez el contrato con el que cada paquete de cambio deberá demostrar paridad de consumidor antes de considerarse apto para continuar su readiness.

La tarea separa expresamente dos momentos:

```text
MARCADOR GLOBAL SHELL-MIG-007
→ define una sola matriz, fixtures, oráculos, evidencia, excepciones y gates
→ se aprueba una sola vez
→ no ejecuta todavía pruebas de paquetes

INSTANCIA SHELL-MIG-007::<package_id>
→ aplica el contrato global al alcance exacto de un paquete ya autorizado
→ compara baseline y candidato reales
→ conserva evidencia propia
→ no reabre ni vuelve a aprobar el marcador global
```

La paridad no significa conservar bytes, estructura interna o defectos legacy. Significa demostrar que todo comportamiento observable protegido permanece equivalente o que cualquier diferencia está respaldada por una decisión canónica aprobada y un oráculo explícito.

---

#### 2. Modalidad canónica y ciclo de ejecución

La modalidad de esta tarea es `TEMPLATE_PER_PACKAGE`.

La instancia se ejecuta en el readiness de `SHELL-CI-021::<package_id>` y conserva lineage dentro del ciclo completo `SHELL-CI-020..024::<package_id>` hasta el cierre de evidencia del mismo paquete.

| Capa                     | Identidad                     | Momento                                                                 | Resultado                                                                                  |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| definición global        | `SHELL-MIG-007`               | ahora, después de `SHELL-MIG-005` y `SHELL-MIG-006`                     | contrato reusable aprobado, sin ejecución física                                           |
| instancia de paquete     | `SHELL-MIG-007::<package_id>` | después de los habilitadores y del inicio de implementación del paquete | evidencia real de paridad del paquete y sus consumidores afectados                         |
| integración de readiness | misma instancia               | dentro de `SHELL-CI-021::<package_id>`                                  | la evidencia queda disponible para la decisión de readiness, sin aprobarla automáticamente |

Dependencias para desarrollar el marcador global:

- `SHELL-MIG-005`;
- `SHELL-MIG-006`.

Dependencias para ejecutar una instancia:

- `SHELL-CI-001`;
- `SHELL-CI-007` a `SHELL-CI-013`;
- `E5-GATE-008::<package_id>`;
- `SHELL-CI-020::<package_id>`.

La existencia de las dependencias de ejecución no bloquea la definición global actual y no autoriza a ejecutar una instancia antes de que su paquete posea un candidato materializado y verificable.

---

#### 3. Resultado material

Queda definido un contrato global completo con las siguientes unidades:

| Unidad                                    | Cantidad | Resultado                                                                                 |
| ----------------------------------------- | -------: | ----------------------------------------------------------------------------------------- |
| plantilla global de instancia             |    **1** | definida                                                                                  |
| dimensiones obligatorias de paridad       |    **7** | definidas                                                                                 |
| familias reutilizables de fixtures        |    **8** | definidas                                                                                 |
| oráculos reutilizables                    |    **8** | definidos                                                                                 |
| clases de evidencia por instancia         |    **7** | definidas                                                                                 |
| estados posibles de una dimensión         |    **5** | definidos                                                                                 |
| consumidores heredados de `SHELL-MIG-005` |    **7** | conservados como universo de referencia, no como alcance automático de todos los paquetes |
| ocurrencias UI heredadas                  |   **57** | conservadas como inventario de referencia; 20 `KEEP LOCAL` y 37 `MIGRATE`                 |
| instancias de paquete ejecutadas          |    **0** | no corresponde en esta tarea global                                                       |
| pruebas runtime ejecutadas                |    **0** | no corresponde en esta tarea global                                                       |
| rollbacks ensayados                       |    **0** | se exigen a cada instancia, no se inventan en la definición global                        |

---

#### 4. Baseline heredada de migración

El contrato reutiliza sin alterar el universo aprobado por `SHELL-MIG-005` y el gate visual definido por `SHELL-MIG-006`.

| Consumidor | Ocurrencias UI | `KEEP LOCAL` | `MIGRATE` |
| ---------- | -------------: | -----------: | --------: |
| SHELL      |              2 |            2 |         0 |
| NUMERA     |              9 |            3 |         6 |
| FOGO       |              9 |            3 |         6 |
| ORIGO      |              9 |            3 |         6 |
| VISO       |             10 |            3 |         7 |
| PULSO      |              9 |            3 |         6 |
| NEXO       |              9 |            3 |         6 |
| **Total**  |         **57** |       **20** |    **37** |

Esta tabla define el universo de referencia del mini-bloque, no obliga a que una instancia de paquete pruebe los siete consumidores.

El alcance de una instancia es exclusivamente la intersección entre:

```text
alcance aprobado del package_id
∩
consumidores y superficies realmente modificados por ese paquete
∩
identidades y extensiones que participan en el comportamiento comparado
```

Un consumidor fuera de esa intersección no se incorpora por similitud ni por pertenecer a la misma familia de aplicación.

---

#### 5. Unidad mínima de paridad

La unidad mínima de comparación queda definida por la siguiente tupla indivisible:

```text
package_id
+
repositorio consumidor
+
commit baseline
+
commit candidato
+
identidades afectadas
+
versiones e integridad de dependencias
+
manifest y lockfile
+
toolchain
+
fixture
+
oráculo
+
ambiente de prueba
```

Una evidencia que no pueda reconstruir esta tupla queda `BLOCKED` y no puede heredarse a otra combinación.

La unidad de aprobación de una instancia es el conjunto completo de unidades mínimas que cubra todos los consumidores y superficies incluidos en el paquete.

---

#### 6. Contrato de entrada de cada instancia

Toda instancia deberá materializar como mínimo los siguientes datos antes de ejecutar un oráculo:

| Campo                    | Regla                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------- |
| identidad de instancia   | `SHELL-MIG-007::<package_id>` con el mismo `package_id` aprobado en E5             |
| paquete                  | identidad exacta del paquete de cambio                                             |
| unidad de implementación | identidad exacta cuando el paquete ya la tenga asignada; no se inventa una nueva   |
| consumidores afectados   | repositorios exactos realmente modificados por el paquete                          |
| commit baseline          | último commit aprobado que representa el comportamiento previo a comparar          |
| commit candidato         | commit exacto que contiene el cambio materializado por el paquete                  |
| superficies afectadas    | archivos, exports, rutas, componentes, adapters o contratos incluidos en el cambio |
| identidades heredadas    | filas aplicables de la matriz de migración cuando correspondan                     |
| package versions         | versiones exactas de cada dependencia compartida que participe en el resultado     |
| integridad               | huella o integridad resoluble del artefacto compartido cuando aplique              |
| manifest                 | manifest efectivo del consumidor candidato                                         |
| lockfile                 | lockfile efectivo del consumidor candidato                                         |
| toolchain                | runtime, package manager, compilador y versiones materiales para reproducibilidad  |
| fixtures                 | conjunto exacto de fixtures ejecutados                                             |
| oráculos                 | conjunto exacto de oráculos ejecutados                                             |
| excepciones              | lista cerrada de deltas aprobados; lista vacía cuando no existan                   |
| rollback                 | snapshot restituible y procedimiento aplicable al consumidor                       |

La ausencia de un campo obligatorio no se convierte en valor por defecto: bloquea la instancia.

---

#### 7. Identidad de baseline y candidato

El baseline no es una referencia narrativa ni el commit histórico de una tarea anterior por defecto. Es el commit exacto aprobado como estado previo del consumidor para el paquete concreto.

El candidato es el commit exacto que contiene el cambio cuya paridad se evalúa.

Reglas:

1. baseline y candidato pertenecen al mismo repositorio consumidor;
2. el candidato deberá descender del baseline o declarar explícitamente la relación de transición aprobada cuando el flujo autorizado use otra base;
3. la evidencia de otro commit no se reutiliza por equivalencia supuesta;
4. cambiar manifest, lockfile, package version, configuración material o toolchain invalida la atribución anterior cuando pueda modificar el resultado;
5. un baseline con defecto conocido no se convierte automáticamente en oráculo de comportamiento deseado;
6. todo defecto legacy que no deba conservarse se modela como excepción aprobada con resultado candidato esperado;
7. un candidato que reintroduzca una copia legacy para alcanzar similitud visual no satisface paridad.

---

#### 8. Familias reutilizables de fixtures

La plantilla define ocho familias de fixtures. Cada instancia seleccionará todas las aplicables y justificará expresamente cualquier `NOT_APPLICABLE`.

| Fixture                 | Propósito                                                | Entradas mínimas                                                                                       |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `FIXTURE_IDENTITY`      | fijar identidad del consumidor y configuración estable   | aplicación, repositorio, metadata y configuración pública aplicable                                    |
| `FIXTURE_COMPOSITION`   | comparar composición de shell y slots                    | brand, navigation preparada, context presentacional, notices, headerActions y children cuando apliquen |
| `FIXTURE_NAVIGATION`    | comparar navegación visible y estado activo              | conjunto preparado de destinos, identidad activa, labels, iconos y estados presentacionales            |
| `FIXTURE_ROUTING`       | comparar navegación efectiva y transiciones de URL       | ruta inicial, acción, destino esperado, parámetros gobernados y retorno cuando aplique                 |
| `FIXTURE_STATE`         | comparar estados observables                             | estado inicial, transición, loading, empty, disabled, open, closed, success y error aplicables         |
| `FIXTURE_INTERACTION`   | comparar secuencia de interacción                        | acciones de usuario o eventos reproducibles, callbacks esperados y orden observable                    |
| `FIXTURE_FAILURE`       | comparar fallos y comportamiento fail-closed             | entrada inválida, dependencia ausente, configuración incompatible o fallo inyectado aplicable          |
| `FIXTURE_BUILD_RUNTIME` | comparar capacidad de construir y ejecutar el consumidor | instalación bloqueada, manifest, lockfile, toolchain, variables no secretas y comando aplicable        |

Los fixtures deberán usar entradas deterministas. No usarán datos productivos, secretos ni autoridad fabricada para forzar un resultado verde.

---

#### 9. Regla de igualdad y diferencias autorizadas

Cada comparación produce una de cuatro disposiciones semánticas:

| Disposición      | Significado                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `EQUIVALENT`     | baseline y candidato preservan el contrato observable protegido                                                  |
| `APPROVED_DELTA` | existe una diferencia intencional respaldada por una decisión canónica y el candidato satisface el nuevo oráculo |
| `NOT_APPLICABLE` | la dimensión no participa en el alcance concreto y existe justificación verificable                              |
| `MISMATCH`       | existe una diferencia no autorizada, no explicada o incompatible con el contrato                                 |

`APPROVED_DELTA` exige registrar:

- fuente canónica que autoriza la diferencia;
- observable anterior;
- observable esperado nuevo;
- riesgo protegido;
- oráculo que demuestra el resultado;
- responsable del delta.

No son justificaciones válidas “es equivalente”, “se ve igual”, “es una refactorización”, “debería funcionar” o “el package lo maneja” sin evidencia reproducible.

---

#### 10. Oráculos reutilizables

Quedan definidos ocho oráculos globales. Una instancia puede ejecutar más de un caso por oráculo.

| Oráculo                   | Protege                               | PASS cuando                                                                                            | FAIL cuando                                                                                                                     |
| ------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `ORACLE_TYPESCRIPT`       | API TypeScript consumible             | todos los usos protegidos compilan con el contrato esperado o con mapping aprobado                     | desaparece un uso, cambia un tipo sin autorización, requiere cast inseguro o aparece import interno                             |
| `ORACLE_BEHAVIOR`         | comportamiento observable             | la misma entrada produce resultado y secuencia equivalentes o delta aprobado                           | cambia resultado, callback, side effect, orden material o interacción sin autorización                                          |
| `ORACLE_ROUTE`            | rutas y navegación                    | destinos, estado activo, transición y retorno conservan intención aprobada                             | aparece destino nuevo no autorizado, se pierde ruta, cambia retorno o la UI fabrica autoridad                                   |
| `ORACLE_MARKUP_CLASS`     | contrato DOM, clases y hooks externos | semántica y hooks contractuales permanecen o migran mediante mapping aprobado                          | se rompe selector/hook público, semántica material o dependencia externa no inventariada                                        |
| `ORACLE_STATE`            | estados y transiciones                | todos los estados aplicables conservan disponibilidad, transición y significado                        | estado desaparece, se vuelve inalcanzable, cambia significado o queda bloqueado incorrectamente                                 |
| `ORACLE_FAILURE`          | fallos y fail-closed                  | el candidato falla de forma controlada, atribuible y sin ampliar autoridad ni side effects             | fallback silencioso, éxito falso, ampliación de acceso, excepción distinta no aprobada o side effect parcial                    |
| `ORACLE_BUILD_REGRESSION` | integración del consumidor            | instalación, chequeos estáticos, build y pruebas aplicables completan con evidencia atribuible         | comando inexistente, dependencia flotante, build roto, prueba omitida sin justificación o regresión                             |
| `ORACLE_ROLLBACK`         | reversibilidad                        | el snapshot previo se restaura y el consumidor vuelve a una combinación soportada sin bypass prohibido | rollback incompleto, manifest/lockfile divergentes, pérdida de datos/configuración o dependencia de edición manual no gobernada |

---

#### 11. Matriz obligatoria de siete dimensiones de paridad

Cada consumidor incluido en una instancia deberá producir una fila por dimensión aplicable.

| Dimensión           | Baseline que se captura                         | Candidato que se compara                     | Oráculo principal         | Evidencia mínima                                                 | Bloqueo principal                                         |
| ------------------- | ----------------------------------------------- | -------------------------------------------- | ------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| API TypeScript      | imports y usos públicos consumidos              | imports y usos después de migración          | `ORACLE_TYPESCRIPT`       | compilación/fixture de consumidor y mapping de API cuando exista | símbolo, tipo o contrato no resoluble                     |
| comportamiento      | entradas, callbacks y observables relevantes    | mismo escenario sobre candidato              | `ORACLE_BEHAVIOR`         | trace o resultado reproducible antes/después                     | delta funcional no autorizado                             |
| rutas y navegación  | destinos, estado activo y transición            | mismo escenario o delta aprobado             | `ORACLE_ROUTE`            | rutas observadas, intentos y transiciones                        | pérdida, ampliación o destino divergente                  |
| DOM, clases y hooks | semántica y dependencias externas contractuales | estructura contractual candidata             | `ORACLE_MARKUP_CLASS`     | inventario de hooks públicos y comparación                       | ruptura de consumidor externo o clase legacy oculta       |
| estados             | conjunto y transición de estados aplicables     | conjunto y transición candidatos             | `ORACLE_STATE`            | matriz estado inicial → evento → estado final                    | estado perdido, añadido sin contrato o semántica distinta |
| fallos              | fallos conocidos e inyectados aplicables        | comportamiento candidato bajo el mismo fallo | `ORACLE_FAILURE`          | error, reason, ausencia de side effects y recuperación           | fallback permisivo o resultado falso                      |
| build y regresión   | capacidad reproducible del baseline             | capacidad reproducible del candidato         | `ORACLE_BUILD_REGRESSION` | instalación bloqueada, lint/typecheck/build/tests aplicables     | comando ausente, fallo o prueba obligatoria omitida       |

El rollback se ejecuta como gate transversal después de obtener un candidato apto y no sustituye ninguna de las siete dimensiones.

---

#### 12. Paridad de API TypeScript

La comparación de API TypeScript protege el contrato realmente consumido, no la forma privada de implementación.

Cada instancia deberá clasificar cada uso afectado como una de estas modalidades:

1. `SAME_PUBLIC_API`: el consumidor conserva el mismo contrato público y deberá compilar sin cambios semánticos.
2. `MAPPED_PUBLIC_API`: la migración usa una API pública distinta aprobada y cada uso baseline posee mapping explícito hacia el candidato.
3. `LOCAL_ADAPTER`: el consumidor conserva un adapter local propietario que traduce su modelo al contrato compartido sin copiar la implementación.
4. `REMOVED_BY_APPROVED_DELTA`: el uso desaparece porque una decisión canónica aprobada elimina la capacidad o la sustituye por otra.

Para `MAPPED_PUBLIC_API` y `LOCAL_ADAPTER` deberán registrarse los usos baseline cubiertos y los usos candidatos resultantes. Un mapping parcial es `FAIL`.

Queda prohibido obtener PASS mediante:

- `any` nuevo o cast equivalente para ocultar incompatibilidad;
- import desde ruta privada no publicada;
- `file:`, `link:` o workspace como sustituto de una release cuando la instancia exige artefacto publicado;
- wrapper vacío cuyo único objetivo sea conservar una firma rota;
- duplicación local de tipos propietarios del package.

---

#### 13. Paridad de comportamiento

La conducta se compara mediante observables, no mediante implementación interna.

Observables materiales incluyen, cuando apliquen:

- contenido presentado;
- acciones habilitadas o deshabilitadas;
- callbacks emitidos;
- eventos y su orden material;
- navegación iniciada;
- apertura y cierre de disclosure, menú o modal;
- persistencia o limpieza de estado local permitido;
- loading, empty, success y error;
- side effects expresamente pertenecientes al consumidor;
- retorno de foco y comportamiento interactivo cuando el caso lo incluya.

Un refactor interno que conserva todos los observables protegidos puede ser `EQUIVALENT`. Una diferencia observable exige `APPROVED_DELTA` o produce `MISMATCH`.

---

#### 14. Paridad de rutas y navegación

La ruta se compara por intención y resultado aprobado, no por coincidencia textual ciega cuando exista un cambio canónico de ruta.

La evidencia deberá registrar:

- ruta o estado inicial;
- identidad de navegación activa;
- acción ejecutada;
- destino resultante;
- parámetros gobernados preservados;
- comportamiento de retorno cuando aplique;
- destinos excluidos u ocultos relevantes;
- razón de cualquier diferencia autorizada.

La UI compartida no puede ganar PASS calculando permisos, roles, scope o contexto autoritativo. La autorización y la selección de navegación permitida deberán llegar resueltas desde sus propietarios.

Un destino visible que no existía y no está autorizado, o un destino protegido que desaparece sin decisión aprobada, produce `FAIL`.

---

#### 15. Paridad de DOM, clases y hooks externos

No se exige identidad byte a byte de DOM ni de class names internos.

La instancia deberá distinguir:

- semántica y atributos contractuales;
- clases públicas documentadas;
- `data-*`, ids o hooks realmente consumidos externamente;
- clases internas sin contrato;
- CSS legacy cuya dependencia fue detectada;
- extensiones locales legítimas del consumidor.

Solo las superficies contractuales deben preservarse o poseer mapping aprobado. Una clase interna puede cambiar sin delta si ningún consumidor depende de ella y no altera la evidencia especializada de `SHELL-MIG-006`.

Una clase legacy descubierta como dependencia externa no puede ignorarse: debe migrarse, conservarse explícitamente como extensión propietaria o bloquear la instancia.

---

#### 16. Paridad de estados

Cada superficie afectada deberá declarar su matriz de estados aplicables.

Como mínimo se evalúan cuando existan:

- inicial;
- loading;
- empty;
- ready;
- active/selected;
- disabled;
- open/closed;
- success;
- recoverable error;
- terminal error.

Cada caso se expresa como:

```text
estado inicial
+
evento o entrada
→ estado final esperado
+
observable protegido
```

Un estado inexistente en baseline no se añade al candidato sin fuente aprobada. Un estado baseline que se elimina deberá poseer delta aprobado o producir `FAIL`.

---

#### 17. Paridad de fallos

La instancia deberá incluir pruebas negativas para toda condición de fallo material al alcance.

La comparación protege:

- clasificación o reason esperado cuando exista contrato;
- resultado visible seguro;
- ausencia de autorización adicional;
- ausencia de side effects parciales no permitidos;
- capacidad de reintento o recuperación cuando aplique;
- logs o evidencia técnica sin exposición de secretos;
- distinción entre error de consumidor, package, configuración y ambiente.

El candidato no puede transformar un fallo baseline en éxito silencioso para obtener paridad. Cuando el baseline sea permisivo de forma conocida y el contrato objetivo sea fail-closed, se registra `APPROVED_DELTA` y el oráculo esperado es el comportamiento seguro nuevo.

---

#### 18. Build y regresión por consumidor

Una instancia no queda aprobada únicamente por pasar pruebas unitarias del package.

Por cada consumidor afectado deberán ejecutarse los comandos aplicables y disponibles del repositorio exacto, incluyendo según corresponda:

- instalación bloqueada;
- lint;
- typecheck;
- build o export;
- pruebas automatizadas;
- pruebas de integración del cambio;
- regresiones vinculadas a las superficies afectadas.

Un comando requerido por el contrato pero todavía inexistente deja la dimensión `BLOCKED`; no se sustituye por una afirmación manual.

Los habilitadores `SHELL-CI-001` y `SHELL-CI-007` a `SHELL-CI-013` no definen por sí mismos el alcance de la instancia. El alcance sigue viniendo del paquete y de sus consumidores afectados. La instancia deberá usar únicamente la infraestructura que resulte aplicable al repositorio probado.

---

#### 19. Relación con `SHELL-MIG-006`

`SHELL-MIG-006` conserva el contrato especializado de tokens/tema, contraste, foco, teclado, movimiento reducido, densidad, responsive, CSS declarada e hidratación.

`SHELL-MIG-007` no duplica esa matriz.

Reglas:

1. una instancia de paridad deberá identificar si el cambio toca una dimensión gobernada por `SHELL-MIG-006`;
2. cuando exista evidencia especializada aplicable al mismo candidato, se referencia y se conserva su identidad de commit, paquete y configuración;
3. evidencia de otro commit o combinación no se hereda;
4. la ausencia de una referencia especializada no se convierte en PASS visual por comparación superficial;
5. un resultado `FAIL`, `BLOCKED` o `STALE` de la evidencia especializada no puede ocultarse dentro de un PASS de paridad general;
6. este vínculo no modifica las dependencias formales de ejecución declaradas para `SHELL-MIG-007`.

---

#### 20. Clases de evidencia de una instancia

Cada instancia deberá conservar exactamente las clases aplicables de evidencia siguientes:

| Clase                | Contenido obligatorio                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `LINEAGE`            | package_id, repositorio, baseline, candidato, versiones, integridades, manifest, lockfile y toolchain |
| `TYPESCRIPT`         | fixtures de compilación, mappings y resultado de `ORACLE_TYPESCRIPT`                                  |
| `BUILD`              | comandos ejecutados, códigos de salida y artefactos de build/regresión aplicables                     |
| `RUNTIME`            | fixtures de comportamiento y trazas/resultados antes/después                                          |
| `NAVIGATION_STATE`   | rutas, navegación, estados y hooks contractuales comparados                                           |
| `FAILURE_REGRESSION` | fallos inyectados, razones, side effects y regresiones ejecutadas                                     |
| `ROLLBACK`           | snapshot, acción de reversión, resultado restaurado y comprobación posterior                          |

Una captura aislada, log parcial, comentario de PR o resultado de otra combinación no satisface una clase por sí solo.

---

#### 21. Estados de dimensión y agregación

Cada dimensión de una instancia usa uno de cinco estados:

- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `STALE`;
- `NOT_APPLICABLE`.

Regla de agregación:

```text
si existe FAIL
→ instancia FAIL

si no existe FAIL pero existe BLOCKED o STALE
→ instancia BLOCKED

si todas las dimensiones aplicables son PASS
 y cada NOT_APPLICABLE tiene justificación
 y rollback = PASS
→ instancia PASS
```

`STALE` nunca se convierte en PASS sin repetir la evidencia sobre la combinación vigente.

---

#### 22. Excepciones y deltas aprobados

Las excepciones son cerradas y positivas: solo existe una excepción si una fuente canónica aprobada autoriza una diferencia concreta.

Cada excepción deberá registrar:

- consumidor;
- superficie;
- observable baseline;
- observable candidato esperado;
- fuente aprobada;
- riesgo;
- fixture;
- oráculo;
- responsable;
- criterio de cierre.

Queda prohibido usar una excepción para:

- saltar una prueba porque falla;
- aceptar un import privado;
- mantener un fallback legacy no autorizado;
- ampliar permisos o contexto;
- ocultar un error de build;
- trasladar un defecto conocido sin decisión explícita;
- reutilizar evidencia de otro commit.

---

#### 23. Responsabilidades

| Responsabilidad                                  | Propietario operativo del resultado                                                 |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| definir el contrato global                       | `SHELL-MIG-007`                                                                     |
| aprobar el alcance del package_id                | `E5-GATE-008::<package_id>`                                                         |
| proveer infraestructura de pruebas de packages   | `SHELL-CI-001`                                                                      |
| proveer habilitadores de pruebas de consumidores | `SHELL-CI-007` a `SHELL-CI-013`                                                     |
| materializar el candidato del paquete            | `SHELL-CI-020::<package_id>` y los grupos de implementación incluidos en el paquete |
| ejecutar y registrar la instancia de paridad     | `SHELL-MIG-007::<package_id>` dentro del readiness correspondiente                  |
| consumir la evidencia para readiness             | `SHELL-CI-021::<package_id>`                                                        |
| definir retiro posterior                         | `SHELL-MIG-008` y su futura instancia aplicable                                     |

Una misma persona o pipeline puede participar en varias responsabilidades, pero la evidencia conserva la identidad de la tarea y del paquete que la produce.

---

#### 24. Plantilla materializada de registro por instancia

Toda futura instancia deberá materializar como mínimo esta matriz, con valores reales y sin filas omitidas:

| Campo de instancia       | Contenido requerido                                                         |
| ------------------------ | --------------------------------------------------------------------------- |
| Instancia                | identidad `SHELL-MIG-007::<package_id>`                                     |
| Package                  | package_id aprobado                                                         |
| Unidad de implementación | identidad aprobada cuando aplique                                           |
| Consumidores             | repositorios exactos incluidos                                              |
| Baselines                | commit baseline por consumidor                                              |
| Candidatos               | commit candidato por consumidor                                             |
| Dependencias compartidas | package, versión e integridad exactas                                       |
| Manifest / lockfile      | identidad o huella de ambos por consumidor                                  |
| Toolchain                | versiones materiales                                                        |
| Superficies afectadas    | lista exacta del cambio                                                     |
| Fixtures                 | fixtures realmente ejecutados                                               |
| Oráculos                 | oráculos realmente ejecutados                                               |
| Deltas aprobados         | referencias explícitas o lista vacía                                        |
| Resultado por dimensión  | estado y evidencia de las siete dimensiones aplicables                      |
| Evidencia especializada  | referencias aplicables de gates especializados, sin herencia por inferencia |
| Rollback                 | snapshot, ensayo y resultado                                                |
| Resultado agregado       | PASS, FAIL o BLOCKED                                                        |
| Bloqueadores             | lista cerrada con propietario y condición de salida                         |

Esta plantilla es el resultado documental de la tarea global. Los valores concretos pertenecen exclusivamente a cada futura instancia.

---

#### 25. Reglas para paquetes con múltiples consumidores

Cuando un package_id afecte más de un consumidor:

1. se crea una sola instancia `SHELL-MIG-007::<package_id>`;
2. dentro de ella existe un subresultado independiente por consumidor;
3. cada consumidor conserva baseline, candidato, manifest, lockfile, fixtures y evidencia propios;
4. PASS en un consumidor no se hereda a otro;
5. un FAIL en cualquier consumidor obligatorio convierte la instancia en FAIL;
6. un consumidor bloqueado convierte la instancia en BLOCKED mientras siga dentro del alcance aprobado;
7. el rollback se ensaya por repositorio afectado y no exige revertir consumidores ajenos al paquete;
8. una instancia no puede dividirse artificialmente para ocultar un consumidor fallido del mismo package_id.

---

#### 26. Reglas para un consumidor afectado por múltiples paquetes

Un mismo consumidor puede aparecer en varias instancias cuando paquetes distintos modifican superficies diferentes.

En ese caso:

- cada package_id conserva su propia instancia;
- cada instancia usa el baseline y candidato reales de su ventana;
- la evidencia no se transfiere automáticamente entre paquetes;
- una superficie común deberá declarar qué paquete produjo el cambio observado;
- el segundo paquete no puede asumir que el PASS del primero cubre modificaciones posteriores;
- la secuencia real de commits deberá permitir reconstruir la evolución sin saltos.

---

#### 27. Rollback ensayado

La puerta de cierre de una instancia exige rollback realmente ensayado.

El ensayo mínimo deberá demostrar, por cada repositorio afectado:

1. identificación del snapshot anterior;
2. restauración coherente de código, manifest, lockfile y configuración local aplicable;
3. restitución de una combinación soportada de dependencias;
4. ausencia de edición directa de `node_modules` o mutación de una release publicada;
5. ausencia de reactivación de bypasses prohibidos;
6. build o smoke verificable posterior a la restauración según el contrato del consumidor;
7. registro del resultado y del tiempo/condición de recuperación cuando el paquete lo requiera.

Si el rollback no puede ejecutarse de forma segura, la instancia queda `BLOCKED` aunque las comparaciones antes/después sean verdes.

---

#### 28. Gate de ejecución de una instancia

Una instancia solo puede comenzar cuando se cumplan simultáneamente:

1. el marcador global `SHELL-MIG-007` está aprobado;
2. los habilitadores de ejecución declarados están disponibles;
3. existe `E5-GATE-008::<package_id>` aprobado para el mismo package_id;
4. `SHELL-CI-020::<package_id>` ha iniciado la ejecución del paquete;
5. existe un candidato materializado para al menos una superficie incluida;
6. baseline y candidato están identificados por commit;
7. manifest y lockfile del candidato son atribuibles;
8. los consumidores afectados están enumerados;
9. fixtures y oráculos aplicables están seleccionados;
10. rollback posee snapshot restituible;
11. cualquier excepción posee fuente aprobada antes de ejecutar la comparación.

No se considera iniciado un test por disponer únicamente de documentación, un PR vacío, una release no consumida o una captura visual.

---

#### 29. Condiciones de suspensión

La instancia se suspende y queda `BLOCKED` cuando ocurra cualquiera de estas condiciones:

- package_id distinto entre gate, implementación y evidencia;
- baseline o candidato no atribuible;
- consumidor afectado omitido;
- versión o integridad de dependencia no resoluble;
- manifest y lockfile incoherentes;
- fixture no reproducible;
- oráculo ambiguo;
- mapping de API parcial;
- import privado o dependencia local no autorizada usada para obtener PASS;
- diferencia observable sin fuente aprobada;
- CSS o hook legacy consumido pero no inventariado;
- ruta o estado añadido/eliminado sin decisión aprobada;
- fallo transformado en éxito silencioso;
- build, typecheck o prueba obligatoria inexistente o fallida;
- evidencia de otro commit marcada como vigente;
- rollback no restituible o no ensayable;
- evidencia especializada aplicable en FAIL, BLOCKED o STALE;
- reintroducción de una copia legacy para aparentar paridad.

---

#### 30. Reconciliación de las tareas CI declaradas

La dependencia de ejecución `SHELL-CI-007` a `SHELL-CI-013` se conserva exactamente como habilitador canónico de pruebas de consumidores.

No se interpreta ese rango como una lista alternativa del universo de `SHELL-MIG-005` y no añade automáticamente ANIMA al alcance de una instancia de migración UI.

Del mismo modo, una aplicación del universo de migración no obtiene PASS por el solo hecho de no poseer una tarea CI nominal con su nombre. Si el package_id la modifica, deberá existir un mecanismo aplicable y reproducible para ejecutar sus oráculos; de lo contrario, la instancia queda `BLOCKED`.

---

#### 31. Decisiones vinculantes

1. `SHELL-MIG-007` se desarrolla y aprueba una sola vez.
2. Cada package_id posterior utiliza una instancia `SHELL-MIG-007::<package_id>`.
3. Una instancia no modifica el marcador global.
4. La paridad se demuestra sobre consumidores realmente afectados, no sobre una lista fija aplicada a todos los paquetes.
5. Baseline y candidato se identifican por commit exacto.
6. Evidencia de otro commit, versión, lockfile o configuración no se hereda.
7. La comparación protege contrato observable, no estructura privada de implementación.
8. Un defecto legacy conocido no se conserva solo para obtener igualdad.
9. Toda diferencia intencional exige `APPROVED_DELTA` con fuente canónica.
10. API TypeScript admite mapping explícito, pero no casts inseguros ni imports privados.
11. Rutas se comparan por intención y resultado aprobado; UI no resuelve autorización.
12. Clases internas pueden cambiar cuando no son contractuales; hooks externos consumidos deben preservarse o migrarse explícitamente.
13. Estados y fallos se comparan como transiciones reproducibles.
14. El build del package no sustituye pruebas del consumidor.
15. La evidencia especializada de `SHELL-MIG-006` no se duplica ni se ignora.
16. Un package con varios consumidores conserva subresultados independientes.
17. Un consumidor afectado por varios paquetes conserva evidencia independiente por package_id.
18. La instancia es fail-closed ante evidencia faltante, ambigua o desactualizada.
19. Rollback ensayado es obligatorio para PASS de instancia.
20. La instancia vive dentro del readiness del package_id, pero no aprueba `SHELL-CI-021` automáticamente.
21. Esta tarea global no ejecuta pruebas ni certifica consumidores físicos.
22. El retiro legacy permanece reservado a `SHELL-MIG-008`.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Creados:** 0.

**Modificados:** 0.

**Justificación:** esta tarea no introduce un comportamiento ejecutable nuevo. Materializa el contrato operativo con el que se ejecutarán requisitos de paridad, compatibilidad, regresión, evidencia y rollback ya existentes. Las instancias futuras implementarán y ejecutarán esas obligaciones dentro de sus paquetes sin crear una identidad de requisito nueva por el solo hecho de aplicar esta plantilla.

---

#### 33. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                                                                           |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | El marcador global define el contrato y no materializa un candidato de package ni modifica consumidores; no existe build de instancia que pueda atribuirse a esta tarea documental.                                                                                 |
| LOCAL     | PASS           | La definición contiene una sola tarea, cabecera completa, 1 plantilla, 7 dimensiones, 8 fixtures, 8 oráculos, 7 clases de evidencia, estados fail-closed, plantilla de instancia, rollback, criterios y continuidad sin placeholders de desarrollo.                 |
| REMOTA    | PASS           | Se verificaron la tarea actual, el owner, la topología `TEMPLATE_PER_PACKAGE`, las dependencias globales, las dependencias de ejecución, el universo 57 = 20 + 37, el contrato de entrega, el registro de requisitos aplicable y los scripts documentales vigentes. |
| OPERATIVA | NOT_APPLICABLE | Ninguna instancia `SHELL-MIG-007::<package_id>` está autorizada ni materializada por el desarrollo del marcador global.                                                                                                                                             |
| FÍSICA    | NOT_APPLICABLE | No se modifica código, package, repositorio consumidor, despliegue, Supabase, dispositivo ni ambiente operativo.                                                                                                                                                    |

---

#### 34. Criterios de aceptación

`SHELL-MIG-007` queda documentalmente completa cuando:

- [x] se define una sola plantilla global reutilizable;
- [x] se conserva la modalidad `TEMPLATE_PER_PACKAGE`;
- [x] se separan dependencias para desarrollar de dependencias para ejecutar;
- [x] se define la identidad de instancia `SHELL-MIG-007::<package_id>`;
- [x] se ubica la ejecución posterior dentro de `SHELL-CI-021::<package_id>`;
- [x] se definen exactamente 7 dimensiones obligatorias de paridad;
- [x] se definen 8 familias de fixtures reutilizables;
- [x] se definen 8 oráculos con condición de PASS y FAIL;
- [x] se define atribución completa a package_id, consumidor, commits, versiones, manifest, lockfile, toolchain y ambiente;
- [x] se define mapping explícito para API TypeScript cuando la migración no sea drop-in;
- [x] se separan hooks contractuales de clases o implementación interna;
- [x] se definen oráculos de rutas, estados y fallos;
- [x] se define el manejo de defectos legacy mediante deltas aprobados;
- [x] se definen 7 clases de evidencia por instancia;
- [x] se definen estados PASS, FAIL, BLOCKED, STALE y NOT_APPLICABLE;
- [x] se define agregación fail-closed;
- [x] se define comportamiento para paquetes con múltiples consumidores;
- [x] se define comportamiento para consumidores afectados por múltiples paquetes;
- [x] se exige rollback ensayado para PASS de instancia;
- [x] se reconcilia `SHELL-MIG-006` sin duplicar su matriz especializada;
- [x] se reconcilian los habilitadores `SHELL-CI-007..013` sin usarlos como selector de alcance;
- [x] se conservan 57 identidades de referencia como 20 `KEEP LOCAL` y 37 `MIGRATE`;
- [x] no se afirma ejecución de una instancia ni prueba runtime inexistente;
- [x] no se crean ni modifican requisitos de prueba;
- [x] `SHELL-MIG-008` permanece reservada como definición del gate de retiro.

---

#### 35. Límites

Esta tarea no:

- ejecuta `SHELL-MIG-007::<package_id>`;
- crea un package_id;
- aprueba un paquete E5;
- inicia `SHELL-CI-020::<package_id>`;
- ejecuta readiness;
- ejecuta build, typecheck, lint, pruebas contractuales o pruebas operativas de un consumidor candidato;
- publica `@vento/ui-web` ni otro package;
- modifica package versions, manifests o lockfiles;
- modifica los 57 archivos o identidades de la migración;
- cambia rutas, navegación, clases, estados o fallos runtime;
- modifica autorización, contexto, sesión, SSO, middleware o permisos;
- modifica Supabase, SQL, RLS, RPC, Storage, Realtime, Edge Functions, datos, secretos o tipos generados;
- declara PASS de una instancia futura;
- crea excepciones sin fuente canónica;
- usa el baseline como autorización para preservar un defecto conocido;
- retira copias legacy;
- desarrolla ni ejecuta `SHELL-MIG-008`.

---

#### 36. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-006 — Verificar accesibilidad, tema y movimiento reducido`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-007 — Definir contrato de paridad ejecutable por paquete`

**SIGUIENTE TAREA RESERVADA**
`SHELL-MIG-008 — Definir gate de retiro legacy y certificación por paquete`


### ✅ SHELL-MIG-008 — Definir gate de retiro legacy y certificación por paquete

**Estado:** APROBADA
**Tarea anterior:** SHELL-MIG-007 — Definir contrato de paridad ejecutable por paquete
**Tarea siguiente:** SHELL-NATIVE-001 — Crear tokens compatibles con ANIMA
**Tipo de tarea:** documental; definición global única de un gate reutilizable de retiro legacy y certificación, con ejecución posterior mediante instancias `SHELL-MIG-008::<package_id>`; no elimina artefactos ni certifica retiros físicos durante el marcador global
**Bloque:** H — Fundación compartida de VENTO-SHELL
**Repositorio propietario:** `devVentoGroup/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md`
**Estado físico resultante:** CONTRATO_GLOBAL_DE_RETIRO_ESPECIFICADO; 1 plantilla reutilizable; 6 lotes residuales reconciliados; 11 candidatos físicos; 4 identidades internas de retiro controlado; 0 instancias ejecutadas; 0 retiros físicos ejecutados
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`SHELL-MIG-008` define una sola vez el gate con el que cada paquete futuro deberá demostrar que un artefacto legacy puede retirarse sin consumidores no autorizados, sin pérdida de comportamiento protegido y con rollback reproducible.

La tarea separa expresamente dos momentos:

```text
MARCADOR GLOBAL SHELL-MIG-008
→ define elegibilidad, inventario residual, evidencia, rollback y conciliación
→ se aprueba una sola vez
→ no elimina artefactos

INSTANCIA SHELL-MIG-008::<package_id>
→ aplica el gate al subconjunto de retiro incluido en ese paquete
→ usa evidencia real del package_id y sus repositorios
→ certifica únicamente los retiros efectivamente materializados dentro del alcance aprobado
→ no reabre ni vuelve a aprobar el marcador global
```

El retiro se admite por dos fundamentos principales:

1. **cero consumo demostrado** para un artefacto o miembro realmente inerte;
2. **migración completada con paridad demostrada** para legacy que sí tenía consumidores.

La ausencia de imports estáticos, por sí sola, nunca constituye autorización suficiente.

---

#### 2. Modalidad canónica y ciclo

La modalidad de esta tarea es `TEMPLATE_PER_PACKAGE`.

| Capa                        | Identidad                     | Momento                                                                       | Resultado                                                             |
| --------------------------- | ----------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| definición global           | `SHELL-MIG-008`               | ahora, después de sus dependencias de desarrollo                              | contrato reusable aprobado, sin retiro físico                         |
| materialización del paquete | mismo `package_id`            | dentro de `SHELL-CI-020..024::<package_id>` cuando el paquete incluya retiros | cambios físicos, pruebas y evidencia pertenecientes al paquete        |
| certificación de retiro     | `SHELL-MIG-008::<package_id>` | después de `SHELL-CI-024::<package_id>`                                       | decisión sobre los retiros ya incluidos y ejecutados bajo ese paquete |

**Dependencias para desarrollar el marcador global:**

- `SHELL-MIG-007`;
- `SHELL-PKG-007`;
- `SHELL-PKG-008`;
- decisiones aprobadas de `SHELL-AUD-011`.

**Dependencias para ejecutar una instancia:**

- `SHELL-MIG-007::<package_id>`;
- `E5-GATE-008::<package_id>`;
- `SHELL-CI-020::<package_id>`;
- `SHELL-CI-024::<package_id>`.

La instancia posterior no autoriza una eliminación nueva fuera del alcance que fue aprobado y materializado por el mismo paquete. Si un candidato no perteneció al alcance ejecutado, permanece residual para una instancia futura propietaria.

---

#### 3. Resultado material

Queda definida una plantilla global completa con el siguiente resultado:

| Unidad                                              | Cantidad | Resultado                           |
| --------------------------------------------------- | -------: | ----------------------------------- |
| plantilla global de gate                            |    **1** | definida                            |
| lotes residuales heredados                          |    **6** | reconciliados                       |
| candidatos físicos de retiro por cero consumo       |   **11** | reconciliados                       |
| identidades internas de retiro controlado           |    **4** | reconciliadas                       |
| clases de elegibilidad                              |    **3** | definidas                           |
| clases de evidencia de instancia                    |    **8** | definidas                           |
| gates obligatorios de certificación                 |   **12** | definidos                           |
| instancias `SHELL-MIG-008::<package_id>` ejecutadas |    **0** | no corresponde en esta tarea global |
| artefactos eliminados por esta tarea                |    **0** | no autorizado                       |
| retiros certificados por esta tarea global          |    **0** | no corresponde                      |

Los once candidatos físicos y las cuatro identidades internas no se consideran retirados por quedar enumerados. Cada uno deberá superar el gate sobre el commit real donde se materialice su retiro.

---

#### 4. Universo residual heredado

##### 4.1. Once candidatos físicos

El inventario físico inicial queda reconciliado con las decisiones aprobadas de auditoría:

| ID            | Repositorio | Identidad                                       | Decisión heredada                    | Lote de retiro |
| ------------- | ----------- | ----------------------------------------------- | ------------------------------------ | -------------- |
| `RET-ART-001` | VISO        | `src/lib/supabase/proxy.ts`                     | retiro físico posterior condicionado | VISO           |
| `RET-ART-002` | NEXO        | `src/lib/supabase/proxy.ts`                     | retiro físico posterior condicionado | NEXO           |
| `RET-ART-003` | PULSO       | `src/lib/supabase/proxy.ts`                     | retiro físico posterior condicionado | PULSO          |
| `RET-ART-004` | PULSO       | `src/utils/supabase/client.ts`                  | retiro físico posterior condicionado | PULSO          |
| `RET-ART-005` | NEXO        | `src/components/vento/standard/page-header.tsx` | retiro físico posterior condicionado | NEXO           |
| `RET-ART-006` | FOGO        | `src/lib/supabase/employee-sites.ts`            | retiro físico posterior condicionado | FOGO           |
| `RET-ART-007` | NUMERA      | `src/lib/supabase/employee-sites.ts`            | retiro con gate reforzado            | NUMERA         |
| `RET-ART-020` | VISO        | `src/lib/auth/sso.ts`                           | retiro físico posterior condicionado | VISO           |
| `RET-ART-021` | FOGO        | `src/lib/auth/sso.ts`                           | retiro físico posterior condicionado | FOGO           |
| `RET-ART-022` | ORIGO       | `src/lib/auth/sso.ts`                           | retiro físico posterior condicionado | ORIGO          |
| `RET-ART-023` | NUMERA      | `src/lib/auth/sso.ts`                           | retiro físico posterior condicionado | NUMERA         |

**Conciliación:** 11 candidatos físicos esperados, 11 materializados, 0 omitidos y 0 duplicados.

##### 4.2. Cuatro identidades internas

Además de los archivos, el gate gobierna las identidades internas ya autorizadas para retiro controlado:

| ID            | Alcance                         | Identidad                                         | Condición heredada                                                 |
| ------------- | ------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| `RET-ART-024` | PULSO                           | `GuardOptions.requireAppAccessPermission = false` | cero consumidores de la rama `false`; no ampliar autoridad         |
| `RET-ART-025` | runtimes AppSwitcher aplicables | `AppSwitcherItem.brandColor`                      | cero lecturas legacy y presentación canónica preservada            |
| `RET-ART-026` | runtimes AppSwitcher aplicables | `AppSwitcherProps.sites`                          | cero consumidores; selección de sede preservada en su propietario  |
| `RET-ART-027` | runtimes AppSwitcher aplicables | `AppSwitcherProps.activeSiteId`                   | cero consumidores; contexto activo preservado fuera de AppSwitcher |

Estas cuatro identidades son miembros contractuales o ramas internas, no archivos físicos adicionales.

##### 4.3. Exclusiones expresas del inventario residual

No pertenecen a los seis lotes `SHELL-MIG-008` por simple proximidad:

- los accesos SHELL `Mi perfil` y `Configuración`, cuyo propietario de retiro es `SHELL-APP-021`;
- `@vento/os-context`, que permanece en cuarentena contractual para su consolidación canónica y no se trata como package muerto;
- rutas, `layout.tsx`, `route.ts` y `middleware.ts` que dependen de convención de framework;
- scripts y bootstrap con consumo manual o de CI no descartado;
- endpoints, RPC y objetos Supabase sin inventario remoto y transición propietaria;
- cualquier artefacto consumido que aún no haya completado su migración y paridad.

---

#### 5. Seis lotes residuales por repositorio

Los lotes se conservan en el orden serial aprobado y no se mezclan entre repositorios:

| Orden | Lote                                         | Candidatos del lote                                                                                            | Protección especial                                                       |
| ----: | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
|     1 | `devVentoGroup/vento-numera / SHELL-MIG-008` | `sso.ts`; `employee-sites.ts`; miembros inertes de AppSwitcher                                                 | revalidación reforzada de `employee-sites.ts`                             |
|     2 | `devVentoGroup/vento-fogo / SHELL-MIG-008`   | `sso.ts`; `employee-sites.ts`; miembros inertes de AppSwitcher                                                 | impedir propagación de fallback ajeno                                     |
|     3 | `devVentoGroup/vento-origo / SHELL-MIG-008`  | `sso.ts`; miembros inertes de AppSwitcher                                                                      | `employee-sites.ts` consumido queda fuera del retiro inerte               |
|     4 | `devVentoGroup/vento-viso / SHELL-MIG-008`   | `proxy.ts`; `sso.ts`; miembros inertes de AppSwitcher                                                          | paridad UI previa cuando el retiro interno dependa de la migración UI     |
|     5 | `devVentoGroup/vento-pulso / SHELL-MIG-008`  | `proxy.ts`; cliente Supabase alterno; rama `requireAppAccessPermission=false`; miembros inertes de AppSwitcher | ningún retiro puede ampliar autoridad ni mezclar un cambio Supabase       |
|     6 | `devVentoGroup/vento-nexo / SHELL-MIG-008`   | `proxy.ts`; `page-header.tsx`; miembros inertes de AppSwitcher                                                 | mantener separado el lote CI/script y bloquear si reaparece un consumidor |

No existe un lote residual SHELL dentro de esta tarea.

---

#### 6. Clases de elegibilidad

##### 6.1. Clase A — artefacto sin consumidor

Aplica cuando la decisión aprobada ya lo clasifica como candidato de retiro y el commit de cambio demuestra cero consumidores aplicables.

Para quedar elegible deberá demostrar, según la naturaleza del artefacto:

- cero referencias estáticas;
- cero cargas dinámicas;
- cero ejecución por convención de framework;
- cero invocaciones desde scripts;
- cero invocaciones desde CI;
- cero reexports, aliases, workspaces o dependencias declaradas;
- cero consumo manual vigente cuando esa clase sea material;
- cero consumidores remotos, de datos o generados cuando la naturaleza del artefacto pueda tenerlos.

La reaparición de un solo consumidor convierte el retiro en `BLOCKED`. El artefacto deberá migrarse o reclasificarse antes de poder volver al gate.

##### 6.2. Clase B — legacy consumido ya migrado

Aplica a una copia, adapter, helper o superficie legacy que tenía consumidores reales.

Solo puede quedar elegible cuando:

1. existe un sustituto aprobado y materializado;
2. todos los consumidores incluidos en el alcance del paquete migraron al sustituto;
3. `SHELL-MIG-007::<package_id>` demuestra paridad para la combinación exacta;
4. los nuevos consumidores legacy están bloqueados por el mecanismo propietario aplicable;
5. la búsqueda residual produce cero usos no autorizados;
6. la combinación candidata supera los gates aplicables;
7. el rollback hacia una combinación soportada está ensayado;
8. cualquier deprecación pública aplicable conserva su expediente y condiciones.

Como referencias protegidas, NEXO y PULSO conservan sus `sso.ts` consumidos hasta completar migración; ORIGO conserva su `employee-sites.ts` consumido; y la variante VISO de `PageHeader` no puede tratarse como inerte por la existencia de una variante NEXO sin consumidor.

##### 6.3. Clase C — miembro interno inerte

Aplica a props, campos o ramas internas autorizadas para retiro.

La instancia deberá demostrar simultáneamente:

- cero lecturas o consumidores de la identidad eliminada;
- ausencia de cambio observable no aprobado;
- typecheck, build y pruebas aplicables correctos;
- preservación de la responsabilidad en su propietario cuando el miembro representaba datos derivados;
- ausencia de ampliación de autorización o contexto;
- rollback del miembro o rama junto con el snapshot del consumidor.

---

#### 7. Regla de búsqueda de consumidores

El gate de consumidores es multiclase y fail-closed.

| Clase heredada       | Qué debe cubrir                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| `CONSUMER-STATIC`    | imports, exports, reexports, llamadas y referencias estáticas           |
| `CONSUMER-DYNAMIC`   | `import()`, resolución por string, registries y carga construida        |
| `CONSUMER-FRAMEWORK` | entrypoints y convenciones de framework                                 |
| `CONSUMER-SCRIPT`    | scripts npm, shell, PowerShell, bootstrap y mantenimiento               |
| `CONSUMER-CI`        | workflows, validadores, release y gates                                 |
| `CONSUMER-MANUAL`    | procedimientos operativos vigentes                                      |
| `CONSUMER-PACKAGE`   | `exports`, workspaces, manifests y lockfiles                            |
| `CONSUMER-REMOTE`    | llamadas externas, tráfico, integraciones o despliegues cuando apliquen |
| `CONSUMER-DATA`      | SQL, RPC, triggers, RLS o funciones cuando apliquen                     |
| `CONSUMER-GENERATED` | manifiestos, catálogos, registries o codegen                            |

Para los once candidatos físicos heredados se conservan como mínimo las cinco clases exigidas por sus lotes: estática, dinámica, framework, CI y script. Las demás clases se agregan cuando la naturaleza del candidato pueda depender de ellas.

Una consulta única sin resultados no satisface este gate.

---

#### 8. Contrato de entrada de cada instancia

Toda futura instancia `SHELL-MIG-008::<package_id>` deberá materializar como mínimo:

| Campo                      | Regla                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------- |
| identidad de instancia     | mismo `package_id` utilizado por el ciclo de implementación                        |
| package                    | package de cambio exacto                                                           |
| unidad de implementación   | unidad propietaria ya asignada cuando aplique                                      |
| alcance de retiro          | repositorios e identidades exactas incluidos en el paquete                         |
| baseline                   | commit anterior al cambio por repositorio                                          |
| candidate/result commit    | commit exacto que contiene el retiro                                               |
| decisiones de auditoría    | referencias `RET-ART-*` o decisión posterior aprobada aplicable                    |
| relación de actualización  | expediente `PKG-PR-*` cuando el retiro forme parte de una actualización de package |
| evidencia de paridad       | referencia `SHELL-MIG-007::<package_id>` para legacy previamente consumido         |
| inventario de consumidores | resultado por clase de consumidor y por identidad                                  |
| manifest y lockfile        | identidad efectiva cuando el retiro afecte dependencias                            |
| versiones e integridad     | dependencias compartidas exactas que participan en el resultado                    |
| pruebas y gates            | resultados atribuibles al mismo commit                                             |
| inventario residual        | candidatos que permanecen después de la instancia y causa                          |
| rollback                   | snapshot, procedimiento, ensayo y resultado                                        |
| bloqueadores               | lista cerrada con propietario y condición de salida                                |

No se inventan valores por ausencia. Un insumo obligatorio no disponible deja la instancia `BLOCKED`.

---

#### 9. Doce gates obligatorios de certificación

| Gate                            | Condición de PASS                                                                                                         | Bloqueo                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1. identidad y alcance          | package, unidad, repositorios, candidatos y commits coinciden con el paquete ejecutado                                    | identidad o alcance ambiguos                                               |
| 2. elegibilidad del candidato   | cada identidad pertenece a una clase de elegibilidad satisfecha                                                           | candidato no clasificado o consumidor reaparecido                          |
| 3. procedencia del cambio       | retiro contenido en la historia y alcance del mismo package_id                                                            | eliminación fuera del paquete o commit no atribuible                       |
| 4. inventario de consumidores   | búsqueda multiclase completa y reproducible                                                                               | clase aplicable omitida o evidencia parcial                                |
| 5. sustitución y paridad        | legacy consumido tiene sustituto y paridad de la instancia correspondiente                                                | consumidor sin migrar, paridad fallida o evidencia no vigente              |
| 6. bloqueo de nuevo legacy      | no se puede crear silenciosamente un nuevo consumidor de la identidad retirada cuando la migración exige gate propietario | legacy todavía admisible sin control                                       |
| 7. gates de package/consumidor  | gates aplicables heredados de la política de actualización están vigentes                                                 | resultado `FAIL`, `BLOCKED`, `CANCELLED`, `TIMED_OUT`, `STALE` o pendiente |
| 8. build y regresión            | lint, typecheck, build/export y pruebas aplicables del consumidor completan correctamente                                 | comando requerido inexistente o resultado fallido                          |
| 9. diff de retiro               | solo se eliminan identidades y ajustes necesarios del alcance aprobado                                                    | refactor o funcionalidad ajena impide atribución                           |
| 10. inventario residual         | todo legacy restante queda enumerado con propietario y causa                                                              | residuo desconocido o candidato omitido                                    |
| 11. rollback                    | restauración del snapshot soportado fue ensayada y verificada                                                             | rollback no reproducible o restaura un bypass prohibido                    |
| 12. conciliación entre paquetes | no existe doble retiro, consumidor pendiente ni conflicto con otra unidad propietaria                                     | otra instancia o paquete todavía depende del artefacto                     |

Los gates reutilizan la semántica fail-closed de `SHELL-PKG-008`. Un gate universal requiere `PASS`; una condición realmente no aplicable solo puede excluirse con justificación verificable.

---

#### 10. Estados y agregación

Los resultados individuales conservan los estados canónicos de gates ya definidos para paquetes:

- `PENDING`;
- `RUNNING`;
- `PASS`;
- `FAIL`;
- `BLOCKED`;
- `CANCELLED`;
- `TIMED_OUT`;
- `STALE`;
- `NOT_APPLICABLE`.

La certificación de la instancia se agrega así:

```text
si cualquier gate obligatorio = FAIL
→ instancia FAIL

si no existe FAIL pero hay PENDING, RUNNING, BLOCKED, CANCELLED, TIMED_OUT o STALE
→ instancia BLOCKED

si todos los gates obligatorios = PASS
 y cada NOT_APPLICABLE es condicional y está justificado
→ instancia PASS
```

Un resultado de otro commit, otro package_id, otro manifest, otro lockfile o otra unidad de implementación es `STALE` para la instancia actual.

---

#### 11. Ocho clases de evidencia por instancia

| Clase                | Contenido mínimo                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `LINEAGE`            | package_id, unidad, repositorio, baseline, commit de retiro, versiones, integridad, manifest y lockfile aplicables |
| `CONSUMER_INVENTORY` | consultas por clase, alcance, cero consumo o consumidores migrados y resultado reproducible                        |
| `PARITY`             | referencia de paridad vigente cuando el artefacto tenía consumidores                                               |
| `RETIREMENT_DIFF`    | identidades eliminadas, exports/imports ajustados y ausencia de cambios ajenos                                     |
| `BUILD_REGRESSION`   | lint, typecheck, build/export, pruebas e integración aplicables por consumidor                                     |
| `RESIDUAL_INVENTORY` | legacy restante, estado, propietario y condición de salida                                                         |
| `ROLLBACK`           | snapshot, restauración, comandos/pruebas posteriores y resultado                                                   |
| `CERTIFICATION`      | gates, responsables, excepciones justificadas y resultado agregado de la instancia                                 |

Una captura, comentario de PR o búsqueda aislada no sustituye una clase completa.

---

#### 12. Contrato del registro de retiro

Cada identidad retirada en una instancia deberá conservar un registro atribuible con:

| Campo                 | Obligación                                                                      |
| --------------------- | ------------------------------------------------------------------------------- |
| `artifact_id`         | identidad `RET-ART-*` cuando ya exista o referencia canónica posterior aprobada |
| `repository`          | repositorio exacto                                                              |
| `package_id`          | paquete propietario de la instancia                                             |
| `implementation_unit` | unidad propietaria cuando aplique                                               |
| `base_commit`         | commit anterior al retiro                                                       |
| `result_commit`       | commit que contiene el retiro                                                   |
| `eligibility_class`   | cero consumo, legacy migrado o miembro interno inerte                           |
| `consumer_evidence`   | inventario de consumidores y resultado                                          |
| `parity_ref`          | referencia aplicable o no aplicabilidad justificada                             |
| `update_ref`          | expediente de actualización cuando aplique                                      |
| `tests`               | resultados reales atribuibles                                                   |
| `residual_refs`       | legacy relacionado que permanece                                                |
| `rollback_ref`        | snapshot y ensayo                                                               |
| `outcome`             | PASS, FAIL o BLOCKED                                                            |
| `owner`               | responsable de ejecución y certificación                                        |

La eliminación física sin este lineage no puede certificarse.

---

#### 13. Conciliación entre paquetes y unidades

La misma identidad física no se elimina más de una vez.

Cuando más de un paquete dependa del mismo retiro:

1. cada paquete declara su relación con la identidad;
2. la unidad de implementación propietaria conserva la acción física;
3. las demás instancias referencian el retiro propietario y su evidencia vigente;
4. ningún paquete puede certificar cero residual mientras otro consumidor autorizado siga usando la identidad;
5. una evidencia de retiro se vuelve `STALE` si un commit posterior reintroduce la identidad o crea un consumidor nuevo;
6. el cierre de un package_id no aprueba ni oculta el estado de otro package_id;
7. un retiro no incluido en el alcance aprobado permanece en el inventario residual.

La conciliación evita duplicar borrados, pruebas y rollback sin convertir una instancia en aprobación global.

---

#### 14. Relación con actualizaciones mediante PR

Cuando el retiro forme parte de una actualización de package:

- la propuesta conserva manifest y lockfile como unidad cuando cambien;
- el retiro de adapters temporales solo ocurre con su gate propietario satisfecho;
- el expediente de actualización referencia la deprecación, compatibilidad, paridad, rollback y requisitos aplicables;
- el automatizador puede preparar la propuesta, pero no puede certificar por sí solo el retiro, fusionarlo o desplegarlo;
- cualquier commit adicional invalida la evidencia técnica que dependa del commit anterior;
- un cambio multi-package usa el conjunto mínimo cerrado y no agrega retiros ajenos por conveniencia.

`SHELL-MIG-008` no crea un segundo mecanismo de actualización; consume el lineage ya definido.

---

#### 15. Relación con el gate fail-closed de paquetes

La instancia deberá respetar los gates aplicables de package y consumidor ya definidos, incluidos:

- identidad y elegibilidad de release;
- coherencia manifest–lockfile;
- instalación bloqueada;
- pruebas propias del package;
- lint o análisis estático;
- typecheck;
- build/export;
- pruebas automatizadas;
- matriz de compatibilidad;
- perfil especializado;
- requisitos afectados;
- controles reforzados por riesgo;
- vigencia de evidencia;
- revisión y protección de merge;
- separación entre merge, despliegue y adopción.

`SHELL-MIG-008` agrega la decisión de retiro al mismo expediente de evidencia; no degrada ni sustituye esos gates.

---

#### 16. Protección del legacy consumido

La presencia de un sustituto no demuestra por sí sola que la copia legacy pueda borrarse.

Antes de retirar legacy previamente consumido, la instancia exige:

```text
sustituto materializado
+
todos los consumidores del alcance migrados
+
paridad de SHELL-MIG-007::<package_id> = PASS
+
cero uso residual no autorizado
+
gates de package/consumidor = PASS
+
rollback ensayado
```

Controles explícitos:

- NEXO `src/lib/auth/sso.ts` permanece mientras conserve consumidores;
- PULSO `src/lib/auth/sso.ts` permanece mientras conserve consumidores;
- ORIGO `src/lib/supabase/employee-sites.ts` permanece mientras conserve consumidores;
- VISO `PageHeader` no se retira por analogía con la copia NEXO sin consumidor;
- `shared-device-signature`, middleware, rutas y endpoints conservan sus propietarios y gates específicos.

No se permite convertir una identidad `MIGRATE` en retiro inerte para reducir el trabajo del paquete.

---

#### 17. Rollback de retiro

Cada repositorio afectado deberá demostrar un rollback propio.

El ensayo deberá poder restaurar, según aplique:

1. el archivo o miembro eliminado;
2. exports y aliases;
3. imports o adapters modificados;
4. manifest y lockfile como unidad cuando cambiaron;
5. configuración local retirada;
6. una combinación soportada de packages;
7. build y pruebas posteriores a la restauración.

El rollback no puede:

- editar `node_modules`;
- mutar una release publicada;
- restaurar un bypass de autorización prohibido;
- ejecutar cambios de Supabase fuera de `vento-shell`;
- asumir que retroceder `@vento/supabase` revierte una migración de base de datos;
- descartar datos o auditoría creados durante la ventana.

Si restaurar el estado anterior ya no es seguro, la instancia permanece `BLOCKED` y requiere una transición o corrección hacia adelante autorizada por su propietario.

---

#### 18. Inventario residual posterior a cada instancia

Toda instancia deberá cerrar con una conciliación completa del legado relacionado con su alcance:

| Resultado residual                              | Tratamiento                                               |
| ----------------------------------------------- | --------------------------------------------------------- |
| retirado y certificado                          | queda ligado al commit y evidencia de la instancia        |
| permanece consumido                             | conserva propietario y tarea de migración                 |
| candidato sin consumo no incluido en el paquete | permanece residual para una futura instancia propietaria  |
| consumidor reaparecido                          | retiro bloqueado y candidato reclasificado para migración |
| evidencia desactualizada                        | estado `STALE`; repetir sobre la combinación vigente      |
| fuera de alcance del package_id                 | no se modifica ni se declara cerrado                      |

El objetivo no es llegar artificialmente a cero candidatos globales en cada paquete, sino a **cero consumidores legacy no autorizados dentro del alcance exacto de la instancia**.

---

#### 19. Responsabilidades

| Responsabilidad                                       | Propietario                                                       |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| definir el contrato global de retiro                  | `SHELL-MIG-008`                                                   |
| clasificar candidatos y consumidores heredados        | `SHELL-AUD-011` y decisiones posteriores propietarias             |
| aprobar el alcance del paquete                        | `E5-GATE-008::<package_id>`                                       |
| producir el candidato y cambios físicos del paquete   | `SHELL-CI-020::<package_id>` y grupos de implementación incluidos |
| demostrar paridad del legacy consumido                | `SHELL-MIG-007::<package_id>`                                     |
| aplicar gates de package/consumidor                   | tareas `SHELL-CI-*` y políticas propietarias aplicables           |
| cerrar implementación, piloto y evidencia del paquete | `SHELL-CI-024::<package_id>`                                      |
| certificar el subconjunto de retiro                   | `SHELL-MIG-008::<package_id>`                                     |
| ejecutar cualquier cambio Supabase                    | tarea propietaria desde `vento-shell`                             |

La certificación de retiro no sustituye la autoridad de release, datos, autorización, UI o Supabase de sus tareas propietarias.

---

#### 20. Gate de inicio de una instancia

Una instancia solo puede evaluarse cuando:

1. `SHELL-MIG-008` global está aprobado;
2. existe `SHELL-MIG-007::<package_id>` aplicable y cerrado para el mismo paquete cuando el retiro depende de migración;
3. `E5-GATE-008::<package_id>` autorizó el alcance;
4. `SHELL-CI-020::<package_id>` materializó el cambio;
5. `SHELL-CI-024::<package_id>` cerró el paquete con evidencia atribuible;
6. los retiros que se pretenden certificar estaban incluidos en ese alcance;
7. baseline y result commit son identificables;
8. existe inventario de consumidores por identidad;
9. los resultados de package y consumidor están vigentes;
10. existe un snapshot de rollback ensayable.

Una instancia no comienza por la sola existencia de un candidato histórico.

---

#### 21. Condiciones de suspensión

La instancia queda `BLOCKED` cuando ocurra cualquiera de estas condiciones:

- aparece un consumidor no inventariado;
- falta una clase de búsqueda aplicable;
- el artefacto fue eliminado fuera del package_id aprobado;
- baseline o commit de retiro no son atribuibles;
- un legacy consumido carece de sustituto materializado;
- la paridad aplicable no está en `PASS`;
- un gate requerido de package o consumidor no está en `PASS`;
- existe un import, export, alias, route convention, script, CI o carga dinámica residual no autorizada;
- el diff mezcla funcionalidad ajena y no permite atribuir el resultado;
- la evidencia pertenece a otro commit o combinación;
- el inventario residual está incompleto;
- otro paquete o unidad todavía depende del artefacto;
- el retiro modifica autoridad, contexto o datos fuera de su propietario;
- el rollback no es reproducible;
- el rollback reintroduce un bypass o combinación no soportada;
- un cambio Supabase fue ejecutado fuera de `vento-shell`;
- se intenta retirar una familia completa porque una sola ocurrencia carece de consumidor;
- se intenta convertir un `MIGRATE` en `RETIRE` sin completar su migración.

---

#### 22. Regla por cada lote residual

##### 22.1. NUMERA

La instancia aplicable debe cubrir `sso.ts`, `employee-sites.ts` y miembros AppSwitcher incluidos en el package_id. `employee-sites.ts` exige verificar existencia y blob del commit de cambio además de cero consumidores. Cualquier consumidor encontrado revoca su elegibilidad.

##### 22.2. FOGO

La instancia aplicable debe cubrir `sso.ts`, `employee-sites.ts` y miembros AppSwitcher incluidos. El retiro de SSO no puede propagar ni conservar el fallback histórico ajeno como reemplazo indirecto.

##### 22.3. ORIGO

La instancia puede evaluar `sso.ts` y miembros AppSwitcher incluidos, pero deberá demostrar explícitamente que `src/lib/supabase/employee-sites.ts` consumido no fue retirado por pertenecer a la misma familia.

##### 22.4. VISO

La instancia puede evaluar `proxy.ts`, `sso.ts` y miembros AppSwitcher incluidos. Cuando un retiro interno dependa de la migración UI, la evidencia de paridad aplicable deberá pertenecer al mismo package_id y commit candidato.

##### 22.5. PULSO

La instancia puede evaluar `proxy.ts`, el cliente Supabase alterno, la rama `requireAppAccessPermission=false` y miembros AppSwitcher incluidos. Cualquier cambio que amplíe autoridad o mezcle una migración Supabase no autorizada bloquea el retiro.

##### 22.6. NEXO

La instancia puede evaluar `proxy.ts`, la copia NEXO de `page-header.tsx` y miembros AppSwitcher incluidos. La evidencia deberá mantener separado el lote CI/script y demostrar que la cabecera NEXO sigue sin consumidor; la existencia de consumidores VISO de su propia variante no autoriza ni impide por sí sola la decisión NEXO.

---

#### 23. Plantilla materializada de una instancia

Toda futura instancia deberá completar al menos esta matriz con valores reales:

| Campo                       | Contenido requerido                                               |
| --------------------------- | ----------------------------------------------------------------- |
| Instancia                   | `SHELL-MIG-008::<package_id>`                                     |
| Package                     | package_id aprobado                                               |
| Unidad                      | implementation unit propietaria cuando aplique                    |
| Repositorios                | repositorios exactos incluidos                                    |
| Candidatos                  | `RET-ART-*` u otras identidades aprobadas incluidas               |
| Clase de elegibilidad       | A, B o C                                                          |
| Baseline                    | commit anterior por repositorio                                   |
| Resultado                   | commit de retiro por repositorio                                  |
| Inventario de consumidores  | evidencia por clase y por candidato                               |
| Paridad                     | referencia aplicable para legacy consumido                        |
| Gates de package/consumidor | resultados vigentes                                               |
| Pruebas                     | lint, typecheck, build/export, regresión e integración aplicables |
| Diff                        | alcance exacto del retiro                                         |
| Residual                    | legacy que permanece y propietario                                |
| Rollback                    | snapshot, ensayo y resultado                                      |
| Conciliación cross-package  | referencias de otras instancias o unidades afectadas              |
| Resultado agregado          | PASS, FAIL o BLOCKED                                              |
| Bloqueadores                | lista cerrada con propietario y condición de salida               |

La plantilla global queda completa ahora; los valores reales solo pertenecen a cada futura instancia.

---

#### 24. Puerta de cierre del marcador global

El marcador global queda documentalmente cerrado cuando:

1. existe una sola regla reutilizable de elegibilidad;
2. se distinguen cero consumo, legacy migrado y miembro interno inerte;
3. se reconcilian los seis lotes residuales;
4. se reconcilian los once candidatos físicos;
5. se reconcilian las cuatro identidades internas;
6. se conservan las exclusiones propietarias;
7. se define búsqueda multiclase de consumidores;
8. se define el contrato de entrada de instancia;
9. se definen doce gates obligatorios;
10. se define evidencia por commit, package y repositorio;
11. se define rollback reproducible;
12. se define inventario residual y conciliación entre paquetes;
13. se define el cierre de instancia sin afirmar que una instancia ya ocurrió;
14. no se retira ningún artefacto durante la definición global.

---

#### 25. Puerta de cierre de cada instancia

Una futura `SHELL-MIG-008::<package_id>` solo puede quedar `PASS` cuando:

- todos los retiros del alcance poseen lineage y elegibilidad demostrados;
- existe **cero consumidores legacy no autorizados dentro del alcance exacto del paquete**;
- los artefactos efectivamente retirados están registrados;
- los consumidores migrados aplicables tienen paridad vigente;
- los gates requeridos de package y consumidor están en `PASS`;
- lint, typecheck, build/export y pruebas aplicables están aprobados;
- el inventario residual está conciliado;
- no existe conflicto con otra instancia o unidad propietaria;
- el rollback es reproducible y fue ensayado por repositorio;
- la evidencia corresponde a los commits realmente certificados.

La instancia no exige cero legacy global de todo Vento OS, únicamente cero legacy no autorizado dentro de su alcance aprobado.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Creados:** 0.

**Modificados:** 0.

**Justificación:** el gate materializa para ejecución por paquete obligaciones de retiro seguro, búsqueda de consumidores, compatibilidad, regresión, evidencia, actualización controlada y rollback que ya están registradas y asignadas. No introduce una regla verificable independiente que requiera otra identidad de requisito; tampoco ejecuta todavía un retiro o una instancia.

---

#### 27. Evidencia de validación

| Clase     | Estado         | Evidencia                                                                                                                                                                                                                                |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD     | NOT_EXECUTED   | El marcador global no modifica código ni materializa una instancia de paquete; no existe build de retiro atribuible a esta definición documental.                                                                                        |
| LOCAL     | PASS           | El artefacto materializa una sola tarea, 1 plantilla, 6 lotes, 11 candidatos físicos, 4 identidades internas, 3 clases de elegibilidad, 12 gates y 8 clases de evidencia, con conciliación y continuidad completas.                      |
| REMOTA    | PASS           | Se verificaron continuidad, owner, topología `TEMPLATE_PER_PACKAGE`, dependencias de desarrollo, decisiones de auditoría, políticas de actualización/gates, inventario residual y siguiente identidad canónica contra el remoto vigente. |
| OPERATIVA | NOT_APPLICABLE | Ninguna instancia `SHELL-MIG-008::<package_id>` se ejecuta durante la definición global.                                                                                                                                                 |
| FÍSICA    | NOT_APPLICABLE | No se eliminan archivos, miembros, rutas, packages, datos ni objetos Supabase durante esta tarea documental.                                                                                                                             |

---

#### 28. Criterios de aceptación

`SHELL-MIG-008` queda documentalmente completa cuando:

- [x] se conserva la modalidad `TEMPLATE_PER_PACKAGE`;
- [x] se define una sola plantilla global y no se reabre por paquete;
- [x] se separan dependencias de desarrollo y de ejecución;
- [x] se define `SHELL-MIG-008::<package_id>` como identidad de instancia;
- [x] se define la relación con el mismo `package_id` y su unidad de implementación;
- [x] se reconcilian exactamente 6 lotes residuales;
- [x] se reconcilian exactamente 11 candidatos físicos;
- [x] se reconcilian 4 identidades internas de retiro controlado;
- [x] se excluyen las dos acciones SHELL propietarias de `SHELL-APP-021`;
- [x] se preserva `@vento/os-context` como transición y no como código muerto;
- [x] se distinguen tres clases de elegibilidad;
- [x] se exige búsqueda multiclase de consumidores;
- [x] se definen doce gates de certificación;
- [x] se reutiliza la semántica fail-closed de los gates de package;
- [x] se definen ocho clases de evidencia;
- [x] se exige paridad para legacy previamente consumido;
- [x] se protege explícitamente el legacy consumido de NEXO, PULSO, ORIGO y VISO;
- [x] se impide convertir `MIGRATE` en retiro inerte;
- [x] se define conciliación entre paquetes y unidades;
- [x] se exige inventario residual después de cada instancia;
- [x] se exige rollback reproducible y ensayado por repositorio;
- [x] se prohíbe certificar eliminaciones fuera del package_id aprobado;
- [x] se declaran 0 retiros físicos en la tarea global;
- [x] se declaran 0 instancias ejecutadas;
- [x] se declaran 0 cambios de requisitos de prueba;
- [x] `SHELL-NATIVE-001` permanece únicamente reservada.

---

#### 29. Límites

Esta tarea no:

- ejecuta `SHELL-MIG-008::<package_id>`;
- crea ni modifica un package_id;
- modifica un implementation_unit_id;
- aprueba `E5-GATE-008::<package_id>`;
- inicia ni modifica `SHELL-CI-020::<package_id>` a `SHELL-CI-024::<package_id>`;
- borra archivos, props, ramas, exports, rutas, scripts o endpoints;
- retira `@vento/os-context`;
- elimina `employee-sites.ts` de ORIGO;
- elimina `PageHeader` de VISO;
- elimina SSO NEXO o PULSO mientras conserven consumidores;
- elimina rutas o middleware por ausencia de imports;
- retira scripts por ausencia de llamadas JavaScript;
- retira endpoints o RPC sin su inventario y gate propietario;
- abre, fusiona ni despliega un pull request;
- modifica manifest o lockfile de consumidor;
- ejecuta lint, typecheck, build o pruebas de una instancia futura;
- modifica autorización, contexto, sesión o permisos;
- modifica Supabase, SQL, RLS, RPC, Storage, Realtime, Edge Functions, datos, secretos o configuración;
- convierte una evidencia histórica en certificación física;
- crea una excepción sin fuente canónica;
- desarrolla ni ejecuta la tarea siguiente.

---

#### 30. Continuidad

**ÚLTIMA TAREA APROBADA**
`SHELL-MIG-007 — Definir contrato de paridad ejecutable por paquete`

**TAREA ACTUAL APROBADA**
`SHELL-MIG-008 — Definir gate de retiro legacy y certificación por paquete`

**SIGUIENTE TAREA RESERVADA**
`SHELL-NATIVE-001 — Crear tokens compatibles con ANIMA`

