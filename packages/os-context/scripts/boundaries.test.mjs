import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import * as server from "../dist/server/index.js";
import * as client from "../dist/client/index.js";
import * as testing from "../dist/testing/index.js";
import * as legacy from "../dist/legacy/index.js";

const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const SERVER_EXPORTS = [
  "createAuthorizationScope", "evaluateAuthorization",
  "getSafeContextProjection", "getSafeDecisionProjection",
  "requireAuthorization", "resolveAccessContext",
];
const CLIENT_EXPORTS = ["parseSafeContextProjection", "parseSafeDecisionProjection"];
const LEGACY_EXPORTS = [
  "getEffectiveContext", "hasEffectivePermission",
  "startContextSimulation", "stopContextSimulation",
];

test("unit: negative test fixture never claims canonical authority", () => {
  const payload = testing.makeInvalidAuthorizationFixture();
  assert.deepEqual(payload, {});
  assert.equal(Object.isFrozen(payload), true);
  assert.equal("final_decision" in payload, false);
  assert.equal("can_operate" in payload, false);
});

test("unit: server adapter placeholders never resolve access context", async () => {
  await assert.rejects(
    server.resolveAccessContext({ app_code: "shell", bypass: true }),
    /VENTO_OS_CONTEXT:CANONICAL_AUTHORIZATION_CONTRACT_PENDING/u,
  );
});

test("unit: client parsers are present but reject unavailable schema", () => {
  assert.throws(
    () => client.parseSafeContextProjection({ projection_version: "1.0.0" }),
    /CANONICAL_PROJECTION_VALIDATOR_PENDING/u,
  );
  assert.throws(
    () => client.parseSafeDecisionProjection({ outcome: "ALLOW" }),
    /CANONICAL_PROJECTION_VALIDATOR_PENDING/u,
  );
});

test("contractual: npm exposes exactly four named subpaths", () => {
  assert.deepEqual(Object.keys(manifest.exports), [
    "./server", "./client", "./testing", "./legacy",
  ]);
  assert.equal(Object.hasOwn(manifest.exports, "."), false);
  assert.equal(Object.hasOwn(manifest, "main"), false);
  assert.equal(Object.hasOwn(manifest, "types"), false);
});

test("contractual: package subpaths import through their published names", async () => {
  for (const path of ["server", "client", "testing", "legacy"]) {
    const namespace = await import("@vento/os-context/" + path);
    assert.ok(Object.keys(namespace).length > 0);
  }
});

test("contractual: there is no implicit root runtime entrypoint", async () => {
  await assert.rejects(import("@vento/os-context"), {
    code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
  });
});

test("contractual: server exports the six reserved canonical names only", () => {
  assert.deepEqual(Object.keys(server), SERVER_EXPORTS);
});

test("contractual: client exports only the two canonical parser names", () => {
  assert.deepEqual(Object.keys(client), CLIENT_EXPORTS);
});

test("contractual: legacy exports exactly the existing four RPC wrappers", () => {
  assert.deepEqual(Object.keys(legacy), LEGACY_EXPORTS);
});

test("contractual: four entrypoints have ESM and TypeScript declarations", () => {
  for (const path of ["server", "client", "testing", "legacy"]) {
    for (const ext of [".js", ".d.ts"]) {
      assert.equal(existsSync(new URL("../dist/" + path + "/index" + ext, import.meta.url)), true);
    }
    assert.deepEqual(Object.keys(manifest.exports["./" + path]), ["types", "import", "default"]);
  }
});

test("contractual: canonical dependency and Supabase peer are exact", () => {
  assert.equal(manifest.dependencies["@vento/contracts"], "1.0.0-alpha.1");
  assert.equal(manifest.peerDependencies["@supabase/supabase-js"], ">=2.90.0 <3");
  assert.equal(manifest.private, true);
  assert.equal(manifest.version, "0.1.0");
  assert.equal(manifest.engines.node, ">=22");
});

test("security: no legacy or testing runtime leaks through /server", () => {
  for (const name of [...LEGACY_EXPORTS, "makeInvalidAuthorizationFixture"]) {
    assert.equal(Object.hasOwn(server, name), false);
  }
});

test("security: /client never exports an authorization grant API", () => {
  for (const name of [
    "hasPermission", "hasEffectivePermission",
    "requireAuthorization", "evaluateAuthorization", "getEffectiveContext",
  ]) {
    assert.equal(Object.hasOwn(client, name), false);
  }
});

test("security: canonical client has no Supabase, fetch or framework imports", () => {
  const source = readFileSync(new URL("../src/client/index.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /@supabase|supabase\.rpc|\bfetch\s*\(|\bXMLHttpRequest\b|\bReact\b|next\/|\bexpo\b|react-native/iu);
});

test("security: all canonical server operations reject fabricated allow inputs", async () => {
  for (const name of ["resolveAccessContext", "evaluateAuthorization", "requireAuthorization"]) {
    await assert.rejects(
      server[name]({ final_decision: { outcome: "ALLOW" }, bypass: true }),
      /CANONICAL_AUTHORIZATION_CONTRACT_PENDING/u,
    );
  }
  for (const name of ["getSafeContextProjection", "getSafeDecisionProjection", "createAuthorizationScope"]) {
    assert.throws(() => server[name]({ final_decision: { outcome: "ALLOW" } }),
      /CANONICAL_AUTHORIZATION_CONTRACT_PENDING/u);
  }
});

test("security: no arbitrary projection may be accepted as ALLOW", () => {
  for (const payload of [
    null, {}, "ALLOW", true,
    { outcome: "ALLOW" },
    { final_decision: { outcome: "ALLOW" }, decision_id: "forged" },
  ]) {
    assert.throws(() => client.parseSafeDecisionProjection(payload),
      /CANONICAL_PROJECTION_VALIDATOR_PENDING/u);
    assert.throws(() => client.parseSafeContextProjection(payload),
      /CANONICAL_PROJECTION_VALIDATOR_PENDING/u);
  }
});

test("security: the draft exposes no production publish action", () => {
  assert.equal(manifest.private, true);
  assert.equal(Object.values(manifest.scripts).some(
    (script) => /\bnpm\s+publish\b|\bgh\s+release\s+create\b/iu.test(script)), false);
});
