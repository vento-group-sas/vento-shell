param([string]$ScriptPath)

# Dot-source once in the current terminal; no profile or machine settings change.
# PowerShell must decode Node's UTF-8 output and attached scripts with the same encoding.
$ventoUtf8 = [System.Text.UTF8Encoding]::new($false)
[Console]::InputEncoding = $ventoUtf8
[Console]::OutputEncoding = $ventoUtf8
$global:OutputEncoding = $ventoUtf8
$env:NO_COLOR = '1'
$env:FORCE_COLOR = '0'

# TAP uses ASCII status markers and works when output is captured by PowerShell.
# Keep any explicitly selected reporter and all existing Node options.
if ($env:NODE_OPTIONS -notmatch '--test-reporter(?:=|\s)') {
    $env:NODE_OPTIONS = (($env:NODE_OPTIONS + ' --test-reporter=tap').Trim())
}

if ($ScriptPath) {
    $ventoScript = Get-Content -Raw -Encoding utf8 -LiteralPath $ScriptPath -ErrorAction Stop
    & ([scriptblock]::Create($ventoScript))
}
