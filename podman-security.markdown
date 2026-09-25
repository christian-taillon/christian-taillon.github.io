---
layout: page
title: "Podman vs Docker: Security Angle"
description: "Why Podman is attractive from a container security perspective: rootless-first, daemonless, user namespaces, and OCI compatibility, plus the migration caveats that matter."
permalink: /podman-security
---

# Podman vs Docker: The Security Angle

Podman is not automatically secure and Docker is not automatically insecure. Both run Linux containers, both can run rootless, and both are OCI-compatible. The interesting difference is the *default* architecture and where privileged exposure lives. This page is a short, practical note on why Podman is attractive from a security perspective, and where migration actually costs effort.

## Why Podman Is Attractive

### 1. Rootless is first-class, not an opt-in mode

Podman is designed so that **most commands run as a regular user without additional privileges**. When a non-root user runs Podman, it automatically creates a **user namespace** for that user (configured via `/etc/subuid` and `/etc/subgid`), and containers created by one user are not visible to other users or to rootful Podman.

Docker *can* run rootless too (since Docker 20.10), but it is an explicit, separate setup path: you run `dockerd-rootless-setuptool.sh install` to start a per-user rootless daemon. The default Docker install still runs a system `dockerd` as root. The practical difference is that with Podman, rootless is the normal workflow; with Docker, rootless is a mode you have to choose and configure.

> Source: [Podman docs — podman(1), Rootless mode](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode); [Docker docs — Rootless mode](https://docs.docker.com/engine/security/rootless/)

### 2. Daemonless: no always-running privileged control plane

Docker Engine is explicitly described in its own docs as "a client-server application with a long-running daemon process `dockerd`." That daemon has historically run as root and is the privileged control plane for images, containers, networks, and volumes. Anything that can reach the Docker socket can effectively get root on the host, which is why mounting the Docker socket into a container is a well-known privilege-escalation footgun.

Podman is a **daemonless tool**. Container lifecycle is handled by a forked runtime (typically `crun` or `runc`) plus `conmon`, and there is no always-running privileged daemon that clients talk to. This reduces the standing privileged attack surface: there is no single long-lived root process to reach via a mounted socket or a compromised API endpoint. (Podman *can* expose a compatible REST API/socket for tooling, but it is not required for normal operation.)

> Source: [Podman docs — podman(1), Description](https://docs.podman.io/en/latest/markdown/podman.1.html#description); [Docker docs — Docker Engine](https://docs.docker.com/engine/)

### 3. Linux user namespaces and better host isolation

Because Podman rootless runs every container inside a **user namespace**, the root user *inside* the container maps to an unprivileged user *on the host*. A process that breaks out of the container boundary still lands as a non-root user on the host, with a limited UID/GID range. This is a meaningful layer of defense-in-depth: container-root ≠ host-root.

Docker's rootless mode also uses user namespaces, and Docker's older `userns-remap` mode remaps UIDs while the daemon itself stays root. The distinction worth knowing: with Podman the user-namespace model is the default path, while with Docker it is a configuration choice that changes how the daemon maps UIDs/GIDs.

> Source: [Podman docs — Rootless mode](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode); [Docker docs — Rootless mode, How it works](https://docs.docker.com/engine/security/rootless/)

### 4. Open source and OCI-compatible

Podman is open source under the **Apache 2.0 license**, developed in the open by Red Hat and the containers community. It is **OCI-compatible**: it builds and runs OCI images and uses OCI runtimes (`crun`/`runc`), so images built for Docker generally run on Podman and vice versa. The CLI is intentionally Docker-compatible — the docs note you can often just `alias docker=podman`.

To be fair: Docker Engine (moby) is also Apache 2.0 and OCI-compatible. The OCI itself maintains three specs — Runtime, Image, and Distribution — that both engines implement. The open-source/OCI point is *not* a Podman-only advantage; it is a reason Podman fits cleanly into the same ecosystem rather than a proprietary dead end. (Note: Docker *Desktop*, the packaged GUI product, has separate commercial licensing for larger organizations; Docker Engine the CLI/daemon remains open source.)

> Source: [Podman LICENSE (Apache 2.0)](https://github.com/containers/podman/blob/main/LICENSE); [Podman docs — Description](https://docs.podman.io/en/latest/markdown/podman.1.html#description); [Docker docs — Engine licensing](https://docs.docker.com/engine/); [Open Container Initiative — Overview](https://opencontainers.org/about/overview/)

## Security Still Depends on You

None of the above makes a Podman deployment automatically safe. The same factors that determine Docker container security apply equally to Podman:

- **Image provenance** — pulling from untrusted registries or running unverified images is risky regardless of engine. Use fully qualified image names and, where possible, signed images / digest pinning.
- **Configuration** — `--privileged`, `--cap-add`, host PID/network namespaces, and shared IPC all punch holes in isolation on Podman just as they do on Docker.
- **Capabilities** — drop Linux capabilities you don't need; both engines default to a reduced set but allow widening it.
- **Mounts** — bind-mounting sensitive host paths (`/`, `/home`, `/etc`, socket files) weakens the boundary. The Docker-socket-as-root pattern has a Podman equivalent via the Podman socket; treat both as root-equivalent.
- **Networking** — host networking, port publishing, and rootless networking helpers (`pasta`/`passt`, `slirp4netns`) each have different exposure models. Rootless Podman networking has different constraints than rootful Docker networking.
- **Patching** — Podman, the runtime (`crun`/`runc`), the kernel, and user-namespace helpers all need updates. A rootless container on an unpatched kernel is still on an unpatched kernel.

The honest framing: Podman shifts some privileged exposure *out of the default path*, which reduces the chance of a footgun. It does not remove the need for a real threat model.

## Podman Is Not a 1:1 Docker Switch

The CLI is compatible, but the ecosystems are not identical. Treat migration as testing work, not a rename. Things that commonly differ:

- **Compose** — Docker Compose targets the Docker API. Podman has `podman compose`, which runs Compose workloads via an external compose provider (e.g. `docker-compose` binary). Feature parity is good but not complete; complex Compose files with certain networking or volume semantics may behave differently and need testing.
- **Networking** — Podman uses `netavark`/`pasta` (and historically CNI/`slirp4netns`) rather than Docker's embedded DNS and bridge model. Container name resolution, network scoping, and rootless networking behavior can differ.
- **Volumes** — volume storage locations and ownership semantics differ, especially in rootless mode where storage lives under `$HOME/.local/share/containers/storage` rather than `/var/lib/containers`. Permissions across the user-namespace boundary can surprise you.
- **Docker socket / API integrations** — tools that hard-depend on the Docker socket (`/var/run/docker.sock`) or the Docker Engine API may need Podman's compatibility socket or a shim. Some tools work transparently; some don't.
- **Platform support** — on Linux, Podman runs natively. On macOS and Windows, Podman runs containers inside a Linux VM ("Podman machine"), similar in spirit to how Docker Desktop works. The VM model means slightly different performance, filesystem, and networking characteristics than a native Linux host.
- **Build** — Podman uses Buildah internally for builds; `podman build` accepts Dockerfiles but a few edge-case behaviors and build flags differ from `docker build`.

The practical migration advice: alias `docker=podman` for a quick try, then run your real Compose files, CI, and socket-dependent tooling against Podman in a test environment before committing to it. Where something doesn't work, reach for the compatibility layers (`podman compose`, the Podman Docker-API socket, `podman machine`) rather than assuming the tool is broken.

## When I Reach for Podman

- **Single-user dev and CI on Linux** where I want containers without a root daemon.
- **Builds and untrusted-ish workloads** where rootless-by-default reduces blast radius without extra setup.
- **GPU/AI workloads** — see the [Container Device Interface (CDI) guide](/cdi) for NVIDIA GPU passthrough with Podman, which is the recommended path for Podman + GPUs.

## When Docker Still Makes Sense

- **Existing Docker-based platforms** (Swarm, certain orchestrators, Docker Desktop workflows) where the daemon is already part of the architecture.
- **Teams whose tooling is hard-wired to the Docker socket/API** and where re-validating everything against Podman isn't worth it.
- **macOS/Windows developer experience** where Docker Desktop's polished integration matters more than the daemonless architecture.

Both tools are mature and OCI-compatible. The choice is about which default architecture fits your threat model and workflow, not which one is "secure."

## Sources

- [Podman docs — podman(1)](https://docs.podman.io/en/latest/markdown/podman.1.html) (daemonless, rootless mode, user namespaces, `alias docker=podman`)
- [Podman docs — Installation](https://podman.io/docs/installation) (Podman machine on macOS/Windows, Docker API compatibility)
- [Podman LICENSE — Apache 2.0](https://github.com/containers/podman/blob/main/LICENSE)
- [Docker docs — Docker Engine](https://docs.docker.com/engine/) (long-running daemon, licensing)
- [Docker docs — Rootless mode](https://docs.docker.com/engine/security/rootless/) (rootless as opt-in, user namespace, `userns-remap`)
- [Open Container Initiative — Overview](https://opencontainers.org/about/overview/) (Runtime, Image, Distribution specs)