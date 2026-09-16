import assert from "node:assert/strict"
import fs from "node:fs"
import http from "node:http"
import test from "node:test"

const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-019/fixtures.json", "utf8"))

function reconcileScenario(id) {
  const scenario = fixtures.reconciliation_scenarios.find((entry) => entry.id === id)
  const source = { ...fixtures.reconciliation_base.source, ...scenario.source }
  const processing = { ...fixtures.reconciliation_base.processing, ...scenario.processing }
  const accounted =
    processing.accepted_count +
    processing.rejected_count +
    processing.quarantine_count +
    processing.duplicate_count +
    processing.excluded_count
  return source.source_count === accounted && processing.accepted_count === processing.materialized_count
    ? "RECONCILED"
    : "DIFFERENCE"
}

function discloseScenario(id) {
  const scenario = fixtures.disclosure_scenarios.find((entry) => entry.id === id)
  const authorization = fixtures.authorization_decisions[scenario.authorization]
  const detailAuthorization = scenario.detail_authorization
    ? fixtures.authorization_decisions[scenario.detail_authorization]
    : null
  const aggregate = { ...fixtures.aggregate_base, ...scenario.aggregate }
  const rule = scenario.rule === null ? null : { ...fixtures.disclosure_rule_base, ...scenario.rule }
  const context = { ...fixtures.request_context_base, ...scenario.context }
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
  } else if (!rule) {
    mode = "SUPRIMIDO"
    reason = "DISCLOSURE_RULE_UNRESOLVED"
  } else if (aggregate.dimensions.some((dimension) => !rule.allowed_dimensions.includes(dimension))) {
    mode = "SUPRIMIDO"
    reason = "DIMENSION_NOT_DISCLOSABLE"
  } else if (aggregate.population_count < rule.minimum_population) {
    mode = "SUPRIMIDO"
    reason = "SMALL_POPULATION"
  } else if (rule.complementary_suppression_required) {
    mode = "SUPRIMIDO"
    reason = "COMPLEMENTARY_SUPPRESSION_REQUIRED"
  } else if (rule.successive_query_protection_required) {
    mode = "SUPRIMIDO"
    reason = "SUCCESSIVE_QUERY_GUARD_REQUIRED"
  } else if (context.comparison_requested) {
    mode = "SUPRIMIDO"
    reason = "COMPARISON_REQUIRES_INDEPENDENT_EVALUATION"
  } else if (context.export_requested && !rule.allow_export) {
    mode = "SUPRIMIDO"
    reason = "EXPORT_NOT_DISCLOSABLE"
  }

  const drillDownAllowed = Boolean(
    mode === "AGREGADO" &&
      context.drill_down_requested &&
      rule?.allow_drill_down &&
      detailAuthorization?.final_decision === "ALLOW" &&
      detailAuthorization.resource.request_mode !== "AGGREGATE" &&
      detailAuthorization.decision_id !== authorization.decision_id,
  )

  return {
    outcome: mode,
    reason_code: reason,
    metric_id: aggregate.metric_id,
    value: mode === "AGREGADO" ? aggregate.value : null,
    dimensions: mode === "AGREGADO" ? [...new Set(aggregate.dimensions)].sort() : [],
    drill_down_allowed: drillDownAllowed,
  }
}

function governedAggregate({ reconciliation_id, disclosure_id }) {
  const reconciliationStatus = reconcileScenario(reconciliation_id)
  if (reconciliationStatus !== "RECONCILED") {
    return {
      status: 409,
      payload: {
        outcome: "DENEGADO",
        reason_code: "AGGREGATE_RECONCILIATION_FAILED",
        value: null,
        dimensions: [],
        reconciliation_status: reconciliationStatus,
        drill_down_allowed: false,
      },
    }
  }

  const disclosure = discloseScenario(disclosure_id)
  return {
    status: disclosure.outcome === "DENEGADO" ? 403 : 200,
    payload: { ...disclosure, reconciliation_status: reconciliationStatus },
  }
}

async function startServer() {
  const server = http.createServer((request, response) => {
    let source = ""
    request.setEncoding("utf8")
    request.on("data", (chunk) => {
      source += chunk
    })
    request.on("end", () => {
      try {
        const result = governedAggregate(JSON.parse(source || "{}"))
        response.statusCode = result.status
        response.setHeader("content-type", "application/json")
        response.end(JSON.stringify(result.payload))
      } catch {
        response.statusCode = 400
        response.end(JSON.stringify({ error: "INVALID_GOVERNED_ANALYTICS_REQUEST" }))
      }
    })
  })

  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  const address = server.address()
  assert.ok(address && typeof address === "object")
  return { server, url: "http://127.0.0.1:" + address.port + "/governed-aggregate" }
}

const flows = [
  {
    id: "publish_reconciled_aggregate",
    reconciliation_id: "exact_reconciliation",
    disclosure_id: "publish_governed_sensitive_aggregate",
    expected_status: 200,
    expected_outcome: "AGREGADO",
    expected_reason: null,
    expected_value: 86.4,
    expected_drill_down: false,
  },
  {
    id: "block_unreconciled_aggregate",
    reconciliation_id: "unaccounted_source_fact",
    disclosure_id: "publish_governed_sensitive_aggregate",
    expected_status: 409,
    expected_outcome: "DENEGADO",
    expected_reason: "AGGREGATE_RECONCILIATION_FAILED",
    expected_value: null,
    expected_drill_down: false,
  },
  {
    id: "suppress_reconciled_small_population",
    reconciliation_id: "exact_reconciliation",
    disclosure_id: "suppress_small_population",
    expected_status: 200,
    expected_outcome: "SUPRIMIDO",
    expected_reason: "SMALL_POPULATION",
    expected_value: null,
    expected_drill_down: false,
  },
  {
    id: "deny_reconciled_but_unauthorized_aggregate",
    reconciliation_id: "exact_reconciliation",
    disclosure_id: "deny_without_authorization",
    expected_status: 403,
    expected_outcome: "DENEGADO",
    expected_reason: "AUTHORIZATION_DENIED",
    expected_value: null,
    expected_drill_down: false,
  },
  {
    id: "aggregate_permission_does_not_expand_to_detail",
    reconciliation_id: "exact_reconciliation",
    disclosure_id: "aggregate_authorization_does_not_grant_drill_down",
    expected_status: 200,
    expected_outcome: "AGREGADO",
    expected_reason: null,
    expected_value: 86.4,
    expected_drill_down: false,
  },
  {
    id: "separate_detail_decision_allows_drill_down",
    reconciliation_id: "exact_reconciliation",
    disclosure_id: "distinct_detail_authorization_grants_drill_down",
    expected_status: 200,
    expected_outcome: "AGREGADO",
    expected_reason: null,
    expected_value: 86.4,
    expected_drill_down: true,
  },
]

for (const flow of flows) {
  test("GAP-PKG-019 governed HTTP flow: " + flow.id, async (t) => {
    const { server, url } = await startServer()
    t.after(() => new Promise((resolve) => server.close(resolve)))

    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(flow),
    })
    const payload = await response.json()

    assert.equal(response.status, flow.expected_status)
    assert.equal(payload.outcome, flow.expected_outcome)
    assert.equal(payload.reason_code, flow.expected_reason)
    assert.equal(payload.value, flow.expected_value)
    assert.equal(payload.drill_down_allowed, flow.expected_drill_down)
    assert.equal(Object.hasOwn(payload, "population_count"), false)
    assert.equal(Object.hasOwn(payload, "counters"), false)
  })
}
