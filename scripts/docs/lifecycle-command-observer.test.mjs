import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { observeLifecycleCommand } from './lifecycle-command-observer.mjs';

test('command observer preserves UTF-8 output, exit status and timing without flooding terminal', (t) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-timing-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const output = [];
    const result = observeLifecycleCommand({ root, label: 'test failure', output: (line) => output.push(line), execute: () =>
        spawnSync(process.execPath, ['-e', 'console.log("verificación ✓"); console.error("falló"); process.exit(3)'], { encoding: 'utf8', windowsHide: true }) });
    assert.equal(result.status, 3);
    assert.match(result.stdout, /verificación ✓/u);
    assert.equal(output.length, 2);
    assert.match(output[0], /START test failure/u);
    assert.match(output[1], /FAIL test failure/u);
    assert.ok(result.duration_ms >= 0);
    const directory = path.join(root, '.delivery/lifecycle-timings');
    const entry = JSON.parse(fs.readFileSync(path.join(directory, fs.readdirSync(directory).find((name) => name.endsWith('.jsonl'))), 'utf8'));
    assert.equal(entry.exit_code, 3);
    assert.match(fs.readFileSync(entry.log_path, 'utf8'), /verificación ✓\n\nfalló/u);
});

test('spawn exceptions are timed as FAIL and are not swallowed', (t) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-timing-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const output = [];
    assert.throws(() => observeLifecycleCommand({ root, label: 'missing', output: (line) => output.push(line), execute: () => { throw new Error('missing binary'); } }), /missing binary/u);
    assert.match(output[1], /FAIL missing/u);
});

test('PowerShell launcher reads UTF-8 scripts and uses ASCII test reporter without auto-resume', { skip: process.platform !== 'win32' }, (t) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-terminal-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const script = path.join(root, 'encoding.ps1');
    fs.writeFileSync(script, '[Console]::WriteLine("verificación ✓"); [Console]::WriteLine($env:NODE_OPTIONS)\n', 'utf8');
    const result = spawnSync('pwsh', ['-NoProfile', '-File', 'scripts/docs/vento-terminal.ps1', '-ScriptPath', script], { encoding: 'utf8', windowsHide: true, env: { ...process.env, NODE_OPTIONS: '--no-warnings' } });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /verificación ✓/u);
    assert.match(result.stdout, /--no-warnings --test-reporter=tap/u);
});
