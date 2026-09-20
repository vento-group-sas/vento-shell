import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { CorrectionValidationSession, correctionInputFingerprint, validateCorrectionCheckpoint } from './correction-validation-session.mjs';

function fixture(t) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-checkpoint-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const git = (...args) => {
        const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true });
        assert.equal(result.status, 0, result.stderr);
        return result.stdout.trim();
    };
    git('init', '-b', 'main');
    git('config', 'user.email', 'test@example.invalid');
    git('config', 'user.name', 'Lifecycle Test');
    git('config', 'core.autocrlf', 'false');
    const recordPath = 'correction.json';
    const record = { correction_id: 'TEST-001::CORR-001', status: 'IN_PROGRESS', evidence: [], authorization: { decision: 'APPROVED' }, validation_commands: ['node --test a.test.mjs'] };
    const write = (name, value) => fs.writeFileSync(path.join(root, name), typeof value === 'string' ? value : JSON.stringify(value));
    write(recordPath, record);
    write('code.mjs', 'export const value = 1;\n');
    git('add', 'correction.json', 'code.mjs');
    git('commit', '-m', 'fixture');
    git('update-ref', 'refs/remotes/origin/main', 'HEAD');
    const fingerprint = (options = {}) => correctionInputFingerprint({ root, recordPath, env: { TEST: 'fixed' }, ...options });
    return { root, recordPath, record, write, git, fingerprint };
}

test('metadata checkpoints reuse a successful full check across commits; final gate stays full', (t) => {
    const f = fixture(t);
    const session = new CorrectionValidationSession();
    let full = 0;
    let light = 0;
    const run = (forceFull = false) => validateCorrectionCheckpoint({ session, key: f.root, fingerprint: f.fingerprint, forceFull,
        full: () => { full++; }, light: () => { light++; } });
    assert.equal(run().strategy, 'FULL_VALIDATION');
    for (const status of ['IN_PROGRESS', 'IMPLEMENTED', 'VERIFIED']) {
        f.write(f.recordPath, { ...f.record, status, evidence: [{ type: 'PASS', status: 'PASS' }], implemented_at: 'now', verified_at: 'later' });
        f.git('add', f.recordPath);
        f.git('commit', '-m', status);
        assert.equal(run().strategy, 'METADATA_ONLY_REUSE');
    }
    assert.equal(run().strategy, 'METADATA_ONLY_REUSE');
    assert.equal(run(true).strategy, 'FULL_VALIDATION');
    assert.equal(full, 2);
    assert.equal(light, 4);
});

test('code, contracts, commands, policy, baseline, index and environment changes invalidate receipts', (t) => {
    const f = fixture(t);
    const original = f.fingerprint();
    for (const [name, value] of [
        ['code.mjs', 'export const value = 2;\n'],
        ['policy.json', '{}'],
        ['package-lock.json', '{"lockfileVersion":3}'],
    ]) {
        f.write(name, value);
        assert.notEqual(f.fingerprint(), original, name);
        if (name === 'code.mjs') f.git('restore', name);
        else fs.unlinkSync(path.join(f.root, name));
    }
    for (const change of [{ authorization: { decision: 'CHANGED' } }, { validation_commands: ['different'] }, { baseline: 'different' }]) {
        f.write(f.recordPath, { ...f.record, ...change });
        assert.notEqual(f.fingerprint(), original);
    }
    f.write(f.recordPath, f.record);
    assert.equal(f.fingerprint(), original);
    assert.notEqual(f.fingerprint({ env: { TEST: 'changed' } }), original);
    f.write('code.mjs', 'staged but worktree restored\n');
    f.git('add', 'code.mjs');
    f.write('code.mjs', 'export const value = 1;\n');
    assert.notEqual(f.fingerprint(), original);
    f.git('reset', '--', 'code.mjs');
    f.git('commit', '--allow-empty', '-m', 'baseline moved');
    f.git('update-ref', 'refs/remotes/origin/main', 'HEAD');
    assert.notEqual(f.fingerprint(), original);
});

test('committed material changes cannot be mistaken for a clean metadata checkpoint', (t) => {
    const f = fixture(t);
    const original = f.fingerprint();
    f.write('code.mjs', 'export const value = 2;\n');
    f.git('add', 'code.mjs');
    f.git('commit', '-m', 'material');
    assert.notEqual(f.fingerprint(), original);
    f.git('rm', 'code.mjs');
    assert.notEqual(f.fingerprint(), original);
});

test('cold resumes, failures and mutation during light validation never reuse an old PASS', () => {
    let value = 'A';
    const session = new CorrectionValidationSession();
    const options = { session, key: 'correction', fingerprint: () => value, full: () => {}, light: () => {} };
    validateCorrectionCheckpoint(options);
    assert.equal(validateCorrectionCheckpoint({ ...options, session: new CorrectionValidationSession() }).strategy, 'FULL_VALIDATION');
    assert.throws(() => validateCorrectionCheckpoint({ ...options, light: () => { throw new Error('INVALID_RECORD'); } }), /INVALID_RECORD/);
    assert.equal(validateCorrectionCheckpoint(options).strategy, 'FULL_VALIDATION');
    assert.throws(() => validateCorrectionCheckpoint({ ...options, light: () => { value = 'B'; } }), /INPUT_CHANGED/);
    assert.equal(validateCorrectionCheckpoint(options).strategy, 'FULL_VALIDATION');
    assert.throws(() => validateCorrectionCheckpoint({ ...options, forceFull: true, full: () => { throw new Error('FAIL'); } }), /FAIL/);
    assert.equal(validateCorrectionCheckpoint(options).strategy, 'FULL_VALIDATION');
});

test('strict fingerprint also invalidates evidence and status for final validation', (t) => {
    const f = fixture(t);
    const before = f.fingerprint({ metadataOnly: false });
    f.write(f.recordPath, { ...f.record, status: 'IMPLEMENTED', evidence: [{ type: 'PASS' }] });
    assert.notEqual(f.fingerprint({ metadataOnly: false }), before);
});

test('final reuse requires a full receipt for the exact evidence and derived state', () => {
    const session = new CorrectionValidationSession();
    let material = 'code1';
    let metadata = 'IN_PROGRESS';
    const options = { session, key: 'final', fingerprint: () => material,
        exactFingerprint: () => `${material}:${metadata}`, full: () => {}, light: () => {} };
    assert.equal(validateCorrectionCheckpoint(options).strategy, 'FULL_VALIDATION');
    metadata = 'IMPLEMENTED';
    assert.equal(validateCorrectionCheckpoint(options).strategy, 'METADATA_ONLY_REUSE');
    assert.equal(validateCorrectionCheckpoint({ ...options, requireExact: true }).strategy, 'FULL_VALIDATION');
    assert.equal(validateCorrectionCheckpoint({ ...options, requireExact: true }).strategy, 'UNCHANGED_FULL_REUSE');
    metadata = 'VERIFIED';
    assert.equal(validateCorrectionCheckpoint({ ...options, forceFull: true }).strategy, 'FULL_VALIDATION');
    assert.equal(validateCorrectionCheckpoint({ ...options, requireExact: true }).strategy, 'UNCHANGED_FULL_REUSE');
    material = 'code2';
    assert.equal(validateCorrectionCheckpoint({ ...options, requireExact: true }).strategy, 'FULL_VALIDATION');
    metadata = 'different evidence';
    assert.equal(validateCorrectionCheckpoint({ ...options, requireExact: true }).strategy, 'FULL_VALIDATION');
});
