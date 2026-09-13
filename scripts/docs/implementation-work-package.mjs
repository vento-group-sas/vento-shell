import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { implementationBranchName } from './implementation-branch-lifecycle.mjs';
import { deriveCoordinatedImplementationStatus } from './implementation-readiness-coordinator.mjs';

export const IMPLEMENTATION_WORK_PACKAGE_MODEL_ID = 'VENTO-IMPLEMENTATION-WORK-PACKAGE-V1';
export const IMPLEMENTATION_WORK_PACKAGE_JSON = '.delivery/implementation-work-package.json';
export const IMPLEMENTATION_WORK_PACKAGE_MARKDOWN = '.delivery/implementation-work-package.md';
const EVIDENCE_REQUEST_PATH = '.delivery/implementation-evidence-request.json';
const TERMINAL_STATUSES = new Set(['VERIFIED', 'DEFERRED']);
const AUTHORIZED_STATUSES = new Set(['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED']);

function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex');
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map((entry) => stableJson(entry)).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function normalizedArray(value) {
  return Array.isArray(value) ? value : [];
}

function packageIdFromInstanceId(instanceId) {
  const match = /::([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-PKG-\d{3})$/u.exec(String(instanceId ?? '').trim().toUpperCase());
  return match?.[1] ?? null;
}

function normalizedRecord(instance) {
  const record = instance?.record ?? instance ?? {};
  const integrity = instance?.stateIntegrity ?? null;
  const declaredStatus = String(
    integrity?.declared_status ?? record.status ?? instance?.declaredStatus ?? instance?.status ?? '',
  ).trim().toUpperCase();
  const effectiveStatus = String(
    instance?.effectiveStatus
      ?? (integrity?.status_valid === false ? integrity.highest_valid_status : instance?.status)
      ?? declaredStatus,
  ).trim().toUpperCase();
  return {
    instance_id: String(record.instance_id ?? instance?.instanceId ?? '').trim(),
    task_id: String(record.task_id ?? instance?.taskId ?? '').trim(),
    status: effectiveStatus,
    declared_status: declaredStatus,
    status_valid: integrity ? integrity.status_valid === true : true,
    recovery_action: integrity?.recovery_action ?? null,
    target_repositories: normalizedArray(record.target_repositories ?? instance?.targetRepositories),
    authorized_changes: normalizedArray(record.authorized_changes ?? instance?.authorizedChanges),
    validation_commands: normalizedArray(record.validation_commands ?? instance?.validationCommands),
    target_environments: normalizedArray(record.target_environments ?? instance?.targetEnvironments),
    prerequisite_evidence: normalizedArray(record.prerequisite_evidence),
    evidence: normalizedArray(record.evidence ?? instance?.evidence),
    authorization: record.authorization ?? null,
    blocker: record.blocker ?? instance?.blocker ?? null,
  };
}

function findInstance(coordinatedStatus, instanceId) {
  const id = String(instanceId ?? '').trim();
  if (!id) return null;
  for (const instance of normalizedArray(coordinatedStatus?.physical?.instances)) {
    const normalized = normalizedRecord(instance);
    if (normalized.instance_id === id) return normalized;
  }
  for (const record of normalizedArray(coordinatedStatus?.physical?.recordedInstances)) {
    const normalized = normalizedRecord(record);
    if (normalized.instance_id === id) return normalized;
  }
  return null;
}

function resolveTarget(coordinatedStatus, explicitInstanceId = null) {
  const explicit = String(explicitInstanceId ?? '').trim();
  if (explicit) return findInstance(coordinatedStatus, explicit);
  const active = coordinatedStatus?.physical?.active;
  if (active) return normalizedRecord(active);
  const candidateId = coordinatedStatus?.readinessCandidate?.instanceId;
  if (candidateId) return findInstance(coordinatedStatus, candidateId);
  return null;
}

function stageNumber(taskId) {
  const match = /-(\d{3,4})$/u.exec(String(taskId ?? ''));
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function resolveReference(coordinatedStatus, target, explicitReferenceInstanceId = null) {
  const explicit = String(explicitReferenceInstanceId ?? '').trim();
  if (explicit) return findInstance(coordinatedStatus, explicit);
  const packageId = packageIdFromInstanceId(target?.instance_id)
    ?? coordinatedStatus?.readinessCurrent?.package_id
    ?? null;
  if (!packageId) return null;
  return normalizedArray(coordinatedStatus?.physical?.recordedInstances)
    .map(normalizedRecord)
    .filter((record) => (
      record.status === 'VERIFIED'
      && packageIdFromInstanceId(record.instance_id) === packageId
      && record.validation_commands.length > 0
      && record.evidence.length > 0
    ))
    .sort((left, right) => (
      stageNumber(left.task_id) - stageNumber(right.task_id)
      || left.instance_id.localeCompare(right.instance_id, 'en')
    ))[0] ?? null;
}

function writableChanges(record) {
  return record.authorized_changes.filter((entry) => (
    String(entry?.change ?? '').trim().toUpperCase() !== 'EXECUTE_ONLY'
  ));
}

function executionOnlyChanges(record) {
  return record.authorized_changes.filter((entry) => (
    String(entry?.change ?? '').trim().toUpperCase() === 'EXECUTE_ONLY'
  ));
}

function evidenceMetrics(record) {
  const strings = record.evidence.filter((entry) => typeof entry === 'string');
  return {
    total_entries: record.evidence.length,
    string_entries: strings.length,
    structured_entries: record.evidence.length - strings.length,
    validation_entries: strings.filter((entry) => /^VALIDATION\s/iu.test(entry)).length,
    remote_entries: strings.filter((entry) => /^REMOTE_/iu.test(entry)).length,
    pre_validation_entries: strings.filter((entry) => /^PRE_VALIDATION_/iu.test(entry)).length,
  };
}

function acceleratorSequence(instanceId) {
  if (!instanceId) return [];
  return [
    {
      order: 1,
      precondition: 'INSTANCE_AUTHORIZED',
      purpose: 'START_OR_RESUME_UNTIL_MATERIALIZATION_GATE',
      command: `npm run docs:implementation:advance -- --instance-id ${instanceId}`,
    },
    {
      order: 2,
      precondition: 'AUTHORIZED_PHYSICAL_CHANGES_ALREADY_MATERIALIZED',
      purpose: 'VALIDATE_PUSH_AND_PREPARE_EXTERNAL_EVIDENCE',
      command: `npm run docs:implementation:advance -- --instance-id ${instanceId} --materialized`,
    },
    {
      order: 3,
      precondition: 'REAL_EXTERNAL_EVIDENCE_RECORDED_IN_REQUEST_FILE',
      purpose: 'VALIDATE_EVIDENCE_AND_FINISH',
      command: `npm run docs:implementation:advance -- --instance-id ${instanceId} --evidence-file ${EVIDENCE_REQUEST_PATH}`,
    },
  ];
}

function commandsExecutableNow(target) {
  if (!target || target.status_valid === false) return [];
  const sequence = acceleratorSequence(target.instance_id);
  if (target.status === 'AUTHORIZED') return [sequence[0]];
  if (target.status === 'IN_PROGRESS') return [sequence[1]];
  if (target.status === 'IMPLEMENTED') return [
    {
      order: 1,
      precondition: 'IMPLEMENTED_CANDIDATE',
      purpose: 'PREVERIFY_AND_PREPARE_EXTERNAL_EVIDENCE',
      command: `npm run docs:implementation:advance -- --instance-id ${target.instance_id}`,
    },
  ];
  return [];
}

function comparisonStatus(target) {
  if (!target) return 'NO_CURRENT_PHYSICAL_INSTANCE';
  if (target.status_valid === false) return 'STATE_INTEGRITY_RECOVERY_REQUIRED';
  if (['PENDING_AUTHORIZATION', 'READY_FOR_AUTHORIZATION'].includes(target.status)) {
    return 'PENDING_EXPLICIT_INSTANCE_AUTHORIZATION';
  }
  if (AUTHORIZED_STATUSES.has(target.status)) return 'READY_FOR_MEASURED_ACCELERATOR_RUN';
  if (target.status === 'VERIFIED') return 'TARGET_ALREADY_VERIFIED';
  if (target.status === 'BLOCKED') return 'BLOCKED';
  return 'PENDING_SUPPORTED_STATE';
}

export function buildImplementationWorkPackage({
  coordinatedStatus,
  explicitInstanceId = null,
  referenceInstanceId = null,
} = {}) {
  if (!coordinatedStatus || typeof coordinatedStatus !== 'object' || Array.isArray(coordinatedStatus)) {
    throw new Error('coordinatedStatus es obligatorio.');
  }
  const target = resolveTarget(coordinatedStatus, explicitInstanceId);
  if (explicitInstanceId && !target) {
    throw new Error(`No existe la instancia solicitada ${explicitInstanceId}.`);
  }
  const reference = resolveReference(coordinatedStatus, target, referenceInstanceId);
  const targetWritable = target ? writableChanges(target) : [];
  const targetExecuteOnly = target ? executionOnlyChanges(target) : [];
  const referenceWritable = reference ? writableChanges(reference) : [];
  const referenceExecuteOnly = reference ? executionOnlyChanges(reference) : [];
  const sequence = acceleratorSequence(target?.instance_id ?? null);
  const currentPackage = coordinatedStatus?.readinessCurrent?.package_id
    ?? packageIdFromInstanceId(target?.instance_id)
    ?? null;
  const validationPolicy = coordinatedStatus?.validationEngine?.policy ?? {};
  const operatorPolicy = coordinatedStatus?.executionOperatorPolicy ?? {};
  const status = target?.status ?? 'NONE';
  const payload = {
    schema_version: 1,
    model_id: IMPLEMENTATION_WORK_PACKAGE_MODEL_ID,
    strategic_delivery: 'ENTREGA_2_REDUCIR_TRABAJO_MANUAL_Y_REPETIDO',
    scope: 'DERIVED_OPERATOR_PACKAGE_NO_AUTHORIZATION_NO_EVIDENCE_FABRICATION',
    current_package: currentPackage,
    coordination_source: coordinatedStatus?.coordinationSource ?? null,
    target: target ? {
      instance_id: target.instance_id,
      task_id: target.task_id,
      status,
      declared_status: target.declared_status,
      status_valid: target.status_valid,
      recovery_action: target.recovery_action,
      expected_branch: implementationBranchName(target.instance_id),
      blocker: target.blocker,
      target_repositories: target.target_repositories,
      authorized_changes: target.authorized_changes,
      writable_change_count: targetWritable.length,
      execute_only_change_count: targetExecuteOnly.length,
      validation_commands: target.validation_commands,
      validation_command_count: target.validation_commands.length,
      target_environments: target.target_environments,
      authorization_present: Boolean(target.authorization),
      mutation_authorized: target?.status_valid !== false && AUTHORIZED_STATUSES.has(status),
      terminal: TERMINAL_STATUSES.has(status),
    } : null,
    operator_block: {
      authorization_required: Boolean(target && ['PENDING_AUTHORIZATION', 'READY_FOR_AUTHORIZATION'].includes(status)),
      state_integrity_recovery_required: target?.status_valid === false,
      recovery_action: target?.recovery_action ?? null,
      commands_executable_now: commandsExecutableNow(target),
      post_authorization_sequence: sequence,
      external_evidence_request_path: EVIDENCE_REQUEST_PATH,
      semantic_human_gates: [
        'EXPLICIT_INSTANCE_AUTHORIZATION',
        'AUTHORIZED_PHYSICAL_MATERIALIZATION',
        'REAL_EXTERNAL_OR_OPERATIONAL_EVIDENCE',
      ],
      semantic_human_gate_count: 3,
      accelerated_cli_invocations_from_authorized_to_verified: target ? sequence.length : 0,
      stop_conditions: [
        'COMMAND_FAIL_FAST',
        'REAL_BLOCKER_OR_CONTRADICTION',
        'MISSING_REQUIRED_HUMAN_DECISION_OR_EVIDENCE',
      ],
    },
    historical_reference: reference ? {
      instance_id: reference.instance_id,
      task_id: reference.task_id,
      status: reference.status,
      validation_command_count: reference.validation_commands.length,
      writable_change_count: referenceWritable.length,
      execute_only_change_count: referenceExecuteOnly.length,
      target_environment_count: reference.target_environments.length,
      evidence: evidenceMetrics(reference),
    } : null,
    efficiency_baseline: {
      reference_available: Boolean(reference),
      reference_validation_command_count: reference?.validation_commands.length ?? null,
      reference_evidence_entry_count: reference?.evidence.length ?? null,
      accelerated_cli_invocations_from_authorized_to_verified: target ? sequence.length : null,
      semantic_human_gate_count_before: 3,
      semantic_human_gate_count_after: 3,
      semantic_human_gates_omitted: 0,
      validation_gates_skipped: 0,
      validation_time_comparison_status: 'PENDING_MEASURED_ACCELERATOR_RUN',
      repeated_command_comparison_status: reference ? 'BASELINE_AVAILABLE_TARGET_RUN_PENDING' : 'REFERENCE_UNAVAILABLE',
      evidence_volume_comparison_status: reference ? 'BASELINE_AVAILABLE_TARGET_RUN_PENDING' : 'REFERENCE_UNAVAILABLE',
      human_intervention_comparison_status: 'SEMANTIC_GATES_PRESERVED_CLI_INVOCATIONS_TARGET_RUN_PENDING',
      comparison_status: comparisonStatus(target),
    },
    control_equivalence: {
      automatic_authorization: false,
      automatic_evidence_fabrication: false,
      mutating_entrypoint: coordinatedStatus?.operationalContract?.mutatingEntrypoint
        ?? 'docs:implementation:advance',
      direct_lifecycle_entrypoints_enabled:
        coordinatedStatus?.operationalContract?.directLifecycleEntrypointsEnabled ?? false,
      assistant_repository_writes: operatorPolicy.assistantRepositoryWrites ?? false,
      assistant_validation_execution: operatorPolicy.assistantValidationExecution ?? false,
      assistant_git_operations: operatorPolicy.assistantGitOperations ?? false,
      assistant_remote_mutations: operatorPolicy.assistantRemoteMutations ?? false,
      validation_gates_skipped: 0,
      fail_closed: validationPolicy.failClosed ?? true,
      full_fallback: validationPolicy.fullFallback ?? true,
      candidate_receipt_reuse: validationPolicy.candidateReceiptReuse ?? null,
      remote_reuse: validationPolicy.remoteReuse ?? null,
      authorization_reuse: validationPolicy.authorizationReuse ?? null,
      pr_merge_reuse: validationPolicy.prMergeReuse ?? null,
    },
  };
  return Object.freeze({
    ...payload,
    fingerprint_sha256: sha256(stableJson(payload)),
  });
}

function markdownCell(value) {
  return String(value ?? 'NONE').replaceAll('|', '\\|').replace(/\s+/gu, ' ').trim() || 'NONE';
}

export function renderImplementationWorkPackageMarkdown(model) {
  const target = model.target;
  const reference = model.historical_reference;
  const currentCommands = model.operator_block.commands_executable_now.length > 0
    ? model.operator_block.commands_executable_now.map((entry) => `- \`${entry.command}\` - ${entry.purpose}`).join('\n')
    : '- Ningun comando mutante es ejecutable ahora.';
  const changeRows = target?.authorized_changes?.length > 0
    ? target.authorized_changes.map((entry) => (
      `| \`${markdownCell(entry.repo)}\` | \`${markdownCell(entry.path)}\` | ${markdownCell(entry.change)} | ${markdownCell(entry.scope)} |`
    )).join('\n')
    : '| - | - | - | Sin alcance fisico autorizado. |';
  const validations = target?.validation_commands?.length > 0
    ? target.validation_commands.map((command) => `- \`${command}\``).join('\n')
    : '- Ninguna validacion fisica autorizada todavia.';
  return `# VENTO Implementation Work Package\n\n- Model: \`${model.model_id}\`\n- Current package: \`${model.current_package ?? 'NONE'}\`\n- Target instance: \`${target?.instance_id ?? 'NONE'}\`\n- Target declared status: \`${target?.declared_status ?? 'NONE'}\`\n- Target effective status: \`${target?.status ?? 'NONE'}\`\n- State integrity valid: \`${target ? (target.status_valid ? 'YES' : 'NO') : 'N/A'}\`\n- Recovery action: \`${target?.recovery_action ?? 'NONE'}\`\n- Comparison status: \`${model.efficiency_baseline.comparison_status}\`\n- Fingerprint: \`${model.fingerprint_sha256}\`\n\n## Alcance fisico exacto\n\n| Repo | Path | Change | Scope |\n| --- | --- | --- | --- |\n${changeRows}\n\n## Validaciones declaradas\n\n${validations}\n\n## Comandos ejecutables ahora\n\n${currentCommands}\n\n## Gates humanos preservados\n\n1. Autorizacion explicita de la instancia.\n2. Materializacion fisica dentro del alcance autorizado.\n3. Evidencia externa u operacional real.\n\n## Linea base representativa\n\n- Reference instance: \`${reference?.instance_id ?? 'NONE'}\`\n- Reference validations: ${reference?.validation_command_count ?? 'N/A'}\n- Reference evidence entries: ${reference?.evidence?.total_entries ?? 'N/A'}\n- Accelerated CLI invocations from AUTHORIZED to VERIFIED: ${model.efficiency_baseline.accelerated_cli_invocations_from_authorized_to_verified ?? 'N/A'}\n- Validation time comparison: \`${model.efficiency_baseline.validation_time_comparison_status}\`\n- Validation gates skipped: ${model.efficiency_baseline.validation_gates_skipped}\n\nEste artefacto deriva el trabajo operativo. No autoriza cambios, no fabrica evidencia y no altera el orden canonico.\n`;
}

function validateFingerprint(model) {
  const { fingerprint_sha256: fingerprint, ...payload } = model;
  if (!/^[a-f0-9]{64}$/u.test(String(fingerprint ?? '')) || sha256(stableJson(payload)) !== fingerprint) {
    throw new Error('Fingerprint del work package invalido.');
  }
}

function writeOutputs(root, model) {
  const jsonPath = path.join(root, ...IMPLEMENTATION_WORK_PACKAGE_JSON.split('/'));
  const markdownPath = path.join(root, ...IMPLEMENTATION_WORK_PACKAGE_MARKDOWN.split('/'));
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  const json = `${JSON.stringify(model, null, 2)}\n`;
  const markdown = renderImplementationWorkPackageMarkdown(model);
  fs.writeFileSync(jsonPath, json, 'utf8');
  fs.writeFileSync(markdownPath, markdown, 'utf8');
  return { jsonPath, markdownPath, json, markdown };
}

function checkOutputs(root, model) {
  validateFingerprint(model);
  const jsonPath = path.join(root, ...IMPLEMENTATION_WORK_PACKAGE_JSON.split('/'));
  const markdownPath = path.join(root, ...IMPLEMENTATION_WORK_PACKAGE_MARKDOWN.split('/'));
  const expectedJson = `${JSON.stringify(model, null, 2)}\n`;
  const expectedMarkdown = renderImplementationWorkPackageMarkdown(model);
  if (fs.existsSync(jsonPath) && fs.readFileSync(jsonPath, 'utf8') !== expectedJson) {
    throw new Error(`${IMPLEMENTATION_WORK_PACKAGE_JSON} esta desactualizado.`);
  }
  if (fs.existsSync(markdownPath) && fs.readFileSync(markdownPath, 'utf8') !== expectedMarkdown) {
    throw new Error(`${IMPLEMENTATION_WORK_PACKAGE_MARKDOWN} esta desactualizado.`);
  }
}

function parseArgs(argv) {
  const args = { write: false, check: false, instanceId: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--write') args.write = true;
    else if (token === '--check') args.check = true;
    else if (token === '--instance-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error('Falta valor de --instance-id.');
      args.instanceId = value;
      index += 1;
    } else throw new Error(`Argumento desconocido: ${token}.`);
  }
  if (args.write && args.check) throw new Error('Use --write o --check, no ambos.');
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const coordinatedStatus = await deriveCoordinatedImplementationStatus({ root });
  const model = buildImplementationWorkPackage({
    coordinatedStatus,
    explicitInstanceId: args.instanceId,
  });
  validateFingerprint(model);
  if (args.write) writeOutputs(root, model);
  if (args.check) checkOutputs(root, model);
  if (!args.write && !args.check) console.log(JSON.stringify(model, null, 2));
  else {
    console.log(`IMPLEMENTATION_WORK_PACKAGE: ${model.model_id}`);
    console.log(`TARGET_INSTANCE: ${model.target?.instance_id ?? 'NONE'}`);
    console.log(`TARGET_STATUS: ${model.target?.status ?? 'NONE'}`);
    console.log(`REFERENCE_INSTANCE: ${model.historical_reference?.instance_id ?? 'NONE'}`);
    console.log(`REFERENCE_VALIDATION_COMMANDS: ${model.efficiency_baseline.reference_validation_command_count ?? 'N/A'}`);
    console.log(`REFERENCE_EVIDENCE_ENTRIES: ${model.efficiency_baseline.reference_evidence_entry_count ?? 'N/A'}`);
    console.log(`ACCELERATED_CLI_INVOCATIONS: ${model.efficiency_baseline.accelerated_cli_invocations_from_authorized_to_verified ?? 'N/A'}`);
    console.log(`SEMANTIC_HUMAN_GATES: ${model.efficiency_baseline.semantic_human_gate_count_after}`);
    console.log(`VALIDATION_GATES_SKIPPED: ${model.efficiency_baseline.validation_gates_skipped}`);
    console.log(`VALIDATION_TIME_COMPARISON: ${model.efficiency_baseline.validation_time_comparison_status}`);
    console.log(`COMPARISON_STATUS: ${model.efficiency_baseline.comparison_status}`);
    console.log(`REPORT_JSON: ${IMPLEMENTATION_WORK_PACKAGE_JSON}`);
    console.log(`REPORT_MARKDOWN: ${IMPLEMENTATION_WORK_PACKAGE_MARKDOWN}`);
  }
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  main().catch((error) => {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
