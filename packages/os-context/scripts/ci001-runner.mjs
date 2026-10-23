import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const PACKAGE = "@vento/os-context";
const GROUPS = ["unit", "contractual", "security"];

function failGroup(id) {
  return { id, status: "FAIL", tests: { total: 1, passed: 0, failed: 1, skipped: 0 } };
}

function main() {
  const resultPath = process.env.VENTO_PACKAGE_TEST_RESULT_FILE;
  if (!path.isAbsolute(resultPath ?? "")
    || process.env.VENTO_PACKAGE_TEST_PACKAGE !== PACKAGE) {
    throw new Error("VENTO_OS_CONTEXT_CI001:RUNNER_IDENTITY_INVALID");
  }

  const execution = spawnSync(process.execPath, [
    "--test", "--test-reporter=tap", "scripts/client.test.mjs", "scripts/boundaries.test.mjs",
  ], {
    cwd: path.resolve(import.meta.dirname, ".."),
    encoding: "utf8",
    timeout: 120000,
    maxBuffer: 4 * 1024 * 1024,
    windowsHide: true,
  });

  const stdout = String(execution.stdout ?? "");
  const metrics = (key) => {
    const matches = [...stdout.matchAll(new RegExp("^# " + key + "\\s+(\\d+)\\s*$", "gm"))];
    return matches.length ? Number(matches.at(-1)[1]) : null;
  };
  const totals = new Map(GROUPS.map((id) => [id, { total: 0, passed: 0, failed: 0, skipped: 0 }]));
  for (const match of stdout.matchAll(/^(not )?ok \d+ - (unit|contractual|security): [^\r\n]+$/gmu)) {
    const values = totals.get(match[2]);
    values.total += 1;
    if (match[1]) values.failed += 1;
    else values.passed += 1;
  }

  const summary = {
    total: metrics("tests"), passed: metrics("pass"),
    failed: metrics("fail"), skipped: metrics("skipped"),
  };
  const observed = [...totals.values()].reduce(
    (count, group) => ({
      total: count.total + group.total,
      passed: count.passed + group.passed,
      failed: count.failed + group.failed,
    }),
    { total: 0, passed: 0, failed: 0 },
  );
  const consistent = GROUPS.every((id) => totals.get(id).total > 0)
    && summary.total === observed.total
    && summary.passed === observed.passed
    && summary.failed === observed.failed
    && summary.skipped === 0
    && !execution.error
    && !execution.signal
    && execution.status !== null;

  const groups = consistent
    ? GROUPS.map((id) => ({
      id,
      status: totals.get(id).failed === 0 ? "PASS" : "FAIL",
      tests: totals.get(id),
    }))
    : GROUPS.map(failGroup);

  const outcome = consistent && execution.status === 0
    && groups.every((group) => group.status === "PASS") ? "PASS" : "FAIL";
  const report = { schema_version: 1, package: PACKAGE, outcome, groups };
  fs.writeFileSync(resultPath, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({
    package: PACKAGE,
    outcome,
    group_counts: groups,
    reason_code: consistent ? null : "TEST_REPORT_OR_PROCESS_INVALID",
  }));
  if (outcome !== "PASS") process.exitCode = 1;
}

try {
  main();
} catch {
  console.error("VENTO_OS_CONTEXT_CI001:RUNNER_BLOCKED");
  process.exitCode = 1;
}
