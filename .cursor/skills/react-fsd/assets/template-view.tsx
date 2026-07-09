/**
 * @file views/<view-name>/ui/<view-name>-view.tsx
 * <View-name> view composition: combines widgets + features into the full page.
 */

import { useEffect } from "react"
import { LoginForm } from "@/features/login"
import { SiteFooter } from "@/widgets/site-footer"

const PAGE_TITLE = "<View title>"

/**
 * Renders the <view-name> view composition.
 */
export function ExampleView() {
  useEffect(function setExampleViewTitle() {
    document.title = PAGE_TITLE
  }, [])

  return (
    <main>
      <LoginForm onSuccess={handleLoginSuccess} />
      <SiteFooter />
    </main>
  )
}

/**
 * Navigates onward once the login succeeds.
 *
 * @param userId - the id of the user who just signed in
 */
function handleLoginSuccess(userId: string): void {
  void userId
}
