---
layout: page
title: "Agent Sandboxing"
description: "Practical isolation notes for AI coding agents, including bubblewrap, Codex, Claude Code, containers, and opencode-containment."
permalink: /ai-agent-sandboxing/
---

# Agent Sandboxing

AI coding agents are not chatbots once they can edit files, run shell commands, browse, call MCP tools, or use credentials. At that point the security model is closer to an intern with a terminal than a text generator.

The goal is not to make the tool painful. The goal is to preserve the normal developer loop while putting real boundaries around the blast radius.

## Threat Model

The practical risks I care about:

- Prompt injection from issues, docs, READMEs, web pages, logs, package scripts, or test fixtures.
- Tool abuse through shell commands, package managers, browsers, MCP servers, cloud CLIs, and git remotes.
- Credential exposure through `.env`, shell history, SSH agents, cloud tokens, browser profiles, and mounted home directories.
- Persistence through modified shell profiles, git hooks, editor config, package scripts, or local agent memory.
- Data exfiltration over network access, DNS, package registries, webhooks, paste sites, or normal-looking API calls.

OWASP maps this directly to prompt injection, sensitive information disclosure, supply chain vulnerabilities, insecure plugin design, and excessive agency. The labels are useful, but the interesting part is implementation: what can be isolated, what can be logged, what can be made read-only, and what can be made temporary.

This page is not a universal policy. It is a set of examples and paths. Different people will make different tradeoffs for a personal laptop, a lab box, a production repo, or a malware-adjacent reverse-engineering project.

## Native Sandboxing Is Not One Thing

Different tools use the word sandbox differently.

| Tool or layer | What it helps with | What I still assume |
| --- | --- | --- |
| Codex CLI | Local coding agent with approval modes, permissions, and documented sandboxing concepts. | Approval prompts are not the same as OS isolation. I still scope filesystem and network access. |
| Claude Code | Permission modes, allow/deny rules, managed settings, sandboxed Bash, dev containers, Docker, VM guidance. | Permissions are policy. Containers and sandboxed Bash are isolation layers. Use both for risky repos. |
| bubblewrap | Linux namespaces, read-only bind mounts, private process view, optional network namespace, seccomp support. | Bubblewrap is a construction kit, not a complete policy. Bad bind mounts mean bad isolation. |
| Containers | Repeatable environment, filesystem boundary, disposable state, easier dependency control. | Host networking, broad volume mounts, Docker socket mounts, and GPU passthrough weaken the boundary. |
| VM | Stronger isolation and easier reset. | More friction, but appropriate for malware-ish repos, untrusted model code, and unknown build systems. |

## Bubblewrap Pattern

Bubblewrap is useful because it can wrap a normal CLI without forcing a full container workflow. It creates Linux namespaces and lets you decide exactly what the process can see.

The minimum useful pattern for an AI coding agent is:

- Bind the target repo read-write.
- Bind system binaries and libraries read-only.
- Do not bind the full home directory.
- Provide an empty or minimal `$HOME`.
- Mount `/tmp` as tmpfs.
- Use a new PID namespace and session.
- Disable network unless the task explicitly needs it.
- Never expose SSH agents, cloud credential directories, browser profiles, or `.env` files by default.

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
  --setenv HOME /home/agent \
  --bind "$PWD" "$PWD" \
  --chdir "$PWD" \
  --unshare-pid \
  --unshare-ipc \
  --unshare-net \
  --new-session \
  bash
```

That keeps the feel close to normal local development, but it is still only as good as the mounts and namespaces you choose.

## Example Isolation Paths

These are not maturity levels. They are patterns you can mix.

| Path | What it feels like | What it demonstrates |
| --- | --- | --- |
| Worktree only | Normal local dev | Keeps agent changes separate from your active branch. Good for reviewability, not a security boundary. |
| Separate OS user | Mostly normal local dev | Removes default access to your home directory, shell history, SSH keys, browser profile, and cloud configs. |
| bubblewrap | Local CLI with narrower filesystem/network view | Shows how much you can contain without building a full image. Good for quick experiments. |
| Dev container | Familiar IDE/container workflow | Gives repeatable dependencies and a clearer filesystem boundary. Useful for teams. |
| Docker/Podman one-shot container | Disposable shell | Good for running tests/builds without keeping state. Watch volume mounts and host networking. |
| VM | Most isolated, most friction | Best for untrusted repos, unknown build scripts, malware-ish samples, and experiments you want to revert. |

The core question is not "which sandbox is best?" It is "what does the agent actually need to touch for this task?"

## What You Can Constrain

The useful knobs are concrete:

| Surface | Examples of what can be constrained |
| --- | --- |
| Filesystem | Mount repo read-only or read-write, hide `$HOME`, expose only selected cache dirs, make `/tmp` disposable. |
| Network | No network, loopback only, DNS blocked, package registries only, proxy logged traffic. |
| Environment | Start with an empty env, pass only required vars, strip API keys and cloud tokens. |
| Credentials | Do not mount SSH agent, cloud config dirs, kubeconfig, browser profiles, password stores, or `.env` files. |
| Process view | New PID namespace, no visibility into host processes, no inherited tmux/socket access. |
| Package installs | Disable scripts where possible, use disposable caches, require approval for build hooks. |
| Tooling | Allow read/search tools broadly, gate shell/browser/MCP/cloud tools more carefully. |
| Persistence | Disposable home, no shell profile writes, no git hook writes without review. |
| Audit | Save commands, diffs, tool calls, network logs, and final patch. |

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
  --setenv HOME /home/agent \
  --ro-bind "$PWD" "$PWD" \
  --chdir "$PWD" \
  --unshare-pid \
  --unshare-ipc \
  --unshare-net \
  --new-session \
  bash
```

What this shows: the repo is visible but not writable, `$HOME` is empty, and the shell has no network namespace except loopback.

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
  --setenv HOME /home/agent \
  --bind "$PWD" "$PWD" \
  --chdir "$PWD" \
  --unshare-pid \
  --unshare-ipc \
  --unshare-net \
  --new-session \
  bash
```

What this shows: the agent can write to the repo, but not to your actual dotfiles, shell history, credential stores, or browser profile.

### Container with explicit mounts

Useful when dependencies matter more than transparent local filesystem access.

```bash
docker run --rm -it \
  --network none \
  -v "$PWD":/workspace \
  -w /workspace \
  -e HOME=/tmp/home \
  node:22-bookworm \
  bash
```

What this shows: the container sees the project and can run local commands, but it does not get network access or your normal home directory. Add mounts deliberately if a task needs cache directories.

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
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GITHUB_TOKEN`, `HF_TOKEN`, `AWS_*`, `AZURE_*`, `GOOGLE_*`

The path is not always "block forever." Sometimes the right answer is a scoped token, temporary environment variable, read-only credential, or a throwaway account. The point is to make that access explicit.

## Package Manager Risk Examples

Package managers are tool execution systems.

| Ecosystem | Example risk | Possible control |
| --- | --- | --- |
| Node | `preinstall`, `install`, `postinstall`, `prepare` scripts | Use lockfiles, consider `--ignore-scripts`, install in a disposable container. |
| Python | `setup.py`, PEP 517 build backends, native extension builds | Prefer wheels from trusted indexes, use a disposable venv/container, avoid secrets during install. |
| Rust | `build.rs` runs during build | Build in a container or separate user when reviewing unfamiliar crates. |
| Go | Tests and generators can execute arbitrary code | Separate code review from `go test`; run tests with scoped network/filesystem. |
| Containers | Dockerfiles can fetch and run arbitrary build steps | Build without secrets, review Dockerfile, avoid mounting Docker socket into agent environments. |

## Network Examples

Network access is not binary. Possible shapes:

- No network for code reading, local edits, and many test runs.
- Temporary network for documentation lookup.
- Temporary network for package install, then turn it off.
- Proxy network access to log destinations.
- Allow only loopback when the agent needs to test a local service.

DNS matters too. If a process can resolve arbitrary domains, it has a low-bandwidth exfiltration path. That may not matter for a toy repo. It matters if secrets or proprietary code are present.

## MCP And Browser Tooling

MCP servers and browser tools are where "agent can code" turns into "agent can operate my accounts."

Examples of things worth separating:

- Filesystem MCP pointed only at the repo, not the full home directory.
- GitHub MCP scoped to one repo or org where possible.
- Browser automation with a throwaway profile instead of your daily browser profile.
- Slack/Jira/Linear tools with clear approval before posting or modifying state.
- Cloud tools with read-only or lab credentials instead of production credentials.

This is why I like thinking in surfaces. A browser, shell, GitHub token, and cloud CLI are four different trust decisions.

## Codex And Claude Code

Use the native controls first because they are where the agent loop already understands approvals and tool use.

For Codex:

- Treat approval modes as the first gate for file edits and shell commands.
- Use the documented sandboxing and agent approval/security settings when available.
- Do not run broad autonomous sessions from a shell that has production credentials loaded.
- Prefer a clean repo/worktree and a minimal environment.

For Claude Code:

- Use permission rules to deny secrets, risky commands, and untrusted MCP servers.
- Use sandboxed Bash or dev containers for more autonomous runs.
- Use managed settings for team policy when this is more than a personal workstation.
- Treat Chrome, MCP, Slack, GitHub, and cloud integrations as separate tool surfaces, not just conveniences.

Native controls are not a reason to skip OS isolation. They are a reason to make isolation usable.

## opencode-containment

[`opencode-containment`](https://github.com/christian-taillon/opencode-containment) is my experiment in reducing blast radius by adding isolation and boundaries around the interactive agent harness itself.

It is not trying to replace agent permission systems, approval rules, or model/tool configuration. Those controls matter, but they are handled elsewhere. This project focuses on runtime containment for a human-operated development workflow: preserve the normal terminal-driven experience while reducing unnecessary access to host files, credentials, environment state, and process boundaries where practical.

The design target is specific:

- Keep the fast local workflow.
- Avoid making every command feel like a remote dev container.
- Add containment where the risk actually is: filesystem scope, environment variables, credentials, network, process isolation, and auditability.
- Make the safe path feel normal enough that I actually use it.

This is not a claim that isolation is solved. It is a practical attempt to make secure defaults less annoying.

## How I Think About The Path

I do not want one rigid policy for everyone. I want more people to see the menu of controls and pick the least annoying set that matches the work.

For a personal blog repo, a worktree and normal approvals may be enough. For an unfamiliar dependency tree, I may want no secrets and no network. For malware-ish code or unknown build systems, I want a disposable VM. For day-to-day coding, I want something closer to `opencode-containment`: keep the workflow fast, but remove accidental access to the parts of my machine the agent does not need.

## Sources

- [bubblewrap README](https://github.com/containers/bubblewrap)
- [OpenAI Codex CLI](https://developers.openai.com/codex/cli)
- [OpenAI Codex sandboxing docs](https://developers.openai.com/codex/concepts/sandboxing)
- [OpenAI Codex agent approvals and security](https://developers.openai.com/codex/agent-approvals-security)
- [Claude Code permissions](https://code.claude.com/docs/en/permissions.md)
- [Claude Code sandbox environments](https://code.claude.com/docs/en/sandbox-environments.md)
- [Claude Code sandboxed Bash](https://code.claude.com/docs/en/sandboxing.md)
- [Claude Code secure deployment](https://code.claude.com/docs/en/agent-sdk/secure-deployment.md)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
