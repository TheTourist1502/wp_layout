import { APP_ROUTES } from './routes';

// Icon names from Iconify's lucide set (https://icon-sets.iconify.design/lucide/).
export const menuItems = [
  { label: 'Dashboard', to: APP_ROUTES.DASHBOARD.navigate, icon: 'lucide:layout-dashboard' },
  { label: 'Portfolio', to: APP_ROUTES.PORTFOLIO.navigate, icon: 'lucide:briefcase' },
  { label: 'Watchlist', to: APP_ROUTES.WATCHLIST.navigate, icon: 'lucide:star' },
  { label: 'Alerts', to: APP_ROUTES.ALERTS.navigate, icon: 'lucide:bell' },
  { label: 'Settings', to: APP_ROUTES.SETTINGS.navigate, icon: 'lucide:settings' },
] as const;
