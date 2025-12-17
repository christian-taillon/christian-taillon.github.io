---
layout: page
title: "Daily Tactical Threat Briefing - December 15, 2025"
description: "Analysis of active exploitation of GeoServer CVE-2025-58360 and Sierra Wireless router vulnerabilities."
date: 2025-12-15
---

### 🚨 Daily Tactical Threat Briefing - December 15, 2025

Analyze the top 2-3 trending threats from the last 24 hours:

#### Threat Name/Identifier: Active Exploitation of CVE-2025-58360 (GeoServer)

> **Summary:**
> CISA has ordered federal agencies to immediately patch a critical XXE vulnerability (CVE-2025-58360) in GeoServer following confirmed active exploitation in the wild. Attackers are leveraging this flaw to read arbitrary files, perform SSRF, and potentially achieve remote code execution if misconfigured. This marks the third actively exploited GeoServer vulnerability in just over a year, signaling a persistent targeting of GIS infrastructure by threat actors.

**Tactical Intelligence:**

- **Mitigation:** Link to official advisory (if available). [Apply patches immediately; Restrict access to OGC service endpoints].
- **IOCs & Artifacts:**
  - **Domains/IPs:** [Monitor for connections to known malicious C2s - Specific IPs vary by campaign]
  - **Hashes:** [N/A - Payload is XML-based]
  - **Filenames:** `web.xml`, `/etc/passwd` (Common targets for XXE retrieval)
- **Detection Logic:**
  - Monitor WFS/WMS endpoints for XML bodies containing `<!ENTITY` or `SYSTEM` directives.

```splunk
index=web_logs url="*/wfs*" OR url="*/wms*" method=POST
| regex _raw="<!ENTITY|SYSTEM|file://"
| table _time, src_ip, url, user_agent
```

#### Threat Name/Identifier: Sierra Wireless AirLink Routers (CVE-2018-4063) Added to KEV

> **Summary:**
> CISA has added the older Sierra Wireless AirLink vulnerability (CVE-2018-4063) to its Known Exploited Vulnerabilities (KEV) catalog after confirming active exploitation by a new threat cluster, "Chaya_005". This flaw allows unauthenticated attackers to overwrite system files and execute arbitrary code by uploading malicious templates. The resurgence of this 2018 vulnerability highlights the risk of neglected OT/IoT firmware updates.

**Tactical Intelligence:**

- **Mitigation:** Update firmware for AirLink ES450 and related models. Restrict access to the ACEmanager interface (port 9191/9443).
- **IOCs & Artifacts:**
  - **Domains/IPs:** [Chaya_005 infrastructure]
  - **Hashes:** [N/A]
  - **Filenames:** `fw_upload_init.cgi`, `fw_status.cgi`
- **Detection Logic:**
  - Look for POST requests to `/cgi-bin/upload.cgi` attempting to upload files matching existing system binaries.

```splunk
index=firewall_logs url="/cgi-bin/upload.cgi" method=POST
| regex uri_query="fw_upload_init\.cgi|fw_status\.cgi"
| table _time, src_ip, dest_ip, url
```

### Sources

- CSO Online: [CISA orders immediate patching as GeoServer flaw faces active exploitation](https://www.csoonline.com/article/4106332/cisa-orders-immediate-patching-as-geoserver-flaw-faces-active-exploitation.html)
- The Hacker News: [CISA Adds Actively Exploited Sierra Wireless Router Flaw](https://thehackernews.com/2025/12/cisa-adds-actively-exploited-sierra.html)
- GreyNoise: [Active Exploitation of PAN-OS CVE-2025-0108](https://www.greynoise.io/blog/greynoise-observes-active-exploitation-of-pan-os-authentication-bypass-vulnerability-cve-2025-0108)
