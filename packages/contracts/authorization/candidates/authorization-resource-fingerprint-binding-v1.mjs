// SOURCE-ONLY diagnostic candidate: AUTH-CTX-018/024 binding checks.
// Links a structurally valid AuthorizationDecision envelope to SHA-256
// preimage bytes from a resource resolver. It NEVER proves that the resolver
// selected all material facts, was trusted, used current state or ran in SQL.
// No permission decision, token, grant or business snapshot returned.
import { isDeepStrictEqual } from "node:util";
import { inspectAuthorizationDecisionEnvelopeV1 } from "./authorization-decision-envelope-v1.mjs";
import { inspectResourceFingerprintPreimageV1 } from "./resource-fingerprint-diagnostic-v1.mjs";

const MINIMUM_IDENTITY = [
  "resource_type", "request_shape", "resolution_status",
  "resource_ids", "resource_version",
];
const OPTIONAL_SNAPSHOT = [
  "subject", "territory", "ownership", "required_sides",
  "state_snapshot", "field_classification", "concurrency",
];
function invalid() {
  throw new TypeError("VENTO_AUTH_RESOURCE_BINDING:DIAGNOSTIC_INVALID");
}
function exactEvidence(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) invalid();
  const prototype = Object.getPrototypeOf(input);
  if (prototype !== Object.prototype && prototype !== null) invalid();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== 2) invalid();
  for (const key of ["decision", "canonical_preimage_json"]) {
    const d = descriptors[key];
    if (!d || !d.enumerable || !Object.hasOwn(d, "value")) invalid();
  }
  return {
    decision: descriptors.decision.value,
    canonical_preimage_json: descriptors.canonical_preimage_json.value,
  };
}

/**
 * Diagnostic consistency only. Hash bytes come from the supplied preimage,
 * while fingerprint and contract ID come from the decision audit.
 * Resource-contract field selection and trusted provenance are NOT tested.
 * Returns undefined, never authorization.
 */
export function inspectAuthorizationResourceFingerprintBindingV1(input) {
  try {
    const evidence = exactEvidence(input);
    inspectAuthorizationDecisionEnvelopeV1(evidence.decision);
    const decision = evidence.decision;
    if (typeof evidence.canonical_preimage_json !== "string") invalid();
    inspectResourceFingerprintPreimageV1({
      serialization_profile: "vento.canonical-json@1.0.0",
      resource_contract_id: decision.permission_contract.resource_contract_id,
      resource_fingerprint: decision.audit.resource_fingerprint,
      canonical_preimage_json: evidence.canonical_preimage_json,
    });
    const preimage = JSON.parse(evidence.canonical_preimage_json);
    const recorded = preimage.resource;
    const resolved = decision.resource;
    for (const field of MINIMUM_IDENTITY) {
      if (!Object.hasOwn(recorded, field)
        || !isDeepStrictEqual(recorded[field], resolved[field])) invalid();
    }
    // For facts included in the preimage, disallow snapshot mismatches.
    // Missing contract-selected facts CANNOT be attested here.
    for (const field of OPTIONAL_SNAPSHOT) {
      if (Object.hasOwn(recorded, field)
        && !isDeepStrictEqual(recorded[field], resolved[field])) invalid();
    }
    return undefined;
  } catch {
    invalid();
  }
}
