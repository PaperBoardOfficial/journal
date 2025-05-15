#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Android release APK for Journal...${NC}"

# Step 1: Clean previous builds
echo -e "${GREEN}Cleaning previous builds...${NC}"
rm -rf android/app/build/outputs/apk/release 2>/dev/null || true

# Step 2: Make sure dependencies are installed
echo -e "${GREEN}Checking dependencies...${NC}"
npm install

# Step 3: Generate native code with Expo
echo -e "${GREEN}Generating native code...${NC}"
npx expo prebuild --platform android --clean

# Step 4: Build the release APK
echo -e "${GREEN}Building release APK...${NC}"
cd android
./gradlew assembleRelease
cd ..

# Step 5: Check if build was successful
if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
  echo -e "${GREEN}Build successful!${NC}"
  echo -e "${GREEN}APK location: android/app/build/outputs/apk/release/app-release.apk${NC}"
  
  # Copy APK to project root for easier access
  cp android/app/build/outputs/apk/release/app-release.apk ./journal.apk
  echo -e "${GREEN}APK copied to: ./journal.apk${NC}"
else
  echo -e "${YELLOW}Build may have failed. Check for errors above.${NC}"
fi

echo -e "${YELLOW}Build process completed.${NC}"