---
layout: page
title: "Logscale Query Language: Cheatsheet"
permalink: /logscale
---
# LogScale Query Language (LQL)

This cheat sheet provides quick reference examples for SOC analysts using LogScale, with a fun twist using coffee-related queries. It's designed to help you filter through events and explore data efficiently.

Cheers ☕

## Basic Query Structure

- **Implicit AND**: `Espresso MachineError`
- **Explicit AND**: `Espresso AND WaterLeak`
- **OR**: `Latte OR Cappuccino`
- **NOT**: `NOT Decaf`

## Free-Text Filters

Search for strings across all fields, excluding special fields like `@id`, `@timestamp`, etc.

- **Single Word**: `Espresso`
- **Phrase**: `"Coffee Grind Size"`
- **Regular Expression**: `/milk.*foam/`
- **Case-Insensitive Regex**: `/cappuccino/i`

## Field Filters

Target specific event fields for text or numbers.

- **Contains**: `MachineType = *Espresso*`
- **Exact Match**: `Beverage = "Flat White"`
- **Not Equal**: `Status != "Error"`
- **Exists**: `CoffeeBrand = *`
- **Does Not Exist**: `MaintenanceRecord != *`

## Regular Expression Filters

Use regular expressions for pattern matching in specific fields or across all fields.

- **Field-Specific Regex**: `ErrorDetails = /temperature.*high/`
- **Global Regex Search**: `/decaf espresso/`

## Logical Operators

Combine filters to refine searches.

- **AND Combination**: `MachineType = Espresso AND Error = true`
- **OR Combination**: `Beverage = "Americano" OR Beverage = "Espresso"`
- **NOT Exclusion**: `NOT Beverage = "Decaf"`
- **Grouping**: `(Beverage = "Latte" OR Beverage = "Cappuccino") AND Temperature > 65`

## Special Queries

- **Event Name Filter**: `#event_simpleName = "CoffeeOrder"`
- **Specific IP and Event**: `IPAddress = "192.168.1.5" AND #event_simpleName = "MaintenanceScheduled"`
- **Time Range**: `@timestamp > "2024-02-01T00:00:00Z" AND @timestamp < "2024-02-28T23:59:59Z"`

## Negating Filter Functions

- **Exclude Specific Subnet**: `!cidr(ip, subnet="10.10.0.0/16")`
- **Exclude Specific Values**: `!in(Beverage, values=["Decaf", "Instant"])`

Remember, this cheat sheet is a quick reference guide. For more complex queries and functions, refer to the detailed LogScale documentation.
