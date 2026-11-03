// SOURCE-ONLY candidate: checks SHA-256 of supplied canonical preimage bytes.
// AUTH-CTX-024: this never selects backend resource facts, verifies their
// provenance, supplies authority or replaces the resource-contract resolver.
// Conservative JSON subset: sorted snake_case keys, NFC strings, safe integers,
// explicit null; timestamps and set semantics require the trusted producer.
import { createHash, timingSafeEqual } from "node:crypto";
const VERSION = "vento.canonical-json@1.0.0";
const HASH = /^sha256:[a-f0-9]{64}$/u;
const KEY = /^[a-z][a-z0-9_]*$/u;
const FIELDS = [
  "serialization_profile", "resource_contract_id",
  "resource_fingerprint", "canonical_preimage_json",
];
function invalid() {
  throw new TypeError("VENTO_AUTH_RESOURCE_FINGERPRINT:DIAGNOSTIC_INVALID");
}
function canonical(value, depth = 0) {
  if (depth > 40) invalid();
  if (value === null) return "null";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) invalid();
    return String(value);
  }
  if (typeof value === "string") {
    if (value.normalize("NFC") !== value) invalid();
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map((x) => canonical(x, depth + 1)).join(",") + "]";
  }
  if (!value || typeof value !== "object") invalid();
  const keys = Object.keys(value).sort();
  if (keys.some((key) => !KEY.test(key))) invalid();
  return "{" + keys.map((key) =>
    JSON.stringify(key) + ":" + canonical(value[key], depth + 1)).join(",") + "}";
}
export function inspectResourceFingerprintPreimageV1(input) {
  try {
    if (!input || typeof input !== "object" || Array.isArray(input)
      || ![Object.prototype, null].includes(Object.getPrototypeOf(input))) invalid();
    const desc = Object.getOwnPropertyDescriptors(input);
    if (Reflect.ownKeys(desc).length !== FIELDS.length) invalid();
    const v = Object.create(null);
    for (const key of FIELDS) {
      if (!desc[key] || !Object.hasOwn(desc[key], "value")
        || !desc[key].enumerable) invalid();
      v[key] = desc[key].value;
    }
    if (v.serialization_profile !== VERSION
      || typeof v.resource_contract_id !== "string"
      || !v.resource_contract_id || v.resource_contract_id.trim() !== v.resource_contract_id
      || typeof v.resource_fingerprint !== "string" || !HASH.test(v.resource_fingerprint)
      || typeof v.canonical_preimage_json !== "string") invalid();
    const bytes = Buffer.from(v.canonical_preimage_json, "utf8");
    if (!bytes.length || bytes.length > 65536
      || bytes.toString("utf8") !== v.canonical_preimage_json) invalid();
    const parsed = JSON.parse(v.canonical_preimage_json);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)
      || parsed.resource_contract_id !== v.resource_contract_id
      || !parsed.resource || typeof parsed.resource !== "object"
      || Array.isArray(parsed.resource)
      || typeof parsed.resource.resource_type !== "string") invalid();
    if (canonical(parsed) !== v.canonical_preimage_json) invalid();
    const actual = createHash("sha256").update(bytes).digest();
    const expected = Buffer.from(v.resource_fingerprint.slice(7), "hex");
    if (!timingSafeEqual(actual, expected)) invalid();
    return undefined; // Never authorization, ALLOW, a token or a capability.
  } catch {
    invalid();
  }
}
