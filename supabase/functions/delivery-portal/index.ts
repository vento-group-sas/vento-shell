import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const client = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false } },
);

const esc = (v: unknown) => String(v ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const obj = (v: unknown): Record<string, any> =>
  v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, any> : {};

const messageFor = (code: string, remaining?: number) => ({
  invalid_token: "El enlace no es válido.",
  session_expired: "El enlace venció.",
  payment_not_approved: "El pago aún no está aprobado.",
  invalid_order_state: "El pedido todavía no está listo para salir.",
  delivery_not_in_transit: "Primero marca el pedido en camino.",
  pin_invalid_format: "El PIN debe tener seis dígitos.",
  incorrect_pin: `PIN incorrecto. Quedan ${remaining ?? 0} intentos.`,
  attempts_exhausted: "Se agotaron los intentos. Contacta a Vento.",
  issue_code_required: "Selecciona una novedad.",
}[code] ?? "No fue posible completar la operación.");

function page(token: string, data: any) {
  const order = obj(data.order);
  const session = obj(data.session);
  const gift = data.gift ? obj(data.gift) : null;
  const address = obj(order.delivery_address);
  const addressLine = address.address_line || address.line || address.address || address.formatted_address || "Dirección no registrada";
  const detail = address.reference || address.address_reference || address.details || "";
  const recipient = gift?.recipient_name || address.contact_name || address.recipient_name || "";
  const phone = gift?.recipient_phone || order.contact_phone || "";
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(addressLine))}`;
  const status = String(session.status || "pending");
  const closed = ["confirmed", "expired", "cancelled", "issue"].includes(status);
  const inTransit = status === "in_transit";
  const labels: Record<string,string> = { pending:"Pendiente de salida", in_transit:"En camino", confirmed:"Entrega confirmada", issue:"Novedad reportada", expired:"Enlace vencido", cancelled:"Cancelado" };

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Entrega Vento</title><style>
  *{box-sizing:border-box}body{margin:0;background:#eef5f7;color:#14313b;font-family:system-ui;padding:18px 14px 50px}main{max-width:620px;margin:auto}.card{background:white;border:1px solid #d8e6ea;border-radius:17px;padding:17px;margin:12px 0}h1{margin:4px 0 8px}h2{font-size:18px;margin:0 0 10px}.tag{display:inline-block;background:#dceff3;border-radius:99px;padding:7px 11px;font-weight:800}.label{color:#62777f;font-size:13px}.value{font-size:16px;font-weight:700;white-space:pre-wrap}button,a.btn,input,select,textarea{width:100%;min-height:48px;border-radius:12px;border:1px solid #c8d8dd;padding:12px;font:inherit;margin:5px 0}button,a.btn{border:0;background:#e5f0f3;color:#0b6177;font-weight:800;text-align:center;text-decoration:none;display:block}.primary{background:#087f9c!important;color:white!important}.danger{background:#fff0f0!important;color:#a32929!important}.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}#pin{font-size:28px;text-align:center;font-weight:900;letter-spacing:.16em}#msg{display:none;padding:12px;border-radius:12px;margin:12px 0}.ok{display:block!important;background:#e7f7ef;color:#17623b}.err{display:block!important;background:#fff0f0;color:#952727}.gift{background:#fff9ed;border-color:#efd399}button:disabled{opacity:.5}</style></head><body><main>
  <div style="color:#087f9c;font-size:12px;font-weight:900;letter-spacing:.12em">VENTO · ENTREGA</div><h1>Pedido #${esc(order.short_id)}</h1><span class="tag">${esc(labels[status] || status)}</span><div id="msg"></div>
  <section class="card"><h2>Destino</h2>${recipient ? `<p><span class="label">Recibe</span><br><span class="value">${esc(recipient)}</span></p>`:""}<p><span class="label">Dirección</span><br><span class="value">${esc(addressLine)}</span></p>${detail?`<p><span class="label">Detalles</span><br><span class="value">${esc(detail)}</span></p>`:""}<div class="grid"><a class="btn primary" href="${esc(maps)}" target="_blank">Abrir Maps</a>${phone?`<a class="btn" href="tel:${esc(phone)}">Llamar</a>`:""}</div></section>
  <section class="card"><h2>Pedido</h2><p><span class="label">Pago</span><br><span class="value">${order.payment_status === "paid" ? "Pagado" : "Pendiente"}</span></p>${order.notes?`<p><span class="label">Instrucciones</span><br><span class="value">${esc(order.notes)}</span></p>`:""}</section>
  ${gift?`<section class="card gift"><h2>Regalo</h2>${gift.is_surprise?"<p><strong>Es sorpresa. No revelar información antes de entregar.</strong></p>":""}${gift.hide_prices?"<p><strong>No mostrar precios ni factura.</strong></p>":""}</section>`:""}
  ${closed?`<section class="card"><h2>${esc(labels[status]||status)}</h2><p>${status==="issue"?"Vento recibió la novedad. El pedido no quedó entregado.":"El flujo de esta entrega está cerrado."}</p></section>`:`
  <section class="card"><h2>Acciones</h2><div class="grid"><button data-action="picked_up" ${session.picked_up_at?"disabled":""}>Recogido</button><button data-action="mark_in_transit" ${inTransit?"disabled":""}>En camino</button></div></section>
  <section class="card"><h2>Confirmar entrega</h2><p>Pide el PIN después de entregar correctamente.</p><input id="pin" inputmode="numeric" maxlength="7" placeholder="000 000" ${inTransit?"":"disabled"}><button class="primary" data-action="confirm_delivery" ${inTransit?"":"disabled"}>Confirmar con PIN</button></section>
  <section class="card"><h2>Reportar novedad</h2><select id="issue"><option value="">Selecciona</option><option value="client_unreachable">Cliente no responde</option><option value="wrong_address">Dirección incorrecta</option><option value="access_blocked">No se pudo ingresar</option><option value="client_rejected">Cliente rechazó</option><option value="order_incomplete">Pedido incompleto</option><option value="other">Otro</option></select><textarea id="notes" placeholder="Detalle breve"></textarea><button class="danger" data-action="report_issue">Enviar novedad</button></section>`}
<script>const token=${JSON.stringify(token)},msg=document.getElementById('msg');document.querySelectorAll('[data-action]').forEach(b=>b.onclick=async()=>{b.disabled=true;const action=b.dataset.action,body={token,action};if(action==='confirm_delivery')body.pin=document.getElementById('pin').value;if(action==='report_issue'){body.issue_code=document.getElementById('issue').value;body.issue_notes=document.getElementById('notes').value}try{const r=await fetch(location.href,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}),j=await r.json();if(!j.ok){msg.textContent=j.message;msg.className='err';b.disabled=false;return}msg.textContent='Operación registrada.';msg.className='ok';setTimeout(()=>location.reload(),600)}catch(e){msg.textContent='Sin conexión. Intenta nuevamente.';msg.className='err';b.disabled=false}});</script></main></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    const { data, error } = await client.rpc("update_delivery_portal_state", {
      p_token: String(body.token || ""), p_action: String(body.action || ""),
      p_pin: body.pin || null, p_issue_code: body.issue_code || null, p_issue_notes: body.issue_notes || null,
    });
    const result = error ? { ok:false, error:"server_error" } : data;
    return Response.json({ ...result, message: result?.ok ? "Operación registrada." : messageFor(String(result?.error || ""), result?.attempts_remaining) }, { status: result?.ok ? 200 : 400, headers:{"cache-control":"no-store"} });
  }
  const token = new URL(req.url).searchParams.get("token") || "";
  const { data, error } = await client.rpc("get_delivery_portal_data_by_token", { p_token: token });
  if (error || !data?.ok) return new Response("Enlace no disponible", { status:404, headers:{"content-type":"text/plain;charset=utf-8","cache-control":"no-store"} });
  return new Response(page(token, data), { headers:{"content-type":"text/html;charset=utf-8","cache-control":"no-store"} });
});
