/**
 * @file app/app.tsx
 * Root application component with router provider.
 */

import { RouterProvider } from "react-router-dom"
import { Providers } from "./providers"
import { router } from "./router"

/**
 * Renders the root application with providers and router.
 */
export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
