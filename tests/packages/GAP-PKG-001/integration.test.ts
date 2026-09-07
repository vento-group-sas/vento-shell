import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const gate = JSON.parse(
  fs.readFileSync(
    "docs/plan-canonico/modular/package-gate-instances/GAP-PKG-001.json",
    "utf8",
  ),
)

const fixtures = JSON.parse(
  fs.readFileSync("tests/packages/GAP-PKG-001/fixtures.json", "utf8"),
)

const source = fs
  .readFileSync("supabase/functions/shift-runtime-processor/index.ts", "utf8")
  .replace(/\r\n?/gu, "\n")

const expectedTargets = [
  "supabase/functions/shift-runtime-processor/index.ts",
  "supabase/tests/packages/GAP-PKG-001.sql",
  "tests/packages/GAP-PKG-001/contract.test.ts",
  "tests/packages/GAP-PKG-001/integration.test.ts",
  "tests/packages/GAP-PKG-001/security.test.ts",
  "tests/packages/GAP-PKG-001/e2e.test.ts",
  "tests/packages/GAP-PKG-001/fixtures.json",
]

test("GAP-PKG-001 physical target set remains exact", () => {
  const actualTargets = gate.physical_identity.targets
    .map((entry) => entry.path)
    .sort()

  assert.deepEqual(actualTargets, [...expectedTargets].sort())

  assert.equal(
    actualTargets.some((entry) => entry.startsWith("supabase/migrations/")),
    false,
  )
})

test("GAP-PKG-001 retains exactly one shift-runtime-processor implementation unit", () => {
  assert.equal(gate.implementation_units.length, 1)
  assert.equal(
    gate.implementation_units[0].unit_id,
    "shift-runtime-processor",
  )
  assert.equal(
    gate.implementation_units[0].repository,
    "vento-group-sas/vento-shell",
  )
})

test("TREQ-PROC-1490: existing business pipeline remains behind the authorization boundary", () => {
  const boundaryEnd = source.indexOf("GAP-PKG-001:CRON_AUTHORIZATION_END")

  assert.ok(boundaryEnd >= 0)

  const businessSource = source.slice(boundaryEnd)

  for (const surface of [
    '.from("shift_policy")',
    '.from("employee_shifts")',
    '.from("shift_runtime_events")',
    '.from("attendance_logs")',
    '.from("employee_push_tokens")',
  ]) {
    assert.ok(
      businessSource.includes(surface),
      `missing existing business surface: ${surface}`,
    )
  }
})

test("GAP-PKG-001 keeps the canonical implementation environment profile", () => {
  assert.equal(
    fixtures.environment_profile,
    "ENV-SUPABASE-LOCAL-CI-STAGING",
  )

  assert.equal(
    fixtures.implementation_unit,
    "shift-runtime-processor",
  )
})
