import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const fixtures = JSON.parse(fs.readFileSync(path.join(root, "tests/packages/GAP-PKG-045/fixtures.json"), "utf8"));

test("package evidence binds the three canonical TREQ requirements", () => {
  assert.deepEqual(fixtures.treq_ids, ["TREQ-SHELL-003","TREQ-SHELL-028","TREQ-SHELL-034"]);
  assert.equal(fixtures.canonical_app_codes.length, 10);
  assert.equal(fixtures.web_destinations.aura, null);
  assert.equal(fixtures.web_destinations.pass, null);
});
