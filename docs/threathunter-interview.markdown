---
layout: page
title: "Threat Hunter Interview Questions"
permalink: /th-interview
---

## What are some common malware locations?
- **Startup Folder**: Malware often places shortcuts or files in the Startup folder to run automatically every time Windows starts up. The path to this folder is typically:
    - `C:\Users\[Username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
    - `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup`

- **System Folder**: The System32 folder contains files that are essential to your Windows OS. Some malware tries to disguise itself by using similar names to legitimate files in this folder. The path is:
    - `C:\Windows\System32`

- **Temporary Files**: Malware often hides in the temporary files folder. The location for this folder is typically:
    - `C:\Users\[Username]\AppData\Local\Temp`

- **AppData Folder**: This folder is used by applications to store settings, files, and data and is another common location for malware. The typical path is:
    - `C:\Users\[Username]\AppData`

- **Download Folder**: This is the default location for downloads from the internet. Always be cautious about what is in this folder.
    - `C:\Users\[Username]\Downloads`

- **Program Files and Program Files (x86)**: These folders are where applications are typically installed. Malware often hides in these locations, especially in less commonly used subfolders. The paths are:
    - `C:\Program Files`
    - `C:\Program Files (x86)`

- **Browser Profiles**: Malware can also hide in the user data or profile directories of web browsers. Here are locations for some common browsers:
    - Chrome: `C:\Users\[Username]\AppData\Local\Google\Chrome\User Data\Default`
    - Firefox: `C:\Users\[Username]\AppData\Roaming\Mozilla\Firefox\Profiles`
    - Edge: `C:\Users\[Username]\AppData\Local\Microsoft\Edge\User Data\Default`

- **Documents Folder**: This is a common location where users store files. Malware can sometimes be found here, often disguised as a document or hidden in a subfolder. The typical path is:
    - `C:\Users\[Username]\Documents`

- **Windows PowerShell Modules**: Malware might attempt to use PowerShell scripts and could leave traces in PowerShell module directories. A common location to check is:
    - `C:\Users\[Username]\Documents\WindowsPowerShell\Modules`

## What are some common malware Registry persistence locations?
- `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run`
- `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run`
- `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce`
- `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce`

## List other locations that may be intersting or useful to a Threat Hunter.
- **Auto-start Extension Points (ASEPs)**: Registry keys used to automatically start a program during or after booting. In addition to the `Run` and `RunOnce` keys mentioned earlier, you might want to check these locations as well:
    - `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders`
    - `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders`
    - `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders`
    - `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run`
    - `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run`
    - `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder`
    - `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\StartupFolder`

- **Services**: Malware can also create or modify Windows service entries. You might want to check these locations:
    - `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services`

- **Internet Explorer**: Modifications to Internet Explorer settings could be a sign of certain types of malware. Relevant keys include:
    - `HKEY_LOCAL_MACHINE\Software\Microsoft\Internet Explorer`
    - `HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer`

- **Browser Helper Objects (BHOs)**: These are DLLs that Internet Explorer loads each time it starts up. Some types of malware install themselves as BHOs.
    - `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects`

- **Windows Sockets (Winsock)**: Malware might install a Layered Service Provider (LSP) to manipulate network traffic.
    - `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\WinSock2\Parameters\Protocol_Catalog9\Catalog_Entries`
    - `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\WinSock2\Parameters\NameSpace_Catalog5\Catalog_Entries`

- **Known DLLs**: Malware may insert entries into the Known DLLs list to ensure they're loaded into memory.
    - `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\KnownDLLs`

- **Security Providers**: Malware can add illegitimate security providers to this list.
    - `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders`

- **Shell Open Command**: Malware often modifies these keys to execute whenever a certain file type is opened.
    - `HKEY_CLASSES_ROOT\*\shell\open\command`
    - `HKEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers`
    - `HKEY_CLASSES_ROOT\Drive\shell\open\command`

    ## Ten Open Ended Threat Hunting Questions
    This list is a work in progress as I have never conducted an interview for a Threat Hunting postion on any of my teams. Initial thoughts were to keep it very open ended, but I'd like to add true / false and multiple choice questions. Ping me if you have thoughts at [christiantaillon@pm.me](mailto:christiantaillon@pm.me).

    1. Can you explain the difference between Threat Hunting and Incident Response and Traditional SOC Triage? How do they work together?

    2. In your experience, which are the most reliable indicators of compromise (IoCs)? What are some of the least reliable?

    3. Can you explain a situation where you used behavioral analysis to identify a potential threat? What techniques or tools did you use?

    4. How do you use threat intelligence feeds in your threat hunting process? Can you provide an example of how you've used this data to improve your organization's security posture?

    5. How would you go about investigating a potential Advanced Persistent Threat (APT)? What are some unique challenges associated with hunting for these threats and how do you address them?

    6. How familiar are you with creating custom scripts or using automation to assist with threat hunting? Can you share a specific example where this improved your work?

    7. Can you talk about a time when your hunt resulted in a false positive or multiple false positives? How did you determine it was a false positive and what was your subsequent action?

    8. How do you ensure that threat hunting activities don't are effective and that you're not duplicating SOC Traige work?

    9. Can you discuss some of your favorite tools to use in any domain of threat hunting?

    10. Assume a situation where a threat bypassed existing security control, you can choose what type of control has been bypassed. What steps would you take to identify, isolate, and mitigate it? How would you prevent threats of a similar nature in the future?
