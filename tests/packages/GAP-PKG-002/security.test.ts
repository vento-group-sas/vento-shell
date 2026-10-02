import test from "node:test";
const {
  assertRuntimeOracles,
  runBoundarySuite,
}: typeof import("./contract.test") = await import(
  new URL("./contract.test.ts", import.meta.url).href
);

test("GAP-PKG-002 denies privilege injection, foreign identities and territorial access on real RLS", () => {
  const actual = runBoundarySuite();
  assertRuntimeOracles(actual, [
    "TREQ-AUTH-005",
    "TREQ-AUTH-006",
    "TREQ-AUTH-007",
    "TREQ-AUTH-018",
    "TREQ-PROC-101",
    "TREQ-PROC-122",
    "TREQ-PROC-217",
    "TREQ-PROC-345",
  ]);
});
