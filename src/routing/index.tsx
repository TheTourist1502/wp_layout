import { createRouter, RouterProvider } from '@tanstack/react-router';

import { store } from '../store';
import { buildRouteTree } from './routeConfig';

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

export default function RoutingConfig({ router }: { router: AppRouter }) {
  return <RouterProvider router={router} />;
}
