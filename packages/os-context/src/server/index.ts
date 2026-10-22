/**
 * SHELL-AUTH-001: reserved, fail-closed server boundary.
 *
 * Functional adapters depend on SHELL-AUTH-002 and canonical runtime validators
 * published through @vento/contracts/authorization. No backend authorization is
 * simulated or inferred from the legacy SDK.
 */
export type {
  AccessContextV1,
  SimulationContextV1,
} from "@vento/contracts/authorization/response-contracts/v1";

function unavailable(): Error {
  const error = new Error("VENTO_OS_CONTEXT:CANONICAL_AUTHORIZATION_CONTRACT_PENDING");
  error.name = "AuthorizationContractPendingError";
  return error;
}

/** @deprecated NOT IMPLEMENTED. Never use as an authorization decision. */
export async function resolveAccessContext(_request: never): Promise<never> {
  throw unavailable();
}

/** @deprecated NOT IMPLEMENTED. Never reconstruct an outcome locally. */
export async function evaluateAuthorization(_request: never): Promise<never> {
  throw unavailable();
}

/** @deprecated NOT IMPLEMENTED. Cannot permit mutations while unavailable. */
export async function requireAuthorization(_request: never): Promise<never> {
  throw unavailable();
}

/** @deprecated NOT IMPLEMENTED. Requires a validated canonical context. */
export function getSafeContextProjection(_context: never): never {
  throw unavailable();
}

/** @deprecated NOT IMPLEMENTED. Requires a validated canonical decision. */
export function getSafeDecisionProjection(_decision: never): never {
  throw unavailable();
}

/** @deprecated NOT IMPLEMENTED. Scope ownership belongs to SHELL-AUTH-003. */
export function createAuthorizationScope(_request: never): never {
  throw unavailable();
}
