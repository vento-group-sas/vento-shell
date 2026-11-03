/**
 * VENTO OS - AuthorizationDecisionV1, TYPE-ONLY DRAFT CANDIDATE.
 * Direct canonical type snapshots: AUTH-CTX-002/004 in
 * docs/plan-canonico/modular/bloques/E_CONTEXTO_Y_DECISION/01_CONTRATOS_BASE.md
 * and AUTH-CTX-018 in 04_DECISION_DE_AUTORIZACION.md.
 *
 * Intentionally not in @vento/contracts package exports or dist build.
 * This static shape never verifies evaluator identity, hashes, RLS/RPC,
 * user authority, resource freshness or server-side enforcement.
 * AUTH-DB-033/034, E5, release and consumer adoption remain PENDING.
 */
// AUTH-DB-034 / candidate envelope REQUEST_MODES: these are untrusted
// locator shapes, NOT a resource-resolution grant or an authorized snapshot.
type ResourceLocator = Record<string, unknown>;
type ExistingResourceRequest = {
  mode: "EXISTING_RESOURCE";
  locator: ResourceLocator;
  expected_version?: string;
};
type ResourceDraftRequest = {
  mode: "RESOURCE_DRAFT";
  draft: ResourceLocator;
  idempotency_key?: string;
};
type CollectionRequest = {
  mode: "COLLECTION";
  server_filter: ResourceLocator;
};
type AggregateRequest = {
  mode: "AGGREGATE";
  server_filter: ResourceLocator;
};
type BulkRequest = {
  mode: "BULK";
  items: ResourceLocator[];
  idempotency_key?: string;
};
type NonResourceRequest = { mode: "NON_RESOURCE" };

type ContractMetadata = {
  contract_family: "vento.authorization.response-contracts";
  contract_family_version: "1.0.0";

  contract_name:
    | "AccessContext"
    | "AuthorizationDecision"
    | "SimulationContext"
    | "SimulatedAuthorizationDecision";

  contract_version: string;
  schema_version: string;
};

type AuthorizationDecision = {
  contract_name: "AuthorizationDecision";
  contract_version: string;

  decision_id: string;
  decided_at: string;
  correlation_id: string | null;

  access_context_ref: AccessContextReference;
  request: AuthorizationRequestContext;
  permission_contract: PermissionContractSnapshot;
  resource: ResolvedResourceContext;

  required_lanes: AuthorizationLane[];
  base_decision: LaneDecision;
  operational_decision: LaneDecision;

  prerequisite_decisions: PrerequisiteDecision[];
  device_decision: ConstraintDecision;
  sensitivity_decision: ConstraintDecision;
  field_policy_decision: FieldPolicyDecision;

  matched_allows: MatchedGrant[];
  matched_denies: MatchedDeny[];

  structural_denies: DecisionReason[];
  actor_wide_denies: DecisionReason[];
  lane_denies: DecisionReason[];
  blocked_reasons: DecisionReason[];

  combination: DecisionCombination;
  final_decision: FinalDecision;
  audit: AuthorizationAuditContext;
};

type AccessContextReference = {
  context_id: string;
  context_contract_version: string;
  resolved_at: string;
  actor_type: string;
  actor_id: string | null;
  principal_type: string;
  principal_id: string | null;
  context_fingerprint: string;
};

type AuthorizationRequestContext = {
  app_code: string;
  permission_key: string;

  operation_kind:
    | "READ"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "EXECUTE"
    | "TRANSITION"
    | "EXPORT"
    | "APP_ACCESS";

  resource_request:
    | ExistingResourceRequest
    | ResourceDraftRequest
    | CollectionRequest
    | AggregateRequest
    | BulkRequest
    | NonResourceRequest;

  requested_fields: string[];
  request_source: "SERVER_ACTION" | "RPC" | "RLS" | "API" | "UI_GUARD" | "JOB";
};

type PermissionContractSnapshot = {
  catalog_id: string;
  catalog_version: string;
  catalog_hash: string;

  app_code: string;
  permission_key: string;
  permission_status: "ACTIVE" | "INACTIVE" | "MISSING";

  authorization_requirement:
    | "BASE_ONLY"
    | "OPERATIONAL_ONLY"
    | "BASE_OR_OPERATIONAL"
    | "BASE_AND_OPERATIONAL";

  base_prerequisite: "N" | "NOT_APPLICABLE";
  operational_prerequisite: "T" | "T+C" | "NOT_APPLICABLE";

  requires_active_area: boolean;
  device_policy_code: string | null;
  sensitivity_class: string;
  simulation_policy: string;

  resource_contract_id: string;
  dependency_permission_keys: string[];
};

type ResolvedResourceContext = {
  resource_type: string;
  request_shape:
    | "EXISTING"
    | "DRAFT"
    | "COLLECTION"
    | "AGGREGATE"
    | "BULK"
    | "NON_RESOURCE";

  resolution_status:
    | "RESOLVED"
    | "MULTI_RESOLVED"
    | "NOT_APPLICABLE"
    | "UNRESOLVED"
    | "CONFLICT"
    | "ISOLATED";

  resource_ids: string[];
  resource_version: string | null;

  subject: ResolvedSubjectContext | null;
  territory: ResolvedTerritoryContext;
  ownership: OwnershipContext;
  required_sides: ResolvedSideContext[];

  state_snapshot: Record<string, unknown>;
  field_classification: Record<string, string>;
  concurrency: ConcurrencyContext | null;
};

type ResolvedTerritoryContext = {
  organization_id: string | null;
  business_unit_ids: string[];
  site_ids: string[];
  area_ids: string[];
  area_kinds: string[];
  origin: TerritorySide | null;
  destination: TerritorySide | null;
  route_ids: string[];
  vehicle_ids: string[];
  isolated_environment: boolean;
  source: string;
  coherent: boolean;
};

type AuthorizationLane = "BASE" | "OPERATIONAL";

type LaneDecision = {
  lane: "BASE" | "OPERATIONAL";

  outcome:
    | "ALLOW"
    | "DENY"
    | "NOT_APPLICABLE";

  readiness:
    | "READY"
    | "UNAVAILABLE"
    | "INVALID"
    | "NOT_APPLICABLE";

  evaluated: boolean;
  matched_allow_ids: string[];
  matched_deny_ids: string[];
  reason_codes: string[];
};

type PrerequisiteDecision = {
  prerequisite_type:
    | "PERMISSION_DEPENDENCY"
    | "SHIFT"
    | "CHECKIN"
    | "ACTIVE_AREA"
    | "DEVICE"
    | "REAUTHENTICATION"
    | "RESOURCE_STATE"
    | "OWNERSHIP"
    | "REQUIRED_SIDE"
    | "CONCURRENCY"
    | "IDEMPOTENCY";

  applies_to_lane: "BASE" | "OPERATIONAL" | "BOTH" | "REQUEST";
  status: "PASS" | "FAIL" | "NOT_APPLICABLE";
  reason_code: string | null;
};

type ConstraintDecision = {
  status: "PASS" | "FAIL" | "NOT_APPLICABLE";
  policy_code: string | null;
  reason_codes: string[];
};

type FieldPolicyDecision = {
  status: "PASS" | "PARTIAL" | "FAIL";
  visible_fields: string[];
  masked_fields: string[];
  mutable_fields: string[];
  blocked_fields: string[];
  reason_codes: string[];
};

type MatchedGrant = {
  grant_id: string;
  lane: "BASE" | "OPERATIONAL";
  source_kind:
    | "BASE_ROLE"
    | "OPERATIONAL_ROLE"
    | "INDIVIDUAL_BASE"
    | "INDIVIDUAL_OPERATIONAL";

  source_subject_id: string;
  permission_key: string;
  effect: "ALLOW";
  scope_code: string;
  matched_territory: boolean;
  matched_resource: boolean;
  validity_status: "ACTIVE";
  source_dataset_id: string;
  source_dataset_version: string;
};

type MatchedDeny = {
  deny_id: string;
  deny_class:
    | "STRUCTURAL"
    | "ACTOR_WIDE"
    | "BASE_LANE"
    | "OPERATIONAL_LANE"
    | "DEFAULT";

  lane: "BASE" | "OPERATIONAL" | "ALL" | null;
  permission_key: string;
  source_kind: string;
  matched_actor: boolean;
  matched_resource: boolean;
  matched_territory: boolean;
  matched_validity: boolean;
  reason_code: string;
};

type DecisionCombination = {
  authorization_requirement:
    | "BASE_ONLY"
    | "OPERATIONAL_ONLY"
    | "BASE_OR_OPERATIONAL"
    | "BASE_AND_OPERATIONAL";

  base_outcome: "ALLOW" | "DENY" | "NOT_APPLICABLE";
  operational_outcome: "ALLOW" | "DENY" | "NOT_APPLICABLE";

  authorizing_lanes: AuthorizationLane[];
  blocked_lanes: AuthorizationLane[];

  combination_rule:
    | "BASE"
    | "OPERATIONAL"
    | "BASE_OR_OPERATIONAL"
    | "BASE_AND_OPERATIONAL";

  combination_result: "ALLOW" | "DENY";
};

type FinalDecision = {
  outcome: "ALLOW" | "DENY";

  reason_category:
    | "AUTHORIZED"
    | "STRUCTURAL_DENY"
    | "ACTOR_WIDE_DENY"
    | "LANE_DENY"
    | "PREREQUISITE_DENY"
    | "RESOURCE_DENY"
    | "DEVICE_DENY"
    | "SENSITIVITY_DENY"
    | "FIELD_POLICY_DENY"
    | "DEFAULT_DENY"
    | "CONTRACT_INVALID";

  primary_reason_code: string;
  authorizing_lanes: AuthorizationLane[];
  safe_message_code: string;
};

type DecisionReason = {
  reason_code: string;
  category: string;
  severity: "BLOCKING" | "INFORMATIONAL";
  lane: "BASE" | "OPERATIONAL" | "ALL" | null;
  source: string;
  safe_to_expose: boolean;
};

type ConcurrencyContext = {
  policy:
    | "NONE"
    | "EXPECTED_VERSION"
    | "UPDATED_AT"
    | "LOCK"
    | "SNAPSHOT"
    | "IDEMPOTENCY_KEY";

  expected_version: string | null;
  idempotency_key: string | null;
  validated: boolean;
};

type AuthorizationAuditContext = {
  decision_id: string;
  correlation_id: string | null;

  actor_id: string | null;
  principal_id: string | null;
  device_id: string | null;

  app_code: string;
  permission_key: string;
  resource_type: string;
  resource_ids: string[];

  outcome: "ALLOW" | "DENY";
  authorizing_lanes: AuthorizationLane[];

  context_fingerprint: string;
  resource_fingerprint: string;
  catalog_hash: string;
  dataset_hashes: Record<string, string>;

  evaluator_name: string;
  evaluator_version: string;
};

type ResolvedSubjectContext = {
  subject_type: string;
  subject_id: string;
  relationship_to_actor:
    | "SELF"
    | "OWNED"
    | "ASSIGNED"
    | "RELATED"
    | "THIRD_PARTY"
    | "SYSTEM";
  coherent: boolean;
};

type OwnershipContext = {
  owner_type:
    | "ACTOR"
    | "EMPLOYEE"
    | "CUSTOMER"
    | "ORGANIZATION"
    | "SITE"
    | "AREA"
    | "OTHER"
    | "NONE"
    | "UNKNOWN";

  owner_id: string | null;

  actor_relation:
    | "SELF"
    | "OWNED"
    | "ASSIGNED"
    | "RELATED"
    | "THIRD_PARTY"
    | "NOT_APPLICABLE"
    | "UNRESOLVED";

  coherent: boolean;
};

type TerritorySide = {
  site_id: string | null;
  area_id: string | null;
  area_kind: string | null;
  route_id: string | null;
  vehicle_id: string | null;
  coherent: boolean;
};

type ResolvedSideContext = {
  side_code: string;
  required: boolean;
  resource_type: string;
  resource_ids: string[];
  territory: TerritorySide | null;
  resolution_status:
    | "RESOLVED"
    | "MULTI_RESOLVED"
    | "NOT_APPLICABLE"
    | "UNRESOLVED"
    | "CONFLICT"
    | "ISOLATED";
};

/** Canonical static shape, not a runtime validator or permission capability. */
export type AuthorizationDecisionV1 = AuthorizationDecision & ContractMetadata & {
  contract_family: "vento.authorization.response-contracts";
  contract_family_version: "1.0.0";
  contract_name: "AuthorizationDecision";
  contract_version: "1.0.0";
  schema_version: "1.0.0";
};
