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
import { DEFAULT_FOLDER_KEY } from '@renderer/constats/app'
import { Suspense } from 'react'
import EditorTitle from '@renderer/components/title/EditorTitle'
import { z } from 'zod'
import { trpcClient } from '@renderer/lib/trpc'

const EditorSearhSchema = z.object({
  absolutePath: z.string().optional()
})

export const Route = createFileRoute('/editor')({
  component: MainPage,
  validateSearch: (search) => EditorSearhSchema.parse(search),
  beforeLoad: async ({ cause }) => {
    if (cause === 'enter') {
      const folder = trpcClient.keyValue.getValue.mutate({ key: DEFAULT_FOLDER_KEY })
      if (!folder) {
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
            <Suspense>
              <EditorTitle />
            </Suspense>
            <Suspense>
              <Editor />
            </Suspense>
          </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
