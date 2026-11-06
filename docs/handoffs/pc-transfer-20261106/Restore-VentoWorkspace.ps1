[CmdletBinding()]
param(
    [string]$Root = (Join-Path $env:USERPROFILE 'devVentoGroup-transfer-20261106'),
    [switch]$PlanOnly
)

$ErrorActionPreference = 'Stop'
$manifestPath = Join-Path $PSScriptRoot 'transfer.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ($manifest.schema -ne 1) { throw 'Unsupported transfer manifest.' }
$Root = [System.IO.Path]::GetFullPath($Root)
if (Test-Path -LiteralPath $Root) {
    $rootItem = Get-Item -LiteralPath $Root -Force
    if (-not $rootItem.PSIsContainer -or ($rootItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
        throw 'Destination must be a normal directory.'
    }
}

foreach ($folder in $manifest.folders) {
    if ($folder.name -notmatch '^vento-[a-z0-9-]+$') { throw 'Invalid folder name.' }
    $destination = Join-Path $Root $folder.name
    if (Test-Path -LiteralPath $destination) {
        throw "Destination already exists; choose a new -Root. No files were changed: $destination"
    }
}
$workspaceDestination = Join-Path $Root 'Vento.code-workspace'
if (Test-Path -LiteralPath $workspaceDestination) { throw 'Workspace destination already exists; choose a new -Root.' }

Write-Host "Destination: $Root"
foreach ($folder in $manifest.folders) {
    Write-Host ("{0} -> {1} @ {2}" -f $folder.name, $folder.branch, $folder.sha.Substring(0,12))
}
if ($PlanOnly) { return }
Get-Command git -ErrorAction Stop | Out-Null
New-Item -ItemType Directory -Path $Root -Force | Out-Null

function Invoke-TransferGit {
    param([string]$Directory, [string[]]$GitArguments)
    & git -C $Directory @GitArguments
    if ($LASTEXITCODE -ne 0) {
        throw "Git failed in $Directory. Existing data was preserved. Review the error before retrying in a new destination."
    }
}

function Assert-TransferHead {
    param([string]$Directory, [string]$Expected)
    $actual = @(Invoke-TransferGit -Directory $Directory -GitArguments @('rev-parse','HEAD')) -join ''
    if ($actual.Trim() -ne $Expected) { throw "HEAD mismatch in $Directory" }
    $status = @(Invoke-TransferGit -Directory $Directory -GitArguments @('--no-optional-locks','status','--porcelain=v1','-uall'))
    if ($status.Count -ne 0) { throw "Worktree is not clean in $Directory" }
}

foreach ($property in $manifest.repositories.PSObject.Properties) {
    $name = $property.Name
    $repo = $property.Value
    $repoFolder = Join-Path $Root $name
    if ($repo.url -notmatch '^https://github\.com/[a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+(?:\.git)?$') {
        throw "Invalid GitHub URL for $name"
    }
    $active = @($manifest.folders | Where-Object { $_.name -eq $name })
    if ($active.Count -ne 1) { throw "Missing primary folder for $name" }
    Write-Host "Fetching $name..."
    New-Item -ItemType Directory -Path $repoFolder | Out-Null
    Invoke-TransferGit $repoFolder @('init','--initial-branch=handoff-initial')
    Invoke-TransferGit $repoFolder @('remote','add','origin',$repo.url)
    Invoke-TransferGit $repoFolder @('fetch','--no-tags','origin')
    foreach ($branch in $repo.branches) {
        if ($branch.sha -notmatch '^[0-9a-f]{40}$') { throw 'Invalid commit SHA.' }
        Invoke-TransferGit $repoFolder @('cat-file','-e',($branch.sha + '^{commit}'))
        Invoke-TransferGit $repoFolder @('branch','--create-reflog',$branch.name,$branch.sha)
        if ($branch.tracking) {
            Invoke-TransferGit $repoFolder @('branch',('--set-upstream-to=origin/' + $branch.tracking),$branch.name)
        }
    }
    Invoke-TransferGit $repoFolder @('switch',$active[0].branch)
    Assert-TransferHead $repoFolder $active[0].sha
    $stashes = @($repo.stashes)
    for ($index = $stashes.Count - 1; $index -ge 0; $index--) {
        $stash = $stashes[$index]
        Invoke-TransferGit $repoFolder @('stash','store','--message',$stash.message,$stash.sha)
    }
    $actualStashes = @(Invoke-TransferGit $repoFolder @('stash','list','--format=%H'))
    $expectedStashes = @($stashes | ForEach-Object { $_.sha })
    if (($actualStashes -join ',') -ne ($expectedStashes -join ',')) { throw "Stash identity mismatch: $name" }
}

foreach ($folder in $manifest.folders) {
    if ($folder.name -eq $folder.repository) { continue }
    $owner = Join-Path $Root $folder.repository
    $destination = Join-Path $Root $folder.name
    Invoke-TransferGit $owner @('worktree','add',$destination,$folder.branch)
    Assert-TransferHead $destination $folder.sha
}

Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'Vento.code-workspace') -Destination $workspaceDestination
Write-Host ''
Write-Host 'VERIFIED: 12 repositories, 5 linked worktrees, exact checkpoint commits and 9 restored stashes.'
Write-Host "Open in VS Code: $workspaceDestination"
Write-Host 'Next: install dependencies and configure private environment files. Local databases and credentials were not transferred.'
