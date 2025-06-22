import Editor from '@renderer/components/editor'
import { Toaster } from './components/ui/sonner'
import { SidebarInset, SidebarProvider } from '@renderer/components/ui/sidebar'
import AppSidebar from '@renderer/components/sidebar'
import TitleBar from '@renderer/components/titlebar'

function App() {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <SidebarProvider>
      <TitleBar />
      <AppSidebar />
      <SidebarInset>
        <main className="min-h-screen mx-auto w-full">
          {/* for title padding */}
          <div className="h-10 w-full bg-transparent" />
          <Editor />
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}

export default App
