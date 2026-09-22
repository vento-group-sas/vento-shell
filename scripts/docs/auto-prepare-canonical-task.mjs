import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { derivePreflight } from './canonical-task-preflight.mjs';
import {
  formatTaskFileSource,
  parseTaskBlocks,
  validateTaskPresentation,
} from './format-canonical-task.mjs';
import { validateTaskFormatPolicy } from './task-format-policy.mjs';
import { readPendingTaskTitleAuthority } from './pending-task-title-authority.mjs';
import {
  isHistoricalApprovedExemption,
  validateProspectiveTaskSemantics,
} from './task-semantic-contract.mjs';

function fail(message) {
  throw new Error(message);
}

export function automaticTaskIds(preflight, additionalTaskIds = []) {
  return [...new Set([
    preflight.continuity.previous,
    preflight.continuity.current,
    ...additionalTaskIds,
  ].filter(Boolean))];
}

export function isTaskCoveredByPresentationPolicy(taskOrder, boundaryOrder) {
  return taskOrder >= boundaryOrder;
}

export function shouldPreserveUnapprovedTask(preflight) {
  return String(preflight?.task?.state ?? '').trim().toUpperCase() !== 'APROBADA';
}

function writePreservingEol(filePath, raw, normalized) {
  const next = raw.includes('\r\n') ? normalized.replace(/\n/gu, '\r\n') : normalized;
  fs.writeFileSync(filePath, next, 'utf8');
}

export function summarizeSemanticWarnings(warnings) {
  const counts = new Map();
  for (const { taskId } of warnings) counts.set(taskId, (counts.get(taskId) ?? 0) + 1);
  return [...counts.entries()].map(([taskId, count]) => `${taskId} (${count})`).join(', ');
}

export function renderSemanticWarningsReport(warnings) {
  const lines = [
    '# Advertencias semánticas del plan canónico',
    '',
    '> Artefacto local generado por el formateador. No es una fuente canónica ni bloquea la compilación.',
    '',
    `- **Total:** ${warnings.length}`,
    `- **Tareas afectadas:** ${new Set(warnings.map(({ taskId }) => taskId)).size}`,
  ];
  if (warnings.length === 0) return `${lines.join('\n')}\n\nSin advertencias.\n`;

  const grouped = new Map();
  for (const warning of warnings) {
    if (!grouped.has(warning.taskId)) grouped.set(warning.taskId, []);
    grouped.get(warning.taskId).push(warning);
  }
  for (const [taskId, taskWarnings] of grouped) {
    lines.push('', `## ${taskId}`, '', '| Código | Detalle |', '| --- | --- |');
    for (const { code, message } of taskWarnings) {
      lines.push(`| ${code} | ${message.replaceAll('|', '\\|')} |`);
    }
  }
  return `${lines.join('\n')}\n`;
}

function writeSemanticWarningsReport(root, warnings) {
  const relativePath = '.delivery/canonical-task-semantic-warnings.md';
  const reportPath = path.join(root, ...relativePath.split('/'));
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, renderSemanticWarningsReport(warnings), 'utf8');
  return relativePath;
}

export function autoPrepareCanonicalTask({
  root = process.cwd(),
  checkOnly = false,
  additionalTaskIds = [],
} = {}) {
  const currentPreflight = derivePreflight({ root });
  const baseDir = path.join(root, 'docs', 'plan-canonico', 'modular');
  const policy = validateTaskFormatPolicy({ root });
  const developmentPolicy = JSON.parse(fs.readFileSync(
    path.join(baseDir, 'task-development-policy.json'),
    'utf8',
  ));
  const boundary = derivePreflight({ root, requestedTaskId: policy.effective_from_task_id });
  const canonicalTitles = readPendingTaskTitleAuthority(root);
  const changed = [];
  const checked = [];
  const skipped = [];
  const semanticWarnings = [];

  for (const taskId of automaticTaskIds(currentPreflight, additionalTaskIds)) {
    let preflight;
    try {
      preflight = derivePreflight({ root, requestedTaskId: taskId });
    } catch (error) {
      skipped.push({
        taskId,
        reason: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    if (!isTaskCoveredByPresentationPolicy(
      preflight.task.canonical_order,
      boundary.task.canonical_order,
    )) {
      skipped.push({ taskId, reason: 'HISTORICAL_STYLE_PRESERVED' });
      continue;
    }

    if (isHistoricalApprovedExemption(taskId, developmentPolicy)) {
      skipped.push({ taskId, reason: 'HISTORICAL_APPROVAL_PRESERVED' });
      continue;
    }

    if (shouldPreserveUnapprovedTask(preflight)) {
      const semantic = validateProspectiveTaskSemantics({ root, taskId });
      semanticWarnings.push(...semantic.warnings.map((warning) => ({ taskId, ...warning })));
      skipped.push({ taskId, reason: 'UNAPPROVED_TASK_PRESERVED' });
      continue;
    }

    if (preflight.task.structure === 'EMPTY_DRAFT') {
      const semantic = validateProspectiveTaskSemantics({ root, taskId });
      semanticWarnings.push(...semantic.warnings.map((warning) => ({ taskId, ...warning })));
      skipped.push({ taskId, reason: 'EMPTY_DRAFT_NO_AUTO_SCAFFOLD' });
      continue;
    }

    const ownerPath = path.join(baseDir, preflight.task.owner);
    const raw = fs.readFileSync(ownerPath, 'utf8');
    const result = formatTaskFileSource(raw, { taskId, canonicalTitles });
    checked.push(taskId);
    if (result.changedTaskIds.length > 0 && checkOnly) {
      fail(`${taskId} requiere formato canónico; ejecute docs:plan:build para aplicarlo.`);
    }
    const effectiveSource = result.source;
    const [formattedTask] = parseTaskBlocks(effectiveSource).filter(({ id }) => id === taskId);
    const presentationErrors = formattedTask
      ? validateTaskPresentation(formattedTask.block, { canonicalTitles })
      : [
      `${taskId} no se pudo aislar después del formateo.`,
      ];
    if (presentationErrors.length > 0) {
      fail(`${taskId} incumple task-format-policy.json:\n- ${presentationErrors.join('\n- ')}`);
    }
    if (result.changedTaskIds.length > 0) {
      writePreservingEol(ownerPath, raw, result.source);
      changed.push(taskId);
    }
    const semantic = validateProspectiveTaskSemantics({ root, taskId });
    semanticWarnings.push(...semantic.warnings.map((warning) => ({ taskId, ...warning })));
    if (semantic.errors.length > 0) {
      fail(
        `${taskId} incumple task-development-policy.json:\n- `
        + semantic.errors.map(({ code, message }) => `${code}: ${message}`).join('\n- '),
      );
    }
  }

  console.log(
    `[PLAN CANÓNICO] Preparación automática: ${checked.length} tarea(s) revisadas; `
    + `${changed.length} formateadas; ${skipped.length} omitidas de forma segura.`,
  );
  for (const { taskId, reason } of skipped) {
    if (reason === 'EMPTY_DRAFT_NO_AUTO_SCAFFOLD') {
      console.log(`[PLAN CANÓNICO] ${taskId}: borrador vacío preservado; no se inicia automáticamente.`);
    } else if (reason === 'UNAPPROVED_TASK_PRESERVED') {
      console.log(`[PLAN CANONICO] ${taskId}: tarea no aprobada preservada; no se modifica antes de su propio lifecycle.`);
    } else if (reason === 'HISTORICAL_STYLE_PRESERVED') {
      console.log(`[PLAN CANÓNICO] ${taskId}: formato histórico preservado por la frontera prospectiva.`);
    } else if (reason === 'HISTORICAL_APPROVAL_PRESERVED') {
      console.log(`[PLAN CANÓNICO] ${taskId}: aprobación histórica preservada; no se reformatea.`);
    } else {
      console.warn(`[PLAN CANÓNICO] ${taskId}: preparación omitida: ${reason}`);
    }
  }
  const warningReport = writeSemanticWarningsReport(root, semanticWarnings);
  if (semanticWarnings.length > 0) {
    console.warn(
      `[PLAN CANÓNICO] Calidad prospectiva: ${semanticWarnings.length} advertencia(s) en `
      + `${summarizeSemanticWarnings(semanticWarnings)}. Detalle: ${warningReport}.`,
    );
  }

  return { currentPreflight, checked, changed, skipped, semanticWarnings, warningReport };
}

function parseArgs(argv) {
  const args = { checkOnly: false, help: false };
  for (const token of argv) {
    if (token === '--check') args.checkOnly = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else fail(`argumento desconocido: ${token}.`);
  }
  return args;
}

function printUsage() {
  console.log(`Uso:
  node scripts/docs/auto-prepare-canonical-task.mjs
  node scripts/docs/auto-prepare-canonical-task.mjs --check

El build y el watcher invocan este comando automáticamente. No crea scaffolds,
no cambia estados y no inicia la tarea siguiente.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  return autoPrepareCanonicalTask({ checkOnly: args.checkOnly });
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
