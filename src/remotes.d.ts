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

declare module 'wp_shared/http_service' {
  export class ApiError extends Error {
    status: number;
    code: string;
    details?: unknown;
  }
  export const http: {
    get<T>(path: string, init?: RequestInit): Promise<T>;
    post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T>;
    put<T>(path: string, body?: unknown, init?: RequestInit): Promise<T>;
    patch<T>(path: string, body?: unknown, init?: RequestInit): Promise<T>;
    delete<T>(path: string, init?: RequestInit): Promise<T>;
  };
}

declare module 'wp_shared/constants' {
  export const API_ENDPOINTS: {
    readonly AUTH: {
      readonly LOGIN: '/auth/login';
      readonly LOGOUT: '/auth/logout';
      readonly ME: '/auth/me';
      readonly REFRESH_TOKEN: '/auth/refresh-token';
    };
    readonly HEALTH: '/health';
  };
}
