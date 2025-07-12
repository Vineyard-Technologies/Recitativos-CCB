# Android Keystore Setup Instructions

This guide will help you set up a permanent Android keystore for consistent app signing.

## Prerequisites

- Java JDK installed (for `keytool` command)
- Access to your GitHub repository settings

## Step 1: Generate the Keystore

### On Windows:
```powershell
# Run from the project root directory
.\scripts\generate-keystore.ps1
```

### On Linux/Mac:
```bash
# Make script executable and run
chmod +x scripts/generate-keystore.sh
./scripts/generate-keystore.sh
```

## Step 2: Add GitHub Secrets

The script will output 4 secrets that you need to add to your GitHub repository:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of these:

| Secret Name | Description |
|-------------|-------------|
| `ANDROID_KEYSTORE_BASE64` | Base64 encoded keystore file |
| `KEYSTORE_PASSWORD` | Password for the keystore |
| `KEY_PASSWORD` | Password for the signing key |
| `KEY_ALIAS` | Alias name for the signing key |

## Step 3: Test the Setup

1. Create and push a new tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

2. Check the GitHub Actions workflow - it should now build successfully with your permanent keystore!

## Important Notes

- ⚠️ **Keep your keystore secure**: Never commit the keystore file to git
- ⚠️ **Backup your keystore**: Store the `android/recitativos-release.keystore` file and passwords in a secure location
- ⚠️ **Same keystore for all releases**: Always use the same keystore for app updates
- ✅ **Consistent updates**: Users can now update your app without losing data

## Troubleshooting

### "keytool command not found"
- Install Java JDK
- Ensure `keytool` is in your PATH

### "Failed to decode keystore"
- Verify the `ANDROID_KEYSTORE_BASE64` secret is correctly copied (no extra spaces/newlines)
- The base64 string should be one continuous line

### Build still fails
- Check that all 4 secrets are added to GitHub
- Verify secret names match exactly (case-sensitive)
