// SOURCE-ONLY CANDIDATE: AUTH-CTX-002/004 and TREQ-SHELL-068.
// No runtime export, publish, authorization grant or backend adapter.
// This deliberately validates only the documented decision ENVELOPE;
// it is NOT the full AuthorizationDecisionV1 runtime validator.
import {
  isAppCode, isPermissionKey, PERMISSION_BY_KEY,
} from "@vento/contracts/authorization/catalog/v1";

const ROOT = [
  "contract_family", "contract_family_version", "contract_name",
  "contract_version", "schema_version", "decision_id", "decided_at",
  "correlation_id", "access_context_ref", "request", "permission_contract",
  "resource", "required_lanes", "base_decision", "operational_decision",
  "prerequisite_decisions", "device_decision", "sensitivity_decision",
  "field_policy_decision", "matched_allows", "matched_denies",
  "structural_denies", "actor_wide_denies", "lane_denies",
  "blocked_reasons", "combination", "final_decision", "audit",
];
const CONTEXT = [
  "context_id", "context_contract_version", "resolved_at", "actor_type",
  "actor_id", "principal_type", "principal_id", "context_fingerprint",
];
const REQUEST = [
  "app_code", "permission_key", "operation_kind", "resource_request",
  "requested_fields", "request_source",
];
const PERMISSION = [
  "catalog_id", "catalog_version", "catalog_hash", "app_code",
  "permission_key", "permission_status", "authorization_requirement",
  "base_prerequisite", "operational_prerequisite", "requires_active_area",
  "device_policy_code", "sensitivity_class", "simulation_policy",
  "resource_contract_id", "dependency_permission_keys",
];
const RESOURCE = [
  "resource_type", "request_shape", "resolution_status", "resource_ids",
  "resource_version", "subject", "territory", "ownership",
  "required_sides", "state_snapshot", "field_classification",
  "concurrency",
];
const LANE = [
  "lane", "outcome", "readiness", "evaluated",
  "matched_allow_ids", "matched_deny_ids", "reason_codes",
];
const COMBINATION = [
  "authorization_requirement", "base_outcome", "operational_outcome",
  "authorizing_lanes", "blocked_lanes", "combination_rule",
  "combination_result",
];
const FINAL = [
  "outcome", "reason_category", "primary_reason_code",
  "authorizing_lanes", "safe_message_code",
];
const AUDIT = [
  "decision_id", "correlation_id", "actor_id", "principal_id", "device_id",
  "app_code", "permission_key", "resource_type", "resource_ids",
  "outcome", "authorizing_lanes", "context_fingerprint",
  "resource_fingerprint", "catalog_hash", "dataset_hashes",
  "evaluator_name", "evaluator_version",
];

const REQUIREMENTS = new Map([
  ["BASE_ONLY", ["BASE"]],
  ["OPERATIONAL_ONLY", ["OPERATIONAL"]],
  ["BASE_OR_OPERATIONAL", ["BASE", "OPERATIONAL"]],
  ["BASE_AND_OPERATIONAL", ["BASE", "OPERATIONAL"]],
]);
const KINDS = new Set(["READ", "CREATE", "UPDATE", "DELETE", "EXECUTE", "TRANSITION", "EXPORT", "APP_ACCESS"]);
const SOURCES = new Set(["SERVER_ACTION", "RPC", "RLS", "API", "UI_GUARD", "JOB"]);
const RESOURCE_SHAPES = new Set(["EXISTING", "DRAFT", "COLLECTION", "AGGREGATE", "BULK", "NON_RESOURCE"]);
const RESOURCE_STATUSES = new Set(["RESOLVED", "MULTI_RESOLVED", "NOT_APPLICABLE", "UNRESOLVED", "CONFLICT", "ISOLATED"]);
// AUTH-CTX-018 section 30: these are the only canonical field categories.
const FIELD_CLASSES = new Set([
  "PUBLIC", "INTERNAL", "SENSITIVE", "RESTRICTED",
  "IMMUTABLE", "SYSTEM_MANAGED",
]);
const LANE_OUTCOMES = new Set(["ALLOW", "DENY", "NOT_APPLICABLE"]);
const READINESS = new Set(["READY", "UNAVAILABLE", "INVALID", "NOT_APPLICABLE"]);
const CONSTRAINT_STATUS = new Set(["PASS", "FAIL", "NOT_APPLICABLE"]);
const PREREQUISITE_FIELDS = ["prerequisite_type", "applies_to_lane", "status", "reason_code"];
const PREREQUISITE_TYPES = new Set([
  "PERMISSION_DEPENDENCY", "SHIFT", "CHECKIN", "ACTIVE_AREA", "DEVICE",
  "REAUTHENTICATION", "RESOURCE_STATE", "OWNERSHIP", "REQUIRED_SIDE",
  "CONCURRENCY", "IDEMPOTENCY",
]);
const PREREQUISITE_LANES = new Set(["BASE", "OPERATIONAL", "BOTH", "REQUEST"]);
const GRANT_FIELDS = [
  "grant_id", "lane", "source_kind", "source_subject_id",
  "permission_key", "effect", "scope_code", "matched_territory",
  "matched_resource", "validity_status", "source_dataset_id",
  "source_dataset_version",
];
const GRANT_SOURCE_LANES = new Map([
  ["BASE_ROLE", "BASE"],
  ["OPERATIONAL_ROLE", "OPERATIONAL"],
  ["INDIVIDUAL_BASE", "BASE"],
  ["INDIVIDUAL_OPERATIONAL", "OPERATIONAL"],
]);
const DENY_FIELDS = [
  "deny_id", "deny_class", "lane", "permission_key", "source_kind",
  "matched_actor", "matched_resource", "matched_territory",
  "matched_validity", "reason_code",
];
const DENY_CLASSES = new Set([
  "STRUCTURAL", "ACTOR_WIDE", "BASE_LANE", "OPERATIONAL_LANE", "DEFAULT",
]);
const REASON_FIELDS = [
  "reason_code", "category", "severity", "lane", "source", "safe_to_expose",
];
const REASON_SEVERITIES = new Set(["BLOCKING", "INFORMATIONAL"]);
const REASON_LANES = new Set(["BASE", "OPERATIONAL", "ALL", null]);
const TERRITORY_FIELDS = [
  "organization_id", "business_unit_ids", "site_ids", "area_ids",
  "area_kinds", "origin", "destination", "route_ids", "vehicle_ids",
  "isolated_environment", "source", "coherent",
];
const TERRITORY_ID_FIELDS = [
  "business_unit_ids", "site_ids", "area_ids", "area_kinds",
  "route_ids", "vehicle_ids",
];
// AUTH-CTX-018, section 5: exact, server-resolved subordinate DTOs.
// Shape validation does not prove the provenance or effective authority.
const SUBJECT_FIELDS = [
  "subject_type", "subject_id", "relationship_to_actor", "coherent",
];
const SUBJECT_RELATIONS = new Set([
  "SELF", "OWNED", "ASSIGNED", "RELATED", "THIRD_PARTY", "SYSTEM",
]);
const OWNERSHIP_FIELDS = [
  "owner_type", "owner_id", "actor_relation", "coherent",
];
const OWNER_TYPES = new Set([
  "ACTOR", "EMPLOYEE", "CUSTOMER", "ORGANIZATION", "SITE", "AREA",
  "OTHER", "NONE", "UNKNOWN",
]);
const OWNER_ACTOR_RELATIONS = new Set([
  "SELF", "OWNED", "ASSIGNED", "RELATED", "THIRD_PARTY",
  "NOT_APPLICABLE", "UNRESOLVED",
]);
const TERRITORY_SIDE_FIELDS = [
  "site_id", "area_id", "area_kind", "route_id", "vehicle_id", "coherent",
];
const RESOLVED_SIDE_FIELDS = [
  "side_code", "required", "resource_type", "resource_ids",
  "territory", "resolution_status",
];
const CONCURRENCY_FIELDS = [
  "policy", "expected_version", "idempotency_key", "validated",
];
const CONCURRENCY_POLICIES = new Set([
  "NONE", "EXPECTED_VERSION", "UPDATED_AT", "LOCK", "SNAPSHOT",
  "IDEMPOTENCY_KEY",
]);
// These are caller-supplied authority or outcome hints, not resource locators.
// Do not guess unknown subtype schemas or reject ordinary domain identifiers.
const REQUEST_CONTROL_KEYS = new Set([
  "access_context", "context_id", "authorization_requirement", "grant_ids",
  "deny_ids", "decision_id", "final_outcome", "catalog_hash", "dataset_hashes",
  "expected_outcome", "allow", "can_operate", "bypass", "force_allow",
  "ignore_denies", "skip_resource_resolution", "skip_prerequisites",
]);
// Physical request "mode" values are preserved from AUTH-DB-034. Output
// request_shape has different EXISTING/DRAFT tokens by canonical contract.
const REQUEST_MODES = new Map([
  ["EXISTING_RESOURCE", {
    output: "EXISTING", required: ["mode", "locator"], optional: ["expected_version"],
  }],
  ["RESOURCE_DRAFT", {
    output: "DRAFT", required: ["mode", "draft"], optional: ["idempotency_key"],
  }],
  ["COLLECTION", {
    output: "COLLECTION", required: ["mode", "server_filter"], optional: [],
  }],
  ["AGGREGATE", {
    output: "AGGREGATE", required: ["mode", "server_filter"], optional: [],
  }],
  ["BULK", {
    output: "BULK", required: ["mode", "items"], optional: ["idempotency_key"],
  }],
  ["NON_RESOURCE", {
    output: "NON_RESOURCE", required: ["mode"], optional: [],
  }],
]);
const CATEGORIES = new Set([
  "AUTHORIZED", "STRUCTURAL_DENY", "ACTOR_WIDE_DENY", "LANE_DENY",
  "PREREQUISITE_DENY", "RESOURCE_DENY", "DEVICE_DENY", "SENSITIVITY_DENY",
  "FIELD_POLICY_DENY", "DEFAULT_DENY", "CONTRACT_INVALID",
]);
// AUTH-CTX-024 / AUTH-CTX-026: logical evaluator ID is not backend proof.
const CANONICAL_EVALUATOR_NAME = "vento.authorization.evaluate_authorization";
const FORBIDDEN_EVALUATOR_VERSIONS = new Set([
  "latest", "current", "production", "main", "unknown",
]);
// Currently supported published dataset digest profile (not a trust anchor).
const DATASET_DIGEST = /^sha256:[0-9a-f]{64}$/u;
const text = (v) => typeof v === "string" && v.length > 0;
const nullableText = (v) => v === null || text(v);
const invalid = () => { throw new TypeError("VENTO_AUTH_DECISION:ENVELOPE_INVALID"); };

function exact(value, fields) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) invalid();
  const proto = Object.getPrototypeOf(value);
  if (proto !== null && proto !== Object.prototype) invalid();
  const desc = Object.getOwnPropertyDescriptors(value);
  if (Reflect.ownKeys(desc).length !== fields.length) invalid();
  const result = Object.create(null);
  for (const key of fields) {
    const d = desc[key];
    if (!d || !Object.hasOwn(d, "value") || !d.enumerable) invalid();
    result[key] = d.value;
  }
  return result;
}
function record(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) invalid();
  const proto = Object.getPrototypeOf(value);
  if (proto !== null && proto !== Object.prototype) invalid();
  const desc = Object.getOwnPropertyDescriptors(value);
  for (const key of Reflect.ownKeys(desc)) {
    if (typeof key !== "string" || !Object.hasOwn(desc[key], "value") || !desc[key].enumerable) invalid();
  }
  return Object.fromEntries(Object.entries(desc).map(([key,d]) => [key,d.value]));
}
function array(value, check = () => true) {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) invalid();
  const desc = Object.getOwnPropertyDescriptors(value);
  if (Reflect.ownKeys(desc).length !== value.length + 1) invalid();
  const result = [];
  for (let i = 0; i < value.length; i++) {
    const d = desc[String(i)];
    if (!d || !Object.hasOwn(d, "value") || !d.enumerable || !check(d.value)) invalid();
    result.push(d.value);
  }
  return result;
}
// Opaque resource leaves remain JSON-only until their subtype schemas exist.
// This checks serialized data recursively, not resource semantics or authority.
function jsonData(value, ancestors = new WeakSet()) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid();
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) invalid();
  ancestors.add(value);
  try {
    const children = Array.isArray(value) ? array(value) : Object.values(record(value));
    for (const child of children) jsonData(child, ancestors);
  } finally {
    ancestors.delete(value);
  }
}
function jsonRecord(value) {
  const snapshot = record(value);
  jsonData(value);
  return snapshot;
}
function resourceRequest(input) {
  // Source-only structure: resolver selection and authoritative business
  // checks still belong exclusively to the approved backend resource contract.
  const v = jsonRecord(input);
  const schema = REQUEST_MODES.get(v.mode);
  if (!schema) invalid();
  const permitted = new Set([...schema.required, ...schema.optional]);
  if (schema.required.some((key) => !Object.hasOwn(v, key))
    || Object.keys(v).some((key) =>
      REQUEST_CONTROL_KEYS.has(key) || !permitted.has(key))) invalid();
  if (Object.hasOwn(v, "locator")) {
    if (Object.keys(jsonRecord(v.locator)).length === 0) invalid();
  }
  if (Object.hasOwn(v, "draft")) jsonRecord(v.draft);
  if (Object.hasOwn(v, "server_filter")) jsonRecord(v.server_filter);
  if (Object.hasOwn(v, "items")) {
    const items = array(v.items);
    if (items.length === 0) invalid();
    for (const item of items) {
      if (Object.keys(jsonRecord(item)).length === 0) invalid();
    }
  }
  if (Object.hasOwn(v, "expected_version") && !text(v.expected_version)) invalid();
  if (Object.hasOwn(v, "idempotency_key") && !text(v.idempotency_key)) invalid();
  return schema.output;
}
const textList = (v) => array(v, text);
const laneList = (v) => array(v, (x) => x === "BASE" || x === "OPERATIONAL");
const same = (a,b) => a.length === b.length && a.every((x,i) => x === b[i]);
const sameMembers = (a,b) => a.length === b.length
  && new Set(a).size === a.length && new Set(b).size === b.length
  && a.every((x) => b.includes(x));
function lane(input, laneName) {
  const v = exact(input, LANE);
  if (v.lane !== laneName || !LANE_OUTCOMES.has(v.outcome)
    || !READINESS.has(v.readiness) || typeof v.evaluated !== "boolean") invalid();
  textList(v.matched_allow_ids); textList(v.matched_deny_ids); textList(v.reason_codes);
  if (v.outcome === "ALLOW" && (!v.evaluated || v.readiness !== "READY"
    || v.matched_allow_ids.length === 0 || v.matched_deny_ids.length !== 0)) invalid();
  if (v.outcome === "NOT_APPLICABLE"
    && (v.evaluated || v.readiness !== "NOT_APPLICABLE")) invalid();
  return v;
}
function prerequisite(input) {
  // Snapshot each canonical field without invoking untrusted accessors.
  const v = exact(input, PREREQUISITE_FIELDS);
  if (!PREREQUISITE_TYPES.has(v.prerequisite_type)
    || !PREREQUISITE_LANES.has(v.applies_to_lane)
    || !CONSTRAINT_STATUS.has(v.status)
    || !nullableText(v.reason_code)) invalid();
  return v;
}
function grant(input, permissionKey) {
  // Canonical MatchedGrant: inspect each data descriptor without invoking accessors.
  const v = exact(input, GRANT_FIELDS);
  if (!text(v.grant_id) || GRANT_SOURCE_LANES.get(v.source_kind) !== v.lane
    || !text(v.source_subject_id) || v.permission_key !== permissionKey
    || v.effect !== "ALLOW" || !text(v.scope_code)
    || v.matched_territory !== true || v.matched_resource !== true
    || v.validity_status !== "ACTIVE" || !text(v.source_dataset_id)
    || !text(v.source_dataset_version)) invalid();
  return v;
}
function matchedDeny(input, permissionKey) {
  const v = exact(input, DENY_FIELDS);
  if (!text(v.deny_id) || !DENY_CLASSES.has(v.deny_class)
    || !REASON_LANES.has(v.lane) || v.permission_key !== permissionKey
    || !text(v.source_kind) || typeof v.matched_actor !== "boolean"
    || typeof v.matched_resource !== "boolean"
    || typeof v.matched_territory !== "boolean"
    || typeof v.matched_validity !== "boolean"
    || !text(v.reason_code)
    || (v.deny_class === "BASE_LANE" && v.lane !== "BASE")
    || (v.deny_class === "OPERATIONAL_LANE" && v.lane !== "OPERATIONAL")) invalid();
  return v;
}
function decisionReason(input) {
  const v = exact(input, REASON_FIELDS);
  if (!text(v.reason_code) || !text(v.category)
    || !REASON_SEVERITIES.has(v.severity) || !REASON_LANES.has(v.lane)
    || !text(v.source) || typeof v.safe_to_expose !== "boolean") invalid();
  return v;
}
function resolvedSubject(input) {
  const v = exact(input, SUBJECT_FIELDS);
  if (!text(v.subject_type) || !text(v.subject_id)
    || !SUBJECT_RELATIONS.has(v.relationship_to_actor)
    || typeof v.coherent !== "boolean") invalid();
  return v;
}
function resourceOwnership(input) {
  const v = exact(input, OWNERSHIP_FIELDS);
  if (!OWNER_TYPES.has(v.owner_type) || !nullableText(v.owner_id)
    || !OWNER_ACTOR_RELATIONS.has(v.actor_relation)
    || typeof v.coherent !== "boolean") invalid();
  return v;
}
function territorySide(input) {
  const v = exact(input, TERRITORY_SIDE_FIELDS);
  for (const key of TERRITORY_SIDE_FIELDS.slice(0, 5)) {
    if (!nullableText(v[key])) invalid();
  }
  if (typeof v.coherent !== "boolean") invalid();
  return v;
}
function sortedUnique(values) {
  return new Set(values).size === values.length
    && values.every((x, i) => i === 0 || values[i - 1] < x);
}
function resolvedSide(input) {
  const v = exact(input, RESOLVED_SIDE_FIELDS);
  if (!text(v.side_code) || typeof v.required !== "boolean"
    || !text(v.resource_type)
    || !RESOURCE_STATUSES.has(v.resolution_status)) invalid();
  const ids = textList(v.resource_ids);
  if (!sortedUnique(ids)) invalid();
  if (v.territory !== null) territorySide(v.territory);
  return v;
}
function territory(input) {
  // ResolvedTerritoryContext: validate the stable canonical envelope only.
  const v = exact(input, TERRITORY_FIELDS);
  if (!nullableText(v.organization_id)
    || typeof v.isolated_environment !== "boolean"
    || !text(v.source) || typeof v.coherent !== "boolean") invalid();
  for (const key of TERRITORY_ID_FIELDS) {
    if (!sortedUnique(textList(v[key]))) invalid();
  }
  // TerritorySide fields and nullability are fixed in AUTH-CTX-018.
  if (v.origin !== null) territorySide(v.origin);
  if (v.destination !== null) territorySide(v.destination);
  return v;
}
function concurrency(input) {
  const v = exact(input, CONCURRENCY_FIELDS);
  if (!CONCURRENCY_POLICIES.has(v.policy)
    || !nullableText(v.expected_version)
    || !nullableText(v.idempotency_key)
    || typeof v.validated !== "boolean") invalid();
  return v;
}
function constraint(input) {
  const v = exact(input, ["status", "policy_code", "reason_codes"]);
  if (!CONSTRAINT_STATUS.has(v.status) || !nullableText(v.policy_code)) invalid();
  textList(v.reason_codes);
  return v;
}

/**
 * Fail-closed SOURCE CANDIDATE for the root/identity/consistency ENVELOPE.
 * Returns undefined, never a decision, a boolean permission or a capability.
 * Resource-specific resolver semantics, audit integrity and backend provenance
 * still require the full E5-authorized contract validator and real backend.
 * DO NOT use this preflight for requireAuthorization or any mutation.
 */
export function inspectAuthorizationDecisionEnvelopeV1(input) {
  try {
    const v = exact(input, ROOT);
    if (v.contract_family !== "vento.authorization.response-contracts"
      || v.contract_family_version !== "1.0.0"
      || v.contract_name !== "AuthorizationDecision"
      || v.contract_version !== "1.0.0" || v.schema_version !== "1.0.0"
      || !text(v.decision_id) || !text(v.decided_at)
      || !nullableText(v.correlation_id)) invalid();

    const c = exact(v.access_context_ref, CONTEXT);
    if (!text(c.context_id) || c.context_contract_version !== "1.0.0"
      || !text(c.resolved_at) || !text(c.actor_type)
      || !nullableText(c.actor_id) || !text(c.principal_type)
      || !nullableText(c.principal_id) || !text(c.context_fingerprint)) invalid();

    const r = exact(v.request, REQUEST);
    if (!isAppCode(r.app_code) || !isPermissionKey(r.permission_key)
      || PERMISSION_BY_KEY[r.permission_key]?.app_code !== r.app_code
      || !KINDS.has(r.operation_kind) || !SOURCES.has(r.request_source)) invalid();
    // Six guarded request subtypes; no backend authority is derived here.
    const requestedShape = resourceRequest(r.resource_request);
    const requestedFields = textList(r.requested_fields);
    if (new Set(requestedFields).size !== requestedFields.length
      || requestedFields.some((field) => field.includes("*"))) invalid();

    const p = exact(v.permission_contract, PERMISSION);
    if (!text(p.catalog_id) || !text(p.catalog_version) || !text(p.catalog_hash)
      || p.app_code !== r.app_code || p.permission_key !== r.permission_key
      || !["ACTIVE","INACTIVE","MISSING"].includes(p.permission_status)
      || !REQUIREMENTS.has(p.authorization_requirement)
      || !["N","NOT_APPLICABLE"].includes(p.base_prerequisite)
      || !["T","T+C","NOT_APPLICABLE"].includes(p.operational_prerequisite)
      || typeof p.requires_active_area !== "boolean" || !nullableText(p.device_policy_code)
      || !text(p.sensitivity_class) || !text(p.simulation_policy)
      || !text(p.resource_contract_id)) invalid();
    textList(p.dependency_permission_keys);

    const resource = exact(v.resource, RESOURCE);
    if (!text(resource.resource_type) || !RESOURCE_SHAPES.has(resource.request_shape)
      || resource.request_shape !== requestedShape
      || !RESOURCE_STATUSES.has(resource.resolution_status)
      || !nullableText(resource.resource_version)) invalid();
    const resourceIds = textList(resource.resource_ids);
    if (!sortedUnique(resourceIds)) invalid();
    territory(resource.territory); resourceOwnership(resource.ownership);
    const snapshot = jsonRecord(resource.state_snapshot);
    if (!sortedUnique(Object.keys(snapshot))) invalid();
    const classifications = record(resource.field_classification);
    if (!sortedUnique(Object.keys(classifications))
      || Object.entries(classifications).some(([field, category]) =>
        !text(field) || field.includes("*") || !FIELD_CLASSES.has(category))) invalid();
    const sides = array(resource.required_sides).map(resolvedSide);
    if (!sortedUnique(sides.map((x) => x.side_code))) invalid();
    if (resource.subject !== null) resolvedSubject(resource.subject);
    if (resource.concurrency !== null) concurrency(resource.concurrency);

    const required = laneList(v.required_lanes);
    if (!same(required, REQUIREMENTS.get(p.authorization_requirement))) invalid();
    const base = lane(v.base_decision, "BASE");
    const operational = lane(v.operational_decision, "OPERATIONAL");
    if (!required.includes("BASE") && base.outcome !== "NOT_APPLICABLE") invalid();
    if (!required.includes("OPERATIONAL") && operational.outcome !== "NOT_APPLICABLE") invalid();
    const prerequisites = array(v.prerequisite_decisions).map(prerequisite);
    const device = constraint(v.device_decision);
    const sensitivity = constraint(v.sensitivity_decision);
    const fields = exact(v.field_policy_decision, [
      "status","visible_fields","masked_fields","mutable_fields","blocked_fields","reason_codes",
    ]);
    if (!["PASS","PARTIAL","FAIL"].includes(fields.status)) invalid();
    for (const key of ["visible_fields","masked_fields","mutable_fields","blocked_fields","reason_codes"]) {
      const values = textList(fields[key]);
      if (new Set(values).size !== values.length
        || (key !== "reason_codes" && values.some((field) => field.includes("*")))) invalid();
    }
    // One output field cannot be both exposed and masked, or mutable and blocked.
    if (fields.visible_fields.some((field) => fields.masked_fields.includes(field))
      || fields.mutable_fields.some((field) => fields.blocked_fields.includes(field))) invalid();
    const allows = array(v.matched_allows).map((x) => grant(x, r.permission_key));
    if (new Set(allows.map((x) => x.grant_id)).size !== allows.length
      || !sameMembers(textList(base.matched_allow_ids),
        allows.filter((x) => x.lane === "BASE").map((x) => x.grant_id))
      || !sameMembers(textList(operational.matched_allow_ids),
        allows.filter((x) => x.lane === "OPERATIONAL").map((x) => x.grant_id))) invalid();
    const denies = array(v.matched_denies).map((x) => matchedDeny(x, r.permission_key));
    if (new Set(denies.map((x) => x.deny_id)).size !== denies.length) invalid();
    // Lane references must resolve to real, appropriately scoped evidence.
    // Global denies may apply to both lanes but cannot be invented locally.
    const denyById = new Map(denies.map((x) => [x.deny_id, x]));
    for (const [name, decision] of [["BASE", base], ["OPERATIONAL", operational]]) {
      const ids = textList(decision.matched_deny_ids);
      if (new Set(ids).size !== ids.length) invalid();
      for (const id of ids) {
        const evidence = denyById.get(id);
        if (!evidence || (evidence.lane !== name
          && evidence.lane !== "ALL" && evidence.lane !== null)) invalid();
      }
    }
    if (denies.some((x) =>
      (x.deny_class === "BASE_LANE" && !base.matched_deny_ids.includes(x.deny_id))
      || (x.deny_class === "OPERATIONAL_LANE"
        && !operational.matched_deny_ids.includes(x.deny_id)))) invalid();
    const blocked = ["structural_denies","actor_wide_denies","lane_denies","blocked_reasons"]
      .map((k) => array(v[k]).map(decisionReason));

    const combination = exact(v.combination, COMBINATION);
    const authorizing = laneList(combination.authorizing_lanes);
    const blockedLanes = laneList(combination.blocked_lanes);
    if (combination.authorization_requirement !== p.authorization_requirement
      || combination.base_outcome !== base.outcome
      || combination.operational_outcome !== operational.outcome
      || !REQUIREMENTS.has(combination.combination_rule === "BASE" ? "BASE_ONLY"
        : combination.combination_rule === "OPERATIONAL" ? "OPERATIONAL_ONLY"
        : combination.combination_rule)
      || !["ALLOW","DENY"].includes(combination.combination_result)) invalid();
    const expectedRule = p.authorization_requirement === "BASE_ONLY" ? "BASE"
      : p.authorization_requirement === "OPERATIONAL_ONLY" ? "OPERATIONAL"
      : p.authorization_requirement;
    if (combination.combination_rule !== expectedRule) invalid();
    if (new Set(authorizing).size !== authorizing.length || new Set(blockedLanes).size !== blockedLanes.length) invalid();
    const expectedBlocked = required.filter((name) =>
      (name === "BASE" ? base : operational).outcome === "DENY");
    if (!sameMembers(blockedLanes, expectedBlocked)) invalid();
    const baseAllow = base.outcome === "ALLOW";
    const opAllow = operational.outcome === "ALLOW";
    const modeAllow = p.authorization_requirement === "BASE_ONLY" ? baseAllow
      : p.authorization_requirement === "OPERATIONAL_ONLY" ? opAllow
      : p.authorization_requirement === "BASE_OR_OPERATIONAL" ? (baseAllow || opAllow)
      : (baseAllow && opAllow);
    if ((combination.combination_result === "ALLOW") !== modeAllow) invalid();
    if (authorizing.some((x) => (x === "BASE" ? !baseAllow : !opAllow))) invalid();
    if (combination.combination_result === "ALLOW"
      && (authorizing.length === 0
        || (p.authorization_requirement === "BASE_AND_OPERATIONAL"
          && !sameMembers(authorizing, ["BASE", "OPERATIONAL"])))) invalid();

    const final = exact(v.final_decision, FINAL);
    const finalLanes = laneList(final.authorizing_lanes);
    // AUTH-CTX-002: a lane-level ALLOW may still end in final DENY due to
    // request-level constraints. A lane DENY must never become final ALLOW.
    if (!["ALLOW", "DENY"].includes(final.outcome)
      || (final.outcome === "ALLOW" && combination.combination_result !== "ALLOW")
      || !CATEGORIES.has(final.reason_category)
      || !text(final.primary_reason_code) || !text(final.safe_message_code)
      || !same(finalLanes, final.outcome === "ALLOW" ? authorizing : [])) invalid();
    if (final.outcome === "ALLOW") {
      // A complete BASE_OR_OPERATIONAL lane can win even when its alternative
      // is denied. Structural/actor-wide and request-global denies still win.
      const isOr = p.authorization_requirement === "BASE_OR_OPERATIONAL";
      const deniedLanes = required.filter((name) =>
        (name === "BASE" ? base : operational).outcome === "DENY");
      const isDeniedAlternative = (name) =>
        isOr && deniedLanes.includes(name) && !authorizing.includes(name);
      const foreignLaneDeny = denies.some((x) =>
        !["BASE_LANE", "OPERATIONAL_LANE"].includes(x.deny_class)
        || !isDeniedAlternative(x.lane));
      if (final.reason_category !== "AUTHORIZED"
        || final.primary_reason_code !== "AUTHORIZED"
        || final.safe_message_code !== "AUTHORIZATION_GRANTED"
        || authorizing.length === 0
        || allows.length === 0 || blocked[0].length !== 0
        || blocked[1].length !== 0 || foreignLaneDeny
        || blocked[2].some((x) => !isDeniedAlternative(x.lane))
        || blocked[3].length !== 0
        || !["RESOLVED","MULTI_RESOLVED","NOT_APPLICABLE"].includes(resource.resolution_status)
        // AUTH-CTX-018: inconsistent/isolated resources and mandatory
        // unresolved sides cannot produce a valid ALLOW envelope.
        || !resource.territory.coherent || resource.territory.isolated_environment
        || (resource.subject !== null && !resource.subject.coherent)
        // OWN is only a coherent ownership-scoped grant; the real actor
        // relation and resource authority still require the backend evaluator.
        || allows.some((grant) => authorizing.includes(grant.lane)
          && grant.scope_code === "OWN" && !resource.ownership.coherent)
        || [resource.territory.origin, resource.territory.destination]
          .some((side) => side !== null && !side.coherent)
        || sides.some((side) => side.required
          && (!["RESOLVED", "MULTI_RESOLVED"].includes(side.resolution_status)
            || (side.territory !== null && !side.territory.coherent)))
        || (resource.concurrency !== null
          && resource.concurrency.policy !== "NONE" && !resource.concurrency.validated)
        // Unknown requested fields may be preserved in a DENY audit, but
        // must not be represented as safely authorized in an ALLOW result.
        || requestedFields.some((field) => !Object.hasOwn(classifications, field))
        || ["visible_fields", "masked_fields", "mutable_fields"].some((key) =>
          fields[key].some((field) => !Object.hasOwn(classifications, field)))
        || p.permission_status !== "ACTIVE"
        || prerequisites.some((x) => x.status === "FAIL")
        || device.status === "FAIL" || sensitivity.status === "FAIL"
        || fields.status === "FAIL") invalid();
      if (fields.status === "PARTIAL" && !["READ","APP_ACCESS"].includes(r.operation_kind)) invalid();
      for (const name of authorizing) {
        const candidate = name === "BASE" ? base : operational;
        if (candidate.outcome !== "ALLOW") invalid();
      }
    } else {
      // AUTH-CTX-023 §§21,35: final DENY clears authority but retains
      // blocking reasons; earlier positive lane evidence stays in combination.
      if (final.reason_category === "AUTHORIZED"
        || final.primary_reason_code === "AUTHORIZED"
        || final.safe_message_code === "AUTHORIZATION_GRANTED"
        || blocked[3].length === 0
        || blocked[3].some((reason) => reason.severity !== "BLOCKING")
        || !blocked[3].some((reason) =>
          reason.reason_code === final.primary_reason_code)) invalid();
    }

    const audit = exact(v.audit, AUDIT);
    if (audit.decision_id !== v.decision_id || audit.correlation_id !== v.correlation_id
      || audit.actor_id !== c.actor_id || audit.principal_id !== c.principal_id
      || !nullableText(audit.device_id)
      || audit.app_code !== r.app_code || audit.permission_key !== r.permission_key
      || audit.resource_type !== resource.resource_type
      || !same(textList(audit.resource_ids), resourceIds)
      || audit.outcome !== final.outcome
      || !same(laneList(audit.authorizing_lanes), authorizing)
      || audit.context_fingerprint !== c.context_fingerprint
      || !text(audit.resource_fingerprint)
      || audit.catalog_hash !== p.catalog_hash
      || audit.evaluator_name !== CANONICAL_EVALUATOR_NAME
      || !text(audit.evaluator_version)
      || audit.evaluator_version.trim() !== audit.evaluator_version
      || FORBIDDEN_EVALUATOR_VERSIONS.has(audit.evaluator_version.toLowerCase())) invalid();
    const datasetHashes = record(audit.dataset_hashes);
    const datasetKeys = Object.keys(datasetHashes);
    if (!sortedUnique(datasetKeys)
      || datasetKeys.some((key) => {
        const separator = key.lastIndexOf("@");
        return separator <= 0 || separator === key.length - 1
          || key.indexOf("@") !== separator
          || key.trim() !== key
          || !DATASET_DIGEST.test(datasetHashes[key]);
      })
      // AUTH-CTX-024 §42: every matched grant must be traceable to its
      // exact source dataset/version. Hash presence is not authenticity.
      || allows.some((grant) => !Object.hasOwn(datasetHashes,
        `${grant.source_dataset_id}@${grant.source_dataset_version}`))) invalid();
    // Intentionally NO return of decision, outcome, ALLOW flag, or capability.
    return undefined;
  } catch {
    invalid();
  }
}
