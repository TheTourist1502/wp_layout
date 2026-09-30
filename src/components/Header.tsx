import { Icon } from '@iconify/react';

import { useState } from 'react';

import { useAuth } from '../hooks/useAuth';
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

      <span className="font-display text-display-sm text-ink">WealthPulse</span>

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
