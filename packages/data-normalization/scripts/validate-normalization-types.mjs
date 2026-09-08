import fs from 'node:fs';
import path from 'node:path';
import { createDataNormalizationValidatorHarness } from './validator-harness.mjs';

const {
  packageRoot,
  repoRoot,
  assert,
  exactArray,
  includesAll,
  assertGitUnchanged,
} = createDataNormalizationValidatorHarness(
  import.meta.url,
  {
    gitUnchangedMessage: "out-of-scope canonical or package metadata changed",
    includesAllMessage: "missing required entries",
  },
);

const typesPath = path.join(packageRoot, 'src', 'normalization.types.ts');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '05_NORMALIZACION_COMPARTIDA.md',
);

const expectedUnions = {
  NormalizableFieldSemanticClass: [
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
  ],
  NormalizationRepresentationRole: [
    'PRIMARY_VALUE',
    'DISPLAY_OVERRIDE',
    'SEARCH_DERIVATION',
    'EXTERNAL_ORIGINAL',
    'HISTORICAL_SNAPSHOT',
    'OUTPUT_PROJECTION',
    'AUDIT_EVIDENCE',
  ],
  NormalizationSourceRole: [
    'AUTHORITATIVE_SOURCE',
    'APPROVED_OVERRIDE',
    'SYNCHRONIZED_COPY',
    'IMMUTABLE_SNAPSHOT',
    'EXTERNAL_EVIDENCE',
    'OUTPUT_ONLY',
  ],
  NormalizationTreatmentMode: [
    'DETERMINISTIC_MUTATION_ALLOWED',
    'DICTIONARY_MUTATION_ALLOWED',
    'DERIVATION_ONLY',
    'VALIDATION_ONLY',
    'HUMAN_REVIEW_REQUIRED',
    'PRESERVE_EXACT',
    'STRUCTURAL_RESOLUTION_REQUIRED',
    'PROHIBITED',
  ],
  NormalizationOperationKind: [
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
  ],
};

const expectedInterfaces = {
  NormalizableFieldCoordinate: [
    'readonly owner_domain_ref: string;',
    'readonly owner_entity_ref: string;',
    'readonly semantic_field_ref: string;',
  ],
  NormalizableFieldDescriptor: [
    'readonly coordinate: NormalizableFieldCoordinate;',
    'readonly semantic_class: NormalizableFieldSemanticClass;',
    'readonly representation_role: NormalizationRepresentationRole;',
    'readonly source_role: NormalizationSourceRole;',
    'readonly policy_version_ref: string;',
    'readonly implementation_binding_ref?: readonly string[];',
    'readonly auxiliary_context?: unknown;',
  ],
  NormalizableStructuredComponentDescriptor: [
    'readonly parent_field: NormalizableFieldCoordinate;',
    'readonly component_path_ref: string;',
    'readonly descriptor: NormalizableFieldDescriptor;',
    'readonly order_semantics_ref?: string;',
    'readonly duplicate_semantics_ref?: string;',
  ],
  NormalizablePolymorphicVariantDescriptor: [
    'readonly parent_field: NormalizableFieldCoordinate;',
    'readonly discriminator_ref: string;',
    'readonly discriminator_version_ref: string;',
    'readonly variant_ref: string;',
    'readonly descriptor: NormalizableFieldDescriptor;',
  ],
};

function extractUnion(source, name) {
  const match = source.match(new RegExp(`export type ${name} =([\\s\\S]*?);`, 'u'));
  assert(match, `missing union ${name}`);
  return [...match[1].matchAll(/'([^']+)'/gu)].map((item) => item[1]);
}

function extractInterfaceLines(source, name) {
  const match = source.match(new RegExp(`export interface ${name} \\{([\\s\\S]*?)\\n\\}`, 'u'));
  assert(match, `missing interface ${name}`);
  return match[1]
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//gu, '')
    .replace(/(^|\s)\/\/.*$/gmu, '$1');
}

function countOccurrences(source, token) {
  return source.split(token).length - 1;
}

function main() {
  const typesSource = fs.readFileSync(typesPath, 'utf8');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const owner = fs.readFileSync(ownerPath, 'utf8');

  const packageEntries = fs.readdirSync(packageRoot).sort();
  const srcEntries = fs.readdirSync(path.join(packageRoot, 'src')).sort();
  const scriptEntries = fs.readdirSync(path.join(packageRoot, 'scripts')).sort();

  includesAll(packageEntries, ['README.md', 'package.json', 'scripts', 'src'], 'package root entries');
  includesAll(srcEntries, ['normalization.types.ts'], 'src entries');
  includesAll(scriptEntries, ['validate-normalization-types.mjs'], 'scripts entries');

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
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/05_NORMALIZACION_COMPARTIDA.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-NORM-001__GLOBAL.json',
    'packages/data-normalization/src/normalization.types.ts',
  ]);

  for (const [name, expected] of Object.entries(expectedUnions)) {
    exactArray(extractUnion(typesSource, name), expected, name);
  }

  for (const [name, expected] of Object.entries(expectedInterfaces)) {
    exactArray(extractInterfaceLines(typesSource, name), expected, name);
  }

  const exportedNames = [
    ...typesSource.matchAll(/export (?:type|interface) ([A-Za-z0-9_]+)/gu),
  ].map((match) => match[1]);

  exactArray(
    exportedNames,
    [
      'NormalizableFieldSemanticClass',
      'NormalizationRepresentationRole',
      'NormalizationSourceRole',
      'NormalizationTreatmentMode',
      'NormalizationOperationKind',
      'NormalizableFieldCoordinate',
      'NormalizableFieldDescriptor',
      'NormalizableStructuredComponentDescriptor',
      'NormalizablePolymorphicVariantDescriptor',
    ],
    'exported type artifacts',
  );

  const literalCount = Object.values(expectedUnions)
    .reduce((total, values) => total + values.length, 0);
  assert(literalCount === 48, `expected 48 literals, got ${literalCount}`);

  const executableSource = stripComments(typesSource);
  assert(!/^\s*import\s/gmu.test(executableSource), 'type contract must not import runtime code');
  assert(
    !/^\s*(?:export\s+)?(?:const|let|var|function|class|enum|namespace)\b/gmu.test(executableSource),
    'type contract contains runtime declarations',
  );

  const taskStart = owner.indexOf('### ✅ SHELL-NORM-002 — Centralizar tipos de campo normalizable');
  const taskEnd = owner.indexOf(
    '### ✅ SHELL-NORM-003 — Centralizar reglas de espacios, Unicode y capitalización',
    taskStart,
  );
  assert(taskStart >= 0 && taskEnd > taskStart, 'canonical SHELL-NORM-002 section not found');
  const task = owner.slice(taskStart, taskEnd);

  assert(
    owner.includes('<!-- EXECUTION-GATE-RECONCILIATION:B001-200:SHELL-NORM-001-009 -->'),
    'normalization topology reconciliation marker missing',
  );
  assert(owner.includes('| modalidad física | `GLOBAL_ENABLE_ONCE` |'), 'GLOBAL_ENABLE_ONCE missing');
  assert(owner.includes('| gate temporal | `PRE_E5_FOUNDATION` |'), 'PRE_E5_FOUNDATION missing');

  for (const name of exportedNames) {
    assert(task.includes(name), `canonical task does not contain ${name}`);
  }

  for (const values of Object.values(expectedUnions)) {
    for (const literal of values) {
      assert(task.includes(`\`${literal}\``), `canonical task does not contain literal ${literal}`);
      assert(
        countOccurrences(typesSource, `'${literal}'`) === 1,
        `physical literal ${literal} must appear exactly once`,
      );
    }
  }

  assert(task.includes('El total reconciliado es 48 literales'), 'canonical 48-literal reconciliation missing');
  assert(
    task.includes('La ausencia de un modo explícito equivale a `PROHIBITED`'),
    'closed treatment fallback missing',
  );
  assert(
    task.includes('`IDENTITY_OR_RECORD_ACTION` nunca se resuelve como mutación textual'),
    'identity boundary missing',
  );
  assert(task.includes('VITAL no hereda políticas Vento'), 'VITAL boundary missing');

  const readmeMarkers = [
    'SHELL-NORM-002::GLOBAL',
    'NormalizableFieldSemanticClass',
    'NormalizationRepresentationRole',
    'NormalizationSourceRole',
    'NormalizationTreatmentMode',
    'NormalizationOperationKind',
    '48 literales',
    'exports publicos: NO MATERIALIZADOS',
    'cambios Supabase: 0',
  ];

  for (const marker of readmeMarkers) {
    assert(readme.includes(marker), `README missing marker: ${marker}`);
  }

  console.log(
    'PASS: SHELL-NORM-002 types validated; '
      + 'artifacts=9 literals=48 semantic=14 representation=7 source=6 treatment=8 operations=13',
  );
}

try {
  main();
} catch (error) {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
