---
layout: page
title: "LogScale Query Language: Beginner"
permalink: /logscale_beg_guide
---
# LogScale Query Language (LQL) Guide for SOC Analysts

This guide is tailored for SOC analysts who are transitioning from Splunk to LogScale and focuses on the essentials of filtering through events and exploring data using LogScale's Query Language (LQL). It covers query filters, free-text filters, field filters, regular expression filters, and logical operators, using specific field names and event examples relevant to security operations.

Grab a cup of coffee ☕, login to Crowdstrike or your LogScale instance and let's get started.

## Query Filters

Query filters in LogScale allow for precise searches using free text, field matches, and regular expressions. They enable analysts to narrow down search results effectively.

### Basic Syntax

- **Implicit AND**: LogScale supports an implicit AND between filters, meaning that multiple filters applied in sequence are combined as if connected by AND.
- **Logical Operators**:
  - `AND` combines filters: `filter1 AND filter2`.
  - `OR` for alternatives: `filter1 OR filter2`.
  - `NOT` to exclude: `NOT filter`.

### Structure

- **Primary Filters**: Utilize operations like `=`, `like`, `!=`, `<`, `<=`, `>`, `>=` on field names or free text.
- **Field Names**: Can be straightforward or enclosed in quotes for special characters.
- **Grouping**: Parentheses `()` are used to group filters for complex queries.

## Free-Text Filters

Free-text filters search across all fields for specified strings, excluding special fields like `@id`, `@timestamp`, `@ingesttimestamp`, and tags.

- **Basic Queries**:
  - Searching for a specific error code in any field: `404`.
  - To find a specific error message: `"Access Denied"`.
  - Regular expression search for IP addresses: `/192\.168\.1\.\d+/`.
  - Case-insensitive search for a username: `/admin/i`.

## Field Filters

Field filters target specific event fields, enhancing the precision of searches by focusing on text or numerical data.

- **Examples**:
  - To find events where the `ComputerName` contains "Server": `ComputerName = *Server*`.
  - Events where `Status` is not "200 OK": `Status != "200 OK"`.
  - Searching for events with a specific `LocalIP`: `LocalIP = "192.168.1.10"`.

## Regular Expression Filters

Regular expressions offer advanced pattern matching for field-specific searches or across all event fields.

- **Syntax**:
  - To match an IP pattern in any field: `/10\.10\.\d+\.\d+/`.
  - Searching within the `FilePath` field for logs: `FilePath = /C:\\Windows\\System32\\/`.

## Logical Operators

Combine filters with logical operators to refine searches, allowing for complex query construction.

- **AND, OR, NOT**:
  - To match events with a specific `ComputerName` and `Status`: `ComputerName = *Server* AND Status = "200 OK"`.
  - Events with either "Error" or "Warning" in `@rawstring`: `"Error" OR "Warning"`.
  - Excluding a specific `LocalIP`: `NOT LocalIP = "192.168.1.10"`.

## Using Specific Fields and Events

When constructing queries, using specific field names and understanding the structure of your events is crucial. For example, to filter events related to a new script being written:

- **Event Name Filter**: `#event_simpleName = "NewScriptWritten"`.
- **Combining Filters**: To find such events from a specific source IP: `#event_simpleName = "NewScriptWritten" AND LocalIP = "192.168.1.10"`.
