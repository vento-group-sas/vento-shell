import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HARNESS_RELATIVE_PATH = 'packages/ui-web/scripts/validator-harness.mjs';

export function createUiValidatorHarness(importMetaUrl) {
  const here = path.dirname(fileURLToPath(importMetaUrl));
  const packageRoot = path.resolve(here, '..');
  const repoRoot = path.resolve(packageRoot, '..', '..');
  const requireFromRepo = createRequire(path.join(repoRoot, 'package.json'));

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function includesAll(source, expected, label) {
    for (const value of expected) {
      assert(source.includes(value), `${label} missing: ${value}`);
    }
  }

  function excludesAll(source, forbidden, label) {
    for (const value of forbidden) {
      assert(!source.includes(value), `${label} contains forbidden value: ${value}`);
    }
  }

  function sha256(value) {
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
  }

  function assertGitUnchanged(paths) {
    const guardedPaths = [...new Set([...paths, HARNESS_RELATIVE_PATH])];
    const result = spawnSync(
      'git',
      ['diff', '--quiet', '--', ...guardedPaths],
      {
        cwd: repoRoot,
        encoding: 'utf8',
        windowsHide: true,
      },
    );
    assert(
      result.status === 0,
      `out-of-scope immutable path changed: ${guardedPaths.join(', ')}`,
    );
  }

  return {
    packageRoot,
    repoRoot,
    requireFromRepo,
    assert,
    includesAll,
    excludesAll,
    sha256,
    assertGitUnchanged,
  };
}
