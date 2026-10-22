import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

async function completeInvitation(
  supabase: ReturnType<typeof createClient>,
  params: {
    invitationId: string
    userId: string
    email: string
    fullName: string
    alias: string | null
  },
) {
  const { data, error } = await supabase.rpc("complete_staff_invitation_v1", {
    p_invitation_id: params.invitationId,
    p_auth_user_id: params.userId,
    p_email: params.email,
    p_full_name: params.fullName,
    p_alias: params.alias,
    p_completion_status: "accepted",
  })
  if (error) throw error
  return data === true
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

  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase config" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const authHeader = req.headers.get("Authorization") ?? ""
  const accessToken = authHeader.replace("Bearer ", "").trim()
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  let payload: {
    password?: string
    full_name?: string | null
    alias?: string | null
    role?: string | null
    site_id?: string | null
  } = {}

  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const password = payload.password

  if (!password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (password.length < 8) {
    return new Response(JSON.stringify({ error: "Weak password" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  const { data: userData, error: userError } =
    await supabase.auth.getUser(accessToken)

  if (userError || !userData?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const user = userData.user
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>
  const trustedEmail = user.email?.trim().toLowerCase()
  if (!trustedEmail || !user.email_confirmed_at) {
    return new Response(JSON.stringify({ error: "Verified email required" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // Role and site come exclusively from a live server-side invitation.
  const { data: invitation, error: invitationError } = await supabase
    .from("staff_invitations")
    .select("id,role_code,staff_role,site_id,staff_site_id")
    .eq("auth_user_id", user.id)
    .eq("email", trustedEmail)
    .eq("status", "sent")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (invitationError || !invitation) {
    return new Response(JSON.stringify({ error: "Valid invitation required" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const role = String(invitation.role_code ?? invitation.staff_role ?? "").trim()
  const siteId = String(invitation.site_id ?? invitation.staff_site_id ?? "").trim()
  const inconsistentInvitation =
    (invitation.role_code && invitation.staff_role && invitation.role_code !== invitation.staff_role) ||
    (invitation.site_id && invitation.staff_site_id && invitation.site_id !== invitation.staff_site_id)
  if (!role || !siteId || inconsistentInvitation ||
      (payload.role != null && payload.role.trim() !== role) ||
      (payload.site_id != null && payload.site_id.trim() !== siteId)) {
    return new Response(JSON.stringify({ error: "Invitation scope mismatch" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const { data: roleRow } = await supabase
    .from("roles")
    .select("code, is_active")
    .eq("code", role)
    .maybeSingle()

  if (!roleRow || roleRow.is_active === false) {
    return new Response(JSON.stringify({ error: "Invalid role" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const { data: siteRow } = await supabase
    .from("sites")
    .select("id, is_active")
    .eq("id", siteId)
    .maybeSingle()

  if (!siteRow || siteRow.is_active === false) {
    return new Response(JSON.stringify({ error: "Invalid site" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  let fullName = String(payload.full_name ?? meta.full_name ?? "").trim()
  if (!fullName) {
    if (user.email) {
      const { data: userProfile } = await supabase
        .from("users")
        .select("full_name")
        .eq("email", user.email)
        .maybeSingle()
      fullName = (userProfile?.full_name ?? "").trim()
    }
  }
  if (!fullName) {
    return new Response(JSON.stringify({ error: "Missing full name" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const aliasValue = String(
    payload.alias ?? (typeof meta.alias === "string" ? meta.alias : ""),
  ).trim()

  // Auth is separate from Postgres. Updating credentials cannot grant staff
  // permissions: the database RPC below is the only activation boundary.
  // Client-editable metadata never defines employee role or site.
  const mergedMeta = {
    ...meta,
    full_name: fullName,
    ...(aliasValue ? { alias: aliasValue } : {}),
  }
  delete mergedMeta.role
  delete mergedMeta.site_id

  const { error: updateAuthError } =
    await supabase.auth.admin.updateUserById(user.id, {
      password,
      user_metadata: mergedMeta,
    })

  if (updateAuthError) {
    return new Response(JSON.stringify({ error: "Authentication setup failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  try {
    const accepted = await completeInvitation(supabase, {
      invitationId: invitation.id,
      userId: user.id,
      email: trustedEmail,
      fullName,
      alias: aliasValue || null,
    })
    if (!accepted) {
      return new Response(JSON.stringify({ error: "Invitation no longer available" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    console.error("[staff-invitations-accept] completion failed:", error)
    return new Response(JSON.stringify({ error: "Staff activation failed; retry safely" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({ user_id: user.id, email: user.email ?? null }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  )
})
