import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { readCanonicalTreqRegistry } from "../../../scripts/docs/treq-registry-files.mjs";

export const root = fileURLToPath(new URL("../../../", import.meta.url));
export const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");
export const fixtures = JSON.parse(
  read("tests/packages/GAP-PKG-002/fixtures.json"),
);
export const sql = read(fixtures.sql_path);

// Shared by the three runtime entrypoints without registering contract tests on import.
// No hosted URL, project ref, connection secret, fallback or skip is accepted.
export function queryLocalDatabase(source) {
  assert.match(
    read("supabase/config.toml"),
    /^project_id\s*=\s*"vento-shell"/m,
  );
  const result = spawnSync(
    "docker",
    [
      "exec",
      "-i",
      "supabase_db_vento-shell",
      "psql",
      "--username",
      "postgres",
      "--dbname",
      "postgres",
      "--no-psqlrc",
      "--tuples-only",
      "--no-align",
      "--quiet",
      "--set",
      "ON_ERROR_STOP=1",
    ],
    {
      cwd: root,
      input: source,
      encoding: "utf8",
      timeout: 120000,
      windowsHide: true,
    },
  );
  assert.ifError(result.error);
  assert.equal(
    result.status,
    0,
    `Local pgTAP execution failed: ${result.stderr}`,
  );
  return result.stdout.trim();
}

export function runBoundarySuite() {
  const output = queryLocalDatabase(sql);
  assert.doesNotMatch(output, /^(?:not ok\b|Bail out!)/m);
  assert.match(output, new RegExp(`^1\\.\\.${fixtures.assertion_count}$`, "m"));
  const assertions = [...output.matchAll(/^ok (\d+) - (.+)$/gm)];
  assert.equal(assertions.length, fixtures.assertion_count);
  assert.deepEqual(
    assertions.map((match) => Number(match[1])),
    Array.from({ length: fixtures.assertion_count }, (_, index) => index + 1),
  );
  return new Set(assertions.map((match) => match[2]));
}

export function assertRuntimeOracles(actual, requirementIds) {
  for (const id of requirementIds) {
    const oracle = fixtures.oracle_mapping.find(
      (entry) => entry.treq_id === id,
    );
    assert.ok(oracle, `Missing requirement ${id}`);
    for (const description of oracle.assertions) {
      assert.ok(
        actual.has(description),
        `${id}: missing successful database assertion ${description}`,
      );
    }
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  test("GAP-PKG-002 adopts the exact verified foundation without modifying it", () => {
    const gate = JSON.parse(
      read(
        "docs/plan-canonico/modular/package-gate-instances/GAP-PKG-002.json",
      ),
    );
    const ledger = JSON.parse(
      read(
        "docs/plan-canonico/modular/implementation-instances/AUTH-DB-002__GLOBAL.json",
      ),
    );
    assert.equal(gate.package_id, fixtures.package_id);
    assert.equal(gate.status, "APPROVED_FOR_IMPLEMENTATION");
    assert.equal(ledger.status, "VERIFIED");
    assert.equal(
      gate.implementation_units[0].unit_id,
      fixtures.implementation_unit_id,
    );
    assert.deepEqual(gate.canonical_snapshot.task_ids, fixtures.task_ids);
    const migration = `supabase/migrations/${fixtures.implementation_unit_id}`;
    const digest = createHash("sha256")
      .update(read(migration).replace(/\r\n?/g, "\n"))
      .digest("hex");
    assert.equal(
      digest,
      "aca1a4b69e8f9c483b25a88a2c0ffc18a1a9f507fc5b3bcdb72dec7cdf0320b7",
    );
    assert.equal(digest, fixtures.migration_sha256);
    const manifestRows = read("supabase/MIGRATION_MANIFEST.md")
      .split("\n")
      .filter((line) => line.startsWith("| 20260826213609 |"));
    assert.equal(manifestRows.length, 1);
    assert.ok(
      manifestRows[0].includes(
        `| ${fixtures.implementation_unit_id} | ${digest} |`,
      ),
    );
    const targets = gate.physical_identity.targets;
    assert.equal(targets.length, 7);
    assert.equal(
      targets.find((entry) => entry.path === migration).operation,
      "ADOPTAR_SIN_MODIFICAR",
    );
    assert.deepEqual(
      targets
        .filter((entry) => entry.operation === "CREAR")
        .map((entry) => entry.path)
        .sort(),
      [
        fixtures.sql_path,
        ...[
          "contract.test.ts",
          "integration.test.ts",
          "security.test.ts",
          "e2e.test.ts",
          "fixtures.json",
        ].map((name) => `tests/packages/GAP-PKG-002/${name}`),
      ].sort(),
    );
    assert.equal(fixtures.execution_target, "LOCAL_ONLY");
    assert.equal(fixtures.production_authorized, false);
  });

  test("all fourteen canonical requirements have explicit scoped, executable RLS oracles", () => {
    const expected = [
      "TREQ-AURA-010",
      "TREQ-AURA-020",
      "TREQ-AURA-024",
      "TREQ-AUTH-005",
      "TREQ-AUTH-006",
      "TREQ-AUTH-007",
      "TREQ-AUTH-018",
      "TREQ-PASS-017",
      "TREQ-PROC-076",
      "TREQ-PROC-101",
      "TREQ-PROC-122",
      "TREQ-PROC-217",
      "TREQ-PROC-330",
      "TREQ-PROC-345",
    ];
    assert.deepEqual(
      fixtures.oracle_mapping.map((entry) => entry.treq_id).sort(),
      expected.sort(),
    );
    const registry = readCanonicalTreqRegistry({
      baseDir: path.join(root, "docs/plan-canonico/modular"),
    });
    for (const oracle of fixtures.oracle_mapping) {
      const rows = registry
        .split("\n")
        .filter((line) => line.startsWith(`| \`${oracle.treq_id}\` |`));
      assert.equal(
        rows.length,
        1,
        `Exact canonical requirement ${oracle.treq_id}`,
      );
      assert.match(rows[0], /GAP-PKG-002/);
      assert.ok(oracle.component.length > 60);
      assert.ok(oracle.assertions.length >= 2);
      for (const assertion of oracle.assertions)
        assert.ok(sql.includes(`'${assertion}'`), assertion);
    }
    assert.equal(fixtures.evidence_scope, "AUTH_DB_002_RLS_COMPONENT_ONLY");
    assert.match(fixtures.coverage_claim, /does not certify/);
  });

  test("package SQL uses isolated synthetic fixtures and authenticated probes with unconditional rollback", () => {
    assert.match(sql, /^begin;/m);
    assert.match(sql, /select plan\(46\);/);
    assert.match(sql, /set local role authenticated;/);
    assert.match(sql, /select \* from finish\(\);\s*rollback;\s*$/);
    assert.doesNotMatch(
      sql,
      /^\s*(?:(?:create|alter|drop)\s+(?:policy|function|table|role|schema)\b|(?:grant|revoke)\b)/im,
    );
    assert.doesNotMatch(sql, /\b(?:pass|skip)\s*\(/i);
    assert.doesNotMatch(
      sql,
      /service_role_key|SUPABASE_SERVICE_ROLE|https:\/\//i,
    );
    for (const id of [...Object.values(fixtures.actors), ...fixtures.sites])
      assert.ok(sql.includes(id));
    const emails = [...sql.matchAll(/'([^'\s]+@[^'\s]+)'/g)].map(
      (match) => match[1],
    );
    assert.ok(emails.length > 0);
    assert.ok(emails.every((email) => email.endsWith("@test.local")));
  });
}
