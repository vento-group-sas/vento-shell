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
const searchPath = path.join(sourceRoot, 'normalization.search.ts');
const readmePath = path.join(packageRoot, 'README.md');
const previousValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-dictionary.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const SOURCE_CONTRACT_SHA256 = '64d18e5a35e8a91dbae23cd0f3cef6928a684d8ba2c9e6e37101f1e7959a5a14';
const POLICY_ID = 'VENTO_TEXT_SEARCH_AND_COMPARISON_POLICY@1.0.0';

const expectedRepresentations = [
  'SEARCH_FORM_KEY',
  'SEARCH_ACCENT_KEY',
  'SEARCH_TOKEN_STREAM',
  'SEARCH_APPROVED_ALIAS_SET',
  'SEARCH_TRANSLITERATION_KEY',
  'SEARCH_STRUCTURED_COMPONENT_SET',
  'SEARCH_FREE_TEXT_TERMS',
];
const expectedTokenClasses = [
  'LEXICAL_TOKEN',
  'NUMERIC_TOKEN',
  'TECHNICAL_TOKEN',
  'INTERNAL_COMPOUND_TOKEN',
  'PUNCTUATION_BOUNDARY',
  'WHITESPACE_BOUNDARY',
  'UNRESOLVED_TOKEN_OR_BOUNDARY',
];
const expectedAliasFields = [
  'alias_key', 'canonical_target_reference', 'alias_form', 'match_scope', 'semantic_class',
  'domain_scope', 'entity_scope', 'field_scope', 'language_profile', 'source_authority',
  'approval_reference', 'status', 'valid_from', 'valid_to', 'alias_version',
];
const expectedProfiles = [
  'STRICT_TECHNICAL_LOOKUP',
  'STANDARD_COMMERCIAL_NAME',
  'OFFICIAL_FORM_LOOKUP',
  'STRUCTURED_PRESENTATION_LOOKUP',
  'FREE_TEXT_DISCOVERY',
  'RESTRICTED_HUMAN_OR_LOCATION',
];
const expectedModes = [
  'EXACT_VALUE_MATCH',
  'FORM_EQUIVALENT_MATCH',
  'ACCENT_TOLERANT_MATCH',
  'APPROVED_ALIAS_MATCH',
  'ORDERED_PHRASE_MATCH',
  'ALL_TOKEN_MATCH',
  'LAST_TOKEN_PREFIX_MATCH',
  'TRANSLITERATION_FALLBACK_MATCH',
  'SIMILARITY_CANDIDATE_ONLY',
];
const expectedResponseFields = [
  'entity_id', 'entity_type', 'display_value', 'matched_field', 'match_mode', 'match_level',
  'matched_terms_or_components', 'search_profile', 'language_profile', 'algorithm_version',
  'scope_summary', 'source_value_version_or_hash', 'is_historical_or_inactive',
];
const expectedStructuredComponents = [
  'product_id', 'quantity', 'input_unit_code', 'stock_quantity', 'stock_unit_code',
  'multiplier', 'package_kind', 'usage_context', 'supplier_or_source_scope',
  'validity_or_status', 'visible_label',
];

function compileSearch(tempDir) {
  const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
  const files = [
    'normalization.types.ts',
    'normalization.rules.ts',
    'normalization.catalogs.ts',
    'normalization.dictionary.ts',
    'normalization.search.ts',
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

function tokenizer(value) {
  const parts = value.match(/[\p{L}\p{M}]+(?:[-'][\p{L}\p{M}]+)*|\d+(?:[.,]\d+)?| +|./gu) ?? [];
  return parts.map((text) => {
    if (/^ +$/u.test(text)) return { text, token_class: 'WHITESPACE_BOUNDARY' };
    if (/^\d/u.test(text)) return { text, token_class: 'NUMERIC_TOKEN' };
    if (/^[\p{L}\p{M}]+[-'][\p{L}\p{M}]+$/u.test(text)) {
      return { text, token_class: 'INTERNAL_COMPOUND_TOKEN' };
    }
    if (/^[\p{L}\p{M}]+$/u.test(text)) return { text, token_class: 'LEXICAL_TOKEN' };
    return { text, token_class: 'PUNCTUATION_BOUNDARY' };
  });
}

function descriptor(semanticClass = 'COMMERCIAL_NAME') {
  return {
    coordinate: {
      owner_domain_ref: 'inventory',
      owner_entity_ref: 'product',
      semantic_field_ref: 'commercial_name',
    },
    semantic_class: semanticClass,
    representation_role: 'SEARCH_DERIVATION',
    source_role: 'AUTHORITATIVE_SOURCE',
    policy_version_ref: POLICY_ID,
  };
}

function policy(overrides = {}) {
  return {
    policy_id: POLICY_ID,
    algorithm_version: '1.0.0',
    language_profile: 'es-CO',
    profile: 'STANDARD_COMMERCIAL_NAME',
    purpose_ref: 'AUTHORIZED_PRODUCT_LOOKUP',
    scope_ref: 'SITE-001',
    descriptor: descriptor(),
    enabled_representations: [...expectedRepresentations],
    allow_edge_trim: true,
    allow_internal_space_compaction: true,
    allow_diaeresis_fold: true,
    transliteration_enabled: false,
    similarity_enabled: false,
    ...overrides,
  };
}

function adapters() {
  return {
    text: {
      unicode_version_ref: 'UNICODE-NFC@15.1',
      case_mapping_version_ref: 'ES-CO-CASE@1.0.0',
      tokenization_version_ref: 'VENTO-TOKENIZER@1.0.0',
      accent_folding_version_ref: 'ES-CO-ACCENT-FOLD@1.0.0',
      normalize_nfc: (value) => value.normalize('NFC'),
      case_fold: (value, locale) => value.toLocaleLowerCase(locale),
      tokenize: tokenizer,
      fold_es_co_accents: (value, foldDiaeresis) => value
        .replaceAll('á', 'a')
        .replaceAll('é', 'e')
        .replaceAll('í', 'i')
        .replaceAll('ó', 'o')
        .replaceAll('ú', 'u')
        .replaceAll('Á', 'A')
        .replaceAll('É', 'E')
        .replaceAll('Í', 'I')
        .replaceAll('Ó', 'O')
        .replaceAll('Ú', 'U')
        .replaceAll(foldDiaeresis ? 'ü' : '\u0000', foldDiaeresis ? 'u' : '\u0000'),
    },
    aliases: {
      alias_catalog_version_ref: 'VENTO-SEARCH-ALIASES@1.0.0',
      resolve: () => [],
    },
    authorization: {
      authorization_version_ref: 'VENTO-AUTH-CONTEXT@1.0.0',
      authorize: () => true,
    },
  };
}

function candidate(entityId, sourceValue, overrides = {}) {
  return {
    entity_id: entityId,
    entity_type: 'product',
    source_value: sourceValue,
    display_value: sourceValue,
    matched_field: 'commercial_name',
    scope_ref: 'SITE-001',
    scope_specificity: 10,
    approved_business_priority: null,
    stable_domain_sort_key: sourceValue,
    source_value_version_or_hash: `hash:${entityId}`,
    is_historical_or_inactive: false,
    ...overrides,
  };
}

async function assertBehavior(tempDir) {
  compileSearch(tempDir);
  const search = await import(`${pathToFileURL(path.join(tempDir, 'normalization.search.js')).href}?v=${Date.now()}`);
  exactArray(search.SEARCH_REPRESENTATIONS, expectedRepresentations, 'representations');
  exactArray(search.SEARCH_TOKEN_CLASSES, expectedTokenClasses, 'token classes');
  exactArray(search.SEARCH_ALIAS_FIELDS, expectedAliasFields, 'alias fields');
  exactArray(search.SEARCH_PROFILES, expectedProfiles, 'profiles');
  exactArray(search.SEARCH_MATCH_MODES, expectedModes, 'match modes');
  exactArray(search.SEARCH_RESPONSE_FIELDS, expectedResponseFields, 'response fields');
  exactArray(search.STRUCTURED_PRESENTATION_COMPONENTS, expectedStructuredComponents, 'structured components');
  assert(search.SEARCH_PIPELINE.length === 15, 'pipeline must contain exactly 15 steps');
  assert(Object.keys(search.SEARCH_CLASS_PROFILE_MATRIX).length === 14, 'semantic matrix must contain 14 classes');

  const deps = adapters();
  let result = search.evaluateSearchCandidates(
    'harina de maiz',
    [candidate('P-001', 'Harina de Maíz')],
    policy(),
    deps.text,
    deps.aliases,
    deps.authorization,
  );
  assert(
    result.status === 'RESULTS'
      && result.results[0].match_mode === 'ACCENT_TOLERANT_MATCH'
      && result.results[0].display_value === 'Harina de Maíz',
    'accent tolerant lookup must preserve display value',
  );

  result = search.evaluateSearchCandidates(
    'ano',
    [candidate('P-002', 'año')],
    policy(),
    deps.text,
    deps.aliases,
    deps.authorization,
  );
  assert(result.status === 'NO_RESULTS', 'n and n-with-tilde must remain distinct');

  result = search.evaluateSearchCandidates(
    'Choco Bites',
    [candidate('P-003', 'Chocobites')],
    policy(),
    deps.text,
    deps.aliases,
    deps.authorization,
  );
  assert(result.status === 'NO_RESULTS', 'search must not join or split words implicitly');

  result = search.evaluateSearchCandidates(
    'coca-cola',
    [candidate('P-004', 'Coca-Cola'), candidate('P-005', 'Coca Cola')],
    policy(),
    deps.text,
    deps.aliases,
    deps.authorization,
  );
  assert(
    result.status === 'RESULTS'
      && result.results.length === 1
      && result.results[0].entity_id === 'P-004'
      && result.results[0].match_mode === 'FORM_EQUIVALENT_MATCH',
    'punctuation boundaries must remain significant',
  );

  result = search.evaluateSearchCandidates('', [], policy(), deps.text, deps.aliases, deps.authorization);
  assert(result.status === 'BLOCKED', 'empty query must fail closed');

  const denied = { ...deps.authorization, authorize: () => false };
  result = search.evaluateSearchCandidates('maiz', [], policy(), deps.text, deps.aliases, denied);
  assert(result.status === 'BLOCKED', 'authorization denial must fail closed');

  result = search.evaluateSearchCandidates(
    'secret',
    [],
    policy({ descriptor: descriptor('SECRET_OR_SIGNATURE_MATERIAL') }),
    deps.text,
    deps.aliases,
    deps.authorization,
  );
  assert(result.status === 'BLOCKED', 'secret material must not receive general search derivation');

  result = search.evaluateSearchCandidates(
    'harina ma',
    [
      candidate('P-020', 'Harina Maíz', { stable_domain_sort_key: 'B' }),
      candidate('P-010', 'Harina Maíz', { stable_domain_sort_key: 'A' }),
    ],
    policy(),
    deps.text,
    deps.aliases,
    deps.authorization,
  );
  assert(
    result.status === 'RESULTS'
      && result.results[0].entity_id === 'P-010'
      && result.results.every((entry) => entry.match_mode === 'LAST_TOKEN_PREFIX_MATCH'),
    'last-token prefix and stable ranking must be deterministic',
  );
}

async function main() {
  includesAll(fs.readdirSync(sourceRoot), [
    'normalization.types.ts',
    'normalization.rules.ts',
    'normalization.catalogs.ts',
    'normalization.dictionary.ts',
    'normalization.search.ts',
  ], 'src entries');
  includesAll(fs.readdirSync(path.join(packageRoot, 'scripts')), [
    'validate-normalization-types.mjs',
    'validate-normalization-rules.mjs',
    'validate-normalization-catalogs.mjs',
    'validate-normalization-dictionary.mjs',
    'validate-normalization-search.mjs',
  ], 'script entries');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-NORM-006');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-006 source contract SHA256 mismatch');
  assert(owner.includes('modalidad física | `GLOBAL_ENABLE_ONCE`'), 'GLOBAL_ENABLE_ONCE reconciliation missing');
  assert(owner.includes('gate temporal | `PRE_E5_FOUNDATION`'), 'PRE_E5_FOUNDATION reconciliation missing');

  const source = fs.readFileSync(searchPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  includesAll(source, [
    POLICY_ID,
    'deriveSearchRepresentations',
    'evaluateSearchCandidates',
    'SEARCH_CLASS_PROFILE_MATRIX',
    'transliteration_enabled: false',
    'similarity_enabled: false',
  ], 'search source markers');
  for (const pattern of [
    /node:fs/u,
    /node:net/u,
    /node:http/u,
    /process\.env/u,
    /fetch\s*\(/u,
    /Date\.now\s*\(/u,
    /Math\.random\s*\(/u,
    /from ['"]@supabase\//u,
    /levenshtein/iu,
    /unaccent/iu,
  ]) {
    assert(!pattern.test(source), `search runtime dependency or heuristic forbidden: ${pattern}`);
  }
  includesAll(readme, [
    '## Materializacion de SHELL-NORM-005',
    '## Materializacion de SHELL-NORM-006',
    POLICY_ID,
    'representaciones derivadas: 7',
    'clases de token o frontera: 7',
    'perfiles cerrados: 6',
    'modos de coincidencia: 9',
    'pipeline de busqueda: 15',
    'atributos de respuesta: 13',
    'clases semanticas: 14',
    'componentes estructurados: 11',
    'transliteracion: DESHABILITADA',
    'similitud: DESHABILITADA',
    'cambios Supabase: 0',
    `Source contract SHA-256 \`SHELL-NORM-006\`: \`${SOURCE_CONTRACT_SHA256}\`.`,
  ], 'README markers');

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/data-normalization/package.json',
    'packages/data-normalization/src/normalization.types.ts',
    'packages/data-normalization/src/normalization.rules.ts',
    'packages/data-normalization/src/normalization.catalogs.ts',
    'packages/data-normalization/src/normalization.dictionary.ts',
    'packages/data-normalization/scripts/validate-normalization-types.mjs',
    'packages/data-normalization/scripts/validate-normalization-rules.mjs',
    'packages/data-normalization/scripts/validate-normalization-catalogs.mjs',
    'packages/data-normalization/scripts/validate-normalization-dictionary.mjs',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
  ]);

  const previous = run(process.execPath, [previousValidatorPath]);
  assert(
    previous.status === 0,
    `SHELL-NORM-005 compatibility validator failed: ${previous.stderr || previous.stdout || previous.status}`,
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm006-'));
  try {
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-006 search validated; '
      + 'representations=7 token_classes=7 alias_fields=15 profiles=6 modes=9 pipeline=15 '
      + 'response_fields=13 semantic_classes=14 structured_components=11 '
      + 'behavior=PASS previous_compatibility=PASS',
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FAIL: ${asciiSafe(message)}`);
  process.exitCode = 1;
});
