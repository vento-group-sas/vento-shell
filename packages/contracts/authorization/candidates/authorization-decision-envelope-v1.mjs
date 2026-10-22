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
const CONCURRENCY_FIELDS = [
  "policy", "expected_version", "idempotency_key", "validated",
];
const CONCURRENCY_POLICIES = new Set([
  "NONE", "EXPECTED_VERSION", "UPDATED_AT", "LOCK", "SNAPSHOT",
  "IDEMPOTENCY_KEY",
]);
const CATEGORIES = new Set([
  "AUTHORIZED", "STRUCTURAL_DENY", "ACTOR_WIDE_DENY", "LANE_DENY",
  "PREREQUISITE_DENY", "RESOURCE_DENY", "DEVICE_DENY", "SENSITIVITY_DENY",
  "FIELD_POLICY_DENY", "DEFAULT_DENY", "CONTRACT_INVALID",
]);
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
  record(value);
  jsonData(value);
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
function territory(input) {
  // ResolvedTerritoryContext: validate the stable canonical envelope only.
  const v = exact(input, TERRITORY_FIELDS);
  if (!nullableText(v.organization_id)
    || typeof v.isolated_environment !== "boolean"
    || !text(v.source) || typeof v.coherent !== "boolean") invalid();
  for (const key of TERRITORY_ID_FIELDS) textList(v[key]);
  // TerritorySide subtypes need their dedicated resource contracts.
  if (v.origin !== null) jsonRecord(v.origin);
  if (v.destination !== null) jsonRecord(v.destination);
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
 * Resource subtypes, grants, denials, audit integrity and backend provenance
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
    // ResourceRequest subtypes are not yet published: enforce safe JSON only.
    jsonRecord(r.resource_request);
    textList(r.requested_fields);

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
      || !RESOURCE_STATUSES.has(resource.resolution_status)
      || !nullableText(resource.resource_version)) invalid();
    const resourceIds = textList(resource.resource_ids);
    territory(resource.territory); jsonRecord(resource.ownership);
    jsonRecord(resource.state_snapshot);
    const classifications = record(resource.field_classification);
    if (!Object.values(classifications).every(text)) invalid();
    // Side and subject subtypes remain opaque until their owned schemas exist.
    array(resource.required_sides).forEach(jsonRecord);
    if (resource.subject !== null) jsonRecord(resource.subject);
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
      textList(fields[key]);
    }
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
      || !same(finalLanes, authorizing)) invalid();
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
      if (final.reason_category !== "AUTHORIZED" || authorizing.length === 0
        || allows.length === 0 || blocked[0].length !== 0
        || blocked[1].length !== 0 || foreignLaneDeny
        || blocked[2].some((x) => !isDeniedAlternative(x.lane))
        || blocked[3].some((x) =>
          x.severity === "BLOCKING" && !isDeniedAlternative(x.lane))
        || !["RESOLVED","MULTI_RESOLVED","NOT_APPLICABLE"].includes(resource.resolution_status)
        || p.permission_status !== "ACTIVE"
        || prerequisites.some((x) => x.status === "FAIL")
        || device.status === "FAIL" || sensitivity.status === "FAIL"
        || fields.status === "FAIL") invalid();
      if (fields.status === "PARTIAL" && !["READ","APP_ACCESS"].includes(r.operation_kind)) invalid();
      for (const name of authorizing) {
        const candidate = name === "BASE" ? base : operational;
        if (candidate.outcome !== "ALLOW") invalid();
      }
    } else if (final.reason_category === "AUTHORIZED") invalid();

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
      || !text(audit.evaluator_name) || !text(audit.evaluator_version)) invalid();
    const datasetHashes = record(audit.dataset_hashes);
    if (!Object.values(datasetHashes).every(text)) invalid();
    // Intentionally NO return of decision, outcome, ALLOW flag, or capability.
    return undefined;
  } catch {
    invalid();
  }
}
