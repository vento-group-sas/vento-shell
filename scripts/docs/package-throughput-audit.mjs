import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readPackageExecutionPolicy } from './package-execution-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';

function increment(map, key) {
  const normalized = String(key ?? 'UNKNOWN').trim() || 'UNKNOWN';
  map.set(normalized, (map.get(normalized) ?? 0) + 1);
}

function sortedObject(map) {
  return Object.fromEntries(
    [...map.entries()].sort(([left], [right]) => left.localeCompare(right, 'en')),
  );
}

export function buildPackageThroughputAudit({ registry, policy } = {}) {
  const packages = registry?.packages ?? [];
  const canonical = packages.filter(
    ({ source_kind: sourceKind }) => sourceKind === 'CANONICAL_GAP_PACKAGE',
  );

  const statusCounts = new Map();
  const layerCounts = new Map();
  const repositoryCounts = new Map();
  const runtimeCounts = new Map();
  const targetPathCounts = new Map();
  let dependencyEdges = 0;
  let packagesWithDependencies = 0;
  let graphRoots = 0;
  let supabaseMutationRequired = 0;

  for (const pkg of canonical) {
    increment(statusCounts, pkg.status);
    increment(layerCounts, pkg.execution?.layer ?? 'UNRESOLVED');
    increment(repositoryCounts, pkg.repository_owner ?? 'UNRESOLVED');
    increment(runtimeCounts, pkg.runtime_profile ?? 'UNRESOLVED');

    const dependencies = pkg.execution?.depends_on_package_ids ?? [];
    dependencyEdges += dependencies.length;
    if (dependencies.length > 0) packagesWithDependencies += 1;
    else graphRoots += 1;

    if (pkg.execution_requirements?.supabase_mutation_required === true) {
      supabaseMutationRequired += 1;
    }

    for (const targetPath of pkg.execution_requirements?.target_paths ?? []) {
      increment(targetPathCounts, targetPath);
    }
  }

  const sharedTargets = [...targetPathCounts.entries()]
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'en'));

  return {
    schema_version: 1,
    scope: 'ANALYSIS_ONLY',
    execution_policy: policy?.mode ?? 'UNKNOWN',
    parallel_execution_authorized: false,
    total_packages: packages.length,
    canonical_gap_packages: canonical.length,
    current_package: registry?.package_execution?.current?.package_id ?? null,
    current_position: registry?.package_execution?.current?.position ?? null,
    status_counts: sortedObject(statusCounts),
    layer_counts: sortedObject(layerCounts),
    repository_counts: sortedObject(repositoryCounts),
    runtime_profile_counts: sortedObject(runtimeCounts),
    packages_with_explicit_dependencies: packagesWithDependencies,
    dependency_edges: dependencyEdges,
    graph_roots: graphRoots,
    supabase_mutation_required: supabaseMutationRequired,
    distinct_target_paths: targetPathCounts.size,
    shared_target_paths: sharedTargets.length,
    max_packages_per_target_path: sharedTargets[0]?.[1] ?? (targetPathCounts.size > 0 ? 1 : 0),
    top_shared_targets: sharedTargets.slice(0, 20).map(([target_path, package_count]) => ({
      target_path,
      package_count,
    })),
    note: 'Reporte analítico. No altera el orden canónico ni autoriza paralelismo o batching.',
  };
}

function printAudit(audit) {
  console.log('=== PACKAGE THROUGHPUT AUDIT ===');
  console.log(`SCOPE: ${audit.scope}`);
  console.log(`EXECUTION_POLICY: ${audit.execution_policy}`);
  console.log(`PARALLEL_EXECUTION_AUTHORIZED: ${audit.parallel_execution_authorized ? 'SI' : 'NO'}`);
  console.log(`TOTAL_PACKAGES: ${audit.total_packages}`);
  console.log(`CANONICAL_GAP_PACKAGES: ${audit.canonical_gap_packages}`);
  console.log(`CURRENT_PACKAGE: ${audit.current_package ?? 'NONE'}`);
  console.log(`CURRENT_POSITION: ${audit.current_position ?? 'NONE'}`);
  console.log(`PACKAGES_WITH_EXPLICIT_DEPENDENCIES: ${audit.packages_with_explicit_dependencies}`);
  console.log(`DEPENDENCY_EDGES: ${audit.dependency_edges}`);
  console.log(`GRAPH_ROOTS: ${audit.graph_roots}`);
  console.log(`SUPABASE_MUTATION_REQUIRED: ${audit.supabase_mutation_required}`);
  console.log(`DISTINCT_TARGET_PATHS: ${audit.distinct_target_paths}`);
  console.log(`SHARED_TARGET_PATHS: ${audit.shared_target_paths}`);
  console.log(`MAX_PACKAGES_PER_TARGET_PATH: ${audit.max_packages_per_target_path}`);
  console.log(`STATUS_COUNTS: ${JSON.stringify(audit.status_counts)}`);
  console.log(`LAYER_COUNTS: ${JSON.stringify(audit.layer_counts)}`);
  console.log(`REPOSITORY_COUNTS: ${JSON.stringify(audit.repository_counts)}`);
  console.log(`RUNTIME_PROFILE_COUNTS: ${JSON.stringify(audit.runtime_profile_counts)}`);
  console.log(`TOP_SHARED_TARGETS: ${JSON.stringify(audit.top_shared_targets)}`);
  console.log(`NOTE: ${audit.note}`);
}

async function main() {
  const root = process.cwd();
  const readiness = scanPackageReadiness({
    root,
    check: true,
    trigger: 'package-throughput-audit',
    supplied: { skipDerivedReports: true },
  });
  const policy = readPackageExecutionPolicy(root);
  const audit = buildPackageThroughputAudit({ registry: readiness.registry, policy });
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(audit, null, 2));
    return;
  }
  printAudit(audit);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  main().catch((error) => {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
