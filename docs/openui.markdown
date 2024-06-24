---
layout: page
title: "Local LLM: Llama 3 and OpenUI"
permalink: /localllm
---

# Running Llama 3 with OpenUI Locally

## Introduction

This guide helps you set up and run Llama 3 with OpenUI on Linux and Windows (using WSL). Running large language models (LLMs) locally provides benefits such as enhanced privacy, security, and performance. It is especially suited for users with powerful GPUs.

## Why Use a GPU?

GPUs accelerate the processing of LLMs, which are computationally intensive tasks. Utilizing a GPU allows for efficient handling of large data and complex computations required by models like Llama 3 70B.

## Prerequisites

- **Powerful NVIDIA GPU**: Required for running Llama 3 70B efficiently.
- **Linux OS**: Primary instructions target Linux.
- **Windows 10/11 with WSL**: Additional notes for users using WSL 2 on Windows.
- **Docker**: Required for containerized application deployment.
- **NVIDIA Drivers and CUDA Toolkit**: Needed for GPU support in Docker containers.

## Installation Guide

### 1. Install Docker

#### For Linux:

1. **Update Packages**:
    ```bash
    sudo apt-get update
    ```

2. **Install Docker**:
    ```bash
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

#### For Windows (WSL):

1. **Set Up WSL 2**:
    - Open PowerShell as Administrator:
      ```powershell
      wsl --install
      wsl --set-default-version 2
      ```
    - Install a Linux distribution from the Microsoft Store (e.g., Ubuntu).

2. **Install Docker in WSL**:
    - Open your Linux distribution and install Docker:
      ```bash
      sudo apt-get update
      sudo apt-get install -y docker.io
      sudo service docker start
      sudo usermod -aG docker $USER
      newgrp docker
      ```

### 2. Install NVIDIA Drivers and CUDA Toolkit

#### For Linux:

1. **Install NVIDIA Drivers**:
    ```bash
    sudo apt-get install -y nvidia-driver-530  # Replace 530 with the correct version for your GPU
    sudo reboot  # Restart to apply changes
    ```

2. **Install CUDA Toolkit**:
    - Download and install the CUDA toolkit from the [NVIDIA website](https://developer.nvidia.com/cuda-downloads).

#### For Windows:

1. **Install NVIDIA Drivers**:
    - Download and install the latest drivers from the [NVIDIA website](https://www.nvidia.com/Download/index.aspx).

2. **Install CUDA Toolkit**:
    - Download and install the CUDA toolkit from the [NVIDIA website](https://developer.nvidia.com/cuda-downloads).

### 3. Install NVIDIA Docker Toolkit

#### For Linux:

1. **Add NVIDIA Docker Repository**:
    ```bash
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
    curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
    curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
    sudo apt-get update
    ```

2. **Install NVIDIA Docker Toolkit**:
    ```bash
    sudo apt-get install -y nvidia-docker2
    sudo systemctl restart docker
    ```

#### For Windows (WSL):

1. **Set Up NVIDIA Container Toolkit**:
    - Open your Linux distribution and run:
      ```bash
      sudo apt-get update
      sudo apt-get install -y nvidia-container-toolkit
      sudo service docker restart
      ```

2. **Verify GPU Support**:
    ```bash
    docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi
    ```
    - This command should show your GPU details if configured correctly.

### 4. Pull and Run Llama 3 Docker Image

1. **Create a Directory for Llama 3**:
    ```bash
    mkdir -p ~/llama3
    cd ~/llama3
    ```

2. **Pull the Docker Image**:
    ```bash
    docker pull <llama3-docker-image>  # Replace <llama3-docker-image> with the actual image name
    ```

3. **Run the Docker Container**:
    ```bash
    # For Linux
    docker run --gpus all -v ~/llama3:/data <llama3-docker-image>

    # For Windows (WSL)
    docker run --gpus all -v /mnt/c/Users/<YourUsername>/llama3:/data <llama3-docker-image>
    ```
    - Replace `<llama3-docker-image>` with the actual Docker image name.
    - Replace `<YourUsername>` with your Windows username if using WSL.

### 5. Access OpenUI

1. **Open a Web Browser** and go to `http://localhost:<port>`, replacing `<port>` with the port used by your Docker container.

## Alternative Models

- **Hugging Face Models**: Explore various models on [Hugging Face](https://huggingface.co/models) for different needs and computational requirements. They offer a range of models that can be more suitable for diverse tasks and hardware configurations.

## Conclusion

By following this guide, you can efficiently run Llama 3 with OpenUI locally on both Linux and Windows using WSL, leveraging your NVIDIA GPU for optimal performance while ensuring data privacy and security.
