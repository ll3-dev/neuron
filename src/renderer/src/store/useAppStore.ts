import { create } from 'zustand'

interface AppState {
  isHeaderVisible: boolean
}

interface AppAction {
  setHeaderVisibility: (isVisible: boolean) => void
  keyStore: {
    getValye: (key: string) => Promise<string | null>
    setValue: (key: string, value: string) => Promise<boolean>
  }
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible }),
    keyStore: {
      getValye: async (key) => await window.electron.ipcRenderer.invoke('keyValueStore:get', key),
      setValue: async (key, value) =>
        await window.electron.ipcRenderer.invoke('keyValueStore:set', key, value)
    }
  }
}))
