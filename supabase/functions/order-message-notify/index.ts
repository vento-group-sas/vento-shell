import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sendExpoPush(
  messages: Array<{
    to: string;
    title: string;
    body: string;
    data: Record<string, unknown>;
    sound: "default";
    priority: "high";
  }>,
) {
  const invalidTokens = new Set<string>();

  for (let index = 0; index < messages.length; index += 100) {
    const chunk = messages.slice(index, index + 100);
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chunk),
    });

    const payload = await response.json().catch(() => null);
    const results = Array.isArray(payload?.data) ? payload.data : [];

    results.forEach((item: any, itemIndex: number) => {
      if (item?.status === "error" && item?.details?.error === "DeviceNotRegistered") {
        const token = chunk[itemIndex]?.to;
        if (token) invalidTokens.add(token);
      }
    });
  }

  return Array.from(invalidTokens);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "method_not_allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("authorization") ?? "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return jsonResponse({ error: "missing_supabase_config" }, 500);
  }

  if (!bearer) return jsonResponse({ error: "unauthorized" }, 401);

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${bearer}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData?.user) return jsonResponse({ error: "unauthorized" }, 401);

  let payload: { message_id?: string };
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const messageId = String(payload.message_id ?? "").trim();
  if (!UUID_REGEX.test(messageId)) return jsonResponse({ error: "invalid_message_id" }, 400);

  const { data: message, error: messageError } = await userClient
    .from("order_messages")
    .select("id,conversation_id,order_id,site_id,author_id,author_type,body,created_at")
    .eq("id", messageId)
    .maybeSingle();

  if (messageError || !message) {
    return jsonResponse({ error: messageError?.message ?? "message_not_found" }, 404);
  }

  if (message.author_id !== authData.user.id || message.author_type !== "staff") {
    return jsonResponse({ error: "forbidden" }, 403);
  }

  const { data: conversation, error: conversationError } = await admin
    .from("order_conversations")
    .select("id,client_id,order_id")
    .eq("id", message.conversation_id)
    .maybeSingle();

  if (conversationError || !conversation) {
    return jsonResponse({ error: conversationError?.message ?? "conversation_not_found" }, 404);
  }

  const { data: tokens, error: tokensError } = await admin
    .from("client_push_tokens")
    .select("token")
    .eq("user_id", conversation.client_id)
    .eq("is_active", true)
    .eq("notifications_enabled", true);

  if (tokensError) return jsonResponse({ error: tokensError.message }, 500);

  const orderLabel = `#${String(message.order_id).slice(0, 8).toUpperCase()}`;
  const preview = String(message.body ?? "").trim().slice(0, 140);
  const pushMessages = ((tokens ?? []) as Array<{ token: string }>).map((row) => ({
    to: row.token,
    title: `Nuevo mensaje del pedido ${orderLabel}`,
    body: preview || "El equipo de Vento te escribió sobre tu pedido.",
    sound: "default" as const,
    priority: "high" as const,
    data: {
      type: "order_message",
      orderId: message.order_id,
      orderLabel,
      conversationId: message.conversation_id,
      messageId: message.id,
    },
  }));

  const invalidTokens = await sendExpoPush(pushMessages);
  if (invalidTokens.length > 0) {
    await admin.from("client_push_tokens").update({ is_active: false }).in("token", invalidTokens);
  }

  return jsonResponse({ ok: true, sent: pushMessages.length });
});
