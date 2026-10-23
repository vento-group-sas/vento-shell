/**
 * Transitional RPC compatibility, strictly isolated from canonical SDK paths.
 * @deprecated SHELL-AUTH-004/005: do not adopt from new consumers.
 * Consumers: none certified; replacement: /server after SHELL-AUTH-002.
 * Retirement: blocked until consumer inventory, telemetry and version policy.
 */
export {
  getEffectiveContext,
  hasEffectivePermission,
  startContextSimulation,
  stopContextSimulation,
} from "../client.js";

export type {
  ContextSimulationInput,
  EffectiveContext,
  EffectiveContextSource,
} from "../types.js";
