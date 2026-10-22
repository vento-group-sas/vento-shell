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
      territory: {},
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
  d.matched_allows = [{ grant_id: "grant:synthetic" }];
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

test("contractual: operation and final combination results must match", () => {
  const d = denied(); d.combination.combination_result = "ALLOW"; fail(d);
  const d2 = allowed(); d2.combination.combination_result = "DENY"; fail(d2);
  const d3 = allowed(); d3.final_decision.outcome = "DENY"; fail(d3);
  const d4 = allowed(); d4.final_decision.reason_category = "DEFAULT_DENY"; fail(d4);
});

test("security: structurally impossible ALLOW cannot override any explicit blocking evidence", () => {
  for (const field of ["structural_denies","actor_wide_denies","lane_denies","blocked_reasons","matched_denies"]) {
    const d = allowed(); d[field] = [{ reason_code: "blocked" }]; fail(d);
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
  const d2 = allowed(); d2.prerequisite_decisions = [{ status: "FAIL" }]; fail(d2);
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
