# PowerShell script to generate Android keystore for Recitativos CCB
# Run this script once to create your permanent keystore

Write-Host "Creating permanent Android keystore for Recitativos CCB..." -ForegroundColor Green

# Create keystores directory
if (!(Test-Path "android")) {
    New-Item -ItemType Directory -Path "android" -Force
}

# Generate secure passwords (you can change these)
$KEYSTORE_PASSWORD = "RecitativosCCB2025!"
$KEY_PASSWORD = "RecitativosCCB2025!"
$KEY_ALIAS = "recitativos-release"

Write-Host "Generating keystore with the following details:" -ForegroundColor Yellow
Write-Host "- Keystore: android/recitativos-release.keystore"
Write-Host "- Alias: $KEY_ALIAS"
Write-Host "- Password: $KEYSTORE_PASSWORD"
Write-Host ""

# Generate keystore
& keytool -genkeypair -v -keystore "android/recitativos-release.keystore" `
    -alias $KEY_ALIAS `
    -keyalg RSA `
    -keysize 2048 `
    -validity 25000 `
    -storepass $KEYSTORE_PASSWORD `
    -keypass $KEY_PASSWORD `
    -dname "CN=Recitativos CCB, OU=Mobile Development, O=Vineyard Technologies, L=Unknown, ST=Unknown, C=US"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Keystore created successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Convert keystore to base64 for GitHub secrets
    $base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("android/recitativos-release.keystore"))
    
    Write-Host "🔐 GitHub Secrets Setup:" -ForegroundColor Cyan
    Write-Host "Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):"
    Write-Host ""
    Write-Host "ANDROID_KEYSTORE_BASE64:"
    Write-Host $base64
    Write-Host ""
    Write-Host "KEYSTORE_PASSWORD:"
    Write-Host $KEYSTORE_PASSWORD
    Write-Host ""
    Write-Host "KEY_PASSWORD:"
    Write-Host $KEY_PASSWORD
    Write-Host ""
    Write-Host "KEY_ALIAS:"
    Write-Host $KEY_ALIAS
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Save these passwords securely! You'll need them for all future builds." -ForegroundColor Red
    Write-Host "⚠️  Add 'android/' to your .gitignore to keep the keystore secure." -ForegroundColor Red
} else {
    Write-Host "❌ Failed to create keystore. Make sure Java/keytool is installed." -ForegroundColor Red
}
