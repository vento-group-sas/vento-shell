/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send"

async function sendPush(messages: { to: string; title: string; body: string; data?: Record<string, unknown> }[]) {
  if (messages.length === 0) return []
  const invalidTokens = new Set<string>()

  for (let i = 0; i < messages.length; i += 100) {
    const chunk = messages.slice(i, i + 100)
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chunk),
    })
    const payload = await response.json().catch(() => null)
    const data = Array.isArray(payload?.data) ? payload.data : []
    data.forEach((item: { status?: string; details?: { error?: string } } | null, index: number) => {
      if (item?.status === "error" && item?.details?.error === "DeviceNotRegistered") {
        const token = chunk[index]?.to
        if (token) invalidTokens.add(token)
      }
    })
  }

  return Array.from(invalidTokens)
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const supabaseUrl =
    Deno.env.get("SUPABASE_URL") ?? Deno.env.get("EXPO_PUBLIC_SUPABASE_URL")
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  const expectedSecret = Deno.env.get("INTERNAL_NOTIFY_SECRET") ?? ""
  const providedSecret = req.headers.get("x-internal-secret") ?? ""

  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase config" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  let body: { ticket_id?: string; message_id?: string; author_id?: string; body?: string } = {}
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (!body.ticket_id || !body.message_id || !body.author_id) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  const { data: ticket, error: ticketError } = await supabase
    .from("support_tickets")
    .select("id, title, created_by, assigned_to, target_employee_id")
    .eq("id", body.ticket_id)
    .maybeSingle()

  if (ticketError || !ticket) {
    return new Response(JSON.stringify({ error: ticketError?.message ?? "Ticket not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const recipientIds = Array.from(
    new Set([ticket.created_by, ticket.assigned_to, ticket.target_employee_id].filter(Boolean)),
  ).filter((id) => id !== body.author_id)

  if (recipientIds.length === 0) {
    return new Response(JSON.stringify({ sent: 0 }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const { data: tokens, error: tokensError } = await supabase
    .from("employee_push_tokens")
    .select("token")
    .eq("is_active", true)
    .eq("notifications_enabled", true)
    .in("employee_id", recipientIds)

  if (tokensError) {
    return new Response(JSON.stringify({ error: tokensError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const preview = String(body.body ?? "").trim().slice(0, 120)
  const messages = ((tokens ?? []) as { token: string }[]).map((row) => ({
    to: row.token,
    title: "Nuevo mensaje de soporte",
    body: preview || ticket.title || "Tienes un mensaje pendiente.",
    data: {
      type: "support_message",
      ticket_id: body.ticket_id,
      message_id: body.message_id,
    },
  }))

  const invalidTokens = await sendPush(messages)
  if (invalidTokens.length > 0) {
    await supabase
      .from("employee_push_tokens")
      .update({ is_active: false })
      .in("token", invalidTokens)
  }

  return new Response(JSON.stringify({ sent: messages.length }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
})
