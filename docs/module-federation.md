# wp_layout — Module Federation contract

Host (shell). Runs on port **3000**. Owns the only router, the layouts, the host pages and
the sidebar. Exposes nothing.

## Folder structure

```
src/
├── constants/
│   ├── routes.ts          APP_ROUTES for host pages + each remote's base path
│   └── menu-items.ts       sidebar/header nav entries
├── layouts/
│   ├── RootLayout.tsx     header + nav + <Outlet/>; wraps every protected route
│   └── BlankLayout.tsx    bare <Outlet/>; auth and error pages
├── pages/
│   ├── LoginPage.tsx
│   ├── SettingsPage.tsx
│   ├── NotFoundPage.tsx   root notFoundComponent (any unknown URL)
│   └── ModuleErrorPage.tsx  shown when a remote's remoteEntry fails to load
├── routing/
│   ├── routeConfig.tsx    route tree: root → app / blank layouts → host + remote routes
│   ├── remote-routes.tsx   REMOTE_MODULES registry; loads each remote's `./routes`
│   ├── lazyComponents.ts  React.lazy() host pages
│   └── index.tsx          createAppRouter() + <RouterProvider/>, Register type
├── index.tsx              entry: builds router, then renders with QueryClientProvider
└── remotes.d.ts           types for every consumed remote module
```

## Exposes

Nothing (`exposes: {}`). The host is never consumed.

## Consumes

| Remote | Module | Export | Used in | Env var |
|---|---|---|---|---|
| `wp_shared` | `wp_shared/Card` | `Card` | layouts, host pages | `VITE_WP_SHARED_URL` |
| `wp_dashboard` | `wp_dashboard/routes` | `createRoutes(parent)` | `routing/remote-routes.tsx` | `VITE_WP_DASHBOARD_URL` |
| `wp_portfolio` | `wp_portfolio/routes` | `createRoutes(parent)` | `routing/remote-routes.tsx` | `VITE_WP_PORTFOLIO_URL` |
| `wp_watchlist` | `wp_watchlist/routes` | `createRoutes(parent)` | `routing/remote-routes.tsx` | `VITE_WP_WATCHLIST_URL` |
| `wp_alerts` | `wp_alerts/routes` | `createRoutes(parent)` | `routing/remote-routes.tsx` | `VITE_WP_ALERTS_URL` |

Types for all five live in `src/remotes.d.ts`. The host types remote routes loosely
(`AnyRoute[]`); each remote keeps full type safety for its own links and params.

## How the route tree is built

```
rootRoute                         notFoundComponent → NotFoundPage
├── /                             redirect → /dashboard
├── (blank)  BlankLayout          pathless
│   └── /auth/login               LoginPage
└── (app)    RootLayout           pathless
    ├── /settings                 SettingsPage
    ├── ...wp_dashboard/routes    /dashboard
    ├── ...wp_portfolio/routes    /portfolio, /portfolio/$id
    ├── ...wp_watchlist/routes    /watchlist, /watchlist/$symbol
    └── ...wp_alerts/routes       /alerts
```

1. `index.tsx` calls `createAppRouter()`, which awaits `buildRouteTree()`.
2. `loadRemoteRoutes(appLayoutRoute)` imports every remote's `./routes` in parallel
   (`Promise.allSettled`) and calls `createRoutes(appLayoutRoute)` on each.
3. If a remote fails to load, it gets a `<basePath>/$` route that renders `ModuleErrorPage`
   with a Retry button. Other modules keep working.
4. The router renders only once all remote entries have settled. Page chunks still load lazily
   on first visit.

## Routes owned by the host

| URL | Constant | Layout | Page |
|---|---|---|---|
| `/` | `APP_ROUTES.ROOT` | — | redirect to `/dashboard` |
| `/auth/login` | `APP_ROUTES.LOGIN` | BlankLayout | `LoginPage` |
| `/settings` | `APP_ROUTES.SETTINGS` | RootLayout | `SettingsPage` |
| any unknown URL | — | — | `NotFoundPage` |

`APP_ROUTES.DASHBOARD / PORTFOLIO / WATCHLIST / ALERTS` hold each remote's base path. They are
used for nav links and fallback routes; the remote owns the actual route definitions.

## Shared singletons

| Package | Config |
|---|---|
| `react` | `singleton` |
| `react-dom` | `singleton` |
| `@tanstack/react-query` | `singleton` |
| `@tanstack/react-router` | `singleton` |

Every repo declares the same four. A package missing from `shared` gets bundled twice, and a
second copy of React or the router breaks hooks and context at runtime.

## Environment

| Variable | Example |
|---|---|
| `PORT` | `3000` |
| `VITE_WP_SHARED_URL` | `http://localhost:3001/remoteEntry.js` |
| `VITE_WP_DASHBOARD_URL` | `http://localhost:3002/remoteEntry.js` |
| `VITE_WP_PORTFOLIO_URL` | `http://localhost:3003/remoteEntry.js` |
| `VITE_WP_WATCHLIST_URL` | `http://localhost:3004/remoteEntry.js` |
| `VITE_WP_ALERTS_URL` | `http://localhost:3005/remoteEntry.js` |

## Adding a feature remote

1. Add it to `remotes` in `vite.config.ts` and its URL to `.env` / `.env.example`.
2. Add `declare module '<name>/routes'` to `src/remotes.d.ts`.
3. Add its base path to `APP_ROUTES` and an entry to `REMOTE_MODULES` in
   `src/routing/remote-routes.tsx`. The `import('<name>/routes')` string must stay literal.
4. Add a nav entry to `src/constants/menu-items.ts` if it belongs in the sidebar.

## Not built yet

- Auth guard (`beforeLoad` on the `app` layout route) — waits for `authMiddleware` in `wp_shared`.
- `/auth/signup`, `/auth/forgot-password`, `/settings/*` sub-pages, `/500`.
