import { Button } from '@renderer/components/ui/button'

function App() {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="text-2xl text-amber-500">
      <Button onClick={ipcHandle}>Click me to send IPC message</Button>
    </div>
  )
}

export default App
