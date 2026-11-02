import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const document = readFileSync(
  new URL("../../docs/plan-canonico/modular/deltas/VISO_PRODUCTION_OVERTIME_SQL_CANDIDATE_20261102.md", import.meta.url),
  "utf8",
);
assert.match(document, /CANDIDATO NO APLICADO/u, "Nunca extraer SQL de un documento sin estado candidato");
const match = document.match(/^## SQL forward[^\n]*\r?\n\r?\n```sql\r?\n([\s\S]*?)\r?\n```/mu);
assert.ok(match, "Bloque SQL forward ausente o estructura modificada");
const sql = match[1].trim();
assert.match(sql, /CREATE OR REPLACE FUNCTION public\.viso_enforce_monthly_schedule_publish_limit\(\)/u);
assert.match(sql, /v_week_minutes > 54 \* 60/u);
assert.match(sql, /v_day_minutes > 11 \* 60/u);
assert.match(sql, /coalesce\(old\.status, ''\) <> 'cancelled'/u);
assert.doesNotMatch(sql, /v_limit_minutes constant integer := 11160/u);
process.stdout.write(sql + "\n");
