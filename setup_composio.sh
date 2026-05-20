#!/bin/bash
# Setup script for Composio CLI

set -e

# Install composio-core via pip
pip install composio-core sentry-sdk starlette fastapi rich semver uvicorn pyperclip inflection jsonref paramiko websocket-client

# Copy pysher source (pysher wheel build fails on some systems)
pip download pysher==1.0.8 -d /tmp/pysher_dl --no-deps
cd /tmp && tar -xzf pysher_dl/Pysher-*.tar.gz
PYSHER_DIR=$(find /tmp -maxdepth 1 -name "Pysher-*" -type d | head -1)
SITE_PACKAGES=$(python3 -c "import site; print(site.getsitepackages()[0])")
cp -r "$PYSHER_DIR/src/pysher" "$SITE_PACKAGES/"

# Login using API key
mkdir -p ~/.composio
python3 -c "
import json
data = {'api_key': 'uak_Evp9TcnwofAIfQlhKwit'}
with open(os.path.expanduser('~/.composio/user_data.json'), 'w') as f:
    json.dump(data, f, indent=2)
" 2>/dev/null || python3 -c "
import json, os
data = {'api_key': 'uak_Evp9TcnwofAIfQlhKwit'}
with open(os.path.expanduser('~/.composio/user_data.json'), 'w') as f:
    json.dump(data, f, indent=2)
"

echo "Composio CLI setup complete"
composio whoami
