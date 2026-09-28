import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItem = {
  label: string;
  href: string;
};

interface Props {
  label: string;
  items: readonly NavItem[];
  currentPath: string;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);
const isActive = (currentPath: string, href: string) => {
  if (isExternal(href)) return false;
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href.replace(/\/$/, ''));
};

export function NavDropdown({ label, items, currentPath }: Props) {
  const active = items.some((item) => isActive(currentPath, item.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={[
            'inline-flex items-center gap-1 py-2 transition-colors outline-none',
            active
              ? 'text-foreground font-medium'
              : 'text-foreground/60 hover:text-foreground/80',
          ].join(' ')}
        >
          <span>{label}</span>
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.2 7.4a.75.75 0 0 1 1.06 0L10 11.14l3.74-3.74a.75.75 0 1 1 1.06 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0L5.2 8.46a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-80 max-h-[70vh] overflow-y-auto">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <a
              href={item.href}
              target={isExternal(item.href) ? '_blank' : undefined}
              rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
              className={
                isActive(currentPath, item.href)
                  ? 'font-medium text-foreground'
                  : undefined
              }
            >
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
