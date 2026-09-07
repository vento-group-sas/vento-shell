import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import {
    classifyPrChecksProbe,
    isTransientPrChecksFailure,
    parsePorcelainPaths,
    resolveNpmInvocation,
    waitForPrChecksToComplete,
} from './task-branch-lifecycle.mjs';
import {
    DERIVED_CORRECTION_PROJECTIONS,
    assertBaselineCurrent,
    assertCorrectionPaths,
    assertPreMergeCorrectionScope,
    assertPreMergePrIdentity,
    assertRegisteredCorrectionOrigin,
    buildPreMergeIntegration,
    correctionCandidateInstance,
    computeBaselineAtRef,
    correctionBranchName,
    correctionRecord,
    correctionRecordRelativePath,
    correctionRegistrationBranchName,
    loadValidatedCorrectionControl,
    nextCorrectionId,
    normalizeCorrectionId,
    normalizeTaskId,
    validatePreMergeIntegration,
} from './correction-control.mjs';
import { loadImplementationControl } from './implementation-control.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { classifyCommitPath } from './commit-scope.mjs';
import { assertPackagePhysicalDependenciesReady, buildInPackageCandidateEvidence, scanPackageReadiness } from './package-readiness-scanner.mjs';

const DEFAULT_BRANCH = 'main';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const CHECK_REGISTRATION_ATTEMPTS = 60;
const CHECK_REGISTRATION_INTERVAL_MS = 2000;
const MERGE_CONFIRM_ATTEMPTS = 60;
const MERGE_CONFIRM_INTERVAL_MS = 2000;
const GITHUB_TRANSPORT_ATTEMPTS = 20;
const GITHUB_TRANSPORT_INTERVAL_MS = 2000;
const GITHUB_TRANSIENT_MARKER = 'GITHUB_TRANSIENT_UNAVAILABLE';

function fail(message, code = 1) {
    const error = new Error(message);
    error.exitCode = code;
    throw error;
}

function run(command, args, {
    cwd = process.cwd(),
    allowFailure = false,
    inherit = false,
    env = process.env,
} = {}) {
    const result = spawnSync(command, args, {
        cwd,
        encoding: 'utf8',
        windowsHide: true,
        env,
        stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
    });
    if (result.error) {
        if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
        fail(`${command} no disponible: ${result.error.message}`);
    }
    const status = Number.isInteger(result.status) ? result.status : 1;
    const stdout = inherit ? '' : String(result.stdout ?? '').trimEnd();
    const stderr = inherit ? '' : String(result.stderr ?? '').trimEnd();
    if (status !== 0 && !allowFailure) fail(stderr || stdout || `${command} ${args.join(' ')} falló.`, status);
    return { status, stdout, stderr };
}

function git(args, options = {}) {
    return run('git', args, options);
}

function gh(args, options = {}) {
    const {
        transportAttempts = GITHUB_TRANSPORT_ATTEMPTS,
        transportIntervalMs = GITHUB_TRANSPORT_INTERVAL_MS,
        ...runOptions
    } = options;
    const callerAllowsFailure = runOptions.allowFailure === true;
    let last = {
        status: 1,
        stdout: '',
        stderr: GITHUB_TRANSIENT_MARKER,
    };

    for (let attempt = 1; attempt <= transportAttempts; attempt += 1) {
        const result = run('gh', args, {
            ...runOptions,
            allowFailure: true,
        });

        if (result.status === 0) return result;

        if (!isTransientPrChecksFailure(result)) {
            if (callerAllowsFailure) return result;
            fail(
                result.stderr
                || result.stdout
                || `gh ${args.join(' ')} falló.`,
                result.status,
            );
        }

        last = result;

        if (attempt < transportAttempts) {
            sleep(transportIntervalMs);
        }
    }

    if (callerAllowsFailure) {
        return {
            status: last.status || 1,
            stdout: '',
            stderr: GITHUB_TRANSIENT_MARKER,
        };
    }

    fail(
        `GitHub temporalmente no disponible después de ${transportAttempts} intentos.`,
        last.status || 1,
    );
}

function npm(args, options = {}) {
    const invocation = resolveNpmInvocation();
    return run(invocation.command, [...invocation.prefixArgs, ...args], options);
}

function sleep(milliseconds) {
    const delay = Number(milliseconds);
    if (!Number.isFinite(delay) || delay <= 0) return;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
}

function ensureRepositoryRoot() {
    const root = git(['rev-parse', '--show-toplevel']).stdout.trim();
    if (!root) fail('No se pudo resolver la raíz Git.');
    return root;
}

function currentBranch(root) {
    return git(['branch', '--show-current'], { cwd: root }).stdout.trim();
}

function currentHead(root) {
    return git(['rev-parse', 'HEAD'], { cwd: root }).stdout.trim();
}

function worktreePaths(root) {
    return parsePorcelainPaths(
        git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout,
    );
}

function syncCounts(root, left, right) {
    const raw = git(['rev-list', '--left-right', '--count', `${left}...${right}`], { cwd: root }).stdout.trim();
    const [behind, ahead] = raw.split(/\s+/u).map(Number);
    return { behind: Number(behind), ahead: Number(ahead), raw };
}

function ensureGhReady(root) {
    if (gh(['--version'], { cwd: root, allowFailure: true }).status !== 0) fail('GitHub CLI gh no está disponible en PATH.');
    const auth = gh(['auth', 'status'], { cwd: root, allowFailure: true });
    if (auth.status !== 0) fail(auth.stderr || auth.stdout || 'gh no está autenticado.');
}

function localBranchExists(root, branch) {
    return git(['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], { cwd: root, allowFailure: true }).status === 0;
}

function remoteBranchExists(root, branch) {
    return git(['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`], {
        cwd: root,
        allowFailure: true,
    }).status === 0;
}

function printResult(fields) {
    console.log('');
    console.log(RESULT_START);
    for (const [key, value] of Object.entries(fields)) console.log(`${key}: ${value}`);
    console.log(RESULT_END);
}

function ensureMainSynchronized(root) {
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    if (currentBranch(root) !== DEFAULT_BRANCH) git(['switch', DEFAULT_BRANCH], { cwd: root });
    git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
    const sync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (sync.behind !== 0 || sync.ahead !== 0) fail(`main debe quedar sincronizado 0/0: ${sync.raw}.`);
    return true;
}

function reconcileDerivedWorktree(root, expectedPaths, label) {
    const expected = new Set(expectedPaths);
    const actual = worktreePaths(root);

    const unexpected = actual.filter(
        (entry) => !expected.has(entry) && !DERIVED_CORRECTION_PROJECTIONS.has(entry),
    );

    if (unexpected.length > 0) {
        fail(
            `${label} detectó cambios locales reales fuera del alcance: ${unexpected.join(', ')}.`,
        );
    }

    const derived = actual.filter(
        (entry) => DERIVED_CORRECTION_PROJECTIONS.has(entry),
    );

    if (derived.length > 0) {
        git(
            ['restore', '--source=HEAD', '--staged', '--worktree', '--', ...derived],
            { cwd: root },
        );
    }

    const remaining = worktreePaths(root).sort();
    const required = [...expected].sort();

    if (JSON.stringify(remaining) !== JSON.stringify(required)) {
        fail(
            `${label} no pudo reconciliar el worktree; esperados: ${required.join(', ') || 'NINGUNO'}; actuales: ${remaining.join(', ') || 'NINGUNO'}.`,
        );
    }

    return derived;
}

function writeRecord(root, record) {
    const relativePath = correctionRecordRelativePath(record.correction_id);
    const absolutePath = path.join(root, ...relativePath.split('/'));
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, `${JSON.stringify(record, null, 2)}\n`, 'utf8');
    return relativePath;
}

function readRecord(root, correctionId) {
    const relativePath = correctionRecordRelativePath(correctionId);
    const absolutePath = path.join(root, ...relativePath.split('/'));
    if (!fs.existsSync(absolutePath)) fail(`No existe ${relativePath}.`);
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function taskIsApproved(task) {
    return /\*\*Estado:\*\*\s*APROBADA\s*$/imu.test(task.block);
}

function buildPendingRecord({ correctionId, taskId, type, reasonCode, targetInstanceId, blockedTargets, baseline }) {
    const blocking = blockedTargets.length > 0;
    return {
        schema_version: 1,
        correction_id: correctionId,
        task_id: taskId,
        target_instance_id: targetInstanceId,
        correction_type: type,
        reason_code: reasonCode,
        status: 'PENDING_AUTHORIZATION',
        blocking,
        blocked_targets: blockedTargets,
        baseline,
        target_repositories: [],
        authorized_changes: [],
        validation_commands: [],
        affected_treq_ids: [],
        zero_treq_reason: 'Registro inicial de la corrección; todavía no modifica requisitos TREQ.',
        authorization: null,
        evidence: [],
        opened_at: new Date().toISOString(),
    };
}

export function prepareCorrection({
    root = ensureRepositoryRoot(),
    taskId,
    type,
    reasonCode,
    targetInstanceId = null,
    blockedTargets = [],
    implementationPr = null,
} = {}) {
    ensureGhReady(root);
    reconcileDerivedWorktree(root, [], 'CORRECTION_PREPARE');
    ensureMainSynchronized(root);
    reconcileDerivedWorktree(root, [], 'CORRECTION_PREPARE_POST_SYNC');

    let integration = null;
    if (implementationPr !== null) {
        if (String(type).toUpperCase() === 'DOCUMENTARY' || !targetInstanceId) {
            fail('--implementation-pr exige una corrección física y --target-instance-id.');
        }
        const state = readImplementationPr(root, implementationPr);
        assertPreMergePrIdentity(state, { targetInstanceId });
        git(['fetch', 'origin', state.headRefName, '--quiet'], { cwd: root });
        integration = buildPreMergeIntegration({ root, state, targetInstanceId });
    }

    const normalizedTaskId = normalizeTaskId(taskId);
    const normalizedType = String(type ?? '').trim().toUpperCase();
    const normalizedReason = String(reasonCode ?? '').trim().toUpperCase();
    const topology = resolveTaskWorkTopology({ root });
    const task = topology.inventory.get(normalizedTaskId);
    if (!task) fail(`${normalizedTaskId} no existe en el inventario canónico.`);
    if (!taskIsApproved(task)) fail(`${normalizedTaskId} debe estar APROBADA antes de abrir una corrección.`);

    const control = loadValidatedCorrectionControl({ root });
    const correctionId = nextCorrectionId(normalizedTaskId, control);
    if (!control.policy.correction_types.includes(normalizedType)) fail(`Tipo de corrección no permitido: ${normalizedType || 'VACÍO'}.`);
    if (!control.policy.reason_codes.includes(normalizedReason)) fail(`reason_code no permitido: ${normalizedReason || 'VACÍO'}.`);

    let normalizedTargetInstanceId = null;
    if (normalizedType !== 'DOCUMENTARY') {
        normalizedTargetInstanceId = String(targetInstanceId ?? '').trim();
        if (!normalizedTargetInstanceId) fail(`${normalizedType} exige --target-instance-id.`);
        const implementation = loadImplementationControl({ root });
        const instance = implementation.instances.find((entry) => entry.instance_id === normalizedTargetInstanceId) ?? null;
        if (!instance) fail(`No existe target_instance_id ${normalizedTargetInstanceId}.`);
        if (instance.task_id !== normalizedTaskId) fail(`${normalizedTargetInstanceId} pertenece a ${instance.task_id}, no a ${normalizedTaskId}.`);
        if (!integration && instance.status !== 'VERIFIED') fail(`${normalizedTargetInstanceId} debe permanecer VERIFIED; estado ${instance.status}.`);
    }

    const normalizedBlockedTargets = [...new Set(blockedTargets.map((entry) => String(entry).trim()).filter(Boolean))].sort();
    const implementationForBlocks = loadImplementationControl({ root });
    for (const target of normalizedBlockedTargets) {
        if (target.includes('::')) {
            if (!implementationForBlocks.instances.some((entry) => entry.instance_id === target)) {
                fail(`blocked_target físico inexistente: ${target}.`);
            }
        } else if (!topology.inventory.has(target)) {
            fail(`blocked_target documental inexistente: ${target}.`);
        }
    }
    const baseline = computeBaselineAtRef({
        root,
        ref: integration?.head_commit ?? 'HEAD',
        taskId: normalizedTaskId,
        targetInstanceId: normalizedTargetInstanceId,
    });
    if (integration) baseline.main_commit = integration.base_commit;
    const record = buildPendingRecord({
        correctionId,
        taskId: normalizedTaskId,
        type: normalizedType,
        reasonCode: normalizedReason,
        targetInstanceId: normalizedTargetInstanceId,
        blockedTargets: normalizedBlockedTargets,
        baseline,
    });
    if (integration) {
        record.integration = integration;
        validatePreMergeIntegration({ root, record });
    }
    const recordPath = writeRecord(root, record);
    loadValidatedCorrectionControl({ root });

    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_PREPARE',
        CORRECTION_ID: correctionId,
        TASK_ID: normalizedTaskId,
        RECORD: recordPath,
        STATUS: 'PENDING_AUTHORIZATION',
        BLOCKING: record.blocking ? 'SI' : 'NO',
        BLOCKED_TARGETS: record.blocked_targets.join(',') || 'NONE',
        READY_TO_REGISTER: 'SI',
    });
    return record;
}

function waitForPrChecksToRegister(root, prNumber) {
    for (let attempt = 1; attempt <= CHECK_REGISTRATION_ATTEMPTS; attempt += 1) {
        const probe = gh(['pr', 'checks', String(prNumber), '--json', 'name,state,bucket,link'], {
            cwd: root,
            allowFailure: true,
        });
        const classification = classifyPrChecksProbe(probe);
        if (classification.state === 'REGISTERED') return classification.count;
        if (classification.state === 'ERROR') fail(`No se pudieron consultar checks de PR #${prNumber}: ${classification.detail}`, probe.status);
        if (attempt < CHECK_REGISTRATION_ATTEMPTS) sleep(CHECK_REGISTRATION_INTERVAL_MS);
    }
    fail(`PR #${prNumber} no registró checks; cierre detenido antes del merge.`);
}

function parseJsonOutput(source, label) {
    const text = String(source ?? '').trim();
    if (!text) fail(`${label}: salida JSON vacía.`);
    try {
        return JSON.parse(text);
    } catch {
        fail(`${label}: no se pudo interpretar JSON.`);
    }
}

function createOrUpdatePr(root, { branch, title, body }) {
    const existing = parseJsonOutput(
        gh(['pr', 'list', '--head', branch, '--base', DEFAULT_BRANCH, '--state', 'open', '--json', 'number,url,headRefOid', '--limit', '1'], { cwd: root }).stdout || '[]',
        'gh pr list',
    );
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-correction-pr-'));
    const bodyPath = path.join(tempDir, 'body.md');
    fs.writeFileSync(bodyPath, body, 'utf8');
    try {
        if (Array.isArray(existing) && existing.length > 0) {
            const pr = existing[0];
            gh(['pr', 'edit', String(pr.number), '--title', title, '--body-file', bodyPath], { cwd: root });
            return Number(pr.number);
        }
        gh(['pr', 'create', '--base', DEFAULT_BRANCH, '--head', branch, '--title', title, '--body-file', bodyPath], { cwd: root });
        const rows = parseJsonOutput(
            gh(['pr', 'list', '--head', branch, '--base', DEFAULT_BRANCH, '--state', 'open', '--json', 'number,url,headRefOid', '--limit', '1'], { cwd: root }).stdout || '[]',
            'gh pr list post-create',
        );
        if (!Array.isArray(rows) || rows.length !== 1) fail('No se pudo resolver el PR creado.');
        return Number(rows[0].number);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

function readOpenPrState(root, prNumber) {
    return parseJsonOutput(
        gh(['pr', 'view', String(prNumber), '--json', 'number,state,isDraft,mergeable,headRefOid,baseRefName'], { cwd: root }).stdout,
        'gh pr view',
    );
}

function readImplementationPr(root, prNumber) {
    if (!Number.isSafeInteger(Number(prNumber)) || Number(prNumber) <= 0) fail('Número de PR inválido.');
    return parseJsonOutput(gh(['pr', 'view', String(prNumber), '--json',
        'number,state,isDraft,isCrossRepository,headRefName,headRefOid,baseRefName'], { cwd: root }).stdout, 'implementation PR');
}

function assertPendingImplementationPr(root, record) {
    if (!record.integration) return;
    assertPreMergePrIdentity(readImplementationPr(root, record.integration.pull_request), {
        targetInstanceId: record.target_instance_id,
        headCommit: record.integration.head_commit,
    });
}

function ensureOpenPrIdentity(state, prNumber, headSha) {
    if (state.state !== 'OPEN') fail(`PR #${prNumber} no está OPEN; estado ${state.state}.`);
    if (state.isDraft) fail(`PR #${prNumber} sigue en draft.`);
    if (state.baseRefName !== DEFAULT_BRANCH) fail(`PR #${prNumber} no apunta a ${DEFAULT_BRANCH}.`);
    if (state.headRefOid !== headSha) fail(`PR #${prNumber} no apunta al HEAD validado ${headSha}.`);
    if (!['MERGEABLE', 'UNKNOWN'].includes(String(state.mergeable ?? '').toUpperCase())) fail(`PR #${prNumber} no es mergeable: ${state.mergeable}.`);
}

function waitForPrMerged(root, prNumber, headSha) {
    for (let attempt = 1; attempt <= MERGE_CONFIRM_ATTEMPTS; attempt += 1) {
        const state = parseJsonOutput(
            gh(['pr', 'view', String(prNumber), '--json', 'state,mergedAt,mergeCommit,headRefOid'], { cwd: root }).stdout,
            'gh pr view merged',
        );
        if (state.headRefOid !== headSha) fail(`PR #${prNumber} cambió de HEAD durante el merge.`);
        if (state.state === 'MERGED') {
            const mergeCommitSha = String(state.mergeCommit?.oid ?? '').trim();
            if (!state.mergedAt || !mergeCommitSha) fail(`PR #${prNumber} figura MERGED sin evidencia completa.`);
            return { ...state, mergeCommitSha };
        }
        if (state.state === 'CLOSED') fail(`PR #${prNumber} fue cerrado sin merge.`);
        if (attempt < MERGE_CONFIRM_ATTEMPTS) sleep(MERGE_CONFIRM_INTERVAL_MS);
    }
    fail(`PR #${prNumber} no confirmó MERGED.`);
}

function cleanupBranch(root, branch) {
    if (remoteBranchExists(root, branch)) git(['push', 'origin', '--delete', branch], { cwd: root, allowFailure: true });
    if (localBranchExists(root, branch)) git(['branch', '-d', branch], { cwd: root, allowFailure: true });
    return {
        remote: remoteBranchExists(root, branch) ? 'PRESENTE' : 'DELETED',
        local: localBranchExists(root, branch) ? 'PRESENTE' : 'DELETED',
    };
}

function runGovernanceValidation(root) {
    npm(['run', '--silent', 'docs:correction:check'], { cwd: root });
    npm(['run', '--silent', 'docs:chatgpt:starter'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:test'], { cwd: root });
    npm(['run', '--silent', 'docs:treq:check'], { cwd: root });
    npm(['run', '--silent', 'docs:treq:test'], { cwd: root });
    git(['diff', '--check'], { cwd: root });
}

function correctionCommitLane(relativePath) {
    const scope = classifyCommitPath(relativePath);
    if (scope === 'PROJECTION') return 'CANONICAL_TASK';
    if (['CANONICAL_TASK', 'APPLICATION', 'TRANSVERSAL', 'OPERATIONS_DOC'].includes(scope)) return scope;
    fail(`No existe carril de commit para ${relativePath}; clasificación ${scope}.`);
}

function commitDirtyByLane(root, dirtyPaths, commitMessage) {
    const groups = new Map();
    for (const relativePath of dirtyPaths) {
        const lane = correctionCommitLane(relativePath);
        const list = groups.get(lane) ?? [];
        list.push(relativePath);
        groups.set(lane, list);
    }
    const order = ['APPLICATION', 'CANONICAL_TASK', 'TRANSVERSAL', 'OPERATIONS_DOC'];
    let created = 0;
    for (const lane of order) {
        const paths = groups.get(lane) ?? [];
        if (paths.length === 0) continue;
        git(['add', '--', ...paths], { cwd: root });
        git(['diff', '--cached', '--check'], { cwd: root });
        npm(['run', '--silent', 'docs:commit-scope:check', '--', '--staged'], { cwd: root });
        const staged = git(['diff', '--cached', '--name-only', '--diff-filter=ACMRD'], { cwd: root }).stdout.trim();
        if (staged) {
            git(['commit', '-m', `${commitMessage} (${lane.toLowerCase()})`], { cwd: root });
            created += 1;
        }
    }
    if (worktreePaths(root).length > 0) {
        fail(`Quedaron cambios sin commit después de separar carriles: ${worktreePaths(root).join(', ')}.`);
    }
    return created;
}

function publishBranchAndMerge(root, { branch, title, body, allowedPaths, commitMessage, beforeMerge = () => {} }) {
    const dirty = worktreePaths(root);
    if (dirty.length > 0) {
        const invalid = dirty.filter((entry) => !allowedPaths.includes(entry));
        if (invalid.length > 0) fail(`Archivos locales fuera del alcance de publicación: ${invalid.join(', ')}.`);
        commitDirtyByLane(root, dirty, commitMessage);
    }
    const commits = Number(git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root }).stdout.trim());
    if (!Number.isFinite(commits) || commits <= 0) fail(`${branch} no contiene commits nuevos respecto de origin/${DEFAULT_BRANCH}.`);
    npm(['run', '--silent', 'docs:commit-scope:check', '--', '--range', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
    const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
    if (sync.behind !== 0 || sync.ahead !== 0) fail(`Push incompleto de ${branch}: ${sync.raw}.`);
    const headSha = currentHead(root);
    const prNumber = createOrUpdatePr(root, { branch, title, body });
    let state = readOpenPrState(root, prNumber);
    ensureOpenPrIdentity(state, prNumber, headSha);
    const registered = waitForPrChecksToRegister(root, prNumber);
    const completed = waitForPrChecksToComplete(root, prNumber);
    state = readOpenPrState(root, prNumber);
    ensureOpenPrIdentity(state, prNumber, headSha);
    beforeMerge();
    gh(['pr', 'merge', String(prNumber), '--merge', '--match-head-commit', headSha], { cwd: root });
    const merged = waitForPrMerged(root, prNumber, headSha);
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    git(['switch', DEFAULT_BRANCH], { cwd: root });
    git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) fail(`main no quedó sincronizado: ${mainSync.raw}.`);
    const validatedInMain = git(['merge-base', '--is-ancestor', headSha, 'HEAD'], { cwd: root, allowFailure: true });
    if (validatedInMain.status !== 0) fail(`El HEAD validado ${headSha} no quedó contenido en main.`);
    const mergeCommitInMain = git(['merge-base', '--is-ancestor', merged.mergeCommitSha, 'HEAD'], { cwd: root, allowFailure: true });
    if (mergeCommitInMain.status !== 0) fail(`El merge commit ${merged.mergeCommitSha} no quedó contenido en main.`);
    const cleanup = cleanupBranch(root, branch);
    if (cleanup.local !== 'DELETED' || cleanup.remote !== 'DELETED') fail(`No se pudo limpiar completamente ${branch}.`);
    if (worktreePaths(root).length > 0) fail(`main terminó con cambios locales: ${worktreePaths(root).join(', ')}.`);
    return { headSha, prNumber, registered, completed, mergeCommit: merged.mergeCommitSha };
}

export function registerCorrection({ root = ensureRepositoryRoot(), correctionId } = {}) {
    const id = normalizeCorrectionId(correctionId);
    const recordPath = correctionRecordRelativePath(id);
    ensureGhReady(root);
    if (currentBranch(root) !== DEFAULT_BRANCH) fail('CORRECTION_REGISTER debe comenzar desde main.');
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
        fail(`main debe estar sincronizado 0/0 antes de registrar la corrección: ${mainSync.raw}.`);
    }
    reconcileDerivedWorktree(root, [recordPath], 'CORRECTION_REGISTER');
    const record = readRecord(root, id);
    if (record.status !== 'PENDING_AUTHORIZATION') fail(`${id} debe estar PENDING_AUTHORIZATION para register.`);
    assertPendingImplementationPr(root, record);
    const branch = correctionRegistrationBranchName(id);
    git(['switch', '-c', branch], { cwd: root });
    npm(['run', '--silent', 'docs:correction:starter'], { cwd: root });
    runGovernanceValidation(root);
    const allowedPaths = [recordPath, ...DERIVED_CORRECTION_PROJECTIONS];
    const body = [
        'VENTO-TREQ-AFFECTED: NONE',
        `VENTO-TREQ-ZERO-REASON: ${id} registra una corrección histórica pendiente sin modificar todavía requisitos TREQ.`,
        '',
        '## Corrección registrada',
        '',
        id,
        '',
        `Tarea objetivo: ${record.task_id}`,
        `Estado: ${record.status}`,
        `Bloqueante: ${record.blocking ? 'SI' : 'NO'}`,
        '',
    ].join('\n');
    const result = publishBranchAndMerge(root, {
        branch,
        title: `correction(${id}): register`,
        body,
        allowedPaths,
        commitMessage: `correction(${id}): register`,
        beforeMerge: () => assertPendingImplementationPr(root, record),
    });
    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_REGISTER',
        CORRECTION_ID: id,
        PR: result.prNumber,
        REQUIRED_CHECKS: 'PASS',
        MERGE: 'PASS',
        MERGE_COMMIT: result.mergeCommit,
        REGISTERED_ON_MAIN: 'SI',
        CORRECTION_BLOCK_ACTIVE: record.blocking ? 'SI' : 'NO',
    });
    return result;
}

export function startCorrection({ root = ensureRepositoryRoot(), correctionId } = {}) {
    const id = normalizeCorrectionId(correctionId);
    const recordPath = correctionRecordRelativePath(id);
    ensureGhReady(root);
    if (currentBranch(root) !== DEFAULT_BRANCH) fail('CORRECTION_START debe comenzar desde main.');
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
        fail(`main debe estar sincronizado 0/0 antes de iniciar la corrección: ${mainSync.raw}.`);
    }
    reconcileDerivedWorktree(root, [recordPath], 'CORRECTION_START');
    const record = readRecord(root, id);
    if (record.status !== 'AUTHORIZED') fail(`${id} debe estar AUTHORIZED antes de start; estado ${record.status}.`);
    if (!record.authorization || record.authorization.decision !== 'APPROVED') fail(`${id} no conserva authorization APPROVED.`);
    loadValidatedCorrectionControl({ root });
    assertBaselineCurrent({ root, record, ref: `origin/${DEFAULT_BRANCH}` });
    assertPendingImplementationPr(root, record);
    const branch = correctionBranchName(id);
    if (localBranchExists(root, branch) || remoteBranchExists(root, branch)) fail(`${branch} ya existe; reanude esa rama en vez de abrir otra.`);
    if (record.integration) {
        assertRegisteredCorrectionOrigin({ root, record, baseRef: `origin/${DEFAULT_BRANCH}` });
        git(['fetch', 'origin', record.integration.head_ref, '--quiet'], { cwd: root });
        git(['switch', '-c', branch], { cwd: root });
        git(['merge', '--no-ff', '--no-edit', record.integration.head_commit], { cwd: root });
    } else git(['switch', '-c', branch], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
    const next = { ...record, status: 'IN_PROGRESS' };
    writeRecord(root, next);
    npm(['run', '--silent', 'docs:correction:starter'], { cwd: root });
    npm(['run', '--silent', 'docs:correction:check'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
    git(['diff', '--check'], { cwd: root });
    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_START',
        CORRECTION_ID: id,
        TASK_ID: record.task_id,
        BRANCH: branch,
        STATUS: 'IN_PROGRESS',
        BASELINE: 'CURRENT',
        READY_TO_CORRECT: 'SI',
    });
    return next;
}

function prBodyForCorrection(record) {
    const lines = record.affected_treq_ids.length > 0
        ? [`VENTO-TREQ-AFFECTED: ${record.affected_treq_ids.join(',')}`]
        : [
            'VENTO-TREQ-AFFECTED: NONE',
            `VENTO-TREQ-ZERO-REASON: ${record.zero_treq_reason}`,
        ];
    return [
        ...lines,
        '',
        '## Corrección histórica',
        '',
        record.correction_id,
        '',
        `Tarea objetivo: ${record.task_id}`,
        `Tipo: ${record.correction_type}`,
        `Estado final: ${record.status}`,
        ...(record.integration ? [
            `Integra ${record.target_instance_id} desde PR #${record.integration.pull_request} (${record.integration.head_commit}).`,
            `La corrección conserva el ledger original y aporta evidencia nueva: ${record.correction_id}.`,
        ] : []),
        '',
    ].join('\n');
}

export function recordCorrectionCandidate({ root = ensureRepositoryRoot(), correctionId } = {}) {
    const id = normalizeCorrectionId(correctionId);
    const record = readRecord(root, id);
    if (!record.integration || !['IN_PROGRESS', 'IMPLEMENTED'].includes(record.status)
        || currentBranch(root) !== correctionBranchName(id)) {
        fail(`${id}: candidate exige una corrección PRE_MERGE activa en su rama propia.`);
    }
    loadValidatedCorrectionControl({ root });
    assertPendingImplementationPr(root, record);
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    const dirty = worktreePaths(root);
    if (dirty.some((entry) => entry !== correctionRecordRelativePath(id) && !DERIVED_CORRECTION_PROJECTIONS.has(entry))) {
        fail(`${id}: candidate exige materialización física commiteada antes de certificar su SHA.`);
    }
    assertPreMergeCorrectionScope({ root, record, baseRef: 'origin/main', dirtyPaths: dirty });
    npm(['run', '--silent', 'quality:lint:ratchet', '--', '--base', 'origin/main'], { cwd: root });
    const instance = validatePreMergeIntegration({ root, record });
    const packageId = record.target_instance_id.split('::')[1];
    const readiness = scanPackageReadiness({ root, check: true, trigger: 'correction-candidate', supplied: { skipDerivedReports: true } });
    assertPackagePhysicalDependenciesReady({ registry: readiness.registry, packageId, operation: 'CORRECTION_CANDIDATE' });
    const evidence = buildInPackageCandidateEvidence({ root, packageId,
        instance: correctionCandidateInstance(instance, record),
        gate: readiness.contract.physical_dependencies.supabase_pre_e5_foundation.in_package_candidate_gate });
    const next = { ...record, evidence: [
        ...record.evidence.filter((entry) => entry?.evidence_type !== evidence.evidence_type), evidence,
    ] };
    writeRecord(root, next);
    printResult({ ESTADO: 'PASS', OPERACION: 'CORRECTION_CANDIDATE', CORRECTION_ID: id,
        CANDIDATE_HEAD_SHA: evidence.candidate_head_sha, REMOTE_MUTATIONS: 'NO' });
    return next;
}

export function finishCorrection({ root = ensureRepositoryRoot(), correctionId } = {}) {
    const id = normalizeCorrectionId(correctionId);
    const branch = correctionBranchName(id);
    ensureGhReady(root);
    if (currentBranch(root) !== branch) fail(`CORRECTION_FINISH debe ejecutarse desde ${branch}.`);
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    const record = readRecord(root, id);
    if (record.status !== 'VERIFIED') fail(`${id} debe estar VERIFIED antes de finish; estado ${record.status}.`);
    if (!Array.isArray(record.evidence) || record.evidence.length === 0) fail(`${id} no puede cerrarse sin evidence.`);
    loadValidatedCorrectionControl({ root });
    assertBaselineCurrent({ root, record, ref: `origin/${DEFAULT_BRANCH}` });
    assertPendingImplementationPr(root, record);

    if (record.integration && /^SHELL-CI-020::GAP-PKG-\d{3}$/u.test(record.target_instance_id)) {
        const readiness = scanPackageReadiness({ root, check: true,
            trigger: 'correction-finish-prerequisites', supplied: { skipDerivedReports: true } });
        assertPackagePhysicalDependenciesReady({ registry: readiness.registry,
            packageId: record.target_instance_id.split('::')[1], operation: 'CORRECTION_FINISH_PREREQUISITES' });
    }

    const assertScope = (paths) => record.integration
        ? assertPreMergeCorrectionScope({ root, record, baseRef: `origin/${DEFAULT_BRANCH}`, dirtyPaths: worktreePaths(root) })
        : assertCorrectionPaths(paths, record, { root, baseRef: `origin/${DEFAULT_BRANCH}`, registration: false });

    npm(['run', '--silent', 'docs:correction:starter'], { cwd: root });
    const dirtyBeforeStage = worktreePaths(root);
    const branchPaths = git(['diff', '--name-only', '--diff-filter=ACMRD', `origin/${DEFAULT_BRANCH}...HEAD`], { cwd: root }).stdout
        .split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
    const combinedPaths = [...new Set([...branchPaths, ...dirtyBeforeStage])].sort();
    assertScope(combinedPaths);

    npm(['run', '--silent', 'docs:correction:check'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
    npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
    git(['diff', '--check'], { cwd: root });

    const finalDirtyPaths = worktreePaths(root);
    const finalBranchPaths = git(['diff', '--name-only', '--diff-filter=ACMRD', `origin/${DEFAULT_BRANCH}...HEAD`], { cwd: root }).stdout
        .split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
    const finalPaths = [...new Set([...finalBranchPaths, ...finalDirtyPaths])].sort();
    assertScope(finalPaths);
    npm(['run', '--silent', 'quality:lint:ratchet', '--', '--base', `origin/${DEFAULT_BRANCH}`], { cwd: root });

    const result = publishBranchAndMerge(root, {
        branch,
        title: `correction(${id}): verified correction`,
        body: prBodyForCorrection(record),
        allowedPaths: finalPaths,
        commitMessage: `correction(${id}): verified correction`,
        beforeMerge: () => {
            assertPendingImplementationPr(root, record);
            if (record.integration) {
                git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
                assertPreMergeCorrectionScope({ root, record, baseRef: `origin/${DEFAULT_BRANCH}` });
            }
        },
    });
    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_FINISH',
        CORRECTION_ID: id,
        PR: result.prNumber,
        REQUIRED_CHECKS: 'PASS',
        MERGE: 'PASS',
        MERGE_COMMIT: result.mergeCommit,
        VERIFIED_ON_MAIN: 'SI',
        BLOCK_RELEASED: record.blocking ? 'SI' : 'NO_APLICA',
        READY_TO_RESUME_BLOCKED_WORK: 'SI',
        ...(record.integration ? { SUPERSEDED_IMPLEMENTATION_PR: record.integration.pull_request } : {}),
    });
    return result;
}

export function correctionStatus({ root = ensureRepositoryRoot(), correctionId = null } = {}) {
    const control = loadValidatedCorrectionControl({ root });
    if (correctionId) {
        const entry = correctionRecord(control, correctionId);
        if (!entry) fail(`${correctionId} no existe.`);
        console.log(JSON.stringify(entry.record, null, 2));
        return entry.record;
    }
    const rows = control.records.map((entry) => entry.record);
    console.log(JSON.stringify(rows, null, 2));
    return rows;
}

function parseArgs(argv) {
    const args = {
        mode: null,
        taskId: null,
        type: null,
        reasonCode: null,
        targetInstanceId: null,
        blockedTargets: [],
        correctionId: null,
        implementationPr: null,
    };
    const tokens = [...argv];
    args.mode = tokens.shift() ?? null;
    for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index];
        const value = tokens[index + 1];
        if (token === '--task-id') {
            if (!value) fail('falta valor de --task-id.');
            args.taskId = value;
            index += 1;
        } else if (token === '--type') {
            if (!value) fail('falta valor de --type.');
            args.type = value;
            index += 1;
        } else if (token === '--reason-code') {
            if (!value) fail('falta valor de --reason-code.');
            args.reasonCode = value;
            index += 1;
        } else if (token === '--target-instance-id') {
            if (!value) fail('falta valor de --target-instance-id.');
            args.targetInstanceId = value;
            index += 1;
        } else if (token === '--block-target') {
            if (!value) fail('falta valor de --block-target.');
            args.blockedTargets.push(value);
            index += 1;
        } else if (token === '--implementation-pr') {
            if (!/^[1-9][0-9]*$/u.test(value ?? '')) fail('--implementation-pr exige un número de PR positivo.');
            args.implementationPr = Number(value);
            index += 1;
        } else if (token === '--correction-id') {
            if (!value) fail('falta valor de --correction-id.');
            args.correctionId = value;
            index += 1;
        } else fail(`argumento desconocido: ${token}.`);
    }
    return args;
}

export function main(argv = process.argv.slice(2)) {
    const args = parseArgs(argv);
    if (args.mode === 'prepare') {
        if (!args.taskId || !args.type || !args.reasonCode) fail('prepare exige --task-id, --type y --reason-code.');
        return prepareCorrection({
            taskId: args.taskId,
            type: args.type,
            reasonCode: args.reasonCode,
            targetInstanceId: args.targetInstanceId,
            blockedTargets: args.blockedTargets,
            implementationPr: args.implementationPr,
        });
    }
    if (args.mode === 'register') {
        if (!args.correctionId) fail('register exige --correction-id.');
        return registerCorrection({ correctionId: args.correctionId });
    }
    if (args.mode === 'start') {
        if (!args.correctionId) fail('start exige --correction-id.');
        return startCorrection({ correctionId: args.correctionId });
    }
    if (args.mode === 'finish') {
        if (!args.correctionId) fail('finish exige --correction-id.');
        return finishCorrection({ correctionId: args.correctionId });
    }
    if (args.mode === 'candidate') {
        if (!args.correctionId) fail('candidate exige --correction-id.');
        return recordCorrectionCandidate({ correctionId: args.correctionId });
    }
    if (args.mode === 'status') return correctionStatus({ correctionId: args.correctionId });
    fail(`modo desconocido: ${args.mode || 'VACÍO'}.`);
}

const isCli = process.argv[1]
    && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
    try {
        main();
    } catch (error) {
        printResult({
            ESTADO: 'FAIL',
            OPERACION: `CORRECTION_${String(process.argv[2] ?? 'UNKNOWN').toUpperCase()}`,
            COMPROBACION_FALLIDA: (error instanceof Error ? error.message : String(error)).replace(/[\r\n]+/gu, ' | '),
            EXIT_CODE_REPORTADO: Number.isInteger(error?.exitCode) ? error.exitCode : 1,
        });
        process.exit(Number.isInteger(error?.exitCode) ? error.exitCode : 1);
    }
}
