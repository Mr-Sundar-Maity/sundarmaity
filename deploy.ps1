
Write-Host "Building Portfolio..." -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build Failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to Firebase..." -ForegroundColor Cyan

firebase deploy --only hosting

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment Failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Website Updated Successfully!" -ForegroundColor Green
