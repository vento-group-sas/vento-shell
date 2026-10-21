// GAP-PKG-004 - candidato local, receptor de evidencia de salida geocerca.
// Google Play Integrity vincula la app/dispositivo y un hash de solicitud,
// pero NO demuestra de forma independiente autenticidad fisica de coordenadas.
// Sin verificador independiente NO se registra evidencia ni se hace checkout.
import { createClient } from "npm:@supabase/supabase-js@2.91.0";
import {
  computeGeofenceRequestHash,
  decodeGooglePlayIntegrityToken,
  evaluateGooglePlayVerdict,
  type GeofenceBoundRequest,
} from "../_shared/geofence-app-integrity.ts";

const MAX_REQUEST_BYTES = 24_000;
const MAX_SAMPLE_AGE_MS = 120_000;
const MAX_CLOCK_SKEW_MS = 10_000;
const commonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function reply(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...commonHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function boundedJson(req: Request): Promise<Record<string, unknown> | null> {
  if (!req.body) return null;
  const reader = req.body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return null;
      }
      parts.push(chunk.value);
    }
  } finally {
    reader.releaseLock();
  }
  try {
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const part of parts) {
      bytes.set(part, offset);
      offset += part.byteLength;
    }
    const data: unknown = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    );
    return isRecord(data) ? data : null;
  } catch {
    return null;
  }
}

function distanceMeters(aLat: number, aLon: number, bLat: number, bLon: number) {
  const radians = Math.PI / 180;
  const deltaLat = (bLat - aLat) * radians;
  const deltaLon = (bLon - aLon) * radians;
  const h = Math.sin(deltaLat / 2) ** 2 +
    Math.cos(aLat * radians) * Math.cos(bLat * radians) *
      Math.sin(deltaLon / 2) ** 2;
  return 12_742_000 * Math.asin(Math.sqrt(Math.max(0, Math.min(1, h))));
}

export async function handleGeofenceEvidence(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: commonHeaders });
  }
  if (req.method !== "POST") return reply(405, { error: "METHOD_NOT_ALLOWED" });

  // Por defecto OFF. No depende ni activa GEOFENCE_AUTO_CLOSE_ENABLED.
  if (Deno.env.get("GEOFENCE_EVIDENCE_RECEIVER_ENABLED") !== "true") {
    return reply(503, { error: "RECEIVER_DISABLED" });
  }
  const bearer = /^Bearer ([^\s]+)$/iu.exec(req.headers.get("Authorization") ?? "");
  if (!bearer) return reply(401, { error: "UNAUTHORIZED" });
  const mime = req.headers.get("Content-Type")?.split(";")[0]?.trim().toLowerCase();
  if (mime !== "application/json") return reply(415, { error: "UNSUPPORTED_MEDIA_TYPE" });

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const packageName = Deno.env.get("GEOFENCE_ANDROID_PACKAGE_NAME");
  const certDigest = Deno.env.get("GEOFENCE_ANDROID_CERT_SHA256_DIGEST");
  const accountRaw = Deno.env.get("GOOGLE_PLAY_SERVICE_ACCOUNT_JSON");
  if (!url || !serviceKey || !packageName || !certDigest || !accountRaw) {
    return reply(503, { error: "VERIFIER_NOT_CONFIGURED" });
  }

  // La credencial privilegiada permanece exclusivamente en la Edge Function.
  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: identity, error: authError } = await admin.auth.getUser(bearer[1]);
  if (authError || !identity.user || identity.user.is_anonymous === true) {
    return reply(401, { error: "UNAUTHORIZED" });
  }

  const body = await boundedJson(req);
  if (!body || typeof body.integrityToken !== "string" ||
    body.integrityToken.length < 16 || body.integrityToken.length > 16_384) {
    return reply(400, { error: "INVALID_REQUEST" });
  }
  const request = body as unknown as GeofenceBoundRequest;
  let requestHash: string;
  try {
    requestHash = await computeGeofenceRequestHash(request);
  } catch {
    return reply(422, { error: "INVALID_SAMPLES" });
  }

  // El esquema ANIMA representa employees.id mediante auth.users.id.
  if (request.employeeId !== identity.user.id) {
    return reply(403, { error: "NOT_OWNED" });
  }
  const now = Date.now();
  if (request.first.capturedAt > now + MAX_CLOCK_SKEW_MS ||
    request.second.capturedAt > now + MAX_CLOCK_SKEW_MS ||
    request.second.capturedAt < now - MAX_SAMPLE_AGE_MS) {
    return reply(422, { error: "STALE_SAMPLES" });
  }

  const { data: employee, error: employeeError } = await admin.from("employees")
    .select("id, is_active").eq("id", identity.user.id).maybeSingle();
  if (employeeError) return reply(503, { error: "AUTHORITY_UNAVAILABLE" });
  if (!employee || employee.is_active !== true) {
    return reply(409, { error: "EMPLOYEE_INACTIVE" });
  }

  const { data: last, error: lastError } = await admin.from("attendance_logs")
    .select("id, action, occurred_at, site_id, shift_id, geofence_site_id")
    .eq("employee_id", identity.user.id)
    .order("occurred_at", { ascending: false })
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(1).maybeSingle();
  if (lastError) return reply(503, { error: "AUTHORITY_UNAVAILABLE" });
  const checkInTime = last ? Date.parse(last.occurred_at) : NaN;
  if (!last || last.action !== "check_in" ||
    last.id !== request.checkInLogId || last.site_id !== request.siteId ||
    last.shift_id !== request.shiftId || !Number.isFinite(checkInTime) ||
    request.first.capturedAt <= checkInTime) {
    return reply(409, { error: "NO_MATCHING_OPEN_SHIFT" });
  }

  const { data: shift, error: shiftError } = await admin.from("employee_shifts")
    .select("id, employee_id, site_id, shift_kind, published_at, status")
    .eq("id", request.shiftId).eq("employee_id", identity.user.id).maybeSingle();
  if (shiftError) return reply(503, { error: "AUTHORITY_UNAVAILABLE" });
  if (!shift || shift.site_id !== request.siteId ||
    shift.shift_kind !== "laboral" || !shift.published_at ||
    shift.status === "cancelled") {
    return reply(409, { error: "SHIFT_NOT_ELIGIBLE" });
  }

  const { data: openBreak, error: breakError } = await admin.from("attendance_breaks")
    .select("id").eq("employee_id", identity.user.id).is("ended_at", null)
    .limit(1).maybeSingle();
  if (breakError) return reply(503, { error: "AUTHORITY_UNAVAILABLE" });
  if (openBreak) return reply(409, { error: "ACTIVE_BREAK" });

  const geofenceSiteId = last.geofence_site_id ?? last.site_id;
  const { data: site, error: siteError } = await admin.from("sites")
    .select("id, is_active, latitude, longitude, checkin_radius_meters")
    .eq("id", geofenceSiteId).maybeSingle();
  if (siteError) return reply(503, { error: "AUTHORITY_UNAVAILABLE" });
  if (!site || site.is_active !== true ||
    site.latitude == null || site.longitude == null) {
    return reply(409, { error: "GEOFENCE_UNAVAILABLE" });
  }
  const latitude = Number(site.latitude);
  const longitude = Number(site.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    return reply(409, { error: "GEOFENCE_UNAVAILABLE" });
  }

  const { data: policy, error: policyError } = await admin.from("site_attendance_policy")
    .select("requires_geofence, checkin_radius_meters")
    .eq("site_id", geofenceSiteId).maybeSingle();
  if (policyError) return reply(503, { error: "AUTHORITY_UNAVAILABLE" });
  if (policy?.requires_geofence === false) {
    return reply(409, { error: "GEOFENCE_NOT_REQUIRED" });
  }
  const rawRadius = Number(policy?.checkin_radius_meters ??
    site.checkin_radius_meters ?? 50);
  if (!Number.isFinite(rawRadius) || rawRadius < 0) {
    return reply(409, { error: "GEOFENCE_UNAVAILABLE" });
  }
  const radius = Math.max(200, rawRadius);
  for (const sample of [request.first, request.second]) {
    if (distanceMeters(sample.latitude, sample.longitude, latitude, longitude) -
      sample.accuracyMeters <= radius) {
      return reply(422, { error: "OUTSIDE_NOT_ESTABLISHED" });
    }
  }

  let googleAccount: { client_email: string; private_key: string };
  try {
    const decoded: unknown = JSON.parse(accountRaw);
    if (!isRecord(decoded) || typeof decoded.client_email !== "string" ||
      typeof decoded.private_key !== "string") throw new Error("INVALID_ACCOUNT");
    googleAccount = {
      client_email: decoded.client_email,
      private_key: decoded.private_key,
    };
  } catch {
    return reply(503, { error: "VERIFIER_NOT_CONFIGURED" });
  }

  let verifiedPayload: unknown;
  try {
    verifiedPayload = await decodeGooglePlayIntegrityToken(
      body.integrityToken, packageName, googleAccount, now,
    );
  } catch {
    return reply(503, { error: "INTEGRITY_PROVIDER_UNAVAILABLE" });
  }
  const verdict = evaluateGooglePlayVerdict(verifiedPayload, {
    packageName, certificateSha256Digest: certDigest,
    requestHash, nowMillis: now,
  });
  if (!verdict.accepted) return reply(403, { error: "INTEGRITY_NOT_VERIFIED" });

  // Una app legitima puede aportar GPS manipulado. Sin prueba geografica
  // independiente NO se inserta attendance_geofence_verified_evidence,
  // NO se ejecuta apply_geofence_auto_checkout_v1 y NO se modifica asistencia.
  return reply(200, {
    status: "APP_DEVICE_VERIFIED_GPS_UNATTESTED",
    evidenceRecorded: false,
    eligibleForAutomaticCheckout: false,
  });
}

Deno.serve(handleGeofenceEvidence);
