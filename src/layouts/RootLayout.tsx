import { Link, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Card } from 'wp_shared/Card';

import { menuItems } from '../constants/menuItems';

export default function RootLayout() {
  return (
    <>
      <header>
        <Card title="WealthPulse">
          <nav>
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </Card>
      </header>
      <main>
        <Suspense fallback={<p>Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
