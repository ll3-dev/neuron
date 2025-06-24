import { create } from 'zustand'

interface AppState {
  isHeaderVisible: boolean
}

interface AppAction {
  setHeaderVisibility: (isVisible: boolean) => void
  keyStore: {
    getValue: (key: string) => Promise<string | null>
    setValue: (key: string, value: string) => Promise<boolean | null>
  }
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible }),
    keyStore: {
      getValue: async (key) => {
        const { result } = await window.electron.ipcRenderer.invoke('keyValueStore:get', key)
        return result || null
      },
      setValue: async (key, value) => {
        const { result } = await window.electron.ipcRenderer.invoke('keyValueStore:set', key, value)
        return result || null
      }
    }
  }
}))
