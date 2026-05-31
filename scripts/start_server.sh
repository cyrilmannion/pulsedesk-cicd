#!/bin/bash
set -e

cd /home/ec2-user/app

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2..."
  npm install -g pm2
fi

pm2 delete pulsedesk-app || true
pm2 start server.js --name pulsedesk-app
pm2 save || true