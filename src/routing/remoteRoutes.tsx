import { type AnyRoute, createRoute } from '@tanstack/react-router';

import { APP_ROUTES } from '../constants/routes';
import ModuleErrorPage from '../pages/ModuleErrorPage';

type RouteFactory = { createRoutes: (parent: AnyRoute) => readonly AnyRoute[] };

// One entry per feature remote. Import specifiers must stay literal for the federation plugin.
const REMOTE_MODULES: { name: string; basePath: string; load: () => Promise<RouteFactory> }[] = [
  {
    name: 'wp_dashboard',
    basePath: APP_ROUTES.DASHBOARD.path,
    load: () => import('wp_dashboard/routes'),
  },
  {
    name: 'wp_portfolio',
    basePath: APP_ROUTES.PORTFOLIO.path,
    load: () => import('wp_portfolio/routes'),
  },
  {
    name: 'wp_watchlist',
    basePath: APP_ROUTES.WATCHLIST.path,
    load: () => import('wp_watchlist/routes'),
  },
  {
    name: 'wp_alerts',
    basePath: APP_ROUTES.ALERTS.path,
    load: () => import('wp_alerts/routes'),
  },
];

// Fetches every remote's route factory before the router is built. A remote that fails to load
// gets a `<basePath>/$` fallback route instead of taking the whole app down.
// ponytail: every remoteEntry loads at startup; go per-module splat routes if that gets slow.
export async function loadRemoteRoutes(parent: AnyRoute): Promise<AnyRoute[]> {
  const results = await Promise.allSettled(REMOTE_MODULES.map((remote) => remote.load()));

  return results.flatMap((result, i) => {
    const { name, basePath } = REMOTE_MODULES[i];
    if (result.status === 'fulfilled') return [...result.value.createRoutes(parent)];

    return [
      createRoute({
        getParentRoute: () => parent,
        path: `${basePath}/$`,
        component: () => <ModuleErrorPage moduleName={name} />,
      }),
    ];
  });
}
