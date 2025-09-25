#!/bin/bash
set -e

echo "=== Azure Container Startup ==="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

echo "=== Environment Variables ==="
echo "PORT: ${PORT:-80}"
echo "PYTHONPATH: ${PYTHONPATH}"

echo "=== Python Information ==="
python --version
pip list

echo "=== Starting Application ==="
cd /usr/src/app/backend

# Install any missing dependencies
pip install -r requirements.txt

# Start the application
exec gunicorn \
    --bind 0.0.0.0:${PORT:-80} \
    --workers 1 \
    --timeout 600 \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    --preload \
    wsgi:application