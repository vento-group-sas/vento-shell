import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTaskBlocks } from './format-canonical-task.mjs';
import {
  metadataFromTaskBlock,
  readCanonicalTaskInventory,
  validateProspectiveTaskSemantics,
  validateTaskDevelopmentPolicy,
  validateTaskSemanticContract,
} from './task-semantic-contract.mjs';
import { writeCurrentTaskDevelopmentArtifacts } from './task-development-artifacts.mjs';

export function selectQualityTask(argv, branch) {
  if (argv.length) {
    if (argv.length !== 2 || argv[0] !== '--task-id' || !/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}$/u.test(argv[1])) {
      throw new Error('Uso: npm run docs:task:quality -- --task-id AUTH-UI-044');
    }
    return argv[1];
  }
  const match = branch.match(/^task\/([a-z][a-z0-9]*(?:-[a-z0-9]+)+-\d{3})$/u);
  return match ? match[1].toUpperCase() : null;
}

export function validateTaskArtifact({ root = process.cwd(), taskId, artifactPath }) {
  const inventory = readCanonicalTaskInventory(root);
  const owner = inventory.get(taskId);
  if (!owner) throw new Error(`${taskId}: no existe en el inventario canónico.`);

  const buffer = fs.readFileSync(artifactPath);
  const source = buffer.toString('utf8').replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
  if (!buffer.equals(Buffer.from(buffer.toString('utf8'), 'utf8'))) {
    throw new Error(`${artifactPath}: el descargable no es UTF-8 válido.`);
  }
  const blocks = parseTaskBlocks(source);
  if (blocks.length !== 1 || blocks[0].index !== 0 || blocks[0].id !== taskId) {
    throw new Error(`${artifactPath}: se requiere exactamente el bloque ${taskId} desde la primera línea.`);
  }
  const candidate = blocks[0];
  if (candidate.marker !== '✅' || candidate.title !== owner.title) {
    throw new Error(`${taskId}: el marcador debe ser ✅ y el título debe coincidir con el canónico.`);
  }
  if (metadataFromTaskBlock(candidate.block).get('Estado') !== 'APROBADA') {
    throw new Error(`${taskId}: el descargable debe declarar Estado APROBADA.`);
  }

  const policyPath = path.join(root, 'docs/plan-canonico/modular/task-development-policy.json');
  const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
  const policyErrors = validateTaskDevelopmentPolicy(policy);
  if (policyErrors.length > 0) throw new Error(`política semántica inválida: ${policyErrors.join('; ')}`);
  const result = validateTaskSemanticContract({
    block: candidate.block,
    task: { id: taskId, state: 'APROBADA' },
    ownerRelativePath: owner.relativePath,
    inventory,
    policy,
  });
  return result;
}

export function main(argv = process.argv.slice(2)) {
  if (argv.length === 4 && argv[0] === '--task-id' && argv[2] === '--artifact') {
    const taskId = selectQualityTask(argv.slice(0, 2), '');
    const result = validateTaskArtifact({ taskId, artifactPath: argv[3] });
    for (const warning of result.warnings) console.warn(`[TASK QUALITY] ${warning.code}: ${warning.message}`);
    if (result.errors.length) throw new Error(result.errors.map(({ code, message }) => `${code}: ${message}`).join('\n'));
    console.log(`OK: descargable ${taskId}; contrato semántico; ${result.warnings.length} advertencia(s); repositorio sin escrituras.`);
    return;
  }
  const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
  const taskId = selectQualityTask(argv, branch);
  const result = validateProspectiveTaskSemantics({ taskId });
  for (const warning of result.warnings) console.warn(`[TASK QUALITY] ${warning.code}: ${warning.message}`);
  if (result.errors.length) throw new Error(result.errors.map(({ code, message }) => `${code}: ${message}`).join('\n'));
  const artifacts = writeCurrentTaskDevelopmentArtifacts({ taskId });
  console.log(`OK: contrato semántico ${result.preflight.task.id}; ${result.warnings.length} advertencia(s).`);
  if (!artifacts.skipped) console.log(`OK: brief y diff local de ${artifacts.semantic.preflight.task.id}; ${artifacts.diff.classification}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(`ERROR: ${error.message}`); process.exitCode = 1; }
}
