import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function git(root, args) {
    const result = spawnSync('git', args, {
        cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024,
    });
    if (result.error || result.status !== 0) {
        throw new Error(result.error?.message || result.stderr || 'VALIDATION_FINGERPRINT_GIT_FAILED');
    }
    return result.stdout;
}

// Never persisted: a new process, including a resumed lifecycle, starts cold.
export class CorrectionValidationSession {
    #receipts = new Map();

    matches(key, fingerprint) {
        return this.#receipts.get(key) === fingerprint;
    }

    remember(key, fingerprint) {
        this.#receipts.set(key, fingerprint);
    }

    invalidate(key) {
        this.#receipts.delete(key);
    }
}

export function correctionInputFingerprint({ root, recordPath, metadataOnly = true, env = process.env }) {
    const hash = crypto.createHash('sha256');
    const add = (value) => {
        const bytes = Buffer.isBuffer(value) ? value : Buffer.from(String(value));
        hash.update(`${bytes.length}:`);
        hash.update(bytes);
    };
    add('CORRECTION_VALIDATION_SESSION_V1');
    add(path.resolve(root));
    add(process.version);
    add(process.execPath);
    add(JSON.stringify(Object.entries(env).sort(([a], [b]) => a.localeCompare(b))));
    add(git(root, ['rev-parse', 'origin/main']));
    add(git(root, ['branch', '--show-current']));
    // HEAD itself is intentionally absent: metadata checkpoints change its SHA.
    const files = [...new Set(git(root, ['ls-files', '--cached', '--others', '--exclude-standard', '-z'])
        .split('\0').filter(Boolean))].sort();
    for (const relative of files) {
        add(relative);
        const absolute = path.join(root, relative);
        if (!fs.existsSync(absolute)) {
            add('MISSING');
            continue;
        }
        const stat = fs.lstatSync(absolute);
        if (!stat.isFile() || stat.isSymbolicLink()) {
            throw new Error(`VALIDATION_FINGERPRINT_UNSUPPORTED_PATH:${relative}`);
        }
        add(stat.mode);
        let bytes = fs.readFileSync(absolute);
        if (metadataOnly && relative === recordPath) {
            const record = JSON.parse(bytes.toString('utf8'));
            for (const key of ['status', 'evidence', 'implemented_at', 'verified_at']) delete record[key];
            bytes = Buffer.from(JSON.stringify(record));
        }
        add(bytes);
    }
    // Pending index differences must not hide behind identical worktree bytes.
    // The active ledger is governed separately by correction-control and scope.
    add(git(root, ['diff', '--cached', '--raw', '--', '.', `:(exclude)${recordPath}`]));
    const installedLock = path.join(root, 'node_modules', '.package-lock.json');
    add(fs.existsSync(installedLock) ? fs.readFileSync(installedLock) : 'NO_INSTALLED_LOCK');
    return hash.digest('hex');
}

export function validateCorrectionCheckpoint({
    session, key, fingerprint, exactFingerprint = fingerprint, full, light,
    forceFull = false, requireExact = false,
}) {
    const selectedFingerprint = requireExact ? exactFingerprint : fingerprint;
    const before = selectedFingerprint();
    const reuse = !forceFull && session.matches(requireExact ? `${key}:exact` : key, before);
    // A failure cannot leave an older receipt usable by a retry in this process.
    session.invalidate(key);
    session.invalidate(`${key}:exact`);
    const result = reuse ? light() : full();
    const after = selectedFingerprint();
    if (reuse && before !== after) throw new Error('CORRECTION_INPUT_CHANGED_DURING_LIGHT_CHECK');
    session.remember(key, requireExact ? fingerprint() : after);
    // A metadata-only check cannot grant an exact receipt for the final state.
    if (!reuse || requireExact) session.remember(`${key}:exact`, exactFingerprint());
    return { ...result, strategy: reuse
        ? (requireExact ? 'UNCHANGED_FULL_REUSE' : 'METADATA_ONLY_REUSE')
        : 'FULL_VALIDATION' };
}
