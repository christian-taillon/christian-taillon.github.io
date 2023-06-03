---
layout: page
title: "Splunk Beginner Cheatsheet"
permalink: /spl-beginner
---
# Splunk Search Processing Language (SPL) - Beginner's Cheat Sheet

SPL is a powerful language that's used in Splunk to search, analyze and visualize the machine-generated data.

---

## Basic Searching

**Format:** `index=<index-name> sourcetype=<source-type> <search-string>`

- **index:** This is the name of the index where the data is stored.
- **sourcetype:** The source type of the data.
- **search-string:** The string to search for in the index.

Example: `index=main sourcetype=syslog error`

---

## Time Range

- **earliest:** To specify the earliest time.
- **latest:** To specify the latest time.

Example: `index=main sourcetype=syslog error earliest=-1h latest=now`

---

## Filtering and Formatting

**Format:** `field=<field-value>`

- **field:** This specifies the field to filter the data by.

Example: `index=main sourcetype=syslog error | where host="localhost"`

---

## Using Functions

**Format:** `function(<field-name>)`

Example: `index=main sourcetype=syslog error | stats count by host`

---

## Statistical and Aggregating Commands

- **top:** Returns the most common values of a field.
- **rare:** Returns the least common values of a field.
- **stats:** Provides statistical functions like count, sum, avg, min, max etc.
- **chart:** Used to create data series, charts etc.

Examples:
```SPL
index=main sourcetype=syslog error | top limit=10 host
index=main sourcetype=syslog error | stats count by host
index=main sourcetype=syslog error | chart count by host
```

---

## Sorting and Grouping
- **sort:** Sorts the results by the specified filed(s).
- **dedup:** Removes duplicate values from the specified field(s).

Examples:
```SPL
index=main sourcetype=syslog error | sort - host
index=main sourcetype=syslog error | dedup host
```

---

## Subsearches
**Format: [search <subsearch-string>]**

Examples:
```SPL
Example: index=main sourcetype=syslog error [search index=main sourcetype=syslog error | top limit=1 host]
```

---

## Saving and Scheduling Searches

**Saved search:** These are searches that are saved for reuse.
**Scheduled search:** These are saved searches that are scheduled to run at specified times.

---
