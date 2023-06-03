---
layout: page
title: "KQL Beginner Guide"
permalink: /kql-guide
---
Absolutely, here is the entire guide inside a Markdown code block:

```markdown
# Kibana Query Language (KQL) Beginner's Guide

Kibana Query Language, or KQL, is a powerful tool used in Elasticsearch and Kibana to filter data in a more granular way. This guide will introduce you to basic syntax and examples of KQL.

## Understanding KQL

In Kibana, the search bar at the top of the page is where you can input KQL queries. You can search for specific records, filter data, or even analyze trends over time.

KQL has auto-complete suggestions which can help you build your queries.

## Basic KQL Syntax

**Field Names and Values:**

To query a specific field, you can use the following syntax:

```bash
field_name: "field_value"
```

For example, if you're searching for records with a status of "error," you could write:

```bash
status: "error"
```

**Logical Operators:**

KQL supports `AND`, `OR`, and `NOT` operators. Here are a few examples:

```bash
status: "error" AND extension: "log"
status: "success" OR status: "error"
NOT status: "error"
```

**Wildcards:**

You can use the wildcard `*` in your queries:

```bash
status: "err*"
```

**Ranges:**

Ranges can be specified with `{}` for inclusive ranges and `[]` for exclusive ranges:

```bash
bytes: [100 TO 1000]
age: {20 TO 30}
```

**Existence of Field:**

You can check if a field exists or not:

```bash
_field_:*
```

## Examples

Here are some examples of KQL queries:

```bash
status: "error" AND extension: "log"
bytes: [100 TO 1000]
```
```
