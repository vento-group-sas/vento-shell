// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

const pemToArrayBuffer = (pem: string) => {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "")
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const issuerId = Deno.env.get("GOOGLE_WALLET_ISSUER_ID")
    const classId = Deno.env.get("GOOGLE_WALLET_CLASS_ID")
    const serviceJson = Deno.env.get("GOOGLE_WALLET_SERVICE_ACCOUNT_JSON")

    if (!issuerId || !classId || !serviceJson) {
      return new Response(
        JSON.stringify({ error: "Missing Google Wallet configuration." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const authHeader = req.headers.get("Authorization") ?? ""
    const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null
    if (!bearer) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase configuration." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${bearer}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data: userRes, error: userErr } = await supabase.auth.getUser()
    if (userErr || !userRes?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const user = userRes.user
    const { data: profile, error: profileErr } = await supabase
      .from("users")
      .select("full_name, loyalty_points, tier")
      .eq("id", user.id)
      .maybeSingle()

    if (profileErr) {
      return new Response(
        JSON.stringify({ error: "Failed to load profile." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const accountName = profile?.full_name || user.email || "Cliente"
    const pointsRaw = Number(profile?.loyalty_points ?? 0)
    const tier = profile?.tier || "Miembro"

    const normalizeTierLabel = (value: string | null | undefined): string => {
      const v = String(value ?? "").trim()
      if (!v) return "Miembro"
      const trimmed = v.replace(/^miembro\s+/i, "").trim()
      if (!trimmed) return "Miembro"
      const low = trimmed.toLowerCase()
      if (low === "bronce") return "Bronce"
      if (low === "plata") return "Plata"
      if (low === "oro") return "Oro"
      if (low === "diamante") return "Diamante"
      return trimmed[0].toUpperCase() + trimmed.slice(1)
    }
    const normalizedTier = normalizeTierLabel(tier)

    const service = JSON.parse(serviceJson)
    const privateKey = await crypto.subtle.importKey(
      "pkcs8",
      pemToArrayBuffer(service.private_key),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    )

    const objectId = `${issuerId}.${user.id}`
    const loyaltyObject = {
      id: objectId,
      classId: `${issuerId}.${classId}`,
      state: "ACTIVE",
      accountId: user.id,
      accountName,
      loyaltyPoints: {
        label: "PUNTOS VENTO",
        balance: { int: Math.trunc(pointsRaw) },
      },
      programName: "Vento Pass",
      barcode: {
        type: "QR_CODE",
        value: `VENTO:${user.id}`,
        alternateText: `Nivel ${normalizedTier}`,
      },
    }

    const jwtPayload = {
      iss: service.client_email,
      aud: "google",
      typ: "savetowallet",
      iat: getNumericDate(new Date()),
      exp: getNumericDate(new Date(Date.now() + 5 * 60 * 1000)),
      payload: {
        loyaltyObjects: [loyaltyObject],
      },
    }

    const jwt = await create({ alg: "RS256", typ: "JWT" }, jwtPayload, privateKey)
    const saveUrl = `https://pay.google.com/gp/v/save/${jwt}`

    return new Response(
      JSON.stringify({ saveUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/wallet-pass' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
