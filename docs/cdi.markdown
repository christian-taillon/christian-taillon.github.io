---
layout: page
title: "Container Device Interface"
permalink: /cdi
---
# **Using CDI (Container Device Interface) for NVIDIA GPUs with Podman**

## **What is CDI (Container Device Interface)?**

The **Container Device Interface (CDI)** is a specification that provides a standardized way to access **NVIDIA GPU devices** from within containers. It is the **recommended and most reliable method** for interfacing between **Podman** and NVIDIA GPUs, ensuring proper access to GPU hardware and drivers inside containers.

> **Note for AI/ML practitioners**: If you're working with **large language models (LLMs)** or other GPU-intensive AI workloads in containers, CDI is essential for optimal performance and stability with Podman.

When using **NVIDIA GPUs** with containerized applications, especially through Podman, CDI creates a consistent interface between the host system's GPU drivers and the container environment, allowing containers to fully leverage GPU acceleration for CUDA applications, machine learning frameworks, and more.

---

## **Why Should You Use CDI with Podman?**

CDI provides an efficient, consistent, and flexible way to manage and expose NVIDIA GPUs to Podman containers. Here's why you should use it:

### **1. Podman's Preferred GPU Integration Method**
- CDI is the **officially supported mechanism** for Podman to access NVIDIA GPUs
- It offers a more stable and maintainable approach than legacy methods like the `--device` flag

### **2. GPU Access for Containers**
- CDI ensures that **GPU resources** are correctly passed through to containers, enabling GPU-accelerated workloads inside Podman containers
- It simplifies **container runtime configuration** when using NVIDIA GPUs

### **3. Supports Modern Container Workflows**
- CDI works seamlessly with **Podman's rootless containers** and pod-based deployments
- Provides consistent device access across different container configurations and deployment patterns

### **4. Compatible with NVIDIA Drivers**
- The CDI specification works directly with **NVIDIA drivers** to allow containers to use GPU features like CUDA, machine learning, and high-performance computing tasks

---

## **When Should You Use CDI with Podman?**

You need to use **CDI** if you're:

- Running **Podman** as your container engine and need to access NVIDIA GPUs
- Working with **large language models** or other AI/ML workloads in containers that require GPU acceleration
- Running **GPU-accelerated workloads** (e.g., AI, deep learning, data science) within Podman containers
- **Using NVIDIA GPUs** on your system and want them to be accessible inside your Podman containerized environment
- Managing a production environment that requires **NVIDIA GPU support** within Podman containers

---

## **Steps to Regenerate CDI Specification File**

### **Why You Might Need to Regenerate the CDI File**
If you've updated your **NVIDIA driver**, the CDI file may be referencing an older version, which could cause Podman container runtime errors. This is common when the NVIDIA driver version is updated, but the CDI specification file remains outdated.

### **How to Regenerate CDI File**
To resolve this, you need to **regenerate the CDI specification** to match your updated **NVIDIA driver**.

### **Manual Steps**

1. **Remove the old CDI specification file**  
   If the old CDI file exists, remove it to avoid conflicts.
   ```sh
   sudo rm -f /etc/cdi/nvidia.yaml
   ```

2. **Regenerate the CDI file**  
   Using the NVIDIA toolkit, regenerate the CDI file to ensure it uses the correct driver version.
   ```sh
   sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
   ```

3. **Verify the file has the correct driver version**  
   Ensure the CDI file references the correct driver version by running:
   ```sh
   cat /etc/cdi/nvidia.yaml | grep "570"
   ```

4. **Restart Podman**  
   Restart Podman to apply the changes:
   ```sh
   sudo systemctl restart podman
   ```

5. **Test GPU access in Podman**  
   Verify that Podman can access the GPU:
   ```sh
   podman run --device nvidia.com/gpu=all --rm nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
   ```

---

## **Automating CDI File Regeneration**

For **production environments** running Podman with NVIDIA GPUs, it's best to **automate** this process to ensure that the CDI specification file is always up-to-date after driver updates or container restarts. Below is a script that can be used for automation:

### **Automated Script Example**

```sh
#!/bin/bash

# Define CDI file location
CDI_FILE="/etc/cdi/nvidia.yaml"

# Get current NVIDIA driver version
DRIVER_VERSION=$(nvidia-smi --query-gpu=driver_version --format=csv,noheader)

echo "Current NVIDIA Driver Version: $DRIVER_VERSION"

# Check if CDI file exists
if [ -f "$CDI_FILE" ]; then
    # Check if the CDI file references an old driver version
    if ! grep -q "$DRIVER_VERSION" "$CDI_FILE"; then
        echo "Outdated CDI configuration detected. Regenerating..."
        sudo rm -f "$CDI_FILE"
        sudo nvidia-ctk cdi generate --output="$CDI_FILE"
        sudo systemctl restart podman
        echo "CDI file updated and Podman restarted."
    else
        echo "CDI file is already up-to-date."
    fi
else
    echo "CDI file missing. Generating..."
    sudo nvidia-ctk cdi generate --output="$CDI_FILE"
    sudo systemctl restart podman
    echo "CDI file created and Podman restarted."
fi
```

---

## **Setting Up Automated CDI Regeneration**

To ensure your Podman environment stays updated without manual intervention, you can automate this process using **systemd** or **cron jobs**.

### **1. Systemd Service (Recommended)**
1. **Create a systemd service** to run the script at boot:
   ```sh
   sudo nano /etc/systemd/system/nvidia-cdi-update.service
   ```
   Add the following content:
   ```ini
   [Unit]
   Description=Regenerate NVIDIA CDI file if outdated
   After=network.target

   [Service]
   ExecStart=/usr/local/bin/nvidia-cdi-update.sh
   Restart=always
   User=root

   [Install]
   WantedBy=multi-user.target
   ```

2. **Enable and start the systemd service**:
   ```sh
   sudo systemctl daemon-reload
   sudo systemctl enable nvidia-cdi-update
   sudo systemctl start nvidia-cdi-update
   ```

### **2. Running LLMs with Podman and CDI**

For those working with large language models in containers, here's a quick example of how to use Podman with CDI to run an LLM inference container:

```sh
# Run an LLM inference container with GPU access
podman run --device nvidia.com/gpu=all \
  -v /path/to/models:/models \
  -p 8080:8080 \
  --rm \
  llm-inference-image:latest
```

---

## **Conclusion**

Using **CDI** is the recommended and most reliable way to enable **GPU-accelerated containers** with NVIDIA GPUs in Podman. It ensures that your Podman containers can correctly access and utilize GPU resources for demanding workloads like large language models, AI training, and deep learning.

Regenerating the **CDI specification file** is necessary after updating your **NVIDIA driver** to avoid errors and ensure that Podman uses the correct configuration. Automating this process in a **production environment** ensures that your system remains efficient and up-to-date with minimal manual intervention.

For teams working with **large language models** or other GPU-intensive applications, CDI provides the stability and performance needed to effectively leverage NVIDIA GPUs within Podman containers.