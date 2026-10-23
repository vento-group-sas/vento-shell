# @vento/supabase

> **Estado operativo de distribución — 2026-10-21 (PR #1021, candidato privado).**
> Este paquete incorpora versión candidata, `dist/`, builds ESM/TypeScript y exports explícitos `./browser`, `./server`, `./native`, `./runtime`, `./errors` y `./privileged` (este último solo bajo condición Node). Validaciones: `npm run build --workspace @vento/supabase` y `npm run validate --workspace @vento/supabase`. **No hay publicación ni adopción por consumidores.** Las declaraciones posteriores de ausencia de exports corresponden a los límites históricos de `SHELL-DB-004/005`.


Raiz privada de autoria para el acceso tecnico compartido a Supabase de Vento OS.

## Normalizacion tecnica de errores — SHELL-DB-004

Contrato `VENTO_SUPABASE_TECHNICAL_ERROR_NORMALIZATION@1.0.0`.
El validador historico comprueba **4/4 capas** semanticas, **11/11 familias** y **36/36 coberturas** de escenarios. El cliente publico no debe exponer diagnósticos protegidos y el dominio VITAL permanece excluido. Estos numeros son criterios de cobertura del contrato; los resultados PASS dependen de la ejecucion efectiva de CI.

## Estado fisico

Este package permanece en fundacion `PRE_E5_FOUNDATION` y no esta publicado como superficie npm consumible.

Materializacion acumulada:

- `SHELL-DB-001::GLOBAL`: raiz privada `@vento/supabase`.
- `SHELL-DB-004::GLOBAL`: normalizacion tecnica runtime-neutral en `src/errors.ts`.
- `SHELL-DB-005::GLOBAL`: fronteras internas separadas de clientes Supabase en `src/browser.ts`, `src/server.ts`, `src/native.ts`, `src/privileged.ts` y politica runtime-neutral compartida en `src/runtime.ts`.

Todavia no existen `exports` npm, version publica del package, publicacion de registry ni migracion de consumidores. Los subpaths canonicos estan materializados como archivos internos de autoria, pero su publicacion sigue diferida al lifecycle propietario de package.

## Fronteras runtime de SHELL-DB-005

| Frontera | Subpath canonico | Factory | Lifecycle |
| --- | --- | --- | --- |
| Browser | `@vento/supabase/browser` | `createBrowserClient` | una instancia propiedad de la aplicacion por realm/configuracion; la factory no cachea y fuerza `isSingleton: false` |
| Server de sesion | `@vento/supabase/server` | `createServerClient` | cliente nuevo por request/contexto autoritativo equivalente |
| Native | `@vento/supabase/native` | `createNativeClient` | una instancia propiedad de la aplicacion por runtime/configuracion con storage persistente inyectado |
| Privileged | `@vento/supabase/privileged` | `createPrivilegedClient` | una instancia propiedad del backend por isolate/proceso y configuracion privilegiada |

La raiz `@vento/supabase` permanece runtime-neutral y no reexporta ninguna de estas factories.

## Configuracion y credenciales

Las factories reciben configuracion ya resuelta. No leen `process.env`, no aplican precedencia ambiental y no seleccionan aliases legacy.

- Browser, server de sesion y native aceptan exclusivamente `url` + `publicKey` y rechazan claves `sb_secret_*` y JWT con rol `service_role`.
- Privileged acepta `url` + `serviceRoleKey` y exige una clave `sb_secret_*` o un JWT con rol `service_role`.
- La sesion Supabase no concede permisos empresariales, sede, area, rol ni contexto operativo.
- VITAL permanece fuera de esta frontera.

## Cookies browser/server

La politica compartida es host-aware y determinista:

- host-only por defecto;
- dominio compartido solo cuando esta configurado, habilitado y el host pertenece exactamente a ese dominio o a un subdominio valido;
- `localhost`, direcciones IP y hosts fuera del dominio quedan host-only;
- no se infiere parent domain recortando el hostname;
- `path=/`;
- `sameSite=lax`;
- `secure=true` en HTTPS;
- HTTP inseguro exige `allowInsecureHttp: true` de forma explicita;
- no se fuerzan `expires`, `maxAge`, `httpOnly` ni nombres de cookie desde la politica compartida, por lo que esas señales permanecen bajo la semantica compatible del proveedor.

La factory server recibe un adapter `getAll/setAll` y un `cookieWriteMode`:

- `READ_WRITE`: `setAll` se propaga al adapter; una excepcion real no se silencia.
- `READ_ONLY`: un intento de escritura produce `ReadOnlyCookieWriteError` con codigo tecnico `VENTO_SUPABASE_COOKIE_WRITE_READ_ONLY`; no se convierte en denegacion empresarial ni en exito silencioso.

La factory server no importa `next/headers`, no contiene matchers, redirects, rewrites ni routing. Esos adapters y reglas permanecen locales a cada aplicacion.

## Native

`createNativeClient` usa `@supabase/supabase-js`, nunca `@supabase/ssr` ni Next.js.

La factory exige storage con `getItem`, `setItem` y `removeItem`; no degrada a memoria si falta. Configura sesion persistente, auto refresh habilitado y `detectSessionInUrl: false`. El owner nativo conserva la instancia y gobierna el ciclo activo de refresh/deep-link fuera de esta factory.

## Privileged

`createPrivilegedClient` usa `@supabase/supabase-js` sin cookie humana, sin persistencia de sesion, sin auto refresh y sin deteccion de sesion en URL.

`service_role` habilita una frontera tecnica privilegiada, pero nunca equivale a autorizacion empresarial. El secreto no se registra, serializa ni reexporta hacia browser/native/root.

## Compatibilidad observada

La implementacion se prepara contra las versiones bloqueadas actualmente en `vento-shell`:

- `@supabase/ssr` `0.8.0`.
- `@supabase/supabase-js` `2.90.1`.

No se cambian `package.json`, `package-lock.json` ni `packages/supabase/package.json` en `SHELL-DB-005::GLOBAL`.

## Validacion fisica

`packages/supabase/scripts/validate-supabase-runtime-clients.mjs` valida la fundacion de las 50/50 coberturas definidas por `SHELL-DB-005` dentro del alcance de esta instancia: fronteras runtime, configuracion explicita, aislamiento de `service_role`, cookie policy, storage native, ausencia de cache interna, preservacion de middleware/consumidores y exclusion VITAL.

La compatibilidad ejecutable contra consumidores y la migracion/retirada de variantes legacy permanecen diferidas a sus tareas propietarias; `SHELL-DB-005::GLOBAL` no declara consumidores migrados.

## Fuera de alcance de esta instancia

- exports npm o conditions de package;
- version/publicacion del package;
- migracion de SHELL, VISO, NEXO, FOGO, ORIGO, PULSO o NUMERA;
- retiro de clientes legacy;
- cambios de middleware/proxy/routing;
- codegen o tipos generados;
- wrappers RPC;
- SQL, DDL, DML, migraciones, RLS, grants, RPC, Storage, Realtime, Edge Functions, datos o secretos;
- VITAL;
- registro 04A/TREQ.
