import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
  IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID,
  assessImplementationRepositoryPrState,
  assessRepositoryBundleMaterialization,
  buildImplementationRepositoryPlan,
  buildImplementationRepositoryPrBody,
  buildRepositoryBundleCandidateEvidence,
  classifyImplementationRepositoryChecks,
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
test('publisher construye metadata TREQ canonica para consumers', () => {
  const head = 'a'.repeat(40);
  const body = buildImplementationRepositoryPrBody({
    instanceId: ID,
    repository: 'vento-group-sas/vento-nexo',
    headSha: head,
  });
  assert.match(body, /^VENTO-TREQ-AFFECTED: NONE$/mu);
  const reason = /^VENTO-TREQ-ZERO-REASON: (.+)$/mu.exec(body)?.[1] ?? '';
  assert.ok(reason.length >= 20);
  assert.match(body, new RegExp((ID.replaceAll(':', '\\:')).replaceAll('\\:', ':'), 'u'));
  assert.match(body, /Repositorio: vento-group-sas\/vento-nexo/u);
  assert.match(body, new RegExp((`Candidate: ${head}`).replaceAll('\\:', ':'), 'u'));
});

test('PR consumer canonical se conserva y body stale exige reparacion fail-closed por identidad', () => {
  const head = 'b'.repeat(40);
  const body = buildImplementationRepositoryPrBody({
    instanceId: ID,
    repository: 'vento-group-sas/vento-nexo',
    headSha: head,
  });
  const canonical = {
    state: 'OPEN',
    isDraft: false,
    headRefName: BRANCH,
    headRefOid: head,
    baseRefName: 'main',
    body,
  };
  assert.equal(assessImplementationRepositoryPrState({
    state: canonical,
    expectedBody: body,
    headSha: head,
    branch: BRANCH,
  }).status, 'PASS');

  assert.equal(assessImplementationRepositoryPrState({
    state: { ...canonical, body: 'body legacy' },
    expectedBody: body,
    headSha: head,
    branch: BRANCH,
  }).status, 'UPDATE_BODY');

  const wrongHead = assessImplementationRepositoryPrState({
    state: { ...canonical, headRefOid: 'c'.repeat(40) },
    expectedBody: body,
    headSha: head,
    branch: BRANCH,
  });
  assert.equal(wrongHead.status, 'INVALID');
  assert.equal(wrongHead.reason, 'PR_HEAD_INVALID');

  const wrongBase = assessImplementationRepositoryPrState({
    state: { ...canonical, baseRefName: 'staging' },
    expectedBody: body,
    headSha: head,
    branch: BRANCH,
  });
  assert.equal(wrongBase.status, 'INVALID');
  assert.equal(wrongBase.reason, 'PR_BASE_INVALID');
});

test('checks consumer exigen Required Gate PASS y toleran Deploy Gate skipped', () => {
  const freshPass = [
    { name: 'Pruebas obligatorias del repositorio', bucket: 'pass', link: 'https://github.com/x/y/actions/runs/200/job/1' },
    { name: 'Integridad y declaracion TREQ', bucket: 'pass', link: 'https://github.com/x/y/actions/runs/200/job/2' },
    { name: 'VENTO Required Gate', bucket: 'pass', link: 'https://github.com/x/y/actions/runs/200/job/3' },
    { name: 'VENTO Deploy Gate', bucket: 'skipping', link: 'https://github.com/x/y/actions/runs/200/job/4' },
  ];
  assert.equal(classifyImplementationRepositoryChecks(freshPass).state, 'PASS');

  const staleFailureThenPass = [
    { name: 'VENTO Required Gate', bucket: 'fail', link: 'https://github.com/x/y/actions/runs/100/job/3' },
    ...freshPass,
  ];
  assert.equal(classifyImplementationRepositoryChecks(staleFailureThenPass).state, 'PASS');

  const missingRequired = freshPass.filter((row) => row.name !== 'VENTO Required Gate');
  assert.equal(classifyImplementationRepositoryChecks(missingRequired).state, 'WAIT');

  const failedRequired = freshPass.map((row) => (
    row.name === 'VENTO Required Gate' ? { ...row, bucket: 'fail' } : row
  ));
  assert.equal(classifyImplementationRepositoryChecks(failedRequired).state, 'FAIL');

  const skippedRequired = freshPass.map((row) => (
    row.name === 'VENTO Required Gate' ? { ...row, bucket: 'skipping' } : row
  ));
  assert.equal(classifyImplementationRepositoryChecks(skippedRequired).state, 'FAIL');
});

test('publisher recupera PRs ya mergeados antes de exigir branch de implementacion', () => {
  const source = fs.readFileSync(
    new URL('./implementation-repository-bundle.mjs', import.meta.url),
    'utf8',
  );
  const mergedLookup = source.indexOf('const alreadyMerged=mergedPrForBranch(entry);');
  const branchGuard = source.indexOf('if(currentBranch(entry.root)!==entry.branch)', mergedLookup);
  const recovery = source.indexOf("resume:'ALREADY_MERGED'", mergedLookup);
  const bodyRepair = source.indexOf("'pr','edit'");
  assert.ok(mergedLookup >= 0);
  assert.ok(branchGuard > mergedLookup);
  assert.ok(recovery > mergedLookup);
  assert.ok(bodyRepair >= 0);
  assert.match(source, /const REQUIRED_GATE\s*=\s*'VENTO Required Gate';/u);
  assert.match(source, /synchronizeMergedRepository\(entry\)/u);
});

test('publish evidence con plan exige merge commit contenido en main', (context) => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-publish-evidence-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const shellRoot = path.join(parent, 'vento-shell');
  const nexoRoot = path.join(parent, 'vento-nexo');
  fs.mkdirSync(shellRoot, { recursive: true });
  fs.mkdirSync(nexoRoot, { recursive: true });
  seedRepository(shellRoot, 'src/app/page.tsx', 'base-shell\n');
  seedRepository(nexoRoot, 'src/components/vento/standard/vento-shell.tsx', 'base-nexo\n');
  const plan = buildImplementationRepositoryPlan({
    shellRoot,
    instance: record(),
    verifyCheckouts: false,
  });
  const candidate = git(nexoRoot, ['rev-parse', 'HEAD']);
  const evidence = {
    type: 'IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_V1',
    instance_id: ID,
    repositories: [{
      repository: 'vento-group-sas/vento-nexo',
      status: 'MERGED',
      candidate_commit: candidate,
      merge_commit: candidate,
      pr: 1,
    }],
  };
  assert.equal(validatePublishedRepositoryBundleEvidence({
    instance: record(),
    evidence,
    plan,
  }), true);

  assert.throws(() => validatePublishedRepositoryBundleEvidence({
    instance: record(),
    evidence: {
      ...evidence,
      repositories: [{ ...evidence.repositories[0], merge_commit: 'f'.repeat(40) }],
    },
    plan,
  }), /PUBLISH_NOT_ON_MAIN/u);
});
