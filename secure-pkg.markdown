---
layout: page
title: Secure Package Management
description: Hardening NPM and Python dependencies against supply chain attacks. Protect your builds from malicious packages and maintainers.
permalink: /secure-pkg/
---

<style>
  .pkg-hero {
    --card-accent: #fcc624;
    background: #f8f9fa;
    color: #333;
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 30px;
    border: 1px solid #e9ecef;
    border-top: 4px solid var(--card-accent);
    border-left: 4px solid var(--card-accent);
    box-shadow: 0 18px 36px rgba(0,0,0,0.22);
  }
  .pkg-hero h1 {
    color: #333;
    margin-bottom: 15px;
    font-size: 2.5rem;
  }
  .pkg-hero p {
    color: #555;
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
  }
  .pkg-hero .hero-subnote {
    margin-top: 18px;
    color: #333;
    font-size: 0.98rem;
    font-weight: 600;
  }
  .attack-timeline {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 30px;
    margin: 40px 0;
    border: 1px solid #e9ecef;
  }
  .attack-timeline h2 {
    color: #333;
    border-bottom: 2px solid #fcc624;
    padding-bottom: 15px;
    margin-top: 0;
  }
  .attack-item {
    --card-accent: #dc3545;
    background: #ffffff;
    padding: 20px;
    border-radius: 16px;
    margin: 15px 0;
    border: 1px solid color-mix(in srgb, var(--card-accent) 22%, #d9dfe6);
    border-top: 4px solid var(--card-accent);
    border-left: 4px solid var(--card-accent);
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    box-shadow: 0 12px 28px -6px color-mix(in srgb, var(--card-accent) 30%, rgba(0,0,0,0.12));
    transform: translateY(-2px);
  }
  .attack-item:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 38px -8px color-mix(in srgb, var(--card-accent) 45%, rgba(0,0,0,0.18));
    border-color: color-mix(in srgb, var(--card-accent) 55%, #cfd6de);
  }
  .attack-item .date {
    color: #dc3545;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
  .attack-item .name {
    color: #333;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
  .attack-item .impact {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .section-divider {
    height: 2px;
    background: linear-gradient(to right, transparent, #fcc624, transparent);
    margin: 50px 0;
    border: none;
  }
  .code-block {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #e9ecef;
    overflow-x: auto;
  }
  .code-block h3 {
    color: #333;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
  .code-block pre {
    margin: 0;
    color: #333;
  }
  .code-block code {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #28a745;
  }
  .note-box {
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 15px 20px;
    border-radius: 8px;
    margin: 20px 0;
    color: #333;
  }
  .note-box strong {
    color: #333;
  }
  .note-box p {
    margin: 0;
    line-height: 1.6;
  }
  .notice-box-critical {
    background: #fff4d6;
    border-left: 4px solid #dc3545;
    border-top: 4px solid #dc3545;
    padding: 18px 20px;
    border-radius: 12px;
    margin: 24px 0 30px;
    color: #333;
    box-shadow: 0 14px 28px rgba(0,0,0,0.08);
  }
  .notice-box-critical h2 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
    font-size: 1.25rem;
  }
  .notice-box-critical p,
  .notice-box-critical ul {
    margin: 12px 0;
    line-height: 1.7;
  }
  .notice-box-critical .pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
  }
  .notice-box-critical .pill-link {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 50px;
    text-decoration: none !important;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid var(--theme-color, #dc3545);
    color: var(--theme-color, #dc3545) !important;
    background: white;
  }
  .notice-box-critical .pill-link:hover {
    background-color: var(--theme-color, #dc3545);
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  .content-section {
    margin: 30px 0;
  }
  .content-section h2 {
    color: #333;
    border-bottom: 2px solid #fcc624;
    padding-bottom: 10px;
    margin-top: 40px;
  }
  .content-section h3 {
    color: #333;
    margin-top: 25px;
  }
  .content-section h4 {
    color: #555;
    margin-top: 20px;
    font-weight: 600;
  }
  .content-section p {
    color: #333;
    line-height: 1.7;
    margin: 15px 0;
  }
  .content-section ul, .content-section ol {
    color: #333;
    line-height: 1.7;
  }
  .content-section li {
    margin: 10px 0;
  }
</style>

<div class="pkg-hero">
  <h1>Secure Package Management</h1>
  <p>Hardening NPM and Python dependencies against supply chain attacks. Protect your builds from malicious packages and compromised maintainers.</p>
  <p class="hero-subnote">Most of this is free and straightforward: lockfiles, package-manager policy, and stricter install settings can materially reduce risk without buying an expensive vendor platform.</p>
</div>

<div class="notice-box-critical">
  <h2>Recent Notice: Axios npm compromise</h2>
  <p>Axios maintainers confirmed that <code>axios@1.14.1</code> and <code>axios@0.30.4</code> were malicious npm releases published through a compromised maintainer account on March 31, 2026. Those versions pulled in <code>plain-crypto-js</code> and were live for roughly three hours before removal.</p>
  <p>If your lockfile or install logs show either affected Axios version or <code>plain-crypto-js</code>, treat that workstation or CI runner as potentially compromised, not merely out of date.</p>
  <div class="code-block">
    <h3>Quick Check</h3>
    <pre><code>grep -E "axios@(1\\.14\\.1|0\\.30\\.4)|plain-crypto-js" package-lock.json yarn.lock 2>/dev/null</code></pre>
  </div>
  <ul>
    <li>Downgrade or repin to <code>axios@1.14.0</code> or <code>axios@0.30.3</code>.</li>
    <li>Remove <code>node_modules/plain-crypto-js/</code> and reinstall from a known-good lockfile.</li>
    <li>Rotate credentials, tokens, and secrets exposed to that machine or CI job.</li>
    <li>Review network and EDR telemetry for connections to <code>sfrclak[.]com</code> or <code>142.11.206.73:8000</code>.</li>
    <li>Prefer delaying newly published packages in CI and on developer workstations so short-lived malicious releases are less likely to land.</li>
  </ul>
  <p>This repository's current <code>package-lock.json</code> has an empty <code>packages</code> object and does not show an Axios install, but the broader guidance still matters for any Node environment you operate elsewhere.</p>
  <div class="pill-container">
    <a href="https://github.com/axios/axios/issues/10636" target="_blank" class="pill-link" style="--theme-color: #dc3545;">Axios Post-Mortem</a>
    <a href="https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan" target="_blank" class="pill-link" style="--theme-color: #dc3545;">StepSecurity Analysis</a>
    <a href="https://socket.dev/blog/axios-npm-package-compromised" target="_blank" class="pill-link" style="--theme-color: #dc3545;">Socket Analysis</a>
  </div>
</div>

<div class="attack-timeline">
  <h2>Notable Supply Chain Attacks</h2>
  <p style="color: #555; margin-bottom: 20px;">Real-world incidents that demonstrate why supply chain security is critical:</p>

  <div class="attack-item" style="--card-accent: #dc3545;">
    <div class="date">March 31, 2026</div>
    <div class="name">Axios npm compromise</div>
    <div class="impact">Compromised maintainer account led to malicious publication of <code>axios@1.14.1</code> and <code>axios@0.30.4</code>, which pulled in <code>plain-crypto-js</code> and dropped a cross-platform trojan. <a href="https://github.com/axios/axios/issues/10636">Post-mortem</a></div>
  </div>
  
  <div class="attack-item">
    <div class="date">Late February to March 2026</div>
    <div class="name">TeamPCP Supply Chain</div>
    <div class="impact">Multi-stage campaign targeting Trivy, KICS, LiteLLM, and Telnyx via compromised maintainers.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">August to October 2025</div>
    <div class="name">PhantomRaven npm</div>
    <div class="impact">126 typosquatted packages, 86,000+ downloads targeting developer credentials.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">Late November 2025</div>
    <div class="name">Shai-Hulud 2.0</div>
    <div class="impact">796 packages compromised, 25,000+ repositories affected.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">September 2025</div>
    <div class="name">Shai-Hulud npm Worm</div>
    <div class="impact">Self-replicating worm compromised hundreds of npm packages starting around September 14.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">September 8, 2025</div>
    <div class="name">Chalk/Debug</div>
    <div class="impact">18 high-download packages compromised, live for approximately two hours.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">August 26 to 27, 2025</div>
    <div class="name">Nx Attack</div>
    <div class="impact">Malicious versions published, secrets exfiltrated rapidly within 24 hours.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">March 29, 2024 (Discovered)</div>
    <div class="name">xz Utils Backdoor</div>
    <div class="impact">Multi-year maintainer infiltration, backdoor inserted in releases 5.6.0 and 5.6.1 (February to March 2024). <a href="https://www.openwall.com/lists/oss-security/2024/03/29/4">Disclosure</a></div>
  </div>
  
  <div class="attack-item">
    <div class="date">January 31 to April 1, 2021</div>
    <div class="name">Codecov</div>
    <div class="impact">Bash uploader backdoored, undetected for just over two months.</div>
  </div>
  
  <div class="attack-item">
    <div class="date">2018</div>
    <div class="name">EventStream</div>
    <div class="impact">Malicious dependency chain led to cryptocurrency theft attempts via compromised maintainer.</div>
  </div>
</div>

<hr class="section-divider">

<div class="content-section">
  <h2>Hardening NPM and Python Dependencies: Mitigating Supply Chain Attacks</h2>
  
  <p>Open-source supply chain attacks are a significant and evolving threat to modern software development. Attackers frequently target build tools and local developer environments rather than waiting to exploit application code in production. By compromising maintainer accounts, using typosquatting, or exploiting dependency confusion, malicious code is injected directly into public registries.</p>
  
<p>In both NPM and PyPI, the risky path is any install flow that executes dependency-controlled code: Node lifecycle scripts such as <code>preinstall</code> and <code>postinstall</code>, and Python source builds that invoke PEP 517 backends or legacy <code>setup.py</code>. This includes npm lifecycle hooks such as preinstall, install, and postinstall. Dependency install and build scripts execute arbitrary code with developer or CI privileges. These scripts typically have access to developer secrets, CI tokens, and internal package infrastructure.</p>
  
<p>Effective hardening combines strict lockfiles, delayed adoption of newly published releases, explicit approval of dependency install and build scripts, and extra isolation for higher-risk installs. Controls must be enforced in CI and shared config, not only local developer environments. These attacks typically result in credential theft, CI compromise, or unauthorized package publishing.</p>

  <h3>1. JavaScript/TypeScript: Using pnpm</h3>
  
  <p><code>pnpm</code> v10 is a strong default for Node projects because dependency lifecycle scripts are blocked unless you explicitly approve them. It also includes built-in controls for release-age delays, trusted build approvals, and blocking exotic transitive dependency sources. See the <a href="https://pnpm.io/supply-chain-security">pnpm supply chain security guide</a> and the <a href="https://pnpm.io/settings">settings reference</a>.</p>
  
  <h4>Action: Commit a pnpm Policy to the Repository</h4>
  
  <p>Keep the security policy in <code>pnpm-workspace.yaml</code> so developers and CI runners enforce the same rules.</p>
  
  <div class="code-block">
    <h3>Enable pnpm and Migrate Project</h3>
    <pre><code># Enable pnpm via Corepack (Node.js 16.17+)
corepack enable pnpm

# Migrate an existing project
rm -rf node_modules package-lock.json
pnpm import  # Generates pnpm-lock.yaml</code></pre>
  </div>
  
  <div class="code-block">
    <h3>Project Security Policy (pnpm-workspace.yaml)</h3>
    <pre><code># Delay adoption of brand-new releases
minimumReleaseAge: 1440

# Block git/tarball transitive dependencies
blockExoticSubdeps: true

# Fail installs when unreviewed dependency install and build scripts appear
strictDepBuilds: true

# Approve only the dependency builds you trust
allowBuilds:
  esbuild: true

# Optional when your workflow supports pnpm trust signals
# trustPolicy: no-downgrade</code></pre>
  </div>
  
  <div class="note-box">
    <strong>Approving dependency install and build scripts:</strong> Use <code>pnpm approve-builds</code> to review pending scripts, then commit the resulting <code>allowBuilds</code> policy. Avoid relying on global <code>ignore-scripts=true</code> as the main pnpm workflow in v10; it is broader than necessary and also disables your project's own scripts.
  </div>

  <h3>2. Python: Using uv</h3>
  
  <p>Standard <code>pip</code> workflows can execute arbitrary code when an installation falls back to a source distribution. That execution path now commonly runs through PEP 517 build backends, not just legacy <code>setup.py</code> files.</p>
  
  <p><code>uv</code> is a fast Python package installer and resolver that acts as a drop-in replacement for <code>pip</code>. It simplifies dependency locking and strongly prefers wheels, but a high-trust workflow should still refuse source builds unless you explicitly allow them. See the <a href="https://docs.astral.sh/uv/pip/compile/">uv compile guide</a> and the <a href="https://docs.astral.sh/uv/reference/cli/#uv-pip-sync">uv CLI reference</a>.</p>
  
  <h4>Action: Enforce Hashed, Wheel-Only Installs</h4>
  
  <p>For the strictest workflow, combine hash enforcement with <code>--no-build</code> so the install fails rather than building from an sdist.</p>
  
  <div class="code-block">
    <h3>Install uv</h3>
    <pre><code># Install uv (Mac/Linux)
curl -LsSf https://astral.sh/uv/install.sh | sh</code></pre>
  </div>
  
  <h4>Workflow for Secure Python Management</h4>
  
  <div class="code-block">
    <h3>Virtual Environment and Lockfile</h3>
    <pre><code># Create an isolated virtual environment
uv venv
source .venv/bin/activate

# Generate a strictly hashed lockfile
# Input: requirements.in (e.g., requests==2.31.0)
uv pip compile requirements.in --generate-hashes -o requirements.txt

# Install exactly what is locked
# --require-hashes rejects unhashed entries
# --no-build fails if a wheel is unavailable and a source build would be required
uv pip sync requirements.txt --require-hashes --no-build</code></pre>
  </div>
  
  <p>Instead of relying on a loose <code>requirements.txt</code>, use <code>uv pip compile</code> to lock exact versions and their cryptographic hashes. If a package is altered in PyPI without a version bump, the hash check will fail and the installation will be blocked. If a dependency is only available as an sdist, treat it as an exception and isolate that install path deliberately.</p>

  <h3>3. Dedicated Linux Isolation with bubblewrap</h3>
  
  <p>For Linux users, <code>bubblewrap</code> (<code>bwrap</code>) adds an extra boundary between install-time code and your workstation. The goal is to expose only the project directory and the cache or store paths you need, while hiding the rest of your real home directory from package scripts.</p>
  
  <p>This is an advanced defense, not a transparent replacement for every install command. It is most useful for higher-risk dependency reviews, or for strict installs that already run from a warm cache or controlled internal registry.</p>
  
  <div class="code-block">
    <h3>Example Wrapper (~/bin/safe-install)</h3>
    <pre><code>#!/bin/bash
set -eu

bwrap \
  --ro-bind /usr /usr \
  --ro-bind /bin /bin \
  --ro-bind /lib /lib \
  --ro-bind /lib64 /lib64 \
  --ro-bind /etc /etc \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --dir /work \
  --bind "$PWD" /work \
  --chdir /work \
  --dir /sandbox-home \
  --dir /sandbox-home/.cache \
  --dir /sandbox-home/.local \
  --dir /sandbox-home/.local/share \
  --dir /sandbox-home/.local/share/pnpm \
  --setenv HOME /sandbox-home \
  --setenv XDG_CACHE_HOME /sandbox-home/.cache \
  --ro-bind-try "$HOME/.cache/uv" /sandbox-home/.cache/uv \
  --ro-bind-try "$HOME/.cache/pnpm" /sandbox-home/.cache/pnpm \
  --ro-bind-try "$HOME/.local/share/pnpm/store" /sandbox-home/.local/share/pnpm/store \
  --unshare-ipc \
  --unshare-pid \
  --new-session \
  "$@"</code></pre>
  </div>
  
  <div class="code-block">
    <h3>Usage</h3>
    <pre><code>safe-install uv pip sync requirements.txt --require-hashes --no-build
# or
safe-install pnpm install --frozen-lockfile</code></pre>
  </div>

  <div class="note-box">
    <strong>Network caveat:</strong> Add <code>--unshare-net</code> only when you already have a warm cache or an internal mirror reachable inside the sandbox. Otherwise dependency resolution and downloads will fail. For normal online installs, bubblewrap reduces host exposure but does not replace your package manager policy.
  </div>

  <h3>4. Scaling to Enterprise Environments (CI/CD)</h3>
  
  <p>Securing local developer machines is only part of the process; build pipelines require the same level of strictness.</p>
  
  <h4>Proxy Registries</h4>
  
  <p>Avoid pulling directly from public registries like <code>npmjs.org</code> or <code>pypi.org</code> in CI pipelines.</p>
  
  <ul>
    <li>Route traffic through a private artifact proxy (e.g., JFrog Artifactory, Sonatype Nexus).</li>
    <li>Enable quarantine policies on the proxy to automatically block packages with low reputation scores or newly published versions, effectively enforcing a network-wide release delay.</li>
  </ul>
  
  <h4>Enforce Configurations in CI Pipelines</h4>
  
  <div class="code-block">
    <h3>GitHub Action: Enforcing uv Hashes and Wheel-Only Installs</h3>
    <pre><code>steps:
  - uses: actions/checkout@v4
  - name: Install uv
    uses: astral-sh/setup-uv@v2
  - name: Install dependencies strictly
    run: uv pip sync requirements.txt --require-hashes --no-build</code></pre>
  </div>
  
  <div class="code-block">
    <h3>GitHub Action: Enforcing pnpm Policy</h3>
    <pre><code>steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v3
    with:
      version: 10
  - name: Install with committed policy
    run: pnpm install --frozen-lockfile</code></pre>
  </div>
  
  <hr class="section-divider">
  
  <h2>Summary</h2>
  
  <p>Supply chain attacks exploit default configurations and implicit trust in package registries. Moving to <code>pnpm</code> with a committed build policy, using <code>uv</code> with hashed wheel-only installs, delaying newly published package versions, and adding optional Linux isolation with <code>bwrap</code> will significantly reduce exposure while preserving practical developer workflows.</p>
</div>
