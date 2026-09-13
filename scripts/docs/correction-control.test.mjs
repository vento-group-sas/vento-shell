import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
    CORRECTION_POLICY_RELATIVE_PATH,
    CORRECTION_STARTER_PROJECTION,
    assertCorrectionPaths,
    blockingCorrectionsForTarget,
    checkCorrectionScope,
    computeBaselineAtRef,
    correctionBranchName,
    correctionIdFromHeadRef,
    correctionRecordRelativePath,
    correctionRegistrationBranchName,
    correctionStatusAllowsEmptyExecutionDeclarations,
    loadValidatedCorrectionControl,
    nextCorrectionId,
    normalizeCorrectionId,
    openCorrections,
} from './correction-control.mjs';

test('correction-control oficial es válido', () => {
    const control = loadValidatedCorrectionControl();
    assert.equal(CORRECTION_POLICY_RELATIVE_PATH, 'scripts/docs/correction-control.json');
    assert.equal(control.policy.policy_id, 'VENTO_CANONICAL_CORRECTION_LIFECYCLE_V1');
    assert.equal(control.policy.contract_sha256, '76fabbbd2ba54dac503848b801430a96e268ad4eadae45778744eb3150c765d8');
    assert.equal(control.policy.history_mode, 'APPEND_ONLY_LEDGER');
    assert.equal(control.policy.verified_corrections_immutable, true);
    assert.equal(control.policy.max_open_corrections_per_task, 1);
    assert.equal(control.policy.semantic_change_forbidden, true);
    assert.equal(control.policy.block_release, 'VERIFIED_ON_MAIN');
    assert.equal(control.policy.required_remote_gate, 'VENTO Required Gate');
});

test('identidad, archivo y ramas de corrección son deterministas', () => {
    const id = normalizeCorrectionId('auth-db-033::corr-001');
    assert.equal(id, 'AUTH-DB-033::CORR-001');
    assert.equal(correctionRecordRelativePath(id), 'docs/plan-canonico/modular/correction-instances/AUTH-DB-033__CORR-001.json');
    assert.equal(correctionBranchName(id), 'correction/auth-db-033/corr-001');
    assert.equal(correctionRegistrationBranchName(id), 'correction-register/auth-db-033/corr-001');
    assert.equal(correctionIdFromHeadRef('correction/auth-db-033/corr-001'), id);
    assert.equal(correctionIdFromHeadRef('correction-register/auth-db-033/corr-001'), id);
});

test('nextCorrectionId es monotónico por tarea', () => {
    const control = {
        records: [
            { record: { correction_id: 'AUTH-DB-033::CORR-001', task_id: 'AUTH-DB-033' } },
            { record: { correction_id: 'AUTH-DB-033::CORR-002', task_id: 'AUTH-DB-033' } },
            { record: { correction_id: 'AUTH-DB-034::CORR-001', task_id: 'AUTH-DB-034' } },
        ]
    };
    assert.equal(nextCorrectionId('AUTH-DB-033', control), 'AUTH-DB-033::CORR-003');
});

test('una corrección bloqueante solo bloquea targets explícitos', () => {
    const control = {
        records: [{
            record: {
                correction_id: 'AUTH-DB-033::CORR-001',
                status: 'PENDING_AUTHORIZATION',
                blocking: true,
                blocked_targets: ['AUTH-DB-035::GLOBAL'],
            }
        }]
    };
    assert.equal(blockingCorrectionsForTarget(control, 'AUTH-DB-035::GLOBAL').length, 1);
    assert.equal(blockingCorrectionsForTarget(control, 'AUTH-DB-034::GLOBAL').length, 0);
});

test('scope de corrección es deny-by-default', () => {
    const record = {
        correction_id: 'AUTH-DB-033::CORR-001',
        authorized_changes: [
            { repo: 'vento-group-sas/vento-shell', path: 'src/example.ts', change: 'MODIFY' },
        ],
    };
    const accepted = assertCorrectionPaths([
        correctionRecordRelativePath(record.correction_id),
        CORRECTION_STARTER_PROJECTION,
        'src/example.ts',
    ], record, { root: process.cwd(), baseRef: 'HEAD', registration: false });
    assert.equal(accepted.length, 3);
    assert.throws(
        () => assertCorrectionPaths(['src/not-authorized.ts'], record, { root: process.cwd(), baseRef: 'HEAD' }),
        /fuera de authorized_changes/u,
    );
    assert.throws(
        () => assertCorrectionPaths(['docs/plan-canonico/modular/implementation-instances/AUTH-DB-033__GLOBAL.json'], record, { root: process.cwd(), baseRef: 'HEAD' }),
        /implementation-instances históricos/u,
    );
});

test('baseline documental soporta archivo propietario mayor al buffer por defecto', () => {
    const baseline = computeBaselineAtRef({
        root: process.cwd(),
        ref: 'HEAD',
        taskId: 'DELIV-PKG-015',
    });

    assert.equal(
        baseline.target_task_path,
        'docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/02_PAQUETES_DE_IMPLEMENTACION.md',
    );
    assert.match(baseline.target_task_sha256, /^[0-9a-f]{64}$/u);
    assert.equal(baseline.target_instance_record_path, null);
    assert.equal(baseline.target_instance_record_sha256, null);
});

test('tooling declara inmutabilidad de migraciones Supabase históricas', () => {
    const source = fs.readFileSync('scripts/docs/correction-control.mjs', 'utf8');
    assert.match(source, /IMMUTABLE_HISTORICAL_MIGRATION/u);
    assert.match(source, /supabase\/migrations\//u);
    assert.match(source, /Una corrección no puede editar migraciones Supabase históricas/u);
});

test('VENTO Required Gate ejecuta remotamente el scope de una rama CORR cuando aplica', () => {
    const headRef = String(process.env.GITHUB_HEAD_REF ?? '').trim();
    if (!headRef.startsWith('correction/') && !headRef.startsWith('correction-register/')) {
        assert.ok(true);
        return;
    }
    const eventPath = String(process.env.GITHUB_EVENT_PATH ?? '').trim();
    assert.ok(eventPath, 'GITHUB_EVENT_PATH es obligatorio en PR de corrección.');
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    const baseSha = String(event.pull_request?.base?.sha ?? '').trim();
    const headSha = String(event.pull_request?.head?.sha ?? '').trim();
    assert.match(baseSha, /^[0-9a-f]{40}$/u);
    assert.match(headSha, /^[0-9a-f]{40}$/u);
    const result = checkCorrectionScope({
        root: process.cwd(),
        range: `${baseSha}..${headSha}`,
        headRef,
    });
    assert.ok(result.paths.length > 0);
});

test('package registry persistente es proyección derivada de corrección', () => {
    const record = {
        correction_id: 'AUTH-DB-033::CORR-001',
        authorized_changes: [],
    };
    const classified = assertCorrectionPaths(
        ['scripts/docs/package-readiness/implementation-package-registry.json'],
        record,
        { root: process.cwd(), baseRef: 'HEAD', registration: false },
    );
    assert.equal(classified.length, 1);
    assert.equal(classified[0].kind, 'DERIVED_PROJECTION');
});


test('CANCELLED es terminal y no cuenta como corrección abierta', () => {
    const control = {
        records: [{
            record: {
                correction_id: 'DELIV-PKG-014::CORR-001',
                status: 'CANCELLED',
            },
        }],
    };
    assert.equal(openCorrections(control).length, 0);
});

test('tooling de cancelación preserva ledger y exige PENDING no bloqueante', () => {
    const source = fs.readFileSync('scripts/docs/correction-cancel.mjs', 'utf8');
    assert.match(source, /PENDING_AUTHORIZATION/u);
    assert.match(source, /blocking !== false/u);
    assert.match(source, /authorized_changes/u);
    assert.match(source, /status: 'CANCELLED'/u);
    assert.match(source, /append-only/u);
});


test('correction-cancel CLI ejecuta --help de forma portable', () => {
    const result = spawnSync(
        process.execPath,
        ['scripts/docs/correction-cancel.mjs', '--help'],
        {
            cwd: process.cwd(),
            encoding: 'utf8',
            windowsHide: true,
            stdio: ['ignore', 'pipe', 'pipe'],
        },
    );

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /Uso: npm run docs:correction:cancel/u);

    const source = fs.readFileSync('scripts/docs/correction-cancel.mjs', 'utf8');
    assert.match(source, /fileURLToPath\(import\.meta\.url\)/u);
    assert.doesNotMatch(
        source,
        /new URL\(import\.meta\.url\)\.pathname/u,
        'la detección CLI no debe usar pathname URL crudo en Windows',
    );
});


test('PENDING_AUTHORIZATION y CANCELLED permiten declaraciones operativas vacías', () => {
    assert.equal(correctionStatusAllowsEmptyExecutionDeclarations('PENDING_AUTHORIZATION'), true);
    assert.equal(correctionStatusAllowsEmptyExecutionDeclarations('CANCELLED'), true);
    assert.equal(correctionStatusAllowsEmptyExecutionDeclarations('AUTHORIZED'), false);
    assert.equal(correctionStatusAllowsEmptyExecutionDeclarations('IN_PROGRESS'), false);
    assert.equal(correctionStatusAllowsEmptyExecutionDeclarations('VERIFIED'), false);

    const source = fs.readFileSync('scripts/docs/correction-control.mjs', 'utf8');
    assert.doesNotMatch(
        source,
        /record\.status !== 'PENDING_AUTHORIZATION' && record\.target_repositories\.length === 0/u,
    );
    assert.doesNotMatch(
        source,
        /record\.status !== 'PENDING_AUTHORIZATION' && record\.validation_commands\.length === 0/u,
    );
});
