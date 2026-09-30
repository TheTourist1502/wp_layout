import { createRouter, RouterProvider } from '@tanstack/react-router';

import { buildRouteTree } from './routeConfig';

export async function createAppRouter() {
  return createRouter({ routeTree: await buildRouteTree() });
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
