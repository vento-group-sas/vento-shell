import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "method_not_allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("authorization") ?? "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "missing_supabase_config" }, 500);
  }

  if (!bearer) return jsonResponse({ error: "unauthorized" }, 401);

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: authData, error: authError } = await admin.auth.getUser(bearer);
  if (authError || !authData?.user) return jsonResponse({ error: "unauthorized" }, 401);

  let payload: {
    token?: string;
    platform?: string;
    permissionStatus?: string;
    notificationsEnabled?: boolean;
    deviceName?: string;
  };

  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const pushToken = String(payload.token ?? "").trim();
  const platform = String(payload.platform ?? "unknown").trim() || "unknown";
  const permissionStatus = String(payload.permissionStatus ?? "").trim() || null;
  const notificationsEnabled =
    typeof payload.notificationsEnabled === "boolean"
      ? payload.notificationsEnabled
      : permissionStatus === "granted";
  const deviceName = String(payload.deviceName ?? "").trim() || null;

  if (!pushToken) return jsonResponse({ error: "missing_token" }, 400);

  const now = new Date().toISOString();
  const { error: upsertError } = await admin.from("client_push_tokens").upsert(
    {
      user_id: authData.user.id,
      token: pushToken,
      platform,
      device_name: deviceName,
      permission_status: permissionStatus,
      notifications_enabled: notificationsEnabled,
      permission_updated_at: now,
      is_active: notificationsEnabled,
      last_seen: now,
    },
    { onConflict: "token" },
  );

  if (upsertError) return jsonResponse({ error: upsertError.message }, 500);

  return jsonResponse({ ok: true });
});
