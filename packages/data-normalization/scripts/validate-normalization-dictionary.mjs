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

const dictionaryPath = path.join(packageRoot, 'src', 'normalization.dictionary.ts');
const catalogsPath = path.join(packageRoot, 'src', 'normalization.catalogs.ts');
const rulesPath = path.join(packageRoot, 'src', 'normalization.rules.ts');
const typesPath = path.join(packageRoot, 'src', 'normalization.types.ts');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const previousValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-catalogs.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const SOURCE_CONTRACT_SHA256 = '6a9e98517f962da17c5b8877aa8f358f746e60a397ff621f8dd559bde5ae8837';
const DICTIONARY_ID = 'VENTO_CANONICAL_ORTHOGRAPHIC_DICTIONARY_ES_CO@1.0.0';
const CONNECTOR_CATALOG_ID = 'VENTO_COMMERCIAL_CONNECTOR_CATALOG_ES_CO@1.0.0';
const EXCEPTION_CATALOG_ID = 'VENTO_OFFICIAL_TEXT_EXCEPTION_CATALOG@1.0.0';
const CAPITALIZATION_PROFILE_ID = 'VENTO_COMMERCIAL_CAPITALIZATION_ES_CO@1.0.0';

const expectedEntryFields = [
  'dictionary_entry_key', 'locale', 'source_form', 'canonical_form', 'match_scope',
  'semantic_class', 'domain_scope', 'entity_scope', 'field_scope', 'representation_role',
  'source_role', 'case_projection_mode', 'decision_mode', 'status', 'valid_from',
  'valid_to', 'dictionary_version', 'supersedes', 'evidence_reference',
  'approval_reference', 'reason',
];
const expectedScopes = ['FULL_VALUE', 'PHRASE', 'TOKEN'];
const expectedDecisionModes = ['REPLACE_ORTHOGRAPHY', 'PRESERVE_AS_APPROVED', 'REVIEW_REQUIRED'];
const expectedResolutionLevels = [
  'FIELD_SCOPE', 'ENTITY_SCOPE', 'DOMAIN_SCOPE', 'VENTO_OS_TRANSVERSAL_SCOPE',
];
const expectedStatuses = [
  'DRAFT', 'APPROVED_ACTIVE', 'SUSPENDED', 'SUPERSEDED', 'RETIRED', 'REJECTED',
];
const expectedResults = [
  'DICTIONARY_CANONICAL_EMITTED',
  'DICTIONARY_ALREADY_CANONICAL',
  'DICTIONARY_PRESERVED_PROTECTED',
  'DICTIONARY_NOT_APPLICABLE',
  'DICTIONARY_AMBIGUOUS_REVIEW',
  'DICTIONARY_CONFLICT_BLOCKED',
  'DICTIONARY_POLICY_BLOCKED',
];
const expectedActivationConditions = [
  'existe una política activa para dominio, entidad y campo',
  'la clase semántica admite corrección mediante diccionario',
  'la representación y el rol de fuente permiten mutación o derivación',
  'el perfil lingüístico es es-CO',
  'la versión del diccionario es compatible con capitalización, conectores y excepciones',
  'la entrada está APPROVED_ACTIVE y dentro de vigencia',
  'la coincidencia exacta y fronteras pueden resolverse',
  'no existe excepción oficial o protección de mayor precedencia',
  'no existe conflicto entre entradas activas aplicables',
  'la proyección de caja puede resolverse determinísticamente',
  'decisión, entrada y versiones pueden quedar trazadas',
];
const expectedPrecedence = [
  'excepción oficial de frase válida más larga',
  'excepción oficial de token o componente estructurado',
  'protección técnica por clase, representación o fuente',
  'entrada de diccionario más específica',
  'entrada de frase más larga dentro de la misma especificidad',
  'entrada de token exacto',
  'token sin entrada',
  'forma ambigua o conflictiva',
];
const expectedEntries = [
  {
    dictionary_entry_key: 'ORTHO_ES_CO_MAIZ_MAIZ',
    source_form: 'maiz',
    canonical_form: 'maíz',
    match_scope: 'TOKEN',
    decision_mode: 'REPLACE_ORTHOGRAPHY',
  },
  {
    dictionary_entry_key: 'ORTHO_ES_CO_CLASICO_CLASICO',
    source_form: 'clasico',
    canonical_form: 'clásico',
    match_scope: 'TOKEN',
    decision_mode: 'REPLACE_ORTHOGRAPHY',
  },
  {
    dictionary_entry_key: 'ORTHO_ES_CO_FRIO_FRIO',
    source_form: 'frio',
    canonical_form: 'frío',
    match_scope: 'TOKEN',
    decision_mode: 'REPLACE_ORTHOGRAPHY',
  },
];

function compileDictionary(tempDir) {
  const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
  const sourceRoot = path.join(packageRoot, 'src');
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
    typesPath,
    rulesPath,
    catalogsPath,
    dictionaryPath,
  ]);
  assert(
    result.status === 0,
    `runtime fixture TypeScript compile failed: ${result.stderr || result.stdout || result.status}`,
  );
}

function baseDescriptor(overrides = {}) {
  return {
    coordinate: {
      owner_domain_ref: 'product_catalog',
      owner_entity_ref: 'product',
      semantic_field_ref: 'name',
    },
    semantic_class: 'COMMERCIAL_NAME',
    representation_role: 'PRIMARY_VALUE',
    source_role: 'AUTHORITATIVE_SOURCE',
    policy_version_ref: 'policy@1',
    ...overrides,
  };
}

function policy(descriptor = baseDescriptor(), overrides = {}) {
  return {
    descriptor,
    policy_active: true,
    operation_kind: 'APPROVED_DICTIONARY_CORRECTION',
    treatment_mode: 'DICTIONARY_MUTATION_ALLOWED',
    allowed_operations: ['APPROVED_DICTIONARY_CORRECTION'],
    policy_version_ref: 'policy@1',
    ...overrides,
  };
}

function segmentForFixture(value) {
  const parts = value.match(/\s+|[^\s]+/gu) ?? [];
  return parts.map((text) => ({ text, is_separator: /^\s+$/u.test(text) }));
}

function textAdapter() {
  return {
    segmentation_version_ref: 'segmentation@fixture',
    case_mapping_version_ref: 'case@fixture',
    segment: segmentForFixture,
    graphemes: (value) => Array.from(value),
    to_upper: (value, locale) => value.toLocaleUpperCase(locale),
    to_lower: (value, locale) => value.toLocaleLowerCase(locale),
  };
}

function precedenceResolver() {
  const connectorForms = new Set(['a', 'al', 'con', 'de', 'del', 'e', 'el', 'en', 'la', 'las', 'lo', 'los', 'o', 'para', 'por', 'sin', 'u', 'y']);
  const protectedForms = new Set([
    '3m', 'iphone', 'coca-cola', 'nexo', 'viso', 'origo', 'numera', 'fogo', 'pulso',
    'vgr', 'sau', 'vcf', 'cop', 'g', 'kg', 'ml', 'l', 'un', 'dz', 'count', 'mass',
    'volume', 'sas', 's.a.s.', 'sa', 's.a.', 'ltda', 'cia',
  ]);
  return {
    connector_catalog_version_ref: CONNECTOR_CATALOG_ID,
    exception_catalog_version_ref: EXCEPTION_CATALOG_ID,
    evaluate: (value) => {
      const lower = value.toLocaleLowerCase('es-CO');
      if (lower === 'bbq') {
        return { disposition: 'REVIEW', reference: EXCEPTION_CATALOG_ID, detail: 'candidate requires explicit exception review' };
      }
      if (protectedForms.has(lower)) {
        return { disposition: 'PROTECTED', reference: EXCEPTION_CATALOG_ID, detail: null };
      }
      if (connectorForms.has(lower)) {
        return { disposition: 'PROTECTED', reference: CONNECTOR_CATALOG_ID, detail: null };
      }
      return { disposition: 'CLEAR', reference: null, detail: null };
    },
  };
}

function binding(overrides = {}) {
  return {
    scope_level: 'FIELD_SCOPE',
    semantic_class: 'COMMERCIAL_NAME',
    domain_scope: 'product_catalog',
    entity_scope: 'product',
    field_scope: 'name',
    representation_role: 'PRIMARY_VALUE',
    source_role: 'AUTHORITATIVE_SOURCE',
    status: 'APPROVED_ACTIVE',
    valid_from: '2026-01-01T00:00:00Z',
    valid_to: null,
    supersedes: [],
    evidence_reference: 'evidence@fixture',
    approval_reference: 'approval@fixture',
    reason: 'validator fixture explicit binding',
    ...overrides,
  };
}

function buildEntry(dictionary, entryKey, overrides = {}) {
  const built = dictionary.materializeOrthographicDictionaryEntry(entryKey, binding(overrides));
  assert(built.ok, `fixture dictionary binding failed for ${entryKey}: ${built.reason ?? 'unknown'}`);
  return built.entry;
}

function evaluationContext(overrides = {}) {
  return {
    product_boundary: 'VENTO_OS',
    policy: policy(),
    locale: 'es-CO',
    capitalization_profile_ref: CAPITALIZATION_PROFILE_ID,
    capitalization_version_ref: 'capitalization@fixture',
    dictionary_version_ref: DICTIONARY_ID,
    effective_at: '2026-08-23T15:00:00Z',
    text_adapter: textAdapter(),
    precedence_resolver: precedenceResolver(),
    ...overrides,
  };
}

async function assertBehavior(tempDir) {
  compileDictionary(tempDir);
  const dictionaryUrl = pathToFileURL(path.join(tempDir, 'normalization.dictionary.js')).href;
  const dictionary = await import(`${dictionaryUrl}?validator=${Date.now()}`);

  assert(dictionary.CANONICAL_ORTHOGRAPHIC_DICTIONARY_ID === DICTIONARY_ID, 'dictionary identity mismatch');
  assert(dictionary.CANONICAL_ORTHOGRAPHIC_DICTIONARY_LOCALE === 'es-CO', 'dictionary locale mismatch');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_ENTRY_FIELDS, expectedEntryFields, 'entry fields');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_MATCH_SCOPES, expectedScopes, 'match scopes');
  assert(
    dictionary.ORTHOGRAPHIC_DICTIONARY_CASE_PROJECTION_MODE === 'PRESERVE_RESOLVED_CASE_PATTERN',
    'case projection mode mismatch',
  );
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_DECISION_MODES, expectedDecisionModes, 'decision modes');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_RESOLUTION_LEVELS, expectedResolutionLevels, 'resolution levels');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_PRECEDENCE.map((entry) => entry.rank), [1, 2, 3, 4, 5, 6, 7, 8], 'precedence ranks');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_PRECEDENCE.map((entry) => entry.rule), expectedPrecedence, 'precedence rules');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_STATUSES, expectedStatuses, 'statuses');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_RESULTS, expectedResults, 'results');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_ACTIVATION_CONDITIONS, expectedActivationConditions, 'activation conditions');
  exactArray(dictionary.ORTHOGRAPHIC_DICTIONARY_AMBIGUOUS_FORMS, ['expresso'], 'ambiguous forms');
  assert(
    JSON.stringify(dictionary.ORTHOGRAPHIC_DICTIONARY_NORMATIVE_ENTRIES) === JSON.stringify(expectedEntries),
    'initial dictionary entries mismatch',
  );

  const missingEvidence = dictionary.materializeOrthographicDictionaryEntry(
    'ORTHO_ES_CO_MAIZ_MAIZ',
    binding({ evidence_reference: '' }),
  );
  assert(!missingEvidence.ok, 'entry without evidence must not materialize');
  const missingApproval = dictionary.materializeOrthographicDictionaryEntry(
    'ORTHO_ES_CO_MAIZ_MAIZ',
    binding({ approval_reference: '' }),
  );
  assert(!missingApproval.ok, 'entry without approval must not materialize');
  const fourthEntry = dictionary.materializeOrthographicDictionaryEntry(
    'ORTHO_ES_CO_ESPRESSO_EXPRESO',
    binding(),
  );
  assert(!fourthEntry.ok, 'a fourth correction must not materialize');

  const entries = [
    buildEntry(dictionary, 'ORTHO_ES_CO_MAIZ_MAIZ'),
    buildEntry(dictionary, 'ORTHO_ES_CO_CLASICO_CLASICO'),
    buildEntry(dictionary, 'ORTHO_ES_CO_FRIO_FRIO'),
  ];

  let result = dictionary.applyOrthographicDictionary('Harina de Maiz', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_CANONICAL_EMITTED' && result.output === 'Harina de Maíz' && !result.blocked, 'maiz fixture mismatch');

  result = dictionary.applyOrthographicDictionary('Pan Masa Madre Clasico', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_CANONICAL_EMITTED' && result.output === 'Pan Masa Madre Clásico', 'clasico fixture mismatch');

  result = dictionary.applyOrthographicDictionary('Latte Frio', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_CANONICAL_EMITTED' && result.output === 'Latte Frío', 'frio fixture mismatch');

  result = dictionary.applyOrthographicDictionary('MAIZ', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_CANONICAL_EMITTED' && result.output === 'MAÍZ', 'uppercase case projection mismatch');

  result = dictionary.applyOrthographicDictionary('Maíz', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_ALREADY_CANONICAL' && result.output === 'Maíz' && !result.changed, 'already canonical mismatch');

  const firstPass = dictionary.applyOrthographicDictionary('Harina de Maiz', entries, evaluationContext());
  const secondPass = dictionary.applyOrthographicDictionary(firstPass.output, entries, evaluationContext());
  assert(secondPass.output === firstPass.output && !secondPass.changed, 'dictionary application must be idempotent');

  result = dictionary.applyOrthographicDictionary('expresso', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_AMBIGUOUS_REVIEW' && result.output === 'expresso' && result.blocked && result.review_required, 'expresso must remain review-only');

  result = dictionary.applyOrthographicDictionary('Coca-Cola', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_PRESERVED_PROTECTED' && result.output === 'Coca-Cola', 'official brand must be protected');

  const legalDescriptor = baseDescriptor({ semantic_class: 'OFFICIAL_LEGAL_NAME' });
  result = dictionary.applyOrthographicDictionary(
    'COMERCIALIZADORA ABC S.A.S.',
    entries,
    evaluationContext({ policy: policy(legalDescriptor) }),
  );
  assert(result.result === 'DICTIONARY_POLICY_BLOCKED' && result.output === 'COMERCIALIZADORA ABC S.A.S.', 'legal name must remain protected');

  result = dictionary.applyOrthographicDictionary('500 g', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_PRESERVED_PROTECTED' && result.output === '500 g', 'measurement unit must be protected');

  const technicalDescriptor = baseDescriptor({ semantic_class: 'TECHNICAL_IDENTIFIER' });
  result = dictionary.applyOrthographicDictionary('FRIO', entries, evaluationContext({ policy: policy(technicalDescriptor) }));
  assert(result.result === 'DICTIONARY_POLICY_BLOCKED' && result.output === 'FRIO', 'technical identifier must not be corrected');

  const externalDescriptor = baseDescriptor({ representation_role: 'EXTERNAL_ORIGINAL', source_role: 'EXTERNAL_EVIDENCE' });
  result = dictionary.applyOrthographicDictionary('maiz', entries, evaluationContext({ policy: policy(externalDescriptor) }));
  assert(result.result === 'DICTIONARY_POLICY_BLOCKED' && result.output === 'maiz', 'external original must remain exact');

  result = dictionary.applyOrthographicDictionary('maizena', entries, evaluationContext());
  assert(result.result === 'DICTIONARY_NOT_APPLICABLE' && result.output === 'maizena', 'substring matching must remain prohibited');

  const duplicate = buildEntry(dictionary, 'ORTHO_ES_CO_MAIZ_MAIZ');
  result = dictionary.applyOrthographicDictionary('Maiz', [entries[0], duplicate], evaluationContext());
  assert(result.result === 'DICTIONARY_CONFLICT_BLOCKED' && result.output === 'Maiz', 'same-specificity conflict must fail closed');

  const transversal = buildEntry(dictionary, 'ORTHO_ES_CO_MAIZ_MAIZ', {
    scope_level: 'VENTO_OS_TRANSVERSAL_SCOPE',
    domain_scope: 'VENTO_OS_TRANSVERSAL_SCOPE',
    entity_scope: null,
    field_scope: null,
  });
  result = dictionary.applyOrthographicDictionary('Maiz', [transversal, entries[0]], evaluationContext());
  assert(
    result.result === 'DICTIONARY_CANONICAL_EMITTED'
      && result.token_evaluations.some((evaluation) => evaluation.resolved_scope_level === 'FIELD_SCOPE'),
    'FIELD_SCOPE must take precedence over transversal scope',
  );

  const retired = buildEntry(dictionary, 'ORTHO_ES_CO_MAIZ_MAIZ', { status: 'RETIRED' });
  result = dictionary.applyOrthographicDictionary('Maiz', [retired], evaluationContext());
  assert(result.result === 'DICTIONARY_POLICY_BLOCKED' && result.output === 'Maiz', 'retired entry must not execute or fall back');

  result = dictionary.applyOrthographicDictionary('Maiz', entries, evaluationContext({ product_boundary: 'VITAL' }));
  assert(result.result === 'DICTIONARY_POLICY_BLOCKED' && result.output === 'Maiz', 'VITAL must remain outside the Vento OS dictionary');
}

async function main() {
  includesAll(fs.readdirSync(packageRoot), ['README.md', 'package.json', 'scripts', 'src'], 'package root');
  includesAll(
    fs.readdirSync(path.join(packageRoot, 'src')),
    ['normalization.types.ts', 'normalization.rules.ts', 'normalization.catalogs.ts', 'normalization.dictionary.ts'],
    'src entries',
  );
  includesAll(
    fs.readdirSync(path.join(packageRoot, 'scripts')),
    ['validate-normalization-types.mjs', 'validate-normalization-rules.mjs', 'validate-normalization-catalogs.mjs', 'validate-normalization-dictionary.mjs'],
    'script entries',
  );

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  exactArray(Object.keys(packageJson).sort(), ['description', 'name', 'private', 'type'], 'package manifest keys');
  assert(packageJson.name === '@vento/data-normalization', 'package name mismatch');
  assert(packageJson.private === true && packageJson.type === 'module', 'package private/type boundary mismatch');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-NORM-005');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-005 source contract SHA256 mismatch');
  assert(owner.includes('modalidad física | `GLOBAL_ENABLE_ONCE`'), 'GLOBAL_ENABLE_ONCE reconciliation missing');
  assert(owner.includes('gate temporal | `PRE_E5_FOUNDATION`'), 'PRE_E5_FOUNDATION reconciliation missing');

  const dictionarySource = fs.readFileSync(dictionaryPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');

  includesAll(dictionarySource, [
    DICTIONARY_ID,
    'PRESERVE_RESOLVED_CASE_PATTERN',
    'materializeOrthographicDictionaryEntry',
    'applyOrthographicDictionary',
    'ORTHOGRAPHIC_DICTIONARY_NORMATIVE_ENTRIES',
    'ORTHOGRAPHIC_DICTIONARY_ACTIVATION_CONDITIONS',
    "'VENTO_OS' | 'VITAL'",
  ], 'dictionary source markers');

  const forbiddenRuntimePatterns = [
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
  ];
  for (const pattern of forbiddenRuntimePatterns) {
    assert(!pattern.test(dictionarySource), `dictionary runtime dependency or heuristic forbidden: ${pattern}`);
  }

  includesAll(readme, [
    'SHELL-NORM-002::GLOBAL',
    '48 literales',
    'SHELL-NORM-003::GLOBAL',
    '23 literales',
    'conectores y excepciones: RESOLVERS VERSIONADOS, CATALOGOS NO MATERIALIZADOS',
    '## Materializacion de SHELL-NORM-004',
    CONNECTOR_CATALOG_ID,
    EXCEPTION_CATALOG_ID,
    'formas normativas iniciales: 28 = 22 + 6',
    'candidatos no activables: 34 = 14 + 11 + 9',
    '## Materializacion de SHELL-NORM-005',
    DICTIONARY_ID,
    'atributos de entrada del diccionario: 21',
    'correcciones iniciales: 3',
    'expresso: REVISION, NO CORRECCION AUTOMATICA',
    'exports publicos: NO MATERIALIZADOS',
    'cambios Supabase: 0',
    'Source contract SHA-256 `SHELL-NORM-004`: `abacc131fb8dd2b18dbd59ef04915e516f6044d4737422b55e45f1eb5dda64ef`.',
    'Source contract SHA-256 `SHELL-NORM-005`: `6a9e98517f962da17c5b8877aa8f358f746e60a397ff621f8dd559bde5ae8837`.',
  ], 'README markers');

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/data-normalization/package.json',
    'packages/data-normalization/src/normalization.types.ts',
    'packages/data-normalization/src/normalization.rules.ts',
    'packages/data-normalization/src/normalization.catalogs.ts',
    'packages/data-normalization/scripts/validate-normalization-types.mjs',
    'packages/data-normalization/scripts/validate-normalization-rules.mjs',
    'packages/data-normalization/scripts/validate-normalization-catalogs.mjs',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-001__GLOBAL.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-002__GLOBAL.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-003__GLOBAL.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-004__GLOBAL.json',
  ]);

  const previous = run(process.execPath, [previousValidatorPath]);
  assert(
    previous.status === 0,
    `SHELL-NORM-004 compatibility validator failed: ${previous.stderr || previous.stdout || previous.status}`,
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm005-'));
  try {
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-005 dictionary validated; '
      + 'entry_fields=21 scopes=3 decisions=3 resolution_levels=4 precedence=8 entries=3 '
      + 'ambiguous=1 activation_conditions=11 statuses=6 results=7 '
      + 'behavior=PASS previous_compatibility=PASS',
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FAIL: ${asciiSafe(message)}`);
  process.exitCode = 1;
});
