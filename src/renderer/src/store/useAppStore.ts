import { create } from 'zustand'

interface AppState {
  isHeaderVisible: boolean
}

interface AppAction {
  setHeaderVisibility: (isVisible: boolean) => void
  keyStore: {
    getValue: (key: string) => Promise<string | null>
    setValue: (key: string, value: string) => Promise<boolean | null>
    deleteValue: (key: string) => Promise<boolean | null>
  }
  selectMainFolder: () => Promise<{
    canceled: boolean
    filePaths: string[]
  } | null>
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible }),
    keyStore: {
      getValue: (key) =>
        window.electron.ipcRenderer
          .invoke('keyValueStore:get', key)
          .then((result) => result ?? null),
      setValue: (key, value) =>
        window.electron.ipcRenderer
          .invoke('keyValueStore:set', key, value)
          .then((result) => result ?? null),
      deleteValue: (key) =>
        window.electron.ipcRenderer
          .invoke('keyValueStore:delete', key)
          .then((result) => result ?? null)
    },
    selectMainFolder: () =>
      window.electron.ipcRenderer.invoke('selectMainFolder').then((result) => result ?? null)
  }
}))
