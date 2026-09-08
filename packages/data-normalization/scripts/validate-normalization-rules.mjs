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
} = createDataNormalizationValidatorHarness(
  import.meta.url,
  {
    gitUnchangedMessage: "out-of-scope canonical or package metadata changed",
  },
);

const rulesPath = path.join(packageRoot, 'src', 'normalization.rules.ts');
const typesPath = path.join(packageRoot, 'src', 'normalization.types.ts');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const typesValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-types.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const SOURCE_CONTRACT_SHA256 = 'ce86eef6da718064b58f9b977af644d9ce0030fc1de07c203c5709e877c9c461';
const CURRENT_HEADING = '### ✅ SHELL-NORM-003 — Centralizar reglas de espacios, Unicode y capitalización';
const NEXT_HEADING = '### ✅ SHELL-NORM-004 — Centralizar conectores y excepciones';

const expectedUnions = {
  SharedNormalizationRuleOperationKind: [
    'UNICODE_CANONICALIZATION',
    'EDGE_WHITESPACE_TRIM',
    'INTERNAL_WHITESPACE_COMPACTION',
    'PROSE_PUNCTUATION_SPACING',
    'COMMERCIAL_CAPITALIZATION',
  ],
  CommercialCapitalizationTokenClass: [
    'ORDINARY_LEXICAL_TOKEN',
    'CONNECTOR_TOKEN',
    'OFFICIAL_EXCEPTION_TOKEN',
    'CONTROLLED_ACRONYM_TOKEN',
    'MEASUREMENT_OR_UNIT_TOKEN',
    'NUMERIC_TOKEN',
    'ALPHANUMERIC_OR_MODEL_TOKEN',
    'PUNCTUATION_OR_SEPARATOR',
    'AMBIGUOUS_TOKEN',
  ],
  CommercialCapitalizationTokenResult: [
    'CAPITALIZED_ORDINARY',
    'LOWERCASED_CONNECTOR',
    'PRESERVED_OFFICIAL_EXCEPTION',
    'PRESERVED_NON_CASED',
    'PRESERVED_AMBIGUOUS',
    'BLOCKED_CONFLICT',
  ],
  CommercialCapitalizationSegmentBoundary: [
    'NAME_START',
    'DECLARED_SEGMENT_START',
    'NO_SEGMENT_RESET',
  ],
};

const expectedFunctions = [
  'applyUnicodeCanonicalization',
  'applyEdgeWhitespaceTrim',
  'applyInternalWhitespaceCompaction',
  'applyProsePunctuationSpacing',
  'applyCommercialCapitalization',
];

function extractUnion(source, name) {
  const match = source.match(new RegExp(`export type ${name} =([\\s\\S]*?);`, 'u'));
  assert(match, `missing union ${name}`);
  return [...match[1].matchAll(/'([^']+)'/gu)].map((item) => item[1]);
}

function sourceContractBlock(owner) {
  const normalized = owner.replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
  const lines = normalized.split('\n');
  let fenced = false;
  let start = -1;
  let end = -1;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/u.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    if (start < 0 && line === CURRENT_HEADING) {
      start = index;
      continue;
    }
    if (start >= 0 && line === NEXT_HEADING) {
      end = index;
      break;
    }
  }

  assert(start >= 0 && end > start, 'canonical SHELL-NORM-003 task block not found');
  return lines.slice(start, end).join('\n');
}

function compileRules(tempDir) {
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
  ]);
  assert(
    result.status === 0,
    `runtime fixture TypeScript compile failed: ${result.stderr || result.stdout || result.status}`,
  );
}

function baseDescriptor(overrides = {}) {
  return {
    coordinate: {
      owner_domain_ref: 'validator',
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

function policyFor(operationKind, descriptor = baseDescriptor()) {
  return {
    descriptor,
    operation_kind: operationKind,
    treatment_mode: 'DETERMINISTIC_MUTATION_ALLOWED',
    allowed_operations: [operationKind],
    policy_version_ref: 'policy@1',
  };
}

function segmentForFixture(value) {
  const parts = value.match(/\s+|[:—–]|[^\s:—–]+/gu) ?? [];
  return parts.map((text) => ({
    text,
    is_separator: /^\s+$/u.test(text) || /^[:—–]$/u.test(text),
  }));
}

async function assertBehavior(tempDir) {
  compileRules(tempDir);
  const rulesUrl = pathToFileURL(path.join(tempDir, 'normalization.rules.js')).href;
  const rules = await import(`${rulesUrl}?validator=${Date.now()}`);

  let result = rules.applyUnicodeCanonicalization(
    'Cafe\u0301',
    policyFor('UNICODE_CANONICALIZATION'),
    {
      unicode_version_ref: 'unicode@test',
      normalize_nfc: (value) => value.normalize('NFC'),
    },
  );
  assert(result.value === 'Café' && result.changed && !result.blocked, 'NFC behavior mismatch');
  const unicodeSecond = rules.applyUnicodeCanonicalization(
    result.value,
    policyFor('UNICODE_CANONICALIZATION'),
    {
      unicode_version_ref: 'unicode@test',
      normalize_nfc: (value) => value.normalize('NFC'),
    },
  );
  assert(unicodeSecond.value === result.value && !unicodeSecond.changed, 'NFC sample must be idempotent');

  result = rules.applyEdgeWhitespaceTrim(
    '  Café  ',
    policyFor('EDGE_WHITESPACE_TRIM'),
    {
      whitespace_version_ref: 'spaces@1',
      removable_edge_separators: [' '],
      allow_empty_result: false,
    },
  );
  assert(result.value === 'Café' && result.changed && !result.blocked, 'edge trim behavior mismatch');

  result = rules.applyEdgeWhitespaceTrim(
    '   ',
    policyFor('EDGE_WHITESPACE_TRIM'),
    {
      whitespace_version_ref: 'spaces@1',
      removable_edge_separators: [' '],
      allow_empty_result: false,
    },
  );
  assert(result.value === '   ' && result.blocked, 'edge trim must fail closed across empty boundary');

  result = rules.applyInternalWhitespaceCompaction(
    'Harina   de maiz',
    policyFor('INTERNAL_WHITESPACE_COMPACTION'),
    {
      whitespace_version_ref: 'spaces@1',
      accidental_internal_separators: [' '],
      canonical_separator: ' ',
    },
  );
  assert(result.value === 'Harina de maiz' && result.changed && !result.blocked, 'internal compaction mismatch');
  const compactSecond = rules.applyInternalWhitespaceCompaction(
    result.value,
    policyFor('INTERNAL_WHITESPACE_COMPACTION'),
    {
      whitespace_version_ref: 'spaces@1',
      accidental_internal_separators: [' '],
      canonical_separator: ' ',
    },
  );
  assert(compactSecond.value === result.value && !compactSecond.changed, 'compaction sample must be idempotent');

  result = rules.applyInternalWhitespaceCompaction(
    'A\t\tB',
    policyFor('INTERNAL_WHITESPACE_COMPACTION'),
    {
      whitespace_version_ref: 'spaces@1',
      accidental_internal_separators: [' '],
      canonical_separator: ' ',
    },
  );
  assert(result.value === 'A\t\tB' && !result.changed, 'tabs must remain untouched without explicit policy');

  result = rules.applyProsePunctuationSpacing(
    'Hola ,mundo',
    policyFor('PROSE_PUNCTUATION_SPACING'),
    {
      prose_spacing_version_ref: 'prose@1',
      rules: [{ punctuation: ',', spacing_token: ' ', spaces_before: 0, spaces_after: 1 }],
    },
  );
  assert(result.value === 'Hola, mundo' && result.changed && !result.blocked, 'prose punctuation spacing mismatch');
  const punctuationSecond = rules.applyProsePunctuationSpacing(
    result.value,
    policyFor('PROSE_PUNCTUATION_SPACING'),
    {
      prose_spacing_version_ref: 'prose@1',
      rules: [{ punctuation: ',', spacing_token: ' ', spaces_before: 0, spaces_after: 1 }],
    },
  );
  assert(punctuationSecond.value === result.value && !punctuationSecond.changed, 'punctuation sample must be idempotent');

  const adapter = {
    segmentation_version_ref: 'segmentation@1',
    case_mapping_version_ref: 'case@1',
    segment: segmentForFixture,
    graphemes: (value) => Array.from(value),
    to_upper: (value, locale) => value.toLocaleUpperCase(locale),
    to_lower: (value, locale) => value.toLocaleLowerCase(locale),
  };
  const catalogs = {
    connector_catalog_version_ref: 'connectors@fixture',
    exception_catalog_version_ref: 'exceptions@fixture',
    official_phrase_candidates: () => [],
    official_token_candidates: (token) => token === 'iPhone'
      ? [{ output: 'iPhone', token_class: 'OFFICIAL_EXCEPTION_TOKEN' }]
      : [],
    protected_token_candidates: (token) => token === '3M'
      ? [{ output: '3M', token_class: 'ALPHANUMERIC_OR_MODEL_TOKEN' }]
      : [],
    connector_candidates: (token, boundary) => {
      const lower = token.toLocaleLowerCase('es-CO');
      if (!['de', 'y'].includes(lower)) return [];
      const output = boundary === 'NO_SEGMENT_RESET'
        ? lower
        : lower[0].toLocaleUpperCase('es-CO') + lower.slice(1);
      return [{ output, token_class: 'CONNECTOR_TOKEN' }];
    },
  };
  const capitalizationPolicy = {
    profile_ref: 'VENTO_COMMERCIAL_CAPITALIZATION_ES_CO@1.0.0',
    locale: 'es-CO',
    capitalization_version_ref: 'capitalization@1',
    enable_declared_segment_starts: true,
  };

  result = rules.applyCommercialCapitalization(
    'jugo de naranja y mango',
    policyFor('COMMERCIAL_CAPITALIZATION'),
    capitalizationPolicy,
    adapter,
    catalogs,
  );
  assert(
    result.value === 'Jugo de Naranja y Mango' && result.changed && !result.blocked,
    'commercial capitalization connector behavior mismatch',
  );
  const capitalizationSecond = rules.applyCommercialCapitalization(
    result.value,
    policyFor('COMMERCIAL_CAPITALIZATION'),
    capitalizationPolicy,
    adapter,
    catalogs,
  );
  assert(
    capitalizationSecond.value === result.value && !capitalizationSecond.changed && !capitalizationSecond.blocked,
    'capitalization sample must be idempotent',
  );

  result = rules.applyCommercialCapitalization(
    '3M',
    policyFor('COMMERCIAL_CAPITALIZATION'),
    capitalizationPolicy,
    adapter,
    catalogs,
  );
  assert(result.value === '3M' && !result.blocked, 'protected technical token must remain exact');

  result = rules.applyCommercialCapitalization(
    'iPhone',
    policyFor('COMMERCIAL_CAPITALIZATION'),
    capitalizationPolicy,
    adapter,
    catalogs,
  );
  assert(result.value === 'iPhone' && !result.blocked, 'official exception must be preserved');

  result = rules.applyCommercialCapitalization(
    'REF7071',
    policyFor('COMMERCIAL_CAPITALIZATION'),
    capitalizationPolicy,
    adapter,
    catalogs,
  );
  assert(
    result.value === 'REF7071' && result.review_required && result.blocked,
    'unresolved alphanumeric model must fail closed',
  );

  result = rules.applyCommercialCapitalization(
    'pan : de cafe',
    policyFor('COMMERCIAL_CAPITALIZATION'),
    capitalizationPolicy,
    adapter,
    catalogs,
  );
  assert(result.value === 'Pan : De Cafe' && !result.blocked, 'declared segment start mismatch');

  const externalDescriptor = baseDescriptor({
    representation_role: 'EXTERNAL_ORIGINAL',
    source_role: 'EXTERNAL_EVIDENCE',
  });
  result = rules.applyUnicodeCanonicalization(
    'Cafe\u0301',
    policyFor('UNICODE_CANONICALIZATION', externalDescriptor),
    {
      unicode_version_ref: 'unicode@test',
      normalize_nfc: (value) => value.normalize('NFC'),
    },
  );
  assert(result.value === 'Cafe\u0301' && result.blocked, 'external original must remain preserved');

  const secretDescriptor = baseDescriptor({ semantic_class: 'SECRET_OR_SIGNATURE_MATERIAL' });
  result = rules.applyEdgeWhitespaceTrim(
    ' secret ',
    policyFor('EDGE_WHITESPACE_TRIM', secretDescriptor),
    {
      whitespace_version_ref: 'spaces@1',
      removable_edge_separators: [' '],
      allow_empty_result: false,
    },
  );
  assert(result.value === ' secret ' && result.blocked, 'secret material must preserve exact representation');
}

async function main() {
  const rulesSource = fs.readFileSync(rulesPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const owner = fs.readFileSync(ownerPath, 'utf8');

  includesAll(
    fs.readdirSync(packageRoot),
    ['README.md', 'package.json', 'scripts', 'src'],
    'package root entries',
  );
  includesAll(
    fs.readdirSync(path.join(packageRoot, 'src')),
    ['normalization.types.ts', 'normalization.rules.ts'],
    'src entries',
  );
  includesAll(
    fs.readdirSync(path.join(packageRoot, 'scripts')),
    ['validate-normalization-types.mjs', 'validate-normalization-rules.mjs'],
    'scripts entries',
  );

  exactArray(
    Object.keys(packageJson).sort(),
    ['description', 'name', 'private', 'type'],
    'package manifest keys',
  );
  assert(packageJson.name === '@vento/data-normalization', 'package name mismatch');
  assert(packageJson.private === true, 'package must remain private');
  assert(packageJson.type === 'module', 'package type must remain module');

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/data-normalization/package.json',
    'packages/data-normalization/src/normalization.types.ts',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-001__GLOBAL.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-002__GLOBAL.json',
  ]);

  const typeValidation = run(process.execPath, [typesValidatorPath]);
  assert(
    typeValidation.status === 0,
    `SHELL-NORM-002 compatibility validator failed: ${typeValidation.stderr || typeValidation.stdout}`,
  );

  for (const [name, expected] of Object.entries(expectedUnions)) {
    exactArray(extractUnion(rulesSource, name), expected, name);
  }

  const profile = extractUnion(rulesSource, 'CommercialCapitalizationProfileId');
  exactArray(profile, ['VENTO_COMMERCIAL_CAPITALIZATION_ES_CO@1.0.0'], 'capitalization profile');
  const locale = extractUnion(rulesSource, 'CommercialCapitalizationLocale');
  exactArray(locale, ['es-CO'], 'capitalization locale');

  const exportedFunctions = [
    ...rulesSource.matchAll(/export function ([A-Za-z0-9_]+)\(/gu),
  ].map((match) => match[1]);
  exactArray(exportedFunctions, expectedFunctions, 'exported rule functions');

  const literalCount = Object.values(expectedUnions)
    .reduce((total, values) => total + values.length, 0);
  assert(literalCount === 23, `expected 23 governed literals, got ${literalCount}`);

  const task = sourceContractBlock(owner);
  assert(sha256(task) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-003 source contract SHA256 mismatch');
  assert(
    owner.includes('<!-- EXECUTION-GATE-RECONCILIATION:B001-200:SHELL-NORM-001-009 -->'),
    'normalization topology reconciliation marker missing',
  );
  assert(owner.includes('| modalidad física | `GLOBAL_ENABLE_ONCE` |'), 'GLOBAL_ENABLE_ONCE missing');
  assert(owner.includes('| gate temporal | `PRE_E5_FOUNDATION` |'), 'PRE_E5_FOUNDATION missing');

  for (const values of Object.values(expectedUnions)) {
    for (const literal of values) {
      assert(task.includes(`\`${literal}\``), `canonical task missing literal ${literal}`);
    }
  }
  assert(task.includes('`VENTO_COMMERCIAL_CAPITALIZATION_ES_CO@1.0.0`'), 'canonical profile missing');
  assert(task.includes('**Total de literales gobernados**'), 'canonical 23-literal inventory missing');
  assert(task.includes('**23**'), 'canonical 23-literal total missing');
  assert(task.includes('NFC'), 'canonical NFC requirement missing');
  assert(task.includes('no existe `trim` universal'), 'canonical fail-closed trim boundary missing');
  assert(task.includes('no existe una sustitución universal'), 'canonical whitespace compaction boundary missing');
  assert(task.includes('no crea una gramática universal'), 'canonical prose punctuation boundary missing');
  assert(task.includes('el perfil lingüístico está declarado explícitamente'), 'canonical explicit locale boundary missing');

  const forbiddenRuntimeMarkers = [
    'node:fs',
    'node:net',
    'node:http',
    'process.env',
    'Date.now(',
    'Math.random(',
    'fetch(',
    'supabase',
  ];
  for (const marker of forbiddenRuntimeMarkers) {
    assert(!rulesSource.includes(marker), `rules contain forbidden implicit runtime dependency: ${marker}`);
  }

  assert(!rulesSource.includes("'NFKC'"), 'rules must not introduce NFKC');
  assert(!rulesSource.includes("'NFKD'"), 'rules must not introduce NFKD');
  assert(!rulesSource.includes('connectorCatalog ='), 'rules must not materialize a connector catalog');
  assert(!rulesSource.includes('exceptionCatalog ='), 'rules must not materialize an exception catalog');

  const readmeMarkers = [
    'SHELL-NORM-003::GLOBAL',
    'normalization.rules.ts',
    'validate-normalization-rules.mjs',
    'UNICODE_CANONICALIZATION',
    'EDGE_WHITESPACE_TRIM',
    'INTERNAL_WHITESPACE_COMPACTION',
    'PROSE_PUNCTUATION_SPACING',
    'COMMERCIAL_CAPITALIZATION',
    'VENTO_COMMERCIAL_CAPITALIZATION_ES_CO@1.0.0',
    '23 literales',
    'conectores y excepciones: RESOLVERS VERSIONADOS, CATALOGOS NO MATERIALIZADOS',
    'exports publicos: NO MATERIALIZADOS',
    'cambios Supabase: 0',
    'SHELL-NORM-004',
  ];
  for (const marker of readmeMarkers) {
    assert(readme.includes(marker), `README missing marker: ${marker}`);
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm003-'));
  try {
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-003 rules validated; '
      + 'operations=5 token_classes=9 token_results=6 boundaries=3 '
      + 'total_literals=23 behavior=PASS types_compatibility=PASS',
  );
}

try {
  await main();
} catch (error) {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
