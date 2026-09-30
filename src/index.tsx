import './styles.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { queryClient } from './queryClient';
import RoutingConfig, { createAppRouter } from './routing';
import { store } from './store';
import { initTheme } from './utils/theme';

initTheme();

createAppRouter().then((router) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RoutingConfig router={router} />
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  );
});
