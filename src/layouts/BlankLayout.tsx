import { Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

export default function BlankLayout() {
  return (
    <main>
      <Suspense fallback={<p>Loading…</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
