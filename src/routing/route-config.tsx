import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router';

import { APP_ROUTES } from '../constants/routes';
import BlankLayout from '../layouts/blank-layout';
import RootLayout from '../layouts/root-layout';
import type { store as appStore } from '../store';
import { restoreSession } from '../store/auth-slice';
import { safeRedirect } from '../utils/validation';
import { lazyComponents } from './lazy-components';
import { loadRemoteRoutes } from './remote-routes';

export const rootRoute = createRootRouteWithContext<{ store: typeof appStore }>()({
  notFoundComponent: lazyComponents.LazyNotFoundPage,
});

// Pathless layout routes: they wrap children without adding a URL segment.
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: RootLayout,
  // Every protected route sits under this layout, so this is the one auth gate.
  // After a reload Redux is empty, so ask the server (/auth/me via the session cookie) first.
  beforeLoad: async ({ context: { store }, location }) => {
    await store.dispatch(restoreSession());
    if (!store.getState().auth.isAuthenticated) {
      throw redirect({ to: APP_ROUTES.LOGIN.navigate, search: { redirect: location.href } });
    }
  },
  pendingComponent: () => (
    <p role="status" className="p-8 text-muted">
      Checking session…
    </p>
  ),
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
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: safeRedirect(search.redirect, APP_ROUTES.DASHBOARD.navigate),
  }),
  // Signed-in users skip the form.
  beforeLoad: async ({ context: { store }, search }) => {
    await store.dispatch(restoreSession());
    if (store.getState().auth.isAuthenticated) throw redirect({ to: search.redirect });
  },
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
