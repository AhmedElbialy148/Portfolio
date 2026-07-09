/**
 * @file app/router.tsx
 * Application router — maps URLs to FSD view slices.
 */

import { createBrowserRouter } from "react-router-dom"
import { HomeView } from "@/views/home"
import { CodesView } from "@/views/codes"
import { AppShell } from "./app-shell"

/**
 * The application's route configuration.
 */
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/codes", element: <CodesView /> },
    ],
  },
])
