import { createRouter } from '@tanstack/react-router';

import { store } from '../store';
import { buildRouteTree } from './route-config';

export async function createAppRouter() {
  return createRouter({
    routeTree: await buildRouteTree(),
    context: { store },
    defaultPendingMs: 200,
  });
}

type AppRouter = Awaited<ReturnType<typeof createAppRouter>>;

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter;
  }
}
