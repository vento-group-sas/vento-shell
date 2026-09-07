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
  const startToken = "// GAP-PKG-001:CRON_AUTHORIZATION_START"
  const endToken = "// GAP-PKG-001:CRON_AUTHORIZATION_END"

  const start = source.indexOf(startToken)
  const end = source.indexOf(endToken)

  assert.ok(start >= 0)
  assert.ok(end > start)

  return source
    .slice(start + startToken.length, end)
    .replace(
      /\.maybeSingle<InternalJobSecretRow>\(\)/u,
      ".maybeSingle()",
    )
}

async function runScenario(scenario) {
  const calls = []
  const diagnostics = []

  const chain = {}

  for (const method of ["select", "eq", "limit"]) {
    chain[method] = () => chain
  }

  chain.maybeSingle = async () => ({
    data: scenario.table_lookup_error
      ? null
      : { secret_value: scenario.table_secret ?? "" },
    error: scenario.table_lookup_error
      ? new Error("controlled lookup failure")
      : null,
  })

  const supabase = {
    from(name) {
      calls.push(name)
      return chain
    },
  }

  const Deno = {
    env: {
      get(name) {
        return name === "SHIFT_RUNTIME_CRON_SECRET"
          ? scenario.environment_secret ?? ""
          : undefined
      },
    },
  }

  const headers = new Headers()

  if (
    scenario.request_secret !== null &&
    scenario.request_secret !== undefined
  ) {
    headers.set("x-cron-key", scenario.request_secret)
  }

  const fakeConsole = {
    error(...args) {
      diagnostics.push(args.map(String).join(" "))
    },
  }

  const AsyncFunction = Object.getPrototypeOf(
    async function () {},
  ).constructor

  const execute = new AsyncFunction(
    "supabase",
    "Deno",
    "req",
    "corsHeaders",
    "Response",
    "console",
    `
${authorizationBoundary()}

return new Response(JSON.stringify({ authorized: true }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
`,
  )

  const response = await execute(
    supabase,
    Deno,
    { headers },
    {},
    Response,
    fakeConsole,
  )

  const body = await response.text()

  return {
    status: response.status,
    body,
    calls,
    diagnostics,
  }
}

test("TREQ-PROC-1490: missing all server secrets returns 503 before business access", async () => {
  const scenario = fixtures.scenarios.find(
    (entry) => entry.id === "missing-all-secrets",
  )

  const result = await runScenario(scenario)

  assert.equal(result.status, 503)
  assert.deepEqual(result.calls, ["internal_job_secrets"])
})

test("TREQ-SUPABASE-005: lookup failure without fallback is fail-closed", async () => {
  const scenario = fixtures.scenarios.find(
    (entry) => entry.id === "lookup-failure-without-fallback",
  )

  const result = await runScenario(scenario)

  assert.equal(result.status, 503)
  assert.deepEqual(result.calls, ["internal_job_secrets"])
})

test("TREQ-SUPABASE-005: missing and incorrect caller secrets return 401 when server secret exists", async () => {
  for (const id of [
    "missing-request-secret",
    "wrong-request-secret",
  ]) {
    const scenario = fixtures.scenarios.find(
      (entry) => entry.id === id,
    )

    const result = await runScenario(scenario)

    assert.equal(result.status, 401)
    assert.deepEqual(result.calls, ["internal_job_secrets"])
  }
})

test("TREQ-SUPABASE-1760: table secret takes precedence over environment fallback", async () => {
  const accepted = fixtures.scenarios.find(
    (entry) => entry.id === "table-secret-priority-accepts-table",
  )

  const rejected = fixtures.scenarios.find(
    (entry) => entry.id === "table-secret-priority-rejects-environment",
  )

  assert.equal((await runScenario(accepted)).status, 200)
  assert.equal((await runScenario(rejected)).status, 401)
})

test("TREQ-SUPABASE-1760: environment secret remains a usable fallback", async () => {
  for (const id of [
    "environment-fallback",
    "lookup-failure-environment-fallback",
  ]) {
    const scenario = fixtures.scenarios.find(
      (entry) => entry.id === id,
    )

    assert.equal((await runScenario(scenario)).status, 200)
  }
})

test("TREQ-SUPABASE-006: synthetic secret material never appears in response or diagnostics", async () => {
  for (const scenario of fixtures.scenarios) {
    const result = await runScenario(scenario)

    const visible = [
      result.body,
      ...result.diagnostics,
    ].join("\n")

    for (const secret of [
      scenario.table_secret,
      scenario.environment_secret,
      scenario.request_secret,
    ]) {
      if (typeof secret === "string" && secret.length > 0) {
        assert.equal(
          visible.includes(secret),
          false,
          `secret leaked for scenario ${scenario.id}`,
        )
      }
    }
  }
})
