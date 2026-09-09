import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateProspectiveTaskSemantics } from './task-semantic-contract.mjs';
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

export function main(argv = process.argv.slice(2)) {
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
