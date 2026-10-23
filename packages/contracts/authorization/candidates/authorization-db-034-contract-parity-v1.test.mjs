// NEGATIVE PARITY QA: PASS detects the documented AUTH-DB-034 versus
// AuthorizationDecisionV1 incompatibilities. PASS NEVER means interoperable.
// Source-only: no SQL execution, production proof or authorization.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../../../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const sql = read("supabase/migrations/20260901062557_auth_db_034_authorization_evaluator.sql");
const candidate = read("packages/contracts/authorization/candidates/authorization-decision-envelope-v1.mjs");
const pkg = JSON.parse(read("packages/contracts/package.json"));
const RELEASE = "sha256:9e8d1d7452ed5844fa76b9c718e7bb82ae029d6031234b3b6d9a17f22c2a4359";
const REGISTRY = "sha256:2f19d2ebabcc87f8a6bb8029da8f87e05ea86c9acb027aec134995d338604bf4";
function cut(src, from, to) {
  const a = src.indexOf(from), b = src.indexOf(to, a + from.length);
  assert.ok(a >= 0 && b > a, "Pinned SQL section missing");
  assert.equal(src.indexOf(from, a + from.length), -1, "Ambiguous SQL section");
  return src.slice(a,b);
}
function keys(src, spaces) {
  return [...src.matchAll(new RegExp("^ {" + spaces + "}'([a-z][a-z0-9_]*)',$", "gm"))]
    .map(x => x[1]);
}
function contractKeys(name) {
  const m = candidate.match(new RegExp("const " + name + " = \\[([\\s\\S]*?)\\];"));
  assert.ok(m, "Candidate field contract missing: " + name);
  return [...m[1].matchAll(/"([a-z][a-z0-9_]*)"/gu)].map(x => x[1]);
}
function returned(s) {
  const i = s.lastIndexOf("return pg_catalog.jsonb_build_object(");
  assert.ok(i >= 0);
  return s.slice(i);
}
function nested(s, name, nextName) {
  const marker = "    '" + name + "',\n    pg_catalog.jsonb_build_object(";
  const a = s.indexOf(marker);
  const end = nextName ? "\n    ),\n    '" + nextName + "'," : "\n    )\n  );";
  const b = s.indexOf(end, a + marker.length);
  assert.ok(a >= 0 && b > a);
  return keys(s.slice(a,b),6);
}
const core = cut(sql,
  "create or replace function\n  app_private.evaluate_authorization_core(",
  "end\n$auth_db_034_core$;");
const full = returned(core);
const resolver = cut(sql,
  "create or replace function\n  app_private.resolve_authorization_resource(",
  "end\n$auth_db_034_resolve_resource$;");
const resource = returned(resolver);
const safe = returned(cut(sql,
  "create or replace function\n  app_private.project_safe_authorization_decision(",
  "end\n$auth_db_034_safe_projection$;"));
const combineFields = nested(full,"combination","final_decision");
const auditFields = nested(full,"audit",null);
const resourceFields = keys(resource,4);

test("parity BLOCKED: all 28 top-level keys match but do not prove nested contract", () => {
  assert.equal(keys(full,4).length,28);
  assert.deepEqual(keys(full,4),contractKeys("ROOT"));
});
test("parity BLOCKED: final_decision is a scalar instead of a reason-bearing object", () => {
  assert.ok(full.includes("    'final_decision',\n    v_final_decision,"));
  assert.match(core,/v_final_decision\s*:=\s*'ALLOW'/u);
  assert.match(core,/v_final_decision\s*:=\s*'DENY'/u);
  assert.deepEqual(contractKeys("FINAL"),[
    "outcome","reason_category","primary_reason_code","authorizing_lanes","safe_message_code",
  ]);
});
test("parity BLOCKED: physical combination omits canonical lane details", () => {
  assert.deepEqual(combineFields,["authorization_requirement","outcome"]);
  const required=contractKeys("COMBINATION");
  for(const name of ["authorizing_lanes","blocked_lanes","combination_rule","combination_result"])
    assert.ok(required.includes(name)&&!combineFields.includes(name));
});
test("parity BLOCKED: SQL audit differs from required evaluator provenance", () => {
  assert.deepEqual(auditFields,[
    "request_fingerprint","context_fingerprint","permission_contract_fingerprint",
    "resource_fingerprint","contract_release_hash","identity_registry_sha256",
    "dataset_evidence","request_source",
  ]);
  const required=contractKeys("AUDIT");
  for(const name of ["evaluator_name","evaluator_version","dataset_hashes",
    "decision_id","outcome","authorizing_lanes"])
    assert.ok(required.includes(name)&&!auditFields.includes(name));
  assert.ok(full.includes("'contract_release_hash',\n      '"+RELEASE+"',"));
  assert.ok(full.includes("'identity_registry_sha256',\n      '"+REGISTRY+"',"));
});
test("parity BLOCKED: resolver hashes request, not the enterprise state snapshot", () => {
  assert.deepEqual(resourceFields,[
    "resource_contract_id","resolver_key","resource_type","request_mode",
    "resolution_state","resource_fingerprint","safe_resource_reference","requested_fields",
  ]);
  const required=contractKeys("RESOURCE");
  for(const name of ["territory","ownership","required_sides","state_snapshot",
    "field_classification","concurrency","resolution_status"])
    assert.ok(required.includes(name)&&!resourceFields.includes(name));
  for(const pair of [
    "'resource_contract_id',\n            p_resource_contract_id,",
    "'resource_request',\n            p_resource_request,",
    "'operation_kind',\n            p_operation_kind,",
    "'requested_fields',\n            pg_catalog.to_jsonb(v_fields)",
  ]) assert.ok(resolver.includes(pair));
});
test("parity BLOCKED: only app-surface NON_RESOURCE is resolved; other domains fail closed", () => {
  assert.ok(resolver.includes("v_registry.resolver_key =\n      'APP_SURFACE_NON_RESOURCE'"));
  assert.ok(resolver.includes("v_state :=\n      'NOT_APPLICABLE';"));
  assert.ok(resolver.includes("v_state :=\n      'UNRESOLVED';"));
  assert.ok(resolver.includes("Until a static certified domain resolver exists"));
});
test("parity BLOCKED: physical permission contract differs from canonical snapshot", () => {
  const tag="$authdb034_permission_rows_7d9370580349$",parts=sql.split(tag);
  assert.equal(parts.length,3);
  const rows=JSON.parse(parts[1]);
  assert.equal(rows.length,140);
  const columns=Object.keys(rows[0].contract_snapshot);
  const expected=contractKeys("PERMISSION");
  for(const key of ["permission_status","base_prerequisite",
    "operational_prerequisite","dependency_permission_keys","sensitivity_class"])
    assert.ok(expected.includes(key)&&!columns.includes(key));
  assert.ok(columns.includes("status")&&columns.includes("sensitivity"));
});
test("parity BLOCKED: lanes and field masks have compact incompatible shapes", () => {
  const i=core.indexOf("v_base_decision :=\n        pg_catalog.jsonb_build_object(");
  assert.ok(i>=0);
  const lane=core.slice(i,core.indexOf("\n        );",i));
  assert.deepEqual(keys(lane,10),
    ["evaluated","outcome","reason_codes","matched_allows","matched_denies"]);
  assert.ok(contractKeys("LANE").includes("readiness"));
  assert.ok(core.includes("v_field_policy_decision :=\n      pg_catalog.jsonb_build_object(\n        'outcome',"));
  assert.ok(candidate.includes('"status","visible_fields","masked_fields","mutable_fields","blocked_fields","reason_codes"'));
});
test("safe boundary: 12 safe projection fields, with no private grants or audit", () => {
  const actual=keys(safe,4);
  assert.deepEqual(actual,[
    "outcome","app_code","permission_key","operation_kind","resource_type",
    "safe_resource_reference","safe_message_code","safe_reason_codes",
    "recovery_actions","visible_fields","correlation_id","decided_at",
  ]);
  for(const name of ["audit","matched_allows","matched_denies","permission_contract","dataset_hashes"])
    assert.ok(!actual.includes(name));
  assert.ok(sql.includes("app_private.project_safe_authorization_decision(\n      app_private.evaluate_authorization(\n        p_evaluation_request\n      )"));
});
test("no accidental promotion: incompatibility is a blocker, never a passing full E2E", () => {
  assert.notDeepEqual(combineFields,contractKeys("COMBINATION"));
  assert.notDeepEqual(auditFields,contractKeys("AUDIT"));
  assert.notDeepEqual(resourceFields,contractKeys("RESOURCE"));
  assert.equal(pkg.private,true);
  assert.equal(pkg.version,"1.0.0-alpha.1");
  for(const subpath of ["./authorization/decision/v1","./authorization/evaluator/v1"])
    assert.equal(Object.hasOwn(pkg.exports,subpath),false);
  assert.match(candidate,/return undefined;/u);
});
