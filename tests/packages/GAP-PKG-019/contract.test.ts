import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"
import { assessPackageGateRecord, readPackageGatePolicy } from "../../../scripts/docs/package-gate-control.mjs"

const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-019/fixtures.json", "utf8"))
const gate = JSON.parse(
  fs.readFileSync("docs/plan-canonico/modular/package-gate-instances/GAP-PKG-019.json", "utf8"),
)
const migration = fs
  .readFileSync("supabase/migrations/20260913131524_gap_pkg_019_governed_analytics.sql", "utf8")
  .replace(/\r\n?/gu, "\n")
const manifest = fs.readFileSync("supabase/MIGRATION_MANIFEST.md", "utf8")

const expectedTaskIds = [
  "DATA-AUTH-002",
  "DATA-DOM-006",
  "DATA-INT-001",
  "SUPA-AUD-016",
  "SUPA-AUD-017",
  "SUPA-TRANS-009",
  "SUPA-TRANS-012",
]

const expectedTargets = [
  ["supabase/migrations/20260913131524_gap_pkg_019_governed_analytics.sql", "CREAR"],
  ["supabase/tests/packages/GAP-PKG-019.sql", "CREAR"],
  ["tests/packages/GAP-PKG-019/contract.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-019/integration.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-019/security.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-019/e2e.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-019/fixtures.json", "CREAR"],
  ["supabase/MIGRATION_MANIFEST.md", "MODIFICAR"],
  ["scripts/supabase/migration-manifest.mjs", "ADOPTAR_SIN_MODIFICAR"],
  ["scripts/quality/supabase-db-harness.mjs", "ADOPTAR_SIN_MODIFICAR"],
  ["scripts/supabase/environment-drift.mjs", "ADOPTAR_SIN_MODIFICAR"],
  ["scripts/supabase/recovery-drill.mjs", "ADOPTAR_SIN_MODIFICAR"],
  ["supabase/migrations/20260901062557_auth_db_034_authorization_evaluator.sql", "ADOPTAR_SIN_MODIFICAR"],
  ["supabase/tests/database/043_auth_db_034_authorization_evaluator.test.sql", "ADOPTAR_SIN_MODIFICAR"],
]

const expectedValidationCommands = [
  "npm run supabase:db:test:clean",
  "npm exec -- supabase test db supabase/tests/packages/GAP-PKG-019.sql",
  "node --test tests/packages/GAP-PKG-019/contract.test.ts",
  "node --test tests/packages/GAP-PKG-019/integration.test.ts",
  "node --test tests/packages/GAP-PKG-019/security.test.ts",
  "node --test tests/packages/GAP-PKG-019/e2e.test.ts",
  "npm test --silent",
]

test("GAP-PKG-019 keeps one exact DB/RPC implementation unit", () => {
  assert.equal(gate.package_id, "GAP-PKG-019")
  assert.equal(gate.status, assessPackageGateRecord(gate, { policy: readPackageGatePolicy() }).status)
  assert.equal(gate.canonical_snapshot.repository_owner, "devVentoGroup/vento-shell")
  assert.equal(gate.canonical_snapshot.runtime_profile, "DATABASE_RPC_BOUNDARY")
  assert.equal(gate.canonical_snapshot.dominant_task_id, "SUPA-AUD-016")
  assert.deepEqual(gate.canonical_snapshot.task_ids, expectedTaskIds)
  assert.deepEqual(fixtures.task_ids, expectedTaskIds)
  assert.deepEqual(gate.canonical_snapshot.missing_task_ids, [])
  assert.equal(gate.implementation_units.length, 1)
  assert.equal(gate.implementation_units[0].unit_id, "vento-shell:GAP-PKG-019:DB-RPC-001")
})

test("GAP-PKG-019 preserves deployed analytics and declares the catalog extension", () => {
  const actualTargets = new Map(gate.physical_identity.targets.map(({ path, operation }) => [path, operation]))
  for (const [path, operation] of expectedTargets) {
    assert.equal(actualTargets.get(path), path.startsWith("supabase/migrations/") ? "ADOPTAR_SIN_MODIFICAR" : operation === "CREAR" ? "MODIFICAR" : operation)
  }
  assert.equal(actualTargets.get("scripts/supabase/catalog-audit.mjs"), "CREAR")
  const commands = gate.evidence_plan.tests.map(({ command }) => command)
  assert.ok(expectedValidationCommands.every((command) => commands.includes(command)))
  assert.deepEqual(gate.scope_reconciliation.requirement_coverage.map(({ treq_id }) => treq_id).sort(), [
    "TREQ-SUPABASE-017", "TREQ-SUPABASE-031", "TREQ-SUPABASE-055", "TREQ-SUPABASE-093", "TREQ-SUPABASE-096", "TREQ-SUPABASE-232",
  ])
  for (const requirement of gate.scope_reconciliation.requirement_coverage) {
    assert.equal(requirement.legacy_evidence_covers_requirement, false)
    assert.ok(requirement.validation_commands.every((command) => commands.includes(command)))
  }
  assert.equal(fixtures.source_contract_policy, "SEMANTIC_RUNTIME_GUARD_NO_RAW_FILE_PIN")
})

test("migration materializes the three governed analytics symbols", () => {
  assert.match(migration, /app_private\.reconcile_analytic_aggregate\(\s*p_input jsonb/u)
  assert.match(migration, /app_private\.apply_small_population_disclosure\(\s*p_input jsonb/u)
  assert.match(migration, /api\.get_governed_analytic_aggregate\(\s*p_input jsonb/u)
  assert.match(migration, /app_private\.evaluate_authorization\(/u)
  assert.match(migration, /app_private\.project_safe_authorization_decision\(/u)
})

test("migration is a narrow function-only boundary", () => {
  assert.doesNotMatch(migration, /\bcreate\s+table\b/iu)
  assert.doesNotMatch(migration, /\b(?:insert\s+into|update|delete\s+from)\s+(?:auth|vital)\./iu)
  assert.doesNotMatch(migration, /raw_user_meta_data|service_role_key|supabase_service_role/iu)
  assert.match(migration, /security definer\s+set search_path = ''/u)
  assert.match(migration, /request\.jwt\.claim\.sub/u)
})

test("manifest tracks the package migration under AUTH-DB-015 governance", () => {
  assert.match(
    manifest,
    /\| 20260913131524 \| 20260913131524_gap_pkg_019_governed_analytics\.sql \| [0-9a-f]{64} \| [0-9]+ \| STANDARD \|/u,
  )
})

test("gate does not authorize remote or production mutation", () => {
  assert.equal(gate.deployment_environment.production_authorized, false)
  assert.match(gate.authorization_history.findLast((entry) => entry.superseded_by === "IMPLEMENTATION_SCOPE_RECONCILIATION").approval_statement, /No autoriza Supabase remoto ni producción/u)
  assert.ok(
    gate.evidence_plan.acceptance_criteria.includes(
      "No remote Supabase or production mutation is authorized by this gate dossier.",
    ),
  )
})
