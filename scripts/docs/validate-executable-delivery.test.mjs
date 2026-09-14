import assert from 'node:assert/strict';
import test from 'node:test';

import {
  canonicalRepositoryText,
  validateExecutableSource,
} from './validate-executable-delivery.mjs';

test('stdin-commonjs rechaza return ilegal a nivel superior', () => {
  assert.throws(
    () => validateExecutableSource('return;\n', { mode: 'stdin-commonjs', filename: 'broken.txt' }),
    /Illegal return statement/u,
  );
});

test('stdin-commonjs permite return dentro de funcion y catch sin return superior', () => {
  assert.equal(
    validateExecutableSource(
      "function stop() { return; }\ntry { stop(); } catch (error) { process.exitCode = 1; }\n",
      { mode: 'stdin-commonjs', filename: 'valid.txt' },
    ).mode,
    'stdin-commonjs',
  );
});

test('validador falla cerrado para modo desconocido o fuente vacia', () => {
  assert.throws(() => validateExecutableSource('const x = 1;', { mode: 'unknown' }), /UNSUPPORTED_EXECUTABLE_MODE/u);
  assert.throws(() => validateExecutableSource('   ', { mode: 'stdin-commonjs' }), /EXECUTABLE_SOURCE_EMPTY/u);
});

test('LC-009 rechaza npm.cmd embebido aunque se resuelva mediante una variable', () => {
  const source = [
    "const { spawnSync } = require('node:child_process');",
    "const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';",
    "spawnSync(npmBin, ['run', 'docs:plan:check']);",
  ].join('\n');
  assert.throws(
    () => validateExecutableSource(source, { mode: 'stdin-commonjs', filename: 'bad-npm-cmd.txt' }),
    /EXECUTABLE_POLICY_FAIL:LC-009:DIRECT_NPM_CMD_LITERAL_FORBIDDEN/u,
  );
});

test('LC-009 rechaza spawn directo de npm', () => {
  const source = [
    "const { spawnSync } = require('node:child_process');",
    "spawnSync('npm', ['run', 'docs:plan:check']);",
  ].join('\n');
  assert.throws(
    () => validateExecutableSource(source, { mode: 'stdin-commonjs', filename: 'bad-npm.txt' }),
    /EXECUTABLE_POLICY_FAIL:LC-009:DIRECT_NPM_PROCESS_FORBIDDEN/u,
  );
});

test('LC-009 permite ejecutar npm mediante resolveNpmInvocation canonico', () => {
  const source = [
    "const { spawnSync } = require('node:child_process');",
    "const invocation = resolveNpmInvocation();",
    "spawnSync(invocation.command, [...invocation.prefixArgs, 'run', 'docs:plan:check']);",
  ].join('\n');
  const report = validateExecutableSource(
    source,
    { mode: 'stdin-commonjs', filename: 'portable-npm.txt' },
  );
  assert.equal(report.mode, 'stdin-commonjs');
  assert.equal(report.policies.includes('LC-009'), true);
});

test('downloaded executor rechaza docs:implementation:advance por npm aunque use resolveNpmInvocation', () => {
  const source = [
    "const { spawnSync } = require('node:child_process');",
    "const invocation = resolveNpmInvocation();",
    "spawnSync(invocation.command, [...invocation.prefixArgs, 'run', 'docs:implementation:advance']);",
  ].join('\n');
  assert.throws(
    () => validateExecutableSource(
      source,
      { mode: 'stdin-commonjs', filename: 'stale-branch-lifecycle.txt' },
    ),
    /EXECUTABLE_POLICY_FAIL:CURRENT_MAIN_COORDINATOR_REQUIRED/u,
  );
});

test('downloaded executor permite current-main coordinator via process.execPath', () => {
  const source = [
    "const { spawnSync } = require('node:child_process');",
    "const coordinatorPath = path.join(publishedRoot, 'scripts', 'docs', 'implementation-execution-coordinator.mjs');",
    "spawnSync(process.execPath, [coordinatorPath, 'advance', '--instance-id', instanceId], { cwd: physicalRoot });",
  ].join('\n');
  const report = validateExecutableSource(
    source,
    { mode: 'stdin-commonjs', filename: 'current-main-coordinator.txt' },
  );
  assert.equal(report.policies.includes('CURRENT_MAIN_COORDINATOR'), true);
  assert.equal(report.policies.includes('CANONICAL_TEXT_WRITE'), true);
});

test('downloaded executor rechaza escritura de texto cruda', () => {
  const source = [
    "const fs = require('node:fs');",
    "fs.writeFileSync('tracked.txt', 'value', 'utf8');",
  ].join('\n');
  assert.throws(
    () => validateExecutableSource(
      source,
      { mode: 'stdin-commonjs', filename: 'raw-write.txt' },
    ),
    /EXECUTABLE_POLICY_FAIL:CANONICAL_TEXT_WRITE_REQUIRED/u,
  );
});

test('canonicalRepositoryText fuerza LF y exactamente un salto final', () => {
  const cr = String.fromCharCode(13);
  const lf = String.fromCharCode(10);
  assert.equal(
    canonicalRepositoryText('alpha' + cr + lf + cr + lf),
    'alpha' + lf,
  );
  assert.equal(
    canonicalRepositoryText('alpha' + lf + lf),
    'alpha' + lf,
  );
  assert.equal(
    canonicalRepositoryText('alpha   ' + lf + lf),
    'alpha' + lf,
  );
});
