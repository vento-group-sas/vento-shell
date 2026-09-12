import assert from "node:assert/strict"
import fs from "node:fs"
import http from "node:http"
import test from "node:test"

const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-018/fixtures.json", "utf8"))

const compatible = new Map([
  ["HUMAN_USER", new Set(["EMPLOYEE", "CUSTOMER"])],
  ["SHARED_DEVICE", new Set(["DEVICE"])],
  ["SERVICE", new Set(["SYSTEM_ACTOR"])],
])

function resolveRequest(body) {
  const active = fixtures.links.filter((link) => (
    link.auth_subject_id === body.auth_subject_id && link.link_state === "ACTIVE"
  ))
  const candidates = body.requested_identity_kind
    ? active.filter((link) => link.enterprise_identity_kind === body.requested_identity_kind)
    : active

  if (candidates.length === 0) return { status: 403, payload: { error: "NO_ACTIVE_IDENTITY_LINK" } }
  if (candidates.length !== 1) return { status: 409, payload: { error: "AMBIGUOUS_IDENTITY_LINK" } }

  const link = candidates[0]
  if (!compatible.get(link.principal_kind)?.has(link.enterprise_identity_kind)) {
    return { status: 403, payload: { error: "INCOMPATIBLE_IDENTITY_LINK" } }
  }

  return {
    status: 200,
    payload: {
      principal_id: link.principal_id,
      principal_kind: link.principal_kind,
      enterprise_identity_kind: link.enterprise_identity_kind,
      enterprise_identity_id: link.enterprise_identity_id,
      link_origin: link.link_origin,
    },
  }
}

async function startServer() {
  const server = http.createServer((request, response) => {
    let source = ""
    request.setEncoding("utf8")
    request.on("data", (chunk) => { source += chunk })
    request.on("end", () => {
      try {
        const body = JSON.parse(source || "{}")
        const result = resolveRequest(body)
        response.statusCode = result.status
        response.setHeader("content-type", "application/json")
        response.end(JSON.stringify(result.payload))
      } catch {
        response.statusCode = 400
        response.end(JSON.stringify({ error: "INVALID_REQUEST" }))
      }
    })
  })

  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })

  const address = server.address()
  assert.ok(address && typeof address === "object")
  return { server, url: "http://127.0.0.1:" + address.port + "/resolve" }
}

for (const scenario of fixtures.scenarios) {
  test("GAP-PKG-018 controlled HTTP identity scenario: " + scenario.id, async (t) => {
    const { server, url } = await startServer()
    t.after(() => new Promise((resolve) => server.close(resolve)))

    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(scenario),
    })
    const payload = await response.json()

    assert.equal(response.status, scenario.expected_status)
    if (scenario.expected_status === 200) {
      assert.equal(payload.enterprise_identity_kind, scenario.expected_identity_kind)
      assert.equal(payload.enterprise_identity_id, scenario.expected_identity_id)
      assert.equal(Object.hasOwn(payload, "raw_user_meta_data"), false)
      assert.equal(Object.hasOwn(payload, "role"), false)
      assert.equal(Object.hasOwn(payload, "site_id"), false)
    } else {
      assert.equal(payload.error, scenario.expected_error)
    }
  })
}
