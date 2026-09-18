export const SITE = {
  name: 'Christian Taillon',
  domain: 'christiant.io',
  url: 'https://christiant.io',
  description:
    'Cybersecurity and AI resources, guides, tools, and research by Christian Taillon.',
  github: 'https://github.com/christian-taillon',
  linkedin: 'https://www.linkedin.com/in/christiantaillon',
  medium: 'https://medium.com/@christiantaillon',
  email: 'mailto:public@christiant.io',
} as const;

export const NAV_ITEMS = [
  {
    label: 'Security',
    children: [
      { href: '/phoenix-cybersecurity-events', label: 'Phoenix Cyber Events' },
      { href: '/spl', label: 'Splunk Cheatsheet' },
      { href: '/spl-beginner', label: 'Splunk Beginner Guide' },
      { href: '/kql-guide', label: 'KQL Beginner Guide' },
      { href: '/logscale', label: 'Falcon LogScale' },
      { href: '/sigma-rule-guide', label: 'Sigma Rule Guide' },
      { href: '/yara-rule-guide', label: 'YARA Rule Guide' },
    ],
  },
  {
    label: 'AI',
    children: [
      { href: '/gpt-5-6-value-analysis/', label: 'GPT-5.6 Value Map' },
      { href: '/astra-model-explorer/', label: 'Astra Model Explorer' },
      { href: '/coding-agent-explorer/', label: 'Coding Agent Explorer' },
      { href: '/ai-agent-sandboxing', label: 'Agent Sandboxing' },
      { href: '/agentic-soc', label: 'Agentic SOC' },
      { href: '/llm_security', label: 'LLM Security Guide' },
    ],
  },
  {
    label: 'Projects',
    children: [
      { href: '/secure-pkg/', label: 'Secure Package Management' },
      { href: '/rc-files', label: 'RC Files' },
      { href: '/splunkdocker', label: 'Splunk Docker' },
      { href: '/git-cheatsheet', label: 'Git Cheatsheet' },
      { href: 'https://github.com/christian-taillon', label: 'GitHub' },
    ],
  },
  { href: '/about', label: 'About' },
] as const;
