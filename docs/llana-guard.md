---
layout: page
title: "LlamaGuard Filter Pipeline"
permalink: /llama_guard
---

### Meta's LLamaGuard Filter
-----------------------------------

LLamaGuard is Meta's LLM GuardRail model designed to detect harmful or inappropriate AI interactions. It evaluates prompts across 13 distinct categories, determining whether content is safe or unsafe and which categories are violated.

Demo 1: Privacy Protection in Action
----------------------------------
![llama-guard](/videos/LlamaGuard-hq.gif)
In this demonstration, we see LLamaGuard's privacy protection capabilities:
- Initially, a user attempts to send sensitive personal information to an external model
- With LLamaGuard enabled, the system intercepts and blocks the request
- Instead of processing potentially sensitive data, the system returns a privacy violation notice
- A second example shows permitted content (how to adopt a Llama) vs. blocked content (how to steal a Llama)

Demo 2: Customizable Security Controls
------------------------------------
![llama-guard_customization](/videos/LlamaGuard_customization-hq.gif)

The second demonstration showcases LLamaGuard Filters's flexibility. Not everyone will require the same use cases. I am primarily interested in LlamaGaurd for the probabilitic Privacy features as a second layer of preventing privacy related details from being sent to third party inference providers if my [TokenGuard](https://github.com/christian-taillon/open-webui-pipelines/blob/main/function/tokeGuard.py) fails to properly sanitize the data. 

The abilit to enable to disable certain filters therefore seemed to me to be a required feature. 
- Users can access security control settings
- Individual filter categories can be enabled or disabled

This powerful tool ensures responsible AI interaction while maintaining user control over security parameters.
