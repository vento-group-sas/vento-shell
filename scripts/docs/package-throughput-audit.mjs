import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readPackageExecutionPolicy } from './package-execution-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { loadPackageApplicationClosure } from './package-application-closure.mjs';

function increment(map, key) {
  const normalized = String(key ?? 'UNKNOWN').trim() || 'UNKNOWN';
  map.set(normalized, (map.get(normalized) ?? 0) + 1);
}

function sortedObject(map) {
  return Object.fromEntries(
    [...map.entries()].sort(([left], [right]) => left.localeCompare(right, 'en')),
  );
}

export function buildPackageThroughputAudit({ registry, policy, applicationClosure } = {}) {
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

  const closureMetrics = applicationClosure?.metrics ?? null;
  const applicationCompletionCounts = new Map();
  for (const application of applicationClosure?.applications ?? []) {
    increment(applicationCompletionCounts, application?.completion_state ?? 'UNKNOWN');
  }

  return {
    schema_version: 1,
    scope: 'ANALYSIS_ONLY',
    execution_policy: policy?.mode ?? 'UNKNOWN',
    parallel_execution_authorized: false,
    governed_frontier_supported: registry?.package_execution?.mode === 'DETERMINISTIC_GOVERNED_FRONTIER',
    frontier_count: registry?.package_execution?.frontier?.length ?? 0,
    schedulable_frontier_count: registry?.package_execution?.schedulable_frontier?.length ?? 0,
    authorization_frontier_count: registry?.package_execution?.authorization_frontier?.length ?? 0,
    active_physical_count: registry?.package_execution?.active_physical?.length ?? 0,
    waiting_frontier_count: registry?.package_execution?.waiting?.length ?? 0,
    application_closure_available: Boolean(applicationClosure),
    application_closure_model_id: applicationClosure?.model_id ?? null,
    application_closure_fingerprint_sha256: applicationClosure?.fingerprint_sha256 ?? null,
    application_count: closureMetrics?.applications ?? null,
    package_closure_counts: closureMetrics?.package_closure_counts ?? null,
    packages_with_unresolved_consumers: closureMetrics?.packages_with_unresolved_consumers ?? null,
    acceptance_criteria_total: closureMetrics?.acceptance_criteria_total ?? null,
    acceptance_criteria_explicitly_closed: closureMetrics?.acceptance_criteria_explicitly_closed ?? null,
    acceptance_criteria_unknown: closureMetrics?.acceptance_criteria_unknown ?? null,
    application_completion_counts: applicationClosure ? sortedObject(applicationCompletionCounts) : null,
    application_relationship_counts: closureMetrics?.relationship_counts ?? null,
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
  console.log(`GOVERNED_FRONTIER_SUPPORTED: ${audit.governed_frontier_supported ? 'SI' : 'NO'}`);
  console.log(`FRONTIER_COUNT: ${audit.frontier_count}`);
  console.log(`SCHEDULABLE_FRONTIER_COUNT: ${audit.schedulable_frontier_count}`);
  console.log(`AUTHORIZATION_FRONTIER_COUNT: ${audit.authorization_frontier_count}`);
  console.log(`ACTIVE_PHYSICAL_COUNT: ${audit.active_physical_count}`);
  console.log(`WAITING_FRONTIER_COUNT: ${audit.waiting_frontier_count}`);
  console.log(`APPLICATION_CLOSURE_AVAILABLE: ${audit.application_closure_available ? 'SI' : 'NO'}`);
  console.log(`APPLICATION_CLOSURE_MODEL_ID: ${audit.application_closure_model_id ?? 'NONE'}`);
  console.log(`APPLICATION_CLOSURE_FINGERPRINT_SHA256: ${audit.application_closure_fingerprint_sha256 ?? 'NONE'}`);
  console.log(`APPLICATION_COUNT: ${audit.application_count ?? 'NONE'}`);
  console.log(`PACKAGE_CLOSURE_COUNTS: ${JSON.stringify(audit.package_closure_counts)}`);
  console.log(`APPLICATION_COMPLETION_COUNTS: ${JSON.stringify(audit.application_completion_counts)}`);
  console.log(`PACKAGES_WITH_UNRESOLVED_CONSUMERS: ${audit.packages_with_unresolved_consumers ?? 'NONE'}`);
  console.log(`ACCEPTANCE_CRITERIA_TOTAL: ${audit.acceptance_criteria_total ?? 'NONE'}`);
  console.log(`ACCEPTANCE_CRITERIA_EXPLICITLY_CLOSED: ${audit.acceptance_criteria_explicitly_closed ?? 'NONE'}`);
  console.log(`ACCEPTANCE_CRITERIA_UNKNOWN: ${audit.acceptance_criteria_unknown ?? 'NONE'}`);
  console.log(`APPLICATION_RELATIONSHIP_COUNTS: ${JSON.stringify(audit.application_relationship_counts)}`);
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
  const applicationClosure = loadPackageApplicationClosure({
    root,
    registry: readiness.registry,
  });
  const audit = buildPackageThroughputAudit({
    registry: readiness.registry,
    policy,
    applicationClosure,
  });
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
