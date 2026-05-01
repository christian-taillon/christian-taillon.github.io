---
layout: page
title: "OpenAI's New Value Play: GPT-5.5 Low Reasoning"
description: "A practical look at GPT-5.5's intelligence, cumulative cost, token efficiency, and why low-reasoning frontier models may change the economics of agentic AI."
permalink: /openai-value/
---

<style>
  .lead-copy {
    color: #333333;
    line-height: 1.75;
    margin: 0 0 18px;
  }
  .thesis-callout {
    background: #fff8dc;
    border: 3px solid #fcc624;
    border-radius: 14px;
    box-shadow: 0 12px 28px -8px rgba(252, 198, 36, 0.5);
    color: #111827;
    font-size: 1.22rem;
    font-weight: 700;
    line-height: 1.55;
    margin: 28px 0;
    padding: 20px 24px;
  }
  .analysis-card {
    background: #ffffff;
    border: 3px solid #fcc624;
    border-radius: 14px;
    padding: 22px;
    margin: 24px 0;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  }
  .analysis-card h2 {
    color: #333333;
    margin-top: 0;
  }
  .analysis-card p,
  .analysis-card li {
    color: #333333;
    line-height: 1.75;
  }
  .chart-figure {
    margin: 30px 0;
    padding: 18px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
  }
  .chart-figure img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
  }
  .chart-figure figcaption {
    color: #475569;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-top: 12px;
  }
  .source-note {
    background: #fff8dc;
    border: 3px solid #fcc624;
    border-radius: 12px;
    padding: 16px;
    color: #333333;
    line-height: 1.7;
    margin: 24px 0;
  }
  .takeaway-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin: 24px 0;
  }
  .takeaway {
    background: #ffffff;
    border: 3px solid #fcc624;
    border-radius: 14px;
    padding: 18px;
  }
  .takeaway strong {
    display: block;
    color: #111827;
    margin-bottom: 8px;
  }
  .takeaway span {
    color: #475569;
    line-height: 1.6;
  }
  .takeaway-wide {
    grid-column: 1 / -1;
  }
  @media (max-width: 767.98px) {
    .takeaway-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<p class="lead-copy">
  We've been calculating model cost and value wrong, and it has never mattered more. Models are getting more expensive, people can burn through a $20 Anthropic plan in a couple of Opus-heavy sessions, and GitHub Copilot, where many enterprises pay for developer AI consumption, is moving toward token-based pricing.
</p>

<p class="lead-copy">
  For years, the large language model market had a familiar split: US frontier labs sold the best capability, while open-weight and international models competed on value. GPT-5.5 complicates that story. The important detail is not just that GPT-5.5 is intelligent. It is that GPT-5.5 low reasoning appears to land in the same cost-performance cluster that previously belonged to the affordable model challengers.
</p>

<div class="thesis-callout">
  The real cost metric is not price per million tokens. It is cost per completed task.
</div>

<div class="takeaway-grid">
  <div class="takeaway">
    <strong>The historical pattern</strong>
    <span>Open-weight and international models often won the value argument by offering capable, near-frontier performance at much lower total cost.</span>
  </div>
  <div class="takeaway">
    <strong>The new pressure point</strong>
    <span>GPT-5.5 low reasoning appears to compete in that value band without looking like a heavily discounted compromise.</span>
  </div>
  <div class="takeaway takeaway-wide">
    <strong>The practical implication</strong>
    <span>For agents and coding workflows, output token efficiency can matter as much as the published per-million-token price.</span>
  </div>
</div>

<div class="analysis-card">
  <h2>How To Read The Charts</h2>
  <p>
    Price per million tokens is still useful, but it is only the sticker price. The realized cost depends on how many tokens the model needs to solve the task, how often it needs retries, and whether higher reasoning settings burn extra output tokens to reach a better answer.
  </p>
  <p>
    The first chart is useful because it compares intelligence against cumulative benchmark cost rather than list price alone. The second chart is useful because output token usage is a proxy for token bloat, latency, and future context-window pressure in agentic systems.
  </p>
</div>

<figure class="chart-figure">
  <img src="/image/Intelligence%20vs%20Cost%20to%20Run%20Artificial%20Analysis%20Intelligence%20Index%20(29%20Apr%20%2726).png" alt="Artificial Analysis chart comparing model intelligence against cost to run the Artificial Analysis Intelligence Index">
  <figcaption>
    <strong>Intelligence vs Cost.</strong> The low-cost, strong-performance cluster was originally shaped by models like GLM-5 and MiniMax M2.7, then reinforced by DeepSeek V4 and Qwen3.6. GPT-5.5 low reasoning is notable because it appears in that same region instead of only showing up where I would normally expect premium frontier models to sit.
  </figcaption>
</figure>

<div class="analysis-card">
  <h2>Why This Surprised Me</h2>
  <p>
    As someone who has spent a lot of time around open-weight and locally hosted models, the old tradeoff felt stable. If you wanted the strongest model, you usually paid for a closed frontier model. If you wanted something dramatically cheaper and still good enough, you looked toward the open-weight model ecosystem, often including models created by Chinese labs and self-hosted or at providers in the US, EU, and Singapore.
  </p>
  <p>
    That value lane mattered. It gave builders access to capable models at prices that sometimes looked dramatically better than American frontier offerings. The models were often a little behind on raw intelligence, but the economics were compelling enough that the tradeoff made sense.
  </p>
  <p>
    GPT-5.5 changes the shape of that conversation. Looking at the cost-to-run data, GPT-5.5 low reasoning appears cheaper than DeepSeek V4 Pro while nearly matching its performance. It also appears cheaper than GLM-5 while slightly exceeding its average intelligence score, and it lands near Qwen3.6 with lower cumulative cost and higher intelligence in this view. That is a different kind of OpenAI story: not just best-in-class capability, but credible value.
  </p>
</div>

<div class="analysis-card">
  <h2>Why Cumulative Cost Matters</h2>
  <p>
    We usually talk about models in two incomplete ways. First, we talk about benchmark scores, either individually or as an average across multiple benchmarks. Second, we talk about price per million input or output tokens. Both are useful, but neither fully captures what it feels like to operate these models in real workflows.
  </p>
  <p>
    A model can look inexpensive on a per-token basis and still be expensive to operate if it burns a large number of output tokens to reach its answer. This is especially important as reasoning modes become more common. Low, medium, high, and extended reasoning settings can improve benchmark scores, but they often do so by spending more tokens.
  </p>
  <p>
    That is why I find the cumulative cost of running a benchmark suite more useful than token price alone. It captures not just what each token costs, but how many tokens the model tends to spend while solving the task. For agents, RAG systems, code assistants, and long-running workflows, that is closer to the bill we actually feel.
  </p>
</div>

<figure class="chart-figure">
  <img src="/image/Intelligence%20vs%20Output%20Tokens%20Used%20in%20Artificial%20Analysis%20Intelligence%20Index%20(29%20Apr%20%2726).png" alt="Artificial Analysis chart comparing model intelligence against output tokens used in the Artificial Analysis Intelligence Index">
  <figcaption>
    <strong>Intelligence vs Output Tokens.</strong> This is the chart that makes GPT-5.5 more interesting. The model family appears to reach high scores with much lower output token usage than many competitors. In token-priced developer tools and agentic systems, fewer generated tokens can mean lower cost, lower latency, and less context-window pollution.
  </figcaption>
</figure>

<div class="analysis-card">
  <h2>Token Efficiency Is Not Just Cost Efficiency</h2>
  <p>
    In a world where GitHub Copilot and other developer tools are moving toward token-sensitive economics, token bloat matters. Agents and RAG systems can burn through millions of tokens quickly. If a model needs to ramble its way into the right answer, the cost problem is obvious. The less obvious problem is that every extra token also competes for context.
  </p>
  <p>
    GPT-5.5 low reasoning is interesting because it appears to compete with strong value models on both price and performance while using far fewer output tokens. For example, in this Artificial Analysis benchmark view, GPT-5.5 low edges out DeepSeek V4 Pro in intelligence while using roughly 22% of the output tokens. That is not a universal runtime guarantee, but it is not just a pricing detail either. It is an architectural advantage for systems that run many iterative steps.
  </p>
</div>

<div class="analysis-card">
  <h2>Token Bloat Becomes Context Bloat</h2>
  <p>
    People who describe themselves as agentic engineers or context engineers will probably appreciate the token reduction more than anyone. Extra reasoning tokens do not only increase the bill. They also increase context-window pressure.
  </p>
  <p>
    One way to improve benchmark scores is to let models think longer, explain more, and generate more intermediate text until they stumble into a better answer. It can work. The problem is that long agent runs already suffer from context-window bloat. Even when a system advertises a very large context window, model performance can degrade as the context becomes crowded, stale, or noisy.
  </p>
  <p>
    That is why so much attention is moving toward context minimization strategies: progressive disclosure, skill-based context loading, focused subagents, small task-specific toolsets, and avoiding the old pattern of giving one model thirty tools and ten knowledge articles all at once. A model that achieves stronger results with fewer output tokens helps with that same problem by default.
  </p>
</div>

<div class="analysis-card">
  <h2>The Bigger Shift</h2>
  <p>
    The value frontier may no longer be defined only by open-weight or China-based models. GPT-5.5 suggests that a US frontier model can compete in the same economic conversation when the right reasoning mode is selected. That does not erase the value of open-weight models, local deployment, or model sovereignty. Those still matter for privacy, control, resilience, and cost negotiation.
  </p>
  <p>
    But it does mean the model-selection conversation should change. The best value model is not always the model with the cheapest listed token price. It is the model that can complete the work reliably with the lowest total operational cost, the least unnecessary context growth, and the fewest retries.
  </p>
  <p>
    For agentic systems, that may make GPT-5.5 low reasoning one of the more important data points to watch.
  </p>
</div>

<div class="analysis-card">
  <h2>Operator Takeaway</h2>
  <p>
    When choosing models for agents, compare cost per successful task, output tokens, latency, retries, and context growth, not just benchmark rank or token price. A model that costs more per token can still be cheaper in production if it finishes the work with fewer tokens, fewer retries, and less context pollution.
  </p>
</div>

<div class="source-note">
  Charts and model comparison context are based on Artificial Analysis data captured on April 29, 2026. Readers should review the live data directly because model pricing, reasoning settings, benchmark scores, and token usage can change quickly: <a href="https://artificialanalysis.ai/?models=gpt-5-4-mini-medium%2Cgpt-5-5-high%2Cgpt-5-5%2Cgpt-5-4-low%2Cgpt-5-4%2Cgpt-5-5-medium%2Cgpt-5-4-mini%2Cgpt-5-5-low%2Cclaude-opus-4-7%2Cclaude-sonnet-4-6-adaptive%2Cclaude-opus-4-7-non-reasoning%2Cclaude-sonnet-4-6%2Cdeepseek-v4-flash-high%2Cdeepseek-v4-pro%2Cdeepseek-v4-flash%2Cdeepseek-v4-flash-non-reasoning%2Cdeepseek-v4-pro-high%2Cdeepseek-v4-pro-non-reasoning%2Cminimax-m2-7%2Ckimi-k2-6-non-reasoning%2Ckimi-k2-6%2Cmimo-v2-5-pro%2Cmimo-v2-5-0424%2Cmimo-v2-pro%2Cglm-5-1%2Cglm-5-1-non-reasoning%2Cglm-5-non-reasoning%2Cglm-5%2Cqwen3-6-plus%2Cqwen3-6-max%2Cminimax-m2-5&amp;intelligence=artificial-analysis-intelligence-index&amp;intelligence-efficiency=intelligence-efficiency-output-token-breakdown&amp;output-tokens=intelligence-vs-output-tokens&amp;price=intelligence-vs-price&amp;cost=intelligence-vs-cost#intelligence-efficiency-tabs" target="_blank" rel="noopener">Artificial Analysis model comparison</a>.
</div>
