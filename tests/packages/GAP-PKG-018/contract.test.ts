import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-018/fixtures.json", "utf8"))
const gate = JSON.parse(fs.readFileSync("docs/plan-canonico/modular/package-gate-instances/GAP-PKG-018.json", "utf8"))
const treqSource = fs.readFileSync("docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_05_SUPABASE.md", "utf8")

const expectedTreqIds = [
  "TREQ-SUPABASE-029",
  "TREQ-SUPABASE-116",
  "TREQ-SUPABASE-117",
  "TREQ-SUPABASE-124",
  "TREQ-SUPABASE-125",
  "TREQ-SUPABASE-126",
  "TREQ-SUPABASE-127",
  "TREQ-SUPABASE-131",
  "TREQ-SUPABASE-134",
  "TREQ-SUPABASE-135",
  "TREQ-SUPABASE-138",
]

const expectedTargets = [
  ["supabase/migrations/20260829200745_auth_db_019_identity_links.sql", "ADOPTAR_SIN_MODIFICAR"],
  ["supabase/tests/packages/GAP-PKG-018.sql", "CREAR"],
  ["tests/packages/GAP-PKG-018/contract.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-018/integration.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-018/security.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-018/e2e.test.ts", "CREAR"],
  ["tests/packages/GAP-PKG-018/fixtures.json", "CREAR"],
]

const expectedValidationCommands = [
  "npm run supabase:db:test:clean",
  "npm exec -- supabase test db supabase/tests/packages/GAP-PKG-018.sql",
  "node --test tests/packages/GAP-PKG-018/contract.test.ts",
  "node --test tests/packages/GAP-PKG-018/integration.test.ts",
  "node --test tests/packages/GAP-PKG-018/security.test.ts",
  "node --test tests/packages/GAP-PKG-018/e2e.test.ts",
  "npm test --silent",
]

function gap018TreqIds() {
  return treqSource
    .split(/\r?\n/u)
    .filter((line) => line.startsWith("| `TREQ-") && line.includes("`GAP-PKG-018`"))
    .map((line) => line.match(/^\| `(TREQ-[^`]+)`/u)?.[1] ?? null)
    .filter(Boolean)
    .sort()
}

test("GAP-PKG-018 binds exactly the eleven canonical TREQ contracts", () => {
  assert.deepEqual(gap018TreqIds(), [...expectedTreqIds].sort())
  assert.deepEqual([...fixtures.treq_ids].sort(), [...expectedTreqIds].sort())
  assert.equal(fixtures.requirements.length, 11)
  for (const requirement of fixtures.requirements) {
    assert.ok(expectedTreqIds.includes(requirement.id))
    assert.ok(requirement.oracle.length > 20)
    assert.ok(requirement.scenarios.length > 0)
  }
})

test("GAP-PKG-018 source contract uses the current canonical semantic profile", () => {
  assert.equal(gate.package_id, "GAP-PKG-018")
  assert.equal(gate.status, "APPROVED_FOR_IMPLEMENTATION")
  assert.equal(gate.canonical_snapshot.repository_owner, "devVentoGroup/vento-shell")
  assert.equal(gate.canonical_snapshot.runtime_profile, "DATABASE_RPC_BOUNDARY")
  assert.equal(gate.canonical_snapshot.dominant_task_id, "SUPA-AUD-010")
  assert.deepEqual(gate.canonical_snapshot.task_ids, ["SUPA-ARC-008", "SUPA-ARC-009", "SUPA-AUD-010"])
  assert.deepEqual(gate.canonical_snapshot.missing_task_ids, [])

  assert.equal(gate.implementation_units.length, 1)
  assert.equal(gate.implementation_units[0].unit_id, "identity_access")
  assert.equal(gate.implementation_units[0].repository, "vento-group-sas/vento-shell")
  assert.match(gate.implementation_units[0].change, /AUTH-DB-019/u)
  assert.match(gate.implementation_units[0].change, /without changing Auth hosted objects, VITAL, legacy foreign keys or production/u)

  assert.equal(fixtures.source_contract_policy, "SEMANTIC_RUNTIME_GUARD_NO_RAW_FILE_PIN")
})

test("GAP-PKG-018 physical delta adopts AUTH-DB-019 and creates evidence only", () => {
  const actual = gate.physical_identity.targets.map(({ path, operation }) => [path, operation])
  assert.deepEqual(actual, expectedTargets)
  assert.deepEqual(gate.evidence_plan.tests.map(({ command }) => command), expectedValidationCommands)
  assert.equal(gate.deployment_environment.environment_profile, "ENV-SUPABASE-LOCAL-CI-STAGING")
  assert.equal(gate.deployment_environment.production_authorized, false)
  assert.deepEqual(gate.deployment_environment.targets, [{
    environment_role: "STAGING",
    target_type: "SUPABASE_PROJECT_REF",
    target_id: "rcrxixmqhrndcervbllp",
    owner: "SUPA-TRANS-015",
  }])
})
