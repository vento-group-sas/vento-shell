import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-019/fixtures.json", "utf8"))
const migration = fs
  .readFileSync("supabase/migrations/20260913131524_gap_pkg_019_governed_analytics.sql", "utf8")
  .replace(/\r\n?/gu, "\n")

function disclosureInput(scenario) {
  return {
    authorization: structuredClone(fixtures.authorization_decisions[scenario.authorization]),
    detailAuthorization: scenario.detail_authorization
      ? structuredClone(fixtures.authorization_decisions[scenario.detail_authorization])
      : null,
    aggregate: { ...structuredClone(fixtures.aggregate_base), ...scenario.aggregate },
    rule:
      scenario.rule === null
        ? null
        : { ...structuredClone(fixtures.disclosure_rule_base), ...scenario.rule },
    context: { ...structuredClone(fixtures.request_context_base), ...scenario.context },
  }
}

function ruleIsValid({ aggregate, rule, context }) {
  return Boolean(
    rule &&
      rule.contract_version === "1.0.0" &&
      rule.status === "ACTIVE" &&
      rule.purpose === context.purpose &&
      rule.metric_family === aggregate.metric_family &&
      rule.metric_id === aggregate.metric_id &&
      typeof rule.rule_id === "string" &&
      typeof rule.rule_version === "string" &&
      typeof rule.classification_version === "string" &&
      typeof rule.policy_version === "string" &&
      Array.isArray(rule.allowed_dimensions) &&
      Number.isSafeInteger(rule.minimum_population) &&
      rule.minimum_population > 0,
  )
}

function disclose(input) {
  const { authorization, detailAuthorization, aggregate, rule, context } = input
  const sensitive = ["S2", "S3", "S4"].includes(aggregate.classification)
  const validRule = ruleIsValid(input)
  let mode = "AGREGADO"
  let reason = null

  if (authorization.final_decision !== "ALLOW") {
    mode = "DENEGADO"
    reason = "AUTHORIZATION_DENIED"
  } else if (authorization.resource.request_mode !== "AGGREGATE") {
    mode = "DENEGADO"
    reason = "AGGREGATE_AUTHORIZATION_REQUIRED"
  } else if (context.export_requested && authorization.request.operation_kind !== "EXPORT") {
    mode = "DENEGADO"
    reason = "EXPORT_AUTHORIZATION_REQUIRED"
  } else if (sensitive && !validRule) {
    mode = "SUPRIMIDO"
    reason = "DISCLOSURE_RULE_UNRESOLVED"
  } else if (sensitive && !rule.primary_suppression_enabled) {
    mode = "SUPRIMIDO"
    reason = "PRIMARY_SUPPRESSION_REQUIRED"
  } else if (sensitive && aggregate.dimensions.some((dimension) => !rule.allowed_dimensions.includes(dimension))) {
    mode = "SUPRIMIDO"
    reason = "DIMENSION_NOT_DISCLOSABLE"
  } else if (sensitive && aggregate.population_count < rule.minimum_population) {
    mode = "SUPRIMIDO"
    reason = "SMALL_POPULATION"
  } else if (sensitive && rule.complementary_suppression_required) {
    mode = "SUPRIMIDO"
    reason = "COMPLEMENTARY_SUPPRESSION_REQUIRED"
  } else if (sensitive && rule.successive_query_protection_required) {
    mode = "SUPRIMIDO"
    reason = "SUCCESSIVE_QUERY_GUARD_REQUIRED"
  } else if (sensitive && context.comparison_requested) {
    mode = "SUPRIMIDO"
    reason = "COMPARISON_REQUIRES_INDEPENDENT_EVALUATION"
  } else if (sensitive && context.export_requested && !rule.allow_export) {
    mode = "SUPRIMIDO"
    reason = "EXPORT_NOT_DISCLOSABLE"
  }

  let drillDownAllowed = false
  let drillDownReason = null
  if (context.drill_down_requested) {
    if (mode !== "AGREGADO") {
      drillDownReason = "SUPPRESSED_CELL_NO_DRILL_DOWN"
    } else if (!validRule || !rule.allow_drill_down) {
      drillDownReason = "DRILL_DOWN_NOT_DISCLOSABLE"
    } else if (
      !detailAuthorization ||
      detailAuthorization.final_decision !== "ALLOW" ||
      detailAuthorization.resource.request_mode === "AGGREGATE" ||
      detailAuthorization.decision_id === authorization.decision_id
    ) {
      drillDownReason = "DISTINCT_DETAIL_AUTHORIZATION_REQUIRED"
    } else {
      drillDownAllowed = true
    }
  }

  return {
    mode,
    reason_code: reason,
    value: mode === "AGREGADO" ? aggregate.value : null,
    dimensions: mode === "AGREGADO" ? [...new Set(aggregate.dimensions)].sort() : [],
    drill_down_allowed: drillDownAllowed,
    drill_down_reason_code: drillDownReason,
  }
}

for (const scenario of fixtures.disclosure_scenarios) {
  test("GAP-PKG-019 disclosure scenario: " + scenario.id, () => {
    const result = disclose(disclosureInput(scenario))
    assert.equal(result.mode, scenario.expected_mode)
    assert.equal(result.reason_code, scenario.expected_reason)
    assert.equal(result.value, scenario.expected_value)
    assert.equal(result.drill_down_allowed, scenario.expected_drill_down)
    if (Object.hasOwn(scenario, "expected_drill_reason")) {
      assert.equal(result.drill_down_reason_code, scenario.expected_drill_reason)
    }
    if (result.mode !== "AGREGADO") assert.deepEqual(result.dimensions, [])
  })
}

test("private helpers are invoker-only while the single authenticated API is hardened", () => {
  const invokerFunctions = migration.match(/security invoker/gu) ?? []
  assert.equal(invokerFunctions.length, 2)
  assert.match(migration, /api\.get_governed_analytic_aggregate[\s\S]*?security definer\s+set search_path = ''/u)
  assert.match(migration, /request\.jwt\.claim\.sub/u)
  assert.match(
    migration,
    /revoke all\s+on function api\.get_governed_analytic_aggregate\(jsonb\)\s+from public, anon, authenticated, service_role;/u,
  )
  assert.match(
    migration,
    /grant execute\s+on function api\.get_governed_analytic_aggregate\(jsonb\)\s+to authenticated;/u,
  )
  assert.doesNotMatch(migration, /grant execute[\s\S]*?to (?:anon|service_role);/u)
})

test("safe API projection omits exact reconciliation counters and population size", () => {
  const apiBody = migration.match(
    /create or replace function\s+api\.get_governed_analytic_aggregate[\s\S]*?\$gap_pkg_019_api\$;/u,
  )?.[0]
  assert.ok(apiBody)
  assert.doesNotMatch(apiBody, /'counters'/u)
  assert.doesNotMatch(apiBody, /'population_count'/u)
  assert.match(apiBody, /'reconciliation_status'/u)
})

test("fixtures contain no credentials, direct PII or client authority overrides", () => {
  const fixturesText = JSON.stringify(fixtures)
  assert.doesNotMatch(fixturesText, /@/u)
  assert.doesNotMatch(fixturesText, /(?:password|secret|token)["']?\s*:/iu)
  assert.doesNotMatch(fixturesText, /raw_user_meta_data|force_allow|service_role/iu)
})
