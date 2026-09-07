import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const source = fs
  .readFileSync("supabase/functions/shift-runtime-processor/index.ts", "utf8")
  .replace(/\r\n?/gu, "\n")

const fixtures = JSON.parse(
  fs.readFileSync("tests/packages/GAP-PKG-001/fixtures.json", "utf8"),
)

function authorizationBoundary() {
  const start = source.indexOf("GAP-PKG-001:CRON_AUTHORIZATION_START")
  const end = source.indexOf("GAP-PKG-001:CRON_AUTHORIZATION_END")

  assert.ok(start >= 0)
  assert.ok(end > start)

  return source.slice(start, end)
}

test("GAP-PKG-001 declares the exact four TREQ oracles", () => {
  assert.deepEqual(
    Object.keys(fixtures.treq_oracles).sort(),
    [
      "TREQ-PROC-1490",
      "TREQ-SUPABASE-005",
      "TREQ-SUPABASE-006",
      "TREQ-SUPABASE-1760",
    ].sort(),
  )

  for (const oracle of Object.values(fixtures.treq_oracles)) {
    assert.equal(typeof oracle, "string")
    assert.ok(oracle.length > 30)
  }
})

test("TREQ-PROC-1490: authorization precedes business processing", () => {
  const boundaryEnd = source.indexOf("GAP-PKG-001:CRON_AUTHORIZATION_END")
  const firstBusinessQuery = source.indexOf('.from("shift_policy")')

  assert.ok(boundaryEnd >= 0)
  assert.ok(firstBusinessQuery > boundaryEnd)
})

test("TREQ-SUPABASE-005: missing server secret fails closed with 503", () => {
  const boundary = authorizationBoundary()

  assert.match(boundary, /if \(!expectedCronSecret\)/u)
  assert.match(boundary, /service_unavailable/u)
  assert.match(boundary, /status: 503/u)
  assert.doesNotMatch(boundary, /if \(expectedCronSecret &&/u)
})

test("TREQ-SUPABASE-006: authorization boundary does not serialize secret lookup errors", () => {
  const boundary = authorizationBoundary()

  assert.doesNotMatch(boundary, /secretError\.message/u)
  assert.match(boundary, /cron_secret_missing/u)
})

test("TREQ-SUPABASE-1760: table secret has priority and x-cron-key remains mandatory", () => {
  const boundary = authorizationBoundary()

  assert.match(
    boundary,
    /const expectedCronSecret = tableCronSecret \|\| environmentCronSecret/u,
  )

  assert.match(
    boundary,
    /req\.headers\.get\("x-cron-key"\) !== expectedCronSecret/u,
  )

  assert.match(boundary, /status: 401/u)
})
