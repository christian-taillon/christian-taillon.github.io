---
layout: page
title: "Sigma Rule Guide"
permalink: /sigma-rule-guide
---

## Summary
Sigma is a generic and open signature format that allows you to describe relevant log events in a straightforward manner. The rules are easy to write and can be applied to various log management solutions or SIEM systems.

Here is a template that has comments to explain how each attribute is used. Full documentation can be found [here](https://github.com/SigmaHQ/sigma/wiki/Rule-Creation-Guide).

```YAML
title: "your sigma rule title" # It should be descriptive and succinct.

status: experimental, stable, or testing # The current status of the rule. It could be experimental, stable or under testing.

description: "description of your sigma rule" # Provide a brief summary of the purpose and functionality of the rule.

author: "your name" # The name of the person who wrote the rule.

references:
    - "reference 1" # Any external resources or references related to the rule.
    - "reference 2"

tags:
    - "tag1" # These tags categorize your rule, e.g. 'malware', 'exploit', etc.
    - "tag2"

logsource:
    #service: "service name" # The specific service where the logs are coming from, e.g., 'sysmon', 'winlogbeat', etc.
    category: "category name" # The category of the log, e.g., 'process_creation', 'network_connection', etc.
    product: windows # The product where the logs are coming from. This could be 'windows', 'linux', etc.

detection:
    selection:
        ParentImage|endswith:
            - "image name or path" # Any process or file paths related to the rule.
        Image|endswith:
            - "image name or path"
        CommandLine|contains:
            - "command line" # Any command line arguments related to the rule.
    condition: selection # The logical condition to trigger the rule. This could be 'selection', 'selection1 and selection2', 'selection1 or selection2', etc.

falsepositives:
    - "Potential false positive reason" # Any potential reasons for false positive triggers of the rule.

level: medium # The severity of the rule. This could be 'low', 'medium', 'high', or 'critical'.
```

This is just a simple guide. Remember, Sigma rules can be quite complex and involve intricate logic. They can include different log sources, multiple conditions, etc. However, the above guide should be enough to get you started.
