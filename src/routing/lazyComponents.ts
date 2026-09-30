import { lazy } from 'react';

// Host-owned pages only. Feature pages are lazy-loaded inside each remote's routeConfig.
export const lazyComponents = {
  LazyLoginPage: lazy(() => import('../pages/LoginPage')),
  LazySettingsPage: lazy(() => import('../pages/SettingsPage')),
  LazyNotFoundPage: lazy(() => import('../pages/NotFoundPage')),
};
