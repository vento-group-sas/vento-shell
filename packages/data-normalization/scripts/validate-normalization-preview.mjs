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
const previewPath = path.join(sourceRoot, 'normalization.preview.ts');
const readmePath = path.join(packageRoot, 'README.md');
const previousValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-search.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const SOURCE_CONTRACT_SHA256 = '3a05097677cbf3e0f36700a7bbc0fb2e6e3a06e955296bbe9135db06b1bef9a0';

const expectedAuthorityFunctions = [
  'PREVIEW_AND_GUIDANCE',
  'AUTHORITATIVE_SEMANTIC_EVALUATION',
  'TRANSACTIONAL_REVALIDATION_AND_COMMIT',
  'DEFENSIVE_INVARIANT_ENFORCEMENT',
];
const expectedLayers = [
  'APPLICATION_INTERACTION_LAYER',
  'DOMAIN_NORMALIZATION_SERVICE',
  'TRANSACTIONAL_RPC_BOUNDARY',
  'DEFENSIVE_DATABASE_TRIGGER',
];
const expectedPlacementFields = [
  'execution_policy_key', 'operation_kind', 'policy_coordinate', 'semantic_class',
  'representation_role', 'source_role', 'primary_semantic_authority',
  'transactional_boundary', 'application_preview_mode', 'trigger_mode', 'allowed_callers',
  'required_authorization_context', 'resolved_version_dependencies', 'idempotency_class',
  'concurrency_expectations', 'mutation_target', 'synchronous_derivations', 'audit_owner',
  'failure_mode', 'bypass_policy', 'propagation_policy',
];
const expectedTransactionFlow = [
  'CAPTURE_INTENT_VALUE_CONTEXT_AND_OBSERVED_VERSION',
  'OPTIONAL_NON_BINDING_SERVER_PREVIEW',
  'SEND_COMMAND_WITH_ID_AND_SOURCE_EXPECTATION',
  'AUTHENTICATE_AUTHORIZE_AND_BUILD_IDEMPOTENT_OPERATION',
  'RESOLVE_COORDINATE_VERSIONS_AND_DOMAIN_RESULT',
  'REVALIDATE_STATE_CONCURRENCY_UNIQUENESS_AND_PRECONDITIONS',
  'PERSIST_SOURCE_SYNCHRONOUS_DERIVATIONS_AND_ROOT_AUDIT',
  'CHECK_AUTHORIZED_DEFENSIVE_INVARIANTS',
  'COMMIT_AND_RETURN_RESULT',
  'CONTINUE_ASYNCHRONOUS_CHILD_COMMANDS',
];
const expectedDivergenceDimensions = [
  'VALUE', 'SCOPE', 'POLICY', 'VERSION_SET', 'UNIQUENESS', 'RELATIONSHIPS',
];
const expectedResults = [
  'NO_CHANGE', 'PROPOSED_CHANGE', 'BLOCKED_POLICY', 'BLOCKED_CONFLICT',
  'REVIEW_REQUIRED', 'ESCALATED_STRUCTURAL', 'TECHNICAL_FAILURE',
];

function compilePreview(tempDir) {
  const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
  const files = [
    'normalization.types.ts',
    'normalization.rules.ts',
    'normalization.catalogs.ts',
    'normalization.dictionary.ts',
    'normalization.search.ts',
    'normalization.preview.ts',
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

function versionSet() {
  return [{ dependency_key: 'normalization-policy', version_ref: 'policy@1.0.0', status: 'ACTIVE' }];
}

function fieldDescriptor(semanticClass = 'COMMERCIAL_NAME') {
  return {
    coordinate: {
      owner_domain_ref: 'catalog',
      owner_entity_ref: 'product',
      semantic_field_ref: 'commercial_name',
    },
    semantic_class: semanticClass,
    representation_role: 'PRIMARY_VALUE',
    source_role: 'AUTHORITATIVE_SOURCE',
    policy_version_ref: 'policy@1.0.0',
  };
}

function placement(descriptor = fieldDescriptor(), versions = versionSet()) {
  return {
    execution_policy_key: 'product-name-preview',
    operation_kind: 'COMMERCIAL_CAPITALIZATION',
    policy_coordinate: descriptor.policy_version_ref,
    semantic_class: descriptor.semantic_class,
    representation_role: descriptor.representation_role,
    source_role: descriptor.source_role,
    primary_semantic_authority: 'DOMAIN_NORMALIZATION_SERVICE',
    transactional_boundary: 'PRODUCT_WRITE_RPC',
    application_preview_mode: 'SERVER_PREVIEW_OPTIONAL',
    trigger_mode: 'DEFENSIVE_ONLY',
    allowed_callers: ['vento-nexo-server'],
    required_authorization_context: ['organization_id'],
    resolved_version_dependencies: versions,
    idempotency_class: 'QUERY_ONLY',
    concurrency_expectations: 'REVALIDATE_BEFORE_COMMIT',
    mutation_target: null,
    synchronous_derivations: [],
    audit_owner: 'DATA-NORM-ARC-011',
    failure_mode: 'FAIL_CLOSED',
    bypass_policy: 'NO_BYPASS',
    propagation_policy: 'NO_PROPAGATION',
  };
}

function request(overrides = {}) {
  const descriptor = overrides.field_descriptor ?? fieldDescriptor();
  const versions = overrides.resolved_version_set ?? versionSet();
  return {
    query_family: 'NORMALIZATION_EVALUATION_QUERY',
    operation_intent: 'PREVIEW_PRODUCT_NAME',
    field_descriptor: descriptor,
    placement_descriptor: placement(descriptor, versions),
    observed_value: 'cafe del norte',
    scope_ref: 'org:vento',
    purpose_ref: 'catalog-edit',
    source_version_or_hash: 'source@17',
    resolved_version_set: versions,
    version_set_digest: 'sha256:versions-1',
    observed_at: '2026-08-23T13:30:00-05:00',
    authorization_context: { organization_id: 'vento' },
    ...overrides,
  };
}

function evaluator(result = 'PROPOSED_CHANGE') {
  return {
    evaluator_version_ref: 'domain-normalizer@1.0.0',
    evaluate: () => ({
      result,
      proposed_or_preserved_value: result === 'NO_CHANGE' ? 'cafe del norte' : 'Cafe del Norte',
      explanation: `authoritative:${result}`,
      operations_consumed: ['COMMERCIAL_CAPITALIZATION'],
      derivations: [{ kind: 'CASE_PROJECTION' }],
      matches: [],
      blocking_detail: result.startsWith('BLOCKED_') ? result : null,
    }),
  };
}

function authorization(allowed = true) {
  return {
    authorization_version_ref: 'authorization@1.0.0',
    authorize_preview: () => allowed,
  };
}

async function assertBehavior(tempDir) {
  compilePreview(tempDir);
  const preview = await import(`${pathToFileURL(path.join(tempDir, 'normalization.preview.js')).href}?v=${Date.now()}`);

  exactArray(preview.PREVIEW_AUTHORITY_FUNCTIONS, expectedAuthorityFunctions, 'authority functions');
  exactArray(preview.PREVIEW_LOGICAL_LAYERS, expectedLayers, 'logical layers');
  exactArray(preview.PREVIEW_PLACEMENT_DESCRIPTOR_FIELDS, expectedPlacementFields, 'placement fields');
  exactArray(preview.PREVIEW_TRANSACTION_FLOW, expectedTransactionFlow, 'transaction flow');
  exactArray(preview.PREVIEW_DIVERGENCE_DIMENSIONS, expectedDivergenceDimensions, 'divergence dimensions');
  exactArray(preview.PREVIEW_RESULTS, expectedResults, 'preview results');
  assert(preview.NORMALIZATION_EVALUATION_QUERY_FAMILY === 'NORMALIZATION_EVALUATION_QUERY', 'query family mismatch');

  const input = request();
  const before = JSON.stringify(input);
  const first = preview.createNormalizationPreview(input, authorization(), evaluator());
  const second = preview.createNormalizationPreview(input, authorization(), evaluator());
  assert(JSON.stringify(first) === JSON.stringify(second), 'preview must be reproducible');
  assert(JSON.stringify(input) === before, 'preview must not mutate input');
  assert(first.result === 'PROPOSED_CHANGE' && first.binding === 'NON_BINDING', 'proposed preview mismatch');
  assert(first.observed_value === 'cafe del norte' && first.proposed_or_preserved_value === 'Cafe del Norte', 'observed/proposed separation missing');
  assert(first.commit_authority === false && first.mutation_performed === false && first.state_reserved === false, 'preview acquired write authority');
  assert(first.uniqueness_certified === false && first.identity_decided === false, 'preview acquired identity authority');
  assert(first.requires_transactional_revalidation === true, 'transactional revalidation must remain mandatory');

  for (const result of expectedResults) {
    const output = preview.createNormalizationPreview(input, authorization(), evaluator(result));
    assert(output.result === result, `closed result not preserved: ${result}`);
    assert(output.binding === 'NON_BINDING' && output.commit_authority === false, `binding boundary lost: ${result}`);
  }

  let output = preview.createNormalizationPreview(input, authorization(false), evaluator());
  assert(output.result === 'BLOCKED_POLICY' && output.blocking_detail === 'PREVIEW_NOT_AUTHORIZED', 'authorization must fail closed');

  const secret = fieldDescriptor('SECRET_OR_SIGNATURE_MATERIAL');
  output = preview.createNormalizationPreview(request({ field_descriptor: secret, placement_descriptor: placement(secret) }), authorization(), evaluator());
  assert(output.result === 'BLOCKED_POLICY' && output.blocking_detail === 'PROTECTED_MATERIAL_EXCLUDED', 'protected material must be excluded');

  const latest = [{ dependency_key: 'normalization-policy', version_ref: 'latest', status: 'ACTIVE' }];
  output = preview.createNormalizationPreview(request({ resolved_version_set: latest, placement_descriptor: placement(fieldDescriptor(), latest) }), authorization(), evaluator());
  assert(output.result === 'BLOCKED_POLICY' && output.blocking_detail === 'UNRESOLVED_OR_INACTIVE_VERSION_SET', 'implicit latest must fail closed');

  output = preview.createNormalizationPreview(input, authorization(), {
    evaluator_version_ref: 'broken@1',
    evaluate: () => { throw new Error('offline'); },
  });
  assert(output.result === 'TECHNICAL_FAILURE' && output.observed_value === input.observed_value, 'technical failure must preserve observed input');

  const baseline = {
    value_version_or_hash: 'source@1',
    scope_ref: 'org:vento',
    policy_coordinate: 'policy@1',
    version_set_digest: 'versions@1',
    uniqueness_state_ref: 'unique@1',
    relationships_state_ref: 'relations@1',
  };
  let divergence = preview.analyzePreviewDivergence(baseline, baseline);
  assert(!divergence.has_material_divergence && divergence.changed_dimensions.length === 0, 'stable snapshot must not invent divergence');
  assert(divergence.disposition === 'TRANSACTIONAL_REVALIDATION_STILL_REQUIRED', 'stable preview must still require revalidation');
  divergence = preview.analyzePreviewDivergence(baseline, {
    value_version_or_hash: 'source@2',
    scope_ref: 'org:other',
    policy_coordinate: 'policy@2',
    version_set_digest: 'versions@2',
    uniqueness_state_ref: 'unique@2',
    relationships_state_ref: 'relations@2',
  });
  exactArray(divergence.changed_dimensions, expectedDivergenceDimensions, 'all divergence dimensions');
  assert(divergence.has_material_divergence && divergence.commit_authority === false, 'divergence must remain non-mutating');
}

async function main() {
  includesAll(fs.readdirSync(sourceRoot), [
    'normalization.types.ts',
    'normalization.rules.ts',
    'normalization.catalogs.ts',
    'normalization.dictionary.ts',
    'normalization.search.ts',
    'normalization.preview.ts',
  ], 'src entries');
  includesAll(fs.readdirSync(path.join(packageRoot, 'scripts')), [
    'validate-normalization-types.mjs',
    'validate-normalization-rules.mjs',
    'validate-normalization-catalogs.mjs',
    'validate-normalization-dictionary.mjs',
    'validate-normalization-search.mjs',
    'validate-normalization-preview.mjs',
  ], 'script entries');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-NORM-007');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-007 source contract SHA256 mismatch');
  assert(owner.includes('modalidad física | `GLOBAL_ENABLE_ONCE`'), 'GLOBAL_ENABLE_ONCE reconciliation missing');
  assert(owner.includes('gate temporal | `PRE_E5_FOUNDATION`'), 'PRE_E5_FOUNDATION reconciliation missing');

  const source = fs.readFileSync(previewPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  includesAll(source, [
    'NORMALIZATION_EVALUATION_QUERY',
    'PREVIEW_AND_GUIDANCE',
    'AUTHORITATIVE_SEMANTIC_EVALUATION',
    'createNormalizationPreview',
    'analyzePreviewDivergence',
    "binding: 'NON_BINDING'",
    'requires_transactional_revalidation: true',
  ], 'preview source markers');
  for (const pattern of [
    /node:fs/u,
    /node:net/u,
    /node:http/u,
    /process\.env/u,
    /fetch\s*\(/u,
    /Date\.now\s*\(/u,
    /Math\.random\s*\(/u,
    /from ['"]@supabase\//u,
    /\b(?:insert|update|delete|upsert|commit|rollback)\s*\(/iu,
  ]) {
    assert(!pattern.test(source), `preview runtime dependency or mutation forbidden: ${pattern}`);
  }
  includesAll(readme, [
    '## Materializacion de SHELL-NORM-006',
    '## Materializacion de SHELL-NORM-007',
    'funciones de autoridad: 4',
    'capas logicas: 4',
    'atributos del descriptor de colocacion: 21',
    'etapas del flujo transaccional: 10',
    'dimensiones de divergencia: 6',
    'resultados cerrados de preview: 7',
    'binding: NON_BINDING',
    'cambios Supabase: 0',
    `Source contract SHA-256 \`SHELL-NORM-007\`: \`${SOURCE_CONTRACT_SHA256}\`.`,
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
    'packages/data-normalization/scripts/validate-normalization-types.mjs',
    'packages/data-normalization/scripts/validate-normalization-rules.mjs',
    'packages/data-normalization/scripts/validate-normalization-catalogs.mjs',
    'packages/data-normalization/scripts/validate-normalization-dictionary.mjs',
    'packages/data-normalization/scripts/validate-normalization-search.mjs',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
  ]);

  const previous = run(process.execPath, [previousValidatorPath]);
  assert(
    previous.status === 0,
    `SHELL-NORM-006 compatibility validator failed: ${previous.stderr || previous.stdout || previous.status}`,
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm007-'));
  try {
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-007 preview validated; '
      + 'authority_functions=4 layers=4 descriptor_fields=21 transaction_stages=10 '
      + 'divergence_dimensions=6 results=7 behavior=PASS previous_compatibility=PASS',
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FAIL: ${asciiSafe(message)}`);
  process.exitCode = 1;
});
