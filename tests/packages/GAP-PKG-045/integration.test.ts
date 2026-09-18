import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const fixtures = JSON.parse(fs.readFileSync(path.join(root, "tests/packages/GAP-PKG-045/fixtures.json"), "utf8"));
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
const sibling = (name, ...parts) => fs.readFileSync(path.join(root, "..", name, ...parts), "utf8");

function idsFromBlock(source) {
  const start = source.indexOf("const APP_SWITCHER_ITEMS:");
  const end = source.indexOf("function asId", start);
  assert.ok(start >= 0 && end > start);
  return [...source.slice(start, end).matchAll(/\bid:\s*"([^"]+)"/gu)].map((m) => m[1]);
}
test("shell projections and five runtime repos expose the canonical identity set", () => {
  const home = read("src/app/page.tsx");
  const login = read("src/app/login/page.tsx");
  const template = read("templates/app-shell-standard/src/components/vento/standard/app-switcher.tsx");
  for (const code of fixtures.canonical_app_codes) {
    assert.match(home, new RegExp('id: \"' + code + '\"', 'u'));
    assert.match(login, new RegExp('appCode: \"' + code + '\"', 'u'));
    assert.match(template, new RegExp('id: \"' + code + '\"', 'u'));
  }
  for (const name of ["vento-nexo","vento-fogo","vento-origo","vento-pulso","vento-viso"]) {
    const source = sibling(name, "src/components/vento/standard/vento-shell.tsx");
    assert.deepEqual(idsFromBlock(source), fixtures.canonical_app_codes);
  }
});
