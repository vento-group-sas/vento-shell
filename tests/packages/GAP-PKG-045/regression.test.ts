import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
const sibling = (name, ...parts) => fs.readFileSync(path.join(root, "..", name, ...parts), "utf8");

test("legacy hub AppCode and pass omission are not reintroduced", () => {
  const targets = [];
  targets.push(read("src/app/page.tsx"));
  targets.push(read("src/app/login/page.tsx"));
  targets.push(read("templates/app-shell-standard/src/components/vento/standard/app-switcher.tsx"));
  for (const name of ["vento-nexo","vento-fogo","vento-origo","vento-pulso","vento-viso"]) {
    targets.push(sibling(name, "src/components/vento/standard/vento-shell.tsx"));
    targets.push(sibling(name, "src/components/vento/standard/vento-chrome.tsx"));
    targets.push(sibling(name, "src/components/vento/standard/app-switcher.tsx"));
  }
  for (const source of targets) {
    assert.doesNotMatch(source, /\bid:\s*"hub"/u);
    assert.doesNotMatch(source, /app\.id\s*===\s*"hub"/u);
  }
  for (const name of ["vento-nexo","vento-fogo","vento-origo","vento-pulso","vento-viso"]) {
    assert.match(sibling(name, "src/components/vento/standard/vento-shell.tsx"), /id:\s*"pass"/u);
  }
});
