// Host-owned routes. `path` is the segment passed to createRoute; `navigate` is the full URL.
// Feature routes live in each remote's own src/constants/routes.ts.
export const APP_ROUTES = {
  ROOT: { path: '/', navigate: '/' },
  LOGIN: { path: 'auth/login', navigate: '/auth/login' },
  SETTINGS: { path: 'settings', navigate: '/settings' },
  DASHBOARD: { path: 'dashboard', navigate: '/dashboard' },
  PORTFOLIO: { path: 'portfolio', navigate: '/portfolio' },
  WATCHLIST: { path: 'watchlist', navigate: '/watchlist' },
  ALERTS: { path: 'alerts', navigate: '/alerts' },
} as const;
