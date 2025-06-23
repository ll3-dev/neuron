import Editor from '@renderer/components/editor'
import { Toaster } from './components/ui/sonner'
import { SidebarInset, SidebarProvider } from '@renderer/components/ui/sidebar'
import AppSidebar from '@renderer/components/sidebar'
import TitleBar from '@renderer/components/titlebar'

function App() {
  return (
    <SidebarProvider>
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

export default App
