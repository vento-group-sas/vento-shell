import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseTaskBlocks } from '../../../scripts/docs/format-canonical-task.mjs';
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
const conformanceRoot = path.join(packageRoot, 'conformance');
const conformancePath = path.join(conformanceRoot, 'normalization.conformance.ts');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const previousValidatorPath = path.join(packageRoot, 'scripts', 'validate-normalization-audit.mjs');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);
const governancePath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'E3_SUPABASE',
  '05_GOBIERNO_CANONICO_DE_NORMALIZACION_Y_CALIDAD_DE_TEXTO.md',
);
const transitionPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'E3_SUPABASE',
  '07_02_DATA_NORM_TRANS_002.md',
);

const SOURCE_CONTRACT_SHA256 = '13632f04e23e618baf5e1ead9d0c0370ae19106a611d6e68730713e443777cd5';
const SUITE_ID = 'VENTO_NORMALIZATION_IDEMPOTENCY_AND_SEMANTIC_PRESERVATION_CONFORMANCE@1.0.0';

const expectedFamilies = [
  'CAPITALIZATION',
  'CONNECTORS',
  'OFFICIAL_EXCEPTIONS',
  'ORTHOGRAPHIC_DICTIONARY',
  'SEARCH_COMPARISON',
];

const expectedFamilyCounts = {
  CAPITALIZATION: 16,
  CONNECTORS: 20,
  OFFICIAL_EXCEPTIONS: 21,
  ORTHOGRAPHIC_DICTIONARY: 15,
  SEARCH_COMPARISON: 17,
};

const sourceSections = {
  CAPITALIZATION: {
    task: 'DATA-NORM-ARC-003',
    section: '25. Corpus minimo de conformidad',
  },
  CONNECTORS: {
    task: 'DATA-NORM-ARC-004',
    section: '24. Corpus minimo de conformidad',
  },
  OFFICIAL_EXCEPTIONS: {
    task: 'DATA-NORM-ARC-005',
    section: '29. Corpus minimo de conformidad',
  },
  ORTHOGRAPHIC_DICTIONARY: {
    task: 'DATA-NORM-ARC-006',
    section: '28. Corpus minimo de conformidad',
  },
  SEARCH_COMPARISON: {
    task: 'DATA-NORM-ARC-008',
    section: '28. Ejemplos normativos',
  },
};

const expectedTestDimensions = [
  'DETERMINISM',
  'EVALUATION_IDEMPOTENCY',
  'SEMANTIC_PRESERVATION',
  'NO_UNAUTHORIZED_SIDE_EFFECTS',
];

const expectedPreservationDimensions = [
  'COORDINATE',
  'SEMANTIC_CLASS',
  'REPRESENTATION',
  'SOURCE_ROLE',
  'STRUCTURE',
  'PROTECTED_FORM',
  'PROVENANCE',
  'IDENTITY',
  'HISTORY',
  'PRODUCT_BOUNDARY',
];

const expectedOperations = [
  'UNICODE_CANONICALIZATION',
  'EDGE_WHITESPACE_TRIM',
  'INTERNAL_WHITESPACE_COMPACTION',
  'PROSE_PUNCTUATION_SPACING',
  'COMMERCIAL_CAPITALIZATION',
  'CONNECTOR_CASE_POLICY',
  'APPROVED_DICTIONARY_CORRECTION',
  'OFFICIAL_EXCEPTION_APPLICATION',
  'TECHNICAL_CANONICALIZATION',
  'SEARCH_KEY_DERIVATION',
  'STRUCTURED_PARSE_OR_RENDER',
  'SOURCE_PROPAGATION_OR_RESYNC',
  'IDENTITY_OR_RECORD_ACTION',
];

const expectedSemanticClasses = [
  'COMMERCIAL_NAME',
  'STRUCTURED_PRESENTATION_NAME',
  'HUMAN_LABEL',
  'OFFICIAL_LEGAL_NAME',
  'OFFICIAL_BRAND_FORM',
  'PERSON_OR_ACTOR_NAME',
  'ADDRESS_OR_LOCATION_TEXT',
  'FREE_TEXT',
  'CONTROLLED_VOCABULARY_CODE',
  'MEASUREMENT_OR_UNIT_CODE',
  'TECHNICAL_IDENTIFIER',
  'CONTACT_IDENTIFIER',
  'SECRET_OR_SIGNATURE_MATERIAL',
  'UNCLASSIFIED_PRESERVE',
];

const expectedRepresentations = [
  'PRIMARY_VALUE',
  'DISPLAY_OVERRIDE',
  'SEARCH_DERIVATION',
  'EXTERNAL_ORIGINAL',
  'HISTORICAL_SNAPSHOT',
  'OUTPUT_PROJECTION',
  'AUDIT_EVIDENCE',
];

const expectedSources = [
  'AUTHORITATIVE_SOURCE',
  'APPROVED_OVERRIDE',
  'SYNCHRONIZED_COPY',
  'IMMUTABLE_SNAPSHOT',
  'EXTERNAL_EVIDENCE',
  'OUTPUT_ONLY',
];

const expectedTreatmentModes = [
  'DETERMINISTIC_MUTATION_ALLOWED',
  'DICTIONARY_MUTATION_ALLOWED',
  'DERIVATION_ONLY',
  'VALIDATION_ONLY',
  'HUMAN_REVIEW_REQUIRED',
  'PRESERVE_EXACT',
  'STRUCTURAL_RESOLUTION_REQUIRED',
  'PROHIBITED',
];

function asciiFold(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim();
}

function sectionBody(taskBlock, asciiHeading) {
  const lines = taskBlock.replace(/\r\n?/gu, '\n').split('\n');
  const index = lines.findIndex((line) => {
    const match = line.match(/^####\s+(.+)$/u);
    return match !== null && asciiFold(match[1]) === asciiHeading;
  });
  assert(index >= 0, `section not found: ${asciiHeading}`);

  const body = [];
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    if (/^####\s+/u.test(lines[cursor])) break;
    body.push(lines[cursor]);
  }
  return body;
}

function parseMarkdownTableRows(sectionLines) {
  const tableLines = sectionLines.filter((line) => /^\s*\|.*\|\s*$/u.test(line));
  assert(tableLines.length >= 3, 'markdown table missing');
  const split = (line) => line
    .trim()
    .slice(1, -1)
    .split('|')
    .map((cell) => cell.trim().replace(/\s+/gu, ' '));
  const rows = tableLines.map(split);
  const separator = rows[1];
  assert(
    separator.every((cell) => /^:?-{3,}:?$/u.test(cell.replace(/\s+/gu, ''))),
    'markdown table separator invalid',
  );
  return rows.slice(2);
}

function compileConformance(tempDir) {
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
  files.push(conformancePath);

  const result = run(process.execPath, [
    tscCli,
    '--pretty', 'false',
    '--strict',
    '--skipLibCheck',
    '--target', 'ES2022',
    '--module', 'NodeNext',
    '--moduleResolution', 'NodeNext',
    '--rootDir', packageRoot,
    '--outDir', tempDir,
    ...files,
  ]);
  assert(result.status === 0, `TypeScript compile failed: ${result.stderr || result.stdout}`);
}

function preservationSnapshot(overrides = {}) {
  return {
    COORDINATE: 'catalog.product.name',
    SEMANTIC_CLASS: 'COMMERCIAL_NAME',
    REPRESENTATION: 'PRIMARY_VALUE',
    SOURCE_ROLE: 'AUTHORITATIVE_SOURCE',
    STRUCTURE: 'structure:v1',
    PROTECTED_FORM: 'protected:none',
    PROVENANCE: 'source:v1',
    IDENTITY: 'entity:P-001',
    HISTORY: 'history:v1',
    PRODUCT_BOUNDARY: 'VENTO_OS',
    ...overrides,
  };
}

function observation(overrides = {}) {
  return {
    logical_result_fingerprint: 'result:canonical',
    output_fingerprint: 'output:canonical',
    semantic_change_performed: false,
    protected_dimensions: preservationSnapshot(),
    unauthorized_side_effects: [],
    ...overrides,
  };
}

async function assertBehavior(tempDir) {
  compileConformance(tempDir);
  const compiled = path.join(
    tempDir,
    'conformance',
    'normalization.conformance.js',
  );
  const conformance = await import(`${pathToFileURL(compiled).href}?v=${Date.now()}`);

  assert(
    conformance.NORMALIZATION_CONFORMANCE_SUITE_ID === SUITE_ID,
    'suite identity mismatch',
  );
  assert(
    conformance.INHERITED_CONFORMANCE_CORPUS_SOURCE === 'DATA-NORM-TRANS-002',
    'inherited corpus source mismatch',
  );
  exactArray(conformance.CONFORMANCE_CORPUS_FAMILIES, expectedFamilies, 'corpus families');
  exactArray(conformance.CONFORMANCE_TEST_DIMENSIONS, expectedTestDimensions, 'test dimensions');
  exactArray(
    conformance.SEMANTIC_PRESERVATION_DIMENSIONS,
    expectedPreservationDimensions,
    'preservation dimensions',
  );
  exactArray(conformance.CONFORMANCE_OPERATION_KINDS, expectedOperations, 'operations');
  exactArray(conformance.CONFORMANCE_SEMANTIC_CLASSES, expectedSemanticClasses, 'semantic classes');
  exactArray(
    conformance.CONFORMANCE_REPRESENTATION_ROLES,
    expectedRepresentations,
    'representation roles',
  );
  exactArray(conformance.CONFORMANCE_SOURCE_ROLES, expectedSources, 'source roles');
  exactArray(conformance.CONFORMANCE_TREATMENT_MODES, expectedTreatmentModes, 'treatment modes');

  assert(conformance.NORMALIZATION_CONFORMANCE_CORPUS.length === 89, 'corpus must contain 89 scenarios');
  const scenarioKeys = conformance.NORMALIZATION_CONFORMANCE_CORPUS.map((entry) => entry.scenario_key);
  assert(new Set(scenarioKeys).size === 89, 'scenario keys must be unique');

  for (const family of expectedFamilies) {
    const rows = conformance.NORMALIZATION_CONFORMANCE_CORPUS.filter(
      (entry) => entry.family === family,
    );
    assert(
      rows.length === expectedFamilyCounts[family],
      `family count mismatch: ${family}`,
    );
    exactArray(
      rows.map((entry) => entry.source_ordinal),
      Array.from({ length: expectedFamilyCounts[family] }, (_, index) => index + 1),
      `source ordinals ${family}`,
    );
  }

  const source = preservationSnapshot();
  let certification = conformance.certifyABCConformance(
    source,
    observation(),
    observation(),
    observation(),
  );
  assert(certification.conformant, 'baseline A/B/C certification rejected');
  assert(certification.production_mutation_authority === false, 'conformance gained mutation authority');
  assert(certification.identity_authority === false, 'conformance gained identity authority');
  assert(certification.uniqueness_authority === false, 'conformance gained uniqueness authority');
  assert(certification.merge_authority === false, 'conformance gained merge authority');

  certification = conformance.certifyABCConformance(
    source,
    observation(),
    observation({ output_fingerprint: 'output:divergent' }),
    observation(),
  );
  assert(
    !certification.conformant && certification.blockers.includes('DETERMINISM_MISMATCH'),
    'A/B mismatch must fail determinism',
  );

  certification = conformance.certifyABCConformance(
    source,
    observation(),
    observation(),
    observation({ semantic_change_performed: true }),
  );
  assert(
    !certification.conformant && certification.blockers.includes('SECOND_SEMANTIC_CHANGE'),
    'C must not introduce a second semantic change',
  );

  certification = conformance.certifyABCConformance(
    source,
    observation({
      protected_dimensions: preservationSnapshot({ IDENTITY: 'entity:P-002' }),
    }),
    observation(),
    observation(),
  );
  assert(
    !certification.conformant && certification.blockers.includes('PROTECTED_DIMENSION_CHANGED'),
    'protected dimension mutation must fail conservation',
  );

  certification = conformance.certifyABCConformance(
    source,
    observation({ unauthorized_side_effects: ['PERSISTENCE_WRITE'] }),
    observation(),
    observation(),
  );
  assert(
    !certification.conformant && certification.blockers.includes('UNAUTHORIZED_SIDE_EFFECT'),
    'unauthorized side effect must fail certification',
  );

  assert(
    conformance.classifyVersionCut('versions@1', 'versions@1') === 'SAME_CONTRACT_CUT',
    'same version set classification mismatch',
  );
  assert(
    conformance.classifyVersionCut('versions@1', 'versions@2') === 'DIFFERENT_CONTRACT_CUT',
    'different version sets must not be treated as idempotency failure',
  );
  assert(
    conformance.classifyVersionCut('latest', 'versions@1') === 'INVALID_VERSION_SET_DIGEST',
    'implicit latest must fail closed',
  );
  assert(
    conformance.conformanceProductBoundaryDisposition('VENTO_OS') === 'ALLOWED',
    'VENTO_OS conformance boundary rejected',
  );
  assert(
    conformance.conformanceProductBoundaryDisposition('VITAL') === 'BLOCKED_VITAL',
    'VITAL must remain outside transversal policy',
  );
}

function assertCorpusSourceReconciliation(governanceSource, conformance) {
  const tasks = parseTaskBlocks(governanceSource);

  for (const family of expectedFamilies) {
    const source = sourceSections[family];
    const task = tasks.find((entry) => entry.id === source.task) ?? null;
    assert(task, `source task missing: ${source.task}`);

    const rows = parseMarkdownTableRows(sectionBody(task.block, source.section));
    assert(
      rows.length === expectedFamilyCounts[family],
      `canonical source row count mismatch: ${family}`,
    );

    const physical = conformance.NORMALIZATION_CONFORMANCE_CORPUS
      .filter((entry) => entry.family === family)
      .map((entry) => [...entry.source_cells]);

    exactArray(physical, rows, `canonical corpus rows ${family}`);
  }
}

function assertTransitionReconciliation(transitionSource) {
  includesAll(transitionSource, [
    '`DATA-NORM-ARC-003` | 16',
    '`DATA-NORM-ARC-004` | 20',
    '`DATA-NORM-ARC-005` | 21',
    '`DATA-NORM-ARC-006` | 15',
    '`DATA-NORM-ARC-008` | 17',
    '**89**',
  ], 'DATA-NORM-TRANS-002 reconciliation');

  const foldedTransition = asciiFold(transitionSource);
  assert(
    /\bcubre 25 unidades de regla\b/u.test(foldedTransition)
      && /\blas 25 unidades tienen resultado y estado final\b/u.test(foldedTransition),
    'DATA-NORM-TRANS-002 rule-unit reconciliation missing: 25',
  );
}

async function main() {
  includesAll(fs.readdirSync(packageRoot), [
    'README.md',
    'package.json',
    'scripts',
    'src',
    'conformance',
  ], 'package root entries');

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
    'validate-normalization-conformance.mjs',
  ], 'script entries');

  exactArray(
    fs.readdirSync(conformanceRoot).sort(),
    ['normalization.conformance.ts'],
    'conformance entries',
  );

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  exactArray(
    Object.keys(packageJson).sort(),
    ['description', 'name', 'private', 'type'],
    'package manifest keys',
  );
  assert(packageJson.name === '@vento/data-normalization', 'package name mismatch');
  assert(packageJson.private === true && packageJson.type === 'module', 'package boundary mismatch');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-NORM-009');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-NORM-009 source contract SHA256 mismatch');
  assert(owner.includes('modalidad física | `GLOBAL_ENABLE_ONCE`'), 'GLOBAL_ENABLE_ONCE reconciliation missing');
  assert(owner.includes('gate temporal | `PRE_E5_FOUNDATION`'), 'PRE_E5_FOUNDATION reconciliation missing');

  const source = fs.readFileSync(conformancePath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const governance = fs.readFileSync(governancePath, 'utf8');
  const transition = fs.readFileSync(transitionPath, 'utf8');

  includesAll(source, [
    SUITE_ID,
    'NORMALIZATION_CONFORMANCE_CORPUS',
    'certifyABCConformance',
    'classifyVersionCut',
    'conformanceProductBoundaryDisposition',
    'production_mutation_authority: false',
    'identity_authority: false',
    'uniqueness_authority: false',
    'merge_authority: false',
  ], 'conformance source markers');

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
    /\b(?:insert|update|delete|upsert|commit|rollback)\s*\(/iu,
  ]) {
    assert(!pattern.test(source), `conformance runtime dependency forbidden: ${pattern}`);
  }

  includesAll(readme, [
    '## Materializacion de SHELL-NORM-008',
    '## Materializacion de SHELL-NORM-009',
    SUITE_ID,
    'corpus heredado: 89',
    'distribucion del corpus: 16 + 20 + 21 + 15 + 17',
    'dimensiones de prueba: 4',
    'dimensiones de conservacion semantica: 10',
    'operaciones cubiertas: 13/13',
    'clases semanticas cubiertas: 14/14',
    'roles de representacion cubiertos: 7/7',
    'roles de fuente cubiertos: 6/6',
    'modos de tratamiento cubiertos: 8/8',
    'A/B/C: MATERIALIZADO',
    'efectos empresariales desde conformance: 0',
    'persistencia de auditoria: NO MATERIALIZADA',
    'exports publicos: NO MATERIALIZADOS',
    'cambios Supabase: 0',
    `Source contract SHA-256 \`SHELL-NORM-009\`: \`${SOURCE_CONTRACT_SHA256}\`.`,
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
    'packages/data-normalization/src/normalization.audit.ts',
    'packages/data-normalization/scripts/validate-normalization-types.mjs',
    'packages/data-normalization/scripts/validate-normalization-rules.mjs',
    'packages/data-normalization/scripts/validate-normalization-catalogs.mjs',
    'packages/data-normalization/scripts/validate-normalization-dictionary.mjs',
    'packages/data-normalization/scripts/validate-normalization-search.mjs',
    'packages/data-normalization/scripts/validate-normalization-preview.mjs',
    'packages/data-normalization/scripts/validate-normalization-audit.mjs',
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
    'docs/plan-canonico/modular/bloques/E3_SUPABASE/05_GOBIERNO_CANONICO_DE_NORMALIZACION_Y_CALIDAD_DE_TEXTO.md',
    'docs/plan-canonico/modular/bloques/E3_SUPABASE/07_02_DATA_NORM_TRANS_002.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-008__GLOBAL.json',
  ]);

  const previous = run(process.execPath, [previousValidatorPath]);
  assert(
    previous.status === 0,
    `SHELL-NORM-008 compatibility validator failed: ${previous.stderr || previous.stdout || previous.status}`,
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-norm009-'));
  try {
    compileConformance(tempDir);
    const compiled = path.join(tempDir, 'conformance', 'normalization.conformance.js');
    const conformance = await import(`${pathToFileURL(compiled).href}?source=${Date.now()}`);
    assertCorpusSourceReconciliation(governance, conformance);
    assertTransitionReconciliation(transition);
    await assertBehavior(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    'PASS: SHELL-NORM-009 conformance validated; '
      + 'corpus=89 distribution=16/20/21/15/17 test_dimensions=4 preservation_dimensions=10 '
      + 'operations=13 semantic_classes=14 representations=7 sources=6 treatment_modes=8 '
      + 'abc=PASS source_reconciliation=PASS previous_compatibility=PASS',
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FAIL: ${asciiSafe(message)}`);
  process.exitCode = 1;
});
