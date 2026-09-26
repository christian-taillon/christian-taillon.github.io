---
layout: page
title: "Agent Sandboxing"
description: "Practical isolation guidance for AI coding agents, including Codex, Claude Code, bubblewrap, containers, Docker Sandboxes, and opencode-containment."
permalink: /ai-agent-sandboxing/
---

AI coding agents are not chatbots once they can edit files, run shell commands, browse, call MCP tools, or use credentials. At that point the security model is closer to an intern with a terminal than a text generator.

The goal is not to make the tool painful. The goal is to preserve the normal developer loop while putting real boundaries around the blast radius.

**Last reviewed: September 26, 2026.**

## Pick the Boundary First

There is no single correct sandbox. Start with the risk of the task, then give the agent the smallest useful boundary.

| Situation | Reasonable starting point |
| --- | --- |
| Trusted personal repo | Native agent sandbox + approvals + worktree or clean branch. |
| New or unfamiliar dependency tree | No host secrets, narrow filesystem scope, restricted network, disposable build state. |
| Untrusted repo or unknown build scripts | Hardened container or microVM sandbox with only the workspace mounted. |
| Malware or reverse-engineering work | Disposable VM with no shared host credentials and tightly controlled network access. |
| Agent with GitHub, cloud, browser, Slack, or MCP tools | Separate identities or scoped credentials plus explicit approval for side effects. |

A worktree helps with reviewability. It does not stop hostile code. A permission prompt can stop an action. It does not replace an OS boundary. A container can isolate most of the host while still giving the process full control of any host directory or socket you intentionally mount.

## Threat Model

The practical risks I care about:

- Prompt injection from issues, docs, READMEs, web pages, logs, package scripts, or test fixtures.
- Tool abuse through shell commands, package managers, browsers, MCP servers, cloud CLIs, and git remotes.
- Credential exposure through `.env`, shell history, SSH agents, cloud tokens, browser profiles, and mounted home directories.
- Persistence through modified shell profiles, git hooks, editor config, package scripts, or local agent memory.
- Data exfiltration over network access, DNS, package registries, webhooks, paste sites, or normal-looking API calls.
- Identity abuse through GitHub, cloud, SaaS, browser, and MCP credentials that let an agent act as the user.
- Unexpected code execution through package hooks, build systems, tests, plugins, generated commands, and agent tooling.

OWASP now has guidance that maps more directly to this problem. The **OWASP Top 10 for Agentic Applications 2026** includes Agent Goal Hijack, Tool Misuse and Exploitation, Identity and Privilege Abuse, Agentic Supply Chain Vulnerabilities, and Unexpected Code Execution. The **OWASP GenAI LLM Top 10 2026** remains useful for model/application risks such as prompt injection, sensitive information disclosure, and supply-chain exposure.

The labels are useful, but the implementation question matters more here: what can be isolated, what can be logged, what can be made read-only, what identity can be scoped, and what state can be made temporary?

This page is not a universal policy. It is a set of examples and paths. Different people will make different tradeoffs for a personal laptop, a lab box, a production repo, or a malware-adjacent reverse-engineering project.

## Native Sandboxing Is Not One Thing

Different tools use the word sandbox differently.

| Tool or layer | What it helps with | What I still assume |
| --- | --- | --- |
| Codex CLI | Current Codex separates **sandbox boundaries** from **approval policy**. On Linux and WSL2 its local sandbox uses bubblewrap/user namespaces, and `workspace-write` can constrain normal work to the workspace while requiring approval to cross the boundary. | Verify the actual active sandbox. Containerized hosts can prevent the inner Linux sandbox from working, so either enable the required isolation features or make the outer container the intentional boundary. |
| Claude Code | Permission modes, allow/deny rules, managed settings, sandboxed Bash, dev containers, Docker, and VM guidance. | Permissions are policy. Sandboxed Bash, containers, and VMs provide different isolation layers. Use both policy and isolation for risky repos. |
| bubblewrap | Linux namespaces, read-only bind mounts, private process/network views, environment control, and optional seccomp policies. | Bubblewrap is a construction kit, not a complete policy. Bad bind mounts, inherited environment variables, or exposed sockets can defeat the intent. |
| Containers | Repeatable environment, filesystem boundary, disposable state, easier dependency control. | Writable host mounts, host networking, Docker/Podman sockets, device passthrough, and credentials remain explicit holes in the boundary. |
| MicroVM / sandbox runtime | Stronger runtime separation while preserving a development workflow. | The workspace, provider credentials, integrations, and any allowed network destinations still define the practical blast radius. |
| VM | Strong isolation and easy reset when configured with minimal host integration. | More friction, but appropriate for malware-ish repos, untrusted model code, and unknown build systems. |

For Codex specifically, it helps to keep two concepts separate:

- **Sandbox:** what files and network resources a command can access.
- **Approvals:** when Codex pauses and asks to cross that boundary or perform a side effect.

Approvals are not the sandbox. Automatic approval review also does not widen or replace the sandbox boundary.

## Bubblewrap Pattern

Bubblewrap is useful because it can wrap a normal CLI without forcing a full container workflow. It creates Linux namespaces and lets you decide exactly what the process can see.

The minimum useful pattern for an AI coding agent is:

- Bind the target repo read-write only when edits are required.
- Bind system binaries and libraries read-only.
- Do not bind the full home directory.
- Provide an empty or minimal `$HOME`.
- **Clear the inherited environment**, then add back only variables the workload needs.
- Mount `/tmp` as tmpfs.
- Use new process, IPC, network, and session boundaries where practical.
- Kill the child if the wrapper dies.
- Disable network unless the task explicitly needs it.
- Never expose SSH agents, cloud credential directories, browser profiles, container-engine sockets, or `.env` files by default.

Example shape, not a universal policy:

```bash
bwrap \
  --ro-bind /usr /usr \
  --ro-bind /bin /bin \
  --ro-bind /lib /lib \
  --ro-bind /lib64 /lib64 \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --dir /home/agent \
  --clearenv \
  --setenv HOME /home/agent \
  --setenv PATH /usr/local/bin:/usr/bin:/bin \
  --setenv TERM "${TERM:-xterm-256color}" \
  --bind "$PWD" "$PWD" \
  --chdir "$PWD" \
  --unshare-pid \
  --unshare-ipc \
  --unshare-net \
  --unshare-uts \
  --new-session \
  --die-with-parent \
  bash --noprofile --norc
```

The important addition is `--clearenv`. Filesystem isolation does not help much if the wrapper quietly passes `AWS_SECRET_ACCESS_KEY`, `GITHUB_TOKEN`, or another credential through the process environment.

`--unshare-net` creates a private network namespace with no access to the host network. If a workload needs loopback for a local service test, configure that deliberately inside the namespace rather than assuming host networking is available.

That keeps the feel close to normal local development, but it is still only as good as the mounts, namespaces, file descriptors, environment, and sockets you choose.

## Example Isolation Paths

These are not maturity levels. They are patterns you can mix.

| Path | What it feels like | What it demonstrates |
| --- | --- | --- |
| Worktree only | Normal local dev | Keeps agent changes separate from your active branch. Good for reviewability, not a security boundary. |
| Separate OS user | Mostly normal local dev | Removes default access to your home directory, shell history, SSH keys, browser profile, and cloud configs. |
| bubblewrap | Local CLI with narrower filesystem/network view | Shows how much you can contain without building a full image. Good for quick experiments. |
| Dev container | Familiar IDE/container workflow | Gives repeatable dependencies and a clearer filesystem boundary. Useful for teams. |
| Docker/Podman one-shot container | Disposable shell | Good for running tests/builds without keeping state. Watch volume mounts, sockets, credentials, and host networking. |
| MicroVM sandbox | Similar project workflow with a stronger runtime boundary | Useful for autonomous coding where a normal container exposes too much host integration. |
| VM | Most isolated, most friction | Best for untrusted repos, unknown build scripts, malware-ish samples, and experiments you want to revert. |

The core question is not "which sandbox is best?" It is "what does the agent actually need to touch for this task?"

## What You Can Constrain

The useful knobs are concrete:

| Surface | Examples of what can be constrained |
| --- | --- |
| Filesystem | Mount repo read-only or read-write, hide `$HOME`, expose only selected cache dirs, make `/tmp` disposable. |
| Network | Deny egress by default, isolate DNS, allow loopback only when needed, or proxy/log narrow destinations. |
| Environment | Start with an empty environment and pass back only required variables. |
| Credentials | Do not mount private keys, cloud config dirs, kubeconfig, browser profiles, password stores, or `.env` files by default. |
| IPC / sockets | Docker/Podman socket, SSH agent, GPG agent, DBus, Wayland/X11, tmux sockets, systemd user bus, and inherited file descriptors. |
| Process view | New PID namespace, no host process visibility, no inherited host process-control sockets. |
| Package installs | Disable scripts where possible, use disposable caches, require approval for build hooks. |
| Tooling | Allow read/search tools broadly, gate shell/browser/MCP/cloud tools more carefully. |
| Persistence | Disposable home, no shell profile writes, no git hook writes without review. |
| Audit | Save commands, diffs, tool calls, network logs, and final patch. |

Unix sockets deserve special attention. A filesystem sandbox can look restrictive while an inherited Docker socket effectively hands the process control of the host. An SSH agent socket does not expose the private-key file, but it can still let the process request authentication or signing operations while the socket is available.

## Concrete Examples

### Read-only review

Useful when the agent only needs to inspect code and produce notes.

```bash
bwrap \
  --ro-bind /usr /usr \
  --ro-bind /bin /bin \
  --ro-bind /lib /lib \
  --ro-bind /lib64 /lib64 \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --dir /home/agent \
  --clearenv \
  --setenv HOME /home/agent \
  --setenv PATH /usr/local/bin:/usr/bin:/bin \
  --setenv TERM "${TERM:-xterm-256color}" \
  --ro-bind "$PWD" "$PWD" \
  --chdir "$PWD" \
  --unshare-pid \
  --unshare-ipc \
  --unshare-net \
  --unshare-uts \
  --new-session \
  --die-with-parent \
  bash --noprofile --norc
```

What this shows: the repo is visible but not writable, `$HOME` is empty, the caller's credential-bearing environment is not inherited, and the process cannot use the host network.

### Writable repo, disposable home

Useful when the agent needs to edit files but should not inherit your normal home directory.

```bash
bwrap \
  --ro-bind /usr /usr \
  --ro-bind /bin /bin \
  --ro-bind /lib /lib \
  --ro-bind /lib64 /lib64 \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --dir /home/agent \
  --clearenv \
  --setenv HOME /home/agent \
  --setenv PATH /usr/local/bin:/usr/bin:/bin \
  --setenv TERM "${TERM:-xterm-256color}" \
  --bind "$PWD" "$PWD" \
  --chdir "$PWD" \
  --unshare-pid \
  --unshare-ipc \
  --unshare-net \
  --unshare-uts \
  --new-session \
  --die-with-parent \
  bash --noprofile --norc
```

What this shows: the agent can write to the repo, but it does not inherit your normal dotfiles, shell history, credential stores, browser profile, or exported secrets.

The writable repo is still a real host mount. A compromised process can delete it, modify tests, add a backdoor, or change files that you later execute. Containment limits the blast radius around the workspace; it does not make workspace writes trustworthy.

### Hardened one-shot container

Useful when dependencies matter more than transparent local filesystem access.

```bash
docker run --rm -it \
  --network none \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --read-only \
  --tmpfs /tmp:rw,nosuid,nodev \
  --user "$(id -u):$(id -g)" \
  -v "$PWD":/workspace \
  -w /workspace \
  -e HOME=/tmp \
  node:22-bookworm \
  bash --noprofile --norc
```

What this shows: the container cannot use the network, receives no extra Linux capabilities, has a read-only root filesystem, and does not inherit your normal home directory.

Again, `/workspace` is a writable bind mount to the host. Anything in that directory is in scope. Do not mount the Docker/Podman socket, `$HOME`, SSH keys, or cloud credential directories merely to make the workflow convenient.

### Worktree for clean review

Useful when the concern is not hostile code, but keeping the agent's edits reviewable.

```bash
git worktree add ../repo-agent-sandbox -b agent/sandbox-test
```

What this shows: isolation can also mean change isolation. A worktree is not a security boundary, but it makes review and cleanup easier.

## Secrets And Credential Examples

These are common things I do not want casually inherited by an autonomous coding loop:

- `.env`, `.env.*`, `*.pem`, `*.key`, `id_rsa`, `id_ed25519`
- `~/.ssh`, `~/.aws`, `~/.azure`, `~/.config/gcloud`, `~/.kube`
- `~/.docker/config.json`, `~/.npmrc`, `~/.pypirc`, Hugging Face tokens
- browser profiles and cookies
- shell history and shell profiles
- Docker/Podman, SSH-agent, GPG-agent, desktop-session, and other privileged sockets
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GITHUB_TOKEN`, `HF_TOKEN`, `AWS_*`, `AZURE_*`, `GOOGLE_*`

The path is not always "block forever." Sometimes the right answer is a scoped token, temporary environment variable, read-only credential, short-lived workload identity, or a throwaway account. The point is to make that access explicit.

## Package Manager Risk Examples

Package managers are tool execution systems.

| Ecosystem | Example risk | Possible control |
| --- | --- | --- |
| Node | `preinstall`, `install`, `postinstall`, `prepare` scripts | Use lockfiles, consider `--ignore-scripts`, install in a disposable container. |
| Python | `setup.py`, PEP 517 build backends, native extension builds | Prefer wheels to avoid build-time execution, but do not treat wheels as trusted code. Run imports/tests inside the same containment boundary and avoid secrets during install. |
| Rust | `build.rs` runs during build | Build in a container or separate user when reviewing unfamiliar crates. |
| Go | Tests and generators can execute arbitrary code | Separate code review from `go test`; run tests with scoped network/filesystem. |
| Containers | Dockerfiles can fetch and run arbitrary build steps | Build without secrets, review Dockerfile, avoid mounting Docker socket into agent environments. |

## Network Examples

Network access is not binary. Possible shapes:

- No network for code reading, local edits, and many test runs.
- Temporary network for documentation lookup.
- Temporary network for package install, then turn it off.
- Proxy network access that logs destinations and requests.
- Narrow provider/package-registry access.
- Loopback only when the agent needs to test a local service.

An allowlist limits **where** a process can connect. It does not necessarily limit **what it can send** to an allowed writable service. A package registry, GitHub API, object store, webhook service, or model provider may still accept attacker-controlled content.

DNS matters too. Arbitrary DNS can be an exfiltration path, and domain-based egress controls need to consider DNS rebinding and address changes over time. If domain allowlisting is part of the security boundary, use a DNS-aware policy or firewall design rather than a one-time hostname-to-IP lookup.

## MCP And Browser Tooling

MCP servers and browser tools are where "agent can code" turns into "agent can operate my accounts."

Examples of things worth separating:

- Filesystem MCP pointed only at the repo, not the full home directory.
- GitHub MCP scoped to one repo or org where possible.
- Browser automation with a throwaway profile instead of your daily browser profile.
- Slack/Jira/Linear tools with clear approval before posting or modifying state.
- Cloud tools with read-only, lab, short-lived, or workload-specific credentials instead of production credentials.
- MCP servers that can execute local commands treated as code-execution surfaces, not harmless context providers.

This is why I like thinking in surfaces. A browser, shell, GitHub token, cloud CLI, Docker socket, and MCP server are separate trust decisions.

## Codex And Claude Code

Use the native controls first because they are where the agent loop already understands approvals and tool use, then decide whether you also need an outer containment layer.

### Codex

Current Codex explicitly separates sandboxing from approvals:

- On Linux and WSL2, install `bubblewrap` so Codex can use its normal Linux sandbox reliably.
- `workspace-write` is the useful low-friction boundary for local work: Codex can read and edit the workspace and run routine local commands, while network use or crossing the workspace boundary can require approval.
- `read-only` narrows the agent further.
- `danger-full-access` removes the filesystem and network sandbox, so treat it as an intentional elevated mode rather than a convenience toggle.
- Use writable roots or narrow rules when a task needs a specific exception instead of broadly expanding access.
- Do not run broad autonomous sessions from a shell that has production credentials loaded.

One subtle case is Codex inside Docker or another container. Namespace, `bwrap`, or seccomp restrictions in the outer environment can prevent the inner Codex sandbox from working. OpenAI documents two valid patterns:

1. Configure the dev container so the inner Codex sandbox can still run.
2. Make the outer container the deliberate security boundary and run Codex without a second inner sandbox.

If you choose the second pattern, everything available inside the outer container is inside the Codex blast radius. That includes the workspace, Codex credentials, any mounted sockets, and any network destinations the container can reach.

### Claude Code

For Claude Code:

- Use permission rules to deny secrets, risky commands, and untrusted MCP servers.
- Use sandboxed Bash or dev containers for more autonomous runs.
- Use managed settings for team policy when this is more than a personal workstation.
- Treat Chrome, MCP, Slack, GitHub, and cloud integrations as separate tool surfaces, not just conveniences.
- Keep credentials and host directories out of the runtime unless the task actually needs them.

Native controls are not a reason to skip OS isolation. They are a reason to make isolation usable.

## opencode-containment

[`opencode-containment`](https://github.com/christian-taillon/opencode-containment) is now a concrete implementation of this model rather than only an experiment.

It supports two runtime approaches:

| Backend | Goal | Important boundary |
| --- | --- | --- |
| Hardened container | Preserve a native-feeling terminal workflow with explicit host integration. | Drops Linux capabilities, uses `no-new-privileges`, a read-only root, tmpfs writable areas, workspace guardrails, and narrow config/state handling. |
| Docker Sandboxes | Stronger isolation with a microVM-backed sandbox runtime. | Keeps the project workflow while moving the runtime behind a stronger boundary and a configurable network allowlist. |

The project also includes:

- A prompt-injection/data-exfiltration demo showing why hidden instructions in normal repo content are dangerous.
- Read-only host configuration mounts instead of a full `$HOME` mount.
- Separate container state rather than writable host OpenCode state.
- Guardrails that reject obviously unsafe workspace roots such as `/` or the full home directory.
- A lower-integration secure profile and a more integrated native profile.
- Narrow network policy support for the Docker Sandboxes backend.
- Explicit warnings around Docker sockets, broad mounts, privileged mode, and local overrides.

There are still intentional trust decisions. The current workflow mirrors provider authentication into isolated runtime state so the agent can reach configured models. Current profiles can also forward the SSH-agent socket for Git authentication. Those are better than mounting private-key files, but they are still capabilities available to the running process. If the task does not need them, disable or separate them.

That distinction matters: **containment reduces unnecessary host access; it does not make the agent or its workspace trusted.**

For higher-risk work I prefer the sandbox backend. For normal development I want the hardened container path to remain fast enough that I actually use it.

## Design Principle

I do not want one rigid policy for everyone. I want the safe path to match the work.

For a personal blog repo, native sandboxing, approvals, and a worktree may be enough. For an unfamiliar dependency tree, I want no host secrets and narrowly controlled network access. For malicious or unknown code, I want a disposable VM or microVM. For day-to-day coding, I want the same terminal-driven workflow with unnecessary host access removed.

The useful question is not "is this agent safe?" It is:

> **If the agent follows malicious instructions right now, what can it read, modify, authenticate to, execute, and send off the machine?**

Answer that concretely and the right containment choices become much easier.

## Sources

- [bubblewrap README](https://github.com/containers/bubblewrap)
- [bubblewrap command options](https://github.com/containers/bubblewrap/blob/main/bubblewrap.c)
- [OpenAI Codex sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- [OpenAI Codex agent approvals and security](https://developers.openai.com/codex/agent-approvals-security)
- [Claude Code permissions](https://code.claude.com/docs/en/permissions.md)
- [Claude Code sandbox environments](https://code.claude.com/docs/en/sandbox-environments.md)
- [Claude Code sandboxed Bash](https://code.claude.com/docs/en/sandboxing.md)
- [Claude Code secure deployment](https://code.claude.com/docs/en/agent-sdk/secure-deployment.md)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
