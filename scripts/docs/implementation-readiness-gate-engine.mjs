import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const IMPLEMENTATION_READINESS_GATE_ENGINE_MODEL_ID = 'VENTO-IMPLEMENTATION-READINESS-GATE-ENGINE-V1';
export const IMPLEMENTATION_READINESS_GATE_STATE_TYPE = 'IMPLEMENTATION_READINESS_GATE_STATE_V1';
export const IMPLEMENTATION_READINESS_GATE_INPUT_PATH = '.delivery/implementation-readiness-gate-input.json';
export const IMPLEMENTATION_READINESS_GATE_IDS = Object.freeze(
  Array.from({ length: 15 }, (_, index) => `READY-GATE-${String(index + 1).padStart(3, '0')}`),
);

const GATE_MODES = Object.freeze({
  'READY-GATE-001': 'AUTO',
  'READY-GATE-002': 'AUTO',
  'READY-GATE-003': 'HUMAN_EVIDENCE',
  'READY-GATE-004': 'HUMAN_EVIDENCE',
  'READY-GATE-005': 'AUTO',
  'READY-GATE-006': 'HUMAN_EVIDENCE',
  'READY-GATE-007': 'HUMAN_EVIDENCE',
  'READY-GATE-008': 'AUTO',
  'READY-GATE-009': 'HUMAN_EVIDENCE',
  'READY-GATE-010': 'HUMAN_EVIDENCE',
  'READY-GATE-011': 'AUTO',
  'READY-GATE-012': 'EXTERNAL_EXERCISE',
  'READY-GATE-013': 'AUTO',
  'READY-GATE-014': 'AUTO',
  'READY-GATE-015': 'HUMAN_DECISION',
});

const ALLOWED_GATE_STATUSES = new Set(['PASS', 'FAIL', 'BLOQUEADO', 'NO_APLICA']);
const ALLOWED_FINAL_DECISIONS = new Set(['APROBAR_ENTRADA', 'DENEGAR_ENTRADA', 'BLOQUEAR_DECISION', 'NO_APLICA']);

function fail(message) {
  throw new Error(message);
}


function packageIdFromInstance(instanceId) {
  const match = /^SHELL-CI-021::(GAP-PKG-\d{3})$/u.exec(String(instanceId ?? '').trim());
  return match?.[1] ?? null;
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex');
}

function readJsonObject(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function splitTableRow(line) {
  const trimmed = String(line ?? '').trim();
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return [];
  return trimmed.slice(1, -1).split('|').map((cell) => cell.trim().replace(/^`|`$/gu, ''));
}

export function deriveDecisionOwnerFromPackageCatalog(source, packageId) {
  const lines = String(source ?? '').split(/\r?\n/u);
  let ownerIndex = -1;
  let packageIndex = -1;
  for (const line of lines) {
    const cells = splitTableRow(line);
    if (cells.length === 0) {
      ownerIndex = -1;
      packageIndex = -1;
      continue;
    }
    if (cells.includes('Responsable de decisión') && cells.some((cell) => /^(Paquete|package_id)$/iu.test(cell))) {
      ownerIndex = cells.indexOf('Responsable de decisión');
      packageIndex = cells.findIndex((cell) => /^(Paquete|package_id)$/iu.test(cell));
      continue;
    }
    if (ownerIndex < 0 || packageIndex < 0) continue;
    if (/^[-: ]+$/u.test(cells.join(''))) continue;
    if (cells[packageIndex] === packageId && cells[ownerIndex]) return cells[ownerIndex];
  }
  return null;
}

function readinessStateEntry(instance) {
  const entries = (instance?.evidence ?? []).filter((entry) => (
    entry && typeof entry === 'object' && !Array.isArray(entry)
    && entry.type === IMPLEMENTATION_READINESS_GATE_STATE_TYPE
  ));
  return entries.at(-1) ?? null;
}

export function replaceImplementationReadinessGateState(instance, state) {
  if (!instance || typeof instance !== 'object' || Array.isArray(instance)) fail('INSTANCE_INVALID');
  if (!state || state.type !== IMPLEMENTATION_READINESS_GATE_STATE_TYPE) fail('READINESS_GATE_STATE_INVALID');
  return {
    ...instance,
    evidence: [
      ...(instance.evidence ?? []).filter((entry) => !(
        entry && typeof entry === 'object' && !Array.isArray(entry)
        && entry.type === IMPLEMENTATION_READINESS_GATE_STATE_TYPE
      )),
      state,
    ],
  };
}

function physicalFingerprint({ instance, request, packageId }) {
  return sha256(stableJson({
    instance_id: instance.instance_id,
    package_id: packageId,
    candidate_commit: request.candidate_commit,
    validation_commands: request.validation_commands ?? [],
    target_environments: request.target_environments ?? [],
  }));
}

function gateResult({ id, status, mode = GATE_MODES[id], evidence = [], reason = null, requiredEvidence = [], dependencies = [], owner = null, reused = false }) {
  if (!IMPLEMENTATION_READINESS_GATE_IDS.includes(id)) fail(`READY_GATE_ID_INVALID:${id}`);
  if (!ALLOWED_GATE_STATUSES.has(status)) fail(`READY_GATE_STATUS_INVALID:${id}:${status}`);
  return Object.freeze({
    gate_id: id,
    evaluation_mode: mode,
    status,
    evidence: Object.freeze([...evidence]),
    blocking_reason: reason,
    required_evidence: Object.freeze([...requiredEvidence]),
    dependencies: Object.freeze([...dependencies]),
    owner,
    reused,
  });
}

function evidenceText(value) {
  return stableJson(value).toUpperCase();
}

function priorExecutionEvidence(ci020) {
  return (ci020?.evidence ?? []).find((entry) => (
    entry && typeof entry === 'object' && !Array.isArray(entry)
    && entry.type === 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1'
  )) ?? null;
}

function priorGateReusable(previous, gateId, fingerprint) {
  if (!previous || previous.physical_fingerprint !== fingerprint) return null;
  const gate = (previous.gates ?? []).find((entry) => entry?.gate_id === gateId) ?? null;
  if (!gate || !['PASS', 'NO_APLICA'].includes(gate.status)) return null;
  if (['READY-GATE-014', 'READY-GATE-015'].includes(gateId)) return null;
  return gateResult({ ...gate, id: gateId, reused: true });
}

function normalizeInput({ input, instance, request, fingerprint }) {
  if (!input) return {};
  if (input.schema_version !== 1) fail('READINESS_GATE_INPUT_SCHEMA_INVALID');
  if (input.instance_id !== instance.instance_id) fail('READINESS_GATE_INPUT_INSTANCE_MISMATCH');
  if (input.candidate_commit !== request.candidate_commit) fail('READINESS_GATE_INPUT_CANDIDATE_MISMATCH');
  if (input.physical_fingerprint !== fingerprint) fail('READINESS_GATE_INPUT_FINGERPRINT_MISMATCH');
  return input;
}

function requiredFieldsPresent(object, fields) {
  return fields.every((field) => {
    const value = object?.[field];
    if (Array.isArray(value)) return value.length > 0 && value.every((entry) => String(entry ?? '').trim());
    if (typeof value === 'boolean') return value === true;
    return Boolean(String(value ?? '').trim());
  });
}

function applicabilityFromCorpus(corpus, patterns) {
  return patterns.some((pattern) => pattern.test(corpus));
}

function resolveInputsFromRoot({ root, packageId }) {
  const base = path.join(root, 'docs', 'plan-canonico', 'modular');
  const ci020 = readJsonObject(path.join(base, 'implementation-instances', `SHELL-CI-020__${packageId}.json`));
  const packageGate = readJsonObject(path.join(base, 'package-gate-instances', `${packageId}.json`));
  const packageCatalogPath = path.join(base, 'bloques', 'E5_PLANIFICACION_DE_IMPLEMENTACION', '02_PAQUETES_DE_IMPLEMENTACION.md');
  const packageCatalog = fs.existsSync(packageCatalogPath) ? fs.readFileSync(packageCatalogPath, 'utf8') : '';
  const input = readJsonObject(path.join(root, ...IMPLEMENTATION_READINESS_GATE_INPUT_PATH.split('/')));
  return { ci020, packageGate, packageCatalog, input };
}

export function evaluateImplementationReadinessGates({
  root = process.cwd(),
  instance,
  request,
  now = new Date().toISOString(),
  supplied = null,
} = {}) {
  if (!instance || typeof instance !== 'object' || Array.isArray(instance)) fail('READINESS_INSTANCE_INVALID');
  const packageId = packageIdFromInstance(instance.instance_id);
  if (!packageId) return Object.freeze({ applies: false, reason: 'INSTANCE_NOT_CI021_PACKAGE' });
  if (instance.status !== 'IMPLEMENTED') fail(`${instance.instance_id}: readiness gate engine exige IMPLEMENTED.`);
  if (!request || typeof request !== 'object' || Array.isArray(request)) fail('READINESS_REQUEST_INVALID');
  if (request.instance_id !== instance.instance_id) fail('READINESS_REQUEST_INSTANCE_MISMATCH');
  if (!/^[a-f0-9]{40}$/u.test(String(request.candidate_commit ?? ''))) fail('READINESS_CANDIDATE_INVALID');
  if (!/^[a-f0-9]{40}$/u.test(String(request.lifecycle_head_commit ?? ''))) fail('READINESS_LIFECYCLE_HEAD_INVALID');
  if (request.candidate_lifecycle?.decision !== 'REUSE_PHYSICAL_EVIDENCE') fail('READINESS_CANDIDATE_LIFECYCLE_NOT_REUSABLE');

  const inputs = supplied ?? resolveInputsFromRoot({ root, packageId });
  const ci020 = inputs.ci020 ?? null;
  const packageGate = inputs.packageGate ?? null;
  const packageCatalog = String(inputs.packageCatalog ?? '');
  const priorExecution = priorExecutionEvidence(ci020);
  const fingerprint = physicalFingerprint({ instance, request, packageId });
  const previous = readinessStateEntry(instance);
  const input = normalizeInput({ input: inputs.input ?? null, instance, request, fingerprint });
  const decisionOwner = deriveDecisionOwnerFromPackageCatalog(packageCatalog, packageId)
    ?? request.target_environments?.[0]?.owner
    ?? null;
  const corpus = evidenceText({
    ci020_authorized_changes: ci020?.authorized_changes ?? [],
    ci020_operational_evidence: priorExecution?.operational_evidence ?? [],
    package_gate: packageGate,
  });
  const gates = [];
  const set = (result) => gates.push(result);
  const reused = (id) => priorGateReusable(previous, id, fingerprint);

  const g001Reuse = reused('READY-GATE-001');
  if (g001Reuse) set(g001Reuse);
  else {
    const environments = priorExecution?.environment_results ?? [];
    const targets = request.target_environments ?? [];
    const evidence = [];
    let pass = targets.length > 0 && environments.length >= targets.length;
    for (const target of targets) {
      const match = environments.find((entry) => (
        entry?.target_id === target?.target_id
        && entry?.environment_role === target?.environment_role
        && entry?.status === 'PASS'
        && Array.isArray(entry?.evidence)
        && entry.evidence.length > 0
      ));
      if (!match) pass = false;
      else evidence.push(...match.evidence.map((entry) => String(entry)));
    }
    set(pass
      ? gateResult({ id: 'READY-GATE-001', status: 'PASS', evidence })
      : gateResult({
        id: 'READY-GATE-001', status: 'BLOQUEADO', reason: 'DEPLOYMENT_OR_ENVIRONMENT_EVIDENCE_MISSING',
        requiredEvidence: ['environment_results PASS correlated to the exact package target environments'],
      }));
  }

  const noDbEvidence = /SUPABASE_MUTATIONS=0[^\n]*DATABASE_MUTATIONS=0/u.test(corpus)
    || /NO SUPABASE MUTATION OR DATABASE MIGRATION/u.test(corpus);
  if (noDbEvidence) set(gateResult({ id: 'READY-GATE-002', status: 'NO_APLICA', evidence: ['NO_DATABASE_MUTATION_DECLARED'] }));
  else if (applicabilityFromCorpus(corpus, [/SUPABASE\//u, /MIGRATION/u, /DATABASE/u, /\bDDL\b/u, /\bDML\b/u])) {
    const proof = input.database_readiness ?? null;
    set(requiredFieldsPresent(proof, ['status', 'evidence_refs']) && String(proof.status).toUpperCase() === 'PASS'
      ? gateResult({ id: 'READY-GATE-002', status: 'PASS', evidence: proof.evidence_refs })
      : gateResult({ id: 'READY-GATE-002', status: 'BLOQUEADO', reason: 'DATABASE_READINESS_EVIDENCE_REQUIRED', requiredEvidence: ['database_readiness.status=PASS', 'database_readiness.evidence_refs[]'] }));
  } else set(gateResult({ id: 'READY-GATE-002', status: 'NO_APLICA', evidence: ['NO_DATABASE_SCOPE_DETECTED'] }));

  const conditionalGate = ({ id, patterns, inputKey, fields, label }) => {
    const previousGate = reused(id);
    if (previousGate) return set(previousGate);
    if (!applicabilityFromCorpus(corpus, patterns)) return set(gateResult({ id, status: 'NO_APLICA', evidence: [`NO_${label}_SCOPE_DETECTED`] }));
    const proof = input[inputKey] ?? null;
    if (requiredFieldsPresent(proof, fields)) {
      return set(gateResult({ id, status: 'PASS', evidence: proof.evidence_refs ?? [`${inputKey.toUpperCase()}_CONFIRMED`] }));
    }
    return set(gateResult({ id, status: 'BLOQUEADO', reason: `${label}_EVIDENCE_REQUIRED`, requiredEvidence: fields.map((field) => `${inputKey}.${field}`) }));
  };

  conditionalGate({ id: 'READY-GATE-003', patterns: [/PERMISSION/u, /RLS/u, /DEVICE POLICY/u, /AUTHORIZATION MATRIX/u], inputKey: 'permissions_readiness', fields: ['status', 'evidence_refs'], label: 'PERMISSIONS' });
  conditionalGate({ id: 'READY-GATE-004', patterns: [/USER/u, /ROLE/u, /SEDE/u, /SHIFT/u, /TURNO/u], inputKey: 'operational_identity_readiness', fields: ['status', 'evidence_refs'], label: 'OPERATIONAL_IDENTITY' });

  const g005Reuse = reused('READY-GATE-005');
  if (g005Reuse) set(g005Reuse);
  else {
    const pass = packageGate?.status === 'APPROVED_FOR_IMPLEMENTATION'
      && (packageGate?.canonical_snapshot?.package_id === packageId || packageGate?.package_id === packageId);
    set(pass
      ? gateResult({ id: 'READY-GATE-005', status: 'PASS', evidence: [`PACKAGE_GATE:${packageId}:APPROVED_FOR_IMPLEMENTATION`] })
      : gateResult({ id: 'READY-GATE-005', status: 'BLOQUEADO', reason: 'CANONICAL_PACKAGE_GATE_NOT_APPROVED', requiredEvidence: [`package-gate ${packageId} APPROVED_FOR_IMPLEMENTATION`] }));
  }

  conditionalGate({ id: 'READY-GATE-006', patterns: [/INTEGRATION/u, /WEBHOOK/u, /CREDENTIAL/u, /SECRET/u, /PROVIDER/u], inputKey: 'integration_readiness', fields: ['status', 'evidence_refs'], label: 'INTEGRATION' });
  conditionalGate({ id: 'READY-GATE-007', patterns: [/HARDWARE/u, /PRINTER/u, /TABLET/u, /DEVICE/u, /PERIPHERAL/u], inputKey: 'hardware_readiness', fields: ['status', 'evidence_refs'], label: 'HARDWARE' });

  const g008Reuse = reused('READY-GATE-008');
  if (g008Reuse) set(g008Reuse);
  else {
    const pass = /ROLLBACK_STRATEGY|CONTINGENCY|RUNBOOK/u.test(corpus);
    set(pass
      ? gateResult({ id: 'READY-GATE-008', status: 'PASS', evidence: ['PROCEDURE_OR_CONTINGENCY_EVIDENCE_PRESENT'] })
      : gateResult({ id: 'READY-GATE-008', status: 'BLOQUEADO', reason: 'PROCEDURE_OR_CONTINGENCY_EVIDENCE_REQUIRED', requiredEvidence: ['rollback/contingency/runbook evidence'] }));
  }

  conditionalGate({ id: 'READY-GATE-009', patterns: [/TRAINING/u, /CAPACIT/u, /ADOPTION/u, /KNOWLEDGE/u], inputKey: 'training_readiness', fields: ['status', 'evidence_refs'], label: 'TRAINING' });

  const support = input.support ?? null;
  const supportFields = ['titular', 'suplente', 'coverage_window', 'levels', 'escalation', 'ownership_confirmed'];
  if (requiredFieldsPresent(support, supportFields)) {
    set(gateResult({ id: 'READY-GATE-010', status: 'PASS', owner: decisionOwner, evidence: support.evidence_refs ?? ['NOMINAL_SUPPORT_CONFIRMED'] }));
  } else {
    set(gateResult({ id: 'READY-GATE-010', status: 'BLOQUEADO', owner: decisionOwner, reason: 'NOMINAL_SUPPORT_EVIDENCE_REQUIRED', requiredEvidence: supportFields.map((field) => `support.${field}`) }));
  }

  const gate001 = gates.find((entry) => entry.gate_id === 'READY-GATE-001');
  const g011Reuse = reused('READY-GATE-011');
  if (g011Reuse) set(g011Reuse);
  else if (gate001?.status === 'PASS') set(gateResult({ id: 'READY-GATE-011', status: 'PASS', dependencies: ['READY-GATE-001'], evidence: ['OBSERVABILITY_BOUND_TO_DEPLOYMENT_EVIDENCE'] }));
  else set(gateResult({ id: 'READY-GATE-011', status: 'BLOQUEADO', dependencies: ['READY-GATE-001'], reason: 'DEPLOYMENT_OBSERVABILITY_NOT_PROVEN', requiredEvidence: ['READY-GATE-001 PASS'] }));

  const rollback = input.rollback_exercise ?? null;
  const expectedEnvironmentIds = new Set((request.target_environments ?? []).map((entry) => entry.target_id));
  const rollbackValid = requiredFieldsPresent(rollback, ['result', 'executed_at', 'environment_id', 'candidate_commit', 'evidence_refs', 'restore_verified'])
    && String(rollback.result).toUpperCase() === 'PASS'
    && Number.isFinite(Date.parse(String(rollback.executed_at)))
    && rollback.candidate_commit === request.candidate_commit
    && expectedEnvironmentIds.has(rollback.environment_id)
    && rollback.restore_verified === true
    && rollback.production_mutations !== true;
  if (rollbackValid) {
    set(gateResult({ id: 'READY-GATE-012', status: 'PASS', owner: decisionOwner, evidence: rollback.evidence_refs }));
  } else {
    set(gateResult({
      id: 'READY-GATE-012', status: 'BLOQUEADO', owner: decisionOwner,
      reason: 'AUTHORIZED_ROLLBACK_EXERCISE_REQUIRED',
      requiredEvidence: [
        'rollback_exercise.result=PASS', 'rollback_exercise.executed_at', 'rollback_exercise.environment_id',
        'rollback_exercise.candidate_commit', 'rollback_exercise.evidence_refs[]', 'rollback_exercise.restore_verified=true',
        'rollback_exercise.production_mutations!=true',
      ],
    }));
  }

  const g013Reuse = reused('READY-GATE-013');
  const localResultsPass = (request.results ?? []).length === (request.validation_commands ?? []).length
    && (request.results ?? []).every((entry) => ['PASS', 'NOT_APPLICABLE'].includes(entry?.status));
  if (g013Reuse) set(g013Reuse);
  else if (gate001?.status === 'PASS' && localResultsPass) set(gateResult({ id: 'READY-GATE-013', status: 'PASS', dependencies: ['READY-GATE-001'], evidence: ['LOCAL_VALIDATION_AND_ENVIRONMENT_BASELINE_PASS'] }));
  else set(gateResult({ id: 'READY-GATE-013', status: 'BLOQUEADO', dependencies: ['READY-GATE-001'], reason: 'PRE_PILOT_BASELINE_INCOMPLETE', requiredEvidence: ['READY-GATE-001 PASS', 'all local validation results PASS/NOT_APPLICABLE'] }));

  const before014 = gates.filter((entry) => /^READY-GATE-0(?:0[1-9]|1[0-3])$/u.test(entry.gate_id));
  const failCount = before014.filter((entry) => entry.status === 'FAIL').length;
  const blockedCount = before014.filter((entry) => entry.status === 'BLOQUEADO').length;
  if (failCount > 0) set(gateResult({ id: 'READY-GATE-014', status: 'FAIL', dependencies: before014.filter((entry) => entry.status === 'FAIL').map((entry) => entry.gate_id), reason: 'PRIOR_READY_GATE_FAILED' }));
  else if (blockedCount > 0) set(gateResult({ id: 'READY-GATE-014', status: 'BLOQUEADO', dependencies: before014.filter((entry) => entry.status === 'BLOQUEADO').map((entry) => entry.gate_id), reason: 'PRIOR_READY_GATE_BLOCKED' }));
  else set(gateResult({ id: 'READY-GATE-014', status: 'PASS', dependencies: before014.map((entry) => entry.gate_id), evidence: ['READY_GATES_001_013_CLEAR'] }));

  const gate014 = gates.find((entry) => entry.gate_id === 'READY-GATE-014');
  const decision = input.pilot_entry_decision ?? null;
  if (gate014?.status !== 'PASS') {
    set(gateResult({ id: 'READY-GATE-015', status: 'BLOQUEADO', owner: decisionOwner, dependencies: ['READY-GATE-014'], reason: 'READY_GATE_014_NOT_PASS', requiredEvidence: ['READY-GATE-014 PASS'] }));
  } else if (!decision) {
    set(gateResult({ id: 'READY-GATE-015', status: 'BLOQUEADO', owner: decisionOwner, dependencies: ['READY-GATE-014'], reason: 'PILOT_ENTRY_HUMAN_DECISION_REQUIRED', requiredEvidence: ['pilot_entry_decision.decision', 'pilot_entry_decision.authority', 'pilot_entry_decision.approved_by', 'pilot_entry_decision.approved_at'] }));
  } else {
    const normalizedDecision = String(decision.decision ?? '').toUpperCase();
    const valid = ALLOWED_FINAL_DECISIONS.has(normalizedDecision)
      && decision.authority === decisionOwner
      && String(decision.approved_by ?? '').trim()
      && Number.isFinite(Date.parse(String(decision.approved_at ?? '')));
    if (!valid) {
      set(gateResult({ id: 'READY-GATE-015', status: 'BLOQUEADO', owner: decisionOwner, dependencies: ['READY-GATE-014'], reason: 'PILOT_ENTRY_DECISION_INVALID', requiredEvidence: [`authority=${decisionOwner ?? 'UNRESOLVED'}`, 'valid approved_by/approved_at/decision'] }));
    } else if (normalizedDecision === 'APROBAR_ENTRADA') {
      set(gateResult({ id: 'READY-GATE-015', status: 'PASS', owner: decisionOwner, dependencies: ['READY-GATE-014'], evidence: [`PILOT_ENTRY_DECISION:${normalizedDecision}`, `APPROVED_BY:${decision.approved_by}`] }));
    } else if (normalizedDecision === 'NO_APLICA') {
      set(gateResult({ id: 'READY-GATE-015', status: 'NO_APLICA', owner: decisionOwner, dependencies: ['READY-GATE-014'], evidence: [`PILOT_ENTRY_DECISION:${normalizedDecision}`] }));
    } else {
      set(gateResult({ id: 'READY-GATE-015', status: 'BLOQUEADO', owner: decisionOwner, dependencies: ['READY-GATE-014'], reason: `PILOT_ENTRY_DECISION_${normalizedDecision}`, evidence: [`PILOT_ENTRY_DECISION:${normalizedDecision}`] }));
    }
  }

  const summary = {
    pass_count: gates.filter((entry) => entry.status === 'PASS').length,
    fail_count: gates.filter((entry) => entry.status === 'FAIL').length,
    blocked_count: gates.filter((entry) => entry.status === 'BLOQUEADO').length,
    not_applicable_count: gates.filter((entry) => entry.status === 'NO_APLICA').length,
    blocked_gates: gates.filter((entry) => entry.status === 'BLOQUEADO').map((entry) => entry.gate_id),
  };
  const proposedState = {
    type: IMPLEMENTATION_READINESS_GATE_STATE_TYPE,
    schema_version: 1,
    model_id: IMPLEMENTATION_READINESS_GATE_ENGINE_MODEL_ID,
    instance_id: instance.instance_id,
    package_id: packageId,
    candidate_commit: request.candidate_commit,
    lifecycle_head_commit: request.lifecycle_head_commit,
    physical_fingerprint: fingerprint,
    observed_at: now,
    decision_owner: decisionOwner,
    target_environments: request.target_environments ?? [],
    gates,
    summary,
    input_path: IMPLEMENTATION_READINESS_GATE_INPUT_PATH,
  };
  const comparable = (value) => stableJson({
    type: value?.type,
    schema_version: value?.schema_version,
    model_id: value?.model_id,
    instance_id: value?.instance_id,
    package_id: value?.package_id,
    candidate_commit: value?.candidate_commit,
    physical_fingerprint: value?.physical_fingerprint,
    decision_owner: value?.decision_owner,
    target_environments: value?.target_environments,
    gates: value?.gates,
    summary: value?.summary,
    input_path: value?.input_path,
  });
  const state = previous && previous.physical_fingerprint === fingerprint
    && comparable(previous) === comparable(proposedState)
    ? previous
    : proposedState;

  const finalGate = gates.find((entry) => entry.gate_id === 'READY-GATE-015');
  const complete = finalGate?.status === 'PASS';
  const finalReceipt = complete ? {
    ...request,
    observed_at: now,
    environment_results: (request.target_environments ?? []).map((target) => ({
      ...target,
      status: 'PASS',
      evidence: [
        `READINESS_GATE_ENGINE:${IMPLEMENTATION_READINESS_GATE_ENGINE_MODEL_ID}`,
        `READINESS_STATE_SHA256:${sha256(stableJson(state))}`,
      ],
    })),
    operational_evidence: [
      `READINESS_GATE_ENGINE:${IMPLEMENTATION_READINESS_GATE_ENGINE_MODEL_ID}`,
      `READINESS_GATES_001_014:PASS`,
      `READY_GATE_015:APROBAR_ENTRADA owner=${decisionOwner}`,
      `READINESS_STATE_SHA256:${sha256(stableJson(state))}`,
    ],
    readiness_gate_state: state,
  } : null;

  return Object.freeze({
    applies: true,
    complete,
    state,
    finalReceipt,
    nextGate: summary.blocked_gates[0] ?? (complete ? 'COMPLETE' : 'READY-GATE-015'),
    inputPath: IMPLEMENTATION_READINESS_GATE_INPUT_PATH,
  });
}
