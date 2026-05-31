#!/bin/bash
set -e

cd /home/ec2-user/app

# Install Node.js and npm if missing
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Installing Node.js 22 and npm..."
  dnf install -y nodejs22 nodejs22-npm

  # Ensure the default node/npm commands are available via alternatives
  alternatives --set node /usr/bin/node-22 || true
fi

echo "Node version:"
node --version

echo "npm version:"
npm --version

# Use package-lock.json for deterministic installs
npm ci --omit=dev