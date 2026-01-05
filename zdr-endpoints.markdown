---
layout: page
title: Zero Data Retention (ZDR) Endpoints
description: Live catalog of OpenRouter ZDR-compliant AI model endpoints that don't store your data
---

<style>
  .zdr-hero {
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    color: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 30px;
    border: 2px solid #28a745;
    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
  }
  .zdr-hero h1 {
    color: #28a745;
    margin-bottom: 15px;
    font-size: 2.5rem;
  }
  .zdr-hero p {
    color: #e0e0e0;
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
  }
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    margin-top: 20px;
    background: #1a1a1a;
    border: 1px solid #333;
  }
  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .loading { background: #28a745; }
  .error { background: #dc3545; }
  
  .zdr-info {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    border-left: 4px solid #28a745;
    margin-bottom: 30px;
  }
  .zdr-info h3 {
    color: #333;
    margin-top: 0;
  }
  
  .filter-bar {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
    border: 1px solid #e9ecef;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .filter-main-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    width: 100%;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .filter-group label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 700;
    color: #6c757d;
    margin-bottom: 0;
  }

  .filter-input, .filter-select {
    padding: 10px 12px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 0.95rem;
    width: 100%;
    height: 45px;
    background-color: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .filter-input:focus, .filter-select:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
  }

  .filter-sliders-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 15px;
    border-top: 1px solid #f1f3f5;
  }

  @media (max-width: 768px) {
    .filter-sliders-row {
      grid-template-columns: 1fr;
    }
  }

  .slider-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .slider-container {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
  }
  .slider {
    flex: 1;
    height: 8px;
    border-radius: 4px;
    background: #e9ecef;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #28a745;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .slider::-webkit-slider-thumb:hover {
    background: #218838;
    transform: scale(1.1);
  }
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #28a745;
    cursor: pointer;
    border: none;
    transition: background 0.2s ease, transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .slider::-moz-range-thumb:hover {
    background: #218838;
    transform: scale(1.1);
  }
  .slider-value {
    font-family: 'SF Mono', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    color: #28a745;
    min-width: 80px;
    text-align: right;
  }

  .filter-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    padding-top: 15px;
    border-top: 1px solid #f1f3f5;
  }

  .results-count {
    color: #6c757d;
    font-size: 0.9rem;
    font-style: italic;
  }

  .reset-btn {
    background: #fff;
    color: #dc3545;
    border: 1px solid #dc3545;
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .reset-btn:hover {
    background: #dc3545;
    color: white;
  }
  
  .endpoints-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
    margin-top: 30px;
  }

  .endpoint-card {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
    height: 100%;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }

  .endpoint-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
    border-color: #28a745;
  }

  .card-body {
    padding: 25px;
    flex: 1;
  }

  .provider-eyebrow {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 8px;
    display: block;
  }

  .endpoint-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.3;
    margin-bottom: 5px;
  }

  .endpoint-name a {
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .endpoint-name a:hover {
    color: #28a745;
  }

  .endpoint-id {
    font-family: 'SF Mono', 'Menlo', monospace;
    font-size: 0.8rem;
    color: #888;
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 20px;
  }

  .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .spec-item {
    font-size: 0.85rem;
    color: #555;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-bar {
    padding: 10px 25px;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .status-bar.cached {
    background: #fff3cd;
    color: #856404;
  }

  .status-bar.not-cached {
    background: #d4edda;
    color: #155724;
  }

  .cost-strip {
    background: #fcfcfc;
    border-top: 1px solid #eee;
    padding: 12px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cost-value {
    font-weight: 700;
    color: #333;
    font-size: 0.9rem;
  }

  .cost-label {
    font-size: 0.75rem;
    color: #888;
    text-transform: uppercase;
  }
  
  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 20px;
    border-radius: 10px;
    border-left: 4px solid #dc3545;
    text-align: center;
  }
  .refresh-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
  }
  .refresh-btn:hover {
    background: #218838;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
  }
  .no-results {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 1.1rem;
  }
  
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  .pagination-btn {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #e9ecef;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .pagination-btn:hover:not(:disabled) {
    background: #28a745;
    color: white;
    border-color: #28a745;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
  }
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .pagination-info {
    color: #666;
    font-size: 0.9rem;
    font-weight: 600;
  }
</style>

<div class="zdr-hero">
  <h1>🔒 Zero Data Retention (ZDR) Endpoints</h1>
  <p>Real-time catalog of OpenRouter endpoints that guarantee no data storage. Your prompts are processed and immediately forgotten.</p>
  <div class="status-badge">
    <div class="status-dot loading"></div>
    <span id="connection-status">Connecting to OpenRouter API...</span>
  </div>
</div>

<div class="zdr-info">
  <h3>🛡️ What is Zero Data Retention?</h3>
  <p><strong>ZDR-compliant endpoints</strong> process your AI requests without storing any data. This means:</p>
  <ul>
    <li>No prompt logging or training data usage</li>
    <li>No conversation history retention</li>
    <li>Maximum privacy for sensitive data</li>
    <li>Ideal for confidential business information, personal data, or sensitive research</li>
  </ul>
  <p><strong>Note on Caching:</strong> In-memory caching of prompts is typically not considered "retaining" data (or it is at least of a very different nature than organizations that log prompts, write them to databases, or even use them for additional training or publish prompts). This keeps repeated prompt data in an in-memory cache in the provider's datacenter so that the repeated part of the prompt does not need to be re-processed, leading to considerable cost savings. OpenRouter's stance is that in-memory caching is compatible with ZDR, and therefore allows endpoints/models with implicit caching to be hit when a ZDR routing policy is in effect. If you need complete non-retention (no caching), use the "No Caching" filter.</p>
  <p><a href="https://openrouter.ai/docs/guides/features/zdr" target="_blank" style="color: #28a745;">Read OpenRouter's official ZDR policy &rarr;</a></p>
</div>

<div class="zdr-info" style="background: #fff3cd; border-left-color: #ffc107;">
  <h3 style="color: #856404;">⚠️ Disclaimer</h3>
  <p style="color: #856404;"><strong>I have not personally audited this list.</strong> This catalog relies on OpenRouter's research and public documentation. While I strive to maintain accurate information, always verify ZDR compliance directly with providers before handling sensitive data.</p>
</div>

<div class="filter-bar">
  <div class="filter-main-grid">
    <div class="filter-group">
      <label for="search-input">🔍 Search Models</label>
      <input type="text" id="search-input" class="filter-input" placeholder="Search by name..." oninput="filter()" />
    </div>

    <div class="filter-group">
      <label for="company-select">🏭 Model Company</label>
      <select id="company-select" class="filter-select" onchange="filter()">
        <option value="">All Companies</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="provider-select">🏢 Provider</label>
      <select id="provider-select" class="filter-select" onchange="filter()">
        <option value="">All Providers</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="quant-select">📊 Quantization</label>
      <select id="quant-select" class="filter-select" onchange="filter()">
        <option value="">All Types</option>
        <option value="fp8">FP8</option>
        <option value="bf16">BF16</option>
        <option value="int4">INT4</option>
        <option value="fp4">FP4</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="cache-select">💾 Caching</label>
      <select id="cache-select" class="filter-select" onchange="filter()">
        <option value="">All</option>
        <option value="cached">With Caching</option>
        <option value="not-cached">No Caching</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="sort-select">🔄 Sort By</label>
      <select id="sort-select" class="filter-select" onchange="filter()">
        <option value="alphabetical">Alphabetical</option>
        <option value="price-desc">Price (Highest to Lowest)</option>
        <option value="price-asc">Price (Lowest to Highest)</option>
        <option value="context-desc">Context Size (Highest to Lowest)</option>
      </select>
    </div>
  </div>

  <div class="filter-sliders-row">
    <div class="slider-group">
      <label for="input-cost-slider">💰 Max Input Cost ($/1M)</label>
      <div class="slider-container">
        <input type="range" id="input-cost-slider" class="slider" min="0" max="100" step="0.1" value="100" oninput="updateSliderValue('input'); filter()" />
        <span class="slider-value" id="input-cost-value">$100</span>
      </div>
    </div>
    <div class="slider-group">
      <label for="output-cost-slider">💰 Max Output Cost ($/1M)</label>
      <div class="slider-container">
        <input type="range" id="output-cost-slider" class="slider" min="0" max="100" step="0.1" value="100" oninput="updateSliderValue('output'); filter()" />
        <span class="slider-value" id="output-cost-value">$100</span>
      </div>
    </div>
  </div>

  <div class="filter-footer">
    <div class="results-count" id="results-count">Showing all endpoints</div>
    <button class="reset-btn" onclick="resetFilters()">Reset Filters</button>
  </div>
</div>

<div id="pagination-container" class="pagination-controls"></div>

<div id="endpoints-container" class="endpoints-grid">
</div>

<div style="text-align: center;">
  <button class="refresh-btn" onclick="fetchZDREndpoints()">🔄 Refresh Data</button>
</div>

<script src="/assets/js/zdr-endpoints.js"></script>
