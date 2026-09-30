// Types for modules this host consumes over Module Federation.
// Keep in sync with each remote's `exposes` (see docs/module-federation.md).

declare module 'wp_shared/Card' {
  import type { FC, ReactNode } from 'react';

  export const Card: FC<{ title: string; children?: ReactNode }>;
}

declare module 'wp_dashboard/routes' {
  import type { AnyRoute } from '@tanstack/react-router';

  export function createRoutes(parent: AnyRoute): readonly AnyRoute[];
}

declare module 'wp_portfolio/routes' {
  import type { AnyRoute } from '@tanstack/react-router';

  export function createRoutes(parent: AnyRoute): readonly AnyRoute[];
}

declare module 'wp_watchlist/routes' {
  import type { AnyRoute } from '@tanstack/react-router';

  export function createRoutes(parent: AnyRoute): readonly AnyRoute[];
}

declare module 'wp_alerts/routes' {
  import type { AnyRoute } from '@tanstack/react-router';

  export function createRoutes(parent: AnyRoute): readonly AnyRoute[];
}
