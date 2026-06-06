#!/bin/bash
set -e

cd /home/ec2-user/app

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2..."
  npm install -g pm2
fi

# Start Express API on port 3000
pm2 start server.js --name pulsedesk-app

# Start Next.js frontend on port 3001
pm2 start "npx next start -p 3001" --name pulsedesk-client --cwd /home/ec2-user/app/client

pm2 save || true
