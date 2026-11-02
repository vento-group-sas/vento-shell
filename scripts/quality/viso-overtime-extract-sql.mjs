import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const document = readFileSync(
  new URL("../../docs/plan-canonico/modular/deltas/VISO_PRODUCTION_OVERTIME_SQL_CANDIDATE_20261102.md", import.meta.url),
  "utf8",
);
assert.match(document, /CANDIDATO NO APLICADO/u, "Solo SQL candidato no aplicado");
const mode = process.argv[2] ?? "--forward";
assert.ok(["--forward", "--rollback"].includes(mode), "Modo solo --forward o --rollback");
const heading = mode === "--forward" ? "## SQL forward" : "## SQL rollback";
assert.equal(document.split(heading).length, 2, "Encabezado SQL debe ser unico");
const start = document.indexOf(heading);
const next = document.indexOf("\n## ", start + heading.length);
const section = document.slice(start, next >= 0 ? next : undefined);
const match = section.match(/```sql\r?\n([\s\S]*?)\r?\n```/u);
assert.ok(match, "No se encontro bloque SQL del modo pedido");
const sql = match[1].trim();
assert.match(sql, /CREATE OR REPLACE FUNCTION public\.viso_enforce_monthly_schedule_publish_limit\(\)/u);
if (mode === "--forward") {
  assert.match(sql, /v_week_minutes > 54 \* 60/u);
  assert.match(sql, /v_day_minutes > 11 \* 60/u);
  assert.match(sql, /coalesce\(old\.status, ''\) <> 'cancelled'/u);
  assert.doesNotMatch(sql, /v_limit_minutes constant integer := 11160/u);
} else {
  assert.match(sql, /v_limit_minutes constant integer := 11160/u);
  assert.match(sql, /No se puede publicar:/u);
}
process.stdout.write(sql + "\n");
