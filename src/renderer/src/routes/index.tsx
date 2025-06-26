import { createFileRoute, redirect } from '@tanstack/react-router'
import Editor from '@renderer/components/editor'
import {
  SIDEBAR_OPEN_COOKIE_NAME,
  SIDEBAR_WIDTH_COOKIE_NAME,
  SidebarInset,
  SidebarProvider
} from '@renderer/components/ui/sidebar'
import AppSidebar from '@renderer/components/sidebar'
import TitleBar from '@renderer/components/titlebar'
import { Toaster } from '@renderer/components/ui/sonner'
import { useAppStore } from '@renderer/store/useAppStore'
import { DEFAULT_DIRECTORY_KEY } from '@renderer/constats/app'

export const Route = createFileRoute('/')({
  component: MainPage,
  beforeLoad: async ({ cause }) => {
    if (cause === 'enter') {
      const keyStore = useAppStore.getState().actions.keyValueStore
      const directory = await keyStore.getValue(DEFAULT_DIRECTORY_KEY)

      if (!directory) {
        throw redirect({
          to: '/welcome',
          replace: true
        })
      }
    }
  },
  loader: async () =>
    Promise.all([
      cookieStore.get(SIDEBAR_OPEN_COOKIE_NAME),
      cookieStore.get(SIDEBAR_WIDTH_COOKIE_NAME)
    ])
})

function MainPage() {
  const [defaultOpen, defaultWidth] = Route.useLoaderData()

  return (
    <SidebarProvider defaultOpen={defaultOpen?.value === 'true'} defaultWidth={defaultWidth?.value}>
      <TitleBar />
      <AppSidebar />
      <SidebarInset>
        <main className="min-h-screen mx-auto w-full">
          {/* for title padding */}
          <div className="h-13 w-full bg-transparent" />
          <div className="flex flex-col w-full mx-auto max-w-[1200px] p-32 pt-28 gap-4">
            <Editor />
          </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
