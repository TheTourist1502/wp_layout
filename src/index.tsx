import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import RoutingConfig, { createAppRouter } from './routing';

const queryClient = new QueryClient();

createAppRouter().then((router) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RoutingConfig router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
