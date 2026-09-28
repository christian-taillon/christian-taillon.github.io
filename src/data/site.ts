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
  { href: '/', label: 'Home' },
  { href: '/cyberresources', label: 'Security' },
  { href: '/coding-agent-explorer/', label: 'AI & Agents' },
  { href: '/phoenix-cybersecurity-events', label: 'Phoenix' },
  { href: '/about/', label: 'About' },
] as const;
