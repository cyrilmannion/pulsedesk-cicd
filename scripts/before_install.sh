#!/bin/bash
set -e

echo "Stopping existing processes..."

if command -v pm2 >/dev/null 2>&1; then
  pm2 stop pulsedesk-app || true
  pm2 delete pulsedesk-app || true
  pm2 stop pulsedesk-client || true
  pm2 delete pulsedesk-client || true
else
  echo "PM2 not installed yet; skipping stop."
fi
