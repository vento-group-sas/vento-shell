// SOURCE-ONLY diagnostic candidate for AUTH-CAT-016 / AUTH-CTX-018 / AUTH-CTX-024.
// Checks coverage of facts DECLARED by a caller-provided resource-contract
// description. The declaration is untrusted and is NOT proof of a canonical
// registry entry, producer identity, completeness or current backend state.
// A trusted AUTH-DB-033/034 resource-contract registry is still required.
// Neither a matching digest nor this diagnostic can grant authorization.
import { inspectAuthorizationResourceFingerprintBindingV1 } from "./authorization-resource-fingerprint-binding-v1.mjs";

const INPUT = ["decision", "canonical_preimage_json", "declared_resource_contract"];
const CONTRACT = [
  "resource_contract_id", "resource_type", "request_shape",
  "required_resource_fields", "required_state_keys", "required_classification_keys",
];
const OPTIONAL_FACTS = new Set([
  "subject", "territory", "ownership", "required_sides", "state_snapshot",
  "field_classification", "concurrency",
]);
const KEY = /^[a-z][a-z0-9_]*$/u;
function invalid() {
  throw new TypeError("VENTO_AUTH_RESOURCE_COVERAGE:DIAGNOSTIC_INVALID");
}
function exactData(input, names) {
  if (!input || typeof input !== "object" || Array.isArray(input)) invalid();
  const proto = Object.getPrototypeOf(input);
  if (proto !== Object.prototype && proto !== null) invalid();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== names.length) invalid();
  const out = Object.create(null);
  for (const name of names) {
    const d = descriptors[name];
    if (!d || !d.enumerable || !Object.hasOwn(d, "value")) invalid();
    out[name] = d.value;
  }
  return out;
}
function sortedNames(input, options = null) {
  if (!Array.isArray(input) || Object.getPrototypeOf(input) !== Array.prototype
    || input.length > 128) invalid();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== input.length + 1) invalid();
  const out = [];
  for (let i = 0; i < input.length; i++) {
    const d = descriptors[String(i)];
    if (!d || !d.enumerable || !Object.hasOwn(d, "value")) invalid();
    const value = d.value;
    if (typeof value !== "string" || !KEY.test(value)
      || (options !== null && !options.has(value))
      || (out.length > 0 && out[out.length - 1] >= value)) invalid();
    out.push(value);
  }
  return out;
}

/**
 * Checks only that the caller-declared facts occur in the already-hashed
 * preimage, and are consistent with the same decision's resolved resource.
 * Does not validate who declared those facts or whether any were omitted.
 * Returns undefined, never a coverage certificate, decision or permission.
 */
export function inspectDeclaredResourceFactCoverageV1(input) {
  try {
    const evidence = exactData(input, INPUT);
    const declaration = exactData(evidence.declared_resource_contract, CONTRACT);
    inspectAuthorizationResourceFingerprintBindingV1({
      decision: evidence.decision,
      canonical_preimage_json: evidence.canonical_preimage_json,
    });
    const resource = evidence.decision.resource;
    if (declaration.resource_contract_id
        !== evidence.decision.permission_contract.resource_contract_id
      || declaration.resource_type !== resource.resource_type
      || declaration.request_shape !== resource.request_shape) invalid();
    const requiredFacts = sortedNames(declaration.required_resource_fields, OPTIONAL_FACTS);
    const stateKeys = sortedNames(declaration.required_state_keys);
    const classificationKeys = sortedNames(declaration.required_classification_keys);
    if ((stateKeys.length && !requiredFacts.includes("state_snapshot"))
      || (classificationKeys.length && !requiredFacts.includes("field_classification"))) invalid();
    const recorded = JSON.parse(evidence.canonical_preimage_json).resource;
    for (const name of requiredFacts) {
      // Explicit null and empty collections count as PRESENT, not as wildcard.
      if (!Object.hasOwn(recorded, name)) invalid();
    }
    for (const [field, keys] of [
      ["state_snapshot", stateKeys],
      ["field_classification", classificationKeys],
    ]) {
      if (!keys.length) continue;
      if (!recorded[field] || typeof recorded[field] !== "object"
        || Array.isArray(recorded[field])) invalid();
      for (const key of keys) {
        if (!Object.hasOwn(recorded[field], key)
          || !Object.hasOwn(resource[field], key)) invalid();
      }
    }
    return undefined;
  } catch {
    invalid();
  }
}
