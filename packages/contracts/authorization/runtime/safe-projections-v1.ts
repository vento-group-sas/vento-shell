// PRIVATE DRAFT: presentation-only DTO parsing. NEVER use outcome as execution authority.
// Canonical SHELL-AUTH-002 surfaces; not a backend evaluator or a trusted capability.
import type { AppCode, PermissionKey } from "../generated/versions/1.0.0/index.js";
import type { BaseRoleCode } from "../generated/base-roles/versions/1.1.0/index.js";
import type { OperationalRoleCode } from "../generated/operational-roles/versions/1.0.0/index.js";
import type { AuthorizationReasonCode } from "../generated/reason-codes/versions/1.0.0/index.js";

export type SafeContextProjectionV1 = Readonly<{
  projection_version: "1.0.0"; app_code: AppCode; context_id: string; resolved_at: string;
  principal_type: "HUMAN_USER" | "SHARED_DEVICE" | "SYSTEM_SERVICE" | "ANONYMOUS";
  actor_type: "EMPLOYEE" | "CUSTOMER" | "SYSTEM" | "UNRESOLVED";
  base_role_code: BaseRoleCode | null; operational_role_code: OperationalRoleCode | null;
  operational_site_id: string | null; operational_area_id: string | null;
  base_readiness: "READY" | "UNAVAILABLE" | "INVALID" | "NOT_APPLICABLE";
  operational_readiness: "READY" | "UNAVAILABLE" | "INVALID" | "NOT_APPLICABLE";
}>;
export type SafeDecisionProjectionV1 = Readonly<{
  projection_version: "1.0.0"; correlation_id: string | null; app_code: AppCode;
  permission_key: PermissionKey; outcome: "ALLOW" | "DENY";
  safe_message_code: AuthorizationReasonCode | null;
  reason_codes: readonly AuthorizationReasonCode[];
  visible_fields: readonly string[]; mutable_fields: readonly string[];
}>;
import {
  isAppCode, isPermissionKey, PERMISSION_BY_KEY,
} from "../generated/versions/1.0.0/index.js";
import { isBaseRoleCode } from "../generated/base-roles/versions/1.1.0/index.js";
import { isOperationalRoleCode } from "../generated/operational-roles/versions/1.0.0/index.js";
import { isAuthorizationReasonCode } from "../generated/reason-codes/versions/1.0.0/index.js";

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

const isText = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const isNullableText = (value: unknown): value is string | null => value === null || isText(value);
const fail = (): never => { throw new TypeError("VENTO_AUTH_PROJECTION:CONTRACT_INVALID"); };
const inSet = (set: ReadonlySet<string>, value: unknown): boolean => typeof value === "string" && set.has(value);

/**
 * Read an untrusted JSON-style object without executing own-property getters.
 * The exact field count prevents additional identity, evidence or authority
 * from crossing the client boundary.
 */
function exactData(input: unknown, fields: readonly string[]): Record<string, unknown> {
  if (input === null || typeof input !== "object" || Array.isArray(input)) fail();
  const prototype = Object.getPrototypeOf(input);
  if (prototype !== Object.prototype && prototype !== null) fail();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== fields.length) fail();
  const values: Record<string, unknown> = Object.create(null);
  for (const field of fields) {
    const descriptor = descriptors[field];
    if (!descriptor || !Object.hasOwn(descriptor, "value") || !descriptor.enumerable) fail();
    values[field] = descriptor.value;
  }
  return values;
}

/** Copy an untrusted list without invoking getters, serializers or methods. */
function safeStringList(input: unknown, predicate: (value: unknown) => boolean): readonly string[] {
  if (!Array.isArray(input)) return fail();
  if (Object.getPrototypeOf(input) !== Array.prototype) return fail();
  const array = input as unknown[];
  const descriptors = Object.getOwnPropertyDescriptors(array);
  if (Reflect.ownKeys(descriptors).length !== array.length + 1) fail();
  const result: string[] = [];
  for (let i = 0; i < array.length; i += 1) {
    const descriptor = descriptors[String(i)];
    if (!descriptor || !Object.hasOwn(descriptor, "value") || !descriptor.enumerable
      || !predicate(descriptor.value)) fail();
    result.push(descriptor.value as string);
  }
  return Object.freeze(result);
}

/**
 * Candidate pure parser for the documented 12-field SafeContextProjectionV1.
 * Parses presentation data only; never grants access or evaluates a permission.
 */
export function parseSafeContextProjection(input: unknown): SafeContextProjectionV1 {
  try {
    const v = exactData(input, CONTEXT_FIELDS);
    if (v.projection_version !== "1.0.0" || !isAppCode(v.app_code)
      || !isText(v.context_id) || !isText(v.resolved_at)
      || !inSet(PRINCIPAL_TYPES, v.principal_type)
      || !inSet(ACTOR_TYPES, v.actor_type)
      || (v.base_role_code !== null && !isBaseRoleCode(v.base_role_code))
      || (v.operational_role_code !== null && !isOperationalRoleCode(v.operational_role_code))
      || !isNullableText(v.operational_site_id)
      || !isNullableText(v.operational_area_id)
      || !inSet(LANE_READINESS, v.base_readiness)
      || !inSet(LANE_READINESS, v.operational_readiness)) fail();
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
    }) as unknown as SafeContextProjectionV1;
  } catch {
    return fail();
  }
}

/**
 * Candidate pure parser for the documented 9-field SafeDecisionProjectionV1.
 * Public reason codes are validated by @vento/contracts; this DTO is never a
 * capability token and must never authorize a subsequent mutation.
 */
export function parseSafeDecisionProjection(input: unknown): SafeDecisionProjectionV1 {
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
    }) as unknown as SafeDecisionProjectionV1;
  } catch {
    return fail();
  }
}
