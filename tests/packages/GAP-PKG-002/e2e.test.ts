import assert from "node:assert/strict";
import test from "node:test";
const {
  fixtures,
  queryLocalDatabase,
  runBoundarySuite,
}: typeof import("./contract.test") = await import(
  new URL("./contract.test.ts", import.meta.url).href
);

const snapshotQuery = `select json_build_object(
  'fixtures', (select count(*) from auth.users where id::text like 'b002%'),
  'rows', (select count(*) from public.users where id::text like 'b002%')
    + (select count(*) from public.sites where id::text like 'b002%')
    + (select count(*) from public.employees where id::text like 'b002%')
    + (select count(*) from public.employee_sites where employee_id::text like 'b002%')
    + (select count(*) from public.documents where id::text like 'b002%')
    + (select count(*) from storage.objects where id::text like 'b002%')
    + (select count(*) from pass.loyalty_rewards where id::text like 'b002%')
    + (select count(*) from pass.loyalty_redemptions where id::text like 'b002%')
    + (select count(*) from public.document_types where id::text like 'b002%')
    + (select count(*) from public.required_document_rules where id::text like 'b002%'),
  'policies', (select md5(string_agg(row_to_json(p)::text, E'\\n'
    order by schemaname, tablename, policyname)) from pg_catalog.pg_policies p),
  'bucket', (select row_to_json(b) from storage.buckets b where id = 'documents')
);`;

test("GAP-PKG-002 complete local RLS flow preserves allowed operations and rolls back every fixture", () => {
  const before = JSON.parse(queryLocalDatabase(snapshotQuery));
  assert.equal(before.fixtures, 0);
  assert.equal(before.rows, 0);
  const actual = runBoundarySuite();
  for (const description of [
    "cashier validates same-site redemption",
    "cashier cannot validate foreign-site redemption",
    "own document remains visible",
    "knowing peer storage path does not grant access",
    "owner retains approved required document rule administration",
  ]) {
    assert.ok(actual.has(description), description);
  }
  for (const oracle of fixtures.oracle_mapping) {
    for (const description of oracle.assertions)
      assert.ok(actual.has(description), oracle.treq_id);
  }
  assert.deepEqual(JSON.parse(queryLocalDatabase(snapshotQuery)), before);
});
