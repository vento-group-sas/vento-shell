# @vento/ui-web

## Estado técnico actual — candidato privado de distribución

**Versión candidata:** `0.1.0-alpha.1`. El paquete conserva `private: true`: no se ha publicado, no tiene un registro npm certificado ni acredita instalación en consumidores. El contenido de `PRE_E5_FOUNDATION` y las secciones `SHELL-UI-001..020` siguientes se preserva como **evidencia histórica del momento en que se aprobó cada componente**, no como descripción del manifiesto físico actual.

El build materializa ESM y declaraciones TypeScript para 19 componentes con exports públicos explícitos (`@vento/ui-web` y 19 rutas `@vento/ui-web/<Componente>`), preservando los tipos públicos y los contratos de cada módulo. `AppShell`, `AreaSelector` y `SiteSelector` conservan la directiva `'use client'` en sus módulos JS individuales; las demás hojas son compatibles con renderizado de servidor según su API de presentación.

**CSS:** importar `@vento/ui-web/styles.css` una sola vez desde el layout global de Next o la entrada equivalente del consumidor. El build consolida exactamente 19 estilos de componente, en orden determinista. Los archivos JS ESM y las declaraciones no importan CSS implícitamente; no combinar con imports privados `src/*.css`.

**Validaciones locales de distribución:** `npm run build --workspace @vento/ui-web`, `npm run validate --workspace @vento/ui-web` y `node --test packages/ui-web/scripts/validate-distribution.test.mjs`. La verificación revisa 41 salidas, 21 entradas de exportación, 19 validadores históricos, tres hojas cliente, renderizado ESM/SSR de humo y 43 elementos del dry-run de npm pack. No demuestra todavía hidratación real en un consumidor Next independiente, ni instalación de tarball publicado, ni compatibilidad de los siete repositorios.

**Dependencias candidatas:** React y React DOM `>=19.2.3 <20`; TypeScript `>=5 <6`; Next `>=16.1.1 <17` y Tailwind `>=4 <5` requieren certificación de consumidores, no se presumen compatibles solo por declararlas. Ninguna aplicación consumidora ha migrado a este candidato por este trabajo.

**Pendiente de integración:** sincronizar `package-lock.json` del repositorio cuando se libere la exclusividad del recurso compartido con `GAP-PKG-004`, completar pruebas de hidratación/SSR con Next instalado desde tarball y resolver el proveedor y namespace de registry compatible con `@vento`. No se ejecutaron push, tags, publicación, despliegue ni migraciones de Supabase.

---

Raiz privada de autoria para la implementacion visual web compartida de Vento OS.

## Estado

`PRE_E5_FOUNDATION`

`SHELL-UI-001::GLOBAL` materializo la identidad fisica del workspace `@vento/ui-web` autorizada por la reconciliacion `GLOBAL_ENABLE_ONCE` / `PRE_E5_FOUNDATION`.

`SHELL-UI-002::GLOBAL` materializo internamente `Alert` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-002`.

`SHELL-UI-003::GLOBAL` materializa internamente `Button` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-003`, sin publicar todavia una API npm, una version, un entrypoint CSS ni una adopcion por consumidores.

`SHELL-UI-004::GLOBAL` materializa internamente `Card` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-004`, sin publicar todavia una API npm, una version, un entrypoint CSS ni una adopcion por consumidores.

`SHELL-UI-005::GLOBAL` materializa internamente `EmptyState` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-005`, sin publicar todavia una API npm, una version, un entrypoint CSS ni una adopcion por consumidores.

`SHELL-UI-006::GLOBAL` materializa internamente `ContextIndicator` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-006`, sin resolver contexto, publicar una API npm, una version, un entrypoint CSS ni migrar consumidores.

`SHELL-UI-007::GLOBAL` materializa internamente `SiteSelector` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-007`, sin resolver contexto, persistir sede, consultar red, publicar una API npm ni migrar consumidores.

`SHELL-UI-008::GLOBAL` materializa internamente `AreaSelector` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-008`, sin resolver elegibilidad, autoridad, persistencia, red, publicar una API npm ni migrar consumidores.

`SHELL-UI-009::GLOBAL` materializa internamente `SimulatedRoleNotice` y sus estilos de componente bajo el contrato aprobado de `SHELL-UI-009`, como presentacion estatica de simulacion controlada por su propietario, sin resolver autoridad, lifecycle, persistencia, red, publicar una API npm ni migrar consumidores.

`SHELL-UI-010::GLOBAL` materializa internamente `AppShell` como marco interactivo de composicion y sus estilos de chrome bajo el contrato aprobado de `SHELL-UI-010`, con navegacion preparada externamente y disclosure local, sin resolver identidad, autoridad, contexto, datos, rutas empresariales, publicar una API npm ni migrar consumidores.

`SHELL-UI-011::GLOBAL` materializa internamente `TaskNavigation` como superficie server-safe de grupos y destinos orientados a trabajo bajo el contrato aprobado de `SHELL-UI-011`, con identidad semantica preparada externamente, cinco estados renderizables y composicion dentro de `AppShell.navigation`, sin resolver permisos, contexto, prioridad, router, datos, publicar una API npm ni migrar consumidores.

`SHELL-UI-012::GLOBAL` materializa internamente `ProcessStatusLine` como linea server-safe de lectura para posiciones de proceso ya resueltas bajo el contrato aprobado de `SHELL-UI-012`, con orden y estados explicitos `REACHED`, `CURRENT` y `NOT_REACHED`, sin inferir transiciones, autoridad, sincronizacion, router, datos, publicar una API npm ni migrar consumidores.

`SHELL-UI-013::GLOBAL` materializa internamente `PrimaryActionPanel` como superficie server-safe de jerarquia para una unica accion principal ya resuelta, con identidad estable, cuatro estados presentacionales y controles compuestos externamente, sin seleccionar acciones, resolver autoridad, ejecutar efectos empresariales, publicar una API npm ni migrar consumidores.

`SHELL-UI-014::GLOBAL` materializa internamente `SensitiveActionConfirmation` como superficie server-safe de confirmacion explicita para una accion sensible ya clasificada por su propietario, con identidad estable, cuatro estados presentacionales y controles compuestos externamente, sin clasificar riesgo, resolver autoridad, ejecutar efectos empresariales, publicar una API npm ni migrar consumidores.

`SHELL-UI-015::GLOBAL` materializa internamente `ContextDiagnostic` como superficie server-safe de diagnostico humano para una condicion contextual ya resuelta y minimizada por su propietario, con cinco estados compatibles con `ContextIndicator`, condiciones ordenadas, contexto preservado, impacto y resolucion segura, sin resolver contexto, evaluar autoridad, ejecutar recuperacion, publicar una API npm ni migrar consumidores.

`SHELL-UI-016::GLOBAL` materializa internamente `RecoverableErrorState` como superficie server-safe de recuperacion humana para una condicion ya clasificada y una politica de recuperacion resuelta externamente, con tres categorias canonicas, cinco estados de preservacion, detalles seguros, siguiente paso y controles aportados por el consumidor, sin clasificar errores, decidir retries, resolver autoridad, ejecutar efectos empresariales, publicar una API npm ni migrar consumidores.

`SHELL-UI-017::GLOBAL` materializa internamente `TabletTaskSurface` como superficie server-safe de composicion tactil para una semantica de trabajo ya resuelta en tablet personal o compartida, con dos clases canonicas, siete slots ordenados, reflow responsive, ergonomia tactil y controles aportados por el consumidor, sin detectar dispositivo, resolver actor o autoridad, decidir densidad, ejecutar efectos empresariales, publicar una API npm ni migrar consumidores.

`SHELL-UI-018::GLOBAL` materializa internamente `KioskTaskSurface` como superficie server-safe de composicion operativa exclusivamente para un perfil `FIXED_KIOSK` ya resuelto, con siete slots ordenados, contexto persistente, ergonomia tactil y controles aportados por el consumidor, sin detectar kiosco, resolver actor o autoridad, administrar el dispositivo, ejecutar mantenimiento, publicar una API npm ni migrar consumidores.

`SHELL-UI-019::GLOBAL` materializa internamente `InterruptedProcessState` como superficie server-safe de continuidad humana para un proceso ya reconstruido y clasificado externamente, con diecisiete estados canonicos, seis campos de resumen y siete slots ordenados, sin reconstruir autoridad desde checkpoints, decidir retries, renovar claims, transferir custodia, persistir estado, publicar una API npm ni migrar consumidores.

`SHELL-UI-020::GLOBAL` materializa internamente `CrossAppHandoff` como superficie server-safe de continuidad cross-app para un handoff ya resuelto externamente, con siete estados canonicos y siete slots ordenados, sin resolver relaciones, construir deep links, heredar autoridad, inferir aceptacion por navegacion, escribir cross-app, decidir idempotencia o retry, publicar una API npm ni migrar consumidores.

## Responsabilidad canonica

La raiz contiene implementacion visual web compartida aprobada por sus tareas propietarias.

Fronteras vinculantes:

- contratos estaticos y catalogos autoritativos permanecen en `@vento/contracts`;
- contexto y autorizacion runtime permanecen en `@vento/os-context`;
- acceso compartido a datos permanece en `@vento/supabase`;
- `@vento/ui-web` no consulta Supabase ni evalua permisos;
- la logica empresarial y la composicion de proceso permanecen en cada aplicacion;
- React Native y Expo quedan fuera de esta raiz web;
- visibilidad, enabled o disabled en UI nunca sustituyen autorizacion de servidor.

## Superficie fisica actual

- `package.json` privado de workspace.
- Este `README.md`.
- `src/Alert.tsx` como implementacion interna de `Alert`.
- `src/alert.css` como estilos internos de `Alert`.
- `scripts/validate-alert.mjs` como validador fisico de `SHELL-UI-002::GLOBAL`.
- `src/Button.tsx` como implementacion interna de `Button`.
- `src/button.css` como estilos internos de `Button`.
- `scripts/validate-button.mjs` como validador fisico de `SHELL-UI-003::GLOBAL`.
- `src/Card.tsx` como implementacion interna de `Card`.
- `src/card.css` como estilos internos de `Card`.
- `scripts/validate-card.mjs` como validador fisico de `SHELL-UI-004::GLOBAL`.
- `src/EmptyState.tsx` como implementacion interna de `EmptyState`.
- `src/empty-state.css` como estilos internos de `EmptyState`.
- `scripts/validate-empty-state.mjs` como validador fisico de `SHELL-UI-005::GLOBAL`.
- `src/ContextIndicator.tsx` como implementacion interna de `ContextIndicator`.
- `src/context-indicator.css` como estilos internos de `ContextIndicator`.
- `scripts/validate-context-indicator.mjs` como validador fisico de `SHELL-UI-006::GLOBAL`.
- `src/SiteSelector.tsx` como implementacion interna de `SiteSelector`.
- `src/site-selector.css` como estilos internos de `SiteSelector`.
- `scripts/validate-site-selector.mjs` como validador fisico de `SHELL-UI-007::GLOBAL`.
- `src/AreaSelector.tsx` como implementacion interna de `AreaSelector`.
- `src/area-selector.css` como estilos internos de `AreaSelector`.
- `scripts/validate-area-selector.mjs` como validador fisico de `SHELL-UI-008::GLOBAL`.
- `src/SimulatedRoleNotice.tsx` como implementacion interna de `SimulatedRoleNotice`.
- `src/simulated-role-notice.css` como estilos internos de `SimulatedRoleNotice`.
- `scripts/validate-simulated-role-notice.mjs` como validador fisico de `SHELL-UI-009::GLOBAL`.
- `src/AppShell.tsx` como implementacion interna de `AppShell`.
- `src/app-shell.css` como estilos internos del marco y disclosure responsive de `AppShell`.
- `scripts/validate-app-shell.mjs` como validador fisico de `SHELL-UI-010::GLOBAL`.
- `src/TaskNavigation.tsx` como implementacion interna de `TaskNavigation`.
- `src/task-navigation.css` como estilos internos de grupos, destinos y estados de `TaskNavigation`.
- `scripts/validate-task-navigation.mjs` como validador fisico de `SHELL-UI-011::GLOBAL`.
- `src/ProcessStatusLine.tsx` como implementacion interna de `ProcessStatusLine`.
- `src/process-status-line.css` como estilos internos de estados, conectores y reflow de `ProcessStatusLine`.
- `scripts/validate-process-status-line.mjs` como validador fisico de `SHELL-UI-012::GLOBAL`.
- `src/PrimaryActionPanel.tsx` como implementacion interna de `PrimaryActionPanel`.
- `src/primary-action-panel.css` como estilos internos de jerarquia, estados y reflow de `PrimaryActionPanel`.
- `scripts/validate-primary-action-panel.mjs` como validador fisico de `SHELL-UI-013::GLOBAL`.
- `src/SensitiveActionConfirmation.tsx` como implementacion interna de `SensitiveActionConfirmation`.
- `src/sensitive-action-confirmation.css` como estilos internos de consecuencia, estados, controles y reflow de `SensitiveActionConfirmation`.
- `scripts/validate-sensitive-action-confirmation.mjs` como validador fisico de `SHELL-UI-014::GLOBAL`.
- `src/ContextDiagnostic.tsx` como implementacion interna de `ContextDiagnostic`.
- `src/context-diagnostic.css` como estilos internos de diagnostico, condiciones, contexto preservado, impacto, resolucion y reflow de `ContextDiagnostic`.
- `scripts/validate-context-diagnostic.mjs` como validador fisico de `SHELL-UI-015::GLOBAL`.
- `src/RecoverableErrorState.tsx` como implementacion interna de `RecoverableErrorState`.
- `src/recoverable-error-state.css` como estilos internos de categoria, estado preservado, detalle, siguiente paso, controles y reflow de `RecoverableErrorState`.
- `scripts/validate-recoverable-error-state.mjs` como validador fisico de `SHELL-UI-016::GLOBAL`.
- `src/TabletTaskSurface.tsx` como implementacion interna de `TabletTaskSurface`.
- `src/tablet-task-surface.css` como estilos internos de estructura semantica, reflow, ergonomia tactil, separacion de acciones y presentacion responsive de `TabletTaskSurface`.
- `scripts/validate-tablet-task-surface.mjs` como validador fisico de `SHELL-UI-017::GLOBAL`.
- `src/KioskTaskSurface.tsx` como implementacion interna de `KioskTaskSurface`.
- `src/kiosk-task-surface.css` como estilos internos de estructura semantica, reflow, ergonomia tactil, separacion de acciones y presentacion enfocada de `KioskTaskSurface`.
- `scripts/validate-kiosk-task-surface.mjs` como validador fisico de `SHELL-UI-018::GLOBAL`.
- `src/InterruptedProcessState.tsx` como implementacion interna de `InterruptedProcessState`.
- `src/interrupted-process-state.css` como estilos internos de continuidad, resumen, bloqueos, acciones, resultado y reflow de `InterruptedProcessState`.
- `scripts/validate-interrupted-process-state.mjs` como validador fisico de `SHELL-UI-019::GLOBAL`.
- `src/CrossAppHandoff.tsx` como implementacion interna de `CrossAppHandoff`.
- `src/cross-app-handoff.css` como estilos internos de continuidad cross-app, bloqueos, acciones, resultado y reflow de `CrossAppHandoff`.
- `scripts/validate-cross-app-handoff.mjs` como validador fisico de `SHELL-UI-020::GLOBAL`.
- Sin `version` npm.
- Sin `main`, `types` o `exports` en el manifest del package.
- Sin `dependencies`, `devDependencies` o `peerDependencies` propias.
- Sin `scripts` declarados en el manifest del package.
- Sin entrypoint CSS publico o distribuible.
- Sin publicacion, registry, tags o releases.
- Sin consumidores migrados.

## Alert

`Alert` representa un mensaje o estado ya determinado por su propietario funcional. No determina el hecho empresarial, no autoriza, no consulta datos y no normaliza errores tecnicos.

Contrato interno materializado:

- variantes `neutral`, `success`, `warning` y `danger`;
- `neutral` por defecto;
- contenido visible `children` requerido;
- `icon` opcional;
- atributos HTML y ARIA transferibles al contenedor;
- `className` adicional permitido;
- root no interactivo basado en `div`;
- sin `role="alert"` ni `aria-live` impuestos por defecto;
- sin movimiento de foco por defecto;
- sin estado React obligatorio, efectos, timers, red, router, Supabase, sesion o autorizacion;
- compatible con SSR y con composicion desde componentes cliente.

Los nombres `.ui-alert*` usados por la implementacion interna no constituyen un contrato CSS publico del package mientras no exista un entrypoint CSS publicado.

La implementacion normaliza las variantes futuras a `warning` y `danger`. Las variantes legacy `.ui-alert--warn` y `.ui-alert--error` permanecen intactas en el template historico y en consumidores hasta su migracion propietaria; no se copian como variantes nuevas de la API.

## Button

`Button` representa una accion e interaccion entregada por el consumidor. No decide que acciones existen, quien puede ejecutarlas, que operacion empresarial corresponde ni si una mutacion fue confirmada.

Contrato interno materializado:

- variantes `primary`, `secondary`, `outline`, `ghost` y `danger`;
- `primary` por defecto;
- tamanos `sm`, `md` y `lg`;
- `md` por defecto;
- elemento HTML nativo `button`;
- `type="button"` por defecto, con `submit` y `reset` transferibles cuando el consumidor los declara;
- atributos nativos compatibles, eventos, `aria-*`, `data-*`, `className` y `style` transferibles;
- estado `disabled` basado en semantica nativa;
- `loading` deshabilita activacion repetida equivalente y expone `aria-busy="true"`;
- `loading` conserva `children` y por tanto la identidad visible y accesible de la accion;
- indicador visual de carga decorativo y compatible con `prefers-reduced-motion`;
- sin literal global `Cargando...` ni `loadingLabel` impuesto;
- sin prop especifica `fullWidth`;
- sin variante `brand` ni `success`;
- sin props especificas de icono;
- sin polimorfismo Link, `href`, router o navegacion;
- sin estado React obligatorio, efectos, timers, red, Supabase, sesion o autorizacion;
- compatible con SSR y con composicion desde componentes cliente.

Los nombres `.ui-button*` usados por la implementacion interna no constituyen un contrato CSS publico del package mientras no exista un entrypoint CSS publicado.

La variante `danger` expresa riesgo visual solamente. No sustituye confirmacion, step-up, permiso, validacion de recurso, idempotencia, receipt ni auditoria. El patron compuesto de confirmaciones sensibles permanece reservado a `SHELL-UI-014`.

La ocupacion de ancho permanece responsabilidad de layout o composicion. La implementacion legacy local con `fullWidth`, el literal `Cargando...` y el boundary `use client`, asi como la variante historica `brand` de `vento/standard`, permanecen intactos hasta su migracion propietaria; no se copian como contrato nuevo.

## Card

`Card` organiza contenido dentro de una superficie visual compartida. No determina estados empresariales, no concede autoridad, no ejecuta operaciones y no crea navegacion o activacion por si misma.

Contrato interno materializado:

- variantes `surface`, `soft` y `raised`;
- `surface` por defecto;
- paddings `sm`, `md` y `lg`;
- `md` por defecto;
- elemento HTML nativo no interactivo `div`;
- `children` opcional para permitir una Card vacia sin fallback inventado;
- atributos compatibles de `HTMLDivElement`, eventos, `aria-*`, `data-*`, `className` y `style` transferibles;
- sin `role`, `tabIndex`, nombre accesible, foco o keyboard handlers impuestos por defecto;
- sin props `interactive`, `clickable`, `selected`, `disabled` o `loading`;
- sin variantes empresariales `success`, `warning`, `danger` o `brand`;
- sin `href`, `to`, router, Link, `as` o `asChild`;
- sin `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` ni `CardAction` publicos;
- sin estado React obligatorio, efectos, timers, red, Supabase, sesion o autorizacion;
- compatible con SSR y con composicion desde componentes cliente.

Los nombres `.ui-card*` usados por la implementacion interna no constituyen un contrato CSS publico del package mientras no exista un entrypoint CSS publicado. Los valores fisicos actuales de padding, radio, superficie y sombra son detalles internos de esta materializacion y no se convierten en API publica. El candidato legacy local `src/components/ui/Card.tsx` y su barrel local permanecen intactos hasta una migracion controlada.

`raised` expresa mayor separacion visual, no interactividad ni prioridad empresarial. `soft` expresa una superficie secundaria, no estado disabled ni pendiente. El `backdrop-blur-xl` historico no se perpetua como contrato base y la sombra permanente de la familia `vento/standard` no se extiende a todas las Cards; la apariencia historica elevada se reconcilia conceptualmente bajo `raised` para una migracion posterior. El padding fijo `p-6` historico no crea una cuarta densidad y su paridad queda diferida a la migracion propietaria.

Una tarjeta completamente activable debe componer semantica nativa de enlace o boton en su superficie propietaria. La Card base no convierte un `div onClick` en el patron canonico de accion. Los componentes `*Card` de dominio no se absorben por coincidencia nominal; pueden adoptar la primitiva internamente durante su migracion sin dejar de pertenecer a su dominio.

## EmptyState

`EmptyState` presenta una ausencia confirmada dentro de un alcance ya resuelto. No determina por que no existe contenido, no consulta datos, no evalua permisos y no transforma un resultado desconocido en una afirmacion de ausencia.

Contrato interno materializado:

- `title` requerido como contenido principal visible y significativo aportado por el consumidor;
- `description` opcional;
- `icon` opcional y sin icono global por defecto;
- `action` opcional como nodo compuesto por el consumidor;
- elemento HTML nativo no interactivo `div`;
- atributos compatibles de `HTMLDivElement`, `aria-*`, `data-*`, `className` y `style` transferibles; el atributo HTML nativo `title` queda reservado por la prop principal `title`;
- sin `role="alert"`, `aria-live`, `tabIndex`, captura de foco o movimiento de foco impuestos por defecto;
- sin `variant`, `kind`, `status`, `size` ni `density`;
- sin `cta`, `href`, `to` ni router propios;
- sin Card interna obligatoria y sin dependencia obligatoria de Alert o Button;
- sin Supabase, sesion, permisos, contexto, red, timers ni persistencia;
- sin estado React obligatorio y compatible con SSR y composicion desde componentes cliente.

El icono se trata como apoyo visual decorativo por defecto y queda fuera del nombre accesible de la primitiva; el significado debe seguir siendo comprensible mediante `title` y, cuando aplique, `description`. Una accion puede componer un `Button` o un enlace semantico del consumidor sin convertir `EmptyState` en Button, Link o router.

La representacion visual interna usa una columna centrada de baja jerarquia, reflow, texto largo y el token existente `--ui-muted` para contenido secundario. No introduce superficie, borde, sombra, radio, altura minima ni ancho fijo propios de Card. Los valores fisicos actuales son detalles internos de esta materializacion y no se convierten en API publica.

### Frontera semantica de vacio

El vacio base solo corresponde cuando existe consulta o inicializacion exitosa, el alcance ya resuelto es conocido y la capa propietaria ha confirmado ausencia para ese alcance.

Un vacio filtrado conserva los filtros activos o su alcance comprensible en la superficie propietaria y no afirma inexistencia global.

Un error de carga no es EmptyState. `EmptyState` no representa carga o `loading`, resultado parcial, resultado desconocido, timeout sin conciliacion, cache stale sin certeza suficiente ni sincronizacion pendiente.

Una denegacion de permiso no es una coleccion vacia. El masking no puede usar un mensaje vacio para revelar existencia o conteo de elementos ocultos.

La ausencia de seleccion puede representarse como EmptyState cuando es una seleccion legitima dentro de una pantalla ya resuelta; no sustituye contexto operativo obligatorio como sede, area, turno, check-in, actor o permiso requeridos.

Una cola despejada solo se presenta como tal cuando la consulta propietaria esta completa y suficientemente fresca. La ausencia de trabajo para el actor no implica ausencia global y `EmptyState` nunca crea ni autoasigna trabajo.

Una accion de primer registro solo puede componerse cuando existe una accion real y el actor elegible ya fue determinado por el propietario funcional. El componente no fabrica autoridad ni ofrece CTAs automaticos.

### Reconciliacion legacy y consumidores

Las clases `.ui-empty-state` y `.ui-empty` permanecen legacy y no se convierten en selectores publicos del package. Esta materializacion utiliza una clase raiz interna distinta y deja sin migrar consumidores.

`.ui-empty-state` requiere clasificacion semantica antes de cualquier adopcion. `.ui-empty` puede ser candidato title-only cuando realmente represente ausencia y la region no necesite composicion adicional.

Los usos legacy que en realidad representen error requieren reclasificacion. Los usos que representen permiso o contexto tambien requieren reclasificacion antes de migrar.

La evidencia de ORIGO proveedores conserva la diferencia entre vacio base y vacio filtrado. La evidencia de ORIGO ordenes exige distinguir filtros activos antes de afirmar ausencia global. FOGO demuestra que un estado title-only es valido sin icono obligatorio; VISO confirma que superficies administrativas densas pueden conservar una representacion compacta y separar error de vacio.

La adopcion, paridad por consumidor, compatibilidad y rollback independiente permanecen en `SHELL-MIG-*` y `SHELL-CI-*`. La paridad por consumidor debe demostrarse antes de retiro legacy. Consumidores migrados: 0.

## ContextIndicator

`ContextIndicator` representa una proyeccion humana, compacta y accesible de contexto efectivo o alcance aplicable ya resuelto por una capa propietaria. No resuelve contexto, no crea autoridad, no modifica sede, area, turno o rol y no habilita operaciones empresariales.

Contrato interno materializado:

- `state` obligatorio con los estados `resolving`, `active`, `changing`, `stale`, `invalid` y `unavailable`;
- `stateLabel` obligatorio como texto humano visible;
- `items` obligatorio como coleccion readonly de pares `label` y `value`;
- orden de `items` preservado exactamente como lo entrega el consumidor;
- cero items permitido sin inventar contexto ni copy de fallback;
- raiz HTML `div` no interactiva;
- dimensiones representadas mediante estructura descriptiva `dl`, `dt` y `dd`;
- atributos compatibles de `HTMLDivElement`, `aria-*`, `data-*`, `className` y `style` transferibles;
- sin `children` libre, `variant`, `tone`, enum visual de dimensiones ni API obligatoria de iconos;
- sin `role="status"`, `aria-live`, `tabIndex`, foco automatico o movimiento de foco impuestos por defecto;
- sin estado React obligatorio, efectos, timers, red, router, storage, Supabase, sesion o autorizacion;
- compatible con SSR y composicion desde componentes cliente.

El significado del estado permanece en `stateLabel` y no depende solo de color. Los estilos internos usan tokens visuales existentes y conservan reflow, zoom, valores largos y disposicion de una o varias columnas sin exigir scroll horizontal ordinario.

### Frontera de autoridad y frescura

`ContextIndicator` recibe decisiones de presentacion ya resueltas. No recibe ni interpreta `EffectiveContext`, `AccessContext` o `SimulationContext`, no evalua permisos y no deriva sede, area, rol, turno, check-in, actor, dispositivo o territorio desde URL, query parameters, storage, nombre de aplicacion o primera opcion disponible.

`active` expresa que la capa propietaria declaro vigente la proyeccion; no significa permiso concedido. `stale` no prolonga autoridad. `invalid` no diagnostica la causa. `unavailable` no se transforma en EmptyState.

Durante `changing`, una seleccion solicitada no equivale a contexto nuevo confirmado. El destino solicitado no se presenta como activo hasta que la capa propietaria entregue la proyeccion confirmada.

### Contexto operativo y alcance administrativo

Las etiquetas aportadas por el consumidor conservan las diferencias entre sede activa, filtro administrativo, area activa, rol base, rol operativo, turno, check-in, actor, dispositivo, estacion y territorio del recurso.

El componente no convierte un filtro administrativo en contexto operativo, no convierte un turno programado en turno vigente y no convierte un dispositivo compartido en actor humano.

### Composicion, simulacion y diagnostico

`Alert` y `ContextIndicator` conservan responsabilidades distintas: el indicador resume contexto y `Alert` comunica mensajes que la composicion propietaria determine.

Los selectores de sede y area permanecen separados. `ContextIndicator` puede coexistir con `SiteSelector`, `AreaSelector` y `SimulatedRoleNotice`, pero no lo absorbe ni implementa sus cambios de autoridad.

La simulacion material permanece perceptible mediante la composicion propietaria. El diagnostico detallado de contexto tambien permanece fuera del indicador.

### Privacidad, legacy y consumidores

La minimizacion ocurre antes de renderizar. El indicador recibe lenguaje humano necesario para la tarea y no utiliza datos tecnicos o privados como UUID, correo, telefono, documento, token, identificador de sesion, nombres de tablas, RPC o permisos como sustituto del contenido humano.

Las implementaciones `VentoChrome`, chips, menus, selectores y presentaciones de contexto actuales permanecen legacy hasta su migracion propietaria. No se copian firmas locales como API comun.

La adopcion permanece en `SHELL-MIG-*` y `SHELL-CI-*`. Debe demostrarse paridad por consumidor antes de retiro legacy. Consumidores migrados: 0.

## SiteSelector

`SiteSelector` presenta candidatas de sede ya preparadas por la capa propietaria y emite una solicitud de cambio. El componente no resuelve contexto, no confirma la transicion y no produce autoridad.

Contrato interno materializado:

- frontera cliente aislada mediante `use client` exclusivamente para capturar la interaccion del control;
- `label` obligatorio y visible;
- `confirmedSiteId` obligatorio y nullable como sede confirmada entregada por la capa propietaria;
- `requestedSiteId` opcional como destino solicitado todavia no confirmado;
- `options` readonly de `SiteSelectorOption` con `id` estable y `label` humano;
- `onRequestChange(siteId)` como emision de intencion, no como receipt ni confirmacion;
- `pending`, `pendingLabel`, `disabled` y `placeholderLabel` como estado de presentacion e interaccion;
- control nativo `select` asociado a un `label`, con opciones nativas y orden preservado;
- placeholder no accionable cuando la composicion aporta `placeholderLabel` o no existe una opcion seleccionable confirmada;
- sin `defaultSiteId`, `primarySiteId`, `lastSiteId`, `activeSiteId`, `canSwitchRole`, `canOperate`, `permissionCode`, `role`, `siteCookie`, `queryParam`, `supabaseClient` ni `employeeId`;
- sin taxonomia publica `variant`, `tone`, `size`, `fullWidth`, `compact`, `kiosk`, `admin` u `operational`;
- sin combobox buscable, listeners globales, autofocus, navegacion o persistencia propios.

### Sede confirmada y solicitud pendiente

`confirmedSiteId` representa exclusivamente la sede confirmada recibida. `requestedSiteId` representa una solicitud en curso y solo puede ocupar el valor visual del control mientras `pending=true`; no sustituye `confirmedSiteId` como autoridad.

Durante una transicion, la composicion puede mantener `ContextIndicator state="changing"` mientras `SiteSelector` muestra la candidata solicitada y el texto de `pendingLabel`. La nueva sede solo se trata como confirmada cuando la capa propietaria vuelve a renderizar con el nuevo `confirmedSiteId`.

El selector no autoelige la primera opcion, no autoemite cuando existe una sola opcion, no inventa opciones cuando la lista esta vacia y no crea una opcion universal `Sin sede`. Una sede confirmada que no figure en `options` tampoco se sintetiza como opcion nueva.

### Autoridad, revalidacion y concurrencia

La presencia de una opcion solo significa que puede mostrarse como candidata. El servidor revalida elegibilidad, autoridad y estado fresco antes de la confirmacion. Despues de un cambio confirmado, la capa propietaria debe invalidar el contexto anterior y publicar la nueva proyeccion autoritativa.

La concurrencia puede volver obsoleta una lista de opciones entre render y solicitud. `SiteSelector` no mantiene cache autoritativo de elegibilidad, no reintenta por su cuenta y no transforma una seleccion offline en cambio confirmado. Mientras `pending=true`, el control impide solicitudes concurrentes o equivalentes desde la misma instancia.

### Fronteras de composicion

`SiteSelector` no es un filtro administrativo: un filtro administrativo limita una consulta y no cambia contexto operativo. Tampoco contiene `AreaSelector`; ambos selectores conservan contratos separados y su coordinacion pertenece a la capa propietaria. Simulacion, diagnostico, recuperacion, confirmaciones sensibles y AppShell conservan sus tareas propietarias.

El componente no consulta `@vento/supabase`, no abre cliente Supabase, no conoce `employee_settings`, no escribe `selected_site_id`, no lee ni escribe cookies o storage, no consume `site_id` desde query params, no usa router, no ejecuta RPC y no realiza llamadas de red. Las opciones visibles y la disponibilidad se preparan fuera del componente y nunca sustituyen enforcement de servidor.

### Legacy, migracion y rollback

El selector del template historico y las seis copias runtime observadas en NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA permanecen legacy. Sus cookies, query params, escrituras cliente y gating local de roles no se copian a la API compartida.

La adopcion permanece en `SHELL-MIG-*` y `SHELL-CI-*`, por lotes reversibles con paridad y rollback antes de retirar cada copia legacy. Consumidores migrados: 0.

## AreaSelector

`AreaSelector` presenta candidatas de area ya preparadas por la capa propietaria y emite una solicitud de cambio. El componente no resuelve elegibilidad, no confirma la transicion, no persiste preferencias y no produce autoridad.

Contrato interno materializado:

- frontera cliente aislada mediante `use client` exclusivamente para capturar la interaccion del control;
- `label` obligatorio y visible;
- `confirmedAreaId` obligatorio y nullable como area confirmada entregada por la capa propietaria;
- `requestedAreaId` opcional y nullable como destino solicitado todavia no confirmado;
- `options` readonly de `AreaSelectorOption` con `id` estable y `label` humano;
- `onRequestChange(areaId)` como emision de intencion, no como receipt ni confirmacion;
- `pending`, `pendingLabel`, `disabled` y `placeholderLabel` como estado de presentacion e interaccion;
- control nativo `select` asociado a un `label`, con opciones nativas y orden preservado;
- placeholder no accionable cuando la composicion aporta `placeholderLabel` o no existe una opcion confirmada visible;
- sin `defaultAreaId`, `primaryAreaId`, `lastAreaId`, `preferredAreaId`, `deviceAreaId`, `firstEligibleAreaId`, `siteId`, `areaKind`, permisos, grants, scopes ni contexto runtime como API publica;
- sin taxonomia publica `variant`, `tone`, `size`, `fullWidth`, `compact`, `kiosk`, `admin` u `operational`;
- sin combobox buscable, listeners globales, autofocus, navegacion, persistencia o estado autoritativo propios.

### Area confirmada y solicitud pendiente

`confirmedAreaId` representa exclusivamente el area confirmada recibida. `requestedAreaId` representa una intencion en curso y solo puede ocupar el valor visual del control mientras `pending=true`; no sustituye `confirmedAreaId` como autoridad.

Durante una transicion, la composicion puede mantener `ContextIndicator state="changing"` mientras `AreaSelector` muestra la candidata solicitada y el texto de `pendingLabel`. `ContextIndicator` conserva el contexto confirmado hasta que exista un receipt autoritativo. La nueva area solo se trata como confirmada cuando la capa propietaria vuelve a renderizar con el nuevo `confirmedAreaId`.

El selector no autoelige la primera opcion, no autoemite cuando existe una sola opcion, no inventa una causa cuando la lista esta vacia y no crea una opcion universal `Sin area`. Un area confirmada que no figure en `options` tampoco se sintetiza como opcion nueva.

### Sede, elegibilidad y estaciones compartidas

`AreaSelector` no recibe `siteId` para calcular pertenencia ni elegibilidad. La capa propietaria prepara `options` contra la sede y el contexto territorial vigentes. Un cambio confirmado de sede puede invalidar el area anterior; el selector no la conserva como fallback ni autoelige la primera area del nuevo conjunto.

`SiteSelector` y `AreaSelector` pueden coexistir, pero la coordinacion sede-area, la invalidacion de solicitudes incompatibles y cualquier transicion conjunta permanecen fuera de ambos componentes.

En estaciones compartidas o multi-area, la interseccion entre dispositivo, actor, turno, permiso, proceso y territorio se calcula externamente. Las allowed areas del dispositivo son un limite externo, no una concesion de autoridad. Al cambiar de actor, la composicion descarta cualquier intencion de area incompatible y entrega una proyeccion nueva.

### Autoridad, filtros y concurrencia

Un filtro administrativo de area limita una consulta y no cambia contexto operativo. `AreaSelector` tampoco interpreta `area_kind`, nombre humano, URL, orden de opciones o configuracion del dispositivo como autoridad.

La presencia de una opcion solo significa que puede mostrarse como candidata. La autorizacion empresarial y la compatibilidad territorial se revalidan fuera del componente con contexto y recurso vigentes. Una superficie de bloqueo que prohiba corregir area localmente no puede reutilizar el selector como bypass.

La concurrencia puede volver obsoleta una solicitud si cambian actor, sede, turno, check-in, rol, dispositivo, simulacion, pertenencia area-sede, permiso, recurso o trabajo en curso. `AreaSelector` no conserva estado autoritativo interno, no aplica resultados obsoletos por su cuenta, no mantiene cache de elegibilidad y no crea una cola offline de cambios. Mientras `pending=true`, el control impide solicitudes concurrentes desde la misma instancia.

### Dependencias, persistencia y efectos

El componente no depende directamente de `@vento/os-context` ni recibe `EffectiveContext` como prop publica. Tampoco consulta `@vento/supabase`, abre cliente Supabase, ejecuta RPC, evalua permisos, lee o escribe cookies, `localStorage`, `sessionStorage`, IndexedDB, query parameters, URL, settings del trabajador o base de datos.

No inventa una columna o contrato `selected_area_id`, no navega para confirmar una seleccion y no ejecuta mutaciones de negocio. Borradores, claims, custodia, operaciones pendientes, confirmaciones sensibles, diagnostico y recuperacion permanecen bajo sus propietarios funcionales.

### Evidencia actual, migracion y rollback

No se observo un patron homogeneo de `AreaSelector` en las siete firmas `ProfileMenu` revisadas por el contrato: template historico mas NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA. Tampoco existe una primitiva local dedicada `AreaSelector` entre Button, Card, Chip, Input y Modal. Esa evidencia no autoriza a afirmar ausencia de controles de area en todo el ecosistema.

El inventario ejecutable completo, adopcion y retiro permanecen en `SHELL-MIG-*` y `SHELL-CI-*`. Cada consumidor requiere clasificacion, paridad y rollback verificable antes de retirar cualquier control existente. Consumidores migrados: 0.

## SimulatedRoleNotice

`SimulatedRoleNotice` presenta de forma perceptible una simulacion que ya fue determinada por una capa propietaria. El componente no detecta simulaciones, no decide cuando deben existir y no transforma una vista simulada en autoridad efectiva.

Contrato interno materializado:

- `title` obligatorio como titulo visible aportado por la composicion;
- `simulatedRoleLabel` obligatorio como nombre humano visible del rol que se esta representando;
- `description` obligatorio como explicacion visible del alcance de la vista;
- `nonExecutableLabel` obligatorio como texto visible que mantiene perceptible la naturaleza no ejecutable de la representacion;
- raiz HTML `div` no interactiva;
- atributos compatibles de `HTMLDivElement`, `aria-*`, `data-*`, `className` y `style` transferibles; `children` queda controlado por la estructura del componente;
- sin `use client`, estado React, effects, timers, autocierre, foco automatico, movimiento de foco ni listeners globales;
- sin `role="alert"` ni live region impuestos por defecto;
- compatible con SSR y con composicion desde componentes cliente.

### Simulacion, autoridad y lifecycle

La capa propietaria determina la existencia de una simulacion y renderiza solo cuando esa condicion ya fue resuelta. El componente no recibe `active` ni `isSimulated` para resolverla por su cuenta.

El rol simulado no sustituye el rol real y la primitiva no modifica identidad, rol base, rol operativo, sesion, contexto efectivo ni permisos. La presentacion no es autoridad: mostrar una capacidad o alcance simulado no concede permisos, no transforma `WOULD_ALLOW` en `ALLOW` y no habilita operaciones reales.

La permanencia visual depende del montaje decidido por la capa propietaria. La primitiva permanece sin dismiss y sin autocierre; no inicia ni termina simulaciones, no persiste sesiones, no audita el lifecycle y no hace enforcement de acciones. Tampoco ofrece selector de rol, salida de simulacion, modo solo lectura ni bloqueo de operaciones criticas.

### Composicion y dependencias

`ContextIndicator`, `SiteSelector`, `AreaSelector` y `SimulatedRoleNotice` conservan responsabilidades separadas. `ContextIndicator` puede resumir el contexto confirmado; los selectores emiten intenciones de cambio; el aviso hace perceptible una condicion simulada ya resuelta. Ninguno absorbe el contrato de los demas.

El copy empresarial permanece externo. Los cuatro textos son entregados por la composicion y no existe un literal global obligatorio como `Modo prueba`, `Solo lectura` o `No ejecutable` congelado dentro de la primitiva.

El componente no consulta `@vento/os-context`, `@vento/supabase`, Supabase, RPC, red, cookies, `localStorage`, `sessionStorage`, IndexedDB, URL, query params o router. No conoce tablas, settings, claims, grants, actor, empleado ni identificadores de sesion.

AppShell permanece fuera de esta materializacion y su evaluacion corresponde a `SHELL-UI-010`.

### Legacy, migracion y rollback

Los usos legacy de `Modo prueba`, role overrides y avisos locales existentes no se canonizan por coincidencia nominal. Su clasificacion, adopcion, paridad y retiro permanecen en `SHELL-MIG-*` y `SHELL-CI-*`.

Cada consumidor requiere paridad y rollback verificable antes de retirar una copia legacy. Consumidores migrados: 0.

## AppShell

`AppShell` es un marco de composicion para chrome y contenido web. Recibe piezas ya preparadas por la aplicacion, organiza landmarks, responsive y disclosure local de navegacion, pero no se convierte en orquestador de identidad, autorizacion, contexto, datos, gating o navegacion empresarial.

Contrato interno materializado:

- frontera cliente aislada mediante `use client` porque el disclosure de navegacion movil necesita estado local de presentacion;
- `children` obligatorio como contenido principal de la aplicacion;
- `brand` obligatorio como identidad visual ya preparada por el consumidor;
- `skipToContentLabel` obligatorio como texto humano y localizable aportado por el consumidor para el salto al contenido principal; este refinamiento fisico cumple la obligacion de accesibilidad sin congelar copy dentro del package;
- `navigation` opcional; cuando existe, la relacion de tipos exige `navigationLabel` humano y perceptible;
- navegacion presente exige `navigationLabel`; sin `navigation`, `navigationLabel` no forma parte de la combinacion valida de props;
- `context`, `notices` y `headerActions` opcionales como slots de composicion;
- atributos compatibles de `HTMLDivElement`, `aria-*`, `data-*`, `className` y `style` transferibles a la raiz;
- una sola cabecera estructural y un unico landmark `main` dentro del componente;
- enlace de salto al contenido principal con destino focusable mediante `tabIndex={-1}`;
- navegacion persistente en escritorio y disclosure colapsado por defecto en viewport reducido;
- navegacion movil cerrada mediante `display: none`, por lo que no permanece interactiva ni en el tab order de ese layout;
- control nativo `button` con `aria-controls` y `aria-expanded` para el disclosure;
- cierre local mediante el mismo control y mediante `Escape` cuando el foco esta dentro de la navegacion abierta; el cierre por `Escape` devuelve foco al control;
- sin animacion ni transicion obligatoria, por lo que no depende de movimiento para comunicar estado;
- sin variantes fisicas `tablet`, `kiosk`, `simulated`, `admin` u `operational` dentro de la API base.

### Slots y composicion

`brand` presenta identidad visual; no determina `AppCode`, permiso, dominio ni disponibilidad operacional.

`navigation` recibe navegacion preparada externamente. AppShell no define items, rutas, permisos ni agrupacion empresarial y no interpreta `permissionCode`, `required`, `anyOf`, matrices de rol o rutas autorizadas. `SHELL-UI-011` conserva la navegacion orientada a tareas y su contrato propio.

`context` reserva una ubicacion estable para una proyeccion visual ya resuelta. Puede componer `ContextIndicator`, `SiteSelector` y `AreaSelector`, pero AppShell no confirma sede, area, rol, turno, actor, dispositivo ni simulacion.

`notices` puede componer `SimulatedRoleNotice`, `Alert` u otros avisos ya preparados. AppShell no resuelve su causa, no los convierte en autoridad y no inicia recuperacion o lifecycle empresarial.

`headerActions` recibe utilidades ya preparadas. `AppSwitcher` y `ProfileMenu` pueden ser contenidos candidatos, pero no forman parte integral de AppShell y sus datos, catalogos, sesion y autoridad permanecen fuera del componente.

`children` ocupa el unico contenido principal. AppShell no inspecciona proceso, etapa, recurso, permiso, mutacion, idempotencia, confirmacion ni persistencia del contenido.

### Presentacion, autoridad y datos

El estado `navigationOpen` es exclusivamente presentacional. Abrir o cerrar el disclosure no cambia permisos, no filtra items, no activa contexto y no representa un receipt empresarial. La presentacion no sustituye autorizacion y la visibilidad del chrome nunca concede acceso.

AppShell no recibe `AccessContext`, `EffectiveContext`, `SimulationContext`, `siteId`, `areaId`, `shiftId`, `role` o `isSimulated` como contrato propio. Tampoco consulta `@vento/os-context`, `@vento/supabase`, Supabase, Auth, RPC, tablas, red, cookies, storage, query params o router.

No contiene `OperatingGate`, no reconstruye sesion, no resuelve empleados, no mantiene catalogo local de aplicaciones y no hardcodea rutas de NEXO, FOGO, ORIGO, VISO, PULSO, NUMERA o SHELL.

### Responsive, foco y accesibilidad

En escritorio, el marco puede mantener navegacion lateral junto al `main`. En viewport reducido, el layout pasa a disclosure y la navegacion cerrada queda fuera del flujo interactivo. El contenido, contexto, avisos y acciones permiten reflow mediante columnas flexibles, `min-width: 0`, wrapping y breakpoints sin imponer scroll horizontal estructural ordinario.

El control movil conserva semantica nativa, estado expandido perceptible y foco visible. El skip link aparece al recibir foco y permite saltar al `main`. El componente no crea listeners globales ni focus trap; el contenido suministrado por cada slot conserva su propia responsabilidad de accesibilidad.

### Consumidores, legacy y rollback

La materializacion global no migra aplicaciones. Permanecen 7 consumidores conceptualmente elegibles: `vento-shell`, `vento-nexo`, `vento-fogo`, `vento-origo`, `vento-viso`, `vento-pulso` y `vento-numera`.

La evidencia documental conserva 6 familias runtime duplicadas `VentoShell` / `VentoChrome` que requieren reconciliacion y 1 launcher SHELL con composicion diferenciada sin sidebar obligatorio. Esta instancia no adopta ninguna copia actual como API canónica, no modifica `templates/app-shell-standard` y no retira `VentoShell` o `VentoChrome`.

Consumidores migrados: 0/7. Copias legacy retiradas: 0. Releases publicadas por UI010: 0. Cambios Supabase por UI010: 0.

La adopcion, paridad, compatibilidad, observacion y rollback por consumidor permanecen en `SHELL-MIG-*`, `SHELL-CI-*` y los packages propietarios antes de cualquier retiro legacy.

## TaskNavigation

`TaskNavigation` presenta una proyeccion de navegacion ya resuelta y organizada alrededor de trabajo, obligacion, resultado y siguiente paso. Conserva estructura, identidad y estados presentacionales, pero no descubre permisos, no resuelve contexto, no calcula prioridad empresarial, no fabrica rutas y no convierte navegacion en una cola de tareas.

Contrato interno materializado:

- `TaskNavigationProps` exige `ariaLabel` humano y localizable, `groups` ya preparados y permite `currentNavigationId` ya resuelto;
- `TaskNavigationGroup` conserva `groupId`, `label`, `description` opcional e `items` en el orden recibido;
- `TaskNavigationItem` conserva `navigationId`, `intentCode`, `label`, `description`, `href`, `state`, `statusLabel`, `ownerLabel` e `icon` sin payloads de autorizacion;
- `TaskNavigationPresentationState` contiene exactamente `PRIMARY`, `SECONDARY`, `DISCOVERABLE`, `CONTEXTUAL_DISABLED` y `REQUIRED_BLOCKED`;
- `HIDDEN` queda fuera de la union renderizable: la capa propietaria excluye esos destinos antes de construir las props;
- `navigationId` es la identidad estable del destino y permanece separado de `href`, `label`, permiso, componente y proceso;
- `intentCode` permanece como identidad semantica para instrumentacion o adaptacion y no se presenta como copy ordinario;
- `currentNavigationId` marca el destino actual mediante `aria-current` cuando existe coincidencia y no se deriva de pathname, query params, hash, storage o historial;
- `href` se conserva como destino ya preparado y no implica autoridad para ejecutar la operacion de destino;
- grupos e items conservan estrictamente el orden recibido y la primitiva no realiza sorting autonomo;
- `CONTEXTUAL_DISABLED` y `REQUIRED_BLOCKED` permanecen visibles pero no accionables aunque reciban `href`;
- cualquier item sin `href` se presenta como no accionable sin inventar una causa;
- `statusLabel`, `ownerLabel`, `description` e `icon` permanecen opcionales y preparados externamente;
- iconos se tratan como decorativos por defecto y no sustituyen `label`;
- `groups` vacio no genera mensajes automaticos como ausencia de permisos, ausencia de trabajo o inexistencia de pantallas;
- duplicados de `groupId` o `navigationId` fallan cerrado para impedir identidad visual ambigua;
- atributos compatibles de `HTMLDivElement`, `aria-*`, `data-*`, `className` y `style` pueden transferirse a la raiz, mientras `children` y `aria-label` permanecen controlados por el contrato de la primitiva;
- sin `use client`, estado React, efectos, timers, red, browser storage, Supabase, sesion, router o lectura de contexto, por lo que la superficie base permanece server-safe.

### AppShell y landmarks

La composicion primaria es `AppShell.navigation -> TaskNavigation`. `AppShell` conserva el unico landmark de navegacion y su `navigationLabel`; `TaskNavigation` usa una raiz `role="group"` con `ariaLabel` para nombrar la estructura interna sin crear un segundo `<nav>` o `role="navigation"` anidado. La aplicacion debe mantener `AppShell.navigationLabel` y `TaskNavigation.ariaLabel` semanticamente coherentes para la misma finalidad localizada.

`AppShell` sigue siendo propietario del marco, disclosure responsive y tab order de la navegacion cerrada. `TaskNavigation` solo organiza grupos, listas, destinos, estado actual y estado no accionable dentro del contenido que recibe ese slot.

### Identidad, autoridad y trabajo

La presencia de un destino no concede acceso. La capa propietaria debe resolver previamente autorizacion, relevancia, visibilidad, descubribilidad, enabled, accionabilidad y obligatoriedad, y entregar a `TaskNavigation` solo la proyeccion presentable.

La API no recibe `permissionCode`, `requiredPermissions`, `anyOfPermissions`, roles, `AccessContext`, `AuthorizationDecision`, `canAccess`, `canExecute`, Supabase ni objetos de sesion. Tampoco interpreta `navigationId`, `intentCode`, `href`, label, grupo, icono o estado como autoridad.

Seleccionar un destino no equivale a claim, start, accept, approve, execute o complete. Los estados `PRIMARY`, `SECONDARY`, `DISCOVERABLE`, `CONTEXTUAL_DISABLED` y `REQUIRED_BLOCKED` describen presentacion y descubribilidad, no estados de work item, proceso o autorizacion.

### Router, datos y adapters

La superficie base no importa `next/link`, `next/navigation`, `usePathname`, `useSearchParams` ni router imperativo. Cada consumidor puede mantener un adapter local pequeno para resolver `currentNavigationId`, mapear iconos a `ReactNode`, localizar labels, excluir destinos `HIDDEN` y construir el orden ya resuelto.

Ese adapter no puede trasladar permisos, contexto autoritativo, prioridad o una taxonomia divergente dentro de la primitiva. `TaskNavigation` tampoco consulta `app_navigation_items`, Supabase, RPC, red, cookies o storage.

### Estados, accesibilidad y responsive

Los destinos accionables usan enlaces semanticos. Los destinos no accionables permanecen fuera de la activacion y exponen `aria-disabled`. El destino actual expone `aria-current="page"` sin depender solo de color. Los estados visuales utilizan estructura, borde, peso y contenido secundario ademas de color; `statusLabel` o una descripcion equivalente sigue siendo responsabilidad de la proyeccion cuando sea necesario explicar un bloqueo.

La estructura utiliza grupo, listas e items en orden recibido, conserva foco visible, objetivos tactiles de al menos 44 px para destinos accionables, reflow, `min-width: 0`, wrapping y viewport reducido sin scroll horizontal estructural. No depende de hover, animacion o transicion para comunicar significado.

### Consumidores, migracion y rollback

La materializacion global no migra aplicaciones. La reconciliacion documental mantiene siete consumidores evaluados: `SHELL`, `NEXO`, `FOGO`, `ORIGO`, `VISO`, `PULSO` y `NUMERA`. `SHELL` conserva su launcher actual como composicion elegible sin equivalente lateral obligatorio; los otros seis permanecen `CANDIDATO_A_MIGRAR` por conservar familias locales `NavGroup` / `NavItem` dentro de chrome.

Los adapters, paridad de rutas y estados, compatibilidad, observacion y rollback por consumidor permanecen en `SHELL-MIG-*` y `SHELL-CI-*`. El template `app-shell-standard` permanece evidencia historica y no define la API de `TaskNavigation`.

Consumidores migrados por UI011: 0/7. Copias legacy retiradas por UI011: 0. Releases publicadas por UI011: 0. Cambios Supabase por UI011: 0.

## ProcessStatusLine

`ProcessStatusLine` presenta una proyeccion visible y ordenada de posiciones principales de proceso que ya fue preparada por la aplicacion propietaria. La primitiva conserva orden, copy humano y estado explicito por paso; no calcula el estado empresarial, no valida transiciones y no escribe proceso.

Contrato interno materializado:

- `ProcessStatusLineProps` exige `ariaLabel` humano y localizable y `steps` ya preparados;
- `ProcessStatusLineStep` conserva `stepId`, `label`, `description` opcional y `state` sin payloads de autorizacion o persistencia;
- `ProcessStatusLineStepState` contiene exactamente `REACHED`, `CURRENT` y `NOT_REACHED`;
- `REACHED` significa solamente que el propietario confirma que esa posicion visible fue alcanzada y no declara completitud empresarial;
- `CURRENT` identifica la posicion principal actual preparada por el propietario y se expone mediante `aria-current="step"`;
- `NOT_REACHED` significa solamente que la posicion visible aun no fue alcanzada y no promete elegibilidad, siguiente destino ni transicion futura;
- cada estado llega explicitamente por paso; la primitiva no infiere estados desde indice, proximidad, ruta, timestamp, color ni posicion de `CURRENT`;
- `steps` conserva estrictamente el orden recibido y la primitiva no realiza sorting autonomo;
- `stepId` identifica la ocurrencia renderizada y no se interpreta como state code, transition ID, permiso o comando;
- la estructura base usa una lista ordenada con items no interactivos, sin botones, enlaces ni tab stops artificiales;
- los conectores son decorativos y no representan una arista autorizada del grafo de proceso;
- `label`, `description` y `ariaLabel` permanecen preparados externamente para lenguaje humano y localizacion;
- sin `use client`, hooks, efectos, timers, red, browser storage, Supabase, sesion, router o lectura de contexto, por lo que la superficie base permanece server-safe.

### Proceso, estado y transiciones

La direccion permitida es `proceso autoritativo -> proyeccion propietaria -> ProcessStatusLine`. La primitiva no recibe `processId`, `instanceId`, `currentStateCode`, `transitionId`, `nextAllowedStates`, permisos, roles, `canOperate`, guards ni callbacks empresariales. Tampoco contiene una tabla de transiciones, calcula la siguiente accion o habilita CTAs.

Una proyeccion valida de una instancia resuelta contiene una unica posicion `CURRENT`, pero esa verdad se prepara fuera del componente. Si la fuente no permite resolver una posicion valida, el consumidor no fabrica una linea ni un estado actual para conservar estetica. Ramificaciones, ciclos, reingresos y estados omitidos siguen siendo responsabilidad de la capa propietaria.

### Condiciones, offline y sincronizacion

Bloqueo, espera, riesgo, SLA, evidencia pendiente, `OFFLINE`, `QUEUED`, `SYNCING`, conflicto y reconciliacion no forman parte de `ProcessStatusLineStepState`. Pueden coexistir en superficies propietarias separadas sin reemplazar la posicion principal del proceso.

Una operacion local pendiente no cambia visualmente `CURRENT` como si el servidor hubiera confirmado una transicion. La linea tampoco sustituye un timeline de auditoria: actor, timestamp, before/after, receipt, evidencia y correlation ID permanecen fuera de su API base.

### TaskNavigation, AppShell y composicion

`TaskNavigation` responde que trabajo puede descubrirse o abrirse; `ProcessStatusLine` comunica la posicion principal de una instancia y sus posiciones visibles relacionadas. Navegacion activa no equivale a `CURRENT`, y una posicion de proceso no cambia por abrir una ruta.

`AppShell` no incorpora la linea como estado global. La composicion ordinaria permanece `AppShell -> children -> superficie propietaria de proceso -> ProcessStatusLine`, de modo que el chrome transversal no conoce proceso, instancia o etapa.

### Accesibilidad, responsive y movimiento

La lista conserva orden de lectura, nombre accesible y `aria-current="step"` para la posicion actual. Los marcadores y conectores decorativos quedan fuera del nombre accesible. `REACHED`, `CURRENT` y `NOT_REACHED` usan diferencias estructurales de borde, relleno y peso ademas de color; la linea no agrega interaccion ni roba foco.

En ancho suficiente la secuencia usa disposicion horizontal. En viewport estrecho refluye verticalmente sin cambiar orden ni semantica y sin requerir scroll horizontal estructural. La implementacion no usa animaciones o transiciones que puedan simular confirmacion de servidor y no depende de movimiento para comunicar estado.

### Consumidores, migracion y rollback

La materializacion global no migra aplicaciones. La reconciliacion documental mantiene siete consumidores evaluados: `SHELL`, `NEXO`, `FOGO`, `ORIGO`, `VISO`, `PULSO` y `NUMERA`. `NEXO` permanece `CANDIDATO_A_MIGRAR`; FOGO, ORIGO, VISO, PULSO y NUMERA permanecen `CANDIDATO_A_ADOPTAR`; SHELL conserva composicion elegible sin equivalente runtime global confirmado.

Los adapters futuros deben construir `ProcessStatusLineStep[]` desde fuentes propietarias sin trasladar reglas empresariales al package ni inferir transiciones por indice. Paridad, adopcion, compatibilidad, observacion y rollback por consumidor permanecen en `SHELL-MIG-*`, `SHELL-CI-*` y los propietarios correspondientes.

Consumidores migrados por UI012: 0/7. Copias legacy retiradas por UI012: 0. Releases publicadas por UI012: 0. Cambios Supabase por UI012: 0.

## PrimaryActionPanel

`PrimaryActionPanel` presenta una unica accion principal ya resuelta por la superficie propietaria. Conserva identidad, copy, jerarquia y estado presentacional; no selecciona candidatos, no concede autoridad, no decide transiciones y no declara resultados empresariales.

Contrato interno materializado:

- `ariaLabel` nombra la region de accion de forma humana y localizable;
- `actionId` conserva la identidad estable suministrada por el propietario y se expone solo como dato estructural, no como copy ordinario;
- `label` mantiene visible el nombre humano de la accion;
- `description` y `statusLabel` permanecen opcionales y preparados externamente;
- `PrimaryActionPresentationState` contiene exactamente `READY`, `PENDING`, `CONTEXTUAL_DISABLED` y `REQUIRED_BLOCKED`;
- `HIDDEN` no forma parte de la union renderizable y debe filtrarse antes de construir las props;
- `primaryControl` es obligatorio y ocupa el primer slot de control;
- `secondaryControl` es opcional, unico como slot adyacente y perceptivamente subordinado;
- la raiz `section` usa `aria-label`, `data-action-id` y `data-state`; `PENDING` expone `aria-busy` sin declarar exito ni fracaso;
- sin `use client`, hooks, timers, red, router, storage, Supabase, sesion, permisos, roles, contexto autoritativo, callbacks empresariales ni motor de transiciones;
- compatible con SSR y con controles cliente compuestos por la superficie propietaria.

### Estados y ejecucion

`READY` indica solamente que la proyeccion propietaria presenta la accion como disponible para interaccion; no concede permiso irrevocable ni garantiza resultado. `PENDING` expresa una ejecucion equivalente ya iniciada cuyo resultado autoritativo sigue pendiente. `CONTEXTUAL_DISABLED` conserva visible una accion relevante mientras una precondicion externa impide actuar. `REQUIRED_BLOCKED` conserva visible una obligacion material bloqueada y permite que el propietario aporte explicacion o recuperacion.

La primitiva no recibe `actions[]`, no ordena candidatos, no promueve una secundaria por viewport, dispositivo, rol o estado disabled y no vuelve automaticamente a `READY` ante un resultado incierto.

### Button, sensibilidad y confirmacion

`primaryControl` puede componer el `Button` compartido. El panel no redefine variantes, tamanos, `disabled`, `loading`, `aria-busy`, tipo nativo ni foco del `Button`. Cuando la accion esta pendiente, la superficie propietaria mantiene coherentes `PrimaryActionPanel.state` y el `loading` del control.

La variante `danger` conserva significado visual y no clasifica sensibilidad. Confirmacion, reautenticacion, doble control, reason code, evidencia y politicas de acciones sensibles permanecen reservadas a `SHELL-UI-014`.

### Composicion, accesibilidad y consumidores

`ProcessStatusLine` comunica posicion de proceso, `TaskNavigation` comunica destinos de trabajo y `PrimaryActionPanel` comunica la accion dominante dentro de una superficie ya abierta. AppShell permanece como marco y no absorbe la accion principal de cada pagina.

La region conserva `ariaLabel`, label visible, estado ocupado cuando corresponde, copy de bloqueo preparado por el propietario y orden semantico primary-then-secondary. No fuerza foco, no crea live region universal y refluye a una columna en viewport estrecho sin scroll horizontal estructural ni movimiento obligatorio.

La materializacion global no migra aplicaciones. Consumidores conceptualmente elegibles: `SHELL`, `NEXO`, `FOGO`, `ORIGO`, `VISO`, `PULSO` y `NUMERA`. Paridad, adopcion, compatibilidad, observacion y rollback permanecen en `SHELL-MIG-*`, `SHELL-CI-*` y propietarios correspondientes.

Consumidores migrados por UI013: 0/7. Copias legacy retiradas por UI013: 0. Releases publicadas por UI013: 0. Cambios Supabase por UI013: 0.

## SensitiveActionConfirmation

`SensitiveActionConfirmation` presenta una confirmacion explicita para una unica accion sensible cuya identidad, politica y necesidad de confirmacion ya fueron resueltas por la superficie propietaria. Conserva `actionId`, copy humano, consecuencia material, estado presentacional y controles compuestos; no clasifica sensibilidad, no concede autoridad, no reautentica, no ejecuta mutaciones y no declara resultados empresariales.

Contrato interno materializado:

- `open` controla exclusivamente si la proyeccion debe renderizarse; abrir la superficie no confirma la accion;
- `ariaLabel` nombra la superficie de forma humana y localizable;
- `actionId` conserva la identidad estable de la accion original y no se deriva de copy, titulo ni contenedor;
- `title`, `description` y `consequence` son obligatorios y permanecen visibles;
- `resourceLabel`, `contextSummary` y `statusLabel` son opcionales y llegan preparados por el propietario;
- `SensitiveActionConfirmationState` contiene exactamente `READY`, `PENDING`, `BLOCKED` y `RESULT_UNKNOWN`;
- `reasonControl` es opcional y no traslada catalogos, validacion, persistencia o auditoria de razones al package;
- `confirmControl` y `cancelControl` son obligatorios y cada uno ocupa exactamente un slot compuesto externamente;
- la raiz `section` usa `aria-label`, `data-action-id` y `data-state`; `PENDING` expone `aria-busy` sin declarar exito ni fracaso;
- sin `use client`, hooks, timers, red, router, storage, Supabase, sesion, credenciales, permisos, roles, reautenticacion, callbacks empresariales ni motor de transiciones;
- compatible con SSR y con controles cliente compuestos por la superficie propietaria.

### Politica, autoridad y resultado

La necesidad de presentar la superficie permanece fuera del componente. `EXPLICIT_CONFIRMATION` y `REASON_AND_CONFIRMATION` pueden producir una proyeccion compatible; `SERVER_REVALIDATION` permanece en la frontera autoritativa y `EXTERNAL_RESULT_CONFIRMATION` permanece separada de la intencion local. La variante visual `danger` no clasifica sensibilidad, no concede permiso y no sustituye reautenticacion.

`READY` significa que la proyeccion propietaria permite revisar y emitir la intencion; no garantiza permiso irrevocable ni resultado. `PENDING` significa que una operacion equivalente ya fue enviada o esta en curso y no existe resultado final. `BLOCKED` conserva visible una confirmacion relevante mientras una precondicion externa impide confirmar. `RESULT_UNKNOWN` conserva la incertidumbre y no vuelve automaticamente a `READY`; la reconciliacion y el retry equivalente pertenecen al propietario.

La confirmacion solo ocurre mediante el `confirmControl` compuesto. Abrir, cerrar, usar backdrop, `Escape`, navegar, cambiar foco, hacer scroll o agotar un timeout no confirma. `cancelControl` abandona la intencion visual previa al envio cuando el propietario determina que es seguro; no cancela automaticamente una operacion remota ya enviada.

### Button, contenedor y foco

`confirmControl` y `cancelControl` pueden componer el `Button` compartido. La superficie no redefine variantes, tamanos, `disabled`, `loading`, tipo nativo, foco ni semantica de activacion de `Button`.

La primitiva compartida no impone `dialog`, portal, backdrop, focus trap, cierre por `Escape` ni retorno de foco. Esas responsabilidades pertenecen al contenedor accesible elegido por la composicion propietaria cuando la modalidad lo requiera. De este modo la misma semantica puede vivir en dialogo, sheet u otra geometria sin convertir el package en propietario del lifecycle de apertura o de la ejecucion.

### Consumidores, legacy y rollback

SHELL queda `CANDIDATO_A_ADOPTAR_CON_RECONCILIACION_DE_MODAL_LOCAL`; su `src/components/ui/Modal.tsx` permanece legacy y no se promueve ni modifica por UI014. NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA quedan `CANDIDATO_A_ADOPTAR_DONDE_EL_CONTRATO_EXIJA_CONFIRMACION`.

Consumidores esperados: 7. Consumidores materializados en la matriz: 7. Faltantes: 0. Duplicados: 0. adoptados fisicamente: 0. Consumidores migrados por UI014: 0/7. Copias legacy retiradas por UI014: 0. Releases publicadas por UI014: 0. Cambios Supabase por UI014: 0.

Paridad, adopcion, compatibilidad, observacion y rollback permanecen en `SHELL-MIG-*`, `SHELL-CI-*` y propietarios correspondientes.

## ContextDiagnostic

`ContextDiagnostic` presenta una explicacion humana de una condicion contextual ya resuelta y minimizada por la capa propietaria. Conserva titulo, resumen, condiciones, contexto confirmado relevante, nombres humanos de acciones afectadas y el siguiente paso seguro; no resuelve contexto, permisos, recuperacion ni efectos empresariales.

Contrato interno materializado:

- `ContextDiagnosticState` deriva de `ContextIndicatorState` excluyendo `active` y admite exactamente `resolving`, `changing`, `stale`, `invalid` y `unavailable`;
- `title` y `summary` permanecen obligatorios y preparados externamente;
- `conditions` conserva estrictamente el orden recibido y cada entrada usa `label` y `message` humanos;
- `preservedContext` reutiliza `ContextIndicatorItem` y no fabrica fallbacks para dimensiones ausentes;
- `blockedActions` contiene solamente nombres humanos ya determinados por el adapter propietario; una lista vacia no concede autorizacion;
- `resolution.instruction` es obligatorio, mientras `ownerLabel`, `reviewCondition` y `supportReference` son opcionales y solo se muestran cuando llegan preparados;
- la referencia de soporte debe ser opaca, correlacionable, no secreta e incapaz de conceder autoridad;
- la raiz es una `section` informativa, sin interaccion, foco, `role="alert"` o `aria-live` universales;
- sin `use client`, hooks, timers, red, router, storage, Supabase, `EffectiveContext`, permisos, reason codes, callbacks empresariales ni recuperacion;
- compatible con SSR y con controles o patrones especializados compuestos fuera de la superficie.

### Contexto, autoridad y privacidad

La direccion permitida es `resolvers y autorizacion propietarios -> adapter seguro y minimizado -> ContextDiagnostic`. El componente no recibe `EffectiveContext`, `can_operate`, `blocked_reasons`, `metadata`, permission keys ni identificadores internos como fuente visual. No deriva sede activa desde sede primaria, filtros, URL o ultimo valor; tampoco mezcla actor con dispositivo, turno con check-in, rol base con rol operativo o contexto administrativo con contexto territorial.

`resolving` no afirma ausencia real; `changing` no presenta el destino solicitado como confirmado; `stale` no prolonga autoridad; `invalid` conserva solamente la dimension segura ya clasificada; `unavailable` no se convierte en `EmptyState`. Una denegacion con contexto valido permanece en autorizacion y un fallo tecnico recuperable permanece en `SHELL-UI-016`.

La minimizacion ocurre antes del render. La superficie no serializa metadata, no imprime reason codes o `blocked_reasons`, no muestra traces, SQL, RLS, tokens, secretos ni datos del actor anterior y no usa ocultamiento CSS como control de privacidad.

### Composicion, consumidores y rollback

`ContextIndicator` conserva el resumen persistente de contexto; `Alert` conserva mensajes genericos; `EmptyState` conserva ausencia real; `SiteSelector` y `AreaSelector` conservan seleccion; `PrimaryActionPanel` conserva jerarquia de accion; `SensitiveActionConfirmation` conserva confirmacion sensible; `SHELL-UI-016` conserva recuperacion tecnica. `ContextDiagnostic` no absorbe esas responsabilidades.

SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA permanecen evaluados 7/7 y sin adopcion fisica. Los adapters futuros deben preparar copy humano y datos minimizados dentro de cada propietario. Se exige paridad por consumidor, compatibilidad, observacion y rollback antes de retirar legacy.

Consumidores migrados por UI015: 0/7. Copias legacy retiradas por UI015: 0. Releases publicadas por UI015: 0. Cambios Supabase por UI015: 0.

## RecoverableErrorState

`RecoverableErrorState` presenta una condicion recuperable ya clasificada por su propietario y una politica de recuperacion preparada externamente. No clasifica errores tecnicos, no decide retries, no resuelve autoridad y no ejecuta efectos empresariales.

Contrato interno materializado:

- categorias `CONFLICT`, `TECHNICAL_FAILURE` y `VALIDATION_REQUIRED`;
- estados preservados `NONE`, `LOCAL`, `SERVER`, `PARTIAL` y `UNKNOWN`;
- titulo, resumen, etiqueta de estado preservado, detalles y siguiente paso preparados por el consumidor;
- control primario de recuperacion opcional y controles secundarios opcionales aportados como composicion;
- propietario y referencia de soporte opcionales;
- `UNKNOWN` no autoriza retry ciego;
- sin entrada generica `Error`;
- sin `canRetry` publico;
- sin Supabase, red, timers, idempotencia, politica de retry, autorizacion o efectos empresariales;
- compatible con SSR y composicion desde componentes cliente.

`ContextDiagnostic` conserva diagnostico contextual; `Alert` conserva mensajes genericos; `EmptyState` conserva ausencia real; `SensitiveActionConfirmation` conserva confirmacion sensible. `RecoverableErrorState` no absorbe esas responsabilidades.

SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA permanecen evaluados 7/7 y sin adopcion fisica.

Consumidores migrados por UI016: 0/7. Copias legacy retiradas por UI016: 0. Releases publicadas por UI016: 0. Cambios Supabase por UI016: 0.

## TabletTaskSurface

`TabletTaskSurface` organiza una composicion semantica de trabajo ya resuelta para una superficie tablet autorizada. Materializa `TABLET-TASK-SURFACE-CONTRACT-001` dentro de la raiz privada de autoria de `@vento/ui-web`; no detecta dispositivos, no decide elegibilidad empresarial y no convierte presentacion en autoridad.

Contrato interno materializado:

- `TabletSurfaceClass` contiene exactamente `PERSONAL_TABLET` y `SHARED_TABLET`;
- `surfaceClass`, `ariaLabel`, `persistentContext`, `workIdentity` y `stepContent` son obligatorios;
- `blockingState`, `primaryAction`, `secondarySupport` y `resultAndReceipt` son slots opcionales;
- los siete slots semanticos se preservan en el orden `PERSISTENT_CONTEXT`, `BLOCKING_STATE`, `WORK_IDENTITY`, `STEP_CONTENT`, `PRIMARY_ACTION`, `SECONDARY_SUPPORT`, `RESULT_AND_RECEIPT`;
- puede existir como maximo una instancia de `PRIMARY_ACTION` y el slot puede faltar cuando no existe una accion segura;
- la raiz es una `section` nombrada mediante `ariaLabel`, conserva atributos HTML compatibles y no impone `role="application"` ni una live region universal;
- los hijos interactivos permanecen compuestos externamente y conservan sus contratos propietarios;
- sin `deviceId`, `actorId`, `permissionCode`, `roleCode`, `siteId`, `areaId`, `shiftId`, `checkinId`, `canOperate`, `canExecute`, `isAuthorized`, `isOffline`, `orientation`, `breakpoint`, `viewportWidth` ni `userAgent` como API propia;
- sin `window`, `document`, storage, listeners globales, timers, red, router, Supabase o APIs de hardware, por lo que la superficie base permanece server-safe.

### Reflow, ergonomia tactil y modalidades

La semantica no cambia entre retrato y paisaje. En ancho reducido la superficie mantiene una columna principal; en espacio horizontal suficiente puede separar contenido del paso y rail de acciones sin duplicar slots ni crear dos superficies operativas competidoras. El componente no recibe orientacion o breakpoint como contrato de elegibilidad y no exige scroll horizontal ordinario para su estructura minima.

Los controles interactivos compuestos dentro de la superficie reciben un objetivo tactil base de al menos 48 x 48 unidades logicas mediante una minima de 48 CSS px, superando el piso web de 24 x 24 CSS px. El rail de acciones mantiene separacion estructural y los hit areas propios de la superficie no se superponen. La composicion propietaria sigue siendo responsable de no introducir controles hijos incompatibles o solapados.

El foco visible no se elimina y los controles enfocados conservan margen de desplazamiento para permanecer alcanzables ante teclado virtual. UI017 no abre ni cierra el teclado del sistema y cerrar el teclado no confirma ninguna operacion.

Ninguna funcion esencial del patron depende de hover, swipe oculto, drag preciso, long press, doble toque o gesto de borde. Teclado, mouse, stylus, switch access y tecnologias de asistencia permanecen compatibles cuando el navegador y los controles compuestos los soportan.

### Actor, privacidad, conectividad y resultado

`PERSONAL_TABLET` y `SHARED_TABLET` son clases presentacionales ya resueltas externamente y no conceden autoridad permanente. `persistentContext` es obligatorio en ambas; en una tablet compartida la composicion propietaria mantiene perceptible el actor humano y el contexto material sin convertir el dispositivo tecnico en actor.

El componente no transfiere borradores, claims, permisos, sesion o datos personales entre actores. La minimizacion ocurre antes del render y los slots no requieren IDs tecnicos, secretos, tokens, permisos internos completos ni datos de un actor anterior.

Conectividad, frescura, politica offline y estado autoritativo llegan ya proyectados por sus propietarios cuando sean materiales. Guardado local no equivale a confirmacion de servidor, stale read-only no habilita mutaciones y `resultAndReceipt` recibe solamente un resultado o estado ya resuelto; UI017 no fabrica receipts ni decide retries.

### Composicion y fronteras

`ContextIndicator`, `ContextDiagnostic`, `RecoverableErrorState`, `EmptyState`, `Alert`, `TaskNavigation`, `ProcessStatusLine`, `PrimaryActionPanel`, `SensitiveActionConfirmation` y `SimulatedRoleNotice` pueden ser compuestos por sus propietarios sin que `TabletTaskSurface` absorba sus contratos. `AppShell` conserva chrome y navegacion global.

`SHELL-UI-018` conserva la especializacion `FIXED_KIOSK` y queda fuera de UI017. `SHELL-UI-019` conserva checkpoint, reconstruccion y reanudacion de procesos interrumpidos. `SHELL-UI-020` conserva handoff cross-app y autoridad de traspaso entre aplicaciones.

### Consumidores, migracion y prueba fisica posterior

La disposicion vigente de consumidores permanece:

- SHELL: `ELEGIBILIDAD_TABLET_CONDICIONADA_A_SUPERFICIE_Y_PERFIL`;
- NEXO: `CANDIDATO_OPERATIVO_TABLET`;
- FOGO: `CANDIDATO_OPERATIVO_TABLET`;
- ORIGO: `CANDIDATO_OPERATIVO_TABLET`;
- VISO: `CANDIDATO_TABLET_ACOTADO_SIN_CONVERTIR_BACKOFFICE_DENSO`;
- PULSO: `CANDIDATO_OPERATIVO_TABLET`;
- NUMERA: `CANDIDATO_TABLET_ACOTADO_SIN_CONVERTIR_BACKOFFICE_DENSO`.

SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA permanecen evaluados 7/7. Faltantes: 0. Duplicados: 0. La materializacion global no adopta ninguna aplicacion.

La migracion posterior permanece reversible por consumidor y exige paridad, compatibilidad, observacion y rollback antes de retirar legacy. La adopcion debe probarse en un dispositivo representativo del perfil real antes de despliegue amplio; la emulacion de escritorio no sustituye esa evidencia fisica.

Consumidores migrados por UI017: 0/7. Copias legacy retiradas por UI017: 0. Releases publicadas por UI017: 0. Cambios Supabase por UI017: 0.

## KioskTaskSurface

`KioskTaskSurface` organiza una composicion semantica de trabajo ya resuelta para una estacion fija gobernada externamente. Materializa `KIOSK-TASK-SURFACE-CONTRACT-001` dentro de la raiz privada de autoria de `@vento/ui-web`; no detecta kioscos, no administra el sistema operativo y no convierte presentacion o configuracion de estacion en autoridad empresarial.

Contrato interno materializado:

- `KioskTaskSurfaceProps.surfaceClass` acepta exclusivamente el literal `FIXED_KIOSK`;
- `surfaceClass`, `ariaLabel`, `persistentContext`, `workIdentity` y `stepContent` son obligatorios;
- `blockingState`, `primaryAction`, `secondarySupport` y `resultAndReceipt` son slots opcionales;
- los siete slots semanticos se preservan en el orden `PERSISTENT_CONTEXT`, `BLOCKING_STATE`, `WORK_IDENTITY`, `STEP_CONTENT`, `PRIMARY_ACTION`, `SECONDARY_SUPPORT`, `RESULT_AND_RECEIPT`;
- puede existir como maximo una instancia de `PRIMARY_ACTION` y el slot puede faltar cuando no existe una salida segura;
- la raiz es una `section` nombrada mediante `ariaLabel`, conserva atributos HTML compatibles y no impone `role="application"`, live region universal, focus trap ni bloqueo global de teclado;
- los hijos interactivos permanecen compuestos externamente y conservan sus contratos propietarios;
- no existe un enum paralelo de clases de dispositivo dentro de UI018;
- `PERSONAL_TABLET` y `SHARED_TABLET` permanecen fuera de UI018 y bajo `SHELL-UI-017`;
- sin `deviceId`, `stationId`, `actorId`, `permissionCode`, `roleCode`, `siteId`, `areaId`, `shiftId`, `checkinId`, `canOperate`, `canExecute`, `isAuthorized`, `isKioskMode`, `isManaged`, `isLockedDown`, `allowedApps`, `allowedDomains`, `clipboardEnabled`, `downloadEnabled`, `maintenancePin`, `adminToken` ni `userAgent` como API propia;
- sin `window`, `document`, storage, listeners globales, timers, red, router, Fullscreen API, Supabase, APIs MDM o drivers de hardware, por lo que la superficie base permanece server-safe.

### Dispositivo, host y mantenimiento

La composicion conserva tres capas separadas: dispositivo y sistema operativo; host o aplicacion; y `KioskTaskSurface`. Fullscreen no es una frontera de seguridad y PWA standalone no es modo kiosco seguro. `userAgent`, viewport, touch, CSS, URL, nombre del dispositivo u orientacion tampoco prueban elegibilidad `FIXED_KIOSK`.

Las aplicaciones permitidas se limitan externamente y una aplicacion permitida no equivale a permiso empresarial. La navegacion del sistema, allowlist de enlaces externos, persistencia local de archivos, exportacion y portapapeles pertenecen al host y a sus contratos propietarios. Una navegacion externa no declara trabajo completado, y exportar permanece separado de visualizar o persistir localmente.

La arquitectura host conserva una via autorizada de mantenimiento, pero esa via permanece fuera de `PRIMARY_ACTION` y fuera de `SECONDARY_SUPPORT` ordinario. No depende de una URL libre, un secreto embebido, `maintenancePin` o `adminToken`. El tecnico permanece separado del actor empresarial y el retorno desde mantenimiento reconstruye la autoridad operativa en vez de heredar autoridad administrativa.

### Actor, estacion, privacidad y densidad

`FIXED_KIOSK` identifica una clase de superficie ya resuelta y no un actor humano. La estacion puede restringir sede, area, aplicaciones o perifericos, pero una sede fijada al dispositivo no se convierte en sede activa, un area permitida no se convierte en contexto operativo, una aplicacion permitida no concede permiso y un periferico presente no autoriza una accion.

Cuando una mutacion exige actor humano, la composicion propietaria exige actor valido, sesion vigente y revalidacion de servidor. Una sesion estandar no sustituye strong reauth; un PIN ligero no satisface reautenticacion fuerte por conveniencia y `NOT_ALLOWED` no se degrada a lectura parcial.

El cambio de actor no hereda autoridad, borrador personal, strong reauth, filtros, busquedas ni datos sensibles. La presentacion permite limpiar datos del actor anterior sin borrar hechos empresariales autoritativos. Credenciales, tokens y secretos no pertenecen a `KioskTaskSurface`. La privacidad frente a terceros se resuelve mediante minimizacion previa al render.

La densidad ordinaria permanece `D0_FOCUSED` o `D1_CONTEXTUAL`; `D2_COMPARATIVE` es excepcional y limitado; `D3_ANALYTICAL` y `D4_SPECIALIZED` permanecen fuera del flujo ordinario de kiosco. La captura favorece valores estructurados y no convierte texto libre innecesario en sustituto de actor, reason code, cantidad o unidad.

### Ergonomia, accesibilidad y perifericos

Los controles interactivos compuestos dentro de la superficie reciben un objetivo tactil base de al menos 48 x 48 unidades logicas mediante una minima de 48 CSS px, superando el piso web de 24 x 24 CSS px. El rail de acciones mantiene separacion estructural; hit areas no se superponen y acciones incompatibles conservan distancia suficiente.

La presentacion mantiene objetivos estables bajo el dedo y no usa animacion o movimiento para sustituir confirmacion autoritativa. Ninguna funcion esencial depende de hover, swipe oculto, drag preciso, long press, doble toque o gesto de borde. Teclado, lector de pantalla, switch access, mouse y stylus permanecen compatibles cuando la estacion los soporta; la contencion del sistema nunca se simula rompiendo accesibilidad.

Montaje, altura, inclinacion, postura y orientacion fijada se validan por la estacion propietaria. La orientacion no se infiere desde CSS ni concede semantica. La estructura permite zoom, texto aumentado y reflow sin exigir scroll horizontal ordinario para el contenido minimo.

Los perifericos permanecen externos. Capacidad, comando, recepcion, ejecucion fisica y resultado verificado son estados distintos; un timeout de periferico no autoriza retry ciego. El host mantiene estado y alternativa cuando un periferico sea material para la tarea.

### Conectividad, bloqueo y composicion

Conectividad, frescura y ultimo punto confirmado llegan ya resueltos por sus propietarios y permanecen perceptibles cuando son materiales. En dispositivo compartido no se ejecutan mutaciones empresariales sin conectividad verificable; cache no es autorizacion, stale no se presenta como actual y reconectar exige revalidacion propietaria. Un borrador local no se presenta como confirmacion de servidor.

Cuando el propietario determina que el dispositivo esta revocado, inactivo o incompatible, las mutaciones ordinarias permanecen bloqueadas y la superficie solo compone una salida humana segura. `ContextDiagnostic`, `RecoverableErrorState`, `EmptyState`, `Alert`, `PrimaryActionPanel`, `SensitiveActionConfirmation` y `SimulatedRoleNotice` conservan sus contratos propietarios y se componen externamente sin imports obligatorios desde `KioskTaskSurface`.

La inactividad detiene nuevas mutaciones conforme al propietario sin borrar silenciosamente trabajo. `SHELL-UI-019` conserva checkpoint, reconstruccion y reanudacion de procesos interrumpidos. `SHELL-UI-020` conserva handoff cross-app y autoridad de traspaso entre aplicaciones.

### Consumidores, migracion y prueba fisica posterior

La disposicion vigente de consumidores permanece:

- SHELL: `ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_SUPERFICIE_Y_HOST_GOBERNADOS`;
- NEXO: `CANDIDATO_KIOSCO_BODEGA`;
- FOGO: `ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_PROCESO_ESTACION_Y_SEGURIDAD`;
- ORIGO: `ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_PROCESO_ESTACION_Y_SEGURIDAD`;
- VISO: `ELEGIBILIDAD_KIOSCO_SOLO_PARA_SUPERFICIE_D0_D1_APROBADA`;
- PULSO: `ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_PRIVACIDAD_PERIFERICOS_Y_PROCESO`;
- NUMERA: `ELEGIBILIDAD_KIOSCO_SOLO_PARA_SUPERFICIE_D0_D1_APROBADA`.

SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA permanecen evaluados 7/7. Faltantes: 0. Duplicados: 0. La materializacion global no adopta ninguna aplicacion ni configura modo kiosco, MDM o hardware.

La migracion posterior permanece reversible por consumidor y exige paridad, compatibilidad, observacion y rollback antes de retirar legacy. La adopcion debe probarse en una estacion representativa del kiosco real antes de despliegue amplio; fullscreen de escritorio no sustituye esa evidencia fisica.

Consumidores migrados por UI018: 0/7. Copias legacy retiradas por UI018: 0. Releases publicadas por UI018: 0. Cambios Supabase por UI018: 0.

## InterruptedProcessState

`InterruptedProcessState` presenta un proceso interrumpido despues de que su propietario reconstruyo el estado autoritativo y clasifico externamente la posibilidad de reanudacion. Materializa `INTERRUPTED-PROCESS-PRESENTATION-CONTRACT-001` dentro de la raiz privada de autoria de `@vento/ui-web`; no persiste checkpoints, no reconstruye autoridad, no decide retries y no ejecuta efectos empresariales.

Contrato interno materializado:

- `InterruptedProcessStatus` contiene exactamente `NO_CHECKPOINT`, `DRAFT_ONLY`, `CHECKPOINT_AVAILABLE`, `VALIDATING`, `RESUMABLE`, `RESUMABLE_WITH_REVIEW`, `WAITING_FOR_DEPENDENCY`, `HANDOFF_REQUIRED`, `REASSIGNMENT_REQUIRED`, `CONFLICT`, `RESULT_UNKNOWN`, `REAUTH_REQUIRED`, `RECONCILIATION_REQUIRED`, `SUPERSEDED`, `COMPLETED`, `EXPIRED` e `INVALID`;
- no existen aliases `READY_TO_RESUME`, `PAUSED`, `RESTORABLE`, `STALE_DRAFT`, `AUTO_RESUME` ni `RETRYABLE_INTERRUPTION`;
- `InterruptedProcessSummary` conserva solamente las proyecciones presentacionales `lastProgress`, `preservedWork`, `changesSinceInterruption`, `pendingOrUnknownResults`, `claimAndCustodySummary` y `expiryOrDependencySummary`;
- `status`, `ariaLabel`, `persistentContext`, `workIdentity` e `interruptionSummary` son obligatorios;
- `blockingState`, `primaryAction`, `secondarySupport` y `resultAndReceipt` son slots opcionales;
- los siete slots conservan el orden `PERSISTENT_CONTEXT`, `BLOCKING_STATE`, `WORK_IDENTITY`, `STEP_CONTENT`, `PRIMARY_ACTION`, `SECONDARY_SUPPORT`, `RESULT_AND_RECEIPT`;
- puede existir como maximo una instancia de `PRIMARY_ACTION` y su ausencia es valida;
- la raiz es una `section` nombrada mediante `ariaLabel`; no impone `role="application"`, `role="alert"` ni `aria-live` universal;
- sin `use client`, hooks, timers, red, router, storage, Supabase, queues, Service Worker, APIs de hardware o listeners globales, por lo que la superficie base permanece server-safe.

### Checkpoint, continuidad y autoridad

La direccion permitida es `checkpoint y estado propietarios -> reconstruccion y revalidacion -> proyeccion humana segura -> InterruptedProcessState`. `ProcessCheckpoint` crudo no entra como prop publica y el componente no recibe `checkpointId`, `processInstanceId`, `actorId`, `principalId`, `deviceId`, `contextId`, `siteId`, `areaId`, `shiftId`, `checkinId`, `claimId`, `custodyRef`, `draftRef`, `pendingOperationIds`, `permissionCode`, `roleCode`, `idempotencyKey`, `receiptId`, `resourceVersion`, `canResume`, `isAuthorized`, `resumeUrl` ni `returnTo`.

URL, historial del navegador y estado React no constituyen checkpoint ni autoridad. `localStorage`, `sessionStorage`, una pestana abierta, un modal o un snapshot visual tampoco sustituyen reconstruccion autoritativa. La separacion permanece `BORRADOR != CHECKPOINT != OPERACION PENDIENTE != RECEIPT != ESTADO EMPRESARIAL`.

`CHECKPOINT_AVAILABLE` informa un punto todavia no validado y no habilita continuacion empresarial. `VALIDATING` mantiene la continuacion empresarial ausente mientras el propietario comprueba vigencia. `RESUMABLE` solo llega despues de elegibilidad externa completa. `RESUMABLE_WITH_REVIEW` conserva cambios visibles antes de continuar y no aplica `last write wins`. `RESULT_UNKNOWN` bloquea retry ciego y no fabrica una nueva idempotency key. `COMPLETED`, `EXPIRED`, `SUPERSEDED` e `INVALID` no convierten el punto anterior en reanudable por fallback visual.

### Actor, contexto, claims, custodia y resultados

Cambiar actor no transfiere borrador, claim, custodia ni autoridad. Cambiar sede, area, turno, check-in, rol operativo, delegacion, simulacion o dispositivo exige una resolucion externa nueva. Un cambio de dispositivo no promete disponibilidad de datos local-only y un reinicio, background, recarga o actualizacion no ejecuta operaciones pendientes automaticamente ni restaura autoridad stale.

Claims y leases llegan como conclusion humana ya resuelta; UI019 no renueva, libera, toma ni fuerza ownership. La custodia no se infiere de una pantalla abierta, un borrador o un comando enviado. `REASSIGNMENT_REQUIRED`, `HANDOFF_REQUIRED`, `CONFLICT`, `REAUTH_REQUIRED` y `RECONCILIATION_REQUIRED` conservan sus efectos en propietarios externos. Un handoff requerido no equivale a handoff aceptado.

Acciones sensibles vuelven a validar estado actual y reautorizacion cuando corresponda; `SensitiveActionConfirmation` conserva confirmacion proporcional. Un archivo local no equivale a evidencia vinculada y un comando de periferico no equivale a ejecucion fisica confirmada. Los lotes reconstruidos no vuelven a promover elementos ya confirmados como pendientes.

### Composicion, privacidad y accesibilidad

`TaskNavigation` conserva navegacion de trabajo y `ProcessStatusLine` conserva avance de proceso. `ContextDiagnostic` conserva diagnostico contextual y `RecoverableErrorState` recuperacion de fallos observados. `PrimaryActionPanel` conserva jerarquia de accion y `SensitiveActionConfirmation` confirmacion sensible. `TabletTaskSurface` y `KioskTaskSurface` conservan sus clases fisicas exteriores. `SHELL-UI-020` conserva handoff cross-app, deep links y autoridad de traspaso; UI019 no crea deep links ni transporta autoridad entre aplicaciones.

En dispositivo compartido la lista recuperable se filtra por actor antes de construir la superficie. No se expone automaticamente checkpoint, borrador, claim, filtros, busquedas o datos privados del actor anterior. Retencion, expiracion, revocacion, supersesion y borrado seguro permanecen politicas externas; UI019 no usa timers autoritativos. Cerrar la superficie no descarta trabajo y guardar para despues no congela autoridad.

El copy ordinario usa lenguaje humano de trabajo y no codigos de infraestructura. El foco visible no se elimina, la superficie no fuerza foco en cada actualizacion y no crea traps de teclado. Los controles compuestos conservan objetivos tactiles de al menos 48 x 48 CSS px, reflow, zoom, lector de pantalla y navegacion por teclado sin requerir hover, movimiento o scroll horizontal estructural.

### Consumidores, migracion y prueba fisica posterior

La disposicion vigente de consumidores permanece:

- SHELL: `ELEGIBILIDAD_CONDICIONADA_A_REANUDACION_RESUELTA`;
- NEXO: `CANDIDATO_OPERATIVO_PARA_REANUDACION`;
- FOGO: `CANDIDATO_OPERATIVO_PARA_REANUDACION`;
- ORIGO: `CANDIDATO_OPERATIVO_PARA_REANUDACION`;
- VISO: `CANDIDATO_ADMINISTRATIVO_PARA_REANUDACION_CONTROLADA`;
- PULSO: `CANDIDATO_OPERATIVO_PARA_REANUDACION`;
- NUMERA: `CANDIDATO_ADMINISTRATIVO_PARA_REANUDACION_CONTROLADA`.

SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA permanecen evaluados 7/7. Faltantes: 0. Duplicados: 0. La materializacion global no adopta ninguna aplicacion, no crea checkpoints persistidos y no modifica Supabase.

La migracion posterior permanece reversible por consumidor y exige paridad, compatibilidad, observacion y rollback antes de retirar legacy. La certificacion posterior debe cubrir recarga, background, reinicio, perdida de energia, expiracion, revocacion, cambio de actor, cambio de area, cambio de dispositivo, claim tomado, recurso cambiado, resultado desconocido, esquema anterior, archivo local, periferico incierto, handoff, custodia, lotes parciales, concurrencia entre dispositivos, accesibilidad y privacidad.

Consumidores migrados por UI019: 0/7. Copias legacy retiradas por UI019: 0. Releases publicadas por UI019: 0. Cambios Supabase por UI019: 0.

## CrossAppHandoff

`CrossAppHandoff` presenta un traspaso entre aplicaciones despues de que el productor resolvio externamente la relacion canonica, la misma instancia empresarial, el checkpoint y contexto vigentes, actor, recurso, autoridad, aplicacion propietaria, participante, estado y controles seguros. Materializa `CROSS-APP-HANDOFF-PRESENTATION-CONTRACT-001` dentro de la raiz privada de autoria de `@vento/ui-web`; no es router, command bus, orquestador empresarial ni fuente de verdad de proceso.

Contrato interno materializado:

- `CrossAppHandoffState` contiene exactamente `OFFERED`, `ACCEPTED`, `REJECTED`, `EXPIRED`, `CANCELLED`, `PARTIALLY_ACCEPTED` y `RECONCILIATION_REQUIRED`;
- no existen estados paralelos `OPENED`, `NAVIGATED`, `DELIVERED`, `SUCCESS` ni `DONE` para sustituir lifecycle empresarial;
- `state`, `ariaLabel`, `persistentContext`, `workIdentity` y `stepContent` son obligatorios;
- `blockingState`, `primaryAction`, `secondarySupport` y `resultAndReceipt` son slots opcionales;
- los siete slots conservan el orden `PERSISTENT_CONTEXT`, `BLOCKING_STATE`, `WORK_IDENTITY`, `STEP_CONTENT`, `PRIMARY_ACTION`, `SECONDARY_SUPPORT`, `RESULT_AND_RECEIPT`;
- puede existir como maximo una instancia de `PRIMARY_ACTION` y su ausencia es valida cuando no existe salida segura;
- la raiz es una `section` nombrada mediante `ariaLabel`; no impone `role="application"`, `role="alert"` ni `aria-live` universal;
- sin `use client`, hooks, timers, red, router, storage, Supabase, RPC, Edge Functions, queues, brokers, workers o listeners globales, por lo que la superficie base permanece server-safe.

### Handoff, navegacion y autoridad

La direccion permitida es `relacion y estado propietarios -> transporte de continuidad gobernado -> proyeccion humana segura -> CrossAppHandoff`. La relacion canonica se resuelve antes del render y conserva la misma instancia empresarial. La receptora vuelve a resolver actor, contexto, recurso, estado y permiso antes de cualquier efecto protegido.

El productor entrega origen y destino humanos, la misma instancia empresarial, recurso y trabajo pendiente perceptibles. El actor emisor permanece atribuible cuando aplique y el actor receptor se revalida en destino. Sede y area pueden preservarse como contexto humano sin ampliar autoridad.

La API base no recibe `href`, `returnTo`, `deepLink`, `destinationUrl`, `sourceUrl`, `processId`, `processInstanceId`, `taskId`, `resourceId`, `actorId`, `principalId`, `permissionCode`, `siteId`, `areaId`, `shiftId`, `checkinId`, `claimId`, `custodyRef`, `idempotencyKey`, `accessToken`, `refreshToken`, `handoffSecret`, `isAuthorized`, `canAccept`, `canWrite`, `ownerAppCode` ni `participantAppCode`. `CrossAppHandoff` no genera, firma, analiza ni valida deep links. Un deep link opaco no transporta autoridad, actor autoritativo ni estado objetivo a imponer; el destino permitido se resuelve externamente.

Abrir otra aplicacion no equivale a aceptar el handoff. Navegacion completada no equivale a responsabilidad transferida. Cerrar una ventana, volver atras, recargar o desmontar la superficie no equivale a rechazo, cancelacion, aceptacion, completitud ni liberacion de custodia. Un retorno valido conserva la instancia original y un retorno invalido falla cerrado fuera del componente.

### Propietaria, participante, resultados e idempotencia

La aplicacion propietaria conserva registro principal, reglas, estado, correccion y cierre. La participante solicita, recibe, acepta o ejecuta solamente su responsabilidad permitida. UI020 no habilita escritura directa de una tabla ajena, mutacion ajena sin contrato, transaccion cliente multi-propietaria ni SHELL como writer universal.

`HANDOFF_REQUEST`, `HANDOFF_PROJECTION`, `HANDOFF_FACT` y `BusinessEventId` permanecen identidades distintas. Emitir, entregar tecnicamente, visualizar o abrir destino no equivale a aceptar. `AUTHORIZED != COMMITTED`, `PUBLISHED != DELIVERED`, `DELIVERED != APPLIED` y `ACK TECNICO != EFFECT_CONFIRMED`.

`OFFERED` no transfiere responsabilidad. `ACCEPTED` requiere resultado propietario. `REJECTED` no cancela todo el proceso por inferencia. `EXPIRED` no reutiliza autoridad vencida. `CANCELLED` no se deriva del cierre visual. `PARTIALLY_ACCEPTED` no se presenta como exito global. `RECONCILIATION_REQUIRED` conserva incertidumbre sin correccion cross-app directa. `RESULT_UNKNOWN` se resuelve antes de retry y UI020 no genera idempotency keys, outbox, inbox, locks ni colas. Un replay de resultado previo conserva la identidad del efecto y no habilita un segundo efecto desde la presentacion.

### Actor, contexto, claims, custodia y privacidad

Cambiar actor no transfiere borrador, claim, custodia ni aceptacion. Cambiar dispositivo, sede, area, turno, check-in, rol operativo, delegacion o simulacion exige nueva resolucion externa cuando sea material. Claims y leases se revalidan fuera del componente y un handoff visual no demuestra transferencia de custodia fisica. Custodia digital y custodia fisica permanecen hechos distintos. Una sesion vencida no permite aceptar. Evidencia presente no equivale a resultado empresarial confirmado.

En dispositivo compartido la proyeccion se minimiza antes del render. No se muestran secretos, tokens, credenciales, OTP, PIN, payloads completos innecesarios, permisos internos completos ni datos de otros actores o territorios. La receptora aplica nuevamente sus reglas de acceso y masking.

Offline local no se presenta como recepcion remota; un mensaje en cola no se presenta como aceptacion; una vista cacheada no concede autoridad. La reconexion revalida sesion, contexto, contrato y resultado antes de actuar.

### Composicion, accesibilidad y fronteras

`InterruptedProcessState` conserva reconstruccion y reanudacion; un `HANDOFF_REQUIRED` puede conducir a UI020 solo despues de resolver relacion y estado de transferencia. `RecoverableErrorState` conserva fallo tecnico, `ContextDiagnostic` diagnostico contextual y `SensitiveActionConfirmation` confirmacion sensible. AppShell conserva navegacion transversal ordinaria y el `AppSwitcher` historico permanece launcher, no handoff.

El foco visible no se elimina, la superficie no crea focus trap ni fuerza foco por actualizaciones tecnicas. Los controles compuestos conservan objetivos tactiles de al menos 48 x 48 CSS px, reflow, zoom, teclado y lector de pantalla sin depender de hover, gesto oculto, color o movimiento como unico significado. El productor mantiene origen, destino, trabajo y estado perceptibles mediante contenido humano ya preparado.

### Consumidores, contrato externo y migracion posterior

La disposicion vigente de consumidores web permanece:

- SHELL: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`;
- VISO: `ELEGIBLE_COMO_PROPIETARIA_O_PARTICIPANTE_SIN_CEDER_AUTORIDAD_A_UI`;
- NEXO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`;
- FOGO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`;
- ORIGO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`;
- PULSO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`;
- NUMERA: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`.

SHELL, VISO, NEXO, FOGO, ORIGO, PULSO y NUMERA permanecen evaluados 7/7. Faltantes: 0. Duplicados: 0. ANIMA, AURA y PASS no se agregan artificialmente al conjunto web de `@vento/ui-web`.

El universo contractual de handoff permanece externo: 69 procesos evaluados, 8 con handoff, 49 relaciones, 27 directas, 22 condicionales, VISO como propietaria en el corte, 9 aplicaciones participantes y 0 duplicados. UI020 no copia esas 49 relaciones dentro del package ni convierte la matriz visual en fuente contractual.

La materializacion global no adopta ninguna aplicacion, no crea destinos tecnicos, no modifica `@vento/contracts/handoffs`, no modifica Supabase y no cambia requisitos TREQ. La compatibilidad de origen y destino se prueba antes de adopcion, existe rollback antes de retirar un patron legacy y el retiro exige uso residual cero. Inventario ejecutable, adapters, compatibilidad, rollback y retiro legacy permanecen en `SHELL-MIG-*` y `SHELL-CI-*`. Las migraciones posteriores deben conservar ausencia de escritura cross-app prohibida.

Consumidores migrados por UI020: 0/7. Copias legacy retiradas por UI020: 0. Releases publicadas por UI020: 0. Cambios Supabase por UI020: 0.

## Accesibilidad

`Alert` no impone una region viva universal. El consumidor aporta `role`, `aria-live`, `aria-atomic` u otros atributos ARIA cuando el escenario dinamico lo exige.

`Button` conserva semantica nativa, foco visible, estados `disabled` y `loading` perceptibles, identidad de accion durante carga, reflow de contenido y soporte de nombre accesible aportado por el consumidor para botones de solo icono. La semantica nativa no se reemplaza por `role="button"` sobre elementos no interactivos.

`Card` permanece fuera de la secuencia de tabulacion por defecto, no inventa roles ni foco, permite reflow de contenido de longitud variable y conserva la semantica de los elementos que el consumidor compone dentro de ella.

`EmptyState` conserva `title` visible, mantiene iconografia decorativa fuera del nombre accesible, no impone region viva, no entra por defecto a la secuencia de tabulacion y conserva la semantica nativa de cualquier accion compuesta por el consumidor.

`ContextIndicator` conserva estado textual, relacion semantica entre etiquetas y valores, orden de lectura, reflow y atributos ARIA compatibles sin imponer una live region, tabulacion, foco automatico o interaccion sobre la raiz.

`SiteSelector` conserva semantica nativa de `label`, `select` y `option`, teclado del navegador, foco visible, objetivo tactil, reflow y estado pendiente textual cuando la composicion aporta `pendingLabel`; no depende de hover ni mueve foco por una confirmacion ordinaria.

`AreaSelector` conserva semantica nativa de `label`, `select` y `option`, teclado del navegador, foco visible, objetivo tactil, reflow y estado pendiente textual cuando la composicion aporta `pendingLabel`; no depende de hover, no mueve foco por un receipt ordinario y no confunde area solicitada con area confirmada.

`SimulatedRoleNotice` conserva los cuatro significados como texto visible, no depende solo de color o iconografia, no entra por defecto a la secuencia de tabulacion, no impone una region viva y permite reflow, zoom, viewport estrecho y contenido largo sin autocierre ni movimiento de foco.

`AppShell` conserva un unico `main`, skip link con copy externo, navegacion con nombre accesible, control nativo con `aria-expanded`, disclosure movil fuera del tab order cuando esta cerrado, foco visible, retorno de foco al cerrar por `Escape`, reflow y chrome operable por teclado sin convertir presentacion en autoridad.

`TaskNavigation` conserva grupos e items en orden recibido, nombres humanos, destino actual mediante `aria-current`, estados no accionables mediante semantica perceptible, iconografia decorativa fuera del nombre accesible, foco visible, objetivos tactiles, reflow y composicion dentro del landmark de `AppShell` sin crear un segundo landmark de navegacion.

`ProcessStatusLine` conserva lista ordenada, copy humano, una posicion `CURRENT` ya resuelta mediante `aria-current="step"`, marcadores y conectores decorativos fuera del nombre accesible, diferencias perceptibles que no dependen solo de color, ausencia de tab stops artificiales, reflow horizontal a vertical y ausencia de movimiento que simule confirmacion empresarial.

`PrimaryActionPanel` conserva region nombrada mediante `ariaLabel`, label principal visible, estado ocupado en `PENDING`, copy material de bloqueo cuando el propietario lo aporta, orden primary-then-secondary, reflow y jerarquia no dependiente solo de color; no fuerza foco ni crea una region viva universal.

`SensitiveActionConfirmation` conserva nombre accesible mediante `ariaLabel`, titulo, descripcion y consecuencia visibles, estado ocupado en `PENDING`, copy de bloqueo o incertidumbre cuando el propietario lo aporta y controles explicitos de cancelacion y confirmacion. La primitiva no implementa focus trap, portal, backdrop ni cierre por `Escape`; el contenedor propietario conserva foco seguro, teclado completo y retorno de foco cuando la modalidad lo requiera.

`ContextDiagnostic` conserva titulo y resumen antes de los detalles, listas semanticas para condiciones, contexto preservado y acciones afectadas, diferencias estructurales entre los cinco estados, reflow sin perdida de contenido y ausencia de tab stops artificiales. La composicion propietaria controla anuncio y foco cuando un bloqueo critico aparece como resultado directo de una accion.

`TabletTaskSurface` conserva nombre accesible de superficie, orden DOM estable de los siete slots, foco visible de controles hijos, objetivos tactiles amplios, reflow sin clipping, alternativa a gestos y estructura server-safe sin robar foco ni usar color, sonido o movimiento como unico significado.

`KioskTaskSurface` conserva nombre accesible de superficie, orden DOM estable de los siete slots, foco visible de controles hijos, objetivos tactiles amplios, reflow sin clipping, alternativas a gestos y estructura server-safe sin robar foco ni usar contencion de sistema, color, sonido o movimiento como unico significado.

`CrossAppHandoff` conserva region nombrada, orden DOM estable de siete slots, foco visible de controles hijos, objetivos tactiles amplios, reflow, teclado y lector de pantalla sin inferir aceptacion, autoridad o efecto desde navegacion y sin imponer una live region universal.

La certificacion de contraste, tecnologias de asistencia, paridad visual y comportamiento por consumidor permanece en los gates de package, UX y migracion aplicables antes de retiro legacy.

## Superficie publica diferida

Esta instancia no modifica el manifest de `@vento/ui-web` y no crea `exports`, `main`, `types`, version npm, peer dependencies, publicacion ni entrypoints CSS publicos. Los exports publicos permanecen diferidos.

La habilitacion de una superficie publica versionada, compatibilidad, publicacion, adopcion de consumidores, rollback y retiro legacy permanecen gobernados por las tareas `SHELL-PKG-*`, `SHELL-CI-*` y `SHELL-MIG-*` que correspondan. El retiro legacy exige evidencia de uso residual cero o migracion certificada antes de eliminar una copia existente.

## Continuidad reservada

ÚLTIMA TAREA APROBADA: `SHELL-UI-019`

TAREA ACTUAL APROBADA: `SHELL-UI-020`

SIGUIENTE TAREA RESERVADA: `SHELL-MIG-001`

`SHELL-UI-020::GLOBAL` materializa solamente la superficie compartida de presentacion para un handoff cross-app ya resuelto externamente. `SHELL-MIG-001` conserva el inventario ejecutable y la adopcion posterior; UI020 no adelanta migracion de consumidores, destinos tecnicos, autoridad, mutaciones cross-app, contratos, persistencia, Supabase ni patrones posteriores.

## Fuera de alcance

Esta instancia no modifica `package.json` raiz, `package-lock.json`, `packages/ui-web/package.json`, `src/components/ui`, `templates/app-shell-standard`, componentes, estilos o validadores previos de `packages/ui-web` incluidos `Button`, `AppShell`, `TaskNavigation`, `ProcessStatusLine` y `PrimaryActionPanel`, `packages/contracts`, `packages/os-context`, `packages/supabase`, `ProfileMenu`, `AppSwitcher`, `VentoShell`, `VentoChrome`, aplicaciones consumidoras, clasificacion empresarial de sensibilidad, registros de acciones, rutas empresariales, permission codes, roles, permisos, grants, contexto efectivo, `OperatingGate`, estados o transiciones de proceso, guards, Server Actions, endpoints, mutaciones, idempotencia, reautenticacion, reason codes, doble control, cancelacion empresarial, reconciliacion de proveedor, diagnostico de contexto de `SHELL-UI-015`, offline, sincronizacion, SQL, DDL, DML, migraciones, RLS, RPC, Storage, Realtime, Edge Functions, datos, exports npm, versionado, publicacion, adopcion de consumidores, retiro legacy, Supabase ni el registro 04A/TREQ.
