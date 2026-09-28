export const SITE = {
  name: 'Christian Taillon',
  shortName: 'christiant.io',
  description:
    "Christian Taillon's cybersecurity and AI resource hub with practical guides, research, tools, and community resources.",
  url: 'https://christiant.io',
  email: 'public@christiant.io',
  github: 'https://github.com/christian-taillon',
  linkedin: 'https://linkedin.com/in/christiantaillon',
  twitter: 'https://twitter.com/christian_tail',
  medium: 'https://medium.com/christiantaillon',
  defaultImage: '/image/professional_circle.png',
  analyticsId: 'G-R34BHCHXE0',
} as const;

export const NAV = [
  {
    label: 'Security',
    items: [
      { label: 'Phoenix Cyber Events', href: '/phoenix-cybersecurity-events' },
      { label: 'Splunk Cheatsheet', href: '/spl' },
      { label: 'Splunk Beginner Guide', href: '/spl-beginner' },
      { label: 'KQL Beginner Guide', href: '/kql-guide' },
      { label: 'Falcon LogScale (FQL)', href: '/logscale' },
      { label: 'Sigma Rule Guide', href: '/sigma-rule-guide' },
      { label: 'ClamAV Guide', href: '/clamav-guide' },
      { label: 'YARA Rule Guide', href: '/yara-rule-guide' },
      { label: 'SNORT Rule Guide', href: '/snort-suricata-guide' },
      { label: 'Cyber Security Resources', href: '/cyberresources' },
      { label: 'Gists', href: 'https://gist.github.com/christian-taillon' },
      { label: 'Endpoint Forensics', href: '/ep-forensics' },
      { label: 'Sith CheatSheet: Kali', href: '/sith-cheatsheet' },
      { label: 'Recon-ng Guide', href: '/recon-ng' },
      { label: 'DNS OSINT PDF', href: '/download/dns-guide-awnsers.pdf' },
    ],
  },
  {
    label: 'Threat Hunting & Intel',
    items: [
      { label: 'APTTracker.md', href: 'https://github.com/christian-taillon/apt-tracker-md' },
      { label: 'Detect-AutoIT', href: 'https://github.com/christian-taillon/detect-autoit' },
      { label: 'SigmaGUI', href: 'https://github.com/christian-taillon/SigmaGUI' },
      { label: 'Atomic Guide', href: '/atomic' },
      {
        label: 'Part-time Threat Hunting: Considering its Efficacy',
        href: 'https://christiantaillon.medium.com/part-time-threat-hunting-considering-its-efficacy-85598a9d339',
      },
      {
        label: 'Prophet Spider Exploits Citrix ShareFile to Deploy Webshell',
        href: 'https://christiantaillon.medium.com/prophet-spider-exploits-citrix-sharefile-to-deploy-webshell-d2689abd4301',
      },
      {
        label: 'QakBot Detection: DUCK HUNT',
        href: 'https://christiantaillon.medium.com/qakbot-detection-duck-hunt-aa0cadb398a7',
      },
      {
        label: 'QakBot Detection: DUCK HUNT Part 2',
        href: 'https://christiantaillon.medium.com/qakbot-detection-duck-hunt-part-2-a93ea2498211',
      },
      { label: 'Log4j', href: 'https://github.com/christian-taillon/log4shell-hunting' },
      { label: 'Sunburst', href: 'https://github.com/christian-taillon/sunburst-hunting' },
      {
        label: 'Various Search Leads',
        href: 'https://github.com/christian-taillon/threat-hunting-searches',
      },
      {
        label: 'Darkside Ransomware Operators',
        href: 'https://christiantaillon.medium.com/what-do-we-actually-know-about-the-darkside-ransomware-operators-5a1523094899',
      },
      {
        label: 'GitHub Actions Abuse by Cryptominers',
        href: 'https://christiantaillon.medium.com/github-actions-abuse-by-cryptominers-8492e88e1400',
      },
    ],
  },
  {
    label: 'Dev & Projects',
    items: [
      { label: 'Splunk Docker', href: '/splunkdocker' },
      { label: 'Podman vs Docker: Security', href: '/podman-security' },
      { label: 'Splunk BOTSv2 Walkthrough', href: '/splunkbotsv2' },
      { label: 'Git CheatSheet', href: '/git-cheatsheet' },
      { label: 'Secure Package Management', href: '/secure-pkg' },
      { label: 'RC Files', href: '/rc-files' },
      { label: 'AutoIT-Seeker', href: 'https://github.com/christian-taillon/AutoIT-Seeker' },
      { label: 'Container Device Interface', href: '/cdi' },
      { label: 'ParetoPi', href: '/paretopi' },
      { label: 'DockerPihole', href: 'https://github.com/christian-taillon/docker-pihole' },
      {
        label: 'Splunk Windows Forwarder',
        href: 'https://github.com/christian-taillon/splunk_win_uf',
      },
      { label: 'Programming Basics', href: '/program-concept' },
      { label: 'Python3 Virtual Environments', href: '/pyhon3virt' },
      {
        label: 'File Arrangement & Sorting Tool',
        href: 'https://github.com/christian-taillon/fast',
      },
    ],
  },
  {
    label: 'AI & ML',
    items: [
      { label: 'Model Family Explorer', href: '/astra-model-explorer/' },
      { label: 'Coding Agent Explorer', href: '/coding-agent-explorer/' },
      { label: 'Agent Sandboxing', href: '/ai-agent-sandboxing/' },
      { label: 'Agentic SOC', href: '/agentic-soc/' },
      { label: 'Token Guard', href: '/token_guard' },
      { label: 'Local LLM Stack Guide', href: '/llm_stack' },
      {
        label: 'AI Pipelines GitHub',
        href: 'https://github.com/christian-taillon/open-webui-pipelines',
      },
      { label: 'LLM Security Guide', href: '/llm_security' },
      {
        label: 'Enterprise GenAI Risk Slides',
        href: '/download/GenerativeAI Risk Mitigation.pdf',
      },
    ],
  },
  {
    label: 'Interviews',
    items: [
      { label: 'General Cyber Interview', href: '/interview' },
      { label: 'SOC Interview', href: '/socinterview' },
      { label: 'Security Engineer', href: '/securityengineer' },
      { label: 'Threat Hunter', href: '/th-interview' },
      { label: 'LLM / GenAI Developer', href: '/llmappdev' },
      {
        label: 'InfoSec Resources',
        href: 'https://github.com/christian-taillon/infosec-resources',
      },
    ],
  },
  { label: 'About', href: '/about/' },
] as const;
