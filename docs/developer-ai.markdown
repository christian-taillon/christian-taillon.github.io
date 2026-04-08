---
layout: page
title: "Developer AI: OpenCode Go vs Claude Plans"
description: "A practical comparison of OpenCode Go and Claude subscription tiers for developer workflows, including benchmark model mapping and 5-hour plan limits."
permalink: /glm5-vs-opus/
---

<style>
  .hero-card {
    --card-accent: #fcc624;
    background: #ffffff;
    color: #333333;
    padding: 36px;
    border-radius: 16px;
    box-shadow: 0 12px 28px -6px color-mix(in srgb, var(--card-accent) 30%, rgba(0,0,0,0.12));
    margin-bottom: 30px;
    border: 1px solid color-mix(in srgb, var(--card-accent) 22%, #d9dfe6);
    border-top: 4px solid var(--card-accent);
    border-left: 4px solid var(--card-accent);
  }
  .hero-card h1 {
    margin: 0 0 12px;
    color: #fcc624;
    font-size: 1.75rem;
  }
  .hero-card p {
    margin: 0;
    color: #555555;
    line-height: 1.6;
    max-width: 900px;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }
  .info-card,
  .section-card {
    --card-accent: #fcc624;
    background: #ffffff;
    border: 1px solid color-mix(in srgb, var(--card-accent) 22%, #d9dfe6);
    border-top: 4px solid var(--card-accent);
    border-left: 4px solid var(--card-accent);
    border-radius: 16px;
    padding: 22px;
    box-shadow: 0 12px 28px -6px color-mix(in srgb, var(--card-accent) 30%, rgba(0,0,0,0.12));
    margin-bottom: 24px;
  }
  .info-card h3,
  .section-card h2 {
    margin-top: 0;
    color: #333333;
  }
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #111111;
    margin: 8px 0;
  }
  .muted {
    color: #666666;
  }
  .bar-row {
    margin: 18px 0;
  }
  .bar-meta {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.95rem;
    margin-bottom: 6px;
    color: #333333;
  }
  .bar-track {
    height: 16px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.5s ease-in-out;
  }
  .two-col {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }
  .table-shell {
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: none;
    margin-top: 16px;
    overflow-x: auto;
  }
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 0.95rem;
    box-shadow: none;
    border: none;
    margin: 0;
  }
  .comparison-table th {
    text-align: left;
    color: #555555;
    padding: 12px 14px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    font-size: 0.9rem;
    line-height: 1.35;
    vertical-align: middle;
  }
  .comparison-table td {
    background: #ffffff;
    padding: 12px 14px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: middle;
    line-height: 1.45;
  }
  .comparison-table th,
  .comparison-table td {
    border-top: 0;
    border-left: 0;
    border-right: 1px solid #e2e8f0;
  }
  .comparison-table th:last-child,
  .comparison-table td:last-child {
    border-right: 0;
  }
  .comparison-table tbody tr:last-child td {
    border-bottom: 0;
  }
  .comparison-table td:first-child {
    font-weight: 600;
  }
  .comparison-table td:last-child {
    color: #475569;
    font-size: 0.92rem;
  }
  .aligned-readout-table {
    table-layout: fixed;
    min-width: 800px;
  }
  .aligned-readout-table col.plan-col { width: 16%; }
  .aligned-readout-table col.model-col { width: 17%; }
  .aligned-readout-table col.metric-col { width: 11%; }
  .aligned-readout-table col.limit-col { width: 12%; }
  .aligned-readout-table col.notes-col { width: 44%; }
  .aligned-readout-table td:nth-child(3),
  .aligned-readout-table td:nth-child(4) {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .aligned-readout-table td:nth-child(5) {
    text-wrap: pretty;
  }
  .callout {
    background: #f8fafc;
    border-radius: 14px;
    padding: 16px;
    color: #334155;
    margin-top: 16px;
  }
  .btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
  .btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #ffffff;
    color: #334155;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
  }
  .btn:hover {
    background: #f1f5f9;
  }
  .btn.active {
    background: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
  }
  .chart-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
  }
  .chart-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
  .chart-subtitle {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 16px;
  }
  .anthropic-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;
    border-radius: 999px;
    background: #0f172a;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    margin-left: 6px;
    vertical-align: middle;
  }
</style>

<div class="hero-card">
  <h1>Developer AI: OpenCode Go vs Claude Plans</h1>
  <p>
    This page compares subscription throughput and benchmark model mapping for developer-focused AI usage. The key distinction is simple: plan limits describe usable volume, while benchmark rows describe model capability. For this comparison, OpenCode Go is mapped to <strong>GLM-5.1</strong> and Claude Pro / Claude Max are mapped to <strong>Claude Opus 4.6</strong>.
  </p>
</div>

<div class="stats-grid">
  <div class="info-card">
    <h3>OpenCode Go vs Claude Pro</h3>
    <div class="stat-value">~19.6x</div>
    <p class="muted">Raw 5-hour capacity advantage based on 880 requests vs 45 typical messages.</p>
  </div>
  <div class="info-card">
    <h3>Requests Per Dollar</h3>
    <div class="stat-value">~39.1x</div>
    <p class="muted">OpenCode Go vs Claude Pro on simple throughput efficiency.</p>
  </div>
  <div class="info-card">
    <h3>Claude Max Uplift</h3>
    <div class="stat-value">~20.0x</div>
    <p class="muted">Estimated improvement of Claude Max 20x over Claude Pro in the same 5-hour window.</p>
  </div>
</div>

<div class="section-card">
  <h2>Plan Overview & 5-Hour Limits</h2>
  <ul style="color: #555555; line-height: 1.8; margin-top: 16px; margin-bottom: 0; padding-left: 20px;">
    <li><strong style="color: #1e293b;">OpenCode Go $10:</strong> <strong>880</strong> requests per 5 hours (fixed request cap). Benchmark mapped to <strong>GLM-5.1</strong>.</li>
    <li><strong style="color: #1e293b;">Claude Pro $20:</strong> <strong>~45</strong> typical messages per 5 hours (range: ~35 to ~60). Benchmark mapped to <strong>Claude Opus 4.6</strong>.</li>
    <li><strong style="color: #1e293b;">Claude Max 20x $200:</strong> <strong>~900</strong> estimated 5-hour capacity (approx. range: 700 to 1,200). Benchmark mapped to <strong>Claude Opus 4.6</strong>.</li>
  </ul>
</div>

<div class="section-card">
  <h2>Direct Visualization</h2>
  <p class="muted">Raw 5-hour plan capacity only.</p>

  <div class="bar-row">
    <div class="bar-meta">
      <span>OpenCode Go $10 <span class="muted">(GLM-5.1)</span></span>
      <span>880 / 5h</span>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width: 97.8%; background: #0f172a;"></div></div>
  </div>

  <div class="bar-row">
    <div class="bar-meta">
      <span>Claude Pro $20 <span class="muted">(Claude Opus 4.6 <span class="anthropic-badge">A</span>)</span></span>
      <span>~45 / 5h</span>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width: 5%; background: #334155;"></div></div>
  </div>

  <div class="bar-row">
    <div class="bar-meta">
      <span>Claude Max 20x $200 <span class="muted">(Claude Opus 4.6 <span class="anthropic-badge">A</span>)</span></span>
      <span>~900 / 5h</span>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width: 100%; background: #64748b;"></div></div>
  </div>
</div>

<div class="two-col">
  <div class="section-card">
    <h2>Deterministic vs dynamic limits</h2>
    <div style="margin-top: 16px;">
      <strong>OpenCode Go plan</strong>
      <p class="muted" style="margin-top: 4px;">OpenCode Go uses a fixed request cap, so throughput is straightforward to reason about.</p>
    </div>
    <div style="margin-top: 16px;">
      <strong>Claude plans</strong>
      <p class="muted" style="margin-top: 4px;">Claude plans are compute-budget based. Long chats, file uploads, and peak hours reduce usable throughput.</p>
    </div>
    <div class="callout">
      <strong>Takeaway:</strong> The plan comparison is about limits. The benchmark comparison is about model capability.
    </div>
  </div>

  <div class="section-card">
    <h2>Throughput vs quality per interaction</h2>
    <div style="margin-top: 16px;">
      <strong>OpenCode Go plan</strong>
      <p class="muted" style="margin-top: 4px;">OpenCode Go is tuned for higher-volume usage and sustained request flow.</p>
    </div>
    <div style="margin-top: 16px;">
      <strong>Claude plans</strong>
      <p class="muted" style="margin-top: 4px;">Claude plans trade volume for deeper single interactions and larger context usage.</p>
    </div>
    <div class="callout">
      <strong>Takeaway:</strong> Comparable intelligence does not mean comparable value when one side is heavily rate-limited.
    </div>
  </div>
</div>

<div class="section-card">
  <h2>Benchmark scores vs limits</h2>
  <p class="muted">Benchmarks below are model benchmarks. Plan limits are shown separately for the three subscription tiers in the same 5-hour window.</p>
  
  <div style="margin-top: 24px;">
    <div class="btn-group" id="category-buttons">
      <!-- Generated via JS -->
    </div>
    <div class="btn-group" id="metric-buttons">
      <!-- Generated via JS -->
    </div>
  </div>

  <div style="margin-top: 24px;">
    <div class="chart-card">
      <div class="chart-title">Benchmark comparison by model</div>
      <div class="chart-subtitle" id="current-metric-label">Loading...</div>
      <div id="benchmark-bars" class="space-y-4">
        <!-- Generated via JS -->
      </div>
    </div>
  </div>
</div>

<div class="section-card">
  <h2>Bottom line</h2>
  <p style="font-weight: 500; color: #1e293b;">Open-weight models like GLM-5.1 are approaching or matching frontier model intelligence while operating at dramatically lower cost.</p>
  <p class="muted" style="margin-top: 12px;">This results in significantly higher usable throughput and better cost efficiency compared to closed frontier model subscriptions.</p>
  <div class="callout" style="font-weight: 500; color: #0f172a;">
    Key takeaway: Open-weight models are winning on value. Comparable intelligence + massively better throughput = superior cost-performance.
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const benchmarkGroups = {
    coding: {
      label: "Coding",
      metrics: [
        {
          name: "Terminal-Bench 2.0 Terminus-2",
          values: { "GLM-5.1": 63.5, "GLM-5": 56.2, "Claude Opus 4.6": 65.4, "Claude Sonnet 4.6": 59.1, "Claude Sonnet 4.5": 51.0, "Gemini 3.1 Pro": 68.5, "Kimi K2.5": 50.8 }
        },
        {
          name: "CyberGym",
          values: { "GLM-5.1": 68.7, "GLM-5": 48.3, "Claude Opus 4.6": 66.6, "Claude Sonnet 4.6": 65.2, "Claude Sonnet 4.5": 29.8, "Kimi K2.5": 41.3 }
        },
        {
          name: "SWE-Bench Pro",
          values: { "GLM-5.1": 58.4, "GLM-5": 55.1, "GPT-5.4": 57.7, "Claude Opus 4.6": 57.3, "Gemini 3.1 Pro": 54.2, "Kimi K2.5": 53.8, "MiniMax M2.7": 56.2 }
        },
        {
          name: "NL2Repo",
          values: { "GLM-5.1": 42.7, "GLM-5": 35.9, "GPT-5.4": 41.3, "Claude Opus 4.6": 49.8, "Gemini 3.1 Pro": 33.4, "Kimi K2.5": 32.0, "MiniMax M2.7": 39.8 }
        }
      ]
    },
    reasoning: {
      label: "Reasoning",
      metrics: [
        {
          name: "HLE",
          values: { "GLM-5.1": 31.0, "GLM-5": 30.5, "GPT-5.4": 39.8, "Claude Opus 4.6": 36.7, "Gemini 3.1 Pro": 45.0, "Kimi K2.5": 31.5, "MiniMax M2.7": 28.0 }
        },
        {
          name: "GPQA-Diamond",
          values: { "GLM-5.1": 86.2, "GLM-5": 86.0, "GPT-5.4": 92.0, "Claude Opus 4.6": 91.3, "Claude Sonnet 4.6": 89.9, "Claude Sonnet 4.5": 83.4, "Gemini 3.1 Pro": 94.3, "Kimi K2.5": 87.6, "MiniMax M2.7": 87.0 }
        },
        {
          name: "AIME 2026",
          values: { "GLM-5.1": 95.3, "GLM-5": 95.4, "GPT-5.4": 98.7, "Claude Opus 4.6": 95.6, "Gemini 3.1 Pro": 98.2, "Kimi K2.5": 94.5, "MiniMax M2.7": 89.8 }
        }
      ]
    },
    agentic: {
      label: "Agentic",
      metrics: [
        {
          name: "BrowseComp",
          values: { "GLM-5.1": 68.0, "GLM-5": 62.0, "Claude Sonnet 4.6": 74.01, "Kimi K2.5": 60.6, "DeepSeek-V3.2": 51.4 }
        },
        {
          name: "MCP-Atlas Public Set",
          values: { "GLM-5.1": 71.8, "GLM-5": 69.2, "GPT-5.4": 67.2, "Claude Opus 4.6": 73.8, "Claude Sonnet 4.6": 61.3, "Claude Sonnet 4.5": 43.8, "Gemini 3.1 Pro": 69.2, "Kimi K2.5": 63.8, "MiniMax M2.7": 48.8, "Qwen3.6-Plus": 74.1, "DeepSeek-V3.2": 62.2 }
        }
      ]
    }
  };

  const plans = [
    { key: "opencode", name: "OpenCode Go $10", limit: 880, limitLabel: "880", model: "GLM-5.1", notes: "Fixed cap, benchmark mapping uses GLM-5.1" },
    { key: "claudePro", name: "Claude Pro $20", limit: 45, limitLabel: "~45", model: "Claude Opus 4.6", notes: "Variable, compute-budget based, benchmark row uses Claude Opus 4.6" },
    { key: "claudeMax20x", name: "Claude Max 20x $200", limit: 900, limitLabel: "~900", model: "Claude Opus 4.6", notes: "Estimated, variable, benchmark row uses Claude Opus 4.6" }
  ];

  const modelColors = {
    "GLM-5.1": "#0f172a",
    "Claude Opus 4.6": "#334155",
    "Claude Sonnet 4.6": "#334155",
    "Claude Sonnet 4.5": "#475569",
    "GPT-5.4": "#475569",
    "Gemini 3.1 Pro": "#64748b",
    "GLM-5": "#94a3b8"
  };

  const planColors = {
    "opencode": "#0f172a",
    "claudePro": "#334155",
    "claudeMax20x": "#64748b"
  };

  let currentCategory = "coding";
  let currentMetric = "Terminal-Bench 2.0 Terminus-2";

  const categoryContainer = document.getElementById("category-buttons");
  const metricContainer = document.getElementById("metric-buttons");
  const benchmarkBarsContainer = document.getElementById("benchmark-bars");
  const currentMetricLabel = document.getElementById("current-metric-label");

  function isAnthropicModel(modelName) {
    return modelName.startsWith("Claude ");
  }

  function getModelLabelHtml(modelName) {
    let html = `<span class="truncate">${modelName}</span>`;
    if (isAnthropicModel(modelName)) {
      html += `<span class="anthropic-badge" title="Anthropic">A</span>`;
    }
    return html;
  }

  function formatNumber(val) {
    if (val === null || val === undefined) return "N/A";
    return val;
  }

  function renderCategories() {
    categoryContainer.innerHTML = "";
    Object.keys(benchmarkGroups).forEach(key => {
      const btn = document.createElement("button");
      btn.className = `btn ${key === currentCategory ? "active" : ""}`;
      btn.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg> ${benchmarkGroups[key].label}</span>`;
      btn.onclick = () => {
        currentCategory = key;
        currentMetric = benchmarkGroups[key].metrics[0].name;
        renderAll();
      };
      categoryContainer.appendChild(btn);
    });
  }

  function renderMetrics() {
    metricContainer.innerHTML = "";
    benchmarkGroups[currentCategory].metrics.forEach(metric => {
      const btn = document.createElement("button");
      btn.className = `btn ${metric.name === currentMetric ? "active" : ""}`;
      btn.textContent = metric.name;
      btn.onclick = () => {
        currentMetric = metric.name;
        renderAll();
      };
      metricContainer.appendChild(btn);
    });
  }

  function renderData() {
    currentMetricLabel.textContent = currentMetric;

    const metricData = benchmarkGroups[currentCategory].metrics.find(m => m.name === currentMetric);
    if (!metricData) return;

    // Build Benchmark Bars
    const scores = Object.entries(metricData.values)
      .filter(([_, val]) => val !== null && val !== undefined)
      .sort((a, b) => b[1] - a[1]);
    
    const maxScore = Math.max(...scores.map(s => s[1]), 100);
    
    benchmarkBarsContainer.innerHTML = scores.map(([modelName, score]) => {
      const pct = (score / maxScore) * 100;
      const color = modelColors[modelName] || modelColors.default;
      return `
        <div class="bar-row" style="margin-bottom: 12px;">
          <div class="bar-meta">
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="width:12px; height:12px; border-radius:50%; background:${color}"></div>
              <div style="font-weight:500; color:#1e293b;">${getModelLabelHtml(modelName)}</div>
            </div>
            <div style="font-weight:600; color:#334155;">${score}</div>
          </div>
          <div class="bar-track" style="height:12px;">
            <div class="bar-fill" style="width: ${pct}%; background: ${color};"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderAll() {
    renderCategories();
    renderMetrics();
    renderData();
  }

  renderAll();
});
</script>
