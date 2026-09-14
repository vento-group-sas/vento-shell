import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

const migration = fs.readFileSync("supabase/migrations/20260829200745_auth_db_019_identity_links.sql", "utf8").replace(/\r\n?/gu, "\n")
const fixturesText = fs.readFileSync("tests/packages/GAP-PKG-018/fixtures.json", "utf8")
const fixtures = JSON.parse(fixturesText)

test("identity_access is fail-closed to client and service roles", () => {
  assert.match(
    migration,
    /revoke all privileges on table\s+identity_access\.principals,\s+identity_access\.identity_resolution_cases,\s+identity_access\.enterprise_identity_links\s+from public, anon, authenticated, service_role;/u,
  )
  assert.match(migration, /AUTH_DB_019_CLIENT_TABLE_PRIVILEGE_VIOLATION/u)
  assert.match(migration, /AUTH_DB_019_DDL_OWNER_CREATE_NOT_REVOKED/u)
})

test("managed Auth and VITAL boundaries are not mutated by the adopted foundation", () => {
  assert.doesNotMatch(migration, /references\s+auth\./iu)
  assert.doesNotMatch(migration, /\b(?:insert\s+into|update|delete\s+from)\s+vital\./iu)
  assert.match(migration, /AUTH_DB_019_VITAL_REFERENCE_MANIFEST_VIOLATION/u)
  assert.match(migration, /AUTH_DB_019_EMPLOYEE_LEGACY_CASCADE_CHANGED/u)
})

test("identity ambiguity and inactive lifecycle states are represented explicitly", () => {
  for (const token of [
    "AUTH_ACCOUNT_DUPLICATE",
    "ENTERPRISE_IDENTITY_DUPLICATE",
    "IDENTITY_LINK_DUPLICATE",
    "CROSS_CLASS_COLLISION",
    "LEGACY_SHARED_UUID",
    "DEVICE_HUMAN_COLLISION",
    "SUSPENDED",
    "REVOKED",
    "CONFLICT",
  ]) {
    assert.ok(migration.includes(token), token)
  }
})

test("fixtures contain no real credentials or direct PII authority", () => {
  assert.doesNotMatch(fixturesText, /@/u)
  assert.doesNotMatch(fixturesText, /(?:secret|password|token)["']?\s*:\s*["'][A-Za-z0-9+/=_-]{12,}/iu)
  assert.equal(fixtures.baseline_observations.policy, "OBSERVATION_ONLY_NOT_AUTHORITY_NOT_BACKFILL")
  for (const scenario of fixtures.scenarios) {
    if (!scenario.raw_user_meta_data) continue
    assert.equal(Object.hasOwn(scenario, "expected_role"), false)
    assert.equal(Object.hasOwn(scenario, "expected_site_id"), false)
  }
})
