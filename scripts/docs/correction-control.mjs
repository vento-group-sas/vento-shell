import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import {
    instanceRecordRelativePath,
    loadImplementationControl,
} from './implementation-control.mjs';
import { parseTaskBlocks } from './format-canonical-task.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { assertImplementationPaths, implementationBranchName } from './implementation-branch-lifecycle.mjs';
import { READINESS_PATHS, validateInPackageCandidateEvidence, targetRequiresSupabaseFoundation } from './package-readiness-scanner.mjs';

export const CORRECTION_POLICY_RELATIVE_PATH = 'scripts/docs/correction-control.json';
export const CORRECTION_RECORDS_DIRECTORY = 'docs/plan-canonico/modular/correction-instances';
export const CORRECTION_STARTER_PROJECTION = '.delivery/INICIADOR_VENTO_CORRECCION.txt';
export const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';

const DEFAULT_BRANCH = 'main';
const CORRECTION_PREFIX = 'correction/';
const REGISTRATION_PREFIX = 'correction-register/';
const TASK_ID_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*-[0-9]{3,4}$/u;
const CORRECTION_ID_PATTERN = /^([A-Z0-9]+(?:-[A-Z0-9]+)*-[0-9]{3,4})::CORR-([0-9]{3})$/u;
const HASH_PATTERN = /^[0-9a-f]{64}$/u;
const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;
const TREQ_PATTERN = /^TREQ-[A-Z0-9]+(?:-[A-Z0-9]+)*-[0-9]{3,4}$/u;
const GIT_MAX_BUFFER_BYTES = 64 * 1024 * 1024;
const GIT_FAILURE_DIAGNOSTIC_LIMIT = 4000;
export const DERIVED_CORRECTION_PROJECTIONS = new Set([
    CORRECTION_STARTER_PROJECTION,
    'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
    'docs/plan-canonico/modular/active-sequence.json',
    'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
    'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
    'scripts/docs/package-readiness/implementation-package-registry.json',
]);
const OPEN_STATUSES = new Set([
    'PENDING_AUTHORIZATION',
    'AUTHORIZED',
    'IN_PROGRESS',
    'BLOCKED',
    'IMPLEMENTED',
    'DEFERRED',
]);

function fail(message) {
    throw new Error(message);
}

function sha256(source) {
    return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

function readJson(filePath, label) {
    if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${filePath}.`);
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        fail(`${label} no contiene JSON válido: ${error instanceof Error ? error.message : String(error)}.`);
    }
}

function normalizePath(value) {
    return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '').trim();
}

function truncateGitDiagnostic(value) {
    const text = String(value ?? '').trimEnd();
    if (text.length <= GIT_FAILURE_DIAGNOSTIC_LIMIT) return text;
    return `${text.slice(0, GIT_FAILURE_DIAGNOSTIC_LIMIT)}
[DIAGNOSTICO_GIT_TRUNCADO]`;
}

function git(root, args, { allowFailure = false } = {}) {
    const result = spawnSync('git', args, {
        cwd: root,
        encoding: 'utf8',
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        maxBuffer: GIT_MAX_BUFFER_BYTES,
    });

    const stdout = String(result.stdout ?? '').trimEnd();
    const stderr = String(result.stderr ?? '').trimEnd();

    if (result.error) {
        const diagnostic = `git ${args.join(' ')} no pudo ejecutarse: ${result.error.message}`;

        if (!allowFailure) fail(diagnostic);

        return {
            status: 1,
            stdout: truncateGitDiagnostic(stdout),
            stderr: diagnostic,
        };
    }

    const status = Number.isInteger(result.status) ? result.status : 1;

    if (status !== 0 && !allowFailure) {
        const diagnostic =
            truncateGitDiagnostic(stderr)
            || truncateGitDiagnostic(stdout);

        fail(diagnostic || `git ${args.join(' ')} falló.`);
    }

    return { status, stdout, stderr };
}

export function normalizeTaskId(value) {
    const taskId = String(value ?? '').trim().toUpperCase();
    if (!TASK_ID_PATTERN.test(taskId)) fail(`TASK_ID inválido: ${value || 'VACÍO'}.`);
    return taskId;
}

export function normalizeCorrectionId(value) {
    const raw = String(value ?? '').trim().toUpperCase();
    const match = CORRECTION_ID_PATTERN.exec(raw);
    if (!match) fail(`CORRECTION_ID inválido: ${value || 'VACÍO'}.`);
    return `${match[1]}::CORR-${match[2]}`;
}

export function correctionTaskId(correctionId) {
    return normalizeCorrectionId(correctionId).split('::')[0];
}

export function correctionOrdinal(correctionId) {
    const match = CORRECTION_ID_PATTERN.exec(normalizeCorrectionId(correctionId));
    return Number(match[2]);
}

export function correctionRecordRelativePath(correctionId) {
    return `${CORRECTION_RECORDS_DIRECTORY}/${normalizeCorrectionId(correctionId).replace('::', '__')}.json`;
}

export function correctionBranchName(correctionId) {
    const id = normalizeCorrectionId(correctionId);
    const [taskId, correctionKey] = id.split('::');
    return `${CORRECTION_PREFIX}${taskId.toLowerCase()}/${correctionKey.toLowerCase()}`;
}

export function correctionRegistrationBranchName(correctionId) {
    const id = normalizeCorrectionId(correctionId);
    const [taskId, correctionKey] = id.split('::');
    return `${REGISTRATION_PREFIX}${taskId.toLowerCase()}/${correctionKey.toLowerCase()}`;
}

export function correctionIdFromHeadRef(headRef) {
    const ref = String(headRef ?? '').trim();
    const prefixes = [CORRECTION_PREFIX, REGISTRATION_PREFIX];
    const prefix = prefixes.find((candidate) => ref.startsWith(candidate));
    if (!prefix) fail(`rama de corrección inválida: ${ref || 'VACÍA'}.`);
    const tail = ref.slice(prefix.length);
    const match = /^([a-z0-9]+(?:-[a-z0-9]+)*-[0-9]{3,4})\/(corr-[0-9]{3})$/u.exec(tail);
    if (!match) fail(`rama de corrección inválida: ${ref}.`);
    return normalizeCorrectionId(`${match[1]}::${match[2]}`);
}

export function isCorrectionRegistrationHeadRef(headRef) {
    return String(headRef ?? '').trim().startsWith(REGISTRATION_PREFIX);
}

export function loadCorrectionPolicy({ root = process.cwd() } = {}) {
    return readJson(path.join(root, ...CORRECTION_POLICY_RELATIVE_PATH.split('/')), CORRECTION_POLICY_RELATIVE_PATH);
}

function readCorrectionRecords({ root, recordsDirectory }) {
    const directory = path.join(root, ...recordsDirectory.split('/'));
    if (!fs.existsSync(directory)) return [];
    if (!fs.statSync(directory).isDirectory()) fail(`${recordsDirectory} debe ser un directorio.`);
    return fs.readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
        .map((entry) => {
            const relativePath = `${recordsDirectory}/${entry.name}`;
            return {
                relativePath,
                record: readJson(path.join(directory, entry.name), relativePath),
            };
        })
        .sort((left, right) => left.relativePath.localeCompare(right.relativePath, 'en'));
}

export function loadCorrectionControl({ root = process.cwd() } = {}) {
    const policy = loadCorrectionPolicy({ root });
    const recordsDirectory = String(policy.records_directory ?? CORRECTION_RECORDS_DIRECTORY).trim();
    const records = readCorrectionRecords({ root, recordsDirectory });
    return { policy, recordsDirectory, records };
}

function assertArrayOfUniqueStrings(value, label, { allowEmpty = true } = {}) {
    if (!Array.isArray(value)) fail(`${label} debe ser un array.`);
    if (!allowEmpty && value.length === 0) fail(`${label} no puede estar vacío.`);
    const normalized = value.map((entry) => String(entry ?? '').trim());
    if (normalized.some((entry) => !entry)) fail(`${label} contiene valores vacíos.`);
    if (new Set(normalized).size !== normalized.length) fail(`${label} contiene duplicados.`);
    return normalized;
}

function validatePolicy(policy) {
    if (policy?.schema_version !== 1) fail('correction-control.json exige schema_version=1.');
    if (policy?.policy_id !== 'VENTO_CANONICAL_CORRECTION_LIFECYCLE_V1') {
        fail('correction-control.json debe usar policy_id VENTO_CANONICAL_CORRECTION_LIFECYCLE_V1.');
    }
    if (policy?.contract_sha256 !== '76fabbbd2ba54dac503848b801430a96e268ad4eadae45778744eb3150c765d8') {
        fail('correction-control.json conserva un contract_sha256 distinto del contrato aprobado.');
    }
    if (policy?.semantic_change_forbidden !== true) fail('semantic_change_forbidden debe ser true.');
    if (policy?.block_release !== 'VERIFIED_ON_MAIN') fail('block_release debe ser VERIFIED_ON_MAIN.');
    if (policy?.authorization_mode !== 'EXPLICIT_PER_CORRECTION') fail('authorization_mode debe ser EXPLICIT_PER_CORRECTION.');
    if (policy?.automatic_authorization !== false) fail('automatic_authorization debe ser false.');
    if (policy?.history_mode !== 'APPEND_ONLY_LEDGER') fail('history_mode debe ser APPEND_ONLY_LEDGER.');
    if (policy?.verified_corrections_immutable !== true) fail('verified_corrections_immutable debe ser true.');
    if (policy?.max_open_corrections_per_task !== 1) fail('max_open_corrections_per_task debe ser 1.');
    if (policy?.records_directory !== CORRECTION_RECORDS_DIRECTORY) fail(`records_directory debe ser ${CORRECTION_RECORDS_DIRECTORY}.`);
    if (policy?.branch_prefix !== CORRECTION_PREFIX) fail(`branch_prefix debe ser ${CORRECTION_PREFIX}.`);
    if (policy?.registration_branch_prefix !== REGISTRATION_PREFIX) fail(`registration_branch_prefix debe ser ${REGISTRATION_PREFIX}.`);
    if (policy?.correction_id_pattern !== '<TASK-ID>::CORR-<NNN>') fail('correction_id_pattern inválido.');
    if (policy?.required_remote_gate !== 'VENTO Required Gate') fail('required_remote_gate debe ser VENTO Required Gate.');
    const preMergePolicy = {
        mode: 'PINNED_IMPLEMENTATION_PR',
        registration: 'PENDING_AUTHORIZATION_ON_MAIN',
        integration: 'IMPLEMENTATION_AND_CORRECTION_IN_ONE_PR',
        historical_instance: 'IMMUTABLE',
        validation: 'FRESH_CANDIDATE_AND_REQUIRED_ENVIRONMENTS',
    };
    for (const [key, value] of Object.entries(preMergePolicy)) {
        if (policy.pre_merge_physical_corrections?.[key] !== value) fail(`pre_merge_physical_corrections.${key} debe ser ${value}.`);
    }
    if (policy?.supabase_historical_migrations_immutable !== true) {
        fail('supabase_historical_migrations_immutable debe ser true.');
    }
    assertArrayOfUniqueStrings(policy?.correction_types, 'correction_types', { allowEmpty: false });
    assertArrayOfUniqueStrings(policy?.reason_codes, 'reason_codes', { allowEmpty: false });
    assertArrayOfUniqueStrings(policy?.statuses, 'statuses', { allowEmpty: false });
}

function validateAuthorization(record) {
    if (record.status === 'PENDING_AUTHORIZATION') {
        if (record.authorization !== null) fail(`${record.correction_id}: PENDING_AUTHORIZATION exige authorization=null.`);
        return;
    }
    if (!record.authorization || typeof record.authorization !== 'object' || Array.isArray(record.authorization)) {
        fail(`${record.correction_id}: ${record.status} exige authorization.`);
    }
    if (record.authorization.decision !== 'APPROVED') fail(`${record.correction_id}: authorization.decision debe ser APPROVED.`);
    for (const key of ['approved_by', 'approved_at', 'timezone', 'approval_statement', 'source_contract_sha256']) {
        if (!String(record.authorization[key] ?? '').trim()) fail(`${record.correction_id}: authorization.${key} es obligatorio.`);
    }
    if (!HASH_PATTERN.test(String(record.authorization.source_contract_sha256))) {
        fail(`${record.correction_id}: authorization.source_contract_sha256 inválido.`);
    }
    if (record.authorization.source_contract_sha256 !== record.baseline.target_task_sha256) {
        fail(`${record.correction_id}: authorization.source_contract_sha256 debe coincidir con baseline.target_task_sha256.`);
    }
}

function validateAuthorizedChanges(record) {
    if (!Array.isArray(record.authorized_changes)) fail(`${record.correction_id}: authorized_changes debe ser array.`);
    const seen = new Set();
    for (const [index, entry] of record.authorized_changes.entries()) {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) fail(`${record.correction_id}: authorized_changes[${index}] inválido.`);
        if (String(entry.repo ?? '').trim() !== SHELL_REPOSITORY) {
            fail(`${record.correction_id}: V1 solo admite authorized_changes en ${SHELL_REPOSITORY}.`);
        }
        const relativePath = normalizePath(entry.path);
        if (!relativePath) fail(`${record.correction_id}: authorized_changes[${index}].path vacío.`);
        const change = String(entry.change ?? '').trim().toUpperCase();
        if (!['CREATE', 'MODIFY', 'DELETE', 'EXECUTE_ONLY'].includes(change)) {
            fail(`${record.correction_id}: change inválido para ${relativePath}: ${change || 'VACÍO'}.`);
        }
        const key = `${entry.repo}|${relativePath}|${change}`;
        if (seen.has(key)) fail(`${record.correction_id}: authorized_changes duplicado: ${key}.`);
        seen.add(key);
    }
    if (record.status !== 'PENDING_AUTHORIZATION' && record.authorized_changes.length === 0) {
        fail(`${record.correction_id}: ${record.status} exige authorized_changes no vacío.`);
    }
}

function validateTreqDeclaration(record) {
    const ids = assertArrayOfUniqueStrings(record.affected_treq_ids, `${record.correction_id}.affected_treq_ids`);
    for (const id of ids) if (!TREQ_PATTERN.test(id)) fail(`${record.correction_id}: TREQ inválido: ${id}.`);
    const zeroReason = record.zero_treq_reason === null ? '' : String(record.zero_treq_reason ?? '').trim();
    if (ids.length === 0) {
        if (zeroReason.length < 20) fail(`${record.correction_id}: cero TREQ exige zero_treq_reason concreto de al menos 20 caracteres.`);
        if (record.status !== 'PENDING_AUTHORIZATION' && record.correction_type !== 'DOCUMENTARY') {
            fail(`${record.correction_id}: toda corrección física autorizada exige affected_treq_ids no vacío.`);
        }
    } else if (record.zero_treq_reason !== null) {
        fail(`${record.correction_id}: zero_treq_reason debe ser null cuando existen TREQ afectados.`);
    }
}

function validateRecord(record, relativePath, { policy, workTopology, implementationControl, root }) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) fail(`${relativePath}: registro inválido.`);
    const correctionId = normalizeCorrectionId(record.correction_id);
    if (correctionId !== record.correction_id) fail(`${relativePath}: correction_id debe estar normalizado.`);
    if (correctionRecordRelativePath(correctionId) !== relativePath) {
        fail(`${correctionId}: ruta esperada ${correctionRecordRelativePath(correctionId)}, recibida ${relativePath}.`);
    }
    const taskId = normalizeTaskId(record.task_id);
    if (taskId !== record.task_id || taskId !== correctionTaskId(correctionId)) fail(`${correctionId}: task_id inconsistente.`);
    const task = workTopology.inventory.get(taskId);
    if (!task) fail(`${correctionId}: ${taskId} no existe en el inventario canónico.`);

    const type = String(record.correction_type ?? '').trim().toUpperCase();
    if (!policy.correction_types.includes(type)) fail(`${correctionId}: correction_type no permitido: ${type || 'VACÍO'}.`);
    if (!policy.reason_codes.includes(record.reason_code)) fail(`${correctionId}: reason_code no permitido: ${record.reason_code}.`);
    if (!policy.statuses.includes(record.status)) fail(`${correctionId}: status no permitido: ${record.status}.`);
    if (typeof record.blocking !== 'boolean') fail(`${correctionId}: blocking debe ser boolean.`);
    const blockedTargets = assertArrayOfUniqueStrings(record.blocked_targets, `${correctionId}.blocked_targets`);
    if (!record.blocking && blockedTargets.length > 0) fail(`${correctionId}: blocked_targets exige blocking=true.`);
    if (record.blocking && blockedTargets.length === 0) fail(`${correctionId}: blocking=true exige blocked_targets no vacío.`);
    for (const target of blockedTargets) {
        if (target.includes('::')) {
            const instance = implementationControl.instances.find((entry) => entry.instance_id === target) ?? null;
            if (!instance) fail(`${correctionId}: blocked_target físico inexistente: ${target}.`);
        } else if (!workTopology.inventory.has(target)) {
            fail(`${correctionId}: blocked_target documental inexistente: ${target}.`);
        }
    }

    if (type === 'DOCUMENTARY') {
        if (record.target_instance_id !== null) fail(`${correctionId}: DOCUMENTARY exige target_instance_id=null.`);
    } else {
        const targetInstanceId = String(record.target_instance_id ?? '').trim();
        if (!targetInstanceId) fail(`${correctionId}: ${type} exige target_instance_id.`);
        const instance = implementationControl.instances.find((entry) => entry.instance_id === targetInstanceId) ?? null;
        if (!instance) fail(`${correctionId}: target_instance_id inexistente: ${targetInstanceId}.`);
        if (instance.task_id !== taskId) fail(`${correctionId}: target_instance_id pertenece a ${instance.task_id}, no a ${taskId}.`);
        if (record.integration) {
            validatePreMergeIntegration({ root, record });
        } else if (instance.status !== 'VERIFIED') fail(`${correctionId}: la instancia objetivo debe permanecer VERIFIED; estado ${instance.status}.`);
    }
    if (type === 'DOCUMENTARY' && record.integration) fail(`${correctionId}: DOCUMENTARY no admite integración física PRE_MERGE.`);

    if (!record.baseline || typeof record.baseline !== 'object' || Array.isArray(record.baseline)) fail(`${correctionId}: baseline obligatorio.`);
    if (!COMMIT_PATTERN.test(String(record.baseline.main_commit ?? ''))) fail(`${correctionId}: baseline.main_commit inválido.`);
    if (!normalizePath(record.baseline.target_task_path)) fail(`${correctionId}: baseline.target_task_path obligatorio.`);
    if (!HASH_PATTERN.test(String(record.baseline.target_task_sha256 ?? ''))) fail(`${correctionId}: baseline.target_task_sha256 inválido.`);
    if (type === 'DOCUMENTARY') {
        if (record.baseline.target_instance_record_path !== null || record.baseline.target_instance_record_sha256 !== null) {
            fail(`${correctionId}: baseline de DOCUMENTARY no debe declarar instancia física.`);
        }
    } else {
        if (!normalizePath(record.baseline.target_instance_record_path)) fail(`${correctionId}: baseline.target_instance_record_path obligatorio.`);
        if (!HASH_PATTERN.test(String(record.baseline.target_instance_record_sha256 ?? ''))) {
            fail(`${correctionId}: baseline.target_instance_record_sha256 inválido.`);
        }
    }

    assertArrayOfUniqueStrings(record.target_repositories, `${correctionId}.target_repositories`);
    if (record.status !== 'PENDING_AUTHORIZATION' && record.target_repositories.length === 0) {
        fail(`${correctionId}: ${record.status} exige target_repositories no vacío.`);
    }
    if (record.target_repositories.some((repo) => repo !== SHELL_REPOSITORY)) {
        fail(`${correctionId}: V1 solo admite target_repositories=${SHELL_REPOSITORY}.`);
    }
    validateAuthorizedChanges(record);
    assertArrayOfUniqueStrings(record.validation_commands, `${correctionId}.validation_commands`);
    if (record.status !== 'PENDING_AUTHORIZATION' && record.validation_commands.length === 0) {
        fail(`${correctionId}: ${record.status} exige validation_commands no vacío.`);
    }
    validateAuthorization(record);
    validateTreqDeclaration(record);
    if (!Array.isArray(record.evidence)) fail(`${correctionId}: evidence debe ser array.`);
    if (record.status === 'PENDING_AUTHORIZATION' && record.evidence.length !== 0) fail(`${correctionId}: PENDING_AUTHORIZATION exige evidence=[].`);
    if (record.status === 'VERIFIED' && record.evidence.length === 0) fail(`${correctionId}: VERIFIED exige evidence consolidada.`);
    if (!String(record.opened_at ?? '').trim()) fail(`${correctionId}: opened_at obligatorio.`);

    return record;
}

export function validateCorrectionControl(control, { root = process.cwd(), workTopology = null } = {}) {
    validatePolicy(control.policy);
    const topology = workTopology ?? resolveTaskWorkTopology({ root });
    const implementationControl = loadImplementationControl({ root });
    const ids = new Set();
    const records = [];
    for (const entry of control.records) {
        const record = validateRecord(entry.record, entry.relativePath, {
            policy: control.policy,
            workTopology: topology,
            implementationControl,
            root,
        });
        if (ids.has(record.correction_id)) fail(`correction_id duplicado: ${record.correction_id}.`);
        ids.add(record.correction_id);
        records.push(record);
    }

    const openByTask = new Map();
    for (const record of records) {
        if (!OPEN_STATUSES.has(record.status)) continue;
        const list = openByTask.get(record.task_id) ?? [];
        list.push(record.correction_id);
        openByTask.set(record.task_id, list);
    }
    for (const [taskId, list] of openByTask.entries()) {
        if (list.length > control.policy.max_open_corrections_per_task) {
            fail(`${taskId}: existen ${list.length} correcciones abiertas (${list.join(', ')}); máximo ${control.policy.max_open_corrections_per_task}.`);
        }
    }

    return { ...control, root, records: control.records.map((entry) => ({ ...entry })) };
}

export function loadValidatedCorrectionControl({ root = process.cwd() } = {}) {
    return validateCorrectionControl(loadCorrectionControl({ root }), { root });
}

export function correctionRecord(control, correctionId) {
    const id = normalizeCorrectionId(correctionId);
    return control.records.find((entry) => entry.record.correction_id === id) ?? null;
}

export function nextCorrectionId(taskId, control) {
    const normalizedTask = normalizeTaskId(taskId);
    const ordinals = control.records
        .filter((entry) => entry.record.task_id === normalizedTask)
        .map((entry) => correctionOrdinal(entry.record.correction_id));
    const next = (ordinals.length > 0 ? Math.max(...ordinals) : 0) + 1;
    if (next > 999) fail(`${normalizedTask}: se agotó la secuencia CORR-001..999.`);
    return `${normalizedTask}::CORR-${String(next).padStart(3, '0')}`;
}

export function openCorrections(control, { includeUnpublishedVerified = false } = {}) {
    return control.records
        .map((entry) => entry.record)
        .filter((record) => OPEN_STATUSES.has(record.status)
            || (includeUnpublishedVerified && record.integration && record.status === 'VERIFIED'
                && !preMergeCorrectionReleased(control.root ?? process.cwd(), record)));
}

function preMergeCorrectionReleased(root, record) {
    const relativePath = correctionRecordRelativePath(record.correction_id);
    if (!pathExistsAtRef(root, 'origin/main', relativePath)) return false;
    const published = JSON.parse(sourceAtRef(root, 'origin/main', relativePath));
    return published.status === 'VERIFIED'
        && JSON.stringify(published) === JSON.stringify(record)
        && git(root, ['merge-base', '--is-ancestor', record.integration.head_commit, 'origin/main'], { allowFailure: true }).status === 0;
}

export function blockingCorrectionsForTarget(control, targetId) {
    const target = String(targetId ?? '').trim();
    if (!target) return [];
    return openCorrections(control, { includeUnpublishedVerified: true }).filter(
        (record) => record.blocking === true && record.blocked_targets.includes(target),
    );
}

export function assertTargetNotBlocked(control, targetId) {
    const blockers = blockingCorrectionsForTarget(control, targetId);
    if (blockers.length > 0) {
        fail(`${targetId} está bloqueado por corrección abierta: ${blockers.map((record) => record.correction_id).join(', ')}.`);
    }
    return true;
}

function sourceAtRef(root, ref, relativePath) {
    const normalized = normalizePath(relativePath);
    const result = git(root, ['show', `${ref}:${normalized}`], { allowFailure: true });
    if (result.status !== 0) fail(`no se pudo leer ${normalized} en ${ref}: ${result.stderr || result.stdout}.`);
    return result.stdout.replace(/\r\n?/gu, '\n');
}

export function taskBlockAtRef({ root = process.cwd(), ref = 'HEAD', taskId, taskPath }) {
    const normalizedTaskId = normalizeTaskId(taskId);
    const source = sourceAtRef(root, ref, taskPath);
    const blocks = parseTaskBlocks(source).filter((entry) => entry.id === normalizedTaskId);
    if (blocks.length !== 1) fail(`${normalizedTaskId} debe aparecer exactamente una vez en ${taskPath} (${ref}).`);
    return blocks[0].block.replace(/\r\n?/gu, '\n');
}

export function computeBaselineAtRef({ root = process.cwd(), ref = 'HEAD', taskId, targetInstanceId = null } = {}) {
    const topology = resolveTaskWorkTopology({ root });
    const task = topology.inventory.get(normalizeTaskId(taskId));
    if (!task) fail(`${taskId} no existe en el inventario canónico.`);
    const targetTaskPath = `docs/plan-canonico/modular/${task.relativePath.replaceAll('\\', '/')}`;
    const taskBlock = taskBlockAtRef({ root, ref, taskId, taskPath: targetTaskPath });
    const mainCommit = git(root, ['rev-parse', ref]).stdout.trim().toLowerCase();
    const baseline = {
        main_commit: mainCommit,
        target_task_path: targetTaskPath,
        target_task_sha256: sha256(taskBlock),
        target_instance_record_path: null,
        target_instance_record_sha256: null,
    };
    if (targetInstanceId) {
        const instancePath = instanceRecordRelativePath(targetInstanceId);
        const instanceSource = sourceAtRef(root, ref, instancePath);
        baseline.target_instance_record_path = instancePath;
        baseline.target_instance_record_sha256 = sha256(instanceSource);
    }
    return baseline;
}

export function assertBaselineCurrent({ root = process.cwd(), record, ref = `origin/${DEFAULT_BRANCH}` } = {}) {
    const expected = record.baseline;
    const taskBlock = taskBlockAtRef({
        root,
        ref,
        taskId: record.task_id,
        taskPath: expected.target_task_path,
    });
    const actualTaskHash = sha256(taskBlock);
    if (actualTaskHash !== expected.target_task_sha256) {
        fail(`${record.correction_id}: STALE_TARGET; la tarea objetivo cambió desde el registro de la corrección.`);
    }
    if (expected.target_instance_record_path) {
        const instanceSource = sourceAtRef(root, ref, expected.target_instance_record_path);
        const actualInstanceHash = sha256(instanceSource);
        const allowedHashes = record.integration
            ? [expected.target_instance_record_sha256, record.integration.base_instance_sha256]
            : [expected.target_instance_record_sha256];
        if (!allowedHashes.includes(actualInstanceHash)) {
            fail(`${record.correction_id}: STALE_TARGET; la instancia objetivo cambió desde el registro de la corrección.`);
        }
    }
    return true;
}

export function assertPreMergePrIdentity(state, { targetInstanceId, headCommit = null } = {}) {
    if (!Number.isSafeInteger(state?.number) || state.number <= 0
        || state.state !== 'OPEN' || state.isDraft !== false || state.isCrossRepository !== false
        || state.baseRefName !== DEFAULT_BRANCH
        || state.headRefName !== implementationBranchName(targetInstanceId)
        || !COMMIT_PATTERN.test(String(state.headRefOid ?? ''))
        || (headCommit && state.headRefOid !== headCommit)) {
        fail('STALE_TARGET: el PR de implementación debe estar OPEN, en este repositorio, hacia main y conservar su HEAD exacto.');
    }
    return true;
}

export function validatePreMergeIntegration({ root = process.cwd(), record } = {}) {
    const anchor = record.integration;
    if (!anchor || anchor.mode !== 'PRE_MERGE'
        || !Number.isSafeInteger(anchor.pull_request) || anchor.pull_request <= 0
        || !COMMIT_PATTERN.test(String(anchor.head_commit ?? ''))
        || !COMMIT_PATTERN.test(String(anchor.base_commit ?? ''))
        || !HASH_PATTERN.test(String(anchor.base_instance_sha256 ?? ''))
        || anchor.head_ref !== implementationBranchName(record.target_instance_id)
        || anchor.base_commit !== record.baseline?.main_commit) {
        fail(`${record.correction_id}: integración PRE_MERGE inválida.`);
    }
    const relativePath = instanceRecordRelativePath(record.target_instance_id);
    const source = sourceAtRef(root, anchor.head_commit, relativePath);
    const instance = JSON.parse(source);
    if (instance.instance_id !== record.target_instance_id || instance.task_id !== record.task_id
        || instance.status !== 'VERIFIED' || !instance.evidence?.length
        || instance.authorization?.decision !== 'APPROVED'
        || record.baseline.target_instance_record_path !== relativePath
        || sha256(source) !== record.baseline.target_instance_record_sha256) {
        fail(`${record.correction_id}: PRE_MERGE exige una instancia VERIFIED inmutable en el SHA anclado.`);
    }
    const baseSource = sourceAtRef(root, anchor.base_commit, relativePath);
    if (sha256(baseSource) !== anchor.base_instance_sha256 || JSON.parse(baseSource).status === 'VERIFIED') {
        fail(`${record.correction_id}: PRE_MERGE exige un objetivo todavía no VERIFIED en main.`);
    }
    assertBaselineCurrent({ root, record, ref: anchor.head_commit });
    assertBaselineCurrent({ root, record, ref: anchor.base_commit });
    const currentSource = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/\r\n?/gu, '\n').trimEnd();
    if (![record.baseline.target_instance_record_sha256, anchor.base_instance_sha256].includes(sha256(currentSource))) {
        fail(`${record.correction_id}: STALE_TARGET; el ledger local no coincide con la procedencia registrada.`);
    }
    if (record.status === 'VERIFIED') assertPreMergeValidationEvidence({ root, record, instance });
    return instance;
}

export function assertPreMergeValidationEvidence({ root = process.cwd(), record, instance } = {}) {
    const receipts = (record.evidence ?? []).filter((entry) => entry?.type === 'PRE_MERGE_VALIDATION');
    const receipt = receipts[0];
    if (receipts.length !== 1 || !COMMIT_PATTERN.test(String(receipt?.candidate_commit ?? ''))
        || receipt.candidate_commit === record.integration.head_commit
        || JSON.stringify(receipt.validation_commands) !== JSON.stringify(record.validation_commands)
        || !Array.isArray(receipt.results) || receipt.results.length !== record.validation_commands.length
        || receipt.results.some((entry, index) => entry?.command !== record.validation_commands[index] || entry.status !== 'PASS')) {
        fail(`${record.correction_id}: VERIFIED exige PRE_MERGE_VALIDATION nueva y resultados PASS por comando.`);
    }
    for (const [left, right] of [[record.integration.head_commit, receipt.candidate_commit], [receipt.candidate_commit, 'HEAD']]) {
        if (git(root, ['merge-base', '--is-ancestor', left, right], { allowFailure: true }).status !== 0) {
            fail(`${record.correction_id}: el candidato validado no pertenece al historial de la corrección.`);
        }
    }
    const historical = preMergeCorrectionReleased(root, record);
    for (const entry of historical ? [] : (record.authorized_changes ?? [])) {
        if (entry.change === 'EXECUTE_ONLY' || entry.path === correctionRecordRelativePath(record.correction_id)
            || DERIVED_CORRECTION_PROJECTIONS.has(entry.path)) continue;
        const candidate = git(root, ['rev-parse', '--verify', `${receipt.candidate_commit}:${entry.path}`], { allowFailure: true });
        const absolute = path.join(root, entry.path);
        if (entry.change === 'DELETE') {
            if (candidate.status === 0 || fs.existsSync(absolute)) fail(`${record.correction_id}: candidato desactualizado para ${entry.path}.`);
        } else if (candidate.status !== 0 || !fs.existsSync(absolute)
            || git(root, ['hash-object', `--path=${entry.path}`, '--', entry.path]).stdout !== candidate.stdout) {
            fail(`${record.correction_id}: candidato desactualizado para ${entry.path}.`);
        }
    }
    const targets = instance.target_environments ?? [];
    if (targets.length && (JSON.stringify(receipt.target_environments) !== JSON.stringify(targets)
        || !Array.isArray(receipt.remote_evidence) || receipt.remote_evidence.length === 0
        || receipt.remote_evidence.some((entry) => typeof entry !== 'string' || !entry.trim()))) {
        fail(`${record.correction_id}: el candidato corregido exige evidencia remota nueva en los ambientes originales.`);
    }
    if (!historical) assertCorrectionPackageCandidate({ root, record, instance, candidateCommit: receipt.candidate_commit });
    return true;
}

export function correctionCandidateInstance(instance, record) {
    const changes = new Map((instance.authorized_changes ?? []).map((entry) => [`${entry.repo}|${entry.path}`, entry]));
    for (const entry of record.authorized_changes ?? []) {
        if (entry.change !== 'EXECUTE_ONLY') changes.set(`${entry.repo}|${entry.path}`, entry);
    }
    return { ...instance, authorized_changes: [...changes.values()], evidence: record.evidence ?? [] };
}

export function assertCorrectionPackageCandidate({ root = process.cwd(), record, instance, candidateCommit } = {}) {
    const match = /^SHELL-CI-020::(GAP-PKG-\d{3})$/u.exec(record.target_instance_id);
    if (!match) return true;
    const contract = readJson(path.join(root, READINESS_PATHS.contract), READINESS_PATHS.contract);
    const foundation = contract.physical_dependencies?.supabase_pre_e5_foundation;
    const candidate = correctionCandidateInstance(instance, record);
    if (!candidate.authorized_changes.some((entry) => entry.change !== 'EXECUTE_ONLY'
        && targetRequiresSupabaseFoundation(entry.path, foundation))) return true;
    const result = validateInPackageCandidateEvidence({ root, packageId: match[1], instance: candidate,
        gate: foundation.in_package_candidate_gate, currentHeadSha: candidateCommit });
    if (result.status !== 'PASS') fail(`${record.correction_id}: MRP015-050 del candidato corregido: ${result.detail}`);
    return true;
}

export function assertRegisteredCorrectionOrigin({ root = process.cwd(), record, baseRef } = {}) {
    const relativePath = correctionRecordRelativePath(record.correction_id);
    if (!pathExistsAtRef(root, baseRef, relativePath)) fail(`${record.correction_id}: la corrección debe registrarse antes de ejecutarse.`);
    const registered = JSON.parse(sourceAtRef(root, baseRef, relativePath));
    for (const key of ['correction_id', 'task_id', 'target_instance_id', 'correction_type', 'baseline', 'integration']) {
        if (JSON.stringify(registered[key]) !== JSON.stringify(record[key])) {
            fail(`${record.correction_id}: STALE_TARGET; la procedencia registrada ${key} es inmutable.`);
        }
    }
    return true;
}

export function buildPreMergeIntegration({ root = process.cwd(), state, targetInstanceId, baseRef = 'HEAD' } = {}) {
    assertPreMergePrIdentity(state, { targetInstanceId });
    const baseCommit = git(root, ['rev-parse', baseRef]).stdout.trim();
    return {
        mode: 'PRE_MERGE',
        pull_request: state.number,
        head_ref: state.headRefName,
        head_commit: state.headRefOid,
        base_commit: baseCommit,
        base_instance_sha256: sha256(sourceAtRef(root, baseCommit, instanceRecordRelativePath(targetInstanceId))),
    };
}

function sameBlob(root, left, right, relativePath) {
    const object = (ref) => git(root, ['rev-parse', '--verify', `${ref}:${relativePath}`], { allowFailure: true });
    const a = object(left);
    const b = object(right);
    return a.status === b.status && (a.status !== 0 || a.stdout === b.stdout);
}

export function assertPreMergeCorrectionScope({ root = process.cwd(), record, baseRef, headRef = 'HEAD', dirtyPaths = [] } = {}) {
    assertRegisteredCorrectionOrigin({ root, record, baseRef });
    const instance = validatePreMergeIntegration({ root, record });
    const anchor = record.integration;
    for (const ref of [anchor.head_commit, baseRef]) {
        if (git(root, ['merge-base', '--is-ancestor', ref, headRef], { allowFailure: true }).status !== 0) {
            fail(`${record.correction_id}: STALE_TARGET; el candidato debe contener ${ref}.`);
        }
    }
    assertBaselineCurrent({ root, record, ref: baseRef });
    assertBaselineCurrent({ root, record, ref: headRef });
    if (!sameBlob(root, anchor.head_commit, headRef, record.baseline.target_instance_record_path)
        || dirtyPaths.includes(record.baseline.target_instance_record_path)) {
        fail(`${record.correction_id}: el registro VERIFIED histórico es inmutable.`);
    }
    const originalPaths = pathsForRange(root, `${anchor.base_commit}...${anchor.head_commit}`);
    assertImplementationPaths(originalPaths, instance, { root, baseRef: anchor.base_commit });
    for (const entry of instance.authorized_changes ?? []) {
        if (entry.change === 'EXECUTE_ONLY' || entry.path === record.baseline.target_instance_record_path) continue;
        if (!sameBlob(root, anchor.base_commit, baseRef, entry.path)) {
            fail(`${record.correction_id}: STALE_TARGET; main cambió ${entry.path}.`);
        }
    }
    const delta = pathsForRange(root, `${anchor.head_commit}..${headRef}`)
        .filter((entry) => sameBlob(root, anchor.base_commit, baseRef, entry)
            || !sameBlob(root, baseRef, headRef, entry));
    assertCorrectionPaths([...new Set([...delta, ...dirtyPaths])], record, {
        root, baseRef: anchor.head_commit,
    });
    return { originalPaths, correctionPaths: delta };
}

function authorizedScope(record) {
    const writable = new Map();
    const executeOnly = new Set();
    for (const entry of record.authorized_changes ?? []) {
        if (String(entry.repo ?? '').trim() !== SHELL_REPOSITORY) continue;
        const relativePath = normalizePath(entry.path);
        const change = String(entry.change ?? '').trim().toUpperCase();
        if (change === 'EXECUTE_ONLY') executeOnly.add(relativePath);
        else writable.set(relativePath, change);
    }
    return { writable, executeOnly };
}

function pathExistsAtRef(root, ref, relativePath) {
    return git(root, ['cat-file', '-e', `${ref}:${relativePath}`], { allowFailure: true }).status === 0;
}

export function classifyCorrectionPath(filePath, record, {
    root = process.cwd(),
    baseRef = `origin/${DEFAULT_BRANCH}`,
    registration = false,
} = {}) {
    const normalized = normalizePath(filePath);
    if (!normalized) return 'OTHER';
    const recordPath = correctionRecordRelativePath(record.correction_id);
    if (normalized === recordPath) return 'CORRECTION_RECORD';
    if (DERIVED_CORRECTION_PROJECTIONS.has(normalized)) return 'DERIVED_PROJECTION';
    if (registration) return 'OTHER';
    if (normalized.startsWith('docs/plan-canonico/modular/implementation-instances/')) return 'IMMUTABLE_IMPLEMENTATION_LEDGER';

    const scope = authorizedScope(record);
    if (scope.executeOnly.has(normalized)) return 'EXECUTE_ONLY';
    if (!scope.writable.has(normalized)) return 'OTHER';

    if (normalized.startsWith('supabase/migrations/') && pathExistsAtRef(root, baseRef, normalized)) {
        return 'IMMUTABLE_HISTORICAL_MIGRATION';
    }
    return 'AUTHORIZED';
}

export function assertCorrectionPaths(paths, record, options = {}) {
    const normalized = [...new Set((paths ?? []).map(normalizePath).filter(Boolean))].sort();
    const classified = normalized.map((relativePath) => ({
        path: relativePath,
        kind: classifyCorrectionPath(relativePath, record, options),
    }));
    const immutableMigration = classified.filter((entry) => entry.kind === 'IMMUTABLE_HISTORICAL_MIGRATION').map((entry) => entry.path);
    if (immutableMigration.length > 0) fail(`Una corrección no puede editar migraciones Supabase históricas: ${immutableMigration.join(', ')}.`);
    const immutableLedger = classified.filter((entry) => entry.kind === 'IMMUTABLE_IMPLEMENTATION_LEDGER').map((entry) => entry.path);
    if (immutableLedger.length > 0) fail(`Una corrección no puede modificar implementation-instances históricos: ${immutableLedger.join(', ')}.`);
    const executeOnly = classified.filter((entry) => entry.kind === 'EXECUTE_ONLY').map((entry) => entry.path);
    if (executeOnly.length > 0) fail(`La corrección declara EXECUTE_ONLY y no autoriza escritura sobre: ${executeOnly.join(', ')}.`);
    const unknown = classified.filter((entry) => entry.kind === 'OTHER').map((entry) => entry.path);
    if (unknown.length > 0) fail(`Hay archivos fuera de authorized_changes de la corrección: ${unknown.join(', ')}.`);
    return classified;
}

export function assertVerifiedCorrectionImmutable({ root = process.cwd(), baseRef, headRef, correctionId } = {}) {
    const id = normalizeCorrectionId(correctionId);
    const relativePath = correctionRecordRelativePath(id);
    if (!pathExistsAtRef(root, baseRef, relativePath)) return true;
    const baseRecord = JSON.parse(sourceAtRef(root, baseRef, relativePath));
    if (baseRecord.status !== 'VERIFIED') return true;
    const baseSource = sourceAtRef(root, baseRef, relativePath);
    const headSource = sourceAtRef(root, headRef, relativePath);
    if (baseSource !== headSource) fail(`${id}: una corrección VERIFIED es inmutable.`);
    return true;
}

function pathsForRange(root, range) {
    return git(root, ['diff', '--name-only', range]).stdout
        .split(/\r?\n/u)
        .map((entry) => entry.trim())
        .filter(Boolean);
}

function baseRefFromRange(range) {
    const match = /^(.+?)\.{2,3}(.+)$/u.exec(String(range ?? '').trim());
    if (!match) fail(`rango Git inválido: ${range || 'VACÍO'}.`);
    return match[1];
}

export function resolveCorrectionFromHeadRef({ root = process.cwd(), headRef } = {}) {
    const correctionId = correctionIdFromHeadRef(headRef);
    const control = loadValidatedCorrectionControl({ root });
    const entry = correctionRecord(control, correctionId);
    if (!entry) fail(`No existe ${correctionId} en correction-instances.`);
    return entry.record;
}

export function checkCorrectionScope({ root = process.cwd(), range, headRef } = {}) {
    const record = resolveCorrectionFromHeadRef({ root, headRef });
    const baseRef = baseRefFromRange(range);
    const paths = pathsForRange(root, range);
    const registration = isCorrectionRegistrationHeadRef(headRef);
    assertBaselineCurrent({ root, record, ref: baseRef });
    if (record.integration && !registration) {
        if (record.status !== 'VERIFIED') fail(`${record.correction_id}: integración conjunta exige VERIFIED.`);
        assertPreMergeCorrectionScope({ root, record, baseRef, headRef: range.split(/\.{2,3}/u)[1] });
    } else assertCorrectionPaths(paths, record, { root, baseRef, registration });
    if (registration && record.status !== 'PENDING_AUTHORIZATION') {
        fail(`${record.correction_id}: correction-register/* solo admite PENDING_AUTHORIZATION.`);
    }
    assertVerifiedCorrectionImmutable({ root, baseRef, headRef: range.split(/\.{2,3}/u)[1], correctionId: record.correction_id });
    return { record, paths, registration };
}

function parseArgs(argv) {
    const args = { mode: 'check', correctionId: null, range: null, headRef: null };
    const tokens = [...argv];
    if (tokens[0] && !tokens[0].startsWith('--')) args.mode = tokens.shift();
    for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index];
        const value = tokens[index + 1];
        if (token === '--check') args.mode = 'check';
        else if (token === '--correction-id') {
            if (!value) fail('falta valor de --correction-id.');
            args.correctionId = value;
            index += 1;
        } else if (token === '--range') {
            if (!value) fail('falta valor de --range.');
            args.range = value;
            index += 1;
        } else if (token === '--correction-head-ref') {
            if (!value) fail('falta valor de --correction-head-ref.');
            args.headRef = value;
            index += 1;
        } else fail(`argumento desconocido: ${token}.`);
    }
    return args;
}

export function main(argv = process.argv.slice(2)) {
    const args = parseArgs(argv);
    if (args.mode === 'check') {
        const control = loadValidatedCorrectionControl();
        console.log(`OK: correction-control válido; ${control.records.length} registro(s).`);
        return control;
    }
    if (args.mode === 'status') {
        const control = loadValidatedCorrectionControl();
        if (args.correctionId) {
            const entry = correctionRecord(control, args.correctionId);
            if (!entry) fail(`${args.correctionId} no existe.`);
            console.log(JSON.stringify(entry.record, null, 2));
            return entry.record;
        }
        const rows = openCorrections(control);
        console.log(JSON.stringify(rows, null, 2));
        return rows;
    }
    if (args.mode === 'scope-check') {
        if (!args.range || !args.headRef) fail('scope-check exige --range y --correction-head-ref.');
        const result = checkCorrectionScope({ range: args.range, headRef: args.headRef });
        console.log(`OK: alcance ${result.record.correction_id}; ${result.paths.length} archivo(s) autorizados.`);
        return result;
    }
    fail(`modo desconocido: ${args.mode}.`);
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
