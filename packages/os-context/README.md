# @vento/os-context — preparación de fronteras

**Estado:** `DRAFT`, workspace privado `0.1.0`; **NO PUBLICAR, NO ADOPTAR EN CONSUMIDORES**.

La primera release estable `1.0.0` está bloqueada por `SHELL-AUTH-001..005`, `TREQ-SHELL-061..079`, la materialización aprobada `DELIV-PKG-025/E5-GATE-008` y la disponibilidad de validadores canónicos de decisión/proyección en una **nueva versión** de `@vento/contracts`. La versión publicada `@vento/contracts@1.0.0-alpha.1` es inmutable y no exporta `AuthorizationDecisionV1` ni los parsers `Safe*ProjectionV1`.

## Fronteras DRAFT — solo aislamiento estructural

| Import | Superficie | Estado |
| --- | --- | --- |
| `@vento/os-context/server` | `resolveAccessContext`, `evaluateAuthorization`, `requireAuthorization`, `getSafeContextProjection`, `getSafeDecisionProjection`, `createAuthorizationScope` | **BLOCKED:** siempre rechazan la llamada; no ejecutan backend ni conceden capacidad |
| `@vento/os-context/client` | `parseSafeContextProjection`, `parseSafeDecisionProjection` | **BLOCKED:** rechazan `unknown` hasta existir validadores publicados; sin red, Supabase, UI o React |
| `@vento/os-context/testing` | `makeInvalidAuthorizationFixture` | Fixture negativa, determinista y sin autoridad |
| `@vento/os-context/legacy` | Cuatro wrappers RPC previamente existentes y tipos `EffectiveContext` / `ContextSimulationInput` | **TRANSITORIO / DEPRECADO**; no equivale a contexto o decisión canónicos |

No existe export público de `@vento/os-context` raíz. Las cuatro rutas no se reexportan unas a otras. `src/client.ts` contiene exclusivamente el código histórico y se compila como implementación privada del subpath `/legacy`.

## Restricciones de seguridad

- Los RPC `get_effective_context_v1`, `has_effective_permission_v1`, `start_context_simulation_v1` y `stop_context_simulation_v1` continúan únicamente en `/legacy`; no son autoridad canónica.
- Nadie debe interpretar `bypass_applied`, `can_operate`, un booleano RPC o una proyección segura como permiso de mutación.
- Los futuros adapters de `/server` solo podrán consumir `get_access_context` y `evaluate_authorization` mediante fronteras backend aprobadas; `app_private` no es RPC pública cliente. Nunca desproteger RLS ni otorgar `service_role` para desbloquearlo.
- Los contratos/catálogos, tipos y validadores canónicos pertenecerán a `@vento/contracts/authorization`; no se sustituyen con shapes locales.
- El paquete permanece `private: true`. No se modificaron consumidor, base de datos, RLS, registro, tag, Release o despliegue en este corte.

## Validación

Tras compilar `@vento/contracts` y `@vento/os-context`:

```sh
npm run build --workspace @vento/contracts
npm run build --workspace @vento/os-context
npm run test --workspace @vento/os-context
npm run validate --workspace @vento/os-context
```

La evidencia CI001/CI002 asociada al SHA y el paquete deberá superar los cuatro exports y los rechazos fail-closed. Las pruebas positivas de autorización real y `SHELL-CI-005/018` no estarán acreditadas por una prueba de fronteras.

**Siguiente dependencia:** nueva superficie canónica y versionada de `AuthorizationDecisionV1` y parsers seguros en `@vento/contracts/authorization`, seguida de `SHELL-AUTH-002` y aprobación E5 independiente. Sin estos controles la preparación no se convierte en release estable.
