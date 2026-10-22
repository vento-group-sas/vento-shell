import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { asSha256Identity } from './shared-package-release-gate.mjs';
import { packPilotPrivatePreview } from './shared-package-release-preparation.mjs';
import {
  CANONICAL_BASE_RELATIONS, CANONICAL_WEB_CONSUMERS, COMPATIBILITY_AXES,
  compatibilityIdentity, comparePreparedEvidence, prepareCompatibilityEvidence,
} from './shared-package-compatibility-gate.mjs';
import { requirePilotCompatibility } from './vento-contracts-private-release.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const CONSUMERS = ['vento-shell', 'vento-viso', 'vento-nexo', 'vento-fogo',
  'vento-origo', 'vento-pulso', 'vento-numera'];
const OWNER = 'vento-group-sas';
const CANDIDATE = '@vento/contracts';
const VERSION = '1.0.0-alpha.1';
const SHA = /^[a-f0-9]{40}$/u;
const OUT = path.join(ROOT, '.delivery/shared-package-compatibility/contracts-pilot');

function block(code) {
  throw new Error('CI005_VISO:' + code);
}

export function classifyCompilerErrors(output) {
  const raw = String(output ?? '');
  const codes = [...new Set([...raw.matchAll(/\berror (TS\d{4})\b/gu)]
    .map(entry => entry[1]))].slice(0, 12);
  const diagnosticLines = raw.split(/\r?\n/u)
    .filter(line => /\berror TS\d{4}\b/u.test(line));
  return {
    codes,
    diagnostic_count: diagnosticLines.length,
    probe_related: diagnosticLines.some(line => /ci005|@vento\/contracts/iu.test(line)),
    identities: diagnosticLines.map(line => asSha256Identity(line.trim())).sort(),
    // Never publish arbitrary compiler output or secrets from consumer env.
  };
}

function command(binary, args, cwd, timeout = 300000) {
  const p = spawnSync(binary, args, {
    cwd, encoding: 'utf8', windowsHide: true, timeout,
    maxBuffer: 2 * 1024 * 1024,
    env: {
      ...process.env, CI: '1', NEXT_TELEMETRY_DISABLED: '1',
      npm_config_audit: 'false', npm_config_fund: 'false',
      npm_config_ignore_scripts: 'true',
    },
  });
  return { ok: p.status === 0 && !p.error, code: p.status ?? -1,
    output: String(p.stdout ?? '').trim().slice(-450),
    compiler: classifyCompilerErrors(String(p.stdout ?? '') + '\n' + String(p.stderr ?? '')),
  };
}

function verified(binary, args, cwd, code, timeout) {
  const x = command(binary, args, cwd, timeout);
  if (!x.ok) block(code);
  return x.output;
}

function oneEvidence(location, code) {
  if (!fs.existsSync(location)) block(code + '_MISSING');
  const items = fs.readdirSync(location).filter(x => x.endsWith('.json'));
  if (items.length !== 1) block(code + '_CARDINALITY');
  return JSON.parse(fs.readFileSync(path.join(location, items[0]), 'utf8'));
}

function hash(bytes) {
  return asSha256Identity(bytes);
}

export function compareFrozenDependencyTrees(before, after) {
  const keys = [...new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})])]
    .filter(key => key !== 'node_modules/@vento/contracts').sort();
  const changed = keys.filter(key => before?.[key] !== after?.[key]);
  return {
    frozen: changed.length === 0,
    changed_count: changed.length,
    // Package names and public versions only; no source code, environment or tokens.
    changed_packages: changed.slice(0, 20).map(key => ({
      name: key,
      before: before?.[key] ?? null,
      after: after?.[key] ?? null,
    })),
  };
}

function snapshotLockedInstall(root, originalLock) {
  const lock = JSON.parse(originalLock.toString('utf8'));
  const entries = Object.entries(lock.packages ?? {})
    .filter(([name, meta]) => name.startsWith('node_modules/')
      && meta && typeof meta.version === 'string');
  if (entries.length < 50) block('CONSUMER_LOCKFILE_NOT_REPRESENTATIVE');
  return Object.fromEntries(entries.map(([key]) => {
    const filename = path.join(root, key, 'package.json');
    if (!fs.existsSync(filename)) return [key, null];
    const stat = fs.lstatSync(filename);
    if (!stat.isFile() || stat.isSymbolicLink()) block('CONSUMER_PACKAGE_PATH_UNSAFE');
    const pkg = JSON.parse(fs.readFileSync(filename, 'utf8'));
    if (typeof pkg.version !== 'string') block('CONSUMER_PACKAGE_VERSION_MISSING');
    return [key, pkg.version];
  }));
}


export function buildRealCi005PilotInput({
  observed, testEvidence, buildEvidence, manifestBytes,
  consumerManifest, effectiveVersions, npmVersion,
} = {}) {
  if (!observed || observed.status !== 'PASS'
    || observed.consumer !== 'vento-viso'
    || observed.candidate !== CANDIDATE
    || observed.candidate_version !== VERSION
    || observed.preexisting_typecheck_debt !== false
    || observed.consumer_manifest_unchanged !== true
    || observed.dependency_tree?.frozen !== true
    || observed.steps?.length !== 7
    || !observed.steps.every(step => step.status === 'PASS')) {
    block('CERTIFICATION_NEEDS_UNRESTRICTED_PHYSICAL_PASS');
  }
  const snapshots = observed.snapshots ?? [];
  if (snapshots.length !== CANONICAL_WEB_CONSUMERS.length
    || CANONICAL_WEB_CONSUMERS.some(name =>
      snapshots.filter(item => item.consumer_repository === name).length !== 1)) {
    block('ALL_SEVEN_REAL_CONSUMER_SNAPSHOTS_REQUIRED');
  }
  const consumerSnapshot = snapshots.find(x => x.consumer_repository === 'vento-viso');
  if (consumerSnapshot.consumer_commit !== observed.consumer_sha
    || observed.package_sha !== testEvidence?.source_commit
    || observed.package_sha !== buildEvidence?.source_commit
    || observed.candidate_manifest_identity !== hash(manifestBytes)
    || observed.candidate_manifest_identity !== testEvidence?.manifest_identity
    || observed.candidate_manifest_identity !== buildEvidence?.package_manifest_hash
    || observed.artifact_content_identity !== buildEvidence?.artifact_content_hash
    || observed.test_evidence_identity !== testEvidence?.material_identity_sha256
    || observed.build_evidence_identity !== buildEvidence?.material_identity_sha256
    || testEvidence?.outcome !== 'PASS' || buildEvidence?.build_status !== 'PASS'
    || testEvidence?.invalidation_reason || buildEvidence?.invalidation_reason) {
    block('CI001_CI002_OBSERVATION_IDENTITY_MISMATCH');
  }
  const requiredVersionKeys = ['node', 'next', 'react', 'react_dom', 'typescript'];
  const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;
  if (!effectiveVersions || requiredVersionKeys.some(key =>
    !semver.test(String(effectiveVersions[key] ?? '')))
    || typeof npmVersion !== 'string' || !semver.test(npmVersion)) {
    block('EFFECTIVE_TOOLCHAIN_VERSIONS_NOT_MEASURED');
  }
  if (!consumerManifest || typeof consumerManifest.dependencies?.next !== 'string'
    || typeof consumerManifest.dependencies?.react !== 'string'
    || typeof consumerManifest.dependencies?.['react-dom'] !== 'string'
    || typeof consumerManifest.devDependencies?.typescript !== 'string') {
    block('CONSUMER_DECLARED_VERSIONS_NOT_MEASURED');
  }
  const binding = CANONICAL_BASE_RELATIONS.find(relation =>
    relation.package_name === CANDIDATE && relation.consumer_repository === 'vento-viso');
  if (!binding || binding.relation_identity !== 'PKG-COMP-MX-002') {
    block('CANONICAL_PILOT_RELATION_INVALID');
  }
  const material = compatibilityIdentity(observed);
  const versions = Object.fromEntries(requiredVersionKeys.map(key =>
    [key, effectiveVersions[key]]));
  const bands = Object.fromEntries(requiredVersionKeys.map(key => [
    key, { minimum: versions[key], maximum_tested: versions[key] },
  ]));
  const axisNotApplicable = new Map([
    ['COMP-AXIS-007', 'El paquete no exporta componentes React hidratables'],
    ['COMP-AXIS-008', 'La prueba no accede a Supabase ni a sus credenciales'],
    ['COMP-AXIS-010', 'No se ensayan autorizaciones reales de negocio ni produccion'],
    ['COMP-AXIS-011', 'El paquete no exporta CSS ni controles visuales de UI'],
  ]);
  const axes = COMPATIBILITY_AXES.map(({ id }) => (
    axisNotApplicable.has(id)
      ? { axis_id: id, status: 'NOT_APPLICABLE', reason: axisNotApplicable.get(id) }
      : { axis_id: id, status: 'PASS', evidence_ids: [material] }
  ));
  const coverage_evaluations = [
    ...['minimum_declared', 'maximum_tested', 'consumer_effective'].map(coverage_point => ({
      coverage_point, status: 'PASS', evidence_ids: [material],
      observed_versions: versions,
    })),
    { coverage_point: 'relevant_peers', status: 'NOT_APPLICABLE',
      reason: 'El package candidato no declara peerDependencies' },
    { coverage_point: 'server_client_ssr', status: 'NOT_APPLICABLE',
      reason: 'Next build probado; hidratacion y SSR remoto fuera del alcance del contrato sin componentes' },
  ];
  const pkg = {
    package_name: CANDIDATE,
    package_version: VERSION,
    package_source_commit: observed.package_sha,
    package_manifest_identity: observed.candidate_manifest_identity,
    artifact_content_identity: observed.artifact_content_identity,
    artifact_integrity: buildEvidence.pack_integrity,
    test_evidence: testEvidence,
    build_evidence: buildEvidence,
  };
  const relation = {
    ...binding,
    package_version: pkg.package_version,
    package_source_commit: pkg.package_source_commit,
    package_manifest_identity: pkg.package_manifest_identity,
    artifact_content_identity: pkg.artifact_content_identity,
    artifact_integrity: pkg.artifact_integrity,
    candidate_bands: bands,
    consumer_commit: consumerSnapshot.consumer_commit,
    consumer_manifest_identity: consumerSnapshot.consumer_manifest_identity,
    consumer_lockfile_identity: consumerSnapshot.consumer_lockfile_identity,
    declared_versions: {
      next: consumerManifest.dependencies.next,
      react: consumerManifest.dependencies.react,
      react_dom: consumerManifest.dependencies['react-dom'],
      typescript: consumerManifest.devDependencies.typescript,
    },
    resolved_versions: versions,
    toolchain_identity: hash('node:' + versions.node + ';npm:' + npmVersion),
    runtime_identity: hash('node:' + versions.node + ';next:' + versions.next),
    runtime_reproducible: true,
    environment: 'isolated-github-actions-viso-pinned-consumer',
    target: 'WEB', renderer: 'NEXT', profile: 'BASE_WEB',
    coverage_evaluations, axes,
    restrictions: [{
      owner: 'VENTO shared packages',
      scope: '@vento/contracts prerelease tested in one pinned VISO checkout',
      exit_criteria: 'Run authorized consumer migration and live application verification before broad adoption',
      reason: 'Exact Node, Next, React, TypeScript and VISO commit tested; no production authorization or live hydration validated',
    }],
    evidence_ids: [material],
    evidence_context: {
      package_name: CANDIDATE, consumer_repository: 'vento-viso',
      target: 'WEB', renderer: 'NEXT',
    },
    bypass_flags: [], stale: false, invalidation_reason: null,
  };
  return {
    schema_version: 1,
    release_channel_type: 'PRERELEASE',
    pilot_relation_ids: [binding.relation_identity],
    package_snapshot: pkg,
    consumer_snapshots: snapshots,
    relations: [relation],
    extension_bindings: [],
    metadata: {
      measurement_source: 'CI005_REAL_CONSUMER_PROBE',
      observation_identity: material,
      consumer_mode: 'isolated_exact_pin_no_production_changes',
    },
  };
}


function measuredPinnedVersions(lockBytes) {
  const lock = JSON.parse(lockBytes.toString('utf8'));
  const version = name => {
    const resolved = lock.packages?.['node_modules/' + name]?.version;
    if (typeof resolved !== 'string') block('PINNED_VERSION_NOT_FOUND_' +
      name.replace(/[^a-zA-Z0-9]/gu, '_').toUpperCase());
    return resolved;
  };
  return {
    node: process.versions.node,
    next: version('next'), react: version('react'),
    react_dom: version('react-dom'), typescript: version('typescript'),
  };
}

export function runtimeProgram(surface) {
  assert.equal(surface.length, 15, 'CI005_PUBLIC_SURFACE_CHANGED');
  assert.equal(surface.filter(x => x.type_only === true).length, 1,
    'CI005_PUBLIC_SURFACE_CHANGED');
  const runtime = surface.filter(x => x.type_only !== true);
  assert.equal(runtime.length, 14);
  const lines = ["import assert from 'node:assert/strict';"];
  runtime.forEach((entry, index) => {
    lines.push("import * as module" + index + " from '" + CANDIDATE + '/' +
      entry.subpath.slice(2) + "';");
    lines.push("assert.deepEqual(Object.keys(module" + index +
      ").sort(), " + JSON.stringify([...entry.expected_exports].sort()) + ");");
  });
  lines.push("const onlyTypes = await import('" + CANDIDATE +
    "/authorization/response-contracts/v1');");
  lines.push("assert.deepEqual(Object.keys(onlyTypes), []);");
  lines.push("console.log('CI005_VISO_RUNTIME_PASS');");
  return lines.join('\n') + '\n';
}

function nextPage(surface) {
  const runtime = surface.filter(x => !x.type_only);
  const lines = runtime.map((x, i) => "import * as module" + i + " from '" +
    CANDIDATE + '/' + x.subpath.slice(2) + "';");
  lines.unshift("import type { AccessContextV1, SimulationContextV1 } from '" +
    CANDIDATE + "/authorization/response-contracts/v1';");
  lines.push('type CI005TypeWitness = [AccessContextV1, SimulationContextV1];');
  lines.push('export default function ContractsProbe() {');
  lines.push('  const counts = [' + runtime.map((_, i) =>
    'Object.keys(module' + i + ').length').join(', ') + "].join(':');");
  lines.push('  return <main data-ci005-counts={counts}>Contracts probe</main>;');
  lines.push('}');
  return lines.join('\n') + '\n';
}

async function snapshot(repository, root = null) {
  if (!CONSUMERS.includes(repository)) block('SNAPSHOT_REPOSITORY_INVALID');
  if (root) {
    const sha = verified('git', ['rev-parse', 'HEAD'], root,
      'CONSUMER_COMMIT_UNAVAILABLE');
    if (!SHA.test(sha)) block('CONSUMER_SHA_INVALID');
    return {
      consumer_repository: repository, consumer_commit: sha,
      consumer_manifest_identity: hash(fs.readFileSync(path.join(root, 'package.json'))),
      consumer_lockfile_identity: hash(fs.readFileSync(path.join(root, 'package-lock.json'))),
    };
  }
  const rows = verified('git', ['ls-remote', '--heads',
    'https://github.com/' + OWNER + '/' + repository + '.git', 'refs/heads/main'],
  ROOT, 'SNAPSHOT_HEAD_UNAVAILABLE', 40000);
  const sha = rows.split(/\s+/u)[0];
  if (!SHA.test(sha)) block('SNAPSHOT_SHA_INVALID');
  const fetchHash = async name => {
    const url = 'https://raw.githubusercontent.com/' + OWNER + '/' +
      repository + '/' + sha + '/' + name;
    const res = await fetch(url, { method: 'GET', redirect: 'error',
      signal: AbortSignal.timeout(35000) });
    if (!res.ok) block('SNAPSHOT_' + name.replaceAll('.', '_') + '_HTTP');
    const bytes = Buffer.from(await res.arrayBuffer());
    if (!bytes.length) block('SNAPSHOT_EMPTY');
    return hash(bytes);
  };
  return {
    consumer_repository: repository, consumer_commit: sha,
    consumer_manifest_identity: await fetchHash('package.json'),
    consumer_lockfile_identity: await fetchHash('package-lock.json'),
  };
}

export function evaluateProbe(steps, originalManifestHash, manifestHash,
  originalLockHash, lockHash) {
  const expected = ['npm-ci', 'npm-install-tarball', 'runtime-first',
    'runtime-repeat', 'viso-baseline', 'viso-typecheck', 'viso-next-build'];
  const complete = expected.length === steps.length
    && expected.every((name, i) => steps[i]?.name === name
      && (steps[i]?.status === 'PASS'
        || (name === 'viso-typecheck' && steps[i]?.status === 'BASELINE_DEBT_UNCHANGED')));
  const restricted = steps.some(step => step.status === 'BASELINE_DEBT_UNCHANGED');
  const untouched = originalManifestHash === manifestHash
    && originalLockHash === lockHash;
  return { status: complete && untouched
      ? (restricted ? 'PASS_WITH_RESTRICTIONS' : 'PASS') : 'BLOCKED',
    all_steps_pass: complete,
    preexisting_typecheck_debt: restricted,
    consumer_manifest_unchanged: untouched,
    release_eligibility: 'PENDING_CI005_RELATION_ATTESTATION',
    publication_executed: false };
}

async function execute() {
  if (process.env.CI !== 'true'
    || process.env.GITHUB_REPOSITORY !== OWNER + '/vento-shell') block('CI_IDENTITY_INVALID');
  const sha = verified('git', ['rev-parse', 'HEAD'], ROOT, 'SOURCE_SHA_UNAVAILABLE');
  if (!SHA.test(sha) || process.env.GITHUB_SHA !== sha) block('SOURCE_SHA_MISMATCH');
  if (!process.versions.node.startsWith('24.')) block('NODE_24_REQUIRED');
  const testEvidence = oneEvidence(path.join(ROOT,
    '.delivery/shared-package-tests/vento__contracts'), 'CI001');
  const buildEvidence = oneEvidence(path.join(ROOT,
    '.delivery/shared-package-builds/vento__contracts'), 'CI002');
  if (testEvidence.outcome !== 'PASS' || buildEvidence.build_status !== 'PASS'
    || testEvidence.source_commit !== sha || buildEvidence.source_commit !== sha) {
    block('CI001_CI002_NOT_CURRENT_PASS');
  }
  const manifestBytes = fs.readFileSync(path.join(ROOT, 'packages/contracts/package.json'));
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  if (manifest.name !== CANDIDATE || manifest.version !== VERSION ||
    manifest.private !== true ||
    testEvidence.manifest_identity !== hash(manifestBytes) ||
    buildEvidence.package_manifest_hash !== hash(manifestBytes)) {
    block('PACKAGE_SOURCE_INVALID');
  }
  const buildContract = JSON.parse(fs.readFileSync(path.join(ROOT,
    'scripts/quality/vento-contracts-pilot-build-contract.json'), 'utf8'));
  const surface = buildContract.public_surface;
  if (surface.length !== 15
    || surface.reduce((n, x) => n + x.expected_exports.length, 0) !== 164
    || surface.filter(x => x.type_only).length !== 1) block('SURFACE_CHANGED');
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci005-viso-'));
  const steps = [];
  try {
    fs.chmodSync(temporary, 0o700);
    const packDir = path.join(temporary, 'preview');
    fs.mkdirSync(packDir, { mode: 0o700 });
    const archive = packPilotPrivatePreview({
      root: ROOT, temporaryRoot: packDir, packageName: CANDIDATE,
    });
    if (archive.report.preview_pack !== 'PASS') block('PREVIEW_NOT_CERTIFIED');
    const viso = path.join(temporary, 'viso');
    verified('git', ['clone', '--depth', '1', '--branch', 'main',
      'https://github.com/' + OWNER + '/vento-viso.git', viso],
    ROOT, 'VISO_CLONE_FAILED', 140000);
    const manifestOriginal = fs.readFileSync(path.join(viso, 'package.json'));
    const lockOriginal = fs.readFileSync(path.join(viso, 'package-lock.json'));
    const visoSnapshot = await snapshot('vento-viso', viso);
    const consumerSnapshots = await Promise.all(CONSUMERS.map(name => (
      name === 'vento-viso' ? visoSnapshot : snapshot(name)
    )));
    const npmCi = command('npm',
      ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], viso, 480000);
    steps.push({ name: 'npm-ci', status: npmCi.ok ? 'PASS' : 'FAIL' });
    if (!npmCi.ok) block('FAILED_NPM_CI');
    const dependencyTreeBefore = snapshotLockedInstall(viso, lockOriginal);
    // Establish an attributable baseline BEFORE the tarball or probe enters VISO.
    // No waiver is possible for new compiler diagnostics introduced by the candidate.
    const baselineTypecheck = command('npm', ['run', 'typecheck'], viso, 180000);
    const install = command('npm',
      ['install', '--no-save', '--package-lock=true',
        '--ignore-scripts', '--no-audit', '--no-fund', archive.tarballPath],
      viso, 480000);
    steps.push({ name: 'npm-install-tarball',
      status: install.ok ? 'PASS' : 'FAIL' });
    if (!install.ok) block('FAILED_NPM_INSTALL_TARBALL');
    // Lockfile-aware npm install may temporarily record the preview in the
    // isolated checkout. Preserve that fact and restore the original lockfile
    // before asserting no consumer source/lockfile persisted changes.
    const lockAfterInstall = fs.readFileSync(path.join(viso, 'package-lock.json'));
    const lockModifiedByPreview = hash(lockAfterInstall) !== hash(lockOriginal);
    const dependencyTreeAfter = snapshotLockedInstall(viso, lockOriginal);
    const frozenDependencies = compareFrozenDependencyTrees(
      dependencyTreeBefore, dependencyTreeAfter);
    if (lockModifiedByPreview) {
      fs.writeFileSync(path.join(viso, 'package-lock.json'), lockOriginal);
    }
    if (!frozenDependencies.frozen) {
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(path.join(OUT, 'blocked.json'), JSON.stringify({
        status: 'BLOCKED', failed_step: 'npm-install-tarball',
        reason: 'PINNED_DEPENDENCY_TREE_CHANGED',
        dependency_tree: frozenDependencies,
        lockfile_changed_and_restored: lockModifiedByPreview,
        package_sha: sha, consumer_sha: visoSnapshot.consumer_commit,
        relation_certified: false, publication_executed: false,
      }, null, 2) + '\n');
      block('PINNED_DEPENDENCY_TREE_CHANGED');
    }
    // Distinguish npm re-resolution from the transitory probe's TypeScript
    // surface without assuming an existing VISO TS2345 is unchanged.
    const postInstallTypecheck = command('npm', ['run', 'typecheck'], viso, 180000);
    fs.writeFileSync(path.join(viso, '.ci005-contracts-runtime.mjs'),
      runtimeProgram(surface));
    fs.writeFileSync(path.join(viso, '.ci005-contracts-types.ts'),
      "import type { AccessContextV1, SimulationContextV1 } from '" +
        CANDIDATE + "/authorization/response-contracts/v1';\n" +
        'export type CI005Witness = [AccessContextV1, SimulationContextV1];\n');
    const route = path.join(viso, 'src/app/ci005-private-contracts-probe');
    if (fs.existsSync(route)) block('ROUTE_COLLISION');
    fs.mkdirSync(route, { recursive: true });
    fs.writeFileSync(path.join(route, 'page.tsx'), nextPage(surface));
    for (const [name, binary, args, timeout] of [
      ['runtime-first', 'node', ['.ci005-contracts-runtime.mjs'], 45000],
      ['runtime-repeat', 'node', ['.ci005-contracts-runtime.mjs'], 45000],
      ['viso-baseline', 'npm', ['run', 'test:ci011'], 180000],
      ['viso-typecheck', 'npm', ['run', 'typecheck'], 180000],
      ['viso-next-build', 'npm', ['run', 'build:ci011'], 600000],
    ]) {
      const done = command(binary, args, viso, timeout);
      const stableBaseline = name === 'viso-typecheck' && !baselineTypecheck.ok
        && baselineTypecheck.compiler.identities.length > 0
        && JSON.stringify(done.compiler.identities)
          === JSON.stringify(baselineTypecheck.compiler.identities);
      const accepted = done.ok || stableBaseline;
      const status = done.ok ? 'PASS'
        : stableBaseline ? 'BASELINE_DEBT_UNCHANGED' : 'FAIL';
      steps.push({ name, status,
        ...(done.ok ? {} : { diagnostic: done.compiler }) });
      if (!accepted) {
        fs.mkdirSync(OUT, { recursive: true });
        fs.writeFileSync(path.join(OUT, 'blocked.json'),
          JSON.stringify({
            status: 'BLOCKED', failed_step: name,
            exit_code: done.code, compiler: done.compiler,
            typecheck_baseline: {
              ok: baselineTypecheck.ok, compiler: baselineTypecheck.compiler,
            },
            typecheck_after_install: {
              ok: postInstallTypecheck.ok, compiler: postInstallTypecheck.compiler,
            },
            dependency_tree: frozenDependencies,
            lockfile_changed_and_restored: lockModifiedByPreview,
            ...(name === 'viso-typecheck'
              ? { compare: {
                install_changed: JSON.stringify(baselineTypecheck.compiler.identities)
                  !== JSON.stringify(postInstallTypecheck.compiler.identities),
                probe_changed: JSON.stringify(postInstallTypecheck.compiler.identities)
                  !== JSON.stringify(done.compiler.identities),
              } } : {}),
            candidate: CANDIDATE, candidate_version: VERSION,
            package_sha: sha, consumer_sha: visoSnapshot.consumer_commit,
            publication_executed: false, relation_certified: false,
          }, null, 2) + '\n');
        const code = done.compiler.codes[0] ?? 'NON_TYPESCRIPT';
        block('FAILED_' + name.replaceAll('-', '_').toUpperCase() + '_' + code);
      }
    }
    const outcome = evaluateProbe(steps, hash(manifestOriginal),
      hash(fs.readFileSync(path.join(viso, 'package.json'))), hash(lockOriginal),
      hash(fs.readFileSync(path.join(viso, 'package-lock.json'))));
    if (!['PASS', 'PASS_WITH_RESTRICTIONS'].includes(outcome.status)) {
      block('CONSUMER_SOURCE_CHANGED');
    }
    fs.mkdirSync(OUT, { recursive: true });
    const evidence = {
      schema_version: 1, gate: 'CI005_REAL_CONSUMER_PROBE',
      candidate: CANDIDATE, candidate_version: VERSION, package_sha: sha,
      consumer: 'vento-viso', consumer_sha: visoSnapshot.consumer_commit,
      candidate_manifest_identity: hash(manifestBytes),
      artifact_content_identity: buildEvidence.artifact_content_hash,
      tarball_identity: hash(fs.readFileSync(archive.tarballPath)),
      test_evidence_identity: testEvidence.material_identity_sha256,
      build_evidence_identity: buildEvidence.material_identity_sha256,
      snapshots: consumerSnapshots, steps, ...outcome,
      dependency_tree: frozenDependencies,
      lockfile_changed_and_restored: lockModifiedByPreview,
    };
    fs.writeFileSync(path.join(OUT, 'observations.json'),
      JSON.stringify(evidence, null, 2) + '\n');
    if (outcome.status !== 'PASS') {
      console.log(JSON.stringify({ status: outcome.status, package_sha: sha,
        consumer_sha: visoSnapshot.consumer_commit,
        relation_certified: false, publication_executed: false }));
      block('FORMAL_CI005_REQUIRES_CLEAN_CONSUMER_PASS');
    }
    const npmVersion = verified('npm', ['--version'], viso,
      'NPM_VERSION_NOT_MEASURED', 30000);
    const input = buildRealCi005PilotInput({
      observed: evidence, testEvidence, buildEvidence, manifestBytes,
      consumerManifest: JSON.parse(manifestOriginal.toString('utf8')),
      effectiveVersions: measuredPinnedVersions(lockOriginal),
      npmVersion,
    });
    const prepared = prepareCompatibilityEvidence(input);
    if (prepared.result !== 'PASS') {
      fs.writeFileSync(path.join(OUT, 'blocked.json'), JSON.stringify({
        status: 'BLOCKED', gate: 'SHELL-CI-005::GLOBAL',
        reason_codes: prepared.reasons, relation_certified: false,
        publication_executed: false,
      }, null, 2) + '\n');
      block('FORMAL_CI005_PREPARE_BLOCKED');
    }
    const recheck = comparePreparedEvidence(prepared, input);
    if (!recheck.current || recheck.outcome !== 'PASS') {
      block('FORMAL_CI005_EVIDENCE_STALE');
    }
    const confirmedIdentity = requirePilotCompatibility({
      input, prepared, testEvidence, buildEvidence,
      sourceCommit: sha, manifestSource: manifestBytes.toString('utf8'),
    });
    if (confirmedIdentity !== prepared.compatibility_evidence_identity
      || prepared.required_relation_ids.length !== 1
      || prepared.required_relation_ids[0] !== 'PKG-COMP-MX-002'
      || prepared.relation_evaluations[0]?.state !== 'COMPATIBLE_CON_RESTRICCIONES') {
      block('FORMAL_CI005_RELATION_NOT_CERTIFIED');
    }
    fs.writeFileSync(path.join(OUT, 'input.json'),
      JSON.stringify(input, null, 2) + '\n');
    fs.writeFileSync(path.join(OUT, 'prepared.json'),
      JSON.stringify(prepared, null, 2) + '\n');
    console.log(JSON.stringify({
      status: 'PASS', ci005_prepared: 'PASS',
      ci005_relation: prepared.required_relation_ids[0],
      relation_status: prepared.relation_evaluations[0].state,
      compatibility_evidence_identity: confirmedIdentity,
      package_sha: sha, consumer_sha: visoSnapshot.consumer_commit,
      snapshots: consumerSnapshots.length, verified_steps: steps.length,
      publication_executed: false,
    }));
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  execute().catch(error => {
    const message = error instanceof Error ? error.message : '';
    console.error(/^CI005_VISO:[A-Z0-9_]+$/u.test(message)
      ? message : 'CI005_VISO:UNTRUSTED_EXECUTION_FAILURE');
    process.exitCode = 1;
  });
}
