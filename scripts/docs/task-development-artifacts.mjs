import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { analyzeCommitScope } from './commit-scope.mjs';
import { parseTaskBlocks } from './format-canonical-task.mjs';
import {
  extractValidationEvidence,
  metadataFromTaskBlock,
  readCanonicalTaskInventory,
  taskSectionTitles,
  validateProspectiveTaskSemantics,
} from './task-semantic-contract.mjs';

const TASK_REFERENCE = /\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}(?!\d)\b/gu;
const TREQ_REFERENCE = /\bTREQ-[A-Z]+-\d{3,}\b/gu;

function sha256(source) {
  return crypto.createHash('sha256').update(source).digest('hex');
}

function setDifference(left, right) {
  const rightSet = new Set(right);
  return [...new Set(left)].filter((value) => !rightSet.has(value)).sort();
}

function contentLines(block) {
  return block
    .replace(/\r\n?/gu, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^#{3,4}\s/u.test(line))
    .filter((line) => !/^\*\*[^*]+:\*\*/u.test(line))
    .filter((line) => line !== '---' && !line.startsWith('```'));
}

function multisetDelta(left, right) {
  const counts = new Map();
  for (const value of right) counts.set(value, (counts.get(value) ?? 0) + 1);
  let removed = 0;
  for (const value of left) {
    const count = counts.get(value) ?? 0;
    if (count > 0) counts.set(value, count - 1);
    else removed += 1;
  }
  return removed;
}

function taskMarker(block) {
  return parseTaskBlocks(block)[0]?.marker ?? null;
}

export function analyzeTaskSemanticDiff(baselineBlock, currentBlock) {
  const baselineMetadata = metadataFromTaskBlock(baselineBlock);
  const currentMetadata = metadataFromTaskBlock(currentBlock);
  const metadataKeys = [...new Set([...baselineMetadata.keys(), ...currentMetadata.keys()])].sort();
  const metadataChanges = metadataKeys
    .filter((key) => baselineMetadata.get(key) !== currentMetadata.get(key))
    .map((key) => ({ field: key, before: baselineMetadata.get(key) ?? null, after: currentMetadata.get(key) ?? null }));
  const baselineSections = taskSectionTitles(baselineBlock);
  const currentSections = taskSectionTitles(currentBlock);
  const baselineRefs = baselineBlock.match(TASK_REFERENCE) ?? [];
  const currentRefs = currentBlock.match(TASK_REFERENCE) ?? [];
  const baselineTreq = baselineBlock.match(TREQ_REFERENCE) ?? [];
  const currentTreq = currentBlock.match(TREQ_REFERENCE) ?? [];
  const baselineContent = contentLines(baselineBlock);
  const currentContent = contentLines(currentBlock);
  const markerBefore = taskMarker(baselineBlock);
  const markerAfter = taskMarker(currentBlock);
  const changed = baselineBlock.replace(/\r\n?/gu, '\n') !== currentBlock.replace(/\r\n?/gu, '\n');
  const formattingOnly = changed
    && baselineContent.join(' ').replace(/[`*_]/gu, '').replace(/\s+/gu, ' ')
      === currentContent.join(' ').replace(/[`*_]/gu, '').replace(/\s+/gu, ' ')
    && metadataChanges.length === 0
    && markerBefore === markerAfter;
  return {
    changed,
    classification: !changed ? 'NO_CHANGES' : formattingOnly ? 'FORMAT_ONLY' : 'SEMANTIC',
    baseline_sha256: sha256(baselineBlock),
    current_sha256: sha256(currentBlock),
    marker: { before: markerBefore, after: markerAfter, changed: markerBefore !== markerAfter },
    metadata_changes: metadataChanges,
    sections_added: setDifference(currentSections, baselineSections),
    sections_removed: setDifference(baselineSections, currentSections),
    task_references_added: setDifference(currentRefs, baselineRefs),
    task_references_removed: setDifference(baselineRefs, currentRefs),
    treq_added: setDifference(currentTreq, baselineTreq),
    treq_removed: setDifference(baselineTreq, currentTreq),
    prose_lines_added: multisetDelta(currentContent, baselineContent),
    prose_lines_removed: multisetDelta(baselineContent, currentContent),
  };
}

function renderList(values) {
  return values.length > 0 ? values.map((value) => `- ${value}`).join('\n') : '- Ninguno.';
}

export function renderSemanticDiff(taskId, diff) {
  const metadata = diff.metadata_changes.length > 0
    ? diff.metadata_changes.map(({ field, before, after }) => `- **${field}:** ${before ?? '—'} → ${after ?? '—'}`).join('\n')
    : '- Ninguno.';
  return `# Diff semántico local — ${taskId}

> Comparación contra la primera baseline local observada para esta tarea. No cambia el plan ni aprueba contenido.

- **Clasificación:** ${diff.classification}
- **Marcador:** ${diff.marker.before ?? '—'} → ${diff.marker.after ?? '—'}
- **Líneas sustantivas añadidas:** ${diff.prose_lines_added}
- **Líneas sustantivas retiradas:** ${diff.prose_lines_removed}
- **Baseline SHA-256:** \`${diff.baseline_sha256}\`
- **Actual SHA-256:** \`${diff.current_sha256}\`

## Metadata modificada

${metadata}

## Secciones añadidas

${renderList(diff.sections_added)}

## Secciones retiradas

${renderList(diff.sections_removed)}

## Referencias de tarea añadidas

${renderList(diff.task_references_added)}

## Referencias de tarea retiradas

${renderList(diff.task_references_removed)}

## TREQ añadidos

${renderList(diff.treq_added)}

## TREQ retirados

${renderList(diff.treq_removed)}
`;
}

function sectionBullets(block, titlePattern, limit = 20) {
  const normalized = block.replace(/\r\n?/gu, '\n');
  const heading = new RegExp(`^####(?:\\s+\\d+\\.)?\\s+.*${titlePattern}.*$`, 'imu');
  const match = heading.exec(normalized);
  if (!match) return [];
  const start = (match.index ?? 0) + match[0].length;
  const rest = normalized.slice(start);
  const end = rest.search(/^####(?:\s+\d+\.)?\s+/mu);
  const source = end >= 0 ? rest.slice(0, end) : rest;
  return source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^(?:[-*]|\d+\.)\s+/u.test(line))
    .slice(0, limit);
}

function worktreePaths() {
  const run = (args) => {
    const result = spawnSync('git', args, { encoding: 'utf8', windowsHide: true });
    if (result.status !== 0) return [];
    return result.stdout.split(/\r?\n/u).filter(Boolean);
  };
  return [...new Set([
    ...run(['diff', '--name-only', '--diff-filter=ACMRD', 'HEAD']),
    ...run(['ls-files', '--others', '--exclude-standard']),
  ])];
}

function defaultEvidence(taskId, title) {
  return {
    schema_version: 1,
    task_id: taskId,
    task_title: title,
    updated_at: new Date().toISOString(),
    records: ['BUILD', 'LOCAL', 'REMOTA', 'OPERATIVA', 'FÍSICA'].map((classification) => ({
      classification,
      status: 'NOT_EXECUTED',
      evidence: 'Sin evidencia registrada en este entorno.',
      command: null,
      observed_at: null,
    })),
  };
}

function updateLocalEvidence(evidencePath, preflight, buildSucceeded) {
  let evidence = defaultEvidence(preflight.task.id, preflight.task.title);
  if (fs.existsSync(evidencePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
      if (existing.task_id === preflight.task.id && Array.isArray(existing.records)) evidence = existing;
    } catch {
      // Reemplaza únicamente un artefacto local ilegible; nunca una fuente canónica.
    }
  }
  evidence.task_title = preflight.task.title;
  evidence.updated_at = new Date().toISOString();
  if (buildSucceeded) {
    const build = evidence.records.find(({ classification }) => classification === 'BUILD');
    Object.assign(build, {
      status: 'PASS',
      evidence: 'docs:plan:build completado en vento-shell.',
      command: 'npm run docs:plan:build',
      observed_at: evidence.updated_at,
    });
  }
  fs.mkdirSync(path.dirname(evidencePath), { recursive: true });
  fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  return evidence;
}

function renderEvidenceRows(records) {
  return records.map((record) => (
    `| ${record.classification} | ${record.status} | ${record.evidence} | ${record.command ?? '—'} |`
  )).join('\n');
}

function renderFindings(findings) {
  return findings.length > 0
    ? findings.map(({ severity, code, message }) => `| ${severity} | ${code} | ${message} |`).join('\n')
    : '| OK | NONE | Sin hallazgos. |';
}

function repositoryMentions(block) {
  return [...new Set(block.match(/\bvento-(?:anima|fogo|group-web|nexo|numera|origo|pass|pulso|shell|talento|viso|vital)\b/giu) ?? [])]
    .map((value) => value.toLowerCase())
    .sort();
}

function renderBrief({ semantic, current, previous, evidence, scope, lineNumber }) {
  const findings = [...semantic.errors, ...semantic.warnings];
  const references = [...new Set(current.block.match(TASK_REFERENCE) ?? [])]
    .filter((taskId) => taskId !== current.id)
    .sort();
  const inherited = previous
    ? sectionBullets(previous.block, 'Decisiones (?:vinculantes|consolidadas)', 12)
    : [];
  const restrictions = sectionBullets(current.block, 'Límites', 20);
  const canonicalEvidence = extractValidationEvidence(current.block);
  return `# Brief automático de la tarea actual

> Artefacto local de solo lectura. No inicia, modifica ni aprueba la tarea.

## Identidad

- **Tarea:** ${semantic.preflight.task.id} — ${semantic.preflight.task.title}
- **Estado:** ${semantic.preflight.task.state}
- **Estructura:** ${semantic.preflight.task.structure}
- **Archivo propietario:** \`docs/plan-canonico/modular/${current.relativePath}\`
- **Línea aproximada:** ${lineNumber}
- **Última aprobada:** ${semantic.preflight.continuity.previous}
- **Siguiente reservada:** ${semantic.preflight.continuity.next}
- **Ruta:** ${semantic.preflight.continuity.route}

## Gate semántico

| Severidad | Código | Detalle |
| --- | --- | --- |
${renderFindings(findings)}

## Decisiones heredadas detectadas

${renderList(inherited)}

## Límites explícitos detectados

${renderList(restrictions)}

## Repositorios mencionados

${renderList(repositoryMentions(current.block))}

## Referencias canónicas detectadas

${renderList(references)}

## Evidencia local observada

| Clase | Estado | Evidencia | Comando |
| --- | --- | --- | --- |
${renderEvidenceRows(evidence.records)}

## Evidencia declarada dentro de la tarea

${canonicalEvidence.length > 0
    ? canonicalEvidence.map((row) => `- ${row.class}: ${row.status} — ${row.evidence}`).join('\n')
    : '- Ninguna todavía.'}

## Aislamiento del trabajo concurrente

${scope.errors.length > 0 ? renderList(scope.errors) : '- Sin mezclas prohibidas detectadas.'}
${scope.warnings.length > 0 ? `\n${renderList(scope.warnings)}` : ''}

## Validadores proporcionales

${renderList(semantic.preflight.validators.map((validator) => `\`${validator}\``))}
`;
}

export function writeCurrentTaskDevelopmentArtifacts({
  root = process.cwd(),
  buildSucceeded = false,
  taskId = null,
} = {}) {
  const semantic = validateProspectiveTaskSemantics({ root, taskId });
  if (semantic.skipped) return { skipped: true };
  const inventory = readCanonicalTaskInventory(root);
  const current = inventory.get(semantic.preflight.task.id);
  const previousId = current?.block.match(/^\*\*Tarea anterior:\*\*\s+`?([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3})/mu)?.[1];
  const previous = inventory.get(previousId ?? semantic.preflight.continuity.previous);
  if (!current) throw new Error(`no se pudo aislar ${semantic.preflight.task.id} para el brief.`);
  const deliveryDir = path.join(root, '.delivery');
  const baselineDir = path.join(deliveryDir, 'task-baselines');
  const diffDir = path.join(deliveryDir, 'task-diffs');
  const evidenceDir = path.join(deliveryDir, 'task-evidence');
  fs.mkdirSync(baselineDir, { recursive: true });
  fs.mkdirSync(diffDir, { recursive: true });
  const baselinePath = path.join(baselineDir, `${current.id}.md`);
  if (!fs.existsSync(baselinePath)) fs.writeFileSync(baselinePath, `${current.block.replace(/\n+$/u, '')}\n`, 'utf8');
  const baseline = fs.readFileSync(baselinePath, 'utf8').replace(/\n+$/u, '');
  const diff = analyzeTaskSemanticDiff(baseline, current.block.replace(/\n+$/u, ''));
  const renderedDiff = renderSemanticDiff(current.id, diff);
  fs.writeFileSync(path.join(diffDir, `${current.id}.md`), renderedDiff, 'utf8');
  fs.writeFileSync(path.join(deliveryDir, 'current-task-semantic-diff.md'), renderedDiff, 'utf8');
  const evidence = updateLocalEvidence(
    path.join(evidenceDir, `${current.id}.json`),
    semantic.preflight,
    buildSucceeded,
  );
  const lineNumber = current.index + 1;
  const scope = analyzeCommitScope(worktreePaths());
  const brief = renderBrief({ semantic, current, previous, evidence, scope, lineNumber });
  fs.writeFileSync(path.join(deliveryDir, 'current-task-brief.md'), brief, 'utf8');
  return { skipped: false, semantic, diff, evidence, scope, brief };
}

function main() {
  const result = writeCurrentTaskDevelopmentArtifacts();
  if (result.skipped) console.log('OK: tarea actual fuera de la frontera de artefactos prospectivos.');
  else console.log(
    `OK: brief y diff local de ${result.semantic.preflight.task.id}; ${result.diff.classification}.`,
  );
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
