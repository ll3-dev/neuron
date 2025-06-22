import Editor from '@renderer/components/editor'
import { Toaster } from './components/ui/sonner'

function App() {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <Editor />
      <Toaster />
    </div>
  )
}

export default App
