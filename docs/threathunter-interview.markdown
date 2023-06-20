---
layout: page
title: "Threat Hunter Interview Questions"
permalink: /th-interview
---
## Ten Threat Hunting Questions
This list is a work in progress as I have never conducted an interview for a Threat Hunting postion on any of my teams. Initial thoughts were to keep it very open ended, but I'd like to add true / false and multiple choice questions. Ping me if you have thoughts at [christiantaillon@pm.me](mailto:christiantaillon@pm.me).

1. Can you explain the difference between Threat Hunting and Incident Response? How do they work together in a cybersecurity framework?

2. In your experience, which are the most reliable indicators of compromise (IoCs)? How do you ensure you don't miss these signs during threat hunting?

3. Can you explain a situation where you used behavioral analysis to identify a potential threat? What techniques or tools did you use?

4. How do you use threat intelligence feeds in your threat hunting process? Can you provide an example of how you've used this data to improve your organization's security posture?

5. How would you go about investigating a potential Advanced Persistent Threat (APT)? What are some unique challenges associated with these threats and how do you address them?

6. How familiar are you with creating custom scripts or using automation to assist with threat hunting? Can you share a specific example where this improved your work?

7. Can you talk about a time when you identified a false positive? How did you determine it was a false positive and what was your subsequent action?

8. How do you ensure that threat hunting activities don't interfere with regular operations in your organization?

9. Can you discuss your experience with sandboxing and how it aids in threat hunting? Can you give an example of a situation where it was particularly effective?

10. Given a situation where a threat bypassed existing security measures, what steps would you take to identify, isolate, and mitigate it? How would you prevent similar threats in the future?


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
