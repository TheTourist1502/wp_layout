import { APP_ROUTES } from './routes';

export const menuItems = [
  { label: 'Dashboard', to: APP_ROUTES.DASHBOARD.navigate },
  { label: 'Portfolio', to: APP_ROUTES.PORTFOLIO.navigate },
  { label: 'Watchlist', to: APP_ROUTES.WATCHLIST.navigate },
  { label: 'Alerts', to: APP_ROUTES.ALERTS.navigate },
  { label: 'Settings', to: APP_ROUTES.SETTINGS.navigate },
] as const;
