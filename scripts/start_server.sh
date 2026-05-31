#!/bin/bash
cd /home/ec2-user/app

# Install PM2 if not installed
if ! command -v pm2 >/dev/null; then
  npm install -g pm2
fi

# Start app
pm2 start server.js || pm2 restart server.js