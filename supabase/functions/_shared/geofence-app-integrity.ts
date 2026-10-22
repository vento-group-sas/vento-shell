// Server-side Google Play Integrity verification primitives for ANIMA geofence.
// IMPORTANT: Play Integrity attests the app/device and binds a request. It does NOT
// independently attest the physical authenticity of Android GPS measurements.
// This module never inserts attendance and never activates automatic checkout.

export type GeofenceSample = {
  capturedAt: number;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  mocked: boolean;
};

export type GeofenceBoundRequest = {
  employeeId: string;
  shiftId: string;
  checkInLogId: string;
  siteId: string;
  first: GeofenceSample;
  second: GeofenceSample;
};

export type PlayIntegrityExpected = {
  packageName: string;
  certificateSha256Digest: string;
  requestHash: string;
  nowMillis: number;
};

export type IntegrityDecision = {
  accepted: boolean;
  reason:
    | "VERIFIED_APP_DEVICE"
    | "INVALID_REQUEST"
    | "STALE_OR_FUTURE_VERDICT"
    | "WRONG_PACKAGE"
    | "REQUEST_HASH_MISMATCH"
    | "UNRECOGNIZED_APP"
    | "WRONG_SIGNING_CERTIFICATE"
    | "UNTRUSTED_DEVICE";
};

type ObjectValue = Record<string, unknown>;

function objectOf(value: unknown): ObjectValue | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as ObjectValue
    : null;
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function hexString(value: unknown, length: number): value is string {
  return typeof value === "string" && value.length === length &&
    new RegExp("^[a-f0-9]{" + length + "}$", "u").test(value);
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value);
}

function validateSample(value: GeofenceSample) {
  if (value.mocked !== false || !Number.isFinite(value.capturedAt) ||
      !Number.isSafeInteger(value.capturedAt) ||
      !Number.isFinite(value.latitude) || Math.abs(value.latitude) > 90 ||
      !Number.isFinite(value.longitude) || Math.abs(value.longitude) > 180 ||
      !Number.isFinite(value.accuracyMeters) ||
      value.accuracyMeters < 0 || value.accuracyMeters > 25) {
    throw new Error("GEOFENCE_SAMPLE_REJECTED");
  }
}

// The ordered serialization is part of the mobile/backend protocol.
export async function computeGeofenceRequestHash(request: GeofenceBoundRequest): Promise<string> {
  if (!isUuid(request.employeeId) || !isUuid(request.shiftId) ||
      !isUuid(request.checkInLogId) || !isUuid(request.siteId)) {
    throw new Error("GEOFENCE_REQUEST_REJECTED");
  }
  validateSample(request.first);
  validateSample(request.second);
  const gap = request.second.capturedAt - request.first.capturedAt;
  if (gap < 45_000 || gap > 600_000) {
    throw new Error("GEOFENCE_INTERVAL_REJECTED");
  }
  const canonical = JSON.stringify({
    version: 1,
    employeeId: request.employeeId,
    shiftId: request.shiftId,
    checkInLogId: request.checkInLogId,
    siteId: request.siteId,
    first: {
      capturedAt: request.first.capturedAt,
      latitude: request.first.latitude,
      longitude: request.first.longitude,
      accuracyMeters: request.first.accuracyMeters,
      mocked: request.first.mocked,
    },
    second: {
      capturedAt: request.second.capturedAt,
      latitude: request.second.latitude,
      longitude: request.second.longitude,
      accuracyMeters: request.second.accuracyMeters,
      mocked: request.second.mocked,
    },
  });
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical));
  return Array.from(new Uint8Array(digest)).map(n => n.toString(16).padStart(2, "0")).join("");
}

// Call ONLY on a payload returned by Google's decodeIntegrityToken endpoint,
// NEVER on a decoded token or verdict supplied directly by a mobile client.
export function evaluateGooglePlayVerdict(payload: unknown, expected: PlayIntegrityExpected): IntegrityDecision {
  const fail = (reason: IntegrityDecision["reason"]): IntegrityDecision =>
    ({ accepted: false, reason });
  if (!hexString(expected.requestHash, 64) || !nonEmptyString(expected.packageName) ||
      !nonEmptyString(expected.certificateSha256Digest) || !Number.isFinite(expected.nowMillis)) {
    return fail("INVALID_REQUEST");
  }
  const root = objectOf(payload);
  const request = objectOf(root?.requestDetails);
  const app = objectOf(root?.appIntegrity);
  const device = objectOf(root?.deviceIntegrity);
  if (!request || !app || !device) return fail("INVALID_REQUEST");

  const timestamp = typeof request.timestampMillis === "string"
    ? Number(request.timestampMillis) : request.timestampMillis;
  if (typeof timestamp !== "number" || !Number.isSafeInteger(timestamp) ||
      timestamp > expected.nowMillis + 10_000 ||
      timestamp < expected.nowMillis - 120_000) {
    return fail("STALE_OR_FUTURE_VERDICT");
  }
  if (request.requestPackageName !== expected.packageName) return fail("WRONG_PACKAGE");
  if (request.requestHash !== expected.requestHash) return fail("REQUEST_HASH_MISMATCH");
  if (app.appRecognitionVerdict !== "PLAY_RECOGNIZED" ||
      app.packageName !== expected.packageName) return fail("UNRECOGNIZED_APP");

  const certificates = app.certificateSha256Digest;
  if (!Array.isArray(certificates) ||
      !certificates.includes(expected.certificateSha256Digest)) {
    return fail("WRONG_SIGNING_CERTIFICATE");
  }
  const deviceVerdicts = device.deviceRecognitionVerdict;
  if (!Array.isArray(deviceVerdicts) ||
      !deviceVerdicts.includes("MEETS_DEVICE_INTEGRITY")) {
    return fail("UNTRUSTED_DEVICE");
  }
  return { accepted: true, reason: "VERIFIED_APP_DEVICE" };
}

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
};

function base64Url(input: Uint8Array): string {
  let binary = "";
  for (const byte of input) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/=+$/gu, "");
}

function toBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function toCryptoBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

async function createServiceJwt(account: GoogleServiceAccount, nowMillis: number): Promise<string> {
  const pem = account.private_key;
  if (!nonEmptyString(account.client_email) || !nonEmptyString(pem) ||
      !pem.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error("GOOGLE_CREDENTIALS_UNAVAILABLE");
  }
  const body = pem.replace(/-----BEGIN PRIVATE KEY-----/gu, "")
    .replace(/-----END PRIVATE KEY-----/gu, "").replace(/\s/gu, "");
  let der: Uint8Array;
  try {
    der = Uint8Array.from(atob(body), ch => ch.charCodeAt(0));
  } catch {
    throw new Error("GOOGLE_CREDENTIALS_UNAVAILABLE");
  }
  const key = await crypto.subtle.importKey("pkcs8", toCryptoBuffer(der), {
    name: "RSASSA-PKCS1-v1_5", hash: "SHA-256",
  }, false, ["sign"]);
  const nowSec = Math.floor(nowMillis / 1000);
  const header = base64Url(toBytes(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64Url(toBytes(JSON.stringify({
    iss: account.client_email,
    scope: "https://www.googleapis.com/auth/playintegrity",
    aud: "https://oauth2.googleapis.com/token",
    iat: nowSec,
    exp: nowSec + 300,
  })));
  const unsigned = header + "." + claims;
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, toCryptoBuffer(toBytes(unsigned)));
  return unsigned + "." + base64Url(new Uint8Array(signature));
}

// Server-to-server verification. No Google OAuth token or private key is exposed to ANIMA.
export async function decodeGooglePlayIntegrityToken(
  integrityToken: string,
  packageName: string,
  account: GoogleServiceAccount,
  nowMillis: number,
  fetcher: typeof fetch = fetch,
): Promise<unknown> {
  if (typeof integrityToken !== "string" || integrityToken.length < 16 ||
      integrityToken.length > 16_384 ||
      !/^[a-zA-Z][a-zA-Z0-9_.]{2,150}$/u.test(packageName)) {
    throw new Error("GOOGLE_VERIFICATION_UNAVAILABLE");
  }
  try {
    const jwt = await createServiceJwt(account, nowMillis);
    const tokenResponse = await fetcher("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!tokenResponse.ok) throw new Error("GOOGLE_VERIFICATION_UNAVAILABLE");
    const oauth = objectOf(await tokenResponse.json());
    if (!nonEmptyString(oauth?.access_token)) throw new Error("GOOGLE_VERIFICATION_UNAVAILABLE");
    const api = "https://playintegrity.googleapis.com/v1/" +
      packageName + ":decodeIntegrityToken";
    const decodedResponse = await fetcher(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + oauth.access_token,
      },
      body: JSON.stringify({ integrity_token: integrityToken }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!decodedResponse.ok) throw new Error("GOOGLE_VERIFICATION_UNAVAILABLE");
    const result = objectOf(await decodedResponse.json());
    if (!result || !objectOf(result.tokenPayloadExternal)) {
      throw new Error("GOOGLE_VERIFICATION_UNAVAILABLE");
    }
    return result.tokenPayloadExternal;
  } catch {
    // Never propagate Google error bodies, service credentials or raw tokens.
    throw new Error("GOOGLE_VERIFICATION_UNAVAILABLE");
  }
}
