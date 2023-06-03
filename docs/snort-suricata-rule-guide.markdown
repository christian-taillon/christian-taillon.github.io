---
layout: page
title: "Snort and Suricata Rule Guide"
permalink: /snort-suricata-guide
---
# A Guide for Snort/Suricata Rules

In this guide, we'll delve into the details of writing rules for two popular network intrusion detection systems (IDS): Snort and Suricata (my preference).

Snort and Suricata are both open-source network intrusion detection and prevention systems (IDS/IPS) used to analyze network traffic and identify potential threats. While they share some similarities, there are key differences:

**Snort**

Snort, developed by Sourcefire (now owned by Cisco), is one of the oldest and most established IDS/IPS tools. It operates primarily on a single thread, which can limit its speed and performance in high traffic scenarios.

Snort uses a rule-driven language for detection, where rules are written to define the type of traffic considered malicious or suspicious. Its community is extensive and many third-party rule sets are available, such as Emerging Threats and Talos.

**Suricata**

Suricata, developed by the Open Information Security Foundation (OISF), is a newer entry to the field. Unlike Snort, Suricata is designed to take advantage of multicore architectures, which can result in improved performance on modern hardware. This means that Suricata can potentially handle higher network throughputs.

Suricata is compatible with Snort rules, providing similar detection capabilities. However, it offers some additional features such as the ability to capture and log network traffic (Network Traffic Recording or NTR), and it also supports more complex rule options that enable advanced threat detection using application layer protocol inspection.

Both these systems use a similar rule syntax, and their purpose is to monitor network traffic to detect malicious activity.

## Table of Contents

1. [Introduction](#introduction)
2. [Understanding Snort/Suricata Rule Structure](#understanding-snort/suricata-rule-structure)
3. [Rule Actions](#rule-actions)
4. [Rule Protocols](#rule-protocols)
5. [Rule IPs and Ports](#rule-ips-and-ports)
6. [Rule Direction Operators](#rule-direction-operators)
7. [Rule Options](#rule-options)
8. [Writing Your First Snort/Suricata Rule](#writing-your-first-snort/suricata-rule)
9. [Best Practices](#best-practices)

<a name="introduction"></a>
## 1. Introduction

Snort and Suricata are IDS that provide real-time traffic analysis and packet logging. They use a rule-based language for detection of malicious network traffic. This guide assumes you have a basic understanding of network concepts.

<a name="understanding-snort/suricata-rule-structure"></a>
## 2. Understanding Snort/Suricata Rule Structure

Every rule in Snort or Suricata has a specific structure and is composed of two main parts:

- Rule Header: It contains the rule's action, protocol, IP addresses, ports, and the direction of the traffic.
- Rule Options: It contains alert messages, information about the rule, and additional conditions that packet should fulfill to match the rule.

Here is a basic rule structure:

```
action protocol source_IP source_port direction_operator destination_IP destination_port (rule_options)
```

<a name="rule-actions"></a>
## 3. Rule Actions

The action part of the rule header is the consequence of the rule. It tells Snort or Suricata what to do when it finds a packet that matches the rule criteria. The most common actions are:

- `alert`: Generates an alert and logs the packet.
- `log`: Logs the packet.
- `pass`: Ignores the packet.
- `drop` (Suricata and Snort's inline mode): Drops the packet and logs it.
- `reject` (Suricata and Snort's inline mode): Blocks the packet and sends a TCP reset if the protocol is TCP or an ICMP port unreachable message if the protocol is UDP.

<a name="rule-protocols"></a>
## 4. Rule Protocols

The protocol defines which IP protocol the rule applies to. It can be:

- `tcp`: Transmission Control Protocol
- `udp`: User Datagram Protocol
- `icmp`: Internet Control Message Protocol
- `ip`: Internet Protocol

<a name="rule-ips-and-ports"></a>
## 5. Rule IPs and Ports

You can define source and destination IP addresses and ports in rules. There's a variety of options, including:

- Single IP address: `192.168.1.1`
- Any IP address: `any`
- IP range: `[192.168.1.1,192.168.1.2]`
- Network CIDR: `192.168.1.0/24`

Ports can be specified similarly. You can use a single port `80`, a range of ports `1024:`, `:1024` or `1024:2048`, or `any` for any port.

<a name="rule-direction-operators"></a>
## 6. Rule Direction

 Operators

The direction operator defines the direction of the traffic that the rule applies to. It can be:

- `->`: From the source IP and port to the destination IP and port.
- `<>`: To and from the source IP and port and the destination IP and port.

<a name="rule-options"></a>
## 7. Rule Options

Options part of the rule provides more specifics about the conditions that a packet should meet. It's included within parentheses `()`. Common options are:

- `msg`: The alert message that will be printed if the rule fires.
- `content`: Looks for specific content in the packet payload.
- `pcre`: Perl Compatible Regular Expressions pattern matching.
- `sid`: The unique ID for the rule. It's crucial for managing and referencing rules.
- `rev`: The revision number of the rule. It's important when updating and managing rules.
- `classtype`: The class type of the rule, which groups it with similar rules.

<a name="writing-your-first-snort/suricata-rule"></a>
## 8. Writing Your First Snort/Suricata Rule

Here is an example of a basic rule and a description of what it does:

```
alert tcp any any -> 192.168.1.0/24 80 (msg:"Possible HTTP GET"; content:"GET"; http_method; sid:1000001; rev:1;)
```

This rule will generate an alert for any TCP packet with any source IP and port going to the CIDR block `192.168.1.0/24` on port 80 with the content "GET" in the HTTP method. The rule has a unique ID `1000001` and a revision number `1`.

<a name="best-practices"></a>
## 9. Best Practices

- Each rule should have a unique `sid`.
- Increase the `rev` number each time you update a rule.
- Use clear and descriptive messages in the `msg` option.
- Don't write overly broad rules; they could result in too many false positives.
- Test your rules in a controlled environment before deploying them into a production environment.
- Regularly update and manage your rules to keep up with the evolving threat landscape.

This guide covers the basics of writing rules for Snort and Suricata. For a deeper understanding, consider referring to their respective official documentation.
