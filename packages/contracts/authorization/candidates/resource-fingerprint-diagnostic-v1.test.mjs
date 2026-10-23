import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { inspectResourceFingerprintPreimageV1 as inspect } from "./resource-fingerprint-diagnostic-v1.mjs";

const fingerprint = (value) => "sha256:" +
  createHash("sha256").update(value, "utf8").digest("hex");
const base = '{"resource":{"request_shape":"NON_RESOURCE","resource_type":"application"},"resource_contract_id":"nonresource:fixture"}';
const evidence = (json = base) => ({
  serialization_profile: "vento.canonical-json@1.0.0",
  resource_contract_id: "nonresource:fixture",
  resource_fingerprint: fingerprint(json),
  canonical_preimage_json: json,
});
const fail = (e) => assert.throws(() => inspect(e),
  (err) => err instanceof TypeError
    && err.message === "VENTO_AUTH_RESOURCE_FINGERPRINT:DIAGNOSTIC_INVALID");

test("diagnostic: reproduced digest returns no authority", () => {
  assert.equal(inspect(evidence()), undefined);
  assert.equal(createHash("sha256").update("{}").digest("hex"),
    "44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a");
});
test("diagnostic: changed authoritative resource fact invalidates digest", () => {
  const changed = base.replace("application", "different");
  assert.notEqual(fingerprint(base), fingerprint(changed));
  fail({ ...evidence(), canonical_preimage_json: changed });
  assert.equal(inspect(evidence(changed)), undefined);
});
test("diagnostic: resource contract identity belongs to hashed bytes", () => {
  fail({ ...evidence(), resource_contract_id: "nonresource:foreign" });
  const other = base.replace("nonresource:fixture", "nonresource:foreign");
  fail({ ...evidence(other), resource_contract_id: "nonresource:fixture" });
});
test("diagnostic: noncanonical property ordering and whitespace rejected even if rehashed", () => {
  for (const json of [
    '{"resource_contract_id":"nonresource:fixture","resource":{"resource_type":"application","request_shape":"NON_RESOURCE"}}',
    base + "\n", " " + base, "\ufeff" + base,
  ]) fail(evidence(json));
});
test("diagnostic: malformed, duplicate-key and nonobject preimages rejected", () => {
  for (const json of [
    "{", "null", "[]", '"bad"',
    '{"resource":{"request_shape":"NON_RESOURCE","resource_type":"application"},"resource_contract_id":"nonresource:fixture","resource_contract_id":"nonresource:fixture"}',
  ]) fail(evidence(json));
});
test("diagnostic: noncanonical numeric forms are outside the conservative subset", () => {
  for (const num of ["-0", "1.25", "9007199254740993", "1e3"]) {
    const json = '{"resource":{"count":' + num + ',"request_shape":"NON_RESOURCE","resource_type":"application"},"resource_contract_id":"nonresource:fixture"}';
    fail(evidence(json));
  }
});
test("diagnostic: Unicode NFC required, no silent normalization", () => {
  const normalized = '{"resource":{"label":"\u00e9","request_shape":"NON_RESOURCE","resource_type":"application"},"resource_contract_id":"nonresource:fixture"}';
  const decomposed = '{"resource":{"label":"e\u0301","request_shape":"NON_RESOURCE","resource_type":"application"},"resource_contract_id":"nonresource:fixture"}';
  assert.equal(inspect(evidence(normalized)), undefined);
  fail(evidence(decomposed));
});
test("diagnostic: preserves array sequence, never infers set semantics", () => {
  const a = '{"resource":{"resource_ids":["a","b"],"resource_type":"application"},"resource_contract_id":"nonresource:fixture"}';
  const b = '{"resource":{"resource_ids":["b","a"],"resource_type":"application"},"resource_contract_id":"nonresource:fixture"}';
  assert.notEqual(fingerprint(a), fingerprint(b));
  assert.equal(inspect(evidence(a)), undefined);
  assert.equal(inspect(evidence(b)), undefined);
});
test("diagnostic: invalid profile and noncanonical digest formats rejected", () => {
  const e = evidence();
  for (const change of [
    { serialization_profile: "latest" },
    { resource_fingerprint: e.resource_fingerprint.toUpperCase() },
    { resource_fingerprint: e.resource_fingerprint.slice(0, -1) },
    { resource_fingerprint: "sha256:" + "0".repeat(64) },
    { resource_fingerprint: "sha512:" + "a".repeat(128) },
  ]) fail({ ...e, ...change });
});
test("diagnostic: inherited, accessor, symbol and authority-bearing fields fail", () => {
  const e = evidence();
  fail({ ...e, allow: true });
  fail(Object.assign(Object.create({ allow: true }), e));
  fail({ ...e, [Symbol("allow")]: true });
  const withGetter = Object.defineProperty({ ...e }, "resource_fingerprint",
    { get() { throw Error("UNSAFE_GETTER"); }, enumerable: true });
  fail(withGetter);
});
test("diagnostic: candidate not packaged or exposed as an authorization API", () => {
  assert.equal(inspect(evidence()), undefined);
  const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
  assert.equal(Object.hasOwn(pkg.exports, "./authorization/resource-fingerprint/v1"), false);
  assert.equal(pkg.version, "1.0.0-alpha.1");
});
