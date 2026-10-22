/**
 * Pure client boundary. Canonical projection parsers belong to SHELL-AUTH-002.
 * Until their contracts and validators are published, reject every payload.
 *
 * No Supabase, network, runtime authority, UI framework or legacy imports.
 */
function unavailable(): Error {
  const error = new Error("VENTO_OS_CONTEXT:CANONICAL_PROJECTION_VALIDATOR_PENDING");
  error.name = "ProjectionContractPendingError";
  return error;
}

/** @deprecated NOT IMPLEMENTED. Rejects unverified projection payloads. */
export function parseSafeContextProjection(_payload: never): never {
  throw unavailable();
}

/** @deprecated NOT IMPLEMENTED. Rejects unverified authorization outcomes. */
export function parseSafeDecisionProjection(_payload: never): never {
  throw unavailable();
}
