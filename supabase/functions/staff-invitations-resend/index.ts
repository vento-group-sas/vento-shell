/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck — Edge Function de Deno; el IDE usa Node y marca errores falsos. Al desplegar en Supabase funciona.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const OWNER_ROLE = "propietario"
const GLOBAL_MANAGER_ROLE = "gerente_general"
const MANAGER_ROLE = "gerente"
const MANAGEMENT_ROLES = new Set([OWNER_ROLE, GLOBAL_MANAGER_ROLE, MANAGER_ROLE])

function buildJsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}


// A short-lived CAS reservation ensures an invitation cannot be cancelled
// by the sibling cancel handler while a resend is being delivered.
const RESEND_CLAIM_TTL_MS = 90_000

function hasActiveResendClaim(metadata: unknown): boolean {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return false
  const claim = (metadata as Record<string, unknown>).resend_claim
  if (!claim || typeof claim !== "object" || Array.isArray(claim)) return false
  const expiration = Date.parse(String((claim as Record<string, unknown>).expires_at ?? ""))
  return Number.isFinite(expiration) && expiration > Date.now()
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return buildJsonResponse({ error: "Method not allowed" }, 405)
  }

  const supabaseUrl =
    Deno.env.get("SUPABASE_URL") ?? Deno.env.get("EXPO_PUBLIC_SUPABASE_URL")
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

  if (!supabaseUrl || !serviceKey) {
    return buildJsonResponse({ error: "Missing Supabase config" }, 500)
  }

  const authHeader = req.headers.get("Authorization") ?? ""
  const token = authHeader.replace("Bearer ", "").trim()
  if (!token) {
    return buildJsonResponse({ error: "Unauthorized" }, 401)
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData?.user) {
    return buildJsonResponse({ error: "Unauthorized" }, 401)
  }

  const { data: employee } = await supabase
    .from("employees")
    .select("id, role, site_id")
    .eq("id", userData.user.id)
    .maybeSingle()

  if (!employee || !MANAGEMENT_ROLES.has(employee.role)) {
    return buildJsonResponse({ error: "Forbidden" }, 403)
  }

  let payload: { staff_invitation_id?: string } = {}
  try {
    payload = await req.json()
  } catch {
    return buildJsonResponse({ error: "Invalid JSON" }, 400)
  }

  const invitationId = String(payload.staff_invitation_id ?? "").trim()
  if (!invitationId) {
    return buildJsonResponse({ error: "Missing invitation id" }, 400)
  }

  const { data: invitation, error: invitationError } = await supabase
    .from("staff_invitations")
    .select(`
      id,
      email,
      full_name,
      status,
      resend_count,
      role_code,
      staff_role,
      site_id,
      staff_site_id,
      auth_user_id,
      employee_id,
      updated_at,
      metadata
    `)
    .eq("id", invitationId)
    .maybeSingle()

  if (invitationError) {
    return buildJsonResponse({ error: invitationError.message }, 500)
  }

  if (!invitation) {
    return buildJsonResponse({ error: "Invitation not found" }, 404)
  }

  const siteId = String(invitation.site_id ?? invitation.staff_site_id ?? "").trim()
  const role = String(invitation.role_code ?? invitation.staff_role ?? "").trim()
  const email = String(invitation.email ?? "").trim().toLowerCase()
  const fullName = invitation.full_name ? String(invitation.full_name).trim() : null

  if (!siteId || !role || !email) {
    return buildJsonResponse({ error: "Invitation data incomplete" }, 400)
  }

  if (employee.role === MANAGER_ROLE && employee.site_id !== siteId) {
    return buildJsonResponse({ error: "Forbidden site" }, 403)
  }

  if (invitation.status === "accepted") {
    return buildJsonResponse({ error: "Invitation already accepted" }, 409)
  }

  if (invitation.status === "cancelled") {
    return buildJsonResponse({ error: "Invitation cancelled" }, 409)
  }

  if (invitation.status !== "sent" && invitation.status !== "failed" &&
      invitation.status !== "linked_existing_user") {
    return buildJsonResponse({ error: "Invitation cannot be resent" }, 409)
  }

  if (!invitation.auth_user_id && invitation.status === "failed") {
    return buildJsonResponse({ error: "Invitation cannot be resent without an Auth identity" }, 409)
  }

  if (invitation.status === "linked_existing_user") {
    return buildJsonResponse(
      {
        error:
          "Este usuario ya existía en el sistema. Indícale que use «¿Olvidaste tu contraseña?» en ANIMA si necesita crear una contraseña.",
      },
      409,
    )
  }

  // Do not replay a queued, in-flight or uncertain event. A lost Resend
  // acknowledgement must be reconciled before generating another token.
  const { data: unresolved, error: unresolvedError } = await supabase.rpc(
    "has_unresolved_staff_invitation_delivery_v1",
    { p_invitation_id: invitationId },
  )
  if (unresolvedError || unresolved !== false) {
    return buildJsonResponse({ error: "Invitation mail delivery requires reconciliation" }, 409)
  }

  if (hasActiveResendClaim(invitation.metadata)) {
    return buildJsonResponse({ error: "Invitation resend already in progress" }, 409)
  }

  const setPasswordWebUrl =
    Deno.env.get("SET_PASSWORD_WEB_URL") ??
    Deno.env.get("EXPO_PUBLIC_ANIMA_AUTH_REDIRECT_URL") ??
    Deno.env.get("INVITE_REDIRECT_URL") ??
    ""

  if (!setPasswordWebUrl) {
    return buildJsonResponse(
      {
        error:
          "Configura SET_PASSWORD_WEB_URL o EXPO_PUBLIC_ANIMA_AUTH_REDIRECT_URL antes de reenviar invitaciones.",
      },
      500,
    )
  }

  const resendKey = Deno.env.get("RESEND_API_KEY")
  const fromEmail =
    Deno.env.get("ANIMA_INVITE_FROM_EMAIL") ?? "ANIMA <onboarding@resend.dev>"

  if (!resendKey) {
    return buildJsonResponse(
      {
        error:
          "Configura RESEND_API_KEY (y opcionalmente ANIMA_INVITE_FROM_EMAIL) para reenviar la invitación.",
      },
      500,
    )
  }

  // Reserve the invitation before contacting Resend. Cancellation reads this
  // claim and cannot win after a successful CAS. If cancellation won earlier,
  // the CAS returns no row and absolutely no email is attempted.
  const previousMetadata =
    invitation.metadata && typeof invitation.metadata === "object" &&
    !Array.isArray(invitation.metadata)
      ? invitation.metadata as Record<string, unknown>
      : {}
  const claimedAt = new Date().toISOString()
  const resendClaim = {
    id: crypto.randomUUID(),
    expires_at: new Date(Date.now() + RESEND_CLAIM_TTL_MS).toISOString(),
  }
  const { data: reservation, error: reservationError } = await supabase
    .from("staff_invitations")
    .update({
      metadata: { ...previousMetadata, resend_claim: resendClaim },
      updated_at: claimedAt,
    })
    .eq("id", invitationId)
    .eq("status", invitation.status)
    .eq("resend_count", invitation.resend_count)
    .eq("updated_at", invitation.updated_at)
    .select("id, updated_at")
    .maybeSingle()

  if (reservationError) {
    return buildJsonResponse({ error: reservationError.message }, 500)
  }
  if (!reservation?.id || !reservation.updated_at) {
    return buildJsonResponse({ error: "Invitation changed during resend" }, 409)
  }
  const { data: deliveryId, error: deliveryClaimError } = await supabase.rpc(
    "claim_staff_invitation_delivery_v1",
    { p_invitation_id: invitationId, p_event_key: `resend:${resendClaim.id}` },
  )
  if (deliveryClaimError || !deliveryId) {
    return buildJsonResponse({ error: "Invitation delivery reservation failed" }, 409)
  }
  async function finishDelivery(state: "delivered" | "rejected" | "uncertain") {
    const { data, error } = await supabase.rpc(
      "finish_staff_invitation_delivery_v1",
      { p_delivery_id: deliveryId, p_delivery_state: state, p_provider_message_id: null },
    )
    return !error && data === true
  }


  // Release only the reservation created by this request. An intervening
  // mutation keeps its own state and is never overwritten by cleanup.
  async function releaseClaim(): Promise<boolean> {
    // No email was accepted: reconcile this exact outbox event first.
    if (!await finishDelivery("rejected")) return false
    const { data: released, error: releaseError } = await supabase
      .from("staff_invitations")
      .update({
        metadata: previousMetadata,
        updated_at: new Date().toISOString(),
      })
      .eq("id", invitationId)
      .eq("status", invitation.status)
      .eq("resend_count", invitation.resend_count)
      .eq("updated_at", reservation.updated_at)
      .select("id")
      .maybeSingle()
    return !releaseError && Boolean(released?.id)
  }

  let linkResult
  try {
    linkResult = await supabase.auth.admin.generateLink({
      type: "invite",
      email,
      options: {
        redirectTo: setPasswordWebUrl || undefined,
        data: {
          full_name: fullName,
        },
      },
    })
  } catch {
    if (!await releaseClaim()) {
      return buildJsonResponse({ error: "Invitation changed during link generation" }, 409)
    }
    return buildJsonResponse({ error: "Invite link failed" }, 502)
  }
  const { data: linkData, error: linkError } = linkResult

  if (linkError) {
    if (!await releaseClaim()) {
      return buildJsonResponse({ error: "Invitation changed during link generation" }, 409)
    }
    return buildJsonResponse({ error: linkError.message ?? "Invite link failed" }, 400)
  }

  // Auth identity may be re-provisioned after an earlier failed invitation.
  // Persist only the exact account returned for the canonical invite email.
  const generatedUser = linkData?.user
  if (!generatedUser?.id || generatedUser.email?.trim().toLowerCase() !== email) {
    if (!await releaseClaim()) {
      return buildJsonResponse({ error: "Invitation changed during link generation" }, 409)
    }
    return buildJsonResponse({ error: "Invitation Auth identity mismatch" }, 409)
  }

  const linkProps =
    (linkData as {
      properties?: {
        action_link?: string
        hashed_token?: string
        verification_type?: string
      }
    })?.properties ?? null
  const actionLink = linkProps?.action_link ?? null
  const hashedToken = linkProps?.hashed_token ?? null
  const verificationType = linkProps?.verification_type ?? "invite"
  const normalizedSetPasswordUrl = setPasswordWebUrl.replace(/\/+$/, "")
  const tokenHashLink =
    hashedToken
      ? `${normalizedSetPasswordUrl}?token_hash=${encodeURIComponent(hashedToken)}&type=${encodeURIComponent(verificationType)}`
      : null
  const emailActionLink = tokenHashLink || actionLink

  if (!emailActionLink) {
    if (!await releaseClaim()) {
      return buildJsonResponse({ error: "Invitation changed during link generation" }, 409)
    }
    return buildJsonResponse({ error: "No invite link generated" }, 500)
  }

  const inviteSubject = "Invitación a ANIMA – Crear contraseña"
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Invitación ANIMA</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;padding:24px;background:#f5f5f5;">
  <div style="max-width:400px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <h1 style="font-size:1.35rem;margin:0 0 8px;color:#1a1a1a;">Invitación a ANIMA</h1>
    <p style="color:#666;font-size:0.95rem;margin-bottom:20px;">Te reenviamos el acceso para crear tu contraseña y empezar a usar ANIMA.</p>
    <p style="margin:24px 0;"><a href="${emailActionLink}" style="display:inline-block;padding:14px 24px;background:#e2006a;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Crear contraseña</a></p>
    <p style="color:#888;font-size:0.85rem;">Si el botón no funciona, copia y pega este enlace en el navegador:</p>
    <p style="word-break:break-all;font-size:0.8rem;color:#666;">${emailActionLink}</p>
  </div>
</body>
</html>`


  // Each outbox event has one provider idempotency identity. Unknown
  // delivery outcomes stay blocked for operator reconciliation, never replay.
  let deliveryOutcome: "delivered" | "rejected" | "uncertain" = "uncertain"
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
        "Idempotency-Key": deliveryId,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: inviteSubject,
        html,
      }),
      signal: AbortSignal.timeout(20_000),
    })
    deliveryOutcome = res.ok ? "delivered" :
      (res.status >= 500 || res.status === 409 ? "uncertain" : "rejected")
  } catch {
    deliveryOutcome = "uncertain"
  }

  if (deliveryOutcome === "rejected") {
    if (!await releaseClaim()) {
      return buildJsonResponse({ error: "Invitation changed during failed resend" }, 409)
    }
    return buildJsonResponse({ error: "Mail provider rejected delivery" }, 502)
  }
  if (deliveryOutcome === "uncertain") {
    if (!await finishDelivery("uncertain")) {
      return buildJsonResponse({ error: "Invitation delivery outcome not persisted" }, 409)
    }
    return buildJsonResponse({
      error: "Mail provider confirmation missing; manual reconciliation required",
    }, 502)
  }
  if (!await finishDelivery("delivered")) {
    return buildJsonResponse({ error: "Mail accepted but delivery result was not committed" }, 409)
  }

  const now = new Date().toISOString()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  const inviteTokenHash = hashedToken ? await sha256Hex(hashedToken) : null
  const resendCount = Number(invitation.resend_count ?? 0) + 1

  const { data: updated, error: updateError } = await supabase
    .from("staff_invitations")
    .update({
      status: "sent",
      auth_user_id: generatedUser.id,
      employee_id: null,
      last_sent_at: now,
      expires_at: expiresAt,
      expired_at: expiresAt,
      resend_count: resendCount,
      invite_token_hash: inviteTokenHash,
      updated_at: now,
      metadata: {
        ...previousMetadata,
        source: "staff-invitations-resend",
        verification_type: verificationType,
        resent_by: userData.user.id,
      },
    })
    .eq("id", invitationId)
    .eq("status", invitation.status)
    .eq("resend_count", invitation.resend_count)
    .eq("updated_at", reservation.updated_at)
    .select("id")
    .maybeSingle()

  if (updateError) {
    return buildJsonResponse({ error: updateError.message }, 500)
  }
  if (!updated?.id) {
    // Delivery already happened; never claim it was rolled back.
    return buildJsonResponse({ error: "Invitation changed after email delivery" }, 409)
  }

  return buildJsonResponse({
    ok: true,
    invitation_id: invitationId,
    status: "sent",
    resend_count: resendCount,
    email,
    message: "Invitación reenviada correctamente.",
  })
})
