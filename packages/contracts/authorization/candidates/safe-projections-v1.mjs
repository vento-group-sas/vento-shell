// DRAFT ONLY: SHELL-AUTH-002 / TREQ-SHELL-070..072 source candidate.
// Excluded from @vento/contracts@1.0.0-alpha.1 dist, exports and npm tarball.
// The published alpha.1 identity is immutable; promote only in an approved NEW version.
import {
  isAppCode, isPermissionKey, PERMISSION_BY_KEY,
} from "@vento/contracts/authorization/catalog/v1";
import { isBaseRoleCode } from "@vento/contracts/authorization/base-roles/v1";
import { isOperationalRoleCode } from "@vento/contracts/authorization/operational-roles/v1";
import { isAuthorizationReasonCode } from "@vento/contracts/authorization/reason-codes/v1";

const CONTEXT_FIELDS = Object.freeze([
  "projection_version", "app_code", "context_id", "resolved_at",
  "principal_type", "actor_type", "base_role_code", "operational_role_code",
  "operational_site_id", "operational_area_id", "base_readiness",
  "operational_readiness",
]);

const DECISION_FIELDS = Object.freeze([
  "projection_version", "correlation_id", "app_code", "permission_key",
  "outcome", "safe_message_code", "reason_codes", "visible_fields",
  "mutable_fields",
]);

const PRINCIPAL_TYPES = new Set([
  "HUMAN_USER", "SHARED_DEVICE", "SYSTEM_SERVICE", "ANONYMOUS",
]);
const ACTOR_TYPES = new Set(["EMPLOYEE", "CUSTOMER", "SYSTEM", "UNRESOLVED"]);
const LANE_READINESS = new Set(["READY", "UNAVAILABLE", "INVALID", "NOT_APPLICABLE"]);

const isText = (value) => typeof value === "string" && value.length > 0;
const isNullableText = (value) => value === null || isText(value);
const fail = () => { throw new TypeError("VENTO_AUTH_PROJECTION:CONTRACT_INVALID"); };

/**
 * Read an untrusted JSON-style object without executing own-property getters.
 * The exact field count prevents additional identity, evidence or authority
 * from crossing the client boundary.
 */
function exactData(input, fields) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) fail();
  const prototype = Object.getPrototypeOf(input);
  if (prototype !== Object.prototype && prototype !== null) fail();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== fields.length) fail();
  const values = Object.create(null);
  for (const field of fields) {
    const descriptor = descriptors[field];
    if (!descriptor || !Object.hasOwn(descriptor, "value") || !descriptor.enumerable) fail();
    values[field] = descriptor.value;
  }
  return values;
}

/** Copy an untrusted list without invoking getters, serializers or methods. */
function safeStringList(input, predicate) {
  if (!Array.isArray(input) || Object.getPrototypeOf(input) !== Array.prototype) fail();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== input.length + 1) fail();
  const result = [];
  for (let i = 0; i < input.length; i += 1) {
    const descriptor = descriptors[String(i)];
    if (!descriptor || !Object.hasOwn(descriptor, "value") || !descriptor.enumerable
      || !predicate(descriptor.value)) fail();
    result.push(descriptor.value);
  }
  return Object.freeze(result);
}

/**
 * Candidate pure parser for the documented 12-field SafeContextProjectionV1.
 * Parses presentation data only; never grants access or evaluates a permission.
 */
export function parseSafeContextProjection(input) {
  try {
    const v = exactData(input, CONTEXT_FIELDS);
    if (v.projection_version !== "1.0.0" || !isAppCode(v.app_code)
      || !isText(v.context_id) || !isText(v.resolved_at)
      || !PRINCIPAL_TYPES.has(v.principal_type)
      || !ACTOR_TYPES.has(v.actor_type)
      || (v.base_role_code !== null && !isBaseRoleCode(v.base_role_code))
      || (v.operational_role_code !== null && !isOperationalRoleCode(v.operational_role_code))
      || !isNullableText(v.operational_site_id)
      || !isNullableText(v.operational_area_id)
      || !LANE_READINESS.has(v.base_readiness)
      || !LANE_READINESS.has(v.operational_readiness)) fail();
    return Object.freeze({
      projection_version: v.projection_version,
      app_code: v.app_code,
      context_id: v.context_id,
      resolved_at: v.resolved_at,
      principal_type: v.principal_type,
      actor_type: v.actor_type,
      base_role_code: v.base_role_code,
      operational_role_code: v.operational_role_code,
      operational_site_id: v.operational_site_id,
      operational_area_id: v.operational_area_id,
      base_readiness: v.base_readiness,
      operational_readiness: v.operational_readiness,
    });
  } catch {
    fail();
  }
}

/**
 * Candidate pure parser for the documented 9-field SafeDecisionProjectionV1.
 * Public reason codes are validated by @vento/contracts; this DTO is never a
 * capability token and must never authorize a subsequent mutation.
 */
export function parseSafeDecisionProjection(input) {
  try {
    const v = exactData(input, DECISION_FIELDS);
    if (v.projection_version !== "1.0.0" || !isAppCode(v.app_code)
      || !isPermissionKey(v.permission_key)
      || PERMISSION_BY_KEY[v.permission_key]?.app_code !== v.app_code
      || !isNullableText(v.correlation_id)
      || (v.outcome !== "ALLOW" && v.outcome !== "DENY")) fail();
    const reasons = safeStringList(v.reason_codes, isAuthorizationReasonCode);
    const visible = safeStringList(v.visible_fields, isText);
    const mutable = safeStringList(v.mutable_fields, isText);
    if (v.outcome === "ALLOW") {
      if (v.safe_message_code !== null || reasons.length !== 0) fail();
    } else if (!isAuthorizationReasonCode(v.safe_message_code)) {
      fail();
    }
    return Object.freeze({
      projection_version: v.projection_version,
      correlation_id: v.correlation_id,
      app_code: v.app_code,
      permission_key: v.permission_key,
      outcome: v.outcome,
      safe_message_code: v.safe_message_code,
      reason_codes: reasons,
      visible_fields: visible,
      mutable_fields: mutable,
    });
  } catch {
    fail();
  }
}
