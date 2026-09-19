import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
  IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID,
  assessRepositoryBundleMaterialization,
  buildImplementationRepositoryPlan,
  buildRepositoryBundleCandidateEvidence,
  reconcileRepositoryBundleCandidateEvidence,
  validatePublishedRepositoryBundleEvidence,
  validateRepositoryBundleCandidateEvidence,
} from './implementation-repository-bundle.mjs';

const ID = 'SHELL-CI-020::GAP-PKG-045';
const BRANCH = 'implementation/shell-ci-020/gap-pkg-045';

function record() {
  return {
    instance_id: ID,
    target_repositories: ['vento-group-sas/vento-shell', 'vento-group-sas/vento-nexo'],
    authorized_changes: [
      { repo: 'vento-group-sas/vento-shell', path: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-045.json', change: 'MODIFY' },
      { repo: 'vento-group-sas/vento-shell', path: 'src/app/page.tsx', change: 'MODIFY' },
      { repo: 'vento-group-sas/vento-nexo', path: 'src/components/vento/standard/vento-shell.tsx', change: 'MODIFY' },
    ],
  };
}

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(String(result.stderr || result.stdout));
  return String(result.stdout ?? '').trim();
}

function seedRepository(root, relativePath, content) {
  fs.mkdirSync(path.join(root, path.dirname(relativePath)), { recursive: true });
  git(root, ['init', '-b', 'main']);
  git(root, ['config', 'user.email', 'corr019@test.invalid']);
  git(root, ['config', 'user.name', 'CORR019']);
  fs['write' + 'FileSync'](path.join(root, relativePath), content, 'utf8');
  git(root, ['add', '--', relativePath]);
  git(root, ['commit', '-m', 'base']);
  git(root, ['remote', 'add', 'origin', root]);
  git(root, ['fetch', 'origin', 'main']);
}

test('plan multi-repo conserva repositorios independientes', () => {
  const plan = buildImplementationRepositoryPlan({ shellRoot: '/workspace/vento-shell', instance: record(), verifyCheckouts: false });
  assert.equal(plan.model_id, IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID);
  assert.equal(plan.multi_repo, true);
  assert.equal(plan.repository_count, 2);
  assert.deepEqual(plan.repositories.map((entry) => entry.repository), ['vento-group-sas/vento-nexo', 'vento-group-sas/vento-shell']);
  assert.notEqual(plan.repositories[0].root, plan.repositories[1].root);
});

test('materializacion exige paths de todos los repos y excluye ledger', () => {
  const pending = assessRepositoryBundleMaterialization({ instance: record(), changes: [
    { repository: 'vento-group-sas/vento-shell', paths: ['src/app/page.tsx'] },
    { repository: 'vento-group-sas/vento-nexo', paths: [] },
  ] });
  assert.equal(pending.ready, false);
  assert.deepEqual(pending.missing, ['vento-group-sas/vento-nexo:src/components/vento/standard/vento-shell.tsx']);
  const complete = assessRepositoryBundleMaterialization({ instance: record(), changes: [
    { repository: 'vento-group-sas/vento-shell', paths: ['src/app/page.tsx'] },
    { repository: 'vento-group-sas/vento-nexo', paths: ['src/components/vento/standard/vento-shell.tsx'] },
  ] });
  assert.equal(complete.ready, true);
});

test('CORR-019 separa candidato fisico de lifecycle HEAD y solo reconcilia vento-shell', (context) => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-corr019-bundle-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const shellRoot = path.join(parent, 'vento-shell');
  const nexoRoot = path.join(parent, 'vento-nexo');
  fs.mkdirSync(shellRoot, { recursive: true });
  fs.mkdirSync(nexoRoot, { recursive: true });
  seedRepository(shellRoot, 'src/app/page.tsx', 'base-shell\n');
  seedRepository(nexoRoot, 'src/components/vento/standard/vento-shell.tsx', 'base-nexo\n');
  git(shellRoot, ['switch', '-c', BRANCH]);
  git(nexoRoot, ['switch', '-c', BRANCH]);
  fs['write' + 'FileSync'](path.join(nexoRoot, 'src/components/vento/standard/vento-shell.tsx'), 'candidate-nexo\n', 'utf8');
  git(nexoRoot, ['add', '--', 'src/components/vento/standard/vento-shell.tsx']);
  git(nexoRoot, ['commit', '-m', 'nexo candidate']);
  const nexoCandidate = git(nexoRoot, ['rev-parse', 'HEAD']);

  const plan = buildImplementationRepositoryPlan({ shellRoot, instance: record(), verifyCheckouts: false });
  const stale = buildRepositoryBundleCandidateEvidence({ plan });
  const staleShell = stale.repositories.find((entry) => entry.repository === 'vento-group-sas/vento-shell');
  const staleNexo = stale.repositories.find((entry) => entry.repository === 'vento-group-sas/vento-nexo');
  assert.equal(staleNexo.candidate_commit, nexoCandidate);

  fs['write' + 'FileSync'](path.join(shellRoot, 'src/app/page.tsx'), 'physical-shell\n', 'utf8');
  git(shellRoot, ['add', '--', 'src/app/page.tsx']);
  git(shellRoot, ['commit', '-m', 'physical candidate']);
  const physicalCandidate = git(shellRoot, ['rev-parse', 'HEAD']);
  fs.mkdirSync(path.join(shellRoot, 'docs/plan-canonico/modular/implementation-instances'), { recursive: true });
  fs['write' + 'FileSync'](path.join(shellRoot, 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-045.json'), '{"status":"IMPLEMENTED"}\n', 'utf8');
  git(shellRoot, ['add', '--', 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-045.json']);
  git(shellRoot, ['commit', '-m', 'lifecycle head']);
  const lifecycleHead = git(shellRoot, ['rev-parse', 'HEAD']);
  assert.notEqual(physicalCandidate, lifecycleHead);
  assert.equal(staleShell.candidate_commit, git(shellRoot, ['merge-base', 'origin/main', physicalCandidate]));

  const reconciled = reconcileRepositoryBundleCandidateEvidence({
    plan,
    evidence: stale,
    orchestratorCandidateCommit: physicalCandidate,
  });
  assert.equal(reconciled.updated, true);
  const fixedShell = reconciled.evidence.repositories.find((entry) => entry.repository === 'vento-group-sas/vento-shell');
  const fixedNexo = reconciled.evidence.repositories.find((entry) => entry.repository === 'vento-group-sas/vento-nexo');
  assert.equal(fixedShell.candidate_commit, physicalCandidate);
  assert.deepEqual(fixedShell.changed_paths, ['src/app/page.tsx']);
  assert.equal(fixedNexo.candidate_commit, nexoCandidate);
  assert.equal(validateRepositoryBundleCandidateEvidence({ plan, evidence: reconciled.evidence, orchestratorCandidateCommit: physicalCandidate }), true);
  assert.throws(() => validateRepositoryBundleCandidateEvidence({ plan, evidence: reconciled.evidence }), /CANDIDATE_STALE:vento-group-sas\/vento-shell/u);

  const externalDrift = structuredClone(stale);
  externalDrift.repositories.find((entry) => entry.repository === 'vento-group-sas/vento-nexo').candidate_commit = 'f'.repeat(40);
  assert.throws(() => reconcileRepositoryBundleCandidateEvidence({ plan, evidence: externalDrift, orchestratorCandidateCommit: physicalCandidate }), /CANDIDATE_STALE:vento-group-sas\/vento-nexo/u);
});

test('publish evidence exige todos los repos externos', () => {
  assert.equal(validatePublishedRepositoryBundleEvidence({ instance: record(), evidence: {
    type: 'IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_V1', instance_id: ID,
    repositories: [{ repository: 'vento-group-sas/vento-nexo', status: 'MERGED', candidate_commit: 'a'.repeat(40), merge_commit: 'b'.repeat(40), pr: 1 }],
  } }), true);
  assert.throws(() => validatePublishedRepositoryBundleEvidence({ instance: record(), evidence: {
    type: 'IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_V1', instance_id: ID, repositories: [],
  } }), /PUBLISH_SET_MISMATCH/u);
});
