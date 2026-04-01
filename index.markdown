---
layout: home
title: Christian Taillon 
description: Christian Taillon's resource hub for cybersecurity professionals. Expert guides on Splunk, threat hunting, AI security, and comprehensive information security tutorials.
image: /image/professional_circle.png
---

<style>
  .hero-card {
    background: #000000;
    color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.25);
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #1a1a1a;
  }
  .hero-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
    border-color: #fcc624;
  }
  .hero-text {
    flex: 1;
    min-width: 300px;
    margin-right: 20px;
  }
  .hero-text h2 {
    margin-top: 0;
    color: #fcc624;
    font-weight: 700;
    border-bottom: 2px solid #fcc624;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .hero-text p {
    font-size: 1.1rem;
    color: #e0e0e0;
    max-width: 600px;
    margin-bottom: 0;
  }
  .hero-btn {
    background-color: #fcc624;
    color: #000000 !important;
    padding: 12px 25px;
    border-radius: 30px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    white-space: nowrap;
  }
  .hero-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    background-color: #ffdb4d;
    text-decoration: none;
  }
  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }
  .resource-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-color: #fcc624;
  }
  .resource-card h3 {
    margin-top: 0;
    font-size: 1.25rem;
    color: #333;
    border-bottom: 2px solid #fcc624;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .resource-card p {
    flex-grow: 1;
    color: #555;
    margin-bottom: 20px;
  }
  
  /* Pill Styles */
  .pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;
  }
  .pill-link {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 50px;
    text-decoration: none !important;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid var(--theme-color, #007bff);
    color: var(--theme-color, #007bff) !important;
    background: white;
  }
  .pill-link:hover {
    background-color: var(--theme-color, #007bff);
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .span-full {
    grid-column: 1 / -1;
  }
  .domain-section {
    margin-top: 50px;
  }
  .domain-header {
    text-align: center;
    margin-bottom: 30px;
  }
</style>

<!-- Hero / Dark Roast Section -->
<div class="hero-card">
  <div class="hero-text">
    <h2>☕ Dark Roast Cyber LLC</h2>
    <p>My professional company website.</p>
  </div>
  <a href="https://darkroastcyber.io" target="_blank" class="hero-btn">Visit darkroastcyber.io &rarr;</a>
</div>

<h1 align="center">Welcome ☕</h1>

<div class="justify-text" align="justify">
  <p>We have a lot to protect and it is hard work. It is recommended that you brew a cup of coffee to enjoy while accessing this site. It dramatically improves the experience on the web. 😉</p>
  
  <p>In the rapidly evolving landscape of Cybersecurity, our work demands persistence, proactivity, and collaboration. I truly believe that you don’t need to work at the same company to be on the same team.</p>
</div>

<div style="text-align: center; margin: 30px 0;">
  <img src="/image/motivation.png" alt="Christian Taillon's motivation" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>

<div class="domain-section">
  <div class="domain-header">
    <h2>Knowledge Base & Resources</h2>
    <p>Explore the core domains of this site.</p>
  </div>

  <!-- ZDR Hero Card -->
  <div class="hero-card" style="border-color: #28a745;">
    <div class="hero-text">
      <h2>🔒 Zero Data Retention Endpoints</h2>
      <p>Real-time catalog of OpenRouter ZDR-compliant AI models that guarantee no data storage. Perfect for sensitive and confidential prompts.</p>
    </div>
    <a href="/zdr-endpoints/" class="hero-btn" style="background: #28a745;">View ZDR Models &rarr;</a>
  </div>
  
  <!-- Recent Resource Hero Card -->
  <div class="hero-card">
    <div class="hero-text">
      <h2>🤖 Latest: Mastering Agentic Prompting</h2>
      <p>Advanced techniques for building AI systems that can reason, plan, and execute complex tasks autonomously. Combining insights from Cerebras GLM 4.6 and Google Gemini 3.</p>
    </div>
    <a href="/agentic-prompting/" class="hero-btn">Explore Guide &rarr;</a>
  </div>
  
  <!-- Secure Package Management Hero Card -->
  <div class="hero-card">
    <div class="hero-text">
      <h2>Secure Package Management</h2>
      <p>Hardening NPM and Python dependencies against supply chain attacks. Protect your builds from Shai-Hulud, TeamPCP, and other emerging threats.</p>
    </div>
    <a href="/secure-pkg/" class="hero-btn">View Security Guide &rarr;</a>
  </div>
  
  <div class="resource-grid">
    <!-- Row 1: Spans Full Width -->
    <div class="resource-card span-full">
      <h3 style="color: #fcc624; border-bottom-color: #fcc624;">🛡️ Information Security</h3>
      <p>Comprehensive technical guides and cheatsheets for Splunk, LogScale, and KQL. Dive into rule creation with Sigma, YARA, and Snort/Suricata to build robust defenses.</p>
    </div>

    <!-- Row 2+ -->
    <div class="resource-card">
      <h3 style="color: #fcc624; border-bottom-color: #fcc624;">🐺 Threat Hunting & Intel</h3>
      <p>In-depth research on APTs and malware analysis. Strategies for proactive threat hunting, including deep dives into Qakbot and other adversaries.</p>
    </div>

    <div class="resource-card">
      <h3 style="color: #fcc624; border-bottom-color: #fcc624;">💻 Dev & Projects</h3>
      <p>A collection of scripts, tools, and open-source projects. From Python automation and Docker integrations to fun projects like ParetoPi.</p>
    </div>

    <div class="resource-card">
      <h3 style="color: #fcc624; border-bottom-color: #fcc624;">🤖 Machine Learning & AI</h3>
      <p>Navigating the intersection of AI and Security. Resources for securing LLMs, deploying local AI stacks, and building Agentic SOC architectures.</p>
    </div>

    <div class="resource-card">
      <h3 style="color: #fcc624; border-bottom-color: #fcc624;">🎓 Interview Resources</h3>
      <p>Guidance for professionals at every stage. Cheatsheets and interview prep for Security Engineering, SOC roles, and Threat Hunting positions.</p>
    </div>
  </div>
</div>

<br>
<hr>

<div style="margin-top: 40px;">
  <h3>Recent Highlights & Research</h3>
  <div class="resource-grid">
    
    <div class="resource-card">
        <h3 style="color: #d63384; border-bottom-color: #d63384;">🤖 DIY Agentic Security</h3>
        <p>Building your own security tools with AI. Guides on Agentic SOC architecture, LLM stacks, and pipelines.</p>
        <div class="pill-container">
            <a href="/agentic-soc" class="pill-link" style="--theme-color: #d63384;">Agentic SOC</a>
            <a href="/llm_stack" class="pill-link" style="--theme-color: #d63384;">LLM Stack</a>
            <a href="https://github.com/christian-taillon/open-webui-pipelines" target="_blank" class="pill-link" style="--theme-color: #d63384;">OpenWebUI Pipelines</a>
        </div>
    </div>

    <div class="resource-card">
        <h3 style="color: #fd7e14; border-bottom-color: #fd7e14;">🛡️ GenAI Inference Security</h3>
        <p>Protecting your AI infrastructure. Implementing guardrails for LLM inputs and outputs.</p>
        <div class="pill-container">
            <a href="/llama_guard" class="pill-link" style="--theme-color: #fd7e14;">Llama Guard</a>
            <a href="/token_guard" class="pill-link" style="--theme-color: #fd7e14;">Token Guard</a>
        </div>
    </div>

    <div class="resource-card">
        <h3 style="color: #0dcaf0; border-bottom-color: #0dcaf0;">💻 Secure Local Models</h3>
        <p>Best practices for running LLMs locally and securely on your own hardware.</p>
        <div class="pill-container">
            <a href="/models" class="pill-link" style="--theme-color: #0dcaf0;">Scanned Models</a>
            <a href="/llm_security" class="pill-link" style="--theme-color: #0dcaf0;">LLM Security</a>
            <a href="/vLLM" class="pill-link" style="--theme-color: #0dcaf0;">vLLM Guide</a>
        </div>
    </div>

    <div class="resource-card">
        <h3 style="color: #6610f2; border-bottom-color: #6610f2;">🦠 AutoIT Evasion & Malware</h3>
        <p>Research on detecting AutoIT malware and emulating evasion techniques.</p>
        <div class="pill-container">
            <a href="https://github.com/christian-taillon/detect-autoit" target="_blank" class="pill-link" style="--theme-color: #6610f2;">Detection (GitHub)</a>
            <a href="https://github.com/CroodSolutions/BypassIT/tree/main" target="_blank" class="pill-link" style="--theme-color: #6610f2;">Emulation (GitHub)</a>
        </div>
    </div>

    <div class="resource-card">
      <h3 style="color: #28a745; border-bottom-color: #28a745;">🌍 OpenWebUI Community</h3>
      <p>Check out my models, filters, and manifold pipes for the OpenWebUI community.</p>
      <div class="pill-container">
        <a href="https://openwebui.com/u/christiant/" target="_blank" class="pill-link" style="--theme-color: #28a745;">Visit Profile &rarr;</a>
      </div>
    </div>
    
    <div class="resource-card">
      <h3 style="color: #dc3545; border-bottom-color: #dc3545;">🌵 CactusCon 2025</h3>
      <p>Did you miss the event? Catch up on the materials and presentation decks.</p>
      <div class="pill-container">
        <a href="/cactuscon-2025" class="pill-link" style="--theme-color: #dc3545;">View Materials &rarr;</a>
      </div>
    </div>

  </div>
</div>

<br><br>

<div class="justify-text" align="justify">
  From the very start of my career, I have always found myself the beneficiary of those taking time to create collections of resources, cheatsheets, and guides for various technologies I've worked with. I want to do the same for others through this simple site.
</div>

<hr>

<div align="center">
  <p><b>Connect with me:</b></p>
  <div class="pill-container" style="justify-content: center;">
    <a href="/about/" class="pill-link" style="--theme-color: #333;">About Me</a>
    <a href="mailto:public@christiant.io" class="pill-link" style="--theme-color: #333;">public(AT)christiant.io</a>
    <a href="/download/publickey.public@christiant.io-579bc0994c9c8556e77d3bcb83bac562e20e6130.asc" class="pill-link" style="--theme-color: #333;">PGP Key</a>
  </div>
</div>