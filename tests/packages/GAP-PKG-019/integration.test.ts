import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-019/fixtures.json", "utf8"))
const migration = fs
  .readFileSync("supabase/migrations/20260913131524_gap_pkg_019_governed_analytics.sql", "utf8")
  .replace(/\r\n?/gu, "\n")

function reconciliationInput(scenario) {
  return {
    ...structuredClone(fixtures.reconciliation_base),
    source: { ...fixtures.reconciliation_base.source, ...scenario.source },
    processing: { ...fixtures.reconciliation_base.processing, ...scenario.processing },
  }
}

function requireNonNegativeInteger(value, name) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("INVALID_COUNTER:" + name)
  return value
}

function reconcile(input) {
  if (input.contract_version !== "1.0.0") throw new Error("INVALID_CONTRACT")

  for (const value of [
    input.source.source_id,
    input.source.source_version,
    input.source.schema_version,
    input.source.period_start,
    input.source.period_end,
    input.source.cutoff_at,
    input.processing.transformation_id,
    input.processing.transformation_version,
    input.lineage.input_fingerprint,
    input.lineage.result_fingerprint,
  ]) {
    if (typeof value !== "string" || value.length === 0) throw new Error("INVALID_IDENTITY")
  }

  const source = requireNonNegativeInteger(input.source.source_count, "source")
  const accepted = requireNonNegativeInteger(input.processing.accepted_count, "accepted")
  const rejected = requireNonNegativeInteger(input.processing.rejected_count, "rejected")
  const quarantine = requireNonNegativeInteger(input.processing.quarantine_count, "quarantine")
  const duplicates = requireNonNegativeInteger(input.processing.duplicate_count, "duplicates")
  const excluded = requireNonNegativeInteger(input.processing.excluded_count, "excluded")
  const materialized = requireNonNegativeInteger(input.processing.materialized_count, "materialized")
  const accounted = accepted + rejected + quarantine + duplicates + excluded
  const sourceDifference = source - accounted
  const materializationDifference = accepted - materialized

  return {
    status: sourceDifference === 0 && materializationDifference === 0 ? "RECONCILED" : "DIFFERENCE",
    source_difference: sourceDifference,
    materialization_difference: materializationDifference,
    counters: { source, accepted, rejected, quarantine, duplicates, excluded, materialized, accounted },
    lineage: structuredClone(input.lineage),
  }
}

for (const scenario of fixtures.reconciliation_scenarios) {
  test("GAP-PKG-019 reconciliation scenario: " + scenario.id, () => {
    const result = reconcile(reconciliationInput(scenario))
    assert.equal(result.status, scenario.expected_status)
    assert.equal(result.source_difference, scenario.expected_source_difference)
    assert.equal(result.materialization_difference, scenario.expected_materialization_difference)
  })
}

test("reconciliation is deterministic and preserves lineage", () => {
  const input = reconciliationInput(fixtures.reconciliation_scenarios[0])
  assert.deepEqual(reconcile(input), reconcile(structuredClone(input)))
  assert.deepEqual(reconcile(input).lineage, fixtures.reconciliation_base.lineage)
})

test("negative, fractional and string counters fail instead of being coerced", () => {
  for (const invalid of [-1, 1.5, "86"]) {
    const input = reconciliationInput(fixtures.reconciliation_scenarios[0])
    input.processing.accepted_count = invalid
    assert.throws(() => reconcile(input), /INVALID_COUNTER:accepted/u)
  }
})

test("migration implements the canonical reconciliation equation explicitly", () => {
  for (const counter of [
    "accepted_count",
    "rejected_count",
    "quarantine_count",
    "duplicate_count",
    "excluded_count",
    "materialized_count",
  ]) {
    assert.ok(migration.includes(counter), counter)
  }
  assert.match(migration, /v_source_count - v_accounted_count/u)
  assert.match(migration, /v_accepted_count - v_materialized_count/u)
  assert.match(migration, /'status', case when v_reconciled then 'RECONCILED' else 'DIFFERENCE' end/u)
})

test("package reuses authorization, manifest, drift and recovery foundations without redefining them", () => {
  for (const path of [
    "scripts/supabase/migration-manifest.mjs",
    "scripts/quality/supabase-db-harness.mjs",
    "scripts/supabase/environment-drift.mjs",
    "scripts/supabase/recovery-drill.mjs",
    "supabase/migrations/20260901062557_auth_db_034_authorization_evaluator.sql",
    "supabase/tests/database/043_auth_db_034_authorization_evaluator.test.sql",
  ]) {
    assert.equal(fs.existsSync(path), true, path)
  }
  assert.doesNotMatch(migration, /create or replace function\s+app_private\.evaluate_authorization/iu)
  assert.doesNotMatch(migration, /create or replace function\s+api\.get_safe_authorization_decision/iu)
})
