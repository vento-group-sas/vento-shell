import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
    correctionBranchName,
    correctionRegistrationBranchName,
} from './correction-control.mjs';

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
