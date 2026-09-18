import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const fixtures = JSON.parse(fs.readFileSync(path.join(root, "tests/packages/GAP-PKG-045/fixtures.json"), "utf8"));
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
const sibling = (name, ...parts) => fs.readFileSync(path.join(root, "..", name, ...parts), "utf8");

test("canonical application catalog is exact and closed", () => {
  const catalog = JSON.parse(read("packages/contracts/authorization/catalog/versions/1.0.0/applications.json"));
  assert.deepEqual(catalog.map((entry) => entry.app_code), fixtures.canonical_app_codes);
  assert.equal(new Set(catalog.map((entry) => entry.app_code)).size, 10);
  assert.equal(catalog.some((entry) => ["hub","default"].includes(entry.app_code)), false);
  for (const entry of catalog) assert.equal(entry.permission_namespace, entry.app_code);
});
