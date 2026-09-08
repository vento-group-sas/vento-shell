import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createDataNormalizationValidatorHarness } from './validator-harness.mjs';


const {
  packageRoot,
  repoRoot,
  assert,
  exactArray,
  includesAll,
  assertGitUnchanged,
  run,
  sha256,
  canonicalTaskBlock,
  asciiSafe,
} = createDataNormalizationValidatorHarness(
  import.meta.url,
);
const sourceRoot = path.join(packageRoot, 'src');
const auditPath = path.join(sourceRoot, 'normalization.audit.ts');
const readmePath = path.join(packageRoot, 'README.md');
const previousValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-preview.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const SOURCE_CONTRACT_SHA256 = '6d20fca811de725d18a4df5c952b37f90557ba7d9ebf7365bb50becd5c827d2e';
const POLICY_ID = 'VENTO_TEXT_RULE_AUDIT_VERSION_AND_IDEMPOTENCY_POLICY@1.0.0';

const expectedFamilies = [
  'RULE_GOVERNANCE_RECORD',
  'RULE_EVALUATION_RECORD',
  'PERSISTED_MUTATION_RECORD',
  'DERIVATION_MATERIALIZATION_RECORD',
  'REVIEW_DECISION_RECORD',
  'PROPAGATION_OR_TRANSITION_RECORD',
];
const expectedRuleFields = [
  'rule_key', 'rule_version_id', 'rule_family', 'policy_coordinate', 'semantic_class',
  'operation_kind', 'language_profile', 'version_number', 'content_digest', 'status',
  'effective_from', 'effective_to', 'supersedes_rule_version_id',
];
const expectedVersionDependencies = [
  'field_policy_version',
  'field_class_catalog_version',
  'capitalization_policy_version',
  'connector_catalog_version',
  'official_exception_catalog_version',
  'orthographic_dictionary_version',
  'review_decision_version',
  'search_policy_version',
  'language_and_unicode_profile_version',
  'algorithm_artifact_version',
  'external_mapping_version',
];
const expectedStatuses = [
  'DRAFT', 'APPROVED_PENDING_ACTIVATION', 'ACTIVE', 'SUSPENDED',
  'SUPERSEDED', 'RETIRED', 'REJECTED', 'INVALIDATED',
];
const expectedActivationFields = [
  'approved_at', 'approved_by_authority', 'effective_from', 'effective_to',
  'activation_scope', 'activation_environment', 'activation_event_id',
];
const expectedCompatibilityModes = [
  'ACTIVE_ONLY',
  'DUAL_EVALUATION_SHADOW',
  'HISTORICAL_READ_ONLY',
  'REPLAY_ONLY',
  'INCOMPATIBLE_BLOCKED',
];
const expectedProvenanceFields = [
  'algorithm_key', 'algorithm_version', 'artifact_identity', 'artifact_digest',
  'source_revision_or_commit', 'runtime_contract_version', 'language_profile',
  'unicode_version', 'tokenizer_version', 'catalog_version_set', 'configuration_digest',
];
const expectedEvents = [
  'RULE_VERSION_PROPOSED',
  'RULE_VERSION_APPROVED',
  'RULE_VERSION_ACTIVATED',
  'RULE_VERSION_SUSPENDED',
  'RULE_VERSION_SUPERSEDED',
  'RULE_VERSION_RETIRED',
  'RULE_EVALUATED',
  'RULE_MUTATION_COMMITTED',
  'RULE_DERIVATION_MATERIALIZED',
  'RULE_BLOCK_OR_REVIEW_EMITTED',
  'RULE_REPLAY_OR_RECONCILIATION_RECORDED',
  'RULE_COMPENSATION_OR_ROLLBACK_RECORDED',
];
const expectedAuditFields = [
  'audit_event_id', 'logical_operation_id', 'attempt_id', 'correlation_id', 'causation_id',
  'event_kind', 'event_time', 'recorded_at', 'actor_or_service_identity',
  'authorization_context', 'reason_code', 'policy_coordinate', 'entity_type', 'entity_id',
  'source_field_coordinate', 'source_value_version_or_hash', 'before_value_reference_or_hash',
  'after_value_reference_or_hash', 'requested_operation', 'resolved_version_set',
  'version_set_digest', 'algorithm_provenance', 'idempotency_key',
  'idempotency_payload_digest', 'expected_source_version_or_hash', 'outcome',
  'outcome_reason', 'review_case_or_decision_reference',
  'propagation_or_transition_reference', 'environment',
];
const expectedOutcomes = [
  'APPLIED_CHANGE',
  'NO_CHANGE_ALREADY_CANONICAL',
  'DERIVED',
  'PRESERVED',
  'NOT_APPLICABLE',
  'BLOCKED_POLICY',
  'BLOCKED_CONFLICT',
  'REVIEW_REQUIRED',
  'ESCALATED_STRUCTURAL',
  'FAILED_TECHNICAL',
];
const expectedRetention = [
  'GOVERNANCE_IMMUTABLE',
  'MUTATION_EVIDENCE',
  'DERIVATION_REPRODUCIBILITY',
  'OPERATIONAL_DIAGNOSTIC',
  'SENSITIVE_REFERENCE',
];
const expectedReproducibility = [
  'FULL_REPLAYABLE',
  'REFERENCE_REPLAYABLE',
  'DECISION_RECONSTRUCTABLE',
];
const expectedSemanticTimes = [
  'observed_at', 'requested_at', 'evaluated_at', 'effect_committed_at',
  'effective_from', 'effective_to', 'recorded_at',
];
const expectedIdempotencyComponents = [
  'operation_kind', 'actor_or_service_scope', 'target_entity_type', 'target_entity_id',
  'source_field_coordinate', 'source_value_version_or_hash', 'requested_operation',
  'version_set_digest', 'business_correlation_or_command_id',
];
const expectedIdempotentClasses = [
  'PURE_EVALUATION',
  'PERSISTED_MUTATION',
  'DERIVATION_MATERIALIZATION',
  'RULE_LIFECYCLE_TRANSITION',
  'REVIEW_DECISION_RECORDING',
  'PROPAGATION_OR_TRANSITION_COMMAND',
];
const expectedConcurrency = [
  'expected_source_version_or_hash',
  'expected_policy_coordinate',
  'expected_version_set_digest',
  'expected_current_state',
];
const expectedReplayFields = [
  'replay_id', 'source_event_or_decision_set', 'source_snapshot_or_reference',
  'version_set_digest', 'algorithm_provenance', 'replay_environment',
  'expected_outcomes', 'actual_outcomes', 'difference_classification',
];

function compileAudit(tempDir) {
  const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
  const files = [
    'normalization.types.ts',
    'normalization.rules.ts',
    'normalization.catalogs.ts',
    'normalization.dictionary.ts',
    'normalization.search.ts',
    'normalization.preview.ts',
    'normalization.audit.ts',
  ].map((entry) => path.join(sourceRoot, entry));
  const result = run(process.execPath, [
    tscCli,
    '--pretty', 'false',
    '--strict',
    '--skipLibCheck',
    '--target', 'ES2022',
    '--module', 'NodeNext',
    '--moduleResolution', 'NodeNext',
    '--rootDir', sourceRoot,
    '--outDir', tempDir,
    ...files,
  ]);
  assert(result.status === 0, `TypeScript compile failed: ${result.stderr || result.stdout}`);
}

function value(value) {
  return { state: 'VALUE', value };
}

function notApplicable() {
  return { state: 'NOT_APPLICABLE', value: null };
}

function digestAdapter() {
  return {
    algorithm_key: 'SHA256',
    algorithm_version: 'SHA256@1',
    digest_utf8: (text) => crypto.createHash('sha256').update(text, 'utf8').digest('hex'),
  };
}

function provenance(overrides = {}) {
  return {
    algorithm_key: 'NORMALIZATION_ENGINE',
    algorithm_version: 'normalization-engine@1.0.0',
    artifact_identity: '@vento/data-normalization:fixture',
    artifact_digest: 'sha256:artifact-fixture',
    source_revision_or_commit: value('commit:fixture'),
    runtime_contract_version: 'runtime-contract@1.0.0',
    language_profile: value('es-CO@1.0.0'),
    unicode_version: value('Unicode@15.1'),
    tokenizer_version: value('tokenizer@1.0.0'),
    catalog_version_set: value({ connectors: 'connectors@1.0.0', exceptions: 'exceptions@1.0.0' }),
    configuration_digest: 'sha256:configuration-fixture',
    ...overrides,
  };
}

function resolvedDependencies() {
  return [
    {
      dependency_key: 'field_policy_version',
      state: 'RESOLVED',
      version_ref: 'field-policy@1.0.0',
      content_digest: 'sha256:field-policy',
    },
    {
      dependency_key: 'orthographic_dictionary_version',
      state: 'NOT_APPLICABLE',
      version_ref: null,
      content_digest: null,
    },
    {
      dependency_key: 'search_policy_version',
      state: 'RESOLVED',
      version_ref: 'search@1.0.0',
      content_digest: 'sha256:search',
    },
    {
      dependency_key: 'algorithm_artifact_version',
      state: 'RESOLVED',
      version_ref: 'artifact@1.0.0',
      content_digest: 'sha256:artifact',
    },
  ];
}

function semanticTimes(effectCommitted = notApplicable()) {
  return {
    observed_at: value('2026-08-23T19:00:00Z'),
    requested_at: value('2026-08-23T19:00:01Z'),
    evaluated_at: value('2026-08-23T19:00:02Z'),
    effect_committed_at: effectCommitted,
    effective_from: value('2026-08-23T00:00:00Z'),
    effective_to: notApplicable(),
    recorded_at: value('2026-08-23T19:00:03Z'),
  };
}

function auditRecord(resolved, overrides = {}) {
  return {
    audit_event_id: 'audit:event:fixture',
    logical_operation_id: 'operation:fixture',
    attempt_id: 'attempt:1',
    correlation_id: 'correlation:fixture',
    causation_id: notApplicable(),
    event_kind: 'RULE_EVALUATED',
    event_time: '2026-08-23T19:00:02Z',
    recorded_at: '2026-08-23T19:00:03Z',
    actor_or_service_identity: notApplicable(),
    authorization_context: notApplicable(),
    reason_code: 'NORMALIZATION_EVALUATED',
    policy_coordinate: 'product.name',
    entity_type: value('product'),
    entity_id: value('P-001'),
    source_field_coordinate: value('product.name'),
    source_value_version_or_hash: value('source@1'),
    before_value_reference_or_hash: value('before@1'),
    after_value_reference_or_hash: notApplicable(),
    requested_operation: 'COMMERCIAL_CAPITALIZATION',
    resolved_version_set: resolved.resolved_version_set,
    version_set_digest: resolved.version_set_digest,
    algorithm_provenance: provenance(),
    idempotency_key: notApplicable(),
    idempotency_payload_digest: notApplicable(),
    expected_source_version_or_hash: value('source@1'),
    outcome: 'NO_CHANGE_ALREADY_CANONICAL',
    outcome_reason: 'fixture evaluation',
    review_case_or_decision_reference: notApplicable(),
    propagation_or_transition_reference: notApplicable(),
    environment: 'test',
    ...overrides,
  };
}

function previewFixture() {
  return {
    result: 'PROPOSED_CHANGE',
    binding: 'NON_BINDING',
    commit_authority: false,
    source_version_or_hash: 'source@1',
  };
}

async function assertBehavior(tempDir) {
  compileAudit(tempDir);
  const audit = await import(`${pathToFileURL(path.join(tempDir, 'normalization.audit.js')).href}?v=${Date.now()}`);

  assert(audit.RULE_AUDIT_VERSION_POLICY_ID === POLICY_ID, 'policy identity mismatch');
  exactArray(audit.AUDIT_LOGICAL_RECORD_FAMILIES, expectedFamilies, 'record families');
  exactArray(audit.RULE_VERSION_IDENTITY_FIELDS, expectedRuleFields, 'rule fields');
  exactArray(audit.RESOLVED_VERSION_DEPENDENCY_KEYS, expectedVersionDependencies, 'version dependencies');
  exactArray(audit.RULE_LIFECYCLE_STATUSES, expectedStatuses, 'lifecycle statuses');
  exactArray(audit.RULE_ACTIVATION_METADATA_FIELDS, expectedActivationFields, 'activation fields');
  exactArray(audit.VERSION_COMPATIBILITY_MODES, expectedCompatibilityModes, 'compatibility modes');
  exactArray(audit.ALGORITHM_PROVENANCE_FIELDS, expectedProvenanceFields, 'provenance fields');
  exactArray(audit.AUDIT_EVENT_KINDS, expectedEvents, 'audit events');
  exactArray(audit.AUDIT_RECORD_FIELDS, expectedAuditFields, 'audit fields');
  exactArray(audit.EVALUATION_OUTCOMES, expectedOutcomes, 'evaluation outcomes');
  exactArray(audit.LOGICAL_RETENTION_CLASSES, expectedRetention, 'retention classes');
  exactArray(audit.REPRODUCIBILITY_LEVELS, expectedReproducibility, 'reproducibility levels');
  exactArray(audit.SEMANTIC_TIME_FIELDS, expectedSemanticTimes, 'semantic times');
  exactArray(audit.IDEMPOTENCY_KEY_COMPONENTS, expectedIdempotencyComponents, 'idempotency components');
  exactArray(audit.IDEMPOTENT_OPERATION_CLASSES, expectedIdempotentClasses, 'idempotent classes');
  exactArray(audit.CONCURRENCY_EXPECTATION_FIELDS, expectedConcurrency, 'concurrency fields');
  exactArray(audit.REPLAY_CONTRACT_FIELDS, expectedReplayFields, 'replay fields');
  assert(audit.IDEMPOTENCY_PAYLOAD_CONFLICT_REASON === 'IDEMPOTENCY_PAYLOAD_CONFLICT', 'conflict reason mismatch');

  const deps = resolvedDependencies();
  const resolvedA = audit.materializeResolvedVersionSet(deps, digestAdapter());
  const resolvedB = audit.materializeResolvedVersionSet([...deps].reverse(), digestAdapter());
  assert(resolvedA.ok && resolvedB.ok, 'resolved version set must materialize');
  assert(resolvedA.value.version_set_digest === resolvedB.value.version_set_digest, 'version set digest must be order independent');
  exactArray(
    resolvedA.value.resolved_version_set.map((entry) => entry.dependency_key),
    ['field_policy_version', 'orthographic_dictionary_version', 'search_policy_version', 'algorithm_artifact_version'],
    'canonical version dependency order',
  );
  const latest = audit.materializeResolvedVersionSet([
    {
      dependency_key: 'field_policy_version',
      state: 'RESOLVED',
      version_ref: 'latest',
      content_digest: 'sha256:any',
    },
  ], digestAdapter());
  assert(!latest.ok && latest.reason === 'INVALID_RESOLVED_VERSION_DEPENDENCY', 'latest version must fail closed');

  const identity = {
    rule_key: 'COMMERCIAL_NAME_CAPITALIZATION',
    rule_version_id: 'rule-version:1',
    rule_family: 'COMMERCIAL_CAPITALIZATION',
    policy_coordinate: 'product.name',
    semantic_class: 'COMMERCIAL_NAME',
    operation_kind: 'COMMERCIAL_CAPITALIZATION',
    language_profile: value('es-CO@1.0.0'),
    version_number: '1.0.0',
    content_digest: 'sha256:rule',
    status: 'ACTIVE',
    effective_from: value('2026-08-23T00:00:00Z'),
    effective_to: notApplicable(),
    supersedes_rule_version_id: notApplicable(),
  };
  assert(audit.validateRuleVersionIdentity(identity).length === 0, 'valid rule identity rejected');
  assert(audit.lifecycleTransitionDisposition('DRAFT', 'APPROVED_PENDING_ACTIVATION') === 'ALLOWED_TRANSITION', 'draft transition mismatch');
  assert(audit.lifecycleTransitionDisposition('ACTIVE', 'SUPERSEDED') === 'ALLOWED_TRANSITION', 'active transition mismatch');
  assert(audit.lifecycleTransitionDisposition('SUPERSEDED', 'ACTIVE') === 'BLOCKED_TRANSITION', 'terminal state must not reactivate');
  assert(audit.lifecycleTransitionDisposition('ACTIVE', 'ACTIVE') === 'NO_TRANSITION_ALREADY_AT_STATE', 'idempotent lifecycle disposition mismatch');

  const activation = {
    approved_at: value('2026-08-23T18:00:00Z'),
    approved_by_authority: value('VENTO_OWNER'),
    effective_from: value('2026-08-23T19:00:00Z'),
    effective_to: notApplicable(),
    activation_scope: value('VENTO_OS'),
    activation_environment: value('production'),
    activation_event_id: value('activation:event:1'),
  };
  assert(audit.validateActivationMetadata(activation).length === 0, 'activation metadata rejected');
  assert(audit.validateAlgorithmProvenance(provenance()).length === 0, 'provenance rejected');
  assert(
    audit.validateAlgorithmProvenance(provenance({ algorithm_version: 'latest' })).includes('PROVENANCE_INVALID:algorithm_version'),
    'implicit latest provenance must fail closed',
  );

  const evaluationEnvelope = {
    record_family: 'RULE_EVALUATION_RECORD',
    record: auditRecord(resolvedA.value),
    retention_class: 'OPERATIONAL_DIAGNOSTIC',
    reproducibility_level: 'DECISION_RECONSTRUCTABLE',
    semantic_times: semanticTimes(),
  };
  let validation = audit.validateLogicalAuditEnvelope(evaluationEnvelope);
  assert(validation.valid && validation.persistence_authority === false && validation.authorization_authority === false, 'pure evaluation envelope rejected');

  validation = audit.validateLogicalAuditEnvelope({
    ...evaluationEnvelope,
    record: auditRecord(resolvedA.value, { outcome: 'APPLIED_CHANGE' }),
  });
  assert(!validation.valid && validation.blockers.includes('EVALUATION_CANNOT_ASSERT_APPLIED_CHANGE'), 'evaluation must not assert commit');

  const mutationRecord = auditRecord(resolvedA.value, {
    event_kind: 'RULE_MUTATION_COMMITTED',
    actor_or_service_identity: value('service:catalog-write'),
    authorization_context: value({ permission: 'catalog.write' }),
    after_value_reference_or_hash: value('after@1'),
    idempotency_key: value('idempotency:key:1'),
    idempotency_payload_digest: value('payload@1'),
    outcome: 'APPLIED_CHANGE',
    outcome_reason: 'owner confirmed commit',
  });
  validation = audit.validateLogicalAuditEnvelope({
    record_family: 'PERSISTED_MUTATION_RECORD',
    record: mutationRecord,
    retention_class: 'MUTATION_EVIDENCE',
    reproducibility_level: 'REFERENCE_REPLAYABLE',
    semantic_times: semanticTimes(value('2026-08-23T19:00:04Z')),
  });
  assert(validation.valid && validation.persistence_authority === false, 'explicit owner-confirmed mutation metadata rejected');

  validation = audit.validateLogicalAuditEnvelope({
    record_family: 'PERSISTED_MUTATION_RECORD',
    record: { ...mutationRecord, actor_or_service_identity: notApplicable() },
    retention_class: 'MUTATION_EVIDENCE',
    reproducibility_level: 'REFERENCE_REPLAYABLE',
    semantic_times: semanticTimes(value('2026-08-23T19:00:04Z')),
  });
  assert(!validation.valid && validation.blockers.includes('CONFIRMED_EFFECT_REQUIRES_OWNER_CONTEXT'), 'commit metadata without owner context must fail closed');

  const keyInput = {
    operation_kind: 'COMMERCIAL_CAPITALIZATION',
    actor_or_service_scope: 'service:catalog-write',
    target_entity_type: 'product',
    target_entity_id: 'P-001',
    source_field_coordinate: 'product.name',
    source_value_version_or_hash: 'source@1',
    requested_operation: 'normalize-name',
    version_set_digest: resolvedA.value.version_set_digest,
    business_correlation_or_command_id: 'command:1',
  };
  const keyA = audit.materializeIdempotencyKey(keyInput, digestAdapter());
  const keyB = audit.materializeIdempotencyKey({ ...keyInput }, digestAdapter());
  assert(keyA.ok && keyB.ok && keyA.value.idempotency_key === keyB.value.idempotency_key, 'idempotency key must be deterministic');

  let assessment = audit.assessPriorIdempotencyState(
    keyA.value.idempotency_key,
    'payload@1',
    {
      idempotency_key: keyA.value.idempotency_key,
      idempotency_payload_digest: 'payload@1',
      outcome: 'NO_CHANGE_ALREADY_CANONICAL',
      effect_confirmation_reference: notApplicable(),
    },
  );
  assert(assessment.disposition === 'REUSE_PRIOR_OUTCOME', 'same idempotency request must reuse prior outcome');
  assessment = audit.assessPriorIdempotencyState(
    keyA.value.idempotency_key,
    'payload@2',
    {
      idempotency_key: keyA.value.idempotency_key,
      idempotency_payload_digest: 'payload@1',
      outcome: 'NO_CHANGE_ALREADY_CANONICAL',
      effect_confirmation_reference: notApplicable(),
    },
  );
  assert(assessment.disposition === 'BLOCKED_CONFLICT' && assessment.reason === 'IDEMPOTENCY_PAYLOAD_CONFLICT', 'payload conflict must be explicit');
  assessment = audit.assessPriorIdempotencyState(
    keyA.value.idempotency_key,
    'payload@1',
    {
      idempotency_key: keyA.value.idempotency_key,
      idempotency_payload_digest: 'payload@1',
      outcome: 'APPLIED_CHANGE',
      effect_confirmation_reference: notApplicable(),
    },
  );
  assert(assessment.disposition === 'BLOCKED_CONFLICT' && assessment.reason === 'PRIOR_EFFECT_CONFIRMATION_MISSING', 'applied outcome requires owner confirmation');

  const expectedState = {
    expected_source_version_or_hash: 'source@1',
    expected_policy_coordinate: 'product.name',
    expected_version_set_digest: resolvedA.value.version_set_digest,
    expected_current_state: 'ACTIVE',
  };
  let concurrency = audit.assessConcurrency(expectedState, {
    source_version_or_hash: 'source@1',
    policy_coordinate: 'product.name',
    version_set_digest: resolvedA.value.version_set_digest,
    current_state: 'ACTIVE',
  });
  assert(concurrency.compatible && concurrency.mismatches.length === 0 && concurrency.state_authority === false, 'stable concurrency state rejected');
  concurrency = audit.assessConcurrency(expectedState, {
    source_version_or_hash: 'source@2',
    policy_coordinate: 'other.name',
    version_set_digest: 'versions@2',
    current_state: 'SUSPENDED',
  });
  exactArray(concurrency.mismatches, expectedConcurrency, 'concurrency mismatches');

  const replay = audit.validateReplayContract({
    replay_id: 'replay:1',
    source_event_or_decision_set: ['audit:event:1'],
    source_snapshot_or_reference: 'snapshot:1',
    version_set_digest: resolvedA.value.version_set_digest,
    algorithm_provenance: provenance(),
    replay_environment: 'controlled-test',
    expected_outcomes: ['NO_CHANGE_ALREADY_CANONICAL'],
    actual_outcomes: ['NO_CHANGE_ALREADY_CANONICAL'],
    difference_classification: 'NO_DIFFERENCE',
  });
  assert(replay.valid && replay.production_mutation_authority === false, 'valid replay metadata rejected');

  const projected = audit.projectNonBindingPreviewAuditMetadata(previewFixture(), {
    outcome: 'PRESERVED',
    outcome_reason: 'preview fixture',
    resolved_version_set: resolvedA.value.resolved_version_set,
    version_set_digest: resolvedA.value.version_set_digest,
    algorithm_provenance: provenance(),
  });
  assert(projected.ok && projected.value.binding === 'NON_BINDING' && projected.value.commit_authority === false, 'preview metadata projection boundary lost');
  const illegalProjection = audit.projectNonBindingPreviewAuditMetadata(previewFixture(), {
    outcome: 'APPLIED_CHANGE',
    outcome_reason: 'invalid preview claim',
    resolved_version_set: resolvedA.value.resolved_version_set,
    version_set_digest: resolvedA.value.version_set_digest,
    algorithm_provenance: provenance(),
  });
  assert(!illegalProjection.ok && illegalProjection.reason === 'PREVIEW_CANNOT_ASSERT_APPLIED_CHANGE', 'preview must reject applied change');

  assert(audit.metadataContextDisposition('VENTO_OS', POLICY_ID) === 'ALLOWED', 'VENTO_OS policy context rejected');
  assert(audit.metadataContextDisposition('VITAL', POLICY_ID) === 'BLOCKED_VITAL', 'VITAL must remain separated');
}

async function main() {
  includesAll(fs.readdirSync(sourceRoot), [
    'normalization.types.ts',
    'normalization.rules.ts',
    'normalization.catalogs.ts',
    'normalization.dictionary.ts',
    'normalization.search.ts',
    'normalization.preview.ts',
    'normalization.audit.ts',
  ], 'src entries');
  includesAll(fs.readdirSync(path.join(packageRoot, 'scripts')), [
    'validate-normalization-types.mjs',
    'validate-normalization-rules.mjs',
    'validate-normalization-catalogs.mjs',
    'validate-normalization-dictionary.mjs',
    'validate-normalization-search.mjs',
    'validate-normalization-preview.mjs',
    'validate-normalization-audit.mjs',
  ], 'script entries');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-NORM-008');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-008 source contract SHA256 mismatch');
  assert(owner.includes('modalidad física | `GLOBAL_ENABLE_ONCE`'), 'GLOBAL_ENABLE_ONCE reconciliation missing');
  assert(owner.includes('gate temporal | `PRE_E5_FOUNDATION`'), 'PRE_E5_FOUNDATION reconciliation missing');

  const source = fs.readFileSync(auditPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  includesAll(source, [
    POLICY_ID,
    'materializeResolvedVersionSet',
    'validateLogicalAuditEnvelope',
    'materializeIdempotencyKey',
    'assessPriorIdempotencyState',
    'assessConcurrency',
    'validateReplayContract',
    'projectNonBindingPreviewAuditMetadata',
    'IDEMPOTENCY_PAYLOAD_CONFLICT',
    'persistence_authority: false',
    'authorization_authority: false',
    'production_mutation_authority: false',
  ], 'audit source markers');

  for (const pattern of [
    /node:fs/u,
    /node:net/u,
    /node:http/u,
    /node:crypto/u,
    /process\.env/u,
    /fetch\s*\(/u,
    /Date\.now\s*\(/u,
    /new\s+Date\s*\(/u,
    /Math\.random\s*\(/u,
    /randomUUID\s*\(/u,
    /from ['"]@supabase\//u,
  ]) {
    assert(!pattern.test(source), `audit runtime dependency forbidden: ${pattern}`);
  }

  includesAll(readme, [
    '## Materializacion de SHELL-NORM-007',
    '## Materializacion de SHELL-NORM-008',
    POLICY_ID,
    'familias de registro logico: 6',
    'atributos de regla y version: 13',
    'dependencias del resolved_version_set: 11',
    'estados unificados: 8',
    'atributos de activacion: 7',
    'modos de compatibilidad: 5',
    'atributos de procedencia: 11',
    'eventos de auditoria: 12',
    'atributos del contrato de auditoria: 30',
    'resultados de evaluacion: 10',
    'clases de retencion: 5',
    'niveles de reproducibilidad: 3',
    'tiempos semanticos: 7',
    'componentes de idempotencia: 9',
    'clases de operacion idempotente: 6',
    'expectativas de concurrencia: 4',
    'atributos de replay: 9',
    'IDEMPOTENCY_PAYLOAD_CONFLICT',
    'persistencia de auditoria: NO MATERIALIZADA',
    'exports publicos: NO MATERIALIZADOS',
    'cambios Supabase: 0',
    `Source contract SHA-256 \`SHELL-NORM-008\`: \`${SOURCE_CONTRACT_SHA256}\`.`,
  ], 'README markers');

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/data-normalization/package.json',
    'packages/data-normalization/src/normalization.types.ts',
    'packages/data-normalization/src/normalization.rules.ts',
    'packages/data-normalization/src/normalization.catalogs.ts',
    'packages/data-normalization/src/normalization.dictionary.ts',
    'packages/data-normalization/src/normalization.search.ts',
    'packages/data-normalization/src/normalization.preview.ts',
    'packages/data-normalization/scripts/validate-normalization-types.mjs',
    'packages/data-normalization/scripts/validate-normalization-rules.mjs',
    'packages/data-normalization/scripts/validate-normalization-catalogs.mjs',
    'packages/data-normalization/scripts/validate-normalization-dictionary.mjs',
    'packages/data-normalization/scripts/validate-normalization-search.mjs',
    'packages/data-normalization/scripts/validate-normalization-preview.mjs',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-007__GLOBAL.json',
  ]);

  const previous = run(process.execPath, [previousValidatorPath]);
  assert(
    previous.status === 0,
    `SHELL-NORM-007 compatibility validator failed: ${previous.stderr || previous.stdout || previous.status}`,
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm008-'));
  try {
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-008 audit metadata validated; '
      + 'families=6 rule_fields=13 version_dependencies=11 statuses=8 activation_fields=7 '
      + 'compatibility_modes=5 provenance_fields=11 events=12 audit_fields=30 outcomes=10 '
      + 'retention=5 reproducibility=3 semantic_times=7 idempotency_components=9 '
      + 'idempotent_classes=6 concurrency=4 replay_fields=9 '
      + 'behavior=PASS previous_compatibility=PASS',
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FAIL: ${asciiSafe(message)}`);
  process.exitCode = 1;
});
