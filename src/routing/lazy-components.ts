import { lazy } from 'react';

// Host-owned pages only. Feature pages are lazy-loaded inside each remote's routeConfig.
export const lazyComponents = {
  LazyLoginPage: lazy(() => import('../pages/login-page')),
  LazySettingsPage: lazy(() => import('../pages/settings-page')),
  LazyNotFoundPage: lazy(() => import('../pages/not-found-page')),
};
