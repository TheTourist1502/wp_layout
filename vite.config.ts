import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const port = Number(env.PORT);

  return {
    server: { port, strictPort: true, origin: `http://localhost:${port}` },
    preview: { port, strictPort: true },
    build: { target: 'esnext' },
    plugins: [
      react(),
      federation({
        name: 'wp_layout',
        filename: 'remoteEntry.js',
        exposes: {},
        remotes: {
          wp_shared: { type: 'module', name: 'wp_shared', entry: env.VITE_WP_SHARED_URL },
          wp_dashboard: { type: 'module', name: 'wp_dashboard', entry: env.VITE_WP_DASHBOARD_URL },
          wp_portfolio: { type: 'module', name: 'wp_portfolio', entry: env.VITE_WP_PORTFOLIO_URL },
          wp_watchlist: { type: 'module', name: 'wp_watchlist', entry: env.VITE_WP_WATCHLIST_URL },
          wp_alerts: { type: 'module', name: 'wp_alerts', entry: env.VITE_WP_ALERTS_URL },
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          '@tanstack/react-query': { singleton: true },
          '@tanstack/react-router': { singleton: true },
        },
      }),
    ],
  };
});
