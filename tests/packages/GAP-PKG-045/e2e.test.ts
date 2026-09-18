import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const fixtures = JSON.parse(fs.readFileSync(path.join(root, "tests/packages/GAP-PKG-045/fixtures.json"), "utf8"));
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
const sibling = (name, ...parts) => fs.readFileSync(path.join(root, "..", name, ...parts), "utf8");

test("controlled application navigation has explicit outcome for every AppCode", () => {
  const outcomes = fixtures.canonical_app_codes.map((code) => ({ code, status: fixtures.presentation_status[code], href: fixtures.web_destinations[code] }));
  assert.equal(outcomes.length, 10);
  for (const entry of outcomes) {
    if (entry.status === "active") assert.match(entry.href, /^https:\/\//u);
    else assert.equal(entry.href, null);
  }
});
