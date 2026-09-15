import fs from 'node:fs';
import path from 'node:path';

export const PACKAGE_GATE_POLICY_PATH = 'docs/plan-canonico/modular/package-gate-policy.json';

function fail(message) {
  throw new Error(message);
}

function absolute(root, relativePath) {
  return path.join(root, ...String(relativePath).split('/'));
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function completeObjects(values, required) {
  return Array.isArray(values) && values.length > 0
    && values.every((value) => value && required.every((key) => nonEmpty(value[key])));
}

function completeDeploymentEnvironment(value) {
  return Boolean(value)
    && typeof value === 'object'
    && !Array.isArray(value)
    && value.canonical_task_id === 'DELIV-PKG-019'
    && nonEmpty(value.rollout_profile)
    && nonEmpty(value.environment_profile)
    && completeObjects(value.targets, ['environment_role', 'target_type', 'target_id', 'owner'])
    && typeof value.production_authorized === 'boolean';
}

function normalizeDeploymentEnvironment(value) {
  if (!completeDeploymentEnvironment(value)) return null;
  return {
    canonical_task_id: value.canonical_task_id,
    rollout_profile: value.rollout_profile.trim(),
    environment_profile: value.environment_profile.trim(),
    targets: value.targets.map((target) => ({
      environment_role: target.environment_role.trim().toUpperCase(),
      target_type: target.target_type.trim().toUpperCase(),
      target_id: target.target_id.trim(),
      owner: target.owner.trim(),
    })),
    production_authorized: value.production_authorized,
  };
}

export function readPackageGatePolicy(root = process.cwd()) {
  const policyPath = absolute(root, PACKAGE_GATE_POLICY_PATH);
  if (!fs.existsSync(policyPath)) fail(`No existe ${PACKAGE_GATE_POLICY_PATH}.`);
  const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
  const errors = [];
  if (policy.schema_version !== 1) errors.push('schema_version debe ser 1');
  if (policy.storage_mode !== 'ONE_FILE_PER_PACKAGE') errors.push('storage_mode debe ser ONE_FILE_PER_PACKAGE');
  if (policy.automatic_authorization !== false) errors.push('automatic_authorization debe ser false');
  if (policy.approval_word !== 'APROBADO') errors.push('approval_word debe ser APROBADO');
  if (!nonEmpty(policy.instance_directory)) errors.push('instance_directory es obligatorio');
  if (!Array.isArray(policy.statuses) || !policy.statuses.includes('APPROVED_FOR_IMPLEMENTATION')) errors.push('statuses incompletos');
  if (errors.length) fail(`package-gate-policy.json inválido:\n- ${errors.join('\n- ')}`);
  return policy;
}

export function packageGateRecordRelativePath(packageId, policy) {
  if (!/^GAP-PKG-\d{3}$/u.test(String(packageId ?? ''))) fail(`package_id inválido para lifecycle: ${packageId ?? 'EMPTY'}.`);
  return `${policy.instance_directory}/${packageId}.json`;
}

export function assessPackageGateRecord(record, { taskPrerequisites = null, policy, relativePath = null } = {}) {
  const errors = [];
  if (!record || typeof record !== 'object' || Array.isArray(record)) errors.push('el expediente debe ser un objeto JSON');
  if (record?.schema_version !== 1) errors.push('schema_version debe ser 1');
  if (!/^GAP-PKG-\d{3}$/u.test(String(record?.package_id ?? ''))) errors.push('package_id debe usar GAP-PKG-NNN');
  if (!policy.statuses.includes(record?.status)) errors.push(`status no permitido: ${record?.status ?? 'EMPTY'}`);
  if (!nonEmpty(record?.created_at) || !nonEmpty(record?.updated_at)) errors.push('created_at y updated_at son obligatorios');

  const identityComplete = completeObjects(record?.physical_identity?.targets, ['repository', 'path', 'symbol_or_surface', 'operation']);
  const unitsComplete = completeObjects(record?.implementation_units, ['unit_id', 'repository', 'change']);
  const testsComplete = completeObjects(record?.evidence_plan?.tests, ['command', 'expected_result']);
  const observabilityComplete = completeObjects(record?.evidence_plan?.observability, ['signal', 'expected_result']);
  const acceptanceComplete = Array.isArray(record?.evidence_plan?.acceptance_criteria)
    && record.evidence_plan.acceptance_criteria.length > 0
    && record.evidence_plan.acceptance_criteria.every(nonEmpty);
  const rollbackComplete = Array.isArray(record?.evidence_plan?.rollback_steps)
    && record.evidence_plan.rollback_steps.length > 0
    && record.evidence_plan.rollback_steps.every(nonEmpty);
  const deploymentEnvironmentComplete = completeDeploymentEnvironment(record?.deployment_environment);
  const deploymentEnvironment = normalizeDeploymentEnvironment(record?.deployment_environment);
  if (deploymentEnvironment) {
    const targetKeys = deploymentEnvironment.targets.map((target) => (
      `${target.environment_role}:${target.target_type}:${target.target_id}`
    ));
    if (new Set(targetKeys).size !== targetKeys.length) {
      errors.push('deployment_environment.targets contiene destinos duplicados');
    }
    if (
      deploymentEnvironment.production_authorized === false
      && deploymentEnvironment.targets.some((target) => target.environment_role === 'PRODUCTION')
    ) {
      errors.push('deployment_environment no puede incluir PRODUCTION cuando production_authorized=false');
    }
  }
  const evidenceComplete = testsComplete && observabilityComplete && acceptanceComplete && rollbackComplete;
  const tasksComplete = taskPrerequisites ? taskPrerequisites.remaining === 0 : true;
  const authorization = record?.authorization ?? {};
  const approved = authorization.decision === policy.approval_word
    && nonEmpty(authorization.approved_by)
    && nonEmpty(authorization.approved_at)
    && nonEmpty(authorization.approval_ref)
    && nonEmpty(authorization.approval_statement)
    && authorization.approval_statement.includes(policy.approval_word);
  const dossierComplete = identityComplete && unitsComplete && deploymentEnvironmentComplete && evidenceComplete;
  const status = !tasksComplete
    ? 'WAITING_DOCUMENTATION'
    : !dossierComplete
      ? 'MATURATION_DRAFT'
      : !approved
        ? 'READY_FOR_APPROVAL'
        : 'APPROVED_FOR_IMPLEMENTATION';

  if (approved && !tasksComplete) errors.push('la autorización no puede coexistir con tareas prerrequisito pendientes');
  if (approved && !dossierComplete) errors.push('la autorización no puede coexistir con un expediente incompleto');
  if (record?.status === 'APPROVED_FOR_IMPLEMENTATION' && !approved) errors.push('APPROVED_FOR_IMPLEMENTATION exige autorización humana completa');

  const gates = {
    EVIDENCE_023: approved && evidenceComplete,
    PHYSICAL_IDENTITY: approved && identityComplete,
    IMPLEMENTATION_UNIT: approved && unitsComplete,
    FINAL_DECISION_025: approved && tasksComplete && dossierComplete,
  };
  return {
    package_id: record?.package_id ?? null,
    relative_path: relativePath,
    valid: errors.length === 0,
    errors,
    status,
    declared_status: record?.status ?? null,
    tasks_complete: tasksComplete,
    dossier_complete: dossierComplete,
    approval_complete: approved,
    sections: {
      physical_identity: identityComplete,
      implementation_units: unitsComplete,
      deployment_environment: deploymentEnvironmentComplete,
      evidence_plan: evidenceComplete,
    },
    deployment_environment: deploymentEnvironment,
    gates,
  };
}

export function loadPackageGateRecords({ root = process.cwd(), policy = readPackageGatePolicy(root), taskPrerequisitesById = new Map() } = {}) {
  const directory = absolute(root, policy.instance_directory);
  const records = new Map();
  const assessments = new Map();
  const errors = [];
  if (!fs.existsSync(directory)) return { policy, records, assessments, errors };
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const relativePath = `${policy.instance_directory}/${entry.name}`;
    let record;
    try {
      record = JSON.parse(fs.readFileSync(absolute(root, relativePath), 'utf8'));
    } catch (error) {
      errors.push(`${relativePath}: JSON inválido: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
    if (records.has(record.package_id)) errors.push(`${relativePath}: package_id duplicado ${record.package_id}.`);
    if (`${record.package_id}.json` !== entry.name) errors.push(`${relativePath}: el nombre debe ser ${record.package_id}.json.`);
    const assessment = assessPackageGateRecord(record, {
      taskPrerequisites: taskPrerequisitesById.get(record.package_id) ?? null,
      policy,
      relativePath,
    });
    for (const error of assessment.errors) errors.push(`${relativePath}: ${error}.`);
    records.set(record.package_id, record);
    assessments.set(record.package_id, assessment);
  }
  return { policy, records, assessments, errors };
}

export function assertPackageGateRecordsValid(result) {
  if (result.errors.length > 0) fail(`Expedientes package-gate inválidos:\n- ${result.errors.join('\n- ')}`);
  return result;
}
