import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseTaskBlocks } from '../../../scripts/docs/format-canonical-task.mjs';

const HARNESS_RELATIVE_PATH = 'packages/data-normalization/scripts/validator-harness.mjs';

export function createDataNormalizationValidatorHarness(
  importMetaUrl,
  {
    gitUnchangedMessage = 'out-of-scope immutable file changed',
    includesAllMessage = 'missing',
  } = {},
) {
  const here = path.dirname(fileURLToPath(importMetaUrl));
  const packageRoot = path.resolve(here, '..');
  const repoRoot = path.resolve(packageRoot, '..', '..');

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function exactArray(actual, expected, label) {
    assert(
      JSON.stringify(actual) === JSON.stringify(expected),
      `${label} mismatch: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
    );
  }

  function includesAll(actual, expected, label) {
    const missing = expected.filter((entry) => !actual.includes(entry));
    assert(
      missing.length === 0,
      `${label} ${includesAllMessage}: ${missing.join(', ')}`,
    );
  }

  function run(command, args, options = {}) {
    const result = spawnSync(command, args, {
      cwd: options.cwd ?? repoRoot,
      encoding: 'utf8',
      windowsHide: true,
      env: process.env,
    });
    if (result.error) throw result.error;
    return {
      status: Number.isInteger(result.status) ? result.status : 1,
      stdout: String(result.stdout ?? '').trim(),
      stderr: String(result.stderr ?? '').trim(),
    };
  }

  function assertGitUnchanged(paths) {
    const guardedPaths = [...new Set([...paths, HARNESS_RELATIVE_PATH])];
    const result = run('git', ['diff', '--quiet', '--', ...guardedPaths]);
    assert(
      result.status === 0,
      `${gitUnchangedMessage}: ${guardedPaths.join(', ')}`,
    );
  }

  function sha256(value) {
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
  }

  function canonicalTaskBlock(owner, taskId) {
    const task = parseTaskBlocks(owner).find((entry) => entry.id === taskId) ?? null;
    assert(task, `canonical task ${taskId} not found`);
    return task.block;
  }

  function asciiSafe(value) {
    return String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/gu, '')
      .replace(/[^\x20-\x7E]/gu, '?');
  }

  return Object.freeze({
    packageRoot,
    repoRoot,
    assert,
    exactArray,
    includesAll,
    run,
    assertGitUnchanged,
    sha256,
    canonicalTaskBlock,
    asciiSafe,
  });
}
