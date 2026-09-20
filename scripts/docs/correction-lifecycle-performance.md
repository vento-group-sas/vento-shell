# Correction lifecycle validation and terminal output

`docs:correction:advance` keeps every durable checkpoint, the authorized validation
commands in their original fail-fast order, exactly-once repair, scope checks,
authorization, baseline checks, final canonical validation and hosted gates.

Within one Node process, a successful full checkpoint can cover subsequent
metadata-only checkpoints. The fingerprint includes tracked and nonignored
untracked file contents, file modes, pending index changes, the remote main SHA,
branch, Node runtime, environment, lockfiles and the installed dependency lock.
Only `status`, `evidence`, `implemented_at` and `verified_at` of the active
correction record are excluded. The entire authorization and contract remain
part of the fingerprint. Other records and all derived versioned files remain
part of the fingerprint too.

The light path still validates correction records, scope, EOL, starter and diff;
it still commits and pushes. Any changed material input uses the full path.
A new process starts cold. Failed checks invalidate the in-memory receipt.
There is no persistent cache that can grant a PASS to a resumed command.
Start and the VERIFIED seal always validate in full. Finish can reuse that seal
only when an exact fingerprint (including status and evidence) is unchanged in
the same process; otherwise it validates in full. No physical validation, deployment,
consumer publication or approval is inferred from this cache.

Full checkpoints use `docs:plan:check`'s existing correction/EOL checks rather
than launching those same checks separately. Authorized command arrays are not
shortened or reordered, including suites with overlapping test files.

## Observability

Correction npm commands, authorized validations and hosted-gate waits print ASCII
`START` and `PASS`/`FAIL` lines. Full UTF-8 stdout/stderr and per-command timing
are stored under `.delivery/lifecycle-timings/`. JSONL entries contain start/end,
duration, exit code and log path. Child output remains captured; START is shown
before the synchronous child runs, and completion is shown when it exits.
Repair evidence distinguishes the pre-repair checkpoint from execution time.

## Windows terminal

New VS Code terminals use the workspace profile `VENTO UTF-8`. For an already
open terminal, dot-source `scripts/docs/vento-terminal.ps1` from the checkout containing
this change. It configures only that session, preserving existing Node options
and an explicitly selected test reporter. Otherwise it selects ASCII TAP output.

To execute a supplied PowerShell text file, use:

```powershell
& ./scripts/docs/vento-terminal.ps1 -ScriptPath 'C:\path\approved-script.txt'
```

This reads the script explicitly as UTF-8. Loading the helper without ScriptPath
does not authorize, resume, repair, deploy or advance any implementation.
