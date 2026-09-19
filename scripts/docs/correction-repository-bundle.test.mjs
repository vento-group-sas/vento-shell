import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CORRECTION_REPOSITORY_BUNDLE_MODEL_ID,
  assertExternalCorrectionScope,
  buildCorrectionRepositoryPlan,
  validatePublishedCorrectionBundleEvidence,
} from './correction-repository-bundle.mjs';

function record() {
  return {
    correction_id: 'DELIV-PKG-015::CORR-020',
    target_repositories: [
      'vento-group-sas/vento-shell',
      'vento-group-sas/vento-nexo',
    ],
    authorized_changes: [
      { repo: 'vento-group-sas/vento-shell', path: 'scripts/docs/correction-control.mjs', change: 'MODIFY' },
      { repo: 'vento-group-sas/vento-nexo', path: '.github/workflows/vento-required-gate.yml', change: 'MODIFY' },
    ],
    evidence: [],
  };
}

test('plan de correccion multi-repo conserva rama correction/* y repos independientes', () => {
  const plan = buildCorrectionRepositoryPlan({
    shellRoot: '/workspace/vento-shell',
    record: record(),
    verifyCheckouts: false,
  });
  assert.equal(plan.model_id, CORRECTION_REPOSITORY_BUNDLE_MODEL_ID);
  assert.equal(plan.branch, 'correction/deliv-pkg-015/corr-020');
  assert.equal(plan.multi_repo, true);
  assert.equal(plan.repository_count, 2);
  assert.deepEqual(plan.repositories.map((entry) => entry.repository), [
    'vento-group-sas/vento-nexo',
    'vento-group-sas/vento-shell',
  ]);
  assert.notEqual(plan.repositories[0].root, plan.repositories[1].root);
});

test('scope externo es deny-by-default y respeta EXECUTE_ONLY', () => {
  assert.equal(assertExternalCorrectionScope({
    record: record(),
    changes: [{ repository: 'vento-group-sas/vento-nexo', paths: ['.github/workflows/vento-required-gate.yml'] }],
  }), true);
  assert.throws(() => assertExternalCorrectionScope({
    record: record(),
    changes: [{ repository: 'vento-group-sas/vento-nexo', paths: ['src/rogue.ts'] }],
  }), /PATH_OUT_OF_SCOPE/u);
  const executeOnly = record();
  executeOnly.authorized_changes[1] = {
    repo: 'vento-group-sas/vento-nexo',
    path: '.github/workflows/vento-required-gate.yml',
    change: 'EXECUTE_ONLY',
  };
  assert.throws(() => assertExternalCorrectionScope({
    record: executeOnly,
    changes: [{ repository: 'vento-group-sas/vento-nexo', paths: ['.github/workflows/vento-required-gate.yml'] }],
  }), /EXECUTE_ONLY_WRITE/u);
});

test('evidencia publicada exige exactamente todos los repos externos', () => {
  const base = record();
  assert.equal(validatePublishedCorrectionBundleEvidence({
    record: base,
    evidence: {
      type: 'CORRECTION_REPOSITORY_BUNDLE_PUBLISH_V1',
      correction_id: base.correction_id,
      repositories: [{
        repository: 'vento-group-sas/vento-nexo',
        status: 'MERGED',
        candidate_commit: 'a'.repeat(40),
        merge_commit: 'b'.repeat(40),
        pr: 1,
      }],
    },
  }), true);
  assert.throws(() => validatePublishedCorrectionBundleEvidence({
    record: base,
    evidence: {
      type: 'CORRECTION_REPOSITORY_BUNDLE_PUBLISH_V1',
      correction_id: base.correction_id,
      repositories: [],
    },
  }), /PUBLISH_SET_MISMATCH/u);
});
