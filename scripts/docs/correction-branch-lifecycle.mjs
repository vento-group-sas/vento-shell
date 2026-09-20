import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { observeLifecycleCommand } from './lifecycle-command-observer.mjs';
import {
    CorrectionValidationSession,
    correctionInputFingerprint,
    validateCorrectionCheckpoint,
} from './correction-validation-session.mjs';

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
import {
    isTextRepairCandidate,
    normalizeUtf8Text,
} from './repair-working-copy.mjs';
import { validateEolPolicy } from './validate-eol-policy.mjs';
import {
    assertPackagePhysicalDependenciesReady,
    buildInPackageCandidateEvidence,
    scanPackageReadiness,
} from './package-readiness-scanner.mjs';
import {
    buildCorrectionRepositoryPlan,
    checkpointExternalCorrectionBundle,
    correctionRepositoryPublishEvidence,
    ensureExternalCorrectionBranches,
    publishExternalCorrectionBundle,
    validatePublishedCorrectionBundleEvidence,
} from './correction-repository-bundle.mjs';

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
const validationSession = new CorrectionValidationSession();

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
        maxBuffer: 64 * 1024 * 1024,
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
    const result = observeLifecycleCommand({
        root: options.cwd ?? process.cwd(),
        label: `npm ${args.join(' ')}`,
        execute: () => run(invocation.command, [...invocation.prefixArgs, ...args], { ...options, allowFailure: true }),
    });
    if (result.status !== 0 && !options.allowFailure) fail(result.stderr || result.stdout, result.status);
    return result;
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

function readJsonObject(filePath, label) {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) fail(`${label} no existe: ${absolutePath}.`);
    let parsed = null;
    try {
        parsed = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    } catch {
        fail(`${label} no contiene JSON válido.`);
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        fail(`${label} debe contener un objeto JSON.`);
    }
    return parsed;
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

function normalizeScopeArray(value, label) {
    if (!Array.isArray(value)) fail(`${label} debe ser array.`);
    return value;
}

export function buildAuthorizedCorrectionRecord(record, {
    scope,
    approvalStatement,
    approvedBy,
    timezone,
    approvedAt = new Date().toISOString(),
} = {}) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) fail('AUTHORIZATION_RECORD_INVALID');
    if (record.status !== 'PENDING_AUTHORIZATION') {
        fail(`${record.correction_id}: authorize exige PENDING_AUTHORIZATION; estado ${record.status}.`);
    }
    if (!scope || typeof scope !== 'object' || Array.isArray(scope)) fail('AUTHORIZATION_SCOPE_INVALID');

    const targetRepositories = normalizeScopeArray(scope.target_repositories, 'scope.target_repositories');
    const authorizedChanges = normalizeScopeArray(scope.authorized_changes, 'scope.authorized_changes');
    const validationCommands = normalizeScopeArray(scope.validation_commands, 'scope.validation_commands');
    const affectedTreqIds = normalizeScopeArray(scope.affected_treq_ids ?? [], 'scope.affected_treq_ids');
    const normalizedApprovalStatement = String(approvalStatement ?? '').trim();
    const normalizedApprovedBy = String(approvedBy ?? '').trim();
    const normalizedTimezone = String(timezone ?? '').trim();

    if (!normalizedApprovalStatement) fail('approval_statement es obligatorio.');
    if (!normalizedApprovedBy) fail('approved_by es obligatorio.');
    if (!normalizedTimezone) fail('timezone es obligatorio.');
    if (targetRepositories.length === 0) fail('scope.target_repositories no puede estar vacío.');
    if (authorizedChanges.length === 0) fail('scope.authorized_changes no puede estar vacío.');
    if (validationCommands.length === 0) fail('scope.validation_commands no puede estar vacío.');

    const zeroTreqReason = affectedTreqIds.length > 0
        ? null
        : String(scope.zero_treq_reason ?? '').trim();

    return {
        ...record,
        status: 'AUTHORIZED',
        target_repositories: targetRepositories,
        authorized_changes: authorizedChanges,
        validation_commands: validationCommands,
        affected_treq_ids: affectedTreqIds,
        zero_treq_reason: zeroTreqReason,
        authorization: {
            decision: 'APPROVED',
            approved_by: normalizedApprovedBy,
            approved_at: approvedAt,
            timezone: normalizedTimezone,
            approval_statement: normalizedApprovalStatement,
            source_contract_sha256: record.baseline.target_task_sha256,
        },
    };
}

function normalizeDirtyTextEol(root) {
    const normalized = [];
    for (const relativePath of worktreePaths(root)) {
        if (!isTextRepairCandidate(relativePath)) continue;
        const absolutePath = path.join(root, ...relativePath.split('/'));
        if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) continue;
        const source = fs.readFileSync(absolutePath);
        const repaired = normalizeUtf8Text(source);
        if (!repaired.changed) continue;
        fs.writeFileSync(absolutePath, repaired.content, 'utf8');
        normalized.push(relativePath);
    }
    return normalized.sort((left, right) => left.localeCompare(right, 'en'));
}

function evidenceIdentity(entry) {
    return String(entry?.type ?? entry?.evidence_type ?? '').trim();
}

export function replaceCorrectionEvidence(record, evidence) {
    const identity = evidenceIdentity(evidence);
    if (!identity) fail('CORRECTION_EVIDENCE_IDENTITY_REQUIRED');
    return {
        ...record,
        evidence: [
            ...(record.evidence ?? []).filter((entry) => evidenceIdentity(entry) !== identity),
            evidence,
        ],
    };
}

function correctionEvidence(record, identity) {
    return (record.evidence ?? []).find((entry) => evidenceIdentity(entry) === identity) ?? null;
}

function sha256Text(value) {
    return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex');
}

function runAuthorizedValidationCommand(root, command) {
    const exact = String(command ?? '').trim();
    if (!exact) fail('VALIDATION_COMMAND_EMPTY');
    return observeLifecycleCommand({
        root,
        label: exact,
        execute: () => process.platform === 'win32'
            ? run(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', exact], { cwd: root, allowFailure: true })
            : run('/bin/sh', ['-lc', exact], { cwd: root, allowFailure: true }),
    });
}

function qualityRepairEvidenceStatus(record) {
    return correctionEvidence(record, 'CORRECTION_QUALITY_REPAIR_V1');
}

function ensureQualityRepairExactlyOnce(root, record) {
    const existing = qualityRepairEvidenceStatus(record);
    if (existing?.status === 'PASS') {
        return { record, reused: true, evidence: existing };
    }
    if (existing) {
        fail(
            `${record.correction_id}: QUALITY_REPAIR_PREVIOUS_${String(existing.status ?? 'UNKNOWN').toUpperCase()}; `
            + 'no se repite automáticamente una ejecución cuyo resultado no quedó PASS.',
        );
    }

    const armedEvidence = {
        type: 'CORRECTION_QUALITY_REPAIR_V1',
        status: 'STARTED',
        command: 'npm run quality:repair',
        started_at: new Date().toISOString(),
        candidate_head_before: currentHead(root),
        automatic_retry_forbidden: true,
    };
    writeRecord(root, replaceCorrectionEvidence(record, armedEvidence));
    checkpointCorrection({
        root,
        correctionId: record.correction_id,
        label: 'arm governed quality repair exactly once',
    });

    const executionHead = currentHead(root);
    const executionStartedAt = new Date().toISOString();
    const result = npm(['run', 'quality:repair'], {
        cwd: root,
        allowFailure: true,
    });
    const stdout = String(result.stdout ?? '');
    const stderr = String(result.stderr ?? '');

    const completedEvidence = {
        ...armedEvidence,
        status: result.status === 0 ? 'PASS' : 'FAIL',
        completed_at: new Date().toISOString(),
        execution_started_at: executionStartedAt,
        duration_ms: result.duration_ms,
        execution_candidate_head: executionHead,
        exit_code: result.status,
        stdout_sha256: sha256Text(stdout),
        stderr_sha256: sha256Text(stderr),
    };
    const next = replaceCorrectionEvidence(readRecord(root, record.correction_id), completedEvidence);
    writeRecord(root, next);

    if (result.status !== 0) {
        fail(
            `${record.correction_id}: quality:repair falló con exit ${result.status}; `
            + `${(stderr || stdout || 'sin diagnóstico').replace(/[\r\n]+/gu, ' | ')}`,
            result.status,
        );
    }

    checkpointCorrection({
        root,
        correctionId: record.correction_id,
        label: 'record governed quality repair PASS',
    });
    return {
        record: readRecord(root, record.correction_id),
        reused: false,
        evidence: completedEvidence,
    };
}

function runCorrectionValidations(root, record) {
    const candidateHead = currentHead(root);
    const results = [];
    for (const command of record.validation_commands) {
        const result = runAuthorizedValidationCommand(root, command);
        const stdout = String(result.stdout ?? '');
        const stderr = String(result.stderr ?? '');
        results.push({
            command,
            duration_ms: result.duration_ms,
            started_at: result.started_at,
            completed_at: result.completed_at,
            status: result.status === 0 ? 'PASS' : 'FAIL',
            exit_code: result.status,
            stdout_sha256: sha256Text(stdout),
            stderr_sha256: sha256Text(stderr),
        });
        if (result.status !== 0) {
            return {
                status: 'FAIL',
                candidateHead,
                results,
                failure: (stderr || stdout || `exit ${result.status}`).replace(/[\r\n]+/gu, ' | '),
                exitCode: result.status,
            };
        }
    }
    return {
        status: 'PASS',
        candidateHead,
        results,
        failure: null,
        exitCode: 0,
    };
}

function sealVerifiedCorrection(root, record, validationEvidence) {
    const verifiedEvidence = {
        type: 'CORRECTION_VERIFICATION_V1',
        status: 'PASS',
        observed_at: new Date().toISOString(),
        validated_candidate_head: validationEvidence.candidate_head,
        validation_evidence_type: validationEvidence.type,
        lifecycle_model: 'VENTO-CORRECTION-LIFECYCLE-V1',
        lifecycle_decision: 'SAFE_CORRECTION_METADATA_ONLY',
        remote_mutations: false,
    };
    const next = replaceCorrectionEvidence({
        ...record,
        status: 'VERIFIED',
        verified_at: new Date().toISOString(),
    }, verifiedEvidence);
    writeRecord(root, next);

    // VERIFIED changes derived readiness: certify the final state in full.
    runCheckpointValidation(root, next, { forceFull: true });

    const sealed = readRecord(root, record.correction_id);
    const scope = assertActiveCorrectionScope(root, sealed);
    if (scope.dirty.length > 0) {
        commitDirtyByLane(
            root,
            scope.dirty,
            `correction(${record.correction_id}): seal VERIFIED`,
        );
    }
    if (worktreePaths(root).length > 0) {
        fail(
            `${record.correction_id}: VERIFIED seal dejó worktree dirty: `
            + worktreePaths(root).join(', '),
        );
    }
    const branch = correctionBranchName(record.correction_id);
    git(['push', '-u', 'origin', branch], { cwd: root });
    const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
    if (sync.behind !== 0 || sync.ahead !== 0) {
        fail(`${record.correction_id}: VERIFIED push incompleto: ${sync.raw}.`);
    }
    return {
        record: sealed,
        head: currentHead(root),
    };
}

function branchChangedPaths(root) {
    return git(['diff', '--name-only', '--diff-filter=ACMRD', `origin/${DEFAULT_BRANCH}...HEAD`], { cwd: root }).stdout
        .split(/\r?\n/u)
        .map((entry) => entry.trim())
        .filter(Boolean);
}

function assertActiveCorrectionScope(root, record) {
    const dirty = worktreePaths(root);
    const branchPaths = branchChangedPaths(root);
    const combined = [...new Set([...branchPaths, ...dirty])].sort();
    if (record.integration) {
        assertPreMergeCorrectionScope({
            root,
            record,
            baseRef: `origin/${DEFAULT_BRANCH}`,
            dirtyPaths: dirty,
        });
    } else {
        assertCorrectionPaths(combined, record, {
            root,
            baseRef: `origin/${DEFAULT_BRANCH}`,
            registration: false,
        });
    }
    return { dirty, branchPaths, combined };
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

function runCheckpointValidation(root, record, { forceFull = false, requireExact = false } = {}) {
    // Scope and schema are always enforced, including metadata-only checkpoints.
    assertActiveCorrectionScope(root, record);
    const recordPath = correctionRecordRelativePath(record.correction_id);
    const key = `${path.resolve(root)}:${record.correction_id}`;
    const fingerprint = () => correctionInputFingerprint({ root, recordPath });
    const strictFingerprint = () => correctionInputFingerprint({ root, recordPath, metadataOnly: false });
    const result = validateCorrectionCheckpoint({
        session: validationSession, key, fingerprint, exactFingerprint: strictFingerprint, forceFull, requireExact,
        full: () => {
            npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
            const normalizedEol = normalizeDirtyTextEol(root);
            const before = strictFingerprint();
            // plan:check already includes correction:check and the EOL policy.
            npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
            if (before !== strictFingerprint()) fail('CORRECTION_INPUT_CHANGED_DURING_FULL_CHECK');
            git(['diff', '--check'], { cwd: root });
            return { normalizedEol };
        },
        light: () => {
            loadValidatedCorrectionControl({ root });
            const normalizedEol = normalizeDirtyTextEol(root);
            validateEolPolicy({ root });
            npm(['run', '--silent', 'docs:correction:starter'], { cwd: root });
            git(['diff', '--check'], { cwd: root });
            return { normalizedEol };
        },
    });
    console.log(`[LIFECYCLE] CHECKPOINT ${record.correction_id}: ${result.strategy}`);
    return result;
}

export function checkpointCorrection({
    root = ensureRepositoryRoot(),
    correctionId,
    label = 'checkpoint',
} = {}) {
    const id = normalizeCorrectionId(correctionId);
    const expectedBranch = correctionBranchName(id);
    ensureGhReady(root);
    if (currentBranch(root) !== expectedBranch) {
        fail(`CORRECTION_CHECKPOINT debe ejecutarse desde ${expectedBranch}.`);
    }

    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    let record = readRecord(root, id);
    if (!['IN_PROGRESS', 'IMPLEMENTED'].includes(record.status)) {
        fail(`${id}: checkpoint exige IN_PROGRESS o IMPLEMENTED; estado ${record.status}.`);
    }
    assertBaselineCurrent({ root, record, ref: `origin/${DEFAULT_BRANCH}` });
    assertPendingImplementationPr(root, record);

    const { normalizedEol, strategy } = runCheckpointValidation(root, record);

    record = readRecord(root, id);
    const scope = assertActiveCorrectionScope(root, record);
    const createdCommits = scope.dirty.length > 0
        ? commitDirtyByLane(root, scope.dirty, `correction(${id}): ${label}`)
        : 0;

    if (worktreePaths(root).length > 0) {
        fail(`${id}: CHECKPOINT_LEFT_DIRTY ${worktreePaths(root).join(', ')}.`);
    }

    const repositoryPlan = buildCorrectionRepositoryPlan({ shellRoot: root, record });
    const externalCheckpoint = checkpointExternalCorrectionBundle({ plan: repositoryPlan, record });

    git(['push', '-u', 'origin', expectedBranch], { cwd: root });
    const sync = syncCounts(root, `origin/${expectedBranch}`, 'HEAD');
    if (sync.behind !== 0 || sync.ahead !== 0) {
        fail(`${id}: checkpoint push incompleto: ${sync.raw}.`);
    }

    const head = currentHead(root);
    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_CHECKPOINT',
        CORRECTION_ID: id,
        STATUS: record.status,
        CANDIDATE_HEAD: head,
        LOCAL_VALIDATION_STRATEGY: strategy,
        NORMALIZED_EOL_FILES: normalizedEol.length,
        COMMITS_CREATED: createdCommits,
        EXTERNAL_REPOSITORIES: externalCheckpoint.length,
        WORKTREE: 'CLEAN',
        REMOTE_BRANCH_SYNC: '0/0',
    });
    return { record, head, normalizedEol, createdCommits, externalCheckpoint, strategy };
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
    npm(['run', '--silent', 'docs:commit-scope:check', '--', '--range', `origin/${DEFAULT_BRANCH}..HEAD`, '--correction-head-ref', branch], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
    const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
    if (sync.behind !== 0 || sync.ahead !== 0) fail(`Push incompleto de ${branch}: ${sync.raw}.`);
    const headSha = currentHead(root);
    const prNumber = createOrUpdatePr(root, { branch, title, body });
    let state = readOpenPrState(root, prNumber);
    ensureOpenPrIdentity(state, prNumber, headSha);
    const { registered, completed } = observeLifecycleCommand({
        root,
        label: `GitHub gates PR #${prNumber}`,
        execute: () => ({
            status: 0,
            registered: waitForPrChecksToRegister(root, prNumber),
            completed: waitForPrChecksToComplete(root, prNumber),
        }),
    });
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

export function authorizeCorrection({
    root = ensureRepositoryRoot(),
    correctionId,
    scopeFile,
    approvalStatement,
    approvedBy,
    timezone,
} = {}) {
    const id = normalizeCorrectionId(correctionId);
    const recordPath = correctionRecordRelativePath(id);
    ensureGhReady(root);

    if (currentBranch(root) !== DEFAULT_BRANCH) fail('CORRECTION_AUTHORIZE debe comenzar desde main.');
    git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
        fail(`main debe estar sincronizado 0/0 antes de autorizar la corrección: ${mainSync.raw}.`);
    }
    reconcileDerivedWorktree(root, [], 'CORRECTION_AUTHORIZE');

    const record = readRecord(root, id);
    assertBaselineCurrent({ root, record, ref: `origin/${DEFAULT_BRANCH}` });
    assertPendingImplementationPr(root, record);
    const scope = readJsonObject(scopeFile, 'scope-file');
    const next = buildAuthorizedCorrectionRecord(record, {
        scope,
        approvalStatement,
        approvedBy,
        timezone,
    });
    writeRecord(root, next);
    normalizeDirtyTextEol(root);
    loadValidatedCorrectionControl({ root });
    validateEolPolicy({ root });
    git(['diff', '--check'], { cwd: root });

    const dirty = worktreePaths(root);
    if (JSON.stringify(dirty.sort()) !== JSON.stringify([recordPath])) {
        fail(`${id}: authorize debe dejar únicamente ${recordPath} modificado; actuales: ${dirty.join(', ') || 'NINGUNO'}.`);
    }

    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_AUTHORIZE',
        CORRECTION_ID: id,
        STATUS: 'AUTHORIZED',
        APPROVAL_STATEMENT: next.authorization.approval_statement,
        SOURCE_CONTRACT_SHA256: next.authorization.source_contract_sha256,
        EOL_POLICY: 'PASS',
        READY_TO_START: 'SI',
    });
    return next;
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
    const repositoryPlan = buildCorrectionRepositoryPlan({ shellRoot: root, record });
    ensureExternalCorrectionBranches({ plan: repositoryPlan });
    if (record.integration) {
        assertRegisteredCorrectionOrigin({ root, record, baseRef: `origin/${DEFAULT_BRANCH}` });
        git(['fetch', 'origin', record.integration.head_ref, '--quiet'], { cwd: root });
        git(['switch', '-c', branch], { cwd: root });
        git(['merge', '--no-ff', '--no-edit', record.integration.head_commit], { cwd: root });
    } else git(['switch', '-c', branch], { cwd: root });

    const next = { ...record, status: 'IN_PROGRESS' };
    writeRecord(root, next);
    runCheckpointValidation(root, next, { forceFull: true });

    const scope = assertActiveCorrectionScope(root, next);
    if (scope.dirty.length > 0) {
        commitDirtyByLane(root, scope.dirty, `correction(${id}): start`);
    }
    if (worktreePaths(root).length > 0) {
        fail(`${id}: CORRECTION_START dejó worktree dirty: ${worktreePaths(root).join(', ')}.`);
    }

    git(['push', '-u', 'origin', branch], { cwd: root });
    const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
    if (sync.behind !== 0 || sync.ahead !== 0) {
        fail(`${id}: push inicial incompleto: ${sync.raw}.`);
    }

    printResult({
        ESTADO: 'PASS',
        OPERACION: 'CORRECTION_START',
        CORRECTION_ID: id,
        TASK_ID: record.task_id,
        BRANCH: branch,
        STATUS: 'IN_PROGRESS',
        BASELINE: 'CURRENT',
        CANDIDATE_HEAD: currentHead(root),
        WORKTREE: 'CLEAN',
        REMOTE_BRANCH_SYNC: '0/0',
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


export function advanceCorrection({ root = ensureRepositoryRoot(), correctionId } = {}) {
    const id = normalizeCorrectionId(correctionId);
    let record = readRecord(root, id);

    if (record.status === 'PENDING_AUTHORIZATION') {
        fail(`${id}: HUMAN_GATE; la corrección requiere autorización explícita antes de advance.`);
    }
    if (['BLOCKED', 'DEFERRED'].includes(record.status)) {
        fail(`${id}: estado ${record.status}; resuelva el bloqueo o reanudación antes de advance.`);
    }

    if (record.status === 'AUTHORIZED') {
        if (currentBranch(root) !== DEFAULT_BRANCH) {
            fail(`${id}: AUTHORIZED advance debe comenzar desde main.`);
        }
        startCorrection({ root, correctionId: id });
        record = readRecord(root, id);
    }

    if (record.status === 'IN_PROGRESS') {
        if (currentBranch(root) !== correctionBranchName(id)) {
            fail(`${id}: IN_PROGRESS advance debe ejecutarse desde ${correctionBranchName(id)}.`);
        }

        checkpointCorrection({
            root,
            correctionId: id,
            label: 'pre quality repair',
        });

        const repair = ensureQualityRepairExactlyOnce(root, readRecord(root, id));
        record = repair.record;

        const implemented = {
            ...record,
            status: 'IMPLEMENTED',
            implemented_at: new Date().toISOString(),
        };
        writeRecord(root, implemented);
        checkpointCorrection({
            root,
            correctionId: id,
            label: 'transition to IMPLEMENTED',
        });
        record = readRecord(root, id);
    }

    if (record.status === 'IMPLEMENTED') {
        checkpointCorrection({
            root,
            correctionId: id,
            label: 'pre validation candidate',
        });
        record = readRecord(root, id);

        const validation = runCorrectionValidations(root, record);
        const validationEvidence = {
            type: 'CORRECTION_VALIDATION_V1',
            status: validation.status,
            observed_at: new Date().toISOString(),
            candidate_head: validation.candidateHead,
            commands: [...record.validation_commands],
            results: validation.results,
            ordered_fail_fast: true,
        };
        writeRecord(
            root,
            replaceCorrectionEvidence(readRecord(root, id), validationEvidence),
        );
        checkpointCorrection({
            root,
            correctionId: id,
            label: 'record correction validation evidence',
        });

        if (validation.status !== 'PASS') {
            fail(
                `${id}: VALIDATION_FAILED: ${validation.failure}`,
                validation.exitCode,
            );
        }

        let recordBeforeSeal = readRecord(root, id);
        const repositoryPlan = buildCorrectionRepositoryPlan({ shellRoot: root, record: recordBeforeSeal });
        const externalPublication = publishExternalCorrectionBundle({
            plan: repositoryPlan,
            record: recordBeforeSeal,
        });
        if (externalPublication.repositories.length > 0) {
            recordBeforeSeal = replaceCorrectionEvidence(recordBeforeSeal, externalPublication);
            writeRecord(root, recordBeforeSeal);
            validatePublishedCorrectionBundleEvidence({
                record: recordBeforeSeal,
                evidence: externalPublication,
                plan: repositoryPlan,
            });
        }

        const sealed = sealVerifiedCorrection(
            root,
            readRecord(root, id),
            validationEvidence,
        );
        record = sealed.record;

        printResult({
            ESTADO: 'PASS',
            OPERACION: 'CORRECTION_ADVANCE_VERIFY',
            CORRECTION_ID: id,
            STATUS: 'VERIFIED',
            VALIDATED_CANDIDATE_HEAD: validation.candidateHead,
            VERIFIED_LIFECYCLE_HEAD: sealed.head,
            QUALITY_REPAIR: 'PASS_EXACTLY_ONCE',
            VALIDATIONS: 'PASS',
            WORKTREE: 'CLEAN',
            REMOTE_BRANCH_SYNC: '0/0',
        });
    }

    if (record.status === 'VERIFIED') {
        return finishCorrection({ root, correctionId: id });
    }

    fail(`${id}: advance terminó en estado no manejado ${record.status}.`);
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
    const repositoryPlan = buildCorrectionRepositoryPlan({ shellRoot: root, record });
    validatePublishedCorrectionBundleEvidence({
        record,
        evidence: correctionRepositoryPublishEvidence(record),
        plan: repositoryPlan,
    });
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

    // Reuse the seal only if its complete state, including evidence, is unchanged.
    runCheckpointValidation(root, record, { requireExact: true });

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
        scopeFile: null,
        approvalStatement: null,
        approvedBy: null,
        timezone: null,
        label: null,
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
        } else if (token === '--scope-file') {
            if (!value) fail('falta valor de --scope-file.');
            args.scopeFile = value;
            index += 1;
        } else if (token === '--approval-statement') {
            if (!value) fail('falta valor de --approval-statement.');
            args.approvalStatement = value;
            index += 1;
        } else if (token === '--approved-by') {
            if (!value) fail('falta valor de --approved-by.');
            args.approvedBy = value;
            index += 1;
        } else if (token === '--timezone') {
            if (!value) fail('falta valor de --timezone.');
            args.timezone = value;
            index += 1;
        } else if (token === '--label') {
            if (!value) fail('falta valor de --label.');
            args.label = value;
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
    if (args.mode === 'authorize') {
        for (const key of ['correctionId', 'scopeFile', 'approvalStatement', 'approvedBy', 'timezone']) {
            if (!args[key]) fail(`authorize exige ${key}.`);
        }
        return authorizeCorrection({
            correctionId: args.correctionId,
            scopeFile: args.scopeFile,
            approvalStatement: args.approvalStatement,
            approvedBy: args.approvedBy,
            timezone: args.timezone,
        });
    }
    if (args.mode === 'start') {
        if (!args.correctionId) fail('start exige --correction-id.');
        return startCorrection({ correctionId: args.correctionId });
    }
    if (args.mode === 'checkpoint') {
        if (!args.correctionId) fail('checkpoint exige --correction-id.');
        return checkpointCorrection({
            correctionId: args.correctionId,
            label: args.label ?? 'checkpoint',
        });
    }
    if (args.mode === 'advance') {
        if (!args.correctionId) fail('advance exige --correction-id.');
        return advanceCorrection({ correctionId: args.correctionId });
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
