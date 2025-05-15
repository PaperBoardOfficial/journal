#!/bin/bash

# Exit on error
set -e

echo "Packaging server function..."

# Set directories
# Script is running from the server directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

SERVER_DIR="${SCRIPT_DIR}"
SHARED_DIR="${ROOT_DIR}/shared"
BUILD_DIR="${SERVER_DIR}/build"
DIST_DIR="${BUILD_DIR}/dist"
NODE_MODULES_DIR="${BUILD_DIR}/node_modules"

echo "Root directory: ${ROOT_DIR}"
echo "Server directory: ${SERVER_DIR}"

# Clean build directory
echo "Cleaning build directory..."
rm -rf "${BUILD_DIR}"
mkdir -p "${DIST_DIR}"
mkdir -p "${NODE_MODULES_DIR}"

# Build shared library
echo "Building shared library..."
cd "${SHARED_DIR}"
npm ci
npm run build

# Build server
echo "Building server..."
cd "${SERVER_DIR}"
npm ci
npm run build

# Copy compiled code to build directory
echo "Copying compiled code..."
cp -r "${SERVER_DIR}/dist/"* "${DIST_DIR}/"

# Install server dependencies
echo "Installing server dependencies..."
cd "${BUILD_DIR}"
cp "${SERVER_DIR}/package.json" .
npm install --production --no-package-lock

# Copy dependencies from shared libraries
echo "Copying dependencies from shared library..."

# Copy shared node_modules
echo "Copying dependencies from shared library..."
cp -r "${SHARED_DIR}/node_modules/"* "${NODE_MODULES_DIR}/"

# Setup shared libraries
echo "Setting up shared libraries..."
# Remove the directory first to avoid conflicts
rm -rf "${NODE_MODULES_DIR}/shared"
mkdir -p "${NODE_MODULES_DIR}/shared"

# Copy shared library
echo "Copying shared library..."
cp -r "${SHARED_DIR}/dist" "${NODE_MODULES_DIR}/shared/"
cp "${SHARED_DIR}/package.json" "${NODE_MODULES_DIR}/shared/"

# Create the ZIP file
echo "Creating ZIP file..."
cd "${BUILD_DIR}"
zip -r "${SERVER_DIR}/server.zip" dist node_modules

echo "Server package created at: ${SERVER_DIR}/server.zip" 