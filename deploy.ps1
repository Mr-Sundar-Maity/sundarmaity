param(
    [string]$CommitMessage = ""
)

$ErrorActionPreference = "Stop"

function Invoke-CheckedCommand {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,

        [Parameter(Mandatory = $true)]
        [scriptblock]$Command
    )

    Write-Host "`n$Name" -ForegroundColor Cyan
    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "$Name failed with exit code $LASTEXITCODE."
    }
}

try {
    # Always run from the folder containing this script.
    Set-Location -LiteralPath $PSScriptRoot

    foreach ($tool in @("git", "npm", "firebase")) {
        if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
            throw "Required command '$tool' was not found."
        }
    }

    Invoke-CheckedCommand "Building production portfolio..." { npm run build }

    Invoke-CheckedCommand "Staging changes for GitHub..." { git add -A }

    git diff --cached --quiet
    $hasChanges = $LASTEXITCODE -eq 1

    if ($LASTEXITCODE -gt 1) {
        throw "Unable to inspect staged Git changes."
    }

    if ($hasChanges) {
        if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
            $CommitMessage = "Update portfolio $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        }

        Invoke-CheckedCommand "Committing changes..." { git commit -m $CommitMessage }
    }
    else {
        Write-Host "`nNo new Git changes to commit." -ForegroundColor Yellow
    }

    Invoke-CheckedCommand "Pushing main branch to GitHub..." { git push origin main }

    Invoke-CheckedCommand "Deploying to Firebase project mr-sundar..." {
        firebase deploy --only hosting --project mr-sundar
    }

    Write-Host "`nUpdate completed successfully!" -ForegroundColor Green
    Write-Host "GitHub:  https://github.com/Mr-Sundar-Maity/sundarmaity"
    Write-Host "Website: https://mr-sundar.web.app"
}
catch {
    Write-Host "`nUpdate failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
