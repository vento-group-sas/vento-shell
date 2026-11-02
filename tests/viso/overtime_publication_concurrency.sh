#!/usr/bin/env bash
# QA UNICAMENTE PARA POSTGRESQL EFIMERO. Nunca ejecutar contra Supabase hosted.
set -euo pipefail
if [[ "${PGDATABASE:-}" != "viso_qa" || "${PGHOST:-}" != "127.0.0.1" ]]; then
  echo "BLOCKED: esta prueba requiere DB viso_qa en PostgreSQL local" >&2
  exit 2
fi

psql -X -v ON_ERROR_STOP=1 <<'SQL'
INSERT INTO public.employee_shifts (
  employee_id, site_id, shift_date, start_time, end_time, published_at
)
SELECT
  '55555555-5555-4555-8555-555555555555'::uuid,
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid,
  date '2026-12-07' + day_number,
  time '08:00',
  CASE WHEN day_number = 5 THEN time '16:00' ELSE time '17:00' END,
  now()
FROM generate_series(0, 5) AS day_number;
SQL

holder_log="$(mktemp)"
challenger_log="$(mktemp)"
trap 'rm -f "$holder_log" "$challenger_log"' EXIT

psql -X -v ON_ERROR_STOP=1 > "$holder_log" 2>&1 <<'SQL' &
BEGIN;
INSERT INTO public.employee_shifts (
  employee_id, site_id, shift_date, start_time, end_time, published_at
) VALUES (
  '55555555-5555-4555-8555-555555555555',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  date '2026-12-07', time '17:00', time '18:00', now()
);
SELECT 'HOLDER_LOCK_ACQUIRED' AS marker;
SELECT pg_sleep(2);
COMMIT;
SQL
holder_pid=$!

for attempt in $(seq 1 50); do
  if grep -q HOLDER_LOCK_ACQUIRED "$holder_log"; then
    break
  fi
  if ! kill -0 "$holder_pid" 2>/dev/null; then
    echo "FAIL: el primer escritor termino antes de adquirir el lock" >&2
    cat "$holder_log" >&2
    exit 1
  fi
  sleep 0.1
done
if ! grep -q HOLDER_LOCK_ACQUIRED "$holder_log"; then
  echo "FAIL: no hubo comprobacion de lock del primer escritor" >&2
  exit 1
fi

set +e
psql -X -v ON_ERROR_STOP=1 > "$challenger_log" 2>&1 <<'SQL'
BEGIN;
INSERT INTO public.employee_shifts (
  employee_id, site_id, shift_date, start_time, end_time, published_at
) VALUES (
  '55555555-5555-4555-8555-555555555555',
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  date '2026-12-08', time '17:00', time '18:00', now()
);
COMMIT;
SQL
challenger_rc=$?
wait "$holder_pid"
holder_rc=$?
set -e

if [[ "$holder_rc" -ne 0 || "$challenger_rc" -eq 0 ]]; then
  echo "FAIL: concurrencia no rechazo exactamente el segundo escritor" >&2
  cat "$holder_log" >&2
  cat "$challenger_log" >&2
  exit 1
fi
if ! grep -q '54 h semanales' "$challenger_log"; then
  echo "FAIL: segundo escritor no fallo por el limite semanal esperado" >&2
  cat "$challenger_log" >&2
  exit 1
fi

actual_minutes="$(psql -XAt -v ON_ERROR_STOP=1 -c "
  select coalesce(sum(extract(epoch from(end_time-start_time))/60),0)::integer
  from public.employee_shifts
  where employee_id='55555555-5555-4555-8555-555555555555'
    and shift_date between date '2026-12-07' and date '2026-12-13'
    and published_at is not null;
")"
if [[ "$actual_minutes" != "3240" ]]; then
  echo "FAIL: se esperaba 54h publicadas, minutos=$actual_minutes" >&2
  exit 1
fi
echo "PASS: dos sedes publicaron concurrentemente; 54h admitidas, 55h rechazadas, sin sobrepublicacion."
