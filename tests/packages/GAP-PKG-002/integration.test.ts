import test from "node:test";
import { assertRuntimeOracles, runBoundarySuite } from "./contract.test.ts";

test("GAP-PKG-002 consumers share the real adopted database and storage boundary", () => {
  const actual = runBoundarySuite();
  assertRuntimeOracles(actual, [
    "TREQ-AURA-010",
    "TREQ-AURA-020",
    "TREQ-AURA-024",
    "TREQ-PASS-017",
    "TREQ-PROC-076",
    "TREQ-PROC-330",
  ]);
});
