#!/bin/bash
echo "Stopping old app (if running)..."
pm2 stop all || true