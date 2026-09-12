import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readPlanSection } from './read-plan-section.mjs';
import {
  readCanonicalTaskInventory,
  validateProspectiveTaskSemantics,
} from './task-semantic-contract.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { deriveImplementationControl } from './implementation-control.mjs';

const POLICY_PATH = 'docs/plan-canonico/modular/implementation-readiness-policy.json';
const APPLICATION_PATH =
  'docs/plan-canonico/modular/bloques/C_CATALOGO/01_APLICACIONES_Y_CONVENCION.md';
const PROCESS_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/01_CATALOGO_DE_PROCESOS.md';
const SCREEN_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/05_CONTRATO_DE_PANTALLAS.md';
const CANONICAL_REFERENCE = /\b[A-Z][A-Z0-9]*(?:-[A-Z0-9_]+)*[-_]\d{3,4}(?!\d)\b/gu;

function clean(cell) {
  return String(cell ?? '').replaceAll('`', '').replaceAll('*', '').trim();
}

function splitRow(line) {
  if (!line.startsWith('|') || !line.endsWith('|')) return null;
  return line.slice(1, -1).split('|').map((cell) => cell.trim());
}

function section(source, startPattern, endPattern) {
  const start = source.search(startPattern);
  if (start < 0) throw new Error(`no se encontró la sección ${startPattern}.`);
  const tail = source.slice(start);
  const end = tail.slice(1).search(endPattern);
  return end < 0 ? tail : tail.slice(0, end + 1);
}

function unique(values) {
  return [...new Set(values)].sort();
}

function markdown(value) {
  return String(value ?? '—').replaceAll('|', '\\|').replace(/\s+/gu, ' ').trim() || '—';
}

function renderList(values) {
  return values.length > 0 ? values.map((value) => `- ${value}`).join('\n') : '- Ninguno detectado.';
}

function appList(cell) {
  if (clean(cell) === '—') return [];
  return [...cell.matchAll(/`([a-z][a-z0-9-]*)`/gu)].map((match) => match[1]);
}

export function parseApplications(source) {
  const catalog = section(
    source,
    /^#### 11\. Catálogo canónico aprobado$/mu,
    /^#### 12\./mu,
  );
  const applications = [];
  for (const line of catalog.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length < 5) continue;
    const code = clean(cells[0]);
    if (!/^[a-z][a-z0-9-]*$/u.test(code) || code === 'código') continue;
    applications.push({
      code,
      name: clean(cells[1]),
      type: clean(cells[2]),
      identityDomain: clean(cells[3]),
      roadmapScope: clean(cells[4]),
      repository: `vento-${code}`,
    });
  }
  if (applications.length === 0) throw new Error('el catálogo de aplicaciones quedó vacío.');
  return applications;
}

export function parseProcessRelationships(source) {
  const ownerTask = section(source, /^### ✅ PROC-CAT-005\b/mu, /^### ✅ PROC-CAT-006\b/mu);
  const consumerTask = section(source, /^### ✅ PROC-CAT-006\b/mu, /^### ✅ PROC-CAT-007\b/mu);
  const owners = new Map();
  const consumers = new Map();
  for (const line of ownerTask.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 7) continue;
    const id = clean(cells[0]);
    if (/^VPROC-\d{4}$/u.test(id)) owners.set(id, clean(cells[3]));
  }
  for (const line of consumerTask.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 6) continue;
    const id = clean(cells[0]);
    if (!/^VPROC-\d{4}$/u.test(id)) continue;
    consumers.set(id, {
      owner: clean(cells[1]),
      direct: appList(cells[2]),
      conditional: appList(cells[3]),
    });
  }
  if (owners.size === 0 || consumers.size !== owners.size) {
    throw new Error(`relaciones de proceso incompletas: ${owners.size} propietarios y ${consumers.size} contratos.`);
  }
  return { owners, consumers };
}

export function parseScreens(source) {
  const task = section(
    source,
    /^### ✅ PROC-SCREEN-002\b/mu,
    /^### (?:✅|🟡|\[~\]|\[ \]) PROC-SCREEN-003\b/mu,
  );
  const screens = new Map();
  for (const line of task.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 6) continue;
    const id = clean(cells[0]);
    if (!/^VSCREEN-\d{4}$/u.test(id)) continue;
    screens.set(id, { id, name: clean(cells[1]), app: clean(cells[2]) });
  }
  if (screens.size === 0) throw new Error('el catálogo de pantallas quedó vacío.');
  return screens;
}

export function buildApplicationReadiness(applications, relationships, screens) {
  return applications.map((application) => {
    const ownedProcesses = [...relationships.owners.values()]
      .filter((owner) => owner === application.code).length;
    const directConsumptions = [...relationships.consumers.values()]
      .reduce((count, item) => count + Number(item.direct.includes(application.code)), 0);
    const conditionalConsumptions = [...relationships.consumers.values()]
      .reduce((count, item) => count + Number(item.conditional.includes(application.code)), 0);
    const screenCount = [...screens.values()].filter((screen) => screen.app === application.code).length;
    const deferred = application.roadmapScope.toLocaleLowerCase('es').includes('diferido');
    const hasProcessCoverage = ownedProcesses + directConsumptions + conditionalConsumptions > 0;
    const status = deferred ? 'DEFERRED' : hasProcessCoverage && screenCount > 0 ? 'BASE_COVERED' : 'PARTIAL';
    const gap = deferred
      ? 'Alcance diferido por el catálogo; no se interpreta como defecto.'
      : !hasProcessCoverage
        ? 'Sin relación de propiedad o consumo de proceso.'
        : screenCount === 0
          ? 'Sin pantalla canónica asignada.'
          : 'Sin brecha estructural en los catálogos base.';
    return {
      ...application,
      ownedProcesses,
      directConsumptions,
      conditionalConsumptions,
      screenCount,
      status,
      gap,
    };
  });
}

function validatePolicy(policy) {
  const errors = [];
  if (policy?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (policy?.mode !== 'CONTROLLED_EXECUTION') errors.push('mode debe ser CONTROLLED_EXECUTION.');
  if (policy?.automatic_state_changes !== false) errors.push('automatic_state_changes debe ser false.');
  if (policy?.implementation_authorized !== false) errors.push('implementation_authorized debe ser false.');
  if (policy?.authorization_source !== 'implementation-control.json') {
    errors.push('authorization_source debe ser implementation-control.json.');
  }
  if (policy?.authorization_records_directory !== 'implementation-instances') {
    errors.push('authorization_records_directory debe ser implementation-instances.');
  }
  for (const key of ['application_readiness_statuses', 'handoff_statuses', 'slice_statuses', 'slices']) {
    if (!Array.isArray(policy?.[key]) || policy[key].length === 0) errors.push(`${key} debe ser un arreglo no vacío.`);
  }
  if (!policy?.slice_statuses?.includes(policy?.initial_slice_status)) {
    errors.push('initial_slice_status debe existir en slice_statuses.');
  }
  const sliceIds = (policy?.slices ?? []).map(({ id }) => id);
  if (new Set(sliceIds).size !== sliceIds.length) errors.push('slices contiene IDs duplicados.');
  for (const key of ['application_matrix', 'current_handoff', 'current_progress', 'progress_directory']) {
    if (typeof policy?.outputs?.[key] !== 'string') errors.push(`outputs.${key} es obligatorio.`);
  }
  for (const output of Object.values(policy?.outputs ?? {})) {
    if (typeof output !== 'string' || !output.startsWith('.delivery/')) {
      errors.push('todos los outputs deben permanecer dentro de .delivery/.');
    }
  }
  if (errors.length > 0) throw new Error(`implementation-readiness-policy.json inválida:\n- ${errors.join('\n- ')}`);
  return policy;
}

function sectionBullets(block, titlePattern, limit = 20) {
  const normalized = block.replace(/\r\n?/gu, '\n');
  const heading = new RegExp(`^####(?:\\s+\\d+\\.)?\\s+.*${titlePattern}.*$`, 'imu');
  const match = heading.exec(normalized);
  if (!match) return [];
  const rest = normalized.slice((match.index ?? 0) + match[0].length);
  const end = rest.search(/^####(?:\s+\d+\.)?\s+/mu);
  const source = end >= 0 ? rest.slice(0, end) : rest;
  return source.split('\n')
    .map((line) => line.trim())
    .filter((line) => /^(?:[-*]|\d+\.)\s+/u.test(line))
    .slice(0, limit);
}

function inferTaskApp(taskId, applicationCodes) {
  const prefix = taskId.split('-')[0].toLowerCase();
  if (prefix === 'shell') return 'shell';
  return applicationCodes.has(prefix) ? prefix : null;
}

export function extractImplementationReferences(block, taskId, catalogs) {
  const all = unique(block.match(CANONICAL_REFERENCE) ?? []);
  const screens = all.filter((id) => /^VSCREEN-/u.test(id));
  const processes = all.filter((id) => /^VPROC-/u.test(id));
  const treq = all.filter((id) => /^TREQ-/u.test(id));
  const tasks = all.filter((id) => (
    id !== taskId && !/^VSCREEN-|^VPROC-|^TREQ-/u.test(id)
  ));
  const repositories = unique(
    block.match(/\bvento-(?:anima|fogo|nexo|numera|origo|pass|pulso|shell|viso|aura)\b/giu) ?? [],
  ).map((value) => value.toLowerCase());
  const applicationCodes = new Set(catalogs.applications.map(({ code }) => code));
  const apps = new Set();
  const inferred = inferTaskApp(taskId, applicationCodes);
  if (inferred) apps.add(inferred);
  for (const repository of repositories) {
    const code = repository.replace(/^vento-/u, '');
    if (applicationCodes.has(code)) apps.add(code);
  }
  for (const screenId of screens) {
    const app = catalogs.screens.get(screenId)?.app;
    if (app) apps.add(app);
  }
  for (const processId of processes) {
    const owner = catalogs.relationships.owners.get(processId);
    if (owner) apps.add(owner);
    const consumers = catalogs.relationships.consumers.get(processId);
    for (const app of [...(consumers?.direct ?? []), ...(consumers?.conditional ?? [])]) apps.add(app);
  }
  return {
    applications: [...apps].sort(),
    repositories,
    screens,
    processes,
    treq,
    tasks,
  };
}

function handoffStatus(semantic) {
  if (semantic.preflight.task.structure === 'EMPTY_DRAFT') return 'PENDING_TASK_DEVELOPMENT';
  if (semantic.errors.length > 0) return 'BLOCKED_BY_CONTRADICTION';
  if (semantic.warnings.length > 0) return 'REVIEW_REQUIRED';
  return 'DOCUMENTED_FOR_FUTURE_IMPLEMENTATION';
}

export function mergeProgress(existing, { taskId, taskTitle, policy, repositories, lifecycle = null }) {
  const progress = existing ?? {
    schema_version: 1,
    task_id: taskId,
    task_title: taskTitle,
    mode: policy.mode,
    implementation_authorized: false,
    created_at: new Date().toISOString(),
    slices: [],
  };
  if (progress.schema_version !== 1 || progress.task_id !== taskId) {
    throw new Error(`el progreso local de ${taskId} no cumple su identidad.`);
  }
  if (progress.implementation_authorized !== false) {
    throw new Error(`el progreso local de ${taskId} no puede autorizar implementación.`);
  }
  if (!Array.isArray(progress.slices)) throw new Error(`el progreso local de ${taskId} no contiene slices.`);
  progress.mode = policy.mode;
  const existingById = new Map(progress.slices.map((slice) => [slice.id, slice]));
  const allowed = new Set(policy.slice_statuses);
  progress.task_title = taskTitle;
  progress.lifecycle_mode = lifecycle?.mode ?? null;
  progress.future_instance_pattern = lifecycle?.instancePattern ?? null;
  progress.slices = policy.slices.map(({ id, title }) => {
    const slice = existingById.get(id) ?? {
      id,
      title,
      status: policy.initial_slice_status,
      target_repositories: repositories,
      evidence: [],
      notes: null,
    };
    if (!allowed.has(slice.status)) throw new Error(`${taskId}/${id} usa el estado inválido ${slice.status}.`);
    if (!Array.isArray(slice.target_repositories) || !Array.isArray(slice.evidence)) {
      throw new Error(`${taskId}/${id} debe declarar target_repositories y evidence como arreglos.`);
    }
    if (['IMPLEMENTED', 'VERIFIED'].includes(slice.status) && slice.evidence.length === 0) {
      throw new Error(`${taskId}/${id} declara ${slice.status} sin evidencia local.`);
    }
    return { ...slice, id, title };
  });
  return progress;
}

function renderApplicationMatrix(rows) {
  const totals = rows.reduce((result, row) => ({
    owners: result.owners + row.ownedProcesses,
    direct: result.direct + row.directConsumptions,
    conditional: result.conditional + row.conditionalConsumptions,
    screens: result.screens + row.screenCount,
  }), { owners: 0, direct: 0, conditional: 0, screens: 0 });
  return `# Matriz automática de preparación documental por aplicación

> Modo \`CONTROLLED_EXECUTION\`. Resume fuentes canónicas existentes; no audita
> código ni autoriza implementación por sí mismo. La autorización física vive en
> \`implementation-control.json\` y siempre corresponde a una instancia exacta.

| App | Repositorio futuro | Roadmap | Procesos propios | Consumos directos | Consumos condicionales | Pantallas | Cobertura base | Observación |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
${rows.map((row) => `| ${markdown(row.code)} — ${markdown(row.name)} | \`${row.repository}\` | ${markdown(row.roadmapScope)} | ${row.ownedProcesses} | ${row.directConsumptions} | ${row.conditionalConsumptions} | ${row.screenCount} | ${row.status} | ${markdown(row.gap)} |`).join('\n')}
| **Total** | — | — | **${totals.owners}** | **${totals.direct}** | **${totals.conditional}** | **${totals.screens}** | — | — |

## Lectura correcta

- \`BASE_COVERED\` significa que los catálogos base relacionan la aplicación con procesos y pantallas.
- \`PARTIAL\` identifica una ausencia estructural que debe resolverse en planeación.
- \`DEFERRED\` conserva una decisión explícita del roadmap.
- Ninguno de estos estados equivale a código implementado, QA operativo o validación física.

## Fuentes

- Catálogo de aplicaciones, sección 11.
- \`PROC-CAT-005\` y \`PROC-CAT-006\`.
- \`PROC-SCREEN-002 / SCREEN-CANONICAL-CATALOG-001\`.
`;
}

// C6_READINESS_EFFECTIVE_OPERATIONAL_PROJECTION
export function readinessEffectiveOperationalProjection(control) {
  const active = control?.physical?.active ?? null;
  return {
    model_id: 'VENTO-IMPLEMENTATION-OPERATIONAL-CONTRACT-V1',
    mutating_entrypoint: 'docs:implementation:advance',
    direct_lifecycle_entrypoints_enabled: false,
    active_instance_id: active?.instanceId ?? null,
    declared_status: active?.declaredStatus ?? active?.record?.status ?? active?.status ?? null,
    effective_status: active?.effectiveStatus ?? active?.status ?? null,
    state_integrity_valid: active?.stateIntegrity ? active.stateIntegrity.status_valid === true : null,
    recovery_action: active?.recoveryAction ?? active?.stateIntegrity?.recovery_action ?? null,
  };
}

function renderEffectiveOperationalProjection(control) {
  const projection = readinessEffectiveOperationalProjection(control);
  return `## Contrato operativo físico efectivo\n\n- **Modelo:** \`${projection.model_id}\`\n- **Entrada mutante normal:** \`${projection.mutating_entrypoint}\`\n- **Entradas directas start/preverify/finish:** \`${projection.direct_lifecycle_entrypoints_enabled ? 'ENABLED' : 'DISABLED'}\`\n- **Instancia activa:** \`${projection.active_instance_id ?? 'NONE'}\`\n- **Estado declarado:** \`${projection.declared_status ?? 'NONE'}\`\n- **Estado efectivo:** \`${projection.effective_status ?? 'NONE'}\`\n- **Integridad válida:** \`${projection.state_integrity_valid == null ? 'N/A' : projection.state_integrity_valid ? 'YES' : 'NO'}\`\n- **Recovery action:** \`${projection.recovery_action ?? 'NONE'}\``;
}

function renderHandoff({ semantic, current, previous, references, status, lifecycle, dependencies, control }) {
  const inherited = previous ? sectionBullets(previous.block, 'Decisiones (?:vinculantes|consolidadas)', 12) : [];
  const limits = sectionBullets(current.block, 'Límites', 20);
  const findings = [...semantic.errors, ...semantic.warnings]
    .map(({ severity, code, message }) => `${severity} · ${code}: ${message}`);
  const repos = unique([
    ...references.repositories,
    ...references.applications.map((code) => `vento-${code}`),
  ]);
  return `# Paquete automático de relevo — ${semantic.preflight.task.id}

> Modo \`CONTROLLED_EXECUTION\`. Este archivo prepara el relevo de la tarea
> documental actual. La acción operativa vinculante es
> \`${control.primaryAction.type} ${control.primaryAction.target}\`; este archivo no
> autoriza por sí mismo código, datos, despliegues ni evidencia física.

${renderEffectiveOperationalProjection(control)}

## Identidad y estado documental

- **Tarea:** ${semantic.preflight.task.id} — ${semantic.preflight.task.title}
- **Estado canónico:** ${semantic.preflight.task.state}
- **Estructura:** ${semantic.preflight.task.structure}
- **Estado del relevo:** ${status}
- **Archivo propietario:** \`docs/plan-canonico/modular/${current.relativePath}\`
- **Última aprobada:** ${semantic.preflight.continuity.previous}
- **Siguiente reservada:** ${semantic.preflight.continuity.next}

## Ciclo de trabajo y dependencias

- **Trabajo canónico actual:** ${lifecycle.canonicalWork}
- **Modalidad posterior:** ${lifecycle.label} (\`${lifecycle.mode}\`)
- **Identidad de instancia:** ${lifecycle.instancePattern ? `\`${lifecycle.instancePattern}\`` : 'No aplica; se reutiliza la definición global.'}
- **Dependencias para desarrollar:** ${dependencies.developmentSource ?? 'Solo la precedencia canónica vigente.'}
- **Dependencias para ejecutar:** ${dependencies.executionSource ?? lifecycle.executionDependencies}
- **Regla contra repetición:** ${lifecycle.executionRule}

## Aplicaciones y repositorios detectados

${renderList(references.applications.map((code) => `\`${code}\``))}

${renderList(repos.map((repository) => `\`${repository}\``))}

## Pantallas

${renderList(references.screens.map((id) => `\`${id}\``))}

## Procesos

${renderList(references.processes.map((id) => `\`${id}\``))}

## Requisitos de prueba

${renderList(references.treq.map((id) => `\`${id}\``))}

## Otras tareas relacionadas

${renderList(references.tasks.map((id) => `\`${id}\``))}

## Decisiones heredadas detectadas

${renderList(inherited)}

## Límites explícitos detectados

${renderList(limits)}

## Hallazgos que condicionan el relevo

${renderList(findings)}

## Instrucción lista para la conversación de análisis

Trabaja únicamente sobre **${semantic.preflight.task.id} — ${semantic.preflight.task.title}**.
Usa como autoridad el archivo propietario indicado arriba y conserva decisiones,
límites, identidades \`VSCREEN-*\`, procesos \`VPROC-*\` y requisitos \`TREQ-*\`.
Propón cortes pequeños, observables y verificables para una implementación futura.
No cambies estados canónicos, no inventes archivos de código no documentados y no
presentes build local como QA remota, operativa o física. Si falta contenido en la
tarea, devuelve primero las preguntas o contradicciones concretas sin implementar.

## Validadores previstos

${renderList(semantic.preflight.validators.map((validator) => `\`${validator}\``))}
`;
}

function renderProgress(progress, relativeProgressPath, control) {
  return `# Progreso observable de implementación futura — ${progress.task_id}

> Modo \`CONTROLLED_EXECUTION\`. Todos los cortes nacen en \`NOT_STARTED\` y el
> generador nunca los avanza. La acción principal actual es
> \`${control.primaryAction.type} ${control.primaryAction.target}\`. El registro editable se conserva en
> \`${relativeProgressPath.replaceAll('\\', '/')}\`.

${renderEffectiveOperationalProjection(control)}

| Corte | Estado | Repositorios objetivo | Evidencia local | Notas |
| --- | --- | --- | --- | --- |
${progress.slices.map((slice) => `| ${markdown(slice.title)} | ${slice.status} | ${markdown(slice.target_repositories.join(', ') || '—')} | ${markdown(slice.evidence.join('; ') || '—')} | ${markdown(slice.notes)} |`).join('\n')}

## Regla de avance

- El watcher solo regenera esta vista.
- Cambiar un estado requiere edición local explícita del JSON.
- \`IMPLEMENTED\` y \`VERIFIED\` requieren evidencia local no vacía.
- Ningún estado local aprueba la tarea ni sustituye evidencia remota, operativa o física.
`;
}

function readCatalogs(root) {
  const applications = parseApplications(readPlanSection(root, APPLICATION_PATH));
  const relationships = parseProcessRelationships(readPlanSection(root, PROCESS_PATH));
  const screens = parseScreens(readPlanSection(root, SCREEN_PATH));
  return { applications, relationships, screens };
}

function readExistingProgress(progressPath) {
  if (!fs.existsSync(progressPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
  } catch (error) {
    throw new Error(`no se pudo leer ${progressPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function prepareImplementationReadinessArtifacts({
  root = process.cwd(),
  write = true,
} = {}) {
  const policy = validatePolicy(JSON.parse(fs.readFileSync(path.join(root, POLICY_PATH), 'utf8')));
  const control = deriveImplementationControl({ root });
  const catalogs = readCatalogs(root);
  const applicationRows = buildApplicationReadiness(
    catalogs.applications,
    catalogs.relationships,
    catalogs.screens,
  );
  for (const row of applicationRows) {
    if (!policy.application_readiness_statuses.includes(row.status)) {
      throw new Error(`${row.code} produjo el estado documental no permitido ${row.status}.`);
    }
  }

  const semantic = validateProspectiveTaskSemantics({ root });
  if (semantic.skipped) return { skipped: true, applicationRows };
  const inventory = readCanonicalTaskInventory(root);
  const current = inventory.get(semantic.preflight.task.id);
  const previous = inventory.get(semantic.preflight.continuity.previous);
  if (!current) throw new Error(`no se pudo resolver ${semantic.preflight.task.id} en el inventario canónico.`);
  const workTopology = resolveTaskWorkTopology({ root });
  const lifecycle = workTopology.topology.get(current.id);
  const dependencies = workTopology.dependencies.get(current.id);
  if (!lifecycle || !dependencies) throw new Error(`no existe topología de trabajo para ${current.id}.`);
  const references = extractImplementationReferences(
    current.block,
    current.id,
    catalogs,
  );
  const status = handoffStatus(semantic);
  if (!policy.handoff_statuses.includes(status)) throw new Error(`estado de relevo no permitido: ${status}.`);

  const progressDirectory = path.join(root, policy.outputs.progress_directory);
  const progressPath = path.join(progressDirectory, `${current.id}.json`);
  const progress = mergeProgress(readExistingProgress(progressPath), {
    taskId: current.id,
    taskTitle: current.title,
    policy,
    repositories: unique([
      ...references.repositories,
      ...references.applications.map((code) => `vento-${code}`),
    ]),
    lifecycle,
  });
  const matrix = renderApplicationMatrix(applicationRows);
  const handoff = renderHandoff({
    semantic,
    current,
    previous,
    references,
    status,
    lifecycle,
    dependencies,
    control,
  });
  const relativeProgressPath = path.relative(root, progressPath);
  const progressView = renderProgress(progress, relativeProgressPath, control);

  if (write) {
    for (const output of [
      policy.outputs.application_matrix,
      policy.outputs.current_handoff,
      policy.outputs.current_progress,
    ]) fs.mkdirSync(path.dirname(path.join(root, output)), { recursive: true });
    fs.mkdirSync(progressDirectory, { recursive: true });
    fs.writeFileSync(path.join(root, policy.outputs.application_matrix), matrix, 'utf8');
    fs.writeFileSync(path.join(root, policy.outputs.current_handoff), handoff, 'utf8');
    fs.writeFileSync(path.join(root, policy.outputs.current_progress), progressView, 'utf8');
    fs.writeFileSync(progressPath, `${JSON.stringify(progress, null, 2)}\n`, 'utf8');
  }

  return {
    skipped: false,
    taskId: current.id,
    status,
    applicationRows,
    references,
    progress,
    matrix,
    handoff,
    progressView,
    control,
  };
}

function main() {
  const unknown = process.argv.slice(2).filter((argument) => argument !== '--check');
  if (unknown.length > 0) throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
  const check = process.argv.includes('--check');
  const result = prepareImplementationReadinessArtifacts({ write: !check });
  if (result.skipped) console.log('OK: preparación documental fuera de la frontera prospectiva.');
  else console.log(
    `OK: preparación documental de ${result.taskId}; ${result.applicationRows.length} aplicaciones; `
    + `relevo ${result.status}; ${check ? 'sin escrituras' : 'artefactos actualizados'}.`,
  );
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
