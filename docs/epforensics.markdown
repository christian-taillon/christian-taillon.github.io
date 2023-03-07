---
layout: page
title: "Endpoint Forensics"
permalink: /ep-forensics
---
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

# The Forensics Process
1. Data Acquisition
2. Data Recovery
3. Data Analysis
4. Data Report

# Contain | Remediate | Restore

# DISK | MEMORY | NETWORK | REGISTRY  | LOG ANALYSIS

# Disk Imaging, Recovery, and Analysis
FTK Imager | DD
- Acquisition - File -> Create Disk Image - Physical Drive
- Analysis - File -> Add Evidence Item - Image File
Analysis - Autopsy GUI (SluethKit)

# Memory

### Why?
System Process
Running services
Passwords
Accessed Files and Multimedia
Running Applications
Email/Chats  | Browser Sessions | Clipboard | Malware

FTK Imager
Acquisition - File -> Capture Memory

### Windows Memory
pagefile.sys used to store virtual memory
hiberfil.sys - created when windows hybernates
swapfile.sys - used to store idle and inactive process data

### VM Memory
.vmem	vmware.vmem	Virtual Machine volatile memory file
.vmss	vmname.vmss	Virtual machine suspend file
https://kb.vmware.com/s/article/2003941
https://github.com/onSec-fr/VBoxDump-GUI

## Volatility Address Space Support
Address Spaces
--------------
- AMD64PagedMemory               - Standard AMD 64-bit address space.
- ArmAddressSpace                - Address space for ARM processors
- FileAddressSpace               - This is a direct file AS.
- HPAKAddressSpace               - This AS supports the HPAK format
- IA32PagedMemory                - Standard IA-32 paging address space.
- IA32PagedMemoryPae             - This class implements the IA-32 PAE paging address space. It is responsible
- LimeAddressSpace               - Address space for Lime
- LinuxAMD64PagedMemory          - Linux-specific AMD 64-bit address space.
- MachOAddressSpace              - Address space for mach-o files to support atc-ny memory reader
- OSXPmemELF                     - This AS supports VirtualBox ELF64 coredump format
- QemuCoreDumpElf                - This AS supports Qemu ELF32 and ELF64 coredump format
- SkipDuplicatesAMD64PagedMemory - Windows 8/10-specific AMD 64-bit address space.
- VMWareAddressSpace             - This AS supports VMware snapshot (VMSS) and saved state (VMSS) files
- VMWareMetaAddressSpace         - This AS supports the VMEM format with VMSN/VMSS metadata
- VirtualBoxCoreDumpElf64        - This AS supports VirtualBox ELF64 coredump format
- WindowsAMD64PagedMemory        - Windows-specific AMD 64-bit address space.
- WindowsCrashDumpSpace32        - This AS supports windows Crash Dump format
- WindowsCrashDumpSpace64        - This AS supports windows Crash Dump format
- WindowsCrashDumpSpace64BitMap  - This AS supports Windows BitMap Crash Dump format
- WindowsHiberFileSpace32        - This is a hibernate address space for windows hibernation files.

# Registry
Acquisition
- regedit: Right Click Computer -> Export save as .reg
- reg export HKLM\
- FTK Imager - File -> Obtain -> Protected Files -> Password recovery and all registry files
-- To extract from forensic image:  search directory path `%SystemRoot%\System32\Config`. Right click the file you want and select export. For NTUSER.DAT repeat the procedure at `C:\Users\$user$`
RECmd - https://github.com/EricZimmerman/RECmd
- check for dirty hives

# Extra
Arsenal Image Mounter https://arsenalrecon.com/products/
Kape
https://www.nirsoft.net/
ShellBags Explorer
https://www.sans.org/blog/computer-forensic-artifacts-windows-7-shellbags/
JumpList Explorer
Magnet Axiom
SQL Lite Browser
https://github.com/sqlitebrowser/sqlitebrowser
https://twitter.com/ericrzimmerman/status/968897244232671234?lang=en
Shadow Explorer
https://www.shadowexplorer.com/downloads.html
