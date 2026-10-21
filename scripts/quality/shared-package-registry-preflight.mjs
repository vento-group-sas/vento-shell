import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_LOCATIONS = Object.freeze([
  { name: '@vento/contracts', directory: 'contracts' },
  { name: '@vento/os-context', directory: 'os-context' },
  { name: '@vento/supabase', directory: 'supabase' },
  { name: '@vento/ui-web', directory: 'ui-web' },
]);

export const NPM_REGISTRY_URL = 'https://gitlab.com/api/v4/projects/87892751/packages/npm/';
export const PACKAGES_API_URL = 'https://gitlab.com/api/v4/projects/87892751/packages';
const AUDIT_ID = 'VENTO-NPM-REGISTRY-READONLY-V1';
const PAGE_LIMIT = 30;
const PAGE_SIZE = 100;
const API_STATUSES = Object.freeze([
  'default', 'deprecated', 'error', 'processing', 'hidden', 'pending_destruction',
]);
const VERSION_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/u;

function fail(reason) {
  throw new Error('VENTO_NPM_REGISTRY_QA:' + reason);
}

function exportTargets(node) {
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(exportTargets);
  if (node && typeof node === 'object') return Object.values(node).flatMap(exportTargets);
  return [];
}

export function assessManifest(manifest, expectedName) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)
    || manifest.name !== expectedName) {
    fail('PACKAGE_IDENTITY_INVALID:' + expectedName);
  }

  const blockers = [];
  if (typeof manifest.version !== 'string' || !VERSION_PATTERN.test(manifest.version)) {
    blockers.push('VERSION_MISSING_OR_INVALID');
  }
  if (manifest.private !== false) blockers.push('NOT_EXPLICITLY_DISTRIBUTABLE');
  if (!manifest.exports || exportTargets(manifest.exports).length === 0) {
    blockers.push('PUBLIC_EXPORTS_NOT_MATERIALIZED');
  } else if (exportTargets(manifest.exports).some((value) =>
    /(?:^|\/)src\//u.test(value)
      || (/\.(?:[cm]?ts|tsx)$/u.test(value) && !/\.d\.[cm]?ts$/u.test(value)))) {
    blockers.push('PUBLIC_EXPORTS_REFERENCE_SOURCES');
  }
  if (!Array.isArray(manifest.files) || !manifest.files.includes('dist/')) {
    blockers.push('DIST_ALLOWLIST_NOT_MATERIALIZED');
  }
  if (typeof manifest.scripts?.build !== 'string' || !manifest.scripts.build.trim()) {
    blockers.push('PACKAGE_BUILD_NOT_DECLARED');
  }

  return {
    name: expectedName,
    version: typeof manifest.version === 'string' ? manifest.version : null,
    private: manifest.private === true,
    release_readiness: blockers.length === 0 ? 'CANDIDATE_ONLY' : 'BLOCKED',
    blockers,
  };
}

export function inspectLocalPackages({ root = process.cwd() } = {}) {
  const packages = PACKAGE_LOCATIONS.map(({ name, directory }) => {
    const manifestPath = path.join(root, 'packages', directory, 'package.json');
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      fail('PACKAGE_MANIFEST_MISSING_OR_INVALID:' + name);
    }
    return assessManifest(manifest, name);
  });
  return {
    audit_id: AUDIT_ID,
    schema_version: 1,
    mode: 'LOCAL_INVENTORY',
    inventory_validation: 'PASS',
    release_certified: false,
    publication_executed: false,
    registry_authentication: 'NOT_APPLICABLE',
    npm_publish_authentication: 'NOT_TESTED',
    packages,
  };
}

export function reconcileRegistry(inventory, remoteRows) {
  if (!Array.isArray(remoteRows)) fail('REGISTRY_RESPONSE_INVALID');
  for (const row of remoteRows) {
    if (!row || typeof row !== 'object' || row.package_type !== 'npm'
      || typeof row.name !== 'string' || typeof row.version !== 'string') {
      fail('REGISTRY_RESPONSE_INVALID');
    }
  }
  return {
    ...inventory,
    mode: 'AUTHENTICATED_REGISTRY_READ_ONLY',
    registry_authentication: 'PASS',
    remote_package_count: remoteRows.length,
    packages: inventory.packages.map((pkg) => {
      const remote = remoteRows.filter((row) => row.name === pkg.name);
      const remoteVersions = [...new Set(remote.map((row) => row.version))].sort();
      return {
        ...pkg,
        registry_versions: remoteVersions,
        exact_version_collision: pkg.version !== null && remoteVersions.includes(pkg.version),
      };
    }),
  };
}

export async function queryGitLabPackages({
  token,
  fetchImpl = fetch,
  registryUrl = NPM_REGISTRY_URL,
} = {}) {
  if (registryUrl !== NPM_REGISTRY_URL) fail('REGISTRY_ENDPOINT_MISMATCH');
  if (typeof token !== 'string' || !token.trim()) fail('REGISTRY_TOKEN_NOT_CONFIGURED');
  if (typeof fetchImpl !== 'function') fail('REGISTRY_FETCH_UNAVAILABLE');

  const all = [];
  const seen = new Set();
  for (const status of API_STATUSES) {
    let page = 1;
    while (page <= PAGE_LIMIT) {
      const url = new URL(PACKAGES_API_URL);
      url.searchParams.set('package_type', 'npm');
      url.searchParams.set('status', status);
      url.searchParams.set('per_page', String(PAGE_SIZE));
      url.searchParams.set('page', String(page));

      let response;
      try {
        response = await fetchImpl(url.href, {
          method: 'GET',
          redirect: 'error',
          headers: { 'PRIVATE-TOKEN': token, Accept: 'application/json' },
          signal: AbortSignal.timeout(15000),
        });
      } catch {
        fail('REGISTRY_READ_UNAVAILABLE');
      }
      if (!response || !response.ok) {
        fail('REGISTRY_HTTP_' + String(response?.status ?? 'UNKNOWN'));
      }
      let rows;
      try {
        rows = await response.json();
      } catch {
        fail('REGISTRY_JSON_INVALID');
      }
      if (!Array.isArray(rows) || rows.length > PAGE_SIZE) fail('REGISTRY_RESPONSE_INVALID');
      for (const row of rows) {
        if (!row || typeof row !== 'object' || row.package_type !== 'npm'
          || typeof row.name !== 'string' || typeof row.version !== 'string') {
          fail('REGISTRY_RESPONSE_INVALID');
        }
        const key = JSON.stringify([row.name, row.version, row.id ?? null, row.status ?? status]);
        if (!seen.has(key)) {
          seen.add(key);
          all.push({ name: row.name, version: row.version, package_type: 'npm' });
        }
      }
      const next = String(response.headers?.get?.('x-next-page') ?? '').trim();
      if (next) {
        if (!/^[1-9][0-9]*$/u.test(next) || Number(next) !== page + 1) {
          fail('REGISTRY_PAGINATION_INVALID');
        }
        page = Number(next);
      } else if (rows.length === PAGE_SIZE) {
        page += 1;
      } else {
        break;
      }
    }
    if (page > PAGE_LIMIT) fail('REGISTRY_PAGINATION_LIMIT');
  }
  return all;
}

export async function runAudit({
  mode = 'inspect',
  root = process.cwd(),
  token = process.env.GITLAB_NPM_PUBLISH_TOKEN,
  registryUrl = process.env.GITLAB_NPM_REGISTRY_URL,
  fetchImpl = fetch,
} = {}) {
  const inventory = inspectLocalPackages({ root });
  if (mode === 'inspect') return inventory;
  if (mode !== 'registry') fail('MODE_NOT_SUPPORTED');
  const remoteRows = await queryGitLabPackages({ token, registryUrl, fetchImpl });
  return reconcileRegistry(inventory, remoteRows);
}

async function main() {
  const [mode = 'inspect', extra] = process.argv.slice(2);
  if (extra) fail('UNEXPECTED_CLI_ARGUMENT');
  const result = await runAudit({ mode });
  console.log(JSON.stringify(result, null, 2));
}

const invoked = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  main().catch((error) => {
    // Never print token values, request headers or untrusted remote response bodies.
    console.error(error instanceof Error ? error.message : 'VENTO_NPM_REGISTRY_QA:UNKNOWN');
    process.exitCode = 1;
  });
}
