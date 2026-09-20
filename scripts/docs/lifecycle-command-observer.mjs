import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

let sequence = 0;
const sessionId = `${Date.now()}-${process.pid}`;

export function observeLifecycleCommand({ root, label, execute, output = console.log }) {
    const directory = path.join(root, '.delivery', 'lifecycle-timings');
    fs.mkdirSync(directory, { recursive: true });
    const id = `${sessionId}-${++sequence}`;
    const logPath = path.join(directory, `${id}.log`);
    const startedAt = new Date().toISOString();
    const start = performance.now();
    output(`[LIFECYCLE] START ${label}`);
    let result;
    try {
        result = execute();
    } catch (error) {
        result = { status: 1, stdout: '', stderr: error.message };
        throw error;
    } finally {
        const durationMs = Math.round(performance.now() - start);
        const status = result?.status ?? 1;
        fs.writeFileSync(logPath, `${result?.stdout ?? ''}\n${result?.stderr ?? ''}`, 'utf8');
        const entry = {
            id, command: label, started_at: startedAt, completed_at: new Date().toISOString(),
            duration_ms: durationMs, exit_code: status, log_path: logPath,
        };
        fs.appendFileSync(path.join(directory, `${sessionId}.jsonl`), `${JSON.stringify(entry)}\n`, 'utf8');
        output(`[LIFECYCLE] ${status === 0 ? 'PASS' : 'FAIL'} ${label} (${(durationMs / 1000).toFixed(1)}s) LOG: ${logPath}`);
        if (result) Object.assign(result, { duration_ms: durationMs, started_at: startedAt, completed_at: entry.completed_at });
    }
    return result;
}
