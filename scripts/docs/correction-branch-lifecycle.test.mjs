import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
    correctionBranchName,
    correctionRegistrationBranchName,
} from './correction-control.mjs';
import {
    buildAuthorizedCorrectionRecord,
} from './correction-branch-lifecycle.mjs';

test('lifecycle usa ramas separadas para registro y corrección', () => {
    assert.equal(correctionRegistrationBranchName('AUTH-DB-033::CORR-001'), 'correction-register/auth-db-033/corr-001');
    assert.equal(correctionBranchName('AUTH-DB-033::CORR-001'), 'correction/auth-db-033/corr-001');
});

test('lifecycle exige registro PENDING, autorización explícita y cierre VERIFIED', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /PENDING_AUTHORIZATION/u);
    assert.match(source, /authorization APPROVED/u);
    assert.match(source, /IN_PROGRESS/u);
    assert.match(source, /VERIFIED/u);
    assert.match(source, /assertBaselineCurrent/u);
    assert.match(source, /VENTO-TREQ-AFFECTED/u);
    assert.match(source, /waitForPrChecksToComplete/u);
    assert.match(source, /--match-head-commit/u);
    assert.match(source, /VERIFIED_ON_MAIN/u);
    assert.match(source, /BLOCK_RELEASED/u);
});

test('registro inicial no declara falsamente TREQ afectados', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /VENTO-TREQ-AFFECTED: NONE/u);
    assert.match(source, /registra una corrección histórica pendiente sin modificar todavía requisitos TREQ/u);
});

test('finish separa commits por carril para respetar commit-scope existente', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /classifyCommitPath/u);
    assert.match(source, /commitDirtyByLane/u);
    assert.match(source, /docs:commit-scope:check/u);
    assert.match(source, /APPLICATION/u);
    assert.match(source, /CANONICAL_TASK/u);
});

test('cierre conserva identidad exacta del HEAD y del merge commit en main', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /--match-head-commit/u);
    assert.match(source, /mergeCommitInMain/u);
    assert.match(source, /no quedó contenido en main/u);
});

test('lifecycle reconcilia proyecciones derivadas sin ocultar cambios reales', () => {
    const lifecycleSource = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    const controlSource = fs.readFileSync('scripts/docs/correction-control.mjs', 'utf8');

    assert.match(
        controlSource,
        /export const DERIVED_CORRECTION_PROJECTIONS = new Set/u,
    );
    assert.match(lifecycleSource, /reconcileDerivedWorktree/u);
    assert.match(lifecycleSource, /CORRECTION_PREPARE_POST_SYNC/u);
    assert.match(
        lifecycleSource,
        /const allowedPaths = \[recordPath, \.\.\.DERIVED_CORRECTION_PROJECTIONS\]/u,
    );
    assert.match(
        lifecycleSource,
        /detectó cambios locales reales fuera del alcance/u,
    );
});

test('publish de correccion usa commit-scope semantico de correction/*', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /docs:commit-scope:check/u);
    assert.match(source, /--correction-head-ref/u);
    assert.match(source, /origin\/\$\{DEFAULT_BRANCH\}\.\.HEAD/u);
});

test('authorize nativo construye AUTHORIZED sin editar ledger manualmente', () => {
    const record = {
        correction_id: 'DELIV-PKG-015::CORR-099',
        status: 'PENDING_AUTHORIZATION',
        baseline: {
            target_task_sha256: 'a'.repeat(64),
        },
    };
    const result = buildAuthorizedCorrectionRecord(record, {
        scope: {
            target_repositories: ['vento-group-sas/vento-shell'],
            authorized_changes: [
                {
                    repo: 'vento-group-sas/vento-shell',
                    path: 'scripts/docs/example.mjs',
                    change: 'MODIFY',
                },
            ],
            validation_commands: ['node --check scripts/docs/example.mjs'],
            affected_treq_ids: [],
            zero_treq_reason: 'Corrección exclusivamente de tooling sin cambios de requisitos TREQ.',
        },
        approvalStatement: 'APROBADO DELIV-PKG-015::CORR-099',
        approvedBy: 'VENTO_OWNER',
        timezone: 'America/Bogota',
        approvedAt: '2026-09-16T20:00:00.000Z',
    });

    assert.equal(result.status, 'AUTHORIZED');
    assert.equal(result.authorization.decision, 'APPROVED');
    assert.equal(result.authorization.approval_statement, 'APROBADO DELIV-PKG-015::CORR-099');
    assert.equal(result.authorization.source_contract_sha256, 'a'.repeat(64));
    assert.equal(result.zero_treq_reason, 'Corrección exclusivamente de tooling sin cambios de requisitos TREQ.');
});

test('authorize nativo exige aprobación explícita y scope ejecutable', () => {
    const record = {
        correction_id: 'DELIV-PKG-015::CORR-099',
        status: 'PENDING_AUTHORIZATION',
        baseline: {
            target_task_sha256: 'a'.repeat(64),
        },
    };

    assert.throws(
        () => buildAuthorizedCorrectionRecord(record, {
            scope: {
                target_repositories: ['vento-group-sas/vento-shell'],
                authorized_changes: [],
                validation_commands: [],
                affected_treq_ids: [],
                zero_treq_reason: 'Corrección exclusivamente de tooling sin cambios de requisitos TREQ.',
            },
            approvalStatement: '',
            approvedBy: 'VENTO_OWNER',
            timezone: 'America/Bogota',
        }),
        /approval_statement es obligatorio/u,
    );
});

test('start normaliza EOL y termina con candidato limpio y publicado', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /normalizeDirtyTextEol/u);
    assert.match(source, /validateEolPolicy/u);
    assert.match(source, /CORRECTION_START dejó worktree dirty/u);
    assert.match(source, /WORKTREE: 'CLEAN'/u);
    assert.match(source, /REMOTE_BRANCH_SYNC: '0\/0'/u);
});

test('checkpoint nativo valida scope, commitea, publica y exige CLEAN', () => {
    const source = fs.readFileSync('scripts/docs/correction-branch-lifecycle.mjs', 'utf8');
    assert.match(source, /export function checkpointCorrection/u);
    assert.match(source, /assertActiveCorrectionScope/u);
    assert.match(source, /CHECKPOINT_LEFT_DIRTY/u);
    assert.match(source, /OPERACION: 'CORRECTION_CHECKPOINT'/u);
});
