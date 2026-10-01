import { Icon } from '@iconify/react';
import { useState } from 'react';

import { useAuth } from '../hooks/use-auth';
import { currentTheme, setTheme } from '../utils/theme';

const iconButton =
  'flex size-10 items-center justify-center rounded-full border border-hairline bg-canvas text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15';

export default function Header({ navOpen, onToggleNav }: { navOpen: boolean; onToggleNav: () => void }) {
  const { user, logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [theme, setThemeState] = useState(currentTheme);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-hairline bg-canvas px-4 text-body-sm font-medium text-ink">
      <button
        type="button"
        onClick={onToggleNav}
        aria-label="Toggle navigation"
        aria-expanded={navOpen}
        aria-controls="side-nav"
        className={`${iconButton} md:hidden`}
      >
        <Icon icon={navOpen ? 'lucide:x' : 'lucide:menu'} width={20} height={20} aria-hidden />
      </button>

      <span className="flex items-center gap-3 font-display text-display-sm text-ink">
        {/* Logo mark: token-coloured so it follows light/dark theme. */}
        <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
          <g className="fill-accent-amber stroke-accent-amber">
            <line x1="6" y1="2" x2="6" y2="22" strokeWidth="1.5" />
            <rect x="3" y="7" width="6" height="8" rx="1" />
          </g>
          <g className="fill-primary stroke-primary">
            <line x1="14" y1="2" x2="14" y2="22" strokeWidth="1.5" />
            <rect x="11" y="10" width="6" height="9" rx="1" />
          </g>
          <g className="fill-primary-active stroke-primary-active">
            <line x1="21" y1="4" x2="21" y2="20" strokeWidth="1.5" />
            <rect x="18" y="8" width="6" height="6" rx="1" />
          </g>
        </svg>
        <span>
          Wealth<span className="text-primary">Pulse</span>
        </span>
      </span>

      <button
        type="button"
        onClick={() => {
          const next = theme === 'dark' ? 'light' : 'dark';
          setTheme(next);
          setThemeState(next);
        }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        className={`${iconButton} ml-auto`}
      >
        <Icon icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'} width={20} height={20} aria-hidden />
      </button>

      {user && (
        // Native <details> gives open/close + keyboard support without extra state.
        <details className="relative">
          <summary className={`${iconButton} cursor-pointer list-none`} aria-label="Account menu">
            <Icon icon="lucide:user" width={20} height={20} aria-hidden />
          </summary>
          <div className="absolute right-0 z-20 mt-2 w-60 rounded-lg bg-surface-card p-4">
            <p className="text-ink">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-body-sm font-normal text-muted">{user.email}</p>
            <p className="mt-2 inline-block rounded-full bg-canvas px-3 py-1 text-caption capitalize">
              {user.role}
            </p>
            <button
              type="button"
              onClick={() => {
                setSigningOut(true);
                void logout();
              }}
              disabled={signingOut}
              className="mt-4 h-10 w-full rounded-md border border-hairline bg-canvas px-5 text-button font-medium text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15"
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </details>
      )}
    </header>
  );
}
