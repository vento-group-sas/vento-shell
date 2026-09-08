import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { serializeActiveSequence } from './continuity-route.mjs';
import { readAndResolveExecutionRoute } from './execution-route.mjs';
import {
  instanceRecordRelativePath,
  loadImplementationControl,
} from './implementation-control.mjs';
import {
  buildExecutionSequence,
  expandSequenceSegments,
  readGlobalTaskRegistry,
  resolveContinuity,
} from './plan-continuity-global.mjs';
import { formatTaskFileSource, parseTaskBlocks } from './format-canonical-task.mjs';
import { readPendingTaskTitleAuthority } from './pending-task-title-authority.mjs';
import { validateContract } from './validate-task-delivery.mjs';

export function terminalSafeText(value) {
  const replacements = new Map([
    ['\u279c', '->'],
    ['\u2192', '->'],
    ['\u2705', 'PASS'],
    ['\u274c', 'FAIL'],
    ['\u23f3', 'WAIT'],
    ['\u21bb', 'RETRY'],
    ['\u25b6', '>'],
    ['\u2014', '-'],
    ['\u2013', '-'],
    ['\u201c', '"'],
    ['\u201d', '"'],
    ['\u2018', "'"],
    ['\u2019', "'"],
  ]);
  let source = String(value ?? '');
  for (const [symbol, replacement] of replacements) {
    source = source.replaceAll(symbol, replacement);
  }
  return source
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/gu, '?');
}

function installTerminalSafeConsole() {
  for (const level of ['log', 'warn', 'error']) {
    const original = console[level].bind(console);
    console[level] = (...args) => original(
      ...args.map((value) => typeof value === 'string' ? terminalSafeText(value) : value),
    );
  }
}

function fail(message) {
  throw new Error(message);
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${filePath}.`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trimEnd() : null;
}

function expectedPhysicalDirtyPathSet(physicalRecordPath) {
  return new Set([physicalRecordPath].filter(Boolean));
}

function normalizeGitPath(value) {
  return String(value ?? '')
    .trim()
    .replace(/^"|"$/gu, '')
    .replaceAll('\\', '/');
}

export function parseWorktreePaths(source) {
  const paths = [];
  for (const line of String(source ?? '').split(/\r?\n/gu)) {
    if (!line.trim()) continue;
    const payload = line.length >= 4 ? line.slice(3).trim() : line.trim();
    const candidate = payload.includes(' -> ') ? payload.split(' -> ').at(-1) : payload;
    const normalized = normalizeGitPath(candidate);
    if (normalized) paths.push(normalized);
  }
  return [...new Set(paths)].sort((left, right) => left.localeCompare(right, 'en'));
}

export function validatorsForPath(relativePath) {
  const validators = new Set([
    'npm run docs:plan:build',
    'npm run docs:plan:check',
    'npm run docs:plan:test',
    'npm run docs:treq:check',
    'npm run docs:treq:test',
    'git diff --check',
  ]);
  const normalized = relativePath.replace(/\\/gu, '/');
  if (/E2_PROCESOS_Y_EXPERIENCIA|C_CATALOGO/u.test(normalized)) {
    validators.add('npm run docs:process-apps:check');
    validators.add('npm run docs:screens:check');
    validators.add('npm run docs:screen-processes:check');
    validators.add('npm run docs:screen-matrices:check');
  }
  if (/I_NAVEGACION_Y_PANTALLAS/u.test(normalized)) {
    validators.add('npm run docs:block-i:check');
  }
  if (/E3_SUPABASE/u.test(normalized)) validators.add('node scripts/docs/validate-e3-transition-closure.mjs');
  if (/E4_SERVICIOS_TRANSVERSALES/u.test(normalized)) validators.add('npm run docs:print-processes:check');
  if (/X_INTEGRACIONES/u.test(normalized)) {
    validators.add('npm run docs:int-app:check');
    validators.add('npm run docs:int-ext:check');
  }
  return [...validators];
}

export function validatorsForPreflight({ relativePath, requestedInstance = null } = {}) {
  if (requestedInstance) {
    return Array.isArray(requestedInstance.validation_commands)
      ? [...requestedInstance.validation_commands]
      : [];
  }
  return validatorsForPath(relativePath);
}

export function classifyPreflightFindings({
  requestedTaskId = null,
  currentTaskId = null,
  requestedInstance = null,
  worktreePaths = [],
  behind = 0,
  ahead = 0,
  activeSequenceCurrent = true,
  taskStructure = 'DEVELOPED',
  formatState = 'OK',
  contractErrors = [],
} = {}) {
  const blockers = [];
  const advisories = [];
  const instanceMatchesTask = requestedInstance
    && requestedTaskId
    && requestedInstance.task_id === requestedTaskId;
  const physicalRecordPath = requestedInstance
    ? instanceRecordRelativePath(requestedInstance.instance_id)
    : null;

  if (requestedInstance && requestedInstance.status !== 'IN_PROGRESS') {
    blockers.push(
      `${requestedInstance.instance_id} debe estar IN_PROGRESS para ejecutar el preflight físico; estado actual: ${requestedInstance.status}.`,
    );
  }

  if (requestedTaskId && requestedTaskId !== currentTaskId) {
    if (instanceMatchesTask) {
      advisories.push(
        `${requestedTaskId} pertenece al carril físico ${requestedInstance.instance_id}; la continuidad documental apunta a ${currentTaskId}.`,
      );
    } else {
      blockers.push(`${requestedTaskId} no es la tarea actual; la continuidad apunta a ${currentTaskId}.`);
    }
  }

  if (worktreePaths.length > 0) {
    if (physicalRecordPath) {
      const expectedDirtyPaths = expectedPhysicalDirtyPathSet(physicalRecordPath);
      const unexpectedPaths = worktreePaths.filter((entry) => !expectedDirtyPaths.has(entry));
      const expectedPresent = worktreePaths.filter((entry) => expectedDirtyPaths.has(entry));
      if (unexpectedPaths.length > 0) {
        blockers.push(
          `el worktree contiene cambios previos fuera del carril físico esperado: ${unexpectedPaths.join(', ')}.`,
        );
      } else {
        advisories.push(
          `el worktree contiene únicamente cambios esperados del carril físico: ${expectedPresent.join(', ')}.`,
        );
      }
    } else {
      blockers.push(`el repositorio contiene cambios locales: ${worktreePaths.join(', ')}.`);
    }
  }

  if (Number(behind) > 0) {
    blockers.push(`la referencia local de upstream contiene ${behind} commit(s) no integrados.`);
  }
  if (Number(ahead) > 0) {
    if (requestedInstance) {
      advisories.push(`la rama local contiene ${ahead} commit(s) no publicados durante el carril físico.`);
    } else {
      blockers.push(`la rama local contiene ${ahead} commit(s) no publicados.`);
    }
  }
  if (!activeSequenceCurrent) blockers.push('active-sequence.json requiere regeneración.');
  if (formatState !== 'OK') {
    if (taskStructure === 'EMPTY_DRAFT' && formatState === 'NEEDS_FORMAT') {
      advisories.push(
        'formato prospectivo pendiente permitido mientras la tarea permanezca EMPTY_DRAFT.',
      );
    } else {
      blockers.push(`formato de tarea: ${formatState}.`);
    }
  }
  if (contractErrors.length > 0) {
    blockers.push(`contrato de entrega inválido: ${contractErrors.join('; ')}`);
  }

  return { blockers, advisories };
}

function resolveRequestedInstance(root, requestedInstanceId) {
  if (!requestedInstanceId) return null;
  const control = loadImplementationControl({ root });
  const instance = control.instances.find((entry) => entry.instance_id === requestedInstanceId) ?? null;
  if (!instance) fail(`${requestedInstanceId} no existe en implementation-instances.`);
  return instance;
}

export function derivePreflight({
  root = process.cwd(),
  requestedTaskId = null,
  requestedInstanceId = null,
} = {}) {
  const baseDir = path.join(root, 'docs', 'plan-canonico', 'modular');
  const manifest = readJson(path.join(baseDir, 'manifest.json'), 'manifest.json');
  const taskMap = readGlobalTaskRegistry(baseDir, manifest);
  const resolvedConfig = readAndResolveExecutionRoute(baseDir, taskMap);
  const taskIds = Array.isArray(resolvedConfig.task_ids)
    ? resolvedConfig.task_ids
    : expandSequenceSegments(resolvedConfig.segments);
  const continuityMap = new Map(taskMap);
  for (const task of resolvedConfig.virtual_tasks ?? []) continuityMap.set(task.id, task);
  const continuity = resolveContinuity(
    continuityMap,
    buildExecutionSequence({ ...resolvedConfig, taskIds }),
  );
  const currentTaskId = continuity.current?.id ?? null;
  const requestedInstance = resolveRequestedInstance(root, requestedInstanceId);
  if (requestedTaskId && requestedInstance && requestedTaskId !== requestedInstance.task_id) {
    fail(`${requestedInstanceId} pertenece a ${requestedInstance.task_id}, no a ${requestedTaskId}.`);
  }
  const taskId = requestedTaskId ?? requestedInstance?.task_id ?? currentTaskId;
  if (!taskId) fail('la ruta está completa y no existe una tarea actual.');
  const task = taskMap.get(taskId);
  if (!task) fail(`${taskId} no es una tarea canónica física disponible para preflight.`);
  const orderedTasks = [...taskMap.values()].sort(
    (left, right) => left.fileIndex - right.fileIndex || left.taskIndex - right.taskIndex,
  );
  const canonicalOrder = orderedTasks.findIndex(({ id }) => id === taskId) + 1;

  const ownerPath = path.join(baseDir, task.relativePath);
  const ownerSource = fs.readFileSync(ownerPath, 'utf8');
  const blocks = parseTaskBlocks(ownerSource).filter(({ id }) => id === taskId);
  if (blocks.length !== 1) fail(`${taskId} debe aparecer exactamente una vez en su archivo propietario.`);
  const sectionCount = blocks[0].block.match(/^####\s+/gmu)?.length ?? 0;
  const canonicalTitles = readPendingTaskTitleAuthority(root);
  let formatState = 'OK';
  try {
    const formatted = formatTaskFileSource(ownerSource, { taskId, canonicalTitles });
    if (formatted.changedTaskIds.length > 0) formatState = 'NEEDS_FORMAT';
  } catch (error) {
    formatState = `ERROR: ${error instanceof Error ? error.message : String(error)}`;
  }

  const contractPath = path.join(baseDir, 'delivery-contract.json');
  const contract = readJson(contractPath, 'delivery-contract.json');
  const contractErrors = validateContract(contract);
  const expectedActiveSource = serializeActiveSequence(resolvedConfig);
  const activePath = path.join(baseDir, 'active-sequence.json');
  const activeSource = fs.readFileSync(activePath, 'utf8').replace(/\r\n?/gu, '\n');
  const worktree = git(root, ['status', '--porcelain=v1', '--untracked-files=all']) ?? '';
  const changedPaths = parseWorktreePaths(worktree);
  const branch = git(root, ['branch', '--show-current']);
  const upstream = git(root, ['rev-parse', '--abbrev-ref', '@{upstream}']);
  const divergenceRaw = upstream
    ? git(root, ['rev-list', '--left-right', '--count', '@{upstream}...HEAD'])
    : null;
  const [behind, ahead] = divergenceRaw?.split(/\s+/u).map(Number) ?? [null, null];
  const activeSequenceCurrent = activeSource === expectedActiveSource;
  const { blockers, advisories } = classifyPreflightFindings({
    requestedTaskId: taskId,
    currentTaskId,
    requestedInstance,
    worktreePaths: changedPaths,
    behind,
    ahead,
    activeSequenceCurrent,
    taskStructure: sectionCount === 0 ? 'EMPTY_DRAFT' : 'DEVELOPED',
    formatState,
    contractErrors,
  });

  const expectedRecordPath = requestedInstance
    ? instanceRecordRelativePath(requestedInstance.instance_id)
    : null;
  const expectedDirtyPaths = requestedInstance
    ? expectedPhysicalDirtyPathSet(expectedRecordPath)
    : new Set();
  const unexpectedPaths = requestedInstance
    ? changedPaths.filter((entry) => !expectedDirtyPaths.has(entry))
    : changedPaths;
  const expectedChangedPaths = requestedInstance
    ? changedPaths.filter((entry) => expectedDirtyPaths.has(entry))
    : [];
  const validators = validatorsForPreflight({
    relativePath: task.relativePath,
    requestedInstance,
  });

  return {
    task: {
      id: task.id,
      title: task.title,
      state: task.state,
      owner: task.relativePath.replace(/\\/gu, '/'),
      canonical_order: canonicalOrder,
      current: task.id === currentTaskId,
      section_count: sectionCount,
      structure: sectionCount === 0 ? 'EMPTY_DRAFT' : 'DEVELOPED',
      format: formatState,
    },
    instance: requestedInstance ? {
      id: requestedInstance.instance_id,
      task_id: requestedInstance.task_id,
      status: requestedInstance.status,
      record_path: expectedRecordPath,
      physical_preflight: true,
    } : null,
    continuity: {
      previous: continuity.lastApproved?.id ?? null,
      current: currentTaskId,
      next: continuity.next?.id ?? resolvedConfig.handoff_task_id ?? null,
      route: resolvedConfig.route_id,
      sequence: resolvedConfig.sequence_id,
      active_sequence_current: activeSequenceCurrent,
    },
    repository: {
      branch,
      upstream,
      behind,
      ahead,
      clean: changedPaths.length === 0,
      expected_dirty: Boolean(requestedInstance) && changedPaths.length > 0 && unexpectedPaths.length === 0,
      changed_paths: changedPaths,
      expected_changed_paths: expectedChangedPaths,
      unexpected_paths: unexpectedPaths,
      remote_note: 'La comparación usa la referencia local de upstream; este comando no ejecuta git fetch.',
    },
    delivery_contract: {
      valid: contractErrors.length === 0,
      errors: contractErrors,
    },
    validator_source: requestedInstance ? 'INSTANCE_VALIDATION_COMMANDS' : 'DOCUMENTARY_PATH_POLICY',
    validators,
    blockers,
    advisories,
    warnings: [...blockers, ...advisories],
  };
}

function parseArgs(argv) {
  const args = {
    taskId: null,
    instanceId: null,
    json: false,
    strict: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--json') args.json = true;
    else if (token === '--strict') args.strict = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--task-id' || token === '--instance-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail(`falta el valor de ${token}.`);
      if (token === '--task-id') args.taskId = value;
      else args.instanceId = value;
      index += 1;
    } else fail(`argumento desconocido: ${token}.`);
  }
  return args;
}

function printUsage() {
  console.log(`Uso:
  npm run docs:task:preflight
  npm run docs:task:preflight -- --task-id <ID> [--json] [--strict]
  npm run docs:task:preflight -- --instance-id <INSTANCE-ID> --json --strict

En modo físico, --strict falla solo ante bloqueos reales. Un carril documental adelantado y el cambio exclusivo del registro IN_PROGRESS se clasifican como avisos y no detienen el lote. La lista validators contiene exclusivamente validation_commands de la instancia; no agrega builds ni validadores documentales por rutina. El comando es de solo lectura: no hace fetch, no formatea y no cambia continuidad.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  const result = derivePreflight({
    requestedTaskId: args.taskId,
    requestedInstanceId: args.instanceId,
  });
  if (args.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`TAREA: ${result.task.id} — ${result.task.title}`);
    console.log(`ESTADO: ${result.task.state}; estructura ${result.task.structure}; formato ${result.task.format}`);
    console.log(`ARCHIVO: ${result.task.owner}`);
    if (result.instance) {
      console.log(`INSTANCIA: ${result.instance.id}; estado ${result.instance.status}; registro ${result.instance.record_path}`);
    }
    console.log(`CONTINUIDAD: ${result.continuity.previous} → ${result.continuity.current} → ${result.continuity.next}`);
    console.log(`GIT: ${result.repository.branch}; upstream ${result.repository.upstream ?? 'SIN_UPSTREAM'}; `
      + `behind ${result.repository.behind ?? 'N/A'}; ahead ${result.repository.ahead ?? 'N/A'}; `
      + `${result.repository.clean ? 'LIMPIO' : result.repository.expected_dirty ? 'CAMBIO FÍSICO ESPERADO' : 'CON CAMBIOS'}`);
    console.log(`ORIGEN DE VALIDADORES: ${result.validator_source}`);
    console.log('VALIDADORES:');
    for (const validator of result.validators) console.log(`- ${validator}`);
    if (result.blockers.length > 0) {
      console.log('BLOQUEOS:');
      for (const blocker of result.blockers) console.log(`- ${blocker}`);
    }
    if (result.advisories.length > 0) {
      console.log('AVISOS:');
      for (const advisory of result.advisories) console.log(`- ${advisory}`);
    }
    if (result.blockers.length === 0) console.log('OK: preflight sin bloqueos reales.');
  }
  if (args.strict && result.blockers.length > 0) process.exitCode = 1;
  return result;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  installTerminalSafeConsole();
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}