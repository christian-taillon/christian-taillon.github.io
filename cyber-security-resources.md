---
layout: page
title: "Cybersecurity Resources"
description: "A maintained collection of practical cybersecurity frameworks, training, threat intelligence, detection engineering, DFIR, and career resources."
permalink: /cyberresources
---

# Cybersecurity Resources

A practical set of resources I would point defenders, engineers, students, and security leaders toward today. This page intentionally avoids hard-coded pricing, resource counts, and other details that become stale quickly.

**Last reviewed: September 25, 2026.**

## Start Here: Frameworks and Live Reference Data

- **[NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)** - Risk-management framework with implementation guidance, profiles, mappings, and quick-start resources.
- **[MITRE ATT&CK](https://attack.mitre.org/)** - Adversary behavior knowledge base for threat intelligence, detection engineering, hunting, and control validation.
- **[CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)** - High-value input for vulnerability prioritization because entries represent vulnerabilities known to be exploited in the wild.
- **[FIRST EPSS](https://www.first.org/epss/)** - Probability-oriented vulnerability prioritization signal that complements CVSS and KEV.
- **[CIS Controls](https://www.cisecurity.org/controls)** - Prioritized defensive safeguards and implementation groups.
- **[OWASP](https://owasp.org/)** - Application-security projects including the Top 10, ASVS, testing guidance, cheat sheets, and API security material.

## Hands-on Learning

### Free or broadly accessible

- **[PortSwigger Web Security Academy](https://portswigger.net/web-security)** - Excellent web-security learning material paired with interactive labs.
- **[CyLab Security Academy / picoCTF](https://picoctf.org/)** - Carnegie Mellon learning and CTF ecosystem for foundational through advanced practice.
- **[OverTheWire](https://overthewire.org/wargames/)** - Command-line, Linux, web, and exploitation wargames.
- **[Microsoft Learn Security](https://learn.microsoft.com/training/browse/?products=security)** - Microsoft security, identity, Azure, and Defender learning paths.
- **[AWS Skill Builder](https://skillbuilder.aws/)** - AWS security and cloud learning paths.
- **[Google Cloud Skills Boost](https://www.cloudskillsboost.google/)** - Google Cloud security and infrastructure labs.

### Structured lab platforms

- **[TryHackMe](https://tryhackme.com/)** - Guided learning paths and hands-on labs.
- **[Hack The Box Academy](https://academy.hackthebox.com/)** - Structured technical modules and practical exercises.
- **[CyberDefenders](https://cyberdefenders.org/)** - Blue-team, DFIR, threat hunting, and SOC-oriented challenges.

## Detection Engineering and Security Operations

- **[Sigma](https://sigmahq.io/)** - Portable detection-rule format and community rule ecosystem.
- **[YARA](https://yara.readthedocs.io/)** - Pattern-matching language widely used for malware identification and file analysis.
- **[Suricata](https://suricata.io/)** - Network IDS/IPS and network-security monitoring.
- **[Zeek](https://zeek.org/)** - Network telemetry and protocol analysis.
- **[Security Onion](https://securityonionsolutions.com/software)** - Integrated network security monitoring and investigation platform.
- **[osquery](https://www.osquery.io/)** - SQL-style endpoint instrumentation.
- **[Velociraptor](https://docs.velociraptor.app/)** - Endpoint visibility, collection, DFIR, and threat hunting.
- **[Volatility 3](https://volatility3.readthedocs.io/)** - Memory forensics framework.
- **[Timesketch](https://timesketch.org/)** - Collaborative forensic timeline analysis.

### christiant.io references

- [Splunk Cheatsheet](/spl)
- [Splunk Beginner Guide](/spl-beginner)
- [KQL Beginner Guide](/kql-guide)
- [Falcon LogScale / FQL](/logscale)
- [Sigma Rule Guide](/sigma-rule-guide)
- [YARA Rule Guide](/yara-rule-guide)
- [Snort and Suricata Rule Guide](/snort-suricata-guide)
- [Endpoint Forensics](/ep-forensics)

## Threat Intelligence and Vulnerability Research

Use a mix of government advisories, vendor research, and primary technical reporting rather than relying on a single feed.

### Government and public-interest sources

- **[CISA Cybersecurity Advisories](https://www.cisa.gov/news-events/cybersecurity-advisories)**
- **[CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)**
- **[NIST National Vulnerability Database](https://nvd.nist.gov/)**
- **[UK NCSC Guidance](https://www.ncsc.gov.uk/section/advice-guidance/all-topics)**
- **[ENISA Publications](https://www.enisa.europa.eu/publications)**

### Research teams worth following

- **[Google Threat Intelligence / Mandiant](https://cloud.google.com/security/resources)**  
- **[Microsoft Threat Intelligence](https://www.microsoft.com/en-us/security/security-insider/intelligence-reports)**
- **[Palo Alto Networks Unit 42](https://unit42.paloaltonetworks.com/)**
- **[Cisco Talos](https://blog.talosintelligence.com/)**
- **[CrowdStrike Counter Adversary Operations](https://www.crowdstrike.com/en-us/blog/category.counter-adversary-operations/)**
- **[Elastic Security Labs](https://www.elastic.co/security-labs)**
- **[SANS Internet Storm Center](https://isc.sans.edu/)**

## Vulnerability Management

A useful prioritization workflow generally combines:

1. **Exposure** - Is the affected product actually present and reachable?
2. **Known exploitation** - Check CISA KEV and credible threat reporting.
3. **Exploit likelihood** - Use signals such as EPSS.
4. **Technical severity** - Use CVSS and vendor analysis as context, not the only decision point.
5. **Business impact** - Identity, privilege, data, criticality, and blast radius.
6. **Compensating controls** - EDR, segmentation, WAF, hardening, or feature disablement.

Useful sources:

- [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [FIRST EPSS](https://www.first.org/epss/)
- [NVD](https://nvd.nist.gov/)
- [CVE Program](https://www.cve.org/)
- Vendor security advisory portals for the affected product

## Software Supply Chain and Secure Development

- **[OpenSSF](https://openssf.org/)** - Open-source software supply-chain security.
- **[SLSA](https://slsa.dev/)** - Supply-chain integrity framework for software artifacts and build systems.
- **[OWASP Software Component Verification Standard](https://scvs.owasp.org/)** - Guidance for software supply-chain controls.
- **[GitHub Security Lab](https://securitylab.github.com/)** - Vulnerability research and secure-development material.
- **[Secure Package Management on christiant.io](/secure-pkg/)** - Practical npm and Python hardening guidance.

## Cloud, Containers, and Infrastructure

- **[Kubernetes Security Documentation](https://kubernetes.io/docs/concepts/security/)**  
- **[CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)**  
- **[AWS Security Documentation](https://docs.aws.amazon.com/security/)**  
- **[Microsoft Security Documentation](https://learn.microsoft.com/security/)**  
- **[Google Cloud Security](https://cloud.google.com/security)**  
- [Podman vs Docker: Security Angle](/podman-security)
- [Container Device Interface](/cdi)
- [Local LLM Stack Guide](/llm_stack)

## AI and Agent Security

AI tooling changes quickly, so prefer current documentation and observed behavior over static model assumptions.

- [Agent Sandboxing](/ai-agent-sandboxing/)
- [Agentic SOC](/agentic-soc/)
- [LLM Security Guide](/llm_security)
- [Token Guard](/token_guard)
- [Model Family Explorer](/astra-model-explorer/)
- [Coding Agent Explorer](/coding-agent-explorer/)
- [Zero Data Retention Endpoints](/zdr-endpoints/)

The two benchmark explorers intentionally use Artificial Analysis source measurements directly for intelligence/performance, cost per task, and token utilization. They do not apply local GPT price modifiers.

## Career and Workforce

- **[NIST NICE Framework](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center)** - Common language for cybersecurity work roles, tasks, knowledge, and skills.
- **[CyberSeek](https://www.cyberseek.org/)** - U.S. cybersecurity career pathways and workforce data.
- **[SANS / GIAC](https://www.sans.org/)** - Deep technical training and certifications.
- **[ISC2](https://www.isc2.org/)** - Security certifications and professional development.
- **[CompTIA Cybersecurity](https://www.comptia.org/content/it-careers-path-roadmap/cybersecurity-specialist)** - Foundational and intermediate certification paths.
- **[OffSec](https://www.offsec.com/)** - Hands-on offensive-security training and certifications.

For interview preparation on this site:

- [General Cyber Interview](/interview)
- [SOC Interview](/socinterview)
- [Security Engineer Interview](/securityengineer)
- [Threat Hunter Interview](/th-interview)
- [LLM / GenAI Developer Interview](/llmappdev)

## Research and Conference Material

- **[USENIX Security](https://www.usenix.org/conference/usenixsecurity)**
- **[IEEE Symposium on Security and Privacy](https://www.ieee-security.org/TC/SP-Index.html)**
- **[ACM CCS](https://www.sigsac.org/ccs.html)**
- **[NDSS Symposium](https://www.ndss-symposium.org/)**
- **[Black Hat](https://www.blackhat.com/)**
- **[DEF CON](https://defcon.org/)**
- **[CTFtime](https://ctftime.org/)**

## Arizona and Phoenix Community

For local conferences, meetups, professional groups, and community events, see the maintained [Phoenix Cybersecurity Events & Community](/phoenix-cybersecurity-events) page.

---

If a resource on this page becomes stale or materially changes, the goal is to replace or remove it rather than preserve outdated pricing, membership counts, or marketing claims.
