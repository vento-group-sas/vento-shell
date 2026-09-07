import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import {
  assertPreMergeCorrectionScope,
  assertCorrectionPackageCandidate,
  assertPreMergePrIdentity,
  assertPreMergeValidationEvidence,
  assertRegisteredCorrectionOrigin,
  buildPreMergeIntegration,
  correctionRecordRelativePath,
  correctionCandidateInstance,
  openCorrections,
  loadCorrectionPolicy,
  validateCorrectionControl,
  taskBlockAtRef,
  validatePreMergeIntegration,
} from './correction-control.mjs';
import { buildInPackageCandidateEvidence, READINESS_PATHS } from './package-readiness-scanner.mjs';

const instanceId = 'SHELL-CI-020::GAP-PKG-001';
const ledger = 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-001.json';
const taskPath = 'docs/task.md';
const digest = (source) => crypto.createHash('sha256').update(source).digest('hex');
const pr = { number: 364, state: 'OPEN', isDraft: false, isCrossRepository: false, baseRefName: 'main', headRefName: 'implementation/shell-ci-020/gap-pkg-001', headRefOid: 'a'.repeat(40) };

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-pre-merge-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
  const write = (file, value) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`);
  };
  const commit = (message, files) => { git('add', '--', ...files); git('commit', '-m', message); return git('rev-parse', 'HEAD'); };
  git('init', '-b', 'main');
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.invalid');
  git('config', 'core.autocrlf', 'false');
  write(READINESS_PATHS.contract, fs.readFileSync(READINESS_PATHS.contract, 'utf8'));
  write('docs/plan-canonico/modular/implementation-control.json', fs.readFileSync('docs/plan-canonico/modular/implementation-control.json', 'utf8'));
  write(taskPath, '### [x] SHELL-CI-020 - Implementación\n\n**Estado:** APROBADA\n\nContrato estable.\n');
  write(ledger, { instance_id: instanceId, task_id: 'SHELL-CI-020', status: 'PENDING_AUTHORIZATION' });
  write('src/function.ts', 'export const value = 1;\n');
  const base = commit('main pending', [taskPath, ledger, 'src/function.ts', READINESS_PATHS.contract, 'docs/plan-canonico/modular/implementation-control.json']);
  git('switch', '-c', pr.headRefName);
  const instance = { instance_id: instanceId, task_id: 'SHELL-CI-020', status: 'VERIFIED', authorization: { decision: 'APPROVED' }, evidence: ['historical validation'], authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: 'src/function.ts', change: 'MODIFY' }], target_environments: [{ environment_role: 'STAGING', target_type: 'TEST', target_id: 'synthetic', owner: 'TEST' }] };
  write(ledger, instance);
  write('src/function.ts', 'export const value = 2;\nconst detail = "unused";\n');
  const anchor = commit('verified implementation', [ledger, 'src/function.ts']);
  git('switch', 'main');
  const integration = buildPreMergeIntegration({ root, state: { ...pr, headRefOid: anchor }, targetInstanceId: instanceId });
  const record = {
    schema_version: 1, reason_code: 'IMPLEMENTATION_DEFECT', blocking: false, blocked_targets: [],
    target_repositories: [], affected_treq_ids: [], zero_treq_reason: 'Registro inicial pendiente de autorización física.', authorization: null, opened_at: '2026-09-07T00:00:00Z',
    correction_id: 'SHELL-CI-020::CORR-001', task_id: 'SHELL-CI-020', target_instance_id: instanceId,
    correction_type: 'PHYSICAL', status: 'PENDING_AUTHORIZATION', integration,
    baseline: { main_commit: base, target_task_path: taskPath, target_task_sha256: digest(taskBlockAtRef({ root, ref: anchor, taskId: 'SHELL-CI-020', taskPath })), target_instance_record_path: ledger, target_instance_record_sha256: digest(git('show', `${anchor}:${ledger}`)) },
    authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: 'src/function.ts', change: 'MODIFY' }],
    validation_commands: ['node --test test.mjs'], evidence: [],
  };
  const recordPath = correctionRecordRelativePath(record.correction_id);
  write(recordPath, record);
  commit('register pending correction', [recordPath]);
  git('update-ref', 'refs/remotes/origin/main', 'HEAD');
  return { root, git, write, commit, anchor, base, record, recordPath, instance };
}

test('origen exige PR propio abierto con identidad y SHA exactos', () => {
  assert.equal(assertPreMergePrIdentity(pr, { targetInstanceId: instanceId }), true);
  for (const override of [{ state: 'MERGED' }, { isDraft: true }, { isCrossRepository: true }, { headRefName: 'other' }, { baseRefName: 'other' }, { headRefOid: 'bad' }]) {
    assert.throws(() => assertPreMergePrIdentity({ ...pr, ...override }, { targetInstanceId: instanceId }), /STALE_TARGET/u);
  }
  assert.throws(() => assertPreMergePrIdentity(pr, { targetInstanceId: instanceId, headCommit: 'b'.repeat(40) }), /STALE_TARGET/u);
});

test('registra snapshot VERIFIED aunque main siga pendiente y conserva ambas identidades', (t) => {
  const f = fixture(t);
  assert.equal(validatePreMergeIntegration({ root: f.root, record: f.record }).status, 'VERIFIED');
  const tampered = structuredClone(f.record);
  tampered.integration.head_commit = f.base;
  assert.throws(() => validatePreMergeIntegration({ root: f.root, record: tampered }), /VERIFIED/u);
  assert.throws(() => assertRegisteredCorrectionOrigin({ root: f.root, record: tampered, baseRef: 'main' }), /procedencia registrada/u);
});

test('validación global admite registro en main y autorización con los TREQ reales de GAP-PKG-001', (t) => {
  const f = fixture(t);
  const policy = loadCorrectionPolicy();
  const validate = (record) => validateCorrectionControl({ policy, records: [{ relativePath: f.recordPath, record }] }, {
    root: f.root, workTopology: { inventory: new Map([['SHELL-CI-020', {}]]) },
  });
  assert.equal(validate(f.record).records.length, 1);
  const authorized = { ...f.record, status: 'AUTHORIZED', target_repositories: ['vento-group-sas/vento-shell'], affected_treq_ids: ['TREQ-PROC-1490', 'TREQ-SUPABASE-005', 'TREQ-SUPABASE-006', 'TREQ-SUPABASE-1760'], zero_treq_reason: null, authorization: { decision: 'APPROVED', approved_by: 'TEST', approved_at: '2026-09-07T00:00:00Z', timezone: 'UTC', approval_statement: 'TEST APPROVED', source_contract_sha256: f.record.baseline.target_task_sha256 } };
  assert.equal(validate(authorized).records.length, 1);
  assert.throws(() => validate({ ...authorized, affected_treq_ids: ['TREQ-SUPABASE-17600'] }), /TREQ inválido/u);
  const ordinary = structuredClone(authorized);
  delete ordinary.integration;
  assert.throws(() => validate(ordinary), /debe permanecer VERIFIED/u);
  assert.throws(() => validate({ ...f.record, correction_type: 'DOCUMENTARY', target_instance_id: null }), /DOCUMENTARY/u);
});

test('integra implementación y delta correctivo sin permitir cambios de ledger o alcance', (t) => {
  const f = fixture(t);
  f.git('switch', '-c', 'correction/shell-ci-020/corr-001');
  f.git('merge', '--no-ff', '--no-edit', f.anchor);
  f.write('src/function.ts', 'export const value = 2;\n');
  f.commit('remove unused declaration', ['src/function.ts']);
  const args = { root: f.root, record: f.record, baseRef: 'main' };
  const result = assertPreMergeCorrectionScope(args);
  assert.ok(result.originalPaths.includes(ledger));
  assert.deepEqual(result.correctionPaths, ['src/function.ts']);
  assert.throws(() => assertPreMergeCorrectionScope({ ...args, dirtyPaths: [ledger] }), /inmutable/u);
  assert.throws(() => assertPreMergeCorrectionScope({ ...args, dirtyPaths: ['src/other.ts'] }), /fuera de authorized_changes/u);
  f.write(ledger, { ...f.instance, evidence: ['rewritten'] });
  assert.throws(() => validatePreMergeIntegration(args), /ledger local/u);
});

test('revertir un archivo original al contenido de main sigue exigiendo autorización correctiva', (t) => {
  const f = fixture(t);
  f.git('switch', '-c', 'correction/shell-ci-020/corr-001');
  f.git('merge', '--no-ff', '--no-edit', f.anchor);
  f.write('src/function.ts', 'export const value = 1;\n');
  f.commit('revert implementation', ['src/function.ts']);
  assert.throws(() => assertPreMergeCorrectionScope({ root: f.root, record: { ...f.record, authorized_changes: [] }, baseRef: 'main' }), /fuera de authorized_changes/u);
});

test('merge inicial preserva la autorización local sin reescribir el registro histórico', (t) => {
  const f = fixture(t);
  const authorized = { ...f.record, status: 'AUTHORIZED', authorization: { decision: 'APPROVED' } };
  f.write(f.recordPath, authorized);
  f.git('switch', '-c', 'correction/shell-ci-020/corr-001');
  f.git('merge', '--no-ff', '--no-edit', f.anchor);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(f.root, f.recordPath), 'utf8')), authorized);
  assert.equal(f.git('show', `HEAD:${ledger}`), f.git('show', `${f.anchor}:${ledger}`));
});

test('MRP015-050 usa evidencia del nuevo candidato en el ledger correctivo', (t) => {
  const f = fixture(t);
  const functionPath = 'supabase/functions/correction-test/index.ts';
  f.write(functionPath, 'export const value = 2;\n');
  const record = { ...f.record, authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: functionPath, change: 'CREATE' }] };
  const contract = JSON.parse(fs.readFileSync(path.join(f.root, READINESS_PATHS.contract), 'utf8'));
  const gate = contract.physical_dependencies.supabase_pre_e5_foundation.in_package_candidate_gate;
  const candidate = correctionCandidateInstance(f.instance, record);
  const evidence = buildInPackageCandidateEvidence({ root: f.root, packageId: 'GAP-PKG-001', instance: candidate, gate, candidateHeadSha: f.anchor });
  record.evidence = [evidence];
  const args = { root: f.root, record, instance: f.instance, candidateCommit: f.anchor };
  assert.equal(assertCorrectionPackageCandidate(args), true);
  assert.throws(() => assertCorrectionPackageCandidate({ ...args, candidateCommit: f.base }), /HEAD cambió/u);
  f.write(functionPath, 'export const value = 3;\n');
  assert.throws(() => assertCorrectionPackageCandidate(args), /candidato materializado/u);
  assert.deepEqual(f.instance.evidence, ['historical validation']);
});

test('VERIFIED exige candidato nuevo, resultados completos y evidencia remota vigente', (t) => {
  const f = fixture(t);
  f.git('switch', '-c', 'correction/shell-ci-020/corr-001');
  f.git('merge', '--no-ff', '--no-edit', f.anchor);
  f.write('src/function.ts', 'export const value = 2;\n');
  const candidate = f.commit('new candidate', ['src/function.ts']);
  const record = { ...f.record, status: 'VERIFIED', evidence: [{ type: 'PRE_MERGE_VALIDATION', candidate_commit: candidate, validation_commands: f.record.validation_commands, results: [{ command: f.record.validation_commands[0], status: 'PASS' }], target_environments: f.instance.target_environments, remote_evidence: ['STAGING validated new candidate'] }] };
  const args = { root: f.root, record, instance: f.instance };
  assert.equal(assertPreMergeValidationEvidence(args), true);
  const old = structuredClone(record);
  old.evidence[0].candidate_commit = f.anchor;
  assert.throws(() => assertPreMergeValidationEvidence({ ...args, record: old }), /nueva/u);
  const noRemote = structuredClone(record);
  noRemote.evidence[0].remote_evidence = [];
  assert.throws(() => assertPreMergeValidationEvidence({ ...args, record: noRemote }), /remota nueva/u);
  assert.equal(openCorrections({ root: f.root, records: [{ record }] }, { includeUnpublishedVerified: true }).length, 1);
  assert.equal(openCorrections({ root: f.root, records: [{ record }] }).length, 0, 'proyecciones deterministas no dependen de refs remotas');
  f.write('src/function.ts', 'export const value = 3;\n');
  assert.throws(() => assertPreMergeValidationEvidence(args), /candidato desactualizado/u);
  f.write('src/function.ts', 'export const value = 2;\n');
  f.write(f.recordPath, record);
  f.commit('verify correction', [f.recordPath]);
  f.git('update-ref', 'refs/remotes/origin/main', 'HEAD');
  assert.equal(openCorrections({ root: f.root, records: [{ record }] }, { includeUnpublishedVerified: true }).length, 0);
  f.write('src/function.ts', 'export const value = 3;\n');
  assert.equal(assertPreMergeValidationEvidence(args), true, 'evidencia histórica no impide futuras correcciones');
});
