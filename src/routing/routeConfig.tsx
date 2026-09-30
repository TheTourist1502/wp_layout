import { createRootRoute, createRoute, redirect } from '@tanstack/react-router';

import { APP_ROUTES } from '../constants/routes';
import BlankLayout from '../layouts/BlankLayout';
import RootLayout from '../layouts/RootLayout';
import { lazyComponents } from './lazyComponents';
import { loadRemoteRoutes } from './remoteRoutes';

export const rootRoute = createRootRoute({
  notFoundComponent: lazyComponents.LazyNotFoundPage,
});

// Pathless layout routes: they wrap children without adding a URL segment.
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: RootLayout,
});
const blankLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'blank',
  component: BlankLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: APP_ROUTES.ROOT.path,
  beforeLoad: () => {
    throw redirect({ to: APP_ROUTES.DASHBOARD.navigate });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => blankLayoutRoute,
  path: APP_ROUTES.LOGIN.path,
  component: lazyComponents.LazyLoginPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: APP_ROUTES.SETTINGS.path,
  component: lazyComponents.LazySettingsPage,
});

export async function buildRouteTree() {
  const remoteRoutes = await loadRemoteRoutes(appLayoutRoute);

  return rootRoute.addChildren([
    indexRoute,
    blankLayoutRoute.addChildren([loginRoute]),
    appLayoutRoute.addChildren([settingsRoute, ...remoteRoutes]),
  ]);
}
