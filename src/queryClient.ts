import { QueryClient } from '@tanstack/react-query';

// Server-data cache for feature modules. Auth/client state lives in Redux (src/store).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 3, retryDelay: (n) => Math.min(1000 * 2 ** n, 30_000) },
  },
});
