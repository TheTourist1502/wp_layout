import { Link } from '@tanstack/react-router';
import { Card } from 'wp_shared/Card';

import { APP_ROUTES } from '../constants/routes';

export default function NotFoundPage() {
  return (
    <Card title="Page not found">
      <Link to={APP_ROUTES.DASHBOARD.navigate}>Back to dashboard</Link>
    </Card>
  );
}
