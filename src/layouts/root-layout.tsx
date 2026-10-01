import { Outlet } from '@tanstack/react-router';
import { Suspense, useState } from 'react';

import Header from '../components/header';
import SideNav from '../components/side-nav';

export default function RootLayout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-canvas">
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((o) => !o)} />
      <div className="flex h-[calc(100vh-4rem-1px)]">
        <SideNav open={navOpen} onNavigate={() => setNavOpen(false)} />
        <main className="relative w-[calc(100vw-14rem-1px)] overflow-y-auto overflow-x-hidden p-6 md:p-8">
          <Suspense fallback={<p role="status" className="text-muted">Loading…</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
