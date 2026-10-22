import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inspectAuthorizationDecisionEnvelopeV1 as inspect } from "./authorization-decision-envelope-v1.mjs";

function denied() {
  const id = "decision:synthetic";
  const fingerprint = "synthetic-context-fingerprint";
  return {
    contract_family: "vento.authorization.response-contracts",
    contract_family_version: "1.0.0",
    contract_name: "AuthorizationDecision",
    contract_version: "1.0.0",
    schema_version: "1.0.0",
    decision_id: id,
    decided_at: "2026-10-22T10:30:00+00:00",
    correlation_id: "trace:synthetic",
    access_context_ref: {
      context_id: "context:synthetic",
      context_contract_version: "1.0.0",
      resolved_at: "2026-10-22T10:29:59+00:00",
      actor_type: "EMPLOYEE",
      actor_id: "synthetic-actor",
      principal_type: "HUMAN_USER",
      principal_id: "synthetic-principal",
      context_fingerprint: fingerprint,
    },
    request: {
      app_code: "shell",
      permission_key: "shell.access",
      operation_kind: "APP_ACCESS",
      resource_request: { kind: "NON_RESOURCE" },
      requested_fields: [],
      request_source: "SERVER_ACTION",
    },
    permission_contract: {
      catalog_id: "catalog:synthetic",
      catalog_version: "1.0.0",
      catalog_hash: "cataloghash:synthetic",
      app_code: "shell",
      permission_key: "shell.access",
      permission_status: "ACTIVE",
      authorization_requirement: "BASE_ONLY",
      base_prerequisite: "N",
      operational_prerequisite: "NOT_APPLICABLE",
      requires_active_area: false,
      device_policy_code: null,
      sensitivity_class: "STANDARD",
      simulation_policy: "DISABLED",
      resource_contract_id: "nonresource:synthetic",
      dependency_permission_keys: [],
    },
    resource: {
      resource_type: "application",
      request_shape: "NON_RESOURCE",
      resolution_status: "NOT_APPLICABLE",
      resource_ids: [],
      resource_version: null,
      subject: null,
      territory: {
        organization_id: null,
        business_unit_ids: [],
        site_ids: [],
        area_ids: [],
        area_kinds: [],
        origin: null,
        destination: null,
        route_ids: [],
        vehicle_ids: [],
        isolated_environment: false,
        source: "synthetic-non-resource",
        coherent: true,
      },
      ownership: {},
      required_sides: [],
      state_snapshot: {},
      field_classification: {},
      concurrency: null,
    },
    required_lanes: ["BASE"],
    base_decision: {
      lane: "BASE",
      outcome: "DENY",
      readiness: "READY",
      evaluated: true,
      matched_allow_ids: [],
      matched_deny_ids: [],
      reason_codes: ["AUTH_DENIED"],
    },
    operational_decision: {
      lane: "OPERATIONAL",
      outcome: "NOT_APPLICABLE",
      readiness: "NOT_APPLICABLE",
      evaluated: false,
      matched_allow_ids: [],
      matched_deny_ids: [],
      reason_codes: [],
    },
    prerequisite_decisions: [],
    device_decision: { status: "NOT_APPLICABLE", policy_code: null, reason_codes: [] },
    sensitivity_decision: { status: "NOT_APPLICABLE", policy_code: null, reason_codes: [] },
    field_policy_decision: {
      status: "PASS", visible_fields: [], masked_fields: [],
      mutable_fields: [], blocked_fields: [], reason_codes: [],
    },
    matched_allows: [],
    matched_denies: [],
    structural_denies: [],
    actor_wide_denies: [],
    lane_denies: [],
    blocked_reasons: [],
    combination: {
      authorization_requirement: "BASE_ONLY",
      base_outcome: "DENY",
      operational_outcome: "NOT_APPLICABLE",
      authorizing_lanes: [],
      blocked_lanes: ["BASE"],
      combination_rule: "BASE",
      combination_result: "DENY",
    },
    final_decision: {
      outcome: "DENY", reason_category: "DEFAULT_DENY",
      primary_reason_code: "AUTH_DENIED",
      authorizing_lanes: [],
      safe_message_code: "AUTH_APP_ACCESS_DENIED",
    },
    audit: {
      decision_id: id,
      correlation_id: "trace:synthetic",
      actor_id: "synthetic-actor",
      principal_id: "synthetic-principal",
      device_id: null,
      app_code: "shell",
      permission_key: "shell.access",
      resource_type: "application",
      resource_ids: [],
      outcome: "DENY",
      authorizing_lanes: [],
      context_fingerprint: fingerprint,
      resource_fingerprint: "synthetic-resource-fingerprint",
      catalog_hash: "cataloghash:synthetic",
      dataset_hashes: {},
      evaluator_name: "synthetic-fixture",
      evaluator_version: "1.0.0",
    },
  };
}
function allowed() {
  const d = denied();
  d.base_decision.outcome = "ALLOW";
  d.base_decision.reason_codes = [];
  d.base_decision.matched_allow_ids = ["grant:synthetic"];
  d.matched_allows = [{
    grant_id: "grant:synthetic",
    lane: "BASE",
    source_kind: "BASE_ROLE",
    source_subject_id: "synthetic-subject",
    permission_key: "shell.access",
    effect: "ALLOW",
    scope_code: "GLOBAL",
    matched_territory: true,
    matched_resource: true,
    validity_status: "ACTIVE",
    source_dataset_id: "synthetic-dataset",
    source_dataset_version: "1.0.0",
  }];
  d.combination.base_outcome = "ALLOW";
  d.combination.authorizing_lanes = ["BASE"];
  d.combination.blocked_lanes = [];
  d.combination.combination_result = "ALLOW";
  d.final_decision.outcome = "ALLOW";
  d.final_decision.reason_category = "AUTHORIZED";
  d.final_decision.authorizing_lanes = ["BASE"];
  d.audit.outcome = "ALLOW";
  d.audit.authorizing_lanes = ["BASE"];
  return d;
}
function bothAllowed() {
  const d = allowed();
  const operationalGrant = {
    ...d.matched_allows[0],
    grant_id: "grant:operational",
    lane: "OPERATIONAL",
    source_kind: "OPERATIONAL_ROLE",
  };
  d.matched_allows.push(operationalGrant);
  d.permission_contract.authorization_requirement = "BASE_AND_OPERATIONAL";
  d.required_lanes = ["BASE", "OPERATIONAL"];
  d.operational_decision = {
    lane: "OPERATIONAL", outcome: "ALLOW", readiness: "READY",
    evaluated: true, matched_allow_ids: [operationalGrant.grant_id],
    matched_deny_ids: [], reason_codes: [],
  };
  d.combination.authorization_requirement = "BASE_AND_OPERATIONAL";
  d.combination.operational_outcome = "ALLOW";
  d.combination.combination_rule = "BASE_AND_OPERATIONAL";
  d.combination.authorizing_lanes = ["BASE", "OPERATIONAL"];
  d.final_decision.authorizing_lanes = ["BASE", "OPERATIONAL"];
  d.audit.authorizing_lanes = ["BASE", "OPERATIONAL"];
  return d;
}
function deniedAlternative(laneName) {
  const d = bothAllowed();
  const otherLane = laneName === "BASE" ? "OPERATIONAL" : "BASE";
  const rejectedLane = laneName === "BASE" ? d.base_decision : d.operational_decision;
  const evidence = syntheticMatchedDeny();
  evidence.deny_id = "deny:" + laneName.toLowerCase();
  evidence.deny_class = laneName === "BASE" ? "BASE_LANE" : "OPERATIONAL_LANE";
  evidence.lane = laneName;
  rejectedLane.outcome = "DENY";
  rejectedLane.matched_allow_ids = [];
  rejectedLane.matched_deny_ids = [evidence.deny_id];
  rejectedLane.reason_codes = ["AUTH_DENIED"];
  d.matched_allows = d.matched_allows.filter((x) => x.lane === otherLane);
  d.matched_denies = [evidence];
  d.lane_denies = [{ ...syntheticBlockingReason(), lane: laneName }];
  d.blocked_reasons = [{ ...syntheticBlockingReason(), lane: laneName }];
  d.permission_contract.authorization_requirement = "BASE_OR_OPERATIONAL";
  d.combination.authorization_requirement = "BASE_OR_OPERATIONAL";
  d.combination.combination_rule = "BASE_OR_OPERATIONAL";
  d.combination.base_outcome = d.base_decision.outcome;
  d.combination.operational_outcome = d.operational_decision.outcome;
  d.combination.authorizing_lanes = [otherLane];
  d.combination.blocked_lanes = [laneName];
  d.final_decision.authorizing_lanes = [otherLane];
  d.audit.authorizing_lanes = [otherLane];
  return d;
}
function syntheticMatchedDeny() {
  return {
    deny_id: "deny:synthetic", deny_class: "BASE_LANE",
    lane: "BASE", permission_key: "shell.access",
    source_kind: "SYNTHETIC_DENY", matched_actor: true,
    matched_resource: true, matched_territory: true,
    matched_validity: true, reason_code: "AUTH_DENIED",
  };
}
function syntheticBlockingReason() {
  return {
    reason_code: "AUTH_DENIED", category: "DENIAL",
    severity: "BLOCKING", lane: "BASE", source: "synthetic-test",
    safe_to_expose: false,
  };
}
function failedPrerequisite() {
  return {
    prerequisite_type: "RESOURCE_STATE",
    applies_to_lane: "REQUEST",
    status: "FAIL",
    reason_code: "AUTH_DENIED",
  };
}
function fail(input) {
  assert.throws(() => inspect(input), {
    name: "TypeError", message: "VENTO_AUTH_DECISION:ENVELOPE_INVALID",
  });
}

test("unit: structured DENY envelope passes without returning authorization data", () => {
  const f = denied();
  assert.equal(inspect(f), undefined);
  assert.equal(f.final_decision.outcome, "DENY");
});

test("unit: structurally consistent ALLOW envelope still returns no authority", () => {
  const f = allowed();
  assert.equal(inspect(f), undefined);
  assert.equal(inspect(f) === true, false);
});

test("contractual: exact five metadata identifiers, no version downgrade", () => {
  for (const key of ["contract_family","contract_family_version","contract_name","contract_version","schema_version"]) {
    const d = denied(); d[key] = "legacy"; fail(d);
  }
  for (const key of ["decision_id","decided_at"]) {
    const d = denied(); d[key] = null; fail(d);
  }
});

test("contractual: all root fields are required and no new root authority accepted", () => {
  for (const key of Object.keys(denied())) {
    const d = denied(); delete d[key]; fail(d);
  }
  fail({ ...denied(), bypass_applied: true });
  fail({ ...denied(), can_operate: true });
});

test("contractual: request and permission belong to same canonical app and permission", () => {
  for (const [key, value] of [
    ["app_code", "anima"], ["app_code", "SHELL"], ["permission_key", "anima.access"],
    ["permission_key", "shell.*"], ["permission_key", "shell.access "],
  ]) {
    const d = denied(); d.request[key] = value; fail(d);
  }
  const d = denied(); d.permission_contract.app_code = "anima"; fail(d);
  const d2 = denied(); d2.permission_contract.permission_key = "anima.access"; fail(d2);
});

test("contractual: no actor, role, bypass, or outcome in request", () => {
  for (const [key,value] of [
    ["actor_id","fake"],["base_role","admin"],["can_operate",true],
    ["final_decision", { outcome: "ALLOW" }],
  ]) {
    const d = denied(); d.request[key] = value; fail(d);
  }
});

test("contractual: no invalid operation or request source", () => {
  for (const value of ["ADMIN", "GRANT", "read", true, null]) {
    const d = denied(); d.request.operation_kind = value; fail(d);
  }
  for (const value of ["BROWSER", "REPLAY", null, false]) {
    const d = denied(); d.request.request_source = value; fail(d);
  }
});

test("contractual: actor context fingerprint and version cannot be fabricated from root", () => {
  for (const field of ["context_id","context_contract_version","resolved_at","context_fingerprint"]) {
    const d = denied(); d.access_context_ref[field] = null; fail(d);
  }
  const d = denied(); d.access_context_ref.actor_id = true; fail(d);
});

test("contractual: resource-resolution shape and status are closed", () => {
  for (const val of ["MISSING", "ALLOW", "OVERRIDE", null]) {
    const d = denied(); d.resource.resolution_status = val; fail(d);
    const other = denied(); other.resource.request_shape = val; fail(other);
  }
  const d = denied(); d.resource.resource_ids = ["site1", 3]; fail(d);
});

test("contractual: required lanes are derived from the permission modality", () => {
  const d = denied(); d.required_lanes = ["BASE","OPERATIONAL"]; fail(d);
  const d2 = denied(); d2.permission_contract.authorization_requirement = "INVALID"; fail(d2);
  const d3 = denied(); d3.combination.authorization_requirement = "OPERATIONAL_ONLY"; fail(d3);
});

test("contractual: lane outcomes cannot claim ALLOW without readiness and evidence", () => {
  const d = allowed(); d.base_decision.readiness = "UNAVAILABLE"; fail(d);
  const d2 = allowed(); d2.base_decision.matched_allow_ids = []; fail(d2);
  const d3 = allowed(); d3.base_decision.matched_deny_ids = ["deny"]; fail(d3);
  const d4 = allowed(); d4.operational_decision.outcome = "ALLOW"; fail(d4);
});

test("contractual: inconsistent combination or final audit is rejected", () => {
  const d = denied(); d.combination.combination_result = "ALLOW"; fail(d);
  const d2 = allowed(); d2.combination.combination_result = "DENY"; fail(d2);
  const d3 = allowed(); d3.final_decision.outcome = "DENY"; fail(d3); // audit still says ALLOW
  const d4 = allowed(); d4.final_decision.reason_category = "DEFAULT_DENY"; fail(d4);
});

test("contractual: combination ALLOW can finish DENY when a downstream constraint blocks", () => {
  for (const [category, block] of [
    ["DEVICE_DENY", (d) => { d.device_decision.status = "FAIL"; }],
    ["SENSITIVITY_DENY", (d) => { d.sensitivity_decision.status = "FAIL"; }],
    ["FIELD_POLICY_DENY", (d) => { d.field_policy_decision.status = "FAIL"; }],
    ["RESOURCE_DENY", (d) => { d.resource.resolution_status = "CONFLICT"; }],
    ["PREREQUISITE_DENY", (d) => { d.prerequisite_decisions = [failedPrerequisite()]; }],
  ]) {
    const d = allowed();
    block(d);
    d.final_decision.outcome = "DENY";
    d.final_decision.reason_category = category;
    d.audit.outcome = "DENY";
    assert.equal(d.combination.combination_result, "ALLOW");
    assert.equal(inspect(d), undefined); // inspection never grants authority
  }
});

test("security: a lane DENY cannot be promoted to final ALLOW", () => {
  const d = denied();
  d.final_decision.outcome = "ALLOW";
  d.final_decision.reason_category = "AUTHORIZED";
  d.audit.outcome = "ALLOW";
  fail(d);
  const d2 = denied();
  d2.final_decision.outcome = "UNRECOGNIZED";
  d2.audit.outcome = "UNRECOGNIZED";
  fail(d2);
});

test("security: structurally impossible ALLOW cannot override any explicit blocking evidence", () => {
  for (const field of ["structural_denies","actor_wide_denies","lane_denies","blocked_reasons","matched_denies"]) {
    const d = allowed();
    d[field] = [field === "matched_denies" ? syntheticMatchedDeny() : syntheticBlockingReason()];
    fail(d);
  }
});

test("security: no ALLOW for unresolved resources or inactive permission", () => {
  for (const status of ["UNRESOLVED","CONFLICT","ISOLATED"]) {
    const d = allowed(); d.resource.resolution_status = status; fail(d);
  }
  for (const status of ["INACTIVE","MISSING"]) {
    const d = allowed(); d.permission_contract.permission_status = status; fail(d);
  }
});

test("security: failed device, sensitivity, field policy or prereq cannot pass an ALLOW", () => {
  for (const field of ["device_decision","sensitivity_decision"]) {
    const d = allowed(); d[field].status = "FAIL"; fail(d);
  }
  const d = allowed(); d.field_policy_decision.status = "FAIL"; fail(d);
  const d2 = allowed(); d2.prerequisite_decisions = [failedPrerequisite()]; fail(d2);
});

test("security: a partial field projection cannot silently grant a mutation", () => {
  const d = allowed(); d.field_policy_decision.status = "PARTIAL";
  d.request.operation_kind = "UPDATE";
  fail(d);
});

test("security: DENY and ALLOW cannot exchange final reason categories", () => {
  const d = denied(); d.final_decision.reason_category = "AUTHORIZED"; fail(d);
  const d2 = allowed(); d2.final_decision.reason_category = "STRUCTURAL_DENY"; fail(d2);
});

test("security: no replay across decision id, context id, audit identity or version", () => {
  const d = allowed(); d.audit.decision_id = "other"; fail(d);
  const d2 = allowed(); d2.audit.context_fingerprint = "other"; fail(d2);
  const d3 = allowed(); d3.audit.catalog_hash = "other"; fail(d3);
  const d4 = allowed(); d4.audit.permission_key = "anima.access"; fail(d4);
});

test("security: correlation is an audit handle, not authority", () => {
  const d = denied(); d.correlation_id = null; d.audit.correlation_id = null;
  assert.equal(inspect(d), undefined);
  const d2 = allowed(); d2.correlation_id = "untrusted";
  fail(d2);
});

test("contractual: prerequisites require four canonical fields and closed codes", () => {
  const valid = denied();
  valid.prerequisite_decisions = [failedPrerequisite()];
  assert.equal(inspect(valid), undefined);
  const nullProto = denied();
  nullProto.prerequisite_decisions = [Object.assign(Object.create(null), failedPrerequisite())];
  assert.equal(inspect(nullProto), undefined);
  for (const bad of [
    { status: "FAIL" },
    { ...failedPrerequisite(), prerequisite_type: "UNKNOWN" },
    { ...failedPrerequisite(), applies_to_lane: "ALL" },
    { ...failedPrerequisite(), status: "ALLOW" },
    { ...failedPrerequisite(), reason_code: 1 },
    { ...failedPrerequisite(), can_operate: true },
    { ...failedPrerequisite(), reason_code: undefined },
  ]) {
    const d = denied();
    d.prerequisite_decisions = [bad];
    fail(d);
  }
});

test("security: prerequisite getters cannot run even for status", () => {
  let invoked = 0;
  for (const field of ["prerequisite_type", "applies_to_lane", "status", "reason_code"]) {
    const d = denied();
    const payload = failedPrerequisite();
    Object.defineProperty(payload, field, {
      enumerable: true,
      get() { invoked += 1; throw new Error("GETTER_MUST_NOT_RUN"); },
    });
    d.prerequisite_decisions = [payload];
    fail(d);
  }
  assert.equal(invoked, 0);
});

test("contractual: matched grants have canonical fields and real lane/permission linkage", () => {
  assert.equal(inspect(allowed()), undefined);
  for (const [key, value] of [
    ["source_kind", "INVALID"],
    ["source_kind", "OPERATIONAL_ROLE"],
    ["lane", "OPERATIONAL"],
    ["permission_key", "anima.access"],
    ["effect", "DENY"],
    ["matched_territory", false],
    ["matched_resource", false],
    ["validity_status", "EXPIRED"],
    ["scope_code", ""],
    ["source_dataset_version", null],
  ]) {
    const d = allowed();
    d.matched_allows[0][key] = value;
    fail(d);
  }
  const missing = allowed();
  delete missing.matched_allows[0].source_dataset_id;
  fail(missing);
  const extra = allowed();
  extra.matched_allows[0].bypass_applied = true;
  fail(extra);
});

test("security: grant IDs cannot be fabricated, duplicated or read through getters", () => {
  const substituted = allowed();
  substituted.base_decision.matched_allow_ids = ["different-grant"];
  fail(substituted);
  const absent = allowed();
  absent.matched_allows = [];
  fail(absent);
  const duplicate = allowed();
  duplicate.matched_allows.push({ ...duplicate.matched_allows[0] });
  fail(duplicate);
  let invoked = 0;
  for (const field of ["grant_id", "lane", "permission_key", "effect"]) {
    const d = allowed();
    Object.defineProperty(d.matched_allows[0], field, {
      enumerable: true,
      get() { invoked += 1; throw new Error("GRANT_GETTER_MUST_NOT_RUN"); },
    });
    fail(d);
  }
  assert.equal(invoked, 0);
});

test("contractual: AND requires both authorizing lanes; OR may use either", () => {
  const valid = bothAllowed();
  assert.equal(inspect(valid), undefined);
  for (const list of [["BASE"], ["OPERATIONAL"], []]) {
    const d = bothAllowed();
    d.combination.authorizing_lanes = [...list];
    d.final_decision.authorizing_lanes = [...list];
    d.audit.authorizing_lanes = [...list];
    fail(d);
  }
  const or = allowed();
  or.permission_contract.authorization_requirement = "BASE_OR_OPERATIONAL";
  or.required_lanes = ["BASE", "OPERATIONAL"];
  or.combination.authorization_requirement = "BASE_OR_OPERATIONAL";
  or.combination.combination_rule = "BASE_OR_OPERATIONAL";
  assert.equal(inspect(or), undefined);
  const noLane = allowed();
  noLane.combination.authorizing_lanes = [];
  noLane.final_decision.authorizing_lanes = [];
  noLane.audit.authorizing_lanes = [];
  fail(noLane);
});

test("contractual: matched denies and decision reasons preserve canonical shapes", () => {
  const valid = denied();
  valid.matched_denies = [syntheticMatchedDeny()];
  valid.base_decision.matched_deny_ids = ["deny:synthetic"];
  valid.lane_denies = [syntheticBlockingReason()];
  assert.equal(inspect(valid), undefined);
  for (const [field, value] of [
    ["deny_class", "ELEVATE"],
    ["lane", "ALL"],
    ["permission_key", "anima.access"],
    ["matched_actor", "true"],
    ["source_kind", null],
    ["reason_code", ""],
  ]) {
    const d = denied();
    d.matched_denies = [{ ...syntheticMatchedDeny(), [field]: value }];
    fail(d);
  }
  for (const [field, value] of [
    ["severity", "ALLOW"],
    ["lane", "ROOT"],
    ["safe_to_expose", "yes"],
    ["source", ""],
  ]) {
    const d = denied();
    d.blocked_reasons = [{ ...syntheticBlockingReason(), [field]: value }];
    fail(d);
  }
  const extra = denied();
  extra.matched_denies = [{ ...syntheticMatchedDeny(), bypass_applied: true }];
  fail(extra);
  const duplicated = denied();
  duplicated.matched_denies = [syntheticMatchedDeny(), syntheticMatchedDeny()];
  fail(duplicated);
  const missing = denied();
  const incomplete = syntheticBlockingReason();
  delete incomplete.category;
  missing.blocked_reasons = [incomplete];
  fail(missing);
});

test("security: deny and reason getters are rejected without invocation", () => {
  let invoked = 0;
  for (const [collection, maker, key] of [
    ["matched_denies", syntheticMatchedDeny, "deny_id"],
    ["matched_denies", syntheticMatchedDeny, "matched_resource"],
    ["structural_denies", syntheticBlockingReason, "severity"],
    ["blocked_reasons", syntheticBlockingReason, "safe_to_expose"],
  ]) {
    const d = denied();
    const value = maker();
    Object.defineProperty(value, key, {
      enumerable: true,
      get() { invoked += 1; throw new Error("DENY_GETTER_MUST_NOT_RUN"); },
    });
    d[collection] = [value];
    fail(d);
  }
  assert.equal(invoked, 0);
});

test("contractual: resource territory uses exact canonical envelope and typed lists", () => {
  assert.equal(inspect(allowed()), undefined);
  const origin = denied();
  origin.resource.territory.origin = { label: "synthetic-origin" };
  origin.resource.territory.destination = Object.assign(Object.create(null), { label: "synthetic-destination" });
  assert.equal(inspect(origin), undefined);
  for (const field of Object.keys(denied().resource.territory)) {
    const d = denied();
    delete d.resource.territory[field];
    fail(d);
  }
  for (const [field, value] of [
    ["organization_id", 1],
    ["site_ids", "site"],
    ["business_unit_ids", [null]],
    ["area_ids", new Array(1)],
    ["area_kinds", [false]],
    ["route_ids", [""]],
    ["vehicle_ids", [42]],
    ["isolated_environment", "false"],
    ["coherent", null],
    ["source", ""],
    ["origin", new Date()],
    ["destination", 42],
  ]) {
    const d = denied();
    d.resource.territory[field] = value;
    fail(d);
  }
  const extra = denied();
  extra.resource.territory.can_operate = true;
  fail(extra);
});

test("security: territory and side getters never execute", () => {
  let invoked = 0;
  for (const field of ["source", "site_ids", "coherent", "origin"]) {
    const d = denied();
    Object.defineProperty(d.resource.territory, field, {
      enumerable: true,
      get() { invoked += 1; throw Error("TERRITORY_GETTER_MUST_NOT_RUN"); },
    });
    fail(d);
  }
  for (const field of ["origin", "destination"]) {
    const d = denied();
    const side = {};
    Object.defineProperty(side, "site_id", {
      enumerable: true,
      get() { invoked += 1; throw Error("SIDE_GETTER_MUST_NOT_RUN"); },
    });
    d.resource.territory[field] = side;
    fail(d);
  }
  assert.equal(invoked, 0);
});

test("contractual: concurrency policy and typed fields match canonical schema", () => {
  const valid = denied();
  valid.resource.concurrency = {
    policy: "EXPECTED_VERSION", expected_version: "v1",
    idempotency_key: null, validated: true,
  };
  assert.equal(inspect(valid), undefined);
  for (const [field, value] of [
    ["policy", "FORCE_ALLOW"],
    ["expected_version", false],
    ["idempotency_key", 42],
    ["validated", "true"],
  ]) {
    const d = denied();
    d.resource.concurrency = { ...valid.resource.concurrency, [field]: value };
    fail(d);
  }
  const missing = denied();
  missing.resource.concurrency = { policy: "NONE", validated: true };
  fail(missing);
  const extra = denied();
  extra.resource.concurrency = { ...valid.resource.concurrency, bypass_applied: true };
  fail(extra);
  let invoked = 0;
  const getter = denied();
  getter.resource.concurrency = { ...valid.resource.concurrency };
  Object.defineProperty(getter.resource.concurrency, "validated", {
    enumerable: true,
    get() { invoked += 1; throw Error("CONCURRENCY_GETTER_MUST_NOT_RUN"); },
  });
  fail(getter);
  assert.equal(invoked, 0);
});

test("security: field classification and side arrays are strictly data-only", () => {
  const valid = denied();
  valid.resource.field_classification = { status: "PUBLIC" };
  valid.resource.required_sides = [{ label: "synthetic-side" }];
  assert.equal(inspect(valid), undefined);
  const wrong = denied();
  wrong.resource.field_classification = { status: { allow: true } };
  fail(wrong);
  const invalidSide = denied();
  invalidSide.resource.required_sides = [new Date()];
  fail(invalidSide);
  let invoked = 0;
  for (const path of ["field_classification", "required_sides"]) {
    const d = denied();
    const payload = {};
    Object.defineProperty(payload, "status", {
      enumerable: true,
      get() { invoked += 1; throw Error("NESTED_GETTER_MUST_NOT_RUN"); },
    });
    if (path === "required_sides") d.resource.required_sides = [payload];
    else d.resource.field_classification = payload;
    fail(d);
  }
  assert.equal(invoked, 0);
});

test("contractual: OR fallback accepts a complete BASE or OPERATIONAL lane", () => {
  for (const deniedLane of ["BASE", "OPERATIONAL"]) {
    const d = deniedAlternative(deniedLane);
    assert.equal(d.combination.combination_result, "ALLOW");
    assert.equal(d.final_decision.outcome, "ALLOW");
    assert.equal(inspect(d), undefined);
  }
});

test("security: fallback cannot ignore global denies or blocks on the winning lane", () => {
  for (const field of ["structural_denies", "actor_wide_denies"]) {
    const d = deniedAlternative("BASE");
    d[field] = [{ ...syntheticBlockingReason(), lane: "ALL" }];
    fail(d);
  }
  const globalMatched = deniedAlternative("BASE");
  globalMatched.matched_denies.push({
    ...syntheticMatchedDeny(),
    deny_id: "deny:actorwide", deny_class: "ACTOR_WIDE", lane: "ALL",
  });
  fail(globalMatched);
  for (const field of ["lane_denies", "blocked_reasons"]) {
    const d = deniedAlternative("BASE");
    d[field].push({ ...syntheticBlockingReason(), lane: "OPERATIONAL" });
    fail(d);
  }
  const globalReason = deniedAlternative("BASE");
  globalReason.blocked_reasons.push({ ...syntheticBlockingReason(), lane: "ALL" });
  fail(globalReason);
});

test("security: deny IDs and blocked lanes cannot be fabricated or misplaced", () => {
  const missingId = deniedAlternative("BASE");
  missingId.base_decision.matched_deny_ids = ["deny:spoofed"];
  fail(missingId);
  const wrongLane = deniedAlternative("BASE");
  wrongLane.matched_denies[0].lane = "OPERATIONAL";
  fail(wrongLane);
  const absentEvidence = deniedAlternative("BASE");
  absentEvidence.matched_denies = [];
  fail(absentEvidence);
  const unlinked = deniedAlternative("BASE");
  unlinked.base_decision.matched_deny_ids = [];
  fail(unlinked);
  const missingBlocked = deniedAlternative("BASE");
  missingBlocked.combination.blocked_lanes = [];
  fail(missingBlocked);
  const phantomBlocked = bothAllowed();
  phantomBlocked.combination.blocked_lanes = ["BASE"];
  fail(phantomBlocked);
  const repeatedDeny = deniedAlternative("BASE");
  repeatedDeny.base_decision.matched_deny_ids.push("deny:base");
  fail(repeatedDeny);
  const borrowedDeny = deniedAlternative("BASE");
  borrowedDeny.operational_decision.matched_deny_ids = ["deny:base"];
  fail(borrowedDeny);
});

test("security: getter-backed DTO properties cannot execute", () => {
  let invoked = 0;
  const d = denied();
  Object.defineProperty(d, "final_decision", {
    enumerable: true, get() { invoked++; return { outcome: "ALLOW" }; },
  });
  fail(d);
  const n = denied();
  Object.defineProperty(n.audit, "decision_id", {
    enumerable: true, get() { invoked++; return "fake"; },
  });
  fail(n);
  assert.equal(invoked, 0);
});

test("security: sparse arrays, extra symbols, inherited objects and array getters fail", () => {
  const a = denied(); a.required_lanes = new Array(1); fail(a);
  const b = denied(); b[Symbol("secret")] = "data"; fail(b);
  const c = denied(); c.audit = Object.create({ decision_id: "shadow" });
  Object.assign(c.audit, denied().audit); fail(c);
  const d = denied();
  Object.defineProperty(d.request.requested_fields = ["x"], "0", {
    enumerable: true, get() { throw Error("MUST_NOT_RUN"); },
  });
  fail(d);
});

test("security: no runtime/backend/registry import and no authority-returning surface", async () => {
  const src = readFileSync(new URL("./authorization-decision-envelope-v1.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(src, /from\s+["'](?:@supabase|react|next|expo)|\bfetch\s*\(|\bXMLHttpRequest\b|globalThis\./u);
  const m = await import("./authorization-decision-envelope-v1.mjs");
  assert.deepEqual(Object.keys(m), ["inspectAuthorizationDecisionEnvelopeV1"]);
  assert.equal(Object.hasOwn(m, "requireAuthorization"), false);
  assert.equal(Object.hasOwn(m, "evaluateAuthorization"), false);
});
