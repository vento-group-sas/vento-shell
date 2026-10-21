import type { SupabaseClient } from "@supabase/supabase-js";

import type { ContextSimulationInput, EffectiveContext } from "./types.js";

export async function getEffectiveContext(
  supabase: SupabaseClient,
  appCode: string,
): Promise<EffectiveContext | null> {
  const { data, error } = await supabase.rpc("get_effective_context_v1", {
    p_app_code: appCode,
  });

  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return (row as EffectiveContext | null) ?? null;
}

export async function hasEffectivePermission(
  supabase: SupabaseClient,
  permissionCode: string,
  appCode?: string | null,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_effective_permission_v1", {
    p_permission_code: permissionCode,
    p_app_code: appCode ?? null,
  });

  if (error) throw error;
  return Boolean(data);
}

export async function startContextSimulation(
  supabase: SupabaseClient,
  input: ContextSimulationInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("start_context_simulation_v1", {
    p_site_id: input.siteId,
    p_area_id: input.areaId ?? null,
    p_operational_role: input.operationalRole ?? null,
    p_administrative_role: input.administrativeRole ?? null,
    p_duration_minutes: input.durationMinutes ?? 240,
    p_metadata: input.metadata ?? {},
  });

  if (error) throw error;
  return String(data);
}

export async function stopContextSimulation(
  supabase: SupabaseClient,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("stop_context_simulation_v1");
  if (error) throw error;
  return Boolean(data);
}
