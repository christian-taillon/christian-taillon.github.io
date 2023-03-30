---
layout: page
title: "AtomicTest"
permalink: /atomic
---
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

For binary to not be quarantined, Windows Defender must be disabled on Windows Host running HyperV and Windows10 lab.

Activity should be run from Windows 10 lab.

If the binary was quarantined from the Atomic read team tool kit, you may see the following:
![[Pasted image 20230329101359.png]]
Disable windows defender on the Host and VM and run the following command to rebuilt the binary:

## Set up Tools (and disable Windows Defender)
Note: Run on target Win10 Lab and the Host OS
```powershell
## Quick Script for Effecient Tool Dropping
## Disable Windows Defender Before Downloading Atomic
Set-MpPreference -drtm $True
Set-MpPreference -dbm $True
Set-MpPreference -dscrptsc $True
Set-MpPreference -dbaf $True
## Install Atomic Red Team and Invoke-Atomic in C:\AtomicRedTeam
IEX (IWR 'https://raw.githubusercontent.com/redcanaryco/invoke-atomicredteam/master/install-atomicredteam.ps1' -UseBasicParsing);
Install-AtomicRedTeam -getAtomics
```


## Running Atomic Tests
Run the AtomicTests by typing `Invoke-AtomicTest` into your Powershell terminal. Then type a `-` and the test number you want to run. Review options here: [atomic](https://atomicredteam.io/atomics/)
Note some
```powershell
# If you want to run the first and second Atomic test for Technique T1218.010
Invoke-AtomicTest T1218.010-1,2
# or using the long form
Invoke-AtomicTest T1218.010 -TestNumbers 1,2
# or using the short form ..
```
If you run things manually, be sure to run the cleanup. If you let `Invoke-AtomicTest` run the test, it will clean up after its self.

## Generic and Recognizable Techniques Using Atomic
T1053.005-1 Scheduled Task Startup Script
```powershell
Invoke-AtomicTest T1053.005-1
```
T1012.1 Query a Registry
T1112-1	Modify Registry
T1615-1 Group Policy Discovery
T1615-2 Group Policy Discovery
T1082-1	System Information Discovery
T1003.001-1 OS Credential Dumping: LSASS


## IcedID Emulation
IcedID is a banking trojan with three major variants that is currently making the news.

T1553.005
Mount an ISO image and run executable from the ISO
```powershell
Invoke-AtomicTest T1553.005-1
```
T1016
System Network Configuration Discovery on Windows
```powershell
Invoke-AtomicTest T1016
```
T1518.001
Security Software Discovery - AV Discovery via WMI
```powershell
Invoke-AtomicTest T1518.001
```
T1082
System Information Discovery
```powershell
Invoke-AtomicTest T1082
```
T1482
Windows - Discover domain trusts with nltest
```powershell
Invoke-AtomicTest T1482
```
T1053.005
Scheduled Task Startup Script
```powershell
Invoke-AtomicTest T1053.005
```
T1055.012
Process Hollowing using PowerShell
```powershell
Invoke-AtomicTest T1055.012
```

### All attacks compiled
```powershell
Invoke-AtomicTest T1553.005-1
Invoke-AtomicTest T1016
Invoke-AtomicTest T1518.001
Invoke-AtomicTest T1082
Invoke-AtomicTest T1482
Invoke-AtomicTest T1053.005
Invoke-AtomicTest T1055.012
```

### Extended
T1082-1	System Information Discovery
T1105-7 Ingress Tool Transfer
T1069.002-1 Domain Groups
T1566.001-1 Spearphishing Attachment
T1055.004-1 Asynchronous Procedure Call
T1218.007-1 Msiexec
T1053.005-1 Scheduled Task/Job: Scheduled Task
T1547.009-1  Boot or Logon Autostart Execution: Shortcut Modification
T1204.002-1	Malicious File

### Extended Untested
T1071.001-1 Web Protocols
T1547.001-1 Registry Run Keys / Startup Folder
T1546.013-1 Event Triggered Execution: PowerShell Profile
T1564.003 Hide Artifacts: Hidden Window
T1105-7 Ingress Tool Transfer
T1027.002-1	Software Packing

## Simple Path
Fail a Password Logon
Reset a Password
Query a Registry
