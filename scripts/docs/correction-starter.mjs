import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    CORRECTION_STARTER_PROJECTION,
    correctionBranchName,
    correctionRecordRelativePath,
    loadValidatedCorrectionControl,
    openCorrections,
} from './correction-control.mjs';

function actionFor(record) {
    switch (record.status) {
        case 'PENDING_AUTHORIZATION': return 'AUTORIZAR_CORRECCION';
        case 'AUTHORIZED': return 'INICIAR_CORRECCION';
        case 'IN_PROGRESS': return 'CONTINUAR_CORRECCION';
        case 'BLOCKED': return 'RESOLVER_BLOQUEO';
        case 'IMPLEMENTED': return 'VALIDAR_CORRECCION';
        case 'VERIFIED': return 'CERRAR_CORRECCION';
        case 'DEFERRED': return 'REANUDAR_O_MANTENER_DIFERIDA';
        default: return 'REVISAR_CORRECCION';
    }
}

function list(values, empty = 'NONE') {
    return Array.isArray(values) && values.length > 0
        ? values.map((value) => `- ${typeof value === 'string' ? value : JSON.stringify(value)}`).join('\n')
        : `- ${empty}`;
}

function nativeOperations(record) {
    return [
        '- Preparar: npm run docs:correction:prepare',
        '- Registrar: npm run docs:correction:register',
        '- Autorizar: npm run docs:correction:authorize',
        `- Iniciar: npm run docs:correction:start -- --correction-id ${record.correction_id}`,
        `- Avanzar/completar: npm run docs:correction:advance -- --correction-id ${record.correction_id}`,
        `- Checkpoint limpio: npm run docs:correction:checkpoint -- --correction-id ${record.correction_id}`,
        '- Despliegue Supabase gobernado cuando corresponda: npm run docs:correction:supabase:deploy',
        `- Estado: npm run docs:correction:status -- --correction-id ${record.correction_id}`,
        `- Cerrar: npm run docs:correction:finish -- --correction-id ${record.correction_id}`,
    ].join('\n');
}

export function buildCorrectionStarter({ root = process.cwd() } = {}) {
    const control = loadValidatedCorrectionControl({ root });
    const open = openCorrections(control).sort((left, right) => {
        const leftTime = Date.parse(left.opened_at) || 0;
        const rightTime = Date.parse(right.opened_at) || 0;
        return leftTime - rightTime || left.correction_id.localeCompare(right.correction_id, 'en');
    });

    if (open.length === 0) {
        return `VENTO OS — INICIADOR CANÓNICO DE CORRECCIONES\n\nINTENT_LOCK: CORRECTION\nCONVERSATION_LANE: CORRECTION\nDO_NOT_SWITCH_LANES: TRUE\n\nESTADO\n\nNO EXISTE UNA CORRECCIÓN ABIERTA.\n\n- Política: scripts/docs/correction-control.json — VENTO_CANONICAL_CORRECTION_LIFECYCLE_V1\n- Ledger: docs/plan-canonico/modular/correction-instances\n- Una corrección histórica no se infiere ni se crea automáticamente.\n- El usuario debe solicitar explícitamente abrir una corrección sobre una tarea aprobada.\n- Las instancias VERIFIED y las migraciones Supabase históricas permanecen inmutables.\n- Toda corrección física usa nueva forward migration cuando aplique.\n- Una corrección bloqueante libera sus objetivos únicamente cuando queda VERIFIED en main.\n- La autorización se materializa con docs:correction:authorize; no se edita el JSON del ledger a mano.\n- start y checkpoint normalizan EOL, validan scope, commitean por carril, publican y deben terminar WORKTREE CLEAN.\n- La certificación remota nunca se ejecuta sobre un candidato dirty.\n- El despliegue Supabase gobernado es resumible: si la migración ya está aplicada, no se vuelve a ejecutar.\n\nCOMANDOS DE CONTROL\n\n- Estado: npm run docs:correction:status\n- Validación: npm run docs:correction:check\n- Autorización nativa: npm run docs:correction:authorize\n- Checkpoint nativo: npm run docs:correction:checkpoint\n- Despliegue Supabase gobernado: npm run docs:correction:supabase:deploy\n\nNo autorices, inicies ni cierres una corrección inexistente.\n`;
    }

    const record = open[0];
    const branch = correctionBranchName(record.correction_id);
    const recordPath = correctionRecordRelativePath(record.correction_id);
    const action = `${actionFor(record)}${record.integration ? " (PRE_MERGE: conservar SHA original y validar candidato nuevo; ver scripts/docs/pre-merge-physical-corrections.md)" : ""}\n- Política: ${control.policy.policy_id}`;
    return `VENTO OS — INICIADOR CANÓNICO DE CORRECCIONES\n\nINTENT_LOCK: CORRECTION\nCONVERSATION_LANE: CORRECTION\nDO_NOT_SWITCH_LANES: TRUE\n\nREGLA CRÍTICA DE ESTA CONVERSACIÓN\n\nEsta conversación trabaja EXCLUSIVAMENTE ${record.correction_id}.\nNo reabra ni reescriba la tarea o instancia histórica como si nunca hubiera sido aprobada o VERIFIED.\nNo absorba alcance de otra tarea. La corrección restaura conformidad y no crea capacidad nueva.\n\nACCIÓN ACTUAL\n\n- Acción: ${action}\n- Corrección: ${record.correction_id}\n- Tarea objetivo: ${record.task_id}\n- Instancia objetivo: ${record.target_instance_id ?? 'NO_APLICA'}\n- Tipo: ${record.correction_type}\n- Motivo: ${record.reason_code}\n- Estado: ${record.status}\n- Registro: ${recordPath}\n- Rama física: ${branch}\n- Bloqueante: ${record.blocking ? 'SI' : 'NO'}\n\nOBJETIVOS BLOQUEADOS\n\n${list(record.blocked_targets)}\n\nALCANCE AUTORIZADO\n\nRepositorios:\n${list(record.target_repositories, 'NINGUNO AUTORIZADO TODAVÍA')}\n\nCambios:\n${list(record.authorized_changes, 'NINGUNO AUTORIZADO TODAVÍA')}\n\nVALIDACIONES AUTORIZADAS\n\n${list(record.validation_commands, 'NINGUNA AUTORIZADA TODAVÍA')}\n\nTREQ AFECTADOS\n\n${list(record.affected_treq_ids, 'NONE')}\n\nLIFECYCLE\n\nPENDING_AUTHORIZATION -> AUTHORIZED -> IN_PROGRESS -> IMPLEMENTED -> VERIFIED -> MERGE A main\nBLOCKED y DEFERRED son estados laterales. VERIFIED es inmutable.\n\nOPERACIONES NATIVAS\n\n${nativeOperations(record)}\n\nREGLAS OPERATIVAS\n\n- PENDING_AUTHORIZATION: no iniciar trabajo. La aprobación humana explícita se materializa con docs:correction:authorize. Está prohibido editar directamente el JSON del ledger para autorizar.\n- AUTHORIZED: abrir exclusivamente con npm run docs:correction:start -- --correction-id ${record.correction_id}.\n- CORRECTION_START debe terminar con WORKTREE CLEAN y rama remota sincronizada 0/0. No se hace checkpoint manual después de start.\n- IN_PROGRESS: materializar solo authorized_changes.\n- docs:correction:advance es la entrada normal para continuar una corrección activa después de materializar authorized_changes; gobierna quality:repair exactamente una vez, transición a IMPLEMENTED, validation_commands, sella VERIFIED solo con PASS completo y cierre state-aware.\n- Antes de toda certificación remota: ejecutar npm run docs:correction:checkpoint -- --correction-id ${record.correction_id}; debe terminar WORKTREE CLEAN.\n- Si Supabase requiere despliegue remoto autorizado, usar docs:correction:supabase:deploy. El comando debe validar exactamente las migraciones pendientes, ser resumible y rechazar PRODUCTION.\n- Si la migración Supabase ya fue aplicada, el flujo debe continuar como ALREADY_APPLIED y no repetir db push.\n- environment-drift conserva fail-closed: nunca se relaja candidate.git_tree. El lifecycle debe entregar un candidato limpio antes de invocarlo.\n- La normalización de EOL/BOM pertenece al lifecycle; no se corrigen archivos del ledger con PowerShell u otras ediciones externas.\n- Antes de IMPLEMENTED: ejecutar exactamente una vez npm run quality:repair y conservar evidencia.\n- IMPLEMENTED: ejecutar validation_commands en orden fail-fast y registrar resultados atribuibles.\n- VERIFIED: cerrar exclusivamente con npm run docs:correction:finish -- --correction-id ${record.correction_id}.\n- El cierre crea/actualiza PR hacia main, espera VENTO Required Gate y mergea únicamente el HEAD validado.\n- Si baseline cambia antes del cierre, STALE_TARGET bloquea el merge y exige reconciliación.\n- Si esta corrección es bloqueante, sus objetivos continúan bloqueados hasta VERIFIED_ON_MAIN.\n\nREGISTRO ACTIVO EXACTO\n\n\`\`\`json\n${JSON.stringify(record, null, 2)}\n\`\`\`\n`;
}

export function writeCorrectionStarter({ root = process.cwd(), check = false } = {}) {
    const source = buildCorrectionStarter({ root });
    const outputPath = path.join(root, ...CORRECTION_STARTER_PROJECTION.split('/'));
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    const changed = current !== source;
    if (check && changed && fs.existsSync(outputPath)) {
        throw new Error(`${CORRECTION_STARTER_PROJECTION} está desactualizado; ejecute npm run docs:correction:starter.`);
    }
    if (!check && changed) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, source, 'utf8');
    }
    return { source, outputPath, changed };
}

function main() {
    const unknown = process.argv.slice(2).filter((argument) => argument !== '--check');
    if (unknown.length > 0) throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
    const result = writeCorrectionStarter({ check: process.argv.includes('--check') });
    console.log(`OK: iniciador de correcciones ${result.changed ? 'actualizado' : 'vigente'}.`);
    console.log(`CORRECTION: ${CORRECTION_STARTER_PROJECTION}`);
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
