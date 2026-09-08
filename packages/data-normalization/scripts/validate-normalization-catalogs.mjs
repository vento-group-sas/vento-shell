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
} = createDataNormalizationValidatorHarness(
  import.meta.url,
);

const catalogsPath = path.join(packageRoot, 'src', 'normalization.catalogs.ts');
const rulesPath = path.join(packageRoot, 'src', 'normalization.rules.ts');
const typesPath = path.join(packageRoot, 'src', 'normalization.types.ts');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const previousValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-rules.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const SOURCE_CONTRACT_SHA256 = 'abacc131fb8dd2b18dbd59ef04915e516f6044d4737422b55e45f1eb5dda64ef';
const CONNECTOR_CATALOG_ID = 'VENTO_COMMERCIAL_CONNECTOR_CATALOG_ES_CO@1.0.0';
const EXCEPTION_CATALOG_ID = 'VENTO_OFFICIAL_TEXT_EXCEPTION_CATALOG@1.0.0';

const expectedConnectors = [
  'a', 'al', 'con', 'de', 'del', 'e', 'el', 'en', 'la', 'las', 'lo', 'los',
  'o', 'para', 'por', 'sin', 'u', 'y',
];
const expectedConnectorFamilies = [
  'preposiciones y contracciones',
  'artículos',
  'conjunciones coordinantes',
];
const expectedConnectorPositions = ['NAME_START', 'DECLARED_SEGMENT_START', 'INTERNAL'];
const expectedConnectorResults = [
  'CONNECTOR_INITIAL_CAPITALIZED',
  'CONNECTOR_INTERNAL_LOWERCASED',
  'CONNECTOR_PRESERVED_BY_EXCEPTION',
  'CONNECTOR_PRESERVED_AMBIGUOUS',
  'CONNECTOR_POLICY_BLOCKED',
];
const expectedExceptionFamilies = [
  'OFFICIAL_BRAND_EXCEPTION',
  'CONTROLLED_ACRONYM_EXCEPTION',
  'MEASUREMENT_UNIT_EXCEPTION',
  'OFFICIAL_LEGAL_NAME_EXCEPTION',
];
const expectedExceptionFields = [
  'exception_key', 'family', 'canonical_form', 'scope_kind', 'domain_scope',
  'entity_scope', 'field_scope', 'semantic_class', 'representation_role',
  'source_role', 'language_profile', 'match_mode', 'accepted_variants',
  'application_mode', 'authority_type', 'authority_owner', 'evidence_reference',
  'status', 'valid_from', 'valid_to', 'catalog_version', 'supersedes', 'reason',
];
const expectedScopes = ['FULL_VALUE', 'PHRASE', 'TOKEN', 'STRUCTURED_COMPONENT'];
const expectedMatchModes = ['EXACT', 'CASEFOLD_EXACT', 'EXPLICIT_ALIAS'];
const expectedApplicationModes = [
  'PRESERVE_MATCHED_FORM', 'EMIT_CANONICAL_FORM', 'VALIDATE_ONLY', 'DERIVE_ONLY',
];
const expectedExceptionResults = [
  'EXCEPTION_CANONICAL_EMITTED',
  'EXCEPTION_PRESERVED_OFFICIAL',
  'EXCEPTION_VALIDATED_NO_REWRITE',
  'EXCEPTION_DERIVATION_ONLY',
  'EXCEPTION_NOT_APPLICABLE',
  'EXCEPTION_AMBIGUOUS_REVIEW',
  'EXCEPTION_POLICY_BLOCKED',
];
const expectedAuthorityTypes = [
  'INTERNAL_CANONICAL_OWNER',
  'BRAND_OWNER_OR_MANUFACTURER',
  'LEGAL_OR_REGULATORY_SOURCE',
  'CONTROLLED_STANDARD_OR_DOMAIN_CATALOG',
  'APPROVED_EXTERNAL_EVIDENCE',
];
const expectedStatuses = ['ACTIVE', 'SUSPENDED', 'RETIRED'];
const expectedNormativeForms = [
  '3M', 'iPhone', 'Coca-Cola',
  'NEXO', 'VISO', 'ORIGO', 'NUMERA', 'FOGO', 'PULSO', 'VGR', 'SAU', 'VCF', 'COP',
  'g', 'kg', 'ml', 'l', 'un', 'dz', 'count', 'mass', 'volume',
  'SAS', 'S.A.S.', 'SA', 'S.A.', 'LTDA', 'CIA',
];
const expectedFormFamilies = {
  OFFICIAL_BRAND_EXCEPTION: 3,
  CONTROLLED_ACRONYM_EXCEPTION: 10,
  MEASUREMENT_UNIT_EXCEPTION: 9,
  OFFICIAL_LEGAL_NAME_EXCEPTION: 6,
};
const expectedCandidateKinds = {
  BRAND_OR_MIXED_FORM: 14,
  CONTROLLED_ACRONYM_OR_CODE: 11,
  STRUCTURAL_OR_LEXICAL_FORM: 9,
};

function countBy(items, field) {
  const result = {};
  for (const item of items) result[item[field]] = (result[item[field]] ?? 0) + 1;
  return result;
}

function compileCatalogs(tempDir) {
  const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
  const sourceRoot = path.join(packageRoot, 'src');
  const result = run(process.execPath, [
    tscCli,
    '--pretty', 'false',
    '--skipLibCheck',
    '--target', 'ES2022',
    '--module', 'NodeNext',
    '--moduleResolution', 'NodeNext',
    '--rootDir', sourceRoot,
    '--outDir', tempDir,
    typesPath,
    rulesPath,
    catalogsPath,
  ]);
  assert(
    result.status === 0,
    `runtime fixture TypeScript compile failed: ${result.stderr || result.stdout || result.status}`,
  );
}

function baseDescriptor(overrides = {}) {
  return {
    coordinate: {
      owner_domain_ref: 'validator-domain',
      owner_entity_ref: 'validator-entity',
      semantic_field_ref: 'validator-field',
    },
    semantic_class: 'COMMERCIAL_NAME',
    representation_role: 'PRIMARY_VALUE',
    source_role: 'AUTHORITATIVE_SOURCE',
    policy_version_ref: 'policy@1',
    ...overrides,
  };
}

function capitalizationPolicy() {
  return {
    descriptor: baseDescriptor(),
    operation_kind: 'COMMERCIAL_CAPITALIZATION',
    treatment_mode: 'DETERMINISTIC_MUTATION_ALLOWED',
    allowed_operations: ['COMMERCIAL_CAPITALIZATION'],
    policy_version_ref: 'policy@1',
  };
}

function capitalizationProfile() {
  return {
    profile_ref: 'VENTO_COMMERCIAL_CAPITALIZATION_ES_CO@1.0.0',
    locale: 'es-CO',
    capitalization_version_ref: 'capitalization@1',
    enable_declared_segment_starts: true,
  };
}

function segmentForFixture(value) {
  const parts = value.match(/\s+|[:—–]|[^\s:—–]+/gu) ?? [];
  return parts.map((text) => ({
    text,
    is_separator: /^\s+$/u.test(text) || /^[:—–]$/u.test(text),
  }));
}

function textAdapter() {
  return {
    segmentation_version_ref: 'segmentation@1',
    case_mapping_version_ref: 'case@1',
    segment: segmentForFixture,
    graphemes: (value) => Array.from(value),
    to_upper: (value, locale) => value.toLocaleUpperCase(locale),
    to_lower: (value, locale) => value.toLocaleLowerCase(locale),
  };
}

function caseAdapter() {
  return {
    case_mapping_version_ref: 'case@1',
    to_lower: (value, locale) => value.toLocaleLowerCase(locale),
    to_upper: (value, locale) => value.toLocaleUpperCase(locale),
  };
}

function binding(overrides = {}) {
  return {
    scope_kind: 'TOKEN',
    domain_scope: ['validator-domain'],
    entity_scope: ['validator-entity'],
    field_scope: ['validator-field'],
    semantic_class: 'COMMERCIAL_NAME',
    representation_role: 'PRIMARY_VALUE',
    source_role: 'AUTHORITATIVE_SOURCE',
    language_profile: 'es-CO',
    accepted_variants: [],
    application_mode: 'EMIT_CANONICAL_FORM',
    authority_type: 'INTERNAL_CANONICAL_OWNER',
    authority_owner: 'validator-owner',
    evidence_reference: 'validator-evidence',
    status: 'ACTIVE',
    valid_from: '2026-01-01T00:00:00Z',
    valid_to: null,
    supersedes: [],
    reason: 'validator fixture explicit binding',
    ...overrides,
  };
}

function buildEntry(catalogs, formKey, overrides = {}) {
  const built = catalogs.materializeOfficialExceptionEntry(formKey, binding(overrides));
  assert(built.ok, `fixture binding failed for ${formKey}: ${built.reason ?? 'unknown'}`);
  return built.entry;
}

async function assertBehavior(tempDir) {
  compileCatalogs(tempDir);
  const stamp = Date.now();
  const rules = await import(`${pathToFileURL(path.join(tempDir, 'normalization.rules.js')).href}?v=${stamp}`);
  const catalogs = await import(`${pathToFileURL(path.join(tempDir, 'normalization.catalogs.js')).href}?v=${stamp}`);

  exactArray(catalogs.COMMERCIAL_CONNECTOR_ENTRIES.map((entry) => entry.entry), expectedConnectors, 'connectors');
  exactArray(catalogs.COMMERCIAL_CONNECTOR_FAMILIES, expectedConnectorFamilies, 'connector families');
  exactArray(catalogs.COMMERCIAL_CONNECTOR_POSITIONS, expectedConnectorPositions, 'connector positions');
  exactArray(catalogs.COMMERCIAL_CONNECTOR_RESULTS, expectedConnectorResults, 'connector results');
  exactArray(catalogs.OFFICIAL_EXCEPTION_FAMILIES, expectedExceptionFamilies, 'exception families');
  exactArray(catalogs.OFFICIAL_EXCEPTION_ENTRY_FIELDS, expectedExceptionFields, 'exception fields');
  exactArray(catalogs.OFFICIAL_EXCEPTION_SCOPE_KINDS, expectedScopes, 'exception scopes');
  exactArray(catalogs.OFFICIAL_EXCEPTION_MATCH_MODES, expectedMatchModes, 'exception match modes');
  exactArray(catalogs.OFFICIAL_EXCEPTION_APPLICATION_MODES, expectedApplicationModes, 'application modes');
  exactArray(catalogs.OFFICIAL_EXCEPTION_RESULTS, expectedExceptionResults, 'exception results');
  exactArray(catalogs.OFFICIAL_EXCEPTION_AUTHORITY_TYPES, expectedAuthorityTypes, 'authority types');
  exactArray(catalogs.OFFICIAL_EXCEPTION_STATUSES, expectedStatuses, 'statuses');
  exactArray(
    catalogs.OFFICIAL_EXCEPTION_NORMATIVE_FORMS.map((entry) => entry.canonical_form),
    expectedNormativeForms,
    'normative forms',
  );
  assert(
    new Set(catalogs.OFFICIAL_EXCEPTION_NORMATIVE_FORMS.map((entry) => entry.form_key)).size === 28,
    'normative form keys must be unique',
  );
  assert(
    new Set(catalogs.OFFICIAL_EXCEPTION_NORMATIVE_FORMS.map((entry) => entry.canonical_form)).size === 28,
    'normative canonical forms must be unique',
  );
  assert(
    JSON.stringify(countBy(catalogs.OFFICIAL_EXCEPTION_NORMATIVE_FORMS, 'family'))
      === JSON.stringify(expectedFormFamilies),
    'normative form family distribution mismatch',
  );
  assert(
    catalogs.NON_ACTIVABLE_EXCEPTION_CANDIDATE_CASES.length === 34,
    'candidate case count must be 34',
  );
  assert(
    JSON.stringify(countBy(catalogs.NON_ACTIVABLE_EXCEPTION_CANDIDATE_CASES, 'kind'))
      === JSON.stringify(expectedCandidateKinds),
    'candidate distribution mismatch',
  );
  const candidateForms = new Set(
    catalogs.NON_ACTIVABLE_EXCEPTION_CANDIDATE_CASES.flatMap((entry) => entry.observed_forms),
  );
  const promotedCandidates = catalogs.OFFICIAL_EXCEPTION_NORMATIVE_FORMS
    .map((entry) => entry.canonical_form)
    .filter((form) => candidateForms.has(form));
  exactArray(promotedCandidates, [], 'promoted candidates');

  const incomplete = catalogs.materializeOfficialExceptionEntry('EXC-BRAND-001', binding({
    authority_owner: '',
  }));
  assert(!incomplete.ok, 'exception entry without explicit authority owner must not materialize');

  const activeEntries = [
    buildEntry(catalogs, 'EXC-BRAND-001'),
    buildEntry(catalogs, 'EXC-BRAND-002'),
    buildEntry(catalogs, 'EXC-BRAND-003', { scope_kind: 'PHRASE' }),
    buildEntry(catalogs, 'EXC-ACRONYM-001'),
  ];
  const resolver = catalogs.createCommercialCapitalizationCatalogResolver({
    descriptor: baseDescriptor(),
    case_adapter: caseAdapter(),
    exception_entries: activeEntries,
    effective_at: '2026-08-23T14:00:00Z',
  });

  let result = rules.applyCommercialCapitalization(
    'jugo DE naranja y 3m',
    capitalizationPolicy(),
    capitalizationProfile(),
    textAdapter(),
    resolver,
  );
  assert(
    result.value === 'Jugo de Naranja y 3M' && result.changed && !result.blocked,
    'connector + brand fixture mismatch',
  );
  const second = rules.applyCommercialCapitalization(
    result.value,
    capitalizationPolicy(),
    capitalizationProfile(),
    textAdapter(),
    resolver,
  );
  assert(second.value === result.value && !second.changed && !second.blocked, 'capitalization must be idempotent');

  result = rules.applyCommercialCapitalization(
    'nexo',
    capitalizationPolicy(),
    capitalizationProfile(),
    textAdapter(),
    resolver,
  );
  assert(result.value === 'NEXO' && !result.blocked, 'explicit NEXO binding must emit canonical form');

  result = rules.applyCommercialCapitalization(
    'BBQ',
    capitalizationPolicy(),
    capitalizationProfile(),
    textAdapter(),
    resolver,
  );
  assert(result.value === 'BBQ' && result.blocked && result.review_required, 'BBQ must remain non-activable');

  const resolverWithoutIphone = catalogs.createCommercialCapitalizationCatalogResolver({
    descriptor: baseDescriptor(),
    case_adapter: caseAdapter(),
    exception_entries: activeEntries.filter((entry) => entry.exception_key !== 'EXC-BRAND-002'),
    effective_at: '2026-08-23T14:00:00Z',
  });
  result = rules.applyCommercialCapitalization(
    'iPhone',
    capitalizationPolicy(),
    capitalizationProfile(),
    textAdapter(),
    resolverWithoutIphone,
  );
  assert(
    result.value === 'iPhone' && result.blocked && result.review_required,
    'normative form without explicit binding must fail closed',
  );

  const unitDescriptor = baseDescriptor({ semantic_class: 'MEASUREMENT_OR_UNIT_CODE' });
  const kgEntry = buildEntry(catalogs, 'EXC-UNIT-002', {
    semantic_class: 'MEASUREMENT_OR_UNIT_CODE',
    application_mode: 'EMIT_CANONICAL_FORM',
    authority_type: 'CONTROLLED_STANDARD_OR_DOMAIN_CATALOG',
  });
  let exceptionResult = catalogs.evaluateOfficialException('KG', [kgEntry], {
    descriptor: unitDescriptor,
    scope_kind: 'TOKEN',
    case_adapter: caseAdapter(),
    effective_at: '2026-08-23T14:00:00Z',
  });
  assert(
    exceptionResult.result === 'EXCEPTION_CANONICAL_EMITTED'
      && exceptionResult.output === 'kg'
      && !exceptionResult.blocked,
    'unit canonical emission mismatch',
  );

  exceptionResult = catalogs.evaluateOfficialException('BBQ', [], {
    descriptor: baseDescriptor(),
    scope_kind: 'TOKEN',
    case_adapter: caseAdapter(),
    effective_at: '2026-08-23T14:00:00Z',
  });
  assert(
    exceptionResult.result === 'EXCEPTION_AMBIGUOUS_REVIEW' && exceptionResult.blocked,
    'candidate evaluation must require review',
  );

  const sasEntry = buildEntry(catalogs, 'EXC-LEGAL-001', {
    semantic_class: 'OFFICIAL_LEGAL_NAME',
    application_mode: 'PRESERVE_MATCHED_FORM',
    authority_type: 'LEGAL_OR_REGULATORY_SOURCE',
  });
  const legalDescriptor = baseDescriptor({ semantic_class: 'OFFICIAL_LEGAL_NAME' });
  exceptionResult = catalogs.evaluateOfficialException('SAS', [sasEntry], {
    descriptor: legalDescriptor,
    scope_kind: 'TOKEN',
    case_adapter: caseAdapter(),
    effective_at: '2026-08-23T14:00:00Z',
  });
  assert(exceptionResult.result === 'EXCEPTION_PRESERVED_OFFICIAL', 'SAS must preserve exact legal form');
  const aliasAttempt = catalogs.evaluateOfficialException('S.A.S.', [sasEntry], {
    descriptor: legalDescriptor,
    scope_kind: 'TOKEN',
    case_adapter: caseAdapter(),
    effective_at: '2026-08-23T14:00:00Z',
  });
  assert(aliasAttempt.result === 'EXCEPTION_NOT_APPLICABLE', 'S.A.S. must not become an alias of SAS');
}

async function main() {
  includesAll(fs.readdirSync(packageRoot), ['README.md', 'package.json', 'scripts', 'src'], 'package root');
  includesAll(
    fs.readdirSync(path.join(packageRoot, 'src')),
    ['normalization.types.ts', 'normalization.rules.ts', 'normalization.catalogs.ts'],
    'src entries',
  );
  includesAll(
    fs.readdirSync(path.join(packageRoot, 'scripts')),
    ['validate-normalization-types.mjs', 'validate-normalization-rules.mjs', 'validate-normalization-catalogs.mjs'],
    'script entries',
  );

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  exactArray(Object.keys(packageJson).sort(), ['description', 'name', 'private', 'type'], 'package manifest keys');
  assert(packageJson.name === '@vento/data-normalization', 'package name mismatch');
  assert(packageJson.private === true && packageJson.type === 'module', 'package private/type boundary mismatch');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-NORM-004');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-004 source contract SHA256 mismatch');
  assert(owner.includes('modalidad física | `GLOBAL_ENABLE_ONCE`'), 'GLOBAL_ENABLE_ONCE reconciliation missing');
  assert(owner.includes('gate temporal | `PRE_E5_FOUNDATION`'), 'PRE_E5_FOUNDATION reconciliation missing');

  const catalogsSource = fs.readFileSync(catalogsPath, 'utf8');
  const rulesSource = fs.readFileSync(rulesPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');

  includesAll(catalogsSource, [
    CONNECTOR_CATALOG_ID,
    EXCEPTION_CATALOG_ID,
    'materializeOfficialExceptionEntry',
    'evaluateOfficialException',
    'createCommercialCapitalizationCatalogResolver',
    'NON_ACTIVABLE_EXCEPTION_CANDIDATE_CASES',
  ], 'catalog source markers');
  assert(rulesSource.includes('readonly review_input?: (value: string) => string | null;'), 'optional review_input hook missing');
  assert(rulesSource.includes('catalogs.review_input?.(input)'), 'review_input fail-closed evaluation missing');

  const forbiddenCatalogPatterns = [
    /process\.env/u,
    /fetch\s*\(/u,
    /from ['"]@supabase\//u,
    /Date\.now\s*\(/u,
    /Math\.random\s*\(/u,
  ];
  for (const pattern of forbiddenCatalogPatterns) {
    assert(!pattern.test(catalogsSource), `catalog runtime dependency forbidden: ${pattern}`);
  }

  includesAll(readme, [
    'conectores y excepciones: RESOLVERS VERSIONADOS, CATALOGOS NO MATERIALIZADOS',
    '## Materializacion de SHELL-NORM-004',
    'VENTO_COMMERCIAL_CONNECTOR_CATALOG_ES_CO@1.0.0',
    'VENTO_OFFICIAL_TEXT_EXCEPTION_CATALOG@1.0.0',
    'formas normativas iniciales: 28 = 22 + 6',
    'candidatos no activables: 34 = 14 + 11 + 9',
    'Source contract SHA-256 `SHELL-NORM-004`: `abacc131fb8dd2b18dbd59ef04915e516f6044d4737422b55e45f1eb5dda64ef`.',
    'exports publicos: NO MATERIALIZADOS',
    'cambios Supabase: 0',
  ], 'README markers');

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/data-normalization/package.json',
    'packages/data-normalization/src/normalization.types.ts',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-001__GLOBAL.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-002__GLOBAL.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-003__GLOBAL.json',
  ]);

  const previous = run(process.execPath, [previousValidatorPath]);
  assert(
    previous.status === 0,
    `SHELL-NORM-003 compatibility validator failed: ${previous.stderr || previous.stdout || previous.status}`,
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm004-'));
  try {
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-004 catalogs validated; '
      + 'connectors=18 connector_families=3 connector_positions=3 connector_results=5 '
      + 'exception_families=4 exception_fields=23 scopes=4 match_modes=3 application_modes=4 '
      + 'exception_results=7 authority_types=5 statuses=3 normative_forms=28 candidates=34 '
      + 'behavior=PASS previous_compatibility=PASS',
  );
}

main().catch((error) => {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
