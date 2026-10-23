import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import test from "node:test";
import {
  computeGeofenceRequestHash,
  decodeGooglePlayIntegrityToken,
  evaluateGooglePlayVerdict,
} from "../../../supabase/functions/_shared/geofence-app-integrity.ts";

const employeeId = "e9132f2a-8474-468c-9c69-2eebc68a92a0";
const shiftId = "507425bd-e229-4407-8b52-f42681cc034f";
const checkInLogId = "12cdcb46-5fbd-46ab-9d41-b1f7420e1c0b";
const siteId = "f8fd215f-b784-4a05-8592-c6a36fe005a3";
const now = Date.now();
const first = {
  capturedAt: now - 100_000,
  latitude: 7.911,
  longitude: -72.5,
  accuracyMeters: 5,
  mocked: false,
};
const second = {
  capturedAt: now - 30_000,
  latitude: 7.9112,
  longitude: -72.5,
  accuracyMeters: 4,
  mocked: false,
};
const bound = { employeeId, shiftId, checkInLogId, siteId, first, second };

test("GEOFENCE Play Integrity request hash binds identity, check-in and both GPS samples", async () => {
  const original = await computeGeofenceRequestHash(bound);
  assert.match(original, /^[a-f0-9]{64}$/u);
  assert.equal(original, await computeGeofenceRequestHash({ ...bound }));
  for (const altered of [
    { ...bound, checkInLogId: "2d84c940-e72c-4fe5-a9c5-888cad733fb7" },
    { ...bound, shiftId: "2d84c940-e72c-4fe5-a9c5-888cad733fb7" },
    { ...bound, first: { ...first, latitude: first.latitude + 0.001 } },
    { ...bound, second: { ...second, accuracyMeters: 5 } },
  ]) {
    assert.notEqual(await computeGeofenceRequestHash(altered), original);
  }
  await assert.rejects(() => computeGeofenceRequestHash({
    ...bound, first: { ...first, mocked: true },
  }), /GEOFENCE_SAMPLE_REJECTED/u);
  await assert.rejects(() => computeGeofenceRequestHash({
    ...bound, second: { ...second, capturedAt: first.capturedAt + 44_999 },
  }), /GEOFENCE_INTERVAL_REJECTED/u);
  await assert.rejects(() => computeGeofenceRequestHash({
    ...bound, employeeId: "not-a-uuid",
  }), /GEOFENCE_REQUEST_REJECTED/u);
});

test("GEOFENCE server rejects forged, expired, unrecognized and untrusted Play verdicts", async () => {
  const hash = await computeGeofenceRequestHash(bound);
  const expected = {
    packageName: "com.vento.anima.dev",
    certificateSha256Digest: "QA_SYNTHETIC_CERTIFICATE_DIGEST",
    requestHash: hash,
    nowMillis: now,
  };
  const payload = {
    requestDetails: {
      requestPackageName: expected.packageName,
      requestHash: hash,
      timestampMillis: String(now - 1_500),
    },
    appIntegrity: {
      appRecognitionVerdict: "PLAY_RECOGNIZED",
      packageName: expected.packageName,
      certificateSha256Digest: [expected.certificateSha256Digest],
    },
    deviceIntegrity: { deviceRecognitionVerdict: ["MEETS_DEVICE_INTEGRITY"] },
  };
  assert.deepEqual(evaluateGooglePlayVerdict(payload, expected), {
    accepted: true, reason: "VERIFIED_APP_DEVICE",
  });
  const deny = (changed: object, reason: string) => {
    assert.deepEqual(evaluateGooglePlayVerdict(changed, expected), {
      accepted: false, reason,
    });
  };
  deny({
    ...payload,
    requestDetails: { ...payload.requestDetails, requestHash: "a".repeat(64) },
  }, "REQUEST_HASH_MISMATCH");
  deny({
    ...payload,
    requestDetails: { ...payload.requestDetails, timestampMillis: String(now - 400_000) },
  }, "STALE_OR_FUTURE_VERDICT");
  deny({
    ...payload,
    requestDetails: { ...payload.requestDetails, requestPackageName: "com.other.app" },
  }, "WRONG_PACKAGE");
  deny({
    ...payload,
    appIntegrity: { ...payload.appIntegrity, appRecognitionVerdict: "UNRECOGNIZED_VERSION" },
  }, "UNRECOGNIZED_APP");
  deny({
    ...payload,
    appIntegrity: { ...payload.appIntegrity, certificateSha256Digest: ["WRONG"] },
  }, "WRONG_SIGNING_CERTIFICATE");
  deny({
    ...payload,
    deviceIntegrity: { deviceRecognitionVerdict: ["MEETS_BASIC_INTEGRITY"] },
  }, "UNTRUSTED_DEVICE");
  deny({ ...payload, requestDetails: null }, "INVALID_REQUEST");
});

test("GEOFENCE Google server-to-server decoder never exposes service keys or raw API errors", async () => {
  const keypair = await webcrypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true, ["sign", "verify"],
  );
  const der = Buffer.from(await webcrypto.subtle.exportKey("pkcs8", keypair.privateKey));
  const base64 = der.toString("base64").match(/.{1,64}/gu)?.join("\n") ?? "";
  const account = {
    client_email: "qa-geo@example.invalid",
    private_key: "-----BEGIN PRIVATE KEY-----\n" + base64 + "\n-----END PRIVATE KEY-----\n",
  };
  const token = "synthetic.integrity.token.for.testing.only";
  const calls: Array<{ url: string; options: RequestInit }> = [];
  const fetcher: typeof fetch = async (request, options) => {
    const url = String(request);
    calls.push({ url, options: options ?? {} });
    return new Response(JSON.stringify(url.endsWith("/token")
      ? { access_token: "synthetic-google-oauth-access" }
      : { tokenPayloadExternal: { requestDetails: { requestHash: "a".repeat(64) } } }
    ), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  const decoded = await decodeGooglePlayIntegrityToken(
    token, "com.vento.anima.dev", account, now, fetcher,
  );
  assert.deepEqual(decoded, { requestDetails: { requestHash: "a".repeat(64) } });
  assert.deepEqual(calls.map(call => call.url), [
    "https://oauth2.googleapis.com/token",
    "https://playintegrity.googleapis.com/v1/com.vento.anima.dev:decodeIntegrityToken",
  ]);
  const oauthForm = calls[0].options.body;
  assert.ok(oauthForm instanceof URLSearchParams);
  const assertion = oauthForm.get("assertion") ?? "";
  assert.equal(assertion.split(".").length, 3);
  assert.match(assertion, /^[A-Za-z0-9._-]+$/u);
  assert.equal((calls[1].options.headers as Record<string, string>).Authorization,
    "Bearer synthetic-google-oauth-access");
  assert.deepEqual(JSON.parse(String(calls[1].options.body)),
    { integrity_token: token });
  const deniedFetcher: typeof fetch = async () =>
    new Response(JSON.stringify({ error: "SENSITIVE_GOOGLE_DETAILS" }), { status: 403 });
  await assert.rejects(
    () => decodeGooglePlayIntegrityToken(token, "com.vento.anima.dev", account, now, deniedFetcher),
    (error: unknown) => {
      assert.equal((error as Error).message, "GOOGLE_VERIFICATION_UNAVAILABLE");
      return true;
    },
  );
  await assert.rejects(
    () => decodeGooglePlayIntegrityToken(token, "com.vento.anima.dev",
      { client_email: account.client_email, private_key: "BAD_PRIVATE_KEY" }, now, fetcher),
    /GOOGLE_VERIFICATION_UNAVAILABLE/u,
  );
});
