// Compile-only positive and adversarial evidence; no runtime operations.
import type { AuthorizationDecisionV1 } from "./authorization-decision-v1.types.js";

declare const decision: AuthorizationDecisionV1;
const stableFamily: "vento.authorization.response-contracts" = decision.contract_family;
const stableVersion: "1.0.0" = decision.contract_version;
const outcome: "ALLOW" | "DENY" = decision.final_decision.outcome;
const auditOutcome: "ALLOW" | "DENY" = decision.audit.outcome;
const requestKind: AuthorizationDecisionV1["request"]["operation_kind"] = "APP_ACCESS";
const nonResource: AuthorizationDecisionV1["request"]["resource_request"] = { mode: "NON_RESOURCE" };
const existingResource: AuthorizationDecisionV1["request"]["resource_request"] = {
  mode: "EXISTING_RESOURCE", locator: { opaque_id: "item" },
};
void [stableFamily, stableVersion, outcome, auditOutcome, requestKind, nonResource, existingResource];

// @ts-expect-error Unsupported response family may not silently upgrade.
const invalidFamily: AuthorizationDecisionV1["contract_family"] = "other.authorization";
// @ts-expect-error Unsupported version may not silently upgrade.
const invalidVersion: AuthorizationDecisionV1["schema_version"] = "2.0.0";
// @ts-expect-error Simulation is not a real authorization outcome.
const simulatedOutcome: AuthorizationDecisionV1["final_decision"]["outcome"] = "WOULD_ALLOW";
// @ts-expect-error A caller cannot select actor in a NON_RESOURCE request.
const injectedActor: AuthorizationDecisionV1["request"]["resource_request"] = { mode: "NON_RESOURCE", actor_id: "spoofed" };
// @ts-expect-error Existing resource must supply an opaque locator.
const missingLocator: AuthorizationDecisionV1["request"]["resource_request"] = { mode: "EXISTING_RESOURCE" };
// @ts-expect-error Audit cannot promote a third authorization lane.
const illegalLane: AuthorizationDecisionV1["audit"]["authorizing_lanes"] = ["ROOT"];
void [invalidFamily, invalidVersion, simulatedOutcome, injectedActor, missingLocator, illegalLane];
