#!/bin/bash
set -e

echo "Stopping old app if PM2 is installed..."

if command -v pm2 >/dev/null 2>&1; then
  pm2 stop pulsedesk-app || true
  pm2 delete pulsedesk-app || true
else
  echo "PM2 not installed yet; skipping stop."
fi