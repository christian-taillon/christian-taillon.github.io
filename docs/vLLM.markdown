---
layout: page
title: "vLLM Guide"
permalink: /vLLM
---
# 1. VLLM Deployment Guide for Llama-3.2

## 1.1. Prerequisites
- Docker/Podman installed
- NVIDIA GPU with drivers
- Hugging Face account & token

## 1.2. Environment Setup
```bash
# Export HF token
export HUGGING_FACE_HUB_TOKEN="your_token_here"
```

## 1.3. Deploy Container
```bash
docker run --runtime nvidia --gpus all \
    --name llama_vllm \
    -v ~/.cache/huggingface:/root/.cache/huggingface \
    --env "HUGGING_FACE_HUB_TOKEN=$HUGGING_FACE_HUB_TOKEN" \
    -p 8000:5633 \
    --ipc=host \
    vllm/vllm-openai:latest \
    --model meta-llama/Llama-3.2-3B-Instruct
```

## 1.4. Test API
```bash
curl -X POST "http://localhost:5633/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -d '{
        "model": "meta-llama/Llama-3.2-3B-Instruct",
        "messages": [{"role": "user", "content": "Tell my why Coffee is superior to tea."}],
        "temperature": 0.7,
        "max_tokens": 512
    }'
```

## 1.5. Stop Container
```bash
docker stop llama_vllm
docker rm llama_vllm
```
