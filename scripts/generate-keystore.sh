#!/bin/bash

# Script to generate Android keystore for Recitativos CCB
# Run this script once to create your permanent keystore

echo "Creating permanent Android keystore for Recitativos CCB..."

# Create android directory
mkdir -p android

# Generate secure passwords (you can change these)
KEYSTORE_PASSWORD="RecitativosCCB2025!"
KEY_PASSWORD="RecitativosCCB2025!"
KEY_ALIAS="recitativos-release"

echo "Generating keystore with the following details:"
echo "- Keystore: android/recitativos-release.keystore"
echo "- Alias: $KEY_ALIAS"
echo "- Password: $KEYSTORE_PASSWORD"
echo ""

# Generate keystore
keytool -genkeypair -v -keystore android/recitativos-release.keystore \
    -alias "$KEY_ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 25000 \
    -storepass "$KEYSTORE_PASSWORD" \
    -keypass "$KEY_PASSWORD" \
    -dname "CN=Recitativos CCB, OU=Mobile Development, O=Vineyard Technologies, L=Unknown, ST=Unknown, C=US"

if [ $? -eq 0 ]; then
    echo "✅ Keystore created successfully!"
    echo ""
    
    # Convert keystore to base64 for GitHub secrets
    base64_keystore=$(base64 -w 0 android/recitativos-release.keystore)
    
    echo "🔐 GitHub Secrets Setup:"
    echo "Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):"
    echo ""
    echo "ANDROID_KEYSTORE_BASE64:"
    echo "$base64_keystore"
    echo ""
    echo "KEYSTORE_PASSWORD:"
    echo "$KEYSTORE_PASSWORD"
    echo ""
    echo "KEY_PASSWORD:"
    echo "$KEY_PASSWORD"
    echo ""
    echo "KEY_ALIAS:"
    echo "$KEY_ALIAS"
    echo ""
    echo "⚠️  IMPORTANT: Save these passwords securely! You'll need them for all future builds."
    echo "⚠️  Add 'android/' to your .gitignore to keep the keystore secure."
else
    echo "❌ Failed to create keystore. Make sure Java/keytool is installed."
fi
