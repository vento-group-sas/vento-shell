import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const migration = fs.readFileSync("supabase/migrations/20260829200745_auth_db_019_identity_links.sql", "utf8").replace(/\r\n?/gu, "\n")
const fixtures = JSON.parse(fs.readFileSync("tests/packages/GAP-PKG-018/fixtures.json", "utf8"))

const compatible = new Map([
  ["HUMAN_USER", new Set(["EMPLOYEE", "CUSTOMER"])],
  ["SHARED_DEVICE", new Set(["DEVICE"])],
  ["SERVICE", new Set(["SYSTEM_ACTOR"])],
])

function resolveIdentity({ authSubjectId, requestedIdentityKind = null, links = fixtures.links }) {
  const active = links.filter((link) => link.auth_subject_id === authSubjectId && link.link_state === "ACTIVE")
  const candidates = requestedIdentityKind
    ? active.filter((link) => link.enterprise_identity_kind === requestedIdentityKind)
    : active

  if (candidates.length === 0) return { status: 403, error: "NO_ACTIVE_IDENTITY_LINK" }
  if (candidates.length !== 1) return { status: 409, error: "AMBIGUOUS_IDENTITY_LINK" }

  const link = candidates[0]
  if (!compatible.get(link.principal_kind)?.has(link.enterprise_identity_kind)) {
    return { status: 403, error: "INCOMPATIBLE_IDENTITY_LINK" }
  }

  return {
    status: 200,
    principal_id: link.principal_id,
    principal_kind: link.principal_kind,
    enterprise_identity_kind: link.enterprise_identity_kind,
    enterprise_identity_id: link.enterprise_identity_id,
    link_origin: link.link_origin,
  }
}

test("AUTH-DB-019 materializes the canonical identity_access graph used by GAP-PKG-018", () => {
  assert.match(migration, /create table identity_access\.principals/u)
  assert.match(migration, /create table identity_access\.identity_resolution_cases/u)
  assert.match(migration, /create table identity_access\.enterprise_identity_links/u)
  assert.match(migration, /ux_principals_auth_subject/u)
  assert.match(migration, /ux_enterprise_identity_links_active_auth_subject_kind/u)
  assert.match(migration, /ux_enterprise_identity_links_active_enterprise_identity/u)
})

test("explicit active links resolve and Auth metadata is not consumed as enterprise authority", () => {
  for (const id of ["active_employee", "active_customer", "active_device", "active_service", "invitation_employee"]) {
    const scenario = fixtures.scenarios.find((entry) => entry.id === id)
    const result = resolveIdentity({
      authSubjectId: scenario.auth_subject_id,
      requestedIdentityKind: scenario.requested_identity_kind,
    })
    assert.equal(result.status, 200, id)
    assert.equal(result.enterprise_identity_kind, scenario.expected_identity_kind, id)
    assert.equal(result.enterprise_identity_id, scenario.expected_identity_id, id)
    assert.equal(Object.hasOwn(result, "raw_user_meta_data"), false, id)
    assert.equal(Object.hasOwn(result, "role"), false, id)
    assert.equal(Object.hasOwn(result, "site_id"), false, id)
  }
})

test("multi-kind identity requires explicit disambiguation while preserving legitimate kinds", () => {
  const ambiguous = resolveIdentity({ authSubjectId: "auth-multikind-1" })
  assert.deepEqual(ambiguous, { status: 409, error: "AMBIGUOUS_IDENTITY_LINK" })

  const employee = resolveIdentity({ authSubjectId: "auth-multikind-1", requestedIdentityKind: "EMPLOYEE" })
  assert.equal(employee.status, 200)
  assert.equal(employee.enterprise_identity_id, "employee-2")

  const customer = resolveIdentity({ authSubjectId: "auth-multikind-1", requestedIdentityKind: "CUSTOMER" })
  assert.equal(customer.status, 200)
  assert.equal(customer.enterprise_identity_id, "customer-2")
})

test("missing, revoked, suspended and duplicate active mappings fail closed", () => {
  for (const id of ["baseline_not_authority", "revoked_with_session", "suspended_employee", "ambiguous_same_kind"]) {
    const scenario = fixtures.scenarios.find((entry) => entry.id === id)
    const result = resolveIdentity({
      authSubjectId: scenario.auth_subject_id,
      requestedIdentityKind: scenario.requested_identity_kind,
    })
    assert.equal(result.status, scenario.expected_status, id)
    assert.equal(result.error, scenario.expected_error, id)
  }
})

test("existing AccessContext resolver graph remains aligned to enterprise_identity_links", () => {
  const contextMigration = fs.readFileSync("supabase/migrations/20260830215737_auth_db_033_access_context.sql", "utf8").replace(/\r\n?/gu, "\n")
  assert.match(contextMigration, /app_private\.get_access_context/u)
  assert.match(contextMigration, /identity_access\.enterprise_identity_links/u)
  assert.match(contextMigration, /api\.get_safe_access_context/u)
})
