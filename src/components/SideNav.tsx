import { Icon } from '@iconify/react';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

import { menuItems } from '../constants/menuItems';

export default function SideNav({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <nav
      id="side-nav"
      aria-label="Main"
      className={clsx(
        'w-56 shrink-0 border-r border-hairline bg-canvas p-4 md:block',
        open ? 'block' : 'hidden',
      )}
    >
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={onNavigate}
              className="flex h-10 items-center gap-3 rounded-md border-l-2 border-transparent px-3.5 text-body-sm font-medium text-muted outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15"
              activeProps={{ className: 'border-primary bg-surface-card text-ink', 'aria-current': 'page' }}
            >
              <Icon icon={item.icon} width={20} height={20} aria-hidden />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
