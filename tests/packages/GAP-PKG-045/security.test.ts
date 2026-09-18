import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const fixtures = JSON.parse(fs.readFileSync(path.join(root, "tests/packages/GAP-PKG-045/fixtures.json"), "utf8"));
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
const sibling = (name, ...parts) => fs.readFileSync(path.join(root, "..", name, ...parts), "utf8");

test("aliases and unavailable destinations fail closed", () => {
  assert.equal(fixtures.canonical_app_codes.includes("hub"), false);
  assert.equal(fixtures.canonical_app_codes.includes("default"), false);
  for (const code of fixtures.canonical_app_codes) {
    const href = fixtures.web_destinations[code];
    if (href !== null) assert.match(href, /^https:\/\//u);
  }
  assert.equal(fixtures.presentation_status.aura, "soon");
  assert.equal(fixtures.presentation_status.pass, "soon");
  assert.equal(fixtures.web_destinations.aura, null);
  assert.equal(fixtures.web_destinations.pass, null);
});
