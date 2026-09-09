import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTaskBlocks } from './format-canonical-task.mjs';

const DEFAULT_CONTRACT = 'docs/plan-canonico/modular/delivery-contract.json';
const TASK_ID_SOURCE = '[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\\d{3}';
const TREQ_ID_SOURCE = 'TREQ-[A-Z]+-\\d{3,}';

function fail(message) {
  throw new Error(message);
}

function normalizeSource(source) {
  return source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
}

function readUtf8(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label}: no existe ${filePath}`);
  }

  const buffer = fs.readFileSync(filePath);
  const decoded = buffer.toString('utf8');

  if (Buffer.from(decoded, 'utf8').compare(buffer) !== 0) {
    fail(`${label}: el archivo no es UTF-8 válido: ${filePath}`);
  }

  return normalizeSource(decoded);
}

function sha256(source) {
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    task: null,
    registries: [],
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }

    if (!['--contract', '--task', '--task-id', '--registry'].includes(token)) {
      fail(`Argumento desconocido: ${token}`);
    }

    const value = argv[index + 1];

    if (!value || value.startsWith('--')) {
      fail(`Falta el valor de ${token}`);
    }

    if (token === '--registry') {
      args.registries.push(value);
    } else {
      args[token.slice(2)] = value;
    }

    index += 1;
  }

  if (args.task && args['task-id']) fail('Usa --task o --task-id, no ambos.');
  return args;
}

export function extractDeliveryTask({ root = process.cwd(), taskId }) {
  if (!new RegExp(`^${TASK_ID_SOURCE}$`, 'u').test(taskId)) fail(`ID de tarea inválido: ${taskId}`);
  const base = path.join(root, 'docs/plan-canonico/modular');
  const manifest = JSON.parse(readUtf8(path.join(base, 'manifest.json'), 'Manifest'));
  const matches = [];
  for (const file of manifest.files) {
    if (!file.endsWith('.md')) continue;
    const blocks = parseTaskBlocks(readUtf8(path.join(base, file), 'Fragmento'));
    matches.push(...blocks.filter(({ id }) => id === taskId));
  }
  if (matches.length !== 1) fail(`${taskId}: se esperaba un bloque propietario único; encontrados ${matches.length}.`);
  const taskPath = path.join(root, '.delivery/task-deliveries', `${taskId}_APROBADA_PARA_REEMPLAZAR.md`);
  fs.mkdirSync(path.dirname(taskPath), { recursive: true });
  fs.writeFileSync(taskPath, `${matches[0].block.trimEnd()}\n`, 'utf8');
  return taskPath;
}

function printUsage() {
  console.log(`Uso:
  npm run docs:delivery:check
  npm run docs:delivery:check -- --task <archivo-tarea.md> [--registry <fragmento-04A.md> ...]
  npm run docs:delivery:check -- --task-id AUTH-UI-044

Opciones:
  --contract <ruta>   Contrato de entrega. Predeterminado: ${DEFAULT_CONTRACT}
  --task <ruta>       Artefacto de tarea que se validará.
  --task-id <ID>      Extrae exactamente una tarea del propietario y valida el artefacto UTF-8.
  --registry <ruta>   Fragmento 04A completo. Puede repetirse una vez por cada fragmento afectado.
  --help              Muestra esta ayuda.

Sin --task se valida únicamente el contrato.
Con --task se valida el formato completo de la entrega.
Si la tarea crea o modifica TREQ, deben proporcionarse los fragmentos 04A afectados con su nombre canónico exacto.`);
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireBoolean(object, key, label, errors) {
  if (typeof object?.[key] !== 'boolean') {
    errors.push(`${label}.${key} debe ser booleano.`);
  }
}

function requireString(object, key, label, errors) {
  if (typeof object?.[key] !== 'string' || object[key].trim() === '') {
    errors.push(`${label}.${key} debe ser un string no vacío.`);
  }
}

export function validateContract(contract) {
  const errors = [];

  if (!isPlainObject(contract)) {
    return ['El contrato debe ser un objeto JSON.'];
  }

  if (!Number.isInteger(contract.schema_version) || contract.schema_version < 2) {
    errors.push('schema_version debe ser un entero mayor o igual que 2 para el modelo 04A modular.');
  }

  if (!isPlainObject(contract.task_artifact)) {
    errors.push('task_artifact debe ser un objeto.');
  } else {
    requireString(contract.task_artifact, 'filename', 'task_artifact', errors);
    requireBoolean(contract.task_artifact, 'exactly_one_task', 'task_artifact', errors);
    requireBoolean(
      contract.task_artifact,
      'allow_replacement_instructions_inside_file',
      'task_artifact',
      errors
    );
    requireBoolean(
      contract.task_artifact,
      'allow_chat_instructions_inside_file',
      'task_artifact',
      errors
    );
    requireBoolean(
      contract.task_artifact,
      'allow_global_summary_inside_file',
      'task_artifact',
      errors
    );

    if (
      typeof contract.task_artifact.filename === 'string'
      && !contract.task_artifact.filename.includes('<TASK-ID>')
    ) {
      errors.push('task_artifact.filename debe contener <TASK-ID>.');
    }
  }

  const registry = contract.registry_artifact;

  if (!isPlainObject(registry)) {
    errors.push('registry_artifact debe ser un objeto.');
  } else {
    for (const key of [
      'source_model',
      'manifest_repository_path',
      'fragment_directory_repository_path',
      'fragment_filename_pattern',
      'header_fragment_filename',
      'legacy_monolithic_filename',
      'delivery_mode',
      'delivery_filename_strategy',
    ]) {
      requireString(registry, key, 'registry_artifact', errors);
    }

    for (const key of [
      'allow_legacy_monolithic_delivery',
      'replace_complete_fragment',
      'deliver_unchanged_fragments',
      'require_header_fragment_when_registry_changes',
      'preserve_unaffected_fragments',
      'validate_resulting_registry_as_complete',
    ]) {
      requireBoolean(registry, key, 'registry_artifact', errors);
    }

    if (registry.source_model !== 'modular') {
      errors.push('registry_artifact.source_model debe ser "modular".');
    }
    if (registry.delivery_mode !== 'affected_fragments_only') {
      errors.push('registry_artifact.delivery_mode debe ser "affected_fragments_only".');
    }
    if (registry.delivery_filename_strategy !== 'exact_canonical_fragment_filename') {
      errors.push(
        'registry_artifact.delivery_filename_strategy debe ser "exact_canonical_fragment_filename".'
      );
    }
    if (registry.allow_legacy_monolithic_delivery !== false) {
      errors.push('registry_artifact.allow_legacy_monolithic_delivery debe permanecer en false.');
    }
    if (registry.replace_complete_fragment !== true) {
      errors.push('registry_artifact.replace_complete_fragment debe permanecer en true.');
    }
    if (registry.preserve_unaffected_fragments !== true) {
      errors.push('registry_artifact.preserve_unaffected_fragments debe permanecer en true.');
    }

    try {
      new RegExp(registry.fragment_filename_pattern, 'u');
    } catch {
      errors.push('registry_artifact.fragment_filename_pattern no es una expresión regular válida.');
    }
  }

  for (const key of ['chat_only_content', 'forbidden_inside_task']) {
    if (
      !Array.isArray(contract[key])
      || contract[key].length === 0
      || contract[key].some(
        (value) => typeof value !== 'string' || value.trim() === ''
      )
    ) {
      errors.push(`${key} debe ser un arreglo no vacío de strings.`);
    }
  }

  return errors;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function templateToRegex(template, placeholders) {
  const markerRegex = /<([A-Z-]+)>/g;
  let cursor = 0;
  let source = '^';

  for (const match of template.matchAll(markerRegex)) {
    source += escapeRegex(template.slice(cursor, match.index));
    const replacement = placeholders[match[0]];

    if (!replacement) {
      fail(`Placeholder no soportado en el contrato: ${match[0]}`);
    }

    source += replacement;
    cursor = match.index + match[0].length;
  }

  source += escapeRegex(template.slice(cursor));
  source += '$';

  return new RegExp(source);
}

function maskFencedCode(source) {
  let fenced = false;

  return source
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        fenced = !fenced;
        return '';
      }

      return fenced ? '' : line;
    })
    .join('\n');
}

function findLiteral(source, literal) {
  return source
    .toLocaleLowerCase('es')
    .includes(literal.toLocaleLowerCase('es'));
}

function addTreqRange(references, domain, fromRaw, toRaw) {
  const from = Number(fromRaw);
  const to = Number(toRaw);

  if (!Number.isInteger(from) || !Number.isInteger(to) || to < from) {
    return;
  }

  for (let number = from; number <= to; number += 1) {
    references.add(`TREQ-${domain}-${String(number).padStart(3, '0')}`);
  }
}

function expandTreqReferences(value) {
  const references = new Set();
  let withoutRanges = value;

  const explicitRange =
    /TREQ-([A-Z]+)-(\d{3,})`?\s+a\s+`?TREQ-\1-(\d{3,})/g;

  for (const match of value.matchAll(explicitRange)) {
    addTreqRange(references, match[1], match[2], match[3]);
    withoutRanges = withoutRanges.replace(match[0], '');
  }

  const compactRange =
    /TREQ-([A-Z]+)-(\d{3,})\.\.(\d{3,})/g;

  for (const match of withoutRanges.matchAll(compactRange)) {
    addTreqRange(references, match[1], match[2], match[3]);
    withoutRanges = withoutRanges.replace(match[0], '');
  }

  for (
    const match of withoutRanges.matchAll(
      new RegExp(`\\b${TREQ_ID_SOURCE}\\b`, 'g')
    )
  ) {
    references.add(match[0]);
  }

  return [...references];
}

function extractRequirementsSection(source) {
  const headingPattern =
    /^####(?:\s+\d+\.)?\s+Requisitos de prueba (?:derivados|generados|incorporados|modificados|vinculados)\s*$/gmi;

  const matches = [...source.matchAll(headingPattern)];

  if (matches.length === 0) {
    return null;
  }

  const start = matches[0].index;
  const afterHeading = start + matches[0][0].length;
  const tail = source.slice(afterHeading);
  const nextHeadingOffset = tail.search(/^####\s/m);

  return source.slice(
    start,
    nextHeadingOffset >= 0
      ? afterHeading + nextHeadingOffset
      : source.length
  );
}

function extractDeclaredCount(section, label) {
  if (!section) return 0;
  const match = section.match(
    new RegExp(`\\*\\*${escapeRegex(label)}:\\*\\*\\s+\\*{0,2}(\\d+)`, 'i')
  );
  return match ? Number(match[1]) : 0;
}

export function validateTask({ taskPath, contract }) {
  const errors = [];
  const source = readUtf8(taskPath, 'Tarea');
  const fileName = path.basename(taskPath);

  const filenameRegex = templateToRegex(
    contract.task_artifact.filename,
    {
      '<TASK-ID>': `(?<taskId>${TASK_ID_SOURCE})`,
    }
  );

  const filenameMatch = fileName.match(filenameRegex);

  if (!filenameMatch) {
    errors.push(
      `El nombre de la tarea no cumple task_artifact.filename: ${fileName}`
    );
  }

  const visibleSource = maskFencedCode(source);

  const taskHeadingRegex = new RegExp(
    `^###\\s+✅\\s+(?<taskId>${TASK_ID_SOURCE})\\s+—\\s+.+$`,
    'gmu'
  );

  const headings = [...visibleSource.matchAll(taskHeadingRegex)];

  if (
    contract.task_artifact.exactly_one_task
    && headings.length !== 1
  ) {
    errors.push(
      `La tarea debe contener exactamente un encabezado canónico; encontrados: ${headings.length}.`
    );
  }

  const headingTaskId = headings[0]?.groups?.taskId ?? null;
  const filenameTaskId = filenameMatch?.groups?.taskId ?? null;

  if (
    headingTaskId
    && filenameTaskId
    && headingTaskId !== filenameTaskId
  ) {
    errors.push(
      `El ID del encabezado (${headingTaskId}) no coincide con el nombre (${filenameTaskId}).`
    );
  }

  const approvedStates =
    visibleSource.match(/^\*\*Estado:\*\*\s+APROBADA\s*$/gmu) ?? [];

  if (approvedStates.length !== 1) {
    errors.push(
      `Debe existir exactamente una línea "**Estado:** APROBADA"; encontradas: ${approvedStates.length}.`
    );
  }

  const forbidden = new Set([
    ...(contract.forbidden_inside_task ?? []),
    ...(contract.chat_only_content ?? []),
  ]);

  for (const phrase of forbidden) {
    if (findLiteral(source, phrase)) {
      errors.push(
        `Contenido reservado para el chat encontrado dentro de la tarea: "${phrase}".`
      );
    }
  }

  if (!contract.task_artifact.allow_chat_instructions_inside_file) {
    const chatPatterns = [
      /sandbox:\/\//i,
      /enlace\s+de\s+descarga/i,
      /\b(?:descarga|descargue|descargar)\s+(?:(?:este|esta|el|la|un|una)\s+)?(?:archivo|registro|artefacto|documento|tarea|04A)\b/i,
    ];

    for (const pattern of chatPatterns) {
      if (pattern.test(source)) {
        errors.push(
          `La tarea contiene una instrucción de chat o descarga prohibida: ${pattern}.`
        );
      }
    }
  }

  if (!contract.task_artifact.allow_replacement_instructions_inside_file) {
    const replacementPatterns = [
      /marcador\s+exacto/i,
      /reemplazar\s+completamente\s+(?:el\s+)?(?:archivo\s+)?04A/i,
      /fragmentos?\s+04A\s+que\s+deben\s+reemplazarse/i,
      /no\s+copiar[^\n]*filas/i,
      /instrucci[oó]n\s+de\s+reemplazo/i,
    ];

    for (const pattern of replacementPatterns) {
      if (pattern.test(source)) {
        errors.push(
          `La tarea contiene una instrucción de reemplazo prohibida: ${pattern}.`
        );
      }
    }
  }

  if (!contract.task_artifact.allow_global_summary_inside_file) {
    const globalSummary =
      visibleSource.match(
        /^#{1,4}\s+(?:Resumen|Estado)\s+(?:final|global|general)\s*$/gmi
      ) ?? [];

    if (globalSummary.length > 0) {
      errors.push('La tarea contiene un resumen global prohibido por el contrato.');
    }
  }

  const requirementsSection = extractRequirementsSection(source);
  const declaresNoRequirements =
    /NO\s+GENERA\s+REQUISITOS\s+DE\s+PRUEBA/i.test(source);

  if (!requirementsSection && !declaresNoRequirements) {
    errors.push(
      'La tarea debe incluir una sección de requisitos de prueba derivados/generados/incorporados/modificados/vinculados o declarar NO GENERA REQUISITOS DE PRUEBA.'
    );
  }

  const registryTreqIds = requirementsSection
    ? expandTreqReferences(requirementsSection)
    : [];

  const createdCount = extractDeclaredCount(
    requirementsSection,
    'Requisitos creados'
  );
  const modifiedCount = extractDeclaredCount(
    requirementsSection,
    'Requisitos modificados'
  );

  if (
    requirementsSection
    && registryTreqIds.length === 0
    && createdCount === 0
    && modifiedCount === 0
    && !declaresNoRequirements
  ) {
    errors.push(
      'La sección de requisitos de prueba no declara TREQ creados/modificados ni la ausencia de requisitos.'
    );
  }

  return {
    errors,
    source,
    taskId: headingTaskId ?? filenameTaskId,
    registryTreqIds,
    requiresRegistry:
      registryTreqIds.length > 0 || createdCount > 0 || modifiedCount > 0,
  };
}

function loadRegistryConfiguration({ root, contract }) {
  const registry = contract.registry_artifact;
  const manifestPath = path.resolve(root, registry.manifest_repository_path);
  const fragmentDirectory = path.resolve(
    root,
    registry.fragment_directory_repository_path
  );

  const manifest = JSON.parse(readUtf8(manifestPath, 'Manifest canónico'));
  const modularRoot = path.dirname(manifestPath);
  const pattern = new RegExp(registry.fragment_filename_pattern, 'u');
  const fragments = new Map();

  for (const relativePath of manifest.files ?? []) {
    const absolutePath = path.resolve(modularRoot, relativePath);
    if (path.dirname(absolutePath) !== fragmentDirectory) continue;

    const basename = path.basename(absolutePath);
    if (!pattern.test(basename)) continue;

    fragments.set(basename, absolutePath);
  }

  if (fragments.size === 0) {
    fail('Manifest canónico: no se encontraron fragmentos 04A modulares.');
  }

  if (!fragments.has(registry.header_fragment_filename)) {
    fail(
      `Manifest canónico: falta el fragmento de cabecera ${registry.header_fragment_filename}.`
    );
  }

  return { fragments };
}

function expectedDomainFromFilename(fileName) {
  const match = fileName.match(/^04A_\d{2}_([A-Z]+)\.md$/u);
  return match?.[1] ?? null;
}

function validateFragmentShape({ fileName, source, contract, taskId }) {
  const errors = [];
  const registry = contract.registry_artifact;

  if (fileName === registry.header_fragment_filename) {
    const headings =
      source.match(/^## REGISTRO CANÓNICO DE REQUISITOS DE PRUEBA\s*$/gmu) ?? [];

    if (headings.length !== 1) {
      errors.push(
        `${fileName}: la cabecera 04A debe contener exactamente un encabezado principal canónico.`
      );
    }

    const latestTaskMatch = source.match(
      /^\|\s*Última tarea incorporada\s*\|\s*`?([^`|]+)`?\s*\|\s*$/mu
    );
    const latestTask = latestTaskMatch?.[1]?.trim() ?? null;

    if (!latestTask) {
      errors.push(`${fileName}: falta "Última tarea incorporada".`);
    } else if (taskId && latestTask !== taskId) {
      errors.push(
        `${fileName}: declara como última tarea ${latestTask}, pero se esperaba ${taskId}.`
      );
    }

    return errors;
  }

  if (/^04A_\d{2}_REGLAS_OBLIGATORIAS\.md$/u.test(fileName)) {
    const headings =
      source.match(/^### Reglas obligatorias\s*$/gmu) ?? [];
    if (headings.length !== 1) {
      errors.push(
        `${fileName}: debe contener exactamente una sección "### Reglas obligatorias".`
      );
    }
    return errors;
  }

  const domain = expectedDomainFromFilename(fileName);

  if (!domain) {
    errors.push(`${fileName}: no se pudo resolver el dominio del fragmento.`);
    return errors;
  }

  const headings =
    source.match(new RegExp(`^####\\s+${escapeRegex(domain)}\\s*$`, 'gmu')) ?? [];

  if (headings.length !== 1) {
    errors.push(
      `${fileName}: debe contener exactamente el encabezado de dominio "#### ${domain}".`
    );
  }

  if (!/^\|\s*ID\s*\|\s*Dominio\s*\|/mu.test(source)) {
    errors.push(`${fileName}: falta la cabecera completa de la tabla TREQ.`);
  }

  return errors;
}

function rowIdOccurrences(source, treqId) {
  const pattern = new RegExp(
    `^\\|\\s*\`?${escapeRegex(treqId)}\`?\\s*\\|`,
    'gmu'
  );
  return source.match(pattern)?.length ?? 0;
}

function parseAllRowIds(source) {
  return [
    ...source.matchAll(
      /^\|\s*`?(TREQ-[A-Z]+-\d{3,})`?\s*\|/gmu
    ),
  ].map((match) => match[1]);
}

function validateProspectiveRegistry({
  canonicalFragments,
  deliveredSources,
  contract,
  taskId,
}) {
  const errors = [];
  const allIds = [];
  let headerSource = null;

  for (const [fileName, canonicalPath] of canonicalFragments) {
    const source = deliveredSources.get(fileName)
      ?? readUtf8(canonicalPath, `Fragmento canónico ${fileName}`);

    errors.push(
      ...validateFragmentShape({
        fileName,
        source,
        contract,
        taskId:
          fileName === contract.registry_artifact.header_fragment_filename
            ? taskId
            : null,
      })
    );

    if (fileName === contract.registry_artifact.header_fragment_filename) {
      headerSource = source;
    }

    allIds.push(...parseAllRowIds(source));
  }

  const uniqueIds = new Set(allIds);

  if (uniqueIds.size !== allIds.length) {
    errors.push(
      `Registro 04A resultante: existen ${allIds.length - uniqueIds.size} identificadores TREQ duplicados.`
    );
  }

  const summaryMatch = headerSource?.match(
    /^\|\s*Requisitos vigentes\s*\|\s*\**(\d+)\**\s*\|\s*$/mu
  );

  if (!summaryMatch) {
    errors.push(
      'Registro 04A resultante: la cabecera no declara "Requisitos vigentes".'
    );
  } else if (Number(summaryMatch[1]) !== allIds.length) {
    errors.push(
      `Registro 04A resultante: la cabecera declara ${summaryMatch[1]} requisitos y las tablas contienen ${allIds.length}.`
    );
  }

  return errors;
}

function validateRegistryFragments({
  registryPaths,
  contract,
  taskId,
  registryTreqIds,
}) {
  const errors = [];
  const root = process.cwd();
  const { fragments } = loadRegistryConfiguration({ root, contract });
  const deliveredSources = new Map();
  const registry = contract.registry_artifact;

  for (const registryPathRaw of registryPaths) {
    const registryPath = path.resolve(registryPathRaw);
    const fileName = path.basename(registryPath);

    if (
      fileName === registry.legacy_monolithic_filename
      && !registry.allow_legacy_monolithic_delivery
    ) {
      errors.push(
        `${fileName}: el 04A monolítico legacy no es un artefacto de entrega permitido.`
      );
      continue;
    }

    if (!fragments.has(fileName)) {
      errors.push(
        `${fileName}: no es un fragmento 04A canónico registrado en manifest.json.`
      );
      continue;
    }

    if (deliveredSources.has(fileName)) {
      errors.push(`${fileName}: fragmento 04A entregado más de una vez.`);
      continue;
    }

    const source = readUtf8(registryPath, `Fragmento 04A ${fileName}`);
    deliveredSources.set(fileName, source);

    errors.push(
      ...validateFragmentShape({ fileName, source, contract, taskId })
    );

    if (!registry.deliver_unchanged_fragments) {
      const canonicalSource = readUtf8(
        fragments.get(fileName),
        `Fragmento canónico ${fileName}`
      );

      if (source === canonicalSource) {
        errors.push(
          `${fileName}: el fragmento entregado es idéntico al canónico y no debe incluirse como afectado.`
        );
      }
    }
  }

  if (
    registry.require_header_fragment_when_registry_changes
    && !deliveredSources.has(registry.header_fragment_filename)
  ) {
    errors.push(
      `Falta ${registry.header_fragment_filename}; toda creación o modificación TREQ debe actualizar la cabecera/resumen del registro.`
    );
  }

  const domainsNeeded = new Map();

  for (const treqId of registryTreqIds) {
    const match = treqId.match(/^TREQ-([A-Z]+)-\d{3,}$/u);
    if (!match) continue;
    const domain = match[1];

    const expectedFile = [...fragments.keys()].find(
      (fileName) => expectedDomainFromFilename(fileName) === domain
    );

    if (!expectedFile) {
      errors.push(
        `${treqId}: no existe fragmento 04A canónico para el dominio ${domain}.`
      );
      continue;
    }

    if (!domainsNeeded.has(expectedFile)) {
      domainsNeeded.set(expectedFile, []);
    }
    domainsNeeded.get(expectedFile).push(treqId);
  }

  for (const [expectedFile, treqIds] of domainsNeeded) {
    const source = deliveredSources.get(expectedFile);

    if (!source) {
      errors.push(
        `Falta el fragmento afectado ${expectedFile}; contiene ${treqIds.length} TREQ declarados por la tarea.`
      );
      continue;
    }

    for (const treqId of treqIds) {
      const occurrences = rowIdOccurrences(source, treqId);

      if (occurrences !== 1) {
        errors.push(
          `${expectedFile}: ${treqId} debe existir exactamente una vez como fila del registro; encontrado ${occurrences}.`
        );
      }
    }
  }

  if (registry.validate_resulting_registry_as_complete) {
    errors.push(
      ...validateProspectiveRegistry({
        canonicalFragments: fragments,
        deliveredSources,
        contract,
        taskId,
      })
    );
  }

  return {
    errors,
    deliveredSources,
  };
}

export function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printUsage();
    return;
  }

  const contractPath = path.resolve(args.contract);
  const contractSource = readUtf8(contractPath, 'Contrato');

  let contract;

  try {
    contract = JSON.parse(contractSource);
  } catch (error) {
    fail(
      `Contrato JSON inválido: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }

  const contractErrors = validateContract(contract);

  if (contractErrors.length > 0) {
    fail(
      `Contrato de entrega inválido:\n- ${contractErrors.join('\n- ')}`
    );
  }

  const contractHash = sha256(contractSource);

  console.log(
    `OK: contrato de entrega modular; SHA-256 ${contractHash}.`
  );

  if (args['task-id']) {
    args.task = extractDeliveryTask({ taskId: args['task-id'] });
    console.log(`Artefacto extraído: ${args.task}`);
  }

  if (!args.task) {
    console.log(
      'OK: modo contrato; no se solicitó validar un artefacto de tarea.'
    );
    return;
  }

  const taskPath = path.resolve(args.task);
  const taskResult = validateTask({
    taskPath,
    contract,
  });

  const errors = [...taskResult.errors];

  if (!taskResult.taskId) {
    errors.push('No se pudo resolver el identificador de la tarea.');
  }

  if (taskResult.requiresRegistry && args.registries.length === 0) {
    errors.push(
      'La tarea crea o modifica TREQ; debe proporcionarse al menos un --registry por cada fragmento 04A afectado.'
    );
  }

  let registryResult = null;

  if (args.registries.length > 0 && taskResult.taskId) {
    registryResult = validateRegistryFragments({
      registryPaths: args.registries,
      contract,
      taskId: taskResult.taskId,
      registryTreqIds: taskResult.registryTreqIds,
    });

    errors.push(...registryResult.errors);
  }

  if (errors.length > 0) {
    fail(
      `Entrega documental inválida:\n- ${errors.join('\n- ')}`
    );
  }

  console.log(
    `OK: tarea ${taskResult.taskId}; `
    + `${taskResult.registryTreqIds.length} TREQ declarados para actualización; `
    + `${sha256(taskResult.source)} SHA-256.`
  );

  if (registryResult) {
    const files = [...registryResult.deliveredSources.entries()]
      .map(([fileName, source]) => `${fileName}:${sha256(source)}`)
      .join(', ');

    console.log(
      `OK: fragmentos 04A afectados: ${files}.`
    );
  }
}

const isCli =
  process.argv[1]
  && path.resolve(process.argv[1])
  === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(
      `ERROR: ${error instanceof Error ? error.message : String(error)
      }`
    );
    process.exit(1);
  }
}
