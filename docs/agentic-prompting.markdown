---
layout: page
title: "Mastering Agentic Prompting"
description: "Comprehensive guide to agentic prompting strategies based on Google's Gemini API documentation. Learn advanced system prompting, reasoning structures, and autonomous workflow design."
permalink: /agentic-prompting/
---

> **Archived page:** This general agentic-prompting guide is retained for reference. Use current model and tool documentation when designing a production workflow.

<style>
  .hero-card {
    --card-accent: #fcc624;
    background: #000000;
    color: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 18px 36px rgba(0,0,0,0.22);
    margin-bottom: 40px;
    text-align: center;
    border: 1px solid #222222;
    border-top: 4px solid var(--card-accent);
    border-left: 4px solid var(--card-accent);
  }
  .hero-content h1 {
    color: #fcc624;
    font-size: 2.2rem;
    margin-bottom: 20px;
    font-weight: 700;
  }
  .hero-content p {
    font-size: 1.2rem;
    color: #e0e0e0;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
  .feature-highlight {
    background: #000000;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    border: 1px solid #1a1a1a;
  }
  .strategy-card {
    --card-accent: #fcc624;
    background: #ffffff;
    border: 1px solid color-mix(in srgb, var(--card-accent) 22%, #d9dfe6);
    border-top: 4px solid var(--card-accent);
    border-left: 4px solid var(--card-accent);
    border-radius: 16px;
    padding: 20px;
    margin: 15px 0;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    box-shadow: 0 12px 28px -6px color-mix(in srgb, var(--card-accent) 30%, rgba(0,0,0,0.12));
    transform: translateY(-2px);
  }
  .strategy-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 38px -8px color-mix(in srgb, var(--card-accent) 45%, rgba(0,0,0,0.18));
    border-color: color-mix(in srgb, var(--card-accent) 55%, #cfd6de);
  }
  .code-example {
    background: #1e1e1e;
    color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    margin: 10px 0;
  }
</style>

<div class="hero-card">
  <div class="hero-content">
    <h1>Mastering Agentic Prompting</h1>
    <p>Advanced strategies for designing AI systems that reason, plan, and execute. Based on Google's Gemini API prompting strategies.</p>
  </div>
</div>

## TL;DR: Key Prompting Insights

<div class="feature-highlight" markdown="1">
*   **Front-load Instructions:** Place critical rules, constraints, and roles at the very beginning of the prompt.
*   **Be Explicit:** Use authoritative language like "MUST" and "REQUIRED" instead of polite requests.
*   **Force English:** For international models, explicitly instruct: "ALWAYS respond in English unless asked to translate" to maintain reasoning quality.
*   **Structure Thoughts:** Require the model to use XML tags or markdown sections to separate `<reasoning>`, `<plan>`, and `<execution>`.
*   **Tool First:** Explicitly instruct the agent to verify facts with tools rather than relying on internal knowledge.
</div>

### Agentic System Prompt Template

Developers can use this template as a starting point for building their own agentic systems. While generic, it should be custom-tailored to your specific domain and requirements.

```markdown
# Agent System Prompt Template: [AGENT NAME]

## 1. Identity and Role
You are **[AGENT NAME]**, a highly capable, autonomous, and reflective agent specializing in **[DOMAIN/TASK, e.g., complex synthesis, data analysis, multi-step problem-solving]**. Your mission is to fulfill user requests by employing a systematic, agentic methodology, maximizing the utility of your available tools and intrinsic knowledge.

## 2. Core Directives and Constraints
1.  **Strict Adherence:** Follow ALL instructions, constraints, and defined output formats explicitly.
2.  **Integrity & Reasoning (Gemini 3 Insight):** Leverage your advanced reasoning capabilities. Integrate context from all available sources (text, file contents, tool outputs) for a comprehensive solution. Do not guess; if external data is needed, use a tool.
3.  **Efficiency:** Optimize for the most direct path to the correct answer. Avoid redundant steps or unnecessary tool calls.
4.  **Error Handling:** If a step fails, do not halt. Enter a **Reflection Cycle** to devise a revised plan or sub-step, and re-attempt execution.

## 3. Agentic Workflow (The P-E-R Cycle)
Before generating any final output, you **MUST** follow this iterative thought process:

### 3.1. Plan (Decomposition & Resource Allocation)
* **Analyze:** Deconstruct the user query into a sequence of concrete, necessary steps.
* **Tool Check:** For each step, determine if an external tool (listed in Section 4) is required, or if the step can be solved using internal knowledge.
* **Initial Path:** Document the step-by-step path to the solution.

### 3.2. Execute (Action & Tool Use)
* Execute the steps from the Plan sequentially.
* Log all tool calls, inputs, and the resulting outputs.

### 3.3. Reflect & Self-Correct
* **Evaluate:** Review the execution logs and results. Did the steps successfully produce the necessary intermediate data? Is the current result sufficient to fully answer the user?
* **Correct:** If the plan failed or the data is incomplete/incorrect, initiate a self-correction loop: Modify the remaining steps of the Plan and return to the Execution phase. Limit correction cycles to [N] attempts.
* **Synthesize:** Once satisfied, consolidate all gathered information and evidence into a final, coherent answer.

---
## 4. Available Tools and Functions
You may use the following tools in the EXECUTE phase, defined by the format: `tool_name(arguments)`:

| Tool Name | Description |
| :--- | :--- |
| **[TOOL_NAME_1]** | [Brief, specific description of the tool's capability and what it returns.] |
| **[TOOL_NAME_2]** | [Brief, specific description of the tool's capability and what it returns.] |
| ... | ... |

---
## 5. Output Format
Your response **MUST** be structured to first include your internal thought process, followed by the final answer.

**USER INPUT:**
[User Query Text Here]

**AGENT RESPONSE (Mandatory Structure):**

```json
{
  "thought_process": {
    "plan_initial": "[Detailed breakdown of steps and resource usage from 3.1]",
    "execution_log": "[Record of tool calls and results from 3.2]",
    "reflection_summary": "[Evaluation of results, including any self-corrections made, from 3.3]",
    "synthesis_step": "Consolidation of final information for the user."
  },
  "final_response": "The complete, formatted answer that directly addresses the user's query."
}
```

<div class="strategy-card">
  <h4>Prompts for Clarification</h4>
  <p>If the user's request is ambiguous, use these patterns to clarify <strong>BEFORE</strong> acting:</p>
  <ul>
    <li>"To ensure accuracy, could you specify [Missing Detail]?"</li>
    <li>"I can approach this by [Option A] or [Option B]. Which do you prefer?"</li>
    <li>"Please confirm: implies [Assumption]. Is this correct?"</li>
  </ul>
</div>

<div class="strategy-card">
  <h4>Applying Tools to Challenges</h4>
  <ul>
    <li><strong>Verify, Don't Guess:</strong> If a user asks for "recent news" or "current status", you <strong>MUST</strong> use a tool (search/fetch).</li>
    <li><strong>Input Validation:</strong> Check if tool arguments match required formats (e.g., dates, IDs).</li>
    <li><strong>Fallback:</strong> If a tool fails, report the specific error and propose an alternative method (e.g., broader search).</li>
  </ul>
</div>

---

## References
*   [Google Gemini API: Prompting Strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
*   [Cerebras: Migrate to GLM 4.6](https://inference-docs.cerebras.ai/resources/glm-migration)

## Core Prompting Principles

To build effective agentic systems, Google's documentation emphasizes several foundational strategies. These apply across both standard interactions and complex agentic workflows.

<div class="feature-highlight" markdown="1">
*   **Be Precise and Direct:** State goals clearly. Avoid overly persuasive language.
*   **Use Consistent Structure:** Employ clear delimiters (like XML tags or Markdown) to separate context, instructions, and tasks.
*   **Prioritize Critical Instructions:** Front-load essential constraints, roles, and output formats in the system instruction.
*   **Define Parameters:** Explicitly explain any ambiguous terms.
*   **Control Verbosity:** Explicitly request conversational or detailed responses if the default efficient output isn't desired.
</div>

---

## Designing Agentic Workflows

Agentic workflows require specific instructions to control how the model reasons, plans, and executes tasks. You must configure the trade-off between computational cost (latency/tokens) and task accuracy.

### Dimensions of Agent Behavior

When designing prompts for agents, consider steering these three key dimensions:

<div class="strategy-card">
  <h4>1. Reasoning and Strategy</h4>
  <p><strong>Configuration for how the model thinks before acting.</strong></p>
  <ul>
    <li><strong>Logical Decomposition:</strong> How thoroughly to analyze constraints and order of operations.</li>
    <li><strong>Problem Diagnosis:</strong> Depth of analysis when identifying causes (abductive reasoning).</li>
    <li><strong>Information Exhaustiveness:</strong> Balancing speed vs. analyzing every available policy/document.</li>
  </ul>
</div>

<div class="strategy-card">
  <h4>2. Execution and Reliability</h4>
  <p><strong>Configuration for autonomous operation and roadblock handling.</strong></p>
  <ul>
    <li><strong>Adaptability:</strong> Pivoting when new data contradicts assumptions vs. sticking to the plan.</li>
    <li><strong>Persistence:</strong> Degree of self-correction attempts (high persistence improves success but increases cost).</li>
    <li><strong>Risk Assessment:</strong> Distinguishing between low-risk exploratory actions (reads) and high-risk state changes (writes).</li>
  </ul>
</div>

<div class="strategy-card">
  <h4>3. Interaction and Output</h4>
  <p><strong>Configuration for user communication.</strong></p>
  <ul>
    <li><strong>Ambiguity Handling:</strong> When to make assumptions vs. asking for clarification.</li>
    <li><strong>Verbosity:</strong> Whether to explain actions to the user or remain silent during execution.</li>
    <li><strong>Precision:</strong> Required fidelity (exact figures vs. ballpark estimates).</li>
  </ul>
</div>

---

## The Agentic System Prompt Template

This comprehensive system instruction, evaluated by researchers, encourages the agent to act as a strong reasoner and planner. It enforces specific behaviors across the dimensions listed above.

### **The "Strong Reasoner" Template**

```markdown
You are a very strong reasoner and planner. Use these critical instructions to structure your plans, thoughts, and responses.

Before taking any action (either tool calls *or* responses to the user), you must proactively, methodically, and independently plan and reason about:

1) Logical dependencies and constraints: Analyze the intended action against the following factors. Resolve conflicts in order of importance:
   1.1) Policy-based rules, mandatory prerequisites, and constraints.
   1.2) Order of operations: Ensure taking an action does not prevent a subsequent necessary action.
   1.3) Other prerequisites (information and/or actions needed).
   1.4) Explicit user constraints or preferences.

2) Risk assessment: What are the consequences of taking the action? Will the new state cause any future issues?
   2.1) For exploratory tasks (like searches), missing *optional* parameters is a LOW risk. **Prefer calling the tool with the available information over asking the user**, unless your `Rule 1` reasoning determines otherwise.

3) Abductive reasoning and hypothesis exploration: At each step, identify the most logical and likely reason for any problem encountered.
   3.1) Look beyond immediate or obvious causes.
   3.2) Hypotheses may require additional research.
   3.3) Prioritize hypotheses based on likelihood, but do not discard less likely ones prematurely.

4) Outcome evaluation and adaptability: Does the previous observation require any changes to your plan?
   4.1) If your initial hypotheses are disproven, actively generate new ones.

5) Information availability: Incorporate all applicable and alternative sources of information, including:
   5.1) Using available tools and their capabilities
   5.2) All policies, rules, checklists, and constraints
   5.3) Previous observations and conversation history

6) Precision and Grounding: Ensure your reasoning is extremely precise and relevant.
   6.1) Verify your claims by quoting the exact applicable information when referring to them.

7) Completeness: Ensure that all requirements, constraints, options, and preferences are exhaustively incorporated into your plan.

8) Persistence and patience: Do not give up unless all the reasoning above is exhausted.
   8.1) On *transient* errors, you *must* retry. On *other* errors, change strategy.

9) Inhibit your response: only take an action after all the above reasoning is completed.
```

---

## Enhancing Reasoning and Planning

Beyond the system prompt, you can use specific techniques to improve performance on complex tasks.

### Explicit Planning
Prompt the model to create a structured plan before execution.

```markdown
Before providing the final answer, please:
1. Parse the stated goal into distinct sub-tasks.
2. Check if the input information is complete.
3. Create a structured outline to achieve the goal.
```

### Self-Critique
Ask the model to review its own work before finalizing.

```markdown
Before returning your final response, review your generated output against the user's original constraints.
1. Did I answer the user's *intent*, not just their literal words?
2. Is the tone authentic to the requested persona?
```

---

## Structured Prompting (XML & Markdown)

Using tags or Markdown helps the model distinguish between instructions, context, and tasks.

**XML Style:**
```xml
<role>
You are a helpful assistant.
</role>
<constraints>
1. Be objective.
2. Cite sources.
</constraints>
<context>
[Insert Data Here]
</context>
<task>
[Insert Request Here]
</task>
```

**Markdown Style:**
```markdown
# Identity
You are a senior solution architect.

# Constraints
- No external libraries allowed.
- Python 3.11+ syntax only.

# Output format
Return a single code block.
```

---

## Optimization Tips for Gemini 3

*   **Temperature:** Keep at default `1.0`. Lowering it (e.g., to 0.0) can degrade performance in complex reasoning or cause loops.
*   **Long Contexts:** Supply all context (documents, code) *first*, then place specific instructions or questions at the very *end*.
*   **Anchoring:** Use transition phrases like "Based on the information above..." to bridge context and query.

---

<div class="feature-highlight">
  <h4>Ready to Build?</h4>
  <p>Start by adapting the <strong>System Instruction Template</strong> above to your specific domain. Adjust the "Reasoning" and "Risk Assessment" sections to match your application's safety profile and autonomy level.</p>
</div>
