/**
 * @file app/app-shell.tsx
 * Persistent layout shell with header and outlet for route content.
 */

import { Outlet, ScrollRestoration } from "react-router-dom"
import { SiteHeader } from "@/widgets/site-header"

/**
 * Renders the persistent app shell around route views.
 */
export function AppShell() {
  return (
    <>
      <ScrollRestoration />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
