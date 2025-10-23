---
layout: page
title: "Agentic SOC Mentors & Helpers"
description: "Security operations automation with AI agents for threat intelligence and SOC efficiency"
permalink: /agentic-soc/
---

## Agentic SOC Mentors & Helpers

<div class="video-container" style="text-align: center; margin-bottom: 40px;">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/0WHKTPB-6HA?si=wKnx9u5oim-NHN2X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## 🔐 Tools Demonstrated

### ThreatConnect by Dataminr
**Congratulations to ThreatConnect on their recent acquisition by Dataminr!** This integration demonstrates IOC enrichment and threat intelligence operations through a unified platform that brings together all sources of open source, commercial, and internal intelligence for comprehensive security context.

### Polarity by ThreatConnect  
Unified threat intelligence, context, and Knowledge at the point of analysis and decision-making. This integration shows federated search, correlation, and analysis capabilities that put intelligence and security data where analysts need it most.

### Armis
Asset intelligence and vulnerability management platform providing real-time security insights through comprehensive asset discovery and continuous monitoring capabilities.

## 🤖 Technical Implementation

For **ThreatConnect** and **Polarity**, I built OpenWebUI-compatible pipelines that enable LLMs to understand what actions are possible with each tool and how to properly call functions. These pipelines provide structured tool definitions that allow agents to intelligently interact with these platforms.

For **Armis**, they developed their own MCP (Model Context Protocol) service, which is demonstrated in the video being accessed through an OpenAI-MCP proxy for security and authentication purposes: [MCP-to-OpenAPI-Proxy](https://github.com/christian-taillon/MCP-to-OpenAPI-Proxy).

## 🧠 The Evolution of LLM Tool Use

Open source models are starting to become increasingly reliable at using tools, while closed source models consistently demonstrate strong tool execution capabilities. Even "flash" or "lite" models like Claude Haiku 4.5 are proving reliable for tool use operations. This capability is crucial because analysis requires extensive tool usage and data processing.

## 📊 Bridging the Skills Gap in Security Operations

Many vendors will tell/sell you on these tools replacing humans for ~$2k a month of processing. I really don't see these effective for simple replacement. Automation (SOAR) capabilities have existed for years, and LLMs certainly give us the ability to have machines operate with direction in a way that can be more dynamically variability tolerant; however, I believe that a great strength of LLMs is the ability for humans to interact extremely natively with computer systems in natural language, creating charts and visualizations or dynamically generated user interfaces when that level of input is needed from the human. I've even been able to recently speak to my LLMs to task them with data retrieval, enrichment, and processing tasks - all while running offline local models for LLMs, text to speech and speech to text (albeit local models are slow for the latter and not the most powerful for the former).

Still I see LLMs as offering the potential to help bridge the skills gap as juniors enter the field without the same advanced tool experience. If LLMs can help someone without query syntax knowledge obtain the right answers, or iterate though 10 searches for an information request that a human can process in twice the amount of time, or help guide a junior through the SOP contextualizing the data returned from tools with SOP - I think we can provide more entry level contributors with a direct path to creating significant value with less resource drain from existing team members on training (a real factor to consider for enterprises) while reducing cyber risk by improving security operations. Of course there is value to be derived from other team members; however, the focus so far has been to give every analyst an expert at __using__ tools informed with actual expert guidance and team documentation on processes and procedures.

This is still in its experimental phase. We are exploring its efficacy. I have personally found use out of this. Though I don't think we will be automating away an entire SOC or Vibe-Triaging anytime soon, I do hope we as an industry can hire more analysts that make a bigger dent in the fight with AI assisted triage.

## 🎯 The Power of Threat Intelligence Automation

LLMs allow us to automate and process larger amounts of unstructured data in ways that can drive decision-making. AgenticLLMs potentially offer a dynamic way to guide and work with people at different skill levels to execute on many intelligently directed tasks given by a human thinker or allow someone without the advanced skills typically required for tool access to process then.

This represents a fundamental shift in how security teams can interact with their data and tools, potentially democratizing access to advanced threat intelligence capabilities while maintaining the contextual understanding that human expertise provides.

## 📚 Resources & Implementation

Want to implement these solutions yourself? Check out the code and community resources:

* [📦 GitHub Repository - Open WebUI Security Pipelines](https://github.com/christian-taillon/open-webui-pipelines)
* [🛠️ OpenWebUI Community Profile](https://openwebui.com/u/christiant)
* [🔗 MCP-to-OpenAPI Proxy](https://github.com/christian-taillon/MCP-to-OpenAPI-Proxy)