---
layout: page
title: Local LLM Stack Guide
permalink: /llm_stack

---

# Local LLM Stack Guide: OpenWebUI, Ollama, SearXNG, and Speech

## Introduction

This is the canonical local LLM stack page. It keeps the practical deployment notes in one place: OpenWebUI, Ollama, SearXNG search, OpenEDAI Speech, containers, GPU access, mounted volumes, API keys, and host-network tradeoffs.

Running containers with Podman provides enhanced security through unprivileged containers and rootless execution. Using `systemctl --user` for systemd services allows for better process management without requiring root privileges. While this guide uses Podman, the commands can be adapted for Docker with minor modifications.

Rootless containers reduce host risk, but they do not erase the risk of broad mounts, host networking, GPU passthrough, or API keys inside the service environment.

## Quick OpenWebUI Options

If you only need OpenWebUI quickly, these are the common shapes.

### OpenWebUI with GPU support

```bash
docker run -d \
  -p 3000:8080 \
  --gpus all \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:cuda
```

GPU passthrough and mounted application state are meaningful access. Do not put secrets in the container environment unless you need them, and do not expose port `3000` beyond the host without authentication and a reverse proxy you trust.

### OpenWebUI with bundled Ollama

```bash
docker run -d \
  -p 3000:8080 \
  --gpus=all \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:ollama
```

This is convenient, but it couples model storage and the web app into one deployment shape. Fine for a lab box. For a shared system, split services and be explicit about volumes and credentials.

### OpenWebUI with existing Ollama

```bash
docker run -d \
  --network=host \
  -v open-webui:/app/backend/data \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

`--network=host` removes Docker's network namespace boundary. Use it when it solves a real connectivity problem. Prefer explicit port mappings when possible.

### OpenAI API only

```bash
docker run -d \
  -p 3000:8080 \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

Use scoped keys where possible. Assume any admin user of the OpenWebUI instance can route prompts through configured providers.

## Setting Up SearXNG

### 1. Service Configuration

Create the systemd service configuration:

```bash
mkdir -p ~/.config/systemd/user/
nano ~/.config/systemd/user/searxng.quadlet.service
```

Add the following content (replace "christian" with your username):

```ini
[Unit]
Description=SearXNG Podman Container
After=network.target

[Service]
ExecStart=/usr/bin/podman run --replace \
  --name searxng \
  -v /home/christian/github/searxng/settings.yml:/etc/searxng/settings.yml:Z \
  -p 8081:8080 \
  docker.io/searxng/searxng:latest
ExecStop=/usr/bin/podman stop -t 10 searxng
ExecStopPost=/usr/bin/podman rm -f searxng
# Service configuration
Restart=always
RestartSec=10
Type=simple
Environment=HOME=/home/christian

[Install]
WantedBy=default.target
```

### 2. SearXNG Settings

Create the settings file:

```bash
mkdir -p ~/github/searxng
nano ~/github/searxng/settings.yml
```

Add the following configuration:

```yaml
use_default_settings: true
server:
    port: 8080
    bind_address: "0.0.0.0"
    secret_key: "Generate_A_Random_Key_Here"
    base_url: http://localhost:8081/
    image_proxy: false
    http_protocol_version: "1.0"

search:
    safe_search: 0
    autocomplete: "google"
    default_lang: "en"
    ban_time_on_fail: 5
    max_ban_time_on_fail: 120

ui:
    static_path: ""
    templates_path: ""
    default_theme: simple
    default_locale: en
    results_on_new_tab: false
```

### 3. Enable and Start SearXNG

```bash
systemctl --user daemon-reload
systemctl --user enable --now searxng
```

## Setting Up Open-WebUI

### 1. Service Configuration

```bash
nano ~/.config/systemd/user/open-webui.quadlet.service
```

Add the following content (replace "christian" with your username):

```ini
[Unit]
Description=Open Web UI Podman Container
After=network.target

[Service]
ExecStart=/usr/bin/podman run --replace \
  --name open-webui \
  --network=host \
  -v open-webui:/app/backend/data \
  -e OLLAMA_BASE_URL=http://localhost:11434 \
  -e USE_CUDA_DOCKER=True \
  --device nvidia.com/gpu=all \
  ghcr.io/open-webui/open-webui:cuda

ExecStop=/usr/bin/podman stop -t 10 open-webui
ExecStopPost=/usr/bin/podman rm -f open-webui
# Service configuration
Restart=always
RestartSec=10
Type=simple
Environment=HOME=/home/christian

[Install]
WantedBy=default.target
```

Security note: `--network=host` gives the container the host network namespace, and `--device nvidia.com/gpu=all` exposes GPU devices. That may be the right tradeoff for a single-user lab box. For shared systems, prefer explicit port mappings, separate service users, scoped API keys, and narrow volume mounts.

### 2. Enable and Start Open-WebUI

```bash
systemctl --user daemon-reload
systemctl --user enable --now open-webui
```

## Setting Up OpenEDAI Speech

### 1. Clone Repository

```bash
git clone https://github.com/matatonic/openedai-speech
cd openedai-speech
```

### 2. Docker Compose Configuration

Create `docker-compose.yml`:

```yaml
services:
  server:
    build:
      dockerfile: Dockerfile
    image: ghcr.io/matatonic/openedai-speech
    env_file: speech.env
    ports:
      - "8000:8000"
    volumes:
      - ./voices:/app/voices
      - ./config:/app/config
    restart: unless-stopped
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```

### 3. Environment Configuration

Create `speech.env`:

```env
COQUI_TOS_AGREED=1
CUDA_VISIBLE_DEVICES=0
PORT=8000
```

### 4. Voice Configuration

Create `config/voice_to_speaker.yaml`:

```yaml
tts-1:
  alloy:
    model: voices/en_US-libritts_r-medium.onnx
    speaker: 79 # 64, 79, 80, 101, 130
  echo:
    model: voices/en_US-libritts_r-medium.onnx
    speaker: 134 # 52, 102, 134
  echo-alt:
    model: voices/en_US-ryan-high.onnx
    speaker: #159 # 55, 90, 132, 136, 137, 159
  fable:
    model: voices/en_GB-northern_english_male-medium.onnx
    speaker: # default speaker
  onyx:
    model: voices/en_US-libritts_r-medium.onnx
    speaker: 159 # 55, 90, 132, 136, 137, 159
  nova:
    model: voices/en_US-libritts_r-medium.onnx
    speaker: 107 # 57, 61, 107, 150, 162
  shimmer:
    model: voices/en_US-libritts_r-medium.onnx
    speaker: 163
  norman:
    model: voices/en_US-norman-medium.onnx
    speaker: 159 # 55, 90, 132, 136, 137, 159
  bryce:
    model: voices/en_US-libritts_r-medium.onnx
    speaker: # default
tts-1-hd:
  alloy-alt:
    model: xtts
    speaker: voices/alloy-alt.wav
  alloy:
    model: xtts
    speaker: voices/alloy.wav
  echo:
    model: xtts
    speaker: voices/echo.wav
  fable:
    model: xtts
    speaker: voices/fable.wav
  onyx:
    model: xtts
    speaker: voices/onyx.wav
  nova:
    model: xtts
    speaker: voices/nova.wav
  shimmer:
    model: xtts
    speaker: voices/shimmer.wav

```

### 5. Deploy OpenEDAI Speech

```bash
docker-compose up -d
```

## Integrating Web Search in Open-WebUI

1. Navigate to Extensions in Open-WebUI
2. Install the Web Search extension: https://openwebui.com/t/constliakos/web_search/
3. Configure the extension:
   - Set SearXNG URL to: `http://dockerlocalhost:8081`
   - Enable the extension in your chat settings

## Service Management

### Check Service Status

```bash
# For SearXNG
systemctl --user status searxng

# For Open-WebUI
systemctl --user status open-webui

# For OpenEDAI Speech
docker-compose ps
```

### View Logs

```bash
# For SearXNG
journalctl --user -u searxng

# For Open-WebUI
journalctl --user -u open-webui

# For OpenEDAI Speech
docker-compose logs
```

## Troubleshooting

1. If services fail to start, check logs for errors
2. Ensure all ports are available and not in use
3. Verify NVIDIA drivers and CUDA are properly installed
4. Check file permissions for mounted volumes

## Notes

- Replace all instances of "christian" with your username
- Adjust ports if there are conflicts
- Ensure proper GPU support for OpenEDAI Speech
- Back up configuration files before making changes
- All services run as unprivileged containers for enhanced security

This setup provides a complete environment for AI interactions with web search capabilities and text-to-speech synthesis, all running as unprivileged containers for enhanced security.
