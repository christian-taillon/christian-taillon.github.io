---
layout: page
title: "Falcon LogScale (FQL) Cheatsheet"
description: "Comprehensive Falcon LogScale (FQL) cheatsheet for security engineers. Master filters, aggregations, time charts, joins, and regex for effective threat hunting and log analysis."
permalink: /logscale
---
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

## Falcon LogScale (FQL) Quick Reference

This cheatsheet provides essential commands and syntax for the Falcon LogScale Query Language (FQL), designed for Security Operations and Threat Hunting.

### 🔍 Basic Filtering & Searching

**Free Text Search**
Search for a string across all fields (case-insensitive by default in free text).
```
"failed password"
```

**Field Comparison**
```
#event_simpleName = "ProcessRollup2"
| LocalIP = "192.168.1.5"
| User != "SYSTEM"
```

**Wildcards & Regex**
```
CommandLine = "*powershell*"
| CommandLine = /(-enc|-encodedcommand)/i
```

**CIDR Matching**
Check if an IP is in a subnet.
```
cidr(LocalIP, subnet=["10.0.0.0/8", "192.168.0.0/16"])
| !cidr(RemoteIP, subnet="203.0.113.0/24")
```

**Check for Existence**
```
User = *   // Field exists
| User != * // Field does not exist
```

---

### 📊 Aggregations & Statistics

**Count Events**
```
count()
```

**Group By Field**
Count events by a specific field.
```
groupBy(User)
| groupBy([User, ComputerName])
```

**Top Values**
Find the most frequent values.
```
top(User, limit=10)
```

**Stats Functions**
Calculate min, max, average, etc.
```
sum(BytesSent)
| avg(Duration)
| min(ResponseTime)
| max(ResponseTime)
```

**Unique Count (Cardinality)**
Approximation of unique values.
```
count(distinct(User))
```

---

### 📈 Time Operations

**Timechart**
Visualize data over time. Defaults to `count()`.
```
timechart()
| timechart(function=count(), series=User)
| timechart(function=avg(ResponseTime), series=Host)
```

**Bucket (Binning)**
Group events into time buckets without charting.
```
bucket(span=1h)
```

---

### 🛠️ String & JSON Operations

**Regex Extraction**
Extract data into a new field using a named capture group `?<>`.
```
regex("(?<ErrorParam>Error\s\d+)", field=Message)
```

**JSON Extraction**
Parse JSON content from a raw string.
```
parseJson(RawLog)
| parseJson(Details, prefix="json_")
```

**String Formatting**
Create new fields based on existing ones.
```
format("%s\\%s", field=[Domain, User], as=FullUser)
```

**Case Conversion**
```
lower(User)
| upper(ComputerName)
```

---

### 🔗 Joins & Lookups

**Join**
Combine data from two searches.
```
// Main search
#event_simpleName="ProcessRollup2"
| join({#event_simpleName="NetworkConnect"}, field=ContextProcessId, include=[RemoteIP, RemotePort])
```

**Match (Lookup)**
Enrich data using a CSV file or lookup table.
```
match(file="malicious_ips.csv", field=RemoteIP, include=[ThreatGroup, Confidence])
```

---

### 🛡️ Threat Hunting Use Cases

**Detect PowerShell Encoding**
Find Base64 encoded commands.
```
#event_simpleName="ProcessRollup2"
| FileName = "powershell.exe"
| CommandLine = /(-enc|-encodedcommand)\s+/i
```

**Rare Parent-Child Process Relationships**
Identify unusual process spawning.
```
#event_simpleName="ProcessRollup2"
| groupBy([ParentBaseFileName, FileName])
| sort(count, limit=20, order=asc)
```

**High Volume of Failed Logins**
Detect potential brute force attempts.
```
#event_simpleName="UserLogon"
| LogonType = "Network"
| Status = "Failure"
| timechart(series=UserName, span=5m)
```

**Network Connections to Rare Countries**
Requires IP location database integration.
```
#event_simpleName="NetworkConnect"
| ipLocation(RemoteIP)
| groupBy(Country)
| sort(count, limit=10, order=asc)
```

**Long-Tail Analysis (Least Frequency)**
Find the rarest user agents or command lines.
```
groupBy(UserAgent)
| sort(count, limit=10, order=asc)
```

---

### 💡 Tips & Tricks

- **Case Sensitivity**: FQL functions (like `regex`) can be case-sensitive. Use the `i` flag in regex for case-insensitive matching (`/pattern/i`).
- **Comments**: Use `//` for single-line comments in your queries to explain logic.
- **Piping**: The pipe `|` is used to pass results from one function to the next, similar to Unix or Splunk (SPL).
- **Arrays**: Many functions accept arrays `[]`. Example: `groupBy([Field1, Field2])`.
