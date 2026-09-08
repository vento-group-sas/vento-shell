import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import {
  buildCanonicalTreqContext,
  validateTreqRegistrySource,
} from './validate-treq-registry.mjs';
import {
  normalizeApprovedTaskEvidence,
  reconcileTreqRegistrySource,
  updateRegistrySummary,
} from './treq-safe-reconcile.mjs';
import {
  syncPriorityLaneOrderDocument,
} from './sync-priority-delivery-lanes-doc.mjs';
import {
  syncPlanContinuity,
} from './plan-continuity-final-newline.mjs';
import {
  readCanonicalTreqRegistry,
  writeCanonicalTreqRegistry,
} from './treq-registry-files.mjs';
import { autoPrepareCanonicalTask } from './auto-prepare-canonical-task.mjs';
import { assertProspectiveTasks } from './audit-prospective-tasks.mjs';
import { saveRecoveryArtifact } from './plan-recovery-store.mjs';

const root = process.cwd();
const baseDir = path.resolve(root, 'docs/plan-canonico/modular');
const generatedDir = path.join(baseDir, '.generated');
const stateDir = path.join(generatedDir, '.state');
const recoveryDir = path.join(generatedDir, '.recovery');
const snapshotPath = path.join(stateDir, 'last-valid-treq-registry.md');
const snapshotMetadataPath = path.join(stateDir, 'last-valid-treq-registry.json');
const rawBuildScript = path.join(
  root,
  'scripts/docs/build-plan-canonico-core.mjs'
);

function sha256(source) {
  return crypto.createHash('sha256').update(source).digest('hex');
}

function readContext() {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(baseDir, 'manifest.json'), 'utf8')
  );
  return buildCanonicalTreqContext({ baseDir, manifest });
}

function loadValidSnapshot() {
  if (!fs.existsSync(snapshotPath) || !fs.existsSync(snapshotMetadataPath)) {
    return null;
  }

  const source = fs.readFileSync(snapshotPath, 'utf8');
  const metadata = JSON.parse(fs.readFileSync(snapshotMetadataPath, 'utf8'));

  if (metadata.sha256 !== sha256(source)) {
    console.warn(
      '[PLAN CANÓNICO] Snapshot TREQ ignorado: su huella no coincide.'
    );
    return null;
  }

  return { source, metadata };
}

function saveValidSnapshot() {
  const source = readCanonicalTreqRegistry({ baseDir });
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(snapshotPath, source, 'utf8');
  fs.writeFileSync(
    snapshotMetadataPath,
    `${JSON.stringify({
      sha256: sha256(source),
      savedAt: new Date().toISOString(),
    }, null, 2)}\n`,
    'utf8'
  );
}

function saveRecoveryCopy(source, reconciliation) {
  return saveRecoveryArtifact({
    root,
    recoveryDir,
    source,
    reconciliation,
  }).payloadPath;
}

function attemptSafeReconciliation() {
  const currentSource = readCanonicalTreqRegistry({ baseDir });
  const context = readContext();
  const currentValidation = validateTreqRegistrySource(currentSource, context);

  if (currentValidation.errors.length === 0) {
    return null;
  }

  const invalidRowIds = new Set(
    currentValidation.errors
      .map((error) => error.match(/^(TREQ-[A-Z]+-\d{3,}):/)?.[1])
      .filter(Boolean)
  );
  const approvedTaskIds = new Set(
    [...context.tasks.values()]
      .filter((task) => task.state === 'APROBADA')
      .map((task) => task.id)
  );

  let approvalCandidate = normalizeApprovedTaskEvidence({
    source: currentSource,
    rowIds: invalidRowIds,
    approvedTaskIds,
  });
  approvalCandidate = updateRegistrySummary(
    approvalCandidate,
    currentValidation.stats
  );

  if (
    approvalCandidate !== currentSource
    && validateTreqRegistrySource(approvalCandidate, context).errors.length === 0
  ) {
    const approvalSync = {
      changedExistingIds: [],
      preservedChangedExistingIds: [],
      newIds: [],
      normalizedApprovalIds: [...invalidRowIds],
    };
    const recoveryPath = saveRecoveryCopy(currentSource, approvalSync);
    writeCanonicalTreqRegistry({ baseDir, source: approvalCandidate });

    if (invalidRowIds.size > 0) {
      console.log(
        `[PLAN CANÓNICO] Transición de aprobación TREQ sincronizada: `
        + `${invalidRowIds.size} filas actualizadas; resumen vigente corregido.`
      );
    } else {
      console.log(
        `[PLAN CANÓNICO] Resumen TREQ sincronizado automáticamente: `
        + `${currentValidation.stats.requirements} requisitos; `
        + `última tarea ${currentValidation.stats.latestTask}.`
      );
    }
    console.log(
      `[PLAN CANÓNICO] Copia íntegra previa: ${recoveryPath}`
    );

    return { originalSource: currentSource, recoveryPath };
  }

  const snapshot = loadValidSnapshot();
  if (!snapshot) {
    return null;
  }

  const reconciliation = reconcileTreqRegistrySource({
    currentSource,
    baselineSource: snapshot.source,
    restoreIds: invalidRowIds,
  });

  if (
    reconciliation.changedExistingIds.length === 0
    || reconciliation.newIds.length === 0
    || reconciliation.missingBaselineIds.length > 0
  ) {
    return null;
  }

  const evidenceRows = new Set([
    ...invalidRowIds,
    ...reconciliation.newIds,
  ]);
  reconciliation.candidateSource = normalizeApprovedTaskEvidence({
    source: reconciliation.candidateSource,
    rowIds: evidenceRows,
    approvedTaskIds,
  });
  reconciliation.normalizedApprovalIds = [...evidenceRows];
  const candidateStats = validateTreqRegistrySource(
    reconciliation.candidateSource,
    context
  ).stats;
  reconciliation.candidateSource = updateRegistrySummary(
    reconciliation.candidateSource,
    candidateStats
  );

  const candidateValidation = validateTreqRegistrySource(
    reconciliation.candidateSource,
    context
  );
  if (candidateValidation.errors.length > 0) {
    return null;
  }

  const recoveryPath = saveRecoveryCopy(currentSource, reconciliation);
  writeCanonicalTreqRegistry({ baseDir, source: reconciliation.candidateSource });

  console.log(
    `[PLAN CANÓNICO] Reemplazo TREQ desactualizado reconciliado: `
    + `${reconciliation.changedExistingIds.length} filas históricas restauradas; `
    + `${reconciliation.preservedChangedExistingIds.length} cambios históricos válidos preservados; `
    + `${reconciliation.newIds.length} filas nuevas preservadas.`
  );
  console.log(
    `[PLAN CANÓNICO] Copia íntegra del reemplazo entrante: ${recoveryPath}`
  );

  return { originalSource: currentSource, recoveryPath };
}

const prospectiveAudit = assertProspectiveTasks({ root });
console.log(
  `[PLAN CANÓNICO] Auditoría prospectiva: ${prospectiveAudit.stats.formatCovered} tarea(s) aprobada(s) `
  + `con formato y ${prospectiveAudit.stats.semanticCovered} con contrato semántico; `
  + '0 incompatibilidades.',
);

autoPrepareCanonicalTask({
  root,
  checkOnly: process.argv.includes('--check'),
  additionalTaskIds: prospectiveAudit.normalizableTaskIds,
});

let reconciliation = null;

try {
  // Resolve a completed sequence before deriving the TREQ summary. Otherwise a
  // terminal transition can reconcile the summary against the old sequence and
  // make the core build validate it against the newly activated sequence.
  syncPlanContinuity({
    root,
    checkOnly: process.argv.includes('--check'),
  });
  const laneOrderSync = syncPriorityLaneOrderDocument({ root });
  if (laneOrderSync.changed) {
    console.log(
      '[PLAN CANÓNICO] Orden visible del carril prioritario actualizado.',
    );
  }
  reconciliation = attemptSafeReconciliation();
} catch (error) {
  console.warn(
    `[PLAN CANÓNICO] No se pudo ejecutar la reconciliación preventiva: `
    + `${error instanceof Error ? error.message : String(error)}`
  );
}

const result = spawnSync(
  process.execPath,
  [rawBuildScript, ...process.argv.slice(2)],
  {
    cwd: root,
    stdio: 'inherit',
    windowsHide: true,
  }
);

if (result.error) {
  if (reconciliation) {
    writeCanonicalTreqRegistry({ baseDir, source: reconciliation.originalSource });
  }
  throw result.error;
}

if (result.status !== 0) {
  if (reconciliation) {
    writeCanonicalTreqRegistry({ baseDir, source: reconciliation.originalSource });
    console.error(
      '[PLAN CANÓNICO] La compilación falló después de reconciliar; '
      + 'se restauró exactamente el reemplazo entrante.'
    );
  }
  process.exit(result.status ?? 1);
}

if (!process.argv.includes('--check')) {
  saveValidSnapshot();
  console.log('[PLAN CANÓNICO] Snapshot TREQ válido actualizado.');
}
