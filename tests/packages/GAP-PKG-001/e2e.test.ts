import assert from "node:assert/strict"
import fs from "node:fs"
import http from "node:http"
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

function createExecutor(scenario) {
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
    from() {
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

  return async (headers) => execute(
    supabase,
    Deno,
    { headers },
    {},
    Response,
    { error() {} },
  )
}

async function startControlledServer(scenario) {
  const execute = createExecutor(scenario)

  const server = http.createServer(async (request, response) => {
    try {
      const headers = new Headers()

      for (const [name, value] of Object.entries(request.headers)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            headers.append(name, item)
          }
        } else if (value !== undefined) {
          headers.set(name, value)
        }
      }

      const boundaryResponse = await execute(headers)
      const body = await boundaryResponse.text()

      response.statusCode = boundaryResponse.status

      for (const [name, value] of boundaryResponse.headers.entries()) {
        response.setHeader(name, value)
      }

      response.end(body)
    } catch (error) {
      response.statusCode = 500
      response.end(
        JSON.stringify({
          error: error instanceof Error
            ? error.message
            : String(error),
        }),
      )
    }
  })

  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })

  const address = server.address()

  assert.ok(address)
  assert.equal(typeof address, "object")

  return {
    server,
    url: `http://127.0.0.1:${address.port}/`,
  }
}

for (const scenario of fixtures.scenarios) {
  test(`GAP-PKG-001 HTTP scenario: ${scenario.id}`, async (t) => {
    const { server, url } = await startControlledServer(scenario)

    t.after(
      () =>
        new Promise((resolve) => {
          server.close(resolve)
        }),
    )

    const headers = {}

    if (
      scenario.request_secret !== null &&
      scenario.request_secret !== undefined
    ) {
      headers["x-cron-key"] = scenario.request_secret
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
    })

    assert.equal(
      response.status,
      scenario.expected_status,
    )
  })
}
