// QA-ONLY source concordance: SHELL-CON-003, AUTH-CAT-016/025 and
// AUTH-DB-034. No SQL execution, runtime grants or deployed-backend attestation.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../../../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const doc = read("docs/plan-canonico/modular/bloques/D_MATRICES/08_REVISION_CONTRACTUAL_PREVIA_DATASETS.md");
const history = read("docs/plan-canonico/modular/bloques/C_CATALOGO/06_CONTRATO_DE_RECURSO.md");
const sql = read("supabase/migrations/20260901062557_auth_db_034_authorization_evaluator.sql");
const permissions = JSON.parse(read("packages/contracts/authorization/catalog/versions/1.0.0/permissions.json"));
const Q = String.fromCharCode(96);
const FENCE = Q.repeat(3);
const SQL_TAG = "$authdb034_permission_rows_7d9370580349$";
const RELEASE = "sha256:9e8d1d7452ed5844fa76b9c718e7bb82ae029d6031234b3b6d9a17f22c2a4359";
const REGISTRY = "sha256:2f19d2ebabcc87f8a6bb8029da8f87e05ea86c9acb027aec134995d338604bf4";
const RETIRED = "nexo.inventory.remissions.dispatch";
const HASH = /^sha256:[a-f0-9]{64}$/u;

function quoted(value) {
  assert.ok(value.startsWith(Q) && value.endsWith(Q), "Source-quoted literal required");
  return value.slice(1, -1);
}
function table(source, beginning, ending, length) {
  const a = source.indexOf(beginning);
  assert.ok(a >= 0, "Canonical table missing: " + beginning);
  const b = source.indexOf(ending, a + beginning.length);
  assert.ok(b > a, "Canonical table not terminated: " + beginning);
  return source.slice(a, b).split(/\r?\n/u)
    .filter((x) => x.startsWith("| " + Q))
    .map((line) => {
      const cols = line.split("|").slice(1, -1).map((x) => x.trim());
      assert.equal(cols.length, length);
      return cols;
    });
}
function registry(source) {
  const marker = "Registro complementario canónico:\n\n" + FENCE + "jsonl\n";
  const chunks = source.split(marker);
  assert.equal(chunks.length, 2, "Identity registry missing or ambiguous");
  const block = chunks[1].split("\n" + FENCE);
  assert.ok(block.length > 1, "Identity registry unclosed");
  const [head, ...inherited] = block[0].trim().split(/\r?\n/u).map(JSON.parse);
  return { head, inherited };
}
function successor(source) {
  const perms = table(source, "#### 7. Matriz contractual explícita de las 29 PermissionKey",
    "#### 8. Contratos completos de recurso", 11)
    .map((c) => ({ key: quoted(c[0]), id: quoted(c[9]), hash: quoted(c[10]) }));
  const resources = table(source, "#### 8. Contratos completos de recurso",
    "#### 9.", 10)
    .map((c) => ({ id: quoted(c[0]), type: quoted(c[1]), hash: quoted(c[9]) }));
  return { perms, resources };
}
function historic(source) {
  return table(source, "#### 15. Matriz completa de los 112 permisos",
    "#### 16. Resumen cuantitativo", 6)
    .map((c) => ({ key: quoted(c[0]), type: quoted(c[1]) }));
}
function physical(source) {
  const pieces = source.split(SQL_TAG);
  assert.equal(pieces.length, 3, "Physical SQL registry source changed");
  const rows = JSON.parse(pieces[1].trim());
  assert.ok(Array.isArray(rows));
  return rows;
}
function indexUnique(rows, keyOf) {
  const result = new Map();
  for (const row of rows) {
    const k = keyOf(row);
    assert.equal(typeof k, "string");
    assert.ok(k.length > 0 && !result.has(k), "Duplicated contract identity");
    result.set(k, row);
  }
  return result;
}
function sameKeys(a, b) {
  assert.deepEqual([...a.keys()].sort(), [...b.keys()].sort());
}
function inspect(catalog, document, archived, migration) {
  const { head, inherited } = registry(document);
  const { perms: successors, resources } = successor(document);
  const oldMap = indexUnique(historic(archived), (r) => r.key);
  const activeMap = indexUnique(catalog, (r) => r.permission_key);
  const inheritedMap = indexUnique(inherited, (r) => r.permission_key);
  const successorMap = indexUnique(successors, (r) => r.key);
  const resourceMap = indexUnique(resources, (r) => r.id);
  const physicalMap = indexUnique(physical(migration), (r) => r.permission_key);
  assert.equal(head.record_type, "resource_contract_identity_completion_header");
  assert.equal(head.catalog_id, "vento.authorization");
  assert.equal(head.catalog_version, "1.1.0");
  assert.equal(head.correction_id, "AUTH-CAT-025::CORR-001");
  assert.equal(head.successor_release_hash, RELEASE);
  assert.equal(head.runtime_derivation_allowed, false);
  assert.equal(head.semantic_change, false);
  assert.equal(head.permission_keyset_changed, false);
  assert.equal(head.unresolved_resource_contract_id, 0);
  assert.equal(head.active_permission_count, catalog.length);
  assert.equal(head.inherited_resource_contract_count, inheritedMap.size);
  assert.equal(head.successor_resource_contract_count, successorMap.size);
  assert.equal(head.total_resolved_resource_contract_id, catalog.length);
  assert.ok(document.includes("identity_registry_sha256 = " + REGISTRY));
  assert.ok(migration.includes("resource identity registry = " + REGISTRY));
  assert.ok(migration.includes("vento.authorization@1.1.0 = " + RELEASE));
  assert.equal(oldMap.size, 112);
  assert.equal(inheritedMap.size, 111);
  assert.equal(successorMap.size, 29);
  assert.equal(resourceMap.size, 29);
  assert.equal(activeMap.size, 140);
  assert.equal(physicalMap.size, 140);
  assert.ok(oldMap.has(RETIRED) && !activeMap.has(RETIRED));
  sameKeys(new Map([...inheritedMap, [RETIRED, oldMap.get(RETIRED)]]), oldMap);
  sameKeys(new Map([...inheritedMap, ...successorMap]), activeMap);
  sameKeys(new Map(successors.map(x => [x.id, x])), resourceMap);
  sameKeys(activeMap, physicalMap);
  const used = new Set();
  for (const [key, c] of activeMap) {
    const physical = physicalMap.get(key), inherited = inheritedMap.get(key);
    const next = successorMap.get(key);
    assert.notEqual(Boolean(inherited), Boolean(next), "Unresolved resource contract");
    const id = inherited ? inherited.resource_contract_id : next.id;
    const type = inherited ? inherited.resource_type : resourceMap.get(id).type;
    assert.ok(!used.has(id), "Reused resource contract identity");
    used.add(id);
    assert.equal(c.lifecycle_status, "active");
    assert.equal(c.app_code, key.split(".")[0]);
    assert.equal(physical.app_code, c.app_code);
    assert.equal(physical.status, "ACTIVE");
    assert.equal(physical.catalog_id, "vento.authorization");
    assert.equal(physical.catalog_version, "1.1.0");
    assert.equal(physical.resource_contract_id, id);
    assert.equal(physical.contract_snapshot.permission_key, key);
    assert.equal(physical.contract_snapshot.resource_contract_id, id);
    assert.equal(physical.contract_snapshot.resource_type, type);
    assert.equal(physical.contract_snapshot.status, "ACTIVE");
    assert.equal(physical.contract_snapshot.catalog_hash, RELEASE);
    assert.equal(physical.source_manifest_sha256, RELEASE);
    assert.match(physical.contract_fingerprint, HASH);
    if (inherited) {
      assert.equal(inherited.record_type, "inherited_resource_contract_identity");
      assert.equal(inherited.source_correction, "AUTH-CAT-025::CORR-001");
      assert.equal(inherited.source_resource_semantics_task, "AUTH-CAT-016");
      assert.equal(inherited.runtime_derivation_allowed, false);
      assert.equal(inherited.semantic_change, false);
      assert.equal(inherited.assignment_kind, "EXPLICIT_CORRECTION_ASSIGNMENT");
      assert.equal(oldMap.get(key).type, type);
      assert.match(inherited.source_row_sha256, HASH);
    } else {
      assert.match(next.hash, HASH);
      assert.match(resourceMap.get(id).hash, HASH);
    }
  }
  return undefined; // QA concordance, not permission, token or provenance of live DB.
}
test("registry: all 140 literal IDs reconcile across published record, active catalog, and physical SQL", () => {
  assert.equal(inspect(permissions, doc, history, sql), undefined);
});
test("registry: retired permission remains absent from physical active catalog", () => {
  const p = [...permissions, { permission_key: RETIRED, app_code: "nexo", lifecycle_status: "active" }];
  assert.throws(() => inspect(p, doc, history, sql));
});
test("registry: app mismatch and duplicated keys are rejected", () => {
  const p = structuredClone(permissions); p[0].app_code = "viso";
  assert.throws(() => inspect(p, doc, history, sql));
  assert.throws(() => inspect([...permissions, permissions[0]], doc, history, sql));
});
test("registry: inherited ID tampering never falls back to a generated suffix", () => {
  const altered = doc.replace('"resource_contract_id":"anima.access.v1"',
    '"resource_contract_id":"anima.access.mutated.v1"');
  assert.notEqual(altered, doc);
  assert.throws(() => inspect(permissions, altered, history, sql));
});
test("registry: successor resource type drift is rejected", () => {
  const old = "| " + Q + "nexo.remission.deliver.v1" + Q + " | " + Q + "REMISSION" + Q;
  const modified = doc.replace(old, "| " + Q + "nexo.remission.deliver.v1" + Q +
    " | " + Q + "UNVERIFIED" + Q);
  assert.notEqual(modified, doc);
  assert.throws(() => inspect(permissions, modified, history, sql));
});
test("registry: SQL identity mutation cannot silently pass the gate", () => {
  const altered = sql.replace('"resource_contract_id":"anima.access.v1"',
    '"resource_contract_id":"anima.access.fake.v1"');
  assert.notEqual(altered, sql);
  assert.throws(() => inspect(permissions, doc, history, altered));
});
test("registry: SQL resource type and release fingerprint drift fail", () => {
  const changedType = sql.replace('"resource_type":"APP_SURFACE"',
    '"resource_type":"OTHER_RESOURCE"');
  assert.notEqual(changedType, sql);
  assert.throws(() => inspect(permissions, doc, history, changedType));
  const changedHash = sql.replace('"source_manifest_sha256":"' + RELEASE + '"',
    '"source_manifest_sha256":"sha256:' + "0".repeat(64) + '"');
  assert.notEqual(changedHash, sql);
  assert.throws(() => inspect(permissions, doc, history, changedHash));
});
test("registry: attempted runtime derivation and omitted published registry fail", () => {
  const altered = doc.replace('"runtime_derivation_allowed":false',
    '"runtime_derivation_allowed":true');
  assert.notEqual(altered, doc);
  assert.throws(() => inspect(permissions, altered, history, sql));
  assert.throws(() => inspect(permissions,
    doc.replace("Registro complementario canónico:", "No published registry:"), history, sql));
});
test("registry: historical source cannot silently lose a retained permission", () => {
  const needle = "| " + Q + "anima.access" + Q;
  const row = history.split("\n").find(x => x.startsWith(needle));
  assert.ok(row);
  assert.throws(() => inspect(permissions, doc, history.replace(row + "\n", ""), sql));
});
test("registry: QA gate never exports or supplies a runtime authorizer", () => {
  const pkg = JSON.parse(read("packages/contracts/package.json"));
  assert.equal(pkg.version, "1.0.0-alpha.1");
  assert.equal(pkg.private, true);
  assert.equal(Object.hasOwn(pkg.exports, "./authorization/resource-contract-registry/v1"), false);
  assert.equal(Object.hasOwn(pkg.exports, "./authorization/evaluator/v1"), false);
  assert.equal(inspect(permissions, doc, history, sql), undefined);
});
