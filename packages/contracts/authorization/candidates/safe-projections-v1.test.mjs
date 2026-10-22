import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { APPLICATION_CODES, PERMISSION_BY_KEY } from "@vento/contracts/authorization/catalog/v1";
import { BASE_ROLE_CODES } from "@vento/contracts/authorization/base-roles/v1";
import { OPERATIONAL_ROLE_CODES } from "@vento/contracts/authorization/operational-roles/v1";
import { AUTHORIZATION_REASON_CODES } from "@vento/contracts/authorization/reason-codes/v1";
import {
  parseSafeContextProjection, parseSafeDecisionProjection,
} from "./safe-projections-v1.mjs";

const context = () => ({
  projection_version: "1.0.0",
  app_code: "shell",
  context_id: "synthetic-context-reference",
  resolved_at: "2026-10-22T10:00:00.123456+00:00",
  principal_type: "HUMAN_USER",
  actor_type: "EMPLOYEE",
  base_role_code: BASE_ROLE_CODES[0],
  operational_role_code: OPERATIONAL_ROLE_CODES[0],
  operational_site_id: "synthetic-site",
  operational_area_id: null,
  base_readiness: "READY",
  operational_readiness: "UNAVAILABLE",
});

const decision = () => ({
  projection_version: "1.0.0",
  correlation_id: "synthetic-trace-only",
  app_code: "shell",
  permission_key: "shell.access",
  outcome: "DENY",
  safe_message_code: "AUTH_APP_ACCESS_DENIED",
  reason_codes: ["AUTH_APP_ACCESS_DENIED"],
  visible_fields: ["title"],
  mutable_fields: [],
});

const reject = (parse, value) => assert.throws(
  () => parse(value),
  { name: "TypeError", message: "VENTO_AUTH_PROJECTION:CONTRACT_INVALID" },
);

test("unit: a 12-field canonical context DTO survives the pure parser", () => {
  const data = context();
  const copy = parseSafeContextProjection(data);
  assert.deepEqual(copy, data);
  assert.notEqual(copy, data);
  assert.equal(Object.isFrozen(copy), true);
  assert.equal(Object.isFrozen(data), false);
});

test("unit: a 9-field canonical DENY DTO survives the pure parser", () => {
  const data = decision();
  const parsed = parseSafeDecisionProjection(data);
  assert.deepEqual(parsed, data);
  assert.notEqual(parsed, data);
  assert.notEqual(parsed.reason_codes, data.reason_codes);
  assert.equal(Object.isFrozen(parsed), true);
  assert.equal(Object.isFrozen(parsed.reason_codes), true);
});

test("unit: an ALLOW projection is a presentation fact, with no reasons", () => {
  const data = { ...decision(), outcome: "ALLOW", safe_message_code: null, reason_codes: [] };
  const parsed = parseSafeDecisionProjection(data);
  assert.deepEqual(parsed, data);
  assert.equal(parsed.outcome, "ALLOW");
});

test("unit: blank optional roles and operational IDs are permitted", () => {
  const parsed = parseSafeContextProjection({
    ...context(), base_role_code: null, operational_role_code: null,
    operational_site_id: null, operational_area_id: null,
  });
  assert.equal(parsed.base_role_code, null);
  assert.equal(parsed.operational_role_code, null);
  assert.equal(parsed.operational_area_id, null);
});

test("unit: a null-prototype JSON-style input is accepted", () => {
  const parsed = parseSafeContextProjection(Object.assign(Object.create(null), context()));
  assert.equal(Object.getPrototypeOf(parsed), Object.prototype);
});

test("unit: valid canonical app, permission and role codes are consumed verbatim", () => {
  for (const app of APPLICATION_CODES) {
    assert.equal(parseSafeContextProjection({ ...context(), app_code: app }).app_code, app);
  }
  for (const [key, item] of Object.entries(PERMISSION_BY_KEY)) {
    const parsed = parseSafeDecisionProjection({
      ...decision(), app_code: item.app_code, permission_key: key,
    });
    assert.equal(parsed.permission_key, key);
  }
  for (const role of BASE_ROLE_CODES) {
    assert.equal(parseSafeContextProjection({ ...context(), base_role_code: role }).base_role_code, role);
  }
  for (const role of OPERATIONAL_ROLE_CODES) {
    assert.equal(parseSafeContextProjection({ ...context(), operational_role_code: role }).operational_role_code, role);
  }
});

test("contractual: canonical context surface uses exactly 12 approved fields", () => {
  const fields = [
    "projection_version", "app_code", "context_id", "resolved_at",
    "principal_type", "actor_type", "base_role_code", "operational_role_code",
    "operational_site_id", "operational_area_id", "base_readiness", "operational_readiness",
  ];
  assert.deepEqual(Object.keys(parseSafeContextProjection(context())), fields);
});

test("contractual: canonical decision surface uses exactly 9 approved fields", () => {
  const fields = [
    "projection_version", "correlation_id", "app_code", "permission_key",
    "outcome", "safe_message_code", "reason_codes", "visible_fields", "mutable_fields",
  ];
  assert.deepEqual(Object.keys(parseSafeDecisionProjection(decision())), fields);
});

test("contractual: public reason catalogs accept all 20 approved codes", () => {
  assert.equal(AUTHORIZATION_REASON_CODES.length, 20);
  for (const code of AUTHORIZATION_REASON_CODES) {
    const payload = { ...decision(), safe_message_code: code, reason_codes: [code] };
    assert.equal(parseSafeDecisionProjection(payload).safe_message_code, code);
  }
});

test("contractual: both DTOs reject unsupported version without downgrade", () => {
  for (const version of [undefined, null, "", "0.9.0", "2.0.0", 1, "v1", "1.0.0-legacy"]) {
    reject(parseSafeContextProjection, { ...context(), projection_version: version });
    reject(parseSafeDecisionProjection, { ...decision(), projection_version: version });
  }
});

test("contractual: no open AppCode, PermissionKey or role code is accepted", () => {
  for (const app_code of [null, "", "HUB", "default", "SHELL", "unknown", true]) {
    reject(parseSafeContextProjection, { ...context(), app_code });
    reject(parseSafeDecisionProjection, { ...decision(), app_code });
  }
  for (const permission_key of ["shell.*", "shell.access ", "other.permission", "SHELL.ACCESS", null, true]) {
    reject(parseSafeDecisionProjection, { ...decision(), permission_key });
  }
  for (const base_role_code of ["propietario_admin", "OWNER", "", true, 1, []]) {
    reject(parseSafeContextProjection, { ...context(), base_role_code });
  }
  for (const operational_role_code of ["administrator", "test-operator", "", true, 1, {}]) {
    reject(parseSafeContextProjection, { ...context(), operational_role_code });
  }
});

test("contractual: readiness statuses are restricted to the published context union", () => {
  for (const status of ["READY", "UNAVAILABLE", "INVALID", "NOT_APPLICABLE"]) {
    assert.equal(parseSafeContextProjection({ ...context(), base_readiness: status }).base_readiness, status);
  }
  for (const status of ["ALLOW", "DENY", "UNKNOWN", "STALE", null, false]) {
    reject(parseSafeContextProjection, { ...context(), base_readiness: status });
    reject(parseSafeContextProjection, { ...context(), operational_readiness: status });
  }
});

test("contractual: principal and actor discriminants fail on unknown identities", () => {
  for (const principal_type of ["ADMIN", "GUEST", "PERSON", "", false, null]) {
    reject(parseSafeContextProjection, { ...context(), principal_type });
  }
  for (const actor_type of ["SUPERVISOR", "PERSON", "HUMAN_USER", "", false, null]) {
    reject(parseSafeContextProjection, { ...context(), actor_type });
  }
});

test("contractual: publicly denied outcomes and codes remain separate from technical errors", () => {
  for (const code of ["CONTRACT_INVALID", "BACKEND_UNAVAILABLE", "SQLSTATE", "CHECKIN_UNCONFIRMED_AS_ACTIVE", "", null, true]) {
    reject(parseSafeDecisionProjection, { ...decision(), safe_message_code: code });
    reject(parseSafeDecisionProjection, { ...decision(), reason_codes: [code] });
  }
});

test("security: permission cannot be replayed in another canonical application", () => {
  reject(parseSafeDecisionProjection, { ...decision(), app_code: "anima", permission_key: "shell.access" });
  reject(parseSafeDecisionProjection, { ...decision(), app_code: "shell", permission_key: "anima.access" });
  assert.equal(parseSafeDecisionProjection({
    ...decision(), app_code: "anima", permission_key: "anima.access",
  }).app_code, "anima");
});

test("security: ALLOW forbids denial messages, reasons or invented public success codes", () => {
  const allowed = { ...decision(), outcome: "ALLOW", safe_message_code: null, reason_codes: [] };
  reject(parseSafeDecisionProjection, { ...allowed, reason_codes: ["AUTH_APP_ACCESS_DENIED"] });
  reject(parseSafeDecisionProjection, { ...allowed, safe_message_code: "AUTH_APP_ACCESS_DENIED" });
  reject(parseSafeDecisionProjection, { ...allowed, safe_message_code: "AUTH_ALLOWED" });
});

test("security: DENY requires a published primary public reason code", () => {
  for (const safe_message_code of [null, "", "DENY", true, 1, "BACKEND_RESPONSE_INVALID"]) {
    reject(parseSafeDecisionProjection, { ...decision(), safe_message_code });
  }
  assert.equal(parseSafeDecisionProjection({ ...decision(), reason_codes: [] }).outcome, "DENY");
});

test("security: unrecognized outcome, flags and coercions never become a decision", () => {
  for (const outcome of [true, false, 0, 1, "true", "FALSE", "ALLOW ", "WOULD_ALLOW", null]) {
    reject(parseSafeDecisionProjection, { ...decision(), outcome });
  }
  for (const primitive of [null, undefined, true, false, 0, "", "ALLOW", []]) {
    reject(parseSafeContextProjection, primitive);
    reject(parseSafeDecisionProjection, primitive);
  }
});

test("security: hidden identity, legacy flags and internal evidence cannot cross the boundary", () => {
  for (const [key, value] of [
    ["decision_id", "forged"],
    ["catalog_hash", "private"],
    ["matched_allows", []],
    ["matched_denies", []],
    ["audit", {}],
    ["sqlstate", "42501"],
    ["bypass_applied", true],
    ["can_operate", true],
    ["access_context_ref", { context_fingerprint: "sensitive" }],
  ]) {
    reject(parseSafeDecisionProjection, { ...decision(), [key]: value });
    reject(parseSafeContextProjection, { ...context(), [key]: value });
  }
});

test("security: deleting any root field fails closed for both projections", () => {
  for (const key of Object.keys(context())) {
    const data = context();
    delete data[key];
    reject(parseSafeContextProjection, data);
  }
  for (const key of Object.keys(decision())) {
    const data = decision();
    delete data[key];
    reject(parseSafeDecisionProjection, data);
  }
});

test("security: unknown nested object, sparse, accessor or symbolic arrays are rejected", () => {
  for (const list of [["AUTH_APP_ACCESS_DENIED", {}], [null], ["NOT_REGISTERED"]]) {
    reject(parseSafeDecisionProjection, { ...decision(), reason_codes: list });
  }
  const sparse = new Array(2);
  sparse[0] = "AUTH_APP_ACCESS_DENIED";
  reject(parseSafeDecisionProjection, { ...decision(), reason_codes: sparse });
  const symbols = ["AUTH_APP_ACCESS_DENIED"];
  symbols[Symbol("private")] = "hidden";
  reject(parseSafeDecisionProjection, { ...decision(), reason_codes: symbols });
  const custom = ["AUTH_APP_ACCESS_DENIED"];
  custom.extra = "hidden";
  reject(parseSafeDecisionProjection, { ...decision(), reason_codes: custom });
});

test("security: accessor payload properties fail without invoking their getters", () => {
  let count = 0;
  const badContext = context();
  Object.defineProperty(badContext, "context_id", {
    enumerable: true, configurable: true,
    get() { count += 1; return "spoof"; },
  });
  reject(parseSafeContextProjection, badContext);
  const badDecision = decision();
  Object.defineProperty(badDecision, "reason_codes", {
    enumerable: true, configurable: true,
    get() { count += 1; return []; },
  });
  reject(parseSafeDecisionProjection, badDecision);
  const array = ["AUTH_APP_ACCESS_DENIED"];
  Object.defineProperty(array, "0", {
    enumerable: true, configurable: true,
    get() { count += 1; return "AUTH_APP_ACCESS_DENIED"; },
  });
  reject(parseSafeDecisionProjection, { ...decision(), reason_codes: array });
  assert.equal(count, 0);
});

test("security: inherited keys, extra symbols and magic prototype fields cannot pass", () => {
  const inherited = Object.create({ projection_version: "1.0.0" });
  Object.assign(inherited, context());
  reject(parseSafeContextProjection, inherited);
  const symbols = context();
  symbols[Symbol("session")] = "forged";
  reject(parseSafeContextProjection, symbols);
  const polluted = decision();
  Object.defineProperty(polluted, "__proto__", { value: { admin: true }, enumerable: true });
  reject(parseSafeDecisionProjection, polluted);
});

test("security: parsed arrays are detached from caller mutation", () => {
  const original = decision();
  const parsed = parseSafeDecisionProjection(original);
  original.reason_codes[0] = "AUTH_NO_SESSION";
  original.visible_fields.push("secrets");
  assert.deepEqual(parsed.reason_codes, ["AUTH_APP_ACCESS_DENIED"]);
  assert.deepEqual(parsed.visible_fields, ["title"]);
  assert.throws(() => { parsed.mutable_fields.push("forged"); }, TypeError);
});

test("security: empty/invalid field and correlation identity fail without silent normalization", () => {
  for (const field of [null, true, 1, {}, [], ""]) {
    reject(parseSafeDecisionProjection, { ...decision(), correlation_id: field });
    reject(parseSafeContextProjection, { ...context(), context_id: field });
    reject(parseSafeDecisionProjection, { ...decision(), visible_fields: [field] });
    reject(parseSafeDecisionProjection, { ...decision(), mutable_fields: [field] });
  }
  assert.equal(parseSafeDecisionProjection({ ...decision(), correlation_id: null }).correlation_id, null);
});

test("security: no Supabase, network, renderer or global grant state enters contract parsers", async () => {
  const source = readFileSync(new URL("./safe-projections-v1.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /from\s+["'](?:@supabase|react|react-dom|next|react-native|expo)|\bfetch\s*\(|XMLHttpRequest\s*\(|localStorage\b|globalThis\./u);
  assert.deepEqual(Object.keys(await import("./safe-projections-v1.mjs")).sort(), [
    "parseSafeContextProjection", "parseSafeDecisionProjection",
  ]);
});
